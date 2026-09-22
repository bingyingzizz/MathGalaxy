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
        '- 对**交**封闭：$$A, B \\in \\mathfrak{A} \\implies A \\cap B \\in \\mathfrak{A}$$',
        '- 差可以拆开：$$A, B \\in \\mathfrak{A} \\implies A \\setminus B\\text{ 是} \\mathfrak{A}\\text{ 中有限多个两两不交集合之并}$$'
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
      title: '环与代数（Ring, Algebra）',
      regions: ['analysis'],
      tags: ['定义', '环', '代数'],
      statement: [
        '设 𝔄 ⊆ 𝒫(X) 是 X 的一族子集。',
        '',
        '- 𝔄 是**环**（ring），当且仅当它对有限并封闭、且对差封闭：',
        '',
        '$$A, B \\in \\mathfrak{A} \\implies A \\cup B \\in \\mathfrak{A}, \\quad A \\setminus B \\in \\mathfrak{A}$$',
        '',
        '- 𝔄 是**代数**（algebra），当且仅当 𝔄 是环、且含全集：',
        '',
        '$$X \\in \\mathfrak{A}$$',
        '',
        '**代数 = 环 + X ∈ 𝔄**。「把整个 X 放进去」是唯一的差别。'
      ].join('\n'),
      notes: [
        '环加上 X ∈ 𝔄 之后，差就自动升级成补：$$A^c = X \\setminus A \\in \\mathfrak{A}$$。所以**代数**也等价于「对有限并、对补封闭」。',
        '⚠ 这里的「环」是**集合环**（ring of sets），和抽象代数里的 ring 只是同名，毫无关系。',
        '把「有限」都升级成「可数」，就得到 **σ-环** 与 **σ-代数** —— 另开两条节点写。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §4', 'Folland, Real Analysis, §1.2']
    },

    {
      id: 'def.sigma-ring',
      cluster: 'analysis.measure',
      type: 'definition',
      label: 'σ-环',
      title: 'σ-环（σ-Ring）',
      regions: ['analysis'],
      tags: ['定义', 'σ-环', '集合族'],
      statement: [
        '𝔄 ⊆ 𝒫(X) 是 X 上的一个 **σ-环**，当且仅当把「有限」都换成「可数」之后仍封闭：',
        '',
        '- 对**可数并**封闭：$$A_1, A_2, \\ldots \\in \\mathfrak{A} \\implies \\bigcup_{n=1}^{\\infty} A_n \\in \\mathfrak{A}$$',
        '- 对**差**封闭：$$A, B \\in \\mathfrak{A} \\implies A \\setminus B \\in \\mathfrak{A}$$',
        '',
        '**σ-环 = 环 + 可数并**。它**不要求**含 X —— 这正是它与 σ-代数的唯一差别。'
      ].join('\n'),
      notes: [
        '不含 X 的后果是实质的：σ-环里集合的并可能仍是一个真子集，补运算也落不到里面。',
        '典型例子：X = ℝ 上「全体可数集」是 σ-环，不是 σ-代数 —— 它的元素之并（如 ℝ ∖ ℚ）不在里面。',
        '由差 + 可数并，**可数交**自动可用：$$\\bigcap_n A_n = A_1 \\setminus \\bigcup_{n \\ge 2} (A_1 \\setminus A_n)$$。',
        '与单调类的关系：**环是 σ-环 ⟺ 它是单调类 ⟺ 它对可数不交并封闭**。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §4']
    },

    {
      id: 'def.sigma-algebra',
      cluster: 'analysis.measure',
      type: 'definition',
      label: 'σ-代数',
      title: 'σ-代数（σ-Algebra）',
      regions: ['analysis'],
      tags: ['定义', 'σ-代数', '可测空间', '测度论'],
      statement: [
        '设 X 是集合，𝔄 ⊆ 𝒫(X)。𝔄 是 X 上的一个 **σ-代数**，当且仅当它同时满足三条：',
        '',
        '1. **含全集**：$$X \\in \\mathfrak{A}$$',
        '2. **对补封闭**：$$A \\in \\mathfrak{A} \\implies A^c := X \\setminus A \\in \\mathfrak{A}$$',
        '3. **对可数并封闭**：$$A_1, A_2, \\ldots \\in \\mathfrak{A} \\implies \\bigcup_{n=1}^{\\infty} A_n \\in \\mathfrak{A}$$',
        '',
        '二元组 $$(X, \\mathfrak{A})$$ 称为**可测空间**（measurable space），𝔄 的元素称为**可测集**（measurable set）。'
      ].join('\n'),
      notes: [
        '三条是配套的，缺一不可：只留 (2)(3) 就是**σ-环**；把 (3) 降成「有限并」就是**代数**。',
        '由 (2)(3) 用 De Morgan 立得对**可数交**封闭：$$\\Big( \\bigcap_n A_n \\Big)^c = \\bigcup_n A_n^c \\in \\mathfrak{A}$$。于是有限并、有限交、差、对称差全都可用 —— 真正超出「代数」的，只有**可数**这一件事。',
        '⚠ 方向不能反：σ-代数一定是代数，代数不一定是 σ-代数。反例：X = ℝ 上「有限集与余有限集」全体是代数，而 ℕ = {1} ∪ {2} ∪ {3} ∪ ⋯ 是其中可数多个元素的并、本身既非有限也非余有限，所以那个代数不封闭于可数并。',
        '记号里的「σ」表示**可数**（取自德文 Summe / 法文 somme 的首字母），和标准差那个 σ 无关。',
        '为什么非要有它：测度的可数可加性 μ(⋃Aₙ) = Σμ(Aₙ) 需要一个对**可数**运算封闭的定义域，否则等式两边根本不在同一个集合族里。整条测度构造就是从这里起步的。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §4', 'Folland, Real Analysis, §1.2', 'Rudin, Real and Complex Analysis, Ch. 1']
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
        '$$\\{E_j\\}_{j=1}^{\\infty} \\nearrow  \\implies \\bigcup_{j=1}^{\\infty} E_j \\in \\mathfrak{A}$$',
        '$$\\{E_j\\}_{j=1}^{\\infty} \\searrow  \\implies \\bigcap_{j=1}^{\\infty} E_j \\in \\mathfrak{A}$$'
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
        '$$\\mathfrak{A} = \\{ \\mathcal{E}\\text{ 中有限多个两两不交集合之并} \\}$$',
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
        '$$\\mathfrak{A}\\text{ 是} \\sigma-\\text{环} \\iff \\mathfrak{A}\\text{ 是单调类} \\iff \\mathfrak{A}\\text{ 对可列不交并封闭}$$'
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
        '$$\\mathcal{M}(\\mathcal{E}) := \\bigcap \\{ \\mathfrak{A} : \\mathfrak{A}\\text{ 是包含} \\mathcal{E}\\text{ 的} \\sigma-\\text{代数} \\}$$',
        '$$\\mathfrak{m}(\\mathcal{E}) := \\bigcap \\{ \\mathfrak{A} : \\mathfrak{A}\\text{ 是包含} \\mathcal{E}\\text{ 的单调类} \\}$$',
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
        '$$\\mathcal{M}(\\mathcal{E}) = \\mathfrak{m}(\\mathcal{E}) \\iff \\forall A \\in \\mathcal{E} : A^c \\in \\mathfrak{m}(\\mathcal{E})\\text{ 且} \\forall A, B \\in \\mathcal{E} : A \\cup B \\in \\mathfrak{m}(\\mathcal{E})$$'
      ].join('\n'),
      notes: [
        '**这条比教科书上的标准版更强，而且是对的。** 标准版（Halmos §6）要求 ℰ 本身是一个**代数**；这里只要求 ℰ 中集合的**补**与**并**落进 𝔪(ℰ) 就行 —— 条件松了一档。证明仍是单调类定理那三步，只是把「ℰ 是代数」换成这两条：',
        '**①** 令 𝒦₁ = {A ∈ 𝔪 : Aᶜ ∈ 𝔪}。它含 ℰ（第一条条件），且本身是单调类（𝔪 单调 ⇒ 极限仍在 𝔪；补用一次递减极限）⇒ 𝒦₁ = 𝔪，即 𝔪 对**补**封闭。',
        '**②** 固定 A ∈ ℰ，令 𝒦₂ = {B ∈ 𝔪 : A ∪ B ∈ 𝔪}。由第二条条件 𝒦₂ ⊇ ℰ ⇒ 𝒦₂ = 𝔪。',
        '**③** 固定 B ∈ 𝔪，令 𝒦₃ = {A ∈ 𝔪 : A ∪ B ∈ 𝔪}。由 ② 知 𝒦₃ ⊇ ℰ ⇒ 𝒦₃ = 𝔪，即 𝔪 对**并**封闭。',
        '于是 𝔪 对 ∪ 与补封闭、又是单调类 ⇒ 𝔪 是一个 σ-代数 ⇒ ℳ(ℰ) ⊆ 𝔪(ℰ)；反向恒成立，两边相等。（需 ℰ ≠ ∅，否则 𝔪(ℰ) = {∅}。）',
        '⚠ 笔记原稿这个条件里用的是 **∪**（本人 2026-09-22 确认）。顺带一提，把 ∪ 换成 ∩ 或 ∖ 结论同样成立 —— 有了补封闭，几种封闭性互相推得出来，所以这一处的符号并不影响定理对不对。',
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
        '$$\\mathfrak{B}_X := \\mathcal{M}(\\{ U \\subseteq X : U\\text{ 是开集} \\})$$',
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
        '设 { (X_α, ℳ_α) }_{α ∈ A} 是一族可测空间，$$X = \\prod_{\\alpha \\in A} X_\\alpha$$，投影 $$\\pi _\\alpha : X \\to X_\\alpha$$。**积 σ-代数**定义为',
        '',
        '$$\\otimes _{\\alpha \\in A} \\mathcal{M}_\\alpha := \\mathcal{M}(\\{ \\pi _\\alpha^{-1}(E_\\alpha) : E_\\alpha \\in \\mathcal{M}_\\alpha, \\alpha \\in A \\})$$'
      ].join('\n'),
      notes: [
        '即由全体**柱集**生成的 σ-代数。柱集 π_α⁻¹(E_α) 就是「只对第 α 个坐标提要求」的集合。',
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
        '$$\\mathcal{F} = \\{ \\pi _\\alpha^{-1}(E_\\alpha) : E_\\alpha \\in \\mathcal{E}_\\alpha, \\alpha \\in A \\}$$',
        '',
        '则',
        '',
        '$$\\otimes _{\\alpha \\in A} \\mathcal{M}_\\alpha = \\mathcal{M}(\\mathcal{F})$$'
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
        '$$\\otimes _{\\alpha \\in A} \\mathcal{M}_\\alpha = \\mathcal{M}(\\{ \\prod_{\\alpha \\in A} E_\\alpha : E_\\alpha \\in \\mathcal{M}_\\alpha \\})$$',
        '',
        '即：可数积的 σ-代数，恰好是由全体「矩形」生成的 σ-代数。'
      ].join('\n'),
      notes: [
        '笔记里这一条写的是「pf. obvious.」。之所以确实 obvious：A 可数时每个矩形都是**可数多个柱集之交**，',
        '',
        '$$\\prod_{\\alpha \\in A} E_\\alpha = \\bigcap_{\\alpha \\in A} \\pi _\\alpha^{-1}(E_\\alpha)$$',
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
        '设 X₁, X₂, … 是距离空间，$$X = \\prod_{j=1}^{\\infty} X_j$$ 配以积度量。则',
        '',
        '$$\\otimes _{j=1}^{\\infty} \\mathfrak{B}_{X_j} \\subseteq \\mathfrak{B}_X$$',
        '',
        '且当每个 Xⱼ **可分**时，等号成立：',
        '',
        '$$X_j\\text{ 都可分} \\implies \\otimes _{j=1}^{\\infty} \\mathfrak{B}_{X_j} = \\mathfrak{B}_X$$'
      ].join('\n'),
      notes: [
        '⊆ 的原因很直接：投影 πⱼ 连续，所以 πⱼ⁻¹(开集) 是开集，那些柱集都在 𝔅_X 里。',
        '反方向登场的又是「可分」：Xⱼ 可分时取可数稠密集 Cⱼ，则',
        '',
        '$$\\{ B(c, r) : c \\in C_j, r \\in \\mathbb{Q} \\}$$',
        '',
        '是 Xⱼ 的**可数**拓扑基，它已经生成 𝔅_{Xⱼ}。于是 X 的拓扑基由这些基的有限积组成，仍然可数，从而 𝔅_X ⊆ ⊗𝔅_{Xⱼ}。',
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
        '$$B_n = A_n \\setminus (A_1 \\cup \\cdots \\cup A_{n-1})$$',
        '',
        '因为 𝔄 是环（对有限并、对差封闭），每个 Bₙ ∈ 𝔄；而且 Bₙ 两两不交，并且 ⋃Bₙ = ⋃Aₙ。所以只需证 𝔄 对**可数不交并**封闭。',
        '',
        '**② 用单调性。** 若 Bₙ 两两不交，则部分并 $$C_n = B_1 \\cup \\cdots \\cup B_n$$ 是递增列，且 Cₙ ∈ 𝔄（环对有限并封闭）。由 𝔄 是单调类，',
        '',
        '$$\\bigcup_n C_n = \\bigcup_n B_n = \\bigcup_n A_n \\in \\mathfrak{A}$$',
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
    },

    /* ------------------- 新拆出来的 σ-环 / σ-代数 两条定义 ------------------- */
    {
      id: 'def-link.sigmaring-ring',
      kind: 'definition',
      definition: 'def.set-ring',
      usedBy: 'def.sigma-ring',
      note: 'σ-环就是把「环」里的有限并升级成可数并，其余（对差封闭）照旧。'
    },
    {
      id: 'def-link.sigmaalgebra-sigmaring',
      kind: 'definition',
      definition: 'def.sigma-ring',
      usedBy: 'def.sigma-algebra',
      note: 'σ-代数 = σ-环 + X ∈ 𝔄，只多这一条。'
    },
    {
      id: 'def-link.sigmaalgebra-ringmonotone',
      kind: 'definition',
      definition: 'def.sigma-algebra',
      usedBy: 'thm.ring-monotone-sigma',
      note: '这条判据的结论是「𝔄 是 σ-环」；若 𝔄 还含 X，就一并是 σ-代数。'
    },
    {
      id: 'def-link.sigmaalgebra-monotonethm',
      kind: 'definition',
      definition: 'def.sigma-algebra',
      usedBy: 'thm.monotone-class',
      note: '单调类定理的两端，一个是由 ℰ 生成的 σ-代数 ℳ(ℰ)、一个是单调类 𝔪(ℰ)。'
    },
    {
      id: 'def-link.sigmaalgebra-generated',
      kind: 'definition',
      definition: 'def.sigma-algebra',
      usedBy: 'def.generated-sigma',
      note: '「生成的 σ-代数」＝ 一切包含 ℰ 的 σ-代数之交。'
    },
    {
      id: 'def-link.sigmaalgebra-borel',
      kind: 'definition',
      definition: 'def.sigma-algebra',
      usedBy: 'def.borel',
      note: 'Borel σ-代数就是「由开集这个生成元生成的 σ-代数」。'
    },
    {
      id: 'def-link.sigmaalgebra-product',
      kind: 'definition',
      definition: 'def.sigma-algebra',
      usedBy: 'def.product-sigma',
      note: '积 σ-代数也只是 σ-代数，生成元换成「矩形」而已。'
    }
  ]
});
