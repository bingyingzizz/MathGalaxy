/* ==========================================================================
   内容包 · 第 2–4 章的定义骨架（8 条）
   --------------------------------------------------------------------------
   拓扑与 site 那边一直缺的编号定义：完全不连通 / 极不连通（2.2.7）、
   局部紧 Hausdorff（2.3.1）、Tychonoff（2.1.4）、
   拓扑生成集（3.2.3）、以及 site 之间函子的四条：连续（3.4.4）、
   site 的态射（3.4.5）、余连续（3.4.6）、诱导拓扑（3.4.7）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑与 site 的定义骨架',
  nodes: [

    /* -------------------------------------------- 完全不连通 / 极不连通 */
    {
      id: 'def.totally-disconnected',
      cluster: 'topo.stone',
      type: 'definition',
      label: '完全不连通与极不连通',
      title: '完全不连通 / 极不连通空间',
      regions: ['topology'],
      tags: ['拓扑', '完全不连通', '极不连通', 'Stonean', '连通分量'],
      statement: [
        '拓扑空间 $X$ 叫**完全不连通的**，如果**每个连通分量都是单点**。',
        '',
        '叫**极不连通的**（extremally disconnected），如果**每个开集的闭包仍然开**。'
      ].join('\n'),
      notes: [
        '⚠️ **两个名字只差一个字，强弱正好相反**：',
        '',
        [
          '- **完全不连通**说「碎到每个分量只剩一个点」；',
          '- **极不连通**说「开集的闭包不再长大」—— 后者更强。'
        ].join('\n'),
        '**极不连通的需求方是 Haskell / 集合论 / 凝聚态**：它是「投影对象」的几何形态（Gleason 定理：$\\mathbf{CHaus}$ 的投射对象恰好是 Stonean 空间）。',
        '⭐ **在紧 Hausdorff 的世界里三者串成一条链**：极不连通 $\\implies$ 完全不连通；完全不连通 + 紧 Hausdorff $\\iff$ **profinite**；极不连通 + 紧 Hausdorff $\\implies$ **Stonean**。',
        '**例子**：Cantor 集 $2^{\\mathbb{N}}$ 完全不连通但不极不连通；$\\beta\\mathbb{N}$（$\\mathbb{N}$ 的 Stone–Čech 紧化）极不连通；$\\beta\\mathbb{N} \\setminus \\mathbb{N}$ 是它的一个极端例子。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §2.2']
    },

    /* ------------------------------------------------- 局部紧 Hausdorff */
    {
      id: 'def.locally-compact',
      cluster: 'topology.general',
      type: 'definition',
      label: '局部紧 Hausdorff 空间',
      title: '局部紧 Hausdorff 空间（Locally Compact Hausdorff）',
      regions: ['topology'],
      tags: ['拓扑', '局部紧', 'Hausdorff', '紧邻域'],
      statement: [
        '拓扑空间 $X$ 叫**局部紧**的，如果**每个点都有紧邻域**：对每个 $x \\in X$，存在紧集 $K$ 使',
        '',
        '$$x \\in \\operatorname{int} K$$',
        '',
        '再要求它是 Hausdorff 的，就叫**局部紧 Hausdorff** 空间。',
        '',
        '⚠️ 本图提到「局部紧」**而不另加限定**时，指的都是后者 —— 这是凝聚态数学里的标准用法：那里用得到的性质（局部紧 $\\implies$ 紧生成、商映射 $\\times$ 局部紧）都同时需要 Hausdorff。'
      ].join('\n'),
      notes: [
        '**等价说法**（Hausdorff 时）：每点有**紧邻域基**（即任意给定邻域 $U \\ni x$ 里都能找到一个紧邻域 $K$ 使 $x \\in \\operatorname{int}K \\subseteq K \\subseteq U$）。这条更强的形式正是「商映射 $\\times$ 局部紧」那条定理要用的。',
        '**例子**：$\\mathbb{R}^{n}$、任何离散空间、任何紧 Hausdorff 空间。**反例**：$\\mathbb{Q}$（不是局部紧）、无穷维 Banach 空间（闭单位球不紧）。',
        '⭐ **它在凝聚态数学里的位置**：$\\mathbf{CHaus}$ 是场地，而**局部紧 Hausdorff**是「能用紧 Hausdorff 逼近」的最小一族 —— 局部紧 Hausdorff 空间都是**紧生成**的（例 1），所以都能忠实地变成凝聚态集。Pontryagin 对偶也只在局部紧 Hausdorff 阿贝尔群那一条线上成立。',
        '⚠️ 「局部紧」这个条件**不能省**：商映射乘 id 那条定理、Tychonoff 以外的积性质、以及「紧提升条件」都要它。'
      ].join('\n\n'),
      refs: ['Munkres, Topology']
    },

    /* ------------------------------------------------------ Tychonoff */
    {
      id: 'thm.tykhonov',
      cluster: 'topology.general',
      type: 'theorem',
      label: 'Tychonoff 定理',
      title: 'Tychonoff 定理：紧空间的任意积紧',
      regions: ['topology'],
      tags: ['拓扑', '紧', '积', 'Tychonoff', '选择公理'],
      statement: '任意一族紧空间的**积**（带积拓扑）仍然紧 —— 任意多个，包括不可数多个。',
      notes: [
        ['**证明（Alexander 子基引理 + 选择公理）。** 记 $X = \\prod_{i\\in I} X_{i}$，投影 $p_{i} : X\\to X_{i}$。取**子基**',
          '$$\\mathcal{S} := \\{\\, p_{i}^{-1}(U_{i}) \\;:\\; i\\in I,\\ U_{i}\\subseteq X_{i}\\ \\text{开} \\,\\}.$$',
          '**Alexander 子基引理**：拓扑空间紧 $\\iff$ 每个由子基成员组成的覆盖都有有限子覆盖。所以只需验证后者。',
          '设 $\\mathcal{S}_{0} \\subseteq \\mathcal{S}$ 覆盖 $X$，反设它**没有**有限子覆盖。对每个 $i$ 记',
          '$$\\mathcal{U}_{i} := \\{\\, U_{i} : p_{i}^{-1}(U_{i}) \\in \\mathcal{S}_{0} \\,\\},\\qquad F_{i} := X_{i}\\setminus \\bigcup \\mathcal{U}_{i}.$$',
          '- **$F_{i} \\ne \\emptyset$**：否则 $\\mathcal{U}_{i}$ 是紧空间 $X_{i}$ 的开覆盖，取有限子覆盖 $U_{1},\\ldots,U_{n}$，对应的 $p_{i}^{-1}(U_{1}),\\ldots,p_{i}^{-1}(U_{n})$ 就是 $X$ 的有限子覆盖 —— 与反设矛盾 ✓。',
          '- 由**选择公理**取 $x_{i} \\in F_{i}$，令 $x := (x_{i})_{i\\in I} \\in X$。',
          '- 于是对每个 $p_{i}^{-1}(U_{i})\\in \\mathcal{S}_{0}$ 都有 $x_{i} \\notin U_{i}$（因 $x_{i}\\in F_{i}$），故 $x \\notin p_{i}^{-1}(U_{i})$ 对**所有**成员成立 —— 与 $\\mathcal{S}_{0}$ 覆盖 $X$ 矛盾 ✓。',
          '所以每个子基覆盖都有有限子覆盖，由 Alexander 引理 $X$ 紧。∎',
          '（Alexander 引理本身：若某覆盖族无有限子覆盖，用 Zorn 把它扩成一个极大的这种族 $\\mathcal{M}$，则「非 $\\mathcal{M}$ 成员」的取法给出一族与子基有关的数据，逐条推出 $\\mathcal{M}$ 其实是覆盖、矛盾。）'
        ].join('\n'),
        '⭐ **Tychonoff 与选择公理等价**（在 ZF 里互相推出）—— 这是「选择公理有多强」的一个标准刻度。'
      ].join('\n\n'),
      refs: ['Munkres, Topology, §37', 'Le Stum, Exercise 2.19']
    },

    /* -------------------------------------------- site 的拓扑生成集 */
    {
      id: 'def.topologically-generating',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '拓扑生成集',
      title: '拓扑生成集（Topologically Generating Set）',
      regions: ['category'],
      tags: ['范畴论', 'site', '生成集', '筛'],
      statement: '设 $\\mathcal{C}$ 是 site。集合 $G \\subseteq \\mathcal{C}$ 叫**拓扑生成集**，如果每个 $X \\in \\mathcal{C}$ 都容许一个由**落在 $G$ 里的对象**组成的覆盖族 $(G_{i} \\to X)_{i}$。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ------------------------------------------------ 连续函子（site） */
    {
      id: 'def.continuous-functor',
      cluster: 'cat.topos',
      type: 'definition',
      label: '连续函子（site 之间）',
      title: '连续函子（Continuous Functor between Sites）',
      regions: ['category'],
      tags: ['范畴论', 'site', '连续函子', '态射'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{C}\'$ 是两个 site。函子',
        '',
        '$$f^{-1} := g : \\mathcal{C} \\longrightarrow \\mathcal{C}\'$$',
        '叫**连续的**，如果沿 $g$ 的预复合把 $\\mathcal{C}\'$ 上的层拉回成 $\\mathcal{C}$ 上的层：',
        '',
        '$$g^{*} : \\widetilde{\\mathcal{C}\'} \\longrightarrow \\widetilde{\\mathcal{C}}, \\qquad F \\longmapsto F \\circ g, \\qquad \\text{落在层范畴里。}$$'
      ].join('\n'),
      notes: [
        '**读法**：$g$ 的方向是 $\\mathcal{C} \\to \\mathcal{C}\'$，但层是**反变**的，所以 $g$ 把 $\\mathcal{C}\'$ 上的层**拉回**到 $\\mathcal{C}$ 上。这个「方向拧一下」是 site 态射的一切别扭之处。',
        '⭐ **它等价于**：$g$ 把 $\\mathcal{C}\'$ 的覆盖族拉回成 $\\mathcal{C}$ 的覆盖族（覆盖筛的原像还是覆盖筛）。所以「连续」= 「覆盖关系被保住了」。',
        '**记号**：$f^{-1}$ 这个名字来自拓扑：空间之间的连续映射 $f : X \\to Y$ 给出开集范畴之间的函子 $f^{-1} : \\operatorname{Open}(Y) \\to \\operatorname{Open}(X)$（取原像），而层沿它拉回。',
        '📌 下一步：再加一条「$f^{-1}$ 是左正合的」，就得到 **site 的态射**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- site 的态射 */
    {
      id: 'def.morphism-of-sites',
      cluster: 'cat.topos',
      type: 'definition',
      label: 'site 的态射',
      title: 'site 的态射（Morphism of Sites）',
      regions: ['category'],
      tags: ['范畴论', 'site', '态射', '左正合'],
      statement: [
        '**site 的态射**是一个**连续函子** $f^{-1} := g : \\mathcal{C} \\to \\mathcal{C}\'$，并且要求 $f^{-1}$ 是**左正合**的（保有限极限）。等价地：$f^{-1}$ 有右伴随 $f_{*}$，而 $f^{-1} \\dashv f_{*}$。'
      ].join('\n'),
      notes: [
        '⭐ **一对伴随**：$f^{-1} \\dashv f_{*}$ —— $f^{-1}$ 是左伴随（所以保余极限），$f_{*}$ 是右伴随（所以保极限）。加上「连续」那一条（$f^{-1}$ 把层拉回成层），这一对就构成拓扑斯之间的态射（见「拓扑斯的态射」）。',
        '**为什么要求左正合**：层范畴里的有限极限是在预层里逐点算的，要让 $f^{-1}$ 把层送到层之后**还保有限极限**，就得让它在 site 这一层先保有限极限。',
        '**几何直觉**：空间之间的连续映射给出 site 的态射；site 的态射是这条的「代数替身」—— 之后拓扑斯的态射也是照这个模式定义的，只是把「site」换成「层范畴」。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- 余连续函子 */
    {
      id: 'def.cocontinuous-functor',
      cluster: 'cat.topos',
      type: 'definition',
      label: '余连续函子',
      title: '余连续函子（Cocontinuous Functor）',
      regions: ['category'],
      tags: ['范畴论', 'site', '余连续', '层'],
      statement: '设 $g : \\mathcal{C}\' \\to \\mathcal{C}$ 是两个 site 之间的函子。叫**余连续的**，如果函子 $g^{\\sharp}$（把预层沿 $g$ 推出、再层化）**把层送到层**。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- 诱导拓扑 */
    {
      id: 'def.induced-topology',
      cluster: 'cat.topos',
      type: 'definition',
      label: '诱导拓扑',
      title: '诱导拓扑（Induced Topology）',
      regions: ['category'],
      tags: ['范畴论', 'site', '诱导拓扑'],
      statement: '设 $\\mathcal{C}\'$ 是 site，$f^{-1} : \\mathcal{C} \\to \\mathcal{C}\'$ 是任何函子。$\\mathcal{C}$ 上的**诱导拓扑**是使 $f^{-1}$ **连续**的最细拓扑。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    }
  ],

  edges: []
});
