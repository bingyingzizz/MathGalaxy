/* ==========================================================================
   路由几何原语（Task 3）· 纯函数，无依赖
   --------------------------------------------------------------------------
   移植自批准的原型求解器（joint_opt.py 的度量部分），改成 JS 与空间索引。
   所有量都在**世界坐标**里；节点净空与箭头缝隙取自「参考缩放 refK 下的屏幕像素」
   （箭头/线宽是屏幕量，参考缩放只用来把它们折成世界单位，是工程旋钮）。

   一条边的路由 = 线段列表 segs，每段：
     { a:[x,y], b:[x,y], source:id|null, target:bool, w:int,
       fan?:组tag, bendEnd?:true(普通折点，非汇合/分流), fanSource?:id }
   · source 非空 = 该段从原始前提节点出发；target = 该段落在结论节点上；
   · w = 该段承载的原始前提个数；
   · 汇合点 = 非 target、非 bendEnd 的线段终点；
   · 共享主干 = 多条边里 fan 相同的同一线段（只画一次，归属全部成员）。
   ⚠️ 汇合点/折点**不是**数学节点：不进图、不影响层号、没有名字。
   ========================================================================== */

export const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export const mix = (a, b, t) => [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
export const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
export function mean(ps, ws) {
  let x = 0, y = 0, w = 0;
  for (let i = 0; i < ps.length; i++) { const k = ws ? ws[i] : 1; x += ps[i][0] * k; y += ps[i][1] * k; w += k; }
  return [x / w, y / w];
}
/** 点 p 到线段 ab 的距离 */
export function psdist(p, a, b) {
  const x = b[0] - a[0], y = b[1] - a[1], q = x * x + y * y;
  const t = q > 1e-12 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * x + (p[1] - a[1]) * y) / q)) : 0;
  return Math.hypot(p[0] - a[0] - t * x, p[1] - a[1] - t * y);
}
/** 点到线段上的投影参数 u∈[0,1]；R（回头路）项用 */
const radial = (a, b, t) => {
  const x = b[0] - a[0], y = b[1] - a[1], q = x * x + y * y;
  const u = q ? Math.max(0, Math.min(1, ((t[0] - a[0]) * x + (t[1] - a[1]) * y) / q)) : 0;
  return Math.max(0, dist(b, t) - dist(mix(a, b, u), t));
};

/** 两个线段严格相交，或任一端点落在另一线段上（<eps） */
export function conflict(a, b, c, d, eps = 1e-7, touch = eps) {
  const x = cross(a, b, c), y = cross(a, b, d), z = cross(c, d, a), w = cross(c, d, b);
  if (((x > eps && y < -eps) || (x < -eps && y > eps)) && ((z > eps && w < -eps) || (z < -eps && w > eps))) return true;
  return Math.min(psdist(a, c, d), psdist(b, c, d), psdist(c, a, b), psdist(d, a, b)) < touch;
}
/** 严格真交叉（不含端点贴合） */
export function properCross(a, b, c, d, eps = 1e-7) {
  const x = cross(a, b, c), y = cross(a, b, d), z = cross(c, d, a), w = cross(c, d, b);
  return ((x > eps && y < -eps) || (x < -eps && y > eps)) && ((z > eps && w < -eps) || (z < -eps && w > eps));
}

/** 近似平行的「共线重叠」代价（单向）：A 段上的投影长度 × 近邻度 × 方向接近度 */
function overlapDir(A, B, near) {
  const [a, b] = A, [c, d] = B;
  const vx = b[0] - a[0], vy = b[1] - a[1], lv = Math.hypot(vx, vy);
  const wx = d[0] - c[0], wy = d[1] - c[1], lw = Math.hypot(wx, wy);
  if (lv < 1e-10 || lw < 1e-10) return 0;
  const ux = vx / lv, uy = vy / lv, qx = wx / lw, qy = wy / lw;
  const co = Math.abs(ux * qx + uy * qy);
  if (co <= 0.85) return 0;
  const p0 = (c[0] - a[0]) * ux + (c[1] - a[1]) * uy, p1 = (d[0] - a[0]) * ux + (d[1] - a[1]) * uy;
  const lo = Math.max(0, Math.min(p0, p1)), hi = Math.min(lv, Math.max(p0, p1)), span = Math.max(0, hi - lo);
  if (span <= 0) return 0;
  let nr = 0;
  for (const f of [0.15, 0.5, 0.85]) {
    const p = [a[0] + ux * (lo + f * span), a[1] + uy * (lo + f * span)];
    nr += Math.max(0, 1 - psdist(p, c, d) / near) / 3;
  }
  return span * nr * (co - 0.85) / 0.15;
}
const NEAR = 14;
/** 两个线段的（对称）近平行重叠代价 + A→B 方向的真交叉计数 */
export function segPair(A, B) {
  const o = (overlapDir(A, B, NEAR) + overlapDir(B, A, NEAR)) / 2;
  return [o, properCross(A[0], A[1], B[0], B[1]) ? 1 : 0];
}
const boxOverlap = (A, B, m) =>
  Math.min(A[0][0], A[1][0]) - m <= Math.max(B[0][0], B[1][0]) && Math.max(A[0][0], A[1][0]) + m >= Math.min(B[0][0], B[1][0]) &&
  Math.min(A[0][1], A[1][1]) - m <= Math.max(B[0][1], B[1][1]) && Math.max(A[0][1], A[1][1]) + m >= Math.min(B[0][1], B[1][1]);
