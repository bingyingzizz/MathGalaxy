/* ==========================================================================
   内容包 · 线性代数补洞（一）：内积空间上的矩阵分类
   --------------------------------------------------------------------------
   12 个节点。补的是**矩阵侧**这一整条线 —— 用户报「正规矩阵、酉矩阵啥的都没做」。

   ⛔ 补之前：`def.normal-operator`（正规**算子**）、`thm.spectral-theorem`（实对称谱定理）、
      `cor.spectral-normal`（复正规）、`thm.svd` 都在，但它们的**主角**——
      酉矩阵 / 正交矩阵 / Hermite 矩阵 / 对称矩阵 / 正规矩阵 / 正定矩阵——**一个都没定义**
      （搜「正规矩阵」全库 0 次）。读者点进谱定理找不到「对称矩阵是什么」。
      另外 **转置**被 8 个节点用到却没有定义。这一批把地基补齐。

   归属：全部进 `algebra.inner`（内积空间与正交性，16 → 28 点，仍 < 40）。
   为什么不开新团：这一批就是「有了内积之后算子被分成哪几类、各自能对角化成什么」，
   与那个团的描述是同一件事；拆开会把一个装置劈成两半。

   ⚠️ 参考书：Hoffman–Kunze《Linear Algebra》、Axler《Linear Algebra Done Right》、
      北大《高等代数》—— 按 129 的口径**只写书名 + 主题名，不编章节号**。

   ⚠️ 层号是算出来的：`def.transpose` 落 10、共轭转置 11、酉/Hermite 12、正规 13、
      正定 14；Schur / 谱定理（矩阵版）/ 极分解 / Courant–Fischer 排在现有谱定理（20/21）之后。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数补洞：内积空间上的矩阵分类',

  nodes: [

    /* ============================================ §A 两个基本操作 */
    {
      id: 'def.transpose',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '转置',
      title: '矩阵的转置与它的性质',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '转置', '对偶'],
      statement: [
        '**在做什么**：把矩阵沿主对角线翻过来。看起来只是个记号操作，但它正是**对偶空间上诱导的映射**在矩阵语言里的样子。',
        '',
        '设 $A = (a_{ij}) \\in M_{m\\times n}(K)$。**转置** $A^{T} \\in M_{n\\times m}(K)$ 由 $(A^{T})_{ij} := a_{ji}$ 定义。',
        '',
        '**基本性质**：$(A+B)^{T} = A^{T} + B^{T}$、$(cA)^{T} = cA^{T}$、$(A^{T})^{T} = A$，以及最要紧的一条',
        '',
        '$$(AB)^{T} = B^{T} A^{T}$$',
        '',
        '（乘法**换序**。）若 $A$ 可逆，则 $A^{T}$ 可逆且 $(A^{-1})^{T} = (A^{T})^{-1}$。'
      ].join('\n'),
      notes: [
        '**为什么乘法要换序**：转置不是「重新排一下」，它是**对偶**。\n\n线性映射 $T : V \\to W$ 诱导对偶映射 $T^{*} : W^{*} \\to V^{*}$（方向反过来），而 $T^{*}$ 的矩阵恰好是 $T$ 的矩阵的转置。\n\n方向既然反了，复合的次序自然也要反 —— $(AB)^{T} = B^{T}A^{T}$ 说的就是这件事。',
        '**与配对的相容性**：把向量当列，则 $y^{T}Ax$ 是一个数，且等于 $(A^{T}y)^{T}x$ —— 「把 $A$ 从一边搬到另一边」全靠这条，它是后面「伴随算子」「对称矩阵」全部内容的起点。',
        '⚠️ 转置依赖**基的选取**（需要用对偶基），而下一节的共轭转置（$A^{*}$）在标准正交基下才等于「伴随算子的矩阵」。把两者混同是初学最常见的事故。',
        '⚠️ 别把 $(AB)^{T} = B^{T}A^{T}$ 记成 $A^{T}B^{T}$：只有当 $A, B$ 都是方阵且碰巧可交换时才可能对，一般不成立。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Linear Transformations」· 转置与对偶',
        '北大《高等代数》· 矩阵的转置'
      ]
    },

    {
      id: 'def.conjugate-transpose',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '共轭转置',
      title: '共轭转置：复数情形下的「伴随」',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '共轭转置', '伴随', '内积'],
      statement: [
        '**在做什么**：复数域上，光是转置不够 —— 内积对第二个变元是共轭线性的，所以「搬 $A$ 到另一边」时要连共轭一起搬。于是有了共轭转置。',
        '',
        '设 $A \\in M_{m\\times n}(\\mathbb{C})$。**共轭转置**（也叫**伴随矩阵**）是',
        '',
        '$$A^{*} := \\overline{A}^{T} = \\bigl(\\overline{A^{T}}\\bigr), \\qquad (A^{*})_{ij} := \\overline{a_{ji}} .$$',
        '',
        '性质：$(A+B)^{*} = A^{*} + B^{*}$、$(cA)^{*} = \\overline{c}\\,A^{*}$、$(AB)^{*} = B^{*}A^{*}$、$(A^{*})^{*} = A$。',
        '',
        '**与内积的关系（这才是它的定义性性质）**：对一切 $x, y$ 有',
        '',
        '$$\\langle Ax, y\\rangle = \\langle x, A^{*}y\\rangle .$$',
        '',
        '实矩阵时 $A^{*} = A^{T}$，两个概念重合。'
      ].join('\n'),
      notes: [
        '**它是伴随算子的矩阵**：若在**标准正交基**下取矩阵，线性映射 $T$ 的伴随算子 $T^{*}$（`def.operator-adjoint`）的矩阵就是 $T$ 的矩阵的共轭转置。⚠️ 换了非标准正交基，这两者不再相等 —— 那条关系是「标准正交基」的特权，不是坐标无关的恒等式。',
        '**为什么必须共轭**：$\\mathbb{C}^{n}$ 的标准内积是 $\\langle x, y\\rangle = \\sum \\overline{x_i} y_i$（对第一个变元共轭），于是把 $A$ 从左边搬到右边时，$\\overline{A}$ 会自然出现。\n\n用「只转置」的版本，$\\langle Ax,y\\rangle = \\langle x, A^{T}y\\rangle$ 在复数域上是错的。',
        '⚠️ 三种记法并存：$A^{*}$、$A^{\\dagger}$、$A^{H}$。本图统一用 $A^{*}$（与伴随算子同一个星号）。',
        '⚠️ 「伴随矩阵」这个词在有些书里指**代数余子式矩阵**（本图用 `def.determinant` 那一支的记号）。这里按内积意义使用，遇到中文教材要注意分辨。'
      ].join('\n\n'),
      refs: [
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 伴随',
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 共轭转置'
      ]
    },

    /* ============================================ §B 四类矩阵 */
    {
      id: 'def.unitary-matrix',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '酉矩阵与正交矩阵',
      title: '酉矩阵与正交矩阵：保持内积的矩阵',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '酉矩阵', '正交矩阵', '等距'],
      statement: [
        '**在做什么**：把「保持长度与夹角」这件事写成矩阵条件。复情形叫**酉**，实情形叫**正交** —— 同一个条件在两种域上的两副面孔。',
        '',
        '设 $U \\in M_{n}(\\mathbb{C})$。称 $U$ 是**酉矩阵**，若',
        '',
        '$$U^{*}U = I ,$$',
        '',
        '⚠️ 有限阶时**只需这一个等式**：$U^{*}U = I$ 已说明 $U$ 单射，方阵单射即可逆，于是 $U^{*} = U^{-1}$，再右乘 $U$ 得 $UU^{*} = I$（反过来用 $UU^{*} = I$ 一样）。等价地 $U^{-1} = U^{*}$。实方阵 $Q \\in M_{n}(\\mathbb{R})$ 满足 $Q^{T}Q = I$ 时叫**正交矩阵**。',
        '',
        '**等价刻画**：以下三条等价 —— (i) $U$ 酉；(ii) $U$ 的**列**构成标准正交基；(iii) 对一切 $x, y$ 有 $\\langle Ux, Uy\\rangle = \\langle x, y\\rangle$。',
        '',
        '于是酉矩阵保持内积、从而保持范数（$\\lVert Ux\\rVert = \\lVert x\\rVert$）与距离；$\\lvert\\det U\\rvert = 1$。全体酉矩阵构成群 $U(n)$，正交矩阵构成 $O(n)$。'
      ].join('\n'),
      notes: [
        '**「酉」这个名字**：$U^{*}U = I$ 在实情形退化成正交（$\\perp$ 的意思），复数情形中文取「酉」（对应英文 unitary，源自拉丁语 unus「一」）。术语不重要，条件是同一个。',
        '**为什么列是标准正交基就够了**：$U^{*}U = I$ 的第 $(j,k)$ 项就是「第 $j$ 列与第 $k$ 列的内积 = $\\delta_{jk}$」。所以「酉」= 「把标准正交基送到标准正交基」，这是最省事的判据。',
        '**与 `def.isometry` 的关系**：酉矩阵正是「在标准正交基下、保内积的线性映射」的矩阵。⚠️ 保内积的算子（等距）与酉矩阵在标准正交基下才一一对应；换基之后矩阵不再酉，但算子仍保内积。',
        '⭐ **对数值的意义**：酉变换不放大误差（$\\lVert Ux\\rVert = \\lVert x\\rVert$），所以「酉相似」是最稳定的相似 —— 这也是 Schur 三角化与 SVD 都选酉变换的原因。'
      ].join('\n\n'),
      refs: [
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 等距',
        '北大《高等代数》· 酉矩阵与正交矩阵'
      ]
    },

    {
      id: 'def.hermitian-matrix',
      cluster: 'algebra.inner',
      type: 'definition',
      label: 'Hermite 矩阵与对称矩阵',
      title: 'Hermite 矩阵与对称矩阵：等于自己的伴随',
      regions: ['algebra'],
      tags: ['定义', '线性代数', 'Hermite 矩阵', '对称矩阵', '自伴'],
      statement: [
        '**在做什么**：把「自伴」写成矩阵条件。复情形叫 **Hermite**，实情形叫**对称**。它们的特征是**特征值全实**、**可正交对角化**。',
        '',
        '设 $A \\in M_{n}(\\mathbb{C})$。称 $A$ 是 **Hermite 矩阵**（自伴矩阵），若',
        '',
        '$$A^{*} = A .$$',
        '',
        '实方阵满足 $A^{T} = A$ 时叫**对称矩阵**。',
        '',
        '**关键性质**：(i) 对角元全实；(ii) 特征值**全是实数**；(iii) 属于不同特征值的特征向量**互相正交**；(iv) 存在酉矩阵 $U$ 使 $U^{*}AU$ 为实对角阵（`thm.spectral-matrix`）。',
        '',
        '实对称矩阵是 Hermite 矩阵在 $A$ 取实值时的特例，此时 (iv) 可写成 $Q^{T}AQ$ 为对角阵，$Q$ 正交。'
      ].join('\n'),
      notes: [
        '**为什么特征值是实的**：取特征向量 $x \\ne 0$ 使 $Ax = \\lambda x$，则 $\\lambda\\langle x, x\\rangle = \\langle Ax, x\\rangle = \\langle x, Ax\\rangle = \\overline{\\lambda}\\langle x, x\\rangle$ —— 第二步用的就是自伴。\n\n于是 $\\lambda = \\overline{\\lambda}$。',
        '**为什么不同特征值的特征向量正交**：若 $Ax = \\lambda x$、$Ay = \\mu y$，则 $\\lambda\\langle x,y\\rangle = \\langle Ax,y\\rangle = \\langle x,Ay\\rangle = \\mu\\langle x,y\\rangle$，而 $\\lambda \\ne \\mu$ $\\implies$ $\\langle x,y\\rangle = 0$。\n\n这两行是整章的核心计算，谱定理全靠它起头。',
        '**它和二次型的关系**：对称矩阵与二次型一一对应（$q(x) = x^{T}Ax$，`def.quadratic-form`）；Hermite 矩阵与 Hermite 型一一对应。「正定」就是这条对应下「$q > 0$」（`def.positive-definite-matrix`）。',
        '⚠️ 别把「Hermite」与「对称」当两件无关的事：实对称 $\\subset$ Hermite。而**复对称**（$A^{T} = A$ 而 $A^{*} \\ne A$）既不是 Hermite 也没有实特征值 —— 复数域上要用 $A^{*}$，不是 $A^{T}$。'
      ].join('\n\n'),
      refs: [
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 自伴算子',
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· Hermite 与对称'
      ]
    },

    {
      id: 'def.normal-matrix',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '正规矩阵',
      title: '正规矩阵：与自己的伴随可交换',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '正规矩阵', '酉对角化'],
      statement: [
        '**在做什么**：把酉矩阵、Hermite 矩阵、以及「$A^{*}A$ 与 $AA^{*}$ 不分先后」的那些矩阵，收进同一个类 —— 这一类正好就是**能被酉对角化**的全部矩阵。',
        '',
        '设 $A \\in M_{n}(\\mathbb{C})$。称 $A$ 是**正规矩阵**，若',
        '',
        '$$A^{*}A = AA^{*} .$$',
        '',
        '**包含关系**（都是真包含）：',
        '',
        '$\\{$ 酉 $\\} \\subset \\{$ 正规 $\\}$，$\\{$ Hermite $\\} \\subset \\{$ 正规 $\\}$，$\\{$ 实对称 $\\} \\subset \\{$ 正规 $\\}$。',
        '',
        '**核心结论**（`thm.spectral-matrix`）：$A$ 正规 $\\iff$ 存在酉矩阵 $U$ 使 $U^{*}AU$ 是对角阵。',
        '',
        '实情形对应的是**实正规矩阵**（$A^{T}A = AA^{T}$）：它可正交对角化，但**分块**为 $1\\times 1$ 与 $2\\times 2$ 的块，不一定是纯对角 —— 因为非实特征值只能成共轭对出现。'
      ].join('\n'),
      notes: [
        '**为什么正规是「正确的」类**：谱定理的证明里，唯一真正用到的是「特征向量正交 + 有足够多特征向量」。这两件事合起来恰好等价于 $A^{*}A = AA^{*}$ —— 所以「正规」不是人为挑出来的条件，而是「酉可对角化」的**代数翻译**。',
        '**实正规为什么只能分块对角化**：$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0\\end{pmatrix}$ 是实正规的（它是旋转 $90^\\circ$），但它没有实特征向量，当然不可能正交对角化。它的两个特征值是 $\\pm i$ —— 共轭成对，这就是那类 $2\\times 2$ 块的来源。',
        '⚠️ 与本图 `def.normal-operator`（正规**算子**）的分工：那一条说的是算子 $T^{*}T = TT^{*}$，是坐标无关的；这一条说的是它在**标准正交基**下的矩阵条件。两条互为翻译，但不要混着用（换了非标准正交基，算子的矩阵就不再「正规」）。',
        '⭐ 记住这张表就够：**正规 $\\iff$ 酉对角化**；再往上加条件就得到特殊类 —— 加上「特征值全实」得 Hermite，加上「特征值全在单位圆上」得酉，两个都加得「特征值只有 $\\pm 1$」的自伴酉。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 正规算子',
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 复谱定理'
      ]
    },

    {
      id: 'def.positive-definite-matrix',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '正定矩阵',
      title: '正定矩阵与半正定矩阵',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '正定', '半正定', '二次型'],
      statement: [
        '**在做什么**：把「这个二次型处处为正」写成矩阵条件。物理上它是「能量形式」，几何上它是「内积的另一种写法」。',
        '',
        '设 $A \\in M_{n}(\\mathbb{C})$ 是 Hermite 矩阵。称 $A$ **正定**，若对一切 $x \\ne 0$',
        '',
        '$$x^{*}Ax > 0 ;$$',
        '',
        '把 $>$ 换成 $\\ge$ 就得**半正定**。实对称矩阵的情形把 $x^{*}$ 换成 $x^{T}$。',
        '',
        '**等价刻画**（前两条最常用）：',
        '',
        '1. 所有特征值 $> 0$（半正定：$\\ge 0$）；',
        '2. 所有**顺序主子式** $> 0$（Sylvester 判据，`thm.sylvester-criterion`）；',
        '3. 存在可逆 $P$ 使 $A = P^{*}P$（半正定：$A = P^{*}P$ 不必可逆）；',
        '4. $x \\mapsto \\sqrt{x^{*}Ax}$ 是范数（半正定时是半范数）。'
      ].join('\n'),
      notes: [
        '**它是「内积的矩阵」**：任意内积在基下的矩阵就是正定 Hermite 矩阵；反过来每个正定矩阵都给出一个内积。所以「正定」= 「合法的内积矩阵」，这条对应比任何判据都好用。',
        '**为什么顺序主子式就够了**：Sylvester 判据—— 做 LDL 分解时第 $k$ 个主元等于 $k$ 阶顺序主子式之比，主元全正则正定。⚠️ 只查**顺序**主子式，不是所有主子式（所有主子式 $>0$ 是更强的条件，只在特殊场合等价）。',
        '⭐ **正定 $\\implies$ 可开方**：存在唯一的半正定 $\\sqrt{A}$ 使 $(\\sqrt A)^{2} = A$（在正交基下把特征值开方）。这正是**极分解** $A = UP$ 里那个 $P$ 的来源（`thm.polar-decomposition`）。',
        '⚠️ 「$A^{T}A$ 总是半正定」这句话在复数域要写成 $A^{*}A$；并且它正定当且仅当 $A$ 的列线性无关（否则有非零核向量）。这条在回归/最小二乘里反复出现。',
        ,
        '**各方向用到的假设**（四条里，前两条是“谱/主子式”判据，后两条是“分解/范数”判据，依赖的东西不一样）：\n' +
        '\n' +
        '- (定义) $\\iff$ (1)：**要用谱定理**（Hermite 矩阵可正交对角化，`thm.spectral-matrix`）。对角化后 $x^{*}Ax = \\sum \\lambda_{i}\\lvert y_{i}\\rvert^{2}$，于是「恒正」$\\iff$「每个 $\\lambda_{i} > 0$」。**这一条只在 Hermite（实对称）时成立**：非对称矩阵可以有正的特征值却不正定（$x^{T}Ax$ 里混着反对称部分）。\n' +
        '- (1) $\\implies$ (2)：**只对**顺序主子式**成立，不对「所有主子式」**。Sylvester 判据说的是「$n$ 个顺序主子式全正」；而「所有主子式非负」才是半正定的判据（两者不是一回事，半正定情形顺序主子式可以为零）。这一条**不用谱定理**，只用配方法 —— 所以它是纯代数的，在任意有序域上都成立。\n' +
        '- (2) $\\implies$ (定义)：**需要实（或 Hermite）对称**。做法是分块高斯消元（LDL 分解）：顺序主子式非零保证消元可行，得到的对角元正是主子式之比。\n' +
        '- (定义) $\\iff$ (3)：**这一步用谱定理或 Cholesky**。$A = P^{*}P$ 时 $x^{*}Ax = \\lVert Px\\rVert^{2}$，可逆 $P$ 给出严格正；反向取 $P = \\Lambda^{1/2}U^{*}$。**注意这里必须允许复/实矩阵用共轭转置**，写成 $A = P^{T}P$ 只在实对称时对。\n' +
        '- (3) $\\iff$ (4)：**三角不等式验证**即得（$\\sqrt{x^{*}Ax} = \\lVert Px\\rVert$ 是范数）。反向用 $x^{*}Ax$ 的平方根定义 —— 需要先证它是二次型。\n' +
        '\n' +
        '⚠️ **三处最容易错的地方**：(a) 忘掉「Hermite/实对称」这个前提（复情形要用 $x^{*}$，用 $x^{T}Ax > 0$ 讨论复矩阵是没有意义的，它可能不是实数）；(b) 把「顺序主子式全正」换成「所有主子式全正」—— 后者是**更强**的条件（对正定也对，但半正定时只有后者能用）；(c) 半正定时 $P$ 不可逆、特征值可为 $0$、平方根只是半范数 —— 三条要同时放宽。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 正定',
        '北大《高等代数》· 正定二次型'
      ]
    },

    /* ============================================ §C 三条结构定理 */
    {
      id: 'thm.schur-triangularization',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: 'Schur 三角化',
      title: 'Schur 三角化：任何复方阵都酉相似于上三角',
      regions: ['algebra'],
      tags: ['定理', '线性代数', 'Schur', '三角化', '酉相似'],
      statement: [
        '**在做什么**：酉对角化要求太强（只有正规矩阵做得到，`thm.spectral-matrix`）。退一步只要求**上三角**，那就不挑矩阵了 —— 任何复方阵都行。',
        '',
        '设 $A \\in M_{n}(\\mathbb{C})$。则存在**酉**矩阵 $U$ 使',
        '',
        '$$U^{*}AU = T ,$$',
        '',
        '其中 $T$ 是**上三角**矩阵，且 $T$ 的对角元恰是 $A$ 的特征值（按任意事先指定的次序排列）。',
        '',
        '实情形：任意实方阵正交相似于**实 Schur 形**，即分块上三角，对角块为 $1\\times 1$ 或 $2\\times 2$（对应成对的共轭复特征值）。',
        '',
        '**特例**：$A$ 正规时 $T$ 必是对角阵 —— 这就是谱定理（`thm.spectral-matrix`）。'
      ].join('\n'),
      notes: [
        '**证明**（对 $n$ 归纳）。$n = 1$ 时取 $U = (1)$ 即可。设 $n \\ge 2$。',
        '',
        '**取特征向量**：特征多项式 $\\chi_{A}(t) = \\det(tI - A)$ 是 $n$ 次复系数多项式，由**代数基本定理**它有根 $\\lambda$；于是存在 $0 \\ne x \\in \\mathbb{C}^{n}$ 使 $Ax = \\lambda x$。把 $x$ 单位化，仍记 $x$，$\\lVert x\\rVert = 1$。',
        '',
        '**补成标准正交基**：由 **Gram–Schmidt**，把 $x$ 扩充为 $\\mathbb{C}^{n}$ 的标准正交基 $u_{1} = x, u_{2}, \\ldots, u_{n}$。令 $U_{1} := (u_{1}, \\ldots, u_{n})$（以它们为列），则 $U_{1}$ 是酉矩阵，且 $U_{1}^{*}u_{j} = e_{j}$。于是 $U_{1}^{*}AU_{1}$ 的第一列是 $U_{1}^{*}Ax = \\lambda U_{1}^{*}x = \\lambda e_{1}$：它的形状是「左上角 $\\lambda$、左下角全 $0$、右下角一个 $(n-1)$ 阶块 $A_{1}$、右上角某个行向量 $w^{*}$」。',
        '',
        '**归纳**：对 $A_{1}$ 用归纳假设，存在 $(n-1)$ 阶酉矩阵 $V$ 使 $V^{*}A_{1}V = T_{1}$ 为上三角。令 $U_{2} := \\operatorname{diag}(1, V)$、$U := U_{1}U_{2}$。$U_{2}$ 酉（分块对角，两块都酉），故 $U$ 酉；把 $U_{2}$ 从左右两侧作用到 $U_{1}^{*}AU_{1}$ 上，左上角 $\\lambda$ 不变、右上角变成 $w^{*}V$、左下角仍是 $0$、右下角变成 $V^{*}A_{1}V = T_{1}$ —— 所以 $U^{*}AU$ 是上三角 ✓。',
        '',
        '**对角元是特征值**：$U^{*}AU$ 与 $A$ 相似，故特征多项式相同；分块上三角矩阵（左上 $\\lambda$、右下 $A_{1}$、左下 $0$）的特征多项式是 $(t - \\lambda)\\chi_{A_{1}}(t)$，所以 $U^{*}AU$ 的对角元全体作为多重集恰是 $\\operatorname{spec}(A)$ —— 其中 $T_{1}$ 的对角元是 $A_{1}$ 的特征值（归纳假设），而 $\\operatorname{spec}(A) = \\{\\lambda\\} \\cup \\operatorname{spec}(A_{1})$。',
        '',
        '**按指定次序排列**：每一步先取指定次序中最靠前的那个尚未安排的特征值 $\\lambda$（它在 $\\operatorname{spec}(A)$ 中，故有特征向量），对 $A_{1}$ 归纳时用指定次序在 $A_{1}$ 上诱导的次序。于是对角元的次序可以事先指定 ✓。',
        '',
        '**实情形的注**：非实复特征值成对共轭出现，取实部与虚部得到不变 2 维实子空间，同样的归纳给出实 Schur 形（对角块 $1\\times 1$ 或 $2\\times 2$），这里不展开。∎',
        '⭐ **为什么它比 Jordan 标准形更常用**：Jordan 形用任意相似（$P^{-1}AP$），理论上漂亮但 $P$ 可能病态到无法计算；Schur 用酉相似（$U^{*}AU$），条件数永远是 1。所以**数值线性代数一律用 Schur，不用 Jordan**。',
        '**它给出谱定理的捷径**：若 $A$ 正规且 $U^{*}AU = T$ 上三角，则 $T$ 也正规；而上三角且正规 $\\implies$ 必是对角阵（比较 $(TT^{*})_{11}$ 的两边即得第一行除对角元外全零，再归纳）。',
        '⚠️ 实情形**不能**做成实对角/实三角到「只有 $1\\times1$ 块」的程度：旋转 $90^\\circ$ 那个例子说明 $2\\times 2$ 块躲不掉。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· Schur 定理',
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 复谱定理的证明'
      ]
    },

    {
      id: 'thm.spectral-matrix',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: '谱定理（矩阵版）',
      title: '谱定理（矩阵版）：正规矩阵恰好是酉可对角化的那些',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '谱定理', '酉对角化', '正规矩阵'],
      statement: [
        '**在做什么**：把两条已有的算子版谱定理（`thm.spectral-theorem` 实对称、`cor.spectral-normal` 复正规）落到**矩阵**上，并给出精确的充要条件。',
        '',
        '设 $A \\in M_{n}(\\mathbb{C})$。则',
        '',
        '$A$ 正规 $\\iff$ 存在酉矩阵 $U$ 使 $U^{*}AU = \\operatorname{diag}(\\lambda_{1}, \\ldots, \\lambda_{n})$',
        '',
        '即：**正规 $\\iff$ 有一组标准正交的特征向量基**。此时',
        '',
        '$$A = U \\Lambda U^{*}, \\qquad \\Lambda = \\operatorname{diag}(\\lambda_{1}, \\ldots, \\lambda_{n}) ,$$',
        '',
        '这叫 $A$ 的**谱分解**（正交投影之和：$A = \\sum_i \\lambda_i u_i u_i^{*}$）。',
        '',
        '**实情形**：实对称矩阵 $\\iff$ 存在**正交**矩阵 $Q$ 使 $Q^{T}AQ$ 为实对角阵。'
      ].join('\n'),
      notes: [
        '**四个等价说法，任取其一当定义都行**：$A$ 正规；$A$ 有标准正交特征向量基；$A = U\\Lambda U^{*}$；$A$ 的谱测度只取原子值。矩阵语言里第一种最省事，第二种最直观（`thm.spectral-matrix` 的全部内容就是「两者等价」）。',
        '**谱分解的读法**：$A = \\sum_i \\lambda_i P_i$，其中 $P_i = u_i u_i^{*}$ 是往特征方向上的正交投影，满足 $P_i^2 = P_i$、$P_iP_j = 0$（$i \\ne j$）、$\\sum_i P_i = I$。\n\n于是**「对角化」= 「把算子拆成一堆互相垂直的方向，各自乘一个数」**。',
        '⭐ 与函数演算的连接：有了谱分解，任意函数 $f$ 都能作用：$f(A) := \\sum_i f(\\lambda_i)P_i$。$\\sqrt{A}$、$e^{tA}$、$A^{1/2}$ 全是这一条的特例 —— 这也是为什么「正定矩阵可开方」不需要另外构造。',
        '⚠️ 非正规矩阵也可能可对角化（`thm.diagonalizable`），但特征向量**不正交**，相似矩阵 $P$ 一般病态。所以「可对角化」与「酉可对角化」是两件事：后者要求**正交**，强得多。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 谱定理',
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 谱定理'
      ]
    },

    {
      id: 'thm.polar-decomposition',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: '极分解',
      title: '极分解：$A = UP$，把矩阵拆成「旋转 $\\times$ 拉伸」',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '极分解', '奇异值', '半正定'],
      statement: [
        '**在做什么**：复数可以写成 $z = e^{i\\theta}\\lvert z\\rvert$（方向 $\\times$ 长度）。矩阵也有同款分解：**酉（方向）$\\times$ 半正定（长度）**。',
        '',
        '设 $A \\in M_{n}(\\mathbb{C})$。则存在酉矩阵 $U$ 与**半正定** Hermite 矩阵 $P$ 使',
        '',
        '$$A = UP ,$$',
        '',
        '且 $P$ 由 $A$ 唯一确定（$P = \\sqrt{A^{*}A}$）；若 $A$ 可逆，则 $U$ 也唯一，且 $P$ 正定。',
        '',
        '**另一种次序**：同样有 $A = P\'U\'$，其中 $P\' = \\sqrt{AA^{*}}$ 半正定、$U\'$ 酉。',
        '',
        '**与 SVD 的关系**：把 $P$ 对角化（$P = V\\Sigma V^{*}$）即得 $A = (UV)\\Sigma V^{*}$ —— 这正是奇异值分解；$\\Sigma$ 的对角元就是**奇异值**。'
      ].join('\n'),
      notes: [
        '**为什么 $P = \\sqrt{A^{*}A}$**：就像 $\\lvert z\\rvert = \\sqrt{\\bar z z}$。\n\n$A^{*}A$ 总是半正定 Hermite（`def.positive-definite-matrix` 的注），所以能开唯一的半正定平方根。\n\n定义 $U := AP^{-1}$（$A$ 可逆时），剩下只需验 $U$ 保内积 —— 一行计算：$U^{*}U = P^{-1}A^{*}AP^{-1} = P^{-1}P^{2}P^{-1} = I$。',
        '⭐ **几何读法**：任何线性映射都是「先沿一组正交方向各自伸缩（$P$），再整体旋转（$U$）」。伸缩因子就是奇异值。这条对**非方阵**也成立（用等距代替酉）。',
        '**与 SVD 的分工**：极分解强调「旋转 $\\times$ 拉伸」这个**结构**，SVD 强调「$A = U\\Sigma V^{*}$ 这个**坐标写法**」。两者信息量相同，SVD 多给了两组基底。',
        '⚠️ 唯一性要说清：$P$ 永远唯一，但 $A$ 奇异时 $U$ 可以在 $A$ 的核上任意取 —— 所以「极分解唯一」这句话只在可逆时成立。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 极分解',
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 极分解'
      ]
    },

    /* ============================================ §D 两个谱量 + 极小极大 */
    {
      id: 'def.spectral-radius',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '谱半径',
      title: '谱半径：特征值模长的最大值',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '谱半径', '特征值', '范数'],
      statement: [
        '**在做什么**：用一个数概括「谱有多大」。它决定 $A^{k}$ 会不会爆炸，也决定迭代法收不收敛。',
        '',
        '设 $A \\in M_{n}(\\mathbb{C})$。**谱半径**是',
        '',
        '$\\rho(A) := \\max\\bigl\\{\\, \\lvert\\lambda\\rvert : \\lambda$ 是 $A$ 的特征值 $\\, \\bigr\\}$',
        '',
        '**基本性质**：',
        '',
        '1. $\\rho(A) \\le \\lVert A\\rVert$ 对**任意**从属矩阵范数成立；',
        '2. 相似不变：$\\rho(P^{-1}AP) = \\rho(A)$（特征值不变）；',
        '3. $\\rho(A) = \\lim_{k\\to\\infty}\\lVert A^{k}\\rVert^{1/k}$（这一条在有限维可由 Jordan 形直接验证）；',
        '4. $\\rho(A) < 1 \\iff A^{k} \\to 0$。'
      ].join('\n'),
      notes: [
        '⚠️ **公式 (3) 在本图只做到有限维**。一般 Banach 代数上的 Gelfand 公式 $\\rho(a) = \\lim\\lVert a^{n}\\rVert^{1/n}$（以及「谱非空」「谱半径等于谱的上确界」）需要复分析（Liouville）与算子理论，**留给泛函那一批**，这里不展开成独立节点。',
        '**为什么第 (1) 条成立但常常严格**：取特征对 $Ax = \\lambda x$，则 $\\lvert\\lambda\\rvert\\lVert x\\rVert = \\lVert Ax\\rVert \\le \\lVert A\\rVert\\lVert x\\rVert$。\n\n等号不总成立 —— $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0\\end{pmatrix}$ 的 $\\rho = 0$ 而任何范数都 $> 0$，它是**幂零**的。',
        '⭐ **它的用处比范数更准**：$A^{k}$ 的增长其实由 $\\rho$ 控制（Jordan 块的多项式因子只贡献 $k^{m-1}$ 的因子，被 $\\rho^{k}$ 的指数压住）。所以「迭代收敛」的判据一律写 $\\rho < 1$，而不是 $\\lVert A\\rVert < 1$。',
        '⚠️ 非方阵没有谱半径（特征值只对方阵有定义）；伪谱（pseudospectrum）是另一回事。',
        ,
        '**四条里哪条依赖什么**（谱半径这一组最容易被误当成“都能从定义直推”，其实第 3 条最贵）：\n' +
        '\n' +
        '- (1) $\\rho(A) \\le \\lVert A\\rVert$：**对任意从属范数**（算子范数）成立，一行：(1) 的算子范数就是「最大放大倍数」，而特征向量满足 $Av = \\lambda v$ $\\implies$ $\\lvert\\lambda\\rvert\\lVert v\\rVert \\le \\lVert A\\rVert\\lVert v\\rVert$。⚠️ 对**非从属**的任意矩阵范数（例如 $\\lVert A\\rVert = \\max_{ij}\\lvert a_{ij}\\rvert$ 的变体）不一定成立。\n' +
        '- (2) 相似不变：**只用「相似保持特征多项式」**（`def.char-poly`），不需要任何范数。\n' +
        '- (3) $\\rho(A) = \\lim_{k}\\lVert A^{k}\\rVert^{1/k}$：**这是全组唯一有真内容的**。$(\\le)$ 用 (1) 与谱半径的幂性质；$(\\ge)$ 要用 **Jordan 标准形**（`thm.jordan-canonical-form`）+ 一个 $\\varepsilon$ 技巧（把 $\\rho + \\varepsilon$ 当成“放大后的谱半径”，证明 $\\lVert(A/(\\rho+\\varepsilon))^{k}\\rVert$ 有界）。**必须有限维**：无穷维时这条公式一般**不**成立（要看算子谱的边界与范数之间的关系）。\n' +
        '- (4) $\\rho(A) < 1 \\iff A^{k} \\to 0$：**只依赖 (3) 或 Jordan 形**。($\\Longleftarrow$) 若 $\\rho \\ge 1$，取模最大的特征值 $\\lambda$，则 $\\lVert A^{k}v\\rVert = \\lvert\\lambda\\rvert^{k}\\lVert v\\rVert$ 不趋于 $0$。($\\implies$) 由 (3) 得 $\\lVert A^{k}\\rVert^{1/k} \\to \\rho < 1$，故 $\\lVert A^{k}\\rVert \\to 0$。\n' +
        '\n' +
        '⚠️ **三处必须记住的假设**：\n' +
        '- **(1) 与 (3) 都要求有限维**；(3) 还要求**取遍所有从属范数时不依赖范数** —— 极限值恰好与范数无关，这正是它有用的原因（Gelfand 公式）。\n' +
        '- **$\\rho(A) < 1$ 与 $\\lVert A\\rVert < 1$ 不是一回事**：前者是谱条件（相似不变量），后者是范数条件（依范数而变）。存在 $\\rho(A) < 1$ 而 $\\lVert A\\rVert > 1$ 的矩阵（例如 $\\begin{pmatrix}0 & 10\\\\ 0.1 & 0\\end{pmatrix}$：$\\rho = 1$…… 换成 $\\begin{pmatrix}0 & 9\\\\ 0.1 & 0\\end{pmatrix}$ 则 $\\rho = \\sqrt{0.9} < 1$ 而 $\\lVert A\\rVert_{\\infty} = 9$）。\n' +
        '- **(2) 不能加强成「合同不变」或「正交相似不变」之外的更多**：谱半径对**任意相似**不变，但对合同（$P^{T}AP$）**不**不变。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 谱',
        '北大《高等代数》· 特征值与谱'
      ]
    },

    {
      id: 'def.rayleigh-quotient',
      cluster: 'algebra.inner',
      type: 'definition',
      label: 'Rayleigh 商',
      title: 'Rayleigh 商：用二次型读出特征值',
      regions: ['algebra'],
      tags: ['定义', '线性代数', 'Rayleigh 商', '特征值', '变分'],
      statement: [
        '**在做什么**：把「特征值」变成一个**极值问题**。这样特征值就能被「优化」而不是只能「解方程」。',
        '',
        '设 $A$ 是 $n$ 阶 Hermite 矩阵。对 $x \\ne 0$ 定义 **Rayleigh 商**',
        '',
        '$$R_{A}(x) := \\frac{x^{*}Ax}{x^{*}x} .$$',
        '',
        '（$x$ 是单位向量时就是 $x^{*}Ax$，所以它其实是「$A$ 在 $x$ 方向上的平均伸缩率」。）',
        '',
        '**核心性质**：',
        '',
        '1. $R_{A}(x)$ 恒为**实数**，且落在 $[\\lambda_{\\min}, \\lambda_{\\max}]$ 内；',
        '2. $\\lambda_{\\min} = \\min_{x\\ne 0} R_A(x)$、$\\lambda_{\\max} = \\max_{x\\ne 0} R_A(x)$，极值在对应特征向量处取到；',
        '3. 更一般地，全体临界点恰是特征向量，临界值恰是特征值。'
      ].join('\n'),
      notes: [
        '**为什么它是实的**：$\\overline{x^{*}Ax} = x^{*}A^{*}x = x^{*}Ax$（用 Hermite），而分母是实数。',
        '⭐ **它给出「最速下降/幂迭代」的理论依据**：沿 $R_A$ 的梯度方向走就是在逼近最大特征向量。数值上 $x_{k+1} \\propto Ax_k$ 收敛到主特征向量的速率由 $\\lvert\\lambda_2/\\lambda_1\\rvert$ 决定 —— 这就是幂法的收敛率。',
        '**它的推广**是要证明 `thm.courant-fischer`：只把 $R_A$ 限制在 $k$ 维子空间上取极值，就得到第 $k$ 个特征值。所以 Rayleigh 商是「谱的变分刻画」的入口，不是孤立的记号。',
        '⚠️ $A$ 必须 Hermite（或实对称）才保证 $R_A$ 是实的、有极值意义；一般矩阵的 $x^{*}Ax$ 是复的，Rayleigh 商退化成复值函数，标准理论不适用。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 变分刻画',
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 极小极大'
      ]
    },

    {
      id: 'thm.courant-fischer',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: 'Courant–Fischer 极小极大原理',
      title: 'Courant–Fischer：第 $k$ 个特征值的变分刻画',
      regions: ['algebra'],
      tags: ['定理', '线性代数', 'Courant–Fischer', '极小极大', '特征值'],
      statement: [
        '**在做什么**：Rayleigh 商只能抓**最大**与**最小**特征值。要抓「第 $k$ 个」，就得让子空间参与竞争 —— 这就是极小极大。',
        '',
        '设 $A$ 是 $n$ 阶 Hermite 矩阵，特征值按降序排列 $\\lambda_{1} \\ge \\lambda_{2} \\ge \\cdots \\ge \\lambda_{n}$。则对每个 $k = 1, \\ldots, n$，',
        '',
        '$$\\lambda_{k} = \\max_{\\dim S = k}\\ \\min_{0 \\ne x \\in S} R_{A}(x) = \\min_{\\dim T = n-k+1}\\ \\max_{0 \\ne x \\in T} R_{A}(x) ,$$',
        '',
        '其中 $S, T$ 取遍相应维数的子空间，$R_A$ 是 Rayleigh 商。',
        '',
        '**推论（Weyl 单调性）**：若 $A \\le B$（即 $B - A$ 半正定），则 $\\lambda_{k}(A) \\le \\lambda_{k}(B)$ 对每个 $k$ 成立。'
      ].join('\n'),
      notes: [
        '**证明**（谱定理 + 子空间维数计数）。由谱定理，存在 $\\mathbb{C}^{n}$ 的标准正交基 $u_{1}, \\ldots, u_{n}$ 与实数 $\\lambda_{1} \\ge \\cdots \\ge \\lambda_{n}$ 使 $Au_{i} = \\lambda_{i}u_{i}$。对 $x = \\sum_{i} c_{i}u_{i} \\ne 0$，',
        '',
        '$$R_{A}(x) = \\frac{\\langle Ax, x\\rangle}{\\langle x, x\\rangle} = \\frac{\\sum_{i} \\lambda_{i}|c_{i}|^{2}}{\\sum_{i} |c_{i}|^{2}}$$',
        '',
        '是 $\\lambda_{1}, \\ldots, \\lambda_{n}$ 的加权平均（权 $|c_{i}|^{2} \\ge 0$ 不全为零）。',
        '',
        '**第一等式**。上界：任取 $\\dim S = k$。$S$ 与 $\\operatorname{span}(u_{k}, \\ldots, u_{n})$ 的维数之和是 $k + (n-k+1) = n+1 > n$，故有交，取交中单位向量 $x$；它的 $c_{1} = \\cdots = c_{k-1} = 0$，故 $R_{A}(x)$ 是 $\\lambda_{k}, \\ldots, \\lambda_{n}$ 的加权平均，$\\le \\lambda_{k}$。于是 $\\min_{S} R_{A} \\le \\lambda_{k}$ 对一切 $S$ 成立，取 $\\max$ 得 $\\le \\lambda_{k}$。',
        '',
        '下界：取 $S_{0} = \\operatorname{span}(u_{1}, \\ldots, u_{k})$。$S_{0}$ 中的 $x$ 满足 $c_{k+1} = \\cdots = c_{n} = 0$，故 $R_{A}(x)$ 是 $\\lambda_{1}, \\ldots, \\lambda_{k}$ 的加权平均，$\\ge \\lambda_{k}$；取 $x = u_{k}$ 得等号。于是 $\\min_{S_{0}} R_{A} = \\lambda_{k}$，取 $\\max$ 得 $\\ge \\lambda_{k}$。两边合起来即第一等式 ✓。',
        '',
        '**第二等式**。上界：任取 $\\dim T = n-k+1$。$T$ 与 $\\operatorname{span}(u_{1}, \\ldots, u_{k})$ 的维数之和 $> n$，故有交，取交中单位向量 $x$；它的 $c_{k+1} = \\cdots = c_{n} = 0$，故 $R_{A}(x) \\ge \\lambda_{k}$，于是 $\\max_{T} R_{A} \\ge \\lambda_{k}$ 对一切 $T$ 成立，取 $\\min$ 得 $\\ge \\lambda_{k}$。',
        '',
        '下界：取 $T_{0} = \\operatorname{span}(u_{k}, \\ldots, u_{n})$（维数 $n-k+1$）。$T_{0}$ 中的 $x$ 满足 $c_{1} = \\cdots = c_{k-1} = 0$，故 $R_{A}(x) \\le \\lambda_{k}$，且 $x = u_{k}$ 取等号；于是 $\\max_{T_{0}} R_{A} = \\lambda_{k}$，取 $\\min$ 得 $\\le \\lambda_{k}$。两边合起来即第二等式 ✓。',
        '',
        '**Weyl 单调性**：$A \\le B$ 指 $B - A$ 半正定，故对一切 $x \\ne 0$ 有 $R_{A}(x) \\le R_{B}(x)$。于是对每个 $k$，$\\min_{\\dim S = k} R_{A} \\le \\min_{\\dim S = k} R_{B}$（逐点比较），再取 $\\max$ 得 $\\lambda_{k}(A) \\le \\lambda_{k}(B)$ ✓。∎',
        '⭐ **它为什么重要**：把「特征值是方程的根」换成「特征值是某个优化问题的值」，于是特征值有了**连续性**（子空间族是紧的）与**单调性**（Weyl）。扰动理论、数值特征值算法、图谱理论全都建立在这条上。',
        '**与 SVD 的连接**：对 $A^{*}A$ 用这条，就得到奇异值的变分刻画 $\\sigma_k = \\max_{\\dim S=k}\\min_{x\\in S}\\lVert Ax\\rVert/\\lVert x\\rVert$ —— 这是「低秩逼近最优」的严格依据（Eckart–Young）。',
        '⚠️ 前提是 **Hermite**（或实对称）。一般矩阵没有实谱，Rayleigh 商也不是实的，这套不等式不成立；那种情形要用奇异值代替特征值。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, 「Operators on Inner Product Spaces」· 极小极大原理',
        'Axler, Linear Algebra Done Right, 「Operators on Inner Product Spaces」· 奇异值'
      ]
    }
  ],

  edges: [
    /* ---------- 转置 / 共轭转置的地基 ---------- */
    { id: 'dep.ln-transpose-matrix', kind: 'definition',
      definition: 'def.matrix', usedBy: 'def.transpose',
      note: '转置是矩阵元素的下标互换，先得有矩阵。' },
    { id: 'dep.ln-transpose-dual', kind: 'definition',
      definition: 'def.dual-space', usedBy: 'def.transpose',
      note: '转置 = 对偶映射的矩阵；「乘法换序」正是「对偶把箭头反过来」的坐标表现。' },
    { id: 'dep.ln-ctranspose-adjoint', kind: 'definition',
      definition: 'def.operator-adjoint', usedBy: 'def.conjugate-transpose',
      note: '在标准正交基下，伴随算子的矩阵就是共轭转置 —— 这是两者唯一正确的连接方式。' },
    { id: 'dep.ln-ctranspose-inner', kind: 'definition',
      definition: 'def.inner-product', usedBy: 'def.conjugate-transpose',
      note: '共轭的来源是内积对第一个变元共轭；没有内积就没有 $A^{*}$。' },
    { id: 'dep.ln-ctranspose-transpose', kind: 'definition',
      definition: 'def.transpose', usedBy: 'def.conjugate-transpose',
      note: '共轭转置 = 先共轭再转置。' },

    /* ---------- 四类矩阵 ---------- */
    { id: 'dep.ln-unitary-ctranspose', kind: 'definition',
      definition: 'def.conjugate-transpose', usedBy: 'def.unitary-matrix',
      note: '酉的定义 $U^{*}U = I$ 直接用共轭转置写。' },
    { id: 'dep.ln-unitary-isometry', kind: 'definition',
      definition: 'def.isometry', usedBy: 'def.unitary-matrix',
      note: '酉矩阵就是「在标准正交基下、保内积的线性映射」的矩阵 —— 等距的坐标写法。' },
    { id: 'dep.ln-unitary-matrix', kind: 'definition',
      definition: 'def.matrix', usedBy: 'def.unitary-matrix',
      note: '先有方阵，才谈得上 $U^{*}U = I$。' },

    { id: 'dep.ln-hermite-ctranspose', kind: 'definition',
      definition: 'def.conjugate-transpose', usedBy: 'def.hermitian-matrix',
      note: 'Hermite 的定义 $A^{*} = A$ 就是一个共轭转置条件。' },
    { id: 'dep.ln-hermite-inner', kind: 'definition',
      definition: 'def.inner-product', usedBy: 'def.hermitian-matrix',
      note: '「自伴」的意义在于 $\\langle Ax,y\\rangle = \\langle x,Ay\\rangle$，必须先有内积。' },

    { id: 'dep.ln-normal-ctranspose', kind: 'definition',
      definition: 'def.conjugate-transpose', usedBy: 'def.normal-matrix',
      note: '正规条件 $A^{*}A = AA^{*}$ 用共轭转置写。' },
    { id: 'dep.ln-normal-operator', kind: 'definition',
      definition: 'def.normal-operator', usedBy: 'def.normal-matrix',
      note: '矩阵版与算子版互为翻译（标准正交基下）。' },
    { id: 'dep.ln-normal-unitary', kind: 'definition',
      definition: 'def.hermitian-matrix', usedBy: 'def.normal-matrix',
      note: 'Hermite 是正规的特例（$A^{*} = A$ $\\implies$ 两个乘积都是 $A^{2}$），包含关系写进正文。' },

    { id: 'dep.ln-posdef-hermite', kind: 'definition',
      definition: 'def.hermitian-matrix', usedBy: 'def.positive-definite-matrix',
      note: '正定只对 Hermite（实对称）矩阵定义 —— 否则 $x^{*}Ax$ 不是实的，「$>0$」没有意义。' },
    { id: 'dep.ln-posdef-qform', kind: 'definition',
      definition: 'def.quadratic-form', usedBy: 'def.positive-definite-matrix',
      note: '正定矩阵与正定二次型一一对应。' },

    /* ---------- 三条结构定理 ---------- */
    { id: 'dep.ln-schur-unitary', kind: 'definition',
      definition: 'def.unitary-matrix', usedBy: 'thm.schur-triangularization',
      note: 'Schur 形的变换必须取酉矩阵（这正是它数值稳定、而 Jordan 形不稳定的原因）。' },
    { id: 'dep.ln-schur-eigen', kind: 'definition',
      definition: 'def.eigenvalue', usedBy: 'thm.schur-triangularization',
      note: '三角阵的对角元就是特征值 —— 归纳证明里每一步都在取特征向量。' },
    { id: 'dep.ln-schur-normal', kind: 'definition',
      definition: 'def.normal-matrix', usedBy: 'thm.spectral-matrix',
      note: '谱定理（矩阵版）的主语就是「正规」这一类。' },
    { id: 'dep.ln-spectral-unitary', kind: 'definition',
      definition: 'def.unitary-matrix', usedBy: 'thm.spectral-matrix',
      note: '对角化的变换限制为酉矩阵，才叫谱分解。' },
    { id: 'dep.ln-spectral-diag', kind: 'analogy',
      a: 'thm.diagonalizable', b: 'thm.spectral-matrix',
      note: '谱定理是「可对角化」在正交条件下的加强版；先有一般的可对角化判据。' },
    { id: 'dep.ln-polar-posdef', kind: 'definition',
      definition: 'def.positive-definite-matrix', usedBy: 'thm.polar-decomposition',
      note: '$P = \\sqrt{A^{*}A}$ 是半正定的，正定那一条给出「半正定矩阵有唯一平方根」。' },
    { id: 'dep.ln-polar-svd', kind: 'equivalence',
      a: 'thm.svd', b: 'thm.polar-decomposition',
      title: '奇异值分解 $\\iff$ 极分解',
      proofs: [
        { label: 'SVD $\\implies$ 极分解',
          text: '设 $A = U\\Sigma V^{*}$。令 $P := V\\Sigma V^{*}$、$W := UV^{*}$：$\\Sigma$ 对角非负故 $P$ 半正定 Hermite，$U,V$ 酉故 $W$ 酉，且 $WP = UV^{*}V\\Sigma V^{*} = U\\Sigma V^{*} = A$。又 $P^{2} = V\\Sigma^{2}V^{*} = A^{*}A$，而半正定平方根唯一，故 $P = \\sqrt{A^{*}A}$ —— 正是极分解里那个 $P$。' },
        { label: '极分解 $\\implies$ SVD（方阵）',
          text: '设 $A = WP$，$W$ 酉、$P$ 半正定 Hermite。由谱定理 $P = V\\Sigma V^{*}$，$\\Sigma = \\operatorname{diag}(\\sigma_1,\\ldots,\\sigma_n)$、$\\sigma_i \\ge 0$。于是 $A = (WV)\\Sigma V^{*}$，取 $U := WV$ 即得 SVD（重排使 $\\sigma_1\\ge\\cdots$）。' }
      ],
      note: '两条定理在**方阵**情形互相推出（这正是等价的范围）；SVD 的陈述更宽、允许长方形，此时极分解要用等距代替酉。原记 analogy，FIX-065 按 AUD-062 改 equivalence 并补双向证明。' },

    /* ---------- 谱量 ---------- */
    { id: 'dep.ln-radius-eigen', kind: 'definition',
      definition: 'def.eigenvalue', usedBy: 'def.spectral-radius',
      note: '谱半径是「所有特征值模长的最大值」，先有特征值。' },
    { id: 'dep.ln-rayleigh-hermite', kind: 'definition',
      definition: 'def.hermitian-matrix', usedBy: 'def.rayleigh-quotient',
      note: 'Rayleigh 商只对 Hermite（实对称）矩阵有实值、有极值意义。' },
    { id: 'dep.ln-rayleigh-inner', kind: 'definition',
      definition: 'def.inner-product', usedBy: 'def.rayleigh-quotient',
      note: '商里的 $x^{*}y$ 就是内积。' },
    { id: 'dep.ln-cf-rayleigh', kind: 'definition',
      definition: 'def.rayleigh-quotient', usedBy: 'thm.courant-fischer',
      note: '极小极大的目标函数就是 Rayleigh 商。' },
    { id: 'dep.ln-cf-hermite', kind: 'definition',
      definition: 'def.hermitian-matrix', usedBy: 'thm.courant-fischer',
      note: '定理要求 $A$ 是 Hermite（实对称）—— 否则特征值不是实的，不等式无从谈起。' },

    /* ---------- 把新节点接回旧图（避免孤岛） ---------- */
    { id: 'dep.ln-spectral-old', kind: 'equivalence',
      a: 'thm.spectral-matrix', b: 'thm.spectral-theorem',
      title: '算子版谱定理 $\\iff$ 矩阵版谱定理（实对称）',
      proofs: [
        { label: '算子版 $\\implies$ 矩阵版',
          text: '设 $A$ 实对称，它定义 $\\mathbb{R}^{n}$（标准正交基）上的自伴算子 $T$。谱定理给 $T$ 的一组标准正交特征基 $u_1,\\ldots,u_n$，以它们为列得正交矩阵 $Q$；由 $T u_i = \\lambda_i u_i$ 得 $AQ = Q\\Lambda$，即 $Q^{\\mathsf{T}}AQ = \\Lambda$ 为实对角阵。' },
        { label: '矩阵版 $\\implies$ 算子版',
          text: '设 $V$ 有限维实内积空间、$T$ 自伴。取标准正交基把 $T$ 写成实对称矩阵 $A$；矩阵版给正交 $Q$ 使 $Q^{\\mathsf{T}}AQ = \\Lambda$。$Q$ 的列是 $V$ 的一组标准正交基，且 $AQ = Q\\Lambda$ 说明第 $i$ 列是特征值 $\\lambda_i$ 的特征向量 —— 这就是谱定理要的特征基，特征值全实由 $\\Lambda$ 直接读出。' }
      ],
      note: '两条是同一件事的算子语言与矩阵语言；关键一步「在标准正交基下取矩阵」在两个方向上都可逆。原记 analogy，FIX-065 改 equivalence 并补双向推导。' },
    { id: 'dep.ln-normal-oldspectral', kind: 'equivalence',
      a: 'thm.spectral-matrix', b: 'cor.spectral-normal',
      title: '正规矩阵可酉对角化 $\\iff$ 正规算子可酉对角化',
      proofs: [
        { label: '算子版 $\\implies$ 矩阵版',
          text: '设 $A$ 正规。取 $\\mathbb{C}^{n}$ 的标准正交基，$A$ 定义的算子 $T$ 满足 $T^{*}T = TT^{*}$。复谱定理给标准正交特征基，以之为列得酉矩阵 $U$；由 $AU = U\\Lambda$ 得 $U^{*}AU = \\Lambda$ 对角。' },
        { label: '矩阵版 $\\implies$ 算子版',
          text: '设 $T$ 是有限维复内积空间上的正规算子。取标准正交基把 $T$ 写成 $A$，正规性逐项传递：$A^{*}A = AA^{*}$。矩阵版给酉 $U$ 使 $U^{*}AU = \\Lambda$；$U$ 的列是标准正交基，$AU = U\\Lambda$ 说明第 $i$ 列是特征值 $\\lambda_i$ 的特征向量。' }
      ],
      note: '原记 analogy，FIX-065 改 equivalence：两个方向都归结为「标准正交基下的矩阵 + $AU = U\\Lambda$」这一条事实。' },
    { id: 'dep.ln-trace-spectral', kind: 'definition',
      definition: 'def.spectral-radius', usedBy: 'def.trace',
      note: '迹等于特征值之和；谱半径给的是「模最大的那个」，两者从不同角度记账。' },
    /* ---------- 补缺边（FIX-026）：FTA / Gram–Schmidt / 谱定理 → Schur、Courant–Fischer ---------- */
    {
      id: 'imp.fa-schur',
      kind: 'implication',
      sources: ['thm.fundamental-algebra'],
      target: 'thm.schur-triangularization',
      title: '代数基本定理 $\\Longrightarrow$ 复方阵可三角化',
      proof: [
        '**① FTA 给特征值**。特征多项式 $\\chi_{A}(t) = \\det(tI - A)$ 是 $n$ 次复系数多项式，由**代数基本定理**它有根 $\\lambda$；于是 $A - \\lambda I$ 奇异，存在单位向量 $x$ 使 $Ax = \\lambda x$。',
        '**② 归纳**。在基 $(x, u_{2}, \\ldots, u_{n})$ 下 $A$ 的矩阵是分块上三角：左上角是 $\\lambda$，第一列除它之外全为 $0$（这正是 $Ax = \\lambda x$ 的直接结果），右下角是 $(n-1)$ 阶块 $A_{1}$。对 $(n-1)$ 阶的 $A_{1}$ 用归纳假设 —— 每一步同样要 FTA 保证下一个特征值存在。于是 $A$ 相似于上三角。',
        '**③ 反过来也对**。若每个复方阵都可三角化，取多项式 $p$ 的友矩阵 $C_{p}$（它的特征多项式就是 $p$）：$C_{p}$ 上三角化后特征多项式是一串一次因子的乘积，故 $p$ 在 $\\mathbb{C}$ 上有根 —— 即 FTA。所以「$\\mathbb{C}$ 代数闭」与「复方阵都可三角化」是同一件事；酉相似（$U^{*}$ 而不只是 $P^{-1}$）另需正交化，见下一条边。∎',
      ].join('\n\n'),
    },

    {
      id: 'imp.gram-schmidt-schur',
      kind: 'implication',
      sources: ['thm.gram-schmidt', 'thm.fundamental-algebra'],
      target: 'thm.schur-triangularization',
      title: 'Gram–Schmidt $\\Longrightarrow$ 酉相似（Schur 的「酉」那一半）',
      proof: [
        '**① 每一步都要正交基**。Schur 归纳取单位特征向量 $u_{1} = x$（存在性由**代数基本定理**保证 —— $\\chi_{A}$ 有复根；Gram–Schmidt 只把基**酉化**），再把 $(x, e_{2}, \\ldots, e_{n})$ 用 **Gram–Schmidt** 正交化成酉基 $U_{1} = (u_{1}, \\ldots, u_{n})$；正交性 $u_{1}^{*}u_{j} = 0$（$j \\ge 2$）让 $U_{1}^{*}AU_{1}$ 的左下角整块为零。',
        '**② 拼起来**。对 $A_{1}$（$u_{1}^{\\perp} \\cong \\mathbb{C}^{n-1}$ 上的压缩）归纳得 $(n-1)$ 阶酉矩阵 $V$，令 $U_{2} = \\operatorname{diag}(1, V)$、$U = U_{1}U_{2}$：两块都酉故 $U$ 酉，于是 $U^{*}AU = T$ 上三角 ✓。',
        '**③ 为什么非要 GS**。不用正交化只能得到「相似于上三角」（任意基就够，见上一条边），得不到 $U^{-1} = U^{*}$；数值线性代数要 Schur 而不要 Jordan，图的就是这个条件数为 $1$ 的换基。∎',
      ].join('\n\n'),
    },

    {
      id: 'imp.spectral-courant-fischer',
      kind: 'implication',
      sources: ['thm.spectral-theorem'],
      target: 'thm.courant-fischer',
      title: '谱定理 $\\Longrightarrow$ Courant–Fischer（Rayleigh 商 + 维数计数）',
      proof: [
        '**① Rayleigh 商是加权平均**。谱定理给标准正交特征基 $u_{1}, \\ldots, u_{n}$，$Au_{i} = \\lambda_{i}u_{i}$，$\\lambda_{1} \\ge \\cdots \\ge \\lambda_{n}$；对 $x = \\sum c_{i}u_{i} \\ne 0$ 有 $R_{A}(x) = \\sum \\lambda_{i}|c_{i}|^{2} \\big/\\ \\sum |c_{i}|^{2}$，即以 $|c_{i}|^{2}$ 为权的加权平均。',
        '**② 上界**。任取 $\\dim S = k$：$S$ 与 $\\operatorname{span}(u_{k}, \\ldots, u_{n})$ 的维数之和 $k + (n - k + 1) > n$，故有交，交中非零向量满足 $c_{1} = \\cdots = c_{k-1} = 0$，于是 $R_{A} \\le \\lambda_{k}$；所以 $\\min_{S} R_{A} \\le \\lambda_{k}$ 对一切 $\\dim S = k$ 的 $S$ 成立。',
        '**③ 下界与取等**。取 $S_{0} = \\operatorname{span}(u_{1}, \\ldots, u_{k})$：其上 $c_{k+1} = \\cdots = c_{n} = 0$，故 $R_{A} \\ge \\lambda_{k}$，且 $x = u_{k}$ 取到等号。两边合起来得 $\\max_{\\dim S = k} \\min_{S} R_{A} = \\lambda_{k}$；把 $S$ 与维数 $n - k + 1$ 的 $T$ 对调（同样靠维数计数）、取 $T_{0} = \\operatorname{span}(u_{k}, \\ldots, u_{n})$ 验证取等，即得第二等式。∎',
      ].join('\n\n'),
    },
  ]
});
