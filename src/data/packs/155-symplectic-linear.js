/* ==========================================================================
   内容包 · 辛几何（一）：辛向量空间
   --------------------------------------------------------------------------
   6 个节点。用户原话：「辛基、Lagrange 定理这些做了吗」→「我也许是想说 Lagrange
   子空间？我记得这块有个以他命名的东西来着」。

   查证结果：**辛基 0 命中、辛矩阵/辛群 0 命中、Lagrange 子空间 0 命中**，
   整个辛几何在图上只有 `def.alternating-form`（交错型，L10）这一个零件，
   其余只有我上一批写进注里的字（「辛平面」「拉格朗日子空间」）。

   ⚠️ 「Lagrange 定理」本身是**群论**的（`thm.lagrange`，L8，已有），
      别与这里的 Lagrange 子空间/恒等式混。同一个人的名字在这两个学科各指一件事。

   归属：`algebra.multilinear`（多重线性与张量，17 → 23）。
   层号：从 L11 起（交错型与双线性型都在 L10），Lagrange 恒等式挂在 Gram 矩阵（L15）上。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '辛几何：辛向量空间与 Lagrange 子空间',

  nodes: [

    {
      id: 'def.symplectic-form',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '辛形式',
      title: '辛形式：非退化交错双线性型',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '辛', '交错型', '辛向量空间'],
      statement: [
        '**在做什么**：把「面积」抽象成代数。交错型配上非退化条件，就是辛形式 —— 它换掉了内积（对称型）的位置，撑起另一门几何。',
        '',
        '设 $V$ 是域 $K$ 上的有限维向量空间。双线性型 $\\omega : V \\times V \\to K$ 叫**辛形式**（symplectic form），若',
        '',
        '1. **交错**：$\\omega(v, v) = 0$ 对一切 $v \\in V$（等价于反对称，当 $\\operatorname{char} K \\ne 2$）；',
        '2. **非退化**：$\\omega(v, w) = 0$ 对一切 $w$ $\\implies$ $v = 0$。',
        '',
        '带辛形式的空间 $(V, \\omega)$ 叫**辛向量空间**。',
        '',
        '**与内积的对照**：内积是对称的、正定的；辛形式是交错的（所以每个向量都迷向）、非退化的。一个是「量长度」，一个是「量面积」。'
      ].join('\n'),
      notes: [
        '⚠️ **交错 $\\implies$ 每个向量都迷向**：$\\omega(v,v) = 0$ 恒成立，所以辛空间里没有「长度」可言，只有「配对」。这正是它与内积的根本分歧 —— 内积空间里 $\\langle v,v\\rangle > 0$，辛空间里永远是 $0$。',
        '**为什么交错 = 反对称**：展开 $\\omega(v+w, v+w) = 0$ 得 $\\omega(v,w) + \\omega(w,v) = 0$。\n\n' +
        '$\\operatorname{char} K \\ne 2$ 时两者等价；\n\n' +
        '特征 $2$ 时交错更强（反对称还允许 $\\omega(v,v) \\ne 0$），本图按 $\\operatorname{char} K \\ne 2$ 口径写（与 `thm.witt-cancellation` 一致）。',
        '⭐ **它是「有向面积」的代数化**：在 $\\mathbb{R}^{2}$ 上 $\\omega(u, w) = u_{1}w_{2} - u_{2}w_{1}$ 就是平行四边形面积（带符号）。推广到 $2n$ 维就是各坐标平面上的面积之和。所以辛形式的唯一作用就是**测量二维投影的面积**。',
        '⚠️ 辛形式**一定存在**于偶数维空间（`thm.symplectic-normal-form`），奇数维上只有退化的交错型 —— 这与内积（任意维都有）又一次分道扬镳。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics（⚠️ 章名未核实，只记书名）· 辛结构',
        'McDuff–Salamon, Introduction to Symplectic Topology（⚠️ 章名未核实，只记书名）'
      ]
    },

    {
      id: 'def.symplectic-basis',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '辛基',
      title: '辛基：让辛形式变成标准形的那组基',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '辛基', '辛标准形', 'Hamilton 矩阵'],
      statement: [
        '**在做什么**：辛空间里的「标准正交基」。这组基下辛形式的矩阵是固定的分块矩阵 —— 全部辛空间在这一点上长得一模一样。',
        '',
        '设 $(V, \\omega)$ 是 $2n$ 维辛空间。基 $e_{1}, \\ldots, e_{n}, f_{1}, \\ldots, f_{n}$ 叫**辛基**，若',
        '',
        '$$\\omega(e_{i}, e_{j}) = 0, \\qquad \\omega(f_{i}, f_{j}) = 0, \\qquad \\omega(e_{i}, f_{j}) = \\delta_{ij} .$$',
        '',
        '在这组基下 $\\omega$ 的矩阵是',
        '',
        '$$J_{0} = \\begin{pmatrix} 0 & I_{n} \\\\ -I_{n} & 0\\end{pmatrix} ,$$',
        '',
        '它满足 $J_{0}^{2} = -I_{2n}$（所以 $J_{0}$ 在 $\\mathbb{R}^{2n}$ 上扮演「乘以 $i$」的角色）。',
        '',
        '**含义**：每个 $e_{i}$ 与 $f_{i}$ 配对成一块辛平面（`def.hyperbolic-plane` 的交错版），整块空间就是 $n$ 个辛平面的直和。'
      ].join('\n'),
      notes: [
        '**为什么叫「基」而不是「标准形」**：这两个说法是一回事 —— 找到辛基 $\\iff$ 把 $\\omega$ 化成 $J_{0}$。与「正交基把内积化成 $I$」完全平行（对照 `thm.sylvester-law-inertia`：对称型只能化成对角形，交错型却**总能**化成 $J_{0}$，因为不需要开平方）。',
        '⭐ **$J_{0}^{2} = -I$ 是复结构的来源**：$J_{0}$ 是 $\\mathbb{R}^{2n}$ 上的复结构（$J^{2} = -I$），所以辛空间天然带一个「乘以 $i$」。这条把辛几何与复几何焊在一起（Kähler 流形就是这么来的：辛 + 复 + 相容度量）。',
        '⚠️ 辛基**不是唯一**的（可以连续变动），但 $\\omega$ 的矩阵**总是** $J_{0}$ —— 说得准确些：任意两组辛基之间的过渡矩阵是辛矩阵（`def.symplectic-matrix`）。这一点与「内积的正交基」完全平行。',
        '⚠️ 别把 $J_{0}$ 与「Jordan 块」搞混：这里的 $J$ 是标准辛矩阵（也叫 Hamilton 矩阵），与 Jordan 形无关，记号撞车纯属历史。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics（⚠️ 章名未核实，只记书名）· 辛基',
        'McDuff–Salamon, Introduction to Symplectic Topology（⚠️ 章名未核实，只记书名）'
      ]
    },

    {
      id: 'thm.symplectic-normal-form',
      cluster: 'algebra.multilinear',
      type: 'theorem',
      label: '辛标准形定理',
      title: '辛标准形定理：维数必偶，且总有辛基',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '辛', '标准形', '维数'],
      statement: [
        '**在做什么**：辛空间的「分类定理」—— 比对称型的情形简单得多：**所有** $2n$ 维辛空间都同构，没有不变量可谈。',
        '',
        '设 $(V, \\omega)$ 是有限维辛空间。则',
        '',
        '1. $\\dim V$ 必为**偶数**，记 $\\dim V = 2n$；',
        '2. $V$ 存在**辛基**，即存在基使 $\\omega$ 的矩阵为 $J_{0}$；',
        '3. 因此任意两个同维数的辛空间都**等距同构**（保持 $\\omega$ 的线性同构）。',
        '',
        '**与对称型的对照**：实对称型由惯性指数 $(p, q)$ 分类（`thm.sylvester-law-inertia`），有 $\\frac{n(n+1)}{2}$ 种；辛形式只有**一个**不变量 —— 维数。'
      ].join('\n'),
      notes: [
        '**证明骨架**：取 $e_{1} \\ne 0$，由非退化性存在 $f_{1}$ 使 $\\omega(e_{1}, f_{1}) = 1$；则 $\\operatorname{span}(e_{1}, f_{1})$ 是一块非退化辛平面，且 $V = \\operatorname{span}(e_{1},f_{1}) \\oplus \\operatorname{span}(e_{1},f_{1})^{\\perp}$（正交补仍是辛空间）。\n\n对维数归纳即可。\n\n**维数必偶**是这条归纳的副产物。',
        '⭐ **为什么比对称型简单**：对称型要化成对角形，得处理「同一个数能不能开平方」的问题（所以 $\\mathbb{R}$ 上分正负、$\\mathbb{C}$ 上只剩秩）；交错型的标准形 $J_{0}$ 里只有 $0$ 和 $\\pm 1$，**没有待开方的系数**。这就是「辛几何在任意域（char$\\ne$2）上都长一样」的原因。',
        '⚠️ **奇数维时只有退化交错型**：比如 $\\mathbb{R}^{3}$ 上取 $\\omega$ 的秩必为偶数，所以要么退化、要么为零。这与「$\\mathbb{R}^{3}$ 上内积很多」形成鲜明对照。',
        '⚠️ 这条定理是**辛流形上 Darboux 定理的线性影子**：局部看每一点切空间都是标准辛空间，拼起来就是「局部没有不变量」。辛几何之所以「硬」（刚性），正是因为局部平凡、所有信息都在整体。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics（⚠️ 章名未核实，只记书名）· 辛空间',
        'McDuff–Salamon, Introduction to Symplectic Topology（⚠️ 章名未核实，只记书名）'
      ]
    },

    {
      id: 'def.lagrangian-subspace',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: 'Lagrange 子空间',
      title: 'Lagrange 子空间：维数刚好一半的极大迷向子空间',
      regions: ['algebra'],
      tags: ['定义', '线性代数', 'Lagrange 子空间', '辛', '迷向'],
      statement: [
        '**在做什么**：辛空间里「最大的一块什么都不测」的子空间。它是辛几何最重要的对象 —— 因为它恰好处在「迷向」与「非退化」的临界点。',
        '',
        '设 $(V, \\omega)$ 是 $2n$ 维辛空间，$W \\subseteq V$ 是子空间。称 $W$ **Lagrange 子空间**（Lagrangian subspace），若',
        '',
        '$$W = W^{\\perp} , \\qquad W^{\\perp} := \\{\\, v : \\omega(v, w) = 0\\ \\ \\forall w \\in W \\,\\} .$$',
        '',
        '**等价条件**（三条等价，任取其一）：',
        '',
        '1. $W = W^{\\perp}$；',
        '2. $\\dim W = n$ 且 $\\omega|_{W} \\equiv 0$（极大全迷向）；',
        '3. $W$ 是迷向的（`def.isotropic-subspace`）且 $\\dim W = \\frac{1}{2}\\dim V$。',
        '',
        '**例子**：辛基里 $\\operatorname{span}(e_{1}, \\ldots, e_{n})$ 与 $\\operatorname{span}(f_{1}, \\ldots, f_{n})$ 都是 Lagrange 子空间；$\\mathbb{R}^{2}$ 里每条过原点的直线都是。'
      ].join('\n'),
      notes: [
        '**为什么这个维数特殊**：非退化型下 $\\dim W + \\dim W^{\\perp} = \\dim V$（与内积空间同一个公式）。若 $W = W^{\\perp}$，则 $2\\dim W = \\dim V$ —— Lagrange 子空间的维数**被逼成一半**，不是选出来的。',
        '⭐ **它是「迷向」与「极大」的交点**：比它小的迷向子空间有大把（任意一条辛直线就迷向），但再大一点就**不可能**仍然全迷向。所以 Lagrange 子空间就是迷向子空间里的**极大元**，这也是「极大全迷向子空间」这个别名。',
        '⚠️ **与内积空间对照**：内积空间里 $W \\cap W^{\\perp} = 0$ 永远成立，所以 $W = W^{\\perp}$ 只能 $W = 0$。Lagrange 子空间是辛几何独有的现象。',
        '⚠️ 术语：「Lagrange 子空间」（线性）与「Lagrange 子流形」（`def.lagrangian-submanifold`，流形）是同一件事的两个尺度。中文也写「拉格朗日子空间 / 拉格朗日子流形」。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics（⚠️ 章名未核实，只记书名）· Lagrange 子空间',
        'McDuff–Salamon, Introduction to Symplectic Topology（⚠️ 章名未核实，只记书名）'
      ]
    },

    {
      id: 'def.symplectic-matrix',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '辛矩阵与辛群',
      title: '辛矩阵与辛群 $\\mathrm{Sp}(2n)$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '辛矩阵', '辛群', 'Lie 群'],
      statement: [
        '**在做什么**：辛空间的「对称群」—— 保持辛形式不变的线性变换。它是与正交群 $O(n)$、酉群 $U(n)$ 并列的第三类经典群。',
        '',
        '设 $A \\in M_{2n}(K)$。称 $A$ **辛矩阵**，若',
        '',
        '$$A^{T} J_{0}\\, A = J_{0} ,$$',
        '',
        '其中 $J_{0} = \\begin{pmatrix} 0 & I_{n} \\\\ -I_{n} & 0\\end{pmatrix}$（`def.symplectic-basis`）。等价说法：$A$ 保持 $\\omega$ 不变，即 $\\omega(Ax, Ay) = \\omega(x, y)$。',
        '',
        '全体辛矩阵构成群，叫**辛群** $\\mathrm{Sp}(2n, K)$（$K = \\mathbb{R}$ 时记 $\\mathrm{Sp}(2n, \\mathbb{R})$）。',
        '',
        '**由上一条立刻得到**：$A^{T}J_{0}A = J_{0}$ $\\implies$ $\\det A = \\pm 1$；事实上 $\\det A = 1$ 恒成立（$\\mathrm{Sp}$ 是 $\\mathrm{SL}$ 的子群）。'
      ].join('\n'),
      notes: [
        '**为什么行列式必为 $1$**：取行列式得 $(\\det A)^{2}\\det J_{0} = \\det J_{0}$，所以 $\\det A = \\pm 1$。\n\n要排除 $-1$：用 Pfaffian（$\\operatorname{Pf}$）或「$\\mathrm{Sp}(2n)$ 连通」—— 本图只记结论，证明属 Lie 群论。',
        '⭐ **三类经典群的分工**：$O(n)$ 保持对称正定型（内积）、$U(n)$ 保持 Hermite 型、$\\mathrm{Sp}(2n)$ 保持非退化交错型（辛形式）。\n\n它们是**同一个判据**（保持某个型不变）在三个不同型上的结果 —— 这条对照本身就是 `def.orthogonally-similar` 那个「填上那一格」的辛版本。',
        '⚠️ **$\\mathrm{Sp}(2n)$ 与紧群不同**：$O(n)$、$U(n)$ 都是紧群，而 $\\mathrm{Sp}(2n,\\mathbb{R})$ 非紧（它含有 $\\begin{pmatrix} P & 0 \\\\ 0 & (P^{T})^{-1}\\end{pmatrix}$ 这样任意拉伸的元）—— 这与「辛几何没有局部不变量（`thm.symplectic-normal-form`）」是同一件事的两面。',
        '⚠️ 命名撞车：物理文献里「辛矩阵」有时指 $\\mathrm{Sp}(2)$（单模矩阵），那是**模形式**的对象，不是这里的 $2n$ 维辛群。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics（⚠️ 章名未核实，只记书名）· 辛群',
        'McDuff–Salamon, Introduction to Symplectic Topology（⚠️ 章名未核实，只记书名）'
      ]
    },

    {
      id: 'thm.lagrange-identity',
      cluster: 'algebra.multilinear',
      type: 'theorem',
      label: 'Lagrange 恒等式',
      title: 'Lagrange 恒等式：内积与面积的关系',
      regions: ['algebra'],
      tags: ['定理', '线性代数', 'Lagrange 恒等式', 'Gram 行列式', '面积'],
      statement: [
        '**在做什么**：把 $\\lVert u\\rVert^{2}\\lVert w\\rVert^{2} - \\langle u,w\\rangle^{2}$ 写成「面积的平方」—— 它既是 Cauchy–Schwarz 不等式的等式来源，也是 Gram 行列式的二维情形。',
        '',
        '对 $u, w \\in \\mathbb{R}^{n}$（或任何实内积空间中的两个向量）有**Lagrange 恒等式**',
        '',
        '$$\\lVert u\\rVert^{2}\\lVert w\\rVert^{2} - \\langle u, w\\rangle^{2} = \\sum_{1 \\le i < j \\le n}\\bigl(u_{i}w_{j} - u_{j}w_{i}\\bigr)^{2} .$$',
        '',
        '左边正是两者 Gram 矩阵的行列式',
        '',
        '$$\\det\\begin{pmatrix} \\langle u,u\\rangle & \\langle u,w\\rangle \\\\ \\langle w,u\\rangle & \\langle w,w\\rangle\\end{pmatrix} ,$$',
        '',
        '所以几何上它说的是：**Gram 行列式 = 平行四边形的面积的平方**（`def.gram-matrix`）。'
      ].join('\n'),
      notes: [
        '**Cauchy–Schwarz 是它的推论**：右边是平方和，非负 $\\implies$ 左边 $\\ge 0$ $\\implies$ $\\lvert\\langle u,w\\rangle\\rvert \\le \\lVert u\\rVert\\lVert w\\rVert$。\n\n而且等号成立 $\\iff$ 右边每项为零 $\\iff$ $u, w$ 成比例。\n\n所以这条恒等式比 Cauchy–Schwarz **强**：它给出了差多少。',
        '⭐ **一般 $k$ 个向量**：Gram 行列式 $\\det G$ 等于这 $k$ 个向量张成的平行体体积的平方（`def.gram-matrix` 的注）。$k=2$ 就是本条；$\\det G \\ge 0$ 就是「体积是实数」。',
        '⚠️ 它不是辛的：这里的 $\\langle\\cdot,\\cdot\\rangle$ 是**内积**（对称正定），不是辛形式。名字里的「Lagrange」与 `def.lagrangian-subspace` 是同一个人的不同贡献 —— 前者是内积几何，后者是辛几何，**别把两条接成因果关系**。',
        '⚠️ 复情形要小心：用 Hermite 内积时右边要改成模方 $\\lvert u_{i}\\bar{w}_{j} - u_{j}\\bar{w}_{i}\\rvert^{2}$，左边仍非负，结论不变。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· Gram 行列式',
        '北大《高等代数》· Lagrange 恒等式'
      ]
    }
  ],

  edges: [
    { id: 'dep.sympl-alt', kind: 'definition',
      definition: 'def.alternating-form', usedBy: 'def.symplectic-form',
      note: '辛形式 = 交错型 + 非退化。交错那一半直接用这个词。' },
    { id: 'dep.sympl-bf', kind: 'definition',
      definition: 'def.bilinear-form', usedBy: 'def.symplectic-form',
      note: '辛形式本身是双线性型，只是加了两个条件。' },

    { id: 'dep.sb-sympl', kind: 'definition',
      definition: 'def.symplectic-form', usedBy: 'def.symplectic-basis',
      note: '辛基是「把辛形式化成标准形」的那组基。' },
    { id: 'dep.sb-vs', kind: 'definition',
      definition: 'def.vs', usedBy: 'def.symplectic-basis',
      note: '要谈基，先有向量空间。' },
    { id: 'dep.sb-hyper', kind: 'definition',
      definition: 'def.hyperbolic-plane', usedBy: 'def.symplectic-basis',
      note: '每一对 $e_i, f_i$ 就是一块辛平面（交错型的双曲平面）。' },

    { id: 'dep.snf-sb', kind: 'definition',
      definition: 'def.symplectic-basis', usedBy: 'thm.symplectic-normal-form',
      note: '定理断言：非退化交错型总有辛基，于是维数必偶。' },
    { id: 'dep.snf-isosub', kind: 'definition',
      definition: 'def.isotropic-subspace', usedBy: 'thm.symplectic-normal-form',
      note: '归纳里的正交补仍是非退化辛空间 —— 用的是正交补与迷向的语言。' },

    { id: 'dep.lag-isosub', kind: 'definition',
      definition: 'def.isotropic-subspace', usedBy: 'def.lagrangian-subspace',
      note: 'Lagrange 子空间的本质是「极大全迷向子空间」。' },
    { id: 'dep.lag-ocomp', kind: 'definition',
      definition: 'def.orthogonal-complement', usedBy: 'def.lagrangian-subspace',
      note: '定义条件 $W = W^{\\perp}$ 直接用到正交补。' },
    { id: 'dep.lag-sympl', kind: 'definition',
      definition: 'def.symplectic-form', usedBy: 'def.lagrangian-subspace',
      note: '正交补是对辛形式取的，不是内积。' },

    { id: 'dep.spm-sympl', kind: 'definition',
      definition: 'def.symplectic-form', usedBy: 'def.symplectic-matrix',
      note: '辛矩阵的定义就是「保持 $\\omega$ 不变」。' },
    { id: 'dep.spm-sb', kind: 'definition',
      definition: 'def.symplectic-basis', usedBy: 'def.symplectic-matrix',
      note: '判据 $A^{T}J_0A = J_0$ 里的 $J_0$ 来自辛基下的标准形。' },
    { id: 'dep.spm-invert', kind: 'definition',
      definition: 'def.invertible-matrix', usedBy: 'def.symplectic-matrix',
      note: '辛矩阵可逆（行列式为 $1$），所以 $\\mathrm{Sp}$ 是群。' },

    { id: 'dep.lagid-gram', kind: 'definition',
      definition: 'def.gram-matrix', usedBy: 'thm.lagrange-identity',
      note: '左边就是两个向量的 Gram 行列式。' },
    { id: 'dep.lagid-det', kind: 'definition',
      definition: 'def.determinant', usedBy: 'thm.lagrange-identity',
      note: '「面积的平方」的代数表达是 $2\\times2$ 行列式。' },
    { id: 'dep.lagid-inner', kind: 'definition',
      definition: 'def.inner-product', usedBy: 'thm.lagrange-identity',
      note: '恒等式两边都用内积写。' }
  ]
});
