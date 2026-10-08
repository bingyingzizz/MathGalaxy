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

      index = view.graph.nodes.map(function (n) {
        var regions = n.regions.map(function (r) {
          var reg = view.graph.regionById[r];
          return reg ? (reg.name + ' ' + (reg.en || '')) : r;
        }).join(' ');
        var st = U.plain(n.statement);
        var nt = U.plain(n.notes);
        var aka = akaOf[n.id] || [];
        var hay = [
          n.label, n.title, n.id, n.type, MG.typeStyle(n.type).name,
          (n.tags || []).join(' '), aka.join(' '), regions, st, nt
        ].join('\n').toLowerCase();

        addWord(n.label);
        (n.tags || []).forEach(addWord);
        aka.forEach(addWord);
        grams2(n.label).forEach(addWord);

        return { node: n, hay: hay, label: n.label, title: n.title, st: st, aka: aka };
      });

      /* 星团名也进词表：「测度的构造」贡献 `测度` */
      view.graph.clusters.forEach(function (c) {
        addWord(c.name);
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
    function termsOf(q) {
      var Q = q.toLowerCase();
      var hit = [];
      for (var i = 0; i < vocab.length; i++) {
        var v = vocab[i];
        if (v.length <= Q.length && Q.indexOf(v) >= 0) hit.push(v);
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
    function score(entry, q) {
      var label = entry.label.toLowerCase();
      var title = entry.title.toLowerCase();
      var s = 0;
      if (label === q) s += 1000;
      if (label.indexOf(q) === 0) s += 500;
      if (label.indexOf(q) >= 0) s += 260;
      if (title.indexOf(q) >= 0) s += 150;
      if (entry.node.id.toLowerCase().indexOf(q) >= 0) s += 120;
      if ((entry.node.tags || []).join(' ').toLowerCase().indexOf(q) >= 0) s += 110;
      if ((entry.aka || []).join(' ').toLowerCase().indexOf(q) >= 0) s += 140;
      if (entry.node.type.toLowerCase().indexOf(q) >= 0) s += 60;
      var i = entry.hay.indexOf(q);
      if (i >= 0) s += 40;
      if (s > 0) s += Math.min(20, entry.node.degree || 0);
      return s;
    }

    function run(q) {
      q = q.trim().toLowerCase();
      items = [];
      if (!q) { render(); return; }

      var terms = termsOf(q);
      var termSet = Object.create(null);
      terms.forEach(function (t) { termSet[t] = 1; });

      /* 命中的问法 → 它指向的节点直接顶到最前（最多认 4 个问法，免得全被顶上来） */
      var boost = Object.create(null), fired = 0;
      for (var hi = 0; hi < hookIndex.length; hi++) {
        var h = hookIndex[hi];
        if (!hookHit(h, q, termSet)) continue;
        if (++fired > 4) break;
        h.to.forEach(function (id) { boost[id] = (boost[id] || 0) + 1; });
      }

      var tot = Object.create(null), cnt = Object.create(null);
      terms.forEach(function (t) {
        index.forEach(function (e) {
          var s = score(e, t);
          if (s <= 0) return;
          tot[e.node.id] = (tot[e.node.id] || 0) + s;
          cnt[e.node.id] = (cnt[e.node.id] || 0) + 1;
        });
      });

      /* 被多个词同时命中的节点加权 —— 「积分」和「极限」都沾的排前面 */
      var byEnt = Object.create(null);
      index.forEach(function (e) { byEnt[e.node.id] = e; });

      var hits = Object.keys(tot).map(function (id) {
        var s = tot[id] * (1 + 0.5 * (cnt[id] - 1));
        if (boost[id]) s += 5000;
        return { id: id, s: s, grp: boost[id] ? 'hook' : 'all' };
      });

      /* ⚠️ 问法指向的节点**可能一个词都没命中**（「怎么比较两个无穷的大小」
         指向的 `def.cardinal` 里既没有「无穷」也没有「大小」）—— 它们进不了
         `tot`，就永远加不上分。所以必须单独补进来。 */
      Object.keys(boost).forEach(function (id) {
        if (byEnt[id] && !tot[id]) hits.push({ id: id, s: 5000, grp: 'hook' });
      });

      hits.sort(function (a, b) { return b.s - a.s; });

      hits.slice(0, 14).forEach(function (h) {
        var e = byEnt[h.id];
        if (!e) return;
        items.push({
          kind: 'node', id: h.id, label: e.label, sub: subOf(e),
          q: markTerm(e, terms), node: e.node, grp: h.grp
        });
      });

      // 板块也当作一种结果
      view.graph.regions.forEach(function (r) {
        if (!r.stat) return;
        if ((r.name + ' ' + (r.en || '')).toLowerCase().indexOf(q) >= 0) {
          items.push({ kind: 'region', id: r.id, label: r.name, sub: r.stat.count + ' 个节点', q: q, grp: 'all' });
        }
      });

      active = items.length ? 0 : -1;
      render();
    }

    function subOf(e) {
      var st = e.st || U.plain(e.title);
      return U.truncate(st || MG.typeStyle(e.node.type).name, 64);
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
      var tagText = it.kind === 'region' ? '板块' : MG.typeStyle(it.node.type).name;
      var regionName = '';
      if (it.kind === 'node' && it.node.regions.length) {
        var r0 = view.graph.regionById[it.node.regions[0]];
        if (r0) regionName = r0.name;
      }
      return '<div class="sr-item' + (i === active ? ' active' : '') + '" data-i="' + i + '">' +
        '<span class="sr-dot" style="background:' + color + '"></span>' +
        '<span class="sr-title">' + mark(it.label, it.q) + '</span>' +
        '<span class="sr-sub">' + U.escapeHtml(tagText) + ' · ' + U.escapeHtml(it.sub) + '</span>' +
        (regionName ? '<span class="sr-region">' + U.escapeHtml(regionName) + '</span>' : '<span class="sr-region">' + U.escapeHtml(tagText) + '</span>') +
        '</div>';
    }

    function render() {
      if (!items.length) {
        var v = input.value.trim();
        results.innerHTML = v
          ? '<div class="sr-empty">没有找到「' + U.escapeHtml(v) + '」相关的节点</div>'
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
            if (g === 'hook') html += '<div class="sr-group">相关问题</div>';
            else if (items[0].grp === 'hook') html += '<div class="sr-group">全部结果</div>';
          }
          html += itemHtml(it, i);
        });
        results.innerHTML = html;
        open = true;
      }
      results.classList.toggle('hidden', !open);
      box.classList.toggle('active', open);
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
