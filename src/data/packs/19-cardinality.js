/* ==========================================================================
   内容包 · 基数与等势（集合的「大小」）
   --------------------------------------------------------------------------
   体检时这块最大：等势/基数相关的说法出现在 64 个节点里，却一个节点都没有 ——
   可数、Cantor 定理、良序定理的推论、Hartogs 数全都在用它。

   落点：集合论星系。幂集归「集合的构造」（它就是一个构造），
   等势 / 基数与几条定理归「关系与选择」（比较大小靠的是双射）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '基数与等势',
  nodes: [

    /* ------------------------------------------------------------ 幂集 */
    {
      id: 'def.power-set',
      cluster: 'set.construct',
      type: 'definition',
      label: '幂集 𝒫(X)',
      title: '幂集（Power Set）',
      regions: ['set-theory'],
      tags: ['定义', '幂集'],
      statement: [
        '设 $X$ 是集合。$X$ 的**幂集**是「$X$ 的全部子集」装成的集合：',
        '',
        '$$\\mathcal{P}(X) := \\{ A : A \\subseteq X \\}$$',
        '',
        '于是 $A \\in \\mathcal{P}(X) \\iff A \\subseteq X$，且 $\\mathcal{P}(X)$ 自己的元素都是集合。',
        '',
        '由**幂集公理**，$\\mathcal{P}(X)$ 确实是集合；由外延公理它唯一。',
        '',
        '有限情形的元素个数：$|X| = n \\implies |\\mathcal{P}(X)| = 2^{n}$（每个元素「取或不取」）。'
      ].join('\n'),
      notes: '⭐ 幂集是「把性质变成对象」的那一步：想谈「$X$ 的所有子集」这件事本身（而不是逐个谈），就得有幂集。$\\mathcal{P}(X)$ 同时是几个重要构造的舞台：\n- 外测度定义在**全体子集**上：$\\mu^* : \\mathcal{P}(X) \\to [0, +\\infty]$；\n- 环、$\\sigma$-代数、单调类都是 $\\mathcal{P}(X)$ 的某一族子集；\n- 生成的 $\\sigma$-代数取的就是「一切包含 $\\mathcal{E}$ 的 $\\sigma$-代数之交」，而 $\\mathcal{P}(X)$ 保证这个交不空。\n\n⚠ $\\emptyset \\in \\mathcal{P}(X)$ 且 $X \\in \\mathcal{P}(X)$ 对一切 $X$ 成立 —— 幂集从来不是空的。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ---------------------------------------------------------- 等势 */
    {
      id: 'def.equinumerous',
      cluster: 'set.cardinal',
      type: 'definition',
      label: '等势',
      title: '等势（Equinumerous）',
      regions: ['set-theory'],
      tags: ['定义', '基数'],
      statement: [
        '集合 $A$ 与 $B$ **等势**（记 $|A| = |B|$ 或 $A \\approx B$），当且仅当存在**双射**',
        '',
        '$$f : A \\to B$$',
        '',
        '「等势」是集合之间的一种等价关系：自反（恒等映射）、对称（逆映射）、传递（合成）。'
      ].join('\n'),
      notes: '⭐ 这是**比较大小的正确方式**：不去数个数（无限集数不完），而是问「能不能一一配对」。\n\n经典结果：\n- $\\mathbb{N}$ 与 $\\mathbb{Q}$、$\\mathbb{N} \\times \\mathbb{N}$ 都等势（可数）；\n- $(0, 1)$ 与 $\\mathbb{R}$ 等势（$x \\mapsto \\tan \\pi(x - 1/2)$ 之类）；\n- $\\mathbb{N}$ 与 $\\mathbb{R}$ **不等势**（Cantor 定理）。\n\n⚠ $A \\subseteq B$ 与「等势」无关：$\\mathbb{N} \\subset \\mathbb{Q}$ 但两者等势 —— 这正是无限集与有限集的分界（Dedekind 的刻画：与某个真子集等势 $\\iff$ 无限）。',
      refs: ['Kunen, Set Theory, I.6']
    },

    /* ---------------------------------------------------------- 基数 */
    {
      id: 'def.cardinal',
      cluster: 'set.cardinal',
      type: 'definition',
      label: '基数 |A|',
      title: '基数与基数的比较（Cardinality）',
      regions: ['set-theory'],
      tags: ['定义', '基数'],
      statement: [
        '等势把「所有集合」分成一个个类。「集合 $A$ 的**基数**」$|A|$ 指的就是 $A$ 所在的这个等势类 —— 它衡量 $A$ 有多大，而不关心 $A$ 的元素是什么。',
        '',
        '比较两个基数：',
        '',
        '- $|A| \\le |B|$：存在**单射** $A \\to B$；',
        '- $|A| = |B|$：存在**双射** $A \\to B$（等势）；',
        '- $|A| < |B|$：$|A| \\le |B|$ 但 $|A| \\ne |B|$。',
        '',
        '若 $|A| \\le |B|$ 且 $|B| \\le |A|$，则 $|A| = |B|$（Schröder–Bernstein 定理）。'
      ].join('\n'),
      notes: '⭐ 记号的用法：$|\\mathbb{N}| = \\aleph_0$（可数无限），$|\\mathbb{R}| = 2^{\\aleph_0}$，且 $\\aleph_0 < 2^{\\aleph_0}$。\n\n⚠ 严格说来「等势类」不是集合（它是真类），所以 ZFC 里的通行做法是：先有**序数**，再用良序定理（$\\iff$ AC）取每个等势类里最小的那个序数作代表，那个序数就叫基数。\n> 本星图只用到「$|A| \\le |B|$ 靠单射、$|A| = |B|$ 靠双射」这两件事 —— 它们不需要选代表就能用。\n\n⚠ 任意两个基数**不一定可比**，这正是**基数可比定理**（要用 AC）的内容。',
      refs: ['Kunen, Set Theory, I.6']
    },

    /* --------------------------------------------------- Cantor 定理 */
    {
      id: 'thm.cantor',
      cluster: 'set.cardinal',
      type: 'theorem',
      label: 'Cantor 定理',
      title: 'Cantor 定理：$|A| < |\\mathcal{P}(A)|$',
      regions: ['set-theory'],
      tags: ['定理', '基数', '对角线'],
      statement: [
        '对任意集合 $A$：',
        '',
        '$$|A| < |\\mathcal{P}(A)|$$',
        '',
        '也就是说：**不存在**从 $A$ 到 $\\mathcal{P}(A)$ 的满射（当然也不存在双射），但 $a \\mapsto \\{a\\}$ 是单射。'
      ].join('\n'),
      notes: '⭐ 推论：**没有最大的基数** —— 从任何集合出发，取幂集就得到更大的。于是\n\n$$\\aleph_0 < 2^{\\aleph_0} < 2^{2^{\\aleph_0}} < \\cdots$$\n\n取 $A = \\mathbb{N}$ 就得到「$\\mathbb{R}$ 不可数」（$|\\mathbb{R}| = 2^{\\aleph_0}$）。\n\n证明用的是**对角线法**（见边的证明）：那个「对角集」$D = \\{ a \\in A : a \\notin f(a) \\}$ 不在 $f$ 的像里。这是数学史上最会产定理的一个构造，往后 Cantor–Bernstein、Gödel 不完备定理、停机问题用的都是它。',
      refs: ['Kunen, Set Theory, I.6']
    },

    /* --------------------------------------------- Schröder–Bernstein */
    {
      id: 'thm.schroder-bernstein',
      cluster: 'set.cardinal',
      type: 'theorem',
      label: 'Schröder–Bernstein 定理',
      title: 'Schröder–Bernstein 定理',
      regions: ['set-theory'],
      tags: ['定理', '基数'],
      statement: [
        '若存在单射 $f : A \\to B$ 与单射 $g : B \\to A$，则存在**双射** $A \\to B$，即',
        '',
        '$$|A| \\le |B| \\ \\text{且}\\ |B| \\le |A| \\implies |A| = |B|$$'
      ].join('\n'),
      notes: '⭐ 它的价值在于**省事**：要证两个集合等势，只要各造一个方向的单射，不必显式写出那个双射。（对比：Cantor 定理的另一条路 —— 有单射无满射 —— 用的是对称的说法。）\n\n⚠ 它**不需要**选择公理：证明是构造性的（见边的证明），这也是它比「任意两个基数可比」好用的地方。',
      refs: ['Kunen, Set Theory, I.6']
    },

    /* ---------------------------------------------------- 基数可比定理 */
    {
      id: 'thm.cardinal-comparable',
      cluster: 'set.cardinal',
      type: 'theorem',
      label: '基数可比定理',
      title: '基数可比定理（需要选择公理）',
      regions: ['set-theory'],
      tags: ['定理', '基数', '选择'],
      statement: [
        '在**选择公理**下：对任意两个集合 $A$、$B$，必有',
        '',
        '$$|A| \\le |B| \\quad \\text{或} \\quad |B| \\le |A|$$',
        '',
        '即任意两个基数都可以比较大小。'
      ].join('\n'),
      notes: '⭐ 这条是「基数排序」的许可证：没有它，连「$A$ 比 $B$ 大」这句话都可能毫无意义。\n\n证明路线（见边）：**良序定理**把 $A$、$B$ 都良序化 $\\to$ 对应的序数可以比较 $\\to$ 于是有一个方向能放进单射。所以这条定理与 AC、良序定理是同一件事的三种说法。\n\n⚠ 没有 AC 时确实有不可比的基数（Jech, *The Axiom of Choice*）。',
      refs: ['Jech, The Axiom of Choice, Ch. 3']
    }
  ],

  edges: [

    /* ------------------------------------------------------ 依赖 */
    {
      id: 'dep.subset-powerset',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.power-set',
      note: '幂集的元素就是**子集**：$A \\in \\mathcal{P}(X) \\iff A \\subseteq X$。'
    },
    {
      id: 'dep.bijection-equinumerous',
      kind: 'definition',
      definition: 'def.bijection',
      usedBy: 'def.equinumerous',
      note: '等势的定义就是「存在**双射**」。'
    },
    {
      id: 'dep.equinumerous-cardinal',
      kind: 'definition',
      definition: 'def.equinumerous',
      usedBy: 'def.cardinal',
      note: '基数就是等势类：先有「等势」，才谈得上「$A$ 有多大」。'
    },
    {
      id: 'dep.equinumerous-countable',
      kind: 'definition',
      definition: 'def.equinumerous',
      usedBy: 'def.countable',
      note: '可数 = 与 $\\mathbb{N}$ **等势**；至多可数 = 能单射进 $\\mathbb{N}$。'
    },
    {
      id: 'dep.cardinal-cantor',
      kind: 'definition',
      definition: 'def.cardinal',
      usedBy: 'thm.cantor',
      note: '「$|A| < |\\mathcal{P}(A)|$」是一个关于**基数**的比较。'
    },
    {
      id: 'dep.powerset-cantor',
      kind: 'definition',
      definition: 'def.power-set',
      usedBy: 'thm.cantor',
      note: '定理讲的就是 $A$ 与它的**幂集**的大小关系。'
    },
    {
      id: 'dep.bijection-sb',
      kind: 'definition',
      definition: 'def.bijection',
      usedBy: 'thm.schroder-bernstein',
      note: '前提与结论都由**单射 / 双射**写成。'
    },
    {
      id: 'dep.cardinal-comparable-thm',
      kind: 'definition',
      definition: 'def.cardinal',
      usedBy: 'thm.cardinal-comparable',
      note: '「任意两个基数可比」是关于**基数**的命题。'
    },

    /* -------------------------------------------- 幂集进了谁的定义 */
    {
      id: 'dep.powerset-generated-sigma',
      kind: 'definition',
      definition: 'def.power-set',
      usedBy: 'def.generated-sigma',
      note: '「$\\mathcal{E} \\subseteq \\mathcal{P}(X)$」「一切包含 $\\mathcal{E}$ 的 $\\sigma$-代数之交」都要在**幂集**里取。'
    },
    {
      id: 'dep.powerset-outer-measure',
      kind: 'definition',
      definition: 'def.power-set',
      usedBy: 'def.outer-measure',
      note: '外测度定义在**全体子集**上：$\\mu^* : \\mathcal{P}(X) \\to [0, +\\infty]$。'
    },

    /* ------------------------------------------------ 带证明的推出 */
    {
      id: 'imp.cantor',
      kind: 'implication',
      sources: ['def.power-set'],
      target: 'thm.cantor',
      title: '幂集 $\\implies$ Cantor 定理（对角线法）',
      proof: [
        '**① $|A| \\le |\\mathcal{P}(A)|$。** 映射 $a \\mapsto \\{a\\}$ 是单射：$\\{a\\} = \\{a\'\\} \\implies a = a\'$。',
        '',
        '**② 不存在满射 $f : A \\to \\mathcal{P}(A)$。** 反设存在。令',
        '',
        '$$D := \\{ a \\in A : a \\notin f(a) \\}$$',
        '',
        '这是 $A$ 的一个子集，所以 $D \\in \\mathcal{P}(A)$。由满射性，存在 $a_0 \\in A$ 使 $f(a_0) = D$。',
        '',
        '**③ 矛盾。** 看 $a_0$ 属不属于 $D$：',
        '',
        '- 若 $a_0 \\in D$：由 $D$ 的定义 $a_0 \\notin f(a_0) = D$，矛盾；',
        '- 若 $a_0 \\notin D = f(a_0)$：那么 $a_0$ 满足「$a \\notin f(a)$」，按定义又该有 $a_0 \\in D$，矛盾。',
        '',
        '两边都不成立，故不存在满射。结合 ① 得 $|A| < |\\mathcal{P}(A)|$。$\\blacksquare$',
        '',
        '> $D$ 之所以叫「对角集」：把 $A$ 排成行、把 $\\mathcal{P}(A)$ 排成列，「$a \\in f(a)$」是一张表，$D$ 取的是这张表的**对角线**再逐格取反。'
      ].join('\n')
    },
    {
      id: 'imp.schroder-bernstein',
      kind: 'implication',
      sources: ['def.bijection'],
      target: 'thm.schroder-bernstein',
      title: '两个方向的单射 $\\implies$ 双射',
      proof: [
        '设 $f : A \\to B$、$g : B \\to A$ 都是单射。把 $A$ 分成两半，一半用 $f$、一半用 $g^{-1}$，拼出一个双射。',
        '',
        '**① 造一串集合。** 令',
        '',
        '$$A_0 := A \\setminus g(B), \\qquad A_{n+1} := g(f(A_n))$$',
        '',
        '（直观：$A_0$ 是「$B$ 管不到」的那部分，剩下的在 $f$ 与 $g$ 之间来回倒。）令',
        '',
        '$$A^{*} := \\bigcup_{n=0}^{\\infty} A_n, \\qquad A^{\\sharp} := A \\setminus A^{*}$$',
        '',
        '**② 定义 $h : A \\to B$。**',
        '',
        '$$h(a) := \\begin{cases} f(a), & a \\in A^{*} \\\\ g^{-1}(a), & a \\in A^{\\sharp} \\end{cases}$$',
        '',
        '要说明：$a \\in A^{\\sharp}$ 时 $a \\in g(B)$，所以 $g^{-1}(a)$ 有意义。事实上若 $a \\notin g(B)$ 则 $a \\in A_0 \\subseteq A^{*}$，与 $a \\in A^{\\sharp}$ 矛盾。',
        '',
        '**③ $h$ 是单射。** 分三种情况：同在 $A^{*}$ 上由 $f$ 单射；同在 $A^{\\sharp}$ 上由 $g$ 单射；一边一个时，$h(A^{*}) = f(A^{*})$ 而',
        '',
        '$$f(A^{*}) = \\bigcup_{n} f(A_n) = \\bigcup_{n} g^{-1}(A_{n+1}) \\subseteq g^{-1}(A^{*} \\setminus A_0)$$',
        '',
        '与 $h(A^{\\sharp}) = g^{-1}(A^{\\sharp})$ 不相交 —— 因为 $A^{\\sharp} \\cap (A^{*} \\setminus A_0) = \\emptyset$。',
        '',
        '**④ $h$ 是满射。** 若 $b \\in B$：令 $a = g(b) \\in A$。若 $a \\in A^{\\sharp}$，则 $h(a) = g^{-1}(a) = b$；若 $a \\in A^{*}$，则 $a \\in A_n$ 对某个 $n \\ge 1$（因为 $a = g(b)$ 落在 $g(B)$ 里），于是 $a = g(f(a\'))$ 对某个 $a\' \\in A_{n-1} \\subseteq A^{*}$，由 $g$ 单射得 $f(a\') = b$，即 $h(a\') = b$。',
        '',
        '综上 $h$ 是双射，故 $|A| = |B|$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.cardinal-comparable',
      kind: 'implication',
      sources: ['thm.wellordering'],
      target: 'thm.cardinal-comparable',
      title: '良序定理 $\\implies$ 任意两个基数可比',
      proof: [
        '设 $A$、$B$ 是任意两个集合。',
        '',
        '**① 良序化。** 由**良序定理**，$A$ 上有一个良序 $\\preceq_A$、$B$ 上有一个良序 $\\preceq_B$。',
        '',
        '**② 换成序数。** 每个良序集序同构于唯一的一个序数，记作 $\\alpha$、$\\beta$。于是只需比较两个序数。',
        '',
        '**③ 序数可比。** 对任意两个序数 $\\alpha$、$\\beta$，总有 $\\alpha \\in \\beta$、$\\alpha = \\beta$、$\\beta \\in \\alpha$ 三者之一成立（这一步是序数理论的基本事实，用的是良序性）。',
        '',
        '- 若 $\\alpha \\subseteq \\beta$：序同构给出单射 $A \\to B$，于是 $|A| \\le |B|$；',
        '- 若 $\\beta \\subseteq \\alpha$：同理 $|B| \\le |A|$。',
        '',
        '所以必有 $|A| \\le |B|$ 或 $|B| \\le |A|$。$\\blacksquare$',
        '',
        '> 反过来说：**基数可比定理 $\\implies$ 良序定理**（取 $A$、$B$ 中能单射进另一个的那个方向，可以良序化较小的集合，再把良序搬到较大集合上）。所以它与 AC、良序定理、佐恩引理是同一件事。'
      ].join('\n')
    }
  ]
});
