/* ==========================================================================
   内容包 · 仿紧空间、单位分解与可度量化（18 个节点 / 28 条边）
   --------------------------------------------------------------------------
   拓扑这条线上原来只有「正规 + Urysohn 引理」这一个节点（40 号包），
   于是「正规」成了一个悬空的形容词：它到底换来了什么？
   答案是两件事 —— 单位分解（把局部粘成整体），以及一整套度量化定理。

   本包造出中间那一层：

     局部有限族 / 离散族 / 可数层   →  加细  →  仿紧
     仿紧 + Hausdorff ⇒ 正规（这一步补上，40 号包的正规才有来处）
     正规 + 局部有限 ⇒ 收缩引理 ⇒ 单位分解（接上 61 号包里已有的命题）
     度量 ⇒ 仿紧（Stone）· 正则 + 第二可数 ⇒ 可度量化（Urysohn）
     正则 + σ-局部有限基 ⇒ 可度量化（Nagata–Smirnov）· σ-离散基（Bing）

   星团：topology.paracompact（10 点，hub = def.paracompact）、
        topology.metrizable（6 点，hub = thm.urysohn-metrization）、
        topology.general（2 点：第二可数 / 第一可数）。

   ⚠️ 节点 def.paracompact / def.locally-finite-family 的 id 已被星团登记
      （clusters.js 里 topology.paracompact 的 hub 就是 def.paracompact），改动会断线。
   ⚠️ 61 号包里已有 prop.paracompact-partition-unity（仿紧 Hausdorff ⟺ 单位分解），
      本包**不**再造同义的定理节点，而是用两条边把它接到新的定义与收缩引理上。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '仿紧空间、单位分解与可度量化',
  nodes: [

    /* ------------------------------------------------ 局部有限与离散 */
    {
      id: 'def.locally-finite-family',
      cluster: 'topology.paracompact',
      type: 'definition',
      label: '局部有限族',
      title: '局部有限的集合族',
      regions: ['topology'],
      tags: ['定义', '拓扑', '局部有限', '仿紧'],
      statement: [
        '设 $X$ 是拓扑空间，$\\mathcal{A} = \\{ A_{s} \\}_{s \\in S}$ 是 $X$ 的一族子集。$\\mathcal{A}$ 叫**局部有限的**，如果每个点都有开邻域只与**有限多个**成员相交：',
        '',
        '$$\\forall x \\in X,\\ \\exists U \\ni x \\text{ 开}:\\quad \\{\\, s \\in S : U \\cap A_{s} \\ne \\emptyset \\,\\} \\text{ 有限}.$$',
        '',
        '把「开邻域」换成「点本身」，得到弱一些的**点有限族**：每个点只属于有限多个 $A_{s}$。'
      ].join('\n'),
      notes: [
        '**为什么要「局部」**：一个族整体上可以无穷（$\\mathbb{R}$ 上的 $\\{\\, (n, n+2) \\,\\}_{n \\in \\mathbb{Z}}$ 有无穷多个成员），但只要每点附近只碰到有限多个，任何逐点求和就自动是**局部有限和**、任何逐点判断都只需看有限多项。仿紧、单位分解、层论里的细部论证全靠这一条。',
        '**三条常用性质**（后两条才是它真正被用到的形式）：',
        [
          '- 局部有限 $\\implies$ 点有限：取只碰有限多个成员的邻域 $U \\ni x$，含 $x$ 的成员只能更少；',
          '- **并的闭包等于闭包之并**：$\\operatorname{cl}\\bigcup_{s} A_{s} = \\bigcup_{s} \\operatorname{cl} A_{s}$（$\\supseteq$ 恒成立，$\\subseteq$ 那一半用局部有限性）；',
          '- 若每个 $A_{s}$ 都**闭**，则 $\\bigcup_{s} A_{s}$ 也闭（上一条的直接推论）。'
        ].join('\n'),
        '⚠️ 局部有限**不等于**「成员可以很多」，**也不等于**点有限：$\\mathbb{R}$ 上的族 $\\{\\, \\{ 1/n \\} : n \\ge 1 \\,\\}$ 点有限（每点至多属于一个成员）却不局部有限（$0$ 的任何邻域都碰到无穷多个成员）。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 39', 'Engelking, General Topology, Ch. 5']
    },

    {
      id: 'def.discrete-family',
      cluster: 'topology.paracompact',
      type: 'definition',
      label: '离散族',
      title: '离散的集合族',
      regions: ['topology'],
      tags: ['定义', '拓扑', '离散', '局部有限'],
      statement: [
        '$X$ 的一族子集 $\\mathcal{A} = \\{ A_{s} \\}_{s \\in S}$ 叫**离散的**，如果每个点都有开邻域至多与**一个**成员相交：',
        '',
        '$$\\forall x \\in X,\\ \\exists U \\ni x \\text{ 开}:\\quad \\#\\{\\, s \\in S : U \\cap A_{s} \\ne \\emptyset \\,\\} \\le 1.$$',
        '',
        '离散 $\\implies$ 局部有限 $\\implies$ 点有限；两个反向都不成立。'
      ].join('\n'),
      notes: [
        '**成员必两两不交**：若 $x \\in A_{s} \\cap A_{t}$ 而 $s \\ne t$，则 $x$ 的任何邻域都碰到两个成员，与离散矛盾。所以离散族比局部有限族「更散」：连相交都不许。',
        '**「离散」这个词有两层意思**（容易混）：本节点说的是「**族**离散」；另一种说法「$A \\subseteq X$ 是离散子集」指的是单点族 $\\{\\, \\{ a \\} : a \\in A \\,\\}$ 离散（等价于 $a$ 们在子空间拓扑下是离散的、且 $A$ 在 $X$ 里没有聚点）。仿紧与度量化里用到的一律是「族」的那一层。',
        '⭐ Bing 的度量化定理就是拿「$\\sigma$-离散基」当假设的 —— 它比「$\\sigma$-局部有限基」更紧，但证明里更容易控制（离散族的闭包族仍然离散）。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 39', 'Engelking, General Topology, Ch. 5']
    },

    {
      id: 'def.sigma-locally-finite',
      cluster: 'topology.paracompact',
      type: 'definition',
      label: '可数并的局部有限族',
      title: '可数多个局部有限（或离散）族之并',
      regions: ['topology'],
      tags: ['定义', '拓扑', '局部有限', '可数'],
      statement: [
        '$X$ 的一族子集 $\\mathcal{A}$ 叫 **$\\sigma$-局部有限的**，如果它是**可数多个**局部有限族之并：存在局部有限的族 $\\mathcal{A}_{n}$（$n \\ge 1$）使',
        '',
        '$$\\mathcal{A} = \\bigcup_{n \\ge 1} \\mathcal{A}_{n}.$$',
        '',
        '把「局部有限」换成「离散」，得到 **$\\sigma$-离散族**。等价的说法：$\\mathcal{A}$ 可以**分层编号**成 $\\{\\, A_{n,s} \\,\\}$，使每一层 $\\{\\, A_{n,s} \\,\\}_{s}$ 局部有限（相应地离散）。'
      ].join('\n'),
      notes: [
        '**分层为什么管用**：局部有限性只在层内保证 —— 一层的成员可以在另层的成员旁边随便纠缠。于是每一层都能单独做「局部有限和」「闭包之并」这类操作，而层数只有可数，最后得到的还是可数对象，正是度量化定理要的那种「可数多条信息」。',
        '**两个层级**：$\\sigma$-离散 $\\implies$ $\\sigma$-局部有限（离散 $\\implies$ 局部有限，逐层套用）。本图两条度量化定理正好各用一个：Nagata–Smirnov 用 $\\sigma$-局部有限基，Bing 用 $\\sigma$-离散基。',
        '⚠️ **一层不等于整体**：$\\sigma$-局部有限的族**不必**局部有限。仿紧要求的是单层的局部有限，而 Stone 定理的构造先只给到 $\\sigma$-局部有限 —— 中间差的正是「把层合回一层」这一步，那是 Stone 证明里最技术的地方。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Sections 39 and 40', 'Engelking, General Topology, Ch. 5']
    },

    /* ------------------------------------------------ 加细与仿紧 */
    {
      id: 'def.refinement',
      cluster: 'topology.paracompact',
      type: 'definition',
      label: '覆盖的加细',
      title: '覆盖的加细、开加细与闭加细',
      regions: ['topology'],
      tags: ['定义', '拓扑', '覆盖', '加细'],
      statement: [
        '设 $\\mathcal{U} = \\{ U_{i} \\}_{i \\in I}$ 与 $\\mathcal{V} = \\{ V_{s} \\}_{s \\in S}$ 都是 $X$ 的覆盖。$\\mathcal{V}$ 是 $\\mathcal{U}$ 的**加细**，如果每个 $V_{s}$ 都落在某个 $U_{i}$ 里：',
        '',
        '$$\\forall s \\in S,\\ \\exists i \\in I :\\quad V_{s} \\subseteq U_{i}.$$',
        '',
        '不要求指标集相同，也不要求单射：多个 $V_{s}$ 可以落在同一个 $U_{i}$ 里。若 $\\mathcal{V}$ 的成员全是开集（闭集），叫**开加细**（**闭加细**）；若 $\\mathcal{V}$ 作为族局部有限（$\\sigma$-局部有限、离散），就叫**局部有限加细**（相应地 $\\sigma$-局部有限加细、离散加细）。'
      ].join('\n'),
      notes: [
        '**「加细」和「局部有限」是两条独立的要求**，这才是仿紧不平凡的原因：',
        [
          '- 想细就能细：$\\{\\, \\{ x \\} : x \\in X \\,\\}$ 永远是最细的加细；',
          '- 想局部有限也不难：$\\{\\, X \\,\\}$ 只有一个成员，当然局部有限；',
          '- 但要**同时又细、又开、又局部有限**，就等价于仿紧 —— 仿紧因此是一条真正的结构条件，而不是可以随手满足的技术语。'
        ].join('\n'),
        '⚠️ 加细是**覆盖之间**的关系，不是集合之间的包含：$\\mathcal{V}$ 加细 $\\mathcal{U}$ 时，$\\mathcal{V}$ 完全可以有更多、更小的成员。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 39']
    },

    {
      id: 'def.paracompact',
      cluster: 'topology.paracompact',
      type: 'definition',
      label: '仿紧空间',
      title: '每个开覆盖都有局部有限开加细',
      regions: ['topology'],
      tags: ['定义', '拓扑', '仿紧', '局部有限'],
      statement: [
        '拓扑空间 $X$ 叫**仿紧的**，如果它的**每个开覆盖都有局部有限的开加细**：',
        '',
        '$$\\forall\\ \\text{开覆盖}\\ \\mathcal{U},\\quad \\exists\\ \\text{开覆盖}\\ \\mathcal{V}:\\quad \\mathcal{V}\\ \\text{加细}\\ \\mathcal{U}\\ \\text{且}\\ \\mathcal{V}\\ \\text{局部有限}.$$',
        '',
        '⚠️ **约定**：本图**不**把 Hausdorff 并进「仿紧」的定义（有些书并进去）。需要分离性时一律显式写「仿紧 Hausdorff」。'
      ].join('\n'),
      notes: [
        '**在层级里的位置**：紧 $\\implies$ 仿紧（有限子覆盖当然是局部有限的）；仿紧 Hausdorff $\\implies$ 正规 $\\implies$ 正则 $\\implies$ Hausdorff（本包的定理）；度量空间 $\\implies$ 仿紧（Stone 定理）。',
        '⭐ **它换来了什么**：单位分解（于是光滑化、流形上的积分与 Stokes、延拓定理都有工具），以及层论里「Čech 上同调等于层上同调」在细部上要的那点局部有限性。流形按定义第二可数，于是自动仿紧 —— 这就是分析里从不担心这件事的原因。',
        '**遗传性**：**开**子空间与**闭**子空间都继承仿紧性（开子空间：把 $X \\setminus Y$ 补进覆盖再求交；闭子空间：把开覆盖的成员与闭子空间求交）。一般的子空间不必仿紧。',
        '⚠️ 反方向全断：正规空间不必仿紧 —— $[0, \\omega_{1})$（第一不可数序数以下的全体序数）是正规的、可数紧的却不紧，而「可数紧 $+$ 仿紧 $\\implies$ 紧」，所以它不仿紧。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 41', 'Engelking, General Topology, Ch. 5']
    },

    /* ------------------------------------------------ 收缩引理 */
    {
      id: 'lem.shrink',
      cluster: 'topology.paracompact',
      type: 'lemma',
      label: '收缩引理',
      title: '正规空间里局部有限开覆盖可以收缩',
      regions: ['topology'],
      tags: ['引理', '拓扑', '正规', '局部有限', '收缩'],
      statement: [
        '设 $X$ 是**正规**空间，$\\mathcal{U} = \\{ U_{i} \\}_{i \\in I}$ 是 $X$ 的**局部有限开覆盖**。则存在 $X$ 的开覆盖 $\\mathcal{V} = \\{ V_{i} \\}_{i \\in I}$（**指标集相同**）使',
        '',
        '$$V_{i} \\subseteq \\operatorname{cl} V_{i} \\subseteq U_{i}\\qquad (i \\in I),$$',
        '',
        '并且 $\\mathcal{V}$ 仍然局部有限。这样的 $\\mathcal{V}$ 叫 $\\mathcal{U}$ 的一个**收缩**（shrinking）。'
      ].join('\n'),
      notes: [
        [
          '**证明（对指标集良序化，逐个收缩）** 在 $I$ 上取一个良序（这里用到选择公理）。要造开集 $V_{i}$ 使 $\\operatorname{cl} V_{i} \\subseteq U_{i}$，同时保持覆盖。维护不变量：对每个 $i$，族',
          '$$\\mathcal{W}_{i} := \\{\\, V_{j} : j < i \\,\\} \\cup \\{\\, U_{k} : k \\ge i \\,\\}$$',
          '都是 $X$ 的覆盖。',
          '**后继步**（$i \\to i^{+}$）：令 $A_{i} := X \\setminus \\bigcup \\mathcal{W}_{i^{+}}$。$A_{i}$ 是**闭**集；而 $x \\notin \\mathcal{W}_{i^{+}}$ 意味着 $x \\notin V_{j}$（$j < i$）且 $x \\notin U_{k}$（$k > i$），不变量再把 $x$ 逼进 $U_{i}$ —— 所以 $A_{i} \\subseteq U_{i}$。对不交闭集 $A_{i}$ 与 $X \\setminus U_{i}$ 用正规性，得到开集 $V_{i}$ 使 $A_{i} \\subseteq V_{i}$ 且 $\\operatorname{cl} V_{i} \\subseteq U_{i}$（「闭集含于开集，就能夹一个开集使它的闭包仍含于那个开集」是正规性的标准变形）。于是 $\\mathcal{W}_{i^{+}}$ 仍覆盖 $X$。',
          '**极限步**（$i$ 是极限序数）：设 $x \\in X$。若 $x \\in U_{k}$ 对某个 $k \\ge i$ 成立，已被覆盖。否则 $x \\notin U_{k}$ 对一切 $k \\ge i$，而 $\\mathcal{W}_{i}$ 覆盖给出某个 $j < i$ 使 $x \\in U_{j}$。由**点有限性**（局部有限 $\\implies$ 点有限），$J := \\{\\, j < i : x \\in U_{j} \\,\\}$ 有限且非空；取 $j := \\max J$，则对一切 $k > j$ 有 $x \\notin U_{k}$，故 $x \\in A_{j} \\subseteq V_{j}$。',
          '**收尾**：由 $V_{i} \\subseteq U_{i}$，只碰有限多个 $U_{i}$ 的开邻域也只碰有限多个 $V_{i}$，故 $\\mathcal{V}$ 局部有限；覆盖性：给定 $x$，点有限性给出下标 $i$ 大于一切含 $x$ 的 $U_{j}$，再对 $\\mathcal{W}_{i}$ 用覆盖性即得 $x \\in V_{j}$（某个 $j < i$）。∎'
        ].join('\n'),
        '**为什么必须局部有限**：极限序数那一步用了「含 $x$ 的成员只有有限多个」。一般的开覆盖没有这条，收缩就可能不存在 —— 这正好解释了「正规」为什么推不出「仿紧」。',
        '⭐ 用处有两处：把仿紧的局部有限开加细换成**局部有限闭加细**（取闭包）；把局部有限开加细换成**单位分解**（在 $A_{i}$ 与 $X \\setminus U_{i}$ 之间用 Urysohn 引理取函数，再归一化）。',
        '⚠️ 收缩之后**闭包也含于原来的成员**，这是它比「再加细一次」强的地方：又一次加细只能保住覆盖与局部有限，保不住「贴着原来那个成员」。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 41', 'Engelking, General Topology, Ch. 5']
    },

    /* ------------------------------------------------ 仿紧 ⇒ 正规 */
    {
      id: 'thm.paracompact-hausdorff-normal',
      cluster: 'topology.paracompact',
      type: 'theorem',
      label: '仿紧 Hausdorff 空间正规',
      title: '仿紧的 Hausdorff 空间是正规空间',
      regions: ['topology'],
      tags: ['定理', '拓扑', '仿紧', '正规', '分离公理'],
      statement: [
        '设 $X$ 是**仿紧**的 **Hausdorff** 空间。则 $X$ 是**正规**的；证明会先得到更强的中间结论：$X$ 已经是**正则**的。'
      ].join('\n'),
      notes: [
        [
          '**第 1 步：仿紧 Hausdorff $\\implies$ 正则。** 设 $x \\in X$、$F \\subseteq X$ 闭、$x \\notin F$。对每个 $y \\in F$，Hausdorff 性给出不交开集 $O_{1} \\ni y$、$O_{2} \\ni x$；取 $G_{y} := O_{1}$，由 $O_{1} \\subseteq X \\setminus O_{2}$ 得 $\\operatorname{cl} G_{y} \\subseteq X \\setminus O_{2}$，故 $x \\notin \\operatorname{cl} G_{y}$。于是',
          '$$\\mathcal{A} := \\{\\, X \\setminus F \\,\\} \\cup \\{\\, G_{y} : y \\in F \\,\\}$$',
          '是开覆盖。取它的局部有限开加细 $\\mathcal{C}$，令 $W := \\bigcup \\{\\, C \\in \\mathcal{C} : C \\cap F \\ne \\emptyset \\,\\}$。则 $F \\subseteq W$：$F$ 的点 $y$ 落在某个 $C$ 里，而 $C \\subseteq X \\setminus F$ 不可能（它含 $y$），故 $C \\subseteq G_{y}$，于是 $C$ 被计入 $W$。另一方面，每个计入 $W$ 的 $C$ 都落在某个 $G_{y}$ 里，故 $x \\notin \\operatorname{cl} C$；由局部有限族的「并的闭包等于闭包之并」，$\\operatorname{cl} W = \\bigcup \\{\\, \\operatorname{cl} C : C \\cap F \\ne \\emptyset \\,\\}$ 不含 $x$。所以 $W \\ni F$ 与 $X \\setminus \\operatorname{cl} W \\ni x$ 是分开 $F$ 与 $x$ 的不交开集。',
          '**第 2 步：正则 $+$ 仿紧 $\\implies$ 正规。** 设 $A, B$ 是不交闭集。对每个 $x \\in A$，正则性（$x \\notin B$）给出开集 $O_{x} \\ni x$ 使 $\\operatorname{cl} O_{x} \\cap B = \\emptyset$。于是 $\\mathcal{A} := \\{\\, X \\setminus A \\,\\} \\cup \\{\\, O_{x} : x \\in A \\,\\}$ 是开覆盖，取局部有限开加细 $\\mathcal{D}$，令 $U := \\bigcup \\{\\, D \\in \\mathcal{D} : D \\cap A \\ne \\emptyset \\,\\}$。同上：$A \\subseteq U$，且每个这样的 $D$ 含于某个 $O_{x}$，给出 $\\operatorname{cl} D \\cap B = \\emptyset$，故 $\\operatorname{cl} U \\cap B = \\emptyset$。于是 $U \\supseteq A$ 与 $X \\setminus \\operatorname{cl} U \\supseteq B$ 是分开 $A, B$ 的不交开集。∎'
        ].join('\n'),
        '⭐ 这条把「仿紧」接进了分离公理的层级：**紧 Hausdorff $\\implies$ 仿紧 Hausdorff $\\implies$ 正规 $\\implies$ 正则 $\\implies$ Hausdorff**。40 号包里的正规性与 Urysohn 引理从此有了来处：紧 Hausdorff 空间（$[0,1]$、$\\beta I$）都是仿紧的。',
        '⚠️ **Hausdorff 不能省**：只有两个点的 Sierpiński 空间是仿紧的（它的开覆盖都有限，局部有限性自动成立）却不是 $T_{1}$，因而非正规。',
        '⚠️ **反方向也不成立**：正规不必仿紧（$[0, \\omega_{1})$）。所以「仿紧」是真的一条新条件，而不是正规的改写。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 41', 'Engelking, General Topology, Ch. 5']
    },

    /* ------------------------------------------------ 闭加细 */
    {
      id: 'prop.paracompact-closed-refinement',
      cluster: 'topology.paracompact',
      type: 'proposition',
      label: '闭加细',
      title: '仿紧空间的开覆盖有局部有限闭加细',
      regions: ['topology'],
      tags: ['命题', '拓扑', '仿紧', '闭加细', '局部有限'],
      statement: [
        '设 $X$ 是**仿紧 Hausdorff** 空间，$\\mathcal{U}$ 是 $X$ 的开覆盖。则 $\\mathcal{U}$ 有**局部有限的闭加细** $\\mathcal{F} = \\{ F_{i} \\}_{i \\in I}$：每个 $F_{i}$ 是闭集、含于 $\\mathcal{U}$ 的某个成员、族 $\\mathcal{F}$ 局部有限，且 $\\bigcup_{i} F_{i} = X$。'
      ].join('\n'),
      notes: [
        [
          '**证明。** 由仿紧性取局部有限开加细 $\\mathcal{V} = \\{ V_{i} \\}_{i \\in I}$；由定理，$X$ 正规，于是对 $\\mathcal{V}$ 用收缩引理得开覆盖 $\\{ W_{i} \\}$ 使 $\\operatorname{cl} W_{i} \\subseteq V_{i}$。令 $F_{i} := \\operatorname{cl} W_{i}$，则：',
          '- $F_{i}$ 闭，且 $F_{i} \\subseteq V_{i} \\subseteq$ 某个 $\\mathcal{U}$ 的成员（加细的传递性）；',
          '- $\\{ F_{i} \\}$ 覆盖 $X$（$\\{ W_{i} \\}$ 已经覆盖）；',
          '- $\\{ F_{i} \\}$ 局部有限：只碰有限多个 $V_{i}$ 的开邻域也只碰有限多个 $\\operatorname{cl} W_{i}$ —— 这里用的是 $\\operatorname{cl} W_{i} \\subseteq V_{i}$。∎'
        ].join('\n'),
        '⭐ **为什么值得单独写一条**：闭加细让「局部有限」可以**逐个成员**去验证（闭族之并仍闭、闭包的运算和覆盖的运算可以交换）。单位分解的构造就是从闭加细开始的：先在闭族与开族的补之间用 Urysohn 引理取函数。',
        '**反向是一条判据**：在正则空间里，「每个开覆盖都有局部有限的**闭**加细」$\\implies$「每个开覆盖都有局部有限加细」$\\implies$ 仿紧（后者是 Michael 判别法）。所以在正则前提下，闭加细的存在性是仿紧的**等价刻画**，不是额外条件。',
        '⚠️ **把「局部有限」换成「$\\sigma$-局部有限」时，命题照样成立且更好证**；困难在反方向：$\\sigma$-局部有限的加细只在层内局部有限，合回一层要靠「正规 $+$ 逐层收缩」，那一步正是 Stone 定理与 Nagata–Smirnov 定理之间最技术的地方。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 41', 'Engelking, General Topology, Ch. 5']
    },

    /* ------------------------------------------------ Michael */
    {
      id: 'thm.michael-paracompact',
      cluster: 'topology.paracompact',
      type: 'theorem',
      label: '迈克尔仿紧判别法',
      title: '正则空间仿紧当且仅当每个开覆盖有局部有限加细',
      regions: ['topology'],
      tags: ['定理', '拓扑', '仿紧', '加细', '判别法'],
      statement: [
        '设 $X$ 是**正则**空间。则',
        '',
        '$$X\\ \\text{仿紧}\\quad \\iff \\quad X\\ \\text{的每个开覆盖都有局部有限的加细（加细的成员不必是开集）}.$$'
      ].join('\n'),
      notes: [
        [
          '**$(\\Longleftarrow)$ 才是内容，$(\\implies)$ 是废话**：仿紧的加细按定义就是局部有限的，而开加细当然是加细。所以这条定理的全部难点在一句话 —— **把「不必开」的局部有限加细撑成开加细，同时不毁掉局部有限性**。',
          '**思路（Michael）**：给定开覆盖 $\\mathcal{U}$ 与它的局部有限加细 $\\{ E_{s} \\}$。',
          [
            '- 先做归约：由局部有限可设加细是**点有限**的（局部有限 $\\implies$ 点有限）；',
            '- 逐点撑开：对 $x \\in E_{s}$，正则性给出开集 $O_{x}$ 使 $x \\in O_{x} \\subseteq \\operatorname{cl} O_{x} \\subseteq$ 覆盖中含 $E_{s}$ 的那个成员，再令 $V_{s} := \\bigcup \\{\\, O_{x} : x \\in E_{s} \\,\\}$；',
            '- 此时 $\\{ V_{s} \\}$ 已经是**开加细并覆盖 $X$**，但一般**不再局部有限**（$V_{s} \\supseteq E_{s}$，一个邻域可能碰到很多 $V_{s}$ 而只碰到很少 $E_{s}$）；',
            '- 收尾：用点有限性把每一族成员**重新排序**，把第 $s$ 个换成「$E_{s}$ 挖掉前面那些开膨胀的闭包，再取内部」，新族就既开、又覆盖、又局部有限。'
          ].join('\n'),
          '**收尾引理（Michael）**：正则空间中，若开覆盖有局部有限加细，则它有局部有限的**开**加细。证明用「良序化 + 逐个膨胀」：把加细的成员良序化，依次膨胀进覆盖中对应的成员，每次只膨胀到尚未被前面成员盖住的点；局部有限性由原族的局部有限性接管（每点有邻域只碰到有限多个原成员，膨胀也只发生在这些成员里）。取这条引理即得仿紧。∎'
        ].join('\n'),
        '⭐ **当判据用的姿势**：实际验证仿紧时，往往只先拿到「闭的 / 不必开的 / 加细但很粗」的东西 —— 这时配上正则性就够，不必再构造开加细。本图的闭加细命题就是往这个方向走的。',
        '⚠️ **前提「正则」只在 $(\\Longleftarrow)$ 用到**；$(\\implies)$ 不需要任何分离性。',
        '⚠️ 定理里的「加细」如果是**闭**加细，结论同样成立（闭加细是加细的特例）—— 所以「正则 $+$ 每个开覆盖有局部有限闭加细」$\\implies$ 仿紧，这条常被当成仿紧的实用判据。'
      ].join('\n\n'),
      refs: ['Michael, A note on paracompact spaces, Proc. Amer. Math. Soc. 4 (1953)', 'Engelking, General Topology, Ch. 5']
    },

    /* ------------------------------------------------ 单位分解 */
    {
      id: 'def.partition-of-unity',
      cluster: 'topology.paracompact',
      type: 'definition',
      label: '单位分解',
      title: '从属于开覆盖的连续单位分解',
      regions: ['topology'],
      tags: ['定义', '拓扑', '单位分解', '局部有限', '连续函数'],
      statement: [
        '设 $\\mathcal{U} = \\{ U_{i} \\}_{i \\in I}$ 是 $X$ 的开覆盖。一族连续函数 $\\rho_{i} : X \\to [0, 1]$（$i \\in I$）叫**从属于 $\\mathcal{U}$ 的单位分解**，如果',
        [
          '1. **支撑在成员里**：$\\operatorname{supp} \\rho_{i} := \\operatorname{cl}\\{\\, x : \\rho_{i}(x) \\ne 0 \\,\\} \\subseteq U_{i}$；',
          '2. **支撑族局部有限**：$\\{\\, \\operatorname{supp} \\rho_{i} \\,\\}_{i \\in I}$ 是局部有限的族；',
          '3. **和恒为 1**：$\\sum_{i \\in I} \\rho_{i}(x) = 1$ 对每个 $x \\in X$ 成立。'
        ].join('\n'),
        '',
        '由 2，每点附近只有有限多个 $\\rho_{i}$ 不恒为零，所以 3 里的和是**局部有限和**：它逐点有意义，并且作为函数连续（有限个连续函数之和）。'
      ].join('\n'),
      notes: [
        '**它是「把局部的信息粘成整体」的机器**：若每个 $f_{i}$ 只在 $U_{i}$ 附近有定义，就把它们乘上 $\\rho_{i}$ 再相加，得到整体定义的对象；光滑情形取 $\\rho_{i}$ 光滑，就是流形上光滑化的那一招。',
        '**支撑为什么要取闭包**：若改成「$\\rho_{i}$ 在 $U_{i}$ **之外**恒为零」，这套语言在取极限时不稳定（零点集可能跑到 $U_{i}$ 外面去）；取闭包之后「在哪里为零」对极限稳定，局部有限性才有地方落脚。',
        '**它与仿紧的关系（两边都能走）**：$\\{\\, \\rho_{i}^{-1}((0, 1]) \\,\\}$ 是 $\\mathcal{U}$ 的局部有限**开**加细，所以「任意开覆盖都有从属单位分解」蕴含「有局部有限开加细」；反方向由本包的收缩引理 $+$ Urysohn 引理给出。61 号包里已有的 prop.paracompact-partition-unity 说的正是这两条合起来。',
        '⚠️ 单说「单位分解」没有意义：它必须**从属于某个覆盖**。同一个空间上换一个覆盖，能拿到的单位分解完全不同（最粗的情形：$\\mathcal{U} = \\{\\, X \\,\\}$，取 $\\rho \\equiv 1$ 就够了）。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 41', 'Engelking, General Topology, Ch. 5']
    },

    /* ------------------------------------------------ 可度量化 */
    {
      id: 'def.second-countable',
      cluster: 'topology.general',
      type: 'definition',
      label: '第二可数空间',
      title: '具有可数基的拓扑空间',
      regions: ['topology'],
      tags: ['定义', '拓扑', '可数', '基'],
      statement: [
        '拓扑空间 $X$ 叫**第二可数的**，如果它的拓扑有**可数基**：存在可数族 $\\mathcal{B} = \\{\\, B_{n} \\,\\}_{n \\ge 1}$，使每个开集都是 $\\mathcal{B}$ 中若干成员之并。'
      ].join('\n'),
      notes: [
        '**它一次给出三条好性质**：第二可数 $\\implies$ 可分（每个非空基元取一点，得到的可数稠密集）；第二可数 $\\implies$ Lindelöf（每个开覆盖有可数子覆盖：对基元做筛子即可）；第二可数 $\\implies$ 第一可数（每点处筛出含该点的可数多个基元）。配上正则性还能再推出正规 —— 这正是 Urysohn 度量化定理的第一步。',
        '**对可度量化空间，三条可数性其实是同一件事**：可分 $\\iff$ Lindelöf $\\iff$ 第二可数。所以 Urysohn 定理也可以念成「正则 $+$ 可分」。',
        '**遗传性**：子空间继承第二可数（基元与子空间求交，仍可数）；商空间不继承（商映射会把可数基压成很粗的拓扑）。',
        '⚠️ 反过来不成立：不可数离散空间是第一可数的、可度量化的，却不第二可数（它的可数稠密集不存在）。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 30']
    },

    {
      id: 'def.first-countable',
      cluster: 'topology.general',
      type: 'definition',
      label: '第一可数空间',
      title: '每点有可数局部基',
      regions: ['topology'],
      tags: ['定义', '拓扑', '可数', '邻域基'],
      statement: [
        '$X$ 叫**第一可数的**，如果每个点都有**可数局部基**：存在含 $x$ 的开集族 $\\{\\, B_{n} \\,\\}_{n \\ge 1}$，使每个含 $x$ 的开集 $U$ 都包含某个 $B_{n}$。'
      ].join('\n'),
      notes: [
        '⭐ **它的意义是：极限可以用序列说完**。第一可数空间里，$x \\in \\operatorname{cl} A$ 当且仅当 $A$ 中有序列收敛到 $x$；连续当且仅当序列连续。所以「先取可数局部基、再取一列」这种论证在距离空间里永远合法。',
        '**两个箭头**：第二可数 $\\implies$ 第一可数（每点处筛出含该点的基元）；可度量化 $\\implies$ 第一可数（$B(x, 1/n)$）。两个反向都不成立：不可数离散空间第一可数但不第二可数；Sorgenfrey 直线第一可数、可分，却不可度量化。',
        '⚠️ 第一可数是序列语言的**充分**条件，不是必要：还有 Fréchet–Urysohn 空间与序列空间这两个更宽的类，那些地方序列仍够用。本图不展开这条支线。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 30']
    },

    {
      id: 'def.metrizable',
      cluster: 'topology.metrizable',
      type: 'definition',
      label: '可度量化空间',
      title: '拓扑可由一个度量给出',
      regions: ['topology'],
      tags: ['定义', '拓扑', '可度量化', '距离'],
      statement: [
        '拓扑空间 $(X, \\mathcal{T})$ 叫**可度量化的**，如果存在 $X$ 上的距离 $d$，使 $d$ 诱导的拓扑恰是 $\\mathcal{T}$：',
        '',
        '$$\\mathcal{T}_{d} = \\mathcal{T},\\qquad \\mathcal{T}_{d} := \\{\\, U \\subseteq X : \\forall x \\in U\\ \\exists r > 0,\\ B_{d}(x, r) \\subseteq U \\,\\}.$$',
        '',
        '等价地说：$X$ 与某个距离空间**同胚**，即存在一个与 $\\mathcal{T}$ 相容的度量（compatible metric）。'
      ].join('\n'),
      notes: [
        '**「存在一个度量」而不是「指定一个度量」**：同一个拓扑可以配很多度量（$d$ 与 $\\min(d, 1)$ 诱导同一个拓扑），所以「可度量化」是纯粹的拓扑性质，而同胚不变。「完备」「有界」「一致连续」不是拓扑性质 —— 它们会随度量的更换而变。',
        '⭐ **这是一条判定的分界线**：可度量化空间自动拿到 Hausdorff、第一可数、正规、仿紧（本包的命题），于是度量空间上该有的工具全部可用。反过来，第二可数 $+$ 正则就够（Urysohn 定理），更弱的是 $\\sigma$-局部有限基（Nagata–Smirnov）。',
        '⚠️ 不是每个拓扑空间都可度量化：不可数离散空间虽然可度量化（离散度量）却不第二可数，而 Sorgenfrey 直线（下半开区间拓扑）是正规的、可分的、第一可数的，却不第二可数，因而**不**可度量化。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Sections 20 and 40']
    },

    {
      id: 'thm.metric-paracompact',
      cluster: 'topology.metrizable',
      type: 'theorem',
      label: 'Stone 定理',
      title: '度量空间必为仿紧空间',
      regions: ['topology'],
      tags: ['定理', '拓扑', '仿紧', '度量', 'Stone'],
      statement: [
        '设 $(X, d)$ 是距离空间。则 $X$（带 $d$ 诱导的拓扑）是**仿紧**的：它的每个开覆盖都有局部有限的开加细。'
      ].join('\n'),
      notes: [
        [
          '**证明的两条标准路线**（都不在本节点展开到最后一步）：',
          [
            '- **Stone 的良序化构造**：把开覆盖良序化，对每个 $n \\ge 1$ 用两条筛子造一族开集 $\\{\\, V_{n,i} \\,\\}$：$V_{n,i}$ 由「$U_{i}$ 里、离 $X \\setminus U_{i}$ 至少 $2^{-n}$、且不属于任何 $j < i$ 的 $U_{j}$」的那些点处的小球 $B(x, 2^{-n-2})$ 堆成。三层验证 —— **加细**（小球落在 $U_{i}$ 里：$d(x, X \\setminus U_{i}) > 2^{-n} > 2^{-n-2}$）、**覆盖**（给定 $x$，取含它的最小下标 $i$，再取 $n$ 使 $2^{-n} < d(x, X \\setminus U_{i})$，则 $x \\in V_{n,i}$）、**每层局部有限**（固定 $n$，$2^{-n}$ 的余量与 $2^{-n-2}$ 的球半径配起来，只有下标不超过 $x$ 的最小下标的成员能靠近 $x$）。',
            '- **Stone 的全正规性**：距离空间里每个开覆盖都有**开星形加细** —— 对每点取 $r_{x} > 0$ 使 $B(x, r_{x})$ 落在覆盖的某个成员里，再看 $\\{\\, B(x, r_{x}/4) \\,\\}$：若 $B(x, r_{x}/4)$ 与 $B(y, r_{y}/4)$ 相交且 $r_{y} \\ge r_{x}$，则 $B(x, r_{x}/4) \\subseteq B(y, r_{y})$，所以每个成员与它相交的一切成员都落在同一个原成员里。'
          ].join('\n'),
          '把上面得到的 $\\sigma$-局部有限的开加细分层合回**一层**局部有限的加细，是 Stone 证明里最技术的一步（逐层收缩、再用局部有限性重排）。'
        ].join('\n'),
        '⚠️ **折衷**：本节点给的是构造与出处，最后那个「合回一层」的细节见 Munkres §41 / Engelking Ch. 5，不逐行重写。',
        '⭐ **它在整张图里的位置**：度量 $\\implies$ 仿紧是所有「可度量化 $\\implies$ 正规 / 有单位分解」论证的起点；而仿紧 $+$ 正规正是单位分解存在的那组条件。',
        '⚠️ 反方向（仿紧 $+$ 局部可度量化 $\\implies$ 可度量化）叫 Smirnov 度量化定理，本图暂未收入。'
      ].join('\n\n'),
      refs: ['Stone, Paracompactness and product spaces, Bull. Amer. Math. Soc. 54 (1948)', 'Munkres, Topology (2nd ed.), Section 41']
    },

    {
      id: 'thm.urysohn-metrization',
      cluster: 'topology.metrizable',
      type: 'theorem',
      label: 'Urysohn 度量化定理',
      title: '正则且第二可数的空间可度量化',
      regions: ['topology'],
      tags: ['定理', '拓扑', '可度量化', '第二可数', '正则'],
      statement: [
        '设 $X$ 是**正则**（含 $T_{1}$）的**第二可数**空间。则 $X$ 是**可度量化的**：存在与 $X$ 的拓扑相容的距离。'
      ].join('\n'),
      notes: [
        [
          '**证明（嵌入可分度量空间）**',
          [
            '1. **第二可数 $\\implies$ Lindelöf**：每个开覆盖有可数子覆盖（对基元做筛子）。',
            '2. **正则 $+$ Lindelöf $\\implies$ 正规**：$T_{1}$ 与「点与闭集可分开」配上 Lindelöf 的逐点归纳，给出两个不交闭集可分开。于是 **Urysohn 引理可用**。',
            '3. **挑可数多个分离函数**：取可数基 $\\{\\, B_{n} \\,\\}$。对每一对 $(m, n)$ 满足 $\\operatorname{cl} B_{m} \\subseteq B_{n}$，由 Urysohn 引理取连续函数',
            '$$f_{m,n} : X \\to [0, 1],\\qquad f_{m,n}|_{\\operatorname{cl} B_{m}} \\equiv 0,\\qquad f_{m,n}|_{X \\setminus B_{n}} \\equiv 1.$$',
            '这样的函数只有可数多个，把它们按可数集编号成 $f_{k}$（$k \\ge 1$）。',
            '4. **嵌入**：令 $F : X \\to [0, 1]^{\\mathbb{N}}$，$F(x) := (\\, f_{k}(x)/k \\,)_{k \\ge 1}$。$F$ 连续（每个分量连续，且级数一致收敛）；**单射**：$x \\ne y$ 时正则性给出基元 $B_{n}$ 使 $x \\in B_{n} \\subseteq \\operatorname{cl} B_{n} \\subseteq X \\setminus \\{\\, y \\,\\}$，于是某一对 $(m, n)$ 的 $f_{m,n}$ 把两者分开；**逆连续**：同样用基对，把「$f_{k}$ 很接近」翻译回「落在同一个基元里」。所以 $F$ 是到像上的同胚。',
            '5. **像空间可度量化**：$\\rho(a, b) := \\sum_{k \\ge 1} 2^{-k} |a_{k} - b_{k}|$ 是 $[0, 1]^{\\mathbb{N}}$ 上与积拓扑一致的度量；在像上取诱导度量即可。'
          ].join('\n'),
          '因此 $X$ 同胚于可分度量空间的子空间，即可度量化。∎'
        ].join('\n'),
        '⚠️ **反向不成立**：可度量化不必第二可数 —— 不可数离散空间是可度量化的（离散度量），却不第二可数。所以这条定理是**充分条件**，不是刻画。',
        '⭐ 要把「充分」变「充要」，就得把「第二可数」换成更合适的基条件：Nagata–Smirnov（$\\sigma$-局部有限基）与 Bing（$\\sigma$-离散基）就是干这件事的。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 34', 'Engelking, General Topology, Ch. 4']
    },

    {
      id: 'thm.nagata-smirnov',
      cluster: 'topology.metrizable',
      type: 'theorem',
      label: '局部有限基度量化定理',
      title: '正则且基为可数层局部有限族的空间可度量化',
      regions: ['topology'],
      tags: ['定理', '拓扑', '可度量化', '局部有限基', 'Nagata', 'Smirnov'],
      statement: [
        '设 $X$ 是**正则**（含 $T_{1}$）空间，且它的拓扑有一个 **$\\sigma$-局部有限的基**（基可以写成可数多个局部有限的子族之并）。则 $X$ 是**可度量化的**。',
        '',
        '反过来，每个可度量化的空间都有 $\\sigma$-局部有限的基，所以这是**充要条件**。'
      ].join('\n'),
      notes: [
        '**为什么它比 Urysohn 定理强**：第二可数的基可以按「每个基元单独当一个只有一项的族」拆成可数多个离散族，所以「第二可数」是「$\\sigma$-局部有限基」的特例；这里把假设放宽到 $\\sigma$-局部有限，结论不变。',
        [
          '**证明的想法（不展开）**',
          [
            '- 把 $\\sigma$-局部有限的基按层整理；每一层是局部有限族，配合正则性可以改造成**局部有限的开覆盖**；',
            '- 关键一步（Nagata 的「系统的邻域」）：造出可数多列局部有限的覆盖 $\\mathcal{G}_{n}$（$n \\ge 1$），使对任意开集 $U$ 与 $x \\in U$，总有一层里的某个成员同时做到「$x$ 在它的内部」与「它含于 $U$」；',
            '- 然后用这些覆盖定义一个「逐层把分离程度加起来」的非负对称函数，验证三条距离公理，并验证它诱导的拓扑恰是原拓扑。'
          ].join('\n')
        ].join('\n'),
        '⚠️ **折衷**：本节点给的是结构与出处（Munkres 整个 Section 40 就是这条定理），不是逐行证明。',
        '⚠️ 正则性不能省：少了它，「基好」不足以保证拓扑与度量一致（那一步用的是「点与闭集能被基元分开」）。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Section 40', 'Nagata (1950) 与 Smirnov (1951) 的原始论文；Engelking, General Topology, Ch. 4']
    },

    {
      id: 'thm.bing-metrization',
      cluster: 'topology.metrizable',
      type: 'theorem',
      label: '离散基度量化定理',
      title: '正则且基为可数层离散族的空间可度量化',
      regions: ['topology'],
      tags: ['定理', '拓扑', '可度量化', '离散基', 'Bing'],
      statement: [
        '设 $X$ 是**正则**（含 $T_{1}$）空间，且它的拓扑有 **$\\sigma$-离散的基**。则 $X$ 是**可度量化的**。',
        '',
        '反过来，每个可度量化的空间都有 $\\sigma$-离散的基，所以这也是**充要条件**。'
      ].join('\n'),
      notes: [
        '**它与 Nagata–Smirnov 的关系**：离散 $\\implies$ 局部有限，所以 $\\sigma$-离散基是 $\\sigma$-局部有限基的特例 —— 本图的推理边写的就是这一条：Bing 定理由 Nagata–Smirnov 定理得到。',
        '⚠️ **在正则前提下两条假设其实等价**：$\\sigma$-局部有限基 $\\implies$ 可度量化 $\\implies$ $\\sigma$-离散基 $\\implies$ $\\sigma$-局部有限基。所以 Bing 定理不是「更强的定理」，而是**同一件事的另一条证明路径**：它的价值在于 $\\sigma$-离散性在证明里更好用（离散族的闭包族仍离散，闭包运算因此可以和覆盖运算交换着算）。',
        '⭐ 两族之间的差别只在**非正则**的空间上才看得出来；本图只把它们当两种充分条件并列，不深入这条路。'
      ].join('\n\n'),
      refs: ['Bing, Metrization of topological spaces, Canad. J. Math. 3 (1951)', 'Engelking, General Topology, Ch. 4']
    },

    {
      id: 'prop.metrizable-normal',
      cluster: 'topology.metrizable',
      type: 'proposition',
      label: '可度量化空间的性质',
      title: '可度量化空间正规、仿紧且第一可数',
      regions: ['topology'],
      tags: ['命题', '拓扑', '可度量化', '正规', '仿紧', '第一可数'],
      statement: [
        '设 $X$ 是**可度量化的**拓扑空间。则 $X$',
        [
          '1. 是 **Hausdorff** 的，且是**第一可数**的；',
          '2. 是**正规**的（因此正则，Urysohn 引理与 Tietze 扩张定理都可用）；',
          '3. 是**仿紧**的（Stone 定理）。'
        ].join('\n')
      ].join('\n'),
      notes: [
        [
          '**证明** 取与拓扑相容的度量 $d$。',
          [
            '1. $\\{\\, B_{d}(x, 1/n) \\,\\}_{n \\ge 1}$ 是可数局部基，故第一可数；$x \\ne y$ 时取 $r := d(x, y)/2$，两个开球不交，故 Hausdorff。',
            '2. 设 $A, B$ 是不交闭集，令 $f(x) := \\dfrac{d(x, A)}{d(x, A) + d(x, B)}$（函数 $d(\\cdot, A)$ 是 $1$-Lipschitz 的，故连续；分母恒正：距 $A$、$B$ 同时为零的点不存在，因为 $A, B$ 不交且都闭）。于是 $f|_{A} \\equiv 0$、$f|_{B} \\equiv 1$，$f^{-1}([0, 1/2))$ 与 $f^{-1}((1/2, 1])$ 就是分开 $A, B$ 的不交开集。',
            '3. Stone 定理：度量空间仿紧。',
            '最后一步：以上三条都是拓扑性质（同胚不变），而可度量化正是「与某个距离空间同胚」，于是它们对 $X$ 也成立。∎'
          ].join('\n')
        ].join('\n'),
        '⭐ 于是整条层级可以写全：**可度量化 $\\implies$ 仿紧 Hausdorff $\\implies$ 正规 $\\implies$ 正则 $\\implies$ Hausdorff**（第二个箭头是本包的定理，第一个是 Stone 加本命题）。',
        '⚠️ **反向全断**：仿紧 Hausdorff 不必可度量化。标准反例是 **Sorgenfrey 直线**（$\\mathbb{R}$ 上以半开区间 $[a, b)$ 为基的拓扑）：它是 Lindelöf 的正则空间，故仿紧；它也可分（有理数稠密），却不第二可数 —— 而「可分 $+$ 可度量化」会推出第二可数，所以它不可度量化。要把「仿紧 $\\implies$ 可度量化」变成定理，必须再补一个基条件（Urysohn / Nagata–Smirnov / Bing 那一类）。'
      ].join('\n\n'),
      refs: ['Munkres, Topology (2nd ed.), Sections 32 and 41']
    }

  ],

  edges: [

    /* ------------------------------------------------ 定义引用（蓝线） */
    {
      id: 'dep.pcp-lf-paracompact',
      kind: 'definition',
      definition: 'def.locally-finite-family',
      usedBy: 'def.paracompact',
      note: '仿紧要求加细是**局部有限**的 —— 这个「局部有限」就是本节点的定义。'
    },
    {
      id: 'dep.pcp-refine-paracompact',
      kind: 'definition',
      definition: 'def.refinement',
      usedBy: 'def.paracompact',
      note: '「加细」是仿紧定义里除局部有限之外的另一半：仿紧问的是能否取到既开、又局部有限、又是原覆盖之加细的覆盖。'
    },
    {
      id: 'dep.pcp-discrete-lf',
      kind: 'definition',
      definition: 'def.discrete-family',
      usedBy: 'def.locally-finite-family',
      note: '离散比局部有限更强（每点邻域至多碰一个成员），本包所有推理都顺着「离散 $\\implies$ 局部有限」这个方向走。'
    },
    {
      id: 'dep.pcp-sigma-lf',
      kind: 'definition',
      definition: 'def.locally-finite-family',
      usedBy: 'def.sigma-locally-finite',
      note: '$\\sigma$-局部有限就是拿「局部有限族」当积木，可数多个拼起来。'
    },
    {
      id: 'dep.pcp-sigma-discrete',
      kind: 'definition',
      definition: 'def.discrete-family',
      usedBy: 'def.sigma-locally-finite',
      note: '同一个节点里还定义了 $\\sigma$-离散：把积木换成离散族。'
    },
    {
      id: 'dep.pcp-lf-shrink',
      kind: 'definition',
      definition: 'def.locally-finite-family',
      usedBy: 'lem.shrink',
      note: '收缩引理的前提就是「局部有限的开覆盖」；极限序数那一步用的正是「局部有限 $\\implies$ 点有限」。'
    },
    {
      id: 'dep.pcp-normal-shrink',
      kind: 'definition',
      definition: 'def.normal-space',
      usedBy: 'lem.shrink',
      note: '收缩的每一步都是把「闭集含于开集」用正规性夹一次；这一步只用正规性，不用仿紧。'
    },
    {
      id: 'dep.pcp-hausdorff-pcn',
      kind: 'definition',
      definition: 'def.hausdorff',
      usedBy: 'thm.paracompact-hausdorff-normal',
      note: '定理要的是「仿紧 **且** Hausdorff」：没有 Hausdorff，仿紧推不出正规（Sierpiński 空间是反例）。'
    },
    {
      id: 'dep.pcp-paracompact-pcn',
      kind: 'definition',
      definition: 'def.paracompact',
      usedBy: 'thm.paracompact-hausdorff-normal',
      note: '另一个前提是仿紧；证明里「取局部有限开加细」是唯一用到它的地方。'
    },
    {
      id: 'dep.pcp-paracompact-closedref',
      kind: 'definition',
      definition: 'def.paracompact',
      usedBy: 'prop.paracompact-closed-refinement',
      note: '闭加细是从仿紧给的局部有限开加细收缩出来的，所以本命题坐在仿紧的定义上。'
    },
    {
      id: 'dep.pcp-closedref-michael',
      kind: 'definition',
      definition: 'def.refinement',
      usedBy: 'thm.michael-paracompact',
      note: 'Michael 判别法里「加细」故意**不**要求成员是开集 —— 这正是它与仿紧定义的区别所在。'
    },
    {
      id: 'dep.pcp-pou-lf',
      kind: 'definition',
      definition: 'def.locally-finite-family',
      usedBy: 'def.partition-of-unity',
      note: '单位分解的定义里「支撑族局部有限」是让它有意义的那一条：没有它，$\\sum_{i} \\rho_{i} = 1$ 只是一个逐点断言，和未必连续。'
    },
    {
      id: 'dep.pcp-pou-continuous',
      kind: 'definition',
      definition: 'def.continuous-map',
      usedBy: 'def.partition-of-unity',
      note: '组成单位分解的是**连续**函数（光滑情形另外要求光滑），所以「连续」这条定义是它的地基。'
    },
    {
      id: 'dep.pcp-pou-existing-prop',
      kind: 'definition',
      definition: 'def.partition-of-unity',
      usedBy: 'prop.paracompact-partition-unity',
      note: '61 号包那条命题里的「单位分解」就是本节点定义的东西；本包不重造同义节点，而是把它接到新的定义与收缩引理上。'
    },
    {
      id: 'dep.pcp-existing-prop-paracompact',
      kind: 'definition',
      definition: 'def.paracompact',
      usedBy: 'prop.paracompact-partition-unity',
      note: '那条命题的第一条说的正是「仿紧 Hausdorff」这个组合，所以它依赖本节点的定义。'
    },
    {
      id: 'dep.pcp-metric-metrizable',
      kind: 'definition',
      definition: 'def.metric-space',
      usedBy: 'def.metrizable',
      note: '可度量化就是「存在一个距离空间与它同胚」；本节点是把距离空间的定义按同胚搬过去。'
    },
    {
      id: 'dep.pcp-base-second',
      kind: 'definition',
      definition: 'def.topology-base',
      usedBy: 'def.second-countable',
      note: '第二可数 = 给「基」再加一个计数条件（基的成员可数）。'
    },
    {
      id: 'dep.pcp-second-urysohn',
      kind: 'definition',
      definition: 'def.second-countable',
      usedBy: 'thm.urysohn-metrization',
      note: '定理的假设之一：第二可数（另加正则）。'
    },
    {
      id: 'dep.pcp-metrizable-urysohn',
      kind: 'definition',
      definition: 'def.metrizable',
      usedBy: 'thm.urysohn-metrization',
      note: '定理的结论：可度量化。'
    },
    {
      id: 'dep.pcp-urysohn-lemma-metrization',
      kind: 'definition',
      definition: 'lem.urysohn',
      usedBy: 'thm.urysohn-metrization',
      note: '构造可数多个分离函数那一步用的就是 Urysohn 引理（前提「正规」由第二可数 $+$ 正则推出）。'
    },
    {
      id: 'dep.pcp-normal-urysohn-metrization',
      kind: 'definition',
      definition: 'def.normal-space',
      usedBy: 'thm.urysohn-metrization',
      note: '证明的中间站：正则 $+$ Lindelöf $\\implies$ 正规，Urysohn 引理才有前提。'
    },
    {
      id: 'dep.pcp-metrizable-ns',
      kind: 'definition',
      definition: 'def.metrizable',
      usedBy: 'thm.nagata-smirnov',
      note: '定理的结论；反过来「可度量化 $\\implies$ 有 $\\sigma$-局部有限基」也是它的一半，所以只说「充要」时两边都指这个节点。'
    },
    {
      id: 'dep.pcp-sigma-ns',
      kind: 'definition',
      definition: 'def.sigma-locally-finite',
      usedBy: 'thm.nagata-smirnov',
      note: '定理的假设：基是 $\\sigma$-局部有限的族。'
    },
    {
      id: 'dep.pcp-sigma-bing',
      kind: 'definition',
      definition: 'def.sigma-locally-finite',
      usedBy: 'thm.bing-metrization',
      note: '$\\sigma$-离散的定义与 $\\sigma$-局部有限写在同一个节点里，Bing 的假设就是它的一半。'
    },
    {
      id: 'dep.pcp-metrizable-prop',
      kind: 'definition',
      definition: 'def.metrizable',
      usedBy: 'prop.metrizable-normal',
      note: '命题说的就是「可度量化 $\\implies$ 这三条」。'
    },
    {
      id: 'dep.pcp-firstcountable-prop',
      kind: 'definition',
      definition: 'def.first-countable',
      usedBy: 'prop.metrizable-normal',
      note: '结论第 1 条里的「第一可数」就是这个概念（由 $B(x, 1/n)$ 给的可数局部基）。'
    },
    {
      id: 'dep.pcp-normal-prop',
      kind: 'definition',
      definition: 'def.normal-space',
      usedBy: 'prop.metrizable-normal',
      note: '结论第 2 条：可度量化 $\\implies$ 正规，证明用距离函数造分离函数。'
    },

    /* ------------------------------------------------ 推导（黑箭头，证明写在边上） */
    {
      id: 'imp.pcp-paracompact-hausdorff-normal',
      kind: 'implication',
      sources: ['def.paracompact', 'def.hausdorff'],
      target: 'thm.paracompact-hausdorff-normal',
      proof: [
        '**先证正则。** 设 $x \\notin F$、$F$ 闭。对每个 $y \\in F$ 取不交开集 $O_{1} \\ni y$、$O_{2} \\ni x$ 并令 $G_{y} := O_{1}$：由 $O_{1} \\subseteq X \\setminus O_{2}$ 得 $\\operatorname{cl} G_{y} \\cap O_{2} = \\emptyset$，故 $x \\notin \\operatorname{cl} G_{y}$。开覆盖 $\\{\\, X \\setminus F \\,\\} \\cup \\{\\, G_{y} \\,\\}$ 由仿紧性有局部有限开加细 $\\mathcal{C}$；令 $W := \\bigcup \\{\\, C \\in \\mathcal{C} : C \\cap F \\ne \\emptyset \\,\\}$。',
        '- $F \\subseteq W$：$y \\in F$ 落在某个 $C$ 里，而 $C \\subseteq X \\setminus F$ 不可能，故 $C \\subseteq G_{y}$，于是 $C$ 计入 $W$；',
        '- $x \\notin \\operatorname{cl} W$：计入的每个 $C$ 都含于某个 $G_{y}$，故 $x \\notin \\operatorname{cl} C$；由局部有限族的并的闭包等于闭包之并，$\\operatorname{cl} W$ 是这些 $\\operatorname{cl} C$ 的并，不含 $x$。',
        '所以 $W \\ni F$ 与 $X \\setminus \\operatorname{cl} W \\ni x$ 是不交开集：正则 ✓。',
        '**再证正规。** 设 $A, B$ 不交闭。对 $x \\in A$ 用正则性取开集 $O_{x} \\ni x$ 使 $\\operatorname{cl} O_{x} \\cap B = \\emptyset$。开覆盖 $\\{\\, X \\setminus A \\,\\} \\cup \\{\\, O_{x} \\,\\}$ 有局部有限开加细 $\\mathcal{D}$；令 $U := \\bigcup \\{\\, D \\in \\mathcal{D} : D \\cap A \\ne \\emptyset \\,\\}$。同上 $A \\subseteq U$，且每个计入的 $D \\subseteq O_{x}$ 给出 $\\operatorname{cl} D \\cap B = \\emptyset$，由局部有限性得 $\\operatorname{cl} U \\cap B = \\emptyset$。于是 $U$ 与 $X \\setminus \\operatorname{cl} U$ 分开 $A, B$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp.pcp-shrink-closed-refinement',
      kind: 'implication',
      sources: ['thm.paracompact-hausdorff-normal', 'lem.shrink'],
      target: 'prop.paracompact-closed-refinement',
      proof: [
        '设 $\\mathcal{U}$ 是仿紧 Hausdorff 空间 $X$ 的开覆盖。仿紧性给出局部有限开加细 $\\mathcal{V} = \\{ V_{i} \\}$；由上一条定理 $X$ 正规，于是可以对 $\\mathcal{V}$ 用收缩引理，得到开覆盖 $\\{ W_{i} \\}$ 使 $\\operatorname{cl} W_{i} \\subseteq V_{i}$。取 $F_{i} := \\operatorname{cl} W_{i}$：',
        '- 闭 ✓，且 $F_{i} \\subseteq V_{i} \\subseteq$ 某个 $\\mathcal{U}$ 的成员（加细可传递）；',
        '- 覆盖 $X$ ✓（$\\{ W_{i} \\}$ 已覆盖）；',
        '- 局部有限 ✓：只碰有限多个 $V_{i}$ 的开邻域也只碰有限多个 $\\operatorname{cl} W_{i}$，用的是 $\\operatorname{cl} W_{i} \\subseteq V_{i}$。∎'
      ].join('\n')
    },
    {
      id: 'imp.pcp-shrink-unity',
      kind: 'implication',
      sources: ['thm.paracompact-hausdorff-normal', 'lem.shrink'],
      target: 'prop.paracompact-partition-unity',
      proof: [
        '这是已有命题里「仿紧 Hausdorff $\\implies$ 任意开覆盖有从属单位分解」的那一半，逐步重复一遍以显示它不额外需要任何东西：',
        '设 $\\mathcal{U} = \\{ U_{i} \\}$ 是开覆盖。仿紧给局部有限开加细 $\\mathcal{V} = \\{ V_{i} \\}$，正规性（上一条定理）加收缩引理给开覆盖 $\\{ W_{i} \\}$ 使 $\\operatorname{cl} W_{i} \\subseteq V_{i}$。',
        '对不交闭集 $\\operatorname{cl} W_{i}$ 与 $X \\setminus V_{i}$ 用 Urysohn 引理，取连续 $g_{i} : X \\to [0, 1]$，$g_{i} \\equiv 1$ 在 $\\operatorname{cl} W_{i}$ 上、$g_{i} \\equiv 0$ 在 $X \\setminus V_{i}$ 上。令 $g := \\sum_{i} g_{i}$：局部有限性保证这是局部有限和，故 $g$ 连续；$\\{ W_{i} \\}$ 覆盖说明每点处 $g \\ge 1$。于是',
        '$$\\rho_{i} := g_{i}/g$$',
        '满足：$\\rho_{i} \\ge 0$、$\\sum_{i} \\rho_{i} \\equiv 1$、$\\operatorname{supp} \\rho_{i} \\subseteq \\operatorname{cl} V_{i} \\subseteq$ 某个 $U_{i}$（把 $\\rho_{i}$ 的指标跟着 $V_{i}$ 的指标走）、支撑族局部有限 ✓。这就是从属于 $\\mathcal{U}$ 的单位分解。∎',
        '反方向（单位分解 $\\implies$ 局部有限开加细）在已有命题的证明里，本图不重复。'
      ].join('\n')
    },
    {
      id: 'imp.pcp-metric-metrizable',
      kind: 'implication',
      sources: ['def.metric-space'],
      target: 'def.metrizable',
      proof: [
        '设 $(X, d)$ 是距离空间，$\\mathcal{T}_{d}$ 是开球之并给出的拓扑。取 $X$ 上原来的拓扑 $\\mathcal{T}_{d}$ 与同一个 $d$：恒等映射 $\\mathrm{id} : (X, \\mathcal{T}_{d}) \\to (X, \\mathcal{T}_{d})$ 是同胚，故 $d$ 与拓扑相容，$X$ 可度量化 ✓。',
        '⭐ 这条边看着废话，但它确定了术语的**方向**：「可度量化」是比较弱的性质（拓扑恰好来自某个度量），「距离空间」是带了具体度量的对象。图里所有「度量 $\\implies$ 某性质」的结论都要经过这一条才能搬到可度量化空间上。'
      ].join('\n')
    },
    {
      id: 'imp.pcp-stone-metrizable-paracompact',
      kind: 'implication',
      sources: ['thm.metric-paracompact'],
      target: 'prop.metrizable-normal',
      proof: [
        '这是可度量化空间那条命题的第 3 条（仿紧）。设 $X$ 可度量化，取相容度量 $d$，则 $(X, d)$ 是距离空间，由 Stone 定理仿紧。',
        '「仿紧」是拓扑性质（只用到开覆盖与局部有限族，两者都由拓扑决定），故在同胚下保持；而 $X$ 与 $(X, d)$ 之间就有同胚（恒等映射）。于是 $X$ 仿紧 ✓。∎',
        '同一条推理也给出：可度量化空间的开覆盖永远有局部有限开加细，于是有单位分解 —— 这就是分析里「度量空间上随便用单位分解」的根据。'
      ].join('\n')
    },
    {
      id: 'imp.pcp-second-first',
      kind: 'implication',
      sources: ['def.second-countable'],
      target: 'def.first-countable',
      proof: [
        '设 $\\mathcal{B} = \\{ B_{n} \\}$ 是可数基，取 $x \\in X$，令 $\\mathcal{B}_{x} := \\{\\, B_{n} : x \\in B_{n} \\,\\}$：这是可数族（基的子族），且含于开集族内。',
        '任给含 $x$ 的开集 $U$：$U$ 是基元之并，故存在基元 $B_{n}$ 使 $x \\in B_{n} \\subseteq U$；于是 $B_{n} \\in \\mathcal{B}_{x}$ 且 $B_{n} \\subseteq U$ ✓。所以 $\\mathcal{B}_{x}$ 是 $x$ 处的可数局部基，$X$ 第一可数 ✓。∎',
        '⚠️ 反向不成立：不可数离散空间第一可数（每点取单点邻域即可），却没有可数基。'
      ].join('\n')
    },
    {
      id: 'imp.pcp-bing-from-ns',
      kind: 'implication',
      sources: ['thm.nagata-smirnov', 'def.sigma-locally-finite'],
      target: 'thm.bing-metrization',
      proof: [
        '设 $X$ 正则且有 $\\sigma$-离散基 $\\mathcal{B} = \\bigcup_{n} \\mathcal{A}_{n}$，每层 $\\mathcal{A}_{n}$ 离散。',
        '离散 $\\implies$ 局部有限（每点邻域至多碰一个成员，当然只碰有限个），故每层 $\\mathcal{A}_{n}$ 也局部有限，于是 $\\mathcal{B}$ 是 $\\sigma$-局部有限的基。由 Nagata–Smirnov 定理，$X$ 可度量化 ✓。∎',
        '⭐ 所以 Bing 定理不必单独证明 —— 它的假设是 Nagata–Smirnov 假设的特例。Bing 的独立价值在证明路径（$\\sigma$-离散族的闭包族仍离散，闭包运算与覆盖运算可以交换着算），而不在结论更强。'
      ].join('\n')
    },
    {
      id: 'imp.pcp-urysohn-from-ns',
      kind: 'implication',
      sources: ['thm.nagata-smirnov', 'def.second-countable'],
      target: 'thm.urysohn-metrization',
      proof: [
        '设 $X$ 正则且第二可数，取可数基 $\\mathcal{B} = \\{ B_{n} \\}$。把 $\\mathcal{B}$ 写成可数多个「单项族」之并：$\\mathcal{B} = \\bigcup_{n} \\{\\, B_{n} \\,\\}$。',
        '每个单项族 $\\{\\, B_{n} \\,\\}$ 是**离散**族（任何点的任何邻域至多碰到它的唯一成员 —— 因为只有一个成员），当然也局部有限。故 $\\mathcal{B}$ 是 $\\sigma$-局部有限的基，由 Nagata–Smirnov 定理 $X$ 可度量化 ✓。∎',
        '⭐ 这说明本包的两条度量化定理**不是并列的**：Urysohn 定理是 Nagata–Smirnov 定理的特例。反过来说，Urysohn 定理的更初等证明（嵌入 Hilbert 立方体）仍有独立价值 —— 它顺便给出了「正则 $+$ 第二可数 $\\implies$ 可分」这条度量结构。'
      ].join('\n')
    }

  ]
});
