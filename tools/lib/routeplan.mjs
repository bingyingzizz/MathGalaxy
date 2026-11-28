/* ==========================================================================
   路由规划驱动（Task 3）：图 → 初始合流树 → 联合优化 → 紧凑产物 → 校验
   --------------------------------------------------------------------------
   · 只处理「强推出边」（黑 + 粉）；定义/等价/类比的算法与呈现一律不动。
     等价边与有「平行边让位」弓形的单前提边只作为干涉背景（弦近似）。
   · 汇合点/折点/分流点都只是几何：不进数学图、不影响层号。
   · 产物是**世界坐标**的紧凑数组，随布局预计算一起写进 layout.json；
     签名含：布局签名 + 全部节点坐标哈希 + 路由版本与参数。任何一项变 ⇒ 运行时整包作废，
     回退到旧的单汇合点画法（绝不画过期几何）。
   ========================================================================== */
import { dist, psdist, mean, NodeIndex, stats } from './routegeom.mjs';
import { planInitial } from './routeinit.mjs';
import { RouteOptimizer, DEFAULT_PARAMS } from './routeopt.mjs';

export function routeParams(MG, extra = {}) {
  /* 唯一来源：MG.config.route（整个对象进路由签名） */
  return { ...DEFAULT_PARAMS, ...(MG.config.route || {}), ...extra };
}

export function buildContext(MG, graph, prm) {
  const N = new Map(); const list = [];
  graph.nodes.forEach((n, i) => {
    const o = { id: n.id, p: [n.x, n.y], r: MG.nodeSize.worldRadius(n, graph), i, region: (n.clusterObj && n.clusterObj.parent) || (n.regions && n.regions[0]) || '' };
    N.set(n.id, o); list.push(o);
  });
  return { N, list, nodeIdx: new NodeIndex(list), kRef: prm.refK };
}

/** 参与路由的边分类 */
export function classifyEdges(MG, graph) {
  const GU = MG.graphUtil;
  const pairCount = new Map();
  const pairKey = (e) => {
    if (e.kind === 'implication') return e.sources && e.sources.length === 1 ? [e.sources[0], e.target] : null;
    if (e.kind === 'equivalence' || e.kind === 'analogy') return [e.a, e.b];
    return null;
  };
  for (const e of graph.edges) { const pr = pairKey(e); if (!pr) continue; const k = pr[0] < pr[1] ? pr[0] + '|' + pr[1] : pr[1] + '|' + pr[0]; pairCount.set(k, (pairCount.get(k) || 0) + 1); }
  const routed = [], fixedPairs = [];
  for (const e of graph.edges) {
    const strong = GU.strengthOf(e) === 'strong';
    if (e.kind === 'implication' && strong) {
      const derived = !!GU.isDerived(e);
      if (e.sources.length > 1) { routed.push({ e, id: e.id, sources: [...new Set(e.sources)], target: e.target, derived, multi: true }); continue; }
      const pr = pairKey(e), k = pr[0] < pr[1] ? pr[0] + '|' + pr[1] : pr[1] + '|' + pr[0];
      if (pairCount.get(k) === 1) routed.push({ e, id: e.id, sources: [e.sources[0]], target: e.target, derived, multi: false });
      else fixedPairs.push(pr);
    } else if (e.kind === 'equivalence' && strong) fixedPairs.push([e.a, e.b]);
  }
  return { routed, fixedPairs };
}

/** 完整规划。返回 { routes: Map(id→segs), groups, optimizer, ... } */
export function planRoutes(MG, graph, params = {}) {
  const prm = routeParams(MG, params), ctx = buildContext(MG, graph, prm);
  const { routed, fixedPairs } = classifyEdges(MG, graph);
  const fixed = fixedPairs.map(([a, b]) => [ctx.N.get(a).p, ctx.N.get(b).p]);
  const init = new Map();
  for (const r of routed) {
    const T = ctx.N.get(r.target).p;
    if (!r.multi) { init.set(r.id, [{ a: ctx.N.get(r.sources[0]).p, b: T, source: r.sources[0], target: true, w: 1 }]); continue; }
    const P = r.sources.map((id) => ctx.N.get(id).p);
    const lo = [Math.min(T[0], ...P.map((p) => p[0])) - 20, Math.min(T[1], ...P.map((p) => p[1])) - 20];
    const hi = [Math.max(T[0], ...P.map((p) => p[0])) + 20, Math.max(T[1], ...P.map((p) => p[1])) + 20];
    const skip = new Set([...r.sources, r.target]), obs = [];
    for (const n of ctx.list) { if (skip.has(n.id) || n.p[0] < lo[0] || n.p[0] > hi[0] || n.p[1] < lo[1] || n.p[1] > hi[1]) continue; obs.push({ p: n.p, r: n.r }); }
    const plan = planInitial(P, T, { radii: r.sources.map((id) => ctx.N.get(id).r), targetRadius: ctx.N.get(r.target).r, obstacles: obs });
    init.set(r.id, plan.segments.map((z) => ({ a: z.a, b: z.b, source: z.leaf === null ? null : r.sources[z.leaf], target: z.target, w: z.w })));
  }
  const edges = routed.map((r) => ({ id: r.id, sources: r.sources, target: r.target, derived: r.derived }));
  const opt = new RouteOptimizer(ctx, edges, init, fixed, prm).run();
  opt._dropLoneFans(); opt.rebuild();
  const routes = new Map();
  edges.forEach((e, i) => { if (e.sources.length > 1 || opt.cur[i] !== opt.original[i]) routes.set(e.id, opt.cur[i].segs); });
  return { routes, optimizer: opt, ctx, edges, params: prm, fixedCount: fixed.length };
}

