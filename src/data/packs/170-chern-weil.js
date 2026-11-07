/* ==========================================================================
   内容包 · 示性类的计算：不变多项式与陈–Weil 同态
   --------------------------------------------------------------------------
   承接上一轮补的 `def.characteristic-class`（示性类的定义与公理）。那一节点只说到
   「示性类是把丛翻译成上同调的自然变换」，**没有说怎么算出来** —— 本包补这台计算装置。

   ⭐ 人名写法（用户 2026-11-03 拍的板，见 CONTRIBUTING.md）：
      中国人一律写汉字（陈省身、陈类、陈–Weil），**中文英文都用汉字**，
      罗马化只在正文首次出现处括注一次。所以本包全用「陈类 / 陈–Weil」，
      不做 `Chern class` 这种英文写法 —— 与库里 `Чебышёв 估计` 同一口径。

   装置顺序（硬顺序）：
     不变多项式 → 联络与曲率（已有 def.connection-form）→ 陈–Weil 同态
     → 陈类（用曲率算）→ 线丛的具体计算 → 分裂原理（把它化到对角情形）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '示性类的计算：不变多项式与陈–Weil 同态',

  nodes: [

    {
      id: 'def.invariant-polynomial',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '不变多项式',
      title: '不变多项式：在共轭下不变的多项式函数',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '不变多项式', '对称多项式', '示性类'],
      statement: [
        '**在做什么**：示性类要用「曲率矩阵的多项式」来算，而曲率换基会变（$F \\mapsto g^{-1}Fg$）。所以必须挑出**在共轭下不变**的那些多项式 —— 它们才是几何量。',
        '',
        '设 $\\mathfrak{g} = \\mathfrak{gl}(k, \\mathbb{K})$（$\\mathbb{K} = \\mathbb{R}$ 或 $\\mathbb{C}$）。一个多项式函数',
        '',
        '$$P : \\mathfrak{gl}(k,\\mathbb{K}) \\longrightarrow \\mathbb{K}$$',
        '（取矩阵元的多项式，且**齐次**：$P(\\lambda A) = \\lambda^{m}P(A)$）叫**不变多项式**，若对一切可逆 $g$ 有',
        '',
        '$$P(g^{-1} A\\, g) = P(A) .$$',
        '',
        '**等价刻画**：$P$ 可写成矩阵 $A$ 的**特征值**的对称多项式。具体地，记 $c_{j}(A)$ 为 $\\det(tI + A) = \\sum_{j} c_{j}(A)\\,t^{k-j}$ 的系数（即初等对称多项式在特征值上的取值），则',
        '',
        '$$P\\ \\text{不变} \\iff P\\ \\text{是}\\ c_{1}, \\ldots, c_{k}\\ \\text{的多项式} .$$',
        '',
        '**两个最常用的**：$P_{1}(A) = \\operatorname{tr} A$（$c_{1}$）与 $P_{k}(A) = \\det A$（$c_{k}$）；中间那些是 $\\operatorname{tr}(A^{j})$ 的组合。'
      ].join('\n'),
      notes: [
        '**为什么“不变”是硬要求**：曲率形式 $F$ 是**取值在 $\\mathfrak{gl}(k)$ 里的 2-形式**，换局部标架时 $F \\mapsto g^{-1}Fg$（逐点共轭，见 `def.connection-form`）。若 $P$ 不变，则 $P(F)$ 是**标架无关**的 $2m$-形式 —— 于是可以对它取 $\\mathrm{d}$、取上同调类。这是整台装置的入口。',
        '**“不变”与“对称”的翻译**：$\\mathfrak{gl}(k,\\mathbb{C})$ 里每个矩阵可上三角化（Jordan），于是 $P$ 由它在对角情形（特征值）的取值决定；共轭不变就等价于「只依赖特征值、且对置换对称」。这就是它与**对称多项式**的桥梁（对称多项式基本定理：齐次对称多项式 = 初等对称多项式的多项式）。',
        '⚠️ **只对可逆 $g$ 要求不变是不够的？** 不 —— 可逆元在 $\\mathfrak{gl}(k)$ 里稠密，多项式连续，所以对可逆 $g$ 成立就自动对一切 $g$ 成立。**别用“$g$ 是 Lie 群元素”这种更强假设**。',
        '⚠️ **实情形要注意符号**：$\\mathbb{K} = \\mathbb{R}$ 时特征值可能复，但 $c_{j}(A)$ 仍是实多项式（它们是对称多项式的实系数组合），所以不碍事。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 不变多项式', 'Bott–Tu, Differential Forms in Algebraic Topology']
    },

    {
      id: 'thm.chern-weil',
      cluster: 'diffgeom.characteristic',
      type: 'theorem',
      label: '陈–Weil 同态',
      title: '陈–Weil 同态：用曲率算出的上同调类与联络无关',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '陈–Weil', '示性类', '曲率', '上同调'],
      statement: [
        '**在做什么**：把「不变多项式」变成「上同调类」，并证明它**不依赖联络的选取** —— 这一步是示性类可计算的根据。',
        '',
        '设 $E \\to B$ 是光滑流形上的秩 $k$ 复向量丛，$P$ 是 $\\mathfrak{gl}(k,\\mathbb{C})$ 上的 $m$ 次不变多项式，$\\nabla$ 是 $E$ 上任意一个联络，$F_{\\nabla} \\in \\Omega^{2}(B; \\operatorname{End}E)$ 是它的曲率。则：',
        '',
        '1. $P(F_{\\nabla})$ 是**闭**的 $2m$-形式（$\\mathrm{d}\\,P(F_{\\nabla}) = 0$）；',
        '2. 它的上同调类',
        '',
        '$$[\\,P(F_{\\nabla})\\,] \\in H^{2m}_{dR}(B; \\mathbb{C})$$',
        '',
        '**与联络无关**：若 $\\nabla_{0}, \\nabla_{1}$ 是两个联络，则 $[P(F_{\\nabla_{0}})] = [P(F_{\\nabla_{1}})]$。',
        '',
        '于是得到**陈–Weil 同态**',
        '',
        '$$w_{P} : \\{E \\to B\\ \\text{上的联络}\\} \\longrightarrow H^{2m}(B), \\qquad \\nabla \\longmapsto [P(F_{\\nabla})],$$',
        '它其实只依赖丛 $E$（不依赖联络），且对拉回自然。'
      ].join('\n'),
      notes: [
        '**两条各用什么**（这是本定理的结构）：',
        '',
        '- **① 闭性**：**只用 Bianchi 恒等式** $\\mathrm{d}F = F \\wedge \\theta - \\theta \\wedge F$（在标架下写出来就是 $\\mathrm{d}F_{\\nabla} = [F_{\\nabla}, \\theta]$），配合 $P$ 的不变性给出 $\\mathrm{d}P(F) = $（对 $P$ 的“不变”求导后的项）$= 0$。**不需要任何整体假设** —— 所以闭性在局部就成立。',
        '- **② 与联络无关**：**这一步才用整体论证**。取两联络之间的道路 $\\nabla_{t} = (1-t)\\nabla_{0} + t\\nabla_{1}$，算出 $\\frac{\\mathrm{d}}{\\mathrm{d}t}P(F_{\\nabla_{t}}) = \\mathrm{d}(\\text{某个}\\ (2m-1)\\text{-形式})$（**同伦公式**，也叫陈–Weil 的“transgression”）。于是两者的差是恰当形式，上同调类相同。⚠️ 这里要对 $t$ 积分 —— 用的是**光滑性 + 基本定理**，不需要紧性。',
        '',
        '⚠️ **“不变多项式”这个假设不能去掉**：若 $P$ 只在共轭下变成别的多项式，$P(F)$ 就不是标架无关的形式，连“形式”都定义不好（$F$ 的矩阵元依赖标架）。所以整台装置的地基是 `def.invariant-polynomial` 的那条不变性。',
        '⚠️ **$H^{2m}(B;\\mathbb{C})$ 里的类可能为 $0$**（例如 $B$ 是可缩的）—— 这不是定理的失败，而是「可缩空间上没有非平凡的示性类」这件事实。这也解释了为什么示性类能用来**区分拓扑**：它量的是 $B$ 的上同调有多不平凡。',
        '⭐ **实向量的情形**：把 $\\mathfrak{gl}(k,\\mathbb{C})$ 换成 $\\mathfrak{o}(k)$（反对称矩阵）时，$\\operatorname{Pfaffian}$ 给出 Euler 类，$\\operatorname{tr}(F^{2j})$ 给出 Pontryagin 类；机制与复情形完全一样，只是不变多项式的代数换成 $\\mathfrak{o}(k)$ 的那套。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 陈–Weil 理论', 'Bott–Tu, Differential Forms in Algebraic Topology']
    },

    {
      id: 'def.chern-class',
      cluster: 'diffgeom.characteristic',
      type: 'theorem',
      label: '陈类',
      title: '陈类：由曲率算出的示性类',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '陈类', '示性类', '曲率'],
      statement: [
        '**在做什么**：把陈–Weil 同态用在**特定的不变多项式**上，得到 $k$ 个类 —— 这是复向量丛最完整的示性类。',
        '',
        '设 $E \\to B$ 是秩 $k$ 复向量丛，$\\nabla$ 是任一联络，$F$ 是曲率。令',
        '',
        '$$\\det\\Bigl(tI + \\frac{i}{2\\pi}F\\Bigr) = \\sum_{j=0}^{k} c_{j}(E)\\, t^{\\,k-j} ,$$',
        '',
        '则系数给出**陈类**（人名按本库约定写汉字；陈省身，Shiing-Shen Chern）',
        '',
        '$$c_{j}(E) := \\Bigl[\\, \\text{上式第}\\ j\\ \\text{个系数} \\,\\Bigr] \\in H^{2j}(B; \\mathbb{Z}) .$$',
        '',
        '**基本性质**：',
        '',
        '1. $c_{0} = 1$；',
        '2. $j > k$ 时 $c_{j} = 0$；',
        '3. **自然性**：$c_{j}(f^{*}E) = f^{*}c_{j}(E)$；',
        '4. **Whitney 乘积公式**：$c(E \\oplus E\') = c(E) \\smile c(E\')$，其中 $c = 1 + c_{1} + \\cdots + c_{k}$；',
        '5. **线丛**：$E$ 是线丛时 $c_{1}(E) = \\bigl[\\frac{i}{2\\pi}\\Omega\\bigr]$，$\\Omega$ 是曲率 2-形式。'
      ].join('\n'),
      notes: [
        '**$\\frac{i}{2\\pi}$ 这个因子是干什么的**：它让类落在**整系数**上同调里（而不是 $\\mathbb{R}$ 系数）。对线丛，$\\frac{i}{2\\pi}\\Omega$ 的积分正是**第一陈数** $\\int_{\\Sigma} c_{1} \\in \\mathbb{Z}$ —— 这个整数性是陈类最有用的性质（也是「陈数」这个名字的来源）。⚠️ 去掉 $\\frac{i}{2\\pi}$，得到的是 $\\mathbb{R}$ 系数的类，仍然闭、仍与联络无关，但不再是整类。',
        '**为什么用 $\\det$ 而不是 $\\operatorname{tr}$**：$\\det(tI + F)$ 展开后的系数是 $F$ 的初等对称函数，而它们生成**全部**不变多项式（`def.invariant-polynomial`）。所以 $c_{1}, \\ldots, c_{k}$ 是最“经济”的一组示性类：其余示性类都是它们的多项式。',
        '⚠️ **$c_{1}$ 的两种口径要分清**：作为**上同调类**它是一个 $H^{2}$ 元素（依赖丛）；作为**陈数**是它在闭合曲面上积分得到的**整数**（依赖丛 + 曲面）。中文里都叫「一陈类 / 第一陈数」，别混。',
        '⚠️ **Whitney 公式不是从曲率直接看出来的**：曲率对直和是分块的，但 $\\det$ 对分块矩阵是乘积 —— 所以公式的**代数根源**在 $\\det(A \\oplus B) = \\det A \\cdot \\det B$。⚠️ 但要注意 $\\smile$ 乘积会改变次数，所以陈述要写成「总陈类」的形式 $c(E\\oplus E\') = c(E)\\smile c(E\')$，逐项展开才是 $c_{j}(E\\oplus E\') = \\sum_{a+b=j} c_{a}(E)\\smile c_{b}(E\')$。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 陈类', 'Bott–Tu, Differential Forms in Algebraic Topology']
    },

    {
      id: 'prop.chern-class-line-bundle',
      cluster: 'diffgeom.characteristic',
      type: 'proposition',
      label: '线丛的陈类计算',
      title: '命题：线丛的陈类就是曲率（差一个 $\\frac{i}{2\\pi}$）',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '陈类', '线丛', '曲率'],
      statement: [
        '**在做什么**：秩 $1$ 时整台装置退化成一个可算的公式 —— 这是陈类唯一能「手算」的情形，也是分裂原理把它化归到的情形。',
        '',
        '设 $L \\to B$ 是复线丛，$\\nabla$ 是联络，$\\Omega$ 是它的曲率 $2$-形式（线丛的曲率就是 $\\mathrm{d}\\theta$，因为 $\\operatorname{End}L \\cong \\mathbb{C}$ 可交换）。则',
        '',
        '$$c_{1}(L) = \\Bigl[\\, \\frac{i}{2\\pi}\\,\\Omega \\,\\Bigr] \\in H^{2}(B; \\mathbb{Z}) , \\qquad c_{j}(L) = 0 \\ (j \\ge 2) .$$',
        '',
        '**推论（陈数）**：若 $B$ 是闭合可定向曲面 $\\Sigma$，则',
        '',
        '$$\\int_{\\Sigma} c_{1}(L) = \\frac{i}{2\\pi}\\int_{\\Sigma}\\Omega \\;\\in\\; \\mathbb{Z} .$$'
      ].join('\n'),
      notes: [
        '**为什么秩 $1$ 特别简单**：$\\mathfrak{gl}(1,\\mathbb{C}) = \\mathbb{C}$ 交换，于是「共轭不变」这个条件自动满足 —— 任何多项式都不变，不用挑。所以线丛的示性类只有一条（$c_{1}$），后面的全为零。',
        '**这个整数是什么**：$\\frac{i}{2\\pi}\\int_{\\Sigma}\\Omega$ 就是**绕数 / 第一陈数**，物理里叫「磁通量的量子化」。它在 $\\Sigma = S^{2}$ 上取遍 $\\mathbb{Z}$ —— 这就是复线丛在 $S^{2}$ 上由 $\\mathbb{Z}$ 分类（Hopf 丛是生成元，`thm.bundle-classification` 的注里说过）的解析根子。',
        '⚠️ **不能省 $c_{j}(L)=0$（$j\\ge2$）**：它保证线丛的示性类只有一个自由度。⚠️ 但也别误推「$c_1=0$ 就平凡」：$c_1=0$ 只说明该丛在 $H^2$ 层面看不出；平坦线丛就是一例（$c_1=0$ 但可以非平凡）。',
        '⚠️ **曲率的符号约定**：$\\Omega = \\mathrm{d}\\theta$ 与 $\\Omega = -\\mathrm{d}\\theta$ 两种约定都在用，差一个整体符号；$c_{1}$ 的符号会跟着变。本图取 $\\Omega = \\mathrm{d}\\theta$（与 `def.connection-form` 一致）。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 线丛', 'Bott–Tu, Differential Forms in Algebraic Topology']
    },

    {
      id: 'thm.splitting-principle',
      cluster: 'diffgeom.characteristic',
      type: 'theorem',
      label: '分裂原理',
      title: '分裂原理：把丛拆成线丛来算',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '分裂原理', '陈类', '线丛'],
      statement: [
        '**在做什么**：陈类在一般秩上的公式难以直接写出来。分裂原理说：**为了算多项式恒等式，可以假装丛是一堆线丛的直和** —— 这不是真的分解，但足够推出一切公式。',
        '',
        '设 $E \\to B$ 是秩 $k$ 复向量丛。则存在光滑流形 $\\pi : \\tilde B \\to B$ 与映射 $\\pi^{*}E \\cong L_{1} \\oplus \\cdots \\oplus L_{k}$（$L_{j}$ 为线丛），且 $\\pi^{*} : H^{*}(B) \\to H^{*}(\\tilde B)$ 是**单射**（在 $\\mathbb{Q}$ 系数下；取 $\\tilde B$ 为 $B$ 上的旗丛时更可具体）。',
        '',
        '于是可以形式地写',
        '',
        '$$c(E) = \\prod_{j=1}^{k}\\bigl(1 + x_{j}\\bigr), \\qquad x_{j} := c_{1}(L_{j}) ,$$',
        '',
        '其中 $x_{j}$ 叫 $E$ 的**陈根**。任何关于陈类的**多项式恒等式**，只要在「$E$ 是线丛直和」的情形验证过，就对一般 $E$ 成立。'
      ].join('\n'),
      notes: [
        '**为什么这不是“作弊”**：$\\pi^{*}$ 单射意味着「在 $\\tilde B$ 上成立的多项式等式可以推回 $B$」。所以严格逻辑是：**先证明等式在旗丛上成立，再用单射性推回**。⚠️ 关键词是**单射**，不是「存在分裂」—— 只分裂而不单射就推不回来。',
        '**代价在哪**：$\\tilde B$ 通常**比 $B$ 大得多**（旗丛的纤维是 $\\mathrm{GL}(k)/$（上三角），实维数 $\\sim k^{2}$），而且要做**纤维积分**（沿 $\\pi$ 把等式降回 $B$）。所以分裂原理是「证明工具」，不是「计算方法」：要真的算出某个具体的 $c_{j}$，还是得回到曲率或线丛。',
        '⚠️ **$\\mathbb{Z}$ 系数时有挠的问题**：单射性在 $\\mathbb{Q}$ 系数下最干净；整系数时要小心 $2$-挠（这是为什么 Stiefel–Whitney 类用 $\\mathbb{Z}/2$ 系数）。',
        '**典型的用法**：由 $c(E) = \\prod(1+x_{j})$ 立刻得到 $c_{1}(E) = \\sum x_{j} = c_{1}(\\det E)$ 与 $c_{k}(E) = \\prod x_{j} = e(E)$（顶陈类 = Euler 类）。这两个公式在一般秩上靠分裂原理一次得到。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 分裂原理', 'Bott–Tu, Differential Forms in Algebraic Topology']
    }
  ],

  edges: [
    { id: 'dep-ip-gl', kind: 'definition',
      definition: 'def.linear-map', usedBy: 'def.invariant-polynomial',
      note: '$\\mathfrak{gl}(k)$ 的元素是线性映射，多项式取在它的矩阵元上。' },
    { id: 'dep-ip-poly', kind: 'definition',
      definition: 'def.polynomial-ring', usedBy: 'def.invariant-polynomial',
      note: '「不变多项式的代数」就是对称多项式环（初等对称多项式生成）。' },

    { id: 'dep-cw-inv', kind: 'definition',
      definition: 'def.invariant-polynomial', usedBy: 'thm.chern-weil',
      note: '陈–Weil 同态的输入是**不变**多项式 —— 不变性正是「标架无关」的来源。' },
    { id: 'dep-cw-conn', kind: 'definition',
      definition: 'def.connection-form', usedBy: 'thm.chern-weil',
      note: '曲率 $F_{\\nabla}$ 来自联络；闭性用 Bianchi 恒等式。' },
    { id: 'dep-cw-derham', kind: 'definition',
      definition: 'def.de-rham-complex', usedBy: 'thm.chern-weil',
      note: '结论落在 de Rham 上同调里。' },
    { id: 'dep-cw-closed', kind: 'definition',
      definition: 'def.closed-form', usedBy: 'thm.chern-weil',
      note: '第一步要证 $P(F)$ 闭 —— 用闭形式的语言。' },

    { id: 'dep-cc-cw', kind: 'definition',
      definition: 'thm.chern-weil', usedBy: 'def.chern-class',
      note: '陈类 = 陈–Weil 同态用在「$\\det(tI + \\frac{i}{2\\pi}F)$ 的系数」上。' },
    { id: 'dep-cc-charclass', kind: 'definition',
      definition: 'def.characteristic-class', usedBy: 'def.chern-class',
      note: '陈类是示性类的具体实现：满足自然性与同构不变。' },
    { id: 'dep-cc-line', kind: 'definition',
      definition: 'def.vector-bundle', usedBy: 'def.chern-class',
      note: '陈类定义在复向量丛上（线丛是秩 $1$ 的特例）。' },

    { id: 'dep-clb-cc', kind: 'definition',
      definition: 'def.chern-class', usedBy: 'prop.chern-class-line-bundle',
      note: '线丛情形是陈类定义在 $k = 1$ 时的显式化。' },
    { id: 'dep-clb-conn', kind: 'definition',
      definition: 'def.connection-form', usedBy: 'prop.chern-class-line-bundle',
      note: '要用联络与曲率 $\\Omega = \\mathrm{d}\\theta$。' },

    { id: 'dep-sp-cc', kind: 'definition',
      definition: 'def.chern-class', usedBy: 'thm.splitting-principle',
      note: '分裂原理是关于陈类（Whitney 和）的恒等式工具。' },
    { id: 'dep-sp-clb', kind: 'definition',
      definition: 'prop.chern-class-line-bundle', usedBy: 'thm.splitting-principle',
      note: '分裂到线丛之后，每一块都用线丛那条公式算。' },  ]
});
