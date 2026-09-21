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

  /* ======================================================================= */
  function createRenderer(canvas, view) {
    var ctx = canvas.getContext('2d');
    var dpr = 1;
    var W = 0, H = 0;
    var geomCache = null;      // 本帧的连线几何
    var nodeCache = Object.create(null);

    /* ------------------------------------------------------------ 尺寸 */
    function resize() {
      dpr = Math.min(global.devicePixelRatio || 1, 2.5);
      var rect = canvas.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width || global.innerWidth));
      var h = Math.max(1, Math.round(rect.height || global.innerHeight));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      W = w; H = h;
      view.cam.setViewport(W, H);
      invalidate();
      return { w: W, h: H, dpr: dpr };
    }

    /* -------------------------------------------------------- 尺寸计算 */
    function nodeRadius(node) {
      var r = C.node.baseRadius * Math.pow(view.cam.k, C.node.radiusPower);
      r = U.clamp(r, C.node.minRadius, C.node.maxRadius);
      if (node && node.degree >= 5) r *= 1.22;      // 枢纽节点稍大一点
      else if (node && node.degree >= 3) r *= 1.1;
      return r;
    }

    function labelFont() {
      var fs = U.clamp(C.node.labelSize * Math.pow(view.cam.k, 0.5), 9.5, 21);
      return fs;
    }

    /* ------------------------------------------------------ 连线几何 */
    var geomCam = { k: -1, tx: 0, ty: 0 };

    function buildGeometry() {
      var cam = view.cam;
      var geom = Object.create(null);
      var list = [];

      view.visible.forEach(function (e) {
        var g = computeEdge(e, cam);
        if (g) { geom[e.id] = g; list.push(g); }
      });
      geomCache = geom;
      geomCam = { k: cam.k, tx: cam.tx, ty: cam.ty };
      return list;
    }

    /** 保证命中检测用的是当前相机下的几何 */
    function ensureGeom() {
      var cam = view.cam;
      if (!geomCache || geomCam.k !== cam.k || geomCam.tx !== cam.tx || geomCam.ty !== cam.ty) {
        buildGeometry();
      }
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

      if (e.kind === 'equivalence') {
        var na = byId[e.a], nb = byId[e.b];
        if (!na || !nb) return null;
        var Pa = screenOf(na), Pb = screenOf(nb);
        var r1 = nodeRadius(na), r2 = nodeRadius(nb);
        var q = trimTo(Pa, Pb, r1 + 1.5);
        var w = trimTo(Pb, Pa, r2 + 1.5);
        var seg = [{ x: q.x, y: q.y }, { x: w.x, y: w.y }];
        polys.push(seg);
        glyph = { x: (q.x + w.x) / 2, y: (q.y + w.y) / 2, text: '⟺' };
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

    function edgeById(id) {
      for (var i = 0; i < view.visible.length; i++) if (view.visible[i].id === id) return view.visible[i];
      return null;
    }

    /* ============================================================ 绘制 */
    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      var geoms = buildGeometry();
      var cam = view.cam;

      /* ---------- 1. 连线 ---------- */
      var defs = [], eqs = [], imps = [];
      geoms.forEach(function (g) {
        if (g.edge.kind === 'definition') defs.push(g);
        else if (g.edge.kind === 'equivalence') eqs.push(g);
        else imps.push(g);
      });

      drawEdges(defs);
      drawEdges(eqs);
      drawEdges(imps);
      geoms.forEach(function (g) { if (g.arrow) drawArrow(g); });

      /* ---------- 2. 节点 ---------- */
      view.graph.nodes.forEach(function (n) { drawNode(n); });

      /* ---------- 3. 名称 ---------- */
      if (C.showLabels) drawLabels();

      /* ---------- 4. 节点序号取消（占位） ---------- */
    }

    function drawEdges(list) {
      list.forEach(function (g) {
        var e = g.edge;
        var style = T.edgeStyles[e.kind];
        var a = alphaForEdge(e);
        if (a <= 0.02) return;

        var active = isEdgeActive(g);
        var w = (e.kind === 'implication' ? C.edge.implicationWidth
          : e.kind === 'equivalence' ? C.edge.equivalenceWidth
            : C.edge.definitionWidth) * (active ? 1.85 : 1);

        if (e.kind === 'definition' && !C.showDefinitionLines) return;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = w;

        if (e.kind === 'definition') {
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
      var a = alphaForEdge(e);
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
      var p = screenOf(n);
      var r = nodeRadius(n);
      var a = alphaForNode(n.id);
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
      }
    }

    /* ---------------------------------------------------------- 名称 */
    function drawLabels() {
      var k = view.cam.k;
      var fs = labelFont();
      if (k < C.node.labelMinZoom) { drawKeyLabels(fs); return; }

      // 缩得很小时只留「重要」节点的名字；重叠的名字一律让位（永远去重叠）
      var keepAll = k >= C.node.labelMinZoomAll;
      var placed = [];
      var nodes = view.graph.nodes.slice().sort(function (a, b) {
        return labelPriority(b) - labelPriority(a);
      });

      ctx.font = '600 ' + fs + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      nodes.forEach(function (n) {
        var a = alphaForNode(n.id);
        var isSpecial = (view.focus && view.focus.id === n.id) ||
          (view.hover && view.hover.type === 'node' && view.hover.id === n.id);
        if (a <= 0.06) return;
        if (!keepAll && !isSpecial && n.degree < 3) return;

        var p = screenOf(n);
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

        var alpha = a * (isSpecial ? 1 : 0.92);
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
        if (!n) return;
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
      nodeRadius: nodeRadius,
      screenOf: screenOf,
      get size() { return { w: W, h: H }; }
    };
  }

  MG.createRenderer = createRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
