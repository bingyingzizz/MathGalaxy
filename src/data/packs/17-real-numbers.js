/* ==========================================================================
   内容包 · 实数与区间（分析学的地基）
   --------------------------------------------------------------------------
   星图原来直接从 ZFC 跳到测度：$\mathbb{R}$、区间、极限、连续、导数
   一个定义都没写，正文里却到处在用（体检：$\mathbb{R}$ 出现在 25 个节点里、
   区间 22 个、极限 30 个）。这一包把这块补上 —— 它就是「分析学从哪儿学起」
   的那一层。

   落点：新星团 analysis.real（实数与区间）。它造出的东西是
        「实数这根数轴 + 轴上做极限的那套语言」，
   后面测度、积分、微分全都踩在它上面。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '实数与区间',
  nodes: [

    /* ------------------------------------------------------------ 实数 */
    /* ⚠️ 实数系 ℝ 的节点**不在这里** —— 它是构造出来的（有理 Cauchy 列模去零列），
       跟着它的构造链一起放在 `21-number-systems.js` 的星团 `set.numbers`。
       这一包只管 ℝ 造出来之后在它上面做的事：区间、确界、极限、级数、连续、导数、复数。 */
    {
      id: 'def.extended-real',
      cluster: 'analysis.real',
      type: 'definition',
      label: '扩充实数 [−∞,+∞]',
      title: '扩充实数系 $\\overline{\\mathbb{R}}$',
      regions: ['analysis'],
      tags: ['定义', '实数'],
      statement: [
        '在 $\\mathbb{R}$ 上添两个记号 $+\\infty$、$-\\infty$，得到**扩充实数系**',
        '',
        '$$\\overline{\\mathbb{R}} := \\mathbb{R} \\cup \\{ -\\infty, +\\infty \\}$$',
        '',
        '规定 $-\\infty < x < +\\infty$ 对一切 $x \\in \\mathbb{R}$ 成立，于是 $\\overline{\\mathbb{R}}$ 仍是全序集；并约定',
        '',
        '$$x + (\\pm\\infty) = \\pm\\infty, \\qquad 0 \\cdot (\\pm\\infty) = 0$$',
        '',
        '而 $\\infty - \\infty$ 与 $\\infty / \\infty$ **不定义**。'
      ].join('\n'),
      notes: '为什么需要它：测度、积分的取值天然可以是 $\\infty$（$\\mathbb{R}$ 的 Lebesgue 测度就是 $\\infty$），把所有量都放进 $\\overline{\\mathbb{R}}$，收敛定理（sup、极限）就不必反复讨论「值是不是有限」。\n\n⚠ 约定 $0 \\cdot \\infty = 0$ 是刻意的：它让「在无穷测度集上取 $0$ 的函数」积分为 $0$。\n⚠ 它不是域：$\\infty$ 没有加法逆元。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1']
    },

    /* ------------------------------------------------------------ 区间 */
    {
      id: 'def.interval',
      cluster: 'analysis.real',
      type: 'definition',
      label: '区间',
      title: '区间',
      regions: ['analysis', 'order-theory'],
      tags: ['定义', '实数'],
      statement: [
        '$\\mathbb{R}$ 的**区间**是满足下式的子集 $I$：',
        '',
        '$$a, b \\in I,\\ a \\le x \\le b \\implies x \\in I$$',
        '',
        '即「中间不空」。常见的有界区间写成',
        '',
        '$$(a, b), \\quad [a, b], \\quad [a, b), \\quad (a, b]$$',
        '',
        '按端点是否取到区分；另有 $(-\\infty, b)$、$(a, +\\infty)$、$\\mathbb{R}$ 等无界区间，以及单点集 $[a, a]$。',
        '',
        '体积就是长度：$m((a, b]) = b - a$。'
      ].join('\n'),
      notes: '⭐ **半开区间 $\\{ (a, b] : a < b \\}$ 是构造 Lebesgue–Stieltjes 测度时的起点**：它本身只是一个基本类，做有限不交并就得到环，长度在那个环上已经是预测度。\n\n为什么要用半开而不是开区间：不交并的长度好算 —— $[a, b) \\sqcup [b, c) = [a, c)$ 在开区间上不成立。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 2']
    },

    /* ---------------------------------------------------------- 数列极限 */
    {
      id: 'def.sequence-limit',
      cluster: 'analysis.real',
      type: 'definition',
      label: '数列极限',
      title: '数列极限 $x_n \\to x$',
      regions: ['analysis'],
      tags: ['定义', '极限'],
      statement: [
        '数列 $\\{x_n\\} \\subseteq \\mathbb{R}$ **收敛到** $x$（记 $x_n \\to x$ 或 $\\lim_{n \\to \\infty} x_n = x$），当且仅当',
        '',
        '$$\\forall \\varepsilon > 0, \\exists N, \\forall n \\ge N : |x_n - x| < \\varepsilon$$',
        '',
        '即：不管给出多小的 $\\varepsilon$，从某一项之后，所有项都落在 $x$ 的 $\\varepsilon$ 邻域里。',
        '',
        '不收敛的数列叫**发散**。'
      ].join('\n'),
      notes: '⭐ 这就是「$\\varepsilon$-$N$ 语言」：把「越来越近」翻译成可以逐条检验的条件。整个分析学的证明都建立在这个格式上。\n\n基本性质（都由定义直接验证）：\n- 极限**唯一**；\n- 收敛数列**有界**；\n- 四则运算与极限可交换（分母极限非零时）。\n\n⚠ 「有界」不保证收敛（$(-1)^n$）；「$\\varepsilon$ 固定、$N$ 往后」的顺序不能换。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'def.series',
      cluster: 'analysis.real',
      type: 'definition',
      label: '级数收敛',
      title: '级数 $\\sum a_n$',
      regions: ['analysis'],
      tags: ['定义', '极限'],
      statement: [
        '给定数列 $\\{a_n\\}$，令**部分和** $s_N := \\sum_{n=1}^{N} a_n$。',
        '',
        '称级数 $\\sum_{n=1}^{\\infty} a_n$ **收敛**，当且仅当部分和数列 $\\{s_N\\}$ 收敛，此时记',
        '',
        '$$\\sum_{n=1}^{\\infty} a_n := \\lim_{N \\to \\infty} s_N$$',
        '',
        '**非负项级数**（$a_n \\ge 0$）特别干净：部分和递增，于是',
        '',
        '$$\\sum_{n=1}^{\\infty} a_n = \\sup_N s_N \\in [0, +\\infty]$$',
        '',
        '一定有意义（可能是 $+\\infty$）。'
      ].join('\n'),
      notes: '⭐ 测度的**可数可加**、积分的**逐项**性质，用的都是非负项级数这一行：非负就不必担心条件收敛与重排。\n\n⚠ 收敛级数**可以重排**的只有绝对收敛的情形；条件收敛的级数重排后可能收敛到别的值（Riemann 重排定理）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },

    /* ------------------------------------------------------- 连续与导数 */
    {
      id: 'def.continuous',
      cluster: 'analysis.real',
      type: 'definition',
      label: '连续',
      title: '连续',
      regions: ['analysis', 'topology'],
      tags: ['定义', '极限', '连续'],
      statement: [
        '$f : \\mathbb{R} \\to \\mathbb{R}$ 在 $x_0$ **连续**，当且仅当',
        '',
        '$$\\forall \\varepsilon > 0, \\exists \\delta > 0 : |x - x_0| < \\delta \\implies |f(x) - f(x_0)| < \\varepsilon$$',
        '',
        '等价说法：$\\lim_{x \\to x_0} f(x) = f(x_0)$（极限存在且等于函数值）。',
        '',
        '$f$ **连续**（在 $\\mathbb{R}$ 上连续）当且仅当它在每一点连续。',
        '',
        '**一致连续**是更强的要求：$\\delta$ 只依赖 $\\varepsilon$，不依赖 $x_0$。'
      ].join('\n'),
      notes: '⭐ 把 $|x - x_0| < \\delta$、$|f(x) - f(x_0)| < \\varepsilon$ 换成距离 $d$，这个定义原封不动地搬到距离空间 —— 这也正是距离空间的定义为什么长成那样。\n\n⚠ **连续 $\\ne$ 一致连续**：$f(x) = x^2$ 在 $\\mathbb{R}$ 上连续但不一致连续（$x$ 越大需要的 $\\delta$ 越小）。紧区间上两者才重合。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'def.derivative',
      cluster: 'analysis.real',
      type: 'definition',
      label: '导数',
      title: '导数 $F\'$',
      regions: ['analysis'],
      tags: ['定义', '导数'],
      statement: [
        '$F : (a, b) \\to \\mathbb{C}$ 在 $x_0 \\in (a, b)$ **可导**，当且仅当极限',
        '',
        '$$F\'(x_0) := \\lim_{h \\to 0} \\frac{F(x_0 + h) - F(x_0)}{h}$$',
        '',
        '存在（有限）。这个数叫 $F$ 在 $x_0$ 的**导数**。',
        '',
        '在 $(a, b)$ 上处处可导，就得到一个函数 $F\'$；称 $F$ **可导**。',
        '',
        '若不要求极限存在而允许 $\\pm\\infty$，得到的是**广义导数**，单调函数的导数理论要用它。'
      ].join('\n'),
      notes: '⭐ 微分理论关心的是**逐点**行为，所以定义域常常收缩到 $L^1_{loc}$ 而不是 $L^1$。\n\n要点（本星图 BV / AC 那一段全靠它们）：\n- 可导 $\\implies$ 连续，反之不成立（$|x|$ 在 $0$ 处）。\n- 单调函数**几乎处处可导**，且 $F\' \\ge 0$ a.e.。\n- 可导**不保证** $F(b) - F(a) = \\int_a^b F\'$（Cantor 函数就是反例）；等式成立要加绝对连续。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'def.complex',
      cluster: 'set.numbers',
      type: 'definition',
      label: '复数 ℂ',
      title: '复数系 $\\mathbb{C}$',
      regions: ['analysis', 'algebra'],
      tags: ['定义', '复数'],
      statement: [
        '**复数系** $\\mathbb{C} := \\mathbb{R}^2$，配以下运算：',
        '',
        '$$(a, b) + (c, d) := (a + c, b + d), \\qquad (a, b)(c, d) := (ac - bd, ad + bc)$$',
        '',
        '记 $i := (0, 1)$，则每个复数唯一地写成 $z = a + bi$（$a, b \\in \\mathbb{R}$）。',
        '',
        '$\\bar{z} := a - bi$ 是**共轭**，$|z| := \\sqrt{a^2 + b^2}$ 是**模**；并且',
        '',
        '$$|zw| = |z|\\,|w|, \\qquad z \\bar{z} = |z|^2$$',
        '',
        '于是每个 $z \\ne 0$ 都有逆 $z^{-1} = \\bar{z}/|z|^2$：$\\mathbb{C}$ 是一个域。'
      ].join('\n'),
      notes: '⭐ $\\mathbb{C}$ 与 $\\mathbb{R}^2$ 的区别只在乘法 —— 而正是这个乘法让 $\\mathbb{C}$ 成为**代数闭域**（每个多项式都有根），也让复值函数的积分理论比实值情形简洁：$|f|$ 与 $L^p$ 理论的表述不必再分正负部。\n\n⚠ **$\\mathbb{C}$ 是有序域之外的东西**：它上面**没有**与运算相容的全序。若不然，由 $1 = 1^2 > 0$ 得 $-1 < 0$；可是 $i \\ne 0$，而有序域里**平方元非负**，$i^2 = -1$ 应当 $\\ge 0$ —— 矛盾。\n\n本星图里 $\\mathbb{C}$ 主要出现在两处：复值函数的积分（拆实部虚部）、复测度（取值在 $\\mathbb{C}$ 里，自动有限）。',
      refs: ['Rudin, Real and Complex Analysis, Ch. 1']
    }
  ],

  edges: [

    /* ------------------------------------------- 实数内部：谁依赖谁 */
    {
      id: 'dep.real-extended',
      kind: 'definition',
      definition: 'def.real',
      usedBy: 'def.extended-real',
      note: '扩充实数就是在 $\\mathbb{R}$ 上添两个记号。'
    },
    {
      id: 'dep.real-interval',
      kind: 'definition',
      definition: 'def.real',
      usedBy: 'def.interval',
      note: '区间是 $\\mathbb{R}$ 的全序 $\\le$ 说出来的：端点之间的都算数。'
    },
    {
      id: 'dep.real-sequence',
      kind: 'definition',
      definition: 'def.real',
      usedBy: 'def.sequence-limit',
      note: '极限里的 $|x_n - x| < \\varepsilon$ 用的是实数的绝对值与序。'
    },
    {
      id: 'dep.real-series',
      kind: 'definition',
      definition: 'def.sequence-limit',
      usedBy: 'def.series',
      note: '级数收敛 = 部分和这个**数列**收敛。'
    },
    {
      id: 'dep.real-continuous',
      kind: 'definition',
      definition: 'def.sequence-limit',
      usedBy: 'def.continuous',
      note: '连续的定义就是「$x \\to x_0$ 时 $f(x) \\to f(x_0)$」——极限的语言。'
    },
    {
      id: 'dep.real-derivative',
      kind: 'definition',
      definition: 'def.sequence-limit',
      usedBy: 'def.derivative',
      note: '导数是一个**极限**：差商的极限。'
    },
    {
      id: 'dep.continuous-derivative',
      kind: 'definition',
      definition: 'def.continuous',
      usedBy: 'def.derivative',
      note: '可导 $\\implies$ 连续：这一点由导数的定义直接推出来。'
    },
    {
      id: 'dep.real-complex',
      kind: 'definition',
      definition: 'def.real',
      usedBy: 'def.complex',
      note: '$\\mathbb{C} = \\mathbb{R}^2$，实部虚部都是实数。'
    },
    {
      id: 'dep.sup-series',
      kind: 'definition',
      definition: 'def.bound',
      usedBy: 'def.series',
      note: '非负项级数取的就是部分和的**上确界**。'
    }
  ]
});
