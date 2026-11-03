/* ==========================================================================
   内容包 · 分离公理 T0–T6 全链 + 内部 + 紧 T2 ⟹ T4
   --------------------------------------------------------------------------
   用户两轮口径：
     ①「T0，T1，T3，T4，T5，T6 都没写，然后是不是还有 T3.5 之类也得写，完了我不是说
        这个闭包用上加一线的记号么，别用 cl，然后集合的内部也没有，用上面加一个圈的
        记号。还有你这个紧 T2 推 T4 也没写啊，你这个得写」
     ②「不是不是，正则空间是 T3+T1，T3 空间是单点和闭集可以被分离」＋
        「平凡蕴含还是画上吧，而且 T3 推不出 T1 啊…真的有蕴含的要画上线，然后比如说
          度量空间一定 T6 这种推出也要画，你检查有没有漏的」

   ⭐ **命名口径（用户拍板，别自作主张改）**：
        T-number = **裸性质**（不含 T1）；中文名 = **裸性质 + T1**。
          T0 = 点可被开集区分           （T0 本身已隐含？不，T1 才逐点闭）
          T1 = 单点闭集
          T2 = Hausdorff
          T3 = 单点与闭集可分离        ← 裸性质
          正则空间 = T3 + T1          ← 中文名
          T3.5 = 单点与闭集可由连续函数分离（裸性质）
          完全正则空间 = T3.5 + T1 = Tychonoff 空间
          T4 = 两不交闭集可分离；正规空间 = T4 + T1（`def.normal-space` 本来就这么写）
          T5 = 遗传正规；完全正规空间（已含 T1，因为正规含 T1）
          T6 = 正规 + 每个闭集 G_δ；完美正规空间
        ⇒ **裸 T3 ⇏ T1、⇏ T2**；只有「正则空间」才推得出 T2。这正是用户纠正的那一点。

   ⚠️ 层号是**算出来的**（= 最长推导路径），不保证随 T-number 单调：
        正规 (L16) ← 完全正规 ← 完美正规 ← 度量空间；
        完全正则 (L17) ← 正规；正则 (L18) ← 完全正则。
      即「越弱的公理层越深」—— 因为它是从更强的公理推出来的。这是对的，别去将就。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '分离公理 T0–T6、内部、紧 Hausdorff ⟹ 正规',

  nodes: [

    {
      id: 'def.t0-space',
      cluster: 'topology.separation',
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
        '⚠️ **不可分空间的反例**（这把 $T_{0}$ 的必要性说死）：取 $X = \\{a, b\\}$，拓扑 $\\mathcal{T} = \\{\\emptyset, X\\}$。\n\n两个点的邻域族都是 $\\{X\\}$，拓扑**完全看不见** $a$ 与 $b$ 的区别 —— 这就是「不可分」的原意，也是 $T_{0}$ 名字的来历（Kolmogorov 用它区分「同一拓扑下的等价点」）。',
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
      cluster: 'topology.separation',
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
        '⭐ **命名口径**（用户拍板）：**T-number 是裸性质，中文名才带 $T_{1}$**。所以「$T_{3}$ 空间」= 单点与闭集可分离（**不含** $T_{1}$，见 `def.t3-space`），而「正则空间」= $T_{3} + T_{1}$。这条差别是真的：裸 $T_{3}$ 推不出 $T_{1}$。',
        '**在链里的位置**：$T_{1}$ 是第一格「能分开点」的公理。再往上 $T_{2}$ 才能分开邻域，$T_{3}$ 才能拿点对闭集，$T_{4}$ 才能拿闭集对闭集。',
        ,
        '**四条里哪条才是“真判据”**（这四条等价非常常用，但依赖深浅差别大）：\n' +
        '\n' +
        '- (1) $\\iff$ (2)：**几乎免费，但要两次**。由 (1) 得 (2)：$\\{y\\}$ 闭 $\\implies$ $X\\setminus\\{y\\}$ 开且含 $x$ 不含 $y$，对 $x, y$ 交换再做一次即得另一半。反向：$X \\setminus \\{y\\} = \\bigcup\\{\\, U \\ni x : x \\ne y \\,\\}$ 是开集之并 $\\implies$ $\\{y\\}$ 闭。**这一步只用开集公理（任意并）。**\n' +
        '- (1) $\\iff$ (3)：**要用“有限并闭”**。单点闭 $\\implies$ 有限并闭（闭集对有限并封闭）；反过来取单点即为有限集。**注意这里必须有限**：可数并闭不成立（否则 $T_{1}$ 就成了 $T_{2}$，见下）。\n' +
        '- (1) $\\iff$ (4)：**只做补集与并**。$x$ 的闭包 = 含 $x$ 的一切闭集之交 = 一切含 $x$ 的开集的补的交 = 补掉「一切含 $x$ 开集之并」；于是「闭包 $=\\{x\\}$」$\\iff$「$\\bigcup\\{U \\ni x\\} = X \\setminus \\{x\\}$ 开」$\\iff$ $\\{x\\}$ 闭。\n' +
        '\n' +
        '**这四条都不需要任何额外假设**（不选 AC、不用可数性、不用 Hausdorff）—— $T_{1}$ 是纯开集语言的公理，这也是它常被当成「闭集语言的 $T_{0}$」。\n' +
        '\n' +
        '⚠️ **最常见的误推**：以为 (3) 能加强成「可数集闭」。**不成立**：余可数拓扑里可数集未必闭（它只保证有限集闭）；那正是 $T_{1}$ 与 $T_{2}$ 的分界线 —— `def.hausdorff` 的注里给了余有限拓扑这个反例。\n' +
        '⚠️ **另一个误推**：$T_{1}$ 不蕴含「两个不同点有不交邻域」。那是 $T_{2}$；$T_{1}$ 只给「各自有一个不含对方的邻域」，两个邻域**可以相交**。'
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
        '⚠️ **内部不保并**：$\\mathring{(A \\cup B)} \\supseteq \\mathring{A} \\cup \\mathring{B}$ 可能**严格**变大。\n\n例：$X = \\mathbb{R}$，$A = [0,1]$、$B = [1,2]$，则 $\\mathring{A} = (0,1)$、$\\mathring{B} = (1,2)$，而 $\\mathring{(A \\cup B)} = (0,2)$ —— 多出了点 $1$。\n\n**闭包对并不出问题、对交会出问题**，内部正好反过来。',
        '⚠️ **别把「内部」与「开核」当成两个东西**：开核（open kernel）就是内部的另一个名字，中文文献两种都常见。也不要把内部与「内点集」搞混 —— 后者是「存在开球含于 $A$ 的点」，在一般拓扑里要换成开邻域，结论仍是 $\\mathring{A}$。',
        '⚠️ 记号：本图用 $\\mathring{A}$（字母上方加圈），与闭包的 $\\overline{A}$（上方加线）配套。⚠️ 有些书用 $A^{\\circ}$（右上角）、$\\operatorname{Int} A$、$A^{\\mathrm{o}}$，读到时要认出来。',
        ,
        '**三条等价与两条对偶，代价在用不用“取补”**：\n' +
        '\n' +
        '- $\\mathring{A}$ = 含于 $A$ 的开集之并 = **含于 $A$ 的最大开集**：定义展开。\n' +
        '- $A$ 开 $\\iff$ $\\mathring{A} = A$：一行（开集含于自身）。**不需要额外假设。**\n' +
        '- **对偶公式** $\\mathring{A} = X \\setminus \\overline{X \\setminus A}$：**这一步要用两次取补**，是内部与闭包之间唯一的桥；所有关于闭包的定理都能经它翻译成内部的定理。\n' +
        '- $\\mathring{(A \\cap B)} = \\mathring{A} \\cap \\mathring{B}$：**对交保号**（任意交也对，取并的 De Morgan 即得）。\n' +
        '- $\\mathring{(A \\cup B)} \\supseteq \\mathring{A} \\cup \\mathring{B}$：**对并只给包含**，可能严格变大（$A = [0,1]$、$B = [1,2]$ 在 $\\mathbb{R}$ 里，内部从 $(0,1)\\cup(1,2)$ 变成 $(0,2)$）。\n' +
        '\n' +
        '⚠️ **别把“内部”与“内点集”当两件事**：一般拓扑里「存在含于 $A$ 的开邻域的点」正好给出 $\\mathring{A}$。但「开核」与「内部」是同义词，只是译法不同。\n'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 闭集与极限点',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.t3-space',
      cluster: 'topology.separation',
      type: 'definition',
      label: 'T3 空间',
      title: 'T3：单点与闭集可以分开',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T3', '正则'],
      statement: [
        '**在做什么**：这是「点 vs 不含它的闭集」这条性质**本身** —— 注意它**不含 $T_{1}$**，所以连「单点是闭集」都不保证。',
        '',
        '拓扑空间 $X$ 叫 **$T_{3}$ 空间**，若对任意闭集 $F$ 与任意 $x \\notin F$，存在不交开集 $U, V$ 使',
        '',
        '$$x \\in U, \\qquad F \\subseteq V .$$',
        '',
        '**等价说法**（更好用）：对任意 $x$ 与它的开邻域 $W \\ni x$，存在开集 $U$ 使',
        '',
        '$$x \\in U \\subseteq \\overline{U} \\subseteq W ,$$',
        '',
        '即**每个开邻域里还夹着一个开集的闭包**。',
        '',
        '⚠️ **名字约定**：加了 $T_{1}$ 之后才叫**正则空间**。$T_{3}$ 本身推不出 $T_{1}$、也推不出 $T_{2}$。'
      ].join('\n'),
      notes: [
        '⚠️ **$T_{3}$ 推不出 $T_{1}$**（这是本图此前写错、用户当场纠正的那一点）：两个点以上的**不可分拓扑**（开集只有 $\\emptyset$ 与 $X$）满足 $T_{3}$ —— 因为唯一的闭集是 $\\emptyset$ 与 $X$，$x \\notin F$ 时只能 $F = \\emptyset$，取 $U = X$、$V = \\emptyset$ 即可。\n\n' +
        '而它的单点一般**不是**闭集，所以连 $T_{1}$ 都不是。\n\n' +
        '因此 $T_{3} \\implies T_{2}$ 是**假命题**；\n\n' +
        '要「正则空间」（$T_{3} + T_{1}$）才推得出 $T_{2}$。',
        '⭐ **等价形式「$\\overline{U} \\subseteq W$」是 $T_{3}$ 的真正用法**：它允许把开集**收缩**一点给旁边腾空间。所有「先造开覆盖、再收缩、再取有限子覆盖」的论证（紧性、仿紧性、单位分解）都靠这一手。对照 `prop.normal-locally-closed`（正规空间的同一手法）。',
        '⚠️ **$T_{3}$ 不蕴含正规**：正规要求两个**闭集**分开，比「点对闭集」强。反例是 Sorgenfrey 平面（Sorgenfrey 直线的积）：它正则但不正规 —— 拓扑学里最著名的反例之一，说明 $T_{3}$ 与 $T_{4}$ 之间**没有捷径**。',
        '⚠️ **$T_{3}$ 不等于「点与闭集之间有连续函数」** —— 那是 $T_{3.5}$（`def.t35-space`）。$T_{3}$ 只给开集，不给函数。这个落差正是 Urysohn 引理要补的（而 Urysohn 引理要**正规**，不是 $T_{3}$）。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.regular-space',
      cluster: 'topology.separation',
      type: 'definition',
      label: '正则空间',
      title: '正则空间 = $T_{3} + T_{1}$',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', '正则', 'T3'],
      statement: [
        '**在做什么**：$T_{3}$ 那条性质**再加上 $T_{1}$**。加了 $T_{1}$ 之后它才自动是 $T_{2}$ —— 这是「正则」这个名字真正的用处。',
        '',
        '拓扑空间 $X$ 叫**正则空间**（regular space），若',
        '',
        '1. $X$ 是 **$T_{3}$** 的：单点与不含它的闭集可被不交开集分开（`def.t3-space`）；',
        '2. $X$ 是 **$T_{1}$** 的：单点是闭集（`def.t1-space`）。',
        '',
        '**为什么必须加 $T_{1}$**：不可分拓扑是 $T_{3}$ 但不是 $T_{1}$、更不是 $T_{2}$。加上 $T_{1}$ 之后，$\\{y\\}$ 是闭集，于是「$x$ 与 $\\{y\\}$ 可分开」就给出两个不交开集 —— 这正是 $T_{2}$。',
        '',
        '**链的位置**：正则空间 $\\implies T_{2} \\implies T_{1} \\implies T_{0}$（反向都不成立）。'
      ].join('\n'),
      notes: [
        '⭐ **这一格是本图的口径分界线**（用户 2026-11-02 拍板）：**T-number 是裸性质，中文名才带 $T_{1}$**。\n\n所以 T3 = 单点与闭集可分离（不带 $T_{1}$），正则空间 = T3 + $T_{1}$。\n\n⚠️ Munkres 的写法相反（他把「正则」当不带 $T_{1}$、$T_{3}$ 当带 $T_{1}$）—— 读到别的书时必须先对约定，否则「$T_{3} \\implies T_{2}$」这种命题会时真时假。',
        '**正则 $\\implies$ $T_{2}$ 的一行证明**：给 $x \\ne y$，由 $T_{1}$ 知 $\\{y\\}$ 闭且 $x \\notin \\{y\\}$；由 $T_{3}$ 取不交开集 $U \\ni x$、$V \\supseteq \\{y\\}$。这正是 $T_{2}$。',
        '⚠️ **正则不蕴含正规**：Sorgenfrey 平面正则但不正规。所以「正则」不是「正规」的弱化版在同一根轴上 —— 它们分开的是**不同形状**的东西（点/闭集 vs 闭集/闭集）。',
        '⭐ 与 `thm.paracompact-hausdorff-normal` 的关系：那条定理的「第 1 步」证的就是「仿紧 Hausdorff $\\implies$ 正则」，用的正是 $T_{3}$ 的「$\\overline{U} \\subseteq W$」形式。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.t35-space',
      cluster: 'topology.separation',
      type: 'definition',
      label: 'T3.5 空间',
      title: 'T3.5：单点与闭集可由连续函数分开',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', 'T3.5', '完全正则'],
      statement: [
        '**在做什么**：把「用开集分开」升级成「用**连续函数**分开」—— 这是分离公理链里第一次请出函数，也是紧化与度量化理论的入口。同样**不含 $T_{1}$**。',
        '',
        '拓扑空间 $X$ 叫 **$T_{3.5}$ 空间**，若对任意闭集 $F$ 与任意 $x \\notin F$，存在连续函数 $f : X \\to [0, 1]$ 使',
        '',
        '$$f(x) = 0, \\qquad f|_{F} \\equiv 1 .$$',
        '',
        '⚠️ **名字约定**：加了 $T_{1}$ 之后叫**完全正则空间**（`def.completely-regular-space`，= Tychonoff 空间）。$T_{3.5}$ 本身推不出 $T_{1}$。'
      ].join('\n'),
      notes: [
        '⚠️ **$T_{3.5} \\implies T_{3}$ 只要两行**：取 $U = f^{-1}([0, 1/2))$、$V = f^{-1}((1/2, 1])$ —— 两者开（$f$ 连续）、不交、$x \\in U$、$F \\subseteq V$。\n\n所以这条蕴含**无条件**成立，与 $T_{1}$ 无关（这一点与「$T_{3} \\implies T_{2}$」不同，后者需要 $T_{1}$）。',
        '⚠️ **$T_{3.5}$ 也不推 $T_{1}$**：同一个不可分拓扑是 $T_{3.5}$ 的（取 $F = \\emptyset$ 时 $f \\equiv 1$ 即可）。所以要「完全正则空间」才推得出 $T_{2}$。',
        '⭐ **为什么这一格特别重要**：$T_{3.5}$ 恰好是「能嵌入方体 $[0,1]^{I}$」的那一档（加上 $T_{1}$ 后就是 Tychonoff 空间），所以它的紧化（Stone–Čech）研究得最透；\n\n度量化定理（Urysohn / Nagata–Smirnov / Bing）的假设里用的也是这一档 —— 因为度量空间一定完全正则。',
        '⚠️ **完全正则不等于正规**：Sorgenfrey 平面完全正则但不正规，所以 $T_{3.5}$ 严格弱于 $T_{4}$。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 完全正则空间',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.completely-regular-space',
      cluster: 'topology.separation',
      type: 'definition',
      label: '完全正则空间',
      title: '完全正则空间 = $T_{3.5} + T_{1}$（Tychonoff 空间）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '分离公理', '完全正则', 'Tychonoff', 'T3.5'],
      statement: [
        '**在做什么**：$T_{3.5}$ 再加上 $T_{1}$。这一格是「连续函数足够多」的标准口径，也是紧化与度量化理论默认的假设。',
        '',
        '拓扑空间 $X$ 叫**完全正则空间**（completely regular space），若',
        '',
        '1. $X$ 是 **$T_{3.5}$** 的：单点与不含它的闭集可由连续函数分开（`def.t35-space`）；',
        '2. $X$ 是 **$T_{1}$** 的。',
        '',
        '满足这两条的空间也叫 **Tychonoff 空间**。',
        '',
        '**等价说法**：$X$ 能嵌入某个方体 $[0,1]^{I}$（即「有足够多的连续函数把点与闭集分开」）。',
        '',
        '**链的位置**：正规空间 $\\implies$ 完全正则空间 $\\implies$ 正则空间 $\\implies T_{2}$。唯一的非平凡一步是「正规 $\\implies$ 完全正则」（Urysohn 引理 `lem.urysohn`）。'
      ].join('\n'),
      notes: [
        '⚠️ **命名口径**（用户 2026-11-02 拍板）：**T-number = 裸性质，中文名 = 裸性质 + $T_{1}$**。\n\n所以 $T_{3.5}$ 是单点与闭集可由连续函数分开（`def.t35-space`，不带 $T_{1}$），完全正则空间 = $T_{3.5} + T_{1}$。\n\n这与「$T_{3}$ vs 正则空间」同一套约定。',
        '⭐ **为什么「+ $T_{1}$」不是多余的**：不加 $T_{1}$ 时，$T_{3.5}$ 连「单点闭」都不保证，于是 $T_{2}$、极限唯一这些结论全部失效。加上 $T_{1}$ 之后，$\\{y\\}$ 闭，连续函数分离 $x$ 与 $\\{y\\}$ 立刻给出不交开集 —— 于是完全正则空间自动是 $T_{2}$。',
        '⭐ **「能嵌入方体」为什么是同一件事**：若 $X$ 完全正则，用所有连续 $f : X \\to [0,1]$ 拼出映射 $X \\to [0,1]^{I}$，$T_{1}$（点闭）+ $T_{3.5}$（点与闭集可被函数分开）恰好保证它是嵌入。反过来嵌入方体显然给足函数。这就是 Tychonoff 定理的另一半。',
        '⚠️ **Tychonoff 撞名**：`thm.tykhonov` 是**乘积紧性**定理（任意积紧空间紧），与本概念同一个人、不同贡献，别混。',
        ,
        '**各方向用到的假设**（名称按本库含 $T_1$，方体刻画是嵌入定理）：\n' +
        '- 完全正则 $\\iff$ $T_{3.5}$ 且 $T_1$：本库定义展开，免费；不是从裸 $T_{3.5}$ 推出 $T_1$。\n' +
        '- 完全正则 $\\implies$ 嵌入 $[0,1]^I$：取所有连续区间值函数的评价映射；$T_1$ 与点闭集分离保证单射，点闭集分离又保证诱导原拓扑。用积拓扑，不需乘积紧性定理。\n' +
        '- 嵌入方体 $\\implies$ 完全正则：由坐标分离、有限坐标基本邻域及完全正则性的子空间遗传性；不能仅从连续单射推出嵌入。\n' +
        '- $T_1$ 不能省：至少两点的不可分拓扑满足裸 $T_{3.5}$，但不能嵌入 Hausdorff 方体；正规 $\\implies$ 完全正则另需 Urysohn 引理。\n'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 完全正则空间',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.completely-normal-space',
      cluster: 'topology.separation',
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
        '**链的位置**：$T_{6} \\implies T_{5} \\implies T_{4}$。',
        '',
        '⚠️ 这里**不需要**再补一句「+ $T_{1}$」：正规空间的定义里已经含 $T_{1}$，子空间也继承 $T_{1}$，所以完全正规自动是 $T_{1}$ 的。'
      ].join('\n'),
      notes: [
        '⭐ **「分离集」为什么是自然的加强**：两个闭集天然是分离的（$\\overline{A} = A$，$A \\cap B = \\emptyset$ $\\implies$ $A \\cap \\overline{B} \\subseteq A \\cap B = \\emptyset$）。\n\n所以分离集比闭集对**宽**，要求能分开更宽的一类集合，等价于要求更强的空间。\n\n这条判据把「遗传」这个绕口的定义换成了可操作的集合条件。',
        '⚠️ **正规不遗传，是 $T_{5}$ 存在的唯一理由**：经典例子是 Tychonoff plank，或 Sorgenfrey 平面的变体 —— 正规空间的子空间可能不正规。所以 $T_{5}$ 不是「把 $T_{4}$ 换个写法」，而是真的加了一条。',
        '⚠️ **度量化空间都是 $T_{5}$**：距离空间的所有子空间都是距离空间、都正规。这也是为什么在分析里很少需要 $T_{5}$ —— 它自动成立（更强的是 $T_{6}$，见 `def.perfectly-normal-space`）。'
      ].join('\n\n'),
      refs: [
        'Munkres, Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.perfectly-normal-space',
      cluster: 'topology.separation',
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
        '⭐ **为什么「每个闭集都可数交开集」值得单列**：它保证存在**连续函数把闭集精确地写成零点集**（$F = f^{-1}(0)$），而不只是「$f$ 在 $F$ 上为 0」。这一条在无穷维分析里很关键（$C^{*}$-代数里的 $G_{\\delta}$ 点、Baire 纲定理的加强版）。',
        '⚠️ **度量空间都是完美正规**：$d(x, F)$ 连续，$F = \\{\\, x : d(x, F) = 0 \\,\\}$，而 $\\{\\, x : d(x,F) < 1/n \\,\\}$ 是一列开集 —— 于是闭集 = 可数交开集 ✓。所以 $T_{6}$ 在分析里几乎总是自动成立，在一般拓扑里才是真条件。',
        '⚠️ **$T_{6} \\implies T_{5}$ 不是白给的**：要用「可数交开集」把分离集分开（可数交的构造给出一列连续函数，拼起来做分离）。本图只记链的方向与骨架。',
        '⚠️ **约定**：完美正规的定义已经含正规，所以自动含 $T_{1}$，不需要再补 $T_{1}$。',
        ,
        '**各方向用到的假设**（取补等价免费，零点集刻画需要正规性）：\n' +
        '- 完美正规 $\\iff$ 正规且每个闭集是 $G_\\delta$：本库定义展开，正规已含 $T_1$。\n' +
        '- 每个闭集为 $G_\\delta$ $\\iff$ 每个开集为 $F_\\sigma$：De Morgan 律取补，无需分离公理；用它刻画完美正规时两边仍须保留正规性。\n' +
        '- 正规且闭集 $F$ 为 $G_\\delta$ $\\implies$ $F$ 为连续函数零点集：对表示 $F=\\bigcap_n U_n$ 用 Urysohn 引理分离 $F$ 与 $X\\setminus U_n$，再以 $2^{-n}$ 加权作一致收敛级数；反向由连续函数取逆像直接得到。\n' +
        '- 正规性不能靠“闭集都是 $G_\\delta$”代替：Sierpinski 两点空间每个闭集都是开集，仍不满足本库要求的 $T_1$；正规也不自动完美正规，$[0,\\omega_1]$ 的末点单集不是 $G_\\delta$。\n'
      ].join('\n\n'),
      refs: [
        'Engelking, General Topology（⚠️ 章节未核实，只记书名）· 分离公理',
        'Munkres, Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

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

    { id: 'dep.int-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.interior',
      note: '内部是闭包的对偶（$\\mathring{A} = X \\setminus \\overline{X \\setminus A}$），必须先有闭包。' },
    { id: 'dep.int-top', kind: 'definition',
      definition: 'def.topology', usedBy: 'def.interior',
      note: '「含于 $A$ 的开集之并」直接用开集。' },

    { id: 'dep.t3-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.t3-space',
      note: '分离的对象是「单点与闭集」。' },
    { id: 'dep.t3-int', kind: 'definition',
      definition: 'def.interior', usedBy: 'def.t3-space',
      note: '等价形式 $x \\in U \\subseteq \\overline{U} \\subseteq W$ 用的是邻域与闭包。' },

    { id: 'dep.reg-t3', kind: 'definition',
      definition: 'def.t3-space', usedBy: 'def.regular-space',
      note: '正则空间 = $T_3$ + $T_1$：第一条就是 $T_3$ 那条性质。' },
    { id: 'dep.reg-t1', kind: 'definition',
      definition: 'def.t1-space', usedBy: 'def.regular-space',
      note: '第二条是 $T_1$ —— 缺了它就推不出 $T_2$。' },

    { id: 'dep.t35-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.t35-space',
      note: '函数分离的对象是「单点与闭集」。' },
    { id: 'dep.t35-cont', kind: 'definition',
      definition: 'def.continuous-map', usedBy: 'def.t35-space',
      note: '定义的核心就是「存在连续函数」。' },

    { id: 'dep.cr-t35', kind: 'definition',
      definition: 'def.t35-space', usedBy: 'def.completely-regular-space',
      note: '完全正则空间 = $T_{3.5}$ + $T_1$：第一条就是函数分离那条性质。' },
    { id: 'dep.cr-t1', kind: 'definition',
      definition: 'def.t1-space', usedBy: 'def.completely-regular-space',
      note: '第二条是 $T_1$，它保证单点闭、从而推出 $T_2$。' },

    { id: 'dep.cn-sub', kind: 'definition',
      definition: 'def.subspace-topology', usedBy: 'def.completely-normal-space',
      note: '「遗传」的对象是子空间拓扑。' },
    { id: 'dep.cn-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.completely-normal-space',
      note: '分离集的判据用闭包写：$\\overline{A} \\cap B = A \\cap \\overline{B} = \\emptyset$。' },

    { id: 'dep.pn-int', kind: 'definition',
      definition: 'def.interior', usedBy: 'def.perfectly-normal-space',
      note: '$G_\\delta$ / $F_\\sigma$ 的说法要与开闭集、内部的对偶语言配套。' },


    /* ------------------------------------------------------------------
       链上的蕴含（用户要求「平凡蕴含也画上」，且「真的有蕴含的才画」）
       ⚠️ 每条 sources 都只写**假设**，不写中间用到的定理
          （定理写在 proof 正文里），这样层号才反映「靠什么前提」。
       ------------------------------------------------------------------ */
    {
      id: 'imp.t1-t0',
      kind: 'implication',
      sources: ['def.t1-space'],
      target: 'def.t0-space',
      proof: [
        '设 $x \\ne y \\in X$。由 $T_{1}$，单点集 $\\{y\\}$ 是**闭集**，于是 $U := X \\setminus \\{y\\}$ 是**开集**，且 $x \\in U$、$y \\notin U$。',
        '',
        '这正是 $T_{0}$ 要求的「存在开集恰好只含其中一个点」✓。∎',
        '',
        '⭐ 这条几乎不需要证明 —— 它说明 $T_{1}$ 比 $T_{0}$ 多的那点内容是「每个点都能被自己单独关进闭集」。'
      ].join('\n')
    },
    {
      id: 'imp.t2-t1',
      kind: 'implication',
      sources: ['def.hausdorff'],
      target: 'def.t1-space',
      proof: [
        '要证每个单点集闭，即证其补 $X \\setminus \\{y\\}$ 开。对每个 $x \\ne y$，由 $T_{2}$ 有不交开集 $U_{x} \\ni x$、$V_{x} \\ni y$；由不交性 $U_{x} \\subseteq X \\setminus \\{y\\}$。于是',
        '',
        '$$X \\setminus \\{y\\} = \\bigcup_{x \\ne y} U_{x}$$',
        '',
        '是一族开集之并 = 开集 ✓。所以每个单点集闭，即 $T_{1}$。∎',
        '',
        '⚠️ **反向不成立**：余有限拓扑 $T_{1}$ 但不 $T_{2}$（任意两个非空开集必相交）。'
      ].join('\n')
    },
    {
      id: 'imp.regular-hausdorff',
      kind: 'implication',
      layer: false,
      title: '正则空间推出 Hausdorff（$T_2$）',
      sources: ['def.regular-space'],
      target: 'def.hausdorff',
      proof: [
        '设 $x \\ne y$。\n\n由 $T_{1}$（正则空间的第二条），$\\{y\\}$ 是**闭集**，且 $x \\notin \\{y\\}$。\n\n由 $T_{3}$（第一条），存在不交开集 $U \\ni x$、$V \\supseteq \\{y\\}$。\n\n于是 $U \\ni x$、$V \\ni y$ 不交 —— 这正是 $T_{2}$ ✓。\n\n∎',
        '',
        '⛔ **裸 $T_{3}$ 推不出这一步**：不可分拓扑是 $T_{3}$ 但不是 $T_{1}$、也不是 $T_{2}$。所以这条蕴含必须带上 $T_{1}$ —— 而 $T_{1}$ 正是「正则空间」定义的一部分。',
        '⭐ 标成**推论边**（不参与分层）是因为：$T_{1}$ 既是正则空间定义的一部分（definition 边 $T_{1} \\to$ 正则），又是这条蕴含的结论（$T_{2} \\implies T_{1}$）。若让它参与分层会与定义边**成环**，所以按「推论」处理。'
      ].join('\n')
    },
    {
      id: 'imp.t35-t3',
      kind: 'implication',
      sources: ['def.t35-space'],
      target: 'def.t3-space',
      proof: [
        '设 $F$ 闭、$x \\notin F$。由 $T_{3.5}$ 取连续 $f : X \\to [0,1]$ 使 $f(x) = 0$、$f|_{F} \\equiv 1$。令',
        '',
        '$$U := f^{-1}\\bigl([0, 1/2)\\bigr), \\qquad V := f^{-1}\\bigl((1/2, 1]\\bigr) .$$',
        '',
        '两者都是开集（$f$ 连续、两个目标集在 $[0,1]$ 中开）、不交、$x \\in U$、$F \\subseteq V$ —— 这正是 $T_{3}$ ✓。∎',
        '',
        '⭐ 这条是**无条件**的（不需要 $T_{1}$），与「$T_{3} \\implies T_{2}$」形成对照 —— 后者才需要 $T_{1}$。'
      ].join('\n')
    },
    {
      id: 'imp.cr-regular',
      kind: 'implication',
      sources: ['def.completely-regular-space'],
      target: 'def.regular-space',
      proof: [
        '完全正则空间 = $T_{3.5} + T_{1}$；正则空间 = $T_{3} + T_{1}$。两条 $T_{1}$ 直接对上，剩下要证 $T_{3.5} \\implies T_{3}$ —— 见 `imp.t35-t3`（取 $f^{-1}([0,1/2))$ 与 $f^{-1}((1/2,1])$）。∎'
      ].join('\n')
    },
    {
      id: 'imp.normal-completely-regular',
      kind: 'implication',
      sources: ['def.normal-space'],
      target: 'def.completely-regular-space',
      proof: [
        '正规空间的定义里已含 $T_{1}$，所以只需证 $T_{3.5}$ 那一半。',
        '',
        '设 $F \\subseteq X$ 闭、$x \\notin F$。由 $T_{1}$，$\\{x\\}$ 是闭集，于是 $F$ 与 $\\{x\\}$ 是两个**不交闭集**。由 Urysohn 引理存在连续 $f : X \\to [0,1]$ 使',
        '',
        '$$f|_{F} \\equiv 0, \\qquad f(x) = 1 .$$',
        '',
        '对任意闭集 $F$ 与 $x \\notin F$ 都有这样的 $f$，即 $X$ 是 $T_{3.5}$；又已知 $T_{1}$，故完全正则 ✓。∎',
        '',
        '⛔ **方向不能反**：这里用的是**正规**，不是正则。$T_{3}$ 只给不交开集、不给连续函数，所以「正则 $\\implies$ 完全正则」是**假**的（Sorgenfrey 平面正是这种例子：它正则、完全正则，但存在正则而不完全正则的空间）。'
      ].join('\n')
    },
    {
      id: 'imp.cn-normal',
      kind: 'implication',
      sources: ['def.completely-normal-space'],
      target: 'def.normal-space',
      proof: [
        '$X$ 本身是 $X$ 的一个子空间（取子空间拓扑时 $X$ 的开集族不变）。完全正规要求**每个**子空间都正规，取 $X$ 自己即得 $X$ 正规 ✓。∎',
        '',
        '⚠️ **反向不成立**（这正是 $T_{5}$ 存在的理由）：正规空间的子空间未必正规，经典反例是 Tychonoff plank。'
      ].join('\n')
    },
    {
      id: 'imp.pn-cn',
      kind: 'implication',
      sources: ['def.perfectly-normal-space'],
      target: 'def.completely-normal-space',
      proof: [
        '**骨架**：完美正规是**遗传**的 —— 若 $X$ 完美正规、$H \\subseteq X$ 是子空间，则 $H$ 也完美正规：$H$ 正规（这一步要用「每个闭集是 $G_{\\delta}$」把闭集写成可数交开集，再逐项与 $H$ 取交构造分离开集，是本条真正的技术核心）；\n\n且 $F$ 在 $X$ 中是 $G_{\\delta}$ 时 $F \\cap H$ 在 $H$ 中是 $G_{\\delta}$（把每一个开集与 $H$ 取交即可）。',
        '',
        '于是每个子空间 $H$ 都正规，即 $X$ 完全正规 ✓。∎',
        '',
        '⚠️ 本条只给骨架：完整证明属一般拓扑的标准练习（「完美正规 $\\implies$ 遗传正规」）。'
      ].join('\n')
    },
    {
      id: 'imp.metric-pn',
      kind: 'implication',
      sources: ['def.metric-space'],
      target: 'def.perfectly-normal-space',
      proof: [
        '设 $(X, d)$ 是距离空间，$F \\subseteq X$ 闭。记 $d(x, F) := \\inf_{y \\in F} d(x, y)$（对空集约定 $+\\infty$）。',
        '',
        '**① 每个闭集是 $G_{\\delta}$**：',
        '',
        '$$F = \\bigcap_{n \\ge 1}\\Bigl\\{\\, x : d(x, F) < \\tfrac{1}{n} \\,\\Bigr\\} ,$$',
        '',
        '右边每一项是开集（$d(\\cdot, F)$ 是连续函数），所以 $F$ 是可数交开集 ✓。（$x \\in F \\iff d(x,F) = 0$ 用的是 $F$ 闭。）',
        '',
        '**② 正规**：给不交闭集 $A, B$，令',
        '',
        '$$f(x) := \\frac{d(x, A)}{d(x, A) + d(x, B)} ,$$',
        '',
        '分母恒不为零（$A \\cap B = \\emptyset$ 且 $A, B$ 闭 $\\implies$ 不可能同时 $d(x,A) = d(x,B) = 0$），$f$ 连续，$f|_{A} \\equiv 0$、$f|_{B} \\equiv 1$。\n\n取 $U = f^{-1}([0, 1/2))$、$V = f^{-1}((1/2, 1])$ 即不交开集 ✓。',
        '',
        '于是 $X$ 正规且每个闭集 $G_{\\delta}$，即完美正规 ✓。∎',
        '',
        '⭐ 顺带：**子空间仍是距离空间**（限制度量），所以距离空间其实直接是 $T_{5}$、$T_{6}$ —— 这正是分析里从不操心分离公理的原因。'
      ].join('\n')
    },
    {
      id: 'imp.lch-cr',
      kind: 'implication',
      sources: ['def.locally-compact'],
      target: 'def.completely-regular-space',
      proof: [
        '局部紧 Hausdorff 空间已含 $T_{1}$，只需证 $T_{3.5}$。',
        '',
        '设 $F$ 闭、$x \\notin F$。\n\n因 $X \\setminus F$ 是 $x$ 的开邻域、且 $x$ 有紧邻域，可取**紧邻域** $K \\ni x$ 使 $K \\subseteq X \\setminus F$（把原来的紧邻域与 $X \\setminus F$ 取交，紧集的闭子集仍紧）。\n\n于是 $K \\cap F = \\emptyset$。',
        '',
        '记 $\\partial K := K \\setminus \\mathring{K}$（紧集，闭）。\n\n$x \\in \\mathring{K}$ 故 $x \\notin \\partial K$。\n\n$K$ 作为紧 Hausdorff 空间是**正规**的（紧 $\\implies$ 仿紧 $\\implies$（加 Hausdorff）正规，见 `thm.paracompact-hausdorff-normal`），于是由 Urysohn 引理存在连续 $h : K \\to [0,1]$ 使',
        '',
        '$$h(x) = 0, \\qquad h|_{\\partial K} \\equiv 1 .$$',
        '',
        '定义 $f : X \\to [0,1]$ 为：$f = h$ 在 $K$ 上，$f \\equiv 1$ 在 $X \\setminus \\mathring{K}$ 上。\n\n两片在重叠处 $\\partial K$ 都是 $1$，故 $f$ 良定义且连续（闭覆盖引理）。\n\n又 $F \\cap K = \\emptyset$ $\\implies$ $F \\subseteq X \\setminus \\mathring{K}$ $\\implies$ $f|_{F} \\equiv 1$，而 $f(x) = 0$。',
        '',
        '所以 $X$ 是 $T_{3.5}$，加上 $T_{1}$ 得完全正则 ✓。∎',
        '',
        '⭐ 这条是**一点紧化**理论的前置：局部紧 Hausdorff 的一点紧化是紧 Hausdorff，其上的函数全靠这条从 $X$ 上「拉回来」。'
      ].join('\n')
    }
  ]
});
