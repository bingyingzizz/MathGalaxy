/* ==========================================================================
   世界/区域位图（Phase A + B）—— 引擎模块，不认识任何内容
   --------------------------------------------------------------------------
   单一快照模型：永远只有一份「已就绪」快照 + 最多一个构建任务在飞。
     Snapshot { surface, worldRect, bakeScale, dpr, k, paintRevision }
   **Phase A 与 B 的差别只有 worldRect 的取值**（同一份代码，不是两套状态机）：
     · k ≤ maxSide/世界最长边  ⇒ R = 整个世界   → 平移期间零重烘、永不越界
     · 否则                    ⇒ R = 视口 ⊕ 余量 → 越界就异步重烘、旧图继续用、就绪后原子替换
   为什么高倍率不能用世界图：面积 ∝ k²（k=1.44 时世界图 80Mpx/321MB，而视口只覆盖世界 3.8%）
   —— 付 100% 的钱用 4% 的东西；实测把单图上限抬到 8192 会直接卡死页面。

   为什么能精确：线宽 / 90px 曲率上限 / LOD alpha 斜坡 / spineOnly / 节点半径
   全都只依赖 k、与平移无关 ⇒ 烘在「当前 k」、显示时 m=k/k_bake ⇒ 纯平移时逐像素一致。

   载体：DOM canvas + CSS transform（拖动只改 transform ⇒ 合成器搬图层）。
   吸附：合成偏移吸附到设备像素网格 —— ⛔ 相机逻辑位置一律不动。
   不进烘焙：标签、hover 叠加层、光晕（光晕实时画，实测 ≈0.05ms）。
   资源：两代 canvas 轮换；建不出来按 maxSide 阶梯往下降，最小档还不行就关掉。
   ⚠️ 三个「等下一帧」的坑（都踩过）：settle 判定、换图定位、任何依赖后续帧的补写
       —— 相机静止时根本没有下一帧，必须用定时器 / 当场就位。
   ⚠️ 静态路径里任何读**实时相机/实时视口**的位置都会整体错位（screenOf 踩过）。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = global.MG = global.MG || {};

  function createWorldBitmap(opt) {
    var renderer = opt.renderer;
    var graph = opt.graph;
    var host = opt.host;                 // 容器
    var beforeEl = opt.beforeEl;         // 插在它前面（= 图层 canvas）
    var tiers = (opt.tiers && opt.tiers.length) ? opt.tiers.slice() : [4096, 3600, 2048];
    var ti = 0;
    var settleMs = opt.settleMs == null ? 180 : opt.settleMs;
    var marginPx = opt.marginPx == null ? 400 : opt.marginPx;   // 区域模式的余量（设备像素/边）
    var enabled = opt.enabled !== false;
    /* Phase B 区域模式开关。⚠️ 默认关：区域路径**尚未通过复验**（探针超时），
       不验证不上线；关掉时 k > 世界单图上限仍走实时画（= Phase A 的已验证行为）。
       打开：地址挂 #region=1 或运行期 MG.app.setRegion(true)。 */
    var regionOn = !!opt.region;

    var els = [null, null];              // 两代
    var cur = -1;
    var pending = false, settleTimer = 0, settleWanted = false, snapping = false;
    var buildGen = 0, rev = 0;
    var world = null, wW = 0, wH = 0;
    var last = { k: -1, tx: 0, ty: 0, dpr: 0, vw: 0, vh: 0 };
    var lastMove = 0, lastTransform = '', lastKey = '';
    var stats = { bakes: 0, lastMs: 0, peakMs: 0, swaps: 0, skipped: 0, regionBakes: 0, fallbackFrames: 0, reason: '', mode: '-' };
    var snap = { ready: false, rect: null, mode: '', scale: 0, k: 0, dpr: 1, rev: 0, key: '' };

    function now() { return (global.performance || Date).now(); }
    function maxSide() { return tiers[Math.min(ti, tiers.length - 1)]; }

    function measure() {
      var bb = graph.bbox();
      world = { minX: bb.minX, minY: bb.minY, maxX: bb.maxX, maxY: bb.maxY };
      wW = Math.max(1, bb.maxX - bb.minX);
      wH = Math.max(1, bb.maxY - bb.minY);
    }
    /** 世界单图能覆盖的最大 k */
    function worldK() { return maxSide() / Math.max(wW, wH); }

    function mkEl() {
      var cv = global.document.createElement('canvas');
      cv.setAttribute('data-mg', 'worldbitmap');
      cv.style.cssText = 'position:absolute;left:0;top:0;transform-origin:0 0;'
        + 'will-change:transform;pointer-events:none;display:none;';
      if (beforeEl && beforeEl.parentNode === host) host.insertBefore(cv, beforeEl);
      else host.appendChild(cv);
      return cv;
    }
    function attach() {
      if (els[0]) return true;
      els[0] = mkEl(); els[1] = mkEl(); measure();
      return true;
    }

    /** 该用哪个矩形：装得下就整个世界；装不下就「视口 ⊕ 余量」 */
    function rectFor(k, tx, ty, dpr, vw, vh) {
      if (!(k > 0)) return null;
      if (k <= worldK() * 1.0001) return { r: world, mode: 'world' };
      if (!regionOn) return null;      // Phase B 未开启：高倍率不烘（交实时画）
      var padW = marginPx / (k * dpr);                 // 余量：设备像素 → 世界单位
      var halfW = (vw / 2) / k + padW;
      var halfH = (vh / 2) / k + padW;
      var cx = (vw / 2 - tx) / k, cy = (vh / 2 - ty) / k;   // 视口中心的世界坐标
      return { mode: 'region', r: { minX: cx - halfW, minY: cy - halfH, maxX: cx + halfW, maxY: cy + halfH } };
    }
    function sameRect(a, b) {
      if (!a || !b) return false;
      var tol = 1e-6;
      return Math.abs(a.minX - b.minX) < tol && Math.abs(a.minY - b.minY) < tol
        && Math.abs(a.maxX - b.maxX) < tol && Math.abs(a.maxY - b.maxY) < tol;
    }
    /** 快照够不够用。
        ⚠️ 世界模式下**不能**用「视口 ⊆ 矩形」判：全图档时整个世界都在视口里，
        矩形本来就比视口小 ⇒ 那条判据恒为 false ⇒ 每帧排队重烘（实测把用户卡回来过）。
        世界模式只需 k 还在世界单图能覆盖的范围内。 */
    function adequate(k) {
      if (!snap.ready) return false;
      if (snap.mode === 'world') return k <= worldK() * 1.0001;
      return coversView();
    }
    /** 视口是否完全落在快照矩形里（三行矩形包含测试，不是 v1–v5 那种「覆盖判定」） */
    function coversView() {
      if (!snap.ready) return false;
      var k = last.k, r = snap.rect;
      var x0 = (0 - last.tx) / k, x1 = (last.vw - last.tx) / k;
      var y0 = (0 - last.ty) / k, y1 = (last.vh - last.ty) / k;
      return x0 >= r.minX && x1 <= r.maxX && y0 >= r.minY && y1 <= r.maxY;
    }
    function sizeFor(r, k, dpr) {
      var sc = k * Math.min(dpr, 2);
      return { scale: sc, w: Math.max(1, Math.ceil((r.maxX - r.minX) * sc)), h: Math.max(1, Math.ceil((r.maxY - r.minY) * sc)) };
    }

    /** 同步烘一块（区域模式下一块约 3~8ms；分横带跨帧是下一步） */
    function runBake() {
      pending = false;
      if (!els[0]) attach();
      var k = last.k, dpr = Math.max(1, last.dpr);
      if (!(k > 0)) { stats.skipped++; return; }
      var pick = rectFor(k, last.tx, last.ty, dpr, last.vw, last.vh);
      if (!pick) { stats.skipped++; return; }
      var r = pick.r;
      var s = sizeFor(r, k, dpr);
      if (Math.max(s.w, s.h) > maxSide()) { stats.skipped++; stats.reason = 'too-big ' + s.w + 'x' + s.h; return; }
      var idx = cur === 0 ? 1 : 0;
      var cv = els[idx];
      if (cv.width !== s.w || cv.height !== s.h) { cv.width = s.w; cv.height = s.h; }
      cv.style.width = (s.w / dpr) + 'px';
      cv.style.height = (s.h / dpr) + 'px';
      var gen = ++buildGen;
      var t0 = now();
      try {
        renderer.drawStatic(cv.getContext('2d'), s.scale, r);
      } catch (err) {
        stats.reason = '降档：' + ((err && err.message) || err);
        if (ti < tiers.length - 1) { ti++; cv.width = 1; cv.height = 1; return runBake(); }
        enabled = false; hide(); stats.skipped++; return;
      }
      var ms = now() - t0;
      if (gen !== buildGen) { stats.skipped++; return; }
      /* ⚠️ 顺序要紧：先用**新快照**写定位，再显示、再换代。烘完没有下一帧，
         等下一帧才定位会让新图带着上一世的 transform 显示（实测整层错位）。 */
      snap = { ready: true, rect: r, mode: pick.mode, scale: s.scale, k: k, dpr: dpr, rev: ++rev, key: lastKey };
      cur = idx;
      applyTransform();
      cv.style.display = '';
      if (cur === 0 && els[1]) els[1].style.display = 'none';
      else if (cur === 1 && els[0]) els[0].style.display = 'none';
      stats.bakes++; stats.lastMs = +ms.toFixed(1);
      if (ms > stats.peakMs) stats.peakMs = +ms.toFixed(1);
      stats.swaps++;
      if (pick.mode === 'region') stats.regionBakes++;
      stats.mode = pick.mode;
      stats.reason = 'ok ' + pick.mode + ' ' + s.w + 'x' + s.h + ' @k=' + k.toFixed(3) + ' tier=' + maxSide();
      if (opt.onSwap) opt.onSwap();     // 保险：烘完至少再来一帧
    }

    /** 用「最后已知的相机」给当前显示的那一代写 transform（吸附到设备像素网格） */
    function applyTransform() {
      if (cur < 0 || !snap.ready) return '';
      var k = last.k, dpr = Math.max(1, last.dpr);
      if (!(k > 0)) return '';
      var sx = Math.round((snap.rect.minX * k + last.tx) * dpr) / dpr;
      var sy = Math.round((snap.rect.minY * k + last.ty) * dpr) / dpr;
      var m = (k * dpr) / snap.scale;
      var tr = 'translate3d(' + sx.toFixed(3) + 'px,' + sy.toFixed(3) + 'px,0) scale(' + m.toFixed(5) + ')';
      lastTransform = tr;
      var el = els[cur];
      if (el) el.style.transform = tr;
      return tr;
    }

    /* 停手之后由定时器来判「该不该重烘」（帧可能已经不来了；拖动中越界则当场重烘） */
    function onSettle() { settleTimer = 0; if (settleWanted) scheduleBake(); }

    function scheduleBake() {
      if (pending || snapping) return;
      snapping = true; pending = true;
      global.setTimeout(function () { snapping = false; runBake(); }, 0);
    }

    /** 每帧调一次（在 renderer.draw() 之前）；返回 true = 本帧静态层由位图承担 */
    function tick(cam, dpr, paintKey) {
      if (!els[0]) attach();
      dpr = Math.max(1, dpr || 1);
      var k = cam.k;
      var moved = (k !== last.k || cam.tx !== last.tx || cam.ty !== last.ty
        || dpr !== last.dpr || cam.viewW !== last.vw || cam.viewH !== last.vh);
      if (moved) {
        last.k = k; last.tx = cam.tx; last.ty = cam.ty; last.dpr = dpr;
        last.vw = cam.viewW; last.vh = cam.viewH; lastMove = now();
        if (settleTimer) global.clearTimeout(settleTimer);
        settleTimer = global.setTimeout(onSettle, settleMs + 20);
      }
      if (!enabled) { hide(); return false; }
      var pick = rectFor(k, cam.tx, cam.ty, dpr, cam.viewW, cam.viewH);
      if (!pick) { hide(); return false; }          // 该档不烘（区域模式未开）⇒ 交实时画，别排队
      if (!snap.ready) { hide(); scheduleBake(); return false; }

      /* 位置 + 缩放（只吸附合成偏移） */
      var sx = Math.round((snap.rect.minX * k + cam.tx) * dpr) / dpr;
      var sy = Math.round((snap.rect.minY * k + cam.ty) * dpr) / dpr;
      var m = (k * dpr) / snap.scale;
      var tr = 'translate3d(' + sx.toFixed(3) + 'px,' + sy.toFixed(3) + 'px,0) scale(' + m.toFixed(5) + ')';
      if (tr !== lastTransform) {
        lastTransform = tr;
        applyTransform();
        if (els[cur]) els[cur].style.display = '';
        var other = els[1 - cur];
        if (other && other.style.display !== 'none') other.style.display = 'none';
      }

      /* 该不该重烘：
         · 视口跑出旧图 ⇒ **立刻**（拖动中也要，旧图继续用，就绪后原子替换）
         · k / dpr / 绘制输入变了 ⇒ 等停手（settle）再烘，免得手势里反复烘  */
      var outNow = !adequate(k);
      var stale = (snap.k !== k) || (snap.dpr !== dpr) || (paintKey != null && snap.key !== paintKey);
      settleWanted = stale && !outNow;
      if (outNow) {
        scheduleBake();
        /* 视口已经跑出旧图 ⇒ **本帧走实时画**（判决的「实时兜底帧」，列为验收路径实测）。
           只在「盖不住」时兜底：k/dpr/输入变了但还盖得住时，继续用旧图（不要白花一帧）。 */
        if (!coversView()) { stats.fallbackFrames++; return false; }
      }
      else if (settleWanted && !moved && (now() - lastMove) > settleMs) { lastKey = paintKey; scheduleBake(); }
      return true;
    }

    function hide() { if (cur >= 0 && els[cur]) els[cur].style.display = 'none'; }

    return {
      attach: attach, tick: tick, hide: hide,
      bakeNow: function () { scheduleBake(); },
      enable: function (v) { enabled = !!v; if (!enabled) hide(); },
      setRegion: function (v) { regionOn = !!v; snap.ready = false; scheduleBake(); },
      get region() { return regionOn; },
      get enabled() { return enabled; },
      state: function () {
        return {
          enabled: enabled, ready: snap.ready, mode: stats.mode,
          k: +snap.k.toFixed(4), scale: +snap.scale.toFixed(4), rev: snap.rev, region: regionOn,
          bakes: stats.bakes, regionBakes: stats.regionBakes,
          lastMs: stats.lastMs, peakMs: stats.peakMs, swaps: stats.swaps, skipped: stats.skipped,
          fallbackFrames: stats.fallbackFrames,
          reason: stats.reason,
          worldK: +worldK().toFixed(4), maxSide: maxSide(), tier: ti,
          covered: snap.ready ? coversView() : false,
          size: snap.ready ? Math.round((snap.rect.maxX - snap.rect.minX) * snap.scale) + 'x'
            + Math.round((snap.rect.maxY - snap.rect.minY) * snap.scale) : '-'
        };
      }
    };
  }

  MG.createWorldBitmap = createWorldBitmap;
})(typeof window !== 'undefined' ? window : globalThis);
