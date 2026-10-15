/* ==========================================================================
   数学星图 · 内文概念跳转（把正文里提到的概念变成可点的链接）
   --------------------------------------------------------------------------
   「环」的定义里写着「(A,+) 是阿贝尔群」「乘法还交换的环叫交换环」——
   那些词各自都是图里的一个节点，点它就该跳过去。

   做法：**渲染后的 DOM 后处理**（既不改内容，也不动 util.js 的 md()）
     · 用「首字 → 候选词」的索引扫纯文本节点，命中就包成 <a data-xlink="id">
     · 长的优先、区间不重叠
     · ⛔ 跳过 <a> <code> <pre> <button>，以及 KaTeX 吐出来的 .katex / .katex-display

   ⚠️ 词表由调用方传进来（graph 的 label + aliases 的 aka），这里只管匹配与包标签 ——
      引擎不该知道「图里有哪些节点」。同一个道理：不在 util.js 里做这件事。

   ⭐⭐ **只链「图里真有边相连」的节点**（邻接表 adj）。为什么这是关键：
       aliases.js 里登记了大量**普通词**当别名（「满足」「单位」「命题」「推出」），
       在正文里它们多数只是行文用词 —— 「(A,·) 满足结合律」里的「满足」不是
       def.satisfaction。放开匹配会满页都是错的链接，比没有链接更糟。
       限定在邻域里之后，链出来的就正好是「**这一条依赖的那些节点**」。

   ⛔ 单字不匹配（MIN_LEN = 2）：中文没有词边界，「循环」「环境」里的「环」
      会被当成 def.ring —— 同样是错的链接。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var MIN_LEN = 2;

  function createXLink(graph, aliases) {
    /* 首字 → [{w, id, n}]，按 n 降序（长的优先） */
    var byFirst = Object.create(null);
    var labelOf = Object.create(null);

    function add(word, id) {
      var w = String(word == null ? '' : word).trim();
      if (w.length < MIN_LEN) return;
      var f = w.charAt(0);
      if (!byFirst[f]) byFirst[f] = [];
      // 同一个词已经指向这个 id 就不重复加（label 与 aka 常常一样）
      for (var i = 0; i < byFirst[f].length; i++) {
        if (byFirst[f][i].w === w && byFirst[f][i].id === id) return;
      }
      byFirst[f].push({ w: w, id: id, n: w.length });
    }

    graph.nodes.forEach(function (n) {
      labelOf[n.id] = n.label || n.id;
      add(n.label, n.id);
    });
    /* 别名也进词表：人和 AI 搜的是别名，正文里出现的也常常是别名。
       ⚠️ aka 里可能有英文（"Zorn's lemma"）—— 一样能匹配，无所谓。 */
    ((aliases && aliases.nodes) || []).forEach(function (a) {
      if (!a || !a.id) return;
      (a.aka || []).forEach(function (k) { add(k, a.id); });
    });

    Object.keys(byFirst).forEach(function (f) {
      byFirst[f].sort(function (a, b) { return b.n - a.n; });
    });

    /* ---------------------------------------------------------- 邻接表 */
    /* id → { 邻居id: 1 }。四种边的端点字段各不相同，这里按 kind 取；
       算成**无向**的（谁连谁都能跳）。只有在这张表里的节点才会被链。 */
    var adj = Object.create(null);
    function endsOfEdge(e) {
      if (e.kind === 'implication') return (e.sources || []).concat(e.target ? [e.target] : []);
      if (e.kind === 'equivalence' || e.kind === 'analogy') return [e.a, e.b];
      if (e.kind === 'definition') return [e.definition, e.usedBy];
      return [];
    }
    graph.edges.forEach(function (e) {
      var ids = endsOfEdge(e).filter(function (v) { return v && graph.byId[v]; });
      for (var i = 0; i < ids.length; i++) {
        for (var j = 0; j < ids.length; j++) {
          if (i === j) continue;
          if (!adj[ids[i]]) adj[ids[i]] = Object.create(null);
          adj[ids[i]][ids[j]] = 1;
        }
      }
    });

    /** 在一段纯文本里找命中区间：长的优先，命中后跳过整段（不重叠） */
    function scan(text, fromId) {
      var allow = fromId ? adj[fromId] : null;
      var hits = [];
      var i = 0;
      while (i < text.length) {
        var cands = byFirst[text.charAt(i)];
        var got = null;
        if (cands) {
          for (var k = 0; k < cands.length; k++) {
            var c = cands[k];
            if (c.id === fromId) continue;                    // 自指不链
            if (allow && !allow[c.id]) continue;              // ⭐ 不在邻域里就不链
            if (i + c.n <= text.length && text.substr(i, c.n) === c.w) { got = c; break; }
          }
        }
        if (got) { hits.push({ at: i, len: got.n, id: got.id }); i += got.n; }
        else i++;
      }
      return hits;
    }

    var SKIP = { A: 1, CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, BUTTON: 1, INPUT: 1, TEXTAREA: 1, SELECT: 1 };

    function insideSkipped(node, root) {
      var p = node.parentNode;
      while (p && p !== root) {
        if (SKIP[p.nodeName]) return true;
        // ⛔ KaTeX 的输出是一大堆嵌套 span，里面的字不是「正文」
        if (p.classList && (p.classList.contains('katex') || p.classList.contains('katex-display'))) return true;
        p = p.parentNode;
      }
      return false;
    }

    /**
     * 把 root 里出现的、**且与 fromId 有边相连**的概念名包成可点的 <a>。
     * @param {Element} root    已经渲染好的容器（面板正文 / 概念页正文…）
     * @param {Object}  opts    { fromId } 站在哪个节点上看；给了它就只链它的邻居
     * @returns {number} 加了多少个链接
     */
    function linkify(root, opts) {
      if (!root || !global.document) return 0;
      opts = opts || {};
      var fromId = opts.fromId || null;

      // 先收集、后修改：边遍历边改 DOM，TreeWalker 会被自己改乱
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var texts = [];
      var t;
      while ((t = walker.nextNode())) {
        if (!t.nodeValue || !t.nodeValue.trim()) continue;
        if (insideSkipped(t, root)) continue;
        texts.push(t);
      }

      var count = 0;
      texts.forEach(function (node) {
        var s = node.nodeValue;
        var hits = scan(s, fromId);
        if (!hits.length) return;
        var frag = document.createDocumentFragment();
        var pos = 0;
        hits.forEach(function (h) {
          if (h.at > pos) frag.appendChild(document.createTextNode(s.slice(pos, h.at)));
          var a = document.createElement('a');
          a.className = 'pn-xlink';
          a.setAttribute('data-xlink', h.id);
          a.setAttribute('href', '#');
          a.setAttribute('title', '跳到「' + (labelOf[h.id] || h.id) + '」');
          a.textContent = s.substr(h.at, h.len);
          frag.appendChild(a);
          pos = h.at + h.len;
          count++;
        });
        if (pos < s.length) frag.appendChild(document.createTextNode(s.slice(pos)));
        node.parentNode.replaceChild(frag, node);
      });
      return count;
    }

    /** 诊断用：词表规模 */
    function stats() {
      var n = 0;
      Object.keys(byFirst).forEach(function (f) { n += byFirst[f].length; });
      return { words: n, firstChars: Object.keys(byFirst).length };
    }

    return { linkify: linkify, stats: stats };
  }

  MG.createXLink = createXLink;
})(typeof window !== 'undefined' ? window : globalThis);
