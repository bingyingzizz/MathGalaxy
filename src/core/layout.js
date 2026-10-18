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
  function computeLayout(graph) {
    var cfg = MG.config.layout;
    var ccfg = MG.config.cluster;
    var nodes = graph.nodes;
    if (!nodes.length) return;

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
          pairs.push([ia, ib, w, nodes[ia]._sector !== nodes[ib]._sector]);
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
      /* ⭐ 阶段 4：板块云的半径改用**92 分位**而不是最大值。
         用户指着左边那团粉雾说「糊成一片」—— 根因是几个离心很远的跨板块节点
         把 maxd 拉得很长，云半径跟着涨，而那里其实没什么点。
         分位数既保住了「云把内容包住」的观感，又不会为个别远点空摊一大片。 */
      var ds = basis.map(function (nd) { return U.dist(nd.x, nd.y, cx, cy); }).sort(function (a, b) { return a - b; });
      var maxd = ds.length ? ds[Math.min(ds.length - 1, Math.floor(ds.length * 0.92))] : 0;
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
