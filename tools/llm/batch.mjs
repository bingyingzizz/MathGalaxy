/* 批处理核心（库，适配器驱动）：plan / run / validate / approve。阶段互相独立，命令之间不自动串联。
   记录两层：
     · part（一次 API 请求；key = 完整请求体哈希）：fetched | invalid（截断/空）| retryable | failed —— 断点续跑与缓存按它算；
     · item（一个翻译单元；key = hash{身份, 源哈希, 配置哈希, 各 part 键}）：ok | review | invalid → approved → applied。
   预算：每次尝试派发前先向持久账本（billing.mjs）预留并落盘；用量未知记沉没估计；估算被实测推翻即停。 */
import { chat, ApiError } from './deepseek.mjs';
import { actualUsd, savingsOf } from './cost.mjs';
import { orderTodo, phasesOf } from './lib/schedule.mjs';
import { validate } from './validate.mjs';
import { hashOf, redact } from './lib/util.mjs';

const PART_DONE = new Set(['fetched', 'invalid', 'failed']);

export function plan({ items, store, limit = null, retryInvalid = false }) {
  const have = store.load(); const todo = []; let cachedParts = 0, parts = 0;
  for (const it of items) for (const rq of it.requests) {
    parts++; const rec = have.get(rq.key);
    if (rec && PART_DONE.has(rec.state) && !(retryInvalid && (rec.state === 'invalid' || rec.state === 'failed'))) { cachedParts++; continue; }
    todo.push({ it, rq });
  }
  const ordered = orderTodo(todo);                                    // 缓存感知顺序（确定性）；limit 取这个顺序的前 N 个
  const picked = limit ? ordered.slice(0, limit) : ordered;
  const sum = f => picked.reduce((a, x) => a + f(x.rq), 0);
  return { items: items.length, requests: parts, cachedRequests: cachedParts, toRun: picked.length,
    estInputTokens: sum(r => r.est.inTok), maxOutputTokens: sum(r => r.est.outTok), estUsdUpperBoundPeak: +sum(r => r.est.usd).toFixed(6),
    prefixGroups: new Set(picked.map(x => x.rq.prefixGroup)).size, _picked: picked };
}

export async function run({ items, store, billing, campaign, model, limit, concurrency = 4, transport, maxRetries = 2, backoffMs = 800, retryInvalid = false, warmup = 1 }) {
  if (!Number.isInteger(limit) || limit < 1) throw new Error('run 必须显式给 --limit（正整数）');
  if (!campaign) throw new Error('run 必须在已开启的预算活动（--campaign / --max-usd）内进行');
  const p = plan({ items, store, limit, retryInvalid }); store.open();
  const stats = { localCacheHits: p.cachedRequests, sent: 0, fetched: 0, invalid: 0, failed: 0, retryable: 0, budgetStopped: 0, estimateBreach: 0, modelMismatch: 0 };
  let halt = false;
  async function worker(queue) {
    for (;;) {
      if (halt || billing.halted(campaign)) { stats.budgetStopped += queue.length; queue.length = 0; return; }
      const next = queue.shift(); if (!next) return; const { it, rq } = next;
      const loc = it.loc || {}; const meta = { ctype: rq.kind || null, sector: loc.sector || null, cluster: loc.cluster || null, group: rq.prefixGroup || null, arm: it.arm || null };
      const base = { key: rq.key, kind: 'part', identity: it.identity, op: it.adapter, id: it.id, field: it.field, seg: rq.seg, ...meta };
      let bad = null;
      const hooks = {
        beforeAttempt: () => { const h = billing.reserve(campaign, rq.est.usd, { key: rq.key, identity: it.identity, ...meta }); if (h) stats.sent++; return h; },
        afterAttempt: (h, kind, usage) => {
          if (kind === 'ok') {
            try {
              const a = actualUsd(rq.body.model, usage); billing.settle(h, a.usd, a.tok);
              if (a.promptTokens > rq.est.inTok || a.tok.out > rq.body.max_tokens) { stats.estimateBreach++; halt = true; }       // 估算被实测推翻：停止并留痕
            } catch (e) { bad = redact(e.message); billing.sink(h, 'bad-usage'); }
          } else if (kind === 'notsent') billing.release(h); else billing.sink(h);
        },
      };
      try {
        const r = await chat({ body: rq.body, transport, maxRetries, backoffMs, hooks });
        if (bad) { store.append({ ...base, state: 'failed', error: 'usage 畸形：' + bad }); stats.failed++; continue; }
        const a = actualUsd(rq.body.model, r.usage);
        if (r.respModel && r.respModel !== rq.body.model) stats.modelMismatch++;
        const truncated = r.finish !== 'stop' || !r.content || !r.content.trim();
        store.append({ ...base, state: truncated ? 'invalid' : 'fetched', raw: r.content, finish: r.finish, usage: r.usage, usd: a.usd, tok: a.tok, promptTokens: a.promptTokens, savingsUsd: savingsOf(rq.body.model, a.tok), respModel: r.respModel,
          ...(truncated ? { error: `响应不完整（finish_reason=${r.finish}）` } : {}) });
        truncated ? stats.invalid++ : stats.fetched++;
      } catch (e) {
        if (e instanceof ApiError && e.status === -1) { stats.budgetStopped += 1 + queue.length; queue.length = 0; return; }
        const retryable = e instanceof ApiError && e.retryable;
        store.append({ ...base, state: retryable ? 'retryable' : 'failed', error: redact(e.message) });
        retryable ? stats.retryable++ : stats.failed++;
      }
    }
  }
  const ph = phasesOf(p._picked, warmup); stats.phases = { warmup: ph.warmup.length, seeds: ph.seeds.length, tail: ph.tail.length };
  const pool = Math.max(1, concurrency);
  for (const x of ph.warmup) await worker([x]);                      // 暖机：串行，先把公共前缀建进缓存（官方：缓存构建需要数秒）
  const drain = q => Promise.all(Array.from({ length: pool }, () => worker(q)));
  await drain(ph.seeds.slice());                                     // 播种：每个前缀组的第一个（并发）
  await drain(ph.tail.slice());                                      // 其余（并发）
  return { stats, plan: { toRun: p.toRun, cachedRequests: p.cachedRequests }, budget: billing.report(campaign) };
}

