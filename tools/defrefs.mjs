/* ==========================================================================
   tools/defrefs.mjs —— 生成「定义引用」边（`src/data/packs/94-def-refs.js`）
   --------------------------------------------------------------------------
   由来：2026-10-15 体检发现 594 / 707 个节点「陈述里提到了某个定义、却没有依赖边」，
   共 1500+ 条 —— 用户看到的就是面板里「陈述中用到的定义 (1)」那种明显不对的栏位。

   做法：**复用引擎的匹配逻辑**（`src/core/xlink.js` 的 `scan`），
   把每个节点 `statement` 里命中的、类型是 definition / axiom 的节点找出来，
   减掉已经有边的，剩下的就是缺的。⛔ 绝不在构建脚本里另写一份匹配 —— 两份一定会漂。

   ⚠️ **幂等**：读的是 `dist/graph.json`（上一轮构建的产物），但它会把
      id 以 `def-ref.` 开头的边**排除**在「已有」之外 —— 否则第二次跑会
      因为「上轮已经把边写进去了」而输出空表。

   ⚠️ 生成的是**静态数据**（进 git）。这样改动可 review、可回滚，
      `dist/graph.json` 也能在没跑生成器的情况下自洽。

   用法：
     bun tools/build.mjs && bun tools/defrefs.mjs --write && bun tools/build.mjs
   ========================================================================== */
import fs from 'node:fs';
import vm from 'node:vm';

const WRITE = process.argv.includes('--write');
const OUT = 'src/data/packs/94-def-refs.js';
const graph = JSON.parse(fs.readFileSync('dist/graph.json', 'utf8'));
/* ⚠️ dist/graph.json **没有** byId（那是运行时 buildGraph 建的）⇒ 自己补一张。
   xlink.js 的邻接表只读 graph.byId 做「端点是否是真节点」的存在性检查。 */
if (!graph.byId) {
  graph.byId = Object.create(null);
  graph.nodes.forEach(n => { graph.byId[n.id] = n; });
}

/* ---------------------------------------------------------------- 载入 */
const ctx = { console };
ctx.MG = {};
ctx.window = { MG: ctx.MG };          // ⚠️ 两个文件写的都是裸 `MG.xxx`，必须同一个对象
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('src/core/xlink.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync('src/data/aliases.js', 'utf8'), ctx);
if (!ctx.MG.createXLink) { console.error('✗ 载入 xlink.js 失败'); process.exit(2); }

const xl = ctx.MG.createXLink(graph, ctx.MG.aliases);
if (!xl || !xl.scan) { console.error('✗ xlink.js 没导出 scan —— 构建脚本没法复用匹配逻辑'); process.exit(2); }

/* ------------------------------------------------------------ 已有边 */
const have = Object.create(null);
graph.edges.forEach(e => {
  if (String(e.id || '').indexOf('def-ref.') === 0) return;      // ⚠️ 幂等：不认自己上轮的产物
  if (e.kind === 'implication' && e.target) {
    (e.sources || []).forEach(s => { have[s + '>' + e.target] = 1; });
  } else if (e.kind === 'definition') {
    have[e.definition + '>' + e.usedBy] = 1;
  } else if (e.kind === 'equivalence' && e.a && e.b) {
    have[e.a + '>' + e.b] = 1; have[e.b + '>' + e.a] = 1;
  }
});

/* ------------------------------------------------------ 正文 → 纯文本 */
/* 去掉强调符与 $ 公式，剩下的就是「正文里读得到的字」。
   ⚠️ 引擎那边（linkify）扫的是**渲染后**的 DOM 并跳过 `.katex`；这里用同一套口径近似 ——
      差异只可能来自强调符正好跨在词中间（极少）。 */
function plain(s) {
  return String(s || '')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*\$/g, ' ')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
}

/* ---------------------------------------------------------------- 扫描 */
const rows = [];
let forward = 0, backward = 0;
graph.nodes.forEach(n => {
  const text = plain(n.statement);
  const hits = xl.scan(text, n.id, true);
  hits.forEach(h => {
    const t = (graph.byId || {})[h.id];
    if (!t || (t.type !== 'definition' && t.type !== 'axiom')) return;
    if (h.id === n.id) return;
    /* ⛔ 公理的陈述是**元语言**的：替换公理模式里出现「函数」，不代表替换公理
       依赖函数的定义 —— 公理不可能依赖由它自己派生出来的概念。
       ⇒ 凡是「用在某个公理身上」的边一律不生成，否则会把整条 ZFC 构造链
         和公理锁进一个环，Tarjan 缩点把 27 层压成 19 层（实测过）。 */
    if (n.type === 'axiom') return;
    const key = h.id + '>' + n.id;
    if (have[key]) return;
    have[key] = 1;                                   // 同一个节点里也不要重复
    const back = (t.layer != null && n.layer != null && t.layer >= n.layer);
    if (back) backward++; else forward++;
    rows.push([h.id, n.id, text.substr(h.at, h.len)]);
  });
});
rows.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : (a[1] < b[1] ? -1 : 1)));

console.log('候选边', rows.length, '｜ 前进', forward, '｜ 倒退（含真环）', backward);

/* ---------------------------------------------------------------- 输出 */
const head = `/* ==========================================================================
   数学星图 · 定义引用边（**自动派生**，别手改）
   --------------------------------------------------------------------------
   由 \`tools/defrefs.mjs\` 生成：把每个节点 statement 里提到的、类型为
   definition / axiom 的节点连起来。生成器复用引擎的匹配逻辑
   （\`src/core/xlink.js\` 的 \`scan\`），⛔ 不要另写一份。

   为什么要有这个包：2026-10-15 体检发现 594 / 707 个节点「陈述里提到了某个定义、
   却没有依赖边」，共 ${rows.length} 条 —— 面板里「陈述中用到的定义」那一栏因此明显缺项。

   ⚠️ 其中一部分是**倒退边**（定义的层号 ≥ 使用者的层号）。它们分两类：
       · 多数是「**那个节点原来太浅**」—— 加上这条边它就会被推深，是修正；
       · 少数是**真环**（两边互相引用，例如「幂集 ↔ 幂集公理」「单射满射 ↔ 函数」）——
         layers.js 用 Tarjan 缩点处理，环里的点自然同层。
       ⛔ 具体多少条**不写死**：分层本身会被这些边改掉，数字每次重算都不一样。

   重新生成：
     bun tools/build.mjs && bun tools/defrefs.mjs --write && bun tools/build.mjs
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '定义引用（自动派生）',
  nodes: [],
  edges: [
`;

const body = rows.map(r =>
  "    { id: 'def-ref." + r[0] + "." + r[1] + "', kind: 'definition', definition: '" +
  r[0] + "', usedBy: '" + r[1] + "', note: '陈述里出现「" + String(r[2]).replace(/'/g, "\\'") + "」。' }"
).join(',\n');

const text = head + body + ',\n  ]\n});\n';

if (WRITE) {
  fs.writeFileSync(OUT, text, 'utf8');
  console.log('✓ 已写入', OUT, '（' + (text.length / 1024).toFixed(0) + ' KB）');
} else {
  console.log('（干跑，没写文件；加 --write 才写）前 8 条：');
  rows.slice(0, 8).forEach(r => console.log('  ' + r[0] + ' → ' + r[1] + (r[2] ? '  [倒退]' : '')));
}
