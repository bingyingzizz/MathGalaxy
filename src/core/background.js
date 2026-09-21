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

  /** 建一张覆盖全部内容的云雾纹理 */
  function buildTexture(graph) {
    var bc = MG.config.background;
    var bb = graph.bbox();

    var pad = 240;
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
      if (!region.stat) return;                       // 空板块不画云
      drawn++;
      paintRegion(ctx, region, graph, bc);
    });

    return {
      canvas: cv,
      x: minX, y: minY, w: w, h: h,
      scale: scale,
      regions: drawn
    };
  }

  function paintRegion(ctx, region, graph, bc) {
    var st = region.stat;
    var rgb = U.hexToRgb(region.color);
    var R = st.radius;
    var rand = U.rngFrom(region.id, MG.config.seed);

    /* 1) 板块中心的大团雾 —— 界定「这块地方属于谁」 */
    blob(ctx, rgb, st.cx, st.cy, R, bc.centerAlpha * 1.15);

    /* 2) 随机软斑 —— 让云看起来不规整 */
    for (var i = 0; i < bc.blobsPerRegion; i++) {
      var ang = rand() * Math.PI * 2;
      var rad = Math.sqrt(rand()) * R * bc.spread;
      var x = st.cx + Math.cos(ang) * rad;
      var y = st.cy + Math.sin(ang) * rad;
      var br = R * U.lerp(bc.blobRadiusMin, bc.blobRadiusMax, rand());
      var a = bc.blobAlpha * U.lerp(0.55, 1.25, rand());
      blob(ctx, rgb, x, y, br, a);
    }

    /* 3) 每个节点周围的小斑 —— 让云的形状跟着内容走 */
    graph.nodes.forEach(function (n) {
      if (n.regions.indexOf(region.id) < 0) return;
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
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(tex.canvas, sx, sy, sw, sh);
  }

  MG.background = {
    buildTexture: buildTexture,
    draw: draw
  };
})(typeof window !== 'undefined' ? window : globalThis);
