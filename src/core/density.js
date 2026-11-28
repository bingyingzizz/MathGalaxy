/* ==========================================================================
   数学星图 · 分类密度场（Task 3 · B+）
   --------------------------------------------------------------------------
   旧做法：每个板块一个圆形渐变（半径 = 成员分位距离）。自由布局下，远处的成员会把
   「包络」撑过毫不相干的区域，所以改成**局部密度**：
        ρ_C(x) = Σ_{i∈C} exp(−‖x−x_i‖² / 2σ²)
   · 不规则形状、多个互不相连的浓团、重叠学科之间渐变过渡、孤立成员不拉出长条；
   · 三个尺度：板块 σ_region、星团 σ_cluster、大板块 σ_sector（后者只用来定标签位置）；
   · 归一化：每个像素的颜色是各组按「纯度」加权的平均，浓度用 1−exp(−κ·ρ) 饱和，
     所以跨学科的重叠区不会无限累加变深；
   · 标签锚点 = 该组「密度 × √纯度」最大的像素（代表性的局部密度峰），而不是质心——
     不会落在两个浓团之间的空地里。
   纯数值核心（不碰 canvas）：浏览器启动时算一次、构建期也可算；**拖动/缩放/hover 不重算**。
   算法移植自批准的 B+ 原型；高斯核改成可分离（行因子 × 列因子），结果等价、代价从 O(r²) 降到 O(r)。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  function hexToRgb(hex) {
    var h = String(hex || '#7A8699').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    if (!isFinite(n)) n = 0x7A8699;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  /** 单组的密度场（Float32Array N）+ 非零区域的包围盒（逐组只扫自己的盒子，百余个组不再各扫整图） */
  function field(list, sigma, g) {
    var W = g.W, H = g.H, scale = g.scale, a = new Float32Array(W * H);
    var bx0 = W, bx1 = -1, by0 = H, by1 = -1;
    var rr = Math.ceil(3 * sigma * scale), den = 2 * sigma * sigma * scale * scale, rr2 = rr * rr;
    var colF = new Float64Array(2 * rr + 3), rowF = new Float64Array(2 * rr + 3);
    for (var t = 0; t < list.length; t++) {
      var px = (list[t].x - g.x) * scale, py = (list[t].y - g.y) * scale;
      var j0 = Math.max(0, Math.floor(py - rr)), j1 = Math.min(H - 1, Math.ceil(py + rr));
      var i0 = Math.max(0, Math.floor(px - rr)), i1 = Math.min(W - 1, Math.ceil(px + rr));
      var i, j;
      if (i0 < bx0) bx0 = i0; if (i1 > bx1) bx1 = i1; if (j0 < by0) by0 = j0; if (j1 > by1) by1 = j1;
      for (i = i0; i <= i1; i++) colF[i - i0] = Math.exp(-((i - px) * (i - px)) / den);
      for (j = j0; j <= j1; j++) {
        var dy = (j - py) * (j - py);
        if (dy > rr2) continue;
        var ry = Math.exp(-dy / den), row = j * W;
        for (i = i0; i <= i1; i++) {
          var dx = (i - px) * (i - px);
          if (dx + dy <= rr2) a[row + i] += ry * colF[i - i0];       // 圆形截断（3σ）
        }
      }
    }
    return { a: a, x0: bx0, x1: bx1, y0: by0, y1: by1 };
  }

  /** 一个尺度：groups = [[id, list], ...]；color(id) 为空则只求锚点 */
  function level(groups, sigma, color, g, anchors) {
    var N = g.W * g.H, total = new Float32Array(N), fields = [], i, k;
    for (k = 0; k < groups.length; k++) {
      var f = field(groups[k][1], sigma, g);
      fields.push(f);
      for (var jj = f.y0; jj <= f.y1; jj++) for (i = jj * g.W + f.x0; i <= jj * g.W + f.x1; i++) total[i] += f.a[i];
    }
    var rs = color ? new Float32Array(N) : null, gs = color ? new Float32Array(N) : null, bs = color ? new Float32Array(N) : null, mass = color ? new Float32Array(N) : null;
    for (k = 0; k < groups.length; k++) {
      var F = fields[k], a = F.a, best = -1, ix = 0, rgb = color ? hexToRgb(color(groups[k][0])) : null;
      for (var j2 = F.y0; j2 <= F.y1; j2++) for (i = j2 * g.W + F.x0; i <= j2 * g.W + F.x1; i++) {
        var d = a[i];
        if (d < 0.002) continue;
        var purity = d / (total[i] + 0.35), score = d * Math.sqrt(purity);
        if (score > best) { best = score; ix = i; }
        if (rgb) {
          var w = d * Math.pow(purity, 0.85);
          mass[i] += w; rs[i] += w * rgb.r; gs[i] += w * rgb.g; bs[i] += w * rgb.b;
        }
      }
      anchors[groups[k][0]] = { x: g.x + (ix % g.W) / g.scale, y: g.y + Math.floor(ix / g.W) / g.scale };
    }
    return { total: total, rs: rs, gs: gs, bs: bs, mass: mass };
  }

  /**
   * 计算密度纹理与标签锚点。
   * cfg（MG.config.background.density）：{ longSide, padRatio, sigmaRegion, sigmaCluster, sigmaSector,
   *                                       kRegion, kCluster, mix, alpha }
   * 返回 { x,y,w,h,W,H, rgba:Uint8ClampedArray, alpha, anchors:{region,cluster,sector}, groups } 或 null
   */
  function compute(graph, cfg) {
    cfg = cfg || {};
    var nodes = graph.nodes;
    if (!nodes || nodes.length < 2) return null;
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, i;
    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.x < minX) minX = n.x; if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y; if (n.y > maxY) maxY = n.y;
    }
    var pad = (cfg.padRatio == null ? 0.35 : cfg.padRatio) * Math.max(maxX - minX, maxY - minY);
    var g = { x: minX - pad, y: minY - pad, w: maxX - minX + 2 * pad, h: maxY - minY + 2 * pad };
    var side = cfg.longSide || 512;
    g.scale = side / Math.max(g.w, g.h);
    g.W = Math.max(2, Math.round(g.w * g.scale)); g.H = Math.max(2, Math.round(g.h * g.scale));
    var N = g.W * g.H;

    var rmap = Object.create(null), cmap = Object.create(null);
    (graph.regions || []).forEach(function (r) { rmap[r.id] = r; });
    (graph.clusters || []).forEach(function (c) { cmap[c.id] = c; });
    var rg = Object.create(null), cg = Object.create(null), sg = Object.create(null), ro = [], co = [], so = [];
    function add(map, order, id, nd) { if (!id) return; if (!map[id]) { map[id] = []; order.push(id); } map[id].push(nd); }
    nodes.forEach(function (nd) {
      var home = (nd.clusterObj && nd.clusterObj.parent) || (nd.regions && nd.regions[0]);
      /* 大板块归属：运行时取 graph.sectorOf；构建的无头环境不载入 sectors.js，由调用方经 cfg.sectorOfRegion 传入 */
      var secId = cfg.sectorOfRegion ? cfg.sectorOfRegion[home] : (graph.sectorOf && graph.sectorOf[home] && graph.sectorOf[home].id);
      add(rg, ro, home, nd); add(cg, co, nd.clusterObj && nd.clusterObj.id, nd); add(sg, so, secId, nd);
    });
    var toGroups = function (map, order) { return order.slice().sort().map(function (id) { return [id, map[id]]; }); };   // 固定顺序 ⇒ 确定
    var anchors = { region: {}, cluster: {}, sector: {} };
    var regionColor = function (id) { return rmap[id] && rmap[id].color; };
    var clusterColor = function (id) { var c = cmap[id]; return (c && c.color) || (c && rmap[c.parent] && rmap[c.parent].color); };
    var coarse = level(toGroups(rg, ro), cfg.sigmaRegion || 180, regionColor, g, anchors.region);
    var fine = level(toGroups(cg, co), cfg.sigmaCluster || 95, clusterColor, g, anchors.cluster);
    level(toGroups(sg, so), cfg.sigmaSector || 240, null, g, anchors.sector);

    var rgba = new Uint8ClampedArray(N * 4), a0 = cfg.alpha == null ? 0.44 : cfg.alpha;
    var kR = cfg.kRegion == null ? 0.115 : cfg.kRegion, kC = cfg.kCluster == null ? 0.32 : cfg.kCluster, mixF = cfg.mix == null ? 0.42 : cfg.mix;
    for (i = 0; i < N; i++) {
      var cm = coarse.mass[i], fm = fine.mass[i];
      if (cm + fm < 0.002) continue;
      var k = cm > 0 && fm > 0 ? mixF : fm > 0 ? 1 : 0, ic = cm > 0 ? (1 - k) / cm : 0, ifn = fm > 0 ? k / fm : 0;
      rgba[4 * i] = coarse.rs[i] * ic + fine.rs[i] * ifn;
      rgba[4 * i + 1] = coarse.gs[i] * ic + fine.gs[i] * ifn;
      rgba[4 * i + 2] = coarse.bs[i] * ic + fine.bs[i] * ifn;
      rgba[4 * i + 3] = 255 * a0 * (1 - Math.exp(-(kR * coarse.total[i] + kC * fine.total[i])));
    }
    return { x: g.x, y: g.y, w: g.w, h: g.h, W: g.W, H: g.H, rgba: rgba, alpha: a0, anchors: anchors, groups: ro.length };
  }

  MG.density = { compute: compute };
})(typeof window !== 'undefined' ? window : globalThis);
