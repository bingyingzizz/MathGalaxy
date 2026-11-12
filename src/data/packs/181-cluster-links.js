/* ============================================================================
   内容包 · 团内接线（2026-11-03 晚，J1 内聚度）
   ----------------------------------------------------------------------------
   `_audit/团结构清单-2026-11-03b.md` 查出三个团**团内一条边都没有**（团内孤立点 100%）：
   `cond.compute`（22 点）、`cond.ss`（5 点）、`algebra.numeric`（5 点）。
   团简介都写了 `→` 链条，图上却一条边也没有 —— 这包把**真存在**的那些依赖补上。

   原则：只补「后者**由**前者得到」的边，且每条都写清**怎么得到**。
   凡是本图没有把某条引理单独立节点的，正文里明说是**骨架**，不假装完整。

   A. `cond.compute`（10 条）
      1. `lem.ext-stonean-section` ⟹ `prop.rhom-zs-sections`（$M=\mathbb{Z}$ 的特例）
      2. `lem.ext-stonean-section` ⟹ `cor.ext-cond-set-section`（$M=\mathbb{Z}\cdot X$ 的特例）
      3. `prop.rhom-zs-sections` ⟹ `prop.stonean-cond-acyclic`（RHom 落在 0 次）
      4. `prop.rhom-ze-powers` ⟹ `prop.condab-discrete-acyclic`（同理，离散指标）
      5. `prop.rhom-zs-sections` ⟹ `ex.chaus-banach-rhom`（Stonean → 一般紧 Hausdorff）
      6. `prop.rhom-banach-discrete-zero` ⟹ `prop.rhom-dual-tensor`（该节点自己的证法第一步）
      7-9. 三条归零 ⟹ `table.rhom-zrt` 的三行（表自己的正文就是这么说的）
      10. `thm.lc-ext-vanishing` ⟹ `ex.connected-lc-ext`（连通再杀掉 0 次）

   B. `cond.ss`（4 条）+ `algebra.numeric`（2 条）：见各边说明。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '团内接线：导出 Hom 计算 / Breen–Deligne / 矩阵分解',

  nodes: [],

  edges: [
    /* ---------------------------------------------------- A. cond.compute */
    {
      id: 'imp.section-formula-free',
      kind: 'implication',
      sources: ['lem.ext-stonean-section'],
      target: 'prop.rhom-zs-sections',
      title: '截面公式（$M = \\mathbb{Z}$）$\\implies$ 自由模的导出 Hom 是截面',
      proof: [
        '截面公式说 $\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M,N)(S) \\cong \\operatorname{Ext}^{n}_{\\mathbb{Z}}(M\\cdot S,\\ N)$，其中 $M \\cdot S = M \\otimes_{\\mathbb{Z}} \\mathbb{Z}[S]$。取 $M = \\mathbb{Z}$：',
        '',
        '$$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}, N)(S) \\;\\cong\\; \\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}[S],\\ N).$$',
        '',
        '左边是**常层** $\\underline{\\operatorname{Ext}^{n}(\\mathbb{Z},N)}$ 在 $S$ 上的截面，而 $\\mathbb{Z}$ 自由（投射）$\\implies$ $\\operatorname{Ext}^{n}(\\mathbb{Z},N) = 0$（$n > 0$）、$\\operatorname{Ext}^{0} = N$，于是左边 $= N(S)$。',
        '',
        '所以 $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}[S], N) \\cong N(S)$，集中在 $0$ 次。',
      ].join('\n'),
    },
    {
      id: 'imp.section-formula-condset',
      kind: 'implication',
      sources: ['lem.ext-stonean-section'],
      target: 'cor.ext-cond-set-section',
      title: '截面公式（$M = \\mathbb{Z}\\cdot X$）$\\implies$ 凝聚态集的版本',
      proof: [
        '把截面公式里的 $M$ 取成自由凝聚态阿贝尔群 $\\mathbb{Z}\\cdot X$（$X$ 是凝聚态集）。此时',
        '',
        '$$M \\cdot S = \\mathbb{Z}\\cdot X \\otimes_{\\mathbb{Z}} \\mathbb{Z}[S] = \\mathbb{Z}\\cdot(X \\times S),$$',
        '',
        '代回 $\\operatorname{Ext}^{n}(M,N)(S) \\cong \\operatorname{Ext}^{n}(M\\cdot S, N)$ 得',
        '',
        '$$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X,\\ N)(S) \\;\\cong\\; \\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot(X \\times S),\\ N) \\;=\\; H^{n}(X \\times S,\\ N),$$',
        '',
        '最后一步是凝聚态上同调的定义（$H^{n}(T,M) := \\operatorname{Ext}^{n}(\\mathbb{Z}\\cdot T, M)$，即「$T$ 上的层」的余同调）。',
      ].join('\n'),
    },
    {
      id: 'imp.free-rhom-acyclic',
      kind: 'implication',
      sources: ['prop.rhom-zs-sections'],
      target: 'prop.stonean-cond-acyclic',
      title: '自由模的 RHom 落在 0 次 $\\implies$ Stonean 上正次上同调为零',
      proof: [
        '凝聚态上同调的定义是 $H^{n}_{\\mathrm{cond}}(S, M) := \\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}[S], M)$。由 $\\operatorname{RHom}(\\mathbb{Z}[S],M) \\cong M(S)$ 只在 $0$ 次非零，立即得 $H^{n} = 0$（$n > 0$）。',
        '',
        '⭐ 这就是「Stonean 空间上一个高次上同调都没有」的全部内容：$\\mathbb{Z}[S]$ 是投射对象，投射对象上的 $\\operatorname{RHom}$ 就是 $\\operatorname{Hom}$。',
      ].join('\n'),
    },
    {
      id: 'imp.free-powers-acyclic',
      kind: 'implication',
      sources: ['prop.rhom-ze-powers'],
      target: 'prop.condab-discrete-acyclic',
      title: '离散指标的自由模 $\\implies$ 离散空间上零调',
      proof: [
        '第 1 条直接由 $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}[E], N) \\cong N^{E}$（$E$ 离散）落在 $0$ 次得到：$H^{n}_{\\mathrm{cond}}(E,M) = \\operatorname{Ext}^{n}(\\mathbb{Z}[E],M) = 0$（$n>0$）。',
        '',
        '第 2 条（$E \\times S$，$S$ Stonean）是同一台机器配上截面公式：$\\operatorname{Ext}^{n}(\\mathbb{Z}[E\\times S], M) \\cong \\operatorname{Ext}^{n}(\\mathbb{Z}[E], M)(S) = 0$。',
        '',
        '⚠ **本图没有单独立节点**的是「$\\mathbb{Z}[E \\times S] = \\mathbb{Z}[E]\\otimes_{\\mathbb{Z}}\\mathbb{Z}[S]$ 与截面公式的合成」这一步，它在凝聚态理论里是标准的张量积相容性。',
      ].join('\n'),
    },
    {
      id: 'imp.rhom-zs-chaus',
      kind: 'implication',
      sources: ['prop.rhom-zs-sections'],
      target: 'ex.chaus-banach-rhom',
      title: 'Stonean 上的计算 $\\implies$ 一般紧 Hausdorff 上的 $C(S,N)$',
      proof: [
        '命题 `prop.rhom-zs-sections` 只对 **Stonean** 的 $S$ 说。一般紧 Hausdorff 空间 $S$ 取一个 **Stonean 超覆盖** $\\tilde S \\to S$（紧 Hausdorff 空间的层论天然带这种覆盖），在这个超覆盖上算 $\\operatorname{RHom}(\\mathbb{Z}[\\tilde S], N) \\cong N(\\tilde S)$，再用下降把相容族收回到 $S$ 上。',
        '',
        '结果就是 $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot S,\\ N) \\cong N(S) = C(S, N)$（$S$ 紧 Hausdorff、$N$ 是实 Banach 空间时，凝聚态意义的 $N(S)$ 就是连续映射全体）。',
        '',
        '⚠ **骨架程度的说明**：本图没有把「超覆盖的下降引理」单独立节点，这一步在这里只记机制（用超覆盖从 Stonean 铺到一切紧 Hausdorff），不算完整证明。',
      ].join('\n'),
    },
    {
      id: 'imp.banach-discrete-dual-tensor',
      kind: 'implication',
      sources: ['prop.rhom-banach-discrete-zero'],
      target: 'prop.rhom-dual-tensor',
      title: '实向量空间 $\\to$ 离散全零 $\\implies$ 对偶的导出 Hom 变成导出张量',
      proof: [
        '取短正合列 $0 \\to \\mathbb{Z} \\to \\mathbb{R} \\to T \\to 0$（$T = \\mathbb{R}/\\mathbb{Z}$），对靶取 $\\operatorname{RHom}_{\\mathbb{Z}}(M, -)$：',
        '',
        '由 $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{R}, N) = 0$（实向量空间到离散群全零，即本包引用的那条结论）得',
        '',
        '$$\\operatorname{RHom}_{\\mathbb{Z}}(T,\\ N) \\;\\cong\\; \\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}[1],\\ N) \\;=\\; N[-1].$$',
        '',
        '把这条代进 $\\operatorname{RHom}(\\operatorname{RHom}(M,T),\\ N)$ 并逐层展开（$M$ 离散时 $\\operatorname{RHom}(M,-)$ 与导出张量互为伴随），就得到 $\\operatorname{RHom}(\\operatorname{RHom}(M,T),N) \\cong M \\otimes^{\\mathbf{L}}_{\\mathbb{Z}} N[-1]$。',
        '',
        '⭐ 这一步是那个「$T$ 在导出层面等价于降一次数」的来源。',
      ].join('\n'),
    },
    {
      id: 'imp.table-from-free',
      kind: 'implication',
      sources: ['prop.rhom-zs-sections'],
      target: 'table.rhom-zrt',
      title: '自由源没有高阶 $\\implies$ 表的第一行',
      proof: [
        '$\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}, N) = \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}, N) = N$，没有高阶项（$\\mathbb{Z}$ 的消解取成一维的 $[\\mathbb{Z}]$）。这就是计算表第一行 $\\mathbb{Z} \\mapsto (\\mathbb{Z}, \\mathbb{R}, T)$ 的全部理由。',
      ].join('\n'),
    },
    {
      id: 'imp.table-from-banach',
      kind: 'implication',
      sources: ['prop.rhom-banach-discrete-zero'],
      target: 'table.rhom-zrt',
      title: '实向量空间 $\\to$ 离散全零 $\\implies$ 表的第二行第一列是 $0$',
      proof: [
        '表里 $M = \\mathbb{R}$、$N = \\mathbb{Z}$ 那格是 $0$，用的正是「有限维实 Banach 空间到离散阿贝尔群，导出 Hom 全零」这一条：$\\mathbb{R}$ 可除，$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{R}, \\mathbb{Z}) = 0$（$1/n$ 的像必须被 $n$ 整除地解出来，只能为 $0$），可除性再把高阶也杀掉。',
      ].join('\n'),
    },
    {
      id: 'imp.table-from-chaus',
      kind: 'implication',
      sources: ['prop.rhom-chaus-banach-zero'],
      target: 'table.rhom-zrt',
      title: '紧 Hausdorff $\\to$ 实 Banach 全零 $\\implies$ 表的第三行第二列是 $0$',
      proof: [
        '表里 $M = T$、$N = \\mathbb{R}$ 那格是 $0$：$T$ 是紧 Hausdorff 阿贝尔群、$\\mathbb{R}$ 是实 Banach 空间，正好是「紧 Hausdorff 到实 Banach 全零」这一条的直接实例。',
      ].join('\n'),
    },
    {
      id: 'imp.connected-lc-ext',
      kind: 'implication',
      sources: ['thm.lc-ext-vanishing'],
      target: 'ex.connected-lc-ext',
      title: '高次 Ext 只剩 $0,1$ 次 $\\implies$ 连通时只剩 $1$ 次',
      proof: [
        '局部紧阿贝尔群的高次 Ext 消失给出：$n \\ne 0,1$ 时 $\\operatorname{Ext}^{n}(M,N) = 0$。',
        '',
        '$0$ 次那项用**连通性**再杀一次：$M$ 连通、$N$ 离散时，$\\operatorname{Hom}_{\\mathbb{Z}}(M, N)$ 里的像必然落在 $N$ 的连通分支里，而 $N$ 离散 $\\implies$ 分支是单点 $\\implies$ 同态只能是零。',
        '',
        '所以只剩 $\\operatorname{Ext}^{1}$ 可能非零。',
      ].join('\n'),
    },

    {
      id: 'imp.discrete-cond-dual-tensor',
      kind: 'implication',
      sources: ['prop.discrete-cond-rhom-constant'],
      target: 'prop.rhom-dual-tensor',
      title: '离散群的凝聚态 $\\operatorname{RHom}$ = 常层化的抽象 $\\operatorname{RHom}$ $\\implies$ 导出张量那一步能落地',
      proof: [
        '`prop.rhom-dual-tensor` 的证法里有一句「再用**自由情形**的导出张量计算」 —— 那一步要的正是把凝聚态里的 $\\operatorname{RHom}$/$\\otimes^{\\mathbf{L}}$ 换回抽象群论里能算的东西：',
        '',
        '$$\\operatorname{RHom}^{\\mathrm{cond}}_{\\mathbb{Z}}(M,N) \\cong \\mathrm{c}\\bigl(\\operatorname{RHom}^{\\mathrm{abs}}_{\\mathbb{Z}}(M,N)\\bigr), \\qquad M \\otimes^{\\mathbf{L},\\mathrm{cond}}_{\\mathbb{Z}} N \\cong \\mathrm{c}\\bigl(M \\otimes^{\\mathbf{L},\\mathrm{abs}}_{\\mathbb{Z}} N\\bigr).$$',
        '',
        '有了这两条，右端 $M \\otimes^{\\mathbf{L}}_{\\mathbb{Z}} N[-1]$ 就可以用 $M$ 的自由消解逐项算出来。',
        '',
        '⚠ 本图把这一步当成**引理**引（`prop.discrete-cond-rhom-constant`），没有展开它的证明。',
      ].join('\n'),
    },
    {
      id: 'imp.dual-tensor-pontryagin',
      kind: 'implication',
      sources: ['prop.rhom-dual-tensor'],
      target: 'prop.dual-rhom-characterization',
      title: '$T$ 在导出层等于降一次数 $\\implies$ Pontryagin 对偶能写成 $\\operatorname{RHom}$',
      proof: [
        '$\\operatorname{RHom}_{\\mathbb{Z}}(-,\\,T)$ 把离散群送到它自己的 $[-1]$（上一条边）。把这个当定义/刻画用：局部紧阿贝尔群 $M$ 的对偶 $M^{\\vee}$ 就写成 $\\operatorname{RHom}_{\\mathbb{Z}}(M,\\,T)$；紧与 Banach 两种特殊情形再由靶的选取不同（$\\mathbb{Z}$ 与 $\\mathbb{R}$）各偏一位。',
        '',
        '⭐ 这也是「为什么对偶函子要放进导出范畴」的原因：只有在导出层，$\\operatorname{RHom}(-,\\,T)$ 才是一个**统一的**写法。',
      ].join('\n'),
    },
    {
      id: 'imp.banach-discrete-nonlc',
      kind: 'implication',
      sources: ['prop.rhom-banach-discrete-zero'],
      target: 'ex.nonlc-rhom',
      title: '实向量空间到离散群全零 $\\implies$ $\\operatorname{RHom}(\\mathbb{R}^{I},\\mathbb{Z}) = 0$',
      proof: [
        '`prop.rhom-banach-discrete-zero` 的陈述里带着**更一般的**一条：$V$ 是任意 $\\mathbb{R}$-模、$N$ 离散 $\\implies \\operatorname{RHom}_{\\mathbb{Z}}(V,N) = 0$。取 $V = \\mathbb{R}^{I}$（任意多个 $\\mathbb{R}$ 的积，仍是 $\\mathbb{R}$-模）、$N = \\mathbb{Z}$，就是例子的第一条。',
        '',
        '⚠ 例子的第二条（$\\operatorname{RHom}(\\mathbb{Z}^{I},\\mathbb{Z}) = \\mathbb{Z}\\cdot I$）用的一般不是同一条：它算的是**紧**側的对偶（$\\mathbb{Z}^{I}$ 的对偶是 $\\mathbb{Z}$ 上的测度），这里只把第一条挂在这条边上。',
      ].join('\n'),
    },
    {
      id: 'imp.stone-constant-dyckhoff',
      kind: 'implication',
      sources: ['lem.stone-constant-acyclic'],
      target: 'thm.dyckhoff',
      title: 'Stone 上常系数无高次 $\\implies$ 局部紧上凝聚态 $=$ 层上同调',
      proof: [
        '两边都是「层」的上同调，差别只在算它的范畴：右边是 $X$ 上开集景里的层上同调，左边是凝聚态（紧 Hausdorff 测试空间上的层）的上同调。',
        '',
        '比较的办法：先在 **Stone 空间**上比 —— 常系数在 Stone 上没有高次（本包引用的引理），两边的谱序列在 $E_{2}$ 处就对齐了；再把一般局部紧 Hausdorff 的 $X$ 写成紧块／紧子集的滤过余极限，用「上同调与滤过余极限交换」（紧块都是 Stone 的商/子空间）搬过去。',
        '',
        '⚠ **骨架说明**：本图没有把「上同调沿滤过余极限的行为」单独立节点，这一步只记机制；完整的比较需要 Clausen–Scholze 里那一套解析环上同调的估计。',
      ].join('\n'),
    },

    /* ------------------------------------------------------- B. cond.ss */
    {
      id: 'imp.bd-ss-stonean',
      kind: 'implication',
      sources: ['thm.breen-deligne',
        'lem.ext-stonean-section'],
      layer: false, target: 'prop.breen-deligne-ss-stonean',
      title: 'Breen–Deligne 分解 $\\implies$ Stonean 上的谱序列',
      proof: [
        '取 Breen–Deligne 左消解 $F(M)^{\\bullet} \\twoheadrightarrow M$（每一项是有限个 $\\mathbb{Z}\\cdot M^{s_{n,i}}$ 的直和）。',
        '',
        '对 $\\operatorname{Ext}^{\\bullet}_{\\mathbb{Z}}(-,\\, N)(S)$ 应用这个消解：每个 $\\mathbb{Z}\\cdot M^{s}$ 项带上 $S$ 之后由**截面公式**（`lem.ext-stonean-section`）化成 $H^{q}(M^{s} \\times S,\\ N)$。',
        '',
        '按**分解的次数** $p$ 过滤得到的双复形，其谱序列第一页正是',
        '',
        '$$E^{p,q}_{1} = \\bigoplus_{i=1}^{r_{p}} H^{q}\\bigl(M^{s_{p,i}} \\times S,\\ N\\bigr) \\implies \\operatorname{Ext}^{p+q}_{\\mathbb{Z}}(M,N)(S).$$',
        '',
        '⭐ 分解的作用就是把「$M$ 上算 Ext」换成「自由项上算 Ext」，而自由项由截面公式已经算完了。',
      ].join('\n'),
    },
    {
      id: 'imp.bd-ss-general',
      kind: 'implication',
      sources: ['prop.breen-deligne-ss-stonean'],
      target: 'ex.bd-ss',
      title: 'Stonean 版谱序列 $\\implies$ 一般（拓扑斯里的）版本',
      proof: [
        '同一台机器去掉「在 $S$ 上取截面」这一步：在拓扑斯 $\\mathcal{T}$ 里对 $\\mathbb{Z}\\cdot M^{s_{n,i}}$ 这一族自由项算 $H^{q}(-,\\,N)$，过滤按分解次数走，得到',
        '',
        '$$E^{p,q}_{1} = \\bigoplus_{i=1}^{r_{p}} H^{q}\\bigl(M^{s_{p,i}},\\ N\\bigr) \\implies \\operatorname{Ext}^{p+q}_{\\mathbb{Z}}(M,N).$$',
        '',
        'Stonean 版是它在 $S$ 上取截面的样子（$H^{q}(M^{s}\\times S, N)$ 就是 $H^{q}(M^{s},N)(S)$）。',
      ].join('\n'),
    },
    {
      id: 'imp.bd-resolution-scalar-homotopy',
      kind: 'implication',
      sources: ['thm.breen-deligne'],
      target: 'lem.breen-deligne-scalar-homotopy',
      title: '分解存在 $\\implies$ 「乘 $p$」可以沿分解同伦地提升',
      proof: [
        '这条**不是**「分解由它推出」，而是「它是分解本身的性质」，所以前提正是分解的存在性。',
        '',
        '分解的每一项是 $\\mathbb{Z}\\cdot M^{s}$：乘 $p$ 在两个因子（$\\mathbb{Z}$ 与 $M^{s}$）上分别作用，得到逐项映射；把它与「在 $M$ 上乘 $p$ 再沿 $\\twoheadrightarrow$ 提升」相比，两者的差是 $\\mathbb{Z}\\cdot M^{s} \\to M$ 的零伦映射 —— 逐项构造同伦即可（分解的标准构造里这一步是显式给出的）。',
        '',
        '⚠ 本图未收 Breen–Deligne 分解的完整构造（`thm.breen-deligne` 的证明本身是骨架），所以这条同伦也只到「构造上逐项验证」这个程度。',
      ].join('\n'),
    },
    {
      id: 'imp.stone-cech-ss',
      kind: 'implication',
      sources: ['lem.stone-cech-1-bounded'],
      target: 'prop.breen-deligne-ss-stonean',
      title: '$1$-有界零调 $\\implies$ $E_{1}$ 那一片真的可算',
      proof: [
        '谱序列的 $E_{1}$ 项是 $H^{q}(M^{s} \\times S,\\ N)$。要把它算出来，需要一条能从 $S$ 上「一层层剥」的复形 —— 用的正是 Stone 满射 $S_{0} \\twoheadrightarrow S$ 的增广 Čech 复形。',
        '',
        '$1$-有界零调保证这条复形在 $q > 0$ 的部分有正确的零调性、$q = 0$ 的部分给出截面，于是每一项都能被压成「$M^{s}$ 上的同调 + $S$ 上的截面」，$E_{1}$ 页才真的可算。',
        '',
        '⚠ **骨架说明**：本图没有收 $1$-有界零调的证明（它是 Clausen–Scholze 讲义里对半范数复形的一整套估计），这里只把它当**输入**用。',
      ].join('\n'),
    },

    /* ---------------------------------------------- B. algebra.numeric */
    {
      id: 'imp.qr-least-squares',
      kind: 'implication',
      sources: ['thm.qr-decomposition'],
      target: 'thm.least-squares',
      title: '$A = QR$ $\\implies$ 最小二乘解法方程化成一个上三角方程',
      proof: [
        '设 $A = QR$（$Q^{T}Q = I_{n}$、$R$ 上三角且对角元为正，列满秩时唯一）。由 $Q^{T}Q = I$ 得 $A^{T}A = R^{T}R$、$A^{T}b = R^{T}Q^{T}b$，于是**法方程** $A^{T}A\\,x = A^{T}b$ 变成',
        '',
        '$$R^{T}R\\,x = R^{T}Q^{T}b \\;\\iff\\; Rx = Q^{T}b,$$',
        '',
        '（$R$ 可逆 $\\implies$ $R^{T}$ 可逆），即解**一个上三角方程**，回代是 $O(n^{2})$。',
        '',
        '⭐ 这条边说明：QR 不是「另一个算法」，它把最小二乘归约成回代 —— 而且顺带给出 $x = R^{-1}Q^{T}b$，与 $(A^{T}A)^{-1}A^{T}b$ 逐字相等。',
        '',
        '⚠ 反过来解不出来：$R$ 可逆这一条依赖列满秩，QR 的存在性并不蕴含「最小二乘解唯一」。所以这只是单向的归约，不是等价。',
      ].join('\n'),
    },
    {
      id: 'imp.least-squares-pseudoinverse',
      kind: 'implication',
      sources: ['thm.least-squares'],
      target: 'def.pseudoinverse',
      title: '列满秩时最小二乘算子就是伪逆',
      proof: [
        '最小二乘解是 $x = (A^{T}A)^{-1}A^{T}b$，右端是 $b$ 的**线性**函数，记它对应的矩阵为 $A^{+}_{LS} := (A^{T}A)^{-1}A^{T}$。',
        '',
        '逐条验证 Penrose 四式（$A$ 列满秩）：$A A^{+}_{LS} = A(A^{T}A)^{-1}A^{T}$ 是对称幂等（到列空间的正交投影）；$A^{+}_{LS}A = I$；于是 $AA^{+}A = A$、$A^{+}AA^{+} = A^{+}$ 与两条对称性都成立。伪逆的唯一性 $\\implies$ $A^{+} = (A^{T}A)^{-1}A^{T}$。',
        '',
        '⭐ 所以伪逆在**列满秩**时就是最小二乘算子：$x = A^{+}b$。',
        '',
        '⚠ **这是刻画，不是构造**：伪逆的一般定义（Penrose 四式 / SVD 构造）对**任意**矩阵成立，而这条边只覆盖列满秩这一情形；奇异与欠定情形（此时 $AA^{+}$ 投影到列空间、$A^{+}$ 仍唯一）要另作处理，本图由 SVD 那条边（`dep.pinv-svd`）覆盖。',
      ].join('\n'),
    },
  ],
});
