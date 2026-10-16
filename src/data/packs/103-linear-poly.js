/* ==========================================================================
   内容包 · 线性代数 ④：多项式与因式分解
   --------------------------------------------------------------------------
   新星团 `algebra.polynomial`（8 点）。为什么它归在线性代数这一批里：

     ① **特征多项式、极小多项式**都要用它（下一批 spectral 要用）；
     ② 它是「欧几里得整环」最简单的实例 —— 带余除法 → 辗转相除 → 唯一分解；
     ③ 它的商环 $K[x]/(f)$ 就是「添一个根」的装置 —— 后面 Galois 理论全靠它。

   ⚠️ 这一包不碰域扩张（那是 Galois 那一批的事），只做到「唯一分解」为止。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数：多项式与因式分解',
  nodes: [

    {
      id: 'def.polynomial',
      cluster: 'algebra.polynomial',
      type: 'definition',
      label: '一元多项式',
      title: '一元多项式（Polynomial）',
      regions: ['algebra'],
      tags: ['定义', '代数', '多项式'],
      statement: [
        '设 $K$ 是域。$K$ 上的一个**一元多项式**是形式表达式',
        '',
        '$$f = a_0 + a_1 x + a_2 x^{2} + \\cdots + a_n x^{n}, \\qquad a_i \\in K$$',
        '',
        '（只有有限多项系数非零）；$x$ 叫**未定元**，$a_i$ 叫**系数**。',
        '',
        '若最高次非零系数是 $a_n \\ne 0$，称 $f$ 的**次数**为 $n$，记 $\\deg f := n$。规定零多项式没有次数（或记 $\\deg 0 := -\\infty$），非零常数多项式的次数为 $0$。$a_n$ 叫**首项系数**；$a_n = 1$ 时称 $f$ 是**首一**的。',
        '',
        '两个多项式**相等**当且仅当各次系数全相等 —— 「多项式」与「多项式函数」是两件事（见注释）。'
      ].join('\n'),
      notes: '⚠ **多项式 $\\ne$ 多项式函数**：在 $\\mathbb{F}_2$ 上，$x^{2} + x$ 与 $0$ 作为函数处处相等（$0, 1$ 代进去都得 $0$），但作为多项式不同（系数不同）。本图的「多项式」一律指**形式对象**（系数序列）。\n\n⭐ 去掉「有限项」这个词就得到**形式幂级数** $K[[x]]$ —— 那是另一门学问（生成函数、形式群）。\n\n⭐ 次数是这套理论的「尺子」：带余除法、根的个数、不可约性，全部按次数说话。',
      refs: ['Lang, Algebra, Ch. IV', 'Dummit–Foote, Abstract Algebra, Ch. 9']
    },
    {
      id: 'def.polynomial-ring',
      cluster: 'algebra.polynomial',
      type: 'definition',
      label: '多项式环',
      title: '多项式环 $K[x]$（Polynomial Ring）',
      regions: ['algebra'],
      tags: ['定义', '代数', '多项式', '环'],
      statement: [
        '在 $K$ 上全体一元多项式构成的集合 $K[x]$ 上定义',
        '',
        '$$(f + g)_i := a_i + b_i, \\qquad (fg)_i := \\sum_{j=0}^{i} a_j\\, b_{i-j}$$',
        '',
        '（加法逐项、乘法是**卷积**）。则 $K[x]$ 是交换含幺环，叫 $K$ 上的**多项式环**，而且',
        '',
        '$$\\deg(fg) = \\deg f + \\deg g \\qquad (f, g \\ne 0)$$',
        '',
        '由此 $K[x]$ 是**整环**（无零因子）：$fg = 0 \\implies f = 0$ 或 $g = 0$。'
      ].join('\n'),
      notes: '⭐ $K[x]$ 是「$K$ 上的一元多项式函子」的取值：$K \\mapsto K[x]$ 与「把 $K$ 送入 $K$-代数」之间是伴随的（自由 $K$-代数）。图上 `ex.algebra-categories` 那条已经提过 $k\\text{-}\\mathbf{Alg}$。\n\n⭐ $\\deg(fg) = \\deg f + \\deg g$ 是整环性的全部来源：系数域的整性把次数加成，于是没有零因子。\n\n⚠ 常数多项式（$\\deg = 0$）与零多项式要分开处理，所有关于次数的等式都要加「$f, g \\ne 0$」的前提。',
      refs: ['Lang, Algebra, Ch. IV']
    },
    {
      id: 'thm.division-algorithm',
      cluster: 'algebra.polynomial',
      type: 'theorem',
      label: '带余除法',
      title: '定理：带余除法（$K[x]$ 是欧几里得整环）',
      regions: ['algebra'],
      tags: ['定理', '代数', '多项式'],
      statement: [
        '设 $K$ 是域，$f, g \\in K[x]$，$g \\ne 0$。则存在**唯一**的 $q, r \\in K[x]$ 使',
        '',
        '$$f = q\\,g + r, \\qquad \\deg r < \\deg g$$',
        '',
        '（$r$ 叫**余式**，$q$ 叫**商**；允许 $r = 0$。）',
        '',
        '于是 $K[x]$ 是**欧几里得整环**：存在「次数」这个满足 $\\deg r < \\deg g$ 的欧几里得函数。'
      ].join('\n'),
      notes: '⭐ 「$K$ 是域」这一条不可省：换成环 $\\mathbb{Z}[x]$ 就没有带余除法了（$x^{2}$ 除以 $2x + 1$ 商不出多项式）。它的作用是保证**首项系数可逆**，从而能消掉最高次项。\n\n⭐ 这一步的后果极长：有带余除法就有**辗转相除**（求最大公因式）、就有 **Bézout 等式**（$af + bg = \\gcd$）、就有「不可约 $\\implies$ 素」、就推出**唯一分解**（`thm.poly-ufd`）。欧几里得整环是「什么都好」的一类环。\n\n⚠ 唯一性用的是次数比较，不是「除法本身唯一」—— 除法过程中每步的选择都不唯一，但最终商与余式唯一。',
      refs: ['Lang, Algebra, Ch. IV', 'Dummit–Foote, Abstract Algebra, Ch. 9']
    },
    {
      id: 'thm.factor-theorem',
      cluster: 'algebra.polynomial',
      type: 'theorem',
      label: '因式定理与根',
      title: '定理：因式定理 $f(a) = 0 \\iff (x - a) \\mid f$',
      regions: ['algebra'],
      tags: ['定理', '代数', '多项式'],
      statement: [
        '设 $f \\in K[x]$、$a \\in K$。则',
        '',
        '$$f(a) = 0 \\iff (x - a) \\text{ divides } f \\ \\text{ in } K[x]$$',
        '',
        '即：存在 $h \\in K[x]$ 使 $f = (x - a)\\,h$。此时称 $a$ 是 $f$ 的**根**（零点）。'
      ].join('\n'),
      notes: '⭐ 证明只有两行：把 $f$ 除以 $(x - a)$（$x - a$ 首一，带余除法可用），余式 $r$ 的次数 $< 1$，即 $r$ 是常数；把 $x = a$ 代进去得 $f(a) = r$。所以「余式」就是「函数值」。\n\n⭐ 由此立刻得到**根的个数不超过次数**（见下一条），以及「一次多项式一定有根」。\n\n⚠ $a$ 必须是 $K$ 中的元素：$x^{2} + 1$ 在 $\\mathbb{R}$ 上没有根，但它当然不被 $(x - a)$ 整除（$a \\in \\mathbb{R}$）。根的**存在性**与 $K$ 有关 —— 那正是代数基本定理要管的事。',
      refs: ['Lang, Algebra, Ch. IV']
    },
    {
      id: 'prop.root-bound',
      cluster: 'algebra.polynomial',
      type: 'proposition',
      label: '根的个数不超过次数',
      title: '命题：$\\deg f = n$ 时 $f$ 至多有 $n$ 个根（计重数）',
      regions: ['algebra'],
      tags: ['命题', '代数', '多项式'],
      statement: [
        '设 $f \\in K[x]$ 是非零多项式，$\\deg f = n$。则 $f$ 在 $K$ 中至多有 $n$ 个根（互不相同的根）。',
        '',
        '更精确地（用**重数**）：存在 $a_1, \\ldots, a_m \\in K$（互异）与正整数 $e_1, \\ldots, e_m$ 使',
        '',
        '$$f = (x - a_1)^{e_1} \\cdots (x - a_m)^{e_m}\\, h, \\qquad h(a_i) \\ne 0 \\ \\text{for all } i$$',
        '',
        '此时 $e_1 + \\cdots + e_m \\le n$（$e_i$ 叫根 $a_i$ 的**重数**）。'
      ].join('\n'),
      notes: '⭐ 证明就是反复用因式定理：每取一个根就除一次 $(x - a)$，次数降 1，降不到负，所以最多 $n$ 次。\n\n⭐ 这个「小」命题的用处出乎意料地大：**有限域上的多项式恒等式判定**（两个次数 $< n$ 的多项式若在 $n$ 个点上相等则恒等）—— 插值法、纠错码（Reed–Solomon）都靠它。\n\n⚠ 只在**整环**里成立：在 $\\mathbb{Z}/8$ 上，$x^{2} - 1$ 有四个根 $1, 3, 5, 7$（因为 $\\mathbb{Z}/8$ 有零因子）。$K[x]$ 是整环是关键。',
      refs: ['Lang, Algebra, Ch. IV', 'Dummit–Foote, Abstract Algebra, Ch. 9']
    },
    {
      id: 'thm.fundamental-algebra',
      cluster: 'algebra.polynomial',
      type: 'theorem',
      label: '代数基本定理',
      title: '定理（代数基本定理）：$\\mathbb{C}$ 代数闭',
      regions: ['analysis', 'algebra'],
      tags: ['定理', '代数', '多项式', '复'],
      statement: [
        '每个次数 $\\ge 1$ 的复系数多项式 $p \\in \\mathbb{C}[z]$ 都有复根。等价地：',
        '',
        '- $\\mathbb{C}$ 是**代数闭域**：$\\mathbb{C}[z]$ 中不可约多项式恰好是那些一次多项式；',
        '- 每个 $p \\ne 0$ 都可以唯一地写成',
        '',
        '$$p(z) = c\\,(z - z_1)^{e_1} \\cdots (z - z_m)^{e_m}, \\qquad c \\in \\mathbb{C}^{\\times}$$'
      ].join('\n'),
      notes: '⭐ 名字叫「代数」基本定理，可它**不是代数定理** —— 任何证明都要用到 $\\mathbb{R}$ 的**完备性**（因为 $\\mathbb{C}$ 的代数闭性本质上是一条紧性 + 连续性的事实）。图上把它的 `regions` 标成 `analysis` + `algebra` 就是这个原因。\n\n⭐ 证明骨架（图上走的是这条路）：\n1. $|p(z)| \\to +\\infty$ 当 $|z| \\to \\infty$，所以在某个闭圆盘上由**最值定理**取到最小值 $m \\ge 0$；\n2. 若 $m > 0$，在取到最小值的点 $z_0$ 附近作扰动 $z_0 + h$，把 $p(z_0 + h) = p(z_0) + a_k h^{k} + \\cdots$ 展开（$a_k h^{k}$ 是第一个非零项），选 $h$ 的方向使 $|p(z_0) + a_k h^{k}| < |p(z_0)|$，与最小性矛盾。\n3. 故 $m = 0$，即 $p$ 有根；再用因式定理除一次、归纳即得全部分解。\n\n⚠ 步骤 2 用到**复数开 $k$ 次方**（$a_k h^{k}$ 可以取任意方向），这正是需要在 $\\mathbb{C}$ 上做、而不是在 $\\mathbb{R}$ 上的原因。',
      refs: ['Lang, Algebra, Ch. IV', 'Rudin, Real and Complex Analysis, Ch. 10']
    },
    {
      id: 'def.irreducible-poly',
      cluster: 'algebra.polynomial',
      type: 'definition',
      label: '不可约多项式',
      title: '不可约多项式（Irreducible Polynomial）',
      regions: ['algebra'],
      tags: ['定义', '代数', '多项式'],
      statement: [
        '设 $f \\in K[x]$ 是非零、非单位（即 $\\deg f \\ge 1$）。称 $f$ **可约**，当且仅当存在 $g, h \\in K[x]$ 满足',
        '',
        '$$f = g\\,h, \\qquad \\deg g \\ge 1, \\ \\deg h \\ge 1$$',
        '',
        '否则称 $f$ **不可约**（irreducible）。',
        '',
        '等价说法：$f$ 不可约 $\\iff$ $f$ 在环 $K[x]$ 里不能写成两个次数更小的非单位之积 $\\iff$ 主理想 $(f)$ 是 $K[x]$ 的**极大理想**。'
      ].join('\n'),
      notes: '⭐ 不可约性**依赖域 $K$**：$x^{2} + 1$ 在 $\\mathbb{R}[x]$ 中不可约，在 $\\mathbb{C}[x]$ 中可约（$= (x + i)(x - i)$），在 $\\mathbb{F}_2[x]$ 中又可约（$x^{2} + 1 = (x+1)^{2}$）。所以「不可约」永远要写明在哪个域上。\n\n⭐ 「不可约 $\\iff$ $(f)$ 极大」这一条把代数问题翻译成环论的语言：于是 $K[x]/(f)$ 是**域**（商掉极大理想得域）—— 这就是「造一个新域、让 $f$ 在那里有根」的装置（Galois 那一批要用）。\n\n⚠ 不可约与「没有根」不同：$x^{4} + 1$ 在 $\\mathbb{R}[x]$ 上无根但可约（$= (x^{2}+\\sqrt{2}x+1)(x^{2}-\\sqrt{2}x+1)$）。次数 $\\le 3$ 时两者才等价。',
      refs: ['Lang, Algebra, Ch. IV', 'Dummit–Foote, Abstract Algebra, Ch. 9']
    },
    {
      id: 'thm.poly-ufd',
      cluster: 'algebra.polynomial',
      type: 'theorem',
      label: 'K[x] 是唯一分解整环',
      title: '定理：$K[x]$ 是唯一分解整环（UFD）',
      regions: ['algebra'],
      tags: ['定理', '代数', '多项式', '环'],
      statement: [
        '设 $K$ 是域。则每个非零、非单位的多项式 $f \\in K[x]$ 都可以写成有限多个不可约多项式的乘积',
        '',
        '$$f = c\\, p_1 p_2 \\cdots p_r, \\qquad c \\in K^{\\times},\\ p_i \\text{ monic irreducible}$$',
        '',
        '而且分解**唯一**到顺序与常数因子：若 $f = c\' q_1 \\cdots q_s$ 是另一种这样的分解，则 $r = s$ 且存在置换 $\\sigma$ 使 $p_i = q_{\\sigma(i)}$（当然 $c = c\'$）。'
      ].join('\n'),
      notes: '⭐ 这是带余除法的**终点**：欧几里得整环 $\\implies$ 主理想整环 $\\implies$ 唯一分解整环。整条链上三个「整环」的定义都值得记住，因为它们在抽象代数里各自有反例（UFD 不必是 PID：$\\mathbb{Z}[x]$；PID 不必是欧几里得整环：某些环）。\n\n⭐ 唯一性的证明靠「不可约 $\\implies$ 素」：若 $p$ 不可约且 $p \\mid gh$，则 $p \\mid g$ 或 $p \\mid h$。这一步用的是 **Bézout 等式**（辗转相除的产物），也正是带余除法唯一真正被用到的地方。\n\n⭐ 它的用途： $\\mathbb{Q}[x]$ 里的整系数多项式分解、$K[x]/(f)$ 的域结构、特征多项式与极小多项式的关系（下一批）都建立在它上面。',
      refs: ['Lang, Algebra, Ch. IV', 'Dummit–Foote, Abstract Algebra, Ch. 9']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.ring-polyring',
      kind: 'definition',
      definition: 'def.ring',
      usedBy: 'def.polynomial-ring',
      note: '$K[x]$ 是环的一个具体例子：加法逐项、乘法卷积，验证的就是环公理。'
    },
    {
      id: 'dep.polynomial-polyring',
      kind: 'definition',
      definition: 'def.polynomial',
      usedBy: 'def.polynomial-ring',
      note: '$K[x]$ 的元素就是多项式，环结构写在它们上面。'
    },
    {
      id: 'dep.polyring-division',
      kind: 'definition',
      definition: 'def.polynomial-ring',
      usedBy: 'thm.division-algorithm',
      note: '带余除法是 $K[x]$ 里两个元素之间的运算，先要有这个环。'
    },
    {
      id: 'dep.polyring-irreducible',
      kind: 'definition',
      definition: 'def.polynomial-ring',
      usedBy: 'def.irreducible-poly',
      note: '「可约 / 不可约」是 $K[x]$ 里元素的性质，说到底是环里的因子分解问题。'
    },
    {
      id: 'dep.factor-polyufd',
      kind: 'definition',
      definition: 'def.irreducible-poly',
      usedBy: 'thm.poly-ufd',
      note: '唯一分解定理的陈述里出现了「不可约多项式」，先要有那个词。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.division-algorithm',
      kind: 'implication',
      sources: ['def.polynomial', 'def.field'],
      target: 'thm.division-algorithm',
      title: '多项式的次数 + $K$ 是域 $\\implies$ 带余除法',
      proof: [
        '**存在性**：对 $\\deg f$ 归纳。若 $\\deg f < \\deg g$，取 $q = 0$、$r = f$ 即可。否则设',
        '',
        '$$f = a_m x^{m} + \\cdots, \\qquad g = b_n x^{n} + \\cdots \\quad (a_m \\ne 0, b_n \\ne 0, m \\ge n)$$',
        '',
        '令 $c := a_m b_n^{-1} \\in K$（**这里用到 $K$ 是域**，$b_n$ 可逆），并令',
        '',
        '$$f_1 := f - c\\,x^{m-n} g$$',
        '',
        '则 $f_1$ 的 $m$ 次项被消掉，$\\deg f_1 < \\deg f$。对 $f_1$ 用归纳假设：$f_1 = q_1 g + r$（$\\deg r < \\deg g$），于是 $f = (c x^{m-n} + q_1) g + r$。',
        '',
        '**唯一性**：设 $f = q g + r = q\' g + r\'$，两式相减得 $(q - q\') g = r\' - r$。若 $q \\ne q\'$，则左端次数 $\\ge \\deg g$（由 $\\deg(fg) = \\deg f + \\deg g$），而右端次数 $< \\deg g$，矛盾。故 $q = q\'$，随之 $r = r\'$。∎'
      ].join('\n'),
      note: '「域」在存在性那一步被用了一次（$b_n^{-1}$），在唯一性那一步用了一次（整环的次数可加性）。两处都是本质的。'
    },
    {
      id: 'imp.factor-theorem',
      kind: 'implication',
      sources: ['thm.division-algorithm'],
      target: 'thm.factor-theorem',
      title: '带余除法 $\\implies$ 因式定理',
      proof: [
        '设 $a \\in K$。把 $f$ 除以 $x - a$（首一，故带余除法适用）：',
        '',
        '$$f = q\\,(x - a) + r, \\qquad \\deg r < 1$$',
        '',
        '即 $r \\in K$ 是常数。把 $x = a$ 代入两边：$f(a) = q(a) \\cdot 0 + r = r$。',
        '',
        '于是 $f(a) = 0 \\iff r = 0 \\iff (x - a) \\mid f$。∎'
      ].join('\n'),
      note: '这条证明只有一行实质内容，但它给出了一个额外收获：**余式就是函数值** —— 这也是多项式作为「函数」与作为「形式对象」之间的桥。'
    },
    {
      id: 'imp.root-bound',
      kind: 'implication',
      sources: ['thm.factor-theorem'],
      target: 'prop.root-bound',
      title: '因式定理 $\\implies$ 根的个数不超过次数',
      proof: [
        '对 $n = \\deg f$ 归纳，同时证明「可提出重数」的精确形式。',
        '',
        '**存在性**：若 $f$ 在 $K$ 中没有根，取 $m = 0$、$h = f$ 即可。否则取一个根 $a_1$，由因式定理 $f = (x - a_1) f_1$，其中 $\\deg f_1 = n - 1$。对 $f_1$ 归纳，得 $f_1 = (x - a_2)^{e_2} \\cdots h$；再把 $a_1$ 的重数补足（若 $f_1$ 也以 $a_1$ 为根则继续除）。',
        '',
        '**次数估计**：每一步除法都让次数降 1，而左边总次数是 $n$，所以 $e_1 + \\cdots + e_m \\le n$。特别地互异根的个数 $m \\le n$。∎'
      ].join('\n'),
      note: '归纳的写法要注意：**重数是一步步除出来的**，不是先取互异根再数次数 —— 后者会漏掉「同一个根出现多次」的情形。'
    },
    {
      id: 'imp.fundamental-algebra',
      kind: 'implication',
      sources: ['thm.evt', 'thm.ivt', 'thm.factor-theorem'],
      target: 'thm.fundamental-algebra',
      title: '最值定理 + 介值定理 + 因式定理 $\\implies$ 代数基本定理',
      proof: [
        '设 $p(z) = a_n z^{n} + \\cdots + a_0$，$n \\ge 1$，$a_n \\ne 0$。',
        '',
        '1. **在某个闭圆盘上取到最小模**：由 $|p(z)| \\ge |a_n||z|^{n} - \\sum_{k < n} |a_k||z|^{k}$，当 $|z| \\to \\infty$ 时 $|p(z)| \\to +\\infty$；特别地存在 $R$ 使 $|z| > R$ 时 $|p(z)| > |p(0)|$。于是 $z \\mapsto |p(z)|$ 在紧集 $\\{|z| \\le R\\}$ 上取到最小值（**最值定理**，用到 $\\mathbb{R}$ 的完备性 + 紧性），而它在盘外不可能更小。记最小值点为 $z_0$，$m := |p(z_0)|$。',
        '2. **若 $m > 0$ 则矛盾**：记 $w := z - z_0$，把 $p$ 在 $z_0$ 处展开成 $w$ 的多项式：',
        '',
        '$$p(z_0 + w) = p(z_0) + c_k w^{k} + O(w^{k+1}), \\qquad c_k \\ne 0, \\ k \\ge 1$$',
        '',
        '（$k$ 是第一个非零项的阶。）取 $w = t\\,\\zeta$，其中 $\\zeta^{k} = -p(z_0)/c_k$ 的一个 $k$ 次方根、$t > 0$ 很小。由**复数开 $k$ 次方**，这样的 $\\zeta$ 总存在。则',
        '',
        '$$|p(z_0 + t\\zeta)|^{2} = |p(z_0)|^{2}\\Bigl( 1 - \\frac{2t^{k}}{|p(z_0)|} + O(t^{k+1}) \\Bigr) < |p(z_0)|^{2}$$',
        '',
        '对充分小的 $t$ 成立，与 $z_0$ 的最小性矛盾。',
        '3. 故 $m = 0$，即 $p(z_0) = 0$：$p$ 有根。',
        '4. **归纳得完全分解**：由因式定理 $p = (z - z_0) p_1$，$\\deg p_1 = n - 1$，对 $p_1$ 重复第 1–3 步，$n$ 步之后 $p$ 分解成 $n$ 个一次因子之积（常数因子提到最前）。',
        '5. **唯一性**：由 $K[x]$ 是唯一分解整环（同一次序与常数因子之外唯一），也由「根的个数不超过次数」直接得到。∎'
      ].join('\n'),
      note: '整个证明里**分析用在哪**：第 1 步（紧集上连续函数取最小）与第 2 步的 $O(t^{k+1})$ 估计。代数只负责第 4、5 步。这也解释了它为什么既不是纯代数定理、又比一般的分析定理「硬」。'
    },
    {
      id: 'imp.poly-ufd',
      kind: 'implication',
      sources: ['thm.division-algorithm'],
      target: 'thm.poly-ufd',
      title: '带余除法 $\\implies$ 唯一分解',
      proof: [
        '记 $R := K[x]$，它是整环（$\\deg(fg) = \\deg f + \\deg g$）。',
        '',
        '**第一步：辗转相除与 Bézout 等式。** 对 $f, g \\ne 0$ 反复用带余除法（$f = qg + r$，$\\deg r < \\deg g$），次数严格下降故必停：最后非零余式 $d$ 满足 $d \\mid f$、$d \\mid g$，且存在 $a, b \\in R$ 使',
        '',
        '$$a f + b g = d$$',
        '',
        '（把除法的每一步回代即得。）$d$ 就是 $\\gcd(f, g)$（首一化之后唯一）。',
        '',
        '**第二步：不可约 $\\implies$ 素。** 设 $p$ 不可约、$p \\mid fg$。若 $p \\nmid f$，则 $\\gcd(p, f) = 1$，由 Bézout 有 $ap + bf = 1$；两边乘 $g$：$apg + bfg = g$。左端两项都被 $p$ 整除（第一项显然，第二项因为 $p \\mid fg$），故 $p \\mid g$。',
        '',
        '**第三步：存在性。** 对 $\\deg f$ 归纳：若 $f$ 不可约则已分解完；否则 $f = gh$ 且 $\\deg g, \\deg h < \\deg f$，对两者归纳。',
        '',
        '**第四步：唯一性。** 设 $p_1 \\cdots p_r = q_1 \\cdots q_s$（都是不可约元，首一化后）。由 $p_1 \\mid q_1 \\cdots q_s$ 与第二步，存在某个 $j$ 使 $p_1 \\mid q_j$；两者都不可约（从而相伴），约掉后对 $r + s$ 归纳，得 $r = s$ 且分解在顺序与单位之下相同。∎'
      ].join('\n'),
      note: '四步里**只有第二步用了域的特殊性**（本质上是带余除法给出的 Bézout 等式）；其余三步对任何整环都成立。这也是「欧几里得整环 $\\implies$ UFD」这条链的标准证明。'
    }
  ]
});
