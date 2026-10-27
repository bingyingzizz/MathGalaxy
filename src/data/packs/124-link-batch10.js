/* ==========================================================================
   内容包 · 接线：同调代数 / 群上同调 / 层论 / 拓扑新节点的定义前置
   --------------------------------------------------------------------------
   上一批（120–123）新增 90 个点时，有 12 个定义没有登记「它用到谁」，
   于是 `_layers` 把它们扔进了第 0 层（那里本该只有 5 条公理 + 空集 + 一阶语言）。
   这一包只补 definition 边，不改任何节点的正文。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '接线：第 10 批的定义前置',

  nodes: [],

  edges: [
    {
      id: 'def-link.divisible-group',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.divisible-group',
      note: '可除性是「对每个 $n$ 都能开 $n$ 次方」，先得有群运算。'
    },
    {
      id: 'def-link.group-ring-group',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.group-ring',
      note: '群环 $R[G]$ 的乘法由 $G$ 的乘法线性延拓而来 —— 群结构是它的骨架。'
    },
    {
      id: 'def-link.group-ring-ring',
      kind: 'definition',
      definition: 'def.ring',
      usedBy: 'def.group-ring',
      note: '群环同时是环：系数取自环 $R$，加法与数乘都按 $R$ 逐项做。'
    },
    {
      id: 'def-link.invariant-functor-functor',
      kind: 'definition',
      definition: 'def.functor',
      usedBy: 'def.invariant-functor',
      note: '不变量 $(-)^{G}$ 是一个函子：$G$-模之间的映射限制到不动点。'
    },
    {
      id: 'def-link.invariant-functor-gmodule',
      kind: 'definition',
      definition: 'def.g-module',
      usedBy: 'def.invariant-functor',
      note: '它的定义域是 $G$-模范畴，所以要先有「$G$ 在阿贝尔群上的作用」。'
    },
    {
      id: 'def-link.semidirect-group',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.semidirect-product',
      note: '半直积首先是群：底集是 $N \\times H$，乘法用作用 $\\varphi$ 扭一下。'
    },
    {
      id: 'def-link.semidirect-action',
      kind: 'definition',
      definition: 'def.group-action',
      usedBy: 'def.semidirect-product',
      note: '扭的那一下就是作用 $\\varphi : H \\to \\operatorname{Aut}(N)$ —— 没有作用只剩直积。'
    },
    {
      id: 'def-link.group-extension-group',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.group-extension',
      note: '扩张 $1 \\to A \\to E \\to G \\to 1$ 里三个群与两个同态都要说清楚。'
    },
    {
      id: 'def-link.group-extension-normal',
      kind: 'definition',
      definition: 'def.normal-subgroup',
      usedBy: 'def.group-extension',
      note: '扩张里的 $A$ 必须是 $E$ 的正规子群，否则商 $E/A$ 不成群。'
    },
    {
      id: 'def-link.cocycle2-cohomology',
      kind: 'definition',
      definition: 'def.group-cohomology',
      usedBy: 'def.cocycle-2',
      note: '二维上圈是上链复形里的闭元素，上边界是它的边缘 —— 都相对 $H^{2}$ 而言。'
    },
    {
      id: 'def-link.skyscraper-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'def.skyscraper-sheaf',
      note: '天际线层是一个层：在 $x$ 处取 $A$、别处取零，粘合条件按开集逐条验证。'
    },
    {
      id: 'def-link.exact-couple-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'def.exact-couple',
      note: '正合偶是阿贝尔范畴里两族对象配上度数 $+1$ 的映射，正合性指的是这里的核与像。'
    },
    {
      id: 'def-link.exact-couple-complex',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.exact-couple',
      note: '它把复形的同调逐页算出来，所以复形（及其微分）是它的输入。'
    },
    {
      id: 'def-link.etale-space-topology',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.etale-space',
      note: 'étale 空间是带拓扑的空间加局部同胚，拓扑结构先要有。'
    },
    {
      id: 'def-link.etale-sheaf-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'def.etale-sheaf',
      note: 'étale 层仍然是层，只是所在的景换成 étale 景。'
    },
    {
      id: 'def-link.discrete-family-topology',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.discrete-family',
      note: '离散族说的是「每个点至多碰到一个成员」，这是拓扑空间里子集族的性质。'
    },
    {
      id: 'def-link.refinement-topology',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.refinement',
      note: '加细是覆盖之间的关系，而覆盖由开集构成 —— 源头是拓扑。'
    },
    {
      id: 'def-link.metric-paracompact',
      kind: 'definition',
      definition: 'def.metric-space',
      usedBy: 'thm.metric-paracompact',
      note: '度量空间的度量给出可数局部基，仿紧性就是从这层结构长出来的。'
    },
    {
      id: 'def-link.metrizable-metric',
      kind: 'definition',
      definition: 'def.metric-space',
      usedBy: 'def.metrizable',
      note: '「可度量化」就是问：这个拓扑能不能由某个度量诱导出来。'
    },
    {
      id: 'def-link.second-countable-base',
      kind: 'definition',
      definition: 'def.topology-base',
      usedBy: 'def.second-countable',
      note: '第二可数说的是「有可数的基」，所以先要有基这个概念。'
    },
    {
      id: 'def-link.first-countable-base',
      kind: 'definition',
      definition: 'def.topology-base',
      usedBy: 'def.first-countable',
      note: '第一可数说的是「每点有可数的局部基」。'
    },
    {
      id: 'def-link.paracompact-cech',
      kind: 'definition',
      definition: 'def.paracompact',
      usedBy: 'thm.paracompact-cech-equals-sheaf',
      note: '这条定理的前提正是「仿紧 + Hausdorff」：仿紧给出局部有限的加细，单位分解才拼得出来，Čech 与层上同调才会重合。'
    }
  ]
});
