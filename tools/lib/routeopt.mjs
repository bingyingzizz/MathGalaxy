/* ==========================================================================
   路由 · 联合优化（Task 3）：全局调整 → 早合并 → 延迟/嵌套分流
   --------------------------------------------------------------------------
   移植自批准的 B+ 实验流水线（bplus-run/global_opt.py → refine.py → final_opt.py），
   改写为 JS，用空间索引代替整表 numpy，去掉硬编码的节点/回归 id 与 /tmp 路径。
   所有数字阈值是**工程旋钮**（params），不是数学规则。

   语义护栏（见 docs/workflows/engine.md 与 Task 3 §8.3）：
     · 共享主干只出现在「同一个原始前提」的出边之间：每个 fan 组里所有成员的
       起点相同（source 或 fanSource 相同）、同色（黑/粉不混）、几何逐位相同；
     · 汇合点只在局部凸包内移动（候选取自子树前提质心/成员/到结论的凸组合，
       远源组限制在其质心半径内）；
     · 每个候选必须不增加该边的违规数/穿节点数，且 D、R 不超界；
     · 一切改动只改几何；边 id、前提集合、结论、证明归属不变。
   确定性：全程无随机数；所有遍历顺序固定（并列时按 id/下标）。
   ========================================================================== */
import { dist, mix, mean, psdist, pairCost, selfCost, SegIndex, stats } from './routegeom.mjs';

export const DEFAULT_PARAMS = {
  maxBends: 260,           // 阶段 3：局部折点上限（只对重叠最重的段）
  bendOverlapMin: 22,      // 一段的近平行重叠代价超过它才考虑折弯
  fanMaxAngleDeg1: 38, fanMaxAngleDeg2: 18,
  mergeMinSaving: 55, mergeMinFrac: 0.25
};

