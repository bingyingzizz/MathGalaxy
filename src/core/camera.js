/* ==========================================================================
   数学星图 · 相机（缩放 / 平移 / 坐标变换 / 动画）
   世界坐标 → 屏幕坐标：  sx = wx * k + tx
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;
  var CFG = MG.config.camera;

  function createCamera() {
    var cam = {
      k: 1, tx: 0, ty: 0,
      viewW: 1, viewH: 1,

      /* 记录当前动画状态 */
      _anim: null,

      setViewport: function (w, h) {
        cam.viewW = w; cam.viewH = h;
      },

      toScreen: function (wx, wy) {
        return { x: wx * cam.k + cam.tx, y: wy * cam.k + cam.ty };
      },

      toWorld: function (sx, sy) {
        return { x: (sx - cam.tx) / cam.k, y: (sy - cam.ty) / cam.k };
      },

      /** 世界长度 → 屏幕长度 */
      scale: function (len) { return len * cam.k; },

      /** 以屏幕点 (sx,sy) 为锚点缩放到 newK */
      zoomTo: function (newK, sx, sy) {
        var k2 = U.clamp(newK, CFG.minZoom, CFG.maxZoom);
        if (k2 === cam.k) return false;
        var w = cam.toWorld(sx, sy);
        cam.k = k2;
        cam.tx = sx - w.x * cam.k;
        cam.ty = sy - w.y * cam.k;
        return true;
      },

      /** 相对缩放（factor > 1 放大） */
      zoomBy: function (factor, sx, sy) {
        if (sx == null) { sx = cam.viewW / 2; sy = cam.viewH / 2; }
        return cam.zoomTo(cam.k * factor, sx, sy);
      },

      /** 平移（屏幕像素） */
      panBy: function (dx, dy) {
        cam.tx += dx; cam.ty += dy;
        cam._anim = null;
      },

      /** 把世界坐标点移到屏幕中心 */
      centerOn: function (wx, wy) {
        cam.tx = cam.viewW / 2 - wx * cam.k;
        cam.ty = cam.viewH / 2 - wy * cam.k;
      },

      /** 让世界矩形 bbox 适配视口 */
      fit: function (bbox, padding) {
        var pad = padding == null ? CFG.fitPadding : padding;
        // 小屏幕上别让留白吃掉整个视野
        pad = Math.min(pad, Math.min(cam.viewW, cam.viewH) * 0.18);
        var w = Math.max(1, bbox.maxX - bbox.minX);
        var h = Math.max(1, bbox.maxY - bbox.minY);
        var availW = Math.max(40, cam.viewW - pad * 2);
        var availH = Math.max(40, cam.viewH - pad * 2);
        var k = Math.min(availW / w, availH / h);
        k = U.clamp(k, Math.max(CFG.minZoom, CFG.fitMinZoom),
          Math.min(CFG.maxZoom, CFG.maxFitZoom));
        cam.k = k;
        cam.centerOn((bbox.minX + bbox.maxX) / 2, (bbox.minY + bbox.maxY) / 2);
      },

      /* --------------------------------------------------------- 动画 */
      /** 平滑移动到目标视角；target = {k, cx, cy}（cx,cy 为世界中心） */
      animateTo: function (target, ms) {
        var k0 = cam.k, tx0 = cam.tx, ty0 = cam.ty;
        var k1 = U.clamp(target.k == null ? cam.k : target.k, CFG.minZoom, CFG.maxZoom);
        var tx1 = target.cx != null ? cam.viewW / 2 - target.cx * k1 : cam.tx;
        var ty1 = target.cy != null ? cam.viewH / 2 - target.cy * k1 : cam.ty;
        cam._anim = { t0: now(), dur: ms == null ? CFG.animateMs : ms, k0: k0, tx0: tx0, ty0: ty0, k1: k1, tx1: tx1, ty1: ty1 };
      },

      stopAnimation: function () { cam._anim = null; },

      /** 每帧调用；返回 true 表示还在动画中 */
      tick: function () {
        var a = cam._anim;
        if (!a) return false;
        var p = U.clamp((now() - a.t0) / a.dur, 0, 1);
        var e = U.easeInOutCubic(p);
        cam.k = U.lerp(a.k0, a.k1, e);
        cam.tx = U.lerp(a.tx0, a.tx1, e);
        cam.ty = U.lerp(a.ty0, a.ty1, e);
        if (p >= 1) cam._anim = null;
        return true;
      },

      get animating() { return !!cam._anim; }
    };
    return cam;
  }

  function now() {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  }

  MG.createCamera = createCamera;
})(typeof window !== 'undefined' ? window : globalThis);
