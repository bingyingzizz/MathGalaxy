/* ==========================================================================
   routecheck · 推出超边路由的几何与语义回归（Task 3）
   --------------------------------------------------------------------------
   用法：
     bun tools/routecheck.mjs                 # 真实图（读 dist/layout.json）+ 合成退化用例
     bun tools/routecheck.mjs --synthetic     # 只跑合成用例（不需要 dist）
     bun tools/routecheck.mjs --layout <文件> # 指定预计算文件
   只读：不写 dist、不改源码。退出码 = 失败项数（0 = 全过）。

   检查（对应 Task 3 §15.1 / §14）：
     真实图：路由签名与坐标一致；每条路由的前提集合/结论/起点终点与图一致；每个前提沿唯一链路
             到达结论；每个汇合点 J ∈ conv(S_J ∪ {T})；共享主干（fan 组）≥2 条边、几何一致、
             同色（黑/粉不混）、起点是每个成员的前提；图本身（节点/边数）未被路由改动。
     合成：  共线/近共线、重合/极近坐标、前提围住结论、大超边（40 前提）、同结论多条独立证明、
             多级分流 —— 不许出现非有限坐标、反向/零长线段、死循环（超时），且语义校验全过。
   ⚠️ 内部几何违规（bad，如两线贴得过近）与「语义违规」分开报告：前者是几何局限，后者必须为 0。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { loadMG } from './lib/loadmg.mjs';
import { validateRoutes, decodeRoutes } from './lib/routeplan.mjs';
import { planInitial } from './lib/routeinit.mjs';
import { RouteOptimizer } from './lib/routeopt.mjs';
import { NodeIndex, dist } from './lib/routegeom.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const onlySynthetic = args.includes('--synthetic');
const layoutFile = args.includes('--layout') ? args[args.indexOf('--layout') + 1] : path.join(ROOT, 'dist', 'layout.json');
let failures = 0;
const fail = (m) => { failures++; console.log('  ✗ ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

function contentVersion() {
  try { const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/ids.snapshot.json'), 'utf8')); return s && s.version ? s.version : ''; } catch { return ''; }
}

/* ------------------------------------------------------------------ 真实图 */
function realGraph() {
  console.log('真实图 · ' + path.relative(ROOT, layoutFile));
  if (!fs.existsSync(layoutFile)) { fail('找不到预计算布局文件（先 bun tools/build.mjs）'); return; }
  const data = JSON.parse(fs.readFileSync(layoutFile, 'utf8'));
  const MG = loadMG({ root: ROOT, contentVersion: contentVersion() });
  const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
  const nNodes = graph.nodes.length, nEdges = graph.edges.length;
  if (MG.layoutCache.signature(graph) !== data.sig) { fail('预计算布局签名与当前图不符（需要重建）'); return; }
  MG.applyPreLayout(graph, data);
  MG.computeLayers(graph);
  if (graph.nodes.length !== nNodes || graph.edges.length !== nEdges) fail('路由/布局改动了图的节点或边数');
  else ok('图规模未变：' + nNodes + ' 节点 / ' + nEdges + ' 边（路由只是几何，没有新增数学对象）');
  const rt = data.routes;
  if (!rt) { fail('layout.json 没有 routes'); return; }
  if (rt.sig !== MG.layoutCache.routeSignature(graph)) { fail('路由签名与当前坐标/配置不符'); return; }
  ok('路由签名与坐标一致（' + rt.sig + '）');
  const routes = decodeRoutes(MG, graph, rt);
  if (routes.size !== Object.keys(rt.e).length) fail('有 ' + (Object.keys(rt.e).length - routes.size) + ' 条路由解码失败（边不存在或数值非法）');
  const v = validateRoutes(graph, routes, { GU: MG.graphUtil });
  console.log('  · 路由 ' + v.stats.edges + ' 条 · 汇合点 ' + v.stats.junctions + ' · 共享主干组 ' + v.stats.groups + ' · 局部凸包违规 ' + v.stats.hullViolations);
  if (v.errors.length) { v.errors.slice(0, 15).forEach((m) => fail(m)); if (v.errors.length > 15) fail('… 另有 ' + (v.errors.length - 15) + ' 项'); }
  else ok('语义校验全过：前提完整、唯一链路可恢复、汇合点在局部凸包内、主干归属与同色');
  // 多前提强推出边是否都有路由（没有 = 回退旧画法，只许是被排除的类别）
  let multi = 0, missing = [];
  for (const e of graph.edges) {
    if (e.kind !== 'implication' || MG.graphUtil.strengthOf(e) !== 'strong' || e.sources.length < 2) continue;
    multi++; if (!routes.has(e.id)) missing.push(e.id);
  }
  if (missing.length) fail(multi + ' 条多前提强推出边中 ' + missing.length + ' 条没有路由：' + missing.slice(0, 5).join('、'));
  else ok('全部 ' + multi + ' 条多前提强推出边都有路由（含 10+ 前提的大超边，没有被悄悄略过）');
  // 回归夹具（只在存在时检查，不硬编码路由）
  for (const id of ['imp.algebra-categories-limits']) {
    const r = routes.get(id);
    if (!r) { console.log('  · 夹具 ' + id + '：当前图中没有路由（跳过）'); continue; }
    const inc = new Map(); r.forEach((s) => { const k = s.b[0] + ',' + s.b[1]; inc.set(k, (inc.get(k) || 0) + 1); });
    console.log('  · 夹具 ' + id + '：' + r.length + ' 段，汇合点 ' + [...inc.values()].filter((c) => c > 1).length + ' 个');
  }
}

