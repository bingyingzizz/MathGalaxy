/* ==========================================================================
   内容包 · 定义引用关系（蓝色 50% 线）
   --------------------------------------------------------------------------
   规则：如果某个结论的陈述/构造里出现了某个定义，就用一条蓝线把它们连起来。
   集中放在这个文件里，方便统一检查「哪些结论引用了哪些定义」。

   字段：definition = 定义节点的 id；usedBy = 用到它的那个节点 id。
   点击蓝线可以看到这条引用关系的具体说明。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '定义引用关系',
  nodes: [],

  edges: [

    /* ---------------------------------------------------------- 子集 */
    {
      id: 'def-link.sep-subset',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'ax.sep',
      note: '分离公理模式给出的 B = { x ∈ A : φ(x, p) } 恰好是 A 的一个**子集**——"只从 A 里挑元素"正是 ⊆ 的语义。'
    },
    {
      id: 'def-link.power-subset',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'ax.power',
      note: '幂集公理的陈述里直接出现了子集符号：x ∈ 𝒫(A) ⟺ x ⊆ A。'
    },
    {
      id: 'def-link.finchar-subset',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.finchar',
      note: '「X 的每个**有限子集**都属于 𝒜」——有限特征是靠子集概念说出来的。'
    },

    /* -------------------------------------------------------- 有序对 */
    {
      id: 'def-link.pair-pairing',
      kind: 'definition',
      definition: 'def.pair',
      usedBy: 'ax.pair',
      note: '方向相反的一条：有序对 (a, b) = {{a}, {a, b}} 的**构造**要用到配对公理才成为集合。'
    },
    {
      id: 'def-link.rel-pair',
      kind: 'definition',
      definition: 'def.pair',
      usedBy: 'def.rel',
      note: '关系被定义为「有序对的集合」，函数是特殊的关系，因此整个定义都建立在有序对之上。'
    },
    {
      id: 'def-link.product-pair',
      kind: 'definition',
      definition: 'def.pair',
      usedBy: 'thm.product',
      note: 'A × B = { (a, b) : a ∈ A, b ∈ B } 中的元素就是有序对。'
    },

    /* ---------------------------------------------------- 关系与函数 */
    {
      id: 'def-link.choicefn-rel',
      kind: 'definition',
      definition: 'def.rel',
      usedBy: 'def.choicefn',
      note: '选择函数首先是「函数」，所以定义里用到了关系与函数的概念。'
    },
    {
      id: 'def-link.ac-choicefn',
      kind: 'definition',
      definition: 'def.choicefn',
      usedBy: 'ax.choice',
      note: '选择公理的陈述直接使用了「选择函数」这个词：每个 ∅ ∉ F 的集合族都有选择函数。'
    },

    /* ---------------------------------------------------------- 序 */
    {
      id: 'def-link.chain-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.chain',
      note: '链是偏序集的子集：定义里用到了偏序 ⪯ 与可比性。'
    },
    {
      id: 'def-link.bound-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.bound',
      note: '上界、极大元、最大元都是相对于一个偏序集 (P, ⪯) 而言的。'
    },
    {
      id: 'def-link.wellorder-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.wellorder',
      note: '良序集首先是全序集（从而也是偏序集），只是在它上面加了「非空子集有最小元」。'
    },
    {
      id: 'def-link.finchar-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.finchar',
      note: '有限特征的最典型例子就是「偏序集的链族」，定义条目里举了这个例子。'
    },
    {
      id: 'def-link.finchar-chain',
      kind: 'definition',
      definition: 'def.chain',
      usedBy: 'def.finchar',
      note: '「X 是链 ⟺ X 的每个有限子集是链」——这是链族具有有限特征的原因，也是 Tukey ⟹ Hausdorff 的全部关键。'
    },
    {
      id: 'def-link.zorn-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'lem.zorn',
      note: '佐恩引理是**关于偏序集**的命题：前提与结论都离不开 ⪯ 与上界。'
    },
    {
      id: 'def-link.zorn-chain',
      kind: 'definition',
      definition: 'def.chain',
      usedBy: 'lem.zorn',
      note: '「P 的每个链都有上界」是佐恩引理的核心条件。'
    },
    {
      id: 'def-link.zorn-bound',
      kind: 'definition',
      definition: 'def.bound',
      usedBy: 'lem.zorn',
      note: '条件用的是「上界」，结论用的是「极大元」——特别要注意不是「最大元」。'
    },
    {
      id: 'def-link.hausdorff-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'thm.hausdorff',
      note: 'Hausdorff 极大原理陈述在偏序集 (P, ⪯) 上。'
    },
    {
      id: 'def-link.hausdorff-chain',
      kind: 'definition',
      definition: 'def.chain',
      usedBy: 'thm.hausdorff',
      note: '整条原理就是在说「链可以长到极大」。'
    },
    {
      id: 'def-link.tukey-finchar',
      kind: 'definition',
      definition: 'def.finchar',
      usedBy: 'lem.tukey',
      note: 'Tukey 引理的唯一前提就是「该集合族具有有限特征」。'
    },
    {
      id: 'def-link.wo-wellorder',
      kind: 'definition',
      definition: 'def.wellorder',
      usedBy: 'thm.wellordering',
      note: '良序定理断言「每个集合都能被良序化」，用到的正是良序集这个概念。'
    },
    {
      id: 'def-link.basis-vs',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'thm.vsbasis',
      note: '「每个向量空间有基」中的「基」由线性无关与生成两个概念定义。'
    }
  ]
});
