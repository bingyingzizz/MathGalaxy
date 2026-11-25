/* 用量/成本/缓存报告（只读，离线）。从持久账本 billing.jsonl（+ 可选 runs.jsonl）聚合。
   三个口径，永不混报：
     · API-reported usage：settle 记录里的 hit/miss/out token（供应商 usage 字段原样）；
     · calculated：按 pricing.json **峰值价**折算的成本、等价无缓存成本、缓存节省——是计算值，不是账单；
     · 供应商真实账单：本地不可知，以控制台为准（这里只给 sunk = 用量未知请求的保守估计）。
   本地结果缓存命中（根本不发请求，来自 runs.jsonl）与供应商上下文缓存命中（减少输入 token 单价）是两回事，分开计。
   重试 = 同一请求键的第 2 次及以后的尝试；其花费单独汇总。 */
import fs from 'node:fs';
import { PRICING, priceOf, savingsOf, uncachedEquivalentUsd } from './cost.mjs';

const DIMS = ['campaign', 'sector', 'cluster', 'ctype', 'group', 'arm'];
const blank = () => ({ attempts: 0, settled: 0, unknownUsage: 0, openOrReleased: 0, promptTokens: 0, hitTokens: 0, missTokens: 0, completionTokens: 0,
  actualPeakUsd: 0, uncachedEquivalentUsd: 0, cacheSavingsUsd: 0, sunkEstUsd: 0, retryAttempts: 0, retryActualUsd: 0, retrySunkEstUsd: 0, _keys: new Set() });

export function aggregateUsage({ billingFile, runsFile = null, campaign, by = ['campaign'], pricing = PRICING }) {
  for (const d of by) if (!DIMS.includes(d)) throw new Error(`未知维度 ${d}（可选：${DIMS.join(',')}）`);
  const lines = fs.existsSync(billingFile) ? fs.readFileSync(billingFile, 'utf8').split('\n').filter(l => l.trim()) : [];
  const res = new Map(), seenKey = new Map(); let model = null;           // rid → reserve；key → 已出现的尝试数
  const groups = new Map(); const total = blank();
  const gOf = r => { const k = by.map(d => (d === 'campaign' ? campaign : r[d] ?? 'unknown')).join(' | '); let g = groups.get(k); if (!g) groups.set(k, g = blank()); return g; };
  const each = (r, f) => { f(gOf(r)); f(total); };
  for (const l of lines) {
    let r; try { r = JSON.parse(l); } catch { continue; }                  // 读报告时容忍撕裂尾行（账本本身由 Billing 严格处理）
    if (r.campaign !== campaign) continue;
    if (r.type === 'campaign') model = r.model || model;
    else if (r.type === 'reserve') res.set(r.rid, r);
    else if (r.type === 'settle' || r.type === 'sink') {
      const rv = res.get(r.rid) || {}; const m = model || 'deepseek-flash'; const nth = seenKey.get(rv.key) || 0; if (rv.key) seenKey.set(rv.key, nth + 1);
      each(rv, g => {
        g.attempts++; if (rv.key) g._keys.add(rv.key);
        if (r.type === 'settle') {
          const tk = r.tok; g.settled++; g.hitTokens += tk.hit; g.missTokens += tk.miss; g.completionTokens += tk.out; g.promptTokens += tk.hit + tk.miss;
          g.actualPeakUsd += r.usd; g.uncachedEquivalentUsd += uncachedEquivalentUsd(m, tk, pricing); g.cacheSavingsUsd += savingsOf(m, tk, pricing);
          if (nth > 0) { g.retryAttempts++; g.retryActualUsd += r.usd; }
        } else { g.unknownUsage++; g.sunkEstUsd += r.est; if (nth > 0) { g.retryAttempts++; g.retrySunkEstUsd += r.est; } }
      });
    } else if (r.type === 'release') each(res.get(r.rid) || {}, g => { g.openOrReleased++; });
  }
  const fin = g => { const prompt = g.hitTokens + g.missTokens; const o = { ...g, requestsWithAttempts: g._keys.size, inputCacheHitRatio: prompt ? +(g.hitTokens / prompt).toFixed(4) : null }; delete o._keys;
    for (const k of ['actualPeakUsd', 'uncachedEquivalentUsd', 'cacheSavingsUsd', 'sunkEstUsd', 'retryActualUsd', 'retrySunkEstUsd']) o[k] = +o[k].toFixed(6); return o; };
  let localCacheHits = 0, runs = 0;
  if (runsFile && fs.existsSync(runsFile)) for (const l of fs.readFileSync(runsFile, 'utf8').split('\n')) { if (!l.trim()) continue; try { const r = JSON.parse(l); if (r.campaign === campaign) { runs++; localCacheHits += r.stats?.localCacheHits || 0; } } catch { /* 撕裂行 */ } }
  priceOf(model || 'deepseek-flash', pricing);
  return { campaign, model, by, rates: 'peak (pricing.json)', total: fin(total), groups: Object.fromEntries([...groups].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([k, g]) => [k, fin(g)])),
    localResultCache: { runs, requestsServedFromLocalStore: localCacheHits, note: '本地结果库命中：根本没有发出 API 请求（与供应商上下文缓存无关）' },
    notes: ['usage = API 报告；成本 = 按峰值价计算；供应商账单以控制台为准。', 'cacheSavingsUsd = 命中 token × (未命中价 − 命中价)；与「完全无缓存的等价输入成本」相比。'] };
}
