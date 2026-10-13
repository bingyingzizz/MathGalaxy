/* ==========================================================================
   数学星图 · 分层自检（无浏览器，bun 直接跑）
   --------------------------------------------------------------------------
   依赖图（前置 → 依赖它的）里，等价关系会造成环（例：选择公理 ↔ 良序定理 ↔
   佐恩引理 ↔ Hausdorff ↔ Tukey；紧 ↔ 全有界 ↔ 列紧 ↔ 完备），所以不能直接按 DAG
   算层号。做法是 Tarjan 缩点 → 在缩点图上算最长路径 → 每个点取它所在分量的层号：
   等价的那几个自然落在同一层。

   输出：层分布 / 几个关键定义在第几层 / 层 0 还剩什么 / 有几个定义完全没有前置。

   用法： bun tools/_layers.mjs
   ========================================================================== */
import fs from 'node:fs';
import vm from 'node:vm';

const SRC = 'H:/MathGalaxy/src';
function load() {
  const win = {
    MG: {}, console,
    document: { createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }), addEventListener() {}, getElementById: () => null },
    performance: { now: () => Date.now() }, requestAnimationFrame: () => 0, addEventListener() {},
  };
  win.window = win; win.self = win;
  const files = ['core/config.js', 'core/util.js', 'core/camera.js', 'core/graph.js', 'core/layout.js', 'data/regions.js', 'data/clusters.js'];
  for (const f of fs.readdirSync(SRC + '/data/packs').sort()) files.push('data/packs/' + f);
  const ctx = vm.createContext(win);
  for (const rel of files) vm.runInContext(fs.readFileSync(SRC + '/' + rel, 'utf8'), ctx, { filename: rel });
  return win.MG;
}
const MG = load();
const g = MG.buildGraph(MG.packs, MG.regions, MG.clusters);

/* 前置 → 依赖它的（⚠️ analogy 弱边不参与分层：它只是「思想相通」，不是逻辑依赖） */
const out = Object.create(null);
g.nodes.forEach(n => { out[n.id] = new Set(); });
g.edges.forEach(e => {
  if (e.kind === 'implication') e.sources.forEach(s => { if (out[s]) out[s].add(e.target); });
  else if (e.kind === 'definition') { if (out[e.definition]) out[e.definition].add(e.usedBy); }
  else if (e.kind === 'equivalence') { out[e.a] && out[e.a].add(e.b); out[e.b] && out[e.b].add(e.a); }
  /* analogy：跳过（用户 2026-09-22 提醒：弱边不参与某个节点在哪层） */
});

/* Tarjan 缩点 → 层 */
const idx = Object.create(null), low = Object.create(null), onStk = Object.create(null);
const stk = [], comps = [];
let cnt = 0;
for (const root of g.nodes.map(n => n.id)) {
  if (idx[root] != null) continue;
  const work = [[root, 0]];
  while (work.length) {
    const [v, pi] = work[work.length - 1];
    if (pi === 0) { idx[v] = low[v] = cnt++; stk.push(v); onStk[v] = true; }
    const ns = [...out[v]];
    let adv = false;
    for (let i = pi; i < ns.length; i++) {
      const w = ns[i];
      if (idx[w] == null) { work[work.length - 1][1] = i + 1; work.push([w, 0]); adv = true; break; }
      if (onStk[w]) low[v] = Math.min(low[v], idx[w]);
    }
    if (adv) continue;
    work[work.length - 1][1] = ns.length;
    if (low[v] === idx[v]) { const c = []; for (;;) { const w = stk.pop(); onStk[w] = false; c.push(w); if (w === v) break; } comps.push(c); }
    work.pop();
    if (work.length) { const p = work[work.length - 1][0]; low[p] = Math.min(low[p], low[v]); }
  }
}
const compOf = Object.create(null);
comps.forEach((c, i) => c.forEach(id => { compOf[id] = i; }));
const cadj = comps.map(() => new Set());
g.edges.forEach(e => {
  const pairs = e.kind === 'implication' ? e.sources.map(s => [s, e.target])
    : e.kind === 'definition' ? [[e.definition, e.usedBy]]
      : e.kind === 'equivalence' ? [[e.a, e.b]] : [];
  pairs.forEach(([a, b]) => { const x = compOf[a], y = compOf[b]; if (x != null && y != null && x !== y) cadj[x].add(y); });
});
const clevel = comps.map(() => 0);
for (let it = 0; it < 400; it++) {
  let ch = false;
  comps.forEach((_, i) => {
    let lv = 0;
    cadj.forEach((s, j) => { if (s.has(i) && clevel[j] + 1 > lv) lv = clevel[j] + 1; });
    if (lv > clevel[i]) { clevel[i] = lv; ch = true; }
  });
  if (!ch) break;
}
const level = Object.create(null);
g.nodes.forEach(n => { level[n.id] = clevel[compOf[n.id]]; });

const byLevel = {};
g.nodes.forEach(n => { (byLevel[level[n.id]] = byLevel[level[n.id]] || []).push(n); });
console.log('层分布（补依赖后，缩点口径）：');
Object.keys(byLevel).map(Number).sort((a, b) => a - b).forEach(k => {
  const list = byLevel[k];
  console.log('  层 ' + String(k).padStart(2) + '：' + String(list.length).padStart(3) + ' 个   ' +
    list.slice(0, 8).map(n => n.label).join('、') + (list.length > 8 ? ' …' : ''));
});

console.log('\n几个定义现在落在第几层：');
['def.subset', 'def.pair', 'def.rel', 'def.poset', 'def.metric-space', 'def.set-ring',
  'def.sigma-algebra', 'def.measure', 'def.measurable-function', 'def.lplus',
  'def.integral-nonneg', 'def.integrable', 'def.lp-norm', 'def.null-set',
  'def.signed-measure', 'def.rn-derivative', 'def.locally-integrable', 'def.bv-nbv',
  /* 数系那条链（每一层都必须比上一层高：这是「构造」的可见证据） */
  'thm.omega', 'thm.induction', 'def.quotient-set', 'def.int', 'def.field', 'def.ordered-field',
  'def.rat', 'def.abs', 'thm.triangle', 'def.cauchy-null', 'def.real', 'thm.real-ordered-field',
  'lem.archimedean', 'thm.real-unique', 'thm.real-uncountable', 'def.sup', 'def.interval',
  'def.vs', 'thm.vsbasis']
  .forEach(id => { const n = g.byId[id]; if (n) console.log('  ' + String(level[id]).padStart(2) + ' 层  ' + n.label); });

console.log('\n层 0 里还剩什么（应该只剩真正的地基）：');
(byLevel[0] || []).forEach(n => console.log('  [' + n.type + '] ' + n.label));

/* 顺便：定义依赖的「扇入/扇出」 */
console.log('\n每个定义有几个直接前置（补完后）：');
const pre = Object.create(null);
g.nodes.forEach(n => { pre[n.id] = new Set(); });
g.edges.forEach(e => {
  if (e.kind === 'definition') pre[e.usedBy] && pre[e.usedBy].add(e.definition);
  else if (e.kind === 'implication') e.sources.forEach(s => pre[e.target] && pre[e.target].add(s));
});
const defs = g.nodes.filter(n => n.type === 'definition').sort((a, b) => pre[b.id].size - pre[a.id].size);
console.log('  定义共 ' + defs.length + ' 个；仍旧没有任何前置的 ' + defs.filter(d => !pre[d.id].size).length + ' 个：' +
  defs.filter(d => !pre[d.id].size).map(d => d.label).join('、'));
