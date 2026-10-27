/* ==========================================================================
   数学星图 · 分层（依赖深度）
   --------------------------------------------------------------------------
   依赖方向是「前置 → 依赖它的」：

     推出   implication: sources → target
     定义   definition : definition → usedBy
     等价   equivalence: 双向（互为等价的点必然同层）

   ⚠️ 等价关系会造成环（{选择公理, 良序定理, 佐恩引理, Hausdorff, Tukey}
      是一整个环；{紧, 全有界, 列紧, 完备} 也是），所以**不能直接当 DAG 算层号**。
      做法：Tarjan 缩点 → 在缩点图上算最长路径 → 每个点取它所在分量的层号，
      等价的那几个自然落在同一层。

   弱边（类比）不参与分层 —— 它不是逻辑依赖。

   ⭐ 「推论」边（`{ kind:'implication', layer:false }`）**也不参与分层** ——
      它是一条真实的推出，但不是目标的「前提」（用高级工具回头证低级定理），
      所以既不抬高目标的层号，也不该被分层滑杆当成依赖。
      ⛔ 只跳 implication；equivalence / definition 一个都不动。

   层号**不写进内容**：连线一改，层号就该跟着变，所以每次打开现算。
   算完写在节点上（n.layer）和图对象上（graph.maxLayer / graph.layerSizes），
   图例的分层开关与详情面板直接用它们。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  function computeLayers(graph) {
    var nodes = graph.nodes;
    var n = nodes.length;
    var index = Object.create(null);
    nodes.forEach(function (nd, i) { index[nd.id] = i; });

    /* ------------------------------------------- 1. 邻接表（前置 → 后） */
    var out = [];
    for (var i = 0; i < n; i++) out.push([]);
    function link(a, b) {
      var ia = index[a], ib = index[b];
      if (ia == null || ib == null || ia === ib) return;
      out[ia].push(ib);
    }
    graph.edges.forEach(function (e) {
      if (e.kind === 'implication') {
        /* ⭐ 推论边（layer:false）：真实的推出，但**不是前提** ⇒ 不参与分层。
           跳过它只影响「target 不再被这条边抬高」，其余一切照旧 ——
           它也**不会**凭空制造反方向的依赖（那会让 source 掉层）。 */
        if (e.layer === false) return;
        (e.sources || []).forEach(function (s) { link(s, e.target); });
      } else if (e.kind === 'definition') {
        link(e.definition, e.usedBy);
      } else if (e.kind === 'equivalence') {
        link(e.a, e.b); link(e.b, e.a);
      }
      /* analogy（弱边）不算 */
    });

    /* ------------------------------------------- 2. Tarjan 缩点（迭代版） */
    var idx = new Int32Array(n).fill(-1);
    var low = new Int32Array(n);
    var onStk = new Uint8Array(n);
    var stk = [], compOf = new Int32Array(n).fill(-1), compCount = 0;
    var counter = 0;

    for (var root = 0; root < n; root++) {
      if (idx[root] !== -1) continue;
      var work = [[root, 0]];
      while (work.length) {
        var frame = work[work.length - 1];
        var v = frame[0], pi = frame[1];
        if (pi === 0) { idx[v] = low[v] = counter++; stk.push(v); onStk[v] = 1; }
        var ns = out[v];
        var advanced = false;
        for (var k = pi; k < ns.length; k++) {
          var w = ns[k];
          if (idx[w] === -1) { frame[1] = k + 1; work.push([w, 0]); advanced = true; break; }
          if (onStk[w] && idx[w] < low[v]) low[v] = idx[w];
        }
        if (advanced) continue;
        frame[1] = ns.length;
        if (low[v] === idx[v]) {
          for (;;) {
            var u = stk.pop();
            onStk[u] = 0;
            compOf[u] = compCount;
            if (u === v) break;
          }
          compCount++;
        }
        work.pop();
        if (work.length) {
          var p = work[work.length - 1][0];
          if (low[v] < low[p]) low[p] = low[v];
        }
      }
    }

    /* ------------------------------------------- 3. 缩点图 + 最长路径 */
    var cadj = [];
    for (i = 0; i < compCount; i++) cadj.push([]);
    var cin = [];
    for (i = 0; i < compCount; i++) cin.push([]);
    var seenEdge = Object.create(null);
    for (i = 0; i < n; i++) {
      var ca = compOf[i];
      for (var j = 0; j < out[i].length; j++) {
        var cb = compOf[out[i][j]];
        if (ca === cb) continue;
        var key = ca + '>' + cb;
        if (seenEdge[key]) continue;
        seenEdge[key] = 1;
        cadj[ca].push(cb);
        cin[cb].push(ca);
      }
    }

    /* 缩点后一定是 DAG → 按拓扑序（用入度做 Kahn）算最长路径 */
    var clevel = new Int32Array(compCount);
    var indeg = new Int32Array(compCount);
    for (i = 0; i < compCount; i++) indeg[i] = cin[i].length;
    var queue = [];
    for (i = 0; i < compCount; i++) if (indeg[i] === 0) queue.push(i);
    var qi = 0;
    while (qi < queue.length) {
      var c = queue[qi++];
      for (j = 0; j < cadj[c].length; j++) {
        var nx = cadj[c][j];
        if (clevel[c] + 1 > clevel[nx]) clevel[nx] = clevel[c] + 1;
        if (--indeg[nx] === 0) queue.push(nx);
      }
    }

    /* ------------------------------------------- 4. 写回 */
    var maxLayer = 0;
    var sizes = [];
    nodes.forEach(function (nd, ii) {
      var lv = clevel[compOf[ii]];
      nd.layer = lv;
      if (lv > maxLayer) maxLayer = lv;
      while (sizes.length <= lv) sizes.push([]);
      sizes[lv].push(nd);
    });

    graph.maxLayer = maxLayer;
    graph.layerSizes = sizes;
    graph.layerOf = function (id) {
      var ix = index[id];
      return ix == null ? null : clevel[compOf[ix]];
    };
    /* 缩点后所属的强连通分量编号。用途：判断一条边的两端是不是「同一个等价类」
       —— 同一个分量里的边不该拉开层号（等价链就是这种情况）。
       构建脚本的「层号与边方向不矛盾」校验要靠它。 */
    graph.componentOf = function (id) {
      var ix = index[id];
      return ix == null ? null : compOf[ix];
    };
    return { maxLayer: maxLayer, sizes: sizes, components: compCount };
  }

  MG.computeLayers = computeLayers;
})(typeof window !== 'undefined' ? window : globalThis);
