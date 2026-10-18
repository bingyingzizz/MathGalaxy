/* ==========================================================================
   数学星图 · 布局求解（三层：星系 → 星团 → 恒星）
   --------------------------------------------------------------------------
   1) 星系：regions.js 里声明的中心 + 半径
   2) 星团：把一套「自足的装置」的节点聚成一团圆盘，多个星团在星系内按环状排布
   3) 恒星：节点在所属星团的圆盘里用向日葵螺旋匀布

   跨板块（多 region）的节点会被推向「朝着另一个星系」的那一侧边缘，
   于是仍然满足「内容交叉的节点落在边界上」。

   全程使用固定随机种子 → 每次打开星图长得一模一样。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  var GOLDEN = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.39996，向日葵螺旋的转角

  /** 一个圆盘里放 count 个点，需要多大半径 */
  function discRadius(count, factor) {
    var ideal = MG.config.layout.idealDist;
    return Math.sqrt(Math.max(count, 1) / Math.PI) * ideal * (factor || 1);
  }

  /** 节点的归属点（跨板块 → 按半径加权的交界点）；没有星团时才用得上 */
  function regionTarget(node, graph) {
    var rs = [];
    node.regions.forEach(function (id) { if (graph.regionById[id]) rs.push(graph.regionById[id]); });
    if (!rs.length) return { x: 0, y: 0 };
    if (rs.length === 1) return { x: rs[0].center.x, y: rs[0].center.y };
    var wsum = 0, x = 0, y = 0;
    rs.forEach(function (r) { wsum += r.radius; x += r.center.x * r.radius; y += r.center.y * r.radius; });
    return { x: x / wsum, y: y / wsum };
  }

  /* ==================================================================== */
  /* 行星-卫星锚点
     --------------------------------------------------------------------
     星团内部不是平铺的云，而是「**一颗行星 + 一圈卫星**」：

       1. **行星 = 星团的 hub** —— 就是 clusters.js 里手定的那个
          「这个装置是为了造出什么而存在的」节点。没有写 hub 时才退而取
          团内度数最高的定义节点。（渲染器本来就把 hub 画得更大更亮。）
       2. 其余节点是**卫星**，按「离行星的图距离」由近到远填轨道。
       3. **一圈装得下就只放一圈**（卫星紧贴着行星），装不下才一圈一圈往外加。
          第 $k$ 圈半径 = $k \\cdot$ minGap，容量 $= 6k$（周长 ÷ 最小间距）。
       4. 碰撞松弛：行星钉住不动，只推卫星，保证任意两点 ≥ minGap。

     ⇒ 每个星团看上去是一颗行星带着一圈卫星：**团内密、团间空**。          */

  /** 给星团 c 内所有节点写 anchor（以 cx,cy 为中心）；返回离中心最远的距离 */
  function planetaryAnchors(graph, c, cx, cy, opts) {
    opts = opts || {};
    var minGap = opts.minGap || 64;
    var oneRingMaxR = (opts.oneRingMax || 3.4) * minGap;   // 单圈允许的最大半径

    var ids = [];
    var idset = Object.create(null);
    c.nodes.forEach(function (n) { ids.push(n.id); idset[n.id] = true; });

    // 1) 行星：优先用星团手写的 hub
    var planet = (c.hub && idset[c.hub]) ? c.hub : null;
    if (!planet) {
      var defs = c.nodes.filter(function (n) { return n.type === 'definition'; });
      var pool = (defs.length ? defs : c.nodes).slice().sort(function (a, b) {
        var da = graph.adj[a.id] ? graph.adj[a.id].length : 0;
        var db = graph.adj[b.id] ? graph.adj[b.id].length : 0;
        if (db !== da) return db - da;
        return a.id < b.id ? -1 : 1;
      });
      planet = pool[0].id;
    }

    // 2) 卫星排序：离行星越近（图距离）越靠内圈
    var dist = Object.create(null);
    dist[planet] = 0;
    var frontier = [planet], depth = 0;
    while (frontier.length) {
      var nxt = [];
      frontier.forEach(function (u) {
        var nb = graph.adj[u];
        if (!nb) return;
        for (var i = 0; i < nb.length; i++) {
          var v = nb[i];
          if (idset[v] && !(v in dist)) { dist[v] = depth + 1; nxt.push(v); }
        }
      });
      frontier = nxt; depth++;
    }
    var sats = ids.filter(function (x) { return x !== planet; });
    sats.sort(function (a, b) {
      var da = (a in dist) ? dist[a] : 1e6, db = (b in dist) ? dist[b] : 1e6;
      if (da !== db) return da - db;
      return a < b ? -1 : 1;
    });

    // 3) 分圈
    var m = sats.length;
    var rings = [];
    if (m > 0) {
      var oneR = Math.max(minGap, m * minGap / (2 * Math.PI));
      if (oneR <= oneRingMaxR) {
        rings = [{ r: oneR, n: m, at: 0 }];
      } else {
        var K = 1;
        while (3 * K * (K + 1) < m) K++;      // 累计容量 6+12+…+6K = 3K(K+1)
        var caps = [], total = 0;
        for (var kk = 1; kk <= K; kk++) { caps.push(6 * kk); total += 6 * kk; }
        var placed = 0;
        for (var ri = 0; ri < K; ri++) {
          var take = (ri === K - 1) ? m - placed
                                    : Math.max(1, Math.round(m * caps[ri] / total));
          if (placed + take > m) take = m - placed;
          rings.push({ r: (ri + 1) * minGap, n: take, at: placed });
          placed += take;
        }
      }
    }

    // 4) 落位：行星在中心，卫星按圈均布（每圈错开相位，免得径向对齐）
    var posById = Object.create(null);
    posById[planet] = { x: 0, y: 0 };
    var phase = (U.hashString(c.id) % 628) / 100;
    rings.forEach(function (ring, i) {
      var th0 = phase + i * 0.618 * Math.PI;
      for (var j = 0; j < ring.n; j++) {
        var th = th0 + j * 2 * Math.PI / ring.n;
        posById[sats[ring.at + j]] = {
          x: ring.r * Math.cos(th),
          y: ring.r * Math.sin(th)
        };
      }
    });

    // 5) 碰撞松弛：行星固定，只推动卫星，保证任意两点 >= minGap
    var movers = ids.filter(function (x) { return x !== planet; });
    var fx = Object.create(null), fy = Object.create(null);
    for (var iter = 0; iter < 500; iter++) {
      movers.forEach(function (x) { fx[x] = 0; fy[x] = 0; });
      var changed = false;
      for (var a = 0; a < ids.length; a++) {
        for (var b = a + 1; b < ids.length; b++) {
          var u = ids[a], v = ids[b];
          var pu = posById[u], pv = posById[v];
          var dx = pu.x - pv.x, dy = pu.y - pv.y;
          var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
          if (d >= minGap) continue;
          changed = true;
          var f = (minGap - d) * 0.5, ux = dx / d, uy = dy / d;
          if (u !== planet) { fx[u] += ux * f; fy[u] += uy * f; }
          if (v !== planet) { fx[v] -= ux * f; fy[v] -= uy * f; }
        }
      }
      movers.forEach(function (x) { posById[x].x += fx[x]; posById[x].y += fy[x]; });
      if (!changed) break;
    }

    // 6) 平移到星团中心并写 anchor，同时量出实际半径
    var far = 0;
    c.nodes.forEach(function (n) {
      var q = posById[n.id];
      if (!q) q = { x: 0, y: 0 };            // 兜底（不该发生）
      n.anchor = { x: cx + q.x, y: cy + q.y };
      var rr = Math.sqrt(q.x * q.x + q.y * q.y);
      if (rr > far) far = rr;
    });
    return far;
  }

  /* ==================================================================== */
  /* organic 布局（2026-10-18 · Stage 1a）：删掉「目标距离表」，改成
     应力（只作用于有关系的对）+ 软斥力 + 真实节点松弛。
     --------------------------------------------------------------------
     Stage 0 解出「几个圆」的三条来源（都不是调参能修的）：
       ① 给 1501 对无关系的团也设了同一个最大目标距离 ⇒ 两两等距 ⇒ 二维最优解就是圆；
       ② α(0.55) < overlapFactor(0.85) ⇒ 最强那批关系永远被硬下限截平；
       ③ 节点停在「hub 居中 + 按角度排一圈」的锚点上 ⇒ 一个点绕一圈点。
     ⇒ 只要还在解「两两目标距离表」，就必然解出圆。所以本轮：
       · 无关系的对**不进应力**，只有**软斥力**（不做硬切）；
       · 删 weightFloor / alpha / overlapFactor / beta；
       · 节点种子改黄金角螺旋，容器改**软团井**（不画圆盘边界）。
     ⛔ 布局里不出现任何「板块」；⛔ 无随机数。 */

  function layoutNow() {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  }

  /** ?layout=organic / #layout=organic —— Stage 1 里默认仍是 packed */
  function urlFlag(name, allowed) {
    var loc = global.location || {};
    var s = String(loc.search || '') + '&' + String(loc.hash || '');
    var m = new RegExp('(?:^|[?&#])' + name + '=([a-z]+)').exec(s);
    if (!m) return null;
    return allowed.indexOf(m[1]) >= 0 ? m[1] : null;
  }

  /** 跨星团关系强度矩阵。clusters 按 id 排序（固定顺序 ⇒ 结果可复现）。
      只有 W>0 的对会进应力；W=0 的对只受软斥力。 */
  function clusterAdjacency(graph, clusters) {
    var cs = clusters.slice().sort(function (a, b) { return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0); });
    var n = cs.length, idx = Object.create(null);
    cs.forEach(function (c, i) { idx[c.id] = i; });
    var KW = (MG.config.layout.organic && MG.config.layout.organic.weight) || {};
    var W = new Float64Array(n * n);
    graph.edges.forEach(function (e) {
      var w = KW[e.kind];
      if (!w) return;                            // analogy 不参与布局
      var ids = MG.graphUtil.edgeNodes(e);
      var seen = [];
      for (var i = 0; i < ids.length; i++) {
        var nd = graph.byId[ids[i]];
        if (!nd || !nd.cluster || idx[nd.cluster] == null) continue;
        if (seen.indexOf(nd.cluster) < 0) seen.push(nd.cluster);
      }
      for (var a = 0; a < seen.length; a++) {
        for (var b = a + 1; b < seen.length; b++) {
          var ia = idx[seen[a]], ib = idx[seen[b]];
          if (ia === ib) continue;
          W[ia * n + ib] += w;
          W[ib * n + ia] += w;
        }
      }
    });
    return { cs: cs, n: n, idx: idx, W: W };
  }

  /** 关系图上的最短路（代价 = 1/(W+ε)）；不连通对取 D_max */
  function clusterGraphDist(adj) {
    var n = adj.n, W = adj.W;
    var D = new Float64Array(n * n);
    var EPS = 1e-9;
    for (var s = 0; s < n; s++) {
      var dist = new Float64Array(n);
      dist.fill(Infinity);
      var done = new Uint8Array(n);
      dist[s] = 0;
      for (var it = 0; it < n; it++) {
        var u = -1, best = Infinity;
        for (var v = 0; v < n; v++) if (!done[v] && dist[v] < best) { best = dist[v]; u = v; }
        if (u < 0) break;
        done[u] = 1;
        for (var v2 = 0; v2 < n; v2++) {
          if (done[v2] || v2 === u) continue;
          var wgt = W[u * n + v2];
          if (!(wgt > 0)) continue;
          var c = 1 / (wgt + EPS);
          if (dist[u] + c < dist[v2]) dist[v2] = dist[u] + c;
        }
      }
      for (var v3 = 0; v3 < n; v3++) D[s * n + v3] = dist[v3];
    }
    var dmax = 0;
    for (var i = 0; i < n * n; i++) if (isFinite(D[i]) && D[i] > dmax) dmax = D[i];
    for (var i2 = 0; i2 < n * n; i2++) if (!isFinite(D[i2])) D[i2] = dmax;
    return { D: D, dmax: dmax };
  }

  /* ------------------------------------------------------------ Phase 1 */
  /** 60 个团心：有关系用应力目标 L=R_i+R_j+0.6·D̂·R̄，没关系的只有软斥力 */
  function organicCenters(graph, liveClusters, cfg) {
    var t0 = layoutNow();
    var O = cfg.organic;
    var adj = clusterAdjacency(graph, liveClusters);
    var cs = adj.cs, n = adj.n, W = adj.W;
    if (n < 3) return null;
    var gd = clusterGraphDist(adj);
    var D = gd.D;

    /* R_i = rScale · gap · sqrt(n_i)：一个「nodes 以 gap 为间距排开」的团有多大 */
    /* ⭐ Stage 1b 裁决版：**碰撞半径** C_i = 0.42·gap·√n_i（≈0.8×节点占位半径）。
       ⛔ 只用于单侧碰撞与初始化，不是视觉半径；R 只用于应力目标 L。
       几何事实：R=15.6√n 而按 gap 排满 n 点只需 14.67√n ⇒ R 只余 6.3%，
       所以「圆盘重叠 35%」必然与硬 gap 打架。碰撞半径必须另算。 */
    var R = new Float64Array(n), C = new Float64Array(n), sumR = 0;
    for (var i = 0; i < n; i++) {
      var sq = Math.sqrt(Math.max(1, cs[i].nodes.length));
      R[i] = O.rScale * O.gap * sq;
      C[i] = O.collisionRadius * O.gap * sq;     // 单侧碰撞半径
      sumR += R[i];
    }
    var Rbar = sumR / n;

    /* D̂ 归一化（只用 i≠j 的最小 / 最大） */
    var dmin = Infinity;
    for (i = 0; i < n; i++) for (var j = 0; j < n; j++) if (i !== j && D[i * n + j] < dmin) dmin = D[i * n + j];
    if (!isFinite(dmin)) dmin = 0;
    var span = Math.max(1e-9, gd.dmax - dmin);
    /* ⚠️ L 只给 W>0 的对 —— 这就是「不再有目标距离表」的意思。 */
    var L = new Float64Array(n * n), hasL = new Uint8Array(n * n);
    for (i = 0; i < n; i++) {
      for (j = i + 1; j < n; j++) {
        if (!(W[i * n + j] > 0)) continue;          // 没关系的对：没有目标距离
        var dh = Math.min(1, Math.max(0, (D[i * n + j] - dmin) / span));
        var v = R[i] + R[j] + O.distFactor * dh * Rbar;
        L[i * n + j] = L[j * n + i] = v;
        hasL[i * n + j] = hasL[j * n + i] = 1;
      }
    }

    var px = new Float64Array(n), py = new Float64Array(n);
    for (i = 0; i < n; i++) { px[i] = cs[i].center.x; py[i] = cs[i].center.y; }

    function recenter() {
      var mx = 0, my = 0;
      for (var q = 0; q < n; q++) { mx += px[q]; my += py[q]; }
      mx /= n; my /= n;
      for (var q2 = 0; q2 < n; q2++) { px[q2] -= mx; py[q2] -= my; }
    }
    /* 应力主步（SMACOF）：只对 W>0 的对求和 */
    function stressStep() {
      var nx = new Float64Array(n), ny = new Float64Array(n);
      for (var a = 0; a < n; a++) {
        var sx = 0, sy = 0, sw = 0;
        for (var b = 0; b < n; b++) {
          if (a === b) continue;
          var w = W[a * n + b];
          if (!(w > 0)) continue;
          var dx = px[a] - px[b], dy = py[a] - py[b];
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 1e-9) {
            var ang = (((a * 7 + b * 13) % 8) * Math.PI) / 4;   // 确定性方向（无随机数）
            dx = Math.cos(ang); dy = Math.sin(ang); d = 1;
          }
          var lab = L[a * n + b];
          sx += w * (px[b] + lab * dx / d);
          sy += w * (py[b] + lab * dy / d);
          sw += w;
        }
        if (sw > 0) { nx[a] = sx / sw; ny[a] = sy / sw; }
        else { nx[a] = px[a]; ny[a] = py[a]; }
      }
      px = nx; py = ny;
    }
    /* 单侧碰撞（Stage 1b 裁决版）：只有 d < C_i+C_j 才推，**没有任何理想距离**。
       平衡距离由应力（弹簧）决定 ⇒ 有关系的团能互相插进去，hub 自然占中心。
       全局弱引力只在团心上加（0.02），节点级不加。 */
    function repulseStep() {
      var gx = 0, gy = 0;
      for (var q = 0; q < n; q++) { gx += px[q]; gy += py[q]; }
      gx /= n; gy /= n;
      for (var a = 0; a < n; a++) {
        for (var b = a + 1; b < n; b++) {
          var need = C[a] + C[b];                     // ⛔ 单侧碰撞：不重叠就没有力
          var dx = px[b] - px[a], dy = py[b] - py[a];
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d >= need) continue;
          if (d < 1e-6) {
            var ang = (((a * 7 + b * 13) % 8) * Math.PI) / 4;
            dx = Math.cos(ang); dy = Math.sin(ang); d = 1e-6;
          }
          var F = O.collide * (need - d) / 2;         // 各推 F/2
          var ux = dx / d, uy = dy / d;
          px[a] -= ux * F; py[a] -= uy * F;
          px[b] += ux * F; py[b] += uy * F;
        }
      }
      for (q = 0; q < n; q++) {                        // 全局弱引力
        px[q] += O.gravity * (gx - px[q]);
        py[q] += O.gravity * (gy - py[q]);
      }
    }

    recenter();
    var seedBox = boxOf(px, py, n);
    for (var round = 0; round < O.rounds; round++) {
      stressStep();
      repulseStep();
      recenter();
    }
    for (i = 0; i < n; i++) cs[i].center = { x: px[i], y: py[i] };

    return {
      ms: layoutNow() - t0, clusters: n,
      seedBox: seedBox, gap: O.gap, rounds: O.rounds,
      relatedPairs: (function () { var c = 0; for (var q = 0; q < n * n; q++) if (hasL[q] && q % n > Math.floor(q / n)) c++; return c; })()
    };
  }

  function boxOf(px, py, n) {
    var mnx = Infinity, mny = Infinity, mxx = -Infinity, mxy = -Infinity;
    for (var q = 0; q < n; q++) {
      if (px[q] < mnx) mnx = px[q]; if (px[q] > mxx) mxx = px[q];
      if (py[q] < mny) mny = py[q]; if (py[q] > mxy) mxy = py[q];
    }
    return { w: Math.max(1, mxx - mnx), h: Math.max(1, mxy - mny), minX: mnx, minY: mny };
  }

  /* ------------------------------------------------------------ 几何小工具 */
  /** 核密度峰（mean-shift，Gaussian 核）；⛔ 不用平均值 —— 会被离群节点拽走 */
  function densityPeak(pts, bw, iters) {
    var m = pts.length;
    if (!m) return { x: 0, y: 0 };
    if (m === 1) return { x: pts[0].x, y: pts[0].y };
    var cx = 0, cy = 0;
    for (var i = 0; i < m; i++) { cx += pts[i].x; cy += pts[i].y; }
    cx /= m; cy /= m;
    var h2 = 2 * Math.max(1e-6, bw) * Math.max(1e-6, bw);
    for (var it = 0; it < (iters || 5); it++) {
      var sw = 0, sx = 0, sy = 0;
      for (var j = 0; j < m; j++) {
        var dx = pts[j].x - cx, dy = pts[j].y - cy;
        var w = Math.exp(-(dx * dx + dy * dy) / h2);
        sw += w; sx += pts[j].x * w; sy += pts[j].y * w;
      }
      if (!(sw > 1e-9)) break;
      var nx = sx / sw, ny = sy / sw;
      if (Math.abs(nx - cx) < 1e-3 && Math.abs(ny - cy) < 1e-3) { cx = nx; cy = ny; break; }
      cx = nx; cy = ny;
    }
    return { x: cx, y: cy };
  }

  /** 每个点的最近邻距离（O(n²)，910 个点 ≈ 83 万次，够用） */
  function nnDistances(pts) {
    var m = pts.length, out = new Array(m);
    for (var i = 0; i < m; i++) {
      var best = Infinity;
      for (var j = 0; j < m; j++) {
        if (i === j) continue;
        var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        var d2 = dx * dx + dy * dy;
        if (d2 < best) best = d2;
      }
      out[i] = Math.sqrt(best === Infinity ? 0 : best);
    }
    return out;
  }

  function medianOf(arr) {
    if (!arr.length) return 0;
    var t = arr.slice().sort(function (a, b) { return a - b; });
    return t[Math.floor(t.length / 2)];
  }

  /* ------------------------------------------------------------ 回执口径 */
  /* ⭐ 所有「判据数」只在这里实现一处，探针脚本不许另写一套口径。 */
  function ranksOf(arr) {
    var idx = [], i;
    for (i = 0; i < arr.length; i++) idx.push(i);
    idx.sort(function (a, b) { return arr[a] - arr[b]; });
    var rk = new Float64Array(arr.length);
    i = 0;
    while (i < idx.length) {
      var j = i;
      while (j + 1 < idx.length && arr[idx[j + 1]] === arr[idx[i]]) j++;
      var avg = (i + j) / 2 + 1;
      for (var q = i; q <= j; q++) rk[idx[q]] = avg;
      i = j + 1;
    }
    return rk;
  }
  function pearson(a, b) {
    var n = a.length, ma = 0, mb = 0, i;
    for (i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
    ma /= n; mb /= n;
    var sa = 0, sb = 0, sab = 0;
    for (i = 0; i < n; i++) {
      var da = a[i] - ma, db = b[i] - mb;
      sa += da * da; sb += db * db; sab += da * db;
    }
    var den = Math.sqrt(sa * sb);
    return den ? sab / den : 0;
  }
  function spearman(a, b) { return pearson(ranksOf(a), ranksOf(b)); }
  function quantiles(arr) {
    if (!arr.length) return null;
    var t = arr.slice().sort(function (a, b) { return a - b; });
    function q(p) { return +t[Math.min(t.length - 1, Math.floor((t.length - 1) * p))].toFixed(4); }
    return { min: q(0), p10: q(0.1), p25: q(0.25), med: q(0.5), p75: q(0.75), p90: q(0.9), max: q(1) };
  }

  /* ------------------------------------------------------------ Phase 3 */
  /** 收尾：宽高比归一 → 团心 / 领域名 / 板块名 = **密度峰**（不用平均值） */
  function organicFinish(graph, liveClusters, cfg, nodes, gap) {
    var t0 = layoutNow();
    var O = cfg.organic;

    /* ---- 3.0 世界尺度倍率（?world=2 试「更像星图」的版本；默认 1.0） ---- */
    if (O.worldScale && O.worldScale !== 1) {
      var sw = O.worldScale;
      nodes.forEach(function (nd) { nd.x *= sw; nd.y *= sw; });
    }

    /* ---- 3.1 宽高比：偏离 [lo,hi] 才做各向异性缩放，系数上限 cap ---- */
    function bboxNow() {
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.forEach(function (nd) {
        if (nd.x < minX) minX = nd.x; if (nd.x > maxX) maxX = nd.x;
        if (nd.y < minY) minY = nd.y; if (nd.y > maxY) maxY = nd.y;
      });
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY,
        w: Math.max(1, maxX - minX), h: Math.max(1, maxY - minY) };
    }
    var bb = bboxNow();
    var aspect0 = bb.w / bb.h;
    var sx = 1, sy = 1;
    if (aspect0 < O.aspectLo) sx = Math.min(O.aspectCap, O.aspectLo / aspect0);
    else if (aspect0 > O.aspectHi) sy = Math.min(O.aspectCap, aspect0 / O.aspectHi);
    var scaleInfo = null;
    if (sx !== 1 || sy !== 1) {
      var cx0 = (bb.minX + bb.maxX) / 2, cy0 = (bb.minY + bb.maxY) / 2;
      nodes.forEach(function (nd) {
        nd.x = cx0 + (nd.x - cx0) * sx;
        nd.y = cy0 + (nd.y - cy0) * sy;
      });
      /* 各向异性缩放会把某些方向的间距压小 ⇒ 补碰撞解决（下面还会再统一补一次） */
      collidePasses(30);
      var bb2 = bboxNow();
      scaleInfo = { from: +aspect0.toFixed(3), to: +(bb2.w / bb2.h).toFixed(3),
        sx: +sx.toFixed(3), sy: +sy.toFixed(3), capped: (sx === O.aspectCap || sy === O.aspectCap) };
    }
    /* 收尾一定要再补一次碰撞：软团井 + 弹簧的平衡点允许部分节点靠得比 gap 更近，
       而验收要求**硬重叠 0**。40 遍足够收敛（每遍 O(n²)，约 15ms）。 */
    function collidePasses(n) {
      for (var pass = 0; pass < n; pass++) {
        var moved = false;
        for (var a = 0; a < nodes.length; a++) {
          for (var b = a + 1; b < nodes.length; b++) {
            var dx = nodes[b].x - nodes[a].x, dy = nodes[b].y - nodes[a].y;
            var d2 = dx * dx + dy * dy;
            if (d2 >= gap * gap || d2 < 1e-9) continue;
            var d = Math.sqrt(d2), push = (gap - d) / 2;
            var qx = (dx / d) * push, qy = (dy / d) * push;
            nodes[b].x += qx; nodes[b].y += qy;
            nodes[a].x -= qx; nodes[a].y -= qy;
            moved = true;
          }
        }
        if (!moved) break;
      }
    }
    collidePasses(240);

    /* ---- 3.2 团心 = 团内节点的密度峰（带宽 = 团内最近邻距离中位数，5 次） ---- */
    liveClusters.forEach(function (c) {
      var pts = c.nodes.map(function (nd) { return { x: nd.x, y: nd.y }; });
      var bw = Math.max(gap * 0.5, medianOf(nnDistances(pts)));
      var p = densityPeak(pts, bw, O.densityIters);
      c.center = { x: p.x, y: p.y };
      c._bw = bw;
    });

    /* ---- 3.3 领域名 / 板块名 = 成员节点的密度峰（带宽 = 全体中位最近邻 ×1.5） ---- */
    var allPts = nodes.map(function (nd) { return { x: nd.x, y: nd.y }; });
    var gbw = Math.max(gap, medianOf(nnDistances(allPts))) * 1.5;
    graph.regions.forEach(function (r) {
      var pts = [];
      nodes.forEach(function (nd) {
        if (nd.regions && nd.regions.indexOf(r.id) >= 0) pts.push({ x: nd.x, y: nd.y });
      });
      if (!pts.length) return;
      var p = densityPeak(pts, gbw, O.densityIters);
      r.center = { x: p.x, y: p.y };
    });
    (graph.sectors || []).forEach(function (s) {
      var ids = Object.create(null);
      (s.regions || []).forEach(function (r) { ids[r.id] = 1; });
      var pts = [];
      nodes.forEach(function (nd) {
        for (var q = 0; q < (nd.regions || []).length; q++) {
          if (ids[nd.regions[q]]) { pts.push({ x: nd.x, y: nd.y }); return; }
        }
      });
      if (!pts.length) return;
      s.stat = densityPeak(pts, gbw, O.densityIters);
    });

    var bb3 = bboxNow();
    return {
      ms: layoutNow() - t0,
      aspectFrom: +aspect0.toFixed(3),
      aspectTo: +(bb3.w / bb3.h).toFixed(3),
      scale: scaleInfo,
      bandwidth: { region: Math.round(gbw) }
    };
  }

  MG.layoutMetrics = function (graph) {
    var all = graph.clusters.filter(function (c) { return c.stat; });
    var adj = clusterAdjacency(graph, all);
    var cs = adj.cs, n = adj.n, W = adj.W;
    var gd = clusterGraphDist(adj);
    var D = gd.D;

    var xs = [], wr = [], dd = [], lx = [], lw = [], ld = [], ux2 = [];
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        var A = cs[i].stat, B = cs[j].stat;
        if (!A || !B) continue;
        var dw = U.dist(A.cx, A.cy, B.cx, B.cy);
        xs.push(dw); wr.push(W[i * n + j]); dd.push(D[i * n + j]);
        if (W[i * n + j] > 0) { lx.push(dw); lw.push(W[i * n + j]); ld.push(D[i * n + j]); }
        else ux2.push(dw);
      }
    }
    function med(arr) {
      if (!arr.length) return 0;
      var t = arr.slice().sort(function (a, b) { return a - b; });
      return t[Math.floor(t.length / 2)];
    }
    var linkedMed = med(lx), unlinkedMed = med(ux2);
    var below = 0;
    for (var u = 0; u < ux2.length; u++) if (ux2[u] < linkedMed) below++;

    /* ---------- 7.1 环形度 ---------- */
    /* 团内环形度：节点到团心的距离 CV（0 = 完美圆环，0.25+ = 有机） */
    var cvList = [], spiralVarList = [];
    graph.clusters.forEach(function (c) {
      if (!c.stat || !c.nodes || c.nodes.length < 6) return;
      var cx = c.stat.cx, cy = c.stat.cy, m = c.nodes.length;
      var ds = [], angs = [];
      for (var q = 0; q < m; q++) {
        var nd = c.nodes[q];
        ds.push(U.dist(nd.x, nd.y, cx, cy));
        angs.push(Math.atan2(nd.y - cy, nd.x - cx));
      }
      var mu = 0;
      for (q = 0; q < m; q++) mu += ds[q];
      mu /= m;
      if (mu > 1e-6) {
        var va = 0;
        for (q = 0; q < m; q++) { var t = ds[q] - mu; va += t * t; }
        cvList.push({ id: c.id, cv: Math.sqrt(va / m) / mu });
      }
      /* 螺旋残留：极角排序后**相邻极角差**的变异系数（完美圆环 = 0） */
      angs.sort(function (a, b) { return a - b; });
      var gaps = [];
      for (q = 0; q < m; q++) {
        var g0 = angs[(q + 1) % m] - angs[q];
        if (g0 < 0) g0 += Math.PI * 2;
        gaps.push(g0);
      }
      var gm = 0;
      for (q = 0; q < m; q++) gm += gaps[q];
      gm /= m;
      if (gm > 1e-6) {
        var gv = 0;
        for (q = 0; q < m; q++) { var t2 = gaps[q] - gm; gv += t2 * t2; }
        spiralVarList.push({ id: c.id, cv: Math.sqrt(gv / m) / gm });
      }
    });
    var cvVals = cvList.map(function (o) { return o.cv; });
    var spVals = spiralVarList.map(function (o) { return o.cv; });
    cvList.sort(function (a, b) { return b.cv - a.cv; });

    /* 全局环形度：ρ(团心到全局质心距离, 该团总度) —— 高度数团全挤在外圈就是「圆」 */
    var gx = 0, gy = 0, gdeg = [], gdist = [];
    for (i = 0; i < n; i++) { gx += cs[i].stat.cx; gy += cs[i].stat.cy; }
    gx /= n; gy /= n;
    for (i = 0; i < n; i++) {
      gdist.push(U.dist(cs[i].stat.cx, cs[i].stat.cy, gx, gy));
      var deg = 0;
      for (var q2 = 0; q2 < cs[i].nodes.length; q2++) deg += (cs[i].nodes[q2].degree || 0);
      gdeg.push(deg);
    }

    /* ---------- 7.2 位置质量 ---------- */
    var pts = graph.nodes.map(function (nd) { return { x: nd.x, y: nd.y }; });
    var nn = nnDistances(pts);
    /* 硬重叠：节点对距离 < minGap 的数量（0 才算过） */
    var minGap = (MG.config.layout.organic && MG.config.layout.organic.gap) || MG.config.layout.minGap;
    var hard = 0;
    for (i = 0; i < pts.length; i++) {
      for (var j2 = i + 1; j2 < pts.length; j2++) {
        var ddx = pts[i].x - pts[j2].x, ddy = pts[i].y - pts[j2].y;
        if (ddx * ddx + ddy * ddy < minGap * minGap * 0.999) hard++;
      }
    }

    /* 团盘重叠普查（stat.radius） */
    var sameSector = 0, crossSector = 0, deepest = 0, deepestPair = '', pairs = 0;
    for (i = 0; i < n; i++) {
      for (var j3 = i + 1; j3 < n; j3++) {
        var a = cs[i].stat, b = cs[j3].stat;
        var need = a.radius + b.radius;
        var d2 = U.dist(a.cx, a.cy, b.cx, b.cy);
        if (d2 >= need) continue;
        pairs++;
        var ratio = (need - d2) / Math.min(a.radius, b.radius);
        var sec = function (c) {
          var r = c.parent && graph.regionById[c.parent];
          return (r && r.sector) || '';
        };
        if (sec(cs[i]) === sec(cs[j3])) sameSector++; else crossSector++;
        if (ratio > deepest) { deepest = ratio; deepestPair = cs[i].id + '↔' + cs[j3].id; }
      }
    }

    /* 9×9 跨领域：平均团心距离 vs 强边（推出 + 等价）条数 */
    var regs = graph.regions.filter(function (r) { return r.stat; });
    var table = [];
    for (i = 0; i < regs.length; i++) {
      var row = [];
      for (var j4 = 0; j4 < regs.length; j4++) {
        var dists = [], cnt = 0;
        for (var a2 = 0; a2 < n; a2++) {
          for (var b2 = 0; b2 < n; b2++) {
            if (cs[a2].parent !== regs[i].id || cs[b2].parent !== regs[j4].id) continue;
            if (a2 === b2) continue;
            dists.push(U.dist(cs[a2].stat.cx, cs[a2].stat.cy, cs[b2].stat.cx, cs[b2].stat.cy));
          }
        }
        var addPairs = function (ri, rj) {
          graph.edges.forEach(function (e) {
            if (e.kind !== 'implication' && e.kind !== 'equivalence') return;
            var ids = MG.graphUtil.edgeNodes(e);
            for (var x = 0; x < ids.length; x++) {
              for (var y = x + 1; y < ids.length; y++) {
                var nx = graph.byId[ids[x]], ny = graph.byId[ids[y]];
                if (!nx || !ny || !nx.clusterObj || !ny.clusterObj) continue;
                if (nx.cluster === ny.cluster) continue;
                if (nx.clusterObj.parent !== ri || ny.clusterObj.parent !== rj) continue;
                cnt++;
              }
            }
          });
        };
        addPairs(regs[i].id, regs[j4].id);
        if (i !== j4) addPairs(regs[j4].id, regs[i].id);
        var mean = 0;
        for (var q3 = 0; q3 < dists.length; q3++) mean += dists[q3];
        mean = dists.length ? mean / dists.length : 0;
        row.push({ meanDist: Math.round(mean), strong: cnt });
      }
      table.push({ region: regs[i].id, name: regs[i].name, cells: row });
    }
    var bb = graph.bbox();
    return {
      clusters: n,
      pairs: xs.length,
      rho: {
        distVsWraw: +spearman(xs, wr).toFixed(4),
        distVsD: +spearman(xs, dd).toFixed(4)
      },
      rhoLinked: {
        pairs: lx.length,
        distVsWraw: +spearman(lx, lw).toFixed(4),
        distVsD: +spearman(lx, ld).toFixed(4)
      },
      distStats: {
        linkedMed: Math.round(linkedMed), unlinkedMed: Math.round(unlinkedMed),
        unlinkedPairs: ux2.length,
        unlinkedBelowLinkedMed: ux2.length ? +(below / ux2.length).toFixed(3) : 0
      },
      /* 7.1 环形度 */
      ring: {
        clusters: cvVals.length,
        intraCV: quantiles(cvVals),
        roundest: cvList.slice(0, 3).map(function (o) { return { id: o.id, cv: +o.cv.toFixed(4) }; }),
        cvHist: (function () {
          var bins = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 99], out2 = [];
          for (var b = 0; b < bins.length - 1; b++) {
            var c2 = 0;
            for (var q4 = 0; q4 < cvVals.length; q4++) if (cvVals[q4] >= bins[b] && cvVals[q4] < bins[b + 1]) c2++;
            out2.push({ from: bins[b], to: bins[b + 1] === 99 ? null : bins[b + 1], n: c2 });
          }
          return out2;
        })(),
        spiralVar: quantiles(spVals),
        global: +spearman(gdist, gdeg).toFixed(4)
      },
      /* 7.2 位置质量 */
      nn: { med: Math.round(medianOf(nn)), min: Math.round(Math.min.apply(null, nn)), max: Math.round(Math.max.apply(null, nn)) },
      hardOverlap: hard,
      overlap: { pairs: pairs, sameSector: sameSector, crossSector: crossSector,
        deepest: +deepest.toFixed(3), deepestPair: deepestPair },
      crossRegion: table,
      bbox: { w: Math.round(bb.maxX - bb.minX), h: Math.round(bb.maxY - bb.minY) }
    };
  };

  /* ==================================================================== */
  function computeLayout(graph) {
    var cfg = MG.config.layout;
    var ccfg = MG.config.cluster;
    var nodes = graph.nodes;
    if (!nodes.length) return;
    var tAll = layoutNow();
    /* ⭐ 布局模式（2026-10-18 · Stage 1a）：默认仍是 'packed'（今天的样子），
       `?layout=organic` / `#layout=organic` 才走「应力 + 软斥力 + 真实节点松弛」。
       ⛔ 验收通过前不许改默认值。 */
    var mode = urlFlag('layout', ['packed', 'organic']) || cfg.mode || 'packed';
    var organic = mode === 'organic';

    /* -------------------------------------------------------- 0. 准备 */
    // 星系中心整体外扩：regions.js 里的坐标是手写的「大致方位」，这里按
    // `regionSpread` 等比拉开，给星团之间的空带腾地方。存一份基准值，
    // 反复调用 computeLayout 也不会越乘越大。
    graph.regions.forEach(function (r) {
      if (!r._baseCenter) r._baseCenter = { x: r.center.x, y: r.center.y };
      r.center = { x: r._baseCenter.x * cfg.regionSpread, y: r._baseCenter.y * cfg.regionSpread };
    });

    nodes.forEach(function (n) {
      n.target = regionTarget(n, graph);
      n.regionObjs = n.regions.map(function (id) { return graph.regionById[id]; }).filter(Boolean);
      n.isBorder = n.regionObjs.length > 1;
      n.degree = (graph.adj[n.id] || []).length;
      n.galaxy = n.clusterObj ? graph.galaxyOf(n.clusterObj) : (n.regionObjs[0] || null);
      /* 四层结构：节点属于哪个**大板块**（取主归属领域那一块）。
         只用来给跨板块的边打折，不影响任何坐标的语义。 */
      n._sector = (n.regionObjs[0] && n.regionObjs[0].sector) || '';
    });

    graph.regions.forEach(function (r) {
      r._cap = Math.max(discRadius(nodes.filter(function (n) { return n.regions.indexOf(r.id) >= 0; }).length,
        cfg.capacityFactor), 140);
    });

    /* -------------------------------------------- 1. 星团在星系内排布 */
    var liveClusters = [];
    graph.clusters.forEach(function (c) {
      c.nodes = c.nodes.filter(function (n) { return nodes.indexOf(n) >= 0; });
      if (!c.nodes.length) { c.center = null; c._cap = 0; return; }
      // 行星-卫星摆法：先把这一团真实占多大地方量出来 —— 星团的地盘 = 那一圈
      // 卫星的外接半径 + 一点余量。宁可团间留白，也不要两个星团的节点互相穿插。
      var ext = planetaryAnchors(graph, c, 0, 0, ccfg.planetary);
      c._cap = Math.max(ext + ccfg.cloudPadding, ccfg.minRadius);
      var g = graph.galaxyOf(c);
      c.center = g ? { x: g.center.x, y: g.center.y } : { x: 0, y: 0 };
      liveClusters.push(c);
    });

    /* -------------------------------------------- 1b. 团间耦合 → 摆放方向 */
    /* 每个团往「它连得最多的那些团所在的星系」那一侧靠。
       为什么需要：团的位置以前只由「星系内第几个」决定，于是范畴论里跟同调代数
       关系最紧的「拓扑斯」被摆到星系西缘、离同调 8000 —— 用户看到的
       「很多超长线」有一半是这么来的。这里只改**星系内的方位**，不动星系中心。
       ⚠️ 权重按边的语义分档：定义引用几乎占全部连线（1373/1637），
          如果按条数算，一个节点的定义被谁引用得多就会压过真正的推导关系。 */
    var KIND_W = { implication: 3, equivalence: 2, definition: 1, analogy: 0 };
    var pairW = Object.create(null);          // "a|b" → 权重
    graph.edges.forEach(function (e) {
      var w = KIND_W[e.kind] == null ? 1 : KIND_W[e.kind];
      if (!w) return;
      var ids = MG.graphUtil.edgeNodes(e);
      var cs = [];
      for (var i = 0; i < ids.length; i++) {
        var nd = graph.byId[ids[i]];
        if (nd && nd.cluster) cs.push(nd.cluster);
      }
      for (var a = 0; a < cs.length; a++) {
        for (var b = a + 1; b < cs.length; b++) {
          if (cs[a] === cs[b]) continue;
          var key = cs[a] < cs[b] ? cs[a] + '|' + cs[b] : cs[b] + '|' + cs[a];
          pairW[key] = (pairW[key] || 0) + w;
        }
      }
    });
    var clusterW = Object.create(null);        // cid → [{to, w}]
    Object.keys(pairW).forEach(function (key) {
      var p = key.split('|');
      (clusterW[p[0]] = clusterW[p[0]] || []).push({ to: p[1], w: pairW[key] });
      (clusterW[p[1]] = clusterW[p[1]] || []).push({ to: p[0], w: pairW[key] });
    });
    liveClusters.forEach(function (c) {
      var reg = graph.galaxyOf(c);
      var base = (U.hashString(c.id) % 628) / 100;   // 没有外连时的兜底角度
      var wsum = 0, vx = 0, vy = 0;
      (clusterW[c.id] || []).forEach(function (t) {
        var o = graph.clusterById[t.to];
        var r2 = (o && o.parent) ? graph.regionById[o.parent] : null;
        if (!r2) return;
        wsum += t.w; vx += r2.center.x * t.w; vy += r2.center.y * t.w;
      });
      c._extW = wsum;
      if (!wsum || !reg) { c._prefAngle = base; return; }
      var dx = vx / wsum - reg.center.x, dy = vy / wsum - reg.center.y;
      c._prefAngle = (Math.abs(dx) + Math.abs(dy) < 1) ? base : Math.atan2(dy, dx);
    });

    graph.regions.forEach(function (reg) {
      var mine = liveClusters.filter(function (c) { return c.parent === reg.id; });
      if (!mine.length) return;

      if (mine.length === 1) {
        mine[0].center = { x: reg.center.x, y: reg.center.y };
        reg._cap = Math.max(reg._cap, mine[0]._cap + 60);
        return;
      }

      /* ⭐ 紧凑圆盘打包（2026-10-18）。旧写法把所有团均布在**一条圆环**上：
         K 个团时 ringR = (2·maxCap + blank) / (2 sin(π/K))，K=17（分析学）时
         ≈ 2100 —— 团被甩到离星系中心 2000 外，两个星系的环在中间交叉，
         于是「预层」和「测度」摆到了同一块（用户原话），跨星系的线也跟着变长。
         新写法：从内往外一圈圈找空位，盘与盘只留 gap；方向优先朝向
         「它的边连得最多的那个星系」（_prefAngle）。
         ⇒ 星系是紧凑的圆盘而不是空心大环，团不会越界，外连多的团靠向对方。 */
      var gap = Math.max(48, ccfg.blank * 0.20);       // blank 300 → 60
      var placed = [];
      mine.slice().sort(function (a, b) {
        /* 大的先放（占位能力强），连得多的次之 —— 免得大团被挤到外圈 */
        return (b._cap - a._cap) || (b._extW - a._extW) || (a.id < b.id ? -1 : 1);
      }).forEach(function (c) {
        var pick = null;
        for (var rr = 0; rr <= 3200 && !pick; rr += 50) {
          var slots = rr < 1 ? 1 : Math.max(6,
            Math.round(2 * Math.PI * rr / Math.max(150, (c._cap + gap) * 1.6)));
          for (var s = 0; s < slots; s++) {
            /* 从「朝向伙伴星系」的角度开始，左右交替试 —— 越近越优先 */
            var off = (s % 2 ? 1 : -1) * Math.ceil(s / 2) * (2 * Math.PI / slots);
            var th = c._prefAngle + off;
            var x = Math.cos(th) * rr, y = Math.sin(th) * rr;
            var ok = true;
            for (var q = 0; q < placed.length; q++) {
              var pp = placed[q];
              var ddx = x - pp.x, ddy = y - pp.y;
              var need = c._cap + pp.c._cap + gap;
              if (ddx * ddx + ddy * ddy < need * need) { ok = false; break; }
            }
            if (ok) { pick = { x: x, y: y }; break; }
          }
        }
        if (!pick) pick = { x: 0, y: 0 };             // 兜底（不该发生）
        placed.push({ c: c, x: pick.x, y: pick.y });
        c.center = { x: reg.center.x + pick.x, y: reg.center.y + pick.y };
      });

      /* 星系圆盘 = 实际外接半径（不是环半径）；给跨星系节点/云留一点余量 */
      var far = 0;
      placed.forEach(function (p) {
        far = Math.max(far, Math.sqrt(p.x * p.x + p.y * p.y) + p.c._cap);
      });
      reg._cap = Math.max(reg._cap, far + 60);
    });

    /* ⭐ 2026-10-18 · 四层结构的最后一刀：**大板块聚成一团，板块之间留空**
       ------------------------------------------------------------------
       改之前 9 个领域的圆盘是「贴着长」的：最大的几对边缘只差 150~300
       世界单位（拓扑学 ↔ 凝聚态甚至**重叠** 446），于是全景是一片连绵的岛链，
       不像 4 块板。验收口径是用户转述的那句：**遮住标题也要认得出板块**。

       两条规则，都是纯几何（不动任何内容，不改星团/节点的摆法）：
         · **同板块内**：领域之间不该拉太开 —— 净空超过 `sectorInnerGap`
           就互相拉近（否则「数理逻辑」4 个点会孤零零飘在板块外面）。
         · **跨板块**：净空至少 `sectorGap`，不够就各让一半推开。

       ⚠️ 顺序是先收拢、再推开：反过来的话，收拢那一步会把好不容易推开的板块
          又拉回来。
       ⚠️ 位置在**星团打包之后、节点锚点之前**：这时 `reg._cap` 才是最终值
          （上面那行 `max(reg._cap, far+60)` 量的是星团真实外接半径）。
          早一步用「按节点数估的容量盘」会小看大领域，推了等于没推。
       ⚠️ 移动领域 = 连同它的星团一起平移（节点锚点在下一步才由星团中心算）。 */
    (function packSectors() {
      /* ⛔ organic 模式里**没有板块**：不推净空、不设边界。装箱结果只当种子。 */
      if (organic) return;
      var outer = cfg.sectorGap || 0;
      var inner = cfg.sectorInnerGap == null ? 160 : cfg.sectorInnerGap;
      var list = graph.regions.filter(function (r) { return !!r.center; });
      if (list.length < 2) return;

      function resolve(maxIt, damp, cross) {
        /* cross = true：**跨**板块，够不着就推开；false：**同**板块，太远就拉近 */
        var limit = cross ? outer : inner;
        for (var it = 0; it < maxIt; it++) {
          var worst = 0;
          for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
              var a = list[i], b = list[j];
              /* 没写板块的领域（理论上不该有）一律按「不同板块」处理，安全 */
              var sameSector = (a.sector && b.sector && a.sector === b.sector);
              if (cross === sameSector) continue;
              var dx = b.center.x - a.center.x, dy = b.center.y - a.center.y;
              var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
              var need = a._cap + b._cap + limit;
              var delta = cross ? (need - d) : (d - need);
              if (delta <= 0.5) continue;
              if (delta > worst) worst = delta;
              var move = delta * 0.5 * damp;
              var ux = dx / d, uy = dy / d;
              /* ⚠️ 方向：`u` 是 a → b。收拢时 a 朝 b 走（+u），推开时 a 背离 b（−u）。
                 两条规则共用同一段代码，符号写反就会「越推越近」（踩过）。 */
              var sgn = cross ? -1 : 1;
              /* 稀疏时方向由 dx,dy 决定；两点重合时 dx,dy 会退化，前面 ||0.01 兜住 */
              a.center.x += ux * move * sgn; a.center.y += uy * move * sgn;
              b.center.x -= ux * move * sgn; b.center.y -= uy * move * sgn;
            }
          }
          if (worst < 0.5) break;
        }
      }

      var before = list.map(function (r) { return { x: r.center.x, y: r.center.y }; });
      if (inner >= 0) resolve(120, 0.5, false);       // 1) 板块内收拢
      if (outer > 0) resolve(240, 1.0, true);         // 2) 板块间推开
      list.forEach(function (r, i) {
        var mx = r.center.x - before[i].x, my = r.center.y - before[i].y;
        if (!mx && !my) return;
        graph.clusters.forEach(function (c) {
          if (c.parent !== r.id || !c.center) return;
          c.center = { x: c.center.x + mx, y: c.center.y + my };
        });
      });
    })();

    /* ⭐ organic 模式：装箱结果降级成**种子**，团心由 Phase 1 解出来。
       必须在「节点锚点」之前 —— 锚点是按团心算的。 */
    var organicInfo = null;
    if (organic) {
      organicInfo = organicCenters(graph, liveClusters, cfg);
      /* Phase 2 的螺旋种子 / 软团井都要 R_c；先算好挂在团上 */
      liveClusters.forEach(function (c) {
        c._Rc = cfg.organic.rScale * cfg.organic.gap * Math.sqrt(Math.max(1, c.nodes.length));
      });
    }

    /* ------------------------------------------------ 2. 节点锚点 */
    var buckets = Object.create(null);   // 无星团节点按星系分桶
    var borders = [], orphans = [];

    // 2a. 有星团的节点：organic = 黄金角螺旋种子；packed = 行星-卫星锚点
    liveClusters.forEach(function (c) {
      if (organic) {
        /* Phase 2 种子：黄金角螺旋（θ = m·2.39996，ρ = 0.55·R_c·√((m+0.5)/n)）
           —— 这一条直接消灭「一个点绕一圈点」（行星 + 环）。 */
        var m0 = c.nodes.length, Rc0 = c._Rc || cfg.organic.gap;
        c.nodes.forEach(function (node, idx) {
          var th = idx * GOLDEN;
          var rho = cfg.organic.seedRadius * Rc0 * Math.sqrt((idx + 0.5) / Math.max(1, m0));
          node.anchor = {
            x: c.center.x + rho * Math.cos(th),
            y: c.center.y + rho * Math.sin(th)
          };
        });
        return;
      }
      planetaryAnchors(graph, c, c.center.x, c.center.y, ccfg.planetary);

      // 跨板块：整颗「行星系」朝「另一个星系」那一侧挪，落在交界带
      c.nodes.forEach(function (node) {
        if (!node.isBorder) return;
        var others = node.regionObjs.filter(function (r) { return r.id !== c.parent; });
        if (!others.length) return;
        var t = others[0].center;
        var dx = t.x - c.center.x, dy = t.y - c.center.y;
        var L = Math.sqrt(dx * dx + dy * dy) || 1;
        var push = c._cap * 0.62;
        node.anchor.x += (dx / L) * push;
        node.anchor.y += (dy / L) * push;
      });
    });

    // 2b. 没有星团的节点：还在星系圆盘里铺（老逻辑）
    nodes.forEach(function (n) {
      if (n.clusterObj) return;
      if (!n.regionObjs.length) { orphans.push(n); return; }
      if (n.isBorder) { borders.push(n); return; }
      var rid = n.regionObjs[0].id;
      (buckets[rid] = buckets[rid] || []).push(n);
    });

    Object.keys(buckets).forEach(function (rid) {
      var region = graph.regionById[rid];
      var list = buckets[rid].slice().sort(function (a, b) {
        if (b.degree !== a.degree) return b.degree - a.degree;
        return a.id < b.id ? -1 : 1;
      });
      var n = list.length;
      var R = Math.max(region._cap * 0.8, 60);
      var phase = (U.hashString(rid) % 628) / 100;
      list.forEach(function (node, i) {
        var rr = R * Math.sqrt((i + 0.42) / n);
        var th = i * GOLDEN + phase;
        node.anchor = { x: region.center.x + rr * Math.cos(th), y: region.center.y + rr * Math.sin(th) };
      });
    });

    // 2c. 跨星系又没星团：沿「星系连线的法向」错开（老逻辑）
    borders.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
    borders.forEach(function (node, i) {
      var ordered = node.regionObjs.slice().sort(function (a, b) { return a.id < b.id ? -1 : 1; });
      var first = ordered[0], last = ordered[ordered.length - 1];
      var dx = last.center.x - first.center.x, dy = last.center.y - first.center.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = -dy / len, ny = dx / len;
      var side = (i % 2 === 0) ? 1 : -1;
      var rank = Math.floor(i / 2) + 1;
      var off = side * (44 + rank * 52);
      var along = ((i % 3) - 1) * 40;
      node.anchor = {
        x: node.target.x + nx * off + (dx / len) * along,
        y: node.target.y + ny * off + (dy / len) * along
      };
    });

    orphans.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
    orphans.forEach(function (node, i) {
      node.anchor = { x: -180 + (i % 5) * 120, y: 820 + Math.floor(i / 5) * 120 };
    });

    nodes.forEach(function (n) { if (n.anchor) { n.x = n.anchor.x; n.y = n.anchor.y; } });

    /* ---------------------------------------------------- 3. 松弛 */
    /* organic：把长度尺度从 idealDist(120) 换成 gap(26)，**系数一个不动**
       （斥力 0.12 / 弹簧 0.9 / 温度衰减形状 / 碰撞解算全部沿用）。
       ⚠️ 温度是「单步最大位移」，也是长度量纲 —— 按 gap/idealDist 同比例缩，
          否则每步能跳 62 而节点间距只有 26，直接炸开。 */
    var LEN = organic ? cfg.organic.gap / cfg.idealDist : 1;
    var k = cfg.idealDist * LEN;
    var cutoff = k * 2.4, cutoff2 = cutoff * cutoff;
    var springLen = k * cfg.springLenFactor;

    var pairs = [];
    graph.edges.forEach(function (e) {
      var ids = MG.graphUtil.edgeNodes(e);
      var w = e.kind === 'implication' ? 1 : (e.kind === 'equivalence' ? 1.15 : 0.35);
      for (var a = 0; a < ids.length; a++) {
        for (var b = a + 1; b < ids.length; b++) {
          var ia = indexOf(nodes, ids[a]), ib = indexOf(nodes, ids[b]);
          if (ia < 0 || ib < 0) continue;
          pairs.push([ia, ib, w, nodes[ia]._sector !== nodes[ib]._sector]);
        }
      }
    });

    var N = nodes.length;
    var gcx = 0, gcy = 0;
    liveClusters.forEach(function (c) { gcx += c.center.x; gcy += c.center.y; });
    gcx /= Math.max(1, liveClusters.length); gcy /= Math.max(1, liveClusters.length);
    var disp = new Float64Array(N * 2);
    var i, j, dx, dy, d, d2, f, ux, uy, step, n;

    /* ⚠️ organic 模式**真的要跑**这轮节点松弛（Phase 2 的全部意义就在这儿）：
       种子是螺旋，靠斥力/弹簧/软团井把「一圈点」揉开成有机形状。
       步数 250（或最大位移 < 0.5 提前停），不是 700。 */
    var iters = organic ? cfg.organic.nodeIter : cfg.iterations;
    var nodeGap = organic ? cfg.organic.gap : cfg.minGap;
    var nodeRepelR = organic ? cfg.organic.nodeRepel * cfg.organic.gap : 0;
    var ranIters = iters;
    if (organic) { cutoff = nodeRepelR; cutoff2 = cutoff * cutoff; }   // 短程斥力半径

    for (var iter = 0; iter < iters; iter++) {
      var t = iter / Math.max(1, iters - 1);
      var temp = U.lerp(cfg.temp0, cfg.temp1, t * t) * LEN * (organic ? (1 - 0.95 * t) : 1);
      for (i = 0; i < N * 2; i++) disp[i] = 0;

      /* 每 5 步刷新各团的**当前质心**（软井追它） */
      if (organic && iter % 5 === 0) {
        var acc = Object.create(null);
        for (i = 0; i < N; i++) {
          var cn = nodes[i].clusterObj;
          if (!cn) continue;
          var ac = acc[cn.id] || (acc[cn.id] = { c: cn, x: 0, y: 0, n: 0 });
          ac.x += nodes[i].x; ac.y += nodes[i].y; ac.n++;
        }
        Object.keys(acc).forEach(function (kk) {
          var a2 = acc[kk];
          a2.c._cur = { x: a2.x / a2.n, y: a2.y / a2.n };
        });
      }

      /* 3a. 排斥（organic：短程网格，只算 nodeRepel·gap 内的邻居；packed：原样 O(n²)） */
      if (organic) {
        var cell = Math.max(1, nodeRepelR);
        var buckets = Object.create(null);
        for (i = 0; i < N; i++) {
          var bx = Math.floor(nodes[i].x / cell), by = Math.floor(nodes[i].y / cell);
          var bk = bx + ',' + by;
          (buckets[bk] || (buckets[bk] = [])).push(i);
        }
        for (i = 0; i < N; i++) {
          var bx0 = Math.floor(nodes[i].x / cell), by0 = Math.floor(nodes[i].y / cell);
          for (var ox = -1; ox <= 1; ox++) {
            for (var oy = -1; oy <= 1; oy++) {
              var lst = buckets[(bx0 + ox) + ',' + (by0 + oy)];
              if (!lst) continue;
              for (var li = 0; li < lst.length; li++) {
                j = lst[li];
                if (j <= i) continue;
                dx = nodes[i].x - nodes[j].x; dy = nodes[i].y - nodes[j].y;
                d2 = dx * dx + dy * dy;
                if (d2 < 1e-6) { dx = 0.7 + (i - j) * 0.13; dy = 0.4; d2 = dx * dx + dy * dy; }
                if (d2 > cutoff2) continue;
                d = Math.sqrt(d2);
                f = (k * k / d) * cfg.repulsion;
                ux = dx / d; uy = dy / d;
                disp[i * 2] += ux * f; disp[i * 2 + 1] += uy * f;
                disp[j * 2] -= ux * f; disp[j * 2 + 1] -= uy * f;
              }
            }
          }
        }
      } else {
        for (i = 0; i < N; i++) {
          var ni = nodes[i];
          for (j = i + 1; j < N; j++) {
            var nj = nodes[j];
            dx = ni.x - nj.x; dy = ni.y - nj.y;
            d2 = dx * dx + dy * dy;
            if (d2 < 1e-6) { dx = 0.7 + (i - j) * 0.13; dy = 0.4; d2 = dx * dx + dy * dy; }
            if (d2 > cutoff2) continue;
            d = Math.sqrt(d2);
            f = (k * k / d) * cfg.repulsion;
            ux = dx / d; uy = dy / d;
            disp[i * 2] += ux * f; disp[i * 2 + 1] += uy * f;
            disp[j * 2] -= ux * f; disp[j * 2 + 1] -= uy * f;
          }
        }
      }

      /* 3b. 弹簧 */
      for (var s = 0; s < pairs.length; s++) {
        i = pairs[s][0]; j = pairs[s][1];
        dx = nodes[i].x - nodes[j].x; dy = nodes[i].y - nodes[j].y;
        d = Math.sqrt(dx * dx + dy * dy) || 1;
        f = ((d - springLen) / d) * cfg.spring * pairs[s][2] * k * 0.55;
        /* 跨大板块的边打折：关系照画，但别把四个板块往中间拽。 */
        if (pairs[s][3]) f *= (cfg.crossSectorPull == null ? 1 : cfg.crossSectorPull);
        if (f > cfg.springMax) f = cfg.springMax;
        else if (f < -cfg.springMax) f = -cfg.springMax;
        disp[i * 2] -= (dx / d) * f; disp[i * 2 + 1] -= (dy / d) * f;
        disp[j * 2] += (dx / d) * f; disp[j * 2 + 1] += (dy / d) * f;
      }

      /* 3c. 锚点拉力 + 星团软边界 */
      for (i = 0; i < N; i++) {
        n = nodes[i];
        if (n.pinned || !n.anchor) continue;
        f = n.isBorder ? cfg.borderPull : cfg.anchorPull;
        disp[i * 2] += (n.anchor.x - n.x) * f;
        disp[i * 2 + 1] += (n.anchor.y - n.y) * f;
        /* ⛔ 节点级不加全局引力（1b 实测会把密度压平、ρ 掉到 0）。 */

        // 团容器：organic = **软团井**（越出去越被拉回，不是不许出去）；packed = 软墙
        if (n.clusterObj && n.clusterObj.center) {
          /* 软团井追**当前质心**（每 5 步刷新），不是 Phase 1 的种子中心 ——
             否则交叠区会把节点顶出去又被拽回来，就是那 1307 个硬重叠。 */
          var cc0 = n.clusterObj._cur || n.clusterObj.center;
          var cx = cc0.x, cy = cc0.y;
          var vx = n.x - cx, vy = n.y - cy;
          var vd = Math.sqrt(vx * vx + vy * vy) || 1;
          if (organic) {
            var soft = cfg.organic.wellFrom * (n.clusterObj._Rc || cfg.organic.gap);
            if (vd > soft) {
              var pull2 = cfg.organic.wellPull * (vd - soft);              disp[i * 2] -= (vx / vd) * pull2;
              disp[i * 2 + 1] -= (vy / vd) * pull2;
            }
          } else {
            var lim = n.clusterObj._cap * 1.28 + 30;
            if (vd > lim) {
              var pull = (vd - lim) * 0.10;
              disp[i * 2] -= (vx / vd) * pull;
              disp[i * 2 + 1] -= (vy / vd) * pull;
            }
          }
        }
      }

      /* 3d. 应用位移 */
      var cap = Math.max(temp, 0.05);
      var maxStep = 0;
      for (i = 0; i < N; i++) {
        if (nodes[i].pinned) continue;
        var px = disp[i * 2], py = disp[i * 2 + 1];
        var pl = Math.sqrt(px * px + py * py);
        if (pl < 1e-9) continue;
        step = Math.min(pl, cap);
        if (step > maxStep) maxStep = step;
        nodes[i].x += (px / pl) * step;
        nodes[i].y += (py / pl) * step;
      }
      /* organic：最大位移 < 0.5 就提前停（packed 绝不早停 —— 那会改变它今天的样子） */
      if (organic && maxStep < 0.5) { ranIters = iter + 1; break; }

      /* 3e. 硬性碰撞 */
      var collideFrom = organic ? 0 : cfg.iterations * 0.3;
      if (iter > collideFrom) {
        var minGap = nodeGap;
        for (i = 0; i < N; i++) {
          for (j = i + 1; j < N; j++) {
            dx = nodes[j].x - nodes[i].x; dy = nodes[j].y - nodes[i].y;
            d2 = dx * dx + dy * dy;
            if (d2 >= minGap * minGap || d2 < 1e-9) continue;
            d = Math.sqrt(d2);
            var push = (minGap - d) / 2;
            var qx = (dx / d) * push, qy = (dy / d) * push;
            nodes[j].x += qx; nodes[j].y += qy;
            nodes[i].x -= qx; nodes[i].y -= qy;
          }
        }
      }
    }

    /* Phase 3：宽高比归一 → 团心/领域名/板块名改成**密度峰** */
    var finishInfo = null;
    if (organic) finishInfo = organicFinish(graph, liveClusters, cfg, nodes, nodeGap);

    /* -------------------------------------------- 4. 云统计（星系 / 星团） */
    var bc = MG.config.background;
    graph.regions.forEach(function (r) {
      var list = nodes.filter(function (nd) { return nd.regions.indexOf(r.id) >= 0; });
      if (!list.length) { r.stat = null; return; }
      var singles = list.filter(function (nd) { return !nd.isBorder; });
      var basis = singles.length >= 2 ? singles : list;
      var cx = r.center.x, cy = r.center.y, maxd = 0;
      /* ⭐ 阶段 4：板块云的半径改用**92 分位**而不是最大值。
         用户指着左边那团粉雾说「糊成一片」—— 根因是几个离心很远的跨板块节点
         把 maxd 拉得很长，云半径跟着涨，而那里其实没什么点。
         分位数既保住了「云把内容包住」的观感，又不会为个别远点空摊一大片。 */
      var ds = basis.map(function (nd) { return U.dist(nd.x, nd.y, cx, cy); }).sort(function (a, b) { return a - b; });
      var maxd = ds.length ? ds[Math.min(ds.length - 1, Math.floor(ds.length * 0.88))] : 0;
      r.stat = {
        cx: cx, cy: cy, count: list.length,
        radius: Math.max(bc.cloudRadiusMin, maxd + bc.cloudMargin)
      };
    });

    graph.clusters.forEach(function (c) {
      if (!c.nodes.length) { c.stat = null; return; }
      var cx = 0, cy = 0;
      c.nodes.forEach(function (nd) { cx += nd.x; cy += nd.y; });
      cx /= c.nodes.length; cy /= c.nodes.length;
      /* organic：团心用 Phase 3 算的**密度峰**（⛔ 不是平均值 —— 会被离群节点拽走） */
      if (organic && c.center && isFinite(c.center.x)) { cx = c.center.x; cy = c.center.y; }
      var maxd = 0;
      c.nodes.forEach(function (nd) { maxd = Math.max(maxd, U.dist(nd.x, nd.y, cx, cy)); });
      c.stat = {
        cx: cx, cy: cy, count: c.nodes.length,
        radius: Math.max(ccfg.cloudMinRadius, maxd + ccfg.cloudPadding)
      };
      c.center = { x: cx, y: cy };   // 用实际重心，便于画星团级连线
    });

    /* ------------------------------------------------ 5. 内容包围盒 */
    graph.bbox = function () {
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.forEach(function (nd) {
        if (nd.x < minX) minX = nd.x;
        if (nd.x > maxX) maxX = nd.x;
        if (nd.y < minY) minY = nd.y;
        if (nd.y > maxY) maxY = nd.y;
      });
      if (!nodes.length) return { minX: -1, minY: -1, maxX: 1, maxY: 1 };
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    };

    /* 回执用：模式 / 权重口径 / 松弛诊断 / 总耗时（⛔ 不含随机，跑几次都一样） */
    var bb0 = graph.bbox();
    graph.layoutMs = Math.round(layoutNow() - tAll);
    graph.layoutInfo = {
      mode: mode,
      organicMs: organicInfo ? Math.round(organicInfo.ms) : 0,
      organic: organicInfo,
      finish: finishInfo,
      ranIters: ranIters,
      bbox: { w: Math.round(bb0.maxX - bb0.minX), h: Math.round(bb0.maxY - bb0.minY) }
    };
  }

  function indexOf(arr, v) { for (var i = 0; i < arr.length; i++) if (arr[i].id === v) return i; return -1; }

  MG.computeLayout = computeLayout;
  MG.regionTarget = regionTarget;
})(typeof window !== 'undefined' ? window : globalThis);
