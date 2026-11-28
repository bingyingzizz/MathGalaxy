/* ==========================================================================
   路由 · 阶段 0：每条多前提推出边的初始自适应合流树（Task 3）
   --------------------------------------------------------------------------
   移植自原型 V2 规划器（prototype/edge-routing-prototype-v2.html 的 planner）。
   思路：对前提点做**紧致层级聚类**（complete linkage），在每个聚类节点上生成
   有限个汇合点候选（质心、几何中位数、到结论的凸组合……），自底向上保留
   每个子树最优的 2 个方案；最后与「全直连」「单汇合点」一起按
       违规数 → F=L+λD+μR (+汇合点罚) → 汇合点数
   的字典序选最好。汇合点必须满足局部凸包条件：J ∈ conv(S_J ∪ {T})
   （候选只在 S_J 的质心/成员/到 T 的凸组合里取，远源组还被限制在其质心半径内）。
   与原型的差别：不再限制 n≤8 才做层级（大超边也走层级，复杂度由「每节点只留 2 个」控制）。
   ========================================================================== */
import { dist, mix, mean, psdist, conflict } from './routegeom.mjs';

const radialR = (a, b, t) => {
  const x = b[0] - a[0], y = b[1] - a[1], q = x * x + y * y;
  const u = q ? Math.max(0, Math.min(1, ((t[0] - a[0]) * x + (t[1] - a[1]) * y) / q)) : 0;
  return Math.max(0, dist(b, t) - dist(mix(a, b, u), t));
};

/**
 * P: 前提坐标数组；T: 结论坐标；opt: {radii, targetRadius, obstacles:[{p,r}], params}
 * 返回 {tree: roots, segments:[{a,b,leaf,target,w}], violations, hits}
 */
