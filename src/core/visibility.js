/* ==========================================================================
   数学星图 · 可见性（哪些点参与绘制）
   --------------------------------------------------------------------------
   左下角的「显示节点」面板改的就是这里。规则只有两条：

     · 被隐藏的节点：不画、不出名字、不响应点击
     · 只要有一端被隐藏，这条连线也一起不画（不留半截悬空的线）

   挑选结果记在 localStorage 里 —— 下次打开还是你挑的那一块。
   引擎的其它部分只问两件事：isNodeVisible(id) / edgeOk(edge)。

   注：hidden 用 Object.create(null) 当字典（节点 id 里带点、带冒号，不能用普通对象）
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var KEY = 'mathgalaxy.hidden.v1';

  function createVisibility(graph) {
    var hidden = Object.create(null);       // id → true
    var listeners = [];
    var nodes = graph.nodes;
    var extraFilter = null;                 // 额外的可见条件（例如「只看主干」）

    /* ------------------------------------------------------------ 读写 */
    function read() {
      var raw = null;
      try { raw = global.localStorage ? global.localStorage.getItem(KEY) : null; }
      catch (e) { raw = null; }                       // 无痕模式 / 受限的 file://
      if (!raw) return;
      var list = null;
      try { list = JSON.parse(raw); } catch (e) { return; }
      if (!list || typeof list.forEach !== 'function') return;
      list.forEach(function (id) {
        if (typeof id === 'string' && graph.byId[id]) hidden[id] = true;
      });
    }

    function write() {
      try {
        if (!global.localStorage) return;
        var ids = Object.keys(hidden);
        if (ids.length) global.localStorage.setItem(KEY, JSON.stringify(ids));
        else global.localStorage.removeItem(KEY);
      } catch (e) { /* 记不住就算了，不影响使用 */ }
    }

    /** 每处改动只走一次：存盘 → 通知（面板重画 + 星图重画） */
    function commit() {
      write();
      listeners.forEach(function (cb) {
        try { cb(); } catch (e) { console.error('[数学星图] 可见性回调出错', e); }
      });
    }

    /* ------------------------------------------------------------ 查询 */
    function isNodeVisible(id) {
      if (hidden[id]) return false;
      if (extraFilter && !extraFilter(id)) return false;
      return true;
    }
    function isNodeHidden(id) { return !isNodeVisible(id); }

    function hiddenCount() { return Object.keys(hidden).length; }

    function visibleCount() {
      var c = 0;
      for (var i = 0; i < nodes.length; i++) if (isNodeVisible(nodes[i].id)) c++;
      return c;
    }

    /** 两个端点都还在，这条线才画 */
    function edgeOk(e) {
      var ids = MG.graphUtil.edgeNodes(e);
      for (var i = 0; i < ids.length; i++) if (!isNodeVisible(ids[i])) return false;
      return true;
    }

    /**
     * 换一个「额外条件」（不动用户手动的隐藏集合）。
     * 例如「只看主干」：传一个 (id) => 是否主干 的函数；传 null 取消。
     */
    function setFilter(fn) {
      if (extraFilter === fn) return;
      extraFilter = fn || null;
      commit();
    }
    function hasFilter() { return !!extraFilter; }

    /* ------------------------------------------------------------ 改动 */
    function setNode(id, visible) {
      if (!graph.byId[id]) return;
      if (visible) { if (!hidden[id]) return; delete hidden[id]; }
      else { if (hidden[id]) return; hidden[id] = true; }
      commit();
    }

    /** 一次勾一批（整个星系 / 整个星团），只通知一次 */
    function setMany(ids, visible) {
      var hits = 0;
      ids.forEach(function (id) {
        if (!graph.byId[id]) return;
        if (visible) { if (hidden[id]) { delete hidden[id]; hits++; } }
        else if (!hidden[id]) { hidden[id] = true; hits++; }
      });
      if (hits) commit();
    }

    function showAll() {
      if (!Object.keys(hidden).length) return;
      hidden = Object.create(null);
      commit();
    }

    function hideAll() {
      if (visibleCount() === 0) return;
      nodes.forEach(function (n) { hidden[n.id] = true; });
      commit();
    }

    function invert() {
      var next = Object.create(null);
      nodes.forEach(function (n) { if (!hidden[n.id]) next[n.id] = true; });
      hidden = next;
      commit();
    }

    /** 只看这些：其余全藏起来 */
    function only(ids) {
      var keep = Object.create(null);
      ids.forEach(function (id) { keep[id] = true; });
      var next = Object.create(null);
      nodes.forEach(function (n) { if (!keep[n.id]) next[n.id] = true; });
      hidden = next;
      commit();
    }

    /**
     * 换了一张图（外部内容包加载完会重建 graph）：
     * 保留挑选结果，但丢掉已经不存在的 id。
     */
    function rebind(g) {
      graph = g;
      nodes = g.nodes;
      var dropped = 0;
      Object.keys(hidden).forEach(function (id) {
        if (!g.byId[id]) { delete hidden[id]; dropped++; }
      });
      if (dropped) commit();
    }

    function onChange(cb) {
      listeners.push(cb);
      return function () {
        var i = listeners.indexOf(cb);
        if (i >= 0) listeners.splice(i, 1);
      };
    }

    /** 恢复上次的挑选（初始状态，不触发回调） */
    read();

    return {
      isNodeVisible: isNodeVisible,
      isNodeHidden: isNodeHidden,
      hiddenCount: hiddenCount,
      visibleCount: visibleCount,
      edgeOk: edgeOk,
      setFilter: setFilter,
      hasFilter: hasFilter,
      setNode: setNode,
      setMany: setMany,
      showAll: showAll,
      hideAll: hideAll,
      invert: invert,
      only: only,
      rebind: rebind,
      onChange: onChange,
      hiddenIds: function () { return Object.keys(hidden); }
    };
  }

  MG.createVisibility = createVisibility;
})(typeof window !== 'undefined' ? window : globalThis);
