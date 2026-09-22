/* ==========================================================================
   内容包 · 符号测度、绝对连续与 Radon–Nikodym（一）
   --------------------------------------------------------------------------
   来自手写笔记「总结：符号测度」第 1 ~ 4 页。

   两条主线：

   ① 把一个「可以取负值」的测度拆成两个真测度之差：
        Hahn 分解（分空间）──▶ Jordan 分解（分测度）──▶ 全变差 |ν|
   ② 「绝对连续」这个概念，以及它的结构定理：
        ν ≪ μ  ⟺  dν = f dμ   （Radon–Nikodym）
        一般的 ν：  dν = dλ + f dμ，λ ⊥ μ   （Lebesgue 分解）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '符号测度与 Radon–Nikodym',
  nodes: [

    {
      id: 'def.signed-measure',
      cluster: 'analysis.signed',
      type: 'definition',
      label: '符号测度',
      title: '符号测度（Signed Measure）',
      regions: ['analysis'],
      tags: ['定义', '符号测度'],
      statement: [
        '设 (X, ℳ) 是可测空间。$$ν : ℳ → [−∞, +∞]$$ 是**符号测度**，当且仅当',
        '',
        '- $$ν(∅) = 0$$；',
        '- $$ν$$ **至多取到 ±∞ 中的一个**（不能同时取到 +∞ 与 −∞）；',
        '- 对两两不交的 $${Eⱼ} ⊆ ℳ$$：',
        '',
        '$$ν( ⨆ⱼ Eⱼ ) = ∑ⱼ ν(Eⱼ)，且右边的级数绝对收敛（当 |ν(⨆Eⱼ)| < ∞ 时）$$'
      ].join('\n'),
      notes: [
        '⚠ 「至多取到一个无穷」这一条是**必需的**：否则可数可加性会碰上 $$∞ − ∞$$。（笔记里专门在旁边写了「防止重排问题」。）',
        '**例 1**：μ₁、μ₂ 是测度，其中至少一个有限 ⟹ $$ν = μ₁ − μ₂$$ 是符号测度。',
        '**例 2**：$$f : X → [−∞, +∞]$$ 可测，且 $$∫f⁺ dμ$$、$$∫f⁻ dμ$$ 中至少一个有限 ⟹',
        '',
        '$$ν(E) := ∫_E f dμ$$',
        '',
        '是符号测度。这样的 f 叫**广义可积函数**（extended integrable function）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.1', 'Halmos, Measure Theory, §28']
    },

    {
      id: 'def.positive-negative-null',
      cluster: 'analysis.signed',
      type: 'definition',
      label: '正集 / 负集 / 零集',
      title: '正集 / 负集 / 零集（Positive, Negative, Null Set）',
      regions: ['analysis'],
      tags: ['定义', '正集', '负集'],
      statement: [
        '设 ν 是符号测度，$$E ∈ ℳ$$。',
        '',
        '- E 是**正的**：$$ν(F) ≥ 0$$ 对一切可测 $$F ⊆ E$$ 成立；',
        '- E 是**负的**：$$ν(F) ≤ 0$$ 对一切可测 $$F ⊆ E$$ 成立；',
        '- E 是**零的**：$$ν(F) = 0$$ 对一切可测 $$F ⊆ E$$ 成立。'
      ].join('\n'),
      notes: [
        '⚠ 注意「正集」不是「ν(E) > 0 的集合」—— 它要求 **E 的每一个可测子集**都非负。',
        '⚠ 与 μ-零集区分：这里的「零集」是关于符号测度 ν 说的（$$ν(F) = 0$$），不是关于测度 μ 的。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.1']
    },

    {
      id: 'prop.positive-set-closure',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: '正集的封闭性',
      title: '命题：正集的可测子集仍是正集；可数个正集之并仍是正集',
      regions: ['analysis'],
      tags: ['命题', '正集'],
      statement: [
        '设 ν 是符号测度。',
        '',
        '- 正集的每个可测子集都是正集；',
        '- **可数多个正集之并仍是正集**。'
      ].join('\n'),
      notes: [
        '第一条由定义直接得到。',
        '第二条是 Hahn 分解证明里反复用到的技术步骤：把可数多个正集 $P₁, P₂, …$ 不交化（$$Pⱼ′ = Pⱼ ∖ ⋃_{i<j} Pᵢ$$，正集之差仍是正集），再用可数可加性逐块验证。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Lemma 3.1']
    },

    {
      id: 'thm.hahn-decomposition',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: 'Hahn 分解定理',
      title: 'Hahn 分解定理（Hahn Decomposition Theorem）',
      regions: ['analysis'],
      tags: ['定理', 'Hahn 分解', '正集', '负集'],
      statement: [
        '设 ν 是 $$(X, ℳ)$$ 上的符号测度。则存在 $$P, N ∈ ℳ$$ 使',
        '',
        '$$P ∪ N = X，　P ∩ N = ∅，$$',
        '',
        '其中 **P 是正集、N 是负集**。',
        '',
        '若 $$P′, N′$$ 是另一对这样的集合，则 $$P △ P′ = N △ N′$$ 是 ν-零集。'
      ].join('\n'),
      notes: [
        '这就是「把空间按符号一刀切开」：ν 在 P 上非负、在 N 上非正。',
        '⚠ 「P △ P′ 是零集」只是说分解**在零集意义下唯一** —— 严格说 Hahn 分解并不唯一（可以把零集在 P、N 之间随意搬），但一切可测集的 ν-值完全相同。',
        '⭐ 有了它，「符号测度」就完全化归成「两个真测度」—— 这正是下一条 Jordan 分解的内容。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.3', 'Halmos, Measure Theory, §29']
    },

    {
      id: 'def.mutually-singular',
      cluster: 'analysis.signed',
      type: 'definition',
      label: '相互奇异',
      title: '相互奇异 / 互相垂直（Mutually Singular μ ⊥ ν）',
      regions: ['analysis'],
      tags: ['定义', '奇异', '垂直'],
      statement: [
        '两个测度（或符号测度）$$μ, ν$$ **相互奇异**，记作 $$μ ⊥ ν$$，当且仅当存在 $$E, F ∈ ℳ$$ 使',
        '',
        '$$E ∩ F = ∅，　E ∪ F = X，$$',
        '',
        '且 **E 是 μ-零集、F 是 ν-零集**。'
      ].join('\n'),
      notes: [
        '直观：两个测度「住在不相交的地方」—— 空间可以切成两块，一块完全没有 μ 的质量，另一块完全没有 ν 的质量。',
        '典型例子：Lebesgue 测度与「Dirac 测度 δ₀」相互奇异（取 E = ℝ∖{0}，F = {0}）；而任何绝对连续的测度与 Dirac 测度不奇异。',
        '⚠ 与「绝对连续」是一对对偶概念：$$ν ≪ μ$$ 说「ν 的质量都在 μ 给得出质量的地方」，$$ν ⊥ μ$$ 说「ν 的质量都在 μ 没有质量的地方」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.2']
    },

    {
      id: 'thm.jordan-decomposition',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: 'Jordan 分解定理',
      title: 'Jordan 分解定理（Jordan Decomposition Theorem）',
      regions: ['analysis'],
      tags: ['定理', 'Jordan 分解', '全变差'],
      statement: [
        '设 ν 是符号测度。则存在**测度** $$μ₁, μ₂$$ 使',
        '',
        '$$ν = μ₁ − μ₂，　μ₁ ⊥ μ₂，$$',
        '',
        '且其中**至少一个是有限的**。这样的分解是唯一的。',
        '',
        '具体地，取 ν 的一个 Hahn 分解 $$X = P ⊔ N$$，令',
        '',
        '$$ν⁺ := ν(· ∩ P)，　ν⁻ := −ν(· ∩ N)$$',
        '',
        '则 $$ν = ν⁺ − ν⁻$$ 且 $$ν⁺ ⊥ ν⁻$$。'
      ].join('\n'),
      notes: [
        '**正变差** $$ν⁺$$、**负变差** $$ν⁻$$ 都是真测度；两者之和叫**全变差**：',
        '',
        '$$|ν| := ν⁺ + ν⁻$$',
        '',
        '⭐ 「符号测度」由此被完全拆解：任何符号测度都是一对相互奇异的测度之差。',
        '⚠ 「至少一个有限」对应符号测度定义里那条「至多取到 ±∞ 中的一个」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.4']
    },

    {
      id: 'def.absolute-continuity',
      cluster: 'analysis.signed',
      type: 'definition',
      label: '绝对连续',
      title: '绝对连续（Absolute Continuity ν ≪ μ）',
      regions: ['analysis'],
      tags: ['定义', '绝对连续'],
      statement: [
        '设 μ 是 (X, ℳ) 上的测度、ν 是符号测度。称 ν **关于 μ 绝对连续**，记作',
        '',
        '$$ν ≪ μ，$$',
        '',
        '当且仅当**每个 μ-零集都是 ν-零集**：',
        '',
        '$$∀E ∈ ℳ, μ(E) = 0 ⟹ ν(E) = 0$$'
      ].join('\n'),
      notes: [
        '一句话：**μ 认为「没有」的地方，ν 也必须认为「没有」**。',
        '⚠ 注意这里 μ(E) = 0 用的是 μ（正测度），而 ν(E) = 0 用的是符号测度；等价说法是 $$|ν|(E) = 0$$。',
        '显然 $$μ ≪ |μ|$$ 且 $$|μ| ≪ μ$$（对测度 μ 自身而言）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.2']
    },

    {
      id: 'prop.ac-and-variations',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: '绝对连续与变差',
      title: '命题：ν ≪ μ ⟺ |ν| ≪ μ ⟺ ν⁺、ν⁻ ≪ μ；ν ⊥ μ 且 ν ≪ μ ⟹ ν = 0',
      regions: ['analysis'],
      tags: ['命题', '绝对连续', '变差', '奇异'],
      statement: [
        '设 μ 是测度，ν 是符号测度。则',
        '',
        '$$ν ≪ μ ⟺ |ν| ≪ μ ⟺ ν⁺ ≪ μ 且 ν⁻ ≪ μ$$',
        '',
        '并且：若同时有 $$ν ⊥ μ$$ 与 $$ν ≪ μ$$，则 $$ν = 0$$。'
      ].join('\n'),
      notes: [
        '后半句「既奇异又绝对连续 ⟹ 等于零」是结构定理的**起始点**：Radon–Nikodym 要说的正是「一般情形下 ν 就是这两部分之和」。',
        '证明：若 ν ⊥ μ，取 E（μ-零）与 F（ν-零）划分空间；由 ν ≪ μ 得 ν(E) = 0；又 ν(F) = 0，故 ν 在整个 X 上为 0。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 3.5']
    },

    {
      id: 'thm.ac-epsilon-delta',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: '绝对连续的 ε–δ 刻画',
      title: '定理（有限情形）：ν ≪ μ ⟺ ∀ε>0 ∃δ>0 ( μ(E)<δ ⟹ |ν(E)|≤ε )',
      regions: ['analysis'],
      tags: ['定理', '绝对连续', 'ε-δ'],
      statement: [
        '设 ν 是**有限**符号测度、μ 是测度。则',
        '',
        '$$ν ≪ μ ⟺ ∀ε > 0, ∃δ > 0 : μ(E) < δ ⟹ |ν(E)| ≤ ε$$'
      ].join('\n'),
      notes: [
        '把「零集上为零」升级成了定量的「小测度上小值」—— 这正是绝对连续这个名字里「连续」两个字的来源。',
        '⚠ 「ν 有限」不能省：否则 $$δ$$ 卡不住（例如 μ = Lebesgue 测度、$$ν(E) = ∫_E 1/x$$ 这类）。',
        '（⟸）方向很直接：μ(E) = 0 时对一切 ε 都有 |ν(E)| ≤ ε，故 ν(E) = 0。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 3.5']
    },

    {
      id: 'prop.integral-gives-ac',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: '积分给出绝对连续测度',
      title: '命题：ν(E) = ∫_E f dμ 关于 μ 绝对连续',
      regions: ['analysis'],
      tags: ['命题', '绝对连续', '积分'],
      statement: [
        '设 μ 是测度，$$f$$ 是广义 μ-可积函数，定义',
        '',
        '$$ν(E) := ∫_E f dμ$$',
        '',
        '则 ν 是符号测度，且 $$ν ≪ μ$$。并且',
        '',
        '$$ν 有限 ⟺ f ∈ L¹(μ)$$'
      ].join('\n'),
      notes: [
        '这是绝对连续测度的**标准来源**，也是 Radon–Nikodym 定理要反过来证明的那件事：**所有**绝对连续的 ν 都长这个样子。',
        '记法上常写成微分形式：',
        '',
        '$$ν(E) = ∫_E f dμ　⟺　dν = f dμ$$'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.2']
    },

    {
      id: 'cor.ac-integral-continuity',
      cluster: 'analysis.signed',
      type: 'corollary',
      label: '积分的绝对连续性',
      title: '推论：∫_E f dμ 在小测度集上任意小',
      regions: ['analysis'],
      tags: ['推论', '绝对连续', 'L¹'],
      statement: [
        '设 $$f ∈ L¹(μ)$$。则',
        '',
        '$$∀ε > 0, ∃δ > 0 : μ(E) < δ ⟹ | ∫_E f dμ | < ε$$'
      ].join('\n'),
      notes: '把「积分给出绝对连续测度」与上一条 ε–δ 刻画拼起来即可（注意 f ∈ L¹ ⟹ ν(E) = ∫_E f dμ 是**有限**符号测度，符合前提）。',
      refs: ['Folland, Real Analysis, Prop. 3.5']
    },

    {
      id: 'lem.singular-or-lower-bound',
      cluster: 'analysis.signed',
      type: 'lemma',
      label: '要么奇异、要么有下界',
      title: '引理：两个有限测度，要么相互奇异，要么在某个正测度集上成比例',
      regions: ['analysis'],
      tags: ['引理', '奇异', 'Hahn 分解'],
      statement: [
        '设 ν、μ 都是**有限**测度。则二者必有一个成立：',
        '',
        '- $$ν ⊥ μ$$；或',
        '- 存在 $$ε > 0$$ 与 $$E ∈ ℳ$$，$$μ(E) > 0$$，使 $$ν ≥ ε μ$$ 在 E 上成立（即 $$ν(F) ≥ ε μ(F)$$ 对一切可测 $$F ⊆ E$$）。'
      ].join('\n'),
      notes: [
        '这是 Radon–Nikodym 证明里的**关键一步**：它提供了一个「往下顶」的 ε，从而可以造出那个上确界函数 f。',
        '证明用的手法很典型：对每个 n，取 $$ν − n⁻¹ μ$$ 的一个 Hahn 分解 $$X = Pₙ ⊔ Nₙ$$。令',
        '',
        '$$P = ⋃ₙ Pₙ，　N = ⋂ₙ Nₙ$$',
        '',
        'N 是每个 $$ν − n⁻¹μ$$ 的负集，于是 $$0 ≤ ν(N) ≤ n⁻¹ μ(N)$$ 对一切 n 成立，令 n → ∞ 得 ν(N) = 0。',
        '于是若 μ(P) = 0，则 ν ⊥ μ（取 E = P、F = N）；若 μ(P) > 0，则某个 n 有 μ(Pₙ) > 0，而 Pₙ 是 $$ν − n⁻¹μ$$ 的正集，即 ν ≥ n⁻¹ μ 在 Pₙ 上成立。∎'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Lemma 3.8']
    },

    {
      id: 'thm.lebesgue-radon-nikodym',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: 'Lebesgue–Radon–Nikodym 定理',
      title: 'Lebesgue–Radon–Nikodym 定理：ν = λ + ρ，λ ⊥ μ，ρ ≪ μ',
      regions: ['analysis'],
      tags: ['定理', 'Radon-Nikodym', 'Lebesgue 分解'],
      statement: [
        '设 ν 是 **σ-有限**符号测度、μ 是 **σ-有限**正测度，都在 (X, ℳ) 上。则存在**唯一**的一对 σ-有限符号测度 λ、ρ 使',
        '',
        '$$λ ⊥ μ，　ρ ≪ μ，　ν = λ + ρ$$',
        '',
        '且 $$ρ$$ 可以写成积分：存在广义 μ-可积函数 $$f$$ 使',
        '',
        '$$dρ = f dμ$$',
        '',
        '任何两个这样的 $$f$$ 都在 μ-a.e. 意义下相等。'
      ].join('\n'),
      notes: [
        '⭐ 这是整个符号测度理论的**结构定理**：任何 ν 都能唯一拆成「与 μ 奇异的部分」+「关于 μ 绝对连续的部分」。',
        '特别地，**当 ν ≪ μ 时**，$$λ = 0$$，于是 $$dν = f dμ$$ —— 这就是通常说的 **Radon–Nikodym 定理**。',
        '⚠ σ-有限不能省（对 ν 和 μ 都要）。',
        '证明的三步（下一段箭头里展开）：I. ν、μ 有限；II. 用 σ-有限切成有限块；III. ν 是符号测度时分别对 $$ν⁺、ν⁻$$ 做。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.8']
    },

    {
      id: 'def.rn-derivative',
      cluster: 'analysis.signed',
      type: 'definition',
      label: 'RN 导数与 Lebesgue 分解',
      title: 'Radon–Nikodym 导数 dν/dμ 与 Lebesgue 分解',
      regions: ['analysis'],
      tags: ['定义', 'RN 导数', 'Lebesgue 分解'],
      statement: [
        '设 $$ν ≪ μ$$（都是 σ-有限的）。取定理里的 $$f$$，称',
        '',
        '$$f = (dν/dμ)$$',
        '',
        '为 ν 关于 μ 的 **Radon–Nikodym 导数**（注意它定义在「μ-本质相同的函数类」上，不是单个函数）。',
        '',
        '一般的分解 $$ν = λ + ρ$$（$$λ ⊥ μ$$，$$ρ ≪ μ$$）称为 ν 关于 μ 的 **Lebesgue 分解**。'
      ].join('\n'),
      notes: [
        '记号的用意：$$dν = f dμ$$ 看起来就像两个「微分」的商。',
        '⚠ 「μ-本质相同」= μ-a.e. 相等 —— 这是 RN 导数唯一的**唯一性**内容：它不是一个函数，而是一个等价类。',
        '术语提醒：「Lebesgue 分解」这个名字在两个地方出现 —— 这里指的是 ν 拆成奇异部分 + 绝对连续部分。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.2']
    },

    {
      id: 'prop.rn-chain-rule',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: 'RN 导数的链式法则',
      title: '命题：RN 导数的换元公式与链式法则',
      regions: ['analysis'],
      tags: ['命题', 'RN 导数', '链式法则'],
      statement: [
        '设 ν 是 σ-有限符号测度、μ 与 λ 是 σ-有限测度，且',
        '',
        '$$ν ≪ μ，　μ ≪ λ$$',
        '',
        '**(a)** 若 $$g ∈ L¹(ν)$$，则 $$g (dν/dμ) ∈ L¹(μ)$$，且',
        '',
        '$$∫ g dν = ∫ g (dν/dμ) dμ$$',
        '',
        '**(b)** 此时 $$ν ≪ λ$$，且**链式法则**成立：',
        '',
        '$$(dν/dλ) = (dν/dμ) · (dμ/dλ)　(λ-a.e.)$$'
      ].join('\n'),
      notes: [
        '(a) 就是「换元公式」：把对 ν 的积分换成对 μ 的积分，代价是乘上 RN 导数。它对指示函数成立、于是对简单函数成立、再用单调收敛到 L⁺、最后到 L¹(ν)。',
        '(b) 的证明用 (a)：对任意可测 E，',
        '',
        '$$ν(E) = ∫_E (dν/dμ) dμ = ∫_E (dν/dμ) · (dμ/dλ) dλ$$',
        '',
        '两边对照 $$ν(E) = ∫_E (dν/dλ) dλ$$ 即得（「用积分识别函数」那条命题正是用来做这一步的）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.9']
    },

    {
      id: 'cor.rn-inverse',
      cluster: 'analysis.signed',
      type: 'corollary',
      label: '互为绝对连续时导数互逆',
      title: '推论：μ ≪ λ 且 λ ≪ μ ⟹ (dμ/dλ)(dλ/dμ) = 1',
      regions: ['analysis'],
      tags: ['推论', 'RN 导数'],
      statement: [
        '若 $$μ ≪ λ$$ 且 $$λ ≪ μ$$（两个 σ-有限测度互为绝对连续），则',
        '',
        '$$(dμ/dλ) · (dλ/dμ) = 1　a.e.$$'
      ].join('\n'),
      notes: '两条链式法则一拼：$$dμ / dμ = (dμ/dλ)·(dλ/dμ)$$，而 $$dμ / dμ ≡ 1$$。',
      refs: ['Folland, Real Analysis, Theorem 3.9']
    },

    {
      id: 'def.complex-measure',
      cluster: 'analysis.signed',
      type: 'definition',
      label: '复测度',
      title: '复测度（Complex Measure）',
      regions: ['analysis'],
      tags: ['定义', '复测度'],
      statement: [
        '可测空间 (X, ℳ) 上的**复测度**是一个映射',
        '',
        '$$ν : ℳ → ℂ$$',
        '',
        '满足',
        '',
        '$$ν(∅) = 0，$$',
        '',
        '且对两两不交的 $${Eⱼ} ⊆ ℳ$$：',
        '',
        '$$ν( ⨆ⱼ Eⱼ ) = ∑ⱼ ν(Eⱼ)，右边的级数绝对收敛$$'
      ].join('\n'),
      notes: [
        '⚠ 与符号测度相比，复测度**自动有限**（取值在 ℂ 里，不涉及 ±∞），而且可数可加性里的那个级数**自动绝对收敛**。',
        '所以在复测度的世界里，「有限性」「重排问题」这些麻烦全部消失 —— 代价是不能再有「无穷质量」的例子。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.3']
    },

    {
      id: 'thm.rn-complex',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: '复测度的 Radon–Nikodym',
      title: '定理：复测度的 ν = λ + f dμ 分解',
      regions: ['analysis'],
      tags: ['定理', 'Radon-Nikodym', '复测度'],
      statement: [
        '设 ν 是复测度、μ 是 **σ-有限**测度。则存在复测度 λ 与 $$f ∈ L¹(μ)$$ 使',
        '',
        '$$dν = dλ + f dμ，　λ ⊥ μ，$$',
        '',
        '且在 a.e. 意义下唯一。'
      ].join('\n'),
      notes: [
        '复测度可以拆成实部与虚部、各自再用符号测度的版本 —— 这是把上一套结论搬到复情形的标准做法。',
        '⚠ 这里 $$f ∈ L¹(μ)$$ 而不再是「广义可积」：因为复测度有限，$$f$$ 必须真可积。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.11']
    },

    {
      id: 'prop.total-variation-basics',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: '全变差的基本性质',
      title: '命题：|ν(E)| ≤ |ν|(E)，且 d|ν| = |f| dμ',
      regions: ['analysis'],
      tags: ['命题', '全变差', '复测度'],
      statement: [
        '设 ν 是复测度（或符号测度），$$|ν|$$ 是它的全变差。则',
        '',
        '**(a)** $$|ν(E)| ≤ |ν|(E)$$ 对一切 $$E ∈ ℳ$$ 成立；',
        '',
        '**(b)** 若 $$dν = f dμ$$（即 ν ≪ μ）则 $$d|ν| = |f| dμ$$，即',
        '',
        '$$|ν|(E) = ∫_E |f| dμ$$'
      ].join('\n'),
      notes: [
        '(b) 的证法（笔记里）：先取 $$ρ = |ν₁| + |ν₂|$$ 把 ν 的两个不同表示拉到一个共同的「基准测度」上，再用 Radon–Nikodym 与链式法则把两个密度都换到 ρ 上。于是要证的就是',
        '',
        '$$|f₁| (dμ₁/dρ) = |f₂| (dμ₂/dρ)　ρ-a.e.$$',
        '',
        '从而 $$|f₁| dμ₁ = |f₂| dμ₂$$ —— 说明全变差的密度与「用哪个 μ 表示 ν」无关。',
        '由此也得到一个实用的直觉：**全变差就是「把质量取绝对值之后再测一遍」**。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.3', 'Rudin, Real and Complex Analysis, Ch. 6']
    }
  ],

  edges: [

    {
      id: 'imp.hahn',
      kind: 'implication',
      sources: ['def.signed-measure', 'prop.positive-set-closure'],
      target: 'thm.hahn-decomposition',
      title: '符号测度 + 正集的封闭性 ⟹ Hahn 分解',
      proof: [
        '**① 先把 ν 的无穷值甩掉。** 不妨设 ν 不取 +∞（若 ν 不取 −∞ 就改证 −ν）。于是 $$ν(X) < ∞$$ 中的「上方」是安全的。',
        '',
        '**② 挑一个「最大的正集」。** 令',
        '',
        '$$m := sup{ ν(E) : E 是正集 }，$$',
        '',
        '则 $$m < ∞$$（因为 ν 不取 +∞ 而 ν(E) ≤ ν(X) 型估计受控）。取一列正集 $${Pⱼ}$$ 使 $$ν(Pⱼ) → m$$，令',
        '',
        '$$P = ⋃ⱼ Pⱼ$$',
        '',
        '由正集的可数并仍是正集，P 是正集；且 $$ν(P) = m$$（正集的不交化 + 可数可加）。',
        '',
        '**③ 断言 N = X ∖ P 是负集。** 反设 N 不含负集，即 N 不是负的。要证它会挤出一个比 m 更大的正集。',
        '',
        '**④ 在 N 里挖出正集。** 若 N 不是负集，则存在可测 $$A ⊆ N$$ 使 $$ν(A) > 0$$。「A 是正的」就到此结束；否则存在 $$A₁ ⊆ A$$ 使 $$ν(A₁) < 0$$。取**最小的自然数** $$n$$ 使',
        '',
        '$$ν(A₁) < −1/n$$',
        '',
        '（笔记原话：「$$n₁$$ 是使存在负测度集 ≤ −1/n₁ 的最小 n，最靠前」。**取最小**这一步是关键 —— 它保证后面能取极限。）',
        '',
        '再在 $$A ∖ A₁$$ 里重复同样的操作，得到 $$A₂, …$$',
        '',
        '**⑤ 若操作终止**，剩下的 $$B = A ∖ ⋃ₖ Aₖ$$ 就是正集（因为已经没有负子集可以挖了）。',
        '**⑥ 若操作不终止**，取 $$B = A ∖ ⋃ₖ Aₖ$$。由可数可加性',
        '',
        '$$ν(A) = ν(B) + ∑ₖ ν(Aₖ)$$',
        '',
        '而 $$∑ₖ |ν(Aₖ)| < ∞$$（因为左边有限），特别地 $$ν(Aₖ) → 0$$，这迫使 $$nₖ → ∞$$，从而对任意 $$F ⊆ B$$：若 $$ν(F) < −1/n_{k-1}$$，就与 $$nₖ$$ 的**最小性**矛盾。于是 $$ν(F) ≥ −1/n_{k-1}$$ 对一切 k 成立，令 k → ∞ 得 $$ν(F) ≥ 0$$。故 B 也是正集。',
        '',
        '**⑦ 矛盾。** 由 ⑤⑥，A 中含正集 B。于',
        '',
        '$$ν(B) = ν(A) − ∑ₖ ν(Aₖ) > 0$$',
        '',
        '说明 $$P ∪ B$$ 是正集且 $$ν(P ∪ B) = m + ν(B) > m$$，与 m 的定义矛盾。故 N 必为负集，$$X = P ⊔ N$$ 就是 Hahn 分解，**存在性得证**。',
        '',
        '**⑧ 唯一性。** 设 $$P′ ⊔ N′$$ 是另一对。则 $$P ∖ P′ ⊆ P$$（正集）且 $$⊆ N′$$（负集），所以它既是正集又是负集 —— 只能是零集；同理 $$P′ ∖ P$$ 也是零集。故 $$P △ P′ = N △ N′$$ 是 ν-零集。∎'
      ].join('\n'),
      note: '⭐ 笔记里那段「取最小的 n」是整段证明的技术核心：因为 n 取最小，后面才能让 $$ν(F) ≥ −1/n_{k-1}$$ 一路通过 k → ∞ 得到 $$ν(F) ≥ 0$$。'
    },

    {
      id: 'imp.jordan',
      kind: 'implication',
      sources: ['thm.hahn-decomposition'],
      target: 'thm.jordan-decomposition',
      title: 'Hahn 分解 ⟹ Jordan 分解',
      proof: [
        '取 ν 的一个 Hahn 分解 $$X = P ⊔ N$$（P 正、N 负）。定义',
        '',
        '$$ν⁺(E) := ν(E ∩ P)，　ν⁻(E) := −ν(E ∩ N)$$',
        '',
        '**① 它们都是测度。** 对 ν⁺：$$ν⁺(∅) = ν(∅) = 0$$；对不交的 $${Eⱼ}$$，',
        '',
        '$$ν⁺( ⨆ⱼ Eⱼ ) = ν( ⨆ⱼ (Eⱼ ∩ P) ) = ∑ⱼ ν(Eⱼ ∩ P) = ∑ⱼ ν⁺(Eⱼ)$$',
        '',
        '（右边的每一项都 ≥ 0，因为 $$Eⱼ ∩ P$$ 是正集的子集。）ν⁻ 同理。',
        '',
        '**② ν = ν⁺ − ν⁻。** 对任意 E，',
        '',
        '$$ν(E) = ν(E ∩ P) + ν(E ∩ N) = ν⁺(E) − ν⁻(E)$$',
        '',
        '**③ ν⁺ ⊥ ν⁻。** 取 $$E = P$$、$$F = N$$：P 是 ν⁻-零集（ν⁻(P) = −ν(P ∩ N) = 0），N 是 ν⁺-零集。',
        '',
        '**④ 至少一个有限。** 由符号测度的定义，ν 至多取到 ±∞ 中的一个：若 ν 不取 +∞ 则 ν⁺ 有限，若 ν 不取 −∞ 则 ν⁻ 有限。',
        '',
        '**⑤ 唯一性。** 设 $$ν = μ₁ − μ₂$$ 也是这种分解（$$μ₁ ⊥ μ₂$$）。取见证奇异性的划分 $$X = E ⊔ F$$（E 是 μ₁-零集、F 是 μ₂-零集）。由 Hahn 分解的唯一性只能差一个零集，逐块比较即可得到 $$μ₁ = ν⁺$$、$$μ₂ = ν⁻$$。∎'
      ].join('\n')
    },

    {
      id: 'imp.ac-epsilon-delta',
      kind: 'implication',
      sources: ['def.absolute-continuity'],
      target: 'thm.ac-epsilon-delta',
      title: '绝对连续 ⟹ ε–δ 刻画（ν 有限时）',
      proof: [
        '设 ν 有限且 $$ν ≪ μ$$。由「绝对连续与变差」那条命题，可以**不妨设 ν 本身就是正测度**（换成 |ν| 不影响结论）。',
        '',
        '**(⟸)** 若 μ(E) = 0，则对任意 ε > 0 有 μ(E) < δ，于是 |ν(E)| ≤ ε；令 ε → 0 得 ν(E) = 0。',
        '',
        '**(⟹) 反证。** 设存在 ε > 0，使对**一切** n 都能找到 $$Eₙ ∈ ℳ$$ 满足',
        '',
        '$$μ(Eₙ) < 2⁻ⁿ，　ν(Eₙ) ≥ ε$$',
        '',
        '令',
        '',
        '$$Fₖ = ⋃_{n ≥ k} Eₙ，　F = ⋂ₖ Fₖ$$',
        '',
        '则 $$μ(Fₖ) ≤ ∑_{n≥k} 2⁻ⁿ = 2^{1−k} → 0$$，由 μ 的下连续性与递减性得 $$μ(F) = 0$$。',
        '',
        '另一方面 $$ν(Fₖ) ≥ ν(Eₖ) ≥ ε$$ 对一切 k 成立；由 ν 有限与测度的下连续性（$$Fₖ ↘ F$$，首项有限）得',
        '',
        '$$ν(F) = limₖ ν(Fₖ) ≥ ε > 0$$',
        '',
        '这与 $$ν ≪ μ$$（μ(F) = 0 应推出 ν(F) = 0）矛盾。故这样的 ε 不存在，即对每个 ε > 0 都有对应的 δ。∎',
        '',
        '> ⭐ 反证里那个「对一切 n 都能找到」是取出的关键：它把「不连续」翻译成了一列越来越小的坏集合，再用 Borel–Cantelli 型的尾并把它们压成零集。'
      ].join('\n')
    },

    {
      id: 'imp.lebesgue-rn',
      kind: 'implication',
      sources: ['lem.singular-or-lower-bound', 'thm.mct', 'prop.ac-and-variations'],
      target: 'thm.lebesgue-radon-nikodym',
      title: '「要么奇异、要么有下界」⟹ Lebesgue–Radon–Nikodym',
      proof: [
        '**I. 先设 ν、μ 都有限，且 ν ≥ 0。**',
        '',
        '**① 造候选函数集。** 令',
        '',
        '$$ℱ := { f : X → [0, +∞] : ∫_E f dμ ≤ ν(E)　∀E ∈ ℳ }$$',
        '',
        '则 $$0 ∈ ℱ$$，且 ℱ 对**取大**封闭：若 f, g ∈ ℱ，令 $$A = {f > g}$$、$$h = max(f, g)$$，则对任意 E，',
        '',
        '$$∫_E h dμ = ∫_{E∩A} f dμ + ∫_{E∖A} g dμ ≤ ν(E∩A) + ν(E∖A) = ν(E)$$',
        '',
        '故 h ∈ ℱ。',
        '',
        '**② 取上确界。** 令 $$a := sup{ ∫f dμ : f ∈ ℱ } ≤ ν(X) < ∞$$（这一步用到 ν 有限）。取 $${fₙ} ⊆ ℱ$$ 使 $$∫fₙ dμ → a$$，令',
        '',
        '$$gₙ = max(f₁, …, fₙ)，　f = supₙ fₙ$$',
        '',
        '由 ① 每个 $$gₙ ∈ ℱ$$，且 $$gₙ ↑ f$$、$$∫gₙ dμ ≥ ∫fₙ dμ$$，故 $$limₙ ∫gₙ dμ = a$$。由 **MCT**，$$f ∈ ℱ$$ 且 $$∫f dμ = a$$。',
        '',
        '**③ 断言 $$dλ := dν − f dμ$$ 与 μ 奇异。** 反设不然，由**引理**，存在 ε > 0 与 $$E ∈ ℳ$$、μ(E) > 0，使 $$λ ≥ εμ$$ 在 E 上成立，即',
        '',
        '$$ε χ_E dμ ≤ dν − f dμ　⟹　(f + ε χ_E) dμ ≤ dν$$',
        '',
        '于是 $$f + ε χ_E ∈ ℱ$$，但',
        '',
        '$$∫ (f + ε χ_E) dμ = a + ε·μ(E) > a$$',
        '',
        '与 a 的**上确界**性矛盾。故 λ ⊥ μ，$$ν = λ + (f dμ)$$ 就是所要的分解。',
        '',
        '**④ 唯一性。** 设 $$dν = dλ′ + f′ dμ$$ 是另一种分解。则',
        '',
        '$$dλ − dλ′ = (f′ − f) dμ$$',
        '',
        '左边与 μ 奇异（两个各与 μ 奇异的测度之差仍与 μ 奇异），右边关于 μ 绝对连续。由「既奇异又绝对连续 ⟹ 等于零」，两边都是 0，即 $$λ = λ′$$ 且 $$f = f′$$ μ-a.e.。',
        '',
        '**II. 推广到 σ-有限。** 取 $$X = ⋃ⱼ Aⱼ$$（$$μ(Aⱼ) < ∞$$、$$ν(Aⱼ) < ∞$$）。令',
        '',
        '$$μⱼ(E) := μ(E ∩ Aⱼ)，　νⱼ(E) := ν(E ∩ Aⱼ)$$',
        '',
        '对每一对 $$(μⱼ, νⱼ)$$ 用 I，得 $$dνⱼ = dλⱼ + fⱼ dμⱼ$$。规定 $$λⱼ(Aⱼᶜ) = 0$$、$$fⱼ = 0$$ 在 $$Aⱼᶜ$$ 上，令',
        '',
        '$$λ := ∑ⱼ λⱼ，　f := ∑ⱼ fⱼ$$',
        '',
        '则 $$dν = dλ + f dμ$$、$$λ ⊥ μ$$，且 dλ、f dμ 都 σ-有限。',
        '',
        '**III. ν 是符号测度。** 把 I、II 分别用在 $$ν⁺$$ 与 $$ν⁻$$ 上（由「绝对连续与变差」，绝对连续性对变差是逐块的），再把结果相加。∎'
      ].join('\n'),
      note: '⭐ ③ 那一步是全证明的枢纽：假如 λ 还「留了一点 μ-质量」，就能拿它把 f 往上顶一点、得出比上确界 a 更大的值 —— 于是 λ 只能全部跑到 μ 看不到的地方去，即 λ ⊥ μ。'
    },

    {
      id: 'imp.rn-chain-rule',
      kind: 'implication',
      sources: ['prop.integral-gives-ac', 'prop.integrals-equal-iff'],
      target: 'prop.rn-chain-rule',
      title: '换元公式与链式法则',
      proof: [
        '设 $$ν ≪ μ ≪ λ$$。',
        '',
        '**(a) 换元公式 $$∫ g dν = ∫ g (dν/dμ) dμ$$。** 分四步爬：',
        '',
        '· $$g = χ_E$$：左边是 $$ν(E) = ∫_E (dν/dμ) dμ$$（这正是 RN 定理的内容），右边同；',
        '· g 是简单函数：由线性；',
        '· $$g ∈ L⁺$$：取简单函数列 $$gₙ ↑ g$$，两边各用一次 MCT；',
        '· $$g ∈ L¹(ν)$$：拆正负部。',
        '',
        '**(b) 链式法则。** 对任意可测 E，用 (a) 两次：',
        '',
        '$$ν(E) = ∫_E (dν/dμ) dμ = ∫_E (dν/dμ) · (dμ/dλ) dλ$$',
        '',
        '另一方面又有 $$ν(E) = ∫_E (dν/dλ) dλ$$（因为 ν ≪ λ）。两式对**一切** E 相等，由「用积分识别函数」，两个密度 λ-a.e. 相等：',
        '',
        '$$(dν/dλ) = (dν/dμ) · (dμ/dλ)　λ-a.e.$$',
        '',
        '∎'
      ].join('\n')
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.signed-positive',
      kind: 'definition',
      definition: 'def.signed-measure',
      usedBy: 'def.positive-negative-null',
      note: '正负集是针对符号测度定义的。'
    },
    {
      id: 'def-link.positive-hahn',
      kind: 'definition',
      definition: 'def.positive-negative-null',
      usedBy: 'thm.hahn-decomposition',
      note: 'Hahn 分解的结论就是「空间切成一个正集 + 一个负集」。'
    },
    {
      id: 'def-link.signed-jordan',
      kind: 'definition',
      definition: 'def.signed-measure',
      usedBy: 'thm.jordan-decomposition',
      note: 'Jordan 分解把符号测度拆成两个测度之差。'
    },
    {
      id: 'def-link.hahn-jordan',
      kind: 'definition',
      definition: 'thm.hahn-decomposition',
      usedBy: 'thm.jordan-decomposition',
      note: 'ν⁺、ν⁻ 的造法直接来自 Hahn 分解的那个划分。'
    },
    {
      id: 'def-link.singular-jordan',
      kind: 'definition',
      definition: 'def.mutually-singular',
      usedBy: 'thm.jordan-decomposition',
      note: 'Jordan 分解里那个 ν⁺ ⊥ ν⁻ 用的就是相互奇异。'
    },
    {
      id: 'def-link.measure-ac',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'def.absolute-continuity',
      note: '绝对连续里被参照的 μ 是一个真测度。'
    },
    {
      id: 'def-link.variations-ac',
      kind: 'definition',
      definition: 'thm.jordan-decomposition',
      usedBy: 'prop.ac-and-variations',
      note: '命题是用 ν⁺、ν⁻ 把绝对连续性拆成两半说的。'
    },
    {
      id: 'def-link.ac-lemma',
      kind: 'definition',
      definition: 'def.absolute-continuity',
      usedBy: 'lem.singular-or-lower-bound',
      note: '引理出场的目的是为 RN 定理准备「ε 下界」。'
    },
    {
      id: 'def-link.singular-lemma',
      kind: 'definition',
      definition: 'def.mutually-singular',
      usedBy: 'lem.singular-or-lower-bound',
      note: '引理的另一半结论就是相互奇异。'
    },
    {
      id: 'def-link.ac-rn',
      kind: 'definition',
      definition: 'def.absolute-continuity',
      usedBy: 'thm.lebesgue-radon-nikodym',
      note: 'L–R–N 里那个 ρ ≪ μ 就是绝对连续。'
    },
    {
      id: 'def-link.singular-rn',
      kind: 'definition',
      definition: 'def.mutually-singular',
      usedBy: 'thm.lebesgue-radon-nikodym',
      note: '同时用到「与 μ 奇异」那一半。'
    },
    {
      id: 'def-link.integral-ac',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.integral-gives-ac',
      note: '「ν 有限 ⟺ f ∈ L¹(μ)」用到可积的定义。'
    },
    {
      id: 'def-link.complex-rn',
      kind: 'definition',
      definition: 'def.complex-measure',
      usedBy: 'thm.rn-complex',
      note: '这条定理就是复测度版本的 L–R–N。'
    },
    {
      id: 'def-link.integrable-complex-rn',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.rn-complex',
      note: '复情形下密度必须是 L¹ 的。'
    },
    {
      id: 'def-link.measure-totalvariation',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'prop.total-variation-basics',
      note: '全变差本身是一个测度。'
    }
  ]
});
