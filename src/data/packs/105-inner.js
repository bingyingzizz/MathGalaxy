/* ==========================================================================
   内容包 · 线性代数 ⑥：内积空间与正交性
   --------------------------------------------------------------------------
   新星团 `algebra.inner`（16 点）。前面几包只有**加法与数乘**，这一包加上一把
   **尺子**（内积）：

     内积 → 诱导范数与距离 → Cauchy–Schwarz → 正交 / 正交补
       → Gram–Schmidt（标准正交基存在）→ 正交投影与最佳逼近
       → 伴随算子 → **谱定理**（可正交对角化）→ 二次型与 Sylvester 判据 → SVD

   ⭐ 与图上别处的接口：
     · `def.metric-space`（内积诱导距离）· `def.lp-norm`（$p = 2$ 时 $L^{2}$ 是内积空间）
     · `def.estimate`… 以及分析那边的 Cauchy–Schwarz（同一个不等式）
   ⚠️ 命名：算子伴随用 `def.operator-adjoint`（⛔ 不能叫 `def.adjoint`，那是范畴论的伴随函子）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数：内积空间与正交性',
  nodes: [

    {
      id: 'def.inner-product',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '内积',
      title: '内积与内积空间',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '设 $V$ 是 $K$-向量空间（$K = \\mathbb{R}$ 或 $\\mathbb{C}$）。映射',
        '',
        '$$\\langle \\cdot, \\cdot \\rangle : V \\times V \\longrightarrow K$$',
        '',
        '叫 $V$ 上的**内积**，当且仅当对一切 $u, v, w \\in V$、$c \\in K$：',
        '',
        '- **对第一变元线性**：$\\langle u + c\\,w, v \\rangle = \\langle u, v \\rangle + c\\langle w, v \\rangle$；',
        '- **共轭对称**：$\\langle v, u \\rangle = \\overline{\\langle u, v \\rangle}$（$K = \\mathbb{R}$ 时就是对称）；',
        '- **正定**：$\\langle v, v \\rangle \\ge 0$，且 $\\langle v, v \\rangle = 0 \\iff v = 0$。',
        '',
        '配上内积的 $V$ 叫**内积空间**。实数情形下内积就是正定对称双线性型。',
        '',
        '标准例子：$K^{n}$ 上的内积 $\\langle x, y \\rangle := \\sum_i \\overline{x_i}\\, y_i$。'
      ].join('\n'),
      notes: '⭐ 复数情形下**不能要求双线性**：若 $\\langle u, v \\rangle$ 对两个变元都线性，则 $\\langle i v, i v \\rangle = i^{2}\\langle v, v \\rangle = -\\langle v, v \\rangle$ 恒为负，与正定矛盾。所以复数情形只能是**一个变元线性、另一个共轭线性**（叫**半双线性**或 sesquilinear）。\n\n⭐ 哪一边写成共轭是**约定**：本图取「第一变元线性、第二变元共轭线性」的**物理约定**（与图上别处一致）。换个约定所有公式共轭一下，不改变内容。\n\n⚠ 正定性是内积与「一般双线性型」的分水岭：正定才有「长度」可言，才有 Cauchy–Schwarz、才有正交投影。丢掉正定（只留对称双线性）得到的是**二次型**那一套（见 `def.quadratic-form`），丢掉对称得到的是**辛形式**。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8', 'Roman, Advanced Linear Algebra, Ch. 11']
    },
    {
      id: 'def.induced-norm',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '诱导范数与距离',
      title: '由内积诱导的范数与距离',
      regions: ['algebra', 'analysis'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '设 $(V, \\langle \\cdot, \\cdot \\rangle)$ 是内积空间。定义',
        '',
        '$$\\|v\\| := \\sqrt{\\langle v, v \\rangle}, \\qquad d(u, v) := \\|u - v\\|$$',
        '',
        '则 $\\|\\cdot\\|$ 是 $V$ 上的**范数**（正定、齐次、三角不等式），$d$ 是**距离**，并且',
        '',
        '$$\\|v\\| = 0 \\iff v = 0, \\qquad \\|cv\\| = |c|\\,\\|v\\|, \\qquad \\|u + v\\| \\le \\|u\\| + \\|v\\|$$',
        '',
        '（三角不等式来自 Cauchy–Schwarz。）'
      ].join('\n'),
      notes: '⭐ 于是**内积空间自动是度量空间**，可以谈收敛、完备、紧 —— 分析那一侧的全部工具都能进来。完备的内积空间叫 **Hilbert 空间**。\n\n⭐ 反过来：范数未必来自内积。判据是**平行四边形律**\n\n$$\\|u + v\\|^{2} + \\|u - v\\|^{2} = 2\\|u\\|^{2} + 2\\|v\\|^{2}$$\n\n（$\\ell^{p}$ 在 $p \\ne 2$ 时不满足它，所以 $\\ell^{p}$ 上的范数不来自任何内积 —— 这也是「$L^{2}$ 特别」的原因。）\n\n⭐ 由内积恢复内积的公式是**极化恒等式**：$\\langle u, v\\rangle = \\frac{1}{4}\\bigl( \\|u+v\\|^{2} - \\|u-v\\|^{2} \\bigr)$（实情形）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'thm.cauchy-schwarz',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: 'Cauchy–Schwarz',
      title: '定理：Cauchy–Schwarz 不等式',
      regions: ['algebra', 'analysis'],
      tags: ['定理', '线性代数', '内积', '不等式'],
      statement: [
        '设 $V$ 是内积空间，$u, v \\in V$。则',
        '',
        '$$|\\langle u, v \\rangle| \\le \\|u\\|\\,\\|v\\|$$',
        '',
        '等号成立当且仅当 $u, v$ **线性相关**。'
      ].join('\n'),
      notes: '⭐ 它是「内积 $\\implies$ 范数」这条路上唯一需要证明的一步（三角不等式由它推出）。\n\n⭐ 证明技巧：对一切 $t \\in K$ 令 $f(t) := \\|u - t v\\|^{2} \\ge 0$，展开后是关于 $t$ 的二次式；取 $t = \\langle v, u \\rangle / \\|v\\|^{2}$ 即得结论。\n\n⭐ 它是分析里最常用的不等式之一：$L^{2}$ 上就是 $|\\int f\\bar{g}| \\le \\|f\\|_{2}\\|g\\|_{2}$，概率论里就是 $|\\operatorname{Cov}| \\le \\sigma_X\\sigma_Y$。名字与「数列形式的 Cauchy–Schwarz」（`analysis.lp` 团里的 Hölder 在 $p = q = 2$ 的情形）是同一个。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'def.orthogonality',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '正交',
      title: '正交与正交分解',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '设 $V$ 是内积空间。',
        '',
        '- $u \\perp v$（称 $u$ 与 $v$ **正交**）$\\iff \\langle u, v \\rangle = 0$；',
        '- $S \\perp T$：$S$ 中每个向量与 $T$ 中每个向量正交；',
        '- $\\{v_1, \\ldots, v_k\\}$ 叫**标准正交组**，当且仅当 $\\langle v_i, v_j \\rangle = \\delta_{ij}$；',
        '- $\\{v_i\\}$ 是**标准正交基**，当且仅当它既是一组基又是标准正交组。',
        '',
        '**勾股定理**：$u \\perp v \\implies \\|u + v\\|^{2} = \\|u\\|^{2} + \\|v\\|^{2}$。'
      ].join('\n'),
      notes: '⭐ 标准正交基的最大好处是**坐标就是内积**：若 $(e_1, \\ldots, e_n)$ 标准正交，则\n\n$$v = \\sum_{i=1}^{n} \\langle e_i, v \\rangle\\, e_i, \\qquad \\|v\\|^{2} = \\sum_{i=1}^{n} |\\langle e_i, v \\rangle|^{2}$$\n\n（第二条是 **Parseval 等式**。）一般基要解线性方程组才能求坐标，标准正交基只要算 $n$ 个内积 —— 这就是 Gram–Schmidt 值得做的理由。\n\n⚠ 标准正交组与标准正交「基」不同：前者只要求正交归一，不要求张成整个空间。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'def.orthogonal-complement',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '正交补',
      title: '正交补 $U^{\\perp}$ 与直和分解',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '设 $U \\subseteq V$ 是子空间。$U$ 的**正交补**定义为',
        '',
        '$$U^{\\perp} := \\{\\, v \\in V : \\langle u, v \\rangle = 0 \\ \\text{for all}\\ u \\in U \\,\\}$$',
        '',
        '它是 $V$ 的子空间，并且',
        '',
        '- $U \\cap U^{\\perp} = \\{0\\}$；',
        '- $U \\subseteq (U^{\\perp})^{\\perp}$；',
        '- **有限维时** $V = U \\oplus U^{\\perp}$，且 $(U^{\\perp})^{\\perp} = U$、$\\dim U^{\\perp} = \\dim V - \\dim U$。'
      ].join('\n'),
      notes: '⭐ «$V = U \\oplus U^{\\perp}$» 是内积空间比一般向量空间**多出来的东西**：一般的子空间有补空间但不唯一（见 `def.direct-sum`），而正交补是**唯一**的补空间。\n\n⭐ 它与对偶里的零化子（`def.annihilator`）是一对：$U^{\\perp} \\subseteq V$、$U^{0} \\subseteq V^{\\ast}$，两者的维数公式长得一样（$\\dim V - \\dim U$），在「$V \\cong V^{\\ast}$（靠内积）」之下互相翻译。\n\n⚠ $V = U \\oplus U^{\\perp}$ 在**无限维**时对闭子空间才成立，任意子空间不成立（这是 Hilbert 空间理论的一个真定理）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'thm.gram-schmidt',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: 'Gram–Schmidt 正交化',
      title: '定理：Gram–Schmidt 正交化（标准正交基存在）',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '内积'],
      statement: [
        '设 $(v_1, \\ldots, v_k)$ 是内积空间 $V$ 中线性无关的向量组。则存在标准正交组 $(e_1, \\ldots, e_k)$ 与上三角的可逆系数关系，使',
        '',
        '$$\\operatorname{span}(e_1, \\ldots, e_j) = \\operatorname{span}(v_1, \\ldots, v_j), \\qquad j = 1, \\ldots, k$$',
        '',
        '特别地：**每个有限维内积空间都有标准正交基**（任一基都可以被正交化）。'
      ].join('\n'),
      notes: '⭐ 算法（归纳）：先令 $e_1 := v_1 / \\|v_1\\|$；再对 $j = 2, \\ldots, k$ 依次令\n\n$$w_j := v_j - \\sum_{i < j} \\langle e_i, v_j \\rangle\\, e_i, \\qquad e_j := \\frac{w_j}{\\|w_j\\|}$$\n\n（每一步把 $v_j$ 在已有方向上的分量全部减掉。）\n\n⭐ 它是「矩阵分解」的入口：把 $A$ 的列正交化就得到 **QR 分解** $A = QR$（$Q$ 列标准正交、$R$ 上三角）—— 数值上比直接解方程稳定得多。\n\n⚠ 它依赖内积与**实/复的域结构**：把内积换成一般的对称双线性型（如 Minkowski 度规）时算法会碰上 $\\|w_j\\| = 0$ 而除零。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'def.orthogonal-projection',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '正交投影',
      title: '正交投影',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '设 $U \\subseteq V$ 是有限维子空间，$V = U \\oplus U^{\\perp}$。对 $v \\in V$ 唯一地写 $v = u + w$（$u \\in U$、$w \\in U^{\\perp}$），定义',
        '',
        '$$P_U(v) := u$$',
        '',
        '$P_U : V \\to V$ 叫**正交投影**（或正交投影算子）。它的性质：',
        '',
        '- $P_U$ 线性，$P_U^{2} = P_U$（**幂等**），$\\ker P_U = U^{\\perp}$、$\\operatorname{im} P_U = U$；',
        '- $P_U$ 是**自伴**的：$\\langle P_U u, v \\rangle = \\langle u, P_U v \\rangle$（见「伴随算子」）；',
        '- $v - P_U v \\perp U$。'
      ].join('\n'),
      notes: '⭐ 一句话：**正交投影 = 幂等 + 自伴**。反过来，任何幂等且自伴的算子都是某个子空间的正交投影 —— 这条「算子语言」的刻画后面在谱定理里直接变成「特征值只有 $0, 1$ 的自伴算子」。\n\n⭐ 幂等但不自伴的算子叫**射影**（projection）：它是「沿 $\\ker P$ 平行地投到 $\\operatorname{im} P$」，一般不是正交投影。两者的区别就是「最短距离」有没有被取到。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'thm.projection-formula',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: '最佳逼近与投影公式',
      title: '定理：正交投影是最佳逼近，且可用标准正交基算出',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '内积', '逼近'],
      statement: [
        '设 $U \\subseteq V$ 是有限维子空间，$v \\in V$。则',
        '',
        '**(1) 最佳逼近性**：$\\|v - P_U v\\| \\le \\|v - u\\|$ 对一切 $u \\in U$ 成立，等号仅当 $u = P_U v$；',
        '',
        '**(2) 显式公式**：若 $(e_1, \\ldots, e_k)$ 是 $U$ 的标准正交基，则',
        '',
        '$$P_U v = \\sum_{j=1}^{k} \\langle e_j, v \\rangle\\, e_j, \\qquad \\|v\\|^{2} = \\|P_U v\\|^{2} + \\|v - P_U v\\|^{2} \\ge \\sum_{j=1}^{k} |\\langle e_j, v \\rangle|^{2}$$',
        '',
        '（最后一条叫 **Bessel 不等式**。）'
      ].join('\n'),
      notes: '⭐ 「最佳逼近」的几何含义：$P_U v$ 是 $U$ 中离 $v$ **最近**的点，而「最近」这件事被内积的范数定义得很好。这是最小二乘法、Fourier 级数（截断到前 $n$ 项最优）的共同来源。\n\n⭐ 显式公式说明标准正交基的威力：投影不必解方程组，只要算 $k$ 个内积。\n\n⚠ 「$U$ 有限维」或「$U$ 闭」是必需的：无限维且不闭时，最近的**点可能不存在**（只有下确界）。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'def.operator-adjoint',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '伴随算子',
      title: '伴随算子 $T^{\\ast}$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '设 $V, W$ 是有限维内积空间，$T : V \\to W$ 线性。则存在**唯一**的线性映射 $T^{\\ast} : W \\to V$ 使',
        '',
        '$$\\langle T v, w \\rangle_W = \\langle v, T^{\\ast} w \\rangle_V \\qquad (\\forall v \\in V, w \\in W)$$',
        '',
        '$T^{\\ast}$ 叫 $T$ 的**伴随**。在标准正交基下，$[T^{\\ast}] = [T]^{\\dagger}$（共轭转置）。',
        '',
        '性质：$(T + S)^{\\ast} = T^{\\ast} + S^{\\ast}$、$(cT)^{\\ast} = \\bar{c}\\,T^{\\ast}$、$(TS)^{\\ast} = S^{\\ast}T^{\\ast}$、$T^{\\ast\\ast} = T$。',
        '',
        '⚠️ 与范畴论的**伴随函子**（`def.adjoint`）不是一回事：那是两个函子之间的关系，这里是同一个空间上的算子。'
      ].join('\n'),
      notes: '⭐ 定义的方式值得注意：$T^{\\ast}$ 不是构造出来的，而是被**一条恒等式唯一定出**来的（存在性靠 Riesz 表示：$w \\mapsto \\langle T\\cdot, w\\rangle$ 是 $V$ 上的有界线性泛函）。这是「用泛性质定义对象」在有限维内积空间里的版本。\n\n⭐ 复的情形里 $(cT)^{\\ast} = \\bar c T^{\\ast}$ 的共轭**不可丢** —— 它来自内积对第二变元的共轭线性。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'def.isometry',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '等距与正交变换',
      title: '等距、正交变换与酉变换',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '线性映射 $T : V \\to V$ 叫**等距**，当且仅当它保持内积（等价地保持范数）：',
        '',
        '$$\\langle Tv, Tw \\rangle = \\langle v, w \\rangle \\quad (\\forall v, w) \\qquad \\iff \\qquad \\|Tv\\| = \\|v\\| \\quad (\\forall v)$$',
        '',
        '实数情形称**正交变换**，复数情形称**酉变换**；它们的矩阵分别叫正交矩阵（$Q^{\\mathsf{T}}Q = I$）与酉矩阵（$U^{\\dagger}U = I$）。',
        '',
        '等距的等价刻画：$T^{\\ast}T = I$（$\\iff T$ 可逆且 $T^{\\ast} = T^{-1}$）。全体正交（酉）变换构成群 $O(n)$（$U(n)$）。'
      ].join('\n'),
      notes: '⭐ 等距保持**全部几何**：长度、角度、正交性、体积（$|\\det| = 1$）。所以「两个图形全等」在代数上就是「差一个正交变换」。\n\n⭐ $O(n)$ 是紧李群（有界闭），$SO(n) := \\{Q : \\det Q = 1\\}$ 是它的连通分支（含单位元的那个）—— 旋转群。\n\n⚠ 「保持范数 $\\implies$ 保持内积」的推导用**极化恒等式**：内积可以由范数恢复（$\\langle u,v\\rangle = \\frac{1}{4}\\sum_{k=0}^{3} i^{k}\\|u + i^{k}v\\|^{2}$）—— 这也是「范数未必来自内积」那一节的另一半。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8']
    },
    {
      id: 'def.normal-operator',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '正规算子',
      title: '自伴、正规与酉算子',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积', '谱'],
      statement: [
        '设 $T : V \\to V$ 是有限维内积空间上的线性算子。',
        '',
        '- $T$ **自伴**（实数情形叫**对称**，复数情形叫 **Hermite**）：$T^{\\ast} = T$；',
        '- $T$ **正规**：$T^{\\ast}T = T T^{\\ast}$（与自己的伴随交换）；',
        '- $T$ **酉**（正交）：$T^{\\ast}T = T T^{\\ast} = I$。',
        '',
        '层次：$\\{$酉$\\} \\subset \\{$正规$\\}$，$\\{$自伴$\\} \\subset \\{$正规$\\}$，两者的交是「自伴且酉」（即 $T^{2} = I$ 的对称变换）。'
      ].join('\n'),
      notes: '⭐ 为什么要这三个词：**谱定理对正规算子成立**（可酉对角化），而自伴是最重要的一类正规算子（特征值全实）。一般算子做不到（Jordan 块没有标准正交基）。\n\n⭐ 自伴的实特征值 + 不同特征值的特征向量正交 —— 这两条合起来就是谱定理的内容。\n\n⚠ 「正规」在复数情形才把酉与自伴统一起来：实对称（自伴）与实正交（酉）都是实正规算子的特例，但它们在实情形下**不一定可正交对角化**（旋转 $90^\\circ$ 是正交、正规，但没有实特征值）—— 谱定理在实情形要求**对称**。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8', 'Roman, Advanced Linear Algebra, Ch. 11']
    },
    {
      id: 'thm.spectral-theorem',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: '谱定理（实对称）',
      title: '定理（谱定理）：实对称算子可正交对角化',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '内积', '谱'],
      statement: [
        '设 $V$ 是有限维**实**内积空间，$T : V \\to V$ **自伴**（即实对称）。则存在 $V$ 的**标准正交基**，使 $T$ 在其中是对角阵：',
        '',
        '$$V = E_{\\lambda_1} \\oplus \\cdots \\oplus E_{\\lambda_m}$$',
        '',
        '（这些特征子空间**两两正交**。）',
        '',
        '并且所有特征值 $\\lambda_i$ **都是实数**。矩阵形式：实对称矩阵 $A$ 存在正交矩阵 $Q$ 使 $Q^{\\mathsf{T}} A Q = \\operatorname{diag}(\\lambda_1, \\ldots, \\lambda_n)$。'
      ].join('\n'),
      notes: '⭐ 与 Jordan 型的区别：Jordan 只保证「相似」，谱定理保证「**酉/正交**相似」，代价是把条件收紧到自伴（正规）。这是有限维里两个不同的分类问题的答案。\n\n⭐ 证明的两步：① 至少有一个（实）特征值（用最值定理：$|Tv|$ 或 $\\langle Tv, v\\rangle$ 在单位球面这个**紧**集上取极值）；② 对特征子空间的正交补归纳（不变性来自自伴：$T(U) \\subseteq U \\implies T(U^{\\perp}) \\subseteq U^{\\perp}$）。\n\n⭐ 无限维的推广是**Hilbert 空间上的谱定理**（自伴算子的谱测度 / 投影值测度）—— 那是泛函分析的内容，图上 `analysis.lp` 那一团的 $L^{2}$ 就是它的舞台。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8', 'Roman, Advanced Linear Algebra, Ch. 11']
    },
    {
      id: 'cor.spectral-normal',
      cluster: 'algebra.inner',
      type: 'corollary',
      label: '谱定理（复正规）',
      title: '推论：复正规算子可酉对角化',
      regions: ['algebra'],
      tags: ['推论', '线性代数', '内积', '谱'],
      statement: [
        '设 $V$ 是有限维**复**内积空间，$T : V \\to V$ **正规**（$T^{\\ast}T = TT^{\\ast}$）。则存在 $V$ 的**标准正交基**使 $T$ 是对角阵：',
        '',
        '$$T = U \\Lambda\\, U^{\\dagger}, \\qquad U^{\\dagger}U = I,\\ \\Lambda = \\operatorname{diag}(\\lambda_1, \\ldots, \\lambda_n)$$',
        '',
        '并且：',
        '',
        '- $T$ 自伴 $\\iff$ 所有特征值**实**；',
        '- $T$ 酉 $\\iff$ 所有特征值**模长为 1**；',
        '- $T$ 是正交投影 $\\iff$ 特征值全在 $\\{0, 1\\}$ 中且 $T$ 自伴。'
      ].join('\n'),
      notes: '⭐ 这三条「$T$ 的性质 $\\iff$ 特征值的性质」是谱定理最有用的副产品：把一个**算子**的问题翻译成一组**数**的问题。\n\n⭐ 复正规是实对称与实正交的共同推广：只要在复域上做，两者都能对角化；在实数域上就只能对对称的那些做。\n\n⚠ 投影那条只在**自伴**时成立：一般的幂等算子（射影）不能酉对角化。',
      refs: ['Roman, Advanced Linear Algebra, Ch. 11']
    },
    {
      id: 'def.quadratic-form',
      cluster: 'algebra.inner',
      type: 'definition',
      label: '二次型',
      title: '二次型与正定性',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '内积'],
      statement: [
        '设 $A \\in M_n(\\mathbb{R})$ 对称。由它给出的函数',
        '',
        '$$q(x) := x^{\\mathsf{T}} A\\, x = \\sum_{i, j} a_{ij}\\, x_i x_j \\in \\mathbb{R}, \\qquad x \\in \\mathbb{R}^{n}$$',
        '',
        '叫**二次型**（它是 $x$ 的二次齐次函数）。称 $q$（或 $A$）：',
        '',
        '- **正定**：$x \\ne 0 \\implies q(x) > 0$；',
        '- **半正定**：$x \\ne 0 \\implies q(x) \\ge 0$；',
        '- **负定** / **不定** 同理定义。',
        '',
        '由谱定理，$q$ 正定 $\\iff$ $A$ 的所有特征值为正 $\\iff$ 存在可逆 $P$ 使 $A = P^{\\mathsf{T}}P$（即 $A$ 与正定矩阵合同）。'
      ].join('\n'),
      notes: '⭐ 二次型是「内积」的**放宽版**：内积要求正定，二次型允许不定（甚至退化）。所以内积空间的一切几何结论在二次型里都要重新检查（「长度」可以是负的）。\n\n⭐ 正定二次型与内积一一对应（$\\langle u, v\\rangle := u^{\\mathsf{T}}Av$），而**每个内积空间都可以通过 Gram–Schmidt 变成标准欧氏空间** —— 这就是「正定 $\\implies$ 可由 $P^{\\mathsf{T}}P$ 实现」的含义。\n\n⭐ 不定二次型出现在相对论（Minkowski 度规）、Morse 理论（Hessian 的负惯性指数 = 临界点类型）里。',
      refs: ['Hoffman–Kunze, Linear Algebra, Ch. 8', 'Roman, Advanced Linear Algebra, Ch. 11']
    },
    {
      id: 'thm.sylvester-criterion',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: 'Sylvester 判据',
      title: '定理（Sylvester）：正定性 $\\iff$ 各阶顺序主子式为正',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '内积', '判别法'],
      statement: [
        '设 $A \\in M_n(\\mathbb{R})$ 对称。记 $D_k$ 为 $A$ 的**左上角** $k \\times k$ 子矩阵的行列式（**顺序主子式**）。则',
        '',
        '$$D_1 > 0,\\quad D_2 > 0,\\quad \\ldots,\\quad D_n > 0$$'
      ].join('\n'),
      notes: '⭐ 这是**最便宜**的正定性判据：只算 $n$ 个行列式（实际算时用消元法顺带得到），不必求特征值。\n\n⭐ 用途直接可见：多元微分里 $f$ 的 **Hessian 矩阵正定 $\\implies$ 局部极小**（`thm.second-derivative-test`）；线性代数里「$A$ 正定 $\\iff$ 存在 Cholesky 分解 $A = LL^{\\mathsf{T}}$」。\n\n⚠ 只能看**顺序**主子式（左上角那一串），不能只看「所有主子式」或随便挑几个。反过来：所有顺序主子式为正 $\\implies$ 正定，但如果只是「所有主子式非负」那只是半正定。',
      refs: ['Horn–Johnson, Matrix Analysis, Ch. 7']
    },
    {
      id: 'thm.svd',
      cluster: 'algebra.inner',
      type: 'theorem',
      label: '奇异值分解',
      title: '定理（SVD）：$A = U\\Sigma V^{\\mathsf{T}}$',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '内积', '谱'],
      statement: [
        '设 $A \\in M_{m \\times n}(\\mathbb{R})$（或 $\\mathbb{C}$），秩为 $r$。则存在正交（酉）矩阵 $U \\in M_m$、$V \\in M_n$ 与「对角」矩阵 $\\Sigma$（只有前 $r$ 个对角元非零）使',
        '',
        '$$A = U \\Sigma V^{\\dagger}, \\qquad \\Sigma = \\operatorname{diag}(\\sigma_1, \\ldots, \\sigma_r, 0, \\ldots), \\quad \\sigma_1 \\ge \\cdots \\ge \\sigma_r > 0$$',
        '',
        '$\\sigma_i$ 叫 $A$ 的**奇异值**，它们是 $A^{\\dagger}A$（或 $AA^{\\dagger}$）的特征值的平方根。'
      ].join('\n'),
      notes: '⭐ SVD 的几何读法：**任何线性映射 = 旋转/反射 $\\to$ 沿坐标轴拉伸 $\\to$ 再旋转/反射**。于是它把任意矩阵化成了「$U$ 与 $V$ 取好基之后」的对角形 —— 这是**等价**（$A \\mapsto PAQ$）分类的完整答案（对角元即奇异值，非零个数即秩）。\n\n⭐ 与谱定理的分工：谱定理处理**方形且自伴**（相似分类）；SVD 处理**任意形状**（等价分类）。前者要求 $m = n$ 且 $A^{\\ast} = A$，后者没有任何要求。\n\n⭐ 用途（数值线性代数里最重要的一条定理）：降秩逼近（Eckart–Young：截断到前 $k$ 个奇异值给出最优低秩逼近）、主成分分析、伪逆、条件数。',
      refs: ['Horn–Johnson, Matrix Analysis, Ch. 7', 'Roman, Advanced Linear Algebra, Ch. 11']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.vs-innerproduct',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'def.inner-product',
      note: '内积是加在向量空间上的**额外结构**：三条公理里的第一条就是「对第一变元线性」，它用的就是 $V$ 的运算。'
    },
    {
      id: 'dep.innerproduct-inducednorm',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.induced-norm',
      note: '范数定义为 $\\sqrt{\\langle v, v\\rangle}$，合法性来自内积的正定性。'
    },
    {
      id: 'dep.metric-inducednorm',
      kind: 'definition',
      definition: 'def.metric-space',
      usedBy: 'def.induced-norm',
      note: '内积空间的范数给出距离 $d(u,v) = \\|u - v\\|$，于是它自动是度量空间，分析那一侧的工具都能用。'
    },
    {
      id: 'dep.innerproduct-orthogonality',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.orthogonality',
      note: '正交就是「内积为零」——定义里只用到内积这一个词。'
    },
    {
      id: 'dep.orthogonality-orthocomplement',
      kind: 'definition',
      definition: 'def.orthogonality',
      usedBy: 'def.orthogonal-complement',
      note: '正交补是「与 $U$ 全体的正交向量之集」，所以要先有正交。'
    },
    {
      id: 'dep.orthocomplement-projection',
      kind: 'definition',
      definition: 'def.orthogonal-complement',
      usedBy: 'def.orthogonal-projection',
      note: '投影的定义用到了直和分解 $V = U \\oplus U^{\\perp}$，也就是正交补。'
    },
    {
      id: 'dep.innerproduct-operatoradjoint',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.operator-adjoint',
      note: '伴随算子的定义是一条内积恒等式，存在唯一性靠内积的完备性（Riesz 表示）。'
    },
    {
      id: 'dep.operatoradjoint-normal',
      kind: 'definition',
      definition: 'def.operator-adjoint',
      usedBy: 'def.normal-operator',
      note: '「正规」「自伴」「酉」三个词都是用伴随算子写的（$T^{\\ast}T = TT^{\\ast}$ 等）。'
    },
    {
      id: 'dep.innerproduct-isometry',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.isometry',
      note: '等距的定义就是保持内积（等价地保持范数）。'
    },
    {
      id: 'dep.quadraticform-sylvester',
      kind: 'definition',
      definition: 'def.quadratic-form',
      usedBy: 'thm.sylvester-criterion',
      note: 'Sylvester 判据判的是二次型的正定性，用的是它的系数矩阵。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.cauchy-schwarz',
      kind: 'implication',
      sources: ['def.inner-product', 'def.induced-norm'],
      target: 'thm.cauchy-schwarz',
      title: '内积的正定性 $\\implies$ Cauchy–Schwarz',
      proof: [
        '若 $v = 0$ 结论平凡。设 $v \\ne 0$，对一切 $t \\in K$ 有',
        '',
        '$$0 \\le \\|u - t v\\|^{2} = \\|u\\|^{2} - \\bar{t}\\langle u, v\\rangle - t\\,\\overline{\\langle u, v\\rangle} + |t|^{2}\\|v\\|^{2}$$',
        '',
        '取 $t := \\dfrac{\\langle v, u \\rangle}{\\|v\\|^{2}}$（则 $\\bar t = \\overline{\\langle v,u\\rangle}/\\|v\\|^{2} = \\langle u, v\\rangle/\\|v\\|^{2}$），代入整理得',
        '',
        '$$0 \\le \\|u\\|^{2} - \\frac{|\\langle u, v\\rangle|^{2}}{\\|v\\|^{2}} \\quad\\Longrightarrow\\quad |\\langle u, v\\rangle|^{2} \\le \\|u\\|^{2}\\|v\\|^{2}$$',
        '',
        '开方即得结论。',
        '',
        '**等号条件**：$\\|u - tv\\|^{2} = 0 \\iff u = tv$，即线性相关。∎',
        '',
        '由此也得三角不等式：$\\|u+v\\|^{2} = \\|u\\|^{2} + 2\\operatorname{Re}\\langle u,v\\rangle + \\|v\\|^{2} \\le \\|u\\|^{2} + 2\\|u\\|\\|v\\| + \\|v\\|^{2} = (\\|u\\|+\\|v\\|)^{2}$。'
      ].join('\n'),
      note: '证明的关键是「**对一切 $t$ 都非负**」：这给了一个关于 $t$ 的二次函数恒非负，于是它的判别式 $\\le 0$ —— 这正是 Cauchy–Schwarz。'
    },
    {
      id: 'imp.gram-schmidt',
      kind: 'implication',
      sources: ['def.orthogonality', 'def.orthogonal-projection'],
      target: 'thm.gram-schmidt',
      title: '正交性的定义 $\\implies$ Gram–Schmidt',
      proof: [
        '对 $j$ 归纳。$j = 1$ 时取 $e_1 := v_1 / \\|v_1\\|$（$v_1 \\ne 0$，因为线性无关）。',
        '',
        '归纳步：设已作出标准正交组 $e_1, \\ldots, e_{j-1}$，且它们张成 $\\operatorname{span}(v_1, \\ldots, v_{j-1})$。令',
        '',
        '$$w_j := v_j - \\sum_{i=1}^{j-1} \\langle e_i, v_j \\rangle\\, e_i, \\qquad e_j := \\frac{w_j}{\\|w_j\\|}$$',
        '',
        '1. **$\\langle e_k, w_j\\rangle = 0$（$k < j$）**：由 $\\langle e_k, e_i\\rangle = \\delta_{ki}$ 逐个消掉。',
        '2. **$w_j \\ne 0$**：否则 $v_j \\in \\operatorname{span}(e_1, \\ldots, e_{j-1}) = \\operatorname{span}(v_1, \\ldots, v_{j-1})$，与线性无关矛盾。',
        '3. 于是 $e_j$ 与前面的都正交，且 $\\|e_j\\| = 1$。',
        '4. **张成不变**：$v_j \\in \\operatorname{span}(e_1, \\ldots, e_j)$ 与 $e_j \\in \\operatorname{span}(v_1, \\ldots, v_j)$ 互相给出，故两个张成相等。∎',
        '',
        '有限维时对整组基做一遍，就得到标准正交基。'
      ].join('\n'),
      note: '第 1 步「逐个消掉」正是把 $v_j$ 减去它在每个已有方向上的分量 —— 这就是「正交化」这个词的字面意思。第 2 步用线性无关保证不会归零。'
    },
    {
      id: 'imp.projection-formula',
      kind: 'implication',
      sources: ['def.orthogonal-projection', 'thm.gram-schmidt'],
      target: 'thm.projection-formula',
      title: '正交投影 + 标准正交基 $\\implies$ 最佳逼近与显式公式',
      proof: [
        '**显式公式**：设 $(e_1, \\ldots, e_k)$ 是 $U$ 的标准正交基，令 $u := \\sum_i \\langle e_i, v\\rangle e_i \\in U$。则对每个 $j$，',
        '',
        '$$\\langle e_j, v - u\\rangle = \\langle e_j, v\\rangle - \\sum_i \\langle e_i, v\\rangle\\,\\langle e_j, e_i\\rangle = \\langle e_j, v\\rangle - \\langle e_j, v\\rangle = 0$$',
        '',
        '故 $v - u \\perp U$，即 $u = P_U v$。',
        '',
        '**最佳逼近**：对任意 $u\' \\in U$，由 $v - P_U v \\perp U$ 与 $P_U v - u\' \\in U$ 得（勾股定理）',
        '',
        '$$\\|v - u\'\\|^{2} = \\|v - P_U v\\|^{2} + \\|P_U v - u\'\\|^{2} \\ge \\|v - P_U v\\|^{2}$$',
        '',
        '等号仅当 $P_U v = u\'$。',
        '',
        '**Bessel**：把 $v = P_U v + (v - P_U v)$ 用勾股定理，并注意 $\\|P_U v\\|^{2} = \\sum_i |\\langle e_i, v\\rangle|^{2}$（对标准正交组合直接展开）。∎'
      ].join('\n'),
      note: '证明里「$v - P_Uv \\perp U$ 且 $P_Uv - u\' \\in U$」这两条是勾股定理能用的全部理由 —— 也是「正交投影」比一般射影好的地方。'
    },
    {
      id: 'imp.spectral-theorem',
      kind: 'implication',
      sources: ['def.normal-operator', 'thm.diagonalizable', 'thm.evt', 'def.orthogonal-complement'],
      target: 'thm.spectral-theorem',
      title: '自伴性 + 紧性 $\\implies$ 谱定理（实对称）',
      proof: [
        '设 $T$ 是有限维实内积空间上的自伴算子。',
        '',
        '1. **存在实特征值**：单位球面 $S := \\{v : \\|v\\| = 1\\}$ 是紧集，函数 $f(v) := \\langle Tv, v\\rangle$ 连续，故在某点 $v_0$ 取到最大值 $\\lambda$（**最值定理**）。用 Lagrange 乘子（或直接对 $v_0$ 附近扰动求导）可得 $Tv_0 = \\lambda v_0$：即在约束 $\\|v\\|^{2} = 1$ 下 $f$ 的极值点满足 $\\nabla f = \\lambda \\nabla(\\|v\\|^{2})$，而两个梯度分别是 $2Tv_0$ 与 $2v_0$。于是 $\\lambda$ 是特征值，且由 $\\lambda = \\langle Tv_0, v_0\\rangle \\in \\mathbb{R}$ 知它是实数。',
        '2. **特征子空间的不变性**：$U := E_\\lambda$ 是 $T$-不变的；由**自伴性**，$U^{\\perp}$ 也是 $T$-不变的：若 $w \\perp U$，则对 $u \\in U$，$\\langle u, Tw\\rangle = \\langle Tu, w\\rangle = \\langle \\lambda u, w\\rangle = \\lambda\\langle u, w\\rangle = 0$，即 $Tw \\perp U$。',
        '3. **归纳**：$T|_{U^{\\perp}}$ 仍自伴，对 $\\dim U^{\\perp} < \\dim V$ 用归纳假设，得 $U^{\\perp} = E_{\\lambda_2}\\oplus\\cdots$（两两正交）。于是 $V = E_{\\lambda} \\oplus U^{\\perp}$ 是所有特征子空间的正交直和。',
        '4. 在每个 $E_{\\lambda_i}$ 里取标准正交基（Gram–Schmidt），拼起来就是 $V$ 的标准正交基，$T$ 在其中是对角阵。∎'
      ].join('\n'),
      note: '第 1 步是**分析输入**（紧集上连续函数取最值），第 2 步是**自伴性唯一**被用到的地方。这也解释了为什么谱定理在实情形必须要求对称：没有自伴性，$U^{\\perp}$ 不必不变，归纳断掉。'
    },
    {
      id: 'imp.spectral-normal',
      kind: 'implication',
      sources: ['thm.spectral-theorem', 'def.normal-operator'],
      target: 'cor.spectral-normal',
      title: '实谱定理 + 复化 $\\implies$ 复正规可酉对角化',
      proof: [
        '1. **自伴的情形**：复自伴算子（Hermite）的实谱定理版本：把 $V$ 看作实向量空间，$T$ 作为实算子是实对称的，由上一条得到实特征值与正交分解；再把实结构复化即得复情形。',
        '2. **正规的情形**：$T$ 正规时写 $T = A + iB$，其中 $A := (T + T^{\\ast})/2$、$B := (T - T^{\\ast})/(2i)$ 都自伴；正规性等价于 $AB = BA$（直接展开 $T^{\\ast}T = TT^{\\ast}$ 即得）。',
        '3. 由 $AB = BA$，它们**同时**可正交对角化：对 $A$ 的每个特征子空间 $E_\\lambda$，由 $AB = BA$ 得 $B(E_\\lambda) \\subseteq E_\\lambda$；在 $E_\\lambda$ 上对 $B$ 用实谱定理（同理复化），把所有这样的标准正交基拼起来即得。',
        '4. 于是 $T$ 在同一组标准正交基下对角（对角元 $\\lambda_j + i\\mu_j$）。',
        '5. **三条等价**：由对角形直接读出 —— $T^{\\ast} = T \\iff$ 所有对角元实；$T$ 酉 $\\iff |\\lambda|=1$；投影 $\\iff$ 特征值 $\\in\\{0,1\\}$ 且自伴。∎'
      ].join('\n'),
      note: '第 2 步的「正规 $\\iff$ $AB$ 交换」是这条推论的核心：**复正规算子 = 一对交换的自伴算子**，于是问题化归到实谱定理。'
    },
    {
      id: 'imp.sylvester',
      kind: 'implication',
      sources: ['def.quadratic-form', 'thm.spectral-theorem'],
      target: 'thm.sylvester-criterion',
      title: '谱定理 $\\implies$ Sylvester 判据',
      proof: [
        '设 $A$ 实对称。',
        '',
        '**($\\Longleftarrow$)** 设所有顺序主子式 $D_k > 0$。对 $k$ 归纳证明 $A$ 的前 $k$ 阶主子矩阵正定：$k = 1$ 显然（$a_{11} = D_1 > 0$）。归纳步：把 $A_k$ 分块 $\\begin{pmatrix} A_{k-1} & b \\\\ b^{\\mathsf{T}} & a_{kk}\\end{pmatrix}$，由 $D_{k} = D_{k-1}\\cdot(a_{kk} - b^{\\mathsf{T}}A_{k-1}^{-1}b) > 0$（**分块行列式公式**）与归纳假设 $D_{k-1} > 0$ 得 Schur 补 $a_{kk} - b^{\\mathsf{T}}A_{k-1}^{-1}b > 0$；由 Schur 补正定 $\\implies A_k$ 正定。',
        '',
        '**($\\implies$)** 若 $A$ 正定，则每个左上角主子矩阵 $A_k$ 也正定（对 $A_k$ 上的 $x$ 补零得 $x^{\\mathsf{T}}A_kx = \\tilde x^{\\mathsf{T}}A\\tilde x > 0$）。由谱定理 $A_k = Q\\Lambda Q^{\\mathsf{T}}$（$\\Lambda$ 对角且对角元 $> 0$），故 $D_k = \\det A_k = \\prod_i \\lambda_i > 0$。∎'
      ].join('\n'),
      note: '两个方向的分量不同：($\\Longleftarrow$) 是**归纳 + Schur 补**（纯代数），($\\implies$) 用的是**谱定理**（特征值全正 $\\implies$ 行列式为正）。'
    },
    {
      id: 'imp.svd',
      kind: 'implication',
      sources: ['thm.spectral-theorem', 'def.operator-adjoint'],
      target: 'thm.svd',
      title: '谱定理 $\\implies$ 奇异值分解',
      proof: [
        '设 $A \\in M_{m \\times n}(\\mathbb{R})$，秩 $r$。',
        '',
        '1. $A^{\\mathsf{T}}A \\in M_n$ 是**对称半正定**的（$x^{\\mathsf{T}}A^{\\mathsf{T}}Ax = \\|Ax\\|^{2} \\ge 0$），故由谱定理存在标准正交基 $v_1, \\ldots, v_n$ 与 $\\lambda_1 \\ge \\cdots \\ge \\lambda_n \\ge 0$ 使 $A^{\\mathsf{T}}A v_i = \\lambda_i v_i$。',
        '2. 令 $\\sigma_i := \\sqrt{\\lambda_i}$，设 $\\sigma_1 \\ge \\cdots \\ge \\sigma_r > 0 = \\sigma_{r+1} = \\cdots$。对 $i \\le r$ 令 $u_i := A v_i / \\sigma_i$，则 $\\|u_i\\| = 1$ 且 $\\langle u_i, u_j\\rangle = \\delta_{ij}$（用 $\\langle Av_i, Av_j\\rangle = \\lambda_j\\delta_{ij}$）。',
        '3. 把 $u_1, \\ldots, u_r$ 扩充成 $\\mathbb{R}^{m}$ 的标准正交基 $u_1, \\ldots, u_m$；把 $v_1, \\ldots, v_n$ 补全成标准正交基。则 $Av_i = \\sigma_i u_i$（$i \\le r$）且 $Av_i = 0$（$i > r$，因为 $\\|Av_i\\|^{2} = \\lambda_i = 0$）。',
        '4. 以 $v_i$ 为定义域基、$u_i$ 为值域基写出矩阵：$A$ 在这两组基下是 $\\Sigma = \\operatorname{diag}(\\sigma_1, \\ldots, \\sigma_r, 0, \\ldots)$，即 $A = U\\Sigma V^{\\mathsf{T}}$。∎'
      ].join('\n'),
      note: '关键观察只有一条：**$A^{\\mathsf{T}}A$ 半正定** —— 于是谱定理给出正交的特征基，而 $A$ 把这组基送到一组正交向量上（差伸缩 $\\sigma_i$）。SVD 的全部内容就是这个观察的坐标化。'
    },
    {
      id: 'dep.bilinearform-quadraticform',
      kind: 'definition',
      definition: 'def.bilinear-form',
      usedBy: 'def.quadratic-form',
      note: '对称双线性型 $B$ 与二次型 $q$ 由极化恒等式互相确定（$2B(u, v) = q(u + v) - q(u) - q(v)$），所以二次型是「对称双线性型的对角化写法」。'
    }
  ]
});
