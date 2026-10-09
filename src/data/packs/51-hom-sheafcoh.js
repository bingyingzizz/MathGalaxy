/* ==========================================================================
   内容包 · 层上同调与拓扑斯的态射（11 条）
   --------------------------------------------------------------------------
    §7.3 + §7.4。这一团造出的东西是：**把 §7.2 那台机器开到层上**。

   $H^{n}(X, M) := R^{n}\Gamma(X, M)$ —— 层上同调就是截面函子的右导出函子。
   另一条算法是 **Čech 上同调**（用覆盖直接算）；两条在紧 Hausdorff 上一致。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '层上同调与拓扑斯的态射',
  nodes: [

    {
      id: 'def.sheaf-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: '层上同调',
      title: '层上同调 $H^{n}(X, M^{\\bullet})$',
      regions: ['homology', 'category'],
      tags: ['同调代数', '层上同调', '导出函子', '截面函子'],
      statement: [
        '设 $M^{\\bullet}$ 是 site $\\mathcal{C}$ 上的**阿贝尔层复形**，$X \\in \\mathcal{C}$。它在 $X$ 上的**第 $n$ 个上同调群**是',
        '',
        '$$H^{n}(X, M^{\\bullet}) := R^{n}\\Gamma(X, M^{\\bullet}),$$',
        '',
        '其中 $\\Gamma(X, -)$ 是 $X$ 处的**截面函子**。'
      ].join('\n'),
      notes: [
        '⭐ **一句话**：层上同调就是**截面函子的右导出函子**。$\\Gamma(X,-)$ 左正合但不右正合（层化会捣乱），$R^{n}\\Gamma$ 正是补上断口的那半个。',
        '**为什么需要它**：单看 $H^{0}(X, M) = \\Gamma(X, M) = M(X)$ 只有整体截面；$H^{1}$ 起才开始记录「层粘不上去」的信息（$H^{1}$ 分类层的主丛 / torsor）。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.3.1'],
    },

    {
      id: 'def.cech-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: 'Čech 上同调',
      title: 'Čech 上同调 $\\check{H}^{n}(X, M^{\\bullet})$',
      regions: ['homology', 'category'],
      tags: ['同调代数', 'Čech 上同调', '预层', '覆盖'],
      statement: [
        '设 $M^{\\bullet}$ 是 site $\\mathcal{C}$ 上的**阿贝尔预层复形**，$X \\in \\mathcal{C}$。它的第 $n$ 个 **Čech 上同调群**是',
        '',
        '$$\\check{H}^{n}(X, M^{\\bullet}) := \\Gamma\\bigl(X,\\ \\check{H}^{n}(M^{\\bullet})\\bigr).$$'
      ].join('\n'),
      notes: [
        '**与层上同调的区别**：层上同调要**先取内射消解**（贵）；Čech 上同调**直接用覆盖算**（便宜），代价是它一般只是「逼近」。',
        '**为什么叫 Čech**：它照着 Čech 那套「用开覆盖的交叠来算整体信息」的直觉造出来的 —— 覆盖的每一层交叠给一个群，交叠的包含关系给微分，取同调就是 Čech 上同调。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.3.5'],
    },

    {
      id: 'prop.cech-as-colim',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: 'Čech 上同调是沿覆盖筛的余极限',
      title: '$\\check{H}^{n}(X, M) = \\varinjlim_{R \\in J(X)} H^{n}(R, M)$',
      regions: ['homology'],
      tags: ['同调代数', 'Čech 上同调', '覆盖筛', '余极限'],
      statement: '若 $X \\in \\mathcal{C}$、$M$ 是阿贝尔预层，则 $\\check{H}^{n}(X, M) = \\varinjlim_{R \\in J(X)} H^{n}(R, M)$（沿 $X$ 上所有覆盖筛 $R$ 取滤过余极限）。'
    },

    {
      id: 'thm.cartan-leray',
      cluster: 'hom.sheafcoh',
      type: 'theorem',
      label: 'Cartan–Leray 谱序列',
      title: 'Cartan–Leray：Čech 到层上同调的谱序列',
      regions: ['homology'],
      tags: ['同调代数', 'Cartan', 'Leray', '谱序列', 'Čech'],
      statement: [
        '若 $\\mathfrak{X}$ 是 $X$ 的一个**覆盖**、$M$ 是阿贝尔层，则存在谱序列',
        '',
        '$$E^{p,q}_{2} := \\check{H}^{p}\\bigl(\\mathfrak{X},\\ H^{q}(M)\\bigr) \\;\\Longrightarrow\\; H^{p+q}(X, M).$$'
      ].join('\n'),
      notes: [
        '⭐ **它说的是**：Čech 上同调（右边那个 $\\check{H}^{p}$）用 $H^{q}(M)$ 当系数，收敛到**真正的**层上同调。于是「便宜的算法」怎么逼近「贵的算法」这件事被讲清楚了。',
        '**推论**（Cor 7.3.7）：若覆盖的每一层上 $H^{q} = 0$（$q \\ne 0$），则 $\\check{H}^{n} \\cong H^{n}$ —— 此时 Čech 直接给出层上同调。',
        '**证明走法**：取 $\\mathfrak{X}$ 生成的筛 $R$，则 $\\Gamma(\\mathfrak{X}, M) = \\Gamma(R, \\mathcal{H}(M))$；$\\mathcal{H}$ 保内射，于是由 Grothendieck 谱序列 + 上一条得到。',
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 7.3.6'],
    },

    {
      id: 'def.acyclic-sheaf',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: '无环层',
      title: '无环层（Acyclic Sheaf）',
      regions: ['homology'],
      tags: ['同调代数', '无环层', '层上同调'],
      statement: 'site $\\mathcal{C}$ 上的阿贝尔层 $M$ 叫**无环的**，如果 $H^{n}(M) = 0$ 对一切 $n \\ne 0$。',
      notes: '⚠️ 专门提醒：**这个定义依赖 site $\\mathcal{C}$，不只是依赖拓扑斯 $\\widetilde{\\mathcal{C}}$** —— 换个 site（同一拓扑斯）无环性可能变。这一点和「层的概念只依赖拓扑斯」形成对比。\n\n📌  **Definition 7.3.9**。'
    },

    {
      id: 'prop.acyclic-iff-cech',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '无环 ⟺ Čech 上同调为零',
      title: '$M$ 无环 $\\iff \\check{H}^{n}(M) = 0$（$n \\ne 0$）',
      regions: ['homology'],
      tags: ['同调代数', '无环层', 'Čech 上同调'],
      statement: '$\\mathcal{C}$ 上的阿贝尔层 $M$ **无环** $\\iff \\check{H}^{n}(M) = 0$ 对一切 $n \\ne 0$。'
    },

    {
      id: 'prop.chaus-cech-eq-h',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '紧 Hausdorff 上 Čech 就是上同调',
      title: '紧 Hausdorff：$\\check{H}^{n}(X, M) = H^{n}(X, M)$',
      regions: ['homology', 'topology'],
      tags: ['同调代数', 'Čech 上同调', '紧 Hausdorff', '层上同调'],
      statement: '若 $X$ 是**紧 Hausdorff** 空间，则 $\\check{H}^{n}(X, M) = H^{n}(X, M)$（对一切阿贝尔层 $M$）。'
    },

    {
      id: 'prop.filtered-limit-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '滤过极限的上同调',
      title: '紧 Hausdorff 的滤过极限上，常值系数的上同调是余极限',
      regions: ['homology', 'topology'],
      tags: ['同调代数', '滤过极限', '常值系数', '上同调'],
      statement: '若 $X = \\varprojlim_{i \\in I} X_{i}$ 是紧 Hausdorff 空间的**滤过极限**、$M$ 是**常值**阿贝尔群，则',
      notes: '$$H^{n}(X, M) = \\varinjlim_{i \\in I} H^{n}(X_{i}, M).$$\n\n⚠️ 注意方向：**极限** $X = \\varprojlim X_{i}$ 在拓扑这一侧，而它上面的**上同调**却成了**余极限** —— 上同调把方向翻过来。这条是「用有限块逼近整体，再取上同调」的合法性来源。\n\n📌  **Proposition 7.3.12**。'
    },

    {
      id: 'prop.stone-acyclic',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: 'Stone 空间上的上同调为零',
      title: 'Stone 空间：$H^{n}(S, M) = 0$（$n \\ne 0$）',
      regions: ['homology', 'topology'],
      tags: ['同调代数', 'Stone 空间', '无环', 'Čech'],
      statement: '若 $S$ 是 **Stone** 空间（= 紧 Hausdorff 完全不连通空间），则对任何阿贝尔层 $M$，$H^{n}(S, M) = 0$ 对一切 $n \\ne 0$。'
    },

    {
      id: 'prop.topos-morphism-derived',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '拓扑斯态射的导出函子',
      title: '$R^{n}f_{*}M$ 是 $X\' \\mapsto H^{n}(f^{-1}(X\'), M)$ 的层化',
      regions: ['homology', 'category'],
      tags: ['同调代数', '拓扑斯', '态射', '导出函子'],
      statement: '若 $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是**拓扑斯的态射**，则 $R^{n}f_{*}M$ 是预层 $X\' \\mapsto H^{n}\\bigl(f^{-1}(X\'),\\ M\\bigr)$ 所**层化**得到的层。',
      notes: '⭐ **读法**：想算拓扑斯态射的导出函子，先逐点算「另一边像处的上同调」，再把结果层化回去。这与层上同调的定义（截面函子的右导出函子）是同一回事，只是把「一个点的截面」换成了「拓扑斯态射的拉回」。\n\n📌  **Proposition 7.4.1**。'
    },

    {
      id: 'cor.homotopy-invariant-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'corollary',
      label: '层上同调是同伦不变量',
      title: '同伦等价的映射给同构的上同调',
      regions: ['homology', 'topology'],
      tags: ['同调代数', '同伦', '上同调', '常值系数'],
      statement: [
        '设 $M$ 是**常值**阿贝尔群。',
        '',
        '1. 若 $f \\simeq g : X \\to Y$ 是**同伦**的连续映射，则 $f$ 与 $g$ 诱导的上同调映射相同；',
        '2. 若 $f : X \\to Y$ 是**同伦等价**，则 $H^{n}(Y, M) \\cong H^{n}(X, M)$。'
      ].join('\n'),
      notes: '⭐ **这就是「层上同调是拓扑不变量」那句话的出处** —— 常值系数下，$H^{n}(-, M)$ 是同伦不变的，所以它可以拿来算空间的同伦类不变量（奇异上同调、de Rham 上同调都落在这一条上）。',
      refs: ['Le Stum, Proposition 7.4.2', 'Le Stum, Corollary 7.4.3']
    }
  ],

  edges: []
});
