/**
 * 把 _tools/_paper-gpt61.md（Codex 写的论文稿）落成站点论文页。
 *
 *   bun tools/paper-md2html.mjs [in.md] [out.html]
 *
 * 只替换 <main class="paper"> … </main> 之间的内容：
 * CSS、字体、KaTeX 客户端渲染脚本都沿用现有页面，不重复维护。
 *
 * 两个必须处理的输入污染：
 *  1) Codex 经 PowerShell `Set-Content -Encoding UTF8` 写文件 ⇒ 文件头有 UTF-8 BOM；
 *  2) 它把 LaTeX 定界符写成了 `\\(`、`\\)`（双重反斜杠）⇒ 先归一化，
 *     但**不能**碰行内的 `\\`（aligned/split 的换行），所以只替换紧跟括号/方括号的那些。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const IN = process.argv[2] || path.join(ROOT, '_tools', '_paper-gpt61.md');
const OUT = process.argv[3] || path.join(ROOT, 'site', 'research-p-liquid.html');
const B = String.fromCharCode(92);

let md = fs.readFileSync(IN, 'utf8');
md = md.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
// 定界符去重：\\( -> \( ，\\) -> \) ，\\[ -> \[ ，\\] -> \]
md = md.split(B + B + '(').join(B + '(')
       .split(B + B + ')').join(B + ')')
       .split(B + B + '[').join(B + '[')
       .split(B + B + ']').join(B + ']');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(s) {
  let t = esc(s);
  t = t.split(B + '(').join('$').split(B + ')').join('$');
  t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/&lt;(https?:\/\/[^\s&]+)&gt;/g, '<a href="$1" rel="noopener">$1</a>');
  t = t.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
  return t;
}

const lines = md.split('\n');
let i = 0;
let title = '';
while (i < lines.length && !/^##\s/.test(lines[i])) i++;   // 前端标题由 FRONT 提供，md 抬头整段跳过

const out = [];
let buf = [], mode = null, listBuf = [], tableBuf = [], mathBuf = [], inMath = false;

function flush() {
  if (mode === 'list' && listBuf.length) {
    const ordered = /^\s*\d+\./.test(listBuf[0]);
    const tag = ordered ? 'ol' : 'ul';
    out.push(`<${tag}>` + listBuf.map((x) => '<li>' + inline(x.replace(/^\s*([-*+]|\d+\.)\s+/, '').trim()) + '</li>').join('') + `</${tag}>`);
    listBuf = [];
  }
  if (mode === 'p' && buf.length) {
    const t = buf.join(' ').trim();
    // 摘要首行 / 定理名单独成段时加点样式
    if (/^\*\*(Lemma|Theorem|Corollary|Proposition|Remark)\b/.test(t)) out.push(`<p class="thmline">${inline(t)}</p>`);
    else out.push(`<p>${inline(t)}</p>`);
    buf = [];
  }
  mode = null;
}

function flushTable() {
  const rows = tableBuf.filter((x) => !/^\s*\|[\s:|-]+\|\s*$/.test(x));
  const cells = rows.map((r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => inline(c.trim())));
  if (cells.length) {
    const head = cells[0].map((c) => `<th>${c}</th>`).join('');
    const body = cells.slice(1).map((r) => '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('');
    out.push(`<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`);
  }
  tableBuf = [];
}

let section = '';
for (; i < lines.length; i++) {
  const l = lines[i];

  if (inMath) {
    mathBuf.push(l);
    if (new RegExp('^\\s*' + B + B + ']').test(l)) {
      inMath = false;
      const inner = mathBuf.join('\n').replace(new RegExp('^\\s*' + B + B + '\\[\\s*'), '').replace(new RegExp('\\s*' + B + B + '\\]\\s*$'), '');
      out.push(`<div class="dm">$$${esc(inner)}$$</div>`);
      mathBuf = [];
    }
    continue;
  }
  if (new RegExp('^\\s*' + B + B + '\\[\\s*$').test(l)) { flush(); inMath = true; mathBuf = [l]; continue; }

  if (/^#\s/.test(l)) { flush(); continue; }
  if (/^####\s/.test(l)) { flush(); out.push(`<h4>${inline(l.replace(/^####\s+/, ''))}</h4>`); continue; }
  if (/^###\s/.test(l)) { flush(); out.push(`<h3>${inline(l.replace(/^###\s+/, ''))}</h3>`); continue; }

  if (/^##\s/.test(l)) {
    flush();
    if (tableBuf.length) flushTable();
    const h = l.replace(/^##\s+/, '').trim();
    if (h === '摘要' || h === 'Abstract') {
      section = 'abstract';
      out.push('<div class="abstract"><span class="ablabel">' + (h === 'Abstract' ? 'Abstract' : '摘要') + '</span>');
      continue;
    }
    if (section === 'abstract') { out.push('</div>'); section = ''; }
    out.push(`<h2>${inline(h)}</h2>`);
    continue;
  }

  if (/^\s*\|/.test(l)) {
    if (mode !== 'table') { flush(); mode = 'table'; tableBuf = []; }
    tableBuf.push(l);
    continue;
  }
  if (mode === 'table') { flushTable(); mode = null; }

  if (/^\s*([-*+]|\d+\.)\s+/.test(l)) {
    if (mode !== 'list') { flush(); mode = 'list'; listBuf = []; }
    listBuf.push(l);
    continue;
  }
  if (l.trim() === '') { flush(); continue; }

  if (mode === 'list') flush();
  mode = 'p';
  buf.push(l.trim());
}
flush();
if (tableBuf.length) flushTable();
if (section === 'abstract') out.push('</div>');

const EN = md.indexOf('## Abstract') >= 0;
const FRONT = (EN ? [
  '<p class="kicker">Preprint</p>',
  '<h1>Positive-Degree Cohomology of Compact Groups with p-Liquid Coefficients: a Counterexample for General Coefficients</h1>',
  '<p class="byline">{{USER}} · October 2026</p>',
  '<div class="status">Not peer reviewed. Please cite as a preprint.</div>',
] : [
  '<p class="kicker">Preprint</p>',
  '<h1>紧群上 $p$-liquid 系数的正次数上同调：一般系数的反例</h1>',
  '<p class="en-title">Positive-degree cohomology of compact groups with $p$-liquid '
    + 'coefficients: a counterexample for general coefficients</p>',
  '<p class="byline">{{USER}} · 2026 年 10 月</p>',
  '<div class="status">未经同行评审。引用请注明 preprint。</div>',
]).join(String.fromCharCode(10));


/* ------------------------------- 落盘：只换 main 的内容 */
const page = fs.readFileSync(OUT, 'utf8');
const a = page.indexOf('<main class="paper">') + '<main class="paper">'.length;
const b = page.indexOf('</main>');
if (a < '<main class="paper">'.length || b < 0) { console.error('找不到 <main class="paper"> 区间'); process.exit(1); }
let body = out.join(String.fromCharCode(10));
body = FRONT + String.fromCharCode(10) + body;
const html = page.slice(0, a) + String.fromCharCode(10) + String.fromCharCode(10) + body + String.fromCharCode(10) + '  ' + page.slice(b);
fs.writeFileSync(OUT, html, 'utf8');
console.log(`输入 ${(fs.statSync(IN).size / 1024).toFixed(0)} KB → 输出 ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
