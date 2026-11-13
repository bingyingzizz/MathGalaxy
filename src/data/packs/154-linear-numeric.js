/* ==========================================================================
   内容包 · 线性代数补洞（四）：矩阵分解与最小二乘
   --------------------------------------------------------------------------
   5 个节点，**新开一个星团** `algebra.numeric`（矩阵分解与最小二乘）。

   为什么开新团：前三个包补的都是「结构」（矩阵分类 / 双线性型的几何 / 基本操作），
   而这 5 个是**同一件事的一整套做法** —— 「怎么真的把 $Ax = b$ 解出来、解不动时怎么
   求最近解」。按本图的星团判据（为一个「能用的东西」而存在的一整套结果），
   它就是「解线性方程组」那台机器，和「内积空间上的算子分类」不是同一台。

   ⛔ 补之前：QR / LU / 最小二乘 / 伪逆 / 矩阵范数在全库**只有零星正文提及、无定义**
      （各 1–2 次），而 `def.elementary-matrix`（初等变换）与 `thm.linear-system-solutions`
      （解结构）已经在 —— 也就是说「消元的零件」有，「分解的成品」没有。

   ⚠️ 口径：这一包写的是**数学内容**（分解的存在唯一性、最小二乘的变分刻画），
      不写算法复杂度、不写浮点误差分析 —— 那些属于数值分析，本图未收录。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数补洞：矩阵分解与最小二乘',

  nodes: [

    {
      id: 'def.matrix-norm',
      cluster: 'algebra.numeric',
      type: 'definition',
      /* 同词不同物（已核对）—— 与 prop.matrix-category 不是同一个概念，别合并。 */
      distinctFrom: ['prop.matrix-category'],
      label: '矩阵范数',
      title: '矩阵范数与算子范数',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '矩阵范数', '算子范数'],
      statement: [
        '**在做什么**：给矩阵量「大小」。有两套口径，必须分清：把矩阵当**一堆数**量（Frobenius），还是当**一个算子**量（算子范数）。',
        '',
        '**算子范数**（从属范数）：给定 $\\mathbb{R}^{n}$ 上的向量范数 $\\lVert\\cdot\\rVert$，定义',
        '',
        '$$\\lVert A\\rVert := \\sup_{x \\ne 0}\\frac{\\lVert Ax\\rVert}{\\lVert x\\rVert} = \\sup_{\\lVert x\\rVert = 1}\\lVert Ax\\rVert .$$',
        '',
        '**Frobenius 范数**：$\\lVert A\\rVert_{F} := \\bigl(\\sum_{i,j}\\lvert a_{ij}\\rvert^{2}\\bigr)^{1/2}$（就是把它当 $mn$ 维向量量长度）。',
        '',
        '**基本性质**：两者都是范数；都满足 $\\lVert AB\\rVert \\le \\lVert A\\rVert\\,\\lVert B\\rVert$（次乘性）；算子范数还额外满足 $\\lVert Ax\\rVert \\le \\lVert A\\rVert\\,\\lVert x\\rVert$。',
        '',
        '**与谱的关系**：$\\lVert A\\rVert_{2} = \\sigma_{\\max}(A) = \\sqrt{\\lambda_{\\max}(A^{*}A)}$（谱范数 = 最大奇异值）；$\\lVert A\\rVert_{F} = \\bigl(\\sum \\sigma_{i}^{2}\\bigr)^{1/2}$。'
      ].join('\n'),
      notes: [
        '**两种口径为什么都要**：算子范数量的是「最大放大倍数」，直接对应谱半径与收敛性（$\\rho(A) \\le \\lVert A\\rVert$，`def.spectral-radius`）；Frobenius 范数量的是「一共有多大」，计算容易、且对低秩逼近天然合适（Eckart–Young 用它陈述）。',
        '⚠️ **Frobenius 不是算子范数**（除了一维情形），它不满足「从某个向量范数诱导」；所以 $\\lVert I\\rVert_{F} = \\sqrt{n}$ 而任何算子范数都有 $\\lVert I\\rVert = 1$。判据就在这里。',
        '⚠️ 谱范数用**奇异值**而不是特征值：$\\lVert A\\rVert_2 = \\sigma_{\\max}$，而 $\\rho(A) = \\max\\lvert\\lambda\\rvert$。两者只在正规矩阵上相等（`def.normal-matrix`）。',
        '⭐ **为什么 $\\lVert\\cdot\\rVert$ 常用来估误差**：$\\lVert x - x_{0}\\rVert \\le \\lVert A^{-1}\\rVert\\,\\lVert b - Ax_{0}\\rVert$ —— 条件数 $\\kappa = \\lVert A\\rVert\\lVert A^{-1}\\rVert$ 就是这么来的（本图不展开数值分析，只记这个接口）。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 范数',
        'Horn–Johnson, Matrix Analysis, 2nd ed., Ch. 5'
      ]
    },

    {
      id: 'thm.lu-decomposition',
      cluster: 'algebra.numeric',
      type: 'theorem',
      label: 'LU 分解',
      title: 'LU 分解：把消元写成两个三角矩阵',
      regions: ['algebra'],
      tags: ['定理', '线性代数', 'LU 分解', '消元'],
      statement: [
        '**在做什么**：高斯消元其实是在乘一串初等矩阵。把那些初等矩阵乘起来记成 $L$，消元的结果记成 $U$，就得到 $A = LU$。',
        '',
        '设 $A \\in M_{n}(K)$，且它的 $n$ 个**顺序主子式**全非零。则存在唯一的',
        '',
        '$$A = LU ,$$',
        '',
        '其中 $L$ 是**单位下三角**（对角元全为 $1$）、$U$ 是**上三角**。',
        '',
        '**置换版本（总是存在）**：对任意可逆 $A$ 都存在置换矩阵 $P$ 使 $PA = LU$（行交换让主元非零）。',
        '',
        '**用途**：解 $Ax = b$ 变成「解 $Ly = b$（前代）+ 解 $Ux = y$（回代）」，两个都是 $O(n^{2})$；而且 $A$ 不变时 $L, U$ 可以反复用。'
      ].join('\n'),
      notes: '**为什么是 $LU$**：高斯消元的每一步都是左乘初等矩阵，把消元步乘起来即 $L^{-1}$；顺序主子式非零保证不换行。完整证明（含 Schur 补归纳与唯一性）见边 `imp.lu-decomposition-proof`；置换版本用部分主元法，见同边证明末段。',
      refs: [
      'Horn–Johnson, Matrix Analysis, 2nd ed., Ch. 3',
        'Hoffman–Kunze, Linear Algebra, 「Linear Transformations」· 三角化与消元',
        '北大《高等代数》· 矩阵的三角分解'
      ]
    },

    {
      id: 'thm.qr-decomposition',
      cluster: 'algebra.numeric',
      type: 'theorem',
      label: 'QR 分解',
      title: 'QR 分解：把列正交化写成三角矩阵',
      regions: ['algebra'],
      tags: ['定理', '线性代数', 'QR 分解', 'Gram–Schmidt'],
      statement: [
        '**在做什么**：Gram–Schmidt 正交化其实也是在乘一串矩阵 —— 把结果记成 $R$、正交化后的基记成 $Q$，就得到 $A = QR$。',
        '',
        '设 $A \\in M_{m\\times n}(\\mathbb{R})$ 的列线性无关（$m \\ge n$）。则存在**唯一**的分解',
        '',
        '$$A = QR ,$$',
        '',
        '其中 $Q \\in M_{m\\times n}$ 的列**标准正交**（$Q^{T}Q = I_{n}$），$R \\in M_{n}(\\mathbb{R})$ 是**上三角**且对角元全正。',
        '',
        '**复情形**：$A = QR$，$Q^{*}Q = I$，$R$ 上三角（对角元取正实数）。',
        '',
        '**方阵情形**：$A$ 可逆时 $Q$ 是正交（酉）矩阵 —— 这就是 $A$ 的「正交 $\\times$ 上三角」分解，与 LU 的「下三角 $\\times$ 上三角」互为对照。'
      ].join('\n'),
      notes: [
        '**它其实就是 Gram–Schmidt**：把 $A$ 的列 $a_{1}, \\ldots, a_{n}$ 正交化成 $q_{1}, \\ldots, q_{n}$（`thm.gram-schmidt`），则 $a_{k} = \\sum_{i \\le k} r_{ik}q_{i}$，系数拼起来就是上三角 $R$。\n\n唯一的差别是 QR 通常要求 $R$ 的对角为正（这固定了 $q_k$ 的符号）。',
        '⭐ **为什么不用 Gram–Schmidt 而用 QR**：数学上等价，但数值上不同 —— Gram–Schmidt 会损失正交性（$Q^{T}Q$ 偏离 $I$），实际算法用 Householder 反射或 Givens 旋转直接算 $Q$。**本图只做数学内容，不展开算法**（数值分析不在收录范围）。',
        '**与最小二乘的关系**：$\\lVert Ax - b\\rVert^{2} = \\lVert Rx - Q^{T}b\\rVert^{2} + \\lVert (I - QQ^{T})b\\rVert^{2}$，最后一项与 $x$ 无关 —— 所以最小二乘解就是解 $Rx = Q^{T}b$（`thm.least-squares`）。\n\n这是 QR 在数值上受欢迎的真正原因。',
        '⚠️ **列线性无关**这个前提不能去：否则 $Q$ 的列不全、$R$ 不可逆，分解仍可做但失去意义（那种情形要用列主元 QR 或伪逆）。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· Gram–Schmidt',
        'Horn–Johnson, Matrix Analysis, 2nd ed., Ch. 3'
      ]
    },

    {
      id: 'thm.least-squares',
      cluster: 'algebra.numeric',
      type: 'theorem',
      label: '最小二乘',
      title: '最小二乘：无解时求最近的解',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '最小二乘', '法方程', '投影'],
      statement: [
        '**在做什么**：$Ax = b$ 可能无解（$b$ 不在列空间里）。那就退一步：找一个 $x$ 让 $Ax$ 离 $b$ 最近 —— 这就是最小二乘。',
        '',
        '设 $A \\in M_{m\\times n}(\\mathbb{R})$ 列满秩、$b \\in \\mathbb{R}^{m}$。**最小二乘解**是使',
        '',
        '$$\\lVert Ax - b\\rVert_{2}$$',
        '',
        '取最小的 $x$。它由**法方程**（normal equation）唯一确定：',
        '',
        '$$A^{T}A\\, x = A^{T} b .$$',
        '',
        '由于列满秩时 $A^{T}A$ 正定（可逆），解为 $x = (A^{T}A)^{-1}A^{T}b$。',
        '',
        '**几何意义**：$Ax^{*}$ 是 $b$ 在 $A$ 的列空间上的**正交投影**，残差 $b - Ax^{*}$ 与列空间正交。'
      ].join('\n'),
      notes: [
        '**法方程就是「残差与列空间正交」**：$(b - Ax) \\perp \\operatorname{col}(A)$ $\\iff$ $A^{T}(b - Ax) = 0$ $\\iff$ $A^{T}Ax = A^{T}b$。所以它不是一个技巧，而是投影的定义（`def.orthogonal-projection`）。',
        '⭐ **它是正交投影的具体算法**：把「往子空间投影」写成矩阵，就是 $P = A(A^{T}A)^{-1}A^{T}$。这个 $P$ 幂等且对称（`def.idempotent` 的注里说的「正交幂等」），正是那个投影算子。',
        '⚠️ **不要真的去求 $A^{T}A$ 的逆**（数学上对、数值上有害：条件数被平方）。实际用 QR 或 SVD：$x = R^{-1}Q^{T}b$（`thm.qr-decomposition` 的注）。本图只记数学结论，不展开算法。',
        '⚠️ **列不满秩时**最小二乘解**不唯一**（有无穷多，都给出同样的残差），这时要用**伪逆**取「范数最小」的那一个（`def.pseudoinverse`）。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 最佳逼近',
        'Horn–Johnson, Matrix Analysis'
      ]
    },

    {
      id: 'def.pseudoinverse',
      cluster: 'algebra.numeric',
      type: 'definition',
      label: '伪逆',
      title: 'Moore–Penrose 伪逆：不可逆矩阵的「逆」',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '伪逆', 'Moore–Penrose', 'SVD'],
      statement: [
        '**在做什么**：奇异矩阵、长方矩阵都没有逆，但仍然有「最好用的那个替代品」。伪逆 $A^{+}$ 是唯一满足四条 Penrose 条件的矩阵。',
        '',
        '设 $A \\in M_{m\\times n}(\\mathbb{K})$，其中 $\\mathbb{K} = \\mathbb{R}$ 或 $\\mathbb{C}$（$^{*}$ 取转置 / 共轭转置）。**Moore–Penrose 伪逆** $A^{+} \\in M_{n\\times m}(\\mathbb{K})$ 是唯一满足下面四条的矩阵：（⚠ 一般域上四条**未必有解**：$K = \\mathbb{F}_{2}$、$A = (1\\, 1)$ 会把四条化成 $1 = 0$。）',
        '',
        '$$A A^{+} A = A, \\qquad A^{+} A A^{+} = A^{+} ,$$',
        '',
        '$$(AA^{+})^{*} = AA^{+}, \\qquad (A^{+}A)^{*} = A^{+}A .$$',
        '',
        '**由 SVD 构造**：若 $A = U\\Sigma V^{*}$（`thm.svd`），则',
        '',
        '$$A^{+} = V\\Sigma^{+}U^{*} ,$$',
        '',
        '其中 $\\Sigma^{+}$ 是把 $\\Sigma$ 的非零对角元取倒数、再转置。',
        '',
        '**当 $A$ 可逆时** $A^{+} = A^{-1}$；若 $A$ 列满秩，则 $A^{+} = (A^{*}A)^{-1}A^{*}$（最小二乘解 $x = A^{+}b$）。'
      ].join('\n'),
      notes: [
        '**四条条件的含义**：前两条说 $AA^{+}$ 与 $A^{+}A$ 是幂等（投影，`def.idempotent`），后两条说这两个投影**自伴**（正交投影）。所以 $A^{+}$ 干的事是：**把 $b$ 正交投影到列空间、再在核的方向上取零** —— 也就是「唯一的最小范数最小二乘解」。',
        '⭐ **它是「解不唯一时挑一个」的规范办法**：$Ax = b$ 相容但解无穷多时，$A^{+}b$ 给出其中**范数最小**的那个；$Ax = b$ 不相容时，$A^{+}b$ 给出**残差最小**的那个。所以它同时接管了「最小范数解」与「最小二乘解」两件事。',
        '⚠️ 伪逆**不**满足 $(AB)^{+} = B^{+}A^{+}$（一般不成立，只有特殊情形才对）。这与逆矩阵的 $(AB)^{-1} = B^{-1}A^{-1}$ 形成鲜明对照 —— 是本概念最容易记错的地方。',
        '⚠️ 记号：$A^{+}$ 与 $A^{\\dagger}$ 都在用（后者在物理里常见）。本图用 $A^{+}$，以免与共轭转置 $A^{*}$ 混淆。'
      ].join('\n\n'),
      refs: [
        'Horn–Johnson, Matrix Analysis',
        'Ben-Israel–Greville, Generalized Inverses: Theory and Applications'
      ]
    }
  ],

  edges: [
    { id: 'dep.mnorm-vs', kind: 'definition',
      definition: 'def.vs', usedBy: 'def.matrix-norm',
      note: '算子范数由向量范数诱导，所以先有向量空间与它的范数概念。' },
    { id: 'dep.mnorm-inner', kind: 'definition',
      definition: 'def.inner-product', usedBy: 'def.matrix-norm',
      note: 'Frobenius 范数就是把它当向量取欧氏长度；谱范数要用奇异值（内积的产物）。' },
    { id: 'dep.mnorm-svd', kind: 'definition',
      definition: 'thm.svd', usedBy: 'def.matrix-norm',
      note: '$\\lVert A\\rVert_2 = \\sigma_{\\max}$、$\\lVert A\\rVert_F = (\\sum\\sigma_i^2)^{1/2}$ 都靠 SVD。' },
    { id: 'dep.mnorm-radius', kind: 'definition',
      definition: 'def.spectral-radius', usedBy: 'def.matrix-norm',
      note: '$\\rho(A) \\le \\lVert A\\rVert$ —— 节里把两条「大小」的度量接上。' },

    { id: 'dep.lu-elem', kind: 'definition',
      definition: 'def.elementary-matrix', usedBy: 'thm.lu-decomposition',
      note: 'LU 分解就是高斯消元（初等行变换）的矩阵形式。' },
    { id: 'dep.lu-sylvester', kind: 'analogy',
      a: 'thm.sylvester-criterion', b: 'thm.lu-decomposition',
      note: '「顺序主子式全非零」这个前提，与正定判据用的是同一批主子式。' },
    { id: 'dep.lu-posdef', kind: 'definition',
      definition: 'def.positive-definite-matrix', usedBy: 'thm.lu-decomposition',
      note: '正定时 LU 变成 Cholesky $A = LL^{T}$，在注里点出。' },

    { id: 'dep.qr-gs', kind: 'implication',
      sources: ['thm.gram-schmidt'], target: 'thm.qr-decomposition',
      proof: '**存在性（Gram–Schmidt）。** 对列 $a_{1},\\ldots,a_{n}$ 作 Gram–Schmidt：$q_{k}=\\bigl(a_{k}-\\sum_{i<k}\\langle a_{k},q_{i}\\rangle q_{i}\\bigr)\\big/\\|\\cdots\\|$，$r_{ik}=\\langle a_{k},q_{i}\\rangle$、$r_{kk}=\\|a_{k}-\\sum_{i<k}r_{ik}q_{i}\\|>0$（列线性无关保证分母非零）。由递推 $a_{k}=\\sum_{i\\le k}r_{ik}q_{i}$，即 $A=QR$：$Q$ 的列标准正交，$R$ 上三角且对角元全正。\n\n**唯一性。** 设 $QR=Q\'R\'$，则 $Q\'^{*}Q=R\'R^{-1}$。左边是酉矩阵（两个列标准正交矩阵之积，$n\\times n$），右边是上三角（上三角阵的逆与乘积仍是上三角）；酉且上三角的矩阵必为对角阵，其对角元模长为 $1$。$R,R\'$ 的对角元均为正，故 $R\'R^{-1}$ 的对角元是正实数，模长 $1$ 迫使它等于 $1$；于是 $R\'R^{-1}=I$，即 $R=R\'$、$Q=Q\'$。∎',
      note: 'QR 分解就是 Gram–Schmidt 的矩阵写法 —— 这一步是理解 QR 的全部。' },
    { id: 'dep.qr-unitary', kind: 'definition',
      definition: 'def.unitary-matrix', usedBy: 'thm.qr-decomposition',
      note: '方阵情形 $Q$ 是正交（酉）矩阵。' },

    { id: 'dep.ls-proj', kind: 'definition',
      definition: 'def.orthogonal-projection', usedBy: 'thm.least-squares',
      note: '最小二乘解的几何意义是「$b$ 在列空间上的正交投影」，法方程就是它的代数形式。' },
    { id: 'dep.ls-gram', kind: 'definition',
      definition: 'def.gram-matrix', usedBy: 'thm.least-squares',
      note: '$A^{T}A$ 正是 $A$ 的列向量的 Gram 矩阵；正定 $\\iff$ 列满秩。' },
    { id: 'dep.ls-posdef', kind: 'definition',
      definition: 'def.positive-definite-matrix', usedBy: 'thm.least-squares',
      note: '列满秩 $\\implies$ $A^{T}A$ 正定 $\\implies$ 法方程唯一可解。' },

    { id: 'dep.pinv-svd', kind: 'definition',
      definition: 'thm.svd', usedBy: 'def.pseudoinverse',
      note: '伪逆的标准构造就是 SVD：$A^{+} = V\\Sigma^{+}U^{*}$。' },
    { id: 'dep.pinv-idem', kind: 'definition',
      definition: 'def.idempotent', usedBy: 'def.pseudoinverse',
      note: '$AA^{+}$ 与 $A^{+}A$ 都是（正交）幂等算子，这是四条 Penrose 条件里两条的含义。' },
    { id: 'dep.pinv-invertible', kind: 'definition',
      definition: 'def.invertible-matrix', usedBy: 'def.pseudoinverse',
      note: '可逆时伪逆就是逆 —— 它是「逆」的推广，不是另一样东西。' },
    {
      "id": "imp.lu-decomposition-proof",
      "kind": "implication",
      "sources": [
        "def.matrix",
        "def.elementary-matrix",
        "def.invertible-matrix"
      ],
      "target": "thm.lu-decomposition",
      "title": "顺序主子式非零 $\\implies$ 唯一的 $LU$ 分解",
      "proof": "对 $n$ 归纳。$n=1$ 时 $A=(a_{11})$，$\\Delta_1=a_{11}\\ne0$，取 $L=(1)$、$U=(a_{11})$。\n\n设 $n\\ge2$，$A=\\begin{pmatrix}a&b^{T}\\\\ c&D\\end{pmatrix}$，$a=a_{11}\\ne0$。令 $E$ 为把第 $i$ 行减去 $(c_i/a)$ 倍第一行（$i=2,\\ldots,n$）的初等矩阵之积，则 $EA=\\begin{pmatrix}a&b^{T}\\\\ 0&S\\end{pmatrix}$，其中 $S=D-cb^{T}/a$ 是 Schur 补。\n\nSchur 补的顺序主子式满足 $\\Delta_{k+1}(A)=a\\,\\Delta_k(S)$（$k=1,\\ldots,n-1$：对前 $k+1$ 阶主子矩阵同步做上述行变换，其行列式等于 $a\\det S_k$）。由 $\\Delta_j(A)\\ne0$ 得 $\\Delta_k(S)\\ne0$，归纳得 $S=L_S U_S$。\n\n于是\n$$A=E^{-1}\\begin{pmatrix}1&0\\\\ 0&L_S\\end{pmatrix}\\begin{pmatrix}a&b^{T}\\\\ 0&U_S\\end{pmatrix},$$\n两个因子分别是单位下三角与上三角，乘起来即 $A=LU$。\n\n唯一性：若 $L_1U_1=L_2U_2$，则 $L_2^{-1}L_1=U_2U_1^{-1}$。左边是单位下三角，右边是上三角；一个矩阵同时是两者必为对角矩阵，而单位下三角的对角元全为 $1$，故两边都是 $I$，$L_1=L_2$、$U_1=U_2$。\n\n置换版本：对可逆 $A$ 做带行交换的高斯消元（部分主元法）；每次交换第 $i,j$ 行等于左乘置换矩阵 $P_{ij}$，消元步左乘初等矩阵。累积得 $PA=LU$，$P$ 为置换矩阵之积。∎",
      "note": "完整证明见本条边；节点注只保留动机与缺口。"
    },
  ]
});
