/* ==========================================================================
   数学星图 · 电子云背景
   --------------------------------------------------------------------------
   每个数学板块（region）在背景里渲染一团半透明彩色云雾：
     · 一朵中心大雾 + 若干随机分布的软斑 + 每个节点周围的小斑
     · 越靠近板块边界越淡（斑块本身是径向渐变，中心浓、边缘透明）
     · 整块云先画在世界坐标的一张离屏纹理上，再随相机一起缩放绘制
       → 拖动/缩放时只做一次 drawImage，性能稳定
   页面大背景仍然是纯白。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  /**
   * 建一张覆盖全部内容的云雾纹理。
   * isVisible 可选：藏起来的点不再往云里加斑；整团都藏光 → 连云一起收掉。
   * （所以「只看测度论」时，背景也跟着瘦成那一块，不会有空云飘着）
   */
  function buildTexture(graph, isVisible) {
    var bc = MG.config.background;
    var ok = isVisible || function () { return true; };
    var bb = graph.bbox();

    var pad = 300;
    var minX = bb.minX - pad, minY = bb.minY - pad;
    var maxX = bb.maxX + pad, maxY = bb.maxY + pad;
    var w = (maxX - minX) * bc.dilate;
    var h = (maxY - minY) * bc.dilate;
    minX -= (w - (maxX - minX)) / 2;
    minY -= (h - (maxY - minY)) / 2;

    var scale = bc.texScale;
    var cv = document.createElement('canvas');
    cv.width = Math.max(64, Math.round(w * scale));
    cv.height = Math.max(64, Math.round(h * scale));
    var ctx = cv.getContext('2d');

    // 世界坐标 → 纹理像素
    ctx.setTransform(scale, 0, 0, scale, -minX * scale, -minY * scale);

    var drawn = 0;
    (graph.regions || []).forEach(function (region) {
      if (!region.stat) return;                       // 空星系不画云
      var list = graph.nodes.filter(function (n) {
        return n.regions.indexOf(region.id) >= 0 && ok(n.id);
      });
      if (!list.length) return;                       // 点全被藏了 → 这一团云也收掉
      drawn++;
      paintRegion(ctx, region, list, bc);
    });

    // 星团：在星系云之上再叠一层更小更浓的云 → 看起来像星云里更密的结
    var cdrawn = 0;
    (graph.clusters || []).forEach(function (c) {
      if (!c.stat) return;
      var list = c.nodes.filter(function (n) { return ok(n.id); });
      if (!list.length) return;
      cdrawn++;
      paintCluster(ctx, c, list, graph, bc);
    });

    return {
      canvas: cv,
      x: minX, y: minY, w: w, h: h,
      scale: scale,
      regions: drawn,
      clusters: cdrawn
    };
  }

  /**
   * 星团的云：比星系云更小、更浓，用星团自己的颜色（没写就继承星系）
   * list 是这一团里「还看得见」的节点 —— 藏了一半，云也跟着缩一半。
   */
  function paintCluster(ctx, c, list, graph, bc) {
    var cc = MG.config.cluster;
    var galaxy = graph.galaxyOf ? graph.galaxyOf(c) : null;
    var rgb = U.hexToRgb(c.color || (galaxy ? galaxy.color : '#7A8699'));
    var R = fitRadius(list, cc.cloudMinRadius, cc.cloudPadding);
    var cx = centroid(list).x, cy = centroid(list).y;
    var rand = U.rngFrom(c.id, MG.config.seed);

    nebula(ctx, rgb, cx, cy, R * 0.98, cc.cloudAlpha * 1.15, rand);

    list.forEach(function (n) {
      blob(ctx, rgb, n.x, n.y, R * 0.24, cc.cloudAlpha * 0.8);
    });
  }

  function centroid(list) {
    if (!list.length) return { x: 0, y: 0 };
    var x = 0, y = 0;
    list.forEach(function (n) { x += n.x; y += n.y; });
    return { x: x / list.length, y: y / list.length };
  }

  /** 一群点需要多大的云：最远的一颗 + 余量（有下限，免得缩成一点） */
  function fitRadius(list, minR, padding) {
    if (!list.length) return minR;
    var c = centroid(list), maxd = 0;
    list.forEach(function (n) { maxd = Math.max(maxd, U.dist(n.x, n.y, c.x, c.y)); });
    return Math.max(minR, maxd + padding);
  }

  function paintRegion(ctx, region, list, bc) {
    var rgb = U.hexToRgb(region.color);
    var cx = region.center.x, cy = region.center.y;   // 星系的云以星系中心为心（和星系名一致）

    /* ⚠️ 半径只能按「主要属于这个星系」的点算。
       跨星系的点（regions 里写了两个）会被布局摆到**另一个**星系那边去，
       拿它们定半径，一朵云就会撑满整屏 —— 拓扑学只有 12 个成员，其中 4 个
       是 analysis 那侧的（Borel、积 σ-代数…），曾把整屏糊成粉色。
       规则与 layout.js 里算 stat.radius 时一致：跨星系的点不参与。 */
    var core = list.filter(function (n) { return !n.isBorder; });
    var basis = core.length >= 2 ? core : list;
    var maxd = 0;
    basis.forEach(function (n) { maxd = Math.max(maxd, U.dist(n.x, n.y, cx, cy)); });
    var R = Math.max(bc.cloudRadiusMin, maxd + bc.cloudMargin);
    var rand = U.rngFrom(region.id, MG.config.seed);

    /* 1) 板块中心的大团雾 —— 界定「这块地方属于谁」 */
    blob(ctx, rgb, cx, cy, R, bc.centerAlpha * 1.15);

    /* 2) 随机软斑 —— 让云看起来不规整 */
    for (var i = 0; i < bc.blobsPerRegion; i++) {
      var ang = rand() * Math.PI * 2;
      var rad = Math.sqrt(rand()) * R * bc.spread;
      var x = cx + Math.cos(ang) * rad;
      var y = cy + Math.sin(ang) * rad;
      var br = R * U.lerp(bc.blobRadiusMin, bc.blobRadiusMax, rand());
      var a = bc.blobAlpha * U.lerp(0.55, 1.25, rand());
      blob(ctx, rgb, x, y, br, a);
    }

    /* 3) 每个（看得见的）节点周围的小斑 —— 让云的形状跟着内容走 */
    basis.forEach(function (n) {
      blob(ctx, rgb, n.x, n.y, R * 0.30, bc.nodeAlpha);
    });
  }

  function blob(ctx, rgb, x, y, r, alpha) {
    if (r <= 0 || alpha <= 0) return;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0.00, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (alpha).toFixed(4) + ')');
    g.addColorStop(0.42, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (alpha * 0.62).toFixed(4) + ')');
    g.addColorStop(0.74, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (alpha * 0.22).toFixed(4) + ')');
    g.addColorStop(1.00, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * 星团的**星云**：一团柔雾做底色 + 一圈**不规则**的亮脊 + 几缕内部絮。
   *
   * ⚠️ 这里刻意**不画正圆**（原来是「中间淡、靠边一圈浓」的圆环，缩小时就是一个圆圈，很假）。
   * 亮脊由 11 块软斑沿一条起伏的线铺成，半径按三组正弦调制，相位用星团 id 定的种子 ——
   * 所以每个团形状都不一样，但同一个团每次打开都长一样（不会抖）。
   * 「团与团的边界」仍然靠这圈亮脊分出来，只是它不再是圆的。
   */
  function nebula(ctx, rgb, x, y, r, alpha, rand) {
    if (r <= 0 || alpha <= 0) return;
    var TWO = Math.PI * 2;

    /* 1) 核：一大团柔雾 —— 缩得很小时这一团还是一块有颜色的地方 */
    blob(ctx, rgb, x, y, r * 0.96, alpha * 0.20);

    /* 2) 亮脊：沿起伏的线铺一圈软斑 —— 这是「团的边界」所在，只是不再是正圆。
       16 块（相邻两块要搭得上，否则会变成一圈点）。 */
    var n = 16;
    var p1 = rand() * TWO, p2 = rand() * TWO, p3 = rand() * TWO;
    for (var i = 0; i < n; i++) {
      var th = i / n * TWO;
      var wob = 1
        + 0.15 * Math.sin(3 * th + p1)
        + 0.10 * Math.sin(5 * th + p2)
        + 0.06 * Math.sin(8 * th + p3);
      var rr = r * 0.88 * wob;
      var br = r * U.lerp(0.19, 0.26, rand());
      blob(ctx, rgb, x + Math.cos(th) * rr, y + Math.sin(th) * rr, br,
        alpha * U.lerp(0.85, 1.20, rand()));
    }

    /* 3) 内部的絮：5 缕有浓有淡的软斑 —— 星云的「不均匀」主要来自这里 */
    for (var j = 0; j < 5; j++) {
      var a2 = rand() * TWO, d2 = Math.sqrt(rand()) * r * 0.62;
      blob(ctx, rgb, x + Math.cos(a2) * d2, y + Math.sin(a2) * d2,
        r * U.lerp(0.16, 0.34, rand()), alpha * U.lerp(0.30, 0.62, rand()));
    }
  }

  /** 按相机把云雾纹理画到屏幕（白底由页面提供） */
  function draw(ctx, cam, tex, dpr) {
    dpr = dpr || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!tex) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var sx = tex.x * cam.k + cam.tx;
    var sy = tex.y * cam.k + cam.ty;
    var sw = tex.w * cam.k;
    var sh = tex.h * cam.k;
    ctx.imageSmoothingEnabled = true;
    /* ⚠️ 这一档**不能**用 'high'：云雾纹理是 0.42 倍世界尺寸，每帧要放大约 2.4 倍铺满全屏，
       high 档重采样实测吃掉半帧（dpr=2、1600×900 下整帧 72.9ms → 39.6ms；dpr=1 也有可观占比）。
       它本来就是一团模糊的雾，双线性放大看不出差别 —— 引擎里其它 drawImage（节点光晕）
       也一直是默认的 low。 */
    ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(tex.canvas, sx, sy, sw, sh);
  }

  MG.background = {
    buildTexture: buildTexture,
    draw: draw
  };
})(typeof window !== 'undefined' ? window : globalThis);
