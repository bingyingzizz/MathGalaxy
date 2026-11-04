/* ============================================================================
   内容包 · E1 数论 $\\leftrightarrow$ 复分析（2026-11-04，v2 清单 §2 ⑤）
   ----------------------------------------------------------------------------
   审计里 `number $\\leftrightarrow$ analysis` 的边数是 **0** —— ζ 函数与解析数论整块缺席。
   这里只补**最小可交付**（4 件），但每件都写清「它是什么 / 证明到哪一步」：

     `def.riemann-zeta`         $\\zeta(s) = \\sum n^{-s}$（$\\operatorname{Re}s > 1$）及其延拓（延拓只记结论，标骨架）
     `thm.euler-product`        $\\zeta(s) = \\prod_{p} (1 - p^{-s})^{-1}$ —— **数论 $\\leftrightarrow$ 分析的桥**
     `def.dirichlet-character`  $\\chi : (\\mathbb{Z}/n)^{\\times} \\to \\mathbb{C}^{\\times}$，延拓到 $\\mathbb{Z}/n$
     `ana.zeta-pnt`             素数定理与 $\\zeta$ 的非零区域（类比，不当依赖）

   ⛔ 不写黎曼猜想（未解决）；只在注里说明它问的是什么。
   ========================================================================== */
(window.MG = window.MG || {}).packs = window.MG.packs || [];
window.MG.packs.push({
  name: '解析数论的入口：ζ 函数 / Euler 乘积 / 狄利克雷特征标',

  nodes: [
    {
      id: 'def.riemann-zeta',
      cluster: 'number.functions',
      type: 'definition',
      label: '黎曼 ζ 函数',
      title: '黎曼 $\\zeta$ 函数：$\\zeta(s) = \\sum_{n \\ge 1} n^{-s}$（$\\operatorname{Re}s > 1$）',
      regions: ['number', 'analysis'],
      tags: ['定义', '数论', '复分析', 'ζ 函数'],
      statement: [
        '对 $\\operatorname{Re} s > 1$ 定义',
        '',
        '$$\\zeta(s) := \\sum_{n=1}^{\\infty} \\frac{1}{n^{s}} = \\sum_{n=1}^{\\infty} e^{-s\\log n}.$$',
        '',
        '这个级数在该半平面上**绝对收敛且内闭一致收敛**，所以 $\\zeta$ 在 $\\{\\operatorname{Re} s > 1\\}$ 上全纯。',
      ].join('\n'),
      notes: [
        '**为什么 $\\operatorname{Re}s > 1$ 就够**：$|n^{-s}| = n^{-\\operatorname{Re}s}$，而 $\\sum n^{-\\sigma}$ 在 $\\sigma > 1$ 收敛（$p$-判别法）。' +
          '于是 Weierstrass 判别法给出内闭一致收敛 $\\implies$ 逐项求导合法 $\\implies$ 全纯。',
        '⭐ **延拓（只记结论）**：$\\zeta$ 可以延拓成 $\\mathbb{C}$ 上的亚纯函数，唯一极点是一阶极点 $s = 1$，留数 $1$；' +
          '并且有函数方程 $\\zeta(s) = 2^{s}\\pi^{s-1}\\sin(\\pi s/2)\\,\\Gamma(1-s)\\,\\zeta(1-s)$。' +
          '⚠ **这一段本图标骨架**：延拓的标准做法（Euler–Maclaurin 或 theta 函数的 Mellin 变换）在本图没有节点，' +
          '所以这里只把它当**已知结论**引用，不给证明。',
        '📌 **$s = 2$ 的值**：$\\zeta(2) = \\pi^{2}/6$（Euler）；偶数处的值都由 Bernoulli 数给出，奇数处至今只知道 $\\zeta(3)$ 无理（Apéry）。',
        '⚠ **黎曼猜想**（未解决）：所有非平凡零点都在 $\\operatorname{Re}s = 1/2$ 上。本图**不收录**它作为定理，只在这里记一句它问的是什么 —— ' +
          '📌 它的价值在于：$\\zeta$ 的零点位置**等价于**素数分布的误差项估计，见 `thm.prime-number-theorem`。',
      ].join('\n\n'),
      refs: ['Titchmarsh, The Theory of the Riemann Zeta-Function, Ch. 1–2'],
    },

    {
      id: 'thm.euler-product',
      cluster: 'number.functions',
      type: 'theorem',
      label: 'Euler 乘积',
      title: 'Euler 乘积：$\\zeta(s) = \\prod_{p}\\bigl(1 - p^{-s}\\bigr)^{-1}$（$\\operatorname{Re}s > 1$）',
      regions: ['number', 'analysis'],
      tags: ['定理', '数论', '复分析', 'ζ 函数', '桥'],
      statement: [
        '对 $\\operatorname{Re} s > 1$，',
        '',
        '$$\\zeta(s) \\;=\\; \\prod_{p\\ \\text{素数}} \\frac{1}{1 - p^{-s}},$$',
        '',
        '右端的无穷乘积绝对收敛。',
      ].join('\n'),
      notes: [
        '**证明（这是本图少见的完整短证明）**：对单个素数，几何级数在 $|p^{-s}| = p^{-\\sigma} < 1$ 时收敛，给出',
        '',
        '$$\\frac{1}{1 - p^{-s}} = \\sum_{k \\ge 0} p^{-ks}.$$',
        '把**前 $N$ 个素数**的这些级数相乘（绝对收敛，可以任意重排）得',
        '',
        '$$\\prod_{p \\le N} \\frac{1}{1 - p^{-s}} = \\sum_{n \\in S_{N}} n^{-s},$$',
        '其中 $S_{N}$ 是「素因子全 $\\le N$」的正整数全体。令 $N \\to \\infty$：$\\sum_{n \\notin S_{N}} |n^{-s}| \\le \\sum_{n > N} n^{-\\sigma} \\to 0$，' +
          '于是左边趋于 $\\zeta(s)$。∎',
        '⭐ **为什么说它是「桥」**：左边是**分析**的对象（一个级数、一个复变量函数），右边是**数论**的对象（对素数取乘积）。' +
          '$\\zeta$ 的每一条解析性质（零点、增长、留数）因此都能翻译成关于素数的陈述 —— 这就是解析数论的全部出发点。',
        '📌 **算术基本定理在哪儿用了**：$S_{N}$ 里的每个 $n$ 只有**一种**分解方式，所以乘积展式里每项 $n^{-s}$ 恰好出现一次、系数为 $1$。' +
          '⛔ 若唯一分解失败，这个乘积就**不等于** $\\zeta$。',
        '⚠ **发散的一侧**：$s \\to 1^{+}$ 时两边都发散（左边是调和级数、右边 $\\prod (1 - 1/p)^{-1}$）—— ' +
          '这正是「素数有无穷多个」的**解析证明**：乘积若有限则收敛，矛盾。',
      ].join('\n\n'),
      refs: ['Apostol, Introduction to Analytic Number Theory, Ch. 11'],
    },

    {
      id: 'def.dirichlet-character',
      cluster: 'number.functions',
      type: 'definition',
      label: '狄利克雷特征标',
      title: '狄利克雷特征标 $\\chi \\bmod n$：$(\\mathbb{Z}/n)^{\\times} \\to \\mathbb{C}^{\\times}$，延拓成完全积性函数',
      regions: ['number', 'algebra'],
      tags: ['定义', '数论', '特征标'],
      statement: [
        '固定 $n \\ge 1$。**狄利克雷特征标**（mod $n$）是一个群同态',
        '',
        '$$\\chi : \\bigl(\\mathbb{Z}/n\\mathbb{Z}\\bigr)^{\\times} \\longrightarrow \\mathbb{C}^{\\times},$$',
        '',
        '再把它**延拓**成 $\\mathbb{Z}$ 上的函数：$\\chi(a) := \\chi(a \\bmod n)$ 当 $\\gcd(a,n) = 1$，否则 $\\chi(a) := 0$。',
      ].join('\n'),
      notes: [
        '**延拓之后它变成完全积性函数**：$\\chi(ab) = \\chi(a)\\chi(b)$ 对**一切** $a, b$ 成立（包括与 $n$ 不互素的情形 —— 两边都是 $0$）。' +
          '这一步是「特征标」在数论里好用的原因：它像乘法角色一样可以塞进任何积性表达式。',
        '⭐ **主特征标**：$\\chi_{0}(a) = 1$（$\\gcd(a,n) = 1$）与 $0$ 其它 —— 它的 $L$ 函数就是 $\\zeta(s)$ 去掉那些整除 $n$ 的素数因子。' +
          '于是「$\\zeta$ 的这些因子」被单独摘出来研究，这正是引入特征标的动机。',
        '📌 **$L$ 函数**：$L(s, \\chi) := \\sum_{n \\ge 1} \\chi(n) n^{-s}$，在 $\\operatorname{Re}s > 1$ 收敛，' +
          '并且与 $\\zeta$ 一样有 Euler 乘积 $\\prod_{p}(1 - \\chi(p)p^{-s})^{-1}$（同一套几何级数论证，只是每项多了 $\\chi(p)$）。',
        '⚠ **本图的空白**：狄利克雷的**定理**（$\\gcd(a,n) = 1$ 时等差数列 $a, a+n, a+2n, \\ldots$ 里有无穷多素数）要用 $L(s,\\chi)$ 在 $s = 1$ 处非零，' +
          '那一步（非主特征标的 $L(1,\\chi) \\ne 0$）在本图**没有节点**；这里只到「特征标 + $L$ 函数的定义」。',
        '⚠ **$\\chi$ 的取值不是任意的**：它是有限阿贝尔群 $(\\mathbb{Z}/n)^{\\times}$ 的特征标，所以取值落在单位根里；' +
          '$\\sum_{a} \\chi(a)$ 在 $\\chi$ 非主时等于 $0$（正交关系）。这条正交性才是「筛出等差数列」的技术核心。',
      ].join('\n\n'),
      refs: ['Apostol, Introduction to Analytic Number Theory, Ch. 6–7'],
    },
  ],

  edges: [
    /* ζ 的成立靠级数与复分析 */
    { id: 'dep.zeta-series', kind: 'definition', definition: 'def.series', usedBy: 'def.riemann-zeta',
      note: '$\\zeta$ 的**定义**就是一条级数；收敛性用的是级数收敛的一般判别。' },
    { id: 'dep.zeta-absconv', kind: 'definition', definition: 'def.absolute-convergence', usedBy: 'def.riemann-zeta',
      note: '$\\operatorname{Re}s > 1$ 时 $\\sum n^{-s}$ **绝对收敛** —— 这是「可以重排、可以逐项求导」的依据。' },
    { id: 'dep.zeta-holo', kind: 'definition', definition: 'def.holomorphic', usedBy: 'def.riemann-zeta',
      note: '结论「$\\zeta$ 在该半平面上全纯」用的是全纯的定义（内闭一致收敛 $\\implies$ 全纯）。' },
    { id: 'dep.zeta-continuation', kind: 'definition', definition: 'def.analytic-continuation', usedBy: 'def.riemann-zeta',
      note: '注里说的「延拓到 $\\mathbb{C}$、唯一极点在 $s = 1$」正是**解析延拓**这一概念的应用。' },

    /* Euler 乘积：数论 $\\leftrightarrow$ 分析 */
    { id: 'dep.euler-zeta', kind: 'definition', definition: 'def.riemann-zeta', usedBy: 'thm.euler-product',
      note: '命题讲的就是 $\\zeta$ 的乘积表示，输入是 $\\zeta$ 的定义。' },
    { id: 'dep.euler-prime', kind: 'definition', definition: 'def.prime', usedBy: 'thm.euler-product',
      note: '乘积遍历的是**素数**；「每个 $n$ 只有一种素数分解」是展式里每项系数为 $1$ 的唯一原因。' },
    { id: 'dep.euler-gcd', kind: 'definition', definition: 'def.gcd', usedBy: 'def.dirichlet-character',
      note: '特征标的延拓用「$\\gcd(a,n) = 1$」来分情况 —— 用到最大公因数的定义。' },
    { id: 'dep.euler-grouphom', kind: 'definition', definition: 'def.group-hom', usedBy: 'def.dirichlet-character',
      note: '特征标**就是**一个群同态 $(\\mathbb{Z}/n)^{\\times} \\to \\mathbb{C}^{\\times}$。' },
    { id: 'dep.euler-congruence', kind: 'definition', definition: 'def.congruence', usedBy: 'def.dirichlet-character',
      note: '「mod $n$ 的类」「$a \\bmod n$」用的都是同余的语言。' },
    { id: 'dep.dirichlet-zeta', kind: 'definition', definition: 'def.riemann-zeta', usedBy: 'def.dirichlet-character',
      note: '注里「主特征标的 $L$ 函数就是 $\\zeta$ 去掉整除 $n$ 的素数因子」直接用到 $\\zeta$ 的 Euler 乘积。' },

    /* 与素数定理的关系：只记类比 */
    { id: 'ana.zeta-pnt', kind: 'analogy', a: 'def.riemann-zeta', b: 'thm.prime-number-theorem',
      title: '$\\zeta$ 的零点 $\\leftrightarrow$ 素数定理：同一件事的两种说法',
      note: '两条说的是同一件事的两侧：\n' +
        '- `thm.prime-number-theorem` 说 $\\pi(x) \\sim x/\\log x$（**素数怎么分布**）；\n' +
        '- $\\zeta$ 的解析性质（在 $s = 1$ 处的极点、在 $\\operatorname{Re}s = 1$ 上不为零）**给出**这条渐近（**函数怎么长**）。\n\n' +
        '⚠ 这只是类比/指向，**不是依赖**：本图没有把「$\\zeta$ 在 $\\operatorname{Re}s = 1$ 上非零」这条定理单独立节点，' +
        '所以从 $\\zeta$ 推不出素数定理；反方向也不是。要真接上，得先补 Perron 公式与 Wiener–Ikehara 那一套。',
    },
  ],
});
