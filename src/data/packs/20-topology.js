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
      title: '拓扑空间 / 开集',
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
      notes: [
        '⭐ 这三条公理是把「实数上开区间的性质」抽象出来的结果：任意多个开集并起来还是开集，但只有**有限**个开集交起来才保证是开集（$\\bigcap_n (-1/n, 1/n) = \\{0\\}$ 不是开集）。\n\n这套语言的好处是**只留下「哪些集合算开」这一件事**，于是距离、度量、坐标全都可以扔掉 —— 连续、紧、连通、极限这些概念照样能说。\n\n⚠ 同一集合上可以有多个不同的拓扑；\n\n比较时用「更细 / 更粗」而不是大小。',
        ,
        '**各方向用到的假设**（拓扑是公理定义，不包含度量或分离性要求）：\n' +
        '- 拓扑 $\\iff$ 所列三条公理：两方向都是定义展开，不用紧性、选择公理或度量。\n' +
        '- 任意并封闭 $\\implies\\emptyset$ 开，须允许空指标族；二元交封闭 $\\implies$ 非空有限交封闭靠归纳，空交为 $X$ 仍需含 $X$ 的约定。\n' +
        '- 开集公理 $\\iff$ 补集族满足任意交及有限并公理：用 De Morgan 恒等式，不需额外拓扑假设。\n' +
        '- 有限交不能升级成任意交：通常实数拓扑中 $\\bigcap_{n\\ge1}(-1/n,1/n)=\\{0\\}$ 不开；拓扑也不自动 Hausdorff，非单点集合的不可分拓扑就是反例。\n'
      ].join('\n\n'),
      refs: [
      'Engelking, General Topology, Ch. 1 §1.1','Munkres, Topology, Ch. 2']
    },

    /* -------------------------------------------------------- 闭集 */
    {
      id: 'def.closed-set',
      cluster: 'topology.general',
      type: 'definition',
      label: '闭集与闭包',
      title: '闭集 / 闭包 / 稠密',
      regions: ['topology'],
      tags: ['定义', '拓扑', '闭集'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间。',
        '',
        '- $F \\subseteq X$ 是**闭集**：$X \\setminus F$ 是开集；',
        '- $A \\subseteq X$ 的**闭包** $\\overline{A}$：一切包含 $A$ 的闭集之交（最小的那个闭集）；',
        '- $A$ **稠密**：$\\overline{A} = X$；',
        '- $x$ 的**邻域**：任何含 $x$ 的开集（的包含者）。',
        '',
        '由 De Morgan 律，开集的三条公理翻译成闭集就是：$\\emptyset, X$ 闭；**任意**交闭；**有限**并闭。'
      ].join('\n'),
      notes: '⭐ 开与闭不是互斥的：$\\emptyset$ 与 $X$ 既开又闭；在 $\\mathbb{R}$ 里 $[0, 1]$ 是闭的，$[0, 1)$ 既不开也不闭。\n\n闭包是「把极限点都收进来」：在距离空间里 $\\overline{A}$ 恰好是「$A$ 中某个序列的极限」全体。',
      refs: [
      'Engelking, General Topology, Ch. 1 §1.1','Munkres, Topology, Ch. 2']
    },

    /* ---------------------------------------------------------- 基 */
    {
      id: 'def.topology-base',
      cluster: 'topology.general',
      type: 'definition',
      label: '基与子基',
      title: '拓扑的基 / 子基',
      regions: ['topology'],
      tags: ['定义', '拓扑', '基'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间，$\\mathcal{B} \\subseteq \\mathcal{T}$。$\\mathcal{B}$ 是拓扑 $\\mathcal{T}$ 的一组**基**，当且仅当每个开集都是 $\\mathcal{B}$ 中若干成员之并。若再要求 $\\mathcal{T}$ **恰好**是 $\\mathcal{B}$ 生成的拓扑（即 $\\mathcal{B} \\subseteq \\mathcal{T}$，且 $\\mathcal{T}$ 恰为「$\\mathcal{B}$ 中若干成员之并」的全体），则等价于：',
        '',
        '1. $\\bigcup \\mathcal{B} = X$；',
        '2. 对 $B_1, B_2 \\in \\mathcal{B}$ 与 $x \\in B_1 \\cap B_2$，存在 $B_3 \\in \\mathcal{B}$ 使 $x \\in B_3 \\subseteq B_1 \\cap B_2$。',
        '',
        '$\\mathcal{S} \\subseteq \\mathcal{P}(X)$ 是**子基**，当且仅当它的**有限交**全体构成一组基。'
      ].join('\n'),
      notes: [
        '⭐ 基的用处：**只需在基上验证，就自动对一切开集成立**。\n\n\n- 距离空间里：开球全体构成一组基；\n- $\\mathbb{R}$ 上：开区间构成一组基；半开区间 $\\{ (a, b] \\}$ 生成的是**另一拓扑**（上半极限拓扑）的基 —— 它们不是通常开集，所以**不是**通常拓扑的基（不过构造 Lebesgue–Stieltjes 测度时更好用）；\n\n\n- 积拓扑、$\\sigma$-代数的「柱集」也是同一套路：先定一组好用的集合，再取它生成的东西。\n\n⚠ 基不是唯一的：同一个拓扑可以有很多组基。',
        ,
        '**各方向用到的假设**（生成一个拓扑与成为指定拓扑的基必须区别）：\n' +
        '- 是给定 $\\mathcal T$ 的基 $\\iff$ 每个 $\\mathcal T$ 开集为基元并：这是定义展开；从此推出覆盖和局部交条件，用 $X$ 与两基元的交都开。\n' +
        '- 覆盖与局部交条件 $\\implies$ 基元任意并构成一个拓扑：有限交用局部加细，其余公理直接核对，不用选择公理，可取全部满足条件的基元。\n' +
        '- 节点列出的两条件不能单独反推是给定 $\\mathcal T$ 的基：还须 $\\mathcal T$ 等于所生成拓扑。例如离散的两点空间取 $\\mathcal B=\\{X\\}$，满足两条件却不能生成单点开集。\n' +
        '- 子基 $\\iff$ 有限交全体为基：按约定是定义展开，有限交应含空交 $X$；通常实数拓扑的基元必须是通常开集，半开区间生成的是另一拓扑。\n'
      ].join('\n\n'),
      refs: [
      'Engelking, General Topology, Ch. 1 §1.1','Munkres, Topology, Ch. 2']
    },

    /* ---------------------------------------------------- 连续映射 */
    {
      id: 'def.continuous-map',
      cluster: 'topology.general',
      type: 'definition',
      label: '连续映射',
      title: '连续映射',
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
      notes: '⭐ 这条定义是 $\\varepsilon$-$\\delta$ 的**抽象化**：在距离空间里，「$f^{-1}(V)$ 开」与「$\\varepsilon$ 给出 $\\delta$」逐字等价 —— 因为开球就是 $\\varepsilon$ 邻域。\n\n所以「连续」是拓扑性质，跟具体距离无关。\n\n⚠ 用**原像**而不是像：原像对并、交、补全部保持，像没有这些性质。\n\n这与可测函数的定义（$f^{-1}(E) \\in \\mathcal{M}$）是同一个套路。',
      refs: [
      'Engelking, General Topology, Ch. 1 §1.4','Munkres, Topology, Ch. 2']
    },

    /* -------------------------------------------------------- 同胚 */
    {
      id: 'def.homeomorphism',
      cluster: 'topology.general',
      type: 'definition',
      label: '同胚',
      title: '同胚',
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
      notes: [
        '⭐ 同胚 = 「拓扑上分不出来」：一切**拓扑性质**（紧性、连通性、Hausdorff、闭包）都保持不变。\n\n⚠ 反过来也要当心：**度量性质在同胚下会变**。\n\n$\\mathbb{R}$ 与开区间 $(0, 1)$ 同胚（$x \\mapsto \\frac{1}{2} + \\frac{1}{\\pi}\\arctan x$），但前者完备、后者不完备 —— 这就是「完备性不是拓扑性质」的经典例子，也是距离空间里「紧 / 闭」与「完备 / 全有界」两类性质的分界线。',
        '**三种等价说法，差在“开/闭”的哪一边**：\n' +
        '\n' +
        '- 定义（双射 + $f$、$f^{-1}$ 连续）$\\iff$ **$f$ 是连续开双射** $\\iff$ **$f$ 是连续闭双射**：$(\\implies)$ 由 $f^{-1}$ 连续得 $f$ 开；$(\\Leftarrow)$ 由 $f$ 开得 $f^{-1}$ 连续。**这两步都只用开集/闭集的对偶，不需要额外假设。**\n' +
        '- **连续双射不必同胚**：需要额外假设才成立，最常用的两条是「紧 $\\to$ Hausdorff」（`prop.compact-subset-closed` 型的论证）与「开映射定理」（`thm.open-mapping-banach`，Banach 空间之间的连续**线性**双射）。⚠️ 所以「同胚 = 连续双射」这个错误说法，在**紧 Hausdorff** 与 **Banach** 这两种情形下才碰巧为真。\n' +
        '\n' +
        '⚠️ 同胚是拓扑空间范畴的**同构**：它保持一切拓扑性质（连通、紧、可数性、分离性），这正是它作为「等价关系」的意义。\n'
      ].join('\n\n'),
      refs: [
      'Engelking, General Topology, Ch. 1 §1.4','Munkres, Topology, Ch. 2']
    },

    /* ------------------------------------------------ 子空间与商拓扑 */
    {
      id: 'def.subspace-topology',
      cluster: 'topology.general',
      type: 'definition',
      label: '子空间拓扑',
      title: '子空间拓扑',
      regions: ['topology'],
      tags: ['定义', '拓扑', '子空间'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间，$Y \\subseteq X$。$Y$ 上的**子空间拓扑**取',
        '',
        '$$\\mathcal{T}_{Y} := \\{\\, U \\cap Y : U \\in \\mathcal{T} \\,\\}$$',
        '',
        '这样得到的拓扑是使含入映射 $Y \\hookrightarrow X$ 连续的最粗拓扑。'
      ].join('\n'),
      notes: '直观：**子空间的开集就是「大空间的开集切一刀」**。所以「$Y$ 中闭」「$Y$ 中紧」都要按切出来的那片来判断，不能直接看大空间里的样子 —— 例如 $(0, 1) \\subseteq \\mathbb{R}$ 在自身中是闭的，在 $\\mathbb{R}$ 中不是。\n\n📌 本图另有 `def.induced-topology`，但那是**同名不同物**：它指景上由函子诱导的 Grothendieck 拓扑，与子空间拓扑只共享中文名（不合并）。',
      refs: [
      'Engelking, General Topology, Ch. 2 §2.1','Munkres, Topology']
    },
    {
      id: 'def.quotient-topology',
      cluster: 'topology.general',
      type: 'definition',
      label: '商拓扑',
      title: '商拓扑',
      regions: ['topology'],
      tags: ['定义', '拓扑', '商'],
      statement: [
        '设 $(X, \\mathcal{T})$ 是拓扑空间，$\\pi : X \\twoheadrightarrow Y$ 是满射。$Y$ 上的**商拓扑**取',
        '',
        '$$\\mathcal{T}_{Y} := \\{\\, V \\subseteq Y : \\pi^{-1}(V) \\in \\mathcal{T} \\,\\}$$',
        '',
        '这是使 $\\pi$ 连续的最细拓扑；带这个拓扑的 $Y$ 叫 $X$ 的**商空间**。'
      ].join('\n'),
      notes: '直观：**商空间的开集就是「拉回去是开的」的那些**。所以商空间里的性质要「从上面看下来」：$Y$ 中有没有开集分离两个点，问的是它们的原像能不能被 $X$ 的开集分开。\n\n商拓扑与子空间拓扑是方向相反的一对：一个取「切一刀得到的最粗」，一个取「贴回去得到的最细」。\n\n📌 拓扑语境的「商空间」是这里；**向量空间**的商空间是 `def.quotient-vs`。',
      refs: [
      'Engelking, General Topology, Ch. 2 §2.4','Munkres, Topology']
    },

    {
      id: 'def.product-topology',
      cluster: 'topology.general',
      type: 'definition',
      label: '积拓扑',
      title: '积拓扑与乘积空间',
      regions: ['topology'],
      tags: ['定义', '拓扑', '乘积', '投影'],
      statement: [
        '设 $(X_{i}, \\mathcal{T}_{i})_{i \\in I}$ 是一族拓扑空间。$\\prod_{i \\in I} X_{i}$ 上的**积拓扑**是以',
        '',
        '$$\\prod_{i \\in I} U_{i} \\qquad (U_{i} \\in \\mathcal{T}_{i},$$',
        '其中**除有限多个 $i$ 之外**都有 $U_{i} = X_{i}$）',
        '',
        '为基的拓扑 —— 也就是使所有投影 $\\pi_{j} : \\prod_{i} X_{i} \\to X_{j}$ 都连续的**最粗**拓扑。'
      ].join('\n'),
      notes: [
        '⭐ **「最粗」是关键字**：投影要连续，只要求每个 $\\pi_{j}^{-1}(U_{j})$ 是开的；把这些取有限交当基，就是积拓扑。要求更细反而会丢掉极限 —— 而「$x_{n} \\to x$ $\\iff$ 按每个分量都收敛」正是这条最粗性换来的。',
        '**范畴意义**：$\\prod_{i} X_{i}$ 连同投影就是 $\\mathbf{Top}$ 里的**积**。所以积拓扑不是随便挑的，它是泛性质唯一确定的那一个。'
      ].join('\n\n'),
      refs: [
      'Engelking, General Topology, Ch. 2 §2.3','Munkres, Topology']
    },

    /* ------------------------------------------------------ 分离公理 */
    {
      id: 'def.hausdorff',
      cluster: 'topology.separation',
      type: 'definition',
      label: 'Hausdorff 空间',
      title: 'Hausdorff 空间 / $T_{2}$',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理'],
      statement: [
        '拓扑空间 $X$ 叫 **Hausdorff 空间**（或 **$T_{2}$ 空间**），如果任意两个不同点都**可以被开集分开**：',
        '',
        '$$\\forall x \\ne y \\in X,\\ \\exists U \\ni x,\\ V \\ni y\\ \\text{open}:\\quad U \\cap V = \\emptyset$$'
      ].join('\n'),
      notes: [
        '一句话：**极限唯一**。序列只要收敛就只能收敛到一个点 —— 这正是分析里默认的那种空间。',
        '更强的分离性是**正规**（$T_{4}$）：任意两个不交闭集可被开集分开。紧 Hausdorff 空间是正规的（证明用两次紧性造开覆盖再取有限子覆盖）。',
        '$T_{3}$ 与 $T_{3.5}$ 夹在中间：$T_{3}$ 是「单点与不含它的闭集可被开集分开」，$T_{3.5}$ 把它升级成「可由**连续函数**分开」（即「连续函数足够多」这一条）。\n\n' +
        'Stone–Čech 紧化的单射性要求的正是 $T_{3.5}$。\n\n' +
        '⚠️ **命名口径**（本图采用）：$T$-number 是**裸性质**，中文名才带 $T_{1}$ —— 所以「正则空间」= $T_{3} + T_{1}$（`def.regular-space`），「完全正则空间」= $T_{3.5} + T_{1}$（`def.completely-regular-space`）。\n\n' +
        '裸 $T_{3}$ 推不出 $T_{1}$。'
      ].join('\n\n'),
      refs: [
      'Engelking, General Topology, Ch. 1 §1.5','Munkres, Topology']
    },

    /* ---------------------------------------------------------- 连通 */
    {
      id: 'def.connected',
      cluster: 'topology.general',
      type: 'definition',
      label: '连通与连通分量',
      title: '连通空间与连通分量',
      regions: ['topology'],
      tags: ['定义', '拓扑', '连通'],
      statement: [
        '拓扑空间 $X$ 叫**不连通的**，如果它可以写成两个不交非空开集之并 $X = U \\sqcup V$；否则叫**连通的**。',
        '',
        '固定 $x \\in X$，包含 $x$ 的**连通分量** $C(x)$ 是所有含 $x$ 的连通子集的并 —— 它本身连通，且是极大的。'
      ].join('\n'),
      notes: [
        '连通分量构成 $X$ 的一个划分，且每个分量都是闭的。**既开又闭**的子集（记作**闭开集**）与连通性是同一件事的两面：$X$ 连通当且仅当它的闭开子集只有 $\\emptyset$ 与 $X$ 本身 —— 所以「有没有非平凡的闭开集」就是「能不能断开」。',
        '**四种说法，代价都在“取补”与“连续像”上**：\n' +
        '\n' +
        '- 连通 $\\iff$ **不能写成两个不交非空开集之并**：这是定义。\n' +
        '- 连通 $\\iff$ **没有非平凡的闭开子集**：$(\\implies)$ 用 $V = X \\setminus U$ 闭；$(\\Leftarrow)$ 一行。**这一步只用开闭集的对偶**。\n' +
        '- 连通 $\\iff$ **每个连续映射 $X \\to \\{0,1\\}$（离散两点）都是常值**：$(\\implies)$ 像连通且 $\\{0,1\\}$ 不连通；$(\\Leftarrow)$ 由前一条取特征函数。⚠️ 这一步把连通性翻译成「没有到两点的满射」，是内部语言里的标准形式。\n' +
        '- **有公共点的一族连通子集之并连通**（两两相交即可，再归纳到任意多个；避免 AC 的办法是取「含定点的那一族」）。反过来，**全体连通分量的并 = $X$ 当然不必连通** —— 离散两点空间里两个单点分量之并就是 $X$，它不连通。\n' +
        '\n' +
        '⚠️ **连通 $\\ne$ 道路连通**：道路连通 $\\implies$ 连通，反之不成立（拓扑学家的正弦曲线）。两者的差距正是「$\\pi_{0}$ 与道路 $\\pi_{0}$」的差距。\n'
      ].join('\n\n'),
      refs: [
      'Engelking, General Topology, Ch. 6 §6.1','Munkres, Topology']
    },
    {
      id: 'def.clopen',
      cluster: 'topology.general',
      type: 'definition',
      label: '闭开集',
      title: '闭开集',
      regions: ['topology'],
      tags: ['定义', '拓扑', '闭开集'],
      statement: [
        '$X$ 的子集 $K$ 叫**闭开集**，如果它同时是开集与闭集。等价地：$K$ 与它的补 $K^{c}$ 都是开集，即 $X = K \\sqcup K^{c}$ 是一个不交非空开集之并（$K$ 非平凡时）。'
      ].join('\n'),
      notes: '闭开集在一般的拓扑空间里是「稀有物种」：在 $\\mathbb{R}$、$[0,1]$ 这类连通空间里只有 $\\emptyset$ 与全空间。**闭开集越多，空间越碎** —— 全不连通是「连通分量全是单点」；「闭开集能分开任意两点」（= 零维）只有在**紧 Hausdorff** 下才与之等价；投射有限空间则是「闭开集构成一组基」。',
      refs: ['Munkres, Topology']
    },
    /* ------------------------------------------------ Jordan 曲线 */
    {
      "id": "lem.polygon-diagonal",
      "cluster": "topology.general",
      "type": "lemma",
      "label": "简单多边形的对角线",
      "title": "引理：$n \\ge 4$ 的简单多边形必有一条对角线",
      "regions": [
        "topology"
      ],
      "tags": [
        "引理",
        "拓扑",
        "平面几何",
        "多边形"
      ],
      "statement": "设 $P = v_0v_1\\cdots v_{n-1}$ 是简单闭多边形（`def.jordan-curve` 的多边形特例），$K$ 是它围成的多边形区域。若 $n \\ge 4$，则存在两个**不相邻**的顶点 $v_i, v_j$，使开线段 $(v_i, v_j)$ 落在 $\\operatorname{int}K$ 内，且与 $P$ 只交于 $v_i, v_j$。这样的线段叫 $P$ 的一条**对角线**。",
      "notes": "**证明**用「旋转射线」：从凸顶点 $v$ 出发，把方向从一条邻边连续转到另一条，看射线第一次撞上 $P$ 的位置。第一步取 $v$，第二、四步是两个情形共用的准备，第三、五步分别处理「撞点在边内部」与「转到边界边」两种情形；最后一段是退化情形的说明。\n\n**约定**。$P = v_0v_1\\cdots v_{n-1}$ 是简单闭多边形（`def.jordan-curve` 的多边形特例：折线无自交点、首尾相接）。$K$ 指 $P$ 围成的多边形区域，$\\operatorname{int}K$ 是它的内部。**对角线**指连接两个不相邻顶点 $v_i,v_j$、且开线段 $(v_i,v_j)$ 落在 $\\operatorname{int}K$ 里的线段。\n\n**先说明一个前提：$\\operatorname{int}K$ 是什么。** 本图在 `thm.jordan-polygon` 的注里给出「射线交点奇偶 $\\Phi$」的定义与良定性（按水平条带：每个条带内 $P$ 的边都是从下边界贯到上边界、互不相交的曲线 $x = x_i(y)$，$\\Phi$ 就是「左侧墙数 mod 2」）。$\\operatorname{int}K$ 就取 $\\Phi = 1$ 的那一侧。这一步只用平面几何，不用 Jordan 曲线定理。\n\n**第一步：存在凸顶点。** 取 $P$ 中 $y$ 最小、并列时 $x$ 最小的顶点 $v$，记其邻居为 $a,b$。$P$ 的全部顶点都在闭半平面 $y \\ge y_v$ 内，与 $v$ 同高的顶点都在 $v$ 右侧（这是并列规则）。于是 $v$ 处的内角 $< \\pi$：$v$ 是凸顶点，且从 $v$ 出发、方向落在角 $\\angle avb$ 内部的射线，其起点一小段必在 $\\operatorname{int}K$ 里。\n\n**第二步：旋转射线。** 让方向 $\\theta$ 从 $\\overrightarrow{va}$ 连续转到 $\\overrightarrow{vb}$，对每个 $\\theta \\in (\\theta_a,\\theta_b)$ 令 $\\rho(\\theta) = \\sup\\{\\,t>0 : v + t\\,u(\\theta) \\in \\operatorname{int}K\\,\\}$。由第一步 $\\rho > 0$ 在 $\\theta_a$ 附近成立；$\\{\\rho > 0\\}$ 是开集，故它是若干个开区间之并。令 $\\theta^{*}$ 是含 $\\theta_a$ 的那个区间的右端点。\n\n**第三步：$\\theta^{*} < \\theta_b$ 时一定有对角线（这一段给出证明）。** 设 $\\theta^{*} < \\theta_b$。取 $\\theta \\to \\theta^{*-}$ 时射线的出界点 $z(\\theta)$（即 $v + \\rho(\\theta)u(\\theta)$）。$z(\\theta)$ 在 $\\partial K = P$ 上，且当 $\\theta$ 靠近 $\\theta^{*}$、出界点落在某条边的**内部**时，由连续性，$\\theta$ 再大一点也仍从这条边出界，即 $\\rho > 0$ —— 与 $\\theta^{*}$ 是端点矛盾。所以 $z(\\theta^{*})$ 必是 $P$ 的一个**顶点** $p$。令 $\\theta \\to \\theta^{*-}$ 还说明 $\\rho(\\theta) \\to |vp|$。\n\n**第四步：$[v,p]$ 的内部在 $\\operatorname{int}K$ 里。** 设 $t < |vp|$。取 $\\theta < \\theta^{*}$ 充分接近，使 $\\rho(\\theta) > t$；则 $v + t\\,u(\\theta) \\in \\operatorname{int}K$。令 $\\theta \\to \\theta^{*-}$，这些点收敛到 $v + t\\,u(\\theta^{*})$，故后者在 $\\overline{\\operatorname{int}K}$ 中。若它落在 $\\partial K = P$ 上，则它就是射线 $\\theta^{*}$ 的出界点，距离为 $|vp|$，与 $t < |vp|$ 矛盾。既在闭包又不在边界，故它属于 $\\operatorname{int}K$。所以 $[v,p]$ 是以 $v$ 为端点的对角线（$p \\ne a,b$ 由 $\\theta^{*} < \\theta_b$ 且 $\\theta^{*} > \\theta_a$ 保证）。\n\n**第五步：$\\theta^{*} = \\theta_b$ 的情形（第三条的补充，同样完整）。** 这时「$\\rho>0$」在整段 $(\\theta_a,\\theta_b)$ 上成立，于是每个方向都有唯一的第一撞击点 $z(\\theta) = v + \\rho(\\theta)u(\\theta) \\in P$：唯一性是因为一条射线上不同点到 $v$ 的距离互不相同，最近的那个交点不可能有两个。\n\n**$z$ 连续。** 若 $\\theta_n \\to \\theta$ 而 $z(\\theta_n) \\to z' \\ne z(\\theta)$，则 $z' \\in P$（$P$ 闭）、$z'$ 在射线 $\\theta$ 上、且 $|vz'| \\ge |vz(\\theta)|$（$z(\\theta)$ 是最近交点）。若严格大于，取 $\\theta_n$ 充分接近 $\\theta$：其第一撞击点必须落在 $z(\\theta)$ 附近（否则射线要先穿过 $P$ 上 $z(\\theta)$ 与 $z'$ 之间的部分），与 $z(\\theta_n) \\to z'$ 矛盾。故 $z$ 连续。\n\n**端点极限。** $\\theta \\to \\theta_a^{+}$ 时 $z(\\theta)$ 收敛到射线 $\\theta_a$ 上的某点 $z_a \\in P$，而射线 $\\theta_a$ 与 $P$ 的交正是线段 $va$，故 $z_a \\in [v,a]$；同理 $\\theta \\to \\theta_b^{-}$ 时 $z_b \\in [v,b]$。\n\n**于是有对角线。** $z$ 连续，故像连通；像含 $z_a$（在边 $va$ 上）与 $z_b$（在边 $vb$ 上），两条不同的边。若像里没有 $P$ 的顶点，则像落在 $P$ 去掉顶点后的若干开边之一里（连通集落在互不相交开集之并，故只落在一个里），与它同时碰到 $va,vb$ 矛盾。故存在 $\\theta$ 使 $z(\\theta)$ 是顶点 $p$；$p \\ne v$（因为 $\\rho>0$），$p \\ne a,b$（否则射线方向就是 $va$ 或 $vb$，不在开区间内）。对这条射线重复第四步的闭包论证，$[v,p]$ 的内部全在 $\\operatorname{int}K$ 里，即 $[v,p]$ 是对角线。\n\n**退化情形（已处理，不是缺口）**：(a) 顶点落在开线段 $(a,b)$ 上 —— 第三、五步都只用「第一撞击点是顶点」，与 $(a,b)$ 上有无顶点无关；(b) 顶点落在边 $va$ 或 $vb$ 的**内部** —— 不可能：$va,vb$ 是 $P$ 的边，另一个顶点落在它内部会让 $P$ 自交或两段重合，与「简单」矛盾。\n\n**一处口径**：第三、五步都用到「第一撞击点随方向连续」；它只用到「一条射线上不同点到 $v$ 的距离互不相同」。本图没有为它单列节点 —— 上面两段的最后一步用的就是它。\n\n**经典耳定理路线（本图不采用）**：先证「每个 $n\\ge4$ 的多边形至少有两个耳朵」（O'Rourke 的取法：在三角形 $avb$ 内取离直线 $ab$ 最远的顶点 $p$，再证 $[v,p]$ 与 $P$ 只交于端点），再对耳朵归纳。本条不经过耳朵，直接证「对角线存在」——这对三角剖分足够。",
      "refs": [
        "O'Rourke, Computational Geometry in C, §1.3（对角线引理；该节的耳定理路线本图不采用）",
        "Munkres, Topology, §64（多边形与三角剖分）"
      ]
      },
    {
      "id": "thm.jordan-polygon",
      "cluster": "topology.general",
      "type": "theorem",
      "label": "多边形 Jordan 定理",
      "title": "定理：简单闭多边形的补集恰有两个连通分量",
      "regions": [
        "topology"
      ],
      "tags": [
        "定理",
        "拓扑",
        "Jordan",
        "多边形"
      ],
      "statement": "设 $P$ 是 $\\mathbb{R}^{2}$ 中的简单闭多边形（有限条线段首尾相接、无自交点），$K$ 是它围成的多边形区域。则 $\\mathbb{R}^{2}\\setminus P$ 恰有两个连通分量：有界的那一个等于 $\\operatorname{int}K$，无界的那一个是 $\\mathbb{R}^{2}\\setminus K$；两者都以 $P$ 为边界。",
      "notes": "**证明结构**：先证补集里有「射线交点奇偶」这个二值不变量（第一、二步），再用对角线引理 `lem.polygon-diagonal` 归纳出三角剖分（第三步），最后用三角剖分把补集分成两个开集、证明它们互不相通（第四至七步）。\n\n**约定**。$P$ 是简单闭多边形，$K$ 是 $P$ 围成的多边形区域（射线奇偶 $\\Phi=1$ 的一侧加上边界，见下），$\\operatorname{int}K$ 是它的内部。结论：$\\mathbb{R}^{2}\\setminus P$ **恰有两个连通分量**，一个是 $\\operatorname{int}K$（有界），另一个是 $\\mathbb{R}^{2}\\setminus K$（无界），两者都以 $P$ 为边界。\n\n**第一步：$\\Phi$ 良定义且局部常值。** 把顶点按 $y$ 坐标分组，相邻两组之间是一个开条带。在每个条带里，$P$ 与它的交是一族互不相交的线段，每条都从条带下边界贯到上边界（否则会在条带内部出现顶点），所以它们是图 $x = x_1(y) < \\cdots < x_j(y)$。对条带内的点 $(x,y)$，定义 $\\Phi(x,y) = \\#\\{i : x_i(y) < x\\} \\bmod 2$。$x_i$ 连续，所以 $\\Phi$ 在条带内局部常值；$y$ 穿过分界高度时，两侧的墙数之差是偶数（穿过一个顶点时两条边同时出现或同时消失），故 $\\Phi$ 在 $\\mathbb{R}^{2}\\setminus P$ 上整体良定义、局部常值。\n\n**第二步：$\\Phi$ 取到两个值。** 在 $P$ 外取一个足够远的点，向左的射线不碰 $P$，$\\Phi = 0$；取一条边的中点 $m$ 与它的外法向 $\\nu$，点 $m + \\varepsilon\\nu$ 在 $P$ 外且紧邻这条边——沿该边的方向扰动可见它的左侧墙数恰与另一侧差 1，故 $\\Phi = 1$。于是 $\\Phi$ 是满射到 $\\{0,1\\}$。\n\n**第三步：三角剖分（输入：`lem.polygon-diagonal`）。** 对顶点数归纳：$n = 3$ 时 $K$ 本身就是一个三角形。$n \\ge 4$ 时由 `lem.polygon-diagonal` 取一条对角线，把 $P$ 分成两个顶点数更少的简单多边形，分别归纳。结果：$K = T_1 \\cup \\cdots \\cup T_{n-2}$，$T_i$ 是闭三角形，两两内部不交，交集是公共边或公共顶点，且 $\\partial K = P$。\n\n**第四步：$A := K \\setminus P$ 道路连通。**\n\n**（4a）对偶图连通**，对顶点数 $n$ 归纳。$n=3$ 时剖分只有一个三角形，对偶图是单点。$n\\ge4$ 时，第三步用的是 `lem.polygon-diagonal` 给出的对角线 $[a,b]$，它把 $P$ 分成 $P_1,P_2$（顶点数 $n_1,n_2$，$n_1+n_2=n+2$，各自都小于 $n$），$P$ 的剖分就是两个子剖分之并。由归纳假设，两个子剖分的对偶图 $\\Gamma_1,\\Gamma_2$ 都连通。$[a,b]$ 是 $P_1$ 的边、也是 $P_2$ 的边；在每个子剖分里含边 $[a,b]$ 的三角形恰好一个——剖分覆盖整个子多边形、各三角形内部互不相交，故 $[a,b]$ 的相对内部只落在一个三角形里，而含它的三角形必以 $[a,b]$ 为一条边——记作 $T_1,T_2$。$[a,b]$ 是内部对角线，$T_1,T_2$ 在 $\\Gamma$ 里相邻，故 $\\Gamma=\\Gamma_1\\cup\\Gamma_2\\cup\\{T_1T_2\\}$ 连通。\n\n**（4b）$A$ 道路连通。** $A$ 是全部三角形挖掉 $P$ 后的并（$P$ 只落在三角形的落在 $P$ 上的那些边上）。每一块 $T_i \\setminus P$ 道路连通：它是凸三角形去掉若干边的剩余部分，去掉的边都在它的边界上。相邻两块沿一条内部对角线相接，该对角线的相对内部既在 $A$ 里又在两块的交里，所以可以就地把两块接起来。对偶图连通，故沿对偶图的路径可把任意两块接起来，从而 $A$ 道路连通。\n\n**第五步：$B := \\mathbb{R}^{2}\\setminus K$ 连通。** 令 $G$ 为剖分的 $1$-骨架（全部边之并）。$\\mathbb{R}^{2}\\setminus G$ 的面就是 $n-2$ 个三角形内部与唯一的外部面 $E$；每个三角形内部是它自己的一个（有界）面，$E$ 是无界面。$B = E$：一方面 $E$ 里的点不在任何三角形闭包里故不在 $K$ 里，另一方面 $K$ 外的点不在 $G$ 上、也不在任何三角形内部，只能落在 $E$。开集的分量都是道路连通的（$\\mathbb{R}^{2}$ 局部道路连通），故 $E = B$ 道路连通、且无界。\n\n**第六步：合起来恰两个分量。** $A$ 与 $B$ 都是开集、都非空、且 $\\mathbb{R}^{2}\\setminus P = A \\sqcup B$：$P$ 上的点被挖掉；不在 $P$ 上的点要么在某三角形内部或内部边上（属于 $K$，即 $A$），要么不在 $K$ 里（属于 $B$）。若有一条道路从 $A$ 连到 $B$，它的像连通且含于两个不相交开集之并，只能落在其中一个里，矛盾。所以 $A$、$B$ 就是全部两个分量：一个是有界的 $\\operatorname{int}K$ 那一侧，一个是无界的 $\\mathbb{R}^{2}\\setminus K$。\n\n**第七步：边界。** $A,B$ 都开，故 $\\partial A \\subseteq P$、$\\partial B \\subseteq P$；反过来，$P$ 上任一点 $x$ 的任意小邻域里既有 $A$ 的点（$x$ 在 $\\partial K$ 上）又有 $B$ 的点，故 $P \\subseteq \\partial A \\cap \\partial B$。两边合起来 $\\partial A = \\partial B = P$。\n\n**依赖声明**：唯一的外部输入是 `lem.polygon-diagonal`（对角线引理；证明用旋转射线论证，含「转到边界边」那一支）；本条的第四至七步只用到「存在三角剖分」这一件事。",
      "refs": [
        "O'Rourke, Computational Geometry in C, §1.3",
        "Armstrong, Basic Topology, §5"
      ]
      },
    {
      id: 'def.jordan-curve',
      cluster: 'topology.general',
      type: 'definition',
      label: 'Jordan 曲线',
      title: 'Jordan 曲线（简单闭曲线）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲线', 'Jordan'],
      statement: [
        '平面 $\\mathbb{R}^{2}$（或 $\\mathbb{C}$）中的一条**Jordan 曲线**（**简单闭曲线**）是单位圆周 $S^{1} = \\{\\, z \\in \\mathbb{C} : |z| = 1 \\,\\}$ 在**同胚**下的像：存在同胚 $S^{1} \\to C \\subseteq \\mathbb{R}^{2}$（$C$ 带子空间拓扑，见 `def.homeomorphism`）。',
        '',
        '等价地，$C$ 是 $\\mathbb{R}^{2}$ 中一条**连续单射** $\\gamma : S^{1} \\to \\mathbb{R}^{2}$ 的像 —— 因为 $S^{1}$ 紧、$\\mathbb{R}^{2}$ Hausdorff，连续单射自动是到其像上的同胚。'
      ].join('\n'),
      notes: [
        '**名字拆开**：「简单」= 无自交点（$\\gamma$ 单射）；「闭」= $S^{1}$ 紧，所以像是紧的、没有端点。',
        '**例**：圆周、椭圆、正方形边界、任意多边形的边界都是 Jordan 曲线；「8 字形」不是（有自交点），一条线段也不是（不是闭的）。',
        '⚠ Jordan 曲线可以很不规则（例如分形曲线），所以不能靠「看起来像圆」来论证；下面的 Jordan 曲线定理正是对这种一般曲线说的。'
      ].join('\n\n'),
      refs: ['Hatcher, Algebraic Topology, §2.B']
    },
    {
      id: 'thm.jordan-curve',
      cluster: 'topology.general',
      type: 'theorem',
      status: 'skeleton',
      label: 'Jordan 曲线定理',
      title: '定理（Jordan）：简单闭曲线把平面分成内外两块',
      regions: ['topology'],
      tags: ['定理', '拓扑', 'Jordan', '骨架'],
      statement: [
        '设 $C \\subseteq \\mathbb{R}^{2}$ 是一条 Jordan 曲线（见 `def.jordan-curve`）。则补集 $\\mathbb{R}^{2} \\setminus C$ 恰有两个连通分量：一个有界（**内部**），一个无界（**外部**）；两者都以 $C$ 为边界。',
        '',
        '等价地，$C$ **分离**平面：$\\mathbb{R}^{2} \\setminus C$ 不连通，且连通分量恰好两个。'
      ].join('\n'),
      notes: [
        "⚠ 本节点保持 `status: skeleton`。**缺口不是「整个定理都没写」，而是两条外部输入**，下面把归约写完，剩下的两块各自标明本图有没有节点。",
        "**输入 (A)（同调分离）**：$H_{1}(\\mathbb{R}^{2}\\setminus C;\\mathbb{Z}) \\cong \\mathbb{Z}$ 且 $\\widetilde{H}_{0}(\\mathbb{R}^{2}\\setminus C;\\mathbb{Z}) \\cong \\mathbb{Z}$。两者是同一件事的两面（Alexander 对偶：$\\widetilde{H}_{i}(\\mathbb{R}^{2}\\setminus C) \\cong \\widetilde{H}^{1-i}(C)$，$C \\cong S^{1}$）。本图**没有** Alexander 对偶节点，也没有 $\\mathbb{R}^{2}\\setminus C$ 的 Mayer–Vietoris 计算节点 —— 这是第一块真缺口。",
        "**输入 (B)（局部弧分离）**：$C$ 的每一点都是两个分量各自的聚点。等价说法：$C$ 在每点附近把平面「局部切开」。Brouwer 的局部连通性引理给的是：$C$ 上任一点的任意小邻域内，$C$ 与该邻域边界的交至少两点，且这足以让两侧都逼近该点。本图同样没有这个节点 —— 第二块真缺口。",
        "**归约（在 (A)、(B) 之下）**。",
        "**第一步：分量即道路分量。** $\\mathbb{R}^{2}\\setminus C$ 是 $\\mathbb{R}^{2}$ 的开子集，故局部道路连通；局部道路连通空间里连通分量与道路分量一致。",
        "**第二步：恰两个分量。** 设 $\\mathbb{R}^{2}\\setminus C$ 有 $n$ 个连通分量（$n \\in \\mathbb{N}\\cup\\{\\infty\\}$）。对局部道路连通、局部紧的空间，$\\widetilde{H}_{0}$ 是以分量为基的自由阿贝尔群，故 $\\operatorname{rank}\\widetilde{H}_{0} = n-1$（$n$ 有限时）。由 (A) 的 $\\operatorname{rank}\\widetilde{H}_{0} = 1$ 得 $n = 2$。",
        "**第三步：一个有界、一个无界。** $C$ 紧，故有 $R$ 使 $C \\subseteq B(0,R)$。于是 $\\mathbb{R}^{2}\\setminus B(0,R) \\subseteq \\mathbb{R}^{2}\\setminus C$，而 $\\mathbb{R}^{2}\\setminus B(0,R)$ 道路连通；它落在某一个分量里，那个分量无界。另一个分量必含于 $B(0,R)$，故有界。",
        "**第四步：边界是 $C$。** 两个分量都开，故 $\\partial(\\text{分量}) \\subseteq C$；反过来 (B) 说 $C$ 的每点都在两个分量的闭包里，故 $C \\subseteq \\partial(\\text{分量})$。两边合起来 $\\partial(\\text{内部}) = \\partial(\\text{外部}) = C$。",
        "**三条常用证明路线与本图的关系**：① 同调路线 —— 就是上面的 (A)，外加 Alexander 对偶（本图缺）；② 基本群 / 环绕数路线 —— 证 $\\pi_{1}(\\mathbb{R}^{2}\\setminus C) \\cong \\mathbb{Z}$，用 $C$ 上的一致化与覆盖空间（本图缺覆盖空间理论）；③ 初等近似路线 —— 先把 $C$ 逼近成多边形，多边形情形可以用「射线穿过的次数奇偶」直接算（这一步本身可写成一段证明），再把多边形的分离性搬回 $C$ 需要 (B) 的局部版本（本图缺）。三条都绕不过 (B)。",
        "📌 **多边形情形**：若 $C$ 是有限条线段首尾相接的简单闭折线，则补集恰有两个分量（论证不是靠射线的交点奇偶，而是先三角剖分、再证补集的两个开集互不相通）。这个特例已单列为 `thm.jordan-polygon`，论证走三角剖分、只用到对角线引理 `lem.polygon-diagonal`，不依赖本条要的 (A)(B)。**一般情形仍缺 (A)(B)**，多边形那条不能替代它。",
      ].join('\n\n'),
      refs: ['Hatcher, Algebraic Topology, §2.B']
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
    },
    {
      id: 'dep.jordan-homeo',
      kind: 'definition',
      definition: 'def.homeomorphism',
      usedBy: 'def.jordan-curve',
      note: 'Jordan 曲线定义为 $S^{1}$ 在同胚下的像；「像」上的拓扑取子空间拓扑，同胚是定义的一部分。'
    },
    {
      id: 'dep.jordantheorem-curve',
      kind: 'definition',
      definition: 'def.jordan-curve',
      usedBy: 'thm.jordan-curve',
      note: '定理以 Jordan 曲线（简单闭曲线）的定义为前提。'
    },
    {"id":"dep.poly-jordan","kind":"definition","definition":"def.jordan-curve","usedBy":"lem.polygon-diagonal","note":"多边形是 Jordan 曲线的特例（折线版的简单闭曲线）；本条只对折线证明，不加任何一般性。"},
    {"id":"dep.polygon-area","kind":"definition","definition":"def.jordan-curve","usedBy":"thm.jordan-polygon","note":"多边形区域的边界是 Jordan 曲线；本条的结论比 `thm.jordan-curve` 弱，只对折线成立。"},
        {
      id: 'imp.jordan-polygon-diagonal',
      kind: 'implication',
      sources: ['lem.polygon-diagonal'],
      target: 'thm.jordan-polygon',
      title: '对角线引理：多边形三角剖分的归纳步',
      proof: "对顶点数 $n$ 归纳。由 `lem.polygon-diagonal` 取一条对角线 $[a,b]$，它把 $P$ 分成两个边数更少（$n_1,n_2<n$）的简单多边形 $P_1,P_2$。由归纳假设 $P_i$ 各有三角剖分 $\\Gamma_i$，其并加上 $[a,b]$ 就是 $P$ 的三角剖分：三角形个数 $(n_1-2)+(n_2-2)=n-2$，两两内部不交，且并的边界恰为 $P$。∎",
    },
    {
      id: "dep.jordan-subspace",
      kind: 'definition',
      definition: "def.subspace",
      usedBy: "def.jordan-curve",
      note: "Jordan 曲线带子空间拓扑。"
    }
  ]
});