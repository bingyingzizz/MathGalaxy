/* ==========================================================================
   内容包 · 数论：二次剩余与原根（第三批 11 点）
   --------------------------------------------------------------------------
   二次剩余 → Legendre 符号 → Euler 判别法 → Gauss 引理 → 二次互反律
   → Jacobi 符号与计算法则 → 模 n 的阶 → 原根（模素数存在）→ 离散对数。
   ⭐ 人名原文字母：Legendre / Gauss / Jacobi / Euler（拉子），不音译。
   ⚠ thm.quadratic-reciprocity 与 thm.prime-number-theorem 一样只给陈述与路线。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '数论：二次剩余与原根',
  nodes: [

    {
      id: 'def.quadratic-residue',
      cluster: 'number.quadratic',
      type: 'definition',
      label: '二次剩余',
      title: '二次剩余与二次非剩余',
      regions: ['number'],
      tags: ['数论', '二次剩余'],
      statement: [
        '设 $p$ 是奇素数，$p \\nmid a$。若同余方程',
        '',
        '$$x^{2} \\equiv a \\pmod p$$',
        '',
        '有解，称 $a$ 是模 $p$ 的**二次剩余**；否则称**二次非剩余**。',
      ].join('\n'),
      notes: [
        '$p$ 是奇素数时，$1, \\cdots, p-1$ 里恰有 $(p-1)/2$ 个二次剩余：映射 $x \\mapsto x^{2}$ 在 $\\mathbb{F}_{p}^{\\times}$ 上是 $2$ 对 $1$（$x$ 与 $-x$ 同像，且 $x^{2} = y^{2}$ $\\implies$ $(x-y)(x+y) = 0$ $\\implies$ $x = \\pm y$），所以像集大小是 $(p-1)/2$。',
        '',
        '模合数时这套干净的结构就没了（$\\mathbb{Z}/n$ 不是域），要换成 Jacobi 符号的技巧 —— 这也是为什么二次互反律只在素数上陈述。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第四章'],
    },

    {
      id: 'def.legendre-symbol',
      cluster: 'number.quadratic',
      type: 'definition',
      label: 'Legendre 符号',
      title: 'Legendre 符号 $\\left(\\frac{a}{p}\\right)$',
      regions: ['number'],
      tags: ['数论', '二次剩余'],
      statement: [
        '设 $p$ 是奇素数，$p \\nmid a$。定义',
        '',
        '$\\left(\\frac{a}{p}\\right)$ 只取值 $\\pm 1$：',
        '',
        '- $a$ **是模 $p$ 的二次剩余**（即 $a \\equiv x^{2} \\pmod p$ 有解 $x \\not\\equiv 0$）时取 $1$；',
        '- $a$ **是二次非剩余**时取 $-1$。',
        '',
        '补充规定 $\\left(\\frac{a}{p}\\right) = 0$ 当 $p \\mid a$。',
      ].join('\n'),
      notes: [
        '它把「有没有解」压成一个取值 $\\pm 1$ 的函数，而乘法性立刻可见：由 $x^{2} \\equiv a$、$y^{2} \\equiv b$ 得 $(xy)^{2} \\equiv ab$，配合「各恰有 $(p-1)/2$ 个剩余」的计数，得',
        '',
        '$$\\left(\\frac{ab}{p}\\right) = \\left(\\frac{a}{p}\\right)\\left(\\frac{b}{p}\\right) .$$',
        '',
        '所以 $\\left(\\frac{\\cdot}{p}\\right) : \\mathbb{F}_{p}^{\\times} \\to \\{\\pm 1\\}$ 是群同态，核就是二次剩余构成的子群 —— Legendre 符号就是商群 $\\mathbb{F}_{p}^{\\times}/(\\mathbb{F}_{p}^{\\times})^{2} \\cong \\{\\pm 1\\}$ 的那张同构表。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第四章'],
    },

    {
      id: 'thm.euler-criterion',
      cluster: 'number.quadratic',
      type: 'theorem',
      label: 'Euler 判别法',
      title: '$\\left(\\frac{a}{p}\\right) \\equiv a^{(p-1)/2}$',
      regions: ['number'],
      tags: ['数论', '二次剩余', '定理'],
      statement: [
        '设 $p$ 是奇素数，$p \\nmid a$。则',
        '',
        '$$\\left(\\frac{a}{p}\\right) \\equiv a^{\\frac{p-1}{2}} \\pmod p .$$',
      ].join('\n'),
      notes: [
        '**为什么**：$\\mathbb{F}_{p}^{\\times}$ 是 $p-1$ 阶循环群。设 $a = g^{k}$（$g$ 是原根）。',
        '',
        '- 若 $k$ 偶，$a = (g^{k/2})^{2}$ 是剩余，且 $a^{(p-1)/2} = g^{k(p-1)/2} = (g^{p-1})^{k/2} = 1$；',
        '- 若 $k$ 奇，$a$ 不是剩余（循环群的平方恰是偶数次幂），且 $a^{(p-1)/2} = g^{(p-1)/2} = -1$（因为它的平方是 $1$ 而不是 $1$ 本身 —— 阶为 $2$ 的元素只能是 $-1$）。',
        '',
        '一般地，$x^{(p-1)/2} \\equiv 1$ 的解恰有 $(p-1)/2$ 个（多项式次数界），正好与二次剩余的个数相等，两边重合即得。',
        '',
        '它把「解方程」变成「算一次幂模」—— 这是实用上判二次剩余的标准手段（也是 Solovay–Strassen 素性检验的基础）。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第四章'],
    },

    {
      id: 'lem.gauss-qr',
      cluster: 'number.quadratic',
      type: 'lemma',
      label: 'Gauss 引理（二次剩余）',
      title: 'Gauss 引理：$\\left(\\frac{a}{p}\\right) = (-1)^{\\mu}$',
      regions: ['number'],
      tags: ['数论', '二次剩余', '引理'],
      statement: [
        '设 $p$ 是奇素数，$p \\nmid a$。考虑 $a, 2a, \\cdots, \\frac{p-1}{2}a$，把它们各自换成模 $p$ 的最小正剩余（落在 $1, \\cdots, p-1$），设其中有 $\\mu$ 个大于 $\\frac{p}{2}$。则',
        '',
        '$$\\left(\\frac{a}{p}\\right) = (-1)^{\\mu} .$$',
      ].join('\n'),
      notes: [
        '**作用**：它把 Legendre 符号降成「数一数有多少个超过了 $p/2$」，从而不必做幂运算就能算出 $\\left(\\frac{2}{p}\\right)$、$\\left(\\frac{-1}{p}\\right)$ 这类具体值。',
        '',
        '**证明要点**：记这些最小正剩余为 $r_{1}, \\cdots, r_{n}$（$n = \\frac{p-1}{2}$）。把它们里大于 $p/2$ 的换成 $p - r_{i}$，得到的 $n$ 个数恰好是 $1, \\cdots, n$ 的一个排列。于是',
        '',
        '$$a^{n} \\cdot n! \\equiv \\pm n! \\pmod p ,$$',
        '',
        '符号由「换了多少个」（即 $\\mu$ 的奇偶）决定。约掉 $n!$（$p \\nmid n!$）再用 Euler 判别法 $a^{n} \\equiv \\left(\\frac{a}{p}\\right)$ 即得。',
        '',
        '⚠ 与微分几何里那条 `lem.gauss-lemma`（Gauss 引理 / 测地极坐标）**同名不同物**，别混。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第四章'],
    },

    {
      id: 'thm.quadratic-reciprocity',
      cluster: 'number.quadratic',
      type: 'theorem',
      label: '二次互反律',
      title: 'Gauss 的二次互反律',
      regions: ['number'],
      tags: ['数论', '二次剩余', '定理'],
      statement: [
        '设 $p, q$ 是两个不同的奇素数。则',
        '',
        '$$\\left(\\frac{p}{q}\\right)\\left(\\frac{q}{p}\\right) = (-1)^{\\frac{p-1}{2}\\cdot\\frac{q-1}{2}} .$$',
        '',
        '等价说法：$p, q$ 中至少有一个 $\\equiv 1 \\pmod 4$ 时 $\\left(\\frac{p}{q}\\right) = \\left(\\frac{q}{p}\\right)$；两个都 $\\equiv 3 \\pmod 4$ 时两者相反。补充公式：',
        '',
        '$$\\left(\\frac{-1}{p}\\right) = (-1)^{\\frac{p-1}{2}}, \\qquad \\left(\\frac{2}{p}\\right) = (-1)^{\\frac{p^{2}-1}{8}} .$$',
      ].join('\n'),
      notes: [
        '**这是数论里最重要的一条定理**（Gauss 一生给了 8 个证明，第一个 1796 年、19 岁）。它把「$p$ 是不是模 $q$ 的剩余」这个难问题换成「$q$ 是不是模 $p$ 的剩余」这个更容易的小问题 —— 因为可以递归把 $p$ 降到 $< q$。',
        '',
        '⭐ 现在的主流证明走**有限域上的曲线计数**：$\\left(\\frac{p}{q}\\right)$ 与 $x^{2} \\equiv p \\pmod q$ 的解数有关，而这批解数可以按 $\\mathbb{F}_{p}$ 上的椭圆曲线/乘法群逐层数出来（Zolotarev 引理 + 置换的符号）。这不是初等计数能绕过去的。',
        '',
        '**用法**：判 $\\left(\\frac{a}{p}\\right)$ 时把它拆成素因子，逐个用互反律「翻过来」，再递归 —— 复杂度 $O(\\log p)$ 级别的除法。上面两条补充公式处理 $-1$ 与 $2$ 这两种「不能翻」的情形。',
        '',
        '⚠ 本节点只给陈述与路线，完整证明不在本图（它依赖二次型的类群或曲线计数，量级上属于另一章）。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第四章'],
    },

    {
      id: 'def.jacobi-symbol',
      cluster: 'number.quadratic',
      type: 'definition',
      label: 'Jacobi 符号',
      title: 'Jacobi 符号：把 Legendre 符号乘起来',
      regions: ['number'],
      tags: ['数论', '二次剩余'],
      statement: [
        '设 $n = q_{1}^{e_{1}}\\cdots q_{r}^{e_{r}}$ 是正奇数（$q_{i}$ 为奇素数），$a \\in \\mathbb{Z}$。定义',
        '',
        '$$\\left(\\frac{a}{n}\\right) := \\prod_{i=1}^{r}\\left(\\frac{a}{q_{i}}\\right)^{e_{i}} .$$',
      ].join('\n'),
      notes: [
        '⚠ **它不再回答「有没有解」**：$\\left(\\frac{a}{n}\\right) = 1$ 不保证 $x^{2} \\equiv a \\pmod n$ 有解。例如 $\\left(\\frac{2}{15}\\right) = \\left(\\frac{2}{3}\\right)\\left(\\frac{2}{5}\\right) = (-1)(-1) = 1$，但 $x^{2} \\equiv 2 \\pmod{15}$ 无解（模 $3$ 与模 $5$ 都要成立，而 $2$ 在模 $3$ 下不是剩余）。',
        '',
        '它的价值在**计算**：Jacobi 符号可以完全用互反律移项，不需要分解 $n$，所以能快速算；而「Jacobi 符号为 $-1$」确实能断定无解（充分条件）。',
        '',
        '这条「便宜但会撒谎」的性质正是 Solovay–Strassen 与 Miller–Rabin 这类概率素性检验的入口：用 Jacobi 符号筛掉大部分合数。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第四章'],
    },

    {
      id: 'thm.jacobi-laws',
      cluster: 'number.quadratic',
      type: 'theorem',
      label: 'Jacobi 符号的计算法则',
      title: 'Jacobi 符号的互反与乘性',
      regions: ['number'],
      tags: ['数论', '二次剩余', '定理'],
      statement: [
        '设 $m, n$ 是正奇数，$a, b \\in \\mathbb{Z}$。则',
        '',
        '$$\\left(\\frac{ab}{n}\\right) = \\left(\\frac{a}{n}\\right)\\left(\\frac{b}{n}\\right), \\qquad \\left(\\frac{a}{mn}\\right) = \\left(\\frac{a}{m}\\right)\\left(\\frac{a}{n}\\right),$$',
        '',
        '$$\\left(\\frac{m}{n}\\right)\\left(\\frac{n}{m}\\right) = (-1)^{\\frac{m-1}{2}\\cdot\\frac{n-1}{2}}, \\qquad \\left(\\frac{-1}{n}\\right) = (-1)^{\\frac{n-1}{2}}, \\qquad \\left(\\frac{2}{n}\\right) = (-1)^{\\frac{n^{2}-1}{8}} .$$',
      ].join('\n'),
      notes: [
        '算法：把 $\\left(\\frac{a}{n}\\right)$ 里的 $a$ 拆成 $2^{k}$ 乘一个奇数，用 $\\left(\\frac{2}{n}\\right)$ 的公式处理 $2$ 的部分；再把剩下的奇数因子用互反律翻过来（符号按 $m \\equiv n \\equiv 3 \\pmod 4$ 判），然后对 $a \\bmod n$ 取余 —— 与辗转相除同构，$O(\\log n)$ 步。',
        '',
        '**为什么不分解 $n$**：互反律允许在 $\\left(\\frac{m}{n}\\right)$ 与 $\\left(\\frac{n}{m}\\right)$ 之间来回换，形状完全对称（除了那个符号）。这条「对称性 + 取余」就是 Jacobi 符号算法的全部。',
        '',
        '与 Legendre 符号的关系：$n$ 素时两者一致；$n$ 合数时 Jacobi 只是「乘积形式」，见 `def.jacobi-symbol` 的警告。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第四章'],
    },

    {
      id: 'def.order-mod-n',
      cluster: 'number.quadratic',
      type: 'definition',
      label: '模 n 的阶',
      title: '模 $n$ 的阶与循环子群',
      regions: ['number'],
      tags: ['数论', '原根'],
      statement: [
        '设 $\\gcd(a, n) = 1$。使',
        '',
        '$$a^{k} \\equiv 1 \\pmod n$$',
        '',
        '成立的最小正整数 $k$ 叫 $a$ 模 $n$ 的**阶**，记 $\\operatorname{ord}_{n}(a)$。',
      ].join('\n'),
      notes: [
        '$\\operatorname{ord}_{n}(a)$ 就是群论里 $[a]$ 在单位群 $(\\mathbb{Z}/n\\mathbb{Z})^{\\times}$ 中的**元素阶** —— 两个概念完全同一个东西，只是坐标不同。',
        '',
        '性质（全部由群论直接搬来）：',
        '',
        '- $\\operatorname{ord}_{n}(a) \\mid \\varphi(n)$（Lagrange）；',
        '- $a^{k} \\equiv 1 \\iff \\operatorname{ord}_{n}(a) \\mid k$；',
        '- $\\operatorname{ord}_{n}(a^{t}) = \\dfrac{\\operatorname{ord}_{n}(a)}{\\gcd(t, \\operatorname{ord}_{n}(a))}$。',
        '',
        '前两条合起来说明「指数」这个概念在模算术里是完全良性的 —— 只要底数与 $n$ 互素。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第五章'],
    },

    {
      id: 'thm.order-divides-phi',
      cluster: 'number.quadratic',
      type: 'theorem',
      label: '阶整除 Euler 函数',
      title: '$\\operatorname{ord}_{n}(a) \\mid \\varphi(n)$',
      regions: ['number'],
      tags: ['数论', '原根', '定理'],
      statement: [
        '设 $\\gcd(a, n) = 1$。则 $\\operatorname{ord}_{n}(a) \\mid \\varphi(n)$；特别地 $a^{\\varphi(n)} \\equiv 1 \\pmod n$（Euler 定理）。',
      ].join('\n'),
      notes: [
        '**证明**：设 $k = \\operatorname{ord}_{n}(a)$，$H = \\{[1], [a], \\cdots, [a]^{k-1}\\}$ 是单位群里的循环子群，$|H| = k$。由 Lagrange 定理，$k \\mid |G| = \\varphi(n)$。',
        '',
        '**这是 Euler 定理的「原因」**：Euler 定理不是关于同余的，而是「有限群里元素的阶整除群阶」这句话在 $G = (\\mathbb{Z}/n\\mathbb{Z})^{\\times}$ 上的翻译（见 `imp.nt-lagrange-euler`）。',
        '',
        '**推论**：$a$ 是原根 $\\iff$ $\\operatorname{ord}_{n}(a) = \\varphi(n)$ —— 即它在单位群里生成整个群。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第五章'],
    },

    {
      id: 'def.primitive-root',
      cluster: 'number.quadratic',
      type: 'definition',
      label: '原根',
      title: '原根：单位群的生成元',
      regions: ['number'],
      tags: ['数论', '原根'],
      statement: [
        '设 $\\gcd(g, n) = 1$。若',
        '',
        '$$\\operatorname{ord}_{n}(g) = \\varphi(n) ,$$',
        '',
        '即 $g$ 在 $(\\mathbb{Z}/n\\mathbb{Z})^{\\times}$ 里的阶等于群的阶，称 $g$ 是模 $n$ 的**原根**。',
        '',
        '等价说法：$\\{[g]^{0}, [g]^{1}, \\cdots, [g]^{\\varphi(n)-1}\\}$ 遍历整个单位群；即 $(\\mathbb{Z}/n\\mathbb{Z})^{\\times}$ 是循环群、$g$ 是它的生成元。',
      ].join('\n'),
      notes: [
        '不是每个 $n$ 都有原根：$n = 1, 2, 4, p^{k}, 2p^{k}$（$p$ 为奇素数）恰好这些有，其余没有。$n = 8$ 就没有：单位群 $\\{1,3,5,7\\}$ 里每个元素的平方都是 $1$，是 Klein 四元群，不循环。',
        '',
        '模素数时原根一定存在（`thm.primitive-root-exists`），这是最关键的情形：$\\mathbb{F}_{p}^{\\times}$ 循环。它让「离散对数」有意义，也支撑了「$\\mathbb{F}_{p}$ 的乘法结构 = 循环群」这一整套图像。',
        '',
        '原根个数：有原根时恰有 $\\varphi(\\varphi(n))$ 个。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第五章'],
    },

    {
      id: 'thm.primitive-root-exists',
      cluster: 'number.quadratic',
      type: 'theorem',
      label: '模素数有原根',
      title: '$\\mathbb{F}_{p}^{\\times}$ 是循环群',
      regions: ['number'],
      tags: ['数论', '原根', '定理'],
      statement: [
        '设 $p$ 是素数。则单位群 $\\mathbb{F}_{p}^{\\times} = (\\mathbb{Z}/p\\mathbb{Z})^{\\times}$ 是 $p-1$ 阶循环群；它的生成元叫模 $p$ 的**原根**，共有 $\\varphi(p-1)$ 个。',
      ].join('\n'),
      notes: [
        '**证明**：关键是计数。对每个 $d \\mid p-1$，设 $\\psi(d)$ 为 $\\mathbb{F}_{p}^{\\times}$ 中**阶恰为** $d$ 的元素个数。由「阶整除 $\\varphi(p) = p-1$」（`thm.order-divides-phi`）与「$x^{d} = 1$ 至多有 $d$ 个解」得',
        '',
        '$$\\sum_{d \\mid p-1}\\psi(d) = p - 1 = \\sum_{d \\mid p-1}\\varphi(d) .$$',
        '',
        '再证 $\\psi(d) \\le \\varphi(d)$：若存在阶为 $d$ 的元素 $g$，则阶为 $d$ 的元素恰是 $g^{t}$（$\\gcd(t,d) = 1$），共 $\\varphi(d)$ 个；若不存在，则 $\\psi(d) = 0$。两种情形都有 $\\psi(d) \\le \\varphi(d)$，而总和相等，故每项都相等 —— 特别地 $\\psi(p-1) = \\varphi(p-1) > 0$。',
        '',
        '所以原根存在，且个数是 $\\varphi(p-1)$。这条证明只用到「多项式根的个数」与「$\\sum_{d\\mid n}\\varphi(d) = n$」两件事。',
        '',
        '⚠ 一般的 $n$ 只有 $1, 2, 4, p^{k}, 2p^{k}$ 有原根 —— 那需要单独处理 $p^{k}$（Hensel 式提升），本图未收录。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第五章'],
    },

    {
      id: 'def.discrete-log',
      cluster: 'number.quadratic',
      type: 'definition',
      label: '离散对数',
      title: '以原根为底的离散对数',
      regions: ['number'],
      tags: ['数论', '原根'],
      statement: [
        '设 $g$ 是模 $n$ 的原根，$\\gcd(a, n) = 1$。把 $a$ 写成',
        '',
        '$$a \\equiv g^{k} \\pmod n, \\qquad 0 \\le k < \\varphi(n) ,$$',
        '',
        '这个唯一的 $k$ 叫 $a$ 的**离散对数**，记 $k = \\log_{g} a$。',
      ].join('\n'),
      notes: [
        '唯一性来自 $g$ 是生成元（每个单位恰好对应一个指数）；「$k$ 的范围是 $0 \\le k < \\varphi(n)$」只是取代表元。',
        '',
        '它把**乘法变成加法**：$\\log_{g}(ab) = \\log_{g}a + \\log_{g}b \\pmod{\\varphi(n)}$ —— 与实对数同构，把 $(\\mathbb{Z}/n)^{\\times}$ 与 $\\mathbb{Z}/\\varphi(n)$ 对齐。',
        '',
        '计算上：正向（给定 $k$ 算 $g^{k}$）是快速幂，$O(\\log k)$；反向（给定 $a$ 求 $k$）没有已知的多项式算法，最好的通用方法是 baby-step giant-step（$O(\\sqrt{n})$）与 index calculus。**这个不对称性就是 Diffie–Hellman 与 ElGamal 的基础** —— 也是「离散对数问题」在密码学里被当作困难问题的原因。',
      ].join('\n\n'),
      refs: ['华罗庚《数论导引》第五章', 'Apostol, Ch. 10'],
    },
  ],

  edges: [

    { kind: 'definition', definition: 'def.congruence', usedBy: 'def.quadratic-residue',
      note: '二次剩余的陈述就是同余方程 $x^{2} \\equiv a$ 有没有解。' },

    { kind: 'definition', definition: 'def.quadratic-residue', usedBy: 'def.legendre-symbol',
      note: 'Legendre 符号把「是不是剩余」编码成 $\\pm 1$。' },

    { kind: 'definition', definition: 'def.legendre-symbol', usedBy: 'thm.euler-criterion',
      note: '判别法的结论就是 Legendre 符号的显式公式。' },

    { kind: 'definition', definition: 'def.legendre-symbol', usedBy: 'lem.gauss-qr',
      note: '引理给的是 Legendre 符号的另一个算法（数 $\\mu$ 的奇偶）。' },

    { kind: 'definition', definition: 'def.legendre-symbol', usedBy: 'thm.quadratic-reciprocity',
      note: '互反律说的是两个 Legendre 符号之间的关系。' },

    { kind: 'definition', definition: 'def.jacobi-symbol', usedBy: 'thm.jacobi-laws',
      note: '计算法则全部是 Jacobi 符号的乘法/移项性质。' },

    { kind: 'definition', definition: 'def.legendre-symbol', usedBy: 'def.jacobi-symbol',
      note: 'Jacobi 符号是把 Legendre 符号按素因子幂乘起来。' },

    { kind: 'definition', definition: 'def.order-mod-n', usedBy: 'def.primitive-root',
      note: '原根的定义就是「阶等于 $\\varphi(n)$」。' },

    { kind: 'definition', definition: 'def.group', usedBy: 'def.order-mod-n',
      note: '阶就是元素在单位群里的阶 —— 群论概念在模算术里的坐标。' },

    { kind: 'definition', definition: 'def.primitive-root', usedBy: 'def.discrete-log',
      note: '离散对数以原根为底，唯一性来自「生成元」。' },

    { kind: 'definition', definition: 'thm.primitive-root-exists', usedBy: 'def.discrete-log',
      note: '原根存在，离散对数才有定义。' },

    { kind: 'definition', definition: 'def.multiplicative-function', usedBy: 'def.legendre-symbol',
      note: 'Legendre 符号对第一个变量完全积性（$\\left(\\frac{ab}{p}\\right) = \\left(\\frac{a}{p}\\right)\\left(\\frac{b}{p}\\right)$）。' },

    {
      id: 'imp.nt-euler-criterion',
      kind: 'implication',
      sources: ['def.order-mod-n'],
      target: 'thm.euler-criterion',
      title: 'Euler 判别法：$a^{(p-1)/2}$ 只能等于 $\\pm 1$',
      proof: [
        '设 $p$ 奇素数、$p \\nmid a$，$n = \\frac{p-1}{2}$。',
        '',
        '由 Fermat 小定理，$\\left(a^{n}\\right)^{2} = a^{p-1} \\equiv 1 \\pmod p$。于是 $a^{n}$ 是 $x^{2} \\equiv 1$ 的根，而 $\\mathbb{Z}/p\\mathbb{Z}$ 是域，$x^{2} - 1 = (x-1)(x+1)$ 只有两根，故 $a^{n} \\equiv \\pm 1$。',
        '',
        '**若 $a$ 是剩余**：$a \\equiv b^{2}$，则 $a^{n} \\equiv b^{2n} = b^{p-1} \\equiv 1$。',
        '',
        '**若 $a$ 不是剩余**：$x^{n} \\equiv 1$ 在 $\\mathbb{F}_{p}^{\\times}$ 里恰有 $n = \\frac{p-1}{2}$ 个解（$\\mathbb{F}_{p}^{\\times}$ 循环，或直接由「$x^{n} - 1$ 至多 $n$ 个根」加计数），而这 $n$ 个解全是剩余（前一段已证剩余都满足）。剩余的个数也恰是 $n$，故「$a^{n} \\equiv 1$」$\\iff$「$a$ 是剩余」。剩下的是非剩余只能取 $-1$。',
        '',
        '结合二者即得 $\\left(\\frac{a}{p}\\right) \\equiv a^{(p-1)/2}$。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-gauss-qr',
      kind: 'implication',
      sources: ['thm.euler-criterion'],
      target: 'lem.gauss-qr',
      title: 'Gauss 引理：数超过 $p/2$ 的个数，用 Euler 判别法收尾',
      proof: [
        '设 $n = \\frac{p-1}{2}$，把 $a, 2a, \\cdots, na$ 取模 $p$ 的最小正剩余记为 $r_{1}, \\cdots, r_{n}$，其中 $\\mu$ 个 $> \\frac{p}{2}$。',
        '',
        '对每个 $r_{i}$ 定义 $s_{i} := r_{i}$（若 $r_{i} < \\frac{p}{2}$）或 $p - r_{i}$（若 $r_{i} > \\frac{p}{2}$）。则 $s_{1}, \\cdots, s_{n}$ 是 $1, \\cdots, n$ 的一个排列：因为 $s_{i} \\le \\frac{p-1}{2}$ 且互不相同（若 $s_{i} = s_{j}$，则 $r_{i} = \\pm r_{j}$，即 $ia \\equiv \\pm ja$，约掉 $a$ 后 $i \\equiv \\pm j$，而 $1 \\le i, j \\le n$ 迫使 $i = j$）。',
        '',
        '两边相乘：',
        '',
        '$$n!\\, a^{n} = \\prod_{i=1}^{n}(ia) \\equiv \\prod_{i=1}^{n} r_{i} \\equiv (-1)^{\\mu}\\prod_{i=1}^{n} s_{i} = (-1)^{\\mu}\\, n! \\pmod p .$$',
        '',
        '$p \\nmid n!$，约掉得 $a^{n} \\equiv (-1)^{\\mu}$。再用 Euler 判别法 $a^{n} \\equiv \\left(\\frac{a}{p}\\right)$（`thm.euler-criterion`），即得 $\\left(\\frac{a}{p}\\right) = (-1)^{\\mu}$。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-order-phi',
      kind: 'implication',
      sources: ['thm.lagrange'],
      target: 'thm.order-divides-phi',
      title: '阶整除群阶：Lagrange 定理',
      proof: [
        '设 $\\gcd(a, n) = 1$，$G = (\\mathbb{Z}/n\\mathbb{Z})^{\\times}$，$k = \\operatorname{ord}_{n}(a)$。',
        '',
        '则 $H := \\{[1], [a], \\cdots, [a]^{k-1}\\} \\subseteq G$ 是子群：封闭性来自 $[a]^{i}[a]^{j} = [a]^{i+j}$（指数按 $k$ 取模），逆元是 $[a]^{k-1}$。',
        '',
        '$|H| = k$：这 $k$ 个元素互不相同（若 $[a]^{i} = [a]^{j}$，$0 \\le i < j < k$，则 $[a]^{j-i} = 1$ 与 $k$ 的最小性矛盾）。',
        '',
        '由 Lagrange 定理，$|H|$ 整除 $|G| = \\varphi(n)$，故 $k \\mid \\varphi(n)$。',
        '',
        '取 $k \\mid \\varphi(n)$、$\\varphi(n) = k m$ 得 $a^{\\varphi(n)} = (a^{k})^{m} \\equiv 1$ —— 这就是 Euler 定理。',
      ].join('\n\n'),
    },

    {
      id: 'imp.nt-primitive-root',
      kind: 'implication',
      sources: ['thm.order-divides-phi'],
      target: 'thm.primitive-root-exists',
      title: '模素数有原根：$\\psi(d) \\le \\varphi(d)$ 且总和相等',
      proof: [
        '设 $p$ 素，$G = \\mathbb{F}_{p}^{\\times}$，$|G| = p-1$。对每个 $d \\mid p-1$，记 $\\psi(d) := \\#\\{g \\in G : \\operatorname{ord}(g) = d\\}$。',
        '',
        '**① 分段互斥**：每个 $g$ 的阶由 `thm.order-divides-phi` 必整除 $p-1$，故 $\\sum_{d \\mid p-1}\\psi(d) = p-1$。',
        '',
        '**② 另一侧**：$\\sum_{d \\mid p-1}\\varphi(d) = p-1$（经典恒等式，由「按 $\\gcd(k, p-1)$ 分类」可得）。',
        '',
        '**③ $\\psi(d) \\le \\varphi(d)$**：若 $\\psi(d) = 0$ 显然。否则取阶为 $d$ 的 $g$，则 $g^{t}$（$1 \\le t \\le d$）全部互异，其中阶恰为 $d$ 的恰是 $\\gcd(t, d) = 1$ 的那些，共 $\\varphi(d)$ 个 —— 所以阶为 $d$ 的元素不超过 $\\varphi(d)$ 个。',
        '',
        '**④ 收尾**：$\\sum \\psi(d) = \\sum \\varphi(d)$ 且逐项 $\\psi(d) \\le \\varphi(d)$，故每项相等；特别地 $\\psi(p-1) = \\varphi(p-1) > 0$。存在阶为 $p-1$ 的元素 —— 即原根，共 $\\varphi(p-1)$ 个。',
      ].join('\n\n'),
    },

    { kind: 'analogy', a: 'def.jacobi-symbol', b: 'def.legendre-symbol',
      title: 'Jacobi 符号：把 Legendre 符号从素数推到奇数',
      note: [
        '两者定义形状相同（乘性 + 取值 $\\pm 1$ or $0$），但含义分家：Legendre 说「有没有解」，Jacobi 只是「乘积」。',
        '',
        '代价与好处：Jacobi 会撒谎（$\\left(\\frac{2}{15}\\right) = 1$ 却无解），但**不必分解模数**就能算 —— 互反律在它上面照样成立。',
        '',
        '这条「便宜但只给必要条件」的性质，正是概率素性检验的可用之处：Jacobi 说 $-1$ 就一定合数。',
      ].join('\n\n'),
    },
  ],
});
