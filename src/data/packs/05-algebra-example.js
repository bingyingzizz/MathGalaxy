/* ==========================================================================
   内容包 · 代数示例（示范「别的板块引用序理论结论」的跨板块连线）
   --------------------------------------------------------------------------
   这一包是整个示例里唯一不属于集合论/序理论的内容，
   用来展示：不同板块各自成云、而跨板块的结论会被拉到两块交界处。
   如果暂时不需要，直接把这个 <script> 去掉即可。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '代数示例：向量空间的基',
  nodes: [

    {
      id: 'def.vs',
      cluster: 'algebra.vectorspace',
      type: 'definition',
      label: '向量空间的基',
      title: '向量空间 / 线性无关 / 基',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $K$ 是域，$V$ 是 $K$ 上的向量空间，$S \\subseteq V$。',
        '',
        '- **$S$ 线性无关**：$S$ 的每个有限子集都线性无关，即不存在不全为零的 $c_{1}$…$c_{n} \\in K$ 使 $c_{1}v_{1} + \\cdots + c_{n}v_{n} = 0$。',
        '- **$S$ 生成 $V$**：$V$ 中每个向量都是 $S$ 中有限多个向量的线性组合。',
        '- **$S$ 是 $V$ 的基**：$S$ 既线性无关又生成 $V$。',
        '',
        '注意线性无关性是**逐有限子集**定义的性质——这正是它「具有有限特征」的原因。'
      ].join('\n'),
      notes: '等价说法：$S$ 是基 $\\iff V$ 中每个向量都能唯一地写成 $S$ 的有限线性组合。',
      refs: ['Lang, Linear Algebra']
    },

    {
      id: 'thm.vsbasis',
      cluster: 'algebra.vectorspace',
      type: 'theorem',
      label: '每个向量空间有基',
      title: '每个向量空间都有基（Zorn 引理的经典应用）',
      regions: ['algebra'],
      tags: ['定理', '应用', 'Zorn'],
      statement: [
        '设 $V$ 是域 $K$ 上的向量空间。则',
        '',
        '$V$ 有基；',
        '- 更精确地：$V$ 的任一线性无关子集都能扩充成 $V$ 的一个基，任一生成集都含有一个基。'
      ].join('\n'),
      notes: [
        '在 ZF 中此命题与 AC 等价——去掉 AC，可以构造出没有基的向量空间。',
        '这是「序理论的结论在代数里落地」的标准范例，也是本星图上跨板块连线的一个实例。'
      ].join('\n\n'),
      refs: ['Lang, Linear Algebra', 'Brunner, The Axiom of Choice in Topology']
    }
  ],

  edges: [
    {
      id: 'imp.zorn-to-basis',
      kind: 'implication',
      sources: ['lem.zorn'],
      target: 'thm.vsbasis',
      title: '佐恩引理 ⇒ 每个向量空间有基',
      proof: [
        '设 $V \\ne 0$ 是域 $K$ 上的向量空间，并给定线性无关集 $S_{0} \\subseteq V$。令',
        '',
        '$$\\mathcal{A} = \\{ S \\subseteq V : S \\supseteq S_0\\text{ 且} S\\text{ 线性无关} \\}$$',
        '',
        '按包含关系 $\\subseteq$ 排序。',
        '',
        '1. **$\\mathcal{A} \\ne \\emptyset$**：$S_{0} \\in \\mathcal{A}$。',
        '',
        '2. **每个链有上界**：设 $\\mathcal{D} \\subseteq \\mathcal{A}$ 是 $\\subseteq$链，令 $U = \\bigcup \\mathcal{D}$。要证 $U$ 线性无关，只需证 $U$ 的每个有限子集线性无关：取有限子集 $\\{v_{1}$ …$v_{n}\\} \\subseteq U$，每个 $v_{i}$ 属于某个 $D_{i} \\in \\mathcal{D}$；$\\mathcal{D}$ 是链且只有有限多个 $D_{i}$，故其中有一个最大的 $D$ 包含全部 $v_{i}$，即 $\\{v_{1}$ …$v_{n}\\} \\subseteq D$。而 $D$ 线性无关，故它的子集 $\\{v_{1}$ …$v_{n}\\}$ 也线性无关。因此 $U$ 线性无关，$U \\in \\mathcal{A}$，它是 $\\mathcal{D}$ 的上界。',
        '',
        '3. 由佐恩引理，$\\mathcal{A}$ 有极大元 $B$。$B$ 是含 $S_{0}$ 的线性无关集，且在「含 $S_{0}$ 的线性无关集」中极大。',
        '',
        '4. **$B$ 生成 $V$**：若存在 $v \\in V$ 不在 $B$ 的张成空间 span(B) 中，则 $B \\cup \\{v\\}$ 仍线性无关（否则 $v$ 可写成 $B$ 中有限多个向量的线性组合，与 $v \\notin span(B)$ 矛盾），且严格大于 $B$，与 $B$ 的极大性矛盾。故 $span(B) = V$，即 $B$ 是 $V$ 的基。取 $S_{0} = \\emptyset$ 得「$V$ 有基」。∎'
      ].join('\n'),
      note: '同样的套路可以证明：每个环有极大理想、每个域上每个模有极大无关组、每个偏序集有极大反链。'
    }
  ]
});
