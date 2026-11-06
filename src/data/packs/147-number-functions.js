/* ==========================================================================
   内容包 · 数论：数论函数与素数分布（第二批 10 点）
   --------------------------------------------------------------------------
   积性函数 → τ / σ → Möbius 函数 → Möbius 反演 → π(x) / θ(x) / ψ(x)
   → Чебышёв 估计 → Bertrand 假设 → 素数定理（只给陈述与骨架）。
   ⭐ 人名用原文字母：Чебышёв 用西里尔，Bertrand / Möbius / Riemann 用拉丁。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '数论：数论函数与素数分布',
  nodes: [

    {
      id: 'def.multiplicative-function',
      cluster: 'number.functions',
      type: 'definition',
      label: '积性函数',
      title: '积性函数与完全积性',
      regions: ['number'],
      tags: ['数论', '数论函数'],
      statement: [
        '称 $f : \\mathbb{N}^{+} \\to \\mathbb{C}$ 是**积性函数**，若 $f(1) = 1$ 且对互素的 $m, n$（即 $\\gcd(m,n) = 1$）有',
        '',
        '$$f(mn) = f(m)\\,f(n) .$$',
        '',
        '若上式对**一切** $m, n$ 都成立（不要求互素），称 $f$ 是**完全积性**的。',
      ].join('\n'),
      notes: [
        '为什么这个条件自然：由算术基本定理，$n$ 唯一分解成素数幂之积，而这些素数幂两两互素 —— 所以积性函数完全由它在素数幂 $p^{e}$ 上的值决定。这就把「$n$ 的全体」上的函数压成「每个素数一列」的数据。',
        '',
        '完全积性更强：还要求 $f(p^{e}) = f(p)^{e}$。\n\n$\\mu$、$\\varphi$、$\\tau$、$\\sigma$ 都只是**积性**，**没有一个是完全积性**：$\\mu(4) = 0 \\ne \\mu(2)^{2} = 1$、$\\varphi(4) = 2 \\ne \\varphi(2)^{2} = 1$。完全积性的典型例子是 $\\mathrm{id}$ 与常函数 $1$（以及它们的乘积、Dirichlet 特征标）。',
        '',
        '两个积性函数的**狄利克雷卷积**仍积性 —— 这是后面 Möbius 反演的代数背景。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第三章', 'Apostol, Introduction to Analytic Number Theory, Ch. 2'],
    },

    {
      id: 'def.divisor-function',
      cluster: 'number.functions',
      type: 'definition',
      label: '除数函数 τ 与 σ',
      title: '除数个数与除数之和',
      regions: ['number'],
      tags: ['数论', '数论函数'],
      statement: [
        '对 $n \\ge 1$ 定义',
        '',
        '$$\\tau(n) := \\#\\{\\, d \\ge 1 : d \\mid n \\,\\}, \\qquad \\sigma(n) := \\sum_{d \\mid n} d .$$',
        '',
        '$\\tau(n)$ 是 $n$ 的正因数个数，$\\sigma(n)$ 是它们之和。',
      ].join('\n'),
      notes: [
        '两者都**积性**（不是完全积性）：$n$ 的因数由各素因子的指数独立选取，于是 $\\tau$ 与 $\\sigma$ 在互素的两个数上相乘。',
        '',
        '$\\sigma(n) = 2n$ 的 $n$ 叫**完全数**（$6 = 1+2+3$、$28$、$496$）；$\\sigma(n) < 2n$ 叫亏数、$> 2n$ 叫盈数。奇完全数是否存在仍未解决 —— 这是数论里最老的未解问题之一。',
        '',
        '「$\\tau$ 的平均阶是 $\\log n$」等价于「调和级数发散」：$\\sum_{n \\le x} \\tau(n) = x\\log x + O(x)$，这就是 Dirichlet 的除数问题。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第三章', 'Apostol, Ch. 2'],
    },

    {
      id: 'thm.divisor-formula',
      cluster: 'number.functions',
      type: 'theorem',
      label: 'τ 与 σ 的乘积公式',
      title: '用素因子分解算 $\\tau(n)$ 与 $\\sigma(n)$',
      regions: ['number'],
      tags: ['数论', '数论函数', '定理'],
      statement: [
        '设 $n = p_{1}^{e_{1}} \\cdots p_{r}^{e_{r}}$。则',
        '',
        '$$\\tau(n) = \\prod_{i=1}^{r} (e_{i} + 1), \\qquad \\sigma(n) = \\prod_{i=1}^{r} \\frac{p_{i}^{\\,e_{i}+1} - 1}{p_{i} - 1} .$$',
      ].join('\n'),
      notes: [
        '**为什么是乘积**：$n$ 的每个因数 $d$ 的形状是 $d = p_{1}^{f_{1}} \\cdots p_{r}^{f_{r}}$，其中 $0 \\le f_{i} \\le e_{i}$ —— 而且由唯一分解，这种写法唯一。于是「选因数」退化成「每个指数独立选一个值」，共 $\\prod (e_{i}+1)$ 种。',
        '',
        '$\\sigma$ 同理，只是每列是一个等比数列求和：$\\sum_{f=0}^{e_{i}} p_{i}^{f} = \\dfrac{p_{i}^{e_{i}+1}-1}{p_{i}-1}$。',
        '',
        '这两个公式是「积性 + 素数幂上的值」这套方法的样板：$\\varphi$、$\\mu$ 的公式都是同一套路（$\\varphi(p^{e}) = p^{e} - p^{e-1}$）。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第三章'],
    },

    {
      id: 'def.mobius-function',
      cluster: 'number.functions',
      type: 'definition',
      label: 'Möbius 函数',
      title: 'Möbius 函数 $\\mu$：按素因子个数取符号',
      regions: ['number'],
      tags: ['数论', '数论函数'],
      statement: [
        '定义',
        '',
        '$\\mu : \\mathbb{N} \\to \\mathbb{Z}$ 按 $n$ 的素因子结构定义：',
        '',
        '- $n = 1$ 时 $\\mu(1) = 1$；',
        '- $n$ 是 $r$ 个**互不相同**素数之积（$n = p_{1}p_{2}\\cdots p_{r}$）时 $\\mu(n) = (-1)^{r}$；',
        '- $n$ **含平方因子**（存在素数 $p$ 使 $p^{2} \\mid n$）时 $\\mu(n) = 0$。',
      ].join('\n'),
      notes: [
        '$\\mu$ 是**积性**函数里最简单的一个（也是完全积性以外的第一个「有零值」的积性函数）：由素数幂上的值 $\\mu(p) = -1$、$\\mu(p^{e}) = 0\\ (e \\ge 2)$ 完全确定。',
        '',
        '它出现的原因只有一个：**它是「常数函数 $1$」在狄利克雷卷积下的逆**。也就是说，Möbius 反演不是技巧，而是卷积群的逆元。',
        '',
        '$\\sum_{d \\mid n} \\mu(d)$ 只在 $n = 1$ 时为 $1$、其余为 $0$ —— 这条恒等式是整个反演公式的全部内容（见 `thm.mu-sum`）。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第三章', 'Apostol, Ch. 2'],
    },

    {
      id: 'thm.mu-sum',
      cluster: 'number.functions',
      type: 'theorem',
      label: 'Möbius 和的恒等式',
      title: '$\\mu$ 的和：只有 $n=1$ 剩下 $1$',
      regions: ['number'],
      tags: ['数论', '数论函数', '定理'],
      statement: [
        '对 $n \\ge 1$，',
        '',
        '$$\\sum_{d \\mid n} \\mu(d) = \\begin{cases} 1, & n = 1, \\\\ 0, & n > 1 . \\end{cases}$$',
      ].join('\n'),
      notes: [
        '证明：$n = 1$ 显然。设 $n = p_{1}^{e_{1}}\\cdots p_{r}^{e_{r}}$，$r \\ge 1$。含平方因子的 $d$ 贡献 $0$，所以只需对「由互异素因子组成的 $d$」求和：',
        '',
        '$$\\sum_{d\\mid n}\\mu(d) = \\sum_{S \\subseteq \\{1,\\cdots,r\\}} (-1)^{\\#S} = (1 - 1)^{r} = 0 .$$',
        '',
        '即二项式展开。这条恒等式是 $\\mu$ 的**唯一**用处：它把「求和」变成「投影到 $n = 1$ 上」。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第三章'],
    },

    {
      id: 'thm.mobius-inversion',
      cluster: 'number.functions',
      type: 'theorem',
      label: 'Möbius 反演',
      title: '从和函数还原原函数',
      regions: ['number'],
      statement: [
        '设 $f, g : \\mathbb{N}^{+} \\to \\mathbb{C}$。则',
        '',
        '$$g(n) = \\sum_{d \\mid n} f(d)\\quad \\forall n \\qquad \\iff \\qquad f(n) = \\sum_{d \\mid n} \\mu(d)\\, g\\!\\left(\\frac{n}{d}\\right) \\quad \\forall n .$$',
      ].join('\n'),
      notes: [
        '**$\\Leftarrow$ 的方向**（唯一要看的方向）：把 $f(d)$ 的表达式代进去，',
        '',
        '$$\\sum_{d\\mid n} f(d) = \\sum_{d\\mid n}\\ \\sum_{e\\mid (n/d)} \\mu(e)\\, g\\!\\left(\\frac{n}{de}\\right) = \\sum_{m \\mid n} g(m) \\sum_{e \\mid (n/m)} \\mu(e) .$$',
        '',
        '内层和由 `thm.mu-sum` 只在 $n/m = 1$ 时为 $1$，其余为 $0$ —— 于是整个式子塌成 $g(n)$。',
        '',
        '**另一方向**同理（或直接用 $\\Leftarrow$ 于反向的偏序）。所以「反演」不是新定理，是 $\\mu * 1 = \\delta$ 这一句话的两面。',
        '',
        '**用法**：数论里的「求和  与  还原」几乎都靠它。\n\n' +
        '例如 $\\sum_{d\\mid n}\\varphi(d) = n$ 反演出 $\\varphi(n) = \\sum_{d\\mid n}\\mu(d)\\,(n/d)$；\n\n' +
        '素数计数也是先有 $\\log n! = \\sum_{m \\le n}\\psi(n/m)$ 再反演。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第三章', 'Apostol, Ch. 2'],
    },

    {
      id: 'def.prime-counting',
      cluster: 'number.functions',
      type: 'definition',
      label: '素数计数函数',
      title: '$\\pi(x)$、$\\theta(x)$ 与 $\\psi(x)$',
      regions: ['number'],
      tags: ['数论', '素数分布'],
      statement: [
        '对 $x > 0$ 定义',
        '',
        '$$\\pi(x) := \\sum_{p \\le x} 1, \\qquad \\theta(x) := \\sum_{p \\le x} \\log p, \\qquad \\psi(x) := \\sum_{p^{k} \\le x} \\log p .$$',
        '',
        '$\\pi$ 数素数个数，$\\theta$ 按对数加权，$\\psi$（**Чебышёв 函数**）把所有素数幂一起数。',
      ].join('\n'),
      notes: [
        '为什么要有三个：$\\pi$ 是最想知道的，但它对求导/求和极不友好；$\\psi$ 最好用 ——',
        '',
        '$$\\psi(x) = \\sum_{n \\le x} \\Lambda(n), \\qquad \\Lambda(n) = \\begin{cases}\\log p, & n = p^{k},\\\\ 0, & \\text{否则}\\end{cases}$$',
        '',
        '（$\\Lambda$ 叫 von Mangoldt 函数），而 $\\log n! = \\sum_{m \\le n}\\Lambda(m)\\lfloor n/m\\rfloor = \\sum_{m \\le n}\\psi(n/m)$ 把 $\\psi$ 与阶乘直接连起来。\n\n三者的关系是 $\\theta \\le \\psi \\le \\theta + O(\\sqrt{x}\\log x)$ 与 $\\pi(x) \\sim \\theta(x)/\\log x$ —— 所以「三者同阶」这句话本身就是定理。',
        '',
        '⭐ 人名按原文字母写：**Чебышёв**（不用音译，也不用英文拼法 Chebyshev）—— 这是本项目的口径。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第七、九章', 'Apostol, Ch. 4'],
    },

    {
      id: 'thm.chebyshev-estimate',
      cluster: 'number.functions',
      type: 'theorem',
      status: 'skeleton',
      label: 'Чебышёв 估计',
      title: '$\\pi(x)$ 与 $x/\\log x$ 同阶（初等上下界）',
      regions: ['number'],
      tags: ['数论', '素数分布', '定理'],
      statement: [
        '存在常数 $0 < c_{1} < c_{2}$ 使对一切 $x \\ge 2$，',
        '',
        '$$c_{1}\\,\\frac{x}{\\log x} < \\pi(x) < c_{2}\\,\\frac{x}{\\log x} .$$',
        '',
        '（$\\pi(x) \\asymp x/\\log x$；初等证明给出的常数例如 $0.3$ 与 $6$。）',
      ].join('\n'),
      notes: [
        '**证明骨架**（只靠二项式系数，不用复分析）：',
        '',
        '1. 取 $N = \\binom{2n}{n}$。它在 $\\dfrac{4^{n}}{2n+1} \\le N \\le 4^{n}$ 之间（中间项最大 + 二项式和为 $4^{n}$）。',
        '2. 把 $N$ 分解：$n < p \\le 2n$ 的素数都整除 $N$（它们在分子里出现、分母里不出现），于是 $\\prod_{n < p \\le 2n} p \\le N \\le 4^{n}$ —— 取对数得 $\\theta(2n) - \\theta(n) \\le 2n\\log 2$。',
        '3. 反方向用 $N$ 的 $p$-进指数：$v_{p}(N) = \\sum_{k}\\left(\\lfloor 2n/p^{k}\\rfloor - 2\\lfloor n/p^{k}\\rfloor\\right) \\le \\log(2n)/\\log p$，累乘得 $N \\le (2n)^{\\pi(2n)}$，与下界 $N \\ge 4^{n}/(2n+1)$ 合并即得 $\\pi(2n) \\ge c\\,n/\\log n$。',
        '4. 从 $2n$ 过渡到一般的 $x$：用 $\\theta$ 的单调性与 $\\pi$ 的分段常数性质夹住。',
        '',
        '⚠ 这是**骨架**：每一步的常数没有仔细优化，第四步的区间处理也略去了。完整证明见华罗庚《数论导引》第九章。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第九章', 'Apostol, Ch. 4'],
    },

    {
      id: 'thm.bertrand',
      cluster: 'number.functions',
      type: 'theorem',
      label: 'Bertrand 假设',
      title: '每个 $n>1$ 与 $2n$ 之间必有素数',
      regions: ['number'],
      tags: ['数论', '素数分布', '定理'],
      statement: [
        '对每个整数 $n > 1$，存在素数 $p$ 使 $n < p < 2n$。',
      ].join('\n'),
      notes: [
        'Bertrand 猜想（1845）由 Чебышёв 证明（1850），所以也叫 **Чебышёв 定理**；后来 Erdős 在 1932 年给出一个只用二项式系数的漂亮初等证明（他当时 19 岁）。',
        '',
        '初等证明的关键仍是 $\\binom{2n}{n}$：假设 $n < p < 2n$ 无素数，则 $\\binom{2n}{n}$ 的所有素因子都 $\\le n$，再用 $v_{p}$ 的估计与 $\\binom{2n}{n} \\ge 4^{n}/(2n+1)$ 导出矛盾（中间的常数要靠「小于 $2n/3$ 的素数乘积」估计）。',
        '',
        '它是素数分布的第一个**区间型**结论：$\\pi(2n) - \\pi(n) \\ge 1$。真命题但远弱于素数定理（后者说这个区间里有 $\\sim n/\\log n$ 个素数）。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第九章', 'Apostol, Ch. 4'],
    },

    {
      id: 'thm.prime-number-theorem',
      cluster: 'number.functions',
      type: 'theorem',
      status: 'skeleton',
      label: '素数定理',
      title: '$\\pi(x) \\sim x/\\log x$',
      regions: ['number'],
      tags: ['数论', '素数分布', '定理'],
      statement: [
        '$$\\lim_{x \\to \\infty} \\frac{\\pi(x)}{x / \\log x} = 1 .$$',
        '',
        '等价形式：$\\theta(x) \\sim x$、$\\psi(x) \\sim x$、$p_{n} \\sim n\\log n$（$p_{n}$ 是第 $n$ 个素数）。',
      ].join('\n'),
      notes: [
        '⛔ **这条只有陈述与骨架，证明不在本图**：所有已知证明都要复分析或等价的重型工具（Riemann 的 $\\zeta$ 函数、或 Selberg–Erdős 的初等证明 —— 后者虽叫「初等」，但论证极长）。',
        '',
        '主流路线（Riemann 1859）的骨架：',
        '',
        '1. $\\zeta(s) = \\sum n^{-s}$ 在 $\\operatorname{Re}\\,s > 1$ 全纯，经解析延拓成为亚纯函数，唯一极点在 $s = 1$（留数 $1$）；',
        '2. $\\zeta$ 在直线 $\\operatorname{Re}\\,s = 1$ 上无零点 —— 这一步就是素数定理的全部难点；',
        '3. 由 Perron 公式 / 显式公式把 $\\psi(x)$ 写成 $x - \\sum_{\\rho} x^{\\rho}/\\rho + \\cdots$，零点 $\\rho$ 的位置决定误差项；',
        '4. 由 ② 得 $\\psi(x) \\sim x$，再由 $\\psi \\sim \\theta \\sim \\pi\\log$ 的等价性得 $\\pi(x) \\sim x/\\log x$。',
        '',
        '⭐ Riemann 假设（$\\operatorname{Re}\\,\\rho = 1/2$）就是把 ③ 的误差压到 $O(\\sqrt{x}\\log x)$ 的命题，至今未解。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第九、十章', 'Apostol, Ch. 4, 12'],
    },
  ],

  edges: [

    { kind: 'definition', definition: 'thm.crt', usedBy: 'def.mobius-function',
      note: 'Möbius 函数的积性用中国剩余定理：互素的 $m,n$ 的素因子集不相交，$\\mu(mn) = \\mu(m)\\mu(n)$。' },

    { kind: 'definition', definition: 'thm.fundamental-arithmetic', usedBy: 'def.multiplicative-function',
      note: '积性函数的「确定方式」直接来自唯一分解：函数值由各素数幂上的值决定。' },

    { kind: 'definition', definition: 'thm.fundamental-arithmetic', usedBy: 'thm.divisor-formula',
      note: '公式靠唯一分解：$n$ 的因数与「指数向量」一一对应。' },

    { kind: 'definition', definition: 'def.prime', usedBy: 'def.prime-counting',
      note: '$\\pi(x)$ 数的是素数，$\\theta$、$\\psi$ 按对数给素数加权。' },

    { kind: 'definition', definition: 'def.multiplicative-function', usedBy: 'def.divisor-function',
      note: '$\\tau$ 与 $\\sigma$ 是积性函数的头两个例子。' },

    { kind: 'definition', definition: 'def.prime-counting', usedBy: 'thm.chebyshev-estimate',
      note: '估计的对象就是 $\\pi(x)$；证明里还要用 $\\theta$ 做过渡。' },

    { kind: 'definition', definition: 'def.prime-counting', usedBy: 'thm.prime-number-theorem',
      note: '定理是 $\\pi(x)$ 的渐近式。' },

    { kind: 'definition', definition: 'def.mobius-function', usedBy: 'thm.mu-sum',
      note: '这条恒等式是 $\\mu$ 的定义直接算出来的（按「由互异素因子组成的因数」求和）。' },

    { kind: 'definition', definition: 'thm.mu-sum', usedBy: 'thm.mobius-inversion',
      note: '反演的全部内容就是 $\\mu * 1 = \\delta$ —— 即 $\\sum_{d \\mid m}\\mu(d) = [m=1]$。' },

    {
      id: 'imp.nt-multiplicative-from-fta',
      kind: 'implication',
      sources: ['thm.fundamental-arithmetic'],
      target: 'def.multiplicative-function',
      title: '积性函数的积性来自「素数幂两两互素」',
      proof: [
        '设 $f$ 积性，$n = p_{1}^{e_{1}}\\cdots p_{r}^{e_{r}}$。这些素数幂 $q_{i} := p_{i}^{e_{i}}$ 两两互素，于是对 $r$ 归纳：',
        '',
        '$$f(n) = f(q_{1})\\cdots f(q_{r}) .$$',
        '',
        '反之若两个函数在一个互素的分解上一致，也一致。所以积性函数完全由 $(f(p^{e}))_{p,e}$ 这张表决定。',
        '',
        '⚠ 这里用的是「两两互素 $\\implies$ 可以逐步拆」，不涉及唯一分解本身；唯一分解保证的是「$n$ 只有一种这样的拆法」，所以「由表决定」才不会自相矛盾。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-divisor-formula',
      kind: 'implication',
      sources: ['thm.fundamental-arithmetic'],
      target: 'thm.divisor-formula',
      title: '$\\tau$、$\\sigma$ 的乘积公式：指数独立选取',
      proof: [
        '由唯一分解，$d \\mid n$ 当且仅当 $d = p_{1}^{f_{1}}\\cdots p_{r}^{f_{r}}$ 且 $0 \\le f_{i} \\le e_{i}$，且这种 $(f_{1},\\cdots,f_{r})$ 与 $d$ 一一对应。\n\n于是因数集与 $\\prod_{i}[0, e_{i}]$ 的整数点一一对应，个数为 $\\prod(e_{i}+1)$。',
        '',
        '$\\sigma$：按上述对应，$\\sigma(n) = \\sum_{f_{1}=0}^{e_{1}}\\cdots\\sum_{f_{r}=0}^{e_{r}} p_{1}^{f_{1}}\\cdots p_{r}^{f_{r}} = \\prod_{i}\\left(\\sum_{f=0}^{e_{i}}p_{i}^{f}\\right)$，内层是等比数列，和为 $(p_{i}^{e_{i}+1}-1)/(p_{i}-1)$。',
        '',
        '两个公式都是「乘积」而不是「和」，正是因为因数分解与指数选取都是**独立**的。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-mu-sum',
      kind: 'implication',
      sources: ['def.mobius-function'],
      target: 'thm.mu-sum',
      title: '$\\sum_{d\\mid n}\\mu(d) = [n=1]$：二项式展开',
      proof: [
        '$n = 1$：只有 $d = 1$，和为 $1$。',
        '',
        '$n > 1$：设 $n = p_{1}^{e_{1}}\\cdots p_{r}^{e_{r}}$，$r \\ge 1$。$\\mu(d) \\ne 0$ 只当 $d$ 由**互异**素因子组成，故',
        '',
        '$$\\sum_{d \\mid n}\\mu(d) = \\sum_{S \\subseteq \\{1,\\cdots,r\\}} (-1)^{\\#S} = \\sum_{k=0}^{r}\\binom{r}{k}(-1)^{k} = (1-1)^{r} = 0 .$$',
        '',
        '正负项按 $|S|$ 配对抵消 —— 这就是全部内容。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-mobius-inversion',
      kind: 'implication',
      sources: ['thm.mu-sum'],
      target: 'thm.mobius-inversion',
      title: '反演：交换求和次序，内层只剩 $n/m=1$',
      proof: [
        '设 $g(n) = \\sum_{d \\mid n} f(d)$ 对一切 $n$。要证 $f(n) = \\sum_{d\\mid n}\\mu(d)g(n/d)$。',
        '',
        '代进去：',
        '',
        '$$\\sum_{d\\mid n}\\mu(d)\\,g\\!\\left(\\frac{n}{d}\\right) = \\sum_{d\\mid n}\\mu(d)\\sum_{e \\mid (n/d)} f(e) .$$',
        '',
        '令 $e\\,d = n/m$，即 $m = n/(de)$；交换求和次序（有限和，可换）：',
        '',
        '$$= \\sum_{m \\mid n} f(m)\\sum_{d \\mid (n/m)}\\mu(d) .$$',
        '',
        '内层由 $\\sum_{d\\mid t}\\mu(d) = [t = 1]$ 只在 $t = n/m = 1$ 时为 $1$，其余为 $0$。故整个和为 $f(n)$。',
        '',
        '反方向把上面这段反过来用（或对「$\\mu$ 反演也成立」再套一次）即得。所以反演是 $\\mu * 1 = \\delta$ 的同义反复。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-chebyshev',
      kind: 'implication',
      sources: ['thm.divisor-formula'],
      target: 'thm.chebyshev-estimate',
      title: 'Чебышёв 估计：$\\binom{2n}{n}$ 的上下界',
      proof: [
        '**下界**（$\\pi$ 不能太小）：取 $N = \\binom{2n}{n}$，则 $N \\ge \\dfrac{4^{n}}{2n+1}$（中间项是最大项，总和 $4^{n}$ 不超过 $(2n+1)$ 倍最大项）。',
        '',
        '另一方面 $N \\le (2n)^{\\pi(2n)}$：因为 $N = \\frac{(2n)!}{(n!)^{2}}$ 是整数，它的每个素因子 $\\le 2n$，而 $v_{p}(N) \\le \\frac{\\log N}{\\log p}$ 的粗估计可换成 $v_{p}(N) \\le \\frac{\\log(2n)}{\\log p}$（用 $\\lfloor 2x\\rfloor - 2\\lfloor x\\rfloor \\in \\{0,1\\}$ 逐项累加与 $p^{k} \\le 2n$ 截断）。',
        '',
        '两式合并：$\\dfrac{4^{n}}{2n+1} \\le (2n)^{\\pi(2n)}$，取对数得 $\\pi(2n) \\ge \\dfrac{2n\\log 2 - \\log(2n+1)}{\\log(2n)} \\ge c\\,\\dfrac{n}{\\log n}$。',
        '',
        '**上界**：对 $n < p \\le 2n$ 的素数，$p$ 整除 $N$ 而 $p > n$ 保证 $p^{2} \\nmid N$（$v_{p}(N) = \\lfloor 2n/p\\rfloor - 2\\lfloor n/p\\rfloor \\le 1$）。\n\n' +
        '于是 $\\prod_{n<p\\le 2n}p \\le N \\le 4^{n}$，取对数得 $\\theta(2n) - \\theta(n) \\le 2n\\log 2$；\n\n' +
        '把它沿 $n, n/2, n/4, \\cdots$ 累加得 $\\theta(x) \\le C x$，再由 $\\theta \\ge (\\log x)\\,\\pi(\\sqrt{x}) + \\cdots$ 的初等关系得 $\\pi(x) \\le C\' x/\\log x$。',
        '',
        '⚠ 这是骨架：常数都没优化，第四步的拼接（$2n$  推出  一般 $x$）省了细节。完整证明见华罗庚《数论导引》第九章。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-bertrand',
      kind: 'implication',
      sources: ['thm.chebyshev-estimate'],
      target: 'thm.bertrand',
      title: 'Bertrand 假设：Чебышёв 估计的区间版',
      proof: [
        '要证：对 $n > 1$ 存在素数 $p \\in (n, 2n)$。',
        '',
        '反设没有这样的素数。取 $N = \\binom{2n}{n}$，则 $N$ 的每个素因子 $p \\le n$（因为 $p > 2n$ 不可能，$n < p < 2n$ 被假设排除，$p = 2n$ 不是素数）。',
        '',
        '把 $p \\le n$ 的贡献拆成两段：',
        '',
        '- $p \\le \\sqrt{2n}$：由 $v_{p}(N) \\le \\log(2n)/\\log p$ 得总贡献 $\\le (2n)^{\\pi(\\sqrt{2n})} \\le (2n)^{\\sqrt{2n}}$；',
        '- $\\sqrt{2n} < p \\le 2n/3$：这样的 $p$ 在 $N$ 里最多出现一次（$p^{2} > 2n$），且 $p \\le 2n/3$ 的素数乘积可以用归纳假设的界估计；',
        '- $2n/3 < p \\le n$：这一段**不贡献任何因子** —— $p$ 在 $n!$ 里出现一次（$p\\cdot1$），在 $(n+1)\\cdots(2n)$ 里也出现一次（$2p \\le 2n$，而 $3p > 2n$），两个 $v_{p}$ 正好抵消：$v_{p}\\bigl(\\binom{2n}{n}\\bigr) = 1-1 = 0$。⚠️ 原文写「$p \\mid N$ 且只出现一次」是**错的**：$n = 5$ 时 $\\binom{10}{5} = 252$ 不被 $5$ 整除。这一段要单列，是为了说明它**根本不出现**，所以前两段给出的界就是全部的界。',
        '',
        '两段合起来给出\n\n$$N = \\binom{2n}{n} \\le (2n)^{\\sqrt{2n}}\\cdot 4^{2n/3},$$\n\n（第二段用 $\\prod_{p\\le x}p \\le 4^{x}$，取 $x = 2n/3$）。另一边，$\\sum_{k=0}^{2n}\\binom{2n}{k} = 4^{2n}$ 且中间那一项最大，故 $N \\ge 4^{n}/(2n+1)$。两边一夹：\n\n$$\\frac{4^{n}}{2n+1} \\le (2n)^{\\sqrt{2n}}\\,4^{2n/3} \\iff 4^{n/3} \\le (2n)^{\\sqrt{2n}+1},$$\n\n右边是 $n^{O(\\sqrt{n})}$ 而左边指数增长，故对充分大的 $n$ 不成立；剩下有限多个 $n$ 逐个验证（$n = 2$ 时 $(2,4)$ 里有 $3$，依次类推）。',
        '',
        '⚠ 这是骨架：三段计数里最容易错的是「$2n/3 < p \\le n$ 不贡献」（上面已改正）；更细的分段与小 $n$ 的逐个验证没有逐条写。完整证明见华罗庚《数论导引》第九章。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-pnt',
      kind: 'implication',
      sources: ['def.prime-counting'],
      target: 'thm.prime-number-theorem',
      title: '素数定理：$\\zeta$ 在 $\\operatorname{Re}\\,s = 1$ 上无零点',
      proof: [
        '**① $\\zeta$ 的解析延拓。** 对 $\\operatorname{Re}\\,s > 1$，$\\zeta(s) = \\sum_{n\\ge1} n^{-s} = \\prod_{p}(1 - p^{-s})^{-1}$（Euler 乘积，靠唯一分解）。\n\n它在 $s = 1$ 有单极点、留数 $1$，并可延拓为 $\\mathbb{C}$ 上的亚纯函数。',
        '',
        '**② 关键一步：$\\operatorname{Re}\\,s = 1$ 上无零点。** 用 $3 + 4\\cos\\theta + \\cos 2\\theta \\ge 0$ 配上 Euler 乘积的对数导数，得 $\\zeta(1 + it) \\ne 0$。这一步是全部难点，也是「素数不会太集中在一条线上」的本质。',
        '',
        '**③ 显式公式。** 对 $c > 1$，',
        '',
        '$$\\psi(x) = x - \\sum_{\\rho}\\frac{x^{\\rho}}{\\rho} - \\log 2\\pi - \\tfrac{1}{2}\\log(1 - x^{-2}),$$',
        '',
        '其中 $\\rho$ 遍历 $\\zeta$ 的非平凡零点（求和按对称方式截断）。',
        '',
        '**④ 收尾。** 由 ②，每个非平凡零点满足 $\\operatorname{Re}\\rho < 1$（准确说是 $0 < \\operatorname{Re}\\rho < 1$）。⚠️ 注意 $\\lvert\\rho\\rvert$ 本身**没有上界** —— 高度 $\\le T$ 的零点个数是 $\\frac{T}{2\\pi}\\log\\frac{T}{2\\pi e}+O(\\log T)$，随 $T$ 增长；所以不能用 $\\lvert\\rho\\rvert\\le 1$。每项 $x^{\\rho} = x^{\\operatorname{Re}\\rho}$（乘一个模长因子）确实严格低于 $x$，但「每项都 $o(x)$」推不出「求和也是 $o(x)$」：必须按高度把零点分段、用上面那个计数把段内项数与 $\\lvert\\rho\\rvert$ 一起压住（这一步才是本条的真正难点，本图不展开）。得 $\\sum_{\\rho}x^{\\rho}/\\rho = o(x)$，于是 $\\psi(x) \\sim x$；\n\n再由 $\\psi \\sim \\theta$（Abel 部分求和）与 $\\theta(x) = \\sum_{p\\le x}\\log p \\sim \\pi(x)\\log x$（因为 $\\sum_{p\\le x}\\log p = \\pi(x)\\log x - \\int_{2}^{x}\\frac{\\pi(t)}{t}\\,\\mathrm{d}t$ 再分部求和）得 $\\pi(x) \\sim x/\\log x$。',
        '',
        '⛔ 本节点**只给陈述与骨架**，证明的每一步（尤其 ② 与 ③ 的截断估计）都不在本图 —— 它需要复分析整章（`complex` 星系那一条线）。要真正做完，得先有 $\\zeta$、$\\Gamma$、Perron 公式与零点计数，那是另一个量级的工作。',
      ].join('\n\n'),
    },

    { kind: 'analogy', a: 'def.divisor-function', b: 'def.multiplicative-function',
      title: '积性函数：$\\tau$、$\\sigma$ 与 $\\mu$、$\\varphi$ 是同一个框架的四个实例',
      note: [
        '四个函数都满足 $f(mn) = f(m)f(n)$（互素时），都由「素数幂上的值」决定，公式都是乘积形状。',
        '',
        '差别只在素数幂上的取值：$\\tau(p^{e}) = e+1$（数指数）、$\\sigma(p^{e}) = 1 + p + \\cdots + p^{e}$（等比和）、$\\varphi(p^{e}) = p^{e} - p^{e-1}$（扣除被 $p$ 整除的）、$\\mu(p^{e}) = 0\\ (e\\ge2)$、$-1\\ (e=1)$（只记素因子个数）。',
        '',
        '所以「积性函数」这条定义是四个具体公式的共同外壳 —— 与「张量场是向量场、微分形式、度量的共同外壳」是同一种组织方式。',
      ].join('\n\n'),
    },
  ],
});
