/* ==========================================================================
   内容包 · ℝⁿ 上的微分理论（极大函数与 Lebesgue 微分定理）
   --------------------------------------------------------------------------
   来自手写笔记「总结：符号测度」第 5 ~ 7 页。

   主线（每一步都靠上一步）：

     覆盖引理 ──▶ 极大定理（弱 (1,1) 不等式）
                     │
                     ▼
              Lebesgue 微分定理  Aᵣ f → f  a.e.
                     │
                     ▼
                 Lebesgue 集 L_f（几乎处处）
                     │
                     ▼
      可缩族的微分定理  ──▶  Radon–Nikodym 导数的点态公式

   用途：把 Radon–Nikodym 导数从「抽象的函数」变成「可以逐个点算出来的极限」。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'ℝⁿ 上的微分理论',
  nodes: [

    {
      id: 'prop.L1-signed',
      cluster: 'analysis.differentiation',
      type: 'proposition',
      label: 'L¹(ν) 与全变差',
      title: '命题：符号测度的 L¹(ν) = L¹(|ν|)，以及几条基本不等式',
      regions: ['analysis'],
      tags: ['命题', 'L¹', '全变差'],
      statement: [
        '设 ν 是符号测度或复测度。',
        '',
        '**(a)** $$ν ≪ |ν|$$，并且',
        '',
        '$$| dν / d|ν| | = 1　|ν|-a.e.$$',
        '',
        '**(b)** 定义 $$L¹(ν) := L¹(|ν|)$$。若 $$f ∈ L¹(ν)$$，则',
        '',
        '$$| ∫ f dν | ≤ ∫ |f| d|ν|$$',
        '',
        '**(c)** $$|ν₁ + ν₂| ≤ |ν₁| + |ν₂|$$（即全变差满足三角不等式）。'
      ].join('\n'),
      notes: [
        '(a) 的来源：$$dν = g·d|ν|$$ 对某个 g 成立（Radon–Nikodym），且 |g| = 1 a.e. —— 因为全变差本来就是「把质量取绝对值」得到的。',
        '(b) 说明**积分理论对符号测度不需要重写**：把 |ν| 当作底层的真测度，一切照旧。',
        '(c) 让「全变差」成为一个范数，这正是把测度空间看作 Banach 空间的起点。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.3']
    },

    {
      id: 'lem.covering',
      cluster: 'analysis.differentiation',
      type: 'lemma',
      label: '覆盖引理',
      title: '覆盖引理：开球族里能挑出不交子族，三倍膨胀仍覆盖',
      regions: ['analysis'],
      tags: ['引理', '覆盖', 'Vitali'],
      statement: [
        '设 ℰ 是一族 ℝⁿ 中的开球，$$U = ⋃ℰ$$。若 $$c < m(U)$$，则存在 ℰ 中**两两不交**的球 $$B₁, …, Bₖ$$ 使',
        '',
        '$$∑_{j=1}^{k} m(Bⱼ) > 3⁻ⁿ c$$'
      ].join('\n'),
      notes: [
        '这是 **Vitali 型覆盖引理**的核心估计，极大定理全靠它。',
        '证明的挑法（笔记里的原话）：先取**半径最大**的球 $$B₁$$；再取与 $$B₁$$ 不交的、半径最大的球 $$B₂$$；依此类推。',
        '为什么这样挑就够了：若某个 $$Aᵢ ∈ ℰ$$ 没被取到，则必有某个 $$Bⱼ$$ 与它相交 —— 取**下标最小**的那个 $$Bⱼ$$。由挑选规则，$$Aᵢ$$ 的半径不超过 $$Bⱼ$$ 的半径（否则取 $$Bⱼ$$ 时就会取到 $$Aᵢ$$ 了）。把 $$Bⱼ$$ 的半径放大 3 倍，就有 $$Aᵢ ⊆ 3Bⱼ$$，于是 $$K ⊆ ⋃ⱼ 3Bⱼ$$。',
        '剩下的就是计数：',
        '',
        '$$c < m(K) ≤ 3ⁿ ∑ⱼ m(Bⱼ)　⟹　∑ⱼ m(Bⱼ) > 3⁻ⁿ c$$',
        '',
        '⚠ 注意膨胀因子是 **3ⁿ**（而不是 2ⁿ）—— 这正是因为「半径不超过」是弱不等式，需要一点余量。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Lemma 3.15']
    },

    {
      id: 'def.locally-integrable',
      cluster: 'analysis.differentiation',
      type: 'definition',
      label: '局部可积',
      title: '局部可积函数 L¹ₗoc',
      regions: ['analysis'],
      tags: ['定义', '局部可积'],
      statement: [
        '可测函数 $$f : ℝⁿ → ℂ$$ 是**局部可积的**，当且仅当',
        '',
        '$$∫_K |f(x)| dx < ∞　对每个有界可测集 K ⊆ ℝⁿ$$',
        '',
        '局部可积函数全体记作 $$L¹_{loc}$$（或 $$L¹_{loc}(ℝⁿ)$$）。'
      ].join('\n'),
      notes: [
        '直觉：$$f$$ 可能「在无穷远处爆掉」，但在每个有限范围里都还好。',
        '例：常函数 1 属于 L¹ₗoc 但不属于 L¹(ℝⁿ)；$$1/|x|$$ 在 ℝⁿ 上属于 L¹ₗoc（n ≥ 2 时不属于 L¹）。',
        '⚠ 微分理论里必须是 L¹ₗoc 而不是 L¹：因为讨论的是**逐点**行为，而局部信息就够。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.4']
    },

    {
      id: 'def.average-operator',
      cluster: 'analysis.differentiation',
      type: 'definition',
      label: '平均算子 Aᵣ',
      title: '平均算子（Averaging Operator Aᵣ f）',
      regions: ['analysis'],
      tags: ['定义', '平均算子'],
      statement: [
        '设 $$f ∈ L¹_{loc}$$，$$x ∈ ℝⁿ$$，$$r > 0$$。定义',
        '',
        '$$Aᵣ f(x) := (1/m(B(r, x))) ∫_{B(r, x)} f(y) dy$$',
        '',
        '即 f 在以 x 为心、r 为半径的球上的**平均值**。'
      ].join('\n'),
      notes: [
        '这是「把函数抹平」的算子：$$Aᵣ f$$ 是 f 的连续化版本（见下一条），r → 0 时应当回到 f 本身 —— 而那正是 Lebesgue 微分定理要说的事。',
        '⚠ 注意积分是**对 Lebesgue 测度 m** 取的，跟这一段的符号测度 ν 无关。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.4']
    },

    {
      id: 'lem.average-continuous',
      cluster: 'analysis.differentiation',
      type: 'lemma',
      label: '平均算子联合连续',
      title: '引理：Aᵣ f(x) 关于 (r, x) 联合连续',
      regions: ['analysis'],
      tags: ['引理', '连续', 'DCT'],
      statement: [
        '设 $$f ∈ L¹_{loc}$$。则 $$Aᵣ f(x)$$ 作为 $$(r, x)$$ 的函数是**联合连续**的。'
      ].join('\n'),
      notes: [
        '证明的骨架（笔记里写得很细）：把积分写成',
        '',
        '$$∫_{B(r, x)} f(y) dy = ∫_{ℝⁿ} χ_{B(r, x)}(y) f(y) dy$$',
        '',
        '于是只需证 $$χ_{B(r,x)} → χ_{B(r₀,x₀)}$$（当 $$(r,x) → (r₀,x₀)$$）在足够好的意义上成立，再用 DCT。',
        '分两块看（取目标点 $$(r₀, x₀)$$）：',
        '',
        '· 若 $$y$$ 在球内：$$ε := r₀ − |y − x₀| > 0$$；当 $$|x − x₀| < ε/2$$ 且 $$|r − r₀| < ε/2$$ 时 $$|y − x| < r$$，故 $$χ = 1$$；',
        '· 若 $$y$$ 在球外：$$ε := |y − x₀| − r₀ > 0$$；同样的小扰动下 $$|y − x| > r$$，故 $$χ = 0$$。',
        '',
        '两边合起来说明：对**几乎处处的** y（只排除球面），特征函数最终稳定 —— 即逐点收敛 a.e.。',
        '控制函数取 $$χ_{B(r₀+1, x₀)}(y)·|f(y)| ∈ L¹$$，由 **DCT** 得连续性。∎'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Lemma 3.16']
    },

    {
      id: 'def.maximal-function',
      cluster: 'analysis.differentiation',
      type: 'definition',
      label: '极大函数',
      title: 'Hardy–Littlewood 极大函数 Hf',
      regions: ['analysis'],
      tags: ['定义', '极大函数', 'Hardy-Littlewood'],
      statement: [
        '设 $$f ∈ L¹_{loc}$$。定义',
        '',
        '$$Hf(x) := sup(r > 0) (1/m(B(r, x))) ∫_{B(r, x)} |f(y)| dy = sup(r > 0) Aᵣ |f|(x)$$',
        '',
        '称为 f 的 **Hardy–Littlewood 极大函数**。'
      ].join('\n'),
      notes: [
        '直觉：$$Hf(x)$$ 是「f 在 x 附近所有尺度上的平均值里最大的那个」。',
        '它当然比 f 大（$$Hf ≥ |f|$$ a.e.，因为可以取 r → 0），但好处是它**可测**：对每个固定的 r，$$x ↦ Aᵣ|f|(x)$$ 可测（由联合连续性更强），而可数个可测函数的上确界仍可测。',
        '⭐ 极大函数是微分理论里的「万能控制函数」：它把一个逐点问题化归成一个关于测度的估计问题，而那个估计就是下一条的极大不等式。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.4']
    },

    {
      id: 'thm.maximal-theorem',
      cluster: 'analysis.differentiation',
      type: 'theorem',
      label: '极大定理',
      title: '极大定理（弱 (1,1) 不等式）',
      regions: ['analysis'],
      tags: ['定理', '极大不等式', '弱型'],
      statement: [
        '存在常数 $$C > 0$$（只依赖维数 n），使对一切 $$f ∈ L¹$$ 与一切 $$α > 0$$：',
        '',
        '$$m({x : Hf(x) > α}) ≤ (C/α)·∫ |f(x)| dx$$'
      ].join('\n'),
      notes: [
        '这叫**弱 (1,1) 型**不等式：不能保证 $$Hf ∈ L¹$$（事实上一般不是），但能保证它的**分布函数**被 $$1/α$$ 控制。',
        '在 ℝⁿ 里 $$C = 3ⁿ$$（这正是覆盖引理里那个膨胀因子）。',
        '⭐ 它的角色：**「平均值的例外集是小的」** —— 于是一切逐点收敛问题都可以用「例外集测度 → 0」来解决。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.17']
    },

    {
      id: 'thm.lebesgue-differentiation',
      cluster: 'analysis.differentiation',
      type: 'theorem',
      label: 'Lebesgue 微分定理',
      title: 'Lebesgue 微分定理：Aᵣ f(x) → f(x) a.e.',
      regions: ['analysis'],
      tags: ['定理', 'Lebesgue 微分', 'a.e.'],
      statement: [
        '设 $$f ∈ L¹_{loc}$$。则',
        '',
        '$$lim(r→0) Aᵣ f(x) = f(x)　对 a.e. x ∈ ℝⁿ$$'
      ].join('\n'),
      notes: [
        '⭐ 一句话：**可积函数几乎处处等于自己局部平均值的极限**。',
        '这也是「Lebesgue 积分比 Riemann 积分好」最直观的一条：Riemann 可积函数的连续性几乎处处成立，而这里连「连续」都不需要。',
        '证明的三段（下一条箭头里展开）：先用连续函数逼近 → 再用极大定理把「坏集」压成零测。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.18']
    },

    {
      id: 'def.lebesgue-set',
      cluster: 'analysis.differentiation',
      type: 'definition',
      label: 'Lebesgue 集',
      title: 'Lebesgue 集 L_f',
      regions: ['analysis'],
      tags: ['定义', 'Lebesgue 集'],
      statement: [
        '设 $$f ∈ L¹_{loc}$$。定义',
        '',
        '$$L_f := { x : lim(r→0) (1/m(B(r, x))) ∫_{B(r, x)} |f(y) − f(x)| dy = 0 }$$',
        '',
        '称为 f 的 **Lebesgue 集**。'
      ].join('\n'),
      notes: [
        '⚠ 注意定义里积的是 $$|f(y) − f(x)|$$（与 f 在该点的值比较），不是 $$|f(y)|$$。',
        '这么定义是为了让「可缩族」版本（下一条定理）能直接用 —— 那里需要的是**局部一致逼近**，而不是简单的平均值收敛。',
        '$$x ∈ L_f$$ 常被说成「x 是 f 的 Lebesgue 点」。直觉：在这个点附近，f 的振荡在平均意义下趋于 0。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.4']
    },

    {
      id: 'thm.lebesgue-set-full',
      cluster: 'analysis.differentiation',
      type: 'theorem',
      label: 'Lebesgue 集几乎处处',
      title: '定理：f ∈ L¹ₗoc ⟹ m(L_fᶜ) = 0',
      regions: ['analysis'],
      tags: ['定理', 'Lebesgue 集'],
      statement: [
        '若 $$f ∈ L¹_{loc}$$，则',
        '',
        '$$m(L_fᶜ) = 0$$',
        '',
        '即：**几乎每个点都是 Lebesgue 点**。'
      ].join('\n'),
      notes: [
        '证明的思路很巧（笔记里的）：对每个复数 c，把微分定理用在函数 $$|f(x) − c|$$ 上，得到「除一个零集 $$E_c$$ 外，$$lim (1/m(B))∫|f(y) − c|dy = |f(x) − c|$$」。',
        '然后取 **ℂ 的一个可数稠密子集 D**，令 $$E = ⋃_{c ∈ D} E_c$$（可数并仍是零集）。对 $$x ∉ E$$ 与任意 ε > 0，取 $$c ∈ D$$ 使 $$|f(x) − c| < ε$$，于是',
        '',
        '$$lim(r→0) (1/m(B(r,x))) ∫_{B(r,x)} |f(y) − f(x)| dy ≤ |f(x) − c| + ε < 2ε$$',
        '',
        '令 ε → 0 即得。∎',
        '⭐ 「取一个可数稠密子集」这一步是可数性技巧的典型用法：把不可数多个条件化归成可数多个零集之并。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.20']
    },

    {
      id: 'def.shrinks-nicely',
      cluster: 'analysis.differentiation',
      type: 'definition',
      label: '可缩族',
      title: '可缩地趋于 x（Shrinks Nicely）',
      regions: ['analysis'],
      tags: ['定义', '可缩族'],
      statement: [
        '$$ℝⁿ$$ 的一族 Borel 子集 $${Eᵣ}_{r > 0}$$ 叫**可缩地趋于 $$x$$**，当且仅当',
        '',
        '· $$Eᵣ ⊆ B(r, x)$$ 对每个 r 成立；',
        '· 存在 $$α > 0$$，使 $$m(Eᵣ) > α·m(B(r, x))$$ 对一切 r 成立。'
      ].join('\n'),
      notes: [
        '两个条件的含义：**装得进去**（$$Eᵣ$$ 在球里）、**不能太瘪**（体积至少是球的 α 倍）。',
        '典型例子：取 $$Eᵣ = B(r, x)$$ 本身（α = 1）；或取 $$Eᵣ$$ 为球内某个固定形状（如立方体）按比例缩放。',
        '反例：$$Eᵣ$$ 取成球内一条细长的薄片 —— 体积比可以趋于 0，这样的族就不是「可缩地」趋于 x。',
        '⭐ 引入这个概念是为了让微分定理**不依赖球的形状**：只要不瘪，结论照旧。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.4']
    },

    {
      id: 'thm.differentiation-general',
      cluster: 'analysis.differentiation',
      type: 'theorem',
      label: '可缩族的微分定理',
      title: '定理：对可缩族，Lebesgue 微分定理仍然成立',
      regions: ['analysis'],
      tags: ['定理', '微分', '可缩族'],
      statement: [
        '设 $$f ∈ L¹_{loc}$$，$$x ∈ L_f$$。则对**每一个**可缩地趋于 x 的族 $${Eᵣ}_{r>0}$$：',
        '',
        '$$lim(r→0) (1/m(Eᵣ)) ∫_{Eᵣ} |f(y) − f(x)| dy = 0，$$',
        '$$lim(r→0) (1/m(Eᵣ)) ∫_{Eᵣ} f(y) dy = f(x)$$'
      ].join('\n'),
      notes: [
        '证明是一行估计：由 $$Eᵣ ⊆ B(r,x)$$ 与 $$m(Eᵣ) > α m(B(r,x))$$，',
        '',
        '$$(1/m(Eᵣ)) ∫_{Eᵣ} |f − f(x)| ≤ (1/m(Eᵣ)) ∫_{B(r,x)} |f − f(x)| ≤ (1/α)·m(B(r,x)) ∫_{B(r,x)} |f − f(x)|$$',
        '',
        '而最右边由「$$x ∈ L_f$$」趋于 0。∎',
        '⭐ 全部难度都在把 L_f 的定义选对（用 $$|f(y) − f(x)|$$ 而不是 $$|f(y)|$$）—— 选对之后这一步就是白送的。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.21']
    },

    {
      id: 'def.regular-measure',
      cluster: 'analysis.differentiation',
      type: 'definition',
      label: '正则 Borel 测度',
      title: '正则 Borel 测度（Regular Borel Measure）',
      regions: ['analysis'],
      tags: ['定义', '正则', 'Borel 测度'],
      statement: [
        'ℝⁿ 上的 Borel 测度 ν 是**正则的**，当且仅当',
        '',
        '· $$ν(K) < ∞$$ 对每个紧集 K 成立；',
        '· $$ν(E) = inf{ ν(U) : U 开，E ⊆ U }$$ 对每个 $$E ∈ 𝔅_{ℝⁿ}$$ 成立（**外正则**）。',
        '',
        '符号测度或复测度 ν 叫正则 ⟺ $$|ν|$$ 正则。'
      ].join('\n'),
      notes: [
        '第二条是「从外面用开集逼近」。在 ℝⁿ 上它其实由第一条推出（笔记里专门注了一句 "actually implied by above"）。',
        '**每个正则测度都是 σ-有限的**（用紧集的可数覆盖）。',
        '$$f ∈ L⁺(ℝⁿ)$$ 时，$$f·dm$$ 正则 ⟺ $$f ∈ L¹_{loc}$$ —— 这条把「正则」与「局部可积」接了起来。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §7.2']
    },

    {
      id: 'thm.rn-pointwise',
      cluster: 'analysis.differentiation',
      type: 'theorem',
      label: 'RN 导数的点态公式',
      title: '定理：ν(Eᵣ)/m(Eᵣ) → f(x) a.e.，其中 dν = dλ + f dm',
      regions: ['analysis'],
      tags: ['定理', 'RN 导数', '点态', '正则'],
      statement: [
        '设 ν 是 ℝⁿ 上的**正则**符号/复 Borel 测度，$$dν = dλ + f·dm$$ 是它关于 Lebesgue 测度 m 的 Lebesgue–Radon–Nikodym 表示。则对 **m-a.e.** 的 $$x ∈ ℝⁿ$$，',
        '',
        '$$lim(r→0) ν(Eᵣ) / m(Eᵣ) = f(x)$$',
        '',
        '对**每一个**可缩地趋于 x 的族 $${Eᵣ}_{r>0}$$ 成立。'
      ].join('\n'),
      notes: [
        '⭐ 这条定理把 Radon–Nikodym 导数从「抽象的存在物」变成了**可以逐点算出来的极限**：',
        '',
        '$$f(x) = lim(r→0) ν(B(r, x)) / m(B(r, x))$$',
        '',
        '这正是微积分里「密度 = 质量 / 体积」的严格版本，也是「RN 导数是导数的推广」这一说法的根据。',
        '证明的思路：先验证 $$d|ν| = d|λ| + |f| dm$$，于是 λ 与 f dm 都正则、特别地 $$f ∈ L¹_{loc}$$；把比值拆成',
        '',
        '$$ν(Eᵣ) / m(Eᵣ) = λ(Eᵣ) / m(Eᵣ) + (1/m(Eᵣ)) ∫_{Eᵣ} f·dm$$',
        '',
        '第二项由微分定理趋于 f(x)。第一项要证它是 0，用一个「分块 + 覆盖引理 + λ(A) = m(Aᶜ) = 0」的论证把坏集压成零测。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.22']
    }
  ],

  edges: [

    {
      id: 'imp.maximal-theorem',
      kind: 'implication',
      sources: ['lem.covering', 'def.maximal-function'],
      target: 'thm.maximal-theorem',
      title: '覆盖引理 ⟹ 极大定理',
      proof: [
        '**① 把坏集换成球族。** 令 $$E_α = {x : Hf(x) > α}$$。对每个 $$x ∈ E_α$$，由 Hf 的定义（上确界）存在 $$rₓ > 0$$ 使',
        '',
        '$$A_{rₓ}|f|(x) > α　⟺　∫_{B(rₓ, x)} |f(y)| dy > α·m(B(rₓ, x))$$',
        '',
        '于是 $${B(rₓ, x)}_{x ∈ E_α}$$ 是 $$E_α$$ 的一个开球覆盖，且每个球都满足上面那个「超额」不等式。',
        '',
        '**② 用覆盖引理挑不交子族。** 任取 $$c < m(E_α)$$（先设 m(E_α) < ∞）。由**覆盖引理**，存在 $$x₁, …, xₖ ∈ E_α$$ 使 $$Bⱼ = B(r_{xⱼ}, xⱼ)$$ 两两不交，且',
        '',
        '$$∑ⱼ m(Bⱼ) > 3⁻ⁿ c$$',
        '',
        '**③ 把测度换成积分。** 由 ① 里每个球的超额不等式，',
        '',
        '$$c < 3ⁿ ∑ⱼ m(Bⱼ) < (3ⁿ/α)·∑ⱼ ∫_{Bⱼ} |f| dy ≤ (3ⁿ/α)·∫_{ℝⁿ} |f| dy$$',
        '',
        '（最后一步用的是：$$Bⱼ$$ 两两不交，所以把积分加起来不超过整体积分。）',
        '',
        '**④ 令 c → m(E_α)。** 得到',
        '',
        '$$m(E_α) ≤ (3ⁿ/α)·∫ |f| dy$$',
        '',
        '即 $$C = 3ⁿ$$。∎'
      ].join('\n'),
      note: '⭐ 整段只有一个「魔法」：覆盖引理保证挑出来的不交球虽然装不满 $$E_α$$，但总测度至少是 $$3⁻ⁿ$$ 倍 —— 恰好够用。'
    },

    {
      id: 'imp.lebesgue-differentiation',
      kind: 'implication',
      sources: ['thm.maximal-theorem', 'thm.approximation-L1', 'lem.average-continuous'],
      target: 'thm.lebesgue-differentiation',
      title: '极大定理 + 连续函数逼近 ⟹ Lebesgue 微分定理',
      proof: [
        '**① 先局部化。** 由 L¹ₗoc 的定义与测度的可数可加性，只需对每个 $$N ∈ ℕ$$ 证明在球 $${|x| ≤ N}$$ 上几乎处处成立；把 f 换成 $$f·χ_{B(N+1, 0)}$$ 后即可**设 $$f ∈ L¹$$**。',
        '',
        '**② 用连续函数逼近。** 给定 $$ε > 0$$，由「L¹ 里的逼近」，取**连续函数** g 使',
        '',
        '$$∫ |g(y) − f(y)| dy < ε$$',
        '',
        '**③ 连续情形是白送的。** 若 g 连续，则对**每一个** x 都有 $$Aᵣ g(x) → g(x)$$（$$r → 0$$）—— 因为 g 在 x 附近近似为常数。',
        '',
        '**④ 把差值压住。** 对任意 x，',
        '',
        '$$sup(r>0) |Aᵣ f(x) − f(x)| = supᵣ |Aᵣ(f − g)(x) + (Aᵣ g − g)(x) + (g − f)(x)| ≤ H(f − g)(x) + |f − g|(x)$$',
        '',
        '（第一项用 $$|Aᵣ(f−g)| ≤ Aᵣ|f−g| ≤ H(f−g)$$，第二项由 ③ 取 r → 0）。',
        '',
        '**⑤ 估计坏集。** 令',
        '',
        '$$E_α = {x : sup(r>0) |Aᵣ f(x) − f(x)| > α}$$',
        '',
        '由 ④，$$E_α ⊆ F_{α/2} ∪ {x : H(f−g)(x) > α/2}$$，其中 $$F_{α/2} = {|f − g| > α/2}$$。于是',
        '',
        '$$m(E_α) ≤ 2ε / α + 2Cε / α$$',
        '',
        '（第一项用 Markov 不等式，第二项用**极大定理**。）',
        '',
        '**⑥ 令 ε → 0。** 右边对**任意** ε > 0 成立，故 $$m(E_α) = 0$$ 对一切 $$α > 0$$ 成立。于是',
        '',
        '$$lim(r→0) Aᵣ f(x) = f(x)　对一切 x ∉ ⋃_{m∈ℕ} E_{1/m}$$',
        '',
        '而右边是可数个零集之并，仍是零集。∎'
      ].join('\n'),
      note: '⭐ 这是分析里最漂亮的标准套路之一：**用「连续函数是稠密的」把问题搬到好情形，再用极大不等式把误差控制住**。两边一夹，坏集测度为零。'
    },

    {
      id: 'imp.lebesgue-set',
      kind: 'implication',
      sources: ['thm.lebesgue-differentiation'],
      target: 'thm.lebesgue-set-full',
      title: '微分定理 + 可数稠密子集 ⟹ Lebesgue 集几乎处处',
      proof: [
        '**① 对每个复数 c 用一次微分定理。** 固定 $$c ∈ ℂ$$，把微分定理用在函数 $$h(x) = |f(x) − c|$$ 上（它是 L¹ₗoc 的）：存在零集 $$E_c$$，使对 $$x ∉ E_c$$，',
        '',
        '$$lim(r→0) (1/m(B(r,x))) ∫_{B(r,x)} |f(y) − c| dy = |f(x) − c|$$',
        '',
        '**② 只取可数多个 c。** 取 ℂ 的一个**可数稠密子集** D（比如 $$ℚ + iℚ$$），令',
        '',
        '$$E = ⋃_{c ∈ D} E_c$$',
        '',
        '可数多个零集之并仍是零集，故 $$m(E) = 0$$。',
        '',
        '**③ 在 E 外验证**。设 $$x ∉ E$$，任给 ε > 0，取 $$c ∈ D$$ 使 $$|f(x) − c| < ε$$。则',
        '',
        '$$(1/m(B(r,x))) ∫_{B(r,x)} |f(y) − f(x)| dy ≤ (1/m(B(r,x))) ∫_{B(r,x)} |f(y) − c| dy + |f(x) − c|$$',
        '',
        '右边第一项由 ①（$$x ∉ E_c$$）在 $$r → 0$$ 时趋于 $$|f(x) − c|$$，于是整个右端的极限 ≤ $$|f(x) − c| + ε < 2ε$$。令 ε → 0 得极限为 0，即 $$x ∈ L_f$$。',
        '',
        '故 $$L_fᶜ ⊆ E$$，从而 $$m(L_fᶜ) = 0$$。∎'
      ].join('\n'),
      note: '⭐ 「把不可数条件化归成可数」这一步是可数性论证的典型手笔，和 Borel–Cantelli 是同一种精神。'
    },

    {
      id: 'imp.differentiation-general',
      kind: 'implication',
      sources: ['thm.lebesgue-set-full', 'def.shrinks-nicely'],
      target: 'thm.differentiation-general',
      title: 'Lebesgue 集 + 可缩条件 ⟹ 一般族的微分定理',
      proof: [
        '设 $$x ∈ L_f$$，$${Eᵣ}$$ 可缩地趋于 x，即 $$Eᵣ ⊆ B(r,x)$$ 且 $$m(Eᵣ) > α·m(B(r,x))$$。',
        '',
        '**① 关键估计（一行）。** 因为 $$Eᵣ ⊆ B(r,x)$$，把积分域放大到球上只会变大；再用 $$m(Eᵣ) > α m(B(r,x))$$ 把分母换小：',
        '',
        '$$(1/m(Eᵣ)) ∫_{Eᵣ} |f(y) − f(x)| dy ≤ (1/m(Eᵣ)) ∫_{B(r,x)} |f(y) − f(x)| dy ≤ (1/α)·m(B(r,x)) ∫_{B(r,x)} |f(y) − f(x)| dy$$',
        '',
        '**② 收尾。** 由 $$x ∈ L_f$$ 的定义，最右边当 $$r → 0$$ 时趋于 0。故第一个极限为 0。',
        '',
        '**③ 第二个极限。** 由',
        '',
        '$$| (1/m(Eᵣ)) ∫_{Eᵣ} f − f(x) | ≤ (1/m(Eᵣ)) ∫_{Eᵣ} |f(y) − f(x)| dy → 0$$',
        '',
        '即得 $$(1/m(Eᵣ)) ∫_{Eᵣ} f dy → f(x)$$。∎'
      ].join('\n'),
      note: '全部难度都被「把 L_f 的定义写成 $$∫|f(y) − f(x)|$$」吸收掉了 —— 这也解释了为什么定义要那么写。'
    },

    {
      id: 'imp.rn-pointwise',
      kind: 'implication',
      sources: ['thm.differentiation-general', 'def.regular-measure', 'lem.covering'],
      target: 'thm.rn-pointwise',
      title: '微分定理 + 正则性 ⟹ RN 导数的点态公式',
      proof: [
        '设 $$dν = dλ + f·dm$$（$$λ ⊥ m$$），ν 正则。',
        '',
        '**① 先算全变差。** 由全变差的性质，$$d|ν| = d|λ| + |f|·dm$$。既然 ν 正则，|ν| 正则，于是 λ 与 $$f·dm$$ 都正则；由「$$g·dm$$ 正则 ⟺ $$g ∈ L¹_{loc}$$」得 $$f ∈ L¹_{loc}$$。',
        '',
        '**② 拆比值。**',
        '',
        '$$ν(Eᵣ) / m(Eᵣ) = λ(Eᵣ) / m(Eᵣ) + (1/m(Eᵣ)) ∫_{Eᵣ} f·dm$$',
        '',
        '第二项由**可缩族的微分定理**趋于 $$f(x)$$（对 m-a.e. x）。所以只需证第一项趋于 0。',
        '',
        '**③ 把 λ 的坏点收集起来。** 不妨设 $$λ ≥ 0$$，并取 $$A$$ 使 $$λ(A) = m(Aᶜ) = 0$$（λ ⊥ m 的见证）。令',
        '',
        '$$Fₖ = { x ∈ A : lim sup(r→0) λ(B(r, x)) / m(B(r, x)) > 1 / k }$$',
        '',
        '**④ 用正则性把 λ 压小。** 给定 ε > 0，由 λ 的正则性（从外面用开集逼近）取开集 $$U ⊇ A$$ 使 $$λ(U) < ε$$（注意 $$λ(A) = 0$$，但 U 比 A 大，多出来的部分也可以做得任意小）。',
        '',
        '**⑤ 每个坏点配一个小球。** 对 $$x ∈ Fₖ$$，由 $$Fₖ$$ 的定义与 $$Bₓ ⊆ U$$（在 A 附近取足够小的球即可），存在球 $$Bₓ$$ 使',
        '',
        '$$λ(Bₓ) > (1/k)·m(Bₓ)$$',
        '',
        '**⑥ 覆盖引理再来一次。** 令 $$V_ε = ⋃_{x ∈ Fₖ} Bₓ$$（它是 U 中的开集，故 $$λ(V_ε) ≤ λ(U) < ε$$）。取 $$c < m(V_ε)$$，由**覆盖引理**挑出不交的 $$B_{x₁}, …, B_{xⱼ}$$ 使 $$∑ m(B_{xᵢ}) > 3⁻ⁿ c$$。于是',
        '',
        '$$c < 3ⁿ ∑ᵢ m(B_{xᵢ}) ≤ 3ⁿ k ∑ᵢ λ(B_{xᵢ}) ≤ 3ⁿ k·λ(V_ε) ≤ 3ⁿ k ε$$',
        '',
        '**⑦ 令 ε → 0。** 得 $$m(V_ε) = 0$$，故某个零集包含了一切 $$Fₖ$$，即 $$Fₖ$$ 全是零集，从而 $$lim(r→0) λ(B(r,x))/m(B(r,x)) = 0$$ 对 m-a.e. x 成立。',
        '',
        '**⑧ 从球换到可缩族。** 上面用的是球；要换成一般的可缩族 $$Eᵣ$$，用',
        '',
        '$$λ(Eᵣ) / m(Eᵣ) ≤ λ(B(r,x)) / m(Eᵣ) ≤ (1/α)·λ(B(r,x)) / m(B(r,x)) → 0$$',
        '',
        '（第二个不等号用了 $$m(Eᵣ) > α m(B(r,x))$$，并且 $$Eᵣ ⊆ B(r,x)$$ 使分子变大。）把 ⑦ 的结果搬过来即可。∎'
      ].join('\n'),
      note: '⭐ 这条把 Radon–Nikodym 导数彻底「算得出来」了：它就是在小球上质量比的极限 —— 正是「密度 = 质量/体积」的严格版本。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.totalvariation-l1',
      kind: 'definition',
      definition: 'def.rn-derivative',
      usedBy: 'prop.L1-signed',
      note: 'dν/d|ν| 就是一个 RN 导数。'
    },
    {
      id: 'def-link.integrable-l1signed',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.L1-signed',
      note: 'L¹(ν) 的定义直接搬用 L¹(|ν|)。'
    },
    {
      id: 'def-link.locally-integrable-average',
      kind: 'definition',
      definition: 'def.locally-integrable',
      usedBy: 'def.average-operator',
      note: '平均算子只在 L¹ₗoc 上定义。'
    },
    {
      id: 'def-link.average-maximal',
      kind: 'definition',
      definition: 'def.average-operator',
      usedBy: 'def.maximal-function',
      note: '极大函数就是对 Aᵣ|f| 取上确界。'
    },
    {
      id: 'def-link.locally-maximal',
      kind: 'definition',
      definition: 'def.locally-integrable',
      usedBy: 'def.maximal-function',
      note: '极大函数的定义域是 L¹ₗoc。'
    },
    {
      id: 'def-link.maximal-theorem-lm',
      kind: 'definition',
      definition: 'def.maximal-function',
      usedBy: 'thm.maximal-theorem',
      note: '极大定理估的就是 Hf 的分布函数。'
    },
    {
      id: 'def-link.lebesgue-set-thm',
      kind: 'definition',
      definition: 'def.lebesgue-set',
      usedBy: 'thm.lebesgue-set-full',
      note: '定理说这个集合的补是零集。'
    },
    {
      id: 'def-link.shrinks-general',
      kind: 'definition',
      definition: 'def.shrinks-nicely',
      usedBy: 'thm.differentiation-general',
      note: '定理对一切可缩族成立。'
    },
    {
      id: 'def-link.lebesgue-set-general',
      kind: 'definition',
      definition: 'def.lebesgue-set',
      usedBy: 'thm.differentiation-general',
      note: '结论只在 Lebesgue 点上成立。'
    },
    {
      id: 'def-link.regular-pointwise',
      kind: 'definition',
      definition: 'def.regular-measure',
      usedBy: 'thm.rn-pointwise',
      note: '定理的第一个前提就是 ν 正则。'
    },
    {
      id: 'def-link.rn-pointwise',
      kind: 'definition',
      definition: 'def.rn-derivative',
      usedBy: 'thm.rn-pointwise',
      note: '结论就是：RN 导数等于比值极限。'
    },
    {
      id: 'def-link.locally-pointwise',
      kind: 'definition',
      definition: 'def.locally-integrable',
      usedBy: 'thm.rn-pointwise',
      note: '证明中间要推出 f ∈ L¹ₗoc。'
    }
  ]
});
