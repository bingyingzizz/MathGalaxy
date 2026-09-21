/* ==========================================================================
   数学星图 · 图模型
   --------------------------------------------------------------------------
   把「数据包（packs）」合并成一张图，并建立索引：
     graph.nodes      节点数组（含 x, y 布局坐标）
     graph.byId       节点字典
     graph.edges      边数组（规范化后）
     graph.adj[id]    邻居 id 集合
     graph.edgesOf[id] 与某节点相连的边

   —— 边（edge）数据结构 ——
   1) 推出：{ kind:'implication', sources:['a','b'], target:'c', title, proof }
      sources 可以是 1 个或多个（多个 = 几个结论合起来推出）。
   2) 等价：{ kind:'equivalence', a:'x', b:'y',
              proofs:[{ label:'x ⇒ y', text:'…' }, { label:'y ⇒ x', text:'…' }] }
   3) 定义引用：{ kind:'definition', definition:'defId', usedBy:'nodeId', note }
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  function normNode(n, packName) {
    if (!n || !n.id) throw new Error('[' + packName + '] 节点缺少 id：' + JSON.stringify(n));
    var node = {
      id: n.id,
      type: n.type || 'definition',
      label: n.label || n.title || n.id,
      title: n.title || n.label || n.id,
      regions: toArray(n.regions || n.region),
      cluster: n.cluster || null,        // 所属星团 id（可省略 → 直接属于星系）
      tags: toArray(n.tags),
      statement: n.statement || '',
      notes: n.notes || '',
      refs: toArray(n.refs),
      pack: packName,
      /* 布局结果 */
      x: 0, y: 0,
      pinned: n.pinned || null
    };
    return node;
  }

  function normEdge(e, packName) {
    if (!e || !e.kind) throw new Error('[' + packName + '] 边缺少 kind：' + JSON.stringify(e));
    var edge = {
      id: e.id || null,
      kind: e.kind,
      title: e.title || '',
      proof: e.proof || '',
      proofs: e.proofs || null,
      note: e.note || '',
      pack: packName,
      label: e.label || ''
    };
    if (e.kind === 'equivalence') {
      edge.a = e.a; edge.b = e.b;
    } else if (e.kind === 'definition') {
      edge.definition = e.definition || e.a;
      edge.usedBy = e.usedBy || e.b;
    } else { // implication（默认）
      edge.kind = 'implication';
      edge.sources = toArray(e.sources || e.from);
      edge.target = e.target || e.to;
    }
    return edge;
  }

  function toArray(v) {
    if (v == null) return [];
    return Array.isArray(v) ? v.slice() : [v];
  }

  /** 一条边涉及的所有节点 id */
  function edgeNodes(e) {
    if (e.kind === 'equivalence') return [e.a, e.b];
    if (e.kind === 'definition') return [e.definition, e.usedBy];
    return e.sources.concat([e.target]);
  }

  /** 一条边的「主目标」（用于箭头方向 / 排序） */
  function edgeTarget(e) {
    if (e.kind === 'equivalence') return e.b;
    if (e.kind === 'definition') return e.usedBy;
    return e.target;
  }

  /* ------------------------------------------------------------------ 构建 */
  function buildGraph(packs, regions, clusterDefs) {
    var nodes = [], edges = [], byId = Object.create(null);
    var warnings = [];

    packs.forEach(function (pack) {
      var name = pack.name || 'pack';
      (pack.nodes || []).forEach(function (raw) {
        var n = normNode(raw, name);
        if (byId[n.id]) { warnings.push('重复的节点 id，后者被忽略：' + n.id); return; }
        byId[n.id] = n;
        nodes.push(n);
      });
    });

    var autoId = 0;
    packs.forEach(function (pack) {
      var name = pack.name || 'pack';
      (pack.edges || []).forEach(function (raw) {
        if (raw && raw.kind === 'cluster-link') return;  // 星团连线请写在 pack.clusterLinks
        var e = normEdge(raw, name);
        e.id = e.id || ('e' + (++autoId) + ':' + e.kind);
        edges.push(e);
      });
    });

    /* 校验 + 去重 */
    var kept = [];
    edges.forEach(function (e) {
      var ids = edgeNodes(e);
      var ok = true;
      ids.forEach(function (id) {
        if (!byId[id]) { ok = false; warnings.push('边 ' + e.id + ' 指向不存在的节点：' + id); }
      });
      if (!ok) return;
      kept.push(e);
    });
    edges = kept;

    var adj = Object.create(null);
    var edgesOf = Object.create(null);
    nodes.forEach(function (n) { adj[n.id] = Object.create(null); edgesOf[n.id] = []; });

    edges.forEach(function (e) {
      edgeNodes(e).forEach(function (id) {
        edgesOf[id].push(e);
        edgeNodes(e).forEach(function (other) {
          if (other !== id) adj[id][other] = true;
        });
      });
    });

    /* 相邻表转数组 */
    var adjList = Object.create(null);
    Object.keys(adj).forEach(function (id) { adjList[id] = Object.keys(adj[id]); });

    var graph = {
      nodes: nodes,
      edges: edges,
      byId: byId,
      regions: regions || [],
      regionById: Object.create(null),
      adj: adjList,
      edgesOf: edgesOf,
      warnings: warnings,
      edgeNodes: edgeNodes,
      edgeTarget: edgeTarget
    };

    graph.regions.forEach(function (r) { graph.regionById[r.id] = r; });

    /* ---------------------------------------------------------- 星团索引 */
    /* 星团 = 星系内部一套「自足的装置」。节点写 cluster 字段即归属；
       不写就直属于星系。星团的 parent 指向它所属的星系。            */
    var clusters = (clusterDefs || []).slice();
    var clusterById = Object.create(null);
    clusters.forEach(function (c) {
      clusterById[c.id] = c;
      c.nodes = [];
      c.region = null;
    });
    nodes.forEach(function (n) {
      var co = n.cluster ? clusterById[n.cluster] : null;
      if (n.cluster && !co) {
        warnings.push('节点 ' + n.id + ' 指向不存在的星团：' + n.cluster);
      }
      n.clusterObj = co || null;
      if (co) co.nodes.push(n);
    });
    graph.clusters = clusters;
    graph.clusterById = clusterById;

    /** 星团所属星系对象 */
    graph.galaxyOf = function (c) {
      return (c && c.parent && graph.regionById[c.parent]) || null;
    };

    /**
     * 星团之间的连线。
     *  · 自动聚合：两个星团之间有几条节点级连线，就累积几条
     *  · 显式声明：数据里写 { kind:'cluster-link', a:'团id', b:'团id', label }
     * 两种合并，显式的权重更高。
     */
    graph.buildClusterLinks = function () {
      var tally = Object.create(null);

      function bump(a, b, w, extra) {
        if (!a || !b || a === b) return;
        var key = a < b ? a + '|' + b : b + '|' + a;
        if (!tally[key]) tally[key] = { a: a < b ? a : b, b: a < b ? b : a, count: 0, links: [] };
        tally[key].count += w;
        if (extra) tally[key].links.push(extra);
      }

      edges.forEach(function (e) {
        var cs = [];
        edgeNodes(e).forEach(function (id) {
          var n = byId[id];
          if (n && n.clusterObj && cs.indexOf(n.clusterObj.id) < 0) cs.push(n.clusterObj.id);
        });
        for (var i = 0; i < cs.length; i++) {
          for (var j = i + 1; j < cs.length; j++) {
            // 每对星团之间计入一次（一条边只算一次）
            bump(cs[i], cs[j], 1, { kind: e.kind, id: e.id });
          }
        }
      });

      // 显式星团连线
      packs.forEach(function (pack) {
        (pack.clusterLinks || []).forEach(function (l, k) {
          var a = l.a || l.from, b = l.b || l.to;
          if (!clusterById[a] || !clusterById[b]) {
            warnings.push('星团连线指向不存在的星团：' + a + ' / ' + b);
            return;
          }
          var key = a < b ? a + '|' + b : b + '|' + a;
          if (!tally[key]) tally[key] = { a: a < b ? a : b, b: a < b ? b : a, count: 0, links: [] };
          tally[key].count += l.weight || 4;
          tally[key].explicit = true;
          tally[key].label = l.label || tally[key].label;
          tally[key].note = l.note || tally[key].note;
        });
      });

      return Object.keys(tally).map(function (k) { return tally[k]; });
    };

    graph.clusterLinks = graph.buildClusterLinks();

    /* 每个节点真正「用到的定义」（蓝线另一头是定义节点） */
    graph.definitionsOf = function (id) {
      return edgesOf[id].filter(function (e) { return e.kind === 'definition'; })
        .map(function (e) { return e.definition === id ? e.usedBy : e.definition; });
    };
    graph.usersOf = function (id) {
      return edgesOf[id].filter(function (e) { return e.kind === 'definition'; })
        .map(function (e) { return e.definition === id ? e.usedBy : e.definition; });
    };

    graph.bbox = function () {
      if (!nodes.length) return { minX: -1, minY: -1, maxX: 1, maxY: 1 };
      var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.forEach(function (n) {
        if (n.x < minX) minX = n.x; if (n.x > maxX) maxX = n.x;
        if (n.y < minY) minY = n.y; if (n.y > maxY) maxY = n.y;
      });
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    };

    return graph;
  }

  /**
   * 实际参与绘制的边。
   * —— 若 A、B 之间已有「等价」黑线，默认不再叠画 A↔B 的箭头（视觉太挤），
   *    被隐藏箭头上的推导过程会自动合并进等价线的详情里。
   */
  function visibleEdges(graph) {
    var defsOn = MG.config.showDefinitionLines;
    var hideParallel = MG.config.hideParallelImplications;

    var eqPairs = Object.create(null);
    if (hideParallel) {
      graph.edges.forEach(function (e) {
        if (e.kind !== 'equivalence') return;
        eqPairs[e.a + '|' + e.b] = true;
        eqPairs[e.b + '|' + e.a] = true;
      });
    }

    return graph.edges.filter(function (e) {
      if (e.kind === 'definition' && !defsOn) return false;
      if (e.kind === 'implication' && hideParallel) {
        var a = e.sources[0], b = e.target;
        if (e.sources.length === 1 && eqPairs[a + '|' + b]) return false;
        if (eqPairs[b + '|' + a]) return false;
      }
      return true;
    });
  }

  /** 与某个节点相连、且当前可见的边 */
  function visibleEdgesOf(graph, id, visible) {
    var set = visible || visibleEdges(graph);
    return set.filter(function (e) { return edgeNodes(e).indexOf(id) >= 0; });
  }

  MG.buildGraph = buildGraph;
  MG.graphUtil = {
    edgeNodes: edgeNodes,
    edgeTarget: edgeTarget,
    visibleEdges: visibleEdges,
    visibleEdgesOf: visibleEdgesOf,
    toArray: toArray
  };
})(typeof window !== 'undefined' ? window : globalThis);
