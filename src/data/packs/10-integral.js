/* ==========================================================================
   内容包 · Lebesgue 积分与收敛定理
   --------------------------------------------------------------------------
   来自手写笔记「总结：积分」第 2 ~ 4 页。

   积分的两步走：
     ① 简单函数 φ = ∑aⱼχ_{Eⱼ} —— 直接定义成加权和
     ② 非负可测 f        —— 用下面的简单函数取 sup
   然后一切收敛定理都是在处理「取极限能不能穿进积分号」。

   这一包的主线：
     MCT ──▶ 逐项积分 ──▶ Fatou ──▶ DCT ──▶ 交换极限/导数与积分
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'Lebesgue 积分与收敛定理',
  nodes: [

    {
      id: 'def.lplus',
      cluster: 'analysis.integral',
      type: 'definition',
      label: 'L⁺',
      title: 'L⁺：非负可测函数全体',
      regions: ['analysis'],
      tags: ['定义', 'L⁺'],
      statement: [
        '固定测度空间 (X, ℳ, μ)。记',
        '',
        '$$L⁺ := { f : X → [0, +∞] : f 可测 }$$',
        '',
        '即取值在**扩充**非负实数里的可测函数全体。'
      ].join('\n'),
      notes: [
        '⚠ 取值允许是 +∞，这是刻意的：先把积分对 [0, +∞] 值的函数定义好，收敛定理（sup / 极限）在整个 L⁺ 里封闭，不必反复讨论「积分是不是有限」。',
        '「可积」（积分有限）是之后单独加的条件，见 L¹ 的定义。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.2']
    },

    {
      id: 'def.integral-simple',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '简单函数的积分',
      title: '简单函数的积分：加权和',
      regions: ['analysis'],
      tags: ['定义', '积分', '简单函数'],
      statement: [
        '设 $$φ ∈ L⁺$$ 是简单函数，写成标准形式',
        '',
        '$$φ = ∑_{j=1}^{n} a_j χ_{E_j}，　a_j ≥ 0，E_j ∈ ℳ 两两不交$$',
        '',
        '则定义',
        '',
        '$$∫ φ dμ := ∑_{j=1}^{n} a_j μ(E_j)$$'
      ].join('\n'),
      notes: [
        '这就是「面积 = 各层高度 × 各层测度」—— 完全照着 Riemann 和的样子写，只是把区间换成了可测集。',
        '要检查**良定义**：同一个 φ 可以写成不同的标准形式（比如把某个 Eⱼ 再拆开），但由 μ 的有限可加性，结果一样。',
        '约定 $$0 · ∞ = 0$$：这一步很关键 —— 它让「在无穷测度集上取 0 的函数」积分为 0，符合直觉。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.2']
    },

    {
      id: 'prop.simple-integral-props',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '简单函数积分的性质',
      title: '命题：简单函数积分的四条基本性质',
      regions: ['analysis'],
      tags: ['命题', '积分', '线性', '单调'],
      statement: [
        '设 $$φ, ψ$$ 是简单函数。',
        '',
        '- **(a)** $$c > 0 ⟹ ∫ cφ = c∫ φ$$',
        '- **(b)** $$∫ (φ + ψ) = ∫ φ + ∫ ψ$$',
        '- **(c)** $$φ ≤ ψ ⟹ ∫ φ ≤ ∫ ψ$$',
        '- **(d)** $$A ↦ ∫_A φ dμ$$ 是 ℳ 上的**测度**。'
      ].join('\n'),
      notes: [
        '(d) 是这一组里最有用的：它把「对简单函数积分」变成了「一个测度」，于是可数可加性、单调连续性（关于 A）全部免费。',
        '',
        '⚠ 后面 MCT 的证明正是**靠 (d)**：证明里要断言 $$lim_n ∫_{E_n} φ = ∫ φ$$，用的就是「A ↦ ∫_A φ 是测度」加上测度的下连续性（$$E_n ↑ X$$）。',
        '(a) 里 c > 0 而不是 c ≥ 0：因为约定 0·∞ = 0，c = 0 时左边也自动成立，写成 c > 0 只是为了不啰嗦。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.13']
    },

    {
      id: 'def.integral-nonneg',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '非负函数的积分',
      title: '非负可测函数的积分：从下面取上确界',
      regions: ['analysis'],
      tags: ['定义', '积分', 'sup'],
      statement: [
        '设 $$f ∈ L⁺$$。定义',
        '',
        '$$∫ f dμ := sup { ∫ φ dμ : 0 ≤ φ ≤ f，φ 是简单函数 }$$'
      ].join('\n'),
      notes: [
        '直观：用简单函数从**下面**去顶 f，取这些面积的**上确界**。这与 Jordan 测度「从外面盖、从里面填」的做法不同 —— 这里只从里面填。',
        '为什么不再要求「外面的盖」：因为测度已经在对偶的那一侧（μ 本身是从外面用外测度定义的），简单函数的下确界只会把积分定义偏小。',
        '⚠ 这个定义只对非负函数管用。对一般实值函数，先拆成正负部再相减（见「复函数的积分」）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.2']
    },

    {
      id: 'thm.mct',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '单调收敛定理',
      title: '单调收敛定理（MCT, Monotone Convergence Theorem）',
      regions: ['analysis'],
      tags: ['定理', 'MCT', '收敛'],
      statement: [
        '设 $${f_n} ⊆ L⁺$$ 满足',
        '',
        '$$f_1 ≤ f_2 ≤ ⋯，　f_n ↑ f 逐点，$$',
        '',
        '则',
        '',
        '$$∫ f = lim_{n→∞} ∫ f_n$$'
      ].join('\n'),
      notes: [
        '⭐ 这是整个 Lebesgue 积分理论的**发动机**：后面的逐项积分、Fatou、DCT 全都是它的推论。',
        '对比 Riemann 积分：那里「积分与极限交换」需要一致收敛这样强的条件；这里只要**单调**就够了 —— 这就是 Lebesgue 积分的全部好处。',
        '⚠ 两者都可能是 +∞，等式在扩充意义下理解。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.14']
    },

    {
      id: 'thm.termwise-integration',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '逐项积分',
      title: '定理：非负函数级数可以逐项积分',
      regions: ['analysis'],
      tags: ['定理', '逐项积分', '级数'],
      statement: [
        '设 $${f_n} ⊆ L⁺$$，则',
        '',
        '$$∫ ∑_{n=1}^{∞} f_n = ∑_{n=1}^{∞} ∫ f_n$$'
      ].join('\n'),
      notes: [
        '（现在 $f_n ≥ 0$，所以两边都可能是 +∞；结论等价于：不可能出现「逐项积分发散而整体积分有限」的怪事。）',
        '用法上这就是**无条件地交换 ∫ 和 ∑**，不需要控制函数 —— 代价是要求非负。有正有负时必须换 DCT。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.15']
    },

    {
      id: 'prop.integral-zero-iff',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '积分为零 ⟺ 几乎处处为零',
      title: '命题：∫ f = 0 ⟺ f = 0 a.e.',
      regions: ['analysis'],
      tags: ['命题', '零集', '几乎处处'],
      statement: [
        '设 $$f ∈ L⁺$$。则',
        '',
        '$$∫ f dμ = 0 ⟺ f = 0 μ-a.e.$$'
      ].join('\n'),
      notes: [
        '(⟸) 只要 f 在零集外为零，下确界里的每个简单函数 φ ≤ f 也几乎处处为零，从而 ∫φ = 0。',
        '(⟹) 记 $$A_n = {f > 1/n}$$，则 $$(1/n)·μ(Aₙ) ≤ ∫ f = 0$$，故 μ(Aₙ) = 0；而 $${f > 0} = ⋃_n A_n$$ 是零测的。',
        '⭐ 这条把「积分」与「几乎处处」这两个概念绑在一起了 —— 它是 L¹ 里「f = g」按 a.e. 理解的原因。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.16']
    },

    {
      id: 'cor.mct-ae',
      cluster: 'analysis.integral',
      type: 'corollary',
      label: 'MCT（a.e. 版本）',
      title: '推论：单调收敛定理的几乎处处版本',
      regions: ['analysis'],
      tags: ['推论', 'MCT', '几乎处处'],
      statement: [
        '设 $${f_n} ⊆ L⁺$$，$$f ∈ L⁺$$。若对**几乎处处的** x 有',
        '',
        '$$f_n(x) ↑ f(x)，$$',
        '',
        '则',
        '',
        '$$∫ f = lim_{n→∞} ∫ f_n$$'
      ].join('\n'),
      notes: '把例外集 N（μ(N) = 0）上的值全部改掉不影响任何一边的积分：左边用「积分为零 ⟺ 几乎处处为零」，右边用「零集不改变简单函数的积分」。所以收敛只在 a.e. 上成立就够。'
    },

    {
      id: 'lem.fatou',
      cluster: 'analysis.integral',
      type: 'lemma',
      label: 'Fatou 引理',
      title: 'Fatou 引理（Fatou\'s Lemma）',
      regions: ['analysis'],
      tags: ['引理', 'Fatou', 'liminf'],
      statement: [
        '设 $${f_n} ⊆ L⁺$$，则',
        '',
        '$$∫ lim inf_{n→∞} f_n ≤ lim inf_{n→∞} ∫ f_n$$'
      ].join('\n'),
      notes: [
        '⚠ 注意不等号方向：**下面的**极限在积分外面，得到的**不大于**积分的下极限。也就是说「取极限」会让积分**变小**，不会变大。',
        '这是 MCT 去掉单调性后剩下的东西 —— 单调性一旦丢掉，等号就退化成不等式。',
        '反向的例子：$$f_n = χ_{[n, n+1]}$$（在 ℝ 上），则每个 ∫fₙ = 1 但 ∫liminf fₙ = 0。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.18']
    },

    {
      id: 'cor.fatou',
      cluster: 'analysis.integral',
      type: 'corollary',
      label: 'Fatou 的推论',
      title: '推论：fₙ → f a.e. ⟹ ∫ f ≤ lim ∫ fₙ',
      regions: ['analysis'],
      tags: ['推论', 'Fatou', '几乎处处'],
      statement: [
        '设 $${f_n} ⊆ L⁺$$，$$f ∈ L⁺$$，且 $$f_n → f$$ a.e.。则',
        '',
        '$$∫ f ≤ lim inf_{n→∞} ∫ f_n$$'
      ].join('\n'),
      notes: 'a.e. 收敛时 $$lim inf f_n = f$$，直接套 Fatou 引理即可。'
    },

    {
      id: 'prop.finite-integral-consequences',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '积分有限的后果',
      title: '命题：∫ f < ∞ 时，f 几乎处处有限、支撑 σ-有限',
      regions: ['analysis'],
      tags: ['命题', 'σ-有限', '零集'],
      statement: [
        '设 $$f ∈ L⁺$$ 且 $$∫ f < ∞$$。则',
        '',
        '- $${x : f(x) = ∞}$$ 是零集；',
        '- $${x : f(x) > 0}$$ 是 **σ-有限**的（即它是可数个有限测度集之并）。'
      ].join('\n'),
      notes: [
        '第一条：若 $$μ({f = ∞}) > 0$$，则对每个 n 有 $$∫f ≥ n·μ({f=∞})$$，让 n → ∞ 得 ∫f = ∞。',
        '第二条：$${f > 0} = ⋃_n {f > 1/n}$$，而 $$μ({f > 1/n}) ≤ n∫f < ∞$$ —— 所以是**可数**个有限测度集之并。',
        '⭐ 这条解释了为什么「L¹ 里的函数几乎处处有限」是免费的，也预告了 Lp 空间里的 σ-有限假设。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.20']
    },

    {
      id: 'def.integral-complex',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '复函数的积分',
      title: '复值函数的积分：正负部相减',
      regions: ['analysis'],
      tags: ['定义', '积分', '复值'],
      statement: [
        '设 $$f : X → ℝ̄$$ 可测，记正部与负部',
        '',
        '$$f^+ = max(f, 0)，　f^- = max(-f, 0)$$',
        '',
        '（两者都属于 L⁺，且 $$f = f^+ − f^-$$、$$|f| = f^+ + f^-$$。）若 $$∫f^+$$ 与 $$∫f^-$$ 中**至少一个有限**，定义',
        '',
        '$$∫ f := ∫ f^+ − ∫ f^-$$',
        '',
        '对复值函数，拆实部虚部：$$∫ f := ∫ Re f + i ∫ Im f$$（要求两个积分都有意义）。'
      ].join('\n'),
      notes: [
        '⚠ 「至少一个有限」是为了避免 ∞ − ∞：那是不定式，必须排除。',
        '若两个都有限，就说 f **可积**（见下一条）。',
        '对复值函数，$$Re f$$ 与 $$Im f$$ 可积 ⟺ f 可积，因为 $$|Re f|, |Im f| ≤ |f| ≤ |Re f| + |Im f|$$。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.3']
    },

    {
      id: 'def.integrable',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '可积 / L¹',
      title: '可积函数与 L¹ 空间',
      regions: ['analysis'],
      tags: ['定义', 'L¹', '可积'],
      statement: [
        '实值可测 $$f$$ **可积**，当且仅当 $$∫f^+ < ∞$$ 且 $$∫f^- < ∞$$。等价地：',
        '',
        '$$f 可积 ⟺ ∫ |f| dμ < ∞$$',
        '',
        '复值可测 $$f$$ 可积，当且仅当 $$∫ |f| dμ < ∞$$。可积函数全体记作',
        '',
        '$$L¹(μ) = L¹(X, ℳ, μ) = L¹(X, μ)$$'
      ].join('\n'),
      notes: [
        '⭐ **可积 ⟺ 绝对值可积**：这是 Lebesgue 积分（终于）真正好用的地方 —— 因为 |f| ∈ L⁺，一切非负情形的定理都能直接套用。',
        '（对比 Riemann 反常积分：那里 $$∫f$$ 收敛而 $$∫|f|$$ 发散是可能的，叫条件收敛。）',
        '⚠ 严格说 L¹ 的元素是**函数的等价类**（a.e. 相等视为同一个），所以「∫|f| = 0 ⟹ f = 0」要在 a.e. 意义下读。这是后面 Lp 空间成为赋范空间的关键一步。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.3']
    },

    {
      id: 'prop.L1-vector-space',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: 'L¹ 是向量空间',
      title: '命题：可积函数全体是向量空间，∫ 线性',
      regions: ['analysis'],
      tags: ['命题', 'L¹', '线性'],
      statement: [
        '$$X$$ 上可积的（实值）函数全体构成一个**实向量空间**，并且',
        '',
        '$$∫ (af + bg) = a∫ f + b∫ g　∀a, b ∈ ℝ$$',
        '',
        '即 $$f ↦ ∫ f$$ 是线性的。'
      ].join('\n'),
      notes: [
        '「是向量空间」要在 a.e. 意义下理解（两个 a.e. 相等的可积函数看作同一个元素）。',
        '线性来自正负部分解后对简单函数的 (a)(b) 逐条验证 —— 这条本身不深，但它是 L¹ 成为**赋范空间**的第一步，后面 Lp 空间整套理论都从这儿开始。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.21']
    },

    {
      id: 'prop.integral-abs-ineq',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '积分绝对值不等式',
      title: '命题：|∫ f| ≤ ∫ |f|',
      regions: ['analysis'],
      tags: ['命题', '三角不等式'],
      statement: [
        '设 $$f ∈ L¹(μ)$$，则',
        '',
        '$$| ∫ f dμ | ≤ ∫ |f| dμ$$'
      ].join('\n'),
      notes: '复情形：取 $$α = e^{-iθ}$$ 使 $$α∫f$$ 是实数且等于 $$|∫f|$$，则 $$|∫f| = ∫ αf = ∫ Re(αf) ≤ ∫|αf| = ∫|f|$$。',
      refs: ['Folland, Real Analysis, Prop. 2.22']
    },

    {
      id: 'prop.L1-support-sigma-finite',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: 'L¹ 函数的支撑 σ-有限',
      title: '命题：f ∈ L¹ ⟹ {f ≠ 0} 是 σ-有限的',
      regions: ['analysis'],
      tags: ['命题', 'σ-有限', '支撑'],
      statement: [
        '若 $$f ∈ L¹(μ)$$，则',
        '',
        '$${x : f(x) ≠ 0}$$',
        '',
        '是 σ-有限的。'
      ].join('\n'),
      notes: '把「积分有限的后果」分别用到 |f| 上即可：{f ≠ 0} = {|f| > 0}。'
    },

    {
      id: 'prop.integrals-equal-iff',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '何时两个函数积分处处相同',
      title: '命题：∫_E f = ∫_E g 对一切 E ⟺ f = g a.e.',
      regions: ['analysis'],
      tags: ['命题', '几乎处处', '可测集'],
      statement: [
        '设 $$f, g ∈ L¹(μ)$$。则下列三条等价：',
        '',
        '$$∫_E f dμ = ∫_E g dμ　∀E ∈ ℳ；$$',
        '$$∫ |f − g| dμ = 0；$$',
        '$$f = g　μ-a.e.$$'
      ].join('\n'),
      notes: [
        '作用：这类命题就是「用对一切可测集的积分来**识别**函数」。',
        '后面 Radon–Nikodym 定理的**唯一性**部分正是用的这一条 —— 两个密度给出同一个测度，就必须 a.e. 相等。',
        '（$E$ 取遍 ℳ 而不是只取 X，是关键：只对 X 相等是不够的。）'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Cor. 2.23']
    },

    {
      id: 'thm.dct',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '控制收敛定理',
      title: '控制收敛定理（DCT, Dominated Convergence Theorem）',
      regions: ['analysis'],
      tags: ['定理', 'DCT', '控制函数'],
      statement: [
        '设 $${f_n} ⊆ L¹$$，$$f_n → f$$ a.e.，且存在**控制函数** $$g ∈ L¹$$ 使',
        '',
        '$$|f_n| ≤ g　a.e.　∀n$$',
        '',
        '则 $$f ∈ L¹$$ 且',
        '',
        '$$∫ f = lim_{n→∞} ∫ f_n$$'
      ].join('\n'),
      notes: [
        '⭐ 这是实际计算里**用得最多**的收敛定理。三个条件缺一不可：',
        '',
        '· a.e. 收敛 —— 不能去掉（$$χ_{[n,n+1]}$$ 反例）；',
        '· 控制函数 g ∈ L¹ —— 不能去掉（$$nχ_{[0,1/n]}$$ 在 [0,1] 上每点趋于 0，但积分为 1）；',
        '· 必须是**可积**的 g，光是「有界」不够（在无穷测度空间上）。',
        '',
        '为什么叫「控制」：g 把所有 fₙ 关在一间可积的笼子里，所以质量无处可逃，极限过程不会漏掉面积。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.24']
    },

    {
      id: 'thm.termwise-L1',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: 'L¹ 的逐项积分',
      title: '定理：Σ∫|fⱼ| < ∞ ⟹ Σfⱼ 几乎处处收敛且可逐项积分',
      regions: ['analysis'],
      tags: ['定理', '逐项积分', 'L¹'],
      statement: [
        '设 $${f_j} ⊆ L¹$$ 满足',
        '',
        '$$∑_{j=1}^{∞} ∫ |f_j| dμ < ∞$$',
        '',
        '则 $$∑_j f_j$$ 几乎处处收敛到一个 $$L¹$$ 中的函数，并且可以逐项积分：',
        '',
        '$$∫ ∑_{j=1}^{∞} f_j = ∑_{j=1}^{∞} ∫ f_j$$'
      ].join('\n'),
      notes: [
        '与「非负函数逐项积分」的区别：那里不需要任何收敛性假设（非负性保证了没有抵消），这里**需要** Σ∫|fⱼ| < ∞ —— 用可积性换来「允许有正有负」。',
        '这是 Fubini–Tonelli 定理证明里的关键工具。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.25']
    },

    {
      id: 'thm.approximation-L1',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: 'L¹ 里的逼近',
      title: '定理：L¹ 中可用简单函数 / 连续函数逼近',
      regions: ['analysis'],
      tags: ['定理', '逼近', '简单函数', '连续函数'],
      statement: [
        '设 $$f ∈ L¹(μ)$$。则对任意 ε > 0，存在简单函数 $$φ = ∑_j a_j χ_{E_j}$$ 使',
        '',
        '$$∫ |f − φ| dμ < ε$$',
        '',
        '进一步，若 μ 是 **ℝ 上的 Lebesgue–Stieltjes 测度**，还可以要求 Eⱼ 是开区间的有限并；甚至可以取一个**连续函数** g（在某个有界区间外恒为 0）使',
        '',
        '$$∫ |f − g| dμ < ε$$'
      ].join('\n'),
      notes: [
        '意义：**简单函数与连续函数在 L¹ 里是稠密的**。所以很多命题只要对这两类函数验证就够了，再取极限。',
        '证明思路（笔记里的）：先把 f 拆成 Re f⁺、Re f⁻、Im f⁺、Im f⁻ 四个非负部分，各自用简单函数逼近（简单函数逼近定理）；ℝ 的情形再把定义域切成有界块，用连续函数去顶半开区间的指示函数。',
        '⚠ 连续函数那一句**依赖 μ 是 Lebesgue–Stieltjes 测度**：换一个任意测度，简单函数的逼近照旧，连续函数的说法就不成立了。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.26']
    },

    {
      id: 'thm.differentiate-under-integral',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '交换极限/导数与积分',
      title: '定理：在积分号下取极限与求导',
      regions: ['analysis'],
      tags: ['定理', 'DCT', '求导', '带参变量积分'],
      statement: [
        '设 $$f : X × [a, b] → ℂ$$（$$−∞ < a < b < ∞$$），$$f(·, t)$$ 对每个 $$t ∈ [a, b]$$ 都可积。记',
        '',
        '$$F(t) := ∫_X f(x, t) dμ(x)$$',
        '',
        '**(a) 连续性**：若存在 $$g ∈ L¹(μ)$$ 使 $$|f(x, t)| ≤ g(x)$$ 对一切 $$x, t$$ 成立，且对每个 x 有 $$lim_{t→t_0} f(x, t) = f(x, t_0)$$，则',
        '',
        '$$lim_{t→t_0} F(t) = F(t_0)$$',
        '',
        '**(b) 求导**：若 $$∂f / ∂t$$ 处处存在，且存在 $$g ∈ L¹(μ)$$ 使 $$| ∂f / ∂t(x, t) | ≤ g(x)$$ 对一切 $$x, t$$ 成立，则 F 可微，且',
        '',
        '$$F\'(t) = ∫_X ∂f / ∂t(x, t) dμ(x)$$'
      ].join('\n'),
      notes: [
        '两个控制条件都是「用同一个 g 控制一整族函数」—— 这正是 DCT 的标准用法。',
        '⚠ g 必须属于 L¹（不能只是「局部有界」）。',
        '这是「带参变量积分」的两个基本定理：连续性可以交换极限与积分，可导性可以交换导数与积分。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.27']
    }
  ],

  edges: [

    {
      id: 'imp.mct',
      kind: 'implication',
      sources: ['def.integral-nonneg', 'prop.simple-integral-props'],
      target: 'thm.mct',
      title: '非负积分的定义 ⟹ 单调收敛定理',
      proof: [
        '**① 一个方向是免费的。** 由 fₙ ≤ f 与积分的单调性，∫fₙ ≤ ∫f，故',
        '',
        '$$lim_{n→∞} ∫ f_n ≤ ∫ f$$',
        '',
        '所以只需证另一边。',
        '',
        '**② 用一个简单函数从下面逼近 f。** 给定 ε > 0，由 ∫f 的定义（取上确界）存在简单函数 φ 使',
        '',
        '$$0 ≤ φ ≤ f，　∫ φ ≥ ∫ f − ε$$',
        '',
        '**③ 把 φ 搬进 Eₙ。** 令 $$E_n = {x : f_n(x) ≥ φ(x)}$$。因为 fₙ ↑ f 且 φ ≤ f，集合列 Eₙ 是递增的、且 $$⋃_n E_n = X$$。于是',
        '',
        '$$∫ f_n ≥ ∫_{E_n} f_n ≥ ∫_{E_n} φ$$',
        '',
        '**④ 让 n → ∞。** 由简单函数积分的性质 (d)，$$A ↦ ∫_A φ dμ$$ 是 ℳ 上的一个**测度**；把它用在递增列 Eₙ ↑ X 上，用测度的下连续性：',
        '',
        '$$lim_{n→∞} ∫_{E_n} φ = ∫_X φ = ∫ φ$$',
        '',
        '所以存在 N 使 n > N 时 $$∫_{E_n} φ > ∫ φ − ε$$，从而',
        '',
        '$$∫ f_n ≥ ∫ φ − ε ≥ ∫ f − 2ε$$',
        '',
        '**⑤ 收尾。** 对一切 n > N 成立，故 $$lim_n ∫ f_n ≥ ∫ f − 2ε$$；令 ε → 0 得 $$lim_n ∫ f_n ≥ ∫ f$$。与 ① 合起来就是等号。∎',
        '',
        '> ⭐ 整段证明只用了两样东西：**简单函数积分的 (d)**（把 A ↦ ∫_A φ 当作测度）和**积分的单调性**。单调性假设就是用来保证 ③ 里的 Eₙ 递增到 X 的。'
      ].join('\n'),
      note: '「先拿一个简单函数从下面顶住 f，再让 Eₙ 爬上去」—— 这个套路在 Fatou 引理里还会再用一次。'
    },

    {
      id: 'imp.termwise',
      kind: 'implication',
      sources: ['thm.mct'],
      target: 'thm.termwise-integration',
      title: 'MCT ⟹ 逐项积分',
      proof: [
        '**① 先看两项。** 由非负性，$${f_1 ∧ n}$$、$${f_2 ∧ n}$$ 都是简单函数列的极限（简单函数逼近定理），于是',
        '',
        '$$∫ (f_1 + f_2) = lim_{n→∞} ∫ (φ_n + ψ_n) = ∫ f_1 + ∫ f_2$$',
        '',
        '其中用到了 MCT（把 f₁ + f₂ 写成极限）与简单函数积分的可加性 (b)。',
        '',
        '**② 归纳到有限项。** 逐次用 ① 得到',
        '',
        '$$∫ ∑_{n=1}^{N} f_n = ∑_{n=1}^{N} ∫ f_n$$',
        '',
        '**③ 让 N → ∞。** 部分和 $$∑_{n≤N} f_n$$ 是 L⁺ 中的**递增**列，极限正是 $$∑_{n=1}^{∞} f_n$$。对部分和列用一次 MCT：',
        '',
        '$$∫ ∑_{n=1}^{∞} f_n = lim_{N→∞} ∫ ∑_{n=1}^{N} f_n = lim_{N→∞} ∑_{n=1}^{N} ∫ f_n = ∑_{n=1}^{∞} ∫ f_n$$',
        '',
        '∎'
      ].join('\n')
    },

    {
      id: 'imp.fatou',
      kind: 'implication',
      sources: ['thm.mct'],
      target: 'lem.fatou',
      title: 'MCT ⟹ Fatou 引理',
      proof: [
        '设 $$g_n = inf_{k ≥ n} f_k$$，则',
        '',
        '· $$g_n ≤ f_k$$ 对一切 k ≥ n 成立，故 $$∫ g_n ≤ inf_{k≥n} ∫ f_k$$；',
        '· $${g_n}$$ 是 L⁺ 中的**递增**列（下确界取的集合越来越少），且 $$lim_n g_n = lim inf_k f_k$$。',
        '',
        '对递增列 $${g_n}$$ 用 MCT：',
        '',
        '$$∫ lim inf_{n→∞} f_n = ∫ lim_{n→∞} g_n = lim_{n→∞} ∫ g_n ≤ lim_{n→∞} inf_{k ≥ n} ∫ f_k = lim inf_{n→∞} ∫ f_n$$',
        '',
        '∎',
        '',
        '> 整个证明就是把「liminf 定义成递增列的上确界」这件事翻译一遍 —— MCT 之外什么都没用。'
      ].join('\n'),
      note: 'Fatou 就是 MCT 在「不单调」情形下的残留物：单调性换成了 liminf。'
    },

    {
      id: 'imp.dct',
      kind: 'implication',
      sources: ['lem.fatou'],
      target: 'thm.dct',
      title: 'Fatou ⟹ 控制收敛定理',
      proof: [
        '设 $$f_n → f$$ a.e.，$$|f_n| ≤ g ∈ L¹$$。',
        '',
        '**① f ∈ L¹。** 由 $$|f| = lim|f_n| ≤ g$$（a.e.）得 f 可积。',
        '',
        '**② 上界方向：$$lim sup_n ∫ f_n ≤ ∫ f$$。** 考虑 $$g − f_n ≥ 0$$（因为 |fₙ| ≤ g）。这列非负函数满足',
        '',
        '$$g − f_n → g − f　a.e.$$',
        '',
        '对它用 Fatou 引理：',
        '',
        '$$∫ (g − f) ≤ lim inf_n ∫ (g − f_n) = ∫ g − lim sup_n ∫ f_n$$',
        '',
        '（最后一步是因为 $$lim inf(-a_n) = -lim sup a_n$$。）移项即得 $$lim sup_n ∫ f_n ≤ ∫ f$$。',
        '',
        '**③ 下界方向：$$lim inf_n ∫ f_n ≥ ∫ f$$。** 同样对 $$g + f_n ≥ 0$$ 用 Fatou：',
        '',
        '$$∫ (g + f) ≤ lim inf_n ∫ (g + f_n) = ∫ g + lim inf_n ∫ f_n$$',
        '',
        '移项得 $$lim inf_n ∫ f_n ≥ ∫ f$$。',
        '',
        '**④** ②与③合起来 $$lim sup ≤ ∫f ≤ lim inf$$，故极限存在且等于 ∫f。∎',
        '',
        '> ⭐ 关键在于**控制函数提供的非负性**：$$g ± f_n$$ 都是非负的，于是 Fatou 可以直接用。没有 g，这一步就写不出来。',
        '> 移项之所以合法，是因为 $$g$$ 可积（∫g < ∞）—— 这正是「控制函数必须属于 L¹」而不能只是「有界」的原因。'
      ].join('\n')
    },

    {
      id: 'imp.differentiate-under-integral',
      kind: 'implication',
      sources: ['thm.dct'],
      target: 'thm.differentiate-under-integral',
      title: 'DCT ⟹ 在积分号下求极限与求导',
      proof: [
        '**(a)** 取任意 $$t_n → t_0$$，令 $$f_n(x) = f(x, t_n)$$。由题设 $$|f_n| ≤ g ∈ L¹$$、且 $$f_n → f(x,t_0)$$ 逐点，DCT 直接给出',
        '',
        '$$F(t_n) = ∫ f_n → ∫ f(·, t_0) = F(t_0)$$',
        '',
        '对一切序列 tₙ 成立，故 $$lim_{t→t_0} F(t) = F(t_0)$$。',
        '',
        '**(b)** 取任意 $$t_n → t_0$$，令',
        '',
        '$$h_n(x) = (f(x, t_n) − f(x, t_0)) / (t_n − t_0)$$',
        '',
        '则 $$F\'(t_0) = lim_n (F(t_n) − F(t_0)) / (t_n − t_0) = lim_n ∫ h_n$$。要把它换成 ∫lim hₙ 就够了，而 DCT 正好提供这个能力：',
        '',
        '· $$h_n → ∂f / ∂t(x, t_0)$$ 逐点（这是导数的定义）；',
        '· **控制**：由中值定理，$$|h_n(x)| ≤ sup_{t ∈ [t_0, t_n]} | ∂f / ∂t(x, t) | ≤ g(x)$$。',
        '',
        '于是',
        '',
        '$$F\'(t_0) = lim_n ∫ h_n = ∫ lim_n h_n = ∫ ∂f / ∂t(x, t_0) dμ(x)$$',
        '',
        '∎',
        '',
        '> ⚠ (b) 里那个「取 sup 的控制」必须提前假定：如果只对**每个** t 假设有控制，是不够的 —— 需要**同一个 g** 控制整族偏导数。'
      ].join('\n')
    },

    {
      id: 'imp.termwise-L1',
      kind: 'implication',
      sources: ['thm.termwise-integration', 'prop.integral-zero-iff'],
      target: 'thm.termwise-L1',
      title: '非负逐项积分 + 零集判定 ⟹ L¹ 的逐项积分',
      proof: [
        '设 $$∑_j ∫ |f_j| < ∞$$。',
        '',
        '**① 绝对收敛 a.e.。** 令 $$g = ∑_j |f_j| ∈ L⁺$$。由非负函数的逐项积分，',
        '',
        '$$∫ g = ∑_j ∫ |f_j| < ∞$$',
        '',
        '由「积分有限的后果」，g < ∞ a.e.，即 $$∑_j |f_j(x)| < ∞$$ 对 a.e. x 成立。所以 $$∑_j f_j(x)$$ 对 a.e. x **绝对收敛**。',
        '',
        '**② 定义 f。** 令 $$f(x) = ∑_j f_j(x)$$（在收敛的 a.e. 点上），其余点随意取 0。则 $$|f| ≤ g$$，故 f ∈ L¹。',
        '',
        '**③ 部分和被控制。** 部分和 $$s_N = ∑_{j≤N} f_j$$ 满足 $$|s_N| ≤ g ∈ L¹$$。',
        '',
        '**④ 用 DCT。** $$s_N → f$$ a.e.，且被 g 控制，故',
        '',
        '$$∫ f = lim_{N→∞} ∫ s_N = lim_{N→∞} ∑_{j≤N} ∫ f_j = ∑_{j=1}^{∞} ∫ f_j$$',
        '',
        '（中间一步用 L¹ 的线性。）∎'
      ].join('\n')
    },

    {
      id: 'imp.integrals-equal-iff',
      kind: 'implication',
      sources: ['prop.integral-zero-iff'],
      target: 'prop.integrals-equal-iff',
      title: '积分为零 ⟹ 用积分识别函数',
      proof: [
        '记 $$h = f − g ∈ L¹$$。三条之间的等价链条是',
        '',
        '$$(i) ∫_E f = ∫_E g　∀E ∈ ℳ　⟺　∫_E h = 0　∀E$$',
        '',
        '**(i) ⟹ (ii)**：分别取 $$E = {h ≥ 0}$$ 与 $$E = {h < 0}$$。由 $$∫_E h = 0$$ 且 h 在 E 上不变号，得 $${h > 0}$$ 与 $${h < 0}$$ 都是零集（否则积分为正/负），故 $$μ({h ≠ 0}) = 0$$，于是 $$∫|h| = 0$$。',
        '',
        '**(ii) ⟹ (iii)**：$$∫|h| = 0$$ 配合「积分为零 ⟺ 几乎处处为零」，直接得到 h = 0 a.e.。',
        '',
        '**(iii) ⟹ (i)**：h = 0 a.e. 时，对任意 E，$$∫_E h$$ 的简单函数逼近里可以整体避开零集，故积分为 0。∎'
      ].join('\n')
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.simple-integral-def',
      kind: 'definition',
      definition: 'def.simple-function',
      usedBy: 'def.integral-simple',
      note: '简单函数的积分就是在简单函数的定义上算加权和。'
    },
    {
      id: 'def-link.nonneg-simple',
      kind: 'definition',
      definition: 'def.integral-simple',
      usedBy: 'def.integral-nonneg',
      note: '非负函数的积分定义成简单函数积分族的上确界。'
    },
    {
      id: 'def-link.mct-nonneg',
      kind: 'definition',
      definition: 'def.integral-nonneg',
      usedBy: 'thm.mct',
      note: 'MCT 是绕着这个定义做的。'
    },
    {
      id: 'def-link.lplus-mct',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'thm.mct',
      note: 'MCT 对整列都要求在 L⁺ 里。'
    },
    {
      id: 'def-link.lplus-complex',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'def.integral-complex',
      note: '复函数的积分就是把正负部丢回 L⁺ 去算。'
    },
    {
      id: 'def-link.lplus-integrable',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'def.integrable',
      note: '可积 ⟺ ∫|f| < ∞，而 |f| ∈ L⁺。'
    },
    {
      id: 'def-link.integrable-dct',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.dct',
      note: 'DCT 的前提与结论都在 L¹ 里。'
    },
    {
      id: 'def-link.lplus-dct',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'thm.dct',
      note: 'DCT 的证明是正负部各用一次 Fatou —— 又回到 L⁺。'
    },
    {
      id: 'def-link.nullset-zeromeasure',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'prop.integral-zero-iff',
      note: '「积分为零 ⟺ 几乎处处为零」里的 a.e. 就是相对于零集说的。'
    },
    {
      id: 'def-link.premeasure-termwise',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'thm.termwise-integration',
      note: '逐项积分最终落在测度的可数可加性上。'
    },
    {
      id: 'def-link.integrable-L1-vectorspace',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.L1-vector-space',
      note: '这条命题说 L¹ 在代数上是个向量空间。'
    },
    {
      id: 'def-link.integrable-approx',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.approximation-L1',
      note: '逼近定理是在 L¹ 里说的（用的是 ∫|f − φ| 这个量）。'
    },
    {
      id: 'def-link.simple-approx-L1',
      kind: 'definition',
      definition: 'def.simple-function',
      usedBy: 'thm.approximation-L1',
      note: '逼近用的正是简单函数。'
    },
    {
      id: 'def-link.nullset-ae-mct',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'cor.mct-ae',
      note: '「a.e. 版本」的意思就是把零集上的例外丢掉。'
    }
  ]
});
