/* 术语子集选择（确定性）。目标：只给模型它**确实需要**的、无歧义的术语，且选词结果进入缓存键。
   规则：
     1. 候选 = glossary.json 的 terms ∪ 图里节点的 label→label_en（同一中文名对应多个不同英文名则整条丢弃）。
     2. 只取长度 ≥ 2 的词；单字词（积/链/商/环…）一律不自动选。
     3. glossary.json 的 ambiguous 词与「上下文规则」不允许的位置（rules.notFollowedBy / notPrecededBy）不选。
     4. 在文本里从左到右做**最长匹配**（积分 吃掉 积；素理想 吃掉 理想），匹配到更长的候选就不会再单独选短词。
     5. 最多 30 条，按首次出现位置排序。 */
import fs from 'node:fs';
import path from 'node:path';
import { sha256, canon } from './util.mjs';

const CFG = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'glossary.json'), 'utf8'));
export const VOCAB_RULES_VERSION = 'vocab-rules-v2';     // 节点标签→词条的过滤/规范化规则的版本；改规则必须改它（进 GLOSSARY_HASH）
export const GLOSSARY_HASH = sha256(canon({ terms: CFG.terms, ambiguous: CFG.ambiguous, rules: CFG.rules, vr: VOCAB_RULES_VERSION })).slice(0, 16);
export const GLOSSARY_CFG = CFG;

/* 节点标签 → 词条的规则（只作用于「由节点 label/label_en 自动派生」的词条；glossary.json 的 terms 是人工整理，不受影响）：
   R1 中文名不含拉丁字母（即不含人名/专名）时，英文 Title Case 一律降为小写（Pullback → pullback）；含拉丁字母的不动；
   R2 英文是并列/复合标题（含 " and "、"/"、括号、" vs "）而中文并无对应的并列标记 → 弃用（范数→"norm and normed space"、边缘→"Boundaries and Coboundaries"）；
   R3 英文含缩写片段（rep/thm/prop/eq/fn… 或句点）→ 弃用（正则表示→"Regular rep"）。
   被弃用的词不会进请求；需要时在 glossary.json 的 terms 里人工给出规范译名。 */
export const ABBREV = /\b(rep|thm|prop|cor|lem|def|fn|func|alg|eq|eqn|op|ops|cond|const|diff|nbhd|conv|seq|fcn|cat|hom)\b|\.|\(|\)|\//i;
const PROPER = /^(Tor|Ext|Hom|End|Aut|Lie|Galois|Jacobi|Jacobian|Euler|Cauchy|Riemann|Lebesgue|Hilbert|Banach|Hausdorff|Noether|Taylor|Fourier|Laplace|Stone|Zorn|Cantor|Gauss|Green|Stokes|Lagrange|Zariski|Frobenius|Sylow|Cech|Čech|Kähler|Dirichlet|Fatou|Hahn|Baire|Möbius|Moore|Penrose|Yoneda|Chern|Boolean|Gödel|Heine|Borel|Chinese|Gram|Schmidt|Hamel|Tychonoff|Urysohn|Tietze)$/;
export function normalizeLabelTerm(zh, en) {
  if ((/ and | vs |[()/]/.test(en)) && !/[与和及／/（(]/.test(zh)) return null;
  const latin = /[A-Za-z]/.test(zh);
  if (ABBREV.test(en) && !latin) return null;
  if (!latin && /[A-Z]{3,}/.test(en)) return null;                       // 全大写缩写（RAPL…）
  if (!latin && /^[A-Z][A-Za-z]*([\s-]+[A-Za-z]+)*$/.test(en) && !/[A-Z]{2}/.test(en) && /[\s-][A-Z]|^[A-Z][a-z]+$/.test(en)) return en.split(/(\s+|-)/).map(w => (PROPER.test(w) || /^(\s+|-)$/.test(w) ? w : w.toLowerCase())).join('');
  if (!latin && /^[A-Z][a-z]+\s/.test(en) && !PROPER.test(en.split(/\s/)[0])) return en[0].toLowerCase() + en.slice(1);    // 首词是通用词（Class function）
  return en;
}
export function buildVocab(graph) {
  const vocab = new Map(); const conflict = new Set();
  for (const [zh, en] of Object.entries(CFG.terms)) vocab.set(zh, en);
  for (const n of graph.nodes) {
    const zh = String(n.label || '').trim(); let en = String(n.label_en || '').trim();
    if (zh.length < 2 || !en || /[一-鿿]/.test(en) || /[$\\]/.test(zh)) continue;
    en = normalizeLabelTerm(zh, en); if (!en) continue;
    if (vocab.has(zh) && vocab.get(zh) !== en && !(zh in CFG.terms)) conflict.add(zh);
    else if (!vocab.has(zh)) vocab.set(zh, en);
  }
  for (const c of conflict) vocab.delete(c);
  for (const a of CFG.ambiguous) vocab.delete(a);
  return { terms: [...vocab.keys()].filter(k => k.length >= 2).sort((a, b) => b.length - a.length || a.localeCompare(b)), vocab };
}

export function selectTerms(text, V, limit = 30) {
  const s = String(text || '').replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, m => '\u0001'.repeat(m.length));   // 公式不参与
  const out = {}; let n = 0;
  for (let i = 0; i < s.length && n < limit;) {
    let hit = null;
    for (const t of V.terms) {
      if (t.charCodeAt(0) !== s.charCodeAt(i) || !s.startsWith(t, i)) continue;
      const rule = CFG.rules[t];
      if (rule && rule.notFollowedBy && rule.notFollowedBy.some(x => s.startsWith(x, i + t.length))) continue;
      if (rule && rule.notPrecededBy && rule.notPrecededBy.some(x => i >= x.length && s.slice(i - x.length, i) === x)) continue;
      hit = t; break;                                                                 // terms 已按长度降序：第一个命中的就是最长的
    }
    if (hit) { if (!(hit in out)) { out[hit] = V.vocab.get(hit); n++; } i += hit.length; } else i++;
  }
  return out;
}
