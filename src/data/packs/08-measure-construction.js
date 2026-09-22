/* ==========================================================================
   内容包 · 测度的构造（二）：测度 → 外测度 → Carathéodory 扩张
   --------------------------------------------------------------------------
   来自手写笔记「总结：集合论，测度」第 3 ~ 5 页。

   主线（也是整个测度论真正的技术核心）：

      预测度 μ₀  ──诱导──▶  外测度 μ*  ──Carathéodory──▶  σ-代数 ℳ 上的测度
                                                    │
                                                    ├─▶ 在原来的代数上还原成 μ₀
                                                    └─▶ 是 μ₀ 的最大扩张（σ-有限时唯一）

   最后落到 ℝ 上：单调右连续的 F ↦ 半开区间的预测度 ↦ Lebesgue–Stieltjes 测度。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '测度的构造',
  nodes: [

    {
      id: 'def.measure',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '测度',
      title: '测度（Measure）',
      regions: ['analysis'],
      tags: ['定义', '测度', '可数可加'],
      statement: [
        '设 ℳ 是 X 上的 σ-代数。函数 $$μ : ℳ → [0, +∞]$$ 是一个**测度**，当且仅当',
        '',
        '- **(i)**　$$μ(∅) = 0$$',
        '- **(ii) 可数可加**：若 {Eⱼ} 是 ℳ 中两两不交的集合列，则',
        '',
        '$$μ( ⋃_{j=1}^{∞} Eⱼ ) = ∑_{j=1}^{∞} μ(Eⱼ)$$',
        '',
        '(X, ℳ, μ) 称为**测度空间**。'
      ].join('\n'),
      notes: [
        '(i) 看起来多余（由 (ii) 取 Eⱼ = ∅ 立刻得到），写出来是为了排除「恒取 +∞」这种没有意义的解，同时保证 (ii) 中的级数不是 ∞ − ∞。',
        '**可数可加是本定义唯一有实质内容的要求**：它把「大小」从有限可加提升到可数可加，代价是允许取值为 +∞。',
        '⚠ 允许 μ(E) = +∞ 是必要的：ℝ 的 Lebesgue 测度就是 ∞。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §9', 'Folland, Real Analysis, §1.2']
    },

    {
      id: 'def.premeasure',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '预测度',
      title: '预测度（Premeasure）—— 定义在环上的「测度」',
      regions: ['analysis'],
      tags: ['定义', '预测度', '环'],
      statement: [
        '若 ℳ 只是一个**环**（不必是 σ-代数），而 $$μ : ℳ → [0, +∞]$$ 仍满足测度的两条：',
        '',
        '$$μ(∅) = 0，　{Eⱼ} 两两不交 ⟹ μ(⋃ Eⱼ) = ∑ μ(Eⱼ)$$',
        '',
        '则称 μ 是 ℳ 上的**预测度**。'
      ].join('\n'),
      notes: [
        '为什么要有这个中间概念：ℝ 上半开区间 (a, b] 的全体只是一个基本类，它的有限不交并构成一个环，还不是 σ-代数 —— 但这时已经能定义长度了，那就是预测度。',
        'Carathéodory 扩张定理的作用就是把预测度从环一路提升到生成的 σ-代数上。所以「**先造预测度，再扩张**」是构造测度的标准两步走。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §9', 'Folland, Real Analysis, §1.4']
    },

    {
      id: 'def.finitely-additive',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '有限可加测度',
      title: '有限可加测度（Finitely Additive Measure）',
      regions: ['analysis'],
      tags: ['定义', '有限可加'],
      statement: [
        '若 μ 只满足 (i) 与**有限**可加性：',
        '',
        '$$A, B ∈ ℳ 两两不交 ⟹ μ(A ∪ B) = μ(A) + μ(B)$$',
        '（由归纳，可推到任意有限多个不交集合），',
        '',
        '则 μ 称为**有限可加测度**。'
      ].join('\n'),
      notes: [
        '它比预测度还弱：预测度是可数可加的（只是定义域是环），有限可加测度只要求有限可加。',
        '⚠ 有限可加 ≠ 可数可加：在 ℕ 上定义 μ(E) = 0（E 有限）、μ(E) = +∞（E 无限），它是有限可加的，但对 ⋃ₙ {n} = ℕ 不满足可数可加。历史上（Banach–Tarski 时代）确实认真考虑过只用有限可加性的「测度」，但那样连「长度」都构造不出来。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §9']
    },

    {
      id: 'def.measure-space',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '有限 / σ-有限 / 半有限',
      title: '测度空间的几种「大小」：有限、σ-有限、半有限',
      regions: ['analysis'],
      tags: ['定义', 'σ-有限', '半有限'],
      statement: [
        '设 (X, ℳ, μ) 是测度空间。',
        '',
        '- **有限**：$$μ(X) < ∞$$',
        '- **σ-有限**：X 能写成可数个测度有限的集合之并：$$X = ⋃_{j=1}^{∞} Eⱼ，　μ(Eⱼ) < ∞$$',
        '- **半有限**：每个无穷测度的集合里都藏着正有限测度的子集：',
        '',
        '$$∀E ∈ ℳ, μ(E) = ∞ ⟹ ∃F ⊆ E, F ∈ ℳ, 0 < μ(F) < ∞$$'
      ].join('\n'),
      notes: [
        '$$有限 ⟹ σ-有限 ⟹ 半有限$$，两个箭头都不可逆。',
        'σ-有限是**最常用的技术假设**：ℝ 上的 Lebesgue 测度 σ-有限（ℝ = ⋃ₙ [-n, n]），而计数测度在 ℝ 上不是 σ-有限的。很多定理（Fubini、Radon–Nikodym、Carathéodory 扩张的唯一性）都要 σ-有限。',
        '半有限比 σ-有限弱得多：可以造出「每个可测集要么零测度、要么无穷测度」的测度，它就是半有限的极端反例。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §1.2']
    },

    {
      id: 'prop.measure-basic',
      cluster: 'analysis.measure',
      type: 'proposition',
      label: '测度的基本性质',
      title: '命题：测度的单调性、次可加性与两种连续性',
      regions: ['analysis'],
      tags: ['命题', '单调性', '次可加', '连续性'],
      statement: [
        '设 (X, ℳ, μ) 是测度空间，以下集合都取自 ℳ。',
        '',
        '- **(a) 单调**：$$E ⊆ F ⟹ μ(E) ≤ μ(F)$$',
        '- **(b) 次可加**：$$μ( ⋃ⱼ Eⱼ ) ≤ ∑ⱼ μ(Eⱼ)$$（不要求不交）',
        '- **(c) 下连续**：$$E₁ ⊆ E₂ ⊆ ⋯ ⟹ μ( ⋃ⱼ Eⱼ ) = lim_{j→∞} μ(Eⱼ)$$',
        '- **(d) 上连续**：$$μ(E₁) < ∞，　E₁ ⊇ E₂ ⊇ ⋯ ⟹ μ( ⋂ⱼ Eⱼ ) = lim_{j→∞} μ(Eⱼ)$$'
      ].join('\n'),
      notes: [
        '(a)：把 F 拆成 F = E ∪ (F ∖ E) 用可数可加（把余下的位置补 ∅）。',
        '(b)：把 ⋃Eⱼ 改成不交并：Fⱼ = Eⱼ ∖ (E₁ ∪ ⋯ ∪ E_{j-1})，则 μ(⋃Eⱼ) = Σμ(Fⱼ) ≤ Σμ(Eⱼ)。',
        '(c)：令 Aⱼ = Eⱼ ∖ E_{j-1}（E₀ = ∅），则 ⋃Eⱼ 是 Aⱼ 的不交并，而 μ(Eₙ) = ∑_{j≤n} μ(Aⱼ) —— 两边取极限即可。',
        '(d)：**「μ(E₁) < ∞」不能省。** 反例：X = ℕ，μ = 计数测度，Eⱼ = {j, j+1, …}，则每个 μ(Eⱼ) = ∞ 但交集为 ∅、μ(∅) = 0。',
        '(c) 与 (d) 合起来说明：测度在集合的**单调极限**下连续 —— 这正与「单调类」这个词呼应。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §9', 'Folland, Real Analysis, Prop. 1.3']
    },

    {
      id: 'def.null-set',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '零集与完备',
      title: 'μ-零集 / 完备测度空间（Null Set & Complete Measure Space）',
      regions: ['analysis'],
      tags: ['定义', '零集', '完备'],
      statement: [
        '设 (X, ℳ, μ) 是测度空间，E ∈ ℳ。',
        '',
        '若 $$μ(E) = 0$$，则称 E 是 **μ-零集**（μ-null set）。',
        '',
        '若**零集的每个子集都可测**：',
        '',
        '$$∀E ∈ ℳ, ∀F ⊆ E : μ(E) = 0 ⟹ F ∈ ℳ$$',
        '',
        '则称 μ（或这个测度空间）**完备**。'
      ].join('\n'),
      notes: [
        '完备性说的是「零集的子集也是可测集」。这条**不是**自动成立的：Borel σ-代数配上 Lebesgue 测度就不完备 —— Cantor 集是 Borel 集且测度为 0，它的某些子集不是 Borel 集。',
        '所以常见做法是先把 Borel 测度**完备化**（见下一条定理），得到 Lebesgue σ-代数。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §11']
    },

    {
      id: 'thm.completion',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: '完备化定理',
      title: '定理：任何测度空间都能完备化',
      regions: ['analysis'],
      tags: ['定理', '完备化', '零集'],
      statement: [
        '设 (X, ℳ, μ) 是测度空间。令',
        '',
        '$$𝒩 = { N ∈ ℳ : μ(N) = 0 }，　ℳ̄ = { E ∪ F : E ∈ ℳ，F ⊆ N 对某个 N ∈ 𝒩 }$$',
        '',
        '则',
        '',
        '1. ℳ̄ 是一个 σ-代数，且 ℳ ⊆ ℳ̄；',
        '2. 令 $$μ̄(E ∪ F) := μ(E)$$，它是 ℳ̄ 上良定义的测度；',
        '3. $$(X, ℳ̄, μ̄)$$ 是**完备**测度空间，称为 (X, ℳ, μ) 的**完备化**。'
      ].join('\n'),
      notes: [
        'ℳ̄ 的直观：在原来的可测集上「撒一点零集的小碎片」。',
        '**良定义是要检查的**：E ∪ F 的写法不唯一，若 E₁ ∪ F₁ = E₂ ∪ F₂，要证明 μ(E₁) = μ(E₂)。做法是用 E₁ ⊆ E₂ ∪ N₂（N₂ 零集）得 μ(E₁) ≤ μ(E₂)，反向同理。',
        '⚠ 完备化是「把零集的子集塞进来」，代价是 σ-代数变大、测度不变。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §13', 'Folland, Real Analysis, Prop. 1.6']
    },

    {
      id: 'def.semifinite-part',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '半有限部分',
      title: '半有限部分（Semifinite Part of a Measure）',
      regions: ['analysis'],
      tags: ['定义', '半有限'],
      statement: [
        '设 (X, ℳ, μ) 是测度空间。定义',
        '',
        '$$μ₀(E) := sup { μ(F) : F ⊆ E, F ∈ ℳ, μ(F) < ∞ }$$',
        '',
        '则 μ₀ 称为 μ 的**半有限部分**，它是一个半有限测度，且 μ₀ ≤ μ。'
      ].join('\n'),
      notes: [
        '它的作用：把一个「可能有很坏的无穷值」的测度修成半有限的，同时尽量保留原来的有限部分。',
        '若 μ 本身半有限，则 μ₀ = μ —— 所以这是「半有限化」操作。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §1.2']
    },

    {
      id: 'def.outer-measure',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '外测度',
      title: '外测度（Outer Measure）',
      regions: ['analysis'],
      tags: ['定义', '外测度', '次可加'],
      statement: [
        '设 X 是非空集合。函数 $$μ^* : 𝒫(X) → [0, +∞]$$ 是一个**外测度**，当且仅当',
        '',
        '- $$μ^*(∅) = 0$$',
        '- **单调**：$$A ⊆ B ⟹ μ^*(A) ≤ μ^*(B)$$',
        '- **可数次可加**：$$μ^*( ⋃_{j=1}^{∞} Aⱼ ) ≤ ∑_{j=1}^{∞} μ^*(Aⱼ)$$'
      ].join('\n'),
      notes: [
        '外测度定义在**全体**子集上（𝒫(X)，不是某个 σ-代数），代价是它只有**次**可加性。',
        '所以外测度不是测度 —— 它太大了，连 𝒫(X) 上都没有可加性。Carathéodory 的想法是在其中挑出一批「表现良好」的集合（下一条定义），外测度在它们上面才变成真正的测度。',
        'Lebesgue 最初构造的就是外测度：μ*(A) = inf{ ∑(bₙ − aₙ) : A ⊆ ⋃(aₙ, bₙ) }。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §11', 'Folland, Real Analysis, §1.4']
    },

    {
      id: 'prop.outer-measure-induced',
      cluster: 'analysis.measure',
      type: 'proposition',
      label: '由预测度诱导外测度',
      title: '命题：从 ℰ 上的 ρ 诱导出一个外测度',
      regions: ['analysis'],
      tags: ['命题', '外测度', '覆盖'],
      statement: [
        '设 ℰ ⊆ 𝒫(X)，∅ ∈ ℰ，X ∈ ℰ，ρ : ℰ → [0, +∞] 满足 ρ(∅) = 0。对 A ⊆ X 定义',
        '',
        '$$μ^*(A) := inf { ∑_{j=1}^{∞} ρ(Eⱼ) : Eⱼ ∈ ℰ, A ⊆ ⋃_{j=1}^{∞} Eⱼ }$$',
        '',
        '（用 ℰ 中可数个集合覆盖 A，取下确界。）则 μ\\* 是 X 上的一个**外测度**。'
      ].join('\n'),
      notes: [
        '这个公式就是「用已知面积的砖块去盖住 A，取最省的盖法」—— Lebesgue 外测度正是它的特例（ℰ 取开区间，ρ 取长度）。',
        '为什么要求 X ∈ ℰ：保证 A ⊆ X 总有覆盖，inf 不是对空集取。',
        '⚠ 这一步只用到 ρ(∅) = 0，**没用到可加性** —— 所以 μ* 一般并不还原成 ρ。要还原，就得靠 Carathéodory。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §11', 'Folland, Real Analysis, §1.4']
    },

    {
      id: 'def.caratheodory-measurable',
      cluster: 'analysis.measure',
      type: 'definition',
      label: 'μ*-可测集',
      title: 'Carathéodory 可测性（μ*-Measurable Set）',
      regions: ['analysis'],
      tags: ['定义', 'Carathéodory', '可测'],
      statement: [
        '设 μ* 是 X 上的外测度。A ⊆ X 称为 **μ\\*-可测的**，当且仅当 A 把每个集合都「干净地切成两块」：',
        '',
        '$$μ^*(E) = μ^*(E ∩ A) + μ^*(E ∩ Aᶜ)　∀E ⊆ X$$'
      ].join('\n'),
      notes: [
        '因为 μ* 只有次可加性，永远有 $$μ^*(E) ≤ μ^*(E ∩ A) + μ^*(E ∩ Aᶜ)$$。所以这个定义实际上只要求**反向的不等式**：A 不「吃掉」任何东西。',
        '这个定义初看很怪（为什么不用开集、闭集之类的直观条件？）—— 它的妙处是**完全内蕴**：只需要 μ* 一个对象，不需要任何拓扑。所以它对任意外测度都能用。',
        '直观：A 是「可以随便切」的集合。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §11', 'Folland, Real Analysis, Theorem 1.11']
    },

    {
      id: 'thm.caratheodory',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: 'Carathéodory 定理',
      title: 'Carathéodory 定理：μ*-可测集构成 σ-代数，μ* 在其上是完备测度',
      regions: ['analysis'],
      tags: ['定理', 'Carathéodory', 'σ-代数', '完备'],
      statement: [
        '设 μ* 是 X 上的外测度，ℳ 是全体 μ\\*-可测集。则',
        '',
        '1. **ℳ 是一个 σ-代数**；',
        '2. **$$μ^*|_ℳ$$ 是 (X, ℳ) 上的一个测度**（即 μ* 在 ℳ 上真的可加）；',
        '3. 这个测度是**完备**的。'
      ].join('\n'),
      notes: [
        '这是整个测度论构造的枢纽：**外测度不必可加，但它的「可切集合」上就可加了**。',
        '1 的证明是一个冗长的验证（对有限并、补、可数不交并逐一验算），笔记里写「pf. just verify.」。',
        '3 的完备性来自定义本身：若 μ*(A) = 0 且 B ⊆ A，则对任意 E 有 μ*(E ∩ B) ≤ μ*(B) = 0 且 μ*(E ∩ Bᶜ) ≤ μ*(E)，两边一夹就得到 B 满足可测性条件。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §11', 'Folland, Real Analysis, Theorem 1.11']
    },

    {
      id: 'prop.caratheodory-extension',
      cluster: 'analysis.measure',
      type: 'proposition',
      label: '预测度还原',
      title: '命题：从预测度出发做 Carathéodory，原代数上的值不变',
      regions: ['analysis'],
      tags: ['命题', 'Carathéodory', '扩张'],
      statement: [
        '设 𝔄 ⊆ 𝒫(X) 是**代数**，μ₀ 是 𝔄 上的**预测度**，μ* 是由 μ₀ 诱导的外测度（按上一条命题，取 ℰ = 𝔄、ρ = μ₀）。则',
        '',
        '1. $$μ^*|_𝔄 = μ₀$$',
        '2. **𝔄 中每个集合都是 μ\\*-可测的**，因此',
        '',
        '$$𝔄 ⊆ ℳ(𝔄) ⊆ ℳ$$',
        '',
        '（ℳ 是全体 μ\\*-可测集），于是 μ*|_ℳ 是 μ₀ 在 σ-代数 ℳ(𝔄) 上的扩张。'
      ].join('\n'),
      notes: [
        '这就是「预测度 → 外测度 → 测度」三步走的收官：**预测度在 σ-代数的扩张上被完整还原**。',
        '1 的两个方向：$$μ^*(A) ≤ μ₀(A)$$ 是直接的（A 自己被 A 覆盖）；反向要用 μ₀ 的可数可加性。',
        '2 是技术核心，要在 𝔄 上验证 Carathéodory 的可切性条件。',
        '笔记里还记了一句：不仅 𝔄 本身，连它做可数并、可数交（以及反复做）得到的 𝔄_σ、𝔄_δ、𝔄_σδ、𝔄_δσ 里的集合也都 μ\\*-可测 —— 因为 ℳ 是 σ-代数，对这些操作封闭。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §12', 'Folland, Real Analysis, Theorem 1.14']
    },

    {
      id: 'thm.caratheodory-uniqueness',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: '扩张的唯一性',
      title: '定理：Carathéodory 扩张是最大的，σ-有限时唯一',
      regions: ['analysis'],
      tags: ['定理', '唯一性', '扩张'],
      statement: [
        '设 μ₀ 是代数 𝔄 上的预测度，μ := μ*|_ℳ 是它经 Carathéodory 得到的扩张。若 ν 是 ℳ(𝔄) 上**另一个**扩张 μ₀ 的测度，则',
        '',
        '$$ν(E) ≤ μ(E)　∀E ∈ ℳ(𝔄)$$',
        '',
        '且当 $$μ(E) < ∞$$ 时等号成立；进而，若 μ 是 σ-有限的，则 $$ν = μ$$。'
      ].join('\n'),
      notes: [
        '要点：**Carathéodory 扩张是「最大」的那一个**。原因藏在 μ* 的定义里 —— 它是用「覆盖取下确界」造的，而任何扩张 ν 都要满足次可加性，于是 ν(A) ≤ ∑ν(Eⱼ) = ∑μ₀(Eⱼ)，对所有覆盖取下确界就得到 ν ≤ μ*。',
        '⚠ 不 σ-有限时唯一性会**失效**：ℝ 上取 𝔄 = 有限并的半开区间，μ₀ = Lebesgue 长度限制在 𝔄 上，则「Lebesgue 测度」与「Lebesgue 测度 + 集中在某个非 Lebesgue 可测集上的无穷值」都是扩张。σ-有限性正是用来堵住这种漏洞的。',
        '构造测度的标准收尾就是这一条：**先造预测度（好造），再扩张（Carathéodory 保证存在），最后用 σ-有限保证唯一**。'
      ].join('\n\n'),
      refs: ['Halmos, Measure Theory, §13', 'Folland, Real Analysis, Theorem 1.14']
    },

    {
      id: 'prop.ls-premeasure',
      cluster: 'analysis.measure',
      type: 'proposition',
      label: 'F 给出的预测度',
      title: '命题：单调右连续的 F 给出半开区间上的预测度',
      regions: ['analysis'],
      tags: ['命题', 'Lebesgue–Stieltjes', '预测度'],
      statement: [
        '设 $$F : ℝ → ℝ$$ 是**递增**且**右连续**的函数。在半开区间的全体上定义',
        '',
        '$$μ₀( (a, b] ) = F(b) − F(a)$$',
        '',
        '（并规定 μ₀(∅) = 0，扩充到由这些区间做有限不交并得到的代数 𝔄 上。）则 μ₀ 是 𝔄 上的一个**预测度**。'
      ].join('\n'),
      notes: [
        '**右连续正是用来保证可数可加性的**：若 (a, b] 是 (aⱼ, bⱼ] 的不交并，把 bⱼ 从左边逼近 bⱼ 就能得到单调性的不等式。',
        '取 F(x) = x 就回到长度 μ₀((a, b]) = b − a —— 也就是 Lebesgue 测度的出发点。',
        '⚠ 半开区间 (a, b] 比开区间好用：它们做不交并时端点不重叠，μ₀ 的加法好验。用 [a, b) 也一样，只是右连续要换成左连续。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 1.16']
    },

    {
      id: 'thm.ls-exists',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: 'F ↔ Borel 测度',
      title: '定理：每个单调右连续的 F 对应一个 Borel 测度（差常数意义下）',
      regions: ['analysis'],
      tags: ['定理', 'Lebesgue–Stieltjes', 'Borel'],
      statement: [
        '对每个递增右连续的 $$F : ℝ → ℝ$$，存在 ℝ 上的一个 Borel 测度 μ_F 使',
        '',
        '$$μ_F( (a, b] ) = F(b) − F(a)　∀a < b$$',
        '',
        '且这样的 μ_F 与 F 的对应在**相差一个常数**的意义下是一一的。'
      ].join('\n'),
      notes: [
        '证明就是把前两条接起来：F ↦ 预测度 μ₀（上一条命题）→ 由 Carathéodory 扩张到 𝔅_ℝ（前面两条定理）。',
        '「差常数」是因为 μ_F 只看增量 F(b) − F(a)：把 F 换成 F + c，增量不变，测度也不变。所以严格的对应是「递增右连续函数模掉常数」↔「ℝ 上局部有限的 Borel 测度」。',
        '⚠ 「局部有限」这个限制是必要的：μ_F((−n, n]) = F(n) − F(−n) 必须有限，才能由递增实值函数给出。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 1.16']
    },

    {
      id: 'def.lebesgue-stieltjes',
      cluster: 'analysis.measure',
      type: 'definition',
      label: 'Lebesgue–Stieltjes 测度',
      title: 'Lebesgue–Stieltjes 测度（Lebesgue–Stieltjes Measure μ_F）',
      regions: ['analysis'],
      tags: ['定义', 'Lebesgue–Stieltjes', 'Lebesgue 测度'],
      statement: [
        '由递增右连续函数 F 按上一条定理得到的 Borel 测度 $$μ_F$$ 称为 **F 的 Lebesgue–Stieltjes 测度**。',
        '',
        '特别地，取 $$F(x) = x$$，得到的 μ_F 就是 ℝ 上的 **Lebesgue 测度** m：',
        '',
        '$$m( (a, b] ) = b − a$$'
      ].join('\n'),
      notes: [
        '若改用左连续的 F 配区间 [a, b)，得到的是同一族测度 —— 只是把「右连续」换成了「左连续」。笔记里专门标注了这一点。',
        'μ_F 的**分布函数**视角：若 F 还满足 F(−∞) = 0、F(+∞) = 1，那 F 就是一个概率分布的分布函数，μ_F 就是对应的概率测度。',
        '这条把「测度」和「函数」这两类对象接了起来：ℝ 上（局部有限的）测度 ↔ 递增右连续函数（模常数）。后面 Radon–Nikodym 会把「绝对连续」精确地实现为「F 是可积函数的积分」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 1.16']
    }
  ],

  edges: [

    {
      id: 'imp.measure-props',
      kind: 'implication',
      sources: ['def.measure'],
      target: 'prop.measure-basic',
      title: '测度 ⟹ 单调 / 次可加 / 上下连续',
      proof: [
        '设 μ 是测度。',
        '',
        '**(a) 单调。** 设 E ⊆ F。则 F = E ∪ (F ∖ E)，两项不交，故 μ(F) = μ(E) + μ(F ∖ E) ≥ μ(E)（取值非负）。',
        '',
        '**(b) 次可加。** 令 Fⱼ = Eⱼ ∖ (E₁ ∪ ⋯ ∪ E_{j-1})，则 Fⱼ 两两不交、⋃Fⱼ = ⋃Eⱼ 且 Fⱼ ⊆ Eⱼ。由可数可加与 (a)，',
        '',
        '$$μ(⋃ⱼ Eⱼ) = μ(⋃ⱼ Fⱼ) = ∑ⱼ μ(Fⱼ) ≤ ∑ⱼ μ(Eⱼ)$$',
        '',
        '**(c) 下连续。** 设 E₁ ⊆ E₂ ⊆ ⋯。令 A₁ = E₁，Aⱼ = Eⱼ ∖ E_{j-1}（j ≥ 2），则 Aⱼ 两两不交且 ⋃Aⱼ = ⋃Eⱼ。由可数可加，',
        '',
        '$$μ(⋃ⱼ Eⱼ) = ∑ⱼ μ(Aⱼ) = lim_{n→∞} ∑_{j=1}^{n} μ(Aⱼ) = lim_{n→∞} μ(Eₙ)$$',
        '',
        '**(d) 上连续。** 设 E₁ ⊇ E₂ ⊇ ⋯ 且 μ(E₁) < ∞。令 Fⱼ = E₁ ∖ Eⱼ，则 F₁ ⊆ F₂ ⊆ ⋯ 且 ⋃Fⱼ = E₁ ∖ ⋂Eⱼ。由 (c) 与 (a)，',
        '',
        '$$μ(E₁) − μ(⋂ⱼ Eⱼ) = μ(E₁ ∖ ⋂ⱼ Eⱼ) = limⱼ μ(Fⱼ) = limⱼ ( μ(E₁) − μ(Eⱼ) )$$',
        '',
        '因为 μ(E₁) < ∞ 是个有限数，可以从两边同时减掉，得 μ(⋂Eⱼ) = lim μ(Eⱼ)。∎',
        '',
        '> ⚠ (d) 里的「μ(E₁) < ∞」正是为了让 μ(E₁) 能被减掉。没有它，等式会退化成 ∞ = ∞。'
      ].join('\n')
    },

    {
      id: 'imp.premeasure-to-outer',
      kind: 'implication',
      sources: ['def.premeasure'],
      target: 'prop.outer-measure-induced',
      title: '预测度 ⟹ 诱导的外测度',
      proof: [
        '设 𝔄 是代数，μ₀ 是 𝔄 上的预测度。对 A ⊆ X 令',
        '',
        '$$μ^*(A) = inf { ∑ⱼ μ₀(Eⱼ) : Eⱼ ∈ 𝔄, A ⊆ ⋃ⱼ Eⱼ }$$',
        '',
        '**① 定义合理**：A ⊆ X 且 X ∈ 𝔄，所以总有覆盖，inf 是对非空集合取。',
        '',
        '**② μ*(∅) = 0**：取 E₁ = ∅、E₂ = E₃ = ⋯ = ∅，则 ∑μ₀(Eⱼ) = 0，故 0 ≤ μ*(∅) ≤ 0。',
        '',
        '**③ 单调**：A ⊆ B 时，B 的每个覆盖也是 A 的覆盖，故 A 的下确界集合更大，μ*(A) ≤ μ*(B)。',
        '',
        '**④ 可数次可加**：设 Aⱼ ⊆ X。若某个 μ*(Aⱼ) = ∞ 则不等式平凡；否则给定 ε > 0，对每个 j 取 𝔄 中的覆盖 {E_{j,k}}ₖ 使',
        '',
        '$$∑ₖ μ₀(E_{j,k}) < μ^*(Aⱼ) + ε / 2ʲ$$',
        '',
        '把 {E_{j,k}}_{j,k} 按 (j, k) 之外再用双射排成一列（可数个可数集之并仍可数），它是 ⋃ⱼ Aⱼ 的一个覆盖，于是',
        '',
        '$$μ^*(⋃ⱼ Aⱼ) ≤ ∑_{j,k} μ₀(E_{j,k}) ≤ ∑ⱼ μ^*(Aⱼ) + ε$$',
        '',
        '令 ε → 0 即得。∎',
        '',
        '> ⚠ ④ 的每一步都只需取**一个**覆盖 —— 这用的是 ℕ 上的可数选择（可以从自然数的良序性显式给出），不需要完整的 AC。'
      ].join('\n')
    },

    {
      id: 'imp.outer-carath',
      kind: 'implication',
      sources: ['def.outer-measure', 'def.caratheodory-measurable'],
      target: 'thm.caratheodory',
      title: '外测度 + 可切集 ⟹ σ-代数与完备测度',
      proof: [
        '设 μ* 是外测度，ℳ = { A : ∀E, μ*(E) = μ*(E∩A) + μ*(E∩Aᶜ) }。',
        '',
        '**① ℳ 是代数。** 条件关于 A 与 Aᶜ 对称，故 A ∈ ℳ ⟹ Aᶜ ∈ ℳ；∅ 与 X 显然在 ℳ 中。若 A, B ∈ ℳ，要证 A ∪ B ∈ ℳ：对任意 E，把 E 依 A 切开、再依 B 切开，',
        '',
        '$$μ^*(E) = μ^*(E∩A) + μ^*(E∩Aᶜ) = μ^*(E∩A∩B) + μ^*(E∩A∩Bᶜ) + μ^*(E∩Aᶜ∩B) + μ^*(E∩Aᶜ∩Bᶜ)$$',
        '',
        '而右边前三项合起来 ≥ μ*(E∩(A∪B))（次可加），最后一项 = μ*(E∩(A∪B)ᶜ)。反向不等式由次可加自动成立，故 A ∪ B ∈ ℳ。',
        '',
        '**② ℳ 是 σ-代数。** 设 Aⱼ ∈ ℳ 两两不交，A = ⋃Aⱼ。对任意 E 归纳得到',
        '',
        '$$μ^*(E ∩ ⋃_{j≤n} Aⱼ) = ∑_{j≤n} μ^*(E ∩ Aⱼ)$$',
        '',
        '（每一步用 Aₙ 把 E 切开，丢掉的那块弃掉即可。）令 n → ∞，用次可加性与单调性，',
        '',
        '$$μ^*(E) = μ^*(E∩A) + μ^*(E∩Aᶜ)$$',
        '',
        '故 A ∈ ℳ。结合 ①，ℳ 是可数并封闭的代数，即 σ-代数（可数不交并由 ②，一般可数并再换成不交并）。',
        '',
        '**③ μ*|_ℳ 可加。** 在 ② 里取 E = X、A 换成两两不交的 Aⱼ，得 μ*(⋃Aⱼ) = ∑μ*(Aⱼ)，这正是可数可加；μ*(∅) = 0 由外测度定义给出。',
        '',
        '**④ 完备。** 设 μ*(A) = 0，B ⊆ A。对任意 E，由单调性与次可加，',
        '',
        '$$μ^*(E) ≥ μ^*(E ∩ Bᶜ) ≥ μ^*(E) − μ^*(E ∩ B) ≥ μ^*(E) − μ^*(A) = μ^*(E)$$',
        '',
        '故 μ*(E) = μ*(E∩B) + μ*(E∩Bᶜ)（注意 μ*(E∩B) ≤ μ*(A) = 0），即 B ∈ ℳ。故 μ*|_ℳ 完备。∎',
        '',
        '> 笔记里对这一条写的是「pf. just verify.」—— 确实是纯验证，但要验的东西不少，上面把要点写全了。'
      ].join('\n')
    },

    {
      id: 'imp.carath-extension',
      kind: 'implication',
      sources: ['thm.caratheodory', 'prop.outer-measure-induced'],
      target: 'prop.caratheodory-extension',
      title: 'Carathéodory + 预测度 ⟹ 原代数上的值不变',
      proof: [
        '设 𝔄 是代数，μ₀ 是 𝔄 上的预测度，μ* 是由 μ₀ 诱导的外测度，ℳ 是全体 μ*-可测集。',
        '',
        '**① μ*|_𝔄 ≤ μ₀。** 取 A ∈ 𝔄，则 A ⊆ A 是一个（只含一层的）覆盖，故',
        '',
        '$$μ^*(A) ≤ μ₀(A) + 0 + 0 + ⋯ = μ₀(A)$$',
        '',
        '**② μ*|_𝔄 ≥ μ₀。** 设 {Eⱼ} ⊆ 𝔄 是 A 的覆盖。令 Fⱼ = Eⱼ ∖ (E₁ ∪ ⋯ ∪ E_{j-1})，则 Fⱼ ∈ 𝔄 两两不交且 ⋃Fⱼ ⊇ A、Fⱼ ⊆ Eⱼ。于是',
        '',
        '$$μ₀(A) = μ₀( ⋃ⱼ (A ∩ Fⱼ) ) = ∑ⱼ μ₀(A ∩ Fⱼ) ≤ ∑ⱼ μ₀(Fⱼ) ≤ ∑ⱼ μ₀(Eⱼ)$$',
        '',
        '（第一个等号用 A 是那些不交集合之并；第二个用 μ₀ 可数可加；不等号用单调性。）对所有覆盖取下确界得 μ₀(A) ≤ μ*(A)。',
        '',
        '**③ 𝔄 ⊆ ℳ。** 设 A ∈ 𝔄，E ⊆ X，要证 μ*(E) ≥ μ*(E∩A) + μ*(E∩Aᶜ)。给定 ε > 0，取 𝔄 中 {Eⱼ} 覆盖 E 使',
        '',
        '$$∑ⱼ μ₀(Eⱼ) < μ^*(E) + ε$$',
        '',
        '由 ②，μ₀(Eⱼ) = μ*(Eⱼ)；又 𝔄 是代数，Eⱼ ∩ A 与 Eⱼ ∩ Aᶜ 都在 𝔄 中且不交、并为 Eⱼ，于是',
        '',
        '$$μ^*(E ∩ A) + μ^*(E ∩ Aᶜ) ≤ ∑ⱼ μ₀(Eⱼ ∩ A) + ∑ⱼ μ₀(Eⱼ ∩ Aᶜ) = ∑ⱼ μ₀(Eⱼ) < μ^*(E) + ε$$',
        '',
        '令 ε → 0 即得。所以 𝔄 ⊆ ℳ；而 ℳ 是 σ-代数（Carathéodory），故 ℳ(𝔄) ⊆ ℳ。∎'
      ].join('\n')
    },

    {
      id: 'imp.carath-unique',
      kind: 'implication',
      sources: ['prop.caratheodory-extension'],
      target: 'thm.caratheodory-uniqueness',
      title: '扩张的最大性与 σ-有限唯一性',
      proof: [
        '沿用上一条的记号，设 ν 是 ℳ(𝔄) 上另一个扩张 μ₀ 的测度。',
        '',
        '**① ν ≤ μ*。** 设 E ∈ ℳ(𝔄)，{Eⱼ} ⊆ 𝔄 是 E 的覆盖。由 ν 的次可加性与 ν|_𝔄 = μ₀，',
        '',
        '$$ν(E) ≤ ∑ⱼ ν(Eⱼ) = ∑ⱼ μ₀(Eⱼ)$$',
        '',
        '对所有这样的覆盖取下确界，右边给出 μ*(E) = μ(E)。故 ν(E) ≤ μ(E)。',
        '',
        '**② μ(E) < ∞ 时取等。** 此时 n = ν(E) 有限（因为 ν(E) ≤ μ(E) < ∞）—— 但要注意 ν ≤ μ 只在一侧，所以直接两边各取补集：E 可测意味着对任意 F ⊆ X 有 μ(F) = μ(F∩E) + μ(F∖E)，取 F = X 得 μ(X) = μ(E) + μ(X∖E)，**这一步要求 μ(X) < ∞** 才好逐项比较。一般情形下改用 ℳ(𝔄) 中 μ 有限的集合 Eₙ ↑ X 作近似（见下）。',
        '',
        '**③ σ-有限时唯一。** 取 μ-有限的可测集 Eₙ ↑ X（σ-有限的定义）。对每个 Eₙ，用 ② 的论证于 Eₙ ∩ E 上得 ν(E ∩ Eₙ) = μ(E ∩ Eₙ)；令 n → ∞，两侧分别用下连续性（ν 与 μ 都是测度）得到 ν(E) = μ(E)。',
        '',
        '故 σ-有限时 ν = μ，扩张唯一。∎',
        '',
        '> ⚠ ② 里 μ(E) < ∞ 的等号之所以能成立，用的是「在有限测度的集合上 μ − ν 也是测度」这一点。ℳ(𝔄) 上会出现无穷值，所以只能逐块比较 —— 这正是 σ-有限必不可少的原因。'
      ].join('\n')
    },

    {
      id: 'imp.ls-premeasure-to-measure',
      kind: 'implication',
      sources: ['prop.ls-premeasure', 'thm.caratheodory-uniqueness'],
      target: 'thm.ls-exists',
      title: 'F 的预测度 ⟹ ℝ 上的 Borel 测度',
      proof: [
        '设 F 递增右连续。由前一条命题，μ₀((a, b]) = F(b) − F(a) 扩充成半开区间生成的代数 𝔄 上的**预测度**。',
        '',
        '**① 存在性。** 由 Carathéodory 扩张定理，μ₀ 诱导的外测度限制在 ℳ(𝔄) 上就是一个测度 μ_F，且在 𝔄 上还原成 μ₀。特别地 μ_F((a, b]) = F(b) − F(a)。',
        '',
        '**② 它是 Borel 测度。** 每个开区间 (a, b) 是可数个 (a, b − 1/n] 之并，故属于 ℳ(𝔄)；于是 ℳ(𝔄) 包含 ℝ 的全体开集（ℝ 的开集是可数个开区间之并），从而 𝔅_ℝ ⊆ ℳ(𝔄)。',
        '',
        '**③ 唯一性。** F 递增实值 ⟹ μ_F((−n, n]) = F(n) − F(−n) < ∞，所以 μ_F 是 σ-有限的（ℝ = ⋃ₙ (−n, n]）。由 σ-有限时的唯一性，扩张唯一。',
        '',
        '**④ 「差常数」的来源。** μ_F 只看增量：把 F 换成 F + c，对一切 (a, b] 有 F(b) − F(a) 不变，故预测度不变、扩张不变。反过来若 μ_F = μ_G，则对一切 a < b，F(b) − F(a) = G(b) − G(a)，固定 a 即得 F − G 是常数。∎'
      ].join('\n')
    },

    {
      id: 'imp.completion',
      kind: 'implication',
      sources: ['def.null-set'],
      target: 'thm.completion',
      title: '零集 ⟹ 完备化',
      proof: [
        '设 (X, ℳ, μ) 是测度空间，ℳ̄ = { E ∪ F : E ∈ ℳ, F ⊆ N 对某个零集 N }。',
        '',
        '**① ℳ̄ 是 σ-代数。** 含 X（X ∈ ℳ）。对可数并：⋃(Eⱼ ∪ Fⱼ) = (⋃Eⱼ) ∪ (⋃Fⱼ)，而 ⋃Fⱼ ⊆ ⋃Nⱼ 是零集。对补：E ∪ F 的补是',
        '',
        '$$(E ∪ F)ᶜ = (Eᶜ ∩ Nᶜ) ∪ (Eᶜ ∩ N ∖ F)$$',
        '',
        '第一块属于 ℳ，第二块含在零集 N 里，故属于 ℳ̄ 的形状。',
        '',
        '**② μ̄ 良定义。** 设 E₁ ∪ F₁ = E₂ ∪ F₂ 且 Fᵢ ⊆ Nᵢ（零集）。由 E₁ ⊆ E₂ ∪ N₂ 得 μ(E₁) ≤ μ(E₂) + 0，反向同理，故 μ(E₁) = μ(E₂)。',
        '',
        '**③ μ̄ 是测度。** 把 𝒩 中集合的子集归入「零的一部分」后，可数可加性与 μ 上的逐一对应（Eⱼ 部分可数可加、Fⱼ 部分含于零集）。',
        '',
        '**④ 完备。** 若 μ̄(E ∪ F) = 0，则 μ(E) = 0，于是 E ∪ F ⊆ E ∪ N 是零集的子集 —— 按 ℳ̄ 的定义它当然还在 ℳ̄ 里，即：**ℳ̄ 中每个零集的子集都可测**。∎'
      ].join('\n')
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.measure-space',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'def.measure-space',
      note: '有限 / σ-有限 / 半有限都是在测度的定义上追加条件。'
    },
    {
      id: 'def-link.premeasure-outer',
      kind: 'definition',
      definition: 'def.premeasure',
      usedBy: 'prop.outer-measure-induced',
      note: '诱导外测度的公式里用的就是预测度。'
    },
    {
      id: 'def-link.outer-carath-thm',
      kind: 'definition',
      definition: 'def.outer-measure',
      usedBy: 'thm.caratheodory',
      note: 'Carathéodory 定理的起点是外测度。'
    },
    {
      id: 'def-link.carathmeasurable-thm',
      kind: 'definition',
      definition: 'def.caratheodory-measurable',
      usedBy: 'thm.caratheodory',
      note: '定理里的 ℳ 就是 μ*-可测集全体。'
    },
    {
      id: 'def-link.measure-completion',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'thm.completion',
      note: '完备化的构造完全依赖测度与零集。'
    },
    {
      id: 'def-link.measure-ls',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'def.lebesgue-stieltjes',
      note: 'Lebesgue–Stieltjes 测度是一种 Borel 测度。'
    },
    {
      id: 'def-link.borel-ls',
      kind: 'definition',
      definition: 'def.borel',
      usedBy: 'thm.ls-exists',
      note: '定理的结论是「Borel 测度」。'
    },
    {
      id: 'def-link.null-completion',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'thm.completion',
      note: '完备化定理的定义里整段都在用「零集」。'
    },
    {
      id: 'def-link.semifinite-measure-space',
      kind: 'definition',
      definition: 'def.measure-space',
      usedBy: 'def.semifinite-part',
      note: '半有限部分是针对「半有限」这个概念做的修补。'
    },
    {
      id: 'def-link.measure-basic-props',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'prop.measure-basic',
      note: '这几条性质都是测度定义（可数可加）的直接推论。'
    }
  ]
});
