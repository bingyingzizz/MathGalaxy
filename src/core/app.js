/* ==========================================================================
   数学星图 · 应用装配
   --------------------------------------------------------------------------
   把「数据（MG.packs / MG.regions）」与「引擎」接起来：
   建图 → 布局 → 相机 → 渲染 → 交互 → 搜索 → 面板 → 工具条
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;
  var C = MG.config;
  var T = MG.theme;

  /* ------------------------------------------------------- KaTeX（可选） */
  /* 若页面里引入了 KaTeX，$…$ 与 $$…$$ 就会自动渲染；没有则原样显示。 */
  function hookKatex() {
    if (typeof global.katex === 'undefined') return;
    MG.renderInlineMath = function (tex) {
      try { return global.katex.renderToString(tex, { throwOnError: false }); }
      catch (e) { return '<code>' + U.escapeHtml(tex) + '</code>'; }
    };
    MG.renderBlockMath = function (tex) {
      try {
        return '<div class="katex-block">' +
          global.katex.renderToString(tex, { displayMode: true, throwOnError: false }) + '</div>';
      } catch (e) { return null; }
    };
  }

  function boot() {
    hookKatex();

    var graphEl = document.getElementById('layer-graph');
    var cloudEl = document.getElementById('layer-cloud');
    var cloudCtx = cloudEl.getContext('2d');
    var searchBox = document.getElementById('search-box');
    var searchInput = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');
    var toolbar = document.getElementById('toolbar');
    var legendEl = document.getElementById('legend');
    var panelEl = document.getElementById('panel');
    var panelBody = document.getElementById('panel-body');
    var panelClose = document.getElementById('panel-close');
    var hintEl = document.getElementById('hint');

    /* ------------------------------------------------------------ 建图 */
    var localPacks = (MG.packs || []).slice();
    var graph = MG.buildGraph(localPacks, MG.regions);
    MG.computeLayout(graph);
    if (graph.warnings.length) {
      console.warn('[数学星图] 数据校验提示：\n' + graph.warnings.join('\n'));
    }

    /* ------------------------------------------------------------ 状态 */
    var view = {
      graph: graph,
      cam: null,
      visible: MG.graphUtil.visibleEdges(graph),
      focus: null,
      hover: null
    };
    var cam = MG.createCamera();
    view.cam = cam;

    var renderer = MG.createRenderer(graphEl, view);
    var cloudTex = null;
    var dpr = 1;
    var rafId = 0;
    var dirty = true;

    /* -------------------------------------------------------- 绘制循环 */
    function requestDraw() {
      dirty = true;
      if (!rafId) rafId = requestAnimationFrame(frame);
    }

    function frame() {
      rafId = 0;
      var animating = cam.tick();
      if (dirty || animating) {
        MG.background.draw(cloudCtx, cam, cloudTex, dpr);
        renderer.draw();
        dirty = false;
      }
      if (animating) requestDraw();
    }

    /* ------------------------------------------------------------ 尺寸 */
    function resize() {
      var s = renderer.resize();
      dpr = s.dpr;
      cloudEl.width = Math.round(s.w * dpr);
      cloudEl.height = Math.round(s.h * dpr);
      requestDraw();
    }
    global.addEventListener('resize', resize);

    /* -------------------------------------------------- 聚焦 / 面板 */
    var panelOpen = false;

    /** 面板遮住的屏幕区域：宽屏是右侧抽屉，窄屏是底部抽屉 */
    function panelInset() {
      if (!panelOpen) return { x: 0, y: 0 };
      if (global.innerWidth > 820) return { x: 414, y: 0 };
      return { x: 0, y: Math.min(cam.viewH * 0.62, Math.max(80, cam.viewH - 120)) };
    }

    /** 把一个世界坐标点换算成「可见区正中」所需的相机中心 */
    function centerTargetFor(pt, k) {
      k = k || cam.k;
      var inset = panelInset();
      return { cx: pt.x + (inset.x / 2) / k, cy: pt.y + (inset.y / 2) / k };
    }

    function focusNode(id, opts) {
      opts = opts || {};
      if (view.focus && view.focus.type === 'node' && view.focus.id === id && !opts.force) {
        clearFocus();       // 再点一次同一个节点 = 取消聚焦
        panel.hide();
        return;
      }
      view.focus = { type: 'node', id: id };
      panel.show({ type: 'node', id: id });
      panelOpen = true;
      if (opts.center !== false) centerOn(id);
      requestDraw();
      hideHint();
    }

    function focusEdge(id, opts) {
      opts = opts || {};
      view.focus = { type: 'edge', id: id };
      panel.show({ type: 'edge', id: id });
      panelOpen = true;
      var e = findEdge(id);
      if (e && opts.center !== false) {
        var pts = MG.graphUtil.edgeNodes(e);
        var mid = { x: 0, y: 0 }, cnt = 0;
        pts.forEach(function (nid) {
          var nd = graph.byId[nid];
          if (nd) { mid.x += nd.x; mid.y += nd.y; cnt++; }
        });
        if (cnt) { mid.x /= cnt; mid.y /= cnt; ensureCenter(mid); }
      }
      requestDraw();
      hideHint();
    }

    function findEdge(id) {
      for (var i = 0; i < graph.edges.length; i++) if (graph.edges[i].id === id) return graph.edges[i];
      return null;
    }

    function clearFocus() {
      view.focus = null;
      requestDraw();
    }

    /** 若某个点不在安全视野内，平滑移到中心（避开右侧面板） */
    function centerOn(id) {
      var n = graph.byId[id];
      if (n) ensureCenter(n);
    }

    function ensureCenter(pt) {
      var inset = panelInset();
      var p = cam.toScreen(pt.x, pt.y);
      var outside = p.x < 90 || p.x > cam.viewW - 90 - inset.x ||
        p.y < 110 || p.y > cam.viewH - 90 - inset.y;
      if (!outside) return;
      cam.animateTo(centerTargetFor(pt));
    }

    function bboxOf(list) {
      var bb = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
      list.forEach(function (n) {
        bb.minX = Math.min(bb.minX, n.x); bb.maxX = Math.max(bb.maxX, n.x);
        bb.minY = Math.min(bb.minY, n.y); bb.maxY = Math.max(bb.maxY, n.y);
      });
      return bb;
    }

    /** 让一个世界矩形铺满可视区（右侧留给面板），返回相机目标 */
    function targetFor(bb, padding, maxZoom) {
      var inset = panelInset();
      // 小屏幕上把留白收窄，否则整张图会缩得看不动
      var pad = Math.min(padding, Math.min(cam.viewW, cam.viewH) * 0.18);
      var w = Math.max(40, bb.maxX - bb.minX);
      var h = Math.max(40, bb.maxY - bb.minY);
      var availW = Math.max(80, cam.viewW - pad * 2 - inset.x);
      var availH = Math.max(80, cam.viewH - pad * 2 - inset.y);
      var k = U.clamp(Math.min(availW / w, availH / h),
        Math.max(C.camera.minZoom, C.camera.fitMinZoom),
        Math.min(C.camera.maxZoom, maxZoom == null ? C.camera.maxFitZoom : maxZoom));
      var base = centerTargetFor({ x: (bb.minX + bb.maxX) / 2, y: (bb.minY + bb.maxY) / 2 }, k);
      return { k: k, cx: base.cx, cy: base.cy };
    }

    /** 适配到某个板块 */
    function fitRegion(rid) {
      var list = graph.nodes.filter(function (n) { return n.regions.indexOf(rid) >= 0; });
      if (!list.length) return;
      cam.animateTo(targetFor(bboxOf(list), 170, 1.35));
      requestDraw();
    }

    function fitAll() {
      cam.animateTo(targetFor(graph.bbox(), C.camera.fitPadding));
      requestDraw();
    }

    /* ---------------------------------------------------------- 面板 */
    var panel = MG.createPanel(panelEl, panelBody, panelClose, view, {
      onGoto: function (hit) {
        if (hit.type === 'node') focusNode(hit.id, { force: true });
        else focusEdge(hit.id, { force: true });
      },
      onRegion: function (rid) { fitRegion(rid); },
      onClose: function () { panelOpen = false; requestDraw(); }
    });

    /* ---------------------------------------------------------- 交互 */
    MG.createInteraction(graphEl, view, {
      draw: function () { requestDraw(); },
      hitTest: function (x, y) { return renderer.hitTest(x, y); },
      onPick: function (hit) {
        if (!hit) {            // 点空白：回到全图并收起面板
          clearFocus();
          panel.hide();
          return;
        }
        if (hit.type === 'node') focusNode(hit.id);
        else focusEdge(hit.id);
      },
      onHover: function () { hideHintSoon(); }
    });

    /* ---------------------------------------------------------- 搜索 */
    var search = MG.createSearch(searchBox, searchInput, searchResults, view, {
      onNode: function (id) { focusNode(id, { force: true }); },
      onRegion: function (rid) { fitRegion(rid); }
    });
    search.reindex();

    /* -------------------------------------------------------- 工具条 */
    toolbar.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button') : null;
      if (!btn) return;
      var act = btn.getAttribute('data-act');
      if (act === 'zoom-in') { cam.zoomBy(C.camera.zoomStep); requestDraw(); }
      else if (act === 'zoom-out') { cam.zoomBy(1 / C.camera.zoomStep); requestDraw(); }
      else if (act === 'fit') { fitAll(); requestDraw(); }
      else if (act === 'toggle-defs') {
        C.showDefinitionLines = !C.showDefinitionLines;
        btn.classList.toggle('on', C.showDefinitionLines);
        refreshVisible();
      } else if (act === 'toggle-labels') {
        C.showLabels = !C.showLabels;
        btn.classList.toggle('on', C.showLabels);
        requestDraw();
      } else if (act === 'toggle-wheel') {
        C.wheelZooms = !C.wheelZooms;
        btn.classList.toggle('on', C.wheelZooms);
        btn.textContent = C.wheelZooms ? '滚轮·缩放' : '滚轮·平移';
      }
    });

    function refreshVisible() {
      view.visible = MG.graphUtil.visibleEdges(graph);
      renderer.invalidate();
      requestDraw();
    }

    /* ---------------------------------------------------------- 图例 */
    function renderLegend() {
      var regions = graph.regions || [];
      var types = T.typeOrder || Object.keys(T.nodeTypes || {});
      var live = regions.filter(function (r) { return r.stat; });
      var typeRows = types.filter(function (t) { return T.nodeTypes[t]; }).map(function (t) {
        var st = T.nodeTypes[t];
        return '<span class="lg-item"><span class="lg-dot" style="background:' + st.color + '"></span>' + st.name + '</span>';
      }).join('');

      var edgeRows =
        '<span class="lg-item"><span class="lg-line" style="border-top-color:#1C1C1E;border-top-width:2px"></span>等价</span>' +
        '<span class="lg-item"><span class="lg-line" style="border-top-color:#1C1C1E;border-top-width:2px;position:relative"></span>推出 →</span>' +
        '<span class="lg-item"><span class="lg-line" style="border-top-color:rgba(60,112,245,.5);border-top-width:2px"></span>定义引用</span>';

      var regionRows = live.map(function (r) {
        return '<span class="lg-item" data-region="' + r.id + '" style="cursor:pointer">' +
          '<span class="lg-swatch" style="background:' + U.mixWithWhite(r.color, 0.45) + '"></span>' +
          r.name + '<span style="color:#A5ABB3">·' + r.stat.count + '</span></span>';
      }).join('');

      legendEl.innerHTML =
        '<div class="lg-head" data-toggle><b>图例</b><span class="lg-caret">▼</span></div>' +
        '<div class="lg-body">' +
        '<div class="lg-group"><div class="lg-title">节点（' + graph.nodes.length + '）</div><div class="lg-row">' + typeRows + '</div></div>' +
        '<div class="lg-group"><div class="lg-title">连线（' + graph.edges.length + '）</div><div class="lg-row">' + edgeRows + '</div></div>' +
        '<div class="lg-group"><div class="lg-title">数学板块</div><div class="lg-row">' + regionRows + '</div></div>' +
        '</div>';
    }

    legendEl.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-toggle]')) {
        legendEl.classList.toggle('collapsed');
        return;
      }
      var chip = e.target.closest ? e.target.closest('[data-region]') : null;
      if (chip) fitRegion(chip.getAttribute('data-region'));
    });

    /* ---------------------------------------------------------- 键盘 */
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if (e.key === 'Escape') {
        if (typing) return;
        search.close();
        panel.hide();
        clearFocus();
        return;
      }
      if (typing) return;
      if (e.key === '/' ) { e.preventDefault(); search.focus(); return; }
      if (e.key === '+' || e.key === '=') { e.preventDefault(); cam.zoomBy(C.camera.zoomStep); requestDraw(); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); cam.zoomBy(1 / C.camera.zoomStep); requestDraw(); }
      else if (e.key === '0') { e.preventDefault(); fitAll(); requestDraw(); }
      else if (e.key.indexOf('Arrow') === 0) {
        e.preventDefault();
        var step = 90;
        if (e.key === 'ArrowLeft') cam.panBy(step, 0);
        if (e.key === 'ArrowRight') cam.panBy(-step, 0);
        if (e.key === 'ArrowUp') cam.panBy(0, step);
        if (e.key === 'ArrowDown') cam.panBy(0, -step);
        cam.stopAnimation();
        requestDraw();
      }
    });

    /* ------------------------------------------------------------ 提示 */
    var hintTimer = null, hintGone = false;
    function hideHint() { if (!hintGone) { hintGone = true; hintEl.classList.add('fade'); } }
    function hideHintSoon() {
      if (hintTimer || hintGone) return;
      hintTimer = setTimeout(hideHint, 9000);
    }
    hideHintSoon();

    /* ------------------------------------------------------------ 启动 */
    /** 深链：#n=<节点id>  #e=<连线id>  #r=<板块id> */
    function applyHash() {
      var h = String(global.location.hash || '').replace(/^#/, '');
      var m = h.match(/^([ner])=(.+)$/);
      if (!m) return false;
      var id = decodeURIComponent(m[2]).trim();
      if (m[1] === 'n' && graph.byId[id]) { focusNode(id, { force: true }); return true; }
      if (m[1] === 'e' && findEdge(id)) { focusEdge(id, { force: true }); return true; }
      if (m[1] === 'r' && graph.regionById[id]) { fitRegion(id); return true; }
      return false;
    }

    function start() {
      resize();
      cloudTex = MG.background.buildTexture(graph);
      renderLegend();
      var bb = graph.bbox();
      cam.fit(bb, C.camera.fitPadding);
      var fitK = cam.k;
      var cx = (bb.minX + bb.maxX) / 2, cy = (bb.minY + bb.maxY) / 2;
      if (!applyHash()) {
        // 初始视角：先稍微留白，再平滑推进到「全部适配」
        cam.k = fitK * 0.72;
        cam.centerOn(cx, cy);
        cam.animateTo({ k: fitK, cx: cx, cy: cy }, 700);
      }
      requestDraw();
    }

    start();

    /* ------------------------------------------------ 外部内容包（可选） */
    if (MG.loader) {
      MG.loader.loadExternal().then(function (res) {
        if (!res || !res.packs.length) return;
        res.packs.forEach(function (p) {
          var v = MG.loader.validatePack(p);
          if (!v.ok) { console.warn('[数学星图] 外部内容包有问题：', p.name, v.errs); }
        });
        var packs = localPacks.concat(res.packs);
        graph = MG.buildGraph(packs, MG.regions);
        MG.computeLayout(graph);
        view.graph = graph;
        view.visible = MG.graphUtil.visibleEdges(graph);
        renderer.invalidate();
        cloudTex = MG.background.buildTexture(graph);
        search.reindex();
        renderLegend();
        start();
        console.info('[数学星图] 已并入 ' + res.loaded + ' 个外部内容包。');
      });
    }

    /* 方便在控制台里调试：MG.app.graph / MG.app.cam */
    MG.app = {
      view: view, cam: cam, renderer: renderer, search: search,
      focusNode: focusNode, focusEdge: focusEdge, fitAll: fitAll, fitRegion: fitRegion,
      clearFocus: clearFocus,
      requestDraw: requestDraw,     // 外部改了 cam / 数据之后记得调一次
      rebuild: function () { start(); },
      get graph() { return view.graph; },
      get packs() { return (MG.packs || []); }
    };
  }

  /* ------------------------------------------------------ 出错时的兜底 */
  /* 万一某个数据包写错了，至少让人看见「哪儿错了」，而不是一片白屏。 */
  function fatal(err) {
    console.error('[数学星图] 启动失败：', err);
    if (typeof global.__mgFatal === 'function') { global.__mgFatal(err); return; }
    if (document.getElementById('mg-fatal')) return;
    var box = document.createElement('div');
    box.id = 'mg-fatal';
    box.style.cssText =
      'position:fixed;inset:auto 16px 16px 16px;max-height:50vh;overflow:auto;z-index:99;' +
      'background:#fff;border:1px solid rgba(200,60,60,.35);border-left:3px solid #D0483C;' +
      'border-radius:10px;padding:14px 16px;box-shadow:0 12px 40px rgba(0,0,0,.16);' +
      'font:12.5px/1.6 ui-monospace,Menlo,Consolas,monospace;color:#3a2020;white-space:pre-wrap';
    box.textContent = '数学星图启动出错（多半是某个内容包写错了）：\n\n' +
      ((err && (err.stack || err.message)) || String(err));
    document.body.appendChild(box);
  }

  function safeBoot() {
    try { boot(); } catch (err) { fatal(err); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeBoot);
  } else {
    safeBoot();
  }
})(typeof window !== 'undefined' ? window : globalThis);
