/* 持久预算账本（独立的只追加 JSONL：`<dir>/billing.jsonl`；store 的 compact 永远不碰它）。
   区分四个口径，绝不混报：
     · actual   = API 报告了 usage 的已结算花费（按 pricing.json 峰值价折算，仍不是供应商账单）
     · sunk     = 用量未知（超时/断连/丢响应/崩溃遗留预留）的**保守估计**，不释放
     · open     = 在途预留（含其他进程的）
     · 供应商真实账单 = 以控制台为准；本地无法保证精确上限
   规则：
     · 每次可能计费的请求**在派发前**先把 reserve 记录写盘（持锁、fsync），崩溃后可恢复；
     · 准入 = actual + sunk + open + 本次估计 ≤ 活动（campaign）上限，全进程共享同一份余额；
     · 活动上限创建后不可改（改要新开活动），所有数值严格校验（有限、非负）；
     · 启动时把「属主进程已死」的遗留预留转为 sunk（保守）；其他主机/仍存活进程的预留继续算在途。 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { Lock } from './lib/lock.mjs';
import { finite } from './lib/util.mjs';

const HOST = os.hostname();
const alive = pid => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } };

export class Billing {
  constructor(dir, { dailyCapUsd = null } = {}) {
    this.dailyCap = dailyCapUsd; this.day = new Map();            // 每日累计（全战役；本机本地日历日）：已结算 + 沉没估计；在途预留另算
    this.dir = dir; this.file = path.join(dir, 'billing.jsonl'); this.lock = new Lock(path.join(dir, 'billing.lock'));
    this.offset = 0; this.camp = new Map();            // campaign → {cap, actual, sunk, open: Map(rid→rec), tokens, counts}
    this.runId = crypto.randomBytes(6).toString('hex');
  }
  _c(id) { let c = this.camp.get(id); if (!c) this.camp.set(id, c = { cap: null, actual: 0, sunk: 0, open: new Map(), tokens: { hit: 0, miss: 0, out: 0 }, n: { reserved: 0, settled: 0, unknown: 0, refused: 0, released: 0 } }); return c; }
  _refresh() {
    let st; try { st = fs.statSync(this.file); } catch (e) { if (e.code === 'ENOENT') return; throw e; }
    if (st.size < this.offset) throw new Error('billing.jsonl 变短了：拒绝继续（账本历史不可丢）');
    if (st.size === this.offset) return;
    const fd = fs.openSync(this.file, 'r'); let buf;
    try { buf = Buffer.alloc(st.size - this.offset); fs.readSync(fd, buf, 0, buf.length, this.offset); } finally { fs.closeSync(fd); }
    let pos = 0;
    for (;;) {
      const nl = buf.indexOf(10, pos); if (nl < 0) break;
      const line = buf.toString('utf8', pos, nl); pos = nl + 1;
      if (line.trim()) { let r; try { r = JSON.parse(line); } catch { throw new Error('billing.jsonl 中间记录损坏，拒绝继续（不丢账本历史）'); } this._apply(r); }
    }
    this.offset += pos;
    if (pos < buf.length) { /* 撕裂尾行：持锁写入前由 _repairTail 处理 */ }
  }
  static dayKey(t) { return new Date(t || Date.now()).toLocaleDateString('en-CA'); }
  _spend(t, usd) { const k = Billing.dayKey(t); this.day.set(k, (this.day.get(k) || 0) + usd); }
  _apply(r) {
    const c = this._c(r.campaign);
    switch (r.type) {
      case 'campaign': c.cap = r.capUsd; break;
      case 'reserve': c.open.set(r.rid, r); c.n.reserved++; break;
      case 'settle': { this._spend(r.t, r.usd); const o = c.open.get(r.rid); if (o) c.open.delete(r.rid); c.actual += r.usd; c.n.settled++; c.tokens.hit += r.tok.hit; c.tokens.miss += r.tok.miss; c.tokens.out += r.tok.out; break; }
      case 'sink': { this._spend(r.t, r.est); const o = c.open.get(r.rid); if (o) c.open.delete(r.rid); c.sunk += r.est; c.n.unknown++; break; }
      case 'release': { if (c.open.delete(r.rid)) c.n.released++; break; }
      case 'refuse': c.n.refused++; break;
      default: throw new Error('未知账本记录类型 ' + r.type);
    }
  }
  _repairTail() {
    if (!fs.existsSync(this.file)) return;
    const size = fs.statSync(this.file).size; if (size === this.offset) return;
    const fd = fs.openSync(this.file, 'r'); const buf = Buffer.alloc(size - this.offset);
    try { fs.readSync(fd, buf, 0, buf.length, this.offset); } finally { fs.closeSync(fd); }
    fs.appendFileSync(this.file + '.torn', JSON.stringify({ ts: Date.now(), text: buf.toString('utf8') }) + '\n');
    fs.truncateSync(this.file, this.offset);
  }
  _write(recs) {
    const fd = fs.openSync(this.file, 'a');
    try { fs.writeSync(fd, recs.map(r => JSON.stringify({ t: new Date().toISOString(), ...r })).join('\n') + '\n'); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
    this._refresh();
  }
  tx(fn) { fs.mkdirSync(this.dir, { recursive: true }); return this.lock.withLock(() => { this._refresh(); this._repairTail(); return fn(); }); }

  /** 开始/接续一个活动。已存在则上限必须一致（不可上调）。并回收已死进程的遗留预留（转 sunk）。 */
  openCampaign(id, capUsd, { model } = {}) {
    if (typeof id !== 'string' || !/^[A-Za-z0-9._-]{1,64}$/.test(id)) throw new Error('campaign id 非法');
    finite(capUsd, 'capUsd', { min: 1e-9 });
    return this.tx(() => {
      const c = this._c(id);
      if (c.cap == null) this._write([{ type: 'campaign', campaign: id, capUsd, model: model || null, pid: process.pid, host: HOST }]);
      else if (c.cap !== capUsd) throw new Error(`活动 ${id} 的上限已固定为 ${c.cap}，不能改成 ${capUsd}（要新上限请新开活动）`);
      const recov = [];
      for (const [rid, r] of c.open) if (r.host === HOST && !alive(r.pid) && r.runId !== this.runId) recov.push({ type: 'sink', campaign: id, rid, est: r.est, reason: 'recovered-dead-owner' });
      if (recov.length) this._write(recov);
      return { id, cap: c.cap, recovered: recov.length };
    });
  }
  /** 准入 + 预留落盘（派发前）。拒绝返回 null。 */
  reserve(campaign, est, meta = {}) {
    finite(est, 'est', { min: 0 });
    return this.tx(() => {
      const c = this._c(campaign); if (c.cap == null) throw new Error('活动未开启');
      const open = [...c.open.values()].reduce((a, r) => a + r.est, 0);
      if (this.dailyCap != null) {   // 每日累计上限（跨战役）：今日已花 + 全部在途预留 + 本次 ≤ 每日上限
        let openAll = 0; for (const cc of this.camp.values()) for (const r of cc.open.values()) openAll += r.est;
        if ((this.day.get(Billing.dayKey()) || 0) + openAll + est > this.dailyCap + 1e-12) { this._write([{ type: 'refuse', campaign, reason: 'daily-cap' }]); return null; }
      }
      if (c.sunk > c.cap * 0.25 || c.actual + c.sunk + open + est > c.cap + 1e-12) { this._write([{ type: 'refuse', campaign }]); return null; }
      const rid = crypto.randomBytes(8).toString('hex');
      this._write([{ type: 'reserve', campaign, rid, est, runId: this.runId, pid: process.pid, host: HOST, ...meta }]);
      return { campaign, rid, est, done: false };
    });
  }
  settle(h, usd, tok) {
    if (h.done) return; finite(usd, 'usd', { min: 0 });
    for (const k of ['hit', 'miss', 'out']) finite(tok[k], 'tokens.' + k, { min: 0, int: true });
    h.done = true; this.tx(() => this._write([{ type: 'settle', campaign: h.campaign, rid: h.rid, usd, tok }]));
  }
  /** 用量未知：转沉没估计，不释放。 */
  sink(h, reason = 'unknown-usage') { if (h.done) return; h.done = true; this.tx(() => this._write([{ type: 'sink', campaign: h.campaign, rid: h.rid, est: h.est, reason }])); }
  /** 确定没发出去才允许释放。 */
  release(h) { if (h.done) return; h.done = true; this.tx(() => this._write([{ type: 'release', campaign: h.campaign, rid: h.rid }])); }
  halted(campaign) { return this.tx(() => { const c = this._c(campaign); return c.cap != null && c.sunk > c.cap * 0.25; }); }
  report(campaign) {
    return this.tx(() => {
      const c = this._c(campaign); const open = [...c.open.values()].reduce((a, r) => a + r.est, 0);
      return { campaign, capUsd: c.cap, actualPeakRateUsd: +c.actual.toFixed(6), unknownSunkEstUsd: +c.sunk.toFixed(6), openReservationsUsd: +open.toFixed(6),
        counts: c.n, tokens: c.tokens, ...(this.dailyCap != null ? { daily: { day: Billing.dayKey(), spentUsd: +(this.day.get(Billing.dayKey()) || 0).toFixed(6), capUsd: this.dailyCap } } : {}),
        note: 'actual = API 报告 usage 按峰值价折算；sunk = 用量未知的保守估计；这些都不是供应商账单，真实账单以控制台为准。' };
    });
  }
}
