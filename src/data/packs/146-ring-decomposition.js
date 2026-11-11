/* ==========================================================================
   内容包 · 环论：整环与分解（第一批 10 点）
   --------------------------------------------------------------------------
   之前只有 $K[x]$ 与 $\mathbb{Z}$ 上的**实例**（thm.poly-ufd、thm.division-algorithm、
   算术基本定理），缺的是它们背后的**环类**：整环 → gcd 整环 / Bézout 整环
   → Euclid 整环 → PID → UFD，以及中国剩余定理的环论形式。
   ⭐ 证明写在边上（imp.ring-*），节点只放陈述与边界情形。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '环论：整环与分解',
  nodes: [

    {
      id: 'def.int-domain',
      cluster: 'algebra.rings',
      type: 'definition',
      label: '整环',
      title: '整环：没有零因子的交换幺环',
      regions: ['algebra'],
      tags: ['代数', '环论', '整环'],
      statement: [
        '设 $A$ 是交换、含幺、且 $A \\ne \\{0\\}$ 的环。若 $ab = 0$ 只可能 $a = 0$ 或 $b = 0$，就称 $A$ 是**整环**（$A$ 没有零因子）。',
        '',
        '等价说法（消去律）：对 $a \\ne 0$，$ab = ac$ $\\implies$ $b = c$。',
      ].join('\n'),
      notes: [
        '整环是「能谈整除与约分」的最小环境：$\\mathbb{Z}$、$K[x]$、$\\mathbb{Z}[i]$、$\\mathbb{Z}[\\sqrt{2}]$ 都是整环；$\\mathbb{Z}/n\\mathbb{Z}$（$n$ 合数）与 $M_{n}(K)$（$n \\ge 2$）不是。',
        '',
        '它也是「整除」的落点：$a \\mid b$ 只在无零因子时才有正常的消去性质 —— 否则 $2 \\cdot 3 \\equiv 0 \\pmod 6$ 会让整除与顺序彻底乱掉。',
        '',
        '三个条件的用处：交换 $\\implies$ 可以谈「主理想 $(a)$」；含幺 $\\implies$ 单位群与「可逆」有意义；无零因子 $\\implies$ 可以约分、才能定义分式域。',
      ].join('\n\n'),
      refs: ['Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1', 'Borevich–Shafarevich, Number Theory, Ch. 1'],
    },

    {
      id: 'def.irreducible-element',
      cluster: 'algebra.rings',
      type: 'definition',
      label: '相伴、不可约与素',
      title: '相伴、不可约元与素元',
      regions: ['algebra'],
      tags: ['代数', '环论', '整除'],
      statement: [
        '设 $A$ 是整环，$a, b \\in A$ 非零。',
        '',
        '- $a$ 与 $b$ **相伴**（记 $a \\sim b$），若 $a = ub$ 对某个可逆元 $u$ 成立。',
        '- 非零非单位的 $p$ 叫**不可约**，若 $p = ab$ 迫使 $a$ 或 $b$ 可逆（即 $p$ 不能拆成两个非单位的乘积）。',
        '- 非零非单位的 $p$ 叫**素**，若 $p \\mid ab$ $\\implies$ $p \\mid a$ 或 $p \\mid b$。',
      ].join('\n'),
      notes: [
        '在整环里**素 $\\implies$ 不可约**：若 $p = ab$ 且 $p$ 是素元，则 $p \\mid a$ 或 $p \\mid b$，设 $p \\mid a$、$a = pc$，则 $pcb = p$，约掉 $p$ 得 $cb = 1$，故 $b$ 可逆。',
        '',
        '反之不然：$\\mathbb{Z}[\\sqrt{-5}]$ 里 $2$ 不可约（范数论证：$N(2) = 4$，而 $N(a + b\\sqrt{-5}) = a^{2} + 5b^{2}$ 取不到 $2$），但 $2 \\mid 6 = (1+\\sqrt{-5})(1-\\sqrt{-5})$ 而不整除任一因子 —— 所以 $2$ 是「不可约而非素」。',
        '',
        '「不可约 = 素」正是唯一分解整环的判别特征（见 `def.ufd`）：UFD 里两者重合，非 UFD 里必有分歧。',
      ].join('\n\n'),
      refs: ['Atiyah–Macdonald, Ch. 1'],
    },

    {
      id: 'def.gcd-domain',
      cluster: 'algebra.rings',
      type: 'definition',
      label: 'gcd 整环',
      title: 'gcd 整环：任意两元素都有最大公因子',
      regions: ['algebra'],
      tags: ['代数', '环论', '整除'],
      statement: [
        '整环 $A$ 叫 **gcd 整环**，若任意 $a, b \\in A$ 都有**最大公因子**：存在 $d$ 使',
        '',
        '$$d \\mid a,\\quad d \\mid b,$$',
        '并且**任何同时整除 $a, b$ 的 $c$ 都整除 $d$**。',
        '',
        '注意「最大」是**整除意义下的最大下界**，不是大小比较 —— 整环上没有全序。',
      ].join('\n'),
      notes: [
        '为什么必须这样定义：$\\mathbb{Z}$ 里「最大的公因数」靠 $|d|$ 比较，一般整环没有绝对值。改用「被一切公因子整除」才对：$\\mathbb{Z}$ 里它等价于「绝对值最大」，而 $\\mathbb{Z}[i]$ 里也只有这个说法成立。',
        '',
        '层级：UFD $\\implies$ gcd 整环（`imp.ring-ufd-gcd`），反之不然（$\\mathbb{Z}[\\sqrt{-5}]$ 连 $\\gcd(6, 2(1+\\sqrt{-5}))$ 都不存在）。Bézout 整环 $\\implies$ gcd 整环，因为 $\\gcd$ 直接由线性组合给出。',
        '',
        '$\\gcd$ 可以不存在 —— 这正是「UFD 的分解唯一性」不能用 gcd 替代的原因。',
      ].join('\n\n'),
      refs: ['Kaplansky, Commutative Rings, Ch. 1'],
    },

    {
      id: 'def.bezout-domain',
      cluster: 'algebra.rings',
      type: 'definition',
      label: 'Bézout 整环',
      title: 'Bézout 整环：有限生成理想都是主理想',
      regions: ['algebra'],
      tags: ['代数', '环论', '整除'],
      statement: [
        '整环 $A$ 叫 **Bézout 整环**，若每个**有限生成**理想都是主理想 —— 等价地：任意 $a, b \\in A$ 存在 $d, u, v$ 使',
        '',
        '$$u a + v b = d = \\gcd(a, b) .$$',
      ].join('\n'),
      notes: [
        'PID $\\implies$ Bézout（所有理想都是主理想，当然包括有限生成的），反之不然：Bézout 整环未必 Noether，可能有非有限生成的理想。',
        '',
        '$\\mathbb{Z}[x]$ **不是** Bézout：$\\gcd(2, x) = 1$，但 $2u + xv = 1$ 无解（代 $x = 0$ 得 $2u(0) = 1$）—— 所以「Bézout 性质」强于 gcd 整环。',
        '',
        'Bézout 整环里「不可约 = 素」（因为 $\\gcd$ 由线性组合给出，Euclid 引理的证明可以直接搬过来）。',
      ].join('\n\n'),
      refs: ['Kaplansky, Commutative Rings, Ch. 1'],
    },

    {
      id: 'def.euclidean-domain',
      cluster: 'algebra.rings',
      type: 'definition',
      label: 'Euclid 整环',
      title: 'Euclid 整环：带余除法成立',
      regions: ['algebra'],
      tags: ['代数', '环论', '整除'],
      statement: [
        '整环 $A$ 叫 **Euclid 整环**，若存在函数 $N : A \\setminus \\{0\\} \\to \\mathbb{N}$（**欧几里得函数**），使对任意 $a \\in A$、$b \\ne 0$，存在 $q, r \\in A$ 满足',
        '',
        '$$a = q b + r, \\qquad r = 0 \\ \\vee \\ N(r) < N(b) .$$',
      ].join('\n'),
      notes: [
        '三个例子，三种 $N$：$\\mathbb{Z}$ 取 $N(a) = |a|$；$K[x]$ 取 $N(f) = \\deg f$（这就是 `thm.division-algorithm`）；$\\mathbb{Z}[i]$（Gauss 整数）取 $N(a+bi) = a^{2}+b^{2}$。',
        '',
        '为什么它值钱：后面所有算术（$\\gcd$、Bézout、唯一分解）的证明**只用到「余数下降」**这一条，所以整条链在 Euclid 整环里一次性成立（`imp.ring-euclid-pid` 起）。',
        '',
        'Euclid 整环 $\\implies$ PID 的证明要点：取理想 $I \\ne 0$，在其中选 $N$ 最小的 $b$，则任何 $a \\in I$ 除以 $b$ 的余数 $r = a - qb \\in I$ 满足 $N(r) < N(b)$，只能 $r = 0$，故 $I = (b)$。',
      ].join('\n\n'),
      refs: ['Borevich–Shafarevich, Number Theory, Ch. 1', 'Atiyah–Macdonald, Ch. 1'],
    },

    {
      id: 'def.pid',
      cluster: 'algebra.rings',
      type: 'definition',
      label: '主理想整环',
      title: '主理想整环（PID）：每个理想都由一个元素生成',
      regions: ['algebra'],
      tags: ['代数', '环论', '理想'],
      statement: [
        '整环 $A$ 叫**主理想整环**（PID），若每个理想都是主理想：对任意理想 $I$ 存在 $a$ 使 $I = (a) = aA$。',
      ].join('\n'),
      notes: [
        '例：$\\mathbb{Z}$（每个理想是 $(n)$）、$K[x]$（理想由次数最低的多项式生成）、$\\mathbb{Z}[i]$。',
        '',
        '反例：$\\mathbb{Z}[x]$ 不是 PID —— $(2, x)$ 不是主理想（若 $(2,x) = (f)$，则 $f \\mid 2$ 迫使 $f$ 是常数 $\\pm 1$ 或 $\\pm 2$；前者给出 $(f) = A$、后者不含 $x$，都不对）。$K[x, y]$ 同理，$(x, y)$ 不是主理想。',
        '',
        'PID $\\implies$ UFD（`imp.ring-pid-ufd`）是这类环的中心定理：分解的存在性靠「理想升链必停」（Noether），唯一性靠「不可约 = 素」（Bézout 性质来自 PID）。',
      ].join('\n\n'),
      refs: ['Atiyah–Macdonald, Ch. 1'],
    },

    {
      id: 'def.ufd',
      cluster: 'algebra.rings',
      type: 'definition',
      label: '唯一分解整环',
      title: '唯一分解整环（UFD）：分解存在且唯一',
      regions: ['algebra'],
      tags: ['代数', '环论', '唯一分解'],
      statement: [
        '整环 $A$ 叫**唯一分解整环**（UFD），若',
        '',
        '1. **存在性**：每个非零非单位元 $a$ 都能写成有限多个不可约元的乘积；',
        '2. **唯一性**：两个这样的分解只差次序与相伴（即把因子逐个配对成相伴元）。',
      ].join('\n'),
      notes: [
        '$\\mathbb{Z}$ 与 $K[x]$ 都是 UFD（后者见 `thm.poly-ufd`），而 $\\mathbb{Z}[\\sqrt{-5}]$ 不是：',
        '',
        '$$6 = 2 \\cdot 3 = (1+\\sqrt{-5})(1-\\sqrt{-5}),$$',
        '',
        '四个因子都不可约，且互不相伴 —— 所以分解不唯一。',
        '',
        'UFD 的判别：**UFD $\\iff$（分解存在）且（不可约 = 素）**。三条常被并列的性质都不单独等价于 UFD：①「不可约 = 素」（`def.irreducible-element`）只在**分解存在性**已经成立时才够（去掉存在性就弱了 —— 全体代数整数构成的环里没有不可约元，条件空真成立，却不是 UFD）；② 任意两元素有 $\\gcd$ 是 **gcd 整环**（`def.gcd-domain`）的条件，严格弱于 UFD（本图只给了 UFD $\\implies$ gcd 整环 的方向，即 `imp.ring-ufd-gcd`；反向不成立，例如非离散的赋值环）；③ 没有无限下降的因子链是 **ACCP**，也严格弱于 UFD（$\\mathbb{Z}[\\sqrt{-5}]$ 是 Noether 环、故有 ACCP，却不是 UFD）。',
        '',
        '层级（`imp.ring-euclid-pid` / `imp.ring-pid-ufd`）：Euclid 整环 $\\implies$ PID $\\implies$ UFD $\\implies$ gcd 整环，两个箭头都不可逆（$\\mathbb{Z}[\\sqrt{-5}]$ 连 gcd 都没有；\n\n存在 UFD 不是 PID，如 $K[x, y]$）。',
      ].join('\n\n'),
      refs: ['Atiyah–Macdonald, Ch. 1', 'Kaplansky, Commutative Rings, Ch. 1'],
    },

    {
      id: 'def.comaximal',
      cluster: 'algebra.rings',
      type: 'definition',
      label: '互素理想',
      title: '互素理想：$I + J = A$',
      regions: ['algebra'],
      tags: ['代数', '环论', '理想'],
      statement: [
        '环 $A$ 的两个理想 $I, J$ 叫**互素**，若',
        '',
        '$$I + J = A .$$',
        '',
        '一族理想 $\\{I_{1}, \\cdots, I_{k}\\}$ 叫**两两互素**，若 $i \\ne j$ 时 $I_{i} + I_{j} = A$。',
      ].join('\n'),
      notes: [
        '$A = \\mathbb{Z}$、$I = (m)$、$J = (n)$ 时，$I + J = (m) + (n) = (\\gcd(m, n))$，所以「互素」正是 $\\gcd(m,n) = 1$ —— 中国剩余定理的「两两互素」条件在一般环里的正确说法。',
        '',
        '等价刻画：$I + J = A$ $\\iff$ 存在 $u \\in I$、$v \\in J$ 使 $u + v = 1$（Bézout 的一般形式）。',
        '',
        '互素的一个好用推论：$I \\cap J = IJ$（一般只有 $IJ \\subseteq I \\cap J$）。\n\n证明：$a \\in I \\cap J$，写 $1 = u + v$，则 $a = au + av$，而 $au \\in IJ$（$a \\in J$、$u \\in I$）、$av \\in IJ$（$a \\in I$、$v \\in J$）。',
      ].join('\n\n'),
      refs: ['Atiyah–Macdonald, Ch. 1'],
    },

    {
      id: 'thm.crt-rings',
      cluster: 'algebra.rings',
      type: 'theorem',
      label: '中国剩余定理（环论形式）',
      title: '中国剩余定理：互素理想给出环的直积分解',
      regions: ['algebra'],
      tags: ['代数', '环论', '中国剩余定理', '定理'],
      statement: [
        '设 $I, J$ 是环 $A$ 的两个理想且 $I + J = A$。则',
        '',
        '$$A/(I \\cap J) \\;\\cong\\; A/I \\times A/J, \\qquad a \\longmapsto (a \\bmod I,\\ a \\bmod J) .$$',
        '',
        '更一般地：若 $I_{1}, \\cdots, I_{k}$ 两两互素，则',
        '',
        '$$A\\Big/\\bigcap_{i} I_{i} \\;\\cong\\; \\prod_{i=1}^{k} A/I_{i} .$$',
      ].join('\n'),
      notes: [
        '**构造**：由互素写 $1 = u + v$（$u \\in I$、$v \\in J$），令 $e := v$。则',
        '',
        '$$e \\equiv 0 \\pmod I, \\qquad e \\equiv 1 \\pmod J, \\qquad e^{2} = e .$$',
        '',
        '于是对任意右端 $(x, y)$，元素 $a = x(1-e) + y e$ 满足 $a \\equiv x \\pmod I$、$a \\equiv y \\pmod J$ —— 存在性。唯一性：两解之差被 $I$ 与 $J$ 同时整除，故落在 $I \\cap J$。',
        '',
        '**同构**：由第一同构定理（`thm.first-iso`），核是 $I \\cap J$、商掉即得；满射由上面的构造给出。',
        '',
        '**分母可以写成乘积**：互素时 $I \\cap J = IJ$（见 `def.comaximal`），所以也常写成 $A/IJ \\cong A/I \\times A/J$。',
        '',
        '**与数论的关系**：取 $A = \\mathbb{Z}$、$I = (m)$、$J = (n)$、$\\gcd(m,n) = 1$，就是 `thm.crt`：$\\mathbb{Z}/(mn) \\cong \\mathbb{Z}/m \\times \\mathbb{Z}/n$。\n\n这条环论形式才是它的「正确形状」—— 数论版只是 $A = \\mathbb{Z}$ 的特例。',
      ].join('\n\n'),
      refs: ['Atiyah–Macdonald, Ch. 1', 'Borevich–Shafarevich, Number Theory, Ch. 2'],
    },
  ],

  edges: [

    {id: "e127.definition", kind: 'definition', definition: 'def.ring', usedBy: 'def.int-domain',
      note: '整环是「交换、含幺、无零因子」的环 —— 三个条件全是对 `def.ring` 的追加。' },

    {id: "e128.definition", kind: 'definition', definition: 'def.ring', usedBy: 'def.irreducible-element',
      note: '不可约与素都要「可逆元」和「整除」，两者都只在环里才有意义。' },

    {id: "e129.definition", kind: 'definition', definition: 'def.irreducible-element', usedBy: 'def.ufd',
      note: 'UFD 的定义直接用「不可约元」与「相伴」：分解的唯一性就是在相伴意义下的唯一性。' },

    {id: "e130.definition", kind: 'definition', definition: 'def.int-domain', usedBy: 'def.ufd',
      note: 'UFD 是整环：没有无零因子这个前提，「分解」与「约分」都不成立，唯一性无从谈起。' },

    {id: "e131.definition", kind: 'definition', definition: 'def.int-domain', usedBy: 'def.gcd-domain',
      note: 'gcd 整环是整环：「最大公因子」用整除做下界，而无零因子才使整除正常（$0$ 不做因子）。' },

    {id: "e132.definition", kind: 'definition', definition: 'def.int-domain', usedBy: 'def.euclidean-domain',
      note: 'Euclid 整环是整环，外加一个满足带余除法的欧几里得函数。' },

    {id: "e133.definition", kind: 'definition', definition: 'def.int-domain', usedBy: 'def.bezout-domain',
      note: 'Bézout 整环是整环：条件落在「有限生成理想是主理想」上。' },

    {id: "e134.definition", kind: 'definition', definition: 'def.ideal', usedBy: 'def.pid',
      note: 'PID 的定义就是「每个理想都是主理想」—— 没有理想这个概念写不出来。' },

    {id: "e135.definition", kind: 'definition', definition: 'def.ideal', usedBy: 'def.comaximal',
      note: '互素是理想的加法条件：$I + J = A$。' },

    {id: "e136.definition", kind: 'definition', definition: 'def.ideal', usedBy: 'thm.crt-rings',
      note: '定理的两个对象 $I, J$ 都是理想，商 $A/I$ 是商环。' },

    { id: 'imp.crtr-frac', kind: 'implication', sources: ['thm.first-iso'], target: 'thm.crt-rings',
      title: '第一同构定理给出中国剩余定理的环论形式',
      proof: '考虑 $\\varphi: A \\to A/I \\times A/J$，$a \\mapsto (a \\bmod I,\\ a \\bmod J)$，它是环同态。核 $\\ker\\varphi = I \\cap J$。由第一同构定理，$A/(I \\cap J) \\cong \\operatorname{im}\\varphi$；再由互素 $I+J=A$ 写出 $1 = u+v$（$u\\in I$、$v\\in J$），对任意 $(x,y)$ 取 $a = xv + yu$ 即得 $a\\equiv x \\pmod I$、$a \\equiv y \\pmod J$，故 $\\varphi$ 满射、$\\operatorname{im}\\varphi = A/I\\times A/J$。合起来 $A/(I\\cap J)\\cong A/I\\times A/J$；两两互素的情形对 $k$ 归纳。∎',
      note: '第一同构定理提供「商掉核」这一步；满射性不用它，用互素给出的显式构造。' },

    {id: "e137.definition", kind: 'definition', definition: 'def.ufd', usedBy: 'thm.fundamental-arithmetic',
      note: '算术基本定理就是「$\\mathbb{Z}$ 是 UFD」这句话在整数上的展开。' },

    {id: "e138.definition", kind: 'definition', definition: 'def.ufd', usedBy: 'thm.poly-ufd',
      note: '$K[x]$ 是 UFD —— 定理本身是在验证这个定义。' },

    {id: "e139.definition", kind: 'definition', definition: 'def.euclidean-domain', usedBy: 'thm.division-algorithm',
      note: '$K[x]$ 的带余除法正是「$N = \\deg$ 的欧几里得函数」，这条定理是 Euclid 整环的一个实例。' },

    {
      id: 'imp.ring-euclid-pid',
      kind: 'implication',
      sources: ['def.euclidean-domain'],
      target: 'def.pid',
      title: 'Euclid 整环 $\\implies$ PID：取范数最小的元素生成理想',
      proof: [
        '设 $A$ 是 Euclid 整环（欧几里得函数 $N$），$I \\trianglelefteq A$ 是非零理想 $I \\ne 0$。',
        '',
        '在 $I$ 中取 $N$ 最小的非零元 $b$（$\\mathbb{N}$ 良序，故存在）。',
        '',
        '对任意 $a \\in I$ 做带余除法：$a = qb + r$，$r = 0$ 或 $N(r) < N(b)$。\n\n注意 $r = a - qb \\in I$（$a, b \\in I$），而 $b$ 的 $N$ 在 $I \\setminus \\{0\\}$ 里最小，故 $N(r) < N(b)$ 不可能 —— 只能 $r = 0$。',
        '',
        '于是 $a = qb \\in (b)$，即 $I \\subseteq (b)$；反向 $(b) \\subseteq I$ 显然。故 $I = (b)$ 是主理想，$A$ 是 PID。',
      ].join('\n\n'),
    },

    {
      id: 'imp.ring-pid-ufd',
      kind: 'implication',
      sources: ['def.pid'],
      target: 'def.ufd',
      title: 'PID $\\implies$ UFD：升链条件给存在性，不可约=素给唯一性',
      proof: [
        '**存在性**（分解不能无限细）：若某个非零非单位元 $a$ 写不成有限乘积，则可写 $a = a_{1}b_{1}$ 且两者都非单位，对其一继续拆 —— 得到严格上升的理想链 $(a) \\subset (a_{1}) \\subset (a_{2}) \\subset \\cdots$。\n\n其并 $I = \\bigcup (a_{i})$ 是理想，PID 给出 $I = (d)$，于是 $d \\in (a_{n})$ 对某个 $n$ 成立，链在 $n$ 停止 —— 与「能无限拆」矛盾。',
        '',
        '**不可约 = 素**（PID 里）：设 $p$ 不可约且 $p \\mid ab$。\n\n' +
        '理想 $(p, a)$ 是主理想，记作 $(d)$，则 $d \\mid p$；$p$ 不可约给出 $d \\sim 1$ 或 $d \\sim p$。\n\n' +
        '若 $d \\sim p$，则 $p \\mid a$，完事；\n\n' +
        '若 $d \\sim 1$，则 $(p, a) = A$，写 $1 = up + va$，乘 $b$ 得 $b = upb + vab$，而 $p \\mid ab$，故 $p \\mid b$。',
        '',
        '**唯一性**：两个分解的素因子逐个用「素元整除乘积必整除某个因子」配对，约掉后归纳即得。所以 PID 是 UFD。',
      ].join('\n\n'),
    },

    {
      id: 'imp.ring-ufd-gcd',
      kind: 'implication',
      sources: ['def.ufd'],
      target: 'def.gcd-domain',
      title: 'UFD $\\implies$ gcd 整环：取公共素因子指数的最小值',
      proof: [
        '设 $A$ 是 UFD，$a, b$ 非零。把两者写成不可约元的乘积，按相伴类归并：',
        '',
        '$$a \\sim \\prod_{i} p_{i}^{\\,m_{i}}, \\qquad b \\sim \\prod_{i} p_{i}^{\\,n_{i}} .$$',
        '',
        '（只保留在两者中至少一个里出现的 $p_{i}$。）',
        '',
        '令 $d := \\prod_{i} p_{i}^{\\,\\min(m_{i}, n_{i})}$。则 $d \\mid a$ 且 $d \\mid b$，故 $d$ 是公因子。',
        '',
        '反之设 $c \\mid a$、$c \\mid b$。把 $c$ 分解，每个不可约因子 $q \\mid c$ 都整除 $a$，而 UFD 里不可约即素，故 $q$ 与某个 $p_{i}$ 相伴，且它在 $c$ 里的重数 $\\le \\min(m_{i}, n_{i})$。于是 $c \\mid d$。',
        '',
        '所以 $d$ 是「被一切公因子整除」的那个公因子 —— 即 $\\gcd$。UFD 是 gcd 整环。',
      ].join('\n\n'),
    },

    {
      id: 'imp.ring-bezout-gcd',
      kind: 'implication',
      sources: ['def.bezout-domain'],
      target: 'def.gcd-domain',
      title: 'Bézout 整环 $\\implies$ gcd 整环：gcd 由线性组合直接给出',
      proof: [
        '设 $A$ 是 Bézout 整环。取 $a, b \\in A$，则理想 $(a, b)$ 是主理想，写 $(a, b) = (d)$。',
        '',
        '由 $a \\in (d)$、$b \\in (d)$ 得 $d \\mid a$、$d \\mid b$；由 $d \\in (a, b)$ 得存在 $u, v$ 使 $d = ua + vb$。',
        '',
        '若 $c \\mid a$、$c \\mid b$，则 $c \\mid ua + vb = d$。所以 $d$ 是被一切公因子整除的公因子 —— 即 $\\gcd(a,b)$。故 $A$ 是 gcd 整环。',
        '',
        '（这也说明 Bézout 整环里 Euclid 引理可以直接搬：$p \\mid ab$ 时取 $(p, a) = (d)$ 论证，与 PID 的证明一字不差。）',
      ].join('\n\n'),
    },

    {id: "e140.analogy", kind: 'analogy', a: 'thm.crt', b: 'thm.crt-rings',
      title: '中国剩余定理：数论版是环论版在 $\\mathbb{Z}$ 上的样子',
      note: [
        '两边的陈述结构相同：模数互素 $\\implies$ 商环分解成直积。',
        '',
        '数论版的「$n_{i}$ 两两互素」= 环论版的「理想两两互素 $I_{i} + I_{j} = A$」（因为 $(m) + (n) = (\\gcd(m,n))$）；数论版的 $N = n_{1}\\cdots n_{k}$ = 环论版的 $\\bigcap I_{i}$（互素时等于乘积 $I_{1}\\cdots I_{k}$）。',
        '',
        '差异只在证明工具：数论版用 Bézout 造 $e_{i}$，环论版用「$1 = u + v$」造幂等元 $e$ —— 其实是同一件事。',
      ].join('\n\n'),
    },

    {id: "e141.analogy", kind: 'analogy', a: 'thm.bezout', b: 'def.bezout-domain',
      title: 'Bézout 恒等式：从 $\\mathbb{Z}$ 上的定理升级为一个环类',
      note: [
        '数论版的 Bézout 说「$\\gcd(a,b)$ 是 $a,b$ 的整系数组合」，这需要 $\\mathbb{Z}$ 的特殊性（Euclid 算法）。',
        '',
        '把它当作**公理式的性质**来定义一个环类，就是 Bézout 整环：每个有限生成理想都是主理想。$\\mathbb{Z}$、$K[x]$ 满足；$\\mathbb{Z}[x]$ 不满足（$\\gcd(2,x)=1$ 却不是线性组合）。',
        '',
        '所以「Bézout」在图里出现两次是对的：一次是 $\\mathbb{Z}$ 上的定理，一次是整环上的类名 —— 后者包含了前者，也包含了 $K[x]$。',
      ].join('\n\n'),
    },
  ],
});
