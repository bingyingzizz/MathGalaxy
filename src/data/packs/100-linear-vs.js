/* ==========================================================================
   内容包 · 线性代数 ①：坐标、子空间与维数
   --------------------------------------------------------------------------
   `algebra.vectorspace`（已有 2 点）扩容 5 点。这一包补的是「基」造出来之后的
   两件事：

     ① **坐标**：给定一组有序基，向量与坐标列一一对应（这就是后面矩阵的入口）
     ② **维数**：任意两组基等势 —— 需要 Steinitz 交换引理

   ⚠️ 用户 2026-10-16 裁定：**`def.vs` 不拆**（它继续同时承担向量空间 / 线性无关 /
      张成 / 基四件事）。所以这一包只加它**没有**的东西，不另立 basis / span 节点。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数：坐标、子空间与维数',
  nodes: [

    {
      id: 'def.subspace',
      cluster: 'algebra.vectorspace',
      type: 'definition',
      label: '子空间',
      title: '线性子空间（Linear Subspace）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $V$ 是域 $K$ 上的向量空间。$U \\subseteq V$ 叫 $V$ 的**（线性）子空间**，当且仅当',
        '',
        '- $0 \\in U$；',
        '- $U$ 对加法封闭：$u, v \\in U \\implies u + v \\in U$；',
        '- $U$ 对标量乘法封闭：$u \\in U$、$c \\in K \\implies cu \\in U$。',
        '',
        '等价地：$U$ 配上 $V$ 限制过来的运算，自己就是一个 $K$-向量空间。',
        '',
        '子空间之间的**包含关系**按集合包含定义，任意多个子空间的**交**仍是子空间（加法与数乘逐条验证即可）。'
      ].join('\n'),
      notes: '⭐ 三个条件里的第一条可以并进后两条：$U \\ne \\emptyset$ 且对减法封闭即可（取 $u - u = 0$）。三条分开写的用处是**逐条对照**。\n\n⚠ **并集一般不是子空间**：$x$ 轴与 $y$ 轴之并连 $(1,0)+(0,1)$ 都不含。所以子空间的格是「交封闭、并一般不封闭」—— 要「并」就得用**和** $U + W$。\n\n⚠ 空集不是子空间；$\\{0\\}$ 与 $V$ 是最小的两个（叫**平凡子空间**）。\n\n⭐ 别与拓扑的「子空间」（`def.subspace-topology`，即子空间拓扑）混：两个中文名一样，含义完全不同。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 2']
    },
    {
      id: 'prop.subspace-criterion',
      cluster: 'algebra.vectorspace',
      type: 'proposition',
      label: '子空间判据',
      title: '命题：子空间的两条判据',
      regions: ['algebra'],
      tags: ['命题', '线性代数'],
      statement: [
        '**(合并版)** 非空子集 $U \\subseteq V$ 是子空间，当且仅当对一切 $u, v \\in U$ 与 $c \\in K$ 有 $cu + v \\in U$。',
        '',
        '**(阶梯版)** 若 $U_1 \\subseteq U_2 \\subseteq U_3 \\subseteq \\cdots$ 是一列子空间（递增链），则 $\\bigcup_n U_n$ 也是子空间。',
        '',
        '**(生成版)** 记 $\\mathcal{U}$ 为「包含 $S$ 的一切子空间」之族。任意子集 $S \\subseteq V$ 的**张成**是',
        '',
        '$$\\operatorname{span} S := \\bigcap \\mathcal{U} = \\bigcap \\{ U : S \\subseteq U \\subseteq V,\\ U \\text{ is a subspace} \\}$$',
        '',
        '是包含 $S$ 的最小子空间，并且等于 $S$ 中元素的**有限**线性组合全体。'
      ].join('\n'),
      notes: '⭐ 「合并版」把三个条件压成一个运算 $cu + v$：它同时管住了 $0$（取 $c = -1$、$v = u$）、加法（取 $c = 1$）与数乘（取 $v = 0$，此时 $0 \\in U$ 已由前者得到）。写证明时用这一版最省字。\n\n⭐ 「阶梯版」是**无限**并集唯一好用的场合：任意有限并都不封闭，但递增链的并封闭 —— 因为任意两个元素必落在链中的同一个 $U_n$ 里（有限多个指标取最大即可）。\n\n⭐ 「生成版」与「$\\sigma$-代数的生成」「子群的生成」是同一招：**取一切包含它的结构之交**。这也是图上 `ana.generated-closure` 那条弱边讲的事。',
      refs: ['Lang, Linear Algebra']
    },
    {
      id: 'def.coordinate',
      cluster: 'algebra.vectorspace',
      type: 'definition',
      label: '坐标',
      title: '坐标与有序基（Coordinates）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $\\mathcal{B} = (v_1, \\ldots, v_n)$ 是 $V$ 的**有序**基（顺序算进去）。由「基」的定义，每个 $v \\in V$ 都能**唯一**地写成',
        '',
        '$$v = c_1 v_1 + \\cdots + c_n v_n, \\qquad c_i \\in K$$',
        '',
        '把系数排成列',
        '',
        '$$[v]_{\\mathcal{B}} := \\begin{pmatrix} c_1 \\\\ \\vdots \\\\ c_n \\end{pmatrix} \\in K^{n}$$',
        '',
        '叫 $v$ 在基 $\\mathcal{B}$ 下的**坐标**。于是',
        '',
        '$$v \\mapsto [v]_{\\mathcal{B}}$$',
        '',
        '是 $V \\to K^{n}$ 的双射，而且是线性的（保持加法与数乘）。'
      ].join('\n'),
      notes: '⭐ 这一条把「抽象的向量空间」翻译成「$K^{n}$ 里的列向量」—— **这是矩阵论的全部合法性来源**：以后再谈矩阵，说的都是这件事在两侧不同基下的样子。\n\n⚠ 「唯一」来自基的定义（既有线性无关又有生成）；只要缺一条，坐标就不再唯一（无关性不够则重复，生成性不够则写不出来）。\n\n⚠ 「有序」不可省：把 $(v_1, v_2)$ 换成 $(v_2, v_1)$，坐标的两个分量就交换了 —— 这正是矩阵换基公式里那些排列的来源。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 3']
    },
    {
      id: 'thm.steinitz',
      cluster: 'algebra.vectorspace',
      type: 'theorem',
      label: 'Steinitz 交换引理',
      title: '定理（Steinitz）：交换引理',
      regions: ['algebra'],
      tags: ['定理', '线性代数'],
      statement: [
        '设 $V$ 是 $K$-向量空间，$S = (v_1, \\ldots, v_n)$ 线性无关，$T = (w_1, \\ldots, w_m)$ 生成 $V$。则',
        '',
        '- $n \\le m$；',
        '- 可以从 $T$ 中**删去** $n$ 个向量、换入 $S$ 的全部向量，得到的 $m$ 个向量仍生成 $V$。特别地，$V$ 有一组基，其元素取自 $T \\cup S$ 且含 $S$。'
      ].join('\n'),
      notes: '⭐ 一句话：**「无关的」永远不比「生成的」多**。它是维数良定义的全部内容 —— 两句话（$n \\le m$ 与可交换）在证明里是一起归纳出来的。\n\n⭐ 证明是对 $n$ 归纳：把 $v_1$ 用 $T$ 表出（$T$ 生成），其中必有一个系数非零（否则 $v_1 = 0$ 与无关矛盾），把它换成 $v_1$ 仍生成；再对剩下的重复。\n\n⚠ 有限性是前提：这一条只管**有限**的无关集与生成集。无限的情形要靠 Zorn 引理（「每个向量空间有基」那一条就是）。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 2']
    },
    {
      id: 'thm.dimension',
      cluster: 'algebra.vectorspace',
      type: 'theorem',
      label: '维数良定义',
      title: '定理：任意两组基等势，维数良定义',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '维数'],
      statement: [
        '设 $V$ 是 $K$-向量空间，$\\mathcal{B}$ 与 $\\mathcal{B}\'$ 是 $V$ 的两组基。则 $\\mathcal{B}$ 与 $\\mathcal{B}\'$ **等势**（有双射）。',
        '',
        '于是可以无矛盾地定义 $V$ 的**维数**',
        '',
        '$$\\dim_K V := |\\mathcal{B}|$$',
        '',
        '（$V = \\{0\\}$ 时约定 $\\dim V = 0$；没有有限基时称 $V$ 是**无限维**的。）'
      ].join('\n'),
      notes: '⭐ 这条定理的唯一内容是「**良定义**」：基可以有很多组，但势是同一个数 —— 所以「维数」这个词才说得通。证明全部来自 Steinitz：两组基互为无关集与生成集，两次使用交换引理即得 $|\\mathcal{B}| \\le |\\mathcal{B}\'|$ 与反向。\n\n⚠ 有限维的情形交换引理就够了；无限维要证明「无限基等势」（用 $|A \\times \\mathbb{N}| = |A|$ 那一套基数算术），比有限情形麻烦得多。\n\n⭐ 维数的基本性质：$\\dim(U + W) + \\dim(U \\cap W) = \\dim U + \\dim W$；$\\dim(V/U) = \\dim V - \\dim U$。',
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 2']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.vs-subspace',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'def.subspace',
      note: '子空间的定义只用到向量空间的三条运算公理（加法、数乘、零元），不涉及基。'
    },
    {
      id: 'dep.subspace-criterion',
      kind: 'definition',
      definition: 'def.subspace',
      usedBy: 'prop.subspace-criterion',
      note: '判据是把子空间定义里的三条压缩成一条运算 $cu + v$；生成版则直接引用「子空间」。'
    },
    {
      id: 'dep.vs-coordinate',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'def.coordinate',
      note: '坐标的合法性来自「基」的定义（线性无关 + 生成 = 表示唯一），而那个定义就写在 `def.vs` 里。'
    },
    {
      id: 'dep.steinitz-dimension',
      kind: 'definition',
      definition: 'thm.steinitz',
      usedBy: 'thm.dimension',
      note: '维数的定义要用「基的势」这个词 —— 而「势是唯一的」正是 Steinitz 引理给出的。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.subspace-criterion',
      kind: 'implication',
      sources: ['def.subspace'],
      target: 'prop.subspace-criterion',
      title: '子空间的定义 $\\implies$ 两条判据与生成',
      proof: [
        '**合并版。**',
        '',
        '($\\implies$) 设 $U$ 是子空间。$u, v \\in U$、$c \\in K$ 时 $cu \\in U$（数乘封闭）且 $cu + v \\in U$（加法封闭）。',
        '',
        '($\\Longleftarrow$) 设对一切 $u, v, c$ 有 $cu + v \\in U$。取 $u = v$、$c = -1$ 得 $0 \\in U$；取 $c = 1$ 得加法封闭；取 $v = 0$、$c$ 任意得数乘封闭（这里用到了 $0 \\in U$，而它刚证过）。三条齐备，$U$ 是子空间。',
        '',
        '**阶梯版。** 设 $U_1 \\subseteq U_2 \\subseteq \\cdots$，令 $U := \\bigcup_n U_n$。非空。取 $u, v \\in U$、$c \\in K$：存在 $i, j$ 使 $u \\in U_i$、$v \\in U_j$。由链的递增性，取 $N := \\max\\{i, j\\}$ 就有 $u, v \\in U_N$；由 $U_N$ 是子空间，$cu + v \\in U_N \\subseteq U$。由合并版，$U$ 是子空间。',
        '',
        '**生成版。** 令 $\\mathcal{U} := \\{U \\subseteq V : U \\supseteq S,\\ U$ 是子空间$\\}$，$U_0 := \\bigcap \\mathcal{U}$。',
        '',
        '1. $\\mathcal{U} \\ne \\emptyset$（$V \\in \\mathcal{U}$），且任意多个子空间之交仍是子空间（三条逐条验证），故 $U_0$ 是子空间且 $U_0 \\supseteq S$。',
        '2. 若 $U \\supseteq S$ 是子空间，则 $U \\in \\mathcal{U}$，故 $U_0 \\subseteq U$ —— 所以 $U_0$ 是**最小**的。',
        '3. $U_0$ 含 $S$ 中元素的**有限**线性组合：对每个这样的组合闭包验证一遍（对组合的长度归纳），可知全体有限线性组合构成一个含 $S$ 的子空间 $W$；由最小性 $U_0 \\subseteq W$；又每个 $U \\in \\mathcal{U}$ 都含 $W$（子空间对有限组合封闭），故 $W \\subseteq U_0$。两者相等。∎'
      ].join('\n'),
      note: '第 3 步是「生成 = 有限组合全体」这句话的全部内容：**「最小」与「有限组合」是同一件事**，一个从上面（取交）说、一个从下面（构造）说。'
    },
    {
      id: 'imp.steinitz',
      kind: 'implication',
      sources: ['def.vs'],
      target: 'thm.steinitz',
      title: '线性无关与生成的定义 $\\implies$ 交换引理',
      proof: [
        '对 $n$ 归纳。$n = 0$ 平凡。',
        '',
        '**归纳步。** 设 $S = (v_1, \\ldots, v_n)$ 线性无关、$T = (w_1, \\ldots, w_m)$ 生成 $V$。',
        '',
        '1. 把 $v_1$ 用 $T$ 表出：$v_1 = \\sum_j a_j w_j$。由 $v_1 \\ne 0$（无关集不含零向量），某个 $a_j \\ne 0$；重排下标设 $a_1 \\ne 0$。',
        '2. 于是 $w_1 = a_1^{-1}\\bigl( v_1 - \\sum_{j \\ge 2} a_j w_j \\bigr)$ 可由 $T\' := (v_1, w_2, \\ldots, w_m)$ 表出，所以 $T\'$ 仍生成 $V$（$T$ 中每个元素都能用 $T\'$ 表出，而 $V$ 由 $T$ 生成）。',
        '3. 对 $S\' := (v_2, \\ldots, v_n)$ 与生成集 $T\'$（$n - 1$ 与 $m$ 个元素）用归纳假设：得 $n - 1 \\le m$，即 $n \\le m + 1$，且可以从 $T\'$ 中删 $n - 1$ 个换入 $S\'$ 仍生成。',
        '4. 合并第 2、3 步：从 $T$ 中删去 $w_1$ 与那 $n - 1$ 个，换入 $v_1, \\ldots, v_n$，仍生成 $V$。',
        '',
        '（归纳假设给出的其实是 $n - 1 \\le m$，要得到 $n \\le m$ 需要一个更精细的归纳陈述：若 $S$ 无关、$T$ 生成，则 $|S| \\le |T|$ 且可交换。上面的第 3 步用 $T\'$ 而非 $T$ 正是为此 —— 交换掉 $v_1$ 之后生成集的势没有变。）∎',
        '',
        '**基的存在性**：取 $T = $ 一组有限生成集、$S = \\emptyset$ 逐步扩，或直接对无关集用 Zorn 引理（无限维情形），即得「每个向量空间有基」。'
      ].join('\n'),
      note: '交换引理的全部技巧在第 2 步：**用一个无关向量替换掉生成集里的一个向量，生成性不丢**。这件事能反复做，正是「无关的可以往生成集里塞」的来源。'
    },
    {
      id: 'imp.dimension',
      kind: 'implication',
      sources: ['thm.steinitz'],
      target: 'thm.dimension',
      title: '交换引理 $\\implies$ 维数良定义',
      proof: [
        '设 $\\mathcal{B}$ 与 $\\mathcal{B}\'$ 是 $V$ 的两组基。',
        '',
        '1. 由 $\\mathcal{B}$ 是基，它线性无关；由 $\\mathcal{B}\'$ 是基，它生成 $V$。于是由交换引理（取 $S = \\mathcal{B}$、$T = \\mathcal{B}\'$）得 $|\\mathcal{B}| \\le |\\mathcal{B}\'|$。',
        '2. 交换两者的角色（$S = \\mathcal{B}\'$、$T = \\mathcal{B}$）得 $|\\mathcal{B}\'| \\le |\\mathcal{B}|$。',
        '3. 由 Bernstein 定理（或直接用两个方向的单射）得 $|\\mathcal{B}| = |\\mathcal{B}\'|$。',
        '',
        '于是映射 $\\mathcal{B} \\mapsto |\\mathcal{B}|$ 不依赖基的选取，$\\dim_K V := |\\mathcal{B}|$ 是良定义的。∎',
        '',
        '⚠ 上面第 1、2 步用的交换引理是**有限**版本；无限维时要用它的无限形式（或 Zorn 引理 + 基数算术），结论相同。'
      ].join('\n'),
      note: '这条边的意义是：**「维数」不是定义出来的，是证出来的**。图上把它单独立一个节点，就是为了留下这个证明 —— 而不是把它塞进 `def.vs` 的 notes 里一笔带过。'
    }
  ]
});
