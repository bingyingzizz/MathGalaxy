/* ==========================================================================
   公式体检 · 权威版  ——  走「和浏览器完全相同」的那条渲染路径
   --------------------------------------------------------------------------
   为什么要这个工具：
     旧工具 tools/_katexcheck-inline.mjs 直接读 **pack 源码文本** 再喂 KaTeX。
     源码里写的是 JS 转义，例如 `'P\\' = N\\''` —— 源码字符是 `\` `'`，
     运行时字符串才是 `P'`。直接扫源码会把 `\'` 交给 KaTeX，
     被当成「重音命令 \' 缺参数」→ 报一堆**假阳性**。
     （实测：`P\'` 报错，而运行时的真值 `P'` 完全合法。）

   本工具的做法（每一步都和浏览器一致）：
     1) 用仓库自己那份 src/ui/katex.min.js（浏览器加载的就是它）
     2) 在 VM 里载入 src/core/util.js + 全部 packs
        → 拿到 **JS 解析之后** 的真字符串，而不是源码文本
     3) 把 MG.renderInlineMath / renderBlockMath 换成「只记录不渲染」
     4) 对每个字段调用 U.md() —— 这正是 panel.js 渲染面板时走的函数
        （行内 $…$ 与行首 $$…$$ 的切分规则、跨行块级公式，
          全部沿用运行时的那套代码，不另写一套正则）
     5) 把记录到的每个 tex 逐个喂真 KaTeX：throwOnError:true
        → 抛异常 = 浏览器里会渲染成红色错误文本（throwOnError:false 不崩但会显示）

   用法：
     bun tools/_katexcheck-all.mjs            # 全部报告
     bun tools/_katexcheck-all.mjs --quiet    # 只打印汇总
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const PACK_DIR = path.join(ROOT, 'src/data/packs');
const QUIET = process.argv.includes('--quiet');

/* ------------------------------------------------- KaTeX：仓库里那份真货 */
const katexSrc = fs.readFileSync(path.join(ROOT, 'src/ui/katex.min.js'), 'utf8');
const kMod = { exports: {} };
new Function('module', 'exports', katexSrc)(kMod, kMod.exports);
const katex = kMod.exports;
if (!katex || typeof katex.renderToString !== 'function') {
  console.log('✗ 载入 src/ui/katex.min.js 失败');
  process.exit(1);
}

/* --------------------------------------------- VM：引擎 + 内容（真字符串） */
const win = { MG: {}, console: { log() {}, warn() {}, error() {} } };
win.window = win;
win.self = win;
const ctx = vm.createContext(win);

const utilSrc = fs.readFileSync(path.join(ROOT, 'src/core/util.js'), 'utf8');
vm.runInContext(utilSrc, ctx, { filename: 'src/core/util.js' });

const U = win.MG.util;
if (!U || typeof U.md !== 'function') {
  console.log('✗ util.js 没导出 MG.util.md');
  process.exit(1);
}

/* 逐文件载入 packs，用「载入前后 packs.length 之差」把包归因到文件名 */
const fileOf = new Map();
const loadErr = [];
for (const f of fs.readdirSync(PACK_DIR).filter(x => x.endsWith('.js')).sort()) {
  const n0 = (win.MG.packs || []).length;
  try {
    vm.runInContext(fs.readFileSync(path.join(PACK_DIR, f), 'utf8'), ctx, { filename: f });
  } catch (e) {
    loadErr.push([f, String(e.message).slice(0, 120)]);
    continue;
  }
  const packs = win.MG.packs || [];
  for (let i = n0; i < packs.length; i++) fileOf.set(packs[i], f);
}

/* ------------------------------------------- 埋点：记录 tex，不真渲染 ---- */
const hits = [];         // {file, pack, id, field, mode, tex}
const leftoverDollar = [];   // 渲染后还留着字面 $ 的字段
const listMarker = [];       // '1. …' 被写成 '$1. …$'
const uniProse = new Map();  // 正文里残留的 Unicode 数学记号 → {n, sample}
const bareOp = new Map();    // 公式里的裸算子（该正体却按变量排成斜体）→ {n, sample}
let cur = null;

/* 公式里的裸算子：KaTeX 会把裸词按**变量**排（斜体、字距按字母），
   而 \sup / \lim 是算子（正体）。同一条公式里一个裸 sup 一个 \inf 会明显不齐。
   a.e. 同理 —— 该是 \text{a.e.}。 */
