/* ==========================================================================
   tools/_slashcheck.mjs
   扫内容包里「LaTeX 命令丢了反斜杠」的地方 —— 只看**字符串字面量**。
   --------------------------------------------------------------------------
   为什么需要：JS 字符串里 `\p` 是**未定义转义**，会静默变成 `p` —— 公式坏掉、
   不报语法错；而 `_katexcheck-all.mjs` 的「丢反斜杠」一节只查
   mathbb / mathcal / mathrm / operatorname 这几种，`\prod`、`\ker`、
   `\alpha` 全漏网。（注释里的 `\m` 无所谓 —— 注释不转义，所以不扫注释。）

   判据（两条）：
     a) 字符串里 `\` 后面跟一个字母，而它不是 JS 的合法转义
        （n t r b f v 0 、`\` `'` `"` 与换行）。合法的 `\\` 当然不算。
     b) ⭐ **盲区补丁**（2026-10-16 批 5 加）：`\` 后面跟的**正好是**合法转义字母
        （n t r b f v 0 x u）时，(a) 看不见它 —— 但 `\times`、`\to`、`\top`、`\theta`、
        `\nabla`、`\neq`、`\frac` 全在这一类里。此时改用**命令名表**判：
        该 `\` 之后那串字母正好等于一个已知的「转义字母开头的命令」就算命中。
        （起因：批 5 的 `$\times$` → `$` + 制表符 + `imes$`，全部体检放行、线上渲染成 `imes`。）
        精确整串匹配是关键 —— 否则真换行 `\n` 后面跟的单词会被误判（`$$\nL^\infty` 的 run 是 `nL`）。
     c) ⭐ **非字母命令的盲区**（2026-10-16 批 6 加）：`\{ \} \% \& \# \_ \$` 里的 `\` 也不是
        合法 JS 转义，同样会被吃掉（`'$\{e\}$'` → `${e}$`）。这几种在 JS 里**没有任何理由**
        出现，所以见到就报，不必判断上下文。
        （起因：批 6 的 `$\{e\} \trianglelefteq G$` 变成 `${e} \trianglelefteq G$`，
        KaTeX 报 `Expected '}', got 'EOF'` —— 这是**唯一**被 katexcheck 抓到的一次，
        因为它真的破坏了公式结构；若换成 `\,` 之类就抓不到了。）

   用法：bun tools/_slashcheck.mjs
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const DIR = path.join(ROOT, 'src/data/packs');
const OKESC = new Set(['n', 't', 'r', 'b', 'f', 'v', '0', 'x', 'u', '\n', '\r', '\\', "'", '"', '`']);
const ESC_CMDS = new Set([
  'to', 'top', 'times', 'tan', 'tanh', 'tau', 'theta', 'thinspace', 'triangle', 'tilde',
  'nabla', 'neq', 'nu', 'not', 'neg', 'nonumber', 'newline',
  'frac', 'forall', 'flat', 'bar', 'beta', 'bigcup', 'bigcap', 'bigoplus', 'bigotimes',
  'bigsqcup', 'biguplus', 'bigvee', 'bigwedge', 'bmod', 'bullet', 'because',
  'cup', 'cap', 'cdot', 'cdots', 'colon', 'cong', 'cos', 'cosh', 'cot', 'coth',
  'epsilon', 'varepsilon', 'varphi', 'varnothing', 'vartheta', 'vec', 'vee', 'wedge',
  'vert', 'Vert', 'rangle', 'rceil', 'rfloor', 'rightarrow', 'rightharpoonup',
  'text', 'textbf', 'textit', 'textstyle', 'tfrac', 'tbinom', 'therefore',
  'rule', 'raisebox', 'rlap'
]);

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
          } else if (nxt && '{}%&#_$ ,;:|!'.includes(nxt)) {
            hits.push({ file: f, line: li + 1, frag: ln.slice(Math.max(0, i - 34), i + 34), esc: true });
          } else if (nxt && OKESC.has(nxt)) {
            const run = (ln.slice(i + 1).match(/^[A-Za-z]+/) || [''])[0];
            if (ESC_CMDS.has(run)) {
              hits.push({ file: f, line: li + 1, frag: ln.slice(Math.max(0, i - 34), i + 34), esc: true });
            }
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
for (const h of hits) console.log('  ' + h.file + ':' + h.line + (h.esc ? ' [转义字母盲区]' : '') + '   …' + h.frag + '…');

/* ⭐ 2026-10-29 起这是**硬门**：以前只打印，于是用户先在面板上看见了
   「implies」才有人回头看这份报告。有命中就非零退出。 */
if (hits.length) {
  console.log('\n✗ 有 ' + hits.length + ' 处单反斜杠 —— LaTeX 命令要写两个反斜杠（`\\\\implies`）。');
  process.exit(1);
}
console.log('✓ 没有多余的单反斜杠');
