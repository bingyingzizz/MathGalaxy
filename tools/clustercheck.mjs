#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 团体检（加完一个星团必跑）
   --------------------------------------------------------------------------
   用法：bun tools/clustercheck.mjs <星团id> [--quiet]

   查四类「加完团之后才会暴露」的问题（都不是硬门，是给人看的清单）：

     ① **文引无边**：正文里用 **反引号** 点名了某个节点，却没有连线。
        ⇒ 反引号是**承诺**（读者会点进去），要么补边，要么把它降成普通文字（`def.x` → 「中文名」）。
     ② **提到名字但无边**：正文出现了某个节点的 label / aka（长名字优先），却没有边。
        ⇒ 分两种：真依赖（补边）／同名不同物（补消歧注或类比边）／顺带一提（不管）。
     ③ **refs 为空 / 孤岛（出=入=0）**：引用与接线的基本检查。
     ④ **对外连线**：这个团连到了哪些星系。⚠️ 只在**本星系内**打转通常说明少接了外部的桥
        （Galois 团最初只有 algebra，补上 Zorn / 单位根 / 基本群之后才有 5 个星系）。

   配合的硬门（这些是构建里就有的，不用这里查）：
     边端点存在 · 纯文本字段不含 $ · 产物体积 · 层方向 · KaTeX · 中英公式条数一致。

   ⚠️ ② 会误报（「线性无关」「不可分」这类词会撞到别的节点的 aka）——
      它的用途是**提示人去看**，不是自动判错。所以这个工具永远 exit 0。
   ========================================================================== */

/* 团体检主体 */
import fs from 'node:fs';
const G = JSON.parse(fs.readFileSync('dist/graph.json', 'utf8'));
const by = Object.fromEntries(G.nodes.map((n) => [n.id, n]));
const clusterId = process.argv[2];
const nodes = G.nodes.filter((n) => n.cluster === clusterId);
if (!nodes.length) { console.log('没有这个星团：' + clusterId); process.exit(1); }

/* 边的无向邻接（任意 kind 都算「接上了」） */
const adj = new Map(G.nodes.map((n) => [n.id, new Set()]));
const ends = (e) => e.kind === 'implication' ? { f: e.sources || [], t: [e.target] }
  : e.kind === 'definition' ? { f: [e.definition], t: [e.usedBy] } : { f: [e.a], t: [e.b] };
for (const e of G.edges) {
  const { f, t } = ends(e);
  for (const a of f) for (const b of t) { adj.get(a)?.add(b); adj.get(b)?.add(a); }
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
  const refsIds = [...txt.matchAll(/`([a-z][a-z0-9]*\.[a-z0-9-]+)`/g)].map((m) => m[1])
    .filter((id) => by[id] && id !== n.id);
  const missingEdgeRefs = [...new Set(refsIds)].filter((id) => !adj.get(n.id).has(id));
  /* ② 正文里出现别的节点的名字但无边（只取长名字，避免噪音） */
  const nameHits = [];
  for (const [s, id] of names) {
    if (id === n.id || adj.get(n.id).has(id)) continue;
    if (txt.includes(s)) { nameHits.push(`${s}(${id})`); if (nameHits.length >= 6) break; }
  }
  rows.push({ n, outs, ins, missingEdgeRefs, nameHits, refs: (n.refs || []).length, len: txt.length });
}

let bad = 0;
for (const r of rows) {
  const { n } = r;
  const flags = [];
  if (!r.refs) flags.push('无 refs');
  if (!r.outs && !r.ins) flags.push('孤岛');
  if (r.missingEdgeRefs.length) flags.push('文引无边 ' + r.missingEdgeRefs.length);
  console.log(`L${String(n.layer).padStart(2)} ${n.id.padEnd(32)} 出${String(r.outs).padStart(2)} 入${String(r.ins).padStart(2)} refs${r.refs} ${(n.status || '').padEnd(9)} 注${r.len}字 ` + (flags.length ? '⚠ ' + flags.join(' / ') : ''));
  if (r.missingEdgeRefs.length) console.log('     文引无边: ' + r.missingEdgeRefs.join(', '));
  if (r.nameHits.length) console.log('     提到名字但无边: ' + r.nameHits.join(' · '));
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