const OP_RE = /(?<![A-Za-z0-9\\])(?:limsup|liminf|sup|inf|lim|max|min|dom|ker|dim|exp|log|sin|cos|tan|arg|deg|gcd|det|sgn|span|rank|Re|Im)(?![A-Za-z])/g;
const OP_MASK = /\\text\{[^{}]*\}|\\operatorname\{[^{}]*\}|\\mathrm\{[^{}]*\}/g;
const AE_RE = /(?<![A-Za-z])a\.e\./g;
/* 丢了反斜杠的命令：源码里 LaTeX 要写 `\\operatorname`，写成单个 `\o` 会被 JS 吃掉，
   运行时只剩 `operatorname{sgn}` —— 页面上排成斜体的一串字母，KaTeX 不报错。
   只查这几个不会歧义的长命令名（`\n` 那种合法 JS 转义不在内）。 */
const LOST_CMD_RE = /(?<![\\A-Za-z])(?:operatorname|mathrm|mathcal|mathbb|mathfrak|frac|dfrac|overline|widehat|widetilde|text|textbf|textit|textrm)(?![A-Za-z])/g;

/* 命令的参数花括号被误转义：`\frac{1}\{p\}` 里 `\{` 是**字面的花括号字符**，
   不是分组 —— 分母变成字符 `{`，页面上渲染成 `1{p}`。KaTeX 语法上完全接受，
   **不报错**，只有肉眼看公式形状才发现。必须按「参数位置」判。 */
const BRACE_ARGS = {
  frac: 2, dfrac: 2, tfrac: 2, cfrac: 2, binom: 2, dbinom: 2, tbinom: 2,
  overset: 2, underset: 2, sqrt: 1, overline: 1, underline: 1,
  widehat: 1, widetilde: 1, hat: 1, bar: 1, tilde: 1, vec: 1, dot: 1, ddot: 1,
  mathbf: 1, mathbb: 1, mathcal: 1, mathfrak: 1, mathrm: 1, mathsf: 1, mathtt: 1,
  operatorname: 1, text: 1, textbf: 1, textit: 1, textrm: 1,
};
const badBrace = new Map();
function texSkipGroup(t, q) {
  let d = 0;
  while (q < t.length) {
    if (t[q] === '\\' && (t[q + 1] === '{' || t[q + 1] === '}')) { q += 2; continue; }
    if (t[q] === '{') d++;
    else if (t[q] === '}') { d--; if (d === 0) return q + 1; }
    q++;
  }
  return q;
}
function scanBadBraces(tex, where, field) {
  for (const [cmd, nArgs] of Object.entries(BRACE_ARGS)) {
    const needle = '\\' + cmd;
    let from = 0;
    while (true) {
      const p = tex.indexOf(needle, from);
      if (p < 0) break;
      from = p + 1;
      if (/[A-Za-z]/.test(tex[p + needle.length] || '')) continue;
      let q = p + needle.length;
      for (let k = 0; k < nArgs; k++) {
        while (tex[q] === ' ') q++;
        if (tex[q] === '[') {
          const c = tex.indexOf(']', q);
          if (c < 0) break;
          q = c + 1;
          while (tex[q] === ' ') q++;
        }
        if (tex[q] === '{') { q = texSkipGroup(tex, q); continue; }
        if (tex.slice(q, q + 2) === '\\{') {
          const key = '参数花括号被转义 \\' + cmd + '…\\{…\\}';
          if (!badBrace.has(key)) badBrace.set(key, { n: 0, sample: `${where} [${field}]`, tex: tex.slice(0, 160) });
          badBrace.get(key).n++;
          break;
        }
        break;
      }
    }
  }
}
function scanBareOps(tex, where, field) {
  const masked = tex.replace(OP_MASK, m => '\u0001'.repeat(m.length));
  const note = (k) => {
    if (!bareOp.has(k)) bareOp.set(k, { n: 0, sample: `${where} [${field}]`, tex: String(tex).slice(0, 160) });
    bareOp.get(k).n++;
  };
  for (const m of masked.matchAll(OP_RE)) note(m[0]);
  for (const m of masked.matchAll(AE_RE)) note('a.e.');
  for (const m of masked.matchAll(LOST_CMD_RE)) note('⚠丢了反斜杠的 ' + m[0]);
  scanBadBraces(String(tex), where, field);
}

