#!/usr/bin/env bun
/* 词表体检（只读、确定性）。范围 = 实际会进入待译请求的词条（对待译源文跑 selectTerms 命中的那些），按影响面排序。
   用法：bun tools/llm/glossary-audit.mjs [--top 60] [--json out.json]
   检查（都只是线索，改不改由人判断）：
     abbrev    英文名像缩写/带括号/句点（现在由 buildVocab 的 R2/R3 自动弃用，这里只复核 curated 与漏网者）
     case      通用词仍首字母大写（中文名无拉丁字母）
     super     含该词的更短复合节点名（≤ 词长+4），其英文不含该词英文的词干——子串匹配会误译
     samean    不同中文词映射到同一英文名（同义撞车）
     reviewed  已审英文译文里该词的实际译法与词表不一致（≥2 次出现、一致率 < 50%）
     ctx       高频词（≥15 次）的高频复合上下文（该复合不在词表里）——需人工判断是否要加规则/覆盖
   覆盖写进 glossary.json（terms 覆盖 / ambiguous 剔除 / rules 限定上下文）；词表哈希进处理配置，旧批准与缓存因此自动失效。 */
import fs from 'node:fs';
import { world } from './lib/source.mjs';
import { buildVocab, selectTerms, GLOSSARY_CFG, ABBREV } from './lib/glossary.mjs';
import { ADAPTERS } from './jobs/index.mjs';

const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const w = world(); const V = buildVocab(w.graph); const model = 'deepseek-flash';
const stem = en => en.toLowerCase().replace(/[-–]/g, ' ').replace(/\s+/g, ' ').trim();
const stemWord = en => { const ws = stem(en).split(' ').filter(x => x.length > 2); const k = ws.sort((a, b) => b.length - a.length)[0] || stem(en); return k.slice(0, Math.max(4, k.length - 2)); };
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// 1. 待译源文里的词条使用量（公式抹掉后的纯文本也留着做上下文统计）
const use = new Map(); let sources = 0; const texts = [];
for (const [a, ad] of Object.entries(ADAPTERS)) {
  if (a === 'abstract') continue;
  for (const it of ad.collect({ world: w, vocab: V, model })) {
    sources++; texts.push(it.zh.replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, '¤'));
    for (const t of Object.keys(selectTerms(it.zh, V))) use.set(t, (use.get(t) || 0) + 1);
  }
}
// 2. 已审译文对、节点名
const st = (w.MG.i18nStatements && w.MG.i18nStatements.items) || {}; const pairs = [];
for (const n of w.graph.nodes) for (const f of ['statement', 'notes']) { const r = st[n.id] && st[n.id][f]; if (r && r.status === 'reviewed' && r.en && n[f]) pairs.push({ zh: n[f], en: stem(r.en) }); }
const labels = w.graph.nodes.filter(n => n.label && n.label_en).map(n => ({ zh: n.label, en: n.label_en }));
const byEn = new Map(); for (const [zh, en] of V.vocab) { const k = stem(en); (byEn.get(k) || byEn.set(k, []).get(k)).push(zh); }

const rows = [];
for (const [t, n] of [...use].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
  const en = V.vocab.get(t); const flags = []; const src = t in GLOSSARY_CFG.terms ? 'curated' : 'node-label';
  if (ABBREV.test(en) || /[A-Z]{2,}\b/.test(en)) flags.push('abbrev');
  if (src === 'node-label' && /[A-Z]/.test(en) && !/[A-Za-z]/.test(t)) flags.push('case');
  const sw = stemWord(en);
  const sup = labels.filter(l => l.zh !== t && l.zh.includes(t) && l.zh.length <= t.length + 4 && !stem(l.en).includes(sw));
  if (sup.length) flags.push(`super(${sup.length}: ${sup.slice(0, 2).map(l => l.zh + '→' + l.en).join('; ')})`);
  const same = (byEn.get(stem(en)) || []).filter(x => x !== t); if (same.length) flags.push(`samean(${same.slice(0, 2).join(',')})`);
  const occ = pairs.filter(p => p.zh.includes(t));
  if (occ.length >= 2) { const ag = occ.filter(p => p.en.includes(stem(en)) || p.en.includes(sw)).length / occ.length; if (ag < 0.5) flags.push(`reviewed(${(ag * 100) | 0}% of ${occ.length})`); }
  if (n >= 15) {
    const ctx = new Map(); const re = new RegExp('(.)?' + escRe(t) + '(.)?', 'g'); let total = 0;
    for (const x of texts) for (const m of x.matchAll(re)) {
      total++;
      for (const [ch, k] of [[m[2], t + (m[2] || '')], [m[1], (m[1] || '') + t]]) if (ch && /[一-鿿]/.test(ch) && !V.vocab.has(k)) ctx.set(k, (ctx.get(k) || 0) + 1);
    }
    const top = [...ctx].filter(([, c]) => c >= 6 && c / total >= 0.1).sort((a, b) => b[1] - a[1]).slice(0, 3);
    if (top.length) flags.push('ctx(' + top.map(([k, c]) => k + '×' + c).join(' ') + ')');
  }
  rows.push({ term: t, en, uses: n, src, flags });
}
const flagged = rows.filter(r => r.flags.length);
const summary = { sourcesScanned: sources, termsInBacklogRequests: rows.length, curated: rows.filter(r => r.src === 'curated').length, fromNodeLabels: rows.filter(r => r.src !== 'curated').length,
  flagged: flagged.length, ambiguousList: GLOSSARY_CFG.ambiguous.length, reviewedPairs: pairs.length };
if (opt('json')) fs.writeFileSync(opt('json'), JSON.stringify({ summary, rows }, null, 1));
console.log(JSON.stringify(summary));
for (const r of flagged.slice(0, +opt('top', 60))) console.log(`${String(r.uses).padStart(4)}  ${r.term.padEnd(10)} → ${r.en.padEnd(30)} [${r.src}] ${r.flags.join(' ')}`);
