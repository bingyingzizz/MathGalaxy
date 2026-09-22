/* ==========================================================================
   内容包 · 测度的构造（一）：集合族与 σ-代数
   --------------------------------------------------------------------------
   来自手写笔记「总结：集合论，测度」第 1 页末尾 ~ 第 3 页。

   整条主线是：先把「哪些集合可以被测量」这套语言造出来，再往上装测度。
        基本类 → 环 / 代数 → σ-环 / σ-代数 → 生成、Borel、积 σ-代数
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '集合族与 σ-代数',
  nodes: [

    {
      id: 'def.fundamental-class',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '基本类',
      title: '基本类（Fundamental Class）',
      regions: ['analysis', 'set-theory'],
      tags: ['定义', '集合族', '测度论'],
      statement: [
        '设 X 是集合，𝔄 ⊆ 𝒫(X)。𝔄 是 X 上的一个**基本类**，当且仅当',
        '',
        '- 对**交**封闭：$$A, B ∈ 𝔄 ⟹ A ∩ B ∈ 𝔄$$',
        '- 差可以拆开：$$A, B ∈ 𝔄 ⟹ A ∖ B 是 𝔄 中有限多个两两不交集合之并$$'
      ].join('\n'),
      notes: [
        '它比「环」弱一档：只要求对**交**封闭（不是并），而差只要求「能拆成不交并」。',
        '基本类的作用是当**砖块**：把它的元素做成有限不交并，就得到一个环 —— 这正是下面那条性质 (5)。',
        '典型例子：半开区间族 { (a, b] : a < b } 是 ℝ 上的基本类；由它做有限不交并得到的，正是构造 Lebesgue–Stieltjes 测度时要用的那个代数。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §4']
    },

    {
      id: 'def.set-ring',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '环与代数',
      title: '环 / 代数 / σ-环 / σ-代数（Ring, Algebra, σ-Ring, σ-Algebra）',
      regions: ['analysis'],
      tags: ['定义', 'σ-代数', '环', '代数'],
      statement: [
        '设 𝔄 ⊆ 𝒫(X) 是 X 的一族子集。',
        '',
        '- 𝔄 是**环**（ring）：对有限并封闭，且对差封闭：$$A, B ∈ 𝔄 ⟹ A ∪ B ∈ 𝔄 且 A ∖ B ∈ 𝔄$$',
        '- 𝔄 是**代数**（algebra）：𝔄 是环，且 $$X ∈ 𝔄$$',
        '- 𝔄 是 **σ-环**：对**可数**并封闭，且对差封闭',
        '- 𝔄 是 **σ-代数**：𝔄 是 σ-环，且 $$X ∈ 𝔄$$',
        '',
        '等价说法：𝔄 是 σ-代数 ⟺ 𝔄 对**补**封闭且对**可数并**封闭。'
      ].join('\n'),
      notes: [
        '「环」和「代数」只差一件事：**有没有把整个 X 放进去**。所以 σ-环里的集合之并仍可能是真子集 —— 例：X = ℝ 时「可数集全体」是一个 σ-环，但不是 σ-代数。',
        'σ-代数的三条常用封闭性（含 X、对补、对可数并）是配套的：有了它们，可数交、差、对称差全都自动可用。',
        '⚠ 这里的「环」是**集合环**，和抽象代数里的 ring 只是同名，毫无关系。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §4', 'Folland, Real Analysis, §1.2']
    },

    {
      id: 'def.monotone-class',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '单调类',
      title: '单调类（Monotone Class）',
      regions: ['analysis'],
      tags: ['定义', '单调类'],
      statement: [
        '𝔄 ⊆ 𝒫(X) 是**单调类**，当且仅当它对两种单调极限都封闭：',
        '',
        '$${E_j}_{j=1}^{∞} ↗ ⟹ ⋃_{j=1}^{∞} E_j ∈ 𝔄$$',
        '$${E_j}_{j=1}^{∞} ↘ ⟹ ⋂_{j=1}^{∞} E_j ∈ 𝔄$$'
      ].join('\n'),
      notes: [
        '单调类只关心「递增取并、递减取交」这两种极限，**不**要求对有限并、差、补封闭 —— 所以它比 σ-代数弱得多。',
        '它的用处全在单调类定理：一个 σ-代数等价于「一个对两种极限都封闭的环」。证明「某性质对所有可测集成立」时，通常先验证它在一个单调类上成立，再交给单调类定理。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §6']
    },

    {
      id: 'prop.set-class-properties',
      cluster: 'analysis.measure',
      type: 'proposition',
      label: '集合族的基本性质',
      title: '命题：基本类 / 环 / σ-代数的几条基本性质',
      regions: ['analysis'],
      tags: ['命题', '基本类', '代数', '封闭性'],
      statement: [
        '(1) 基本类包含 ∅。',
        '',
        '(2) 代数与 σ-代数对**有限交**、**可数交**封闭。',
        '',
        '(3) 𝔄 是 σ-代数 ⟺ 𝔄 对**可数并**与**取补**都封闭。',
        '',
        '(5) 若 ℰ 是**基本类**，则',
        '',
        '$$𝔄 = { ℰ 中有限多个两两不交集合之并 }$$',
        '',
        '是一个**环**。',
        '',
        '（编号沿用笔记；第 (4) 条因为本身是一条定理，单独列在「环 ⟹ σ-环 的判据」里。）'
      ].join('\n'),
      notes: [
        '(1)：取 A ∈ 𝔄，则 A ∖ A = ∅ 要能被拆成不交并，只能是空并。',
        '(2)：有限交直接由 De Morgan；可数交由 (3) 的补 + 可数并得到。若 𝔄 只是环而不含 X，「补」要小心，通常用 **A ∖ ⋃Bⱼ** 这种相对补。',
        '(5)：这是把基本类升级成环的标准操作 —— 先做不交并保证「差」好算，再验证有限并仍是有限不交并。',
        '这几条性质的实际用途：**验证一个族是 σ-代数时，只需查「含 X」「对补」「对可数并」三条**，其余全部免费。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §4']
    },

    {
      id: 'thm.ring-monotone-sigma',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: '环 → σ-环 的判据',
      title: '定理：环是 σ-环 ⟺ 它是单调类 ⟺ 它对可数不交并封闭',
      regions: ['analysis'],
      tags: ['定理', '环', '单调类', 'σ-环'],
      statement: [
        '设 𝔄 是一个**环**。则下列三条等价：',
        '',
        '$$𝔄 是 σ-环 ⟺ 𝔄 是单调类 ⟺ 𝔄 对可列不交并封闭$$'
      ].join('\n'),
      notes: [
        '注意前提「𝔄 是环」不可省 —— 单调类一般不封闭于有限并，所以单调类本身推不出 σ-环。',
        '这条定理是单调类定理的技术核心：正是因为它，才能把「对 σ-代数成立」化归为「先验证一个环，再看单调极限」。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §6']
    },

    {
      id: 'def.generated-sigma',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '生成的 σ-代数',
      title: '由 ℰ 生成的 σ-代数 / 单调类：ℳ(ℰ) 与 𝔪(ℰ)',
      regions: ['analysis'],
      tags: ['定义', '生成', 'σ-代数', '单调类'],
      statement: [
        '设 ℰ ⊆ 𝒫(X)。定义',
        '',
        '$$ℳ(ℰ) := ⋂ { 𝔄 : 𝔄 是包含 ℰ 的 σ-代数 }$$',
        '$$𝔪(ℰ) := ⋂ { 𝔄 : 𝔄 是包含 ℰ 的单调类 }$$',
        '',
        'ℳ(ℰ) 称为**由 ℰ 生成的 σ-代数**，𝔪(ℰ) 称为由 ℰ 生成的单调类。'
      ].join('\n'),
      notes: [
        '为什么这样定义是合法的：这个交非空（𝒫(X) 总是一个含 ℰ 的 σ-代数），而且**任意多个 σ-代数之交仍是 σ-代数**（单调类也一样），所以交出来的是最小的那一个。',
        '「生成」是整段里最常用的手法：你给我一族好用的集合（基本类、开集、柱集），我把它补成最小的 σ-代数，再在上面做测度。Borel、积 σ-代数都是这么来的。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §6', 'Folland, Real Analysis, §1.2']
    },

    {
      id: 'thm.monotone-class',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: '单调类定理',
      title: '单调类定理（Monotone Class Theorem）',
      regions: ['analysis'],
      tags: ['定理', '单调类', '生成'],
      statement: [
        '设 ℰ ⊆ 𝒫(X)。则',
        '',
        '$$ℳ(ℰ) = 𝔪(ℰ) ⟺ ∀A ∈ ℰ : Aᶜ ∈ 𝔪(ℰ) 且 ∀A, B ∈ ℰ : A ∩ B ∈ 𝔪(ℰ)$$'
      ].join('\n'),
      notes: [
        '⚠ **这一条我拿不准，两遍读法一致但含义可疑**，已列入待核对的存疑清单。标准叙述是：**若 ℰ 是一个代数，则 𝔪(ℰ) = ℳ(ℰ)**。笔记里把条件写成「ℰ 中集合的补、以及两两之交都落在 𝔪(ℰ) 里」—— 看着像是把「ℰ 是代数」拆开重述的一个变体，但到底是不是，要本人确认。',
        '不论哪个版本，定理的**用法**是一样的：要证某个性质对 ℳ(ℰ) 中所有集合成立，只需（i）证明它对 ℰ 成立，（ii）证明「成立」这件事被递增并、递减交保持 —— 于是成立的集合构成一个含 ℰ 的单调类，它 ⊇ 𝔪(ℰ) = ℳ(ℰ)。',
        '这是测度论里最常用的证明模式之一，后面「唯一性」「可测函数逼近」都会用到它。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §6']
    },

    {
      id: 'def.borel',
      cluster: 'analysis.measure',
      type: 'definition',
      label: 'Borel σ-代数',
      title: 'Borel σ-代数（Borel σ-Algebra 𝔅_X）',
      regions: ['analysis', 'topology'],
      tags: ['定义', 'Borel', '拓扑'],
      statement: [
        '设 X 是拓扑空间。X 上的 **Borel σ-代数**是由全体开集生成的 σ-代数：',
        '',
        '$$𝔅_X := ℳ({ U ⊆ X : U 是开集 })$$',
        '',
        '𝔅_X 中的集合称为 **Borel 集**：开集、闭集、可数个开集之交（G_δ）、可数个闭集之并（F_σ）等都属于 𝔅_X。'
      ].join('\n'),
      notes: [
        '开集族本身一般只是拓扑，不是 σ-代数 —— 取它生成的 σ-代数才得到 Borel 集全体。',
        'ℝ 上 𝔅_ℝ 也可以由半开区间 { (a, b] : a < b } 生成（或 { [a, b) }）。这些形式在构造测度时更好用，因为半开区间的「不交并」算起来干净。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §1.2']
    },

    {
      id: 'def.product-sigma',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '积 σ-代数',
      title: '积 σ-代数（Product σ-Algebra）',
      regions: ['analysis', 'topology'],
      tags: ['定义', '积', '柱集'],
      statement: [
        '设 { (X_α, ℳ_α) }_{α ∈ A} 是一族可测空间，$$X = ∏_{α ∈ A} X_α$$，投影 $$π_α : X → X_α$$。**积 σ-代数**定义为',
        '',
        '$$⊗_{α ∈ A} ℳ_α := ℳ({ π_α^{-1}(E_α) : E_α ∈ ℳ_α, α ∈ A })$$'
      ].join('\n'),
      notes: [
        '即由全体**柱集**生成的 σ-代数。柱集 π_α^{-1}(E_α) 就是「只对第 α 个坐标提要求」的集合。',
        '⚠ 一般**不能**定义成「∏E_α 的全体生成的 σ-代数」—— 那只在**可数**指标集时等价（见下一条）。',
        '这样定义的原因：投影 π_α 应当是可测的，而 σ-代数要对逆像封闭 —— 取最小的那一个就够了。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.1']
    },

    {
      id: 'prop.product-sigma-base',
      cluster: 'analysis.measure',
      type: 'proposition',
      label: '积 σ-代数的生成基',
      title: '命题：把各坐标的 σ-代数换成生成元，积 σ-代数不变',
      regions: ['analysis'],
      tags: ['命题', '积', '生成'],
      statement: [
        '设每个 ℳ_α = ℳ(ℰ_α)（即 ℳ_α 由 ℰ_α 生成）。令',
        '',
        '$$ℱ = { π_α^{-1}(E_α) : E_α ∈ ℰ_α, α ∈ A }$$',
        '',
        '则',
        '',
        '$$⊗_{α ∈ A} ℳ_α = ℳ(ℱ)$$'
      ].join('\n'),
      notes: [
        '意义：算积 σ-代数时，**每一维只需要拿一个生成元族就够了**，不必把整个 ℳ_α 搬进来。',
        '典型用法：ℝ 上取 ℰ = 半开区间 { (a, b] }（它生成 𝔅_ℝ），于是 𝔅_ℝ ⊗ 𝔅_ℝ 已经由形如 (a, b] × (c, d] 的矩形生成 —— 这正是后面 Fubini 定理要用的事实。',
        '证明是「生成」的通用套路：两边都等于「包含 ℱ 的最小 σ-代数」，各自验证 ℱ ⊆ 一边、另一边 ⊆ ℱ。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.1']
    },

    {
      id: 'prop.product-sigma-generated',
      cluster: 'analysis.measure',
      type: 'proposition',
      label: '可数积的生成集',
      title: '命题：指标集可数时，积 σ-代数由「矩形」生成',
      regions: ['analysis'],
      tags: ['命题', '积', '可数'],
      statement: [
        '若指标集 A **可数**，则',
        '',
        '$$⊗_{α ∈ A} ℳ_α = ℳ({ ∏_{α ∈ A} E_α : E_α ∈ ℳ_α })$$',
        '',
        '即：可数积的 σ-代数，恰好是由全体「矩形」生成的 σ-代数。'
      ].join('\n'),
      notes: [
        '笔记里这一条写的是「pf. obvious.」。之所以确实 obvious：A 可数时每个矩形都是**可数多个柱集之交**，',
        '',
        '$$∏_{α ∈ A} E_α = ⋂_{α ∈ A} π_α^{-1}(E_α)$$',
        '',
        '而柱集本来就已经在 σ-代数里了，矩形自然也就在里面；反过来柱集是矩形（其余坐标取全空间）的特例。',
        '⚠ 该结论对**不可数**的 A **不成立** —— 这就是为什么定义必须用柱集而不是矩形。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.1']
    },

    {
      id: 'cor.borel-product',
      cluster: 'analysis.measure',
      type: 'corollary',
      label: '可数积的 Borel 代数',
      title: '推论：可数积距离空间的 Borel σ-代数（可分时相等）',
      regions: ['analysis', 'topology'],
      tags: ['推论', 'Borel', '积', '可分'],
      statement: [
        '设 X_1, X_2, … 是距离空间，$$X = ∏_{j=1}^{∞} X_j$$ 配以积度量。则',
        '',
        '$$⊗_{j=1}^{∞} 𝔅_{X_j} ⊆ 𝔅_X$$',
        '',
        '且当每个 X_j **可分**时，等号成立：',
        '',
        '$$X_j 都可分 ⟹ ⊗_{j=1}^{∞} 𝔅_{X_j} = 𝔅_X$$'
      ].join('\n'),
      notes: [
        '⊆ 的原因很直接：投影 π_j 连续，所以 π_j^{-1}(开集) 是开集，那些柱集都在 𝔅_X 里。',
        '反方向登场的又是「可分」：X_j 可分时取可数稠密集 C_j，则',
        '',
        '$${ B(c, r) : c ∈ C_j, r ∈ ℚ }$$',
        '',
        '是 X_j 的**可数**拓扑基，它已经生成 𝔅_{X_j}。于是 X 的拓扑基由这些基的有限积组成，仍然可数，从而 𝔅_X ⊆ ⊗𝔅_{X_j}。',
        '⚠ 可分性不能省：ℝ^ℝ（不可数积）上，积 σ-代数真包含于 Borel σ-代数。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.1']
    }
  ],

  edges: [

    /* ------------------------- 环 + 单调类 ⟹ σ-环 ------------------------- */
    {
      id: 'imp.ring-monotone-sigma',
      kind: 'implication',
      sources: ['def.set-ring', 'def.monotone-class'],
      target: 'thm.ring-monotone-sigma',
      title: '环 + 单调类 ⟹ σ-环',
      proof: [
        '设 𝔄 是环，且是单调类。要证它对**可数并**封闭。',
        '',
        '**① 先换成不交并。** 给定 A₁, A₂, … ∈ 𝔄，令',
        '',
        '$$B_n = A_n ∖ (A_1 ∪ ⋯ ∪ A_{n-1})$$',
        '',
        '因为 𝔄 是环（对有限并、对差封闭），每个 B_n ∈ 𝔄；而且 B_n 两两不交，并且 ⋃B_n = ⋃A_n。所以只需证 𝔄 对**可数不交并**封闭。',
        '',
        '**② 用单调性。** 若 B_n 两两不交，则部分并 $$C_n = B_1 ∪ ⋯ ∪ B_n$$ 是递增列，且 C_n ∈ 𝔄（环对有限并封闭）。由 𝔄 是单调类，',
        '',
        '$$⋃_{n} C_n = ⋃_{n} B_n = ⋃_{n} A_n ∈ 𝔄$$',
        '',
        '故 𝔄 是可数并封闭的 σ-环。反向（σ-环 ⟹ 单调类）明显，因为递增并、递减交都是可数并/交的特例。∎'
      ].join('\n'),
      note: '这条定理把「σ」这件事等价地翻译成了「对两种单调极限封闭」，单调类定理正是靠它工作的。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.fundamental-props',
      kind: 'definition',
      definition: 'def.fundamental-class',
      usedBy: 'prop.set-class-properties',
      note: '性质 (1)(5) 用的就是基本类的定义。'
    },
    {
      id: 'def-link.ring-props',
      kind: 'definition',
      definition: 'def.set-ring',
      usedBy: 'prop.set-class-properties',
      note: '性质 (2)(3) 是在环 / 代数 / σ-代数的定义上做的。'
    },
    {
      id: 'def-link.ring-monotone-thm',
      kind: 'definition',
      definition: 'def.set-ring',
      usedBy: 'thm.ring-monotone-sigma',
      note: '定理的前提与结论都用了「环 / σ-环」的定义。'
    },
    {
      id: 'def-link.monotone-thm',
      kind: 'definition',
      definition: 'def.monotone-class',
      usedBy: 'thm.ring-monotone-sigma',
      note: '同上，还用了单调类的定义。'
    },
    {
      id: 'def-link.generated-monotone',
      kind: 'definition',
      definition: 'def.generated-sigma',
      usedBy: 'thm.monotone-class',
      note: '单调类定理的陈述里出现 ℳ(ℰ) 与 𝔪(ℰ)，正是上一条定义。'
    },
    {
      id: 'def-link.monotone-class-thm',
      kind: 'definition',
      definition: 'def.monotone-class',
      usedBy: 'thm.monotone-class',
      note: '并用到了单调类的定义。'
    },
    {
      id: 'def-link.generated-borel',
      kind: 'definition',
      definition: 'def.generated-sigma',
      usedBy: 'def.borel',
      note: 'Borel σ-代数就是把「由开集生成」用了一遍。'
    },
    {
      id: 'def-link.generated-product',
      kind: 'definition',
      definition: 'def.generated-sigma',
      usedBy: 'def.product-sigma',
      note: '积 σ-代数也是「生成」出来的。'
    },
    {
      id: 'def-link.product-generated',
      kind: 'definition',
      definition: 'def.product-sigma',
      usedBy: 'prop.product-sigma-generated',
      note: '这条命题比较「柱集生成」与「矩形生成」。'
    },
    {
      id: 'def-link.product-base',
      kind: 'definition',
      definition: 'def.product-sigma',
      usedBy: 'prop.product-sigma-base',
      note: '这条命题说的就是把每一维的 ℳ_α 换成生成元后，积 σ-代数不变。'
    },
    {
      id: 'def-link.generated-product-base',
      kind: 'definition',
      definition: 'def.generated-sigma',
      usedBy: 'prop.product-sigma-base',
      note: '整条命题就是在操作「生成」。'
    },
    {
      id: 'def-link.product-borel',
      kind: 'definition',
      definition: 'def.product-sigma',
      usedBy: 'cor.borel-product',
      note: '推论里左边是积 σ-代数。'
    },
    {
      id: 'def-link.borel-borelproduct',
      kind: 'definition',
      definition: 'def.borel',
      usedBy: 'cor.borel-product',
      note: '推论里右边是 Borel σ-代数。'
    }
  ]
});
