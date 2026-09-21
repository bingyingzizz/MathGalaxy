/* ==========================================================================
   数学星图 · 搜索
   --------------------------------------------------------------------------
   在左上角输入框里搜：节点名称 / 英文名 / id / 标签 / 陈述正文 / 板块名。
   键盘：↑ ↓ 选择，Enter 跳转，Esc 清空。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  function createSearch(box, input, results, view, hooks) {
    var items = [];
    var active = -1;
    var open = false;

    /* --------------------------------------------------------- 建立索引 */
    var index = [];
    function reindex() {
      index = view.graph.nodes.map(function (n) {
        var regions = n.regions.map(function (r) {
          var reg = view.graph.regionById[r];
          return reg ? (reg.name + ' ' + (reg.en || '')) : r;
        }).join(' ');
        var st = U.plain(n.statement);
        var nt = U.plain(n.notes);
        var hay = [
          n.label, n.title, n.id, n.type, MG.typeStyle(n.type).name,
          (n.tags || []).join(' '), regions, st, nt
        ].join('\n').toLowerCase();
        return { node: n, hay: hay, label: n.label, title: n.title, st: st };
      });
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

      var hits = [];
      index.forEach(function (e) { var s = score(e, q); if (s > 0) hits.push({ e: e, s: s }); });
      hits.sort(function (a, b) { return b.s - a.s; });
      hits.slice(0, 14).forEach(function (h) {
        items.push({ kind: 'node', id: h.e.node.id, label: h.e.label, sub: subOf(h.e), q: q, node: h.e.node });
      });

      // 板块也当作一种结果
      view.graph.regions.forEach(function (r) {
        if (!r.stat) return;
        if ((r.name + ' ' + (r.en || '')).toLowerCase().indexOf(q) >= 0) {
          items.push({ kind: 'region', id: r.id, label: r.name, sub: r.stat.count + ' 个节点', q: q });
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

    function render() {
      if (!items.length) {
        var v = input.value.trim();
        results.innerHTML = v
          ? '<div class="sr-empty">没有找到「' + U.escapeHtml(v) + '」相关的节点</div>'
          : '';
        open = !!v;
      } else {
        results.innerHTML = items.map(function (it, i) {
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
        }).join('');
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