export function planInitial(P, T, opt = {}) {
  const prm = Object.assign({ lambda: 1, mu: 2, alpha: 1, clearance: 9, junctionGap: 11, minBranch: 12, junctionCost: 9, farRatio: 4, maxSolve: 40 }, opt.params || {});
  const { lambda, mu, alpha, junctionGap, minBranch, junctionCost } = prm;
  const radii = opt.radii || [], targetRadius = opt.targetRadius == null ? 6 : opt.targetRadius, obstacles = opt.obstacles || [];
  const n = P.length;
  const base = P.reduce((s, p) => s + dist(p, T), 0);
  const eps = 1e-8 * Math.max(1, base / n), tol = 1e-9 * Math.max(1, base);
  const target = { p: T, ids: [], kids: [], target: true };
  const leaf = (i) => ({ p: P[i], ids: [i], kids: [], leaf: i, protected: false });
  const memo = new Map();
  const rad = (k) => radii[k] || 6;

  function metrics(roots) {
    const hit = memo.get(roots); if (hit) return hit;
    let L = 0, D = 0, R = 0, j = 0;
    const segments = [], junctions = [];
    const walk = (a, b) => {
      const l = dist(a.p, b.p);
      L += l; D += a.ids.length * l / n; R += a.ids.length * radialR(a.p, b.p, T) / n;
      segments.push({ a: a.p, b: b.p, u: a, v: b, w: a.ids.length, ids: a.ids });
      if (a.kids.length) { j++; junctions.push(a); for (const k of a.kids) walk(k, a); }
    };
    for (const a of roots) walk(a, target);
    let subsetBase = 0;
    for (const k of roots) for (const i of k.ids) subsetBase += dist(P[i], T);
    D = Math.max(0, D - subsetBase / n);
    const F = L + lambda * D + mu * R;
    let violations = 0;
    for (let i = 0; i < segments.length; i++) {
      const e = segments[i], l = dist(e.a, e.b);
      if (l < minBranch + (e.u.leaf !== undefined ? 6 : 0) + (e.v.target ? 4 : 0)) violations++;
      for (let k = 0; k < n; k++) if (e.u.leaf !== k && psdist(P[k], e.a, e.b) < rad(k) + 3) violations++;
      if (!e.v.target && psdist(T, e.a, e.b) < targetRadius + 3) violations++;
      for (const q of junctions) if (q !== e.u && q !== e.v && psdist(q.p, e.a, e.b) < junctionGap * 0.6) violations++;
      for (let k = 0; k < i; k++) {
        const f = segments[k];
        let shared = null, o1, o2;
        for (const x of [e.u, e.v]) if (x === f.u || x === f.v) { shared = x; o1 = x === e.u ? e.v : e.u; o2 = x === f.u ? f.v : f.u; break; }
        if (shared) {
          const a = o1.p, b = o2.p, c = shared.p, da = dist(a, c), db = dist(b, c);
          if (da < eps || db < eps) { violations++; continue; }
          const cos = ((a[0] - c[0]) * (b[0] - c[0]) + (a[1] - c[1]) * (b[1] - c[1])) / (da * db);
          if (cos > Math.cos(10 * Math.PI / 180)) violations++;
        } else if (conflict(e.a, e.b, f.a, f.b)) violations++;
      }
    }
    for (const q of junctions) {
      if (P.some((p, i) => dist(q.p, p) < rad(i) + 5) || dist(q.p, T) < targetRadius + 5) violations++;
    }
    for (let i = 0; i < junctions.length; i++) for (let k = 0; k < i; k++) if (dist(junctions[i].p, junctions[k].p) < junctionGap) violations++;
    const m = { L, D, R, j, F, score: F + junctionCost * j, segments, violations };
    memo.set(roots, m); return m;
  }
  const compare = (a, b) => {
    const x = metrics(a), y = metrics(b);
    return (x.violations - y.violations) || (Math.abs(x.score - y.score) > tol ? x.score - y.score : x.j - y.j);
  };
  const scale = (ids) => {
    const ps = ids.map((i) => P[i]), c = mean(ps), r = Math.max(...ps.map((p) => dist(c, p))), d = dist(c, T);
    return { c, r, d, far: d >= prm.farRatio * Math.max(r, eps) };
  };
  function merge(kids, ids) {
    if (kids.length < 2) return [];
    const { c, r, d, far } = scale(ids), a = kids.map((k) => k.p), w = kids.map((k) => k.ids.length);
    const C = mean(a, w), pts = [C, c, mean(a)], W = w.reduce((s, x) => s + x, 0);
    const ws = w.map((x) => 1 + lambda * x / n).concat(1 + lambda * W / n), v = a.concat([T]);
    let q = mean(v, ws);
    for (let z = 0; z < 16; z++) { const ww = v.map((p, i) => ws[i] / Math.max(eps, dist(p, q))); q = mean(v, ww); }
    pts.push(q);
    for (const f of [0.1, 0.25, 0.5, 0.75, 1, 1.5]) pts.push(mix(c, T, d ? Math.min(1, f * r / d) : 0));
    for (const f of [0.1, 0.25, 0.5, 0.75]) pts.push(mix(C, T, f));
    for (const p of ids.map((i) => P[i])) for (const f of [0.35, 0.7]) { const x = mix(c, p, f); pts.push(x); for (const t of [0.12, 0.4]) pts.push(mix(x, T, t)); }
    for (const p of a) for (const f of [0.2, 0.5, 0.8]) pts.push(mix(p, T, f));
    const seen = new Set(), cands = [];
    for (let p of pts) {
      if (far && dist(c, p) > alpha * r) p = mix(c, p, alpha * r / dist(c, p));     // 远源组：汇合点留在源侧
      const key = p[0].toFixed(4) + ',' + p[1].toFixed(4);
      if (seen.has(key)) continue; seen.add(key);
      if (dist(p, T) < targetRadius + 5 || P.some((s, i) => dist(s, p) < rad(i) + 5) || kids.some((k) => dist(k.p, p) < minBranch)) continue;
      cands.push([{ p, ids, kids, protected: far }]);
    }
    cands.sort(compare);
    return cands.slice(0, 3);
  }
  // 紧致层级聚类（complete linkage），确定性：并列时取下标小者
  let clusters = P.map((p, i) => ({ ids: [i], kids: [] }));
  const pd = (a, b) => { let m = 0; for (const i of a.ids) for (const j of b.ids) m = Math.max(m, dist(P[i], P[j])); return m; };
  while (clusters.length > 1) {
    let x = 0, y = 1, b = Infinity;
    for (let i = 0; i < clusters.length; i++) for (let j = i + 1; j < clusters.length; j++) { const d = pd(clusters[i], clusters[j]); if (d < b) { b = d; x = i; y = j; } }
    const a = clusters[x], c = clusters[y], k = { ids: a.ids.concat(c.ids).sort((i, j) => i - j), kids: [a, c] };
    clusters = clusters.filter((_, i) => i !== x && i !== y); clusters.push(k);
  }
  const direct = P.map((_, i) => leaf(i));
  const sigOf = (k) => k.kids.length ? k.p.map((x) => x.toFixed(3)).join(',') + '(' + k.kids.map(sigOf).join(';') + ')' : 'P' + k.leaf;
  function solve(g) {
    if (!g.kids.length) return [[direct[g.ids[0]]]];
    const left = solve(g.kids[0]), right = solve(g.kids[1]), plain = g.ids.map((i) => direct[i]), cands = [plain];
    const parent = scale(g.ids);
    for (const l of left) for (const r of right) {
      const roots = l.concat(r); cands.push(roots);
      const open = (k) => {
        const child = scale(k.ids);
        return k.kids.length && (!k.protected || (parent.far && parent.r <= 3 * child.r)) ? k.kids.flatMap(open) : [k];
      };
      const expanded = roots.flatMap(open);
      for (const kids of [roots, expanded]) cands.push(...merge(kids, g.ids));
    }
    cands.push(...merge(plain, g.ids));
    cands.sort(compare);
    const unique = [], seen = new Set();
    for (const roots of cands) {
      const key = roots.map(sigOf).join('|');
      if (!seen.has(key)) { seen.add(key); unique.push(roots); }
      if (unique.length === 2) break;
    }
    return unique;
  }
  const singles = merge(direct, direct.flatMap((x) => x.ids));
  const options = [direct, ...singles, ...(n <= prm.maxSolve ? solve(clusters[0]) : [])];
  function otherHits(roots) {
    const m = metrics(roots); let hits = 0;
    for (const e of m.segments) {
      const l = Math.min(e.a[0], e.b[0]) - 18, r = Math.max(e.a[0], e.b[0]) + 18, b = Math.min(e.a[1], e.b[1]) - 18, t = Math.max(e.a[1], e.b[1]) + 18;
      for (const o of obstacles) {
        if (o.p[0] < l || o.p[0] > r || o.p[1] < b || o.p[1] > t) continue;
        if (psdist(o.p, e.a, e.b) < o.r + 2) hits++;
      }
    }
    return hits;
  }
  const ranked = options.map((roots) => ({ roots, m: metrics(roots), hits: otherHits(roots) }));
  ranked.sort((a, b) => (a.m.violations - b.m.violations) || ((a.m.score + 12 * a.hits) - (b.m.score + 12 * b.hits)) || (a.m.j - b.m.j));
  const best = ranked[0];
  return {
    segments: best.m.segments.map((z) => ({ a: z.a, b: z.b, leaf: z.u.leaf === undefined ? null : z.u.leaf, target: !!z.v.target, w: z.w })),
    violations: best.m.violations, hits: best.hits, junctions: best.m.j
  };
}
