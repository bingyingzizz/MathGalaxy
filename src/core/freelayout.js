/* ==========================================================================
   数学星图 · 自由力导向松弛（Task 3 · 布局 B）
   --------------------------------------------------------------------------
   做什么：在 `computeLayout` 摆好的星系/星团初始位置上，让节点只受「真实数学关系」
   的牵引自由松弛。星团、星系只是分类元数据 —— **没有**团心/领域心的锚力，
   成员不被关进任何圆盘，也不要求连通。跨领域概念因此会落在自然的中间位置。

   力模型（移植自批准的 Layout B 求解器，参数是工程旋钮不是数学规则）：
     · 斥力 f = repulsion / d³ + 近距碰撞 (minGap−d)·collide / d（硬间距）
     · 关系弹簧：每条边的权重 w_kind 摊到它的端点对上（超边 w/(m−1)），
       再按 (deg_a·deg_b)^degExp 做度数归一，防止高度数的基础概念把图拽成一团；
       自然长度 springLen。⚠️ 虚拟弹簧只是布局力，与渲染出来的合流树无关。
     · 微弱向心 + 速度阻尼 + 线性退火的步长上限（数值稳定）。
   收尾：整体平移回原质心；按「最近邻中位距离」缩放回初始量级（⛔ 避免只靠
   整体缩小就显得更紧）；若干轮成对重叠松弛保证 minGap。

   确定性：不含随机数；初始位置 = computeLayout 的结果；遍历顺序固定。
   增量稳定：初始位置取自 computeLayout（它自己是确定的），所以图只改少量节点时
   新布局从相近的初值出发；但力导向是全局的，**不保证**零位移——见 docs。

   性能：默认精确 O(n²)（650 轮 × n²/2 对）。⚠️ 实测斥力截断（cutoff=700）会让整体宽度偏小 16%
   （长程斥力的合力不可忽略），所以截断只是可选旋钮，默认关。构建期预计算；
   运行时只在没有有效预计算时才会冷算。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var KIND_W = { definition: 0.8, implication: 1.5, equivalence: 2.0, analogy: 0.15 };

  /** 由图边构造弹簧对：返回 {A: Int32Array(2m), W: Float64Array(m)} 与每点度数。 */
  function buildSprings(graph, cfg) {
    var GU = MG.graphUtil, idx = Object.create(null), nodes = graph.nodes, i;
    for (i = 0; i < nodes.length; i++) idx[nodes[i].id] = i;
    var acc = Object.create(null);
    graph.edges.forEach(function (e) {
      var ids = GU.edgeNodes(e), ends = [], seen = Object.create(null);
      for (var k = 0; k < ids.length; k++) {
        var ix = idx[ids[k]];
        if (ix === undefined || seen[ix]) continue;
        seen[ix] = 1; ends.push(ix);
      }
      var m = ends.length;
      if (m < 2) return;
      var w = KIND_W[e.kind];
      if (w == null) w = 1;
      if (e.kind === 'implication' && GU.isDerived && GU.isDerived(e)) w = 1.0;
      for (var a = 0; a < m; a++) for (var b = a + 1; b < m; b++) {
        var x = ends[a], y = ends[b];
        var key = x < y ? x * 65536 + y : y * 65536 + x;   // 节点数 < 65536
        acc[key] = (acc[key] || 0) + w / (m - 1);
      }
    });
    var keys = Object.keys(acc).map(Number).sort(function (p, q) { return p - q; });
    var A = new Int32Array(keys.length * 2), W = new Float64Array(keys.length);
    var deg = new Float64Array(nodes.length);
    keys.forEach(function (key, j) {
      var x = Math.floor(key / 65536), y = key % 65536;
      A[2 * j] = x; A[2 * j + 1] = y; W[j] = acc[key];
      deg[x] += W[j]; deg[y] += W[j];
    });
    var de = cfg.degExp == null ? 0.18 : cfg.degExp;
    for (var j2 = 0; j2 < W.length; j2++) {
      W[j2] /= Math.max(1, Math.pow(deg[A[2 * j2]] * deg[A[2 * j2 + 1]], de));
    }
    return { A: A, W: W };
  }

  /** 均匀格子：返回 cell→节点下标 的 CSR。 */
  function buildGrid(px, py, n, cell) {
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, i;
    for (i = 0; i < n; i++) {
      if (px[i] < minX) minX = px[i]; if (px[i] > maxX) maxX = px[i];
      if (py[i] < minY) minY = py[i]; if (py[i] > maxY) maxY = py[i];
    }
    var gw = Math.max(1, Math.floor((maxX - minX) / cell) + 1), gh = Math.max(1, Math.floor((maxY - minY) / cell) + 1);
    var count = new Int32Array(gw * gh + 1), cid = new Int32Array(n);
    for (i = 0; i < n; i++) {
      cid[i] = Math.floor((py[i] - minY) / cell) * gw + Math.floor((px[i] - minX) / cell);
      count[cid[i] + 1]++;
    }
    for (i = 0; i < gw * gh; i++) count[i + 1] += count[i];
    var fill = count.slice(0, gw * gh), items = new Int32Array(n);
    for (i = 0; i < n; i++) items[fill[cid[i]]++] = i;
    return { gw: gw, gh: gh, start: count, items: items, cid: cid };
  }

  /** 迭代 f(i,j) 全部 d<cutoff 的无序对（i<j），用回调避免分配。 */
  function eachNear(px, py, n, cutoff, fn) {
    if (!isFinite(cutoff)) {
      for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) fn(i, j);
      return;
    }
    var g = buildGrid(px, py, n, cutoff), c2 = cutoff * cutoff;
    for (var a = 0; a < n; a++) {
      var cx = g.cid[a] % g.gw, cy = (g.cid[a] - cx) / g.gw;
      for (var yy = Math.max(0, cy - 1); yy <= Math.min(g.gh - 1, cy + 1); yy++) {
        for (var xx = Math.max(0, cx - 1); xx <= Math.min(g.gw - 1, cx + 1); xx++) {
          var c = yy * g.gw + xx;
          for (var t = g.start[c]; t < g.start[c + 1]; t++) {
            var b = g.items[t];
            if (b <= a) continue;
            var dx = px[a] - px[b], dy = py[a] - py[b];
            if (dx * dx + dy * dy < c2) fn(a, b);
          }
        }
      }
    }
  }

  function medianNN(px, py, n) {
    /* 最近邻中位距离：格子 + 逐环扩张，确定且 O(n)。 */
    var cell = 80, g = buildGrid(px, py, n, cell), nn = new Float64Array(n);
    for (var a = 0; a < n; a++) {
      var cx = g.cid[a] % g.gw, cy = (g.cid[a] - cx) / g.gw, best = Infinity;
      for (var r = 1; r < 400; r++) {
        for (var yy = Math.max(0, cy - r); yy <= Math.min(g.gh - 1, cy + r); yy++) {
          for (var xx = Math.max(0, cx - r); xx <= Math.min(g.gw - 1, cx + r); xx++) {
            if (Math.max(Math.abs(xx - cx), Math.abs(yy - cy)) !== r) continue;   // 只扫新环
            var c = yy * g.gw + xx;
            for (var t = g.start[c]; t < g.start[c + 1]; t++) {
              var b = g.items[t]; if (b === a) continue;
              var dx = px[a] - px[b], dy = py[a] - py[b], d = Math.sqrt(dx * dx + dy * dy);
              if (d < best) best = d;
            }
          }
        }
        if (best < (r) * cell) break;           // 环外不可能更近
      }
      nn[a] = best;
    }
    var s = Array.prototype.slice.call(nn).sort(function (p, q) { return p - q; });
    return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
  }

  function freeRelax(graph, cfg) {
    cfg = cfg || {};
    var nodes = graph.nodes, n = nodes.length;
    if (n < 3) return null;
    var iters = cfg.iterations == null ? 650 : cfg.iterations;
    var rep = cfg.repulsion == null ? 170000 : cfg.repulsion;
    var minGap = cfg.minGap == null ? 64 : cfg.minGap;
    var collide = cfg.collide == null ? 2.8 : cfg.collide;
    var springLen = cfg.springLen == null ? 100 : cfg.springLen;
    var springK = cfg.springK == null ? 0.8 : cfg.springK;
    var cutoff = cfg.cutoff == null ? Infinity : cfg.cutoff;
    var pullC = cfg.centerPull == null ? 0.001 : cfg.centerPull;
    var sep = cfg.separate == null ? 60 : cfg.separate;

    var sp = buildSprings(graph, cfg), A = sp.A, W = sp.W, m = W.length;
    var ox = new Float64Array(n), oy = new Float64Array(n), px = new Float64Array(n), py = new Float64Array(n);
    var vx = new Float64Array(n), vy = new Float64Array(n), fx = new Float64Array(n), fy = new Float64Array(n);
    var i, cmx = 0, cmy = 0;
    for (i = 0; i < n; i++) { ox[i] = px[i] = nodes[i].x; oy[i] = py[i] = nodes[i].y; cmx += ox[i]; cmy += oy[i]; }
    cmx /= n; cmy /= n;
    var c0x = cmx, c0y = cmy;                    // 向心点取初始质心（与原型一致）
    var nn0 = medianNN(ox, oy, n);

    function repel(a, b) {
      var x = px[a] - px[b], y = py[a] - py[b], d2 = x * x + y * y + 1e-6, d = Math.sqrt(d2);
      var f = rep / (d2 * d) + (d < minGap ? (minGap - d) * collide / d : 0);
      fx[a] += f * x; fy[a] += f * y; fx[b] -= f * x; fy[b] -= f * y;
    }
    var exact = !isFinite(cutoff);
    for (var it = 0; it < iters; it++) {
      fx.fill(0); fy.fill(0);
      if (exact) {
        /* 精确 O(n²)（内联以免回调开销；与批准的 Layout B 逐位同口径） */
        for (var ia = 0; ia < n; ia++) {
          var xa = px[ia], ya = py[ia], gx = 0, gy = 0;
          for (var ib = ia + 1; ib < n; ib++) {
            var ddx = xa - px[ib], ddy = ya - py[ib], q2 = ddx * ddx + ddy * ddy + 1e-6, qd = Math.sqrt(q2);
            var ff = rep / (q2 * qd);
            if (qd < minGap) ff += (minGap - qd) * collide / qd;
            gx += ff * ddx; gy += ff * ddy; fx[ib] -= ff * ddx; fy[ib] -= ff * ddy;
          }
          fx[ia] += gx; fy[ia] += gy;
        }
      } else eachNear(px, py, n, cutoff, repel);
      for (var k = 0; k < m; k++) {
        var a = A[2 * k], b = A[2 * k + 1];
        var x = px[b] - px[a], y = py[b] - py[a], d = Math.sqrt(x * x + y * y + 1e-6);
        var f = W[k] * (d - springLen) / d * springK;
        fx[a] += f * x; fy[a] += f * y; fx[b] -= f * x; fy[b] -= f * y;
      }
      var step = 18 * (1 - it / iters) + 0.6;
      for (i = 0; i < n; i++) {
        fx[i] += pullC * (c0x - px[i]); fy[i] += pullC * (c0y - py[i]);
        vx[i] = 0.6 * vx[i] + 0.10 * fx[i]; vy[i] = 0.6 * vy[i] + 0.10 * fy[i];
        var dd = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        var s = Math.min(1, step / Math.max(dd, 1e-9));
        px[i] += s * vx[i]; py[i] += s * vy[i];
      }
    }
    /* 平移回原质心、缩放回原最近邻中位距离（口径：相对原质心） */
    var mx = 0, my = 0;
    for (i = 0; i < n; i++) { mx += px[i]; my += py[i]; }
    mx /= n; my /= n;
    for (i = 0; i < n; i++) { px[i] += cmx - mx; py[i] += cmy - my; }
    var nn1 = medianNN(px, py, n), sc = nn1 > 0 ? nn0 / nn1 : 1;
    for (i = 0; i < n; i++) { px[i] = (px[i] - cmx) * sc + cmx; py[i] = (py[i] - cmy) * sc + cmy; }
    /* 成对重叠松弛：保证最小间距 */
    var relaxed = 0;
    for (var r = 0; r < 70; r++) {
      fx.fill(0); fy.fill(0);
      var any = 0;
      eachNear(px, py, n, sep, function (a2, b2) {
        var x2 = px[a2] - px[b2], y2 = py[a2] - py[b2], l = Math.sqrt(x2 * x2 + y2 * y2);
        if (l >= sep) return;
        any = 1;
        var t = (sep - l) / 2 / Math.max(l, 1e-8);
        fx[a2] += x2 * t; fy[a2] += y2 * t; fx[b2] -= x2 * t; fy[b2] -= y2 * t;
      });
      if (!any) break;
      relaxed++;
      for (i = 0; i < n; i++) { px[i] += 0.65 * fx[i]; py[i] += 0.65 * fy[i]; }
    }
    for (i = 0; i < n; i++) { nodes[i].x = px[i]; nodes[i].y = py[i]; }
    return { springs: m, relaxRounds: relaxed, scale: sc, medianNN0: nn0 };
  }

  MG.freeLayout = { relax: freeRelax, _medianNN: medianNN };
})(typeof window !== 'undefined' ? window : globalThis);
