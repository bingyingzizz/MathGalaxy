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

   ⭐⭐ **全图匹配**（不再只链直接邻居）。为什么：跨星系的节点天然就远 —— 实测
       「局部紧 Hausdorff」离 thm.pontryagin-van-kampen 是 **4 跳**（拓扑学 ↔ 凝聚态），
       「范畴」离那个预层命题是 2 跳。要覆盖它们就得放到 4 跳，那几乎等于全图
       （1/2/3 跳的平均邻居数是 4.3 / 25.6 / 86.5）。⇒ 放宽到全图，
       **「这个词在这里到底指不指那个节点」交给读的人判断**，样式上给提示：

         · `near`（蓝实线）= 与当前节点**真有边相连**
         · `far` （灰点线）= 图里有这个节点，但这页只是在文字里提到

   ⭐⭐ **正文优先**（`opts.priority`）。面板顶上那行「还差 N 条前置：群同态、核与像…」
       是**提示**，用节点 label 拼的，在 DOM 里排在「陈述」**前面**。不给优先级的话，
       它一命中 8 字长的「群同态、核与像」就把 `def.group-hom` 的名额占了，
       等扫到正文里真正的「群同态」时已经算「链过一次」⇒ 用户报的「点不动」。
       ⇒ 命中选择器的子树**先扫**，`seen`（一个概念只链第一次）也就先给正文。

   ⛔ 单字默认不匹配（MIN_LEN = 2）。为什么：中文没有词边界，「循环」里的「环」、
      「公理模式」里的「模」、「开邻域」里的「域」都会被当成术语。
      ⭐ **例外是一张人工名单**（`aliases.singleChar`：群 / 层 / 紧 / 锥 / 筛 / 茎 / 势）——
      这几个字在全库 22 万字里确实只当术语用（判据是把每个字的上下文全 dump 出来看，
      不是拍脑袋）。代价：「核」「像」链不了（「核心」「图像」太常见，而且「核」
      同时指向三个节点）。

   ⛔ `aliases.linkStop` 里的写法**不链，而且要把整段吃掉**（拦词）——
      那些是行文词（满足 / 推出 / 代数…），只是碰巧和某个 aka 同写法。
      「吃掉」是必需的：「把**短正合列**送成」里如果只把『正合列』设成「不链」，
      游标会退到更短的『正合』，于是链出一个错的。表在**内容**里，引擎只读表。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var MIN_LEN = 2;

  function createXLink(graph, aliases) {
    /* 首字 → [{w, id, n}]，按 n 降序（长的优先） */
    var byFirst = Object.create(null);
    var labelOf = Object.create(null);

    /* ⭐⭐ 单字白名单 —— 名单在**内容**里（`aliases.singleChar`），代码只负责「按名单放行」。
       为什么不干脆一律放行：中文没有词边界，单字匹配会满页错链。实测（全库 22 万字）：
         「域」→ 开邻域 / 紧邻域 / 定义域   「模」→ 公理模式 / 模型 / 模板
         「基」→ 基本定理 / 地基 / 基准     「积」→ 积分 / 积分理论
         「环」→ 循环 / 无环               「图」→ 本星图 / 图形
         「核 / 像」→ 核心 / 图像（而且「核」同时指向三个节点，链过去指哪个都不对）
       人工挑过、正文里确实只当术语用的那几个才进名单（群 / 层 / 紧 / 锥 / 筛 / 茎 / 势）。 */
    var single = Object.create(null);
    ((aliases && aliases.singleChar) || []).forEach(function (w) { single[String(w)] = 1; });

    function add(word, id, isLabel) {
      var w = String(word == null ? '' : word).trim();
      if (w.length < MIN_LEN && !single[w]) return;
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

    /* ⛔ 「拦词」：**不链**，而且要把这一整段**吃掉**。
       为什么光「不链」不够：「把短正合列送成」里，在「正」处匹配不到『正合列』的话
       就会退到更短的『正合』，于是链出一个错的（正合函子）。
       所以拦词得占住位置、把游标推过去，短词才没机会钻进来。 */
    function addBlocker(word) {
      var w = String(word == null ? '' : word).trim();
      if (w.length < MIN_LEN) return;
      var f = w.charAt(0);
      if (!byFirst[f]) byFirst[f] = [];
      byFirst[f].push({ w: w, id: null, n: w.length, isLabel: true, block: true });
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

    /* ⛔「行文词」：同一个写法，在这里只是普通说法，不是概念指称。
       表是**内容**（aliases.js 的 linkStop），引擎只负责「表里有的不链」。
       它们同时是**拦词**（见 addBlocker）—— 「不正合」要靠它挡住，否则
       「短正合列」会退到『正合』链错。 */
    ((aliases && aliases.linkStop) || []).forEach(function (w) { addBlocker(w); });

    Object.keys(byFirst).forEach(function (f) {
      /* 长的优先；⛔ 同长度时**拦词排前面** —— 否则一个既是 aka 又是拦词的写法
         会先被当成概念链出去，拦词形同虚设。 */
      byFirst[f].sort(function (a, b) {
        return (b.n - a.n) || ((b.block ? 1 : 0) - (a.block ? 1 : 0));
      });
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
    function scan(text, fromId, allowShortAka) {
      var near = fromId ? adj[fromId] : null;
      var hits = [];
      var i = 0;
      while (i < text.length) {
        var cands = byFirst[text.charAt(i)];
        var got = null, blocked = false;
        if (cands) {
          for (var k = 0; k < cands.length; k++) {
            var c = cands[k];
            // ⚠️ 先看字面：不匹配的候选直接跳过（长度不够 / 字不对）
            if (i + c.n > text.length || text.substr(i, c.n) !== c.w) continue;
            // 拦词：吃掉整段，不给更短的候选留机会
            if (c.block) { i += c.n; blocked = true; break; }
            if (c.id === fromId) continue;                    // 自指不链
            // ⭐ aka 来的短词（2 字）默认不在邻域里就跳过 —— 那是行文用词，不是概念指称。
            //   label 不受这条限制：「范畴」「预层」都是 2 字的**节点名**，该链。
            if (!c.isLabel && c.n < 3 && !allowShortAka && !(near && near[c.id])) continue;
            got = c; break;
          }
        }
        if (blocked) continue;
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
     * 这段文字是不是落在 `sel` 里。
     * ⭐⭐ **为什么需要它**：面板顶部那行「还差 3 条前置：群同态、核与像、正规子群…」
     *    是**提示**（列出的是节点 label），在 DOM 里排在「陈述」**前面**。
     *    它一命中 8 字长的「群同态、核与像」，`seen` 就把 `def.group-hom` 这个名额
     *    记掉了；等扫到陈述里真正的行文「群同态」时，已经算「链过一次」——
     *    用户实测的「群同态点不动」就是这么来的。
     *    ⇒ 正文（`.pn-body`）先扫，提示 / 芯片之类的后扫。
     */
    function inside(node, root, sel) {
      if (!sel) return false;
      var p = node.parentNode;
      while (p && p !== root) {
        if (p.matches && p.matches(sel)) return true;
        p = p.parentNode;
      }
      return false;
    }

    /**
     * 把 root 里出现的概念名包成可点的 <a>。
     * @param {Element} root    已经渲染好的容器（面板正文 / 概念页正文…）
     * @param {Object}  opts    { fromId, priority, shortAka }
     *        fromId   站在哪个节点上看 —— 决定 near / far（不再限制链不链）
     *        priority 选择器；命中的子树里的文字**先扫**（正文优先于提示，见 inside()）
     *        shortAka true = 2 字 aka 不再要求邻域（默认 false，噪音大）
     * @returns {number} 加了多少个链接
     */
    function linkify(root, opts) {
      if (!root || !global.document) return 0;
      opts = opts || {};
      var fromId = opts.fromId || null;
      var prio = opts.priority || null;
      var allowShortAka = !!opts.shortAka;

      // 先收集、后修改：边遍历边改 DOM，TreeWalker 会被自己改乱
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var prioTexts = [], restTexts = [];
      var t;
      while ((t = walker.nextNode())) {
        if (!t.nodeValue || !t.nodeValue.trim()) continue;
        if (insideSkipped(t, root)) continue;
        (prio && inside(t, root, prio) ? prioTexts : restTexts).push(t);
      }
      var texts = prioTexts.concat(restTexts);

      var count = 0;
      /* ⭐ 同一个概念只链**第一次**出现。
         实测一个面板里「对偶」出现 4 次、「预层」5 次 —— 全链上就是满页下划线，
         读起来反而更累。点一次就够了；后面的原样留着（pos 不前移即可）。
         ⚠️ 「第一次」是在**上面那个顺序**里的第一次 ⇒ 正文永远优先拿到名额。 */
      var seen = Object.create(null);
      texts.forEach(function (node) {
        var s = node.nodeValue;
        var hits = scan(s, fromId, allowShortAka);
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
            MG.t(h.near ? '它依赖：{名}' : '图里也有：{名}', { 名: labelOf[h.id] || h.id }));
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
