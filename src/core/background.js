/* ==========================================================================
   数学星图 · 电子云背景（ENG-009 雾场 + 背景粒子全删）
   --------------------------------------------------------------------------
   用户口径（2026-11-08）：
     · 背景只保留「颜色雾」，ENG-009 的雾场纹理是最终版本；
     · 背景的粒子 / 星点 / 辉光 / stipple 全部删掉，任何视口都不画点；
     · 手机/桌面同一套代码、同一张世界坐标雾纹理。
   实现：覆盖可见节点 bbox + 35% padding 的离屏纹理，每个板块画一团径向渐变，
   四周 destination-in 羽化到 alpha=0；每帧只按世界坐标 drawImage 一次。
   页面大背景仍然是纯白（深色主题由 CSS 变量决定）。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  function buildTexture(graph, isVisible) {
    var bc = MG.config.background;
    var ok = isVisible || function () { return true; };

    /* 可见节点 bbox（隐藏节点不参与）。 */
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    (graph.nodes || []).forEach(function (n) {
      if (!ok(n.id)) return;
      if (n.x < minX) minX = n.x;
      if (n.x > maxX) maxX = n.x;
      if (n.y < minY) minY = n.y;
      if (n.y > maxY) maxY = n.y;
    });
    if (!isFinite(minX)) { minX = -100; minY = -100; maxX = 100; maxY = 100; }

    /* ENG-009 的取景：内容 bbox + 35% padding（按长边算）。 */
    var padRatio = bc.fogPadRatio == null ? 0.35 : bc.fogPadRatio;
    var padW = padRatio * Math.max(maxX - minX, maxY - minY);
    var fx = minX - padW, fy = minY - padW;
    var fw = (maxX - minX) + 2 * padW, fh = (maxY - minY) + 2 * padW;

    /* ENG-009 的分辨率公式：长边 768（≈1540 节点时 747×768），适配档约 1 texel/屏幕像素。 */
    var maxSide = bc.fogMaxSide == null ? 768 : bc.fogMaxSide;
    var fs = Math.min(maxSide / Math.max(fw, fh), 2);
    var cwT = Math.max(2, Math.round(fw * fs));
    var chT = Math.max(2, Math.round(fh * fs));

    var fcv = document.createElement('canvas');
    fcv.width = cwT; fcv.height = chT;
    var fctx = fcv.getContext('2d');
    fctx.setTransform(fs, 0, 0, fs, -fx * fs, -fy * fs);

    /* ENG-009 的四档渐变：0.36 → 0.22 → 0.07 → 0（画的时候再按主题乘 0.10/0.12 / 0.36）。 */
    var a0 = bc.fogAlpha == null ? 0.44 : bc.fogAlpha;
    var regions = 0;
    var warnedBadStat = false;
    (graph.regions || []).forEach(function (reg) {
      if (!reg.stat) return;
      /* ⚠️ 冷启动/旧缓存时 layout 可能还没把 stat 算成有限数（cx/cy/radius 为
         undefined/NaN）。createRadialGradient 收到非有限数会抛
         "The provided double value is non-finite" 并把整页启动打断 —— 跳过即可。 */
      var rcx = reg.stat.cx, rcy = reg.stat.cy, rr = reg.stat.radius;
      if (!isFinite(rcx) || !isFinite(rcy) || !isFinite(rr)) {
        if (!warnedBadStat) {
          warnedBadStat = true;
          console.warn('[background] 跳过 stat 非有限的板块：' + reg.id, rcx, rcy, rr);
        }
        return;
      }
      var rgb = U.hexToRgb(reg.color || '#7A8699');
      var css = rgb.r + ',' + rgb.g + ',' + rgb.b;
      var FR = Math.max(4, rr);
      var grd = fctx.createRadialGradient(rcx, rcy, 0, rcx, rcy, FR);
      grd.addColorStop(0, 'rgba(' + css + ',' + a0 + ')');
      grd.addColorStop(0.55, 'rgba(' + css + ',' + (a0 * 0.61) + ')');
      grd.addColorStop(0.85, 'rgba(' + css + ',' + (a0 * 0.19) + ')');
      grd.addColorStop(1, 'rgba(' + css + ',0)');
      fctx.fillStyle = grd;
      fctx.beginPath(); fctx.arc(rcx, rcy, FR, 0, Math.PI * 2); fctx.fill();
      regions++;
    });

    /* 外缘羽化：中心 80% 实、到 100% 渐隐到 0 —— 纹理四周 alpha 必为 0。 */
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.globalCompositeOperation = 'destination-in';
    var cT = cwT / 2, cY = chT / 2;
    var RT = 0.5 * Math.sqrt(cwT * cwT + chT * chT);
    var fade = fctx.createRadialGradient(cT, cY, 0, cT, cY, RT);
    fade.addColorStop(0, 'rgba(0,0,0,1)');
    fade.addColorStop(0.80, 'rgba(0,0,0,1)');
    fade.addColorStop(1, 'rgba(0,0,0,0)');
    fctx.fillStyle = fade;
    fctx.fillRect(0, 0, cwT, chT);
    fctx.globalCompositeOperation = 'source-over';

    return {
      canvas: fcv, x: fx, y: fy, w: fw, h: fh,
      alpha: a0, cw: cwT, ch: chT, regions: regions
    };
  }

  function draw(ctx, cam, tex, dpr) {
    /* ⚠️ 必须整层清掉再画（ENG-009 的口径）：app 只在相机变了的帧调用 draw，
       不清就会把上一帧的雾**叠**上去，拖动/缩放几帧后颜色越叠越浓。 */
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!tex || !tex.canvas) return;
    dpr = dpr || 1;
    var k = cam.k, tx = cam.tx, ty = cam.ty;
    var vw = cam.viewW;
    var vh = cam.viewH;
    if (!(vw > 0) || !(vh > 0)) {
      vw = ctx.canvas.width / dpr;
      vh = ctx.canvas.height / dpr;
    }

    /* ENG-009：主题在运行时切换（不重建纹理），所以每帧按 data-theme 取倍率。 */
    var dark = false;
    try { dark = document.documentElement.getAttribute('data-theme') === 'dark'; } catch (e) {}
    var bc = MG.config.background;
    var glow = dark ? (bc.fogGlowDark == null ? 0.145 : bc.fogGlowDark)
                    : (bc.fogGlowLight == null ? 0.12 : bc.fogGlowLight);

    /* ENG-012（用户：「放大后几乎看不见」）：纹理在 k=1 时被放大 ~10 倍，
       只剩一层很淡的平滑底雾。这里按 k 给一个**只加不透明度、不加尺寸**的补偿：
       fit 档 ×1，k≈1 起 ×(1+boost)。雾仍来自同一张世界纹理，不另起分层/分端。 */
    var zr = Math.max(0, Math.min(1, (k - 0.12) / 0.88));
    var zoomBoost = 1 + zr * (bc.fogZoomBoost == null ? 1.3 : bc.fogZoomBoost);

    /* 只贴纹理与视口相交的那块（高倍时不会去光栅化上万像素的整图）。 */
    var wf0 = Math.max(tex.x, -tx / k);
    var wf1 = Math.min(tex.x + tex.w, (vw - tx) / k);
    var hf0 = Math.max(tex.y, -ty / k);
    var hf1 = Math.min(tex.y + tex.h, (vh - ty) / k);
    if (!(wf1 > wf0 && hf1 > hf0)) return;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = Math.min(1, (glow / (tex.alpha || 0.44)) * zoomBoost);
    if ('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(tex.canvas,
      (wf0 - tex.x) / tex.w * tex.cw, (hf0 - tex.y) / tex.h * tex.ch,
      (wf1 - wf0) / tex.w * tex.cw, (hf1 - hf0) / tex.h * tex.ch,
      wf0 * k + tx, hf0 * k + ty, (wf1 - wf0) * k, (hf1 - hf0) * k);
    ctx.restore();
  }

  MG.background = {
    buildTexture: buildTexture,
    draw: draw
  };
})(typeof window !== 'undefined' ? window : globalThis);