/** 校验阶段：离线、可反复跑（改规则不用再付费）。approved/applied 不动。 */
export function validateStage({ adapter, items, store }) {
  const have = store.load(); const out = []; const tally = { ok: 0, review: 0, invalid: 0, missing: 0, unchanged: 0 };
  for (const it of items) {
    const cur = have.get(it.key);
    if (cur && ['approved', 'applied'].includes(cur.state)) { tally.unchanged++; continue; }
    const recs = it.requests.map(rq => have.get(rq.key));
    if (recs.some(r => !r || !['fetched', 'invalid'].includes(r.state))) { tally.missing++; continue; }
    let state, errors = [], flags = [], info = [], result = null;
    const bad = recs.find(r => r.state === 'invalid');
    if (bad) { state = 'invalid'; errors = [bad.error || '某次响应不完整']; }
    else {
      const parsed = recs.map(r => adapter.parse(r.raw)); const pe = parsed.find(x => x.err);
      if (pe) { state = 'invalid'; errors = [pe.err]; }
      else {
        const pj = parsed.map(x => x.ok); result = adapter.assemble(it, pj);
        const v = validate({ mode: adapter.modeOf(it), zh: it.zh, en: result.en, ambiguities: result.ambiguities, suspected: result.suspected, confidence: result.confidence, id: result.id, expectId: it.expectId });
        errors = v.errors; flags = v.flags; info = v.info || [];
        if (adapter.validateExtra) { const x = adapter.validateExtra(it, result, pj); errors = errors.concat(x.errors); flags = flags.concat(x.flags); }
        state = errors.length ? 'invalid' : (flags.length || adapter.review.always) ? 'review' : 'ok';
        if (state === 'review' && !flags.length) flags = ['该类内容一律需要人工语义审查'];
      }
    }
    tally[state]++;
    if (!cur || cur.state !== state || JSON.stringify(cur.errors || []) !== JSON.stringify(errors) || JSON.stringify(cur.flags || []) !== JSON.stringify(flags)) {
      out.push({ key: it.key, kind: 'item', adapter: adapter.id, identity: it.identity, id: it.id, field: it.field, srcHash: it.srcHash, cfgHash: it.cfgHash,
        parts: it.requests.map(r => r.key), state, errors, flags, info, result, resultHash: result ? hashOf(result) : null,
        usd: recs.reduce((a, r) => a + (r.usd || 0), 0), target: it.writeTarget, proof: it.proof || null });
    }
  }
  if (out.length) store.append(out);
  return tally;
}

/** 批准：绑定 {key, resultHash, srcHash, cfgHash}。review 必须逐条点名；ok 可 --all-ok。 */
export function approve({ store, identities = null, includeOkAll = false }) {
  const have = store.load(); const out = []; const latest = new Map();         // 同一身份（含返工后的新条目）只批准最新一条
  for (const r of have.values()) if (r.kind === 'item' && r.result && (!latest.has(r.identity) || String(r.t) >= String(latest.get(r.identity).t))) latest.set(r.identity, r);
  for (const r of latest.values()) {
    if (r.kind !== 'item' || !r.result) continue;
    const named = identities && identities.includes(r.identity);
    if (!(named || (includeOkAll && r.state === 'ok'))) continue;
    if (!['ok', 'review'].includes(r.state)) continue;
    out.push({ ...r, t: undefined, state: 'approved', approval: { key: r.key, resultHash: hashOf(r.result), srcHash: r.srcHash, cfgHash: r.cfgHash } });
  }
  if (out.length) store.append(out);
  return out.length;
}
