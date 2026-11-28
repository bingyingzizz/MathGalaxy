/* ==========================================================================
   数学星图 · 共享主干的证明选择（Task 3）
   --------------------------------------------------------------------------
   点到多条推出边共用的那一段线（共同前提的主干）时，不替用户挑「第一条」：
     · 立即高亮这一组（focus.type === 'fan'：成员边 + 它们的端点保持清晰，其余压暗）；
     · 在点击处附近弹出选择列表（用现有 .floating / .pn-btn 样式），每项显示**人读得懂**的
       推出名与结论名（当前语言）；内部 id 只放在悬浮提示里，不作主文本；
     · 悬停 / 键盘聚焦某项 ⇒ 只预览那一条完整的推出结构；点击 ⇒ 打开它的证明面板；
     · 点别处 / 换节点 / 换边 / Esc ⇒ 关闭并还原先前的焦点；Esc 只清这个临时状态；
     · 指针与触屏同一套（pointerdown）；触屏没有悬停，直接点选。
   纯界面层：不改图、不改几何；成员只来自渲染器给的「可见」命中，隐藏的边不会出现在这里。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  /**
   * deps = { view, graph, panelEl, findEdge(id), focusEdge(id, opts), requestDraw() }
   * 返回 { open(hit), close(), isOpen(), restoreFocus() , persistedFocus() }
   */
  MG.createFanPicker = function (deps) {
    var view = deps.view, graph = deps.graph;
    var box = null, previousFocus = null, lastPointer = { x: 0, y: 0 };

    function T(zh, en) { return MG.isEn ? en : zh; }

    function nodesOf(ids) {
      var set = new Set();
      ids.forEach(function (id) {
        var e = deps.findEdge(id);
        if (e) MG.graphUtil.edgeNodes(e).forEach(function (n) { set.add(n); });
      });
      return set;
    }
    function setFan(hit, ids) {
      view.focus = { type: 'fan', id: hit.id + ':' + ids.join(','), members: new Set(ids), nodes: nodesOf(ids) };
      view.hover = null;
      deps.requestDraw();
    }
    function isOpen() { return !!box; }
    function close(keepFocus) {
      if (!box) return;
      box.remove(); box = null;
      if (!keepFocus && view.focus && view.focus.type === 'fan') view.focus = previousFocus;
      previousFocus = null;
      deps.requestDraw();
    }
    /** 临时 fan 焦点之外「真正」要存进地址栏/历史的焦点 */
    function persistedFocus() { return view.focus && view.focus.type === 'fan' ? previousFocus : view.focus; }

    function edgeNames(e) {
      var tgt = graph.byId[e.target], target = tgt ? MG.titleOf(tgt) : e.target;
      var en = e.title_en == null ? '' : String(e.title_en).trim();
      var own = MG.isEn ? (en || '') : (e.title || en || '');
      var srcs = e.sources.map(function (id) { return graph.byId[id] ? MG.labelOf(graph.byId[id]) : id; }).join(' + ');
      return { primary: own || (srcs + ' ⟹ ' + (tgt ? MG.labelOf(tgt) : e.target)), secondary: target, premises: srcs };
    }

    function open(hit, pointer) {
      close();
      previousFocus = view.focus;
      if (pointer) lastPointer = pointer;
      var ids = Array.from(new Set(hit.members)).filter(function (id) { return !!deps.findEdge(id); }).sort();
      if (!ids.length) { previousFocus = null; return; }
      if (ids.length === 1) { previousFocus = null; deps.focusEdge(ids[0], { center: false }); return; }

      box = document.createElement('div');
      box.id = 'mg-fan-picker'; box.className = 'floating';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-label', T('共同前提 · 选择推导', 'Shared premise — choose an implication'));
      box.style.cssText = 'z-index:99;padding:12px;max-width:min(360px,90vw);max-height:55vh;overflow:auto;position:fixed;';
      var head = document.createElement('div');
      head.style.cssText = 'font-weight:650;margin-bottom:6px';
      head.textContent = T('这一段线被 ' + ids.length + ' 条推导共用 · 选择一条', 'This segment is shared by ' + ids.length + ' implications — choose one');
      box.appendChild(head);

      var buttons = [];
      ids.forEach(function (id) {
        var e = deps.findEdge(id), nm = edgeNames(e), b = document.createElement('button');
        b.type = 'button'; b.className = 'pn-btn'; b.dataset.edge = id;
        b.title = id;                                         // 内部 id 仅作次要诊断信息
        b.style.cssText = 'display:block;margin:7px 0;padding:7px 10px;width:100%;white-space:normal;text-align:left;';
        var h = MG.util.titleHtml(nm.primary);
        if (nm.secondary && nm.secondary !== nm.primary) {
          h += '<div style="font-weight:400;font-size:11px;opacity:.8;margin-top:4px">' + T('结论：', 'Conclusion: ') + MG.util.titleHtml(nm.secondary) + '</div>';
        }
        b.innerHTML = h;
        function preview() { setFan(hit, [id]); }
        function all() { setFan(hit, ids); }
        b.addEventListener('mouseenter', preview); b.addEventListener('focus', preview);
        b.addEventListener('mouseleave', all);
        b.addEventListener('blur', function () { if (box && !box.contains(document.activeElement)) all(); });
        b.addEventListener('click', function () { close(true); view.focus = previousFocusAfterClose; deps.focusEdge(id, { center: false }); });
        box.appendChild(b); buttons.push(b);
      });
      var previousFocusAfterClose = previousFocus;
      var cl = document.createElement('button');
      cl.type = 'button'; cl.className = 'pn-btn'; cl.textContent = T('关闭', 'Close'); cl.onclick = function () { close(); };
      box.appendChild(cl);
      document.body.appendChild(box);

      var rect = box.getBoundingClientRect(), panelRect = deps.panelEl ? deps.panelEl.getBoundingClientRect() : { width: 0, left: 0 };
      var right = panelRect.width && panelRect.left > 100 ? panelRect.left - 8 : global.innerWidth - 8;
      box.style.left = Math.max(8, Math.min(lastPointer.x + 12, right - rect.width)) + 'px';
      box.style.top = Math.max(60, Math.min(lastPointer.y + 12, global.innerHeight - rect.height - 8)) + 'px';
      setFan(hit, ids);
      box.addEventListener('keydown', function (ev) {
        if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
        var i = buttons.indexOf(document.activeElement);
        var n = ev.key === 'ArrowDown' ? Math.min(buttons.length - 1, i + 1) : Math.max(0, i - 1);
        buttons[n].focus(); ev.preventDefault();
      });
    }

    /* 点选择框之外 = 关闭；记下指针位置供下次定位。capture：先于画布自己的 pointerdown。 */
    document.addEventListener('pointerdown', function (ev) {
      lastPointer = { x: ev.clientX, y: ev.clientY };
      if (box && !box.contains(ev.target)) close();
    }, true);
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && box) { ev.preventDefault(); ev.stopImmediatePropagation(); close(); }
    }, true);

    return { open: open, close: close, isOpen: isOpen, persistedFocus: persistedFocus };
  };
})(typeof window !== 'undefined' ? window : globalThis);
