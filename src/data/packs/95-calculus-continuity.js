/* ==========================================================================
   内容包 · 初等微积分 ②：连续与紧性
   --------------------------------------------------------------------------
   新星团 `analysis.continuity`（8 点）。它回答的问题是：

     **一个连续函数，只看它连续，能断言什么？**

   答案是三件事：在紧集上有界、取到最值、一致连续；再加上「不取到中间值是不可能的」
   （介值定理）。初等微积分里所有的**存在性定理**（存在根、存在最值、存在反函数、
   存在积分！）都是这一包的后代。

   ⚠️ 全部结论都建立在实数的完备性（`analysis.completeness`）与紧性（`def.compact`）之上，
      所以这一包的边大多指向那两个地方，而不是指向别的分析结论。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：连续与紧性',
  nodes: [

    {
      id: 'def.uniform-continuity',
      cluster: 'analysis.continuity',
      type: 'definition',
      label: '一致连续',
      title: '一致连续（Uniform Continuity）',
      regions: ['analysis', 'topology'],
      tags: ['定义', '连续'],
      statement: [
        '设 $X \\subseteq \\mathbb{R}$，$f : X \\to \\mathbb{R}$。称 $f$ **一致连续**，当且仅当',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0,\\ \\forall x, x\' \\in X :\\ |x - x\'| < \\delta \\implies |f(x) - f(x\')| < \\varepsilon$$',
        '',
        '与「连续」的唯一差别是量词的**顺序**：这里 $\\delta$ 出现在 $\\forall x$ 之前，所以同一个 $\\delta$ 要对 $X$ 上所有点同时管用。'
      ].join('\n'),
      notes: '⭐ 一句话：连续是「每一点各自有一个 $\\delta$」，一致连续是「有一个 $\\delta$ 通吃全 $X$」。\n\n⚠ 两者**不等价**：$f(x) = x^{2}$ 在 $\\mathbb{R}$ 上连续，但取 $x = n$、$x\' = n + 1/n$ 就有 $|f(x) - f(x\')| = 2 + 1/n^{2} > 2$，无论 $\\delta$ 多小都能撞上 —— 所以它不一致连续。$f(x) = 1/x$ 在 $(0, 1)$ 上同理。\n\n⭐ 紧集上两者**重合**（Cantor 定理）—— 这就是为什么初等微积分里可以只谈连续却随手用一致连续的性质。\n\n⭐ 一致连续是后面一切「把极限搬进积分 / 导数」的通行证：一致收敛的函数列才保连续、保积分。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'prop.continuous-bounded-on-compact',
      cluster: 'analysis.continuity',
      type: 'proposition',
      label: '紧集上连续 ⟹ 有界',
      title: '命题：紧空间上的连续实值函数有界',
      regions: ['analysis', 'topology'],
      tags: ['命题', '连续', '紧'],
      statement: [
        '设 $X$ 是紧度量空间（例如 $\\mathbb{R}$ 中的闭区间 $[a, b]$），$f : X \\to \\mathbb{R}$ 连续。则 $f$ 在 $X$ 上有界：存在 $M$ 使 $|f(x)| \\le M$ 对一切 $x \\in X$ 成立。'
      ].join('\n'),
      notes: '⭐ 结论里**两个前提都不能丢**：\n- 不紧：$f(x) = 1/x$ 在 $(0, 1)$ 上连续但无界；\n- 不连续：$f(x) = 1/x$ 在 $[0, 1]$ 上（$f(0)$ 任意指定）无界。\n\n⚠ 一般拓扑空间里更干净的写法是「紧集的连续像是紧集」（连续像紧），再配合「$\\mathbb{R}$ 中的紧集有界」得到结论 —— 这里走的是序列路线，两条路都对，图上这条更省事。\n\n**证明**（反证 + 列紧）。设 $f$ 无界，则对每个 $n$ 存在 $x_n \\in X$ 使 $|f(x_n)| > n$。$X$ 紧 $\\implies$ 列紧，故 $\\{x_n\\}$ 有子列 $x_{n_k} \\to x^{*} \\in X$；$f$ 连续给出 $f(x_{n_k}) \\to f(x^{*})$，而收敛的数列有界，于是存在 $M$ 使 $|f(x_{n_k})| \\le M$ 对一切 $k$ 成立。另一方面由构造 $|f(x_{n_k})| > n_k \\to \\infty$，矛盾。∎',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'thm.evt',
      cluster: 'analysis.continuity',
      type: 'theorem',
      label: '最值定理',
      title: '最值定理（Extreme Value Theorem）',
      regions: ['analysis', 'topology'],
      tags: ['定理', '连续', '紧'],
      statement: [
        '设 $X$ 是紧度量空间，$f : X \\to \\mathbb{R}$ 连续。则 $f$ **取到**最大值与最小值：存在 $x_{\\min}, x_{\\max} \\in X$，使对一切 $x \\in X$ 有',
        '',
        '$$f(x_{\\min}) \\le f(x) \\le f(x_{\\max})$$'
      ].join('\n'),
      notes: '⭐ 「有界」与「取到最值」是两件事，这也是图上把它们分成两个节点的原因：有界只说明 $\\sup f(X)$ 是**有限的**，取到最值说明这个上确界**被某个点实打实地达到**。紧性负责后者。\n\n⚠ 换成开区间立刻失败：$f(x) = x$ 在 $(0, 1)$ 上有界，却既取不到最大值也取不到最小值。\n\n⭐ 在 $\\mathbb{R}$ 上的常用形式：**闭区间 $[a, b]$ 上的连续函数取到最值** —— 证明的第一步是「闭区间紧」（Heine–Borel）。初等微积分里求极值的整套流程（找驻点 + 比端点）就建立在这条上。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'thm.ivt',
      cluster: 'analysis.continuity',
      type: 'theorem',
      label: '介值定理',
      title: '介值定理（Intermediate Value Theorem）',
      regions: ['analysis'],
      tags: ['定理', '连续'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上连续，$c$ 是介于 $f(a)$ 与 $f(b)$ 之间的**任意**实数。则存在 $\\xi \\in [a, b]$ 使',
        '',
        '$$f(\\xi) = c$$'
      ].join('\n'),
      notes: '⭐ 几何内容：连续函数的图像从 $f(a)$ 走到 $f(b)$ 时**不能跳过中间的任何一个值** —— 连续函数把区间映成区间。\n\n⭐ 这是初等分析里最常用的存在性工具：方程有根、反函数存在、不动点、中间值比较，全都从它出来。它有**构造性**的内容：证明用的二分法本身就是求根的算法，而且每一步都能算。\n\n⚠ 它只保证**存在**，不保证唯一（$x^{3} - x$ 在 $[-2, 2]$ 上有三个零点）；唯一性要另外加**严格单调**。\n\n⚠ 它用到的是 $\\mathbb{R}$ 的完备性（确界原理），不是紧性：$[a, b]$ 换成一般的连通空间也成立，那是不动点/连通性那一支。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'cor.zero-point',
      cluster: 'analysis.continuity',
      type: 'corollary',
      label: '零点定理',
      title: '推论：零点定理（Bolzano 定理）',
      regions: ['analysis'],
      tags: ['推论', '连续'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上连续，且 $f(a)$ 与 $f(b)$ **异号**（$f(a) f(b) < 0$）。则存在 $\\xi \\in (a, b)$ 使',
        '',
        '$$f(\\xi) = 0$$'
      ].join('\n'),
      notes: '⭐ 它是介值定理取 $c = 0$ 的特例，之所以单独立一条，是因为它用得太频繁（数值分析里的二分法就是它的算法化）。\n\n⚠ 条件是**异号**，不是「不取零」：$f(a) = 0$ 时结论平凡但取不到 $(a, b)$ 内。\n\n⚠ 反过来不成立：零点不必异号（$f(x) = x^{2}$ 在 $[-1, 1]$ 上）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'thm.uniform-continuity-compact',
      cluster: 'analysis.continuity',
      type: 'theorem',
      label: '紧集上连续 ⟹ 一致连续',
      title: '定理（Cantor）：紧集上的连续函数一致连续',
      regions: ['analysis', 'topology'],
      tags: ['定理', '连续', '紧'],
      statement: [
        '设 $X$ 是紧度量空间，$f : X \\to \\mathbb{R}$ 连续。则 $f$ 在 $X$ 上**一致连续**。',
        '',
        '特别地：闭区间 $[a, b]$ 上的连续函数一致连续。'
      ].join('\n'),
      notes: '⭐ 这条把「连续」升级成「一致连续」的唯一代价是**紧性** —— 它让 $\\delta$ 可以从「逐点选」变成「一次性选」，这是初等微积分里一切「先取有限子覆盖再取最小 $\\delta$」的证明的模板。\n\n⚠ 换成开区间立刻失败：$f(x) = 1/x$ 在 $(0, 1)$ 上连续但一致连续 —— 越靠近 $0$ 需要越小的 $\\delta$，而 $0$ 不在定义域里，无处安放这个下界。\n\n⭐ 直接用途：Riemann 可积性（分割的振幅和可以一致地小下去）、函数列的一致收敛、参数积分。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'thm.monotone-inverse',
      cluster: 'analysis.continuity',
      type: 'theorem',
      label: '反函数连续',
      title: '定理：严格单调连续函数的反函数连续',
      regions: ['analysis'],
      tags: ['定理', '连续', '单调'],
      statement: [
        '设 $f$ 在区间 $I$ 上**严格单调**且连续。则',
        '',
        '- $f(I)$ 是一个区间（$f$ 把区间映成区间）；',
        '- $f : I \\to f(I)$ 是双射，其反函数 $f^{-1} : f(I) \\to I$ 也连续，而且**同向**单调（$f$ 增则 $f^{-1}$ 增）。'
      ].join('\n'),
      notes: '⭐ 这条定理是**初等函数的合法性证书**：它保证 $\\exp$ 有连续的反函数 $\\log$、$\\sin$ 在 $[-\\pi/2, \\pi/2]$ 上有连续的 $\\arcsin$。没有它，那些反三角、反双曲函数就只能靠「显然连续」含糊过去。\n\n⚠ 严格单调是**必须**的：常数函数没有反函数；$\\sin$ 不单调，只能先限制到一个单调区间再取反函数。\n\n⭐ 它也说明「单调函数的间断点只能是跳跃」：单调函数没有振荡式的不连续，因为两侧的极限必然存在（单调有界）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    },
    {
      id: 'prop.discontinuity-types',
      cluster: 'analysis.continuity',
      type: 'proposition',
      label: '间断点分类',
      title: '命题：间断点的两类分法',
      regions: ['analysis'],
      tags: ['命题', '连续'],
      statement: [
        '设 $f$ 在 $x_0$ 的去心邻域上有定义，但在 $x_0$ 处**不连续**。称 $x_0$ 是 $f$ 的**间断点**，并按两个单侧极限是否存在分成两类：',
        '',
        '**第一类**：$\\lim_{x \\to x_0^{-}} f(x)$ 与 $\\lim_{x \\to x_0^{+}} f(x)$ 都存在（有限）。其中',
        '',
        '- **可去间断**：两个单侧极限相等（记公共值 $L$）。此时把 $f(x_0)$ 改定义为 $L$ 就连续了；',
        '- **跳跃间断**：两个单侧极限不相等，差 $f(x_0^{+}) - f(x_0^{-})$ 叫**跳跃**。',
        '',
        '**第二类**：至少有一个单侧极限不存在，或为 $\\pm\\infty$。'
      ].join('\n'),
      notes: '⭐ 这一分类在图上不只是名词：**单调函数的间断点全是跳跃间断，而且这样的点至多可数** —— 那是 BV 与测度论那一团（$\\mu_F$ 的原子、$F\' = 0$ a.e.）的起点。\n\n⚠ 「可去」的关键是 $f$ 在 $x_0$ 处**有定义但不等于极限**：例如 $f(x) = \\sin x / x$ 补上 $f(0) = 1$ 就连续。$x_0$ 根本不在定义域里时（如 $1/x$ 在 $0$）不算以 $0$ 为定义域上的间断点。\n\n⭐ 第二类的典型：$\\sin(1/x)$ 在 $0$ 处（振荡，极限不存在）。\n\n**证明**（分类是穷尽的）。在间断点 $x_0$ 处，每个单侧极限只有两种状态：存在且有限，或不存在 / 为无穷。于是「两个单侧极限都有限」与「至少一个不满足」互斥且穷尽，前者再按两侧极限是否相等分成可去与跳跃两类 —— 三种情形互斥且已列出全部可能。∎',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.continuous-uniform',
      kind: 'definition',
      definition: 'def.continuous',
      usedBy: 'def.uniform-continuity',
      note: '把连续的定义里 $\\delta$ 的位置挪到 $\\forall x$ 前面，就得到一致连续 —— 两个定义用同一套 $\\varepsilon$-$\\delta$ 语言。'
    },
    {
      id: 'dep.compact-continuousbounded',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'prop.continuous-bounded-on-compact',
      note: '命题的证明只用到紧性的一个用途：从任一开覆盖里取有限子覆盖（或等价地，列紧）。'
    },
    {
      id: 'dep.continuous-discontinuity',
      kind: 'definition',
      definition: 'def.continuous',
      usedBy: 'prop.discontinuity-types',
      note: '间断点就是「不连续的点」，分类的判据是单侧极限，而单侧极限的定义来自函数极限。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.bounded-evt',
      kind: 'implication',
      sources: ['prop.continuous-bounded-on-compact', 'thm.real-ordered-field'],
      target: 'thm.evt',
      title: '有界 + 确界原理 $\\implies$ 取到最值',
      proof: [
        '设 $X$ 紧、$f : X \\to \\mathbb{R}$ 连续。由上一条，$f(X)$ 非空且有上界，令',
        '',
        '$$M := \\sup f(X) \\in \\mathbb{R}$$',
        '',
        '（确界原理保证它存在）。',
        '',
        '1. 对每个 $n \\ge 1$，$M - 1/n$ 不是 $f(X)$ 的上界，所以存在 $x_n \\in X$ 使 $f(x_n) > M - 1/n$。',
        '2. $X$ 紧 $\\implies$ 列紧（见「紧的三个等价刻画」），所以 $\\{x_n\\}$ 有子列 $x_{n_k} \\to x^{*} \\in X$。',
        '3. $f$ 连续 $\\implies$ $f(x_{n_k}) \\to f(x^{*})$；另一方面由第 1 步 $f(x_{n_k}) \\to M$（夹逼：$M - 1/n_k < f(x_{n_k}) \\le M$）。极限唯一，故 $f(x^{*}) = M$。',
        '4. 于是 $f(x^{*}) = M = \\sup f(X) \\ge f(x)$ 对一切 $x \\in X$ 成立，即 $x_{\\max} = x^{*}$。',
        '',
        '把 $f$ 换成 $-f$ 得最小值。∎'
      ].join('\n'),
      note: '第 3 步的两个极限必须都存在才能用「极限唯一」：左式的存在性来自连续性，右式来自 $\\sup$ 的定义。紧性只在第 2 步用了一次。'
    },
    {
      id: 'imp.ivt',
      kind: 'implication',
      sources: ['thm.real-ordered-field', 'def.continuous'],
      target: 'thm.ivt',
      title: '确界原理 + 连续的定义 $\\implies$ 介值定理',
      proof: [
        '不妨设 $f(a) < c < f(b)$。令',
        '',
        '$$S := \\{ x \\in [a, b] : f(x) \\le c \\}$$',
        '',
        '1. $a \\in S$，$b \\notin S$，所以 $S$ 非空且有上界 $b$。由确界原理，$\\xi := \\sup S$ 存在，且 $\\xi \\in [a, b]$。',
        '2. **$f(\\xi) \\le c$**：由上确界的定义，存在 $s_n \\in S$ 且 $s_n \\to \\xi$；$f$ 连续给出 $f(s_n) \\to f(\\xi)$，而 $f(s_n) \\le c$，由保序性得 $f(\\xi) \\le c$。',
        '3. **$f(\\xi) \\ge c$**：若 $f(\\xi) < c$，取 $\\eta := (c - f(\\xi)) / 2 > 0$ 在连续性里，得到 $\\delta > 0$ 使 $|x - \\xi| < \\delta$ 时 $f(x) < c$。于是 $x := \\min\\{\\xi + \\delta / 2,\\ b\\}$ 满足 $f(x) < c$，即 $x \\in S$；但 $x > \\xi$ 与 $\\xi = \\sup S$ 矛盾（当 $\\xi = b$ 时第 2 步已给出 $f(b) \\le c$，而 $f(b) > c$，矛盾）。',
        '4. 两步合起来：$f(\\xi) = c$。∎'
      ].join('\n'),
      note: '证明里 $S$ 取了「$f \\le c$」而不是「$f < c$」：这样第 2 步可以直接用保序性，不必先证「取到上确界的点仍在 $S$ 里」。'
    },
    {
      id: 'imp.zero-point',
      kind: 'implication',
      sources: ['thm.ivt'],
      target: 'cor.zero-point',
      title: '介值定理 $\\implies$ 零点定理',
      proof: [
        '设 $f(a) f(b) < 0$。不妨设 $f(a) < 0 < f(b)$ —— 于是 $c = 0$ 介于 $f(a)$ 与 $f(b)$ 之间。由介值定理，存在 $\\xi \\in [a, b]$ 使 $f(\\xi) = 0$。',
        '',
        '再把 $\\xi$ 取到端点之内：若 $f(a) f(b) < 0$ 则 $f(a) \\ne 0$、$f(b) \\ne 0$，所以 $\\xi \\ne a$、$\\xi \\ne b$，即 $\\xi \\in (a, b)$。∎'
      ].join('\n'),
      note: '「取到端点之内」这一步正是零点定理比介值定理多出来的那一点内容。'
    },
    {
      id: 'imp.uniform-compact',
      kind: 'implication',
      sources: ['thm.bolzano-weierstrass', 'def.uniform-continuity'],
      target: 'thm.uniform-continuity-compact',
      title: '列紧性 + 一致连续的定义 $\\implies$ Cantor 定理',
      proof: [
        '反证。设 $f$ 在紧度量空间 $X$ 上连续但不一致连续。则存在 $\\varepsilon_0 > 0$，使对每个 $\\delta > 0$ 都能找到两点距离小于 $\\delta$、函数值却相差至少 $\\varepsilon_0$：',
        '',
        '即：对每个 $n$ 都能在 $X$ 中取到两点，同时满足下面两个条件 ——',
        '',
        '$$d(x_n, x_n\') < \\frac{1}{n}, \\qquad |f(x_n) - f(x_n\')| \\ge \\varepsilon_0$$',
        '',
        '1. $X$ 紧 $\\implies$ 列紧，故 $\\{x_n\\}$ 有子列 $x_{n_k} \\to x^{*} \\in X$。',
        '2. 由 $d(x_{n_k}, x_{n_k}\') < 1/n_k \\to 0$ 与三角不等式，$x_{n_k}\' \\to x^{*}$ 也成立。',
        '3. $f$ 在 $x^{*}$ 连续，所以 $f(x_{n_k}) \\to f(x^{*})$ 且 $f(x_{n_k}\') \\to f(x^{*})$。',
        '4. 于是 $|f(x_{n_k}) - f(x_{n_k}\')| \\le |f(x_{n_k}) - f(x^{*})| + |f(x^{*}) - f(x_{n_k}\')| \\to 0$，与它恒 $\\ge \\varepsilon_0$ 矛盾。∎'
      ].join('\n'),
      note: '这个证明的骨架是「把一致性失败翻译成两列点」，这正是紧性最擅长处理的形式 —— 同样的套路在「紧集上连续函数取到最值」「紧算子」里反复出现。'
    },
    {
      id: 'imp.monotone-inverse',
      kind: 'implication',
      sources: ['thm.ivt', 'thm.monotone-convergence'],
      target: 'thm.monotone-inverse',
      title: '介值定理 + 单调有界 $\\implies$ 反函数连续',
      proof: [
        '设 $f$ 在区间 $I$ 上严格递增且连续。',
        '',
        '1. **$f(I)$ 是区间**：取 $y_1 < y_2$ 属于 $f(I)$，即 $y_i = f(x_i)$。由严格递增 $x_1 < x_2$。任取 $y \\in (y_1, y_2)$，则 $f(x_1) < y < f(x_2)$，由介值定理在 $[x_1, x_2]$ 上存在 $x$ 使 $f(x) = y$，故 $y \\in f(I)$。',
        '2. **$f$ 是双射**：严格递增给出单射，$f(I)$ 的定义给出满射。',
        '3. **$f^{-1}$ 递增**：若 $y_1 < y_2$ 而 $f^{-1}(y_1) \\ge f^{-1}(y_2)$，由 $f$ 递增就有 $y_1 \\ge y_2$，矛盾。',
        '4. **$f^{-1}$ 连续**：设 $y_0 = f(x_0)$，给定 $\\varepsilon > 0$。由 $x_0$ 在 $I$ 内部的情形（端点同理）取 $x_0 - \\varepsilon < x_0 < x_0 + \\varepsilon$ 都落在 $I$ 内。令 $y_{-} := f(x_0 - \\varepsilon)$、$y_{+} := f(x_0 + \\varepsilon)$，取 $\\delta := \\min\\{y_0 - y_{-},\\ y_{+} - y_0\\} > 0$。则 $|y - y_0| < \\delta$ 时 $y_{-} < y < y_{+}$，由第 3 步的单调性得 $x_0 - \\varepsilon < f^{-1}(y) < x_0 + \\varepsilon$，即 $|f^{-1}(y) - x_0| < \\varepsilon$。∎'
      ].join('\n'),
      note: '证明里只用到了「严格单调 + 介值」，**没有**用到一致连续 —— 反函数连续是比「$f$ 一致连续」更弱的条件就能得到的结论。'
    },
    {
      id: 'imp.heineborel-bounded',
      kind: 'implication',
      sources: ['cor.heine-borel'],
      target: 'prop.continuous-bounded-on-compact',
      title: '闭区间紧（Heine–Borel）$\\implies$ 闭区间上的连续函数有界',
      proof: [
        '在 $\\mathbb{R}$ 上取 $X = [a, b]$。由 Heine–Borel，$[a, b]$ 是 $\\mathbb{R}$ 的有界闭子集，从而是紧的。于是「紧空间上的连续实值函数有界」这条命题**原封不动地**适用于 $X = [a, b]$，结论就是：$[a, b]$ 上的连续函数有界。∎'
      ].join('\n'),
      note: '这条边的方向是「一般 $\\implies$ 特例」：命题是紧度量空间的版本，$[a, b]$ 是它的一个实例。图上把它标出来，是因为初等微积分里大家用的都是这个特例。'
    }
  ]
});