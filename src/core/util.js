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
    return String(text || '')
      .replace(/\$\$[\s\S]*?\$\$/g, ' ')
      .replace(/\$[^$\n]*\$/g, ' ')
      // 标记语法要剥干净 —— 这里是纯文本预览（搜索行、证据链摘要），
      // 漏了这一步页面上就会直接显示 ** 和 ## 的字面量。
      // 与 inlineMd 同一套，但这里允许夹一个换行：md() 会把段内换行
      // 折成空格（para.join(' ')），plain() 拿到的是原文，不放过就会漏 **。
      // 只放单个 \n，空行（段落断开）仍然不许跨。
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

  function truncate(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
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
    out = out.replace(/`([^`\n]+?)`/g, '<code>$1</code>');
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
    truncate: truncate,
    md: md,
    inlineMd: inlineMd,
    titleHtml: titleHtml
  };
})(typeof window !== 'undefined' ? window : globalThis);
