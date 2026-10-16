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
  /* 界面语言（T2.4）：tf = 查表，缺键回落中文 */
  var tf = MG.t;

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
          U.escapeHtml(MG.clusterName(node.clusterObj)) + '</span>';
      }
      return '<div class="pn-regions">' + head + node.regions.map(function (rid) {
        var r = view.graph.regionById[rid];
        if (!r) return '';
        return '<span class="pn-chip" data-region="' + r.id + '">' +
          '<span class="lg-swatch" style="background:' + r.color + '"></span>' +
          U.escapeHtml(MG.regionName(r)) + '</span>';
      }).join('') + '</div>';
    }

    function nodeRow(n, prefix, keyword) {
      var st = MG.typeStyle(n.type);
      /* 英文模式：描述优先英文摘要/陈述，名字走 label_en（缺了回落中文）
         ⚠️ 用 `plainMath`（保留可读公式）而不是 `plain`（公式→空格）——
            否则这一行会出现「设 是偏序集， 。」这种空句。 */
      var desc = MG.isEn
        ? (U.plainMath(n.abstract_en) || U.plainMath(n.statement_en) || U.plainMath(n.notes_en) ||
           U.plainMath(n.statement) || U.plainMath(n.notes) || U.plain(n.title))
        : (U.plainMath(n.statement) || U.plainMath(n.notes) || U.plain(n.title));
      return '<div class="pn-link" data-kind="node" data-id="' + n.id + '">' +
        '<span class="dot" style="background:' + st.color + '"></span>' +
        (keyword ? '<span class="kw">' + U.escapeHtml(keyword) + '</span>' : '') +
        '<span><span class="nm">' + U.escapeHtml(MG.labelOf(n)) + '</span>' +
        '<div class="ds">' + U.escapeHtml(U.truncate(desc, 56)) + '</div></span>' +
        '</div>';
    }

    function edgeRow(e, keyword) {
      var name = MG.edgeName(e.kind);
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

    function lbl(g, id) { var n = g.byId[id]; return n ? MG.labelOf(n) : id; }

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
      /* ⭐ T2.4：英文模式下面板大标题走 title_en（缺了回落 label_en → 中文 title） */
      html += '<h1 class="pn-h1">' + U.titleHtml(MG.isEn ? MG.titleOf(n) : n.title) + '</h1>';
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
        html += '<div class="pn-h2">' +
          U.escapeHtml(tf('第 {n} 层（依赖深度）· 它依赖 {k} 个 · 被 {m} 个依赖',
            { n: n.layer, k: pre.length, m: post.length })) + '</div>';
      }
      /* 「只看这个子图」的入口。真正的开关状态在图例里（不另开窗口）。 */
      html += '<div class="pn-btns">' +
        '<button class="pn-btn" data-sub="deps" title="' + U.escapeHtml(tf('只留下它依赖的东西 —— 看它是靠什么撑起来的')) + '">' + U.escapeHtml(tf('只看它靠什么')) + '</button>' +
        '<button class="pn-btn" data-sub="users" title="' + U.escapeHtml(tf('只留下用到它的东西')) + '">' + U.escapeHtml(tf('只看谁用它')) + '</button>' +
        '<button class="pn-btn" data-sub="both" title="' + U.escapeHtml(tf('两个方向都要')) + '">' + U.escapeHtml(tf('看它周围')) + '</button>' +
        '</div>';
      html += regionChips(n);

      /* 「引用此节点」（T1.4）与「独立页面」（T1.5）。内容以 CC BY 4.0 授权，
         标 id + 版本是**请求** —— 「引用」按钮把这个请求变成一次点击
         （引文 = 节点 id + 内容版本 + 概念页地址）；「独立页面」是**普通链接**，
         指向构建期为每个节点产出的 `nodes/<id>.html` 单页版 ——
         方便复制地址、新标签页打开、浏览器翻译。
         ⚠️ panel 不碰剪贴板、也不知道站点地址：由 app 注入 onCite / pageHref；
            没注入就整块不出现（导出器复用面板时不会画出半个按钮）。 */
      var pageHref = hooks && hooks.pageHref ? hooks.pageHref(n.id) : '';
      if ((hooks && hooks.onCite) || pageHref) {
        html += '<div class="pn-cite-row">';
        if (pageHref) {
          html += '<a class="pn-btn pn-open" href="' + U.escapeHtml(pageHref) + '"' +
            ' target="_blank" rel="noopener"' +
            ' title="' + U.escapeHtml(tf('在新标签页打开这个概念页（普通网页，便于复制地址与浏览器翻译）')) + '">' +
            U.escapeHtml(tf('独立页面 ↗')) + '</a>';
        }
        if (hooks && hooks.onCite) {
          html += '<button class="pn-btn pn-cite" data-cite="' + U.escapeHtml(n.id) + '"' +
            ' title="' + U.escapeHtml(tf('复制引文（节点 id + 内容版本 + 概念页链接）')) + '">' +
            U.escapeHtml(tf('引用此节点')) + '</button>';
        }
        html += '</div>';
      }

      /* 已读标记 + **相关依赖的已读情况**。
         ⚠️ 这里的说法改过一次（2026-10-16）：原来是「还差 N 条前置 / 前置都读过了」，
            读起来像「学完这些才能读、读完了就可以开始」—— 但那不成立：
              · 合起来的关系 = 推出的前提 + 陈述里引用的定义，既不是理解本陈述的
                必要条件，也不是能推出结论的充分条件（定义引用只是「用到了它」）；
              · 不同证明路线的来源被并在一起（紧 ⇒ 列紧 与 列紧 ⇒ 紧 互为来源）；
              · 「紧 ⇒ 完备」「列紧 ⇒ 完备」也不意味着学「完备」得先把两条都学完。
            ⇒ 只说**已读情况**：这几项还没标已读。⛔ 不宣称「可以开始学了」，
              也不据此推荐下一步（图里本来就没有那个入口）。
         判据与数据一字未动：还是 `hooks.missingPrereqs`（readstate.js）。 */
      if (hooks && hooks.onToggleRead) {
        var isRead = hooks.isRead ? !!hooks.isRead(n.id) : false;
        var tip = '';
        if (!isRead) {
          var miss = hooks.missingPrereqs ? hooks.missingPrereqs(n.id) : [];
          var why = tf('「相关依赖」= 推出它的前提 + 陈述里引用的定义（等价与类比不算）；' +
            '这只是已读情况的记录，不代表必须先学它们。');
          if (!miss.length) {
            tip = '<span class="pn-read-tip ok" title="' + U.escapeHtml(why) + '">' +
              U.escapeHtml(tf('已标记全部相关依赖')) + '</span>';
          } else {
            var names = miss.slice(0, 4).map(function (id) {
              var m = g.byId[id];
              return m ? U.escapeHtml(MG.labelOf(m)) : U.escapeHtml(id);
            }).join('、');
            tip = '<span class="pn-read-tip" title="' + U.escapeHtml(why) + '">' +
              U.escapeHtml(tf('相关依赖中还有 {n} 项未标记已读：{名}',
                { n: miss.length, 名: names + (miss.length > 4 ? ' …' : '') })) +
              '</span>';
          }
        }
        /* ⚠️ 保存失败时如实说一句（无痕模式 / 受限的 file://）：以前是静默的，
           用户点了「标记已读」却不知道这次标记根本没留下。 */
        var warn = (hooks.readSaveOk && !hooks.readSaveOk())
          ? '<span class="pn-read-warn" title="' +
            U.escapeHtml(tf('浏览器不允许本地存储（无痕模式 / 受限的 file://）—— 这次标记只在本页有效')) +
            '">' + U.escapeHtml(tf('⚠ 没能保存')) + '</span>'
          : '';
        html += '<div class="pn-read">' +
          '<button class="pn-btn pn-read-btn' + (isRead ? ' on' : '') +
          '" data-read="' + U.escapeHtml(n.id) + '">' +
          U.escapeHtml(tf(isRead ? '✓ 已读 · 点一下取消' : '✓ 标记已读')) + '</button>' + tip + warn + '</div>';
      }

      if (n.statement) html += section(tf('陈述'), '<div class="pn-body">' + U.md(n.statement) + '</div>');
      if (n.notes) html += section(tf('说明 / 备注'), '<div class="pn-body">' + U.md(n.notes) + '</div>');
      if (n.refs && n.refs.length) {
        html += section(tf('参考'), '<div class="pn-body"><ul>' + n.refs.map(function (r) {
          return '<li>' + U.escapeHtml(r) + '</li>';
        }).join('') + '</ul></div>');
      }

      /* 相关连线 */
      var out = [], inc = [], eqs = [], defs = [], users = [], anas = [];
      (g.edgesOf[n.id] || []).forEach(function (e) {
        if (e.kind === 'implication') {
          if (e.target === n.id) inc.push(edgeRow(e, tf('被推出')));
          else out.push(edgeRow(e, tf('推出')));
        } else if (e.kind === 'equivalence') {
          eqs.push(edgeRow(e, tf('等价')));
        } else if (e.kind === 'analogy') {
          anas.push(edgeRow(e, tf('类比')));
        } else if (e.kind === 'definition') {
          if (e.usedBy === n.id) {
            var d = g.byId[e.definition];
            if (d) defs.push(nodeRow(d, tf('定义'), ''));
          } else {
            users.push(edgeRow(e, tf('用于')));
          }
        }
      });

      html += section(tf('由本节点推出的结论（{n}）', { n: out.length }),
        listOrNone(out, tf('暂无')));
      html += section(tf('推出本节点的结论（{n}）', { n: inc.length }),
        listOrNone(inc, tf('暂无（可能是原始公理或定义）')));
      html += section(tf('等价命题（{n}）', { n: eqs.length }),
        listOrNone(eqs, tf('暂无')));
      if (anas.length) {
        html += section(tf('类比 / 思想相通（{n}）', { n: anas.length }),
          '<div class="pn-hint">' + U.escapeHtml(tf('⚠️ 弱边：不是逻辑蕴含，只提供联想线索')) + '</div>' +
          listOrNone(anas, tf('暂无')));
      }
      if (MG.config.highlightDefinitions) {
        html += section(tf('陈述中用到的定义（{n}）', { n: defs.length }),
          listOrNone(defs, tf('暂无')));
        if (users.length) {
          html += section(tf('本定义被以下结论引用（{n}）', { n: users.length }),
            listOrNone(users, tf('暂无')));
        }
      }
      bodyEl.innerHTML = html;
      /* 正文里出现的概念名 → 可点（跳过当前节点自己）。
         ⚠️ 必须在 innerHTML 之后做：linkify 是**对渲染好的 DOM 做后处理**。 */
      if (hooks.linkify) hooks.linkify(bodyEl, n.id);
    }

    /* -------------------------------------------------------- 连线面板 */
    function renderEdge(e) {
      if (!e) { hide(); return; }
      var g = view.graph;
      var name = MG.edgeName(e.kind);
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
        gph = '「<b>' + U.escapeHtml(lbl(g, e.definition)) + '</b>」 ' + U.escapeHtml(tf('出现在')) + ' ' +
          '<span class="pn-link" data-kind="node" data-id="' + e.usedBy + '" style="display:inline-flex;padding:0"><b>' +
          U.escapeHtml(lbl(g, e.usedBy)) + '</b></span> ' + U.escapeHtml(tf('的陈述中'));
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
              steps.push({ label: o.title || (lbl(g, s) + ' ⇒ ' + lbl(g, o.target)), text: o.proof || '', tag: tf('箭头') });
            }
          });
        }
      }

      if (steps.length) {
        html += section(tf('为什么等价'), steps.map(function (p, i) {
          return '<div class="pn-step">' +
            '<div class="pn-step-title"><span class="badge">' + (p.tag || (i + 1)) + '</span>' +
            U.titleHtml(p.label || '') + '</div>' +
            '<div class="pn-body">' + U.md(p.text || '') + '</div></div>';
        }).join(''));
      } else if (e.proof) {
        html += section(tf(e.kind === 'implication' ? '推导过程' : '说明'), '<div class="pn-body">' + U.md(e.proof) + '</div>');
      } else if (e.kind === 'definition') {
        var d = g.byId[e.definition];
        html += section(tf('说明'), '<div class="pn-body">' +
          U.md(e.note || tf('该结论的陈述中使用了定义「{名}」。', { 名: lbl(g, e.definition) })) + '</div>');
        if (d && d.statement) {
          html += section(tf('定义原文 · {名}', { 名: MG.labelOf(d) }), '<div class="pn-body">' + U.md(d.statement) + '</div>');
        }
      }

      if (e.note && e.proofs) {
        html += '<div class="pn-note">' + U.md(e.note) + '</div>';
      } else if (e.note && e.proof) {
        html += '<div class="pn-note">' + U.md(e.note) + '</div>';
      }

      bodyEl.innerHTML = html;
      /* 边的证明里也会提到概念 —— 一样给链接（没有「自己」要跳过） */
      if (hooks.linkify) hooks.linkify(bodyEl, null);
    }

    /* ----------------------------------------------------------- 事件 */
    bodyEl.addEventListener('click', function (ev) {
      /* 正文里点的概念名：跳到那个节点。
         ⛔ 必须 preventDefault：这些 <a> 的 href 是 "#"，不拦会把地址栏的 hash
            冲成空的 —— 而 hash 就是星图的深链（#n= / #e= / #v=）。 */
      var xa = ev.target.closest ? ev.target.closest('[data-xlink]') : null;
      if (xa) {
        ev.preventDefault();
        hooks.onGoto && hooks.onGoto({ type: 'node', id: xa.getAttribute('data-xlink') });
        return;
      }
      /* ⚠️ 「只看子图」按钮要排在 [data-kind][data-id] 之前判：
         按钮将来若被塞进 pn-link 里，就会被当成跳转。 */
      var citeBtn = ev.target.closest ? ev.target.closest('[data-cite]') : null;
      if (citeBtn) {
        hooks.onCite && hooks.onCite(citeBtn.getAttribute('data-cite'), citeBtn);
        return;
      }
      var readBtn = ev.target.closest ? ev.target.closest('[data-read]') : null;
      if (readBtn) {
        hooks.onToggleRead && hooks.onToggleRead(readBtn.getAttribute('data-read'));
        return;
      }
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
