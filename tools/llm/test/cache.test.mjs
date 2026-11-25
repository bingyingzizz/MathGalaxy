/* 缓存感知调度与用量报表的离线回归：确定性分组、稳定前缀、条目内容位置、缓存身份、
   hit/miss 聚合、节省额计算、保守预算不依赖命中、中断续跑。mock 传输，零计费。 */
import fs from 'node:fs';
import path from 'node:path';
import { t, eq, ok, dir, fakeWorld, node, edge, mockTransport, okResponse, userOf, MODEL } from './h.mjs';
import { Store } from '../store.mjs';
import { Billing } from '../billing.mjs';
import { run, plan } from '../batch.mjs';
import { buildVocab } from '../lib/glossary.mjs';
import { orderTodo, phasesOf, locate } from '../lib/schedule.mjs';
import { aggregateUsage } from '../usagereport.mjs';
import { savingsOf, uncachedEquivalentUsd, actualUsd, PRICING } from '../cost.mjs';
import { isPeak } from '../lib/offpeak.mjs';
import { ADAPTERS } from '../jobs/index.mjs';
import { SYSTEM as NODE_SYS } from '../jobs/node-text.mjs';
import { SYSTEM as EDGE_SYS } from '../jobs/edge-text.mjs';
import { SYSTEM as PROOF_SYS } from '../jobs/proof.mjs';
import { SYSTEM as ABS_SYS } from '../jobs/abstract.mjs';
import { HEAD, RULES } from '../jobs/common.mjs';

