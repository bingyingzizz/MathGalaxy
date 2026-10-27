/* ==========================================================================
   内容包 · 微分流形（第一批）
   --------------------------------------------------------------------------
   22 个节点 / 74 条边（约 55 条定义引用 + 14 条推导 + 若干接线）。
   星团：diffgeom.manifold（在 clusters.js 已登记，hub = def.manifold-chart）。

   §A 图册与光滑结构（4 点）
       def.manifold-chart（hub）→ prop.maximal-atlas
       def.smooth-map → def.differential-map

   §B 切丛、向量场与张量场（4 点）
       def.tangent-bundle · def.vector-field · def.lie-bracket · def.tensor-field

   §C 向量丛、截面与单位分解（4 点）
       def.vector-bundle · def.bundle-section · thm.smooth-partition-unity · prop.bundle-metric

   §D 定向与体积（3 点）
       def.orientable-manifold · def.volume-form · prop.volume-form-orientation

   §E de Rham 上同调（4 点）
       def.de-rham-complex · thm.de-rham-h0 · lem.poincare-lemma · thm.mayer-vietoris

   §F Lie 群与 Lie 代数（3 点）
       def.lie-group · def.lie-algebra · prop.left-invariant-fields

   ⚠️ 与 129-diffgeom-tu.js 的分工（那里已有，本包**一个都不重建**）：
      def.smooth-manifold · def.tangent-space-manifold · def.differential-form ·
      def.exterior-derivative · prop.pullback-forms · def.riemannian-metric ·
      def.affine-connection · def.curvature-tensor · def.sectional-curvature ·
      def.ricci-curvature · def.integral-form · thm.stokes · thm.regular-level-set。
      本包的边大量往这些节点上接，把「流形」这一团接到已有点上的骨架。

   ⚠️ 与其它包的分工：
      def.partition-of-unity 是**连续**单位分解（拓扑星团），本包的
      thm.smooth-partition-unity 是它的**光滑**版本，边上说清区别。
      def.section 是乘积集的纵/横截口（分析星团），与向量丛截面同字不同义，
      在 def.bundle-section 的 notes 里明写了这条，别混。

   ⚠️ 引用政策：参考书 Tu, An Introduction to Manifolds (2nd ed., GTM 334)。
      refs 只写「书名 + 章名 + 结果名」，**不编号** —— 章号与定理号没有把握，
      不编造。

   ⚠️ 符号约定（与 125 / 126 / 129 对齐）：
      · 切映射与外微分同记 \mathrm{d}（两者不是两件事：\mathrm{d}f 就是切映射的读数）；
      · 定向用「转移 Jacobi 行列式同号」定义，不用「法向场」（那需要环境空间）；
      · 体积形式记 \mathrm{d}V_g，正交余标架记 \theta^i，活动标架记 \omega^i_{\ j}；
      · Lie 代数用 fraktur：\mathfrak{g}、\mathfrak{gl}(n,\mathbb{R})。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '微分流形：图册、切丛、向量丛与 de Rham 上同调',

  nodes: [

    /* ======================================================================
       §A 图册与光滑结构
       ====================================================================== */

    {
      id: 'def.manifold-chart',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '图卡',
      title: '图卡、坐标与转移映射',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '图卡', '图册', '转移映射', '坐标'],
      statement: [
        '**在说什么**：流形没有天生的坐标，所以「坐标」必须一张张地发 —— 一张卡就是「一块地皮 + 一块坐标牌」，换牌子时必须换得光滑。',
        '',
        '设 $M$ 是拓扑空间，$n \\ge 0$。$M$ 上的一张 **$n$ 维图卡**（坐标卡）是二元组 $(U,\\varphi)$，其中 $U \\subseteq M$ 是开集，$\\varphi : U \\to \\varphi(U) \\subseteq \\mathbb{R}^{n}$ 是同胚（要求 $\\varphi(U)$ 在 $\\mathbb{R}^{n}$ 里开）。$U$ 叫**坐标邻域**，$\\varphi$ 叫**坐标映射**；分量 $x^{i} := \\varphi^{i}$ 叫**局部坐标**，即 $p \\mapsto \\bigl(x^{1}(p),\\ldots,x^{n}(p)\\bigr)$。',
        '',
        '$n = 0$ 时 $\\mathbb{R}^{0}$ 是单点，图卡给的是「这个点在不在 $U$ 里」。',
        '',
        '两张卡 $(U,\\varphi)$、$(V,\\psi)$ 的**转移映射**是',
        '',
        '$$\\psi \\circ \\varphi^{-1} : \\varphi(U \\cap V) \\longrightarrow \\psi(U \\cap V),$$',
        '',
        '它把「$\\varphi$ 牌的坐标」换成「$\\psi$ 牌的坐标」。两张卡**$C^{\\infty}$-相容**指转移映射在每处都是 $C^{\\infty}$（它定义在 $\\mathbb{R}^{n}$ 的开集上，用偏导数检验）；若 $U \\cap V = \\emptyset$ 则规定相容。',
        '',
        '两两相容、覆盖 $M$ 的一族卡 $\\mathcal{A} = \\{(U_{\\alpha},\\varphi_{\\alpha})\\}$ 叫 $M$ 的 **$n$ 维图册**。',
        '',
        '**例**：$\\mathbb{R}^{n}$ 上取 $U = \\mathbb{R}^{n}$、$\\varphi = \\operatorname{id}$ 是单张卡的图册。$S^{n} \\subseteq \\mathbb{R}^{n+1}$ 用两张球极投影卡（去北极、去南极各投到 $\\mathbb{R}^{n}$），它们的转移映射是 $x \\mapsto x/\\lVert x\\rVert^{2}$，光滑。'
      ].join('\n'),
      notes: [
        '**为什么要求同胚而不只是双射**：坐标要能承载「连续」「收敛」「紧」这些拓扑概念，否则算出来的东西只是集合的性质。同胚保证这张卡在**拓扑**意义上是坐标 —— 这也是流形定义里必须有拓扑空间这一层的原因。',
        '',
        '**转移映射是唯一需要管的东西**：$\\mathbb{R}^{n}$ 上的微积分只认 $\\mathbb{R}^{n}$ 的坐标。凡要在流形上求导，都得先下到某张卡里；换卡时的链式法则因子就是转移映射的 Jacobi 矩阵。所以「流形上能做微积分」这件事**等价于**「转移映射光滑」—— 整门学科的技术假设就这一条。',
        '',
        '**坐标不是流形的一部分**：同一张卡可以有无穷多种写法（$\\mathbb{R}^{n}$ 的任何微分同胚都给出新坐标）；而「存在一族两两相容的卡」才是流形的性质。区分这两件事正是下一个节点（极大图册）的动机。',
        '',
        '**维数被卡钉死**：若 $M$ 上既有 $n$ 维卡又有 $m$ 维卡，则 $\\mathbb{R}^{n}$ 与 $\\mathbb{R}^{m}$ 的开集同胚，由 Brouwer 区域不变性得 $n = m$。所以「$n$ 维」不是额外选择。',
        '',
        '**与曲面的接口**：曲面论里的「正则参数化 $r : U \\to S$」的逆就是一张图卡，重叠处的「参数变换」就是这里的转移映射 —— 「换参数化后光滑性不变」与「$C^{\\infty}$-相容」是同一句话（`def.orientable-surface`）。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 图卡、坐标邻域与转移映射',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 图册与相容性'
      ]
    },

    {
      id: 'prop.maximal-atlas',
      cluster: 'diffgeom.manifold',
      type: 'proposition',
      label: '极大图册',
      title: '图册与光滑结构',
      regions: ['diffgeom'],
      tags: ['命题', '微分流形', '图册', '光滑结构', '极大图册'],
      statement: [
        '**在做什么**：把「一族相容的卡」补到不能再补 —— 补满之后，「光滑」才成为流形自己的性质，而不是某族卡的性质。补满的结果就是光滑结构。',
        '',
        '设 $\\mathcal{A}$ 是拓扑空间 $M$ 上的 $n$ 维图册，$\\mathcal{A}^{+}$ 是 $M$ 上所有与 $\\mathcal{A}$ 中每张卡都 $C^{\\infty}$-相容的图卡组成的族。则',
        '',
        ['1. $\\mathcal{A} \\subseteq \\mathcal{A}^{+}$；',
         '2. $\\mathcal{A}^{+}$ 中任意两张卡相容；',
         '3. $\\mathcal{A}^{+}$ 覆盖 $M$，故它是图册；',
         '4. $\\mathcal{A}^{+}$ 是**极大**的：任何包含 $\\mathcal{A}^{+}$ 的图册都等于 $\\mathcal{A}^{+}$。'].join('\n'),
        '',
        '满足这四条的图册是唯一的，叫 $\\mathcal{A}$ 生成的**极大图册**，也叫 $M$ 上的一个**光滑结构**（$C^{\\infty}$-结构）。同样有 $C^{k}$-结构与实解析结构，本图只用 $C^{\\infty}$。'
      ].join('\n'),
      notes: [
        '**为什么第 2 条要单独说**：相容性对两张「各自与 $\\mathcal{A}$ 相容」的卡不是自动的。取 $(V,\\psi)$、$(W,\\theta) \\in \\mathcal{A}^{+}$，在 $p \\in V \\cap W$ 附近取 $\\mathcal{A}$ 里含 $p$ 的一张卡 $(U,\\varphi)$，则 $\\theta \\circ \\psi^{-1} = (\\theta \\circ \\varphi^{-1}) \\circ (\\varphi \\circ \\psi^{-1})$ 是光滑映射的复合。这一步的实质是「相容性传递」，证明在边上。',
        '',
        '**为什么必须极大化**：只说「有一族相容的卡」时，$f : M \\to \\mathbb{R}$ 光滑与否依赖这族卡的选取（漏掉一张卡，$f$ 在那张卡上可能不光滑）。极大化之后，「与该图册相容的卡」自动在册，光滑性才变成流形的性质。',
        '',
        '**光滑结构是额外的**：同一个拓扑空间可以带不等价的光滑结构 —— Milnor 的 7 维怪球（与标准 $S^{7}$ 同胚但不微分同胚）、$\\mathbb{R}^{4}$ 上不可数多个互不等价的光滑结构。所以「光滑流形」是拓扑空间**加**结构，不是拓扑空间的性质。',
        '',
        '**低维没有怪现象**：$n \\le 3$ 时拓扑流形上的光滑结构唯一（至多差微分同胚），$n = 4$ 起才出现上述怪例。这条只作背景，本图不展开。',
        '',
        '**与 `def.smooth-manifold` 的分工**：那里把极大图册直接当定义的一部分；这里把「极大图册存在且唯一」这件事**证出来**，于是「光滑结构」不是拍脑袋加的规定。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 极大图册与光滑结构'
      ]
    },

    {
      id: 'def.smooth-map',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '光滑映射',
      title: '光滑映射与光滑函数',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '光滑映射', '光滑函数', '微分同胚'],
      statement: [
        '**在说什么**：两个流形之间「映射光滑」只有一种可能的解释 —— 下到卡里之后是 $\\mathbb{R}^{n}$ 之间的光滑映射。而这件事只需查图册里的卡就够，不必查所有卡。',
        '',
        '设 $N$（$n$ 维）、$M$（$m$ 维）是光滑流形，$F : N \\to M$ 连续。称 $F$ **光滑**（$C^{\\infty}$），如果对每张图卡 $(U,\\varphi)$（$N$ 的）与 $(V,\\psi)$（$M$ 的），复合',
        '',
        '$$\\psi \\circ F \\circ \\varphi^{-1} : \\varphi\\bigl(U \\cap F^{-1}(V)\\bigr) \\longrightarrow \\psi(V)$$',
        '',
        '都是 $C^{\\infty}$（定义域在 $\\mathbb{R}^{n}$ 里开，值域在 $\\mathbb{R}^{m}$ 里开）。这个复合叫 $F$ 的**局部表示**，即 $F$ 在某块坐标里的样子。',
        '',
        '**等价说法**：只对 $N$ 的图册与 $M$ 的图册里的卡验证就够了 —— 换卡只多乘一个转移映射，它光滑，所以光滑性不因换卡而变（证明在边上）。',
        '',
        '若 $F$ 光滑、可逆、且逆也光滑，称 $F$ 是**微分同胚**；此时 $N$ 与 $M$ 视为同一个光滑流形。$F : M \\to \\mathbb{R}$ 光滑时记 $F \\in C^{\\infty}(M)$，$C^{\\infty}(M)$ 是 $\\mathbb{R}$-代数（逐点加乘）。'
      ].join('\n'),
      notes: [
        '**「连续」这个前提不能省**：$\\psi \\circ F \\circ \\varphi^{-1}$ 的定义域是 $\\varphi\\bigl(U \\cap F^{-1}(V)\\bigr)$，要它在 $\\mathbb{R}^{n}$ 里开，就得 $F^{-1}(V)$ 开 —— 这正是 $F$ 连续。光滑比连续强，但陈述里必须先把主语摆好。',
        '',
        '**光滑性只查图册**：取任意两张不在图册里的卡，局部表示 $=$ 转移 $\\circ$ 已知局部表示 $\\circ$ 转移，三个都光滑，故仍是 $C^{\\infty}$。所以「光滑」与图册的选取无关 —— 这一步正是极大图册存在的意义（`prop.maximal-atlas`）。',
        '',
        '**$C^{\\infty}(M)$ 是环，不是域**：两个光滑函数相加、相乘、乘常数仍光滑；除以一个**处处非零**的光滑函数仍是光滑函数。所以流形上的函数构成 $\\mathbb{R}$-代数，而向量场是它的导子（`def.vector-field`）。',
        '',
        '**局部性质、整体结论**：光滑是局部可验的，但许多结论是整体的（闭形式是否恰当、向量场是否处处非零、能否配复结构）。这个落差就是 de Rham 上同调（`def.de-rham-complex`）与示性类的整个来源。',
        '',
        '**按秩三分**：若 $\\mathrm{d}F_{p}$ 处处单射、满射、同构，分别叫**浸入**、**淹没**、**局部微分同胚**（`def.submersion-immersion`）。分类的用处：淹没的原像是子流形，这是 `thm.regular-level-set` 的一般版本。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 流形之间的光滑映射',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 光滑函数与微分同胚'
      ]
    },

    {
      id: 'def.differential-map',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '切映射',
      title: '切映射（微分）',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '切映射', '微分', '链式法则', 'Jacobi 矩阵'],
      statement: [
        '**在说什么**：光滑映射在每点给出一个线性映射，把「沿曲线的方向」送到像上的方向 —— 这就是流形上的导数；流形上没有减法，唯一能做的是「跟着曲线走」。',
        '',
        '设 $F : N \\to M$ 光滑，$p \\in N$。定义',
        '',
        '$$\\mathrm{d}F_{p} : T_{p}N \\longrightarrow T_{F(p)}M,\\qquad \\mathrm{d}F_{p}([\\gamma]) := [F \\circ \\gamma],$$',
        '',
        '即「过 $p$ 的曲线 $\\gamma$」所在的类送到「过 $F(p)$ 的曲线 $F \\circ \\gamma$」所在的类。$\\mathrm{d}F_{p}$ 叫 $F$ 在 $p$ 的**切映射**（也叫**微分**、微分映射）。',
        '',
        '在卡 $(U,\\varphi)$（$N$ 的）与 $(V,\\psi)$（$M$ 的）下，$\\mathrm{d}F_{p}$ 的矩阵就是 $F$ 的局部表示的 Jacobi 矩阵：',
        '',
        '$$\\Bigl[\\mathrm{d}F_{p}\\Bigr]_{\\varphi,\\psi} = \\Bigl(\\frac{\\partial (\\psi \\circ F \\circ \\varphi^{-1})^{i}}{\\partial x^{j}}(x)\\Bigr)_{i,j},\\qquad x = \\varphi(p).$$',
        '',
        '$\\mathrm{d}F_{p}$ 是线性映射，并满足**链式法则**',
        '',
        '$$\\mathrm{d}(G \\circ F)_{p} = \\mathrm{d}G_{F(p)} \\circ \\mathrm{d}F_{p},\\qquad \\mathrm{d}(\\operatorname{id}_{N})_{p} = \\operatorname{id}_{T_{p}N}.$$',
        '',
        '让 $p$ 跑遍 $N$ 得到一个切丛之间的映射 $\\mathrm{d}F : TN \\to TM$，$v \\mapsto \\mathrm{d}F_{\\pi(v)}(v)$。'
      ].join('\n'),
      notes: [
        '**良定义就是链式法则**：换一张卡 $\\varphi$ 换成 $\\theta$，两条过 $p$ 的曲线若在 $\\varphi$ 卡里速度相同，则在 $\\theta$ 卡里也相同（都等于同一个 Jacobi 矩阵乘同一个向量）。类不变，所以 $\\mathrm{d}F_{p}$ 有定义 —— 但**存在性**完全靠转移映射光滑，这一点是本节点与前两个节点的接头处。',
        '',
        '**导子视角更省事**：$\\mathrm{d}F_{p}(v)$ 作为导子就是 $\\bigl(\\mathrm{d}F_{p}(v)\\bigr)(f) = v(f \\circ F)$ —— 一个复合，不用提曲线。两条路线给出同一个线性映射。',
        '',
        '**为什么它不叫「导数」**：$\\mathbb{R}^{n}$ 里 $\\mathrm{d}F_{p}$ 是一个矩阵，能与差商直接联系；流形上没有减法，$\\mathrm{d}F_{p}$ 只是**切空间之间**的线性映射。它是一阶信息，换坐标时两侧各乘一个 Jacobi 矩阵（一正一反），所以「$\\mathrm{d}F$ 是张量」对，但「$\\partial_{i}F$ 是张量」不对。',
        '',
        '**链式法则的意义**：$M \\mapsto T_{p}M$、$F \\mapsto \\mathrm{d}F_{p}$ 是一个**函子**（切函子）。所以流形与光滑映射这一层，切空间自动继承所有复合结构 —— 这也是 $\\mathrm{d}^{2} = 0$ 在形式上能成立的原因。',
        '',
        '**记号撞车**：同一个 $\\mathrm{d}$ 既记切映射 $\\mathrm{d}F_{p}$ 也记外微分 $\\mathrm{d}\\omega$。它们不是两件事：$\\mathrm{d}f$ 就是切映射 $\\mathrm{d}f_{p} : T_{p}M \\to \\mathbb{R}$，即 $1$-形式（`def.exterior-derivative`）。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Tangent Vectors」· 切映射与链式法则'
      ]
    },

    /* ======================================================================
       §B 切丛、向量场、Lie 括号、张量场
       ====================================================================== */

    {
      id: 'def.tangent-bundle',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '切丛',
      title: '切丛与切丛的流形结构',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '切丛', '投影', '纤维'],
      statement: [
        '**在说什么**：把所有点的切空间按「住在哪个点」摞起来，得到一个维数翻倍的新流形 —— 流形上每点长着一根切线，切丛就是这束线的全体。',
        '',
        '设 $M$ 是 $n$ 维光滑流形，$TM := \\bigsqcup_{p \\in M} T_{p}M$（不交并），**投影** $\\pi : TM \\to M$ 把 $T_{p}M$ 里的元素送到 $p$。$\\pi^{-1}(p) = T_{p}M$ 叫 $p$ 处的**纤维**。',
        '',
        '$TM$ 上有自然的 $2n$ 维光滑结构：对每张图卡 $(U,\\varphi)$ 令',
        '',
        '$$\\Phi : \\pi^{-1}(U) \\longrightarrow \\varphi(U) \\times \\mathbb{R}^{n},\\qquad \\Phi(v) := \\bigl(\\varphi(\\pi(v)),\\ \\mathrm{d}\\varphi_{\\pi(v)}(v)\\bigr),$$',
        '',
        '即「这个点在坐标里是哪儿」加上「这个向量在坐标基下的分量」。$(\\pi^{-1}(U),\\Phi)$ 是 $TM$ 的一张图卡（维数 $2n$）；两张这样的卡之间的转移映射是',
        '',
        '$$(x,\\xi) \\longmapsto \\bigl(\\psi\\varphi^{-1}(x),\\ \\mathrm{d}(\\psi\\varphi^{-1})_{x}(\\xi)\\bigr),$$',
        '',
        '前半是原图册的转移映射（光滑），后半是它的 Jacobi 矩阵作用在 $\\xi$ 上（对 $(x,\\xi)$ 光滑）。于是这些卡构成 $TM$ 的图册，$TM$ 是 $2n$ 维光滑流形。',
        '',
        '$\\pi$ 光滑；**零截面** $o : M \\to TM$、$p \\mapsto 0_{p}$ 是光滑映射。'
      ].join('\n'),
      notes: [
        '**为什么维数是 $2n$**：$n$ 个坐标记位置、$n$ 个分量记方向。这就是「相空间」的原型 —— 力学里构形空间 $Q$ 的切丛 $TQ$ 正是「位置 + 速度」。',
        '',
        '**为什么不能直接把 $TM$ 当 $M \\times \\mathbb{R}^{n}$**：$\\mathbb{R}^{n}$ 的开集上可以（一张卡整体平凡化），一般流形不行。$TS^{2}$ 与 $S^{2} \\times \\mathbb{R}^{2}$ 不同胚 —— 理由是球面上的光滑向量场必有零点（毛球定理），所以 $TS^{2}$ 里找不到处处非零的截面。',
        '',
        '**转移映射就是 Jacobi 矩阵**：这条把「切向量怎么换坐标」写成显式公式，也是 $TM$ 光滑的**唯一**实质内容 —— 前半分量的光滑性来自图册相容，后半是 $\\mathrm{d}(\\psi\\varphi^{-1})$ 光滑。',
        '',
        '**$TM$ 是向量丛的原型**：每根纤维是 $n$ 维实向量空间，局部同构于 $U \\times \\mathbb{R}^{n}$，纤维间过渡是线性的。三条都对上（`def.vector-bundle`）。',
        '',
        '**记号纪律**：$TM$ 里的元素是一个**带起点的向量**，$T_{p}M$ 里的元素只认起点为 $p$。写 $v \\in T_{p}M \\subseteq TM$ 时，下标的 $p$ 是信息的一部分，丢了下标就成了无主向量，$\\mathrm{d}F_{p}$ 也就无从作用。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Tangent Vectors」· 切丛'
      ]
    },

    {
      id: 'def.vector-field',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '向量场',
      title: '光滑向量场',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '向量场', '导子', '截面'],
      statement: [
        '**在说什么**：在每一点各挑一个切向量，并挑得随点光滑 —— 这就是向量场。它真正的身份是「对光滑函数求方向导数」的算子。',
        '',
        '设 $M$ 是光滑流形。$M$ 上的**向量场**是映射 $X : M \\to TM$ 使 $\\pi \\circ X = \\operatorname{id}_{M}$（每点给一个该点处的切向量）。若 $X$ 作为 $M \\to TM$ 的映射光滑，称它是**光滑向量场**，全体记 $\\mathfrak{X}(M)$。',
        '',
        '在每张图卡 $(U,\\varphi)$ 里写成',
        '',
        '$$X\\big|_{U} = \\sum_{i=1}^{n} X^{i}\\,\\frac{\\partial}{\\partial x^{i}},\\qquad X^{i} := \\mathrm{d}x^{i}(X) ,$$',
        '',
        '则 $X$ 光滑，当且仅当存在一个图册的每张卡上每个 $X^{i}$ 都光滑（只查一个图册就够）。',
        '',
        '$X$ **作用在函数上**给出新函数',
        '',
        '$$(Xf)(p) := \\mathrm{d}f_{p}\\bigl(X_{p}\\bigr) = \\sum_{i} X^{i}(p)\\,\\frac{\\partial f}{\\partial x^{i}}(p),$$',
        '',
        '于是 $X$ 是 $C^{\\infty}(M)$ 上的**导子**：$X(fg) = f\\,Xg + g\\,Xf$。反过来每个导子都来自唯一的向量场。',
        '',
        '$X$ 在 $p$ 处**为零**指 $X_{p} = 0_{p}$；$X$ 的**支集**是 $\\overline{\\{p \\in M : X_{p} \\ne 0\\}}$。'
      ].join('\n'),
      notes: [
        '**「光滑」是唯一要小心的地方**：单纯「每点挑一个切向量」是集合论选择，可以极其病态。光滑性把它锁成局部坐标下的 $n$ 个光滑函数，于是微积分全部能搬过来 —— 这也是「向量场 = 导子」这条等价的用处。',
        '',
        '**$\\mathfrak{X}(M)$ 是 $C^{\\infty}(M)$-模**：$X + Y$、$fX$（$f$ 光滑）仍是向量场。所以向量场不是「逐点相加成数」的对象，而是模里的元素 —— 与「$\\mathrm{d}f$ 是 $1$-形式」处在同一层次。',
        '',
        '**处处非零的向量场不一定存在**：局部总有，整体不一定。$S^{2}$ 上不存在（毛球定理）；$S^{1}$、$S^{3}$、环面上存在。「有没有零点」是 Poincaré–Hopf 定理与示性类的源头，本图只提。',
        '',
        '**坐标变换**：在两族局部坐标下分别展开，分量满足 $X^{i} = \\sum_{j}\\frac{\\partial y^{i}}{\\partial x^{j}}X^{j}$ —— 与切向量同一条变换律（反变）。这就是「$X$ 是 $(1,0)$ 型张量场」的意思（`def.tensor-field`）。',
        '',
        '**关于支集**：把「$X$ 在哪里不为零」的闭包记作 $\\operatorname{supp} X$。单位分解的论证里要的正是「支集落在某张卡里」，所以这个记号与 `def.partition-of-unity` 的 $\\operatorname{supp}$ 是同一个（`thm.smooth-partition-unity`）。',
        '',
        '**与积分曲线**：向量场给出一阶 ODE $\\dot\\gamma = X(\\gamma)$，其解是积分曲线；局部总有解，整体未必能延拓。本图只用局部存在性，流与单参数群那条线暂不进图。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Tangent Vectors」· 向量场与导子'
      ]
    },

    {
      id: 'def.lie-bracket',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: 'Lie 括号',
      title: '向量场的 Lie 括号',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', 'Lie 括号', '向量场', '交换子'],
      statement: [
        '**在说什么**：两个向量场各自都不能与另一个「合成」出新的向量场，但它们的交换子可以 —— 两次方向导数相减，二阶项自动抵消，剩下的仍是向量场。这个差值就是 Lie 括号。',
        '',
        '设 $X, Y \\in \\mathfrak{X}(M)$。**Lie 括号** $[X,Y]$ 是作用在光滑函数上的算子',
        '',
        '$$[X,Y]f := X(Yf) - Y(Xf),\\qquad f \\in C^{\\infty}(M).$$',
        '',
        '右边看着用到二阶导数，但二阶偏导可交换，所以 $[X,Y]f$ 只含 $f$ 的一阶导数 —— 于是它仍是向量场。在卡里显式算出',
        '',
        '$$[X,Y] = \\sum_{i=1}^{n}\\Bigl(\\sum_{j=1}^{n}\\bigl(X^{j}\\partial_{j}Y^{i} - Y^{j}\\partial_{j}X^{i}\\bigr)\\Bigr)\\frac{\\partial}{\\partial x^{i}} .$$',
        '',
        '四条性质（$f,g \\in C^{\\infty}(M)$）：',
        '',
        ['1. **反称**：$[X,Y] = -[Y,X]$，特别 $[X,X] = 0$；',
         '2. $\\mathbb{R}$-**双线性**；',
         '3. **Jacobi 恒等式**：$[X,[Y,Z]] + [Y,[Z,X]] + [Z,[X,Y]] = 0$；',
         '4. **Leibniz 律**：$[X, fY] = (Xf)\\,Y + f\\,[X,Y]$，并且 $[fX, gY] = fg\\,[X,Y] + f(Xg)\\,Y - g(Yf)\\,X$。'].join('\n')
      ].join('\n'),
      notes: [
        '**为什么结果还是向量场**：$X(Yf)$ 与 $Y(Xf)$ 各自含 $f$ 的二阶导数，在卡里是 $X^{j}\\partial_{j}\\bigl(Y^{i}\\partial_{i}f\\bigr)$ 这类项；相减时 $\\partial_{j}\\partial_{i}f$ 的系数分别是 $X^{j}Y^{i}$ 与 $Y^{j}X^{i}$，而它对 $i,j$ 对称，所以这两项逐项抵消。二阶项消失，剩下的是合法的导子。',
        '',
        '**第 4 条说明它不是张量**：$[X,Y]$ 对 $Y$ 不是 $C^{\\infty}(M)$-线性的 —— 多出来的 $f(Xg)Y$ 项正是「求两次导」留下的痕迹。所以「两个向量场的括号不能用逐点计算定义」，这是它与一切张量运算（`def.tensor-field`）的根本区别。',
        '',
        '**Jacobi 是三件事的合成**：把 Jacobi 写成 $[X,[Y,Z]] = [[X,Y],Z] + [Y,[X,Z]]$，读法是「$[X,\\cdot]$ 是导子」。它不是凭空的规定，而是「括号来自一阶微分算子」的必然结果 —— 展开验证时六项两两抵消，用的是乘积求导。',
        '',
        '**几何含义**：$[X,Y]$ 量「先沿 $X$ 走一步再沿 $Y$ 走一步」与「反序走」的差，除以步长的平方。所以 $[X,Y] = 0$ 意味着两族积分曲线能拼成坐标网 —— 这是 Frobenius 可积性的起点，本图只提。',
        '',
        '**与联络的分界**：$\\nabla_{X}Y$ 与 $[X,Y]$ 长得像但性质不同 —— 联络是额外结构（`def.affine-connection`），括号是流形自身就有的。无挠条件 $\\nabla_{X}Y - \\nabla_{Y}X = [X,Y]$ 就是拿这条免费的括号去约束联络。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Tangent Vectors」· 向量场的 Lie 括号'
      ]
    },

    {
      id: 'def.tensor-field',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '张量场',
      title: '张量场与张量丛',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '张量场', '张量丛', '多重线性'],
      statement: [
        '**在说什么**：把「每点一个多重线性型」做成光滑对象 —— 张量场就是能按矩阵方式逐点记账的那类量；度量、曲率、微分形式全是它的样子。',
        '',
        '设 $M$ 是 $n$ 维光滑流形，$p \\in M$。**$(r,s)$ 型张量**是多重线性映射',
        '',
        '$$T : \\underbrace{T_{p}^{\\ast}M \\times \\cdots \\times T_{p}^{\\ast}M}_{r} \\times \\underbrace{T_{p}M \\times \\cdots \\times T_{p}M}_{s} \\longrightarrow \\mathbb{R},$$',
        '',
        '即吃了 $r$ 个余向量与 $s$ 个向量吐一个数。全体记 $T^{(r,s)}_{p}M$，维数 $n^{r+s}$。**张量丛**是',
        '',
        '$$T^{(r,s)}M := \\bigsqcup_{p \\in M} T^{(r,s)}_{p}M ,$$',
        '',
        '它是 $n + n^{r+s}$ 维光滑流形，造法与切丛相同：转移映射是 Jacobi 矩阵的 $s$ 次直积与它的逆的 $r$ 次直积（`def.tangent-bundle`）。',
        '',
        '$T^{(r,s)}M$ 的光滑截面叫 **$(r,s)$ 型张量场**。在卡里展开',
        '',
        '$$T = \\sum T^{i_{1}\\cdots i_{r}}_{\\ \\ j_{1}\\cdots j_{s}}\\ \\partial_{i_{1}} \\otimes \\cdots \\otimes \\partial_{i_{r}} \\otimes \\mathrm{d}x^{j_{1}} \\otimes \\cdots \\otimes \\mathrm{d}x^{j_{s}} ,$$',
        '',
        '要求每个分量 $T^{i_{1}\\cdots i_{r}}_{\\ \\ j_{1}\\cdots j_{s}}$ 都是 $U$ 上的光滑函数。分量换卡时每个上标乘一次 $\\partial y/\\partial x$、每个下标乘一次 $\\partial x/\\partial y$。'
      ].join('\n'),
      notes: [
        '**四种特殊情况刚好都是见过的对象**：$(0,0)$ 型是光滑函数；$(1,0)$ 型是向量场（`def.vector-field`）；$(0,1)$ 型是 $1$-形式；$(0,k)$ 型且对调任两变元变号的就是 $k$-形式（`def.differential-form`）。所以「张量场」是这些概念的共同外壳。',
        '',
        '**为什么叫「张量」**：多重线性加逐点定义，导致分量换卡时只乘 Jacobi 矩阵的乘积，**不出现二阶导数**。这条「变换律只含一阶导」是张量与联络系数（$\\Gamma$ 不是张量）的分界线。',
        '',
        '**例子**：黎曼度量是 $(0,2)$ 型（`def.riemannian-metric`）；曲率张量是 $(1,3)$ 型，写成 $R_{ijk\\ell}$ 时是用 $g$ 把上标拉下来的 $(0,4)$ 型（`def.curvature-tensor`）；辛形式是 $(0,2)$ 型且反称闭；Einstein 张量是 $(0,2)$ 型。',
        '',
        '**纤维为什么长得快**：$r+s = 2$、$n = 4$ 时纤维有 $16$ 维，所以「逐点选一个张量」的自由度很快失控 —— 这正是曲率张量的对称性（`prop.curvature-tensor-symmetries`）值得单独数一遍的原因：$n^{4} = 256$ 砍到 $20$。',
        '',
        '**上标下标要配对**：$\\mathrm{d}x^{i}(\\partial_{j}) = \\delta^{i}_{\\ j}$。写分量时上标配 $\\partial$、下标配 $\\mathrm{d}x$，配错了就会在不该出现 $\\det$ 的地方冒出 $\\det$。',
        '',
        '**与 `def.exterior-algebra` 的关系**：每点的外代数就是交错张量的全体；「交错」是在张量丛上加一条对称性要求，然后取截面 —— 所以微分形式是张量场的特例，反之不然。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 张量场与张量丛',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 交错张量与微分形式'
      ]
    },

    /* ======================================================================
       §C 向量丛、截面、单位分解
       ====================================================================== */

    {
      id: 'def.vector-bundle',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '向量丛',
      title: '向量丛与局部平凡化',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '向量丛', '局部平凡化', '转移函数'],
      statement: [
        '**在说什么**：把「每点挂一个向量空间、并且挂得光滑」这件事公理化 —— 切丛、余切丛、张量丛都是它的例子。判据是「局部长得像 $U \\times \\mathbb{R}^{k}$」。',
        '',
        '设 $M$ 是光滑流形。一个**秩 $k$ 的光滑向量丛**是光滑映射 $\\pi : E \\to M$，连同两件事：',
        '',
        ['1. 每根**纤维** $E_{p} := \\pi^{-1}(p)$ 上给定 $k$ 维实向量空间结构；',
         '2. **局部平凡化**：每点有开邻域 $U$ 与微分同胚 $\\Phi : \\pi^{-1}(U) \\to U \\times \\mathbb{R}^{k}$，使 $\\Phi$ 与投影交换（$\\operatorname{pr}_{1} \\circ \\Phi = \\pi$），且在每个纤维上是线性同构。'].join('\n'),
        '',
        '$E$ 叫**全空间**，$M$ 叫**底**，$\\dim E = \\dim M + k$。两条平凡化 $\\Phi_{\\alpha}, \\Phi_{\\beta}$ 在重叠处给出**转移函数**',
        '',
        '$$g_{\\alpha\\beta} : U_{\\alpha} \\cap U_{\\beta} \\longrightarrow \\operatorname{GL}(k,\\mathbb{R}),\\qquad g_{\\alpha\\beta}(p) := \\Phi_{\\alpha,p} \\circ \\Phi_{\\beta,p}^{-1} ,$$',
        '',
        '它光滑，并满足**上闭链条件**',
        '',
        '$$g_{\\alpha\\alpha} = 1,\\qquad g_{\\alpha\\beta}\\,g_{\\beta\\gamma}\\,g_{\\gamma\\alpha} = 1 ,$$',
        '',
        '后者在 $U_{\\alpha} \\cap U_{\\beta} \\cap U_{\\gamma}$ 上成立。反过来，给定开覆盖与满足上闭链条件的光滑 $g_{\\alpha\\beta}$，可以粘出一个向量丛。'
      ].join('\n'),
      notes: [
        '**为什么「局部平凡」不够，还要上闭链**：局部平凡只说明「每块都像乘积」；真正决定丛的是**怎么粘**，而粘法就记在 $g_{\\alpha\\beta}$ 里。上闭链条件是「粘得自洽」的充要条件，也把丛与 1-上链的上同调类 $H^{1}(M;\\operatorname{GL}(k,\\mathbb{R}))$ 联系起来 —— 这一点本图只提不证。',
        '',
        '**例子**：$TM$ 是秩 $n$ 的（`def.tangent-bundle`）；$M \\times \\mathbb{R}^{k}$ 叫**平凡丛**；余切丛 $T^{\\ast}M$ 与 $(r,s)$ 型张量丛（`def.tensor-field`）；$S^{1}$ 上的 Möbius 带是秩 $1$ 的非平凡丛，$S^{1} \\times \\mathbb{R}$ 是平凡的 —— 两者局部一样，整体不同。',
        '',
        '**换结构群就是换丛**：$\\operatorname{GL}(k,\\mathbb{R})$ 换成 $\\operatorname{O}(k)$ 得欧氏丛（配了纤维度量），换成 $\\operatorname{GL}(k,\\mathbb{C})$ 得复向量丛，换成 $\\operatorname{GL}(k,\\mathbb{Z})$ 得平坦丛。$TM$ 的结构群能缩到 $\\operatorname{O}(n)$，靠的是「总可配黎曼度量」（`prop.bundle-metric`）—— 这不是自动的。',
        '',
        '**秩 $1$ 叫线丛**：$S^{1}$ 上的 Möbius 线丛、$\\mathbb{RP}^{1}$ 上的 tautological 线丛、$S^{2}$ 上的 Hopf 线丛是最常用的三个。线丛的同构类由 $H^{2}$ 里一个类（第一陈类）刻画，这是拓扑进入几何的入口。',
        '',
        '**记号**：$\\pi$ 同时是投影与圆周率，本图里 $\\pi : E \\to M$ 一律是投影；$\\operatorname{pr}_{1}$ 是乘积到第一因子的投影；$\\Phi_{\\alpha,p}$ 记 $\\Phi_{\\alpha}$ 限制在纤维 $E_{p}$ 上的线性同构。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 向量丛与局部平凡化'
      ]
    },

    {
      id: 'def.bundle-section',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '丛的截面',
      title: '向量丛的截面',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '向量丛', '截面', '模'],
      statement: [
        '**在说什么**：截面就是「在每根纤维里各挑一个元素、且挑得光滑」—— 它是向量场在一般向量丛里的替身。函数、向量场、微分形式都是截面。',
        '',
        '设 $\\pi : E \\to M$ 是秩 $k$ 的光滑向量丛。$E$ 的一个**截面**是光滑映射 $s : M \\to E$ 使',
        '',
        '$$\\pi \\circ s = \\operatorname{id}_{M},$$',
        '',
        '即 $s(p) \\in E_{p}$ 对每个 $p$ 成立。全体记 $\\Gamma(M,E)$ 或 $\\Gamma(E)$。',
        '',
        '在局部平凡化 $\\Phi : \\pi^{-1}(U) \\to U \\times \\mathbb{R}^{k}$ 下，截面写成 $(\\operatorname{id}, \\sigma)$，其中 $\\sigma : U \\to \\mathbb{R}^{k}$ 光滑；取标准基 $e_{1},\\ldots,e_{k}$ 得',
        '',
        '$$s\\big|_{U} = \\sum_{j=1}^{k} s^{j}\\,e_{j},\\qquad s^{j} \\in C^{\\infty}(U).$$',
        '',
        '$\\Gamma(E)$ 是 $C^{\\infty}(M)$-**模**：$s + t$、$f s$（$f$ 光滑）仍是截面。'
      ].join('\n'),
      notes: [
        '**三个最重要的例子**：$\\Gamma(TM) = \\mathfrak{X}(M)$（向量场）；$\\Gamma(T^{\\ast}M) = \\Omega^{1}(M)$（$1$-形式）；$E = M \\times \\mathbb{R}$ 时 $\\Gamma(E) = C^{\\infty}(M)$（函数）。所以「函数是平凡线丛的截面」是这一族里最平凡的成员，却最能说明问题：截面是**带纤维结构的函数**。',
        '',
        '**为什么是模而不是向量空间**：$\\Gamma(E)$ 上的系数乘法是**光滑函数**，不是实数 —— 同一根纤维里的两个元素不能「加起来成数」。这条区别在「$\\mathrm{d}$ 只作用在形式上、不作用在向量场上」那里又出现一次。',
        '',
        '**「有没有处处非零的截面」是整体问题**：Möbius 带没有（走一圈翻号）；$TS^{2}$ 的截面必有零点（毛球定理）；一般线丛有处处非零截面，当且仅当它平凡。这是**障碍**类问题，与局部毫无关系 —— 与「局部总有非零截面」形成对照。',
        '',
        '**框架**：$k$ 个处处线性无关的截面 $e_{1},\\ldots,e_{k}$ 叫活动框架，它等价于「丛平凡」。所以「能否整体选一组基」与「丛是否平凡」是同一件事 —— 曲面上活动标架法（`def.moving-frame`）局部总能做，整体做得到就要紧。',
        '',
        '**同名不同义**：`def.section` 那个「截口」是乘积集 $E \\subseteq X \\times Y$ 的纵切片与横切片，是集合论概念；这里的截面是向量丛的光滑选取。两个字一样、意思无关，取用时看星团。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 向量丛的截面与框架'
      ]
    },

    {
      id: 'thm.smooth-partition-unity',
      cluster: 'diffgeom.manifold',
      type: 'theorem',
      label: '光滑单位分解',
      title: '流形上的光滑单位分解',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', '单位分解', '局部有限', '鼓包函数'],
      statement: [
        '**在做什么**：把「局部造出来的东西」粘成整体的通用工具 —— 在每块地皮上各造一份，乘上权重函数加起来，权重由光滑单位分解提供。',
        '',
        '设 $M$ 是光滑流形，$\\mathcal{U} = \\{U_{\\alpha}\\}_{\\alpha \\in A}$ 是 $M$ 的开覆盖。则存在光滑函数族 $\\{\\rho_{\\alpha}\\}_{\\alpha \\in A}$，使',
        '',
        ['1. $0 \\le \\rho_{\\alpha} \\le 1$ 且 $\\rho_{\\alpha}$ 光滑；',
         '2. $\\operatorname{supp}\\rho_{\\alpha} \\subseteq U_{\\alpha}$，且支撑族 $\\{\\operatorname{supp}\\rho_{\\alpha}\\}$ **局部有限**；',
         '3. $\\sum_{\\alpha \\in A}\\rho_{\\alpha} \\equiv 1$（局部有限和，故逐点有意义且光滑）。'].join('\n'),
        '',
        '$\\{\\rho_{\\alpha}\\}$ 叫**从属于 $\\mathcal{U}$ 的光滑单位分解**。特别地：$M$ 的任意开覆盖都有从属于它的光滑单位分解。',
        '',
        '三条要求与 `def.partition-of-unity` 一字不差，区别只在把「连续」升成「光滑」。'
      ].join('\n'),
      notes: [
        '**证明的两块砖**：① $\\mathbb{R}^{n}$ 上有**鼓包函数** —— 在半径 $1$ 的球内恒为 $1$、半径 $2$ 的球外为 $0$ 的光滑函数，由 $x \\mapsto e^{-1/(1-\\lVert x\\rVert^{2})}$ 平移伸缩拼出来；② 光滑流形是**仿紧**的（第二可数 + Hausdorff + 局部欧氏），于是开覆盖有局部有限加细，可以在每个成员上放一个鼓包再归一化。两块砖缺一不可。',
        '',
        '**为什么必须「局部有限」**：没有它，$\\sum\\rho_{\\alpha}$ 在某点附近可能有无穷多项非零，和既不一定收敛也不一定光滑。局部有限保证每点附近只有有限多项，于是和是有限和 —— 光滑性、可积性、线性都自动继承。',
        '',
        '**它撑起哪些结论**：黎曼度量存在（`def.riemannian-metric`）、向量丛上纤维度量存在（`prop.bundle-metric`）、最高次形式可积分（`def.integral-form`）、可定向性能用处处非零的 $n$-形式刻画（`prop.volume-form-orientation`）。这些证明的骨架全部是「局部造 + 单位分解粘」，没有一次是凭空构造。',
        '',
        '**第二可数不能省**：长直线（long line）是局部欧氏的 Hausdorff 空间，但不可分、不仿紧，上面取不到单位分解 —— 所以流形定义里那两条技术假设不是装饰。',
        '',
        '**连续版与光滑版**：连续版只需要仿紧（`prop.paracompact-partition-unity`）；升到光滑要靠鼓包函数把「连续」磨成「光滑」。所以流形上这两个版本是同一件事的两个精度，本图把两者都留在图上，边指过来即可。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 单位分解与鼓包函数',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 仿紧性与单位分解的存在性'
      ]
    },

    {
      id: 'prop.bundle-metric',
      cluster: 'diffgeom.manifold',
      type: 'proposition',
      label: '纤维度量',
      title: '向量丛上的纤维度量',
      regions: ['diffgeom'],
      tags: ['命题', '微分流形', '向量丛', '黎曼度量', '凸组合'],
      statement: [
        '**在做什么**：把「每根纤维上装一个内积」整体地做出来 —— 局部总有，用单位分解粘成整体。这是「每个流形都能配黎曼度量」的一般版本。',
        '',
        '设 $\\pi : E \\to M$ 是秩 $k$ 的光滑向量丛。**纤维度量**是每根纤维 $E_{p}$ 上的内积 $\\langle\\cdot,\\cdot\\rangle_{p}$，使对任意两个光滑截面 $s, t \\in \\Gamma(E)$，函数',
        '',
        '$$p \\longmapsto \\langle s(p), t(p)\\rangle_{p}$$',
        '',
        '光滑。则**每个光滑向量丛都存在纤维度量**。',
        '',
        '特例：$E = TM$ 时纤维度量就是黎曼度量（`def.riemannian-metric`）；$E$ 为线丛时它就是「处处正定的对称双线性型」。'
      ].join('\n'),
      notes: [
        '**证明就是单位分解**：取局部平凡化覆盖 $\\{U_{\\alpha}\\}$，在每个 $U_{\\alpha}$ 上把 $E$ 等同于 $U_{\\alpha} \\times \\mathbb{R}^{k}$、取标准内积 $\\langle\\cdot,\\cdot\\rangle_{\\alpha}$；再取光滑单位分解 $\\{\\rho_{\\alpha}\\}$（`thm.smooth-partition-unity`），令 $\\langle s,t\\rangle := \\sum_{\\alpha}\\rho_{\\alpha}\\langle s,t\\rangle_{\\alpha}$。这是**凸组合**：对称双线性显然；正定性由 $\\rho_{\\alpha} \\ge 0$ 与和恒为 $1$ 保证 —— 在每点处它是一组内积的加权平均，权重非负、总和 $1$，故 $\\langle s,s\\rangle = 0$ 只能 $s = 0$。',
        '',
        '**为什么度量没有障碍而别的结构有**：正定对称型构成一个**凸集**，凸组合仍正定；复结构（$J^{2} = -\\operatorname{id}$）与辛结构（$\\omega$ 非退化且闭）不是凸条件，粘不起来，各有拓扑障碍。所以「$TM$ 总有度量但不一定有近复结构」不是技术不足，而是「凸 vs 非凸」的本质差别。',
        '',
        '**推论：结构群缩到 $\\operatorname{O}(n)$**：有了纤维度量，$TM$ 的转移函数可逐点 Gram–Schmidt 正交化，于是结构群从 $\\operatorname{GL}(n,\\mathbb{R})$ 缩到 $\\operatorname{O}(n)$。这一步是「黎曼几何能在任意流形上做」的技术前提。',
        '',
        '**对偶丛与张量丛同样适用**：$E^{\\ast}$、$\\bigwedge^{k}E$、$E \\otimes F$ 上都由 $E, F$ 的度量诱导出度量（逐点取张量积的内积）。所以「任意张量丛都有纤维度量」也是这条的推论。',
        '',
        '**纤维度量不是 $E$ 上的黎曼度量**：$E$ 本身也是流形、也能配黎曼度量，但那会同时量「纤维方向」与「底方向」，与这里的「只量纤维方向」是两回事。$TM$ 的黎曼度量恰好两者都用得上，最容易混。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 纤维度量与单位分解'
      ]
    },

    /* ======================================================================
       §D 定向与体积形式
       ====================================================================== */

    {
      id: 'def.orientable-manifold',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '可定向流形',
      title: '可定向流形与定向',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '定向', 'Jacobi 行列式', '可定向'],
      statement: [
        '**在说什么**：能不能在整张流形上一致地规定「哪个方向是正的」—— 判据是换卡时 Jacobi 行列式恒为正，也就是搬坐标牌时不出现镜像翻转。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。图册 $\\mathcal{A}$ 叫**定向图册**，如果其中任意两张卡 $(U,\\varphi)$、$(V,\\psi)$ 在重叠处满足',
        '',
        '$$\\det\\Bigl(\\mathrm{d}(\\psi \\circ \\varphi^{-1})_{x}\\Bigr) > 0\\qquad \\bigl(x \\in \\varphi(U \\cap V)\\bigr).$$',
        '',
        '若 $M$ 上存在定向图册，称 $M$ **可定向**。$M$ 的一个**定向**是一个极大定向图册。可定向且连通时，恰有两个定向（互为**相反定向**）。',
        '',
        '**白话判据**：把 $\\mathbb{R}^{n}$ 上的「右手系」沿图册搬到流形上；搬得到处一致（不出现镜像翻转）当且仅当可定向。'
      ].join('\n'),
      notes: [
        '**为什么是 Jacobi 行列式的符号**：$\\operatorname{GL}(n,\\mathbb{R})$ 不连通，恰有两块 —— $\\det > 0$ 与 $\\det < 0$。换卡就是乘一个 $\\operatorname{GL}(n,\\mathbb{R})$ 里的元素；符号能否保持不变是**整体**问题，一张卡内部永远没问题。',
        '',
        '**两个定向**：连通可定向流形上，「定向图册」只有两种极大化结果。所以「取定定向」只有二选一，不存在第三个。不连通时每个连通分支独立二选一，共 $2^{c}$ 个（$c$ 为连通分支数，与 `thm.de-rham-h0` 里那个 $c$ 是同一个）。',
        '',
        '**不可定向的例子**：Möbius 带、$\\mathbb{RP}^{2}$、Klein 瓶。判据是「存在一条闭环，沿它走一圈坐标牌的定向翻了过来」—— 即存在**反序回路**。亏格 $g$ 的可定向闭曲面都存在，$\\mathbb{RP}^{2}$ 不存在。',
        '',
        '**与 `def.orientable-surface` 一致**：那里用「连续的单位法向场」定义，这里用「转移 Jacobi 行列式同号」；对嵌入 $\\mathbb{R}^{3}$ 的曲面两者等价（法向连续 $\\iff$ 换参数不变号）。对抽象流形只有后一种说法可用，因为「法向」需要环境空间。',
        '',
        '**更高一层的说法**：定向等价于「线丛 $\\bigwedge^{n}T^{\\ast}M$ 有处处非零的截面」（`prop.volume-form-orientation`）。所以「可定向」是**线丛是否平凡**的问题 —— 这就是拓扑进入几何的地方。',
        '',
        '**$n = 0$ 的约定**：$0$ 维流形（离散点集）上 $\\bigwedge^{0} = \\mathbb{R}$，定向就是「每点选一个正号」，一律可定向，且每个点独立二选一。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 定向图册与可定向性'
      ]
    },

    {
      id: 'def.volume-form',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '体积形式',
      title: '体积形式与黎曼体积',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '体积形式', '黎曼体积', '定向'],
      statement: [
        '**在说什么**：一个处处不为零的 $n$-形式给出「有向体积」；度量的行列式因子乘上坐标体积形式，就是黎曼体积。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。**体积形式**是处处非零的 $n$-形式 $\\omega \\in \\Omega^{n}(M)$（即 $\\omega_{p} \\ne 0$ 对每个 $p$ 成立）。',
        '',
        '若 $M$ 还带黎曼度量 $g$（`def.riemannian-metric`）与一个定向，则**黎曼体积形式**在每张保向卡里写成',
        '',
        '$$\\mathrm{d}V_{g} := \\sqrt{\\det\\bigl(g_{ij}\\bigr)}\\ \\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n},\\qquad g_{ij} = g\\Bigl(\\frac{\\partial}{\\partial x^{i}},\\frac{\\partial}{\\partial x^{j}}\\Bigr).$$',
        '',
        '在**保向正交余标架** $\\{\\theta^{1},\\ldots,\\theta^{n}\\}$（即 $g = \\sum_{i}(\\theta^{i})^{2}$）下它化简成没有系数的样子',
        '',
        '$$\\mathrm{d}V_{g} = \\theta^{1}\\wedge\\cdots\\wedge\\theta^{n}.$$',
        '',
        '于是可积的函数有体积与积分',
        '',
        '$$\\operatorname{vol}(M) := \\int_{M}\\mathrm{d}V_{g},\\qquad \\int_{M}f\\,\\mathrm{d}V_{g},$$',
        '',
        '积分按 `def.integral-form` 的「定向形式积分」定义。'
      ].join('\n'),
      notes: [
        '**为什么必须是最高次形式**：换元公式里 $\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$ 的系数变换恰好是 $\\det$（保向时无绝对值），与积分换元里出现的 $\\det$ 精确匹配 —— 这就是「形式能积分」的全部理由。$k < n$ 的形式要积分得先拉回到 $k$ 维子流形上。',
        '',
        '**根号是密度、楔积是定向**：$\\sqrt{\\det g}$ 对反向换卡不变（它带的是 $\\lvert\\det\\rvert$），$\\mathrm{d}x^{1}\\wedge\\cdots$ 反向变号。所以 $\\mathrm{d}V_{g}$ 必须先取定定向才有定义；无定向时能积的只有密度 $\\lvert\\mathrm{d}V_{g}\\rvert$（面积元 $\\mathrm{d}A$ 就是这种，`def.area-element`）。',
        '',
        '**二维退化成面积元**：$\\mathrm{d}V_{g} = \\sqrt{EG - F^{2}}\\,\\mathrm{d}u\\wedge\\mathrm{d}v$，与 `def.area-element` 的 $\\mathrm{d}A$ 逐字相同，只差「要不要把 $\\mathrm{d}u\\wedge\\mathrm{d}v$ 看成带定向的」这一层。',
        '',
        '**正交余标架为什么省事**：$g = \\sum(\\theta^{i})^{2}$ 时 $\\det(g_{ij}) = 1$，活动标架法（`def.moving-frame`）里所有体积与曲面积分都用 $\\theta^{1}\\wedge\\cdots$ 写，不再带根号。这也是「曲面上 $\\mathrm{d}A = \\omega^{1}\\wedge\\omega^{2}$」的来源。',
        '',
        '**它不是度量的一部分**：同一个度量配两个定向，给出两个只差符号的体积形式；同一个定向配不同度量，给出不同的 $\\sqrt{\\det g}$。体积形式 = 定向 + 度量，两部分都要交代。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 体积形式与定向',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 黎曼体积与正交余标架'
      ]
    },

    {
      id: 'prop.volume-form-orientation',
      cluster: 'diffgeom.manifold',
      type: 'proposition',
      label: '定向与体积形式',
      title: '可定向当且仅当存在处处非零的最高次形式',
      regions: ['diffgeom'],
      tags: ['命题', '微分流形', '定向', '体积形式', '单位分解'],
      statement: [
        '**在做什么**：给「可定向」一个不需要图册的判据 —— 只要能在整张流形上写出一个处处不为零的 $n$-形式。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。则 $M$ 可定向，当且仅当存在处处非零的 $n$-形式',
        '',
        '$$\\omega \\in \\Omega^{n}(M),\\qquad \\omega_{p} \\ne 0\\ \\ \\bigl(\\forall p \\in M\\bigr).$$',
        '',
        '更精确地：两个处处非零的 $n$-形式 $\\omega, \\omega_{1}$ 必满足 $\\omega_{1} = f\\,\\omega$，其中 $f$ 是处处非零的光滑函数；它们给出**同一个定向**当且仅当 $f > 0$ 处处成立。于是在连通流形上，「处处非零的 $n$-形式模掉正光滑函数」恰好就是「定向」，与 `def.orientable-manifold` 的极大定向图册一一对应。'
      ].join('\n'),
      notes: [
        '**证明的两半**：$(\\implies)$ 在每张保向卡上取 $\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$，它换卡时乘一个**正**的光滑函数，故能用单位分解加成一个整体的 $\\omega$，正系数保证不归零；$(\\Longleftarrow)$ 给一个处处非零的 $\\omega$，在某张卡上它等于 $f\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$ 且 $f$ 处处非零，把所有 $f < 0$ 的卡换成反序坐标 —— 于是全族的转移 Jacobi 行列式都为正，得到定向图册。细节在边上。',
        '',
        '**为什么这里逃不掉单位分解**：局部造的东西只有「正函数倍」的自由度，没有抵消机制 —— 求和时正系数保证不会归零。所以这条是 `thm.smooth-partition-unity` 最标准的用法之一。',
        '',
        '**线丛的语言**：$\\bigwedge^{n}T^{\\ast}M$ 是秩 $1$ 的线丛（叫**定向丛**），$\\omega$ 就是它的处处非零截面。所以「可定向」与「定向丛平凡」是同一条陈述的两种说法 —— 这与 `def.bundle-section` 里「有处处非零截面就等价于丛平凡」是同一个判据。',
        '',
        '**「处处非零」不能换成「几乎处处非零」**：零点所在处就选不出定向。任何 $n$-形式在不可定向流形上必有零点 —— 这是「$\\mathbb{RP}^{2}$ 上体积形式不能整体选取」的准确说法。',
        '',
        '**连通性用在哪**：只在「$f > 0$ 当且仅当同一定向」这一步。不连通时 $f$ 可在不同分支上异号，于是两个处处非零的 $n$-形式可能只在部分分支上给出相同定向 —— 符号问题因此要逐分支讨论。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 可定向性与处处非零的最高次形式'
      ]
    },

    /* ======================================================================
       §E de Rham 上同调
       ====================================================================== */

    {
      id: 'def.de-rham-complex',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: 'de Rham 上同调',
      title: 'de Rham 复形与上同调群',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', 'de Rham 上同调', '闭形式', '恰当形式', '链复形'],
      statement: [
        '**在说什么**：外微分满足 $\\mathrm{d}^{2} = 0$，于是 $k$-形式排成一串「链」；闭形式模掉恰当形式剩下的那部分就是上同调 —— 它量的是「有多少闭形式是假闭的」。',
        '',
        '设 $M$ 是光滑流形，$\\Omega^{k}(M)$ 是 $k$-形式的空间。外微分（`def.exterior-derivative`）给出 **de Rham 复形**',
        '',
        '$$0 \\longrightarrow \\Omega^{0}(M) \\xrightarrow{\\ \\mathrm{d}\\ } \\Omega^{1}(M) \\xrightarrow{\\ \\mathrm{d}\\ } \\Omega^{2}(M) \\xrightarrow{\\ \\mathrm{d}\\ } \\cdots$$',
        '',
        '由 $\\mathrm{d}^{2} = 0$ 得 $\\operatorname{im}\\mathrm{d} \\subseteq \\ker\\mathrm{d}$。记**闭形式**与**恰当形式**的空间为',
        '',
        '$$Z^{k}(M) := \\ker\\bigl(\\mathrm{d} : \\Omega^{k}(M) \\to \\Omega^{k+1}(M)\\bigr),\\qquad B^{k}(M) := \\operatorname{im}\\bigl(\\mathrm{d} : \\Omega^{k-1}(M) \\to \\Omega^{k}(M)\\bigr),$$',
        '',
        '（$\\Omega^{-1} := 0$，故 $B^{0} = 0$）。**de Rham 上同调群**是商空间',
        '',
        '$$H^{k}_{\\mathrm{dR}}(M) := Z^{k}(M) / B^{k}(M).$$',
        '',
        '给定光滑映射 $F : N \\to M$，拉回给出线性映射 $F^{\\ast} : H^{k}_{\\mathrm{dR}}(M) \\to H^{k}_{\\mathrm{dR}}(N)$（因为 $F^{\\ast}\\mathrm{d} = \\mathrm{d}F^{\\ast}$，见 `prop.pullback-forms`），且 $(G \\circ F)^{\\ast} = F^{\\ast} \\circ G^{\\ast}$。所以 $H^{k}_{\\mathrm{dR}}$ 是光滑流形范畴上的**函子**。'
      ].join('\n'),
      notes: [
        '**它测什么**：$H^{k} = 0$ 意味着「闭就恰当」；$H^{k} \\ne 0$ 说明存在闭而不恰当的形式。$\\mathbb{R}^{2}\\setminus\\{0\\}$ 上的角形式 $\\frac{x\\,\\mathrm{d}y - y\\,\\mathrm{d}x}{x^{2}+y^{2}}$ 闭而不恰当，它的类生成 $H^{1} \\cong \\mathbb{R}$，量的是「绕原点的圈数」。',
        '',
        '**de Rham 定理（只提不证）**：$H^{k}_{\\mathrm{dR}}(M) \\cong H^{k}_{\\mathrm{sing}}(M;\\mathbb{R})$ —— 解析构造（形式 + 微分）算出的东西，等于纯拓扑构造（奇异链 + 边界）算出的东西。这一条把微分几何与代数拓扑缝在一起，是本图范畴/同调那一片的接口。',
        '',
        '**维数有限**：$M$ 紧致时每个 $H^{k}_{\\mathrm{dR}}(M)$ 都有限维，且 $k > \\dim M$ 时为零。所以上同调是一组有限的数（Betti 数）。本图不证。',
        '',
        '**局部总是零**：任意流形每点都有可缩邻域，由 Poincaré 引理（`lem.poincare-lemma`）$H^{k} = 0$（$k \\ge 1$）。所以上同调**纯粹是整体**信息 —— 这就是它比局部微分不变量更有用的原因。',
        '',
        '**$H^{0}$ 要单独看**：$Z^{0} = \\ker(\\mathrm{d} : C^{\\infty}(M) \\to \\Omega^{1}(M))$ 是局部常函数，$B^{0} = 0$，所以 $H^{0}$ 数的是连通分支（`thm.de-rham-h0`）。$k \\ge 1$ 才需要 Poincaré 引理那类论证。',
        '',
        '**它不是同伦不变量意义上的「同调」**：$H^{k}$ 是**上**同调（用形式与拉回），对偶于用链与边界的同调。之所以也叫上同调，是因为拉回是逆变的；两者在 de Rham 定理里被证明同构。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「de Rham Cohomology」· de Rham 复形与上同调群'
      ]
    },

    {
      id: 'thm.de-rham-h0',
      cluster: 'diffgeom.manifold',
      type: 'theorem',
      label: '零次上同调',
      title: '零次上同调群与连通分支',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', 'de Rham 上同调', '连通分支', '局部常函数'],
      statement: [
        '**在做什么**：把最低那一格算出来 —— $0$-形式是函数，「闭」就是「局部常」，于是 $H^{0}$ 精确地数连通分支的个数。',
        '',
        '设 $M$ 是光滑流形，$c$ 是它的连通分支个数。则',
        '',
        '$$H^{0}_{\\mathrm{dR}}(M) \\cong \\mathbb{R}^{c}.$$',
        '',
        '特别地，$M$ 连通当且仅当 $\\dim H^{0}_{\\mathrm{dR}}(M) = 1$（$M \\ne \\emptyset$）。',
        '',
        '$0$-形式就是光滑函数，$\\mathrm{d}f = 0$ 等价于 $f$ 在每张连通卡上是常数；而 $B^{0} = 0$，所以 $H^{0} = Z^{0}$，没有商可做。'
      ].join('\n'),
      notes: [
        '**为什么是 $\\mathbb{R}^{c}$ 而不是 $\\mathbb{Z}^{c}$**：系数是实数，$H^{0}$ 是实向量空间，一组基就是各连通分支的指示函数。所以「$H^{0}$ 数分支」是在**维数**上数的，不是数元素个数。',
        '',
        '**证明的两步**：① $\\mathrm{d}f = 0$ 当且仅当 $f$ 在每个连通分支上常值（分支连通，任两点能用一串卡连起来，相邻两张卡的重叠在连通块上、常值相同）；② $B^{0} = 0$，因为没有 $-1$-形式，没有东西可商。于是 $H^{0}$ 同构于「局部常函数构成的空间」，而这个空间的维数恰是分支数。细节在边上。',
        '',
        '**它是函子性的**：$F : N \\to M$ 光滑时 $F^{\\ast} : H^{0}(M) \\to H^{0}(N)$ 就是「把 $M$ 上的局部常函数拉回去」。$M$ 连通而 $N$ 不连通时，$F$ 在每个分支上只能取一个常值 —— 分支结构被这一条完全编码。',
        '',
        '**与同伦的关系**：$H^{0}$ 是 $\\pi_{0}(M)$ 上的自由实向量空间，所以它是**同伦不变量**而非微分不变量。这也是 de Rham 定理在 $k = 0$ 时的样子（0 维奇异上同调同样是每个分支贡献一个 $\\mathbb{R}$）。',
        '',
        '**别拿 Poincaré 引理套 $H^{0}$**：引理说的是 $k \\ge 1$ 且区域可缩才有 $H^{k} = 0$。$H^{0}$ 对非空流形永远不为零，因为它数的是「有几个整体」而不是「有没有局部障碍」。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「de Rham Cohomology」· 零次上同调与连通分支'
      ]
    },

    {
      id: 'lem.poincare-lemma',
      cluster: 'diffgeom.manifold',
      type: 'lemma',
      label: 'Poincaré 引理',
      title: 'Poincaré 引理：星形区域上的闭形式恰当',
      regions: ['diffgeom'],
      tags: ['引理', '微分流形', 'Poincaré 引理', '闭形式', '同伦算子'],
      statement: [
        '**在做什么**：给「闭形式何时恰当」一个干净的回答 —— 只要区域能缩成一点（星形），$k \\ge 1$ 时闭就必恰当。所以上同调不是分析现象，是拓扑现象。',
        '',
        '设 $U \\subseteq \\mathbb{R}^{n}$ 是**星形**开集：存在 $p_{0} \\in U$ 使对每个 $x \\in U$，线段 $\\{p_{0} + t(x - p_{0}) : t \\in [0,1]\\}$ 整段落在 $U$ 里。则对 $k \\ge 1$，',
        '',
        '$$\\mathrm{d}\\omega = 0 \\implies \\exists\\ \\eta \\in \\Omega^{k-1}(U)\\ \\text{such that}\\ \\omega = \\mathrm{d}\\eta .$$',
        '',
        '等价地说：$H^{k}_{\\mathrm{dR}}(U) = 0$ 对一切 $k \\ge 1$ 成立；而 $H^{0}_{\\mathrm{dR}}(U) = \\mathbb{R}$（星形区域连通）。',
        '',
        '结论对**可缩**开集同样成立：星形蕴含可缩，而论证只用到收缩同伦，不用星形区域的具体形状。'
      ].join('\n'),
      notes: [
        '**关键的是一条链同伦**：存在线性映射 $K : \\Omega^{k}(U) \\to \\Omega^{k-1}(U)$（沿 $x \\mapsto tx$ 的「积分」，$t \\in [0,1]$）使',
        '',
        '$$\\mathrm{d}K + K\\mathrm{d} = \\operatorname{id}_{\\Omega^{k}}\\qquad (k \\ge 1),$$',
        '',
        '于是在 $\\mathrm{d}\\omega = 0$ 时 $\\omega = \\mathrm{d}(K\\omega)$，取 $\\eta = K\\omega$ 即可。$K$ 的具体公式是一段含内乘 $\\iota_{X}$ 的积分，本节点不展开 —— 重要的是「存在 $K$」这件事，它把「同伦」翻译成了「代数」。',
        '',
        '**星形去不掉**：$U = \\mathbb{R}^{2}\\setminus\\{0\\}$ 上的角形式 $\\omega = \\frac{x\\,\\mathrm{d}y - y\\,\\mathrm{d}x}{x^{2}+y^{2}}$ 满足 $\\mathrm{d}\\omega = 0$，但 $\\int_{S^{1}}\\omega = 2\\pi \\ne 0$；若 $\\omega = \\mathrm{d}\\eta$，由 Stokes 定理得 $\\int_{S^{1}}\\mathrm{d}\\eta = \\int_{\\partial S^{1}}\\eta = 0$，矛盾。所以 $H^{1}(\\mathbb{R}^{2}\\setminus\\{0\\}) \\ne 0$ —— 一个洞就破坏了引理。',
        '',
        '**$k \\ge 1$ 不能放宽**：$k = 0$ 时「闭」是局部常、「恰当」是零（没有 $-1$-形式），两者差得远，所以 $H^{0} = \\mathbb{R} \\ne 0$。陈述里必须把 $k = 0$ 摘出去。',
        '',
        '**它是局部计算的核心**：流形每点有可缩邻域（卡里的球），于是引理给出「上同调局部为零」。凡是上同调不为零，必定有整体障碍 —— 洞、柄、扭结。这也是 de Rham 上同调能被拓扑方法算出来的原因。',
        '',
        '**为什么叫 Poincaré**：Poincaré 在 19 世纪末的向量分析语言里证过「无旋场局部是梯度」这类结论；形式语言把它一句收完，并指出唯一假设是「区域能缩成一点」。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「de Rham Cohomology」· Poincaré 引理'
      ]
    },

    {
      id: 'thm.mayer-vietoris',
      cluster: 'diffgeom.manifold',
      type: 'theorem',
      label: 'Mayer–Vietoris 序列',
      title: 'Mayer–Vietoris 长正合列',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', 'de Rham 上同调', '长正合列', '连接同态'],
      statement: [
        '**在做什么**：把一个大流形的上同调，拆成两块以及它们交叠的上同调 —— 这是「打补丁」计算上同调的标准机器。',
        '',
        '设 $M$ 是光滑流形，$U, V \\subseteq M$ 是开集且 $M = U \\cup V$。则存在**长正合列**',
        '',
        '$$\\cdots \\to H^{k}_{\\mathrm{dR}}(M) \\to H^{k}_{\\mathrm{dR}}(U) \\oplus H^{k}_{\\mathrm{dR}}(V) \\to H^{k}_{\\mathrm{dR}}(U \\cap V) \\xrightarrow{\\ \\delta\\ } H^{k+1}_{\\mathrm{dR}}(M) \\to \\cdots$$',
        '',
        '其中第二个箭头是 $(\\omega_{U},\\omega_{V}) \\mapsto \\omega_{U}\\big|_{U \\cap V} - \\omega_{V}\\big|_{U \\cap V}$，$\\delta$ 叫**连接同态**。',
        '',
        '**本节点只给陈述**：$\\delta$ 的显式构造与正合性的逐项验证，本图不写（要先把「形式的拆分」这套机器架起来，篇幅与收益不成比例）。此条按参考书陈述，不附证明。'
      ].join('\n'),
      notes: [
        '**$\\delta$ 从哪来（给直觉，不是证明）**：取 $[\\omega] \\in H^{k}(U \\cap V)$。用单位分解写 $\\omega = \\rho_{U}\\omega + \\rho_{V}\\omega$（$\\rho_{U} + \\rho_{V} = 1$，各自支撑在 $U$、$V$ 里），把两块分别延拓成 $U$、$V$ 上的形式。它们的差在重叠处为零，于是拼成 $M$ 上的 $(k+1)$-形式，它就是 $\\delta[\\omega]$。符号与 $\\mathrm{d}$ 的次序要在具体计算里对齐，本图不替读者对齐。',
        '',
        '**最简单的算例**：取 $S^{1} = U \\cup V$ 为两个略长的开弧（$U \\cap V$ 有两个连通分支），序列给出 $H^{1}(S^{1}) \\cong \\mathbb{R}$ —— 正是「单位圆上那个角形式」的那一个类。$S^{2}$ 用两个略大于半球的球冠（$U \\cap V$ 同伦于 $S^{1}$）给出 $H^{2}(S^{2}) \\cong \\mathbb{R}$。',
        '',
        '**为什么它是标准工具**：任何流形都能被可缩的开集（卡里的球）覆盖，Mayer–Vietoris 加归纳就把整张流形算出来 —— 这是「好的覆盖」那条计算路线的起点。算的时候用 Čech 侧（`def.cech-cohomology`）更容易，两者的一致性由 de Rham 定理保证。',
        '',
        '**为什么要求 $U, V$ 都开**：形式的限制只需要开集，不需要闭集；闭集版本要额外假设（或改用奇异上同调）。开性是「限制到重叠处」的合法保障。',
        '',
        '**它的本质是同调代数**：短正合列',
        '',
        '$$0 \\to \\Omega^{\\bullet}(M) \\to \\Omega^{\\bullet}(U) \\oplus \\Omega^{\\bullet}(V) \\to \\Omega^{\\bullet}(U \\cap V) \\to 0$$',
        '',
        '取上同调就长出长正合列。所以 Mayer–Vietoris 不是形式的特殊性质，而是**链复形的一般定理**（蛇引理 / 连接同态）。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「de Rham Cohomology」· Mayer–Vietoris 序列'
      ]
    },

    /* ======================================================================
       §F Lie 群与 Lie 代数
       ====================================================================== */

    {
      id: 'def.lie-group',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: 'Lie 群',
      title: 'Lie 群',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', 'Lie 群', '群', '左平移'],
      statement: [
        '**在说什么**：既是群又是光滑流形，而且两种结构互相尊重 —— 乘法与取逆都光滑。于是「群运算」可以用微积分研究。',
        '',
        '**Lie 群**是集合 $G$，同时带',
        '',
        ['1. **群**结构（`def.group`）；',
         '2. **有限维光滑流形**结构（`def.smooth-manifold`）；'].join('\n'),
        '',
        '使**乘法** $m : G \\times G \\to G$（$m(g,h) := gh$，$G \\times G$ 取乘积流形结构）与**取逆** $i : G \\to G$（$i(g) := g^{-1}$）都是光滑映射。',
        '',
        '对 $g \\in G$ 定义**左平移**与**右平移**',
        '',
        '$$L_{g} : G \\to G,\\quad L_{g}(h) := gh ;\\qquad R_{g} : G \\to G,\\quad R_{g}(h) := hg .$$',
        '',
        '两者都是微分同胚（逆分别是 $L_{g^{-1}}$、$R_{g^{-1}}$），且 $L_{g} \\circ L_{h} = L_{gh}$。',
        '',
        '**例**：$\\operatorname{GL}(n,\\mathbb{R}) = \\{A : \\det A \\ne 0\\}$（$\\mathbb{R}^{n^{2}}$ 的开子集，故是 $n^{2}$ 维流形）；$\\operatorname{SL}(n,\\mathbb{R})$、$\\operatorname{O}(n)$、$\\operatorname{SO}(n)$、$\\operatorname{U}(n)$（由方程切出来，见 `thm.regular-level-set`）；$(\\mathbb{R}^{n},+)$；$S^{1} \\subseteq \\mathbb{C}^{\\times}$；任意离散群（$0$ 维）。'
      ].join('\n'),
      notes: [
        '**「取逆光滑」其实可以省掉**：只假设乘法光滑，则每个 $L_{g}$、$R_{g}$ 光滑；由隐函数定理 $i$ 在 $e$ 附近光滑，再用 $i = L_{g^{-1}} \\circ i \\circ R_{g^{-1}}$ 搬到各处。本图按习惯把两条都写进定义，省掉一次对隐函数定理的引用。',
        '',
        '**$\\operatorname{GL}(n,\\mathbb{R})$ 为什么是流形**：$\\det : \\mathbb{R}^{n^{2}} \\to \\mathbb{R}$ 连续，$\\mathbb{R}\\setminus\\{0\\}$ 开，所以 $\\det^{-1}(\\mathbb{R}\\setminus\\{0\\})$ 在 $\\mathbb{R}^{n^{2}}$ 里开 —— 一张卡就够，$\\varphi = \\operatorname{id}$。这是「开子集继承流形结构」最省事的例子。',
        '',
        '**$\\operatorname{O}(n)$ 为什么是流形**：它是 $F(A) = A^{\\mathsf{T}}A - I$ 的零点集，$\\mathrm{d}F_{A}(B) = A^{\\mathsf{T}}B + B^{\\mathsf{T}}A$ 在 $F^{-1}(0)$ 上满射（给定对称的 $S$，取 $B = AS/2$ 即得），于是由 `thm.regular-level-set` 得 $\\dim = n^{2} - n(n+1)/2 = n(n-1)/2$。群结构由「正交矩阵之积仍正交」给出。',
        '',
        '**拓扑限制**：不是每个群都能当 Lie 群（要第二可数、要局部欧氏）。Cartan 的闭子群定理说 Lie 群的闭子群自动是子流形 —— 这一条把「$\\operatorname{SL}$、$\\operatorname{O}$ 是 Lie 群」一般化，本图只提。',
        '',
        '**为什么关心它**：Lie 群把「对称性」变成可微的对象，于是在单位元处求导就得到 Lie 代数（`def.lie-algebra`、`prop.left-invariant-fields`）—— 非线性问题线性化，这是整个理论的技术核心。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· Lie 群与例子',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 左平移与右平移'
      ]
    },

    {
      id: 'def.lie-algebra',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: 'Lie 代数',
      title: 'Lie 代数',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', 'Lie 代数', 'Jacobi 恒等式', '交换子'],
      statement: [
        '**在说什么**：一个向量空间配一个「反称、且满足 Jacobi」的括号 —— 它是 Lie 群在单位元处的线性化，也是「无穷小对称」的代数。',
        '',
        '**Lie 代数**是实向量空间 $\\mathfrak{g}$ 连同一个双线性映射',
        '',
        '$$[\\cdot,\\cdot] : \\mathfrak{g} \\times \\mathfrak{g} \\longrightarrow \\mathfrak{g},$$',
        '',
        '满足两条：',
        '',
        ['1. **反称**：$[X,Y] = -[Y,X]$（等价于 $[X,X] = 0$）；',
         '2. **Jacobi 恒等式**：$[X,[Y,Z]] + [Y,[Z,X]] + [Z,[X,Y]] = 0$。'].join('\n'),
        '',
        '$\\dim\\mathfrak{g}$ 叫 Lie 代数的维数。对括号封闭的子空间叫 **Lie 子代数**；若还满足 $[\\mathfrak{g},\\mathfrak{h}] \\subseteq \\mathfrak{h}$ 叫 **Lie 理想**。保括号的线性映射叫 **Lie 代数同态**。',
        '',
        '**例**：$\\mathfrak{gl}(n,\\mathbb{R}) = M_{n}(\\mathbb{R})$ 配 $[A,B] = AB - BA$；$\\mathbb{R}^{3}$ 配叉积 $[u,v] = u \\times v$；任意结合代数配交换子 $[a,b] = ab - ba$；任意向量空间配零括号（**阿贝尔** Lie 代数）。'
      ].join('\n'),
      notes: [
        '**Jacobi 是「括号来自求导」的痕迹**：把 Jacobi 改写成 $[X,[Y,Z]] = [[X,Y],Z] + [Y,[X,Z]]$，读法是「$[X,\\cdot]$ 是导子」。所以这三条不是凭空的规定，而是「一阶微分算子的交换子」的抽象 —— `def.lie-bracket` 里向量场的括号满足它，正是这个原因。',
        '',
        '**反称与 Jacobi 不能互相替换**：反称说的是「括号看两个变元的次序」，Jacobi 说的是「括号与自己的相容性」。两者合起来才让通用包络代数一类构造有意义。本图只用这两条。',
        '',
        '**$\\mathbb{R}^{3}$ 的叉积最直观**：$u \\times v$ 反称、双线性；Jacobi 等价于「$u \\times (v \\times w)$ 的展开式」。这个 Lie 代数同构于 $\\mathfrak{so}(3)$ —— 这解释了角动量算子的交换关系。',
        '',
        '**阿贝尔情形**：零括号满足一切公理，对应交换的 Lie 群（如 $(\\mathbb{R}^{n},+)$）。所以 Lie 代数**不能**复原群 —— 从代数回到群要做指数映射，那需要额外结构（本图不展开）。',
        '',
        '**术语撞车**：「$\\mathfrak{g}$ 是 Lie 代数」与「$A$ 是（结合）代数」是两件事。Lie 代数一般不结合，$[X,[Y,Z]]$ 与 $[[X,Y],Z]$ 之差恰是 Jacobi 里那一项。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· Lie 代数与例子'
      ]
    },

    {
      id: 'prop.left-invariant-fields',
      cluster: 'diffgeom.manifold',
      type: 'proposition',
      label: '左不变向量场',
      title: '左不变向量场与 Lie 代数',
      regions: ['diffgeom'],
      tags: ['命题', '微分流形', 'Lie 群', 'Lie 代数', '左不变向量场'],
      statement: [
        '**在做什么**：把 Lie 群「在单位元处求导」—— 左平移让单位元处的每个切向量长成一个整体向量场，而这些向量场恰好构成一个 Lie 代数。',
        '',
        '设 $G$ 是 Lie 群，$\\mathfrak{g} := T_{e}G$（$e$ 是单位元）。向量场 $X \\in \\mathfrak{X}(G)$ 叫**左不变**，如果对一切 $g, h \\in G$ 有',
        '',
        '$$X_{gh} = \\mathrm{d}(L_{g})_{h}\\bigl(X_{h}\\bigr).$$',
        '',
        '则：',
        '',
        ['1. **赋值给出同构**：$X \\mapsto X_{e}$ 是「左不变向量场的空间」到 $\\mathfrak{g}$ 的线性同构（逆是 $v \\mapsto \\bigl(g \\mapsto \\mathrm{d}(L_{g})_{e}(v)\\bigr)$），于是这个空间是 $\\dim G$ 维的；',
         '2. **对 Lie 括号封闭**：$X, Y$ 左不变，则 $[X,Y]$ 也左不变；',
         '3. **于是 $\\mathfrak{g}$ 带 Lie 代数结构**：定义 $[v,w] := [\\tilde v,\\tilde w]_{e}$（$\\tilde v$ 是 $v$ 对应的左不变向量场），则 $(\\mathfrak{g},[\\cdot,\\cdot])$ 是 Lie 代数（`def.lie-algebra`），叫 $G$ 的 **Lie 代数**，且 $\\dim\\mathfrak{g} = \\dim G$。'].join('\n'),
        '',
        '所以「Lie 群 $\\to$ Lie 代数」是一个函子：$\\mathrm{Lie}(G)$。'
      ].join('\n'),
      notes: [
        '**为什么赋值是双射**：左不变性把 $X$ 在 $gh$ 处的值**唯一**由 $X_{h}$ 决定，取 $h = e$ 就知 $X$ 完全由 $X_{e}$ 决定（单射）；反过来，给定 $v \\in \\mathfrak{g}$，令 $X_{g} := \\mathrm{d}(L_{g})_{e}(v)$，则 $X_{gh} = \\mathrm{d}(L_{gh})_{e}(v) = \\mathrm{d}(L_{g})_{h}\\bigl(\\mathrm{d}(L_{h})_{e}(v)\\bigr) = \\mathrm{d}(L_{g})_{h}(X_{h})$（链式法则加 $L_{gh} = L_{g} \\circ L_{h}$），故左不变（满射）。光滑性：局部用卡写开，$\\mathrm{d}(L_{g})$ 对 $g$ 光滑。',
        '',
        '**括号为什么能下去**：关键是 Lie 括号的**自然性**',
        '',
        '$$\\mathrm{d}F\\bigl([X,Y]_{p}\\bigr) = \\bigl[\\mathrm{d}F(X),\\mathrm{d}F(Y)\\bigr]_{F(p)},$$',
        '',
        '这里 $F$ 是微分同胚。取 $F = L_{g}$，由左不变性得 $\\mathrm{d}(L_{g})X = X$、$\\mathrm{d}(L_{g})Y = Y$，于是 $\\mathrm{d}(L_{g})[X,Y] = [X,Y]$，即 $[X,Y]$ 左不变。所以「Lie 群给出 Lie 代数」唯一的实质是这条自然性。',
        '',
        '**例子**：$G = \\operatorname{GL}(n,\\mathbb{R})$ 的 Lie 代数是 $\\mathfrak{gl}(n,\\mathbb{R})$ 配交换子 —— 因为 $L_{A}$ 是线性映射、$\\mathrm{d}(L_{A}) = A$ 本身，左不变向量场就是 $X(A) = AM$（$M$ 固定），括号算出来正是 $[M,N] = MN - NM$。',
        '',
        '**「Lie 代数决定 Lie 群」是假的**：$S^{1}$ 与 $\\mathbb{R}$ 的 Lie 代数都是一维阿贝尔的，但两者不同构（紧 vs 非紧）。所以从 $\\mathfrak{g}$ 回不到 $G$，只能回到单连通的 $G$ —— 这是 Lie 第三定理的内容，本图不展开。',
        '',
        '**下一步去哪**：左不变**形式**（对偶版本）给出 Maurer–Cartan 方程，本图不展开；那条线与结构方程（`def.connection-form`）是同一套记账。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 左不变向量场与 Lie 代数',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· Lie 括号的自然性'
      ]
    }

  ],

  edges: [

    /* ============================================================
       定义引用（蓝线）
       ============================================================ */

    {
      id: 'dep.mf-topology-chart',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.manifold-chart',
      note: '图卡里的 $U$ 必须是开集、$\\varphi$ 必须是到开集的同胚；「$M$ 局部像 $\\mathbb{R}^{n}$」这句话完全用拓扑语言写成，所以流形首先得是拓扑空间。'
    },
    {
      id: 'dep.mf-homeo-chart',
      kind: 'definition',
      definition: 'def.homeomorphism',
      usedBy: 'def.manifold-chart',
      note: '图卡就是「开集之间的同胚」；只要求双射不够 —— 那样「连续」「紧」「收敛」这些概念没法从 $\\mathbb{R}^{n}$ 搬过来，坐标就失去了拓扑意义。'
    },
    {
      id: 'dep.mf-hausdorff-tangentbundle',
      kind: 'definition',
      definition: 'def.hausdorff',
      usedBy: 'def.tangent-bundle',
      note: '$TM$ 的 Hausdorff 性继承自底流形 $M$：纤维之间由「起点不同」的分离性、纤维内部由 $\\mathbb{R}^{n}$ 的分离性给出。没有这一条，$TM$ 上的极限就可能不唯一。'
    },
    {
      id: 'dep.mf-chart-maximal-atlas',
      kind: 'definition',
      definition: 'def.manifold-chart',
      usedBy: 'prop.maximal-atlas',
      note: '极大图册的定义就是「与图册里每张卡相容的卡」，所以整个命题只在转移映射上做文章，一个字都不涉及别的结构。'
    },
    {
      id: 'dep.mf-smoothmanifold-smoothmap',
      kind: 'definition',
      definition: 'def.smooth-manifold',
      usedBy: 'def.smooth-map',
      note: '光滑映射的定义要下到卡里，而「哪些卡算数」由光滑结构指定；没有光滑结构就没有局部表示可言。'
    },
    {
      id: 'dep.mf-jacobian-diff',
      kind: 'definition',
      definition: 'def.jacobian',
      usedBy: 'def.differential-map',
      note: '在卡里 $\\mathrm{d}F_{p}$ 的矩阵就是局部表示的 Jacobi 矩阵；换卡时两侧各乘一个 Jacobi 矩阵，「协变 + 反变」各一次，所以它仍是一个良定义的线性映射。'
    },
    {
      id: 'dep.mf-tangent-diff',
      kind: 'definition',
      definition: 'def.tangent-space-manifold',
      usedBy: 'def.differential-map',
      note: '切映射是切空间之间的线性映射，定义域与值域都是切空间；「曲线类相切」这个定义直接给出 $\\mathrm{d}F_{p}([\\gamma]) := [F \\circ \\gamma]$。'
    },
    {
      id: 'dep.mf-tangent-tangentbundle',
      kind: 'definition',
      definition: 'def.tangent-space-manifold',
      usedBy: 'def.tangent-bundle',
      note: '切丛是把所有 $T_{p}M$ 按 $p$ 摞起来，纤维就是切空间；「切向量带起点」这件事让 $TM$ 成为流形而不只是向量空间的并。'
    },
    {
      id: 'dep.mf-chart-tangentbundle',
      kind: 'definition',
      definition: 'def.manifold-chart',
      usedBy: 'def.tangent-bundle',
      note: '$TM$ 的图卡由 $M$ 的图卡 $\\varphi$ 与它的微分 $\\mathrm{d}\\varphi$ 拼成；转移映射光滑完全来自原图册相容加上 $\\mathrm{d}(\\psi\\varphi^{-1})$ 光滑。'
    },
    {
      id: 'dep.mf-tangentbundle-vf',
      kind: 'definition',
      definition: 'def.tangent-bundle',
      usedBy: 'def.vector-field',
      note: '向量场是切丛的光滑截面（$\\pi \\circ X = \\operatorname{id}$），所以「光滑」是说 $X : M \\to TM$ 这个映射光滑，而不是「每个分量看着像光滑」。'
    },
    {
      id: 'dep.mf-tangent-vf',
      kind: 'definition',
      definition: 'def.tangent-space-manifold',
      usedBy: 'def.vector-field',
      note: '每点挑的那个向量住在 $T_{p}M$ 里；导子视角 $Xf := \\mathrm{d}f(X)$ 用的正是切向量作用在函数上这一定义。'
    },
    {
      id: 'dep.mf-vf-bracket',
      kind: 'definition',
      definition: 'def.vector-field',
      usedBy: 'def.lie-bracket',
      note: '括号吃两个向量场、吐一个向量场；「二阶项能抵消」这件事也只有在定义在一族光滑向量场上时才有意义。'
    },
    {
      id: 'dep.mf-exterior-tensorfield',
      kind: 'definition',
      definition: 'def.exterior-algebra',
      usedBy: 'def.tensor-field',
      note: '每点的外代数就是交错张量的全体；把「交错」这条对称性加到张量丛上再取截面，就得到微分形式 —— 所以形式是张量场的特例。'
    },
    {
      id: 'dep.mf-tensorprod-tensorfield',
      kind: 'definition',
      definition: 'def.tensor-product-vs',
      usedBy: 'def.tensor-field',
      note: '张量丛的纤维是 $T_{p}M$ 与 $T_{p}^{\\ast}M$ 的张量积的直和；「多重线性」与「张量积的泛性质」是同一件事的两种说法。'
    },
    {
      id: 'dep.mf-trace-tensorfield',
      kind: 'definition',
      definition: 'def.trace',
      usedBy: 'def.tensor-field',
      note: '把一上一下两个指标缩并，逐点看就是一次取迹；这是张量运算里最简单的一个例子，Ricci 曲率（`def.ricci-curvature`）正是这么来的。'
    },
    {
      id: 'dep.mf-vf-tensorfield',
      kind: 'definition',
      definition: 'def.vector-field',
      usedBy: 'def.tensor-field',
      note: '$(1,0)$ 型张量场就是向量场；分量变换律 $X^{i} = \\sum_{j}\\frac{\\partial y^{i}}{\\partial x^{j}}X^{j}$ 与张量场那条是同一行公式。'
    },
    {
      id: 'dep.mf-vs-vectorbundle',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'def.vector-bundle',
      note: '每根纤维是 $k$ 维实向量空间，转移函数取值于 $\\operatorname{GL}(k,\\mathbb{R})$ —— 线性结构全部来自向量空间，向量丛只是把这份线性结构装在流形上。'
    },
    {
      id: 'dep.mf-vectorbundle-section',
      kind: 'definition',
      definition: 'def.vector-bundle',
      usedBy: 'def.bundle-section',
      note: '截面是映射 $s$ 满足 $\\pi \\circ s = \\operatorname{id}$；没有纤维与投影，就无从说「这个元素住在哪个纤维里」。'
    },
    {
      id: 'dep.mf-partition-smooth-pu',
      kind: 'definition',
      definition: 'def.partition-of-unity',
      usedBy: 'thm.smooth-partition-unity',
      note: '三条要求（支撑在成员里、支撑族局部有限、和恒为 $1$）逐字相同，区别只有把「连续」升成「光滑」—— 两者是同一件事的两个精度。'
    },
    {
      id: 'dep.mf-paracompact-smooth-pu',
      kind: 'definition',
      definition: 'prop.paracompact-partition-unity',
      usedBy: 'thm.smooth-partition-unity',
      note: '流形仿紧，所以局部有限的加细存在（这是连续版给的一半）；光滑版只是把每个成员上的权重换成鼓包函数再归一化。'
    },
    {
      id: 'dep.mf-secondcountable-smooth-pu',
      kind: 'definition',
      definition: 'def.second-countable',
      usedBy: 'thm.smooth-partition-unity',
      note: '仿紧是从「第二可数 $+$ Hausdorff $+$ 局部欧氏」推出来的；没有第二可数就取不到局部有限加细，鼓包函数也就拼不成整体。长直线是反例。'
    },
    {
      id: 'dep.mf-bundlemetric-pu',
      kind: 'definition',
      definition: 'thm.smooth-partition-unity',
      usedBy: 'prop.bundle-metric',
      note: '证明是把局部标准内积做凸组合，权重恰是这个光滑单位分解；正定性靠「权重非负且和为 $1$」。'
    },
    {
      id: 'dep.mf-det-orientable',
      kind: 'definition',
      definition: 'def.determinant',
      usedBy: 'def.orientable-manifold',
      note: '定向的判据是转移映射 Jacobi 行列式的**符号**，而「同号」这件事只有行列式能说 —— 一般矩阵没有可比的正负。'
    },
    {
      id: 'dep.mf-orientable-form',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'def.volume-form',
      note: '体积形式是 $n$-形式且处处非零 —— 「$n$-形式」与「处处非零」两个条件都建立在微分形式的定义上。'
    },
    {
      id: 'dep.mf-riemannian-volume',
      kind: 'definition',
      definition: 'def.riemannian-metric',
      usedBy: 'def.volume-form',
      note: '系数 $\\sqrt{\\det(g_{ij})}$ 完全来自度量；没有 $g$ 就只剩「处处非零的 $n$-形式」，写不出体积。'
    },
    {
      id: 'dep.mf-orientable-volform-equiv',
      kind: 'definition',
      definition: 'def.orientable-manifold',
      usedBy: 'prop.volume-form-orientation',
      note: '命题的主语就是「可定向」，它给的是不靠图册的等价判据；「同一个定向」那半句还要用到极大定向图册。'
    },
    {
      id: 'dep.mf-extd-derham',
      kind: 'definition',
      definition: 'def.exterior-derivative',
      usedBy: 'def.de-rham-complex',
      note: '复形就是 $\\mathrm{d}$ 排成的链，$\\mathrm{d}^{2} = 0$ 是「$\\operatorname{im} \\subseteq \\ker$」的唯一来源 —— 没有它商空间无从定义。'
    },
    {
      id: 'dep.mf-form-derham',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'def.de-rham-complex',
      note: '链的每一项都是 $k$-形式的空间 $\\Omega^{k}(M)$；闭与恰当这两个词也是形式论里的词（`def.exterior-derivative`）。'
    },
    {
      id: 'dep.mf-pullback-derham',
      kind: 'definition',
      definition: 'prop.pullback-forms',
      usedBy: 'def.de-rham-complex',
      note: '「$H^{k}$ 是函子」全靠拉回与 $\\mathrm{d}$ 交换（$F^{\\ast}\\mathrm{d} = \\mathrm{d}F^{\\ast}$）；否则拉回只能作用在形式上、下不到商空间。'
    },
    {
      id: 'dep.mf-connected-h0',
      kind: 'definition',
      definition: 'def.connected',
      usedBy: 'thm.de-rham-h0',
      note: '结论里的 $c$ 是连通分支个数，「分支」这件事正是连通性的语言；$M$ 连通 $\\iff \\dim H^{0} = 1$ 也是连通性的判据。'
    },
    {
      id: 'dep.mf-group-liegroup',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.lie-group',
      note: 'Lie 群首先是群：结合律、单位元、取逆都来自群结构；光滑结构只是额外的一层。'
    },
    {
      id: 'dep.mf-smoothmanifold-liegroup',
      kind: 'definition',
      definition: 'def.smooth-manifold',
      usedBy: 'def.lie-group',
      note: '「乘法与取逆光滑」这句话要先把 $G \\times G$ 与 $G$ 都看成光滑流形，故 Lie 群的定义依赖流形的定义。'
    },
    {
      id: 'dep.mf-ift-liegroup',
      kind: 'definition',
      definition: 'thm.implicit-function',
      usedBy: 'def.lie-group',
      note: '$\\operatorname{SL}$、$\\operatorname{O}$、$\\operatorname{U}$ 这些经典群是方程切出来的子流形 —— 造法是隐函数定理，群结构只是额外的礼物。'
    },
    {
      id: 'dep.mf-bracket-liealgebra',
      kind: 'definition',
      definition: 'def.lie-bracket',
      usedBy: 'def.lie-algebra',
      note: '反称与 Jacobi 两条公理就是向量场括号满足的性质；Lie 代数可以看成对这两条的抽象，例子一栏里写的就是 $\\mathfrak{gl}(n,\\mathbb{R})$ 的交换子。'
    },
    {
      id: 'dep.mf-liegroup-leftinv',
      kind: 'definition',
      definition: 'def.lie-group',
      usedBy: 'prop.left-invariant-fields',
      note: '左不变性是用左平移 $L_{g}$ 写的；$L_{g}$ 光滑（因而 $\\mathrm{d}(L_{g})$ 有意义）正是 Lie 群定义的一部分。'
    },
    {
      id: 'dep.mf-bracket-leftinv',
      kind: 'definition',
      definition: 'def.lie-bracket',
      usedBy: 'prop.left-invariant-fields',
      note: '括号落在左不变向量场里这一步，用的是向量场括号的自然性 —— 也就是 `def.lie-bracket` 定义的直接推论。'
    },
    {
      id: 'dep.mf-tangent-leftinv',
      kind: 'definition',
      definition: 'def.tangent-space-manifold',
      usedBy: 'prop.left-invariant-fields',
      note: '$\\mathfrak{g} := T_{e}G$ —— Lie 代数的载体就是单位元处的切空间，「左不变向量场与它同构」正是命题的第 1 条。'
    },

    /* ============================================================
       推导（黑线，证明写在边上）
       ============================================================ */

    {
      id: 'imp.mf-maximal-atlas',
      kind: 'implication',
      sources: ['def.manifold-chart'],
      target: 'prop.maximal-atlas',
      title: '相容性传递 $\\implies$ 极大图册存在且唯一',
      proof: [
        '把「与 $\\mathcal{A}$ 中每张卡都 $C^{\\infty}$-相容的卡」全部收进来，得到 $\\mathcal{A}^{+}$。逐条验证。',
        '',
        '**(1) 相容（传递性）。** 取 $(V,\\psi), (W,\\theta) \\in \\mathcal{A}^{+}$，要证 $\\theta \\circ \\psi^{-1}$ 光滑。在 $V \\cap W$ 上任取 $p$，由 $\\mathcal{A}$ 覆盖 $M$ 取含 $p$ 的一张卡 $(U,\\varphi) \\in \\mathcal{A}$。在 $\\varphi(U \\cap V \\cap W)$ 上',
        '',
        '$$\\theta \\circ \\psi^{-1} = (\\theta \\circ \\varphi^{-1}) \\circ (\\varphi \\circ \\psi^{-1}),$$',
        '',
        '右边两个因子都是 $\\mathbb{R}^{n}$ 开集之间的 $C^{\\infty}$ 映射（这正是「与 $\\varphi$ 相容」的意思），故复合光滑。$p$ 任意，得该转移映射处处光滑 —— 这就是相容性的传递性。',
        '',
        '**(2) 包含与覆盖。** $(V,\\psi) \\in \\mathcal{A}$ 时它与 $\\mathcal{A}$ 中每张卡相容（$\\mathcal{A}$ 本身相容），故 $\\mathcal{A} \\subseteq \\mathcal{A}^{+}$；$\\mathcal{A}^{+}$ 覆盖 $M$ 因为它含覆盖的 $\\mathcal{A}$。由 (1) 它是图册。',
        '',
        '**(3) 极大。** 设 $\\mathcal{B} \\supseteq \\mathcal{A}^{+}$ 是图册，取 $(V,\\theta) \\in \\mathcal{B}$。由 $\\mathcal{A} \\subseteq \\mathcal{A}^{+} \\subseteq \\mathcal{B}$ 与 $\\mathcal{B}$ 内两两相容，$(V,\\theta)$ 与 $\\mathcal{A}$ 中每张卡相容，故 $(V,\\theta) \\in \\mathcal{A}^{+}$。于是 $\\mathcal{B} = \\mathcal{A}^{+}$。',
        '',
        '**(4) 唯一。** 若 $\\mathcal{A}_{1}^{+}, \\mathcal{A}_{2}^{+}$ 都是包含 $\\mathcal{A}$ 的极大图册，对 $\\mathcal{A}_{1}^{+}$ 用一次 (3) 得 $\\mathcal{A}_{2}^{+} \\subseteq \\mathcal{A}_{1}^{+}$、对 $\\mathcal{A}_{2}^{+}$ 用一次得反向包含，故两者相等。∎',
        '',
        '⭐ 全程只用了一次「光滑映射的复合仍光滑」。光滑结构的**存在性**没有深层内容；难的是「同一个拓扑空间上能有几个光滑结构」，那属于 Milnor 那类结果，与本条无关。'
      ].join('\n')
    },

    {
      id: 'imp.mf-diff-well-defined',
      kind: 'implication',
      sources: ['def.manifold-chart', 'def.tangent-space-manifold'],
      target: 'def.differential-map',
      title: '换卡只乘 Jacobi 矩阵 $\\implies$ 切映射良定义',
      proof: [
        '设 $\\gamma_{1}, \\gamma_{2}$ 是过 $p$ 的两条曲线且在卡 $(U,\\varphi)$ 里相切，即 $(\\varphi \\circ \\gamma_{1})^{\\prime}(0) = (\\varphi \\circ \\gamma_{2})^{\\prime}(0)$。要证 $F \\circ \\gamma_{1}$ 与 $F \\circ \\gamma_{2}$ 在 $F(p)$ 处相切。',
        '',
        '**第一步：结论与卡无关。** 在另一张卡 $(U_{1},\\varphi_{1})$ 里',
        '',
        '$$(\\varphi_{1} \\circ \\gamma_{i})^{\\prime}(0) = \\mathrm{d}(\\varphi_{1} \\circ \\varphi^{-1})_{\\varphi(p)}\\bigl((\\varphi \\circ \\gamma_{i})^{\\prime}(0)\\bigr),$$',
        '',
        '同一个线性映射作用在同一个向量上，故两个结果仍相等。于是 $[\\gamma]$ 与卡无关 —— 这正是 `def.tangent-space-manifold` 的切向量有定义的原因，这里只是复核一遍。',
        '',
        '**第二步：像也相切。** 取 $M$ 的卡 $(V,\\psi)$ 使 $F(p) \\in V$。把局部表示记作 $G := \\psi \\circ F \\circ \\varphi^{-1}$（光滑，定义在 $\\varphi(p)$ 附近）。则',
        '',
        '$$(\\psi \\circ F \\circ \\gamma_{i})^{\\prime}(0) = \\mathrm{d}G_{\\varphi(p)}\\bigl((\\varphi \\circ \\gamma_{i})^{\\prime}(0)\\bigr),$$',
        '',
        '两个速度相同、$\\mathrm{d}G$ 同一个线性映射，故像的速度相同。即 $F \\circ \\gamma_{1}$ 与 $F \\circ \\gamma_{2}$ 在 $F(p)$ 处相切。',
        '',
        '**第三步：线性。** 取 $\\gamma$ 使 $(\\varphi \\circ \\gamma)^{\\prime}(0) = v$，则 $(\\varphi \\circ \\gamma_{a})^{\\prime}(0) = av$（重参数化 $t \\mapsto at$），于是 $\\mathrm{d}F_{p}(a[\\gamma]) = a\\,\\mathrm{d}F_{p}([\\gamma])$；加法同理（用 $\\mathbb{R}^{n}$ 卡里向量相加的曲线）。故 $\\mathrm{d}F_{p}$ 是线性映射。∎',
        '',
        '⭐ 两处「与卡无关」是同一段链式法则：切向量这边一次、切映射那边一次。光滑流形的全部线性代数都建立在这一段计算上。'
      ].join('\n')
    },

    {
      id: 'imp.mf-diff-chain-rule',
      kind: 'implication',
      sources: ['def.smooth-map', 'def.jacobian'],
      target: 'def.differential-map',
      title: '光滑 $\\implies$ 切映射的矩阵是 Jacobi 矩阵且满足链式法则',
      proof: [
        '**矩阵形状。** 取卡 $(U,\\varphi)$（$N$ 的）与 $(V,\\psi)$（$M$ 的），记 $G := \\psi \\circ F \\circ \\varphi^{-1}$，$y = \\varphi(p)$。坐标基下 $\\mathrm{d}F_{p}(\\partial_{j})$ 的分量由「第 $i$ 个坐标函数的方向导数」给出：',
        '',
        '$$\\mathrm{d}x^{i}\\bigl(\\mathrm{d}F_{p}(\\partial_{j})\\bigr) = \\partial_{j}\\bigl(G^{i}\\bigr)(y),$$',
        '',
        '右边正是 Jacobi 矩阵的 $(i,j)$ 元。所以矩阵就是 $\\bigl(\\partial G^{i}/\\partial y^{j}\\bigr)$，与 `def.jacobian` 逐字相同。这一步顺带说明：只要 $F$ 的光滑性成立，矩阵就存在（一阶偏导连续则 $F$ 可微）。',
        '',
        '**链式法则。** 设 $F : N \\to M$、$G : M \\to P$ 光滑，$p \\in N$。对任意曲线 $\\gamma$ 过 $p$，由定义',
        '',
        '$$\\mathrm{d}(G \\circ F)_{p}([\\gamma]) = [(G \\circ F) \\circ \\gamma] = [G \\circ (F \\circ \\gamma)] = \\mathrm{d}G_{F(p)}\\bigl([F \\circ \\gamma]\\bigr) = \\mathrm{d}G_{F(p)}\\bigl(\\mathrm{d}F_{p}([\\gamma])\\bigr).$$',
        '',
        '$[\\gamma]$ 张成 $T_{p}N$，故 $\\mathrm{d}(G \\circ F)_{p} = \\mathrm{d}G_{F(p)} \\circ \\mathrm{d}F_{p}$。同一句话在卡里就是 Jacobi 矩阵相乘，也就是多元链式法则。',
        '',
        '**恒等。** $\\mathrm{d}(\\operatorname{id}_{N})_{p}([\\gamma]) = [\\operatorname{id}_{N} \\circ \\gamma] = [\\gamma]$，故 $\\mathrm{d}(\\operatorname{id}_{N})_{p} = \\operatorname{id}_{T_{p}N}$。',
        '',
        '**切丛层面。** 由上面的矩阵形状，$\\mathrm{d}F$ 在卡里是 $(x,\\xi) \\mapsto (F(x),\\partial F(x)\\,\\xi)$，对 $(x,\\xi)$ 光滑。∎'
      ].join('\n')
    },

    {
      id: 'imp.mf-tangent-bundle-smooth',
      kind: 'implication',
      sources: ['def.manifold-chart', 'def.tangent-space-manifold'],
      target: 'def.tangent-bundle',
      title: '转移映射的微分光滑 $\\implies$ 切丛是 $2n$ 维流形',
      proof: [
        '**造卡。** 对 $M$ 的图册里每张 $(U_{\\alpha},\\varphi_{\\alpha})$，令 $\\Phi_{\\alpha}(v) := \\bigl(\\varphi_{\\alpha}(\\pi(v)), \\mathrm{d}(\\varphi_{\\alpha})_{\\pi(v)}(v)\\bigr)$。$\\Phi_{\\alpha}$ 是双射（纤维上 $\\mathrm{d}(\\varphi_{\\alpha})_{p} : T_{p}M \\to \\mathbb{R}^{n}$ 是线性同构），像集是 $\\varphi_{\\alpha}(U_{\\alpha}) \\times \\mathbb{R}^{n}$（开）。',
        '',
        '**转移映射。** 在 $\\pi^{-1}(U_{\\alpha} \\cap U_{\\beta})$ 上，从 $\\Phi_{\\alpha}$ 换到 $\\Phi_{\\beta}$：',
        '',
        '$$\\Phi_{\\beta} \\circ \\Phi_{\\alpha}^{-1}(x,\\xi) = \\bigl(\\psi\\varphi^{-1}(x),\\ \\mathrm{d}(\\psi\\varphi^{-1})_{x}(\\xi)\\bigr),$$',
        '',
        '其中 $\\varphi = \\varphi_{\\alpha}$、$\\psi = \\varphi_{\\beta}$。理由：$\\mathrm{d}(\\psi)_{p} = \\mathrm{d}(\\psi\\varphi^{-1})_{\\varphi(p)} \\circ \\mathrm{d}(\\varphi)_{p}$（链式法则），而 $\\xi = \\mathrm{d}(\\varphi)_{p}(v)$，于是 $\\mathrm{d}(\\psi)_{p}(v) = \\mathrm{d}(\\psi\\varphi^{-1})_{x}(\\xi)$。',
        '',
        '**光滑。** 第一分量 $\\psi\\varphi^{-1}$ 光滑（图册相容）；第二分量是「光滑矩阵值函数 $\\mathrm{d}(\\psi\\varphi^{-1})$ 与 $\\xi$ 的乘积」，在 $(x,\\xi)$ 上光滑。故转移映射 $C^{\\infty}$，且它的逆（交换 $\\alpha,\\beta$）也 $C^{\\infty}$。',
        '',
        '**拓扑条件。** $\\pi : TM \\to M$ 的纤维是 $\\mathbb{R}^{n}$，$TM$ 第二可数（可数多个 $\\pi^{-1}(U_{\\alpha})$ 覆盖）且 Hausdorff（起点不同可用 $M$ 的分离性分开，起点相同则纤维内用 $\\mathbb{R}^{n}$ 的分离性）。于是这些卡构成 $2n$ 维图册，$TM$ 是光滑流形。',
        '',
        '**零截面。** 在卡里 $p \\mapsto (\\varphi(p), 0)$，光滑。∎'
      ].join('\n')
    },

    {
      id: 'imp.mf-bracket-properties',
      kind: 'implication',
      sources: ['def.vector-field'],
      target: 'def.lie-bracket',
      title: '二阶偏导可交换 $\\implies$ 括号是向量场且满足四条性质',
      proof: [
        '**括号是向量场。** 在卡里，$X = \\sum_{j}X^{j}\\partial_{j}$、$Y = \\sum_{i}Y^{i}\\partial_{i}$，于是',
        '',
        '$$[X,Y]f = \\sum_{i,j}\\Bigl(X^{j}\\partial_{j}\\bigl(Y^{i}\\partial_{i}f\\bigr) - Y^{i}\\partial_{i}\\bigl(X^{j}\\partial_{j}f\\bigr)\\Bigr).$$',
        '',
        '展开出四项，其中两项是 $X^{j}Y^{i}\\,\\partial_{j}\\partial_{i}f$ 与 $-Y^{i}X^{j}\\,\\partial_{i}\\partial_{j}f$。由于二阶偏导可交换，这两项逐项抵消，剩下',
        '',
        '$$[X,Y]f = \\sum_{i}\\Bigl(\\sum_{j}\\bigl(X^{j}\\partial_{j}Y^{i} - Y^{j}\\partial_{j}X^{i}\\bigr)\\Bigr)\\partial_{i}f ,$$',
        '',
        '系数光滑、只含 $f$ 的一阶导，故 $[X,Y]$ 是光滑向量场，且上式就是它的坐标表达式。',
        '',
        '**(1) 反称。** $[X,Y]f = X(Yf) - Y(Xf) = -\\bigl(Y(Xf) - X(Yf)\\bigr) = -[Y,X]f$，两边对一切 $f$ 相等即得。$[X,X] = 0$ 是特例。',
        '',
        '**(2) 双线性。** 每一项都线性，直接读定义。',
        '',
        '**(3) Jacobi。** 六项按 $X,Y,Z$ 排队，每个形如 $X(Y(Zf))$ 的二阶项出现两次、符号相反；三阶项 $XYZf$ 出现六次、符号 $+-+-+-$ 恰好抵消。所以和为零。',
        '',
        '**(4) Leibniz。** $[X,fY]g = X(fYg) - fY(Xg) = (Xf)(Yg) + fX(Yg) - fY(Xg) = (Xf)(Yg) + f[X,Y]g$，即 $[X,fY] = (Xf)Y + f[X,Y]$。再对第一个变元用反称得 $[fX,gY] = fg[X,Y] + f(Xg)Y - g(Yf)X$。∎',
        '',
        '⭐ 全部证明只用了一条：二阶偏导可交换。所以 Lie 括号的存在性是「$\\mathbb{R}^{n}$ 的微积分是交换的」这一事实的几何痕迹。'
      ].join('\n')
    },

    {
      id: 'imp.mf-bracket-liealgebra',
      kind: 'implication',
      sources: ['def.lie-bracket'],
      target: 'def.lie-algebra',
      title: '反称 $+$ Jacobi $\\implies$ 向量场的括号是一个 Lie 代数',
      proof: [
        '取 $\\mathfrak{g} := \\mathfrak{X}(M)$（作为实向量空间），括号取 $[\\cdot,\\cdot]$。逐条核对 `def.lie-algebra` 的公理：',
        '',
        ['- **是实向量空间**：向量场逐点相加、乘实数仍是向量场；',
         '- **双线性**：来自 $[X,Y]f = X(Yf) - Y(Xf)$ 对两个变元的线性；',
         '- **反称**：$[X,Y] = -[Y,X]$；',
         '- **Jacobi**：$[X,[Y,Z]] + [Y,[Z,X]] + [Z,[X,Y]] = 0$。'].join('\n'),
        '',
        '四条都已在上一条边（`imp.mf-bracket-properties`）里逐项验过，这里只是把它们打包成「$(\\mathfrak{X}(M),[\\cdot,\\cdot])$ 是 Lie 代数」这一句话。',
        '',
        '**这个例子的地位**：它是 Lie 代数的**原型** —— 抽象定义里的两条公理就是从这里抄下来的。所以「Lie 代数」不是新发明的代数结构，而是把向量场括号的性质抄成一页纸。',
        '',
        '**一条容易忽略的差别**：$\\mathfrak{X}(M)$ 是 $C^{\\infty}(M)$-模，而 $[\\cdot,\\cdot]$ **不是** $C^{\\infty}(M)$-双线性的（第 4 条里那个 $(Xf)Y$ 项）。所以「$C^{\\infty}(M)$-模 + Lie 括号」是一份比「Lie 代数」更丰富的结构；把它公理化就是 Lie 代数胚，本图不展开。∎'
      ].join('\n')
    },

    {
      id: 'imp.mf-tensor-field-smooth',
      kind: 'implication',
      sources: ['def.vector-field', 'def.exterior-algebra'],
      target: 'def.tensor-field',
      title: '张量积与外幂 $\\implies$ 张量场是多重线性场的统一外壳',
      proof: [
        '**先把逐点的事说清。** 对固定 $p$，$T^{(r,s)}_{p}M = \\bigl(T_{p}M\\bigr)^{\\otimes r} \\otimes \\bigl(T_{p}^{\\ast}M\\bigr)^{\\otimes s}$，而「吃了 $r$ 个余向量与 $s$ 个向量吐一个数」的全体与它自然同构（张量积的泛性质）。维数 $n^{r+s}$。',
        '',
        '**三种特例对齐。**',
        '',
        ['- $r = 0, s = 1$：$T_{p}^{\\ast}M$ 的元素就是余向量，光滑截面即 $1$-形式；',
         '- $r = 1, s = 0$：$T_{p}M$ 的元素就是切向量，光滑截面即向量场（`def.vector-field`）；',
         '- $r = 0, s = k$ 且对调任两变元变号：就是交错 $k$-线性型，光滑截面即 $k$-形式 —— 这正是 `def.exterior-algebra` 里每点取的 $\\bigwedge^{k}$（`def.alternating-form`）。'].join('\n'),
        '',
        '**丛的构造。** $T^{(r,s)}M := \\bigsqcup_{p} T^{(r,s)}_{p}M$ 带投影 $\\pi$。取卡 $(U,\\varphi)$，令',
        '',
        '$$\\Phi(T) := \\bigl(\\varphi(p),\\ (T^{i_{1}\\cdots i_{r}}_{\\ \\ j_{1}\\cdots j_{s}})\\bigr),$$',
        '',
        '即「起点」加「全部分量」。转移映射的作用是 $(x,\\xi) \\mapsto \\bigl(\\psi\\varphi^{-1}(x),\\ J_{r,s}(x)\\,\\xi\\bigr)$，其中 $J_{r,s}$ 是 Jacobi 矩阵的 $r$ 次逆直积与 $s$ 次直积（对称群置换指标带来的重排只是固定的线性重编号）。$J_{r,s}$ 光滑，故与切丛（`imp.mf-tangent-bundle-smooth`）同一套论证给出光滑结构。',
        '',
        '**光滑截面就是分量光滑。** 由 $\\Phi$ 的定义，截面 $T$ 光滑当且仅当每个分量函数 $T^{i_{1}\\cdots i_{r}}_{\\ \\ j_{1}\\cdots j_{s}}$ 在卡上光滑；「只需查一个图册」与向量场情形逐字相同。∎',
        '',
        '⭐ 于是「张量场」不是新对象，而是把函数 / 向量场 / 形式 / 度量 / 曲率放进同一个纤维里数指标的框架。'
      ].join('\n')
    },

    {
      id: 'imp.mf-smooth-partition-unity',
      kind: 'implication',
      sources: ['prop.paracompact-partition-unity', 'def.partition-of-unity'],
      target: 'thm.smooth-partition-unity',
      title: '鼓包函数 $+$ 局部有限加细 $\\implies$ 光滑单位分解',
      proof: [
        '**第一步：造鼓包函数。** 令',
        '',
        '$$b(t) := \\begin{cases} e^{-1/t}, & t > 0,\\\\ 0, & t \\le 0,\\end{cases}\\qquad \\beta(x) := \\frac{b(1 - \\lVert x\\rVert^{2})}{b(1 - \\lVert x\\rVert^{2}) + b(\\lVert x\\rVert^{2} - \\tfrac{1}{4})}.$$',
        '',
        '$b$ 在 $t = 0$ 处各阶导数都是 $0$（$e^{-1/t}$ 比任何多项式趋零还快），故 $b$ 光滑；分母恒正，故 $\\beta$ 光滑，且 $\\beta \\equiv 1$ 在 $\\lVert x\\rVert \\le \\tfrac{1}{2}$ 上、$\\beta \\equiv 0$ 在 $\\lVert x\\rVert \\ge 1$ 外。',
        '',
        '**第二步：局部有限加细。** 流形的第二可数性 + Hausdorff + 局部欧氏给出仿紧；连续版的命题（`prop.paracompact-partition-unity`）给一个局部有限的开加细 $\\{V_{\\alpha}\\}$，每块可设 $\\overline{V_{\\alpha}}$ 紧且落在某张卡 $U_{\\alpha}$ 里（先取卡内的球、再由局部有限性收紧）。',
        '',
        '**第三步：在每块上放鼓包。** 取 $p_{\\alpha} \\in V_{\\alpha}$ 与 $\\varepsilon_{\\alpha} > 0$ 使 $V_{\\alpha}$ 在卡像里含半径 $2\\varepsilon_{\\alpha}$ 的球、且球的闭包落在 $\\varphi_{\\alpha}(U_{\\alpha})$ 内。令 $\\psi_{\\alpha} := \\beta\\bigl((\\cdot - \\varphi_{\\alpha}(p_{\\alpha}))/\\varepsilon_{\\alpha}\\bigr) \\circ \\varphi_{\\alpha}$，则',
        '',
        '$$\\psi_{\\alpha} \\in C^{\\infty}(M),\\qquad \\psi_{\\alpha} = 1\\ \\text{on}\\ V_{\\alpha},\\qquad \\operatorname{supp}\\psi_{\\alpha} \\subseteq U_{\\alpha} .$$',
        '',
        '**第四步：归一化。** 由 $\\{V_{\\alpha}\\}$ 覆盖 $M$，每点至少有一个 $\\psi_{\\alpha} = 1$，故 $\\Psi := \\sum_{\\alpha}\\psi_{\\alpha} > 0$ 处处成立。和为局部有限（支撑族局部有限），故 $\\Psi$ 光滑。令',
        '',
        '$$\\rho_{\\alpha} := \\frac{\\psi_{\\alpha}}{\\Psi}.$$',
        '',
        '则 $\\rho_{\\alpha} \\in C^{\\infty}(M)$、$0 \\le \\rho_{\\alpha} \\le 1$、$\\operatorname{supp}\\rho_{\\alpha} \\subseteq U_{\\alpha}$、且 $\\sum_{\\alpha}\\rho_{\\alpha} = 1$ 处处成立 —— 三条要求全齐。∎',
        '',
        '⭐ 复用的两件东西是「$\\mathbb{R}^{n}$ 上的鼓包」与「仿紧给的局部有限加细」。所以流形上一切「局部造 + 整体粘」的论证都是这张图：局部造出想要的，再用 $\\rho_{\\alpha}$ 加权求和。'
      ].join('\n')
    },

    {
      id: 'imp.mf-volume-form-orientation',
      kind: 'implication',
      sources: ['def.orientable-manifold', 'def.differential-form'],
      target: 'prop.volume-form-orientation',
      title: 'Jacobi 行列式同号 $\\iff$ 处处非零的最高次形式',
      proof: [
        '**（$\\implies$）有定向就有体积形式。** 取定向图册 $\\{(U_{\\alpha},\\varphi_{\\alpha})\\}$ 与从属于它的光滑单位分解 $\\{\\rho_{\\alpha}\\}$（`thm.smooth-partition-unity`，先加细成局部有限）。令',
        '',
        '$$\\omega := \\sum_{\\alpha}\\rho_{\\alpha}\\,\\varphi_{\\alpha}^{\\ast}\\bigl(\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}\\bigr),$$',
        '',
        '其中 $\\rho_{\\alpha}$ 在指标集外面延拓为 $0$。每一项在 $p$ 处都 $\\ge 0$ 倍的「正体积形式」：因为定向图册里任意两张卡的转移 Jacobi 行列式 $> 0$，所以同一张卡上两张卡给的正体积形式只差一个**正**的系数。于是局部只有有限项非零、且没有异号项，$\\omega_{p}$ 是若干非负倍数之和，而至少有一项系数 $\\rho_{\\alpha}(p) > 0$（和为 $1$）且那项在局部坐标下系数为正 —— 故 $\\omega_{p} \\ne 0$。',
        '',
        '**（$\\Longleftarrow$）有体积形式就有定向。** 设 $\\omega$ 处处非零。覆盖 $M$ 的每张卡 $(U_{\\alpha},\\varphi_{\\alpha})$ 上，$\\omega\\big|_{U_{\\alpha}} = f_{\\alpha}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$ 且 $f_{\\alpha}$ 处处非零。把 $f_{\\alpha} < 0$ 的那些卡换成 $(U_{\\alpha}, \\sigma \\circ \\varphi_{\\alpha})$，其中 $\\sigma$ 是交换前两个坐标的换位（它把 $\\mathrm{d}x^{1}\\wedge\\cdots$ 变号）。这族卡仍覆盖 $M$、仍两两相容（只差一个固定微分同胚），而新坐标系下系数全为正。于是任意两张卡的转移映射满足',
        '',
        '$$\\omega = f_{\\beta}\\,\\mathrm{d}y^{\\beta} = f_{\\alpha}\\,\\det\\Bigl(\\frac{\\partial y}{\\partial x}\\Bigr)\\,\\mathrm{d}x^{\\alpha},\\qquad f_{\\alpha}, f_{\\beta} > 0 ,$$',
        '',
        '故 $\\det(\\partial y/\\partial x) > 0$ —— 这是定向图册。',
        '',
        '**「同一个定向」的判据。** 处处非零的 $\\omega_{1}, \\omega$ 满足 $\\omega_{1} = f\\omega$，$f$ 处处非零。逐点看体积形式的符号：$f > 0$ 时两者在每张卡上给出同一个正方向，故同一定向；$f$ 在某点 $< 0$ 则两族卡在该点的换序不同，定向相反。连通性只在「$f$ 不能变号」这一步用到（$f$ 连续且无零点）。∎'
      ].join('\n')
    },

    {
      id: 'imp.mf-h0',
      kind: 'implication',
      sources: ['def.de-rham-complex', 'def.connected'],
      target: 'thm.de-rham-h0',
      title: '局部常函数在分支上常值 $\\implies$ 零次上同调是分支数',
      proof: [
        '**$Z^{0}$ 就是局部常函数。** $\\omega \\in \\Omega^{0}(M)$ 是光滑函数 $f$，$\\mathrm{d}f = \\sum_{i}\\partial_{i}f\\,\\mathrm{d}x^{i}$，故 $\\mathrm{d}f = 0$ 当且仅当每张卡上所有偏导为零，即 $f$ 在每张连通卡上常值。',
        '',
        '**局部常 $\\iff$ 分支上常值。** 设 $f$ 局部常。固定连通分支 $C$，取 $p \\in C$。集合 $A := \\{q \\in C : f(q) = f(p)\\}$ 与 $B := \\{q \\in C : f(q) \\ne f(p)\\}$ 都开（局部常 + 连续性），且 $A \\cup B = C$、$A \\ne \\emptyset$、$A \\cap B = \\emptyset$。由 $C$ 连通得 $B = \\emptyset$，故 $f$ 在 $C$ 上常值。反向显然。',
        '',
        '**$B^{0} = 0$。** 没有 $-1$-形式，$\\operatorname{im}\\bigl(\\mathrm{d} : \\Omega^{-1} \\to \\Omega^{0}\\bigr) = 0$。于是 $H^{0} = Z^{0}/B^{0} = Z^{0}$。',
        '',
        '**维数。** 设分支为 $\\{C_{\\lambda}\\}_{\\lambda \\in \\Lambda}$（$|\\Lambda| = c$）。每个局部常函数对应一族常数 $(a_{\\lambda})$，反之给定 $(a_{\\lambda})$ 令 $f\\big|_{C_{\\lambda}} \\equiv a_{\\lambda}$ 即得局部常函数（每个分支在 $M$ 里既开又闭，故 $f$ 光滑）。所以 $Z^{0} \\cong \\mathbb{R}^{\\Lambda}$，维数 $c$。',
        '',
        '**连通情形。** $c = 1$ 时 $H^{0} \\cong \\mathbb{R}$，维数 $1$；$c > 1$ 时维数大于 $1$。故 $M$ 连通当且仅当 $\\dim H^{0} = 1$（$M \\ne \\emptyset$ 保证至少 $1$ 维）。∎'
      ].join('\n')
    },

    {
      id: 'imp.mf-poincare',
      kind: 'implication',
      sources: ['def.de-rham-complex', 'def.exterior-derivative'],
      target: 'lem.poincare-lemma',
      title: '链同伦 $\\mathrm{d}K + K\\mathrm{d} = \\operatorname{id}$ $\\implies$ 闭形式恰当',
      proof: [
        '**收缩映射。** 取 $H : U \\times [0,1] \\to U$、$H(x,t) := tx$（星形保证它落在 $U$ 里）。记 $i_{t} : U \\to U \\times [0,1]$、$i_{t}(x) := (x,t)$。',
        '',
        '**链同伦算子。** 定义 $K : \\Omega^{k}(U) \\to \\Omega^{k-1}(U)$ 为沿 $t$ 的「纤维积分」：',
        '',
        '$$K\\omega := \\int_{0}^{1} i_{t}^{\\ast}\\bigl(\\iota_{\\partial_{t}}(H^{\\ast}\\omega)\\bigr)\\,\\mathrm{d}t ,$$',
        '',
        '其中 $\\iota_{\\partial_{t}}$ 是内乘（把 $\\mathrm{d}t$ 那一项喂进去、次数降一）。它把 $(k-1)$-形式系数对 $t$ 积分，故仍是光滑的 $(k-1)$-形式。',
        '',
        '**同伦公式。** 对 $U \\times [0,1]$ 上的形式用「$\\mathrm{d}$ 与内乘的分次 Leibniz 律」，再对 $t$ 积分、用微积分基本定理处理 $\\partial_{t}$ 那一项，得',
        '',
        '$$\\mathrm{d}K\\omega + K\\mathrm{d}\\omega = i_{1}^{\\ast}\\omega - i_{0}^{\\ast}\\omega .$$',
        '',
        '而 $i_{1} = \\operatorname{id}_{U}$（$H(x,1) = x$），$i_{0}$ 是常映射 $x \\mapsto 0$，故 $i_{0}^{\\ast}\\omega = 0$ 只要 $k \\ge 1$（常映射把 $k$-形式拉成 $0$）。于是',
        '',
        '$$\\mathrm{d}K + K\\mathrm{d} = \\operatorname{id}_{\\Omega^{k}(U)}\\qquad (k \\ge 1).$$',
        '',
        '**取 $\\eta$。** 若 $\\mathrm{d}\\omega = 0$，则 $\\omega = \\mathrm{d}K\\omega + K(0) = \\mathrm{d}(K\\omega)$，取 $\\eta := K\\omega \\in \\Omega^{k-1}(U)$ 即得 $\\omega$ 恰当。',
        '',
        '**$k = 0$ 为什么不行。** 此时 $i_{0}^{\\ast}f = f(0)$ 是常数函数而不是 $0$，公式变成 $\\mathrm{d}K f + K\\mathrm{d}f = f - f(0)$，只能得到「$f$ 差一个常数是恰当的」，而 $0$-形式没有 $-1$-形式可恰当 —— 这正是 $H^{0} = \\mathbb{R}$。',
        '',
        '**可缩版本。** 把 $H$ 换成任意的收缩同伦（$H(\\cdot,1) = \\operatorname{id}$、$H(\\cdot,0) = \\text{const}$）逐字重复，故「星形」可放宽为「可缩」。∎'
      ].join('\n')
    },

    {
      id: 'imp.mf-mayer-vietoris',
      kind: 'implication',
      sources: ['def.de-rham-complex'],
      target: 'thm.mayer-vietoris',
      title: '形式的短正合列取上同调 $\\implies$ 长正合列',
      proof: [
        '**短正合列。** 限制映射把 $M$ 上的形式送到 $U$、$V$ 上，差把两块送到重叠处：',
        '',
        '$$0 \\to \\Omega^{k}(M) \\xrightarrow{\\ r\\ } \\Omega^{k}(U) \\oplus \\Omega^{k}(V) \\xrightarrow{\\ s\\ } \\Omega^{k}(U \\cap V) \\to 0 ,$$',
        '',
        '$$r(\\omega) := \\bigl(\\omega\\big|_{U},\\ \\omega\\big|_{V}\\bigr),\\qquad s(\\omega_{U},\\omega_{V}) := \\omega_{U}\\big|_{U \\cap V} - \\omega_{V}\\big|_{U \\cap V} .$$',
        '',
        '**单射。** $r(\\omega) = 0$ 说明 $\\omega$ 在 $U$ 与 $V$ 上都为零，而 $M = U \\cup V$，故 $\\omega = 0$。',
        '',
        '**满射（这是唯一要动手的一步）。** 给定 $\\omega \\in \\Omega^{k}(U \\cap V)$，取从属于 $\\{U, V\\}$ 的光滑单位分解 $\\rho_{U} + \\rho_{V} = 1$（`thm.smooth-partition-unity`）。把 $\\rho_{U}\\omega$ 在 $U\\setminus\\operatorname{supp}\\rho_{V}$ 外延拓为 $0$、并在 $U$ 上整体定义为 $\\rho_{U}\\omega$（它在 $U \\cap V$ 外本来就该是 $\\omega$ 的 $\\rho_{U}$ 倍），同理得 $\\rho_{V}\\omega$ 在 $V$ 上的形式。于是 $s(\\rho_{U}\\omega, -\\rho_{V}\\omega) = (\\rho_{U} + \\rho_{V})\\omega = \\omega$。',
        '',
        '**核等于像。** $s(\\omega_{U},\\omega_{V}) = 0$ 说明两块在重叠处相等，于是它们拼成一个整体形式 $\\omega \\in \\Omega^{k}(M)$，即 $(\\omega_{U},\\omega_{V}) = r(\\omega)$。',
        '',
        '**取上同调。** 每个 $\\Omega^{k}$ 上都有 $\\mathrm{d}$，且 $r, s$ 与 $\\mathrm{d}$ 交换（限制与差都逐点作用，$\\mathrm{d}$ 是逐点公式），故这是链映射构成的短正合列。链复形的短正合列取上同调得到长正合列（蛇引理 + 连接同态 $\\delta$ 的构造），这就是所要的。',
        '',
        '**$\\delta$ 的显式形式。** 沿蛇引理的追踪：取 $[\\omega] \\in H^{k}(U \\cap V)$，按上一步拆成 $(\\omega_{U}, -\\omega_{V})$，在 $M$ 上取它们拼成的 $(k+1)$-形式（差一个 $\\mathrm{d}$ 造成的修正），其类就是 $\\delta[\\omega]$。这一步的符号与 $\\mathrm{d}$ 的次序必须逐项对齐，本图不替读者对齐。∎',
        '',
        '⭐ 唯一用到流形结构的地方是「满射」那一步的单位分解；其余全部是同调代数。所以 Mayer–Vietoris 对任何「层」都成立，形式只是其中一个特例。'
      ].join('\n')
    },

    {
      id: 'imp.mf-left-invariant',
      kind: 'implication',
      sources: ['def.lie-group', 'def.lie-bracket'],
      target: 'prop.left-invariant-fields',
      title: '左不变性 $+$ 括号自然性 $\\implies$ 左不变向量场构成 Lie 代数',
      proof: [
        '**(1) 赋值是同构。** 设 $X$ 左不变。由 $X_{gh} = \\mathrm{d}(L_{g})_{h}(X_{h})$ 取 $h = e$ 得 $X_{g} = \\mathrm{d}(L_{g})_{e}(X_{e})$ —— 于是 $X$ 完全由 $X_{e}$ 决定，$X \\mapsto X_{e}$ 单射。反之给定 $v \\in \\mathfrak{g} := T_{e}G$，令 $X_{g} := \\mathrm{d}(L_{g})_{e}(v)$，则',
        '',
        '$$X_{gh} = \\mathrm{d}(L_{gh})_{e}(v) = \\mathrm{d}\\bigl(L_{g} \\circ L_{h}\\bigr)_{e}(v) = \\mathrm{d}(L_{g})_{h}\\bigl(\\mathrm{d}(L_{h})_{e}(v)\\bigr) = \\mathrm{d}(L_{g})_{h}(X_{h}),$$',
        '',
        '故 $X$ 左不变，$X \\mapsto X_{e}$ 满射。线性显然，故是同构，左不变向量场的空间维数为 $\\dim G$。光滑性：局部用卡写开，$g \\mapsto \\mathrm{d}(L_{g})_{e}(v)$ 是 $g$ 的光滑函数（$L_{g}$ 的局部表示对 $g$ 光滑）。',
        '',
        '**(2) 括号封闭。** 用 Lie 括号的自然性：对微分同胚 $F$ 与向量场 $X, Y$，',
        '',
        '$$\\mathrm{d}F\\bigl([X,Y]_{p}\\bigr) = \\bigl[\\mathrm{d}F(X), \\mathrm{d}F(Y)\\bigr]_{F(p)} .$$',
        '',
        '取 $F = L_{g}$：由 $X, Y$ 左不变得 $\\mathrm{d}(L_{g})X = X$、$\\mathrm{d}(L_{g})Y = Y$，于是',
        '',
        '$$\\mathrm{d}(L_{g})_{h}\\bigl([X,Y]_{h}\\bigr) = \\bigl[\\mathrm{d}(L_{g})X,\\ \\mathrm{d}(L_{g})Y\\bigr]_{gh} = [X,Y]_{gh},$$',
        '',
        '即 $[X,Y]$ 左不变。',
        '',
        '**(3) $\\mathfrak{g}$ 是 Lie 代数。** 由 (1)(2)，$\\mathfrak{g} = T_{e}G$ 上定义 $[v,w] := [\\tilde v,\\tilde w]_{e}$（$\\tilde v$ 是 $v$ 对应的左不变向量场）是有意义的。反称与 Jacobi 由 $\\mathfrak{X}(G)$ 上那条括号继承（`imp.mf-bracket-liealgebra`）；双线性由 $v \\mapsto \\tilde v$ 线性与括号双线性得到。故 $(\\mathfrak{g},[\\cdot,\\cdot])$ 是 Lie 代数。∎',
        '',
        '**自然性怎么来的**（一行）：在卡里 $[X,Y]f = X(Yf) - Y(Xf)$，把 $f$ 换成 $f \\circ F$、用链式法则即得 — 因为 $\\mathrm{d}F$ 把 $X$ 的积分曲线推成 $\\mathrm{d}F(X)$ 的积分曲线。'
      ].join('\n')
    },

    {
      id: 'imp.mf-bundle-metric',
      kind: 'implication',
      sources: ['def.vector-bundle', 'thm.smooth-partition-unity'],
      target: 'prop.bundle-metric',
      title: '局部内积做凸组合 $\\implies$ 每个向量丛都有纤维度量',
      proof: [
        '**局部内积。** 取 $E$ 的局部平凡化 $\\Phi_{\\alpha} : \\pi^{-1}(U_{\\alpha}) \\to U_{\\alpha} \\times \\mathbb{R}^{k}$，$\\alpha \\in A$。对 $p \\in U_{\\alpha}$、$s, t \\in E_{p}$ 令',
        '',
        '$$\\langle s,t\\rangle_{\\alpha} := \\bigl\\langle \\operatorname{pr}_{2}\\Phi_{\\alpha}(s),\\ \\operatorname{pr}_{2}\\Phi_{\\alpha}(t)\\bigr\\rangle_{\\mathbb{R}^{k}} .$$',
        '',
        '这是 $U_{\\alpha}$ 上的纤维内积，且对 $p$ 光滑（$\\Phi_{\\alpha}$ 是微分同胚）。',
        '',
        '**加细成局部有限。** 把 $\\{U_{\\alpha}\\}$ 换成局部有限的开加细（流形仿紧），必要时重编号，仍记 $\\{U_{\\alpha}\\}_{\\alpha \\in A}$；取从属于它的光滑单位分解 $\\{\\rho_{\\alpha}\\}$（`thm.smooth-partition-unity`），在 $A$ 外延拓 $\\rho_{\\alpha} \\equiv 0$。',
        '',
        '**凸组合。** 令',
        '',
        '$$\\langle s,t\\rangle_{p} := \\sum_{\\alpha}\\rho_{\\alpha}(p)\\,\\bigl\\langle s(p), t(p)\\bigr\\rangle_{\\alpha} .$$',
        '',
        '每点附近只有有限项非零，故和有意义且对 $p$ 光滑。逐条验证：',
        '',
        ['- **双线性**：每个 $\\langle\\cdot,\\cdot\\rangle_{\\alpha}$ 双线性、系数为常数（对固定的 $p$），故线性组合双线性；',
         '- **对称**：每项对称；',
         '- **正定**：$\\langle s,s\\rangle_{p} = \\sum_{\\alpha}\\rho_{\\alpha}(p)\\lVert\\cdot\\rVert^{2}_{\\alpha} \\ge 0$；等号成立需每个 $\\rho_{\\alpha}(p) > 0$ 对应的项都为零。因 $\\sum_{\\alpha}\\rho_{\\alpha}(p) = 1$，至少一个 $\\rho_{\\alpha}(p) > 0$，而那一项 $\\lVert s\\rVert_{\\alpha} = 0$ 迫使 $s = 0$。'].join('\n'),
        '',
        '**为什么这条对极性敏感。** 上面只用到两件事：**内积的全体是凸集**（非负权重的加权平均仍是内积），以及**局部总存在**。复结构要求 $J^{2} = -\\operatorname{id}$（不是凸条件）、辛结构要求 $\\omega$ 闭（闭性对凸组合仍保持，但非退化不保持），所以它们不能靠这一招造出来。∎',
        '',
        '⭐ 这条与 `def.riemannian-metric` 的 notes 里那句「每个光滑流形都能配黎曼度量」是同一个证明，只是把 $E$ 从 $TM$ 换成任意丛。'
      ].join('\n')
    }

  ]
});
