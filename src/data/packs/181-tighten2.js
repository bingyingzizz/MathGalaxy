/* ============================================================================
   内容包 · 团体检补漏 2（2026-11-03，对 algebra.vectorspace 补跑 clustercheck）
   ----------------------------------------------------------------------------
   T9 补「向量空间」时只连了 4 个消费者（vs / subspace / linear-map / linear-isomorphism），
   体检又抓出三处：

   ① `def.vector-space` 的注里写「维数良定义见 thm.dimension、存在性见 thm.vsbasis」——
      两个节点都在图里，却**一条边都没有**。这两条是**真依赖**（它们的陈述都以「设 $V$ 是
      $K$ 上的向量空间」开头），补 definition 边。
   ② `def.subspace` 的注里写「别与拓扑的『子空间』（`def.subspace-topology`）混」——
      **同名不同物**，正是审计 C5 点出的那对。补 analogy 边并写清「为什么不能连依赖」。
   ③ `def.vector-space` 提到 `def.tensor-module`（「它就是 $R = K$ 时的模」）——
      那是**旁注**，不是依赖方向（模更一般，向量空间是它的特例，方向反了），
      所以把反引号降成中文说法，不硬连边。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '团体检补漏 2：向量空间团的 3 条接口',

  nodes: [],

  edges: [
    {
      id: 'dep.vectorspace-dimension',
      kind: 'definition',
      definition: 'def.vector-space',
      usedBy: 'thm.dimension',
      note: '「维数良定义」的陈述第一句就是「设 $V$ 是 $K$ 上的向量空间」—— 它测的是**向量空间**的维数，' +
        '此前这条边不在图上（`def.vector-space` 的注里写了「见 `thm.dimension`」，却是空的）。',
    },
    {
      id: 'dep.vectorspace-vsbasis',
      kind: 'definition',
      definition: 'def.vector-space',
      usedBy: 'thm.vsbasis',
      note: '「每个向量空间都有基」的主语就是向量空间（而且证明要用 Zorn，见那条边）。',
    },
    {
      kind: 'analogy',
      a: 'def.subspace',
      b: 'def.subspace-topology',
      title: '两个「子空间」：线性代数的 vs 拓扑的子空间拓扑',
      note: [
        '**同名不同物**，中文里都叫「子空间」：',
        '- `def.subspace`：$V$ 的**线性**子空间 —— 要求含零、对加法与数乘封闭（代数条件）；',
        '- `def.subspace-topology`：$X$ 的**子集** $A$ 带上「$U \\cap A$ 开」的拓扑（纯拓扑操作，$A$ 可以是任何子集）。',
        '⚠ 两者只在「$\\mathbb{R}^{n}$ 的线性子空间配上子空间拓扑」这种特殊场合才谈得上关系；' +
          '一般情形下一个是代数结构、一个是把拓扑限制到子集上。',
        '⛔ 不能连 definition/implication：没有谁是谁的前提，而且方向想清楚也很难 —— ' +
          '所以只能用类比边把这层「词撞车」记下来，让读者别点错。',
      ].join('\n\n'),
    },
  ],
});
