/* ==========================================================================
   数学星图 · 详情面板
   --------------------------------------------------------------------------
   点节点 → 显示类型 / 板块 / 陈述 / 说明 + 相关连线（可点击跳转）
   点连线 → 显示推导过程（推出 / 等价 / 定义引用）
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;
  var T = MG.theme;
  var GU = MG.graphUtil;

  function createPanel(panelEl, bodyEl, closeBtn, view, hooks) {
    var current = null;

    function hide() {
      current = null;
      panelEl.classList.add('hidden');
      hooks.onClose && hooks.onClose();
    }

    function show(what) {
      current = what;
      panelEl.classList.remove('hidden');
      panelEl.scrollTop = 0;
      if (what.type === 'node') renderNode(view.graph.byId[what.id]);
      else renderEdge(findEdge(what.id));
    }

    function findEdge(id) {
      for (var i = 0; i < view.graph.edges.length; i++) if (view.graph.edges[i].id === id) return view.graph.edges[i];
      return null;
    }

    /* ------------------------------------------------------------ 零件 */
    function kindBadge(type) {
      var st = MG.typeStyle(type);
      return '<span class="pn-kind" style="background:' + st.color + '">' +
        '<span class="dot"></span>' + U.escapeHtml(st.name) + '</span>';
    }

    function regionChips(node) {
      if (!node.regions.length && !node.clusterObj) return '';
      var head = '';
      if (node.clusterObj) {
        var g = view.graph.galaxyOf ? view.graph.galaxyOf(node.clusterObj) : null;
        var col = node.clusterObj.color || (g ? g.color : '#8892A0');
        head = '<span class="pn-chip" data-cluster="' + node.clusterObj.id + '">' +
          '<span class="lg-swatch" style="background:' + U.mixWithWhite(col, 0.62) + '"></span>' +
          U.escapeHtml(node.clusterObj.name) + '</span>';
      }
      return '<div class="pn-regions">' + head + node.regions.map(function (rid) {
        var r = view.graph.regionById[rid];
        if (!r) return '';
        return '<span class="pn-chip" data-region="' + r.id + '">' +
          '<span class="lg-swatch" style="background:' + r.color + '"></span>' +
          U.escapeHtml(r.name) + '</span>';
      }).join('') + '</div>';
    }

    function nodeRow(n, prefix, keyword) {
      var st = MG.typeStyle(n.type);
      var desc = U.plain(n.statement) || U.plain(n.notes) || U.plain(n.title);
      return '<div class="pn-link" data-kind="node" data-id="' + n.id + '">' +
        '<span class="dot" style="background:' + st.color + '"></span>' +
        (keyword ? '<span class="kw">' + U.escapeHtml(keyword) + '</span>' : '') +
        '<span><span class="nm">' + U.escapeHtml(n.label) + '</span>' +
        '<div class="ds">' + U.escapeHtml(U.truncate(desc, 56)) + '</div></span>' +
        '</div>';
    }

    function edgeRow(e, keyword) {
      var name = T.edgeNames[e.kind] || e.kind;
      var arrow = e.kind === 'implication' ? '⟹'
        : e.kind === 'equivalence' ? '⟺'
          : e.kind === 'analogy' ? '～' : '·';
      var head = e.title || shortLabel(e, 40);
      var snippet = '';
      if (e.proof) snippet = U.plain(e.proof);
      else if (e.proofs && e.proofs.length) snippet = e.proofs.map(function (p) { return p.label; }).join(' / ');
      else if (e.note) snippet = U.plain(e.note);
      return '<div class="pn-link" data-kind="edge" data-id="' + e.id + '">' +
        '<span class="dot" style="background:' + edgeDot(e) + '"></span>' +
        (keyword ? '<span class="kw">' + U.escapeHtml(keyword) + '</span>' : '') +
        '<span><span class="nm">' + U.titleHtml(head) + '</span>' +
        '<div class="ds">' + arrow + ' ' + U.escapeHtml(name) +
        (snippet ? ' · ' + U.escapeHtml(U.truncate(snippet, 48)) : '') + '</div></span>' +
        '</div>';
    }

    function edgeDot(e) {
      if (e.kind === 'definition') return 'rgba(60,112,245,0.75)';
      if (e.kind === 'equivalence') return '#1C1C1E';
      return '#1C1C1E';
    }

    function shortLabel(e, n) {
      var g = view.graph;
      if (e.kind === 'analogy') {
        return U.truncate(lbl(g, e.a) + ' ～ ' + lbl(g, e.b), n);
      }
      if (e.kind === 'equivalence') {
        return U.truncate(lbl(g, e.a) + ' ⟺ ' + lbl(g, e.b), n);
      }
      if (e.kind === 'definition') {
        return U.truncate('「' + lbl(g, e.definition) + '」→ ' + lbl(g, e.usedBy), n);
      }
      var s = e.sources.map(function (id) { return lbl(g, id); }).join(' + ');
      return U.truncate(s + ' ⟹ ' + lbl(g, e.target), n);
    }

    function lbl(g, id) { var n = g.byId[id]; return n ? n.label : id; }

    function section(title, html) {
      return '<div class="pn-sec"><h4>' + U.escapeHtml(title) + '</h4>' + html + '</div>';
    }

    function listOrNone(rows, emptyText) {
      if (!rows.length) return '<div class="pn-none">' + U.escapeHtml(emptyText) + '</div>';
      return '<div class="pn-list">' + rows.join('') + '</div>';
    }

    /* -------------------------------------------------------- 节点面板 */
    function renderNode(n) {
      if (!n) { hide(); return; }
      var g = view.graph;
      var html = '';
      html += kindBadge(n.type);
      html += '<h1 class="pn-h1">' + U.titleHtml(n.title) + '</h1>';
      html += '<div class="pn-h2">' + U.escapeHtml(n.id) + '</div>';
      /* 依赖深度：由连线现算（见 core/layers.js），不写在内容里 */
      if (typeof n.layer === 'number') {
        var pre = [], post = [];
        g.edges.forEach(function (e) {
          if (e.kind === 'implication') {
            if (e.target === n.id) pre.push(e); else if (e.sources.indexOf(n.id) >= 0) post.push(e);
          } else if (e.kind === 'definition') {
            if (e.usedBy === n.id) pre.push(e); else if (e.definition === n.id) post.push(e);
          }
        });
        html += '<div class="pn-h2">第 ' + n.layer + ' 层（依赖深度）· 它依赖 ' + pre.length +
          ' 个 · 被 ' + post.length + ' 个依赖</div>';
      }
      /* 「只看这个子图」的入口。真正的开关状态在图例里（不另开窗口）。 */
      html += '<div class="pn-btns">' +
        '<button class="pn-btn" data-sub="deps" title="只留下它依赖的东西 —— 看它是靠什么撑起来的">只看它靠什么</button>' +
        '<button class="pn-btn" data-sub="users" title="只留下用到它的东西">只看谁用它</button>' +
        '<button class="pn-btn" data-sub="both" title="两个方向都要">看它周围</button>' +
        '</div>';
      html += regionChips(n);

      if (n.statement) html += section('陈述', '<div class="pn-body">' + U.md(n.statement) + '</div>');
      if (n.notes) html += section('说明 / 备注', '<div class="pn-body">' + U.md(n.notes) + '</div>');
      if (n.refs && n.refs.length) {
        html += section('参考', '<div class="pn-body"><ul>' + n.refs.map(function (r) {
          return '<li>' + U.escapeHtml(r) + '</li>';
        }).join('') + '</ul></div>');
      }

      /* 相关连线 */
      var out = [], inc = [], eqs = [], defs = [], users = [], anas = [];
      (g.edgesOf[n.id] || []).forEach(function (e) {
        if (e.kind === 'implication') {
          if (e.target === n.id) inc.push(edgeRow(e, '被推出'));
          else out.push(edgeRow(e, '推出'));
        } else if (e.kind === 'equivalence') {
          eqs.push(edgeRow(e, '等价'));
        } else if (e.kind === 'analogy') {
          anas.push(edgeRow(e, '类比'));
        } else if (e.kind === 'definition') {
          if (e.usedBy === n.id) {
            var d = g.byId[e.definition];
            if (d) defs.push(nodeRow(d, '定义', ''));
          } else {
            users.push(edgeRow(e, '用于'));
          }
        }
      });

      html += section('由本节点推出的结论（' + out.length + '）',
        listOrNone(out, '暂无'));
      html += section('推出本节点的结论（' + inc.length + '）',
        listOrNone(inc, '暂无（可能是原始公理或定义）'));
      html += section('等价命题（' + eqs.length + '）',
        listOrNone(eqs, '暂无'));
      if (anas.length) {
        html += section('类比 / 思想相通（' + anas.length + '）',
          '<div class="pn-hint">⚠️ 弱边：不是逻辑蕴含，只提供联想线索</div>' +
          listOrNone(anas, '暂无'));
      }
      if (MG.config.highlightDefinitions) {
        html += section('陈述中用到的定义（' + defs.length + '）',
          listOrNone(defs, '暂无'));
        if (users.length) {
          html += section('本定义被以下结论引用（' + users.length + '）',
            listOrNone(users, '暂无'));
        }
      }
      bodyEl.innerHTML = html;
    }

    /* -------------------------------------------------------- 连线面板 */
    function renderEdge(e) {
      if (!e) { hide(); return; }
      var g = view.graph;
      var name = T.edgeNames[e.kind] || e.kind;
      var color = e.kind === 'definition' ? '#3C70F5' : '#1C1C1E';
      var html = '';

      html += '<span class="pn-kind" style="background:' + color + '">' +
        '<span class="dot"></span>' + U.escapeHtml(name) + '</span>';
      html += '<h1 class="pn-h1">' + U.titleHtml(e.title || shortLabel(e, 120)) + '</h1>';
      html += '<div class="pn-h2">' + U.escapeHtml(e.id) + '</div>';

      /* 推导图式 */
      var gph = '';
      if (e.kind === 'implication') {
        gph = e.sources.map(function (id) {
          return '<span class="pn-link" data-kind="node" data-id="' + id + '" style="display:inline-flex;padding:0"><b>' +
            U.escapeHtml(lbl(g, id)) + '</b></span>';
        }).join('<span class="arrow">+</span>') +
          '<span class="arrow">⟹</span>' +
          '<span class="pn-link" data-kind="node" data-id="' + e.target + '" style="display:inline-flex;padding:0"><b>' +
          U.escapeHtml(lbl(g, e.target)) + '</b></span>';
      } else if (e.kind === 'equivalence' || e.kind === 'analogy') {
        gph = '<span class="pn-link" data-kind="node" data-id="' + e.a + '" style="display:inline-flex;padding:0"><b>' +
          U.escapeHtml(lbl(g, e.a)) + '</b></span>' +
          '<span class="arrow">' + (e.kind === 'analogy' ? '～' : '⟺') + '</span>' +
          '<span class="pn-link" data-kind="node" data-id="' + e.b + '" style="display:inline-flex;padding:0"><b>' +
          U.escapeHtml(lbl(g, e.b)) + '</b></span>';
      } else {
        gph = '「<b>' + U.escapeHtml(lbl(g, e.definition)) + '</b>」 出现在 ' +
          '<span class="pn-link" data-kind="node" data-id="' + e.usedBy + '" style="display:inline-flex;padding:0"><b>' +
          U.escapeHtml(lbl(g, e.usedBy)) + '</b></span> 的陈述中';
      }
      html += '<div class="pn-arith">' + gph + '</div>';

      /* 过程：等价线会把「被它遮住的同向箭头」的证明也一并列出来 */
      var steps = [];
      if (e.kind === 'equivalence') {
        (e.proofs || []).forEach(function (p) {
          steps.push({ label: p.label || '', text: p.text || '' });
        });
        if (MG.config.hideParallelImplications) {
          view.graph.edges.forEach(function (o) {
            if (o.kind !== 'implication' || o.sources.length !== 1) return;
            var s = o.sources[0];
            if ((s === e.a && o.target === e.b) || (s === e.b && o.target === e.a)) {
              steps.push({ label: o.title || (lbl(g, s) + ' ⇒ ' + lbl(g, o.target)), text: o.proof || '', tag: '箭头' });
            }
          });
        }
      }

      if (steps.length) {
        html += section('为什么等价', steps.map(function (p, i) {
          return '<div class="pn-step">' +
            '<div class="pn-step-title"><span class="badge">' + (p.tag || (i + 1)) + '</span>' +
            U.titleHtml(p.label || '') + '</div>' +
            '<div class="pn-body">' + U.md(p.text || '') + '</div></div>';
        }).join(''));
      } else if (e.proof) {
        html += section(e.kind === 'implication' ? '推导过程' : '说明', '<div class="pn-body">' + U.md(e.proof) + '</div>');
      } else if (e.kind === 'definition') {
        var d = g.byId[e.definition];
        html += section('说明', '<div class="pn-body">' +
          U.md(e.note || ('该结论的陈述中使用了定义「' + lbl(g, e.definition) + '」。')) + '</div>');
        if (d && d.statement) {
          html += section('定义原文 · ' + d.label, '<div class="pn-body">' + U.md(d.statement) + '</div>');
        }
      }

      if (e.note && e.proofs) {
        html += '<div class="pn-note">' + U.md(e.note) + '</div>';
      } else if (e.note && e.proof) {
        html += '<div class="pn-note">' + U.md(e.note) + '</div>';
      }

      bodyEl.innerHTML = html;
    }

    /* ----------------------------------------------------------- 事件 */
    bodyEl.addEventListener('click', function (ev) {
      /* ⚠️ 「只看子图」按钮要排在 [data-kind][data-id] 之前判：
         按钮将来若被塞进 pn-link 里，就会被当成跳转。 */
      var subBtn = ev.target.closest ? ev.target.closest('[data-sub]') : null;
      if (subBtn) {
        if (current && current.type === 'node') {
          hooks.onSubgraph && hooks.onSubgraph(current.id, subBtn.getAttribute('data-sub'));
        }
        return;
      }
      var cchip = ev.target.closest ? ev.target.closest('[data-cluster]') : null;
      if (cchip) {
        hooks.onCluster && hooks.onCluster(cchip.getAttribute('data-cluster'));
        return;
      }
      var chip = ev.target.closest ? ev.target.closest('[data-region]') : null;
      if (chip) {
        hooks.onRegion && hooks.onRegion(chip.getAttribute('data-region'));
        return;
      }
      var row = ev.target.closest ? ev.target.closest('[data-kind][data-id]') : null;
      if (!row) return;
      var kind = row.getAttribute('data-kind');
      var id = row.getAttribute('data-id');
      if (kind === 'node') hooks.onGoto && hooks.onGoto({ type: 'node', id: id });
      else hooks.onGoto && hooks.onGoto({ type: 'edge', id: id });
    });

    closeBtn.addEventListener('click', hide);

    return {
      show: show,
      hide: hide,
      get current() { return current; }
    };
  }

  MG.createPanel = createPanel;
})(typeof window !== 'undefined' ? window : globalThis);