/* 正文里**不该**再出现的字符（数学区段）。装饰符与引号白名单放行。
   ⚠ 数学花体字母区（U+1D400–U+1D7FF）是**星平面**字符：JS 的 \uXXXX 只吃 4 位
   十六进制，写成 \u1D400 会被解析成「\u1D40 + 字面 0」，而 \u1D400-\u1D7FF 里的
   那个 `-` 就成了「'0' 到 U+1D7F」的区间 —— 把整个 ASCII 都圈进来。
   必须用 {u} 标志配 \u{1D400}。 */
const MATH_RANGE = /[\u0300-\u036F\u0370-\u03FF\u1D00-\u1DFF\u1F00-\u1FFF\u2070-\u209F\u2100-\u214F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u2460-\u24FF\u25A0-\u25FF\u27C0-\u27FF\u2900-\u297F\u2980-\u29FF\u2A00-\u2AFF\u2B00-\u2BFF\u{1D400}-\u{1D7FF}\u2016]/gu;
const DECOR_OK = '∎⭐①②③④⑤⑥⑦⑧⑨⑩';
function rec(mode, tex) {
  hits.push({
    file: cur ? cur.file : '?', pack: cur ? cur.pack : '?', id: cur ? cur.id : '?',
    field: cur ? cur.field : '?', mode: mode, tex: String(tex)
  });
  scanBareOps(String(tex), cur ? cur.id : '?', cur ? cur.field : '?');
  // ⚠ 必须返回**真值**：util.js 的 blockMath 对假值会回退成「等宽显示原始 LaTeX」，
  //   那样残留检查会把兜底泄漏的 LaTeX 当成正文。
  //   哨兵只用控制字符，既不含 $ 也不会被下面的「残留记号」扫描误伤。
  return '\u0001';
}
win.MG.renderInlineMath = t => rec('inline', t);
win.MG.renderBlockMath = t => rec('block', t);

/* ------------------------------------------- 走运行时同一条路：U.md() ---- */
/* 顺带抓两类「$ 位置错」：
   (a) 渲染完的 HTML 里还留着字面 $ —— 说明那个 $ 没被当成定界符（配对错了）
   (b) 字符串以 $ 紧跟「列表序号」开头 —— 迁移脚本把 '1. …' 改成了 '$1. …$'，
       列表标记被吞进公式
   记录器返回空串（不含 $），所以输出里出现的 $ 一定是漏网的。 */
const render = (file, packName, id, field, text, viaTitle) => {
  if (!text) return;
  cur = { file: file, pack: packName, id: id, field: field };
  // title 走 U.titleHtml（只认数学），其余走 U.md（完整 markdown）
  const html = viaTitle ? (U.titleHtml ? U.titleHtml(text) : text) : U.md(text);
  const n = (String(html).match(/\$/g) || []).length;
  if (n) leftoverDollar.push({ file, id, field, n, sample: String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90) });
  // 公式已经被换成哨兵，剩下的全是正文 → 扫残留的 Unicode 数学记号
  // ⚠ title 不算：项目约定 title/label 是纯文本字段，用 Unicode 记号（σ、⟹、μ）
  //   是正常的，只有 markdown 正文才要求全面 $…$。
  if (!viaTitle) String(html).replace(/<[^>]*>/g, ' ').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').match(MATH_RANGE)?.forEach(ch => {
    if (DECOR_OK.includes(ch)) return;
    const key = ch + ' U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    if (!uniProse.has(key)) uniProse.set(key, { n: 0, sample: `${file} · ${id} [${field}]` });
    uniProse.get(key).n++;
  });
};
for (const p of (win.MG.packs || [])) {
  const file = fileOf.get(p) || '?';
  for (const n of (p.nodes || [])) {
    render(file, p.name, n.id, 'statement', n.statement);
    render(file, p.name, n.id, 'notes', n.notes);
    render(file, p.name, n.id, 'title', n.title, true);
  }
  for (const e of (p.edges || [])) {
    render(file, p.name, e.id, 'proof', e.proof);
    render(file, p.name, e.id, 'note', e.note);
    render(file, p.name, e.id, 'title', e.title, true);
    for (const pr of (e.proofs || [])) {
      render(file, p.name, e.id, 'proofs:' + (pr.label || '?'), pr.text || '');
    }
  }
}
cur = null;

