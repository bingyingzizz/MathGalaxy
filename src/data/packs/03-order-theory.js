/* ==========================================================================
   内容包 · 序理论定义
   （佐恩引理、Hausdorff 极大原理、Tukey 引理、良序定理在 04 包里）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '序理论基本定义',
  nodes: [

    {
      id: 'def.poset',
      cluster: 'order.structure',
      type: 'definition',
      label: '偏序集',
      title: '偏序集 / 全序集（Partially Ordered Set）',
      regions: ['order-theory'],
      tags: ['定义', '序'],
      statement: [
        '设 $\\preceq$ 是集合 $A$ 上的二元关系。$\\preceq$ 是 **$A$ 上的偏序**，当且仅当：',
        '',
        '- **自反**：$\\forall x \\in A, x \\preceq x$；',
        '- **反对称**：$\\forall x, y \\in A ( x \\preceq y \\wedge y \\preceq x \\to x = y )$；',
        '- **传递**：$\\forall x, y, z \\in A ( x \\preceq y \\wedge y \\preceq z \\to x \\preceq z )$。',
        '',
        '若还满足 **可比性** $\\forall x, y \\in A ( x \\preceq y \\vee y \\preceq x )$，则 $\\preceq$ 称为 **$A$ 上的全序**（线性序），$(A, \\preceq )$ 称为全序集。',
        '',
        '称 $(A, \\preceq )$ 为**偏序集**。由 $\\preceq$ 定义**严格序**：$x \\prec y :\\iff x \\preceq y \\wedge  x \\ne y$'
      ].join('\n'),
      notes: [
        '典型例子：$\\langle \\mathcal{P}(S), \\subseteq \\rangle$ 是偏序集但不是全序集；$\\langle \\mathbb{R}, \\le \\rangle$ 是全序集。',
        '反对称性是说：只允许「相等」这一种互相 $\\le$ 的方式，所以偏序可以看成「$\\le$ 的抽象」。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.11', 'Davey & Priestley, Introduction to Lattices and Order']
    },

    {
      id: 'def.chain',
      cluster: 'order.structure',
      type: 'definition',
      label: '链',
      title: '链 / 反链（Chain / Antichain）',
      regions: ['order-theory'],
      tags: ['定义', '链'],
      statement: [
        '设 $(P, \\preceq )$ 是偏序集，$C \\subseteq P$。',
        '',
        '**$C$ 是链**（也叫全序子集），当且仅当 $C$ 中任意两个元素都可比：',
        '',
        '$$\\forall x, y \\in C ( x \\preceq y \\vee  y \\preceq x )$$',
        '',
        '**$C$ 是反链**，当且仅当 $C$ 中任意两个不同元素都不可比。',
        '',
        '约定：$\\emptyset$ 与单点集都算链。'
      ].join('\n'),
      notes: '「链」这个词是佐恩引理、Hausdorff 极大原理的中心概念——它们说的都是「链能长到多大」。',
      refs: ['Kunen, Set Theory, I.11']
    },

    {
      id: 'def.bound',
      cluster: 'order.structure',
      type: 'definition',
      label: '界与确界',
      title: '上界 / 下界 / 确界 / 极大元（Bounds, Suprema & Extremal Elements）',
      regions: ['order-theory'],
      tags: ['定义', '上界', '下界', '上确界', '极大元'],
      statement: [
        '设 $(P, \\preceq )$ 是偏序集，$S \\subseteq P$，$u, l, m \\in P$。',
        '',
        '- **$u$ 是 $S$ 的上界**：$\\forall s \\in S, s \\preceq u$。',
        '- **$l$ 是 $S$ 的下界**：$\\forall s \\in S, l \\preceq s$。',
        '- **$u$ 是 $S$ 的上确界**（记 $\\sup S$）：$u$ 是上界，且 $u \\preceq$ 每一个上界 —— 即**最小**的上界。',
        '- **$l$ 是 $S$ 的下确界**（记 $\\inf S$）：$l$ 是下界，且每一个下界 $\\preceq l$ —— 即**最大**的下界。',
        '- **$m$ 是 $P$ 的极大元**：$\\forall x \\in P ( m \\preceq x \\to x = m )$，即没有比 $m$ 更大的元素。',
        '- **$m$ 是 $P$ 的最大元**：$\\forall x \\in P, x \\preceq m$，即 $m$ 比所有元素都大。',
        '',
        '把 $\\preceq$ 换成 $\\succeq$，前四条里的「上 / 大 / 极大」就变成「下 / 小 / 极小」。',
        '',
        '⚠ **极大元 $\\ne$ 最大元**；**$\\sup S$ 不必属于 $S$**（$\\sup (0, 1) = 1$）—— 这是两组容易混的东西。',
        '',
        '偏序集里一般不保证 $\\sup$ 存在；$\\mathbb{R}$ 的特别之处正是**保证它存在**，那就是**确界原理**（见「$\\mathbb{R}$ 是完备有序域」）。'
      ].join('\n'),
      notes: [
        '例子：$P = \\{ \\{1\\}, \\{2\\} \\}$ 按 $\\subseteq$ 排序。两个元素都是极大元（谁也包不住谁），但没有最大元。',
        '在**全序**集里两者才重合。偏序集里「极大」只要求「上面没有别人」，不要求「下面有所有人」。',
        '佐恩引理保证的是极大元，而不是最大元——这一点在应用时最容易出错。',
        '在 $\\mathbb{R}$ 上 $u = \\sup S$ 有一个只用序的等价说法：$\\forall \\varepsilon > 0, \\exists s \\in S : s > u - \\varepsilon$（任意近地逼近，但不必取到）。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.11', 'Rudin, Principles of Mathematical Analysis, Ch. 1']
    },

    {
      id: 'def.wellorder',
      cluster: 'order.structure',
      type: 'definition',
      label: '良序集',
      title: '良序集（Well-Ordered Set）',
      regions: ['order-theory'],
      tags: ['定义', '良序', '超限归纳'],
      statement: [
        '全序集 $(W, \\preceq )$ 是**良序的**，当且仅当 $W$ 的每个非空子集都有最小元：',
        '',
        '$$\\forall S \\subseteq W ( S \\ne \\emptyset \\to \\exists m \\in S, \\forall s \\in S, m \\preceq s )$$',
        '',
        '等价于：不存在无穷严格递减链 $w_{0} \\succ w_{1} \\succ w_{2} \\succ \\cdots$。'
      ].join('\n'),
      notes: '⭐ **良序的用处只有一个：让「下一步」有定义。** 每一步之前的部分有头有尾，于是可以做**超限归纳**（证明）与**超限递归**（构造）—— 见「良序集上的递归定理」。\n\n⭐ 每个良序集都**序同构于唯一的一个序数**（见「良序集的序型」），那个序数就是它的「长度」。于是「两个良序集谁更长」变成「两个序数谁大」，而序数的大小就是 $\\in$。\n\n$\\langle \\mathbb{N}, \\le \\rangle$ 是良序的；$\\langle \\mathbb{Z}, \\le \\rangle$、$\\langle \\mathbb{R}, \\le \\rangle$ 不是（$\\mathbb{R}$ 的某些非空子集没有最小元）。',
      refs: ['Kunen, Set Theory, I.11']
    },

    {
      id: 'def.finchar',
      cluster: 'order.structure',
      type: 'definition',
      label: '有限特征',
      title: '有限特征族（Family of Finite Character）',
      regions: ['order-theory'],
      tags: ['定义', '有限特征', 'Tukey'],
      statement: [
        '集合族 $\\mathcal{A}$ 具有**有限特征**，当且仅当对任意集合 $X$：',
        '',
        '$$X \\in \\mathcal{A} \\iff X\\text{ 的每个有限子集都属于} \\mathcal{A}$$',
        '',
        '也就是说：「局部地看起来像 $\\mathcal{A}$ 的成员」$\\implies$「整体就是 $\\mathcal{A}$ 的成员」。'
      ].join('\n'),
      notes: [
        '典型例子：',
        '- 偏序集 $P$ 的**链族**（$X$ 是链 $\\iff X$ 的每个二元子集可比）；',
        '- 向量空间的**线性无关子集族**；',
        '- 某个滤子之上的**滤子族**。',
        '',
        '有限特征是 Tukey 引理的用武之地：只要目标族具有有限特征，极大元就自动存在（在 AC 之下）。'
      ].join('\n\n'),
      refs: ['Jech, The Axiom of Choice, Ch. 2']
    }
  ],

  edges: []
});
