/* ==========================================================================
   内容包 · 数论：整除与同余（第一批 15 点）
   --------------------------------------------------------------------------
   从整数环的算术出发：整除 → 带余除法 → 辗转相除 → gcd / Bézout
   → 素数 → 唯一分解 → 同余 → 剩余类环 → 中国剩余定理 → φ → Euler / Fermat / Wilson。
   ⭐ 人名一律用原文字母（Euclid / Bézout / Euler / Fermat / Wilson），不音译。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '数论：整除与同余',
  nodes: [

    {
      id: 'def.divides',
      cluster: 'number.basic',
      type: 'definition',
      label: '整除',
      title: '整除与它的基本性质',
      regions: ['number'],
      tags: ['数论', '整除'],
      statement: [
        '设 $a, b \\in \\mathbb{Z}$。若存在 $c \\in \\mathbb{Z}$ 使 $b = ac$，就说 **$a$ 整除 $b$**，记 $a \\mid b$；否则记 $a \\nmid b$。',
        '',
        '基本性质：$a \\mid b \\implies a \\mid bc$；$a \\mid b$ 且 $b \\mid c$ $\\implies$ $a \\mid c$；$a \\mid b$ 且 $a \\mid c$ $\\implies$ $a \\mid (mb + nc)$ 对一切 $m, n \\in \\mathbb{Z}$；若 $a, b \\ne 0$，则 $a \\mid b$ 且 $b \\mid a$ $\\iff$ $a = \\pm b$。',
      ].join('\n'),
      notes: [
        '整除在 $\\mathbb{Z}$ 上**不是**偏序：反称性只在正整数上成立（$2 \\mid -2$ 与 $-2 \\mid 2$ 同时成立而 $2 \\ne -2$）。',
        '',
        '它和理想是同一件事的两种写法：$a \\mid b \\iff (b) \\subseteq (a)$ —— 整除把理想序反过来写。',
        '',
        '约定 $0 \\mid 0$ 成立（取 $c$ 任意），而 $0 \\mid b$ 只当 $b = 0$；所以讨论公因数时总要排除全为零的情形。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第一章'],
    },

    {
      id: 'thm.int-division',
      cluster: 'number.basic',
      type: 'theorem',
      label: '整数的带余除法',
      title: '带余除法：商与余数，余数小于除数',
      regions: ['number'],
      tags: ['数论', '整除', '定理'],
      statement: [
        '设 $a, b \\in \\mathbb{Z}$ 且 $b \\ne 0$。则存在**唯一**的 $q, r \\in \\mathbb{Z}$ 使',
        '',
        '$$a = qb + r, \\qquad 0 \\le r < |b| .$$',
        '',
        '$q$ 叫**商**，$r$ 叫**余数**。',
      ].join('\n'),
      notes: [
        '唯一性：若 $a = qb + r = q\'b + r\'$，则 $(q - q\')b = r\' - r$，于是 $|b| \\mid |r\' - r|$；但 $|r\' - r| < |b|$，只能 $r\' = r$，随之 $q\' = q$。',
        '',
        '存在性用 $\\mathbb{Z}$ 的良序：固定 $b > 0$，集合 $\\{\\, a - qb : q \\in \\mathbb{Z},\\ a - qb \\ge 0 \\,\\}$ 非空（Archimedes 性质），取其最小元为 $r$；若 $r \\ge b$ 则 $r - b$ 更小，矛盾。',
        '',
        '$K[x]$ 上的对应定理是 `thm.division-algorithm`：同一个证明结构，只是把「次数」换成「绝对值」—— 两者都是 Euclid 整环。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§1', 'Borevich–Shafarevich, Number Theory, Ch. 1'],
    },

    {
      id: 'thm.euclid-algorithm',
      cluster: 'number.basic',
      type: 'theorem',
      label: '辗转相除法',
      title: 'Euclid 算法：余数严格下降，必停',
      regions: ['number'],
      tags: ['数论', '整除', '算法'],
      statement: [
        '设 $a, b \\in \\mathbb{Z}$ 不全为零。置 $r_{-1} = a$、$r_{0} = b$，反复做带余除法',
        '',
        '$$r_{i-1} = q_{i}\\, r_{i} + r_{i+1}, \\qquad 0 \\le r_{i+1} < r_{i} .$$',
        '',
        '余数严格下降，故存在 $n$ 使 $r_{n+1} = 0$；此时 $r_{n} = \\gcd(a, b)$，且 $r_{n}$ 可写成 $u a + v b$（$u, v \\in \\mathbb{Z}$）：把每步的余数逐次回代即得。',
      ].join('\n'),
      notes: [
        '这是初等数论里**唯一不依赖唯一分解**的工具：$\\gcd$ 的存在性与 Bézout 系数都从它出来，而算术基本定理反过来要用 $\\gcd$。',
        '',
        '复杂度：余数至少按 Fibonacci 速度下降，步数 $O(\\log \\min(|a|, |b|))$ —— 最坏输入正是相邻 Fibonacci 数（Lamé 定理）。',
        '',
        '在 $K[x]$ 里同样成立（用次数代替绝对值），所以「$\\mathbb{Z}$ 与 $K[x]$ 都是 Euclid 整环」是同一句话。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§1'],
    },

    {
      id: 'def.gcd',
      cluster: 'number.basic',
      type: 'definition',
      label: '最大公因数',
      title: '最大公因数与它的两个刻画',
      regions: ['number'],
      tags: ['数论', '整除'],
      statement: [
        '设 $a, b \\in \\mathbb{Z}$ 不全为零。**最大公因数** $\\gcd(a, b)$ 是同时整除 $a$ 与 $b$ 的正整数中最大的那个。',
        '',
        '等价刻画（不预设存在性）：$\\gcd(a, b)$ 是集合 $\\{\\, ua + vb : u, v \\in \\mathbb{Z} \\,\\}$ 中最小的正整数。',
      ].join('\n'),
      notes: [
        '两个刻画为什么等价：一方面 $\\gcd$ 整除 $ua + vb$ 的每个元素，所以它 $\\le$ 最小正元；另一方面最小正元整除 $a$ 与 $b$（用带余除法把余数写成更小的 $a - q(ua+vb)$ 形式，只能为零），所以它就是最大的公因数。',
        '',
        '「最小正元素」这个刻画只在一维整环成立（$\\mathbb{Z}$、$K[x]$）；一般的 gcd 整环里 $\\gcd$ 存在但未必是线性组合（Bézout 性质是更强的条件）。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§1'],
    },

    {
      id: 'thm.bezout',
      cluster: 'number.basic',
      type: 'theorem',
      label: 'Bézout 恒等式',
      title: 'Bézout：最大公因数是整系数组合',
      regions: ['number'],
      tags: ['数论', '整除', '定理'],
      statement: [
        '设 $a, b \\in \\mathbb{Z}$ 不全为零，$d = \\gcd(a, b)$。则存在 $u, v \\in \\mathbb{Z}$ 使',
        '',
        '$$u a + v b = d .$$',
        '',
        '更一般地，$\\{\\, ua + vb : u, v \\in \\mathbb{Z} \\,\\} = d\\,\\mathbb{Z}$。',
      ].join('\n'),
      notes: [
        '推论：$a$ 与 $b$ 互素 $\\iff$ 存在 $u, v$ 使 $ua + vb = 1$。',
        '',
        '这是解一次同余方程 $ax \\equiv b \\pmod n$ 的唯一工具：它有解 $\\iff$ $\\gcd(a, n) \\mid b$，且解集是模 $n / \\gcd(a, n)$ 的一个同余类。',
        '',
        '$\\mathbb{Z}[x]$ 里没有 Bézout（$\\gcd(2, x) = 1$ 但 $2u + xv = 1$ 无解），所以「Bézout 整环」是一个专门的名字。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§1'],
    },

    {
      id: 'def.prime',
      cluster: 'number.basic',
      type: 'definition',
      label: '素数',
      title: '素数与合数',
      regions: ['number'],
      tags: ['数论', '素数'],
      statement: [
        '大于 $1$ 的整数 $p$ 叫**素数**，若它的正因数只有 $1$ 与 $p$ 本身。大于 $1$ 且不是素数的整数叫**合数**。',
      ].join('\n'),
      notes: [
        '真正用来做证明的性质不是「只有两个因数」，而是 **Euclid 引理**：$p \\mid ab \\implies p \\mid a$ 或 $p \\mid b$。',
        '',
        '这两条在 $\\mathbb{Z}$ 里等价，但在一般整环里不等价：$\\mathbb{Z}[\\sqrt{-5}]$ 里 $2 \\mid (1+\\sqrt{-5})(1-\\sqrt{-5}) = 6$ 而 $2$ 不整除任一因子 —— 元素「不可约」却不「素」。环论把后者抽象成**素元素**，前者是**不可约元素**。',
        '',
        '$1$ 不是素数：否则唯一分解就不唯一了（$6 = 2\\cdot 3 = 1\\cdot 2\\cdot 3$）。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第一章'],
    },

    {
      id: 'thm.euclid-infinite-primes',
      cluster: 'number.basic',
      type: 'theorem',
      label: '素数有无穷多个',
      title: 'Euclid 的证明：乘积加一必带新素因子',
      regions: ['number'],
      tags: ['数论', '素数', '定理'],
      statement: [
        '素数有无穷多个。',
      ].join('\n'),
      notes: [
        '证明只用带余除法：若素数只有 $p_{1}, \\cdots, p_{n}$，令 $N = p_{1}\\cdots p_{n} + 1$。$N > 1$ 必有素因数 $p$，而 $p \\ne p_{i}$（否则 $p \\mid N$ 且 $p \\mid p_{1}\\cdots p_{n}$，于是 $p \\mid 1$），矛盾。',
        '',
        '这条证明是**非构造**的：它没说第 $n+1$ 个素数是谁，也没给出 $\\pi(x)$ 的任何估计。定量版本（Chebyshev 的 $\\pi(x) \\asymp x/\\log x$）要用 Stirling 公式与组合恒等式，属于解析数论。',
        '',
        '同一手法可证 $\\mathbb{F}_{p}[x]$ 里不可约多项式无穷：把 $+1$ 换成「所有不可约多项式的乘积加一」。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§1'],
    },

    {
      id: 'thm.fundamental-arithmetic',
      cluster: 'number.basic',
      type: 'theorem',
      label: '算术基本定理',
      title: '唯一分解：每个整数拆成素数乘积恰好一种方式',
      regions: ['number'],
      tags: ['数论', '素数', '唯一分解', '定理'],
      statement: [
        '每个整数 $n > 1$ 都能唯一地写成',
        '',
        '$$n = p_{1}^{e_{1}} p_{2}^{e_{2}} \\cdots p_{r}^{e_{r}},$$',
        '',
        '其中 $p_{1} < p_{2} < \\cdots < p_{r}$ 是素数，$e_{i} \\ge 1$。',
      ].join('\n'),
      notes: [
        '存在性：对 $n$ 归纳 —— $n$ 是素数则完事；否则 $n = ab$ 且 $1 < a, b < n$，对 $a, b$ 各用归纳假设再合并。',
        '',
        '唯一性：用 Euclid 引理（$p \\mid ab \\implies p \\mid a$ 或 $p \\mid b$）。这是唯一分解整环（UFD）的标准论证。',
        '',
        '代数里的抽象版本是「$\\mathbb{Z}$ 是唯一分解整环」：$K[x]$ 也有（`thm.poly-ufd`），$\\mathbb{Z}[\\sqrt{-5}]$ 没有（$6 = 2\\cdot 3 = (1+\\sqrt{-5})(1-\\sqrt{-5})$）。层级：Euclid 整环 $\\implies$ UFD $\\implies$ gcd 整环。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§1'],
    },

    {
      id: 'def.congruence',
      cluster: 'number.basic',
      type: 'definition',
      label: '同余',
      title: '模 $n$ 同余：与运算相容的等价关系',
      regions: ['number'],
      tags: ['数论', '同余'],
      statement: [
        '设 $n \\ge 1$。称 $a$ 与 $b$ **模 $n$ 同余**，记 $a \\equiv b \\pmod n$，若 $n \\mid (a - b)$。',
        '',
        '同余是 $\\mathbb{Z}$ 上的等价关系，且与加法、乘法相容：由 $a \\equiv b$、$c \\equiv d$ 可得 $a + c \\equiv b + d$ 与 $ac \\equiv bd$。',
      ].join('\n'),
      notes: [
        '「等价关系 + 与运算相容」正是**同余关系**的一般定义，商掉它得到商环 $\\mathbb{Z}/n\\mathbb{Z}$。',
        '',
        '$n = 0$ 时约定 $a \\equiv b \\pmod 0 \\iff a = b$：模 $0$ 的同余就是相等。',
        '',
        '同余把「整除」问题化成了「有限环里的等式」，这是初等数论最核心的一步：后面对 $\\mathbb{Z}/n\\mathbb{Z}$ 用 Lagrange 定理，就得到 Euler 定理与 Fermat 小定理。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§2'],
    },

    {
      id: 'def.zmodn',
      cluster: 'number.basic',
      type: 'definition',
      label: '剩余类环',
      title: '剩余类环：把同余类收成一个元素',
      regions: ['number'],
      tags: ['数论', '同余', '环'],
      statement: [
        '记 $\\mathbb{Z}/n\\mathbb{Z} = \\{[0], [1], \\cdots, [n-1]\\}$，其中 $[a]$ 是 $a$ 所在的同余类，运算由代表元定义：',
        '',
        '$$[a] + [b] := [a + b], \\qquad [a]\\,[b] := [ab] .$$',
        '',
        '它是一个有单位元的交换环，叫**剩余类环**（模 $n$ 的整数环）。',
      ].join('\n'),
      notes: [
        '良定义性就是 `def.congruence` 的相容性：换代表元不改变结果。',
        '',
        '$\\mathbb{Z}/n\\mathbb{Z}$ 是域 $\\iff$ $n$ 是素数（$n = p$ 时记 $\\mathbb{F}_{p}$）：$n$ 合数时取 $n = ab$，$[a][b] = 0$ 而两者非零，有零因子。',
        '',
        '单位群 $(\\mathbb{Z}/n\\mathbb{Z})^{\\times} = \\{[a] : \\gcd(a, n) = 1\\}$ 有 $\\varphi(n)$ 个元素 —— 这个群的大小就是 Euler 定理里那个指数。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§2'],
    },

    {
      id: 'thm.crt',
      cluster: 'number.basic',
      type: 'theorem',
      label: '中国剩余定理',
      title: '中国剩余定理：模两两互素的分解',
      regions: ['number'],
      tags: ['数论', '同余', '定理'],
      statement: [
        '设 $n_{1}, \\cdots, n_{k}$ 两两互素，$N = n_{1} \\cdots n_{k}$。则',
        '',
        '$$\\mathbb{Z}/N\\mathbb{Z} \\;\\cong\\; \\mathbb{Z}/n_{1}\\mathbb{Z} \\times \\cdots \\times \\mathbb{Z}/n_{k}\\mathbb{Z}, \\qquad [a] \\longmapsto ([a], \\cdots, [a])$$',
        '',
        '是环同构。等价说法：同余方程组 $x \\equiv a_{i} \\pmod{n_{i}}$（$i = 1, \\cdots, k$）对任意右端都有解，且解模 $N$ 唯一。',
      ].join('\n'),
      notes: [
        '存在性（构造式）：由 Bézout，取 $e_{i}$ 满足 $e_{i} \\equiv 1 \\pmod{n_{i}}$、$e_{i} \\equiv 0 \\pmod{n_{j}}$（$j \\ne i$），即 $e_{i} = (N/n_{i})\\,u_{i}$，其中 $u_{i}(N/n_{i}) \\equiv 1 \\pmod{n_{i}}$；于是 $x = \\sum_{i} a_{i} e_{i}$ 就是解。',
        '',
        '唯一性：两个解之差被每个 $n_{i}$ 整除，而 $n_{i}$ 两两互素，故被 $N$ 整除。',
        '',
        '互素条件不能去掉：$x \\equiv 0 \\pmod 2$ 与 $x \\equiv 1 \\pmod 4$ 无解。',
        '',
        '实际用处是把模 $N$ 的问题拆成模素数幂的问题 —— 乘性函数的公式就是靠它。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§2'],
    },

    {
      id: 'def.euler-phi',
      cluster: 'number.basic',
      type: 'definition',
      label: 'Euler 函数',
      title: 'Euler 函数与它的乘积公式',
      regions: ['number'],
      tags: ['数论', '数论函数'],
      statement: [
        '对 $n \\ge 1$，$\\varphi(n)$ 是 $1, 2, \\cdots, n$ 中与 $n$ 互素的整数个数：',
        '',
        '$$\\varphi(n) = \\#\\{\\, 1 \\le a \\le n : \\gcd(a, n) = 1 \\,\\} .$$',
        '',
        '若 $n = p_{1}^{e_{1}} \\cdots p_{r}^{e_{r}}$，则',
        '',
        '$$\\varphi(n) = n \\prod_{i=1}^{r} \\left( 1 - \\frac{1}{p_{i}} \\right).$$',
      ].join('\n'),
      notes: [
        '公式分两步：先有 $\\varphi(p^{e}) = p^{e} - p^{e-1}$（$1$ 到 $p^{e}$ 里被 $p$ 整除的有 $p^{e-1}$ 个）；再有乘性 $\\varphi(mn) = \\varphi(m)\\varphi(n)$（$\\gcd(m,n) = 1$ 时），由中国剩余定理把单位群拆成直积即得。',
        '',
        '$\\varphi$ 是第一个**积性函数**的例子：$f(mn) = f(m)f(n)$ 对互素的 $m, n$ 成立。数论导引第三章整章在讲这类函数（$\\tau$、$\\sigma$、$\\mu$）。',
        '',
        '$\\varphi(n)$ 也是分圆多项式 $\\Phi_{n}$ 的次数 —— 这条联系在 Galois 理论那边会再用到。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第三章'],
    },

    {
      id: 'thm.euler-theorem',
      cluster: 'number.basic',
      type: 'theorem',
      label: 'Euler 定理',
      title: 'Euler 定理：互素时幂同余于一',
      regions: ['number'],
      tags: ['数论', '同余', '定理'],
      statement: [
        '设 $a, n \\ge 1$ 且 $\\gcd(a, n) = 1$。则',
        '',
        '$$a^{\\varphi(n)} \\equiv 1 \\pmod n .$$',
      ].join('\n'),
      notes: [
        '证明只有一行，但是群论的：$[a]$ 落在单位群 $G = (\\mathbb{Z}/n\\mathbb{Z})^{\\times}$ 里，$|G| = \\varphi(n)$，由 Lagrange 定理（`thm.lagrange`）得 $[a]^{|G|} = 1$。',
        '',
        '所以这条定理的真正内容是「单位群是个有限群」—— 同余只是它的坐标写法。',
        '',
        '$\\gcd(a, n) > 1$ 时结论一般不成立：$2^{2} = 4 \\equiv 0 \\pmod 4$，而 $\\varphi(4) = 2$。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§2'],
    },

    {
      id: 'thm.fermat-little',
      cluster: 'number.basic',
      type: 'theorem',
      label: 'Fermat 小定理',
      title: 'Fermat 小定理：模素数时幂同余于一',
      regions: ['number'],
      tags: ['数论', '同余', '素数', '定理'],
      statement: [
        '设 $p$ 是素数且 $p \\nmid a$。则',
        '',
        '$$a^{p-1} \\equiv 1 \\pmod p ,$$',
        '',
        '从而对**一切**整数 $a$ 有 $a^{p} \\equiv a \\pmod p$。',
      ].join('\n'),
      notes: [
        '由 `thm.euler-theorem` 取 $n = p$、$\\varphi(p) = p - 1$ 即得。也有不绕群的证明：$(1 + \\cdots + 1)^{p}$ 展开后中间的二项式系数 $\\binom{p}{k}$ 都被 $p$ 整除（$1 \\le k \\le p-1$）。',
        '',
        '⛔ 反过来不成立：$a^{n-1} \\equiv 1 \\pmod n$ 对一切 $\\gcd(a, n) = 1$ 的 $a$ 成立，并不推出 $n$ 是素数 —— Carmichael 数（最小的 $561 = 3\\cdot 11\\cdot 17$）就是这样。',
        '',
        '用处遍地都是：求逆元 $a^{-1} \\equiv a^{p-2}$、证明 $\\mathbb{F}_{p}$ 里 $x^{p} = x$、以及 RSA 的正确性。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§2'],
    },

    {
      id: 'cor.wilson',
      cluster: 'number.basic',
      type: 'corollary',
      label: 'Wilson 定理',
      title: 'Wilson 定理：用阶乘同余判定素数',
      regions: ['number'],
      tags: ['数论', '同余', '素数', '推论'],
      statement: [
        '$p$ 是素数 $\\iff$ $(p - 1)! \\equiv -1 \\pmod p$。',
      ].join('\n'),
      notes: [
        '必要性：在 $(\\mathbb{Z}/p\\mathbb{Z})^{\\times}$ 里，除 $[1]$ 与 $[-1]$ 之外每个元素与自己的逆不同（$a^{2} = 1 \\implies a = \\pm 1$，因为 $p$ 素时 $x^{2} - 1$ 至多两个根），于是它们两两配对，乘起来剩 $-1$。',
        '',
        '充分性：若 $n > 4$ 合数，写 $n = ab$、$1 < a, b < n$，则 $a, b$ 都出现在 $(n-1)!$ 里，故 $n \\mid (n-1)!$，不可能 $\\equiv -1$；$n = 4$ 单独看：$3! = 6 \\equiv 2 \\not\\equiv -1$。',
        '',
        '它是「素数」的**等价判据**，但计算量是 $O(p)$ 次乘法，实用价值为零 —— 价值在理论：这是 $\\mathbb{Z}/p\\mathbb{Z}$ 为域的组合式刻画。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》§2'],
    },
  ],

  edges: [

    { kind: 'definition', definition: 'def.int', usedBy: 'def.divides',
      note: '整数 $\\mathbb{Z}$ 是整除关系的载体：$a \\mid b$ 的定义直接落在 $\\mathbb{Z}$ 的元素上。' },

    { kind: 'definition', definition: 'def.ideal', usedBy: 'def.divides',
      note: '整除就是主理想的包含：$a \\mid b \\iff (b) \\subseteq (a)$。这条把初等数论与环论对齐。' },

    { kind: 'definition', definition: 'def.divides', usedBy: 'thm.int-division',
      note: '带余除法的陈述里直接用了「整除」：$b \\ne 0$，$r < |b|$，而 $a - qb = r$ 就是「$b$ 除 $a$ 的余数」。' },

    { kind: 'definition', definition: 'def.divides', usedBy: 'def.gcd',
      note: '最大公因数的定义是「同时整除 $a$ 与 $b$ 的最大正整数」—— 没有整除就没有公因数。' },

    { kind: 'definition', definition: 'def.divides', usedBy: 'def.prime',
      note: '素数的定义是「正因数只有 $1$ 与 $p$」，这本身就是用整除写的。' },

    { kind: 'definition', definition: 'def.divides', usedBy: 'def.congruence',
      note: '同余的定义只用一件事：$n \\mid (a-b)$。' },

    { kind: 'definition', definition: 'def.congruence', usedBy: 'def.zmodn',
      note: '剩余类环的元素就是同余类，运算是「代表元运算 + 证明良定义」。' },

    { kind: 'definition', definition: 'def.quotient-set', usedBy: 'def.zmodn',
      note: '把同余类收成元素，就是取商集：$\\mathbb{Z}/n\\mathbb{Z} = \\mathbb{Z}/{\\sim}$。' },

    { kind: 'definition', definition: 'def.ring', usedBy: 'def.zmodn',
      note: '$\\mathbb{Z}/n\\mathbb{Z}$ 是环：加法、乘法、单位元全由 $\\mathbb{Z}$ 的运算导出，环公理逐条继承。' },

    { kind: 'definition', definition: 'def.zmodn', usedBy: 'thm.crt',
      note: '中国剩余定理说的是「剩余类环的直积分解」—— 陈述里两个对象都是 $\\mathbb{Z}/n\\mathbb{Z}$。' },

    { kind: 'definition', definition: 'def.zmodn', usedBy: 'def.euler-phi',
      note: '$\\varphi(n)$ 就是单位群 $(\\mathbb{Z}/n\\mathbb{Z})^{\\times}$ 的阶。' },

    { kind: 'definition', definition: 'def.group', usedBy: 'thm.euler-theorem',
      note: '单位群是群：Euler 定理的证明只用到「有限群的元素阶整除群阶」。' },

    { kind: 'definition', definition: 'thm.lagrange', usedBy: 'thm.euler-theorem',
      note: '定理就是 Lagrange 定理在 $(\\mathbb{Z}/n\\mathbb{Z})^{\\times}$ 上的特例，指数取 $\\varphi(n) = |G|$。' },

    {
      id: 'imp.nt-division-euclid',
      kind: 'implication',
      sources: ['thm.int-division'],
      target: 'thm.euclid-algorithm',
      title: '辗转相除法：反复做带余除，余数严格下降',
      proof: [
        '把带余除法用在 $(a, b)$ 上：$a = q_{1}b + r_{1}$，$0 \\le r_{1} < |b|$。若 $r_{1} = 0$ 则 $\\gcd = |b|$；否则对 $(b, r_{1})$ 重复。',
        '',
        '**为什么必停**：余数序列 $r_{1} > r_{2} > \\cdots \\ge 0$ 是严格下降的非负整数串，由 $\\mathbb{N}$ 的良序不能无限下降，故某步得 $0$。',
        '',
        '**为什么最后那个非零余数是 $\\gcd$**：设 $d \\mid a, d \\mid b$，由 $r_{i+1} = r_{i-1} - q_{i}r_{i}$ 归纳得 $d$ 整除每个 $r_{i}$，特别地 $d \\mid r_{n}$，故 $d \\le r_{n}$。反过来（倒着走）每个 $r_{i+1}$ 都整除 $r_{i-1}$ 与 $r_{i}$，于是 $r_{n}$ 同时整除 $a$ 与 $b$。所以 $r_{n}$ 是不超过一切公因数的公因数 —— 即最大的那个。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-euclid-bezout',
      kind: 'implication',
      sources: ['thm.euclid-algorithm'],
      target: 'thm.bezout',
      title: 'Bézout 系数：把余数逐次回代',
      proof: [
        '记 $r_{n} = \\gcd(a,b)$。回代从最后一步开始：$r_{n} = r_{n-2} - q_{n-1} r_{n-1}$，而 $r_{n-1}$ 又是 $r_{n-3}, r_{n-2}$ 的整系数组合，如此一路上溯，每一步的系数都是整数。',
        '',
        '结论：存在 $u, v \\in \\mathbb{Z}$ 使 $r_{n} = u a + v b$。因为每一步只是「减掉整数倍的上一项」，系数不会被除，所以不必担心有理数。',
        '',
        '反过来，任何 $ua + vb$ 都被 $\\gcd(a,b)$ 整除，故 $\\{ua+vb\\} \\subseteq d\\mathbb{Z}$；而上面已给出 $d$ 本身，所以两者相等。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-primes-infinite',
      kind: 'implication',
      sources: ['thm.int-division'],
      target: 'thm.euclid-infinite-primes',
      title: '素数无穷：乘积加一必带新素因子',
      proof: [
        '反设素数只有 $p_{1}, \\cdots, p_{n}$，令 $N = p_{1}\\cdots p_{n} + 1 > 1$。',
        '',
        '$N$ 有素因数 $p$（这一步用的是「$>1$ 的整数必有素因数」，本质是 $\\mathbb{N}$ 的良序 + 带余除法）。',
        '',
        '若 $p = p_{i}$，则 $p \\mid N$ 且 $p \\mid p_{1}\\cdots p_{n}$，相减得 $p \\mid 1$，与 $p$ 是素数矛盾。故 $p$ 是新的素数。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-fta',
      kind: 'implication',
      sources: ['thm.int-division'],
      target: 'thm.fundamental-arithmetic',
      title: '唯一分解：归纳 + Euclid 引理',
      proof: [
        '**存在性**：对 $n$ 归纳。$n$ 素则 $n = n$；否则 $n = ab$、$1 < a, b < n$，由归纳假设 $a, b$ 各有分解，乘起来即得 $n$ 的分解（再按大小重排、合并同素因子）。',
        '',
        '**唯一性**：设 $p_{1}\\cdots p_{r} = q_{1}\\cdots q_{s}$。$p_{1}$ 整除右边，由 Euclid 引理（$p \\mid xy \\implies p \\mid x$ 或 $p \\mid y$，对乘积归纳）得 $p_{1} = q_{j}$ 对某个 $j$；两边约掉 $p_{1}$，对 $r + s$ 归纳即得 $r = s$ 且两边的素因子多重集相同。',
        '',
        'Euclid 引理本身来自带余除法：若 $p \\nmid a$，则 $\\gcd(p, a) = 1$，由 Bézout 有 $up + va = 1$，两边乘 $b$ 得 $upb + vab = b$ —— 而 $p$ 整除右边两项（$p \\mid ab$ 与 $p \\mid upb$），故 $p \\mid b$。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-crt',
      kind: 'implication',
      sources: ['thm.bezout'],
      target: 'thm.crt',
      title: '中国剩余定理：用 Bézout 造出「单位分解」',
      proof: [
        '由 $\\gcd(N/n_{i}, n_{i}) = 1$ 与 Bézout，存在 $u_{i}, v_{i}$ 使 $u_{i}(N/n_{i}) + v_{i} n_{i} = 1$。令 $e_{i} := u_{i}(N/n_{i})$，则',
        '',
        '$$e_{i} \\equiv 1 \\pmod{n_{i}}, \\qquad e_{i} \\equiv 0 \\pmod{n_{j}}\\ (j \\ne i).$$',
        '',
        '于是对任意右端 $(a_{1}, \\cdots, a_{k})$，$x := \\sum_{i} a_{i} e_{i}$ 满足 $x \\equiv a_{i} \\pmod{n_{i}}$。',
        '',
        '**唯一性**：两解之差被每个 $n_{i}$ 整除，而 $n_{i}$ 两两互素，故被乘积 $N$ 整除。',
        '',
        '**同构**：映射 $[a] \\mapsto ([a], \\cdots, [a])$ 是环同态；上面的构造给出满射，两边的元素个数都是 $N$（有限环同满射即单射），故是同构。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-lagrange-euler',
      kind: 'implication',
      sources: ['thm.lagrange'],
      target: 'thm.euler-theorem',
      title: 'Euler 定理：Lagrange 定理在单位群上的特例',
      proof: [
        '设 $G = (\\mathbb{Z}/n\\mathbb{Z})^{\\times}$，$|G| = \\varphi(n)$（因为 $[a]$ 可逆 $\\iff$ $\\gcd(a, n) = 1$）。',
        '',
        '对任意 $[a] \\in G$，考虑由 $[a]$ 生成的循环子群 $H = \\langle [a] \\rangle$。由 Lagrange 定理（`thm.lagrange`），$|H| \\mid |G|$，即 $|G| = |H| \\cdot m$。',
        '',
        '而 $[a]^{|H|} = 1$（循环群的阶就是元素的阶），故 $[a]^{|G|} = ([a]^{|H|})^{m} = 1$。换回同余语言：$a^{\\varphi(n)} \\equiv 1 \\pmod n$。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-euler-fermat',
      kind: 'implication',
      sources: ['thm.euler-theorem'],
      target: 'thm.fermat-little',
      title: 'Fermat 小定理：取 $n = p$ 的 Euler 定理',
      proof: [
        '$p$ 是素数时 $\\varphi(p) = p - 1$（$1, \\cdots, p$ 中只有 $p$ 与 $p$ 不互素），且 $p \\nmid a$ 正是 $\\gcd(a, p) = 1$。',
        '',
        '把 $n = p$ 代入 Euler 定理即得 $a^{p-1} \\equiv 1 \\pmod p$。',
        '',
        '两边乘 $a$ 得 $a^{p} \\equiv a \\pmod p$ —— 这一步对 $p \\mid a$ 也成立（两边都是 $0$），所以「一切整数 $a$」的版本成立。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-wilson',
      kind: 'implication',
      sources: ['def.zmodn'],
      target: 'cor.wilson',
      title: 'Wilson 定理：把单位群的元素两两配对成逆',
      proof: [
        '$p$ 素时 $G = (\\mathbb{Z}/p\\mathbb{Z})^{\\times}$ 有 $p-1$ 个元素。方程 $x^{2} = 1$ 在域 $\\mathbb{F}_{p}$ 里至多两个根，即 $[1]$ 与 $[-1]$。',
        '',
        '其余 $p-3$ 个元素按「$x \\leftrightarrow x^{-1}$」配对，每对乘积为 $1$（且每对的两个元素不同，否则 $x = x^{-1}$ 即 $x^{2} = 1$）。',
        '',
        '于是 $(p-1)! \\equiv 1^{p-3 \\over 2} \\cdot 1 \\cdot (-1) \\equiv -1 \\pmod p$。',
        '',
        '反过来若 $n$ 合数（$n > 4$），写 $n = ab$ 且 $1 < a, b < n$，则 $a \\mid (n-1)!$ 与 $b \\mid (n-1)!$，在 $\\gcd(a,b) = 1$ 时得 $n \\mid (n-1)!$；$\\gcd(a,b) > 1$ 的情形改用 $n$ 的一个真因子与 $n/\\text{它}$ 同样论证，仍得 $n \\mid (n-1)!$。故不可能 $\\equiv -1$。',
      ].join('\n\n'),
    },

    { kind: 'analogy', a: 'thm.int-division', b: 'thm.division-algorithm',
      title: '整数与多项式：同一个带余除法',
      note: [
        '两边的证明结构一模一样：$\\mathbb{Z}$ 上按绝对值下降，$K[x]$ 上按次数下降；结论都是「商 + 余，余比除数小」。',
        '',
        '差异只在「小」怎么量：$\\mathbb{Z}$ 是全序，$K[x]$ 只用次数（系数任意）。这也说明为什么两者都叫 **Euclid 整环** —— 有欧几里得函数就够了。',
        '',
        '后续也同步：$\\mathbb{Z}$ 有辗转相除就有 gcd，进而就是 UFD；$K[x]$ 有完全相同的链条（`thm.poly-ufd`）。',
      ].join('\n\n'),
    },

    { kind: 'analogy', a: 'thm.fundamental-arithmetic', b: 'thm.poly-ufd',
      title: '唯一分解：$\\mathbb{Z}$ 与 $K[x]$ 的共同形状',
      note: [
        '两边的定理一字不差，只把「素数」换成「不可约多项式」、把「绝对值」换成「次数」。',
        '',
        '但 UFD 不是自动的：$\\mathbb{Z}[\\sqrt{-5}]$ 与 $K[x, y]$ 都不是 UFD。反例的形状也一样 —— 同一个元素有两条真分解。',
      ].join('\n\n'),
    },
  ],
});
