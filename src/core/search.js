/* ==========================================================================
   数学星图 · 搜索
   --------------------------------------------------------------------------
   在左上角输入框里搜：节点名称 / 英文名 / id / 标签 / 别名 / 陈述正文 / 板块名。
   键盘：↑ ↓ 选择，Enter 跳转，Esc 清空。

   ⭐ 多词查询 —— 整串匹配之外，还会把输入里「认识的词」挑出来分别打分再合并。
   整串匹配的问题是：打一个词很准，打一整句话一条都给不出。
   词表 = 节点 label + tags + 别名（`src/data/aliases.js`）+ label 的 2-gram。
   例：「什么时候积分和极限能换顺序」→ 挑出 `积分` `极限` 两个词分别打分再合并。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  /* 只当连接词用、进了词表只会添乱的双字组合 */
  var STOP = {
    '两个': 1, '什么': 1, '时候': 1, '一个': 1, '可以': 1, '怎么': 1, '为什': 1, '么样': 1,
    '这些': 1, '那些': 1, '它们': 1, '我们': 1, '这样': 1, '那样': 1, '如何': 1, '是否': 1,
    '的时': 1, '和极': 1, '能换': 1
  };

  function createSearch(box, input, results, view, hooks) {
    var items = [];
    var active = -1;
    var open = false;
    /* ⭐ 命中总数（**没有截断过的**）与展示条数：结果列表底部那行「共 N 项」要用，
       读屏的那句也要用（原来它报的是「14 条结果」—— 那是展示条数，不是命中数）。 */
    var hitTotal = 0;

    /* --------------------------------------------------------- 建立索引 */
    var index = [];
    var vocab = [];        // 多词查询的词表（已小写、已去重）
    var hookIndex = [];    // 问题钩子（src/data/aliases.js），把一句问话映射到节点

    /* label 里能当「词」用的 2-gram：`数列极限` → `数列` `列极` `极限`。
       ⚠️ 只取「汉字 + 汉字」的 2-gram ——
         · 3-gram 会造出「控制收」「制收敛」这种垃圾；
         · 拉丁 2-gram 会造出 `er` `in` `fu` 这种碎片，于是乱码输入
           （`qwertyuiop` 里含 `er`）也能匹配一大片，必须排除。
       拉丁/英文的检索靠 label、tags、别名整词命中，不靠切碎。
       ⚠️ 按码点切：`ℝ` `𝒫` 这类字符占两个 UTF-16 码元。 */
    function isCJK(ch) {
      var c = ch.codePointAt(0);
      return c >= 0x4e00 && c <= 0x9fff;
    }
    function grams2(s) {
      var a = Array.from(String(s || ''));
      var out = [];
      for (var i = 0; i + 2 <= a.length; i++) {
        if (!isCJK(a[i]) || !isCJK(a[i + 1])) continue;
        var g = a[i] + a[i + 1];
        if (!STOP[g]) out.push(g);
      }
      return out;
    }

    function reindex() {
      var seen = Object.create(null);
      function addWord(w) {
        w = String(w == null ? '' : w).trim().toLowerCase();
        if (w.length >= 2) seen[w] = 1;
      }

      /* 别名来自内容层 src/data/aliases.js；没挂上也不影响 */
      var AL = MG.aliases || null;
      var akaOf = Object.create(null);
      if (AL && AL.nodes) {
        AL.nodes.forEach(function (r) { if (r && r.id) akaOf[r.id] = r.aka || []; });
      }

      /* ⭐ 记号表（src/data/notation.js）也进检索。
         不然 `F↓G`、`♯`、`K[k]`、`𝒞/T` 这些符号永远搜不到 —— 记号表登记了也没用。
         做法：节点正文里用到了某条记号的 LaTeX 命令，就把那条记号的
         **渲染形态（uni）与中文名（name）** 补进这个节点的检索串。 */
      var NOT = MG.notation || null;
      var notEntries = ((NOT && NOT.entries) || []).map(function (e) {
        var pieces = String(e.tex || '').split(',').map(function (s) { return s.trim().toLowerCase(); })
          .filter(function (s) { return s.length >= 2; });
        return { pieces: pieces, uni: String(e.uni || ''), name: String(e.name || '') };
      }).filter(function (e) { return e.pieces.length || e.name; });

      function notationForms(hay, onHit) {
        var extra = '';
        for (var i = 0; i < notEntries.length; i++) {
          var e = notEntries[i];
          var hit = false;
          for (var j = 0; j < e.pieces.length; j++) {
            if (e.pieces[j] && hay.indexOf(e.pieces[j]) >= 0) { hit = true; break; }
          }
          if (!hit && e.name && hay.indexOf(e.name.toLowerCase()) >= 0) hit = true;
          if (hit) {
            /* ⚠️ hay 已经 toLowerCase 过了，追加的形态也必须一起小写 ——
               否则 `K[k]`、`M(f)`、`E^{p,q}_{r}` 这些带大写字母的记号照样搜不到。 */
            extra += ' ' + e.uni.toLowerCase() + ' ' + e.name.toLowerCase();
            if (onHit) onHit(e);
          }
        }
        return extra;
      }

      index = view.graph.nodes.map(function (n) {
        var regions = n.regions.map(function (r) {
          var reg = view.graph.regionById[r];
          return reg ? (reg.name + ' ' + (reg.en || '')) : r;
        }).join(' ');
        var st = U.plain(n.statement);
        var nt = U.plain(n.notes);
        var ab = n.abstract_en ? U.plain(n.abstract_en) : '';   // 英文摘要（T2.2）
        var stEn = n.statement_en ? U.plain(n.statement_en) : '';   // 英文陈述（T3.2）
        var aka = akaOf[n.id] || [];
        var hay = [
          n.label, n.title, n.label_en || '', n.title_en || '', ab, stEn,
          n.id, n.type, MG.typeStyle(n.type).name,
          (n.tags || []).join(' '), aka.join(' '), regions, st, nt
        ].join('\n').toLowerCase();

        addWord(n.label);
        addWord(n.label_en);        // 英文短标签（T1.1）
        addWord(n.title_en);        // 正式英文名（T1.1）
        (n.tags || []).forEach(addWord);
        aka.forEach(addWord);
        grams2(n.label).forEach(addWord);

        /* 记号表：命中的记号把「渲染形态 + 中文名」补进 hay 与词表。
           ⚠️ 必须拿**原文**（留着 LaTeX）去匹配 —— U.plain() 会把公式整个剥掉，
           剥完之后 `\sharp`、`\downarrow` 全不见了，记号表就永远匹配不上。 */
        var rawHay = [n.label, n.title, (n.tags || []).join(' '),
          n.statement || '', n.notes || ''].join('\n').toLowerCase();
        hay += notationForms(rawHay, function (e) { addWord(e.name); addWord(e.uni); });

        /* T2.4：英文模式下搜索结果的**显示**也要用英文名（hay 里早就有它们，
           这里是把它们端到结果行上）。⛔ 中文模式一字不变。 */
        return { node: n, hay: hay, label: n.label, title: n.title, st: st, aka: aka,
          /* ⭐ 摘要的两种口径都在这里算好（索引期一次，别在每次按键时算）：
             `st`  = 剥掉公式（旧口径，仍有别的用处）
             `stm` = **保留可读公式**（plainMath：`$x$`→`x`、`$\emptyset$`→`∅`）—— 结果行用它 */
          stm: U.plainMath(n.statement),
          ttl: U.plain(n.title),
          refs: (n.refs || []).slice(),
          label_en: n.label_en || '', title_en: n.title_en || '',
          st_en: n.abstract_en ? U.plain(n.abstract_en) : (n.statement_en ? U.plain(n.statement_en) : ''),
          stm_en: n.abstract_en ? U.plainMath(n.abstract_en) : (n.statement_en ? U.plainMath(n.statement_en) : '') };
      });

      /* 星团名也进词表：「测度的构造」贡献 `测度`；英文模式下英文星团名也要能搜到 */
      view.graph.clusters.forEach(function (c) {
        addWord(c.name);
        if (c.en) addWord(c.en);
        grams2(c.name).forEach(addWord);
      });

      vocab = Object.keys(seen);

      /* 问题钩子要等词表建好才能切词，所以放在最后 */
      hookIndex = ((AL && AL.hooks) || []).map(function (h) {
        return {
          q: String(h.q == null ? '' : h.q).toLowerCase(),
          to: h.to || [],
          terms: []
        };
      });
      hookIndex.forEach(function (h) { h.terms = termsOf(h.q).slice(1); });
    }

    /* 输入像不像这个问法？两种判据：
       ① 一问一答的字面包含（用户打的就是那句话，或者只打了它的前半截）；
       ② 这个问法的词**大半出现**在输入里 —— 且至少要两个，
          否则光打一个「完备」就会把一堆问法全勾出来。 */
    function hookHit(h, q, termSet) {
      if (!h.q) return false;
      if (q.indexOf(h.q) >= 0) return true;                    // 打的比问法还长
      if (q.length >= 4 && h.q.indexOf(q) >= 0) return true;   // 只打了问法的一截
      if (h.terms.length < 2) return false;
      var c = 0;
      for (var i = 0; i < h.terms.length; i++) if (termSet[h.terms[i]]) c++;
      return c >= 2 && c >= Math.ceil(h.terms.length * 0.6);
    }

    /* ------------------------------------------------- 把输入切成若干词 */
    /* 整串永远算一个词 —— 这样「label / 别名 完全等于输入」这类精确匹配不会退化。
       ⚠️ 不要把「被更长命中项包含的词」丢掉：`实数完备` 同时命中别名「实数完备」
          和词「实数」「完备」，只留最长的那个会让下面一整片节点全部召不回来。
          长词在前、短词在后，靠打分自然分层。 */
    /* 一个词条在查询里的每次出现，前后是不是「词边界」。
       ⭐ T3.1 修：词表里有 `ive` / `id` 这类从记号表、缩写里来的**短 ASCII 碎片**，
          它们会钻到长英文词里面去 —— 搜 `preadditive` 会被切成 `ive` 之类的词，
          于是一堆含 `-ive` 的节点涌上来，真正含 `preadditive` 的那个反而被挤出去。
          现在拉丁词条要求**词边界命中**（中文词条不受影响 —— CJK 没有词边界可言）。 */
    function wordAligned(Q, v) {
      if (!/^[a-z]/.test(v)) return true;            // 非拉丁开头：照旧（中文 / 符号）
      var from = 0, i;
      while ((i = Q.indexOf(v, from)) >= 0) {
        var before = i === 0 ? '' : Q[i - 1];
        var after = Q[i + v.length] || '';
        var okB = !/[a-z0-9]/.test(before);
        var okA = !/[a-z0-9]/.test(after);
        if (okB && okA) return true;
        from = i + 1;
      }
      return false;
    }

    function termsOf(q) {
      var Q = q.toLowerCase();
      var hit = [];
      for (var i = 0; i < vocab.length; i++) {
        var v = vocab[i];
        if (v.length <= Q.length && Q.indexOf(v) >= 0 && wordAligned(Q, v)) hit.push(v);
      }
      hit = hit.filter(function (v, i, a) { return a.indexOf(v) === i; });
      hit.sort(function (a, b) { return b.length - a.length; });

      var out = [Q];
      hit.slice(0, 5).forEach(function (v) { if (v !== Q) out.push(v); });
      return out;
    }

    /* 条目上要高亮的那个词：优先用命中 label/title 的最长词 */
    function markTerm(e, terms) {
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (e.label.toLowerCase().indexOf(t) >= 0) return t;
      }
      for (var j = 0; j < terms.length; j++) {
        if (e.title.toLowerCase().indexOf(terms[j]) >= 0) return terms[j];
      }
      return terms[0];
    }

    /* ----------------------------------------------------------- 打分 */
    /* ⭐⭐ 中英名字**同等待遇**（2026-10-16 修）。踩过的坑：精确匹配原先只认中文
       `label`，于是搜 `compact` 时 —— `label_en` 正好是 `compact` 的 def.compact
       只拿到「别名含」那档的分，被 `compactly generated` 压住；两者最后只差
       degree 那两分，**谁连得多谁排前面**，跟「匹不匹配」已经没关系了。
       现在按「匹配得有多准」分档，**取最高的那一档、不叠加**：
         精确名（中文名 / 英文短名 / 英文正式名）     1000
         精确 id                                     850
         名字前缀                                    500
         精确别名                                    400
         名字包含                                    260
         id 含                                       240
         别名包含                                    150
         标签含 110 · 类型名含 60 · 正文（hay）含 40
       ⛔ degree **不再是加分项**：它只在总分相同时当次序（见 run()），
          这样「连接多」永远挤不掉「匹配得更准」。
       ⚠️ 为什么「精确别名」压在「名字前缀」下面：aka 里混着大量**搜索关键词**
          （ax.choice 的 aka 就有个光秃秃的 `Zorn`）。要是精确别名给最高档，
          搜 `zorn` 会让「选择公理」压过「佐恩引理」—— 实测就是这个结果，
          而 `Zorn's Lemma` 才是那个名字。别名再准也只是别名。 */
    function score(entry, q) {
      var nf = [entry.label, entry.title, entry.label_en, entry.title_en];
      var i, v, exact = false, prefix = false, has = false;
      for (i = 0; i < nf.length; i++) {
        v = String(nf[i] || '').toLowerCase();
        if (!v) continue;
        if (v.indexOf(q) >= 0) has = true;
        if (v === q) exact = true;
        if (v.indexOf(q) === 0) prefix = true;
      }
      var aka = entry.aka || [], akaExact = false, akaHas = false;
      for (i = 0; i < aka.length; i++) {
        v = String(aka[i] || '').toLowerCase();
        if (!v) continue;
        if (v === q) akaExact = true;
        if (v.indexOf(q) >= 0) akaHas = true;
      }
      var id = entry.node.id.toLowerCase();
      var s = 0;
      if (exact) s = 1000;
      else if (id === q) s = 850;
      else if (prefix) s = 500;
      else if (akaExact) s = 400;
      else if (has) s = 260;
      /* id 里含（`prop.measurable-closure` 这类）—— id 是英文词干，英文查询的实际
         检索面之一。⛔ 别把这档删掉：删了之后「只有 id 里有这个英文词」的节点会
         掉到「正文里提过一句」的节点后面（2026-10-16 实测过）。 */
      else if (id.indexOf(q) >= 0) s = 240;
      else if (akaHas) s = 150;
      else if (String((entry.node.tags || []).join(' ')).toLowerCase().indexOf(q) >= 0) s = 110;
      else if (entry.node.type.toLowerCase().indexOf(q) >= 0) s = 60;
      /* 正文 / 英文摘要 / 别的字段里也提到了 —— 宽泛命中，加一点但不改档 */
      if (entry.hay.indexOf(q) >= 0) s += 40;
      return s;
    }

    function run(q) {
      q = q.trim().toLowerCase();
      items = [];
      /* ⭐ `ref:` 前缀 = **只搜书目/出处**（`ref:I.5`、`ref:Munkres`）。
         为什么单开一条路：refs 不进 hay（章节号进了 hay 会把普通搜索淹掉，
         `I.5` 那种坐标会到处误命中），但「按书号找节点」是真需求 —— 所以做成
         显式前缀，只在用户明说要搜出处时才查，且只按 refs 打分。 */
      var refMode = false;
      var refQ = '';
      var m0 = /^ref\s*[:：]\s*(.*)$/.exec(q);
      if (m0) { refMode = true; refQ = m0[1].trim(); q = refQ; }
      if (!q) { render(); return; }

      var terms = termsOf(q);
      var termSet = Object.create(null);
      terms.forEach(function (t) { termSet[t] = 1; });

      /* 命中的问法 → 它指向的节点直接顶到最前（最多认 4 个问法，免得全被顶上来） */
      var boost = Object.create(null), fired = 0;
      if (!refMode) {
        for (var hi = 0; hi < hookIndex.length; hi++) {
          var h = hookIndex[hi];
          if (!hookHit(h, q, termSet)) continue;
          if (++fired > 4) break;
          h.to.forEach(function (id) { boost[id] = (boost[id] || 0) + 1; });
        }
      }

      var tot = Object.create(null), cnt = Object.create(null);
      if (refMode) {
        /* 只按 refs 打分：整条出处完全等于输入 1000，含它 800 */
        index.forEach(function (e) {
          var best = 0;
          for (var i = 0; i < e.refs.length; i++) {
            var r = String(e.refs[i]).toLowerCase();
            if (r === q) { best = 1000; break; }
            if (r.indexOf(q) >= 0) best = 800;
          }
          if (best) { tot[e.node.id] = best; cnt[e.node.id] = 1; }
        });
      } else {
        terms.forEach(function (t) {
          index.forEach(function (e) {
            var s = score(e, t);
            if (s <= 0) return;
            tot[e.node.id] = (tot[e.node.id] || 0) + s;
            cnt[e.node.id] = (cnt[e.node.id] || 0) + 1;
          });
        });
      }

      /* 被多个词同时命中的节点加权 —— 「积分」和「极限」都沾的排前面 */
      var byEnt = Object.create(null);
      index.forEach(function (e) { byEnt[e.node.id] = e; });

      var hits = Object.keys(tot).map(function (id) {
        var s = tot[id] * (1 + 0.5 * (cnt[id] - 1));
        if (boost[id]) s += 5000;
        var e = byEnt[id];
        return { id: id, s: s, deg: e ? (e.node.degree || 0) : 0, grp: boost[id] ? 'hook' : 'all' };
      });

      /* ⚠️ 问法指向的节点**可能一个词都没命中**（「怎么比较两个无穷的大小」
         指向的 `def.cardinal` 里既没有「无穷」也没有「大小」）—— 它们进不了
         `tot`，就永远加不上分。所以必须单独补进来。 */
      Object.keys(boost).forEach(function (id) {
        var e = byEnt[id];
        if (e && !tot[id]) hits.push({ id: id, s: 5000, deg: e.node.degree || 0, grp: 'hook' });
      });

      /* ⭐ 同分时的次序：连接多的在前（degree），再按 id 定死。
         全是**次序**，不是加分项 —— ⛔ 早先 degree 是加进总分的（最高 +20），
         于是「连得多」的宽泛命中能把「名字正好就是它」的那条顶下去
         （用户报的 compact 就是这么翻的）。 */
      hits.sort(function (a, b) {
        return (b.s - a.s) || (b.deg - a.deg) || (a.id < b.id ? -1 : 1);
      });

      /* ⭐ 只展示前 14 条，但**真实总数要说出来**（2026-10-16 用户报的：
         搜「定义」实际 345 条、界面只显示 14 条，此前界面上没有任何提示）。 */
      hitTotal = hits.length;
      hits.slice(0, 14).forEach(function (h) {
        var e = byEnt[h.id];
        if (!e) return;
        items.push({
          kind: 'node', id: h.id, label: e.label, sub: subOf(e),
          label_en: e.label_en,                 // ⭐ 英文模式显示用（T2.4）
          q: markTerm(e, terms), node: e.node, grp: h.grp
        });
      });

      // 板块也当作一种结果
      if (!refMode) {
        view.graph.regions.forEach(function (r) {
          if (!r.stat) return;
          if ((r.name + ' ' + (r.en || '')).toLowerCase().indexOf(q) >= 0) {
            items.push({ kind: 'region', id: r.id, label: MG.regionName(r),
              sub: MG.t('{n} 个节点', { n: r.stat.count }), q: q, grp: 'all' });
          }
        });
      }

      active = items.length ? 0 : -1;
      render();
    }

    /* ----------------------------------------------------------- 摘要行 */
    /* ⭐ 结果行底下那行摘要（2026-10-16 改口径）。
       旧做法：`U.plain(statement)` —— 公式整个被换成空格，于是出现
         「设 是一个集合族，且 。 是 的选择函数，当且仅当 是函数， ； 。」
       这种空句（709 个节点里 153 个，用户报的）。
       现在按「读得通」优先挑：
         ① 用 `plainMath`（简单公式转成 Unicode 记号后**留下**）：设 F 是一个集合族，且 ∅ ∉ F。
         ② 整段不通顺就取**第一句通顺的**（句子级挑，别把破句子端出去）
         ③ 还不行退回 title（多半本来就是一句干净的话）
         ④ 最后才用类型名
       ⛔ 判据是「有没有空槽 + 有没有足够的内容」，不是「长度」——
          宁可少给信息，也别给一句读不通的。 */
    var BAD_SNIPPET = /([，,、；;]\s*[。．，,、；;])|((of|is|are|in|to|the|a|an|on)\s*[,.;])|(^\s*[,.;。])|([（(]\s*[）)])/;
    function meaningful(s) { return (String(s).match(/[\u4e00-\u9fff0-9A-Za-z]/g) || []).length; }
    function cleanSnippet(s) { return !!s && !BAD_SNIPPET.test(s) && meaningful(s) >= 8; }
    /** 第一句读得通的（句号 / 分号 / 叹问号断句，连标点一起留下）
        ⚠️ 手写切句、不用后行断言（`(?<=…)`）—— 用户的安卓平板 Chromium 偏旧，别赌它支持 */
    var SENT_END = '。．！？；;.!?';
    function firstCleanSentence(s) {
      var t = String(s), buf = '';
      for (var i = 0; i < t.length; i++) {
        buf += t.charAt(i);
        if (SENT_END.indexOf(t.charAt(i)) < 0) continue;
        if (cleanSnippet(buf)) return buf.trim();
        buf = '';
      }
      return cleanSnippet(buf) ? buf.trim() : '';
    }

    function subOf(e) {
      var cands = MG.isEn
        ? [e.stm_en, e.st_en, e.title_en, e.ttl, e.label_en]
        : [e.stm, e.ttl];
      for (var i = 0; i < cands.length; i++) {
        var s = cands[i];
        if (!s) continue;
        if (cleanSnippet(s)) return U.truncate(s, 64);
        var one = firstCleanSentence(s);
        if (one) return U.truncate(one, 64);
      }
      return MG.typeStyle(e.node.type).name;
    }

    function mark(text, q) {
      if (!q) return U.escapeHtml(text);
      var i = text.toLowerCase().indexOf(q);
      if (i < 0) return U.escapeHtml(text);
      return U.escapeHtml(text.slice(0, i)) + '<mark>' +
        U.escapeHtml(text.slice(i, i + q.length)) + '</mark>' +
        U.escapeHtml(text.slice(i + q.length));
    }

    function itemHtml(it, i) {
      var color = it.kind === 'region'
        ? (view.graph.regionById[it.id] || {}).color || '#ccc'
        : MG.typeStyle(it.node.type).color;
      var tagText = it.kind === 'region' ? MG.t('板块') : MG.typeStyle(it.node.type).name;
      var regionName = '';
      if (it.kind === 'node' && it.node.regions.length) {
        var r0 = view.graph.regionById[it.node.regions[0]];
        if (r0) regionName = MG.regionName(r0);
      }
      return '<div class="sr-item' + (i === active ? ' active' : '') + '" data-i="' + i +
        '" id="sr-item-' + i + '" role="option" aria-selected="' + (i === active ? 'true' : 'false') + '">' +
        '<span class="sr-dot" style="background:' + color + '"></span>' +
        '<span class="sr-title">' + mark(MG.isEn ? (it.label_en || it.label) : it.label, it.q) + '</span>' +
        '<span class="sr-sub">' + U.escapeHtml(tagText) + ' · ' + U.escapeHtml(it.sub) + '</span>' +
        (regionName ? '<span class="sr-region">' + U.escapeHtml(regionName) + '</span>' : '<span class="sr-region">' + U.escapeHtml(tagText) + '</span>') +
        '</div>';
    }

    function render() {
      if (!items.length) {
        var v = input.value.trim();
        results.innerHTML = v
          ? '<div class="sr-empty">' + U.escapeHtml(MG.t('没有找到「{名}」相关的节点', { 名: v })) +
            '<br><span class="sr-empty-tip">' +
            U.escapeHtml(MG.t('按书号 / 章节号找的话，用 ref: 前缀，例如 ref:I.5')) + '</span></div>'
          : '';
        open = !!v;
      } else {
        /* 分组小标题只是装饰，不进 items —— 所以 data-i 仍然等于 items 的下标 */
        var html = '';
        var last = null;
        items.forEach(function (it, i) {
          var g = it.grp || 'all';
          if (g !== last) {
            last = g;
            if (g === 'hook') html += '<div class="sr-group">' + U.escapeHtml(MG.t('相关问题')) + '</div>';
            else if (items[0].grp === 'hook') html += '<div class="sr-group">' + U.escapeHtml(MG.t('全部结果')) + '</div>';
          }
          html += itemHtml(it, i);
        });
        /* ⭐ 截断要说出来（⛔ 不是 .sr-item：它不可点，也不算一条结果） */
        if (hitTotal > items.length) {
          html += '<div class="sr-more">' +
            U.escapeHtml(MG.t('共 {n} 项，只显示前 {m} 项 —— 继续打字缩小范围',
              { n: hitTotal, m: items.length })) + '</div>';
        }
        results.innerHTML = html;
        open = true;
      }
      results.classList.toggle('hidden', !open);
      box.classList.toggle('active', open);
      syncA11y();
    }

    /* 可达性：把「下拉开没开 / 当前高亮第几条 / 一共几条」同步给读屏。
       ⚠️ 键盘 ↑↓ / Enter / Esc 早就有了，缺的一直是这几个属性。
       ⚠️ 「一共几条」要用**命中总数**，不是展示条数 —— 否则读屏也听到「14 条结果」。 */
    var liveEl = document.getElementById('search-live');
    function syncA11y() {
      input.setAttribute('aria-expanded', open ? 'true' : 'false');
      var ok = open && active >= 0 && items[active];
      if (ok) input.setAttribute('aria-activedescendant', 'sr-item-' + active);
      else input.removeAttribute('aria-activedescendant');
      if (liveEl) {
        liveEl.textContent = !open ? ''
          : (items.length
            ? MG.t('{n} 条结果，当前第 {k} 条', { n: hitTotal || items.length, k: ok ? active + 1 : '—' })
            : MG.t('没有结果'));
      }
    }

    function choose(i) {
      var it = items[i];
      if (!it) return;
      if (it.kind === 'region') hooks.onRegion && hooks.onRegion(it.id);
      else hooks.onNode && hooks.onNode(it.id);
      close();
    }

    function close() {
      open = false;
      active = -1;
      results.classList.add('hidden');
      box.classList.remove('active');
      syncA11y();
    }

    function clear() {
      input.value = '';
      items = [];
      close();
    }

    /* ---------------------------------------------------------- 事件 */
    input.addEventListener('input', function () { run(input.value); });
    input.addEventListener('focus', function () {
      box.classList.add('active');
      if (input.value.trim()) run(input.value);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!items.length) return;
        e.preventDefault();
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        open = true;
        render();
        var el = results.querySelector('.sr-item.active');
        if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        choose(active < 0 ? 0 : active);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (input.value) clear(); else { close(); input.blur(); }
      }
    });
    input.addEventListener('blur', function () { setTimeout(close, 140); });

    results.addEventListener('mousedown', function (e) {
      var el = e.target.closest ? e.target.closest('.sr-item') : null;
      if (!el) return;
      e.preventDefault();
      choose(parseInt(el.getAttribute('data-i'), 10));
    });

    document.addEventListener('mousedown', function (e) {
      if (!box.contains(e.target)) close();
    });

    return {
      reindex: reindex,
      clear: clear,
      close: close,
      focus: function () { input.focus(); input.select(); }
    };
  }

  MG.createSearch = createSearch;
})(typeof window !== 'undefined' ? window : globalThis);
