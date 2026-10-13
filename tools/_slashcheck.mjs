/* ==========================================================================
   tools/_slashcheck.mjs
   扫内容包里「LaTeX 命令丢了反斜杠」的地方 —— 只看**字符串字面量**。
   --------------------------------------------------------------------------
   为什么需要：JS 字符串里 `\p` 是**未定义转义**，会静默变成 `p` —— 公式坏掉、
   不报语法错；而 `_katexcheck-all.mjs` 的「丢反斜杠」一节只查
   mathbb / mathcal / mathrm / operatorname 这几种，`\prod`、`\ker`、
   `\alpha` 全漏网。（注释里的 `\m` 无所谓 —— 注释不转义，所以不扫注释。）

   判据：字符串里 `\` 后面跟一个字母，而它不是 JS 的合法转义
   （n t r b f v 0 、`\` `'` `"` 与换行）。合法的 `\\` 当然不算。

   用法：bun tools/_slashcheck.mjs
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const DIR = path.join(ROOT, 'src/data/packs');
const OKESC = new Set(['n', 't', 'r', 'b', 'f', 'v', '0', 'x', 'u', '\n', '\r', '\\', "'", '"', '`']);

const hits = [];
const files = fs.readdirSync(DIR).filter((x) => x.endsWith('.js')).sort();

for (const f of files) {
  const lines = fs.readFileSync(path.join(DIR, f), 'utf8').split(/\r?\n/);
  const st = { str: null, block: false };
  lines.forEach((ln, li) => {
    let i = 0;
    while (i < ln.length) {
      const c = ln[i];
      if (st.block) {
        if (c === '*' && ln[i + 1] === '/') { st.block = false; i += 2; continue; }
        i++; continue;
      }
      if (st.str) {
        if (c === '\\') {
          const nxt = ln[i + 1];
          if (nxt && /[A-Za-z]/.test(nxt) && !OKESC.has(nxt)) {
            hits.push({ file: f, line: li + 1, frag: ln.slice(Math.max(0, i - 34), i + 34) });
          }
          i += 2; continue;
        }
        if (c === st.str) { st.str = null; i++; continue; }
        i++; continue;
      }
      if (c === '/' && ln[i + 1] === '/') break;
      if (c === '/' && ln[i + 1] === '*') { st.block = true; i += 2; continue; }
      if (c === "'" || c === '"' || c === '`') { st.str = c; i++; continue; }
      i++;
    }
  });
}

console.log('扫了 ' + files.length + ' 个内容包（只看字符串字面量）');
console.log('疑似丢反斜杠：' + hits.length + ' 处');
for (const h of hits) console.log('  ' + h.file + ':' + h.line + '   …' + h.frag + '…');
