/* ==========================================================================
   内容包 · 补洞：上同调类 · 零调复形 · 紧化 / 一点紧化 · 网 · 滤子
   --------------------------------------------------------------------------
   用户：「补吧」—— 承接上一轮我用 `_tools/_deadref2.mjs` 扫出来的缺口清单：
     · 上同调类（只在 6-函子那类正文里被提到）
     · 零调（只有 `def.f-acyclic`「$F$-零调对象」，那是**相对函子**的版本）
     · 紧化（只有 `prop.chaus-reflective` 的正文提到 Stone–Čech 紧化）
     · 网 / 滤子的收敛刻画（全库 0 命中，一般拓扑里描述收敛的标准工具）

   归属：
     · hom.cohomology（7 → 8）：上同调类
     · hom.complex（37 → 38）：零调复形
     · topology.general（33 → 37）：紧化、一点紧化、网、滤子
       ⚠️ 该团到 37 了，接近 40 的上限；再加这一侧的内容要考虑拆团。

   ⚠️ 层号提示：网 / 滤子只依赖拓扑空间与连续映射，所以落在很浅的层（L6–7）。
      紧化依赖紧（L14）与局部紧（L15），比分离公理那一串低 —— 这是对的，
      别去「修」它。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '上同调类 · 零调复形 · 紧化 · 网 · 滤子',

  nodes: [

    {
      id: 'def.cohomology-class',
      cluster: 'hom.cohomology',
      type: 'definition',
      label: '上同调类',
      title: '上同调类：闭链模掉边缘',
      regions: ['homology'],
      tags: ['定义', '同调代数', '上同调类', '闭链', '同调'],
      statement: [
        '**在做什么**：同调群 $H^{n} = Z^{n}/B^{n}$ 的**元素**。它是同调代数里真正被搬运、被比较的对象 —— 定理说得再好，最后总是落在一句「这两个上同调类相等」。',
        '',
        '设 $K$ 是复形。对闭链 $z \\in Z^{n}(K)$，它在商里的像',
        '',
        '$$[z] := z + B^{n}(K) \\in H^{n}(K)$$',
        '',
        '叫 $z$ 的**上同调类**（cohomology class），$z$ 叫它的**代表**（representative）。',
        '',
        '**相等判据**：$[z] = [z\']$ $\\iff$ $z - z\' \\in B^{n}(K)$，即两者相差一个**上边缘**。特别地',
        '',
        '$$[z] = 0 \\iff z \\ \\text{是上边缘} .$$',
        '',
        '所以「$H^{n} = 0$」这句话的完整意思是：**每个闭链都恰当**（每个上同调类都是零类）。'
      ].join('\n'),
      notes: [
        '⭐ **类 $\\ne$ 代表**：同一个上同调类有无穷多个代表（差任意上边缘）。所有关于类的运算都必须先验证「换代表不改变结果」—— 这就是同调代数里每一次「良定义性」检查的来源。模掉 $B^{n}$ 的唯一目的就是让这种检查变成一句话。',
        '**几何含义**：de Rham 情形下 $[\\omega] \\in H^{k}_{dR}(M)$ 是「$\\omega$ 的积分只依赖同调类」的那一半 —— Stokes 定理说 $\\int_{c} \\omega$ 在 $\\omega \\mapsto \\omega + d\\eta$ 与 $c \\mapsto c + \\partial b$ 下都不变，于是它其实是**上同调类与同调类的配对** $H^{k} \\times H_{k} \\to \\mathbb{R}$。\n\n这条配对是 de Rham 定理的骨架。',
        '⚠️ **记号**：$[z]$ 与 $\\bar z$ 都在用；有文献用 $\\{z\\}$。⚠️ 与「同调类」$[z] \\in H_{n}$ 只差上下标，写证明时务必标清楚 $H^{n}$ 还是 $H_{n}$ —— 这是同调代数最常见的低级错误来源。',
        '⚠️ 本图不单独收录「同调类」：它是同一个定义在链复形一侧的写法（下标换成上标），与 `def.cycle` / `def.boundary` 同一个口径 —— 不为一个上标差异开第二个节点。'
      ].join('\n\n'),
      refs: [
        'Le Stum, An introduction to condensed mathematics（⚠️ 章节未核实，只记书名）· 复形与同调',
        'Weibel, An Introduction to Homological Algebra（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.acyclic-complex',
      cluster: 'hom.complex',
      type: 'definition',
      label: '零调复形',
      title: '零调复形：同调处处为零',
      regions: ['homology'],
      tags: ['定义', '同调代数', '零调', '正合', '消解'],
      statement: [
        '**在做什么**：把「没有洞」翻译成复形的语言。零调 = 每个闭链都是边缘 —— 于是「用零调复形去算同调」这个想法（消解）才有意义。',
        '',
        '设 $K$ 是复形。称 $K$ **零调**（acyclic），若',
        '',
        '$$H^{n}(K) = 0 \\qquad \\text{对一切}\\ n .$$',
        '',
        '**等价说法**：$K$ 在每个位置都**正合**，即 $\\ker d^{n} = \\operatorname{im} d^{n-1}$ 对一切 $n$（`def.exact-sequence`）。所以零调 $\\iff$ 处处正合。',
        '',
        '**变体（最常用）**：若 $H^{n}(K) = 0$ 只对 $n \\ne 0$ 成立（$n = 0$ 处可以非零），也叫**零调**（除一处之外）—— 这正是**消解**的情形：消解就是把一个对象换成「除了 $0$ 次都零调」的复形。'
      ].join('\n'),
      notes: [
        '⚠️ **两种含义要分清**：绝对的「零调复形」（$H^{n}$ 全为 $0$）与 $F$-相对的「$F$-零调**对象**」（`def.f-acyclic`，要求 $R^{n}F(M) = 0$ 对 $n \\ne 0$）。\n\n后者是对**函子**说的、前者是对**复形**说的。\n\n两者的联系正是「用 $F$-零调对象作消解，$RF$ 可以用 $F$ 直接算」（因为零调消解上的导出函子退化）。',
        '⭐ **为什么零调复形有用**：它让「上同调」变成**可计算的**。\n\n给定 $M$，造一个零调的复形 $\\cdots \\to I^{1} \\to I^{0} \\to M \\to 0$（右消解），则 $R^{n}F(M) = H^{n}(F(I^{\\bullet}))$ —— 也就是说，把 $F$ 逐项作用到一个「本身没有同调」的复形上，剩下的同调**全部**是 $M$ 的信息。\n\n这是导出函子整套机器的技术核心。',
        '⚠️ **零调不等于可缩**：零调说的是同调为 $0$，可缩说的是复形同伦等价于 $0$（更强）。存在零调但不与 $0$ 同伦等价的复形（例如带分歧的无界复形）—— 差别在于 $\\ker d^{n} \\to \\operatorname{im}$ 的「分裂」是否自然。本图不展开。',
        '⭐ **拓扑版**：空间 $X$ 的**奇异链复形**零调 $\\iff$ $X$ 可缩到一点？不是 —— 那是「约化同调全为 $0$」，即 $X$ 零调（acyclic space）。所以同一个词在空间上也有对应物：零调空间（同调同于一点，但不必同伦于一点）。'
      ].join('\n\n'),
      refs: [
        'Weibel, An Introduction to Homological Algebra（⚠️ 章节未核实，只记书名）· 消解与导出函子',
        'Le Stum, An introduction to condensed mathematics（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.compactification',
      cluster: 'topology.convergence',
      type: 'definition',
      label: '紧化',
      title: '紧化：把空间塞进紧空间里',
      regions: ['topology'],
      tags: ['定义', '拓扑', '紧化', '紧', '稠密'],
      statement: [
        '**在做什么**：把非紧空间「补上一些点」让它变紧，同时不破坏原来的结构。这是把紧性定理搬到非紧空间上的标准手法 —— 先在紧化上做、再把补的点挖掉。',
        '',
        '设 $X$ 是拓扑空间。$X$ 的**紧化**（compactification）是一个紧空间 $Y$ 连同一个嵌入',
        '',
        '$$e : X \\hookrightarrow Y ,$$',
        '',
        '使得像 $e(X)$ 在 $Y$ 中**稠密**（`def.closed-set`）。通常把 $X$ 与 $e(X)$ 等同，直接写 $X \\subseteq Y$、$\\overline{X} = Y$。',
        '',
        '**两个极端**：',
        '',
        '- **一点紧化**：只补**一个**点，$Y$ 最小；',
        '- **Stone–Čech 紧化** $\\beta X$：补的点最多，$Y$ 最大，且满足泛性质（每个到紧 Hausdorff 空间的连续映射唯一地穿过它）。',
        '',
        '**基本事实**：$X$ 有 Hausdorff 紧化 $\\iff$ $X$ 是完全正则的（Tychonoff）。'
      ].join('\n'),
      notes: [
        '⭐ **为什么要求稠密**：否则「补点」可以乱补 —— 取 $Y = X \\sqcup \\{*\\}$（$*$ 是孤立点）永远是紧化，毫无信息。稠密性保证 $Y$ 里**没有多余的孤立点**，每一点都由 $X$ 逼近而来。',
        '⭐ **紧化 = 「紧 Hausdorff 反射」的几何形态**：`prop.chaus-reflective` 里的 $\\beta X$ 就是 Stone–Čech 紧化，泛性质说的是「$\\beta$ 是**反射**」（从 Top 到紧 Hausdorff 的自由函子）。所以「最大紧化」这个说法与「左伴随」是同一件事。',
        '⚠️ **存在性不是白给的**：$X$ 要能嵌进**紧 Hausdorff** 空间，$X$ 必须是完全正则的（$T_{3.5}$ + $T_{1}$，见 `def.completely-regular-space`）。\n\n反过来有 Tychonoff 定理（嵌入方体）保证 $\\beta X$ 存在。\n\n所以「每个空间都有 Hausdorff 紧化」是**假**的，而「每个空间都有一点紧化」也是假的 —— 一点紧化要**局部紧**。',
        '⚠️ **紧化不唯一**，所以谈「紧化」时通常按大小排序（部分序：$Y_{1} \\le Y_{2}$ 若存在连续满射 $Y_{2} \\to Y_{1}$ 固定 $X$）。一点紧化是最小元，$\\beta X$ 是最大元。',
        ,
        '**各方向用到的假设**（紧化的数据与 Hausdorff 紧化的存在性分开）：\n' +
        '- 紧化 $\\iff$ 到紧空间的稠密嵌入：定义展开免费；连续单射不能代替嵌入，稠密也不保证紧性。\n' +
        '- 有 Hausdorff 紧化 $\\implies$ Tychonoff：用紧 Hausdorff 空间完全正则且 Hausdorff，以及这些性质对子空间遗传。\n' +
        '- Tychonoff $\\implies$ 有 Hausdorff 紧化：用连续函数嵌入方体、Tychonoff 乘积紧性及取闭包；标准 ZFC 证明涉及选择原理。\n' +
        '- 非紧 Hausdorff 空间有 Hausdorff 一点紧化 $\\iff$ 局部紧：这是额外定理；$\\mathbb Q$ 非局部紧，不能作 Hausdorff 一点紧化。非 Hausdorff 的紧化不能套用此限制。\n' +
        '- 原注所说任意 $X\\sqcup\\{*\\}$ 都紧不成立：无限离散 $X$ 的这个不交并仍不紧。\n'
      ].join('\n\n'),
      refs: [
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）· 紧化',
        'Munkres, Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.one-point-compactification',
      cluster: 'topology.convergence',
      type: 'definition',
      label: '一点紧化',
      title: '一点紧化：只补一个无穷远点',
      regions: ['topology'],
      tags: ['定义', '拓扑', '一点紧化', 'Alexandrov', '局部紧'],
      statement: [
        '**在做什么**：最省的一点补法 —— 加**一个**点 $\\infty$，让每个跑向无穷的序列都收敛到它。$\\mathbb{R}^{n}$ 变成 $S^{n}$、$\\mathbb{C}$ 变成 Riemann 球面，都是这个构造。',
        '',
        '设 $X$ 是拓扑空间。取 $X^{*} := X \\sqcup \\{\\infty\\}$，赋拓扑：开集是',
        '',
        '1. $X$ 中的开集；',
        '2. 形如 $U \\cup \\{\\infty\\}$ 的集合，其中 $U \\subseteq X$ 开且 $X \\setminus U$ 在 $X$ 中**紧**。',
        '',
        '称 $X^{*}$ 为 $X$ 的**一点紧化**（one-point compactification，也叫 Alexandrov 紧化）。',
        '',
        '**定理**：',
        '',
        '- $X^{*}$ **紧**（对任意 $X$）；',
        '- $X^{*}$ **Hausdorff** $\\iff$ $X$ 是局部紧的 Hausdorff 空间（`def.locally-compact`）。'
        ,
        '**两条结论的依赖完全不同**（这也是它值得单列的原因）：\n' +
        '\n' +
        '- **$X^{*}$ 紧：不需要任何假设**。任取 $X^{*}$ 的开覆盖，必有一个成员含 $\\infty$（记 $U\\cup\\{\\infty\\}$），于是 $X\\setminus U$ 紧；它被剩下的开集盖住，由**紧性**取有限子覆盖，加上 $U\\cup\\{\\infty\\}$ 本身即得有限子覆盖。整段只用「紧集的开覆盖有有限子覆盖」这一条，**没用 Hausdorff、没用局部紧**。\n' +
        '- **$X^{*}$ Hausdorff $\\iff$ $X$ 局部紧 Hausdorff**：两个方向都要付出代价。\n' +
        '  $\\cdot$ ($\\Leftarrow$) 要用**局部紧**：任取 $x \\in X$，把它与 $\\infty$ 分开需要「$x$ 的紧邻域 $K$」，于是 $X\\setminus K$ 开、$K^{\\circ}$ 是 $x$ 的开邻域，两者不交。**没有局部紧就造不出这个紧邻域**。\n' +
        '  $\\cdot$ ($\\implies$) 从 $X^{*}$ Hausdorff 反推 $X$ Hausdorff 是免费的（子空间继承）；反推局部紧要用**紧集的闭性**：$\\infty$ 的开邻域 $U\\cup\\{\\infty\\}$ 满足 $X\\setminus U$ 紧，于是 $U$ 的闭包在 $X$ 中…… 这一方向正是「紧 Hausdorff 里紧集闭」的用法。\n' +
        '\n' +
        '⚠️ **所以「一点紧化总是存在」这句话要分开读**：$X^{*}$ 作为紧空间**总是**存在；但它**Hausdorff** 需要 $X$ 局部紧 Hausdorff。很多教材只写前者，于是初学者会以为「任何空间都能紧化」——**错**，能 Hausdorff 紧化的是局部紧 Hausdorff。\n' +
        '\n' +
        '⚠️ **$\\infty$ 的邻域为什么长那样**：第二条公理里「补集紧」不是随意规定 —— 若邻域是 $U\\cup\\{\\infty\\}$，那么「跑向无穷」的点最终必须落在 $U$ 里，即最终离开 $X\\setminus U$；要求 $X\\setminus U$ 紧，正是让「离开它」与「紧性」对齐，从而使 $X^{*}$ 紧。'
      ].join('\n'),
      notes: [
        '⭐ **拓扑的直觉**：$U \\cup \\{\\infty\\}$ 开 $\\iff$ 补集紧。所以「$X$ 的补集紧」就是「$\\infty$ 的一个邻域」—— 无穷远点周围的空间正是「$X$ 跑出去以后剩下的部分」。于是 $\\mathbb{R}^{n}$ 的 $\\infty$ 邻域是「球外面」，$S^{n}$ 的北极。',
        '⭐ **标准例子**：$(\\mathbb{R}^{n})^{*} \\cong S^{n}$（球极投影；$n = 1$ 时 $\\mathbb{R} \\cup \\{\\infty\\} \\cong S^{1}$）；\n\n' +
        '$\\mathbb{C}^{*} \\cong S^{2}$ 就是 **Riemann 球面**，复分析里全靠它把 $\\infty$ 当普通点处理；\n\n' +
        '$\\mathbb{N}$ 的一点紧化是 $\\{1/n\\} \\cup \\{0\\}$。',
        '⚠️ **为什么必须有局部紧**：$X$ 不局部紧时 $X^{*}$ 不 Hausdorff —— 直观上「$\\infty$ 的邻域」太大，会与某些点的邻域永远相交。所以一点紧化存在性与 Hausdorff 性是**两件事**：$X^{*}$ 总是紧的，但要它 Hausdorff 就得付局部紧的代价。',
        '⚠️ **与 `imp.lch-cr` 的关系**：那条证明「局部紧 Hausdorff 空间完全正则」时，用的正是「$X^{*}$ 是紧 Hausdorff $\\implies$ 正规 $\\implies$ 可在 $X^{*}$ 上造 Urysohn 函数再拉回」。一点紧化是把**紧空间的好性质搬到 $X$ 上**的标准接口。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 一点紧化',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.net',
      cluster: 'topology.convergence',
      type: 'definition',
      label: '网',
      title: '网与网的收敛：一般拓扑里的序列',
      regions: ['topology'],
      tags: ['定义', '拓扑', '网', '收敛', 'Moore-Smith'],
      statement: [
        '**在做什么**：一般拓扑里**序列不够用** —— 紧性、连续性都不能用序列刻画（除非空间是第一可数）。把 $\\mathbb{N}$ 换成任意**有向集**，就得到「网」，于是序列的所有定理都能搬过来。',
        '',
        '**有向集**：预序集 $(\\Lambda, \\le)$，且任意 $\\lambda, \\mu \\in \\Lambda$ 有上界（存在 $\\nu$ 使 $\\lambda, \\mu \\le \\nu$）。',
        '',
        '**网**：映射 $x : \\Lambda \\to X$，记 $(x_{\\lambda})_{\\lambda \\in \\Lambda}$。',
        '',
        '**收敛**：称网 $x_{\\lambda}$ **收敛到** $x$（记 $x_{\\lambda} \\to x$），若对 $x$ 的每个邻域 $U$，存在 $\\lambda_{0}$ 使',
        '',
        '$$\\lambda \\ge \\lambda_{0} \\implies x_{\\lambda} \\in U .$$',
        '',
        '**两个刻画定理**：',
        '',
        '- $f : X \\to Y$ 连续 $\\iff$ $f$ 把每个收敛网送到收敛网（`def.continuous-map`）；',
        '- $X$ 紧 $\\iff$ $X$ 中每个网有收敛的**子网**。'
      ].join('\n'),
      notes: [
        '⚠️ **为什么序列不够**：在不可数空间里，单点集可以闭而不是「序列闭」（例如 $[0,\\omega_{1}]$ 里的 $\\omega_{1}$：没有序列能从下面逼近它，但它仍在闭包里）。\n\n所以「$x \\in \\overline{A}$ $\\iff$ 存在 $A$ 中的序列收敛到 $x$」**只在第一可数空间成立**。\n\n网把 $\\mathbb{N}$ 换成「$x$ 的邻域族的反向序」，立刻修好。',
        '⭐ **子网 $\\ne$ 子序列**：子网允许「取更粗的指标集」，因此比子序列灵活得多（子序列要求保序嵌入 $\\mathbb{N} \\to \\mathbb{N}$，会漏掉很多情形）。所以紧性的网刻画必须用**子网**，用「子序列」是错的。',
        '⭐ **网的来源是 Riemann 和**：Moore–Smith（1922）发明网正是为了给「$\\int f$ 是 Riemann 和的极限」一个严格说法 —— 那些和的指标集是分划的加细序，不是 $\\mathbb{N}$。所以「网」不是抽象洁癖，它解决的是分析里真实存在的问题。',
        '⚠️ 网与滤子是**等价**的两套语言（`eq.net-filter`）：每个网对应一个滤子、收敛性一致。用哪套看习惯 —— 分析书多用网，集合论与拓扑书多用滤子。',
        ,
        '**各方向用到的假设**（网的定义免费，两个刻画需一般拓扑论证）：\n' +
        '- 网收敛 $\\iff$ 对每个邻域最终落入：定义展开；指标有向集按惯例须非空，不要求反对称。\n' +
        '- 连续 $\\implies$ 保网极限：只用邻域原像定义；反向对不连续点按邻域选取反例点构造网，标准构造使用选择，不需第一可数或 Hausdorff。\n' +
        '- 紧 $\\iff$ 每个网有收敛子网：用网的聚点与开覆盖有限子覆盖的对偶论证；不需 Hausdorff，但子网须满足标准共尾条件。\n' +
        '- 改成序列不能刻画一般紧性：第一可数的序数空间 $[0,\\omega_1)$ 序列紧却不紧，故原文括号里的第一可数不足以保证紧性的序列刻画。\n'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 网的收敛',
        'Kelley, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.filter',
      cluster: 'topology.convergence',
      type: 'definition',
      label: '滤子',
      title: '滤子与超滤子：收敛的另一套语言',
      regions: ['topology'],
      tags: ['定义', '拓扑', '滤子', '超滤子', '收敛'],
      statement: [
        '**在做什么**：把「收敛」改写成**集合族**的语言。滤子把「最终落进某个集合」这件事抽象出来，于是极限可以不提指标、只谈族 —­— 这是集合论与拓扑学交界处最顺手的工具。',
        '',
        '设 $X$ 是拓扑空间。非空族 $\\mathcal{F} \\subseteq \\mathcal{P}(X)$ 叫**滤子**（filter），若',
        '',
        '1. $\\emptyset \\notin \\mathcal{F}$、$X \\in \\mathcal{F}$；',
        '2. 上闭：$F \\in \\mathcal{F}$ 且 $F \\subseteq G$ $\\implies$ $G \\in \\mathcal{F}$；',
        '3. 对有限交封闭：$F, G \\in \\mathcal{F}$ $\\implies$ $F \\cap G \\in \\mathcal{F}$。',
        '',
        '**收敛**：$\\mathcal{F} \\to x$，若 $x$ 的每个邻域都属于 $\\mathcal{F}$（即 $\\mathcal{N}(x) \\subseteq \\mathcal{F}$）。',
        '',
        '**超滤子**（ultrafilter）：极大的滤子。等价地，对每个 $A \\subseteq X$，$A$ 与 $X \\setminus A$ 中**恰有**一个属于 $\\mathcal{U}$。',
        '',
        '**超滤子引理**：每个滤子都含在一个超滤子中（用 Zorn 引理，`lem.zorn`）。'
      ].join('\n'),
      notes: [
        '⭐ **滤子的用处：紧性的干净刻画**：$X$ 紧 $\\iff$ 每个超滤子都收敛（或每个滤子有聚点）。比网的版本更短，因为「子网」这一步被超滤子的极大性吸收了。',
        '⭐ **超滤子引理不可省**：它不是定理而是**选择公理的一小块**（严格弱于 AC，但与布尔素理想定理等价）。所以凡是「取一个超滤子」的证明，背后都在用选择 —— 这条与 `thm.paracompact-hausdorff-normal` 那一族「只用紧性」的论证形成对照。',
        '⚠️ **滤子 $\\ne$ 拓扑的邻域系**：$\\mathcal{N}(x)$ 本身是个滤子（邻域滤子），而一般滤子可以**不收敛**。收敛与否取决于它是否包含某个 $\\mathcal{N}(x)$。',
        '⚠️ **与范畴论里的「滤子」撞名**：`prop.covering-sieves-filter` 讲的是 Grothendieck 拓扑里筛子的滤过性，与这里的集合论滤子**无关**。',
        ,
        '**三条公理里“对有限交封闭”是唯一有内容的**（另两条几乎只是规范化）：\n' +
        '\n' +
        '- $\\emptyset \\notin \\mathcal{F}$ 与 $X \\in \\mathcal{F}$：**规范化**。只要求非空且不含空集，加上上闭就自动含 $X$。\n' +
        '- **上闭**：定义的一部分，去掉它得到的是「滤子基」（filter base），需要再补「任意两个成员有更小的成员」。\n' +
        '- **对有限交封闭**：**这才是真条件**，也是滤子与“网”能对译的原因（`eq.net-filter`）。\n' +
        '\n' +
        '**收敛的两种写法**：$\\mathcal{F} \\to x$ $\\iff$ $\\mathcal{N}(x) \\subseteq \\mathcal{F}$ $\\iff$ $\\mathcal{F}$ 比邻域滤子**更细**。⚠️ 这里的方向容易记反：**越大（越细）的滤子越容易收敛**。\n' +
        '\n' +
        '**超滤子引理（每个滤子含于某个超滤子）要用 Zorn 引理** —— 这是这条链上唯一的 AC 依赖。它决定了「紧 $\\iff$ 每个超滤子收敛」这条刻画也是**非构造的**。\n' +
        '\n' +
        '⚠️ 与范畴论里的「滤过性」（`def.filtered-category`）**无关**，只是中文都带「滤」字。\n'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 滤子',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    }
  ],

  edges: [
    { id: 'dep.cc-hom', kind: 'definition',
      definition: 'def.cohomology', usedBy: 'def.cohomology-class',
      note: '上同调类是 $H^{n}$ 的元素，先有 $H^{n}$。' },
    { id: 'dep.cc-cycle', kind: 'definition',
      definition: 'def.cycle', usedBy: 'def.cohomology-class',
      note: '类的代表是**闭链**。' },
    { id: 'dep.cc-boundary', kind: 'definition',
      definition: 'def.boundary', usedBy: 'def.cohomology-class',
      note: '「相差一个上边缘」决定两个代表是否同类。' },

    { id: 'dep.ac-hom', kind: 'definition',
      definition: 'def.cohomology', usedBy: 'def.acyclic-complex',
      note: '零调的定义就是同调全为 $0$。' },
    { id: 'dep.ac-exact', kind: 'definition',
      definition: 'def.exact-sequence', usedBy: 'def.acyclic-complex',
      note: '「处处正合」是与零调等价的另一种说法。' },
    { id: 'dep.ac-res', kind: 'definition',
      definition: 'def.resolution', usedBy: 'def.acyclic-complex',
      note: '消解就是「除 $0$ 次外零调」的复形 —— 本条的变体。' },

    { id: 'dep-cp-compact', kind: 'definition',
      definition: 'def.compact', usedBy: 'def.compactification',
      note: '紧化的目标空间是紧的。' },
    { id: 'dep-cp-dense', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.compactification',
      note: '要求像是**稠密**的（稠密的定义在闭包那个节点里）。' },

    { id: 'dep-opc-cp', kind: 'definition',
      definition: 'def.compactification', usedBy: 'def.one-point-compactification',
      note: '一点紧化是紧化的特例（只补一个点）。' },
    { id: 'dep-opc-lc', kind: 'definition',
      definition: 'def.locally-compact', usedBy: 'def.one-point-compactification',
      note: '「$X^{*}$ Hausdorff $\\iff$ $X$ 局部紧 Hausdorff」这一条要用局部紧。' },
    { id: 'dep-opc-compact', kind: 'definition',
      definition: 'def.compact', usedBy: 'def.one-point-compactification',
      note: '开集族第二条用「补集紧」定义 $\\infty$ 的邻域。' },

    { id: 'dep-net-top', kind: 'definition',
      definition: 'def.topology', usedBy: 'def.net',
      note: '收敛用邻域说，所以先有拓扑空间。' },
    { id: 'dep-net-cont', kind: 'definition',
      definition: 'def.continuous-map', usedBy: 'def.net',
      note: '「连续 $\\iff$ 保网收敛」是本条的主要用途之一。' },
    { id: 'dep-net-compact', kind: 'definition',
      definition: 'def.compact', usedBy: 'def.net',
      note: '「紧 $\\iff$ 每个网有收敛子网」是另一条主要用途。' },

    { id: 'dep-flt-top', kind: 'definition',
      definition: 'def.topology', usedBy: 'def.filter',
      note: '收敛用邻域滤子说。' },
    { id: 'dep-flt-zorn', kind: 'definition',
      definition: 'lem.zorn', usedBy: 'def.filter',
      note: '超滤子引理（每个滤子含于超滤子）要用 Zorn 引理。' },

    {
      id: 'eq.net-filter',
      kind: 'equivalence',
      title: '网收敛与滤子收敛等价',
      note: '两套语言等价：一个是「指标集 + 最终落在」，一个是「集合族 + 包含」。分析书多用网，集合论与拓扑书多用滤子。',
      a: 'def.net',
      b: 'def.filter',
      proofs: [
        {
          label: '网 → 滤子',
          text: [
            '设 $(x_{\\lambda})_{\\lambda \\in \\Lambda}$ 是网。令',
            '',
            '$$\\mathcal{F} := \\bigl\\{\\, A \\subseteq X : \\exists \\lambda_{0},\\ \\forall \\lambda \\ge \\lambda_{0},\\ x_{\\lambda} \\in A \\,\\bigr\\} ,$$',
            '',
            '即「网最终落在其中」的集合族。\n\n' +
            '**验证滤子公理**：$\\emptyset \\notin \\mathcal{F}$（网总有值）、$X \\in \\mathcal{F}$；上闭显然；\n\n' +
            '$A, B \\in \\mathcal{F}$ 时取两个 $\\lambda_{0}$ 的上界 $\\nu$，则 $\\lambda \\ge \\nu$ 时 $x_{\\lambda} \\in A \\cap B$，故 $A \\cap B \\in \\mathcal{F}$ ✓。',
            '',
            '**收敛一致**：$x_{\\lambda} \\to x$ $\\iff$ 每个邻域 $U \\ni x$ 都有「最终落在 $U$」$\\iff$ $\\mathcal{N}(x) \\subseteq \\mathcal{F}$ $\\iff$ $\\mathcal{F} \\to x$ ✓。'
          ].join('\n')
        },
        {
          label: '滤子 → 网',
          text: [
            '设 $\\mathcal{F}$ 是滤子。取指标集',
            '',
            '$$\\Lambda := \\{\\, (F, x) : F \\in \\mathcal{F},\\ x \\in F \\,\\} , \\qquad (F, x) \\le (G, y) \\iff G \\subseteq F .$$',
            '',
            '任意两个 $(F, x), (G, y)$ 有上界 $(F \\cap G, z)$（$F \\cap G \\ne \\emptyset$，取其中任一点 $z$）✓，故 $\\Lambda$ 是有向集。令 $x_{(F,x)} := x$，得到网。',
            '',
            '**收敛一致**：若 $\\mathcal{F} \\to x$，则每个邻域 $U \\ni x$ 属于 $\\mathcal{F}$；取 $\\lambda_{0} = (U, x)$，则 $(F, y) \\ge (U, x)$ 时 $F \\subseteq U$ 且 $y \\in F \\subseteq U$，故 $x_{(F,y)} \\in U$，即网收敛到 $x$ ✓。\n\n反向由上一条同理。',
            '',
            '⛔ 附件：**超滤子 $\\leftrightarrow$ 极大网**（不能进一步加粗的网）也一一对应。'
          ].join('\n')
        }
      ]
    }
  ]
});
