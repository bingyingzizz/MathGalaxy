/* 确定性校验：只证明「形式没坏」，⛔ 不是数学等价的证明。通过 ≠ 语义正确；模型自评从不构成批准。
   返回 {errors[], flags[]}：errors → invalid；flags → review。
   mode：statement | notes | edge-note | edge-title | abstract | proof。公式抽取与 KaTeX 选项与生产一致
   （formulasOf 同 build.mjs；KaTeX 用仓库自带 src/ui/katex.min.js，throwOnError:true 更严于浏览器的 false）。 */
import fs from 'node:fs';
import path from 'node:path';
import { formulasOf, HAN, ROOT } from './lib/mgload.mjs';

let _katex;
function katex() {
  if (!_katex) {
    const m = { exports: {} };
    new Function('module', 'exports', fs.readFileSync(path.join(ROOT, 'src/ui/katex.min.js'), 'utf8'))(m, m.exports);
    _katex = m.exports;
  }
  return _katex;
}
const BAN = ['\\dots', '\\Rightarrow', '\\leq', '\\geq', '\\neq', '\\impliedby'];   // 与 build.mjs 同
const key = x => (x.block ? 'B:' : 'I:') + x.tex;
const links = s => (String(s).match(/@@[^@\s]+@@/g) || []).sort();
const mask = s => String(s).replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, '¤');
const stepLines = s => String(s).split('\n').filter(l => /^\s*(\d+[.)、]|\(\d+\)|（\d+）|第[一二三四五六七八九十\d]+步|Step\s*\d+)/.test(l)).length;
const multisetMinus = (a, b) => { const rest = b.slice(); return a.filter(k => { const i = rest.indexOf(k); if (i < 0) return true; rest.splice(i, 1); return false; }); };

/* 量词/否定/条件/推理方向：中文标记 vs 英文标记。仅「一边有一边完全没有」才标记（粗筛，宁可多送审）。 */
/* 词汇化复合词：看似含否定字，但英文对应词并不含否定词（不等式→inequality、互不相同→pairwise distinct、无关→independent…）。
   计数前从中文里剔除；这是降低误报，不是放宽——真正的否定（不可导、非零、没有）仍被计数。 */
