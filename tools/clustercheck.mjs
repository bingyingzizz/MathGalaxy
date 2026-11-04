#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 团体检（加完一个星团必跑）
   --------------------------------------------------------------------------
   用法：bun tools/clustercheck.mjs <星团id>
         bun tools/clustercheck.mjs --thin        # 全库扫「薄接线」（不按星团，加完内容必跑）

   查五类「加完团之后才会暴露」的问题（都不是硬门，是给人看的清单）：

     ① **死指针**：正文里用 **反引号** 点名的 id **不存在**（拼错 / 改名遗留）。
        ✅ 反引号里的 id **不需要有图上的边** —— 只要 id 存在，渲染时就会变成可点链接（显示中文名）。
        （2026-11-03 修：此前只有面板登记了节点表，概念页上这些 id 全是灰底代码，全库 328 处；
          现在 `tools/sitepages.mjs` 也调用 `U.setNodeTable()`，两条渲染路径一致。）
        ⇒ 只有「点进去 404」才算问题。
     ② **提到名字但无边**：正文出现了某个节点的 label / aka（长名字优先），却没有边。
        ⇒ 分两种：真依赖（补边）／同名不同物（补消歧注或类比边）／顺带一提（不管）。
     ③ **refs 为空 / 孤岛（出=入=0）**：引用与接线的基本检查。
     ④ **对外连线**：这个团连到了哪些星系。⚠️ 只在**本星系内**打转通常说明少接了外部的桥
        （Galois 团最初只有 algebra，补上 Zorn / 单位根 / 基本群之后才有 5 个星系）。
     ⑤ **薄接线（度数 ≤ 1）**：只用强边（推出/等价/定义，不算类比）数的度数。
        · **例子**只接 1 条 → **算旗标**（例子至少要有两条：一条指向它印证的概念，再一条横向的）；
        · 其它节点只接 1 条 → **只提示，不算旗标**（定义/引理只被用一次是正常的）。
        ⭐ 这条是补出来的（2026-11-04）：当时我只跑了「新节点所在的 13 个团」就宣布 0 旗标，
           而 `ex.sphere-curvature` 只有 1 条边 —— 四个旧判据全不吭声。
           ⇒ 加完内容**不靠记忆**，直接跑 `--thin` 扫全库。它第一次跑就抓到了
           `ex.cg-examples`（老账，此前也没人发现），现已补到 4 条边。

   配合的硬门（这些是构建里就有的，不用这里查）：
     边端点存在 · 纯文本字段不含 $ · 产物体积 · 层方向 · KaTeX · 中英公式条数一致。

   ⚠️ ② 会误报（「线性无关」「不可分」这类词会撞到别的节点的 aka）——
      它的用途是**提示人去看**，不是自动判错。所以这个工具永远 exit 0。
   ========================================================================== */

/* 团体检主体 */
import fs from 'node:fs';
const G = JSON.parse(fs.readFileSync('dist/graph.json', 'utf8'));
const EDGE_IDS = new Set(G.edges.map((e) => e.id).filter(Boolean));
const CLUSTER_IDS = new Set(G.clusters.map((c) => c.id));
const by = Object.fromEntries(G.nodes.map((n) => [n.id, n]));
const clusterId = process.argv[2];
const THIN = process.argv.includes('--thin');   // 全库扫「薄接线」，不需要星团 id
const nodes = G.nodes.filter((n) => n.cluster === clusterId);
if (!nodes.length && !THIN) { console.log('没有这个星团：' + clusterId); process.exit(1); }

/* 边的无向邻接（任意 kind 都算「接上了」） */
const adj = new Map(G.nodes.map((n) => [n.id, new Set()]));
const ends = (e) => e.kind === 'implication' ? { f: e.sources || [], t: [e.target] }
  : e.kind === 'definition' ? { f: [e.definition], t: [e.usedBy] } : { f: [e.a], t: [e.b] };
for (const e of G.edges) {
  const { f, t } = ends(e);
  for (const a of f) for (const b of t) { adj.get(a)?.add(b); adj.get(b)?.add(a); }
}

