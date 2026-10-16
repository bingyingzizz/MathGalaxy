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

   ⛔⛔ **拉丁词条要在词边界上命中，专名要整体识别**（2026-10-16 修）——
      起因是英文面板里观察到的两处错链：
        · `prerequisites`（界面提示里的普通英文词）内部的 `site`
          被链到了 def.grothendieck-topology；
        · `Heine–Borel` 里被拆出来的 `Borel` 被链到了 def.borel。
      词表本身没错（`site` / `Borel` 都是货真价实的 aka），错的是**匹配方式**：
      原先按字符滑、不看边界，于是拉丁术语能从单词内部被截出来，
      连字符也不算「词的一部分」，复合专名就被拆成了两半。现在的规则：
        · 拉丁命中区间的**左右**都不能是「词内字符」
          （字母 / 数字 / 变音符 / 连字符与各种破折号）⇒ `prerequisites` 里的
          `site` 前面是字母、`Heine–Borel` 里的 `Borel` 前面是破折号，都不命中；
        · 顺带就有了「复合专名整体识别、拿不准宁可不链」：`Heine-Borel` 整段
          真在表里（thm.metric-compact-equiv 的 aka）⇒ 整段链；
          只能对上 `Borel` 一半时 ⇒ 拒掉，不猜。
        · 归一化是**逐字符 1:1** 的（变音字母去组合符、各种破折号统一成 '-'），
          所以正文写 `Schroder–Bernstein` / `Schroder-Bernstein` 也能命中 aka 里的
          `Schröder–Bernstein`，而正文字符下标与词表长度始终对齐。
      ⚠️ 规则只作用于**拉丁**词条 —— 中文没有词边界这一说，中文词条行为一字不变。

   ⛔ 自动链接只做在**数学正文**上（`opts.only` 白名单）。面板里还有一大片
      **界面提示文字**（标题 / id / 芯片 / 「还差 N 条」那行 / 按钮），
      它们本来就是用节点名拼出来的，链上去没用，还会把正文的「第一次」名额吃掉。
      面板传的是 `only: '.pn-body, .pn-note'`；不给 `only` 就整棵子树照旧。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var MIN_LEN = 2;

  /* ------------------------------------------------------------ 字符归一 */
  /* ⭐ 逐字符 1:1 归一（长度不变 ⇒ 正文下标与词表下标始终对齐）：
       · 各种连字符 / 破折号 → '-'（ASCII 减号、‐ ‑ ‒ – — − 全角等）
       · 变音字母 → 基字母（é→e、ö→o、š→s…；NFD 去组合符）
     于是「表里写 Schröder–Bernstein、正文写 Schroder-Bernstein」也能互相命中。
     ⛔ 只对拉丁字母做 NFD —— 别去动汉字/希腊字母。 */
  var DASHES = '-\u2010\u2011\u2012\u2013\u2014\u2212\uFE63\uFF0D';

  /* 「词内字符」：拉丁字母（含扩展区）、数字、变音符、各色破折号。
     ⛔ 故意**不含**撇号 —— `Zorn's lemma` 里的 `Zorn` 要能链。
     拉丁词条命中区间的左右若落在词内字符上，就算越界（见 boundsOk）。 */
  var WORDCHAR = /[0-9A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\u2010\u2011\u2012\u2013\u2014\u2212\uFE63\uFF0D]/;
  /* 词条里有没有拉丁字母/数字 —— 有才讲词边界（中文词条不受影响） */
  var HAS_LATIN = /[0-9A-Za-z]/;

  function isWordChar(ch) { return !!ch && WORDCHAR.test(ch); }

  function normChar(ch) {
    if (!ch) return ch;
    if (DASHES.indexOf(ch) >= 0) return '-';
    var c = ch.charCodeAt(0);
    if (c < 0x80) return ch;
    if ((c >= 0xC0 && c <= 0x24F) || (c >= 0x1E00 && c <= 0x1EFF)) {
      var d = ch.normalize ? ch.normalize('NFD') : ch;
      return d.charAt(0);
    }
    return ch;
  }
  function norm(s) {
    s = String(s == null ? '' : s);
    var out = '';
    for (var i = 0; i < s.length; i++) out += normChar(s.charAt(i));
    return out;
  }

  /** 拉丁命中区间的左右必须是词边界（中文词条恒真）。 */
  function boundsOk(text, at, len, latin) {
    if (!latin) return true;
    return !isWordChar(at > 0 ? text.charAt(at - 1) : '') &&
      !isWordChar(at + len < text.length ? text.charAt(at + len) : '');
  }

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
      /* ⭐ 词表里存**归一化**后的写法（破折号统一、变音去符）——
         正文匹配时走同一个归一，两边才对得上；长度不变，下标不错位。 */
      var nw = norm(w);
      var f = nw.charAt(0);
      if (!byFirst[f]) byFirst[f] = [];
      var lat = HAS_LATIN.test(nw);
      // 同一个词已经指向这个 id 就不重复加（label 与 aka 常常一样）
      for (var i = 0; i < byFirst[f].length; i++) {
        if (byFirst[f][i].w === nw && byFirst[f][i].id === id) {
          if (isLabel) byFirst[f][i].isLabel = true;   // label 优先
          return;
        }
      }
      byFirst[f].push({ w: nw, id: id, n: nw.length, isLabel: !!isLabel, lat: lat });
    }

    /* ⛔ 「拦词」：**不链**，而且要把这一整段**吃掉**。
       为什么光「不链」不够：「把短正合列送成」里，在「正」处匹配不到『正合列』的话
       就会退到更短的『正合』，于是链出一个错的（正合函子）。
       所以拦词得占住位置、把游标推过去，短词才没机会钻进来。 */
    function addBlocker(word) {
      var w = String(word == null ? '' : word).trim();
      if (w.length < MIN_LEN) return;
      var nw = norm(w);
      var f = nw.charAt(0);
      if (!byFirst[f]) byFirst[f] = [];
      byFirst[f].push({ w: nw, id: null, n: nw.length, isLabel: true, block: true,
        lat: HAS_LATIN.test(nw) });
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
        var cands = byFirst[normChar(text.charAt(i))];
        var got = null, blocked = false;
        if (cands) {
          for (var k = 0; k < cands.length; k++) {
            var c = cands[k];
            // ⚠️ 先看字面：不匹配的候选直接跳过（长度不够 / 字不对）
            if (i + c.n > text.length) continue;
            var slice = text.substr(i, c.n);
            if (slice !== c.w && norm(slice) !== c.w) continue;
            /* ⛔ 拉丁词条必须在**词边界**上 —— 不的话 `prerequisites` 里的
               `site`、`Heine–Borel` 里的 `Borel` 都会被链出去（见文件头）。
               越界的候选直接跳过（更短的候选还有机会）。 */
            if (c.lat && !boundsOk(text, i, c.n, true)) continue;
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
     * @param {Object}  opts    { fromId, priority, only, shortAka }
     *        fromId   站在哪个节点上看 —— 决定 near / far（不再限制链不链）
     *        priority 选择器；命中的子树里的文字**先扫**（正文优先于提示，见 inside()）
     *        only     选择器白名单；只扫落在它里面的文字（面板用它把界面提示排除掉）
     *        shortAka true = 2 字 aka 不再要求邻域（默认 false，噪音大）
     * @returns {number} 加了多少个链接
     */
    function linkify(root, opts) {
      if (!root || !global.document) return 0;
      opts = opts || {};
      var fromId = opts.fromId || null;
      var prio = opts.priority || null;
      var only = opts.only || null;
      var allowShortAka = !!opts.shortAka;

      // 先收集、后修改：边遍历边改 DOM，TreeWalker 会被自己改乱
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var prioTexts = [], restTexts = [];
      var t;
      while ((t = walker.nextNode())) {
        if (!t.nodeValue || !t.nodeValue.trim()) continue;
        if (insideSkipped(t, root)) continue;
        /* ⛔ 只链**正文**（白名单）：界面提示文字（标题 / 芯片 / 「还差 N 条」那行）
           不参与 —— 它们是拿节点名拼出来的，链上去没用还挤掉正文的名额。 */
        if (only && !inside(t, root, only)) continue;
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

    /* ⭐ 回归体检用的**纯匹配**入口（`tools/xlinkcheck.mjs`）：只跑匹配、不碰 DOM。
       ⛔ 体检要跑的就是这个函数本身 —— 别在工具里另写一份口径。 */
    return { linkify: linkify, scan: scan, stats: stats };
  }

  MG.createXLink = createXLink;
})(typeof window !== 'undefined' ? window : globalThis);
