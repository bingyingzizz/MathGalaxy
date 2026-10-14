/* ==========================================================================
   数学星图 · 已读状态（我读过哪些节点）
   --------------------------------------------------------------------------
   这不是内容，也不是引擎 —— 是**用户自己的进度**，只存在浏览器里
   （localStorage，和「可见性」同一套路数）。因此：

     · 不写进 graph.json、不碰任何一条边、不参与布局与分层
     · 图上的标记画在**叠加层**，⛔ 不进位图烘焙 —— 否则每标记一个点就要重烘全图
     · 换设备 / 清缓存就没了：这是**私人状态**，不是账号，也不做云同步

   除了「记没记住」，它还回答一个问题：**下一步该读什么**。
   图里每个节点的入边是有方向的：
     · implication 的 sources  = 前提
     · definition 的 definition = 用到的定义
     （等价与类比不算前置。）
   凡是「前置全都读过了」的未读节点，就是**现在可以读**的。

   ⚠️ 与 visibility.js 的分工：那边管「画不画」，这边管「读没读」。
      两个互不干涉 —— 藏起来的节点照样可以是已读。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var KEY = 'mathgalaxy.read.v1';       // ⛔ 改这个键名 = 所有人的进度清零

  function createReadState(graph) {
    var read = Object.create(null);     // id → true（节点 id 带点和冒号，不能用普通对象）
    var listeners = [];
    var nodes = graph.nodes;
    var showMarks = true;               // 图上画不画已读标记
    var MARK_KEY = 'mathgalaxy.read.show.v1';

    /* ------------------------------------------------ 前置索引（建一次） */
    /* id → [前置 id…]。只认 implication 的前提和 definition 引用的定义：
       等价是「同一个东西的两种说法」，不是前置；类比更不是。 */
    var prereqOf = Object.create(null);
    function buildPrereq(g) {
      prereqOf = Object.create(null);
      g.edges.forEach(function (e) {
        var pres = null, tgt = null;
        if (e.kind === 'implication') { pres = e.sources || []; tgt = e.target; }
        else if (e.kind === 'definition') { pres = e.definition ? [e.definition] : []; tgt = e.usedBy; }
        if (!pres || !pres.length || !tgt || !g.byId[tgt]) return;
        if (!prereqOf[tgt]) prereqOf[tgt] = [];
        for (var i = 0; i < pres.length; i++) {
          if (g.byId[pres[i]] && prereqOf[tgt].indexOf(pres[i]) < 0) prereqOf[tgt].push(pres[i]);
        }
      });
    }

    /* ------------------------------------------------------------ 读写 */
    function load() {
      var raw = null;
      try { raw = global.localStorage ? global.localStorage.getItem(KEY) : null; }
      catch (e) { raw = null; }                    // 无痕模式 / 受限的 file://
      if (!raw) return;
      var list = null;
      try { list = JSON.parse(raw); } catch (e) { return; }
      if (!list || typeof list.forEach !== 'function') return;
      list.forEach(function (id) {
        if (typeof id === 'string' && graph.byId[id]) read[id] = true;
      });
    }

    function save() {
      try {
        if (!global.localStorage) return;
        var ids = Object.keys(read);
        if (ids.length) global.localStorage.setItem(KEY, JSON.stringify(ids));
        else global.localStorage.removeItem(KEY);
      } catch (e) { /* 记不住就算了，不影响看 */ }
    }

    function commit() {
      save();
      listeners.forEach(function (cb) {
        try { cb(); } catch (e) { console.error('[数学星图] 已读回调出错', e); }
      });
    }

    /* ------------------------------------------------------------ 查询 */
    function isRead(id) { return !!read[id]; }
    function readCount() { return Object.keys(read).length; }
    function readIds() { return Object.keys(read); }

    function prereqsOf(id) { return (prereqOf[id] || []).slice(); }

    /** 前置全读过了吗（没有前置 ⇒ 一开始就能读） */
    function isReady(id) {
      var pre = prereqOf[id];
      if (!pre || !pre.length) return true;
      for (var i = 0; i < pre.length; i++) if (!read[pre[i]]) return false;
      return true;
    }

    /** 还差哪些前置没读（面板上用来告诉人「先去看这几条」） */
    function missingPrereqs(id) {
      var pre = prereqOf[id] || [];
      return pre.filter(function (pid) { return !read[pid]; });
    }

    /** 现在能读的未读节点，按 layer 从小到大（浅的在前，和学习顺序一致） */
    function readyList(limit) {
      var out = [];
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (read[n.id]) continue;
        if (isReady(n.id)) out.push(n);
      }
      out.sort(function (a, b) { return (a.layer - b.layer) || (a.id < b.id ? -1 : 1); });
      return limit ? out.slice(0, limit) : out;
    }

    /* ------------------------------------------------------------ 改动 */
    function setNode(id, on) {
      if (!graph.byId[id]) return;
      if (on) { if (read[id]) return; read[id] = true; }
      else { if (!read[id]) return; delete read[id]; }
      commit();
    }
    function toggle(id) { setNode(id, !read[id]); }

    function markMany(ids, on) {
      var hits = 0;
      ids.forEach(function (id) {
        if (!graph.byId[id]) return;
        if (on) { if (!read[id]) { read[id] = true; hits++; } }
        else if (read[id]) { delete read[id]; hits++; }
      });
      if (hits) commit();
    }

    function reset() {
      if (!Object.keys(read).length) return;
      read = Object.create(null);
      commit();
    }

    /* 图上要不要画已读标记（存 localStorage，但**不影响已读数据**） */
    function setShowMarks(on) {
      showMarks = !!on;
      try { if (global.localStorage) global.localStorage.setItem(MARK_KEY, showMarks ? '1' : '0'); }
      catch (e) { /* 忽略 */ }
      commit();
    }
    function isShowMarks() { return showMarks; }

    /* 换了一张图（别的 agent 改了内容 / 外部包加载完）：保留进度，丢掉不存在的 id */
    function rebind(g) {
      graph = g;
      nodes = g.nodes;
      var dropped = 0;
      Object.keys(read).forEach(function (id) {
        if (!g.byId[id]) { delete read[id]; dropped++; }
      });
      buildPrereq(g);
      if (dropped) commit();
    }

    function onChange(cb) {
      listeners.push(cb);
      return function () {
        var i = listeners.indexOf(cb);
        if (i >= 0) listeners.splice(i, 1);
      };
    }

    /* ------------------------------------------------------------ 启动 */
    buildPrereq(graph);
    load();
    try {
      var saved = global.localStorage ? global.localStorage.getItem(MARK_KEY) : null;
      if (saved === '0') showMarks = false;
    } catch (e) { /* 忽略 */ }

    return {
      isRead: isRead,
      readCount: readCount,
      readIds: readIds,
      prereqsOf: prereqsOf,
      isReady: isReady,
      missingPrereqs: missingPrereqs,
      readyList: readyList,
      setNode: setNode,
      toggle: toggle,
      markMany: markMany,
      reset: reset,
      setShowMarks: setShowMarks,
      isShowMarks: isShowMarks,
      rebind: rebind,
      onChange: onChange
    };
  }

  MG.createReadState = createReadState;
})(typeof window !== 'undefined' ? window : globalThis);
