/* ==========================================================================
   内容包 · 集合论基本定义与定理
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '集合论基本定义与定理',
  nodes: [

    /* -------------------------------------------------------- 子集 */
    {
      id: 'def.subset',
      type: 'definition',
      label: '子集',
      title: '子集 / 真子集（Subset）',
      regions: ['set-theory'],
      tags: ['定义', '包含关系'],
      statement: [
        '设 A、B 是集合。',
        '',
        '- **A 是 B 的子集**（记 A ⊆ B）：$$∀x ( x ∈ A → x ∈ B )$$',
        '- **A 是 B 的真子集**（记 A ⊊ B）：A ⊆ B 且 A ≠ B。',
        '',
        '基本性质：⊆ 自反、传递；并且由外延公理，',
        '',
        '$$A = B ⟺ A ⊆ B ∧ B ⊆ A$$',
        '',
        '这是证明两个集合相等最常用的套路：**两边互包**。'
      ].join('\n'),
      notes: '∅ ⊆ A 对一切 A 成立（空泛真）。',
      refs: ['Kunen, Set Theory, I.2']
    },

    /* ------------------------------------------------------ 有序对 */
    {
      id: 'def.pair',
      type: 'definition',
      label: '有序对',
      title: '有序对（Ordered Pair, Kuratowski）',
      regions: ['set-theory'],
      tags: ['定义', 'Kuratowski'],
      statement: [
        'Kuratowski 定义：',
        '',
        '$$(a, b) := { {a}, {a, b} }$$',
        '',
        '它由配对公理与幂集公理保证是集合。',
        '',
        '**特征性质**（这才是「有序」的全部含义）：',
        '',
        '$$(a, b) = (c, d) ⟺ a = c ∧ b = d$$',
        '',
        'n 元组递归定义为 (a₁, …, aₙ) = ( (a₁, …, aₙ₋₁), aₙ )。'
      ].join('\n'),
      notes: '用集合「编码」有序对之后，关系、函数、序型等等才都能在 ZFC 内部说清楚。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* -------------------------------------------------- 关系与函数 */
    {
      id: 'def.rel',
      type: 'definition',
      label: '关系与函数',
      title: '关系 / 函数（Relation & Function）',
      regions: ['set-theory'],
      tags: ['定义', '函数'],
      statement: [
        '设 A、B 是集合。',
        '',
        '- **关系** R 由有序对组成；R ⊆ A × B 表示 R 是 A 到 B 的关系。',
        '- **定义域** dom R = { a : ∃b (a, b) ∈ R }；**值域** ran R = { b : ∃a (a, b) ∈ R }。',
        '- **逆** R⁻¹ = { (b, a) : (a, b) ∈ R }。',
        '- **函数** f : A → B 是满足下式的关系 f ⊆ A × B：',
        '',
        '$$∀a ∈ A, ∃! b ∈ B, (a, b) ∈ f$$',
        '',
        '唯一性使 f(a) = b 这个记号不会歧义；此时 dom f = A。'
      ].join('\n'),
      notes: '在 ZFC 里「函数就是一种特殊的关系，关系就是一种特殊的集合」——没有额外的原始概念。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ---------------------------------------------------- 选择函数 */
    {
      id: 'def.choicefn',
      type: 'definition',
      label: '选择函数',
      title: '选择函数（Choice Function）',
      regions: ['set-theory'],
      tags: ['定义', '选择'],
      statement: [
        '设 F 是一个集合族，且 ∅ ∉ F。',
        '',
        'f 是 F 的**选择函数**，当且仅当',
        '',
        '- f 是函数，dom f = F；',
        '- ∀X ∈ F, f(X) ∈ X。',
        '',
        '即：f 从 F 的每一个成员里各挑出一个元素。',
        '',
        '于是选择公理可以简洁地写成：**每个满足 ∅ ∉ F 的集合族 F 都有选择函数**。'
      ].join('\n'),
      notes: '若 F 有限，逐个挑选即可，无需 AC。难点只在无穷族，尤其是不可数族。',
      refs: ['Jech, The Axiom of Choice']
    },

    /* -------------------------------------------------- 空集存在 */
    {
      id: 'thm.empty',
      type: 'theorem',
      label: '空集存在',
      title: '空集存在且唯一',
      regions: ['set-theory'],
      tags: ['定理'],
      statement: [
        '存在一个不含任何元素的集合：',
        '',
        '$$∃B ∀x ( x ∉ B )$$',
        '',
        '由外延公理，这样的 B 唯一，记作 ∅。'
      ].join('\n'),
      notes: '∅ 是 ∈-关系的最小元，也是 ⊆-关系的最小元：∅ ⊆ A 对一切 A 成立。',
      refs: ['Kunen, Set Theory, I.4']
    },

    /* ------------------------------------------------ 无自属集合 */
    {
      id: 'thm.noself',
      type: 'theorem',
      label: '无自属集合',
      title: '任何集合都不属于自身',
      regions: ['set-theory'],
      tags: ['定理', '正则公理'],
      statement: [
        '$$∀A ( A ∉ A )$$',
        '',
        '更一般地，正则公理排除了任何有限的 ∈-循环：',
        '',
        '$$A₀ ∋ A₁ ∋ ⋯ ∋ Aₙ = A₀$$'
      ].join('\n'),
      notes: '这条定理说明罗素悖论里的「集合 R = { x : x ∉ x }」不可能存在——否则 R ∈ R 与 R ∉ R 同时成立。',
      refs: ['Kunen, Set Theory, I.9']
    },

    /* ------------------------------------------------ 自然数集 */
    {
      id: 'thm.omega',
      type: 'theorem',
      label: '自然数集存在',
      title: '自然数集 ω 存在',
      regions: ['set-theory'],
      tags: ['定理', '自然数', '序数'],
      statement: [
        '存在**最小归纳集** ω：它含有 ∅，对 x ↦ x ∪ {x} 封闭，且含于一切归纳集之中：',
        '',
        '$$ω = { ∅, {∅}, {∅, {∅}}, {∅, {∅}, {∅, {∅}}}, … }$$',
        '',
        '把 ∈ 读作 <，⟨ω, ∈⟩ 就是自然数系 ⟨ℕ, <⟩。'
      ].join('\n'),
      notes: 'ω 同时也是最小的极限序数。构造它需要无穷公理 + 幂集公理 + 分离公理模式三者合力。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ---------------------------------------------------- 二元并 */
    {
      id: 'thm.binunion',
      type: 'theorem',
      label: '二元并存在',
      title: '二元并 a ∪ b 存在',
      regions: ['set-theory'],
      tags: ['定理'],
      statement: [
        '任给两个集合，它们的并仍是集合：',
        '',
        '$$∀a ∀b ∃A ∀x [ x ∈ A ↔ ( x ∈ a ∨ x ∈ b ) ]$$',
        '',
        '记作 a ∪ b。'
      ].join('\n'),
      notes: 'a ∪ b 是包含 a 与 b 的最小集合（⊆-意义下）。',
      refs: ['Kunen, Set Theory, I.3']
    },

    /* -------------------------------------------------- 笛卡尔积 */
    {
      id: 'thm.product',
      type: 'theorem',
      label: '笛卡尔积存在',
      title: '笛卡尔积 A × B 存在',
      regions: ['set-theory'],
      tags: ['定理', '有序对'],
      statement: [
        '任给两个集合，全体有序对构成一个集合：',
        '',
        '$$∀A ∀B ∃C ∀z [ z ∈ C ↔ ∃a ∈ A, ∃b ∈ B, z = (a, b) ]$$',
        '',
        '记作 A × B = { (a, b) : a ∈ A, b ∈ B }。'
      ].join('\n'),
      notes: '它是「关系」「函数」得以定义为集合的前提：没有 A × B，就没有 R ⊆ A × B 这个说法。',
      refs: ['Kunen, Set Theory, I.5']
    }
  ],

  edges: [
    {
      id: 'imp.sep-to-empty',
      kind: 'implication',
      sources: ['ax.sep'],
      target: 'thm.empty',
      title: '分离公理模式 ⇒ 空集存在',
      proof: [
        '取任意集合 a（一阶逻辑的论域非空，故这样的 a 存在；在 ZF 中也可由无穷公理提供）。',
        '',
        '取公式 φ(x) :≡ ( x ≠ x )，它是矛盾式。分离公理模式给出集合',
        '',
        '$$B = { x ∈ a : x ≠ x }$$',
        '',
        '对任意 x，x ∈ B ↔ ( x ∈ a ∧ x ≠ x ) 恒为假，故 B 不含任何元素。',
        '由外延公理，这样的 B 唯一，记作 ∅。∎'
      ].join('\n'),
      note: '严格地说，「论域非空」是一阶逻辑的约定，不属于 ZF 公理。若不喜欢这个约定，也可以先由无穷公理取出一个集合再分离。'
    },
    {
      id: 'imp.found-to-noself',
      kind: 'implication',
      sources: ['ax.found', 'ax.pair'],
      target: 'thm.noself',
      title: '正则公理 + 配对公理 ⇒ A ∉ A',
      proof: [
        '反设存在集合 A 使 A ∈ A。由配对公理取 a = b = A，得单点集 {A}。',
        '',
        '由外延公理 {A} ≠ ∅（它含有 A）。对 {A} 用正则公理：存在 x ∈ {A} 使',
        '',
        '$$x ∩ { A } = ∅$$',
        '',
        '而 {A} 只有唯一的元素，故 x = A。于是 A ∩ {A} = ∅。',
        '',
        '但由假设 A ∈ A 且 A ∈ {A}，所以 A ∈ A ∩ {A}，与 A ∩ {A} = ∅ 矛盾。故 A ∉ A。∎'
      ].join('\n'),
      note: '把同样的论证用在任意有限 ∈-循环 A₀ ∋ A₁ ∋ ⋯ ∋ Aₙ = A₀ 上，取集合 {A₀, …, Aₙ₋₁}（可由配对公理反复构造），也能得到矛盾。'
    },
    {
      id: 'imp.inf-to-omega',
      kind: 'implication',
      sources: ['ax.inf', 'ax.power', 'ax.sep'],
      target: 'thm.omega',
      title: '无穷公理 + 幂集公理 + 分离公理模式 ⇒ ω 存在',
      proof: [
        '1. 由无穷公理取一个归纳集 I。称 J ⊆ I 是**归纳的**，若 ∅ ∈ J 且 ∀x (x ∈ J → x ∪ {x} ∈ J)。',
        '',
        '2. 由幂集公理，𝒫(I) 是集合；再用分离公理模式取',
        '',
        '$$S = { J ∈ 𝒫(I) : J 是归纳集 }$$',
        '',
        'S 非空（I ∈ S）。',
        '',
        '3. 再对 𝒫(I) 用一次分离公理模式，令',
        '',
        '$$ω = { x ∈ I : ∀J ( J ∈ S → x ∈ J ) }$$',
        '',
        '即 ω 是所有归纳子集的交。',
        '',
        '4. ω 是归纳集：∅ 属于每个 J ∈ S，故 ∅ ∈ ω；若 x ∈ ω，则 x 属于每个 J ∈ S，从而 x ∪ {x} 属于每个 J ∈ S，故 x ∪ {x} ∈ ω。',
        '',
        '5. ω 含于一切归纳集：若 K 是归纳集，则 K ∩ I 也是归纳集且 K ∩ I ∈ S，由 ω 的定义 ω ⊆ K ∩ I ⊆ K。',
        '',
        '故 ω 是最小归纳集，即自然数集。∎'
      ].join('\n')
    },
    {
      id: 'imp.binunion',
      kind: 'implication',
      sources: ['ax.pair', 'ax.union'],
      target: 'thm.binunion',
      title: '配对公理 + 并集公理 ⇒ 二元并存在',
      proof: [
        '任给 a、b。',
        '',
        '1. 由配对公理，{ a, b } 是集合。',
        '2. 由并集公理，⋃{ a, b } 是集合，且',
        '',
        '$$x ∈ ⋃{ a, b } ⟺ ∃Y ( Y ∈ { a, b } ∧ x ∈ Y ) ⟺ ( x ∈ a ∨ x ∈ b )$$',
        '',
        '取 A = ⋃{ a, b } 即为所求。∎'
      ].join('\n')
    },
    {
      id: 'imp.product',
      kind: 'implication',
      sources: ['ax.power', 'ax.pair', 'ax.union', 'ax.sep'],
      target: 'thm.product',
      title: '幂集 + 配对 + 并集 + 分离公理模式 ⇒ A × B 存在',
      proof: [
        '任给 A、B。',
        '',
        '1. 由配对公理与并集公理，A ∪ B 是集合。',
        '',
        '2. 对任意 a ∈ A、b ∈ B，Kuratowski 有序对 (a, b) = {{a}, {a, b}}。其中 {a} ⊆ A ∪ B，{a, b} ⊆ A ∪ B，所以 {a}, {a, b} ∈ 𝒫(A ∪ B)，进而 (a, b) ∈ 𝒫(𝒫(A ∪ B))。',
        '',
        '3. 由幂集公理，𝒫(𝒫(A ∪ B)) 是集合。用分离公理模式取',
        '',
        '$$C = { z ∈ 𝒫(𝒫(A ∪ B)) : ∃a ∈ A, ∃b ∈ B, z = (a, b) }$$',
        '',
        '则 C 恰是 A × B：一方面每个 (a, b) 都在 𝒫(𝒫(A ∪ B)) 中，另一方面 z 是不在 A、B 中任意点处取到的有序对时不会被选进来。∎'
      ].join('\n'),
      note: '这个证明展示了一个典型套路：先用幂集「造一个足够大的容器」，再用分离公理模式「筛出真正想要的东西」。'
    }
  ]
});
