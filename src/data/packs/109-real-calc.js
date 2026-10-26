/* ==========================================================================
   内容包 · 实数的运算与不等式
   --------------------------------------------------------------------------
   新星团 `analysis.real-calc`（13 点，含从 set.numbers 迁来的 3 点）。
   它造的是**在有序域上做代数与放缩的一整套许可证**：

     环/域的等式（0·a=0、(-a)(-b)=ab、消去律）
       → 序与四则运算（严格保序、乘负数反序、倒数反序、中点）
       → 绝对值（|xy|、|x|²、|x|≤c 的三段式）
       → 阿基米德的 ε 形式 + 取整
       → 整数幂 → 指数律 → n 次方根 → 有理/实数指数
       → 二项式 → Bernoulli

   ⭐ 这十来个节点是初等微积分里每条 ε 估计背后的「许可证」：
     `thm.evt` 取 M−1/n、`thm.uniform-continuity-compact` 取 1/n、
     `thm.root-test` 用 √[n]{a_n}、`lem.young-inequality` 用 a^λ —— 全在这里。
   ⚠ 迁移说明：def.abs / thm.triangle / lem.archimedean 三个节点原属
     `set.numbers`（数系的构造），现在归到这里；`set.numbers` 只留「造数」。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '实数的运算与不等式',
  nodes: [

    /* ------------------------------------------------------ 域与序的推论 */
    {
      id: 'prop.field-rules',
      cluster: 'analysis.real-calc',
      type: 'proposition',
      label: '环与域的基本等式',
      title: '命题：环与域里的基本等式（Consequences of the Ring Axioms）',
      regions: ['analysis', 'algebra'],
      tags: ['命题', '代数', '运算'],
      refs: ['Lang, Algebra, Ch. I', 'Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1'],
      statement: [
        '设 $A$ 是环，$a, b \\in A$。则',
        '',
        '**(i)** $0 \\cdot a = a \\cdot 0 = 0$；',
        '',
        '**(ii)** $(-a)b = -(ab) = a(-b)$，且 $(-a)(-b) = ab$；',
        '',
        '**(iii)** 若 $A$ 含幺元 $1$，则 $(-1)a = -a$；',
        '',
        '**(iv)** 若 $A$ 是整环（含幺交换、无零因子），则',
        '',
        '$$ab = 0 \\implies a = 0 \\text{ 或 } b = 0, \\qquad a \\ne 0,\\ ab = ac \\implies b = c.$$'
      ].join('\n'),
      notes: '⭐ 这些等式在 $\\mathbb{R}$、$\\mathbb{Q}$ 上就是**移项、通分、约分**的许可证 —— 极限四则运算、行列式展开、多项式除法里每一处「两边同乘」「约掉」都是在用它，但平时没人把它们单独写下来。\n\n⚠ **无零因子不是环公理**：$\\mathbb{Z}/6\\mathbb{Z}$ 里 $2 \\cdot 3 = 0$，$\\mathbb{Z}/4\\mathbb{Z}$ 里 $2 \\cdot 2 = 0$。所以「$ab = 0 \\implies a=0$ 或 $b=0$」在整环里才成立，在一般环里不能默认。\n\n⭐ 证明只用两样东西：**分配律**与**加法群的消去**（即两边加同一个元素）。这就是「环公理很少，但能推出来的很多」。'
    },
    {
      id: 'prop.order-rules',
      cluster: 'analysis.real-calc',
      type: 'proposition',
      label: '序与四则运算',
      title: '命题：不等式的基本运算（Order and the Field Operations）',
      regions: ['analysis', 'algebra'],
      tags: ['命题', '序', '不等式'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1'],
      statement: [
        '设 $K$ 是有序域，$a, b, c, d \\in K$。则',
        '',
        '**(i)** $a < b \\iff a + c < b + c$；',
        '',
        '**(ii)** $a < b$ 且 $c < d$ $\\implies$ $a + c < b + d$；',
        '',
        '**(iii)** $c > 0$ 时 $a < b \\implies ac < bc$；$c < 0$ 时 $a < b \\implies ac > bc$；',
        '',
        '**(iv)** $0 < a < b \\implies 0 < \\dfrac{1}{b} < \\dfrac{1}{a}$；',
        '',
        '**(v)** $0 < 1$；且 $a \\ne 0 \\implies a^{2} > 0$；',
        '',
        '**(vi)** $a < b \\implies a < \\dfrac{a + b}{2} < b$。'
      ].join('\n'),
      notes: '⭐ 这是一切**不等式放缩**的规则表。第 (iii) 条最容易出错：乘负数要**反向**，所以做 $\\varepsilon$ 估计时永远要先看清乘的那个量是不是正的。\n\n⭐ 第 (iv) 条（倒数反序）在「$|g(x)| > |B|/2 \\implies 1/|g(x)| < 2/|B|$」这种地方天天用 —— 极限的倒数法则就是靠它把 $1/|g|$ 放大。\n\n⚠ 整套东西只依赖定义里的**两条相容性**：加法保序、乘正数保序。其余全是推论。'
    },
    {
      id: 'prop.abs-properties',
      cluster: 'analysis.real-calc',
      type: 'proposition',
      label: '绝对值的运算性质',
      title: '命题：绝对值的运算性质（Properties of the Absolute Value）',
      regions: ['analysis'],
      tags: ['命题', '绝对值', '不等式'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1'],
      statement: [
        '设 $K$ 是有序域，$x, y \\in K$，$c \\ge 0$。则',
        '',
        '**(i)** $|x| \\ge 0$，$|x| = 0 \\iff x = 0$，$|-x| = |x|$，$-|x| \\le x \\le |x|$；',
        '',
        '**(ii)** $|xy| = |x|\\,|y|$，且 $y \\ne 0 \\implies \\left|\\dfrac{x}{y}\\right| = \\dfrac{|x|}{|y|}$；',
        '',
        '**(iii)** $|x|^{2} = x^{2}$；',
        '',
        '**(iv)** $|x| \\le c \\iff -c \\le x \\le c$；$|x| < c \\iff -c < x < c$；',
        '',
        '**(v)** $|x| > c \\iff x > c \\text{ 或 } x < -c$。'
      ].join('\n'),
      notes: '⭐ **三角不等式是另一条**（见「三角不等式」），这里只收「乘、商、平方、三段式」这些**等式型**的规则。两者合起来才是完整的绝对值工具箱。\n\n⭐ (iv) 是 $\\varepsilon$ 论证里最常用的一句：把「$|f(x) - L| < \\varepsilon$」改写成「$L - \\varepsilon < f(x) < L + \\varepsilon$」，才能与序公理对接。(v) 是它的补集形态。\n\n⚠ $|x|^{2} = x^{2}$ 看着废话，但它把绝对值**去掉了**：需要平方的时候不必再分情形 —— 这也是为什么 $\\ell^{2}$、$L^{2}$ 里的范数可以写成内积。\n\n📌 全部由定义 $|x| = \\max\\{x, -x\\}$ 分 $x \\ge 0$、$x < 0$ 两种情形验证。'
    },
    {
      id: 'cor.archimedean-epsilon',
      cluster: 'analysis.real-calc',
      type: 'corollary',
      label: '阿基米德的 ε 形式与取整',
      title: '推论：$1/n < \\varepsilon$ 与取整函数（Archimedean Corollaries）',
      regions: ['analysis'],
      tags: ['推论', '阿基米德', '取整'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1'],
      statement: [
        '设 $K$ 是完备有序域（如 $\\mathbb{R}$）。',
        '',
        '**(i)** 对每个 $\\varepsilon > 0$ 存在 $n \\ge 1$ 使',
        '',
        '$$\\frac{1}{n} < \\varepsilon; \\qquad \\text{等价地} \\qquad \\inf\\left\\{ \\frac{1}{n} : n \\ge 1 \\right\\} = 0.$$',
        '',
        '**(ii)** 对每个 $x \\in K$ 存在**唯一**的整数 $n$ 使',
        '',
        '$$n \\le x < n + 1.$$',
        '',
        '记 $n = \\lfloor x \\rfloor$，叫 $x$ 的**整数部分**（取整函数）；$\\{x\\} := x - \\lfloor x \\rfloor \\in [0, 1)$ 叫**小数部分**。'
      ].join('\n'),
      notes: '⭐ (i) 是分析里「取 $n$ 足够大」的**标准形态**。阿基米德性质原来说的是「$\\mathbb{N}$ 无上界」，但实际写证明时用的几乎总是 (i)：给 $\\varepsilon$，取 $n > 1/\\varepsilon$。\n\n⭐ (ii) 是把实数「夹到两个相邻整数之间」—— 有理数稠密的证明（`lem.archimedean` 的 (ii)）里就用了它。它依赖 $\\mathbb{Z}$ 在 $K$ 中的**离散性**（相邻整数之间没有别的整数），而不只是无界性。\n\n⚠ $\\mathbb{Q}$ 也满足 (i)（它是阿基米德的），但 $\\mathbb{Q}$ 不满足确界原理 —— 所以 (i) 本身**不**需要完备性，只需要阿基米德性；这里写成完备有序域只是为了和 `lem.archimedean` 对齐。'
    },

    /* ---------------------------------------------------------- 幂与根 */
    {
      id: 'def.power',
      cluster: 'analysis.real-calc',
      type: 'definition',
      label: '整数幂',
      title: '整数幂 $a^{n}$（Integer Powers）',
      regions: ['analysis'],
      tags: ['定义', '幂', '运算'],
      refs: ['Lang, Algebra, Ch. I'],
      statement: [
        '设 $A$ 是含幺环（如 $\\mathbb{Z}$、$\\mathbb{R}$），$a \\in A$。**整数幂**由递推定义：',
        '',
        '$$a^{0} := 1, \\qquad a^{n+1} := a^{n} \\cdot a \\quad (n \\in \\mathbb{N});$$',
        '',
        '若 $a$ 可逆（在 $\\mathbb{R}$ 中即 $a \\ne 0$），再对 $n \\ge 1$ 定义',
        '',
        '$$a^{-n} := (a^{-1})^{n} = \\frac{1}{a^{n}}.$$'
      ].join('\n'),
      notes: '⭐ 幂只是「乘法写多少遍」的压缩记号，本身没有新内容 —— 但它把「$n$ 次」变成一个**可以归纳的对象**：`thm.binomial`、`thm.bernoulli`、几何级数、幂级数全都在对 $n$ 归纳。\n\n⚠ 这里只定义**整数**指数。$a^{1/2}$ 要等 `thm.nth-root`（n 次方根），$a^{\\sqrt{2}}$ 要等 `def.real-power` —— 顺序不能倒过来，否则「开方」就成了没有定义的东西。\n\n⚠ $0^{0}$ 本图**不定义**（组合计数里约定 $0^{0}=1$，那是另一套约定）。\n\n⚠ 非交换环里 $a^{n+1} = a^{n}a$ 与 $a \\cdot a^{n}$ 可能不同；本图只在交换情形使用。'
    },
    {
      id: 'prop.power-rules',
      cluster: 'analysis.real-calc',
      type: 'proposition',
      label: '指数律与幂的单调性',
      title: '命题：指数律（Laws of Exponents）',
      regions: ['analysis'],
      tags: ['命题', '幂', '运算'],
      refs: ['Lang, Algebra, Ch. I'],
      statement: [
        '设 $A$ 是交换环，$a, b \\in A$，$m, n \\in \\mathbb{Z}$（出现负指数时要求 $a, b$ 可逆）。则',
        '',
        '$$a^{m+n} = a^{m}\\,a^{n}, \\qquad (a^{m})^{n} = a^{mn}, \\qquad (ab)^{n} = a^{n}\\,b^{n}.$$',
        '',
        '若 $K$ 是有序域、$a > 1$，则对 $m, n \\in \\mathbb{Z}$：',
        '',
        '$$m < n \\iff a^{m} < a^{n};$$',
        '',
        '而 $0 < a < 1$ 时不等号反向；$a = 1$ 时 $a^{n} = 1$ 恒成立。'
      ].join('\n'),
      notes: '⭐ 三条指数律都是「对 $n$ 归纳」，没有技巧。真正有用的是**单调性**：$a > 1$ 时 $n \\mapsto a^{n}$ 严格递增，所以 $q^{n} \\to 0$（$0 < q < 1$）可以写成 $q^{n} \\le 1/(1+nh)$ 再夹逼 —— 几何级数收敛的证明就靠这一条。\n\n⚠ 负指数那半边要先把 $a^{-n}$ 写成 $(a^{-1})^{n}$，再用**正指数**的结论；交换性在这里是必需的（$(ab)^{-1} = b^{-1}a^{-1} = a^{-1}b^{-1}$ 只在交换时成立）。'
    },
    {
      id: 'thm.nth-root',
      cluster: 'analysis.real-calc',
      type: 'theorem',
      label: 'n 次方根',
      title: '定理：$n$ 次方根的存在唯一性（Existence of $n$-th Roots）',
      regions: ['analysis'],
      tags: ['定理', '根', '完备性'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1'],
      statement: [
        '设 $K$ 是完备有序域（如 $\\mathbb{R}$），$a > 0$，$n \\ge 1$。则存在**唯一**的 $b > 0$ 使',
        '',
        '$$b^{n} = a;$$',
        '',
        '记 $b = \\sqrt[n]{a} = a^{1/n}$。并且：',
        '',
        '- $a \\mapsto \\sqrt[n]{a}$ 在 $(0, +\\infty)$ 上严格递增；',
        '- $\\sqrt[n]{ab} = \\sqrt[n]{a}\\,\\sqrt[n]{b}$，$\\sqrt[n]{a^{m}} = \\left(\\sqrt[n]{a}\\right)^{m}$（$m \\in \\mathbb{Z}$）。'
      ].join('\n'),
      notes: '⭐ $n = 2$、$a = 2$ 就是 **$\\sqrt{2}$ 的存在性**：$\\{q \\in \\mathbb{Q} : q^{2} < 2\\}$ 在 $\\mathbb{Q}$ 里没有上确界，在 $\\mathbb{R}$ 里有 —— 那个上确界就是 $\\sqrt{2}$。所以这条定理是「$\\mathbb{R}$ 比 $\\mathbb{Q}$ 多出来的东西」第一次被具体造出来。\n\n⭐ 证明是**确界原理的模板**：令 $S = \\{t \\ge 0 : t^{n} \\le a\\}$，取 $b = \\sup S$，再证 $b^{n} = a$（两边都不能不等：小了可以往上抬一点，大了可以往下压一点）。\n\n⚠ 两处估计的方向相反：往上抬用**二项式**（$ (b+h)^{n} $ 展开后只需保留一阶项），往下压用 **Bernoulli**（$(1 - h/b)^{n} \\ge 1 - nh/b$）。这就是 `thm.binomial` 与 `thm.bernoulli` 在图上第一次真正被用到。\n\n⚠ 唯一性靠**严格单调**：$0 \\le u < v \\implies u^{n} < v^{n}$（因式分解 $v^{n} - u^{n} = (v-u)(v^{n-1} + \\cdots + u^{n-1}) > 0$）。'
    },
    {
      id: 'def.real-power',
      cluster: 'analysis.real-calc',
      type: 'definition',
      label: '有理指数与实数指数幂',
      title: '有理指数与实数指数幂（Rational and Real Powers）',
      regions: ['analysis'],
      tags: ['定义', '幂', '指数'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1'],
      statement: [
        '设 $a > 0$。',
        '',
        '**(i) 有理指数。** 对 $r = m/n$（$m \\in \\mathbb{Z}$，$n \\ge 1$）定义',
        '',
        '$$a^{r} := \\sqrt[n]{a^{m}}.$$',
        '',
        '这与 $m/n$ 的表示无关：若 $m/n = m\'/n\'$，则 $mn\' = m\'n$，于是 $(a^{m})^{n\'} = (a^{m\'})^{n}$，由 n 次方根的唯一性两者相等。',
        '',
        '**(ii) 实数指数。** 对 $x \\in \\mathbb{R}$：当 $a > 1$ 时',
        '',
        '$$a^{x} := \\sup\\{\\, a^{q} : q \\in \\mathbb{Q},\\ q < x \\,\\};$$',
        '',
        '当 $0 < a < 1$ 时 $a^{x} := 1/(1/a)^{x}$；$a = 1$ 时 $a^{x} := 1$。'
      ].join('\n'),
      notes: '⭐ 思路一句话：**用有理指数从下面逼近**。有理指数靠 n 次方根定义，实数指数靠确界定义 —— 一层一层往上搭，每一步都不引入新的神秘对象。\n\n⭐ 良定义要检查两件事：集合 $\\{a^{q} : q < x\\}$ **非空**（取 $q < x$，有理数稠密）且**有上界**（$a > 1$ 时取 $q < x+1$，则 $a^{q} < a^{x+1}$）；上确界于是存在。\n\n⭐ 与 `exp` / `log` 是同一件事：$a^{x} = \\exp(x \\log a)$。但那条路要先有幂级数，这里只用确界 —— 所以 `lem.young-inequality` 里的 $a^{\\lambda}b^{1-\\lambda}$（$\\lambda$ 是实数）在这条定义下是有意义的。\n\n⚠ 有理指数的指数律（$a^{r+s} = a^{r}a^{s}$ 等）要对表示做消去，繁琐但不难；实数指数的指数律要用「上确界与加法相容」，是 `prop.order-rules` 与确界性质的练习。'
    },

    /* -------------------------------------------------------- 常用不等式 */
    {
      id: 'thm.binomial',
      cluster: 'analysis.real-calc',
      type: 'theorem',
      label: '二项式定理',
      title: '定理：二项式定理（Binomial Theorem）',
      regions: ['analysis'],
      tags: ['定理', '组合', '代数'],
      refs: ['Lang, Algebra, Ch. I'],
      statement: [
        '设 $A$ 是交换环，$a, b \\in A$，$n \\in \\mathbb{N}$。则',
        '',
        '$$(a + b)^{n} = \\sum_{k=0}^{n} \\binom{n}{k} a^{k}\\, b^{n-k}, \\qquad \\binom{n}{k} := \\frac{n!}{k!\\,(n-k)!}.$$',
        '',
        '系数满足 **Pascal 递推**',
        '',
        '$$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k},$$',
        '',
        '从而是自然数（$\\binom{n}{k}$ 就是「从 $n$ 个里挑 $k$ 个」的个数）。'
      ].join('\n'),
      notes: '⭐ 这条定理在图上被两处用到：`def.exp-function` 的函数方程 $\\exp(z+w) = \\exp z\\,\\exp w$（把 $(z+w)^{n}$ 展开再重排），以及 `thm.nth-root` 里放大 $(b+h)^{n}$。\n\n⭐ 证明只对 $n$ 归纳：把 $(a+b)^{n+1} = (a+b)^{n}(a+b)$ 展开，用 Pascal 把两组系数并起来。\n\n⚠ 非交换环里不成立（$ab \\ne ba$），所以条件写的是交换环。'
    },
    {
      id: 'thm.bernoulli',
      cluster: 'analysis.real-calc',
      type: 'theorem',
      label: 'Bernoulli 不等式',
      title: '定理：Bernoulli 不等式（Bernoulli\'s Inequality）',
      regions: ['analysis'],
      tags: ['定理', '不等式', '归纳'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1'],
      statement: [
        '设 $x \\ge -1$，$n \\in \\mathbb{N}$。则',
        '',
        '$$(1 + x)^{n} \\ge 1 + n x.$$',
        '',
        '若 $x \\ne 0$ 且 $n \\ge 2$，则不等号**严格**。'
      ].join('\n'),
      notes: '⭐ 这是把「反复乘同一个 $1+x$」压成**线性**的最小估计，$x$ 可以任意小。分析里用它把 $(1+h)^{n}$ 从上面撑住、把 $(1-h)^{n}$ 从下面兜住 —— `thm.nth-root` 的第二个方向就是它。\n\n⚠ 条件 $x \\ge -1$ 是为了让 $1+x \\ge 0$：归纳步要把不等式两边同乘 $1+x$，只有它非负才不反向。$x < -1$ 时命题可以失效或失去归纳基础。'
    }
  ],

  edges: [

    /* ---------------------------------------------------- 域与序的证明 */
    {
      id: 'imp.field-rules',
      kind: 'implication',
      sources: ['def.ring'],
      target: 'prop.field-rules',
      title: '环公理 $\\implies$ 基本等式',
      proof: [
        '**(i)** $0 \\cdot a = (0 + 0)\\cdot a = 0 \\cdot a + 0 \\cdot a$。两边加上 $-(0 \\cdot a)$ 得 $0 = 0 \\cdot a$；$a \\cdot 0 = 0$ 同理。',
        '',
        '**(ii)** $(-a)b + ab = ((-a) + a)b = 0 \\cdot b = 0$，故 $(-a)b = -(ab)$（加法逆元唯一）。同理 $a(-b) = -(ab)$。再用一次：',
        '',
        '$$(-a)(-b) = -\\bigl(a(-b)\\bigr) = -\\bigl(-(ab)\\bigr) = ab.$$',
        '',
        '**(iii)** $(-1)a = -(1 \\cdot a) = -a$（用 (ii) 与幺元）。',
        '',
        '**(iv)** 若 $ab = ac$，则 $a(b - c) = ab - ac = 0$。若 $a \\ne 0$ 且 $A$ 无零因子，则 $b - c = 0$，即 $b = c$。$ab = 0$ 的断言就是无零因子的定义。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.order-rules',
      kind: 'implication',
      sources: ['def.ordered-field'],
      target: 'prop.order-rules',
      title: '有序域公理 $\\implies$ 不等式运算',
      proof: [
        '**(i)** 由相容性 $a < b \\implies a + c < b + c$。反向：若 $a + c < b + c$，把 $c$ 换成 $-c$ 得 $a < b$。',
        '',
        '**(ii)** $a < b \\implies a + c < b + c$；$c < d \\implies b + c < b + d$；传递得 $a + c < b + d$。',
        '',
        '**(iii)** $a < b$ 即 $b - a > 0$。若 $c > 0$，由乘正数保序得 $(b - a)c > 0$，即 $bc > ac$。若 $c < 0$，则 $-c > 0$，$(b-a)(-c) > 0$，即 $ac - bc > 0$，故 $ac > bc$。',
        '',
        '**(iv)** 先证 $a > 0 \\implies 1/a > 0$：若 $1/a < 0$，两边乘 $a > 0$ 得 $1 < 0$，与 (v)（下面证）矛盾。于是 $a, b, ab$ 都为正，$\\dfrac{1}{a} - \\dfrac{1}{b} = \\dfrac{b - a}{ab} > 0$（分子分母都正）。',
        '',
        '**(v)** $1 = 1^{2}$；若 $1 = 0$ 则环平凡（排除），故由下面的平方非负得 $1 > 0$。平方非负：$a > 0 \\implies a^{2} = a \\cdot a > 0$（乘正数保序，$a > 0$）；$a < 0 \\implies -a > 0 \\implies a^{2} = (-a)^{2} > 0$。',
        '',
        '**(vi)** $a < b \\implies 2a < a + b < 2b$（(ii)），两边除以 $2 > 0$ 得 $a < \\dfrac{a+b}{2} < b$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.abs-properties',
      kind: 'implication',
      sources: ['def.abs'],
      target: 'prop.abs-properties',
      title: '绝对值的定义 $\\implies$ 运算性质',
      proof: [
        '以下都按 $x \\ge 0$ 与 $x < 0$ 分情形，用 $|x| = \\max\\{x, -x\\}$。',
        '',
        '**(i)** 两种情形下 $|x|$ 分别是 $x$ 或 $-x$，都 $\\ge 0$；$|x| = 0$ 迫使 $x = 0$。$|-x|$：若 $x \\ge 0$ 则 $-x \\le 0$，$|-x| = -(-x) = x = |x|$；另一情形对称。$-|x| \\le x \\le |x|$ 由 $x \\le \\max\\{x,-x\\}$ 与 $-x \\le \\max\\{x,-x\\}$ 直接读出。',
        '',
        '**(ii)** 四种符号组合分别验证：$x, y \\ge 0$ 时 $xy \\ge 0$，$|xy| = xy = |x||y|$；$x \\ge 0 > y$ 时 $xy \\le 0$，$|xy| = -xy = x \\cdot (-y) = |x||y|$；其余两种对称。商由 $|x| = |y| \\cdot |x/y|$ 与 $|y| > 0$ 两边除以 $|y|$ 得到。',
        '',
        '**(iii)** 两种情形都有 $|x|^{2} = x^{2}$（$(-x)^{2} = x^{2}$）。',
        '',
        '**(iv)** 若 $|x| \\le c$，由 (i) 的 $-|x| \\le x \\le |x|$ 得 $-c \\le x \\le c$。反之若 $-c \\le x \\le c$：$x \\ge 0$ 时 $|x| = x \\le c$；$x < 0$ 时 $|x| = -x \\le c$。严格版同理。',
        '',
        '**(v)** $|x| > c$ 即「并非 $|x| \\le c$」，由 (iv) 的等价取反得 $x > c$ 或 $x < -c$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.archimedean-epsilon',
      kind: 'implication',
      sources: ['lem.archimedean'],
      target: 'cor.archimedean-epsilon',
      title: '阿基米德性质 $\\implies$ $1/n < \\varepsilon$ 与取整',
      proof: [
        '**(i)** 给定 $\\varepsilon > 0$。由阿基米德性质（用于 $x = 1/\\varepsilon$）存在 $n \\in \\mathbb{N}$ 使 $n > 1/\\varepsilon$。这样的 $n \\ge 1$；两边除以 $n\\varepsilon > 0$ 得 $1/n < \\varepsilon$。',
        '',
        '**(ii) 存在性。** 由阿基米德性质取 $N \\in \\mathbb{N}$ 使 $N > |x|$，则 $-N < x < N$。令',
        '',
        '$$S := \\{ m \\in \\mathbb{Z} : m \\le x \\}.$$',
        '',
        '$S$ 非空（$-N \\in S$）且有上界 $x$。$\\mathbb{Z}$ 的每个非空有上界子集有最大元（$\\mathbb{N}$ 的良序性向上搬一层），取 $n := \\max S$。则 $n \\le x$；又 $n + 1 \\notin S$，即 $n + 1 > x$。',
        '',
        '**唯一性。** 若 $n \\le x < n+1$ 且 $m \\le x < m+1$，设 $n < m$。则 $m \\ge n+1 > x$，与 $m \\le x$ 矛盾；$m < n$ 对称。故 $n = m$。$\\blacksquare$'
      ].join('\n')
    },

    /* ------------------------------------------------------ 幂与根的证明 */
    {
      id: 'imp.power-rules',
      kind: 'implication',
      sources: ['def.power', 'thm.nat-arith-laws'],
      target: 'prop.power-rules',
      title: '幂的定义 $\\implies$ 指数律',
      proof: [
        '**正指数。** 固定 $m \\ge 0$，对 $n$ 归纳证 $a^{m+n} = a^{m}a^{n}$：$n = 0$ 时两边都是 $a^{m}$；$n \\to n+1$ 时 $a^{m+n+1} = a^{m+n}a = a^{m}a^{n}a = a^{m}a^{n+1}$。',
        '',
        '$(a^{m})^{n} = a^{mn}$：对 $n$ 归纳，用上一条。$(ab)^{n} = a^{n}b^{n}$：对 $n$ 归纳，用交换性。',
        '',
        '**负指数。** $a^{-n} = (a^{-1})^{n}$，把上面三条用于 $a^{-1}, b^{-1}$ 即可。',
        '',
        '**单调性。** $a > 1$ 时 $a^{n+1} - a^{n} = a^{n}(a - 1) > 0$（$a^{n} > 0$ 由 $a > 0$ 归纳），故 $n \\mapsto a^{n}$ 严格递增；$m < n \\iff a^{m} < a^{n}$ 随之成立。$0 < a < 1$ 时 $1/a > 1$，把结论用于 $1/a$ 并取倒数（正数取倒数反序）。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.nth-root',
      kind: 'implication',
      sources: ['thm.real-ordered-field', 'def.power', 'thm.binomial', 'thm.bernoulli'],
      target: 'thm.nth-root',
      title: '确界原理 + 二项式 $\\implies$ n 次方根存在',
      proof: [
        '令 $S := \\{ t \\in K : t \\ge 0,\\ t^{n} \\le a \\}$。$0 \\in S$；且 $t > \\max\\{1, a\\}$ 时 $t^{n} \\ge t > a$，故 $\\max\\{1,a\\}$ 是上界。由确界原理，$b := \\sup S$ 存在。又 $t_{0} := \\min\\{a,1\\}/2$ 满足 $t_{0} > 0$、$t_{0}^{n} \\le t_{0} < a$，故 $t_{0} \\in S$，从而 $b \\ge t_{0} > 0$。',
        '',
        '**断言 $b^{n} = a$。** 反设 $b^{n} \\ne a$。',
        '',
        '若 $b^{n} < a$：取 $0 < h < 1$ 且 $h(b+1)^{n} < a - b^{n}$。由二项式定理，',
        '',
        '$$(b+h)^{n} = \\sum_{k=0}^{n} \\binom{n}{k} b^{n-k} h^{k} \\le b^{n} + h \\sum_{k=1}^{n} \\binom{n}{k} b^{n-k} \\le b^{n} + h(b+1)^{n} < a,$$',
        '',
        '故 $b + h \\in S$，与 $b = \\sup S$ 矛盾。',
        '',
        '若 $b^{n} > a$：取 $0 < h < b$ 且 $n h b^{n-1} < b^{n} - a$。由 Bernoulli（$x = -h/b \\ge -1$），',
        '',
        '$$(b-h)^{n} = b^{n}\\left(1 - \\frac{h}{b}\\right)^{n} \\ge b^{n}\\left(1 - \\frac{nh}{b}\\right) = b^{n} - n h b^{n-1} > a.$$',
        '',
        '于是任何 $t \\in S$ 都满足 $t^{n} \\le a < (b-h)^{n}$，故 $t < b - h$（$t \\ge 0$，正数上 $t \\mapsto t^{n}$ 严格增）。即 $b - h$ 是 $S$ 的上界，与 $b$ 最小矛盾。',
        '',
        '**唯一性与单调性。** $0 \\le u < v$ 时',
        '',
        '$$v^{n} - u^{n} = (v - u)\\,(v^{n-1} + v^{n-2}u + \\cdots + u^{n-1}) > 0,$$',
        '',
        '故 $t \\mapsto t^{n}$ 在 $[0, +\\infty)$ 上严格递增；$b^{n} = c^{n}$ 且 $b, c > 0$ 迫使 $b = c$。于是 $\\sqrt[n]{a}$ 是唯一确定的，且 $a < a\' \\implies \\sqrt[n]{a} < \\sqrt[n]{a\'}$。',
        '',
        '**乘法。** $(\\sqrt[n]{a}\\,\\sqrt[n]{b})^{n} = ab$，两边都是正数，由唯一性得 $\\sqrt[n]{ab} = \\sqrt[n]{a}\\,\\sqrt[n]{b}$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.real-power',
      kind: 'implication',
      sources: ['thm.nth-root', 'lem.archimedean'],
      target: 'def.real-power',
      title: 'n 次方根 $\\implies$ 有理指数良定义；确界 $\\implies$ 实数指数',
      proof: [
        '**有理指数良定义。** 设 $m/n = m\'/n\'$（$n, n\' \\ge 1$），则 $mn\' = m\'n$。取 $n n\'$ 次方根：',
        '',
        '$$(a^{m})^{n\'} = a^{mn\'} = a^{m\'n} = (a^{m\'})^{n}.$$',
        '',
        '由 `thm.nth-root` 的唯一性（两边都为正），$\\sqrt[nn\']{(a^{m})^{n\'}} = \\sqrt[nn\']{(a^{m\'})^{n}}$，即 $\\sqrt[n]{a^{m}} = \\sqrt[n\']{a^{m\'}}$。所以 $a^{r}$ 只依赖 $r$。',
        '',
        '**实数指数。** 设 $a > 1$、$x \\in \\mathbb{R}$。集合 $T := \\{a^{q} : q \\in \\mathbb{Q},\\ q < x\\}$ 非空（有理数稠密取 $q < x$）且有上界：取有理 $q_{1}$ 使 $x < q_{1}$，由 $a > 1$ 时 $a^{q}$ 关于 $q$ 递增（`prop.power-rules` 的有理版本）知 $a^{q} < a^{q_{1}}$ 对一切 $q < x$ 成立。故 $a^{x} := \\sup T$ 存在。$0 < a < 1$ 与 $a = 1$ 的情形按定义化归。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.binomial',
      kind: 'implication',
      sources: ['def.power', 'thm.induction'],
      target: 'thm.binomial',
      title: '归纳 $\\implies$ 二项式定理',
      proof: [
        '$n = 0$ 时两边都是 $1$。设对 $n$ 成立，则',
        '',
        '$$(a+b)^{n+1} = \\left(\\sum_{k=0}^{n} \\binom{n}{k} a^{k}b^{n-k}\\right)(a+b) = \\sum_{k=0}^{n} \\binom{n}{k} a^{k+1}b^{n-k} + \\sum_{k=0}^{n} \\binom{n}{k} a^{k}b^{n-k+1}.$$',
        '',
        '第一个和里令 $j = k+1$，得 $\\sum_{j=1}^{n+1} \\binom{n}{j-1} a^{j}b^{n+1-j}$；第二个和是 $\\sum_{j=0}^{n} \\binom{n}{j} a^{j}b^{n+1-j}$。两者相加，$1 \\le j \\le n$ 的系数是 $\\binom{n}{j-1} + \\binom{n}{j} = \\binom{n+1}{j}$（Pascal），端点系数为 $1$。这正是 $(a+b)^{n+1}$ 的展开。',
        '',
        'Pascal 递推本身由 $\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$ 直接算得；$\\binom{n}{k} \\in \\mathbb{N}$ 由递推与归纳（或在 $\\mathbb{N}$ 上直接做组合计数）得到。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.bernoulli',
      kind: 'implication',
      sources: ['thm.induction'],
      target: 'thm.bernoulli',
      title: '归纳 $\\implies$ Bernoulli 不等式',
      proof: [
        '$n = 0$：$1 \\ge 1$。$n = 1$：两边都是 $1 + x$。设对 $n$ 成立。因 $x \\ge -1$，有 $1 + x \\ge 0$，两边同乘不反向：',
        '',
        '$$(1+x)^{n+1} = (1+x)^{n}(1+x) \\ge (1 + nx)(1+x) = 1 + (n+1)x + n x^{2} \\ge 1 + (n+1)x.$$',
        '',
        '严格性：若 $x \\ne 0$ 且 $n \\ge 2$，则上式最后一步的 $n x^{2} > 0$；归纳中至少用一次严格不等号。$\\blacksquare$'
      ].join('\n')
    }
  ]
});
