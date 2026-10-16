/* ==========================================================================
   内容包 · 线性代数 ②：线性映射、商空间与秩
   --------------------------------------------------------------------------
   新星团 `algebra.linmap`（13 点）。这一包把「线性代数」从**一个空间**推进到
   **两个空间之间的关系**：

     线性映射 → 核与像 → 商空间 → 第一同构定理（与群版同一招）
              → 秩与零化度 → **秩-零化度定理** → 对偶空间 / 零化子 / 直和

   ⭐ 与图上别处的呼应：
     · `thm.first-iso`（群）· `def.quotient-set`（集合）—— 同一个模板的第三次重演
     · `def.module`（模同态）—— 线性映射就是域上的模同态
     · `thm.rank-nullity` 是有限维线性代数的**中心定理**：它把「一个线性映射」
       的全部信息压缩成一个等式。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数：线性映射、商空间与秩',
  nodes: [

    {
      id: 'def.linear-map',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '线性映射',
      title: '线性映射（Linear Map）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $V, W$ 是域 $K$ 上的向量空间。映射 $T : V \\to W$ 叫 **$K$-线性的**（或线性映射），当且仅当',
        '',
        '$$T(u + v) = T(u) + T(v), \\qquad T(cu) = c\\,T(u)$$',
        '',
        '对一切 $u, v \\in V$、$c \\in K$ 成立。等价地：$T(cu + v) = c\\,T(u) + T(v)$。',
        '',
        '两个线性映射的**和**与**数乘**仍是线性映射，于是全体线性映射构成一个 $K$-向量空间，记',
        '',
        '$$\\operatorname{Hom}_K(V, W) := \\{\\, T : V \\to W \\ \\text{linear} \\,\\}$$',
        '',
        '复合 $S \\circ T$ 仍是线性的。'
      ].join('\n'),
      notes: '⭐ 线性 = **保持两个运算**（加法与数乘）。与群同态（保持一个运算）相比多了一条，但那条数是免费的：$T(0) = 0$ 与 $T(-v) = -T(v)$ 都能从定义推出。\n\n⭐ 「$\\operatorname{Hom}_K(V, W)$ 本身是向量空间」这件事是线性代数特有的：一般范畴里两个对象之间的态射集没有加法（$\\mathbf{Set}$ 里就是如此），而向量空间的范畴是**加法范畴** —— 两个对象之间的态射集自带加法，这是它比一般范畴多出来的结构。\n\n⚠ 线性的关键在于**只看 $K$ 的加法与数乘**：平移 $v \\mapsto v + v_0$（$v_0 \\ne 0$）不是线性的（$0$ 不映到 $0$），但它「差一个平移就是线性的」—— 那叫仿射映射。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'def.linear-isomorphism',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '线性同构',
      title: '线性同构（Linear Isomorphism）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '线性映射 $T : V \\to W$ 叫**线性同构**，当且仅当 $T$ 是**双射**。此时记 $V \\cong W$，并称 $V$ 与 $W$ 同构。',
        '',
        '**基本事实**：$\\dim_K V = n < \\infty$ 时，$V \\cong K^{n}$（取一组基，$v \\mapsto [v]_{\\mathcal{B}}$ 就是同构）。更一般地，',
        '',
        '$$V \\cong W \\iff \\dim V = \\dim W$$',
        '',
        '（「$\\iff$」的右到左这一半在有限维时成立；无限维时仍成立，只是「维数」要按基的势来理解。）'
      ].join('\n'),
      notes: '⭐ 这条「基本事实」是整个有限维线性代数的**取消论**：同构类只由维数决定，所以「$n$ 维向量空间」只有一个（在同构意义下）。于是研究所有有限维向量空间 = 研究所有 $K^{n}$。\n\n⚠ 无限维时结论只在一半成立：等势的基给出同构，但同构当然也给出等势的基 —— 所以其实两个方向都对，只是「维数」要按基的势来理解（见「维数良定义」）。\n\n⭐ 在范畴语言里：$V \\mapsto \\dim V$ 把 $K\\text{-}\\mathbf{Vect}$ 的有限维对象与基数对应起来，加法范畴的结构因此退化成线性代数的具体计算。',
      refs: ['Lang, Linear Algebra']
    },
    {
      id: 'def.kernel-image-vs',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '核与像',
      title: '核与像（Kernel and Image）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $T : V \\to W$ 线性。定义',
        '',
        '$$\\ker T := \\{\\, v \\in V : T(v) = 0 \\,\\} \\subseteq V, \\qquad \\operatorname{im} T := \\{\\, T(v) : v \\in V \\,\\} \\subseteq W$$',
        '',
        '分别叫 $T$ 的**核**与**像**。两者都是子空间，并且',
        '',
        '$T$ **单射**，当且仅当',
        '',
        '$$\\ker T = \\{0\\}$$',
        '',
        '$T$ **满射**，当且仅当 $\\operatorname{im} T = W$。'
      ].join('\n'),
      notes: '⭐ 「单射 $\\iff$ 核为零」是线性映射最好用的一条：因为 $T(u) = T(v) \\iff T(u - v) = 0$ —— **线性把「两点相同」换成了「差落在核里」**。一般映射没有这个便利。\n\n⭐ 核与像分别是「丢失的信息」与「留下来的信息」：秩-零化度定理说的就是这两块加起来正好是 $V$。\n\n⚠ $\\ker T$ 是 $V$ 的子空间、$\\operatorname{im} T$ 是 $W$ 的子空间 —— 别写反。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'def.quotient-vs',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '商空间',
      title: '商空间 $V / U$（Quotient Space）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $U \\subseteq V$ 是子空间。在 $V$ 上定义等价关系',
        '',
        '$$v \\sim v\' \\iff v - v\' \\in U$$',
        '',
        '等价类 $v + U := \\{\\, v + u : u \\in U \\,\\}$ 叫 $U$ 的**陪集**。全体陪集记 $V / U$，在上面定义',
        '',
        '$$(v + U) + (v\' + U) := (v + v\') + U, \\qquad c\\,(v + U) := (cv) + U$$',
        '',
        '这两条**与代表元的选取无关**（因为 $U$ 是子空间），于是 $V / U$ 成为一个 $K$-向量空间，叫**商空间**。',
        '',
        '商映射 $\\pi : V \\to V/U$、$v \\mapsto v + U$ 是满的线性映射，且 $\\ker \\pi = U$。'
      ].join('\n'),
      notes: '⭐ 这一条是集合的商集（`def.quotient-set`）**加上结构**：先把 $V$ 按 $U$ 压成集合，再验证运算良定义。良定义的那一步是全部内容 —— 因为运算写在代表元上，而代表元有无数种选法。\n\n⭐ 「每个子空间都是某个线性映射的核」由此得到：取 $\\pi$ 即可。这与群的情形完全平行（每个正规子群都是某个同态的核）。\n\n⚠ 商的是**子空间**（不是任意子集）：否则陪集之和不封闭。群那边对应的是「正规子群」，这里所有子空间自动正规（因为 $K$-向量空间都是交换群）。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'thm.first-iso-vs',
      cluster: 'algebra.linmap',
      type: 'theorem',
      label: '第一同构定理（向量空间版）',
      title: '定理：$V / \\ker T \\cong \\operatorname{im} T$',
      regions: ['algebra'],
      tags: ['定理', '线性代数'],
      statement: [
        '设 $T : V \\to W$ 是线性映射。则',
        '',
        '$$\\overline{T} : V / \\ker T \\longrightarrow \\operatorname{im} T, \\qquad v + \\ker T \\longmapsto T(v)$$',
        '',
        '是良定义的**线性同构**。特别地',
        '',
        '$$V / \\ker T \\cong \\operatorname{im} T$$'
      ].join('\n'),
      notes: '⭐ 这是图上第三次出现同一个模板：集合的 $A/\\!\\sim$、群的 $G/N \\cong \\operatorname{im}\\varphi$、向量空间的 $V/\\ker T \\cong \\operatorname{im} T$。三处的证明逐字相同 —— **压掉核，剩下的就是像**。\n\n⭐ 特别有用的一支：若 $T$ 满，则 $W \\cong V / \\ker T$；若 $T$ 单，则 $V \\cong \\operatorname{im} T$。\n\n⚠ 良定义那一步不能省：$v + \\ker T = v\' + \\ker T$ 说明 $v - v\' \\in \\ker T$，于是 $T(v) = T(v\')$ —— 正是「$\\overline{T}$ 只依赖陪集」这句话。',
      refs: ['Lang, Linear Algebra']
    },
    {
      id: 'thm.quotient-universal-vs',
      cluster: 'algebra.linmap',
      type: 'theorem',
      label: '商空间的万有性质',
      title: '定理：商空间的万有性质',
      regions: ['algebra'],
      tags: ['定理', '线性代数'],
      statement: [
        '设 $U \\subseteq V$ 是子空间、$\\pi : V \\to V/U$ 是商映射。则对每个线性映射 $T : V \\to W$ 满足 $U \\subseteq \\ker T$，存在**唯一**的线性映射 $\\overline{T} : V/U \\to W$ 使下图交换：',
        '',
        '$$T = \\overline{T} \\circ \\pi$$',
        '',
        '（即：$U \\subseteq \\ker T$ $\\iff$ $T$ 能「穿过」商映射分解。）'
      ].join('\n'),
      notes: '⭐ 「万有性质」= **把商空间刻划成「压掉 $U$ 的最一般的落点」**：任何在 $U$ 上消失的映射，都**唯一**地经由 $V/U$ 分解。存在性来自定义、唯一性来自 $\\pi$ 满。\n\n⭐ 这条性质是「余核 / 商」这一族概念的通用配方，在范畴论里叫**余等化子**的万有性质（`def.equalizer` 那一支）。\n\n⚠ 条件是 $U \\subseteq \\ker T$（$T$ 在 $U$ 上为零），不是 $U = \\ker T$ —— 允许多压掉一点。',
      refs: ['Lang, Linear Algebra']
    },
    {
      id: 'def.rank',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '秩',
      title: '秩 $\\operatorname{rank} T$（Rank）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $T : V \\to W$ 线性。$T$ 的**秩**定义为像的维数：',
        '',
        '$$\\operatorname{rank} T := \\dim \\operatorname{im} T$$',
        '',
        '矩阵 $A \\in M_{m \\times n}(K)$ 的秩定义为它作为 $K^{n} \\to K^{m}$ 的线性映射（$x \\mapsto Ax$）的秩。'
      ].join('\n'),
      notes: '⭐ 秩是「$T$ 留下了多少维信息」的度量。它是线性代数里**唯一**的数值不变量：两个矩阵在换基下等价（不要求同一个基）当且仅当秩相等。\n\n⚠ 秩依赖基的**选择**吗？不依赖：定义里没有出现基（$\\dim \\operatorname{im} T$ 与基无关，因为维数良定义）。这正是秩好用的原因。\n\n⭐ 后面「行列式」那一段会给出一个只用矩阵元素算秩/判可逆的办法（$\\det \\ne 0 \\iff$ 满秩）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'def.nullity',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '零化度',
      title: '零化度 $\\operatorname{null} T$（Nullity）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $T : V \\to W$ 线性。$T$ 的**零化度**定义为核的维数：',
        '',
        '$$\\operatorname{null} T := \\dim \\ker T$$',
        '',
        '（也叫**亏格**；英文 nullity 或 defect。）'
      ].join('\n'),
      notes: '⭐ 零化度是「$T$ 丢掉了多少维信息」的度量。与秩正好配对：秩-零化度定理说两者之和等于出发空间的维数。\n\n⚠ $\\operatorname{null} T = 0 \\iff \\ker T = \\{0\\} \\iff T$ 单射 —— 零化度是最便宜的「单射判据」。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'thm.rank-nullity',
      cluster: 'algebra.linmap',
      type: 'theorem',
      label: '秩-零化度定理',
      title: '定理（秩-零化度）：$\\dim V = \\operatorname{rank} T + \\operatorname{null} T$',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '维数'],
      statement: [
        '设 $V$ 是有限维 $K$-向量空间，$T : V \\to W$ 线性。则',
        '',
        '$$\\dim V = \\operatorname{rank} T + \\operatorname{null} T = \\dim \\operatorname{im} T + \\dim \\ker T$$'
      ].join('\n'),
      notes: '⭐ 这是有限维线性代数的**中心定理**：一个线性映射的输入维数，被「留下的」与「丢掉的」两块恰好分完，不多不少。\n\n⭐ 推论（挑三条最常用的）：\n- $T$ 单 $\\iff \\operatorname{rank} T = \\dim V$；$T$ 满 $\\iff \\operatorname{rank} T = \\dim W$；\n- $\\dim V = \\dim W < \\infty$ 时：$T$ 单 $\\iff$ $T$ 满 $\\iff$ $T$ 可逆（**有限维特有**，无限维不成立：移位算子 $T(x_1, x_2, \\ldots) = (0, x_1, x_2, \\ldots)$ 单不满）；\n- $n$ 元齐次线性方程组的解空间维数 $= n - \\operatorname{rank} A$。\n\n⚠ 只有 $\\dim V < \\infty$ 时才是这个干净的等式；无限维时右边是基数的加法，要写成 $\\dim V = \\dim \\ker T + \\dim \\operatorname{im} T$（对基数成立）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 3', 'Lang, Linear Algebra']
    },
    {
      id: 'def.dual-space',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '对偶空间',
      title: '对偶空间 $V^{\\ast}$（Dual Space）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $V$ 是 $K$-向量空间。$V$ 的**对偶空间**定义为从 $V$ 到 $K$ 的线性映射全体：',
        '',
        '$$V^{\\ast} := \\operatorname{Hom}_K(V, K)$$',
        '',
        '其中元素叫**线性泛函**。$V^{\\ast}$ 按逐点和与逐点数乘成为向量空间。',
        '',
        '若 $T : V \\to W$ 线性，定义**转置**（或对偶）映射',
        '',
        '$$T^{\\ast} : W^{\\ast} \\to V^{\\ast}, \\qquad \\varphi \\longmapsto \\varphi \\circ T$$',
        '',
        '它线性，且 $(S \\circ T)^{\\ast} = T^{\\ast} \\circ S^{\\ast}$（**反变**）。'
      ].join('\n'),
      notes: '⭐ 注意方向：$T : V \\to W$ 的对偶 $T^{\\ast}$ 是 $W^{\\ast} \\to V^{\\ast}$，**箭头反过来**。这就是「对偶」这一词的全部含义，也与 $(-)^{\\ast}$ 作为反变函子的地位一致。\n\n⭐ 有限维时 $V \\cong V^{\\ast}$（等维），但**没有自然的同构** —— 要找同构必须先选一组基。而 $V \\cong V^{\\ast\\ast}$ 有自然同构 $v \\mapsto (\\varphi \\mapsto \\varphi(v))$，这是「对偶的对偶回到自己」。\n\n⚠ 无限维时 $V^{\\ast}$ 严格大于 $V$（$\\dim V^{\\ast} = |K|^{\\dim V}$），所以上述同构不成立。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'def.dual-basis',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '对偶基',
      title: '对偶基（Dual Basis）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $\\mathcal{B} = (v_1, \\ldots, v_n)$ 是 $V$ 的有序基。对每个 $i$ 定义 $v_i^{\\ast} : V \\to K$ 为',
        '',
        '$$v_i^{\\ast}(v_j) := \\delta_{ij} = \\begin{cases} 1, & i = j \\\\ 0, & i \\ne j \\end{cases}$$',
        '',
        '（线性地延拓到整个 $V$。）则 $(v_1^{\\ast}, \\ldots, v_n^{\\ast})$ 是 $V^{\\ast}$ 的一组基，叫 $\\mathcal{B}$ 的**对偶基**。于是在有限维时 $\\dim V^{\\ast} = \\dim V$：',
        '',
        '$$\\dim V^{\\ast} = \\dim V$$',
        '',
        '并且对任意 $\\varphi \\in V^{\\ast}$ 有 $\\varphi = \\sum_i \\varphi(v_i)\\, v_i^{\\ast}$。'
      ].join('\n'),
      notes: '⭐ 对偶基是「坐标的第 $i$ 个分量」这个泛函：$v_i^{\\ast}(v) = [v]_{\\mathcal{B}}$ 的第 $i$ 个分量。所以坐标本身就是一个线性泛函。\n\n⭐ 由此得到矩阵的转置：$[T^{\\ast}]_{\\mathcal{B}^{\\ast}}^{\\mathcal{C}^{\\ast}} = ([T]_{\\mathcal{C}}^{\\mathcal{B}})^{\\mathsf{T}}$ —— **对偶就是转置**，这就是转置这个名字的来源。\n\n⚠ 对偶基依赖基的选取：换一组基，对偶基也跟着换（且是反向的，见「基变换」）。',
      refs: ['Lang, Linear Algebra']
    },
    {
      id: 'def.annihilator',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '零化子',
      title: '零化子 $U^{0}$（Annihilator）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $U \\subseteq V$ 是子空间。$U$ 的**零化子**定义为',
        '',
        '$$U^{0} := \\{\\, \\varphi \\in V^{\\ast} : \\varphi(u) = 0 \\ \\text{whenever}\\ u \\in U \\,\\} \\subseteq V^{\\ast}$$',
        '',
        '它是 $V^{\\ast}$ 的子空间，并且（$\\dim V < \\infty$ 时）',
        '',
        '$$\\dim U^{0} = \\dim V - \\dim U, \\qquad (U^{0})^{0} = U$$',
        '',
        '（第二个等号把 $U$ 看成 $V^{\\ast\\ast}$ 的子集，用自然同构 $V \\cong V^{\\ast\\ast}$。）'
      ].join('\n'),
      notes: '⭐ 零化子是「在 $U$ 上消失的那些泛函」，于是 $\\dim U^0 = \\dim V - \\dim U$ 与秩-零化度定理同构：把 $\\pi : V \\to V/U$ 拿来做对偶就得到 $U^{0} \\cong (V/U)^{\\ast}$。\n\n⭐ $(U^{0})^{0} = U$ 说的是：**子空间与零化子互为对偶**（在有限维里是一条双向字典：大的 $U$ 对应小的 $U^0$，反序）。\n\n⚠ 无限维时 $(U^0)^0 \\supseteq U$ 可能严格更大，字典裂开。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'def.direct-sum',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '直和与补空间',
      title: '直和 $V = U \\oplus W$ 与补空间',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $U, W \\subseteq V$ 是子空间。称 $V$ 是 $U$ 与 $W$ 的**（内部）直和**，记',
        '',
        '$$V = U \\oplus W$$',
        '',
        '当且仅当',
        '',
        '- $U + W = V$（每个向量都能写成 $u + w$），',
        '- $U \\cap W = \\{0\\}$（写法唯一）。',
        '',
        '此时每个 $v \\in V$ 都**唯一**地写成 $v = u + w$；映射 $(u, w) \\mapsto u + w$ 是线性同构 $U \\times W \\cong V$。称 $W$ 是 $U$ 在 $V$ 中的**补空间**。'
      ].join('\n'),
      notes: '⭐ 直和的两条 = 「存在性」+「唯一性」，与基的定义（生成 + 无关）是同一个模式。这也解释了为什么一条都不能少：$U + W = V$ 管存在、$U \\cap W = 0$ 管唯一。\n\n⭐ **补空间总是存在**（有限维或一般情形都可以用 Zorn 引理把 $U$ 的基扩成 $V$ 的基，取新增向量张成 $W$），但**不唯一**（$\\mathbb{R}^{2}$ 里 $x$ 轴的补空间可以是任意另一条过原点的直线）。\n\n⚠ 与「商空间」的分工：$V/U$ 是**压掉** $U$，$U \\oplus W$ 是**拆开** $V$。有补空间时 $V/U \\cong W$（由第一同构定理），但一般情形没有这种拆法。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 3']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.vs-linearmap',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'def.linear-map',
      note: '线性映射的定义里出现的就是向量空间的加法与数乘 —— 换个范畴（模）就是同一句话。'
    },
    {
      id: 'dep.linearmap-isomorphism',
      kind: 'definition',
      definition: 'def.linear-map',
      usedBy: 'def.linear-isomorphism',
      note: '同构 = 双射的线性映射；「线性」这一半来自这里，「双射」那一半来自集合论。'
    },
    {
      id: 'dep.linearmap-kernelimage',
      kind: 'definition',
      definition: 'def.linear-map',
      usedBy: 'def.kernel-image-vs',
      note: '核定义为 $T^{-1}(0)$、像定义为 $T(V)$，都只用 $T$ 的线性（其实用不到线性，只是线性保证它们是子空间）。'
    },
    {
      id: 'dep.quotientset-quotientvs',
      kind: 'definition',
      definition: 'def.quotient-set',
      usedBy: 'def.quotient-vs',
      note: '商空间的底层就是「按子空间作陪集」这个商集；新东西只有「运算良定义」那一步。'
    },
    {
      id: 'dep.kernelimage-rank',
      kind: 'definition',
      definition: 'def.kernel-image-vs',
      usedBy: 'def.rank',
      note: '秩定义为像的维数，而维数要用「维数良定义」那一条。'
    },
    {
      id: 'dep.kernelimage-nullity',
      kind: 'definition',
      definition: 'def.kernel-image-vs',
      usedBy: 'def.nullity',
      note: '零化度定义为核的维数，用的是同一个「维数」。'
    },
    {
      id: 'dep.rank-nullity',
      kind: 'definition',
      definition: 'def.rank',
      usedBy: 'thm.rank-nullity',
      note: '定理的两项就是秩与零化度；定理说的是它们的和等于出发空间的维数。'
    },
    {
      id: 'dep.linearmap-dualspace',
      kind: 'definition',
      definition: 'def.linear-map',
      usedBy: 'def.dual-space',
      note: '对偶空间就是取 $W = K$ 的 $\\operatorname{Hom}(V, K)$ —— 线性泛函就是落在一维的线性映射。'
    },
    {
      id: 'dep.dualspace-dualbasis',
      kind: 'definition',
      definition: 'def.dual-space',
      usedBy: 'def.dual-basis',
      note: '对偶基是对偶空间里由原基**指定**出来的一组元素（用 $\\delta_{ij}$ 定义）。'
    },
    {
      id: 'dep.dualspace-annihilator',
      kind: 'definition',
      definition: 'def.dual-space',
      usedBy: 'def.annihilator',
      note: '零化子是 $V^{\\ast}$ 的子空间，由「在 $U$ 上为零」这个条件切出来。'
    },
    {
      id: 'dep.vs-directsum',
      kind: 'definition',
      definition: 'def.subspace',
      usedBy: 'def.direct-sum',
      note: '直和的两个条件（和等于 $V$、交为零）都是子空间层面的陈述。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.first-iso-vs',
      kind: 'implication',
      sources: ['def.kernel-image-vs', 'def.quotient-vs'],
      target: 'thm.first-iso-vs',
      title: '核 / 像 / 商空间 $\\implies$ 第一同构定理',
      proof: [
        '令 $\\overline{T}(v + \\ker T) := T(v)$。',
        '',
        '1. **良定义**：若 $v + \\ker T = v\' + \\ker T$，则 $v - v\' \\in \\ker T$，即 $T(v - v\') = 0$，由线性得 $T(v) = T(v\')$。所以 $\\overline{T}$ 只依赖陪集。',
        '2. **线性**：$\\overline{T}\\bigl((v + \\ker T) + c(v\' + \\ker T)\\bigr) = \\overline{T}\\bigl((v + cv\') + \\ker T\\bigr) = T(v + cv\') = T(v) + cT(v\')$。',
        '3. **单射**：若 $\\overline{T}(v + \\ker T) = 0$，则 $T(v) = 0$，即 $v \\in \\ker T$，于是 $v + \\ker T$ 是零陪集。故 $\\ker \\overline{T} = \\{0\\}$，$\\overline{T}$ 单。',
        '4. **满射**：$\\operatorname{im} \\overline{T} = \\operatorname{im} T$ 由定义直接得到。',
        '',
        '四步齐备，$\\overline{T}$ 是线性同构，$V/\\ker T \\cong \\operatorname{im} T$。∎'
      ].join('\n'),
      note: '四步的顺序值得记住：**先良定义、再线性、再单、再满**。所有「商掉之后构造映射」的证明都是这个骨架 —— 群、环、模、拓扑空间（商拓扑）一模一样。'
    },
    {
      id: 'imp.quotient-universal-vs',
      kind: 'implication',
      sources: ['def.quotient-vs'],
      target: 'thm.quotient-universal-vs',
      title: '商映射 $\\implies$ 万有性质',
      proof: [
        '设 $T : V \\to W$ 线性且 $U \\subseteq \\ker T$。',
        '',
        '**存在性**：令 $\\overline{T}(v + U) := T(v)$。良定义：若 $v - v\' \\in U \\subseteq \\ker T$，则 $T(v - v\') = 0$，即 $T(v) = T(v\')$。线性同第一同构定理的证明。于是 $\\overline{T} \\circ \\pi = T$ 由定义成立。',
        '',
        '**唯一性**：设 $S : V/U \\to W$ 也满足 $S \\circ \\pi = T$。任取 $v + U \\in V/U$，则',
        '',
        '$$S(v + U) = S(\\pi(v)) = T(v) = \\overline{T}(v + U)$$',
        '',
        '故 $S = \\overline{T}$。∎'
      ].join('\n'),
      note: '唯一性只用到一个事实：**$\\pi$ 是满射**（所以每个陪集都有代表元可用）。这是「万有性质」类定理的共同收尾方式。'
    },
    {
      id: 'imp.rank-nullity',
      kind: 'implication',
      sources: ['thm.first-iso-vs', 'thm.dimension', 'def.rank', 'def.nullity'],
      target: 'thm.rank-nullity',
      title: '第一同构定理 + 维数 $\\implies$ 秩-零化度定理',
      proof: [
        '设 $\\dim V = n < \\infty$。',
        '',
        '1. 取 $\\ker T$ 的一组基 $u_1, \\ldots, u_k$（$k = \\operatorname{null} T$），并把它扩充成 $V$ 的一组基',
        '',
        '$$u_1, \\ldots, u_k,\\ v_1, \\ldots, v_{n-k}$$',
        '',
        '（扩充的合法性：Steinitz 交换引理 / 「每个线性无关集都能扩充成基」）。',
        '2. **断言 $T(v_1), \\ldots, T(v_{n-k})$ 是 $\\operatorname{im} T$ 的基。**',
        '   - *生成*：任取 $T(v)$，把 $v$ 按上面的基展开，落在 $\\ker T$ 的那些项被 $T$ 杀掉，剩下 $T(v) = \\sum_j c_j T(v_j)$。',
        '   - *无关*：若 $\\sum_j c_j T(v_j) = 0$，则 $T\\bigl(\\sum_j c_j v_j\\bigr) = 0$，即 $\\sum_j c_j v_j \\in \\ker T$；把它用 $u_i$ 展开并与 $v_j$ 那部分的唯一性比较，得所有 $c_j = 0$。',
        '3. 于是 $\\operatorname{rank} T = \\dim \\operatorname{im} T = n - k = \\dim V - \\operatorname{null} T$，移项即得',
        '',
        '$$\\dim V = \\operatorname{rank} T + \\operatorname{null} T$$',
        '',
        '（另一条路：由第一同构定理 $\\operatorname{im} T \\cong V/\\ker T$，而 $\\dim(V/U) = \\dim V - \\dim U$ 由第 1 步的扩充直接得到 —— 两条路是同一件事的两种说法。）∎'
      ].join('\n'),
      note: '第 2 步的「无关」是最容易漏的一半：**把无关性从 $V$ 的基搬到像上**，用的是「$\\ker T$ 已经作为基的一部分被单独列出」。'
    }
  ]
});
