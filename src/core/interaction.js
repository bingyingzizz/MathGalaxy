/* ==========================================================================
   数学星图 · 交互
   --------------------------------------------------------------------------
   · 拖拽平移
   · 滚轮缩放（可在工具条里切成「滚轮平移」，照顾触控板）
   · 双指捏合缩放 + 双指拖动
   · 悬停高亮、点击选中
   命中检测交给 renderer（节点 → 优先；连线 → 次之）。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;
  var C = MG.config;

  function createInteraction(canvas, view, hooks) {
    var pointers = new Map();
    var mode = 'idle';
    var downAt = null;       // 屏幕坐标
    var downTime = 0;
    var moved = false;
    var lastPinch = null;
    var hoverDirty = false;
    var rafPending = false;
    /* 诊断用：输入处理耗时的累加（HUD 读完自己清零）。真实拖拽时每帧都会跑好几次
       指针回调，这里是把「输入这一侧到底吃多少」量出来的唯一办法。 */
    var prof = { ms: 0, n: 0 };

    /** 包一层计时：不改原逻辑，只累加耗时 */
    function profiled(fn) {
      return function (e) {
        var t0 = performance.now ? performance.now() : 0;
        try { return fn(e); } finally {
          if (t0) { prof.ms += performance.now() - t0; prof.n++; }
        }
      };
    }

    function localPos(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function requestDraw() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () { rafPending = false; hooks.draw(); });
    }

    /* ------------------------------------------------------- 指针按下 */
    function onPointerDown(e) {
      if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return;
      canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
      var p = localPos(e);
      pointers.set(e.pointerId, p);
      view.cam.stopAnimation();

      if (pointers.size === 1) {
        mode = 'pan';
        downAt = p;
        lastPoint = p;           // 平移增量的基准点
        downTime = performance.now ? performance.now() : Date.now();
        moved = false;
      } else if (pointers.size === 2) {
        mode = 'pinch';
        moved = true;
        lastPinch = pinchState();
      }
      requestDraw();
    }

    function pinchState() {
      var pts = Array.from(pointers.values());
      if (pts.length < 2) return null;
      var a = pts[0], b = pts[1];
      return {
        d: Math.max(1, U.dist(a.x, a.y, b.x, b.y)),
        cx: (a.x + b.x) / 2,
        cy: (a.y + b.y) / 2
      };
    }

    /* ------------------------------------------------------- 指针移动 */
    function onPointerMove(e) {
      var p = localPos(e);

      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, p);

      if (mode === 'pinch' && pointers.size >= 2) {
        var now = pinchState();
        if (lastPinch && now) {
          view.cam.panBy(now.cx - lastPinch.cx, now.cy - lastPinch.cy);
          view.cam.zoomBy(now.d / lastPinch.d, now.cx, now.cy);
          lastPinch = now;
        }
        requestDraw();
        scheduleHover(p);
        return;
      }

      if (mode === 'pan' && pointers.size === 1 && pointers.has(e.pointerId)) {
        var dx = p.x - lastPoint.x, dy = p.y - lastPoint.y;
        if (!moved && Math.abs(p.x - downAt.x) + Math.abs(p.y - downAt.y) > 4) {
          moved = true;
          canvas.classList.add('dragging');
        }
        if (moved) { view.cam.panBy(dx, dy); lastPoint = p; requestDraw(); }
        return;
      }

      scheduleHover(p);
    }

    var lastPoint = { x: 0, y: 0 };
    var hoverPos = { x: 0, y: 0 };

    function scheduleHover(p) {
      hoverPos = p;
      if (hoverDirty) return;
      hoverDirty = true;
      requestAnimationFrame(function () {
        hoverDirty = false;
        if (mode === 'pinch') return;
        if (mode === 'pan' && moved) { applyHover(null); return; }  // 拖拽时不谈悬停
        var hit = hooks.hitTest(hoverPos.x, hoverPos.y);
        applyHover(hit);
      });
    }

    function applyHover(hit) {
      var cur = view.hover;
      var same = (cur == null && hit == null) ||
        (cur && hit && cur.type === hit.type && cur.id === hit.id);
      canvas.classList.toggle('pointing', !!hit);
      if (same) return;
      view.hover = hit;
      hooks.onHover && hooks.onHover(hit);
      requestDraw();
    }

    /* ------------------------------------------------------- 指针抬起 */
    function onPointerUp(e) {
      var p = localPos(e);
      var wasMode = mode;
      pointers.delete(e.pointerId);
      canvas.releasePointerCapture && canvas.releasePointerCapture(e.pointerId);

      if (pointers.size === 0) {
        canvas.classList.remove('dragging');
        if (mode === 'pan' && !moved) {
          var dt = (performance.now ? performance.now() : Date.now()) - downTime;
          if (dt < 700) {
            var hit = hooks.hitTest(p.x, p.y);
            hooks.onPick && hooks.onPick(hit);
          }
        }
        mode = 'idle';
        lastPinch = null;
        scheduleHover(p);
      } else if (pointers.size === 1) {
        mode = 'pan';
        lastPoint = Array.from(pointers.values())[0];
        downAt = lastPoint;
        moved = true;
        lastPinch = null;
      } else {
        mode = 'idle';
      }
      requestDraw();
      return wasMode;
    }

    function onPointerCancel(e) {
      pointers.delete(e.pointerId);
      if (pointers.size === 0) { mode = 'idle'; canvas.classList.remove('dragging'); }
      lastPinch = pinchState();
    }

    /* ------------------------------------------------------------ 滚轮 */
    function onWheel(e) {
      e.preventDefault();
      var p = localPos(e);
      var isPinch = e.ctrlKey || e.metaKey;   // 触控板捏合 → 浏览器给的是 ctrl+wheel
      var zoom = isPinch || C.wheelZooms;

      if (zoom) {
        // 归一化不同设备的 delta
        var unit = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? 400 : 1);
        var d = e.deltaY * unit;
        var factor = Math.exp(-d * C.camera.wheelGain);
        view.cam.stopAnimation();
        if (view.cam.zoomBy(factor, p.x, p.y)) requestDraw();
      } else {
        var unit2 = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? 400 : 1);
        view.cam.panBy(-e.deltaX * unit2, -e.deltaY * unit2);
        requestDraw();
      }
    }

    /* --------------------------------------------------------- 绑定 */
    canvas.addEventListener('pointerdown', profiled(onPointerDown));
    canvas.addEventListener('pointermove', profiled(onPointerMove));
    canvas.addEventListener('pointerup', profiled(onPointerUp));
    canvas.addEventListener('pointercancel', profiled(onPointerCancel));
    canvas.addEventListener('pointerleave', function () { applyHover(null); });
    canvas.addEventListener('wheel', profiled(onWheel), { passive: false });
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    return {
      profile: prof,
      destroy: function () {
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerup', onPointerUp);
        canvas.removeEventListener('pointercancel', onPointerCancel);
        canvas.removeEventListener('wheel', onWheel);
      }
    };
  }

  MG.createInteraction = createInteraction;
})(typeof window !== 'undefined' ? window : globalThis);
