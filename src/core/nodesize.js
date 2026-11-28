/* ==========================================================================
   数学星图 · 节点尺寸（世界单位）
   --------------------------------------------------------------------------
   唯一实现：渲染器（半径 = 世界半径 × cam.k）与路由求解器（线段净空、箭头缝隙）
   读同一份，避免两处各算一遍而漂移。
   · 半径是**世界坐标常量**：config.node.baseRadius × 分档倍率（见 config.node.sizeTiers）。
   · 团入口定义：每个星团里被最多 definition 边当作出处的定义（同分取层号小、id 小）。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util, C = MG.config;
  var cache = { g: null, set: null };
  var NO_ENTRY = {};

  /** 团入口定义集合：{id:true}。按 graph 引用缓存。 */
  function entrySet(g) {
    if (!g) return NO_ENTRY;
    if (cache.g === g) return cache.set;
    var out = Object.create(null), i, e;
    for (i = 0; i < g.edges.length; i++) {
      e = g.edges[i];
      if (e.kind === 'definition' && e.definition && e.usedBy) out[e.definition] = (out[e.definition] || 0) + 1;
    }
    var byC = Object.create(null), set = Object.create(null);
    g.nodes.forEach(function (n) {
      if (n.type !== 'definition' || !n.cluster) return;
      var o = out[n.id] || 0, c = byC[n.cluster];
      if (!c || o > c.out || (o === c.out && (n.layer < c.layer || (n.layer === c.layer && n.id < c.id)))) {
        byC[n.cluster] = { id: n.id, out: o, layer: n.layer };
      }
    });
    Object.keys(byC).forEach(function (cid) { set[byC[cid].id] = true; });
    cache.g = g; cache.set = set;
    return set;
  }

  /** 半径倍率：团入口 > hub > 度数分档。 */
  function mul(node, g) {
    if (!node) return 1;
    var t = C.node.sizeTiers;
    if (!t) {
      var m = 1;
      if (node.degree >= 5) m *= 1.22; else if (node.degree >= 3) m *= 1.1;
      if (node.isHub) m *= 1.32;
      return m;
    }
    if (node.id && entrySet(g)[node.id]) return t.entry || t.hub;
    if (node.isHub) return t.hub;
    var d = node.degree || 0;
    for (var i = 0; i < t.byDegree.length; i++) {
      if (d >= t.byDegree[i][0]) return t.byDegree[i][1];
    }
    return 1;
  }

  /** 世界半径（不含 cam.k） */
  function worldRadius(node, g) {
    var r = U.clamp(C.node.baseRadius, C.node.minRadius, C.node.maxRadius);
    return r * mul(node, g);
  }

  MG.nodeSize = { entrySet: entrySet, mul: mul, worldRadius: worldRadius };
})(typeof window !== 'undefined' ? window : globalThis);
