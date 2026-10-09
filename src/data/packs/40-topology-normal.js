/* ==========================================================================
   内容包 · 正规空间与 Urysohn 引理（2 条）
   --------------------------------------------------------------------------
    §2.1。分离公理那一层原来只有 Hausdorff，缺了「正规」这一级；
   而 Urysohn 引理正是「正规 ⇒ 有足够多连续函数」的那条命脉 ——
   后面 Tietze 扩张定理、以及凝聚态上同调里「实 Banach 空间在紧 Hausdorff
   空间上零调」都要往回用它。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '正规空间与 Urysohn 引理',
  nodes: [

    {
      id: 'def.normal-space',
      cluster: 'topology.general',
      type: 'definition',
      label: '正规空间',
      title: '正规空间（Normal Space）',
      regions: ['topology'],
      tags: ['拓扑', '分离公理', '正规', '闭集'],
      statement: [
        '拓扑空间 $X$ 叫**正规的**，如果它是 $T_{1}$ 的，并且任意两个**不交闭集** $A, B$ 都能被开集分开：存在开集 $U \\supseteq A$、$V \\supseteq B$ 使 $U \\cap V = \\emptyset$。',
        '',
        '把「不交闭集」换成「一点与不含该点的闭集」，得到的是**正则**空间；再换成「两点」，得到的就是 **Hausdorff**。'
      ].join('\n'),
      notes: [
        '**分离公理的层级**（都是往上加强）：',
        '',
        [
          '- $T_{1}$：单点是闭集；',
          '- Hausdorff：两点可被开集分开；',
          '- 正则：点与不含它的闭集可分开 $\\implies$ Hausdorff；',
          '- **正规**：两个不交闭集可分开 $\\implies$ 正则。',
        ].join('\n'),
        '',
        '**紧 Hausdorff $\\implies$ 正规**（这是紧性最常用的一个推论：两个不交闭集在紧空间里能被有限多个开集对分开）。所以 $[0,1]$、$\\beta I$ 这些空间都是正规的 —— 于是 Urysohn 引理在那里永远能用。',
        '⚠️ **正规性不是遗传的**：正规空间的子空间未必正规。这一点与「紧」「Hausdorff」都不同。'
      ].join('\n\n')
    },

    {
      id: 'lem.urysohn',
      cluster: 'topology.general',
      type: 'lemma',
      label: 'Urysohn 引理',
      title: 'Urysohn 引理',
      regions: ['topology'],
      tags: ['拓扑', '正规', '连续函数', 'Urysohn'],
      statement: [
        '设 $X$ 是拓扑空间。则 $X$ **正规** $\\iff$ 对任意两个不交闭集 $A, B \\subseteq X$，存在连续函数',
        '',
        '$$f : X \\longrightarrow [0, 1], \\qquad f|_{A} \\equiv 0, \\qquad f|_{B} \\equiv 1.$$'
      ].join('\n'),
      notes: [
        '⭐ **它的意义是：正规性 = 「连续函数足够多」。** 光是「闭集能被开集分开」还是纯拓扑的说法；Urysohn 引理把它换成了**一个函数** —— 从此可以拿实数来量拓扑，分析才接得上。',
        '**证明的走法（「二分法」造 $f$）。** 先在两个闭集之间造一列开集：对每个二进有理数 $q \\in [0,1]$ 给一个开集 $U_{q}$，使',
        '',
        '$$A \\subseteq U_{q} \\subseteq \\overline{U_{q}} \\subseteq U_{q\'} \\quad (q < q\'),$$',
        '',
        '这一步只用正规性（每一步都是「不交闭集被开集分开」）。然后令',
        '',
        '$$f(x) := \\inf\\{\\, q : x \\in U_{q} \\,\\}$$',
        '',
        '（$x \\notin$ 任何 $U_{q}$ 时取 $1$）。由那列开集的**单调夹逼**可以验证 $f$ 连续，且 $f|_{A} = 0$、$f|_{B} = 1$。反方向是直接的：$f^{-1}[0, 1/2)$ 与 $f^{-1}(1/2, 1]$ 就是分开 $A, B$ 的开集。∎',
        '**用途**：它是 **Tietze 扩张定理**（把闭子集上的连续实函数扩到整个空间）的前置，而 Tietze 又是「实 Banach 空间在紧 Hausdorff 空间上零调」那条的引擎 —— 那条链最终通到凝聚态上同调。'
      ].join('\n\n')
    }
  ],

  edges: []
});
