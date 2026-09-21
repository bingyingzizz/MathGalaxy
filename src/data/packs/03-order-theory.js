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
        '设 ⪯ 是集合 A 上的二元关系。⪯ 是 **A 上的偏序**，当且仅当：',
        '',
        '- **自反**：∀x ∈ A, x ⪯ x；',
        '- **反对称**：∀x, y ∈ A ( x ⪯ y ∧ y ⪯ x → x = y )；',
        '- **传递**：∀x, y, z ∈ A ( x ⪯ y ∧ y ⪯ z → x ⪯ z )。',
        '',
        '若还满足 **可比性** ∀x, y ∈ A ( x ⪯ y ∨ y ⪯ x )，则 ⪯ 称为 **A 上的全序**（线性序），(A, ⪯) 称为全序集。',
        '',
        '称 (A, ⪯) 为**偏序集**。由 ⪯ 定义**严格序**：$$x ≺ y :⟺ x ⪯ y ∧ x ≠ y$$'
      ].join('\n'),
      notes: [
        '典型例子：⟨𝒫(S), ⊆⟩ 是偏序集但不是全序集；⟨ℝ, ≤⟩ 是全序集。',
        '反对称性是说：只允许「相等」这一种互相 ≤ 的方式，所以偏序可以看成「≤ 的抽象」。'
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
        '设 (P, ⪯) 是偏序集，C ⊆ P。',
        '',
        '**C 是链**（也叫全序子集），当且仅当 C 中任意两个元素都可比：',
        '',
        '$$∀x, y ∈ C ( x ⪯ y ∨ y ⪯ x )$$',
        '',
        '**C 是反链**，当且仅当 C 中任意两个不同元素都不可比。',
        '',
        '约定：∅ 与单点集都算链。'
      ].join('\n'),
      notes: '「链」这个词是佐恩引理、Hausdorff 极大原理的中心概念——它们说的都是「链能长到多大」。',
      refs: ['Kunen, Set Theory, I.11']
    },

    {
      id: 'def.bound',
      cluster: 'order.structure',
      type: 'definition',
      label: '上界与极大元',
      title: '上界 / 上确界 / 极大元（Bound & Maximal Element）',
      regions: ['order-theory'],
      tags: ['定义', '上界', '极大元'],
      statement: [
        '设 (P, ⪯) 是偏序集，S ⊆ P，u, m ∈ P。',
        '',
        '- **u 是 S 的上界**：∀s ∈ S, s ⪯ u。',
        '- **u 是 S 的上确界**（记 sup S）：u 是上界，且 u ⪯ 每一个上界。',
        '- **m 是 P 的极大元**：$$∀x ∈ P ( m ⪯ x → x = m )$$，即没有比 m 更大的元素。',
        '- **m 是 P 的最大元**：∀x ∈ P, x ⪯ m，即 m 比所有元素都大。',
        '',
        '⚠ **极大元 ≠ 最大元。**'
      ].join('\n'),
      notes: [
        '例子：P = { {1}, {2} } 按 ⊆ 排序。两个元素都是极大元（谁也包不住谁），但没有最大元。',
        '在**全序**集里两者才重合。偏序集里「极大」只要求「上面没有别人」，不要求「下面有所有人」。',
        '佐恩引理保证的是极大元，而不是最大元——这一点在应用时最容易出错。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.11']
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
        '全序集 (W, ⪯) 是**良序的**，当且仅当 W 的每个非空子集都有最小元：',
        '',
        '$$∀S ⊆ W ( S ≠ ∅ → ∃m ∈ S, ∀s ∈ S, m ⪯ s )$$',
        '',
        '等价于：不存在无穷严格递减链 w₀ ≻ w₁ ≻ w₂ ≻ ⋯。',
        '',
        '良序集上可以做**超限归纳**与**超限递归**；每个良序集序同构于唯一的一个序数。'
      ].join('\n'),
      notes: '⟨ℕ, ≤⟩ 是良序的；⟨ℤ, ≤⟩、⟨ℝ, ≤⟩ 不是（ℝ 的某些非空子集没有最小元）。',
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
        '集合族 𝒜 具有**有限特征**，当且仅当对任意集合 X：',
        '',
        '$$X ∈ 𝒜 ⟺ X 的每个有限子集都属于 𝒜$$',
        '',
        '也就是说：「局部地看起来像 𝒜 的成员」⟹「整体就是 𝒜 的成员」。'
      ].join('\n'),
      notes: [
        '典型例子：',
        '- 偏序集 P 的**链族**（X 是链 ⟺ X 的每个二元子集可比）；',
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