/** 线段集合 A 对 B 的 [重叠代价总和, 真交叉数]（bbox 预筛：距离 >NEAR 的对贡献为 0） */
export function pairCost(A, B) {
  let o = 0, c = 0;
  for (let i = 0; i < A.length; i++) for (let k = 0; k < B.length; k++) {
    if (!boxOverlap(A[i], B[k], NEAR)) continue;
    const r = segPair(A[i], B[k]); o += r[0]; c += r[1];
  }
  return [o, c];
}
/** 一组线段内部两两的代价（与原型 cost() 的内部项一致：j 对 z[:j]） */
export function selfCost(z) {
  let o = 0, c = 0;
  for (let j = 1; j < z.length; j++) { const r = pairCost([z[j]], z.slice(0, j)); o += r[0]; c += r[1]; }
  return [o, c];
}

/* ------------------------------------------------------------------ 空间索引 */
/** 均匀格子索引：key → {z:[a,b], owners:Set}；支持增删与按 bbox 查询。 */
export class SegIndex {
  constructor(cell = 120) { this.cell = cell; this.map = new Map(); this.grid = new Map(); }
  _cells(z, m) {
    const c = this.cell, x0 = Math.floor((Math.min(z[0][0], z[1][0]) - m) / c), x1 = Math.floor((Math.max(z[0][0], z[1][0]) + m) / c);
    const y0 = Math.floor((Math.min(z[0][1], z[1][1]) - m) / c), y1 = Math.floor((Math.max(z[0][1], z[1][1]) + m) / c);
    const out = [];
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) out.push(x * 100003 + y);
    return out;
  }
  set(key, z, owners) {
    this.remove(key);
    this.map.set(key, { z, owners });
    for (const ck of this._cells(z, 0)) { let s = this.grid.get(ck); if (!s) this.grid.set(ck, s = new Set()); s.add(key); }
  }
  remove(key) {
    const r = this.map.get(key); if (!r) return;
    for (const ck of this._cells(r.z, 0)) { const s = this.grid.get(ck); if (s) { s.delete(key); if (!s.size) this.grid.delete(ck); } }
    this.map.delete(key);
  }
  /** 与线段集合 zs（外扩 m）可能相邻的线段（排除 exclude 里的 key），按 key 去重，顺序确定 */
  near(zs, exclude, m = 15) {
    const ex = exclude instanceof Set ? exclude : new Set(exclude || []), seen = new Set(), out = [];
    for (const z of zs) for (const ck of this._cells(z, m)) {
      const s = this.grid.get(ck); if (!s) continue;
      for (const k of s) if (!seen.has(k) && !ex.has(k)) { seen.add(k); out.push(k); }
    }
    out.sort();
    const lo = zs.reduce((t, z) => [Math.min(t[0], z[0][0], z[1][0]), Math.min(t[1], z[0][1], z[1][1])], [Infinity, Infinity]);
    const hi = zs.reduce((t, z) => [Math.max(t[0], z[0][0], z[1][0]), Math.max(t[1], z[0][1], z[1][1])], [-Infinity, -Infinity]);
    return out.map((k) => this.map.get(k).z).filter((z) =>
      Math.max(z[0][0], z[1][0]) >= lo[0] - m && Math.min(z[0][0], z[1][0]) <= hi[0] + m &&
      Math.max(z[0][1], z[1][1]) >= lo[1] - m && Math.min(z[0][1], z[1][1]) <= hi[1] + m);
  }
}

/** 节点点集索引（净空查询）：圆盘 (p, r) */
export class NodeIndex {
  constructor(nodes, cell = 120) {
    this.nodes = nodes; this.cell = cell; this.grid = new Map();
    nodes.forEach((n, i) => { const k = this._k(n.p[0], n.p[1]); let s = this.grid.get(k); if (!s) this.grid.set(k, s = []); s.push(i); });
  }
  _k(x, y) { return Math.floor(x / this.cell) * 100003 + Math.floor(y / this.cell); }
  /** 与线段 ab 距离 < r+pad 的节点下标 */
  hitsSeg(a, b, pad, skip) {
    const c = this.cell, m = 40 + pad, out = [];
    const x0 = Math.floor((Math.min(a[0], b[0]) - m) / c), x1 = Math.floor((Math.max(a[0], b[0]) + m) / c);
    const y0 = Math.floor((Math.min(a[1], b[1]) - m) / c), y1 = Math.floor((Math.max(a[1], b[1]) + m) / c);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) {
      const s = this.grid.get(x * 100003 + y); if (!s) continue;
      for (const i of s) { if (skip && skip.has(i)) continue; const n = this.nodes[i]; if (psdist(n.p, a, b) < n.r + pad) out.push(i); }
    }
    return out;
  }
  /** 离点 q 最近的「到圆周距离」(min(|q-p|-r)) */
  clearance(q) {
    const c = this.cell; let best = Infinity;
    for (let R = 1; R < 6; R++) {
      const cx = Math.floor(q[0] / c), cy = Math.floor(q[1] / c);
      for (let x = cx - R; x <= cx + R; x++) for (let y = cy - R; y <= cy + R; y++) {
        if (Math.max(Math.abs(x - cx), Math.abs(y - cy)) !== R) continue;
        const s = this.grid.get(x * 100003 + y); if (!s) continue;
        for (const i of s) { const n = this.nodes[i]; best = Math.min(best, dist(n.p, q) - n.r); }
      }
      if (best < (R - 1) * c) break;
    }
    return best;
  }
}

