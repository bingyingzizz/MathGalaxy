/* ==========================================================================
   数学星图 · 布局求解
   --------------------------------------------------------------------------
   目标：属于同一数学板块的节点聚在一起；内容跨板块的节点落在板块边界上。

   三段式：
     1) 归属点 —— 单板块节点 → 板块中心；多板块节点 → 按板块半径加权的「交界点」
     2) 锚点   —— 用向日葵螺旋（phyllotaxis）在板块圆盘内匀布；
                  跨板块节点沿交界带的法向错开摆放
     3) 松弛   —— 锚点拉力 + 节点排斥 + 连线弹簧 + 硬碰撞，
                  既保住板块结构与均匀感，又让有连线的节点靠近

   全程使用固定随机种子 → 每次打开星图长得一模一样。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  var GOLDEN = Math.PI * (3 - Math.sqrt(5)); // ≈ 2.39996，向日葵螺旋的转角

  /** 节点在某板块内的「可用地盘」半径（板块越大，地盘越大） */
  function regionCapacity(region, graph) {
    var count = 0;
    graph.nodes.forEach(function (n) { if (n.regions.indexOf(region.id) >= 0) count++; });
    var ideal = MG.config.layout.idealDist;
    return Math.max(Math.sqrt(Math.max(count, 1) / Math.PI) * ideal * MG.config.layout.capacityFactor, 132);
  }

  /** 节点的归属点（跨板块 → 按半径加权的交界点） */
  function regionTarget(node, graph) {
    var rs = [];
    node.regions.forEach(function (id) { if (graph.regionById[id]) rs.push(graph.regionById[id]); });
    if (!rs.length) return { x: 0, y: 0 };
    if (rs.length === 1) return { x: rs[0].center.x, y: rs[0].center.y };
    var wsum = 0, x = 0, y = 0;
    rs.forEach(function (r) { wsum += r.radius; x += r.center.x * r.radius; y += r.center.y * r.radius; });
    return { x: x / wsum, y: y / wsum };
  }

  function computeLayout(graph) {
    var cfg = MG.config.layout;
    var nodes = graph.nodes;
    if (!nodes.length) return;

    /* -------------------------------------------------------- 0. 准备 */
    var index = Object.create(null);
    nodes.forEach(function (n, i) {
      index[n.id] = i;
      n.target = regionTarget(n, graph);
      n.regionObjs = n.regions.map(function (id) { return graph.regionById[id]; }).filter(Boolean);
      n.isBorder = n.regionObjs.length > 1;
      n.degree = (graph.adj[n.id] || []).length;
    });

    graph.regions.forEach(function (r) { r._cap = regionCapacity(r, graph); });

    /* -------------------------------------------- 1. 锚点：匀布初始位置 */
    var buckets = Object.create(null);
    var borders = [], orphans = [];
    nodes.forEach(function (n) {
      if (!n.regionObjs.length) { orphans.push(n); return; }
      if (n.isBorder) { borders.push(n); return; }
      var rid = n.regionObjs[0].id;
      (buckets[rid] = buckets[rid] || []).push(n);
    });

    // 单板块节点：向日葵螺旋铺满板块圆盘（按度数排序，枢纽靠中间一点）
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

    // 跨板块节点：骑在交界带上，沿「板块连线的法向」左右错开
    // 关键：法向必须用统一的板块顺序算，否则不同节点算出的法向会反向，
    //       结果全被挤到交界带的同一侧去。
    borders.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
    borders.forEach(function (node, i) {
      var ordered = node.regionObjs.slice().sort(function (a, b) { return a.id < b.id ? -1 : 1; });
      var first = ordered[0], last = ordered[ordered.length - 1];
      var dx = last.center.x - first.center.x, dy = last.center.y - first.center.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = -dy / len, ny = dx / len;              // 法向
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

    nodes.forEach(function (n) { n.x = n.anchor.x; n.y = n.anchor.y; });

    /* ---------------------------------------------------- 2. 松弛 */
    var k = cfg.idealDist;
    var cutoff = k * 2.4, cutoff2 = cutoff * cutoff;
    var springLen = k * cfg.springLenFactor;

    // 预先把边转成「下标对」，避免循环里查字典
    var pairs = [];
    graph.edges.forEach(function (e) {
      var ids = MG.graphUtil.edgeNodes(e);
      var w = e.kind === 'implication' ? 1 : (e.kind === 'equivalence' ? 1.15 : 0.3);
      for (var a = 0; a < ids.length; a++) {
        for (var b = a + 1; b < ids.length; b++) {
          if (index[ids[a]] == null || index[ids[b]] == null) continue;
          pairs.push([index[ids[a]], index[ids[b]], w]);
        }
      }
    });

    var N = nodes.length;
    var disp = new Float64Array(N * 2);
    var i, j, dx, dy, d, d2, f, ux, uy, step, n;

    for (var iter = 0; iter < cfg.iterations; iter++) {
      var t = iter / Math.max(1, cfg.iterations - 1);
      var temp = U.lerp(cfg.temp0, cfg.temp1, t * t);
      for (i = 0; i < N * 2; i++) disp[i] = 0;

      /* 2a. 排斥（Fruchterman–Reingold，带截断） */
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

      /* 2b. 弹簧（有连线 → 拉近） */
      for (var s = 0; s < pairs.length; s++) {
        i = pairs[s][0]; j = pairs[s][1];
        dx = nodes[i].x - nodes[j].x; dy = nodes[i].y - nodes[j].y;
        d = Math.sqrt(dx * dx + dy * dy) || 1;
        f = ((d - springLen) / d) * cfg.spring * pairs[s][2] * k * 0.55;
        if (f > cfg.springMax) f = cfg.springMax;
        else if (f < -cfg.springMax) f = -cfg.springMax;
        disp[i * 2] -= (dx / d) * f; disp[i * 2 + 1] -= (dy / d) * f;
        disp[j * 2] += (dx / d) * f; disp[j * 2 + 1] += (dy / d) * f;
      }

      /* 2c. 锚点拉力（保住板块结构与匀布感） */
      for (i = 0; i < N; i++) {
        n = nodes[i];
        if (n.pinned) continue;
        f = n.isBorder ? cfg.borderPull : cfg.anchorPull;
        disp[i * 2] += (n.anchor.x - n.x) * f;
        disp[i * 2 + 1] += (n.anchor.y - n.y) * f;
      }

      /* 2d. 应用位移（限幅） */
      var lim = Math.max(temp, 0.05);
      for (i = 0; i < N; i++) {
        if (nodes[i].pinned) continue;
        var vx = disp[i * 2], vy = disp[i * 2 + 1];
        var vl = Math.sqrt(vx * vx + vy * vy);
        if (vl < 1e-9) continue;
        step = Math.min(vl, lim);
        nodes[i].x += (vx / vl) * step;
        nodes[i].y += (vy / vl) * step;
      }

      /* 2e. 硬性碰撞：保证最小间距 */
      if (iter > cfg.iterations * 0.3) {
        var minGap = cfg.minGap;
        for (i = 0; i < N; i++) {
          for (j = i + 1; j < N; j++) {
            dx = nodes[j].x - nodes[i].x; dy = nodes[j].y - nodes[i].y;
            d2 = dx * dx + dy * dy;
            if (d2 >= minGap * minGap || d2 < 1e-9) continue;
            d = Math.sqrt(d2);
            var push = (minGap - d) / 2;
            var px = (dx / d) * push, py = (dy / d) * push;
            nodes[j].x += px; nodes[j].y += py;
            nodes[i].x -= px; nodes[i].y -= py;
          }
        }
      }
    }

    /* ------------------------------------------------ 3. 板块云统计 */
    /* 云的中心固定用「板块声明的中心」，不用节点的重心——
       否则跨板块节点会把两边的云都往中间拽，最后糊成一整片。
       半径 = 本板块「专属节点」到中心的最大距离 + 一圈余量。      */
    var bc = MG.config.background;
    graph.regions.forEach(function (r) {
      var list = nodes.filter(function (nd) { return nd.regions.indexOf(r.id) >= 0; });
      if (!list.length) { r.stat = null; return; }
      var singles = list.filter(function (nd) { return !nd.isBorder; });
      var basis = singles.length >= 2 ? singles : list;
      var cx = r.center.x, cy = r.center.y;
      var maxd = 0;
      basis.forEach(function (nd) { maxd = Math.max(maxd, U.dist(nd.x, nd.y, cx, cy)); });
      r.stat = {
        cx: cx, cy: cy, count: list.length,
        radius: Math.max(bc.cloudRadiusMin, maxd + bc.cloudMargin)
      };
    });

    /* ------------------------------------------------ 4. 内容包围盒 */
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
  }

  MG.computeLayout = computeLayout;
  MG.regionTarget = regionTarget;
})(typeof window !== 'undefined' ? window : globalThis);
