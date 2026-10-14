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
  var GU = MG.graphUtil;

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
    var graph = MG.buildGraph(localPacks, MG.regions, MG.clusters);
    MG.computeLayout(graph);
    MG.computeLayers(graph);          // 依赖深度（层号）—— 每次现算，不写进内容
    if (graph.warnings.length) {
      console.warn('[数学星图] 数据校验提示：\n' + graph.warnings.join('\n'));
    }

    /* ------------------------------------------------------------ 状态 */
    /* 可见性：左下角「显示节点」面板里挑的那一块（存在 localStorage 里）。
       被藏起来的点不画、不出名字、不响应点击；一端被藏的连线也一起不画。 */
    var vis = MG.createVisibility(graph);

    /* 已读状态：用户自己的进度，存在 localStorage。和 vis 一样是**运行时状态** ——
       不进 graph.json、不影响布局与分层。图上那个绿环由 renderer 的叠加层画
       （⛔ 不进烘焙：标记一个点就重烘全图是不能接受的）。 */
    var reads = MG.createReadState(graph);

    var view = {
      graph: graph,
      cam: null,
      visible: [],
      focus: null,
      hover: null,
      isNodeVisible: vis.isNodeVisible,
      isNodeRead: reads.isRead,
      showReadMarks: reads.isShowMarks
    };

    /** 真正参与绘制的连线：先按定义线开关过滤，再去掉「有一端被藏起来」的 */
    function visibleEdgeList() {
      return MG.graphUtil.visibleEdges(graph).filter(function (e) { return vis.edgeOk(e); });
    }

    function visibleNodes() {
      return graph.nodes.filter(function (n) { return vis.isNodeVisible(n.id); });
    }

    view.visible = visibleEdgeList();

    var cam = MG.createCamera();
    view.cam = cam;

    /* 已读状态一变：重画星图（绿环在叠加层）+ 刷新图例里那行进度。
       ⚠️ 这里只**注册回调**，不立刻执行 —— 那会儿 renderLegend / requestDraw 还没就绪，
          真正触发是用户点「标记已读」的时候。 */
    reads.onChange(function () {
      renderLegend();
      requestDraw();
    });

    var renderer = MG.createRenderer(graphEl, view);
    /* 导出（当前视图 → 子图 JSON / SVG / TikZ）。引擎模块，不碰任何内容。 */
    var exporter = MG.createExport ? MG.createExport(view, cam, renderer.nodeRadius) : null;
    var cloudTex = null;
    var cloudDirty = true;
    /* 云雾层上一次是按什么参数画的 —— 相机 / 视口 / dpr / 纹理四样都没变就不必再画。
       ⚠️ 悬停、选中、开合图例这些「不动相机」的重绘以前也要把整屏云雾重采样一遍，
       实测那是整帧的大头（dpr=1 时 ~15ms，dpr=2 时 ~37ms），而它根本没变。 */
    var cloudDrawn = { k: -1, tx: 0, ty: 0, w: -1, h: -1, dpr: -1, tex: null };
    var dpr = 1;
    /* Phase A：世界位图（挂载见文件末尾）。paintKey 把「绘制输入」压成一个串，
       它一变（显隐 / 开关 / 聚焦 / 数据）就允许重烘一次 —— 平移与纯 k 变不重烘。 */
    var bitmap = null, perfRec = null, lastUseBmp = false;
    function paintKey() {
      return graph.nodes.length + '|' + vis.hiddenCount() + '|'
        + (C.showDefinitionLines ? 1 : 0) + (C.showLabels ? 1 : 0) + (C.exploreMode ? 1 : 0) + '|'
        + (C.hideParallelImplications ? 1 : 0) + (view.focus ? view.focus.type + ':' + view.focus.id : '-');
    }
    var rafId = 0;
    var dirty = true;
    /* 诊断用：一帧里「我这边花的 JS」的累加（不含被推迟的光栅化 → 剩下的账归「其余」） */
    var drawProf = { ms: 0, n: 0 };

    /* 用户要求「少动效」：镜头动画压到 1ms（⚠️ 不能是 0 —— dur=0 会让进度算成 NaN） */
    var REDUCE_MOTION = !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (REDUCE_MOTION) C.camera.animateMs = 1;

    /* 拖层号滑杆期间不重画整个图例：重画会把这个 <input> 换掉，拖拽当场断掉 */
    var suppressLegend = false;

    /* -------------------------------------------------------- 绘制循环 */
    function requestDraw() {
      dirty = true;
      if (!rafId) rafId = requestAnimationFrame(frame);
    }

    function frame() {
      rafId = 0;
      // 云雾是按「还看得见的点」铺的：藏了点就重画一次纹理（每帧最多一次）
      if (cloudDirty) {
        cloudDirty = false;
        cloudTex = MG.background.buildTexture(graph, vis.isNodeVisible);
        cloudDrawn.tex = null;              // 纹理换了：这一次必须重铺
      }
      var tp = performance.now();
      var animating = cam.tick();
      if (dirty || animating) {
        var c = cam;
        if (cloudDrawn.tex !== cloudTex || cloudDrawn.k !== c.k ||
          cloudDrawn.tx !== c.tx || cloudDrawn.ty !== c.ty || cloudDrawn.w !== c.viewW ||
          cloudDrawn.h !== c.viewH || cloudDrawn.dpr !== dpr) {
          MG.background.draw(cloudCtx, cam, cloudTex, dpr);
          cloudDrawn = { k: c.k, tx: c.tx, ty: c.ty, w: c.viewW, h: c.viewH, dpr: dpr, tex: cloudTex };
        }
        /* Phase A：位图图层承担静态部分 ⇒ 实时层只画标签/hover/光晕。
           位置与缩放由 bitmap 自己按相机写 transform（吸附到设备像素网格）。 */
        var useBmp = bitmap ? bitmap.tick(c, dpr, paintKey()) : false;
        lastUseBmp = useBmp;
        renderer.setStaticHidden(useBmp);
        renderer.setGlowLive(useBmp);
        renderer.draw();
        dirty = false;
      }
      drawProf.ms += performance.now() - tp; drawProf.n++;
      if (animating) requestDraw();
      noteCamera();

    }

    /* ------------------------------------------------------------ 尺寸 */
    function resize() {
      var s = renderer.resize();
      dpr = s.dpr;
      cloudEl.width = Math.max(1, Math.round(s.w * dpr));
      cloudEl.height = Math.max(1, Math.round(s.h * dpr));
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
      // 被藏起来的点：先让它可见 —— 否则点了搜索结果/深链，星图上什么也没有
      if (!vis.isNodeVisible(id)) vis.setNode(id, true);
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
      syncHash('push');
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
      syncHash('push');
    }

    function findEdge(id) {
      for (var i = 0; i < graph.edges.length; i++) if (graph.edges[i].id === id) return graph.edges[i];
      return null;
    }

    function clearFocus() {
      view.focus = null;
      requestDraw();
      syncHash('push');
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

    /** 适配到某个星系（只算还看得见的点） */
    function fitRegion(rid) {
      var list = graph.nodes.filter(function (n) {
        return n.regions.indexOf(rid) >= 0 && vis.isNodeVisible(n.id);
      });
      if (!list.length) return;
      cam.animateTo(targetFor(bboxOf(list), 170, 1.35));
      requestDraw();
    }

    /** 适配到某个星团（只算还看得见的点） */
    function fitCluster(cid) {
      var c = graph.clusterById[cid];
      if (!c || !c.nodes || !c.nodes.length) return;
      var list = c.nodes.filter(function (n) { return vis.isNodeVisible(n.id); });
      if (!list.length) return;
      cam.animateTo(targetFor(bboxOf(list), 190, 1.7));
      requestDraw();
    }

    function fitAll() {
      var list = visibleNodes();
      if (!list.length) return;                 // 全藏起来了，没什么可适配的
      cam.animateTo(targetFor(bboxOf(list), C.camera.fitPadding));
      requestDraw();
    }

    /* ---------------------------------------------------------- 面板 */
    var panel = MG.createPanel(panelEl, panelBody, panelClose, view, {
      onGoto: function (hit) {
        if (hit.type === 'node') focusNode(hit.id, { force: true });
        else focusEdge(hit.id, { force: true });
      },
      onRegion: function (rid) { fitRegion(rid); },
      onCluster: function (cid) { fitCluster(cid); },
      onSubgraph: function (id, dir) { setSubgraph(id, dir); },
      onClose: function () { panelOpen = false; requestDraw(); },
      /* 已读三件套。panel 只管画按钮，状态在这里 —— 它不认识 localStorage。 */
      isRead: reads.isRead,
      missingPrereqs: reads.missingPrereqs,
      onToggleRead: function (id) {
        reads.toggle(id);
        /* 重画面板让按钮与「还差几条前置」跟着变。
           ⚠️ show() 会把 scrollTop 归零 ⇒ 先把位置存下来再恢复，
              否则在长面板中间点一下「已读」会跳回顶部。 */
        var keep = panelEl.scrollTop;
        panel.show({ type: 'node', id: id });
        panelEl.scrollTop = keep;
      }
    });

    /* ------------------------------------- 可见性变化后的统一善后 */
    /** 挑了显示哪一块之后：连线、星团级粗线、云雾、聚焦状态、图例全部跟着走 */
    function refreshVisible() {
      view.visible = visibleEdgeList();
      graph.clusterLinks = graph.buildClusterLinks(function (e) { return vis.edgeOk(e); });

      // 正在看的东西被藏起来了 → 收手（别对着看不见的点显示详情）
      if (view.focus) {
        var fo = view.focus;
        var gone = (fo.type === 'node' && !vis.isNodeVisible(fo.id));
        if (fo.type === 'edge') {
          var fe = findEdge(fo.id);
          gone = !!(fe && !vis.edgeOk(fe));
        }
        if (gone) { clearFocus(); panel.hide(); }
      }
      if (view.hover) {
        var ho = view.hover;
        var hGone = (ho.type === 'node' && !vis.isNodeVisible(ho.id));
        if (ho.type === 'edge') {
          var he = findEdge(ho.id);
          hGone = !!(he && !vis.edgeOk(he));
        }
        if (hGone) view.hover = null;
      }

      renderer.invalidate();
      cloudDirty = true;
      requestDraw();
    }

    vis.onChange(function () {
      refreshVisible();
      if (!suppressLegend) renderLegend();
      syncHash('push');
    });

    /* ------------------------------------------------ 主干模式 / 分层 */
    /*
      两个都是「额外可见条件」，叠加在用户手动的隐藏集合之上：
        · 主干模式：只留 MG.trunk 里那条学习主线
        · 分层：只显示「离地基不超过 k 步」的点（拖到第 k 层）
      两者都不动用户手动藏的点，关掉之后手动的选择还在。
    */
    var trunkOnly = false;
    var layerMax = null;              // null = 不限层

    /* 「只看子图」：从某个节点沿依赖走几跳，只留下那一圈骨架。
       入口在节点面板的三个按钮上，开关状态在图例里（不另开窗口）。 */
    var subSeed = null;               // null = 不启用
    var subDir = 'deps';              // deps | users | both
    var subHops = 2;
    var subSkipBase = true;           // 跳过第 0–2 层的「地基」
    var subIds = null;                // id → 1
    var subCount = 0;
    var SUB_DIR_NAME = { deps: '它靠什么', users: '谁用它', both: '它周围' };

    function applyFilter() {
      if (!trunkOnly && layerMax == null && !subIds) { vis.setFilter(null); return; }
      vis.setFilter(function (id) {
        var n = graph.byId[id];
        if (!n) return false;
        if (subIds && !subIds[id]) return false;
        if (trunkOnly && !n.trunk) return false;
        if (layerMax != null && !(n.layer <= layerMax)) return false;
        return true;
      });
    }

    function setSubgraph(id, dir, hops) {
      if (id == null) { clearSubgraph(); return; }
      if (dir) subDir = dir;
      if (hops != null) subHops = hops;
      var r = graph.subgraph(id, { dir: subDir, hops: subHops, skipBase: subSkipBase });
      subSeed = id; subIds = r.ids; subCount = r.count;
      applyFilter();
      renderLegend();
      fitAll();                       // 子图通常只有几十个点，直接铺满屏幕
      syncHash('push');
    }

    function clearSubgraph() {
      if (!subSeed) return;
      subSeed = null; subIds = null; subCount = 0;
      applyFilter();
      renderLegend();
      fitAll();                       // 「退出」说好的是「回全图」，相机也得回去
      syncHash('push');
    }

    function setTrunkOnly(on) {
      trunkOnly = !!on;
      applyFilter();
      var btn = toolbar.querySelector('[data-act="toggle-trunk"]');
      if (btn) btn.classList.toggle('on', trunkOnly);
      if (trunkOnly) fitAll();          // 主干只有几十个点，直接铺满屏幕
      syncHash('push');
    }

    /** k = 只显示第 0…k 层；k >= 最大层 或 null = 不限。
        opts.fit=false 用于「拖滑杆的过程中」：那时不重新适配镜头，否则画面会跟着抖。 */
    function setLayerMax(k, opts) {
      opts = opts || {};
      var max = graph.maxLayer || 0;
      layerMax = (k == null || k >= max) ? null : Math.max(0, k);
      applyFilter();
      if (layerMax != null && opts.fit !== false) fitAll();
      syncHash('push');
    }

    /* ---------------------------------------------------------- 交互 */
    var interaction = MG.createInteraction(graphEl, view, {
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
      onHover: function () { /* #hint 不再随 hover 淡出（它现在承担页面标题与说明） */ }
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
      else if (act === 'toggle-trunk') { setTrunkOnly(!trunkOnly); }
      else if (act === 'toggle-defs') {
        C.showDefinitionLines = !C.showDefinitionLines;
        btn.classList.toggle('on', C.showDefinitionLines);
        refreshVisible();
      } else if (act === 'toggle-explore') {
        C.exploreMode = !C.exploreMode;
        btn.classList.toggle('on', C.exploreMode);
        renderLegend();
        requestDraw();
      } else if (act === 'toggle-labels') {
        C.showLabels = !C.showLabels;
        btn.classList.toggle('on', C.showLabels);
        requestDraw();
      } else if (act === 'toggle-wheel') {
        C.wheelZooms = !C.wheelZooms;
        btn.classList.toggle('on', C.wheelZooms);
        btn.textContent = C.wheelZooms ? '滚轮·缩放' : '滚轮·平移';
      }
      if (act && act.indexOf('toggle-') === 0) syncHash('push');
    });

    /* ------------------------------------------ 设置面板（界面元素显隐） */
    /*
      管的是「界面**显示什么**」，和工具条上那 5 个 toggle（管「图怎么画」）分开。
      状态存 localStorage，关掉图例下次打开还是关的。
      ⛔ 工具栏自己**不给**隐藏开关 —— 藏了就没有入口回来了。
      ⚠️ 这里加的是 <html> 上的类（ui-no-xxx），默认一个都没有 ⇒ 爬虫渲染时
         全部可见，不构成「隐藏文本」。
    */
    var settingsEl = document.getElementById('settings');
    var settingsBtn = document.getElementById('tb-settings');
    var UI_KEY = 'mg.ui.hidden';
    var UI_ITEMS = ['search', 'legend', 'hint'];

    function uiHidden() {
      try { return JSON.parse(localStorage.getItem(UI_KEY) || '{}') || {}; }
      catch (_) { return {}; }          // 隐私模式 / file:// 下可能禁用，当作没设过
    }
    function applyUI() {
      var hid = uiHidden();
      UI_ITEMS.forEach(function (k) {
        document.documentElement.classList.toggle('ui-no-' + k, !!hid[k]);
      });
      var boxes = settingsEl.querySelectorAll('input[data-ui]');
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].checked = !hid[boxes[i].getAttribute('data-ui')];
      }
    }
    function toggleUI(k, visible) {
      var hid = uiHidden();
      if (visible) delete hid[k]; else hid[k] = 1;
      try { localStorage.setItem(UI_KEY, JSON.stringify(hid)); } catch (_) { /* 忽略 */ }
      applyUI();
      renderLegend();       // 图例里那行「按 / 搜索」提示会跟着变
      requestDraw();
    }
    function setSettingsOpen(on) {
      settingsEl.classList.toggle('hidden', !on);
      settingsBtn.classList.toggle('on', !!on);
      settingsBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    }
    applyUI();              // 开页就按上次的选择摆好

    settingsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setSettingsOpen(settingsEl.classList.contains('hidden'));
    });
    settingsEl.addEventListener('click', function (e) { e.stopPropagation(); });
    settingsEl.addEventListener('change', function (e) {
      var t = e.target;
      var k = t && t.getAttribute && t.getAttribute('data-ui');
      if (k) toggleUI(k, t.checked);
    });
    // 点页面别处关掉；Esc 也关（同时会关掉详情面板，符合「Esc = 关浮层」的直觉）
    document.addEventListener('click', function () { setSettingsOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setSettingsOpen(false);
    });

    /* ---------------------------------------------------- 图例（也是开关） */
    /*
      图例同时是「显示 / 隐藏」的控制面板：
        · 节点类别（公理 / 定义 / …）  点一下 = 整类显示或隐藏
        · 数学板块 / 星团              点色块 = 整块显示或隐藏，点名字 = 跳过去看
      三态靠色块的样子表示：实心 = 全显示，半透明 + 橙数字 = 藏了一部分，空心 = 全藏了。
    */

    /** 一组节点里有多少还看得见 */
    function statOf(list) {
      var v = 0;
      for (var i = 0; i < list.length; i++) if (vis.isNodeVisible(list[i].id)) v++;
      return { v: v, n: list.length };
    }

    /** 点一下：全显示 → 全隐藏；只要缺了 → 补齐
        ⚠️ 判据必须是「用户手动藏没藏」，不能看 isNodeVisible —— 那个上面还叠着
           主干 / 分层 / 子图这三层过滤。一个星系若整个落在过滤线以外（例如开了
           「只看 0–4 层」时的 algebra），按可见数算就成了「已经藏了 → 反向补齐」，
           点色块会毫无反应。 */
    function toggleList(list) {
      if (!list.length) return;
      var hid = Object.create(null);
      vis.hiddenIds().forEach(function (id) { hid[id] = true; });
      var some = false;
      for (var i = 0; i < list.length; i++) if (hid[list[i].id]) { some = true; break; }
      vis.setMany(list.map(function (n) { return n.id; }), some);
    }

    function typeNodes(t) {
      return graph.nodes.filter(function (n) { return n.type === t; });
    }
    function regionNodes(id) {
      return graph.nodes.filter(function (n) { return n.regions.indexOf(id) >= 0; });
    }

    /**
     * 一个可点的开关芯片。
     * attr    —— 打在这个芯片上的 data-*（data-vt / data-vc / data-vr）
     * nav     —— 有的话，名字可点 = 跳过去看
     */
    function togChip(o) {
      var s = statOf(o.list);
      var state = s.v === 0 ? ' off' : (s.v < s.n ? ' part' : '');
      var mark = 'background:' + o.color + ';';
      if (s.v === 0) mark = 'background:transparent;box-shadow:inset 0 0 0 1.5px ' + o.color + ';';
      var num = s.v === s.n ? '·' + s.n : '·' + s.v + '/' + s.n;
      var name = U.escapeHtml(o.label);
      if (o.nav) name = '<span class="lg-name" data-nav="' + o.nav + '" title="' +
        U.escapeHtml(o.navTip || '跳过去看') + '">' + name + '</span>';
      else name = '<span class="lg-name">' + name + '</span>';
      return '<span class="lg-item lg-tog' + state + '" ' + o.attr + ' title="' +
        U.escapeHtml(o.tip) + '">' +
        '<span class="' + (o.round ? 'lg-dot' : 'lg-swatch') + '" style="' + mark + '"></span>' +
        name + '<span class="lg-num">' + num + '</span></span>';
    }

    function renderLegend() {
      var regions = graph.regions || [];
      var types = T.typeOrder || Object.keys(T.nodeTypes || {});
      var live = regions.filter(function (r) { return r.stat; });
      var total = graph.nodes.length;
      var shown = vis.visibleCount();

      /* ---------- 节点类别（点一下 = 整类开关） ---------- */
      var typeRows = types.filter(function (t) { return T.nodeTypes[t]; }).map(function (t) {
        var st = T.nodeTypes[t];
        var list = typeNodes(t);
        if (!list.length) return '';
        return togChip({
          label: st.name, color: st.color, list: list, attr: 'data-vt="' + t + '"',
          tip: '点一下：显示 / 隐藏全部「' + st.name + '」（共 ' + list.length + ' 个）'
        });
      }).join('');

      /* ---------- 连线 ---------- */
      var weakCount = graph.edges.filter(function (e) { return GU.isWeak(e); }).length;
      var edgeRows =
        '<span class="lg-item"><span class="lg-line" style="border-top-color:#1C1C1E;border-top-width:2px"></span>等价<em style="color:#A5ABB3;font-style:normal">·强</em></span>' +
        '<span class="lg-item"><span class="lg-line" style="border-top-color:#1C1C1E;border-top-width:2px"></span>推出 →<em style="color:#A5ABB3;font-style:normal">·强</em></span>' +
        '<span class="lg-item"><span class="lg-line" style="border-top-color:rgba(60,112,245,.5);border-top-width:2px"></span>定义引用<em style="color:#A5ABB3;font-style:normal">·强</em></span>' +
        (weakCount
          ? '<span class="lg-item" style="opacity:' + (C.exploreMode ? 1 : 0.45) + '">' +
            '<span class="lg-line" style="border-top-color:rgba(138,106,214,.7);border-top-width:2px;border-top-style:dashed"></span>' +
            '类比<em style="color:#A5ABB3;font-style:normal">·弱 ' + weakCount + ' 条' +
            (C.exploreMode ? '' : '（点右上角「探索」显示）') + '</em></span>'
          : '');

      /* ---------- 数学板块：星系 + 它下面的星团（缩进一层） ---------- */
      var regionRows = live.map(function (r) {
        var mine = graph.clusters.filter(function (c) { return c.parent === r.id && c.stat; });
        var head = togChip({
          label: r.name, color: U.mixWithWhite(r.color, 0.45), list: regionNodes(r.id),
          attr: 'data-vr="' + r.id + '"', tip: '点色块：显示 / 隐藏整个「' + r.name + '」；点名字：跳过去看',
          nav: r.id, navTip: '跳过去看「' + r.name + '」'
        });
        if (!mine.length) return head;
        var kids = mine.map(function (c) {
          return togChip({
            label: c.name, color: U.mixWithWhite(c.color || r.color, 0.62), list: c.nodes,
            attr: 'data-vc="' + c.id + '"', round: true,
            tip: '点圆点：显示 / 隐藏「' + c.name + '」；点名字：跳过去看',
            nav: c.id, navTip: '跳过去看「' + c.name + '」'
          });
        }).join('');
        return head + '<span class="lg-kids">' + kids + '</span>';
      }).join('');

      var hidden = total - shown;

      /* ---------- 进度：已读 / 可读 ---------- */
      /* 这是**用户自己的**进度（localStorage），不是内容的一部分 ——
         删掉 localStorage 那一项，图本身一个像素都不变。
         「可读」= 前置全都读过的未读节点：图里每条 implication 的 sources、
         每条 definition 的 definition 都算前置，这个数是现算的。 */
      var readN = reads.readCount();
      var readyN = reads.readyList().length;
      var progressGroup =
        '<div class="lg-group"><div class="lg-title">进度</div>' +
        '<div class="lg-row lg-prog">' +
          '<span class="lg-pbar"><i style="width:' +
            (total ? (readN / total * 100).toFixed(1) : '0') + '%"></i></span>' +
          '<b>' + readN + '</b><em>/ ' + total + ' 已读</em>' +
        '</div>' +
        '<div class="lg-row">' +
          '<span class="lg-item lg-ready" title="前置全都读过的未读节点 —— 现在就能读">可读 <b>' + readyN + '</b></span>' +
          '<span class="lg-chip' + (reads.isShowMarks() ? ' on' : '') +
            '" data-readmarks title="在图上给读过的节点画绿环">标记</span>' +
          (readN ? '<button class="lg-reset" data-readreset title="清空已读进度（不可撤销）">重置</button>' : '') +
        '</div></div>';

      /* ---------- 分层：滑杆（原来是一排 0–27 芯片，层数只会继续涨，撑不住） ---------- */
      var maxLv = graph.maxLayer || 0;
      var sizes = graph.layerSizes || [];
      var curLv = (layerMax == null) ? maxLv : layerMax;
      var llist = sizes[curLv] || [];
      var lnames = llist.map(function (x) { return x.label; });
      var layerTip = '第 ' + curLv + ' 层（' + llist.length + ' 个）：' +
        (lnames.slice(0, 12).join('、') || '（空）') + (lnames.length > 12 ? ' …' : '');
      var layerChips =
        '<input type="range" class="lg-range" min="0" max="' + maxLv + '" step="1" value="' + curLv +
        '" data-layer-range aria-label="显示到第几层" title="' + U.escapeHtml('拖动：只显示「离地基不超过 k 步」的点。' + layerTip) + '">' +
        '<span class="lg-chip lg-chip-all' + (layerMax == null ? ' on' : '') +
        '" data-layer="all" title="不限层数（全部 ' + total + ' 个点）">全部</span>';
      var layerTitle = '<span id="lg-layer-readout" title="' + U.escapeHtml(layerTip) + '">' +
        '分层 · 显示到第 ' + curLv + ' 层（' + shown + '/' + total + '）</span>';

      /* ---------- 子图开关：只在子图模式开着时出现 ---------- */
      var subChips = '';
      if (subSeed) {
        for (var sl = 1; sl <= 3; sl++) {
          subChips += '<span class="lg-chip' + (sl === subHops ? ' on' : '') +
            '" data-subhops="' + sl + '" title="沿依赖走 ' + sl + ' 跳">' + sl + '</span>';
        }
      }
      var subGroup = subSeed
        ? '<div class="lg-group"><div class="lg-title">只看子图 · ' +
            U.escapeHtml(SUB_DIR_NAME[subDir] || subDir) + '（' + subCount + ' 个点）</div>' +
          '<div class="lg-row lg-layers">' + subChips +
          '<span class="lg-chip' + (subSkipBase ? ' on' : '') + '" data-subbase ' +
            'title="跳过第 0–2 层的「地基」（ZFC 公理、一阶语言这些）——它们几乎每个闭包里都有">跳地基</span>' +
          '<button class="lg-reset" data-subclear title="退出子图，恢复全图">退出</button>' +
          '</div></div>'
        : '';

      /* ---------- 导出：导出的是「你现在看到的这一块」 ---------- */
      var exN = 0, exE = 0;
      if (exporter) { var _c = exporter.collect(); exN = _c.nodes.length; exE = _c.edges.length; }
      var exportGroup =
        '<div class="lg-group"><div class="lg-title">导出当前视图（' + exN + ' 点 / ' + exE + ' 线）</div>' +
        '<div class="lg-row lg-layers">' +
        '<button class="lg-reset" data-export="svg" title="导出 SVG 矢量图：当前屏幕内的点 + 这些点之间的线（可直接放进文档）">SVG</button>' +
        '<button class="lg-reset" data-export="tikz" title="导出 TikZ 代码（给论文用）：每个节点带 \\label{n:节点id}，正文里可以 \\ref 引用">TikZ</button>' +
        '<button class="lg-reset" data-export="json" title="导出子图 JSON（给程序和 AI）：id / 类型 / 陈述 / 坐标 / 边">子图 JSON</button>' +
        '</div></div>';

      legendEl.innerHTML =
        '<div class="lg-head" data-toggle><b>图例</b>' +
        (hidden
          ? '<button class="lg-reset" data-reset title="把所有节点都显示出来">显示全部 ' + shown + '/' + total + '</button>'
          : '') +
        '<span class="lg-caret">▼</span></div>' +
        '<div class="lg-body">' +
        progressGroup +
        '<div class="lg-group"><div class="lg-title">节点（' + total + '）</div>' +
        '<div class="lg-row">' + typeRows + '</div></div>' +
        '<div class="lg-group"><div class="lg-title">连线（' + graph.edges.length + '）</div>' +
        '<div class="lg-row">' + edgeRows + '</div></div>' +
        '<div class="lg-group"><div class="lg-title">' + layerTitle + '</div>' +
        '<div class="lg-row lg-layers">' + layerChips + '</div></div>' +
        subGroup +
        '<div class="lg-group"><div class="lg-title">数学板块</div>' +
        '<div class="lg-row">' + regionRows + '</div></div>' +
        exportGroup +
        '<div class="lg-hint">' +
        (subSeed
          ? '子图模式：「' + U.escapeHtml(graph.byId[subSeed] ? graph.byId[subSeed].label : subSeed) +
            '」' + U.escapeHtml(SUB_DIR_NAME[subDir] || subDir) +
            '，共 ' + subCount + ' 个点（点数字改跳数，「退出」回全图）'
          : trunkOnly || layerMax != null
            ? (trunkOnly ? '主干模式：' : '') +
              (layerMax != null ? '只显示第 0–' + layerMax + ' 层：' : '') +
              '现在共 ' + shown + ' 个点（点图例标题栏的「显示全部」恢复）'
            : '点色块 = 显示 / 隐藏 · 点名字 = 跳过去看 · 点层号 = 只看那一层以下') +
        '</div>' +
        '</div>';
    }

    legendEl.addEventListener('click', function (e) {
      var t = e.target;
      if (!t.closest) return;
      // ⚠️ 恢复按钮就在「点一下折叠」的标题栏里 → 必须先判它，否则会变成折叠
      if (t.closest('[data-reset]')) {
        setLayerMax(null); setTrunkOnly(false); clearSubgraph(); vis.showAll(); return;
      }

      // 进度：开关图上的绿环 / 清空已读
      if (t.closest('[data-readmarks]')) { reads.setShowMarks(!reads.isShowMarks()); return; }
      if (t.closest('[data-readreset]')) { reads.reset(); return; }

      // 子图：改跳数 / 开关「跳地基」/ 退出
      var sh = t.closest('[data-subhops]');
      if (sh) { setSubgraph(subSeed, subDir, parseInt(sh.getAttribute('data-subhops'), 10)); return; }
      if (t.closest('[data-subbase]')) { subSkipBase = !subSkipBase; setSubgraph(subSeed, subDir); return; }
      if (t.closest('[data-subclear]')) { clearSubgraph(); return; }

      // 分层：点第 k 个芯片 = 显示 0…k 层；「全部」= 不限
      var lchip = t.closest('[data-layer]');
      if (lchip) {
        var lv = lchip.getAttribute('data-layer');
        setLayerMax(lv === 'all' ? null : parseInt(lv, 10));
        return;
      }
      if (t.closest('[data-toggle]')) { legendEl.classList.toggle('collapsed'); return; }

      // 名字 = 跳过去看（它套在开关芯片里面，所以要先判）
      var nav = t.closest('[data-nav]');
      if (nav) {
        var nid = nav.getAttribute('data-nav');
        if (graph.clusterById[nid]) fitCluster(nid);
        else fitRegion(nid);
        return;
      }

      // 导出：SVG / TikZ / 子图 JSON（内容 = 当前屏幕内的点与它们之间的线）
      var exb = t.closest('[data-export]');
      if (exb) {
        var res = exporter ? exporter.save(exb.getAttribute('data-export'))
          : { ok: false, reason: '导出模块没加载（index.html 少了 export.js？）' };
        var old = exb.textContent;
        exb.textContent = res && res.ok ? '✓' : '×';
        setTimeout(function () { exb.textContent = old; }, 1200);
        if (res && res.ok) {
          console.log('[数学星图] 已导出 ' + res.name + '（' + res.nodes + ' 点 / ' +
            res.edges + ' 线 / ' + res.bytes + ' 字节）');
        } else {
          console.error('[数学星图] 导出失败：' + ((res && res.reason) || '未知原因'));
        }
        return;
      }

      // 色块 = 显示 / 隐藏
      var chip = t.closest('[data-vt]');
      if (chip) { toggleList(typeNodes(chip.getAttribute('data-vt'))); return; }
      chip = t.closest('[data-vc]');
      if (chip) {
        var c = graph.clusterById[chip.getAttribute('data-vc')];
        if (c) toggleList(c.nodes);
        return;
      }
      chip = t.closest('[data-vr]');
      if (chip) toggleList(regionNodes(chip.getAttribute('data-vr')));
    });

    /* 层号滑杆：拖的过程中只更新读数 + 过滤（不重画图例、不重新适配镜头），
       松手（change）才做一次完整善后。否则 input 元素会被 renderLegend 换掉、拖拽断掉。 */
    function layerRangeValue(el) {
      var k = parseInt(el.value, 10);
      return isFinite(k) ? k : null;
    }
    legendEl.addEventListener('input', function (e) {
      var r = e.target;
      if (!r || !r.matches || !r.matches('[data-layer-range]')) return;
      suppressLegend = true;
      setLayerMax(layerRangeValue(r), { fit: false });
      var out = document.getElementById('lg-layer-readout');
      if (out) {
        var k = (layerMax == null) ? (graph.maxLayer || 0) : layerMax;
        out.textContent = '分层 · 显示到第 ' + k + ' 层（' + vis.visibleCount() + '/' + graph.nodes.length + '）';
      }
    });
    legendEl.addEventListener('change', function (e) {
      var r = e.target;
      if (!r || !r.matches || !r.matches('[data-layer-range]')) return;
      suppressLegend = false;
      setLayerMax(layerRangeValue(r));
      renderLegend();
    });

    /* 窄屏（竖屏手机 / 窄窗口）默认把图例**折起来**，而不是藏掉。
       ⚠️ 阈值必须和 styles.css 里那条 @media 保持一致。
       ⚠️ 只在「刚进入窄屏」时折一次 —— 每次都折的话，用户自己展开完一动窗口又没了。 */
    var NARROW_W = 820;
    var wasNarrow = null;
    function syncNarrowLegend() {
      var now = window.innerWidth <= NARROW_W;
      if (now && wasNarrow !== true) legendEl.classList.add('collapsed');
      wasNarrow = now;
    }
    syncNarrowLegend();
    window.addEventListener('resize', syncNarrowLegend);

    /* ---------------------------------------------------------- 键盘 */
    /* ------------------------------------------------- 沿边游走（← →） */
    /*
      「数学式」的键盘漫游：正在看某个点时，
        → 顺着箭头走 —— 我推出的结论（implication）、我引用的定义（definition）
        ← 逆着箭头走 —— 推出我的前提、引用我这个定义的结论
      无向边（等价 / 类比）两个方向都能走。同一方向连按，在一圈候选里轮转（按层号、id 排序，
      顺序可预期）。Shift + 方向键仍然是原来的平移。
    */
    var walkState = { from: null, dir: 0, i: 0 };
    function neighborsOf(id, dir) {
      var raw = [];
      graph.edges.forEach(function (e) {
        if (e.kind === 'implication') {
          if (dir > 0) { if ((e.sources || []).indexOf(id) >= 0) raw.push(e.target); }
          else if (e.target === id) (e.sources || []).forEach(function (s) { raw.push(s); });
        } else if (e.kind === 'definition') {
          if (dir > 0) { if (e.usedBy === id) raw.push(e.definition); }
          else if (e.definition === id) raw.push(e.usedBy);
        } else {
          if (e.a === id) raw.push(e.b);
          else if (e.b === id) raw.push(e.a);
        }
      });
      var seen = Object.create(null), list = [];
      raw.forEach(function (x) {
        var n = graph.byId[x];
        if (!n || seen[x]) return;
        seen[x] = 1; list.push(n);
      });
      list.sort(function (p, q) {
        return (p.layer - q.layer) || (p.id < q.id ? -1 : (p.id > q.id ? 1 : 0));
      });
      return list;
    }
    function walkNeighbor(id, dir) {
      var list = neighborsOf(id, dir);
      if (!list.length) return;
      if (walkState.from !== id || walkState.dir !== dir) walkState = { from: id, dir: dir, i: 0 };
      else walkState.i = (walkState.i + 1) % list.length;
      focusNode(list[Math.min(walkState.i, list.length - 1)].id, { force: true });
    }

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
      // 键盘也算「用户动过星图」—— 否则第一次动作用方向键平移时，地址栏不会记相机
      seedHash();
      if (e.key === '/' ) { e.preventDefault(); search.focus(); return; }
      if (e.key === '+' || e.key === '=') { e.preventDefault(); cam.zoomBy(C.camera.zoomStep); requestDraw(); }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); cam.zoomBy(1 / C.camera.zoomStep); requestDraw(); }
      else if (e.key === '0') { e.preventDefault(); fitAll(); requestDraw(); }
      else if (e.key.indexOf('Arrow') === 0) {
        // 正在看某个点时：← → 沿边游走（Shift+方向 仍是平移，互不冲突）
        var f = view.focus;
        if (f && f.type === 'node' && !e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          e.preventDefault();
          walkNeighbor(f.id, e.key === 'ArrowRight' ? 1 : -1);
          return;
        }
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
    /* ⚠️ 这里**故意不自动淡出**（原来 9 秒后加 .fade ⇒ opacity: 0）。
       #hint 现在同时承担这一页的标题与说明：h1 + 一段介绍 + 通往概念索引 /
       阅读页的链接。它是 /mathgalaxy/ 这个 2.6 MB 单文件应用里**唯一一块静态
       可读内容** —— 搜索引擎能抓到的就是它（渲染完可见文本原本只有 97 个字符，
       整个 URL 因此一直没被收录）。自动淡出 = 对爬虫隐藏内容，会被判成
       「隐藏文本」；何况这一页本来就没有别的可读文本可以替代。
       ⛔ 不要再恢复定时淡出（样式里小屏那句 display:none 也一起拿掉了）。 */
    if (hintEl) hintEl.classList.remove('fade');

    /* ------------------------------------------------------ 视图状态进 hash */
    /*
      URL 里装的就是「我看到的这张图」，整条可以复制给别人：

        #n=<节点id>        聚焦某个节点（面板同时打开）
        #e=<连线id>        聚焦某条连线
        #r=<星系id>        适配到某个星系
        #c=<星团id>        适配到某个星团
        &ly=<k>            只显示第 0…k 层（缺省 = 不限层）
        &tr=1              主干模式
        &sub=<id>&sd=<deps|users|both>&sh=<跳数>&sb=<0|1>   只看某个节点的子图
        &hide=R:<星系>,C:<星团>,T:<类别>,<节点id>,…          藏起来的点：
                           能整块表达就整块，剩下的才写 id，所以整块开关的链接很短
        &dl=0 &lb=0 &ex=1  定义线 / 名字 / 探索（弱边）的开关
        &v=<k>,<cx>,<cy>   相机的缩放与世界中心（写的时候按屏幕中心算，换窗口也对得上）
        &fps=1             右下角显示诊断角标（帧耗时 / 连线层耗时 / dpr / canvas 尺寸）

      ⚠️ 绝不用 ?query + history.pushState：`file://` 下 origin 是 null，
         pushState / replaceState 会抛 SecurityError —— 而「双击 index.html 就能用」
         是硬要求。这里一律走 hash，pushState/replaceState 只是**能成功时**的优雅路径。
      ⚠️ 只有带视图状态的那几种 token（ly/tr/sub/hide/dl/lb/ex/v）才接管可见性：
         光是一个 #n=/#e=/#r=/#c= 的老链接，不覆盖接收者本地存的那份隐藏集合。
      ⚠️ 地址栏只在「真的动过」之后才写字（seeded）：刚开始那 700ms 的推镜头动画
         不该往地址栏里塞东西。相机用 replaceState，不刷历史。
    */
    var hashState = {
      seeded: false,      // 用户动过星图没有（没动过就不写 URL）
      applying: false,    // 正在应用 URL → 期间不往回写
      last: null,         // 上次写进去的串（自比的，也是自写事件的判据）
      timer: 0, camTimer: 0, camSig: '', pending: null
    };

    function enc(s) { return encodeURIComponent(String(s)); }
    function dec(s) { try { return decodeURIComponent(String(s)); } catch (e) { return String(s); } }

    /** 屏幕中心的世界坐标（相机存中心而不是 tx/ty，换个窗口大小也还原得对） */
    function camCenter() {
      return { x: (cam.viewW / 2 - cam.tx) / cam.k, y: (cam.viewH / 2 - cam.ty) / cam.k };
    }
    function camSig() {
      var c = camCenter();
      return cam.k.toFixed(4) + ',' + c.x.toFixed(1) + ',' + c.y.toFixed(1);
    }

    /** 隐藏集合 → token 串：整块（星系 / 星团 / 类别）优先，剩下才逐个写 id */
    function hideTokens() {
      var rest = Object.create(null);
      vis.hiddenIds().forEach(function (id) { rest[id] = true; });
      var out = [];
      function cover(list) {
        if (!list || !list.length) return false;
        for (var i = 0; i < list.length; i++) if (!rest[list[i].id]) return false;
        list.forEach(function (n) { delete rest[n.id]; });
        return true;
      }
      (graph.regions || []).forEach(function (r) {
        if (cover(regionNodes(r.id))) out.push('R:' + enc(r.id));
      });
      (graph.clusters || []).forEach(function (c) {
        if (cover(c.nodes)) out.push('C:' + enc(c.id));
      });
      (T.typeOrder || []).forEach(function (t) {
        if (cover(typeNodes(t))) out.push('T:' + enc(t));
      });
      Object.keys(rest).sort().forEach(function (id) { out.push(enc(id)); });
      return out;
    }

    function buildHash() {
      var p = [];
      if (view.focus) p.push((view.focus.type === 'node' ? 'n=' : 'e=') + enc(view.focus.id));
      if (layerMax != null) p.push('ly=' + layerMax);
      if (trunkOnly) p.push('tr=1');
      if (subSeed) {
        p.push('sub=' + enc(subSeed), 'sd=' + subDir, 'sh=' + subHops, 'sb=' + (subSkipBase ? '1' : '0'));
      }
      if (!C.showDefinitionLines) p.push('dl=0');
      if (!C.showLabels) p.push('lb=0');
      if (C.exploreMode) p.push('ex=1');
      var hide = hideTokens();
      if (hide.length) p.push('hide=' + hide.join(','));
      if (fpsHud) p.push('fps=1');       // 诊断角标开着 → 让它留在 URL 里（刷新、分享都还在）
      var c = camCenter();
      p.push('v=' + cam.k.toFixed(4) + ',' + c.x.toFixed(1) + ',' + c.y.toFixed(1));
      return p.join('&');
    }

    function writeHash(s, mode) {
      hashState.last = s;
      var base = String(global.location.href).split('#')[0];
      var next = base + (s ? '#' + s : '');
      try {
        if (mode === 'replace' && global.history && global.history.replaceState) {
          global.history.replaceState(null, '', next);
        } else if (global.history && global.history.pushState) {
          global.history.pushState(null, '', next);
        } else {
          throw new Error('no history api');
        }
      } catch (e) {
        // 受限环境（file:// 等）：退回改 location
        if (mode === 'replace') global.location.replace(next);
        else global.location.hash = s;
      }
    }

    /**
     * 140ms 内合并成一次写：滑块连点、「显示全部」这种一次改好几个开关的操作
     * 不该在历史里留下四五条记录（那正是「返回键不好用」的根源）。
     */
    function syncHash(mode) {
      if (hashState.applying) return;
      hashState.seeded = true;
      if (mode !== 'replace') hashState.pending = 'push';
      else if (hashState.pending !== 'push') hashState.pending = 'replace';
      if (hashState.timer) return;
      hashState.timer = setTimeout(function () {
        hashState.timer = 0;
        var m = hashState.pending; hashState.pending = null;
        var s = buildHash();
        if (s === hashState.last) return;        // 没变就不碰地址栏（也不进历史）
        writeHash(s, m || 'replace');
      }, 140);
    }

    /** 相机停下来之后把「现在这一屏」补进 URL（replace，不新增历史） */
    function noteCamera() {
      if (!hashState.seeded || hashState.camTimer) return;
      var sig = camSig();
      if (sig === hashState.camSig) return;
      hashState.camTimer = setTimeout(function () {
        hashState.camTimer = 0;
        hashState.camSig = camSig();
        syncHash('replace');
      }, 450);
    }

    /** 按 hide= 还原隐藏集合（URL 说全显示就是全显示） */
    function applyHide(spec) {
      var want = Object.create(null);
      spec.split(',').forEach(function (tok) {
        if (!tok) return;
        tok = dec(tok);
        if (tok.indexOf('R:') === 0) {
          regionNodes(tok.slice(2)).forEach(function (n) { want[n.id] = true; });
        } else if (tok.indexOf('C:') === 0) {
          var c = graph.clusterById[tok.slice(2)];
          if (c) (c.nodes || []).forEach(function (n) { want[n.id] = true; });
        } else if (tok.indexOf('T:') === 0) {
          typeNodes(tok.slice(2)).forEach(function (n) { want[n.id] = true; });
        } else if (graph.byId[tok]) {
          want[tok] = true;
        }
      });
      vis.setMany(graph.nodes.map(function (n) { return n.id; }), true);
      var ids = Object.keys(want);
      if (ids.length) vis.setMany(ids, false);
    }

    /** 工具条按钮的 .on 跟着 config 走（从 URL 恢复时要补上） */
    function syncToolbar() {
      var map = {
        'toggle-defs': C.showDefinitionLines, 'toggle-labels': C.showLabels,
        'toggle-explore': C.exploreMode, 'toggle-trunk': trunkOnly, 'toggle-wheel': C.wheelZooms
      };
      Object.keys(map).forEach(function (act) {
        var btn = toolbar.querySelector('[data-act="' + act + '"]');
        if (!btn) return;
        btn.classList.toggle('on', !!map[act]);
        if (act === 'toggle-wheel') btn.textContent = C.wheelZooms ? '滚轮·缩放' : '滚轮·平移';
      });
    }

    /** 读 URL → 恢复视图；返回 true 表示「URL 里确实有东西要恢复」 */
    function applyHash() {
      var h = String(global.location.hash || '').replace(/^#/, '');
      if (!h) return false;
      var kv = Object.create(null);
      h.split('&').forEach(function (part) {
        if (!part) return;
        var i = part.indexOf('=');
        if (i > 0) kv[part.slice(0, i)] = part.slice(i + 1);
      });
      if (!Object.keys(kv).length) return false;
      var hasCam = !!kv.v;
      var isView = hasCam || kv.ly != null || kv.tr != null || kv.sub != null ||
        kv.hide != null || kv.dl != null || kv.lb != null || kv.ex != null;
      if (!isView && kv.n == null && kv.e == null && kv.r == null && kv.c == null) return false;

      hashState.applying = true;
      try {
        /* ⭐ 只要这条 URL 带视图状态，它就是**完整状态**：没写的 token 一律回默认
           （tr/sub 关、hide 空、dl/lb 开、ex 关、ly 不限）。光一个 #n=… 的老链接
           不动这些，也不覆盖接收者本地存的那份隐藏集合。 */
        if (isView) {
          C.showDefinitionLines = kv.dl != null ? dec(kv.dl) !== '0' : true;
          C.showLabels = kv.lb != null ? dec(kv.lb) !== '0' : true;
          C.exploreMode = kv.ex != null ? dec(kv.ex) === '1' : false;

          var ly = kv.ly != null ? parseInt(dec(kv.ly), 10) : NaN;
          setLayerMax(isFinite(ly) ? ly : null);
          setTrunkOnly(kv.tr != null && dec(kv.tr) === '1');
          if (kv.sub != null) {
            subSkipBase = kv.sb !== '0';
            var hops = kv.sh != null ? parseInt(dec(kv.sh), 10) : 2;
            setSubgraph(dec(kv.sub), kv.sd ? dec(kv.sd) : 'deps', isFinite(hops) ? hops : 2);
          } else {
            clearSubgraph();
          }
          applyHide(kv.hide != null ? kv.hide : '');
          refreshVisible();
        }

        // 回退到「没有聚焦」的那一条时，面板要跟着收起来
        if (!kv.n && !kv.e && view.focus) { clearFocus(); panel.hide(); }

        if (kv.n != null && graph.byId[dec(kv.n)]) {
          focusNode(dec(kv.n), { force: true, center: !hasCam });
        } else if (kv.e != null && findEdge(dec(kv.e))) {
          focusEdge(dec(kv.e), { force: true, center: !hasCam });
        } else if (kv.r != null && graph.regionById[dec(kv.r)]) {
          if (!hasCam) fitRegion(dec(kv.r));
        } else if (kv.c != null && graph.clusterById[dec(kv.c)]) {
          if (!hasCam) fitCluster(dec(kv.c));
        }

        if (hasCam) {
          var pq = dec(kv.v).split(',');
          var k = parseFloat(pq[0]), x = parseFloat(pq[1]), y = parseFloat(pq[2]);
          if (isFinite(k) && isFinite(x) && isFinite(y)) {
            cam.stopAnimation();
            cam.k = U.clamp(k, C.camera.minZoom, C.camera.maxZoom);
            cam.centerOn(x, y);
          }
        }
        hashState.last = h;
        hashState.camSig = camSig();
        syncToolbar();
        renderLegend();
        requestDraw();
      } finally {
        hashState.applying = false;
      }
      return true;
    }

    /* 自己写的 hash 会触发 hashchange —— 对一下 last 就知道是不是自己写的 */
    global.addEventListener('hashchange', function () {
      if (hashState.applying) return;
      var h = String(global.location.hash || '').replace(/^#/, '');
      if (h === (hashState.last || '')) return;
      applyHash();
    });

    /* 第一次真的动鼠标 / 滚轮之后，才开始往地址栏里写视图状态 */
    function seedHash() { hashState.seeded = true; }
    graphEl.addEventListener('pointerdown', seedHash);
    graphEl.addEventListener('wheel', seedHash, { passive: true });

    /* ------------------------------------------------------ 诊断角标（可选） */
    /*
      地址栏带 fps=1 时右下角出读数。**字段语义**（避免把不同窗口的数混着读）：
        · 实时 帧         = rAF 间隔，最近 700ms 的均值（含空帧 ⇒ 空闲时应 ≈1 个时隙）
        · 实时 绘制/输入/其余 = 同一 700ms 窗口内：app 自己的 JS / 输入回调 / 其余（光栅化+合成+呈现）
                          三者相加 ≈ 帧。**「绘制」只算 JS，不含光栅化。**
        · 峰(自开)       = 打开页面以来的最大值；**已剔除 gap**（见下）
        · 分项 边/节点/标签 = renderer.prof 的低频汇总（每帧累加 ÷ 帧数，⛔ 不引入 flush/readback）
        · 抽样           = 额外做一次绘制/铺雾来估「连线层/云雾层」的成本，**属于侵入式测量，不计入帧**
                          （空闲行里「帧 4.6 / 绘制 0.00 / 抽样连线层 7.00」不矛盾：三者窗口与口径本来就不同）
        · gap            = 帧间隔 > 2s 或采样时页面 hidden（切标签/截图工具/断档伪影）⇒ 只计数，不进峰值
      不带 fps=1 时完全不创建，不进产品正常路径。
    */
    var fpsHud = /(^|[&#])fps=1/.test(String(global.location.hash || '') + '&' + String(global.location.search || ''));
    if (fpsHud) {
      var hudEl = document.createElement('div');
      hudEl.id = 'mg-fps';
      hudEl.style.cssText = 'position:fixed;right:14px;bottom:14px;z-index:30;pointer-events:none;'
        + 'background:rgba(20,22,28,.88);color:#fff;padding:7px 11px;border-radius:9px;'
        + 'font:11.5px/1.55 ui-monospace,Menlo,Consolas,monospace;white-space:pre;text-align:left';
      document.body.appendChild(hudEl);

      /* 对齐自检：位图图层在屏幕上的实际位置/宽度 vs「实时层算出的同一世界矩形」。
         错位px 大 = 位置错；宽比 ≠1 = **缩放**错（k/k_bake 算错或尺寸没跟上）。 */
      function alignLine() {
        var bs = bitmap ? bitmap.state() : null;
        if (!bs || !bs.ready) return '对齐 （位图未就绪）';
        /* ⚠️ 两代画布**都常显**（带轮换代不换显示层）⇒ 不能拿「第一个没藏起来的」当现行层，
           必须按 state().live 取（旧的两代里那个已备份/透明的那一代落位无意义）。 */
        var els = document.querySelectorAll('canvas[data-mg="worldbitmap"]');
        var el = (bs.live >= 0 && els[bs.live]) ? els[bs.live] : null;
        if (!el) return '对齐 （无显示层）';
        var bb = graph.bbox();
        var ex = bb.minX * cam.k + cam.tx, ey = bb.minY * cam.k + cam.ty;
        var ew = (bb.maxX - bb.minX) * cam.k;
        var r = el.getBoundingClientRect();
        var off = Math.hypot(r.left - ex, r.top - ey);
        return '对齐 错位 ' + off.toFixed(1) + 'px ｜ 宽比 ' + (ew ? (r.width / ew).toFixed(4) : '-')
          + ' ｜ 层 ' + el.width + 'x' + el.height + ' @k_bake ' + bs.k.toFixed(3) + ' @k ' + cam.k.toFixed(3)
          + ' @dpr ' + global.devicePixelRatio;
      }
      var hudLast = 0, hudAcc = 0, hudCnt = 0, hudWorst = 0, hudPeak = 0;
      var hudPeakDraw = 0, hudPeakInp = 0, hudPeakRest = 0;
      /* 长帧记录器：环形缓冲 20 条；gap（>2s 或采样时 hidden）只计数不进峰值 */
      var ring = [], gaps = 0;
      var hudTick = function (ts) {
        if (hudLast) {
          var dms = ts - hudLast;
          var hidden = (document.visibilityState === 'hidden');
          if (dms > 2000 || hidden) { gaps++; }
          else {
            hudAcc += dms; hudCnt++;
            if (dms > hudWorst) hudWorst = dms;
            if (dms > 30) {
              var bs = bitmap ? bitmap.state() : null;
              ring.push({ dt: +dms.toFixed(1), vis: document.visibilityState, k: +cam.k.toFixed(4),
                k_bake: bs ? bs.k : null, 仅transform: lastUseBmp ? 1 : 0,
                可见边: view.visible.length, 节点: graph.nodes.length,
                位图: bs ? (bs.ready ? 'on' : 'off') : 'none', ts: Math.round(ts) });
              if (ring.length > 20) ring.shift();
            }
          }
        }
        hudLast = ts;
        requestAnimationFrame(hudTick);
      };
      requestAnimationFrame(hudTick);
      MG.perf = {
        ring: ring,
        snapshot: function () {
          var bs = bitmap ? bitmap.state() : null;
          var pr = renderer.prof;
          var f = Math.max(1, pr.frames);
          return {
            时间: new Date().toISOString(),
            env: { innerW: global.innerWidth, innerH: global.innerHeight, dpr: global.devicePixelRatio,
              canvas: (function () { var c = document.getElementById('layer-graph'); return c.width + 'x' + c.height; })(),
              gl: glInfo, 视口: cam.viewW + 'x' + cam.viewH },
            开关: { 定义线: C.showDefinitionLines, 名字: C.showLabels, 探索: C.exploreMode,
              位图: bitmap ? bitmap.enabled : null, 云雾: true },
            位图: bs,
            计数: { 节点: graph.nodes.length, 连线: view.visible.length, 隐藏: vis.hiddenCount() },
            prof每帧: { 边: +(pr.edges / f).toFixed(2), 节点: +(pr.nodes / f).toFixed(2),
              标签: +(pr.labels / f).toFixed(2), 帧: pr.frames },
            峰: { 帧: +hudPeak.toFixed(1), 绘制: +hudPeakDraw.toFixed(2), 输入: +hudPeakInp.toFixed(2), 其余: +hudPeakRest.toFixed(2) },
            gap计数: gaps, 长帧: ring.slice()
          };
        }
      };

      /* 每 700ms 刷新一次读数：整帧间隔 + 同步量「只画连线层」与「只画云雾层」的真实耗时。
         ⚠️ 云雾必须量在**真正显示的那张画布**上：离屏画布不被合成，浏览器会把光栅化
         一直推迟，量出来是 0.00ms（踩过）。所以这里用真画布、并把纹理按可见性签名
         重建一次，保证重铺出来的内容和真实那一帧完全一致（不改变画面）。
         顺带：角标开着时，全屏云雾每 700ms 会多铺一次，对「帧」读数的影响 < 0.3% 级别。 */
      var hudTex = null, hudVisSig = '';
      /* GPU 的纹理上限与型号 —— 「大纹理被回退到软件路径」这个假设要靠它证实 */
      var glInfo = '';
      try {
        var glProbe = document.createElement('canvas').getContext('webgl');
        if (glProbe) {
          var dbgInfo = glProbe.getExtension('WEBGL_debug_renderer_info');
          var glName = dbgInfo ? String(glProbe.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) || '') : '';
          glInfo = '纹理上限 ' + glProbe.getParameter(glProbe.MAX_TEXTURE_SIZE)
            + (glName ? ' · ' + glName.slice(0, 52) : '');
        } else {
          glInfo = '这台机器拿不到 WebGL 上下文';
        }
      } catch (e) { glInfo = ''; }
      function hudTexture() {
        var sig = graph.nodes.length + ':' + vis.hiddenCount();
        if (!hudTex || sig !== hudVisSig) {
          hudTex = MG.background.buildTexture(graph, vis.isNodeVisible);
          hudVisSig = sig;
        }
        return hudTex;
      }
      setInterval(function () {
        var c = document.getElementById('layer-graph');
        var fCnt = Math.max(1, hudCnt);
        var ms = hudCnt ? hudAcc / hudCnt : 0;
        var drawPer = drawProf.ms / fCnt;                       // 一帧里我这边花的 JS
        var inpPer = interaction.profile ? interaction.profile.ms / fCnt : 0;   // 一帧里输入回调花的
        var rest = ms - drawPer - inpPer;                        // 其余 = 光栅化 + 合成 + 呈现
        var t0 = performance.now();
        renderer.draw();
        var drawMs = performance.now() - t0;
        var cloudMs = NaN;
        try {
          /* ⚠️ 必须连铺几次再平均：单独调一次 drawImage 量到的只是「记录指令」，
             真正的光栅化被推迟到合成阶段（单次量出来是 0.00ms —— 踩过两次）。
             连铺会触发背压，第 2、3 次才把光栅化的账算进来。 */
          var reps = 3, ci = 0;
          var t1 = performance.now();
          for (ci = 0; ci < reps; ci++) MG.background.draw(cloudCtx, cam, hudTexture(), dpr);
          cloudMs = (performance.now() - t1) / reps;
        } catch (e) { /* 量不到就不显示 */ }
        hudAcc = 0; hudCnt = 0;
        drawProf.ms = 0; drawProf.n = 0;
        if (interaction.profile) { interaction.profile.ms = 0; interaction.profile.n = 0; }
        if (ms > hudPeak) hudPeak = ms;
        if (drawPer > hudPeakDraw) hudPeakDraw = drawPer;
        if (inpPer > hudPeakInp) hudPeakInp = inpPer;
        if (rest > hudPeakRest) hudPeakRest = rest;
        var pr = renderer.prof, pF = Math.max(1, pr.frames);
        var bs = bitmap ? bitmap.state() : null;
        hudEl.textContent =
          '实时 帧 ' + ms.toFixed(1) + ' ms · ' + (ms ? (1000 / ms).toFixed(0) : '-') + ' fps\n' +
          '实时 绘制 ' + drawPer.toFixed(2) + ' ｜ 输入 ' + inpPer.toFixed(2) + ' ｜ 其余 ' + rest.toFixed(2) + ' ms\n' +
          '峰(自开) 帧 ' + hudPeak.toFixed(0) + ' ｜ 绘制 ' + hudPeakDraw.toFixed(2) + ' ｜ 输入 ' + hudPeakInp.toFixed(2) + ' ｜ 其余 ' + hudPeakRest.toFixed(2) + '\n' +
          '分项 边 ' + (pr.edges / pF).toFixed(2) + ' ｜ 节点 ' + (pr.nodes / pF).toFixed(2) + ' ｜ 标签 ' + (pr.labels / pF).toFixed(2) + ' ms\n' +
          '抽样(侵入) 连线层 ' + drawMs.toFixed(2) + (isFinite(cloudMs) ? ' ｜ 云雾层 ' + cloudMs.toFixed(2) : '') + ' ms\n' +
          '位图 ' + (bs ? ((bs.ready ? 'on' : 'off') + (bs.inRange ? '' : '(超范围)') + ' k_bake ' + bs.k.toFixed(3) + ' ' + bs.size
            + ' 烘' + bs.bakes + '次 末' + bs.lastMs + '/峰' + bs.peakMs + 'ms 换' + bs.swaps) : '未装') + '\n' +
          'gap ' + gaps + ' 次（>2s 或 hidden，不进峰值）\n' +
          alignLine() + '\n' +
          global.innerWidth + '×' + global.innerHeight + ' · dpr ' + global.devicePixelRatio +
          ' · canvas ' + c.width + '×' + c.height +
          '\n节点 ' + graph.nodes.length + ' · 连线 ' + view.visible.length +
          (hudTex ? ' · 云雾纹理 ' + hudTex.canvas.width + '×' + hudTex.canvas.height : '') +
          (glInfo ? '\n' + glInfo : '');
        hudWorst = 0;
        renderer.profReset();
      }, 700);
    }

    /* ------------------------------------------- 微基准（bench=1，诊断用） */
    /*
      ⚠️ 为什么必须「强制冲刷」：canvas 的绘制指令是**延迟光栅化**的，单独量一次
         drawImage / fillRect 只会量到「记录指令」（0.00ms）。这里每轮测量末尾都用
         1 像素 getImageData 把积压的光栅化冲掉，量到的才是浏览器真花的时间。
      用它在**别人的机器**上把账拆开：纯色铺满（裸光栅速度）/ 连线层 / 云雾层 /
      连线层的两个子项（关名字、关定义线）。
    */
    var benchOn = /(^|[&#])bench=1/.test(String(global.location.hash || '') + '&' + String(global.location.search || ''));
    if (benchOn) {
      var bEl = document.createElement('div');
      bEl.id = 'mg-bench';
      bEl.style.cssText = 'position:fixed;left:14px;top:64px;z-index:31;pointer-events:none;'
        + 'background:rgba(20,22,28,.9);color:#fff;padding:9px 12px;border-radius:9px;'
        + 'font:11.5px/1.6 ui-monospace,Menlo,Consolas,monospace;white-space:pre;text-align:left';
      bEl.textContent = '微基准运行中…（约 3 秒）';
      document.body.appendChild(bEl);

      var bG = graphEl.getContext('2d');
      function bFlushG() { try { bG.getImageData(0, 0, 1, 1); } catch (e) {} }
      function bFlushC() { try { cloudCtx.getImageData(0, 0, 1, 1); } catch (e) {} }
      function bTime(fn, n, flush) {
        fn(); flush();                                  // 预热（几何缓存 / 字形缓存 / 纹理）
        var t = performance.now();
        for (var i = 0; i < n; i++) fn();
        flush();
        return (performance.now() - t) / n;
      }
      setTimeout(function () {
        var out = [];
        var gcv = graphEl, ccv = cloudEl;
        out.push('画布 ' + gcv.width + '×' + gcv.height + ' · 云雾 ' + ccv.width + '×' + ccv.height + ' · dpr ' + dpr);
        out.push('窗口 ' + global.innerWidth + '×' + global.innerHeight + ' · 相机 k=' + cam.k.toFixed(3));
        try {
          out.push('纯色铺满整张画布   ' + bTime(function () {
            bG.setTransform(1, 0, 0, 1, 0, 0);
            bG.fillStyle = '#ffffff';
            bG.fillRect(0, 0, gcv.width, gcv.height);
          }, 5, bFlushG).toFixed(2) + ' ms');
        } catch (e) { out.push('纯色铺满：测不了 ' + e.message); }
        try {
          out.push('连线层（含光栅化） ' + bTime(function () { renderer.draw(); }, 4, bFlushG).toFixed(2) + ' ms');
        } catch (e) { out.push('连线层：测不了 ' + e.message); }
        try {
          var bt = MG.background.buildTexture(graph, vis.isNodeVisible);
          out.push('云雾层（含光栅化） ' + bTime(function () { MG.background.draw(cloudCtx, cam, bt, dpr); }, 4, bFlushC).toFixed(2) + ' ms'
            + '  （纹理 ' + bt.canvas.width + '×' + bt.canvas.height + '）');
        } catch (e) { out.push('云雾层：测不了 ' + e.message); }
        try {
          C.showLabels = false;
          out.push('连线层 · 关掉名字 ' + bTime(function () { renderer.draw(); }, 4, bFlushG).toFixed(2) + ' ms');
          C.showLabels = true; renderer.invalidate();
        } catch (e) {}
        try {
          C.showDefinitionLines = false; renderer.invalidate();
          out.push('连线层 · 关定义线 ' + bTime(function () { renderer.draw(); }, 4, bFlushG).toFixed(2) + ' ms'
            + '  （可见连线 ' + view.visible.length + '）');
          C.showDefinitionLines = true; renderer.invalidate();
        } catch (e) {}
        try {
          /* 输入路径的嫌疑：每次 pointermove 都会 getBoundingClientRect()，
             而它可能触发**整个页面的强制重排**（图例有四百多个元素）。 */
          gcv.getBoundingClientRect();
          var tr1 = performance.now();
          for (var ri = 0; ri < 50; ri++) gcv.getBoundingClientRect();
          out.push('getBoundingClientRect ×50  ' + (performance.now() - tr1).toFixed(2) + ' ms（合计）');
          if (bEl) bEl.textContent = 'x';
          var tr2 = performance.now();
          for (var rj = 0; rj < 20; rj++) { if (bEl) bEl.textContent = 'x' + rj; gcv.getBoundingClientRect(); }
          out.push('  布局被弄脏后 ×20      ' + (performance.now() - tr2).toFixed(2) + ' ms（合计）');
        } catch (e) {}
        try {
          var gl2 = document.createElement('canvas').getContext('webgl');
          if (gl2) {
            var dbg2 = gl2.getExtension('WEBGL_debug_renderer_info');
            out.push('纹理上限 ' + gl2.getParameter(gl2.MAX_TEXTURE_SIZE)
              + (dbg2 ? ' · ' + String(gl2.getParameter(dbg2.UNMASKED_RENDERER_WEBGL)).slice(0, 60) : ''));
          }
        } catch (e) {}
        /* 用户抱怨的是「放大之后拖动」——上面量的是开局全图，这里再在高倍下量一遍 */
        try {
          var cat = graph.nodes.filter(function (n) { return n.regions.indexOf('category') >= 0; });
          var cx0 = 0, cy0 = 0, ci;
          for (ci = 0; ci < cat.length; ci++) { cx0 += cat[ci].x; cy0 += cat[ci].y; }
          cx0 /= cat.length; cy0 /= cat.length;
          var kFit = cam.k, cBack = camCenter();
          [12, 40].forEach(function (mult) {
            cam._anim = null; cam.k = kFit * mult; cam.centerOn(cx0, cy0);
            renderer.invalidate();
            var t = bTime(function () { renderer.draw(); }, 4, bFlushG);
            var onScr = 0, ns = graph.nodes, i;
            for (i = 0; i < ns.length; i++) {
              var px = ns[i].x * cam.k + cam.tx, py = ns[i].y * cam.k + cam.ty;
              if (px > -220 && px < gcv.width + 220 && py > -220 && py < gcv.height + 220) onScr++;
            }
            out.push('放大到 k=' + (kFit * mult).toFixed(2) + ' → 连线层 ' + t.toFixed(2)
              + ' ms（屏内 ' + onScr + ' 个点）');
          });
          cam._anim = null; cam.k = kFit; cam.centerOn(cBack.x, cBack.y);
          renderer.invalidate();
          out.push('（已把镜头还给原处）');
        } catch (e) { out.push('高倍测量失败：' + e.message); }
        out.push('（每项都带 1 像素 getImageData 强制冲刷，量的是真实光栅化时间）');
        bEl.textContent = out.join('\n');
        renderLegend();
        requestDraw();
      }, 2200);
    }

    /* ------------------------------------------------------------ 启动 */

    function start() {
      resize();
      if (cloudDirty || !cloudTex) {
        cloudDirty = false;
        cloudTex = MG.background.buildTexture(graph, vis.isNodeVisible);
      }
      syncToolbar();
      renderLegend();
      // 上次藏了一批点（或开着主干模式）→ 开局就只把「还看得见的那些」铺满屏幕
      var live = visibleNodes();
      var bb = (live.length && live.length < graph.nodes.length) ? bboxOf(live) : graph.bbox();
      cam.fit(bb, C.camera.fitPadding);
      var fitK = cam.k;
      var cx = (bb.minX + bb.maxX) / 2, cy = (bb.minY + bb.maxY) / 2;
      if (!applyHash()) {
        // 初始视角：先稍微留白，再平滑推进到「全部适配」
        cam.k = fitK * 0.72;
        cam.centerOn(cx, cy);
        cam.animateTo({ k: fitK, cx: cx, cy: cy }, REDUCE_MOTION ? 1 : 700);
      }
      requestDraw();
    }

    start();

    /* ------------------------------------------------ Phase A：世界位图图层
       载体乙（DOM canvas + CSS transform）：拖动只改 transform，合成器搬图层。
       位置/缩放/重烘时机全在 worldbitmap 里；app 这边只负责挂载与开关。 */
    if (MG.createWorldBitmap && C.bitmap) {
      /* ⚠️ 开关一律从 hash + search 两处读，并且**用查询串传**（`?region=1`）：
         应用自己每帧把视图状态写回 location.hash（`#v=…`），hash 里的开关会被顶掉；
         而它从不写 location.search。 */
      var flags = String(location.hash || '') + '&' + String(location.search || '');
      var bmpOn = !/(^|[&#?])bitmap=0/.test(flags);
      /* region 默认**打开**（已验收：内容互相关 (0,0)、p95 4.3、兜底帧 0、人速拖动零慢帧）。
         关掉：?region=0 或 MG.app.setRegion(false)。 */
      var regionOn = !/(^|[&#?])region=0/.test(flags);
      var marginOn = /(^|[&#?])margin=(\d+)/.exec(flags);
      /* 带高旋钮（横带切片烘焙）：&band=<设备像素>；越小单帧越轻、轮越长（A/B 用） */
      var bandOn = /(^|[&#?])band=(\d+)/.exec(flags);
      /* 缩放期出图间隔：&zoomms=<毫秒>；0 = 只等停手（A/B 用） */
      var zoomOn = /(^|[&#?])zoomms=(\d+)/.exec(flags);
      /* 世界图面积预算旋钮：&worldpx=0 退回「只看边长」的老口径（A/B 用） */
      var worldPxOn = /(^|[&#?])worldpx=(\d+)/.exec(flags);
      /* hover 叠加层默认走**甲支**（入射边加宽 + 箭头）—— 与旧「真画」观感一致，
         避免静默降质。要看廉价版（只画外环）：?hover=ring */
      var hoverFullOn = !/(^|[&#?])hover=ring/.test(flags);
      bitmap = MG.createWorldBitmap({
        renderer: renderer, graph: graph,
        host: graphEl.parentNode, beforeEl: graphEl,
        tiers: (function () {
          /* ⚠️ 也走 flags（hash + search 两处）—— 只读 hash 时 `?maxside=` 会被静默忽略
             （实测踩过：以为在测降档，其实 tier 一直是 4096）。 */
          var m = /(^|[&#?])maxside=(\d+)/.exec(flags);
          return m ? [Number(m[2])] : C.bitmap.tiers;
        })(), settleMs: C.bitmap.settleMs, onSwap: requestDraw,
        bandPx: bandOn ? Number(bandOn[2]) : C.bitmap.bandPx,
        zoomMs: zoomOn ? Number(zoomOn[2]) : C.bitmap.zoomMs,
        region: regionOn,
        marginPx: marginOn ? Number(marginOn[2]) : C.bitmap.marginPx,
        worldPxMax: worldPxOn ? Number(worldPxOn[2]) : C.bitmap.worldPxMax,
        worldSideMax: C.bitmap.worldSideMax,
        enabled: C.bitmap.enabled !== false && bmpOn
      });
      bitmap.attach();
      renderer.setHoverFull(hoverFullOn);   // 甲支（默认）：入射边加宽 ×1.85 + 箭头 ×1.2
      renderer.setEnvLive(true);            // 星团包络不进烘焙（和光晕一样实时画）
    }
    /* ------------------------------------------------ 外部内容包（可选） */
    if (MG.loader) {
      MG.loader.loadExternal().then(function (res) {
        if (!res || !res.packs.length) return;
        res.packs.forEach(function (p) {
          var v = MG.loader.validatePack(p);
          if (!v.ok) { console.warn('[数学星图] 外部内容包有问题：', p.name, v.errs); }
        });
        var packs = localPacks.concat(res.packs);
        graph = MG.buildGraph(packs, MG.regions, MG.clusters);
        MG.computeLayout(graph);
        view.graph = graph;
        vis.rebind(graph);            // 挑选结果保留，丢掉已经不存在的 id
        view.visible = visibleEdgeList();
        graph.clusterLinks = graph.buildClusterLinks(function (e) { return vis.edgeOk(e); });
        renderer.invalidate();
        cloudDirty = true;
        search.reindex();
        renderLegend();
        start();


        console.info('[数学星图] 已并入 ' + res.loaded + ' 个外部内容包。');
      });
    }

    /* 方便在控制台里调试：MG.app.graph / MG.app.cam */
    MG.app = {
      view: view, cam: cam, renderer: renderer, search: search,
      visibility: vis,
      focusNode: focusNode, focusEdge: focusEdge, fitAll: fitAll, fitRegion: fitRegion,
      clearFocus: clearFocus,
      export: exporter,
      requestDraw: requestDraw,     // 外部改了 cam / 数据之后记得调一次
      setBitmap: function (v) { if (bitmap) { bitmap.enable(v); bitmap.bakeNow(); } requestDraw(); },
      setRegion: function (v) { if (bitmap) bitmap.setRegion(v); requestDraw(); },
      setMargin: function (v) { if (bitmap) bitmap.setMargin(v); requestDraw(); },
      setBand: function (v) { if (bitmap) bitmap.setBand(v); requestDraw(); },
      setZoomMs: function (v) { if (bitmap) bitmap.setZoomMs(v); requestDraw(); },
      get bitmap() { return bitmap ? bitmap.state() : null; },
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
