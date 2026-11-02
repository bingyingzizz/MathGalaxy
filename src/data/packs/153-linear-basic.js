/* ==========================================================================
   内容包 · 线性代数补洞（三）：几个被反复提到的基本操作
   --------------------------------------------------------------------------
   5 个节点。补的是**被别处用到、自己却没定义**的那几个词：
     · 「特征子空间」在 3 个节点正文里出现，无定义；
     · 「幂零」「幂等」分别在 3 / 8 个节点里出现，无定义；
     · 「广义特征向量」在 `thm.primary-decomposition` 的正文里被用，无定义；
     · 「正交相似」全库 0 次，但它是「相似」（`def.similarity`）与「酉相似」之间缺的那一格。

   归属：`def.eigenspace` / `def.nilpotent` / `def.generalized-eigenvector` 进 `algebra.spectral`
        （特征值与 Jordan 型，12 → 15）；
        `def.idempotent` 进 `algebra.linmap`（线性映射与秩，13 → 14）；
        `def.orthogonally-similar` 进 `algebra.inner`（28 → 29）。
       ⚠️ `algebra.inner` 已 28 点，接近 40 的上限，所以后面若再加这一侧的内容要考虑拆团。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数补洞：特征子空间、幂零、幂等、广义特征向量、正交相似',

  nodes: [

    {
      id: 'def.eigenspace',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '特征子空间',
      title: '特征子空间：一个特征值对应的全部特征向量',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '特征子空间', '特征值'],
      statement: [
        '**在做什么**：把「属于同一个特征值的所有特征向量」收成一个子空间。有了它，「可对角化」就有了干净的判据（特征子空间维数之和等于全空间）。',
        '',
        '设 $T : V \\to V$ 线性，$\\lambda$ 是 $T$ 的特征值（`def.eigenvalue`）。$\\lambda$ 的**特征子空间**是',
        '',
        '$$V_{\\lambda} := \\ker(T - \\lambda I) = \\{\\, v \\in V : T(v) = \\lambda v \\,\\} .$$',
        '',
        '它是 $T$-不变子空间，维数 $\\dim V_{\\lambda}$ 叫 $\\lambda$ 的**几何重数**；而 $\\lambda$ 在特征多项式里的重数叫**代数重数**。',
        '',
        '**恒有**：$1 \\le$ 几何重数 $\\le$ 代数重数。',
        '',
        '**可对角化判据**：$T$ 可对角化 $\\iff$ $\\sum_{\\lambda} \\dim V_{\\lambda} = \\dim V$ $\\iff$ 每个特征值的两种重数相等。'
      ].join('\n'),
      notes: [
        '**为什么是「子空间」**：$\\ker(T - \\lambda I)$ 是核，当然是子空间。关键在于它**不是随便的子空间** —— 它由单个特征值决定，且不同的 $V_{\\lambda}$ 之和是**直和**（对应不同特征值的特征向量线性无关）。',
        '**两种重数为什么不同**：$\\begin{pmatrix} 1 & 1 \\\\ 0 & 1\\end{pmatrix}$ 的特征值只有 $1$，代数重数 $2$，但 $\\ker(T - I)$ 只有一维（几何重数 $1$）—— 差的那一维就是 Jordan 块的来源（`thm.jordan-canonical-form`）。',
        '⭐ **广义特征子空间**是它的推广：把 $\\ker(T - \\lambda I)^{k}$ 取到稳定为止，维数正好等于代数重数。Jordan 形的分块就是按这个来的（见 `thm.primary-decomposition`）。',
        '⚠️ 记号约定不一致：有书写 $E_{\\lambda}$（eigenspace）、有写 $V(\\lambda)$。本图用 $V_{\\lambda}$，与 `def.eigenvalue` 的记法对齐。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「The Rational and Jordan Forms」· 特征子空间',
        '北大《高等代数》· 特征子空间'
      ]
    },

    {
      id: 'def.generalized-eigenvector',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '广义特征向量',
      title: '广义特征向量与广义特征子空间',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '广义特征向量', 'Jordan', '幂零'],
      statement: [
        '**在做什么**：特征向量不够用时（几何重数 < 代数重数）就退一步：不要求 $T(v) = \\lambda v$，只要求「反复作用几次之后被 $\\lambda$ 吃掉」。这样就能凑够维数。',
        '',
        '设 $T : V \\to V$ 线性，$\\lambda$ 是特征值。$v \\ne 0$ 叫 $\\lambda$ 的**广义特征向量**，若',
        '',
        '$\\Bigl(T - \\lambda I\\Bigr)^{k}(v) = 0$（对某个 $k \\ge 1$）',
        '',
        '最小的这样的 $k$ 叫 $v$ 的**阶**。全体广义特征向量加上 $0$ 构成**广义特征子空间**',
        '',
        '$$G_{\\lambda} := \\bigcup_{k \\ge 1}\\ker(T - \\lambda I)^{k} = \\ker(T - \\lambda I)^{m} ,$$',
        '',
        '其中 $m$ 是 $\\lambda$ 的代数重数（取到这个幂就稳定了）。',
        '',
        '**核心事实**：$\\dim G_{\\lambda} = $ 代数重数，且 $V = \\bigoplus_{\\lambda} G_{\\lambda}$（`thm.primary-decomposition` 的根子空间分解）。'
      ].join('\n'),
      notes: [
        '**为什么这能把维数补上**：$T - \\lambda I$ 在 $V_{\\lambda}$ 上为零，但在 $G_{\\lambda}$ 上是**幂零**的（`def.nilpotent`）。\n\n幂零算子的结构非常简单（一串链），所以把 $T$ 限制在 $G_{\\lambda}$ 上就是「$\\lambda I$ + 一个幂零算子」—— 这正是 Jordan 块。',
        '**阶的含义**：$k = 1$ 就是普通特征向量；$k = 2$ 意味着 $T(v) = \\lambda v + u$（$u$ 是特征向量）—— 这就是 Jordan 链的第二项。所以「广义特征向量」= 「Jordan 链上的点」。',
        '⚠️ 广义特征子空间**不是** $T$ 的特征子空间，但它是 $T$-不变的；而且 $T$ 在其上不可对角化（除非它就等于 $V_{\\lambda}$）。',
        '⚠️ 只有**特征值**才有广义特征向量（$\\lambda$ 必须满足 $\\det(T - \\lambda I) = 0$），否则 $T - \\lambda I$ 可逆、幂次永不为零。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「The Rational and Jordan Forms」· 广义特征向量',
        '北大《高等代数》· 广义特征向量'
      ]
    },

    {
      id: 'def.nilpotent',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '幂零',
      title: '幂零算子与幂零矩阵',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '幂零', 'Jordan', '特征值'],
      statement: [
        '**在做什么**：刻画「反复作用就归零」的那类算子。它是幂零部分的结构定理（Jordan 形里除了对角之外的全部内容）的主角。',
        '',
        '设 $T : V \\to V$ 线性（$\\dim V = n < \\infty$）。称 $T$ **幂零**，若',
        '',
        '$T^{k} = 0$（对某个 $k \\ge 1$）',
        '',
        '矩阵情形：$A^{k} = 0$ 时称 $A$ **幂零矩阵**。',
        '',
        '**等价条件（这几条常用来判定）**：',
        '',
        '1. $T$ 的特征值全是 $0$；',
        '2. 特征多项式是 $x^{n}$；',
        '3. $T^{n} = 0$（$n = \\dim V$ 就够了 —— Cayley–Hamilton）。',
        '',
        '**结构**：幂零算子总可以化成若当块 $J_{k}(0)$ 的直和；最大块的阶数等于 $T$ 的**幂零指数**（最小的使 $T^{k} = 0$ 的 $k$）。'
      ].join('\n'),
      notes: [
        '**最标准的例子**：移位算子 $T(x_{1}, \\ldots, x_{n}) = (0, x_{1}, \\ldots, x_{n-1})$，$T^{n} = 0$ 而 $T^{n-1} \\ne 0$。它的矩阵是「上移一位」的矩阵，正是单个 $J_{n}(0)$。',
        '⭐ **为什么幂零这么重要**：任何算子都能拆成「可对角部分 + 幂零部分」$T = S + N$（$S$ 可对角、$N$ 幂零、$SN = NS$，这叫 **Jordan–Chevalley 分解**）。所以「理解幂零」= 「理解不可对角化的全部困难」。',
        '⚠️ 幂零**不能**与「秩小于 $n$」混：$\\begin{pmatrix} 0 & 1 \\\\ 0 & 0\\end{pmatrix}$ 幂零，但 $\\begin{pmatrix} 0 & 0 \\\\ 0 & 1\\end{pmatrix}$ 秩也是 $1$ 而不幂零（它的特征值是 $1$ 和 $0$）。\n\n判据是**特征值全零**，不是秩。',
        '⚠️ 幂零矩阵的迹与行列式都是 $0$，但**反过来不成立**（$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1\\end{pmatrix}$ 两者都是 $0$ 却不幂零）。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「The Rational and Jordan Forms」· 幂零算子',
        '北大《高等代数》· 幂零矩阵'
      ]
    },

    {
      id: 'def.idempotent',
      cluster: 'algebra.linmap',
      type: 'definition',
      label: '幂等',
      title: '幂等算子与投影',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '幂等', '投影', '直和'],
      statement: [
        '**在做什么**：「做两次和做一次一样」的算子。它等价于「把空间劈成两块、扔掉其中一块」，所以幂等算子与直和分解是同一件事。',
        '',
        '设 $T : V \\to V$ 线性。称 $T$ **幂等**（idempotent），若',
        '',
        '$$T^{2} = T .$$',
        '',
        '矩阵情形：$A^{2} = A$。',
        '',
        '**与直和的对应**：$T$ 幂等 $\\iff$ $V = \\ker T \\oplus \\operatorname{im} T$，且 $T$ 就是沿 $\\ker T$ 到 $\\operatorname{im} T$ 的**投影**。\n\n此时 $I - T$ 也幂等，且 $\\ker T = \\operatorname{im}(I - T)$。',
        '',
        '**最小多项式**：幂等算子的最小多项式整除 $x^{2} - x = x(x-1)$，所以它一定可对角化、特征值只能是 $0$ 或 $1$。'
      ].join('\n'),
      notes: [
        '⚠️ **幂等 $\\ne$ 正交投影**：一般的幂等算子（投影）只是「沿着某个补空间投出去」，**不保证与像垂直**。像与核正交的投影才是 `def.orthogonal-projection`（那要求 $T^{*} = T$，即自伴 + 幂等）。把两者混同会得出「投影总是最短距离」这种错误结论。',
        '**两种投影的判据对照**：幂等 $\\iff T^{2} = T$；正交投影 $\\iff T^{2} = T$ 且 $T^{*} = T$。差的就是自伴那一条。',
        '⭐ **谱分解的积木**：谱定理把 $A$ 写成 $\\sum \\lambda_i P_i$，其中每个 $P_i$ 都是**正交**幂等算子，且两两正交、和为 $I$（`thm.spectral-matrix` 的注）。所以幂等元是「把谱切开」的最小单位。',
        '⚠️ 幂等与幂零是两个极端：$T^{2} = T$ 停止变化，$T^{k} = 0$ 最终归零。除了 $T = 0$（两者都满足）之外没有交集。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 投影',
        '北大《高等代数》· 幂等变换'
      ]
    },

    {
      id: 'def.orthogonally-similar',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '正交相似',
      title: '正交相似与酉相似',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '正交相似', '酉相似', '合同'],
      statement: [
        '**在做什么**：填「相似」与「合同」之间的那一格 —— 当变换既保持结构（相似）又保持长度（正交/酉）时，就是它。谱定理说的正是「对称矩阵正交相似于对角阵」。',
        '',
        '设 $A, B \\in M_{n}(\\mathbb{R})$。称 $A$ 与 $B$ **正交相似**，若存在**正交**矩阵 $Q$ 使',
        '',
        '$$B = Q^{T} A\\, Q = Q^{-1} A\\, Q .$$',
        '',
        '复情形把 $Q$ 换成**酉**矩阵 $U$，得到**酉相似** $B = U^{*}AU = U^{-1}AU$。',
        '',
        '**为什么这一格重要**：正交/酉矩阵同时满足 $P^{-1} = P^{T}$（或 $P^{*}$），所以',
        '',
        '正交相似 = 相似 + 合同（三者的区别见 `def.orthogonally-similar` 的注）',
        '',
        '它既保持特征值（相似的性质），又保持内积结构（合同的性质）—— 所以它是**稳定**的相似，条件数为 $1$。'
      ].join('\n'),
      notes: [
        '⭐ **谁正交相似于对角阵**：实对称矩阵（`thm.spectral-matrix`）；更一般地，实正规矩阵正交相似于**分块对角**（$1\\times1$ 与 $2\\times2$ 块，因为非实特征值成对出现）。\n\n而**任意**矩阵都酉相似于上三角（`thm.schur-triangularization`）—— 这就是「正交相似能化简到什么程度」的完整答案。',
        '⚠️ 三个概念的区别要牢牢记住：**相似** $P^{-1}AP$（任意可逆 $P$，保持特征值）；**合同** $P^{T}AP$（任意可逆 $P$，保持惯性）；**正交相似** $Q^{T}AQ$ 且 $Q^{-1} = Q^{T}$（两者都保持）。只在第三个里「$P^{-1}$ 与 $P^{T}$ 是同一个东西」。',
        '⚠️ 本图 `def.similarity` 讲的是最一般的相似。别把「$A$ 相似于对角阵」与「$A$ 正交相似于对角阵」混起来 —— 前者只要求特征向量**够多**，后者还要求它们**互相垂直**（这就是正规，`def.normal-matrix`）。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 酉等价',
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 谱定理'
      ]
    }
  ],

  edges: [
    { id: 'dep.eigsp-eig', kind: 'definition',
      definition: 'def.eigenvalue', usedBy: 'def.eigenspace',
      note: '特征子空间是「属于某个特征值的全部特征向量」，先有特征值。' },
    { id: 'dep.eigsp-ker', kind: 'definition',
      definition: 'def.kernel-image-vs', usedBy: 'def.eigenspace',
      note: '$V_{\\lambda} = \\ker(T - \\lambda I)$，直接是核。' },
    { id: 'dep.eigsp-invariant', kind: 'definition',
      definition: 'def.invariant-subspace', usedBy: 'def.eigenspace',
      note: '特征子空间是 $T$-不变的，这是它能用来分解空间的前提。' },

    { id: 'dep.genvec-eigsp', kind: 'definition',
      definition: 'def.eigenspace', usedBy: 'def.generalized-eigenvector',
      note: '阶为 $1$ 的广义特征向量就是普通特征向量：$V_{\\lambda} \\subseteq G_{\\lambda}$。' },
    { id: 'dep.genvec-nilp', kind: 'definition',
      definition: 'def.nilpotent', usedBy: 'def.generalized-eigenvector',
      note: '$T - \\lambda I$ 在 $G_{\\lambda}$ 上是幂零的 —— 这就是「广义」二字的全部内容。' },

    { id: 'dep.nilp-eig', kind: 'definition',
      definition: 'def.eigenvalue', usedBy: 'def.nilpotent',
      note: '判据「特征值全为 $0$」直接用特征值来陈述。' },
    { id: 'dep.nilp-cayley', kind: 'definition',
      definition: 'thm.cayley-hamilton', usedBy: 'def.nilpotent',
      note: '$T^{n} = 0$ 这一条由 Cayley–Hamilton（特征多项式为 $x^{n}$）立刻得到。' },

    { id: 'dep.idem-linmap', kind: 'definition',
      definition: 'def.linear-map', usedBy: 'def.idempotent',
      note: '幂等是线性算子的条件 $T^{2} = T$。' },
    { id: 'dep.idem-directsum', kind: 'definition',
      definition: 'def.direct-sum', usedBy: 'def.idempotent',
      note: '幂等 $\\iff V = \\ker T \\oplus \\operatorname{im} T$，与直和是同一件事。' },
    { id: 'dep.idem-orthproj', kind: 'definition',
      definition: 'def.orthogonal-projection', usedBy: 'def.idempotent',
      note: '正交投影是「幂等 + 自伴」的特例；在注里点明区别。' },

    { id: 'dep.orthsim-similarity', kind: 'definition',
      definition: 'def.similarity', usedBy: 'def.orthogonally-similar',
      note: '正交相似是相似的加强（把 $P$ 限定成正交矩阵）。' },
    { id: 'dep.orthsim-congruent', kind: 'definition',
      definition: 'def.congruent-matrices', usedBy: 'def.orthogonally-similar',
      note: '同一时候它也是合同 —— 因为 $Q^{T} = Q^{-1}$。这一条正是「填上那一格」的关键。' },
    { id: 'dep.orthsim-unitary', kind: 'definition',
      definition: 'def.unitary-matrix', usedBy: 'def.orthogonally-similar',
      note: '复情形把正交矩阵换成酉矩阵。' }
  ]
});
