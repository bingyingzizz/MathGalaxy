/* 持久结果库：追加式 JSONL，同 key 取最后一条。位置 _audit/llm-store/<op>.jsonl（持久、不入 git）。
   · 持锁（lib/lock.mjs，同步事务）写；追加 = 增量刷新（只读上次偏移之后的新字节）+ 单次 O_APPEND + fsync，
     不再每次全文件解析（长度 N 的库追加 N 条的总开销是 O(N)，不是 O(N²)）。
   · 每条记录做 schema 校验与状态白名单（写入前与读入时都查）。
   · 末尾半行（撕裂）→ 原文先存进 `.torn` 旁文件再截断（仅持锁时）；中间坏行 → StoreCorrupt，绝不静默丢弃。
   · compact / recover 持同一把锁；compact 先写新文件 + fsync + 重新解析校验 + 带哈希核对的 .bak，再原子 rename。
   · 花费历史不在这里：见 billing.mjs（独立、只追加、compact 不碰它）。 */
import fs from 'node:fs';
import path from 'node:path';
import { Lock } from './lib/lock.mjs';
import { sha256, finite } from './lib/util.mjs';

export const STATES = ['fetched', 'pending', 'ok', 'invalid', 'retryable', 'failed', 'review', 'approved', 'applied', 'stale'];
export class StoreCorrupt extends Error {}
export { LockHeld as StoreLocked } from './lib/lock.mjs';

export function checkRecord(r) {
  if (!r || typeof r !== 'object' || Array.isArray(r)) throw new Error('记录不是对象');
  if (typeof r.key !== 'string' || !r.key || r.key.length > 200) throw new Error('key 非法');
  if (!STATES.includes(r.state)) throw new Error('state 不在白名单：' + r.state);
  for (const f of ['id', 'field', 'identity', 'op']) if (r[f] != null && typeof r[f] !== 'string') throw new Error(f + ' 必须是字符串');
  if (r.usd != null) finite(r.usd, 'usd');
  if (r.savingsUsd != null) finite(r.savingsUsd, 'savingsUsd');
  if (r.usage != null) {
    if (typeof r.usage !== 'object') throw new Error('usage 非法');
    for (const k of ['prompt_tokens', 'completion_tokens', 'prompt_cache_hit_tokens', 'prompt_cache_miss_tokens']) if (r.usage[k] != null) finite(r.usage[k], 'usage.' + k, { int: true });
  }
  return r;
}

export class Store {
  constructor(dir, op) {
    this.dir = dir; this.op = op;
    this.file = path.join(dir, op + '.jsonl'); this.lock = new Lock(path.join(dir, op + '.lock'));
    this.map = new Map(); this.offset = 0; this.lines = 0; this.stats = { bytesRead: 0 };
  }
  withLock(fn) { fs.mkdirSync(this.dir, { recursive: true }); return this.lock.withLock(fn); }

  /** 读 offset 之后的新字节并折叠进内存。repair=true（须持锁）时处理撕裂尾行。 */
  _refresh(repair) {
    let st; try { st = fs.statSync(this.file); } catch (e) { if (e.code === 'ENOENT') { this.map.clear(); this.offset = 0; this.lines = 0; return; } throw e; }
    if (st.size < this.offset) { this.map.clear(); this.offset = 0; this.lines = 0; }          // 文件被换过（compact）：重载
    if (st.size === this.offset) return;
    const fd = fs.openSync(this.file, 'r');
    let buf; try { buf = Buffer.alloc(st.size - this.offset); fs.readSync(fd, buf, 0, buf.length, this.offset); } finally { fs.closeSync(fd); }
    this.stats.bytesRead += buf.length;
    let pos = 0;
    for (;;) {
      const nl = buf.indexOf(10, pos);
      if (nl < 0) break;
      this._fold(buf.toString('utf8', pos, nl), this.lines + 1);
      this.lines++; pos = nl + 1;
    }
    this.offset += pos;                                                                       // 精确推进到最后一个完整行之后
    if (pos < buf.length) {                                                                   // 末尾无换行的残片
      const tail = buf.toString('utf8', pos);
      let whole = true; try { checkRecord(JSON.parse(tail)); } catch { whole = false; }
      if (whole) {                                                                            // 完整记录只是缺换行
        if (repair) { fs.appendFileSync(this.file, '\n'); this._fold(tail, this.lines + 1); this.lines++; this.offset = st.size + 1; }
        // 只读：不推进，等持锁写入时补换行
      } else if (repair) {
        fs.appendFileSync(this.file + '.torn', JSON.stringify({ ts: Date.now(), text: tail }) + '\n');
        fs.truncateSync(this.file, this.offset);
      }                                                                                       // 只读：忽略残片，不推进偏移
    }
  }
  _fold(line, no) {
    if (!line.trim()) return;
    let r; try { r = checkRecord(JSON.parse(line)); } catch (e) { throw new StoreCorrupt(`${this.file} 第 ${no} 行损坏（${e.message}）。不会自动丢弃；人工检查后处理。`); }
    this.map.set(r.key, r);
  }

  /** 只读视图（不修复尾部）。 */
  load() { this._refresh(false); return this.map; }
  open() { return this.withLock(() => { this._refresh(true); return { keys: this.map.size }; }); }
  append(recs) {
    const arr = (Array.isArray(recs) ? recs : [recs]).map(r => ({ t: new Date().toISOString(), ...r }));
    arr.forEach(checkRecord);                                                                 // 先全部校验，再写
    return this.withLock(() => {
      this._refresh(true);
      const data = arr.map(r => JSON.stringify(r)).join('\n') + '\n';
      const fd = fs.openSync(this.file, 'a');
      try { fs.writeSync(fd, data); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
      this._refresh(false);
    });
  }
  verify() {
    const probe = new Store(this.dir, this.op);                                               // 全量重解析，不信缓存
    try { probe._refresh(false); } catch (e) { if (e instanceof StoreCorrupt) return { ok: false, error: e.message }; throw e; }
    const size = fs.existsSync(this.file) ? fs.statSync(this.file).size : 0;
    return { ok: true, keys: probe.map.size, lines: probe.lines, tornTail: size > probe.offset };
  }
  /** 只保留每个 key 的最后一条。先校验新文件，再备份并核对哈希，最后原子替换。 */
  compact() {
    return this.withLock(() => {
      const probe = new Store(this.dir, this.op); probe._refresh(true); this._refresh(true);
      const tmp = this.file + '.tmp'; const fd = fs.openSync(tmp, 'w');
      try { fs.writeSync(fd, [...this.map.values()].map(r => JSON.stringify(r)).join('\n') + (this.map.size ? '\n' : '')); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
      const check = new Store(this.dir, this.op + '.tmpcheck'); check.file = tmp; check._refresh(false);   // 重新解析新文件
      if (check.map.size !== this.map.size) { fs.unlinkSync(tmp); throw new Error('compact 校验失败：键数不符'); }
      for (const [k, v] of this.map) if (JSON.stringify(check.map.get(k)) !== JSON.stringify(v)) { fs.unlinkSync(tmp); throw new Error('compact 校验失败：记录不一致 ' + k); }
      if (fs.existsSync(this.file)) {
        fs.copyFileSync(this.file, this.file + '.bak');
        if (sha256(fs.readFileSync(this.file + '.bak')) !== sha256(fs.readFileSync(this.file))) { fs.unlinkSync(tmp); throw new Error('备份校验失败'); }
      }
      fs.renameSync(tmp, this.file);
      this.map.clear(); this.offset = 0; this.lines = 0; this._refresh(false);
      return this.map.size;
    });
  }
}
