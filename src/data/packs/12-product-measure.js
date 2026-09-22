/* ==========================================================================
   内容包 · 乘积测度与 Fubini 定理
   --------------------------------------------------------------------------
   来自手写笔记「总结：积分」第 6 ~ 8 页。

   三步：
     ① 矩形上的预测度 π  ──Carathéodory──▶  乘积测度 μ×ν
     ② 截口 Eₓ、Eʸ     ──▶  乘积测度由截口的积分给出（靠单调类引理）
     ③ Fubini–Tonelli    ──▶  重积分可以交换次序

   ⚠ 全程 σ-有限是硬条件；μ、ν 完备时 μ×ν 反而**常常不完备**（最后一节）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '乘积测度与 Fubini',
  nodes: [

    {
      id: 'def.product-measure',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '乘积测度',
      title: '乘积测度（Product Measure μ × ν）',
      regions: ['analysis'],
      tags: ['定义', '乘积测度', '矩形', 'Carathéodory'],
      statement: [
        '设 (X, ℳ, μ) 与 (Y, 𝒩, ν) 是测度空间。',
        '',
        '**① 矩形**：形如 $$A × B$$（$$A ∈ ℳ$$，$$B ∈ 𝒩$$）的集合叫（可测）矩形。全体矩形**生成** $$ℳ ⊗ 𝒩$$。',
        '',
        '**② 矩形上的预测度**：令 𝒜 为**矩形的有限不交并**全体。对',
        '',
        '$$E = ⨆_{j=1}^{n} (Aⱼ × Bⱼ)$$',
        '',
        '定义',
        '',
        '$$π(E) := ∑_{j=1}^{n} μ(Aⱼ) ν(Bⱼ)$$',
        '',
        '则 π 是代数 𝒜 上的**预测度**。',
        '',
        '**③ 扩张**：π 诱导 X × Y 上的外测度，限制在 $$ℳ ⊗ 𝒩$$ 上得到一个测度，记作',
        '',
        '$$μ × ν$$',
        '',
        '即**乘积测度**。'
      ].join('\n'),
      notes: [
        '$$π$$ 的良定义要检查（同一个 E 可以拆成不同的矩形不交并）—— 这正是要把「矩形」换成「矩形的**不交**并」的原因：不交并之下加法好验。',
        '**σ-有限的时候一切顺利**：若 μ、ν 都 σ-有限，则 μ×ν 也 σ-有限，而且由 Carathéodory 唯一性，这样造出来的测度是唯一的。',
        '⚠ 这一步的整个机器（预测度 → 外测度 → Carathéodory 扩张 → 唯一性）就是「测度的构造」那个星团里现成的四件套。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.5', 'Halmos, Measure Theory, §35']
    },

    {
      id: 'def.section',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '截口',
      title: '截口（Section）Eₓ 与 Eʸ',
      regions: ['analysis'],
      tags: ['定义', '截口'],
      statement: [
        '设 $$E ⊆ X × Y$$。对 $$x ∈ X$$、$$y ∈ Y$$ 定义',
        '',
        '$$Eₓ := {y ∈ Y : (x, y) ∈ E}$$',
        '$$Eʸ := {x ∈ X : (x, y) ∈ E}$$',
        '',
        '分别叫 E 在 x 处的**纵截口**与在 y 处的**横截口**。',
        '',
        '类似地，对函数 $$f : X × Y → ℂ$$ 定义',
        '',
        '$$fₓ(y) := fʸ(x) := f(x, y)$$'
      ].join('\n'),
      notes: [
        '直观：把平面图形用一根竖线（或横线）切一刀，切出来的那条线段就是截口。',
        '截口是 Fubini 定理的语言：重积分 $$∬ f d(μ × ν)$$ 就是「先沿截口积一次，再把各条截口的积分对另一变量积一次」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.5']
    },

    {
      id: 'prop.section-measurable',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '截口可测',
      title: '命题：可测集的截口可测，可测函数的截口可测',
      regions: ['analysis'],
      tags: ['命题', '截口', '可测'],
      statement: [
        '**(a)** 若 $$E ∈ ℳ ⊗ 𝒩$$，则对一切 $$x ∈ X$$ 有 $$Eₓ ∈ 𝒩$$，对一切 $$y ∈ Y$$ 有 $$Eʸ ∈ ℳ$$。',
        '',
        '**(b)** 若 $$f$$ 是 $$ℳ ⊗ 𝒩$$-可测的，则对一切 $$x$$ 有 $$fₓ$$ 是 $$𝒩$$-可测的，对一切 $$y$$ 有 $$fʸ$$ 是 $$ℳ$$-可测的。'
      ].join('\n'),
      notes: [
        '证明是一个「先看矩形、再看 σ-代数」的标准套路：令',
        '',
        '$$ℛ = {E ⊆ X × Y : Eₓ ∈ 𝒩 且 Eʸ ∈ ℳ　∀(x, y)}$$',
        '',
        '则 ℛ 包含所有矩形，而且**ℛ 是一个 σ-代数**（截口运算保持并、交、补）。于是 ℛ ⊇ ℳ ⊗ 𝒩。',
        '(b) 由 (a) 与两条恒等式得到：',
        '',
        '$$fₓ⁻¹(B) = (f⁻¹(B))ₓ，　fʸ⁻¹(B) = (f⁻¹(B))ʸ$$',
        '',
        '⚠ 注意 (b) 说的是「**每一个** x 都行」，而 Fubini 定理里只能保证「几乎每一个」—— 那是因为 Fubini 还要它可积。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.34']
    },

    {
      id: 'lem.monotone-class-lemma',
      cluster: 'analysis.integral',
      type: 'lemma',
      label: '单调类引理',
      title: '单调类引理（Monotone Class Lemma）',
      regions: ['analysis'],
      tags: ['引理', '单调类', '代数'],
      statement: [
        '若 𝒜 是一个**代数**，则由 𝒜 生成的单调类就是由 𝒜 生成的 σ-代数：',
        '',
        '$$𝒜 是代数 ⟹ 𝔪(𝒜) = ℳ(𝒜)$$'
      ].join('\n'),
      notes: [
        '⭐ 这一条是证明「某个 σ-代数里所有集合都满足性质 P」的**标准武器**，用法固定两步：',
        '',
        '1. 验证 P 对所有矩形（或 𝒜 中元素）成立；',
        '2. 验证「满足 P 的集合」构成一个含 𝒜 的**单调类**。',
        '',
        '于是 P 对 𝔪(𝒜) = ℳ(𝒜) 中所有集合成立。',
        '⚠ 与「测度的构造」里那条「环 → σ-环 的判据」是姊妹结果：那条说环 + 单调 ⟹ σ-环，这条说代数 ⟹ 单调类与 σ-代数重合。',
        '📌 笔记第 6 页把这条写得很清楚，正好也印证了第 2 页上那条「ℳ(ℰ) = 𝔪(ℰ)」的存疑 —— 标准形式就是「𝒜 是代数」这个前提。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.37', 'Halmos, Measure Theory, §6']
    },

    {
      id: 'thm.product-measure-sections',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '乘积测度由截口给出',
      title: '定理：μ × ν(E) = ∫ ν(Eₓ) dμ(x) = ∫ μ(Eʸ) dν(y)',
      regions: ['analysis'],
      tags: ['定理', '乘积测度', '截口'],
      statement: [
        '设 (X, ℳ, μ)、(Y, 𝒩, ν) 都是 **σ-有限**的，$$E ∈ ℳ ⊗ 𝒩$$。则',
        '',
        '- $$x ↦ ν(Eₓ)$$ 在 X 上可测；',
        '- $$y ↦ μ(Eʸ)$$ 在 Y 上可测；',
        '',
        '并且',
        '',
        '$$μ × ν(E) = ∫_X ν(Eₓ) dμ(x) = ∫_Y μ(Eʸ) dν(y)$$'
      ].join('\n'),
      notes: [
        '这是 Fubini 定理的「集合版本」—— 把函数换成指示函数就是 Fubini。',
        '证明的结构：先设 μ、ν **有限**，令',
        '',
        '$$𝒞 = {E ∈ ℳ ⊗ 𝒩 : 上面两条都成立}$$',
        '',
        '- 矩形 $$E = A × B$$：$$ν(Eₓ) = χ_A(x) ν(B)$$，立刻成立；',
        '- 𝒞 对**递增并**封闭（用 MCT）；对**递减交**也封闭（用 DCT）；',
        '',
        '于是 𝒞 是一个**单调类**，含所有矩形。矩形族生成的代数由矩形构成，再由单调类引理升级到整个 $$ℳ ⊗ 𝒩$$。',
        '最后把「有限」推广到「σ-有限」：取 $$X × Y = ⋃ (Xᵢ × Yᵢ)$$，对每个 $$E ∩ (Xᵢ × Yᵢ)$$ 用已经证好的有限情形，再用 MCT 求和。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.36']
    },

    {
      id: 'thm.fubini-tonelli',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: 'Fubini–Tonelli',
      title: 'Fubini–Tonelli 定理（重积分可交换次序）',
      regions: ['analysis'],
      tags: ['定理', 'Fubini', 'Tonelli', '重积分'],
      statement: [
        '设 (X, ℳ, μ)、(Y, 𝒩, ν) 是 **σ-有限**的测度空间。',
        '',
        '**(a) Tonelli（非负情形，无附加条件）**：若 $$f ∈ L⁺(X × Y)$$，则',
        '',
        '$$∫ fₓ dν ∈ L⁺(X)，　∫ fʸ dμ ∈ L⁺(Y)$$',
        '',
        '且',
        '',
        '$$∫ f d(μ × ν) = ∫_X ( ∫_Y f(x, y) dν(y) ) dμ(x) = ∫_Y ( ∫_X f(x, y) dμ(x) ) dν(y)$$',
        '',
        '**(b) Fubini（可积情形）**：若 $$f ∈ L¹(μ × ν)$$，则',
        '',
        '- $$fₓ ∈ L¹(ν)$$ 对 a.e. x 成立，$$fʸ ∈ L¹(μ)$$ 对 a.e. y 成立；',
        '- $$∫ fₓ dν ∈ L¹(μ)$$、$$∫ fʸ dμ ∈ L¹(ν)$$（都在 a.e. 意义下有定义）；',
        '- 上面那两个三重等式同样成立。'
      ].join('\n'),
      notes: [
        '⭐ **Tonelli 不需要任何附加条件**（非负就够了），所以实际使用时通常先拿它「试算」：如果两个累次积分里有一个算出来是有限数，那就说明 f 可积，于是可以放心换序。',
        '**Fubini 则必须假定可积** —— 否则一边是 +∞、一边是 −∞，换序会出事。',
        '⚠ 反例（不是可积但累次积分不等）：在 [0,1]² 上取 $$f(x, y) = (x² − y²) / (x² + y²)³$$ 之类，两个累次积分会互为相反数。',
        '⚠ σ-有限不能省：在「ℝ 上的计数测度 × Lebesgue 测度」这种情形下，单调类引理的论证会崩，Fubini 会得出荒谬的结论（对角线上的经典反例）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.37']
    },

    {
      id: 'thm.fubini-complete',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '完备情形的 F–T',
      title: '定理：完备化的乘积测度上，Fubini–Tonelli 仍然成立',
      regions: ['analysis'],
      tags: ['定理', 'Fubini', '完备化'],
      statement: [
        '设 (X, ℳ, μ)、(Y, 𝒩, ν) 都是**完备**的 σ-有限测度空间，$$(X × Y, ℒ, λ)$$ 是',
        '',
        '$$(X × Y, ℳ ⊗ 𝒩, μ × ν)$$',
        '',
        '的**完备化**。设 f 是 ℒ-可测的。',
        '',
        '- 若 $$f ≥ 0$$ 或 $$f ∈ L¹(λ)$$：$$fₓ$$ 对 a.e. x 是 𝒩-可测的，$$fʸ$$ 对 a.e. y 是 ℳ-可测的；',
        '- 若 $$f ∈ L¹(λ)$$：$$fₓ$$、$$fʸ$$ 对 a.e. 的 x、y 可积；并且 $$x ↦ ∫ fₓ dν$$、$$y ↦ ∫ fʸ dμ$$ 可测；',
        '- 此时',
        '',
        '$$∫ f dλ = ∫_X ( ∫_Y f dν ) dμ = ∫_Y ( ∫_X f dμ ) dν$$'
      ].join('\n'),
      notes: [
        '为什么需要这一条：**μ×ν 通常不完备**（见下一条），所以 Riesz 意义上的「可积函数」往往落在完备化 λ 里，而不是 ℳ⊗𝒩 里。',
        '代价是所有的断言都退化成「**对几乎处处的 x / y**」—— 因为 ℒ 里多出来的那些集合只在零集上有区别。',
        '证明的核心（笔记里的原话：「先证 f ≥ 0。若 f = χ_E，E = F ∪ G 其中 F ∈ ℳ⊗𝒩、G ⊆ H 且 μ×ν(H) = 0，设不交并，则 f = χ_F + χ_G。χ_F ✓（归 Fubini–Tonelli），χ_G ✓（因为每条截口的测度都是 0）。**应该是核心思想，其余都类似**」）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.39']
    },

    {
      id: 'prop.product-incomplete',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '乘积测度通常不完备',
      title: '注记：μ、ν 完备时，μ × ν 常常不完备',
      regions: ['analysis'],
      tags: ['注记', '完备', '乘积测度'],
      statement: [
        '即使 μ 与 ν 都**完备**，$$μ × ν$$ 也**经常是不完备的**：存在 $$E ∈ ℳ ⊗ 𝒩$$ 使 $$μ × ν(E) = 0$$，但 E 有子集不属于 $$ℳ ⊗ 𝒩$$。'
      ].join('\n'),
      notes: [
        '这就是为什么必须单独有「完备情形的 F–T」：实际用的时候（比如 ℝ² 上的 Lebesgue 测度）我们手里的往往是**完备化之后**的测度，而不是原始的 μ×ν。',
        '笔记第 7 页特意把这一句单独写出来（"Notice that if μ, ν are complete, μ × ν often incomplete."），说明这是个容易踩的坑。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.5']
    }
  ],

  edges: [

    {
      id: 'imp.product-measure',
      kind: 'implication',
      sources: ['def.premeasure', 'thm.caratheodory'],
      target: 'def.product-measure',
      title: '矩形上的预测度 ⟹ Carathéodory 扩张得到乘积测度',
      proof: [
        '**① π 是良定义的。** 设 E 有两种矩形不交并的写法。把两边的矩形再交叉细分成最小的那些块（$$Aⱼ ∩ Aₖ′$$ × $$Bⱼ ∩ Bₖ′$$），π 的值不变 —— 因为 μ、ν 在各自那一侧都是有限可加的。',
        '',
        '**② π 是 𝒜 上的预测度。** 𝒜 = 矩形的有限不交并，是代数（矩形的不交并再取差仍是有限个矩形块）。可数可加性由 μ、ν 各自的可数可加性得到：把可数个不交的矩形块按两个方向分别整理成不交并。',
        '',
        '**③ 用 Carathéodory 扩张。** 由「预测度 → 外测度 → 可测集 → 扩张测度」那一整套：π 诱导出 X × Y 上的外测度 μ*，全体 μ*-可测集构成 σ-代数，μ* 在其上成为测度；而代数 𝒜 中每个集合都是 μ*-可测的，且 μ*|_𝒜 = π。',
        '',
        '**④ 落到 ℳ ⊗ 𝒩 上。** 𝒜 含所有矩形，故 𝒜 生成 ℳ ⊗ 𝒩 ⊆ (μ*-可测集)；把 μ* 限制在 ℳ ⊗ 𝒩 上，就是所要的测度 μ × ν，它在矩形上取值 $$μ × ν(A × B) = μ(A) ν(B)$$。∎',
        '',
        '> ⭐ 这一段没有任何新东西 —— 全是把「测度的构造」那个星团的机器搬过来用一次。这也正是那个星团存在的理由：**它是所有具体测度的生产线**。'
      ].join('\n')
    },

    {
      id: 'imp.section-measurable',
      kind: 'implication',
      sources: ['def.section'],
      target: 'prop.section-measurable',
      title: '截口的定义 ⟹ 截口保持可测性',
      proof: [
        '**(a)** 令 $$ℛ = {E ⊆ X × Y : Eₓ ∈ 𝒩 且 Eʸ ∈ ℳ　∀(x, y) ∈ X × Y}$$。',
        '',
        '- **ℛ 含所有矩形**：若 $$E = A × B$$，则',
        '',
        '$$Eₓ = B　(x ∈ A)，　Eₓ = ∅　(x ∉ A)$$',
        '',
        '两边都在 𝒩 里（𝒩 含 ∅）；横截口同理。',
        '',
        '- **ℛ 是 σ-代数**：截口运算保持并、交、补 —— 例如 $$(⋃ₙ E^{(n)})ₓ = ⋃ₙ E^{(n)}ₓ$$、$$(Eᶜ)ₓ = (Eₓ)ᶜ$$（这里用的是 Y 在 X × Y 中的「竖条」补集）。故 ℛ 对可数并与补封闭。',
        '',
        '于是 ℛ ⊇ ℳ(矩形族) = ℳ ⊗ 𝒩，(a) 得证。',
        '',
        '**(b)** 设 f 是 ℳ⊗𝒩-可测，B ⊆ ℂ 可测。则',
        '',
        '$$fₓ⁻¹(B) = {y : f(x, y) ∈ B} = (f⁻¹(B))ₓ$$',
        '',
        '而 $$f⁻¹(B) ∈ ℳ ⊗ 𝒩$$，由 (a) 它的纵截口属于 𝒩，即 $$fₓ⁻¹(B) ∈ 𝒩$$。所以 $$fₓ$$ 可测。横截口同理。∎'
      ].join('\n')
    },

    {
      id: 'imp.product-sections',
      kind: 'implication',
      sources: ['lem.monotone-class-lemma', 'prop.section-measurable'],
      target: 'thm.product-measure-sections',
      title: '单调类引理 ⟹ 乘积测度由截口积分给出',
      proof: [
        '**① 先设 μ、ν 有限。** 令 $$𝒞 = {E ∈ ℳ ⊗ 𝒩 : x ↦ ν(Eₓ) 可测，y ↦ μ(Eʸ) 可测，且 μ×ν(E) = ∫ν(Eₓ)dμ = ∫μ(Eʸ)dν}$$。',
        '',
        '**② 矩形在 𝒞 里。** 若 $$E = A × B$$，则 $$ν(Eₓ) = χ_A(x)·ν(B)$$，它是可测的（指示函数 × 常数），且',
        '',
        '$$∫ ν(Eₓ) dμ(x) = ν(B)·μ(A) = μ × ν(A × B)$$',
        '',
        '**③ 𝒞 对递增并封闭。** 若 $$E₁ ⊆ E₂ ⊆ ⋯$$ 都在 𝒞 中、$$E = ⋃ Eₙ$$：则 $$ν((Eₙ)ₓ) ↗ ν(Eₓ)$$（测度的下连续性），由 MCT 得 $$x ↦ ν(Eₓ)$$ 可测且 $$∫ν(Eₓ)dμ = lim ∫ν((Eₙ)ₓ)dμ = lim μ×ν(Eₙ) = μ×ν(E)$$。',
        '',
        '**④ 𝒞 对递减交封闭。** 若 $$E₁ ⊇ E₂ ⊇ ⋯$$、$$E = ⋂Eₙ$$：因为测度有限，可以用 DCT（控制函数是常数 $$ν(Y) < ∞$$）得到同样的等式。',
        '',
        '**⑤ 用单调类引理。** 由 ①②③④，𝒞 是含所有矩形的一个**单调类**。矩形族生成的**代数**再由矩形构成，所以 𝒞 含这个代数；由单调类引理，$$𝔪(代数) = ℳ(代数) = ℳ ⊗ 𝒩$$，于是 𝒞 = ℳ ⊗ 𝒩。',
        '',
        '**⑥ 推广到 σ-有限。** 取 $$X = ⋃ᵢ Xᵢ$$、$$Y = ⋃ᵢ Yᵢ$$（各自测度有限），则 $$X × Y = ⋃ᵢ (Xᵢ × Yᵢ)$$。对每个 i，把 ⑤ 用在 $$E ∩ (Xᵢ × Yᵢ)$$ 上（这一步只用到**有限**测度）；再把 i 加起来，用 MCT 对 i 求极限即可。∎',
        '',
        '> ⚠ σ-有限正是在 ⑥ 用掉的：没有它，就没法把无穷测度的空间切成可数块有限块。'
      ].join('\n')
    },

    {
      id: 'imp.tonelli',
      kind: 'implication',
      sources: ['thm.product-measure-sections', 'thm.mct'],
      target: 'thm.fubini-tonelli',
      title: '集合版（截口公式）+ MCT ⟹ Tonelli',
      proof: [
        '**① 指示函数。** 取 $$f = χ_E$$（$$E ∈ ℳ ⊗ 𝒩$$）。此时',
        '',
        '$$∫_Y f(x, y) dν(y) = ν(Eₓ)，　∫_X f(x, y) dμ(x) = μ(Eʸ)$$',
        '',
        '于是三重等式正是上一条定理的内容。',
        '',
        '**② 简单函数。** 由线性推广到 $$f = ∑ⱼ aⱼ χ_{Eⱼ}$$（$$aⱼ ≥ 0$$，Eⱼ 不交）。',
        '',
        '**③ 非负可测函数。** 取简单函数列 $${fₙ} ↗ f$$（简单函数逼近定理）。令',
        '',
        '$$gₙ(x) = ∫ fₙ(x, y) dν(y)，　g(x) = ∫ f(x, y) dν(y)$$',
        '',
        '由 $$fₙ ↑ f$$ 与积分的单调性，$${gₙ}$$ 递增；由 **MCT**，$$g = limₙ gₙ$$ 且',
        '',
        '$$∫ g dμ = limₙ ∫ gₙ dμ$$',
        '',
        '再由 ② 对每个 n 的三重等式，',
        '',
        '$$∫ gₙ dμ = ∫ fₙ d(μ × ν)$$',
        '',
        '于是',
        '',
        '$$∫_X ( ∫_Y f dν ) dμ = limₙ ∫ fₙ d(μ × ν) = ∫ f d(μ × ν)$$',
        '',
        '（最后一步又用一次 MCT。）另一边对称。**这就是 Tonelli，全程不需要可积性。**',
        '',
        '**④ Fubini。** 设 $$f ∈ L¹(μ × ν)$$。把 f 拆成 $$Re f⁺、Re f⁻、Im f⁺、Im f⁻$$ 四个非负部分，对每一部分用 ③。由',
        '',
        '$$∫ |f| d(μ × ν) < ∞$$',
        '',
        '和 ③ 的三重等式，得到 $$∫_X (∫_Y |f| dν) dμ < ∞$$，故 $$∫_Y |f(x, ·)| dν < ∞$$ 对 **a.e.** x 成立 —— 即 $$fₓ ∈ L¹(ν)$$ a.e.；同理 $$fʸ ∈ L¹(μ)$$ a.e.。既然两个累次积分都已经是有限数，就可以直接相减、不再有 ∞ − ∞ 的危险，三重等式对 f 成立。∎',
        '',
        '> ⭐ 分工很干净：**Tonelli 负责非负（无条件），Fubini 用「可积」把四个非负部分的结论拼起来**。'
      ].join('\n')
    },

    {
      id: 'imp.fubini-complete',
      kind: 'implication',
      sources: ['thm.fubini-tonelli', 'thm.completion', 'prop.product-incomplete'],
      target: 'thm.fubini-complete',
      title: '乘积测度通常不完备 ⟹ 必须补一条完备情形的 F–T',
      proof: [
        '**① 先证 f ≥ 0 的情形。** 由于 λ 是 μ×ν 的完备化，$$ℒ$$ 中的集合可以写成',
        '',
        '$$E = F ∪ G，　F ∈ ℳ ⊗ 𝒩，　G ⊆ H，　μ × ν(H) = 0$$',
        '',
        '（取不交化后即 $$E = F ⊔ G$$，于是 $$χ_E = χ_F + χ_G$$。）',
        '',
        '**② $$χ_F$$ 那一半没问题** —— 直接归 Fubini–Tonelli（F ∈ ℳ⊗𝒩）。',
        '',
        '**③ $$χ_G$$ 那一半也没问题** —— 因为 $$G ⊆ H$$ 而 μ×ν(H) = 0，所以对**每一个** x 都有 $$ν(Gₓ) ≤ ν(Hₓ) = 0$$（H 的截口是 ν-零集，这一步用截口公式对 H 本身成立），于是',
        '',
        '$$∫ χ_G dλ = 0 = ∫ ( ∫ χ_G dν ) dμ$$',
        '',
        '两边都是 0。（对 a.e. 的 x，$$Gₓ$$ 是 ν-零集。）',
        '',
        '**④ 由线性推广到非负简单函数，再用 MCT 推广到一切 $$f ≥ 0$$。** 关键点：完备化只多出「含在零集里的部分」，而这部分对积分的贡献恒为 0，所以整段论证不会被破坏。',
        '',
        '**⑤ 一般情形**：把 f 拆成 $$Re f^±、Im f^±$$ 四个非负部分，逐块用 ④ —— 但此时所有断言都退化成「对 a.e. 的 x / y」，因为零集上的截口行为不再逐一可控。∎',
        '',
        '> 笔记里的原话把要点概括得很准：**「应该是核心思想，其余都类似。」** —— 核心就是把 E 拆成 F ⊔ G，F 归老定理、G 归「截口都是零集」。'
      ].join('\n')
    },

    {
      id: 'imp.product-incomplete',
      kind: 'implication',
      sources: ['def.product-measure'],
      target: 'prop.product-incomplete',
      title: '乘积测度通常不完备',
      proof: [
        '取 $$X = Y = [0, 1]$$，μ = ν = Lebesgue 测度（都是完备的）。令',
        '',
        '$$D = {(x, x) : x ∈ [0, 1]}$$',
        '',
        '则 D 是闭集，故属于 $$𝔅_{[0,1]} ⊗ 𝔅_{[0,1]}$$；且 $$μ × ν(D)$$ 可以用截口公式算：对每个 x，$$ν(Dₓ) = ν({x}) = 0$$，故',
        '',
        '$$μ × ν(D) = ∫ ν(Dₓ) dμ(x) = 0$$',
        '',
        '**关键**：取一个 Lebesgue 测度为 0 但**不可测**（不属 𝔅_{[0,1]}）的子集 $$N ⊆ [0,1]$$，令',
        '',
        '$$G = {(x, x) : x ∈ N} ⊆ D$$',
        '',
        '则 G ⊆ D 而 μ×ν(D) = 0，但 G **不属于** $$𝔅 ⊗ 𝔅$$（它的截口给出的正是 N —— 若 $$G ∈ 𝔅 ⊗ 𝔅$$，由截口可测性，对每个 x 都有 $$Gₓ ∈ 𝔅$$，而 $$Gₓ$$ 是 {x} 或 ∅ …… 需要用「G 的截面沿对角线还原出 N」这一论证）。故 μ×ν 不完备。∎',
        '',
        '> ⭐ 一句话总结：**完备性可以被「零集的子集」打破，而乘积里零集特别多**。所以实用时必须先完备化 —— 这就是上一条定理存在的理由。'
      ].join('\n'),
      note: '这段论证的方向是对的，但「G ∉ 𝔅 ⊗ 𝔅」那一步的细节（如何从截面还原出 N）笔记里没有展开，我按标准做法补了骨架；如果你想写严格版，建议改用「对角线论证 + Fubini 定理给矛盾」的路线。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.productmeasure-premeasure',
      kind: 'definition',
      definition: 'def.premeasure',
      usedBy: 'def.product-measure',
      note: '矩形上的 π 就是一个预测度。'
    },
    {
      id: 'def-link.productmeasure-sigma',
      kind: 'definition',
      definition: 'def.product-sigma',
      usedBy: 'def.product-measure',
      note: '乘积测度定义在积 σ-代数 ℳ ⊗ 𝒩 上。'
    },
    {
      id: 'def-link.section-props',
      kind: 'definition',
      definition: 'def.section',
      usedBy: 'prop.section-measurable',
      note: '直接验证截口的运算性质。'
    },
    {
      id: 'def-link.monotoneclass-lemma',
      kind: 'definition',
      definition: 'def.monotone-class',
      usedBy: 'lem.monotone-class-lemma',
      note: '单调类引理说的正是单调类与 σ-代数何时重合。'
    },
    {
      id: 'def-link.generated-monotone-lemma',
      kind: 'definition',
      definition: 'def.generated-sigma',
      usedBy: 'lem.monotone-class-lemma',
      note: '陈述里用到 𝔪(𝒜) 与 ℳ(𝒜) 两个生成记号。'
    },
    {
      id: 'def-link.productmeasure-sections-thm',
      kind: 'definition',
      definition: 'def.product-measure',
      usedBy: 'thm.product-measure-sections',
      note: '定理算的就是乘积测度。'
    },
    {
      id: 'def-link.section-fubini',
      kind: 'definition',
      definition: 'def.section',
      usedBy: 'thm.fubini-tonelli',
      note: 'Fubini 的整个陈述都是用截口写的。'
    },
    {
      id: 'def-link.productmeasure-fubini',
      kind: 'definition',
      definition: 'def.product-measure',
      usedBy: 'thm.fubini-tonelli',
      note: '重积分就是对 μ × ν 积分。'
    },
    {
      id: 'def-link.integrable-fubini',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.fubini-tonelli',
      note: 'Fubini 的 (b) 用的是 L¹(μ×ν)。'
    },
    {
      id: 'def-link.productmeasure-complete',
      kind: 'definition',
      definition: 'def.product-measure',
      usedBy: 'thm.fubini-complete',
      note: '完备情形下先要把 μ × ν 完备化。'
    },
    {
      id: 'def-link.completion-fubini',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'thm.fubini-complete',
      note: '证明的核心是把集合拆成「属于 ℳ⊗𝒩 的部分」+「含在零集里的部分」。'
    }
  ]
});
