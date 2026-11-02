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
        '⚠️ 「$\\beta$ 非退化 $\\iff$ $A$ 可逆」是**良定义**的（合同保持可逆性），所以可以谈「非退化的双线性型」而不必指定基。这是后面「正交补」「迷向」全部概念的前提。'
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
        '**在做什么**：内积也是双线性型（实情形对称、复情形 Hermite），所以它也有矩阵。这个矩阵永远是**正定**的 —— 反过来每个正定矩阵都给出一个内积。',
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
        '3. 若 $V = \\mathbb{R}^{n}$ 且向量是矩阵 $A$ 的列，则 $G = A^{T}A$（复情形 $A^{*}A$）。'
      ].join('\n'),
      notes: [
        '**它是「会算的内积」**：内积是抽象的双线性型，Gram 矩阵是它在一组向量上的全部读数。有了 $G$，投影、正交化、最小二乘全都变成解线性方程组（见 `thm.least-squares`）。',
        '⭐ **Gram–Schmidt 的行列式读法**：正交化之后 $\\det G = \\prod \\lVert u_{i}\\rVert^{2}$（$u_i$ 是正交化后的向量），所以 $\\sqrt{\\det G}$ 就是这组向量张成的平行体体积。这条把「体积」与「行列式」焊在一起，也是积分换元公式的几何来源。',
        '⚠️ 复情形要写 $G_{ij} = \\langle v_i, v_j\\rangle$ 且用共轭对称：$G^{*} = G$（Hermite），不是对称。若把内积约定成对第二个变元共轭，则矩阵要整体转置共轭 —— 约定不同，公式差一个星号。',
        '⚠️ $A^{T}A$ 正定 $\\iff$ $A$ 的列线性无关（满列秩）。这条在最小二乘里是「法方程有唯一解」的充要条件，不满列秩就得用伪逆。'
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
        '复情形用',
        '',
        '$$B = P^{*} A\\, P .$$',
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
        '**几何直观**：把 $q(x) = 1$ 想成「单位球面」。正定型给的是椭球（各向异性）；不定型给的是双曲面，而双曲面**穿过原点的那两条直线**上的点满足 $q = 0$ —— 那就是迷向向量。所以「迷向」= 「光锥方向」。',
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
        '⭐ **辛几何的入口**：交错型（$\\beta(v,v) = 0$ 恒成立）时**整个空间**都是迷向的（每个向量都迷向），这时没人用「迷向子空间」这个词，而改用「拉格朗日子空间」（$W = W^{\\perp}$，维数恰为 $\\dim V/2$）。两者是同一个正交补条件的不同命名。',
        '⚠️ 对称型的迷向子空间与交错型的习惯不同：对称型里通常只要求「$\\beta|_W$ 恒为零」，交错型里这个条件自动对每个向量成立 $\\implies$ 必须额外要求「$W$ 是维数一半的极大者」才有内容。读文献时先确认作者用的是哪种口径。',
        '⚠️ 迷向子空间**不一定**是奇异子空间：$W$ 自身可以非退化（$W \\cap W^{\\perp} = 0$）而仍然迷向 —— 这正说明「迷向」与「退化」是两件事。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· 迷向子空间',
        'Chevalley, The Algebraic Theory of Spinors（迷向子空间与 Witt 指标，⚠️ 章名未核实，只记书名）'
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
        '**为什么叫「双曲」**：在这块平面上 $q(xu + yw) = 2xy$，等值线 等值线 $xy = c$（$c$ 为常数） 是双曲线。这与「$x^{2} - y^{2}$ 型」是同一件事，只是基选得让 $q$ 更好看。',
        '⭐ **它是「正交基不存在」的最小反例**：在这块平面上，任何一组正交基都不存在（因为每个向量都迷向）。所以「对称型总能正交对角化」这句话**只在正定（或复情形、或惯性指数一侧为零）时成立** —— 一般对称型只能化成「对角 + 这些 2$\\times$2 块」的**标准形**。',
        '⚠️ 交错型的对应物就是「辛平面」：$\\beta(u,w) = 1$（无需 $\\beta(u,u) = \\beta(w,w) = 0$，因为交错型自动如此）。所以辛空间永远能拆成辛平面，维数必为偶数 —— 这是「辛空间维数偶」的真正原因。',
        '⚠️ 一块双曲平面**自身**是非退化的，但它内部全是迷向向量 —— 所以「迷向」与「退化」完全不是一回事（另见 `def.isotropic-subspace` 的注）。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· 双曲平面',
        'Chevalley, The Algebraic Theory of Spinors（⚠️ 章名未核实，只记书名）'
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
        '**符号差的几何读法**：$q(x) = 1$ 的等值面拓扑类型由 $(p,q)$ 决定 —— $(n,0)$ 是椭球、$(n-1,1)$ 是双叶双曲面、更一般地是 $\\mathbb{R}^{p}$ 上的椭球与 $\\mathbb{R}^{q}$ 上的双曲部分的积。所以「惯性指数 = 等值面的拓扑」。',
        '⚠️ **符号差不是「行列式的符号」**：$2\\times2$ 矩阵 $\\operatorname{diag}(1,-1)$ 的符号差是 $0$ 而行列式是 $-1$。符号差是 $p - q$，行列式是 $\\prod\\lambda_i$ —— 前者是「有多少个负方向」，后者是「负方向的个数奇偶」。',
        '⭐ 在几何里它叫 **index**：伪黎曼度量 $(M, g)$ 的「指标」就是每点切空间上 $g$ 的负惯性指数（$1$ $\\implies$ Lorentz 型，$0$ $\\implies$ Riemann 型）。所以这个词在相对论/伪黎曼几何里天天出现。',
        '⚠️ 惯性指数**只在实对称（或 Hermite）情形有意义**。复对称型在合同下只看秩（可以开方把 $-1$ 吸收），没有 $p,q$ 之分。'
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
        '**在做什么**：回答「两个实对称矩阵什么时候合同」。答案极漂亮：**当且仅当惯性指数相同**。于是合同分类被一对整数穷尽。',
        '',
        '设 $A$ 是 $n$ 阶实对称矩阵。则存在可逆 $P$ 使',
        '',
        '$$P^{T} A\\, P = \\operatorname{diag}(\\underbrace{1,\\ldots,1}_{p},\\ \\underbrace{-1,\\ldots,-1}_{q},\\ \\underbrace{0,\\ldots,0}_{z}) ,$$',
        '',
        '且 $p, q, z$ 由 $A$ 唯一确定（`def.inertia-index`）。',
        '',
        '**推论（合同分类）**：两个实对称矩阵合同 $\\iff$ 它们有相同的 $(p, q)$。',
        '',
        '**推论（正定性）**：$A$ 正定 $\\iff p = n$ $\\iff$ $A$ 合同于 $I$。'
      ].join('\n'),
      notes: [
        '**证明骨架**：存在性用配方法（对 $n$ 归纳：先找一个 $q(e) \\ne 0$ 的向量，把它所在的二维平面上的交叉项消掉，剩下正交补上归纳）。\n\n**唯一性**是真正的要点：若有两组对角形，要证 $p$ 相同 —— 反设 $p > p\'$，考虑「$A$ 的正定子空间」与「$B$ 的负半定子空间」，它们的维数和 $> n$ $\\implies$ 有交，于是同一个 $x \\ne 0$ 同时满足 $x^{T}Ax > 0$ 与 $x^{T}Bx \\le 0$，而合同变换下 $x^{T}Ax$ 与 $x^{T}Bx$ 符号必须一致 —— 矛盾。',
        '⭐ **这个唯一性论证是「维数计数」的典范**：不去算变换矩阵，而是比较两个子空间的维数。同一个套路在 `thm.courant-fischer` 里也用过。',
        '**它和谱定理的关系**：谱定理（`thm.spectral-matrix`）也给出对角化，但用的是**正交**变换。惯性定理只要**可逆**变换，代价是看不到特征值、只看到符号 —— 更粗，但对「分类」正好够。',
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
        '设 $\\beta$ 是域 $K$（$\\operatorname{char} K \\ne 2$）上向量空间 $V$ 上的**非退化**对称双线性型，$U, W \\subseteq V$ 是**非退化**子空间。若存在等距（保持 $\\beta$ 的线性同构）',
        '',
        '$$U \\perp W \\ \\cong\\ U\' \\perp W ,$$',
        '',
        '则 $U \\cong U\'$（作为带型的空间）。',
        '',
        '**推论（唯一分解）**：非退化型总能正交分解为若干个双曲平面加一块**非迷向**空间，且双曲平面的个数（Witt 指标）与非迷向部分（的同构类）都由型唯一确定。'
      ].join('\n'),
      notes: [
        '**为什么需要「非退化」这个前提**：退化情形下消去律会失败（$\\beta = 0$ 时左式恒为 $0$）。这也是为什么整个二次型理论都要先假设非退化 —— 不是技术洁癖，而是消去律的生死线。',
        '⭐ **它是「分类」的最后一块砖**：惯性定理（实情形，`thm.sylvester-law-inertia`）给的是「对角形的符号个数唯一」；Witt 消去给的是「**任意**域上分解的块数唯一」。前者只在 $\\mathbb{R}$ 上有效，后者在任意域（char $\\ne$ 2）上都成立。',
        '⚠️ $\\operatorname{char} K \\ne 2$ 不能去：特征 $2$ 时「对称」与「交错」重合、$\\frac{1}{2}$ 不存在，配方法与 Witt 理论都要重写（那是另一门学问）。本图不展开。',
        '⚠️ 更强的版本叫 **Witt 延拓定理**：非退化子空间之间的等距总能延拓成整个空间的等距。它与消去定理等价，但表述不同 —— 读文献时看到哪个都算。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Bilinear Forms」· Witt 定理',
        'Chevalley, The Algebraic Theory of Spinors（⚠️ 章名未核实，只记书名）'
      ]
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
      note: 'Witt 指标 = 迷向子空间的最大维数；定理保证它良定义。' }
  ]
});
