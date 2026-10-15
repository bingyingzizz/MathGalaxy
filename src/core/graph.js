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
      label: e.label || '',
      /* 强弱：可以在数据里显式覆盖，否则按 kind 查表（见 config 的 edgeStrength） */
      strength: e.strength || null
    };
    if (e.kind === 'analogy') {
      edge.a = e.a || e.from; edge.b = e.b || e.to;
    } else if (e.kind === 'equivalence') {
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

  /** 主干名单里写了不存在的 id → 提示（改内容时最容易忘的地方） */
  function graph_trunkWarn(trunkIds, byId, warnings) {
    trunkIds.forEach(function (id) {
      if (!byId[id]) warnings.push('主干名单里的节点不存在：' + id);
    });
  }

  /** 一条边涉及的所有节点 id */
  function edgeNodes(e) {
    if (e.kind === 'equivalence' || e.kind === 'analogy') return [e.a, e.b];
    if (e.kind === 'definition') return [e.definition, e.usedBy];
    return e.sources.concat([e.target]);
  }

  /** 一条边的「主目标」（用于箭头方向 / 排序） */
  function edgeTarget(e) {
    if (e.kind === 'equivalence' || e.kind === 'analogy') return e.b;
    if (e.kind === 'definition') return e.usedBy;
    return e.target;
  }

  /**
   * 强边 / 弱边。
   * strong = 标准逻辑关系（推出、等价、定义依赖）—— 查证明走这些
   * weak   = 类比 / 思想相通 —— 只在探索模式里出现
   */
  function strengthOf(e) {
    if (e.strength) return e.strength;
    var tbl = (MG.theme && MG.theme.edgeStrength) || {};
    return tbl[e.kind] || 'strong';
  }

  function isWeak(e) { return strengthOf(e) === 'weak'; }

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

    /* ---------------------------------------------------- 英文名字段（i18n） */
    /* `src/data/i18n.js` 是一张**按 id 索引的旁挂表**（由 tools/i18n-backfill.mjs
       从 aka / title 现算，别手写）。这里只做一件事：把 title_en / label_en 抄到
       节点上。引擎不认识「英文」这回事 —— 缺省就什么都不做，
       消费方按 `label_en → title_en → 中文 label` 回落。 */
    var i18n = (MG.i18n && MG.i18n.nodes) || null;
    if (i18n) {
      nodes.forEach(function (n) {
        var e = i18n[n.id];
        if (!e) return;
        if (e.title_en) n.title_en = e.title_en;
        if (e.label_en) n.label_en = e.label_en;
      });
    }

    /* -------------------------------------------------- 英文摘要（T2.2） */
    /* `src/data/i18n/abstracts.en.js`：给枢纽榜前列的节点旁挂一段英文导读。
       ⛔ 不是正文（陈述/说明/证明的真源仍在 packs），只是「这条讲什么」的译文。
       状态（draft / reviewed / stale）由构建期决定，这里只抄字段。 */
    var abs = (MG.i18nAbstracts && MG.i18nAbstracts.items) || null;
    if (abs) {
      nodes.forEach(function (n) {
        var a = abs[n.id];
        if (a) n.abstract_en = a;
      });
    }

    /* ------------------------------------------- 英文陈述 / 说明（T3.2） */
    /* `src/data/i18n/statements.en.js`：只给少数枢纽节点的**逐句对译**。
       ⛔ 中文陈述仍是唯一真源；这里只是把译文抄到节点上，消费方按有没有回落。
       ⚠️ 边的证明（proofs）不在本批 —— 英文页会写明证明仍以中文页为准。 */
    var stm = (MG.i18nStatements && MG.i18nStatements.items) || null;
    if (stm) {
      nodes.forEach(function (n) {
        var s = stm[n.id];
        if (!s) return;
        if (s.statement_en) n.statement_en = s.statement_en;
        if (s.notes_en) n.notes_en = s.notes_en;
      });
    }

    var autoId = 0;    packs.forEach(function (pack) {
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

    /* ---------------------------------------------------------- 主干 */
    /* 内容里用 MG.trunk 列出一批 id（学习主线）。这里只打一个标记，
       剩下的交给引擎：工具条的「主干」按钮会把非主干藏起来。 */
    var trunkIds = (MG.trunk || []);
    nodes.forEach(function (n) { n.trunk = trunkIds.indexOf(n.id) >= 0; });
    graph_trunkWarn(trunkIds, byId, warnings);

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

    /* 星团的「中心天体」（clusters.js 里的 hub 字段）。
       它是这个装置要造出来的那个东西 —— 画亮核 / 定中心 / 分尺度展开都靠它。
       写错 id 或者写到别的团里，都在这里提示（跟主干名单一样容易忘）。 */
    clusters.forEach(function (c) {
      c.hubObj = null;
      if (!c.hub) return;
      var h = byId[c.hub];
      if (!h) { warnings.push('星团 ' + c.id + ' 的 hub 指向不存在的节点：' + c.hub); return; }
      if (h.cluster !== c.id) {
        warnings.push('星团 ' + c.id + ' 的 hub 不属于本团：' + c.hub + '（实际在 ' + h.cluster + '）');
        return;
      }
      c.hubObj = h;
      h.isHub = true;
    });

    /** 星团所属星系对象 */
    graph.galaxyOf = function (c) {
      return (c && c.parent && graph.regionById[c.parent]) || null;
    };

    /**
     * 星团之间的连线。
     *  · 自动聚合：两个星团之间有几条节点级连线，就累积几条
     *  · 显式声明：数据里写 { kind:'cluster-link', a:'团id', b:'团id', label }
     * 两种合并，显式的权重更高。
     *
     * edgeOk 可选：只统计「还在场」的连线（用户藏了节点时用）。
     */
    graph.buildClusterLinks = function (edgeOk) {
      var tally = Object.create(null);

      function bump(a, b, w, extra) {
        if (!a || !b || a === b) return;
        var key = a < b ? a + '|' + b : b + '|' + a;
        if (!tally[key]) tally[key] = { a: a < b ? a : b, b: a < b ? b : a, count: 0, links: [] };
        tally[key].count += w;
        if (extra) tally[key].links.push(extra);
      }

      edges.forEach(function (e) {
        if (edgeOk && !edgeOk(e)) return;
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

    /* ------------------------------------------------------- 子图 / 闭包 */
    /**
     * 「只看这个子图」：从一个节点沿强边走一圈，取回它的骨架。
     *
     *   dir  'deps'  它靠什么撑起来（沿依赖往回走）
     *        'users' 谁在用它（沿依赖往前走）
     *        'both'  两边都要
     *   hops      走几跳（默认 2）
     *   skipBase  跳过「地基」（layer ≤ baseMax 的点），既不显示也不穿透 ——
     *             它们几乎出现在每一个闭包里，留着只会把骨架淹掉
     *   weak      要不要带弱边（默认不带；弱边连分层都不参与，更不该混进骨架）
     *
     * ⚠️ 方向必须按各 kind 的真实字段来 —— 四种边的形状**不一样**：
     *      implication  sources[] → target     target 依赖 sources
     *      definition   definition → usedBy    usedBy 依赖 definition
     *                   ★ `usedBy` 是**字符串**不是数组，写成 concat/展开会按下标拆开
     *      equivalence  双向
     *      analogy      无向，且属弱边
     */
    function neighboursOf(id, dir, includeWeak) {
      var out = [];
      (edgesOf[id] || []).forEach(function (e) {
        if (e.kind === 'implication') {
          if (dir !== 'users' && e.target === id) out = out.concat(e.sources);
          if (dir !== 'deps' && e.sources.indexOf(id) >= 0) out.push(e.target);
        } else if (e.kind === 'definition') {
          if (dir !== 'users' && e.usedBy === id) out.push(e.definition);
          if (dir !== 'deps' && e.definition === id) out.push(e.usedBy);
        } else if (e.kind === 'equivalence') {
          out.push(e.a === id ? e.b : e.a);
        } else if (includeWeak && e.kind === 'analogy') {
          out.push(e.a === id ? e.b : e.a);
        }
      });
      return out;
    }

    graph.subgraph = function (seedId, opts) {
      opts = opts || {};
      var dir = opts.dir || 'deps';
      var hops = opts.hops == null ? 2 : opts.hops;
      var baseMax = opts.baseMax == null ? 2 : opts.baseMax;
      var skipBase = opts.skipBase !== false;
      var includeWeak = !!opts.weak;

      var inSet = Object.create(null);
      var byHop = [];
      if (!byId[seedId]) {
        return { seed: seedId, dir: dir, hops: hops, ids: inSet, count: 0, byHop: byHop };
      }
      inSet[seedId] = 1;
      var frontier = [seedId];
      for (var h = 0; h < hops; h++) {
        var next = [];
        for (var i = 0; i < frontier.length; i++) {
          var list = neighboursOf(frontier[i], dir, includeWeak);
          for (var j = 0; j < list.length; j++) {
            var id = list[j];
            if (!byId[id] || inSet[id]) continue;
            if (skipBase && byId[id].layer <= baseMax) continue;
            inSet[id] = 1;
            next.push(id);
          }
        }
        byHop.push(next.length);
        if (!next.length) break;
        frontier = next;
      }
      return {
        seed: seedId, dir: dir, hops: hops, baseMax: baseMax, skipBase: skipBase,
        ids: inSet, count: Object.keys(inSet).length, byHop: byHop
      };
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
    strengthOf: strengthOf,
    isWeak: isWeak,
    visibleEdges: visibleEdges,
    visibleEdgesOf: visibleEdgesOf,
    toArray: toArray
  };
})(typeof window !== 'undefined' ? window : globalThis);
