/* ============================================================================
   内容包 · 曲面地形 第三刀（2026-11-03）：把分类线补齐
   ----------------------------------------------------------------------------
   第二刀立了闭曲面与分类定理，但那条线还缺两样东西（当时在注里就写明「不是节点」）：
     ① 两条判据式：$\\chi = 2 - 2g$（可定向）与 $\\chi = 2 - k$（不可定向）——
        分类定理的「不变量」那一步靠它们，缺了就成了「结论有了、算法没有」；
     ② 例子层：球面 / 环面 / 射影平面 / 克莱因瓶 —— E4 点名缺的四个，
        分类定理的三种标准形在图上连个指得着的对象都没有。

   ⚠️ `prop.eulerchar-nonorientable` 由标准形计数 + 连通和归纳给出；`prop.eulerchar-genus` 证明链完整但**条件于 Radó**（2026-11-07 第 19 批补完，status 恢复为 skeleton）：证明走「Radó + 引理 D（$H_2 \cong \mathbb{Z}$）」，唯一外部输入是 `thm.rado`（skeleton），拓扑可定向性见 `def.topological-orientability` —— **不依赖 thm.classification-surfaces**。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '曲面地形（三）：Euler 示性数与四个标准例子',

  nodes: [
    {
      id: 'prop.eulerchar-genus',
      cluster: 'topology.surfaces',
      type: 'proposition',
      status: 'skeleton',
      label: 'Euler 示性数与亏格',
      title: '闭可定向曲面：$\\chi = 2 - 2g$',
      regions: ['topology'],
      tags: ['命题', '拓扑', '曲面', '同调'],
      statement: [
        '设 $S$ 是**闭可定向曲面**，亏格 $g = \\tfrac{1}{2}\\operatorname{rank} H_{1}(S;\\mathbb{Z})$（`def.genus`）。则',
        '',
        '$$\\chi(S) = 2 - 2g .$$',
        '',
        '于是 $\\chi$ 与 $g$ 互相决定：$g = (2 - \\chi)/2$。',
      ].join('\n'),
      notes: '⚠ **本节点仍标 status: skeleton**，但缺口已缩小为**一条外部定理**（Radó 三角剖分存在性，`thm.rado` 本身仍是 skeleton）；另一项旧缺口「拓扑曲面的可定向性」已立成节点（`def.topological-orientability`）。**本条不再使用分类定理**：旧注里「(a) 靠 `thm.classification-surfaces`」与「(b) 基本类 / 定向对偶」两条路线都被下面的初等路线取代。除这两项输入外，证明是完整的。\n\n**零、约定与记号。** $S$ 是闭曲面（`def.closed-surface`），$g=\\tfrac12\\operatorname{rank}H_{1}(S;\\mathbb{Z})$（`def.genus`，直接当定义用）。$\\chi(S)$ 由任一三角剖分算：`thm.euler-characteristic` 给 $\\chi(K)=\\sum_{p}(-1)^{p}\\alpha_{p}=\\sum_{p}(-1)^{p}\\beta_{p}(K)$，`thm.simplicial-approximation` 给 $\\beta_{p}(K)=\\beta_{p}(S)$，故 $\\sum_{p}(-1)^{p}\\beta_{p}(S)$ 与剖分无关，把它记作 $\\chi(S)$。本注把「$S$ 可定向」按拓扑意义理解：存在**定向图册**——图卡是同胚、转移映射在重叠处保向（这就是 `def.orientable-manifold` 去掉光滑性，即 `def.topological-orientability`；见第七节）。取定一个定向。\n\n**一、三角剖分（输入：Radó）。** `thm.rado`（skeleton）断言紧曲面可三角剖分：存在有限单纯复形 $K$ 与同胚 $h:|K|\\to S$。这是本条唯一的外部定理输入。\n\n**二、把剖分加细到图卡里（完整）。** 设 $\\{U_{i}\\}$ 是定向图册，则 $\\{h^{-1}(U_{i})\\}$ 是紧度量空间 $|K|$ 的开覆盖，有勒贝格数 $\\lambda>0$（`def.lebesgue-number`，其注里已给完整证明）。反复重心重分（`def.barycentric-subdivision`，网格按 $\\tfrac{n}{n+1}$ 缩小）可取 $m$ 使 $\\operatorname{mesh}(K^{(m)})<\\lambda$；于是 $K^{(m)}$ 的每个单形都落在某个 $h^{-1}(U_{i})$ 里。记 $K\'=K^{(m)}$；重心重分不改变几何实现，故 $|K\'|=|K|\\cong S$，$K\'$ 仍是 $S$ 的三角剖分。\n\n**三、给 $K\'$ 一个一致定向（完整）。** 对每个 $2$-单形 $\\sigma$，取一张包含它的图卡 $(U_{i},\\varphi_{i})$，用 $\\varphi_{i}\\circ h$ 把 $\\mathbb{R}^{2}$ 的标准定向拉回 $\\sigma$。若 $\\sigma$ 同时在两张卡里，转移映射保向，两个定向相同，所以这个定向属于 $\\sigma$、与选卡无关。现在看相邻的两个 $2$-单形 $\\sigma,\\tau$，它们共一条内边 $e$。取 $e$ 内点附近的小圆盘 $W\\subseteq U_{i}\\cap U_{j}$（$\\sigma$ 在 $U_{i}$、$\\tau$ 在 $U_{j}$；$W$ 同时落在两卡中），用同一张卡 $\\varphi_{j}$ 看：两张三角形落在 $\\varphi_{j}(e)$ 两侧，且 $\\sigma$ 的定向经 $\\varphi_{j}\\circ\\varphi_{i}^{-1}$ 保向地搬过去；在 $\\mathbb{R}^{2}$ 里，分居一条边两侧、定向一致的两个三角形诱导在这条边上的定向相反。故 $K\'$ 的 $2$-单形有一致定向：每条内边两侧诱导的边定向相反。\n\n**四、引理 D（完整）：$H_{2}(K\';\\mathbb{Z})\\cong\\mathbb{Z}$。** 设 $K\'$ 是闭连通曲面的有限三角剖分，且 $2$-单形有一致定向。令 $z=\\sum_{\\sigma}\\sigma$（每个 $\\sigma$ 带上述定向），则 $\\partial z=0$：每条内边恰好属于两个三角形，两者诱导的边定向相反，系数 $\\pm1$ 相消；$S$ 闭，没有边界边，故无其它项。所以 $z$ 是 $2$-循环。反过来，设 $w=\\sum n_{\\sigma}\\sigma$ 是任意 $2$-循环。对每条内边 $e$（两侧为 $\\sigma,\\tau$），$\\partial w$ 中 $e$ 的系数是 $\\pm n_{\\sigma}\\pm n_{\\tau}$；由一致定向两个符号相反，故 $n_{\\sigma}=n_{\\tau}$。对偶图连通：$S$ 连通 $\\implies$ 三角形的「共顶点」图连通；而曲面每个顶点的链环是圆 $\\implies$ 绕同一顶点的三角形经共边相邻连成环。两步合起来 $\\implies$「共边」对偶图连通。于是所有 $n_{\\sigma}$ 相等，$w\\in\\mathbb{Z}\\cdot z$。又 $K\'$ 是 $2$ 维复形，$C_{3}=0$，故 $H_{2}(K\')=\\ker\\partial_{2}=\\mathbb{Z}\\cdot z\\cong\\mathbb{Z}$。∎\n\n**五、$\\beta_{2},\\beta_{0},\\beta_{1}$（完整）。** 由 `thm.simplicial-approximation`，$H_{2}(S;\\mathbb{Z})\\cong H_{2}(K\';\\mathbb{Z})\\cong\\mathbb{Z}$，故 $\\beta_{2}(S)=1$。$S$ 连通且是流形（局部道路连通），故道路连通；由 `prop.h0-components`，$H_{0}(S)\\cong\\mathbb{Z}$，$\\beta_{0}=1$。由 `def.genus` 的定义，$\\beta_{1}=\\operatorname{rank}H_{1}=2g$。\n\n**六、收尾。** $\\chi(S)=\\beta_{0}-\\beta_{1}+\\beta_{2}=1-2g+1=2-2g$。∎（在第一节的 Radó 输入与上面「可定向」的定义下。）\n\n**七、状态与剩下的缺口。** ①本图未证的唯一外部定理：Radó（`thm.rado`，skeleton）。②可定向性已是节点：`def.topological-orientability`（定向图册 / 定向双覆盖）。本图另有光滑版（`def.orientable-manifold`、`prop.volume-form-orientation`）与 $\\mathbb{R}^{3}$ 外在版（`def.orientable-surface`）；光滑定义不能直接搬到拓扑曲面，除非先证光滑化（那又要 Radó/Whitehead），本注第二节就在拓扑意义下重述了它。③因此本条标 `status: \'skeleton\'`：证明**条件于 Radó**（`thm.rado` 仍是 skeleton）；Radó 补完后可删本节点 status（可定向性见 `def.topological-orientability`，不影响结论）。④另一可选口径（不改陈述，由父会话定）：把假设改成「可三角剖分的闭可定向曲面」，则本条立刻完整——但那会把 Radó 从定理变成假设。\n\n**八、与旧注的关系。** 旧注的标准形计数（$4g$ 边形得 $\\chi=2-2g$）与连通和公式仍然正确，下面是它们的保留版，作为「标准形上的独立验证」；但它们不再是证明的必经之路。旧注所说的「(b) 基本类 / 定向对偶」也不需要了：引理 D 是它的初等替代，只对曲面、只算 $H_{2}$，不引定向对偶。\n\n**九、标准形上的独立验证（完整）。** 把 $g$ 个环面的连通和画成 $4g$ 边形，边按 $a_{1}b_{1}a_{1}^{-1}b_{1}^{-1}\\cdots$ 配对；取中心扇形三角剖分：顶点 $2$（中心 $+$ 一个边界顶点类）、边 $2g$（配对边界边）$+4g$（辐条）$=6g$、面 $4g$，故 $\\chi=2-6g+4g=2-2g$。连通和公式 $\\chi(M\\#N)=\\chi(M)+\\chi(N)-2$：各挖去一个开 $2$-单形内部（$F$ 减一，$\\chi$ 减一），沿边界圆粘回时用 $\\chi(A\\cup B)=\\chi(A)+\\chi(B)-\\chi(A\\cap B)$ 与 $\\chi(S^{1})=0$，即得；归纳得 $g$ 个环面的 $\\chi=2-2g$。这条验证不依赖引理 D，可单独核对。\n\n⭐ 三个读数：$S^{2}$ 的 $g=0$、$\\chi=2$；$T^{2}$ 的 $g=1$、$\\chi=0$；双环面 $g=2$、$\\chi=-2$。\n\n📌 与几何的接口：Gauss–Bonnet 说 $\\int_{M}K\\,\\mathrm{d}A=2\\pi\\chi(M)$；与本条合起来是 $\\int K=4\\pi(1-g)$ —— 曲率总量只由亏格决定。',
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, Ch. 2.2'],
    },

    {
      id: 'prop.eulerchar-nonorientable',
      cluster: 'topology.surfaces',
      type: 'proposition',
      label: 'Euler 示性数与不可定向亏格',
      title: '闭不可定向曲面：$\\chi = 2 - k$',
      regions: ['topology'],
      tags: ['命题', '拓扑', '曲面', '同调'],
      statement: [
        '设 $S$ 是**闭不可定向曲面**，且已化为**标准形**：$k$ 个 $\\mathbb{RP}^{2}$ 的连通和（$k\\ge1$，' +
          '见 `thm.classification-surfaces`；$k$ 叫**不可定向亏格**）。则',
        '',
        '$$\\chi(S) = 2 - k .$$',
      ].join('\n'),
      notes: [
        '**本命题的假设已经限定在标准形。** 这里 $S$ 是 $k$ 个 $\\mathbb{RP}^{2}$ 的连通和（$k\\ge1$），所以下面的计算不需要分类定理；把一般闭不可定向曲面化到标准形的那一步属于 `thm.classification-surfaces`（仍 skeleton），不在本命题的假设之内。',
        '**一、$\\mathbb{RP}^{2}$ 的三角剖分。** 把正二十面体（$12$ 个顶点、$30$ 条棱、$20$ 个面）的对径点粘合，得到 $\\mathbb{RP}^{2}$ 的一个三角剖分：$6$ 个顶点、$15$ 条棱、$10$ 个面，故 $\\chi(\\mathbb{RP}^{2})=6-15+10=1=2-1$。对径作用是自由的单纯作用（每个单形与自己的对径像不重合），所以商复形仍是单纯复形。',
        '**二、连通和公式。** 设 $M,N$ 是已三角剖分的闭曲面。各取一个 $2$-单形，挖去它的内部（剩下一个带三角形边界的曲面）；把两个边界三角形按顶点对应粘合，得到 $M\\#N$ 的三角剖分。计数：$V=V_{M}+V_{N}-3$、$E=E_{M}+E_{N}-3$、$F=(F_{M}-1)+(F_{N}-1)=F_{M}+F_{N}-2$，故 $\\chi(M\\#N)=\\chi(M)+\\chi(N)-2$。',
        '**三、归纳。** 记 $S_{k}$ 为 $k$ 个 $\\mathbb{RP}^{2}$ 的连通和。$\\chi(S_{1})=1$；由第二步，$\\chi(S_{k})=\\chi(S_{k-1})+\\chi(\\mathbb{RP}^{2})-2=\\chi(S_{k-1})-1$。所以 $\\chi(S_{k})=1-(k-1)=2-k$。∎',
        '**四、与剖分无关。** `thm.euler-characteristic` 说对任何有限单纯复形 $\\chi=\\sum_{p}(-1)^{p}\\beta_{p}$；右端只依赖同调型，所以上面用特定剖分算出的数就是 $\\chi(S)$，不是剖分的偶然。',
        '**五、支撑性附注：$H_{1}$ 为什么是 $k-1$ 而不是 $2k$（完整，但不用于上面的计算）。** 在标准形 $2k$ 边形的一个顶点取开覆盖，用 van Kampen（`thm.van-kampen`）得 $\\pi_{1}(S_{k})=\\langle c_{1},\\ldots,c_{k}\\mid c_{1}^{2}\\cdots c_{k}^{2}=1\\rangle$；交换化后 $H_{1}(S_{k};\\mathbb{Z})\\cong\\mathbb{Z}^{k}/(2(c_{1}+\\cdots+c_{k}))\\cong\\mathbb{Z}^{k-1}\\oplus\\mathbb{Z}/2$。它也可代入 $\\chi=\\sum_{i}(-1)^{i}\\beta_{i}$ 复核上面的 $2-k$，但那个复核需要 $H_{2}=0$ 与「一般曲面的 $\\beta_{i}$」两条本图没有独立节点的事实，所以这里只当旁证。',
        '⚠ **「亏格」这个词在不可定向侧不能照搬**：`def.genus` 只对可定向曲面定义（除以 $2$ 依赖 $H_{1}$ 自由秩为偶数）。不可定向侧的标准量是 $k$（不可定向亏格），关系是 $\\chi=2-k$。',
        '⭐ 读数：$\\mathbb{RP}^{2}$ 的 $k=1$、$\\chi=1$；克莱因瓶的 $k=2$、$\\chi=0$；三个射影平面的连通和 $k=3$、$\\chi=-1$。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Massey, A Basic Course in Algebraic Topology, Ch. 1'],
    },

    /* ---------------------------------------------------------- 四个标准例子 */
    {
      id: 'def.topological-orientability',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '拓扑可定向性',
      title: '定义：拓扑流形的可定向性（定向图册 / 定向双覆盖）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '可定向性'],
      statement: [
        '设 $M$ 是 $n$ 维拓扑流形（$n\\ge 1$）。称 $M$ 是**可定向的**，若存在一组图卡 $(U_{\\alpha},\\varphi_{\\alpha})$ 覆盖 $M$，使得任意两个图卡之间的转移映射',
        '',
        '$$\\varphi_{\\beta}\\circ\\varphi_{\\alpha}^{-1}:\\ \\varphi_{\\alpha}(U_{\\alpha}\\cap U_{\\beta})\\longrightarrow \\varphi_{\\beta}(U_{\\alpha}\\cap U_{\\beta})$$',
        '',
        '都**保向**（$\\mathbb{R}^{n}$ 取标准定向；保向的精确定义见注）。这样的图册叫**定向图册**。不存在定向图册时称 $M$ **不可定向**。',
      ].join('\n'),
      notes: [
        '**一、保向是什么意思。** $\\mathbb{R}^{n}$ 的标准定向由局部同调的标准生成元给出：对 $x\\in\\mathbb{R}^{n}$，$H_{n}(\\mathbb{R}^{n},\\mathbb{R}^{n}\\setminus\\{x\\};\\mathbb{Z})\\cong\\mathbb{Z}$，取定一个生成元作为「正定向」。设 $h:V\\to W$ 是 $\\mathbb{R}^{n}$ 两个开集之间的同胚，$x\\in V$。$h$ 在 $x$ 处**保向**，指诱导同构 $H_{n}(V,V\\setminus\\{x\\})\\to H_{n}(W,W\\setminus\\{h(x)\\})$ 把标准生成元送到标准生成元；否则称**反向**。若 $V$ 连通，则「在一点保向」蕴含「处处保向」（局部同调沿连通性连续变化，只能取两个值）。$n=1$ 时这就是通常的单调递增；$n=2$ 时就是通常的保向同胚。',
        '**二、定向双覆盖。** 令 $\\widehat{M}$ 为所有二元组 $(x,\\mathfrak{o}_{x})$，其中 $x\\in M$、$\\mathfrak{o}_{x}$ 是 $T_{x}M$ 的「局部定向」——即 $x$ 的某个图卡给出的 $\\mathbb{R}^{n}$ 标准定向在该图卡下的拉回，两个图卡给同一 $\\mathfrak{o}_{x}$ 当且仅当转移映射在 $x$ 处保向。用图卡把 $\\widehat{M}$ 局部写成 $U\\times\\{\\pm1\\}$，即得拓扑；投影 $p:\\widehat{M}\\to M$ 是二重覆叠，叫**定向双覆盖**。$M$ 可定向 $\\iff$ $p$ 平凡 $\\iff$ $p$ 有连续截面 $\\iff$ $\\widehat{M}$ 恰有两个连通分支（$M$ 连通时）。不可定向时 $\\widehat{M}$ 连通，且 $\\mathbb{Z}/2$ 自由地作用在它上面（无不动点）。',
        '**三、同调刻画。** 设 $M$ 是闭连通 $n$-流形。对任意 $x$，$H_{n}(M,M\\setminus\\{x\\};\\mathbb{Z})\\cong\\mathbb{Z}$；自然映射 $H_{n}(M;\\mathbb{Z})\\to H_{n}(M,M\\setminus\\{x\\};\\mathbb{Z})$ 的像只能是 $0$ 或 $\\mathbb{Z}$（Hatcher §3.3）。$M$ 可定向 $\\iff$ 这个像是 $\\mathbb{Z}$（等价地：存在**基本类** $[M]\\in H_{n}(M;\\mathbb{Z})$，它在每个 $x$ 处都给出局部定向）。不可定向时 $H_{n}(M;\\mathbb{Z})=0$。证明思路：用定向双覆盖的转移函数粘一个「局部同调系数」的常层，可定向性正是这个局部系统平凡；基本类的存在性与截面的存在性对偶。',
        '**四、曲面情形（本图主要用途）。** 对闭曲面 $S$：$S$ 可定向 $\\iff$ $S$ 不含 Möbius 带作为子空间 $\\iff$ $S$ 有三角剖分使所有 $2$-单形可**一致定向**（每条内边两侧诱导的边定向相反，`prop.eulerchar-genus` 的引理 D 用的正是这个形式）$\\iff$ $H_{2}(S;\\mathbb{Z})\\cong\\mathbb{Z}$。其中「一致定向的三角剖分」与定向图册的等价，就是引理 D 之前那一步：把每个单形放进图卡再用转移保向拼接。',
        '**五、例子。** $S^{2}$、$T^{2}$ 及一切可定向闭曲面可定向；$\\mathbb{RP}^{2}$、克莱因瓶、Möbius 带不可定向。定向双覆盖的读数：$\\mathbb{RP}^{2}$ 的定向双覆盖是 $S^{2}$（对径作用），克莱因瓶的定向双覆盖是 $T^{2}$，Möbius 带的定向双覆盖是平环。这些例子说明「不可定向」不是「没有局部定向」，而是「局部定向无法整体一致地选出来」。',
        '**六、与光滑定义的关系。** 光滑流形上的可定向性是光滑版本：转移映射的 Jacobi 行列式为正。光滑流形若按光滑意义可定向，则按本条可定向（光滑图册就是定向图册）；反之，光滑流形按本条可定向时，可用单位分解把局部 $n$-形式粘成处处非零的 $n$-形式（见本团「体积形式与可定向性」），故两种定义在光滑流形上一致。曲面可定向性的外在刻画是 $\\mathbb{R}^{3}$ 中的外在版本（存在连续单位法向量场），它只覆盖可嵌入 $\\mathbb{R}^{3}$ 的曲面（例如 $\\mathbb{RP}^{2}$ 不可嵌入，故不能被它描述）。本条不要求光滑，适用于任意拓扑曲面。',
        '**七、用途。** ①`prop.eulerchar-genus` 的引理 D：用定向图册给三角剖分的 $2$-单形一致定向，从而 $H_{2}\\cong\\mathbb{Z}$；②Radó 定理的不可定向情形：走定向双覆盖 $\\widehat{S}\\to S$（自由 $\\mathbb{Z}/2$-作用、无分支点），对 $\\widehat{S}$ 用可定向的三角剖分，再取等变加细让商也是剖分（等变三角剖分引理，本图无节点）；③曲面分类定理：可定向性是同胚不变量，与 $\\chi$ 一起区分标准形。',
        '⚠ **两个常见混淆。** ①「不可定向」不等于「不可三角剖分」：Radó 说每个紧曲面都可三角剖分，$\\mathbb{RP}^{2}$ 就有（正二十面体对径粘合）。②「定向双覆盖」不是分支覆盖：它是自由二重覆叠，没有分支点；$z\\mapsto z^{2}$ 那种带分支点的局部模型属于亚纯函数的分支覆盖（`thm.rado` 的复分析路线），不要与定向双覆盖混为一谈。',
      ].join('\n\n'),
      refs: ['Hatcher, Algebraic Topology, §3.3', 'Munkres, Topology, Ch. 12', 'Milnor–Stasheff, Characteristic Classes, §9'],
    },
    {
      id: 'ex.sphere',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '球面 S²',
      title: '球面 $S^{2}$：闭曲面，亏格 0，$\\chi = 2$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '$$S^{2} := \\{\\, x \\in \\mathbb{R}^{3} : \\lVert x \\rVert = 1 \\,\\}$$',
        '',
        '配子空间拓扑，是一个**闭曲面**（`def.closed-surface`）。它的亏格 $g = 0$，' +
          'Euler 示性数 $\\chi(S^{2}) = 2$。',
      ].join('\n'),
      notes: [
        '⭐ **它是分类定理里的第一个标准形**，也是连通和的单位元：$S^{2} \\# M \\cong M$（`def.connected-sum` 的注）。',
        '⭐ **两种图卡覆盖**：球极投影给出两张图卡（去掉北极 / 去掉南极），转移映射是 $x \\mapsto x/\\lVert x\\rVert^{2}$ 那一类 ——' +
          '这直接说明 $S^{2}$ 是 2 维拓扑流形，而且光滑。',
        '⚠ **$S^{2}$ 与 $\\mathbb{R}^{2}$ 不同胚**（一个是紧的、一个不是），尽管去掉一点之后同胚。' +
          '这也是「紧」这个条件在闭曲面定义里非有不可的原因之一。',
        '📌 $H_{0} = \\mathbb{Z}$、$H_{1} = 0$、$H_{2} = \\mathbb{Z}$，所以 $\\chi = 1 - 0 + 1 = 2$ —— 与 $2 - 2g$ 一致。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12'],
    },

    {
      id: 'ex.torus',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '环面 T²',
      title: '环面 $T^{2} = S^{1} \\times S^{1}$：亏格 1，$\\chi = 0$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '$$T^{2} := S^{1} \\times S^{1} ,$$',
        '',
        '（乘积拓扑）是一个**闭可定向曲面**，亏格 $g = 1$，Euler 示性数 $\\chi(T^{2}) = 0$。',
      ].join('\n'),
      notes: [
        '⭐ **三种等价的描述**：① $S^{1} \\times S^{1}$；② 正方形对边粘合（$[0,1]^{2}$ 按 $(0,t)\\sim(1,t)$、' +
          '$(s,0)\\sim(s,1)$ 取商）；③ $\\mathbb{R}^{2}/\\mathbb{Z}^{2}$。第三种最方便算：' +
          '它就是「平面模整数平移」，基本群是 $\\mathbb{Z}^{2}$。',
        '⭐ **$\\chi = 0$ 的算法**：正方形粘合成的复形有 $V = 1$、$E = 2$、$F = 1$，' +
          '故 $\\chi = 1 - 2 + 1 = 0$，与 $2 - 2g = 0$ 一致。',
        '⭐ **它是「咖啡杯 = 甜甜圈」那句话的主角**：两者都同胚于 $T^{2}$（杯子有一个洞、' +
          '甜甜圈有一个洞），所以拓扑上不可区分 —— 与它们嵌在 $\\mathbb{R}^{3}$ 里的**几何形状**无关' +
          '（那是 $\\mathbb{R}^{3}$ 里参数化曲面那一侧 那一侧的事）。',
        '⚠ **$T^{2}$ 不能嵌入 $\\mathbb{R}^{2}$**：它是紧的、无边界、2 维，' +
          '若嵌进平面就得是平面里的紧开集 —— 只有空集。所以「画在纸上」的环面只是它的**投影**。',
        '📌 $H_{0} = \\mathbb{Z}$、$H_{1} = \\mathbb{Z}^{2}$、$H_{2} = \\mathbb{Z}$，' +
          '$\\chi = 1 - 2 + 1 = 0$；注意 $H_{1}$ 的秩是 **2**，而亏格是 **1**（`def.genus` 里那个「除以 2」的来处）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, Ch. 1'],
    },

    {
      id: 'ex.projective-plane',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '射影平面 RP²',
      title: '射影平面 $\\mathbb{RP}^{2}$：闭不可定向曲面，$k = 1$，$\\chi = 1$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '$$\\mathbb{RP}^{2} := S^{2} \\big/ (x \\sim -x) ,$$',
        '',
        '（对径粘合的商拓扑）是一个**闭不可定向曲面**，不可定向亏格 $k = 1$，' +
          'Euler 示性数 $\\chi(\\mathbb{RP}^{2}) = 1$。',
      ].join('\n'),
      notes: [
        '⭐ **三个等价描述**：① 球面按对径点粘合；② 圆盘把边界上的对径点粘合；' +
          '③ 正方形对边**反向**粘合（$T^{2}$ 是「同向」粘合，差别就在这个反向上）。',
        '⭐ **$\\chi = 1$ 的算法**：从圆盘出发（$\\chi = 1$），把边界对径粘起来相当于粘一条「半扭转的带子」，' +
          '它把边界吃掉了，$V$ 从一整圈变成 1 个点、$E$ 变成 1 条闭曲线，于是 $\\chi = 1 - 1 + 1 = 1$，' +
          '与 $2 - k = 1$ 一致。',
        '⭐ **不可定向的直观理由**：在 $\\mathbb{RP}^{2}$ 上沿一条直线走一圈回来，' +
          '「正面」会变成「反面」—— 它就是**莫比乌斯带的「盖子」**：' +
          '把莫比乌斯带的边界（一条圆）粘上一个圆盘，得到 $\\mathbb{RP}^{2}$。',
        '⚠ **$\\mathbb{RP}^{2}$ 不能嵌入 $\\mathbb{R}^{3}$**（紧无边的不可定向闭曲面都嵌不进 $\\mathbb{R}^{3}$；' +
          '要嵌得跳到 $\\mathbb{R}^{4}$）。所以「画不出来」不是画技问题，是拓扑事实 —— ' +
          '常见的「交叉帽」图是它的**浸入**，不是嵌入。',
        '📌 $H_{1}(\\mathbb{RP}^{2};\\mathbb{Z}) \\cong \\mathbb{Z}/2$（纯挠，自由秩 0），' +
          '$H_{2} = 0$，故 $\\chi = 1 - 0 + 0 = 1$。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, Ch. 2.2'],
    },

    {
      id: 'ex.klein-bottle',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '克莱因瓶',
      title: '克莱因瓶：闭不可定向曲面，$k = 2$，$\\chi = 0$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '克莱因瓶 $K$ 是 $\\mathbb{RP}^{2} \\# \\mathbb{RP}^{2}$（两个射影平面的连通和），' +
          '也是「正方形对边按一同一反粘合」得到的商空间。它是一个**闭不可定向曲面**，' +
          '不可定向亏格 $k = 2$，$\\chi(K) = 0$。',
      ].join('\n'),
      notes: [
        '⭐ **两种等价描述**：① 正方形：一对对边**同向**粘（像 $T^{2}$）、另一对**反向**粘；' +
          '② 两个莫比乌斯带沿边界粘起来。两种说法给出同一个曲面（本图只记结论，不证）。',
        '⭐ **$\\chi = 0$**：$2 - k = 2 - 2 = 0$。注意这与**环面**相同 ——' +
          '所以「$\\chi = 0$」这条信息本身不足以认出克莱因瓶，还得看可定向性。' +
          '这两个曲面是「同一张 $\\chi$、两种拓扑型」的典型例子。',
        '⚠ **仍然嵌不进 $\\mathbb{R}^{3}$**：任何紧无边的不可定向闭曲面都嵌不进 $\\mathbb{R}^{3}$。' +
          '那个著名的「瓶脖子穿过瓶身」的玻璃模型是一个**浸入**（自交的像），不是嵌入。',
        '📌 $H_{1}(K;\\mathbb{Z}) \\cong \\mathbb{Z} \\oplus \\mathbb{Z}/2$，$H_{2} = 0$，' +
          '故 $\\chi = 1 - 1 + 0 = 0$。',
        '⚠ 克莱因瓶 = 两个**莫比乌斯带**沿边界粘起来（`def.mobius-band`）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12'],
    },
  ],

  edges: [
    /* -------- 两条判据式的前提 -------- */
    {status: 'skeleton', 
      id: 'dep.classification-eulerchargenus',
      kind: 'analogy',
      a: 'thm.classification-surfaces',
      b: 'prop.eulerchar-genus',
      note: '命题的证明**不用**分类定理（节点注写明改走 Radó + 初等路线，$\\chi=2-2g$ 可由同调直接算出）；保留这条只作「标准形 = $g$ 个环面的连通和」的类比视角。',
    },
    {status: 'skeleton', 
      id: 'dep.eulerchar-eulerchargenus',
      kind: 'implication',
      sources: ['thm.euler-characteristic'],
      target: 'prop.eulerchar-genus',
      title: '$\\chi$ 的两种算法给出 $\\chi=2-2g$',
      proof: '命题先由任一三角剖分数出 $\\chi(S)$，再由 $g=\\tfrac12\\operatorname{rank}H_{1}(S;\\mathbb{Z})$ 得 $\\beta_{0}=1$、$\\beta_{1}=2g$、$\\beta_{2}=1$，于是 $\\chi=2-2g$。把两种算法接起来靠的正是 `thm.euler-characteristic` 的 $\\chi=\\sum_{p}(-1)^{p}\\alpha_{p}=\\sum_{p}(-1)^{p}\\beta_{p}$；没有它，组合侧的数与同调侧的 $g$ 无法对齐，「与剖分无关」也无从谈起。∎',
      note: '$\\chi$ 的两种算法（数单纯形 / 数 Betti 数）相等，正是这条定理的内容。',
    },
    {status: 'skeleton', 
      id: 'dep.genus-eulerchargenus',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'prop.eulerchar-genus',
      note: '命题说的就是「$\\chi$ 与 $g$ 互相决定」，$g$ 的定义必须在这里。',
    },
    {status: 'skeleton', 
      id: 'dep.classification-eulercharnonor',
      kind: 'analogy',
      a: 'thm.classification-surfaces',
      b: 'prop.eulerchar-nonorientable',
      note: '不可定向标准形同样只是类比视角：命题假设已限定在标准形，不需要分类定理。',
    },
    {
      id: 'dep.eulerchar-eulercharnonor',
      kind: 'implication',
      sources: ['thm.euler-characteristic'],
      target: 'prop.eulerchar-nonorientable',
      title: '$\\chi=V-E+F$ 递推给出 $\\chi=2-k$',
      proof: '先算 $\\chi(\\mathbb{RP}^{2})=6-15+10=1$（正二十面体按对径点粘合），再用连通和公式 $\\chi(S_{k})=\\chi(S_{k-1})+\\chi(\\mathbb{RP}^{2})-2$ 递推得 $\\chi(S_{k})=2-k$。两处用的都是 `thm.euler-characteristic` 的组合算法 $\\chi=V-E+F$；最后「与剖分无关」再用它的同调算法 $\\chi=\\sum_{p}(-1)^{p}\\beta_{p}$。∎',
      note: '$\\chi$ 的组合算法（$V - E + F$）是这一条的另一半。',
    },
    /* -------- 四个例子都是闭曲面 -------- */
    {
      id: 'dep.closedsurface-sphere',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.sphere',
      note: '球面满足闭曲面的三个条件：紧（$\\mathbb{R}^{3}$ 里的有界闭集）、连通、无边界。',
    },
    {
      id: 'dep.closedsurface-torus',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.torus',
      note: '$S^{1} \\times S^{1}$ 是紧空间的乘积，故紧；连通、无边界同理。',
    },
    {
      id: 'dep.closedsurface-rp2',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.projective-plane',
      note: '紧空间的对径商仍紧（连续像），连通性与无边界继承下来。',
    },
    {
      id: 'dep.connectedsum-klein',
      kind: 'definition',
      definition: 'def.connected-sum',
      usedBy: 'ex.klein-bottle',
      note: '克莱因瓶的定义（$\\mathbb{RP}^{2} \\# \\mathbb{RP}^{2}$）里直接用到连通和。',
    },
    {
      id: 'dep.closedsurface-klein',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.klein-bottle',
      note: '两个闭曲面的连通和仍是闭曲面（紧、连通、无边界都保持）。',
    },
    /* -------- 例子与分类定理：例子里报的就是定理里的标准形 -------- */
    {
      id: 'dep.genus-sphere',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'ex.sphere',
      note: '球面的 $g = 0$ 不是「约定」：$H_{1}(S^{2}) = 0$，所以 $\\tfrac{1}{2}\\operatorname{rank} = 0$。',
    },
    {
      id: 'dep.genus-torus',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'ex.torus',
      note: '环面的 $g = 1$：$H_{1} \\cong \\mathbb{Z}^{2}$，秩 2，除以 2 得 1。',
    },
    {status: 'skeleton', 
      id: 'dep.eulerchargenus-torus',
      kind: 'analogy',
      a: 'prop.eulerchar-genus',
      b: 'ex.torus',
      note: '例子里「$\\chi = 0$」这个值由这条命题（$2 - 2g$）算出，不是另算的。',
    },
    {
      id: 'dep.eulercharnonor-rp2',
      kind: 'analogy',
      a: 'prop.eulerchar-nonorientable',
      b: 'ex.projective-plane',
      note: '「$k = 1$、$\\chi = 1$」由不可定向那条判据（$2 - k$）读出。',
    },
    {
      id: 'dep.eulercharnonor-klein',
      kind: 'analogy',
      a: 'prop.eulerchar-nonorientable',
      b: 'ex.klein-bottle',
      note: '「$k = 2$、$\\chi = 0$」同上。',
    },
    {status: 'skeleton',  id: 'def-link.toporient-eg', kind: 'definition', definition: 'def.topological-orientability', usedBy: 'prop.eulerchar-genus', note: '引理 D 用定向图册给 2-单形一致定向' },
    { id: 'def-link.toporient-nonor', kind: 'definition', definition: 'def.topological-orientability', usedBy: 'prop.eulerchar-nonorientable', note: '不可定向=不存在定向图册；标准形 $k$ 个 $\\mathbb{RP}^{2}$ 的连通和' },
    { id: 'def-link.topmanifold-toporient', kind: 'definition', definition: 'def.topological-manifold', usedBy: 'def.topological-orientability', note: '拓扑流形上才谈定向图册/定向双覆盖' },

    {status: 'skeleton',  id: 'def-link.lebnum-eulerchar', kind: 'definition', definition: 'def.lebesgue-number', usedBy: 'prop.eulerchar-genus',
      note: '证明对覆盖取勒贝格数来控制单纯形直径（小于勒贝格数就整块落在一个开集里）—— 定义直接进入第 2 步。' },
    {status: 'skeleton',  id: 'def-link.barysub-eulerchar', kind: 'definition', definition: 'def.barycentric-subdivision', usedBy: 'prop.eulerchar-genus',
      note: '证明反复作重心重分把网格按 $n/(n+1)$ 缩小，同调不变性由这条定义的性质给出。' },
    {status: 'skeleton', 
      id: 'imp.eulerchar-inputs',
      kind: 'implication',
      sources: ['thm.rado', 'thm.simplicial-approximation', 'prop.h0-components'],
      target: 'prop.eulerchar-genus',
      title: 'Radó 三角剖分 + 单纯逼近 + $H_{0}$ 连通分支 $\\implies \\chi = 2-2g$（依赖登记）',
      proof: [
        '**这条边只登记依赖，不证结论。** 三者合起来才是证明的输入，没有哪一个单独能推出 $\\chi = 2 - 2g$：',
        '',
        '1. `thm.rado`（Radó 三角剖分存在性）：先把闭可定向曲面变成有限单纯复形 $K$，之后 $\\chi(K)$ 才有定义；',
        '2. `thm.simplicial-approximation`：把连续映射换成单纯映射，于是 $H_{2}(S) \\cong H_{2}(K^{\\prime}) \\cong \\mathbb{Z}$；',
        '3. `prop.h0-components`：$H_{0}(S) \\cong \\mathbb{Z}$ 来自 $S$ 连通，即 $b_{0} = 1$。',
        '',
        '代入 $\\chi = b_{0} - b_{1} + b_{2}$ 得 $\\chi = 1 - 2g + 1 = 2 - 2g$。',
      ].join('\n'),
      note: '⚠ 这是**依赖登记**边，不是蕴含：把证明用到的三个外部输入登记在图上，读图时能看到本命题缺哪一块就不成立。',
    },
  ],
});
