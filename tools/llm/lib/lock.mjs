/* 文件锁（同步事务专用）。
   · 创建是原子的：先写好带属主信息的临时文件，再 `link` 成锁文件（已存在 → EEXIST；永远不会有「写到一半」的锁）。
   · 属主 = {pid, host, token}。⛔ 绝不因为「锁很老」回收：只有「同主机且 pid 已死」才允许自动回收。
   · 回收竞争：回收者先独占一把短命的 `<lock>.reclaim`（同样原子创建），在持有它的前提下重读锁、
     确认仍是同一个 token 且属主已死，才删除。因为别人只能在锁文件不存在时创建锁，
     所以回收者不可能删到「刚获得的活锁」。回收互斥锁自己残留（回收者在中途崩溃）→ 不自动处理，报错并给人工指引。
   · 元数据损坏 → 视为「未知属主持有」：短暂重试后抛错，不删除。
   · 释放前核对 token 是自己的才删。
   · withLock 只接受同步回调：异步函数 / 返回 thenable 一律抛错（锁不会比回调活得更久）。
   · 跨主机、pid 复用等无法可靠判断的情形 → 人工 `store unlock`（见 docs/llm-pipeline.md）。 */
import fs from 'node:fs';
import os from 'node:os';
import crypto from 'node:crypto';

export class LockHeld extends Error { constructor(msg, owner) { super(msg); this.owner = owner; } }
const alive = pid => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } };
const HOST = os.hostname();

function tryCreate(file, meta) {
  const tmp = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(meta));
  try { fs.linkSync(tmp, file); return true; }
  catch (e) { if (['EEXIST', 'EPERM', 'EACCES', 'EBUSY'].includes(e.code)) { tryCreate.lastCode = e.code; return false; } throw e; }   // Windows：属主刚删锁（delete-pending）时可能是 EPERM/EACCES，当作「忙」重试
  finally { try { fs.unlinkSync(tmp); } catch { /* 已无 */ } }
}
function readOwner(file) {
  let txt; try { txt = fs.readFileSync(file, 'utf8'); } catch (e) { if (e.code === 'ENOENT') return { gone: true }; if (['EPERM', 'EACCES', 'EBUSY'].includes(e.code)) return { busy: true }; throw e; }
  if (txt === '') return { busy: true };                              // 我们创建的锁一定有内容；空 = 正在被删除的残影，当作忙
  try { const o = JSON.parse(txt); if (o && typeof o.pid === 'number' && typeof o.host === 'string' && typeof o.token === 'string') return { owner: o }; } catch { /* 损坏 */ }
  return { malformed: true };
}

export class Lock {
  constructor(file, { retryMs = 3000 } = {}) { this.file = file; this.reclaimFile = file + '.reclaim'; this.retryMs = retryMs; this.held = 0; this.token = null; }
  acquire() {
    if (this.held) { this.held++; return; }
    const meta = { pid: process.pid, host: HOST, token: crypto.randomBytes(12).toString('hex'), ts: Date.now() };
    const deadline = Date.now() + this.retryMs;
    for (;;) {
      if (tryCreate(this.file, meta)) { this.token = meta.token; this.held = 1; return; }
      const r = readOwner(this.file);
      if (r.gone) continue;                                           // 刚被释放，直接重试创建
      if (r.busy) { if (Date.now() < deadline) { this._wait(10); continue; } throw new LockHeld(`锁文件暂时不可读/为空：${this.file}（${tryCreate.lastCode || 'busy'}）`, null); }
      if (r.malformed) {                                              // 可能是别的工具写的；不删
        if (Date.now() < deadline) { this._wait(25); continue; }
        throw new LockHeld(`锁文件元数据损坏：${this.file}（未删除）。确认无人持有后：bun tools/llm/runner.mjs store unlock --force`, null);
      }
      const o = r.owner;
      if (o.host === HOST && !alive(o.pid)) { if (this._reclaim(o.token)) continue; }
      if (Date.now() < deadline) { this._wait(25); continue; }
      throw new LockHeld(`被占用：${this.file} 属主 pid=${o.pid} host=${o.host}${o.host === HOST ? '（进程仍在运行）' : '（其他主机，不会自动回收）'}`, o);
    }
  }
  _wait(ms) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms); }
  /** 持回收互斥锁，确认仍是同一个已死属主，再删。失败返回 false（调用方重试/报占用）。 */
  _reclaim(seenToken) {
    const meta = { pid: process.pid, host: HOST, token: 'reclaim-' + crypto.randomBytes(6).toString('hex'), ts: Date.now() };
    if (!tryCreate(this.reclaimFile, meta)) {
      const rr = readOwner(this.reclaimFile);
      if (rr.owner && rr.owner.host === HOST && alive(rr.owner.pid)) return false;   // 别人正在回收
      throw new LockHeld(`回收互斥锁残留：${this.reclaimFile}（上一个回收者可能崩溃）。需人工处理：确认无进程后手动删除它`, rr.owner || null);
    }
    try {
      const again = readOwner(this.file);
      if (again.owner && again.owner.token === seenToken && again.owner.host === HOST && !alive(again.owner.pid)) {
        try { fs.unlinkSync(this.file); } catch (e) { if (e.code !== 'ENOENT') throw e; }
      }
      return true;
    } finally { const r = readOwner(this.reclaimFile); if (r.owner && r.owner.token === meta.token) { try { fs.unlinkSync(this.reclaimFile); } catch { /* 已无 */ } } }
  }
  release() {
    if (--this.held > 0) return;
    this.held = 0;
    const r = readOwner(this.file);
    if (r.owner && r.owner.token === this.token) { try { fs.unlinkSync(this.file); } catch { /* 已无 */ } }
    this.token = null;
  }
  /** 同步事务：回调必须同步完成。 */
  withLock(fn) {
    if (fn && fn.constructor && fn.constructor.name === 'AsyncFunction') throw new TypeError('withLock 不接受异步回调（锁不能跨 await 持有）');
    this.acquire();
    try {
      const out = fn();
      if (out && typeof out.then === 'function') throw new TypeError('withLock 回调返回了 Promise：异步操作会逃出锁事务，已拒绝');
      return out;
    } finally { this.release(); }
  }
  /** 人工解锁：只有 token 对得上才删（防误删换了主人的锁）。 */
  static inspect(file) { return readOwner(file); }
  static forceRemove(file, token) {
    const r = readOwner(file);
    if (r.gone) return false;
    if (r.owner && r.owner.token !== token) throw new Error('token 不符，拒绝删除（锁已换主）');
    fs.unlinkSync(file); return true;
  }
}
