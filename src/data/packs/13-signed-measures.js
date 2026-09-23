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
        '设 $(X, \\mathcal{M})$ 是可测空间。$$\\nu : \\mathcal{M} \\to [-\\infty, +\\infty]$$ 是**符号测度**，当且仅当',
        '',
        '- $$\\nu(\\emptyset) = 0$$；',
        '- $$\\nu$$ **至多取到 $\\pm \\infty$ 中的一个**（不能同时取到 $\\infty$ 与 $-\\infty$）；',
        '- 对两两不交的 $$\\{E_j\\} \\subseteq \\mathcal{M}$$：',
        '',
        '$$\\nu( \\bigsqcup_j E_j ) = \\sum_j \\nu(E_j),\\text{ 且右边的级数绝对收敛}(\\text{当} |\\nu(\\bigsqcup E_j)| < \\infty\\text{ 时})$$'
      ].join('\n'),
      notes: [
        '⚠ 「至多取到一个无穷」这一条是**必需的**：否则可数可加性会碰上 $$\\infty - \\infty$$。',
        '**例 1**：$\\mu _{1}$、$\\mu _{2}$ 是测度，其中至少一个有限 $\\implies$ $$\\nu = \\mu_1 - \\mu_2$$ 是符号测度。',
        '**例 2**：$$f : X \\to [-\\infty, +\\infty]$$ 可测，且 $$\\int f^+ d\\mu$$、$$\\int f^- d\\mu$$ 中至少一个有限 $\\implies$',
        '',
        '$$\\nu(E) := \\int_E f d\\mu$$',
        '',
        '是符号测度。这样的 $f$ 叫**广义可积函数**（extended integrable function）。'
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
        '设 $\\nu$ 是符号测度，$$E \\in \\mathcal{M}$$。',
        '',
        '$E$ 是**正的**：$$\\nu(F) \\ge 0$$ 对一切可测 $$F \\subseteq E$$ 成立；',
        '$E$ 是**负的**：$$\\nu(F) \\le 0$$ 对一切可测 $$F \\subseteq E$$ 成立；',
        '$E$ 是**零的**：$$\\nu(F) = 0$$ 对一切可测 $$F \\subseteq E$$ 成立。'
      ].join('\n'),
      notes: [
        '⚠ 注意「正集」不是「$\\nu (E) > 0$ 的集合」—— 它要求 **$E$ 的每一个可测子集**都非负。',
        '⚠ 与 $\\mu$零集区分：这里的「零集」是关于符号测度 $\\nu$ 说的（$$\\nu(F) = 0$$），不是关于测度 $\\mu$ 的。'
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
        '设 $\\nu$ 是符号测度。',
        '',
        '- 正集的每个可测子集都是正集；',
        '- **可数多个正集之并仍是正集**。'
      ].join('\n'),
      notes: [
        '第一条由定义直接得到。',
        '第二条是 Hahn 分解证明里反复用到的技术步骤：把可数多个正集 $P_1, P_2, \\ldots $ 不交化（$$P_j\' = P_j \\setminus \\bigcup_{i<j} P_i$$，正集之差仍是正集），再用可数可加性逐块验证。'
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
        '设 $\\nu$ 是 $$(X, \\mathcal{M})$$ 上的符号测度。则存在 $$P, N \\in \\mathcal{M}$$ 使',
        '',
        '$$P \\cup N = X, \\quad  P \\cap N = \\emptyset, $$',
        '',
        '其中 **$P$ 是正集、$N$ 是负集**。',
        '',
        '若 $$P\', N\'$$ 是另一对这样的集合，则 $$P \\triangle  P\' = N \\triangle  N\'$$ 是 $\\nu$零集。'
      ].join('\n'),
      notes: [
        '这就是「把空间按符号一刀切开」：$\\nu$ 在 $P$ 上非负、在 $N$ 上非正。',
        '⚠ 「$P \\triangle P\'$ 是零集」只是说分解**在零集意义下唯一** —— 严格说 Hahn 分解并不唯一（可以把零集在 $P$、$N$ 之间随意搬），但一切可测集的 $\\nu$值完全相同。',
        '⭐ 有了它，「符号测度」就完全化归成「两个真测度」—— 这正是下一条 Jordan 分解的内容。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.3', 'Halmos, Measure Theory, §29']
    },

    {
      id: 'def.mutually-singular',
      cluster: 'analysis.signed',
      type: 'definition',
      label: '相互奇异',
      title: '相互奇异 / 互相垂直（Mutually Singular $\\mu \\perp \\nu$）',
      regions: ['analysis'],
      tags: ['定义', '奇异', '垂直'],
      statement: [
        '两个测度（或符号测度）$$\\mu, \\nu$$ **相互奇异**，记作 $$\\mu \\perp  \\nu$$，当且仅当存在 $$E, F \\in \\mathcal{M}$$ 使',
        '',
        '$$E \\cap F = \\emptyset, \\quad  E \\cup F = X, $$',
        '',
        '且 **$E$ 是 $\\mu$零集、$F$ 是 $\\nu$零集**。'
      ].join('\n'),
      notes: [
        '直观：两个测度「住在不相交的地方」—— 空间可以切成两块，一块完全没有 $\\mu$ 的质量，另一块完全没有 $\\nu$ 的质量。',
        '典型例子：Lebesgue 测度与「Dirac 测度 $\\delta _{0}$」相互奇异（取 $E = \\mathbb{R}\\setminus \\{0\\}$，$F = \\{0\\}$）；而任何绝对连续的测度与 Dirac 测度不奇异。',
        '⚠ 与「绝对连续」是一对对偶概念：$$\\nu \\ll  \\mu$$ 说「$\\nu$ 的质量都在 $\\mu$ 给得出质量的地方」，$$\\nu \\perp  \\mu$$ 说「$\\nu$ 的质量都在 $\\mu$ 没有质量的地方」。'
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
        '设 $\\nu$ 是符号测度。则存在**测度** $$\\mu_1, \\mu_2$$ 使',
        '',
        '$$\\nu = \\mu_1 - \\mu_2, \\quad  \\mu_1 \\perp  \\mu_2, $$',
        '',
        '且其中**至少一个是有限的**。这样的分解是唯一的。',
        '',
        '具体地，取 $\\nu$ 的一个 Hahn 分解 $$X = P \\sqcup  N$$，令',
        '',
        '$$\\nu^+ := \\nu(\\cdot \\cap P), \\quad  \\nu^- := -\\nu(\\cdot \\cap N)$$',
        '',
        '则 $$\\nu = \\nu^+ - \\nu^-$$ 且 $$\\nu^+ \\perp  \\nu^-$$。'
      ].join('\n'),
      notes: [
        '**正变差** $$\\nu^+$$、**负变差** $$\\nu^-$$ 都是真测度；两者之和叫**全变差**：',
        '',
        '$$|\\nu| := \\nu^+ + \\nu^-$$',
        '',
        '⭐ 「符号测度」由此被完全拆解：任何符号测度都是一对相互奇异的测度之差。',
        '⚠ 「至少一个有限」对应符号测度定义里那条「至多取到 $\\pm \\infty$ 中的一个」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.4']
    },

    {
      id: 'def.absolute-continuity',
      cluster: 'analysis.signed',
      type: 'definition',
      label: '绝对连续',
      title: '绝对连续（Absolute Continuity $\\nu \\ll \\mu$）',
      regions: ['analysis'],
      tags: ['定义', '绝对连续'],
      statement: [
        '设 $\\mu$ 是 $(X, \\mathcal{M})$ 上的测度、$\\nu$ 是符号测度。称 $\\nu$ **关于 $\\mu$ 绝对连续**，记作',
        '',
        '$$\\nu \\ll  \\mu, $$',
        '',
        '当且仅当**每个 $\\mu$零集都是 $\\nu$零集**：',
        '',
        '$$\\forall E \\in \\mathcal{M}, \\mu(E) = 0 \\implies \\nu(E) = 0$$'
      ].join('\n'),
      notes: [
        '一句话：**$\\mu$ 认为「没有」的地方，$\\nu$ 也必须认为「没有」**。',
        '⚠ 注意这里 $\\mu (E) = 0$ 用的是 $\\mu$（正测度），而 $\\nu (E) = 0$ 用的是符号测度；等价说法是 $$|\\nu|(E) = 0$$。',
        '显然 $$\\mu \\ll  |\\mu|$$ 且 $$|\\mu| \\ll  \\mu$$（对测度 $\\mu$ 自身而言）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.2']
    },

    {
      id: 'prop.ac-and-variations',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: '绝对连续与变差',
      title: '命题：$\\nu \\ll \\mu \\iff |\\nu| \\ll \\mu \\iff \\nu^{+}$、$\\nu^{-} \\ll \\mu$；$\\nu \\perp \\mu$ 且 $\\nu \\ll \\mu \\implies \\nu = 0$',
      regions: ['analysis'],
      tags: ['命题', '绝对连续', '变差', '奇异'],
      statement: [
        '设 $\\mu$ 是测度，$\\nu$ 是符号测度。则',
        '',
        '$$\\nu \\ll  \\mu \\iff |\\nu| \\ll  \\mu \\iff \\nu^+ \\ll  \\mu\\text{ 且} \\nu^- \\ll  \\mu$$',
        '',
        '并且：若同时有 $$\\nu \\perp  \\mu$$ 与 $$\\nu \\ll  \\mu$$，则 $$\\nu = 0$$。'
      ].join('\n'),
      notes: [
        '后半句「既奇异又绝对连续 $\\implies$ 等于零」是结构定理的**起始点**：Radon–Nikodym 要说的正是「一般情形下 $\\nu$ 就是这两部分之和」。',
        '证明：若 $\\nu \\perp \\mu$，取 $E$（$\\mu$零）与 $F$（$\\nu$零）划分空间；由 $\\nu \\ll \\mu$ 得 $\\nu (E) = 0$；又 $\\nu (F) = 0$，故 $\\nu$ 在整个 $X$ 上为 0。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 3.5']
    },

    {
      id: 'thm.ac-epsilon-delta',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: '绝对连续的 ε–δ 刻画',
      title: '定理（有限情形）：$\\nu \\ll \\mu \\iff \\forall\\varepsilon>0 \\exists\\delta>0$ ( $\\mu(E)<\\delta \\implies |\\nu(E)|\\le\\varepsilon$ )',
      regions: ['analysis'],
      tags: ['定理', '绝对连续', 'ε-δ'],
      statement: [
        '设 $\\nu$ 是**有限**符号测度、$\\mu$ 是测度。则',
        '',
        '$$\\nu \\ll  \\mu \\iff \\forall\\varepsilon > 0, \\exists\\delta > 0 : \\mu(E) < \\delta \\implies |\\nu(E)| \\le \\varepsilon$$'
      ].join('\n'),
      notes: [
        '把「零集上为零」升级成了定量的「小测度上小值」—— 这正是绝对连续这个名字里「连续」两个字的来源。',
        '⚠ 「$\\nu$ 有限」不能省：否则 $$\\delta$$ 卡不住（例如 $\\mu = Lebesgue$ 测度、$$\\nu(E) = \\int_E 1/x$$ 这类）。',
        '（$\\Longleftarrow$）方向很直接：$\\mu (E) = 0$ 时对一切 $\\varepsilon$ 都有 $|\\nu (E)| \\le \\varepsilon$，故 $\\nu (E) = 0$。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 3.5']
    },

    {
      id: 'prop.integral-gives-ac',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: '积分给出绝对连续测度',
      title: '命题：$\\nu(E) = \\int_E f d\\mu$ 关于 $\\mu$ 绝对连续',
      regions: ['analysis'],
      tags: ['命题', '绝对连续', '积分'],
      statement: [
        '设 $\\mu$ 是测度，$$f$$ 是广义 $\\mu$可积函数，定义',
        '',
        '$$\\nu(E) := \\int_E f d\\mu$$',
        '',
        '则 $\\nu$ 是符号测度，且 $$\\nu \\ll  \\mu$$。并且',
        '',
        '$$\\nu\\text{ 有限} \\iff f \\in L^1(\\mu)$$'
      ].join('\n'),
      notes: [
        '这是绝对连续测度的**标准来源**，也是 Radon–Nikodym 定理要反过来证明的那件事：**所有**绝对连续的 $\\nu$ 都长这个样子。',
        '记法上常写成微分形式：',
        '',
        '$$\\nu(E) = \\int_E f d\\mu\\quad  \\iff\\quad  d\\nu = f d\\mu$$'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.2']
    },

    {
      id: 'cor.ac-integral-continuity',
      cluster: 'analysis.signed',
      type: 'corollary',
      label: '积分的绝对连续性',
      title: '推论：$\\int_E f d\\mu$ 在小测度集上任意小',
      regions: ['analysis'],
      tags: ['推论', '绝对连续', 'L¹'],
      statement: [
        '设 $$f \\in L^1(\\mu)$$。则',
        '',
        '$$\\forall\\varepsilon > 0, \\exists\\delta > 0 : \\mu(E) < \\delta \\implies | \\int_E f d\\mu | < \\varepsilon$$'
      ].join('\n'),
      notes: '把「积分给出绝对连续测度」与上一条 $\\varepsilon$–$\\delta$ 刻画拼起来即可（注意 $f \\in L^{1} \\implies \\nu (E) = \\int _E f d\\mu$ 是**有限**符号测度，符合前提）。',
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
        '设 $\\nu$、$\\mu$ 都是**有限**测度。则二者必有一个成立：',
        '',
        '- $$\\nu \\perp  \\mu$$；或',
        '- 存在 $$\\varepsilon > 0$$ 与 $$E \\in \\mathcal{M}$$，$$\\mu(E) > 0$$，使 $$\\nu \\ge \\varepsilon \\mu$$ 在 $E$ 上成立（即 $$\\nu(F) \\ge \\varepsilon \\mu(F)$$ 对一切可测 $$F \\subseteq E$$）。'
      ].join('\n'),
      notes: [
        '这是 Radon–Nikodym 证明里的**关键一步**：它提供了一个「往下顶」的 $\\varepsilon$，从而可以造出那个上确界函数 $f$。',
        '证明用的手法很典型：对每个 $n$，取 $$\\nu - n^{-1} \\mu$$ 的一个 Hahn 分解 $$X = P_n \\sqcup  N_n$$。令',
        '',
        '$$P = \\bigcup_n P_n, \\quad  N = \\bigcap_n N_n$$',
        '',
        '$N$ 是每个 $$\\nu - n^{-1}\\mu$$ 的负集，于是 $$0 \\le \\nu(N) \\le n^{-1} \\mu(N)$$ 对一切 $n$ 成立，令 $n \\to \\infty$ 得 $\\nu (N) = 0$。',
        '于是若 $\\mu (P) = 0$，则 $\\nu \\perp \\mu$（取 $E = P$、$F = N$）；若 $\\mu (P) > 0$，则某个 $n$ 有 $\\mu (P_{n}) > 0$，而 $P_{n}$ 是 $$\\nu - n^{-1}\\mu$$ 的正集，即 $\\nu \\ge n^{-1} \\mu$ 在 $P_{n}$ 上成立。∎'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Lemma 3.8']
    },

    {
      id: 'thm.lebesgue-radon-nikodym',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: 'Lebesgue–Radon–Nikodym 定理',
      title: 'Lebesgue–Radon–Nikodym 定理：$\\nu = \\lambda + \\rho$，$\\lambda \\perp \\mu$，$\\rho \\ll \\mu$',
      regions: ['analysis'],
      tags: ['定理', 'Radon-Nikodym', 'Lebesgue 分解'],
      statement: [
        '设 $\\nu$ 是 **$\\sigma$有限**符号测度、$\\mu$ 是 **$\\sigma$有限**正测度，都在 $(X, \\mathcal{M})$ 上。则存在**唯一**的一对 $\\sigma$有限符号测度 $\\lambda$、$\\rho$ 使',
        '',
        '$$\\lambda \\perp  \\mu, \\quad  \\rho \\ll  \\mu, \\quad  \\nu = \\lambda + \\rho$$',
        '',
        '且 $$\\rho$$ 可以写成积分：存在广义 $\\mu$可积函数 $$f$$ 使',
        '',
        '$$d\\rho = f d\\mu$$',
        '',
        '任何两个这样的 $$f$$ 都在 $\\mu -\\text{a.e.}$ 意义下相等。'
      ].join('\n'),
      notes: [
        '⭐ 这是整个符号测度理论的**结构定理**：任何 $\\nu$ 都能唯一拆成「与 $\\mu$ 奇异的部分」+「关于 $\\mu$ 绝对连续的部分」。',
        '特别地，**当 $\\nu \\ll \\mu$ 时**，$$\\lambda = 0$$，于是 $$d\\nu = f d\\mu$$ —— 这就是通常说的 **Radon–Nikodym 定理**。',
        '⚠ $\\sigma$有限不能省（对 $\\nu$ 和 $\\mu$ 都要）。',
        '证明的三步（下一段箭头里展开）：$I. \\nu$、$\\mu$ 有限；II. 用 $\\sigma$有限切成有限块；$III. \\nu$ 是符号测度时分别对 $$\\nu^+, \\nu^-$$ 做。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.8']
    },

    {
      id: 'def.rn-derivative',
      cluster: 'analysis.signed',
      type: 'definition',
      label: 'RN 导数与 Lebesgue 分解',
      title: 'Radon–Nikodym 导数 $d\\nu/d\\mu$ 与 Lebesgue 分解',
      regions: ['analysis'],
      tags: ['定义', 'RN 导数', 'Lebesgue 分解'],
      statement: [
        '设 $$\\nu \\ll  \\mu$$（都是 $\\sigma$有限的）。取定理里的 $$f$$，称',
        '',
        '$$f = \\frac{d\\nu}{d\\mu}$$',
        '',
        '为 $\\nu$ 关于 $\\mu$ 的 **Radon–Nikodym 导数**（注意它定义在「$\\mu$本质相同的函数类」上，不是单个函数）。',
        '',
        '一般的分解 $$\\nu = \\lambda + \\rho$$（$$\\lambda \\perp  \\mu$$，$$\\rho \\ll  \\mu$$）称为 $\\nu$ 关于 $\\mu$ 的 **Lebesgue 分解**。'
      ].join('\n'),
      notes: [
        '记号的用意：$$d\\nu = f d\\mu$$ 看起来就像两个「微分」的商。',
        '⚠ 「$\\mu$本质相同」$= \\mu -\\text{a.e.}$ 相等 —— 这是 RN 导数唯一的**唯一性**内容：它不是一个函数，而是一个等价类。',
        '术语提醒：「Lebesgue 分解」这个名字在两个地方出现 —— 这里指的是 $\\nu$ 拆成奇异部分 + 绝对连续部分。'
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
        '设 $\\nu$ 是 $\\sigma$有限符号测度、$\\mu$ 与 $\\lambda$ 是 $\\sigma$有限测度，且',
        '',
        '$$\\nu \\ll  \\mu, \\quad  \\mu \\ll  \\lambda$$',
        '',
        '**(a)** 若 $$g \\in L^1(\\nu)$$，则 $$g \\frac{d\\nu}{d\\mu} \\in L^1(\\mu)$$，且',
        '',
        '$$\\int g d\\nu = \\int g \\frac{d\\nu}{d\\mu} d\\mu$$',
        '',
        '**(b)** 此时 $$\\nu \\ll  \\lambda$$，且**链式法则**成立：',
        '',
        '$$\\frac{d\\nu}{d\\lambda} = \\frac{d\\nu}{d\\mu} \\cdot \\frac{d\\mu}{d\\lambda}\\quad  (\\lambda-\\text{a.e.})$$'
      ].join('\n'),
      notes: [
        '(a) 就是「换元公式」：把对 $\\nu$ 的积分换成对 $\\mu$ 的积分，代价是乘上 RN 导数。它对指示函数成立、于是对简单函数成立、再用单调收敛到 $L^{+}$、最后到 $L^{1}(\\nu )$。',
        '(b) 的证明用 (a)：对任意可测 $E$，',
        '',
        '$$\\nu(E) = \\int_E \\frac{d\\nu}{d\\mu} d\\mu = \\int_E \\frac{d\\nu}{d\\mu} \\cdot \\frac{d\\mu}{d\\lambda} d\\lambda$$',
        '',
        '两边对照 $$\\nu(E) = \\int_E \\frac{d\\nu}{d\\lambda} d\\lambda$$ 即得（「用积分识别函数」那条命题正是用来做这一步的）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.9']
    },

    {
      id: 'cor.rn-inverse',
      cluster: 'analysis.signed',
      type: 'corollary',
      label: '互为绝对连续时导数互逆',
      title: '推论：$\\mu \\ll \\lambda$ 且 $\\lambda \\ll \\mu \\implies (d\\mu/d\\lambda)(d\\lambda/d\\mu) = 1$',
      regions: ['analysis'],
      tags: ['推论', 'RN 导数'],
      statement: [
        '若 $$\\mu \\ll  \\lambda$$ 且 $$\\lambda \\ll  \\mu$$（两个 $\\sigma$有限测度互为绝对连续），则',
        '',
        '$$\\frac{d\\mu}{d\\lambda} \\cdot \\frac{d\\lambda}{d\\mu} = 1\\quad  \\text{a.e.}$$'
      ].join('\n'),
      notes: '两条链式法则一拼：$$d\\mu / d\\mu = \\frac{d\\mu}{d\\lambda}\\cdot\\frac{d\\lambda}{d\\mu}$$，而 $$d\\mu / d\\mu \\equiv  1$$。',
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
        '可测空间 $(X, \\mathcal{M})$ 上的**复测度**是一个映射',
        '',
        '$$\\nu : \\mathcal{M} \\to \\mathbb{C}$$',
        '',
        '满足',
        '',
        '$$\\nu(\\emptyset) = 0, $$',
        '',
        '且对两两不交的 $$\\{E_j\\} \\subseteq \\mathcal{M}$$：',
        '',
        '$$\\nu( \\bigsqcup_j E_j ) = \\sum_j \\nu(E_j),\\text{ 右边的级数绝对收敛}$$'
      ].join('\n'),
      notes: [
        '⚠ 与符号测度相比，复测度**自动有限**（取值在 $\\mathbb{C}$ 里，不涉及 $\\pm \\infty$），而且可数可加性里的那个级数**自动绝对收敛**。',
        '所以在复测度的世界里，「有限性」「重排问题」这些麻烦全部消失 —— 代价是不能再有「无穷质量」的例子。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §3.3']
    },

    {
      id: 'thm.rn-complex',
      cluster: 'analysis.signed',
      type: 'theorem',
      label: '复测度的 Radon–Nikodym',
      title: '定理：复测度的 $\\nu = \\lambda + f d\\mu$ 分解',
      regions: ['analysis'],
      tags: ['定理', 'Radon-Nikodym', '复测度'],
      statement: [
        '设 $\\nu$ 是复测度、$\\mu$ 是 **$\\sigma$有限**测度。则存在复测度 $\\lambda$ 与 $$f \\in L^1(\\mu)$$ 使',
        '',
        '$$d\\nu = d\\lambda + f d\\mu, \\quad  \\lambda \\perp  \\mu, $$',
        '',
        '且在 a.e. 意义下唯一。'
      ].join('\n'),
      notes: [
        '复测度可以拆成实部与虚部、各自再用符号测度的版本 —— 这是把上一套结论搬到复情形的标准做法。',
        '⚠ 这里 $$f \\in L^1(\\mu)$$ 而不再是「广义可积」：因为复测度有限，$$f$$ 必须真可积。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 3.11']
    },

    {
      id: 'prop.total-variation-basics',
      cluster: 'analysis.signed',
      type: 'proposition',
      label: '全变差的基本性质',
      title: '命题：$|\\nu(E)| \\le |\\nu|(E)$，且 $d|\\nu| = |f| d\\mu$',
      regions: ['analysis'],
      tags: ['命题', '全变差', '复测度'],
      statement: [
        '设 $\\nu$ 是复测度（或符号测度），$$|\\nu|$$ 是它的全变差。则',
        '',
        '**(a)** $$|\\nu(E)| \\le |\\nu|(E)$$ 对一切 $$E \\in \\mathcal{M}$$ 成立；',
        '',
        '**(b)** 若 $$d\\nu = f d\\mu$$（即 $\\nu \\ll \\mu$）则 $$d|\\nu| = |f| d\\mu$$，即',
        '',
        '$$|\\nu|(E) = \\int_E |f| d\\mu$$'
      ].join('\n'),
      notes: [
        '(b) 的证法：先取 $$\\rho = |\\nu_1| + |\\nu_2|$$ 把 $\\nu$ 的两个不同表示拉到一个共同的「基准测度」上，再用 Radon–Nikodym 与链式法则把两个密度都换到 $\\rho$ 上。于是要证的就是',
        '',
        '$$|f_1| \\frac{d\\mu_1}{d\\rho} = |f_2| \\frac{d\\mu_2}{d\\rho}\\quad  \\rho-\\text{a.e.}$$',
        '',
        '从而 $$|f_1| d\\mu_1 = |f_2| d\\mu_2$$ —— 说明全变差的密度与「用哪个 $\\mu$ 表示 $\\nu$」无关。',
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
      title: '符号测度 + 正集的封闭性 $\\implies$ Hahn 分解',
      proof: [
        '**① 先把 $\\nu$ 的无穷值甩掉。** 不妨设 $\\nu$ 不取 $\\infty$（若 $\\nu$ 不取 $-\\infty$ 就改证 $-\\nu$）。于是 $$\\nu(X) < \\infty$$ 中的「上方」是安全的。',
        '',
        '**② 挑一个「最大的正集」。** 令',
        '',
        '$$m := \\sup\\{ \\nu(E) : E\\text{ 是正集} \\}, $$',
        '',
        '则 $$m < \\infty$$（因为 $\\nu$ 不取 $\\infty$ 而 $\\nu (E) \\le \\nu (X)$ 型估计受控）。取一列正集 $$\\{P_j\\}$$ 使 $$\\nu(P_j) \\to m$$，令',
        '',
        '$$P = \\bigcup_j P_j$$',
        '',
        '由正集的可数并仍是正集，$P$ 是正集；且 $$\\nu(P) = m$$（正集的不交化 + 可数可加）。',
        '',
        '**③ 断言 $N = X \\setminus P$ 是负集。** 反设 $N$ 不含负集，即 $N$ 不是负的。要证它会挤出一个比 $m$ 更大的正集。',
        '',
        '**④ 在 $N$ 里挖出正集。** 若 $N$ 不是负集，则存在可测 $$A \\subseteq N$$ 使 $$\\nu(A) > 0$$。「$A$ 是正的」就到此结束；否则存在 $$A_1 \\subseteq A$$ 使 $$\\nu(A_1) < 0$$。取**最小的自然数** $$n$$ 使',
        '',
        '$$\\nu(A_1) < -1/n$$',
        '',
        '（$n_1$ 取「使存在负测度集 $\\le -1/n_{1}$ 的最小 $n$」。**取最小**这一步是关键 —— 它保证后面能取极限。）',
        '',
        '再在 $$A \\setminus A_1$$ 里重复同样的操作，得到 $$A_2, \\ldots $$',
        '',
        '**⑤ 若操作终止**，剩下的 $$B = A \\setminus \\bigcup_k A_k$$ 就是正集（因为已经没有负子集可以挖了）。',
        '**⑥ 若操作不终止**，取 $$B = A \\setminus \\bigcup_k A_k$$。由可数可加性',
        '',
        '$$\\nu(A) = \\nu(B) + \\sum_k \\nu(A_k)$$',
        '',
        '而 $$\\sum_k |\\nu(A_k)| < \\infty$$（因为左边有限），特别地 $$\\nu(A_k) \\to 0$$，这迫使 $$n_k \\to \\infty$$，从而对任意 $$F \\subseteq B$$：若 $$\\nu(F) < -1/n_{k-1}$$，就与 $$n_k$$ 的**最小性**矛盾。于是 $$\\nu(F) \\ge -1/n_{k-1}$$ 对一切 $k$ 成立，令 $k \\to \\infty$ 得 $$\\nu(F) \\ge 0$$。故 $B$ 也是正集。',
        '',
        '**⑦ 矛盾。** 由 ⑤⑥，$A$ 中含正集 $B$。于',
        '',
        '$$\\nu(B) = \\nu(A) - \\sum_k \\nu(A_k) > 0$$',
        '',
        '说明 $$P \\cup B$$ 是正集且 $$\\nu(P \\cup B) = m + \\nu(B) > m$$，与 $m$ 的定义矛盾。故 $N$ 必为负集，$$X = P \\sqcup  N$$ 就是 Hahn 分解，**存在性得证**。',
        '',
        '**⑧ 唯一性。** 设 $$P\' \\sqcup  N\'$$ 是另一对。则 $$P \\setminus P\' \\subseteq P$$（正集）且 $$\\subseteq N\'$$（负集），所以它既是正集又是负集 —— 只能是零集；同理 $$P\' \\setminus P$$ 也是零集。故 $$P \\triangle  P\' = N \\triangle  N\'$$ 是 $\\nu$零集。∎'
      ].join('\n'),
      note: '⭐ 「取最小的 $n$」是整段证明的技术核心：因为 $n$ 取最小，后面才能让 $$\\nu(F) \\ge -1/n_{k-1}$$ 一路通过 $k \\to \\infty$ 得到 $$\\nu(F) \\ge 0$$。'
    },

    {
      id: 'imp.jordan',
      kind: 'implication',
      sources: ['thm.hahn-decomposition'],
      target: 'thm.jordan-decomposition',
      title: 'Hahn 分解 $\\implies$ Jordan 分解',
      proof: [
        '取 $\\nu$ 的一个 Hahn 分解 $$X = P \\sqcup  N$$（$P$ 正、$N$ 负）。定义',
        '',
        '$$\\nu^+(E) := \\nu(E \\cap P), \\quad  \\nu^-(E) := -\\nu(E \\cap N)$$',
        '',
        '**① 它们都是测度。** 对 $\\nu ^{+}$：$$\\nu^+(\\emptyset) = \\nu(\\emptyset) = 0$$；对不交的 $$\\{E_j\\}$$，',
        '',
        '$$\\nu^+( \\bigsqcup_j E_j ) = \\nu( \\bigsqcup_j (E_j \\cap P) ) = \\sum_j \\nu(E_j \\cap P) = \\sum_j \\nu^+(E_j)$$',
        '',
        '（右边的每一项都 $\\ge 0$，因为 $$E_j \\cap P$$ 是正集的子集。）$\\nu ^{-}$ 同理。',
        '',
        '**② $\\nu = \\nu ^{+} - \\nu ^{-}$。** 对任意 $E$，',
        '',
        '$$\\nu(E) = \\nu(E \\cap P) + \\nu(E \\cap N) = \\nu^+(E) - \\nu^-(E)$$',
        '',
        '**③ $\\nu ^{+} \\perp \\nu ^{-}$。** 取 $$E = P$$、$$F = N$$：$P$ 是 $\\nu ^{-}$零集（$\\nu ^{-}(P) = -\\nu (P \\cap N) = 0$），$N$ 是 $\\nu ^{+}$零集。',
        '',
        '**④ 至少一个有限。** 由符号测度的定义，$\\nu$ 至多取到 $\\pm \\infty$ 中的一个：若 $\\nu$ 不取 $\\infty$ 则 $\\nu ^{+}$ 有限，若 $\\nu$ 不取 $-\\infty$ 则 $\\nu ^{-}$ 有限。',
        '',
        '**⑤ 唯一性。** 设 $$\\nu = \\mu_1 - \\mu_2$$ 也是这种分解（$$\\mu_1 \\perp  \\mu_2$$）。取见证奇异性的划分 $$X = E \\sqcup  F$$（$E$ 是 $\\mu _{1}$零集、$F$ 是 $\\mu _{2}$零集）。由 Hahn 分解的唯一性只能差一个零集，逐块比较即可得到 $$\\mu_1 = \\nu^+$$、$$\\mu_2 = \\nu^-$$。∎'
      ].join('\n')
    },

    {
      id: 'imp.ac-epsilon-delta',
      kind: 'implication',
      sources: ['def.absolute-continuity'],
      target: 'thm.ac-epsilon-delta',
      title: '绝对连续 $\\implies \\varepsilon$–$\\delta$ 刻画（$\\nu$ 有限时）',
      proof: [
        '设 $\\nu$ 有限且 $$\\nu \\ll  \\mu$$。由「绝对连续与变差」那条命题，可以**不妨设 $\\nu$ 本身就是正测度**（换成 $|\\nu |$ 不影响结论）。',
        '',
        '**$(\\Longleftarrow )$** 若 $\\mu (E) = 0$，则对任意 $\\varepsilon > 0$ 有 $\\mu (E) < \\delta$，于是 $|\\nu (E)| \\le \\varepsilon$；令 $\\varepsilon \\to 0$ 得 $\\nu (E) = 0$。',
        '',
        '**$(\\implies )$ 反证。** 设存在 $\\varepsilon > 0$，使对**一切** $n$ 都能找到 $$E_n \\in \\mathcal{M}$$ 满足',
        '',
        '$$\\mu(E_n) < 2^{-n}, \\quad  \\nu(E_n) \\ge \\varepsilon$$',
        '',
        '令',
        '',
        '$$F_k = \\bigcup_{n \\ge k} E_n, \\quad  F = \\bigcap_k F_k$$',
        '',
        '则 $$\\mu(F_k) \\le \\sum_{n\\ge k} 2^{-n} = 2^{1-k} \\to 0$$，由 $\\mu$ 的下连续性与递减性得 $$\\mu(F) = 0$$。',
        '',
        '另一方面 $$\\nu(F_k) \\ge \\nu(E_k) \\ge \\varepsilon$$ 对一切 $k$ 成立；由 $\\nu$ 有限与测度的下连续性（$$F_k \\searrow  F$$，首项有限）得',
        '',
        '$$\\nu(F) = \\lim_k \\nu(F_k) \\ge \\varepsilon > 0$$',
        '',
        '这与 $$\\nu \\ll  \\mu$$（$\\mu (F) = 0$ 应推出 $\\nu (F) = 0$）矛盾。故这样的 $\\varepsilon$ 不存在，即对每个 $\\varepsilon > 0$ 都有对应的 $\\delta$。∎',
        '',
        '$>$ ⭐ 反证里那个「对一切 $n$ 都能找到」是取出的关键：它把「不连续」翻译成了一列越来越小的坏集合，再用 Borel–Cantelli 型的尾并把它们压成零集。'
      ].join('\n')
    },

    {
      id: 'imp.lebesgue-rn',
      kind: 'implication',
      sources: ['lem.singular-or-lower-bound', 'thm.mct', 'prop.ac-and-variations'],
      target: 'thm.lebesgue-radon-nikodym',
      title: '「要么奇异、要么有下界」$\\implies$ Lebesgue–Radon–Nikodym',
      proof: [
        '**I. 先设 $\\nu$、$\\mu$ 都有限，且 $\\nu \\ge 0$。**',
        '',
        '**① 造候选函数集。** 令',
        '',
        '$$\\mathcal{F} := \\{ f : X \\to [0, +\\infty] : \\int_E f d\\mu \\le \\nu(E)\\quad  \\forall E \\in \\mathcal{M} \\}$$',
        '',
        '则 $$0 \\in \\mathcal{F}$$，且 $\\mathcal{F}$ 对**取大**封闭：若 $f, g \\in \\mathcal{F}$，令 $$A = \\{f > g\\}$$、$$h = \\max_{f, g}$$，则对任意 $E$，',
        '',
        '$$\\int_E h d\\mu = \\int_{E\\cap A} f d\\mu + \\int_{E\\setminus A} g d\\mu \\le \\nu(E\\cap A) + \\nu(E\\setminus A) = \\nu(E)$$',
        '',
        '故 $h \\in \\mathcal{F}$。',
        '',
        '**② 取上确界。** 令 $$a := \\sup\\{ \\int f d\\mu : f \\in \\mathcal{F} \\} \\le \\nu(X) < \\infty$$（这一步用到 $\\nu$ 有限）。取 $$\\{f_n\\} \\subseteq \\mathcal{F}$$ 使 $$\\int f_n d\\mu \\to a$$，令',
        '',
        '$$g_n = \\max_{f_1, \\ldots , f_n}, \\quad  f = \\sup_n f_n$$',
        '',
        '由 ① 每个 $$g_n \\in \\mathcal{F}$$，且 $$g_n \\uparrow  f$$、$$\\int g_n d\\mu \\ge \\int f_n d\\mu$$，故 $$\\lim_n \\int g_n d\\mu = a$$。由 **MCT**，$$f \\in \\mathcal{F}$$ 且 $$\\int f d\\mu = a$$。',
        '',
        '**③ 断言 $$d\\lambda := d\\nu - f d\\mu$$ 与 $\\mu$ 奇异。** 反设不然，由**引理**，存在 $\\varepsilon > 0$ 与 $$E \\in \\mathcal{M}$$、$\\mu (E) > 0$，使 $$\\lambda \\ge \\varepsilon\\mu$$ 在 $E$ 上成立，即',
        '',
        '$$\\varepsilon \\chi_E d\\mu \\le d\\nu - f d\\mu\\quad  \\implies\\quad  (f + \\varepsilon \\chi_E) d\\mu \\le d\\nu$$',
        '',
        '于是 $$f + \\varepsilon \\chi_E \\in \\mathcal{F}$$，但',
        '',
        '$$\\int (f + \\varepsilon \\chi_E) d\\mu = a + \\varepsilon\\cdot\\mu(E) > a$$',
        '',
        '与 $a$ 的**上确界**性矛盾。故 $\\lambda \\perp \\mu$，$$\\nu = \\lambda + (f d\\mu)$$ 就是所要的分解。',
        '',
        '**④ 唯一性。** 设 $$d\\nu = d\\lambda\' + f\' d\\mu$$ 是另一种分解。则',
        '',
        '$$d\\lambda - d\\lambda\' = (f\' - f) d\\mu$$',
        '',
        '左边与 $\\mu$ 奇异（两个各与 $\\mu$ 奇异的测度之差仍与 $\\mu$ 奇异），右边关于 $\\mu$ 绝对连续。由「既奇异又绝对连续 $\\implies$ 等于零」，两边都是 0，即 $$\\lambda = \\lambda\'$$ 且 $$f = f\'$$ $\\mu -\\text{a.e.}$。',
        '',
        '**II. 推广到 $\\sigma$有限。** 取 $$X = \\bigcup_j A_j$$（$$\\mu(A_j) < \\infty$$、$$\\nu(A_j) < \\infty$$）。令',
        '',
        '$$\\mu_j(E) := \\mu(E \\cap A_j), \\quad  \\nu_j(E) := \\nu(E \\cap A_j)$$',
        '',
        '对每一对 $$(\\mu_j, \\nu_j)$$ 用 $I$，得 $$d\\nu_j = d\\lambda_j + f_j d\\mu_j$$。规定 $$\\lambda_j(A_j^c) = 0$$、$$f_j = 0$$ 在 $$A_j^c$$ 上，令',
        '',
        '$$\\lambda := \\sum_j \\lambda_j, \\quad  f := \\sum_j f_j$$',
        '',
        '则 $$d\\nu = d\\lambda + f d\\mu$$、$$\\lambda \\perp  \\mu$$，且 $d\\lambda$、$f d\\mu$ 都 $\\sigma$有限。',
        '',
        '**$III. \\nu$ 是符号测度。** 把 $I$、II 分别用在 $$\\nu^+$$ 与 $$\\nu^-$$ 上（由「绝对连续与变差」，绝对连续性对变差是逐块的），再把结果相加。∎'
      ].join('\n'),
      note: '⭐ ③ 那一步是全证明的枢纽：假如 $\\lambda$ 还「留了一点 $\\mu$质量」，就能拿它把 $f$ 往上顶一点、得出比上确界 $a$ 更大的值 —— 于是 $\\lambda$ 只能全部跑到 $\\mu$ 看不到的地方去，即 $\\lambda \\perp \\mu$。'
    },

    {
      id: 'imp.rn-chain-rule',
      kind: 'implication',
      sources: ['prop.integral-gives-ac', 'prop.integrals-equal-iff'],
      target: 'prop.rn-chain-rule',
      title: '换元公式与链式法则',
      proof: [
        '设 $$\\nu \\ll  \\mu \\ll  \\lambda$$。',
        '',
        '**(a) 换元公式 $$\\int g d\\nu = \\int g \\frac{d\\nu}{d\\mu} d\\mu$$。** 分四步爬：',
        '',
        '$\\cdot$ $$g = \\chi_E$$：左边是 $$\\nu(E) = \\int_E \\frac{d\\nu}{d\\mu} d\\mu$$（这正是 RN 定理的内容），右边同；',
        '$\\cdot g$ 是简单函数：由线性；',
        '$\\cdot$ $$g \\in L^+$$：取简单函数列 $$g_n \\uparrow  g$$，两边各用一次 MCT；',
        '$\\cdot$ $$g \\in L^1(\\nu)$$：拆正负部。',
        '',
        '**(b) 链式法则。** 对任意可测 $E$，用 (a) 两次：',
        '',
        '$$\\nu(E) = \\int_E \\frac{d\\nu}{d\\mu} d\\mu = \\int_E \\frac{d\\nu}{d\\mu} \\cdot \\frac{d\\mu}{d\\lambda} d\\lambda$$',
        '',
        '另一方面又有 $$\\nu(E) = \\int_E \\frac{d\\nu}{d\\lambda} d\\lambda$$（因为 $\\nu \\ll \\lambda$）。两式对**一切** $E$ 相等，由「用积分识别函数」，两个密度 $\\lambda -\\text{a.e.}$ 相等：',
        '',
        '$$\\frac{d\\nu}{d\\lambda} = \\frac{d\\nu}{d\\mu} \\cdot \\frac{d\\mu}{d\\lambda}\\quad  \\lambda-\\text{a.e.}$$',
        '',
        '∎'
      ].join('\n')
    },

    {
      id: 'imp.integral-ac-continuity',
      kind: 'implication',
      sources: ['prop.integral-gives-ac'],
      target: 'cor.ac-integral-continuity',
      title: '积分给出绝对连续测度 $\\implies$ 积分的绝对连续性',
      proof: '把「积分给出绝对连续测度」与绝对连续的 $\\varepsilon$–$\\delta$ 刻画拼起来即可：$\\mu(E) < \\delta \\implies \\nu(E) = \\int_E f \\, d\\mu < \\varepsilon$。∎'
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
      note: '$\\nu ^{+}$、$\\nu ^{-}$ 的造法直接来自 Hahn 分解的那个划分。'
    },
    {
      id: 'def-link.singular-jordan',
      kind: 'definition',
      definition: 'def.mutually-singular',
      usedBy: 'thm.jordan-decomposition',
      note: 'Jordan 分解里那个 $\\nu ^{+} \\perp \\nu ^{-}$ 用的就是相互奇异。'
    },
    {
      id: 'def-link.measure-ac',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'def.absolute-continuity',
      note: '绝对连续里被参照的 $\\mu$ 是一个真测度。'
    },
    {
      id: 'def-link.variations-ac',
      kind: 'definition',
      definition: 'thm.jordan-decomposition',
      usedBy: 'prop.ac-and-variations',
      note: '命题是用 $\\nu ^{+}$、$\\nu ^{-}$ 把绝对连续性拆成两半说的。'
    },
    {
      id: 'def-link.ac-lemma',
      kind: 'definition',
      definition: 'def.absolute-continuity',
      usedBy: 'lem.singular-or-lower-bound',
      note: '引理出场的目的是为 RN 定理准备「$\\varepsilon$ 下界」。'
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
      note: '$L$–$R$–$N$ 里那个 $\\rho \\ll \\mu$ 就是绝对连续。'
    },
    {
      id: 'def-link.singular-rn',
      kind: 'definition',
      definition: 'def.mutually-singular',
      usedBy: 'thm.lebesgue-radon-nikodym',
      note: '同时用到「与 $\\mu$ 奇异」那一半。'
    },
    {
      id: 'def-link.integral-ac',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.integral-gives-ac',
      note: '「$\\nu$ 有限 $\\iff f \\in L^{1}(\\mu )$」用到可积的定义。'
    },
    {
      id: 'def-link.complex-rn',
      kind: 'definition',
      definition: 'def.complex-measure',
      usedBy: 'thm.rn-complex',
      note: '这条定理就是复测度版本的 $L$–$R$–$N$。'
    },
    {
      id: 'def-link.integrable-complex-rn',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.rn-complex',
      note: '复情形下密度必须是 $L^{1}$ 的。'
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
