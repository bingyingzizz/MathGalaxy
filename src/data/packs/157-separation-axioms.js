/* ==========================================================================
   内容包 · 分离公理 T0–T6 全链 + 内部 + 紧 T2 ⇒ T4
   --------------------------------------------------------------------------
   用户原话：「我发现 T0，T1，T3，T4，T5，T6 都没写，然后是不是还有 T3.5 之类也得写，
   完了我不是说这个闭包用上加一线的记号么，别用 cl，然后集合的内部也没有，用上面加一个
   圈的记号。还有你这个紧 T2 推 T4 也没写啊，你这个得写」

   查证（补前）：
     · 分离公理只有 `def.hausdorff`（T2, L5）与 `def.normal-space`（正规, L6）两个节点；
     · T0 / T1 / T3（正则）/ T3.5（完全正则）/ T5 / T6 **全库 0 命中**；
     · `def.hausdorff` 的 aka 里错挂了「正则空间 / 正规空间」⇒ 搜「正则空间」第一名是
       Hausdorff（这是数据 bug，本包顺手修掉）；
     · 紧 Hausdorff ⇒ 正规 只在 `prop.compact-basic-operations` 的第 (3) 条里出现，
       **图上没有这条推导箭头** ⇒ 本包补一条 implication 边（证明写在边上）。
     · 闭包记号原先是 \operatorname{cl}，已全库改成 \overline{·}（53 处）；
       内部原先没有定义，本包补 `def.interior`，记号 \mathring{A}。

   归属：`topology.general`（24 → 32 点）。
   层号：T0 L6 → T1 L7 → T3 L8 → T3.5 L9 → T5 L9 → T6 L10；内部 L6；
        紧 T2 ⇒ T4 那条边会把 `def.normal-space` 抬到 L15（紧在 L14），
        连带 Urysohn / Tietze / 收缩引理一起上移 —— 这是**算出来的**，不是设计约束。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '分离公理 T0–T6、内部、紧 Hausdorff ⇒ 正规',

  nodes: [

    {
      id: 'def.t0-space',
      cluster: 'topology.general',
      type: 'definition',
      label: 'T0 空间',
      title: 'T0 空间（Kolmogorov）：点可被开集区分',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T0', 'Kolmogorov'],
      statement: [
        '**在做什么**：分离公理里最弱的一条 —— 只要求「任意两个不同点，存在某个开集恰好只含其中一个」。它保证拓扑能**看见**点是不同的。',
        '',
        '拓扑空间 $X$ 叫 **$T_{0}$ 空间**（或 **Kolmogorov 空间**），若对任意 $x \\ne y \\in X$，存在开集 $U$ 使',
        '',
        '$$x \\in U,\\ y \\notin U \\qquad \\text{或} \\qquad y \\in U,\\ x \\notin U .$$',
        '',
        '**等价说法**：任意两个不同点的**邻域族不同**，即 $x, y$ 不可能有完全相同的开邻域集。',
        '',
        '所以 $T_{0}$ 的含义是：**拓扑能分辨点**。'
      ].join('\n'),
      notes: [
        '⚠️ **不可分空间的反例**（这把 $T_{0}$ 的必要性说死）：取 $X = \\{a, b\\}$，拓扑 $\\mathcal{T} = \\{\\emptyset, X\\}$。两个点的邻域族都是 $\\{X\\}$，拓扑**完全看不见** $a$ 与 $b$ 的区别 —— 这就是「不可分」的原意，也是 $T_{0}$ 名字的来历（Kolmogorov 用它区分「同一拓扑下的等价点」）。',
        '**商空间里天天遇到**：任何拓扑空间都能商掉关系 $x \\sim y \\iff$ 邻域族相同，得到 $T_{0}$ 空间；这个商叫 **Kolmogorov 商**。它是把任意空间「$T_{0}$ 化」的标准手术，也是 $T_{0}$ 唯一能普遍做到的位置（再往上都要额外条件）。',
        '⚠️ $T_{0}$ **不**保证极限唯一：$\\{a,b\\}$ 的那两个拓扑里，常数列 $a,a,\\ldots$ 同时收敛到 $a$ 与 $b$。极限唯一要 $T_{2}$（`def.hausdorff`）。',
        '⭐ 链的位置：$T_{0}$ 是最底下的一格。$T_{1}$ 往上每加一条，就多「看见」一点结构 —— 见 `def.t1-space` 的注里的那张表。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.t1-space',
      cluster: 'topology.general',
      type: 'definition',
      label: 'T1 空间',
      title: 'T1 空间（Fréchet）：单点是闭集',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T1', 'Fréchet'],
      statement: [
        '**在做什么**：$T_{1}$ 的判据极其好用，只有五个字：**单点是闭集**。等价地说，两个不同点各自都有一个不含对方的开邻域（但两个邻域**不必**不交）。',
        '',
        '拓扑空间 $X$ 叫 **$T_{1}$ 空间**（或 **Fréchet 空间**），若下列等价条件之一成立：',
        '',
        '1. 每个单点集 $\\{x\\}$ 是**闭集**；',
        '2. 对任意 $x \\ne y$，存在开集 $U \\ni x$ 使 $y \\notin U$，**并且**存在开集 $V \\ni y$ 使 $x \\notin V$；',
        '3. 每个有限子集是闭集；',
        '4. 对任意 $x$，$\\bigcap\\{\\, U : U \\ni x \\ \\text{开} \\,\\} = \\{x\\}$（即 $x$ 的闭包就是它自己：$\\overline{\\{x\\}} = \\{x\\}$）。',
        '',
        '**$T_{1}$ 与 $T_{2}$ 的差别**：$T_{1}$ 只要求「各自有一个不含对方的邻域」，两个邻域可以**相交**；$T_{2}$ 要求它们**不交**。所以 $T_{2} \\implies T_{1} \\implies T_{0}$，反向都不成立。'
      ].join('\n'),
      notes: [
        '⭐ **为什么「单点闭」是最好的判据**：闭集可以做交、做有限并，于是 $T_{1}$ 下所有有限集都闭 —— 这让「从闭集里挖掉有限个点仍闭」「分离点与有限集」这类操作全部合法。几乎每个用到 $T_{1}$ 的证明，实际用的都是这条。',
        '⚠️ **$T_{1}$ 不够用的典型例子**（余有限拓扑）：$X$ 无穷，开集取 $\\emptyset$ 与余有限集。它 $T_{1}$（单点闭 ✓）但不 $T_{2}$：任意两个非空开集的交是余有限的、非空，永远交不停。所以「极限唯一」在这里失效 —— 序列可以收敛到**任意**点。',
        '⚠️ **约定差异**：多数教材把「正则」记作 $T_{3}$ 时，指的是「正则 **且** $T_{1}$」；单纯的正则（不含 $T_{1}$）弱于 $T_{3}$。本图在 `def.regular-space` 里写明了这个约定。',
        '**在链里的位置**：$T_{1}$ 是第一格「能分开点」的公理。再往上 $T_{2}$ 才能分开邻域，$T_{3}$ 才能拿点对闭集，$T_{4}$ 才能拿闭集对闭集。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.interior',
      cluster: 'topology.general',
      type: 'definition',
      label: '内部',
      title: '内部：闭包的对偶',
      regions: ['topology'],
      tags: ['定义', '拓扑', '内部', '开核', '边界'],
      statement: [
        '**在做什么**：闭包的反面。闭包是「把 $A$ 撑到最小闭集」，内部是「把 $A$ 缩到最大开集」—— 两者由取补互相翻译。',
        '',
        '设 $(X, \\mathcal{T})$ 是拓扑空间，$A \\subseteq X$。$A$ 的**内部**（interior，也叫开核）是',
        '',
        '$$\\mathring{A} := \\bigcup\\{\\, U : U \\subseteq A,\\ U\\ \\text{开} \\,\\} ,$$',
        '',
        '即「一切含于 $A$ 的开集之并」，也就是**包含在 $A$ 里的最大开集**。',
        '',
        '**与闭包的对偶**（把闭包的公理照抄一遍、开闭互换即可得到）：',
        '',
        '- $\\mathring{A} \\subseteq A$，且 $\\mathring{A}$ 开；$A$ 开 $\\iff$ $\\mathring{A} = A$；',
        '- $X \\setminus \\mathring{A} = \\overline{X \\setminus A}$，等价地 $\\mathring{A} = X \\setminus \\overline{X \\setminus A}$；',
        '- $\\mathring{(A \\cap B)} = \\mathring{A} \\cap \\mathring{B}$（内部**对交**保号，对并不保号）。',
        '',
        '**边界**：$\\partial A := \\overline{A} \\setminus \\mathring{A} = \\overline{A} \\cap \\overline{X \\setminus A}$。'
      ].join('\n'),
      notes: [
        '⭐ **对偶公式是唯一的记忆法**：$\\mathring{A} = X \\setminus \\overline{X \\setminus A}$。所以关于闭包的一切定理（对任意交闭、对有限并闭）都能一字不改地翻译成内部的定理（对任意并开、对有限交开）。',
        '⚠️ **内部不保并**：$\\mathring{(A \\cup B)} \\supseteq \\mathring{A} \\cup \\mathring{B}$ 可能**严格**变大。例：$X = \\mathbb{R}$，$A = [0,1]$、$B = [1,2]$，则 $\\mathring{A} = (0,1)$、$\\mathring{B} = (1,2)$，而 $\\mathring{(A \\cup B)} = (0,2)$ —— 多出了点 $1$。**闭包对并不出问题、对交会出问题**，内部正好反过来。',
        '⚠️ **别把「内部」与「开核」当成两个东西**：开核（open kernel）就是内部的另一个名字，中文文献两种都常见。也不要把内部与「内点集」搞混 —— 后者是「存在开球含于 $A$ 的点」，在一般拓扑里要换成开邻域，结论仍是 $\\mathring{A}$。',
        '⚠️ 记号：本图用 $\\mathring{A}$（字母上方加圈），与闭包的 $\\overline{A}$（上方加线）配套。⚠️ 有些书用 $A^{\\circ}$（右上角）、$\\operatorname{Int} A$、$A^{\\mathrm{o}}$，读到时要认出来。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 闭集与极限点',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.regular-space',
      cluster: 'topology.general',
      type: 'definition',
      label: '正则空间',
      title: '正则空间（T3）：点与闭集可以分开',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T3', '正则'],
      statement: [
        '**在做什么**：把 $T_{2}$ 的「点 vs 点」升级成「点 vs 不含它的闭集」。这是第一个能对**闭集**动手的分离公理。',
        '',
        '拓扑空间 $X$ 叫**正则**（regular），若对任意闭集 $F$ 与任意 $x \\notin F$，存在不交开集 $U, V$ 使',
        '',
        '$$x \\in U, \\qquad F \\subseteq V .$$',
        '',
        '若再要求 $X$ 是 $T_{1}$ 的（`def.t1-space`），就称 $X$ 是 **$T_{3}$ 空间**。',
        '',
        '**等价说法**（常用、更好用）：对任意 $x$ 与它的开邻域 $U \\ni x$，存在开集 $W$ 使',
        '',
        '$$x \\in W \\subseteq \\overline{W} \\subseteq U ,$$',
        '',
        '即**每个开邻域里还夹着一个开集的闭包**。',
        '',
        '**链的位置**：$T_{3} \\implies T_{2} \\implies T_{1} \\implies T_{0}$（反向都不成立）。'
      ].join('\n'),
      notes: [
        '⚠️ **约定分歧最严重的一格**：多数教材（Munkres 之外的欧洲学派）把「正则」本身就理解成含 $T_{1}$；Munkres 则明确说「正则 + $T_{1}$ = $T_{3}$」。差别不是无关紧要的 —— 有「正则但不 $T_{1}$」的空间（例如在不可分拓扑上加 $T_{1}$ 反例的构造），它们连 $T_{2}$ 都不是。**本图取「正则 = 不含 $T_{1}$，$T_{3}$ = 正则 + $T_{1}$」的口径**，与 Munkres 一致。',
        '⭐ **「闭包还含在邻域里」这个等价形式是正则性的真正用法**：它允许你把开集**收缩**一点点，给旁边腾出空间。所有「先造开覆盖、再收缩、再取有限子覆盖」的论证（紧性、仿紧性、单位分解）都靠这一手。对照 `prop.normal-locally-closed`（正规空间的同一手法）。',
        '⚠️ **正则不蕴含正规**：`def.normal-space` 要求两个**闭集**分开，比「点与闭集」强。反例是 Sorgenfrey 平面（两个「Sorgenfrey 直线」的积）：它正则但不正规 —— 这是拓扑学里最著名的反例之一，也说明 $T_{3}$ 与 $T_{4}$ 之间**没有捷径**。',
        '⚠️ **$T_{3}$ 不等于「点与闭集之间有连续函数」** —— 那是 $T_{3.5}$（`def.completely-regular-space`）。$T_{3}$ 只给开集，不给函数。这个落差正是 Urysohn 引理要补的（而 Urysohn 引理需要 $T_{4}$，不是 $T_{3}$）。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.completely-regular-space',
      cluster: 'topology.general',
      type: 'definition',
      label: '完全正则空间',
      title: '完全正则空间（T3.5 / Tychonoff）：点与闭集可用连续函数分开',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T3.5', 'Tychonoff', '完全正则'],
      statement: [
        '**在做什么**：把「用开集分开」升级成「用**连续函数**分开」。这是分离公理链里第一次请出函数 —— 也是紧化与度量化理论的入口。',
        '',
        '拓扑空间 $X$ 叫**完全正则**（completely regular，也叫 **Tychonoff 空间**这个术语的弱版），若对任意闭集 $F$ 与任意 $x \\notin F$，存在连续函数 $f : X \\to [0, 1]$ 使',
        '',
        '$$f(x) = 0, \\qquad f|_{F} \\equiv 1 .$$',
        '',
        '若再要求 $T_{1}$，就称 $X$ 是 **$T_{3.5}$ 空间**（**Tychonoff 空间**）。',
        '',
        '**等价说法**：$X$ 能嵌入某个方体 $[0,1]^{I}$（即「有足够多的连续函数」）。',
        '',
        '**链的位置**：$T_{4} \\implies T_{3.5} \\implies T_{3} \\implies T_{2}$ —— 唯一的非平凡一步是 $T_{4} \\implies T_{3.5}$（用 Urysohn 引理 `lem.urysohn`，注意它要的是**正规**，不是正则）。'
      ].join('\n'),
      notes: [
        '⭐ **为什么这一格特别重要**：$T_{3.5}$ 恰好是「能嵌入方体」的那一档，因此它的紧化（Stone–Čech）理论研究得最透；同时它也是度量化定理（Urysohn / Nagata–Smirnov / Bing）假设里的那一档 —— 因为度量空间一定完全正则，而完全正则比正规更「函数友好」。',
        '**为什么 $T_{4} \\implies T_{3.5}$ 要靠 Urysohn**：正规只保证「两闭集有不交开邻域」，要把开集变成 $[0,1]$ 上的连续函数，需要二分逼近构造（Urysohn 引理）。反过来 $T_{3.5} \\implies T_{3}$ 只要取 $U = f^{-1}([0, 1/2))$、$V = f^{-1}((1/2, 1])$ 即可，是一行。',
        '⚠️ **约定**：有的书把「完全正则」直接当 $T_{3.5}$（隐含 $T_{1}$），有的把两者分开（本图分开写）。差别只在于要不要额外假设 $T_{1}$。',
        '⚠️ **Tychonoff 撞名**：`thm.tykhonov` 是**乘积紧性**定理（任意积紧空间紧），与本概念同一个人、不同贡献，别混。',
        '⚠️ **完全正则不等于正规**：Sorgenfrey 平面完全正则（其实正则 + 完全正则那档），但不正规。所以 $T_{3.5}$ 严格弱于 $T_{4}$。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 完全正则空间',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.completely-normal-space',
      cluster: 'topology.general',
      type: 'definition',
      label: '完全正规空间',
      title: '完全正规空间（T5）：连子空间都正规',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T5', '完全正规'],
      statement: [
        '**在做什么**：正规性是「闭集 vs 闭集」。它**不遗传**给子空间 —— 所以要求「所有子空间都正规」是一条真加强，这就是 $T_{5}$。',
        '',
        '拓扑空间 $X$ 叫**完全正规**（completely normal，也叫**遗传正规** hereditarily normal），若 $X$ 的**每个子空间**都是正规的（`def.normal-space`）。',
        '',
        '**等价判据（Urysohn 的分离定理，最好用）**：$X$ 完全正规 $\\iff$ 对任意两个**分离集** $A, B$（即 $\\overline{A} \\cap B = A \\cap \\overline{B} = \\emptyset$）存在不交开集 $U \\supseteq A$、$V \\supseteq B$。',
        '',
        '**链的位置**：$T_{6} \\implies T_{5} \\implies T_{4}$（每步都是「条件变严」）。'
      ].join('\n'),
      notes: [
        '⭐ **「分离集」为什么是自然的加强**：两个闭集天然是分离的（$\\overline{A} = A$，$A \\cap B = \\emptyset$ $\\implies$ $A \\cap \\overline{B} \\subseteq A \\cap B = \\emptyset$）。所以分离集比闭集对**宽**，要求能分开更宽的一类集合，等价于要求更强的空间。这条判据把「遗传」这个绕口的定义换成了可操作的集合条件。',
        '⚠️ **正规不遗传，是 $T_{5}$ 存在的唯一理由**：经典例子是 Tychonoff plank，或更简单的「Sorgenfrey 平面」变体 —— 正规空间的子空间可能不正规。所以 $T_{5}$ 不是「把 $T_{4}$ 换个写法」，而是真的加了一条。',
        '⚠️ **度量化空间都是 $T_{5}$**：距离空间的所有子空间都是距离空间、都正规，所以度量空间完全正规。这也是为什么在分析里很少需要 $T_{5}$ —— 它自动成立。',
        '⚠️ 有的书把 $T_{5}$ 定义为「完全正规 + $T_{1}$」。本图沿用「$\\implies T_{4}$」的惯例，把 $T_{1}$ 部分并入 $T_{4}$（因为 $T_{4}$ 已含 $T_{1}$）。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.perfectly-normal-space',
      cluster: 'topology.general',
      type: 'definition',
      label: '完美正规空间',
      title: '完美正规空间（T6）：每个闭集都可数交开集',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T6', '完美正规', 'G-delta'],
      statement: [
        '**在做什么**：链顶端的最后一格。它用「可数」这一条把正规性再拧紧一格 —— 每个闭集都是一列开集之交。',
        '',
        '先记两个记号：集合 $A$ 叫 **$G_{\\delta}$ 集**，若它是**可数**多个开集之交；叫 **$F_{\\sigma}$ 集**，若它是可数多个闭集之并。',
        '',
        '拓扑空间 $X$ 叫**完美正规**（perfectly normal），若',
        '',
        '1. $X$ 正规（`def.normal-space`）；',
        '2. 每个闭集都是 $G_{\\delta}$ 集。',
        '',
        '（等价地：每个开集都是 $F_{\\sigma}$ 集，取补即得。）',
        '',
        '**链的位置**：$T_{6} \\implies T_{5} \\implies T_{4}$。'
      ].join('\n'),
      notes: [
        '⭐ **为什么「每个闭集都可数交开集」值得单列**：它保证存在**连续函数把闭集精确地写成零点集**（$F = f^{-1}(0)$），而不只是「$f$ 在 $F$ 上为 0」。这一条在无穷维分析里非常关键（如 $C^{*}$-代数里的「$G_{\\delta}$ 点」、Baire 纲定理的加强版）。',
        '⚠️ **度量空间都是完美正规**：$d(x, F)$ 连续，$F = \\{\\, x : d(x, F) = 0 \\,\\}$ 且 $\\{\\, x : d(x,F) < 1/n \\,\\}$ 是一列开集 —— 于是闭集 = 可数交开集 ✓。所以 $T_{6}$ 在分析里几乎总是自动成立，反而在一般拓扑里才是真条件。',
        '⚠️ **$T_{6} \\implies T_{5}$ 不是白给的**：证明要用「可数交开集可推出「可用连续函数编码」」把分离集分开，属于 Urysohn 引理的加强版。本图只记链的方向，证明从略。',
        '⚠️ **约定**：有的书把完美正规定义为「完全正规 + 每个闭集都可数交开集」；由于 $T_{6}$ 蕴含 $T_{5}$，两种写法等价。'
      ].join('\n\n'),
      refs: [
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Munkres, Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'thm.compact-hausdorff-normal',
      cluster: 'topology.general',
      type: 'theorem',
      label: '紧 Hausdorff 空间正规',
      title: '紧 Hausdorff 空间是正规的',
      regions: ['topology'],
      tags: ['定理', '拓扑', '紧', 'Hausdorff', '正规', 'T4'],
      statement: [
        '**在做什么**：$T_{2} + $ 紧 $\\implies T_{4}$。这一条把「局部可分点」和「整体可分闭集」接起来，是整个拓扑学里被引用最多的引理之一 —— 因为它让 Urysohn 引理 / Tietze 延拓 / 单位分解在**紧流形**上全部可用。',
        '',
        '设 $X$ 是**紧**的 Hausdorff 空间（`def.compact`、`def.hausdorff`）。则 $X$ 是**正规**的（`def.normal-space`）：任意两个不交闭集 $A, B$ 存在不交开集 $U \\supseteq A$、$V \\supseteq B$。',
        '',
        '**用途**：',
        '',
        '- 紧流形（局部结构）$\\implies$ 可度量化 / 可嵌入欧氏空间；',
        '- $[0,1]$、$\\mathbb{S}^{n}$、$\\mathbb{T}^{n}$ 都正规，于是上文提到的 Urysohn 型论证全部可用，不必逐个验证。'
      ].join('\n'),
      notes: [
        '⭐ **证明思路（两步，都是紧性的标准用法）**：先把「点 vs 闭集」做出来（对每点 $b \\in B$ 用 $T_{2}$ 造 $b$ 的开邻域，其闭包仍避开 $x$；再用紧性取有限多个的并），得到「点与闭集可分开」（即 $X$ 正则）；再对 $x \\in A$ 重复一次同一手法（这次用 $A$ 的紧性取有限并），得到两个不交开集。两次都是「对每个点造一点余量、再用紧性取有限多」。完整证明在边上（`imp.compact-hausdorff-normal`）。',
        '⚠️ **紧性与 Hausdorff 缺一不可**：只有紧性不行（不 $T_{2}$ 的紧空间可以完全不正规），只有 $T_{2}$ 也不行（$T_{2}$ 一般不给正规 —— 例如 Sorgenfrey 平面）。所以这条定理的字面里两个前提都不能删。',
        '⚠️ **不能推广成「紧 + 正则」**：正则 + 紧确实蕴含正规（因为紧 + $T_{2}$ 蕴含正则，反之不必然）—— 但「紧 + 正则」这一条**也不**等价，历史上有人以为紧正则就够，实际仍需 $T_{2}$（有的书用「紧 + 正则」的变体，注意口径）。',
        '**与仿紧版的关系**：`thm.paracompact-hausdorff-normal` 证明「仿紧 $+$ Hausdorff $\\implies$ 正规」，紧空间都仿紧，所以那条也能推到本条 —— 但两条证明难度不同，本条只用紧性，不引入仿紧性。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 紧 Hausdorff 空间',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    }
  ],

  edges: [
    { id: 'dep.t0-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.t0-space',
      note: '判据用「点与闭包的区分」陈述，直接借闭包的记号。' },
    { id: 'dep.t0-top', kind: 'definition',
      definition: 'def.topology', usedBy: 'def.t0-space',
      note: '分离公理都是拓扑空间的性质，开集是最基本的语汇。' },

    { id: 'dep.t1-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.t1-space',
      note: '主判据就是「单点是闭集」。' },
    { id: 'dep.t1-t0', kind: 'definition',
      definition: 'def.t0-space', usedBy: 'def.t1-space',
      note: '$T_1 \\implies T_0$：链上的相邻格，定义时先立住下面的。' },

    { id: 'dep.int-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.interior',
      note: '内部是闭包的对偶（$\\mathring{A} = X \\setminus \\overline{X \\setminus A}$），必须先有闭包。' },
    { id: 'dep.int-top', kind: 'definition',
      definition: 'def.topology', usedBy: 'def.interior',
      note: '「含于 $A$ 的开集之并」直接用开集。' },

    { id: 'dep.reg-t1', kind: 'definition',
      definition: 'def.t1-space', usedBy: 'def.regular-space',
      note: '$T_3$ = 正则 + $T_1$，定义里要说明这一层。' },
    { id: 'dep.reg-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.regular-space',
      note: '分离的对象是「点与闭集」。' },
    { id: 'dep.reg-haus', kind: 'definition',
      definition: 'def.hausdorff', usedBy: 'def.regular-space',
      note: '$T_3 \\implies T_2$：链上紧邻的一格。' },

    { id: 'dep.cr-reg', kind: 'definition',
      definition: 'def.regular-space', usedBy: 'def.completely-regular-space',
      note: '$T_{3.5} \\implies T_3$：把开集换成连续函数，强一格。' },
    { id: 'dep.cr-cont', kind: 'definition',
      definition: 'def.continuous-map', usedBy: 'def.completely-regular-space',
      note: '定义的核心就是「存在连续函数」。' },

    { id: 'dep.cn-norm', kind: 'definition',
      definition: 'def.normal-space', usedBy: 'def.completely-normal-space',
      note: '定义就是「每个子空间都正规」。' },
    { id: 'dep.cn-sub', kind: 'definition',
      definition: 'def.subspace-topology', usedBy: 'def.completely-normal-space',
      note: '「遗传」的对象是子空间拓扑。' },
    { id: 'dep.cn-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.completely-normal-space',
      note: '分离集的判据用闭包写：$\\overline{A} \\cap B = A \\cap \\overline{B} = \\emptyset$。' },

    { id: 'dep.pn-norm', kind: 'definition',
      definition: 'def.normal-space', usedBy: 'def.perfectly-normal-space',
      note: '完美正规的第一条就要求正规。' },
    { id: 'dep.pn-cn', kind: 'definition',
      definition: 'def.completely-normal-space', usedBy: 'def.perfectly-normal-space',
      note: '$T_6 \\implies T_5$：链顶两格相邻。' },
    { id: 'dep.pn-int', kind: 'definition',
      definition: 'def.interior', usedBy: 'def.perfectly-normal-space',
      note: '$G_\\delta$ / $F_\\sigma$ 的说法要与开闭集、内部的对偶语言配套。' },

    { id: 'dep.chn-compact', kind: 'definition',
      definition: 'def.compact', usedBy: 'thm.compact-hausdorff-normal',
      note: '第一条前提是紧。' },
    { id: 'dep.chn-haus', kind: 'definition',
      definition: 'def.hausdorff', usedBy: 'thm.compact-hausdorff-normal',
      note: '第二条前提是 $T_2$。' },
    { id: 'dep.chn-normal', kind: 'definition',
      definition: 'def.normal-space', usedBy: 'thm.compact-hausdorff-normal',
      note: '结论是 $T_4$。' },

    {
      id: 'imp.normal-completely-regular',
      kind: 'implication',
      layer: false,
      title: '正规推出完全正则（Urysohn 引理的推论）',
      sources: ['def.normal-space', 'lem.urysohn'],
      target: 'def.completely-regular-space',
      proof: [
        '设 $X$ 正规（$T_4$），$F \\subseteq X$ 闭、$x \\notin F$。则 $F$ 与单点集 $\\{x\\}$ 是两个不交闭集（$T_4$ 含 $T_1$，故 $\\{x\\}$ 闭）。',
        '',
        '由 Urysohn 引理（`lem.urysohn`：正规空间中两个不交闭集可由 $[0,1]$ 上的连续函数分开）存在连续 $f : X \\to [0, 1]$ 使',
        '',
        '$$f|_{F} \\equiv 0, \\qquad f(x) = 1 .$$',
        '',
        '于是对任意闭集 $F$ 与 $x \\notin F$ 都有这样的 $f$，即 $X$ 完全正则。再加上 $X$ 已 $T_1$，得 $T_{3.5}$ ✓。',
        '',
        '⭐ **方向不能反**：这里用到的是**正规**（$T_4$），不是正则（$T_3$）。$T_3$ 只给不交开集、不给连续函数，所以 $T_3 \\implies T_{3.5}$ 是**假**的（Sorgenfrey 平面之外的经典反例都要靠这条差别）。',
        '⚠️ 反过来 $T_{3.5} \\implies T_3$ 只要一行：取 $U = f^{-1}([0, 1/2))$、$V = f^{-1}((1/2, 1])$。'
      ].join('\n')
    },
    {
      id: 'imp.compact-hausdorff-normal',
      kind: 'implication',
      sources: ['def.compact', 'def.hausdorff'],
      target: 'thm.compact-hausdorff-normal',
      proof: [
        '**第 0 步（预备）**：紧空间的闭子集紧（`prop.compact-basic-operations`）；$T_{2}$ 空间中，若 $x \\notin B$ 且 $B$ 紧，则存在不交开集分开 $x$ 与 $B$。',
        '',
        '**第 1 步：$X$ 正则（点 vs 闭集）。** 设 $F \\subseteq X$ 闭、$x \\notin F$。对每个 $y \\in F$，由 $T_{2}$ 取不交开集 $U_{y} \\ni y$、$W_{y} \\ni x$；令 $G_{y} := U_{y}$，则 $\\overline{G_{y}} \\subseteq X \\setminus W_{y}$，故 $x \\notin \\overline{G_{y}}$。',
        '',
        '族 $\\{\\, G_{y} : y \\in F \\,\\}$ 是紧集 $F$ 的开覆盖（$F$ 闭于紧空间，故紧），取有限子覆盖 $G_{y_{1}}, \\ldots, G_{y_{n}}$。令',
        '',
        '$$V := G_{y_{1}} \\cup \\cdots \\cup G_{y_{n}}, \\qquad U := X \\setminus (\\overline{G_{y_{1}}} \\cup \\cdots \\cup \\overline{G_{y_{n}}}) .$$',
        '',
        '则 $U$ 开（有限个闭集之并闭）、$V$ 开、$F \\subseteq V$；且 $x \\notin \\overline{G_{y_{i}}}$ 给出 $x \\in U$；最后由 $G_{y_{i}} \\subseteq \\overline{G_{y_{i}}}$ 得 $U \\cap V = \\emptyset$。所以 $x$ 与 $F$ 被不交开集分开：$X$ 正则 ✓。',
        '',
        '**第 2 步：$X$ 正规（闭集 vs 闭集）。** 设 $A, B$ 不交闭。对每个 $x \\in A$，用第 1 步（把闭集 $B$ 与点 $x$ 分开）得到不交开集 $O_{x} \\ni x$、$W_{x} \\supseteq B$。族 $\\{\\, O_{x} : x \\in A \\,\\}$ 覆盖紧集 $A$，取有限子覆盖 $O_{x_{1}}, \\ldots, O_{x_{m}}$。令',
        '',
        '$$U := O_{x_{1}} \\cup \\cdots \\cup O_{x_{m}}, \\qquad V := W_{x_{1}} \\cap \\cdots \\cap W_{x_{m}} .$$',
        '',
        '则 $U$ 开、$V$ 开（有限交）、$A \\subseteq U$、$B \\subseteq V$，且 $U \\cap V = \\emptyset$（每个 $O_{x_{i}}$ 都与 $W_{x_{i}}$ 不交，故 $U$ 与全体 $W_{x_{j}}$ 的交不交）。于是 $X$ 正规 ✓。∎',
        '',
        '**⭐ 两次都是同一个模板**：对每个点造「一点余量」（邻域取到闭包仍避开对面），再用紧性把无穷族压成有限族 —— 有限性正是为了取「有限并 / 有限交」时开闭性不乱。这两步在 `thm.paracompact-hausdorff-normal` 里换成了局部有限族，是同一条思路的仿紧版。'
      ].join('\n')
    }
  ]
});