/* ⭐ 强边邻接（**不含类比**）：用来数「接线有多粗」。
   `工具为什么加这一段（2026-11-04）`：原来只查「孤岛（0 度）」，于是**只挂一条边**的例子
   照样 0 旗标地过——`ex.sphere-curvature` 就是这么漏的：全库 105 团 0 旗标，而它只有 1 条定义边。
   判据：例子节点应该 ≥ 2 条强边（一条指向它印证的概念，至少再有一条横向的）；
   其它节点只接 1 条 = 提示（定义/引理只被用一次是正常的，不算错）。 */
const strongAdj = new Map(G.nodes.map((n) => [n.id, new Set()]));
for (const e of G.edges) {
  if (e.kind === 'analogy') continue;
  const { f, t } = ends(e);
  for (const a of f) for (const b of t) { strongAdj.get(a)?.add(b); strongAdj.get(b)?.add(a); }
}
const strongDeg = (id) => (strongAdj.get(id) ? strongAdj.get(id).size : 0);

/* ⭐ `--thin`：全库扫「薄接线」，**不按星团**。
   为什么需要它：2026-11-04 我只跑了「新节点所在的 13 个团」就宣布 0 旗标，
   而 `ex.sphere-curvature` 只有 1 条边——它所在的团确实是 0 旗标（当时这条判据还不存在）。
   ⇒ 加完内容后**不靠记忆**，直接 `bun tools/clustercheck.mjs --thin` 扫全库。 */
