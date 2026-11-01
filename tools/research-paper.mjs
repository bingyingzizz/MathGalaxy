/**
 * 把 papers/p-liquid.md（完整手稿，约 890 KB / 59 节）转成论文页 site/research-p-liquid.html。
 *
 *   bun tools/research-paper.mjs
 *
 * 设计要点：
 * · 先做 HTML 转义，再插标签 —— 正文里全是 `<`（如 M_{<p}）与 `&`，顺序反了会碎。
 * · 数学只在客户端渲染（KaTeX 按需）；构建期不预渲染，否则 3000+ 公式会把 HTML 撑到十几 MB。
 * · `\[ … \]` 跨行，所以按**行状态机**解析，不靠空行切段。
 * · 含 SHA-256 / 起始字节的审计段落降级为 .audit（内容保留，视觉让位）。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const SRC = path.join(ROOT, 'papers', 'p-liquid.md');
const OUT = path.join(ROOT, '_tools', '_p-liquid-log.html');  // 只是把日志渲染出来自查，不进站点

const raw = fs.readFileSync(SRC, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
const lines = raw.split('\n');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * KaTeX 的两处口味差异（原稿按 MathJax 习惯写成）：
 *  · `&&`（跳过一列）在 KaTeX 的 split/aligned 里算「多余的 &」⇒ 塌成单个 &
 *  · `	ag{…}` 走文本模式，标签里的 `_` 会报错 ⇒ 转义成 \_
 */
function fixMath(t) {
  // KaTeX 的 split 只允许每行一个 &（多一个就报 too many tab characters），
  // aligned 允许多列。原稿一律按 MathJax 的 split 写，这里统一换掉。
  t = t.replace(/\\begin\{split\}/g, '\\begin{aligned}');
  t = t.replace(/\\end\{split\}/g, '\\end{aligned}');
  // KaTeX 的 \tag{…} 按文本模式排，标签内的下划线会报错 => 转义。
  t = t.replace(/\\tag\{([^{}]*)\}/g, (_m, a) => '\\tag{' + a.replace(/_/g, '\\_') + '}');
  return t;
}

/** 行内：转义 → 数学定界符统一 → 粗体 / 行内码 / 尖括号链接 */
function inline(s) {
  let t = esc(s);
  t = t.replace(/\\\(/g, '$').replace(/\\\)/g, '$');
  t = t.replace(/\\\[/g, '$$').replace(/\\\]/g, '$$');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/&lt;(https?:\/\/[^\s&]+)&gt;/g, '<a href="$1" rel="noopener">$1</a>');
  t = fixMath(t);
  return t;
}

const isChapter = (l) => /^##\s+\d+\./.test(l);
const isSub = (l) => /^###\s/.test(l);
const isSubSub = (l) => /^####\s/.test(l);
const isRule = (l) => /^\s*(---+|\*\*\*+)\s*$/.test(l);
const isTable = (l) => /^\s*\|/.test(l);
const isList = (l) => /^\s*([-*+]|\d+\.)\s+/.test(l);

/** 章标题清洗：去掉日期前缀与「（仅追加）」这类过程标记 */
function cleanTitle(t) {
  return t
    .replace(/^\s*\d+\.\s*/, '')
    .replace(/^20\d\d-\d\d-\d\d\s*/, '')
    .replace(/（仅追加）|（只追加）|（仅追加；.*?）\s*$/g, '')
    .trim();
}

const chapters = [];   // { num, title, html:[], subs:[{num,title,id}] }
let cur = null;
let buf = [];          // 段落缓冲
let listBuf = [];
let mode = null;       // 'p' | 'list' | 'table' | null

function flush() {
  if (mode === 'list' && listBuf.length) {
    const ordered = /^\s*\d+\./.test(listBuf[0]);
    const tag = ordered ? 'ol' : 'ul';
    const items = listBuf.map((x) => '<li>' + inline(x.replace(/^\s*([-*+]|\d+\.)\s+/, '').trim()) + '</li>');
    cur.html.push(`<${tag} class="mlist">${items.join('')}</${tag}>`);
    listBuf = [];
  }
  if (mode === 'p' && buf.length) {
    const text = buf.join(' ');
    const isAudit = /SHA-256|起始\s*\d+\s*字节|本轮开始时|起点为|监督附言|监督附语/.test(text);
    cur.html.push(`<p${isAudit ? ' class="audit"' : ''}>${inline(text.trim())}</p>`);
    buf = [];
  }
  mode = null;
}

function pushMath(block) {
  flush();
  // 去掉 \[ \] 包裹，保留内部（含 \tag）
  const inner = block.replace(/^\s*\\\[\s*/, '').replace(/\s*\\\]\s*$/, '');
  cur.html.push(`<div class="dm">$$${fixMath(esc(inner))}$$</div>`);
}