/* --------------------------------------------------- 喂真 KaTeX，判生死 */
const bad = [];
const warns = new Map();   // 警告类别 → 计数（strict 模式下的软问题）
for (const h of hits) {
  const opts = { displayMode: h.mode === 'block', throwOnError: true };
  const savedWarn = console.warn, savedErr = console.error;
  const seen = [];
  console.warn = m => seen.push(String(m));
  console.error = m => seen.push(String(m));
  try {
    katex.renderToString(h.tex, opts);
  } catch (e) {
    bad.push(Object.assign({}, h, { err: String(e.message).slice(0, 120) }));
  } finally {
    console.warn = savedWarn; console.error = savedErr;
  }
  for (const w of seen) {
    const key = w.replace(/\s+/g, ' ').slice(0, 90);
    if (!warns.has(key)) warns.set(key, { n: 0, sample: h });
    warns.get(key).n++;
  }
}

/* ==========================================================================
   结构性误判：md() 的「行首 $$ = 独立公式块」规则
   --------------------------------------------------------------------------
   util.js 的 md() 里有一条：**一行只要以 $$ 开头，就当成独立公式块**——
      · 若这一行恰好在行尾也有 $$，整行中间的内容被塞进**一个**块级公式；
      · 否则它会**往下吞**，直到某一行以 $$ 结尾（吞不到就吞到字段末尾）。
   于是「行首是 $$、但这一行其实还是正文」的写法会被吞歪。

   危险的是：**有些被吞歪的 tex 恰好还是合法 LaTeX**，
   KaTeX 不报错，只是**显示错位**（该行内联的变成了一大块居中公式）——
   这种静默错位只有靠结构分析才抓得到，公式检查抓不到。

   判据（已排除合法的单行块与多行块）：
     行首匹配 /^\s*\$\$/，且「去掉行首 $$ 与行尾 $$」之后**仍含 $$**
     → 这一行混了多个 $$ 对，必被吞歪。
   ========================================================================== */
const struct = [];
function lintStructural(file, packName, id, field, text) {
  if (!text) return;
  const lines = String(text).replace(/\r\n?/g, '\n').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // (c) 列表标记被吞进公式：'$1. …' —— 应该写成 '1. $…$'
    if (/^\s*\$\d+[.)]\s/.test(line)) {
      listMarker.push({ file, id, field, ln: i + 1, line: line.trim().slice(0, 120) });
    }
    if (!/^\s*\$\$/.test(line)) continue;
    const rest = line.replace(/^\s*\$\$\s?/, '').replace(/\$\$\s*$/, '');
    if (!rest.includes('$$')) continue;
    struct.push({
      file: file, pack: packName, id: id, field: field, ln: i + 1,
      kind: '行首 $$ 混了多个公式对（整行会被塞进一个块级公式）',
      line: line.trim().slice(0, 160)
    });
  }
  // 未闭合的 $$ 块：行首是 $$，此后再也没有以 $$ 结尾的行 → md() 吞到字段末尾
  let j = 0;
  while (j < lines.length) {
    if (/^\s*\$\$/.test(lines[j])) {
      const first = lines[j].replace(/^\s*\$\$\s?/, '');
      const closed = /\$\$\s*$/.test(first) && first.replace(/\$\$\s*$/, '').trim() !== '';
      if (!closed) {
        let k = j + 1;
        while (k < lines.length && !/\$\$\s*$/.test(lines[k])) k++;
        if (k >= lines.length) {
          struct.push({
            file: file, pack: packName, id: id, field: field, ln: j + 1,
            kind: '未闭合的 $$ 块（会把后面 ' + (lines.length - j - 1) + ' 行全吞进公式）',
            line: lines[j].trim().slice(0, 160)
          });
        }
        j = k + 1;
        continue;
      }
    }
    j++;
  }
}
for (const p of (win.MG.packs || [])) {
  const file = fileOf.get(p) || '?';
  for (const n of (p.nodes || [])) {
    lintStructural(file, p.name, n.id, 'statement', n.statement);
    lintStructural(file, p.name, n.id, 'notes', n.notes);
  }
  for (const e of (p.edges || [])) {
    lintStructural(file, p.name, e.id, 'proof', e.proof);
    lintStructural(file, p.name, e.id, 'note', e.note);
    for (const pr of (e.proofs || [])) {
      lintStructural(file, p.name, e.id, 'proofs:' + (pr.label || '?'), pr.text || '');
    }
  }
}