if (THIN) {
  const thin = G.nodes.filter((n) => strongDeg(n.id) <= 1)
    .sort((a, b) => (a.cluster === b.cluster ? a.id.localeCompare(b.id) : a.cluster.localeCompare(b.cluster)));
  const ex1 = thin.filter((n) => n.type === 'example');
  console.log(`# 全库薄接线扫查：${G.nodes.length} 个节点中有 ${thin.length} 个只接 ≤1 条强边`);
  console.log(`  其中**例子** ${ex1.length} 个（例子应该 ≥2 条：一条指向它印证的概念，再至少一条横向）。\n`);
  if (ex1.length) {
    console.log('## ⚠ 例子只接 ≤1 条（该补）');
    for (const n of ex1) console.log(`  L${String(n.layer).padStart(2)} ${n.id.padEnd(30)} 度${strongDeg(n.id)}  ${n.cluster}  · ${n.label}`);
    console.log('');
  }
  const rest = thin.filter((n) => n.type !== 'example');
  const byCluster = new Map();
  for (const n of rest) byCluster.set(n.cluster, (byCluster.get(n.cluster) || []).concat(n));
  console.log('## 其它节点只接 ≤1 条（提示，定义/引理只被用一次是正常的）');
  for (const [c, list] of [...byCluster.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${c.padEnd(26)} ${String(list.length).padStart(2)} 个：${list.slice(0, 6).map((n) => n.id).join(' · ')}${list.length > 6 ? ` 等 ${list.length}` : ''}`);
  }
  console.log(`\n汇总：例子薄接线 ${ex1.length} 个（应为 0）· 其它 ${rest.length} 个（提示）`);
  process.exit(0);
}

/* 名字 → 节点（label / aka 都算），用于「正文提到但没连线」 */
const akaOf = new Map();
{
  const src = fs.readFileSync('src/data/aliases.js', 'utf8');
  for (const m of src.matchAll(/\{ id: '([^']+)',[^\n]*?aka: \[([^\]]*)\]/g)) {
    akaOf.set(m[1], [...m[2].matchAll(/'([^']*)'/g)].map((x) => x[1]));
  }
}
const names = [];
for (const n of G.nodes) {
  for (const s of [n.label, ...(akaOf.get(n.id) || [])]) {
    if (s && s.length >= 3 && !/^\$/.test(s)) names.push([s, n.id]);
  }
}
names.sort((a, b) => b[0].length - a[0].length);

console.log(`# 团体检：${clusterId}（${nodes.length} 点）\n`);
const rows = [];
for (const n of nodes) {
  const txt = String(n.statement || '') + '\n' + String(n.notes || '');
  const outs = (G.edges.filter((e) => { const { f } = ends(e); return f.includes(n.id); })).length;
  const ins = (G.edges.filter((e) => { const { t } = ends(e); return t.includes(n.id); })).length;
  /* ① 正文里 `id` 引用但无边 */
  /* ① 死指针：反引号里点名的 id 在不在？（**不再要求它必须有边**） */
  const TICKRX = new RegExp(String.fromCharCode(96) + "([a-z][a-z0-9]*[.][a-z0-9-]+)" + String.fromCharCode(96), 'g');
  const allRefIds = [...new Set([...txt.matchAll(TICKRX)].map((m) => m[1]))].filter((id) => id !== n.id);
  /* 边 id（imp./dep./eq./ana.）与星团 id 在正文里也会被反引号点名，它们**存在但不是节点**
     —— 没有可点的页面，属于「文档指针」而不是「死链接」（审计 G1 的原话）。 */
  /* 源码文件名（`notation.js`、`tools/build.mjs`）也不是节点，放行。 */
  const FILE_OK = /[.](js|mjs|json|md|txt|html|css|png|woff2)$/;
  const deadRefs = allRefIds.filter((id) => !by[id] && !EDGE_IDS.has(id) && !CLUSTER_IDS.has(id) && !FILE_OK.test(id));
  const unlinkedRefs = allRefIds.filter((id) => by[id] && !adj.get(n.id).has(id));
  /* ② 正文里出现别的节点的名字但无边（只取长名字，避免噪音） */
  const nameHits = [];
  for (const [s, id] of names) {
    if (id === n.id || adj.get(n.id).has(id)) continue;
    if (txt.includes(s)) { nameHits.push(`${s}(${id})`); if (nameHits.length >= 6) break; }
  }
  rows.push({ n, outs, ins, deadRefs, unlinkedRefs, nameHits, refs: (n.refs || []).length, len: txt.length });
}

let bad = 0;
for (const r of rows) {
  const { n } = r;
  const flags = [];
  if (!r.refs) flags.push('无 refs');
  if (!r.outs && !r.ins) flags.push('孤岛');
  const sd = strongDeg(n.id);
  /* ⚠ 只有**例子**的薄接线算旗标（进 bad）；其它节点只接 1 条是正常的（定义/引理只被用一次），
     用单独一行「薄接线」提示 —— 否则这里会给 70 个团挂上 167 条提示，「105 团 0 旗标」这个不变量就废了。 */
  if (sd === 1 && n.type === 'example') flags.push('例子只接 1 条线');
  if (r.deadRefs.length) flags.push('死指针 ' + r.deadRefs.length);
  console.log(`L${String(n.layer).padStart(2)} ${n.id.padEnd(32)} 出${String(r.outs).padStart(2)} 入${String(r.ins).padStart(2)} refs${r.refs} ${(n.status || '').padEnd(9)} 注${r.len}字 ` + (flags.length ? '⚠ ' + flags.join(' / ') : ''));
  if (r.deadRefs.length) console.log('     死指针（id 不存在）: ' + r.deadRefs.join(', '));
  if (r.unlinkedRefs.length) console.log('     提示（有链接但图上无边）: ' + r.unlinkedRefs.slice(0, 6).join(', '));
  if (r.nameHits.length) console.log('     提到名字但无边: ' + r.nameHits.join(' · '));
  if (sd === 1 && n.type !== 'example') console.log('     薄接线（只接 1 条强边，提示）');
  if (flags.length) bad++;
}

/* ③ 团的对外连线（跨团 / 跨区） */
const inner = new Set(nodes.map((n) => n.id));
const outLinks = new Map();
const regionLinks = new Map();
for (const e of G.edges) {
  const { f, t } = ends(e);
  const touch = [...f, ...t];
  if (!touch.some((x) => inner.has(x))) continue;
  for (const x of touch) {
    if (!by[x] || inner.has(x)) continue;
    outLinks.set(x, (outLinks.get(x) || 0) + 1);
    const rg = (by[x].regions || [by[x].region] || ['?'])[0];
    regionLinks.set(rg, (regionLinks.get(rg) || 0) + 1);
  }
}
console.log('\n## 对外连线');
console.log('  按星系: ' + [...regionLinks.entries()].map(([r, c]) => `${r}(${c})`).join(' · '));
console.log('  连到的外部节点 ' + outLinks.size + ' 个：' + [...outLinks.keys()].slice(0, 12).join(', '));
console.log('\n汇总：' + bad + ' / ' + rows.length + ' 个节点有旗标');
