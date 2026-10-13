/* ==========================================================================
   数学星图 · 导出（当前视图 → 子图 JSON / SVG / TikZ）
   --------------------------------------------------------------------------
   导出的是**你现在看到的这一块**：屏幕内（含一点点余量）的点，加上**这些点之间的线**。

   ⚠️ 不导出「两端都在屏幕外、只是横穿而过」的长线：导出的图要能自成一体，
      否则就是一堆悬空的线头（屏幕上那种横穿线是渲染的观感，不是可引用的内容）。
   ⚠️ 线的几何在导出里画成**直线**（屏幕上那点弧度是观感），箭头照画。
   ⚠️ 标签一律用 `label`（纯文本、可含中文）；`title` 里有 LaTeX —— SVG 里不画，
      TikZ 里按节点写成注释，方便直接粘进论文。
   ⚠️ 引擎不认识内容：这里只读 view / graph / theme，一个字的内容都不写死。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  var PAD = 40;                                  // 视口四周的余量（屏幕像素）

  function screenX(cam, n) { return n.x * cam.k + cam.tx; }
  function screenY(cam, n) { return n.y * cam.k + cam.ty; }

  function xml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** LaTeX 里要转义的字符（中文交给 ctex，不用管） */
  function tex(s) {
    return String(s == null ? '' : s).replace(/([\\%&#_$^{}~])/g, function (m) {
      if (m === '\\') return '\\textbackslash{}';
      if (m === '~') return '\\textasciitilde{}';
      if (m === '^') return '\\textasciicircum{}';
      return '\\' + m;
    });
  }

  function stamp() { return new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-'); }

  /**
   * 收集「当前视图」：屏幕内的点 + 这些点之间的线。
   * @param view 星图的 view 对象（graph / visible / isNodeVisible / cam）
   */
  function collect(view, cam) {
    var W = cam.viewW, H = cam.viewH;
    var nodes = [], seen = Object.create(null);
    (view.graph.nodes || []).forEach(function (n) {
      if (view.isNodeVisible && !view.isNodeVisible(n.id)) return;
      var x = screenX(cam, n), y = screenY(cam, n);
      if (x < -PAD || x > W + PAD || y < -PAD || y > H + PAD) return;
      nodes.push(n);
      seen[n.id] = true;
    });
    var edges = (view.visible || []).filter(function (e) {
      var ids = MG.graphUtil.edgeNodes(e);
      if (!ids.length) return false;
      for (var i = 0; i < ids.length; i++) if (!seen[ids[i]]) return false;
      return true;
    });
    return { nodes: nodes, edges: edges };
  }

  /* ------------------------------------------------------------ 子图 JSON */
  function toJSON(view, cam, version) {
    var c = collect(view, cam);
    var center = { x: (cam.viewW / 2 - cam.tx) / cam.k, y: (cam.viewH / 2 - cam.ty) / cam.k };
    var nodes = c.nodes.map(function (n) {
      return {
        id: n.id, type: n.type, label: n.label, title: n.title || '',
        cluster: n.cluster, layer: n.layer, regions: n.regions,
        x: Math.round(n.x * 10) / 10, y: Math.round(n.y * 10) / 10,
        /* 外部锚点（src/data/xref.js）：导出的子图也能被外部工具对上去 */
        xref: (MG.xref && MG.xref[n.id]) || undefined
      };
    });
    var edges = c.edges.map(function (e) {
      var o = { id: e.id, kind: e.kind };
      if (e.kind === 'implication') {
        o.from = (e.sources || []).slice(); o.to = e.target;
        if (e.proof) o.proof = e.proof;
      } else if (e.kind === 'definition') {
        o.definition = e.definition; o.usedBy = e.usedBy;
        if (e.note) o.note = e.note;
      } else {
        o.a = e.a; o.b = e.b;
        if (e.title) o.title = e.title;
        if (e.proofs) o.proofs = e.proofs;
        if (e.note) o.note = e.note;
      }
      return o;
    });
    return JSON.stringify({
      schema: 'mathgalaxy/subgraph/v1',
      version: version || '',
      generated: new Date().toISOString(),
      source: (global.location && global.location.href) || '',
      camera: { k: cam.k, cx: Math.round(center.x * 10) / 10, cy: Math.round(center.y * 10) / 10 },
      counts: { nodes: nodes.length, edges: edges.length },
      edgeKind: {
        implication: 'sources → target，带证明',
        equivalence: 'a ⟺ b，proofs 是两个方向',
        definition: 'usedBy 的陈述里出现了 definition 这个定义',
        analogy: '弱边：思想相通，不是蕴含'
      },
      nodes: nodes,
      edges: edges
    }, null, 1) + '\n';
  }

  /* ----------------------------------------------------------------- SVG */
  function toSVG(view, cam, version, nodeRadius) {
    var c = collect(view, cam);
    if (!c.nodes.length) return null;
    var T = MG.theme;
    var xs = [], ys = [];
    c.nodes.forEach(function (n) { xs.push(screenX(cam, n)); ys.push(screenY(cam, n)); });
    var pad = 70;
    var x0 = Math.min.apply(null, xs) - pad, x1 = Math.max.apply(null, xs) + pad;
    var y0 = Math.min.apply(null, ys) - pad, y1 = Math.max.apply(null, ys) + pad;
    var W = Math.round(x1 - x0), H = Math.round(y1 - y0);
    var byId = Object.create(null);
    c.nodes.forEach(function (n) { byId[n.id] = n; });
    var sx = function (n) { return (screenX(cam, n) - x0).toFixed(1); };
    var sy = function (n) { return (screenY(cam, n) - y0).toFixed(1); };

    var out = [];
    var defs = ['<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" ' +
      'markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#1C1C1E"/></marker>'];
    var bubbles = [];
    out.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H +
      '" viewBox="0 0 ' + W + ' ' + H + '" font-family="' + xml(T.font) + '">');
    out.push('<title>' + xml('数学星图 · 当前视图' + (version ? '（' + version + '）' : '') +
      ' · ' + c.nodes.length + ' 点 / ' + c.edges.length + ' 线') + '</title>');
    out.push('<rect width="' + W + '" height="' + H + '" fill="#ffffff"/>');

    /* 星团气泡：一层很淡的底，让人看出「这几颗是一团」 */
    (view.graph.clusters || []).forEach(function (cl, i) {
      var mine = (cl.nodes || []).filter(function (n) { return byId[n.id]; });
      if (mine.length < 2 || !cl.stat) return;
      var cx = screenX(cam, { x: cl.stat.cx, y: cl.stat.cy }) - x0;
      var cy = screenY(cam, { x: cl.stat.cx, y: cl.stat.cy }) - y0;
      var R = 40;
      mine.forEach(function (n) {
        var dx = screenX(cam, n) - x0 - cx, dy = screenY(cam, n) - y0 - cy;
        R = Math.max(R, Math.sqrt(dx * dx + dy * dy) + 34);
      });
      var col = cl.color || '#7A8699';
      defs.push('<radialGradient id="b' + i + '"><stop offset="58%" stop-color="' + xml(col) +
        '" stop-opacity="0.05"/><stop offset="88%" stop-color="' + xml(col) +
        '" stop-opacity="0.20"/><stop offset="100%" stop-color="' + xml(col) + '" stop-opacity="0"/></radialGradient>');
      bubbles.push('<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + R.toFixed(1) +
        '" fill="url(#b' + i + ')"/>');
    });
    out.push('<defs>' + defs.join('') + '</defs>');
    out.push.apply(out, bubbles);

    /* 线：直线 + 箭头；定义线用蓝色半透明，弱边虚线 */
    var STYLE = { implication: '#1C1C1E', equivalence: '#1C1C1E', definition: '#3C70F5', analogy: '#8A6AD6' };
    c.edges.forEach(function (e) {
      var ids = MG.graphUtil.edgeNodes(e);
      var a = byId[ids[0]], b = byId[ids[ids.length - 1]];
      if (!a || !b) return;
      var col = STYLE[e.kind] || '#888';
      var dash = e.kind === 'analogy' ? ' stroke-dasharray="5 4"' : '';
      var alpha = e.kind === 'definition' ? 0.5 : (e.kind === 'analogy' ? 0.6 : 0.85);
      var arrow = e.kind === 'implication' ? ' marker-end="url(#arrow)"' : '';
      out.push('<line x1="' + sx(a) + '" y1="' + sy(a) + '" x2="' + sx(b) + '" y2="' + sy(b) +
        '" stroke="' + col + '" stroke-opacity="' + alpha + '" stroke-width="1.2"' + dash + arrow + '/>');
    });

    /* 点：实心圆 + 白圈 */
    c.nodes.forEach(function (n) {
      var st = MG.typeStyle(n.type);
      var r = Math.max(2.5, nodeRadius ? nodeRadius(n) : 4);
      out.push('<circle cx="' + sx(n) + '" cy="' + sy(n) + '" r="' + r.toFixed(1) +
        '" fill="' + xml(st.color) + '" stroke="#ffffff" stroke-width="1.3"/>');
      out.push('<text x="' + sx(n) + '" y="' + (parseFloat(sy(n)) + r + 11).toFixed(1) +
        '" font-size="11" text-anchor="middle" fill="#1C1C1E">' + xml(n.label) + '</text>');
    });
    out.push('</svg>');
    return out.join('\n') + '\n';
  }

  /* ---------------------------------------------------------------- TikZ */
  function toTikZ(view, cam, version, nodeRadius) {
    var c = collect(view, cam);
    if (!c.nodes.length) return null;
    var T = MG.theme;
    var xs = [], ys = [];
    c.nodes.forEach(function (n) { xs.push(n.x); ys.push(n.y); });
    var w = Math.max(1, Math.max.apply(null, xs) - Math.min.apply(null, xs));
    var h = Math.max(1, Math.max.apply(null, ys) - Math.min.apply(null, ys));
    var cx = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
    var cy = (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2;
    var s = Math.min(16 / w, 16 / h);                 // 世界单位 → cm（图最长边约 16cm）
    var byId = Object.create(null);
    c.nodes.forEach(function (n) { byId[n.id] = n; });

    var out = [];
    out.push('% 数学星图 MathGalaxy' + (version ? ' ' + version : '') + ' —— 当前视图导出');
    out.push('% ' + c.nodes.length + ' 个节点 / ' + c.edges.length + ' 条边　' +
      (global.location ? global.location.href : ''));
    out.push('% 需要 XeLaTeX + \\usepackage{ctex}（节点名是中文）；\\usepackage{tikz}');
    out.push('% 每个节点都带 \\label{n:<节点id>}，正文里可以 \\ref{n:thm.cantor} 引用它。');
    out.push('');

    /* 类型颜色定义 */
    var types = Object.create(null);
    c.nodes.forEach(function (n) { types[n.type] = MG.typeStyle(n.type).color; });
    Object.keys(types).forEach(function (t) {
      out.push('\\definecolor{mg' + t + '}{HTML}{' + String(types[t]).replace('#', '').toUpperCase() + '}');
    });
    out.push('');
    out.push('\\tikzset{');
    out.push('  mgnode/.style={circle, draw=white, line width=0.6pt, inner sep=0pt, text=black!85, font=\\scriptsize},');
    out.push('  mgdef/.style={draw=blue!55, line width=0.4pt},');
    out.push('  mgimp/.style={draw=black!85, line width=0.5pt, ->, >=stealth},');
    out.push('  mgeq/.style={draw=black!85, line width=0.5pt},');
    out.push('  mgana/.style={draw=violet!70, line width=0.4pt, dashed}');
    out.push('}');
    out.push('');
    out.push('\\begin{tikzpicture}');
    out.push('');

    /* 边 */
    c.edges.forEach(function (e) {
      var ids = MG.graphUtil.edgeNodes(e);
      var a = byId[ids[0]], b = byId[ids[ids.length - 1]];
      if (!a || !b) return;
      var st = e.kind === 'implication' ? 'mgimp' : (e.kind === 'definition' ? 'mgdef'
        : (e.kind === 'analogy' ? 'mgana' : 'mgeq'));
      var pa = '(' + ((a.x - cx) * s).toFixed(3) + ',' + (-(a.y - cy) * s).toFixed(3) + ')';
      var pb = '(' + ((b.x - cx) * s).toFixed(3) + ',' + (-(b.y - cy) * s).toFixed(3) + ')';
      out.push('  \\draw[' + st + '] ' + pa + ' -- ' + pb + ';');
    });
    out.push('');

    /* 点（名字用 label；半径按世界半径 × s，中心天体自然更大） */
    c.nodes.forEach(function (n, i) {
      var r = Math.max(1.6, 2 * ((nodeRadius ? nodeRadius(n) : 4) / cam.k) * s);
      var at = '(' + ((n.x - cx) * s).toFixed(3) + ',' + (-(n.y - cy) * s).toFixed(3) + ')';
      out.push('  \\node[mgnode, fill=mg' + n.type + ', minimum size=' + r.toFixed(2) + 'cm] (N' + i +
        ') at ' + at + ' {' + tex(n.label) + '};');
      out.push('  \\label{n:' + n.id + '}');
    });
    out.push('');
    out.push('\\end{tikzpicture}');
    out.push('');

    /* 每个节点的陈述（注释形态给出，需要时直接抄进正文） */
    out.push('% ---- 节点陈述（注释，供引用时抄用）----');
    c.nodes.forEach(function (n) {
      if (n.title) out.push('% n:' + n.id + '（' + n.label + '）  ' + String(n.title).replace(/\n/g, ' '));
    });
    return out.join('\n') + '\n';
  }

  /* --------------------------------------------------------------- 下载 */
  function download(name, text, mime) {
    try {
      var blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); if (a.parentNode) a.parentNode.removeChild(a); }, 5000);
      return true;
    } catch (e) {
      console.error('[数学星图] 导出失败', e);
      return false;
    }
  }

  function versionOf() {
    return (MG.contentVersion || '');
  }

  MG.createExport = function (view, cam, nodeRadius) {
    var api = {
      collect: function () { return collect(view, cam); },
      json: function () { return toJSON(view, cam, versionOf()); },
      svg: function () { return toSVG(view, cam, versionOf(), nodeRadius); },
      tikz: function () { return toTikZ(view, cam, versionOf(), nodeRadius); },
      save: function (kind) {
        var text, name, mime;
        var c = collect(view, cam);
        var base = 'mathgalaxy-' + c.nodes.length + 'pts-' + stamp();
        if (kind === 'json') { text = api.json(); name = base + '.json'; mime = 'application/json'; }
        else if (kind === 'svg') { text = api.svg(); name = base + '.svg'; mime = 'image/svg+xml'; }
        else { text = api.tikz(); name = base + '.tex'; mime = 'text/x-tex'; }
        if (!text) return { ok: false, reason: '当前视图里没有节点' };
        var ok = download(name, text, mime);
        return { ok: ok, name: name, bytes: text.length, nodes: c.nodes.length, edges: c.edges.length };
      }
    };
    return api;
  };
})(typeof window !== 'undefined' ? window : globalThis);
