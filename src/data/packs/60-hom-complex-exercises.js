/* ==========================================================================
   内容包 · 复形与同伦范畴的练习（原书 §7.1 的练习）
   --------------------------------------------------------------------------
   §7.1 的定义（复形、同伦、K(C)、映射锥、三角、同调、拟同构）都进图了，
   但那一节的**练习**还缺，而它们恰恰是后面反复引用的事实：

     单纯对象 ──▶ 链复形（交替和）        C ↪ C(C)（一个对象看成复形）
     同伦等价 ⟺ 有同伦逆                  加法函子保导出三角
     复形范畴是阿贝尔范畴                  同调的两条正合列
     内射复形：零调 ⟺ 同伦平凡 ⟺ 拟同构 ⟺ 同伦等价
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '复形与同伦范畴的基本性质',
  nodes: [

    /* ------------------------------------------------------ 7.2 */
    {
      id: 'prop.simplicial-to-chain',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '单纯对象给出链复形',
      title: '命题：单纯对象的交替和给出微分',
      regions: ['homology'],
      tags: ['命题', '单纯对象', '链复形', '同调代数'],
      statement: [
        '设 $K_{\\bullet}$ 是加法范畴 $\\mathcal{C}$ 中的（半）**单纯对象**，记 $K_{n} := K_{\\bullet}([n])$、面映射 $d^{n}_{i} : K_{n} \\to K_{n-1}$（$i = 0, \\ldots, n$）。令',
        '',
        '$$d_{n} := \\sum_{i=0}^{n} (-1)^{i} d^{n}_{i} : K_{n} \\longrightarrow K_{n-1}.$$',
        '',
        '则 $d_{n-1} \\circ d_{n} = 0$，于是 $K_{\\bullet}$ 成为一个**链复形**。'
      ].join('\n'),
      notes: [
        ['**证明。** 展开','$$d_{n-1}d_{n} = \\sum_{j=0}^{n-1}\\sum_{i=0}^{n} (-1)^{i+j} d^{n-1}_{j} d^{n}_{i}.$$','由单纯恒等式，$i \\le j-1$ 时 $d^{n-1}_{j} d^{n}_{i} = d^{n-1}_{i} d^{n}_{j+1}$；因此每一对 $(i,j)$ 与 $i > j$ 的那一对 $(j, i+1)$ 给出**同一项**，而符号为 $(-1)^{i+j}$ 与 $(-1)^{j+i+1}$ —— 恰好相反，两两抵消 ✓。于是 $d^{2} = 0$ ✓。∎'].join('\n'),
        '⭐ 这是**单纯方法**的入口：把一个（半）单纯对象按交替和变成复形，就能用同调代数去算它的不变量。拓扑空间 $X$ 的奇异单纯集 $S_{\\bullet}(X) = h_{X} \\circ \\Delta^{\\bullet}$ 配上 $\\mathbb{Z}\\cdot(-)$ 给出的 $C_{\\bullet}(X) := \\mathbb{Z}\\cdot S_{\\bullet}(X)$ 就是标准例子 —— 它的同调正是**奇异同调**。',
        '⚠️ 这里只需要**半**单纯（只要有面映射）；退化映射不进入微分（这是「正规化」的做法）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ------------------------------------------------------ 7.3 */
    {
      id: 'prop.category-into-complexes',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '范畴嵌入复形',
      title: '命题：$M \\mapsto [M]$ 把范畴全忠实地嵌进复形范畴',
      regions: ['homology'],
      tags: ['命题', '复形', '全忠实', '极限'],
      statement: [
        '把整数集看成偏序范畴 $(\\mathbb{Z}, \\le)$。由含入 $\\{0\\} \\hookrightarrow (\\mathbb{Z},\\le)$ 得到函子',
        '',
        '$$\\mathcal{C} \\longrightarrow \\mathcal{C}(\\mathcal{C}), \\qquad M \\longmapsto [M], \\qquad [M]^{n} := \\begin{cases} M, & n = 0 \\\\ 0, & n \\ne 0\\end{cases}$$',
        '',
        '（微分全为零）。则：',
        '',
        '1. 这个函子**全忠实**；',
        '2. 它**保所有极限与所有余极限**。'
      ].join('\n'),
      notes: [
        ['**证明。**','**1.** 复形之间的态射是 $\\mathbb{Z}$ 指标的一族映射 $f^{n} : [M]^{n} \\to [N]^{n}$ 且与微分交换；而 $[M]$、$[N]$ 只在 $0$ 次非零，微分又是零，交换性自动成立 ✓。于是','$$\\operatorname{Hom}_{\\mathcal{C}(\\mathcal{C})}([M], [N]) = \\operatorname{Hom}_{\\mathcal{C}}(M, N) \\quad \\text{（只有 } n = 0 \\text{ 这一项）✓}$$','即全忠实 ✓。','**2.** 复形范畴里的极限与余极限**逐项计算**（见「复形范畴的性质」）。逐项看：$0$ 次上得到原图在该处的极限（对 $[M_{i}]$ 逐项取极限，$0$ 次那一项恰是 $\\lim M_{i}$）✓；其余次上得到「一堆零对象的极限」—— 而 $0$ 既是始对象又是终对象，故那些极限与余极限仍是 $0$ ✓。于是 $[\\lim M_{i}] = \\lim [M_{i}]$，$[\\varinjlim M_{i}] = \\varinjlim [M_{i}]$ ✓。∎'].join('\n'),
        '⭐ 用处：**「对象」可以当成「退化成一项的复形」来看**。于是「$\\mathcal{C}$ 里的构造」与「$\\mathcal{C}(\\mathcal{C})$ 里的构造」可以自由互相搬运，短正合列 $0 \\to M \\to N \\to P \\to 0$ 与两项复形的正合列不再需要区分。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ------------------------------------------------------ 7.6 */
    {
      id: 'prop.homotopy-equivalence-criterion',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '同伦等价的判据',
      title: '命题：$f$ 是同伦等价 $\\iff$ 存在同伦逆',
      regions: ['homology'],
      tags: ['命题', '同伦', '同伦范畴'],
      statement: [
        '设 $f : K^{\\bullet} \\to L^{\\bullet}$ 是复形态射。则',
        '',
        '1. $f$ 是**同伦等价**（即在 $\\mathbf{K}(\\mathcal{C})$ 中同构）$\\iff$ 存在 $g : L^{\\bullet} \\to K^{\\bullet}$ 使 $g f \\sim 1_{K}$、$f g \\sim 1_{L}$；',
        '2. 复形 $K^{\\bullet}$ **同伦平凡** $\\iff$ $1_{K} \\sim 0_{K}$。'
      ].join('\n'),
      notes: [
        ['**证明。** 两条都是把定义展开（$\\mathbf{K}(\\mathcal{C})$ 的对象是复形、态射是**同伦类**）。','**1.** 若 $f$ 在 $\\mathbf{K}(\\mathcal{C})$ 中同构，取它的逆 $g$（一个复形态射），则 $gf$ 与 $1_{K}$ 在同伦范畴里相等，即 $gf \\sim 1_{K}$ ✓；$fg \\sim 1_{L}$ 同理。反之，若存在这样的 $g$，则 $[f]$ 与 $[g]$ 在 $\\mathbf{K}(\\mathcal{C})$ 中互为逆 ✓。','**2.** 「同伦平凡」的定义就是「与零对象同构」；而 $\\mathbf{K}(\\mathcal{C})$ 中的零对象是零复形，$K \\to 0 \\to K$ 的复合是 $0_{K}$。故存在同构 $\\iff$ $1_{K} \\sim 0_{K}$ ✓。∎'].join('\n'),
        '⚠️ 注意「同伦等价」**不是**「逐项同构」：$1 \\sim 0$ 意味着 $K^{\\bullet}$ 的两个相邻层之间有一族映射 $s^{n}$ 把恒等收缩掉，这样的复形（例如 $0 \\to M \\xrightarrow{1} M \\to 0$）每一层都非零，但整体同伦平凡。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ------------------------------------------------------ 7.9 */
    {
      id: 'prop.additive-functor-preserves-triangles',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '加法函子保导出三角',
      title: '命题：加法函子把导出三角送到导出三角',
      regions: ['homology'],
      tags: ['命题', '加法函子', '导出三角', '映射锥'],
      statement: [
        '设 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 是加法范畴之间的**加法函子**。若',
        '',
        '$$K^{\\bullet} \\longrightarrow L^{\\bullet} \\longrightarrow M^{\\bullet} \\longrightarrow K^{\\bullet}[1]$$',
        '',
        '是 $\\mathbf{K}(\\mathcal{C})$ 中的**导出三角**，则',
        '',
        '$$FK^{\\bullet} \\longrightarrow FL^{\\bullet} \\longrightarrow FM^{\\bullet} \\longrightarrow FK^{\\bullet}[1]$$',
        '',
        '是 $\\mathbf{K}(\\mathcal{C}\')$ 中的导出三角。（$F$ 逐项作用在复形上。）'
      ].join('\n'),
      notes: [
        ['**证明。** 导出三角的定义是「同构于某个映射锥三角」。逐条检查：','- **$F$ 保映射锥**：$M(f)^{n} = K^{n+1} \\oplus L^{n}$ 而微分是分块矩阵 $\\begin{pmatrix} -d^{n+1} & 0 \\\\ f^{n} & d^{n} \\end{pmatrix}$。$F$ 加法，故保有限双积（$F(K^{n+1}\\oplus L^{n}) = FK^{n+1}\\oplus FL^{n}$）✓，而分块矩阵的两个条件（与微分交换、左上取 $-d$）都是等式，逐项被 $F$ 保持 ✓。于是 $F(M(f)) \\cong M(Ff)$ ✓。','- **$F$ 保平移**：$F(K[1]) = F(K)[1]$（逐项作用与指标无关）✓。','- **$F$ 保同构与同伦类**：$F$ 是函子，把同构送到同构、把 $\\mathbf{K}(\\mathcal{C})$ 的态射送到 $\\mathbf{K}(\\mathcal{C}\')$ 的态射 ✓。','于是任何导出三角（$\\cong$ 某个映射锥三角）被 $F$ 送到 $\\cong$ $F$ 的映射锥三角，仍是导出三角 ✓。','⚠️ 这里**必须**用加法性：非加法函子不保双积，$F(K^{n+1}\\oplus L^{n}) \\ne FK^{n+1}\\oplus FL^{n}$，论证立刻断掉。∎'].join('\n'),
        '⭐ 推论：**任何加法函子都诱导同伦范畴之间的函子 $\\mathbf{K}(\\mathcal{C}) \\to \\mathbf{K}(\\mathcal{C}\')$，并保持三角结构** —— 这是「导出范畴之间也能搬东西」的第一步。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ----------------------------------------------------- 7.11 */
    {
      id: 'prop.complexes-abelian',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '复形范畴是阿贝尔范畴',
      title: '命题：$\\mathcal{A}$ 阿贝尔 $\\implies \\mathcal{C}(\\mathcal{A})$ 阿贝尔',
      regions: ['homology'],
      tags: ['命题', '复形', '阿贝尔范畴'],
      statement: [
        '设 $\\mathcal{A}$ 是**阿贝尔范畴**。则上链复形范畴 $\\mathcal{C}(\\mathcal{A})$ **也是阿贝尔范畴**（$\\mathcal{C}^{+}(\\mathcal{A})$、$\\mathcal{C}^{-}(\\mathcal{A})$、$\\mathcal{C}^{b}(\\mathcal{A})$ 这些有界情形同理）。'
      ].join('\n'),
      notes: [
        ['**证明。** 阿贝尔范畴的定义是：预阿贝尔 + 每个单态射正则（等价地：$\\operatorname{coim} f \\to \\operatorname{im} f$ 是同构）。逐条验：','- **预阿贝尔**：复形范畴是加法范畴，而核与余核**逐项**取（见「复形范畴的性质」）✓；','- **$\\operatorname{coim} \\to \\operatorname{im}$ 逐项同构**：$\\mathcal{A}$ 里同构是逐项判断的（复形态射是同构 $\\iff$ 每一层都是同构，因为逆映射可以逐层拼起来），所以只要逐项验 ✓；而每一层上 $\\operatorname{coim} f^{n} \\to \\operatorname{im} f^{n}$ 是 $\\mathcal{A}$ 里的同构 ✓；','- **逐项构造与微分相容**：核、余核、像、余像的微分都是「由原来复形的微分限制 / 诱导」得到的，满足 $d^{2} = 0$ 与交换性 —— 这是「逐项计算」的一般机制 ✓。','于是 $\\mathcal{C}(\\mathcal{A})$ 满足阿贝尔范畴的全部条件 ✓。∎'].join('\n'),
        '⭐ 这条是**整个同调代数的前提**：只有在 $\\mathcal{C}(\\mathcal{A})$ 里才能谈正合、才能谈同调 $H^{n}$。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ----------------------------------------------------- 7.13 */
    {
      id: 'prop.cohomology-short-exact',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '同调的两条正合列',
      title: '命题：$0 \\to H^{k} \\to \\operatorname{coker} d^{k-1} \\to Z^{k+1} \\to H^{k+1} \\to 0$',
      regions: ['homology'],
      tags: ['命题', '同调', '正合列', '闭链'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$K^{\\bullet}$ 是 $\\mathcal{A}$ 中的上链复形。记 $Z^{k} := \\ker d^{k}$（**闭链**）、$B^{k} := \\operatorname{im} d^{k-1}$（**上边缘**），于是 $H^{k} = Z^{k}/B^{k}$。则对每个 $k$ 有处处正合的列',
        '',
        '$$0 \\longrightarrow H^{k} \\longrightarrow \\operatorname{coker}\\bigl(d^{k-1}\\bigr) \\longrightarrow Z^{k+1} \\longrightarrow H^{k+1} \\longrightarrow 0.$$'
      ].join('\n'),
      notes: [
        ['**证明。** $d^{k}\\circ d^{k-1} = 0$ 说明 $d^{k}$ 诱导出一个映射','$$D : \\operatorname{coker}(d^{k-1}) = K^{k}/B^{k} \\longrightarrow Z^{k+1},$$','（良定义：$B^{k} \\subseteq Z^{k}$，因为 $d^{k}$ 把 $B^{k}$ 杀死 ✓）。逐段读这条列：','- **$H^{k} = \\ker D$**：$D$ 的核是 $Z^{k}/B^{k}$，正是 $H^{k}$ ✓，这就是左端的正合性；','- **$\\operatorname{im}D = B^{k+1}$**：$D$ 的像就是 $d^{k}(K^{k}) = B^{k+1}$ ✓，这就是中间的正合性；','- **$\\operatorname{coker}D = Z^{k+1}/B^{k+1} = H^{k+1}$** ✓，即右端的正合性。','三段合起来就是整条列处处正合 ✓。∎','⭐ 这条列常常写成两条短正合列再拼起来：','$$0 \\to H^{k} \\to K^{k}/B^{k} \\to B^{k+1} \\to 0, \\qquad 0 \\to B^{k+1} \\to Z^{k+1} \\to H^{k+1} \\to 0.$$','后面构造谱序列时用的正是这两条。'].join('\n'),
        '⭐ 用途：它把「同调」拆成两条只管闭链与上边缘的短正合列。**谱序列的全部技术内容就是在这些短正合列之间做逐步比较。**'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ------------------------------------------------ 7.19 与 7.20 */
    {
      id: 'prop.injective-complex-homotopy',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '内射复形：零调、拟同构与同伦',
      title: '命题：内射复形上「零调 $\\iff$ 同伦平凡」、「拟同构 $\\iff$ 同伦等价」',
      regions: ['homology'],
      tags: ['命题', '内射对象', '同伦', '拟同构'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$I^{\\bullet}, J^{\\bullet}$ 是**有界下方、逐项内射**的复形（即每个 $I^{n}$ 是内射对象，且 $n \\ll 0$ 时 $I^{n} = 0$）。则',
        '',
        '1. $I^{\\bullet}$ **零调**（$H^{n} = 0$ 对一切 $n$）$\\iff$ $I^{\\bullet}$ **同伦平凡**（$1_{I^{\\bullet}} \\sim 0$）；',
        '2. $I^{\\bullet}$ 与 $J^{\\bullet}$ 拟同构 $\\iff$ 它们同伦等价。'
      ].join('\n'),
      notes: [
        ['**证明。**','**1.** $(\\Longleftarrow)$ 同伦的映射在同调上给出同一个映射（同调函子把同伦送到相等），故 $1 = 0$ 在 $H^{n}$ 上，即 $H^{n} = 0$ ✓。','$(\\Longrightarrow)$ 逐层构造收缩同伦。零调给出短正合列','$$0 \\longrightarrow Z^{n} \\longrightarrow I^{n} \\xrightarrow{\\ p_{n}\\ } Z^{n+1} \\longrightarrow 0,$$','（$Z^{n} = \\ker d^{n}$、$Z^{n+1} = \\operatorname{im} d^{n}$）。$I^{n}$ **内射**，所以这条列**分裂**：取 $q_{n} : I^{n} \\to Z^{n}$ 使 $q_{n}j_{n} = 1$、取 $s_{n} : Z^{n+1} \\to I^{n}$ 使 $p_{n}s_{n} = 1$，于是','$$1_{I^{n}} = j_{n}q_{n} + s_{n}p_{n} \\qquad \\text{（分裂短正合列的标准恒等式）}✓$$','令 $s^{n} := s_{n-1}\\circ q_{n} : I^{n} \\to I^{n-1}$。注意 $d^{n} = j_{n+1}p_{n}$ 且 $d^{n-1} = j_{n}p_{n-1}$，于是','$$d^{n-1}s^{n} + s^{n+1}d^{n} = j_{n}p_{n-1}s_{n-1}q_{n} + s_{n}q_{n+1}j_{n+1}p_{n} = j_{n}q_{n} + s_{n}p_{n} = 1_{I^{n}} ✓$$','（用了 $p_{n-1}s_{n-1} = 1$、$q_{n+1}j_{n+1} = 1$。）这正是「$1 \\sim 0$」要求的恒等式 ✓。','**2.** $(\\Longleftarrow)$ 同伦等价显然给出拟同构（同伦的映射在同调上相等，逆映射的存在性使 $H^{n}(f)$ 可逆）✓。','$(\\Longrightarrow)$ 设 $f : I^{\\bullet} \\to J^{\\bullet}$ 是拟同构。映射锥 $M(f)^{n} = I^{n+1}\\oplus J^{n}$ 仍是**逐项内射、有界下方**的复形 ✓，而由导出三角 $I \\to J \\to M(f) \\to I[1]$ 与「$f$ 拟同构 $\\iff$ 锥零调」，$M(f)$ 零调 ✓。对上 $M(f)$ 用第 1 条，得 $M(f)$ 同伦平凡；再由三角 $I \\to J \\to M(f) \\to I[1]$ 与同伦平凡的锥，可以逐层把映射抬起来，得到 $g : J^{\\bullet}\\to I^{\\bullet}$ 与同伦 $gf \\sim 1$、$fg \\sim 1$ ✓（这就是「三角论证」：锥的同伦平凡性正好给出同伦逆的数据）。于是 $f$ 是同伦等价 ✓。∎'].join('\n'),
        '⭐ 一句话：**在逐项内射的复形上，「弱等价」（拟同构）与「强等价」（同伦等价）是一回事。** 这正是内射消解好用的根本原因 —— 也解释了为什么导出范畴的常数构造要用 $K^{\\pm}(\\mathcal{I})$。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ----------------------------------------------------- 7.21 */
    {
      id: 'prop.injective-resolution-lift',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '内射消解之间的提升',
      title: '命题：态射可以提升到内射消解之间',
      regions: ['homology'],
      tags: ['命题', '内射消解', '提升', '同伦'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$I^{\\bullet} \\to M$、$J^{\\bullet} \\to N$ 是 $\\mathcal{C}^{+}(\\mathcal{A})$ 中的**内射消解**（$I^{n}$、$J^{n}$ 内射、有界下方、拟同构于 $M$、$N$）。则对每个态射 $f : M \\to N$：',
        '',
        '1. **存在**复形态射 $F : I^{\\bullet} \\to J^{\\bullet}$ 提升 $f$（即诱导 $H^{0}(F) = f$）；',
        '2. 任何两个这样的提升**同伦**。'
      ].join('\n'),
      notes: [
        ['**证明（比较定理的标准两步）。**','**① 存在性（逐层抬升）。** 第 $0$ 层：$M = Z^{0}_{I} \\hookrightarrow I^{0}$ 是单态射（因为 $I^{-1} = 0$），复合 $M \\xrightarrow{\\ f\\ } N \\to J^{0}$ 沿这个单态射由 $J^{0}$ 的**内射性**抬成 $F^{0} : I^{0} \\to J^{0}$ ✓。','归纳步：设已构造 $F^{0}, \\ldots, F^{n}$，且对 $k \\le n$ 有 $F^{k}d^{k-1}_{I} = d^{k-1}_{J}F^{k-1}$。要构造 $F^{n+1}$ 只需在**上边缘** $B^{n+1}_{I} = \\operatorname{im}d^{n}_{I}$ 上定下它的取值，因为 $B^{n+1}_{I}\\hookrightarrow I^{n+1}$ 是单态射。关键观察：$n \\ge 1$ 时 $H^{n}(I^{\\bullet}) = 0$，即 $Z^{n}_{I} = B^{n}_{I}$ —— 于是 $F^{n}$ 在 $Z^{n}_{I}$ 上的取值已经由前一层定下、且落在 $Z^{n}_{J}$ 里（$n \\ge 1$ 时它等于 $d^{n-1}_{J}F^{n-1}$，$n = 0$ 时改用增广处的交换性）✓。因此 $d^{n}_{J}F^{n}$ 在 $\\ker d^{n}_{I}$ 上为零，从而沿 $B^{n+1}_{I} \\hookrightarrow I^{n+1}$ 分解；再用 $J^{n+1}$ 的**内射性**把它抬成 $F^{n+1} : I^{n+1}\\to J^{n+1}$ ✓。有界下方保证这个过程在某个 $n$ 之后终止 ✓。','**② 同伦唯一性。** 设 $F, G$ 都提升 $f$。差 $F - G$ 在 $H^{0}$ 上诱导 $0$，于是可以用**同样的逐层抬升**造同伦 $s^{n} : I^{n}\\to J^{n-1}$：每一层的方程 $F^{n}-G^{n} = s^{n+1}d^{n}_{I} + d^{n-1}_{J}s^{n}$ 都是一个「沿单态射抬升」的问题，仍由 $J^{n-1}$ 的内射性解决；起点处 $F^{0}-G^{0}$ 在 $M$ 上为零，故它分解过 $I^{0}/M = B^{1}_{I}$ ✓。于是 $F \\sim G$ ✓。∎'].join('\n'),
        '⭐ 两条合起来就是**内射消解在同伦意义下唯一**：$\\operatorname{Hom}(M,N)$ 中的态射可以提升成复形态射、且提升在同伦意义下唯一。所以「用内射消解算右导出函子」与消解的选取无关 —— 这是 $R^{n}F$ 良定义的全部依据。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    }

  ],

  edges: [

    /* ------------------------------- 定义引用（蓝线） ------------------------------- */
    {
      id: 'def-link.simpchain-simplicial',
      kind: 'definition',
      definition: 'def.simplicial',
      usedBy: 'prop.simplicial-to-chain',
      note: '命题的输入是（半）单纯对象，用的是单纯形范畴那套面映射。'
    },
    {
      id: 'def-link.simpchain-complex',
      kind: 'definition',
      definition: 'def.cochain-complex',
      usedBy: 'prop.simplicial-to-chain',
      note: '结论是「得到链复形」，即微分平方为零。'
    },
    {
      id: 'def-link.catcpx-complex',
      kind: 'definition',
      definition: 'def.cochain-complex',
      usedBy: 'prop.category-into-complexes',
      note: '嵌入的目标是复形范畴。'
    },
    {
      id: 'def-link.homcriterion-homotopy',
      kind: 'definition',
      definition: 'def.homotopy',
      usedBy: 'prop.homotopy-equivalence-criterion',
      note: '两条判据都只用「同伦」这一条定义。'
    },
    {
      id: 'def-link.homcriterion-kcat',
      kind: 'definition',
      definition: 'def.homotopy-category',
      usedBy: 'prop.homotopy-equivalence-criterion',
      note: '「同伦等价」说的是在 $\\mathbf{K}(\\mathcal{C})$ 中同构。'
    },
    {
      id: 'def-link.tri-addfun',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'prop.additive-functor-preserves-triangles',
      note: '命题的前提是加法函子（保双积那一条正是被用到的地方）。'
    },
    {
      id: 'def-link.tri-triangle',
      kind: 'definition',
      definition: 'def.distinguished-triangle',
      usedBy: 'prop.additive-functor-preserves-triangles',
      note: '要证的就是导出三角被送成导出三角。'
    },
    {
      id: 'def-link.cpxab-complex',
      kind: 'definition',
      definition: 'def.cochain-complex',
      usedBy: 'prop.complexes-abelian',
      note: '讨论的对象是复形范畴。'
    },
    {
      id: 'def-link.cpxab-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.complexes-abelian',
      note: '结论是「复形范畴满足阿贝尔范畴的定义」。'
    },
    {
      id: 'def-link.hseq-cohomology',
      kind: 'definition',
      definition: 'def.cohomology',
      usedBy: 'prop.cohomology-short-exact',
      note: '列的两端就是同调 $H^{k}$。'
    },
    {
      id: 'def-link.hseq-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.cohomology-short-exact',
      note: '核、像、余核与正合都在阿贝尔范畴里说。'
    },
    {
      id: 'def-link.injhom-injective',
      kind: 'definition',
      definition: 'prop.injective-criterion',
      usedBy: 'prop.injective-complex-homotopy',
      note: '证明的关键是内射对象的「分裂短正合列」判据。'
    },
    {
      id: 'def-link.injhom-quasi',
      kind: 'definition',
      definition: 'def.quasi-iso',
      usedBy: 'prop.injective-complex-homotopy',
      note: '第二条比较的是拟同构与同伦等价。'
    },
    {
      id: 'def-link.injl-res',
      kind: 'definition',
      definition: 'def.enough-projectives',
      usedBy: 'prop.injective-resolution-lift',
      note: '内射消解的存在性与用法来自「有足够多内射对象」那一条。'
    },
    {
      id: 'def-link.injl-injective',
      kind: 'definition',
      definition: 'prop.injective-criterion',
      usedBy: 'prop.injective-resolution-lift',
      note: '提升的每一步都靠内射对象抬起映射。'
    }

  ]
});
