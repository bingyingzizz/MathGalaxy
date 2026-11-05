/* ============================================================================
   内容包 · 曲面地形 第二刀（2026-11-03，T18 / 审计 B2）
   ----------------------------------------------------------------------------
   第一刀补了连通和与亏格。这一刀补**分类定理要说的那个对象**：
     · `def.topological-manifold` —— 拓扑流形（没有光滑结构的流形）
     · `def.closed-surface`      —— 闭曲面（紧、连通、无边界、2 维拓扑流形）
     · `thm.classification-surfaces` —— 闭曲面分类定理（陈述 + 骨架）
   之前这三种「曲面」在图里互不相等，而分类定理的主角**根本不存在**：
     `def.regular-surface` / `def.orientable-surface` 是 $\mathbb{R}^{3}$ 里的参数化曲面（外在）；
     `def.riemann-surface` 是一维复流形；`def.smooth-manifold` 带图册与光滑转移 —— 都不是它。

   ⚠️ **通名归位**（审计 §10 第②刀）：`def.orientable-surface` 是「$\mathbb{R}^{3}$ 里被参数化覆盖的
      可定向曲面」，通名「可定向曲面」应当让给拓扑侧。这里把它改名成
      「$\mathbb{R}^{3}$ 中的可定向曲面」，两者之间**只连类比边**（外在 vs 内蕴，不是同一件事）。
   ⚠️ 分类定理**只给骨架**：Radó 的「曲面可三角剖分」是**外部输入**（现在自成一个骨架节点 `thm.rado`，但本图不证它），
      所以 `status: 'skeleton'`，并在注里明说哪一步是本图没证的。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '曲面地形（二）：拓扑流形、闭曲面与分类定理',

  nodes: [
    {
      id: 'def.topological-manifold',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '拓扑流形',
      title: '拓扑流形（$n$ 维，不假设光滑结构）',
      regions: ['topology', 'diffgeom'],
      tags: ['定义', '拓扑', '流形'],
      statement: [
        '设 $n \\ge 0$。一个**拓扑空间** $M$ 叫 **$n$ 维拓扑流形**，如果',
        '',
        '- $M$ 是 **Hausdorff** 的；',
        '- $M$ 是**第二可数**的；',
        '- 每一点 $p \\in M$ 都有开邻域 $U$ 与一个**同胚** $\\varphi : U \\to V$，其中 $V \\subseteq \\mathbb{R}^{n}$ 是开集。',
        '',
        '这样的 $(U, \\varphi)$ 叫 $M$ 的一张**图卡**，$n$ 叫**维数**。',
      ].join('\n'),
      notes: [
        '⭐ **它比光滑流形弱**：只说「局部像 $\\mathbb{R}^{n}$」，**不要求**两张图卡之间的转移映射光滑。' +
          '所以「光滑流形」（`def.smooth-manifold`）是拓扑流形**加上**一个光滑图册 —— 两者是同一批点集上的不同结构。',
        '⭐ **Hausdorff 与第二可数是分开要的**：局部欧氏只约束「局部」，像「带两个原点的直线」' +
          '这种空间处处局部欧氏却不 Hausdorff；第二可数则排除「不可数多条实直线粘在一起」这种太肥的流形。' +
          '少了它们，许多定理（单位分解、可度量化）会失效。',
        '⚠ **维数良定义**要一条定理（区域不变性 / Brouwer）：同一个连通流形不能既 $n$ 维又 $m$ 维。' +
          '本图没有这条定理的节点，所以这里只记一句。',
        '📌 本图另一条线（`def.smooth-manifold`）是从**图册**出发造流形；这里是从**拓扑空间**出发加条件。' +
          '两条路给出同一批对象（在加上光滑结构之后），但**拓扑流形可以不光滑** —— 4 维以上确实存在' +
          '不可光滑化的拓扑流形（本图不展开）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Lee, Introduction to Topological Manifolds, Ch. 1'],
    },

    {
      id: 'def.closed-surface',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '闭曲面',
      title: '闭曲面（紧、连通、无边界的 2 维拓扑流形）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面'],
      statement: [
        '一个 **2 维拓扑流形** $S$（见 `def.topological-manifold`）叫**闭曲面**，如果',
        '',
        '- $S$ 是**紧**的；',
        '- $S$ 是**连通**的；',
        '- $S$ **没有边界**（每一点都有 $\\mathbb{R}^{2}$ 的开邻域，没有「半平面」型的点）。',
        '',
        '等价地：$S$ 是紧连通、无边界、局部同胚于 $\\mathbb{R}^{2}$ 的 Hausdorff 第二可数空间。',
      ].join('\n'),
      notes: [
        '⭐ **三个条件各有各的作用，缺一条分类定理就得改写**：',
        '- 去掉「连通」$\\implies$ 变成有限多个闭曲面的**不交并**（分类定理逐块用）；',
        '- 去掉「紧」$\\implies$ 出现无穷亏格、有无限多个洞的曲面（分类变得极复杂，本图不涉及）；',
        '- 去掉「无边界」$\\implies$ 得到带边闭曲面，靠「把边界粘上圆盘」回到闭的情形。',
        '⭐ **与另外三种「曲面」的区别**（这是本节点存在的理由）：',
        '`def.regular-surface` / `def.orientable-surface` 是 $\\mathbb{R}^{3}$ 里被参数化覆盖的点集（**外在**，' +
          '还带着度量与曲率）；`def.riemann-surface` 是一维**复**流形；本节点**只有拓扑**，' +
          '没有度量、没有复结构、也不预设嵌在某个欧氏空间里。',
        '⭐ 基本例子：球面 $S^{2}$、环面 $T^{2}$（亏格 1）、射影平面 $\\mathbb{RP}^{2}$（不可定向）、' +
          '克莱因瓶（不可定向）。⚠ 这四个都**已有节点**：`ex.sphere`、`ex.torus`、`ex.projective-plane`、`ex.klein-bottle`。' +
          '',
        '📌 亏格（`def.genus`）目前只对**可定向**闭曲面定义；不可定向那一侧要用另一套（$\\chi = 2 - k$）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12（Classification of Surfaces）', 'Massey, A Basic Course in Algebraic Topology'],
    },

    {
      id: 'thm.classification-surfaces',
      cluster: 'topology.surfaces',
      type: 'theorem',
      label: '闭曲面分类定理',
      title: '闭曲面分类：每个闭曲面是球面、或若干环面 / 射影平面的连通和',
      regions: ['topology'],
      tags: ['定理', '拓扑', '曲面'],
      status: 'skeleton',
      statement: [
        '设 $S$ 是**闭曲面**（`def.closed-surface`）。则 $S$ 同胚于下列之一，且这些互不同胚：',
        '',
        '- **球面** $S^{2}$；',
        '- $g$ 个**环面**的连通和 $T^{2}\\#\\cdots\\# T^{2}$（$g \\ge 1$），这叫**可定向**闭曲面，亏格 $g$；',
        '- $k$ 个**射影平面**的连通和 $\\mathbb{RP}^{2}\\#\\cdots\\#\\mathbb{RP}^{2}$（$k \\ge 1$），这叫**不可定向**闭曲面，不可定向亏格 $k$。',
        '',
        '并且两族互不重合：可定向与不可定向的闭曲面（除球面外）永不**同胚**。',
      ].join('\n'),
      notes: [
        '⚠ **本节点只给骨架，不是完整证明。** 本图的证明分三步，其中**第一步没有证**：',
        '',
        '1. **三角剖分的存在性（Radó 定理）**：每个紧曲面都可三角剖分。' +
          '这一步**不在本图里证**：它自成一个节点（`thm.rado`，陈述 + 骨架），本图只把它当**外部输入**。',
        '2. **组合层面化简**：在三角剖分上做「删去一个三角形」「翻边」这类操作，把三角剖分化成标准形' +
          '（每张面都是三角形、每条边恰好属于两个三角形，且顶点图是「扇」或「花」）。' +
          '这一步是纯组合的，长但初等 —— 本图没有展开。',
        '3. **读出标准形**：标准形只由两个量决定：可定向性与一个非负整数（$2-\\chi$），于是分类成立。' +
          '不同胚性靠的是（2）里化出来的**不变量**：$\\chi$ 与可定向性在同胚下不变（`thm.euler-characteristic`）。',
        '',
        '⭐ **判据（可定向侧）**：$g = \\tfrac{1}{2}\\operatorname{rank} H_{1}(S;\\mathbb{Z})$（`def.genus`），' +
          '且 $\\chi(S) = 2 - 2g$。所以「两个闭可定向曲面同胚 $\\iff$ 亏格相同 $\\iff$ $\\chi$ 相同」——' +
          '分类定理说的「只有一个整数不变量」。',
        '⭐ **判据（不可定向侧）**：$\\chi(S) = 2 - k$，而 $H_{1}(S;\\mathbb{Z}) \\cong \\mathbb{Z}^{k-1} \\oplus \\mathbb{Z}/2$，' +
          '所以 $k$ 由「$H_{1}$ 的自由秩加一」和「有没有 2-挠」一起定出。',
        '⚠ **$\\chi = 2 - 2g$ 与 $\\chi = 2 - k$ 在本图都还不是节点**（上面两条是陈述级的结论）。' +
          '这两条该各成一个命题节点，排在第三刀。',
        '📌 这条定理是**拓扑**定理：它只说拓扑型。要谈曲率（Gauss–Bonnet：$\\int K\\,dA = 2\\pi\\chi$）' +
          '得先给曲面一个度量 —— 那条桥是 `thm.gauss-bonnet`，与本定理通过 $\\chi$ 相认（见下面的类比边）。',
      ].join('\n\n'),
      refs: [
        'Munkres, Topology, Ch. 12（Classification of Surfaces）',
        'Massey, A Basic Course in Algebraic Topology, Ch. 1',
        'Radó, Über den Begriff der Riemannschen Fläche (1925)——三角剖分存在性',
      ],
    },

    /* ---------------------------------------------------------- 三角剖分 */
    {
      id: 'def.triangulation',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '三角剖分',
      title: '三角剖分（可剖分空间）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '单纯复形'],
      statement: [
        '设 $X$ 是拓扑空间。$X$ 的一个**三角剖分**是一对 $(K, h)$：',
        '',
        '- $K$ 是**单纯复形**（`def.simplicial-complex`），$|K|$ 是它的几何实现；',
        '- $h : |K| \\to X$ 是一个**同胚**。',
        '',
        '若这样的 $(K, h)$ 存在，称 $X$ **可三角剖分**。把每个单形在 $h$ 下的像叫 $X$ 的一个**面**',
        '（顶点 / 边 / 三角形），于是 $X$ 被写成一堆三角形的并，任意两个三角形只沿**整条边**或一个顶点相交。',
      ].join('\n'),
      notes: [
        '⚠️ 三角剖分是「**组合骨架 + 把它放进空间的那个同胚**」两件东西，不是单纯复形本身。',
        '所以「$X$ 可剖分」是拓扑性质，而「$K$ 长什么样」是组合数据 —— 两者必须分开看。',
        '⚠️ 剖分极不唯一：同一个 $S^{2}$ 有无穷多个本质不同的剖分（四面体、八面体、任意细分…）。',
        '所以任何「用剖分定义」的量，都必须先证**与剖分无关** —— $\\chi$ 那条（`prop.eulerchar-genus`）做的就是这件事。',
        '⭐ 单向蕴含：单纯复形自己总是可剖分的（取恒等），但**拓扑空间未必能** —— 这正是下一节要说的。',
        '📌 定义里没要求 $K$ 有限。紧空间上的剖分自动有限；非紧的（比如开曲面）只能用**局部有限**剖分。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, §2.1'],
    },

    /* ---------------------------------------------------------- Radó */
    {
      id: 'thm.rado',
      cluster: 'topology.surfaces',
      type: 'theorem',
      label: 'Radó 定理',
      title: 'Radó 定理：三角剖分存在性（紧曲面可三角剖分）',
      regions: ['topology'],
      tags: ['定理', '拓扑', '曲面', '三角剖分'],
      status: 'skeleton',
      statement: [
        '每个**紧曲面**（紧、连通、$2$ 维拓扑流形，可带边界）都可三角剖分（`def.triangulation`）。',
        '',
        '等价的常用写法：每个紧连通曲面都同胚于某个**有限**单纯复形的几何实现。',
      ].join('\n'),
      notes: [
        '⚠️ **本节点只给陈述 + 骨架，不是证明。** 它原本在分类定理里被当作「外部输入」一句话带过 ——'
        + ' 本图把「三角剖分存在性」单列成一个节点，是为了把缺口的形状写清楚，而不是假装证过；',
        '完整证明在 Radó 原文（1925）里很长，而且它依赖本图还缺的两层地形：紧曲面的**共形结构存在性**',
        '（Radó 自己的路线，要 uniformization）或**光滑结构存在性**（Munkres / Whitehead 的路线）。',
        '',
        '两条经典路线（都只到骨架）：',
        '1. **复分析路线**：紧可定向曲面可赋一个复结构（成为 Riemann 面），再用分支覆盖 + 有限性得到剖分。',
        '2. **微分拓扑路线**：每个紧曲面有（本质唯一的）光滑结构，再用 Morse 理论 / 管状邻域割出三角形。',
        '',
        '⭐ **这是低维现象，不是普遍事实** —— 这一条最容易被误记成「每个流形都能剖分」：',
        '',
        '- $\\dim \\le 2$：Radó (1925)；$\\dim = 3$：Moise (1952)，所以 $\\dim \\le 3$ 都能三角剖分；',
        '- $\\dim = 4$：**不行** —— Freedman 的 $E_{8}$ 流形紧、拓扑，但不可三角剖分；',
        '- $\\dim \\ge 5$：有 Kirby–Siebenmann 的充要条件（存在一个上同调障碍，非零就不可剖分）。',
        '',
        '⚠️ 与「单纯逼近定理」（奇异同调 $=$ 单纯同调）区分：那条**假设**已经有剖分；',
        '这条说的是「剖分存在」。两条常被攬在一起。',
        '⚠️ 与「光滑流形」区分：光滑流形可剖分是另一个定理（Whitehead），不要拿光滑结构当既成事实。',
      ].join('\n\n'),
      refs: [
        'Radó, Über den Begriff der Riemannschen Fläche (1925)',
        'Moise, Affine structures in 3-manifolds (1952)',
        'Freedman, The topology of four-dimensional manifolds (1982)',
        'Munkres, Topology, Ch. 12',
      ],
    },
  ],

  edges: [
    /* -------- 三角剖分：它的两块原料 -------- */
    /* -------- 2026-11-04 clustercheck 抓出来的漏接（三角刨分 / Radó） -------- */
    {
      id: 'dep.topology-triangulation',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.triangulation',
      note: '三角刨分的定义域是**拓扑空间**（同胚是有拓扑才能谈的）。' +
        '之前这条没接，所以「拓扑空间」在三角刨分那里只是个词。',
    },
    {
      id: 'dep.triangulation-eulerchar',
      kind: 'definition',
      definition: 'def.triangulation',
      usedBy: 'prop.eulerchar-genus',
      note: '“chi 与刨分无关”这条命题本身就**得先有刨分**（chi 是用刨分算出来的），' +
        '而且它做的正是三角刨分那条注里说的「用刨分定义的量先证与刨分无关」。',
    },
    {
      id: 'dep.topmanifold-rado',
      kind: 'definition',
      definition: 'def.topological-manifold',
      usedBy: 'thm.rado',
      note: 'Radó 的主角是「紧曲面」= 2 维拓扑流形 + 紧（可带边界），所以它直接用拓扑流形这条定义。',
    },
    {
      id: 'dep.simpcomp-triangulation',
      kind: 'definition',
      definition: 'def.simplicial-complex',
      usedBy: 'def.triangulation',
      note: '三角剖分的骨架就是单纯复形；$|K|$ 是它的几何实现。',
    },
    {
      id: 'dep.topmanifold-triangulation',
      kind: 'definition',
      definition: 'def.topological-manifold',
      usedBy: 'def.triangulation',
      note: '被剖分的对象是拓扑空间（实际上就是曲面）：剖分只用到拓扑，不用光滑结构。',
    },
    {
      id: 'dep.triangulation-rado',
      kind: 'definition',
      definition: 'def.triangulation',
      usedBy: 'thm.rado',
      note: 'Radó 定理的结论就是「这种 $(K,h)$ 存在」。',
    },
    {
      id: 'dep.compact-rado',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'thm.rado',
      note: '「紧」是 Radó 的必要假设（开曲面也能剖分，但要局部有限的 $K$，证明也不同）。',
    },
    {
      id: 'dep.rado-classification',
      kind: 'definition',
      definition: 'thm.rado',
      usedBy: 'thm.classification-surfaces',
      note: '分类定理的**第一步**就是它：先有剖分，才能在组合层面做「删三角形 / 翻边」的化简。',
    },
    {
      id: 'dep.triangulation-simphomology',
      kind: 'definition',
      definition: 'def.triangulation',
      usedBy: 'thm.simplicial-approximation',
      note: '「奇异同调 $=$ 单纯同调」这条**默默假设了**曲面可剖分（要拿剖分算单纯同调）。以前这个假设在图上是隐形的。',
    },
    /* -------- 拓扑流形的原料 -------- */
    {
      id: 'dep.topology-topmanifold',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.topological-manifold',
      note: '拓扑流形是**拓扑空间**加条件（Hausdorff / 第二可数 / 局部欧氏），先要有拓扑空间。',
    },
    {
      id: 'dep.homeomorphism-topmanifold',
      kind: 'definition',
      definition: 'def.homeomorphism',
      usedBy: 'def.topological-manifold',
      note: '「局部像 $\\mathbb{R}^{n}$」里的「像」是**同胚** —— 这一步只有拓扑，没有微分。',
    },
    {
      id: 'dep.hausdorff-topmanifold',
      kind: 'definition',
      definition: 'def.hausdorff',
      usedBy: 'def.topological-manifold',
      note: 'Hausdorff 是定义的一部分（排除「带两个原点的直线」那类局部欧氏但不 Hausdorff 的空间）。',
    },
    {
      id: 'dep.secondcountable-topmanifold',
      kind: 'definition',
      definition: 'def.second-countable',
      usedBy: 'def.topological-manifold',
      note: '第二可数同样是定义的一部分（排除「不可数多条实直线」这种太肥的流形）。',
    },
    /* -------- 闭曲面 = 2 维 + 紧 + 连通 + 无边界 -------- */
    {
      id: 'dep.topmanifold-closedsurface',
      kind: 'definition',
      definition: 'def.topological-manifold',
      usedBy: 'def.closed-surface',
      note: '闭曲面是**2 维**拓扑流形再加三个条件。',
    },
    {
      id: 'dep.compact-closedsurface',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'def.closed-surface',
      note: '「闭」的第一个意思是**紧**（另一个是「无边界」）。',
    },
    /* -------- 分类定理用到的东西 -------- */
    {
      id: 'dep.closedsurface-classification',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'thm.classification-surfaces',
      note: '定理的主语就是闭曲面。',
    },
    {
      id: 'dep.connectedsum-classification',
      kind: 'definition',
      definition: 'def.connected-sum',
      usedBy: 'thm.classification-surfaces',
      note: '结论的两种标准形都是**连通和**（环面的、射影平面的）。',
    },
    {
      id: 'dep.genus-classification',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'thm.classification-surfaces',
      note: '可定向侧的分类量就是亏格 $g$；「不同胚」靠 $g$（等价地 $\\chi$）分辨。',
    },
    {
      id: 'dep.eulerchar-classification',
      kind: 'definition',
      definition: 'thm.euler-characteristic',
      usedBy: 'thm.classification-surfaces',
      note: '不同胚性用 $\\chi$ 作不变量（$\\chi$ 在同胚下不变）。⚠ 这条用的是**定理**当原理：' +
        '`thm.euler-characteristic` 说「数单纯形 = 数 Betti 数」，正好给出 $\\chi$ 的组合与同调两种算法。',
    },
    /* -------- 通名归位后的那条类比：外在 vs 内蕴 -------- */
    {
      kind: 'analogy',
      a: 'def.closed-surface',
      b: 'def.orientable-surface',
      title: '两种「可定向曲面」：内在的拓扑 vs 嵌在 $\\mathbb{R}^{3}$ 里的',
      note: [
        '`def.orientable-surface` 说的是：$\\mathbb{R}^{3}$ 里被参数化覆盖的点集，能不能**连续地选一侧法向**' +
          '（外加一个外法向，才有了面积元与 Gauss 映射）。那是**外在**的说法，用到了嵌入与度量。',
        '本节点说的是**内在**拓扑条件：紧、连通、无边界、局部欧氏 —— 完全没有「嵌在哪里」。',
        '⚠ 两者**不是同一件事**：一个闭曲面可以嵌进 $\\mathbb{R}^{3}$，也可以不嵌（抽象地存在）；' +
          '而「外在可定向」在嵌入下才谈得上。所以这里只连类比，⛔ 不连 implication/definition。',
        '📌 桥梁是嵌入定理（每个闭可定向曲面都能嵌入 $\\mathbb{R}^{3}$）与 Gauss–Bonnet（$\\int K = 2\\pi\\chi$），' +
          '本图都没有写成节点。',
      ].join('\n\n'),
    },
  ],
});
