/* ==========================================================================
   内容包 · 紧 Haus 与 Stone（16 条）
   --------------------------------------------------------------------------
   第六团：Stone–Čech 紧化 → 自由紧 Haus → 投射对象 → 全不连通 / 极端不连通
   → Stone 空间 = 投射有限空间 → Gleason 定理。

   依赖顺序：CHaus 是反射子范畴，反射是 β；β 给出自由对象；自由对象是投射对象；
   再往细分出全不连通、Stone、Stonean，最后用投射对象给 Stonean 一个判据。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '紧 Haus 与 Stone',
  nodes: [

    /* ---------------------------------------------------- 紧 Haus 范畴 */
    {
      id: 'def.chaus',
      cluster: 'topo.chaus',
      type: 'definition',
      label: '紧 Hausdorff 空间范畴',
      title: '紧 Hausdorff 空间范畴 $\\mathbf{CHaus}$',
      regions: ['topology'],
      tags: ['范畴论', '紧', 'Hausdorff'],
      statement: [
        '**紧 Hausdorff 空间**是既紧又 Hausdorff 的拓扑空间。以它们为对象、连续映射为态射，得到范畴 $\\mathbf{CHaus}$。含入函子记 $\\mathbf{CHaus} \\hookrightarrow \\mathbf{Top}$。'
      ].join('\n'),
      notes: [
        '紧跟 Hausdorff 放在一起是一件很划算的事：**紧 Hausdorff 是正则的、正规的**，而且从紧空间到 Hausdorff 空间的连续双射自动是同胚。很多在 $\\mathbf{Top}$ 里要额外假设的东西，在这里是免费的。',
        '$\\mathbf{CHaus}$ 里**任意极限存在**，并且就是 $\\mathbf{Top}$ 里算完之后那个结果（见「紧 Haus 是反射子范畴」那条）。'
      ].join('\n\n')
    },

    /* ------------------------------------------ CHaus 是反射子范畴 */
    {
      id: 'prop.chaus-reflective',
      cluster: 'topo.chaus',
      type: 'proposition',
      label: '紧 Haus 是反射子范畴',
      title: 'Stone–Čech 紧化',
      regions: ['topology'],
      tags: ['范畴论', 'Stone–Čech', '反射'],
      statement: [
        '$\\mathbf{CHaus}$ 是 $\\mathbf{Top}$ 的**反射子范畴**，反射叫 **Stone–Čech 紧化**：',
        '',
        '$$\\beta : \\mathbf{Top} \\longrightarrow \\mathbf{CHaus}, \\qquad X \\mapsto \\beta X$$',
        '',
        '即对每个 $X \\in \\mathbf{Top}$ 与每个紧 Hausdorff 空间 $K$，',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{CHaus}}\\bigl(\\beta X,\\ K\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}\\bigl(X,\\ K\\bigr)$$',
        '',
        '而且含入 $X \\to \\beta X$ 在 $X$ 本身紧 Hausdorff 时是同构。'
      ].join('\n'),
      notes: [
        '构造：把 $X$ 送进 Tychonoff 方块',
        '',
        '$$e_{X} : X \\longrightarrow [0,1]^{C(X,[0,1])}, \\qquad x \\mapsto (f(x))_{f}$$',
        '',
        '再取闭包 $\\beta X := \\overline{e_{X}(X)}$。方块紧 Hausdorff，闭子集因而也紧 Hausdorff。',
        '⭐ **$e_{X}$ 是单射 $\\iff$ $X$ 是 Tychonoff（$T_{3.5}$）空间** —— 即连续函数多到能分开不同的点。所以对于一般拓扑空间，$\\beta X$ 是把「连续函数看得出的信息」全部收进来之后的紧化。',
        '推论：**紧 Hausdorff 空间的任意极限自动是紧 Hausdorff 的**。这是反射子范畴对极限封闭的一般结论在这里的样子 —— 以后在 $\\mathbf{CHaus}$ 里取极限，不必再回头验紧性与 Hausdorff 性。'
      ].join('\n\n')
    },

    /* ---------------------------------------------- 极小闭子集引理 */
    {
      id: 'lem.minimal-closed-surjection',
      cluster: 'topo.chaus',
      type: 'lemma',
      label: '满射的极小闭子集',
      title: '满连续映射的极小闭子集',
      regions: ['topology'],
      tags: ['范畴论', '紧', '佐恩引理'],
      statement: [
        '设 $f : S \\to T$ 是紧 Hausdorff 空间之间的连续满射。则存在**极小**的闭子集 $S\' \\subseteq S$，使限制 $f|_{S\'}$ 仍然是满射。'
      ].join('\n'),
      notes: '证明用佐恩引理：把「$f$ 在其上满」的闭子集族按**反包含**排序，链的上界取交 —— 紧性保证交出来的闭子集仍然满（若非满，剩下的那个紧集会被一列越来越小的闭集挖空，与有限交性质矛盾）。于是有极大元，在原序下就是极小闭子集。'
    },

    /* ------------------------------------------------ 自由紧 Haus */
    {
      id: 'def.free-compact-hausdorff',
      cluster: 'topo.chaus',
      type: 'definition',
      label: '自由紧 Hausdorff 空间',
      title: '自由紧 Hausdorff 空间（Free Compact Hausdorff Space）',
      regions: ['topology'],
      tags: ['范畴论', '自由', 'Stone–Čech'],
      statement: [
        '**自由紧 Hausdorff 空间**就是某个离散空间 $I$ 的 Stone–Čech 紧化 $F \\cong \\beta I$。称 $I$ 是 $F$ 的一组**基**：此时',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{CHaus}}(F, S) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}(I, S) \\;=\\; S^{I}$$',
        '',
        '即连续映射 $F \\to S$ 与 $S$ 中一族点 $(t_{i})_{i \\in I}$ 一一对应。这族点使 $F \\to S$ 成为满射时，叫 $F$ 的**生成元**。'
      ].join('\n'),
      notes: '「自由」两个字在这里的含义和自由群、自由模完全一样：**在 $I$ 上没有任何约束**（$I$ 是离散的，所以从 $I$ 出发的映射随便给点就是连续的），于是「$F$ 到别处的映射」与「$I$ 上的一族点」是一回事。'
    },

    /* -------------------------------------------- CHaus 是自由的商 */
    {
      id: 'prop.chaus-quotient-of-free',
      cluster: 'topo.chaus',
      type: 'proposition',
      label: '紧 Haus 是自由的商',
      title: '每个紧 Hausdorff 空间都是自由紧 Hausdorff 空间的商',
      regions: ['topology'],
      tags: ['范畴论', '商', '自由'],
      statement: [
        '每个紧 Hausdorff 空间 $S$ 都是某个自由紧 Hausdorff 空间的**连续满像**：取 $S$ 上的离散拓扑，则',
        '',
        '$$F := \\beta\\, S^{\\mathrm{disc}} \\longrightarrow S$$',
        '',
        '是连续满射。'
      ].join('\n'),
      notes: [
        '恒等映射 $S^{\\mathrm{disc}} \\to S$ 连续（离散拓扑最细），沿它的 Stone–Čech 泛性质给出 $\\beta S^{\\mathrm{disc}} \\to S$。既然 $S^{\\mathrm{disc}} \\to S$ 已经是满射，而紧空间的连续满像 $\\beta S^{\\mathrm{disc}} \\to S$ 作用在稠密的 $S^{\\mathrm{disc}}$ 上已经覆盖了 $S$，满射性就跟着来了。',
        ['**证明（写成正式的）。** 记 $f : S^{\\mathrm{disc}}\\to S$ 为恒等映射，它连续（离散拓扑最细）。由 Stone–Čech 的**泛性质**，$f$ 唯一地延拓为 $\\bar f : \\beta S^{\\mathrm{disc}} \\to S$，使 $\\bar f\\circ\\iota = f$（$\\iota$ 是稠密嵌入）。',
          '- 由泛性质，两个映射 $\\beta S^{\\mathrm{disc}} \\rightrightarrows S$ 若在 $\\iota(S^{\\mathrm{disc}})$ 上相同则相等；',
          '- 于是 $\\bar f\\bigl(\\overline{\\iota(S^{\\mathrm{disc}})}\\bigr) = \\bar f(\\beta S^{\\mathrm{disc}})$（**连续性 + 稠密性**：像的闭包等于闭包在连续映射下的像）$= \\overline{f(S^{\\mathrm{disc}})} = \\overline{S} = S$ ✓。',
          '故 $\\bar f$ 满。∎',
          '⭐ 这条与「紧 Hausdorff 是 $\\mathbf{Top}$ 的反射子范畴」是一回事，只是换了个说法：反射子范畴里每个对象都是自由对象的商，而自由对象就是 $\\beta I$。'
        ].join('\n')
      ].join('\n\n')
    },

    /* ---------------------------------------------------- 投射对象 */
    {
      id: 'def.projective-object',
      cluster: 'topo.chaus',
      type: 'definition',
      label: '投射 / 内射对象',
      title: '投射对象与内射对象（Projective / Injective Object）',
      regions: ['topology'],
      tags: ['范畴论', '投射', '提升'],
      statement: [
        '范畴 $\\mathcal{C}$ 中对象 $P$ 叫**投射的**，如果函子 $h_{P} = \\operatorname{Hom}_{\\mathcal{C}}(P, -)$ **保持满态射**。对偶地，$I$ 叫**内射的**，如果 $h^{I}$ 把单态射送到满态射。',
        '',
        '展开成提升条件就是：对每个满态射 $A \\twoheadrightarrow B$ 与每个 $P \\to B$，都存在提升 $P \\to A$ 使三角形交换：',
        '',
        '$$\\begin{array}{ccc} & P & \\\\ \\swarrow & \\downarrow & \\searrow \\\\ A & \\twoheadrightarrow & B \\end{array}$$',
        '',
        '对偶地，$I$ 内射说的是每个 $A \\rightarrowtail B$ 与每个 $A \\to I$ 都能延拓成 $B \\to I$。'
      ].join('\n'),
      notes: [
        '「投射」这个名字来自模论：$R\\text{-}\\mathbf{Mod}$ 里的投射对象恰好是投射模，内射对象恰好是内射模 —— 那两条标准判据（$P$ 是直和项、$I$ 是直和项）就是这里的定义在模上的样子。',
        '两条立刻可用的推论：**$P$ 投射时任何满态射 $Y \\twoheadrightarrow P$ 都有截面**；**若 $X \\to Y$ 有收缩而 $Y$ 投射，则 $X$ 也投射**（内射的情形对偶）。',
        '在 $\\mathbf{Set}$ 里**每个对象都投射**，这就是选择公理：给定满射 $A \\twoheadrightarrow B$ 与 $B$ 中的点，总能挑一个原像。'
      ].join('\n\n')
    },

    /* ----------------------------------------- 自由紧 Haus 是投射的 */
    {
      id: 'prop.free-projective',
      cluster: 'topo.chaus',
      type: 'proposition',
      label: '自由紧 Haus 是投射对象',
      title: '自由紧 Hausdorff 空间是 $\\mathbf{CHaus}$ 的投射对象',
      regions: ['topology'],
      tags: ['范畴论', '投射', '自由'],
      statement: '自由紧 Hausdorff 空间是 $\\mathbf{CHaus}$ 中的投射对象。',
      notes: '设 $F \\cong \\beta I$，给定满态射 $T \\twoheadrightarrow S$ 与 $F \\to S$。由自由性，$F \\to S$ 等同于 $I$ 上的一族点，于是 $I \\to T$ 就是一个集合层的提升（$I$ 离散、$\\mathbf{Set}$ 中对象都投射，即选择公理）；再用 $\\beta I$ 的泛性质把它变回 $F \\to T$，而它自动与原有映射相容。∎'
    },

    /* ---------------------------------------------------- 自由表示 */
    {
      id: 'def.free-presentation',
      cluster: 'topo.chaus',
      type: 'definition',
      label: '自由表示',
      title: '自由表示（Free Presentation）',
      regions: ['topology'],
      tags: ['范畴论', '商', '等价关系'],
      statement: [
        '紧 Hausdorff 空间之间的连续满射 $F \\twoheadrightarrow S$ 叫 $S$ 的**自由表示**，如果',
        '',
        '1. $F$ 是自由紧 Hausdorff 空间；',
        '2. $F \\to S$ 是满态射；',
        '3. 令 $R := F \\times_{S} F$，则 $F \\to R$ 是满态射。',
        '',
        '此时 $S \\cong \\operatorname{coker}(R \\rightrightarrows F)$。'
      ].join('\n'),
      notes: [
        '对照集合里的那件事：对 $f : X \\to Y$，令 $R := X \\times_{Y} X = \\{(x_{1},x_{2}) : f(x_{1}) = f(x_{2})\\}$（「像相同的点对」），则 $X/R \\cong \\operatorname{im} f$（**Noether 第一同构定理**）；反过来，给定 $X$ 上的等价关系 $R$，把 $Y := X/R$，就有 $R = X \\times_{Y} X$。',
        '自由表示就是把这件事搬进 $\\mathbf{CHaus}$：$R$ 是「把像相同的点粘起来」那个等价关系，而第三条要求 $R$ 自己也能由一个自由紧 Hausdorff 空间满射过来 —— 于是整个 $S$ 由自由对象经过一次余等化子造出来。',
        '$\\mathbf{CHaus}$ 里有余等化子，所以 $\\operatorname{coker}(R \\rightrightarrows F)$ 存在；它就是商空间 $F/R$。'
      ].join('\n\n')
    },

    /* --------------------------------------------- 自由表示的存在性 */
    {
      id: 'cor.chaus-free-presentation',
      cluster: 'topo.chaus',
      type: 'corollary',
      label: '紧 Haus 都有自由表示',
      title: '每个紧 Hausdorff 空间都有自由表示',
      regions: ['topology'],
      tags: ['范畴论', '自由表示', '存在性'],
      statement: '每个紧 Hausdorff 空间 $S$ 都有自由表示。',
      notes: '取 $F = \\beta S^{\\mathrm{disc}}$（前一条命题：$F \\twoheadrightarrow S$ 满，且 $F$ 自由）。把同样的做法对 $S \\times_{S} S$ 再做一次，得到 $F\' \\twoheadrightarrow R$ 满。三条逐一满足：自由、满、以及对 $R$ 的那条满射。∎'
    },

    /* ------------------------------------------ 连通分量是闭开之交 */
    {
      id: 'prop.component-clopen',
      cluster: 'topo.stone',
      type: 'proposition',
      label: '连通分量是闭开邻域之交',
      title: '紧 Hausdorff 空间中连通分量 = 闭开邻域之交',
      regions: ['topology'],
      tags: ['范畴论', '连通分量', '闭开集'],
      statement: [
        '设 $S$ 是紧 Hausdorff 空间，$x \\in S$。则 $x$ 的连通分量等于一切包含 $x$ 的闭开集之交：',
        '',
        '$$C(x) \\;=\\; \\bigcap \\{\\, K \\subseteq S : K \\text{ 闭开},\\ x \\in K \\,\\}$$'
      ].join('\n'),
      notes: '证明见边上那条推导。要点是「**紧 Hausdorff 里有无穷多闭开集可用**」：紧 Hausdorff 空间是正规的（$T_{4}$），所以两个不交闭集能被开集分开，而紧性又把「开集分开」升级成「闭开集分开」。这条把 $\\pi_{0}$ 这个反射函子变得可算：连通分量不是抽象地取出来的，而是闭开集的交。'
    },

    /* ---------------------------------------- 全不连通 / 极端不连通 */
    {
      id: 'def.stone-space',
      cluster: 'topo.stone',
      type: 'definition',
      label: '全不连通与 Stone 空间',
      title: 'Stone 空间与 Stonean 空间（Stone / Stonean Space）',
      regions: ['topology'],
      tags: ['范畴论', 'Stone', '不连通'],
      statement: [
        '- $X$ **全不连通**（totally disconnected），如果其中每个连通分量都是单点；',
        '- $X$ **极端不连通**（extremally disconnected），如果任一开集的**闭包仍是闭开集**；',
        '- **Stone 空间** = 全不连通的紧 Hausdorff 空间；',
        '- **Stonean 空间** = 极端不连通的紧 Hausdorff 空间。'
      ].join('\n'),
      notes: [
        '记 $\\pi_{0}(X) := \\{\\, C(x) : x \\in X \\,\\}$ 为连通分量的集合，并赋予它**商拓扑**；$x \\mapsto C(x)$ 给出连续映射 $X \\to \\pi_{0}(X)$。',
        '两个字面上很像的条件分居两端：**全不连通**说「碎到每个分量只剩一个点」，**极端不连通**说「开集的闭包不再长大」。后者更强 —— 极端不连通的 $T_{1}$ 空间必全不连通。'
      ].join('\n\n')
    },

    /* -------------------------------------------- 极端不连通的性质 */
    {
      id: 'prop.stonean-basic',
      cluster: 'topo.stone',
      type: 'proposition',
      label: '极端不连通的基本性质',
      title: '极端不连通的性质',
      regions: ['topology'],
      tags: ['范畴论', '极端不连通', '闭包'],
      statement: [
        '**(a)** 若 $X$ 极端不连通，则任意两个不交开集 $U, V$ 的闭包仍不交：$\\overline{U} \\cap \\overline{V} = \\emptyset$。',
        '',
        '**(b)** 极端不连通的 Hausdorff 空间是**全不连通**的。'
      ].join('\n'),
      notes: [
        '**(a)** 反证：若 $\\overline{U} \\cap \\overline{V}$ 非空，取其中的点 $x$。因为 $X$ 极端不连通，$\\overline{U}$ 与 $\\overline{V}$ 都是闭开的，于是它们与自己的内部的关系逼出矛盾 —— 具体地说，$x$ 的每个邻域都要同时碰到 $U$ 与 $V$，而这两个闭开集又把 $x$ 与「另一个」隔开。',
        '**(b)** 设 $x \\ne y$。Hausdorff 性给出分离它们的开集 $U \\ni x$、$V \\ni y$，由 (a) 得两个不交的闭开集把 $x$ 与 $y$ 隔开，于是 $C(x) \\subseteq U \\not\\ni y$，$y \\notin C(x)$。所以每个连通分量是单点。',
        ['**把 (a) 写严。** 设 $U, V$ 不交开。令 $W := X\\setminus \\overline{V}$ —— 它开，且 $U\\subseteq W$。',
          '因为 $U\\subseteq W = W^{\\circ}$，取闭包得 $\\overline U\\subseteq\\overline{W^{\\circ}}$；而**极端不连通的等价刻画**是「任意开集的闭包开」，即 $\\overline{W^{\\circ}}$ 是开的，于是 $\\overline{W^{\\circ}} = W^{\\circ}$，所以 $\\overline U \\subseteq W^{\\circ} = W = X\\setminus\\overline V$，即 $\\overline U\\cap\\overline V = \\emptyset$ ✓。∎',
          '（等价说法：极端不连通 $\\iff$ 不交开集的闭包不交。）',
          '**(b) 写严**：由 (a)，Hausdorff 性给出的分离开集 $U\\ni x$、$V\\ni y$ 满足 $\\overline U\\cap\\overline V = \\emptyset$；而 $\\overline U$、$\\overline V$ 都是**闭开**的（极端不连通），于是它们构成 $x$ 与 $y$ 之间的一个开闭分隔：$x$ 的连通分量含于 $\\overline U$，故不含 $y$ ✓。于是每个连通分量是单点，即全不连通。∎'
        ].join('\n')
      ].join('\n\n')
    },

    /* ---------------------------------------- 全不连通是反射子范畴 */
    {
      id: 'prop.td-reflective',
      cluster: 'topo.stone',
      type: 'proposition',
      label: '全不连通空间是反射子范畴',
      title: '全不连通空间是 $\\mathbf{Top}$ 的反射子范畴',
      regions: ['topology'],
      tags: ['范畴论', '反射', '连通分量'],
      statement: [
        '全不连通空间构成的范畴是 $\\mathbf{Top}$ 的**反射子范畴**，反射是',
        '',
        '$$\\pi_{0} : \\mathbf{Top} \\longrightarrow \\mathbf{Top}_{\\mathrm{td}}, \\qquad X \\mapsto \\pi_{0}(X)$$',
        '',
        '并且 $X \\to \\pi_{0}(X)$ 是同构 $\\iff$ $X$ 全不连通。'
      ].join('\n'),
      notes: [
        '推论：**全不连通空间的任意极限仍是全不连通的** —— 因为 $\\pi_{0}$ 作为反射（一个左伴随）保余极限，而含入函子保极限。这条与「$\\mathbf{CHaus}$ 对极限封闭」叠起来，就是 Stone 空间与 Stonean 空间各自对极限封闭。',
        ['**证明。** 记 $\\mathbf{Top}_{\\mathrm{td}}$ 为全不连通空间范畴，含入 $i : \\mathbf{Top}_{\\mathrm{td}}\\hookrightarrow\\mathbf{Top}$。要证 $i$ 有左伴随 $\\pi_{0}$。',
          '- **构造**：$\\pi_{0}(X)$ 取 $X$ 的连通分量全体，配**商拓扑**（$X\\to\\pi_{0}(X)$ 把每点送到它的分量）。商拓扑下 $\\pi_{0}(X)$ 全不连通（连通分量的原像是……分量在商里是单点，而商空间里单点是否开闭要看原像是否开闭 —— 一般 $\\pi_{0}$ 只是「全不连通」而未必离散，符合要求）；',
          '- **泛性质**：任给 $f : X \\to Y$（$Y$ 全不连通）。连续映射把连通集送到连通集，而 $Y$ 的连通子集只有单点，故 $f$ 在每个连通分量上取常值，于是 $f$ 唯一地穿过 $X\\to\\pi_{0}(X)$ ✓。',
          '两个方向互逆，故 $\\pi_{0}\\dashv i$ ✓，即 $\\mathbf{Top}_{\\mathrm{td}}$ 是反射子范畴。',
          '**「$X\\to\\pi_{0}(X)$ 是同构」** $\\iff$ 每个分量是单点 $\\iff$ $X$ 全不连通 ✓。∎',
          '⭐ 推论读法：反射子范畴等价于「含入有左伴随」，而左伴随保余极限 —— 但这里要用的是**含入保极限**（右伴随保极限），于是全不连通空间的极限（在 $\\mathbf{Top}$ 里算）落回全不连通 ✓。'
        ].join('\n')
      ].join('\n\n')
    },

    /* ---------------------------------------------- Stone 是反射的 */
    {
      id: 'prop.stone-reflective',
      cluster: 'topo.stone',
      type: 'proposition',
      label: 'Stone 空间是 CHaus 的反射子范畴',
      title: 'Stone 空间是 $\\mathbf{CHaus}$ 的反射子范畴',
      regions: ['topology'],
      tags: ['范畴论', 'Stone', '反射'],
      statement: 'Stone 空间构成的范畴是 $\\mathbf{CHaus}$ 的反射子范畴。',
      notes: [
        '推论：**Stone 空间的任意极限仍是 Stone 空间**。把这条与「全不连通空间对极限封闭」并排看，就能读出 Stone 空间的双重身份：它既是「紧 Hausdorff 里全不连通的那些」，也是「紧 Hausdorff 这个反射子范畴里再反射一次剩下的那些」。',
        ['**证明。** Stone 空间 = 紧 Hausdorff **且**全不连通。把两个反射叠起来：',
          '- 含入 $\\mathbf{CHaus}\\hookrightarrow\\mathbf{Top}$ 有**左**伴随 $\\beta$（Stone–Čech 紧化），即 $\\mathbf{CHaus}$ 是反射子范畴；',
          '- 在 $\\mathbf{CHaus}$ 内部再取全不连通的那些：含入 $\\mathbf{Stone}\\hookrightarrow\\mathbf{CHaus}$ 有左伴随「取紧 Hausdorff 空间的连通分量商」$S\\mapsto S/\\!\\sim$（把每个连通分量压成一点），因为连续映射把紧 Hausdorff 的连通分量送到连通集、而全不连通空间里连通集只有单点；',
          '- 于是 $\\mathbf{Stone}\\hookrightarrow\\mathbf{CHaus}$ 是反射子范畴，反射是「取连通分量商」（它对紧 Hausdorff 空间仍是紧 Hausdorff ✓）。∎',
          '⭐ 反射子范畴的**含入保极限**，所以 Stone 空间的极限（在 $\\mathbf{CHaus}$ 或 $\\mathbf{Top}$ 里算）仍是 Stone ✓ —— 这正是「Stone 空间对极限封闭」。'
        ].join('\n')
      ].join('\n\n')
    },

    /* ---------------------------------------------------- 投射有限 */
    {
      id: 'def.profinite',
      cluster: 'topo.stone',
      type: 'definition',
      label: '投射有限空间',
      title: '投射有限空间（Profinite Space）',
      regions: ['topology'],
      tags: ['范畴论', '投射有限', '有向极限'],
      statement: [
        '**投射有限空间**是有限离散空间沿一个**有向**系统取极限得到的拓扑空间：',
        '',
        '$$X \\;=\\; \\varprojlim_{i \\in I} X_{i}, \\qquad X_{i} \\text{ 有限离散},\\quad I \\text{ 有向}$$'
      ].join('\n'),
      notes: '「pro-finite」= 有限者的投射极限。直观上它是「越来越细的有限分辨率」堆出来的对象：$X_{i}$ 是第 $i$ 层分辨率下的样子，$I$ 有向保证任意两层分辨率都能同时加细。'
    },

    /* ---------------------------------------------- Stone ⟺ 投射有限 */
    {
      id: 'thm.stone-profinite',
      cluster: 'topo.stone',
      type: 'theorem',
      label: 'Stone ⟺ 投射有限',
      title: 'Stone 空间 $\\iff$ 投射有限空间',
      regions: ['topology'],
      tags: ['范畴论', 'Stone', '投射有限'],
      statement: '拓扑空间是 Stone 空间 $\\iff$ 它是投射有限空间。'
    },

    /* ---------------------------------------------------- Gleason */
    {
      id: 'thm.gleason',
      cluster: 'topo.stone',
      type: 'theorem',
      label: 'Gleason 定理',
      title: 'Gleason 定理：$\\mathbf{CHaus}$ 的投射对象',
      regions: ['topology'],
      tags: ['范畴论', 'Gleason', '投射对象'],
      statement: '$\\mathbf{CHaus}$ 中的**投射对象恰好是 Stonean 空间**。'
    },

    /* ------------------------------------------------ Stonean 是收缩核 */
    {
      id: 'cor.stonean-retract',
      cluster: 'topo.stone',
      type: 'corollary',
      label: 'Stonean 是收缩核',
      title: 'Stonean 空间 = 自由紧 Hausdorff 空间的收缩核',
      regions: ['topology'],
      tags: ['范畴论', '收缩核', 'Stonean'],
      statement: [
        'Stonean 空间恰好是自由紧 Hausdorff 空间的**收缩核**：存在连续映射 $r : X \\to A$ 使 $r|_{A} = 1_{A}$（这样的 $A$ 叫 $X$ 的收缩核）。'
      ].join('\n'),
      notes: [
        '这条把 Gleason 定理翻译成了一句「具体拓扑」的话：投射性 = 收缩核。与模论里「投射模 = 自由模的直和项」完全平行 —— 两者都是「投射 = 从自由对象上切一块下来」。',
        ['**证明（把 Gleason 与「$\\mathbf{CHaus}$ 里每个对象都是自由的商」拼起来）。**',
          '- **$(\\implies)$**：设 $A$ 是 Stonean。取自由紧 Hausdorff 空间 $F$ 与满射 $p : F\\twoheadrightarrow A$（「$\\mathbf{CHaus}$ 里每个对象都是自由的商」）。Stonean $\\implies$ 由 **Gleason 定理** $A$ 是 $\\mathbf{CHaus}$ 里的**投射对象**，于是满射 $p : F\\to A$ 有**截面** $s : A\\to F$，即 $p\\circ s = \\mathrm{id}_{A}$ —— 这正是「$A$ 是 $F$ 的收缩核」（取 $r := p$）✓。',
          '- **$(\\Longleftarrow)$**：若 $A$ 是自由对象 $F$ 的收缩核（$r: F\\to A$，$r|_A = \\mathrm{id}$），则由**投射对象的收缩核仍投射**（标准事实：投射对象的直和项/收缩核还是投射的），$A$ 在 $\\mathbf{CHaus}$ 里投射；再由 Gleason 定理，$A$ 是 Stonean ✓。∎',
          '⭐ 这条是「Stonean = 自由紧 Hausdorff 的收缩核」的完整论证，也是后面「$\\mathbb{Z}[S]$ 投射」的来源（$S$ 的收缩核给出截面，截面给出 $\\mathbb{Z}[S]$ 的投射性）。'
        ].join('\n')
      ].join('\n\n')
    }
  ],

  edges: [

    /* -------------------------------------- Stone–Čech 的泛性质 */
    {
      id: 'imp.stone-cech',
      kind: 'implication',
      sources: ['def.chaus', 'def.compact'],
      target: 'prop.chaus-reflective',
      title: '构造 $\\beta X$ 并验证泛性质',
      proof: [
        '**构造。** 把 $X$ 送进 Tychonoff 方块：',
        '',
        '$$e_{X} : X \\to [0,1]^{C(X,[0,1])}, \\qquad x \\mapsto (f(x))_{f \\in C(X,[0,1])}$$',
        '',
        '每个分量 $x \\mapsto f(x)$ 连续，所以 $e_{X}$ 连续（到积空间的映射连续 $\\iff$ 每个分量连续）。由 Tychonoff 定理方块紧，取闭包',
        '',
        '$$\\beta X := \\overline{e_{X}(X)} \\subseteq [0,1]^{C(X,[0,1])}$$',
        '',
        '闭子集紧、方块 Hausdorff 而子空间 Hausdorff，所以 $\\beta X \\in \\mathbf{CHaus}$。',
        '',
        '**函子性。** 连续映射 $\\varphi : X \\to Y$ 诱导 $C(Y,[0,1]) \\to C(X,[0,1])$（$g \\mapsto g \\circ \\varphi$），进而诱导方块的映射 $[0,1]^{C(X,[0,1])} \\to [0,1]^{C(Y,[0,1])}$；它把 $e_{X}(X)$ 送到 $e_{Y}(Y)$，于是把闭包送到闭包，得到 $\\beta\\varphi : \\beta X \\to \\beta Y$。',
        '',
        '**泛性质。** 设 $K \\in \\mathbf{CHaus}$，$f : X \\to K$ 连续。紧 Hausdorff 空间是 $T_{3.5}$ 的（不同的点可被连续函数分离），所以 $e_{K} : K \\to [0,1]^{C(K,[0,1])}$ 是单射；把 $K$ 看成那个方块里的子空间，目标就变成「造一个 $\\widehat{f}$ 使右下三角交换」：',
        '',
        '$$\\begin{array}{ccc} X & \\xrightarrow{\\ e_{X}\\ } & \\beta X \\subseteq [0,1]^{C(X,[0,1])} \\\\ & \\searrow\\scriptstyle{f} & \\downarrow\\scriptstyle{\\widehat{f}} \\\\ & & K \\subseteq [0,1]^{C(K,[0,1])} \\end{array}$$',
        '',
        '用分量定义 $\\widehat{f}$：对每个 $g \\in C(K,[0,1])$，令第 $g$ 个分量为',
        '',
        '$$(\\pi_{g} \\circ \\widehat{f}) := \\pi_{g \\circ f} : [0,1]^{C(X,[0,1])} \\longrightarrow [0,1]$$',
        '',
        '即「把第 $g$ 个坐标读成 $g \\circ f$ 那个坐标」。每个分量连续，所以 $\\widehat{f}$ 连续；在 $e_{X}(x)$ 上验证：',
        '',
        '$$\\bigl(\\pi_{g} \\circ \\widehat{f}\\bigr)\\bigl(e_{X}(x)\\bigr) = (g \\circ f)(x) = \\pi_{g}\\bigl(j_{K}(f(x))\\bigr)$$',
        '',
        '所以 $\\widehat{f} \\circ e_{X} = j_{K} \\circ f$，即 $f = \\widehat{f} \\circ e_{X}$（把 $K$ 与它在方块里的像等同）。',
        '',
        '**落回 $K$ 里。** 还差 $\\widehat{f}(\\beta X) \\subseteq j_{K}(K)$。只需在稠密的 $e_{X}(X)$ 上验：由上式 $\\widehat{f}(e_{X}(x)) = j_{K}(f(x)) \\in j_{K}(K)$。而 $j_{K}(K)$ 在方块里是紧的因而闭，取闭包即得 $\\widehat{f}(\\beta X) \\subseteq j_{K}(K)$。',
        '',
        '**唯一性。** 两个这样的 $\\widehat{f}$ 在稠密的 $e_{X}(X)$ 上相等，而目标是 Hausdorff，所以处处相等。∎'
      ].join('\n'),
      note: '关键只有两处：**Tychonoff 定理**给出紧性，**$T_{3.5}$ 性**保证 $e_{K}$ 是单射（否则「落回 $K$ 里」那一步没意义）。'
    },

    /* ------------------------------------------------ 连通分量那条 */
    {
      id: 'imp.component-clopen',
      kind: 'implication',
      sources: ['def.connected', 'def.clopen', 'def.chaus'],
      target: 'prop.component-clopen',
      title: '紧 Hausdorff 中连通分量是闭开邻域之交',
      proof: [
        '记 $C := \\bigcap \\{K : K \\text{ 闭开},\\ x \\in K\\}$。',
        '',
        '**$C(x) \\subseteq C$。** 每个含 $x$ 的闭开集 $K$ 都是既不空又不全的开集，所以 $x$ 的连通分量只能整个落在 $K$ 里或整个落在 $K$ 外；既然 $x \\in K$，就有 $C(x) \\subseteq K$。对一切这样的 $K$ 取交即得。',
        '',
        '**$C$ 连通。** 反设 $C = F \\sqcup G$，其中 $F, G$ 在 $C$ 中闭、不交、非空，并设 $x \\in F$。$C$ 是闭集之交因而闭，于是 $F, G$ 在 $S$ 中闭。紧 Hausdorff 空间正规，取不交开集 $U \\supseteq F$、$V \\supseteq G$。令 $K := (U \\cup V)^{c}$，它闭且 $K \\cap C = \\emptyset$。',
        '',
        '由 $C$ 的定义与 $K \\cap C = \\emptyset$，存在含 $x$ 的闭开集 $H$ 使 $H \\cap K = \\emptyset$，即 $H \\subseteq U \\cup V$。于是 $H \\cap U$ 与 $H \\cap V$ 都是 $H$ 中的闭开集（$U, V$ 不交故各自的补在 $H$ 中开），进而在 $S$ 中闭开（$H$ 闭开）。其中 $H \\cap U \\ni x$，所以由 $C$ 的定义 $C \\subseteq H \\cap U \\subseteq U$，从而 $C \\cap V = \\emptyset$，与 $G \\subseteq C \\cap V$ 非空矛盾。∎'
      ].join('\n'),
      note: '这一步是后面 Stone 对偶与 $\\mathrm{Cond}$ 里「连通分量可控」的来源：在 $\\mathbf{CHaus}$ 里，连通分量由**闭开集**这个可以自由摆弄的族描述出来。'
    },

    /* ------------------------------------------- Stone ⟺ 投射有限 */
    {
      id: 'imp.stone-profinite',
      kind: 'implication',
      sources: ['def.stone-space', 'def.profinite', 'prop.stone-reflective', 'def.topology-base'],
      target: 'thm.stone-profinite',
      title: 'Stone 空间 $\\iff$ 投射有限空间',
      proof: [
        '**（$\\Longleftarrow$）** 投射有限空间是 Stone 空间的有向极限。Stone 空间对极限封闭（Stone 空间是反射子范畴的推论），而有限离散空间显然是 Stone 空间，所以极限仍是 Stone。∎',
        '',
        '**（$\\Longrightarrow$）** 设 $S$ 是 Stone 空间。先证**闭开集构成拓扑基**。',
        '',
        '取 $x \\in S$ 与开邻域 $O \\ni x$。令 $\\mathcal{F} = \\{K : K \\text{ 闭开},\\ x \\in K\\} \\cup \\{\\, O^{c} \\,\\}$，则 $\\bigcap \\mathcal{F} = \\emptyset$：$O^{c}$ 与「含 $x$ 的闭开集」的交为空，因为 $x \\notin O^{c}$。由 $S$ 紧，存在有限个 $K_{1}, \\ldots, K_{n}$ 使',
        '',
        '$$(K_{1} \\cap \\ldots \\cap K_{n}) \\cap O^{c} = \\emptyset$$',
        '',
        '令 $U := K_{1} \\cap \\ldots \\cap K_{n}$，它是闭开的、含 $x$、且 $U \\subseteq O$。所以闭开集构成基。',
        '',
        '现在看**有限闭开划分**的集合：$\\mathcal{E} := \\{\\, E \\subseteq \\operatorname{Open}(S) \\setminus \\{\\emptyset\\} : E \\text{ 有限},\\ E \\text{ 中元素两两不交且闭开},\\ \\bigcup E = S \\,\\}$，按「加细」构成一个逆向系统（加细是部分序，任意两个划分都有公共加细，所以它是有向的）。每个划分 $E$ 给出商映射 $S \\to E$（送 $x$ 到包含它的那一块），目标有限离散。',
        '',
        '由此得到连续映射 $S \\to \\varprojlim_{E} E$。它是**连续双射**：闭开集构成基保证任何两个单点都能被某个划分分开（单射），而满射性由每块都非空得到。紧空间到 Hausdorff 空间的连续双射是同胚，于是 $S \\cong \\varprojlim_{E} E$，即 $S$ 投射有限。∎'
      ].join('\n'),
      note: '两头各用了一条前面的结论：正向用**闭开集构成基**（这是「全不连通 + 紧」的直接后果），反向用 **Stone 空间对极限封闭**。'
    },

    /* ---------------------------------------------------- Gleason */
    {
      id: 'imp.gleason',
      kind: 'implication',
      sources: ['def.projective-object', 'def.stone-space', 'def.chaus'],
      target: 'thm.gleason',
      title: '投射对象 $\\iff$ Stonean 空间',
      proof: [
        '**（投射 $\\Longrightarrow$ Stonean）** 设 $S$ 是 $\\mathbf{CHaus}$ 的投射对象，要证 $S$ 极端不连通，即任一开集 $U$ 的闭包闭开。',
        '',
        '令 $F := U^{c}$，考虑 $p : U \\sqcup F \\to S$（$U \\sqcup F$ 取不交并拓扑，$p$ 在 $U$ 与 $F$ 上取含入）—— 它是连续满射。由投射性，$p$ 有连续截面 $s : S \\to U \\sqcup F$，即 $p \\circ s = 1_{S}$。',
        '',
        '于是 $s(U) \\subseteq U$ 且 $p(s(U)) = U$；又 $p(F) \\cap U = \\emptyset$ 迫使 $s(U) \\subseteq U$。开集在连续映射下的原像开：$U = s^{-1}(U)$ 是开的；再由 $s^{-1}(F) = U^{c}$ 也开可得 $U$ 闭。所以 $U$ 闭开，$S$ 极端不连通。∎',
        '',
        '**（Stonean $\\Longrightarrow$ 投射）** 因为 $\\mathbf{CHaus}$ 有纤维积、满态射在这里是「universal」的，投射性等价于「每个满态射都有截面」。所以只要证：$S$ Stonean 时每个满态射 $f : T \\to S$ 都有截面。',
        '',
        '由「满射有极小闭子集」那条引理，可以设 $f$ 在**极小**意义下满：即没有真闭子集 $T\' \\subset T$ 使 $f|_{T\'}$ 满。我们来证这样的 $f$ 是单射。',
        '',
        '反设 $x \\ne x\' \\in T$ 且 $f(x) = f(x\')$。取不交邻域 $U \\ni x$、$U\' \\ni x\'$。$f$ 是闭映射（紧到 Hausdorff 的连续映射把闭集送到闭集），所以 $S_{1} := f(U^{c})$ 与 $S_{1}\' := f(U\'^{c})$ 是 $S$ 中的闭集。由 $f$ 的极小满性，$f|_{U^{c}}$ 与 $f|_{U\'^{c}}$ 都不满，故 $S_{1}, S_{1}\' \\subset S$；于是它们各自的补 $V := S \\setminus S_{1}$、$V\' := S \\setminus S_{1}\'$ 是非空开集，且 $V \\subseteq f(U)$、$V\' \\subseteq f(U\')$。',
        '',
        '$f(x) = f(x\') \\in V \\cap V\'$，所以 $V \\cap V\' \\ne \\emptyset$。又 $U, U\'$ 不交，故 $f(U) \\cap f(U\')$ 中的点只有可能来自交叠，于是 $V \\cap V\' \\subseteq \\overline{f(U)} \\cap \\overline{f(U\')}$。而 $V \\cap V\'$ 非空是开集、$S$ 极端不连通意味着不交开集的闭包不交（前一条性质），矛盾。',
        '',
        '所以 $f$ 是单射，从而是同胚，于是它有截面。∎'
      ].join('\n'),
      note: '两个方向用的是**同一条投射性**的两种面貌：一面是「把对象从它的两块拼回来」（$U \\sqcup F \\to S$ 有截面），另一面是「每个满射有截面」。'
    }
  ]
});
