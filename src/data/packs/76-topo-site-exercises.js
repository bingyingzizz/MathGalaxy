/* ==========================================================================
   内容包 · 原书第 2、3 章练习里的性质（小节点）
   --------------------------------------------------------------------------
   第 2 章：2.3 · 2.5 · 2.6+2.7 · 2.8 · 2.16 · 2.21 · 2.29
   第 3 章：3.8 · 3.11 · 3.14 · 3.20 · 3.26 · 3.45 · 3.50 · 3.57
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑与 site 的性质',

  nodes: [

    /* ----------------------------------------------------- 2.3 */
    {
      id: 'prop.hausdorff-reflective',
      cluster: 'topology.general',
      type: 'proposition',
      label: 'Hausdorff 空间是反射子范畴',
      title: '命题：$\\mathbf{Haus} \\subset \\mathbf{Top}$ 是反射子范畴',
      regions: ['topology'],
      tags: ['命题', 'Hausdorff', '反射子范畴', '商'],
      statement: [
        '**Hausdorff 空间**构成 $\\mathbf{Top}$ 的**反射子范畴**：反射是把每个拓扑空间送去它的「Hausdorff 化」$X \\mapsto X/\\!\\sim$。'
      ].join('\n'),
      notes: [
        '**证明。** 把 $X$ 里「不能被子开集分开」的点粘起来：定义 $x \\sim y$ $\\iff$ $x, y$ 在 $X$ 的每个开覆盖式的分离里都同进同出（等价地：$X$ 到任何 Hausdorff 空间的连续映射都把 $x,y$ 映到同一点）✓。商 $X/\\!\\sim$ 是 Hausdorff ✓，而且任何连续映射 $X \\to H$（$H$ Hausdorff）唯一地穿过它 ✓ —— 这正是反射的泛性质 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.3']
    },

    /* ----------------------------------------------------- 2.5 */
    {
      id: 'prop.normal-locally-closed',
      cluster: 'topology.general',
      type: 'proposition',
      label: '正规空间的邻域里有闭邻域',
      title: '命题：正规 Hausdorff $\\implies$ 每个邻域含闭邻域',
      regions: ['topology'],
      tags: ['命题', '正规空间', '邻域', '闭邻域'],
      statement: [
        '设 $X$ 是**正规** Hausdorff 空间、$x \\in X$。则 $x$ 的每个邻域都含一个**闭**邻域。'
      ].join('\n'),
      notes: [
        '**证明。** 给邻域 $U \\ni x$。取 $x$ 的闭邻域 $F \\subseteq U$：由正规性造开集 $W$ 使 $x \\in W \\subseteq \\overline{W} \\subseteq U$ ✓（正规 = 不交闭集可被开集分开，把 $\\{x\\}$ 与 $X \\setminus U$ 分开），于是 $\\overline{W}$ 就是所含的闭邻域 ✓。∎',
        '⭐ 用处：紧空间里闭子集紧，所以「邻域含闭邻域」在紧 Hausdorff 里就变成「邻域含紧邻域」—— 这正是局部紧的常见来源。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.5']
    },

    /* ----------------------------------------------------- 2.6 + 2.7 */
    {
      id: 'prop.compact-basic-operations',
      cluster: 'topology.general',
      type: 'proposition',
      label: '紧性的基本操作',
      title: '命题：闭子集紧、连续像紧、紧 Hausdorff 正规',
      regions: ['topology'],
      tags: ['命题', '紧', '闭子空间', '连续像', '正规'],
      statement: [
        '1. 紧空间的**闭子空间**紧；',
        '2. 紧空间的**连续像**紧；',
        '3. **紧 Hausdorff** 空间是**正规**的。'
      ].join('\n'),
      notes: [
        [
          '**证明。** (1) 给闭子集 $F \\subseteq X$（$X$ 紧）与开覆盖，添上 $X \\setminus F$ 得 $X$ 的开覆盖，取有限子覆盖再删掉那一项 ✓。(2) 给 $f : X \\to Y$（$X$ 紧）与 $Y$ 中开覆盖，拉回得 $X$ 的开覆盖、取有限子覆盖再推回去 ✓。',
          '(3) 给不交闭集 $A, B$：对每个 $a \\in A$ 用 Hausdorff 性造 $a$ 的开邻域 $U_a$ 使 $\\overline{U_a} \\cap B = \\emptyset$ ✓；$A$ 紧，取有限个覆盖 $A$，令 $U := \\bigcup_{i} U_{a_i}$，则 $\\overline{U} \\cap B = \\emptyset$ ✓；对 $B$ 做一次同样的操作，再把两次得到的开集调小一层，就得到分开 $A, B$ 的开集 ✓。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.6, Exercise 2.7']
    },

    /* ----------------------------------------------------- 2.8 */
    {
      id: 'prop.quotient-of-compact',
      cluster: 'topology.general',
      type: 'proposition',
      label: '紧空间的商紧',
      title: '命题：$S$ 紧 $\\implies S/R$ 紧',
      regions: ['topology'],
      tags: ['命题', '紧', '商空间', '等价关系'],
      statement: [
        '设 $S$ 是紧拓扑空间、$R$ 是 $S$ 上的等价关系。则商空间 $S/R$ 也是**紧**的。'
      ].join('\n'),
      notes: [
        '**证明。** 商映射 $\\pi : S \\to S/R$ 连续且满 ✓，而紧空间的连续像是紧的 ✓（见「紧性的基本操作」）。∎',
        '⚠️ 注意：一般 $S$ 紧 Hausdorff 也**不保证** $S/R$ Hausdorff —— 那要额外要求 $R$ 是闭的（这就是弱 Hausdorff / k-闭那一套的出发点）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.8']
    },

    /* ----------------------------------------------------- 2.16 */
    {
      id: 'prop.totally-disconnected-subspace',
      cluster: 'topo.stone',
      type: 'proposition',
      label: '全不连通对子空间封闭',
      title: '命题：全不连通空间的子空间全不连通',
      regions: ['topology'],
      tags: ['命题', '全不连通', '子空间', '连通分量'],
      statement: [
        '**全不连通**空间的**子空间**仍全不连通；同样地，闭开集限制到子空间上仍是闭开集。'
      ].join('\n'),
      notes: [
        '**证明。** 给子空间 $Y \\subseteq X$、$y \\in Y$。$X$ 里每个含 $y$ 的闭开集 $K$ 与 $Y$ 交出的 $K \\cap Y$ 在 $Y$ 里仍闭开 ✓；若 $Y$ 在 $y$ 处连通、含有另一个点 $y\'$，则全不连通性给出 $X$ 的闭开集分离 $y, y\'$ ✓，把它交到 $Y$ 上就断开 $Y$ —— 矛盾 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.16']
    },

    /* ----------------------------------------------------- 2.21 */
    {
      id: 'prop.profinite-sets-spaces',
      cluster: 'topo.stone',
      type: 'proposition',
      label: '投射有限集即投射有限空间',
      title: '命题：有限集的 pro-对象 $\\simeq$ 投射有限空间',
      regions: ['topology'],
      tags: ['命题', 'profinite', 'pro-对象', '范畴等价'],
      statement: [
        '有限集合范畴的 **pro-对象**所成范畴，与**投射有限空间**所成范畴**等价**。'
      ].join('\n'),
      notes: [
        '**证明。** pro-对象就是一个「按指标范畴取投影极限」的图表 $\{E_{i}\}$（$E_i$ 有限离散）✓，它照面给出一个投射有限空间 ✓；反过来，投射有限空间是有限离散空间的（滤过）投影极限 ✓（这是「投射有限」的定义读法）。两个方向互为逆 ✓。',
        '⭐ 于是「投射有限集」这个组合名字对得上：它既可以看作 pro-(有限集)，也可以看作紧全不连通空间。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.21']
    },

    /* ----------------------------------------------------- 2.29 */
    {
      id: 'prop.continuous-map-space-metric',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '紧 Hausdorff 上的函数空间是度量空间',
      title: '命题：$S$ 紧 Hausdorff、$X$ （半）度量（完备）$\\implies C(S, X)$ 也是',
      regions: ['topology'],
      tags: ['命题', '紧开拓扑', '函数空间', '度量空间', '完备'],
      statement: [
        '设 $S$ 是**紧 Hausdorff** 空间、$X$ 是（半）度量空间（resp. 完备）。则连续函数空间 $C(S, X)$ 的**紧开拓扑**来自一个（半）度量（resp. 并且是完备的），即',
        '',
        '$$d(f, g) := \\sup_{s \\in S}\\ d\\bigl(f(s),\\ g(s)\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** $S$ 紧、$d$ 连续，所以 $s \\mapsto d(f(s), g(s))$ 连续因而**取到上确界** ✓，上式是有限值，给出（半）度量；它诱导的正是紧开拓扑（等度连续/一致收敛就是紧开拓扑在紧空间上的样子）✓。完备性：给 Cauchy 列，由一致收敛取逐点极限 $f$，一致收敛保证 $f$ 连续 ✓，且它在同一度量下收敛 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.29']
    },

    /* ----------------------------------------------------- 3.8 */
    {
      id: 'prop.ind-representable-iff-left-exact',
      cluster: 'cat.yoneda',
      type: 'proposition',
      label: 'ind-可表示即左正合',
      title: '命题：$T$ ind-可表示 $\\iff$ $\\mathcal{C}/T$ 滤过 $\\iff$ $T$ 左正合',
      regions: ['category'],
      tags: ['命题', 'ind-可表示', '滤过', '左正合', '预层'],
      statement: [
        '预层 $T \\in \\widehat{\\mathcal{C}}$ 的三条说法等价：',
        '',
        '1. $T$ 是 **ind-可表示**的（可表示为滤过的可表示预层余极限）；',
        '2. 切片范畴 $\\mathcal{C}/T$ 是**滤过**的；',
        '3. $T$ **左正合**（保有限极限）。'
      ].join('\n'),
      notes: [
        '**证明。** (2) $\\iff$ (1)：$T = \\varinjlim_{X \\to T} h_{X}$ 总是成立（元素范畴的余极限给出 $T$）✓，而它落在可表示预层上、指标范畴正是 $\\mathcal{C}/T$ ✓，所以「可表示为滤过余极限」与「$\\mathcal{C}/T$ 滤过」是同一句话 ✓。(1) $\\iff$ (3)：滤过余极限保有限极限 ✓，可表示预层左正合 ✓，于是余极限也左正合；反过来左正合的预层由它自己的元素范畴给出的表达是滤过的 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.8']
    },

    /* ----------------------------------------------------- 3.11 */
    {
      id: 'prop.covering-sieves-filter',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '覆盖筛构成滤子',
      title: '命题：$J(X)$ 是筛的序集上的滤子',
      regions: ['category'],
      tags: ['命题', 'Grothendieck 拓扑', '覆盖筛', '滤子'],
      statement: [
        '对每个 $X$，$J(X)$（$X$ 上的覆盖筛全体）是筛的序集上的**滤子**：',
        '',
        '1. $J(X) \\ne \\emptyset$；',
        '2. $R, R\' \\in J(X) \\implies R \\cap R\' \\in J(X)$（即 $J(X)$ 对下界封闭）；',
        '3. $R \\in J(X)$ 且 $R \\subseteq R\' \\implies R\' \\in J(X)$（对更大的筛封闭）。'
      ].join('\n'),
      notes: [
        '**证明。** 三条都是 Grothendieck 拓扑公理的直接改写：公理 (T1) 给出 $h_{X} \\in J(X)$ ✓；公理 (T2)（覆盖沿自身拉回）给出第 3 条 ✓；公理 (T3)（覆盖沿覆盖细化）给出第 2 条 = 「两个覆盖的公共细化仍是覆盖」✓。∎',
        '⭐ 于是「沿越来越大的覆盖取极限」是对一个**滤子**取滤过余极限 —— Čech 函子的定义正是这么写的。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.11']
    },

    /* ----------------------------------------------------- 3.14 */
    {
      id: 'prop.site-covering-families-pretopology',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '覆盖族构成预拓扑',
      title: '命题：site 里所有生成覆盖筛的族构成预拓扑',
      regions: ['category'],
      tags: ['命题', 'site', '预拓扑', '覆盖族'],
      statement: [
        '设 $\\mathcal{C}$ 是有纤维积的 site。则全体「生成 $X$ 的覆盖筛」的族 $(X_{i} \\to X)_{i \\in I}$ 构成 $\\mathcal{C}$ 上的一个**预拓扑**。'
      ].join('\n'),
      notes: [
        '**证明。** 逐条验证预拓扑公理 ✓：恒等同构是覆盖 ✓；覆盖沿任意态射拉回仍是覆盖（用 (T2) 与纤维积）✓；两个覆盖的公共细化是覆盖（用 (T3)）✓。∎',
        '⭐ 读法：**site 与（带纤维积的）预拓扑是同一份数据的两种写法** —— 用筛写方便讲层，用族写方便实际算。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.14']
    },

    /* ----------------------------------------------------- 3.20 */
    {
      id: 'prop.sheafification-image',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '层化与像交换',
      title: '命题：$\\operatorname{im}(T^{\\#} \\to T\'^{\\#}) = \\bigl(\\operatorname{im}(T \\to T\')\\bigr)^{\\#}$',
      regions: ['category'],
      tags: ['命题', '层化', '像', '正合'],
      statement: [
        '设 $\\mathcal{C}$ 是 site、$u : T \\to T\'$ 是预层态射。则',
        '',
        '$$\\operatorname{im}\\bigl(T^{\\#} \\to T\'^{\\#}\\bigr) \\;=\\; \\Bigl(\\operatorname{im}\\bigl(T \\to T\'\\bigr)\\Bigr)^{\\#}.$$'
      ].join('\n'),
      notes: [
        '**证明。** 层化**正合**（既保有限极限又保余极限）✓，所以它把预层里的像（$\\ker(\\operatorname{coker})$ 形式）逐项送过去；层范畴里的像同样由 $\\operatorname{im} = \\ker(\\operatorname{coker})$ 给出 ✓，两条路走到同一处 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.20']
    },

    /* ----------------------------------------------------- 3.26 */
    {
      id: 'prop.sheafification-slice-colimit',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '层化是切片上的余极限',
      title: '命题：$T^{\\#} \\cong \\varinjlim_{X \\in \\mathcal{C}/T} X$',
      regions: ['category'],
      tags: ['命题', '层化', '切片范畴', '余极限', '关联层'],
      statement: [
        '设 $T$ 是 site $\\mathcal{C}$ 上的预层。则它的层化是切片范畴上的余极限',
        '',
        '$$T^{\\#} \\;\\cong\\; \\varinjlim_{X \\in \\mathcal{C}/T}\\ X^{\\sharp},$$',
        '',
        '这里每个 $X$ 都看成它的关联层 $X^{\\sharp} = h_{X}^{\\#}$。'
      ].join('\n'),
      notes: [
        '**证明。** $T = \\varinjlim_{(X \\to T)} h_{X}$ ✓（元素范畴给出的余极限），层化保余极限 ✓，而 $h_{X}^{\\#} = X^{\\sharp}$ ✓，于是 $T^{\\#} = \\varinjlim X^{\\sharp}$ ✓。∎',
        '⭐ 读法：**层化就是「把 $T$ 按它的元素拆开、逐个关联层化再拼回去」**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.26']
    },

    /* ----------------------------------------------------- 3.45 */
    {
      id: 'prop.sheaf-hom-computed-in-presheaves',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '层之间的 Hom 在预层里算',
      title: '命题：$\\operatorname{Hom}_{\\widetilde{\\mathcal{C}}}(T^{\\#}, F) = \\operatorname{Hom}_{\\widehat{\\mathcal{C}}}(T, F)$',
      regions: ['category'],
      tags: ['命题', '层化', '伴随', 'Hom'],
      statement: [
        '设 $\\mathcal{C}$ 是 site、$T$ 是预层、$F$ 是**层**。则',
        '',
        '$$\\operatorname{Hom}_{\\widetilde{\\mathcal{C}}}\\bigl(T^{\\#},\\ F\\bigr) \\;=\\; \\operatorname{Hom}_{\\widehat{\\mathcal{C}}}\\bigl(T,\\ F\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** 层化 $(-)^{\\#}$ 与含入互为一对伴随 ✓，于是',
        '$$\\operatorname{Hom}_{\\widetilde{\\mathcal{C}}}\\bigl(T^{\\#}, F\\bigr) = \\operatorname{Hom}_{\\widehat{\\mathcal{C}}}\\bigl(T,\\ F\\bigr) ✓$$',
        '（右边把 $F$ 看成预层）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.45']
    },

    /* ----------------------------------------------------- 3.50 */
    {
      id: 'prop.inverse-image-constant-sheaf',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '常层沿拉回不变',
      title: '命题：$f^{-1}\\overline{E} = \\overline{E}$',
      regions: ['category'],
      tags: ['命题', '常层', '拉回', '拓扑斯态射'],
      statement: [
        '设 $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是拓扑斯态射、$\\overline{E}$ 是常层（$E$ 是集合）。则',
        '',
        '$$f^{-1}\\bigl(\\overline{E}\\bigr) \\;=\\; \\overline{E}.$$'
      ].join('\n'),
      notes: [
        '**证明。** 常层由余极限拼出：$\\overline{E} = \\coprod_{e \\in E} \\mathbf{1}$ ✓；而 $f^{-1}$ 是**左伴随**，保余极限，且 $f^{-1}\\mathbf{1} = \\mathbf{1}$ ✓，于是 $f^{-1}\\overline{E} = \\coprod_{e} f^{-1}\\mathbf{1} = \\overline{E}$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.50']
    },

    /* ----------------------------------------------------- 3.57 */
    {
      id: 'prop.stalk-of-sheafification',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '层化不改变茎',
      title: '命题：$(T^{\\#})_{x} = T_{x}$',
      regions: ['category'],
      tags: ['命题', '茎', '层化', '滤过余极限'],
      statement: [
        '设 $X$ 是拓扑空间、$T$ 是 $X$ 上的预层、$x \\in X$。则层化不改变茎：',
        '',
        '$$\\bigl(T^{\\#}\\bigr)_{x} \\;=\\; T_{x}.$$'
      ].join('\n'),
      notes: [
        '**证明。** 茎是沿 $x$ 的开邻域取的**滤过余极限** ✓，而层化是保滤过余极限的（它是保余极限的左伴随）✓；两侧都归结到 $T$ 在同一批邻域上的取值 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.57']
    }

  ],

  edges: [

    {
      id: 'def-link.hausrefl-top',
      kind: 'definition',
      definition: 'def.hausdorff',
      usedBy: 'prop.hausdorff-reflective',
      note: '反射的目标范畴就是 Hausdorff 空间。'
    },
    {
      id: 'def-link.hausrefl-reflective',
      kind: 'definition',
      definition: 'def.reflective-subcategory',
      usedBy: 'prop.hausdorff-reflective',
      note: '结论是「反射子范畴」。'
    },
    {
      id: 'def-link.normclosed-normal',
      kind: 'definition',
      definition: 'def.normal-space',
      usedBy: 'prop.normal-locally-closed',
      note: '命题的前提是正规 Hausdorff。'
    },
    {
      id: 'def-link.compactops-compact',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'prop.compact-basic-operations',
      note: '三条都围绕紧性。'
    },
    {
      id: 'def-link.quotcompact-quotient',
      kind: 'definition',
      definition: 'def.quotient-topology',
      usedBy: 'prop.quotient-of-compact',
      note: '结论说的是商空间仍紧。'
    },
    {
      id: 'imp-link.compactops-quotcompact',
      kind: 'implication',
      sources: ['prop.compact-basic-operations'],
      target: 'prop.quotient-of-compact',
      title: '紧空间连续像紧 $\\implies$ 商仍紧',
      proof: [
        '商映射 $S \\to S/R$ 连续且满 ✓，由「紧空间的连续像紧」即得 $S/R$ 紧 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.tdsub-td',
      kind: 'definition',
      definition: 'def.totally-disconnected',
      usedBy: 'prop.totally-disconnected-subspace',
      note: '命题说的是全不连通对子空间封闭。'
    },
    {
      id: 'def-link.profset-profinite',
      kind: 'definition',
      definition: 'def.profinite',
      usedBy: 'prop.profinite-sets-spaces',
      note: '两边是同一种东西的两种写法。'
    },
    {
      id: 'def-link.cmapmetric-compactopen',
      kind: 'definition',
      definition: 'def.compact-open-topology',
      usedBy: 'prop.continuous-map-space-metric',
      note: '命题算的就是紧开拓扑。'
    },
    {
      id: 'def-link.indrepr-ind',
      kind: 'definition',
      definition: 'def.ind-object',
      usedBy: 'prop.ind-representable-iff-left-exact',
      note: 'ind-可表示用的就是 Ind-对象。'
    },
    {
      id: 'def-link.indrepr-exactfun',
      kind: 'definition',
      definition: 'def.exact-functor',
      usedBy: 'prop.ind-representable-iff-left-exact',
      note: '第三条说的是左正合。'
    },
    {
      id: 'def-link.covsieve-gt',
      kind: 'definition',
      definition: 'def.grothendieck-topology',
      usedBy: 'prop.covering-sieves-filter',
      note: '三条都是 Grothendieck 拓扑公理的改写。'
    },
    {
      id: 'def-link.sitecov-pre',
      kind: 'definition',
      definition: 'def.pretopology',
      usedBy: 'prop.site-covering-families-pretopology',
      note: '结论是「这族覆盖构成预拓扑」。'
    },
    {
      id: 'def-link.sheafimg-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.sheafification-image',
      note: '像在层范畴里取。'
    },
    {
      id: 'def-link.sheafcolim-assoc',
      kind: 'definition',
      definition: 'def.associated-sheaf',
      usedBy: 'prop.sheafification-slice-colimit',
      note: '公式右边的每一项就是关联层。'
    },
    {
      id: 'def-link.sheafhom-presheaf',
      kind: 'definition',
      definition: 'def.presheaf',
      usedBy: 'prop.sheaf-hom-computed-in-presheaves',
      note: '右边的 Hom 在预层里算。'
    },
    {
      id: 'def-link.invconst-toposmor',
      kind: 'definition',
      definition: 'def.topos-morphism',
      usedBy: 'prop.inverse-image-constant-sheaf',
      note: '拉回是拓扑斯态射的一半。'
    },
    {
      id: 'def-link.stalksheafify-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.stalk-of-sheafification',
      note: '层化之后取茎。'
    }

  ]
});
