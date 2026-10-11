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
     星团内部不再螺旋平铺，改成「一颗行星 + 一圈卫星」：

       1. 选行星：优先取**定义**节点里团内度数最高的那几个；
          行星个数 = ceil(团内节点数 / cap)，团越大行星越多。
       2. 行星按**蜂窝网格**摆开（相邻行星中心距 pitch，领地不重叠）。
       3. 其余节点是**卫星**，多源 BFS 归给最近的那颗行星，
          均布在所属行星周围的第一条轨道上。
       4. 碰撞松弛：行星钉住不动，只推卫星，保证任意两点 ≥ minGap。

     于是「谁是这个概念的卫星」这件事在图上**直接看得出来**。            */

  /** 第 i 个蜂窝网格中心，相邻中心间距 pitch（轴坐标枚举，保证相邻正好差 pitch） */
  function hexCenter(i, pitch) {
    if (i === 0) return { x: 0, y: 0 };
    var ring = 1, before = 0;
    while (i - 1 >= before + 6 * ring) { before += 6 * ring; ring++; }
    var pos = i - 1 - before;             // 在本圈的序号 0..6r-1
    var side = Math.floor(pos / ring);    // 第几条边
    var step = pos % ring;                // 边上第几步
    var corners = [[ring, 0], [ring, -ring], [0, -ring], [-ring, 0], [-ring, ring], [0, ring]];
    var dirs = [[0, -1], [-1, 0], [-1, 1], [0, 1], [1, 0], [1, -1]];
    var co = corners[side], d = dirs[side];
    var q = co[0] + d[0] * step;
    var r = co[1] + d[1] * step;
    return { x: pitch * (q + r / 2), y: pitch * (Math.sqrt(3) / 2 * r) };
  }

  /** 给星团 c 内所有节点写 anchor（以 cx,cy 为中心）；返回离中心最远的距离 */
  function planetaryAnchors(graph, c, cx, cy, opts) {
    opts = opts || {};
    var minGap = opts.minGap || 96;
    var cap = opts.cap || 6;               // 每颗行星最多带几颗卫星

    var ids = [];
    var idset = Object.create(null);
    c.nodes.forEach(function (n) { ids.push(n.id); idset[n.id] = true; });

    function degIn(x) {
      var nb = graph.adj[x];
      if (!nb) return 0;
      var cnt = 0;
      for (var i = 0; i < nb.length; i++) if (idset[nb[i]]) cnt++;
      return cnt;
    }

    // 1) 选行星：优先定义节点，按团内度数降序；数量 = ceil(n/cap)
    var defs = c.nodes.filter(function (n) { return n.type === 'definition'; });
    var pool = defs.length ? defs : c.nodes;
    var ranked = pool.slice().sort(function (a, b) {
      var da = degIn(a.id), db = degIn(b.id);
      if (db !== da) return db - da;
      return a.id < b.id ? -1 : 1;
    });
    var P = Math.max(1, Math.ceil(c.nodes.length / cap));
    var planets = ranked.slice(0, P).map(function (n) { return n.id; });

    // 2) 多源 BFS：每个节点归属最近的行星
    var owner = Object.create(null);
    planets.forEach(function (p) { owner[p] = p; });
    var frontier = planets.slice();
    while (frontier.length) {
      var nxt = [];
      frontier.forEach(function (u) {
        var nb = graph.adj[u];
        if (!nb) return;
        for (var i = 0; i < nb.length; i++) {
          var v = nb[i];
          if (idset[v] && !(v in owner)) { owner[v] = owner[u]; nxt.push(v); }
        }
      });
      frontier = nxt;
    }
    ids.forEach(function (x) { if (!(x in owner)) owner[x] = planets[0]; });

    var groups = Object.create(null);
    planets.forEach(function (p) { groups[p] = []; });
    ids.forEach(function (x) { groups[owner[x]].push(x); });

    // 3) 每颗行星的卫星环半径：既要容得下 m 颗卫星，又要行星—卫星至少 minGap
    var territory = planets.map(function (p) {
      var m = groups[p].length - 1;
      return Math.max(minGap, m * minGap / (2 * Math.PI));
    });
    var maxTerr = minGap;
    territory.forEach(function (t) { maxTerr = Math.max(maxTerr, t); });
    var pitch = maxTerr * 2 + minGap;      // 行星中心间距 → 领地不重叠

    // 4) 行星落蜂窝中心；卫星均布在行星周围第一轨道
    var posById = Object.create(null);
    planets.forEach(function (p, i) {
      var h = hexCenter(i, pitch);
      posById[p] = h;
      var sats = groups[p].filter(function (x) { return x !== p; });
      var R = territory[i];
      var th0 = 0.5 + (U.hashString(p) % 628) / 100;   // 起点错开，免得每颗行星都一个朝相
      sats.forEach(function (x, k) {
        var th = th0 + k * 2 * Math.PI / Math.max(1, sats.length);
        posById[x] = { x: h.x + R * Math.cos(th), y: h.y + R * Math.sin(th) };
      });
    });

    // 5) 碰撞松弛：行星固定，只推动卫星，保证任意两点 >= minGap
    var planetSet = Object.create(null);
    planets.forEach(function (p) { planetSet[p] = true; });
    var movers = ids.filter(function (x) { return !planetSet[x]; });
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
          if (!planetSet[u]) { fx[u] += ux * f; fy[u] += uy * f; }
          if (!planetSet[v]) { fx[v] -= ux * f; fy[v] -= uy * f; }
        }
      }
      movers.forEach(function (x) { posById[x].x += fx[x]; posById[x].y += fy[x]; });
      if (!changed) break;
    }

    // 6) 平移到星团中心并写 anchor，同时量出实际半径
    var far = 0;
    c.nodes.forEach(function (n) {
      var q = posById[n.id];
      n.anchor = { x: cx + q.x, y: cy + q.y };
      var r = Math.sqrt(q.x * q.x + q.y * q.y);
      if (r > far) far = r;
    });
    return far;
  }

  /* ==================================================================== */
  function computeLayout(graph) {
    var cfg = MG.config.layout;
    var ccfg = MG.config.cluster;
    var nodes = graph.nodes;
    if (!nodes.length) return;

    /* -------------------------------------------------------- 0. 准备 */
    nodes.forEach(function (n) {
      n.target = regionTarget(n, graph);
      n.regionObjs = n.regions.map(function (id) { return graph.regionById[id]; }).filter(Boolean);
      n.isBorder = n.regionObjs.length > 1;
      n.degree = (graph.adj[n.id] || []).length;
      n.galaxy = n.clusterObj ? graph.galaxyOf(n.clusterObj) : (n.regionObjs[0] || null);
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
      c._cap = Math.max(discRadius(c.nodes.length, 1.26), ccfg.minRadius);
      // 行星-卫星摆法占的地方比原来的螺旋大，先量一次，把星团的地盘算准 ——
      // 宁可星团占更大面积，也不要两个星团的节点互相穿插。
      var ext = planetaryAnchors(graph, c, 0, 0, ccfg.planetary);
      c._cap = Math.max(c._cap, ext + ccfg.cloudPadding * 0.5);
      var g = graph.galaxyOf(c);
      c.center = g ? { x: g.center.x, y: g.center.y } : { x: 0, y: 0 };
      liveClusters.push(c);
    });

    graph.regions.forEach(function (reg) {
      var mine = liveClusters.filter(function (c) { return c.parent === reg.id; });
      if (!mine.length) return;
      // 大的排前面，视觉上更像"星系核 + 外环"
      mine.sort(function (a, b) { return b.nodes.length - a.nodes.length; });
      var maxCap = 0;
      mine.forEach(function (c) { maxCap = Math.max(maxCap, c._cap); });

      if (mine.length === 1) {
        mine[0].center = { x: reg.center.x, y: reg.center.y };
        return;
      }
      var ringR = Math.max(maxCap * 1.05, reg._cap * (0.34 + 0.05 * Math.min(mine.length, 6)));
      var phase = (U.hashString(reg.id) % 628) / 100;
      mine.forEach(function (c, i) {
        var th = phase + i * (Math.PI * 2 / mine.length);
        // 团越大，稍微往外挪一点，避免挤在一起
        var rr = ringR + c._cap * 0.18;
        c.center = { x: reg.center.x + Math.cos(th) * rr, y: reg.center.y + Math.sin(th) * rr };
      });
      // 星系圆盘要装得下所有星团
      reg._cap = Math.max(reg._cap, ringR + maxCap * 1.15 + 60);
    });

    /* ------------------------------------------------ 2. 节点锚点 */
    var buckets = Object.create(null);   // 无星团节点按星系分桶
    var borders = [], orphans = [];

    // 2a. 有星团的节点：行星-卫星摆法（行星 = 团内度数最高的定义节点）
    liveClusters.forEach(function (c) {
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
    var k = cfg.idealDist;
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
          pairs.push([ia, ib, w]);
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

      /* 3a. 排斥 */
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

      /* 3b. 弹簧 */
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

      /* 3c. 锚点拉力 + 星团软边界 */
      for (i = 0; i < N; i++) {
        n = nodes[i];
        if (n.pinned || !n.anchor) continue;
        f = n.isBorder ? cfg.borderPull : cfg.anchorPull;
        disp[i * 2] += (n.anchor.x - n.x) * f;
        disp[i * 2 + 1] += (n.anchor.y - n.y) * f;

        // 星团软墙：别飘出自己的星团
        if (n.clusterObj && n.clusterObj.center) {
          var cx = n.clusterObj.center.x, cy = n.clusterObj.center.y;
          var vx = n.x - cx, vy = n.y - cy;
          var vd = Math.sqrt(vx * vx + vy * vy) || 1;
          var lim = n.clusterObj._cap * 1.28 + 30;
          if (vd > lim) {
            var pull = (vd - lim) * 0.10;
            disp[i * 2] -= (vx / vd) * pull;
            disp[i * 2 + 1] -= (vy / vd) * pull;
          }
        }
      }

      /* 3d. 应用位移 */
      var cap = Math.max(temp, 0.05);
      for (i = 0; i < N; i++) {
        if (nodes[i].pinned) continue;
        var px = disp[i * 2], py = disp[i * 2 + 1];
        var pl = Math.sqrt(px * px + py * py);
        if (pl < 1e-9) continue;
        step = Math.min(pl, cap);
        nodes[i].x += (px / pl) * step;
        nodes[i].y += (py / pl) * step;
      }

      /* 3e. 硬性碰撞 */
      if (iter > cfg.iterations * 0.3) {
        var minGap = cfg.minGap;
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

    /* -------------------------------------------- 4. 云统计（星系 / 星团） */
    var bc = MG.config.background;
    graph.regions.forEach(function (r) {
      var list = nodes.filter(function (nd) { return nd.regions.indexOf(r.id) >= 0; });
      if (!list.length) { r.stat = null; return; }
      var singles = list.filter(function (nd) { return !nd.isBorder; });
      var basis = singles.length >= 2 ? singles : list;
      var cx = r.center.x, cy = r.center.y, maxd = 0;
      basis.forEach(function (nd) { maxd = Math.max(maxd, U.dist(nd.x, nd.y, cx, cy)); });
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
  }

  function indexOf(arr, v) { for (var i = 0; i < arr.length; i++) if (arr[i].id === v) return i; return -1; }

  MG.computeLayout = computeLayout;
  MG.regionTarget = regionTarget;
})(typeof window !== 'undefined' ? window : globalThis);