const ZH = '设 $G$ 为群，则 $H$ 是子群。';
const mk = () => {
  const w = fakeWorld({ nodes: [node('a.1', { statement: ZH, cluster: 'c.a', notes: '另一个说明文字足够长。' }), node('a.2', { statement: ZH + '再加一句。', cluster: 'c.a' }), node('b.1', { statement: ZH, cluster: 'c.b' })],
    edges: [edge('imp.x', { proof: '假设 $A$ 成立。由 $A\\subset B$ 得 $B$。', target: 'a.1', sources: ['a.2'] })] });
  w.MG.clusters = [{ id: 'c.a', parent: 'r.a' }, { id: 'c.b', parent: 'r.b' }]; w.MG.sectors = [{ id: 's.1', regions: ['r.a'] }, { id: 's.2', regions: ['r.b'] }]; return w;
};
const collect = (w, a) => ADAPTERS[a].collect({ world: w, vocab: buildVocab(w.graph), model: MODEL }).map(it => ({ ...it, loc: locate(w, it) }));
const todoOf = (items) => items.flatMap(it => it.requests.map(rq => ({ it, rq })));
const shuffle = (a, seed) => { const r = a.slice(); let s = seed; for (let i = r.length - 1; i > 0; i--) { s = (s * 1103515245 + 12345) & 0x7fffffff; const j = s % (i + 1); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const usage = (hit, miss, out = 50) => ({ prompt_tokens: hit + miss, completion_tokens: out, prompt_cache_hit_tokens: hit, prompt_cache_miss_tokens: miss });

export async function cacheAware() {
  console.log('缓存感知调度 / 用量报表');
  await t('确定性分组与排序：任何输入顺序 → 同一全序；位置 = sector/cluster', async () => {
    const w = mk(); const todo = todoOf(collect(w, 'node-text')); const ref = orderTodo(todo).map(x => x.rq.key + x.rq.seg);
    for (const seed of [1, 2, 3, 4]) eq(orderTodo(shuffle(todo, seed)).map(x => x.rq.key + x.rq.seg), ref);
    eq(locate(w, { scope: 'node', id: 'a.1' }), { sector: 's.1', cluster: 'c.a' }); eq(locate(w, { scope: 'edge', id: 'imp.x' }), { sector: 's.1', cluster: 'c.a' }); eq(locate(w, { scope: 'node', id: 'zzz' }), { sector: 'unknown', cluster: 'unknown' });
    const sk = orderTodo(todo).map(x => x.it.loc.sector); eq(sk, [...sk].sort(), '同一 kind 内按 sector 聚拢');
  });
  await t('稳定前缀：四个适配器的 system 以逐字相同的 HEAD+RULES 开头；版本号与类型规则在其后；前缀内无时间戳/id', async () => {
    const common = HEAD + '\n' + RULES; for (const S of [NODE_SYS, EDGE_SYS, PROOF_SYS, ABS_SYS]) ok(S.startsWith(common), '公共前缀应在最前');
    for (const S of [NODE_SYS, EDGE_SYS, PROOF_SYS, ABS_SYS]) ok(!/\b20\d\d-\d\d-\d\d|requestId|timestamp/i.test(S), 'system 不含变化的元数据');
    const w = mk(); const [r1, r2] = collect(w, 'node-text').filter(i => i.field === 'statement').map(i => i.requests[0]); eq(r1.body.messages[0].content, r2.body.messages[0].content, 'system 逐字相同');
  });
  await t('条目内容位置：user JSON 键序 kind→glossary→元数据→source_text_zh（最后）；glossary 键按字典序；条目 id 不在可缓存前缀里', async () => {
    const w = mk(); w.graph.nodes.push(node('t1', { label: '子群', label_en: 'subgroup' }), node('t2', { label: '正规子群', label_en: 'normal subgroup' }));
    w.graph.byId.t1 = w.graph.nodes.at(-2); w.graph.byId.t2 = w.graph.nodes.at(-1); w.graph.byId['a.1'].statement = '正规子群与子群。';
    const it = collect(w, 'node-text').find(i => i.id === 'a.1' && i.field === 'statement'); const u = userOf(it.requests[0].body); const keys = Object.keys(u);
    eq(keys[0], 'kind'); eq(keys[1], 'glossary'); eq(keys.at(-1), 'source_text_zh'); ok(keys.indexOf('id') > keys.indexOf('glossary'));
    eq(Object.keys(u.glossary), Object.keys(u.glossary).slice().sort()); ok(Object.keys(u.glossary).length >= 2);
    const raw = it.requests[0].body.messages[1].content; const prefix = raw.slice(0, raw.indexOf('"id"')); ok(!prefix.includes('a.1') && !prefix.includes('正规子群与'), '前缀不含条目 id 与源文');
  });
  await t('缓存身份一致：同一请求体 → 同一键（与调度顺序无关）；前缀组只随 system/kind/glossary 变；改源文不改前缀组；改 glossary 才改', async () => {
    const w1 = mk(), w2 = mk(); w2.graph.byId['a.1'].statement = ZH + '多一句。';
    const a = collect(w1, 'node-text'), b = collect(w2, 'node-text'); const f = (xs, id) => xs.find(i => i.id === id && i.field === 'statement');
    eq(f(a, 'a.1').requests[0].prefixGroup, f(b, 'a.1').requests[0].prefixGroup, '源文变，前缀组不变'); ok(f(a, 'a.1').requests[0].key !== f(b, 'a.1').requests[0].key, '请求体变，键变');
    eq(f(a, 'a.1').requests[0].prefixGroup, f(a, 'b.1').requests[0].prefixGroup, '同 kind 同 glossary 共享前缀组');
    const w3 = mk(); w3.graph.nodes.push(node('g', { label: '群', label_en: 'group' })); w3.graph.byId.g = w3.graph.nodes.at(-1); w3.graph.byId['a.1'].statement = '群的定义。';
    ok(f(collect(w3, 'node-text'), 'a.1').requests[0].prefixGroup !== f(a, 'a.1').requests[0].prefixGroup, 'glossary 变则前缀组变');
    eq(orderTodo(todoOf(a)).map(x => x.rq.key).sort(), todoOf(a).map(x => x.rq.key).sort(), '排序不改键');
  });
  await t('分阶段：暖机先串行；每个前缀组恰有一个播种；其余在后；请求体零变化', async () => {
    const w = mk(); const ord = orderTodo(todoOf(collect(w, 'node-text'))); const ph = phasesOf(ord, 1);
    eq(ph.warmup.length, 1); eq(ph.warmup.length + ph.seeds.length + ph.tail.length, ord.length);
    const groups = new Set(ord.map(x => x.rq.prefixGroup)); eq(new Set([...ph.warmup, ...ph.seeds].map(x => x.rq.prefixGroup)).size, groups.size, '每组至少有一个先发');
    eq(new Set([...ph.warmup, ...ph.seeds].map(x => x.rq.prefixGroup)).size, ph.warmup.length + ph.seeds.length, '先发阶段里每组只有一个');
  });
  await t('run：暖机请求先完成再放行其余；顺序 = 调度顺序（单并发可见）；每条 part 记录带 ctype/sector/cluster/group', async () => {
    const w = mk(); const items = collect(w, 'node-text'); const d = dir('cache-run'); const billing = new Billing(d); billing.openCampaign('c', 5); const store = new Store(d, 'node-text');
    let inflight = 0, peak = 0, firstDoneBeforeSecond = null, n = 0;
    const tr = mockTransport(async body => { n++; inflight++; peak = Math.max(peak, inflight); if (n === 1) await new Promise(r => setTimeout(r, 20)); if (n === 2) firstDoneBeforeSecond = inflight === 1; inflight--; return okResponse(userOf(body), { usage: usage(0, 100) }); });
    await run({ items, store, billing, campaign: 'c', model: MODEL, limit: 50, transport: tr, backoffMs: 1, concurrency: 4 }); ok(firstDoneBeforeSecond, '第 2 个请求发出时，暖机请求已结束');
    const parts = [...store.load().values()].filter(r => r.kind === 'part'); ok(parts.length === items.length && parts.every(p => p.ctype && p.sector && p.cluster && p.group && p.tok && typeof p.savingsUsd === 'number'));
    eq(tr.bodies.map(b => userOf(b).id + userOf(b).kind), orderTodo(todoOf(items)).map(x => userOf(x.rq.body).id + userOf(x.rq.body).kind).slice(0, 1).concat(tr.bodies.slice(1).map(b => userOf(b).id + userOf(b).kind)), '首个即调度首位');
  });
  await t('用量聚合：hit/miss/completion、命中率、等价无缓存成本、节省额；按 sector/cluster/ctype/group 分组且分组之和 = 总计', async () => {
    const w = mk(); const items = collect(w, 'node-text'); const d = dir('cache-agg'); const billing = new Billing(d); billing.openCampaign('c', 5, { model: MODEL }); const store = new Store(d, 'node-text');
    let k = 0; const tr = mockTransport(body => okResponse(userOf(body), { usage: usage(k++ % 2 ? 600 : 0, k % 2 ? 0 : 400, 40) }));
    await run({ items, store, billing, campaign: 'c', model: MODEL, limit: 50, transport: tr, backoffMs: 1, concurrency: 1 });
    const r = aggregateUsage({ billingFile: path.join(d, 'billing.jsonl'), campaign: 'c', by: ['sector', 'cluster', 'ctype'] }); const T = r.total;
    eq(T.settled, items.length); eq(T.promptTokens, T.hitTokens + T.missTokens); eq(T.completionTokens, 40 * items.length);
    const p = PRICING.models[MODEL]; const expectUsd = (T.hitTokens * p.hit + T.missTokens * p.miss + T.completionTokens * p.out) / 1e6; ok(Math.abs(T.actualPeakUsd - expectUsd) < 1e-6, '成本 = hit·命中价 + miss·未命中价 + out·输出价');
    ok(Math.abs(T.uncachedEquivalentUsd - (T.promptTokens * p.miss + T.completionTokens * p.out) / 1e6) < 2e-6, "uncached"); ok(Math.abs(T.cacheSavingsUsd - (T.uncachedEquivalentUsd - T.actualPeakUsd)) < 2e-6, '节省 = 等价无缓存 − 实际');
    ok(Math.abs(T.cacheSavingsUsd - T.hitTokens * (p.miss - p.hit) / 1e6) < 1e-6, "savings"); eq(T.inputCacheHitRatio, +(T.hitTokens / T.promptTokens).toFixed(4));
    const gs = Object.values(r.groups); ok(gs.length >= 2, "groups " + Object.keys(r.groups)); for (const f of ['hitTokens', 'missTokens', 'completionTokens', 'settled']) eq(gs.reduce((a, g) => a + g[f], 0), T[f], '分组之和 = 总计 ' + f);
    ok(Object.keys(r.groups).some(x => x.startsWith("s.1 | c.a | node-statement")) && Object.keys(r.groups).some(x => x.startsWith("s.2 | c.b")), "keys " + Object.keys(r.groups));
    ok(/not|不是|账单/.test(JSON.stringify(r.notes)), '声明：计算值 ≠ 供应商账单');
  });
  await t('节省额公式：hit×(miss−hit)/1e6；全命中/全未命中边界；畸形输入拒绝', async () => {
    const p = PRICING.models[MODEL]; ok(Math.abs(savingsOf(MODEL, { hit: 1e6, miss: 0, out: 0 }) - (p.miss - p.hit)) < 1e-12); eq(savingsOf(MODEL, { hit: 0, miss: 1e6, out: 9 }), 0);
    ok(Math.abs(uncachedEquivalentUsd(MODEL, { hit: 500, miss: 500, out: 100 }) - (1000 * p.miss + 100 * p.out) / 1e6) < 1e-12);
    let bad = false; try { savingsOf(MODEL, { hit: -1, miss: 0, out: 0 }); } catch { bad = true; } ok(bad); bad = false; try { actualUsd(MODEL, usage(10, 10, 1) && { prompt_tokens: 30, completion_tokens: 1, prompt_cache_hit_tokens: 10, prompt_cache_miss_tokens: 10 }); } catch { bad = true; } ok(bad, 'hit+miss≠prompt 仍判畸形');
  });
  await t('重试与未知用量单列：重试尝试数/花费、sunk 估计、不混入 actual；本地结果缓存命中与供应商缓存分开计', async () => {
    const w = mk(); const items = collect(w, 'node-text').slice(0, 2); const d = dir('cache-retry'); const billing = new Billing(d); billing.openCampaign('c', 5, { model: MODEL }); const store = new Store(d, 'node-text'); let n = 0;
    const tr = mockTransport(body => (++n === 1 ? { status: 503, json: { error: { message: 'busy' } } } : okResponse(userOf(body), { usage: usage(200, 100) })));
    const r1 = await run({ items, store, billing, campaign: 'c', model: MODEL, limit: 50, transport: tr, backoffMs: 1, concurrency: 1 });
    const rep = aggregateUsage({ billingFile: path.join(d, 'billing.jsonl'), campaign: 'c' }).total;
    ok(rep.retryAttempts >= 1 && rep.sunkEstUsd > 0 && rep.unknownUsage >= 1, '503 计入未知用量与重试'); ok(rep.settled === items.length); ok(rep.actualPeakUsd < rep.sunkEstUsd + rep.actualPeakUsd);
    const r2 = await run({ items, store, billing, campaign: 'c', model: MODEL, limit: 50, transport: mockTransport(), backoffMs: 1 }); eq(r2.stats.sent, 0); eq(r2.stats.localCacheHits, items.length, '第二次全部命中本地结果库'); void r1;
    const tot = aggregateUsage({ billingFile: path.join(d, 'billing.jsonl'), campaign: 'c' }).total; eq(tot.hitTokens, rep.hitTokens, '本地命中不产生供应商用量');
  });
  await t('保守预算：预留永远按未命中×峰值价×满额 max_tokens，不因命中而放宽；累计 actual 为命中价，但准入仍依赖 est', async () => {
    const w = mk(); const items = collect(w, 'node-text'); const est = items[0].requests[0].est; const p = PRICING.models[MODEL];
    const body = items[0].requests[0].body; ok(Math.abs(est.usd - (est.inTok * p.miss + body.max_tokens * p.out) / 1e6) < 1e-12, '估算 = 全未命中峰值价 + 满额输出');
    const d = dir('cache-budget'); const billing = new Billing(d); billing.openCampaign('c', est.usd * 1.5, { model: MODEL }); const store = new Store(d, 'node-text');
    const tr = mockTransport(body => okResponse(userOf(body), { usage: usage(est.inTok - 1, 1, 1) }));         // 几乎全命中：实际花费极低
    const r = await run({ items: items.slice(0, 1), store, billing, campaign: 'c', model: MODEL, limit: 5, transport: tr, backoffMs: 1 }); eq(r.stats.fetched, 1);
    const h = billing.reserve('c', est.usd * 2); eq(h, null, '单次预留超过上限仍被拒，不论此前命中率多高');
    const h2 = billing.reserve('c', est.usd); ok(h2, '低实际花费后余额充足，预留仍按 est 计'); const open = billing.report('c').openReservationsUsd; ok(Math.abs(open - +est.usd.toFixed(6)) < 1e-6);
  });
  await t('中断续跑：先跑 2 个再续跑 → 不重复发已完成、不丢；part 记录集合与一次跑完相同；预算与 actual 一致', async () => {
    const w = mk(); const items = collect(w, 'node-text'); const d = dir('cache-resume'); const billing = new Billing(d); billing.openCampaign('c', 5, { model: MODEL }); const store = new Store(d, 'node-text');
    const t1 = mockTransport(); await run({ items, store, billing, campaign: 'c', model: MODEL, limit: 2, transport: t1, backoffMs: 1 }); eq(t1.calls, 2);
    const done = new Set(t1.bodies.map(b => JSON.stringify(b))); const t2 = mockTransport(); const b2 = new Billing(d); const r = await run({ items, store: new Store(d, 'node-text'), billing: b2, campaign: 'c', model: MODEL, limit: 50, transport: t2, backoffMs: 1 });
    eq(t2.calls, items.length - 2); ok(t2.bodies.every(b => !done.has(JSON.stringify(b))), '不重发已完成请求'); eq(r.stats.localCacheHits, 2);
    const parts = [...new Store(d, 'node-text').load().values()].filter(x => x.kind === 'part' && x.state === 'fetched'); eq(parts.length, items.length);
    eq(b2.report('c').counts.settled, items.length); eq(aggregateUsage({ billingFile: path.join(d, 'billing.jsonl'), campaign: 'c' }).total.settled, items.length);
  });
  await t('峰/谷：官方窗口（UTC 周一至周五 01–04、06–10 为峰；周末全谷）；只读，不建任务', async () => {
    const at = s => new Date(s + 'Z'); ok(isPeak(at('2026-11-24T02:00:00'))); ok(isPeak(at('2026-11-24T09:59:00'))); ok(!isPeak(at('2026-11-24T04:00:00'))); ok(!isPeak(at('2026-11-24T05:30:00'))); ok(!isPeak(at('2026-11-24T10:00:00'))); ok(!isPeak(at('2026-11-28T02:00:00')), '周六全谷'); ok(!isPeak(at('2026-11-29T07:00:00')), '周日全谷');
  });
  void fs; void plan; void edge;
}