const LEXICAL_NEG_ZH = /不等式|不变量|不变|不动点|不定积分|不相同|不同|无穷|无限|无关|无理|无界/g;
const MARKS = {
  universal: [/所有|任意|每个|每一|凡是?|对一切|任何|都(?=[凸凹是有为成可])|均|皆/g, /\b(all|every|each|any|for all|for every|arbitrary)\b/gi],
  existential: [/存在|有一个|至少有|某个|某些|某一个|有的/g, /\b(exists?|existence|existential|some|there is|there are|at least one)\b/gi],
  unique: [/唯一/g, /\b(unique|uniquely|uniqueness|unicity|exactly one)\b/gi],
  negation: [/不|非|无|没有/g, /\b(not|no|without|cannot|neither|nor|never|undefined|irreducible|discontinuous)\b|n't|\bnon\w*/gi],
  conditional: [/若|如果|当且仅当|仅当|只要|(?<![同按定即及届瞬临平何暂小有随])时(?![间候刻代期点])/g, /\b(if|iff|only if|provided|whenever|when|unless)\b/gi],
  consequence: [/因此|所以|故|从而|于是/g, /\b(therefore|hence|thus|so|consequently|it follows)\b/gi],
  converse: [/反之|反过来|逆命题|逆否/g, /\b(conversely|converse|contrapositive)\b/gi],
  contradiction: [/反证|矛盾/g, /\b(contradiction|contradict|suppose not|assume the contrary)\b/gi],
};
const cnt = (s, re) => (String(s).match(re) || []).length;
const zhMarks = s => mask(s).replace(LEXICAL_NEG_ZH, '¤');

/* 公式顺序评估。同一多重集下：
   · 关系式（含 = < > ≤ ∈ ⊂ ⟹ → 等）彼此的相对顺序变了、公式跨段落移动、或位移 > 3 → 送审（可能改变逻辑关系）；
   · 只是非关系式（变量/表达式）在同一段内小幅挪动（英语句法所致，如「A 定义的算子 T」→ "operator T defined by A"）→ 仅记 info，不送审。
   这是启发式：它不能判定语义是否被改，只是不再为必然的语序差异制造噪音。 */
const REL = /[=<>]|\\(?:le|ge|leq|geq|ne|neq|in|notin|subset|subseteq|supset|supseteq|implies|iff|Rightarrow|Leftarrow|Leftrightarrow|to|mapsto|equiv|approx|sim|simeq|cong|perp|mid|nmid|vdash|models|rightarrow|leftarrow|leftrightarrow|longrightarrow|longleftarrow|prec|succ|ll|gg|propto|asymp|doteq)(?![A-Za-z])/;
function paraIndexOf(text) {      // 每个公式所在的段落号（与 formulasOf 同序）
  const out = []; String(text).split(/\n\s*\n/).forEach((p, i) => { for (let k = formulasOf(p).length; k > 0; k--) out.push(i); }); return out;
}
export function formulaOrder(zh, en) {
  const z = formulasOf(zh).map(key), e = formulasOf(en).map(key);
  if (z.join('\n') === e.join('\n')) return { level: 'same' };
  if (z.length !== e.length || multisetMinus(z, e).length) return { level: 'sets-differ' };
  const occ = arr => { const seen = {}; return arr.map(k => k + '#' + (seen[k] = (seen[k] || 0) + 1)); };
  const zo = occ(z), eo = occ(e); const pos = new Map(eo.map((k, i) => [k, i]));
  const rel = k => REL.test(k.replace(/^[BI]:/, ''));
  const zr = zo.filter((k, i) => rel(z[i])), er = eo.filter((k, i) => rel(e[i]));
  if (zr.join('|') !== er.join('|')) return { level: 'relational' };
  const pz = paraIndexOf(zh), pe = paraIndexOf(en); let far = 0, cross = 0;
  zo.forEach((k, i) => { const j = pos.get(k); if (Math.abs(i - j) > 3) far++; if (pz[i] !== pe[j]) cross++; });
  if (cross) return { level: 'cross-paragraph' }; if (far) return { level: 'far' };
  return { level: 'harmless' };
}
const hanCount = s => (mask(s).match(/[一-鿿]/g) || []).length;
const wordCount = s => (mask(s).match(/[A-Za-z]+/g) || []).length;

export function validate({ mode = 'statement', zh, en, ambiguities, suspected, confidence, id, expectId }) {
  const errors = [], flags = [];
  if (typeof en !== 'string' || !en.trim()) { errors.push('en 缺失或为空'); return { errors, flags }; }
  if (expectId != null && id !== expectId) errors.push(`返回 id 不符：${id} ≠ ${expectId}`);
  if (HAN.test(en)) errors.push('英文含汉字');
  for (const b of BAN) if (en.includes(b)) errors.push('用了禁用命令 ' + b);
  if ((en.replace(/\\\$/g, '').split('$').length - 1) % 2) errors.push('`$` 个数为奇数');
  const z = formulasOf(zh), e = formulasOf(en);
  if (e.some(x => HAN.test(x.tex))) errors.push('公式里有汉字');
  try { for (const f of e) katex().renderToString(f.tex, { throwOnError: true, displayMode: f.block }); }
  catch (ex) { errors.push('KaTeX 无法解析：' + String(ex.message).slice(0, 80)); }
  const ticks = s => (String(s).match(/\\?`/g) || []).join('');          // 反引号及其前导反斜杠必须逐个照抄（项目约定：中文里常写成「反斜杠+反引号」包住节点 id）
  if (mode !== 'abstract' && ticks(zh) !== ticks(en)) errors.push('反引号（含前导反斜杠）与原文不一致：中文 ' + ticks(zh).length + ' 个标记 / 英文 ' + ticks(en).length + ' 个');
  const zl = links(zh), el = links(en);
  if (mode === 'abstract') { if (multisetMinus(el, zl).length) errors.push('摘要出现了源文没有的 @@链接@@'); }
  else if (zl.join(' ') !== el.join(' ')) errors.push('@@交叉链接@@ 不一致');
  const zk = z.map(key), ek = e.map(key);
  const strict = mode === 'statement' || mode === 'proof';
  if (mode === 'abstract') {
    const extra = multisetMinus(ek, zk); if (extra.length) errors.push(`摘要含源文没有的公式（如 ${JSON.stringify(extra[0]).slice(0, 60)}）`);
    const w = wordCount(en); if (w < 40 || w > 160) flags.push(`摘要词数 ${w} 不在 40–160（现有 39 条为 59–127）`);
  } else if (strict) {
    if (zk.length !== ek.length) errors.push(`公式条数不等 ${zk.length} vs ${ek.length}`);
    const only = multisetMinus(zk, ek); if (only.length) errors.push(`公式多重集不同（如 ${JSON.stringify(only[0]).slice(0, 60)}）`);
  } else if (multisetMinus(zk, ek).length || multisetMinus(ek, zk).length) flags.push('公式集合与原文不同');
  const info = [];
  if (mode !== 'abstract' && !errors.length) {
    const fo = formulaOrder(zh, en);
    if (fo.level === 'relational') flags.push('关系式的相对顺序与原文不同（须核对位置/所属命题）');
    else if (fo.level === 'cross-paragraph' || fo.level === 'far') flags.push('公式顺序与原文不同（跨段落或位移较大，须核对位置/所属命题）');
    else if (fo.level === 'harmless') info.push('公式在同一段内小幅换位（英语语序所致，且无关系式换序）；不单独送审');
  }
  const para = s => String(s).split(/\n\s*\n/).length;
  if (mode !== 'abstract' && para(zh) !== para(en)) flags.push(`段落数不同 ${para(zh)} vs ${para(en)}`);
  if (mode === 'proof' && stepLines(zh) !== stepLines(en)) flags.push(`编号步骤数不同 ${stepLines(zh)} vs ${stepLines(en)}`);
  const hanN = hanCount(zh), words = wordCount(en);
  if (mode !== 'abstract' && hanN >= 12) { const r = words / hanN; if (r < 0.25 || r > 2.2) flags.push(`长度比异常 ${r.toFixed(2)}`); }
  if (mode !== 'abstract') for (const [name, [zr, er]] of Object.entries(MARKS)) {
    const a = cnt(zhMarks(zh), zr), b = cnt(mask(en), er);
    if ((a > 0) !== (b > 0)) flags.push(`${name}：中文${a ? '有' : '无'}而英文${b ? '有' : '无'}（核对逻辑条件/方向）`);
  }
  if (/\bTODO\b/.test(en) && !/TODO/.test(zh)) flags.push('译文含 TODO 标记');
  if (Array.isArray(ambiguities) && ambiguities.length) flags.push(`模型报告歧义 ${ambiguities.length} 处`);
  if (Array.isArray(suspected) && suspected.length) flags.push(`模型提示疑似数学错误 ${suspected.length} 处（须人工核对原文）`);
  if (confidence && confidence !== 'high') flags.push(`模型自评等价性 ${confidence}`);
  return { errors, flags, info };
}
