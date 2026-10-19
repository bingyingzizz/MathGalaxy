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

  function layoutNow() {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  }

  /* ==================================================================== */
  function computeLayout(graph) {
    var cfg = MG.config.layout;
    var ccfg = MG.config.cluster;
    var nodes = graph.nodes;
    if (!nodes.length) return;
    var tAll = layoutNow();

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
    /* ⭐ 2026-10-19：**领域中心由跨领域边权解出来**（regions.js 的 center 降级成初始锚）。
       9 个点、无随机数：有关系对按权重拉向「两盘相切」，所有对都有排斥防止叠。
       ⚠️ 必须在 `_cap` 算完之后、星团打包之前调用。 */
    (function solveRegionCenters() {
      if (!cfg.regionSolve) return;
      var regs = graph.regions.filter(function (r) { return r._cap > 0 && r.center; });
      if (regs.length < 3) return;
      var wt = Object.create(null);
      graph.edges.forEach(function (e) {
        var ids = MG.graphUtil.edgeNodes(e);
        var pr = ids.map(function (id) { var nd = graph.byId[id]; return nd && nd.regions && nd.regions[0]; });
        for (var a = 0; a < pr.length; a++) for (var b = a + 1; b < pr.length; b++) {
          if (!pr[a] || !pr[b] || pr[a] === pr[b]) continue;
          var kk = pr[a] < pr[b] ? pr[a] + '|' + pr[b] : pr[b] + '|' + pr[a];
          wt[kk] = (wt[kk] || 0) + 1;
        }
      });
      var wsum0 = 0, wn0 = 0;
      Object.keys(wt).forEach(function (k2) { wsum0 += wt[k2]; wn0++; });
      var wMean = wn0 ? wsum0 / wn0 : 1;
      var c0x = 0, c0y = 0;
      regs.forEach(function (r) { c0x += r.center.x; c0y += r.center.y; });
      c0x /= regs.length; c0y /= regs.length;
      for (var it = 0; it < 500; it++) {
        var damp = 0.5 * (1 - 0.6 * it / 500);
        regs.forEach(function (A, i) {
          var fx = 0, fy = 0;
          regs.forEach(function (B, j) {
            if (i === j) return;
            var dx = B.center.x - A.center.x, dy = B.center.y - A.center.y;
            var d = Math.sqrt(dx * dx + dy * dy) || 0.01, ux = dx / d, uy = dy / d;
            var key = A.id < B.id ? A.id + '|' + B.id : B.id + '|' + A.id;
            var w = wt[key] || 0, touch = A._cap + B._cap + 8;
            /* ⭐ 2026-10-19：权重不封顶 —— 原来 min(1, w/6) 让「一条 4400 长的强边」只拿到
               0.5 的权重，等于承认它不重要。现在按「相对平均权重」放大（上限 3×），
               强关系优先被拉近，长边清单才降得下来。 */
            if (w) { var mul = Math.min(3, w / Math.max(1, wMean)); var pull = (d - touch) * 0.05 * mul; fx += ux * pull; fy += uy * pull; }
            if (d < touch) { var push = (touch - d) * 0.25; fx -= ux * push; fy -= uy * push; }
          });
          fx += (c0x - A.center.x) * 0.002; fy += (c0y - A.center.y) * 0.002;
          A._fx = fx; A._fy = fy;
        });
        regs.forEach(function (A) {
          A.center.x += A._fx * damp; A.center.y += A._fy * damp;
          A._fx = 0; A._fy = 0;
        });
      }
    })();
    (function packSectors() {
      /* 领域中心已由 solveRegionCenters 解出 ⇒ 板块收拢/推开会把它压扁，整段跳过。 */
      if (cfg.regionSolve) return;
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

    /* ⭐ 2026-10-19 试装：**跨板块领域放在哪里**（`?cond=cross` 才走）。
       现在的规则是「跟着主板块平移」，于是凝聚态数学整个落在代数板块里；
       但它的料来自拓扑（63 条）、同调（28 条）、范畴（29 条）——
       该站在那几门的交界上。这里按**真实边数**加权，把它的圆心挪到加权重心。
       ⛔ 默认 'sector'（今天的样子）；等挑完再删掉另一条。 */
    var condPlace = (function () {
      var s = String(global.location && global.location.search || '');
      var m = /[?&]cond=(cross|gap)/.exec(s);
      return m ? m[1] : 'sector';
    })();
    var condInfo = null;
    if (condPlace !== 'sector') {
      var primReg = Object.create(null);
      nodes.forEach(function (n) { if (n.regions && n.regions.length) primReg[n.id] = n.regions[0]; });
      (graph.regions || []).forEach(function (r) {
        var sec = (graph.sectors || []).filter(function (s) {
          return (s.secondary && s.secondary[r.id]) || (s.regions || []).indexOf(r.id) >= 0;
        });
        var extra = [];
        sec.forEach(function (s) { if (s.secondary && s.secondary[r.id]) extra = extra.concat(s.secondary[r.id]); });
        if (!extra.length) return;
        /* 权重 = 与「同属那几个板块的其它领域」之间的边数 */
        var wts = Object.create(null);
        graph.edges.forEach(function (e) {
          var ids = MG.graphUtil.edgeNodes(e);
          for (var a = 0; a < ids.length; a++) for (var b = 0; b < ids.length; b++) {
            if (a === b) continue;
            if (primReg[ids[a]] !== r.id) continue;
            var other = primReg[ids[b]];
            if (!other || other === r.id) continue;
            wts[other] = (wts[other] || 0) + 1;
          }
        });
        var sum = 0, tx = 0, ty = 0, parts = [];
        Object.keys(wts).forEach(function (rid) {
          var rr = graph.regionById[rid];
          if (!rr || !rr.center) return;
          sum += wts[rid]; tx += rr.center.x * wts[rid]; ty += rr.center.y * wts[rid];
          parts.push({ id: rid, w: wts[rid] });
        });
        if (!sum) return;
        parts.sort(function (x, y) { return y.w - x.w; });
        var delta = { x: tx / sum - r.center.x, y: ty / sum - r.center.y };
        r.center = { x: tx / sum, y: ty / sum };
        graph.clusters.forEach(function (c) {
          if (c.parent !== r.id || !c.center) return;
          c.center = { x: c.center.x + delta.x, y: c.center.y + delta.y };
        });
        condInfo = { region: r.id, parts: parts.slice(0, 5), center: { x: Math.round(r.center.x), y: Math.round(r.center.y) } };
      });
    }

    /* ⭐ 2026-10-19：**团级硬净空**。板块缝收到 0 之后，「不粘连」不能再靠留白保证 ——
       这里对团心做一遍圆盘碰撞（半径 = 团自己的 `_cap`），保证「挨着但不叠」。
       只推团心（节点锚点随后由团心算），不动板块、不动领域中心。无随机数。 */
    /* ⭐ 2026-10-19 用户定稿：**跨领域星团**（次要领域成员 ≥15%）不再硬归一边 ——
       圆心落在两个领域中心连线上（按成员比例插值），颜色按比例混合；
       之后由 separateClusters 的硬净空把它嵌在两块之间，不重叠。 */
    (function crossClusters() {
      var HEX = '0123456789ABCDEF';
      function hex2(r, g, b) {
        var f = function (v) { return HEX[(v >> 4) & 15] + HEX[v & 15]; };
        return '#' + f(r) + f(g) + f(b);
      }
      liveClusters.forEach(function (c) {
        var cnt = Object.create(null), tot = 0;
        c.nodes.forEach(function (nd) {
          tot++;
          (nd.regions || []).forEach(function (r) { cnt[r] = (cnt[r] || 0) + 1; });
        });
        var keys = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; });
        if (keys.length < 2) return;
        if (cnt[keys[1]] / Math.max(1, tot) < 0.15) return;
        var A = graph.regionById[keys[0]], B = graph.regionById[keys[1]];
        if (!A || !B || !A.center || !B.center) return;
        var t = cnt[keys[1]] / (cnt[keys[0]] + cnt[keys[1]]);
        c.cross = [keys[0], keys[1]];
        c.center = {
          x: A.center.x * (1 - t) + B.center.x * t,
          y: A.center.y * (1 - t) + B.center.y * t
        };
        var ca = U.hexToRgb(A.color || '#7A8699'), cb = U.hexToRgb(B.color || '#7A8699');
        c.color = hex2(Math.round(ca.r * (1 - t) + cb.r * t),
                       Math.round(ca.g * (1 - t) + cb.g * t),
                       Math.round(ca.b * (1 - t) + cb.b * t));
      });
    })();
    (function separateClusters() {
      var list = liveClusters.filter(function (c) { return c.center && c._cap > 0; });
      var gap = cfg.clusterGap == null ? 24 : cfg.clusterGap;
      for (var it = 0; it < 120; it++) {
        var worst = 0;
        for (var a = 0; a < list.length; a++) {
          for (var b = a + 1; b < list.length; b++) {
            var A = list[a], B = list[b];
            var dx = B.center.x - A.center.x, dy = B.center.y - A.center.y;
            var d = Math.sqrt(dx * dx + dy * dy) || 0.01;
            var need = A._cap + B._cap + gap;
            var delta = need - d;
            if (delta <= 0.5) continue;
            if (delta > worst) worst = delta;
            var ux = dx / d, uy = dy / d, move = delta * 0.5 * 0.65;
            A.center.x -= ux * move; A.center.y -= uy * move;
            B.center.x += ux * move; B.center.y += uy * move;
          }
        }
        if (worst < 0.5) break;
      }
    })();

    /* ------------------------------------------------ 2. 节点锚点 */
    var buckets = Object.create(null);   // 无星团节点按星系分桶
    var borders = [], orphans = [];

    // 2a. 有星团的节点：行星-卫星锚点
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

    var iters = cfg.iterations;
    var nodeGap = cfg.minGap;
    var ranIters = iters;

    for (var iter = 0; iter < iters; iter++) {
      var t = iter / Math.max(1, iters - 1);
      var temp = U.lerp(cfg.temp0, cfg.temp1, t * t);
      for (i = 0; i < N * 2; i++) disp[i] = 0;

      /* 3a. 排斥（O(n²)，cutoff 之外不算） */
      {
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

        // 团容器：软墙（走出去就被按回来）
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
      var collideFrom = cfg.iterations * 0.3;
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

    /* 回执用：松弛诊断 / 总耗时（⛔ 不含随机，跑几次都一样） */
    var bb0 = graph.bbox();
    graph.layoutMs = Math.round(layoutNow() - tAll);
    /* ⭐ 长边巡检（2026-10-19）：布局是否局部性良好，用「超过 2000 世界单位的边」验收，
       不再靠肉眼发现。看 graph.layoutInfo.longEdges。 */
    var _long = [];
    graph.edges.forEach(function (e) { var ids = MG.graphUtil.edgeNodes(e); if (ids.length < 2) return;
      var a = graph.byId[ids[0]], b = graph.byId[ids[1]]; if (!a || !b) return;
      var dd = U.dist(a.x, a.y, b.x, b.y);
      if (dd > 2000) _long.push({ d: Math.round(dd), id: e.id, kind: e.kind }); });
    _long.sort(function (x, y) { return y.d - x.d; });
    graph.layoutInfo = {
      crossClusters: liveClusters.filter(function (c) { return !!c.cross; }).map(function (c) { return { id: c.id, cross: c.cross }; }),
      longEdges: _long.slice(0, 12),
      longCount: _long.length,
      longMax: _long.length ? _long[0].d : 0,
      condPlace: condPlace,
      cond: condInfo,
      ranIters: ranIters,
      bbox: { w: Math.round(bb0.maxX - bb0.minX), h: Math.round(bb0.maxY - bb0.minY) }
    };
  }

  function indexOf(arr, v) { for (var i = 0; i < arr.length; i++) if (arr[i].id === v) return i; return -1; }

  MG.computeLayout = computeLayout;
  MG.regionTarget = regionTarget;
})(typeof window !== 'undefined' ? window : globalThis);
