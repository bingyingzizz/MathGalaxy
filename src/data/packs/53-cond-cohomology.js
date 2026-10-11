/* ==========================================================================
   内容包 · 凝聚态上同调 I：零调性（14 条）
   --------------------------------------------------------------------------
   §8.1 + §8.2。这一批要造出的东西是：**一批「上同调自动消失」的空间**。

   链条：Stonean 上零调（起点）$\to$ Stone 上常系数零调 $\to$ 局部紧上等于层上同调
   $\to$ 半范数 / Banach 阿贝尔群与 K-有界正合（定量工具）$\to$ Banach 在 Stone 上零调
   $\to$ 实 Banach 在紧 Hausdorff 上零调（本章主定理）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态上同调 · 零调性',
  nodes: [

    /* ------------------------------------------------------------ 8.1 零调 */

    {
      id: 'prop.cond-slice-topos-morphism',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'Cond/X 到开集拓扑斯的态射',
      title: '拓扑斯态射 $c_{X} : \\mathrm{Cond}/X \\rightleftarrows \\mathrm{Open}(X)$',
      regions: ['condensed', 'category'],
      tags: ['凝聚态数学', '拓扑斯态射', '切片拓扑斯', '开集'],
      statement: [
        '设 $X$ 是拓扑空间。存在拓扑斯态射',
        '',
        '$$c_{X} : \\mathrm{Cond}/X \\rightleftarrows \\mathrm{Open}(X),$$',
        '',
        '其中 $\\mathrm{Open}(X)$ 是 $X$ 的开集所成的拓扑空间对应的拓扑斯（开集按含入组成的偏序，配上它的标准拓扑）。',
        '',
        '**逆像**把 $Y \\in \\mathrm{Cond}/X$ 送到 $U \\mapsto \\operatorname{Hom}_{/X}(\\underline{U}, Y)$；',
        '**顺像**把 $F \\in \\mathrm{Open}(X)$ 送到 $\\varinjlim_{U \\subseteq X,\\ s \\in F(U)} \\underline{U}$。'
      ].join('\n'),
      notes: [
        '**在做什么。** $\\mathrm{Cond}/X$ 是「把 $X$ 当成基点、在上面做凝聚态数学」的世界；$\\mathrm{Open}(X)$ 是「$X$ 的开集格」这个世界。这条态射把两边接起来：**两个世界算出来的上同调可以互相换算**。',
        '**逆像的形状怎么读**：$\\operatorname{Hom}_{/X}(\\underline{U}, Y)$ 是「越过 $X$ 的、从 $U$ 到 $Y$ 的映射」。$U$ 越小能给的映射越多 —— 这正是层的「限制」味道。',
        '**顺像的形状怎么读**：$\\varinjlim \\underline{U}$ 是「把所有开集拼起来」的余极限 —— 开集沿含入的余极限就是它们并起来。',
        '⭐ 这条是下面 Dyckhoff 定理那条谱序列的**构造基础**：有了这两个方向，$\\mathrm{Cond}/X$ 上的上同调才能被 $\\mathrm{Open}(X)$ 上的层上同调逼近。',
        ['**证明。** 先看两个函子都有定义：逆像把 $Y \\in \\mathrm{Cond}/X$ 送到预层 $U \\mapsto \\operatorname{Hom}_{/X}(\\underline{U}, Y)$，而 $\\mathrm{Open}(X)$ 上的层条件只涉及开集的含入，逐条验即可；顺像 $\\varinjlim_{U \\subseteq X,\\ s \\in F(U)} \\underline{U}$ 取的是**滤过**余极限（开集沿含入滤过），在 $\\mathrm{Cond}$ 里存在。',
          '**逆像左正合**：$\\varinjlim$ 在 $\\mathrm{Cond}$ 里正合（AB5）。',
          '**伴随**：逐项算',
          '$$\\operatorname{Hom}_{/X}\\Bigl(\\varinjlim_{U, s} \\underline{U},\\ Y\\Bigr) = \\varinjlim_{U, s} \\operatorname{Hom}_{/X}(\\underline{U}, Y) = \\operatorname{Hom}(F, Y),$$',
          '第一式是余极限的泛性质，第二式就是把「从 $F$ 到 $Y$ 的映射」按 $F$ 的定义写成相容族 $\\{F(U) \\to \\operatorname{Hom}_{/X}(\\underline{U}, Y)\\}$ —— 两者是同一件事。于是有伴随 $\\varinjlim \\underline{U} \\dashv \\bigl(U \\mapsto \\operatorname{Hom}_{/X}(\\underline{U}, -)\\bigr)$，逆像左正合，故 $c_{X}$ 是拓扑斯态射。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.1.3']
    },

    {
      id: 'prop.stonean-cond-acyclic',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'Stonean 上凝聚阿贝尔群零调',
      title: 'Stonean 空间上一切凝聚态阿贝尔群零调',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Stonean', '零调', '上同调'],
      statement: [
        '设 $S$ 是 **Stonean 空间**（极不连通的紧 Hausdorff 空间），$M$ 是凝聚态阿贝尔群。则对一切 $n > 0$',
        '',
        '$$H^{n}_{\\mathrm{cond}}(S,\\ M) = 0.$$'
      ].join('\n'),
      notes: [
        '**一句话**：Stonean 空间对凝聚态上同调是**不可见的** —— 只要系数是凝聚态阿贝尔群，高次上同调一律消失。',
        '**为什么**。截面函子 $\\Gamma(S, -) = \\operatorname{Hom}(\\mathbb{Z}[S], -)$ 在 Stonean 空间上是**正合**的：Stonean 的极不连通性让 $\\mathbb{Z}[S]$ 是投射的，于是 $\\operatorname{Hom}(\\mathbb{Z}[S], -)$ 保满射，而右导出函子在 $n>0$ 上正好量度「保不保满射」。',
        '⭐ **这是整章的起点**：后面每一步「零调」都是把一般空间归约到 Stonean（先 Stone 化，再用 Čech 复杂度量偏差），而 Stonean 这一格已经归零。',
        '⚠️ 注意这条对**任意**凝聚态阿贝尔群 $M$ 成立，不要求 $M$ 来自拓扑群。',
        ['**证明。** 截面函子是 $\\Gamma(S, -) = \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}[S], -)$。',
          '- **$\\mathbb{Z}[S]$ 在 $S$ Stonean 时是投射对象**：极不连通性给出 $S$ 的闭开集格上的投影性（$S = \\beta I$ 时 $\\mathbb{Z}[S] = \\mathbb{Z}[\\beta I]$ 是自由的，而自由对象投射）；',
          '- 于是 $\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}[S], -)$ 把满射送到满射 —— 即**正合**；',
          '- 右导出函子 $R^{n}\\Gamma(S,-)$ 量的正是「这个函子在第 $n$ 步有多大程度不正合」，函子本身正合故全为 $0$（$n>0$）。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.1.1']
    },

    {
      id: 'lem.stone-constant-acyclic',
      cluster: 'cond.cohomology',
      type: 'lemma',
      label: 'Stone 上常系数零调',
      title: 'Stone 空间上常值系数的零调',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Stone 空间', '常系数', 'Čech'],
      statement: [
        '设 $S$ 是 **Stone 空间**（紧、Hausdorff、全不连通），$A$ 是普通阿贝尔群（看作常值凝聚态阿贝尔群 $\\underline{A}$）。则对一切 $n > 0$',
        '',
        '$$H^{n}_{\\mathrm{cond}}(S,\\ \\underline{A}) = 0.$$'
      ].join('\n'),
      notes: [
        '**与 Stonean 那条的区别**。Stonean 要求**极**不连通（开集的闭包还开），Stone 只要求**全**不连通（没有非平凡连通分支）。全不连通比极不连通弱，所以这条不能直接由上面那条得到，得另证 —— 但结论形状一样：零调。',
        '**证法**。把 $S$ 与它的一个 Stone 满射 $S_{0} \\twoheadrightarrow S$ 都写成**有限离散空间**的滤过**逆**极限（Stone 空间按定义就是投射有限空间的逆极限）。增广 Čech 复形逐段零调（有限离散情形是好算的），而滤过逆极限沿着正合列取极限仍然正合，于是整体零调。',
        '**为什么值得单列**：常系数是最常用的系数，这条让「Stone 空间上的常系数上同调」这一整类计算直接归零。',
        ['**证明（先有限、再取逆极限）。** 由「无环 $\\iff$ Čech 上同调为零」，只需对 Stone 空间之间的**满射** $f : S_{0} \\twoheadrightarrow S$ 证明增广 Čech 复形 $\\check{C}^{\\bullet}\\bigl((S_{0}\\to S)^{+}, M\\bigr)$ 零调（有限**不交**覆盖那情形由「有限不交覆盖的高次 Čech 为零」给出）。',
          '- **$S, S_{0}$ 有限的情形**：此时它们是有限离散集，$f$ 是有限满射，增广 Čech 复形是**零伦**的（有截面的态射那条），故零调。',
          '- **一般情形**：Stone 空间是**投射有限空间**的滤过逆极限，写 $S_{0} = \\varprojlim_{k} S_{0,k}$（$S_{0,k}$ 有限），记 $S_{k}$ 为 $S_{0,k}$ 在 $S$ 里的像。$M$ **离散**，于是交叠上的连续函数就是逐块给定的，而逆极限的取值是滤过余极限：',
          '$$\\check{C}^{\\bullet}\\bigl((S_{0}\\to S)^{+},\\ M\\bigr) = \\varinjlim_{k} \\check{C}^{\\bullet}\\bigl((S_{0,k}\\to S_{k})^{+},\\ M\\bigr).$$',
          '- **滤过余极限正合**（AB5），所以「每一项都零调」沿这个余极限传下去：整体零调。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 8.1.2']
    },

    {
      id: 'thm.dyckhoff',
      cluster: 'cond.cohomology',
      type: 'theorem',
      label: '局部紧上凝聚态＝层上同调',
      title: 'Dyckhoff：$H^{n}_{\\mathrm{cond}}(X, M) = H^{n}_{\\mathrm{sheaf}}(X, M)$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', '层上同调', '局部紧', 'Dyckhoff'],
      statement: [
        '设 $X$ 是**局部紧 Hausdorff** 空间，$M$ 是**离散**阿贝尔群（看作常值凝聚态阿贝尔群）。则对一切 $n \\ge 0$',
        '',
        '$$H^{n}_{\\mathrm{cond}}(X,\\ M) \\cong H^{n}_{\\mathrm{sheaf}}(X,\\ M).$$'
      ].join('\n'),
      notes: [
        '⭐ **这条是把两套上同调接起来的桥。** 凝聚态上同调是从「$X$ 上的层」算的；层上同调是从「$X$ 的开集上的层」算的。这条说：只要 $X$ 局部紧、系数离散，两边**一样**。',
        '**怎么证**。用拓扑斯态射 $c_{X} : \\mathrm{Cond}/X \\rightleftarrows \\mathrm{Open}(X)$ 及其导出函子，得到一条谱序列，其 $E_{2}$ 项是 $R^{q}c_{*}$ 作用在 $M$ 上。关键计算是 $R^{q}c_{*}\\underline{M} = 0$（$q > 0$），它由**茎**上的计算给出：茎化之后 $M$ 是离散的，没有高阶信息。谱序列退化，两边同构。',
        '**为什么限定「系数离散」**。系数一旦带上拓扑（比如实 Banach 空间），$R^{q}c_{*}$ 一般不再消失，两边就对不上了 —— §8.2 要处理的就是这种情形。',
        '📌 **用法**：任何**局部紧**空间上的凝聚态上同调，可以**直接**用经典的层上同调来算（开覆盖、Čech、细层消解那一整套老工具全都能用）。',
        ['**证明（用 $c_{X}$ 的谱序列，把 $R^{q}c_{X*}$ 算成零）。**',
          '- 由 $c_{X}^{-1}(X) = X$（$X$ 作为 $\\mathrm{Open}(X)$ 里的对象，逆像取回它自己），得 Grothendieck 谱序列',
          '$$E^{p,q}_{2} = H^{p}_{\\mathrm{sheaf}}\\bigl(X,\\ R^{q}c_{X*}M\\bigr) \\;\\Longrightarrow\\; H^{p+q}_{\\mathrm{cond}}(X,\\ M).$$',
          '- 又 $c_{X*}M = M$，所以**只需证 $R^{q}c_{X*}M = 0$（$q > 0$）**。',
          '- $R^{q}c_{X*}M$ 是预层 $U \\mapsto H^{q}_{\\mathrm{cond}}(U, M)$ 层化得到的层。$X$ **局部紧**，它在 $x$ 处的茎是',
          '$$(R^{q}c_{X*}M)_{x} = \\varinjlim_{x \\in U} H^{q}_{\\mathrm{cond}}(U, M) = \\varinjlim_{x \\in K} H^{q}_{\\mathrm{cond}}(K, M)$$',
          '（$U$ 跑 $x$ 的开邻域、$K$ 跑 $x$ 的紧邻域 —— 局部紧让两个滤过系统共尾）。',
          '- 固定 $x$ 的一个紧邻域 $K$ 与 Stone 空间 $K_{0}$ 连同满射 $K_{0} \\twoheadrightarrow K$；对 $x$ 的每个紧邻域 $S \\subseteq K$，拉回得 $S_{0} \\to S$。**Stone 的积与子空间仍是 Stone**，所以 $S_{n}$ 全是 Stone 空间，于是由「紧 Hausdorff 上 Čech = 层上同调」与上一条「Stone 上常系数零调」',
          '$$H^{n}_{\\mathrm{cond}}(S, M) = \\check{H}^{n}(S_{\\bullet}, M).$$',
          '- 滤过余极限正合，于是茎那个余极限化归到 $S = \\{x\\}$ 的情形；而单点的 Čech 复形由「有截面 $\\implies$ 零调」直接给出零。故 $R^{q}c_{X*}M = 0$（$q>0$），谱序列退化，$H^{n}_{\\mathrm{cond}}(X,M) \\cong H^{n}_{\\mathrm{sheaf}}(X,M)$。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.1.4']
    },

    /* -------------------------------------------------- 8.2 半范数与 Banach */

    {
      id: 'def.semi-normed-ab-group',
      cluster: 'cond.cohomology',
      type: 'definition',
      label: '半范数阿贝尔群',
      title: '半范数阿贝尔群',
      regions: ['condensed', 'analysis'],
      tags: ['凝聚态数学', '半范数', '阿贝尔群'],
      statement: [
        '**半范数阿贝尔群**是一个阿贝尔群 $M$ 配上函数 $\\|\\cdot\\| : M \\to \\mathbb{R}_{\\ge 0}$，满足',
        '',
        [
          '- $\\|0\\| = 0$；',
          '- $\\|s + t\\| \\le \\|s\\| + \\|t\\|$（三角不等式）；',
          '- $\\|-s\\| = \\|s\\|$（对称性）。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '⚠️ **不要求 $\\|s\\| = 0 \\implies s = 0$** —— 这正是「半」字的全部含义。范数为 $0$ 的元素组成子群 $M_{0} = \\{\\, s : \\|s\\| = 0 \\,\\}$。',
        '**为什么从半范数开始。** 完备化的过程本身会先经过半范数这个中间站：把一个半范数空间做完备化之前，得先把 $M_{0}$ 商掉。$K$-有界正合在**半范数**层面定义最自然，到 Banach 层面才干净 —— 所以两套概念都留着。'
      ].join('\n\n'),
      refs: ['Le Stum, §8.2']
    },

    {
      id: 'def.banach-ab-group',
      cluster: 'cond.cohomology',
      type: 'definition',
      label: 'Banach 阿贝尔群',
      title: 'Banach 阿贝尔群与 Banach 化',
      regions: ['condensed', 'analysis'],
      tags: ['凝聚态数学', 'Banach', '完备化', 'Hausdorff 化'],
      statement: [
        '**Banach 阿贝尔群**是半范数阿贝尔群 $M$，且满足',
        '',
        [
          '- $\\|s\\| = 0 \\implies s = 0$（**分离性**，即半范数其实是范数）；',
          '- $M$ 对范数导出的度量**完备**。'
        ].join('\n'),
        '',
        '任一半范数阿贝尔群 $M$ 都有 **Banach 化**：先 Hausdorff 化、再完备化，',
        '',
        '$$M \\longmapsto \\widehat{M/M_{0}},\\qquad M_{0} = \\{\\, s : \\|s\\| = 0 \\,\\}.$$'
      ].join('\n'),
      notes: [
        '**在凝聚态世界里长什么样**。Banach 阿贝尔群 $M$ 上，截面 $\\operatorname{Hom}(\\mathbb{Z}[S], M)$ 可以配一个「上确界半范数」，于是 $M$ 作为一个凝聚态阿贝尔群本身带着范数信息。§8.2 的所有定量陈述都是在这个半范数上做的。',
        '⚠️ 这里说的是**阿贝尔群**带范数，不是「向量空间」。每个实 Banach 空间当然是 Banach 阿贝尔群（忘掉标量乘法），但反过来不然 —— 第 8 章的很多定理只用到群结构。',
        '⭐ 「Hausdorff 化 + 完备化」这两步是**反射**：它把半范数阿贝尔群的范畴投到 Banach 阿贝尔群的子范畴上，且让 $K$-有界正合这种定量性质**不增不减**地传过去。'
      ].join('\n\n'),
      refs: ['Le Stum, §8.2']
    },

    {
      id: 'def.k-bounded-exact',
      cluster: 'cond.cohomology',
      type: 'definition',
      label: 'K-有界正合',
      title: '$K$-有界正合与 $K$-有界零调',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Banach', '正合列', '定量'],
      statement: [
        '设 $M^{\\bullet}$ 是**半范数阿贝尔群**的复形，$K \\in \\mathbb{R}$。称 $M^{\\bullet}$ 在 $M^{n}$ 处 **$K$-有界正合**，如果',
        '',
        '$$\\forall s \\in M^{n},\\ \\forall \\varepsilon > 0,\\ \\exists s\' \\in M^{n+1} :\\quad \\|s - d^{n+1}s\'\\| \\le K\\,\\|d^{n}s\\| + \\varepsilon.$$',
        '',
        '若 $M^{\\bullet}$ 在每个 $M^{n}$ 处都 $K$-有界正合，则称它 **$K$-有界零调**。'
      ].join('\n'),
      notes: [
        '**和普通正合差在哪。** 普通正合只说「每个闭链都是上一边的边界」（存在性）。$K$-有界正合不但要求存在原像 $s\'$，还要求这个原像**可以被控制住**：误差不超过 $K\\|ds\\|$，再多给一个任意的 $\\varepsilon$。',
        '**为什么非要这么强。** 在 Banach / 半范数语境里，「闭链是不是边界」这种纯存在性问题**不够用** —— 因为取极限的时候，误差会累积。$K$-有界正合给出的是**可数控制**，让后续构造（几何级数式的 Cauchy 列）能收敛。',
        '**$\\varepsilon$ 项是干嘛的**：所有范数比较都会留一点余量，好让「$\\le$」在取极限后仍然成立。实践上 $\\varepsilon$ 可以随便小。',
        '⭐ 这条是本节所有定理的**公共语言**：把「正合」这个定性条件换成带常数 $K$ 的定量条件，再证明「定量 $\\implies$ 定性」。'
      ].join('\n\n'),
      refs: ['Le Stum, Definition 8.2.1']
    },

    {
      id: 'lem.k-bounded-completion',
      cluster: 'cond.cohomology',
      type: 'lemma',
      label: 'K-有界正合在完备化下不变',
      title: '$K$-有界正合 $\\iff$ 完备化后 $K$-有界正合',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Banach', '完备化', 'K-有界'],
      statement: [
        '设 $M^{\\bullet}$ 是半范数阿贝尔群复形，$\\widehat{M}^{\\bullet}$ 是它的 Banach 化（Hausdorff 化后再完备化）。则 $M^{\\bullet}$ 在 $M^{n}$ 处 $K$-有界正合 $\\iff$ $\\widehat{M}^{\\bullet}$ 在 $\\widehat{M}^{n}$ 处 $K$-有界正合。'
      ].join('\n'),
      notes: [
        '**作用**：这条把「半范数」的一般情形**归结为 Banach 情形**。于是后面只要在 Banach 层面上证定理，一般情形自动跟着走。',
        '**为什么成立**。完备化把 $M^{n}$ 嵌成一个**稠密**子空间，而 $K$-有界正合只用到范数不等式与「任取 $\\varepsilon > 0$」—— 这类条件在取稠密子空间时**两边都保持**：稠密性保证能在 $M^{n}$ 里找到足够好的逼近，而完备空间的极限点又能落回 $\\widehat{M}^{\\bullet}$。',
        ['**证明（两个方向各算一次 $\\varepsilon/2$）。** 先商掉 $M_{0}$（$K$-有界正合在商掉范数为零的元素下不变），于是可设 $M^{\\bullet} \\subseteq \\widehat{M}^{\\bullet}$ 是稠密保范嵌入。',
          '- **$\\implies$**：给 $s \\in \\widehat{M}^{n}$ 与 $\\varepsilon>0$。由稠密性取 $t \\in M^{n}$ 使 $\\|s - t\\| \\le \\frac{\\varepsilon}{2(1+K\\|d^{n}\\|)}$；由 $M^{\\bullet}$ 的 $K$-有界性取 $s\' \\in M^{n+1}$ 使 $\\|t - ds\'\\| \\le K\\|dt\\| + \\frac{\\varepsilon}{2}$。于是',
          '$$\\|s - ds\'\\| \\le \\|s-t\\| + K\\|dt\\| + \\frac{\\varepsilon}{2} = K\\|ds\\| + \\Bigl(\\|s-t\\| + K\\|ds - dt\\| + \\frac{\\varepsilon}{2}\\Bigr) \\le K\\|ds\\| + \\varepsilon .$$',
          '- **$\\Longleftarrow$**：给 $s \\in M^{n} \\subseteq \\widehat{M}^{n}$。由 $\\widehat{M}^{\\bullet}$ 的 $K$-有界性取 $t\' \\in \\widehat{M}^{n+1}$ 使 $\\|s - dt\'\\| \\le K\\|ds\\| + \\frac{\\varepsilon}{2}$；再由稠密性取 $s\' \\in M^{n+1}$ 使 $\\|s\' - t\'\\| \\le \\frac{\\varepsilon}{2(1+\\|d^{n+1}\\|)}$。于是 $\\|s - ds\'\\| \\le K\\|ds\\| + \\varepsilon$。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 8.2.2']
    },

    {
      id: 'prop.k-bounded-implies-exact',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '相邻两条 K-有界 推出 正合',
      title: '$K$-有界正合（相邻两处）$\\implies$ 通常正合',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Banach', '几何级数', '正合列'],
      statement: [
        '设 $M^{\\bullet}$ 是 **Banach** 阿贝尔群复形。若它在 $M^{n-1}$ 与 $M^{n}$ 两处都 $K$-有界正合，则它在 $M^{n}$ 处（通常意义下）**正合**。'
      ].join('\n'),
      notes: [
        '**这是「定量 $\\implies$ 定性」的核心一步。** 给定闭链 $s \\in M^{n}$（即 $d^{n}s = 0$），要造出 $s\' \\in M^{n+1}$ 使 $ds\' = s$。',
        '**造法（几何级数）**。由上一条 $K$-有界条件，先取一个几乎的原像 $s\'_{1}$，误差 $e_{1} = s - ds\'_{1}$ 满足 $\\|e_{1}\\| \\le K\\|ds\\| + \\varepsilon = \\varepsilon$（用了 $ds = 0$）。现在 $e_{1}$ 又是 $M^{n}$ 里的闭链（因为 $de_{1} = ds - d^{2}s\'_{1} = 0$），可以对它再取一次几乎的原像，误差 $\\le \\varepsilon/2$，如此迭代。',
        '**关键的第二处 $K$-有界**：为保证迭代出的 $s\'_{i}$ 本身**收敛**，每一步都要用 $M^{n-1}$ 处的 $K$-有界正合把「原像之间差了多少」控制住 —— 这样 $\\|s\'_{i} - s\'_{i+1}\\|$ 被一个几何级数控制，$M^{n+1}$ 完备保证极限存在。',
        '**结论**：$s\' = \\sum_{i \\ge 1}(s\'_{i+1} - s\'_{i})$ 的收敛和的 $d$ 正好是 $s$。于是每个闭链都是边界，即正合。',
        ['**严格写法。** 设 $s \\in M^{n}$、$ds = 0$。',
          '- 由 $M^{n}$ 处 $K$-有界，取 $s\'_{1} \\in M^{n+1}$ 使 $\\|s - ds\'_{1}\\| \\le \\frac{1}{2^{2}}$；误差 $e_{1} := s - ds\'_{1}$ 满足 $de_{1} = 0$，故对 $e_{1}$ 再用一次得 $s\'_{2} \\in M^{n+1}$ 使 $\\|e_{1} - d(s\'_{2}-s\'_{1})\\| \\le \\frac{1}{2^{3}}$，如此递推，得 $s\'_{i}$ 与 $e_{i} = s - ds\'_{i}$，$\\|e_{i}\\| \\le 2^{-i-1}$。',
          '- **这一步用到「相邻两处」**：要控制 $\\|s\'_{i+1} - s\'_{i}\\|$ 本身（而不只是它的边界），得把 $M^{n+1}$ 处的 $K$-有界性用在元素 $s\'_{i+1}-s\'_{i}$ 上：',
          '$$\\|s\'_{i+1} - s\'_{i}\\| \\le K\\,\\|d(s\'_{i+1}-s\'_{i})\\| + \\frac{1}{2^{i+1}} \\le \\frac{K}{2^{i}} + \\frac{1}{2^{i+1}} .$$',
          '- 于是 $(s\'_{i})$ 是 **Cauchy 列**，$M^{n+1}$ 完备给出极限 $s\' := \\lim_{i} s\'_{i}$。',
          '- $d$ 连续，故 $ds\' = \\lim_{i} ds\'_{i} = \\lim_{i}(s - e_{i}) = s$（因 $\\|e_{i}\\| \\to 0$）。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.2.3']
    },

    {
      id: 'cor.k-acyclic-acyclic',
      cluster: 'cond.cohomology',
      type: 'corollary',
      label: 'K-有界零调 推出 零调',
      title: '$K$-有界零调 $\\implies$ 通常零调',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Banach', '零调', '推论'],
      statement: '若 Banach 阿贝尔群复形 $M^{\\bullet}$ 是 $K$-有界零调的（对某个 $K$），则它（通常意义下）零调。',
      notes: [
        '**直接推论**：把上一条逐层应用 —— 处处相邻两处都 $K$-有界，于是处处正合。',
        '⭐ **这是全章的「转换器」**：所有零调性证明都走同一条路线 —— 先在 Stone / 紧块上证出**有界**零调，再用这条把它换成通常的零调，从而得到上同调消失。'
      ].join('\n\n'),
      refs: ['Le Stum, Corollary 8.2.4']
    },

    {
      id: 'lem.stone-cech-1-bounded',
      cluster: 'cond.cohomology',
      type: 'lemma',
      label: 'Stone 满射的 Čech 复形 1-有界零调',
      title: 'Stone 满射的增广 Čech 复形是 $1$-有界零调',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Stone 空间', 'Čech 复形', '零伦'],
      statement: [
        '设 $M$ 是半范数阿贝尔群，$S_{0} \\twoheadrightarrow S$ 是 **Stone 空间之间的满射**。则增广 Čech 复形',
        '',
        '$$\\check{C}^{\\bullet}\\bigl((S_{0} \\to S)^{+},\\ M\\bigr)$$',
        '',
        '是 **$1$-有界零调**的。'
      ].join('\n'),
      notes: [
        '**要做的事**：造一个零伦（contraction），把复形每一项的「闭链」都显式地写成边界，并且**范数不超过原来的 $1$ 倍**。$K = 1$ 是能得到的最好常数。',
        '**怎么造**。先归约到 $S_{0}$、$S$ 都**有限离散**的情形（Stone 空间是投射有限的逆极限，逆极限保持零伦）。有限离散时，满射 $S_{0} \\twoheadrightarrow S$ 允许把一个函数「在 $S$ 的每个纤维内逐点常值化」—— 这一步是线性的、范数不增的，正好给出所需零伦，于是 $\|h\| \\le 1$。',
        '**为什么只到 Stone / 有限离散为止。** 这一步只处理「Stone 空间之间的满射」。要把结论推到紧 Hausdorff，得先把它 Stone 化，再用 Čech 复形与层上同调的谱序列去比较偏差 —— 那正是下面两条要做的事。',
        ['**证明。** 三步归约。',
          '- **归约到 $M$ 离散**：Stone 空间写 $S_{0} = \\varprojlim_{k} S_{0,k}$（$S_{0,k}$ 有限），$S_{k}$ 为它在 $S$ 里的像，则',
          '$$\\varinjlim_{k} \\check{C}^{\\bullet}\\bigl((S_{0,k}\\to S_{k})^{+}, M\\bigr) = \\check{C}^{\\bullet}\\bigl((S_{0}\\to S)^{+}, M^{\\mathrm{disc}}\\bigr) \\hookrightarrow \\check{C}^{\\bullet}\\bigl((S_{0}\\to S)^{+}, M\\bigr),$$',
          '左端的直极限拓扑就是**上确界范数**拓扑；而 $C(S, M^{\\mathrm{disc}})$ 在 $C(S, M)$ 里**稠密**（极不连通性给出有限不交闭开细化，在每块上取常值逼近）。配上「$K$-有界正合在完备化下不变」与「滤过余极限保持 $K$-有界」，只需证**离散那一个**复形 $1$-有界零调（对它自己的拓扑）。',
          '- **归约到 $S, S_{0}$ 有限**：同一个余极限再把离散情形化归到有限。',
          '- **有限情形**：由「有截面的态射给出零调」，$\\check{C}^{\\bullet}\\bigl((S_{0}\\to S)^{+}, M\\bigr)$ 是**零伦**的，且零伦有形式 $h^{n} : f \\mapsto f \\circ k_{n}$（逐纤维取一个截面点），于是 $\\|h^{n}\\| \\le 1$。由 $\\mathrm{id} = h\\circ d + d\\circ h$，对任意 $s$：',
          '$$\\|s - d(hs)\\| = \\|h(ds)\\| \\le \\|ds\\| ,$$',
          '这正是 $K = 1$ 的 $K$-有界正合。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 8.2.5']
    },

    {
      id: 'prop.banach-stone-acyclic',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'Banach 在 Stone 上零调',
      title: 'Banach 阿贝尔群在 Stone 空间上零调',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Banach', 'Stone 空间', '零调'],
      statement: [
        '设 $M$ 是 Banach 阿贝尔群，$S$ 是 Stone 空间。则对一切 $n > 0$',
        '',
        '$$H^{n}_{\\mathrm{cond}}(S,\\ M) = 0.$$'
      ].join('\n'),
      notes: [
        '**证法三段**。① 取一个 Stone 满射 $S_{0} \\twoheadrightarrow S$，用它算 Čech 复形；② 上一条给出这个复形是 $1$-有界零调的；③ 那条「$K$-有界零调 $\\implies$ 零调」把它换成通常的零调，于是 Čech 上同调消失，而 Stone 空间上 Čech 上同调就是凝聚态上同调。',
        '**和「Stone 上常系数零调」的关系**。常系数那条的系数是**离散**阿贝尔群（本质上是「有离散拓扑」的极端情形）；这条的系数是 **Banach** 阿贝尔群 —— 带完整的范数结构。两条结论形状一样，证明路线完全不同：常系数用的是「投射有限逆极限」，Banach 用的是「$K$-有界 + Čech」。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.2.6']
    },

    {
      id: 'thm.tietze-banach',
      cluster: 'cond.cohomology',
      type: 'theorem',
      label: 'Tietze 延拓（Banach 值）',
      title: 'Tietze 延拓定理：$C(X, V) \\twoheadrightarrow C(K, V)$',
      regions: ['condensed', 'topology'],
      tags: ['凝聚态数学', 'Tietze', 'Banach 空间', '延拓', '正规空间'],
      statement: [
        '设 $X$ 是**正规**拓扑空间，$K \\subseteq X$ 是**紧**子集，$V$ 是**实 Banach 空间**。则限制映射',
        '',
        '$$C(X,\\ V) \\twoheadrightarrow C(K,\\ V)$$',
        '',
        '是**满**的：每个连续映射 $K \\to V$ 都能延拓到 $X$ 上。'
      ].join('\n'),
      notes: [
        '**分层归约**。① 有限维：$V = \\mathbb{R}^{m}$，逐坐标用经典 Tietze 延拓（正规空间上实值连续函数的延拓，本质是 Urysohn 引理）。② 一般可分 Banach：每个可分 Banach 空间都同构于 $\\ell^{\\infty}$ 的闭子空间，而 $\\ell^{\\infty}$ 是 **Lipschitz 收缩核** —— 于是可以先把映射延拓到 $\\ell^{\\infty}$ 再收缩回来。③ 不可分的情形用「紧像落在某个可分闭子空间里」再归约到 ②。',
        '⭐ **为什么凝聚态数学要用它。** §8.2 的主定理「实 Banach 空间在紧 Hausdorff 空间上零调」走的是「把一般紧 Hausdorff 空间 $S$ 用 Stonean 的 $S_{0}$ 覆盖、再把偏差压回去」的路线；偏差项住在一个函数空间 $C(K, V)$ 里，而**要把它压掉就得靠延拓**，即这条 Tietze。',
        '⚠️ **这条一般拓扑里也有实值版本**（Tietze 延拓定理）；这里的增量是：**取值可以让是任意实 Banach 空间**。',
        ['**证明（Dugundji 延拓定理）。** 取值在拓扑向量空间里的 Tietze 是 Dugundji 的定理：设 $X$ **仿紧**（度量空间即可）、$A \\subseteq X$ **闭**、$V$ 是**局部凸**拓扑向量空间，则存在**线性**延拓算子 $C(A, V) \\to C(X, V)$，特别地限制映射满。',
          '- **构造**：仿紧性给出 $A$ 的一个开邻域系 $\\{U_{i}\\}$ 的局部有限细化与配套的**单位分解** $\\{\\varphi_{i}\\}$（$\\sum \\varphi_{i} = 1$，$\\varphi_{i} \\ge 0$，支集在 $U_{i}$ 里）。每个 $U_{i}$ 上先把 $g|_{A \\cap U_{i}}$ 延拓成一个常值映射 $g_{i}$（取 $A\\cap U_{i}$ 上某点的值）；再令',
          '$$G := \\sum_{i} \\varphi_{i}\\, g_{i} .$$',
          '- **为什么良定义**：局部有限 $\\implies$ 每个点附近只有有限个 $\\varphi_{i}$ 非零，和是有限的；$V$ 是**向量空间**，凸组合有意义；$\\varphi_{i}$ 连续，故 $G$ 连续。',
          '- **为什么是延拓**：若 $x \\in A$，则所有满足 $\\varphi_{i}(x) > 0$ 的 $U_{i}$ 都含 $x$，而每个 $g_{i}$ 在 $A \\cap U_{i}$ 上等于 $g$，于是 $G(x) = \\sum \\varphi_{i}(x) g(x) = g(x)$。',
          '**应用到这里**：$X$ 正规（度量 / 仿紧空间都正规）、$K \\subseteq X$ 紧故闭，$V$ 实 Banach 空间（局部凸），于是限制映射 $C(X,V) \\twoheadrightarrow C(K,V)$ 满。$V = \\mathbb{R}^{m}$ 是逐坐标用经典 Tietze。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 8.2.7', 'Dugundji, An extension of Tietze\'s theorem (1951)']
    },

    {
      id: 'thm.real-banach-chaus-acyclic',
      cluster: 'cond.cohomology',
      type: 'theorem',
      label: '实 Banach 在紧 Hausdorff 上零调',
      title: '实 Banach 空间在紧 Hausdorff 空间上零调',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Banach 空间', '紧 Hausdorff', '零调'],
      statement: [
        '设 $V$ 是**实 Banach 空间**，$S$ 是**紧 Hausdorff** 空间。则对一切 $n > 0$',
        '',
        '$$H^{n}_{\\mathrm{cond}}(S,\\ V) = 0.$$'
      ].join('\n'),
      notes: [
        '⭐ **这是 §8.2 的主定理**，也是整章的枢纽：它把「零调」从 Stone 空间推到了一般紧 Hausdorff 空间，代价是系数必须落在实 Banach 空间里。',
        '**证法**。① 用 Stonean 空间 $S_{0}$ 满射到 $S$（由「紧 Hausdorff 空间沿闭含入的滤过余极限 / Stonean 覆盖」那套技术得到）；② 在 $S_{0}$ 上由「Banach 在 Stone 上零调」知道 Čech 复形零调；③ 比较 $S_{0} \\to S$ 的 Čech 复形与 $S$ 本身的上同调，偏差项住在 $C(K, V)$ 里；④ 用 **Tietze 延拓（Banach 值）** 把偏差压掉，得到 $S$ 上的**有界**零调；⑤ 用「$K$-有界零调 $\\implies$ 零调」转成通常零调。',
        '⚠️ **复 Banach 空间不成立。** 这是「solid 模 / solid 拟凝聚层」那一整套理论出现的直接原因之一 —— 实的情形能用 Tietze 那样的**序结构**（$\\mathbb{R}$ 上的上确界、分割）把它压下来，复的情形没有这套工具，得上完全不同的机器。',
        '📌 与「局部紧上凝聚态＝层上同调」对照：那条处理的是**离散系数**（且空间只需局部紧），这条处理的是 **Banach 系数**（而空间只需紧）—— 两条合起来覆盖了第 8 章大半的计算。',
        ['**证明（把偏差用单位分解压掉）。** 由「紧 Hausdorff 上 Čech = 层上同调」、「Banach 在 Stone 上零调」与「$K$-有界零调 $\\implies$ 零调」，只需证：对 Stone 空间的连续满射 $S_{0} \\to S$，增广 Čech 复形 $\\check{C}^{\\bullet}\\bigl((S_{0}\\to S)^{+}, V\\bigr)$ 是 **$1$-有界零调**的。',
          '固定 $\\varepsilon > 0$ 与 $f \\in \\check{C}^{n}$（即 $S_{n} \\to V$ 连续，$S_{n}$ 是 $S_{0}$ 在 $S$ 上的 $(n{+}1)$ 重纤维积）。记 $\\pi_{n} : S_{n} \\to S$ 与 $f_{x} := f|_{\\pi_{n}^{-1}(x)}$。',
          '- 对每个 $x \\in S$，对纤维上的满射 $\\pi_{n}^{-1}(x) \\to \\{x\\}$ 用「Stone 满射的 Čech 复形 $1$-有界零调」（逐纤维的版本），得 $g_{x} : \\pi_{n+1}^{-1}(x) \\to V$ 使',
          '$$\\|f_{x} - d g_{x}\\| \\le \\|d f_{x}\\| + \\frac{\\varepsilon}{2} \\le \\|df\\| + \\frac{\\varepsilon}{2}.$$',
          '- 由 **Tietze（Banach 值）**，$g_{x}$ 延拓成 $S_{n+1}$ 上的 $G_{x}$；由连续性，$x$ 有邻域 $V_{x}$ 使在 $\\pi_{n+1}^{-1}(V_{x})$ 上 $\\|f - dG_{x}\\| < \\|df\\| + \\varepsilon$。',
          '- 取有限的 $V_{1}, \\ldots, V_{r}$ 覆盖 $S$（**紧性**），配从属的单位分解 $\\{\\varphi_{i}\\}$，令 $g := \\sum_{i} (\\varphi_{i}\\circ\\pi_{n+1})\\,G_{i}$。由 $\\sum_{i}(\\varphi_{i}\\circ\\pi_{n}) = 1$ 得 $f = \\sum_{i}(\\varphi_{i}\\circ\\pi_{n}) f$，又 $dg = \\sum_{i}(\\varphi_{i}\\circ\\pi_{n})\\, dG_{i}$，两式相减：',
          '$$\\|f - dg\\| = \\Bigl\\|\\sum_{i} (\\varphi_{i}\\circ\\pi_{n})\\,(f - dG_{i})\\Bigr\\| \\le \\max_{i} \\|f - dG_{i}\\| \\le \\|df\\| + \\varepsilon,$$',
          '最后一步是「凸组合的范数不超过最大范数」（$\\varphi_{i} \\ge 0$、$\\sum\\varphi_{i} = 1$）。这正是 $K = 1$ 的 $K$-有界正合。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 8.2.8']
    }

  ]
});
