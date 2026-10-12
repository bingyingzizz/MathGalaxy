/* ==========================================================================
   数学星图 · 前景渲染器（节点 / 连线 / 名称）
   --------------------------------------------------------------------------
   三种连线的画法：
     · 推出 implication  —— 黑色箭头，箭头指向被推出的结论；
                            多个前提时先汇聚到一点，再射向结论。
     · 等价 equivalence  —— 黑色直线，无箭头。
     · 定义引用 definition —— 蓝色（不透明度 50%）细线；同一直线上有多条时
                              会弯曲错开，避免糊成一团。
   全部在屏幕坐标里绘制，因此线宽 / 字号 / 箭头大小都可控。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;
  var C = MG.config;
  var T = MG.theme;
  var GU = MG.graphUtil;

  /* --------------------------------------------------------- 光晕精灵缓存 */
  var glowCache = Object.create(null);
  function glowSprite(color) {
    if (glowCache[color]) return glowCache[color];
    var S = 96;
    var cv = document.createElement('canvas');
    cv.width = cv.height = S;
    var g2 = cv.getContext('2d');
    var rgb = U.hexToRgb(color);
    var g = g2.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.34)');
    g.addColorStop(0.35, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.17)');
    g.addColorStop(0.7, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.04)');
    g.addColorStop(1, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0)');
    g2.fillStyle = g;
    g2.fillRect(0, 0, S, S);
    glowCache[color] = cv;
    return cv;
  }

  /* ------------------------------------------------------------ 文本量缓存 */
  var textCache = Object.create(null);
  function measure(ctx, text, font) {
    var key = font + '|' + text;
    var w = textCache[key];
    if (w == null) {
      var old = ctx.font;
      ctx.font = font;
      w = ctx.measureText(text).width;
      ctx.font = old;
      textCache[key] = w;
    }
    return w;
  }

  /* ------------------------------------------------------------ LOD 工具 */
  function smoothstep(e0, e1, x) {
    if (e1 === e0) return x < e0 ? 0 : 1;
    var t = U.clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  /* ======================================================================= */
  function createRenderer(canvas, view) {
    var ctx = canvas.getContext('2d');
    var dpr = 1;
    var W = 0, H = 0;
    var geomCache = null;      // 本帧的连线几何
    var nodeCache = Object.create(null);

    /* 本帧各层的可见度（0~1），随缩放变化，由 computeLod() 填 */
    var lodA = {
      galaxyName: 1, clusterName: 1, nodeDot: 1,
      nodeName: 1, trunkName: 0, nodeEdge: 1, clusterLink: 0,
      trunkEdge: 0, trunkDim: 1, envelope: 0
    };

    /* ------------------------------------------------------------------
       LOD 阈值换算（写法见 config.lod 的注释）
         { rel: [a,b] } → 乘以「适配全部」的缩放 k₀
         { px:  [a,b] } → 屏幕上相邻两点的像素距离 ÷ idealDist
       ------------------------------------------------------------------ */
    var fitKCache = 0, fitKKey = '';

    /** 「适配全部」时相机该停在哪 —— 和 cam.fit() 用同一套公式 */
    function fitZoom() {
      var bb = view.graph.bbox();
      var key = [bb.minX, bb.minY, bb.maxX, bb.maxY, W, H].join(',');
      if (key === fitKKey) return fitKCache;
      var pad = Math.min(C.camera.fitPadding, Math.min(W, H) * 0.18);
      var aw = Math.max(40, W - pad * 2), ah = Math.max(40, H - pad * 2);
      var w = Math.max(1, bb.maxX - bb.minX), h = Math.max(1, bb.maxY - bb.minY);
      fitKCache = U.clamp(Math.min(aw / w, ah / h),
        Math.max(C.camera.minZoom, C.camera.fitMinZoom),
        Math.min(C.camera.maxZoom, C.camera.maxFitZoom));
      fitKKey = key;
      return fitKCache;
    }

    /** 把 config 里的阈值写法换算成绝对 k */
    function thr(spec) {
      if (spec.px) {
        var d = C.layout.idealDist || 120;
        return [spec.px[0] / d, spec.px[1] / d];
      }
      var k0 = fitZoom();
      return [spec.rel[0] * k0, spec.rel[1] * k0];
    }

    function computeLod() {
      var k = view.cam.k, L = C.lod;
      var tDot = thr(L.nodeDotIn), tEdge = thr(L.nodeEdgeIn), tName = thr(L.nodeNameIn);
      var tTrunk = thr(L.trunkNameIn), tGal = thr(L.galaxyNameIn);
      var tCIn = thr(L.clusterNameIn), tCOut = thr(L.clusterNameOut);
      var tCLink = thr(L.clusterLinkOut);

      lodA.nodeDot = smoothstep(tDot[0], tDot[1], k);
      lodA.nodeName = smoothstep(tName[0], tName[1], k);
      // 主干的名字更早出现：缩小时屏幕上剩下的就是「学习主线」
      lodA.trunkName = smoothstep(tTrunk[0], tTrunk[1], k);
      lodA.nodeEdge = smoothstep(tEdge[0], tEdge[1], k);
      // 主干内部的边：缩小时先于其它连线出现 —— 全图上也看得见「主线」
      var tSpine = thr(L.trunkEdgeIn);
      lodA.trunkEdge = smoothstep(tSpine[0], tSpine[1], k);
      // 全图时把「不在主干上」的点压暗 → 主线才浮得出来（放大后恢复原样）
      var tDim = thr(L.trunkDimIn);
      lodA.trunkDim = 1 - L.trunkDimMax * (1 - smoothstep(tDim[0], tDim[1], k));
      // 星团包络：中等缩放出现，放大后让位
      var tEnvIn = thr(L.envelopeIn), tEnvOut = thr(L.envelopeOut);
      lodA.envelope = smoothstep(tEnvIn[0], tEnvIn[1], k) * (1 - smoothstep(tEnvOut[0], tEnvOut[1], k));
      // 星团名：放大到看得见节点名时就退场，避免和节点名打架
      var cNameIn = smoothstep(tCIn[0], tCIn[1], k);
      var cNameOut = smoothstep(tCOut[0], tCOut[1], k);
      lodA.clusterName = cNameIn * (1 - cNameOut);
      // 星系名：最小的时候出现，星团名起来之后压掉一部分（但不清零，留个方位感）
      lodA.galaxyName = (1 - (L.galaxyNameHold || 0) * cNameIn) * smoothstep(tGal[0], tGal[1], k);
      // 星团级粗线与节点级细线交叉淡入淡出
      lodA.clusterLink = 1 - smoothstep(tCLink[0], tCLink[1], k);
    }

    /* ------------------------------------------------------------ 尺寸 */
    function resize() {
      dpr = Math.min(global.devicePixelRatio || 1, 2.5);
      var rect = canvas.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width || global.innerWidth));
      var h = Math.max(1, Math.round(rect.height || global.innerHeight));
      /* ⚠️ 低分辨率模式必须缩的是**后备尺寸**（CSS 尺寸不变，浏览器会把小的拉伸回来），
         只缩 transform 会把画面缩到左上角一小块。 */
      var sc = dpr * drawScale;
      canvas.width = Math.max(1, Math.round(w * sc));
      canvas.height = Math.max(1, Math.round(h * sc));
      W = w; H = h;
      view.cam.setViewport(W, H);
      invalidate();
      return { w: W, h: H, dpr: dpr };
    }

    /* -------------------------------------------------------- 尺寸计算 */
    /** 半径倍率：按「是不是中心天体 / 度数多大」分档。
        分档表在 config.js 的 node.sizeTiers —— 那里写了为什么不再用
        ×1.32 / ×1.22 那种「叠乘」写法（差距太小，看不出层级）。 */
    function sizeMul(node) {
      if (!node) return 1;
      var t = C.node.sizeTiers;
      if (!t) {
        // 没有分档表时的老行为（保底）
        var m = 1;
        if (node.degree >= 5) m *= 1.22; else if (node.degree >= 3) m *= 1.1;
        if (node.isHub) m *= 1.32;
        return m;
      }
      if (node.isHub) return t.hub;
      var d = node.degree || 0;
      for (var i = 0; i < t.byDegree.length; i++) {
        if (d >= t.byDegree[i][0]) return t.byDegree[i][1];
      }
      return 1;
    }

    function nodeRadius(node) {
      var r = C.node.baseRadius * Math.pow(view.cam.k, C.node.radiusPower);
      r = U.clamp(r, C.node.minRadius, C.node.maxRadius);
      r *= sizeMul(node);
      // 放大之后也要有上限，否则高缩放下中心天体会顶到邻居
      if (C.node.sizeClamp) r = Math.min(r, C.node.sizeClamp);
      return r;
    }

    function labelFont() {
      var fs = U.clamp(C.node.labelSize * Math.pow(view.cam.k, 0.5), 9.5, 21);
      return fs;
    }

    /* ------------------------------------------------------ 视口裁剪 */
    /*
      ⚠️ 「放大之后反而更卡」的根因就在这里：屏幕上只剩几十个点，每帧却仍为全部
         700 个点、1400 条线算几何、描边、量名字（实测 k=1.6 时屏幕上一个点都没有，
         一帧还要 6.3ms）。下面用裸乘加算屏幕坐标，不为判断分配对象。

      线做的是**保守**裁剪：只有所有端点都落在视口同一侧之外才丢 —— 多前提的推出线
      先汇聚到一点、定义引用线还会外凸（最多 90px），这样判才切不掉真正可见的线。
    */
    var PAD_NODE = 220;      // 点的余量：光晕（r*5.4）+ 名字宽度 + 选中环
    var PAD_EDGE = 140;      // 线的余量：贝塞尔外凸 90 + 箭头 17 + 线宽

    function nodeSX(n) { return n.x * view.cam.k + view.cam.tx; }
    function nodeSY(n) { return n.y * view.cam.k + view.cam.ty; }

    function inView(x, y, pad) {
      return x > -pad && x < W + pad && y > -pad && y < H + pad;
    }

    /** 屏幕外的点不画 */
    function nodeInView(n, pad) {
      return inView(nodeSX(n), nodeSY(n), pad == null ? PAD_NODE : pad);
    }

    /** 所有端点都在视口同一侧之外 → 这条线肯定看不见 */
    function edgeInView(e) {
      var ids = GU.edgeNodes(e);
      if (!ids.length) return false;
      var left = true, right = true, up = true, down = true;
      for (var i = 0; i < ids.length; i++) {
        var n = view.graph.byId[ids[i]];
        if (!n) continue;
        var x = nodeSX(n), y = nodeSY(n);
        if (x > -PAD_EDGE) left = false;
        if (x < W + PAD_EDGE) right = false;
        if (y > -PAD_EDGE) up = false;
        if (y < H + PAD_EDGE) down = false;
        if (!left && !right && !up && !down) return true;   // 有一个端点就在视口里
      }
      return !(left || right || up || down);
    }

    /* ------------------------------------------------------ 连线几何 */
    var geomCam = { k: -1, tx: 0, ty: 0, w: 0, h: 0 };
    var geomList = [];

    function buildGeometry() {
      var cam = view.cam;
      var geom = Object.create(null);
      var list = [];

      view.visible.forEach(function (e) {
        if (!edgeInView(e)) return;            // 屏幕外的线连几何都不建
        var g = computeEdge(e, cam);
        if (g) { geom[e.id] = g; list.push(g); }
      });
      geomCache = geom;
      geomList = list;
      geomCam = { k: cam.k, tx: cam.tx, ty: cam.ty, w: W, h: H };
      return list;
    }

    /** 相机与视口大小都没变 → 复用上一帧的几何（命中检测与重复绘制都走这里） */
    function ensureGeom() {
      var cam = view.cam;
      if (!geomCache || geomCam.k !== cam.k || geomCam.tx !== cam.tx || geomCam.ty !== cam.ty
        || geomCam.w !== W || geomCam.h !== H) {
        return buildGeometry();
      }
      return geomList;
    }

    function screenOf(n) { return view.cam.toScreen(n.x, n.y); }

    function trimTo(from, to, r) {
      var dx = to.x - from.x, dy = to.y - from.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: from.x + (dx / d) * r, y: from.y + (dy / d) * r, ux: dx / d, uy: dy / d, len: d };
    }

    function computeEdge(e, cam) {
      var byId = view.graph.byId;
      var quads = [], polys = [], arrow = null, glyph = null, ends = [];

      if (e.kind === 'definition') {
        var dn = byId[e.definition], un = byId[e.usedBy];
        if (!dn || !un) return null;
        var A = screenOf(dn), B = screenOf(un);
        var ra = nodeRadius(dn), rb = nodeRadius(un);
        var len = U.dist(A.x, A.y, B.x, B.y);
        if (len < 1) return null;
        var bend = (dn.id < un.id ? 1 : -1) * Math.min(len * C.edge.defCurvature, 90);
        var ctl = U.perpControl(A.x, A.y, B.x, B.y, bend);
        // 按控制点方向把端点缩到圆外
        var a2 = trimTo(A, ctl, ra + 1.5);
        var b2 = trimTo(B, ctl, rb + 1.5);
        var p0 = { x: a2.x, y: a2.y }, p2 = { x: b2.x, y: b2.y };
        quads.push({ p0: p0, p1: ctl, p2: p2 });
        polys.push(U.flattenQuad(p0, ctl, p2, 16));
        ends = [dn.id, un.id];
        return { edge: e, quads: quads, polys: polys, arrow: null, glyph: null, ends: ends };

      }

      if (e.kind === 'equivalence' || e.kind === 'analogy') {
        var na = byId[e.a], nb = byId[e.b];
        if (!na || !nb) return null;
        var Pa = screenOf(na), Pb = screenOf(nb);
        var r1 = nodeRadius(na), r2 = nodeRadius(nb);
        var q = trimTo(Pa, Pb, r1 + 1.5);
        var w = trimTo(Pb, Pa, r2 + 1.5);
        var seg = [{ x: q.x, y: q.y }, { x: w.x, y: w.y }];
        polys.push(seg);
        if (e.kind === 'equivalence') {
          glyph = { x: (q.x + w.x) / 2, y: (q.y + w.y) / 2, text: '⟺' };
        }
        ends = [e.a, e.b];
        return { edge: e, quads: [], polys: polys, arrow: null, glyph: glyph, ends: ends };
      }

      /* implication */
      var tg = byId[e.target];
      if (!tg) return null;
      var srcs = e.sources.map(function (id) { return byId[id]; }).filter(Boolean);
      if (!srcs.length) return null;
      var Pt = screenOf(tg), rt = nodeRadius(tg);
      var wc = { x: 0, y: 0 };

      if (srcs.length === 1) {
        var s0 = screenOf(srcs[0]);
        var rs0 = nodeRadius(srcs[0]);
        var dir = trimTo(Pt, s0, rt + 5);              // 从目标朝源方向退开
        var back = trimTo(s0, Pt, rs0 + 1.5);
        polys.push([{ x: back.x, y: back.y }, { x: dir.x, y: dir.y }]);
        arrow = { x: dir.x, y: dir.y, angle: Math.atan2(-dir.uy, -dir.ux) };
        ends = [srcs[0].id, tg.id];
      } else {
        // 多前提：先汇聚到一点，再射向结论
        srcs.forEach(function (s) { var p = screenOf(s); wc.x += p.x; wc.y += p.y; });
        wc.x /= srcs.length; wc.y /= srcs.length;
        var ddx = wc.x - Pt.x, ddy = wc.y - Pt.y;
        var dl = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
        var off = Math.min(C.edge.mergeOffset * cam.k, dl * 0.45);
        var J = { x: Pt.x + (ddx / dl) * off, y: Pt.y + (ddy / dl) * off };
        srcs.forEach(function (s) {
          var Ps = screenOf(s), rsp = nodeRadius(s);
          var st = trimTo(Ps, J, rsp + 1.5);
          var en = trimTo(J, Ps, 7);
          polys.push([{ x: st.x, y: st.y }, { x: en.x, y: en.y }]);
          ends.push(s.id);
        });
        var tip = trimTo(Pt, J, rt + 5);
        polys.push([{ x: J.x, y: J.y }, { x: tip.x, y: tip.y }]);
        arrow = { x: tip.x, y: tip.y, angle: Math.atan2(-tip.uy, -tip.ux) };
        ends.push(tg.id);
      }
      return { edge: e, quads: quads, polys: polys, arrow: arrow, glyph: null, ends: ends };
    }

    /* -------------------------------------------------------- 可见性权重 */
    /** 返回 0~1：聚焦模式下不相关的节点/边会被压暗 */
    function dimNode() { return C.focus.hideUnrelated ? 0 : C.focus.dimNodeAlpha; }
    function dimEdge() { return C.focus.hideUnrelated ? 0 : C.focus.dimEdgeAlpha; }

    /** 用户在左下角的「显示节点」面板里藏起来的点，一律不画 */
    function nodeOk(id) { return !view.isNodeVisible || view.isNodeVisible(id); }

    /** 这一组里还有几颗星看得见（全藏光的星系/星团连名字都不出） */
    function visibleIn(list) {
      var c = 0;
      for (var i = 0; i < list.length; i++) if (nodeOk(list[i].id)) c++;
      return c;
    }

    function regionHasVisible(rid) {
      var ns = view.graph.nodes;
      for (var i = 0; i < ns.length; i++) {
        if (ns[i].regions.indexOf(rid) >= 0 && nodeOk(ns[i].id)) return true;
      }
      return false;
    }

    function alphaForNode(id) {
      var f = view.focus;
      if (!f) return 1;
      if (f.type === 'node') return (id === f.id || isNeighbor(id, f.id)) ? 1 : dimNode();
      if (f.type === 'edge') {
        var e = edgeById(f.id);
        return (e && GU.edgeNodes(e).indexOf(id) >= 0) ? 1 : dimNode();
      }
      return 1;
    }

    function alphaForEdge(e) {
      var f = view.focus;
      if (!f) return 1;
      if (f.type === 'node') return GU.edgeNodes(e).indexOf(f.id) >= 0 ? 1 : dimEdge();
      if (f.type === 'edge') return e.id === f.id ? 1 : dimEdge();
      return 1;
    }

    function isNeighbor(id, of) {
      var adj = view.graph.adj[of];
      return !!adj && adj.indexOf(id) >= 0;
    }

    /** 这条边的两端是不是都在主干上（= 学习主线的骨架）。结果缓存在边上。 */
    function isSpine(e) {
      if (e._spine == null) {
        var ok = !GU.isWeak(e) && GU.edgeNodes(e).length > 0;
        if (ok) {
          GU.edgeNodes(e).forEach(function (id) {
            var n = view.graph.byId[id];
            if (!n || !n.trunk) ok = false;
          });
        }
        e._spine = ok;
      }
      return e._spine;
    }

    function edgeById(id) {
      for (var i = 0; i < view.visible.length; i++) if (view.visible[i].id === id) return view.visible[i];
      return null;
    }

    /* ============================================================ 绘制 */
    /* 本帧已被「星系名 / 装置名」占掉的矩形 —— 节点名不许压上去 */
    var nameBoxes = [];

    /* 绘制分辨率倍率（诊断/低分辨率模式用）：1 = 正常。降到 0.5 时，
       光栅化的像素量掉到 1/4 —— 用来验证「重光栅化量」是不是掉帧的根因。 */
    var drawScale = 1;

    function draw() {
      /* ⚠️ 先按**设备像素**整张清掉：drawScale < 1 时若用缩放后的 transform 去
         clearRect(0,0,W,H)，只清得掉左上角一块，其余会留上一帧的残影。 */
      var sc = dpr * drawScale;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.setTransform(sc, 0, 0, sc, 0, 0);

      var geoms = ensureGeom();
      var cam = view.cam;
      computeLod();
      nameBoxes.length = 0;

      /* ---------- 0. 星团包络（每个「装置」一圈边界，垫在最底下） ---------- */
      drawEnvelopes();

      /* ---------- 0b. 星团级粗线（缩小时才出现，整块对整块） ---------- */
      drawClusterLinks();

      /* ---------- 1. 节点级连线 ---------- */
      var defs = [], eqs = [], imps = [], anas = [];
      geoms.forEach(function (g) {
        if (g.edge.kind === 'definition') defs.push(g);
        else if (g.edge.kind === 'equivalence') eqs.push(g);
        else if (g.edge.kind === 'analogy') anas.push(g);
        else imps.push(g);
      });

      drawEdges(anas);          // 弱边垫在最底下（平时几乎看不见）
      drawEdges(defs);
      drawEdges(eqs);
      drawEdges(imps);
      geoms.forEach(function (g) { if (g.arrow) drawArrow(g); });

      /* ---------- 2. 节点 ---------- */
      if (lodA.nodeDot > 0.02) {
        view.graph.nodes.forEach(function (n) { drawNode(n); });
      }
      /* ---------- 3. 名称（星系名 → 星团名 → 节点名，逐层交接） ---------- */
      if (lodA.galaxyName > 0.02) drawGalaxyNames();
      if (lodA.clusterName > 0.02) drawClusterNames();
      if (C.showLabels) drawLabels();
    }

    /* ------------------------------------------------ 星系名 */
    function drawGalaxyNames() {
      var a = lodA.galaxyName;
      var fs = U.clamp(15 * Math.pow(view.cam.k, 0.30), 13, 34);
      ctx.save();
      ctx.font = '700 ' + fs.toFixed(1) + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      (view.graph.regions || []).forEach(function (r) {
        if (!r.stat || !r.name) return;
        // 整个星系的点都被藏起来了 → 只剩云雾，名字也不必出
        if (view.isNodeVisible && !regionHasVisible(r.id)) return;
        var p = view.cam.toScreen(r.stat.cx, r.stat.cy);
        if (p.x < -300 || p.x > W + 300 || p.y < -200 || p.y > H + 200) return;
        var text = r.name;
        var tw = ctx.measureText(text).width;
        var ls = fs * 0.18;
        var bw = tw + ls * (text.length - 1) + 26, bh = fs + 14;
        // 星系名之间也尽量不叠（它们最先占位，所以通常就在原位）
        var slot = placeName(p.x, p.y, bw, bh);
        var cy = slot ? slot.y : p.y;
        ctx.globalAlpha = a;
        ctx.fillStyle = 'rgba(255,255,255,0.86)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(p.x - bw / 2, cy - bh / 2, bw, bh, bh / 2);
        else ctx.rect(p.x - bw / 2, cy - bh / 2, bw, bh);
        ctx.fill();
        ctx.strokeStyle = U.rgba(r.color, 0.55);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // 手动加字距
        var chars = text.split('');
        var total = tw + ls * (chars.length - 1);
        var cx = p.x - total / 2;
        ctx.fillStyle = 'rgba(26,28,34,0.92)';
        ctx.textAlign = 'left';
        chars.forEach(function (ch) {
          ctx.fillText(ch, cx, cy + 0.5);
          cx += ctx.measureText(ch).width + ls;
        });
        ctx.textAlign = 'center';
        ctx.globalAlpha = 1;
        nameBoxes.push({ x0: p.x - bw / 2, y0: cy - bh / 2, x1: p.x + bw / 2, y1: cy + bh / 2 });
      });
      ctx.restore();
    }

    /* ------------------------------------------------ 星团级连线 */
    function drawClusterLinks() {
      var a = lodA.clusterLink;
      if (a <= 0.02) return;
      var links = view.graph.clusterLinks || [];
      if (!links.length) return;
      var cfgL = C.clusterLink;
      var maxCount = 1;
      links.forEach(function (l) { if (l.count > maxCount) maxCount = l.count; });

      ctx.save();
      ctx.lineCap = 'round';
      links.forEach(function (l) {
        if (l.count < cfgL.minEdges) return;
        var A = view.graph.clusterById[l.a], B = view.graph.clusterById[l.b];
        if (!A || !B || !A.stat || !B.stat) return;
        if (view.isNodeVisible && (!visibleIn(A.nodes) || !visibleIn(B.nodes))) return;
        var p0 = view.cam.toScreen(A.stat.cx, A.stat.cy);
        var p1 = view.cam.toScreen(B.stat.cx, B.stat.cy);
        var len = U.dist(p0.x, p0.y, p1.x, p1.y);
        if (len < 2) return;
        var t = Math.min(1, l.count / Math.max(2, maxCount));
        var w = U.lerp(cfgL.widthMin, cfgL.widthMax, Math.sqrt(t)) * Math.min(1.4, Math.max(0.6, view.cam.k));
        var bend = (l.a < l.b ? 1 : -1) * len * cfgL.curve;
        var ctl = U.perpControl(p0.x, p0.y, p1.x, p1.y, bend);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(ctl.x, ctl.y, p1.x, p1.y);
        ctx.lineWidth = w;
        ctx.strokeStyle = 'rgba(' + cfgL.color + ',' + (cfgL.alpha * a).toFixed(3) + ')';
        ctx.stroke();
      });
      ctx.restore();
    }

    /* ------------------------------------------------ 星团包络 */
    /**
     * 给一堆点画一圈闭合的平滑边界：绕一圈取 samples 个方向，
     * 每个方向取「落在该方向 ±半个扇区内的点」里最远的那个，再外扩 pad；
     * 半径序列平滑两遍消尖角，最后用二次贝塞尔穿过相邻采样点的中点。
     * （不做凸包 —— 凸包会把 L 形的团撑肥，贴不住形状。）
     */
    function envelopePoints(list, pad, samples, smooth) {
      var cx = 0, cy = 0;
      list.forEach(function (n) { cx += n.x; cy += n.y; });
      cx /= list.length; cy /= list.length;

      var half = Math.PI / samples;
      var r = [];
      for (var i = 0; i < samples; i++) {
        var th = i * 2 * Math.PI / samples;
        var cos = Math.cos(th), sin = Math.sin(th);
        var best = 0;
        list.forEach(function (n) {
          var dx = n.x - cx, dy = n.y - cy;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1e-6) return;
          // 点与这个方向的夹角：用 |cos| 判，超过半个扇区就不算
          if ((dx * cos + dy * sin) / dist < Math.cos(half)) return;
          if (dist > best) best = dist;
        });
        if (best === 0) {                       // 这个方向没点 → 退回支撑函数
          list.forEach(function (n) {
            var v = (n.x - cx) * cos + (n.y - cy) * sin;
            if (v > best) best = v;
          });
        }
        r.push(best + pad);
      }
      for (var s = 0; s < (smooth || 0); s++) {  // 平滑
        var out = [];
        for (var j = 0; j < samples; j++) {
          out.push((r[(j - 1 + samples) % samples] + r[j] * 2 + r[(j + 1) % samples]) / 4);
        }
        r = out;
      }
      return { cx: cx, cy: cy, r: r, samples: samples };
    }

    /** 把包络采样点画成一条闭合的平滑曲线 */
    function traceEnvelope(env, cam) {
      var N = env.samples;
      var pt = function (i) {
        var th = (i % N) * 2 * Math.PI / N;
        var rr = env.r[((i % N) + N) % N];
        return cam.toScreen(env.cx + Math.cos(th) * rr, env.cy + Math.sin(th) * rr);
      };
      ctx.beginPath();
      var p0 = pt(0), pN = pt(N - 1);
      ctx.moveTo((pN.x + p0.x) / 2, (pN.y + p0.y) / 2);
      for (var i = 0; i < N; i++) {
        var cur = pt(i), nxt = pt(i + 1);
        ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + nxt.x) / 2, (cur.y + nxt.y) / 2);
      }
      ctx.closePath();
    }

    function drawEnvelopes() {
      var a = lodA.envelope;
      if (a <= 0.02) return;
      var cfgE = C.envelope;
      ctx.save();
      ctx.lineJoin = 'round';
      (view.graph.clusters || []).forEach(function (c) {
        if (!c.nodes || !c.nodes.length) return;
        var list = c.nodes.filter(function (n) { return nodeOk(n.id); });
        if (list.length < 2) return;              // 一个点画不出包络
        var env = envelopePoints(list, cfgE.pad, cfgE.samples, cfgE.smooth);
        var gal = view.graph.galaxyOf ? view.graph.galaxyOf(c) : null;
        var rgb = U.hexToRgb(c.color || (gal ? gal.color : '#7A8699'));

        traceEnvelope(env, view.cam);
        ctx.fillStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (cfgE.fillAlpha * a).toFixed(3) + ')';
        ctx.fill();
        ctx.lineWidth = cfgE.width;
        ctx.strokeStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (cfgE.strokeAlpha * a).toFixed(3) + ')';
        ctx.stroke();
      });
      ctx.restore();
    }

    /* ------------------------------------------------ 星团名 */
    /** 给一个名字找位置：先试原位，再试上下几个偏移；都不行就返回 null。
        依据是 nameBoxes（星系名 → 装置名 → 节点名，按这个优先级依次占位）。 */
    function placeName(cx, cy, bw, bh) {
      var step = bh + 6;
      var gaps = [0, -step, step, -2 * step, 2 * step];
      for (var gi = 0; gi < gaps.length; gi++) {
        var y = cy + gaps[gi];
        var box = { x0: cx - bw / 2, y0: y - bh / 2, x1: cx + bw / 2, y1: y + bh / 2 };
        var hit = false;
        for (var i = 0; i < nameBoxes.length; i++) {
          var b = nameBoxes[i];
          if (box.x0 < b.x1 && box.x1 > b.x0 && box.y0 < b.y1 && box.y1 > b.y0) { hit = true; break; }
        }
        if (!hit) return { y: y, box: box };
      }
      return null;
    }

    function drawClusterNames() {
      var a = lodA.clusterName;
      var fs = U.clamp(C.cluster.labelSize * Math.pow(view.cam.k, 0.42), 11, 26);
      ctx.save();
      ctx.font = '700 ' + fs.toFixed(1) + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      (view.graph.clusters || []).forEach(function (c) {
        if (!c.stat || !c.name) return;
        if (view.isNodeVisible && !visibleIn(c.nodes)) return;   // 整团都藏起来了
        var p = view.cam.toScreen(c.stat.cx, c.stat.cy);
        if (p.x < -300 || p.x > W + 300 || p.y < -200 || p.y > H + 200) return;
        var text = c.name;
        var tw = ctx.measureText(text).width;
        var pad = C.cluster.namePad;
        var bw = tw + pad * 2, bh = fs + 9;
        // ⚠️ 装置名之间也要互相避让：两个团挨得近时（比如「代数结构」与
        //    「向量空间的基」）名字会直接叠在一起，读不清。放不下就不画 ——
        //    包络还在，放大一点名字自然回来。
        var slot = placeName(p.x, p.y, bw, bh);
        if (!slot) return;
        var y = slot.y;
        ctx.globalAlpha = a;
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(p.x - bw / 2, y - bh / 2, bw, bh, bh / 2);
        else ctx.rect(p.x - bw / 2, y - bh / 2, bw, bh);
        ctx.fill();
        var g = view.graph.galaxyOf(c);
        if (g) { ctx.strokeStyle = U.rgba(g.color, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); }
        // 深色字，保证在云上读得清
        ctx.fillStyle = 'rgba(30,32,40,0.90)';
        ctx.fillText(text, p.x, y + 0.5);
        ctx.globalAlpha = 1;
        nameBoxes.push(slot.box);
      });
      ctx.restore();
    }

    function drawEdges(list) {
      list.forEach(function (g) {
        var e = g.edge;
        var style = T.edgeStyles[e.kind];
        var spine = isSpine(e);
        // 主干骨架：它有自己的淡入曲线，缩小时也能看见；放大后让位给全部连线
        var a = alphaForEdge(e) * Math.max(lodA.nodeEdge, spine ? lodA.trunkEdge : 0);
        if (a <= 0.02) return;

        var active = isEdgeActive(g);
        var w = (e.kind === 'implication' ? C.edge.implicationWidth
          : e.kind === 'equivalence' ? C.edge.equivalenceWidth
            : e.kind === 'analogy' ? T.edgeStyles.analogy.width
              : C.edge.definitionWidth) * (active ? 1.85 : 1);

        // 全图尺度：主干画成一条低调的暖色细线，不抢云雾和装置名
        var spineOnly = spine && lodA.nodeEdge < 0.9;
        if (spineOnly) { a *= 0.55 + 0.45 * lodA.nodeEdge; w = 1.25; }

        if (e.kind === 'definition' && !C.showDefinitionLines) return;

        // 弱边：不开探索模式时压得很淡，开了才提亮
        var isWeak = GU.isWeak(e);
        if (isWeak) {
          var base = C.exploreMode ? C.analogy.exploreAlpha : C.analogy.dimAlpha;
          a = a * (base / (style.alpha || 1));
          if (a <= 0.02) return;
          w *= active ? 1.6 : 1;
        }

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = w;
        if (isWeak) ctx.setLineDash(C.analogy.dash);

        if (spineOnly) {
          ctx.strokeStyle = U.rgba(T.spineColor || 'B4661A', a);
        } else if (e.kind === 'definition' || e.kind === 'analogy') {
          var alpha = (style.alpha != null ? style.alpha : 1) * a;
          ctx.strokeStyle = 'rgba(' + style.color + ',' + alpha.toFixed(3) + ')';
        } else {
          ctx.strokeStyle = U.rgba(style.color, a);
        }

        ctx.beginPath();
        g.polys.forEach(function (pts, i) {
          if (g.quads[i]) {
            var q = g.quads[i];
            ctx.moveTo(q.p0.x, q.p0.y);
            ctx.quadraticCurveTo(q.p1.x, q.p1.y, q.p2.x, q.p2.y);
          } else {
            ctx.moveTo(pts[0].x, pts[0].y);
            for (var k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
          }
        });
        ctx.stroke();

        // 等价线中点画一个 ⟺（用白色描边做底，而不是白方块，免得在云上留个补丁）
        if (g.glyph && cam_eqVisible()) {
          ctx.font = '600 ' + Math.round(U.clamp(13 * Math.pow(view.cam.k, 0.4), 11, 18)) + 'px ' + T.font;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = 'rgba(255,255,255,' + (0.95 * a).toFixed(3) + ')';
          ctx.strokeText(g.glyph.text, g.glyph.x, g.glyph.y + 0.5);
          ctx.fillStyle = U.rgba(T.edgeStyles.equivalence.color, 0.92 * a);
          ctx.fillText(g.glyph.text, g.glyph.x, g.glyph.y + 0.5);
        }
        ctx.restore();
      });
    }

    function cam_eqVisible() { return view.cam.k >= C.edge.equivalenceGlyph; }

    function isEdgeActive(g) {
      var e = g.edge;
      if (view.hover && view.hover.type === 'edge' && view.hover.id === e.id) return true;
      if (view.focus && view.focus.type === 'edge' && view.focus.id === e.id) return true;
      if (view.focus && view.focus.type === 'node' && GU.edgeNodes(e).indexOf(view.focus.id) >= 0) return true;
      if (view.hover && view.hover.type === 'node' && GU.edgeNodes(e).indexOf(view.hover.id) >= 0) return true;
      return false;
    }

    function drawArrow(g) {
      var e = g.edge;
      var a = alphaForEdge(e) * lodA.nodeEdge;
      if (a <= 0.02) return;
      var sz = U.clamp(C.edge.arrowSize * Math.pow(view.cam.k, 0.35), 6, 17) * (isEdgeActive(g) ? 1.2 : 1);
      var x = g.arrow.x, y = g.arrow.y, ang = g.arrow.angle;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-sz, sz * 0.42);
      ctx.lineTo(-sz * 0.72, 0);
      ctx.lineTo(-sz, -sz * 0.42);
      ctx.closePath();
      ctx.fillStyle = U.rgba(T.edgeStyles.implication.color, a);
      ctx.fill();
      ctx.restore();
    }

    /* ---------------------------------------------------------- 节点 */
    function drawNode(n) {
      if (!nodeOk(n.id)) return;                 // 被藏起来的点：不画（连线也已一并去掉）
      if (!nodeInView(n)) return;                // 屏幕外的点：光晕、圆点、外环全省掉
      var p = screenOf(n);
      var r = nodeRadius(n);
      var a = alphaForNode(n.id) * lodA.nodeDot * (isTrunk(n) ? 1 : lodA.trunkDim);
      if (a <= 0.02) return;

      var st = MG.typeStyle(n.type);
      var isFocus = view.focus && view.focus.type === 'node' && view.focus.id === n.id;
      var isHover = (view.hover && view.hover.type === 'node' && view.hover.id === n.id) ||
        (view.hover && view.hover.type === 'edge' && edgeById(view.hover.id) &&
          GU.edgeNodes(edgeById(view.hover.id)).indexOf(n.id) >= 0);

      // 光晕
      if (C.node.glow) {
        var gs = glowSprite(st.color);
        var gsz = r * 5.4;
        ctx.globalAlpha = a * (isFocus || isHover ? 1 : 0.72);
        ctx.drawImage(gs, p.x - gsz / 2, p.y - gsz / 2, gsz, gsz);
        ctx.globalAlpha = 1;
      }

      // 实心点 + 白圈
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = U.rgba(st.color, a);
      ctx.fill();
      ctx.lineWidth = Math.max(1.2, C.node.ringWidth * Math.min(1, view.cam.k + 0.35));
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.95 * a).toFixed(3) + ')';
      ctx.stroke();

      // 选中 / 悬停的外环
      if (isFocus || isHover) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 5.5, 0, Math.PI * 2);
        ctx.lineWidth = isFocus ? 2 : 1.4;
        ctx.strokeStyle = U.rgba(st.color, (isFocus ? 0.95 : 0.55) * a);
        ctx.stroke();
      } else if (n.isHub) {
        // 星团的中心天体：外面套一道细环，全图尺度上也认得出「这个装置的核心」
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3.0, 0, Math.PI * 2);
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = U.rgba(st.color, 0.6 * a);
        ctx.stroke();
      }
    }

    /* ---------------------------------------------------------- 名称 */
    function isTrunk(n) { return !!(n && n.trunk); }

    function drawLabels() {
      var k = view.cam.k;
      var fs = labelFont();
      // 连主干的名字都还没到出现的时候 → 只画聚焦/悬停的那一个
      if (lodA.nodeName <= 0.02 && lodA.trunkName <= 0.02) { drawKeyLabels(fs); return; }

      // 缩得很小时只留「重要」节点的名字；重叠的名字一律让位（永远去重叠）
      var keepAll = k >= C.node.labelMinZoomAll;
      // 星系名 / 装置名先占位（它们在上面已经画过了）—— 节点名不许压上去
      var placed = nameBoxes.slice();
      var nodes = view.graph.nodes.slice().sort(function (a, b) {
        return labelPriority(b) - labelPriority(a);
      });

      ctx.font = '600 ' + fs + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      nodes.forEach(function (n) {
        if (!nodeOk(n.id)) return;
        var trunk = isTrunk(n);
        // 主干的名字用更早出现的那条曲线；其余仍按原节奏
        var nameAlpha = trunk ? Math.max(lodA.nodeName, lodA.trunkName) : lodA.nodeName;
        if (nameAlpha <= 0.06) return;
        var a = alphaForNode(n.id);
        var isSpecial = (view.focus && view.focus.id === n.id) ||
          (view.hover && view.hover.type === 'node' && view.hover.id === n.id);
        if (a <= 0.06) return;
        // 缩小时只画重要的：主干一律画，其余要 degree >= 3
        if (!keepAll && !isSpecial && !trunk && n.degree < 3) return;

        var p = screenOf(n);
        if (!inView(p.x, p.y, PAD_NODE)) return;   // 屏幕外的名字：既不量宽也不画
        var r = nodeRadius(n);
        var text = n.label;
        var tw = measure(ctx, text, ctx.font);
        var x = p.x, y = p.y + r + C.node.labelOffset * Math.max(k, 0.62);
        var box = { x0: x - tw / 2 - C.node.labelPad, y0: y - 1, x1: x + tw / 2 + C.node.labelPad, y1: y + fs + 2 };

        if (!isSpecial) {
          var hit = false;
          for (var i = 0; i < placed.length; i++) {
            var b = placed[i];
            if (box.x0 < b.x1 && box.x1 > b.x0 && box.y0 < b.y1 && box.y1 > b.y0) { hit = true; break; }
          }
          if (hit) return;
        }
        placed.push(box);

        var alpha = a * (isSpecial ? 1 : 0.92 * nameAlpha);
        ctx.lineWidth = Math.max(2.5, fs * 0.28);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.9 * alpha).toFixed(3) + ')';
        ctx.strokeText(text, x, y);
        ctx.fillStyle = isSpecial ? U.rgba(MG.typeStyle(n.type).color, alpha) : 'rgba(28,28,30,' + alpha.toFixed(3) + ')';
        ctx.fillText(text, x, y);
      });
    }

    /** 缩得太小时只画关键节点的名字 */
    function drawKeyLabels(fs) {
      var special = [];
      if (view.focus && view.focus.type === 'node') special.push(view.focus.id);
      if (view.hover && view.hover.type === 'node') special.push(view.hover.id);
      if (!special.length) return;
      ctx.font = '600 ' + Math.max(fs, 12) + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      special.forEach(function (id) {
        var n = view.graph.byId[id];
        if (!n || !nodeOk(id)) return;
        var p = screenOf(n), r = nodeRadius(n);
        var y = p.y + r + 10;
        ctx.lineWidth = 3;
        ctx.strokeStyle = T.labelHalo;
        ctx.strokeText(n.label, p.x, y);
        ctx.fillStyle = T.ink;
        ctx.fillText(n.label, p.x, y);
      });
    }

    function labelPriority(n) {
      var s = n.degree * 10;
      if (n.trunk) s += 400;                       // 主干的名字优先留下（去重叠时赢）
      if (view.focus && view.focus.id === n.id) s += 1000;
      if (view.hover && view.hover.id === n.id) s += 800;
      if (n.type === 'definition') s -= 6;
      return s;
    }

    /* ========================================================== 命中检测 */
    function hitTest(sx, sy) {
      ensureGeom();
      // 先节点
      var best = null, bestD = Infinity;
      view.graph.nodes.forEach(function (n) {
        if (!nodeOk(n.id)) return;
        var a = alphaForNode(n.id);
        if (a <= 0.06) return;
        var p = screenOf(n);
        var r = nodeRadius(n) + 9;      // 给触摸留点余量
        var d = U.dist(sx, sy, p.x, p.y);
        if (d <= r && d < bestD) { bestD = d; best = { type: 'node', id: n.id }; }
      });
      if (best) return best;

      // 再连线
      var tol = C.edge.hitTolerance;
      var list = geomCache ? Object.keys(geomCache).map(function (k) { return geomCache[k]; }) : [];
      var hitEdge = null, hitD = Infinity;
      list.forEach(function (g) {
        if (g.edge.kind === 'definition' && !C.showDefinitionLines) return;
        // 弱边没开探索模式时不响应点击（它本来就几乎看不见）
        if (GU.isWeak(g.edge) && !C.exploreMode) return;
        var a = alphaForEdge(g.edge);
        if (a <= 0.06) return;
        g.polys.forEach(function (pts) {
          var d = U.pointPolylineDist(sx, sy, pts);
          if (d < tol && d < hitD) { hitD = d; hitEdge = g.edge.id; }
        });
        if (g.arrow) {
          var d2 = U.dist(sx, sy, g.arrow.x, g.arrow.y);
          if (d2 < tol + 6 && d2 < hitD) { hitD = d2; hitEdge = g.edge.id; }
        }
      });
      return hitEdge ? { type: 'edge', id: hitEdge } : null;
    }

    function invalidate() { geomCache = null; }

    return {
      resize: resize,
      draw: draw,
      hitTest: hitTest,
      invalidate: invalidate,
      setDrawScale: function (s) {
        drawScale = U.clamp(s || 1, 0.2, 1);
        resize();          // 后备尺寸跟着变（CSS 尺寸不变，浏览器负责拉伸回来）
      },
      nodeRadius: nodeRadius,
      screenOf: screenOf,
      get size() { return { w: W, h: H }; }
    };
  }

  MG.createRenderer = createRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
