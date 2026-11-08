/* ==========================================================================
   数学星图 · 电子云背景（ENG-010：全端统一的雾场）
   --------------------------------------------------------------------------
   一套实现，手机/桌面共用同一个世界坐标雾场纹理：
     · 覆盖可见节点 bbox + 35% padding；
     · 每个板块（region）在纹理上画一团径向渐变的柔和色雾；
     · 纹理四周用 destination-in 径向羽化到 alpha=0，所以永远没有「云的边」；
     · 每帧只按世界坐标 drawImage 一次（视口相交块），不做任何逐点绘制。
   页面大背景仍然是纯白（深色主题由 CSS 变量决定）。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  /* 纹理分辨率：长边与总像素都设上限（这张纹理每帧要整张重铺一次）。
     2048 长边在 1600×900 的适配档约等于 0.47 屏幕像素/texel（缩小时更细），
     390×844 手机上更小，不会糊成方块。 */
  function texSizeFor(w, h, bc) {
    var maxSide = bc.fogMaxSide || 2048;
    var maxPx = bc.fogMaxPixels || 4200000;
    var s = Math.min(maxSide / Math.max(w, h), Math.sqrt(maxPx / (w * h)));
    s = Math.max(0.02, s);
    return { tw: Math.max(64, Math.round(w * s)), th: Math.max(64, Math.round(h * s)) };
  }

  function buildTexture(graph, isVisible) {
    var bc = MG.config.background;
    /* 2026-11-08：用户要求背景直接不可见。保留雾场代码，但默认关闭；
       打开时把 config.background.enabled 设为 true 即可恢复。 */
    if (bc.enabled === false) return null;
    var ok = isVisible || function () { return true; };

    /* 可见节点 bbox（隐藏节点不参与，和以前的可见性语义一致）。 */
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    (graph.nodes || []).forEach(function (n) {
      if (!ok(n.id)) return;
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });
    if (!isFinite(minX)) { minX = -100; minY = -100; maxX = 100; maxY = 100; }

    /* +35% padding：雾在内容外侧还有一大圈，视口贴在内容边上时也不会露出纹理边。 */
    var pad = Math.max(1, (bc.fogPadRatio == null ? 0.35 : bc.fogPadRatio)
      * Math.max(maxX - minX, maxY - minY));
    var x0 = minX - pad, y0 = minY - pad;
    var w = (maxX - minX) + 2 * pad, h = (maxY - minY) + 2 * pad;

    var ts = texSizeFor(w, h, bc);
    var TW = ts.tw, TH = ts.th;
    var cv = document.createElement('canvas');
    cv.width = TW; cv.height = TH;
    var ctx = cv.getContext('2d');
    /* 世界坐标 → 纹理像素，下面一律用世界单位画。 */
    ctx.setTransform(TW / w, 0, 0, TH / h, -x0 * TW / w, -y0 * TH / h);

    var alpha0 = bc.fogAlpha == null ? 0.085 : bc.fogAlpha;
    var regions = 0;
    (graph.regions || []).forEach(function (reg) {
      if (!reg.stat) return;
      var rgb = U.hexToRgb(reg.color || '#7A8699');
      var c = rgb.r + ',' + rgb.g + ',' + rgb.b + ',';
      var pr = Math.max(4, reg.stat.radius * 1.05);
      var g = ctx.createRadialGradient(reg.stat.cx, reg.stat.cy, 0, reg.stat.cx, reg.stat.cy, pr);
      /* 五档平滑尾：0.45 之后一路压到 0，避免外缘出现「浓度突然掉到 0」的硬边。 */
      g.addColorStop(0, 'rgba(' + c + alpha0 + ')');
      g.addColorStop(0.45, 'rgba(' + c + (alpha0 * 0.62) + ')');
      g.addColorStop(0.72, 'rgba(' + c + (alpha0 * 0.24) + ')');
      g.addColorStop(0.88, 'rgba(' + c + (alpha0 * 0.08) + ')');
      g.addColorStop(1, 'rgba(' + c + '0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(reg.stat.cx, reg.stat.cy, pr, 0, Math.PI * 2); ctx.fill();
      regions++;
    });

    /* 纹理四边羽化：中心 78% 保持，最后 22% 渐隐到完全透明。
       这样即便视口正好停在纹理边界，也看不到一条直线。 */
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'destination-in';
    var cxT = TW / 2, cyT = TH / 2;
    var RT = 0.5 * Math.sqrt(TW * TW + TH * TH);
    var fade = ctx.createRadialGradient(cxT, cyT, 0, cxT, cyT, RT);
    fade.addColorStop(0, 'rgba(0,0,0,1)');
    fade.addColorStop(0.78, 'rgba(0,0,0,1)');
    fade.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, TW, TH);
    ctx.globalCompositeOperation = 'source-over';

    /* 抹掉低对比渐变自带的 dither（否则放大后是周期约 2 texel 的格子）。 */
    var out = smoothTexture(cv, bc.fogBlur == null ? 1.2 : bc.fogBlur);
    return { canvas: out, x: x0, y: y0, w: w, h: h, scale: 1, regions: regions, clusters: 0 };
  }

  /* 每帧：只把纹理与视口相交的那块按世界坐标画到屏幕上。 */
  function draw(ctx, cam, tex, dpr) {
    if (!tex || !tex.canvas) return;
    var k = cam.k, tx = cam.tx, ty = cam.ty;
    var vw = cam.viewW, vh = cam.viewH;
    if (!(vw > 0) || !(vh > 0)) {
      vw = ctx.canvas.width / dpr;
      vh = ctx.canvas.height / dpr;
    }
    /* 视口覆盖的世界矩形 ⊕ 纹理范围。 */
    var wx0 = Math.max(tex.x, -tx / k);
    var wx1 = Math.min(tex.x + tex.w, (vw - tx) / k);
    var wy0 = Math.max(tex.y, -ty / k);
    var wy1 = Math.min(tex.y + tex.h, (vh - ty) / k);
    if (!(wx1 > wx0) || !(wy1 > wy0)) return;

    var cw = tex.canvas.width, ch = tex.canvas.height;
    var sx = (wx0 - tex.x) / tex.w * cw;
    var sy = (wy0 - tex.y) / tex.h * ch;
    var sw = (wx1 - wx0) / tex.w * cw;
    var sh = (wy1 - wy0) / tex.h * ch;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    /* 不能开 'high'：雾本来就是糊的，高采样质量在 dpr2 全屏放大时会吃掉半帧。 */
    ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(tex.canvas,
      sx, sy, sw, sh,
      wx0 * k + tx, wy0 * k + ty, (wx1 - wx0) * k, (wy1 - wy0) * k);
  }

  /* 小半径模糊：抹掉径向渐变的 dither（成本只在建纹理时付一次）。 */
  function smoothTexture(src, r) {
    var out = document.createElement('canvas');
    out.width = src.width;
    out.height = src.height;
    var c = out.getContext('2d');
    c.filter = 'blur(' + (r == null ? 1.2 : r) + 'px)';
    c.drawImage(src, 0, 0);
    c.filter = 'none';
    return out;
  }

  MG.background = {
    buildTexture: buildTexture,
    draw: draw
  };
})(typeof window !== 'undefined' ? window : globalThis);
