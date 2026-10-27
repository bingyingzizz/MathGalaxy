/* ==========================================================================
   内容包 · 初等微积分 ⑥：函数列、幂级数与初等函数
   --------------------------------------------------------------------------
   新星团 `analysis.uniform`（17 点）。这一包回答两个问题：

     ① **极限能不能搬进积分 / 导数？** —— 一致收敛（三种交换定理）
     ② **初等函数是什么？** —— 幂级数。$\\exp$、$\\log$、$\\sin$、$\\cos$、$\\pi$
        全都由幂级数定义，而不是「画出来的那条曲线」。

   ⭐ 这是初等微积分的收尾：前面五包（极限、完备性、连续、中值定理、积分、级数）
      在这里合成一件成品 ——「一套能算的初等函数」。

   ⚠️ 公式里不放汉字；反斜杠一律写两个（源码态）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：函数列、幂级数与初等函数',
  nodes: [

    {
      id: 'def.pointwise-convergence',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '逐点收敛',
      title: '逐点收敛',
      regions: ['analysis'],
      tags: ['定义', '函数列', '收敛'],
      statement: [
        '设 $f_n : X \\to \\mathbb{R}$（$n = 1, 2, \\ldots$）与 $f : X \\to \\mathbb{R}$。称 $\\{f_n\\}$ **逐点收敛**到 $f$，当且仅当对**每个固定的** $x \\in X$ 都有',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n \\ge N :\\ |f_n(x) - f(x)| < \\varepsilon$$',
        '',
        '记 $f_n \\to f$（逐点）。'
      ].join('\n'),
      notes: '⭐ 注意量词的顺序：$\\exists N$ 出现在 $\\forall x$ **之后** —— 所以这里的 $N$ 可以依赖 $\\varepsilon$ **和 $x$**。每个人各用一个自己的 $N$，没人管别人。\n\n⚠ 逐点收敛太弱：极限函数可以**不连续**，极限与积分可以**不交换**。例：$f_n(x) = x^{n}$ 在 $[0, 1]$ 上逐点收敛到「$x < 1$ 时为 $0$、$x = 1$ 时为 $1$」的间断函数。\n\n⭐ 逐点收敛是「点态」概念，逐点验证即可；困难全在**能否把 $x$ 用一个统一的 $N$ 管住**上。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'def.uniform-convergence',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '一致收敛',
      title: '一致收敛 $f_n \\rightrightarrows f$',
      regions: ['analysis'],
      tags: ['定义', '函数列', '收敛'],
      statement: [
        '沿用上面的记号。称 $\\{f_n\\}$ **一致收敛**到 $f$，当且仅当',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n \\ge N,\\ \\forall x \\in X :\\ |f_n(x) - f(x)| < \\varepsilon$$',
        '',
        '记 $f_n \\rightrightarrows f$。等价说法（用上确界）：',
        '',
        '$$\\sup_{x \\in X} |f_n(x) - f(x)| \\xrightarrow{\\;n \\to \\infty\\;} 0$$'
      ].join('\n'),
      notes: '⭐ 与逐点收敛的唯一差别是**量词顺序**：这里 $\\exists N$ 出现在 $\\forall x$ **之前** —— 一个 $N$ 通吃整个定义域。\n\n⭐ 上确界形式是最常用的判据：一致收敛就是「误差函数的上确界趋于零」，也就是**在 sup 范数下收敛**。这也解释了它为什么是「函数空间里的收敛」而不是「点集上的收敛」。\n\n⚠ 一致收敛 $\\implies$ 逐点收敛，反之不然（$f_n(x) = x^{n}$ 在 $[0, 1]$ 上）。\n\n⭐ 这一包的三大交换定理（保连续、保积分、保导数）全都只需要一致收敛 —— 而 $f_n(x) = x^{n}$ 那种「漏掉一个点」的收敛恰好把连续性弄丢了。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'def.uniform-cauchy',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '一致 Cauchy 列',
      title: '一致 Cauchy 列',
      regions: ['analysis'],
      tags: ['定义', '函数列', '收敛'],
      statement: [
        '称 $\\{f_n\\}$ 是**一致 Cauchy 列**，当且仅当',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall m, n \\ge N,\\ \\forall x \\in X :\\ |f_m(x) - f_n(x)| < \\varepsilon$$',
        '',
        '即 $\\sup_{x} |f_m(x) - f_n(x)| \\to 0$（$m, n \\to \\infty$）。'
      ].join('\n'),
      notes: '⭐ 与一致收敛的关系：$\\{f_n\\}$ 一致收敛（到某个函数）$\\iff$ 它是一致 Cauchy 列 —— 证明与数列情形同构：必要性是三角不等式，充分性是「每个 $x$ 上逐点收敛（数列完备），再用一致 Cauchy 性把 $m \\to \\infty$ 取掉」。\n\n⭐ 它的价值在于**不必先知道极限函数是谁**：验证一致 Cauchy 只看 $\\{f_n\\}$ 自己。Weierstrass 判别法就是靠它把「一致收敛」化归成「尾部的上确界和可以任意小」。\n\n⚠ 逐点 Cauchy（对每个 $x$，数列 $\\{f_n(x)\\}$ 是 Cauchy）**弱于**一致 Cauchy，恰如逐点收敛弱于一致收敛。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'thm.uniform-limit-continuous',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: '一致收敛保连续',
      title: '定理：一致收敛的连续函数列的极限连续',
      regions: ['analysis'],
      tags: ['定理', '函数列', '收敛', '连续'],
      statement: [
        '设 $f_n : X \\to \\mathbb{R}$ 都连续，且 $f_n \\rightrightarrows f$。则 $f$ 连续。',
        '',
        '特别地：**一致收敛把 $C^{0}(X)$ 变成封闭的**（在这个意义下 $(C^{0}, \\|\\cdot\\|_{\\infty})$ 是完备的）。'
      ].join('\n'),
      notes: '⭐ 三个 $\\varepsilon/3$ 的标准套路：$|f(x) - f(x_0)| \\le |f(x) - f_n(x)| + |f_n(x) - f_n(x_0)| + |f_n(x_0) - f(x_0)|$。第一、三项靠**一致收敛**（同一个 $n$ 对两个点同时管用），第二项靠 $f_n$ 的连续性。\n\n⚠ 逐点收敛**不保连续**（$x^{n}$ 在 $[0, 1]$ 上），这就是三者里最重要的一条：一致收敛存在的理由就是为了让「连续性」这种整体性质能穿过极限。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'thm.uniform-limit-integral',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: '积分与极限交换',
      title: '定理：一致收敛 $\\implies$ 极限与积分可交换（Riemann 版）',
      regions: ['analysis'],
      tags: ['定理', '函数列', '积分', '收敛'],
      statement: [
        '设 $f_n$ 在 $[a, b]$ 上可积、$f_n \\rightrightarrows f$。则 $f$ 可积，且',
        '',
        '不但极限存在，而且可以给出误差估计：',
        '',
        '$$\\Bigl| \\int_a^b f_n - \\int_a^b f \\Bigr| \\le (b - a)\\,\\sup_{x} |f_n(x) - f(x)|$$'
      ].join('\n'),
      notes: '⭐ 证明只有一行：$\\bigl|\\int f_n - \\int f\\bigr| \\le \\int |f_n - f| \\le (b - a)\\sup_x |f_n - f|$，右端由一致收敛趋于零。\n\n⚠ **一致收敛不能换成逐点收敛**：$f_n = n\\,\\chi_{(0, 1/n)}$ 逐点收敛到 $0$ 而 $\\int f_n = 1$ 对一切 $n$ 成立。\n\n⭐ Lebesgue 那一侧把条件放宽到「控制收敛」（存在可积的 $g$ 压住 $|f_n|$）—— 但**必须带一个控制函数**，光有逐点收敛仍不够（上面那个例子就是：没有可积的 $g$ 压住 $n\\chi_{(0,1/n)}$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'thm.uniform-limit-derivative',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: '导数与极限交换',
      title: '定理：导数与极限可交换（需要导数一致收敛）',
      regions: ['analysis'],
      tags: ['定理', '函数列', '导数', '收敛'],
      statement: [
        '设 $f_n$ 在 $[a, b]$ 上可导、$f_n\'$ 都连续，且',
        '',
        '- $f_n\' \\rightrightarrows g$（**导数**一致收敛），',
        '- 至少有一个点 $x_0$ 处 $f_n(x_0)$ 收敛。',
        '',
        '则 $f_n$ 一致收敛到某 $f$，$f$ 可导，且',
        '',
        '$$f\' = g$$',
        '',
        '也就是求导与取极限可以交换：$\\bigl( \\lim_n f_n \\bigr)\' = \\lim_n f_n\'$。'
      ].join('\n'),
      notes: '⭐ 与积分那条的关键区别：**求导会把误差放大**，所以需要一致收敛的不是 $f_n$ 而是 $f_n\'$。还要额外假设「有一个点收敛」，否则 $f_n$ 可以全体差一个常数（$f_n + c_n$ 的导数收敛一样好）。\n\n⚠ 只假设 $f_n \\rightrightarrows f$ **不够**：$f_n(x) = \\frac{\\sin(nx)}{n}$ 一致收敛到 $0$，而 $f_n\'(x) = \\cos(nx)$ 处处不收敛。\n\n⭐ 证明走中值定理：对 $\\frac{f_n(x) - f_n(x_0)}{x - x_0}$ 用 Lagrange 中值定理把差商换成某点的 $f_n\'$，再让 $n \\to \\infty$ 用 $f_n\'$ 的一致收敛。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'prop.weierstrass-m-test',
      cluster: 'analysis.uniform',
      type: 'proposition',
      label: 'Weierstrass 判别法',
      title: '命题：Weierstrass 判别法（$M$-判别法）',
      regions: ['analysis'],
      tags: ['命题', '函数列', '级数', '收敛'],
      statement: [
        '设 $f_n : X \\to \\mathbb{R}$ 满足 $|f_n(x)| \\le M_n$ 对一切 $x \\in X$ 成立，且**正项级数** $\\sum M_n$ 收敛。则函数项级数',
        '',
        '$$\\sum_{n=1}^{\\infty} f_n(x)$$',
        '',
        '在 $X$ 上**一致收敛**（并且绝对收敛）。'
      ].join('\n'),
      notes: '⭐ 它是一致收敛最好用的判据：把「函数的事」压成「数列的事」—— 只要找到一个与 $x$ 无关的控制级数。\n\n⚠ 它给出的是**充分**条件：一致收敛的级数未必有这种「逐项统一控制」（$\\sum \\frac{(-1)^{n}}{n}$ 型的例子）。\n\n⭐ 用法：幂级数在 $|x| \\le r < R$ 上一致收敛，正是取 $M_n = |a_n| r^{n}$ 并对 $\\sum M_n$ 用根值判别法。这一条是下一段「幂级数」全部性质的入口。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'thm.dini',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: 'Dini 定理',
      title: '定理（Dini）：紧集上单调的逐点收敛就是一致收敛',
      regions: ['analysis'],
      tags: ['定理', '函数列', '收敛', '紧'],
      statement: [
        '设 $X$ 是**紧**度量空间，$f_n : X \\to \\mathbb{R}$ 连续、$f : X \\to \\mathbb{R}$ 连续，$f_n \\to f$ **逐点**收敛，且 $\\{f_n\\}$ 单调（$f_n \\le f_{n+1}$ 或 $f_n \\ge f_{n+1}$ 对一切 $n$ 成立）。则',
        '',
        '$$f_n \\rightrightarrows f$$'
      ].join('\n'),
      notes: '⭐ 它把「逐点」升级成「一致」，代价是三条额外假设：**紧**、**连续**（$f_n$ 与 $f$ 都要）、**单调**。三条都不能丢：\n- 不紧：$f_n(x) = \\min(nx, 1)$ 在 $(0, 1]$ 上\n- 极限不连续：$f_n = x^{n}$ 在 $[0, 1]$ 上（$f$ 间断）\n- 不单调：$f_n$ 取「尖峰」在 $[0, 1]$ 上滑动\n\n⭐ 证明是紧性的标准用法：对每个 $x$ 取足够大的 $n_x$ 使误差 $< \\varepsilon$，连续性给每个 $x$ 一个小邻域；紧性取出有限覆盖，取这些 $n_x$ 的最大值。**单调性**保证了「$n \\ge N$」而不是「$n = N$」—— 这就是它必须出场的地方。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 7']
    },
    {
      id: 'def.power-series',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '幂级数',
      title: '幂级数',
      regions: ['analysis'],
      tags: ['定义', '幂级数', '级数'],
      statement: [
        '给定数列 $\\{a_n\\} \\subseteq \\mathbb{R}$（或 $\\mathbb{C}$）与中心 $x_0$，形如',
        '',
        '$$\\sum_{n=0}^{\\infty} a_n (x - x_0)^{n}$$',
        '',
        '的表达式叫**幂级数**。使它在某个 $x$ 处收敛的那些 $x$ 构成**收敛域**；收敛域的**内部**总是一个以 $x_0$ 为中心的区间（或圆盘）。'
      ].join('\n'),
      notes: '⭐ 幂级数是「级数」与「函数」这两件事的交叉点：它既是一个级数（每一项都可算），又是一个函数（在收敛域上）。所以前面两包的工具都往这里汇合。\n\n⚠ 收敛域不一定是开区间：端点要单独判断（可能收敛、可能发散、可能条件收敛）—— 那正是 `thm.abel-endpoint` 处理的事。\n\n⭐ 有趣的现象：**幂级数在收敛域内部的行为完全没有「野蛮」余地**（无穷次可导，见「逐项求导」），这与一般的函数项级数形成鲜明对比。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'thm.convergence-radius',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: '收敛半径',
      title: '定理：Cauchy–Hadamard 收敛半径',
      regions: ['analysis'],
      tags: ['定理', '幂级数', '收敛'],
      statement: [
        '设 $\\sum a_n (x - x_0)^{n}$ 是幂级数，令（约定 $1/0 = +\\infty$、$1/{+\\infty} = 0$）',
        '',
        '$$R := \\frac{1}{\\limsup_{n \\to \\infty} \\sqrt[n]{|a_n|}}$$',
        '',
        '则：$|x - x_0| < R$ 时级数**绝对收敛**；$|x - x_0| > R$ 时级数**发散**；$|x - x_0| = R$ 时**无结论**。'
      ].join('\n'),
      notes: '⭐ $R$ 叫**收敛半径**，$(x_0 - R, x_0 + R)$ 叫收敛区间。证明就是对系数用**根值判别法**：$\\limsup \\sqrt[n]{|a_n (x - x_0)^{n}|} = |x - x_0| \\cdot \\limsup \\sqrt[n]{|a_n|}$。\n\n⚠ 这里用的必须是 $\\limsup$ 而不是 $\\lim$：$\\sqrt[n]{|a_n|}$ 未必收敛。\n\n⚠ $|x - x_0| = R$ 处三种情形都可能出现（$\\sum x^{n}$ 两端都发散、$\\sum x^{n}/n$ 一端收敛一端发散、$\\sum x^{n}/n^{2}$ 两端都收敛）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'thm.power-series-analytic',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: '幂级数的逐项运算',
      title: '定理：收敛区间内幂级数可逐项求导与积分',
      regions: ['analysis'],
      tags: ['定理', '幂级数', '导数', '积分'],
      statement: [
        '设 $f(x) := \\sum_{n=0}^{\\infty} a_n (x - x_0)^{n}$ 的收敛半径为 $R > 0$。则：',
        '',
        '- 在 $|x - x_0| < R$ 内 $f$ 连续，而且在每个 $[x_0 - r, x_0 + r]$（$r < R$）上**一致收敛**；',
        '- $f$ 在 $|x - x_0| < R$ 内可导，且**逐项求导**给出导数，收敛半径仍是 $R$：',
        '',
        '$$f\'(x) = \\sum_{n=1}^{\\infty} n\\, a_n (x - x_0)^{n-1}$$',
        '',
        '- 同理可以**逐项积分**，收敛半径仍是 $R$。'
      ].join('\n'),
      notes: '⭐ 结论里最值得注意的是「**收敛半径不变**」：逐项求导后系数变成 $n a_n$，$\\sqrt[n]{n} \\to 1$ 所以半径一动不动。于是可以反复求导 —— **幂级数在收敛区间内是 $C^{\\infty}$ 的**，而且各阶导数都由系数决定：$a_n = f^{(n)}(x_0)/n!$。\n\n⚠ 「一致收敛」只在**闭的子区间** $[x_0 - r, x_0 + r]$ 上成立，不能推广到整个开区间 —— 端点附近一致收敛会失效。\n\n⭐ 这一条是 Taylor 公式的另一面：Taylor 定理说「$f$ 可以用多项式逼近」，这里说「如果 $f$ **本身**是幂级数，那这些多项式就是它的部分和，而且确实收敛到 $f$」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'thm.abel-endpoint',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: 'Abel 第二定理',
      title: '定理（Abel 第二定理）：端点处的连续性',
      regions: ['analysis'],
      tags: ['定理', '幂级数', '收敛'],
      statement: [
        '设 $f(x) = \\sum_{n=0}^{\\infty} a_n x^{n}$ 的收敛半径 $R = 1$，且 $\\sum a_n$ **收敛**（即右端 $x = 1$ 处收敛）。则',
        '',
        '$$\\lim_{x \\to 1^{-}} f(x) = \\sum_{n=0}^{\\infty} a_n$$',
        '',
        '即 $f$ 在 $x = 1$ 处**左连续**（把 $f$ 在端点补上收敛值之后）。'
      ].join('\n'),
      notes: '⭐ 含义：**幂级数在收敛区间的端点是「连续地」离开的**，只要那一端真的收敛。它把「区间内部的和」与「端点上的和」接了起来，是求某些数项级数之和的标准手法：\n\n$$\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n} = \\lim_{x \\to 1^{-}} \\ln(1 + x) = \\ln 2$$',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'def.exp-function',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '指数函数',
      title: '指数函数 $\\exp$（由幂级数定义）',
      regions: ['analysis'],
      tags: ['定义', '幂级数', '初等函数'],
      statement: [
        '对 $z \\in \\mathbb{C}$，定义',
        '',
        '$$\\exp z := \\sum_{n=0}^{\\infty} \\frac{z^{n}}{n!}$$',
        '',
        '该级数对每个 $z$ 都绝对收敛（收敛半径 $+\\infty$），并且满足',
        '',
        '$$\\exp(z + w) = \\exp z \\cdot \\exp w, \\qquad \\exp 0 = 1, \\qquad \\frac{d}{dz}\\exp z = \\exp z$$'
      ].join('\n'),
      notes: '⭐ **先有级数，后有 $e^{x}$**：这样定义的原因是它不依赖任何几何直观、对复数同样成立、而且所有性质（函数方程、导数等于自身）都能从级数里算出来。\n\n⭐ 函数方程的证明是卷积：$\\exp(z+w) = \\sum_n \\frac{(z+w)^{n}}{n!}$，把 $(z+w)^{n}$ 二项式展开再重排（绝对收敛，重排合法）。\n\n⚠ $\\exp$ 从不取零值：$\\exp z \\cdot \\exp(-z) = \\exp 0 = 1$。于是它把 $\\mathbb{C}$ 送进 $\\mathbb{C} \\setminus \\{0\\}$。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'def.log-function',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '对数函数与 e',
      title: '对数函数 $\\log$ 与常数 $e$',
      regions: ['analysis'],
      tags: ['定义', '初等函数'],
      statement: [
        '$\\exp$ 在 $\\mathbb{R}$ 上严格递增（因为 $(\\exp x)\' = \\exp x > 0$），其像为 $(0, +\\infty)$。定义 $\\log : (0, +\\infty) \\to \\mathbb{R}$ 为它的反函数：',
        '',
        '$$\\log := (\\exp|_{\\mathbb{R}})^{-1}, \\qquad e := \\exp 1 = \\sum_{n=0}^{\\infty} \\frac{1}{n!}$$',
        '',
        '于是',
        '',
        '$$\\log(xy) = \\log x + \\log y, \\qquad \\frac{d}{dx}\\log x = \\frac{1}{x}$$'
      ].join('\n'),
      notes: '⭐ 反函数连续且单调（见「反函数连续」），导数由反函数求导得到。\n\n⚠ $\\log$ 的定义域是 $(0, +\\infty)$ —— 在 $\\mathbb{R}$ 上 $\\exp$ 取不到非正值，所以 $\\log$ 也没有负数输入（复对数要另开一支，那里有分支切割的问题）。\n\n⭐ $e$ 的两个常见面孔在这里统一：$e = \\exp 1 = \\sum 1/n!$ 与 $e = \\lim_n (1 + 1/n)^{n}$ 可以互相推出，但前者是定义、后者是定理。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'def.trig-function',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '正弦与余弦',
      title: '正弦、余弦（由幂级数定义）',
      regions: ['analysis'],
      tags: ['定义', '幂级数', '初等函数'],
      statement: [
        '对 $z \\in \\mathbb{C}$，定义',
        '',
        '$$\\cos z := \\sum_{k=0}^{\\infty} \\frac{(-1)^{k}}{(2k)!}\\, z^{2k}, \\qquad \\sin z := \\sum_{k=0}^{\\infty} \\frac{(-1)^{k}}{(2k+1)!}\\, z^{2k+1}$$',
        '',
        '两个级数对每个 $z$ 都绝对收敛（收敛半径 $+\\infty$），并且',
        '',
        '$$\\cos\' = -\\sin, \\qquad \\sin\' = \\cos, \\qquad \\cos 0 = 1, \\qquad \\sin 0 = 0$$'
      ].join('\n'),
      notes: '⭐ 三角函数的**分析定义**（而非几何定义）：由级数出发，一切恒等式与求导公式都可以算出来，而且自动对复数成立。\n\n⭐ 与 $\\exp$ 的关系将在「Euler 公式」那一条里揭晓：把 $\\exp$ 的级数按 $n$ 的奇偶拆开，就得到 $\\cos$ 与 $\\sin$。\n\n⚠ 几何意义（单位圆、角度、弧度）是**后来**才接上的：级数先告诉我们 $\\cos$ 有零点、$\\sin$ 有周期，几何图像才随之而来。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'def.pi',
      cluster: 'analysis.uniform',
      type: 'definition',
      label: '圆周率 π',
      title: '常数 $\\pi$（由余弦的最小正零点定义）',
      regions: ['analysis'],
      tags: ['定义', '初等函数'],
      statement: [
        '由 $\\cos$ 的幂级数可以证明：$\\cos$ 在 $(0, 2)$ 内**恰有一个**零点。把它记为 $\\pi / 2$，即',
        '',
        '$$\\pi := 2 \\cdot \\min \\{ x > 0 : \\cos x = 0 \\}$$',
        '',
        '于是 $\\cos(\\pi/2) = 0$、$\\sin(\\pi/2) = 1$，而且 $\\cos$ 与 $\\sin$ 都以 $2\\pi$ 为周期。'
      ].join('\n'),
      notes: '⭐ $\\pi$ 在这里不是「周长与直径之比」—— 那是**几何**事实，要靠弧长理论才能证明。分析里的 $\\pi$ 定义为**余弦的最小正零点**，于是周期、正交性、Fourier 展开全都从级数里长出来。\n\n⭐ 存在性的关键一步：$\\cos 0 = 1 > 0$ 而 $\\cos 2 < 0$（由级数估值：$\\cos 2 = 1 - 2 + \\frac{16}{24} - \\cdots$ 的尾巴被控制住），由**介值定理**得到零点。唯一性靠 $\\sin > 0$ 在 $(0, 2)$ 上（$\\cos\' = -\\sin$ 且 $\\sin$ 递增为正）。\n\n⚠ 定义里用的是 $\\min$，所以先要证明那个集合非空 —— 这正是上面说的介值定理那一步。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    },
    {
      id: 'thm.euler-formula',
      cluster: 'analysis.uniform',
      type: 'theorem',
      label: 'Euler 公式',
      title: '定理：$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$',
      regions: ['analysis'],
      tags: ['定理', '复', '初等函数'],
      statement: [
        '对一切实数（或复数）$\\theta$，',
        '',
        '$$\\exp(i\\theta) = e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$',
        '',
        '特别地 $e^{i\\pi} = -1$。'
      ].join('\n'),
      notes: '⭐ 这条公式把**指数、三角、复数**三件事焊成一件：$\\theta \\mapsto e^{i\\theta}$ 是单位圆上以弧长 $\\theta$ 为参数的运动，实部是 $\\cos$、虚部是 $\\sin$。\n\n⭐ 证明就是**重排级数**（见下面的证明）：把 $\\exp$ 的级数按奇偶项拆开。表面上看只是换了个写法，实际上它给出了「$\\cos$ 与 $\\sin$ 是同一个指数函数的两个分量」这个结构性事实。\n\n⚠ 注意这里**不需要**任何几何输入：弧长、角度、单位圆这些词都只是事后对公式的**解释**。反过来，正因为有这条公式，三角函数才可能有周期（周期来自 $e^{2\\pi i} = 1$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.seqlimit-pointwise',
      kind: 'definition',
      definition: 'def.sequence-limit',
      usedBy: 'def.pointwise-convergence',
      note: '逐点收敛就是「对每个固定的 $x$，数列 $f_n(x)$ 按原来的定义收敛」—— 把数列极限逐点地用一遍。'
    },
    {
      id: 'dep.pointwise-uniform',
      kind: 'definition',
      definition: 'def.pointwise-convergence',
      usedBy: 'def.uniform-convergence',
      note: '两个定义用的是同一套 $\\varepsilon$-$N$ 语言，差别只在 $\\exists N$ 与 $\\forall x$ 的先后顺序。'
    },
    {
      id: 'dep.uniform-uniformcauchy',
      kind: 'definition',
      definition: 'def.uniform-convergence',
      usedBy: 'def.uniform-cauchy',
      note: '一致 Cauchy 是把一致收敛的定义里「与 $f$ 比较」换成「$f_m$ 与 $f_n$ 互相比较」，量词形状不变。'
    },
    {
      id: 'dep.series-powerseries',
      kind: 'definition',
      definition: 'def.series',
      usedBy: 'def.power-series',
      note: '幂级数就是系数为 $a_n (x - x_0)^{n}$ 的函数项级数；固定 $x$ 之后它就是一个数项级数。'
    },
    {
      id: 'dep.powerseries-exp',
      kind: 'definition',
      definition: 'def.power-series',
      usedBy: 'def.exp-function',
      note: '$\\exp$ 的级数 $\\sum z^{n}/n!$ 就是一个收敛半径为 $+\\infty$ 的幂级数。'
    },
    {
      id: 'dep.powerseries-trig',
      kind: 'definition',
      definition: 'def.power-series',
      usedBy: 'def.trig-function',
      note: '$\\cos$ 与 $\\sin$ 同样由幂级数定义，只保留偶次项 / 奇次项。'
    },
    {
      id: 'dep.exp-log',
      kind: 'definition',
      definition: 'def.exp-function',
      usedBy: 'def.log-function',
      note: '$\\log$ 定义为 $\\exp$（限制在 $\\mathbb{R}$ 上）的反函数，所以它的存在性来自 $\\exp$ 的单调性。'
    },
    {
      id: 'dep.trig-pi',
      kind: 'definition',
      definition: 'def.trig-function',
      usedBy: 'def.pi',
      note: '$\\pi$ 用 $\\cos$ 的最小正零点定义 —— 没有 $\\cos$ 的幂级数，这个定义写不出来。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.uniform-limit-continuous',
      kind: 'implication',
      sources: ['def.uniform-convergence', 'def.continuous'],
      target: 'thm.uniform-limit-continuous',
      title: '一致收敛 + 连续 $\\implies$ 极限连续',
      proof: [
        '设 $x_0 \\in X$，给定 $\\varepsilon > 0$。',
        '',
        '1. 由一致收敛，存在 $n$，使**对一切 $x$** 有 $|f_n(x) - f(x)| < \\varepsilon / 3$。',
        '2. 由 $f_n$ 在 $x_0$ 连续，存在 $\\delta > 0$，使 $d(x, x_0) < \\delta$ 时 $|f_n(x) - f_n(x_0)| < \\varepsilon / 3$。',
        '3. 对这样的 $x$，三角不等式给出',
        '',
        '$$|f(x) - f(x_0)| \\le |f(x) - f_n(x)| + |f_n(x) - f_n(x_0)| + |f_n(x_0) - f(x_0)| < \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} + \\frac{\\varepsilon}{3} = \\varepsilon$$',
        '',
        '故 $f$ 在 $x_0$ 连续。由 $x_0$ 任意，$f$ 连续。∎'
      ].join('\n'),
      note: '第 1 步之所以能用一个 $n$ 同时管住 $x$ 与 $x_0$，正是**一致**收敛的全部内容 —— 换成逐点收敛，第 1 步会给出两个不同的 $n$，证明立刻断裂。'
    },
    {
      id: 'imp.uniform-limit-integral',
      kind: 'implication',
      sources: ['def.uniform-convergence', 'prop.integral-order'],
      target: 'thm.uniform-limit-integral',
      title: '一致收敛 + 积分的绝对值估计 $\\implies$ 极限与积分交换',
      proof: [
        '记 $\\varepsilon_n := \\sup_{x \\in [a, b]} |f_n(x) - f(x)|$。',
        '',
        '1. **可积性**：$f = f_n + (f - f_n)$，其中 $f_n$ 可积、而 $f - f_n$ 被常数 $\\varepsilon_n$ 控制；用振幅判据，$\\omega(f - f_n) \\le 2\\varepsilon_n$ 逐段成立，故 $f - f_n$ 可积，从而 $f$ 可积。（也可以直接对 $f$ 用振幅判据与 $f_n$ 的振幅比较。）',
        '2. **估计**：由积分的绝对值不等式与基本估计，',
        '',
        '$$\\Bigl| \\int_a^b f_n - \\int_a^b f \\Bigr| = \\Bigl| \\int_a^b (f_n - f) \\Bigr| \\le \\int_a^b |f_n - f| \\le (b - a)\\,\\varepsilon_n$$',
        '3. 由一致收敛 $\\varepsilon_n \\to 0$，右端趋于零，故极限与积分可交换。∎'
      ].join('\n'),
      note: '整个证明里**没有一次**提到具体是哪个 $x$ —— 误差被一个与 $x$ 无关的常数 $\\varepsilon_n$ 统一控制，这就是一致收敛的力量。'
    },
    {
      id: 'imp.uniform-limit-derivative',
      kind: 'implication',
      sources: ['def.uniform-convergence', 'thm.mvt', 'thm.uniform-limit-continuous'],
      target: 'thm.uniform-limit-derivative',
      title: '中值定理 + 一致收敛 $\\implies$ 导数与极限可交换',
      proof: [
        '设 $f_n\' \\rightrightarrows g$ 且 $f_n(x_0)$ 收敛。',
        '',
        '1. **$\\{f_n\\}$ 一致收敛**：对 $x \\in [a, b]$，由中值定理存在 $\\xi$ 介于 $x$ 与 $x_0$ 之间使 $f_n(x) - f_n(x_0) = f_n\'(\\xi)(x - x_0)$，于是',
        '',
        '$$|f_m(x) - f_n(x)| \\le |f_m(x_0) - f_n(x_0)| + |x - x_0| \\cdot \\sup_{t}|f_m\'(t) - f_n\'(t)| \\le |f_m(x_0) - f_n(x_0)| + (b - a)\\|f_m\' - f_n\'\\|_{\\infty}$$',
        '',
        '右端与 $x$ 无关且（由 $f_n(x_0)$ 收敛与 $f_n\'$ 一致 Cauchy）可以任意小，故 $\\{f_n\\}$ 一致 Cauchy，因而一致收敛到某个 $f$；再由上一条 $f$ 连续。',
        '',
        '2. **求导**：固定 $x$，对 $h \\ne 0$ 定义 $\\varphi_n(h) := \\frac{f_n(x + h) - f_n(x)}{h}$。由中值定理 $\\varphi_n(h) = f_n\'(\\xi_n)$ 对某个 $\\xi_n$；又对 $n \\to \\infty$，$\\varphi_n(h) \\to \\frac{f(x+h) - f(x)}{h} =: \\varphi(h)$。',
        '',
        '3. 在 $n \\to \\infty$ **之后**再令 $h \\to 0$：$\\varphi(h) = \\lim_n \\varphi_n(h) = \\lim_n f_n\'(\\xi_n(h))$，而 $f_n\' \\rightrightarrows g$ 给出 $\\varphi(h) \\to g(x)$。两个极限交换的合法性来自 $f_n\'$ 的一致收敛（同第 1 步的估计）。故 $f\'(x) = g(x)$。∎'
      ].join('\n'),
      note: '第 1 步是关键的准备：**假设 $f_n\'$ 一致收敛，就能白送 $f_n$ 的一致收敛**。这也说明了为什么这条定理比积分那条「贵」—— 需要额外的一个收敛点 $x_0$ 来定住那个自由常数。'
    },
    {
      id: 'imp.weierstrass-m-test',
      kind: 'implication',
      sources: ['thm.comparison-test', 'def.uniform-cauchy'],
      target: 'prop.weierstrass-m-test',
      title: '比较判别法 + 一致 Cauchy $\\implies$ Weierstrass 判别法',
      proof: [
        '设 $|f_n(x)| \\le M_n$、$\\sum M_n$ 收敛。记部分和 $S_N(x) := \\sum_{n \\le N} f_n(x)$。',
        '',
        '对 $N\' > N$，',
        '',
        '$$|S_{N\'}(x) - S_N(x)| \\le \\sum_{n = N+1}^{N\'} |f_n(x)| \\le \\sum_{n = N+1}^{N\'} M_n$$',
        '',
        '右端与 $x$ 无关，而 $\\sum M_n$ 收敛（由数项级数的 Cauchy 准则）使它可以任意小 —— 所以 $\\{S_N\\}$ 是**一致 Cauchy 列**，因而一致收敛。绝对收敛同理（$\\sum |f_n(x)| \\le \\sum M_n$）。∎'
      ].join('\n'),
      note: '证明的要害是「右端与 $x$ 无关」这一步：把 $x$ 从估计里彻底消掉，就得到了一致性。'
    },
    {
      id: 'imp.dini',
      kind: 'implication',
      sources: ['def.uniform-convergence', 'def.continuous', 'def.compact'],
      target: 'thm.dini',
      title: '紧性 + 单调 + 连续性 $\\implies$ Dini 定理',
      proof: [
        '以 $f_n \\uparrow f$ 为例（$f_n \\downarrow f$ 时对 $-f_n$ 用同样的论证）。给定 $\\varepsilon > 0$。',
        '',
        '1. 对每个 $x \\in X$，由逐点单调收敛存在 $n_x$ 使 $0 \\le f(x) - f_{n_x}(x) < \\varepsilon$（这里用到了「$f_n(x)$ 单调递增地收敛到 $f(x)$」）。',
        '2. 由 $f$ 与 $f_{n_x}$ 都连续，存在 $x$ 的邻域 $U_x$ 使 $y \\in U_x$ 时 $|f(y) - f(x)| < \\varepsilon$ 且 $|f_{n_x}(y) - f_{n_x}(x)| < \\varepsilon$。合并：$y \\in U_x$ 时 $f(y) - f_{n_x}(y) < 3\\varepsilon$。',
        '3. $\\{U_x\\}_{x \\in X}$ 是紧空间 $X$ 的开覆盖，取出有限子覆盖 $U_{x_1}, \\ldots, U_{x_k}$，令 $N := \\max\\{n_{x_1}, \\ldots, n_{x_k}\\}$。',
        '4. 对任意 $y \\in X$，$y$ 落在某个 $U_{x_j}$ 里；由**单调性** $n \\ge N \\ge n_{x_j}$ 时 $f_{n}(y) \\ge f_{n_{x_j}}(y)$，于是 $f(y) - f_n(y) \\le f(y) - f_{n_{x_j}}(y) < 3\\varepsilon$。',
        '',
        '故 $\\sup_y |f(y) - f_n(y)| \\le 3\\varepsilon$ 对一切 $n \\ge N$ 成立，即 $f_n \\rightrightarrows f$。∎'
      ].join('\n'),
      note: '第 4 步是**单调性唯一**出场的地方：它把「$n = n_{x_j}$ 时误差小」升级成「一切 $n \\ge N$ 时误差小」。没有单调性，有限覆盖给出的只是一列互不相干的点。'
    },
    {
      id: 'imp.convergence-radius',
      kind: 'implication',
      sources: ['thm.root-test', 'def.power-series'],
      target: 'thm.convergence-radius',
      title: '根值判别法 $\\implies$ Cauchy–Hadamard 公式',
      proof: [
        '记 $b_n(x) := a_n (x - x_0)^{n}$，则 $\\sqrt[n]{|b_n(x)|} = |x - x_0| \\cdot \\sqrt[n]{|a_n|}$。',
        '',
        '1. 由 $\\limsup$ 的乘法性质，',
        '',
        '$$\\limsup_{n} \\sqrt[n]{|b_n(x)|} = |x - x_0| \\cdot \\limsup_{n} \\sqrt[n]{|a_n|} = \\frac{|x - x_0|}{R}$$',
        '',
        '（约定 $R = +\\infty$ 时右端为 $0$、$R = 0$ 时为 $+\\infty$。）',
        '2. 由**根值判别法**：上式 $< 1$ 即 $|x - x_0| < R$ 时绝对收敛；$> 1$ 即 $|x - x_0| > R$ 时发散。',
        '3. $|x - x_0| = R$ 时上式恰为 $1$，根值判别法在此**没有结论**。∎'
      ].join('\n'),
      note: '注意用 $\\limsup$ 而非 $\\lim$ 的必要性：根值判别法本身就是用 $\\limsup$ 陈述的，所以这条公式才对所有幂级数（包括那些系数没有极限的）都成立。'
    },
    {
      id: 'imp.power-series-analytic',
      kind: 'implication',
      sources: ['thm.uniform-limit-derivative', 'prop.weierstrass-m-test', 'thm.convergence-radius'],
      target: 'thm.power-series-analytic',
      title: 'M-判别法 + 导数交换 $\\implies$ 幂级数可逐项求导',
      proof: [
        '设 $r < R$，取 $r < \\rho < R$。',
        '',
        '1. **在 $[x_0 - r, x_0 + r]$ 上一致收敛**：$|a_n (x - x_0)^{n}| \\le |a_n| \\rho^{n}$，而 $\\sum |a_n| \\rho^{n}$ 收敛（因为 $\\rho < R$），由 Weierstrass 判别法一致收敛。再由「一致收敛保连续」，$f$ 在每个这样的区间上连续，从而在 $|x - x_0| < R$ 内连续。',
        '2. **逐项求导后的级数**：$\\sum n a_n (x - x_0)^{n-1}$ 的收敛半径是',
        '',
        '$$\\frac{1}{\\limsup \\sqrt[n]{n|a_n|}} = \\frac{1}{\\limsup \\sqrt[n]{|a_n|}} = R$$',
        '',
        '（因为 $\\sqrt[n]{n} \\to 1$。）于是它在 $[x_0 - r, x_0 + r]$ 上也一致收敛（同样用 M-判别法）。',
        '3. **交换求导与极限**：对部分和 $S_N$（多项式）用「导数与极限可交换」：$S_N\' \\rightrightarrows$ 逐项求导级数，且 $S_N(x_0) = a_0$ 收敛，故 $f$ 可导且 $f\' = \\sum n a_n (x - x_0)^{n-1}$。',
        '4. 逐项积分的结论对 $f$ 的部分和用「极限与积分可交换」同理。∎'
      ].join('\n'),
      note: '第 2 步是整条定理的关键：**求导不改变收敛半径**。若半径会缩，反复求导就会把收敛域吃光，$C^{\\infty}$ 的结论也就无从谈起。'
    },
    {
      id: 'imp.abel-endpoint',
      kind: 'implication',
      sources: ['def.power-series', 'thm.abel-dirichlet-series'],
      target: 'thm.abel-endpoint',
      title: 'Abel–Dirichlet 判别法 $\\implies$ Abel 第二定理',
      proof: [
        '设 $R = 1$、$\\sum a_n$ 收敛，要证 $\\lim_{x \\to 1^{-}} f(x) = \\sum a_n$。记 $s := \\sum_{n} a_n$、$s_N := \\sum_{n \\le N} a_n$。',
        '',
        '1. **分部求和（Abel 求和）**：对 $0 \\le x < 1$，',
        '',
        '$$f(x) = \\sum_{n=0}^{\\infty} a_n x^{n} = (1 - x)\\sum_{n=0}^{\\infty} s_n x^{n}$$',
        '',
        '（证明：把 $a_n = s_n - s_{n-1}$ 代入，交换求和次序，得到 $(1-x)\\sum s_n x^n$。）',
        '2. 由 $\\sum a_n = s$ 收敛，$\\{s_n\\}$ 有界，且 $s_n \\to s$。把上式改写成',
        '',
        '$$f(x) - s = (1 - x)\\sum_{n=0}^{\\infty} (s_n - s)\\, x^{n}$$',
        '3. 给定 $\\varepsilon > 0$，取 $N$ 使 $n \\ge N$ 时 $|s_n - s| < \\varepsilon / 2$。把和拆成前 $N$ 项与尾部：前 $N$ 项乘上 $(1 - x)$ 当 $x \\to 1^{-}$ 时趋于零；尾部被 $(1-x)\\sum_{n \\ge N} \\varepsilon/2 \\cdot x^{n} \\le \\varepsilon/2$ 控制。',
        '4. 合并：$\\limsup_{x \\to 1^{-}} |f(x) - s| \\le \\varepsilon/2 < \\varepsilon$，故极限为 $s$。∎',
        '',
        '（这里第 1 步的求和是 Abel 求和法的核心 —— 它与 Abel–Dirichlet 判别法同源：都是把一个级数换成它的部分和的加权平均。）'
      ].join('\n'),
      note: '「$(1-x)\\sum s_n x^{n}$」这个改写把 $\\{s_n\\}$ 的**收敛性**变成了权重 $(1-x)x^{n}$ 的**平均** —— 权重之和恰为 $1$，所以极限读起来就是「$s_n$ 的加权平均趋于 $s$」。'
    },
    {
      id: 'imp.euler-formula',
      kind: 'implication',
      sources: ['def.exp-function', 'def.trig-function'],
      target: 'thm.euler-formula',
      title: '级数的奇偶拆分 $\\implies$ Euler 公式',
      proof: [
        '把 $\\exp(i\\theta)$ 的级数按 $n$ 的奇偶拆开：',
        '',
        '$$\\exp(i\\theta) = \\sum_{n=0}^{\\infty} \\frac{(i\\theta)^{n}}{n!} = \\sum_{k=0}^{\\infty} \\frac{(i\\theta)^{2k}}{(2k)!} + \\sum_{k=0}^{\\infty} \\frac{(i\\theta)^{2k+1}}{(2k+1)!}$$',
        '',
        '用 $i^{2k} = (-1)^{k}$、$i^{2k+1} = (-1)^{k} i$：',
        '',
        '$$= \\sum_{k=0}^{\\infty} \\frac{(-1)^{k}\\theta^{2k}}{(2k)!} + i \\sum_{k=0}^{\\infty} \\frac{(-1)^{k}\\theta^{2k+1}}{(2k+1)!} = \\cos\\theta + i\\sin\\theta$$',
        '',
        '（拆分与重排的合法性来自绝对收敛。）取 $\\theta = \\pi$：由 $\\cos\\pi = -1$、$\\sin\\pi = 0$ 得 $e^{i\\pi} = -1$。∎'
      ].join('\n'),
      note: '整条证明只有「拆奇数项与偶数项」这一个动作 —— 但这一步把指数函数与三角函数之间的关系揭示成**一个恒等式**，而不是两个巧合。'
    }
  ]
});