/* ------------------------------------------------------------------ 编码 / 解码 */
const FLAG_TARGET = 1, FLAG_BEND = 2, FLAG_HOT1 = 4, FLAG_HOT2 = 8;
const r2 = (v) => Math.round(v * 100) / 100;
/**
 * 紧凑编码：
 *   { ids:[...fanTags], f:[[tag,fanSourceIdx]...], e:{ edgeId:[[ax,ay,bx,by,w,flags,srcIdx,fanIdx],...] } }
 * srcIdx = 节点下标（-1 无）；source 段的 a 与 target 段的 b **不存坐标**（解码时取节点坐标，保证逐位等于节点）。
 */
export function encodeRoutes(graph, routes) {
  const idx = new Map(graph.nodes.map((n, i) => [n.id, i])), fanTable = [], fanIdx = new Map(), e = {};
  for (const [id, segs] of routes) {
    e[id] = segs.map((s) => {
      let fi = -1;
      if (s.fan) {
        if (!fanIdx.has(s.fan)) { fanIdx.set(s.fan, fanTable.length); fanTable.push([s.fan, idx.has(s.source || s.fanSource) ? idx.get(s.source || s.fanSource) : -1]); }
        fi = fanIdx.get(s.fan);
      }
      const fl = (s.target ? FLAG_TARGET : 0) | (s.bendEnd ? FLAG_BEND : 0) | (s.hotPart === 1 ? FLAG_HOT1 : 0) | (s.hotPart === 2 ? FLAG_HOT2 : 0);
      const A = s.source ? null : [r2(s.a[0]), r2(s.a[1])], B = s.target ? null : [r2(s.b[0]), r2(s.b[1])];
      return [A ? A[0] : null, A ? A[1] : null, B ? B[0] : null, B ? B[1] : null, s.w, fl, s.source ? idx.get(s.source) : -1, fi, s.fanSource && !s.fan ? idx.get(s.fanSource) : -1];
    });
  }
  return { f: fanTable, e };
}
/** 解码：唯一实现在 src/core/layoutcache.js（MG.layoutCache.decodeRoutes）；这里只转成 Map。 */
export function decodeRoutes(MG, graph, enc) {
  const o = MG.layoutCache.decodeRoutes(graph, enc);
  return new Map(Object.keys(o).map((k) => [k, o[k]]));
}

