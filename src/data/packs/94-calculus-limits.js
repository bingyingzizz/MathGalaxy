/* ==========================================================================
   内容包 · 初等微积分 ①：函数极限与实数完备性
   --------------------------------------------------------------------------
   这是「初等微积分」六批里的第一批前半。它补的是分析学**最底下那一层**：

     · `analysis.real`（已有 6 点）收进六个新点：函数极限、单侧极限、夹逼定理、
       极限四则运算、Cauchy 列、上下极限 —— 原来的 `def.sequence-limit` 只讲了数列，
       而后面所有东西（连续、导数、积分）用的都是**函数**的极限。
     · `analysis.completeness`（新星团，9 点）造出「ℝ 没有洞」的六副面孔。
       确界原理那个节点（`thm.real-ordered-field`）**从 analysis.real 挪到这里**当入口。

   ⚠️ 命名：函数极限不能叫 `def.limit`（范畴论的极限占了那个 id）。
   ⚠️ 公式里不放汉字（`i18n/formula-han.md` 的闸门）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：函数极限与实数完备性',
  nodes: [

    /* ==================================================================
       A0 · analysis.real 的六个新点（实数与极限）
       ================================================================== */
    {
      id: 'def.function-limit',
      cluster: 'analysis.real',
      type: 'definition',
      label: '函数极限',
      title: '函数极限 $\\lim_{x \\to x_0} f(x) = L$',
      regions: ['analysis'],
      tags: ['定义', '极限'],
      statement: [
        '设 $f$ 在 $x_0$ 的某个**去心邻域**上有定义，$L \\in \\mathbb{R}$。称 $x \\to x_0$ 时 $f(x)$ 趋于 $L$（记 $\\lim_{x \\to x_0} f(x) = L$），当且仅当',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0 :\\ 0 < |x - x_0| < \\delta \\implies |f(x) - L| < \\varepsilon$$',
        '',
        '**Heine 刻画**：$\\lim_{x \\to x_0} f(x) = L$，当且仅当对每个满足 $x_n \\ne x_0$ 且 $x_n \\to x_0$ 的数列，都有 $f(x_n) \\to L$。',
        '',
        '把 $0 < |x - x_0| < \\delta$ 换成别的范围（$x > M$、$x \\to x_0^{+}$、$|x| > M$ 等），就得到 $x \\to \\pm\\infty$、单侧极限等各式各样的变体。'
      ].join('\n'),
      notes: '⭐ 与**数列**极限的区别只有一处：这里自变量是连续地靠近的，所以要有一层额外的量词 $\\delta$ 管住「多近才算够近」。$\\varepsilon$-$\\delta$ 语言的全部新意就在这个双层量词上。\n\n⚠ **去心**是必须的：$x = x_0$ 那一点不参与极限，所以 $f$ 在 $x_0$ 处有没有定义、取值是多少，都不影响这个极限。也正因为如此，「极限存在且恰好等于 $f(x_0)$」才能拿来当**连续**的定义。\n\n⚠ 极限若存在则唯一 —— 这一条与数列版证法相同（取两点各用一半 $\\varepsilon$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4', 'Tao, Analysis I, Ch. 9']
    },
    {
      id: 'def.function-limit-onesided',
      cluster: 'analysis.real',
      type: 'definition',
      label: '单侧极限',
      title: '左极限与右极限',
      regions: ['analysis'],
      tags: ['定义', '极限'],
      statement: [
        '**左极限** $\\lim_{x \\to x_0^{-}} f(x) = L$ 指',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0 :\\ x_0 - \\delta < x < x_0 \\implies |f(x) - L| < \\varepsilon$$',
        '',
        '**右极限** $\\lim_{x \\to x_0^{+}} f(x) = L$ 把条件换成 $x_0 < x < x_0 + \\delta$。',
        '',
        '于是得到极限存在的**判别法**：极限 $\\lim_{x \\to x_0} f(x)$ 存在，当且仅当左右极限都存在且相等，即',
        '',
        '$$\\lim_{x \\to x_0^{-}} f(x) = \\lim_{x \\to x_0^{+}} f(x)$$'
      ].join('\n'),
      notes: '⭐ 单侧极限在图上出现在三处：分段函数接缝处的连续性、**单调函数**的跳跃（BV 那一团用 $F(x+) - F(x-)$ 定义跳跃）、区间端点上的连续性。\n\n⭐ 单调函数在每一点的两个单侧极限**都存在**（不必相等、不必连续）—— 这是「单调函数的不连续点可数」的第一步。\n\n⚠ 记号里 $x \\to x_0^{-}$ 的短横是「从左边靠近」，不是减号。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'thm.squeeze',
      cluster: 'analysis.real',
      type: 'theorem',
      label: '夹逼定理',
      title: '夹逼定理',
      regions: ['analysis'],
      tags: ['定理', '极限'],
      statement: [
        '**(数列版)** 设存在 $N_0$，使 $n \\ge N_0$ 时 $a_n \\le x_n \\le b_n$。若 $a_n \\to L$ 且 $b_n \\to L$，则 $x_n \\to L$。',
        '',
        '**(函数版)** 设 $g(x) \\le f(x) \\le h(x)$ 在 $x_0$ 的某个去心邻域上成立。若',
        '',
        '$$\\lim_{x \\to x_0} g(x) = \\lim_{x \\to x_0} h(x) = L$$',
        '',
        '则 $\\lim_{x \\to x_0} f(x) = L$。'
      ].join('\n'),
      notes: '⭐ 夹逼定理是**少数几个「不必先知道极限是多少」就能断言极限存在**的工具（另外两个是单调有界定理与 Cauchy 准则）。它最典型的用途是定义 $e$、证明 $\\lim_{n} q^{n} = 0$（$|q| < 1$）、$\\lim_{n} \\sqrt[n]{n} = 1$。\n\n⚠ 两个条件缺一不可：**双向**夹住，且两侧极限**相等**。只夹一边是没有任何结论的。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'prop.limit-arithmetic',
      cluster: 'analysis.real',
      type: 'proposition',
      label: '极限的四则运算与保序性',
      title: '命题：极限的四则运算、保序性与绝对值',
      regions: ['analysis'],
      tags: ['命题', '极限'],
      statement: [
        '设 $x_n \\to x$、$y_n \\to y$（有限），$c \\in \\mathbb{R}$。则',
        '',
        '- $x_n \\pm y_n \\to x \\pm y$，$c\\,x_n \\to c\\,x$，$x_n y_n \\to xy$；',
        '- 若 $y \\ne 0$，则当 $n$ 充分大时 $y_n \\ne 0$，且 $x_n / y_n \\to x / y$；',
        '- $|x_n| \\to |x|$；',
        '- **保序性**：若存在 $N_0$ 使 $n \\ge N_0$ 时 $x_n \\le y_n$，则 $x \\le y$。',
        '',
        '函数版逐字照搬（把「存在 $N$」换成「存在 $\\delta$」）。'
      ].join('\n'),
      notes: '⭐ 这一组是**运算律**：它说的是「取极限」这个操作与四则运算交换。整个分析学的计算都建立在它上面。\n\n⚠ 保序性只能得到 $\\le$，得不到 $<$：例 $0 < 1/n$ 对一切 $n$ 成立，但极限 $0 \\le 0$。**严格不等号在取极限时会被抹平**。\n\n⚠ 「极限存在则唯一」「收敛则必有界」也出自同一定义，写法与数列版一模一样。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'def.cauchy-sequence',
      cluster: 'analysis.real',
      type: 'definition',
      label: 'Cauchy 列',
      title: 'Cauchy 列',
      regions: ['analysis'],
      tags: ['定义', '极限', '完备性'],
      statement: [
        '实数列 $\\{x_n\\}$ 是 **Cauchy 列**，当且仅当',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall m, n \\ge N :\\ |x_m - x_n| < \\varepsilon$$',
        '',
        '即：只要取得足够靠后，**任意两项**都互相接近。'
      ].join('\n'),
      notes: '⭐ 与「收敛」的差别是**信息方向**：验证收敛要先有 $x$ 才能算 $|x_n - x|$，而 Cauchy 列只让数列**自己人互相比** —— 一个不知道极限是多少的人也能验证它。\n\n⭐ 在 $\\mathbb{R}$ 里两者**等价**（Cauchy 收敛准则）；在 $\\mathbb{Q}$ 里不等价（$1, 1.4, 1.41, \\ldots$ 是 Cauchy 列却没有有理极限）。$\\mathbb{R}$ 之所以要被造出来，正是为了补上这个缺口。\n\n⚠ 别与 `def.cauchy-null` 混淆：那个是**有理** Cauchy 列，是构造 $\\mathbb{R}$ 用的零件；这一条是 $\\mathbb{R}$ 造好之后判收敛的工具。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'def.limsup-liminf',
      cluster: 'analysis.real',
      type: 'definition',
      label: '上极限与下极限',
      title: '上极限与下极限 $\\limsup$ / $\\liminf$',
      regions: ['analysis'],
      tags: ['定义', '极限'],
      statement: [
        '对实数列 $\\{x_n\\}$，令',
        '',
        '$$\\limsup_{n \\to \\infty} x_n := \\lim_{n \\to \\infty} \\Bigl( \\sup_{k \\ge n} x_k \\Bigr), \\qquad \\liminf_{n \\to \\infty} x_n := \\lim_{n \\to \\infty} \\Bigl( \\inf_{k \\ge n} x_k \\Bigr)$$',
        '',
        '（$n \\mapsto \\sup_{k \\ge n} x_k$ 单调递减、$n \\mapsto \\inf_{k \\ge n} x_k$ 单调递增，所以在 $\\overline{\\mathbb{R}}$ 里的这两个极限**总是存在**。）',
        '',
        '并且数列的极限存在（允许取值 $\\pm\\infty$），当且仅当上下极限相等，即',
        '',
        '$$\\liminf_{n \\to \\infty} x_n = \\limsup_{n \\to \\infty} x_n$$'
      ].join('\n'),
      notes: '⭐ 上极限就是「所有收敛子列的极限之中最大的那个」（把 $\\pm \\infty$ 也算进来）—— 于是**每个**实数列都有上下极限，而只有收敛的数列才有极限：上下极限是极限的**放宽版**。\n\n⭐ 测度论里它们的出场方式很关键：Fatou 引理就是 $\\int \\liminf f_n \\le \\liminf \\int f_n$ —— 那里用不了「极限」，因为 $f_n$ 未必收敛。\n\n⚠ $\\limsup$ 与 $\\sup$ 不是一回事：$\\sup_n x_n$ 是全体项的上确界，$\\limsup_n x_n$ 只看**尾部**，所以对 $x_n = (-1)^{n}$ 有 $\\sup x_n = 1$ 而 $\\limsup x_n = 1$、$\\liminf x_n = -1$。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },

    /* ==================================================================
       A1 · analysis.completeness —— 实数完备性的六副面孔
       ================================================================== */
    {
      id: 'def.limit-point',
      cluster: 'analysis.completeness',
      type: 'definition',
      label: '聚点',
      title: '聚点 / 极限点',
      regions: ['analysis'],
      tags: ['定义', '完备性'],
      statement: [
        '设 $S \\subseteq \\mathbb{R}$，$x \\in \\mathbb{R}$。称 $x$ 是 $S$ 的**聚点**（也叫极限点），当且仅当 $x$ 的每个去心邻域都与 $S$ 相交：',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists s \\in S :\\ 0 < |s - x| < \\varepsilon$$',
        '',
        '等价的序列说法：存在 $S \\setminus \\{x\\}$ 中的数列 $s_n \\to x$。',
        '',
        '把 $S$ 换成一个数列的项集，就得到「$x$ 是 $\\{x_n\\}$ 的聚点」=「$\\{x_n\\}$ 有子列收敛到 $x$」。'
      ].join('\n'),
      notes: '⭐ 「有界数列必有聚点」就是 Bolzano–Weierstrass 定理 —— 它是实数完备性的六副面孔之一。\n\n⚠ 聚点**不必属于** $S$：全体有理数构成的集合 $\\mathbb{Q}$ 的聚点集是整个 $\\mathbb{R}$（这正是 $\\mathbb{Q}$ 不完备的样子）。\n\n⚠ 别与上确界混：$\\sup S$ 面向「$S$ 的上界」，聚点面向「$S$ 的点任意接近谁」；$\\sup\\{1, 1/2, 1/3, \\ldots\\} = 1$ 同时也是那个集合唯一的聚点，而 $\\sup\\{1\\} = 1$ 却不是聚点。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 2']
    },
    {
      id: 'thm.monotone-convergence',
      cluster: 'analysis.completeness',
      type: 'theorem',
      label: '单调有界定理',
      title: '单调有界定理',
      regions: ['analysis'],
      tags: ['定理', '完备性'],
      statement: [
        '设 $\\{x_n\\} \\subseteq \\mathbb{R}$。',
        '',
        '- 若 $x_n$ 递增（$x_1 \\le x_2 \\le \\cdots$）且有上界，则 $\\{x_n\\}$ 收敛，且',
        '',
        '$$\\lim_{n \\to \\infty} x_n = \\sup_{n} x_n$$',
        '',
        '- 若 $x_n$ 递减且有下界，则 $\\{x_n\\}$ 收敛，且 $\\lim_{n \\to \\infty} x_n = \\inf_{n} x_n$。'
      ].join('\n'),
      notes: '⭐ 这条定理的价值在于：它**不必知道极限是谁**就断言了极限存在 —— 而在证明里我们顺手就把极限认出来了（就是那一列的上确界）。整个实分析大量使用这个套路（非负项级数、单调函数、测度的连续性、单调收敛定理的雏形）。\n\n⚠ 两个前提都不能丢：单调不必有界则发散（$x_n = n$）；有界不必单调则可能不收敛（$x_n = (-1)^{n}$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'lem.nested-intervals',
      cluster: 'analysis.completeness',
      type: 'lemma',
      label: '闭区间套定理',
      title: '引理：闭区间套定理',
      regions: ['analysis'],
      tags: ['引理', '完备性'],
      statement: [
        '设 $I_n = [a_n, b_n]$ 是一列**闭**区间，满足',
        '',
        '- $I_1 \\supseteq I_2 \\supseteq \\cdots$（嵌套），',
        '- $b_n - a_n \\to 0$（长度趋于零）。',
        '',
        '则 $\\bigcap_{n=1}^{\\infty} I_n$ 恰含**一个**点。'
      ].join('\n'),
      notes: '⭐ 这是「二分法」的正式形态：把它用于有界数列，就得到 Bolzano–Weierstrass 定理；用于证明中「不断把区间砍一半」的每一步，都是它。\n\n⚠ 两个条件都不能松：**闭**——$\\bigcap_{n} (0, 1/n] = \\emptyset$；**长度趋于零**——$\\bigcap_{n} [n, +\\infty) = \\emptyset$ 而长度不趋于零。若只要求嵌套不要求长度趋于零，结论要弱化成「交集非空」（此时交集是一个点或一个闭区间）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.bolzano-weierstrass',
      cluster: 'analysis.completeness',
      type: 'theorem',
      label: 'Bolzano–Weierstrass 定理',
      title: 'Bolzano–Weierstrass 定理（有界列必有收敛子列）',
      regions: ['analysis'],
      tags: ['定理', '完备性'],
      statement: [
        '每个有界实数列都有收敛子列。等价地：$\\mathbb{R}$ 的每个有界无限子集都有聚点。',
        '',
        '在 $\\mathbb{R}^{n}$ 里逐坐标使用它，得到：$\\mathbb{R}^{n}$ 的有界列必有收敛子列。'
      ].join('\n'),
      notes: '⭐ 这是「$\\mathbb{R}^{n}$ 里紧 $\\iff$ 有界闭」那一条（Heine–Borel）的分析内核：有界闭集上的连续函数之所以能取到最值，根子在这里。\n\n⚠ 完备性在这里**不可省**：在 $\\mathbb{Q}$ 里，$1, 1.4, 1.41, 1.414, \\ldots$ 有界，却没有收敛到有理数的子列。\n\n⭐ 证明的标准手法是**二分法**：每次把区间砍一半、留下含无穷多项的那一半，套用闭区间套定理。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.cauchy-criterion',
      cluster: 'analysis.completeness',
      type: 'theorem',
      label: 'Cauchy 收敛准则',
      title: '定理：收敛 $\\iff$ Cauchy',
      regions: ['analysis'],
      tags: ['定理', '完备性'],
      statement: [
        '实数列 $\\{x_n\\}$ 收敛（到某个实数），当且仅当它是 Cauchy 列。'
      ].join('\n'),
      notes: '⭐ 两个方向的分量完全不同：「收敛 $\\implies$ Cauchy」只用三角不等式，是**平凡**的；「Cauchy $\\implies$ 收敛」才是**完备性本身** —— 它说的是「自己人互相比就够了的数列，一定有极限等着它」。\n\n⭐ 实用价值：判收敛时不必先猜极限。后面幂级数的收敛半径、函数的完备性、Banach 空间的定义（每个 Cauchy 列都收敛）都是这一条的直系后代。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.real-complete-metric',
      cluster: 'analysis.completeness',
      type: 'theorem',
      label: 'ℝ 是完备度量空间',
      title: '定理：$(\\mathbb{R}, |x - y|)$ 是完备度量空间',
      regions: ['analysis'],
      tags: ['定理', '完备性', '度量空间'],
      statement: [
        '在 $\\mathbb{R}$ 上取距离 $d(x, y) := |x - y|$。则 $(\\mathbb{R}, d)$ 是**完备**度量空间：其中每个 Cauchy 列都收敛。',
        '',
        '这正是 Cauchy 收敛准则用距离空间的语言重写一遍 —— 一句话：$\\mathbb{R}$ 是完备的。'
      ].join('\n'),
      notes: '⭐ 这是两条线的**接口**：一边是「$\\mathbb{R}$ 是完备有序域」（确界原理），另一边是「$X$ 是完备度量空间」（每个 Cauchy 列收敛）。在 $\\mathbb{R}$ 上两者重合，但它们**来源不同**：前者是序性质，后者是度量性质。\n\n⭐ 顺着这条边往外走，就是**完备化**：任何度量空间都能嵌进一个完备度量空间（拿 Cauchy 列取商），而 $\\mathbb{R}$ 的构造正是它的原型 —— 把 $\\mathbb{Q}$ 完备化就是 $\\mathbb{R}$。\n\n⚠ 一般度量空间里「完备」与「紧」是两回事：$\\mathbb{R}$ 完备但不紧。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3', 'Munkres, Topology, Ch. 43']
    },
    {
      id: 'thm.completeness-equivalent',
      cluster: 'analysis.completeness',
      type: 'theorem',
      label: '完备性的六条等价',
      title: '定理：下列六条彼此等价',
      regions: ['analysis'],
      tags: ['定理', '完备性', '等价'],
      statement: [
        '在 $\\mathbb{R}$ 上，下列六条**彼此等价**：',
        '',
        '**(1) 确界原理**：$\\mathbb{R}$ 的每个非空有上界的子集都有上确界。',
        '',
        '**(2) 单调有界定理**：递增有上界的数列收敛。',
        '',
        '**(3) 闭区间套定理**：嵌套的闭区间若长度趋于零，交集恰含一个点。',
        '',
        '**(4) Bolzano–Weierstrass**：每个有界数列都有收敛子列。',
        '',
        '**(5) Cauchy 收敛准则**：Cauchy 列收敛。',
        '',
        '**(6) 度量完备**：$(\\mathbb{R}, |x - y|)$ 是完备度量空间。',
        '',
        '六条构成一个**强连通块**：任取一条都能推出其余五条。'
      ].join('\n'),
      notes: '⭐ 这是本图里**第二个**「同一件事的多种说法构成强连通块」的例子 —— 第一个是选择原理（选择公理 $\\iff$ 良序定理 $\\iff$ 佐恩引理 $\\iff$ Hausdorff 极大原理 $\\iff$ Tukey 引理）。它们在图上的待遇也一样：**永远同层**。\n\n⭐ 为什么值得单独立一个节点：选哪条当前提，决定了后续所有证明的**风格** —— 用确界原理（序）证明、用区间套（几何）证明、用 Cauchy 准则（列）证明是三条不同的路。这块节点就是那张「换乘图」。\n\n⚠ 「完备」在这里有**两种语境**：确界原理那种是**序完备**（有上界就有上确界），度量空间那种是**度量完备**（Cauchy 列收敛）。在 $\\mathbb{R}$ 上它们等价，但别把这个等价当成一般事实带出去。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3', 'Tao, Analysis I, Ch. 6']
    },
    {
      id: 'cor.heine-borel',
      cluster: 'analysis.completeness',
      type: 'corollary',
      /* ⚠️ label 刻意**不写** Heine–Borel：那个词在图上已经登记给 `thm.metric-compact-equiv`
         （见 aliases.js）。两个节点不能抢同一个正文词条 —— 内文跳转是按 label/aka 建词表的。 */
      label: '有界闭 ⟺ 紧（ℝⁿ）',
      title: '推论：Heine–Borel 定理 —— $\\mathbb{R}^{n}$ 中紧 $\\iff$ 有界且闭',
      regions: ['analysis', 'topology'],
      tags: ['推论', '完备性', '紧'],
      statement: [
        '设 $K \\subseteq \\mathbb{R}^{n}$，按 Euclidean 距离看成一个度量空间。则 $K$ 是紧空间，当且仅当 $K$ 有界且闭。',
        '',
        '（「紧」取「每个开覆盖都有有限子覆盖」，或等价的「每个数列都有收敛到 $K$ 内一点的子列」。）'
      ].join('\n'),
      notes: '⭐ 这是**推论的推论**：$\\mathbb{R}^{n}$ 完备 + 有界集全有界 $\\implies$ 有界闭集列紧 $\\implies$ 紧（见「度量空间中紧的三个等价刻画」）。真正用到的是 Bolzano–Weierstrass 的逐坐标版本。\n\n⚠ 它**不是**一般度量空间的定理：一般度量空间里「紧 $\\implies$ 有界闭」永远成立，反之不成立（离散步的充分例子、$\\ell^{2}$ 的单位球）。\n\n⭐ 立刻可用的结论：闭区间 $[a, b]$ 紧 —— 于是连续函数在它上面取到最值、一致连续、可积。初等微积分的三大存在性定理全靠这一条。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 2', 'Munkres, Topology, Ch. 28']
    }
  ],

  edges: [

    /* ---------------------------------------------- 定义依赖 · 分析学地基 */
    {
      id: 'dep.seqlimit-fnlimit',
      kind: 'definition',
      definition: 'def.sequence-limit',
      usedBy: 'def.function-limit',
      note: '两者用的是同一套 $\\varepsilon$ 语言；函数版多一层 $\\delta$ 来管住自变量靠近的程度，Heine 刻画则把函数版**还原**成数列版。'
    },
    {
      id: 'dep.fnlimit-onesided',
      kind: 'definition',
      definition: 'def.function-limit',
      usedBy: 'def.function-limit-onesided',
      note: '单侧极限就是把 $0 < |x - x_0| < \\delta$ 换成半边：$x_0 - \\delta < x < x_0$ 或 $x_0 < x < x_0 + \\delta$。'
    },
    {
      id: 'dep.seqlimit-cauchyseq',
      kind: 'definition',
      definition: 'def.sequence-limit',
      usedBy: 'def.cauchy-sequence',
      note: 'Cauchy 列把「与极限比较」换成「数列内部互相比较」：量词形状一样，$|x_n - x|$ 换成了 $|x_m - x_n|$。'
    },
    {
      id: 'dep.bound-limsup',
      kind: 'definition',
      definition: 'def.bound',
      usedBy: 'def.limsup-liminf',
      note: '上下极限用的是**尾部的**上确界与下确界：$\\sup_{k \\ge n} x_k$ 对每个 $n$ 都是一次确界运算。'
    },
    {
      id: 'dep.interval-limitpoint',
      kind: 'definition',
      definition: 'def.interval',
      usedBy: 'def.limit-point',
      note: '聚点是用「每个 $\\varepsilon$ 邻域」说的，而邻域就是开区间 $(x - \\varepsilon, x + \\varepsilon)$。'
    },
    {
      id: 'dep.cauchyseq-criterion',
      kind: 'definition',
      definition: 'def.cauchy-sequence',
      usedBy: 'thm.cauchy-criterion',
      note: '定理的两边一边是收敛、一边是 Cauchy 列 —— 后者刚在这一包定义。'
    },
    {
      id: 'dep.complete-realm',
      kind: 'definition',
      definition: 'def.complete',
      usedBy: 'thm.real-complete-metric',
      note: '把度量空间「完备」的定义原封不动搬到 $\\mathbb{R}$ 上：每个 Cauchy 列都收敛。'
    },
    {
      id: 'dep.compact-hb',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'cor.heine-borel',
      note: 'Heine–Borel 是一条判别**紧性**的定理，用的就是紧空间的定义。'
    },

    /* -------------------------------------------------- 证明 · 分析学地基 */
    {
      id: 'imp.squeeze',
      kind: 'implication',
      sources: ['def.sequence-limit', 'def.function-limit'],
      target: 'thm.squeeze',
      title: '数列/函数极限的定义 $\\implies$ 夹逼定理',
      proof: [
        '**数列版。** 设 $a_n \\to L$、$b_n \\to L$，且 $n \\ge N_0$ 时 $a_n \\le x_n \\le b_n$。给定 $\\varepsilon > 0$。',
        '',
        '1. 由 $a_n \\to L$，存在 $N_1$，使得 $n \\ge N_1$ 时 $|a_n - L| < \\varepsilon$，特别地 $a_n > L - \\varepsilon$。',
        '2. 由 $b_n \\to L$，存在 $N_2$，使得 $n \\ge N_2$ 时 $b_n < L + \\varepsilon$。',
        '3. 取 $N = \\max\\{N_0, N_1, N_2\\}$。当 $n \\ge N$ 时',
        '',
        '$$L - \\varepsilon < a_n \\le x_n \\le b_n < L + \\varepsilon$$',
        '',
        '即 $|x_n - L| < \\varepsilon$。故 $x_n \\to L$。',
        '',
        '**函数版。** 把上面第 1、2 步里的「存在 $N_1$」换成「存在 $\\delta_1 > 0$」，第 3 步取 $\\delta = \\min\\{\\delta_0, \\delta_1, \\delta_2\\}$，逐字照搬即可。∎'
      ].join('\n'),
      note: '夹逼定理没有任何「存在性」内容：它的两个前提本身已经给出了极限 $L$，所以只用定义就够了 —— 这也是它为什么在实数的任何完备化里都成立的原因。'
    },
    {
      id: 'imp.limit-arithmetic',
      kind: 'implication',
      sources: ['def.function-limit'],
      target: 'prop.limit-arithmetic',
      title: '极限的定义 $\\implies$ 四则运算与保序性',
      proof: [
        '以函数版为例（数列版把 $\\delta$ 换成 $N$ 即可），记 $A = \\lim_{x \\to x_0} f(x)$，$B = \\lim_{x \\to x_0} g(x)$，给定 $\\varepsilon > 0$。',
        '',
        '**(i) 加法。** 取 $\\delta_1, \\delta_2$ 分别使 $0 < |x - x_0| < \\delta_1$ 时 $|f(x) - A| < \\varepsilon / 2$、$0 < |x - x_0| < \\delta_2$ 时 $|g(x) - B| < \\varepsilon / 2$。取 $\\delta = \\min\\{\\delta_1, \\delta_2\\}$，则',
        '',
        '$$|(f + g)(x) - (A + B)| \\le |f(x) - A| + |g(x) - B| < \\varepsilon$$',
        '',
        '**(ii) 乘法。** 先注意 $f$ 在 $x_0$ 附近有界：存在 $\\delta_0$ 与 $M$ 使 $|f(x)| \\le M$。于是',
        '',
        '$$|f(x)g(x) - AB| \\le |f(x)|\\,|g(x) - B| + |B|\\,|f(x) - A| \\le M\\,|g(x) - B| + |B|\\,|f(x) - A|$$',
        '',
        '右边两项各自可小于 $\\varepsilon / 2$，取相应的 $\\delta$ 之小者即可。',
        '',
        '**(iii) 倒数。** 由 $B \\ne 0$，取 $\\delta_0$ 使 $0 < |x - x_0| < \\delta_0$ 时 $|g(x) - B| < |B| / 2$，于是 $|g(x)| > |B| / 2$，从而',
        '',
        '$$\\Bigl| \\frac{1}{g(x)} - \\frac{1}{B} \\Bigr| = \\frac{|g(x) - B|}{|g(x)|\\,|B|} \\le \\frac{2}{|B|^{2}}\\,|g(x) - B|$$',
        '',
        '**(iv) 保序性。** 设 $f(x) \\le g(x)$ 在去心邻域上成立而 $A > B$。取 $\\varepsilon = (A - B) / 2$，则充分靠近 $x_0$ 时 $f(x) > A - \\varepsilon > B + \\varepsilon > g(x)$，与 $f \\le g$ 矛盾。故 $A \\le B$。∎',
        '',
        '**(v) 绝对值。** 由 $|\\,|f(x)| - |A|\\,| \\le |f(x) - A|$（三角不等式的变形）直接得到。'
      ].join('\n'),
      note: '「保序性」之所以结论是 $\\le$ 而不是 $<$，看证明的最后一步就明白了：反证法只排除了 $A > B$。'
    },
    {
      id: 'imp.sup-monotone',
      kind: 'implication',
      sources: ['thm.real-ordered-field'],
      target: 'thm.monotone-convergence',
      title: '确界原理 $\\implies$ 单调有界定理',
      proof: [
        '设 $\\{x_n\\}$ 递增且有上界。令 $s := \\sup_{n} x_n$ —— 由确界原理，这个上确界存在（集合非空且有上界）。',
        '',
        '要证 $x_n \\to s$。给定 $\\varepsilon > 0$。$s - \\varepsilon$ 不是 $\\{x_n\\}$ 的上界（$s$ 是最小上界），所以存在 $N$ 使 $x_N > s - \\varepsilon$。由单调性，$n \\ge N$ 时 $x_n \\ge x_N > s - \\varepsilon$；又恒有 $x_n \\le s$。故 $n \\ge N$ 时 $|x_n - s| < \\varepsilon$。',
        '',
        '递减且有下界的情形取 $\\inf$ 同理。∎'
      ].join('\n'),
      note: '这一步是整条等价链的**唯一入口**：后面五条都从它出发，最后再转回来（见「完备性的六条等价」）。'
    },
    {
      id: 'imp.monotone-nested',
      kind: 'implication',
      sources: ['thm.monotone-convergence'],
      target: 'lem.nested-intervals',
      title: '单调有界定理 $\\implies$ 闭区间套定理',
      proof: [
        '设 $I_n = [a_n, b_n]$ 嵌套且 $b_n - a_n \\to 0$。',
        '',
        '1. 由 $I_{n+1} \\subseteq I_n$ 得 $a_1 \\le a_2 \\le \\cdots$ 且 $b_1 \\ge b_2 \\ge \\cdots$。于是 $\\{a_n\\}$ 递增且有上界 $b_1$，$\\{b_n\\}$ 递减且有下界 $a_1$。',
        '2. 由单调有界定理，$a_n \\to a$、$b_n \\to b$，其中 $a = \\sup_n a_n$、$b = \\inf_n b_n$。',
        '3. $b - a = \\lim (b_n - a_n) = 0$，故 $a = b$，记这个公共值为 $x$。',
        '4. 对每个 $n$ 有 $a_n \\le x \\le b_n$（$x$ 是 $\\{a_n\\}$ 的上界、又是 $\\{b_n\\}$ 的下界），所以 $x \\in \\bigcap_n I_n$。',
        '5. 若 $y \\in \\bigcap_n I_n$，则 $a_n \\le y \\le b_n$ 对一切 $n$ 成立，令 $n \\to \\infty$ 得 $y = x$。故交集恰含一点。∎'
      ].join('\n'),
      note: '注意第 3 步用的是「长度趋于零」这个前提，第 4、5 步用的是「闭」。'
    },
    {
      id: 'imp.nested-bw',
      kind: 'implication',
      sources: ['lem.nested-intervals'],
      target: 'thm.bolzano-weierstrass',
      title: '闭区间套定理 $\\implies$ Bolzano–Weierstrass',
      proof: [
        '设 $\\{x_n\\}$ 有界，取 $M > 0$ 使一切 $x_n \\in [-M, M]$。二分法：令 $I_0 = [-M, M]$。',
        '',
        '归纳地，设 $I_k$ 已作出且其中含有 $\\{x_n\\}$ 的无穷多项。把 $I_k$ 从中间二等分，两个半区间里至少有一个仍含无穷多项（否则 $I_k$ 里只有有限多项），取它为 $I_{k+1}$。于是',
        '',
        '- $I_0 \\supseteq I_1 \\supseteq \\cdots$，每个都闭，长度为 $2M / 2^{k} \\to 0$。',
        '',
        '由闭区间套定理，$\\bigcap_k I_k$ 恰含一点 $x$。',
        '',
        '现在构造子列：对每个 $k$，因为 $I_k$ 含无穷多项，可以取 $n_k > n_{k-1}$ 使 $x_{n_k} \\in I_k$（这一步只用到「无穷多项」可以在选完前一项之后继续往下选）。于是 $x_{n_k}$ 与 $x$ 同属 $I_k$，而 $|I_k| = 2M/2^{k} \\to 0$，故 $|x_{n_k} - x| \\le 2M / 2^{k} \\to 0$，即 $x_{n_k} \\to x$。∎',
        '',
        '「每个有界无限子集都有聚点」是同一句话的集合版本：把子集排成一个各项互异的数列即可。'
      ].join('\n'),
      note: '$\\mathbb{R}^{n}$ 的情形逐坐标使用本定理：一个有界列的第 $i$ 个坐标是有界实数列，先取一个收敛的子列，再在其上对下一个坐标取子列，依次进行 $n$ 次。'
    },
    {
      id: 'imp.bw-cauchy',
      kind: 'implication',
      sources: ['thm.bolzano-weierstrass'],
      target: 'thm.cauchy-criterion',
      title: 'Bolzano–Weierstrass $\\implies$ Cauchy 收敛准则',
      proof: [
        '「$\\implies$」：设 $x_n \\to x$。给定 $\\varepsilon > 0$，取 $N$ 使 $n \\ge N$ 时 $|x_n - x| < \\varepsilon / 2$。则 $m, n \\ge N$ 时',
        '',
        '$$|x_m - x_n| \\le |x_m - x| + |x_n - x| < \\varepsilon$$',
        '',
        '故 $\\{x_n\\}$ 是 Cauchy 列。',
        '',
        '「$\\Longleftarrow$」：设 $\\{x_n\\}$ 是 Cauchy 列。',
        '',
        '1. **先证有界**：取 $\\varepsilon = 1$ 得 $N_0$，使 $m, n \\ge N_0$ 时 $|x_m - x_n| < 1$。于是 $n \\ge N_0$ 时 $|x_n| \\le |x_{N_0}| + 1$，而前 $N_0 - 1$ 项有限，故 $\\{x_n\\}$ 有界。',
        '2. 由 Bolzano–Weierstrass，存在子列 $x_{n_k} \\to x$。',
        '3. **证原列也收敛到 $x$**：给定 $\\varepsilon > 0$，取 $N_1$ 使 $m, n \\ge N_1$ 时 $|x_m - x_n| < \\varepsilon / 2$（Cauchy 性），再取 $k$ 使 $n_k \\ge N_1$ 且 $|x_{n_k} - x| < \\varepsilon / 2$。则 $n \\ge N_1$ 时',
        '',
        '$$|x_n - x| \\le |x_n - x_{n_k}| + |x_{n_k} - x| < \\varepsilon$$',
        '',
        '注意第 3 步里 $n_k \\ge N_1$ 是关键 —— 它保证 $|x_n - x_{n_k}|$ 可以按 Cauchy 性来估。∎'
      ].join('\n'),
      note: '第 1 步（Cauchy 列必有界）是最容易被忽略、但必须写出来的一步 —— 没有它就用不上 Bolzano–Weierstrass。'
    },
    {
      id: 'imp.cauchy-complete',
      kind: 'implication',
      sources: ['thm.cauchy-criterion'],
      target: 'thm.real-complete-metric',
      title: 'Cauchy 准则 $\\implies$ $\\mathbb{R}$ 完备',
      proof: [
        '把 Cauchy 准则的结论**逐字**翻译成距离空间的语言：$\\mathbb{R}$ 中的 Cauchy 列（即 $\\forall \\varepsilon > 0, \\exists N, \\forall m, n \\ge N : d(x_m, x_n) < \\varepsilon$）都收敛，这恰恰就是「$(\\mathbb{R}, d)$ 完备」的定义。故不需要新的论证。∎'
      ].join('\n'),
      note: '这条边的作用是把两套语言对上：**序**那一侧的「确界原理」与**度量**那一侧的「完备」在 $\\mathbb{R}$ 上说的是同一件事。'
    },
    {
      id: 'imp.completeness-cycle',
      kind: 'implication',
      sources: [
        'thm.real-ordered-field',
        'thm.monotone-convergence',
        'lem.nested-intervals',
        'thm.bolzano-weierstrass',
        'thm.cauchy-criterion',
        'thm.real-complete-metric'
      ],
      target: 'thm.completeness-equivalent',
      title: '六条（强连通块）',
      proof: [
        '记六条为 (1)–(6)。已有四条箭头：',
        '',
        '- (1) $\\implies$ (2)：见「确界原理 $\\implies$ 单调有界定理」；',
        '- (2) $\\implies$ (3)：见「单调有界定理 $\\implies$ 闭区间套定理」；',
        '- (3) $\\implies$ (4)：见「闭区间套定理 $\\implies$ Bolzano–Weierstrass」；',
        '- (4) $\\implies$ (5)：见「Bolzano–Weierstrass $\\implies$ Cauchy 收敛准则」；',
        '- (5) $\\implies$ (6)：见「Cauchy 准则 $\\implies$ $\\mathbb{R}$ 完备」。',
        '',
        '还差最后一条：',
        '',
        '**(6) $\\implies$ (1)**：设 $S \\subseteq \\mathbb{R}$ 非空、有上界，要证 $\\sup S$ 存在。取 $a_0 \\in S$ 与 $S$ 的一个上界 $b_0$，令 $I_0 = [a_0, b_0]$。归纳地，设 $I_n = [a_n, b_n]$ 已作出，其中 $a_n$ 是 $S$ 的下界方向上的一个点、$b_n$ 是 $S$ 的上界。取中点 $m_n = (a_n + b_n) / 2$：若 $m_n$ 是 $S$ 的上界则令 $I_{n+1} = [a_n, m_n]$，否则（此时可取出 $a_{n+1} \\in S$ 且 $a_{n+1} > m_n$）令 $I_{n+1} = [m_n, b_n]$。于是 $b_n - a_n = (b_0 - a_0)/2^{n} \\to 0$，且 $a_n$ 递增有上界 —— 由 (2)（已由 (1) 推出，但这里可直接用 (6) 的完备性）$a_n$ 收敛，记极限为 $s$。',
        '',
        '1. $s$ 是 $S$ 的上界：若存在 $t \\in S$ 且 $t > s$，取 $n$ 使 $b_n - a_n < t - s$；由 $b_n$ 也是上界得 $t \\le b_n$，于是 $b_n \\ge t > s > a_n$ 且 $b_n - a_n \\ge t - a_n > t - s$（因为 $a_n \\le s$），矛盾。',
        '2. $s$ 是最小上界：任取上界 $u$，恒有 $a_n \\le u$（$a_n$ 附近有 $S$ 的点），令 $n \\to \\infty$ 得 $s \\le u$。',
        '',
        '故 $s = \\sup S$，即 (1)。六条首尾相接，故彼此等价。∎'
      ].join('\n'),
      note: '这正是「强连通块」的含义：**任取一条作公理，其余五条都是定理**。所以要问的不是「哪条对」，而是「哪一种说法在当前语境里最方便」—— 后来在一般完备度量空间里只剩 (6)，在完备格（如 $\\overline{\\mathbb{R}}$）里只剩 (1)。'
    },
    {
      id: 'imp.bw-heineborel',
      kind: 'implication',
      sources: ['thm.bolzano-weierstrass', 'thm.metric-compact-equiv'],
      target: 'cor.heine-borel',
      title: 'Bolzano–Weierstrass + 紧的三个等价刻画 $\\implies$ Heine–Borel',
      proof: [
        '按「序列紧」来用「紧的三个等价刻画」：在度量空间里 $K$ 紧 $\\iff K$ 列紧。',
        '',
        '**($\\Longleftarrow$)** 设 $K \\subseteq \\mathbb{R}^{n}$ 有界且闭。取 $K$ 中任一数列 $\\{x_k\\}$。它作为 $\\mathbb{R}^{n}$ 中的数列有界，由 Bolzano–Weierstrass 的 $\\mathbb{R}^{n}$ 版本有子列收敛到某点 $x$。$K$ 闭，故 $x \\in K$。于是 $K$ 列紧，从而紧。',
        '',
        '**($\\implies$)** 设 $K$ 紧。紧集在度量空间里总是闭的（见「紧子集是闭的」）。若有界性不成立，则对每个 $k$ 可取 $x_k \\in K \\setminus B(0, k)$，这样的数列没有任何收敛子列（$|x_k| \\to \\infty$），与列紧矛盾。故 $K$ 有界。∎'
      ].join('\n'),
      note: '两条前提缺一不可：$\\mathbb{R}^{n}$ 的**完备性**（Bolzano–Weierstrass）给出「有界 $\\implies$ 有子列收敛」，度量空间的**一般事实**给出「紧 $\\iff$ 列紧」与「紧 $\\implies$ 闭」。'
    }
  ]
});
