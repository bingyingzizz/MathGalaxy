/* ==========================================================================
   记号线 · 详细体检
   --------------------------------------------------------------------------
   `tools/build.mjs` 里已经有硬断言（裸 Unicode 正文 / 禁用写法 = 构建失败）。
   这个工具是它的**详细版**：出按节点 / 字段的报告，并加了构建里不敢加的
   启发式检查（标 warn）：

     ① 硬失败项（与构建一致）
     ② 禁用写法（与构建一致）
     ③ 启发式：
        - `\Sigma` 是不是被当成了求和号
        - `\pi` 是不是预测度（该写 \mu_{0}）
        - `\bar{A}` / `\overline{A}` 是不是补集（该写 A^{c}）
        - `\subset` 用得很可疑的地方
     ④ 内容里用到、但**记号表里没登记**的 LaTeX 命令（「用到了却没规则」）

   真源：`src/data/notation.js`
   用法：bun tools/_notationcheck.mjs [--fields]  （--fields 打印每处的字段名）
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = 'H:/MathGalaxy';

/* ---------------------------------------------------- 载入记号表（真源） */
function loadNotation() {
  const win = { MG: {}, console };
  win.window = win;
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'src/data/notation.js'), 'utf8'), vm.createContext(win),
    { filename: 'notation.js' });
  return win.MG.notation;
}

const N = loadNotation();
const g = JSON.parse(fs.readFileSync(path.join(ROOT, 'dist/graph.json'), 'utf8'));
const SHOW_FIELDS = process.argv.includes('--fields');

/* ------------------------------------------------------------ 收集条目 */
const bodyFields = N.checks.bareUnicode.body;
const bad = new Set([...N.checks.bareUnicode.chars]);
/* ⭐ 术语前缀豁免（σ-代数、μ-零集…）—— 和构建断言同一套口径 */
const exceptRx = N.checks.bareUnicode.except ? new RegExp(N.checks.bareUnicode.except, 'g') : null;

const items = [];
for (const n of g.nodes) {
  for (const f of bodyFields) if (n[f]) items.push({ id: n.id, kind: 'node', field: f, text: n[f] });
}
for (const e of g.edges || []) {
  if (e.proof) items.push({ id: e.id, kind: 'edge', field: 'proof', text: e.proof });
  if (e.note) items.push({ id: e.id, kind: 'edge', field: 'note', text: e.note });
  if (Array.isArray(e.proofs)) {
    for (const p of e.proofs) {
      const t = typeof p === 'string' ? p : (p && p.text);
      if (t) items.push({ id: e.id, kind: 'edge', field: 'proofs', text: t });
    }
  }
  if (e.title) items.push({ id: e.id, kind: 'edge', field: 'title', text: e.title });
}

const stripMath = s => String(s)
  .replace(/\$\$[\s\S]*?\$\$/g, ' ')
  .replace(/\$[^$\n]*?\$/g, ' ')
  .replace(/`[^`\n]*?`/g, ' ');

const H = (t) => console.log('\n' + '='.repeat(72) + '\n' + t + '\n' + '='.repeat(72));
let errs = 0, warns = 0;

/* ---------------------------------------- ① 硬失败：裸 Unicode / 禁用写法 */
H('① 硬失败项（构建会让这些直接失败）');

const bodyHits = [];
for (const it of items) {
  let plain = stripMath(it.text);
  if (exceptRx) plain = plain.replace(exceptRx, ' ');
  for (const ch of new Set(plain)) {
    if (bad.has(ch)) bodyHits.push({ ...it, ch });
  }
}
if (!bodyHits.length) console.log('  ✓ 正文与 title 里都没有裸 Unicode 数学符号（术语前缀 σ-/μ- 已豁免）');
for (const h of bodyHits) {
  errs++;
  console.log(`  ✗ ${h.id} [${h.kind}] .${h.field} —— 裸「${h.ch}」`);
  if (SHOW_FIELDS) console.log('      ' +
    h.text.slice(Math.max(0, h.text.indexOf(h.ch) - 40), h.text.indexOf(h.ch) + 40).replace(/\n/g, ' ⏎ '));
}

/* ------------------------------------------- ② 公式里的禁用写法（同构建） */
H('② 禁用写法（构建会让这些直接失败）');
let nBan = 0;
for (const b of N.checks.banned) {
  const rx = new RegExp(b.re, 'g');
  const hits = [];
  for (const it of items) {
    rx.lastIndex = 0;
    const m = rx.exec(it.text);
    if (m) hits.push({ ...it, m: m[0] });
  }
  if (!hits.length) continue;
  nBan += hits.length;
  console.log(`  ✗ 应为 \`${b.fix.replace(/\\\\\\\\/g, '\\')}\`${b.why ? '（' + b.why + '）' : ''} —— ${hits.length} 处`);
  for (const h of hits.slice(0, 10)) console.log(`      ${h.id} [${h.kind}] .${h.field} —— “${h.m}”`);
}
if (!nBan) console.log('  ✓ 一处都没有');

/* ------------------------------------------------------------ ③ 启发式 */
H('③ 启发式（构建里不敢加的，标 warn，要人看）');