/* ------------------------------------------------------------------ 校验 */
function hull(points) {
  const P = points.map((p) => [p[0], p[1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const p of P) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
/** 点是否在点集凸包内（容差 tol；退化为线段/点时按到线段距离） */
export function inHull(q, points, tol) {
  const H = hull(points);
  if (H.length < 3) {
    if (H.length === 0) return false;
    if (H.length === 1) return dist(q, H[0]) <= tol;
    return psdist(q, H[0], H[1]) <= tol;
  }
  for (let i = 0; i < H.length; i++) {
    const a = H[i], b = H[(i + 1) % H.length], L = dist(a, b) || 1;
    if (((b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0])) / L < -tol) return false;
  }
  return true;
}
const kk = (p) => p[0] + ',' + p[1];

/**
 * 校验全部路由（Task 3 §15.1）。返回 { errors:[], stats:{} }。
 *   · 坐标有限；前提集合与图一致；source 段从该节点出发、target 段落在结论上；
 *   · 每个前提沿唯一链路到达结论（无环、无分叉丢失）；
 *   · 每个汇合点 J ∈ conv(S_J ∪ {T})（S_J = 该子树代表的原始前提）；
 *   · fan 组：≥2 条边、几何逐位相同、同色、起点（source/fanSource）相同且是每条成员边的前提；
 *   · 共享段必须带完整成员（由 fan 组本身给出）。
 */
export function validateRoutes(graph, routes, opts = {}) {
  const tol = opts.hullTol == null ? 0.05 : opts.hullTol, errors = [], st = { edges: 0, junctions: 0, groups: 0, hullViolations: 0 };
  const GU = opts.GU;
  const byId = graph.byId, groups = new Map();
  const edgeOf = new Map(graph.edges.filter((e) => e.kind === 'implication').map((e) => [e.id, e]));
  for (const [id, segs] of routes) {
    st.edges++;
    const e = edgeOf.get(id); if (!e) { errors.push(id + '：路由对应的边不存在'); continue; }
    const T = byId[e.target]; if (!T) { errors.push(id + '：结论节点不存在'); continue; }
    const Tp = [T.x, T.y], srcSet = new Set(e.sources);
    const out = new Map(), inc = new Map(), seenSrc = new Set();
    for (const s of segs) {
      if (![...s.a, ...s.b].every(Number.isFinite)) errors.push(id + '：非有限坐标');
      if (dist(s.a, s.b) < 1e-6) errors.push(id + '：零长线段');
      if (s.source) {
        const n = byId[s.source];
        if (!srcSet.has(s.source)) errors.push(id + '：起点 ' + s.source + ' 不是该边的前提');
        else if (!n || n.x !== s.a[0] || n.y !== s.a[1]) errors.push(id + '：source 段不从节点坐标出发');
        seenSrc.add(s.source);
      }
      if (s.target && (s.b[0] !== Tp[0] || s.b[1] !== Tp[1])) errors.push(id + '：target 段没落在结论上');
      const ka = kk(s.a); if (!out.has(ka)) out.set(ka, []); out.get(ka).push(s);
      const kb = kk(s.b); if (!inc.has(kb)) inc.set(kb, []); inc.get(kb).push(s);
      if (s.fan) { if (!groups.has(s.fan)) groups.set(s.fan, []); groups.get(s.fan).push([id, s]); }
    }
    if (seenSrc.size !== srcSet.size || [...srcSet].some((x) => !seenSrc.has(x))) errors.push(id + '：前提集合与路由起点不一致');
    // 可恢复性：每个前提沿唯一链走到结论
    for (const src of srcSet) {
      const sn = byId[src]; let p = [sn.x, sn.y], guard = 0; const seen = new Set();
      while (kk(p) !== kk(Tp)) {
        const nx = out.get(kk(p));
        if (!nx || nx.length !== 1 || seen.has(kk(p)) || ++guard > 200) { errors.push(id + '：前提 ' + src + ' 无法唯一到达结论'); break; }
        seen.add(kk(p)); p = nx[0].b;
      }
    }
    // 汇合点局部凸包
    const leavesAt = (pk, depth = 0) => {
      if (depth > 64) return [];
      return (inc.get(pk) || []).flatMap((s) => s.source ? [s.source] : leavesAt(kk(s.a), depth + 1));
    };
    for (const [pk, ins] of inc) {
      if (pk === kk(Tp)) continue;
      if (ins.length < 2) continue;
      st.junctions++;
      const S = [...new Set(leavesAt(pk))].map((x) => [byId[x].x, byId[x].y]);
      const J = pk.split(',').map(Number);
      if (!inHull(J, [...S, Tp], tol)) { errors.push(id + '：汇合点 ' + pk + ' 不在 conv(S_J ∪ {T}) 内'); st.hullViolations++; }
    }
  }
  for (const [tag, list] of groups) {
    st.groups++;
    const ids = new Set(list.map(([id]) => id));
    if (ids.size < 2) errors.push('分流组 ' + tag + '：成员少于 2 条边');
    if (new Set(list.map(([, s]) => kk(s.a) + '>' + kk(s.b))).size !== 1) errors.push('分流组 ' + tag + '：成员几何不一致');
    const colors = new Set([...ids].map((id) => GU ? !!GU.isDerived(edgeOf.get(id)) : false));
    if (colors.size !== 1) errors.push('分流组 ' + tag + '：黑/粉混在同一主干');
    const roots = new Set(list.map(([, s]) => s.source || s.fanSource));
    if (roots.size !== 1) errors.push('分流组 ' + tag + '：起点（source/fanSource）不唯一');
    else { const root = [...roots][0]; for (const id of ids) if (!edgeOf.get(id).sources.includes(root)) errors.push('分流组 ' + tag + '：' + id + ' 不以 ' + root + ' 为前提'); }
  }
  return { errors, stats: st };
}
export { stats as routeStats, mean as routeMean };