/* ------------------------------------------------------------------ 合成退化 */
function lcg(seed) { let s = seed >>> 0; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }
function synth(name, nodeList, edgeList, opts = {}) {
  const t0 = Date.now();
  const N = new Map(), list = nodeList.map((n, i) => { const o = { id: n.id, p: [n.x, n.y], r: n.r || 6, i, region: n.region || 'R' }; N.set(n.id, o); return o; });
  const ctx = { N, list, nodeIdx: new NodeIndex(list), kRef: 0.837 };
  const init = new Map();
  for (const e of edgeList) {
    const T = N.get(e.target).p;
    if (e.sources.length === 1) { init.set(e.id, [{ a: N.get(e.sources[0]).p, b: T, source: e.sources[0], target: true, w: 1 }]); continue; }
    const P = e.sources.map((id) => N.get(id).p), skip = new Set([...e.sources, e.target]);
    const obs = list.filter((n) => !skip.has(n.id)).map((n) => ({ p: n.p, r: n.r }));
    const plan = planInitial(P, T, { radii: e.sources.map((id) => N.get(id).r), targetRadius: N.get(e.target).r, obstacles: obs });
    init.set(e.id, plan.segments.map((z) => ({ a: z.a, b: z.b, source: z.leaf === null ? null : e.sources[z.leaf], target: z.target, w: z.w })));
  }
  const opt = new RouteOptimizer(ctx, edgeList, init, [], {}).run();
  opt._dropLoneFans(); opt.rebuild();
  const routes = new Map(edgeList.map((e, i) => [e.id, opt.cur[i].segs]));
  const fake = { nodes: nodeList.map((n) => ({ id: n.id, x: n.x, y: n.y })), edges: edgeList.map((e) => ({ id: e.id, kind: 'implication', sources: e.sources, target: e.target })) };
  fake.byId = Object.fromEntries(fake.nodes.map((n) => [n.id, n]));
  const GU = { isDerived: (e) => !!(edgeList.find((x) => x.id === e.id) || {}).derived };
  const v = validateRoutes(fake, routes, { GU });
  const ms = Date.now() - t0;
  let bad = 0; const issues = [];
  for (const [id, segs] of routes) for (const s of segs) {
    if (![...s.a, ...s.b].every(Number.isFinite)) issues.push(id + '：非有限坐标');
    else if (dist(s.a, s.b) < 1e-9) issues.push(id + '：零长线段');
  }
  opt.cur.forEach((m) => { bad += m.bad; });
  if (ms > 15000) issues.push('耗时 ' + ms + ' ms（疑似死循环/组合爆炸）');
  const errs = [...issues, ...v.errors];
  if (opts.extra) errs.push(...opts.extra(routes, opt));
  if (errs.length) { fail(name + '：' + errs.slice(0, 4).join('；')); }
  else ok(name + '（' + ms + ' ms · 内部几何违规 ' + bad + '（几何局限，非语义）· 汇合点 ' + v.stats.junctions + ' · 共享组 ' + v.stats.groups + '）');
}

