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

    var view = {
      graph: graph,
      cam: null,
      visible: [],
      focus: null,
      hover: null,
      isNodeVisible: vis.isNodeVisible
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

    var renderer = MG.createRenderer(graphEl, view);
    var cloudTex = null;
    var cloudDirty = true;
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
      // 云雾是按「还看得见的点」铺的：藏了点就重画一次纹理（每帧最多一次）
      if (cloudDirty) {
        cloudDirty = false;
        cloudTex = MG.background.buildTexture(graph, vis.isNodeVisible);
      }
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
      onClose: function () { panelOpen = false; requestDraw(); }
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

    vis.onChange(function () { refreshVisible(); renderLegend(); });

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
    }

    function clearSubgraph() {
      if (!subSeed) return;
      subSeed = null; subIds = null; subCount = 0;
      applyFilter();
      renderLegend();
      fitAll();                       // 「退出」说好的是「回全图」，相机也得回去
    }

    function setTrunkOnly(on) {
      trunkOnly = !!on;
      applyFilter();
      var btn = toolbar.querySelector('[data-act="toggle-trunk"]');
      if (btn) btn.classList.toggle('on', trunkOnly);
      if (trunkOnly) fitAll();          // 主干只有几十个点，直接铺满屏幕
    }

    /** k = 只显示第 0…k 层；k >= 最大层 或 null = 不限 */
    function setLayerMax(k) {
      var max = graph.maxLayer || 0;
      layerMax = (k == null || k >= max) ? null : Math.max(0, k);
      applyFilter();
      if (layerMax != null) fitAll();
    }

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

    /** 点一下：全显示 → 全隐藏；只要缺了 → 补齐 */
    function toggleList(list) {
      if (!list.length) return;
      var s = statOf(list);
      vis.setMany(list.map(function (n) { return n.id; }), s.v < s.n);
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

      /* ---------- 分层开关：点第 k 个芯片 = 只显示 0…k 层 ---------- */
      var maxLv = graph.maxLayer || 0;
      var sizes = graph.layerSizes || [];
      var layerChips = '';
      for (var lv = 0; lv <= maxLv; lv++) {
        var llist = sizes[lv] || [];
        var lon = (layerMax == null) || lv <= layerMax;
        var lnames = llist.map(function (x) { return x.label; });
        layerChips += '<span class="lg-chip' + (lon ? ' on' : '') + '" data-layer="' + lv + '" title="' +
          U.escapeHtml('第 ' + lv + ' 层（' + llist.length + ' 个）：' +
            (lnames.slice(0, 10).join('、') || '（空）') + (lnames.length > 10 ? ' …' : '')) + '">' +
          lv + '</span>';
      }
      layerChips += '<span class="lg-chip lg-chip-all' + (layerMax == null ? ' on' : '') +
        '" data-layer="all" title="不限层数（全部 ' + total + ' 个点）">全部</span>';
      var layerTitle = '分层 · 显示到第 ' + (layerMax == null ? maxLv : layerMax) + ' 层' +
        '（' + shown + '/' + total + '）';

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

      legendEl.innerHTML =
        '<div class="lg-head" data-toggle><b>图例</b>' +
        (hidden
          ? '<button class="lg-reset" data-reset title="把所有节点都显示出来">显示全部 ' + shown + '/' + total + '</button>'
          : '') +
        '<span class="lg-caret">▼</span></div>' +
        '<div class="lg-body">' +
        '<div class="lg-group"><div class="lg-title">节点（' + total + '）</div>' +
        '<div class="lg-row">' + typeRows + '</div></div>' +
        '<div class="lg-group"><div class="lg-title">连线（' + graph.edges.length + '）</div>' +
        '<div class="lg-row">' + edgeRows + '</div></div>' +
        '<div class="lg-group"><div class="lg-title">' + layerTitle + '</div>' +
        '<div class="lg-row lg-layers">' + layerChips + '</div></div>' +
        subGroup +
        '<div class="lg-group"><div class="lg-title">数学板块</div>' +
        '<div class="lg-row">' + regionRows + '</div></div>' +
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
    /** 深链：#n=<节点id>  #e=<连线id>  #r=<星系id>  #c=<星团id> */
    function applyHash() {
      var h = String(global.location.hash || '').replace(/^#/, '');
      var m = h.match(/^([necr])=(.+)$/);
      if (!m) return false;
      var id = decodeURIComponent(m[2]).trim();
      if (m[1] === 'n' && graph.byId[id]) { focusNode(id, { force: true }); return true; }
      if (m[1] === 'e' && findEdge(id)) { focusEdge(id, { force: true }); return true; }
      if (m[1] === 'r' && graph.regionById[id]) { fitRegion(id); return true; }
      if (m[1] === 'c' && graph.clusterById[id] && graph.clusterById[id].nodes.length) {
        fitCluster(id); return true;
      }
      return false;
    }

    function start() {
      resize();
      if (cloudDirty || !cloudTex) {
        cloudDirty = false;
        cloudTex = MG.background.buildTexture(graph, vis.isNodeVisible);
      }
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
