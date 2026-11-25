/* 核心回归：预算（持久/并发/恢复/未知用量）、API 参数与响应、锁、结果库。mock 传输，零计费。 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { t, eq, ok, throws, rejects, dir, fakeWorld, node, mockTransport, okResponse, userOf, MODEL, USAGE } from './h.mjs';
import { Billing } from '../billing.mjs';
import { Store, StoreCorrupt, checkRecord } from '../store.mjs';
import { Lock, LockHeld } from '../lib/lock.mjs';
import { plan, run } from '../batch.mjs';
import { buildBody, ApiError, httpTransport } from '../deepseek.mjs';
import { finite, hashOf, redact } from '../lib/util.mjs';
import { actualUsd, estimateInputTokens, priceOf, PRICING } from '../cost.mjs';
import { buildVocab } from '../lib/glossary.mjs';
import * as nodeText from '../jobs/node-text.mjs';

const HERE = import.meta.dirname; const url = f => path.join(HERE, '..', f).replace(/\\/g, '/');
const ZH = i => `设 $G$ 为群，则 $H_${i}$ 是子群。`;
const mk = (n = 6) => { const w = fakeWorld({ nodes: Array.from({ length: n }, (_, i) => node('n.' + (i + 1), { statement: ZH(i + 1) })) }); return nodeText.collect({ world: w, vocab: buildVocab(w.graph), model: MODEL }); };
const runIt = (name, items, o = {}) => {
  const d = dir(name); const store = new Store(d, 'node-text'); const billing = new Billing(d); billing.openCampaign('c', o.cap ?? 1);
  return { d, store, billing, go: (extra = {}) => run({ items, store, billing, campaign: 'c', model: MODEL, limit: 100, backoffMs: 1, transport: o.transport, ...extra }) };
};
const child = (name, code) => { const f = path.join(dir('children'), name + '.mjs'); fs.writeFileSync(f, code); return f; };
const spawnWait = (file, args = []) => new Promise((res, rej) => { const p = spawn(process.execPath, [file, ...args], { stdio: ['ignore', 'pipe', 'pipe'] }); let out = '', err = ''; p.stdout.on('data', d => out += d); p.stderr.on('data', d => err += d); p.on('close', c => c === 0 ? res(out.trim()) : rej(new Error(`child ${c}: ${err.slice(0, 200)}`))); });
const lines = f => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l));

export async function budgetAndApi() {
  console.log('预算 / API');
  await t('干跑零请求；run 缺 limit/campaign 被拒', async () => {
    const items = mk(); const tr = mockTransport(); const R = runIt('dry', items, { transport: tr });
    const p = plan({ items, store: R.store, limit: 3 }); eq(p.toRun, 3); eq(tr.calls, 0);
    await rejects(run({ items, store: R.store, billing: R.billing, campaign: 'c', model: MODEL, transport: tr }), /limit/);
    await rejects(run({ items, store: R.store, billing: R.billing, model: MODEL, limit: 1, transport: tr }), /活动/); eq(tr.calls, 0);
  });
  await t('预算持久：重启后沿用；活动上限不可改；超额预留被拒', async () => {
    const d = dir('persist'); const a = new Billing(d); a.openCampaign('c', 1);
    const h = a.reserve('c', 0.4); a.settle(h, 0.3, { hit: 0, miss: 10, out: 5 });
    const b = new Billing(d); const r = b.report('c'); eq(r.actualPeakRateUsd, 0.3); eq(r.capUsd, 1);
    throws(() => b.openCampaign('c', 2), /已固定/); eq(b.reserve('c', 0.8), null, '0.3+0.8>1'); ok(b.reserve('c', 0.6), '0.3+0.6 可');
  });
  await t('预留在派发前已落盘', async () => {
    const items = mk(1); let seen = null;
    const R = runIt('prewrite', items, { transport: mockTransport((body) => { const recs = lines(path.join(R.d, 'billing.jsonl')); seen = recs.filter(r => r.type === 'reserve' && r.key).length - recs.filter(r => r.type === 'settle').length; }) });
    await R.go(); eq(seen, 1, '派发时账本里应已有 1 条未结算预留');
  });
  await t('中断恢复：进程带着未结算预留崩溃 → 下次启动按沉没估计保守回收', async () => {
    const d = dir('crash'); const f = child('crash', `import {Billing} from '${url('billing.mjs')}'; const b=new Billing(process.argv[2]); b.openCampaign('c',1); b.reserve('c',0.2); b.reserve('c',0.1); process.exit(0);`);
    await spawnWait(f, [d]); const b = new Billing(d); const o = b.openCampaign('c', 1); eq(o.recovered, 2);
    const r = b.report('c'); eq(r.unknownSunkEstUsd, 0.3); eq(r.openReservationsUsd, 0);
  });
  await t('并发进程不会各自花掉同一份预算（cap=3 的预留，两个进程各抢 10 次）', async () => {
    const d = dir('contend'); new Billing(d).openCampaign('c', 3);
    const f = child('contend', `import {Billing} from '${url('billing.mjs')}'; const b=new Billing(process.argv[2]); b.openCampaign('c',3); let n=0; for(let i=0;i<10;i++){ if(b.reserve('c',1)) n++; } console.log(n);`);
    const out = await Promise.all([spawnWait(f, [d]), spawnWait(f, [d]), spawnWait(f, [d])]);
    eq(out.map(Number).reduce((a, b) => a + b, 0), 3, '三个进程合计只能拿到 3 个预留'); eq(new Billing(d).report('c').counts.reserved, 3);
  });
  await t('进程内并发：cap 只容 2 个预留 → 并发峰值 ≤ 2', async () => {
    const items = mk(); let inflight = 0, peak = 0; const est = items[0].requests[0].est.usd;
    const R = runIt('conc', items, { cap: est * 2.5, transport: mockTransport(async (b) => { inflight++; peak = Math.max(peak, inflight); await new Promise(r => setTimeout(r, 25)); inflight--; return okResponse(userOf(b)); }) });
    const r = await R.go({ concurrency: 6 }); ok(peak <= 2, '峰值 ' + peak); ok(r.stats.budgetStopped > 0); ok(r.budget.actualPeakRateUsd + r.budget.unknownSunkEstUsd <= est * 2.5);
  });
  await t('未知用量（超时/断连）= 沉没估计，不释放；沉没超 25% 上限即停', async () => {
    const items = mk(); const est = items[0].requests[0].est.usd; let n = 0;
    const R = runIt('unknown', items, { cap: est * 12, transport: async () => { n++; throw new ApiError('timeout', { retryable: true, maybeBilled: true }); } });
    const r = await R.go({ concurrency: 1, maxRetries: 1 }); ok(r.budget.unknownSunkEstUsd > 0 && r.budget.openReservationsUsd === 0); ok(n < 12, '应在 25% 处停，实际 ' + n);
    eq(r.budget.counts.released, 0, '不得释放');
  });
  await t('重试成本：429 未执行 → 释放；5xx 保守沉没；400 不重试', async () => {
    const items = mk(1); let n = 0;
    const A = runIt('r429', items, { transport: mockTransport((b) => (++n === 1 ? { status: 429, json: { error: { message: 'slow' } } } : undefined)) }); const ra = await A.go();
    eq(ra.budget.counts.released, 1); eq(ra.budget.unknownSunkEstUsd, 0); eq(ra.stats.fetched, 1);
    let m = 0; const B = runIt('r503', items, { transport: async () => { m++; return { status: 503, json: {} }; } }); const rb = await B.go({ maxRetries: 2 }); eq(m, 3); ok(rb.budget.unknownSunkEstUsd > 0); eq(rb.stats.retryable, 1);
    let k = 0; const C = runIt('r400', items, { transport: async () => { k++; return { status: 400, json: { error: { message: 'bad' } } }; } }); const rc = await C.go({ maxRetries: 2 }); eq(k, 1); eq(rc.stats.failed, 1);
  });
  await t('受保护参数与白名单', async () => {
    const base = { model: MODEL, messages: [{ role: 'system', content: 's' }, { role: 'user', content: 'u' }], maxTokens: 100 };
    for (const k of ['model', 'messages', 'max_tokens', 'thinking', 'stream', 'response_format']) throws(() => buildBody({ ...base, params: { [k]: 1 } }), /受保护/, k);
    throws(() => buildBody({ ...base, params: { top_k: 3 } }), /白名单/); throws(() => buildBody({ ...base, params: { temperature: 2 } }), /范围/); throws(() => buildBody({ ...base, params: { temperature: NaN } }), /有限/);
    eq(buildBody({ ...base, params: { temperature: 0.3 } }).temperature, 0.3); throws(() => buildBody({ ...base, model: 'deepseek-other' }), /未知模型/);
    const b = buildBody(base); eq(b.stream, false); eq(b.thinking, { type: 'disabled' }); eq(b.response_format, { type: 'json_object' });
  });
  await t('实际发送的请求体 = 用于哈希/估算的请求体', async () => {
    const items = mk(2); const tr = mockTransport(); const R = runIt('same', items, { transport: tr }); await R.go();
    eq(tr.calls, 2); for (const b of tr.bodies) ok(items.some(i => i.requests[0].key === hashOf(b)), '发送的请求体哈希不在 plan 里');
    const rq = items[0].requests[0]; eq(rq.est.inTok, estimateInputTokens(rq.body));
  });
  await t('畸形 usage（负数/NaN/字符串/hit+miss≠prompt）被拒并保守计入沉没', async () => {
    const bads = [{ prompt_tokens: -5, completion_tokens: 1 }, { prompt_tokens: NaN, completion_tokens: 1 }, { prompt_tokens: '9', completion_tokens: 1 },
      { prompt_tokens: 10, completion_tokens: 1, prompt_cache_hit_tokens: 3, prompt_cache_miss_tokens: 3 }, { prompt_tokens: 10, completion_tokens: Infinity }];
    for (const [i, u] of bads.entries()) {
      const R = runIt('badusage' + i, mk(1), { transport: mockTransport((b) => okResponse(userOf(b), { usage: u })) }); const r = await R.go();
      eq(r.stats.failed, 1, JSON.stringify(u)); ok(r.budget.unknownSunkEstUsd > 0); eq(r.stats.fetched, 0);
    }
    throws(() => actualUsd(MODEL, { prompt_tokens: 1.5, completion_tokens: 1 }), /整数/);
  });
  await t('截断/空响应被拒，但已发生的花费如实结算', async () => {
    const R = runIt('trunc', mk(2), { transport: mockTransport((b, n) => okResponse(userOf(b), n === 1 ? { finish: 'length' } : { content: '   ' })) }); const r = await R.go({ concurrency: 1 });
    eq(r.stats.invalid, 2); eq(r.stats.fetched, 0); ok(r.budget.actualPeakRateUsd > 0);
    for (const rec of R.store.load().values()) if (rec.kind === 'part') { eq(rec.state, 'invalid'); ok(/不完整/.test(rec.error)); }
  });
  await t('估算被实测推翻（prompt_tokens > 估算）→ 立即停止并留痕', async () => {
    const R = runIt('breach', mk(6), { cap: 100, transport: mockTransport((b) => okResponse(userOf(b), { usage: { prompt_tokens: 10_000_000, completion_tokens: 1, prompt_cache_hit_tokens: 0, prompt_cache_miss_tokens: 10_000_000 } })) });
    const r = await R.go({ concurrency: 1 }); eq(r.stats.estimateBreach, 1); eq(r.stats.sent, 1); ok(r.stats.budgetStopped >= 5);
  });
  await t('不静默换模型；响应模型不符会被统计', async () => {
    const w = fakeWorld({ nodes: [node('n.1', { statement: ZH(1) })] }); throws(() => nodeText.collect({ world: w, vocab: buildVocab(w.graph), model: 'nope' }), /未知模型/);
    const R = runIt('mm', mk(1), { transport: mockTransport((b) => okResponse(userOf(b), { model: 'some-other-model' })) }); const r = await R.go(); eq(r.stats.modelMismatch, 1);
  });
  await t('数值严格校验：NaN/Infinity/负数/非数字一律拒绝', async () => {
    for (const bad of [NaN, Infinity, -1, '1', null, undefined]) throws(() => finite(bad, 'x'), /x/);
    const b = new Billing(dir('num')); throws(() => b.openCampaign('c', -1), /capUsd/); throws(() => b.openCampaign('c', NaN), /capUsd/); b.openCampaign('c', 1);
    throws(() => b.reserve('c', NaN), /est/); throws(() => b.reserve('c', -0.1), /est/);
    throws(() => priceOf(MODEL, { models: { [MODEL]: { hit: -1, miss: 1, out: 1 } } }), /pricing/); throws(() => priceOf('zzz'), /未知模型/);
    throws(() => httpTransport({ timeoutMs: NaN }), /timeoutMs/);
  });
  await t('凭据保密：金丝雀密钥不出现在 store / 账本 / 报告 / 错误；源码不含疑似密钥', async () => {
    const canary = 'sk-CANARYCANARY1234567890'; process.env.DEEPSEEK_API_KEY = canary;
    const R = runIt('canary', mk(2), { transport: async () => { throw new ApiError('boom ' + canary + ' Bearer ' + canary, { retryable: false }); } }); const r = await R.go();
    const blob = JSON.stringify(r) + fs.readFileSync(R.store.file, 'utf8') + fs.readFileSync(path.join(R.d, 'billing.jsonl'), 'utf8'); delete process.env.DEEPSEEK_API_KEY;
    ok(!blob.includes('CANARYCANARY'), '泄漏'); ok(!redact('x ' + canary, canary).includes('CANARY'));
    const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
    for (const f of walk(path.join(HERE, '..')).filter(f => /\.(mjs|json)$/.test(f) && !f.includes('test'))) ok(!/sk-[A-Za-z0-9]{16,}/.test(fs.readFileSync(f, 'utf8')), '疑似密钥 ' + f);
  });
}

export async function lockAndStore() {
  console.log('锁 / 结果库');
  const hostN = os.hostname();
  await t('活锁不会因「年龄」被回收；同进程内第二把锁拿不到', async () => {
    const f = path.join(dir('lock1'), 'x.lock'); const a = new Lock(f); a.acquire();
    const o = JSON.parse(fs.readFileSync(f, 'utf8')); fs.writeFileSync(f, JSON.stringify({ ...o, ts: 1 }));          // 把时间改成「很久以前」
    const e = throws(() => new Lock(f, { retryMs: 60 }).acquire(), /被占用/); ok(e instanceof LockHeld); eq(Lock.inspect(f).owner.token, a.token, '锁文件不得被动'); a.release();
  });
  await t('已死属主的锁被回收，且多进程互斥无丢更新（4 进程 × 25 次自增）', async () => {
    const d = dir('lock2'); const lf = path.join(d, 'c.lock'); const cf = path.join(d, 'counter.txt'); fs.writeFileSync(cf, '0');
    fs.writeFileSync(lf, JSON.stringify({ pid: 99999999, host: hostN, token: 'dead-owner', ts: Date.now() }));
    const f = child('incr', `import fs from 'node:fs'; import {Lock} from '${url('lib/lock.mjs')}'; const [lf,cf]=process.argv.slice(2); const l=new Lock(lf,{retryMs:20000});
for(let i=0;i<25;i++){ l.withLock(()=>{ const v=+fs.readFileSync(cf,'utf8'); fs.writeFileSync(cf,String(v+1)); }); } console.log('done');`);
    await Promise.all([1, 2, 3, 4].map(() => spawnWait(f, [lf, cf]))); eq(fs.readFileSync(cf, 'utf8'), '100'); ok(!fs.existsSync(lf), '结束后锁应已释放');
  });
  await t('回收不会误删「刚获得的活锁」', async () => {
    const f = path.join(dir('lock3'), 'x.lock'); const a = new Lock(f); a.acquire();
    const b = new Lock(f); b._reclaim('some-old-dead-token');                              // 回收者手里拿的是旧 token
    eq(Lock.inspect(f).owner.token, a.token, '活锁被误删'); ok(!fs.existsSync(f + '.reclaim'), '回收互斥锁应已释放'); a.release();
  });
  await t('锁元数据损坏：视为未知属主持有，不删除', async () => {
    const f = path.join(dir('lock4'), 'x.lock'); fs.writeFileSync(f, '{这不是json');
    throws(() => new Lock(f, { retryMs: 60 }).acquire(), /损坏/); eq(fs.readFileSync(f, 'utf8'), '{这不是json');
  });
  await t('释放前核对属主：锁已换主则不删', async () => {
    const f = path.join(dir('lock5'), 'x.lock'); const a = new Lock(f); a.acquire(); fs.writeFileSync(f, JSON.stringify({ pid: process.pid, host: hostN, token: 'someone-else', ts: Date.now() })); a.release();
    eq(Lock.inspect(f).owner.token, 'someone-else');
    throws(() => Lock.forceRemove(f, 'wrong'), /token/); ok(Lock.forceRemove(f, 'someone-else'));
  });
  await t('withLock 只接受同步回调：异步函数/返回 Promise 都被拒，锁不泄漏', async () => {
    const f = path.join(dir('lock6'), 'x.lock'); const l = new Lock(f);
    throws(() => l.withLock(async () => 1), /异步/); throws(() => l.withLock(() => Promise.resolve(1)), /Promise/); ok(!fs.existsSync(f)); l.withLock(() => 1);
  });
  await t('存储 schema：非法记录写入被拒且文件不变；读入时的非法/未知状态报错', async () => {
    const d = dir('schema'); const s = new Store(d, 'x'); s.append({ key: 'a', state: 'ok' }); const size = fs.statSync(s.file).size;
    for (const bad of [{ state: 'ok' }, { key: 'b', state: 'weird' }, { key: 'c', state: 'ok', usd: -1 }, { key: 'd', state: 'ok', usage: { prompt_tokens: 1.5 } }, { key: 'e', state: 'ok', id: 5 }]) throws(() => s.append(bad));
    eq(fs.statSync(s.file).size, size); fs.appendFileSync(s.file, JSON.stringify({ key: 'z', state: 'bogus' }) + '\n');
    throws(() => new Store(d, 'x').load(), /损坏/); ok(!new Store(d, 'x').verify().ok);
    throws(() => checkRecord(null), /对象/);
  });
  await t('撕裂尾行：存入 .torn 后截断；中间坏记录：拒绝加载且不改写', async () => {
    const d = dir('torn'); const s = new Store(d, 'x'); s.append({ key: 'a', state: 'ok' }); s.append({ key: 'b', state: 'ok' });
    fs.appendFileSync(s.file, '{"key":"c","sta'); eq(new Store(d, 'x').load().size, 2); s.append({ key: 'd', state: 'ok' });
    eq([...new Store(d, 'x').load().keys()].sort(), ['a', 'b', 'd']); ok(fs.readFileSync(s.file + '.torn', 'utf8').includes('sta'));
    const ls = fs.readFileSync(s.file, 'utf8').split('\n'); ls[0] = '{坏'; fs.writeFileSync(s.file, ls.join('\n')); const before = fs.readFileSync(s.file, 'utf8');
    const e = throws(() => new Store(d, 'x').load(), /损坏/); ok(e instanceof StoreCorrupt); throws(() => new Store(d, 'x').append({ key: 'q', state: 'ok' }), /损坏/); eq(fs.readFileSync(s.file, 'utf8'), before, '不得静默改写');
  });
  await t('追加是线性开销：1200 次追加累计读取字节 ≤ 2× 文件大小', async () => {
    const s = new Store(dir('linear'), 'x'); for (let i = 0; i < 1200; i++) s.append({ key: 'k' + i, state: 'ok', id: 'n' + i });
    const size = fs.statSync(s.file).size; ok(s.stats.bytesRead <= 2 * size, `bytesRead ${s.stats.bytesRead} vs size ${size}`); eq(s.map.size, 1200);
    const other = new Store(path.dirname(s.file), 'x'); eq(other.load().size, 1200);                       // 另一实例增量读到全部
  });
  await t('compact：持同一把锁；不碰账本；批准记录保留；备份哈希核对', async () => {
    const d = dir('compact'); const b = new Billing(d); b.openCampaign('c', 1); const h = b.reserve('c', 0.1); b.settle(h, 0.05, { hit: 0, miss: 1, out: 1 });
    const s = new Store(d, 'x'); s.append({ key: 'a', state: 'ok' }); s.append({ key: 'a', state: 'approved', approval: { resultHash: 'h' } }); s.append({ key: 'b', state: 'fetched', usd: 0.01 });
    const bill0 = fs.readFileSync(path.join(d, 'billing.jsonl')); const pre = fs.readFileSync(s.file);
    const held = new Lock(s.lock.file); held.acquire(); throws(() => new Store(d, 'x').compact(), /被占用/); held.release();
    eq(s.compact(), 2); eq(s.load().get('a').state, 'approved'); eq(s.load().get('a').approval.resultHash, 'h');
    ok(Buffer.compare(bill0, fs.readFileSync(path.join(d, 'billing.jsonl'))) === 0, '账本历史必须原样保留'); ok(Buffer.compare(pre, fs.readFileSync(s.file + '.bak')) === 0, '.bak 应是压缩前原文');
    eq(new Billing(d).report('c').actualPeakRateUsd, 0.05);
  });
}
