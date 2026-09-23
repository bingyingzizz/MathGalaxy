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
        '设 $\\mathcal{M}$ 是 $X$ 上的 $\\sigma$代数。函数 $$\\mu : \\mathcal{M} \\to [0, +\\infty]$$ 是一个**测度**，当且仅当',
        '',
        '- **(i)**　$$\\mu(\\emptyset) = 0$$',
        '- **(ii) 可数可加**：若 $\\{E_{j}\\}$ 是 $\\mathcal{M}$ 中两两不交的集合列，则',
        '',
        '$$\\mu( \\bigcup_{j=1}^{\\infty} E_j ) = \\sum_{j=1}^{\\infty} \\mu(E_j)$$',
        '',
        '$(X, \\mathcal{M}, \\mu )$ 称为**测度空间**。'
      ].join('\n'),
      notes: [
        '(i) 看起来多余（由 (ii) 取 $E_{j} = \\emptyset$ 立刻得到），写出来是为了排除「恒取 $\\infty$」这种没有意义的解，同时保证 (ii) 中的级数不是 $\\infty - \\infty$。',
        '**可数可加是本定义唯一有实质内容的要求**：它把「大小」从有限可加提升到可数可加，代价是允许取值为 $\\infty$。',
        '⚠ 允许 $\\mu (E) = +\\infty$ 是必要的：$\\mathbb{R}$ 的 Lebesgue 测度就是 $\\infty$。'
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
        '若 $\\mathcal{M}$ 只是一个**环**（不必是 $\\sigma$代数），而 $$\\mu : \\mathcal{M} \\to [0, +\\infty]$$ 仍满足测度的两条：',
        '',
        '$$\\mu(\\emptyset) = 0, \\quad  \\{E_j\\}\\text{ 两两不交} \\implies \\mu(\\bigcup E_j) = \\sum \\mu(E_j)$$',
        '',
        '则称 $\\mu$ 是 $\\mathcal{M}$ 上的**预测度**。'
      ].join('\n'),
      notes: [
        '为什么要有这个中间概念：$\\mathbb{R}$ 上半开区间 (a, b] 的全体只是一个基本类，它的有限不交并构成一个环，还不是 $\\sigma$代数 —— 但这时已经能定义长度了，那就是预测度。',
        'Carathéodory 扩张定理的作用就是把预测度从环一路提升到生成的 $\\sigma$代数上。所以「**先造预测度，再扩张**」是构造测度的标准两步走。'
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
        '若 $\\mu$ 只满足 (i) 与**有限**可加性：',
        '',
        '$$A, B \\in \\mathcal{M}\\text{ 两两不交} \\implies \\mu(A \\cup B) = \\mu(A) + \\mu(B)$$',
        '（由归纳，可推到任意有限多个不交集合），',
        '',
        '则 $\\mu$ 称为**有限可加测度**。'
      ].join('\n'),
      notes: [
        '它比预测度还弱：预测度是可数可加的（只是定义域是环），有限可加测度只要求有限可加。',
        '⚠ 有限可加 $\\ne$ 可数可加：在 $\\mathbb{N}$ 上定义 $\\mu (E) = 0$（$E$ 有限）、$\\mu (E) = +\\infty$（$E$ 无限），它是有限可加的，但对 $\\bigcup _{n} \\{n\\} = \\mathbb{N}$ 不满足可数可加。历史上（Banach–Tarski 时代）确实认真考虑过只用有限可加性的「测度」，但那样连「长度」都构造不出来。'
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
        '设 $(X, \\mathcal{M}, \\mu )$ 是测度空间。',
        '',
        '- **有限**：$$\\mu(X) < \\infty$$',
        '- **$\\sigma$有限**：$X$ 能写成可数个测度有限的集合之并：$$X = \\bigcup_{j=1}^{\\infty} E_j, \\quad  \\mu(E_j) < \\infty$$',
        '- **半有限**：每个无穷测度的集合里都藏着正有限测度的子集：',
        '',
        '$$\\forall E \\in \\mathcal{M}, \\mu(E) = \\infty \\implies \\exists F \\subseteq E, F \\in \\mathcal{M}, 0 < \\mu(F) < \\infty$$'
      ].join('\n'),
      notes: [
        '$\\text{有限} \\implies \\sigma-\\text{有限} \\implies\\text{ 半有限}$，两个箭头都不可逆。',
        '$\\sigma$有限是**最常用的技术假设**：$\\mathbb{R}$ 上的 Lebesgue 测度 $\\sigma$有限（$\\mathbb{R} = \\bigcup _{n} [-n, n]$），而计数测度在 $\\mathbb{R}$ 上不是 $\\sigma$有限的。很多定理（Fubini、Radon–Nikodym、Carathéodory 扩张的唯一性）都要 $\\sigma$有限。',
        '半有限比 $\\sigma$有限弱得多：可以造出「每个可测集要么零测度、要么无穷测度」的测度，它就是半有限的极端反例。'
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
        '设 $(X, \\mathcal{M}, \\mu )$ 是测度空间，以下集合都取自 $\\mathcal{M}$。',
        '',
        '- **(a) 单调**：$$E \\subseteq F \\implies \\mu(E) \\le \\mu(F)$$',
        '- **(b) 次可加**：$$\\mu( \\bigcup_j E_j ) \\le \\sum_j \\mu(E_j)$$（不要求不交）',
        '- **(c) 下连续**：$$E_1 \\subseteq E_2 \\subseteq \\cdots \\implies \\mu( \\bigcup_j E_j ) = \\lim_{j\\to\\infty} \\mu(E_j)$$',
        '- **(d) 上连续**：$$\\mu(E_1) < \\infty, \\quad  E_1 \\supseteq E_2 \\supseteq \\cdots \\implies \\mu( \\bigcap_j E_j ) = \\lim_{j\\to\\infty} \\mu(E_j)$$'
      ].join('\n'),
      notes: [
        '(a)：把 $F$ 拆成 $F = E \\cup (F \\setminus E)$ 用可数可加（把余下的位置补 $\\emptyset$）。',
        '(b)：把 $\\bigcup E_{j}$ 改成不交并：$F_{j} = E_{j} \\setminus (E_{1} \\cup \\cdots \\cup E_\\{j-1\\})$，则 $\\mu (\\bigcup E_{j}) = \\sum \\mu (F_{j}) \\le \\sum \\mu (E_{j})$。',
        '(c)：令 $A_{j} = E_{j} \\setminus E_\\{j-1\\}$（$E_{0} = \\emptyset$），则 $\\bigcup E_{j}$ 是 $A_{j}$ 的不交并，而 $\\mu (E_{n}) = \\sum _\\{j\\le n\\} \\mu (A_{j})$ —— 两边取极限即可。',
        '(d)：**「$\\mu (E_{1}) < \\infty$」不能省。** 反例：$X = \\mathbb{N}$，$\\mu =$ 计数测度，$E_{j} = \\{j, j+1$ …}，则每个 $\\mu (E_{j}) = \\infty$ 但交集为 $\\emptyset$、$\\mu (\\emptyset ) = 0$。',
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
        '设 $(X, \\mathcal{M}, \\mu )$ 是测度空间，$E \\in \\mathcal{M}$。',
        '',
        '若 $$\\mu(E) = 0$$，则称 $E$ 是 **$\\mu$零集**（$\\mu -null set$）。',
        '',
        '若**零集的每个子集都可测**：',
        '',
        '$$\\forall E \\in \\mathcal{M}, \\forall F \\subseteq E : \\mu(E) = 0 \\implies F \\in \\mathcal{M}$$',
        '',
        '则称 $\\mu$（或这个测度空间）**完备**。'
      ].join('\n'),
      notes: [
        '完备性说的是「零集的子集也是可测集」。这条**不是**自动成立的：$Borel \\sigma$代数配上 Lebesgue 测度就不完备 —— Cantor 集是 Borel 集且测度为 0，它的某些子集不是 Borel 集。',
        '所以常见做法是先把 Borel 测度**完备化**（见下一条定理），得到 $Lebesgue \\sigma$代数。'
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
        '设 $(X, \\mathcal{M}, \\mu )$ 是测度空间。令',
        '',
        '$$\\mathcal{N} = \\{ N \\in \\mathcal{M} : \\mu(N) = 0 \\}$$',
        '',
        '$$\\bar{\\mathcal{M}} = \\{ E \\cup F : E \\in \\mathcal{M},\\ F \\subseteq N,\\ N \\in \\mathcal{N} \\}$$',
        '',
        '则',
        '',
        '1. $\\bar{\\mathcal{M}}$ 是一个 $\\sigma$代数，且 $\\mathcal{M} \\subseteq \\bar{\\mathcal{M}}$；',
        '2. 令 $$\\bar{\\mu}(E \\cup F) := \\mu(E)$$，它是 $\\bar{\\mathcal{M}}$ 上良定义的测度；',
        '3. $$(X, \\bar{\\mathcal{M}}, \\bar{\\mu})$$ 是**完备**测度空间，称为 $(X, \\mathcal{M}, \\mu )$ 的**完备化**。'
      ].join('\n'),
      notes: [
        '$\\bar{\\mathcal{M}}$ 的直观：在原来的可测集上「撒一点零集的小碎片」。',
        '**良定义是要检查的**：$E \\cup F$ 的写法不唯一，若 $E_{1} \\cup F_{1} = E_{2} \\cup F_{2}$，要证明 $\\mu (E_{1}) = \\mu (E_{2})$。做法是用 $E_{1} \\subseteq E_{2} \\cup N_{2}$（$N_{2}$ 零集）得 $\\mu (E_{1}) \\le \\mu (E_{2})$，反向同理。',
        '⚠ 完备化是「把零集的子集塞进来」，代价是 $\\sigma$代数变大、测度不变。'
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
        '设 $(X, \\mathcal{M}, \\mu )$ 是测度空间。定义',
        '',
        '$$\\mu_0(E) := \\sup \\{ \\mu(F) : F \\subseteq E, F \\in \\mathcal{M}, \\mu(F) < \\infty \\}$$',
        '',
        '则 $\\mu _{0}$ 称为 $\\mu$ 的**半有限部分**，它是一个半有限测度，且 $\\mu _{0} \\le \\mu$。'
      ].join('\n'),
      notes: [
        '它的作用：把一个「可能有很坏的无穷值」的测度修成半有限的，同时尽量保留原来的有限部分。',
        '若 $\\mu$ 本身半有限，则 $\\mu _{0} = \\mu$ —— 所以这是「半有限化」操作。'
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
        '设 $X$ 是非空集合。函数 $$\\mu^* : \\mathcal{P}(X) \\to [0, +\\infty]$$ 是一个**外测度**，当且仅当',
        '',
        '- $$\\mu^*(\\emptyset) = 0$$',
        '- **单调**：$$A \\subseteq B \\implies \\mu^*(A) \\le \\mu^*(B)$$',
        '- **可数次可加**：$$\\mu^*( \\bigcup_{j=1}^{\\infty} A_j ) \\le \\sum_{j=1}^{\\infty} \\mu^*(A_j)$$'
      ].join('\n'),
      notes: [
        '外测度定义在**全体**子集上（$\\mathcal{P}(X)$，不是某个 $\\sigma$代数），代价是它只有**次**可加性。',
        '所以外测度不是测度 —— 它太大了，连 $\\mathcal{P}(X)$ 上都没有可加性。Carathéodory 的想法是在其中挑出一批「表现良好」的集合（下一条定义），外测度在它们上面才变成真正的测度。',
        'Lebesgue 最初构造的就是外测度：$\\mu^{*}(A) = \\inf\\{ \\sum (b_{n} - a_{n}) : A \\subseteq \\bigcup (a_{n}, b_{n}) \\}$。'
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
        '设 $\\mathcal{E} \\subseteq \\mathcal{P}(X)$，$\\emptyset \\in \\mathcal{E}$，$X \\in \\mathcal{E}$，$\\rho : \\mathcal{E} \\to [0, +\\infty ]$ 满足 $\\rho (\\emptyset ) = 0$。对 $A \\subseteq X$ 定义',
        '',
        '$$\\mu^*(A) := \\inf \\{ \\sum_{j=1}^{\\infty} \\rho(E_j) : E_j \\in \\mathcal{E}, A \\subseteq \\bigcup_{j=1}^{\\infty} E_j \\}$$',
        '',
        '（用 $\\mathcal{E}$ 中可数个集合覆盖 $A$，取下确界。）则 $\\mu^{*}$ 是 $X$ 上的一个**外测度**。'
      ].join('\n'),
      notes: [
        '这个公式就是「用已知面积的砖块去盖住 $A$，取最省的盖法」—— Lebesgue 外测度正是它的特例（$\\mathcal{E}$ 取开区间，$\\rho$ 取长度）。',
        '为什么要求 $X \\in \\mathcal{E}$：保证 $A \\subseteq X$ 总有覆盖，inf 不是对空集取。',
        '⚠ 这一步只用到 $\\rho (\\emptyset ) = 0$，**没用到可加性** —— 所以 $\\mu^{*}$ 一般并不还原成 $\\rho$。要还原，就得靠 Carathéodory。'
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
        '设 $\\mu^{*}$ 是 $X$ 上的外测度。$A \\subseteq X$ 称为 **$\\mu^{*}$-可测的**，当且仅当 $A$ 把每个集合都「干净地切成两块」：',
        '',
        '$$\\mu^*(E) = \\mu^*(E \\cap A) + \\mu^*(E \\cap A^c)\\quad  \\forall E \\subseteq X$$'
      ].join('\n'),
      notes: [
        '因为 $\\mu^{*}$ 只有次可加性，永远有 $$\\mu^*(E) \\le \\mu^*(E \\cap A) + \\mu^*(E \\cap A^c)$$。所以这个定义实际上只要求**反向的不等式**：$A$ 不「吃掉」任何东西。',
        '这个定义初看很怪（为什么不用开集、闭集之类的直观条件？）—— 它的妙处是**完全内蕴**：只需要 $\\mu^{*}$ 一个对象，不需要任何拓扑。所以它对任意外测度都能用。',
        '直观：$A$ 是「可以随便切」的集合。'
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
        '设 $\\mu^{*}$ 是 $X$ 上的外测度，$\\mathcal{M}$ 是全体 $\\mu^{*}$-可测集。则',
        '',
        '1. **$\\mathcal{M}$ 是一个 $\\sigma$代数**；',
        '2. **$$\\mu^*|_\\mathcal{M}$$ 是 $(X, \\mathcal{M})$ 上的一个测度**（即 $\\mu^{*}$ 在 $\\mathcal{M}$ 上真的可加）；',
        '3. 这个测度是**完备**的。'
      ].join('\n'),
      notes: [
        '这是整个测度论构造的枢纽：**外测度不必可加，但它的「可切集合」上就可加了**。',
        '1 的证明是一个冗长的验证：对有限并、补、可数不交并逐一验算。',
        '3 的完备性来自定义本身：若 $\\mu^{*}(A) = 0$ 且 $B \\subseteq A$，则对任意 $E$ 有 $\\mu^{*}(E \\cap B) \\le \\mu^{*}(B) = 0$ 且 $\\mu^{*}(E \\cap B^{c}) \\le \\mu^{*}$(E)，两边一夹就得到 $B$ 满足可测性条件。'
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
        '设 $\\mathfrak{A} \\subseteq \\mathcal{P}(X)$ 是**代数**，$\\mu _{0}$ 是 $\\mathfrak{A}$ 上的**预测度**，$\\mu^{*}$ 是由 $\\mu _{0}$ 诱导的外测度（按上一条命题，取 $\\mathcal{E} = \\mathfrak{A}$、$\\rho = \\mu _{0}$）。则',
        '',
        '1. $$\\mu^*|_\\mathfrak{A} = \\mu_0$$',
        '2. **$\\mathfrak{A}$ 中每个集合都是 $\\mu^{*}$-可测的**，因此',
        '',
        '$$\\mathfrak{A} \\subseteq \\mathcal{M}(\\mathfrak{A}) \\subseteq \\mathcal{M}$$',
        '',
        '（$\\mathcal{M}$ 是全体 $\\mu^{*}$-可测集），于是 $\\mu^{*}|_\\mathcal{M}$ 是 $\\mu _{0}$ 在 $\\sigma$代数 $\\mathcal{M}(\\mathfrak{A})$ 上的扩张。'
      ].join('\n'),
      notes: [
        '这就是「预测度 $\\to$ 外测度 $\\to$ 测度」三步走的收官：**预测度在 $\\sigma$代数的扩张上被完整还原**。',
        '1 的两个方向：$$\\mu^*(A) \\le \\mu_0(A)$$ 是直接的（$A$ 自己被 $A$ 覆盖）；反向要用 $\\mu _{0}$ 的可数可加性。',
        '2 是技术核心，要在 $\\mathfrak{A}$ 上验证 Carathéodory 的可切性条件。',
        '不仅 $\\mathfrak{A}$ 本身，连它做可数并、可数交（以及反复做）得到的 $\\mathfrak{A}_\\sigma$、$\\mathfrak{A}_\\delta$、$\\mathfrak{A}_\\sigma \\delta$、$\\mathfrak{A}_\\delta \\sigma$ 里的集合也都 $\\mu^{*}$-可测 —— 因为 $\\mathcal{M}$ 是 $\\sigma$代数，对这些操作封闭。'
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
        '设 $\\mu _{0}$ 是代数 $\\mathfrak{A}$ 上的预测度，$\\mu := \\mu^{*}|_\\mathcal{M}$ 是它经 Carathéodory 得到的扩张。若 $\\nu$ 是 $\\mathcal{M}(\\mathfrak{A})$ 上**另一个**扩张 $\\mu _{0}$ 的测度，则',
        '',
        '$$\\nu(E) \\le \\mu(E)\\quad  \\forall E \\in \\mathcal{M}(\\mathfrak{A})$$',
        '',
        '且当 $$\\mu(E) < \\infty$$ 时等号成立；进而，若 $\\mu$ 是 $\\sigma$有限的，则 $$\\nu = \\mu$$。'
      ].join('\n'),
      notes: [
        '要点：**Carathéodory 扩张是「最大」的那一个**。原因藏在 $\\mu^{*}$ 的定义里 —— 它是用「覆盖取下确界」造的，而任何扩张 $\\nu$ 都要满足次可加性，于是 $\\nu (A) \\le \\sum \\nu (E_{j}) = \\sum \\mu _{0}(E_{j})$，对所有覆盖取下确界就得到 $\\nu \\le \\mu^{*}$。',
        '⚠ 不 $\\sigma$有限时唯一性会**失效**：$\\mathbb{R}$ 上取 $\\mathfrak{A} =$ 有限并的半开区间，$\\mu _{0} = Lebesgue$ 长度限制在 $\\mathfrak{A}$ 上，则「Lebesgue 测度」与「Lebesgue 测度 + 集中在某个非 Lebesgue 可测集上的无穷值」都是扩张。$\\sigma$有限性正是用来堵住这种漏洞的。',
        '构造测度的标准收尾就是这一条：**先造预测度（好造），再扩张（Carathéodory 保证存在），最后用 $\\sigma$有限保证唯一**。'
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
        '设 $$F : \\mathbb{R} \\to \\mathbb{R}$$ 是**递增**且**右连续**的函数。在半开区间的全体上定义',
        '',
        '$$\\mu_0( (a, b] ) = F(b) - F(a)$$',
        '',
        '（并规定 $\\mu _{0}(\\emptyset ) = 0$，扩充到由这些区间做有限不交并得到的代数 $\\mathfrak{A}$ 上。）则 $\\mu _{0}$ 是 $\\mathfrak{A}$ 上的一个**预测度**。'
      ].join('\n'),
      notes: [
        '**右连续正是用来保证可数可加性的**：若 (a, b] 是 $(a_{j}, b_{j}]$ 的不交并，把 $b_{j}$ 从左边逼近 $b_{j}$ 就能得到单调性的不等式。',
        '取 $F(x) = x$ 就回到长度 $\\mu _{0}((a, b]) = b - a$ —— 也就是 Lebesgue 测度的出发点。',
        '⚠ 半开区间 (a, b] 比开区间好用：它们做不交并时端点不重叠，$\\mu _{0}$ 的加法好验。用 [a, b) 也一样，只是右连续要换成左连续。'
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
        '对每个递增右连续的 $$F : \\mathbb{R} \\to \\mathbb{R}$$，存在 $\\mathbb{R}$ 上的一个 Borel 测度 $\\mu _F$ 使',
        '',
        '$$\\mu_F( (a, b] ) = F(b) - F(a)\\quad  \\forall a < b$$',
        '',
        '且这样的 $\\mu _F$ 与 $F$ 的对应在**相差一个常数**的意义下是一一的。'
      ].join('\n'),
      notes: [
        '证明就是把前两条接起来：$F \\mapsto$ 预测度 $\\mu _{0}$（上一条命题）$\\to$ 由 Carathéodory 扩张到 $\\mathfrak{B}_\\mathbb{R}$（前面两条定理）。',
        '「差常数」是因为 $\\mu _F$ 只看增量 $F(b) - F(a)$：把 $F$ 换成 F + c，增量不变，测度也不变。所以严格的对应是「递增右连续函数模掉常数」$\\leftrightarrow$「$\\mathbb{R}$ 上局部有限的 Borel 测度」。',
        '⚠ 「局部有限」这个限制是必要的：$\\mu _F((-n, n]) = F(n) - F(-n)$ 必须有限，才能由递增实值函数给出。'
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
        '由递增右连续函数 $F$ 按上一条定理得到的 Borel 测度 $$\\mu_F$$ 称为 **$F$ 的 Lebesgue–Stieltjes 测度**。',
        '',
        '特别地，取 $$F(x) = x$$，得到的 $\\mu _F$ 就是 $\\mathbb{R}$ 上的 **Lebesgue 测度** $m$：',
        '',
        '$$m( (a, b] ) = b - a$$'
      ].join('\n'),
      notes: [
        '若改用左连续的 $F$ 配区间 [a, b)，得到的是同一族测度 —— 只是把「右连续」换成了「左连续」。',
        '$\\mu _F$ 的**分布函数**视角：若 $F$ 还满足 $F(-\\infty ) = 0$、$F(+\\infty ) = 1$，那 $F$ 就是一个概率分布的分布函数，$\\mu _F$ 就是对应的概率测度。',
        '这条把「测度」和「函数」这两类对象接了起来：$\\mathbb{R}$ 上（局部有限的）测度 $\\leftrightarrow$ 递增右连续函数（模常数）。后面 Radon–Nikodym 会把「绝对连续」精确地实现为「$F$ 是可积函数的积分」。'
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
        '设 $\\mu$ 是测度。',
        '',
        '**(a) 单调。** 设 $E \\subseteq F$。则 $F = E \\cup (F \\setminus E)$，两项不交，故 $\\mu (F) = \\mu (E) + \\mu (F \\setminus E) \\ge \\mu (E)$（取值非负）。',
        '',
        '**(b) 次可加。** 令 $F_{j} = E_{j} \\setminus (E_{1} \\cup \\cdots \\cup E_\\{j-1\\})$，则 $F_{j}$ 两两不交、$\\bigcup F_{j} = \\bigcup E_{j}$ 且 $F_{j} \\subseteq E_{j}$。由可数可加与 (a)，',
        '',
        '$$\\mu(\\bigcup_j E_j) = \\mu(\\bigcup_j F_j) = \\sum_j \\mu(F_j) \\le \\sum_j \\mu(E_j)$$',
        '',
        '**(c) 下连续。** 设 $E_{1} \\subseteq E_{2} \\subseteq \\cdots$。令 $A_{1} = E_{1}$，$A_{j} = E_{j} \\setminus E_\\{j-1\\}$（$j \\ge 2$），则 $A_{j}$ 两两不交且 $\\bigcup A_{j} = \\bigcup E_{j}$。由可数可加，',
        '',
        '$$\\mu(\\bigcup_j E_j) = \\sum_j \\mu(A_j) = \\lim_{n\\to\\infty} \\sum_{j=1}^{n} \\mu(A_j) = \\lim_{n\\to\\infty} \\mu(E_n)$$',
        '',
        '**(d) 上连续。** 设 $E_{1} \\supseteq E_{2} \\supseteq \\cdots$ 且 $\\mu (E_{1}) < \\infty$。令 $F_{j} = E_{1} \\setminus E_{j}$，则 $F_{1} \\subseteq F_{2} \\subseteq \\cdots$ 且 $\\bigcup F_{j} = E_{1} \\setminus \\bigcap E_{j}$。由 (c) 与 (a)，',
        '',
        '$$\\mu(E_1) - \\mu(\\bigcap_j E_j) = \\mu(E_1 \\setminus \\bigcap_j E_j) = \\lim_j \\mu(F_j) = \\lim_j ( \\mu(E_1) - \\mu(E_j) )$$',
        '',
        '因为 $\\mu (E_{1}) < \\infty$ 是个有限数，可以从两边同时减掉，得 $\\mu (\\bigcap E_{j}) = \\lim \\mu (E_{j})$。∎',
        '',
        '$>$ ⚠ (d) 里的「$\\mu (E_{1}) < \\infty$」正是为了让 $\\mu (E_{1})$ 能被减掉。没有它，等式会退化成 $\\infty = \\infty$。'
      ].join('\n')
    },

    {
      id: 'imp.premeasure-to-outer',
      kind: 'implication',
      sources: ['def.premeasure'],
      target: 'prop.outer-measure-induced',
      title: '预测度 ⟹ 诱导的外测度',
      proof: [
        '设 $\\mathfrak{A}$ 是代数，$\\mu _{0}$ 是 $\\mathfrak{A}$ 上的预测度。对 $A \\subseteq X$ 令',
        '',
        '$$\\mu^*(A) = \\inf \\{ \\sum_j \\mu_0(E_j) : E_j \\in \\mathfrak{A}, A \\subseteq \\bigcup_j E_j \\}$$',
        '',
        '**① 定义合理**：$A \\subseteq X$ 且 $X \\in \\mathfrak{A}$，所以总有覆盖，inf 是对非空集合取。',
        '',
        '**② $\\mu^{*}(\\emptyset ) = 0$**：取 $E_{1} = \\emptyset$、$E_{2} = E_{3} = \\cdots = \\emptyset$，则 $\\sum \\mu _{0}(E_{j}) = 0$，故 $0 \\le \\mu^{*}(\\emptyset ) \\le 0$。',
        '',
        '**③ 单调**：$A \\subseteq B$ 时，$B$ 的每个覆盖也是 $A$ 的覆盖，故 $A$ 的下确界集合更大，$\\mu^{*}(A) \\le \\mu^{*}$(B)。',
        '',
        '**④ 可数次可加**：设 $A_{j} \\subseteq X$。若某个 $\\mu^{*}(A_{j}) = \\infty$ 则不等式平凡；否则给定 $\\varepsilon > 0$，对每个 $j$ 取 $\\mathfrak{A}$ 中的覆盖 $\\{E_\\{j,k\\}\\}_{k}$ 使',
        '',
        '$$\\sum_k \\mu_0(E_{j,k}) < \\mu^*(A_j) + (\\varepsilon/2)^j$$',
        '',
        '把 {E_{j,k}}_{j,k} 按 (j, k) 之外再用双射排成一列（可数个可数集之并仍可数），它是 $\\bigcup _{j} A_{j}$ 的一个覆盖，于是',
        '',
        '$$\\mu^*(\\bigcup_j A_j) \\le \\sum_{j,k} \\mu_0(E_{j,k}) \\le \\sum_j \\mu^*(A_j) + \\varepsilon$$',
        '',
        '令 $\\varepsilon \\to 0$ 即得。∎',
        '',
        '$>$ ⚠ ④ 的每一步都只需取**一个**覆盖 —— 这用的是 $\\mathbb{N}$ 上的可数选择（可以从自然数的良序性显式给出），不需要完整的 AC。'
      ].join('\n')
    },

    {
      id: 'imp.outer-carath',
      kind: 'implication',
      sources: ['def.outer-measure', 'def.caratheodory-measurable'],
      target: 'thm.caratheodory',
      title: '外测度 + 可切集 ⟹ σ-代数与完备测度',
      proof: [
        '设 $\\mu^{*}$ 是外测度，$\\mathcal{M} = \\{ A : \\forall E, \\mu^{*}(E) = \\mu^{*}(E\\cap A) + \\mu^{*}(E\\cap A^{c}) \\}$。',
        '',
        '**① $\\mathcal{M}$ 是代数。** 条件关于 $A$ 与 $A^{c}$ 对称，故 $A \\in \\mathcal{M} \\implies A^{c} \\in \\mathcal{M}$；$\\emptyset$ 与 $X$ 显然在 $\\mathcal{M}$ 中。若 $A, B \\in \\mathcal{M}$，要证 $A \\cup B \\in \\mathcal{M}$：对任意 $E$，把 $E$ 依 $A$ 切开、再依 $B$ 切开，',
        '',
        '$$\\mu^*(E) = \\mu^*(E\\cap A) + \\mu^*(E\\cap A^c) = \\mu^*(E\\cap A\\cap B) + \\mu^*(E\\cap A\\cap B^c) + \\mu^*(E\\cap A^c\\cap B) + \\mu^*(E\\cap A^c\\cap B^c)$$',
        '',
        '而右边前三项合起来 $\\ge \\mu^{*}(E\\cap (A\\cup B))$（次可加），最后一项 $= \\mu^{*}(E\\cap (A\\cup B)^{c})$。反向不等式由次可加自动成立，故 $A \\cup B \\in \\mathcal{M}$。',
        '',
        '**② $\\mathcal{M}$ 是 $\\sigma$代数。** 设 $A_{j} \\in \\mathcal{M}$ 两两不交，$A = \\bigcup A_{j}$。对任意 $E$ 归纳得到',
        '',
        '$$\\mu^*(E \\cap \\bigcup_{j\\le n} A_j) = \\sum_{j\\le n} \\mu^*(E \\cap A_j)$$',
        '',
        '（每一步用 $A_{n}$ 把 $E$ 切开，丢掉的那块弃掉即可。）令 $n \\to \\infty$，用次可加性与单调性，',
        '',
        '$$\\mu^*(E) = \\mu^*(E\\cap A) + \\mu^*(E\\cap A^c)$$',
        '',
        '故 $A \\in \\mathcal{M}$。结合 ①，$\\mathcal{M}$ 是可数并封闭的代数，即 $\\sigma$代数（可数不交并由 ②，一般可数并再换成不交并）。',
        '',
        '**③ $\\mu^{*}|_\\mathcal{M}$ 可加。** 在 ② 里取 $E = X$、$A$ 换成两两不交的 $A_{j}$，得 $\\mu^{*}(\\bigcup A_{j}) = \\sum \\mu^{*}(A_{j})$，这正是可数可加；$\\mu^{*}(\\emptyset ) = 0$ 由外测度定义给出。',
        '',
        '**④ 完备。** 设 $\\mu^{*}(A) = 0$，$B \\subseteq A$。对任意 $E$，由单调性与次可加，',
        '',
        '$$\\mu^*(E) \\ge \\mu^*(E \\cap B^c) \\ge \\mu^*(E) - \\mu^*(E \\cap B) \\ge \\mu^*(E) - \\mu^*(A) = \\mu^*(E)$$',
        '',
        '故 $\\mu^{*}(E) = \\mu^{*}(E\\cap B) + \\mu^{*}(E\\cap B^{c})$（注意 $\\mu^{*}(E\\cap B) \\le \\mu^{*}(A) = 0$），即 $B \\in \\mathcal{M}$。故 $\\mu^{*}|_\\mathcal{M}$ 完备。∎',
        '',
        '$>$ 这一条是纯验证，但要验的东西不少，上面把要点写全了。'
      ].join('\n')
    },

    {
      id: 'imp.carath-extension',
      kind: 'implication',
      sources: ['thm.caratheodory', 'prop.outer-measure-induced'],
      target: 'prop.caratheodory-extension',
      title: 'Carathéodory + 预测度 ⟹ 原代数上的值不变',
      proof: [
        '设 $\\mathfrak{A}$ 是代数，$\\mu _{0}$ 是 $\\mathfrak{A}$ 上的预测度，$\\mu^{*}$ 是由 $\\mu _{0}$ 诱导的外测度，$\\mathcal{M}$ 是全体 $\\mu^{*}$-可测集。',
        '',
        '**① $\\mu^{*}|_\\mathfrak{A} \\le \\mu _{0}$。** 取 $A \\in \\mathfrak{A}$，则 $A \\subseteq A$ 是一个（只含一层的）覆盖，故',
        '',
        '$$\\mu^*(A) \\le \\mu_0(A) + 0 + 0 + \\cdots = \\mu_0(A)$$',
        '',
        '**② $\\mu^{*}|_\\mathfrak{A} \\ge \\mu _{0}$。** 设 $\\{E_{j}\\} \\subseteq \\mathfrak{A}$ 是 $A$ 的覆盖。令 $F_{j} = E_{j} \\setminus (E_{1} \\cup \\cdots \\cup E_\\{j-1\\})$，则 $F_{j} \\in \\mathfrak{A}$ 两两不交且 $\\bigcup F_{j} \\supseteq A$、$F_{j} \\subseteq E_{j}$。于是',
        '',
        '$$\\mu_0(A) = \\mu_0( \\bigcup_j (A \\cap F_j) ) = \\sum_j \\mu_0(A \\cap F_j) \\le \\sum_j \\mu_0(F_j) \\le \\sum_j \\mu_0(E_j)$$',
        '',
        '（第一个等号用 $A$ 是那些不交集合之并；第二个用 $\\mu _{0}$ 可数可加；不等号用单调性。）对所有覆盖取下确界得 $\\mu _{0}(A) \\le \\mu^{*}$(A)。',
        '',
        '**③ $\\mathfrak{A} \\subseteq \\mathcal{M}$。** 设 $A \\in \\mathfrak{A}$，$E \\subseteq X$，要证 $\\mu^{*}(E) \\ge \\mu^{*}(E\\cap A) + \\mu^{*}(E\\cap A^{c})$。给定 $\\varepsilon > 0$，取 $\\mathfrak{A}$ 中 $\\{E_{j}\\}$ 覆盖 $E$ 使',
        '',
        '$$\\sum_j \\mu_0(E_j) < \\mu^*(E) + \\varepsilon$$',
        '',
        '由 ②，$\\mu _{0}(E_{j}) = \\mu^{*}(E_{j})$；又 $\\mathfrak{A}$ 是代数，$E_{j} \\cap A$ 与 $E_{j} \\cap A^{c}$ 都在 $\\mathfrak{A}$ 中且不交、并为 $E_{j}$，于是',
        '',
        '$$\\mu^*(E \\cap A) + \\mu^*(E \\cap A^c) \\le \\sum_j \\mu_0(E_j \\cap A) + \\sum_j \\mu_0(E_j \\cap A^c) = \\sum_j \\mu_0(E_j) < \\mu^*(E) + \\varepsilon$$',
        '',
        '令 $\\varepsilon \\to 0$ 即得。所以 $\\mathfrak{A} \\subseteq \\mathcal{M}$；而 $\\mathcal{M}$ 是 $\\sigma$代数（Carathéodory），故 $\\mathcal{M}(\\mathfrak{A}) \\subseteq \\mathcal{M}$。∎'
      ].join('\n')
    },

    {
      id: 'imp.carath-unique',
      kind: 'implication',
      sources: ['prop.caratheodory-extension'],
      target: 'thm.caratheodory-uniqueness',
      title: '扩张的最大性与 σ-有限唯一性',
      proof: [
        '沿用上一条的记号，设 $\\nu$ 是 $\\mathcal{M}(\\mathfrak{A})$ 上另一个扩张 $\\mu _{0}$ 的测度。',
        '',
        '**① $\\nu \\le \\mu^{*}$。** 设 $E \\in \\mathcal{M}(\\mathfrak{A})$，$\\{E_{j}\\} \\subseteq \\mathfrak{A}$ 是 $E$ 的覆盖。由 $\\nu$ 的次可加性与 $\\nu |_\\mathfrak{A} = \\mu _{0}$，',
        '',
        '$$\\nu(E) \\le \\sum_j \\nu(E_j) = \\sum_j \\mu_0(E_j)$$',
        '',
        '对所有这样的覆盖取下确界，右边给出 $\\mu^{*}(E) = \\mu (E)$。故 $\\nu (E) \\le \\mu (E)$。',
        '',
        '**② $\\mu (E) < \\infty$ 时取等。** 此时 $n = \\nu (E)$ 有限（因为 $\\nu (E) \\le \\mu (E) < \\infty$）—— 但要注意 $\\nu \\le \\mu$ 只在一侧，所以直接两边各取补集：$E$ 可测意味着对任意 $F \\subseteq X$ 有 $\\mu (F) = \\mu (F\\cap E) + \\mu (F\\setminus E)$，取 $F = X$ 得 $\\mu (X) = \\mu (E) + \\mu (X\\setminus E)$，**这一步要求 $\\mu (X) < \\infty$** 才好逐项比较。一般情形下改用 $\\mathcal{M}(\\mathfrak{A})$ 中 $\\mu$ 有限的集合 $E_{n} \\uparrow X$ 作近似（见下）。',
        '',
        '**③ $\\sigma$有限时唯一。** 取 $\\mu$有限的可测集 $E_{n} \\uparrow X$（$\\sigma$有限的定义）。对每个 $E_{n}$，用 ② 的论证于 $E_{n} \\cap E$ 上得 $\\nu (E \\cap E_{n}) = \\mu (E \\cap E_{n})$；令 $n \\to \\infty$，两侧分别用下连续性（$\\nu$ 与 $\\mu$ 都是测度）得到 $\\nu (E) = \\mu (E)$。',
        '',
        '故 $\\sigma$有限时 $\\nu = \\mu$，扩张唯一。∎',
        '',
        '$>$ ⚠ ② 里 $\\mu (E) < \\infty$ 的等号之所以能成立，用的是「在有限测度的集合上 $\\mu - \\nu$ 也是测度」这一点。$\\mathcal{M}(\\mathfrak{A})$ 上会出现无穷值，所以只能逐块比较 —— 这正是 $\\sigma$有限必不可少的原因。'
      ].join('\n')
    },

    {
      id: 'imp.ls-premeasure-to-measure',
      kind: 'implication',
      sources: ['prop.ls-premeasure', 'thm.caratheodory-uniqueness'],
      target: 'thm.ls-exists',
      title: 'F 的预测度 ⟹ ℝ 上的 Borel 测度',
      proof: [
        '设 $F$ 递增右连续。由前一条命题，$\\mu _{0}((a, b]) = F(b) - F(a)$ 扩充成半开区间生成的代数 $\\mathfrak{A}$ 上的**预测度**。',
        '',
        '**① 存在性。** 由 Carathéodory 扩张定理，$\\mu _{0}$ 诱导的外测度限制在 $\\mathcal{M}(\\mathfrak{A})$ 上就是一个测度 $\\mu _F$，且在 $\\mathfrak{A}$ 上还原成 $\\mu _{0}$。特别地 $\\mu _F((a, b]) = F(b) - F(a)$。',
        '',
        '**② 它是 Borel 测度。** 每个开区间 (a, b) 是可数个 $(a, b - 1/n]$ 之并，故属于 $\\mathcal{M}(\\mathfrak{A})$；于是 $\\mathcal{M}(\\mathfrak{A})$ 包含 $\\mathbb{R}$ 的全体开集（$\\mathbb{R}$ 的开集是可数个开区间之并），从而 $\\mathfrak{B}_\\mathbb{R} \\subseteq \\mathcal{M}(\\mathfrak{A})$。',
        '',
        '**③ 唯一性。** $F$ 递增实值 $\\implies \\mu _F((-n, n]) = F(n) - F(-n) < \\infty$，所以 $\\mu _F$ 是 $\\sigma$有限的（$\\mathbb{R} = \\bigcup _{n} (-n, n]$）。由 $\\sigma$有限时的唯一性，扩张唯一。',
        '',
        '**④ 「差常数」的来源。** $\\mu _F$ 只看增量：把 $F$ 换成 F + c，对一切 (a, b] 有 $F(b) - F(a)$ 不变，故预测度不变、扩张不变。反过来若 $\\mu _F = \\mu _G$，则对一切 $a < b$，$F(b) - F(a) = G(b) - G(a)$，固定 $a$ 即得 $F - G$ 是常数。∎'
      ].join('\n')
    },

    {
      id: 'imp.completion',
      kind: 'implication',
      sources: ['def.null-set'],
      target: 'thm.completion',
      title: '零集 ⟹ 完备化',
      proof: [
        '设 $(X, \\mathcal{M}, \\mu )$ 是测度空间，$\\bar{\\mathcal{M}} = \\{ E \\cup F : E \\in \\mathcal{M}, F \\subseteq N$ 对某个零集 N }。',
        '',
        '**① $\\bar{\\mathcal{M}}$ 是 $\\sigma$代数。** 含 $X$（$X \\in \\mathcal{M}$）。对可数并：$\\bigcup (E_{j} \\cup F_{j}) = (\\bigcup E_{j}) \\cup (\\bigcup F_{j})$，而 $\\bigcup F_{j} \\subseteq \\bigcup N_{j}$ 是零集。对补：$E \\cup F$ 的补是',
        '',
        '$$(E \\cup F)^c = (E^c \\cap N^c) \\cup (E^c \\cap N \\setminus F)$$',
        '',
        '第一块属于 $\\mathcal{M}$，第二块含在零集 $N$ 里，故属于 $\\bar{\\mathcal{M}}$ 的形状。',
        '',
        '**② $\\bar{\\mu}$ 良定义。** 设 $E_{1} \\cup F_{1} = E_{2} \\cup F_{2}$ 且 $F_{i} \\subseteq N_{i}$（零集）。由 $E_{1} \\subseteq E_{2} \\cup N_{2}$ 得 $\\mu (E_{1}) \\le \\mu (E_{2}) + 0$，反向同理，故 $\\mu (E_{1}) = \\mu (E_{2})$。',
        '',
        '**③ $\\bar{\\mu}$ 是测度。** 把 $\\mathcal{N}$ 中集合的子集归入「零的一部分」后，可数可加性与 $\\mu$ 上的逐一对应（$E_{j}$ 部分可数可加、$F_{j}$ 部分含于零集）。',
        '',
        '**④ 完备。** 若 $\\bar{\\mu}(E \\cup F) = 0$，则 $\\mu (E) = 0$，于是 $E \\cup F \\subseteq E \\cup N$ 是零集的子集 —— 按 $\\bar{\\mathcal{M}}$ 的定义它当然还在 $\\bar{\\mathcal{M}}$ 里，即：**$\\bar{\\mathcal{M}}$ 中每个零集的子集都可测**。∎'
      ].join('\n')
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.measure-space',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'def.measure-space',
      note: '有限 $/ \\sigma$有限 / 半有限都是在测度的定义上追加条件。'
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
      note: '定理里的 $\\mathcal{M}$ 就是 $\\mu^{*}$-可测集全体。'
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
