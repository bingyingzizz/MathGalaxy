/* ==========================================================================
   内容包 · 有界变差函数与绝对连续函数
   --------------------------------------------------------------------------
   来自手写笔记「总结：符号测度」第 8 ~ 11 页。

   这一包把「测度」和「函数」两类对象正式接起来：

      ℝ 上的复 Borel 测度 μ  ←── 一一对应 ──→  NBV 函数 F(x) = μ((−∞, x])

   于是 Radon–Nikodym 的每一条结论，都能翻译成一句关于函数的话：
     μ ⊥ m   ⟺  F′ = 0 a.e.
     μ ≪ m   ⟺  F(x) = ∫_{−∞}ˣ F′(t) dt
     绝对连续 ⟺ 微积分基本定理成立

   另一半是经典的有界变差理论：BV 函数几乎处处可导、只有可数多个不连续点，
   而且可以写成一增一减。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '有界变差与绝对连续',
  nodes: [

    {
      id: 'thm.monotone-differentiable',
      cluster: 'analysis.bv',
      type: 'theorem',
      label: '单调函数几乎处处可导',
      title: '定理：单调函数几乎处处可导，且不连续点可数',
      regions: ['analysis'],
      tags: ['定理', '单调函数', '可导'],
      statement: [
        '设 $$F : \\mathbb{R} \\to \\mathbb{R}$$ 递增，$$G(x) := F(x+)$$（右极限）。则',
        '',
        '**(a)** F 的不连续点至多可数；',
        '',
        '**(b)** F 与 G 都 **a.e. 可导**，且',
        '',
        '$$F\' = G\'\\quad  a.e.$$'
      ].join('\n'),
      notes: [
        '(a)：每个不连续点 x 对应一个「跳跃区间」$$(F(x-), F(x+))$$，这些区间两两不交；每个区间里取一个有理数，得到一个到 ℚ 的单射。故不连续点至多可数。',
        '(b) 的路线很漂亮：G 右连续递增，于是它诱导一个正则 Borel 测度 μ_G。对 h > 0 有',
        '',
        '$$G(x+h) - G(x) = \\mu_G((x, x+h])$$',
        '',
        '于是差商恰好是 $$\\mu_G(E_h)/m(E_h)$$ —— 其中 $$E_h = (x, x+h]$$ 是一个**可缩族**。由 RN 导数的点态公式（见「ℝⁿ 上的微分」），这个比值 a.e. 收敛到 μ_G 关于 m 的 RN 导数，即 G′ a.e. 存在。',
        '剩下的部分用一个「夹逼」把 F′ = G′ 也拿下：令 H = G − F ≥ 0（跳跃函数），它 a.e. 为 0；再令 F̄ 为跳跃的累积函数，则 μ_F̄ 集中在可数集上，故 μ_F̄ ⊥ m，于是 F̄′ = 0 a.e.。在 F̄′ = 0 的点上用',
        '',
        '$$0 \\le H(x+h) / h \\le (\\bar{F}(x+h) - \\bar{F}(x)) / h\\quad  (h > 0)$$',
        '',
        '夹逼即得 H′ = 0 a.e.，故 F′ = G′ a.e.∎'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.23']
    },

    {
      id: 'def.bounded-variation',
      cluster: 'analysis.bv',
      type: 'definition',
      label: '有界变差 BV',
      title: '全变差与有界变差函数（Total Variation, BV）',
      regions: ['analysis'],
      tags: ['定义', '全变差', 'BV'],
      statement: [
        '设 $$F : \\mathbb{R} \\to \\mathbb{C}$$。定义它的**全变差函数**',
        '',
        '$$T_F(x) := sup \\{ \\sum_{j=1}^{n} |F(x_j) - F(x_{j-1})| : n \\in \\mathbb{N}, -\\infty < x_0 < \\cdots < x_n = x \\}$$',
        '',
        '$$T_F$$ 是递增的 $$\\mathbb{R} \\to [0, +\\infty]$$。若 $$T_F(+\\infty) < +\\infty$$，称 F 是**有界变差的**，这类函数全体记作 **BV**。',
        '',
        '$$T_F(b) - T_F(a)$$ 称为 F 在 $$[a, b]$$ 上的全变差；$$[a,b]$$ 上有界变差的函数全体记作 $$BV([a, b])$$。'
      ].join('\n'),
      notes: [
        '直观：$$T_F(x)$$ 是「沿着图像从 −∞ 走到 x 所走过的总路程」。有界变差就是「走过的路有限」。',
        '两个自然的映射：**投射** $$BV \\to BV([a,b])$$，$$f \\mapsto f|_{[a,b]}$$；**嵌入** $$BV([a,b]) \\to BV$$，$$f \\mapsto \\{ f(x) (x \\in [a,b]); f(b) (x > b); f(a) (x < a) \\}$$。',
        '⚠ 全变差用的是**每一段的绝对差之和**，所以振荡太厉害的（比如 $$x sin(1/x)$$ 在 0 附近）就要仔细算 —— 见例子节点。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.5', 'Rudin, Real and Complex Analysis, Ch. 7']
    },

    {
      id: 'prop.bv-examples',
      cluster: 'analysis.bv',
      type: 'proposition',
      label: 'BV 的例子与基本性质',
      title: '命题：BV 的几个例子与封闭性',
      regions: ['analysis'],
      tags: ['命题', 'BV', '例子'],
      statement: [
        '1. 若 $$F : \\mathbb{R} \\to \\mathbb{R}$$ **有界递增**，则 $$F \\in BV$$（此时 $$T_F = F - F(-\\infty)$$）。',
        '',
        '2. $$BV$$ 是 ℂ-向量空间。',
        '',
        '3. 若 F 实可微且 F′ 有界，则对一切 $$-\\infty < a < b < \\infty$$ 有 $$F \\in BV([a,b])$$。',
        '',
        '4. $$F(x) = sin x$$：对任何紧区间 $$[a,b]$$，$$F \\in BV([a,b])$$。',
        '',
        '5. $$F(x) = xsin(1/x)$$（$$x \\ne 0$$），$$F(0) = 0$$：若 $$0 \\in [a,b]$$，则 $$F \\in BV([a,b])$$。'
      ].join('\n'),
      notes: [
        '第 4、5 两个例子是「振荡型」的：函数本身有界、但导数在某个点附近爆掉或无限振荡。它们仍然有界变差 —— 说明**BV 比「C¹」宽得多**。',
        '一个标准的**反例**（不属于 BV）：$$F(x) = sin(1/x)$$（$$x \\ne 0$$）、$$F(0) = 0$$ —— 它在 0 附近无限次振荡且振幅不衰减，全变差发散。',
        '⭐ 记住这条分界线：**振幅不衰减的振荡 ⟹ 不是 BV**。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.5']
    },

    {
      id: 'lem.variation-monotone',
      cluster: 'analysis.bv',
      type: 'lemma',
      label: 'T_F ± F 递增',
      title: '引理：实值 BV 函数的 T_F + F 与 T_F − F 都递增',
      regions: ['analysis'],
      tags: ['引理', '全变差', '递增'],
      statement: [
        '设 F 是**实值**有界变差函数。则',
        '',
        '$$T_F + F\\quad \\text{ 与}\\quad  T_F - F$$',
        '',
        '都是**递增**函数。'
      ].join('\n'),
      notes: [
        '证明（笔记里的）：设 x < y，任给 ε > 0，取分划 $$x_0 < \\cdots < x_n = x$$ 使 $$\\sum|F(x_j) - F(x_{j-1})| \\ge T_F(x) - \\varepsilon$$，再补上点 y 与 x 之间的比较：',
        '',
        '$$T_F(y) \\pm  F(y) \\ge \\sum_j |F(x_j) - F(x_{j-1})| + (F(y) - F(x)) \\pm  F(x) \\ge T_F(x) - \\varepsilon \\pm  F(x)$$',
        '',
        '由 ε 任意即得 $$T_F(y) \\pm  F(y) \\ge T_F(x) \\pm  F(x)$$。∎',
        '⭐ 这条是下一条「BV 的 Jordan 分解」的全部技术内容：一旦知道 $$T_F \\pm  F$$ 递增，就能把 F 写成一增一减。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.27']
    },

    {
      id: 'thm.bv-jordan',
      cluster: 'analysis.bv',
      type: 'theorem',
      label: 'BV 的 Jordan 分解',
      title: '定理：F ∈ BV ⟺ F = G − H（G、H 有界递增）',
      regions: ['analysis'],
      tags: ['定理', 'BV', 'Jordan 分解'],
      statement: [
        '**(a)** $$F \\in BV \\iff Re F \\in BV\\text{ 且} Im F \\in BV$$。',
        '',
        '**(b)** 设 $$F : \\mathbb{R} \\to \\mathbb{R}$$。则',
        '',
        '$$F \\in BV \\iff F = G - H,\\text{ 其中} G, H\\text{ 都是有界递增函数}$$'
      ].join('\n'),
      notes: [
        '具体取法（就是测度论 Jordan 分解的函数版）：',
        '',
        '$$F = (1/2)(T_F + F) - (1/2)(T_F - F)$$',
        '',
        '前一项叫 F 的**正变差**，后一项叫**负变差** —— 名字与符号测度的 ν⁺、ν⁻ 完全对应。',
        '由引理，$$T_F \\pm  F$$ 递增；而「有界」来自 F ∈ BV。',
        '⭐ 意义：**BV 函数 = 两个有界递增函数之差**。于是关于 BV 的一切都能化归到「递增函数」这个好处理的情形。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.27']
    },

    {
      id: 'prop.bv-regularity',
      cluster: 'analysis.bv',
      type: 'proposition',
      label: 'BV 函数的正则性',
      title: '命题：BV 函数的单侧极限都存在、不连续点可数、a.e. 可导',
      regions: ['analysis'],
      tags: ['命题', 'BV', '正则性'],
      statement: [
        '设 $$F \\in BV$$。则',
        '',
        '**(c)** 对每个 $$x \\in \\mathbb{R}$$，$$F(x+)$$ 与 $$F(x-)$$ 都存在；$$F(\\pm \\infty)$$ 也存在；',
        '',
        '**(d)** F 的不连续点至多可数；',
        '',
        '**(e)** 令 $$G(x) = F(x+)$$，则 $$F\'$$ 与 $$G\'$$ 处处存在且相等（a.e.）。'
      ].join('\n'),
      notes: [
        '全部由「F = G − H」化归到递增函数：递增函数的单侧极限显然存在；不连续点可数由单调函数那条定理；a.e. 可导也由那条定理（差的导数 = 导数的差）。',
        '⭐ 所以 BV 函数虽然可能很不光滑，但**结构上非常驯服**：只有可数多个跳跃，其余地方都「几乎处处可导」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.27']
    },

    {
      id: 'def.nbv',
      cluster: 'analysis.bv',
      type: 'definition',
      label: 'NBV',
      title: 'NBV：右连续且 F(−∞) = 0 的有界变差函数',
      regions: ['analysis'],
      tags: ['定义', 'NBV'],
      statement: [
        '$$NBV := \\{ F \\in BV : F\\text{ 右连续},\\text{ 且} F(-\\infty) = 0 \\}$$'
      ].join('\n'),
      notes: [
        '为什么要加这两个条件：因为下一条定理要建立**ℝ 上的复 Borel 测度 ↔ NBV** 的一一对应，而对应式是',
        '',
        '$$F(x) = \\mu((-\\infty, x])$$',
        '',
        '右边那个函数自动右连续、且在 −∞ 处为 0。把左边限制成 NBV，对应才是**双射**而不是满射。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.29']
    },

    {
      id: 'lem.nbv-variation',
      cluster: 'analysis.bv',
      type: 'lemma',
      label: '全变差的 NBV 性质',
      title: '引理：T_F(−∞) = 0；F 右连续 ⟹ T_F 右连续',
      regions: ['analysis'],
      tags: ['引理', '全变差', 'NBV'],
      statement: [
        '设 $$F \\in BV$$。则',
        '',
        '- $$T_F(-\\infty) = 0$$；',
        '- 若 F **右连续**，则 $$T_F$$ 也右连续。'
      ].join('\n'),
      notes: [
        '第一部分：给定 ε > 0 与 x，取分划使 $$\\sum \\ge T_F(x) - \\varepsilon$$；于是对 $$y \\le x_0$$ 有 $$T_F(y) \\le \\varepsilon$$。由 ε 任意，$$T_F(-\\infty) = 0$$。',
        '第二部分：设 $$\\alpha = T_F(x+) - T_F(x)$$。由 F 右连续，对充分小的 h 有 $$|F(x+h) - F(x)| < \\varepsilon$$ 且 $$T_F(x+h) - T_F(x+) < \\varepsilon$$；再从两边各取分划夹住，得到',
        '',
        '$$(3/2)\\alpha - \\varepsilon \\le T_F(x+h) - T_F(x) < \\varepsilon + \\alpha$$',
        '',
        '于是 $$\\alpha < 4\\varepsilon$$，由 ε 任意得 α = 0。∎',
        '⭐ 这条保证「全变差」这个操作**保持 NBV**：F ∈ NBV ⟹ T_F ∈ NBV，正是下一条定理里 |μ_F| = μ_{T_F} 的根据。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Lemma 3.30']
    },

    {
      id: 'prop.monotone-integral-derivative',
      cluster: 'analysis.bv',
      type: 'proposition',
      label: '递增函数的导数积分不等式',
      title: '命题：∫ₐᵇ F′ ≤ F(b) − F(a)',
      regions: ['analysis'],
      tags: ['命题', '递增', '积分', '导数'],
      statement: [
        '设 $$F \\nearrow $$ 递增，$$G(x) = F(x+)$$（右连续递增）。则',
        '',
        '$$\\int_a^b F\' \\le F(b) - F(a)$$'
      ].join('\n'),
      notes: [
        '证明（笔记里的）：G 右连续递增，诱导一个正则 Borel 测度 μ_G。写它的 Lebesgue–Radon–Nikodym 分解',
        '',
        '$$d\\mu_G = d\\lambda + f\\cdot dm, \\quad  f = lim \\mu_G(E_h) / m(E_h)\\quad  a.e.$$',
        '',
        '而差商恰好是那个比值，所以 $$f = G\' = F\'$$ a.e.。于是',
        '',
        '$$\\int_a^b F\' = \\int_a^b f\\cdot dm \\le \\int_a^b d\\mu_G = G(b) - G(a) \\le F(b) - F(a)$$',
        '',
        '（中间那个不等号是因为省略了奇异的 λ ≥ 0。）∎',
        '⚠ **这里一般不是等号**：Cantor 函数是经典反例 —— 它递增、连续、导数 a.e. 为 0，所以左边 = 0 但右边 = 1。这个差别正是「绝对连续」这个概念要补上的东西。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.28']
    },

    {
      id: 'thm.borel-measure-nbv',
      cluster: 'analysis.bv',
      type: 'theorem',
      label: '测度 ↔ NBV 的一一对应',
      title: '定理：ℝ 上的复 Borel 测度 ⟷ NBV 函数',
      regions: ['analysis'],
      tags: ['定理', 'Riesz 表示', 'Borel 测度', 'NBV'],
      statement: [
        '**(1)** 若 μ 是 ℝ 上的复 Borel 测度，$$F(x) := \\mu((-\\infty, x])$$，则 $$F \\in NBV$$。',
        '',
        '**(2)** 反之，若 $$F \\in NBV$$，则存在**唯一**的复 Borel 测度 $$\\mu_F$$ 使',
        '',
        '$$F(x) = \\mu_F((-\\infty, x])$$',
        '',
        '而且',
        '',
        '$$|\\mu_F| = \\mu_{T_F}$$'
      ].join('\n'),
      notes: [
        '这是 **Riesz 表示定理**在实数轴上的形式：测度与一类函数一一对应。',
        '证明思路（笔记里的）：把复测度拆成四个正测度 $$\\mu = \\mu_1^+ - \\mu_1^- + i(\\mu_2^+ - \\mu_2^-)$$，各取 $$F_j^{\\pm }(x) = \\mu_j^{\\pm }((-\\infty, x])$$ —— 它们递增、右连续、在 −∞ 处为 0、在 +∞ 处有限，于是 F ∈ NBV。反方向把 F ∈ NBV 拆成 $$F_1^+ - F_1^- + i(F_2^+ - F_2^-)$$，每一块配一个测度。',
        '$$|\\mu_F| = \\mu_{T_F}$$ 这一条说的是：**取全变差（函数侧）与取全变差（测度侧）是同一件事** —— 这也正是引理「T_F ∈ NBV」的用处。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.29']
    },

    {
      id: 'prop.nbv-derivative',
      cluster: 'analysis.bv',
      type: 'proposition',
      label: 'NBV 函数的导数与测度的关系',
      title: '命题：μ_F ⊥ m ⟺ F′ = 0 a.e.；μ_F ≪ m ⟺ F(x) = ∫_{−∞}ˣ F′',
      regions: ['analysis'],
      tags: ['命题', 'NBV', 'RN 导数'],
      statement: [
        '设 $$F \\in NBV$$。则 $$F\' \\in L^1(m)$$，并且',
        '',
        '$$\\mu_F \\perp  m \\iff F\' = 0\\quad  a.e.$$',
        '$$\\mu_F \\ll  m \\iff F(x) = \\int_{-\\infty}^{x} F\'(t) dt$$'
      ].join('\n'),
      notes: [
        '证明：写 $$d\\mu_F = d\\lambda + f\\cdot dm$$（Lebesgue 分解），由测度那条定理 $$f = F\'$$ a.e.。于是',
        '',
        '· $$\\mu_F \\perp  m$$ 意味着绝对连续部为零，即 f = 0 ⟹ F′ = 0 a.e.；',
        '· $$\\mu_F \\ll  m$$ 意味着 λ = 0，于是 $$F(x) = \\mu_F((-\\infty,x]) = \\int_{-\\infty}^x f\\cdot dm = \\int_{-\\infty}^x F\'\\cdot dt$$。',
        '⭐ 这一条就是「微积分基本定理」的测度版：**能不能把函数积回来，取决于 μ_F 是否绝对连续**。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.35']
    },

    {
      id: 'def.ac-function',
      cluster: 'analysis.bv',
      type: 'definition',
      label: '绝对连续函数',
      title: '绝对连续函数 AC（Absolutely Continuous Function）',
      regions: ['analysis'],
      tags: ['定义', '绝对连续', 'AC'],
      statement: [
        '函数 $$F : [a, b] \\to \\mathbb{C}$$ 是**绝对连续的**，当且仅当',
        '',
        '$$\\forall\\varepsilon > 0, \\exists\\delta > 0 :\\text{ 任意有限个两两不交的区间} (a_j, b_j) \\subseteq [a, b]\\text{ 满足} \\sum(b_j - a_j) < \\delta,\\text{ 就一定有} \\sum|F(b_j) - F(a_j)| < \\varepsilon$$'
      ].join('\n'),
      notes: [
        '⚠ 注意与「一致连续」的区别：一致连续是**单个**小区间上控制振幅，而绝对连续要求**任意多个小区间合起来**也能控制 —— 这正是为了堵住 Cantor 函数那种「在零测集上爬升」的情形。',
        '记号：$$AC([a, b])$$ 表示 $$[a,b]$$ 上绝对连续的函数全体。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.5']
    },

    {
      id: 'prop.ac-iff-measure-ac',
      cluster: 'analysis.bv',
      type: 'proposition',
      label: '函数绝对连续 ⟺ 测度绝对连续',
      title: '命题：F 绝对连续 ⟺ μ_F ≪ m',
      regions: ['analysis'],
      tags: ['命题', '绝对连续', 'μ_F ≪ m'],
      statement: [
        '设 $$F \\in NBV$$。则',
        '',
        '$$F\\text{ 绝对连续} \\iff \\mu_F \\ll  m$$'
      ].join('\n'),
      notes: [
        '**(⟸)** 由测度的绝对连续的 ε–δ 刻画：$$\\mu_F \\ll  m$$ 给出「$$m(E) < \\delta \\implies |\\mu_F(E)| < \\varepsilon$$」。取 E 为区间的有限不交并，就直接得到函数版的绝对连续性。',
        '**(⟹)** 设 $$E \\in \\mathfrak{B}_\\mathbb{R}$$ 且 $$m(E) = 0$$。要证 $$\\mu_F(E) = 0$$。取递减开集列 $$U_1 \\supset  U_2 \\supset  \\cdots \\supset  E$$ 使 $$m(U_k) < \\delta$$（由正则性）。每个 $$U_k$$ 是区间的可数不交并，由函数的绝对连续性与 $$m(U_k) < \\delta$$ 得 $$|\\mu_F(U_j)| < \\varepsilon$$；再由测度的上连续性与 $$\\bigcap U_k = E$$ 得 $$|\\mu_F(E)| \\le \\varepsilon$$。由 ε 任意，$$\\mu_F(E) = 0$$。∎',
        '⭐ 这条把两个「绝对连续」**接上了**：函数的和测度的。从此「绝对连续函数」这个微积分里的概念有了测度论的解释。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.35']
    },

    {
      id: 'cor.integral-is-ac-nbv',
      cluster: 'analysis.bv',
      type: 'corollary',
      label: '积出来的函数是 AC · NBV',
      title: '推论：f ∈ L¹(m) ⟹ F(x) = ∫_{−∞}ˣ f 是 AC、NBV；反之亦然',
      regions: ['analysis'],
      tags: ['推论', 'AC', 'NBV', '基本定理'],
      statement: [
        '**(1)** 若 $$f \\in L^1(m)$$，则',
        '',
        '$$F(x) := \\int_{-\\infty}^{x} f(t) dt$$',
        '',
        '属于 $$AC \\cap NBV$$。',
        '',
        '**(2)** 反之，若 $$F \\in NBV$$ 且绝对连续，则 $$F\' \\in L^1(m)$$ 且',
        '',
        '$$F(x) = \\int_{-\\infty}^{x} F\'(t) dt$$'
      ].join('\n'),
      notes: '两个方向合起来就是「绝对连续函数正好是某个 L¹ 函数的积分」。',
      refs: ['Folland, Real Analysis, Theorem 3.35']
    },

    {
      id: 'lem.ac-subset-bv',
      cluster: 'analysis.bv',
      type: 'lemma',
      label: 'AC ⊆ BV',
      title: '引理：绝对连续蕴含绝对变差（紧区间上）',
      regions: ['analysis'],
      tags: ['引理', 'AC', 'BV'],
      statement: [
        '$$AC([a, b]) \\subseteq BV([a, b])$$'
      ].join('\n'),
      notes: [
        '证明：由绝对连续性取 δ 使「总长 < δ ⟹ 总变差 < 1」。把 [a,b] 切成有限多段、每段长度 < δ，则每段的变差 ≤ 1，加起来 ≤ 段数 —— 有限。∎',
        '⚠ 反过来不成立：**Cantor 函数在 [0,1] 上有界变差但不绝对连续**。所以这个包含是严格的。',
        '⭐ 这条是下面那条「微积分基本定理 TFAE」的准备工作：它保证 (a) ⟹ BV，从而可以谈 F′。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.5']
    },

    {
      id: 'thm.ftc-lebesgue',
      cluster: 'analysis.bv',
      type: 'theorem',
      label: '微积分基本定理（Lebesgue 版）',
      title: '定理（TFAE）：绝对连续 ⟺ 是 L¹ 函数的积分 ⟺ 导数的积分还原',
      regions: ['analysis'],
      tags: ['定理', '微积分基本定理', 'AC', 'NCT'],
      statement: [
        '设 $$F : [a, b] \\to \\mathbb{C}$$，区间紧。则下列三条**彼此等价**：',
        '',
        '**(a)** F 在 $$[a, b]$$ 上**绝对连续**；',
        '',
        '**(b)** 存在 $$f \\in L^1([a, b])$$ 使',
        '',
        '$$F(x) - F(a) = \\int_a^x f(t) dt\\quad  \\forall x \\in [a, b]$$',
        '',
        '**(c)** F **a.e. 可导**、$$F\' \\in L^1([a, b])$$，且',
        '',
        '$$F(x) - F(a) = \\int_a^x F\'(t) dt$$'
      ].join('\n'),
      notes: [
        '⭐ 这是 **Newton–Leibniz 公式在 Lebesgue 积分下的完整版本**。对比 Riemann 积分：那里「F′ 可积且公式成立」要求 F′ 连续（或至少 Riemann 可积），这里只需要「F 绝对连续」。',
        '三个条件的分工：(a) 是「函数侧」的条件（用区间划分刻画），(b) 是「积分侧」，(c) 是「导数侧」。定理说它们是同一件事。',
        '⚠ 若去掉绝对连续，公式**会失效**：Cantor 函数满足 (c) 的「a.e. 可导 + F′ ∈ L¹」但 ∫₀¹ F′ = 0 ≠ F(1) − F(0) = 1。',
        '证明链条：(a) ⟹ (b)：由 AC ⊆ BV 与「μ_F ≪ m」；(b) ⟹ (c)：微积分基本定理的直接推论；(c) ⟹ (a)：由「F(x) = ∫ F′」的形式给出绝对连续性。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.35']
    }
  ],

  edges: [

    {
      id: 'imp.bv-jordan',
      kind: 'implication',
      sources: ['lem.variation-monotone'],
      target: 'thm.bv-jordan',
      title: 'T_F ± F 递增 ⟹ BV 的 Jordan 分解',
      proof: [
        '**(b) 的 (⟸) 方向**：若 $$F = G - H$$（G、H 有界递增），则对任意分划',
        '',
        '$$\\sum|F(x_j) - F(x_{j-1})| \\le \\sum|G(x_j) - G(x_{j-1})| + \\sum|H(x_j) - H(x_{j-1})| = (G(x) - G(-\\infty)) + (H(x) - H(-\\infty))$$',
        '',
        '（递增函数的相邻差非负，可以直接去绝对值。）于是 $$T_F(x) \\le (G+H)(x) - (G+H)(-\\infty) < \\infty$$，F ∈ BV。',
        '',
        '**(b) 的 (⟹) 方向**：由**引理**，$$T_F + F$$ 与 $$T_F - F$$ 都递增；它们有界（因为 F ∈ BV 且 F 有界）。令',
        '',
        '$$G := (1/2)(T_F + F), \\quad  H := (1/2)(T_F - F)$$',
        '',
        '则 G、H 有界递增，且',
        '',
        '$$G - H = (1/2)(T_F + F) - (1/2)(T_F - F) = F$$',
        '',
        '∎',
        '',
        '**(a)**：把实部虚部分开即可（$$|Re F| \\le |F|$$、$$|F| \\le |Re F| + |Im F|$$，两边夹）。∎'
      ].join('\n'),
      note: '⭐ 这叫「函数版的 Jordan 分解」，与符号测度的 ν = ν⁺ − ν⁻ 完全平行 —— 事实上两者通过「测度 ↔ NBV」的对应是同一件事。'
    },

    {
      id: 'imp.bv-regularity',
      kind: 'implication',
      sources: ['thm.bv-jordan', 'thm.monotone-differentiable'],
      target: 'prop.bv-regularity',
      title: '化归到递增函数 ⟹ BV 的正则性',
      proof: [
        '由**Jordan 分解**，只需对**有界递增**函数证明这三条 —— 差的性质自动继承。',
        '',
        '**(c)** 递增函数 F 在每点都有单侧极限：',
        '',
        '$$F(x-) = \\sup_{y < x} F(y), \\quad  F(x+) = \\inf_{y > x} F(y)$$',
        '',
        '（递增数列的有界单调收敛定理。）同理 $$F(\\pm \\infty) = sup/inf$$ 也存在。',
        '',
        '**(d)** 由**单调函数那条定理**的 (a)：不连续点至多可数。',
        '',
        '**(e)** 由同一条定理的 (b)：$$F\' = G\'$$ a.e.，其中 $$G(x) = F(x+)$$。对 G − H 形式的函数两边相减即可。∎',
        '',
        '> ⭐ 整个证明的模式很典型：**先证明「递增」这个好情形，再用 Jordan 分解把一般情形搬过去**。'
      ].join('\n')
    },

    {
      id: 'imp.borel-nbv',
      kind: 'implication',
      sources: ['lem.nbv-variation', 'thm.bv-jordan'],
      target: 'thm.borel-measure-nbv',
      title: 'NBV 的性质 ⟹ 测度与函数的一一对应',
      proof: [
        '**(1) 测度 ⟹ 函数。** 复测度拆成四个正测度 $$\\mu = \\mu_1^+ - \\mu_1^- + i(\\mu_2^+ - \\mu_2^-)$$。令',
        '',
        '$$F_j^{\\pm }(x) := \\mu_j^{\\pm }((-\\infty, x])$$',
        '',
        '每个 $$F_j^{\\pm }$$ 递增、右连续、$$F_j^{\\pm }(-\\infty) = 0$$、$$F_j^{\\pm }(+\\infty) = \\mu_j^{\\pm }(\\mathbb{R}) < \\infty$$。于是 F 是四个这样的函数之组合，属于 NBV。',
        '',
        '**(2) 函数 ⟹ 测度。** 反之任意 $$F \\in NBV$$ 可以写成',
        '',
        '$$F = F_1^+ - F_1^- + i(F_2^+ - F_2^-)$$',
        '',
        '（用 NBV 版本的 Jordan 分解，注意右连续与 F(−∞) = 0 都被差保留。）每个递增右连续、F(−∞) = 0 的函数唯一对应一个有限 Borel 测度（取 μ((a,b]) = F(b) − F(a)，由 Lebesgue–Stieltjes 那一套扩张）；四块加起来即得 μ_F。**唯一性**来自「μ 由它在 (−∞, x] 上的值唯一决定」，而后者生成整个 𝔅_ℝ。',
        '',
        '**(3) |μ_F| = μ_{T_F}。** 由**引理**，$$F \\in NBV \\implies T_F \\in NBV$$，所以 $$\\mu_{T_F}$$ 有意义。两边都是 NBV 函数，逐点比较：对任意 x，',
        '',
        '$$\\mu_{T_F}((-\\infty, x]) = T_F(x) = sup\\{ \\sum|F(x_j) - F(x_{j-1})| \\} = |\\mu_F|((-\\infty, x])$$',
        '',
        '（中间那个等号是 |μ| 的全变差定义 + 测度的可数可加性。）由 (−∞, x] 生成 𝔅_ℝ，两个测度相等。∎'
      ].join('\n')
    },

    {
      id: 'imp.ac-measure',
      kind: 'implication',
      sources: ['prop.nbv-derivative', 'thm.ac-epsilon-delta'],
      target: 'prop.ac-iff-measure-ac',
      title: 'μ_F ≪ m 的 ε–δ 刻画 ⟹ 函数绝对连续 ⟺ 测度绝对连续',
      proof: [
        '**(⟸)** 设 $$\\mu_F \\ll  m$$。应用测度版绝对连续的 ε–δ 刻画（注意 μ_F 有限，符合前提）：给定 ε > 0 取 δ > 0 使',
        '',
        '$$m(E) < \\delta\\quad  \\implies\\quad  |\\mu_F(E)| < \\varepsilon$$',
        '',
        '现在取有限个两两不交的区间 $$(a_j, b_j) \\subseteq [a, b]$$ 且 $$\\sum(b_j - a_j) < \\delta$$，令 $$E = \\bigsqcup_j (a_j, b_j)$$。则 $$m(E) < \\delta$$，于是',
        '',
        '$$\\sum_j |F(b_j) - F(a_j)| = \\sum_j |\\mu_F((a_j, b_j])| \\le |\\mu_F|(E) < \\varepsilon$$',
        '',
        '这正是函数绝对连续的定义。',
        '',
        '**(⟹)** 设 F 绝对连续，$$E \\in \\mathfrak{B}_\\mathbb{R}$$、$$m(E) = 0$$，要证 $$\\mu_F(E) = 0$$。由 μ_F 的正则性取递减开集列 $$U_1 \\supset  U_2 \\supset  \\cdots \\supseteq E$$ 使 $$m(U_k) < \\delta$$、$$\\bigcap_k U_k = E$$。每个 Uₖ 是区间的可数不交并，把函数绝对连续性的条件用在 Uₖ 的有限截断上，得到 $$|\\mu_F(U_j)| < \\varepsilon$$；再由测度的上连续性（递减列，首项有限）得',
        '',
        '$$|\\mu_F(E)| = lim_j |\\mu_F(U_j)| \\le \\varepsilon$$',
        '',
        '由 ε 任意，$$\\mu_F(E) = 0$$。故 $$\\mu_F \\ll  m$$。∎'
      ].join('\n')
    },

    {
      id: 'imp.ftc',
      kind: 'implication',
      sources: ['lem.ac-subset-bv', 'prop.ac-iff-measure-ac', 'prop.nbv-derivative'],
      target: 'thm.ftc-lebesgue',
      title: '(a) ⟺ (b) ⟺ (c)：微积分基本定理的三条等价',
      proof: [
        '**(a) ⟹ (b)。** 设 F 绝对连续。由**AC ⊆ BV**，F ∈ BV；把它补成 NBV 里的函数（差一个常数与右连续化，不影响导数的积分）。由**绝对连续 ⟺ μ_F ≪ m**，写 Lebesgue 分解时奇异部分 λ = 0，于是 $$d\\mu_F = f\\cdot dm$$，即',
        '',
        '$$F(x) - F(a) = \\int_a^x f(t) dt$$',
        '',
        '取 $$f$$ 就是所要的 L¹ 函数。',
        '',
        '**(b) ⟹ (c)。** 若 $$F(x) - F(a) = \\int_a^x f$$，则由积分的绝对连续性，F 绝对连续（这是直接验证）；而由**微分定理**，$$d / dx\\int_a^x f = f(x)$$ a.e.，故 $$F\' = f$$ a.e.、$$F\' \\in L^1$$，公式成立。',
        '',
        '**(c) ⟹ (a)。** 由 (c)，F 在 a.e. 意义下等于一个积分的原函数；把 $$F(x) - \\int_a^x F\'$$ 这个差记作 G，则 G 绝对连续（(b) ⟹ F 的那一段）且 G′ = 0 a.e.；再由 (b) 的构造（μ_G ≪ m 且密度为 F′ − F′ = 0）得 G ≡ 0。故 F 本身绝对连续。∎',
        '',
        '> ⭐ 最容易错的直觉是「a.e. 可导 + F′ ∈ L¹ 就够」——**Cantor 函数**正是反例：它 a.e. 可导、F′ ≡ 0 ∈ L¹，但 ∫₀¹ F′ = 0 ≠ 1。**绝对连续这一条不能省。**'
      ].join('\n'),
      note: '这条定理是整个「有界变差 / 绝对连续」星团的收官：它把函数侧、积分侧、导数侧三个刻画焊在一起。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.bv-variation',
      kind: 'definition',
      definition: 'def.bounded-variation',
      usedBy: 'prop.bv-examples',
      note: '几个例子都是在算 T_F。'
    },
    {
      id: 'def-link.bv-jordan-lemma',
      kind: 'definition',
      definition: 'def.bounded-variation',
      usedBy: 'lem.variation-monotone',
      note: '引理里的 T_F 就是全变差函数。'
    },
    {
      id: 'def-link.bv-jordan-thm',
      kind: 'definition',
      definition: 'def.bounded-variation',
      usedBy: 'thm.bv-jordan',
      note: '定理的两边都是 BV 这个类。'
    },
    {
      id: 'def-link.bv-regularity-thm',
      kind: 'definition',
      definition: 'def.bounded-variation',
      usedBy: 'prop.bv-regularity',
      note: '正则性命题是在 BV 上说的。'
    },
    {
      id: 'def-link.nbv-lemma',
      kind: 'definition',
      definition: 'def.nbv',
      usedBy: 'lem.nbv-variation',
      note: '引理要为 NBV 服务（T_F 也要落在 NBV 里）。'
    },
    {
      id: 'def-link.bv-nbv-thm',
      kind: 'definition',
      definition: 'def.bounded-variation',
      usedBy: 'thm.borel-measure-nbv',
      note: '对应定理的左边整块都是 BV 的变体。'
    },
    {
      id: 'def-link.measure-nbv-thm',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'thm.borel-measure-nbv',
      note: '另一边是 ℝ 上的复 Borel 测度。'
    },
    {
      id: 'def-link.ac-function-ift',
      kind: 'definition',
      definition: 'def.ac-function',
      usedBy: 'prop.ac-iff-measure-ac',
      note: '这条命题就是要给「绝对连续函数」一个测度论的解释。'
    },
    {
      id: 'def-link.ac-measure-ift',
      kind: 'definition',
      definition: 'def.absolute-continuity',
      usedBy: 'prop.ac-iff-measure-ac',
      note: '同时用到测度版的绝对连续。'
    },
    {
      id: 'def-link.ac-ftc',
      kind: 'definition',
      definition: 'def.ac-function',
      usedBy: 'thm.ftc-lebesgue',
      note: '(a) 就是绝对连续的定义。'
    },
    {
      id: 'def-link.integrable-ftc',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.ftc-lebesgue',
      note: '(b)(c) 里的 f、F′ 都要求在 L¹ 里。'
    },
    {
      id: 'def-link.nbv-ftc',
      kind: 'definition',
      definition: 'def.nbv',
      usedBy: 'cor.integral-is-ac-nbv',
      note: '推论同时落在 NBV 与 AC 的交里。'
    }
  ]
});