/* ------------------------------------------------------------- 只渲染字段却带 $ ---- */
/* label / tags / refs 只做 escapeHtml，不解析 $…$：这些字段里出现 $ 会原样漏出。
   title 现在走 U.titleHtml()（只认 $…$、不做 markdown）——
   所以对 title 改判「渲染完还剩不剩字面 $」，而不是「有没有 $」。 */
const rawDollar = [];
function chkRaw(file, packName, id, field, text) {
  if (typeof text !== 'string' || text.indexOf('$') < 0) return;
  rawDollar.push({ file: file, pack: packName, id: id, field: field, text: text.slice(0, 70) });
}
function chkTitle(file, packName, id, text) {
  if (typeof text !== 'string' || text.indexOf('$') < 0) return;
  const html = U.titleHtml ? U.titleHtml(text) : text;
  const n = (String(html).match(/\$/g) || []).length;
  if (n) rawDollar.push({ file: file, pack: packName, id: id, field: 'title(残留$)', text: text.slice(0, 70) });
}
for (const p of (win.MG.packs || [])) {
  const file = fileOf.get(p) || '?';
  for (const n of (p.nodes || [])) {
    chkRaw(file, p.name, n.id, 'label', n.label);
    chkTitle(file, p.name, n.id, n.title);
    (n.tags || []).forEach((t, i) => chkRaw(file, p.name, n.id, 'tags[' + i + ']', t));
    (n.refs || []).forEach((t, i) => chkRaw(file, p.name, n.id, 'refs[' + i + ']', t));
  }
  for (const e of (p.edges || [])) {
    chkTitle(file, p.name, e.id, e.title);
    (e.proofs || []).forEach(pr => chkRaw(file, p.name, e.id, 'proofs[].label', pr.label));
  }
}

/* --------------------------------------------------------------- 报告 */
let nBlock = 0, nInline = 0;
for (const h of hits) (h.mode === 'block' ? nBlock++ : nInline++);

console.log('════════════ 公式体检（运行时同路径）════════════');
console.log(`内容包 ${fileOf.size} 个`);
console.log(`公式   $$…$$ ${nBlock} 个 ／ $…$ ${nInline} 个 ／ 合计 ${hits.length} 个`);
console.log(`结果   失败 ${bad.length} 个`);
if (loadErr.length) {
  console.log(`⚠ 载入失败的包 ${loadErr.length} 个：`);
  for (const [f, m] of loadErr) console.log(`   ${f} — ${m}`);
}

if (bad.length) {
  // 同一条 tex 可能在多个节点里重复出现 → 按 tex 去重，列出出处
  const byTex = new Map();
  for (const b of bad) {
    const k = b.mode + '\u0000' + b.tex;
    if (!byTex.has(k)) byTex.set(k, { tex: b.tex, mode: b.mode, err: b.err, where: [] });
    byTex.get(k).where.push(`${b.file} · ${b.id} [${b.field}]`);
  }
  console.log(`\n──── 失败明细（去重后 ${byTex.size} 条）────`);
  let i = 0;
  for (const v of byTex.values()) {
    i++;
    console.log(`\n${i}. ${v.mode === 'block' ? '$$…$$' : '$…$'}  ${v.err}`);
    console.log(`   tex: ${v.tex.trim().replace(/\s+/g, ' ').slice(0, 200)}`);
    console.log(`   出处 ${v.where.length} 处：`);
    for (const w of v.where.slice(0, 6)) console.log(`     · ${w}`);
    if (v.where.length > 6) console.log(`     · …还有 ${v.where.length - 6} 处`);
  }
}

if (warns.size) {
  console.log(`\n──── 软警告（KaTeX strict 提示，不致命但会影响观感）${warns.size} 类 ────`);
  const sorted = [...warns.entries()].sort((a, b) => b[1].n - a[1].n);
  for (const [m, v] of sorted) {
    console.log(`  ×${v.n}  ${m}`);
    if (!QUIET) console.log(`        例：${v.sample.file} · ${v.sample.id} [${v.sample.field}]`);
  }
}

