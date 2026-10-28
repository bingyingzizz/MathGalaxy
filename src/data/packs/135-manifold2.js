/* ==========================================================================
   内容包 · 微分流形（第二批）
   --------------------------------------------------------------------------
   17 个节点 / 55 条边（47 条定义引用 + 8 条推导）。星团全部落在 diffgeom.manifold。

     §A 分布与 Frobenius 定理（4 点）
        切分布 → 对合分布 → 积分流形 → Frobenius 定理（陈述 + 归纳法证明提纲）
     §B Lie 群上的形式与 Lie 第三定理（3 点）
        左不变形式 → Maurer–Cartan 方程 · Lie 第三定理（只陈述）
     §C 分类与同构（2 点）
        向量丛的分类（Čech 口径，只陈述 + 构造级证明）· de Rham 定理（陈述 + 证明路线）
     §D 张量运算、流与 Lie 导数（5 点）
        张量缩并 · 内乘 · 流与单参数群 → 局部流 → 完备性 · Lie 导数 → Cartan 公式
     §E 子流形的诱导体积（1 点）
        Riemann 体积与积分在子流形上的那一格（131/132 没有）

   ⚠️ 与 131-manifold.js 的分工（那里**一个都不重建**，只在边上接）：
      def.manifold-chart · def.smooth-map · def.differential-map · def.tangent-bundle ·
      def.vector-field · def.lie-bracket · def.tensor-field · def.vector-bundle ·
      def.bundle-section · thm.smooth-partition-unity · prop.bundle-metric ·
      def.orientable-manifold · def.volume-form · prop.volume-form-orientation ·
      def.de-rham-complex · thm.de-rham-h0 · lem.poincare-lemma · thm.mayer-vietoris ·
      def.lie-group · def.lie-algebra · prop.left-invariant-fields。
      131 里三处「本图不展开」的留白正是本批要补的：def.vector-field 的 notes
      （「流与单参数群那条线暂不进图」）、def.lie-algebra 的 notes（「从代数回到群要做
      指数映射，本图不展开」「Lie 第三定理」）、prop.left-invariant-fields 的 notes
      （「左不变形式给出 Maurer–Cartan 方程，本图不展开」）。

   ⚠️ 与 132-spivak.js 的分工：那边有链、链版 Stokes、体积密度、散度、换元。
      本批只在 def.integral-on-chain / def.singular-chain / thm.stokes-chain /
      def.volume-density 上接边，不重建。

   ⚠️ 与 129-diffgeom-tu.js 的分工：def.differential-form / def.exterior-derivative /
      prop.pullback-forms / thm.stokes / def.riemannian-metric / def.area-element /
      def.integral-form / def.affine-connection 都在那边，本批只引用。

   ⚠️ 引用政策：参考书 Tu, An Introduction to Manifolds (2nd ed., GTM 334)。
      refs 只写「书名 + 章名 + 结果名」，**不编号**（编号没有把握，不编造）。
      本批有三条的章名是凭记忆写的、**没有核对原书**：
        · thm.frobenius（「Frobenius Theorem」一节）
        · thm.lie-third（Lie Groups and Lie Algebras 章）
        · thm.bundle-classification（Vector Bundles 章）
      其余章名与 131 用的一致（Manifolds / Tangent Vectors / Vector Bundles /
      Differential Forms / de Rham Cohomology / Lie Groups and Lie Algebras）。

   ⚠️ 符号约定：
      · 分布记 \mathcal{D}，对合用「生成元括号封闭」表述；
      · 流记 \varphi_{t}（小写 phi 一律 \varphi，见 notation.js 的禁用表）；
      · Lie 导数 \mathcal{L}_{X}、内乘 \iota_{X}、外微分 \mathrm{d}；
      · Lie 代数用 fraktur：\mathfrak{g}、\mathfrak{gl}(n,\mathbb{R})；
      · 结构常数 c^{i}_{\ jk}，索引高低位与 131 的活动标架记法对齐。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '微分流形：Frobenius、Maurer–Cartan、分类定理与张量运算',

  nodes: [

    /* ======================================================================
       §A 分布与 Frobenius 定理
       ====================================================================== */

    {
      id: 'def.tangent-distribution',
      cluster: 'diffgeom.vector',
      type: 'definition',
      label: '切分布',
      title: '切分布与光滑性',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '切分布', '分布', '子丛', 'Frobenius'],
      statement: [
        '**白话**：把「每点挑一个 $k$ 维方向」摊在整个流形上，就得到一个切分布 —— 它是「一族方向」，不是「一个方向的场」；Frobenius 定理问的是这族方向能不能被拼成真正的 $k$ 维薄片。',
        '',
        '设 $M$ 是 $n$ 维光滑流形，$0 \\le k \\le n$。$M$ 上的 **$k$ 阶切分布**（简称 **$k$-分布**）是给每点 $p \\in M$ 指定一个 $k$ 维线性子空间',
        '',
        '$$\\mathcal{D}_{p} \\subseteq T_{p}M,\\qquad \\dim \\mathcal{D}_{p} = k,$$',
        '',
        '并把它并起来记 $\\mathcal{D} := \\bigsqcup_{p \\in M}\\mathcal{D}_{p} \\subseteq TM$。称 $\\mathcal{D}$ **光滑**（也叫**光滑分布**），如果 $\\mathcal{D}$ 是切丛的 **$k$ 秩光滑子丛**；等价地，每点有开邻域 $U$ 与 $U$ 上的 $k$ 个光滑向量场 $X_{1},\\ldots,X_{k}$，使',
        '',
        '$$\\mathcal{D}_{p} = \\operatorname{span}\\bigl\\{(X_{1})_{p},\\ldots,(X_{k})_{p}\\bigr\\}\\qquad (p \\in U),$$',
        '',
        '即 $\\mathcal{D}$ 在 $U$ 上由这 $k$ 个向量场**生成**。',
        '',
        '**特例**：$k = 0$ 时 $\\mathcal{D}_{p} = 0$；$k = n$ 时 $\\mathcal{D} = TM$；$k = 1$ 时每点给一条线，叫**线分布**（$\\mathbb{R}^{2}$ 上 $\\mathcal{D}_{p} = \\operatorname{span}\\{\\partial_{x} + y\\,\\partial_{y}\\}$ 就是一条随点转动的线）。',
        '',
        '**不是**什么：这里的「分布」是**切丛的子丛**，与概率论里说的「分布」、广义函数论里的「分布」毫无关系 —— 同字不同义，取用时看星团。'
      ].join('\n'),
      notes: [
        '**为什么要求「子丛」而不只是「每点一个子空间」**：只逐点给子空间，$\\mathcal{D}$ 可以极不光滑（把 $\\mathbb{R}^{2}$ 的每条线按某个病态函数转动）。Frobenius 是可微的命题，必须让「转动」也光滑 —— 这就是「局部由 $k$ 个光滑向量场生成」的作用：它把「选方向」变成「选场」，于是可以求导、可以取括号。',
        '',
        '**光滑性等价于子丛**：若 $\\mathcal{D}$ 局部由 $X_{1},\\ldots,X_{k}$ 生成且这 $k$ 个场在每点线性无关，则 $\\mathcal{D}$ 是 $TM$ 的嵌入子流形、$\\pi|_{\\mathcal{D}}$ 仍是秩 $k$ 向量丛（图卡由 $M$ 的卡与这组基拼成）。反向由局部平凡化取常值截面即得。本图把这两条当同一件事用，不另立节点。',
        '',
        '**生成元不唯一，秩唯一**：把 $k$ 个生成元按任意光滑 $\\operatorname{GL}(k,\\mathbb{R})$-值函数矩阵线性组合，仍是生成元。所以「光滑」是分布的性质，不是某一组场的性质 —— 与 `def.vector-field` 里「换卡乘 Jacobi 矩阵」是同一类记账。',
        '',
        '**与辛几何、接触几何的接口**：秩 $n-1$ 的分布常写成某个处处非零 $1$-形式的核 $\\ker\\omega$；辛流形上 $\\ker(\\iota_{X}\\omega)$ 是 $X$ 的**辛正交补**（秩 $n-1$，含 $X$ 本身，因为 $\\omega(X,X) = 0$，见 `def.interior-product`）。这些核分布可不可积，正是 Frobenius（`thm.frobenius`）要判的事。',
        '',
        '⚠️ 记号冲突：$\\Gamma(\\mathcal{D})$ 记「落在 $\\mathcal{D}$ 里的向量场的全体」，它是 $C^{\\infty}(M)$-模而不是向量空间；本图沿用 `def.bundle-section` 的 $\\Gamma$。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Frobenius Theorem」· 切分布与光滑性',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 子丛与截面的模结构'
      ]
    },

    {
      id: 'def.involutive-distribution',
      cluster: 'diffgeom.vector',
      type: 'definition',
      label: '对合分布',
      title: '对合分布',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '对合', 'Frobenius', 'Lie 括号', '接触分布'],
      statement: [
        '**白话**：一族方向「对合」，说的是：沿其中两个方向各走一步、交换次序后的那点偏差，仍然落在这族方向里。这一条就是「能被拼成薄片」的全部障碍。',
        '',
        '设 $\\mathcal{D}$ 是 $M$ 上的光滑 $k$ 阶切分布（`def.tangent-distribution`）。称 $\\mathcal{D}$ **对合**（involutive），如果对任意开集 $U \\subseteq M$ 与任意 $X, Y \\in \\Gamma(\\mathcal{D}|_{U})$（取值落在 $\\mathcal{D}$ 里的光滑向量场），都有',
        '',
        '$$[X,Y] \\in \\Gamma(\\mathcal{D}|_{U}),$$',
        '',
        '其中 $[\\cdot,\\cdot]$ 是向量场的 Lie 括号（`def.lie-bracket`）。',
        '',
        '**只需查生成元**：设 $\\mathcal{D}$ 在 $U$ 上由 $X_{1},\\ldots,X_{k}$ 生成，则 $\\mathcal{D}$ 在 $U$ 上对合，当且仅当每个括号都能写成生成元的 $C^{\\infty}$-线性组合',
        '',
        '$$[X_{i},X_{j}] = \\sum_{l=1}^{k} a^{l}_{\\ ij}\\,X_{l},\\qquad a^{l}_{\\ ij} \\in C^{\\infty}(U).$$',
        '',
        '这一条判据是 Frobenius 定理证明里真正动手验的东西。'
      ].join('\n'),
      notes: [
        '**为什么只需查生成元**：$\\Gamma(\\mathcal{D}|_{U})$ 是 $C^{\\infty}(U)$-模，任意两个截面写成 $f^{i}X_{i}$、$g^{j}X_{j}$。由 `def.lie-bracket` 的第 4 条（Leibniz 律）',
        '',
        '$$[fX_{i},\\,gX_{j}] = fg\\,[X_{i},X_{j}] + f(X_{i}g)\\,X_{j} - g(X_{j}f)\\,X_{i},$$',
        '',
        '后两项只是生成元的组合，所以「括号落在 $\\mathcal{D}$ 里」逐点由 $[X_{i},X_{j}]$ 决定。',
        '',
        '**秩 $1$ 永远对合**：局部取处处非零的 $X$ 生成 $\\mathcal{D}$，任意两个截面是 $fX$、$gX$，而 $[fX,gX] = f(Xg)X - g(Xf)X$ 仍是 $X$ 的倍数。所以**线分布永远可积**（`thm.frobenius`）；可积性是从秩 $2$ 才开始的问题 —— 这与「一个一阶常微分方程总有解、一阶偏微分方程组才有障碍」是同一句话。',
        '',
        '**为什么对合是「正确」的条件**：若有积分流形 $N$（`def.integral-manifold`），则「$X, Y$ 落在 $\\mathcal{D}$ 里」等于「$X, Y$ 是 $N$ 上的向量场」，于是 $[X,Y]$ 必落在 $TN = \\mathcal{D}$ 里 —— 对合是必要条件，而且它只用括号就能验。Frobenius 定理说它也是**充分**的。',
        '',
        '**反例（Heisenberg 接触分布）**：$\\mathbb{R}^{3}$ 上令 $\\mathcal{D} = \\ker\\omega$，$\\omega = \\mathrm{d}z - x\\,\\mathrm{d}y$。$X = \\partial_{x}$ 与 $Y = \\partial_{y} + x\\,\\partial_{z}$ 满足 $\\omega(X) = 0$、$\\omega(Y) = -x + x = 0$，所以它们是 $\\mathcal{D}$ 的生成元；但',
        '',
        '$$[X,Y] = [\\partial_{x},\\ \\partial_{y} + x\\,\\partial_{z}] = \\partial_{z},\\qquad \\omega(\\partial_{z}) = 1 \\ne 0,$$',
        '',
        '故 $[X,Y] \\notin \\mathcal{D}$：这个秩 $2$ 的接触分布不对合，因而**不可能有积分曲面**。它每点附近都「绕着拧」，任何曲面都装不下 —— 这是 Frobenius 定理最省事的反例。',
        '',
        '⚠️ 「对合」是分布的性质，与生成元的选取无关（换生成元只是乘以 $\\operatorname{GL}(k)$-值函数矩阵，括号的封闭性不变）。所以反例里只验一组生成元就够。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Frobenius Theorem」· 对合分布',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Tangent Vectors」· 向量场的 Lie 括号'
      ]
    },

    {
      id: 'def.integral-manifold',
      cluster: 'diffgeom.vector',
      type: 'definition',
      label: '积分流形',
      title: '积分流形与叶片坐标',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '积分流形', '叶片坐标', '叶状结构'],
      statement: [
        '**白话**：一块 $k$ 维薄片，如果它在每点的切空间正好是分布给的那个子空间，它就是这分布的**积分流形** —— 「积分」就是把一堆方向积成一整块地。',
        '',
        '设 $\\mathcal{D}$ 是 $M$ 上的光滑 $k$ 阶切分布。$M$ 的 $k$ 维**浸入子流形**（即单浸入 $i : N^{k} \\to M$ 的像：$i$ 光滑、$\\mathrm{d}i$ 处处单射）叫 $\\mathcal{D}$ 的**积分流形**，如果',
        '',
        '$$\\mathrm{d}i_{p}\\bigl(T_{p}N\\bigr) = \\mathcal{D}_{i(p)}\\qquad (p \\in N).$$',
        '',
        '两边都是 $k$ 维，所以「包含」与「相等」等价：条件就是 $\\mathrm{d}i_{p}(T_{p}N) \\subseteq \\mathcal{D}_{i(p)}$ 对每点成立。',
        '',
        '**局部形式（叶片坐标）**：若 $p$ 附近有坐标 $(x^{1},\\ldots,x^{n})$ 使 $\\mathcal{D}$ 由 $\\partial_{1},\\ldots,\\partial_{k}$ 生成，则每块**叶片**',
        '',
        '$$\\{x^{k+1} = c^{k+1},\\ \\ldots,\\ x^{n} = c^{n}\\}$$',
        '',
        '（$c^{k+1},\\ldots,c^{n}$ 是常数）都是积分流形。这样的坐标叫**平坦坐标**，也叫叶片坐标。',
        '',
        '**整体形式**：把 $M$ 按「过同一点的积分流形」切开，得到的极大连通积分流形叫**叶**，全体叶叫 $\\mathcal{D}$ 的**叶状结构**（foliation）。'
      ].join('\n'),
      notes: [
        '**为什么只要求「浸入」不要求「嵌入」**：叶常常是稠密的（环面 $\\mathbb{T}^{2}$ 上斜率为无理数的线分布，每条叶都稠密），它作为子集不可能是嵌入子流形（嵌入要求子空间拓扑），但作为浸入子流形完全合法。所以积分流形的正确语言是浸入 —— 这是「叶」与「嵌入子流形」必须分开的地方。',
        '',
        '**维数必须正好是 $k$**：$\\mathcal{D}$ 里的积分曲线（$k = 1$ 时就是它）是积分流形的例子；但一条躺在 $\\mathcal{D}$ 里的低维曲线在高秩情形一般不叫积分流形，因为它的切空间只有更低维。本图的定义要求维数相等，正是为了让「$\\mathrm{d}i(TN) \\subseteq \\mathcal{D}$」能升成等号。',
        '',
        '**局部唯一性**：若 $N_{1}, N_{2}$ 是过同一点的两块积分流形，则它们在交点附近重合。理由：在平坦坐标里两者都只能沿前 $k$ 个坐标方向伸展，而叶片是唯一那样的 $k$ 维薄片。这条是「叶把流形分开」的来源，也是把局部叶片拼成整体叶的依据。',
        '',
        '**与常微分方程的类比**：$k = 1$ 时积分流形就是积分曲线（`def.flow`），存在唯一性由 ODE 给，没有障碍；$k \\ge 2$ 时方程变成**偏**微分方程组，于是出现障碍，障碍正是对合（`def.involutive-distribution`）。这就是 Frobenius 定理的全部内容。',
        '',
        '**整体存在不是自动的**：定理（`thm.frobenius`）只保证**局部**有积分流形。整体上「过每点有唯一的极大叶」还要一次把局部叶片粘起来的手续（用 Zorn 引理取极大的连通并，或用局部唯一性证明两个叶要么相等要么不交）。本图只陈述结论。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Frobenius Theorem」· 积分流形与叶片坐标',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 浸入子流形'
      ]
    },

    {
      id: 'thm.frobenius',
      cluster: 'diffgeom.vector',
      type: 'theorem',
      label: 'Frobenius 定理',
      title: 'Frobenius 定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', 'Frobenius', '对合', '积分流形', '叶状结构', 'PDE'],
      statement: [
        '**白话**：一族光滑方向能被拼成薄片，当且仅当这族方向对合 —— 没有别的障碍。这是一阶偏微分方程组可解的几何版本，也是叶状结构的出生证。',
        '',
        '设 $\\mathcal{D}$ 是 $n$ 维光滑流形 $M$ 上的光滑 $k$ 阶切分布。以下四条等价：',
        '',
        ['1. $\\mathcal{D}$ 对合（`def.involutive-distribution`）；',
         '2. **平坦坐标存在**：每点 $p$ 有邻域 $U$ 与坐标 $(x^{1},\\ldots,x^{n})$，使 $\\mathcal{D}|_{U}$ 由 $\\partial_{1},\\ldots,\\partial_{k}$ 生成；',
         '3. **局部可积**：每点 $p$ 落在某块 $k$ 维积分流形里（`def.integral-manifold`）；',
         '4. **叶状结构存在**：$M$ 被一族互不相交的极大连通积分流形（叶）覆盖，每片叶是浸入子流形。'].join('\n'),
        '',
        '特别地：对合**当且仅当**局部总有「把 $\\mathcal{D}$ 拉直成坐标面」的坐标。$k = n-1$ 且 $\\mathcal{D} = \\ker\\omega$（$\\omega$ 处处非零）时，对合等价于',
        '',
        '$$\\omega \\wedge \\mathrm{d}\\omega = 0,$$',
        '',
        '这就是经典教材里的 Frobenius 条件；本图只陈述这一支，不展开。'
      ].join('\n'),
      notes: [
        '**证明的骨架**（详细提纲写在两条边上）：(2)$\\implies$(3)$\\implies$(1) 与 (2)$\\implies$(4) 都是一行计算，内容全在 (1)$\\implies$(2) —— 先把一个生成元拉直成 $\\partial_{1}$（用局部流 + 流盒定理），再在横截超曲面上**降秩归纳**。关键技巧是：把其余生成元换成「没有 $\\partial_{1}$ 分量」的新生成元，于是它们的括号也落在其余生成元张成的空间里（这一步只在对合时才做得到）；最后沿 $\\partial_{1}$ 把坐标平移出去，用一个线性 ODE 的初值问题把「相切」验完。',
        '',
        '**条件是最优的**：反例就是接触分布（`def.involutive-distribution` 的 notes 里那个）—— 它光滑、秩 $2$、处处非零，就是不对合，于是任何曲面都装不下它。所以「对合」不是技术假设，是充要条件的一半。',
        '',
        '**「局部」不能升成「整体」**：定理给的是每点附近有叶片坐标，**不**保证整体上有坐标把 $\\mathcal{D}$ 拉直成 $\\mathbb{R}^{n}$ 的坐标面（那要求叶空间本身是乘积流形）。稠密叶（环面上的无理斜率线）就是反例：局部全是直线，整体却绕回来稠密。',
        '',
        '**分析版本**：Frobenius 等价于「一阶线性偏微分方程组 $\\partial_{i}f = \\sum_{j} a^{j}_{i}\\partial_{j}f$（$i > k$）局部可解」的相容性条件。相容性条件就是对合，而它恰好是「混合偏导可交换」（$\\mathrm{d}^{2} = 0$）的读法 —— 与 `def.exterior-derivative` 的 notes 里那句「$\\mathrm{d}^{2} = 0$ 与结构方程同源」是同一件事。',
        '',
        '**口径**：本图用「$k$ 维子空间族」的语言；一般教材用「微分理想 $I \\subseteq \\Omega^{\\bullet}(M)$ 的积分流形」，两者等价（取 $I$ 为湮灭 $\\mathcal{D}$ 的形式生成的理想）。本图不引入理想语言，以免两套记号打架。',
        '',
        '⚠️ 定理的 $k = n$ 情形平凡（$\\mathcal{D} = TM$ 总对合、任意坐标都平坦），$k = 0$ 也平凡；**有内容的只有 $1 \\le k \\le n-1$**，而 $k = 1$ 又总是对合（见 `def.involutive-distribution`）。所以真正的例子从「$2 \\le k \\le n-1$」才开始。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Frobenius Theorem」· Frobenius 定理与叶状结构',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Frobenius Theorem」· 一阶偏微分方程组的相容性'
      ]
    },

    /* ======================================================================
       §B Lie 群上的形式与 Lie 第三定理
       ====================================================================== */

    {
      id: 'def.left-invariant-form',
      cluster: 'diffgeom.lieg',
      type: 'definition',
      label: '左不变形式',
      title: '左不变形式与左不变余标架',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', 'Lie 群', '左不变形式', '余标架', '结构常数'],
      statement: [
        '**白话**：Lie 群上的微分形式如果对左平移「纹丝不动」，它就被单位元处的一个多重线性型完全决定 —— 于是 $G$ 上的左不变 $k$-形式与 $\\bigwedge^{k}\\mathfrak{g}^{\\ast}$ 是同一个东西。',
        '',
        '设 $G$ 是 $n$ 维 Lie 群（`def.lie-group`），$\\mathfrak{g} = T_{e}G$，$L_{g}$ 是左平移。$k$-形式 $\\omega \\in \\Omega^{k}(G)$ 叫**左不变**，如果',
        '',
        '$$L_{g}^{\\ast}\\omega = \\omega\\qquad (g \\in G),$$',
        '',
        '等价地 $\\omega_{g}(v_{1},\\ldots,v_{k}) = \\omega_{e}\\bigl(\\mathrm{d}(L_{g^{-1}})_{g}v_{1},\\ldots,\\mathrm{d}(L_{g^{-1}})_{g}v_{k}\\bigr)$ —— 即 $\\omega$ 在 $G$ 上的值由 $\\omega_{e}$ 唯一决定。于是赋值',
        '',
        '$$\\omega \\longmapsto \\omega_{e}$$',
        '',
        '是「左不变 $k$-形式」的空间到 $\\bigwedge^{k}\\mathfrak{g}^{\\ast}$ 的线性同构，维数为 $\\binom{n}{k}$。',
        '',
        '**左不变余标架**：取 $\\mathfrak{g}$ 的基 $e_{1},\\ldots,e_{n}$ 与对偶基 $\\omega^{1}_{e},\\ldots,\\omega^{n}_{e}$（$\\omega^{i}_{e}(e_{j}) = \\delta^{i}_{\\ j}$），把它们左平移出去：',
        '',
        '$$\\omega^{i}_{g} := \\mathrm{d}(L_{g^{-1}})^{\\ast}_{e}\\,\\omega^{i}_{e},\\qquad \\omega^{i}_{g}\\bigl((\\tilde e_{j})_{g}\\bigr) = \\delta^{i}_{\\ j},$$',
        '',
        '其中 $\\tilde e_{j}$ 是 $e_{j}$ 对应的左不变向量场（`prop.left-invariant-fields`）。这组 $\\omega^{1},\\ldots,\\omega^{n}$ 叫**左不变余标架**，结构常数由 $[e_{j},e_{k}] = \\sum_{i}c^{i}_{\\ jk}e_{i}$ 定义。'
      ].join('\n'),
      notes: [
        '**为什么赋值是同构**：左不变性取 $h = e$ 得 $\\omega_{g}(\\mathrm{d}(L_{g})_{e}w) = \\omega_{e}(w)$，故 $\\omega_{g} = \\mathrm{d}(L_{g^{-1}})^{\\ast}\\omega_{e}$，即 $\\omega$ 由 $\\omega_{e}$ 决定（单射）。反向：给定 $\\alpha \\in \\bigwedge^{k}\\mathfrak{g}^{\\ast}$ 令 $\\omega_{g} := \\mathrm{d}(L_{g^{-1}})^{\\ast}\\alpha$，则 $L_{h}^{\\ast}\\omega = \\omega$，因为',
        '',
        '$$L_{(hg)^{-1}} = L_{g^{-1}}\\circ L_{h^{-1}},\\qquad L_{h^{-1}}\\circ L_{h} = \\operatorname{id},$$',
        '',
        '两个左平移把 $\\mathrm{d}(L_{h})$ 吃掉，恰好还原。所以 $\\omega \\mapsto \\omega_{e}$ 是双射，线性显然。',
        '',
        '**与左不变向量场互为对偶**：`prop.left-invariant-fields` 说左不变向量场与 $\\mathfrak{g}$ 同构；这里说左不变 $k$-形式与 $\\bigwedge^{k}\\mathfrak{g}^{\\ast}$ 同构。$k = 1$ 时两组互为对偶基 —— 这正是活动标架法（`def.moving-frame`）在群上的版本：标架自身不动，动的只是点。',
        '',
        '**可定向性**：$k = n$ 时 $\\bigwedge^{n}\\mathfrak{g}^{\\ast}$ 一维，取非零元左平移出去得到一个处处非零的 $n$-形式，由 `prop.volume-form-orientation` 得**每个 Lie 群都可定向**（$S^{1}$、$\\operatorname{SO}(3)$、$\\operatorname{GL}(n,\\mathbb{R})$ 都如此，而一般流形未必）。',
        '',
        '**Haar 测度的那一半**：$\\omega^{1}\\wedge\\cdots\\wedge\\omega^{n}$ 是左不变的体积形式，它的绝对值给出左不变测度（Haar 测度）。紧群上左不变与右不变只差一个常数（模函数），非紧时未必 —— 本图只用形式这一面。',
        '',
        '⚠️ 左不变**形式**与左不变**向量场**是两族不同的对象，都记下标 $g$，别混：前者的分量矩阵是 Jacobi 矩阵的逆转置，后者是 Jacobi 矩阵本身。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 左不变形式与余标架',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 左不变向量场与 Lie 代数'
      ]
    },

    {
      id: 'thm.maurer-cartan',
      cluster: 'diffgeom.lieg',
      type: 'theorem',
      label: 'Maurer–Cartan 方程',
      title: 'Maurer–Cartan 方程',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', 'Lie 群', 'Maurer–Cartan', '结构常数', '左不变形式'],
      statement: [
        '**白话**：Lie 群上那组「随群一起平移」的 $1$-形式，其外微分完全由结构常数决定 —— 一条公式把群的乘法（结构常数）和流形的微分（$\\mathrm{d}$）扣在一起。',
        '',
        '设 $G$ 是 $n$ 维 Lie 群，$\\mathfrak{g} = T_{e}G$，$e_{1},\\ldots,e_{n}$ 是 $\\mathfrak{g}$ 的基，$\\omega^{1},\\ldots,\\omega^{n}$ 是左不变对偶余标架（`def.left-invariant-form`），**结构常数**由',
        '',
        '$$[e_{j},e_{k}] = \\sum_{i=1}^{n} c^{i}_{\\ jk}\\,e_{i}$$',
        '',
        '定义（等价地用左不变向量场写：$[\\tilde e_{j},\\tilde e_{k}] = \\sum_{i}c^{i}_{\\ jk}\\tilde e_{i}$）。则',
        '',
        '$$\\mathrm{d}\\omega^{i} = -\\frac{1}{2}\\sum_{j,k=1}^{n} c^{i}_{\\ jk}\\,\\omega^{j}\\wedge\\omega^{k}\\qquad (i = 1,\\ldots,n).$$',
        '',
        '把 $\\omega := \\sum_{i}\\omega^{i}e_{i} \\in \\Omega^{1}(G;\\mathfrak{g})$ 看成一个 $\\mathfrak{g}$-值 $1$-形式（**Maurer–Cartan 形式**），并对 $\\mathfrak{g}$-值形式定义分次括号 $[\\alpha\\wedge\\beta]$，上式就是 **Maurer–Cartan 方程**',
        '',
        '$$\\mathrm{d}\\omega + \\frac{1}{2}[\\omega\\wedge\\omega] = 0,\\qquad\\mathrm{d}\\omega = -\\frac{1}{2}[\\omega\\wedge\\omega],$$',
        '',
        '两个 $1$-形式的约定是：把 $[\\omega\\wedge\\omega]$ 放在 $(X,Y)$ 上取值，得 $2\\,[\\omega(X),\\omega(Y)]$。'
      ].join('\n'),
      notes: [
        '**系数与符号的来历**：把 $[\\omega\\wedge\\omega]$ 逐项写开时，$(j,k)$ 与 $(k,j)$ 两项给出 $c^{i}_{\\ jk} - c^{i}_{\\ kj} = 2c^{i}_{\\ jk}$，恰好抵掉 $\\frac{1}{2}$；符号来自「$\\mathrm{d}\\theta(X,Y) = X\\theta(Y) - Y\\theta(X) - \\theta([X,Y])$」里的最后一项。所以这条公式没有一处自由度是多余的：有的书把括号归一化成不除 $2$，系数就跟着变（$\\mathrm{d}\\omega = -\\frac{1}{2}[\\omega,\\omega]$ 与 $\\mathrm{d}\\omega + [\\omega\\wedge\\omega] = 0$ 是同一句话的两种写法）。',
        '',
        '**它就是 Cartan 结构方程的群版本**：曲面上的结构方程 $\\mathrm{d}\\omega^{i} = \\sum_{j}\\omega^{j}\\wedge\\omega^{i}_{\\ j}$ 描述「标架怎么转」；这里标架不动、群在动，于是 $\\mathrm{d}\\omega^{i}$ 只剩结构常数这一项。同一套记账，一个描述空间弯曲，一个描述乘法非交换。',
        '',
        '**反推 Jacobi**：对 MC 方程两边取 $\\mathrm{d}$ 并用 $\\mathrm{d}^{2} = 0$，比较 $\\omega^{j}\\wedge\\omega^{k}\\wedge\\omega^{l}$ 的系数，得到',
        '',
        '$$\\sum_{i}\\bigl(c^{i}_{\\ jk}c^{m}_{\\ il} + c^{i}_{\\ kl}c^{m}_{\\ ij} + c^{i}_{\\ lj}c^{m}_{\\ ik}\\bigr) = 0,$$',
        '',
        '这正是 $[[e_{j},e_{k}],e_{l}] + [[e_{k},e_{l}],e_{j}] + [[e_{l},e_{j}],e_{k}] = 0$。于是「$\\mathfrak{g}$ 是 Lie 代数（Jacobi 成立）」与「$\\omega$ 满足 MC 方程」是同一件事 —— 这就是 MC 方程被称为「平坦性条件」的原因。',
        '',
        '**与 $H^{1}$、平坦联络的接口**：$\\mathrm{d}\\omega + \\frac{1}{2}[\\omega\\wedge\\omega] = 0$ 是「联络形式零曲率」的方程（把 $\\omega$ 看成平凡主丛上的联络）。所以「结构常数」与「平坦联络的模空间」在这个层次上是同一串数；本图只提这一句，不展开。',
        '',
        '⚠️ 上标 $i$ 是「结果的第几个分量」、下面两个 $j,k$ 是「输入的两个下标」。反称性只发生在下面两个之间（$c^{i}_{\\ jk} = -c^{i}_{\\ kj}$），$i$ 与它们之间没有任何对称性可言 —— 抄公式时把 $i$ 写到下标位置，就会凭空多出一次反称，符号全错。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· Maurer–Cartan 方程',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 结构常数与 Jacobi 恒等式'
      ]
    },

    {
      id: 'thm.lie-third',
      cluster: 'diffgeom.lieg',
      type: 'theorem',
      label: 'Lie 第三定理',
      title: 'Lie 第三定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', 'Lie 群', 'Lie 代数', 'Lie 第三定理', '单连通'],
      statement: [
        '**白话**：反过来也成立 —— 随便给一个有限维 Lie 代数，总能找到一个 Lie 群以它为 Lie 代数。这条保证了「Lie 代数」不是凭空造出来的对象。',
        '',
        '设 $\\mathfrak{g}$ 是有限维**实** Lie 代数（`def.lie-algebra`）。则存在连通且单连通的 Lie 群 $G$ 与 Lie 代数同构',
        '',
        '$$\\operatorname{Lie}(G) \\cong \\mathfrak{g},$$',
        '',
        '其中 $\\operatorname{Lie}(G) := T_{e}G$ 配上左不变向量场的括号（`prop.left-invariant-fields`）。',
        '',
        '**唯一性（配套的一半）**：若 $G_{1}, G_{2}$ 都连通单连通且 $\\operatorname{Lie}(G_{i}) \\cong \\mathfrak{g}$，则存在唯一同构 $G_{1} \\to G_{2}$。所以「连通单连通 Lie 群」与「有限维实 Lie 代数」在这一层上是同一个东西的两副样子。',
        '',
        '**本图只陈述，不证。**'
      ].join('\n'),
      notes: [
        '**为什么这里不证**：标准证明要经过三步深结果 —— Ado 定理（每个有限维 Lie 代数有忠实的有限维表示，于是可嵌入 $\\mathfrak{gl}(n,\\mathbb{R})$）、Baker–Campbell–Hausdorff 公式的收敛性（在 $\\mathfrak{g}$ 的某个邻域上把括号积成群的乘法）、以及把局部群「长成」单连通整体群（单连通时局部同构可以整体化）。三步各自是一章的篇幅，本图不承担 —— 这与 `thm.solid-abelian` 等深定理的处理口径一致：**只陈述，如实声明**。',
        '',
        '**三个 Lie 定理的分工**（常被混说，这里分开）：第一定理说 $\\mathfrak{g} = T_{e}G$ 且左不变向量场与 $\\mathfrak{g}$ 同构（`prop.left-invariant-fields`）；第二定理说 $G$ 连通单连通时 $\\operatorname{Hom}(G,H) \\cong \\operatorname{Hom}(\\mathfrak{g},\\mathfrak{h})$（群同态与 Lie 代数同态一一对应）；第三定理就是本条，管**存在性**。',
        '',
        '**单连通为什么不能去掉**：$\\mathfrak{g}$ 只记录单位元附近的乘法（「无穷小」），而覆盖映射 $\\mathbb{R} \\to S^{1}$ 在单位元附近是局部同构、整体却不同构 —— 所以 $\\mathfrak{g}$ 只能决定**万有覆盖**。要得到别的连通群，取单连通群对离散中心子群作商（$S^{1} = \\mathbb{R}/\\mathbb{Z}$ 就是最省事的例子）。',
        '',
        '**这条定理的用处**：它把「构造 Lie 群」化归成「写下满足 Jacobi 的括号」（往往容易得多）。给定结构常数表，`thm.maurer-cartan` 保证 Jacobi 成立就自洽，本条保证自洽的结构常数真来自某个群 —— 两条配套使用。',
        '',
        '⚠️ **别把它读成范畴等价**：对应只在「连通单连通 Lie 群」与「有限维实 Lie 代数」之间是范畴等价；一般 Lie 群会漏掉信息（$S^{1}$ 与 $\\mathbb{R}$ 的 Lie 代数都是 $\\mathbb{R}$，但两者不同构）。131 的 `def.lie-algebra` notes 里那句「Lie 代数不能复原群」说的就是这件事。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· Lie 第三定理与 Lie 对应',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 单连通 Lie 群与 Lie 代数'
      ]
    },

    /* ======================================================================
       §C 分类定理与 de Rham 定理
       ====================================================================== */

    {
      id: 'thm.bundle-classification',
      cluster: 'diffgeom.manifold',
      type: 'theorem',
      label: '丛的分类',
      title: '向量丛的分类与 Čech 上同调',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', '向量丛', '分类', 'Čech 上同调', '转移函数'],
      statement: [
        '**白话**：向量丛怎么「粘」，全记在转移函数上；所以「有多少种秩 $k$ 丛」这个问题就是「这些转移函数模掉换基还剩多少」—— 答案是 Čech 的 $H^{1}$。',
        '',
        '设 $M$ 是光滑流形（第二可数、Hausdorff），$k \\ge 1$，$\\mathfrak{U} = \\{U_{\\alpha}\\}$ 是开覆盖。记 $U_{\\alpha\\beta} := U_{\\alpha}\\cap U_{\\beta}$、$U_{\\alpha\\beta\\gamma} := U_{\\alpha}\\cap U_{\\beta}\\cap U_{\\gamma}$。**$1$-上闭链**是光滑函数族',
        '',
        '$$g_{\\alpha\\beta} : U_{\\alpha\\beta} \\longrightarrow \\operatorname{GL}(k,\\mathbb{R}),\\qquad g_{\\alpha\\beta}\\,g_{\\beta\\gamma} = g_{\\alpha\\gamma}\\quad(\\text{on } U_{\\alpha\\beta\\gamma}).$$',
        '',
        '两条上闭链**等价**，如果存在光滑的 $h_{\\alpha} : U_{\\alpha} \\to \\operatorname{GL}(k,\\mathbb{R})$ 使',
        '',
        '$$g^{\\prime}_{\\alpha\\beta} = h_{\\alpha}\\,g_{\\alpha\\beta}\\,h_{\\beta}^{-1}\\qquad(\\text{on } U_{\\alpha\\beta}).$$',
        '',
        '则 $M$ 上秩 $k$ 实向量丛的**同构类**与「$1$-上闭链模等价」一一对应。取遍所有覆盖与它们的加细，得到的集合记',
        '',
        '$$\\check{H}^{1}\\bigl(M;\\operatorname{GL}(k,\\mathbb{R})\\bigr),$$',
        '',
        '于是：秩 $k$ 实向量丛的同构类**就是**这个集合的元素。把 $\\operatorname{GL}(k,\\mathbb{R})$ 换成任意结构群 $G \\le \\operatorname{GL}(k,\\mathbb{R})$，同一句话给出「秩 $k$ 的 $G$-丛」的分类。'
      ].join('\n'),
      notes: [
        '**Čech 口径要说清三件事**：',
        '',
        ['1. **系数不是阿贝尔群**：$\\operatorname{GL}(k,\\mathbb{R})$ 非交换，所以 $\\check{H}^{1}(M;\\operatorname{GL}(k))$ 只是一个**带基点的集合**（基点是平凡丛），不是群、不是向量空间。只有当系数落在阿贝尔群层里，Čech 上同调才是群 —— 本图 `def.cech-cohomology` 那条定义取的是阿贝尔预层复形，与本条不是同一个层级的东西，别混。',
         '2. **只有 $0$ 次与 $1$ 次有意义**：$\\check{H}^{0}$ 是整体截面（对 $\\operatorname{GL}(k)$ 而言就是常值 $1$，因为 $M$ 连通），$\\check{H}^{1}$ 是上面那个「上闭链模上边界」；$\\check{H}^{2}$ 起要非阿贝尔上同调的技术（系数带群作用），本图完全不用。',
         '3. **必须取余极限**：不同覆盖给出不同的 $\\check{H}^{1}(\\mathfrak{U};\\cdot)$，但它们沿加细相容（每步是一个映射，而两个加细有公共加细），取余极限才是不依赖覆盖的量。'].join('\n'),
        '',
        '**为什么是 $H^{1}$ 而不是 $H^{0}$**：$H^{0}$ 记的是「什么都不用粘」的数据（整体平凡化），$H^{1}$ 记的是「粘起来差多少」—— 前者数整体对象，后者数障碍。这与层上同调的分工完全一致。',
        '',
        '**换结构群就是换系数**：$\\operatorname{GL}(k,\\mathbb{R})$ 换成 $\\operatorname{O}(k)$ 得「配了纤维度量的丛」（`prop.bundle-metric` 保证总能配上，所以这一步不丢信息）；换成 $\\operatorname{GL}(k,\\mathbb{C})$ 得复丛；换成 $\\operatorname{GL}(k,\\mathbb{Z})$ 得平坦丛。所以分类定理的真正形状是「对每个结构群 $G$，秩 $k$ 的 $G$-丛由 $\\check{H}^{1}(M;G)$ 分类」。',
        '',
        '**例子（只列结论）**：$S^{1}$ 上的实线丛有两个同构类（平凡丛与 Möbius 带），对应 $\\check{H}^{1}(S^{1};\\mathbb{R}^{\\times}) \\cong \\mathbb{Z}/2$；$S^{2}$ 上的复线丛由 $\\mathbb{Z}$ 分类（Hopf 丛是生成元）。这两个数都不「局部」看得出来 —— 正是上同调该管的事。',
        '',
        '⚠️ $\\operatorname{GL}(k,\\mathbb{R})$ 里的 $k$ 是**丛的秩**；$k = 1$ 时它是 $\\mathbb{R}^{\\times}$，其连通分支是两个（$\\mathbb{R}_{>0}$ 与 $\\mathbb{R}_{<0}$），这正是「实线丛只有两种粘法」的来源。',
        '',
        '⚠️ 本条的证明是**构造级**的（写在边上）：两个方向的映射都给出、同构对应上边界都验证；「余极限是良定义的」这一步只给论证思路，不给逐字证明 —— 与深定理的折衷口径一致，如实说明。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 转移函数与上闭链条件',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 丛的同构与结构群'
      ]
    },

    {
      id: 'thm.de-rham',
      cluster: 'diffgeom.form',
      type: 'theorem',
      label: 'de Rham 定理',
      title: 'de Rham 定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', 'de Rham 上同调', '奇异上同调', 'Čech 上同调', 'Stokes'],
      statement: [
        '**白话**：用微积分造出来的上同调（闭形式模恰当形式），与用「三角形」造出来的拓扑上同调（奇异链取对偶），是同一个东西。这条定理把分析、几何、拓扑焊在一起。',
        '',
        '设 $M$ 是光滑流形。对每个 $k \\ge 0$ 存在同构',
        '',
        '$$\\Phi^{k} : H^{k}_{\\mathrm{dR}}(M) \\longrightarrow H^{k}_{\\mathrm{sing}}(M;\\mathbb{R}),\\qquad [\\omega] \\longmapsto \\Bigl([c] \\mapsto \\int_{c}\\omega\\Bigr),$$',
        '',
        '其中 $H^{k}_{\\mathrm{sing}}(M;\\mathbb{R}) := H^{k}\\bigl(\\operatorname{Hom}(C^{\\mathrm{sing}}_{\\bullet}(M),\\mathbb{R})\\bigr)$ 是奇异链复形（`def.singular-chain`）取对偶后的上同调（`def.cohomology`），$\\int_{c}\\omega$ 是形式在链上的积分（`def.integral-on-chain`）。$\\Phi^{k}$ 与拉回相容，故 $k \\mapsto \\Phi^{k}$ 是一族自然同构：$H^{\\bullet}_{\\mathrm{dR}}$ 与 $H^{\\bullet}_{\\mathrm{sing}}$ 是同一个函子的两种算法。'
      ].join('\n'),
      notes: [
        '**证明路线的骨架**（细节写在边上）：',
        '',
        ['1. **配对先良定义**：$\\int_{c}\\omega$ 只依赖 $[\\omega]$ 与 $[c]$ —— 换 $c$ 为同调等价的链差一个边界，而闭形式在边界上的积分为零（`thm.stokes-chain` 的一个方向）；换 $\\omega$ 为相差 $\\mathrm{d}\\eta$ 的形式，差为 $\\int_{c}\\mathrm{d}\\eta = \\int_{\\partial c}\\eta = 0$（同一条 Stokes 的另一个方向）。',
         '2. **认成层上同调**：$\\Omega^{\\bullet}$ 是常层 $\\underline{\\mathbb{R}}$ 的消解（正合性逐点成立，逐点核为 $\\mathbb{R}$，就是 Poincaré 引理 `lem.poincare-lemma`），于是 $H^{\\bullet}_{\\mathrm{dR}}(M) \\cong H^{\\bullet}(M;\\underline{\\mathbb{R}})$。',
         '3. **Čech–de Rham 双复形**：取「好的覆盖」，把 $\\check{C}^{p}(\\mathfrak{U},\\Omega^{q})$ 排成双复形（横向 Čech 微分、纵向 $\\mathrm{d}$），两条谱序列算出同一个全上同调，得到 $H^{\\bullet}_{\\mathrm{dR}}(M) \\cong \\check{H}^{\\bullet}(M;\\underline{\\mathbb{R}})$。',
         '4. **Čech = 层上同调**：仿紧流形上 $\\check{H}^{\\bullet} \\cong H^{\\bullet}$（`thm.paracompact-cech-equals-sheaf`）。',
         '5. **层上同调 = 奇异上同调**：常层的层上同调由「同伦不变 $+$ 单点的值 $+$ 长正合列」唯一确定，奇异上同调满足同一组公理 —— 两者同构（代数拓扑的标准定理，本图不证）。'].join('\n'),
        '',
        '**为什么它是定理而不是定义**：两边的复形长得完全不同（一边是光滑形式、一边是拓扑单形），能对上不是形式化的。核心内容是第 2 步：「$\\Omega^{\\bullet}$ 是常层的消解」—— 也就是 Poincaré 引理的**整体化**。',
        '',
        '**推论**：$H^{k}_{\\mathrm{dR}}$ 是同伦不变量（函子性 + 同伦不变），紧流形上每个 $H^{k}_{\\mathrm{dR}}$ 有限维，$k > \\dim M$ 时为零。所以「闭而不恰当的形式有多少种」是纯拓扑数据 —— Betti 数。',
        '',
        '**与 131 那三条 de Rham 节点接得上**：$H^{0}$ 数连通分支（`thm.de-rham-h0`）、局部为零（`lem.poincare-lemma`）、加减开集有长正合列（`thm.mayer-vietoris`）—— 这三条恰好是上面路线里第 2、5 步的局部版本。',
        '',
        '⚠️ **本图的折衷**：这里给的是路线与关键计算，**不**给逐字证明。Čech–de Rham 双复形的谱序列论证、以及「层上同调 = 奇异上同调」都需要单独篇幅；这一条与 `thm.solid-abelian` 那批深定理同一口径：**结构 + 关键计算 + 出处**，如实声明。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「de Rham Cohomology」· de Rham 定理',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「de Rham Cohomology」· Poincaré 引理与 Mayer–Vietoris 序列'
      ]
    },

    /* ======================================================================
       §D 张量运算、流与 Lie 导数
       ====================================================================== */

    {
      id: 'def.tensor-contraction',
      cluster: 'diffgeom.vector',
      type: 'definition',
      label: '缩并',
      title: '张量缩并',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '张量场', '缩并', '取迹', 'Ricci'],
      statement: [
        '**白话**：张量上有一个上标和一个下标时，可以把它们「配对吃掉」，得到一个少两阶的张量 —— 这就是缩并；矩阵的取迹是它最熟悉的特例。',
        '',
        '设 $T$ 是 $M$ 上的 $(r,s)$ 型张量场（`def.tensor-field`），$r, s \\ge 1$。取定第 $i$ 个上标（$1 \\le i \\le r$）与第 $j$ 个下标（$1 \\le j \\le s$），**缩并** $\\mathrm{C}^{i}_{\\ j}T$ 是 $(r-1,s-1)$ 型张量场，逐点定义为',
        '',
        '$$\\bigl(\\mathrm{C}^{i}_{\\ j}T\\bigr)_{p}\\bigl(\\alpha^{1},\\ldots,\\widehat{\\alpha^{i}},\\ldots;\\ v_{1},\\ldots,\\widehat{v_{j}},\\ldots\\bigr) := \\sum_{a=1}^{n} T_{p}\\bigl(\\ldots,\\mathrm{d}x^{a},\\ldots;\\ \\ldots,\\partial_{a},\\ldots\\bigr),$$',
        '',
        '即把第 $i$ 个余向量槽与第 $j$ 个向量槽**用同一组基配对求和**（帽子记「去掉这一项」）。在卡里就是',
        '',
        '$$\\bigl(\\mathrm{C}^{i}_{\\ j}T\\bigr)^{\\ldots}_{\\ldots} = \\sum_{a=1}^{n} T^{\\ldots\\,a\\,\\ldots}_{\\ldots\\,a\\,\\ldots},$$',
        '',
        '一上一下两个指标同名求和 —— 爱因斯坦求和约定。'
      ].join('\n'),
      notes: [
        '**为什么必须一上一下**：缩并的实质是用配对 $\\mathrm{d}x^{a}(\\partial_{b}) = \\delta^{a}_{\\ b}$ 吃掉一对指标，而这样的配对只存在于「一个余向量槽、一个向量槽」之间。两个上标想配对，得先借度量把其中一个拉下来（$T^{ab} \\mapsto g_{ac}T^{cb}$ 再缩并，得 $T^{a}_{\\ a}$）—— 那是**用了额外结构**的运算，不是张量代数自带的。',
        '',
        '**$(1,1)$ 型时就是取迹**：$\\mathrm{C}^{1}_{\\ 1}T = \\operatorname{tr}T$（把 $T$ 看成逐点的线性变换 $T_{p}M \\to T_{p}M$）。所以缩并是取迹的推广，`def.trace` 里那条「$\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$」在这里读作「缩并的次序可以调换」。',
        '',
        '**例子**：曲率张量是 $(1,3)$ 型的，缩并一次（上标与第二个下标）得 Ricci 张量（`def.ricci-curvature`），再缩并一次得标量曲率。Einstein 张量是 Ricci 张量与 $g$ 的组合 —— 所以「曲率的三个层次」就是「缩并 $0/1/2$ 次」。',
        '',
        '**与坐标无关**：换卡时上标各乘一次 $\\partial y/\\partial x$、下标各乘一次 $\\partial x/\\partial y$；被缩的那一对恰好一个上标一个下标，两个 Jacobi 矩阵互逆，乘起来是 $\\delta$。这一步是「缩并是张量运算」的全部内容（对照 `def.tensor-field` 的 notes：变化律只含一阶导）。',
        '',
        '⚠️ 记号冲突：`def.trace` 是「矩阵取迹」，这里的缩并是它在张量场上的推广；而 $\\mathrm{C}^{i}_{\\ j}$ 里的 $\\mathrm{C}$ 不是「连续函数空间」的 $C$。三处同字母，取用时看上下文。',
        '',
        '**和楔积的关系**：楔积是「交错化加张量积」，缩并是「配对吃掉一对指标」。两者生成张量代数上的全部自然运算 —— 这条是古典不变量理论的结论，本图只提不证。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 张量场的缩并与取迹',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 张量丛的截面'
      ]
    },

    {
      id: 'def.interior-product',
      cluster: 'diffgeom.vector',
      type: 'definition',
      label: '内乘',
      title: '内乘（内积）',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '内乘', '内积', '反导子', '微分形式'],
      statement: [
        '**白话**：把一个向量场塞进形式的第一个槽，次数降一 —— 这就是内乘。它是 Cartan 公式里与外微分配对的那一半。',
        '',
        '设 $X \\in \\mathfrak{X}(M)$、$\\omega \\in \\Omega^{k}(M)$（$k \\ge 1$）。**内乘**（也叫内积）$\\iota_{X}\\omega \\in \\Omega^{k-1}(M)$ 逐点定义为',
        '',
        '$$(\\iota_{X}\\omega)_{p}(v_{2},\\ldots,v_{k}) := \\omega_{p}\\bigl(X_{p},v_{2},\\ldots,v_{k}\\bigr);$$',
        '',
        '对函数规定 $\\iota_{X}f := 0$。性质（$\\omega$ 是 $k$-形式、$\\eta$ 是 $\\ell$-形式、$f, g$ 光滑）：',
        '',
        ['1. **反导子**：$\\iota_{X}(\\omega\\wedge\\eta) = (\\iota_{X}\\omega)\\wedge\\eta + (-1)^{k}\\,\\omega\\wedge(\\iota_{X}\\eta)$；',
         '2. $\\iota_{X}^{2} = 0$；',
         '3. **$C^{\\infty}(M)$-线性**：$\\iota_{fX+gY} = f\\,\\iota_{X} + g\\,\\iota_{Y}$；',
         '4. **坐标公式**：$\\iota_{\\partial_{i}}\\mathrm{d}x^{j} = \\delta^{j}_{\\ i}$，并且',
         '$$\\iota_{\\partial_{i}}\\bigl(\\mathrm{d}x^{j_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{j_{k}}\\bigr) = \\sum_{r=1}^{k}(-1)^{r-1}\\delta^{j_{r}}_{\\ \\ i}\\ \\mathrm{d}x^{j_{1}}\\wedge\\cdots\\widehat{\\mathrm{d}x^{j_{r}}}\\cdots\\wedge\\mathrm{d}x^{j_{k}}.$$'].join('\n'),
        '',
        '名字叫**内积**（interior product），但它与内积空间里的 $\\langle\\cdot,\\cdot\\rangle$ **不是**一回事：前者吃「一个向量 $+$ 一个形式」吐一个低一阶的形式，后者吃「两个向量」吐一个数。'
      ].join('\n'),
      notes: [
        '**为什么它是「逐点」的而 Lie 导数是「整体」的**：内乘只用 $X_{p}$ 就能算出 $(\\iota_{X}\\omega)_{p}$，所以它是张量运算（对 $X$ 也 $C^{\\infty}$-线性），不需要解任何方程；Lie 导数（`def.lie-derivative`）要对流求导，只对向量场有定义、且对 $X$ 只 $\\mathbb{R}$-线性。这条区别在 Cartan 公式（`thm.cartan-formula`）里正好互补：$\\mathrm{d}\\iota_{X}$ 是「先缩再导」，$\\iota_{X}\\mathrm{d}$ 是「先导再缩」。',
        '',
        '**$\\iota_{X}^{2} = 0$ 的理由**：缩两次等于同一个槽被塞进两个向量，而形式是交错的，把两次缩并交换次序会出 $-$ 号，于是 $(\\iota_{X}^{2}\\omega)(v_{3},\\ldots) = \\omega(X,X,v_{3},\\ldots) = 0$（交错性 + 同一向量自配为零）。',
        '',
        '**物理记号里它就是「缩一个指标」**：电磁场 $F = \\frac{1}{2}F_{ij}\\,\\mathrm{d}x^{i}\\wedge\\mathrm{d}x^{j}$ 与 $\\iota_{E}F$ 给出「电场方向上的磁场通量」这类量；Maxwell 方程组里 $\\mathrm{d}F = 0$、$\\mathrm{d}\\star F = J$，其中 $\\star$ 依赖度量，而 $\\iota$ 与 $\\mathrm{d}$ 是纯组合的。',
        '',
        '**与缩并（`def.tensor-contraction`）的关系**：$\\iota_{X}\\omega$ 就是把 $X$ 塞进第一个槽再缩并 —— 它是张量缩并在交错张量上的特例，只是塞进去的向量不必是基向量。',
        '',
        '**与楔积的搭配**：$\\mathrm{d}\\iota_{X} + \\iota_{X}\\mathrm{d}$ 这个组合之所以自然，是因为 $\\mathrm{d}$ 是 $+1$ 次反导子、$\\iota_{X}$ 是 $-1$ 次反导子，两个反导子复合出「次数 $0$ 的导子」—— 与 Lie 导数同一个类型。Cartan 公式的证明就是拿这个类型去比对。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 内乘与反导子',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 内乘的坐标公式'
      ]
    },

    {
      id: 'def.flow',
      cluster: 'diffgeom.vector',
      type: 'definition',
      label: '流',
      title: '流与单参数群',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '向量场', '流', '单参数群', '积分曲线', '完备'],
      statement: [
        '**白话**：向量场给每点一个「该往哪走」，沿着走得出的曲线叫积分曲线；把「从 $p$ 出发走 $t$ 时间到哪」记成 $\\varphi_{t}(p)$，这一族映射就是流。它是向量场的「解」。',
        '',
        '设 $X \\in \\mathfrak{X}(M)$（`def.vector-field`）。',
        '',
        '**积分曲线**：光滑曲线 $\\gamma : J \\to M$（$J \\subseteq \\mathbb{R}$ 开区间）叫 $X$ 的积分曲线，如果',
        '',
        '$$\\dot\\gamma(t) = X\\bigl(\\gamma(t)\\bigr)\\qquad (t \\in J).$$',
        '',
        '**流**：$X$ 的流是光滑映射 $\\varphi : \\mathcal{W} \\to M$，其中 $\\mathcal{W} \\subseteq \\mathbb{R}\\times M$ 是开集、$\\{0\\}\\times M \\subseteq \\mathcal{W}$，满足',
        '',
        '$$\\varphi(0,p) = p,\\qquad \\frac{\\partial}{\\partial t}\\varphi(t,p) = X\\bigl(\\varphi(t,p)\\bigr),$$',
        '',
        '记 $\\varphi_{t}(p) := \\varphi(t,p)$。于是 $t \\mapsto \\varphi_{t}(p)$ 是过 $p$ 的积分曲线。',
        '',
        '**单参数群（局部）性质**：在两边都有定义的范围内',
        '',
        '$$\\varphi_{s+t} = \\varphi_{s}\\circ\\varphi_{t},\\qquad \\varphi_{0} = \\operatorname{id},\\qquad \\varphi_{-t} = \\varphi_{t}^{-1}.$$',
        '',
        '**完备**：若 $\\mathcal{W} = \\mathbb{R}\\times M$（每条积分曲线都能延拓到整个 $\\mathbb{R}$），称 $X$ **完备**；此时 $t \\mapsto \\varphi_{t}$ 是 $\\mathbb{R}$ 到 $\\operatorname{Diff}(M)$ 的群同态，叫 $X$ 生成的**单参数微分同胚群**。'
      ].join('\n'),
      notes: [
        '**「局部」两个字不能省**：$\\mathcal{W}$ 一般不是整个 $\\mathbb{R}\\times M$。最简单的反例是 $M = \\mathbb{R}$、$X = x^{2}\\partial_{x}$：过 $x_{0} > 0$ 的解是 $\\gamma(t) = x_{0}/(1 - x_{0}t)$，在 $t = 1/x_{0}$ 处爆破，走不过去。所以流天生是局部的，完备性是要证明或假设的性质（`thm.flow-complete`）。',
        '',
        '**单参数群性质为什么只是局部的**：$\\varphi_{s+t}(p)$ 要在 $s+t$ 处有定义，$\\varphi_{s}(\\varphi_{t}(p))$ 还要求中间点有定义。两条曲线 $\\tau \\mapsto \\varphi_{s+\\tau}(p)$ 与 $\\tau \\mapsto \\varphi_{\\tau}(\\varphi_{s}(p))$ 满足同一个初值问题，由唯一性相等 —— 唯一性是 `thm.flow-local` 给的。',
        '',
        '**光滑依赖初值**：$\\varphi$ 对 $(t,p)$ 光滑（不只是每个 $p$ 单独有解），这是把 ODE 理论搬上流形时最常被漏掉的一条；它保证 $\\varphi_{t}$ 是**局部微分同胚**，因而 $\\mathrm{d}\\varphi_{t}$ 有意义 —— Lie 导数（`def.lie-derivative`）正是拿它求导。',
        '',
        '**流的三个用途**：① 把向量场「积分」成变换（单参数群）；② 定义 Lie 导数与括号（用 $\\varphi^{X}_{t}$ 把 $Y$ 推来推去再对 $t$ 求导）；③ 判断完备性与整体存在（测地流、Hamilton 流都走这条）。所以「流」是向量场这一族的**表示论**。',
        '',
        '⚠️ 记号：本图用 $\\varphi_{t}$ 记流（小写 phi 一律写 `\\varphi`，见 `notation.js` 的禁用表）；曲面论里的参数化也爱用 $\\varphi$，取用时看星团。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 向量场的流与单参数群',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Tangent Vectors」· 积分曲线'
      ]
    },

    {
      id: 'thm.flow-local',
      cluster: 'diffgeom.vector',
      type: 'theorem',
      label: '局部流',
      title: '流的局部存在唯一性',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', '流', '积分曲线', '常微分方程', 'Picard–Lindelöf'],
      statement: [
        '**白话**：向量场的积分曲线在局部一定存在、一定唯一，而且这一族解光滑地依赖起点与时间 —— 也就是说，局部一定有流。',
        '',
        '设 $X \\in \\mathfrak{X}(M)$，$p \\in M$。则存在 $p$ 的开邻域 $U$、$\\varepsilon > 0$ 与光滑映射 $\\varphi : (-\\varepsilon,\\varepsilon)\\times U \\to M$，使',
        '',
        ['1. $\\varphi_{0} = \\operatorname{id}_{U}$；',
         '2. $\\dfrac{\\partial}{\\partial t}\\varphi_{t}(q) = X\\bigl(\\varphi_{t}(q)\\bigr)$ 对一切 $t \\in (-\\varepsilon,\\varepsilon)$、$q \\in U$ 成立；',
         '3. **唯一性**：过同一点的两条积分曲线在公共定义区间上相同；',
         '4. **局部单参数群**：$|s|, |t|, |s+t| < \\varepsilon$ 且中间点都落在 $U$ 内时，$\\varphi_{s+t} = \\varphi_{s}\\circ\\varphi_{t}$。'].join('\n'),
        '',
        '并且把各点的局部流沿曲线拼接，得到唯一的**极大流**（定义域 $\\mathcal{W} \\subseteq \\mathbb{R}\\times M$ 开，见 `def.flow`）。'
      ].join('\n'),
      notes: [
        '**这是纯 ODE 定理**：在卡 $(V,x)$ 里 $X = \\sum_{i}X^{i}\\partial_{i}$，方程化为自治方程组',
        '',
        '$$\\dot y^{i}(t) = X^{i}\\bigl(y(t)\\bigr)\\qquad (i = 1,\\ldots,n),$$',
        '',
        '右端光滑（$X^{i}$ 光滑），于是 Picard–Lindelöf 给出局部存在唯一，加上「解对初值 $C^{\\infty}$ 依赖」给出 $\\varphi$ 的光滑性。全程只有一处用到流形：**在卡里做**。',
        '',
        '**「自治」是单参数群性质的来源**：非自治方程 $\\dot y = f(t,y)$ 的解不构成群（先走 $s$ 再走 $t$ 与直接走 $s+t$ 不同，因为「环境」在变）。向量场的流是自治方程，所以对时间平移不变 —— 这就是 $\\varphi_{s}\\circ\\varphi_{t} = \\varphi_{s+t}$。',
        '',
        '**极大流为什么唯一**：两个极大流在交点处解的初值问题相同，由唯一性局部重合；再把所有局部解沿曲线接起来，得到定义域极大的那一个。定义域 $\\mathcal{W}$ 是开的：每点附近有存在性给的一个时间区间，而这个时间可以取得对 $p$ 下半连续。',
        '',
        '**代价**：本图不证 Picard–Lindelöf（那是常微分方程课的定理），只做「把流形上的流化成 $\\mathbb{R}^{n}$ 上的自治方程组」这一步化归。同类折衷见 `prop.geodesic-existence`（测地线的存在唯一性也是这么处理的）。',
        '',
        '⚠️ 唯一性说的是「**同一条曲线**意义下的唯一」：换参数化得到的仍是同一条曲线的重参数化，不是第二个解。$\\varphi_{t}(q)$ 已经把参数固定成「流的时间」，所以没有这层歧义。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 流的局部存在唯一性',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 局部坐标下的常微分方程组'
      ]
    },

    {
      id: 'thm.flow-complete',
      cluster: 'diffgeom.vector',
      type: 'theorem',
      label: '流完备性',
      title: '流的完备性与紧流形',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', '流', '完备性', '紧流形', '逃逸引理'],
      statement: [
        '**白话**：一条积分曲线走不下去，只可能是「跑向无穷远」，不会是「走到时间的尽头」；于是在紧流形上没有地方可逃，每个向量场都完备。',
        '',
        '设 $X \\in \\mathfrak{X}(M)$，$\\varphi : \\mathcal{W} \\to M$ 是它的极大流（`def.flow`），$J_{q} = (a_{q},b_{q})$ 是过 $q$ 的极大积分曲线的存在区间。则：',
        '',
        ['1. **区间是开的**：$J_{q}$ 是开区间（$a_{q} \\in [-\\infty,+\\infty)$、$b_{q} \\in (-\\infty,+\\infty]$）；',
         '2. **逃逸引理**：若 $b_{q} < +\\infty$，则 $t \\to b_{q}^{-}$ 时曲线离开每个紧集 —— 即对任意紧集 $K \\subseteq M$ 与任意 $t_{1} < b_{q}$，存在 $t_{2} \\in (t_{1},b_{q})$ 使 $\\varphi_{t_{2}}(q) \\notin K$（$t \\to a_{q}^{+}$ 一端同理）；',
         '3. **完备判据**：$X$ 完备（$\\mathcal{W} = \\mathbb{R}\\times M$）当且仅当对每点 $q$ 有 $a_{q} = -\\infty$ 且 $b_{q} = +\\infty$。'].join('\n'),
        '',
        '**推论**：$M$ 紧时**每个** $X \\in \\mathfrak{X}(M)$ 都完备；$M$ 非紧时可以不完备（$M = (0,1)$、$X = \\partial_{x}$；$M = \\mathbb{R}$、$X = x^{2}\\partial_{x}$）。'
      ].join('\n'),
      notes: [
        '**第 1 条只是「极大」的读法**：$J_{q}$ 若是 $(a_{q},b_{q}]$，则在 $b_{q}$ 处曲线还有定义，而 `thm.flow-local` 允许把它再延拓一点 —— 与极大矛盾。',
        '',
        '**第 2 条是本节真正的技术内容**：不是「跑向无穷」，而是「跑进某个紧集里也走不下去」这种情况不存在。证明是「有限覆盖给一致时间步长」—— 紧集用有限张卡盖住，每张卡给一个统一的时间 $\\varepsilon > 0$，于是曲线只要待在紧集里就能一步步跨过端点。',
        '',
        '**第 3 条是定义的改写**，但它是**可判定**的形式：实际用的时候都走第 2 条（「能不能逃出去」）。',
        '',
        '**紧流形为什么完备**：若 $b_{q} < +\\infty$，由第 2 条曲线必须离开每个紧集；取 $K = M$（紧），这要求 $\\varphi_{t}(q) \\notin M$ —— 不可能。所以 $b_{q} = +\\infty$，$a_{q}$ 同理。这就是「紧流形上谈单参数群不必担心定义域」的全部依据。',
        '',
        '**非紧时的两个反例**：$M = (0,1)$、$X = \\partial_{x}$ 的解 $\\gamma(t) = t + 1/2$ 在 $t = 1/2$ 处撞到端点（端点不在 $M$ 里）；$M = \\mathbb{R}$、$X = x^{2}\\partial_{x}$ 的解在有限时刻爆破。前者是「流形本身的洞」，后者是「场长得太快」—— 两种病不同，但都表现为「在有限时刻离开每个紧集」。',
        '',
        '**Riemann 情形**：$(M,g)$ 度量完备时测地流也完备（Hopf–Rinow 的一半）。本图只用「紧 $\\implies$ 完备」这一条，Hopf–Rinow 不展开。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· 流的极大性与完备性',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Manifolds」· 紧性与局部有限覆盖'
      ]
    },

    {
      id: 'def.lie-derivative',
      cluster: 'diffgeom.vector',
      type: 'definition',
      label: 'Lie 导数',
      title: 'Lie 导数',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', 'Lie 导数', '流', '张量场', '导子'],
      statement: [
        '**白话**：Lie 导数就是「沿 $X$ 的流把张量拖回来，再对时间求导」—— 它量的是张量在流下的变化率；对函数它是方向导数，对向量场它就是 Lie 括号。',
        '',
        '设 $X \\in \\mathfrak{X}(M)$，$\\varphi_{t}$ 是它的（局部）流（`def.flow`）。对张量场 $T$（`def.tensor-field`）定义 **Lie 导数**',
        '',
        '$$(\\mathcal{L}_{X}T)_{p} := \\left.\\frac{\\mathrm{d}}{\\mathrm{d}t}\\right|_{t=0}\\bigl(\\varphi_{t}^{\\ast}T\\bigr)_{p},$$',
        '',
        '其中 $\\varphi_{t}^{\\ast}$ 是「沿微分同胚的拉回」：函数与形式用拉回，向量场则用 $\\mathrm{d}\\varphi_{-t}$ 推过去（向量场没有拉回，只有推前）。逐类写出：',
        '',
        ['- **函数**：$\\mathcal{L}_{X}f = Xf$；',
         '- **向量场**：$\\mathcal{L}_{X}Y = [X,Y]$（`def.lie-bracket`）；',
         '- **$1$-形式**：$(\\mathcal{L}_{X}\\omega)(Y) = X\\bigl(\\omega(Y)\\bigr) - \\omega\\bigl([X,Y]\\bigr)$；',
         '- **张量积**：$\\mathcal{L}_{X}(T\\otimes S) = (\\mathcal{L}_{X}T)\\otimes S + T\\otimes(\\mathcal{L}_{X}S)$，且 $\\mathcal{L}_{X}$ 与缩并交换。'].join('\n'),
        '',
        '于是 $\\mathcal{L}_{X}$ 是张量代数上**次数 $0$ 的导子**，并满足',
        '',
        '$$\\mathcal{L}_{[X,Y]} = [\\mathcal{L}_{X},\\mathcal{L}_{Y}]$$',
        '',
        '（括号给出导子的交换子）。'
      ].join('\n'),
      notes: [
        '**三类的统一**：函数与形式的拉回是 $\\omega \\mapsto \\varphi_{t}^{\\ast}\\omega$，向量场没有拉回（要用推前 $\\mathrm{d}\\varphi_{t}$），所以定义里得按类型选方向。但**结果**是统一的：$\\mathcal{L}_{X}$ 是张量代数上的导子，作用在函数上是 $X$，作用在向量场上就是括号 —— 两条都是从同一个「拖回来求导」算出来的。',
        '',
        '**为什么 $\\mathcal{L}_{X}$ 对 $X$ 不是 $C^{\\infty}$-线性的**：$\\mathcal{L}_{fX}T \\ne f\\,\\mathcal{L}_{X}T$（例如 $\\mathcal{L}_{fX}Y = f[X,Y] - (Yf)X$）。所以 $X \\mapsto \\mathcal{L}_{X}$ 不是张量，而是 Lie 代数同态 $\\mathfrak{X}(M) \\to \\operatorname{Der}(\\Omega^{\\bullet}M)$ —— 这与 `def.lie-bracket` 的 notes 里「括号不是张量」是同一条性质。',
        '',
        '**与协变导数的区别**：$\\nabla_{X}T$ 需要额外结构（连络，`def.affine-connection`），但对函数两者给出同样的东西（都是 $Xf$），对向量场不同（$\\nabla_{X}Y$ 与 $[X,Y]$ 差一个「形变」项）。Lie 导数是流形的**内在**运算 —— 不需要度量、不需要连络，这是它比 $\\nabla$ 更「免费」的地方。',
        '',
        '**分量公式（$1$-形式）**：',
        '',
        '$$\\mathcal{L}_{X}\\omega = \\sum_{j}\\Bigl(\\sum_{i}X^{i}\\partial_{i}\\omega_{j} + \\sum_{i}\\omega_{i}\\,\\partial_{j}X^{i}\\Bigr)\\mathrm{d}x^{j}.$$',
        '',
        '第二项是「$\\mathrm{d}x^{j}$ 随流变形」的修正；少了它就得到「对 $X$ 是 $C^{\\infty}$-线性」的假结论。',
        '',
        '**流的定义域不完整时也成立**：$\\varphi_{t}$ 只需在 $p$ 附近、$|t| < \\varepsilon$ 有定义（`thm.flow-local` 就够），因为 Lie 导数只用 $t = 0$ 处的导数。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Lie Groups and Lie Algebras」· Lie 导数',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 形式的 Lie 导数'
      ]
    },

    {
      id: 'thm.cartan-formula',
      cluster: 'diffgeom.vector',
      type: 'theorem',
      label: 'Cartan 公式',
      title: 'Cartan 公式',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', 'Cartan 公式', 'Lie 导数', '内乘', '外微分'],
      statement: [
        '**白话**：Lie 导数可以拆成「先缩再外微分」加「先外微分再缩」两部分 —— 一条公式把三个算子捆在一起，代价为零。',
        '',
        '设 $X \\in \\mathfrak{X}(M)$、$\\omega \\in \\Omega^{k}(M)$（$k \\ge 0$）。则',
        '',
        '$$\\mathcal{L}_{X}\\omega = \\mathrm{d}\\bigl(\\iota_{X}\\omega\\bigr) + \\iota_{X}\\bigl(\\mathrm{d}\\omega\\bigr),$$',
        '',
        '等价地，作为 $\\Omega^{\\bullet}(M)$ 上的算子',
        '',
        '$$\\mathcal{L}_{X} = \\mathrm{d}\\,\\iota_{X} + \\iota_{X}\\,\\mathrm{d},$$',
        '',
        '其中 $\\mathcal{L}_{X}$ 是 Lie 导数（`def.lie-derivative`）、$\\iota_{X}$ 是内乘（`def.interior-product`）、$\\mathrm{d}$ 是外微分（`def.exterior-derivative`），并规定 $\\iota_{X}$ 作用在函数上为 $0$。',
        '',
        '**推论**：',
        '',
        ['1. $\\mathcal{L}_{X}\\mathrm{d} = \\mathrm{d}\\mathcal{L}_{X}$（因为 $\\mathrm{d}^{2} = 0$）；',
         '2. 在闭形式上有 $\\mathcal{L}_{X}\\omega = \\mathrm{d}\\iota_{X}\\omega$，即 $\\mathcal{L}_{X}\\omega$ 恰当；',
         '3. $\\mathcal{L}_{X}$ 保持闭形式空间与恰当形式空间。'].join('\n')
      ].join('\n'),
      notes: [
        '**证明的形状**（写在边上）：两边都是「与 $\\mathrm{d}$ 交换的次数 $0$ 的导子」，所以只要在函数上验一遍 —— 这是 Cartan 公式三行证完的原因。注意「与 $\\mathrm{d}$ 交换」在左边用了「流拉回与外微分交换」，在右边用了 $\\mathrm{d}^{2} = 0$。',
        '',
        '**它是「同伦算子」的原型**：$\\mathrm{d}\\iota_{X} + \\iota_{X}\\mathrm{d} = \\mathcal{L}_{X}$ 的形状与 Poincaré 引理的 $\\mathrm{d}K + K\\mathrm{d} = \\operatorname{id}$（`lem.poincare-lemma`）完全一样 —— 都把「求导」拆成两条链映射之和。差别在于 $\\mathcal{L}_{X}$ 不必是 $\\operatorname{id}$：给定 $\\mathcal{L}_{X}$ 后想解 $\\iota_{X}\\omega = \\eta$，就是一个「同伦方程」。',
        '',
        '**为什么物理里爱用它**：$\\mathcal{L}_{X}$ 是沿流的变化率，$\\mathrm{d}\\iota_{X}$ 与 $\\iota_{X}\\mathrm{d}$ 分掉了「恰当部分」与「闭部分」。像「场的对称性」这类陈述（$\\mathcal{L}_{X}F = 0$）以及规范变换的存在性，都从这条公式出发。',
        '',
        '**两个边界情形**：$k = 0$ 时 $\\iota_{X}f = 0$，故 $\\mathcal{L}_{X}f = \\iota_{X}\\mathrm{d}f = \\mathrm{d}f(X) = Xf$，与 `def.lie-derivative` 的第一条一致；$k = n$ 时 $\\mathrm{d}\\omega = 0$，故 $\\mathcal{L}_{X}\\omega = \\mathrm{d}\\iota_{X}\\omega$ 恰当 —— 这是「体积沿流的变率等于散度乘体积」那条公式的起点。',
        '',
        '⚠️ 符号约定：本图的 $\\iota_{X}$ 用「塞进第一个槽」的约定，故 $(\\mathcal{L}_{X}\\omega)(Y) = X\\omega(Y) - \\omega([X,Y])$；若有人把内乘定义成「塞进最后一个槽」，那 Cartan 公式要补一个 $(-1)^{k}$。抄公式前先看对方的内乘约定。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· Cartan 公式',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 内乘与 Lie 导数的关系'
      ]
    },

    /* ======================================================================
       §E 子流形的诱导体积
       ====================================================================== */

    {
      id: 'def.submanifold-volume',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '诱导体积',
      title: '子流形的诱导体积',
      regions: ['diffgeom'],
      tags: ['定义', '微分流形', '体积', '子流形', '诱导度量', '面积元'],
      statement: [
        '**白话**：子流形上的体积不能靠「把 $n$-形式拉回来」得到（拉回来是零），必须用**诱导度量**重新算一个 $k$ 维的体积；这一步就是「$k$ 维薄片上的积分」的全部内容。',
        '',
        '设 $i : N^{k} \\to (M^{n},g)$ 是浸入子流形（$k \\le n$），$g$ 是黎曼度量（`def.riemannian-metric`）。**诱导度量**是',
        '',
        '$$g_{N} := i^{\\ast}g,\\qquad (g_{N})_{p}(u,v) := g_{i(p)}\\bigl(\\mathrm{d}i_{p}u,\\ \\mathrm{d}i_{p}v\\bigr),$$',
        '',
        '它是 $N$ 上的黎曼度量（$\\mathrm{d}i$ 单射保证正定）。给 $N$ 取定定向后，$N$ 的**体积形式**在保向卡 $(U,x)$ 里是',
        '',
        '$$\\mathrm{d}V_{N} := \\sqrt{\\det\\bigl(g_{ab}\\bigr)}\\ \\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k},\\qquad g_{ab} := g\\Bigl(\\frac{\\partial i}{\\partial x^{a}},\\ \\frac{\\partial i}{\\partial x^{b}}\\Bigr),$$',
        '',
        '与 `def.volume-form` 的定义逐字相同，只是把 $M$ 换成 $N$、$g$ 换成 $g_{N}$。不定向时改用**密度**',
        '',
        '$$\\mathrm{d}A_{N} := \\sqrt{\\det\\bigl(g_{ab}\\bigr)}\\ \\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{k},$$',
        '',
        '即 `def.volume-density` 在 $N$ 上的版本；$N$ 的 $k$ 维**体积**是 $\\mu_{N}(N) = \\int_{N}\\mathrm{d}A_{N}$。'
      ].join('\n'),
      notes: [
        '**为什么不能拉回体积形式**：$i^{\\ast}$ 把 $M$ 的 $n$-形式拉成 $N$ 上的 $n$-形式，而 $\\dim N = k < n$ 时 $k$ 维流形上没有非零的 $n$-形式 —— 所以 $i^{\\ast}(\\mathrm{d}V_{g}) = 0$。次数必须先降下来：要么用 $\\iota_{\\nu}$ 沿法向缩一次（超曲面情形），要么换诱导度量重算。这是最常卡住的一步。',
        '',
        '**超曲面（$k = n-1$）的特例**：取单位法向 $\\nu$，则',
        '',
        '$$\\mathrm{d}V_{N} = \\pm\\,\\iota_{\\nu}\\,\\mathrm{d}V_{g},$$',
        '',
        '符号取决于 $\\nu$ 与 $N$ 的定向是否相容。这就是 Gauss 公式与散度定理（`thm.divergence-theorem`）里「边界上的面积元」的来历：内乘（`def.interior-product`）把 $n$-形式沿法向缩成 $(n-1)$-形式。',
        '',
        '**二维情形就是面积元**：$i : S \\to \\mathbb{R}^{3}$ 时 $g_{ab}$ 是曲面的第一基本形式 $E, F, G$，$\\sqrt{\\det} = \\sqrt{EG - F^{2}}$，与 `def.area-element` 逐字相同。所以「曲面的面积」是这条的一般情形，不是另一套定义。',
        '',
        '**定向与密度必须分开**：$\\mathrm{d}V_{N}$ 要 $N$ 的定向（换向变号），$\\mathrm{d}A_{N}$ 不要（$\\sqrt{\\det}$ 恒非负）。$M$ 可定向**不**蕴含 $N$ 可定向：Möbius 带嵌在 $\\mathbb{R}^{3}$ 里就是反例（$\\mathbb{R}^{3}$ 可定向，Möbius 带不可）。',
        '',
        '**为什么单独立一个节点**：131 有 `def.volume-form`（全流形的黎曼体积）、132 有 `def.volume-density`（密度的换卡不变性）与 `def.area-element`（二维曲面），但「$k$ 维子流形的体积 = 诱导度量的体积」这一格是空的 —— 而它正是 Stokes 之后「在子流形上积分」的全部内容。',
        '',
        '⚠️ 本图只做「$k$ 维体积」这一层：余面积公式（coarea）、以及「把 $M$ 上的 $k$-形式积在 $N$ 上」的一般理论（要 $N$ 定向 + $i^{\\ast}$）不展开。'
      ].join('\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 子流形上的诱导度量与体积',
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 黎曼体积与正交余标架'
      ]
    }

  ],

  edges: [

    /* ============================================================
       定义引用（蓝线）—— 一律「已有节点 → 本批新节点」
       ============================================================ */

    {
      id: 'dep.mf2-tangentbundle-distribution',
      kind: 'definition',
      definition: 'def.tangent-bundle',
      usedBy: 'def.tangent-distribution',
      note: '分布是「每点一个子空间」再并起来，所以它天然住在 $TM$ 里；要谈光滑就必须把它看成 $TM$ 的子丛，而不只是一族子空间。'
    },
    {
      id: 'dep.mf2-vectorbundle-distribution',
      kind: 'definition',
      definition: 'def.vector-bundle',
      usedBy: 'def.tangent-distribution',
      note: '「$k$ 秩光滑子丛」这句话用的是向量丛的语言：局部平凡化、转移函数、截面模。分布的「秩」就是子丛的秩，与向量空间的维数同一个词。'
    },
    {
      id: 'dep.mf2-vf-distribution',
      kind: 'definition',
      definition: 'def.vector-field',
      usedBy: 'def.tangent-distribution',
      note: '光滑性的可用判据是「局部由 $k$ 个光滑向量场生成」—— 于是「分布的选取」变成「场的选取」，可以对它求导、取括号。'
    },
    {
      id: 'dep.mf2-vf-involutive',
      kind: 'definition',
      definition: 'def.vector-field',
      usedBy: 'def.involutive-distribution',
      note: '对合性说的是「落在 $\\mathcal{D}$ 里的向量场」这个集合的封闭性；没有向量场就没有 $\\Gamma(\\mathcal{D})$ 可说。'
    },
    {
      id: 'dep.mf2-bracket-involutive',
      kind: 'definition',
      definition: 'def.lie-bracket',
      usedBy: 'def.involutive-distribution',
      note: '判据就是「生成元的括号仍是生成元的组合」；Leibniz 律保证只需查生成元（见边 `imp.mf2-frobenius-flat` 的证明里那一步）。'
    },
    {
      id: 'dep.mf2-distribution-involutive',
      kind: 'definition',
      definition: 'def.tangent-distribution',
      usedBy: 'def.involutive-distribution',
      note: '对合是分布的属性：没有「$k$ 维子空间族」这个对象，就无从说括号落在哪里。'
    },
    {
      id: 'dep.mf2-immersion-integral',
      kind: 'definition',
      definition: 'def.submersion-immersion',
      usedBy: 'def.integral-manifold',
      note: '积分流形是**浸入**子流形（$\\mathrm{d}i$ 处处单射），不是任意子集；「浸入」这个词的出处就是 `def.submersion-immersion`。'
    },
    {
      id: 'dep.mf2-distribution-integral',
      kind: 'definition',
      definition: 'def.tangent-distribution',
      usedBy: 'def.integral-manifold',
      note: '「积分流形」永远是「某个分布 $\\mathcal{D}$ 的积分流形」；定义里 $\\mathrm{d}i(TN) = \\mathcal{D}$ 的右边就是分布。'
    },
    {
      id: 'dep.mf2-diff-integral',
      kind: 'definition',
      definition: 'def.differential-map',
      usedBy: 'def.integral-manifold',
      note: '条件写成 $\\mathrm{d}i_{p}(T_{p}N) = \\mathcal{D}_{i(p)}$，用的是切映射的像 —— 不写下 $\\mathrm{d}i$，就无法把「$N$ 的切空间」搬到 $M$ 里比较。'
    },
    {
      id: 'dep.mf2-chart-frobenius',
      kind: 'definition',
      definition: 'def.manifold-chart',
      usedBy: 'thm.frobenius',
      note: '定理的结论 (2) 是「存在坐标把分布拉直成坐标面」，这句话本身就是关于图卡（坐标）的断言；平坦坐标是图卡的一个特例。'
    },
    {
      id: 'dep.mf2-distribution-frobenius',
      kind: 'definition',
      definition: 'def.tangent-distribution',
      usedBy: 'thm.frobenius',
      note: '定理的主语是光滑 $k$ 阶切分布；「$k$ 维」这个前提在归纳证明里正好用来降秩。'
    },
    {
      id: 'dep.mf2-liegroup-liform',
      kind: 'definition',
      definition: 'def.lie-group',
      usedBy: 'def.left-invariant-form',
      note: '左不变性是「对左平移 $L_{g}$ 的拉回不变」；$L_{g}$ 光滑（因而可拉回）正是 Lie 群定义的一部分。'
    },
    {
      id: 'dep.mf2-dform-liform',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'def.left-invariant-form',
      note: '$k$-形式才谈得上左不变；$k = n$ 时那个左不变 $n$-形式同时是体积形式 —— 这条推论用的是形式论，不是群论。'
    },
    {
      id: 'dep.mf2-pullback-liform',
      kind: 'definition',
      definition: 'prop.pullback-forms',
      usedBy: 'def.left-invariant-form',
      note: '「$L_{g}^{\\ast}\\omega = \\omega$」用的是形式的拉回；拉回与外微分交换这一条又是 `thm.maurer-cartan` 证明里必需的。'
    },
    {
      id: 'dep.mf2-liform-maurercartan',
      kind: 'definition',
      definition: 'def.left-invariant-form',
      usedBy: 'thm.maurer-cartan',
      note: '方程左边是左不变余标架 $\\omega^{i}$ 的外微分，右边是结构常数 —— 两样都在左不变形式的定义里。'
    },
    {
      id: 'dep.mf2-liealgebra-maurercartan',
      kind: 'definition',
      definition: 'def.lie-algebra',
      usedBy: 'thm.maurer-cartan',
      note: '结构常数 $c^{i}_{\\ jk}$ 是 Lie 代数的括号在基下的坐标；MC 方程就是说「这些坐标决定了 $\\mathrm{d}\\omega^{i}$」。'
    },
    {
      id: 'dep.mf2-extd-maurercartan',
      kind: 'definition',
      definition: 'def.exterior-derivative',
      usedBy: 'thm.maurer-cartan',
      note: '方程是 $\\mathrm{d}$ 的等式；证明用的桥是「$\\mathrm{d}\\theta(X,Y) = X\\theta(Y) - Y\\theta(X) - \\theta([X,Y])$」，那是外微分的坐标无关刻画。'
    },
    {
      id: 'dep.mf2-liealgebra-liethird',
      kind: 'definition',
      definition: 'def.lie-algebra',
      usedBy: 'thm.lie-third',
      note: '定理的输入是「有限维实 Lie 代数」：反称加 Jacobi 两条公理就这些，不需要别的结构。'
    },
    {
      id: 'dep.mf2-liegroup-liethird',
      kind: 'definition',
      definition: 'def.lie-group',
      usedBy: 'thm.lie-third',
      note: '输出是「连通单连通的 Lie 群」：光滑流形、群结构、以及单连通这个拓扑条件一起构成结论的主语。'
    },
    {
      id: 'dep.mf2-leftinv-liethird',
      kind: 'definition',
      definition: 'prop.left-invariant-fields',
      usedBy: 'thm.lie-third',
      note: '$\\operatorname{Lie}(G) \\cong \\mathfrak{g}$ 这句话里的 $\\operatorname{Lie}(G)$ 就是「$T_{e}G$ 配上左不变向量场的括号」，出处是那条命题。'
    },
    {
      id: 'dep.mf2-vectorbundle-bundleclass',
      kind: 'definition',
      definition: 'def.vector-bundle',
      usedBy: 'thm.bundle-classification',
      note: '分类的对象是向量丛、用的数据是局部平凡化的转移函数与上闭链条件 —— 两者都在 `def.vector-bundle` 里。'
    },
    {
      id: 'dep.mf2-cech-bundleclass',
      kind: 'definition',
      definition: 'def.cech-cohomology',
      usedBy: 'thm.bundle-classification',
      note: '⚠️ 只借「$1$-上闭链模上边界」这个口径：那条定义取的是**阿贝尔**预层复形（$\\check{H}^{n}$ 是群），本条系数是非阿贝尔的 $\\operatorname{GL}(k)$，所以只有 $\\check{H}^{1}$ 是集合。这一点在节点 notes 里明写了。'
    },
    {
      id: 'dep.mf2-paracompact-bundleclass',
      kind: 'definition',
      definition: 'def.paracompact',
      usedBy: 'thm.bundle-classification',
      note: '分类要「取遍所有覆盖的加细」再取余极限；流形仿紧（第二可数 + Hausdorff + 局部欧氏），所以加细可以取成局部有限的，余极限才良定义。'
    },
    {
      id: 'dep.mf2-derham-derhamthm',
      kind: 'definition',
      definition: 'def.de-rham-complex',
      usedBy: 'thm.de-rham',
      note: '左边的 $H^{k}_{\\mathrm{dR}}$ 是「闭形式模恰当形式」，全部依赖 $\\mathrm{d}^{2} = 0$ 与商空间的构造。'
    },
    {
      id: 'dep.mf2-singchain-derhamthm',
      kind: 'definition',
      definition: 'def.singular-chain',
      usedBy: 'thm.de-rham',
      note: '右边的 $H^{k}_{\\mathrm{sing}}$ 是奇异链取对偶再取上同调；链群是「单形的形式和」，边界算子由 $\\partial^{2} = 0$ 支撑。'
    },
    {
      id: 'dep.mf2-cohomology-derhamthm',
      kind: 'definition',
      definition: 'def.cohomology',
      usedBy: 'thm.de-rham',
      note: '「取上同调」这个操作在两边的含义一致（$\\ker/\\operatorname{im}$）；同构说的是两个不同复形算出的同调群相同。'
    },
    {
      id: 'dep.mf2-integralonchain-derhamthm',
      kind: 'definition',
      definition: 'def.integral-on-chain',
      usedBy: 'thm.de-rham',
      note: '同构由 $[\\omega] \\mapsto \\bigl([c] \\mapsto \\int_{c}\\omega\\bigr)$ 给出，所以「形式在链上的积分」是这条定理的**构造**而不是例子：没有它就没有映射。'
    },
    {
      id: 'dep.mf2-stokes-derhamthm',
      kind: 'definition',
      definition: 'thm.stokes',
      usedBy: 'thm.de-rham',
      note: '配对能「下到同调与上同调」全靠 Stokes 的两个方向：$\\int_{\\partial b}\\omega = \\int_{b}\\mathrm{d}\\omega$ 与 $\\int_{\\partial c}\\eta = \\int_{c}\\mathrm{d}\\eta$ —— 一句话：边界算子是 $\\mathrm{d}$ 的伴随。本条的证明里逐字算的是链版（`thm.stokes-chain`），概念形式就是这一条。'
    },
    {
      id: 'dep.mf2-tensor-contraction',
      kind: 'definition',
      definition: 'def.tensor-field',
      usedBy: 'def.tensor-contraction',
      note: '缩并吃 $(r,s)$ 型、吐 $(r-1,s-1)$ 型 —— 上下标的记账全在张量场的定义里；换卡时两个 Jacobi 矩阵互逆正是它能良定义的原因。'
    },
    {
      id: 'dep.mf2-trace-contraction',
      kind: 'definition',
      definition: 'def.trace',
      usedBy: 'def.tensor-contraction',
      note: '$(1,1)$ 型缩并就是逐点取迹；「缩并是取迹的推广」这句话靠的就是那条定义。'
    },
    {
      id: 'dep.mf2-dform-iop',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'def.interior-product',
      note: '内乘的定义是「把 $X_{p}$ 塞进交错多重线性映射的第一个槽」；形式是交错的，所以塞两个向量必然为零（$\\iota_{X}^{2} = 0$）。'
    },
    {
      id: 'dep.mf2-vf-iop',
      kind: 'definition',
      definition: 'def.vector-field',
      usedBy: 'def.interior-product',
      note: '内乘吃一个向量场与一个形式；它对向量场 $C^{\\infty}$-线性（可逐点算），这一点与 Lie 导数形成对照。'
    },
    {
      id: 'dep.mf2-vf-flow',
      kind: 'definition',
      definition: 'def.vector-field',
      usedBy: 'def.flow',
      note: '流是向量场的「解」：定义里的 $\\dot\\gamma = X(\\gamma)$ 左边是曲线、右边是向量场；把每点该往哪走写下来，才有方程。'
    },
    {
      id: 'dep.mf2-flow-flowlocal',
      kind: 'definition',
      definition: 'def.flow',
      usedBy: 'thm.flow-local',
      note: '定理要证的对象就是流（连同单参数群性质），所以先得有「流」这个定义；「极大流」也正是定义里那个 $\\mathcal{W}$ 的极大版本。'
    },
    {
      id: 'dep.mf2-flow-flowcomplete',
      kind: 'definition',
      definition: 'def.flow',
      usedBy: 'thm.flow-complete',
      note: '「完备」在 `def.flow` 里已经定义为 $\\mathcal{W} = \\mathbb{R}\\times M$；本条把它换成可判定的等价条件（区间无有限端点 / 有限端点必逃逸）。'
    },
    {
      id: 'dep.mf2-compact-flowcomplete',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'thm.flow-complete',
      note: '「紧 $\\implies$ 完备」用的正是紧性的有限覆盖形式：紧集用有限张卡盖住，才取得出一致的时间步长。'
    },
    {
      id: 'dep.mf2-flow-liederiv',
      kind: 'definition',
      definition: 'def.flow',
      usedBy: 'def.lie-derivative',
      note: 'Lie 导数的定义是「沿流拉回再对 $t$ 求导」；流只需局部存在（`thm.flow-local`），所以这个定义对任意向量场都有意义。'
    },
    {
      id: 'dep.mf2-tensor-liederiv',
      kind: 'definition',
      definition: 'def.tensor-field',
      usedBy: 'def.lie-derivative',
      note: 'Lie 导数作用在**张量场**上；三类的具体写法（函数 / 向量场 / 形式）都是张量场的特例，统一在「次数 $0$ 的导子」这个描述下。'
    },
    {
      id: 'dep.mf2-liederiv-cartan',
      kind: 'definition',
      definition: 'def.lie-derivative',
      usedBy: 'thm.cartan-formula',
      note: '公式左边就是 Lie 导数；证明的收尾用「它是与 $\\mathrm{d}$ 交换的次数 $0$ 导子」这条性质。'
    },
    {
      id: 'dep.mf2-iop-cartan',
      kind: 'definition',
      definition: 'def.interior-product',
      usedBy: 'thm.cartan-formula',
      note: '公式右边两项都含内乘；它与 $\\mathrm{d}$ 都是**反导子**，复合出来才是导子 —— 这是证明能三行收束的技术核心。'
    },
    {
      id: 'dep.mf2-extd-cartan',
      kind: 'definition',
      definition: 'def.exterior-derivative',
      usedBy: 'thm.cartan-formula',
      note: '「$\\mathrm{d}\\iota_{X} + \\iota_{X}\\mathrm{d}$ 与 $\\mathrm{d}$ 交换」这一步用了 $\\mathrm{d}^{2} = 0$；没有它，右边那个组合连类型都对不上。'
    },
    {
      id: 'dep.mf2-riem-subvol',
      kind: 'definition',
      definition: 'def.riemannian-metric',
      usedBy: 'def.submanifold-volume',
      note: '诱导度量 $i^{\\ast}g$ 是把 $g$ 沿着 $\\mathrm{d}i$ 拉回；$\\sqrt{\\det(g_{ab})}$ 这个因子则完全来自 $g$（对照 `def.volume-form`）。'
    },
    {
      id: 'dep.mf2-area-subvol',
      kind: 'definition',
      definition: 'def.area-element',
      usedBy: 'def.submanifold-volume',
      note: '$k = 2$ 时本条退化成曲面的面积元 $\\mathrm{d}A = \\sqrt{EG - F^{2}}\\,\\mathrm{d}u\\wedge\\mathrm{d}v$，与那条定义逐字相同 —— 本条是它的一般 $k$。'
    },
    {
      id: 'dep.mf2-orient-subvol',
      kind: 'definition',
      definition: 'def.orientable-manifold',
      usedBy: 'def.submanifold-volume',
      note: '有符号的 $\\mathrm{d}V_{N}$ 需要 $N$ 自己的定向；注意 $M$ 可定向不蕴含 $N$ 可定向（Möbius 带嵌在 $\\mathbb{R}^{3}$ 里）。'
    },
    {
      id: 'dep.mf2-density-subvol',
      kind: 'definition',
      definition: 'def.volume-density',
      usedBy: 'def.submanifold-volume',
      note: '不定向时积的是密度 $\\mathrm{d}A_{N}$，它的换卡不变性（$|\\det|$ 抵消）是 `prop.volume-density-well-defined` 给的，本条只把它搬到 $N$ 上。'
    },
    {
      id: 'dep.mf2-iop-subvol',
      kind: 'definition',
      definition: 'def.interior-product',
      usedBy: 'def.submanifold-volume',
      note: '超曲面情形 $\\mathrm{d}V_{N} = \\pm\\iota_{\\nu}\\mathrm{d}V_{g}$ 用的是内乘：沿单位法向缩一次，把 $n$-形式降成 $(n-1)$-形式 —— 这是「次数必须先降下来」的两条路之一。'
    },
    {
      id: 'dep.mf2-integral-subvol',
      kind: 'definition',
      definition: 'def.integral-form',
      usedBy: 'def.submanifold-volume',
      note: '体积是积分 $\\int_{N}\\mathrm{d}A_{N}$；「怎么在流形上积」的记账（保向卡 + 单位分解）不重写，直接引用那条定义。'
    },

    /* ============================================================
       推导（黑线，证明写在边上）
       ============================================================ */

    {
      id: 'imp.mf2-frobenius-flat',
      kind: 'implication',
      sources: ['def.involutive-distribution', 'thm.flow-local', 'def.lie-bracket'],
      target: 'thm.frobenius',
      title: '对合 $\\implies$ 平坦坐标（流盒拉直 $+$ 降秩归纳）',
      proof: [
        '证 (1)$\\implies$(2)。对 $k$ 归纳。$k = 0$ 时 $\\mathcal{D} = 0$，任意坐标都平坦。设 $k \\ge 1$，$p \\in M$ 任意。',
        '',
        '**第一步：把第一个生成元拉直。** 取 $p$ 附近处处非零的生成元 $X_{1}$（由光滑性，$k \\ge 1$ 时局部总有）。用 `thm.flow-local` 的局部流 $\\varphi_{t}$：取过 $p$ 的横截超曲面 $H$（$\\dim H = n-1$，与 $X_{1}(p)$ 横截），则',
        '',
        '$$\\Psi(t, q) := \\varphi_{t}(q)\\qquad (q \\in H,\\ |t| < \\varepsilon)$$',
        '',
        '在 $p$ 附近是微分同胚（$\\mathrm{d}\\Psi$ 在 $(0,p)$ 处满秩），于是可以取坐标 $y^{1} := t$、$y^{2},\\ldots,y^{n}$ 为 $H$ 上的坐标。由构造 $\\partial_{1} = X_{1}$，即 $X_{1}$ 已拉直。',
        '',
        '**第二步：换成没有 $\\partial_{1}$ 分量的生成元。** 设其余生成元为 $Y_{2},\\ldots,Y_{k}$。把每个 $Y_{i}$ 换成',
        '',
        '$$\\tilde Y_{i} := Y_{i} - \\bigl\\langle \\mathrm{d}y^{1},\\ Y_{i}\\bigr\\rangle\\,\\partial_{1}\\qquad (i = 2,\\ldots,k),$$',
        '',
        '它们与 $\\partial_{1}$ 一起仍生成 $\\mathcal{D}$（只是把 $\\partial_{1}$ 那部分扣掉）。由对合性，$[\\partial_{1},\\tilde Y_{i}] \\in \\Gamma(\\mathcal{D})$；而',
        '',
        '$$\\mathrm{d}y^{1}\\bigl([\\partial_{1},\\tilde Y_{i}]\\bigr) = \\partial_{1}\\bigl(\\mathrm{d}y^{1}(\\tilde Y_{i})\\bigr) - \\tilde Y_{i}\\bigl(\\mathrm{d}y^{1}(\\partial_{1})\\bigr) = \\partial_{1}(0) - 0 = 0,$$',
        '',
        '（用了 $\\mathrm{d}y^{1}$ 是闭形式与 $\\mathrm{d}y^{1}(\\tilde Y_{i}) = 0$、$\\mathrm{d}y^{1}(\\partial_{1}) = 1$ 为常数），故 $[\\partial_{1},\\tilde Y_{i}]$ 落在 $\\mathcal{D} \\cap \\ker\\mathrm{d}y^{1}$ 里，也就是落在 $\\tilde Y_{2},\\ldots,\\tilde Y_{k}$ 张成的空间里。',
        '',
        '**第三步：在横截超曲面上降秩。** 固定 $c$，令 $H_{c} := \\{y^{1} = c\\}$（$n-1$ 维），$\\mathcal{D}^{\\prime} := \\mathcal{D}\\cap TH_{c}$。由第二步，$\\mathcal{D}^{\\prime}$ 在 $H_{c}$ 上由 $\\tilde Y_{2},\\ldots,\\tilde Y_{k}$ 张成，秩 $k-1$；对 $i, j \\ge 2$，$[\\tilde Y_{i},\\tilde Y_{j}] \\in \\Gamma(\\mathcal{D})$ 且 $\\mathrm{d}y^{1}([\\tilde Y_{i},\\tilde Y_{j}]) = 0$（同上计算），故 $\\mathcal{D}^{\\prime}$ 对合。由归纳假设，$H_{0}$ 上有坐标 $(z^{2},\\ldots,z^{n})$ 使 $\\mathcal{D}^{\\prime}$ 由 $\\partial_{z^{2}},\\ldots,\\partial_{z^{k}}$ 张成。',
        '',
        '**第四步：沿 $\\partial_{1}$ 平移坐标。** 把 $z^{2},\\ldots,z^{n}$ 沿 $\\partial_{1}$ 的流不变地延拓（即令 $z^{a}(\\varphi_{t}(q)) := z^{a}(q)$ 对 $q \\in H_{0}$），并令 $z^{1} := y^{1}$。这是一组坐标（$\\partial_{1}$ 横截 $H_{0}$），且 $\\partial_{1} = \\partial_{z^{1}}$、$\\partial_{1}z^{a} = 0$（$a \\ge 2$）。',
        '',
        '剩下要证 $\\tilde Y_{i}$ 与切片 $\\{z^{k+1} = c^{k+1},\\ldots,z^{n} = c^{n}\\}$ 相切，即 $f^{a}_{i} := \\tilde Y_{i}z^{a} \\equiv 0$（$a \\ge k+1$）。在 $H_{0}$ 上 $f^{a}_{i} = 0$（归纳假设）。沿 $\\partial_{1}$ 的流线，记 $[\\partial_{1},\\tilde Y_{i}] = \\sum_{j \\ge 2} b^{j}_{\\ i}\\,\\tilde Y_{j}$（第二步给的），则',
        '',
        '$$\\partial_{1} f^{a}_{i} = \\bigl[\\partial_{1},\\tilde Y_{i}\\bigr]\\,(z^{a}) + \\tilde Y_{i}\\bigl(\\partial_{1}z^{a}\\bigr) = \\sum_{j \\ge 2} b^{j}_{\\ i}\\,f^{a}_{j} + 0 .$$',
        '',
        '固定 $a \\ge k+1$，这就是未知向量 $(f^{a}_{2},\\ldots,f^{a}_{k})$ 沿流线的一阶**线性**方程组，初值在 $H_{0}$ 上为零；由线性方程解的唯一性，$f^{a}_{i}$ 在每条流线上恒为零。故 $\\tilde Y_{i}$ 落在 $\\operatorname{span}\\{\\partial_{z^{1}},\\ldots,\\partial_{z^{k}}\\}$ 里，而 $\\partial_{1} = \\partial_{z^{1}}$ 也在其中，于是 $\\mathcal{D} = \\operatorname{span}\\{\\partial_{1},\\tilde Y_{2},\\ldots,\\tilde Y_{k}\\}$ 含于 $\\operatorname{span}\\{\\partial_{z^{1}},\\ldots,\\partial_{z^{k}}\\}$，维数相同故相等 —— $(z^{1},\\ldots,z^{n})$ 就是所求的平坦坐标。∎',
        '',
        '⭐ 这段证明只用两件东西：**流盒**（把 $X_{1}$ 拉直，来自 `thm.flow-local`）与**括号封闭**（保证 $\\mathcal{D}^{\\prime}$ 仍对合、且 $[\\partial_{1},\\tilde Y_{i}]$ 没有 $\\partial_{1}$ 分量）。对合在这里被用了两次，正好是「必要条件」升级成「充分条件」的全部代价。'
      ].join('\n')
    },

    {
      id: 'imp.mf2-frobenius-integral',
      kind: 'implication',
      sources: ['def.integral-manifold', 'def.lie-bracket', 'def.manifold-chart'],
      target: 'thm.frobenius',
      title: '平坦坐标 $\\implies$ 积分流形 $\\implies$ 对合，且叶片粘成叶状结构',
      proof: [
        '证 (2)$\\implies$(3)、 (3)$\\implies$(1)、 (2)$\\implies$(4)。',
        '',
        '**(2)$\\implies$(3)。** 在平坦坐标里 $\\mathcal{D}$ 由 $\\partial_{1},\\ldots,\\partial_{k}$ 生成。取 $p = (0,\\ldots,0)$，令',
        '',
        '$$N := \\{x^{k+1} = 0,\\ \\ldots,\\ x^{n} = 0\\}\\cap U,$$',
        '',
        '它是 $k$ 维嵌入子流形，且 $T_{q}N = \\operatorname{span}\\{\\partial_{1},\\ldots,\\partial_{k}\\} = \\mathcal{D}_{q}$ 对 $q \\in N$ 成立。包含映射 $i$ 是单浸入，$\\mathrm{d}i(TN) = \\mathcal{D}$ —— 故 $N$ 是过 $p$ 的积分流形。',
        '',
        '**(3)$\\implies$(1)。** 设 $X, Y \\in \\Gamma(\\mathcal{D}|_{U})$，$q \\in U$ 落在积分流形 $i : N \\to M$ 里。因 $\\mathrm{d}i : TN \\to \\mathcal{D}$ 是逐纤维同构，$X, Y$ 在 $i^{-1}(U)$ 上分别是 $\\mathrm{d}i(X_{N})$、$\\mathrm{d}i(Y_{N})$ 的形式（$X_{N}, Y_{N}$ 是 $N$ 上的向量场）。在卡里逐项验算即得括号的自然性',
        '',
        '$$\\mathrm{d}i\\bigl([X_{N},Y_{N}]_{p}\\bigr) = \\bigl[\\mathrm{d}i(X_{N}),\\ \\mathrm{d}i(Y_{N})\\bigr]_{i(p)} = [X,Y]_{i(p)},$$',
        '',
        '故 $[X,Y]$ 落在 $\\mathrm{d}i(TN) = \\mathcal{D}$ 里 —— 对合成立。',
        '',
        '**(2)$\\implies$(4)。** 把平坦坐标里所有形如 $\\{x^{k+1} = c^{k+1},\\ldots,x^{n} = c^{n}\\}$ 的切片按「过同一点则重合」粘起来：由 `def.integral-manifold` 的 notes 里的局部唯一性，粘出来的是一族互不相交的极大连通积分流形，覆盖 $M$（每点在自己的卡里落在一片切片上）。（这一步的严格写法要对「所有的叶」用一个极大的不相交族取并，属于集合论层面的手续，本图只给口径。）',
        '',
        '**为什么 (1) 是本定理的核心**：(2)、(3)、(4) 都是「存在某个几何对象」，而 (1) 只是「有限个括号的封闭性」。定理真正说的是：**一条纯代数的条件等价于一条纯几何的结论** —— 前者有限步可验，后者要解偏微分方程组。∎'
      ].join('\n')
    },

    {
      id: 'imp.mf2-maurer-cartan',
      kind: 'implication',
      sources: ['def.left-invariant-form', 'def.exterior-derivative', 'prop.left-invariant-fields'],
      target: 'thm.maurer-cartan',
      title: '左不变性 $+$ 括号在左不变场上封闭 $\\implies$ Maurer–Cartan 方程',
      proof: [
        '**预备公式**：对任意 $1$-形式 $\\theta$ 与向量场 $X, Y$，',
        '',
        '$$\\mathrm{d}\\theta(X,Y) = X\\bigl(\\theta(Y)\\bigr) - Y\\bigl(\\theta(X)\\bigr) - \\theta\\bigl([X,Y]\\bigr).$$',
        '',
        '这是 $\\mathrm{d}$ 的坐标无关刻画：在卡里把 $\\theta = \\sum a_{i}\\mathrm{d}x^{i}$ 与 $X, Y$ 的分量代入 $\\mathrm{d}\\theta = \\sum\\partial_{j}a_{i}\\,\\mathrm{d}x^{j}\\wedge\\mathrm{d}x^{i}$，与上式逐项吻合（`def.exterior-derivative` 的定义式加 Leibniz 律）。',
        '',
        '**两边都是左不变的 $2$-形式。** 左边：$\\mathrm{d}(L_{h}^{\\ast}\\omega^{i}) = L_{h}^{\\ast}\\mathrm{d}\\omega^{i}$（拉回与外微分交换，`prop.pullback-forms`），而 $L_{h}^{\\ast}\\omega^{i} = \\omega^{i}$，故 $L_{h}^{\\ast}\\mathrm{d}\\omega^{i} = \\mathrm{d}\\omega^{i}$。右边：$\\omega^{j}\\wedge\\omega^{k}$ 由左不变形式组成，也左不变。所以只需在一点（或在一组左不变基上）比较。',
        '',
        '**取左不变向量场比较。** 令 $X = \\tilde e_{j}$、$Y = \\tilde e_{k}$。$\\omega^{i}(\\tilde e_{l}) = \\delta^{i}_{\\ l}$ 是常数，故预备公式前两项为零，',
        '',
        '$$\\mathrm{d}\\omega^{i}(\\tilde e_{j},\\tilde e_{k}) = -\\omega^{i}\\bigl([\\tilde e_{j},\\tilde e_{k}]\\bigr) = -\\omega^{i}\\Bigl(\\sum_{l}c^{l}_{\\ jk}\\tilde e_{l}\\Bigr) = -c^{i}_{\\ jk},$$',
        '',
        '其中第二个等号用了 $[\\tilde e_{j},\\tilde e_{k}]$ 左不变（`prop.left-invariant-fields` 第 2 条），因而可以按 $\\mathfrak{g}$ 的基展开。',
        '',
        '**右边同一点的值。** 由 $(\\omega^{a}\\wedge\\omega^{b})(\\tilde e_{j},\\tilde e_{k}) = \\delta^{a}_{\\ j}\\delta^{b}_{\\ k} - \\delta^{a}_{\\ k}\\delta^{b}_{\\ j}$，',
        '',
        '$$-\\frac{1}{2}\\sum_{a,b}c^{i}_{\\ ab}\\bigl(\\omega^{a}\\wedge\\omega^{b}\\bigr)(\\tilde e_{j},\\tilde e_{k}) = -\\frac{1}{2}\\bigl(c^{i}_{\\ jk} - c^{i}_{\\ kj}\\bigr) = -c^{i}_{\\ jk},$$',
        '',
        '最后一步用了反称性 $c^{i}_{\\ kj} = -c^{i}_{\\ jk}$。两个左不变 $2$-形式在每点的基 $(\\tilde e_{j}\\wedge\\tilde e_{k})_{j<k}$ 上取值处处相同，故相等。',
        '',
        '**$\\mathfrak{g}$-值版本**：把上式按 $\\omega = \\sum\\omega^{i}e_{i}$ 组装，右端是 $-\\frac{1}{2}\\sum_{j,k}\\omega^{j}\\wedge\\omega^{k}\\,(\\sum_{i}c^{i}_{\\ jk}e_{i}) = -\\frac{1}{2}\\sum_{j,k}\\omega^{j}\\wedge\\omega^{k}\\,[e_{j},e_{k}] = -\\frac{1}{2}[\\omega\\wedge\\omega]$，正是 $\\mathrm{d}\\omega = -\\frac{1}{2}[\\omega\\wedge\\omega]$。∎',
        '',
        '⭐ 证明里没有一处用到「群的具体样子」：只用左不变性（把 $\\omega^{i}(\\tilde e_{l})$ 变成常数）与括号在左不变场上封闭。所以这条公式是纯结构常数的事 —— 也正是它能把「群」与「Lie 代数」直接对上的原因。'
      ].join('\n')
    },

    {
      id: 'imp.mf2-bundle-classification',
      kind: 'implication',
      sources: ['def.vector-bundle', 'def.cech-cohomology'],
      target: 'thm.bundle-classification',
      title: '局部平凡化给出上闭链 $\\implies$ 丛的同构类 $=$ $1$-上闭链模等价',
      proof: [
        '**丛 $\\mapsto$ 上闭链。** 取局部平凡化 $\\Phi_{\\alpha} : \\pi^{-1}(U_{\\alpha}) \\to U_{\\alpha}\\times\\mathbb{R}^{k}$，令 $g_{\\alpha\\beta} := \\Phi_{\\alpha}\\circ\\Phi_{\\beta}^{-1}$。它光滑、取值 $\\operatorname{GL}(k,\\mathbb{R})$，且',
        '',
        '$$g_{\\alpha\\beta}\\,g_{\\beta\\gamma} = \\bigl(\\Phi_{\\alpha}\\Phi_{\\beta}^{-1}\\bigr)\\bigl(\\Phi_{\\beta}\\Phi_{\\gamma}^{-1}\\bigr) = \\Phi_{\\alpha}\\Phi_{\\gamma}^{-1} = g_{\\alpha\\gamma}$$',
        '',
        '在 $U_{\\alpha\\beta\\gamma}$ 上成立（`def.vector-bundle` 的上闭链条件）。',
        '',
        '**上闭链 $\\mapsto$ 丛。** 给定 $g_{\\alpha\\beta}$，在 $\\bigsqcup_{\\alpha}U_{\\alpha}\\times\\mathbb{R}^{k}$ 上令',
        '',
        '$$(p, v) \\sim \\bigl(p,\\ g_{\\beta\\alpha}(p)\\,v\\bigr)\\qquad (p \\in U_{\\alpha\\beta}),$$',
        '',
        '上闭链条件保证它是等价关系（自反：$g_{\\alpha\\alpha} = 1$；传递：$g_{\\alpha\\beta}g_{\\beta\\gamma} = g_{\\alpha\\gamma}$），商空间 $E$ 带自然投影与逐纤维线性结构，各块嵌入即局部平凡化 —— 于是 $E \\to M$ 是秩 $k$ 向量丛。',
        '',
        '**同构 $\\iff$ 上边界。** 若 $\\Psi : E \\to E^{\\prime}$ 是丛同构，在 $U_{\\alpha}$ 上读成 $\\mathbb{R}^{k}$ 的自同构 $h_{\\alpha}(p) \\in \\operatorname{GL}(k,\\mathbb{R})$，则',
        '',
        '$$g^{\\prime}_{\\alpha\\beta} = h_{\\alpha}\\,g_{\\alpha\\beta}\\,h_{\\beta}^{-1}$$',
        '',
        '（左侧与右侧在同一点作用 $v$ 相同）。反之给定这样的 $h_{\\alpha}$，逐块 $h_{\\alpha}$ 在重叠处一致（正是那条等式），故拼成整体同构。',
        '',
        '**覆盖与加细。** 换覆盖时把 $g_{\\alpha\\beta}$ 限制到细块的像上，得 $\\check{H}^{1}(\\mathfrak{U}) \\to \\check{H}^{1}(\\mathfrak{V})$；两个加细有公共加细，于是三角形交换、余极限有意义（这一步是形式的，只用到覆盖族的有向性）。仿紧性保证可以只取局部有限的覆盖（`def.paracompact`），本条的构造在任何情形都不需要单位分解 —— 单位分解出场的地方是「把局部截面拼成整体截面」那类问题，不是分类。∎',
        '',
        '⚠️ 余极限的逐字证明（以及「$\\check{H}^{1}$ 与层上同调 $H^{1}$ 在非阿贝尔系数下的关系」）本图不给，只给到「构造 + 相容」这一层；与深定理的折衷口径一致。'
      ].join('\n')
    },

    {
      id: 'imp.mf2-de-rham',
      kind: 'implication',
      sources: ['def.de-rham-complex', 'def.singular-chain', 'def.integral-on-chain'],
      target: 'thm.de-rham',
      title: '闭链上的积分 $\\implies$ de Rham 上同调与奇异上同调同构',
      proof: [
        '**第一步：配对良定义（唯一真正要做计算的地方）。** 对 $[\\omega] \\in H^{k}_{\\mathrm{dR}}(M)$、$[c] \\in H^{\\mathrm{sing}}_{k}(M;\\mathbb{R})$ 令',
        '',
        '$$\\langle[\\omega],[c]\\rangle := \\int_{c}\\omega .$$',
        '',
        '换 $c$ 为 $c + \\partial b$：$\\int_{\\partial b}\\omega = \\int_{b}\\mathrm{d}\\omega = 0$（`thm.stokes-chain`，用 $\\omega$ 闭）。换 $\\omega$ 为 $\\omega + \\mathrm{d}\\eta$：$\\int_{c}\\mathrm{d}\\eta = \\int_{\\partial c}\\eta = 0$（$c$ 闭）。所以这是良定义的配对 $H^{k}_{\\mathrm{dR}} \\otimes H^{\\mathrm{sing}}_{k} \\to \\mathbb{R}$，等价地一个线性映射 $\\Phi^{k} : H^{k}_{\\mathrm{dR}} \\to (H^{\\mathrm{sing}}_{k})^{\\ast} = H^{k}_{\\mathrm{sing}}$。',
        '',
        '**第二步：把左边认成层上同调。** $\\Omega^{\\bullet}$ 是常层 $\\underline{\\mathbb{R}}$ 的消解：逐点的正合性就是 Poincaré 引理（`lem.poincare-lemma`），逐点的核是 $\\mathbb{R}$；而 $\\Omega^{0}$ 中 $\\mathrm{d}$-闭的元素正是局部常函数（`thm.de-rham-h0` 的论证），即 $\\underline{\\mathbb{R}}$ 的截面。于是复形的上同调 $H^{\\bullet}_{\\mathrm{dR}}(M)$ 就是层上同调 $H^{\\bullet}(M;\\underline{\\mathbb{R}})$。',
        '',
        '**第三步：Čech–de Rham 双复形。** 取「好的覆盖」$\\mathfrak{U}$（每点邻域与每个有限交都可缩），把 $\\check{C}^{p}(\\mathfrak{U},\\Omega^{q})$ 排成双复形：横向是 Čech 微分 $\\delta$、纵向是 $\\mathrm{d}$。两条谱序列算出同一个全上同调：',
        '',
        '- 沿 $q$ 先算：每行是 $\\Omega^{\\bullet}$ 在可缩开集上的截面，由 Poincaré 引理正合，得 $\\check{H}^{\\bullet}(\\mathfrak{U};\\underline{\\mathbb{R}})$；',
        '',
        '- 沿 $p$ 先算：Čech 方向正合（层条件），得 $H^{\\bullet}_{\\mathrm{dR}}(M)$。',
        '',
        '两者收敛到同一极限，故 $H^{\\bullet}_{\\mathrm{dR}}(M) \\cong \\check{H}^{\\bullet}(M;\\underline{\\mathbb{R}})$。再用 `thm.paracompact-cech-equals-sheaf`（仿紧流形上 Čech 等于层上同调）得 $H^{\\bullet}_{\\mathrm{dR}}(M) \\cong H^{\\bullet}(M;\\underline{\\mathbb{R}})$。',
        '',
        '**第四步：层上同调 = 奇异上同调。** 常层 $\\underline{\\mathbb{R}}$ 的层上同调由「同伦不变 $+$ 单点的值 $+$ 长正合列」这组性质唯一确定；奇异上同调满足同一组性质（奇异链给出 $\\underline{\\mathbb{R}}$ 的一个消解：$\\mathrm{Hom}(C^{\\mathrm{sing}}_{\\bullet}(-),\\mathbb{R})$ 在可缩空间上正合）。于是两者自然同构 —— 这是代数拓扑的标准定理，本图不证。',
        '',
        '**收尾**：把第三步、第四步拼起来，得到同构 $H^{k}_{\\mathrm{dR}}(M) \\cong H^{k}_{\\mathrm{sing}}(M;\\mathbb{R})$；它与第一步的配对 $\\langle\\cdot,\\cdot\\rangle$ 是同一个映射（两种算法算同一个积分），故 $\\Phi^{k}$ 就是它。',
        '',
        '⚠️ 本条的第三步两条谱序列、第四步的公理刻画都只给结论 —— 这是**证明路线**，不是逐字证明。第一、二步是逐字写的；三步以后的细节见 Bott–Tu 的 Čech–de Rham 双复形一章（refs 里给了 Tu 自己的 de Rham 章）。'
      ].join('\n')
    },

    {
      id: 'imp.mf2-flow-local',
      kind: 'implication',
      sources: ['def.vector-field', 'def.manifold-chart'],
      target: 'thm.flow-local',
      title: '卡里化归为自治 ODE $\\implies$ 局部流存在唯一且光滑',
      proof: [
        '**化归。** 取 $p$ 的卡 $(V,x)$，在 $V$ 上 $X = \\sum_{i}X^{i}\\partial_{i}$，$X^{i} \\in C^{\\infty}(V)$。于是「$\\gamma$ 是积分曲线」等价于「$y := x\\circ\\gamma$ 满足 $\\dot y^{i} = X^{i}(y)$」。',
        '',
        '**存在唯一（Picard–Lindelöf）。** $f(y) := (X^{1}(y),\\ldots,X^{n}(y))$ 在 $y_{0} := x(p)$ 附近光滑，因而局部 Lipschitz。取 $r > 0$ 使闭球 $\\overline{B}(y_{0},r) \\subseteq x(V)$，令 $M_{0} := \\max_{\\overline{B}}\\lVert f\\rVert$、$\\varepsilon := r/(2M_{0})$。则对每个 $y_{1} \\in B(y_{0}, r/2)$，方程有唯一解 $y : (-\\varepsilon,\\varepsilon) \\to B(y_{0},r)$ 满足 $y(0) = y_{1}$（压缩映射迭代：$\\dot y = f(y)$ 的积分形式在 $C^{0}([-\\varepsilon,\\varepsilon])$ 上是压缩）。',
        '',
        '**解对初值光滑。** 同一套 Picard 迭代给出 $\\Phi(t,y_{1}) := y(t)$ 对 $(t,y_{1})$ 的各阶偏导数的收敛性（$f$ 光滑），于是 $\\Phi$ 光滑；令 $\\varphi_{t} := x^{-1}\\circ\\Phi_{t}\\circ x$，得 $(t,q) \\mapsto \\varphi_{t}(q)$ 光滑（在 $x^{-1}B(y_{0},r/2)$ 上）。',
        '',
        '**单参数群。** 固定 $s$，两条曲线',
        '',
        '$$\\tau \\mapsto \\Phi(s+\\tau, y_{1}),\\qquad \\tau \\mapsto \\Phi\\bigl(\\tau, \\Phi(s,y_{1})\\bigr)$$',
        '',
        '在 $\\tau = 0$ 处同值（都是 $\\Phi(s,y_{1})$）、同导数（都是 $f$），由唯一性在公共定义区间上相等。共轭回 $M$ 得 $\\varphi_{s+t} = \\varphi_{s}\\circ\\varphi_{t}$（限制在 $|s|,|t|,|s+t|<\\varepsilon$ 且中间点落在 $U$ 内的范围）。',
        '',
        '**$\\varphi_{t}$ 是局部微分同胚。** 取 $s = -t$ 得 $\\varphi_{-t}\\circ\\varphi_{t} = \\varphi_{0} = \\operatorname{id}$，故 $\\varphi_{t}$ 有光滑逆 $\\varphi_{-t}$。',
        '',
        '**极大流的拼接。** 每点附近都有局部流，两个局部流在公共点附近由唯一性重合；把这一点当作等价关系把局部解接起来，得到定义域极大的那一个 $\\mathcal{W} \\subseteq \\mathbb{R}\\times M$。∎',
        '',
        '⭐ 全程只有一处用到流形结构：**在卡里做**。「流形上的 ODE」与「$\\mathbb{R}^{n}$ 上的 ODE」在局部没有区别，区别只出现在**整体**行为（`thm.flow-complete`）。'
      ].join('\n')
    },

    {
      id: 'imp.mf2-flow-complete',
      kind: 'implication',
      sources: ['def.flow', 'thm.flow-local', 'def.compact'],
      target: 'thm.flow-complete',
      title: '局部存在 $+$ 紧性 $\\implies$ 有限端点必逃逸，紧流形上处处完备',
      proof: [
        '**第 1 条（区间是开的）。** 设 $\\gamma : J \\to M$ 极大，$t_{0} \\in J$。由 `thm.flow-local`，$\\gamma(t_{0})$ 附近有局部流 $\\varphi$（时间 $\\varepsilon > 0$）；把它与 $\\gamma$ 在 $\\gamma(t_{0})$ 处接起来，得解在 $(t_{0}-\\varepsilon,t_{0}+\\varepsilon)$ 上存在。故「可延拓」的点集在 $J$ 中开，而 $J$ 是极大区间 —— 于是 $J$ 是开区间。',
        '',
        '**第 2 条（逃逸引理）。** 反设存在紧集 $K$ 与 $t_{1} < b_{q}$ 使 $\\gamma([t_{1}, b_{q})) \\subseteq K$。对每点 $y \\in K$ 取一张卡 $V_{y}$ 与 `thm.flow-local` 给的时间 $\\varepsilon_{y} > 0$；$K$ 紧，取有限个 $y_{1},\\ldots,y_{m}$ 使 $K \\subseteq \\bigcup_{i}V_{y_{i}}$，令 $\\varepsilon := \\min_{i}\\varepsilon_{y_{i}} > 0$。取 $t_{1}$ 使 $b_{q} - t_{1} < \\varepsilon$，在 $\\gamma(t_{1}) \\in K$ 处用第 $i$ 个局部流把解延拓到 $b_{q} + (\\varepsilon - (b_{q}-t_{1})) > b_{q}$ —— 与 $b_{q}$ 是极大右端点矛盾。$a_{q}$ 一端把 $t$ 换成 $-t$ 同证。',
        '',
        '**第 3 条（完备判据）。** 若所有端点都是无穷，则每点的积分曲线都在整个 $\\mathbb{R}$ 上有定义，即 $\\mathcal{W} = \\mathbb{R}\\times M$，$X$ 完备。反之若某个 $b_{q} < +\\infty$，则 $(b_{q},q) \\notin \\mathcal{W}$，故 $\\mathcal{W} \\ne \\mathbb{R}\\times M$，不完备。',
        '',
        '**紧 $M$ 的推论。** 设 $M$ 紧而 $b_{q} < +\\infty$。在第 2 条里取 $K = M$（紧）：结论要求存在 $t_{2}$ 使 $\\varphi_{t_{2}}(q) \\notin M$，不可能 —— 矛盾。故 $b_{q} = +\\infty$；同理 $a_{q} = -\\infty$。于是每个 $X \\in \\mathfrak{X}(M)$ 完备。∎',
        '',
        '⚠️ 第 2 条与第 3 条合起来才是「完备性可判定」的原因：**端点有限 $\\implies$ 曲线跑出每个紧集**，而「跑出每个紧集」正是曲线无法再延拓的几何形态。紧流形上「跑不出去」，所以端点不可能有限 —— 这就是整条定理的全部内容。'
      ].join('\n')
    },

    {
      id: 'imp.mf2-cartan-formula',
      kind: 'implication',
      sources: ['def.lie-derivative', 'def.interior-product', 'def.exterior-derivative'],
      target: 'thm.cartan-formula',
      title: '两者都是与 $\\mathrm{d}$ 交换的次数 $0$ 导子 $\\implies$ Cartan 公式',
      proof: [
        '记 $D := \\mathrm{d}\\,\\iota_{X} + \\iota_{X}\\,\\mathrm{d}$，要证 $D = \\mathcal{L}_{X}$ 作用在 $\\Omega^{\\bullet}(M)$ 上。分四步。',
        '',
        '**(1) 两者都保次数。** $\\mathrm{d}$ 次数 $+1$、$\\iota_{X}$ 次数 $-1$，故 $D$ 次数 $0$；$\\mathcal{L}_{X}$ 由拉回定义，而拉回保次数。',
        '',
        '**(2) 两者都是导子。** $\\mathcal{L}_{X}$：$\\varphi_{t}^{\\ast}(\\omega\\wedge\\eta) = \\varphi_{t}^{\\ast}\\omega\\wedge\\varphi_{t}^{\\ast}\\eta$，对 $t$ 求导即得 Leibniz 律。$D$：$\\mathrm{d}$ 是 $+1$ 次**反导子**，$\\iota_{X}$ 是 $-1$ 次**反导子**（`def.interior-product` 的第 1 条），两个反导子的复合是次数 $0$ 的导子，两个导子之和仍是导子。',
        '',
        '**(3) 两者都与 $\\mathrm{d}$ 交换。** $D\\mathrm{d} = \\mathrm{d}\\iota_{X}\\mathrm{d} + \\iota_{X}\\mathrm{d}^{2} = \\mathrm{d}\\iota_{X}\\mathrm{d}$，而 $\\mathrm{d}D = \\mathrm{d}^{2}\\iota_{X} + \\mathrm{d}\\iota_{X}\\mathrm{d} = \\mathrm{d}\\iota_{X}\\mathrm{d}$（用了 $\\mathrm{d}^{2} = 0$），故 $D\\mathrm{d} = \\mathrm{d}D$。$\\mathcal{L}_{X}\\mathrm{d} = \\mathrm{d}\\mathcal{L}_{X}$：两边都是对 $t$ 求导，而 $\\varphi_{t}^{\\ast}\\mathrm{d} = \\mathrm{d}\\varphi_{t}^{\\ast}$（拉回与外微分交换，`prop.pullback-forms`）。',
        '',
        '**(4) 在函数上相等。** 对 $f \\in C^{\\infty}(M)$：$Df = \\mathrm{d}\\bigl(\\iota_{X}f\\bigr) + \\iota_{X}\\mathrm{d}f = 0 + \\mathrm{d}f(X) = Xf = \\mathcal{L}_{X}f$。',
        '',
        '**唯一性收尾。** 一个保次数 $0$、与 $\\mathrm{d}$ 交换的导子，由它在 $C^{\\infty}(M)$ 上的值决定：局部任意 $k$-形式是 $\\sum f_{0}\\,\\mathrm{d}g_{1}\\wedge\\cdots\\wedge\\mathrm{d}g_{k}$ 的有限和（每个系数写成这样的形状靠 $k$-形式的局部展开），而导子性给出',
        '',
        '$$D(f_{0}\\,\\mathrm{d}g_{1}\\wedge\\cdots\\wedge\\mathrm{d}g_{k}) = D(f_{0})\\,\\mathrm{d}g_{1}\\wedge\\cdots + f_{0}\\,D(\\mathrm{d}g_{1}\\wedge\\cdots\\wedge\\mathrm{d}g_{k}),$$',
        '',
        '且 $D(\\mathrm{d}g_{i}) = \\mathrm{d}(Dg_{i})$（第 3 步），于是每一步都由 $D|_{C^{\\infty}(M)}$ 决定。由 (4)，$D$ 与 $\\mathcal{L}_{X}$ 在所有函数上相同，故处处相同。∎',
        '',
        '⭐ 这条定理的形状值得记住：**两个「同类型的算子」在生成元上一致就整体一致**。第 (2)(3) 步是「同类型」的验证，第 (4) 步是「生成元上一致」。$\\Omega^{\\bullet}(M)$ 由函数与它们的外微分生成，是整个证明唯一的「几何输入」。'
      ].join('\n')
    }

  ]
});
