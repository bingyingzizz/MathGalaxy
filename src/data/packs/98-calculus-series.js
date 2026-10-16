/* ==========================================================================
   内容包 · 初等微积分 ⑤：数项级数的敛散性
   --------------------------------------------------------------------------
   新星团 `analysis.series`（13 点）。这一包造的是**判据**：

     正项级数：比较 → Kummer（总纲）→ 根值 / 积分 / 凝聚
     一般项：  Cauchy 准则 → Abel–Dirichlet
     分水岭：  绝对收敛（可重排、可相乘） vs 条件收敛（什么都可能）

   ⭐ 用户 2026-10-16 拍板的口径：**判别法以 Kummer 为总纲** ——
      d'Alembert（比值）/ Raabe / Bertrand / Gauss 全是它在 $c_n = 1,\\ n,\\ n\\ln n,\\ \\ldots$
      下的特例，写进 `thm.kummer` 的 notes，**不单独建节点**；
      Leibniz 同理是 Abel–Dirichlet 的特例。
   ⚠️ 但比较判别法、根值判别法、积分判别法、凝聚判别法**不是** Kummer 的推论（各有独立机制），
      保留独立节点 —— 理由写在各自的 notes 里，免得以后被「精简」掉。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：数项级数的敛散性',
  nodes: [

    {
      id: 'thm.cauchy-criterion-series',
      cluster: 'analysis.series',
      type: 'theorem',
      label: '级数的 Cauchy 准则',
      title: '定理：级数收敛 $\\iff$ 尾部可以任意小',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '设 $\\{a_n\\} \\subseteq \\mathbb{R}$，$s_N := \\sum_{n=1}^{N} a_n$。则 $\\sum a_n$ 收敛，当且仅当',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n > m \\ge N :\\ \\Bigl| \\sum_{k=m+1}^{n} a_k \\Bigr| < \\varepsilon$$',
        '',
        '**必要条件**：$\\sum a_n$ 收敛 $\\implies$ $a_n \\to 0$。'
      ].join('\n'),
      notes: '⭐ 这条准则的作用是**把级数问题变成数列问题**：它不过是 $\\mathbb{R}$ 的 Cauchy 收敛准则用在部分和数列 $\\{s_N\\}$ 上（配上区间可加性把 $s_n - s_m$ 写成一段尾巴）。\n\n⚠ 「$a_n \\to 0$」只是**必要**条件：调和级数 $\\sum 1/n$ 的通项趋于零而级数发散。判发散时它很有用（通项不趋于零就直接发散），判收敛时它什么也说明不了。\n\n⭐ 整个这一包的一切判据都以它为母体：比较判别法用「尾巴被更大的尾巴压住」，Abel–Dirichlet 用「尾巴被部分和的有界性压住」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.comparison-test',
      cluster: 'analysis.series',
      type: 'theorem',
      label: '比较判别法',
      title: '定理：比较判别法（Comparison Test）',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '设 $0 \\le a_n \\le b_n$ 对充分大的 $n$ 成立。则',
        '',
        '- $\\sum b_n$ 收敛 $\\implies$ $\\sum a_n$ 收敛；',
        '- $\\sum a_n$ 发散 $\\implies$ $\\sum b_n$ 发散。',
        '',
        '**极限形式**：若 $a_n, b_n > 0$ 且 $\\dfrac{a_n}{b_n} \\to L$，则 $L \\in (0, +\\infty)$ 时两者**同敛散**；$L = 0$ 时由 $\\sum b_n$ 收敛推出 $\\sum a_n$ 收敛。'
      ].join('\n'),
      notes: '⭐ 这是**所有正项级数判据的地基**，而它自己只是「部分和单调有界 $\\implies$ 收敛」的直接翻译：$\\sum a_n$ 的部分和被 $\\sum b_n$ 的部分和压住。\n\n⚠ 前提是**非负**（或至少最终非负）：有正有负时部分和不再单调，「压住」什么也不意味着。\n\n⚠ 它**不是** Kummer 判别法的推论 —— 方向相反：Kummer 判别法的证明本身就要用到「部分和单调有界」这一套（即比较的思想）。把这条删掉会让整包判据失去落脚点。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.kummer',
      cluster: 'analysis.series',
      type: 'theorem',
      label: 'Kummer 判别法',
      title: '定理：Kummer 判别法（正项级数判据的总纲）',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛', 'Kummer'],
      statement: [
        '设 $\\sum a_n$ 是**正项**级数（$a_n > 0$），$\\{c_n\\}$ 是一列正数。令',
        '',
        '$$K_n := c_n \\cdot \\frac{a_n}{a_{n+1}} - c_{n+1}$$',
        '',
        '则：',
        '',
        '- **收敛**：若 $\\liminf_{n \\to \\infty} K_n > 0$，则 $\\sum a_n$ 收敛；',
        '- **发散**：若 $\\sum \\frac{1}{c_n}$ 发散，且 $K_n \\le 0$ 对充分大的 $n$ 成立，则 $\\sum a_n$ 发散。'
      ].join('\n'),
      notes: '⭐ 这一条是**正项级数判据的总纲**：所有「比值型」的判别法都是它取不同的 $\\{c_n\\}$ 得到的 ——\n\n- $c_n = 1$：**d\'Alembert（比值）判别法** —— $\\lim \\frac{a_{n+1}}{a_n} < 1$ 收敛、$> 1$ 发散；\n- $c_n = n$：**Raabe 判别法** —— $\\lim n\\bigl(\\frac{a_n}{a_{n+1}} - 1\\bigr) > 1$ 收敛；\n- $c_n = n \\ln n$：**Bertrand 判别法** —— 比 Raabe 更细的一档；\n- $c_n$ 由 Gauss 展开给出：**Gauss 判别法** —— 处理 $a_n/a_{n+1} = 1 + \\frac{\\mu}{n} + O(n^{-1-\\delta})$ 那一类。\n\n⚠ 收敛那一支要求的是 $\\liminf K_n > 0$（不是 $\\lim K_n$，也不是某一个 $K_n > 0$）。\n\n⚠ 发散那一支多一个条件「$\\sum 1/c_n$ 发散」—— 取 $c_n = 1$ 时它就是 $\\sum 1$ 发散，取 $c_n = n$ 时是调和级数发散，都不是免费的。\n\n⚠ **哪些不是它的推论**：比较判别法（更基础）、根值判别法（走 $\\limsup$ 与几何级数比较那条路，与 Kummer 不可互推；反倒是「比值极限存在 $\\implies$ 根值极限存在且相等」，所以根值更强）、积分判别法与凝聚判别法（一个换成反常积分、一个按 $2^k$ 分组）。这四条各留一个节点。',
      refs: ['Knopp, Theory and Application of Infinite Series', 'Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.root-test',
      cluster: 'analysis.series',
      type: 'theorem',
      label: '根值判别法',
      title: '定理：根值判别法（Cauchy，用 $\\limsup \\sqrt[n]{a_n}$）',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '设 $a_n \\ge 0$，记',
        '',
        '$$\\alpha := \\limsup_{n \\to \\infty} \\sqrt[n]{a_n}$$',
        '',
        '则：$\\alpha < 1$ 时 $\\sum a_n$ 收敛；$\\alpha > 1$ 时 $\\sum a_n$ 发散；$\\alpha = 1$ 时**无结论**。'
      ].join('\n'),
      notes: '⭐ 机制是「与几何级数比较」：$\\alpha < q < 1$ 时最终有 $\\sqrt[n]{a_n} \\le q$，即 $a_n \\le q^{n}$，而几何级数收敛。\n\n⭐ 与比值判别法的关系：**根值更强**。若 $\\lim a_{n+1}/a_n$ 存在，则 $\\lim \\sqrt[n]{a_n}$ 也存在且相等；反之不然（$a_n = 2^{-n}$ 与 $a_n = 2^{-n - (-1)^n}$ 之类的例子）。所以「比值判别法判不了的，根值可能能判」。\n\n⚠ 用到的是 **$\\limsup$** 而不是 $\\lim$：数列 $\\sqrt[n]{a_n}$ 未必收敛，但 $\\limsup$ 总有定义。\n\n⚠ $\\alpha = 1$ 时它完全失灵：$\\sum 1/n$ 发散与 $\\sum 1/n^{2}$ 收敛都有 $\\alpha = 1$。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.integral-test',
      cluster: 'analysis.series',
      type: 'theorem',
      label: '积分判别法',
      title: '定理：积分判别法（Cauchy 积分判别法）',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛', '积分'],
      statement: [
        '设 $f : [1, +\\infty) \\to [0, +\\infty)$ **非负且递减**。则级数 $\\sum f(n)$ 与反常积分 $\\int_1^{+\\infty} f$ 同敛散，即',
        '',
        '$$\\sum_{n=1}^{\\infty} f(n) < +\\infty \\iff \\int_1^{+\\infty} f(x)\\,dx < +\\infty$$',
        '',
        '更精确地，对每个 $N$ 有不等式',
        '',
        '$$\\int_1^{N+1} f \\le \\sum_{n=1}^{N} f(n) \\le f(1) + \\int_1^{N} f$$'
      ].join('\n'),
      notes: '⭐ 一句话：**级数与积分被同一把尺子夹住**。上界 $f(n) \\le \\int_{n-1}^{n} f$ 与下界 $\\int_{n}^{n+1} f \\le f(n)$ 各出自单调性，逐段相加即得夹逼的不等式。\n\n⭐ 最经典的用途：$\\sum 1/n^{s}$ 在 $s > 1$ 时收敛、$s \\le 1$ 时发散 —— 因为 $\\int_1^{\\infty} x^{-s}\\,dx$ 的同一条分界就在 $s = 1$。\n\n⚠ 必须是**单调递减**的非负函数：$f$ 只是在整数点上被定义、或者上下起伏时，不等式两边都不成立。\n\n⚠ 它**不是** Kummer 的推论：这里走的是「把求和翻译成反常积分」这条完全不同的路。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.cauchy-condensation',
      cluster: 'analysis.series',
      type: 'theorem',
      label: 'Cauchy 凝聚判别法',
      title: '定理：Cauchy 凝聚判别法（按 $2^{k}$ 分组）',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '设 $a_n \\ge 0$ 且**递减**。则原级数与「按 $2^{k}$ 抽出来的那一个」同敛散，即',
        '',
        '$$\\sum_{n=1}^{\\infty} a_n < +\\infty \\iff \\sum_{k=0}^{\\infty} 2^{k}\\, a_{2^{k}} < +\\infty$$'
      ].join('\n'),
      notes: '⭐ 它是「**按 $2$ 的幂分组**」的正式化：把下标落在 $[2^{k}, 2^{k+1})$ 里的项全部换成该段最小的那一项（$a_{2^{k+1}}$）或最大的那一项（$a_{2^{k}}$），两边夹住即得。\n\n⭐ 威力示例：$\\sum \\frac{1}{n \\ln n}$ 的敛散性 —— 凝聚后变成 $\\sum \\frac{2^{k}}{2^{k} \\ln 2^{k}} = \\frac{1}{\\ln 2}\\sum \\frac{1}{k}$，一眼看出**发散**。\n\n⚠ 条件是 $a_n$ 非负且**递减**（分组替换才成立）。\n\n⚠ 它同样不是 Kummer 的推论 —— 它连「比值」都不看。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.abel-dirichlet-series',
      cluster: 'analysis.series',
      type: 'theorem',
      label: 'Abel–Dirichlet 判别法',
      title: '定理：Abel 与 Dirichlet 判别法（非绝对收敛那一族）',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '**(Dirichlet)** 设 $\\{b_n\\}$ 单调且 $b_n \\to 0$，而 $\\sum a_n$ 的**部分和有界**（存在 $M$ 使 $\\bigl| \\sum_{n \\le N} a_n \\bigr| \\le M$ 对一切 $N$ 成立）。则 $\\sum a_n b_n$ 收敛。',
        '',
        '**(Abel)** 设 $\\{b_n\\}$ 单调**有界**，而 $\\sum a_n$ 收敛。则 $\\sum a_n b_n$ 收敛。'
      ].join('\n'),
      notes: '⭐ 这两个判别法处理的是**一般来说不绝对收敛**的级数 —— 正项那一族的判据（比较、Kummer、根值、积分）在这里全都用不上。\n\n⭐ **Leibniz 交错级数判别法是 Dirichlet 的特例**：取 $a_n = (-1)^{n}$（部分和只取 $0, 1$ 两个值，有界），$b_n$ 单调趋于 $0$，就得到「交错级数收敛」。所以图上**不单独建 Leibniz 节点**。\n\n⭐ 证明的核心是 **Abel 求和（分部求和）**：把 $\\sum_{k \\le n} a_k b_k$ 改写成 $A_n b_n - A_m b_{m+1} - \\sum_{k} A_k (b_{k+1} - b_k)$，于是「$A$ 有界」与「$b$ 单调」各发挥一次作用，再用 Cauchy 准则收尾。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'def.absolute-convergence',
      cluster: 'analysis.series',
      type: 'definition',
      label: '绝对收敛',
      title: '绝对收敛（Absolute Convergence）',
      regions: ['analysis'],
      tags: ['定义', '级数', '收敛'],
      statement: [
        '设 $\\{a_n\\} \\subseteq \\mathbb{R}$（或 $\\mathbb{C}$）。称级数 $\\sum a_n$ **绝对收敛**，当且仅当正项级数',
        '',
        '$$\\sum_{n=1}^{\\infty} |a_n|$$',
        '',
        '收敛。'
      ].join('\n'),
      notes: '⭐ 绝对收敛是这一包的分水岭：**绝对收敛的级数可以被当作有限和来对待** —— 可以任意换序（重排不变）、可以逐项相乘（Cauchy 乘积）、可以任意加括号。条件收敛的级数这些性质**全部失效**。\n\n⭐ 它把一般项级数的问题**归约成正项级数**：一旦验证了 $\\sum |a_n|$ 收敛，就可以动用比较、Kummer、根值、积分、凝聚这一整族判据。\n\n⚠ 反过来的蕴含不成立（见「条件收敛」），而且「绝对收敛」这个名字容易误导：它不是「更强的收敛」，而是「加上符号无关性之后的收敛」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'def.conditional-convergence',
      cluster: 'analysis.series',
      type: 'definition',
      label: '条件收敛',
      title: '条件收敛（Conditional Convergence）',
      regions: ['analysis'],
      tags: ['定义', '级数', '收敛'],
      statement: [
        '称实（或复）级数 $\\sum a_n$ **条件收敛**，当且仅当它收敛，但 $\\sum |a_n|$ **发散**。',
        '',
        '典型例子是交错调和级数：',
        '',
        '$$\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n} = \\ln 2$$',
        '',
        '它收敛，而取绝对值之后就是发散的调和级数。'
      ].join('\n'),
      notes: '⭐ 条件收敛的级数是**脆弱的**：Riemann 重排定理说，它的项可以被重新排列成收敛到**任意**事先指定的值（甚至发散到 $\\pm\\infty$）。所以对它做任何「交换次序」的动作都必须先证明合法性。\n\n⚠ 交错调和级数收敛到 $\\ln 2$，但把「一个正项、两个负项」这样重排之后会收敛到 $\\frac{1}{2}\\ln 2$ —— 同一个级数、同样的项、不同的和。\n\n⭐ 判据层面：条件收敛只能用 Abel–Dirichlet 那一族来判（正项判据全部失灵）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.absolute-implies-convergent',
      cluster: 'analysis.series',
      type: 'theorem',
      label: '绝对收敛 ⟹ 收敛',
      title: '定理：绝对收敛蕴含收敛',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '若 $\\sum |a_n|$ 收敛，则 $\\sum a_n$ 收敛，且',
        '',
        '$$\\Bigl| \\sum_{n=1}^{\\infty} a_n \\Bigr| \\le \\sum_{n=1}^{\\infty} |a_n|$$'
      ].join('\n'),
      notes: '⭐ 证明只用一次三角不等式（注意 $|\\sum_{k=m+1}^{n} a_k| \\le \\sum_{k=m+1}^{n} |a_k|$）加上级数的 Cauchy 准则。\n\n⚠ **不反向**：交错调和级数收敛但不绝对收敛。\n\n⭐ 这条定理实际上的用法是**归约**：要证一个一般项级数收敛，先去证 $\\sum |a_n|$ 收敛 —— 后者是正项级数，能用的工具多得多。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.rearrangement',
      cluster: 'analysis.series',
      type: 'theorem',
      label: '重排不变性',
      title: '定理：绝对收敛级数任意重排后和不变',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '设 $\\sum a_n$ **绝对收敛**，$\\sigma : \\mathbb{N} \\to \\mathbb{N}$ 是任意双射。则 $\\sum a_{\\sigma(n)}$ 也绝对收敛，且',
        '',
        '$$\\sum_{n=1}^{\\infty} a_{\\sigma(n)} = \\sum_{n=1}^{\\infty} a_n$$'
      ].join('\n'),
      notes: '⭐ 这条定理的实质是：**绝对收敛的级数是一个「可交换的和」** —— 像有限和一样，加法的次序不影响结果。\n\n⭐ 证明思路：先对非负项级数证（此时重排后的部分和与原级数的部分和互相夹住），再拆成正负部或实部虚部。\n\n⚠ 条件收敛时结论**彻底失效**（见「Riemann 重排定理」）。所以「能不能重排」是判断一个级数是否绝对收敛的最直观标志。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.riemann-rearrangement',
      cluster: 'analysis.series',
      type: 'theorem',
      label: 'Riemann 重排定理',
      title: '定理（Riemann）：条件收敛级数可以重排成任意和',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛', '反例'],
      statement: [
        '设实级数 $\\sum a_n$ **条件收敛**（收敛但不绝对收敛）。则对**任意** $s \\in \\overline{\\mathbb{R}}$（即任意实数，或 $\\pm\\infty$）都存在双射 $\\sigma : \\mathbb{N} \\to \\mathbb{N}$ 使',
        '',
        '$$\\sum_{n=1}^{\\infty} a_{\\sigma(n)} = s$$',
        '',
        '并且也存在重排使其部分和**不收敛**。'
      ].join('\n'),
      notes: '⭐ 这是初等分析里最反直觉的反例之一：**同一个级数、同样的项、同样的顺序集合，换个次序结果可以是你想要的任何数**。\n\n⭐ 机制：条件收敛时正项之和与负项之和**各自都是 $+\\infty$ 与 $-\\infty$（绝对值意义下）**，但两者抵消得刚好。于是可以「加正项直到超过 $s$，再加负项直到低于 $s$」，来回一次比一次更接近 —— 因为通项趋于零，这个过程收敛到 $s$。\n\n⚠ 反过来：绝对收敛时重排不变（见「重排不变性」）。所以「重排」这个操作恰好把两个世界分开了。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.series-product',
      cluster: 'analysis.series',
      type: 'theorem',
      label: 'Cauchy 乘积',
      title: '定理：绝对收敛级数的 Cauchy 乘积',
      regions: ['analysis'],
      tags: ['定理', '级数', '收敛'],
      statement: [
        '设 $\\sum a_n$ 与 $\\sum b_n$ 都**绝对收敛**，记',
        '',
        '$$c_n := \\sum_{k=0}^{n} a_k b_{n-k}$$',
        '',
        '（**Cauchy 乘积**）。则 $\\sum c_n$ 绝对收敛，且',
        '',
        '$$\\sum_{n=0}^{\\infty} c_n = \\Bigl( \\sum_{n=0}^{\\infty} a_n \\Bigr)\\Bigl( \\sum_{n=0}^{\\infty} b_n \\Bigr)$$'
      ].join('\n'),
      notes: '⭐ 这是「重排不变」的第二个应用场合：$\\sum c_n$ 就是把二重和 $\\sum_{m, n} a_m b_n$ 按「对角线」重排的结果，而重排合法正是靠绝对收敛。\n\n⚠ **只收敛不绝对收敛时会失败**：$a_n = b_n = \\frac{(-1)^{n}}{\\sqrt{n+1}}$ 时两个级数都收敛，但它们的 Cauchy 乘积发散（通项不趋于零）。\n\n⭐ 这一条是幂级数乘法的依据（两个绝对收敛的幂级数相乘，系数就是卷积）—— 也是后面 `analysis.uniform` 那一包要用到的东西。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.series-absolute',
      kind: 'definition',
      definition: 'def.series',
      usedBy: 'def.absolute-convergence',
      note: '绝对收敛是**关于另一个级数**（$\\sum |a_n|$）的性质，而那个级数是正项级数 —— 用到的还是级数收敛的定义。'
    },
    {
      id: 'dep.absolute-conditional',
      kind: 'definition',
      definition: 'def.absolute-convergence',
      usedBy: 'def.conditional-convergence',
      note: '条件收敛 = 收敛 **且** 不绝对收敛，所以它的定义必须先有「绝对收敛」这个词。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.series-cauchy',
      kind: 'implication',
      sources: ['thm.cauchy-criterion', 'def.series'],
      target: 'thm.cauchy-criterion-series',
      title: '实数的 Cauchy 准则 $\\implies$ 级数的 Cauchy 准则',
      proof: [
        '设 $s_N = \\sum_{n \\le N} a_n$。由定义，$\\sum a_n$ 收敛 $\\iff$ 数列 $\\{s_N\\}$ 收敛；而由实数的 Cauchy 收敛准则，$\\{s_N\\}$ 收敛 $\\iff$ $\\{s_N\\}$ 是 Cauchy 列，即',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n > m \\ge N :\\ |s_n - s_m| < \\varepsilon$$',
        '',
        '把 $s_n - s_m = \\sum_{k=m+1}^{n} a_k$ 代进去即得所证。',
        '',
        '**必要条件**：$\\sum a_n$ 收敛时 $a_n = s_n - s_{n-1} \\to 0$（两个收敛数列之差）。∎'
      ].join('\n'),
      note: '这条准则里**唯一**的外来输入是实数的完备性 —— 换句话说，级数收敛的判别本质上是在用 $\\mathbb{R}$ 没有洞。'
    },
    {
      id: 'imp.comparison-test',
      kind: 'implication',
      sources: ['def.series', 'thm.monotone-convergence'],
      target: 'thm.comparison-test',
      title: '非负项级数 + 单调有界 $\\implies$ 比较判别法',
      proof: [
        '设 $0 \\le a_n \\le b_n$ 对 $n \\ge N_0$ 成立。记 $A_N := \\sum_{n \\le N} a_n$、$B_N := \\sum_{n \\le N} b_n$，两者都（最终）单调递增。',
        '',
        '1. 若 $\\sum b_n$ 收敛，则 $\\{B_N\\}$ 有界；由 $A_N \\le B_N + \\text{const}$（前 $N_0$ 项之差），$\\{A_N\\}$ 也有界。',
        '2. 单调有界 $\\implies$ $\\{A_N\\}$ 收敛，即 $\\sum a_n$ 收敛。',
        '3. 第二条是第一条的逆否命题。',
        '',
        '**极限形式**：设 $a_n / b_n \\to L \\in (0, +\\infty)$，则存在 $N_0$ 使 $n \\ge N_0$ 时 $\\frac{L}{2} b_n \\le a_n \\le 2L\\, b_n$ —— 两边比较即得同敛散性。$L = 0$ 时只有右半边不等式，故只单向成立。∎'
      ].join('\n'),
      note: '比较判别法对「非负」的依赖是本质的：$b_n$ 收敛给出 $\\{B_N\\}$ 有界，而 $\\{A_N\\}$ 有界只有在它单调（即 $a_n \\ge 0$）时才等价于收敛。'
    },
    {
      id: 'imp.kummer',
      kind: 'implication',
      sources: ['thm.comparison-test'],
      target: 'thm.kummer',
      title: '比较判别法 $\\implies$ Kummer 判别法',
      proof: [
        '记 $K_n := c_n \\frac{a_n}{a_{n+1}} - c_{n+1}$。',
        '',
        '**收敛支**：设 $n \\ge N_0$ 时 $K_n \\ge \\delta > 0$。把它写成',
        '',
        '$$c_n a_n - c_{n+1} a_{n+1} \\ge \\delta\\, a_{n+1}$$',
        '',
        '对 $n = N_0, \\ldots, M-1$ 求和，左端**裂项**：$c_{N_0} a_{N_0} - c_M a_M \\ge \\delta \\sum_{n = N_0}^{M-1} a_{n+1}$。左端 $\\le c_{N_0} a_{N_0}$（因为 $c_M a_M > 0$），故',
        '',
        '$$\\sum_{n = N_0}^{M-1} a_{n+1} \\le \\frac{c_{N_0} a_{N_0}}{\\delta}$$',
        '',
        '对一切 $M$ 成立 —— 部分和有界，由比较判别法（或直接由单调有界）收敛。',
        '',
        '**发散支**：设 $\\sum 1/c_n$ 发散且 $n \\ge N_0$ 时 $K_n \\le 0$，即 $c_n a_n \\le c_{n+1} a_{n+1}$。于是 $\\{c_n a_n\\}$ 递增，特别地 $c_n a_n \\ge c_{N_0} a_{N_0} =: \\gamma > 0$，从而',
        '',
        '$$a_n \\ge \\frac{\\gamma}{c_n}$$',
        '',
        '由 $\\sum 1/c_n$ 发散与比较判别法，$\\sum a_n$ 发散。∎'
      ].join('\n'),
      note: '**裂项**是这一族判别法的共同机制：$K_n$ 的设计就是要让 $c_n a_n - c_{n+1}a_{n+1}$ 塌缩成一个望远镜和。（把 $c_n$ 取成 $1, n, n\\ln n$ 就分别得到 d\'Alembert、Raabe、Bertrand。）'
    },
    {
      id: 'imp.root-test',
      kind: 'implication',
      sources: ['thm.comparison-test'],
      target: 'thm.root-test',
      title: '与几何级数比较 $\\implies$ 根值判别法',
      proof: [
        '**$\\alpha < 1$**：取 $q$ 使 $\\alpha < q < 1$。由 $\\limsup \\sqrt[n]{a_n} = \\alpha < q$，存在 $N$ 使 $n \\ge N$ 时 $\\sqrt[n]{a_n} < q$，即 $a_n < q^{n}$。几何级数 $\\sum q^{n}$ 收敛，由比较判别法 $\\sum a_n$ 收敛。',
        '',
        '**$\\alpha > 1$**：此时 $\\sqrt[n]{a_n} > 1$ 对无穷多个 $n$ 成立（否则 $\\limsup \\le 1$），即 $a_n > 1$ 对无穷多个 $n$ 成立。于是 $a_n \\not\\to 0$，由级数的必要条件（Cauchy 准则）发散。',
        '',
        '**$\\alpha = 1$**：$a_n = 1/n$（发散）与 $a_n = 1/n^{2}$（收敛）都满足 $\\limsup \\sqrt[n]{a_n} = 1$，故无结论。',
        '',
        '**与比值判别法的比较**：若 $a_{n+1}/a_n \\to L$，则 $\\sqrt[n]{a_n} \\to L$（取对数后用 Cesàro 平均），故比值能判的根值也能判；反之（$a_n = 2^{-n+(-1)^{n}}$）不成立。∎'
      ].join('\n'),
      note: '$\\alpha > 1$ 那一支其实不需要比较判别法 —— 它只用到「通项必须趋于零」这个必要条件。'
    },
    {
      id: 'imp.integral-test',
      kind: 'implication',
      sources: ['thm.comparison-test', 'def.improper-integral'],
      target: 'thm.integral-test',
      title: '单调性 + 反常积分 $\\implies$ 积分判别法',
      proof: [
        '设 $f \\ge 0$ 递减。对每个 $n \\ge 1$ 与 $x \\in [n, n+1]$ 有 $f(n+1) \\le f(x) \\le f(n)$，逐段积分得',
        '',
        '$$f(n+1) \\le \\int_{n}^{n+1} f \\le f(n)$$',
        '',
        '对 $n = 1, \\ldots, N$ 求和（裂项式的夹逼）：',
        '',
        '$$\\int_1^{N+1} f \\le \\sum_{n=1}^{N} f(n) \\le f(1) + \\int_1^{N} f$$',
        '',
        '1. 若 $\\int_1^{+\\infty} f$ 收敛，则右端的不等式给出部分和 $\\sum_{n \\le N} f(n)$ 有界，由比较判别法（非负项）级数收敛。',
        '2. 若 $\\int_1^{+\\infty} f$ 发散，则左端的不等式给出部分和数列无界，级数发散。∎'
      ].join('\n'),
      note: '左、右两个不等式是同一个单调性的两次使用：一段上 $f$ 的最大值在左端点、最小值在右端点。'
    },
    {
      id: 'imp.cauchy-condensation',
      kind: 'implication',
      sources: ['thm.comparison-test'],
      target: 'thm.cauchy-condensation',
      title: '按 $2^{k}$ 分组 + 比较 $\\implies$ 凝聚判别法',
      proof: [
        '设 $a_n \\ge 0$ 递减。对每个 $k \\ge 0$，下标落在 $[2^{k}, 2^{k+1})$ 里的项共 $2^{k}$ 个，且都在 $a_{2^{k+1}}$ 与 $a_{2^{k}}$ 之间。于是',
        '',
        '$$2^{k}\\, a_{2^{k+1}} \\le \\sum_{n = 2^{k}}^{2^{k+1}-1} a_n \\le 2^{k}\\, a_{2^{k}}$$',
        '',
        '对 $k = 0, \\ldots, K-1$ 求和：',
        '',
        '$$\\frac{1}{2}\\sum_{k=1}^{K} 2^{k} a_{2^{k}} \\le \\sum_{n=1}^{2^{K}-1} a_n \\le \\sum_{k=0}^{K-1} 2^{k} a_{2^{k}}$$',
        '',
        '（左端用了 $\\sum_k 2^{k} a_{2^{k+1}} = \\frac{1}{2}\\sum_{j} 2^{j} a_{2^{j}}$ 的重编号。）两个不等式把「原级数的部分和」与「凝聚级数的部分和」互相压住，由比较判别法两者同敛散。∎'
      ].join('\n'),
      note: '「$\\frac{1}{2}$ 因子」说明为什么两边的常数不重要 —— 有界性只关心有没有界，不关心界是多少。'
    },
    {
      id: 'imp.abel-dirichlet',
      kind: 'implication',
      sources: ['thm.cauchy-criterion-series'],
      target: 'thm.abel-dirichlet-series',
      title: 'Cauchy 准则 + 分部求和 $\\implies$ Abel–Dirichlet 判别法',
      proof: [
        '记 $A_n := \\sum_{k \\le n} a_k$，$A_{-1} := 0$，并设 $|A_n| \\le M$ 对一切 $n$ 成立。',
        '',
        '**分部求和（Abel 求和）**：对 $m < n$，',
        '',
        '$$\\sum_{k=m+1}^{n} a_k b_k = \\sum_{k=m+1}^{n} (A_k - A_{k-1}) b_k = A_n b_n - A_m b_{m+1} - \\sum_{k=m+1}^{n-1} A_k (b_{k+1} - b_k)$$',
        '',
        '（把 $A_k b_k - A_{k-1} b_k$ 重排并与下一项合并。）',
        '',
        '**Dirichlet 支**：$b_n \\downarrow 0$ 单调时 $b_{k+1} - b_k \\le 0$，于是右边三项的绝对值分别被下式控制：',
        '',
        '$$|A_n b_n| + |A_m b_{m+1}| + \\sum_{k=m+1}^{n-1} |A_k|\\,|b_{k+1} - b_k| \\le M\\Bigl( |b_n| + |b_{m+1}| + \\sum_{k=m+1}^{n-1} (b_k - b_{k+1}) \\Bigr) \\le M\\bigl( b_n + b_{m+1} + b_{m+1} - b_n \\bigr) \\le 4M\\, b_{m+1}$$',
        '',
        '最后一步用了**望远镜和** $\\sum_{k=m+1}^{n-1}(b_k - b_{k+1}) = b_{m+1} - b_n$。由 $b \\to 0$，给定 $\\varepsilon > 0$ 取 $m$ 足够大便可使尾巴 $< \\varepsilon$；由级数的 Cauchy 准则，$\\sum a_n b_n$ 收敛。',
        '',
        '**Abel 支**：$b_n$ 单调有界时令 $b := \\lim b_n$，则 $\\{b_n - b\\}$ 单调趋于 $0$，对 $\\sum a_n (b_n - b)$ 用 Dirichlet 支；又 $\\sum a_n b$ 收敛，两者相加即得。∎'
      ].join('\n'),
      note: '分部求和是这一族判别法的引擎 —— 它把「$\\sum a_n b_n$ 的尾巴」换成了「$A_k$ 与 $b$ 的增量」，于是**部分和有界**（$A$）与**单调趋于零**（$b$）各自发挥一次作用。Leibniz 判别法取 $a_n = (-1)^{n}$ 即得。'
    },
    {
      id: 'imp.absolute-implies',
      kind: 'implication',
      sources: ['thm.cauchy-criterion-series'],
      target: 'thm.absolute-implies-convergent',
      title: '级数的 Cauchy 准则 $\\implies$ 绝对收敛蕴含收敛',
      proof: [
        '设 $\\sum |a_n|$ 收敛。由级数的 Cauchy 准则，给定 $\\varepsilon > 0$ 存在 $N$ 使 $n > m \\ge N$ 时 $\\sum_{k=m+1}^{n} |a_k| < \\varepsilon$。由三角不等式',
        '',
        '$$\\Bigl| \\sum_{k=m+1}^{n} a_k \\Bigr| \\le \\sum_{k=m+1}^{n} |a_k| < \\varepsilon$$',
        '',
        '再一次用 Cauchy 准则，$\\sum a_n$ 收敛。',
        '',
        '关于和的不等式：对每个 $N$ 有 $|\\sum_{n \\le N} a_n| \\le \\sum_{n \\le N} |a_n|$，两边令 $N \\to \\infty$ 并注意绝对值函数连续即得。∎'
      ].join('\n'),
      note: '证明里**没有任何关于正负的假设** —— 这也是为什么它能同时对实级数和复级数成立。'
    },
    {
      id: 'imp.rearrangement',
      kind: 'implication',
      sources: ['def.absolute-convergence', 'thm.absolute-implies-convergent'],
      target: 'thm.rearrangement',
      title: '绝对收敛 $\\implies$ 重排不变',
      proof: [
        '**先设 $a_n \\ge 0$。** 记 $S := \\sum a_n \\in [0, +\\infty]$。任取双射 $\\sigma$。',
        '',
        '1. 对每个 $N$，$\\sum_{n \\le N} a_{\\sigma(n)} \\le S$（有限个项是原级数的一个有限部分）。取上确界得 $\\sum_n a_{\\sigma(n)} \\le S$。',
        '2. 反过来把 $\\sigma^{-1}$ 代进去（同一条推理用在 $\\sigma^{-1}$ 上，把 $\\sum a_n$ 看成 $\\sum a_{\\sigma(n)}$ 的重排）得 $S \\le \\sum_n a_{\\sigma(n)}$。',
        '3. 故两者相等（有限或同时为 $+\\infty$）；特别地 $\\sum a_n < \\infty$ 时重排也收敛且和相同。',
        '',
        '**一般情形。** 写 $a_n = a_n^{+} - a_n^{-}$，其中 $a^{\\pm} := \\frac{|a_n| \\pm a_n}{2} \\ge 0$。由 $0 \\le a_n^{\\pm} \\le |a_n|$，两个非负级数都收敛；对它们各用上面的结论，再相减：',
        '',
        '$$\\sum_n a_{\\sigma(n)} = \\sum_n a_{\\sigma(n)}^{+} - \\sum_n a_{\\sigma(n)}^{-} = \\sum_n a_n^{+} - \\sum_n a_n^{-} = \\sum_n a_n$$',
        '',
        '绝对收敛性同理（$\\sum |a_{\\sigma(n)}| = \\sum |a_n| < \\infty$，来自非负情形）。∎'
      ].join('\n'),
      note: '第 2 步「对 $\\sigma^{-1}$ 再用一次」是关键技巧：非负级数的和定义为上确界，而「有限部分」这个说法对两个方向都成立。'
    },
    {
      id: 'imp.riemann-rearrangement',
      kind: 'implication',
      sources: ['def.conditional-convergence'],
      target: 'thm.riemann-rearrangement',
      title: '条件收敛 $\\implies$ 重排可以任意指定和',
      proof: [
        '设 $\\sum a_n$ 条件收敛。记 $p_n := a_n^{+}$、$q_n := a_n^{-}$（正部与负部），则 $\\sum a_n = \\sum p_n - \\sum q_n$ 收敛。',
        '',
        '1. **两个非负级数都发散**：若 $\\sum p_n$ 与 $\\sum q_n$ 都收敛，则 $\\sum |a_n| = \\sum p_n + \\sum q_n$ 收敛，与条件收敛矛盾；若只有一个收敛，则另一个必须也收敛（因为 $\\sum a_n$ 收敛），同样矛盾。故 $\\sum p_n = \\sum q_n = +\\infty$。',
        '2. **构造重排**：给定实数 $s$，先把正项按原顺序取出、逐项加到部分和上，直到部分和 $> s$ 为止（可以做到，因为正项之和发散）；再把负项逐项取来，直到部分和 $< s$（同样可以做到）。如此反复。',
        '3. **收敛到 $s$**：每次「越界」的那一步所加的项，其绝对值不超过「跨过 $s$ 之前与 $s$ 的距离」，而由于 $a_n \\to 0$，越界的幅度随步骤趋于零（可以先用 $a_n \\to 0$ 挑选出「每个正项、负项的绝对值都 $< \\varepsilon$」的尾部来开工）。于是构造出的部分和与 $s$ 的距离趋于零。',
        '4. 若想收敛到 $+\\infty$：只加正项（每次都加到超过当前高度再加一点）；想不收敛：把正负两堆交替使用但间隔越拉越大。∎'
      ].join('\n'),
      note: '第 1 步是全部的关键：**条件收敛 = 正部与负部各自发散、但两者之差收敛**。这条证明也是「$a_n \\to 0$ 是必要条件」最有价值的一次使用。'
    },
    {
      id: 'imp.series-product',
      kind: 'implication',
      sources: ['def.absolute-convergence', 'thm.rearrangement'],
      target: 'thm.series-product',
      title: '重排不变 + 二重和 $\\implies$ Cauchy 乘积公式',
      proof: [
        '设 $A := \\sum a_n$、$B := \\sum b_n$ 都绝对收敛，记 $A_N := \\sum_{n \\le N} a_n$、$B_N := \\sum_{n \\le N} b_n$。',
        '',
        '1. **对角线与方形的关系**：$A_N B_N = \\sum_{m, n \\le N} a_m b_n$ 是二重和的一个「方形」部分和。',
        '2. **绝对收敛性**：$\\sum_{m, n} |a_m b_n| = \\bigl( \\sum_m |a_m| \\bigr)\\bigl( \\sum_n |b_n| \\bigr) < \\infty$（二重非负和按任一方式展布都相等），故二重绝对收敛，任一重排都不改变和，且和 $= AB$。',
        '3. **按对角线重排**：把 $\\sum_{m, n} a_m b_n$ 按 $m + n$ 分组，第 $n$ 组之和正是 $c_n = \\sum_{k \\le n} a_k b_{n-k}$。由第 2 步的重排不变性，$\\sum c_n = AB$。',
        '4. **$\\sum c_n$ 绝对收敛**：同理对 $\\sum_{m,n} |a_m b_n|$ 按对角线分组，得 $\\sum |c_n| \\le \\sum_{m,n}|a_m b_n| < \\infty$。',
        '',
        '**反例（不绝对收敛时失败）**：取 $a_n = b_n = \\frac{(-1)^{n}}{\\sqrt{n+1}}$，两个级数由 Abel–Dirichlet 收敛，但 $c_n = (-1)^{n}\\sum_{k \\le n} \\frac{1}{\\sqrt{(k+1)(n-k+1)}}$ 的绝对值 $\\ge \\frac{2(n+1)}{n+2} \\to 2$，故 $c_n \\not\\to 0$，乘积级数发散。∎'
      ].join('\n'),
      note: '第 2 步把「一维绝对收敛」升级成「二重绝对收敛」，这一步是全部技术的来源：二重和可以按任何顺序累加 —— 包括按对角线。'
    }
  ]
});
