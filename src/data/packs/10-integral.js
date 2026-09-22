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
        '固定测度空间 $(X, \\mathcal{M}, \\mu )$。记',
        '',
        '$$L^+ := \\{ f : X \\to [0, +\\infty] : f\\text{ 可测} \\}$$',
        '',
        '即取值在**扩充**非负实数里的可测函数全体。'
      ].join('\n'),
      notes: [
        '⚠ 取值允许是 $\\infty$，这是刻意的：先把积分对 $[0, +\\infty ]$ 值的函数定义好，收敛定理（sup / 极限）在整个 $L^{+}$ 里封闭，不必反复讨论「积分是不是有限」。',
        '「可积」（积分有限）是之后单独加的条件，见 $L^{1}$ 的定义。'
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
        '设 $$\\varphi \\in L^+$$ 是简单函数，写成标准形式',
        '',
        '$$\\varphi = \\sum_{j=1}^{n} a_j \\chi_{E_j}, \\quad  a_j \\ge 0, E_j \\in \\mathcal{M}\\text{ 两两不交}$$',
        '',
        '则定义',
        '',
        '$$\\int \\varphi d\\mu := \\sum_{j=1}^{n} a_j \\mu(E_j)$$'
      ].join('\n'),
      notes: [
        '这就是「面积 $=$ 各层高度 $\\times$ 各层测度」—— 完全照着 Riemann 和的样子写，只是把区间换成了可测集。',
        '要检查**良定义**：同一个 $\\varphi$ 可以写成不同的标准形式（比如把某个 $E_{j}$ 再拆开），但由 $\\mu$ 的有限可加性，结果一样。',
        '约定 $$0 \\cdot \\infty = 0$$：这一步很关键 —— 它让「在无穷测度集上取 0 的函数」积分为 0，符合直觉。'
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
        '设 $$\\varphi, \\psi$$ 是简单函数。',
        '',
        '- **(a)** $$c > 0 \\implies \\int c\\varphi = c\\int \\varphi$$',
        '- **(b)** $$\\int (\\varphi + \\psi) = \\int \\varphi + \\int \\psi$$',
        '- **(c)** $$\\varphi \\le \\psi \\implies \\int \\varphi \\le \\int \\psi$$',
        '- **(d)** $$A \\mapsto \\int_A \\varphi d\\mu$$ 是 $\\mathcal{M}$ 上的**测度**。'
      ].join('\n'),
      notes: [
        '(d) 是这一组里最有用的：它把「对简单函数积分」变成了「一个测度」，于是可数可加性、单调连续性（关于 $A$）全部免费。',
        '',
        '⚠ 后面 MCT 的证明正是**靠 (d)**：证明里要断言 $$lim_n \\int_{E_n} \\varphi = \\int \\varphi$$，用的就是「$A \\mapsto \\int _A \\varphi$ 是测度」加上测度的下连续性（$$E_n \\uparrow  X$$）。',
        '(a) 里 $c > 0$ 而不是 $c \\ge 0$：因为约定 $0\\cdot \\infty = 0$，$c = 0$ 时左边也自动成立，写成 $c > 0$ 只是为了不啰嗦。'
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
        '设 $$f \\in L^+$$。定义',
        '',
        '$$\\int f d\\mu := sup \\{ \\int \\varphi d\\mu : 0 \\le \\varphi \\le f, \\varphi\\text{ 是简单函数} \\}$$'
      ].join('\n'),
      notes: [
        '直观：用简单函数从**下面**去顶 $f$，取这些面积的**上确界**。这与 Jordan 测度「从外面盖、从里面填」的做法不同 —— 这里只从里面填。',
        '为什么不再要求「外面的盖」：因为测度已经在对偶的那一侧（$\\mu$ 本身是从外面用外测度定义的），简单函数的下确界只会把积分定义偏小。',
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
        '设 $$\\{f_n\\} \\subseteq L^+$$ 满足',
        '',
        '$$f_1 \\le f_2 \\le \\cdots, \\quad  f_n \\uparrow  f\\text{ 逐点}, $$',
        '',
        '则',
        '',
        '$$\\int f = \\lim_{n\\to\\infty} \\int f_n$$'
      ].join('\n'),
      notes: [
        '⭐ 这是整个 Lebesgue 积分理论的**发动机**：后面的逐项积分、Fatou、DCT 全都是它的推论。',
        '对比 Riemann 积分：那里「积分与极限交换」需要一致收敛这样强的条件；这里只要**单调**就够了 —— 这就是 Lebesgue 积分的全部好处。',
        '⚠ 两者都可能是 $\\infty$，等式在扩充意义下理解。'
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
        '设 $$\\{f_n\\} \\subseteq L^+$$，则',
        '',
        '$$\\int \\sum_{n=1}^{\\infty} f_n = \\sum_{n=1}^{\\infty} \\int f_n$$'
      ].join('\n'),
      notes: [
        '（现在 $f_n \\ge 0$，所以两边都可能是 $\\infty$；结论等价于：不可能出现「逐项积分发散而整体积分有限」的怪事。）',
        '用法上这就是**无条件地交换 $\\int$ 和 $\\sum$**，不需要控制函数 —— 代价是要求非负。有正有负时必须换 DCT。'
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
        '设 $$f \\in L^+$$。则',
        '',
        '$$\\int f d\\mu = 0 \\iff f = 0 \\mu-a.e.$$'
      ].join('\n'),
      notes: [
        '$(\\Longleftarrow )$ 只要 $f$ 在零集外为零，下确界里的每个简单函数 $\\varphi \\le f$ 也几乎处处为零，从而 $\\int \\varphi = 0$。',
        '$(\\implies )$ 记 $$A_n = \\{f > 1/n\\}$$，则 $$(1/n)\\cdot\\mu(A_n) \\le \\int f = 0$$，故 $\\mu (A_{n}) = 0$；而 $$\\{f > 0\\} = \\bigcup_n A_n$$ 是零测的。',
        '⭐ 这条把「积分」与「几乎处处」这两个概念绑在一起了 —— 它是 $L^{1}$ 里「$f = g$」按 a.e. 理解的原因。'
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
        '设 $$\\{f_n\\} \\subseteq L^+$$，$$f \\in L^+$$。若对**几乎处处的** $x$ 有',
        '',
        '$$f_n(x) \\uparrow  f(x), $$',
        '',
        '则',
        '',
        '$$\\int f = \\lim_{n\\to\\infty} \\int f_n$$'
      ].join('\n'),
      notes: '把例外集 $N$（$\\mu (N) = 0$）上的值全部改掉不影响任何一边的积分：左边用「积分为零 $\\iff$ 几乎处处为零」，右边用「零集不改变简单函数的积分」。所以收敛只在 a.e. 上成立就够。'
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
        '设 $$\\{f_n\\} \\subseteq L^+$$，则',
        '',
        '$$\\int \\liminf_{n\\to\\infty} f_n \\le \\liminf_{n\\to\\infty} \\int f_n$$'
      ].join('\n'),
      notes: [
        '⚠ 注意不等号方向：**下面的**极限在积分外面，得到的**不大于**积分的下极限。也就是说「取极限」会让积分**变小**，不会变大。',
        '这是 MCT 去掉单调性后剩下的东西 —— 单调性一旦丢掉，等号就退化成不等式。',
        '反向的例子：$$f_n = \\chi_{[n, n+1]}$$（在 $\\mathbb{R}$ 上），则每个 $\\int f_{n} = 1$ 但 $\\int liminf f_{n} = 0$。'
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
        '设 $$\\{f_n\\} \\subseteq L^+$$，$$f \\in L^+$$，且 $$f_n \\to f$$ a.e.。则',
        '',
        '$$\\int f \\le \\liminf_{n\\to\\infty} \\int f_n$$'
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
        '设 $$f \\in L^+$$ 且 $$\\int f < \\infty$$。则',
        '',
        '- $$\\{x : f(x) = \\infty\\}$$ 是零集；',
        '- $$\\{x : f(x) > 0\\}$$ 是 **$\\sigma$有限**的（即它是可数个有限测度集之并）。'
      ].join('\n'),
      notes: [
        '第一条：若 $$\\mu(\\{f = \\infty\\}) > 0$$，则对每个 $n$ 有 $$\\int f \\ge n\\cdot\\mu(\\{f=\\infty\\})$$，让 $n \\to \\infty$ 得 $\\int f = \\infty$。',
        '第二条：$$\\{f > 0\\} = \\bigcup_n \\{f > 1/n\\}$$，而 $$\\mu(\\{f > 1/n\\}) \\le n\\int f < \\infty$$ —— 所以是**可数**个有限测度集之并。',
        '⭐ 这条解释了为什么「$L^{1}$ 里的函数几乎处处有限」是免费的，也预告了 Lp 空间里的 $\\sigma$有限假设。'
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
        '设 $$f : X \\to \\bar{\\mathbb{R}}$$ 可测，记正部与负部',
        '',
        '$$f^+ = \\max_{f, 0}, \\quad  f^- = \\max_{-f, 0}$$',
        '',
        '（两者都属于 $L^{+}$，且 $$f = f^+ - f^-$$、$$|f| = f^+ + f^-$$。）若 $$\\int f^+$$ 与 $$\\int f^-$$ 中**至少一个有限**，定义',
        '',
        '$$\\int f := \\int f^+ - \\int f^-$$',
        '',
        '对复值函数，拆实部虚部：$$\\int f := \\int Re f + i \\int Im f$$（要求两个积分都有意义）。'
      ].join('\n'),
      notes: [
        '⚠ 「至少一个有限」是为了避免 $\\infty - \\infty$：那是不定式，必须排除。',
        '若两个都有限，就说 $f$ **可积**（见下一条）。',
        '对复值函数，$$Re f$$ 与 $$Im f$$ 可积 $\\iff f$ 可积，因为 $$|Re f|, |Im f| \\le |f| \\le |Re f| + |Im f|$$。'
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
        '实值可测 $$f$$ **可积**，当且仅当 $$\\int f^+ < \\infty$$ 且 $$\\int f^- < \\infty$$。等价地：',
        '',
        '$$f\\text{ 可积} \\iff \\int |f| d\\mu < \\infty$$',
        '',
        '复值可测 $$f$$ 可积，当且仅当 $$\\int |f| d\\mu < \\infty$$。可积函数全体记作',
        '',
        '$$L^1(\\mu) = L^1(X, \\mathcal{M}, \\mu) = L^1(X, \\mu)$$'
      ].join('\n'),
      notes: [
        '⭐ **可积 $\\iff$ 绝对值可积**：这是 Lebesgue 积分（终于）真正好用的地方 —— 因为 $|f| \\in L^{+}$，一切非负情形的定理都能直接套用。',
        '（对比 Riemann 反常积分：那里 $$\\int f$$ 收敛而 $$\\int|f|$$ 发散是可能的，叫条件收敛。）',
        '⚠ 严格说 $L^{1}$ 的元素是**函数的等价类**（a.e. 相等视为同一个），所以「$\\int |f| = 0 \\implies f = 0$」要在 a.e. 意义下读。这是后面 Lp 空间成为赋范空间的关键一步。'
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
        '$X$ 上可积的（实值）函数全体构成一个**实向量空间**，并且',
        '',
        '$$\\int (af + bg) = a\\int f + b\\int g\\quad  \\forall a, b \\in \\mathbb{R}$$',
        '',
        '即 $$f \\mapsto \\int f$$ 是线性的。'
      ].join('\n'),
      notes: [
        '「是向量空间」要在 a.e. 意义下理解（两个 a.e. 相等的可积函数看作同一个元素）。',
        '线性来自正负部分解后对简单函数的 (a)(b) 逐条验证 —— 这条本身不深，但它是 $L^{1}$ 成为**赋范空间**的第一步，后面 Lp 空间整套理论都从这儿开始。'
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
        '设 $$f \\in L^1(\\mu)$$，则',
        '',
        '$$| \\int f d\\mu | \\le \\int |f| d\\mu$$'
      ].join('\n'),
      notes: '复情形：取 $$\\alpha = e^{-i\\theta}$$ 使 $$\\alpha\\int f$$ 是实数且等于 $$|\\int f|$$，则 $$|\\int f| = \\int \\alpha f = \\int Re(\\alpha f) \\le \\int|\\alpha f| = \\int|f|$$。',
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
        '若 $$f \\in L^1(\\mu)$$，则',
        '',
        '$$\\{x : f(x) \\ne 0\\}$$',
        '',
        '是 $\\sigma$有限的。'
      ].join('\n'),
      notes: '把「积分有限的后果」分别用到 |f| 上即可：$\\{f \\ne 0\\} = \\{|f| > 0\\}$。'
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
        '设 $$f, g \\in L^1(\\mu)$$。则下列三条等价：',
        '',
        '$$\\int_E f d\\mu = \\int_E g d\\mu\\quad  \\forall E \\in \\mathcal{M}; $$',
        '$$\\int |f - g| d\\mu = 0; $$',
        '$$f = g\\quad  \\mu-a.e.$$'
      ].join('\n'),
      notes: [
        '作用：这类命题就是「用对一切可测集的积分来**识别**函数」。',
        '后面 Radon–Nikodym 定理的**唯一性**部分正是用的这一条 —— 两个密度给出同一个测度，就必须 a.e. 相等。',
        '（$E$ 取遍 $\\mathcal{M}$ 而不是只取 $X$，是关键：只对 $X$ 相等是不够的。）'
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
        '设 $$\\{f_n\\} \\subseteq L^1$$，$$f_n \\to f$$ a.e.，且存在**控制函数** $$g \\in L^1$$ 使',
        '',
        '$$|f_n| \\le g\\quad  a.e.\\quad  \\forall n$$',
        '',
        '则 $$f \\in L^1$$ 且',
        '',
        '$$\\int f = \\lim_{n\\to\\infty} \\int f_n$$'
      ].join('\n'),
      notes: [
        '⭐ 这是实际计算里**用得最多**的收敛定理。三个条件缺一不可：',
        '',
        '$\\cdot \\text{a.e.}$ 收敛 —— 不能去掉（$$\\chi_{[n,n+1]}$$ 反例）；',
        '$\\cdot$ 控制函数 $g \\in L^{1}$ —— 不能去掉（$$n\\chi_{[0,1/n]}$$ 在 [0,1] 上每点趋于 0，但积分为 1）；',
        '$\\cdot$ 必须是**可积**的 $g$，光是「有界」不够（在无穷测度空间上）。',
        '',
        '为什么叫「控制」：$g$ 把所有 $f_{n}$ 关在一间可积的笼子里，所以质量无处可逃，极限过程不会漏掉面积。'
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
        '设 $$\\{f_j\\} \\subseteq L^1$$ 满足',
        '',
        '$$\\sum_{j=1}^{\\infty} \\int |f_j| d\\mu < \\infty$$',
        '',
        '则 $$\\sum_j f_j$$ 几乎处处收敛到一个 $$L^1$$ 中的函数，并且可以逐项积分：',
        '',
        '$$\\int \\sum_{j=1}^{\\infty} f_j = \\sum_{j=1}^{\\infty} \\int f_j$$'
      ].join('\n'),
      notes: [
        '与「非负函数逐项积分」的区别：那里不需要任何收敛性假设（非负性保证了没有抵消），这里**需要** $\\Sigma \\int |f_{j}| < \\infty$ —— 用可积性换来「允许有正有负」。',
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
        '设 $$f \\in L^1(\\mu)$$。则对任意 $\\varepsilon > 0$，存在简单函数 $$\\varphi = \\sum_j a_j \\chi_{E_j}$$ 使',
        '',
        '$$\\int |f - \\varphi| d\\mu < \\varepsilon$$',
        '',
        '进一步，若 $\\mu$ 是 **$\\mathbb{R}$ 上的 Lebesgue–Stieltjes 测度**，还可以要求 $E_{j}$ 是开区间的有限并；甚至可以取一个**连续函数** $g$（在某个有界区间外恒为 0）使',
        '',
        '$$\\int |f - g| d\\mu < \\varepsilon$$'
      ].join('\n'),
      notes: [
        '意义：**简单函数与连续函数在 $L^{1}$ 里是稠密的**。所以很多命题只要对这两类函数验证就够了，再取极限。',
        '证明思路（笔记里的）：先把 $f$ 拆成 $\\operatorname{Re} f^{+}$、$\\operatorname{Re} f^{-}$、$\\operatorname{Im} f^{+}$、$\\operatorname{Im} f^{-}$ 四个非负部分，各自用简单函数逼近（简单函数逼近定理）；$\\mathbb{R}$ 的情形再把定义域切成有界块，用连续函数去顶半开区间的指示函数。',
        '⚠ 连续函数那一句**依赖 $\\mu$ 是 Lebesgue–Stieltjes 测度**：换一个任意测度，简单函数的逼近照旧，连续函数的说法就不成立了。'
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
        '设 $$f : X \\times [a, b] \\to \\mathbb{C}$$（$$-\\infty < a < b < \\infty$$），$$f(\\cdot, t)$$ 对每个 $$t \\in [a, b]$$ 都可积。记',
        '',
        '$$F(t) := \\int_X f(x, t) d\\mu(x)$$',
        '',
        '**(a) 连续性**：若存在 $$g \\in L^1(\\mu)$$ 使 $$|f(x, t)| \\le g(x)$$ 对一切 $$x, t$$ 成立，且对每个 $x$ 有 $$\\lim_{t\\to t_0} f(x, t) = f(x, t_0)$$，则',
        '',
        '$$\\lim_{t\\to t_0} F(t) = F(t_0)$$',
        '',
        '**(b) 求导**：若 $$\\partial f / \\partial t$$ 处处存在，且存在 $$g \\in L^1(\\mu)$$ 使 $$| \\partial f / \\partial t(x, t) | \\le g(x)$$ 对一切 $$x, t$$ 成立，则 $F$ 可微，且',
        '',
        '$$F\'(t) = \\int_X \\partial f / \\partial t(x, t) d\\mu(x)$$'
      ].join('\n'),
      notes: [
        '两个控制条件都是「用同一个 $g$ 控制一整族函数」—— 这正是 DCT 的标准用法。',
        '⚠ $g$ 必须属于 $L^{1}$（不能只是「局部有界」）。',
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
        '**① 一个方向是免费的。** 由 $f_{n} \\le f$ 与积分的单调性，$\\int f_{n} \\le \\int f$，故',
        '',
        '$$\\lim_{n\\to\\infty} \\int f_n \\le \\int f$$',
        '',
        '所以只需证另一边。',
        '',
        '**② 用一个简单函数从下面逼近 $f$。** 给定 $\\varepsilon > 0$，由 $\\int f$ 的定义（取上确界）存在简单函数 $\\varphi$ 使',
        '',
        '$$0 \\le \\varphi \\le f, \\quad  \\int \\varphi \\ge \\int f - \\varepsilon$$',
        '',
        '**③ 把 $\\varphi$ 搬进 $E_{n}$。** 令 $$E_n = \\{x : f_n(x) \\ge \\varphi(x)\\}$$。因为 $f_{n} \\uparrow f$ 且 $\\varphi \\le f$，集合列 $E_{n}$ 是递增的、且 $$\\bigcup_n E_n = X$$。于是',
        '',
        '$$\\int f_n \\ge \\int_{E_n} f_n \\ge \\int_{E_n} \\varphi$$',
        '',
        '**④ 让 $n \\to \\infty$。** 由简单函数积分的性质 (d)，$$A \\mapsto \\int_A \\varphi d\\mu$$ 是 $\\mathcal{M}$ 上的一个**测度**；把它用在递增列 $E_{n} \\uparrow X$ 上，用测度的下连续性：',
        '',
        '$$\\lim_{n\\to\\infty} \\int_{E_n} \\varphi = \\int_X \\varphi = \\int \\varphi$$',
        '',
        '所以存在 $N$ 使 $n > N$ 时 $$\\int_{E_n} \\varphi > \\int \\varphi - \\varepsilon$$，从而',
        '',
        '$$\\int f_n \\ge \\int \\varphi - \\varepsilon \\ge \\int f - 2\\varepsilon$$',
        '',
        '**⑤ 收尾。** 对一切 $n > N$ 成立，故 $$lim_n \\int f_n \\ge \\int f - 2\\varepsilon$$；令 $\\varepsilon \\to 0$ 得 $$lim_n \\int f_n \\ge \\int f$$。与 ① 合起来就是等号。∎',
        '',
        '$>$ ⭐ 整段证明只用了两样东西：**简单函数积分的 (d)**（把 $A \\mapsto \\int _A \\varphi$ 当作测度）和**积分的单调性**。单调性假设就是用来保证 ③ 里的 $E_{n}$ 递增到 $X$ 的。'
      ].join('\n'),
      note: '「先拿一个简单函数从下面顶住 $f$，再让 $E_{n}$ 爬上去」—— 这个套路在 Fatou 引理里还会再用一次。'
    },

    {
      id: 'imp.termwise',
      kind: 'implication',
      sources: ['thm.mct'],
      target: 'thm.termwise-integration',
      title: 'MCT ⟹ 逐项积分',
      proof: [
        '**① 先看两项。** 由非负性，$$\\{f_1 \\wedge  n\\}$$、$$\\{f_2 \\wedge  n\\}$$ 都是简单函数列的极限（简单函数逼近定理），于是',
        '',
        '$$\\int (f_1 + f_2) = \\lim_{n\\to\\infty} \\int (\\varphi_n + \\psi_n) = \\int f_1 + \\int f_2$$',
        '',
        '其中用到了 MCT（把 $f_{1} + f_{2}$ 写成极限）与简单函数积分的可加性 (b)。',
        '',
        '**② 归纳到有限项。** 逐次用 ① 得到',
        '',
        '$$\\int \\sum_{n=1}^{N} f_n = \\sum_{n=1}^{N} \\int f_n$$',
        '',
        '**③ 让 $N \\to \\infty$。** 部分和 $$\\sum_{n\\le N} f_n$$ 是 $L^{+}$ 中的**递增**列，极限正是 $$\\sum_{n=1}^{\\infty} f_n$$。对部分和列用一次 MCT：',
        '',
        '$$\\int \\sum_{n=1}^{\\infty} f_n = \\lim_{N\\to\\infty} \\int \\sum_{n=1}^{N} f_n = \\lim_{N\\to\\infty} \\sum_{n=1}^{N} \\int f_n = \\sum_{n=1}^{\\infty} \\int f_n$$',
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
        '设 $$g_n = \\inf_{k \\ge n} f_k$$，则',
        '',
        '$\\cdot$ $$g_n \\le f_k$$ 对一切 $k \\ge n$ 成立，故 $$\\int g_n \\le \\inf_{k\\ge n} \\int f_k$$；',
        '$\\cdot$ $$\\{g_n\\}$$ 是 $L^{+}$ 中的**递增**列（下确界取的集合越来越少），且 $$lim_n g_n = lim inf_k f_k$$。',
        '',
        '对递增列 $$\\{g_n\\}$$ 用 MCT：',
        '',
        '$$\\int \\liminf_{n\\to\\infty} f_n = \\int \\lim_{n\\to\\infty} g_n = \\lim_{n\\to\\infty} \\int g_n \\le \\lim_{n\\to\\infty} \\inf_{k \\ge n} \\int f_k = \\liminf_{n\\to\\infty} \\int f_n$$',
        '',
        '∎',
        '',
        '$>$ 整个证明就是把「liminf 定义成递增列的上确界」这件事翻译一遍 —— MCT 之外什么都没用。'
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
        '设 $$f_n \\to f$$ a.e.，$$|f_n| \\le g \\in L^1$$。',
        '',
        '**① $f \\in L^{1}$。** 由 $$|f| = lim|f_n| \\le g$$（a.e.）得 $f$ 可积。',
        '',
        '**② 上界方向：$$lim sup_n \\int f_n \\le \\int f$$。** 考虑 $$g - f_n \\ge 0$$（因为 $|f_{n}| \\le g$）。这列非负函数满足',
        '',
        '$$g - f_n \\to g - f\\quad  a.e.$$',
        '',
        '对它用 Fatou 引理：',
        '',
        '$$\\int (g - f) \\le lim inf_n \\int (g - f_n) = \\int g - lim sup_n \\int f_n$$',
        '',
        '（最后一步是因为 $$\\liminf_{-a_n} = -lim sup a_n$$。）移项即得 $$lim sup_n \\int f_n \\le \\int f$$。',
        '',
        '**③ 下界方向：$$lim inf_n \\int f_n \\ge \\int f$$。** 同样对 $$g + f_n \\ge 0$$ 用 Fatou：',
        '',
        '$$\\int (g + f) \\le lim inf_n \\int (g + f_n) = \\int g + lim inf_n \\int f_n$$',
        '',
        '移项得 $$lim inf_n \\int f_n \\ge \\int f$$。',
        '',
        '**④** ②与③合起来 $$lim sup \\le \\int f \\le lim inf$$，故极限存在且等于 $\\int f$。∎',
        '',
        '$>$ ⭐ 关键在于**控制函数提供的非负性**：$$g \\pm  f_n$$ 都是非负的，于是 Fatou 可以直接用。没有 $g$，这一步就写不出来。',
        '$>$ 移项之所以合法，是因为 $$g$$ 可积（$\\int g < \\infty$）—— 这正是「控制函数必须属于 $L^{1}$」而不能只是「有界」的原因。'
      ].join('\n')
    },

    {
      id: 'imp.differentiate-under-integral',
      kind: 'implication',
      sources: ['thm.dct'],
      target: 'thm.differentiate-under-integral',
      title: 'DCT ⟹ 在积分号下求极限与求导',
      proof: [
        '**(a)** 取任意 $$t_n \\to t_0$$，令 $$f_n(x) = f(x, t_n)$$。由题设 $$|f_n| \\le g \\in L^1$$、且 $$f_n \\to f(x,t_0)$$ 逐点，DCT 直接给出',
        '',
        '$$F(t_n) = \\int f_n \\to \\int f(\\cdot, t_0) = F(t_0)$$',
        '',
        '对一切序列 $t_{n}$ 成立，故 $$\\lim_{t\\to t_0} F(t) = F(t_0)$$。',
        '',
        '**(b)** 取任意 $$t_n \\to t_0$$，令',
        '',
        '$$h_n(x) = (f(x, t_n) - f(x, t_0)) / (t_n - t_0)$$',
        '',
        '则 $$F\'(t_0) = lim_n (F(t_n) - F(t_0)) / (t_n - t_0) = lim_n \\int h_n$$。要把它换成 $\\int \\lim h_{n}$ 就够了，而 DCT 正好提供这个能力：',
        '',
        '$\\cdot$ $$h_n \\to \\partial f / \\partial t(x, t_0)$$ 逐点（这是导数的定义）；',
        '$\\cdot$ **控制**：由中值定理，$$|h_n(x)| \\le \\sup_{t \\in [t_0, t_n]} | \\partial f / \\partial t(x, t) | \\le g(x)$$。',
        '',
        '于是',
        '',
        '$$F\'(t_0) = lim_n \\int h_n = \\int lim_n h_n = \\int \\partial f / \\partial t(x, t_0) d\\mu(x)$$',
        '',
        '∎',
        '',
        '$>$ ⚠ (b) 里那个「取 sup 的控制」必须提前假定：如果只对**每个** $t$ 假设有控制，是不够的 —— 需要**同一个 $g$** 控制整族偏导数。'
      ].join('\n')
    },

    {
      id: 'imp.termwise-L1',
      kind: 'implication',
      sources: ['thm.termwise-integration', 'prop.integral-zero-iff'],
      target: 'thm.termwise-L1',
      title: '非负逐项积分 + 零集判定 ⟹ L¹ 的逐项积分',
      proof: [
        '设 $$\\sum_j \\int |f_j| < \\infty$$。',
        '',
        '**① 绝对收敛 a.e.。** 令 $$g = \\sum_j |f_j| \\in L^+$$。由非负函数的逐项积分，',
        '',
        '$$\\int g = \\sum_j \\int |f_j| < \\infty$$',
        '',
        '由「积分有限的后果」，$g < \\infty \\text{a.e.}$，即 $$\\sum_j |f_j(x)| < \\infty$$ 对 a.e. x 成立。所以 $$\\sum_j f_j(x)$$ 对 a.e. x **绝对收敛**。',
        '',
        '**② 定义 $f$。** 令 $$f(x) = \\sum_j f_j(x)$$（在收敛的 a.e. 点上），其余点随意取 0。则 $$|f| \\le g$$，故 $f \\in L^{1}$。',
        '',
        '**③ 部分和被控制。** 部分和 $$s_N = \\sum_{j\\le N} f_j$$ 满足 $$|s_N| \\le g \\in L^1$$。',
        '',
        '**④ 用 DCT。** $$s_N \\to f$$ a.e.，且被 $g$ 控制，故',
        '',
        '$$\\int f = \\lim_{N\\to\\infty} \\int s_N = \\lim_{N\\to\\infty} \\sum_{j\\le N} \\int f_j = \\sum_{j=1}^{\\infty} \\int f_j$$',
        '',
        '（中间一步用 $L^{1}$ 的线性。）∎'
      ].join('\n')
    },

    {
      id: 'imp.integrals-equal-iff',
      kind: 'implication',
      sources: ['prop.integral-zero-iff'],
      target: 'prop.integrals-equal-iff',
      title: '积分为零 ⟹ 用积分识别函数',
      proof: [
        '记 $$h = f - g \\in L^1$$。三条之间的等价链条是',
        '',
        '$$(i) \\int_E f = \\int_E g\\quad  \\forall E \\in \\mathcal{M}\\quad  \\iff\\quad  \\int_E h = 0\\quad  \\forall E$$',
        '',
        '**$(i) \\implies (ii)$**：分别取 $$E = \\{h \\ge 0\\}$$ 与 $$E = \\{h < 0\\}$$。由 $$\\int_E h = 0$$ 且 $h$ 在 $E$ 上不变号，得 $$\\{h > 0\\}$$ 与 $$\\{h < 0\\}$$ 都是零集（否则积分为正/负），故 $$\\mu(\\{h \\ne 0\\}) = 0$$，于是 $$\\int|h| = 0$$。',
        '',
        '**$(ii) \\implies (iii)$**：$$\\int|h| = 0$$ 配合「积分为零 $\\iff$ 几乎处处为零」，直接得到 $h = 0 \\text{a.e.}$。',
        '',
        '**$(iii) \\implies (i)$**：$h = 0 \\text{a.e.}$ 时，对任意 $E$，$$\\int_E h$$ 的简单函数逼近里可以整体避开零集，故积分为 0。∎'
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
      note: 'MCT 对整列都要求在 $L^{+}$ 里。'
    },
    {
      id: 'def-link.lplus-complex',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'def.integral-complex',
      note: '复函数的积分就是把正负部丢回 $L^{+}$ 去算。'
    },
    {
      id: 'def-link.lplus-integrable',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'def.integrable',
      note: '可积 $\\iff \\int |f| < \\infty$，而 $|f| \\in L^{+}$。'
    },
    {
      id: 'def-link.integrable-dct',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.dct',
      note: 'DCT 的前提与结论都在 $L^{1}$ 里。'
    },
    {
      id: 'def-link.lplus-dct',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'thm.dct',
      note: 'DCT 的证明是正负部各用一次 Fatou —— 又回到 $L^{+}$。'
    },
    {
      id: 'def-link.nullset-zeromeasure',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'prop.integral-zero-iff',
      note: '「积分为零 $\\iff$ 几乎处处为零」里的 a.e. 就是相对于零集说的。'
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
      note: '这条命题说 $L^{1}$ 在代数上是个向量空间。'
    },
    {
      id: 'def-link.integrable-approx',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.approximation-L1',
      note: '逼近定理是在 $L^{1}$ 里说的（用的是 $\\int |f - \\varphi |$ 这个量）。'
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
