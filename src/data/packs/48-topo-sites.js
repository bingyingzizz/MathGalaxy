/* ==========================================================================
   内容包 · 第 2–4 章的定义骨架（9 条）
   --------------------------------------------------------------------------
   拓扑与景那边一直缺的编号定义：完全不连通 / 极不连通（2.2.7）、
   局部紧 Hausdorff（2.3.1）、Tychonoff（2.1.4）、
   拓扑生成集（3.2.3）、以及景之间函子的四条：连续（3.4.4）、景的态射（3.4.5）、余连续（3.4.6）、诱导拓扑（3.4.7）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑与景的定义骨架',
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

    /* ------------------------------------ 局部紧（不要求 Hausdorff） */
    {
      id: 'def.locally-compact-space',
      cluster: 'topology.convergence',
      type: 'definition',
      label: '局部紧空间',
      title: '局部紧空间',
      regions: ['topology'],
      tags: ['拓扑', '局部紧', '紧邻域', 'Hausdorff'],
      statement: [
        '拓扑空间 $X$ 叫**局部紧的**，如果**每个点都有紧邻域**：对每个 $x \\in X$，存在紧集 $K$ 使',
        '',
        '$$x \\in \\mathring{K}$$',
        '',
        '这里**不要求** $X$ 是 Hausdorff 的。'
      ].join('\n'),
      notes: [
        '**与 Hausdorff 版的差别**：Hausdorff 时「每点有紧邻域」等价于「每点有**紧邻域基**」（任意邻域里都能找到紧邻域）；没有 Hausdorff 时这条路会断（紧集不必闭，邻域与紧集的关系变差）。',
        '**例子**：任何紧空间（取 $K = X$）、$\\mathbb{R}^{n}$、离散空间都局部紧；$\\mathbb{Q}$ 不是。紧空间一定局部紧，但不一定 Hausdorff。',
        '**用法**：需要 Hausdorff 时与 `def.hausdorff` 一起用；没有 Hausdorff 时本定义仍然有效，但每点有紧邻域基这一更强性质不一定成立。'
      ].join('\n\n'),
      refs: ['Munkres, Topology', 'Engelking, General Topology']
    },

    /* ------------------------------------------------------ Tychonoff */
    {
      id: 'thm.tykhonov',
      cluster: 'topology.convergence',
      type: 'theorem',
      hypotheses: ['紧', '选择公理'],
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

    /* -------------------------------------------- 景的拓扑生成集 */
    {
      id: 'def.topologically-generating',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '拓扑生成集',
      title: '拓扑生成集',
      regions: ['category'],
      tags: ['范畴论', '景', '生成集', '筛'],
      notes: [
        '**在说什么**：$G$ 是**拓扑**生成集，指每个对象 $X$ 都容许一个覆盖族，而族里的对象**全部落在 $G$ 里**。',
        '⭐ 用处：层的条件只需在 $G$ 上验（覆盖由 $G$ 生成）；等价的说法是「$\\{\\, h_{G} \\,\\}_{G \\in G}$ 构成生成元族」。',
        '⚠ 与范畴论里的**生成元**（要求「Hom 忠实」的那一条，在范畴论那两团）容易混：这里说的只是**景的覆盖**，不是可表函子的忠实性。',
      ].join('\n'),
      statement: '设 $\\mathcal{C}$ 是景。集合 $G \\subseteq \\mathcal{C}$ 叫**拓扑生成集**，如果每个 $X \\in \\mathcal{C}$ 都容许一个由**落在 $G$ 里的对象**组成的覆盖族 $(G_{i} \\to X)_{i}$。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ------------------------------------------------ 连续函子（景） */
    {
      id: 'def.continuous-functor',
      cluster: 'cat.topos',
      type: 'definition',
      label: '连续函子（景之间）',
      title: '连续函子',
      regions: ['category'],
      tags: ['范畴论', '景', '连续函子', '态射'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{C}\'$ 是两个景。函子',
        '',
        '$$f^{-1} := g : \\mathcal{C} \\longrightarrow \\mathcal{C}\'$$',
        '叫**连续的**，如果沿 $g$ 的预复合把 $\\mathcal{C}\'$ 上的层拉回成 $\\mathcal{C}$ 上的层：',
        '',
        '$$g^{*} : \\widetilde{\\mathcal{C}^{\\prime}} \\longrightarrow \\widetilde{\\mathcal{C}}, \\qquad F \\longmapsto F \\circ g$$',
        '（它把层送到层，所以限制在层范畴上。）'
      ].join('\n'),
      notes: [
        '**读法**：$g$ 的方向是 $\\mathcal{C} \\to \\mathcal{C}\'$，但层是**反变**的，所以 $g$ 把 $\\mathcal{C}\'$ 上的层**拉回**到 $\\mathcal{C}$ 上。这个「方向拧一下」是景态射的一切别扭之处。',
        '⭐ **它等价于**：$g$ 把 $\\mathcal{C}\'$ 的覆盖族拉回成 $\\mathcal{C}$ 的覆盖族（覆盖筛的原像还是覆盖筛）。所以「连续」= 「覆盖关系被保住了」。',
        '**记号**：$f^{-1}$ 这个名字来自拓扑：空间之间的连续映射 $f : X \\to Y$ 给出开集范畴之间的函子 $f^{-1} : \\operatorname{Open}(Y) \\to \\operatorname{Open}(X)$（取原像），而层沿它拉回。',
        '📌 下一步：再加一条「$f^{-1}$ 是左正合的」，就得到 **景的态射**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.4']
    },

    /* -------------------------------------------------- 景的态射 */
    {
      id: 'def.morphism-of-sites',
      cluster: 'cat.topos',
      type: 'definition',
      label: '景的态射',
      title: '景的态射',
      regions: ['category'],
      tags: ['范畴论', '景', '态射', '左正合'],
      statement: [
        '**景的态射**是一个**连续函子** $f^{-1} := g : \\mathcal{C} \\to \\mathcal{C}\'$，并且要求 $f^{-1}$ 是**左正合**的（保有限极限）。若 $f^{-1}$ 另有右伴随 $f_{*}$，则记 $f^{-1} \\dashv f_{*}$。'
      ].join('\n'),
      notes: [
        '⭐ **一对伴随**：$f^{-1} \\dashv f_{*}$ —— $f^{-1}$ 是左伴随（所以保余极限），$f_{*}$ 是右伴随（所以保极限）。加上「连续」那一条（$f^{-1}$ 把层拉回成层），这一对就构成拓扑斯之间的态射（见「拓扑斯的态射」）。',
        '**为什么要求左正合**：层范畴里的有限极限是在预层里逐点算的，要让 $f^{-1}$ 把层送到层之后**还保有限极限**，就得让它在景这一层先保有限极限。',
        '**几何直觉**：空间之间的连续映射给出景的态射；景的态射是这条的「代数替身」—— 之后拓扑斯的态射也是照这个模式定义的，只是把「景」换成「层范畴」。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.4']
    },

    /* -------------------------------------------------- 余连续函子 */
    {
      id: 'def.cocontinuous-functor',
      cluster: 'cat.topos',
      type: 'definition',
      label: '余连续函子',
      title: '余连续函子',
      regions: ['category'],
      tags: ['范畴论', '景', '余连续', '层'],
      notes: [
        '**在说什么**：$g$ **余连续** $\\iff$ 沿 $g$ 把预层推出去、再层化（即 $g^{\\sharp}$）之后**仍然是层**。',
        '⭐ 为什么需要：景的态射要一对函子（$f^{-1} \\dashv f_{*}$），其中**顺像** $f_{*}$ 存在靠的就是这种「推出去仍落在层里」。',
        '⚠ 与**连续函子**（`def.continuous-functor`：$f^{-1}$ 把层拉回还是层）方向不同、条件也不同 —— 一个管拉回、一个管推出，景的态射要两边都有，⛔ 别把两条当对偶成同一条。',
      ].join('\n'),
      statement: '设 $g : \\mathcal{C}\' \\to \\mathcal{C}$ 是两个景之间的函子。叫**余连续的**，如果函子 $g^{\\sharp}$（把预层沿 $g$ 推出、再层化）**把层送到层**。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.4']
    },

    /* -------------------------------------------------- 诱导拓扑 */
    {
      id: 'def.induced-topology',
      cluster: 'cat.topos',
      type: 'definition',
      label: '诱导拓扑',
      title: '诱导拓扑',
      regions: ['category'],
      tags: ['范畴论', '景', '诱导拓扑'],
      notes: [
        '**在说什么**：给定**任意**函子 $f^{-1} : \\mathcal{C} \\to \\mathcal{C}\'$，在 $\\mathcal{C}$ 上取「使 $f^{-1}$ 连续的最细 Grothendieck 拓扑」。',
        '⭐ 用处：把任意一个预层层面上的拉回升级成**景的态射**（SGA4 的标准构造）；代价是要重算覆盖，得到的拓扑一般比原来的细。',
        '⛔ **同名不同物**：拓扑空间里的「诱导拓扑」（子空间拓扑，`def.subspace-topology`）与这里说的**景上的拓扑**毫无关系，只共享中文名。',
      ].join('\n'),
      statement: '设 $\\mathcal{C}\'$ 是景，$f^{-1} : \\mathcal{C} \\to \\mathcal{C}\'$ 是任何函子。$\\mathcal{C}$ 上的**诱导拓扑**是使 $f^{-1}$ **连续**的最细拓扑。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    }
  ],

  edges: []
});
