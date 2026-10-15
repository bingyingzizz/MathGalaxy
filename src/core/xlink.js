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

    function add(word, id, isLabel) {
      var w = String(word == null ? '' : word).trim();
      if (w.length < MIN_LEN) return;
      var f = w.charAt(0);
      if (!byFirst[f]) byFirst[f] = [];
      // 同一个词已经指向这个 id 就不重复加（label 与 aka 常常一样）
      for (var i = 0; i < byFirst[f].length; i++) {
        if (byFirst[f][i].w === w && byFirst[f][i].id === id) {
          if (isLabel) byFirst[f][i].isLabel = true;   // label 优先
          return;
        }
      }
      byFirst[f].push({ w: w, id: id, n: w.length, isLabel: !!isLabel });
    }

    graph.nodes.forEach(function (n) {
      labelOf[n.id] = n.label || n.id;
      add(n.label, n.id, true);
    });
    /* 别名也进词表：人和 AI 搜的是别名，正文里出现的也常常是别名。
       ⚠️ 但 aka 里混着大量**普通词**（满足 / 单位 / 命题 / 推出 / 反例）——
         它们是给**搜索**用的，正文里多数只是行文用词。所以 aka 要更严：
         要么在当前节点的邻域里，要么本身够长（≥ 3 字）才认。见 scan()。 */
    ((aliases && aliases.nodes) || []).forEach(function (a) {
      if (!a || !a.id) return;
      (a.aka || []).forEach(function (k) { add(k, a.id, false); });
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

    /**
     * 在一段纯文本里找命中区间：长的优先，命中后跳过整段（不重叠）。
     *
     * ⭐ 命中分两级：**与 fromId 有边相连**的记 `near: true`，其余 `near: false`。
     *   两级都链，只是样式不同（近的蓝下划线、远的灰点线）。
     *   为什么不再限制「只链邻居」：跨星系的节点天然就远 —— 实测
     *   「局部紧 Hausdorff」离 thm.pontryagin-van-kampen 是 **4 跳**
     *   （拓扑学 ↔ 凝聚态），「范畴」离那个预层命题是 2 跳。
     *   要覆盖它们就得放到 4 跳，那几乎等于全图，限制也就没意义了。
     *   ⇒ 放宽到全图，**「这个词在这里到底指不指那个节点」交给读的人判断**，
     *     样式上的浓淡给他一个提示。代码不替他决定。
     */
    function scan(text, fromId) {
      var near = fromId ? adj[fromId] : null;
      var hits = [];
      var i = 0;
      while (i < text.length) {
        var cands = byFirst[text.charAt(i)];
        var got = null;
        if (cands) {
          for (var k = 0; k < cands.length; k++) {
            var c = cands[k];
            if (c.id === fromId) continue;                    // 自指不链
            // ⭐ aka 来的短词（2 字）不在邻域里就跳过 —— 那是行文用词，不是概念指称。
            //   label 不受这条限制：「范畴」「预层」都是 2 字的**节点名**，该链。
            if (!c.isLabel && c.n < 3 && !(near && near[c.id])) continue;
            if (i + c.n <= text.length && text.substr(i, c.n) === c.w) { got = c; break; }
          }
        }
        if (got) {
          hits.push({ at: i, len: got.n, id: got.id, near: !!(near && near[got.id]) });
          i += got.n;
        } else i++;
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
      /* ⭐ 同一个概念只链**第一次**出现。
         实测一个面板里「对偶」出现 4 次、「预层」5 次 —— 全链上就是满页下划线，
         读起来反而更累。点一次就够了；后面的原样留着（pos 不前移即可）。 */
      var seen = Object.create(null);
      texts.forEach(function (node) {
        var s = node.nodeValue;
        var hits = scan(s, fromId);
        if (!hits.length) return;
        var frag = document.createDocumentFragment();
        var pos = 0;
        hits.forEach(function (h) {
          if (seen[h.id]) return;
          seen[h.id] = 1;
          if (h.at > pos) frag.appendChild(document.createTextNode(s.slice(pos, h.at)));
          var a = document.createElement('a');
          // near = 与当前节点有边相连；far = 只是「这个词在图里另有一个节点」
          a.className = 'pn-xlink' + (h.near ? '' : ' far');
          a.setAttribute('data-xlink', h.id);
          a.setAttribute('href', '#');
          a.setAttribute('title',
            (h.near ? '它依赖：' : '图里也有：') + (labelOf[h.id] || h.id));
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
