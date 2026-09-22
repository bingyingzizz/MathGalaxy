/* ==========================================================================
   内容包 · 可测函数
   --------------------------------------------------------------------------
   来自手写笔记「总结：积分」第 1 ~ 2 页。

   这一包是积分的全部前置：什么样的函数「值得积分」。
   主线：可测的定义 → 判定准则 → 对运算封闭 → 简单函数逼近 → 完备性的作用
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '可测函数',
  nodes: [

    {
      id: 'def.measurable-function',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '可测函数',
      title: '可测函数（Measurable Function）',
      regions: ['analysis'],
      tags: ['定义', '可测函数'],
      statement: [
        '设 (X, ℳ) 与 (Y, 𝒩) 是可测空间。函数 $$f : X → Y$$ 是 **(ℳ, 𝒩)-可测的**，当且仅当每个可测集的原像可测：',
        '',
        '$$f⁻¹(E) ∈ ℳ　∀E ∈ 𝒩$$'
      ].join('\n'),
      notes: [
        '为什么用「原像」而不是「像」：原像对交、并、补全部保持（$$f⁻¹(⋃Eᵢ) = ⋃f⁻¹(Eᵢ)$$ 等），像是没有这些好性质的。所以可测性是「拉回」过去的条件。',
        '等价说法（当 Y 是拓扑空间、𝒩 = 𝔅_Y 时）：f 可测 ⟺ 每个开集的原像可测。',
        '⚠ 「在 E 上可测」是相对说法：$$f$$ 在 E 上可测 ⟺ $$f|_E$$ 关于子空间 σ-代数 $$ℳ_E$$ 可测。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.1', 'Halmos, Measure Theory, §18']
    },

    {
      id: 'prop.measurable-criterion',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '可测性的两条判定准则',
      title: '命题：复合保持可测；只需在生成元上验证',
      regions: ['analysis'],
      tags: ['命题', '可测', '生成元', '复合'],
      statement: [
        '**(1) 复合**：若 $$f : X → Y$$ 是 (ℳ, 𝒩)-可测、$$g : Y → Z$$ 是 (𝒩, 𝒪)-可测，则 $$g ∘ f$$ 是 (ℳ, 𝒪)-可测。',
        '',
        '**(2) 只需验证生成元**：若 𝒩 = ℳ(ℰ)，则',
        '',
        '$$f : X → Y 可测 ⟺ f⁻¹(E) ∈ ℳ　∀E ∈ ℰ$$'
      ].join('\n'),
      notes: [
        '(1)：对 E ∈ 𝒪 有 $$(g∘f)⁻¹(E) = f⁻¹(g⁻¹(E))$$，两层都可测。',
        '(2) 的 (⟸)：令 𝒞 = { E ⊆ Y : f⁻¹(E) ∈ ℳ }。因为原像保持并、交、补，**𝒞 是一个 σ-代数**；题设说 ℰ ⊆ 𝒞，于是 ℳ(ℰ) ⊆ 𝒞，即所有可测集的原像都可测。',
        '(2) 是整段里最常用的判定工具：要证 f 可测，只需在一小族生成元上验证 —— 比如 ℝ 值函数只需验证 $$f⁻¹((a, ∞))$$ 可测。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.1']
    },

    {
      id: 'cor.continuous-measurable',
      cluster: 'analysis.integral',
      type: 'corollary',
      label: '连续 ⟹ Borel 可测',
      title: '推论：连续函数是 Borel 可测的',
      regions: ['analysis', 'topology'],
      tags: ['推论', '连续', 'Borel'],
      statement: [
        '设 X, Y 是拓扑空间，各配 Borel σ-代数 $$𝔅_X, 𝔅_Y$$。则',
        '',
        '$$f : X → Y 连续 ⟹ f 是 (𝔅_X, 𝔅_Y)-可测的$$'
      ].join('\n'),
      notes: '连续的定义就是「开集的原像开」；而开集生成 𝔅_Y，用上一条的判定准则 (2) 立刻得到。'
    },

    {
      id: 'def.lebesgue-measurable',
      cluster: 'analysis.integral',
      type: 'definition',
      label: 'Lebesgue 可测',
      title: 'Lebesgue 可测 / Borel 可测（ℝ → ℂ 的情形）',
      regions: ['analysis'],
      tags: ['定义', 'Lebesgue 可测', 'Borel'],
      statement: [
        '对 $$f : ℝ → ℂ$$：',
        '',
        '- 若 f 是 $$(ℒ, 𝔅_ℂ)$$-可测，称 f **Lebesgue 可测**（ℒ 是 Lebesgue σ-代数）；',
        '- 若 f 是 $$(𝔅_ℝ, 𝔅_ℂ)$$-可测，称 f **Borel 可测**。'
      ].join('\n'),
      notes: [
        '⚠ **注意这里有个坑：两个 Lebesgue 可测函数的复合不一定 Lebesgue 可测。**',
        '',
        '原因：复合要跑通 (1) 需要中间那个 σ-代数配合，而 ℒ 严格大于 𝔅_ℝ。取 f : ℝ → ℝ Lebesgue 可测、g : ℝ → ℝ Lebesgue 可测，则 $$g∘f$$ 关于 ℒ 未必可测 —— 因为 $$g⁻¹$$ 只能保证把 𝔅_ℝ 里的集合拉回 ℒ，而 $$f⁻¹$$ 需要在 ℝ 里取一个**非 Borel 的 Lebesgue 可测集**才能出问题。',
        '标准修法：让中间那个函数 Borel 可测。若 g 是 Borel 可测、f 是 Lebesgue 可测，则 g∘f 是 Lebesgue 可测的。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.1']
    },

    {
      id: 'prop.measurable-product-and-realimag',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '积空间与实虚部',
      title: '命题：可测函数到积空间；f 可测 ⟺ 实部虚部可测',
      regions: ['analysis'],
      tags: ['命题', '积空间', '实部虚部'],
      statement: [
        '**(1)** 设 (X, ℳ)、(Y_α, 𝒩_α) (α ∈ A) 是可测空间，$$Y = ∏_{α} Y_α$$，$$𝒩 = ⊗_{α} 𝒩_α$$，$$π_α : Y → Y_α$$ 是投影。则',
        '',
        '$$f : X → Y 可测 ⟺ f_α = π_α ∘ f 可测（∀α ∈ A）$$',
        '',
        '**(2)** 特别地，$$f : X → ℂ$$ 可测 ⟺ $$Re f$$ 与 $$Im f$$ 都可测。'
      ].join('\n'),
      notes: [
        '(1) 的 (⟹)：投影 π_α 本身可测（π_α⁻¹(E_α) 是柱集），用复合保持。',
        '(1) 的 (⟸)：只要证柱集的原像可测 —— 而 $$f⁻¹(π_α⁻¹(E_α)) = f_α⁻¹(E_α)$$ 可测 —— 再由积 σ-代数由柱集生成、用判定准则 (2)。',
        '(2) 的证明用了一个干净的事实：**ℂ 的 Borel σ-代数与 ℝ² 的 Borel σ-代数是同一个**：',
        '',
        '$$𝔅_ℂ = 𝔅_{ℝ²} = 𝔅_ℝ ⊗ 𝔅_ℝ$$',
        '',
        '于是 (2) 就是 (1) 在 A = {1, 2} 时的特例。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.3']
    },

    {
      id: 'prop.measurable-closure',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '可测函数的封闭性',
      title: '命题：可测函数对和、积、sup、max、极限封闭',
      regions: ['analysis'],
      tags: ['命题', '封闭性', 'sup', '极限'],
      statement: [
        '以下都设函数取值在 ℝ̄ = [−∞, +∞] 或 ℂ 中，且可测。',
        '',
        '- **和与积**：$$f + g$$、$$fg$$ 可测；',
        '- **逐点上确界**：$${fⱼ}$$ 可测 ⟹ $$supⱼ fⱼ$$ 可测；',
        '- **有限个取大**：$$f, g$$ 可测 ⟹ $$max(f, g)$$ 可测；',
        '- **极限**：若 $$limⱼ fⱼ$$ 逐点存在，则它是可测的。'
      ].join('\n'),
      notes: [
        '$$supⱼ fⱼ$$ 的关键：$$(supⱼ fⱼ)⁻¹((a, +∞]) = ⋃ⱼ fⱼ⁻¹((a, +∞])$$ 是可数并，故可测。（取 $$(a, +∞]$$ 这族生成元就够了。）',
        'max 是 sup 的有限特例（把不够的地方补成 $$-∞$$）。',
        '极限：$$lim infⱼ fⱼ = supₙ inf_{j≥n} fⱼ$$，而 inf 可以由 sup 取负得到（$$inf fⱼ = -sup(-fⱼ)$$），所以极限是可测函数经过可数次 sup/inf 得到的。',
        '和与积：把 $$supⱼ fⱼ$$ 的做法搬到 $${f+g > a}$$ 上（用有理数把 $$f > q > a − g$$ 拆开），或先对简单函数验证再逼近。',
        '⭐ 这条命题是**整个积分理论的地基**：它保证「可测函数取极限之后仍然可测」，而后面 MCT / Fatou / DCT 全都是在取极限。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.7']
    },

    {
      id: 'def.simple-function',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '简单函数',
      title: '简单函数（Simple Function）',
      regions: ['analysis'],
      tags: ['定义', '简单函数'],
      statement: [
        '可测函数 $$φ : X → ℂ$$ 是**简单函数**，当且仅当它只取**有限多个值**。等价地，它可以写成',
        '',
        '$$φ = ∑_{j=1}^{n} aⱼ χ_{Eⱼ}$$',
        '',
        '其中 $$aⱼ ∈ ℂ$$，$$Eⱼ = φ⁻¹({aⱼ}) ∈ ℳ$$ 两两不交。'
      ].join('\n'),
      notes: [
        '简单函数就是可测版本的「阶梯函数」—— 有限个「台阶」。',
        '它是整个积分理论的**起点**：先给简单函数定义积分（就是加权和），再用「简单函数从下面逼近」把积分推广到一切非负可测函数。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.2']
    },

    {
      id: 'thm.simple-approximation',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '简单函数逼近',
      title: '定理：可测函数都是简单函数列的极限',
      regions: ['analysis'],
      tags: ['定理', '简单函数', '逼近'],
      statement: [
        '**(a)** 若 $$f : X → [0, +∞]$$ 可测，则存在简单函数列 $${φₙ}$$ 使',
        '',
        '$$0 ≤ φ₁ ≤ φ₂ ≤ ⋯ ≤ f，　φₙ → f 逐点，$$',
        '',
        '并且**在 f 有界的集合上还是一致收敛**。',
        '',
        '**(b)** 一般地（$$f : X → ℂ$$ 可测），可取 $${φₙ}$$ 简单使',
        '',
        '$$0 ≤ |φ₁| ≤ |φ₂| ≤ ⋯ ≤ |f|，　φₙ → f 逐点$$'
      ].join('\n'),
      notes: [
        '(a) 的构造就是「切蛋糕」：把值域在 [0, n) 上按 $$2⁻ⁿ$$ 切碎，超过 n 的部分一律抹成 n ——',
        '',
        '$$φₙ = ∑_{k=0}^{2ⁿ·n−1} k·2⁻ⁿ·χ_{Eₙᵏ} + n·χ_{Fₙ}，$$',
        '$$Eₙᵏ = f⁻¹((k·2⁻ⁿ, (k+1)·2⁻ⁿ])，　Fₙ = f⁻¹((n, +∞])$$',
        '',
        '每一层都是可测集的原像，所以 φₙ 是简单函数；n 越大格子越细、天花板越高，于是单调递增地爬到 f。',
        '(b) 把 $$f = g + ih$$ 拆成 $$g = g⁺ − g⁻$$、$$h = h⁺ − h⁻$$，对四个非负部分用 (a)：',
        '',
        '$$φₙ = ψₙ⁺ − ψₙ⁻ + i(ζₙ⁺ − ζₙ⁻)$$'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.10']
    },

    {
      id: 'prop.complete-measurable',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '完备性 ⟺ 不破坏可测性',
      title: '命题：μ 完备 ⟺ 几乎处处相等 / 几乎处处收敛不破坏可测性',
      regions: ['analysis'],
      tags: ['命题', '完备', '几乎处处'],
      statement: [
        '设 (X, ℳ, μ) 是测度空间。则 μ **完备**当且仅当下面两条都成立：',
        '',
        '**(a)** $$f$$ 可测且 $$f = g$$ μ-a.e. ⟹ $$g$$ 可测；',
        '',
        '**(b)** 每个 $$fₙ$$ 可测且 $$fₙ → f$$ μ-a.e. ⟹ $$f$$ 可测。'
      ].join('\n'),
      notes: [
        '(⟹) 是完备性的直接好处：重新定义零集上的值不改变可测性。',
        '(⟸) 是这条命题有意思的地方 —— 它说明**完备性恰好是「不破坏可测性」所需的全部**。构造：取零集 E（μ(E) = 0）里一个不可测的子集 F（若 μ 不完备，这样的 F 存在），令',
        '',
        '$$f ≡ 0，　g = χ_F$$',
        '',
        '则 $$f$$ 可测、$$f = g$$ 在 E 外处处成立（即 a.e.），但',
        '',
        '$${f ≠ g} = F$$',
        '',
        '不可测，所以 $$g⁻¹((0, +∞]) = F$$ 不可测，g 不可测。(a) 失败 ⟹ μ 不完备。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.11']
    },

    {
      id: 'prop.completion-measurable-function',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '完备化后可改在零集上',
      title: '命题：完备化空间上的可测函数，几乎处处等于一个原空间可测函数',
      regions: ['analysis'],
      tags: ['命题', '完备化', '可测函数'],
      statement: [
        '设 (X, ℳ, μ) 是测度空间，$$(X, ℳ̄, μ̄)$$ 是它的完备化（见「完备化定理」）。若 $$f$$ 是 $$ℳ̄$$-可测的函数，则存在 **ℳ-可测**的函数 $$g$$ 使',
        '',
        '$$f = g　μ̄-a.e.$$'
      ].join('\n'),
      notes: [
        '直观：完备化只多加了零集的子集，所以 ℳ̄-可测函数与 ℳ-可测函数只差在零集上的取值。',
        '证明思路（笔记里写的）：先看 $$f = χ_E$$ 的情形（此时 E = E′ ∪ F，E′ ∈ ℳ、F 含于零集，取 $$g = χ_{E′}$$）；对 ℳ-可测的简单函数显然；一般情形取简单函数列 $${φₙ} → f$$，每个 $$φₙ$$ 在某个 ℳ̄-零集 $$Eₙ$$ 外等于一个 ℳ-可测的 $$ψₙ$$。把零集并起来得 $$N ∈ ℳ$$，$$μ(N) = 0$$，$$N ⊇ ⋃Eₙ$$，令',
        '',
        '$$g = limₙ χ_{Nᶜ} · φₙ$$',
        '',
        '则 $$g = f$$ 在 $$Nᶜ$$ 上成立，且 $$g$$ 是 ℳ-可测的。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.12']
    }
  ],

  edges: [

    {
      id: 'imp.measurable-limit',
      kind: 'implication',
      sources: ['def.simple-function', 'thm.simple-approximation'],
      target: 'prop.measurable-closure',
      title: '简单函数逼近 ⟹ 可测函数在极限下封闭',
      proof: [
        '**① 上确界。** 设 $$fⱼ$$ 可测。要证 $$supⱼ fⱼ$$ 可测。由判定准则 (2)，只需对生成元 $$(a, +∞]$$（a ∈ ℝ）验证：',
        '',
        '$$(supⱼ fⱼ)⁻¹((a, +∞]) = ⋃ⱼ fⱼ⁻¹((a, +∞]) ∈ ℳ$$',
        '',
        '是可数并，故可测。',
        '',
        '**② 下确界。** $$infⱼ fⱼ = -supⱼ(-fⱼ)$$，而取负保持可测性，故 inf 也可测。',
        '',
        '**③ 极限。** $$lim infⱼ fⱼ = supₙ inf_{j ≥ n} fⱼ$$，由 ①② 可测；同理 $$lim sup$$ 可测。当极限存在时两者相等，故极限可测。',
        '',
        '**④ 和与积。** 先看 $$f + g$$：对任意 a ∈ ℝ，',
        '',
        '$${f + g > a} = ⋃_{q ∈ ℚ} ( {f > q} ∩ {g > a − q} )$$',
        '',
        '（左边 ⊆ 右边：取有理数 q 夹在 $$a − g$$ 与 f 之间；反向显然。）右边是可数并交，故可测。积 $$fg$$ 由 $$fg = ((f+g)² − f² − g²) / 2$$ 化归（对非负情形直接验证，一般情形先做正负部分分解）。',
        '',
        '**⑤ 与简单函数的关系。** 上面 ①~④ 已经把「可测」做成了一个对极限与代数运算封闭的类；而简单函数逼近定理保证**每个非负可测函数都是一列简单函数的逐点极限**，所以这个类是「刚好够用」的：从简单函数出发，取极限就得到全部可测函数。∎'
      ].join('\n'),
      note: '这条不是笔记里的原句，是把笔记里散落的几条（sup 可测、max 可测、极限可测、和积可测）合并成的总纲 —— 单独看每一条都很碎，合起来才是它的分量。'
    },

    {
      id: 'imp.continuous-borel',
      kind: 'implication',
      sources: ['prop.measurable-criterion'],
      target: 'cor.continuous-measurable',
      title: '连续 ⟹ Borel 可测',
      proof: [
        '设 $$f : X → Y$$ 连续，即每个开集的原像是开集。',
        '',
        '由定义 $$𝔅_Y = ℳ({ U ⊆ Y : U 开 })$$，用判定准则 (2)：只需对生成元（开集）验证原像可测。对开集 U，$$f⁻¹(U)$$ 是 X 中的开集，因而 $$∈ 𝔅_X$$。故 f 可测。∎',
        '',
        '> 复习一下笔记里点的那个坑：**这个论证对 (𝔅, 𝔅) 成立，但对 (ℒ, ℒ) 不成立** —— 因为 ℒ 并不由开集生成，它比 𝔅_ℝ 多了很多非 Borel 的零测集子集。'
      ].join('\n')
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.lplus-simple-approx',
      kind: 'definition',
      definition: 'def.simple-function',
      usedBy: 'thm.simple-approximation',
      note: '逼近定理的结论就是「可测函数是简单函数列的极限」。'
    },
    {
      id: 'def-link.measurable-simple',
      kind: 'definition',
      definition: 'def.measurable-function',
      usedBy: 'def.simple-function',
      note: '简单函数的定义里带着「可测」。'
    },
    {
      id: 'def-link.measurable-criterion',
      kind: 'definition',
      definition: 'def.measurable-function',
      usedBy: 'prop.measurable-criterion',
      note: '两条准则都是在可测定义上做的。'
    },
    {
      id: 'def-link.product-sigma-measurable',
      kind: 'definition',
      definition: 'def.product-sigma',
      usedBy: 'prop.measurable-product-and-realimag',
      note: '这条命题的舞台是积 σ-代数。'
    },
    {
      id: 'def-link.lebesgue-measurable-def',
      kind: 'definition',
      definition: 'def.measurable-function',
      usedBy: 'def.lebesgue-measurable',
      note: 'Lebesgue / Borel 可测只是把 (ℳ, 𝒩) 取成具体的两对。'
    },
    {
      id: 'def-link.borel-lebesgue-measurable',
      kind: 'definition',
      definition: 'def.borel',
      usedBy: 'def.lebesgue-measurable',
      note: 'Borel 可测用的是 𝔅_ℝ 与 𝔅_ℂ。'
    },
    {
      id: 'def-link.nullset-complete-measurable',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'prop.complete-measurable',
      note: '这条命题说的正是「完备性」这个概念在函数层面等价于什么。'
    },
    {
      id: 'def-link.completion-measurable-fn',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'prop.completion-measurable-function',
      note: '证明里全程在用零集。'
    },
    {
      id: 'def-link.measure-closure',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'prop.measurable-closure',
      note: '封闭性里的极限都是相对测度 μ 而言的。'
    }
  ]
});
