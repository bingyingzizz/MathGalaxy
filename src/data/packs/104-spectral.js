/* ==========================================================================
   内容包 · 线性代数 ⑤：特征值与 Jordan 型
   --------------------------------------------------------------------------
   新星团 `algebra.spectral`（12 点）。它回答的是**相似分类**问题：

     一个算子在换基下能变成什么样？

     不变子空间 → 特征值与特征向量 → 特征多项式 → Cayley–Hamilton
       → 极小多项式 → 可对角化？ → 根子空间分解 → **Jordan 标准形**

   ⭐ 这条链的尽头是「代数闭域上，相似类由 Jordan 型完全决定」——
      它是有限维线性代数里**唯一**一个完整的分类定理。
   ⚠️ 命名：Jordan 标准形用 `thm.jordan-canonical-form`（⛔ 不能叫 `thm.jordan`，
      那是测度论的 Jordan 分解）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数：特征值与 Jordan 型',
  nodes: [

    {
      id: 'def.invariant-subspace',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '不变子空间',
      title: '不变子空间（Invariant Subspace）',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '谱'],
      statement: [
        '设 $T : V \\to V$ 线性。子空间 $U \\subseteq V$ 叫 $T$-**不变**的，当且仅当',
        '',
        '$$T(U) \\subseteq U$$',
        '',
        '即 $u \\in U \\implies T(u) \\in U$。此时 $T$ 限制在 $U$ 上给出一个线性映射 $T|_U : U \\to U$。',
        '',
        '$\\{0\\}$ 与 $V$ 永远是 $T$-不变的（**平凡**不变子空间）；$T$ 的核与像也都是 $T$-不变的。'
      ].join('\n'),
      notes: '⭐ 「不变」是「可以拆开算」的前提：若 $V = U_1 \\oplus \\cdots \\oplus U_k$ 且每个 $U_i$ 都不变，则 $T$ 在这组分解下是**分块对角**的 —— 于是求特征值、判断可逆、算幂都可以逐块做。\n\n⭐ 整条 Jordan 分解的思路就是「把 $V$ 拆成尽量小（尽量细）的不变子空间之直和」，而拆得最细的那一组就是 Jordan 块。\n\n⚠ 注意 $T$-不变与「$T$ 的像」不同：不变只要求 $T(U) \\subseteq U$，不要求等于。$\\ker T \\subseteq U$ 的那些 $U$ 都自动不变。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6', 'Lang, Linear Algebra']
    },
    {
      id: 'def.eigenvalue',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '特征值与特征向量',
      title: '特征值与特征向量（Eigenvalue & Eigenvector）',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '谱'],
      statement: [
        '设 $T : V \\to V$ 线性，$V \\ne \\{0\\}$。数 $\\lambda \\in K$ 叫 $T$ 的**特征值**，当且仅当存在**非零**向量 $v \\in V$ 使',
        '',
        '$$T(v) = \\lambda\\, v$$',
        '',
        '这样的 $v$ 叫属于 $\\lambda$ 的**特征向量**。属于 $\\lambda$ 的特征向量加上 $0$ 构成子空间',
        '',
        '$$E_{\\lambda} := \\ker(T - \\lambda\\,I) \\subseteq V$$',
        '',
        '叫**特征子空间**；$\\dim E_{\\lambda}$ 叫 $\\lambda$ 的**几何重数**。'
      ].join('\n'),
      notes: '⭐ 一句话：**特征向量是「$T$ 只把它拉伸、不改变方向」的那些向量**，特征值是拉伸倍数。等价说法：$\\lambda$ 是特征值 $\\iff$ $T - \\lambda I$ **不可逆** $\\iff$ $\\det(\\lambda I - T) = 0$。\n\n⭐ 特征子空间 $E_\\lambda$ 是 $T$-不变的（而且 $T$ 在它上面就是「乘 $\\lambda$」），不同特征值的特征子空间**线性无关**（和是直和）。\n\n⚠ $\\lambda$ 必须在 $K$ 里：实矩阵可能没有实特征值（旋转 $90^\\circ$ 的特征值是 $\\pm i$），此时要扩到 $\\mathbb{C}$（或直接说「在 $K$ 上无特征值」）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6']
    },
    {
      id: 'def.char-poly',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '特征多项式',
      title: '特征多项式 $\\chi_T(x) = \\det(x I - T)$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '谱', '多项式'],
      statement: [
        '设 $T : V \\to V$ 线性、$\\dim V = n < \\infty$。任取一组基把 $T$ 写成矩阵 $A$，定义',
        '',
        '$$\\chi_T(x) := \\det(x\\,I_n - A) \\in K[x]$$',
        '',
        '叫 $T$ 的**特征多项式**。它是一个 $n$ 次首一多项式，且与基的选取无关（换基给出相似的 $A$，而 $\\det(P^{-1}(xI - A)P) = \\det(xI - A)$）。',
        '',
        '它的根（在 $K$ 中，或扩域中）恰好是 $T$ 的特征值，重数叫**代数重数**。展开后',
        '',
        '$$\\chi_T(x) = x^{n} - (\\operatorname{tr} T)\\,x^{n-1} + \\cdots + (-1)^{n} \\det T$$'
      ].join('\n'),
      notes: '⭐ 特征多项式把「特征值」这个**几何**问题变成了「多项式求根」这个**代数**问题 —— 于是代数基本定理保证在 $\\mathbb{C}$ 上永远有 $n$ 个特征值（计重数）。\n\n⭐ 系数与不变量的关系：$x^{n-1}$ 的系数是 $-\\operatorname{tr} T$、常数项是 $(-1)^{n}\\det T$。于是「迹 = 特征值之和」「行列式 = 特征值之积」都成了 Vieta 公式的读法，**不必真的解出特征值**。\n\n⚠ 几何重数 $\\le$ 代数重数；两者不等的例子是 $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$（$\\lambda = 1$：代数重数 2、几何重数 1）—— 这正是它不能对角化的原因。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6', 'Lang, Linear Algebra']
    },
    {
      id: 'def.trace',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '迹',
      title: '迹 $\\operatorname{tr} A$（Trace）',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '谱'],
      statement: [
        '对方阵 $A = (a_{ij}) \\in M_n(K)$，定义**迹**为对角线之和：',
        '',
        '$$\\operatorname{tr} A := \\sum_{i=1}^{n} a_{ii}$$',
        '',
        '基本性质：',
        '',
        '- $\\operatorname{tr}(A + B) = \\operatorname{tr} A + \\operatorname{tr} B$，$\\operatorname{tr}(cA) = c\\operatorname{tr} A$（线性）；',
        '- $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$，于是 $\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr} A$（**相似不变**）；',
        '- $\\operatorname{tr}(ABC) = \\operatorname{tr}(BCA)$（**循环不变**）。'
      ].join('\n'),
      notes: '⭐ 迹是**最便宜的不变量**：$O(n)$ 就算出来，却已经能区分不少矩阵（比行列式便宜得多）。\n\n⭐ 它的深层含义：$\\operatorname{tr}$ 是矩阵代数的**唯一的（差常数倍）中心线性泛函**，也是「$K^{n}$-代数到 $K$ 的迹型」—— 在 Galois 理论、特征类里都会再遇到。\n\n⚠ 「相似不变」比「循环不变」弱：$\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr}(A P^{-1} P) = \\operatorname{tr}A$ 只是循环不变的特例。反之迹相同不蕴含相似（$\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ 与零矩阵迹都是 $0$ 而不相似）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6']
    },
    {
      id: 'def.similarity',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '相似',
      title: '相似（Similarity）',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '谱'],
      statement: [
        '两个方阵 $A, B \\in M_n(K)$ 叫**相似**，记 $A \\sim B$，当且仅当存在可逆矩阵 $P$ 使',
        '',
        '$$B = P^{-1} A\\, P$$',
        '',
        '$P$ 叫**过渡矩阵**。相似的**等价**说法：$A$ 与 $B$ 是同一个线性映射在两组基下的矩阵。',
        '',
        '相似的不变量：秩、迹、行列式、特征多项式（从而特征值与它们的代数重数）、极小多项式。'
      ].join('\n'),
      notes: '⭐ 相似是**等价关系**（自反 / 对称 / 传递），所以 $M_n(K)$ 被分成相似类；**分类问题就是「描述所有相似类」**。\n\n⭐ 两个世界对同一个问题的两种说法：矩阵侧是「$B = P^{-1}AP$」，映射侧是「同一个 $T$、两组基」。图上两条边（`thm.change-of-basis` 与 `dep.linearmap-similarity`）说的就是这件事。\n\n⚠ 相似比**等价**（$B = PAQ$）严格：等价只要求秩相同，相似还要求特征多项式相同。$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$ 与 $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ 等价但不相似。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6']
    },
    {
      id: 'thm.cayley-hamilton',
      cluster: 'algebra.spectral',
      type: 'theorem',
      label: 'Cayley–Hamilton',
      title: '定理（Cayley–Hamilton）：$\\chi_T(T) = 0$',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '谱'],
      statement: [
        '设 $T : V \\to V$ 是有限维 $K$-向量空间上的线性映射，$\\chi_T$ 是它的特征多项式。把 $\\chi_T$ 里出现的 $x$ 换成 $T$（常数项乘 $I$），得到算子 $\\chi_T(T)$。则',
        '',
        '$$\\chi_T(T) = 0$$',
        '',
        '（右边是**零算子**；矩阵形式是零矩阵。）',
        '',
        '矩阵形式：对 $A \\in M_n(K)$ 有 $\\chi_A(A) = 0$（零矩阵）。'
      ].join('\n'),
      notes: '⭐ 这条定理说的是「**每个算子都满足自己的特征方程**」—— 于是 $\\chi_T$ 是「把 $T$ 送进零」的多项式**之一**，这立刻给出一个把 $K[x]$-模的结构用上的入口（$V$ 成了 $K[x]/(\\chi_T)$-模）。\n\n⚠ 常见错误记法：不能把 $\\chi_T(T) = \\det(T I - T)$ 这样代进去（那是「矩阵里的矩阵」），要**先把 $\\chi_T$ 展开成 $\\sum c_k x^{k}$，再逐项换成 $\\sum c_k T^{k}$**。\n\n⭐ 用途：算矩阵的幂（$A^{n}$ 可以用低次幂线性表出）、证明极小多项式整除特征多项式、求逆矩阵（$A^{-1}$ 由 $\\chi_A$ 的系数给出）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6', 'Lang, Linear Algebra']
    },
    {
      id: 'thm.diagonalizable',
      cluster: 'algebra.spectral',
      type: 'theorem',
      label: '可对角化判据',
      title: '定理：可对角化的几个等价条件',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '谱'],
      statement: [
        '设 $\\dim V = n < \\infty$，$T : V \\to V$ 线性，$\\lambda_1, \\ldots, \\lambda_m$ 是它在 $K$ 中互异的特征值。则下列命题等价：',
        '',
        '**(1)** $T$ **可对角化**：存在基使 $T$ 的矩阵是对角阵；',
        '',
        '**(2)** $V = E_{\\lambda_1} \\oplus \\cdots \\oplus E_{\\lambda_m}$，即特征向量张成整个 $V$；',
        '',
        '**(3)** $\\sum_i \\dim E_{\\lambda_i} = n$（几何重数之和达到 $n$）；',
        '',
        '**(4)** 每个特征值的几何重数等于代数重数；',
        '',
        '**(5)** 存在**互异**的 $\\lambda_i$ 使 $T$ 满足 $\\prod_i (T - \\lambda_i I) = 0$（即 $T$ 被一个无重根的多项式零化）。'
      ].join('\n'),
      notes: '⭐ 最常用的判据是 **(3)/(4)**：$n$ 个线性无关的特征向量存在 $\\iff$ 可对角化。注意「特征值个数 $= n$」不够（重根要按重数算）。\n\n⭐ **(5)** 是最深刻的写法：它把「可对角化」翻译成**极小多项式无重根**（见「极小多项式整除特征多项式」）—— 这一条在谱定理与 Jordan 型的讨论里都要用。\n\n⚠ 判据依赖 $K$：$\\mathbb{R}$ 上的旋转没有实特征值，当然不可对角化；但它到 $\\mathbb{C}$ 上就有特征值 $\\pm i$ 且可对角化。所以「可对角化」永远相对于 $K$ 说。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6']
    },
    {
      id: 'def.minimal-poly',
      cluster: 'algebra.spectral',
      type: 'definition',
      label: '极小多项式',
      title: '极小多项式（算子的）$\\mu_T$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '谱', '多项式'],
      statement: [
        '设 $\\dim V < \\infty$，$T : V \\to V$。集合',
        '',
        '$$I_T := \\{\\, p \\in K[x] : p(T) = 0 \\,\\}$$',
        '',
        '是 $K[x]$ 的一个非零理想（由 Cayley–Hamilton，$\\chi_T \\in I_T$）。由于 $K[x]$ 是主理想整环，存在**唯一**的首一多项式 $\\mu_T$ 使 $I_T = (\\mu_T)$。',
        '',
        '$\\mu_T$ 叫 $T$ 的**极小多项式**。它是零化 $T$ 的**次数最低**的首一多项式（唯一）。',
        '',
        '⚠️ 与域论里的「代数元的极小多项式」（`def.minimal-poly-element`）区分：一个是零化算子的、一个是零化代数元的，形式上是一回事，名字要分开。'
      ].join('\n'),
      notes: '⭐ 极小多项式是**相似完全不变量**中最细的那一个（与特征多项式合起来）：Jordan 型完全由它们决定，而两个矩阵相似 $\\iff$ 它们有相同的**不变因子**（等价于相同的 Jordan 型）。\n\n⭐ $I_T$ 是理想这件事本身很重要：$p(T) = 0$、$q(T) = 0 \\implies (p + q)(T) = 0$，且 $r\\,p$ 也在里面 —— 于是 $T$ 在 $K[x]$ 上成了**模**（$x$ 作用 = $T$），后面 Jordan 型的证明全在这个模里做。\n\n⚠ 极小多项式与特征多项式的根**相同**（差一个重数）：两者都等于「$T$ 的特征值全体」。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6', 'Lang, Linear Algebra']
    },
    {
      id: 'thm.minimal-poly-divisor',
      cluster: 'algebra.spectral',
      type: 'theorem',
      label: '极小多项式整除特征多项式',
      title: '定理：$\\mu_T \\mid \\chi_T$，且两者同根',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '谱', '多项式'],
      statement: [
        '设 $\\dim V = n < \\infty$，$T : V \\to V$。则',
        '',
        '- $\\mu_T \\mid \\chi_T$（极小多项式整除特征多项式）；特别地 $\\deg \\mu_T \\le n$；',
        '- $\\mu_T$ 与 $\\chi_T$ 在 $K$ 的代数闭包中**有完全相同的根**（即相同的特征值集合）；',
        '- 因此 $T$ 可对角化（在代数闭包上看）$\\iff$ $\\mu_T$ 无重根。'
      ].join('\n'),
      notes: '⭐ 三条里的第一条是 Cayley–Hamilton + 理想性的直接后果：$\\chi_T \\in I_T = (\\mu_T)$。\n\n⭐ 第二条（同根）的证明值得记住：若 $\\lambda$ 是特征值、$v$ 是特征向量，则 $\\mu_T(T)v = \\mu_T(\\lambda) v$，而 $\\mu_T(T) = 0$、$v \\ne 0$，故 $\\mu_T(\\lambda) = 0$；反向由 $\\mu_T \\mid \\chi_T$ 得到。\n\n⚠ 第三个断言的「在代数闭包上看」不能省：$\\mu_T$ 是否无重根要到扩域里判（$\\mathbb{R}$ 上的旋转：$\\mu_T = x^{2} + 1$ 无重根，在 $\\mathbb{C}$ 上可对角化，在 $\\mathbb{R}$ 上不能）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 6']
    },
    {
      id: 'thm.primary-decomposition',
      cluster: 'algebra.spectral',
      type: 'theorem',
      label: '根子空间分解',
      title: '定理（主分解）：$V = \\bigoplus_i \\ker (T - \\lambda_i I)^{m_i}$',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '谱'],
      statement: [
        '设 $K$ **代数闭**，$T : V \\to V$，$\\dim V = n < \\infty$。设',
        '',
        '$$\\chi_T(x) = \\prod_{i=1}^{r} (x - \\lambda_i)^{m_i}$$',
        '',
        '（$\\lambda_i$ 互异、$m_i \\ge 1$）是特征多项式的分解。则',
        '',
        '- $V = \\bigoplus_{i=1}^{r} V_i$，其中 $V_i := \\ker (T - \\lambda_i I)^{m_i}$ 是**广义特征子空间**（也叫**根子空间**）；',
        '- $\\dim V_i = m_i$（代数重数），每个 $V_i$ 都是 $T$-不变的，且 $T|_{V_i}$ 只有一个特征值 $\\lambda_i$；',
        '- $E_{\\lambda_i} = \\ker(T - \\lambda_i I) \\subseteq V_i$ 是它里面的「$\\lambda_i$ 那一层」。'
      ].join('\n'),
      notes: '⭐ 这一步是 Jordan 分解的**第一半**：先把 $V$ 按特征值拆成 $r$ 块，每一块上只剩一个特征值。第二半是在每块里再把「$T - \\lambda_i I$ 的幂零程度」拆成小块（那就是 Jordan 块）。\n\n⭐ 它的代数版本：$V$ 是 $K[x]$-模，$\\chi_T$ 是它上面的「零化多项式」；由 $K[x]$ 的唯一分解，模按 $\\chi_T$ 的不可约因子拆开（**中国剩余定理**）—— 这就是「主分解」这个名字的来源。\n\n⚠ 要求 $K$ 代数闭：否则 $\\chi_T$ 分解不出一次因子，块也不按特征值分（要把「不可约因子」当成块）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 7', 'Lang, Algebra, Ch. XIV']
    },
    {
      id: 'thm.jordan-canonical-form',
      cluster: 'algebra.spectral',
      type: 'theorem',
      label: 'Jordan 标准形',
      title: '定理（Jordan）：代数闭域上的相似标准形',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '谱', '标准形'],
      statement: [
        '设 $K$ 代数闭、$T : V \\to V$，$\\dim V < \\infty$。则存在 $V$ 的一组基，使 $T$ 的矩阵是**分块对角**的',
        '',
        '$$J = \\begin{pmatrix} J_{1} & & \\\\ & \\ddots & \\\\ & & J_{s} \\end{pmatrix}, \\qquad J_{k} = \\begin{pmatrix} \\lambda_{k} & 1 & & \\\\ & \\ddots & \\ddots & \\\\ & & \\ddots & 1 \\\\ & & & \\lambda_{k} \\end{pmatrix}$$',
        '',
        '每个 $J_k$ 是形如 $\\lambda_k I + N_k$ 的**Jordan 块**（$N_k$ 是幂零的「上移位」矩阵）。',
        '',
        '等价说法：$T$ 可对角化 $\\iff$ 所有 Jordan 块都是 $1 \\times 1$。'
      ].join('\n'),
      notes: '⭐ 这是**有限维线性代数唯一的完整分类定理**：代数闭域上「相似」由 Jordan 型完全决定（块的大小与特征值的分布）。它同时给出了「相似不变量」的完整清单。\n\n⭐ 证明的两半：主分解（按特征值拆）＋ 在每个根子空间上对幂零算子 $N = T - \\lambda I$ 取「$\\ker N^{k}$ 的链」并逐层补基（这一步用 `def.quotient-vs` 与归纳）。\n\n⚠ 三个前提都在：**代数闭**（否则没有 $\\lambda$）、**有限维**（否则可能连特征值都没有）、**$K$ 是域**。$\\mathbb{R}$ 上只能用「实 Jordan 形」或改走有理标准型（`thm.rational-canonical-form`）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 7', 'Lang, Algebra, Ch. XIV']
    },
    {
      id: 'cor.jordan-uniqueness',
      cluster: 'algebra.spectral',
      type: 'corollary',
      label: 'Jordan 型的唯一性',
      title: '推论：Jordan 型在块的排列之外唯一',
      regions: ['algebra'],
      tags: ['推论', '线性代数', '谱', '标准形'],
      statement: [
        'Jordan 标准形在「Jordan 块的排列顺序」之外是**唯一**的，即 $A \\sim B$ 当且仅当 $A$ 与 $B$ 有相同的 Jordan 型（不计块的次序）：',
        '',
        '$$A \\sim B \\iff \\mu_A(\\lambda) = \\mu_B(\\lambda) \\ \\ (\\forall \\lambda)$$',
        '',
        '更定量地：对每个特征值 $\\lambda$，Jordan 块的**尺寸**构成一个分拆 $\\mu(\\lambda)$；两个矩阵相似当且仅当对每个 $\\lambda$ 都有 $\\mu_A(\\lambda) = \\mu_B(\\lambda)$。'
      ].join('\n'),
      notes: '⭐ 唯一性的实用形式：**块的个数 = 几何重数**（$\\dim E_\\lambda$）、**块的最大尺寸 = $\\lambda$ 在极小多项式里的次数**、**尺寸之和 = 代数重数**。于是「相似分类」被压缩成一组整数的分拆数据。\n\n⭐ 由此得到一条漂亮的推论：$A$ 幂零（$A^{k} = 0$ 对某 $k$）$\\iff$ 它的特征值只有 $0$ $\\iff$ 它的特征多项式是 $x^{n}$。\n\n⚠ 「不计块的次序」是必须的：Jordan 形是按特征值与块的排列写的，重排块给出同一个算子的另一种写法（换个基而已）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 7']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.linearmap-invariant',
      kind: 'definition',
      definition: 'def.linear-map',
      usedBy: 'def.invariant-subspace',
      note: '不变性说的是 $T(U) \\subseteq U$，用到的只有 $T$ 是映射这一点。'
    },
    {
      id: 'dep.invariant-eigenvalue',
      kind: 'definition',
      definition: 'def.invariant-subspace',
      usedBy: 'def.eigenvalue',
      note: '特征向量等价于「一维的不变子空间」：$T(\\langle v \\rangle) \\subseteq \\langle v \\rangle$ 且 $v \\ne 0$。'
    },
    {
      id: 'dep.determinant-charpoly',
      kind: 'definition',
      definition: 'def.determinant',
      usedBy: 'def.char-poly',
      note: '特征多项式就是 $\\det(xI - A)$ —— 行列式在这里第一次被用到「变量是矩阵」的场合。'
    },
    {
      id: 'dep.polyring-charpoly',
      kind: 'definition',
      definition: 'def.polynomial-ring',
      usedBy: 'def.char-poly',
      note: '$\\det(xI - A)$ 的结果落在 $K[x]$ 里，是多项式环的元素。'
    },
    {
      id: 'dep.charpoly-trace',
      kind: 'definition',
      definition: 'def.char-poly',
      usedBy: 'def.trace',
      note: '迹是特征多项式 $x^{n-1}$ 的系数（差个符号）—— 两条边互为解释，这条说的是「迹由特征多项式定义」。'
    },
    {
      id: 'dep.changeofbasis-similarity',
      kind: 'definition',
      definition: 'thm.change-of-basis',
      usedBy: 'def.similarity',
      note: '相似的定义 $B = P^{-1}AP$ 就是「换基公式」写成矩阵的样子。'
    },
    {
      id: 'dep.charpoly-minimal',
      kind: 'definition',
      definition: 'def.char-poly',
      usedBy: 'def.minimal-poly',
      note: '极小多项式的集合 $I_T$ 非空，靠的是 Cayley–Hamilton（即 $\\chi_T \\in I_T$）。'
    },
    {
      id: 'dep.minimal-primary',
      kind: 'definition',
      definition: 'def.minimal-poly',
      usedBy: 'thm.primary-decomposition',
      note: '主分解的代数版本里，「$\\chi_T$ 的因子」与「极小多项式」是同一套理想论的产物。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.cayley-hamilton',
      kind: 'implication',
      sources: ['def.char-poly', 'prop.det-laplace'],
      target: 'thm.cayley-hamilton',
      title: '特征多项式 + 伴随矩阵 $\\implies$ Cayley–Hamilton',
      proof: [
        '记 $A \\in M_n(K)$，考虑**多项式矩阵** $B(x) := xI - A \\in M_n(K[x])$，以及它的伴随矩阵',
        '',
        '$$\\operatorname{adj} B(x) = \\bigl( C_{ji}(x) \\bigr), \\qquad \\deg C_{ji} \\le n - 1$$',
        '',
        '1. 由伴随矩阵的基本等式（见「Laplace 展开」）$B(x) \\operatorname{adj} B(x) = \\det B(x)\\, I = \\chi_A(x)\\, I$。',
        '2. 把 $\\operatorname{adj} B(x)$ 按 $x$ 的幂展开：$\\operatorname{adj} B(x) = \\sum_{k=0}^{n-1} B_k\\, x^{k}$（$B_k \\in M_n(K)$）。代入第 1 步并比较 $x$ 的各次系数，得到一串矩阵等式',
        '',
        '$$B_0 = -A B_0, \\qquad B_k = -A B_k + B_{k-1}, \\qquad \\cdots$$',
        '3. 把第 $k$ 个等式左乘 $A^{k}$ 并全部相加 —— 中间项**全部相消**，只剩',
        '',
        '$$0 = A^{n} + c_{n-1}A^{n-1} + \\cdots + c_0 I = \\chi_A(A)$$',
        '',
        '（其中 $\\chi_A(x) = x^{n} + c_{n-1}x^{n-1} + \\cdots + c_0$。）∎',
        '',
        '一般算子 $T$ 的情形：取一组基把它写成 $A$，把上式翻译回算子语言即可。'
      ].join('\n'),
      note: '第 3 步「中间项全部相消」是全部技巧：那一串等式被设计成望远镜式（$A^{k} B_k - A^{k+1}B_{k-1}$ 型），所以相加之后只剩两头。'
    },
    {
      id: 'imp.diagonalizable',
      kind: 'implication',
      sources: ['def.eigenvalue', 'def.invariant-subspace', 'thm.minimal-poly-divisor'],
      target: 'thm.diagonalizable',
      title: '特征子空间 + 极小多项式 $\\implies$ 可对角化判据',
      proof: [
        '记 $n = \\dim V$、$\\lambda_1, \\ldots, \\lambda_m$ 为（$K$ 中）互异特征值。',
        '',
        '**(1) $\\implies$ (2)**：若 $T$ 在某组基下是对角阵 $\\operatorname{diag}(\\lambda_{i_1}, \\ldots)$，则每个基向量都是特征向量，于是这组基（共 $n$ 个）落在 $\\bigcup_i E_{\\lambda_i}$ 中；又不同特征值的特征子空间之和是直和，故 $V = \\bigoplus_i E_{\\lambda_i}$。',
        '',
        '**(2) $\\implies$ (3)**：取维数即得 $\\sum_i \\dim E_{\\lambda_i} = n$。',
        '',
        '**(3) $\\implies$ (1)**：在每个 $E_{\\lambda_i}$ 里取一组基（共 $\\sum_i \\dim E_{\\lambda_i} = n$ 个向量）。它们线性无关（直和），故是 $V$ 的基；在这组基下 $T$ 是对角阵。',
        '',
        '**(4) $\\iff$ (3)**：恒有 $\\dim E_{\\lambda} \\le m_\\lambda$（代数重数）与 $\\sum_\\lambda m_\\lambda = n$。于是「和 $= n$」等价于「每个都取等号」，即几何重数 $=$ 代数重数。',
        '',
        '**(5) $\\implies$ (4)**：设 $\\prod_i (T - \\lambda_i I) = 0$ 且 $\\lambda_i$ 互异，则 $\\mu_T \\mid \\prod_i (x - \\lambda_i)$，故 $\\mu_T$ 无重根。“无重根”意味着极小多项式在每个特征值处的重数为 1，结合 $\\mu_T$ 与 $\\chi_T$ 同根、且代数重数 $\\ge$ 几何重数 $\\ge 1$，逐块比较即得几何重数 $=$ 代数重数。',
        '',
        '**(1) $\\implies$ (5)**：可对角化时 $\\mu_T = \\prod_i (x - \\lambda_i)$（互异的一次因子之积），代入 $T$ 得零。∎'
      ].join('\n'),
      note: '证明里真正有内容的是 **(4) $\\iff$ (3)**（几何重数 vs 代数重数）与最后一对（**(5) 是无重根判据**）。前三条只是把「对角化」翻译成「有 $n$ 个无关特征向量」。'
    },
    {
      id: 'imp.minimal-poly-divisor',
      kind: 'implication',
      sources: ['thm.cayley-hamilton', 'def.minimal-poly'],
      target: 'thm.minimal-poly-divisor',
      title: 'Cayley–Hamilton $\\implies \\mu_T \\mid \\chi_T$ 且同根',
      proof: [
        '1. **整除**：由 Cayley–Hamilton，$\\chi_T(T) = 0$，即 $\\chi_T \\in I_T = (\\mu_T)$，故 $\\mu_T \\mid \\chi_T$。由此 $\\deg \\mu_T \\le \\deg \\chi_T = n$。',
        '2. **$\\chi_T$ 的根都是 $\\mu_T$ 的根**：由第 1 步与「$\\mu_T$ 非零」得 $\\mu_T \\mid \\chi_T$，故 $\\chi_T$ 的每个根也是 $\\mu_T$ 的根。',
        '3. **$\\mu_T$ 的根都是 $\\chi_T$ 的根**：设 $\\mu_T(\\lambda) = 0$。由 $\\mu_T \\ne 0$ 且 $\\mu_T \\mid \\chi_T$，把 $\\mu_T$ 在 $K$ 的代数闭包中分解为 $\\prod (x - \\lambda_j)^{e_j}$；对每个 $j$ 取非零向量 $v_j \\in \\ker(T - \\lambda_j I)^{e_j}$（由第 4 步非零），则 $v := v_j$ 满足 $\\mu_T(T) v = 0$。若 $\\lambda_j$ 不是特征值，则 $T - \\lambda_j I$ 可逆，于是 $(T - \\lambda_j I)^{e_j}$ 可逆，$\\ker = \\{0\\}$，矛盾。故每个 $\\lambda_j$ 都是特征值，即 $\\chi_T(\\lambda_j) = 0$。',
        '4. **每个 $\\ker (T - \\lambda_j I)^{e_j} \\ne \\{0\\}$**：若全为零，则 $\\mu_T$ 的每个因子都可逆、乘积可逆，而 $\\mu_T(T) = 0$ 与可逆性矛盾（$n \\ge 1$ 时 $V \\ne 0$）。',
        '',
        '于是两者的根集合相同。∎'
      ].join('\n'),
      note: '第 3、4 步合起来是一个**双向夹逼**：既要说明 $\\mu_T$ 的根一定是特征值，也要先证明那些核非零 —— 后者看起来显然，其实是「$\\mu_T(T) = 0$ 而 $T$ 非平凡」的推论。'
    },
    {
      id: 'imp.primary-decomposition',
      kind: 'implication',
      sources: ['thm.poly-ufd', 'def.minimal-poly', 'prop.root-bound'],
      target: 'thm.primary-decomposition',
      title: '唯一分解 + 极小多项式 $\\implies$ 根子空间分解',
      proof: [
        '设 $K$ 代数闭、$\\chi_T = \\prod_{i=1}^{r}(x - \\lambda_i)^{m_i}$，$\\lambda_i$ 互异。',
        '',
        '1. **把 $V$ 看成 $K[x]$-模**：令 $x \\cdot v := T(v)$。模的公理就是 $T$ 的线性性 + $T^{0} = I$，逐步验证即可。于是 $\\chi_T \\cdot V = 0$。',
        '2. **中国剩余定理**：$\\chi_T = \\prod_i (x - \\lambda_i)^{m_i}$ 中诸因子两两互素（互异一次因子的幂），故',
        '',
        '$$K[x]/(\\chi_T) \\;\\cong\\; \\prod_i K[x]/((x - \\lambda_i)^{m_i})$$',
        '3. **翻译回 $V$**：对每个 $i$ 令 $V_i := \\ker (T - \\lambda_i I)^{m_i}$。由互素性可取多项式 $u_i$ 使 $\\sum_i u_i \\cdot \\frac{\\chi_T}{(x-\\lambda_i)^{m_i}} = 1$（Bézout），作用到 $v \\in V$ 上给出分解 $v = \\sum_i v_i$，$v_i \\in V_i$。直和性由「不同因子的核之交为零」得到。',
        '4. **维数**：$V_i$ 是 $T$-不变的，且 $T|_{V_i}$ 只有一个特征值 $\\lambda_i$，故 $\\chi_{T|_{V_i}} = (x - \\lambda_i)^{\\dim V_i}$；两边取乘积并与 $\\chi_T$ 比较，得 $\\dim V_i = m_i$。',
        '5. **$E_{\\lambda_i} \\subseteq V_i$**：$\\ker(T - \\lambda_i I) \\subseteq \\ker (T - \\lambda_i I)^{m_i}$ 显然。∎'
      ].join('\n'),
      note: '第 1 步（把 $V$ 变成 $K[x]$-模）是整条链的枢纽：一旦成为模，「按不可约因子拆」就自动由 **$K[x]$ 是唯一分解整环 + Bézout** 提供，不必再在向量空间里手搓。'
    },
    {
      id: 'imp.jordan-canonical-form',
      kind: 'implication',
      sources: ['thm.primary-decomposition', 'thm.factor-theorem'],
      target: 'thm.jordan-canonical-form',
      title: '根子空间分解 + 幂零块 $\\implies$ Jordan 标准形',
      proof: [
        '1. 由主分解，$V = \\bigoplus_i V_i$，每个 $V_i$ 是 $T$-不变的，且 $T|_{V_i} = \\lambda_i I + N_i$，其中',
        '',
        '$$N_i := (T - \\lambda_i I)|_{V_i}$$',
        '',
        '是**幂零**的（因为 $V_i = \\ker (T - \\lambda_i I)^{m_i}$）。只要在每个 $V_i$ 上把幂零算子化成标准形，拼起来就是 Jordan 形。',
        '2. **幂零算子的标准形**：设 $N$ 在有限维空间 $W$ 上幂零。对 $k = 1, 2, \\ldots$ 有链',
        '',
        '$$\\{0\\} \\subseteq \\ker N \\subseteq \\ker N^{2} \\subseteq \\cdots \\subseteq \\ker N^{s} = W$$',
        '',
        '归纳地：从最后一层 $\\ker N^{s}$ 里取一组基，映到商 $\\ker N^{s}/\\ker N^{s-1}$ 上；在商里按同样办法取基并拉回，逐层拼出一组基，使 $N$ 在其中表现为若干「上移位」块 $N_k$（对角线为 $0$、上对角为 $1$）。',
        '3. **拼装**：把每个 $V_i$ 里得到的基拼成 $V$ 的基。在这组基下 $T$ 的矩阵：在第 $i$ 块上是 $\\lambda_i I + N_i$，即若干 Jordan 块之并，各块的特征值为 $\\lambda_i$。',
        '',
        '$T$ 可对角化 $\\iff$ 每个 $N_i = 0$ $\\iff$ 每个 $V_i = E_{\\lambda_i}$ $\\iff$ 所有块是 $1 \\times 1$。∎'
      ].join('\n'),
      note: '第 2 步（幂零算子的分层取基）是整条定理唯一的**构造性**部分；其余两半都是「把已知分解拼起来」。这也解释了为什么 Jordan 型的计算本质上只是「求若干核链」。'
    },
    {
      id: 'imp.jordan-uniqueness',
      kind: 'implication',
      sources: ['thm.jordan-canonical-form', 'def.similarity'],
      target: 'cor.jordan-uniqueness',
      title: 'Jordan 形 $\\implies$ 相似分类',
      proof: [
        'Jordan 形是由「$V$ 的一组基」给出的，所以每个算子都有一个 Jordan 形 —— 剩下的问题是唯一性。',
        '',
        '1. **不变量**：Jordan 形只依赖算子的相似类，因为它是用「核链的维数」造出来的。具体地，对每个特征值 $\\lambda$ 与每个 $k$，',
        '',
        '$$\\dim \\ker (T - \\lambda I)^{k}$$',
        '',
        '是相似不变量（由 $T$ 本身决定，与基无关），而「尺寸 $\\ge k$ 的 Jordan 块个数」正好等于 $\\dim \\ker(T - \\lambda I)^{k} - \\dim \\ker (T - \\lambda I)^{k-1}$。',
        '2. **唯一性**：由第 1 步，Jordan 块的尺寸分布 $\\mu(\\lambda)$ 完全由这些核的维数决定，因此不依赖基的选取；反过来，若两个算子有相同的 $\\mu(\\lambda)$（对一切 $\\lambda$），则它们可以配成同一个 Jordan 型的两个写本，从而是同一个算子在两组基下的矩阵，即相似。∎'
      ].join('\n'),
      note: '证明的思路是「**先造一个不变量，再证明它把类分完**」—— 这也是所有分类定理的标准套路（与「基的势是唯一的」那条如出一辙）。'
    }
  ]
});