function syntheticCases() {
  console.log('合成退化用例');
  const mk = (id, x, y, r = 6) => ({ id, x, y, r });
  const T = mk('T', 0, 0);
  // 1 共线 / 近共线
  synth('共线前提', [T, ...[1, 2, 3, 4].map((i) => mk('c' + i, 300 + i * 70, 0))], [{ id: 'e', sources: ['c1', 'c2', 'c3', 'c4'], target: 'T', derived: false }]);
  synth('近共线前提', [T, ...[1, 2, 3, 4].map((i) => mk('n' + i, 300 + i * 70, i * 0.01))], [{ id: 'e', sources: ['n1', 'n2', 'n3', 'n4'], target: 'T', derived: false }]);
  // 2 重合 / 极近
  synth('极近前提（0.001）', [T, mk('a', 400, 100), mk('b', 400.001, 100), mk('c', 400, 100.001)], [{ id: 'e', sources: ['a', 'b', 'c'], target: 'T', derived: false }]);
  synth('前提与结论极近', [T, mk('a', 14, 0), mk('b', 300, 200), mk('c', 320, -150)], [{ id: 'e', sources: ['a', 'b', 'c'], target: 'T', derived: false }]);
  // 3 围住结论
  const ring = []; for (let i = 0; i < 8; i++) ring.push(mk('r' + i, 220 * Math.cos(i * Math.PI / 4), 220 * Math.sin(i * Math.PI / 4)));
  synth('前提围住结论', [T, ...ring], [{ id: 'e', sources: ring.map((n) => n.id), target: 'T', derived: false }]);
  // 4 大超边
  const rnd = lcg(7), big = []; for (let i = 0; i < 40; i++) big.push(mk('b' + i, 900 + rnd() * 500, rnd() * 600 - 300));
  synth('大超边（40 个前提，远目标）', [T, ...big], [{ id: 'e', sources: big.map((n) => n.id), target: 'T', derived: false }]);
  // 5 同结论多条独立证明：不得合并成一条合取，也不得共享不属于同一前提的主干
  const pa = ['p1', 'p2', 'p3'].map((id, i) => mk(id, 600, 100 * i - 100)), pb = ['q1', 'q2'].map((id, i) => mk(id, 620, 100 * i + 300));
  synth('同结论多条独立证明', [T, ...pa, ...pb], [
    { id: 'proofA', sources: pa.map((n) => n.id), target: 'T', derived: false },
    { id: 'proofB', sources: pb.map((n) => n.id), target: 'T', derived: false },
    { id: 'proofC', sources: ['p1', 'q1'], target: 'T', derived: true }
  ], { extra: (routes) => {
    const out = [];
    for (const [id, segs] of routes) {
      const srcs = new Set(segs.filter((s) => s.source || s.fanSource).map((s) => s.source || s.fanSource));
      const want = { proofA: ['p1', 'p2', 'p3'], proofB: ['q1', 'q2'], proofC: ['p1', 'q1'] }[id];
      if (srcs.size !== want.length || want.some((x) => !srcs.has(x))) out.push(id + ' 的前提集合被改动');
    }
    return out;
  } });
  // 6 多级分流：一个共同前提 A，指向两簇远处的多个结论
  const A = mk('A', 0, 0), tg = [], ed = [], other = [];
  for (let i = 0; i < 6; i++) { tg.push(mk('t' + i, 1200 + (i % 3) * 60, -200 + i * 80)); other.push(mk('o' + i, 800 + i * 40, 900 + i * 15)); }
  tg.forEach((t, i) => ed.push({ id: 'f' + i, sources: ['A', 'o' + i], target: t.id, derived: false }));
  synth('多级分流（共同前提 → 6 个远结论）', [A, ...tg, ...other], ed);
}

if (!onlySynthetic) realGraph();
syntheticCases();
console.log(failures ? '\n✗ routecheck 失败 ' + failures + ' 项' : '\n✓ routecheck 全部通过');
process.exit(failures);
