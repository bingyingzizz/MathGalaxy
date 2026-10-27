/* ==========================================================================
   数学星图 · 工具函数
   随机数（可复现）、几何、文本 / Markdown 渲染
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  /* ------------------------------------------------------------ 可复现随机 */
  function hashString(str) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** 由一个字符串派生一个稳定的 0~1 随机函数 */
  function rngFrom(str, salt) {
    return mulberry32(hashString(String(str) + '#' + (salt || 0)));
  }

  /* ---------------------------------------------------------------- 数学 */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function dist(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return Math.sqrt(dx * dx + dy * dy); }
  function dist2(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; }

  /** 点到线段距离 */
  function pointSegDist(px, py, ax, ay, bx, by) {
    var vx = bx - ax, vy = by - ay;
    var wx = px - ax, wy = py - ay;
    var len2 = vx * vx + vy * vy;
    var t = len2 > 1e-9 ? (wx * vx + wy * vy) / len2 : 0;
    t = clamp(t, 0, 1);
    return Math.sqrt(dist2(px, py, ax + t * vx, ay + t * vy));
  }

  /** 二次贝塞尔上一点 */
  function quadPoint(p0, p1, p2, t) {
    var u = 1 - t;
    return {
      x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
      y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
    };
  }

  /** 把二次贝塞尔按段采样为折线（用于命中检测） */
  function flattenQuad(p0, p1, p2, segments) {
    var pts = [];
    var n = segments || 14;
    for (var i = 0; i <= n; i++) pts.push(quadPoint(p0, p1, p2, i / n));
    return pts;
  }

  /** 点到折线的最短距离 */
  function pointPolylineDist(px, py, pts) {
    var best = Infinity;
    for (var i = 0; i < pts.length - 1; i++) {
      var d = pointSegDist(px, py, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
      if (d < best) best = d;
    }
    return best;
  }

  /** 以 (cx,cy) 为中心、垂直于 a→b 方向偏移 offset 的控制点 */
  function perpControl(ax, ay, bx, by, offset) {
    var mx = (ax + bx) / 2, my = (ay + by) / 2;
    var dx = bx - ax, dy = by - ay;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    return { x: mx + (-dy / len) * offset, y: my + (dx / len) * offset };
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* ---------------------------------------------------------------- 颜色 */
  var _rgbCache = Object.create(null);

  /** '#rrggbb' / '#rgb' / '12,34,56' → {r,g,b} */
  function hexToRgb(color) {
    if (_rgbCache[color]) return _rgbCache[color];
    var out = { r: 0, g: 0, b: 0 };
    if (!color) return out;
    var m = String(color).trim();
    if (m.charAt(0) === '#') {
      var h = m.slice(1);
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      out = { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
    } else if (m.indexOf(',') >= 0) {
      var p = m.split(',').map(function (v) { return parseFloat(v); });
      out = { r: p[0] || 0, g: p[1] || 0, b: p[2] || 0 };
    }
    _rgbCache[color] = out;
    return out;
  }

  /** 把颜色 + 不透明度转成 rgba() 字符串 */
  function rgba(color, alpha) {
    if (alpha == null || alpha >= 1) return color;
    var c = hexToRgb(color);
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + alpha + ')';
  }

  /** 加白（模拟电子云淡化效果） */
  function mixWithWhite(color, amount) {
    var c = hexToRgb(color);
    var f = clamp(amount, 0, 1);
    return 'rgb(' + Math.round(lerp(255, c.r, f)) + ',' +
      Math.round(lerp(255, c.g, f)) + ',' + Math.round(lerp(255, c.b, f)) + ')';
  }

  /* ---------------------------------------------------------------- 文本 */
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escapeRegExp(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /** 取纯文本（去掉 LaTeX 记号），用于搜索与摘要 */
  function plain(text) {
    return stripMd(String(text || '')
      .replace(/\$\$[\s\S]*?\$\$/g, ' ')
      .replace(/\$[^$\n]*\$/g, ' '));
  }

  /* 标记语法要剥干净 —— 这里是纯文本预览（搜索行、证据链摘要），
     漏了这一步页面上就会直接显示 ** 和 ## 的字面量。
     与 inlineMd 同一套，但这里允许夹一个换行：md() 会把段内换行
     折成空格（para.join(' ')），plain() 拿到的是原文，不放过就会漏 **。
     只放单个 \n，空行（段落断开）仍然不许跨。 */
  function stripMd(text) {
    return String(text || '')
      .replace(/\*\*((?:[^*\n]|\n(?!\n)|\*(?!\*))+?)\*\*/g, '$1')
      .replace(/\*([^*\n]+)\*/g, '$1')
      .replace(/`([^`\n]*)`/g, '$1')
      .replace(/^[ \t]{0,3}#{1,6}[ \t]*/gm, ' ')
      .replace(/^[ \t]{0,3}>[ \t]?/gm, ' ')
      .replace(/^[ \t]{0,3}[-*+][ \t]+/gm, ' ')
      .replace(/\\[a-zA-Z]+\*?/g, ' ')
      .replace(/[{}\\]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* ---------------------------------------------- 公式 → 可读文本（摘要用） */
  /* ⛔ 这不是渲染（渲染走 KaTeX），也不是给 AI 的 LaTeX —— 只给**摘要**用。
     为什么要它：`plain()` 把公式整个换成空格，于是
       `设 $F$ 是一个集合族，且 $\emptyset \notin F$。`
     变成「设 是一个集合族，且 。」—— 搜索结果行里就是这种空句（153/709 个节点）。
     这里把**简单**的公式转成 Unicode 记号后留下：`设 F 是一个集合族，且 ∅ ∉ F。`
     长/嵌套的公式照样会剩下噪声，所以调用方还要过一道「够不够干净」的闸（见 search.js）。 */
  var TEX_SYM = {
    '\\emptyset': '∅', '\\varnothing': '∅', '\\in': '∈', '\\notin': '∉', '\\ni': '∋',
    '\\subseteq': '⊆', '\\subsetneq': '⊊', '\\subset': '⊂', '\\supseteq': '⊇',
    '\\supsetneq': '⊋', '\\supset': '⊃', '\\sqsubseteq': '⊑', '\\sqsupseteq': '⊒',
    '\\cup': '∪', '\\cap': '∩', '\\setminus': '∖', '\\smallsetminus': '∖',
    '\\times': '×', '\\cdot': '·', '\\pm': '±', '\\mp': '∓', '\\ast': '∗', '\\star': '⋆',
    '\\bullet': '•', '\\dagger': '†', '\\ddagger': '‡',
    '\\to': '→', '\\rightarrow': '→', '\\longrightarrow': '⟶', '\\leftarrow': '←',
    '\\longleftarrow': '⟵', '\\mapsto': '↦', '\\Rightarrow': '⇒', '\\implies': '⟹',
    '\\leftrightarrow': '↔', '\\Longleftrightarrow': '⟺', '\\iff': '⟺',
    '\\hookrightarrow': '↪', '\\hookleftarrow': '↩', '\\twoheadrightarrow': '↠',
    '\\le': '≤', '\\leq': '≤', '\\ge': '≥', '\\geq': '≥', '\\neq': '≠', '\\ne': '≠',
    '\\preceq': '≼', '\\succeq': '≽', '\\prec': '≺', '\\succ': '≻',
    '\\approx': '≈', '\\cong': '≅', '\\simeq': '≃', '\\sim': '∼', '\\equiv': '≡',
    '\\triangleq': '≜', '\\coloneqq': '≔', '\\colon': ':', '\\mid': '∣', '\\nmid': '∤',
    '\\vdash': '⊢', '\\dashv': '⊣', '\\models': '⊨', '\\Vdash': '⊩',
    '\\infty': '∞', '\\partial': '∂', '\\nabla': '∇', '\\forall': '∀', '\\exists': '∃',
    '\\neg': '¬', '\\lnot': '¬', '\\wedge': '∧', '\\vee': '∨', '\\land': '∧', '\\lor': '∨',
    '\\perp': '⊥', '\\parallel': '∥', '\\angle': '∠', '\\triangle': '△',
    '\\circ': '∘', '\\sum': '∑', '\\prod': '∏', '\\coprod': '∐', '\\int': '∫',
    '\\bigcup': '⋃', '\\bigcap': '⋂', '\\bigoplus': '⨁', '\\bigotimes': '⨂',
    '\\oplus': '⊕', '\\otimes': '⊗', '\\ominus': '⊖', '\\sqcup': '⊔', '\\sqcap': '⊓',
    '\\aleph': 'ℵ', '\\ell': 'ℓ', '\\cdots': '⋯', '\\ldots': '…', '\\dots': '…', '\\vdots': '⋮',
    '\\square': '□', '\\checkmark': '✓',
    '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\Gamma': 'Γ', '\\delta': 'δ', '\\Delta': 'Δ',
    '\\epsilon': 'ε', '\\varepsilon': 'ε', '\\zeta': 'ζ', '\\eta': 'η', '\\theta': 'θ',
    '\\kappa': 'κ', '\\lambda': 'λ', '\\Lambda': 'Λ', '\\mu': 'μ', '\\nu': 'ν', '\\xi': 'ξ',
    '\\pi': 'π', '\\Pi': 'Π', '\\rho': 'ρ', '\\sigma': 'σ', '\\Sigma': 'Σ', '\\tau': 'τ',
    '\\phi': 'φ', '\\varphi': 'φ', '\\Phi': 'Φ', '\\chi': 'χ', '\\psi': 'ψ', '\\Psi': 'Ψ',
    '\\omega': 'ω', '\\Omega': 'Ω',
    '\\mathbb{R}': 'ℝ', '\\mathbb{N}': 'ℕ', '\\mathbb{Z}': 'ℤ', '\\mathbb{Q}': 'ℚ',
    '\\mathbb{C}': 'ℂ', '\\mathbb{H}': 'ℍ', '\\mathbb{P}': 'ℙ', '\\mathbb{E}': '𝔼',
    '\\mathcal{P}': '𝒫', '\\mathcal{U}': '𝒰', '\\mathcal{F}': 'ℱ', '\\mathcal{O}': '𝒪',
    '\\mathcal{C}': '𝒞', '\\mathcal{M}': 'ℳ', '\\mathcal{L}': 'ℒ',
    '\\mathfrak{A}': '𝔄', '\\mathfrak{m}': '𝔪', '\\mathfrak{p}': '𝔭', '\\mathfrak{q}': '𝔮'
  };
  var TEX_KEYS = Object.keys(TEX_SYM).sort(function (a, b) { return b.length - a.length; });

  /* 这些命令**当词留下**（sup S、ker f…）—— 丢掉的话句子里就多个洞 */
  var TEX_OPS = ('sup inf lim limsup liminf max min ker im coker dom cod det dim deg rank id ' +
    'pr ev spec hom Hom ext Ext tor Tor colim mod gcd lcm exp log sin cos tan arctan sgn ' +
    'supp card span Span tr Tr diag vol diam dist closure interior').split(' ');
  var TEX_OP_SET = Object.create(null);
  TEX_OPS.forEach(function (w) { TEX_OP_SET[w] = 1; });

  /** 一段 TeX → 可读文本（未知命令直接丢掉，宁可少几个字也别留下 `\preceq`） */
  function texToText(tex) {
    var s = String(tex || '');
    s = s.replace(/\\(?:left|right|big|Big|bigg|Bigg|l|r)\b/g, ' ');   // \left( \right) \big[
    s = s.replace(/\\(?:quad|qquad|,|;|:|!| )/g, ' ');
    for (var i = 0; i < TEX_KEYS.length; i++) {
      var k = TEX_KEYS[i];
      if (s.indexOf(k) >= 0) s = s.split(k).join(TEX_SYM[k]);
    }
    /* 重音 / 字体命令：{...} 里的内容留下（\overline{A} → A）
       ⚠️ 只处理**不带嵌套花括号**的（够用了：这些命令的参数基本是单层） */
    s = s.replace(
      /\\(?:overline|underline|widehat|widetilde|hat|tilde|bar|vec|dot|ddot|mathbf|boldsymbol|mathcal|mathfrak|mathsf|mathtt|mathrm|text|textrm|textnormal|operatorname|mathbb|mathnormal|mathscr)\s*\{([^{}]*)\}/g,
      ' $1 ');
    s = s.replace(/\\([a-zA-Z]+)/g, function (m, name) {
      return TEX_OP_SET[name] ? ' ' + name + ' ' : ' ';
    });
    s = s.replace(/\\([^a-zA-Z])/g, '$1');
    s = s.replace(/[{}$]/g, '');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  /** 摘要专用：保留**可读**的公式（`$x$` → `x`，`$\emptyset$` → `∅`），再剥 markdown 标记 */
  function plainMath(text) {
    var s = String(text || '')
      .replace(/\$\$([\s\S]*?)\$\$/g, function (m, tex) { return ' ' + texToText(tex) + ' '; })
      .replace(/\$([^$\n]*)\$/g, function (m, tex) { return texToText(tex); });
    return stripMd(s);
  }

  function truncate(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }

  /* --------------------------------- 反引号里的节点 id → 可点的中文名 ------ */
  /*  正文里写 `thm.analytic-modules` 是**提到**另一个节点（全库 400 多处）。
     渲染成灰底等宽代码块既不像话也点不动 ⇒ 查得到就变成和 xlink 一样的链接：
     显示节点的中文名，点它等同 `#n=<id>` 深链（复用面板对 [data-xlink] 的处理）。
     ⭐ 表和 xlink 的词表一样由**渲染方**登记（panel.js 的 show() 调 setNodeTable）——
        引擎不该知道图里有哪些节点。
     ⛔ 没登记（Node 里跑 tools/sitepages.mjs 产概念页）或查不到这个 id ⇒ 原样 <code>。
     ⛔ 只在**拼 HTML 字符串**时查一次 O(1) 哈希表；渲染循环根本不走 md()。 */
  var nodeTable = null;

  function setNodeTable(byId) {
    nodeTable = (byId && typeof byId === 'object') ? byId : null;
    return nodeTable;
  }

  /** 反引号里的内容（**已转义**过的文本）→ 链接 HTML；不是已知节点 ⇒ 空串。
      ⚠️ 拿到的是 escapeHtml 之后的文本：节点 id 只含 [a-z0-9.:/-]，转义不会改动它；
         真被改动过，说明它本来也不是 id ⇒ 走 <code> 兜底。
      ⛔ 名字、id、属性一律走 escapeHtml —— label 里有 & < " 的可能性不能排除。 */
  function idLink(escId) {
    if (!nodeTable) return '';
    var n = nodeTable[escId];
    if (!n) return '';
    var name = (MG.labelOf ? MG.labelOf(n) : '') || n.label || n.id;
    return '<a class="pn-xlink" data-xlink="' + escapeHtml(n.id) + '"' +
      ' href="#" title="' + escapeHtml(n.id) + '">' + escapeHtml(name) + '</a>';
  }

  /* ------------------------------------------- 极简 Markdown → HTML ------ */
  /*  支持： ## 标题 / 段落 / - 列表 / 1. 列表 / > 引用 / **粗** / *斜* /
             `行内代码` / ```代码块``` / $行内公式$ / $$独立公式$$        */
  function inlineMd(s) {
    // 公式先摘出来（避免被 HTML 转义），最后再交给 KaTeX / 等宽显示
    // ⚠ 顺序要紧：先吃掉 $$...$$，再处理单 $。否则单 $ 规则会把行内的
    //   $$x$$ 拆成「$ + $x$ + $」，在页面上漏出两个 $ 号。
    var math = [];
    var raw = String(s).replace(/\$\$([^$\n]+?)\$\$/g, function (m, tex) {
      math.push(tex);
      return '\u0000M' + (math.length - 1) + '\u0000';
    });
    raw = raw.replace(/\$([^$\n]+?)\$/g, function (m, tex) {
      math.push(tex);
      return '\u0000M' + (math.length - 1) + '\u0000';
    });
    var out = escapeHtml(raw);
    out = out.replace(/\u0000M(\d+)\u0000/g, function (m, idx) {
      var tex = math[+idx];
      if (MG.renderInlineMath) return MG.renderInlineMath(tex);
      return '<code>' + escapeHtml(tex) + '</code>';
    });
    /* `行内代码`：内容正好是图里某个节点的 id ⇒ 渲染成可点链接（显示中文名），
       否则仍是 <code>。⭐ 见上面 idLink() 的说明。 */
    out = out.replace(/`([^`\n]+?)`/g, function (m, body) {
      return idLink(body) || ('<code>' + body + '</code>');
    });
    // 粗体：内容里允许出现单个 *（数学记号里 μ^*、f^* 很常见），
    // 只把 ** 当成定界符，别被里面那个 * 打断。
    // ⚠ 内容类里**不能**排除换行：这里的换行只可能来自上一步塞进去的
    //   KaTeX 输出 —— \widehat / \bar / \overline / \vec 这类重音符号
    //   是用内联 SVG 画的，SVG 里带换行。排除 \n 会让「**… $\hat{X}$ …**」
    //   整段匹配失败，页面上直接漏出四个星号。
    //   （inlineMd 每次只收到一行 / 一段，本身不含换行。）
    out = out.replace(/\*\*((?:[^*]|\*(?!\*))+?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*])\*([^*]+?)\*(?!\*)/g, '$1<em>$2</em>');
    return out;
  }

  /* 标题专用渲染：只认 $…$ / $$…$$ 数学，**不**做 markdown（粗体 / 斜体 / 代码）。
     为什么单独来一个：title 里的 `*` 是常见数学记法（μ*、(L^p)*），
     走 inlineMd 会被斜体/粗体规则吃掉；而 title 又确实需要能写 LaTeX
     （L^p、\|f\|_\infty）。所以这里只把公式摘出来交给 KaTeX，其余原样转义。 */
  function titleHtml(s) {
    if (!s) return '';
    var math = [];
    var raw = String(s).replace(/\$\$([^$\n]+?)\$\$/g, function (m, tex) {
      math.push(tex);
      return '\u0000M' + (math.length - 1) + '\u0000';
    });
    raw = raw.replace(/\$([^$\n]+?)\$/g, function (m, tex) {
      math.push(tex);
      return '\u0000M' + (math.length - 1) + '\u0000';
    });
    var out = escapeHtml(raw);
    return out.replace(/\u0000M(\d+)\u0000/g, function (m, idx) {
      var tex = math[+idx];
      if (MG.renderInlineMath) return MG.renderInlineMath(tex);
      return '<code>' + escapeHtml(tex) + '</code>';
    });
  }

  function blockMath(tex) {
    if (MG.renderBlockMath) {
      var html = MG.renderBlockMath(tex);
      if (html) return html;
    }
    return '<div class="math-block">' + escapeHtml(tex.trim()) + '</div>';
  }

  function md(text) {
    if (!text) return '';
    var lines = String(text).replace(/\r\n?/g, '\n').split('\n');
    var html = [];
    var i = 0;
    var para = [];

    function flushPara() {
      if (!para.length) return;
      html.push('<p>' + inlineMd(para.join(' ')) + '</p>');
      para = [];
    }

    while (i < lines.length) {
      var line = lines[i];

      // 独立公式块 $$ ... $$
      if (/^\s*\$\$/.test(line)) {
        flushPara();
        var buf = [];
        var first = line.replace(/^\s*\$\$\s?/, '');
        if (/\$\$\s*$/.test(first) && first.replace(/\$\$\s*$/, '').trim() !== '') {
          html.push(blockMath(first.replace(/\$\$\s*$/, '')));
          i++; continue;
        }
        if (first.trim()) buf.push(first);
        i++;
        while (i < lines.length && !/\$\$\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
        if (i < lines.length) { buf.push(lines[i].replace(/\$\$\s*$/, '')); i++; }
        html.push(blockMath(buf.join('\n')));
        continue;
      }

      // 代码块
      if (/^\s*```/.test(line)) {
        flushPara();
        var code = [];
        i++;
        while (i < lines.length && !/^\s*```/.test(lines[i])) { code.push(lines[i]); i++; }
        i++;
        html.push('<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>');
        continue;
      }

      // 标题
      var h = line.match(/^\s*(#{2,5})\s+(.*)$/);
      if (h) { flushPara(); html.push('<h5>' + inlineMd(h[2]) + '</h5>'); i++; continue; }

      // 引用
      if (/^\s*>\s?/.test(line)) {
        flushPara();
        var quote = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^\s*>\s?/, '')); i++;
        }
        html.push('<blockquote>' + inlineMd(quote.join(' ')) + '</blockquote>');
        continue;
      }

      // 无序列表
      if (/^\s*[-*+]\s+/.test(line)) {
        flushPara();
        var ul = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          ul.push('<li>' + inlineMd(lines[i].replace(/^\s*[-*+]\s+/, '')) + '</li>'); i++;
        }
        html.push('<ul>' + ul.join('') + '</ul>');
        continue;
      }

      // 有序列表
      if (/^\s*\d+[.)]\s+/.test(line)) {
        flushPara();
        var ol = [];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          ol.push('<li>' + inlineMd(lines[i].replace(/^\s*\d+[.)]\s+/, '')) + '</li>'); i++;
        }
        html.push('<ol>' + ol.join('') + '</ol>');
        continue;
      }

      if (!line.trim()) { flushPara(); i++; continue; }

      para.push(line.trim());
      i++;
    }
    flushPara();
    return html.join('');
  }

  /* ---------------------------------------------------------------- 导出 */
  MG.util = {
    hashString: hashString,
    mulberry32: mulberry32,
    rngFrom: rngFrom,
    clamp: clamp,
    lerp: lerp,
    dist: dist,
    dist2: dist2,
    pointSegDist: pointSegDist,
    pointPolylineDist: pointPolylineDist,
    quadPoint: quadPoint,
    flattenQuad: flattenQuad,
    perpControl: perpControl,
    hexToRgb: hexToRgb,
    rgba: rgba,
    mixWithWhite: mixWithWhite,
    easeOutCubic: easeOutCubic,
    easeInOutCubic: easeInOutCubic,
    escapeHtml: escapeHtml,
    escapeRegExp: escapeRegExp,
    plain: plain,
    plainMath: plainMath,
    truncate: truncate,
    md: md,
    inlineMd: inlineMd,
    titleHtml: titleHtml,
    setNodeTable: setNodeTable
  };
})(typeof window !== 'undefined' ? window : globalThis);
