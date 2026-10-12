/* ==========================================================================
   内容包 · 茎与分离性（原书 §3.4 的练习 3.53）
   --------------------------------------------------------------------------
   图上到处在用「层」，但一直没有一条节点讲**茎**（stalk）——
   而茎是层论最常用的东西：把「局部地看一个层」变成「一个集合」。
   这一条把茎写成拓扑斯态射的拉回，并给出「分离预层」的茎刻画。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '茎与分离性',
  nodes: [

    {
      id: 'prop.stalk-separated',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '茎与分离预层',
      title: '命题：茎 $T_{x} = \\varinjlim_{U \\ni x}T(U)$ 与「分离」的茎刻画',
      regions: ['category'],
      tags: ['命题', '层', '茎', '分离预层'],
      statement: [
        '设 $X$ 是拓扑空间，把 $x \\in X$ 看成连续映射 $x : 1 \\to X$（$1$ 是单点空间），它给出拓扑斯态射 $\\hat x : \\mathbf{Set} \\to \\operatorname{Sh}(X)$。则',
        '',
        '1. **拉回就是茎**：$\\hat x^{*}(T) = T_{x} := \\varinjlim_{U \\ni x} T(U)$（余极限沿 $x$ 的全体邻域取）；',
        '2. **推前是「在 $x$ 处取值」**：$\\hat x_{*}(E)$ 是层',
        '$$U \\longmapsto \\begin{cases} E, & x \\in U \\\\ \\emptyset, & x \\notin U \\end{cases}$$',
        '而 $\\hat x^{*}$ 的左伴随 $\\hat x_{!}$ 是同一形状的「**摩天楼层**」；',
        '3. **分离性的茎刻画**：预层 $T$ 是**分离的**（层条件里「单射」那一半：在某个覆盖的每支上限制相等 $\\implies$ 自身相等）$\\iff$ 对每个开集 $U$，映射',
        '$$T(U) \\longrightarrow \\prod_{x \\in U} T_{x}$$',
        '是**单射**。'
      ].join('\n'),
      notes: [
        ['**证明。**','**1.** 拓扑斯态射 $\\hat x = (\\hat x^{*}, \\hat x_{*})$ 的拉回是「在 $x$ 处的纤维」，而层在一点的纤维就是**茎** $T_{x} = \\varinjlim_{x \\in U} T(U)$ ✓（余极限沿 $x$ 的邻域取 —— 邻域按包含构成滤过范畴）。','**2.** 验证伴随关系 $\\operatorname{Hom}(T, \\hat x_{*}E) \\cong \\operatorname{Hom}(\\hat x^{*}T, E)$：左边是一个自然变换，在 $U \\ni x$ 处给出 $T(U) \\to E$，相容性说明它们「在限制下对应同一个元素」✓；这样的相容族恰好是','$$\\varprojlim_{U \\ni x} \\operatorname{Hom}\\bigl(T(U),\\ E\\bigr) \\;=\\; \\operatorname{Hom}\\Bigl(\\varinjlim_{U \\ni x} T(U),\\ E\\Bigr) \\;=\\; \\operatorname{Hom}(T_{x}, E) ✓$$','（第一个等号是「反变的 Hom 把余极限送成极限」）。$x \\notin U$ 时该层取值 $\\emptyset$，覆盖上的相容族只能落在空集里 —— 不存在，故仍是层 ✓。左伴随 $\\hat x_{!}$ 同理（把 $E$ 摆在 $x$ 的邻域上，别处放空集）✓。','**3.** $(\\Longrightarrow)$ 设 $s, t \\in T(U)$ 在每个茎里相等。对每个 $x \\in U$：$s$ 与 $t$ 在 $T_{x}$ 里相等，意味着存在开邻域 $U_{x} \\subseteq U$（$x \\in U_{x}$）使 $s|_{U_{x}} = t|_{U_{x}}$ ✓。$\\{U_{x}\\}_{x \\in U}$ 是 $U$ 的开覆盖，由**分离性**得 $s = t$ ✓。','$(\\Longleftarrow)$ 反过来设 $s, t \\in T(U)$ 在某个开覆盖 $(U_{i})$ 的每支上相等。任取 $x \\in U$，取一支 $U_{i} \\ni x$，则 $s$ 与 $t$ 在 $x$ 的邻域 $U_{i}$ 上相等，故它们在茎 $T_{x}$ 里相等 ✓；这对一切 $x \\in U$ 成立，由单射性得 $s = t$ ✓。∎'].join('\n'),
        '⭐ 一句话：**「分离」=「在每个点的茎里都相等就能推出整体相等」**。层比分离预层多的那一步（相容族的**粘合**）在茎里是看不出来的 —— 这正是「分离」与「层」的差别。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.4']
    }

  ],

  edges: [
    {
      id: 'def-link.stalk-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.stalk-separated',
      note: '命题讨论的是层（与分离预层）以及它们之间的态射。'
    },
    {
      id: 'def-link.stalk-topos',
      kind: 'definition',
      definition: 'def.topos',
      usedBy: 'prop.stalk-separated',
      note: '把点看成拓扑斯态射 $1 \\to \\operatorname{Sh}(X)$，用的是拓扑斯之间的态射。'
    }
  ]
});