if (rawDollar.length) {
  console.log(`\n──── 不解析 $ 的字段里出现了 $（会原样漏出）${rawDollar.length} 处 ────`);
  const byField = new Map();
  for (const r of rawDollar) {
    const k = r.file + '\u0000' + r.field;
    if (!byField.has(k)) byField.set(k, { file: r.file, field: r.field, items: [] });
    byField.get(k).items.push(`${r.id}: ${r.text}`);
  }
  for (const v of byField.values()) {
    console.log(`  ${v.file} ${v.field} ×${v.items.length}`);
    for (const it of v.items.slice(0, 5)) console.log(`      ${it}`);
    if (v.items.length > 5) console.log(`      …还有 ${v.items.length - 5} 处`);
  }
}

if (struct.length) {
  console.log(`\n──── 结构性误判（md() 的行首 $$ 规则被踩到）${struct.length} 处 ────`);
  for (const v of struct) {
    console.log(`\n  ${v.file} · ${v.id} [${v.field}] 第 ${v.ln} 行`);
    console.log(`     ${v.kind}`);
    console.log(`     ${v.line}`);
  }
}

if (bareOp.size) {
  const tot = [...bareOp.values()].reduce((a, b) => a + b.n, 0);
  console.log(`\n──── 公式里的裸算子（该正体却排成斜体）${bareOp.size} 种 / ${tot} 处 ────`);
  for (const [k, v] of [...bareOp.entries()].sort((a, b) => b[1].n - a[1].n)) {
    console.log(`  ${k} ×${v.n}   例：${v.sample}`);
    if (!QUIET) console.log(`        tex: ${v.tex.replace(/\s+/g, ' ')}`);
  }
} else {
  console.log('\n──── 公式里的裸算子：0 处 ✓ ────');
}

if (badBrace.size) {
  const tot = [...badBrace.values()].reduce((a, b) => a + b.n, 0);
  console.log(`\n──── 命令的参数花括号被误转义（会渲染成 1{p} 这种）${badBrace.size} 种 / ${tot} 处 ────`);
  for (const [k, v] of [...badBrace.entries()].sort((a, b) => b[1].n - a[1].n)) {
    console.log(`  ${k} ×${v.n}   例：${v.sample}`);
    if (!QUIET) console.log(`        tex: ${v.tex.replace(/\s+/g, ' ')}`);
  }
} else {
  console.log('\n──── 命令的参数花括号：0 处 ✓ ────');
}

if (uniProse.size) {
  const tot = [...uniProse.values()].reduce((a, b) => a + b.n, 0);
  console.log(`\n──── 正文里残留的 Unicode 数学记号：${uniProse.size} 种 / ${tot} 处 ────`);
  console.log('     （项目约定：正文里的数学记号一律写成 $…$，这里是不该再出现的）');
  const sorted = [...uniProse.entries()].sort((a, b) => b[1].n - a[1].n);
  for (const [k, v] of sorted.slice(0, 30)) {
    console.log(`  ${k}  ×${v.n}   例：${v.sample}`);
  }
  if (sorted.length > 30) console.log(`  …还有 ${sorted.length - 30} 种`);
} else {
  console.log('\n──── 正文里残留的 Unicode 数学记号：0 种 ✓ ────');
}

if (leftoverDollar.length) {
  console.log(`\n──── 渲染后仍留着字面 $（定界符配对错了）${leftoverDollar.length} 处 ────`);
  for (const v of leftoverDollar) {
    console.log(`  ${v.file} · ${v.id} [${v.field}]  残留 ${v.n} 个 $`);
    console.log(`      ${v.sample}`);
  }
}

if (listMarker.length) {
  console.log(`\n──── 列表标记被吞进公式（'1. …' 被写成 '$1. …$'）${listMarker.length} 处 ────`);
  for (const v of listMarker) {
    console.log(`  ${v.file} · ${v.id} [${v.field}] 第 ${v.ln} 行`);
    console.log(`      ${v.line}`);
  }
}

console.log('\n' + (bad.length === 0 ? '✓ 无硬失败' : `✗ 有 ${bad.length} 处硬失败`));
process.exit(bad.length ? 1 : 0);