const ang = (v) => Math.atan2(v[1], v[0]);
const gapA = (a, b) => Math.abs(((a - b + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);
const key2 = (p) => p[0] + ',' + p[1];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const norm = (a) => Math.hypot(a[0], a[1]);
const same = (p, q) => p[0] === q[0] && p[1] === q[1];
const seg = (a, b, w = 1, source = null, target = false, extra = {}) => ({ a: [...a], b: [...b], w, source, target, ...extra });

function completeLinkageSets(ps) {
  // 返回树中每个内部节点的叶子下标列表（与 scipy complete linkage 同口径，并列取下标小者）
  let cl = ps.map((_, i) => ({ ids: [i] })); const res = [];
  const pd = (a, b) => { let m = 0; for (const i of a.ids) for (const j of b.ids) m = Math.max(m, dist(ps[i], ps[j])); return m; };
  while (cl.length > 1) {
    let x = 0, y = 1, b = Infinity;
    for (let i = 0; i < cl.length; i++) for (let j = i + 1; j < cl.length; j++) { const d = pd(cl[i], cl[j]); if (d < b) { b = d; x = i; y = j; } }
    const m = { ids: cl[x].ids.concat(cl[y].ids) };
    cl = cl.filter((_, i) => i !== x && i !== y); cl.push(m); res.push(m.ids);
  }
  return res;
}

export class RouteOptimizer {
  /**
   * @param ctx    {N:Map(id→{p,r,i,region}), nodeIdx, kRef}
   * @param edges  [{id, sources, target, derived}]  待优化的推出边（已含单前提直线边）
   * @param init   Map(id → segs[])  初始线段
   * @param fixed  [[a,b]] 其它（不参与优化的）线段，仅作干涉背景
   */
  constructor(ctx, edges, init, fixed, params = {}) {
    this.ctx = ctx; this.E = edges; this.fixed = fixed; this.prm = { ...DEFAULT_PARAMS, ...params };
    this.cur = edges.map((e) => stats(init.get(e.id), e, ctx));
    this.base = this.cur.slice(); this.original = this.cur.slice();
    this.groups = []; this.merges = []; this.fans = []; this.log = [];
    this.idx = new SegIndex(); this.rebuild();
  }
  keyOf(i, j, s) { return s.fan || (i + ':' + j); }
  rebuild() {
    const d = new Map();
    this.cur.forEach((m, i) => m.segs.forEach((s, j) => {
      const k = this.keyOf(i, j, s); const r = d.get(k);
      if (!r) d.set(k, { z: m.clip[j], owners: new Set([i]) }); else r.owners.add(i);
    }));
    this.idx = new SegIndex();
    this.fixed.forEach((z, j) => this.idx.set('F' + j, z, new Set()));
    for (const [k, r] of d) this.idx.set(k, r.z, r.owners);
  }
  ownKeys(i) { return this.cur[i].segs.map((s, j) => this.keyOf(i, j, s)); }
  /** 单个 key 排除集 → 邻近线段 */
  near(zs, ex) { return this.idx.near(zs, ex, 15); }
  cost(z, oth) {
    const a = pairCost(z, oth), b = selfCost(z);
    return [a[0] + b[0], a[1] + b[1]];
  }
  noFake(q, lines) { for (const z of lines) if (psdist(q, z[0], z[1]) < 1) return false; return true; }
  safeNew(zz, oth, oldPoints) {
    if (!oth.length) return true;
    for (const z of oth) for (const p of z) {
      if (oldPoints.some((x) => dist(p, x) <= 1e-5)) continue;
      for (const s of zz) if (psdist(p, s[0], s[1]) < 0.35) return false;
    }
    return true;
  }
  clear(q) { return this.ctx.nodeIdx.clearance(q); }
  nodeHitsSeg(p, q, skipId) {
    const sk = new Set([this.ctx.N.get(skipId).i]);
    return this.ctx.nodeIdx.hitsSeg(p, q, 2, sk).length > 0;
  }
  score(m, o, c) { return 2.5 * o + 16 * c + 25 * m.hits + m.L + 2 * m.D + 8 * m.R + 5 * m.j; }
  setCur(i, m) { this.cur[i] = m; this.rebuild(); }

  /* ------------------------------------------------ 阶段 1：汇合点局部重定位 */
  stageJunctions() {
    const { ctx } = this; let accepted = 0;
    for (let i = 0; i < this.E.length; i++) {
      const e = this.E[i], old = this.cur[i];
      if (e.sources.length < 2 || old.segs.some((s) => s.fan)) continue;
      const ss = old.segs, T = ctx.N.get(e.target).p, Tk = key2(T), incoming = new Map();
      for (const s of ss) { const k = key2(s.b); if (!incoming.has(k)) incoming.set(k, []); incoming.get(k).push(s); }
      const leaves = (k) => (incoming.get(k) || []).flatMap((s) => s.source ? [s.source] : leaves(key2(s.a)));
      const oldkeys = this.ownKeys(i);
      let oth = this.near(old.clip, oldkeys), [o, c] = this.cost(old.clip, oth), best = old, bestGain = 0;
      void o; void c;
      for (const [pk, ins] of incoming) {
        if (pk === Tk || ins.length < 2) continue;
        const ids = leaves(pk), ps = ids.map((id) => ctx.N.get(id).p), cent = mean(ps);
        const radius = Math.max(...ps.map((p) => dist(p, cent))), far = dist(T, cent) >= 4 * Math.max(radius, 1e-8);
        const p0 = pk.split(',').map(Number);
        for (const aim of [cent, T, ...ps]) for (const f of [0.28, 0.55]) {
          let q = add(p0, mul(sub(aim, p0), f));
          if (far && dist(q, cent) > radius) q = add(cent, mul(sub(q, cent), radius / dist(q, cent)));
          if (dist(q, p0) < 2 || this.clear(q) < 4) continue;
          const ns = ss.map((s) => ({ ...s, a: key2(s.a) === pk ? q : s.a, b: key2(s.b) === pk ? q : s.b }));
          const mm = stats(ns, e, ctx);
          if (mm.bad > old.bad || mm.hits > old.hits || mm.D > old.D + 10 || mm.R > old.R + 2 || mm.L > old.L * 1.08) continue;
          const other = this.near([...old.clip, ...mm.clip], oldkeys);
          const [o0, c0] = this.cost(old.clip, other), [o1, c1] = this.cost(mm.clip, other);
          const oldPts = [...ss.map((s) => s.a), ...ss.map((s) => s.b)];
          if (c1 > c0 || o1 > o0 + 1e-6 || !this.noFake(q, other) || !this.safeNew(mm.clip, other, oldPts)) continue;
          const gain = this.score(old, o0, c0) - this.score(mm, o1, c1);
          if (gain > 3 && (best === old || gain > bestGain)) { best = mm; bestGain = gain; }
        }
      }
      if (best !== old) { this.setCur(i, best); accepted++; }
    }
    this.log.push({ stage: 'junctions', accepted });
    return accepted;
  }

  /* ------------------------------------------------ 共用：把一个 fan 提议转成更新 */
  _tryFan(sel, p, q, tag, baseGuard) {
    const ups = new Map(), newClip = [];
    for (const [i, j, s] of sel) {
      const trunk = { ...s, b: [...q], target: false, bendEnd: true, fan: tag }; delete trunk.hotPart;
      if (baseGuard.fromSource) { trunk.a = [...p]; trunk.source = s.source; trunk.w = 1; }
      const tail = { ...s, a: [...q], source: null };
      const mm = stats([...this.cur[i].segs.slice(0, j), trunk, tail, ...this.cur[i].segs.slice(j + 1)], this.E[i], this.ctx), om = this.cur[i];
      if (mm.bad > om.bad || mm.hits > om.hits || mm.D > this.base[i].D + 12 || mm.R > this.base[i].R + 2) return null;
      ups.set(i, mm); newClip.push(mm.clip.slice(j, j + 2));
    }
    return { ups, zz: [newClip[0][0], ...newClip.map((x) => x[1])] };
  }
  _fanSources() {
    const firsts = new Map();
    this.cur.forEach((m, i) => m.segs.forEach((s) => { if (s.source && !s.fan) { if (!firsts.has(s.source)) firsts.set(s.source, []); firsts.get(s.source).push(i); } }));
    return [...firsts.entries()].sort((a, b) => (b[1].length - a[1].length) || (a[0] < b[0] ? -1 : 1));
  }

  /* ------------------------------------------------ 阶段 2：共同前提的多节点分流 */
  stageFans() {
    const { ctx } = this;
    for (const [source, items] of this._fanSources()) {
      if (items.length < 2) continue;
      const p = ctx.N.get(source).p, pr = ctx.N.get(source).r;
      for (const color of [false, true]) {
        for (let step = 0; step < 3; step++) {
          const el = [];
          for (const i of items) {
            if (this.E[i].derived !== color) continue;
            this.cur[i].segs.forEach((s, j) => { if (s.source === source && !s.fan) el.push([i, j, s]); });
          }
          el.sort((a, b) => ang(sub(a[2].b, p)) - ang(sub(b[2].b, p)));
          const seen = new Set(); let best = null;
          for (let size = 2; size <= Math.min(4, el.length); size++) for (let start = 0; start < el.length; start++) {
            const sel = []; for (let j = 0; j < size; j++) sel.push(el[(start + j) % el.length]);
            const ks = sel.map(([i, j]) => i + ':' + j).sort().join('|'); if (seen.has(ks)) continue; seen.add(ks);
            const v = sel.map(([, , s]) => sub(s.b, p)), ll = v.map(norm); if (Math.min(...ll) < 35) continue;
            const uv = v.map((x, k) => mul(x, 1 / ll[k])); let u = mean(uv); u = mul(u, 1 / Math.max(norm(u), 1e-10));
            const maxGap = Math.max(...uv.map((x) => gapA(ang(x), ang(u))));
            if (maxGap > this.prm.fanMaxAngleDeg1 * Math.PI / 180) continue;
            const old = sel.map(([i, j]) => this.cur[i].clip[j]), exKeys = sel.map(([i, j]) => i + ':' + j);
            const oth = this.near(old, exKeys), [o0g] = this.cost(old, oth);
            if (o0g < 4 && maxGap > 15 * Math.PI / 180) continue;                 // 只处理真正拥挤的出口
            for (const frac of [0.25, 0.4, 0.55, 0.7]) {
              const q = add(p, mul(u, Math.min(...ll) * frac));
              if (dist(q, p) < pr + 12 || this.clear(q) < 5) continue;
              const out = v.map((x) => sub(add(p, x), q)), ol = out.map(norm); if (Math.min(...ol) < 12) continue;
              const ua = out.map((x, k) => mul(x, 1 / ol[k]));
              let minGap = Infinity; for (let a = 0; a < ua.length; a++) for (let b = a + 1; b < ua.length; b++) minGap = Math.min(minGap, gapA(ang(ua[a]), ang(ua[b])));
              if (minGap < 9 * Math.PI / 180 || Math.min(...ua.map((x) => x[0] * u[0] + x[1] * u[1])) < 0) continue;
              if (this.nodeHitsSeg(p, q, source)) continue;
              const tag = 'g' + this.groups.length;
              const r = this._tryFan(sel, p, q, tag, { fromSource: false }); if (!r) continue;
              const other = this.near([...old, ...r.zz], exKeys);
              if (!this.noFake(q, other) || !this.safeNew(r.zz, other, [p, ...v.map((x) => add(p, x))])) continue;
              const [o0, c0] = this.cost(old, other), [o1, c1] = this.cost(r.zz, other);
              const len = (zs) => zs.reduce((s, z) => s + dist(z[0], z[1]), 0), saving = len(old) - len(r.zz);
              if (c1 > c0 || o1 > o0 + 1e-6 || saving < 0) continue;
              const gain = 2.5 * (o0 - o1) + 16 * (c0 - c1) + saving + 15 * (size - 1);
              if (!best || gain > best.gain) best = { gain, ups: r.ups, tag, q, sel };
            }
          }
          if (!best) break;
          for (const [i, m] of best.ups) this.cur[i] = m;
          this.groups.push({ id: best.tag, source, p: best.q, members: best.sel.map(([i]) => this.E[i].id) });
          this.rebuild();
        }
      }
    }
    this.log.push({ stage: 'fans', groups: this.groups.length });
  }

  /* ------------------------------------------------ 阶段 3：重叠最重的段做局部折弯 */
  stageBends() {
    const { ctx } = this, pri = [];
    this.cur.forEach((m, i) => m.segs.forEach((s, j) => {
      const z = m.clip[j];
      if (s.fan || s.hotPart || dist(z[0], z[1]) < 55) return;
      const oth = this.near([z], [i + ':' + j]), [o] = this.cost([z], oth);
      if (o > this.prm.bendOverlapMin) pri.push([o, i, s]);
    }));
    pri.sort((a, b) => b[0] - a[0] || a[1] - b[1]);
    let bends = 0;
    for (const [, i, s] of pri.slice(0, this.prm.maxBends)) {
      const m = this.cur[i], j = m.segs.indexOf(s); if (j < 0) continue;
      const z = m.clip[j], a = s.a, b = s.b, v = sub(b, a), l = norm(v), perp = [-v[1] / l, v[0] / l];
      let best = null;
      for (const t of [0.35, 0.55, 0.75]) for (const off of [-30, -18, 18, 30]) {
        const q = add(add(a, mul(v, t)), mul(perp, off));
        if (this.clear(q) < 5) continue;
        const dl = dist(q, a) + dist(b, q) - l;
        if (dl > Math.min(45, l * 0.16) || Math.min(dist(q, a), dist(b, q)) < 20) continue;
        const two = [{ ...s, b: q, target: false, bendEnd: true, hotPart: 1 }, { ...s, a: q, source: null, hotPart: 2 }];
        const mm = stats([...m.segs.slice(0, j), ...two, ...m.segs.slice(j + 1)], this.E[i], ctx);
        if (mm.bad > m.bad || mm.hits > m.hits || mm.R > m.R + 1 || mm.D > this.base[i].D + 18) continue;
        const zz = mm.clip.slice(j, j + 2), other = this.near([z, ...zz], [i + ':' + j]);
        if (!this.noFake(q, other) || !this.safeNew(zz, other, [a, b])) continue;
        const [o0, c0] = this.cost([z], other), [o1, c1] = this.cost(zz, other);
        if (c1 > c0 || o1 > o0 + 1e-6) continue;
        const gain = 2.5 * (o0 - o1) + 16 * (c0 - c1) - dl - 2 * (mm.D - m.D) - 8 * (mm.R - m.R);
        if (gain > 12 && (!best || gain > best[0])) best = [gain, mm];
      }
      if (best) { this.setCur(i, best[1]); bends++; }
    }
    this.log.push({ stage: 'bends', bends });
  }

  /* ------------------------------------------------ 早合并（远源紧致组先在源侧汇合） */
  _leafChains(ss, Tk) {
    const out = new Map(), inc = new Map(), by = new Map();
    ss.forEach((s, j) => out.set(key2(s.a), j));
    ss.forEach((s) => inc.set(key2(s.b), (inc.get(key2(s.b)) || 0) + 1));
    ss.forEach((s, j) => {
      if (!s.source) return;
      const path = [j]; let pk = key2(s.b);
      while (pk !== Tk && inc.get(pk) === 1 && out.has(pk)) { const jj = out.get(pk); path.push(jj); pk = key2(ss[jj].b); }
      if (ss[path[path.length - 1]].w === 1) { if (!by.has(pk)) by.set(pk, []); by.get(pk).push([s.source, path]); }
    });
    return by;
  }
  _dropLoneFans() {
    const cnt = new Map();
    for (const m of this.cur) for (const s of m.segs) if (s.fan) cnt.set(s.fan, (cnt.get(s.fan) || 0) + 1);
    this.cur.forEach((m, i) => {
      if (m.segs.some((s) => s.fan && cnt.get(s.fan) < 2)) {
        this.cur[i] = stats(m.segs.map((s) => { if (s.fan && cnt.get(s.fan) < 2) { const c = { ...s }; delete c.fan; return c; } return s; }), this.E[i], this.ctx);
      }
    });
  }
  stageEarlyMerges() {
    const { ctx } = this;
    for (let i = 0; i < this.E.length; i++) {
      const e = this.E[i]; if (e.sources.length < 3) continue;
      const T = ctx.N.get(e.target).p, Tk = key2(T);
      for (let pass = 0; pass < 3; pass++) {
        const old = this.cur[i], ss = old.segs; let best = null;
        for (const [pk, items] of this._leafChains(ss, Tk)) {
          if (items.length < 2) continue;
          const Q = pk.split(',').map(Number), ps = items.map(([src]) => ctx.N.get(src).p);
          const sets = completeLinkageSets(ps), reg = new Map();
          items.forEach(([src], j) => { const r = ctx.N.get(src).region || ''; if (!reg.has(r)) reg.set(r, []); reg.get(r).push(j); });
          sets.push(...reg.values());
          const seen = new Set();
          for (const selIdx of sets.slice().sort((a, b) => b.length - a.length)) {
            const ks = selIdx.slice().sort((a, b) => a - b).join(','), m = selIdx.length;
            if (m < 2 || seen.has(ks)) continue; seen.add(ks);
            const P = selIdx.map((j) => ps[j]), c = mean(P), r = Math.max(...P.map((p) => dist(p, c))), d = dist(Q, c);
            if (r < 1e-6 || d < Math.max(130, 4 * r) || dist(T, c) < 4 * r) continue;
            const selpaths = selIdx.map((j) => items[j]), rem = new Set(selpaths.flatMap(([, path]) => path));
            const keepers = ss.filter((_, j) => !rem.has(j));
            const lens = (xs) => xs.reduce((s, z) => s + dist(z.a, z.b), 0);
            const oldlen = lens([...rem].map((h) => ss[h]));
            for (const preserve of [true, false]) {
              const pre = [], starts = [];
              for (const [src, path] of selpaths) {
                const f = ss[path[0]];
                if (preserve && f.fan && dist(f.b, c) <= 1.15 * r) { pre.push(f); starts.push([null, f.b]); } else starts.push([src, ctx.N.get(src).p]);
              }
              const cand = [c, ...[0.2, 0.45, 0.7, 0.95].map((t) => add(c, mul(sub(T, c), Math.min(t * r / Math.max(dist(T, c), 1e-9), 1)))),
                ...P.flatMap((p) => [0.35, 0.7].map((f) => add(c, mul(sub(p, c), f))))];
              for (const q of cand) {
                if (this.clear(q) < 5 || Math.min(...starts.map(([, p]) => dist(q, p))) < 12 || dist(q, Q) < 15) continue;
                const adds = [...pre, ...starts.map(([src, p]) => seg(p, q, 1, src)), seg(q, Q, m, null, pk === Tk)];
                const saving = oldlen - lens(adds);
                if (saving < Math.max(this.prm.mergeMinSaving, oldlen * this.prm.mergeMinFrac)) continue;
                const mm = stats([...keepers, ...adds], e, ctx);
                if (mm.bad > old.bad || mm.hits > old.hits || mm.D > old.D + 45 || mm.R > old.R + 5) continue;
                const zz = mm.clip.slice(mm.clip.length - adds.length), oz = [...rem].map((h) => old.clip[h]);
                const ex = [...this.ownKeys(i), ...pre.map((s) => s.fan)], oth = this.near([...oz, ...zz], ex);
                if (!this.noFake(q, oth)) continue;
                const [o0, c0] = this.cost(oz, oth), [o1, c1] = this.cost(zz, oth);
                const gain = saving + 2 * (o0 - o1) + 14 * (c0 - c1) + 30 * (old.bad - mm.bad) + 20 * (old.hits - mm.hits) - 2 * (mm.D - old.D) - 8 * (mm.R - old.R);
                if (gain > 0 && (!best || gain > best.gain)) best = { gain, mm, selpaths, q, saving, pk };
              }
            }
          }
        }
        if (!best) break;
        this.setCur(i, best.mm);
        this.merges.push({ edge: e.id, leaves: best.selpaths.map(([s]) => s), q: best.q, saving: best.saving });
      }
    }
    this._dropLoneFans(); this.rebuild();
    this.log.push({ stage: 'earlyMerges', merges: this.merges.length });
  }

  /* ------------------------------------------------ 更长的延迟分流（refine fans） */
  stageRefineFans() {
    const { ctx } = this;
    for (const [source, items] of this._fanSources()) {
      if (items.length < 2) continue;
      const p = ctx.N.get(source).p, pr = ctx.N.get(source).r;
      for (const color of [false, true]) for (let step = 0; step < 2; step++) {
        const el = [];
        for (const i of items) {
          if (this.E[i].derived !== color) continue;
          this.cur[i].segs.forEach((s, j) => { if (s.source === source && !s.fan && dist(s.b, p) > 180) el.push([i, j, s]); });
        }
        if (el.length < 2) break;
        el.sort((a, b) => ang(sub(a[2].b, p)) - ang(sub(b[2].b, p)));
        let best = null; const seen = new Set();
        for (let size = Math.min(el.length, 8); size >= 2; size--) for (let start = 0; start < el.length; start++) {
          const sel = []; for (let j = 0; j < size; j++) sel.push(el[(start + j) % el.length]);
          const ks = sel.map(([i, j]) => i + ':' + j).sort().join('|'); if (seen.has(ks)) continue; seen.add(ks);
          const v = sel.map(([, , s]) => sub(s.b, p)), ll = v.map(norm), uv = v.map((x, k) => mul(x, 1 / ll[k]));
          let u = mean(uv); u = mul(u, 1 / Math.max(norm(u), 1e-10));
          if (Math.max(...uv.map((x) => gapA(ang(x), ang(u)))) > this.prm.fanMaxAngleDeg2 * Math.PI / 180) continue;
          const old = sel.map(([i, j]) => this.cur[i].clip[j]), exKeys = sel.map(([i, j]) => i + ':' + j), tag = 'r' + this.fans.length;
          const minL = Math.min(...ll);
          const ls = [...new Set([...[0.10, 0.20, 0.35, 0.50, 0.65, 0.80].map((f) => minL * f), 45, 70, 110, 160])].sort((a, b) => a - b);
          for (const l of ls) {
            if (l < pr + 15 || l > minL * 0.85) continue;
            for (const da of [0, -6, 6, -12, 12]) {
              const th = ang(u) + da * Math.PI / 180, q = [p[0] + l * Math.cos(th), p[1] + l * Math.sin(th)];
              if (this.clear(q) < 5 || this.nodeHitsSeg(p, q, source)) continue;
              const out = v.map((x) => sub(add(p, x), q)), ol = out.map(norm), ua = out.map((x, k) => mul(x, 1 / ol[k]));
              if (Math.min(...ol) < 15 || Math.min(...ua.map((x) => x[0] * u[0] + x[1] * u[1])) < 0) continue;
              let minGap = Infinity; for (let a = 0; a < ua.length; a++) for (let b = a + 1; b < ua.length; b++) minGap = Math.min(minGap, gapA(ang(ua[a]), ang(ua[b])));
              if (minGap < 2 * Math.PI / 180) continue;
              const r = this._tryFan(sel, p, q, tag, { fromSource: false }); if (!r) continue;
              const other = this.near([...old, ...r.zz], exKeys);
              if (!this.noFake(q, other) || !this.safeNew(r.zz, other, [p, ...v.map((x) => add(p, x))])) continue;
              const [o0, c0] = this.cost(old, other), [o1, c1] = this.cost(r.zz, other);
              const len = (zs) => zs.reduce((s, z) => s + dist(z[0], z[1]), 0), saving = len(old) - len(r.zz);
              if (saving < 15 || c1 > c0 + 2 || o1 > o0 + Math.max(10, saving * 0.12)) continue;
              const gain = saving + 2.5 * (o0 - o1) + 16 * (c0 - c1) + 25 * (size - 1);
              if (gain > 0 && (!best || gain > best.gain)) best = { gain, ups: r.ups, tag, q, sel, saving };
            }
          }
        }
        if (!best) break;
        for (const [i, m] of best.ups) this.cur[i] = m;
        this.fans.push({ id: best.tag, source, p: best.q, members: best.sel.map(([i]) => this.E[i].id), saving: best.saving });
        this.rebuild();
      }
    }
    this._dropLoneFans(); this.rebuild();
    this.log.push({ stage: 'refineFans', fans: this.fans.length });
  }

  /* ------------------------------------------------ 最终：把共享主干继续向目标方向延长 / 嵌套分流 */
  _groups() {
    const g = new Map();
    this.cur.forEach((m, i) => m.segs.forEach((s, j) => { if (s.fan) { if (!g.has(s.fan)) g.set(s.fan, []); g.get(s.fan).push([i, j, s]); } }));
    return g;
  }
  _optimizeGroup(items, tag, nested) {
    const { ctx } = this, [, , s0] = items[0];
    const a = nested ? s0.b : s0.a, q = s0.b, tails = [];
    for (const [i, , s] of items) {
      const nxt = []; this.cur[i].segs.forEach((z, l) => { if (same(z.a, s.b)) nxt.push([l, z]); });
      if (nxt.length !== 1 || nxt[0][1].fan) return null;
      tails.push(nxt[0]);
    }
    const ps = tails.map(([, z]) => z.b), oldl = dist(q, a);
    if (Math.min(...ps.map((p) => dist(p, a))) < 40) return null;
    const keys = items.map(([i], k) => i + ':' + tails[k][0]);
    let old = items.map(([i], k) => this.cur[i].clip[tails[k][0]]);
    if (!nested) { keys.push(tag); old = [this.cur[items[0][0]].clip[items[0][1]], ...old]; }
    const oth = this.near([...old, ...ps.map((p) => [a, p])], keys), [o0, c0] = this.cost(old, oth);
    const c = mean(ps); let x = c;
    const pts = [a, ...ps];
    for (let k = 0; k < 30; k++) {
      let sx = 0, sy = 0, sw = 0;
      for (const p of pts) { const d = Math.max(dist(p, x), 1e-5); sx += p[0] / d; sy += p[1] / d; sw += 1 / d; }
      x = [sx / sw, sy / sw];
    }
    const cand = [x];
    for (const t of [0.25, 0.4, 0.55, 0.7, 0.8, 0.9, 0.96]) for (const p of [c, ...ps.map((p) => add(mul(c, 0.75), mul(p, 0.25)))]) cand.push(add(a, mul(sub(p, a), t)));
    let best = null;
    const lenSum = (zs) => zs.reduce((s, z) => s + dist(z[0], z[1]), 0);
    for (const xx of cand) {
      if (dist(xx, a) < oldl + 10 || Math.min(...ps.map((p) => dist(p, xx))) < 16 || Math.min(...ps.map((p) => (p[0] - xx[0]) * (xx[0] - a[0]) + (p[1] - xx[1]) * (xx[1] - a[1]))) < 0 || this.clear(xx) < 5) continue;
      const ups = new Map(), zz = []; let trunk = null, ok = true;
      for (let k = 0; k < items.length; k++) {
        const [i, j, s] = items[k], [l] = tails[k], om = this.cur[i], ss = om.segs.map((v) => ({ ...v }));
        let ti, fi;
        if (nested) {
          ss[l].a = [...xx];
          ss.splice(l, 0, seg(a, xx, 1, null, false, { bendEnd: true, fan: tag, fanSource: s.source || s.fanSource }));
          ti = l + 1; fi = l;
        } else { ss[j].b = [...xx]; ss[l].a = [...xx]; ti = l; fi = j; }
        const mm = stats(ss, this.E[i], ctx), meanLen = ps.reduce((t, p) => t + dist(p, a), 0) / ps.length;
        if (mm.bad > om.bad || mm.hits > om.hits || mm.D > om.D + Math.max(7, 0.04 * meanLen) || mm.R > om.R + 2) { ok = false; break; }
        ups.set(i, mm); zz.push(mm.clip[ti]); trunk = mm.clip[fi];
      }
      if (!ok) continue;
      const zs = [trunk, ...zz];
      if (!this.noFake(xx, oth) || !this.safeNew(zs, oth, [a, q, ...ps])) continue;
      const [o1, c1] = this.cost(zs, oth), saving = lenSum(old) - lenSum(zs);
      let dD = 0; for (const [i, m] of ups) dD += m.D - this.cur[i].D;
      const gain = saving + 2.5 * (o0 - o1) + 16 * (c0 - c1) - 2 * dD;
      if (saving > 5 && c1 <= c0 + 2 && o1 <= o0 + Math.max(8, saving * 0.08) && gain > 0 && (!best || gain > best.gain)) best = { gain, ups, x: xx, saving };
    }
    return best;
  }
  stageFinal() {
    const changes = [], nested = [];
    const firstTag = (t) => (t === 'r0' ? 0 : 1);
    for (const tag of [...this._groups().keys()].sort((a, b) => firstTag(a) - firstTag(b) || (a < b ? -1 : a > b ? 1 : 0))) {
      const items = this._groups().get(tag); if (!items) continue;
      const best = this._optimizeGroup(items, tag, false);
      if (best) { for (const [i, m] of best.ups) this.cur[i] = m; this.rebuild(); changes.push({ group: tag, new: best.x, saving: best.saving, members: items.map(([i]) => this.E[i].id) }); }
    }
    for (const tag of [...this._groups().keys()]) {
      const items = this._groups().get(tag); if (!items || items.length < 3) continue;
      const ps = []; let ok = true;
      for (const [i, , s] of items) {
        const nxt = this.cur[i].segs.filter((z) => same(z.a, s.b) && !z.fan);
        if (nxt.length !== 1) { ok = false; break; } ps.push(nxt[0].b);
      }
      if (!ok) continue;
      let best = null; const newtag = 'n' + nested.length;
      for (const selIdx of completeLinkageSets(ps)) {
        if (selIdx.length < 2 || selIdx.length === items.length) continue;
        const sub2 = selIdx.map((j) => items[j]), cand = this._optimizeGroup(sub2, newtag, true);
        if (cand && (!best || cand.gain > best.cand.gain)) best = { cand, sub: sub2 };
      }
      if (best) { for (const [i, m] of best.cand.ups) this.cur[i] = m; this.rebuild(); nested.push({ group: newtag, parent: tag, new: best.cand.x, saving: best.cand.saving, members: best.sub.map(([i]) => this.E[i].id) }); }
    }
    this.log.push({ stage: 'final', extended: changes.length, nested: nested.length });
    this.finalChanges = { extend: changes, nested };
  }

  run() {
    this.stageJunctions(); this.stageFans(); this.stageBends();
    this.stageEarlyMerges(); this.stageRefineFans(); this.stageFinal();
    return this;
  }
}