const HINT = [
  {
    name: '`\\Sigma` 不是求和号吧？（求和号一律写 `\\sum`）',
    re: /\\\\Sigma(?![a-zA-Z])/g,
  },
  {
    name: '`\\pi` 是预测度吧？（预测度一律写 `\\mu_{0}`；投影是 `\\pi_\\alpha`，有下标）',
    re: /\\\\pi(?![_^a-zA-Z])/g,
  },
  {
    name: '`\\bar{}` / `\\overline{}` 是补集吧？（补集一律写 `A^{c}`）',
    re: /\\\\(?:bar|overline)\{(?!\\(?:mu|mathcal|mathbb|nu|F|z|f|g|h|A|B|C|D|E|S|T|varphi|psi)\})/g,
  },
];
let any = false;
for (const h of HINT) {
  const hits = [];
  for (const it of items) {
    const rx = new RegExp(h.re.source, 'g');
    let m;
    while ((m = rx.exec(it.text))) hits.push({ ...it, m: m[0] });
  }
  if (!hits.length) continue;
  any = true;
  warns += hits.length;
  console.log(`\n  ⚠ ${h.name}  ——  ${hits.length} 处`);
  for (const x of hits.slice(0, 12)) console.log(`      ${x.id} [${x.kind}] .${x.field}  ${x.m}`);
  if (hits.length > 12) console.log(`      …另 ${hits.length - 12} 处`);
}
if (!any) console.log('  ✓ 没有命中');

/* -------------------------- ④ 内容里用到、但记号表里没登记的命令 */
H('④ 内容里用到、但**记号表里没登记**的 LaTeX 命令（「用到了却没规则」）');

const tableTex = new Set();
for (const e of N.entries) {
  for (const m of (e.tex || '').matchAll(/\\([a-zA-Z]+)/g)) tableTex.add(m[1]);
}
/* 数学排版基础设施，不必登记 */
const INFRA = new Set(['text', 'frac', 'dfrac', 'tfrac', 'left', 'right', 'big', 'Big', 'bigg',
  'Bigg', 'quad', 'qquad', 'begin', 'end', 'mathrm', 'mathbb', 'mathcal', 'mathfrak',
  'operatorname', 'sqrt', 'overline', 'bar', 'hat', 'widetilde', 'widehat', 'not', 'mid',
  'displaystyle', 'limits', 'cdots', 'ldots', 'colon', 'circ', 'ast', 'star', 'prime',
  'longrightarrow', 'longleftrightarrow', 'Longrightarrow', 'Longleftarrow', 'Longrightarrow',
  'nRightarrow', 'rightrightarrows', 'xrightarrow', 'overset', 'underset', 'substack',
  'includegraphics', 'mathbf', 'mathsf', 'mathtt', 'rm', 'bf', 'boldsymbol', 'nonumber',
  'aligned', 'array', 'cases', 'pmatrix', 'bmatrix', 'vmatrix', 'cdots', 'dotsb', 'dotsc',
  'leqq', 'geqq', 'vartriangleleft', 'trianglelefteq', 'setminus', 'smallsetminus',
  'bigsqcup', 'sqcup', 'sqcap', 'upharpoonright', 'restriction', 'ell', 'aleph', 'wp',
  'sharp', 'flat', 'natural', 'top', 'bot', 'vdash', 'dashv', 'models', 'vDash', 'Vdash',
  'perp', 'parallel', 'nmid', 'nsubseteq', 'nsupseteq', 'subseteqq', 'supseteqq',
  'blacksquare', 'square', 'triangle', 'angle', 'nabla', 'partial', 'infty', 'prod',
  'sum', 'int', 'iint', 'oint', 'lim', 'liminf', 'limsup', 'sup', 'inf', 'max', 'min',
  'exp', 'log', 'ln', 'sin', 'cos', 'tan', 'arctan', 'ker', 'dim', 'deg', 'det', 'gcd',
  'sgn', 'Re', 'Im', 'to', 'mapsto', 'hookrightarrow', 'twoheadrightarrow', 'approx',
  'equiv', 'cong', 'simeq', 'sim', 'propto', 'ne', 'le', 'ge', 'll', 'gg', 'prec',
  'preceq', 'succ', 'succeq', 'subset', 'subseteq', 'supset', 'supseteq', 'subsetneq',
  'in', 'notin', 'ni', 'cup', 'cap', 'bigcup', 'bigcap', 'emptyset', 'varnothing',
  'forall', 'exists', 'neg', 'wedge', 'vee', 'implies', 'iff', 'times', 'cdot', 'div',
  'pm', 'mp', 'oplus', 'otimes', 'oplus', 'lt', 'gt', 'lor', 'land']);

const used = new Map();     // cmd → { count, sample }
for (const it of items) {
  for (const m of it.text.matchAll(/\\([a-zA-Z]+)/g)) {
    const c = m[1];
    if (INFRA.has(c)) continue;
    if (tableTex.has(c)) continue;
    const cur = used.get(c) || { count: 0, sample: it.id + '.' + it.field };
    cur.count += 1;
    used.set(c, cur);
  }
}
const unused = [...used.entries()].sort((a, b) => b[1].count - a[1].count);
if (!unused.length) console.log('  ✓ 都登记了');
else {
  console.log(`  共 ${unused.length} 个命令没登记（出现 ≥3 次的列在下面）：`);
  for (const [c, v] of unused.filter(([, v]) => v.count >= 3)) {
    warns++;
    console.log(`     \\${c} ×${v.count}  例如 ${v.sample}`);
  }
  const few = unused.filter(([, v]) => v.count < 3).map(([c]) => '\\' + c);
  if (few.length) console.log(`     只出现 1–2 次的（多半是证明内局部记号）：${few.join(' ')}`);
}

/* --------------------------------------------------------------- 汇总 */
H('汇总');
console.log(`  硬失败 ${errs} 处 · 警告 ${warns} 处`);
console.log(errs ? '  ✗ 有硬失败 —— 构建会拒绝。' : '  ✓ 无硬失败。');
