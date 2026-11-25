/* 适配器取术语的唯一入口。默认 = 逐条选词（selectTerms，试点用的方式，请求体逐字节不变）；
   若 vocab.clusterGlossary（Map: cluster → {中文: 英文}）存在且该条目所在星团有词表 → 「星团词表」模式：
     glossary = 该星团的稳定紧凑词表（同星团同 kind 的请求逐 token 共享这段前缀）；
     glossary_extra = 该条目自己需要、但星团词表里没有（或译法不同）的词——保证数学上不丢术语，紧跟在稳定前缀之后。 */
import { selectTerms } from './glossary.mjs';
import { locate } from './schedule.mjs';
import { sha256 } from './util.mjs';

export function glossFields(text, vocab, world, scope, id) {
  const fb = vocab.feedback && vocab.feedback.get(sha256(text)); const F = fb ? { reviewer_findings: fb } : {};
  const item = selectTerms(text, vocab); const cg = vocab.clusterGlossary;
  if (!cg) return { glossary: item, ...F };
  const base = cg.get(locate(world, { scope, id }).cluster); if (!base) return { glossary: item, ...F };
  const extra = {}; for (const k of Object.keys(item)) if (base[k] !== item[k]) extra[k] = item[k];
  return Object.keys(extra).length ? { glossary: base, glossary_extra: extra, ...F } : { glossary: base, ...F };
}

/** 由一批待译条目（已带 it.loc）确定性地构造各星团的紧凑词表：按「出现在多少条源文里」降序，>= minDocs，最多 cap 条，同分按中文序。 */
export function buildClusterGlossaries(items, vocab, { minDocs = 3, cap = 24 } = {}) {
  const per = new Map();
  for (const it of items) { const c = it.loc && it.loc.cluster; if (!c || c === 'unknown') continue; const m = per.get(c) || per.set(c, new Map()).get(c);
    for (const t of Object.keys(selectTerms(it.zh, vocab))) m.set(t, (m.get(t) || 0) + 1); }
  const out = new Map();
  for (const [c, m] of per) { const pick = [...m].filter(([, n]) => n >= minDocs).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, cap);
    if (pick.length) out.set(c, Object.fromEntries(pick.map(([t]) => [t, vocab.vocab.get(t)]).sort((a, b) => (a[0] < b[0] ? -1 : 1)))); }
  return out;
}
