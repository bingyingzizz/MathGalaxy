/* ==========================================================================
   内容包 · 线性代数 ③：矩阵与行列式
   --------------------------------------------------------------------------
   新星团 `algebra.matrix`（16 点）。这一包的两条主线：

     ① **矩阵不是新东西**：它就是线性映射在选定基下的坐标账本（`thm.matrix-linear-map`）。
        换基 → 相似（`thm.change-of-basis`）；初等变换 → 秩不变（`thm.rank-row-col`）。
     ② **行列式不是「余子式展开」**：它是**唯一**的交错多重线性规范函数
        （`thm.det-exists-unique`），余子式展开（Laplace）只是它的一条计算性质。

   ⭐ 这一包结束时，线性代数的第一部分（抽象语言）与第二部分（具体计算）在图上合流。
   ⚠️ 「可逆 ⟺ det ≠ 0 ⟺ 满秩」这一条写在 `def.invertible-matrix` 的 notes 里
      （不另开节点，保持本批 16 点的口径）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数：矩阵与行列式',
  nodes: [

    {
      id: 'def.matrix',
      cluster: 'algebra.matrix',
      type: 'definition',
      label: '矩阵',
      title: '矩阵（Matrix）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $K$ 是域，$m, n \\ge 1$。一个 $m \\times n$ 的**矩阵**是 $K$ 中元素排成的长方形阵列',
        '',
        '$$A = (a_{ij}) = \\begin{pmatrix} a_{11} & \\cdots & a_{1n} \\\\ \\vdots & & \\vdots \\\\ a_{m1} & \\cdots & a_{mn} \\end{pmatrix}, \\qquad a_{ij} \\in K$$',
        '',
        '（$i$ 是行指标、$j$ 是列指标，都从 $1$ 数起。）全体 $m \\times n$ 矩阵记 $M_{m \\times n}(K)$，方阵记 $M_n(K) := M_{n \\times n}(K)$。',
        '',
        '$A$ 的第 $j$ **列**是 $K^{m}$ 中的列向量，第 $i$ **行**是 $K^{n}$ 中的行向量。'
      ].join('\n'),
      notes: '⭐ 矩阵就是「按行列排好的一堆 $K$ 中元素」—— **本身不含任何数学结构**，它的意义全部来自你怎么读它（读成线性映射的账本、读成方程组的系数、读成双线性型的配方）。\n\n⚠ 两套下标约定（$a_{ij}$ 是第 $i$ 行第 $j$ 列）必须前后一致，否则转置与乘法会全错。本图一律「先行后列」。\n\n⭐ $M_{m \\times n}(K)$ 作为集合就是 $K^{mn}$ —— 所以它当然是 $K$-向量空间（逐分量运算）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 1', 'Lang, Linear Algebra']
    },
    {
      id: 'def.matrix-operations',
      cluster: 'algebra.matrix',
      type: 'definition',
      label: '矩阵的加法与乘法',
      title: '矩阵的加法、数乘与乘法',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $A = (a_{ij})$、$B = (b_{ij})$ 同型（都是 $m \\times n$）。',
        '',
        '**加法与数乘**（逐分量）：',
        '',
        '$$(A + B)_{ij} := a_{ij} + b_{ij}, \\qquad (cA)_{ij} := c\\,a_{ij}$$',
        '',
        '**乘法**：设 $A \\in M_{m \\times n}(K)$、$B \\in M_{n \\times p}(K)$，则 $AB \\in M_{m \\times p}(K)$ 定义为',
        '',
        '$$(AB)_{ij} := \\sum_{k=1}^{n} a_{ik} b_{kj}$$',
        '',
        '（$A$ 的列数必须等于 $B$ 的行数，否则不定义。）'
      ].join('\n'),
      notes: '⭐ 乘法为什么长这样：把 $B$ 的每一列看成 $K^{n}$ 中的向量，则 $AB$ 的第 $j$ 列 $= A \\cdot (B$ 的第 $j$ 列$)$ —— **矩阵乘法就是线性映射的复合**（见「线性映射 $\\leftrightarrow$ 矩阵」）。不是「行列逐条相乘」的偶然配方。\n\n⚠ 乘法**不交换**：$AB \\ne BA$（连形状都可能不合）。例 $A = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$、$B = \\begin{pmatrix} 0 & 0 \\\\ 1 & 0 \\end{pmatrix}$ 给 $AB = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix} \\ne BA$。\n\n⚠ $AB = 0$ 不必有 $A = 0$ 或 $B = 0$ —— 这就是「$M_n(K)$ 是环但不是整环」的意思，也解释了行列式为什么必要（det 把这件事管住了）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 1']
    },
    {
      id: 'thm.matrix-ring',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: 'M_n(K) 是环',
      title: '定理：$M_n(K)$ 是环，对加法构成 $K$-向量空间',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '环'],
      statement: [
        '在 $M_n(K)$ 上定义逐分量加法与矩阵乘法。则',
        '',
        '- $(M_n(K), +)$ 是阿贝尔群（零元是零矩阵）；',
        '- 乘法结合、对加法双向分配、有单位元 $I_n$（对角为 $1$、其余为 $0$）；',
        '- 于是 $M_n(K)$ 是**环**，而且是 $K$-代数（加法与数乘使它成为 $K$-向量空间，乘法与之相容）。',
        '',
        '⚠ 乘法**不交换**（$n \\ge 2$ 时），所以它是非交换环。'
      ].join('\n'),
      notes: '⭐ 这条定理的每一句都是「把 $M_n(K)$ 当成 $\\operatorname{End}(K^{n})$ 来读」的结果：矩阵的加法是映射的加法、乘法是复合、单位元是恒等映射（都在「线性映射 $\\leftrightarrow$ 矩阵」那一条里证过）。\n\n⭐ 于是 $M_n(K)$ 成为一个**环**，可以问它的理想、可逆元（$\\operatorname{GL}_n(K)$）、单侧逆等等 —— 抽象代数那一侧的工具直接搬过来用。\n\n⚠ 「非交换」是本质的：矩阵环是最典型的非交换环，也是有限维代数的原型（Wedderburn 定理说的就是「单的有限维代数都是 $M_n(D)$」）。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 1']
    },
    {
      id: 'thm.matrix-linear-map',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: '线性映射 ⟷ 矩阵',
      title: '定理：选定基后，线性映射与矩阵一一对应',
      regions: ['algebra'],
      tags: ['定理', '线性代数'],
      statement: [
        '设 $V$ 有有序基 $\\mathcal{B} = (v_1, \\ldots, v_n)$、$W$ 有有序基 $\\mathcal{C} = (w_1, \\ldots, w_m)$，都是有限维 $K$-向量空间。称 $m \\times n$ 矩阵 $[T]_{\\mathcal{B}}^{\\mathcal{C}}$ 为 $T$ 在这两组基下的**矩阵**，其中第 $j$ 列是 $T(v_j)$ 在 $\\mathcal{C}$ 下的坐标。',
        '',
        '于是映射 $T \\mapsto [T]_{\\mathcal{B}}^{\\mathcal{C}}$ 是 $K$-向量空间的同构',
        '',
        '$$\\operatorname{Hom}_K(V, W) \\;\\cong\\; M_{m \\times n}(K)$$',
        '',
        '并且**复合对应乘法**：若 $T : V \\to W$、$S : W \\to U$，则',
        '',
        '$$[S \\circ T]_{\\mathcal{B}}^{\\mathcal{E}} = [S]_{\\mathcal{C}}^{\\mathcal{E}}\\; [T]_{\\mathcal{B}}^{\\mathcal{C}}$$'
      ].join('\n'),
      notes: '⭐ 这就是整套矩阵论的**出生证**：矩阵不是被定义出来的对象，而是线性映射在选定基下的**坐标**（与「坐标」那一条完全同一个机制，只是两侧各选一组基）。\n\n⭐ 于是所有矩阵运算都有了意义：加法 = 映射的和、乘法 = 复合、单位矩阵 = 恒等映射、可逆 = 同构。**矩阵的每一个公式都可以翻译成映射的语言**，反之亦然 —— 这是本图把两者分团又用边连起来的原因。\n\n⚠ 这一切都**依赖基的选取**：换一组基，矩阵就变了（变成相似的，见「基变换」）。而线性映射本身不变。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 3', 'Lang, Linear Algebra']
    },
    {
      id: 'thm.change-of-basis',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: '基变换与相似',
      title: '定理：换基给出相似矩阵',
      regions: ['algebra'],
      tags: ['定理', '线性代数'],
      statement: [
        '设 $T : V \\to V$ 线性，$\\mathcal{B}, \\mathcal{B}\'$ 是 $V$ 的两组有序基。记 $P := [\\mathrm{id}]_{\\mathcal{B}\'}^{\\mathcal{B}}$（**过渡矩阵**，第 $j$ 列是 $\\mathcal{B}\'$ 的第 $j$ 个向量在 $\\mathcal{B}$ 下的坐标）。则 $P$ 可逆，且',
        '',
        '$$[T]_{\\mathcal{B}\'} = P^{-1}\\,[T]_{\\mathcal{B}}\\,P$$',
        '',
        '此时称两个矩阵**相似**（记 $A \\sim B$）。相似是一个等价关系。'
      ].join('\n'),
      notes: '⭐ 一句话：**换基就是共轭**。$P^{-1}AP$ 里的 $P$ 管「坐标怎么换」，而两侧一进一出正好把基的选取抹掉 —— 所以「相似」是矩阵的**内在**性质（属于那个线性映射），而不是基质自身的性质。\n\n⭐ 值得记住的分工：$A$ 与 $B$ 相似 $\\iff$ 它们是**同一个**线性映射在两组基下的矩阵；$A$ 与 $B$ 等价（只要求 $B = PAQ$，$P, Q$ 可逆）$\\iff$ 它们秩相等（连空间都可以换）。\n\n⚠ 相似比等价严得多：相似的矩阵**秩相同、迹相同、行列式相同、特征多项式相同** —— 这些都是相似不变量（后面特征值那一团要用）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 4']
    },
    {
      id: 'def.elementary-matrix',
      cluster: 'algebra.matrix',
      type: 'definition',
      label: '初等变换与初等矩阵',
      title: '初等变换与初等矩阵（Elementary Matrices）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '**初等行变换**指下列三种操作：',
        '',
        '- 把第 $i$ 行与第 $j$ 行**互换**；',
        '- 把第 $i$ 行乘以非零常数 $c$；',
        '- 把第 $j$ 行的 $c$ 倍**加到**第 $i$ 行上。',
        '',
        '对单位矩阵 $I_n$ 做一次上述操作得到的矩阵叫**初等矩阵**（记 $E$）。关键性质是：**对 $A$ 做一次初等行变换，等于在左边乘上相应的初等矩阵**，即把 $A$ 换成 $EA$。',
        '',
        '每个初等矩阵都**可逆**，且逆仍是初等矩阵（同类型的）：互换的逆是自己、乘 $c$ 的逆是乘 $c^{-1}$、加 $c$ 倍的逆是加 $-c$ 倍。'
      ].join('\n'),
      notes: '⭐ 「左乘 = 行变换」这条对应关系把**操作**变成了**对象**：于是「用消元法解方程组」就是「在左边乘一串初等矩阵」，可以写成等式 $E_k \\cdots E_1 A = R$（$R$ 是行简化阶梯形）。\n\n⭐ 最重要的一条推论：$A$ **可逆当且仅当它是有限多个初等矩阵之积**（消元法把 $A$ 化成 $I_n$，把这一串操作记录下来就是 $A^{-1}$ 的显式分解）。这也是「算逆矩阵」那套 $[A \\mid I] \\to [I \\mid A^{-1}]$ 手法的道理。\n\n⚠ 初等**列**变换对应的是**右乘**。行列混着做就成了等价变换（$A \\mapsto PAQ$），它保持秩但不保持相似。',

      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 1']
    },
    {
      id: 'thm.rank-row-col',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: '行秩 = 列秩',
      title: '定理：行秩等于列秩，都等于矩阵的秩',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '秩'],
      statement: [
        '设 $A \\in M_{m \\times n}(K)$。把 $A$ 的 $m$ 个行向量看成 $K^{n}$ 中的向量，其张成的子空间的维数叫**行秩**；同理定义**列秩**（$A$ 的 $n$ 个列向量在 $K^{m}$ 中张成的维数）。则',
        '',
        '行秩 $=$ 列秩 $= \\operatorname{rank} A$，即',
        '',
        '$$\\operatorname{rank}_{\\text{row}} A = \\operatorname{rank}_{\\text{col}} A = \\operatorname{rank} A$$',
        '',
        '其中 $\\operatorname{rank} A$ 是线性映射 $x \\mapsto Ax$ 的秩（见「秩」）。'
      ].join('\n'),
      notes: '⭐ 「行秩 = 列秩」不是显然的：它说的是 $K^{n}$ 里那 $m$ 个行向量与 $K^{m}$ 里那 $n$ 个列向量**恰好一样独立**，而这恰是「矩阵的秩」这个数**只有一个**的根源。\n\n⭐ 证明走初等变换：左乘可逆矩阵不改变行空间（只换基），于是可以先把 $A$ 化成行简化阶梯形，其中非零行的个数就是秩 —— 而列秩也被同一批主元决定了。\n\n⚠ 它是「用消元法算秩」的合法性依据：把一列列的运算搬来搬去，那个数不会变。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 4']
    },
    {
      id: 'thm.linear-system-solutions',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: '线性方程组的解结构',
      title: '定理：线性方程组的解结构',
      regions: ['algebra'],
      tags: ['定理', '线性代数'],
      statement: [
        '设 $A \\in M_{m \\times n}(K)$、$b \\in K^{m}$，考虑方程组 $Ax = b$。',
        '',
        '- **有解** $\\iff$ $\\operatorname{rank} A = \\operatorname{rank}(A \\mid b)$（把 $b$ 添成第 $n+1$ 列）；',
        '- 有解时，解集是**仿射子空间**',
        '',
        '$$x_0 + \\ker A = \\{\\, x_0 + u : u \\in \\ker A \\,\\}$$',
        '',
        '其中 $x_0$ 是任一特解；于是解空间的维数是 $n - \\operatorname{rank} A$；',
        '- 齐次方程组 $Ax = 0$ 的解空间就是 $\\ker A$，维数 $= n - \\operatorname{rank} A$；',
        '- 特别地：$m = n$ 且 $\\det A \\ne 0$ 时解**唯一**，$x = A^{-1}b$。'
      ].join('\n'),
      notes: '⭐ 「解集 = 特解 + 齐次解」是线性代数的中心图景：**非齐次没有结构，齐次才有**（它是子空间），非齐次只是它的一个平移（仿射子空间）。\n\n⭐ 维数公式 $n - \\operatorname{rank} A$ 就是秩-零化度定理的方程组版本：变量数 $n$ = 约束掉的 $\\operatorname{rank} A$ + 自由的 $\\dim \\ker A$。\n\n⚠ 「有解 $\\iff$ $\\operatorname{rank} A = \\operatorname{rank}(A \\mid b)$」的几何意思：$b$ 落在 $A$ 的列空间里。别把它误记成「rank A = m」（那是有解**且解唯一**的条件）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 1', 'Lang, Linear Algebra']
    },
    {
      id: 'def.invertible-matrix',
      cluster: 'algebra.matrix',
      type: 'definition',
      label: '可逆矩阵',
      title: '可逆矩阵与 $\\operatorname{GL}_n(K)$',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '方阵 $A \\in M_n(K)$ 叫**可逆**，当且仅当存在 $B \\in M_n(K)$ 使',
        '',
        '$$AB = BA = I_n$$',
        '',
        '此时 $B$ 唯一，记 $A^{-1}$。全体可逆 $n$ 阶矩阵在乘法下构成群，记',
        '',
        '$$\\operatorname{GL}_n(K) := \\{\\, A \\in M_n(K) : A \\text{ is invertible} \\,\\}$$',
        '',
        '叫**一般线性群**。'
      ].join('\n'),
      notes: '⭐ 一条把三个团串起来的等价表：对 $A \\in M_n(K)$，下列命题等价 ——\n- $A$ 可逆；\n- 线性映射 $x \\mapsto Ax$ 是双射（即同构）；\n- $\\operatorname{rank} A = n$（满秩）；\n- $\\ker A = \\{0\\}$（零化度为 $0$）；\n- $A$ 的列向量线性无关（从而是一组基）；\n- $\\det A \\ne 0$；\n- $A$ 可以写成有限多个初等矩阵之积。\n\n⚠ **有限维特有**：只有 $\\dim V < \\infty$ 时「单 $\\iff$ 满 $\\iff$ 可逆」才成立（无限维的单射移位算子可逆吗？不）。\n\n⭐ $\\operatorname{GL}_n(K)$ 是矩阵环 $M_n(K)$ 的**单位群**，也是代数群的原型（它是 $K^{n^{2}}$ 里的一个由多项式方程 $\\det A \\cdot \\det A^{-1} = 1$ 切出来的对象）—— 这一条与代数几何、李群都接得上。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 1']
    },
    {
      id: 'def.multilinear-form',
      cluster: 'algebra.matrix',
      type: 'definition',
      label: '多重线性型',
      title: '多重线性型 $V^{n} \\to K$（Multilinear Form）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $V$ 是 $K$-向量空间。映射 $f : V^{n} := V \\times \\cdots \\times V \\to K$ 叫 **$n$ 重线性型**，当且仅当固定任意 $n - 1$ 个变元后，剩下的那个变元是线性的：对每个 $i$，',
        '',
        '$$f(\\ldots, v_i + c\\,w_i, \\ldots) = f(\\ldots, v_i, \\ldots) + c\\, f(\\ldots, w_i, \\ldots)$$',
        '',
        '全体 $n$ 重线性型记 $\\operatorname{Mult}_n(V; K)$，它按逐点运算成为 $K$-向量空间。',
        '',
        '$n = 2$ 时叫**双线性型**；固定一组基后，$n$ 重线性型与「$n$ 维数组 $(f(e_{i_1}, \\ldots, e_{i_n}))$」一一对应。'
      ].join('\n'),
      notes: '⭐ 注意事项的顺序：「对每个变元分别线性」比「整体线性」**弱**得多 —— $f(x, y) = xy$ 对每个变元都线性，但它不是 $\\mathbb{R}^{2} \\to \\mathbb{R}$ 的线性映射（$f(x + x\', y + y\') \\ne f(x,y) + f(x\',y\')$ 一般成立）。**多重线性 $\\ne$ 线性。**\n\n⭐ 它是「张量积」的来源：$n$ 重线性型就是 $V^{\\otimes n}$ 上的线性泛函（见「张量积的万有性质」）。\n\n⭐ 行列式就是 $n = \\dim V$ 时最特殊的那一个多重线性型（再加上交错与规范化两条）。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 5']
    },
    {
      id: 'def.alternating-form',
      cluster: 'algebra.matrix',
      type: 'definition',
      label: '交错型',
      title: '交错型（Alternating Form）与对称型',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $f : V^{n} \\to K$ 是多重线性型。',
        '',
        '- $f$ 叫**对称的**，当且仅当对任意置换 $\\sigma$ 有 $f(v_{\\sigma(1)}, \\ldots, v_{\\sigma(n)}) = f(v_1, \\ldots, v_n)$；',
        '- $f$ 叫**交错的**，当且仅当任有两个变元相等时 $f = 0$；',
        '- $f$ 叫**反称的**，当且仅当 $f(v_{\\sigma(1)}, \\ldots) = \\operatorname{sgn}(\\sigma)\\, f(v_1, \\ldots)$。',
        '',
        '在域的特征 $\\ne 2$ 时，**交错 $\\iff$ 反称**。'
      ].join('\n'),
      notes: '⭐ 「交错」的判据（两个变元相等则取零）用起来最省事，「反称」的公式（带符号）算起来最方便 —— 两者在 $\\operatorname{char} K \\ne 2$ 时等价。\n\n⚠ $\\operatorname{char} K = 2$ 时不等价：此时 $-1 = 1$，反称型自动对称，交错性是更强的条件。本图默认 $\\operatorname{char} K = 0$ 或至少 $\\ne 2$（$\\mathbb{R}, \\mathbb{C}, \\mathbb{Q}$ 都满足）。\n\n⭐ 交错性是行列式之所以为行列式的**核心性质**：交换两行变号（$\\operatorname{sgn}(\\sigma)$）、两行相同则为零。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 5']
    },
    {
      id: 'thm.det-exists-unique',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: '行列式的存在唯一性',
      title: '定理：交错 $n$ 重线性规范函数存在且唯一',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '行列式'],
      statement: [
        '设 $\\dim_K V = n$。则存在**唯一**的函数',
        '',
        '$$D : V^{n} \\longrightarrow K$$',
        '',
        '满足：',
        '',
        '**(i) 多重线性**：对每个变元分别线性；',
        '',
        '**(ii) 交错**：任两个变元相等时取值为 $0$；',
        '',
        '**(iii) 规范化**：$D(e_1, \\ldots, e_n) = 1$（$(e_i)$ 是任一固定的有序基）。'
      ].join('\n'),
      notes: '⭐ 这条定理是行列式的**正确出生方式**：不是「对角线相乘再相减」，而是「满足三条公理的唯一函数」。三条公理分别是**线性、交错、规范**，缺一不可。\n\n⭐ 「唯一」比「存在」有用得多：任何满足这三条的函数都等于行列式，所以验证一条恒等式时只要验证这三条即可 —— 例如 $\\det(A^{\\mathsf{T}}) = \\det A$、$\\det(AB) = \\det A \\det B$。\n\n⭐ 「存在」的构造：把 $(v_1, \\ldots, v_n)$ 用基展开成 $n \\times n$ 的系数矩阵 $(a_{ij})$，然后取 Leibniz 公式 $\\sum_{\\sigma} \\operatorname{sgn}(\\sigma) \\prod_i a_{i,\\sigma(i)}$ 为定义 —— 逐条验证三条公理即可（见证明那一节）。\n\n⭐ 与「万有性质」的关系：这不是通常意义上的万有性质（没有松伴随），但它是**同样的手法** —— 用一个泛条件（三条公理）把对象钉死。所以图上把它与 `prop.module-tensor-universal`（张量积的万有性质）看成同一族的证明技术。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 5']
    },
    {
      id: 'def.determinant',
      cluster: 'algebra.matrix',
      type: 'definition',
      label: '行列式',
      title: '行列式 $\\det A$（Determinant）',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '行列式'],
      statement: [
        '对 $A = (a_{ij}) \\in M_n(K)$，定义**行列式**',
        '',
        '$$\\det A := \\sum_{\\sigma \\in S_n} \\operatorname{sgn}(\\sigma)\\ \\prod_{i=1}^{n} a_{i,\\sigma(i)}$$',
        '',
        '（$S_n$ 是 $n$ 次对称群、$\\operatorname{sgn}$ 是置换的符号；共 $n!$ 项。）',
        '',
        '把 $A$ 的列看成 $V = K^{n}$ 中的向量，则 $\\det$ 就是「行列式的存在唯一性」里那个唯一的 $D$。',
        '',
        '基本性质：$\\det I_n = 1$；交换两列变号；有两列相同则为 $0$；$\\det A^{\\mathsf{T}} = \\det A$。'
      ].join('\n'),
      notes: '⭐ 几何读法（$K = \\mathbb{R}$）：$|\\det A|$ 是线性映射 $x \\mapsto Ax$ 把单位立方体拉成的平行体的**体积**，符号是**定向**。于是 $\\det = 0 \\iff$ 这个映射把空间压扁了 $\\iff$ 不可逆。\n\n⭐ 这个几何意义在后面换元积分公式里会再出现一次：$\\int f\\,dx$ 换成 $\\int f\\,|\\det|\\,dy$ —— 那里的 $|\\det|$ 就是体积缩放因子。\n\n⚠ 公式里的 $n!$ 项说明这个定义**不能用来算**（$n = 20$ 就超过 $10^{18}$ 项）；算的时候用消元法或 Laplace 展开。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 5']
    },
    {
      id: 'thm.det-multiplicative',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: '行列式的乘性',
      title: '定理：$\\det(AB) = \\det A \\cdot \\det B$',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '行列式'],
      statement: [
        '对 $A, B \\in M_n(K)$：',
        '',
        '$$\\det(AB) = \\det A \\cdot \\det B, \\qquad \\det A^{\\mathsf{T}} = \\det A, \\qquad \\det(cA) = c^{n} \\det A$$',
        '',
        '于是 $A$ 可逆时 $\\det(A^{-1}) = (\\det A)^{-1}$，并且',
        '',
        '$$\\det A \\ne 0$$'
      ].join('\n'),
      notes: '⭐ **乘性**是行列式最重要的一条：它把「矩阵乘法（复合）」翻译成「数量乘法」，于是 $\\det$ 是从环 $M_n(K)$ 到域 $K$ 的**乘法同态**（把 $\\operatorname{GL}_n(K)$ 送到 $K^{\\times}$）。\n\n⭐ 证明的技巧：固定 $B$，看 $A \\mapsto \\det(AB)$ —— 它关于 $A$ 的列是**交错多重线性**的（因为 $AB$ 的列就是 $A$ 的列的线性组合），由存在唯一性它等于常数倍的 $\\det A$；取 $A = I$ 定出常数 $= \\det B$。\n\n⚠ 注意 $\\det(cA) = c^{n}\\det A$（不是 $c\\det A$）—— 每一列都乘了 $c$，共 $n$ 次。',
      refs: ['Lang, Linear Algebra']
    },
    {
      id: 'prop.det-laplace',
      cluster: 'algebra.matrix',
      type: 'proposition',
      label: 'Laplace 展开',
      title: '命题：Laplace 展开（按一行或一列展开）',
      regions: ['algebra'],
      tags: ['命题', '线性代数', '行列式'],
      statement: [
        '设 $A = (a_{ij}) \\in M_n(K)$，记 $A_{ij}$ 为划掉第 $i$ 行与第 $j$ 列后得到的 $(n-1)$ 阶矩阵，$M_{ij} := \\det A_{ij}$（**余子式**），$C_{ij} := (-1)^{i+j} M_{ij}$（**代数余子式**）。则对每个固定的 $i$：',
        '',
        '$$\\det A = \\sum_{j=1}^{n} a_{ij}\\, C_{ij}$$',
        '',
        '（**按第 $i$ 行展开**；按列同理。）并且「错位展开」给出零：$\\sum_j a_{kj} C_{ij} = 0$（$k \\ne i$）。'
      ].join('\n'),
      notes: '⭐ 这是行列式的**递归算法**：$n$ 阶化归成 $n$ 个 $n-1$ 阶，复杂度 $O(n!)$。实际计算里先用消元法把某一行化到只剩一个非零元，再展开 —— 两件事配合起来很快。\n\n⭐ 「错位展开等于零」这一条可以直接改写成矩阵等式 $A \\cdot \\operatorname{adj} A = (\\det A) I_n$（$\\operatorname{adj} A$ 是代数余子式的转置），也就是 $A^{-1} = (\\det A)^{-1} \\operatorname{adj} A$ —— Cramer 法则与逆矩阵公式都从这里出来。\n\n⭐ 还有一个常用推论（$K = \\mathbb{R}^{n \\times n}$ 时把 $A$ 看成 $n$ 个行向量）：**行列式对每一行都是线性的**，所以对一行做初等变换时 det 的变化规律可以逐条写出（换行变号、倍加不变、乘 $c$ 则乘 $c$）。Gauss 消元正是靠这三条算行列式的。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 5']
    },
    {
      id: 'thm.cramer',
      cluster: 'algebra.matrix',
      type: 'theorem',
      label: 'Cramer 法则',
      title: '定理（Cramer）：用行列式解方程组',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '行列式'],
      statement: [
        '设 $A \\in M_n(K)$ 且 $\\det A \\ne 0$，$b \\in K^{n}$。则方程组 $Ax = b$ 有唯一解，且',
        '',
        '$$x_j = \\frac{\\det A_j}{\\det A}, \\qquad j = 1, \\ldots, n$$',
        '',
        '其中 $A_j$ 是把 $A$ 的第 $j$ 列换成 $b$ 得到的矩阵。'
      ].join('\n'),
      notes: '⭐ 理论意义大于计算意义：它给出解对 $b$ **显式**的表达式，从而能立刻看出「解连续地依赖 $b$」（$\\det A \\ne 0$ 时 $A^{-1}$ 存在，$x = A^{-1}b$）。\n\n⚠ 计算上不划算：算 $n$ 个 $n$ 阶行列式比消元法贵得多（除非 $n$ 很小）。现代数值线性代数从不这样解方程组。\n\n⭐ 它是「$\\det A \\ne 0 \\iff$ 可逆」这一条的算法化身：分母不为零 $\\iff$ 唯一解 $\\iff$ 可逆。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 5', 'Lang, Linear Algebra']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.vs-matrix',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'def.matrix',
      note: '矩阵的元素取自域 $K$，而行列指标是有限集 —— 定义里用到的只有「域」与「有限指标集」。'
    },
    {
      id: 'dep.matrix-ops',
      kind: 'definition',
      definition: 'def.matrix',
      usedBy: 'def.matrix-operations',
      note: '加、数乘、乘法都是写在矩阵元素上的逐条公式，先要有矩阵这个对象。'
    },
    {
      id: 'dep.linearmap-matrix',
      kind: 'definition',
      definition: 'def.linear-map',
      usedBy: 'thm.matrix-linear-map',
      note: '定理的两边是 $\\operatorname{Hom}_K(V, W)$ 与矩阵集合，而左边的元素就是线性映射。'
    },
    {
      id: 'dep.matrix-elementary',
      kind: 'definition',
      definition: 'def.matrix',
      usedBy: 'def.elementary-matrix',
      note: '初等矩阵就是对单位矩阵做一次初等行变换得到的矩阵。'
    },
    {
      id: 'dep.matrixops-invertible',
      kind: 'definition',
      definition: 'def.matrix-operations',
      usedBy: 'def.invertible-matrix',
      note: '「可逆」这个词要用乘法来陈述（$AB = BA = I_n$），所以先要有乘法。'
    },
    {
      id: 'dep.multilinear-alternating',
      kind: 'definition',
      definition: 'def.multilinear-form',
      usedBy: 'def.alternating-form',
      note: '交错性是加在多重线性型上的**额外条件**（交换变元要变号），所以先有多重线性。'
    },
    {
      id: 'dep.alternating-det',
      kind: 'definition',
      definition: 'def.alternating-form',
      usedBy: 'def.determinant',
      note: '行列式就是交错 $n$ 重线性型在 $V = K^{n}$ 上的那一支（用置换的符号写出显式公式）。'
    },
    {
      id: 'dep.detexists-determinant',
      kind: 'definition',
      definition: 'thm.det-exists-unique',
      usedBy: 'def.determinant',
      note: '存在唯一性定理保证了「那个唯一的 $D$」确实存在，行列式的定义才站得住。'
    },
    {
      id: 'dep.rank-rowcol',
      kind: 'definition',
      definition: 'def.rank',
      usedBy: 'thm.rank-row-col',
      note: '定理说的是行秩与列秩都等于 $\\operatorname{rank} A$ —— 后者的定义在映射那一侧。'
    },
    {
      id: 'dep.rank-linearsystems',
      kind: 'definition',
      definition: 'def.rank',
      usedBy: 'thm.linear-system-solutions',
      note: '解的存在性与解空间的维数都用 $\\operatorname{rank} A$ 表述。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.matrix-ring',
      kind: 'implication',
      sources: ['def.matrix-operations', 'thm.matrix-linear-map'],
      target: 'thm.matrix-ring',
      title: '矩阵运算的定义 $\\implies$ $M_n(K)$ 是环',
      proof: [
        '逐条验证。',
        '',
        '1. **加法群**：逐分量加法继承 $K$ 的加法群结构，零元是零矩阵，$-A$ 是逐分量取负。',
        '2. **乘法结合**：$(AB)C$ 与 $A(BC)$ 的 $(i,j)$ 元素都是 $\\sum_{k,l} a_{ik} b_{kl} c_{lj}$（两次求和次序可换，因为都是有限和）。',
        '3. **分配律**：$(A + B)C$ 与 $AC + BC$ 的 $(i,j)$ 元素都是 $\\sum_k (a_{ik} + b_{ik}) c_{kj}$。',
        '4. **单位元**：$(I_n A)_{ij} = \\sum_k \\delta_{ik} a_{kj} = a_{ij}$，同理 $A I_n = A$。',
        '5. **$K$-代数**：数乘与加法的相容（向量空间公理）逐分量成立，且 $c(AB) = (cA)B = A(cB)$ 由有限和的线性性得到。',
        '',
        '**非交换**（$n \\ge 2$）：取 $A = E_{12}$（只有 $(1,2)$ 位是 $1$）、$B = E_{21}$，则 $AB = E_{11}$ 而 $BA = E_{22}$，不等。∎',
        '',
        '（另一条路更短：由「线性映射 $\\leftrightarrow$ 矩阵」把加法读成映射的加法、乘法读成复合，于是环公理就是 $\\operatorname{End}(K^{n})$ 的环公理，逐条显然。）'
      ].join('\n'),
      note: '第 5 步「$c(AB) = A(cB)$」是 $K$-代数定义里唯一不平凡的一条 —— 它说明数乘可以从任何一个因子里提出来。'
    },
    {
      id: 'imp.matrix-linear-map',
      kind: 'implication',
      sources: ['def.coordinate', 'def.linear-map', 'def.matrix'],
      target: 'thm.matrix-linear-map',
      title: '坐标 + 线性 $\\implies$ 线性映射与矩阵一一对应',
      proof: [
        '记 $\\mathcal{B} = (v_1, \\ldots, v_n)$、$\\mathcal{C} = (w_1, \\ldots, w_m)$。',
        '',
        '**构造**：给定 $T$，它在每个基向量上的值 $T(v_j) \\in W$ 有唯一坐标 $(a_{1j}, \\ldots, a_{mj})^{\\mathsf{T}}$，排成矩阵 $[T]_{\\mathcal{B}}^{\\mathcal{C}} := (a_{ij})$。',
        '',
        '**反过来**：给定矩阵 $A = (a_{ij})$，定义 $T(v_j) := \\sum_i a_{ij} w_i$，再线性地延拓到整个 $V$（每个 $v = \\sum_j c_j v_j$ 令 $T(v) := \\sum_j c_j T(v_j)$）。**良定义**：因为坐标 $c_j$ 唯一（基的定义）。',
        '',
        '**互逆**：两个构造显然互相还原，故 $T \\mapsto [T]$ 是双射。',
        '',
        '**线性**：$[T + cS]$ 的第 $j$ 列 $= (T + cS)(v_j)$ 的坐标 $= T(v_j)$ 的坐标 $+ c \\cdot S(v_j)$ 的坐标 $=$ 相应两列之和再加数乘。',
        '',
        '**复合对应乘法**：设 $T : V \\to W$、$S : W \\to U$，$S$ 在 $\\mathcal{C}, \\mathcal{E}$ 下的矩阵为 $B$、$T$ 在 $\\mathcal{B}, \\mathcal{C}$ 下的矩阵为 $A$。则',
        '',
        '$$(S \\circ T)(v_j) = S\\Bigl( \\sum_i a_{ij} w_i \\Bigr) = \\sum_i a_{ij} S(w_i) = \\sum_i a_{ij} \\sum_k b_{ki} u_k = \\sum_k \\Bigl( \\sum_i b_{ki} a_{ij} \\Bigr) u_k$$',
        '',
        '括号里正是 $(BA)_{kj}$，故 $[S \\circ T] = BA$。∎'
      ].join('\n'),
      note: '「良定义」那一步用到了**坐标的唯一性**（即基的定义）。这正是整条定理的地基 —— 若基不是基，$T$ 就定义不出来。'
    },
    {
      id: 'imp.change-of-basis',
      kind: 'implication',
      sources: ['thm.matrix-linear-map'],
      target: 'thm.change-of-basis',
      title: '矩阵表示 + 乘法对应复合 $\\implies$ 相似',
      proof: [
        '记 $P := [\\mathrm{id}]_{\\mathcal{B}\'}^{\\mathcal{B}}$。由矩阵表示对复合的乘性，',
        '',
        '$$[T]_{\\mathcal{B}\'} = [\\mathrm{id} \\circ T \\circ \\mathrm{id}]_{\\mathcal{B}\'}^{\\mathcal{B}\'} = [\\mathrm{id}]_{\\mathcal{B}}^{\\mathcal{B}\'}\\ [T]_{\\mathcal{B}}^{\\mathcal{B}}\\ [\\mathrm{id}]_{\\mathcal{B}\'}^{\\mathcal{B}} = P^{-1}\\,[T]_{\\mathcal{B}}\\,P$$',
        '',
        '其中 $[\\mathrm{id}]_{\\mathcal{B}}^{\\mathcal{B}\'} = P^{-1}$ 是因为两个过渡矩阵互为逆（$(P^{-1}P)$ 是恒等映射在两同一组基下的矩阵，即 $I_n$）。',
        '',
        '由「可逆 $\\iff$ 双射」一栏的等价，$P$ 可逆。',
        '',
        '**相似是等价关系**：自反（$P = I$）、对称（$A \\sim B \\implies B = P^{-1}AP \\implies A = (P^{-1})^{-1} B P^{-1}$）、传递（$P^{-1}AP = B$、$Q^{-1}BQ = C \\implies (PQ)^{-1}A(PQ) = C$）。∎'
      ].join('\n'),
      note: '整条证明里**没有做任何计算**，只是把「换基」写成三个映射的复合再用矩阵表示的乘性 —— 这是把矩阵论建立在线性映射语言上的最大红利。'
    },
    {
      id: 'imp.rank-row-col',
      kind: 'implication',
      sources: ['thm.matrix-linear-map', 'def.rank'],
      target: 'thm.rank-row-col',
      title: '矩阵表示 $\\implies$ 行秩 = 列秩',
      proof: [
        '把 $A$ 看成映射 $T : K^{n} \\to K^{m}$、$x \\mapsto Ax$（取标准基）。',
        '',
        '1. **列秩**：$A$ 的列向量正是 $T(e_1), \\ldots, T(e_n)$，所以列秩 $= \\dim \\operatorname{im} T = \\operatorname{rank} A$。',
        '2. **行秩**：$A$ 的转置 $A^{\\mathsf{T}}$ 对应的映射 $T^{\\mathsf{T}} : K^{m} \\to K^{n}$ 就是 $T$ 的对偶（取标准基，见「对偶基」里的 $[T^{\\ast}] = [T]^{\\mathsf{T}}$）。$A$ 的行向量是 $A^{\\mathsf{T}}$ 的列向量，故行秩 $= \\operatorname{rank} A^{\\mathsf{T}}$。',
        '3. 只需再证 $\\operatorname{rank} A^{\\mathsf{T}} = \\operatorname{rank} A$：由 $\\operatorname{im} T^{\\mathsf{T}} = (\\ker T)^{0}$（零化子）与 $\\dim U^{0} = \\dim V - \\dim U$，',
        '',
        '$$\\operatorname{rank} A^{\\mathsf{T}} = \\dim \\operatorname{im} T^{\\mathsf{T}} = \\dim (\\ker T)^{0} = n - \\dim \\ker T = \\dim \\operatorname{im} T = \\operatorname{rank} A$$',
        '',
        '（最后一步用了秩-零化度定理。）∎'
      ].join('\n'),
      note: '这条证明把「行秩 = 列秩」化归成对偶那一段的零化子维数公式 —— 也就是说：**转置不改变秩**，而那是零化子与秩-零化度的共同推论。'
    },
    {
      id: 'imp.linear-system-solutions',
      kind: 'implication',
      sources: ['thm.rank-nullity', 'def.kernel-image-vs'],
      target: 'thm.linear-system-solutions',
      title: '秩-零化度 $\\implies$ 线性方程组的解结构',
      proof: [
        '记 $T : K^{n} \\to K^{m}$、$x \\mapsto Ax$。',
        '',
        '**有解判据**：$Ax = b$ 有解 $\\iff$ $b \\in \\operatorname{im} T$。而 $\\operatorname{im} T$ 就是 $A$ 的列空间，其维数是列秩；把 $b$ 添成一列不改变列空间的维数当且仅当 $b$ 落在其中 —— 即 $\\operatorname{rank} A = \\operatorname{rank}(A \\mid b)$。',
        '',
        '**解的结构**：若 $x_0$ 是一个解，则对任意 $u \\in \\ker T$，$A(x_0 + u) = b$，所以 $x_0 + \\ker T \\subseteq$ 解集。反之若 $x$ 也是解，则 $A(x - x_0) = 0$，即 $x - x_0 \\in \\ker T$，故 $x \\in x_0 + \\ker T$。两边相等。',
        '',
        '**维数**：由秩-零化度定理，$\\dim \\ker T = n - \\operatorname{rank} A$；平移不改变「维数」（仿射子空间与 $\\ker T$ 同维）。',
        '',
        '**唯一性**：$\\det A \\ne 0$ 时 $\\ker T = \\{0\\}$，解集是单点集 $\\{A^{-1}b\\}$。∎'
      ].join('\n'),
      note: '第 2 段是**纯集合论**的：解集 = 一个特解 + 全体齐次解。它对任何群同态、任何环同态都成立 —— 「非齐次解 = 特解 + 齐次解」是这一招的通用形态。'
    },
    {
      id: 'imp.det-exists-unique',
      kind: 'implication',
      sources: ['def.multilinear-form', 'def.alternating-form'],
      target: 'thm.det-exists-unique',
      title: '多重线性 + 交错 $\\implies$ 行列式的存在唯一性',
      proof: [
        '记 $D(e_1, \\ldots, e_n) = 1$ 决定了规范的零点。',
        '',
        '**唯一性。** 设 $D$ 满足三条。把每个 $v_j = \\sum_i a_{ij} e_i$ 代入，由多重线性展开成 $n^{n}$ 项之和，每一项是 $a_{i_1 1} \\cdots a_{i_n n} D(e_{i_1}, \\ldots, e_{i_n})$。由交错性，只有 $i_1, \\ldots, i_n$ **互不相同**的那些项非零 —— 也就是说，只有置换 $\\sigma \\in S_n$ 对应的项（取 $i_j = \\sigma(j)$）存活。再由交错性 $D(e_{\\sigma(1)}, \\ldots, e_{\\sigma(n)}) = \\operatorname{sgn}(\\sigma)\\, D(e_1, \\ldots, e_n) = \\operatorname{sgn}(\\sigma)$。于是',
        '',
        '$$D(v_1, \\ldots, v_n) = \\sum_{\\sigma \\in S_n} \\operatorname{sgn}(\\sigma)\\ a_{\\sigma(1), 1} \\cdots a_{\\sigma(n), n}$$',
        '',
        '右端只依赖 $a_{ij}$，故 $D$ 唯一。',
        '',
        '**存在性。** 直接把上式取作 $D$ 的定义，逐条验证三条公理：多重线性（每一项对每个 $a_{ij}$ 都是一次的，而 $a_{ij}$ 关于 $v_j$ 线性）、交错性（交换两个变元 = 把置换乘一个对换，$\\operatorname{sgn}$ 变号，而所有项成对相消）、规范性（代入 $a_{ij} = \\delta_{ij}$ 后只剩 $\\sigma = \\mathrm{id}$ 一项，值为 $1$）。∎'
      ].join('\n'),
      note: '**唯一性先证、存在性后验**：这是「用泛性质定义对象」的标准套路 —— 先把任何满足条件的对象都逼成一个显式公式，再把那个公式拿回来验证它确实满足条件。'
    },
    {
      id: 'imp.det-multiplicative',
      kind: 'implication',
      sources: ['thm.det-exists-unique', 'def.determinant'],
      target: 'thm.det-multiplicative',
      title: '存在唯一性 $\\implies$ 乘性',
      proof: [
        '固定 $B$，考虑映射 $A \\mapsto \\det(AB)$，把它看成 $A$ 的 $n$ 个列向量 $a_1, \\ldots, a_n$ 的函数。',
        '',
        '1. **多重线性**：$AB$ 的第 $j$ 列是 $A \\cdot (B$ 的第 $j$ 列$)$，即 $\\sum_i b_{ij} a_i$。所以固定其他列时，$\\det(AB)$ 关于第 $j$ 列是线性的（先把 $a_j$ 的线性组合拉出来，再用 $\\det$ 的多重线性）。',
        '2. **交错**：若 $a_i = a_j$（$i \\ne j$），则 $AB$ 的第 $i$、$j$ 列也相等（同样的线性组合），于是 $\\det(AB) = 0$。',
        '3. 由存在唯一性，$\\det(AB) = c \\cdot \\det A$ 对某个常数 $c$ 成立（同一条公理系下的函数只差常数倍）。取 $A = I$ 得 $c = \\det B$。故 $\\det(AB) = \\det A \\det B$。',
        '',
        '**转置**：$\\det A^{\\mathsf{T}} = \\det A$ —— 用存在唯一性，$A \\mapsto \\det A^{\\mathsf{T}}$ 也满足三条公理（转置把列换成行，交错性与规范性不变），故两者相等。',
        '',
        '**可逆判据**：$A$ 可逆时 $1 = \\det I = \\det(A A^{-1}) = \\det A \\cdot \\det(A^{-1})$，故 $\\det A \\ne 0$。反之若 $A$ 不可逆，则其列向量线性相关，$\\det A = 0$（由交错性把线性相关性代入展开）。∎'
      ].join('\n'),
      note: '第 3 步「只差常数倍」是**唯一性定理**最漂亮的一次使用：不必计算，只要说明一个新函数满足同一套公理就自动成比例。'
    },
    {
      id: 'imp.det-laplace',
      kind: 'implication',
      sources: ['def.determinant', 'thm.det-exists-unique'],
      target: 'prop.det-laplace',
      title: '置换展开 $\\implies$ Laplace 展开',
      proof: [
        '把 $\\det A$ 按第 $i$ 行拆开：$A$ 的每一列 $a_j$ 都含 $a_{ij} e_i$ 这一项，由多重线性可把 $\\det$ 展成 $n$ 项之和，第 $j$ 项是「把第 $j$ 列换成 $a_{ij} e_i$、其余列不动」的行列式。',
        '',
        '该行列式 $= a_{ij} \\cdot \\det(\\ldots, e_i, \\ldots)$，其中 $e_i$ 在第 $j$ 位。把 $e_i$ 通过 $|i - j|$ 次相邻列交换移到第 $1$ 位（每次变号），再按第一列展开，剩下的 $(n-1)$ 阶行列式正是划掉第 $i$ 行、第 $j$ 列后的 $A_{ij}$，符号累计为 $(-1)^{i+j}$。于是',
        '',
        '$$\\det A = \\sum_j a_{ij}\\,(-1)^{i+j} \\det A_{ij} = \\sum_j a_{ij}\\, C_{ij}$$',
        '',
        '**错位展开**：若 $k \\ne i$ 而用第 $k$ 行的元素配第 $i$ 行的代数余子式，那等于「把第 $i$ 行换成第 $k$ 行」之后的行列式 —— 有两行相同，故为 $0$。∎'
      ].join('\n'),
      note: '符号 $(-1)^{i+j}$ 的来源是**移动 $e_i$ 到第一个位置**所需的交换次数 —— 这也是「棋盘格符号」的几何解释。'
    },
    {
      id: 'imp.cramer',
      kind: 'implication',
      sources: ['def.determinant', 'prop.det-laplace', 'def.invertible-matrix'],
      target: 'thm.cramer',
      title: '伴随矩阵 + 行列式 $\\implies$ Cramer 法则',
      proof: [
        '由 Laplace 展开与错位展开，定义**伴随矩阵** $\\operatorname{adj} A := (C_{ji})$（代数余子式的转置），则两条展开合起来就是',
        '',
        '$$A \\cdot \\operatorname{adj} A = (\\det A)\\, I_n = \\operatorname{adj} A \\cdot A$$',
        '',
        '（$(i,j)$ 元素是 $\\sum_k a_{ik} C_{jk}$：$i = j$ 时按第 $i$ 行展开 $= \\det A$，$i \\ne j$ 时错位展开 $= 0$。）',
        '',
        '若 $\\det A \\ne 0$，则 $A^{-1} = (\\det A)^{-1} \\operatorname{adj} A$，于是 $x = A^{-1} b$ 的唯一解可以写成',
        '',
        '$$x_j = \\frac{1}{\\det A} \\sum_i C_{ij} b_i$$',
        '',
        '而 $\\sum_i C_{ij} b_i$ 恰好是「把 $A$ 的第 $j$ 列换成 $b$」之后按第 $j$ 列做 Laplace 展开的结果，即 $\\det A_j$。故 $x_j = \\det A_j / \\det A$。∎'
      ].join('\n'),
      note: '证明的组织方式值得记住：**Laplace 展开 + 错位展开 = 伴随矩阵**，于是 Cramer 法则不过是「$A^{-1} = \\operatorname{adj}A / \\det A$」写在分量上。'
    }
  ]
});
