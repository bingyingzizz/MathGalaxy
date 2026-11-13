/* ==========================================================================
   内容包 · 线性代数补洞（二）：双线性型的几何
   --------------------------------------------------------------------------
   9 个节点。补的是**双线性型/二次型那一侧的几何** —— 用户原话：「我查迷向子空间
   就查不到呀」。

   ⛔ 补之前：`def.bilinear-form`、`def.quadratic-form`、`def.alternating-form`、
      `thm.sylvester-criterion` 在图里，但
        · 「迷向子空间 / 迷向向量 / Witt 消去」**全库 0 次**；
        · 「合同 / 惯性定理 / 正惯性指数 / 双曲平面 / 对称双线性型」只在别的节点正文里
          被提到，自己**没有定义**。
      也就是说：二次型理论只有「判正定」这半截，**分类的那半截（惯性、合同、迷向）缺着**。

   归属：`algebra.multilinear`（多重线性与张量，8 → 17 点）。
   为什么不开新团：双线性型本身就是那个团的对象；惯性/迷向是它的**几何**，不是新装置。

   ⚠️ 层号：`def.bilinear-form` 在 L10，所以这一批从 L11 起，
      合同/惯性/迷向依次往上，Witt 最高。
   ⚠️ `def.congruence` 这个 id 已被**数论的同余**占用（`145-number-basic.js`），
      所以这里叫 `def.congruent-matrices`（矩阵合同）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数补洞：双线性型的几何',

  nodes: [

    {
      id: 'def.matrix-of-bilinear-form',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '双线性型的矩阵',
      title: '双线性型的矩阵表示',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '双线性型', '矩阵表示'],
      statement: [
        '**在做什么**：把双线性型写成矩阵，于是「双线性型的理论」变成「矩阵在合同下的理论」—— 这一步是整章的分水岭。',
        '',
        '设 $V$ 是 $K$ 上有限维向量空间，$\\beta : V \\times V \\to K$ 双线性，$e_{1}, \\ldots, e_{n}$ 是一组基。$\\beta$ 在这组基下的**矩阵**是',
        '',
        '$$A := \\bigl(\\beta(e_{i}, e_{j})\\bigr)_{1 \\le i,j \\le n} ,$$',
        '',
        '于是对 $x = \\sum x_{i}e_{i}$、$y = \\sum y_{j}e_{j}$ 有',
        '',
        '$$\\beta(x, y) = x^{T} A\\, y .$$',
        '',
        '**换基**：若新基由 $P$ 给出（新基 = 旧基乘以 $P$），则 $\\beta$ 的新矩阵是',
        '',
        '$$A\' = P^{T} A\\, P .$$',
        '',
        '⚠️ 注意这不是相似（$P^{-1}AP$），而是**合同**（`def.congruent-matrices`）—— 双线性型在换基下的不变量，与线性算子的不变量是**两套**。'
      ].join('\n'),
      notes: [
        '**为什么是 $P^{T}AP$ 而不是 $P^{-1}AP$**：向量坐标按 $x \\mapsto Px$ 变（还是 $P^{-1}x$，取决于约定），而双线性型有**两个**变元，两个都跟着变 $\\implies$ 一边一个 $P$。\n\n线性算子的矩阵只有一个变元（$Ax$），所以出现的是 $P^{-1}$（为了抵消）。\n\n这个差别是所有混淆的根源。',
        '**对称 / 交错**：$\\beta$ 对称 $\\iff$ $A$ 对称；$\\beta$ 交错 $\\iff$ $A$ 反对称且对角为零（`def.alternating-form`）。这两种是主要研究对象 —— 对称型给出二次型，交错型给出辛结构。',
        '⚠️ 「$\\beta$ 非退化 $\\iff$ $A$ 可逆」是**良定义**的（合同保持可逆性），所以可以谈「非退化的双线性型」而不必指定基。这是后面**维数公式与分解定理**（Witt 消去、正交补的维数）的前提；「正交补」与「迷向」这两个**概念本身**并不需要非退化就能定义。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· 双线性型的矩阵',
        '北大《高等代数》· 双线性函数与矩阵'
      ]
    },

    {
      id: 'def.gram-matrix',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: 'Gram 矩阵',
      title: 'Gram 矩阵：内积的矩阵',
      regions: ['algebra'],
      tags: ['定义', '线性代数', 'Gram 矩阵', '内积', '正定'],
      statement: [
        '**在做什么**：内积也是双线性型（实情形对称、复情形 Hermite），所以它也有矩阵。这个矩阵总是**半正定**的，且当 $v_{1}, \\ldots, v_{k}$ 线性无关时**正定** —— 反过来每个正定矩阵都给出一个内积。',
        '',
        '设 $V$ 是实内积空间，$v_{1}, \\ldots, v_{k} \\in V$。它们的 **Gram 矩阵**是',
        '',
        '$$G := \\bigl(\\langle v_{i}, v_{j}\\rangle\\bigr)_{1 \\le i,j \\le k} ,$$',
        '',
        '其行列式 $\\det G$ 叫 **Gram 行列式**。',
        '',
        '**核心性质**：',
        '',
        '1. $G$ 对称、**半正定**；$G$ 正定 $\\iff$ $v_{1}, \\ldots, v_{k}$ 线性无关；',
        '2. $\\det G \\ge 0$，且 $\\det G = 0 \\iff$ 这些向量线性相关；',
        '3. 若 $V = \\mathbb{R}^{n}$ 上取**标准**内积、向量是矩阵 $A$ 的列，则 $G = A^{T}A$（复情形 $A^{*}A$；一般内积 $H$ 下是 $A^{T}HA$）。'
      ].join('\n'),
      notes: [
        '**它是「会算的内积」**：内积是抽象的双线性型，Gram 矩阵是它在一组向量上的全部读数。有了 $G$，投影、正交化、最小二乘全都变成解线性方程组（见 `thm.least-squares`）。',
        '⭐ **Gram–Schmidt 的行列式读法**：正交化之后 $\\det G = \\prod \\lVert u_{i}\\rVert^{2}$（$u_i$ 是正交化后的向量），所以 $\\sqrt{\\det G}$ 就是这组向量张成的平行体体积。这条把「体积」与「行列式」焊在一起，也是积分换元公式的几何来源。',
        '⚠️ 复情形要写 $G_{ij} = \\langle v_i, v_j\\rangle$ 且用共轭对称：$G^{*} = G$（Hermite），不是对称。若把内积约定成对第二个变元共轭，则矩阵要整体转置共轭 —— 约定不同，公式差一个星号。',
        '⚠️ $A^{T}A$ 正定 $\\iff$ $A$ 的列线性无关（满列秩）。这条在最小二乘里是「法方程有唯一解」的充要条件，不满列秩就得用伪逆。',
        ,
        '**各方向用到的假设**（Gram 判据依赖内积正定，矩阵只涉及有限组向量）：\n' +
        '- Gram 定义 $\\implies$ 对称且半正定：展开 $c^TGc=\\lVert\\sum_i c_iv_i\\rVert^2$，不需要谱定理或空间完备性。\n' +
        '- 向量无关 $\\iff$ Gram 正定：两个方向都用内积的零范数只对应零向量；仅有半正定型时，非零零范数向量给出反例。\n' +
        '- $\\det G=0$ $\\iff$ 向量相关：由上述恒等式得 $\\ker G=\\ker A$，再用有限维矩阵可逆判据；行列式非负可用实对称矩阵谱定理。\n' +
        '- 正定矩阵 $\\implies$ 内积：需矩阵实对称（复情形 Hermite），再定义 $\\langle x,y\\rangle=x^TGy$；任意一组相关向量的 Gram 矩阵只半正定。\n'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· Gram 矩阵',
        'Axler, Linear Algebra Done Right, 「Inner Product Spaces」· Gram 矩阵'
      ]
    },

    {
      id: 'def.congruent-matrices',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '合同矩阵',
      title: '合同：双线性型在换基下的等价',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '合同', '二次型'],
      statement: [
        '**在做什么**：给「同一个双线性型在不同基下的矩阵」一个名字 —— 它是等价关系，而且比相似**粗得多**，这正是二次型能被完全分类的原因。',
        '',
        '设 $A, B \\in M_{n}(K)$。称 $A$ 与 $B$ **合同**（congruent），若存在**可逆** $P$ 使',
        '',
        '$$B = P^{T} A\\, P .$$',
        '',
        '复情形也用**同一个公式**：双线性型的合同是 $B = P^{T} A\\, P$，用**转置**而非共轭转置（例：$A = [1]$、$P = [i]$ 时 $P^{T}AP = [-1]$，而 $P^{*}AP = [1]$）。带星号的 $P^{*}AP$ 属于 **Hermite 型**的星合同，不是这里。',
        '',
        '**合同保持的量**：秩、对称性、交错性、正定性、半正定性，以及实对称情形下的**惯性指数**。',
        '',
        '**不保持**：特征值、迹、行列式的具体值。'
      ].join('\n'),
      notes: [
        '**合同 vs 相似，一句话分清**：相似 $P^{-1}AP$ 是「同一个**线性算子**换基」；合同 $P^{T}AP$ 是「同一个**双线性型**换基」。前者保持特征值，后者保持惯性 —— 两者只在 $P$ 正交（$P^{-1} = P^{T}$）时重合，那时也叫**正交相似**。',
        '⭐ **为什么合同这么粗**：$P$ 有 $n^{2}$ 个自由度，而 $A$ 只有 $n(n+1)/2$ 个独立分量（对称时），所以能把 $A$ 化简得非常厉害。实对称情形下，合同类恰好由**一对整数** $(p,q)$ 决定（`thm.sylvester-law-inertia`）—— 秩只给出 $p+q$，还差一个信息。',
        '⚠️ 合同是等价关系，但要**先固定域**：在 $\\mathbb{R}$ 上由 $(p,q)$ 分类；在 $\\mathbb{C}$ 上只看秩（因为可以开平方，把系数吸收进 $P$）。同一个矩阵在 $\\mathbb{R}$ 与 $\\mathbb{C}$ 上的合同类不同。',
        '⚠️ 与数论里的同余不是一回事（那是 `def.congruence`）：中文都叫「合同/同余」，靠上下文分辨。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra,「Bilinear Forms」· 合同',
        '北大《高等代数》'
      ]
    },

    {
      id: 'def.isotropic-vector',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '迷向向量',
      title: '迷向向量：自己与自己正交的非零向量',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '迷向', '双线性型', '二次型'],
      statement: [
        '**在做什么**：在有内积的空间里，$\\langle v,v\\rangle = 0$ 只有零解。但一般双线性型没有这个性质 —— 能让「长度为零」的非零向量叫**迷向向量**，它是这门几何与内积几何分道扬镳的地方。',
        '',
        '设 $\\beta$ 是 $V$ 上的对称双线性型（或对应的二次型 $q$）。称 $v \\ne 0$ **迷向**，若',
        '',
        '$\\beta(v, v) = 0$（即 $q(v) = 0$）',
        '',
        '这样的 $v$ 自己就与自己正交。若 $\\beta$ 非退化且存在迷向向量，就称 $\\beta$ 是**迷向型**（isotropic form）；不存在非零迷向向量时叫**非迷向**（各向异性，anisotropic）。',
        '',
        '**例子**：$\\mathbb{R}^{2}$ 上 $\\beta(x,y) = x_{1}y_{1} - x_{2}y_{2}$ 中，$(1,1)$ 与 $(1,-1)$ 都迷向；而标准内积没有迷向向量。'
      ].join('\n'),
      notes: [
        '**几何直观**：把 $q(x) = 1$ 想成「单位球面」。正定型给的是椭球（各向异性）；不定型给的是双曲面，而双曲面**以过原点的两条直线**为渐近线；那两条直线正是**零锥** $q = 0$（不在双曲面上），其上的非零向量才是迷向向量。所以「迷向」= 「光锥方向」。',
        '⚠️ 迷向向量的存在与**基**无关（$q(v) = 0$ 是坐标无关的陈述），但它是否存在取决于**型**：实对称型由惯性指数决定 —— 只要 $q$ 不定（$p, q$ 都非零），就一定有迷向向量；正定或负定则没有。',
        '⭐ 在相对论里这个就是「类光线」：$\\beta$ 取 Minkowski 型，迷向向量 = 光速方向。数学上同一条东西叫「零向量 / 迷向向量」，名字不同而已。',
        '⚠️ 别把「迷向」与「零向量」搞混：迷向向量**必须非零**，只是它的「长度平方」是零。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· 迷向向量',
        '北大《高等代数》· 二次型的几何'
      ]
    },

    {
      id: 'def.isotropic-subspace',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '迷向子空间',
      title: '迷向子空间：整块都互相正交的子空间',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '迷向子空间', '双线性型', '辛'],
      statement: [
        '**在做什么**：把「一个迷向向量」放大成「一整块」—— 子空间里任意两个向量都互相正交（包括自己与自己）。这是理解非退化型结构的关键概念。',
        '',
        '设 $\\beta$ 是 $V$ 上的对称（或交错）双线性型，$W \\subseteq V$ 是子空间。称 $W$ **迷向**（totally isotropic），若',
        '',
        '$\\beta(x, y) = 0$（对一切 $x, y \\in W$）',
        '',
        '等价说法：$W \\subseteq W^{\\perp}$（其中 $W^{\\perp} = \\{v : \\beta(v, w) = 0\\ \\forall w \\in W\\}$ 是**正交补**）。',
        '',
        '迷向子空间中**最大的那个维数**叫型的 **Witt 指标**（或迷向指标）。',
        '',
        '**与内积空间的对照**：内积正定时 $W \\cap W^{\\perp} = 0$ 恒成立，所以没有非零迷向子空间；一般非退化型则可能有，且 $\\dim W + \\dim W^{\\perp} = \\dim V$ 仍成立，只是 $W$ 与 $W^{\\perp}$ 会**相交**。'
      ].join('\n'),
      notes: [
        '**为什么它重要**：非退化型的结构定理（`thm.witt-cancellation`）说，任何非退化型都能拆成「非迷向部分」+「一堆双曲平面」。而 Witt 指标就是「这对双曲平面有多少」的个数 —— 它是比秩更细的不变量。',
        '⭐ **辛几何的入口**：交错型只保证 $\\beta(v,v) = 0$（每个向量自己和自己配对为零），**不等于**整个空间全迷向 —— 全迷向要求 $\\beta|_{W \\times W} \\equiv 0$，辛空间本身远非如此（$\\omega(e,f) = 1$）。所以这时没人用「迷向子空间」这个词，而改用「拉格朗日子空间」（$W = W^{\\perp}$，维数恰为 $\\dim V/2$）。两者是同一个正交补条件的不同命名。',
        '⚠️ 对称型的迷向子空间与交错型的习惯不同：对称型里通常只要求「$\\beta|_W$ 恒为零」，交错型里这个条件自动对每个向量成立 $\\implies$ 必须额外要求「$W$ 是维数一半的极大者」才有内容。读文献时先确认作者用的是哪种口径。',
        '⚠️ 「迷向」与「退化」是两件事，但要说对方向：**非零的全迷向子空间，其上的限制型必然退化**（$W \\subseteq W^{\\perp}$）；可以非退化的是**环境空间** $V$ 上的型。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· 迷向子空间',
        'Chevalley, The Algebraic Theory of Spinors'
      ]
    },

    {
      id: 'def.hyperbolic-plane',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '双曲平面',
      title: '双曲平面：最标准的一块迷向构件',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '双曲平面', '迷向', 'Witt'],
      statement: [
        '**在做什么**：这是「一块不可再分的迷向结构」—— 两个迷向向量，互相不为零地配对。非退化型的结构定理说：任何型都是「非迷向的」加若干块这个。',
        '',
        '设 $\\beta$ 是 $V$ 上的对称双线性型。二维子空间 $H = \\operatorname{span}(u, w)$ 叫**双曲平面**，若',
        '',
        '$$\\beta(u, u) = 0, \\qquad \\beta(w, w) = 0, \\qquad \\beta(u, w) = 1 .$$',
        '',
        '在这组基下 $\\beta$ 的矩阵是',
        '',
        '$$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0\\end{pmatrix} ,$$',
        '',
        '它非退化（行列式 $-1$），且明显有迷向向量（$u, w$ 都是）。',
        '',
        '**用途**：任何非退化对称型的空间都能正交分解为若干个双曲平面再加一块**非迷向**的空间；双曲平面的个数就是 Witt 指标。'
      ].join('\n'),
      notes: [
        '**为什么叫「双曲」**：在这块平面上 $q(xu + yw) = 2xy$，等值线 $xy = c$（$c$ 为常数）是双曲线。这与「$x^{2} - y^{2}$ 型」是同一件事，只是基选得让 $q$ 更好看。',
        '⭐ **它是「正交基不存在」的最小反例**：在这块平面上 $u + w$ 与 $u - w$ 恰是一组**正交基**（$\\beta$ 在它下面是 $\\operatorname{diag}(2, -2)$，两者都**不迷向**）—— 所以「迷向」并不等于「没有正交基」。',
        '⚠️ 交错型的对应物就是「辛平面」：$\\beta(u,w) = 1$（无需 $\\beta(u,u) = \\beta(w,w) = 0$，因为交错型自动如此）。所以辛空间永远能拆成辛平面，维数必为偶数 —— 这是「辛空间维数偶」的真正原因。',
        '⚠️ 一块双曲平面**自身**是非退化的，但它的内部**含两条迷向直线**（不是每个向量都迷向：$u + w$ 的 $\\beta = 2$）—— 所以「迷向」与「退化」完全不是一回事（另见 `def.isotropic-subspace` 的注）。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· 双曲平面',
        'Chevalley, The Algebraic Theory of Spinors'
      ]
    },

    {
      id: 'def.inertia-index',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '惯性指数',
      title: '惯性指数与符号差',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '惯性指数', '符号差', '二次型'],
      statement: [
        '**在做什么**：给实对称型配一对整数，把它的「形状」量化 —— 正方向有多少维、负方向有多少维。这对整数在合同下**完全不变**，所以它是实二次型的**完备不变量**。',
        '',
        '设 $A$ 是 $n$ 阶实对称矩阵，$\\beta$ 是它对应的对称双线性型。把 $A$ 合同对角化后，对角元中正、负、零的个数分别记为 $p, q, z$（$p + q + z = n$）。称',
        '',
        '- $p$ 为**正惯性指数**；',
        '- $q$ 为**负惯性指数**；',
        '- $p - q$ 为**符号差**（signature）。',
        '',
        '三者由 $A$ 唯一确定（不依赖所选的合同变换、不依赖对角化方式）—— 这就是**惯性定理**。',
        '',
        '秩 $= p + q$；$A$ 正定 $\\iff p = n$；半正定 $\\iff q = 0$；不定 $\\iff p \\ge 1$ 且 $q \\ge 1$。'
      ].join('\n'),
      notes: [
        '**符号差的几何读法**：$q(x) = 1$ 的等值面拓扑类型由 $(p,q)$ 决定 —— $(n,0)$ 是椭球、$(n-1,1)$ 是**单叶**双曲面、$(1,n-1)$ 是**双叶**双曲面、更一般地是 $\\mathbb{R}^{p}$ 上的椭球与 $\\mathbb{R}^{q}$ 上的双曲部分的积。所以「惯性指数 = 等值面的拓扑」。',
        '⚠️ **符号差不是「行列式的符号」**：$2\\times2$ 矩阵 $\\operatorname{diag}(1,-1)$ 的符号差是 $0$ 而行列式是 $-1$。符号差是 $p - q$，行列式是 $\\prod\\lambda_i$ —— 前者是「有多少个负方向」，后者是「负方向的个数奇偶」。',
        '⭐ 在几何里它叫 **index**：伪黎曼度量 $(M, g)$ 的「指标」就是每点切空间上 $g$ 的负惯性指数（$1$ $\\implies$ Lorentz 型，$0$ $\\implies$ Riemann 型）。所以这个词在相对论/伪黎曼几何里天天出现。',
        '⚠️ 惯性指数**只在实对称（或 Hermite）情形有意义**。复对称型在合同下只看秩（可以开方把 $-1$ 吸收），没有 $p,q$ 之分。',
        ,
        '**各方向用到的假设**（实对称型的符号计数依赖惯性定理）：\n' +
        '- 已有合同对角形 $\\implies$ 按正负零计数：这是定义展开；计数不依赖对角化方式则是 Sylvester 惯性定理，并非定义免费保证。\n' +
        '- 实对称矩阵 $\\implies$ 可对角化并计数：有限维实谱定理足够；合同不变性还可用正定子空间的最大维数及维数交公式证明。\n' +
        '- $p=n$ $\\iff$ 正定、$q=0$ $\\iff$ 半正定：在合同对角形中逐项检查，再用可逆换元保持二次型取值。\n' +
        '- 固定维数下同一 $(p,q)$ $\\implies$ 合同：把非零对角元用正实数平方根归一化；复对称型无正负之分，例如一维的 $[1]$ 与 $[-1]$ 在复数上合同。\n'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· 惯性指数',
        '北大《高等代数》· 惯性指数与符号差'
      ]
    },

    {
      id: 'thm.sylvester-law-inertia',
      cluster: 'algebra.multilinear',
      type: 'theorem',
      label: '惯性定理',
      title: 'Sylvester 惯性定理：实对称型由惯性指数完全分类',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '惯性定理', 'Sylvester', '合同分类'],
      statement: [
        '**在做什么**：回答「两个实对称矩阵什么时候合同」。答案极漂亮：**同阶**的两个实对称矩阵合同，**当且仅当**惯性指数相同（阶不同时连矩阵乘法都做不了）。于是合同分类被一对整数穷尽。',
        '',
        '设 $A$ 是 $n$ 阶实对称矩阵。则存在可逆 $P$ 使',
        '',
        '$$P^{T} A\\, P = \\operatorname{diag}(\\underbrace{1,\\ldots,1}_{p},\\ \\underbrace{-1,\\ldots,-1}_{q},\\ \\underbrace{0,\\ldots,0}_{z}) ,$$',
        '',
        '且 $p, q, z$ 由 $A$ 唯一确定（`def.inertia-index`）。',
        '',
        '**推论（合同分类）**：**同阶**的两个实对称矩阵合同 $\\iff$ 它们有相同的 $(p, q)$（阶不同时连矩阵乘法都做不了：$[1]$ 与 $\\operatorname{diag}(1,0)$ 都有 $(p,q) = (1,0)$ 却不合同）。',
        '',
        '**推论（正定性）**：$A$ 正定 $\\iff p = n$ $\\iff$ $A$ 合同于 $I$。'
      ].join('\n'),
      notes: [
        '**证明**。设 $q(x) = x^{T}Ax$ 是 $A$ 对应的二次型、$\\beta(x, y) = x^{T}Ay$ 是它的对称双线性型。',
        '',
        '**存在性（配方法）**。对 $n$ 归纳。$n = 0$ 或 $q \\equiv 0$ 时 $A = 0$，取 $P = I$、$p = q = 0$。否则存在 $e$ 使 $q(e) \\ne 0$。令 $W := \\{v : \\beta(e, v) = 0\\}$。因 $\\beta(e, e) = q(e) \\ne 0$，有 $V = \\operatorname{span}(e) \\oplus W$：任意 $v$ 可写成 $v = \\frac{\\beta(e, v)}{\\beta(e, e)}e + \\bigl(v - \\frac{\\beta(e, v)}{\\beta(e, e)}e\\bigr)$，第二项落在 $W$ 中。把 $e$ 换成 $e/\\sqrt{|q(e)|}$（仍记 $e$），则 $q(e) = \\pm 1$；在基 $e$ 与 $W$ 的一组基下，$q$ 是 $\\pm x_{1}^{2}$ 与 $q|_{W}$ 的正交直和（交叉项全为零）。对维数 $n-1$ 的 $W$ 用归纳假设，$q|_{W} \\cong \\operatorname{diag}(1^{p\'}, -1^{q\'}, 0^{z\'})$；拼起来即得对角形 ✓。',
        '',
        '**唯一性（维数计数）**。设 $A$ 合同于 $D = \\operatorname{diag}(I_{p}, -I_{q}, 0_{z})$ 与 $D\' = \\operatorname{diag}(I_{p\'}, -I_{q\'}, 0_{z\'})$，即存在可逆 $Q$ 使 $D\' = Q^{T}DQ$。反设 $p > p\'$。在 $D\'$ 的坐标下取 $E := \\{x : x_{1} = \\cdots = x_{p\'} = 0\\}$，$\\dim E = n - p\'$；在 $D$ 的坐标下取 $U := \\{y : y_{p+1} = \\cdots = y_{n} = 0\\}$，$\\dim U = p$。子空间 $Q(E)$ 与 $U$ 的维数和 $= (n-p\') + p > n$，故有交；取 $0 \\ne y \\in Q(E) \\cap U$，令 $x := Q^{-1}y \\in E$。则 $x \\ne 0$，且 $x^{T}D\'x = \\sum_{i > p\'} d\'_{i} x_{i}^{2} \\le 0$（$D\'$ 第 $i$ 个对角元在 $i > p\'$ 时 $\\le 0$）；另一方面 $y^{T}Dy = x^{T}Q^{T}DQx = x^{T}D\'x$，而 $y \\in U$、$y \\ne 0$ 给出 $y^{T}Dy = \\sum_{i \\le p} y_{i}^{2} > 0$ —— 矛盾。故 $p \\le p\'$；交换 $D, D\'$ 同理得 $p\' \\le p$，即 $p = p\'$。对 $-A$ 用同一论证得 $q = q\'$，再由秩 $p+q+z = n$ 得 $z = z\'$ ✓。',
        '',
        '**合同分类**。合同是等价关系，且上面的论证表明合同变换保持 $(p, q)$：同阶实对称矩阵合同 $\\iff$ 它们有相同的惯性指数。',
        '',
        '**正定性**。$p = n$ 时 $D = I$，$A = Q^{-T}Q^{-1}$ 正定。反之设 $A$ 正定而 $D$ 有非正方向（$q > 0$ 或 $z > 0$）：取 $z \\ne 0$ 使 $z^{T}Dz \\le 0$，令 $x := Qz \\ne 0$，则 $x^{T}Ax = z^{T}Dz \\le 0$，与正定性矛盾；故 $q = z = 0$，$p = n$ ✓。∎',
        '⭐ **这个唯一性论证是「维数计数」的典范**：不去算变换矩阵，而是比较两个子空间的维数。同一个套路在 Courant–Fischer 极小极大原理里也用过。',
        '**它和谱定理的关系**：矩阵版谱定理也给出对角化，但用的是**正交**变换。惯性定理只要**可逆**变换，代价是看不到特征值、只看到符号 —— 更粗，但对「分类」正好够。',
        '⚠️ 复情形**没有**这个唯一性：$\\mathbb{C}$ 上任何非退化对称型都合同于 $I$（因为 $\\sqrt{c}$ 存在），只剩秩一个不变量。所以「惯性定理是实情形的特权」。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· Sylvester 惯性定理',
        '北大《高等代数》· 惯性定理'
      ]
    },

    {
      id: 'thm.witt-cancellation',
      cluster: 'algebra.multilinear',
      type: 'theorem',
      label: 'Witt 消去定理',
      title: 'Witt 消去：非退化型的分解是唯一的',
      regions: ['algebra'],
      tags: ['定理', '线性代数', 'Witt', '消去', '二次型'],
      statement: [
        '**在做什么**：保证「正交分解」是可消去的 —— 若两块型加上同一个东西后同构，则它们本来就同构。有了它，才能谈「型」的**唯一分解**，而不是「某一种分解」。',
        '',
        '设 $V$ 是**有限维**向量空间，$\\beta$ 是域 $K$（$\\operatorname{char} K \\ne 2$）上的**非退化**对称双线性型，$U, W \\subseteq V$ 是**非退化**子空间。若存在等距（保持 $\\beta$ 的线性同构）',
        '',
        '$$U \\perp W \\ \\cong\\ U\' \\perp W ,$$',
        '',
        '则 $U \\cong U\'$（作为带型的空间）。',
        '',
        '**推论（唯一分解）**：非退化型总能正交分解为若干个双曲平面加一块**非迷向**空间，且双曲平面的个数（Witt 指标）与非迷向部分（的同构类）都由型唯一确定。'
      ].join('\n'),
      notes: [
        "**为什么需要「非退化」这个前提**：退化情形下消去律会失败（$\\beta = 0$ 时左式恒为 $0$）。这也是为什么整个二次型理论都要先假设非退化 —— 不是技术洁癖，而是消去律的生死线。",
        "⭐ **它是「分类」的最后一块砖**：惯性定理（实情形，`thm.sylvester-law-inertia`）给的是「对角形的符号个数唯一」；Witt 消去给的是「**任意**域上分解的块数唯一」。前者只在 $\\mathbb{R}$ 上有效，后者在任意域（char $\\ne$ 2）上都成立。",
        "⚠️ $\\operatorname{char} K \\ne 2$ 不能去：特征 $2$ 时「对称」与「交错」重合、$\\frac{1}{2}$ 不存在，配方法与 Witt 理论都要重写（那是另一门学问）。本图不展开。",
        "⭐ 更强的版本叫 **Witt 延拓引理**（`lem.witt-extension`）：非退化子空间之间的等距总能延拓成整个空间的等距。消去定理由它直接推出，证明见边 `imp.witt-cancellation`。",
        "**读法与证明。** $U'\\perp W$ 指等距像空间中的那块正交和（不要求 $U'\\subseteq V$）。完整证明在边 `imp.witt-cancellation` 上：先用 `lem.witt-extension` 把 $f|_W$ 延拓成 $V_2$ 的等距，再用 $F^{-1}\\circ f$ 固定 $W$，最后由 $W^{\\perp}$ 的唯一性得到 $U\\cong U'$。"
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· Witt 定理',
        'Chevalley, The Algebraic Theory of Spinors'
      ]
    },

    {
      id: "lem.equal-norm-isometry",
      cluster: "algebra.multilinear",
      type: "lemma",
      label: "等长向量由反射互达",
      title: "等长向量由反射互达",
      regions: ["algebra"],
      tags: ["bilinear-form","quadratic-form","reflection"],
      statement: [
        "设 $N$ 是有限维非退化对称双线性空间，$\\operatorname{char}K\\ne2$，$q$ 是其二次型。若 $x,y\\in N$ 满足 $q(x)=q(y)\\ne0$，则存在 $N$ 的等距 $\\rho$ 使 $\\rho(x)=y$。"
      ].join('\n'),
      notes: [
        "反射 $s_v(z)=z-\\frac{2\\beta(z,v)}{q(v)}v$（$q(v)\\ne0$）是等距并把 $v$ 送到 $-v$；本引理说一个反射（必要时再复合中心反转 $z\\mapsto-z$）就能把等长向量互送。这是 Cartan–Dieudonné 分解的最基本一块。",
        "证明见边 `imp.equal-norm-isometry`。"
      ].join('\n\n'),
      refs: ["Hoffman–Kunze, Linear Algebra, Ch. 10","Chevalley, The Algebraic Theory of Spinors, Ch. 1"]
    },

    {
      id: "lem.witt-extension",
      cluster: "algebra.multilinear",
      type: "lemma",
      label: "Witt 延拓引理",
      title: "Witt 延拓引理：非退化子空间上的等距可延拓",
      regions: ["algebra"],
      tags: ["bilinear-form","isometry","witt"],
      statement: [
        "设 $N$ 是有限维非退化对称双线性空间，$\\operatorname{char}K\\ne2$，$A\\subseteq N$ 是非退化子空间。若 $\\sigma:A\\to N$ 是到 $\\sigma(A)$ 的等距，则 $\\sigma$ 可延拓为 $N$ 的等距。"
      ].join('\n'),
      notes: [
        "证明对 $\\dim A$ 归纳：取非迷向 $a\\in A$，把 $A$ 写成 $A_0\\perp\\operatorname{span}(a)$，归纳延拓 $\\sigma|_{A_0}$，再用一个反射把像点调到 $\\sigma(a)$ 上，最后正交拼接。",
        "证明见边 `imp.witt-extension`；它是 Witt 消去定理的直接来源。"
      ].join('\n\n'),
      refs: ["Hoffman–Kunze, Linear Algebra, Ch. 10","Chevalley, The Algebraic Theory of Spinors, Ch. 1"]
    }
  ],

  edges: [
    { id: 'dep.bf-matrix-bf', kind: 'definition',
      definition: 'def.bilinear-form', usedBy: 'def.matrix-of-bilinear-form',
      note: '矩阵表示是双线性型的坐标写法，先有双线性型。' },
    { id: 'dep.bf-matrix-basis', kind: 'definition',
      definition: 'def.vs', usedBy: 'def.matrix-of-bilinear-form',
      note: '要选一组基才能写出 $\\beta(e_i, e_j)$。' },
    { id: 'dep.bf-matrix-transpose', kind: 'definition',
      definition: 'def.transpose', usedBy: 'def.matrix-of-bilinear-form',
      note: '$\\beta(x,y) = x^{T}Ay$ 与换基公式 $P^{T}AP$ 都用到转置。' },

    { id: 'dep.gram-inner', kind: 'definition',
      definition: 'def.inner-product', usedBy: 'def.gram-matrix',
      note: 'Gram 矩阵的元素就是内积，没有内积无从谈起。' },
    { id: 'dep.gram-posdef', kind: 'definition',
      definition: 'def.positive-definite-matrix', usedBy: 'def.gram-matrix',
      note: 'Gram 矩阵正定 $\\iff$ 向量线性无关 —— 用正定矩阵的判据来陈述。' },

    { id: 'dep.cong-bf', kind: 'definition',
      definition: 'def.matrix-of-bilinear-form', usedBy: 'def.congruent-matrices',
      note: '合同就是「同一个双线性型在不同基下的两个矩阵」之间的关系。' },
    { id: 'dep.cong-invertible', kind: 'definition',
      definition: 'def.invertible-matrix', usedBy: 'def.congruent-matrices',
      note: '合同要求变换矩阵可逆（换基必须是同构）。' },

    { id: 'dep.iso-bf', kind: 'definition',
      definition: 'def.bilinear-form', usedBy: 'def.isotropic-vector',
      note: '迷向是双线性型（二次型）上的性质。' },
    { id: 'dep.iso-qform', kind: 'definition',
      definition: 'def.quadratic-form', usedBy: 'def.isotropic-vector',
      note: '$\\beta(v,v) = q(v)$，所以「迷向」也可以直接用二次型说。' },

    { id: 'dep.isosub-bf', kind: 'definition',
      definition: 'def.bilinear-form', usedBy: 'def.isotropic-subspace',
      note: '整块子空间上的双线性型恒为零。' },
    { id: 'dep.isosub-ocomp', kind: 'definition',
      definition: 'def.orthogonal-complement', usedBy: 'def.isotropic-subspace',
      note: '判据 $W \\subseteq W^{\\perp}$ 用的就是正交补。' },
    { id: 'dep.isosub-isovec', kind: 'definition',
      definition: 'def.isotropic-vector', usedBy: 'def.isotropic-subspace',
      note: '迷向子空间里的每个向量都迷向 —— 是单体概念的整块化。' },

    { id: 'dep.hyp-bf', kind: 'definition',
      definition: 'def.bilinear-form', usedBy: 'def.hyperbolic-plane',
      note: '双曲平面是一块特殊的二维带型子空间。' },
    { id: 'dep.hyp-isovec', kind: 'definition',
      definition: 'def.isotropic-vector', usedBy: 'def.hyperbolic-plane',
      note: '它的两个基向量都是迷向向量。' },

    { id: 'dep.inertia-qform', kind: 'definition',
      definition: 'def.quadratic-form', usedBy: 'def.inertia-index',
      note: '惯性指数是二次型（实对称型）的对角化计数。' },
    { id: 'dep.inertia-posdef', kind: 'definition',
      definition: 'def.positive-definite-matrix', usedBy: 'def.inertia-index',
      note: '「正定 $\\iff p = n$」把两个概念接起来。' },

    { id: 'dep.syl-inertia', kind: 'definition',
      definition: 'def.inertia-index', usedBy: 'thm.sylvester-law-inertia',
      note: '定理的主语就是惯性指数；它断言 $(p,q,z)$ 唯一。' },
    { id: 'dep.syl-cong', kind: 'definition',
      definition: 'def.congruent-matrices', usedBy: 'thm.sylvester-law-inertia',
      note: '定理给的是**合同**分类（不是相似分类）。' },

    { id: 'dep.witt-hyp', kind: 'definition',
      definition: 'def.hyperbolic-plane', usedBy: 'thm.witt-cancellation',
      note: '唯一分解里的「块」就是双曲平面。' },
    { id: 'dep.witt-isosub', kind: 'definition',
      definition: 'def.isotropic-subspace', usedBy: 'thm.witt-cancellation',
      note: 'Witt 指标 = 迷向子空间的最大维数；定理保证它良定义。' },
    { id: "imp.equal-norm-isometry", kind: 'implication',
      sources: ["def.bilinear-form","def.quadratic-form","def.isometry"],
      target: "lem.equal-norm-isometry",
      title: "反射把等长向量互送",
      proof: [
        "若 $x=y$，取恒等。以下设 $x\\ne y$。",
        "**情形 1：$q(x-y)\\ne0$。** 令 $s(z)=z-\\frac{2\\beta(z,x-y)}{q(x-y)}(x-y)$。直接计算 $q(s(z))=q(z)$、$\\beta(s(z),s(w))=\\beta(z,w)$，故 $s$ 是等距，且 $s(x-y)=-(x-y)$。由极化恒等式 $q(x-y)=2(q(x)-\\beta(x,y))$，得 $s(x)=x-(x-y)=y$。",
        "**情形 2：$q(x-y)=0$。** 此时 $\\beta(x,y)=q(x)\\ne0$，从而 $q(x+y)=2(q(x)+\\beta(x,y))=4q(x)\\ne0$。对 $v=x+y$ 作反射 $s_v$：$s_v(x)=x-\\frac{2\\beta(x,x+y)}{q(x+y)}(x+y)=x-(x+y)=-y$。再复合中心反转 $\\iota(z)=-z$（它显然保 $\\beta$），得 $\\iota\\circ s_v(x)=y$。",
        "两种情形都给出 $N$ 的等距把 $x$ 送到 $y$。$\\blacksquare$"
      ].join('\n\n') },
    { id: "imp.witt-extension", kind: 'implication',
      sources: ["def.isometry","def.orthogonal-complement","def.isotropic-vector","lem.equal-norm-isometry"],
      target: "lem.witt-extension",
      title: "对子空间维数归纳延拓等距",
      proof: [
        "对 $\\dim A$ 归纳。$\\dim A=0$ 时取恒等。设 $\\dim A>0$。",
        "**取非迷向向量。** 若 $q(a)=0$ 对一切 $a\\in A$ 成立，则极化恒等式给 $2\\beta(x,y)=q(x+y)-q(x)-q(y)=0$，即 $\\beta$ 在 $A$ 上恒为零，与 $A$ 非退化矛盾（$\\operatorname{char}K\\ne2$）。故存在 $a\\in A$ 使 $q(a)\\ne0$。令 $A_0=a^{\\perp}\\cap A$。由 $q(a)\\ne0$ 得 $A=A_0\\perp\\operatorname{span}(a)$。",
        "**归纳。** $\\sigma_0:=\\sigma|_{A_0}$ 是到 $\\sigma(A_0)$ 的等距，$A_0$ 非退化、维数更小；归纳假设把它延拓为等距 $\\tau:N\\to N$。令 $x=\\tau(a)$、$y=\\sigma(a)$。则 $q(x)=q(a)=q(y)\\ne0$。对 $u\\in A_0$，$\\beta(x-y,\\sigma(u))=\\beta(\\tau(a),\\tau(u))-\\beta(\\sigma(a),\\sigma(u))=\\beta(a,u)-\\beta(a,u)=0$，故 $x-y\\in M:=\\sigma(A_0)^{\\perp}$；又 $x,y\\in M$（$\\tau,\\sigma$ 都是等距）。",
        "**在正交补里修正。** $\\sigma(A_0)$ 非退化，$N$ 非退化，故 $M$ 非退化。由 `lem.equal-norm-isometry`，存在 $M$ 的等距 $\\rho$ 使 $\\rho(x)=y$。把 $\\rho$ 与 $\\operatorname{id}_{\\sigma(A_0)}$ 在正交分解 $N=\\sigma(A_0)\\perp M$ 下拼成等距 $\\tilde\\rho:N\\to N$。则 $\\tilde\\rho\\circ\\tau$ 是 $N$ 的等距，在 $A_0$ 上与 $\\sigma$ 一致，并把 $a$ 送到 $\\tilde\\rho(x)=y=\\sigma(a)$；所以它是 $\\sigma$ 在 $A$ 上的延拓。归纳完成。$\\blacksquare$"
      ].join('\n\n') },
    { id: "imp.witt-cancellation", kind: 'implication',
      sources: ["def.bilinear-form","def.orthogonal-complement","lem.witt-extension"],
      target: "thm.witt-cancellation",
      title: "延拓后固定 $W$，再用正交补的唯一性消去",
      proof: [
        "记 $V_1=U\\perp W$、$V_2=U'\\perp W$，$f:V_1\\to V_2$ 是等距。",
        "**正交补就是另一块。** $W$ 非退化，故 $V_1=W\\perp(W^{\\perp}\\cap V_1)$，且 $\\dim(W^{\\perp}\\cap V_1)=\\dim V_1-\\dim W=\\dim U$；由 $U\\subseteq W^{\\perp}\\cap V_1$ 得 $U=W^{\\perp}\\cap V_1$。同理 $U'=W^{\\perp}\\cap V_2$。因此只需找等距 $g:V_1\\to V_2$ 使 $g(W)=W$。",
        "**把 $f$ 修正成固定 $W$。** $f(W)$ 非退化。对等距 $f|_W:W\\to f(W)$ 用 `lem.witt-extension`（环境 $V_2$ 非退化、$\\operatorname{char}K\\ne2$）得等距 $F:V_2\\to V_2$，且 $F|_W=f|_W$。令 $g=F^{-1}\\circ f$。$g$ 是等距；对 $w\\in W$，$g(w)=F^{-1}(f(w))=w$，即 $g|_W=\\operatorname{id}_W$，故 $g(W)=W$。",
                "**收尾。** $g(U)=g(W^{\\perp}\\cap V_1)=g(W)^{\\perp}\\cap g(V_1)=W^{\\perp}\\cap V_2=U'$，所以 $U\\cong U'$。$\\blacksquare$",
        "**唯一分解的推论。** 存在性对 $\\dim V$ 归纳：若有迷向 $v\\ne0$，因 $\\beta$ 非退化可取 $w$ 使 $\\beta(v,w)=1$，则 $H=\\operatorname{span}(v,w)$ 是非退化双曲平面且 $V=H\\perp H^{\\perp}$，对 $H^{\\perp}$ 归纳；若没有迷向向量，$V$ 自己就是非迷向块。唯一性：设 $V=H_1\\perp\\cdots\\perp H_r\\perp A=H_1'\\perp\\cdots\\perp H_s'\\perp A'$（$H_i,H_j'$ 双曲平面，$A,A'$ 非迷向），对 $r+s$ 归纳，用本定理消去 $H_1$ 与某个双曲块；双曲平面含迷向向量而非迷向块不含，故只能与双曲块同构，最后 $A\\cong A'$。"
      ].join('\n\n') }
  ]
});
