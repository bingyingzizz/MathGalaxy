/* ==========================================================================
   内容包 · 拓扑空间（开集这套语言）
   --------------------------------------------------------------------------
   体检时这块排第二：拓扑空间 / 开集的说法出现在 23 个节点里（Borel σ-代数要
   「设 X 是拓扑空间」、距离空间说「开球构成一组基」、紧性说「开覆盖」），
   却只有距离空间这一个星团，拓扑本身一个节点都没有。

   落点：新星团 topology.general（拓扑空间）。
   拓扑学星系原有一个星团「度量空间」，这一包造出更底层的那套语言：
   开集 → 闭集 → 基 → 连续映射 → 同胚。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑空间',
  nodes: [

    /* ------------------------------------------------------ 拓扑空间 */
    {
      id: 'def.topology',
      cluster: 'topology.general',
      type: 'definition',
      label: '拓扑空间与开集',
      title: '拓扑空间 / 开集（Topological Space）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '开集'],
      statement: [
        '设 $X$ 是集合，$\\mathcal{T} \\subseteq \\mathcal{P}(X)$ 是 $X$ 的一族子集。$(X, \\mathcal{T})$ 是一个**拓扑空间**，$\\mathcal{T}$ 叫作 $X$ 上的一个**拓扑**，当且仅当：',
        '',
        '1. **含两端**：$\\emptyset \\in \\mathcal{T}$ 且 $X \\in \\mathcal{T}$；',
        '2. **任意并封闭**：$\\{ U_i \\}_{i \\in I} \\subseteq \\mathcal{T} \\implies \\bigcup_{i \\in I} U_i \\in \\mathcal{T}$（$I$ 任意，可以不可数）；',
        '3. **有限交封闭**：$U, V \\in \\mathcal{T} \\implies U \\cap V \\in \\mathcal{T}$。',
        '',
        '$\\mathcal{T}$ 的成员称为**开集**，它们的补集称为**闭集**。'
      ].join('\n'),
      notes: '⭐ 这三条公理是把「实数上开区间的性质」抽象出来的结果：任意多个开集并起来还是开集，但只有**有限**个开集交起来才保证是开集（$\\bigcap_n (-1/n, 1/n) = \\{0\\}$ 不是开集）。\n\n这套语言的好处是**只留下「哪些集合算开」这一件事**，于是距离、度量、坐标全都可以扔掉 —— 连续、紧、连通、极限这些概念照样能说。\n\n⚠ 同一集合上可以有多个不同的拓扑；比较时用「更细 / 更粗」而不是大小。',
      refs: ['Munkres, Topology, Ch. 2']
    },

    /* -------------------------------------------------------- 闭集 */
    {
      id: 'def.closed-set',
      cluster: 'topology.general',
      type: 'definition',
      label: '闭集与闭包',
      title: '闭集 / 闭包 / 稠密（Closed Set, Closure）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '闭集'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间。',
        '',
        '- $F \\subseteq X$ 是**闭集**：$X \\setminus F$ 是开集；',
        '- $A \\subseteq X$ 的**闭包** $\\operatorname{cl} A$：一切包含 $A$ 的闭集之交（最小的那个闭集）；',
        '- $A$ **稠密**：$\\operatorname{cl} A = X$；',
        '- $x$ 的**邻域**：任何含 $x$ 的开集（的包含者）。',
        '',
        '由 De Morgan 律，开集的三条公理翻译成闭集就是：$\\emptyset, X$ 闭；**任意**交闭；**有限**并闭。'
      ].join('\n'),
      notes: '⭐ 开与闭不是互斥的：$\\emptyset$ 与 $X$ 既开又闭；在 $\\mathbb{R}$ 里 $[0, 1]$ 是闭的，$[0, 1)$ 既不开也不闭。\n\n闭包是「把极限点都收进来」：在距离空间里 $\\operatorname{cl} A$ 恰好是「$A$ 中某个序列的极限」全体。',
      refs: ['Munkres, Topology, Ch. 2']
    },

    /* ---------------------------------------------------------- 基 */
    {
      id: 'def.topology-base',
      cluster: 'topology.general',
      type: 'definition',
      label: '基与子基',
      title: '拓扑的基 / 子基（Basis, Subbasis）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '基'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间，$\\mathcal{B} \\subseteq \\mathcal{T}$。$\\mathcal{B}$ 是拓扑 $\\mathcal{T}$ 的一组**基**，当且仅当每个开集都是 $\\mathcal{B}$ 中若干成员之并；等价条件：',
        '',
        '1. $\\bigcup \\mathcal{B} = X$；',
        '2. 对 $B_1, B_2 \\in \\mathcal{B}$ 与 $x \\in B_1 \\cap B_2$，存在 $B_3 \\in \\mathcal{B}$ 使 $x \\in B_3 \\subseteq B_1 \\cap B_2$。',
        '',
        '$\\mathcal{S} \\subseteq \\mathcal{P}(X)$ 是**子基**，当且仅当它的**有限交**全体构成一组基。'
      ].join('\n'),
      notes: '⭐ 基的用处：**只需在基上验证，就自动对一切开集成立**。\n- 距离空间里：开球全体构成一组基；\n- $\\mathbb{R}$ 上：开区间构成一组基；半开区间 $\\{ (a, b] \\}$ 也是（这一条在构造 Lebesgue–Stieltjes 测度时更好用）；\n- 积拓扑、$\\sigma$-代数的「柱集」也是同一套路：先定一组好用的集合，再取它生成的东西。\n\n⚠ 基不是唯一的：同一个拓扑可以有很多组基。',
      refs: ['Munkres, Topology, Ch. 2']
    },

    /* ---------------------------------------------------- 连续映射 */
    {
      id: 'def.continuous-map',
      cluster: 'topology.general',
      type: 'definition',
      label: '连续映射',
      title: '连续映射（Continuous Map）',
      regions: ['topology', 'analysis'],
      tags: ['定义', '拓扑', '连续'],
      statement: [
        '设 $X$、$Y$ 是拓扑空间。映射 $f : X \\to Y$ **连续**，当且仅当**每个开集的原像是开集**：',
        '',
        '$$V \\in \\mathcal{T}_Y \\implies f^{-1}(V) \\in \\mathcal{T}_X$$',
        '',
        '只需对某一组**基**（或子基）验证即可。',
        '',
        '连续的复合仍连续：$f$、$g$ 连续 $\\implies g \\circ f$ 连续。'
      ].join('\n'),
      notes: '⭐ 这条定义是 $\\varepsilon$-$\\delta$ 的**抽象化**：在距离空间里，「$f^{-1}(V)$ 开」与「$\\varepsilon$ 给出 $\\delta$」逐字等价 —— 因为开球就是 $\\varepsilon$ 邻域。所以「连续」是拓扑性质，跟具体距离无关。\n\n⚠ 用**原像**而不是像：原像对并、交、补全部保持，像没有这些性质。这与可测函数的定义（$f^{-1}(E) \\in \\mathcal{M}$）是同一个套路。',
      refs: ['Munkres, Topology, Ch. 2']
    },

    /* -------------------------------------------------------- 同胚 */
    {
      id: 'def.homeomorphism',
      cluster: 'topology.general',
      type: 'definition',
      label: '同胚',
      title: '同胚（Homeomorphism）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '同胚'],
      statement: [
        '设 $X$、$Y$ 是拓扑空间。$f : X \\to Y$ 是**同胚**，当且仅当',
        '',
        '- $f$ 是双射；',
        '- $f$ 与 $f^{-1}$ 都连续。',
        '',
        '此时记 $X \\cong Y$，称两个空间**同胚**。「同胚」是拓扑空间之间的等价关系（恒等、逆、复合都保持）。'
      ].join('\n'),
      notes: '⭐ 同胚 = 「拓扑上分不出来」：一切**拓扑性质**（紧性、连通性、Hausdorff、闭包）都保持不变。\n\n⚠ 反过来也要当心：**度量性质在同胚下会变**。$\\mathbb{R}$ 与开区间 $(0, 1)$ 同胚（$x \\mapsto \\frac{1}{2} + \\frac{1}{\\pi}\\arctan x$），但前者完备、后者不完备 —— 这就是「完备性不是拓扑性质」的经典例子，也是距离空间里「紧 / 闭」与「完备 / 全有界」两类性质的分界线。',
      refs: ['Munkres, Topology, Ch. 2']
    },

    /* ------------------------------------------------ 子空间与商拓扑 */
    {
      id: 'def.subspace-topology',
      cluster: 'topology.general',
      type: 'definition',
      label: '子空间拓扑',
      title: '子空间拓扑（Subspace Topology）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '子空间'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间，$Y \\subseteq X$。$Y$ 上的**子空间拓扑**取',
        '',
        '$$\\mathcal{T}_{Y} := \\{\\, U \\cap Y : U \\in \\mathcal{T} \\,\\}$$',
        '',
        '这样得到的拓扑是使含入映射 $Y \\hookrightarrow X$ 连续的最粗拓扑。'
      ].join('\n'),
      notes: '直观：**子空间的开集就是「大空间的开集切一刀」**。所以「$Y$ 中闭」「$Y$ 中紧」都要按切出来的那片来判断，不能直接看大空间里的样子 —— 例如 $(0, 1) \\subseteq \\mathbb{R}$ 在自身中是闭的，在 $\\mathbb{R}$ 中不是。',
      refs: ['Munkres, Topology']
    },
    {
      id: 'def.quotient-topology',
      cluster: 'topology.general',
      type: 'definition',
      label: '商拓扑',
      title: '商拓扑（Quotient Topology）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '商'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间，$\\pi : X \\twoheadrightarrow Y$ 是满射。$Y$ 上的**商拓扑**取',
        '',
        '$$\\mathcal{T}_{Y} := \\{\\, V \\subseteq Y : \\pi^{-1}(V) \\in \\mathcal{T} \\,\\}$$',
        '',
        '这是使 $\\pi$ 连续的最细拓扑；带这个拓扑的 $Y$ 叫 $X$ 的**商空间**。'
      ].join('\n'),
      notes: '直观：**商空间的开集就是「拉回去是开的」的那些**。所以商空间里的性质要「从上面看下来」：$Y$ 中有没有开集分离两个点，问的是它们的原像能不能被 $X$ 的开集分开。\n\n商拓扑与子空间拓扑是方向相反的一对：一个取「切一刀得到的最粗」，一个取「贴回去得到的最细」。',
      refs: ['Munkres, Topology']
    },

    {
      id: 'def.product-topology',
      cluster: 'topology.general',
      type: 'definition',
      label: '积拓扑',
      title: '积拓扑与乘积空间（Product Topology）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '乘积', '投影'],
      statement: [
        '设 $(X_{i}, \\mathcal{T}_{i})_{i \\in I}$ 是一族拓扑空间。$\\prod_{i \\in I} X_{i}$ 上的**积拓扑**是以',
        '',
        '$$\\prod_{i \\in I} U_{i} \\qquad (U_{i} \\in \\mathcal{T}_{i},\\ \\text{除有限多个 } i \\text{ 外 } U_{i} = X_{i})$$',
        '',
        '为基的拓扑 —— 也就是使所有投影 $\\pi_{j} : \\prod_{i} X_{i} \\to X_{j}$ 都连续的**最粗**拓扑。'
      ].join('\n'),
      notes: [
        '⭐ **「最粗」是关键字**：投影要连续，只要求每个 $\\pi_{j}^{-1}(U_{j})$ 是开的；把这些取有限交当基，就是积拓扑。要求更细反而会丢掉极限 —— 而「$x_{n} \\to x$ $\\iff$ 按每个分量都收敛」正是这条最粗性换来的。',
        '**范畴意义**：$\\prod_{i} X_{i}$ 连同投影就是 $\\mathbf{Top}$ 里的**积**。所以积拓扑不是随便挑的，它是泛性质唯一确定的那一个。'
      ].join('\n\n'),
      refs: ['Munkres, Topology']
    },

    /* ------------------------------------------------------ 分离公理 */
    {
      id: 'def.hausdorff',
      cluster: 'topology.general',
      type: 'definition',
      label: 'Hausdorff 空间',
      title: 'Hausdorff 空间 / $T_{2}$（Hausdorff Space）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理'],
      statement: [
        '拓扑空间 $X$ 叫 **Hausdorff 空间**（或 **$T_{2}$ 空间**），如果任意两个不同点都**可以被开集分开**：',
        '',
        '$$\\forall x \\ne y \\in X,\\ \\exists U \\ni x,\\ V \\ni y \\ \\text{开},\\quad U \\cap V = \\emptyset$$'
      ].join('\n'),
      notes: [
        '一句话：**极限唯一**。序列只要收敛就只能收敛到一个点 —— 这正是分析里默认的那种空间。',
        '更强的分离性是**正规**（$T_{4}$）：任意两个不交闭集可被开集分开。紧 Hausdorff 空间是正规的（证明用两次紧性造开覆盖再取有限子覆盖）。',
        '$T_{3}$（正则）与 $T_{3.5}$（Tychonoff）夹在中间：$T_{3.5}$ 说的是**不同的点可以被连续函数分离开**，也就是「连续函数足够多」这一条。Stone–Čech 紧化的单射性要求的正是它。'
      ].join('\n\n'),
      refs: ['Munkres, Topology']
    },

    /* ---------------------------------------------------------- 连通 */
    {
      id: 'def.connected',
      cluster: 'topology.general',
      type: 'definition',
      label: '连通与连通分量',
      title: '连通空间与连通分量（Connectedness）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '连通'],
      statement: [
        '拓扑空间 $X$ 叫**不连通的**，如果它可以写成两个不交非空开集之并 $X = U \\sqcup V$；否则叫**连通的**。',
        '',
        '固定 $x \\in X$，包含 $x$ 的**连通分量** $C(x)$ 是所有含 $x$ 的连通子集的并 —— 它本身连通，且是极大的。'
      ].join('\n'),
      notes: '连通分量构成 $X$ 的一个划分，且每个分量都是闭的。**既开又闭**的子集（记作**闭开集**）与连通性是同一件事的两面：$X$ 连通当且仅当它的闭开子集只有 $\\emptyset$ 与 $X$ 本身 —— 所以「有没有非平凡的闭开集」就是「能不能断开」。',
      refs: ['Munkres, Topology']
    },
    {
      id: 'def.clopen',
      cluster: 'topology.general',
      type: 'definition',
      label: '闭开集',
      title: '闭开集（Clopen Set）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '闭开集'],
      statement: [
        '$X$ 的子集 $K$ 叫**闭开集**，如果它同时是开集与闭集。等价地：$K$ 与它的补 $K^{c}$ 都是开集，即 $X = K \\sqcup K^{c}$ 是一个不交非空开集之并（$K$ 非平凡时）。'
      ].join('\n'),
      notes: '闭开集在一般的拓扑空间里是「稀有物种」：在 $\\mathbb{R}$、$[0,1]$ 这类连通空间里只有 $\\emptyset$ 与全空间。**闭开集越多，空间越碎** —— 全不连通说的就是「闭开集多到能分开任何两个点」；投射有限空间则是「闭开集构成一组基」。',
      refs: ['Munkres, Topology']
    }
  ],

  edges: [

    /* ------------------------------------------------------ 依赖 */
    {
      id: 'dep.powerset-topology',
      kind: 'definition',
      definition: 'def.power-set',
      usedBy: 'def.topology',
      note: '拓扑是**幂集**的一族子集：$\\mathcal{T} \\subseteq \\mathcal{P}(X)$。'
    },
    {
      id: 'dep.subset-topology',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.topology',
      note: '「开集是 $X$ 的子集」「$\\mathcal{T}$ 作为集合族」都是子集关系。'
    },
    {
      id: 'dep.topology-closed',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.closed-set',
      note: '闭集定义成**开集**的补，开集的性质靠 De Morgan 律翻译过去。'
    },
    {
      id: 'dep.diff-complement-closed',
      kind: 'definition',
      definition: 'def.diff-complement',
      usedBy: 'def.closed-set',
      note: '「补集」这条定义是闭集定义的直接依据。'
    },
    {
      id: 'dep.topology-base',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.topology-base',
      note: '基是**开集族**里挑了「表现良好」的一部分：每个开集都由它并出来。'
    },
    {
      id: 'dep.topology-continuous-map',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.continuous-map',
      note: '连续映射说的是「$\\mathcal{T}_Y$ 里每个开集的原像落在 $\\mathcal{T}_X$ 里」。'
    },
    {
      id: 'dep.bijection-homeo',
      kind: 'definition',
      definition: 'def.bijection',
      usedBy: 'def.homeomorphism',
      note: '同胚首先是**双射**，再要求两个方向都连续。'
    },
    {
      id: 'dep.continuous-map-homeo',
      kind: 'definition',
      definition: 'def.continuous-map',
      usedBy: 'def.homeomorphism',
      note: '「$f$ 与 $f^{-1}$ 都连续」用的是**连续映射**。'
    },

    /* ------------------------------------- 拓扑这套语言往外走 */
    {
      id: 'dep.topology-metric',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.metric-space',
      note: '$d$ 诱导出的那族开集（开球之并）就是这条定义里的拓扑：三条公理逐条可验（任意并由球的定义封闭，有限交由三角不等式保证）。所以**每个距离空间都是拓扑空间**，反之不成立。'
    },
    {
      id: 'dep.topology-borel',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.borel',
      note: 'Borel $\\sigma$-代数就是「设 $X$ 是**拓扑空间**，取全体开集生成的 $\\sigma$-代数」。'
    },
    {
      id: 'dep.topology-engine-continuous',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.continuous',
      note: '$\\varepsilon$-$\\delta$ 那套是**拓扑版连续**在实数（或距离空间）上的展开形式：开球就是 $\\varepsilon$ 邻域。'
    },
    {
      id: 'dep.closed-set-compact-closed',
      kind: 'definition',
      definition: 'def.closed-set',
      usedBy: 'prop.compact-subset-closed',
      note: '「紧子集是闭的」里的「闭」就是这条定义的闭集。'
    },
    {
      id: 'dep.base-metric',
      kind: 'definition',
      definition: 'def.topology-base',
      usedBy: 'def.metric-space',
      note: '距离空间里「开球全体构成这个拓扑的一组**基**」——这就是基的定义的一个标准例子。'
    },
    {
      id: 'dep.topology-subspace',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.subspace-topology',
      note: '子空间拓扑是拿**大空间的拓扑**里的开集与 $Y$ 求交得到的。'
    },
    {
      id: 'dep.subset-subspace',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.subspace-topology',
      note: '$Y \\subseteq X$ —— 先有子集，才谈得上它上面的子空间拓扑。'
    },
    {
      id: 'dep.topology-quotient',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.quotient-topology',
      note: '商拓扑问的是商集的哪些子集**拉回去是开的**，判断依据仍是大空间的拓扑。'
    },
    {
      id: 'dep.function-quotient',
      kind: 'definition',
      definition: 'def.function',
      usedBy: 'def.quotient-topology',
      note: '商拓扑是先有一个**满射** $\\pi : X \\twoheadrightarrow Y$，再反过来给 $Y$ 装拓扑。'
    },
    {
      id: 'dep.topology-hausdorff',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.hausdorff',
      note: '「两个点可被**开集**分开」——开集是拓扑的一部分。'
    },
    {
      id: 'dep.topology-connected',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.connected',
      note: '「不能写成两个不交非空**开集**之并」是拿拓扑说出来的。'
    },
    {
      id: 'dep.topology-clopen',
      kind: 'definition',
      definition: 'def.closed-set',
      usedBy: 'def.clopen',
      note: '闭开集 = **开集** 且 **闭集**，两个概念各占一半。'
    }
  ]
});
