/* ============================================================================
   内容包 · Galois 补漏（2026-11-03，加团后的团体检发现）
   ----------------------------------------------------------------------------
   来源：`bun _tools/_cluster_audit.mjs algebra.galois` 报出的四类问题，逐条处理：

   ① **承诺了但没有节点**：`def.algebraic-extension` 的注里用 $\overline{\mathbb{Q}}$ 举例、
      `thm.radical-solvable` 的路线里要「$n$ 次单位根与 Kummer 理论」——
      **代数闭包**与**单位根**这两个概念图里都没有。本包补上（顺带补两条对外连线）。
   ② **同词不同物没有连线**：`def.minimal-poly`（**算子**的极小多项式，algebra.spectral）
      的注里写着「域论里的代数元的极小多项式本图未单独收录」—— 那句话现在过期了，
      而两者其实是**同一套论证**（$\{p : p(\alpha) = 0\}$ 是理想，取首一生成元）。
      连一条 `analogy` 边，并改掉过期的注。
   ③ **该有边没有边**：`thm.galois-correspondence` 出边 0（基本定理居然没人用它），
      而 `thm.radical-solvable` 的路线第一句就是「靠伽罗瓦对应」；`thm.quintic-unsolvable`
      用 `def.solvable-group` 也只是在正文里提了一句。
   ④ **反引号 = 承诺有连线**：几处只是「顺带提及」却用了反引号（`def.normal-subgroup`、
      `prop.sn-solvable`、`thm.quintic-unsolvable` 在别的节点里）。这批把它们降成普通文字，
      免得读者点进去发现没有关系。

   ⚠️ 本包**只补**，不改任何已发布陈述的数学内容。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: 'Galois 补漏：代数闭包、单位根与三类漏边',

  nodes: [
    {
      id: 'def.algebraically-closed',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '代数闭域',
      title: '代数闭域：每个非常数多项式都分解成一次因子',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '域 $K$ 叫**代数闭**的，如果 $K[x]$ 中每个**非常数**多项式都在 $K[x]$ 中分解成一次因子的乘积' +
          '（等价地：每个非常数 $f \\in K[x]$ 在 $K$ 中有根）。',
        '',
        '若 $\\overline{F}/F$ 是代数扩张且 $\\overline{F}$ 代数闭，则称 $\\overline{F}$ 是 $F$ 的**代数闭包**。',
      ].join('\n'),
      notes: [
        '⭐ **$\\mathbb{C}$ 是代数闭的**，这就是代数基本定理（`thm.fundamental-algebra`）：' +
          '$\\mathbb{C} = \\mathbb{R}(i)$ 是 $\\mathbb{R}$ 的代数闭包。而 $\\overline{\\mathbb{Q}}$（$\\mathbb{Q}$ 在 $\\mathbb{C}$ 中的代数闭包）' +
          '是**代数扩张但次数无限**的典型例子 —— 这也正是「代数 $\\ne$ 有限」的出处。',
        '⭐ **代数闭包的存在性要靠选择**：把 $F$ 上所有首一不可约多项式排成良序，逐个模掉、' +
          '归纳地造出一串扩张，再用 **Zorn 引理**取并（并仍是域，且代数）。' +
          '所以「每个域都有代数闭包」这条定理在图上的位置很特别：它是**域论里少见的需要 AC 的存在性定理**。',
        '⚠ **代数闭包在同构意义下唯一**（都是 $F$ 的代数扩张且代数闭），但**不唯一到唯一同构** —— ' +
          '例如 $\\mathbb{Q}(\\sqrt{2})$ 的两个嵌入可以走到 $\\overline{\\mathbb{Q}}$ 里两个不同的位置。',
        '📌 与 Galois 的关系：$\\overline{F}/F$ 一般**不是**有限扩张，所以它不是伽罗瓦扩张（基本定理要求有限）。' +
          '它的「伽罗瓦群」是 profinite 群 $\\operatorname{Gal}(\\overline{F}/F)$，要做无穷版本的理论。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. V §2', 'Hungerford, Algebra, Ch. V §3'],
    },

    {
      id: 'def.roots-of-unity',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '单位根',
      title: '$n$ 次单位根与分圆多项式 $\\Phi_{n}$',
      regions: ['algebra', 'complex'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '设 $n \\ge 1$。多项式 $x^{n} - 1$ 在 $\\mathbb{C}$ 中的根叫 **$n$ 次单位根**：',
        '',
        '$\\mu_{n} := \\{\\, \\zeta \\in \\mathbb{C} : \\zeta^{n} = 1 \\,\\} = \\{\\, e^{2\\pi i k/n} : k = 0, 1, \\ldots, n-1 \\,\\}.$',
        '',
        '它在乘法下构成一个 $n$ 阶**循环群**。其中**本原**的那些（阶恰为 $n$）有 $\\varphi(n)$ 个，' +
          '以它们为根的首一多项式',
        '',
        '$\\Phi_{n}(x) := \\prod_{\\zeta \\text{ 本原}} (x - \\zeta)$',
        '',
        '叫**第 $n$ 个分圆多项式**，它整系数、不可约（Gauss），且 $x^{n} - 1 = \\prod_{d \\mid n} \\Phi_{d}(x)$。',
      ].join('\n'),
      notes: [
        '⭐ **它为什么在 Galois 那条线上**：用根式解方程时，最后一步是「开 $n$ 次方」，' +
          '而开方在域里的样子正是「添加一个 $n$ 次单位根之后，$x^{n} - a$ 的根可以写成 $\\sqrt[n]{a}\\cdot\\zeta^{k}$」。' +
          '所以**根式可解 $\implies$ 可解**那个方向必须先把 $\\mu_{n}$ 加进来（`thm.radical-solvable` 的路线里提到过）。',
        '⭐ **$\\Phi_{n}$ 的伽罗瓦群是 $(\\mathbb{Z}/n)^{\\times}$**（每个 $\\sigma$ 由 $\\zeta \\mapsto \\zeta^{k}$ 决定，' +
          '$k$ 与 $n$ 互素）—— 这是「伽罗瓦群可以是任何有限阿贝尔群」的第一次亮相（Kronecker–Weber 的起点）。',
        '⭐ **$\\mu_{n} \\subseteq \\mathbb{Q}$ 只有 $n = 1, 2$**：$n \\ge 3$ 时 $\\zeta$ 不是有理数。' +
          '所以「添加单位根」是真的扩张，不是形式上的。',
        '⚠ **本图没有「分圆域 $\\mathbb{Q}(\\zeta_{n})$」节点**：那是这条线的下一步（它的伽罗瓦群' +
          '与分圆多项式一起构成一个完整例子），留作后续。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §3', 'Stewart, Galois Theory, Ch. 13'],
    },
  ],

  edges: [
    /* ---------- 代数闭包：域论 + 选择 ---------- */
    {
      id: 'dep.fieldext-algclosed',
      kind: 'definition',
      definition: 'def.field-extension',
      usedBy: 'def.algebraically-closed',
      note: '代数闭包是「代数扩张 + 代数闭」两条一起说的，先要有扩张。',
    },
    {
      id: 'dep.zorn-algclosed',
      kind: 'definition',
      definition: 'lem.zorn',
      usedBy: 'def.algebraically-closed',
      note: '**存在性**要 Zorn 引理：把「已经造好的代数扩张」按包含排成偏序集，取全序链的并，' +
        '再用 Zorn 取极大元（极大元必代数闭，否则还能再扩）。⚠ 这是域论里少见的「需要 AC 的存在性定理」。',
    },
    {
      id: 'dep.complex-algclosed',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.algebraically-closed',
      note: '$\\mathbb{C}$ 是代数闭域的**第一个例子**（代数基本定理），$\\overline{\\mathbb{Q}}$ 在里面取。',
    },
    {
      id: 'dep.fundamentalgebra-algclosed',
      kind: 'definition',
      definition: 'thm.fundamental-algebra',
      usedBy: 'def.algebraically-closed',
      note: '$\\mathbb{C}$ 代数闭**就是**代数基本定理的内容：既然每个复系数多项式都有根，就能逐个除掉一次因子。',
    },
    /* ---------- 单位根：复数 + 循环群 + 多项式环 + Euler 函数 ---------- */
    {
      id: 'dep.complex-rootsofunity',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.roots-of-unity',
      note: '$n$ 次单位根是 $\\mathbb{C}$ 里的点：$e^{2\\pi i k/n}$。',
    },
    {
      id: 'dep.cyclic-rootsofunity',
      kind: 'definition',
      definition: 'def.cyclic-group',
      usedBy: 'def.roots-of-unity',
      note: '$\\mu_{n}$ 在乘法下是 $n$ 阶**循环群**；分圆多项式的伽罗瓦群是 $(\\mathbb{Z}/n)^{\\times}$。',
    },
    {
      id: 'dep.polyring-rootsofunity',
      kind: 'definition',
      definition: 'def.polynomial-ring',
      usedBy: 'def.roots-of-unity',
      note: '单位根是 $x^{n} - 1$ 的根；分圆多项式 $\\Phi_{n}$ 是 $\\mathbb{Q}[x]$ 里的对象。',
    },
    {
      id: 'dep.eulerphi-rootsofunity',
      kind: 'definition',
      definition: 'def.euler-phi',
      usedBy: 'def.roots-of-unity',
      note: '本原 $n$ 次单位根恰有 $\\varphi(n)$ 个，所以 $\\deg \\Phi_{n} = \\varphi(n)$。',
    },
    {
      id: 'dep.rootsofunity-radical',
      kind: 'definition',
      definition: 'def.roots-of-unity',
      usedBy: 'thm.radical-solvable',
      note: '根式可解 $\\implies$ 可解那条路线必须**先添加 $n$ 次单位根**（否则开方写不出来）。',
    },
    /* ---------- ③ 该有边没有边 ---------- */
    {
      id: 'dep.correspondence-radical',
      kind: 'definition',
      definition: 'thm.galois-correspondence',
      usedBy: 'thm.radical-solvable',
      note: '「根式塔 $\\leftrightarrow$ 群塔」的翻译**全靠基本定理**：每添加一次开方对应一个循环扩张，' +
        '域塔对应子群链、正规性对应正规子群，于是域的可解性变成群的可解性。',
    },
    {
      id: 'dep.solvable-quintic',
      kind: 'definition',
      definition: 'def.solvable-group',
      usedBy: 'thm.quintic-unsolvable',
      note: '「$S_{5}$ 不可解」这句话用的是群论的可解（`def.solvable-group`）；' +
        '此前这条只在正文里提了一句、没有连线。',
    },
    {
      id: 'dep.algext-separable',
      kind: 'definition',
      definition: 'def.algebraic-extension',
      usedBy: 'def.separable-extension',
      note: '可分性是**代数扩张**的性质（超越扩张上「极小多项式」都无从谈起）。',
    },
    /* ---------- ② 同词不同物：算子的极小多项式 $\\leftrightarrow$ 代数元的极小多项式 ---------- */
    {
      kind: 'analogy',
      a: 'def.minimal-poly',
      b: 'def.algebraic-element',
      title: '两个「极小多项式」：零化一个算子 vs 零化一个元素',
      note: [
        '写法**一模一样**：取 $\\{\\, p : p(\\text{对象}) = 0 \\,\\}$，验证它是 $K[x]$ 的**非零理想**，' +
          '再由 $K[x]$ 是主理想整环取**首一生成元**。',
        '- 算子的（`def.minimal-poly`）：对象是线性算子 $T$，非零理由来自 Cayley–Hamilton（$\\chi_{T}$ 零化 $T$）；',
        '- 元素的（`def.algebraic-element`）：对象是扩域里的 $\\alpha$，非零理由来自「代数」这个前提本身。',
        '⚠ 别混：$\\mu_{T}$ 的**次数**刻画算子的可对角化性；$m_{\\alpha}$ 的**次数**是 $[F(\\alpha):F]$。' +
          '同一个名字、同一套论证、完全不同的用途 —— 这类同名不同物只能用类比边，不能连依赖。',
      ].join('\n\n'),
    },
    /* ---------- Galois 群 $\\leftrightarrow$ 基本群：Grothendieck 的那条桥 ---------- */
    {
      kind: 'analogy',
      a: 'def.galois-group',
      b: 'def.fundamental-group',
      title: 'Galois 群与基本群：覆盖空间版的伽罗瓦理论',
      note: [
        '同一个形状在两个世界里出现：',
        '- 域这边：$K/F$ 的**中间域** $\\leftrightarrow$ $\\operatorname{Gal}(K/F)$ 的**子群**（伽罗瓦对应）；',
        '- 空间这边：$X$ 的**覆盖空间** $\\leftrightarrow$ $\\pi_{1}(X)$ 的**子群**（覆盖空间分类）。',
        '两边都是「**反序**双射」，连正规性的对应都一样：域那边「中间域正规 $\\iff$ 子群正规」，' +
          '空间那边「覆盖是正规（伽罗瓦）覆盖 $\\iff$ 子群正规」。',
        '⭐ 这不是巧合：Grothendieck 的伽罗瓦理论把两者**统一**成「有限 étale 代数 $\\leftrightarrow$ 有限 $\\pi_{1}$-集」，' +
          '域扩张成了「一点上的覆盖」。本图没有那套范畴机器（étale 只到层论那一层），所以这里只能记类比。',
        '⛔ 不能连 definition/implication：一边是域，一边是拓扑空间，没有谁是谁的前提。',
      ].join('\n\n'),
    },
  ],
});