/* ------------------------------------------------------------------ 单边度量 */
/**
 * 一条边的度量（对应原型 stats）。
 *   ctx = { N: Map id→{p,r,i}, nodeIdx: NodeIndex, kRef }
 *   e   = { sources:[id], target:id }
 * 返回 {L,D,R,j,bad,hits,clip,segs}：
 *   L 总长；D 相对直连的额外路径长；R 回头路；j 汇合点数；
 *   bad 内部几何违规数（净空/过短/同向重叠/非相邻相交）；hits 穿过其它数学节点的次数。
 */
export function stats(segs, e, ctx) {
  const { N, kRef } = ctx;
  const T = N.get(e.target).p, tr = N.get(e.target).r;
  const raw = segs.map((s) => [s.a, s.b]);
  const l = raw.map(([a, b]) => dist(a, b));
  const clip = [], sa = [], sb = [];
  segs.forEach((s, i) => {
    const u = l[i] > 1e-10 ? [(s.b[0] - s.a[0]) / l[i], (s.b[1] - s.a[1]) / l[i]] : [0, 0];
    const A = s.source ? N.get(s.source).r + 1.5 / kRef : 0, B = s.target ? tr + 5 / kRef : 0;
    sa.push(A); sb.push(B);
    clip.push([[s.a[0] + u[0] * A, s.a[1] + u[1] * A], [s.b[0] - u[0] * B, s.b[1] - u[1] * B]]);
  });
  const n = e.sources.length;
  let base = 0; for (const id of e.sources) base += dist(N.get(id).p, T);
  let Ls = 0, wl = 0, R = 0;
  segs.forEach((s, i) => { Ls += l[i]; wl += s.w * l[i]; R += s.w * radial(s.a, s.b, T); });
  const D = Math.max(0, (wl - base) / n); R /= n;
  const jset = new Set();
  for (const s of segs) if (!s.target && !s.bendEnd) jset.add(s.b[0] + ',' + s.b[1]);
  let bad = 0;
  for (let i = 0; i < segs.length; i++) if (l[i] - sa[i] - sb[i] < 8) bad++;
  const ownIds = [...new Set([...e.sources, e.target])], own = new Set(ownIds.map((id) => N.get(id).i));
  for (let i = 0; i < segs.length; i++) for (const id of ownIds) {
    const nd = N.get(id);
    if (segs[i].source === id || (segs[i].target && e.target === id)) continue;
    if (psdist(nd.p, raw[i][0], raw[i][1]) < nd.r + 3) bad++;
  }
  for (const key of jset) {
    const p = key.split(',').map(Number);
    for (const id of ownIds) { const nd = N.get(id); if (dist(nd.p, p) < nd.r + 5) bad++; }
  }
  const eq = (p, q) => Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;
  const cos10 = Math.cos(10 * Math.PI / 180);
  for (let i = 0; i < raw.length; i++) for (let h = 0; h < i; h++) {
    let sh = null;
    for (let x = 0; x < 2 && !sh; x++) for (let y = 0; y < 2; y++) if (eq(raw[i][x], raw[h][y])) { sh = [x, y]; break; }
    if (sh) {
      const u = [raw[i][1 - sh[0]][0] - raw[i][sh[0]][0], raw[i][1 - sh[0]][1] - raw[i][sh[0]][1]];
      const v = [raw[h][1 - sh[1]][0] - raw[h][sh[1]][0], raw[h][1 - sh[1]][1] - raw[h][sh[1]][1]];
      const nn = Math.max(Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]), 1e-12);
      if ((u[0] * v[0] + u[1] * v[1]) / nn > cos10) bad++;
    } else if (conflict(raw[i][0], raw[i][1], raw[h][0], raw[h][1], 1e-8, 1e-6)) bad++;
  }
  let hits = 0;
  for (const [a, b] of raw) hits += ctx.nodeIdx.hitsSeg(a, b, 2, own).length;
  return { L: Ls, D, R, j: jset.size, bad, hits, clip, segs };
}