/* ------------------------------- 解析 */
let i = 0;
// 丢掉首个 `## ` 之前的日志抬头（标题/日期/结论快照）
while (i < lines.length && !isChapter(lines[i])) i++;

let inMath = false;
let mathBuf = [];
let tableBuf = [];

for (; i < lines.length; i++) {
  const l = lines[i];

  if (inMath) {
    mathBuf.push(l);
    if (/\\\]\s*$/.test(l)) {
      inMath = false;
      pushMath(mathBuf.join('\n'));
      mathBuf = [];
    }
    continue;
  }
  if (/^\s*\\\[\s*$/.test(l)) { flush(); inMath = true; mathBuf = [l]; continue; }

  if (isChapter(l)) {
    flush(); tableBuf = [];
    const num = (l.match(/^##\s+(\d+)\./) || [])[1];
    cur = { num, title: cleanTitle(l.replace(/^##\s+/, '')), html: [], subs: [] };
    chapters.push(cur);
    continue;
  }
  if (!cur) continue;

  if (isSub(l)) { flush(); tableBuf = []; cur.html.push(`<h3>${inline(cleanTitle(l.replace(/^###\s+/, '').replace(/^\d+(\.\d+)*\s*/, ''))) }</h3>`); continue; }
  if (isSubSub(l)) { flush(); tableBuf = []; cur.html.push(`<h4>${inline(l.replace(/^####\s+/, ''))}</h4>`); continue; }
  if (isRule(l)) { flush(); tableBuf = []; cur.html.push('<hr>'); continue; }

  if (isTable(l)) {
    if (mode !== 'table') { flush(); mode = 'table'; tableBuf = []; }
    tableBuf.push(l);
    let j = i + 1;
    if (j < lines.length && isTable(lines[j]) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[j])) {
      // 已含分隔行，直接进入表格体收集
    }
    continue;
  }
  if (mode === 'table') {
    // 表格结束
    const rows = tableBuf.filter((x) => !/^\s*\|[\s:|-]+\|\s*$/.test(x));
    const cells = rows.map((r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => inline(c.trim())));
    if (cells.length) {
      const head = cells[0].map((c) => `<th>${c}</th>`).join('');
      const body = cells.slice(1).map((r) => '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('');
      cur.html.push(`<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`);
    }
    tableBuf = []; mode = null;
  }

  if (isList(l)) {
    if (mode !== 'list') { flush(); mode = 'list'; listBuf = []; }
    listBuf.push(l);
    continue;
  }
  if (l.trim() === '') {
    if (mode === 'table') { /* 表格由下一非表行收尾 */ continue; }
    flush();
    continue;
  }
  if (mode === 'list') flush();
  mode = 'p';
  buf.push(l.trim());
}
// 收尾：残留表格
if (mode === 'table' && tableBuf.length) {
  const rows = tableBuf.filter((x) => !/^\s*\|[\s:|-]+\|\s*$/.test(x));
  const cells = rows.map((r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => inline(c.trim())));
  if (cells.length) {
    const head = cells[0].map((c) => `<th>${c}</th>`).join('');
    const body = cells.slice(1).map((r) => '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('');
    cur.html.push(`<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`);
  }
}
flush();

/* ------------------------------- 组装 */
const TODAY = new Date().toISOString().slice(0, 10);
const body = chapters.map((c) => {
  const id = 'c' + c.num;
  return `<section class="ch" id="${id}">\n<h2>${c.num}　${inline(c.title)}</h2>\n${c.html.join('\n')}\n</section>`;
}).join('\n\n');

const toc = chapters.map((c) => `<li><a href="#c${c.num}"><span class="n">${c.num}</span>${esc(c.title)}</a></li>`).join('');

const html = `<!DOCTYPE html>
<html lang="zh-CN" data-site="{{USER}}" data-lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>紧群上 p-liquid 系数的正次数上同调：一般系数的反例 · 完整版 · {{USER}}</title>
<meta name="description" content="完整手稿（预印本，未经同行评审）：${chapters.length} 节。对 G=SU(2) 与 V_p=coker(∂₄) 的平凡作用证明三阶上同调非零，在一般 p-liquid 系数量词下否定 Clausen–Scholze Question 0.10.4；p-Banach 情形仍开。">
{{HEAD_EXTRA}}
<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="assets/katex.min.css">
<script src="assets/katex.min.js"></script>
<style>
  :root { --ink:#16181d; --dim:#5b6270; --line:#e2e6ec; }
  body { margin:0; background:#fff; color:var(--ink);
    font-family:"Songti SC","Source Han Serif SC","Noto Serif CJK SC",Georgia,serif;
    font-size:16.5px; line-height:1.8; }
  .paper { max-width:50rem; margin:0 auto; padding:2.4rem 1.4rem 5rem; }
  .topnav { max-width:50rem; margin:0 auto; padding:.9rem 1.4rem 0; font-size:.8rem;
    font-family:system-ui,sans-serif; color:var(--dim); }
  .topnav a { color:var(--dim); text-decoration:none; margin-right:1rem; }
  .kicker { font-family:system-ui,sans-serif; font-size:.72rem; letter-spacing:.12em;
    text-transform:uppercase; color:var(--dim); margin:0 0 .7rem; }
  h1 { font-size:1.55rem; line-height:1.45; margin:0 0 .4rem; font-weight:600; }
  .en-title { font-size:.96rem; color:var(--dim); font-style:italic; margin:0 0 1rem; }
  .byline { font-size:.88rem; color:var(--dim); font-family:system-ui,sans-serif; margin:0 0 1.3rem; }
  .status { font-size:.82rem; border-left:3px solid #d9bfbf; padding:.3rem 0 .3rem .85rem;
    margin:0 0 1.6rem; color:#3a3f47; font-family:system-ui,sans-serif; line-height:1.65; }
  .abstract { border-top:2px solid var(--ink); border-bottom:1px solid var(--line);
    padding:.95rem 0 1.05rem; margin:0 0 1.6rem; font-size:.94rem; }
  .ablabel { font-family:system-ui,sans-serif; font-size:.7rem; letter-spacing:.12em;
    text-transform:uppercase; color:var(--dim); display:block; margin-bottom:.4rem; }
  .toc { border-bottom:1px solid var(--line); padding-bottom:1.2rem; margin-bottom:2rem;
    font-family:system-ui,sans-serif; font-size:.84rem; }
  .toc h2 { font-size:.8rem; letter-spacing:.1em; text-transform:uppercase; color:var(--dim);
    border:0; margin:0 0 .7rem; padding:0; }
  .toc ol { list-style:none; margin:0; padding:0; columns:2; column-gap:2rem; }
  .toc li { margin:.16rem 0; break-inside:avoid; }
  .toc a { color:#2b313a; text-decoration:none; display:block; line-height:1.55; }
  .toc a:hover { color:#8a1c1c; }
  .toc .n { display:inline-block; min-width:2.1em; color:var(--dim); }
  h2 { font-size:1.02rem; margin:2.3rem 0 .6rem; font-weight:600; padding-bottom:.25rem;
    border-bottom:1px solid var(--line); scroll-margin-top:1rem; }
  h3 { font-size:.95rem; margin:1.4rem 0 .3rem; font-weight:600; color:#2a2f38; }
  h4 { font-size:.9rem; margin:1.1rem 0 .25rem; font-weight:600; color:#3a4250; }
  p { margin:.62rem 0; text-align:justify; }
  p.audit { font-size:.8rem; color:var(--dim); font-family:system-ui,sans-serif;
    text-align:left; line-height:1.65; padding:.15rem 0 .15rem .7rem;
    border-left:2px solid var(--line); margin:.5rem 0; }
  ul.mlist, ol.mlist { margin:.5rem 0 .7rem; padding-left:1.45rem; }
  ul.mlist li, ol.mlist li { margin:.22rem 0; }
  .dm { margin:.75rem 0; overflow-x:auto; overflow-y:hidden; }
  blockquote { margin:.8rem 0; padding:.35rem .95rem; border-left:3px solid var(--line);
    background:#fafbfc; font-size:.95rem; }
  table { border-collapse:collapse; width:100%; font-size:.83rem; margin:.8rem 0;
    font-family:system-ui,sans-serif; }
  th,td { border-bottom:1px solid var(--line); padding:.35rem .45rem; text-align:left; vertical-align:top; }
  th { font-size:.78rem; font-weight:600; color:#3a4250; }
  code { font-family:ui-monospace,Consolas,monospace; font-size:.84em; background:#f3f5f8;
    padding:.05em .26em; border-radius:2px; }
  hr { border:0; border-top:1px solid var(--line); margin:1.6rem 0; }
  .foot { margin-top:2.4rem; padding-top:.9rem; border-top:1px solid var(--line);
    font-size:.78rem; color:var(--dim); font-family:system-ui,sans-serif; }
  .katex-display { margin:.7rem 0; }
  @media (max-width:680px){ body{font-size:16px} .paper{padding:1.6rem 1rem 3.5rem}
    .toc ol{columns:1} }
</style>
</head>
<body>

<div class="topnav">
  <a href="./">← {{USER}}</a>
  <a href="research.html">星图研究</a>
  <a href="mathgalaxy/">数学星图</a>
</div>

<main class="paper">

  <p class="kicker">Preprint · 完整手稿</p>
  <h1>紧群上 $p$-liquid 系数的正次数上同调：一般系数的反例</h1>
  <p class="en-title">Positive-degree cohomology of compact groups with $p$-liquid coefficients:
    a counterexample for general coefficients</p>
  <p class="byline">{{USER}} · 2026 年 10 月 · 共 ${chapters.length} 节</p>

  <div class="status">
    未经同行评审。手稿按轮次追加写成，节内保留了当时的尺度与审计记录（以浅色小字标出）。
    引用请注明 preprint。
  </div>

  <div class="abstract">
    <span class="ablabel">摘要</span>
    <p>设 $G=\\mathrm{SU}(2)$，$V_p=\\operatorname{coker}\\bigl(\\partial_4:M_{&lt;p}(G^4)\\to M_{&lt;p}(G^3)\\bigr)$，
    取平凡作用。本文证明 $V_p$ 是 $p$-liquid 实向量空间且 $H^3(G,V_p)\\neq0$。
    因此 Clausen–Scholze 在《Lectures on Analytic Geometry》Lecture X 中提出的问题
    ——紧非交换群、$p$-liquid 系数、平凡作用时 $H^i(G,V)$ 是否对一切 $i&gt;0$ 为零——
    在「任意 $p$-liquid 系数」这一量词下答案为否。</p>
    <p>论证的主线是：$p$-liquid 测度是可数原子和，于是 $G^{\\delta}$ 的有界（不要求连续或可测）
    三上圈可以在 liquid 链上按原子取值；再取一个由算术双曲三流形的体积上圈拉回得到的有界上圈，
    得到一个不存在 liquid 四链填充的三圈。$p$-Banach 情形不在本文范围内，
    后文说明它为什么不被上述反例覆盖，并把它归约为一个显式标量下确界。</p>
  </div>

  <nav class="toc">
    <h2>目录</h2>
    <ol>${toc}</ol>
  </nav>

${body}

  <p class="foot">
    文字内容 <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>；站点与引擎代码 MIT。
    <br>生成自 <code>papers/p-liquid.md</code>　·　最近更新：{{UPDATED}}　·　<a href="{{SITE_REPO}}">本站源码</a>
  </p>

</main>

<script>
(function () {
  if (!window.katex) return;
  var I = String.fromCharCode(36), D = I + I;
  function mk(tex, display) {
    var sp = document.createElement('span');
    try { sp.innerHTML = katex.renderToString(tex, { throwOnError: false, displayMode: display }); }
    catch (e) { sp.textContent = display ? D + tex + D : I + tex + I; }
    return sp;
  }
  var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), list = [];
  while (w.nextNode()) list.push(w.currentNode);
  for (var k = 0; k < list.length; k++) {
    var node = list[k], par = node.parentNode;
    if (!par || node.nodeValue.indexOf(I) < 0) continue;
    if (par.closest('code, pre, script, style, .katex')) continue;
    var txt = node.nodeValue, out = [], i = 0, changed = false;
    for (;;) {
      var s = txt.indexOf(I, i);
      if (s < 0) break;
      if (txt.substr(s, 2) === D) {
        var e = txt.indexOf(D, s + 2);
        if (e < 0) break;
        if (s > i) out.push(document.createTextNode(txt.slice(i, s)));
        out.push(mk(txt.slice(s + 2, e), true));
        i = e + 2; changed = true;
      } else {
        var e2 = txt.indexOf(I, s + 1);
        if (e2 < 0) break;
        if (s > i) out.push(document.createTextNode(txt.slice(i, s)));
        out.push(mk(txt.slice(s + 1, e2), false));
        i = e2 + 1; changed = true;
      }
    }
    if (!changed) continue;
    if (i < txt.length) out.push(document.createTextNode(txt.slice(i)));
    var frag = document.createDocumentFragment();
    for (var q = 0; q < out.length; q++) frag.appendChild(out[q]);
    par.replaceChild(frag, node);
  }
})();
</script>
</body>
</html>
`;

fs.writeFileSync(OUT, html, 'utf8');
const kb = (n) => (n / 1024).toFixed(0) + ' KB';
console.log(`章节 ${chapters.length} · 段落 ${chapters.reduce((a, c) => a + c.html.length, 0)}`);
console.log(`${path.relative(ROOT, OUT)}  ${kb(Buffer.byteLength(html))}`);
