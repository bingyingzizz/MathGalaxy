/* ==========================================================================
   数学星图 · 已读状态（我读过哪些节点）
   --------------------------------------------------------------------------
   这不是内容，也不是引擎 —— 是**用户自己的进度**，只存在浏览器里
   （localStorage，和「可见性」同一套路数）。因此：

     · 不写进 graph.json、不碰任何一条边、不参与布局与分层
     · 图上的标记画在**叠加层**，⛔ 不进位图烘焙 —— 否则每标记一个点就要重烘全图
     · 换设备 / 清缓存就没了：这是**私人状态**，不是账号，也不做云同步

   除了「记没记住」，它还回答一个问题：**这一个节点周围，我标了哪些、还剩哪些**。
   图里每个节点的入边是有方向的：
     · implication 的 sources  = 推出它的前提
     · definition 的 definition = 陈述里引用的定义
     （等价与类比不算。）

   ⛔⛔ **这不是学习顺序，也不再算「能不能开始读了」**（2026-10-16 改的口径）：
     · 这两类来源**合起来**既不是理解本陈述的必要条件，也不是能推出结论的充分条件
       （引用一个定义只是「用到了它」）；
     · 不同证明路线的来源被并在一起（「紧 ⇒ 列紧」与「列紧 ⇒ 紧」互为来源）；
     · 「紧 ⇒ 完备」「列紧 ⇒ 完备」也不意味着学「完备」得先把两条都学完。
     ⇒ 这里只如实回答「相关依赖里还有哪几项没标记已读」。早先导出过
       `isReady` / `readyList`（「前置全读完 = 现在可以读」）—— 那套说法已经删掉，
       免得哪天被当成推荐学习路径接进界面。真要建学习路径，是另一件事。

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
    var showMarks = true;               // 图上画不画已读标记（**不持久化**，见 setShowMarks）
    var MARK_KEY = 'mathgalaxy.read.show.v1';   // 旧版本用过的键，现在启动时删掉

    /* ------------------------------------------------ 相关依赖索引（建一次） */
    /* id → [来源 id…]。只认 implication 的前提和 definition 引用的定义：
       等价是「同一个东西的两种说法」，不是来源；类比更不是。
       ⛔ 这是**事实**（谁推出它、它引用了谁），不是「学习前置」—— 见文件头。 */
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

    /** 相关依赖里还没标记已读的（面板上如实报「还有 N 项没标已读」）。
        ⛔ 别把它读成「先去看这几条才能读本节点」—— 见 readstate.js 文件头。
        ⚠️ 函数名是历史遗留（旧口径叫 prereq），要改就得连 app.js 的钩子一起改。 */
    function missingPrereqs(id) {
      var pre = prereqOf[id] || [];
      return pre.filter(function (pid) { return !read[pid]; });
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

    /* 图上要不要画已读标记。
       ⛔ **故意不持久化**（每次打开都是开的）—— 有一次它存进 localStorage 之后，
          唯一的开关被删掉了，于是老用户永久看不见绿环，界面上无路可退。
          这是个纯显示开关，不值得为它冒那个风险。 */
    function setShowMarks(on) {
      showMarks = !!on;
      commit();
    }
    function isShowMarks() { return showMarks; }

    /* 换了一张图（别的 agent 改了内容 / 外部包加载完）：保留进度，丢掉不存在的 id */
    function rebind(g) {
      graph = g;
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
    /* ⛔ 这里**故意不再读** `mathgalaxy.read.show.v1` —— 那个键是旧版本留下的，
       读它会让「关过一次」的浏览器永久看不见绿环。顺手把它清掉，免得留着误导。 */
    try { if (global.localStorage) global.localStorage.removeItem(MARK_KEY); }
    catch (e) { /* 忽略 */ }

    return {
      isRead: isRead,
      readCount: readCount,
      readIds: readIds,
      prereqsOf: prereqsOf,
      missingPrereqs: missingPrereqs,
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
