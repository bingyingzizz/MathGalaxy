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
        '设 $\\nu$ 是符号测度或复测度。',
        '',
        '**(a)** $$\\nu \\ll  |\\nu|$$，并且',
        '',
        '$$| d\\nu / d|\\nu| | = 1\\quad  |\\nu|-\\text{a.e.}$$',
        '',
        '**(b)** 定义 $$L^1(\\nu) := L^1(|\\nu|)$$。若 $$f \\in L^1(\\nu)$$，则',
        '',
        '$$| \\int f d\\nu | \\le \\int |f| d|\\nu|$$',
        '',
        '**(c)** $$|\\nu_1 + \\nu_2| \\le |\\nu_1| + |\\nu_2|$$（即全变差满足三角不等式）。'
      ].join('\n'),
      notes: [
        '(a) 的来源：$$d\\nu = g\\cdot d|\\nu|$$ 对某个 $g$ 成立（Radon–Nikodym），且 $|g| = 1 \\text{a.e.}$ —— 因为全变差本来就是「把质量取绝对值」得到的。',
        '(b) 说明**积分理论对符号测度不需要重写**：把 $|\\nu |$ 当作底层的真测度，一切照旧。',
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
        '设 $\\mathcal{E}$ 是一族 $\\mathbb{R}^{n}$ 中的开球，$$U = \\bigcup\\mathcal{E}$$。若 $$c < m(U)$$，则存在 $\\mathcal{E}$ 中**两两不交**的球 $$B_1, \\ldots , B_k$$ 使',
        '',
        '$$\\sum_{j=1}^{k} m(B_j) > 3^{-n} c$$'
      ].join('\n'),
      notes: [
        '这是 **Vitali 型覆盖引理**的核心估计，极大定理全靠它。',
        '证明的挑法：先取**半径最大**的球 $$B_1$$；再取与 $$B_1$$ 不交的、半径最大的球 $$B_2$$；依此类推。',
        '为什么这样挑就够了：若某个 $$A_i \\in \\mathcal{E}$$ 没被取到，则必有某个 $$B_j$$ 与它相交 —— 取**下标最小**的那个 $$B_j$$。由挑选规则，$$A_i$$ 的半径不超过 $$B_j$$ 的半径（否则取 $$B_j$$ 时就会取到 $$A_i$$ 了）。把 $$B_j$$ 的半径放大 3 倍，就有 $$A_i \\subseteq 3B_j$$，于是 $$K \\subseteq \\bigcup_j 3B_j$$。',
        '剩下的就是计数：',
        '',
        '$$c < m(K) \\le 3^n \\sum_j m(B_j)\\quad  \\implies\\quad  \\sum_j m(B_j) > 3^{-n} c$$',
        '',
        '⚠ 注意膨胀因子是 **$3^{n}$**（而不是 $2^{n}$）—— 这正是因为「半径不超过」是弱不等式，需要一点余量。'
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
        '可测函数 $$f : \\mathbb{R}^n \\to \\mathbb{C}$$ 是**局部可积的**，当且仅当',
        '',
        '$$\\int_K |f(x)| dx < \\infty\\quad \\text{ 对每个有界可测集} K \\subseteq \\mathbb{R}^n$$',
        '',
        '局部可积函数全体记作 $$L^1_{loc}$$（或 $$L^1_{loc}(\\mathbb{R}^n)$$）。'
      ].join('\n'),
      notes: [
        '直觉：$$f$$ 可能「在无穷远处爆掉」，但在每个有限范围里都还好。',
        '例：常函数 1 属于 $L^{1}_{l}oc$ 但不属于 $L^{1}(\\mathbb{R}^{n})$；$$1/|x|$$ 在 $\\mathbb{R}^{n}$ 上属于 $L^{1}_{l}oc$（$n \\ge 2$ 时不属于 $L^{1}$）。',
        '⚠ 微分理论里必须是 $L^{1}_{l}oc$ 而不是 $L^{1}$：因为讨论的是**逐点**行为，而局部信息就够。'
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
        '设 $$f \\in L^1_{loc}$$，$$x \\in \\mathbb{R}^n$$，$$r > 0$$。定义',
        '',
        '$$A_r f(x) := \\frac{1}{m(B(r, x))} \\int_{B(r, x)} f(y) dy$$',
        '',
        '即 $f$ 在以 $x$ 为心、$r$ 为半径的球上的**平均值**。'
      ].join('\n'),
      notes: [
        '这是「把函数抹平」的算子：$$A_r f$$ 是 $f$ 的连续化版本（见下一条），$r \\to 0$ 时应当回到 $f$ 本身 —— 而那正是 Lebesgue 微分定理要说的事。',
        '⚠ 注意积分是**对 Lebesgue 测度 $m$** 取的，跟这一段的符号测度 $\\nu$ 无关。'
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
        '设 $$f \\in L^1_{loc}$$。则 $$A_r f(x)$$ 作为 $$(r, x)$$ 的函数是**联合连续**的。'
      ].join('\n'),
      notes: [
        '证明的骨架：把积分写成',
        '',
        '$$\\int_{B(r, x)} f(y) dy = \\int_{\\mathbb{R}^n} \\chi_{B(r, x)}(y) f(y) dy$$',
        '',
        '于是只需证 $$\\chi_{B(r,x)} \\to \\chi_{B(r_0,x_0)}$$（当 $$(r,x) \\to (r_0,x_0)$$）在足够好的意义上成立，再用 DCT。',
        '分两块看（取目标点 $$(r_0, x_0)$$）：',
        '',
        '$\\cdot$ 若 $$y$$ 在球内：$$\\varepsilon := r_0 - |y - x_0| > 0$$；当 $$|x - x_0| < \\varepsilon/2$$ 且 $$|r - r_0| < \\varepsilon/2$$ 时 $$|y - x| < r$$，故 $$\\chi = 1$$；',
        '$\\cdot$ 若 $$y$$ 在球外：$$\\varepsilon := |y - x_0| - r_0 > 0$$；同样的小扰动下 $$|y - x| > r$$，故 $$\\chi = 0$$。',
        '',
        '两边合起来说明：对**几乎处处的** $y$（只排除球面），特征函数最终稳定 —— 即逐点收敛 a.e.。',
        '控制函数取 $$\\chi_{B(r_0+1, x_0)}(y)\\cdot|f(y)| \\in L^1$$，由 **DCT** 得连续性。∎'
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
        '设 $$f \\in L^1_{loc}$$。定义',
        '',
        '$$Hf(x) := \\sup_{r > 0} \\frac{1}{m(B(r, x))} \\int_{B(r, x)} |f(y)| dy = \\sup_{r > 0} A_r |f|(x)$$',
        '',
        '称为 $f$ 的 **Hardy–Littlewood 极大函数**。'
      ].join('\n'),
      notes: [
        '直觉：$$Hf(x)$$ 是「$f$ 在 $x$ 附近所有尺度上的平均值里最大的那个」。',
        '它当然比 $f$ 大（$$Hf \\ge |f|$$ a.e.，因为可以取 $r \\to 0$），但好处是它**可测**：对每个固定的 $r$，$$x \\mapsto A_r|f|(x)$$ 可测（由联合连续性更强），而可数个可测函数的上确界仍可测。',
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
        '存在常数 $$C > 0$$（只依赖维数 $n$），使对一切 $$f \\in L^1$$ 与一切 $$\\alpha > 0$$：',
        '',
        '$$m(\\{x : Hf(x) > \\alpha\\}) \\le (C/\\alpha)\\cdot\\int |f(x)| dx$$'
      ].join('\n'),
      notes: [
        '这叫**弱 (1,1) 型**不等式：不能保证 $$Hf \\in L^1$$（事实上一般不是），但能保证它的**分布函数**被 $$1/\\alpha$$ 控制。',
        '在 $\\mathbb{R}^{n}$ 里 $$C = 3^n$$（这正是覆盖引理里那个膨胀因子）。',
        '⭐ 它的角色：**「平均值的例外集是小的」** —— 于是一切逐点收敛问题都可以用「例外集测度 $\\to 0$」来解决。'
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
        '设 $$f \\in L^1_{loc}$$。则',
        '',
        '$$\\lim_{r\\to0} A_r f(x) = f(x)\\quad \\text{ 对} \\text{a.e.} x \\in \\mathbb{R}^n$$'
      ].join('\n'),
      notes: [
        '⭐ 一句话：**可积函数几乎处处等于自己局部平均值的极限**。',
        '这也是「Lebesgue 积分比 Riemann 积分好」最直观的一条：Riemann 可积函数的连续性几乎处处成立，而这里连「连续」都不需要。',
        '证明的三段（下一条箭头里展开）：先用连续函数逼近 $\\to$ 再用极大定理把「坏集」压成零测。'
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
        '设 $$f \\in L^1_{loc}$$。定义',
        '',
        '$$L_f := \\{ x : \\lim_{r\\to0} \\frac{1}{m(B(r, x))} \\int_{B(r, x)} |f(y) - f(x)| dy = 0 \\}$$',
        '',
        '称为 $f$ 的 **Lebesgue 集**。'
      ].join('\n'),
      notes: [
        '⚠ 注意定义里积的是 $$|f(y) - f(x)|$$（与 $f$ 在该点的值比较），不是 $$|f(y)|$$。',
        '这么定义是为了让「可缩族」版本（下一条定理）能直接用 —— 那里需要的是**局部一致逼近**，而不是简单的平均值收敛。',
        '$x \\in L_f$ 常被说成「$x$ 是 $f$ 的 Lebesgue 点」。直觉：在这个点附近，$f$ 的振荡在平均意义下趋于 0。'
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
        '若 $$f \\in L^1_{loc}$$，则',
        '',
        '$$m(L_f^c) = 0$$',
        '',
        '即：**几乎每个点都是 Lebesgue 点**。'
      ].join('\n'),
      notes: [
        '证明的思路很巧：对每个复数 $c$，把微分定理用在函数 $$|f(x) - c|$$ 上，得到「除一个零集 $$E_c$$ 外，$$\\lim_{1/m(B)}\\int|f(y) - c|dy = |f(x) - c|$$」。',
        '然后取 **$\\mathbb{C}$ 的一个可数稠密子集 $D$**，令 $$E = \\bigcup_{c \\in D} E_c$$（可数并仍是零集）。对 $$x \\notin E$$ 与任意 $\\varepsilon > 0$，取 $$c \\in D$$ 使 $$|f(x) - c| < \\varepsilon$$，于是',
        '',
        '$$\\lim_{r\\to0} \\frac{1}{m(B(r,x))} \\int_{B(r,x)} |f(y) - f(x)| dy \\le |f(x) - c| + \\varepsilon < 2\\varepsilon$$',
        '',
        '令 $\\varepsilon \\to 0$ 即得。∎',
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
        '$\\mathbb{R}^n$ 的一族 Borel 子集 $$\\{E_r\\}_{r > 0}$$ 叫**可缩地趋于 $$x$$**，当且仅当',
        '',
        '$\\cdot$ $$E_r \\subseteq B(r, x)$$ 对每个 $r$ 成立；',
        '$\\cdot$ 存在 $$\\alpha > 0$$，使 $$m(E_r) > \\alpha\\cdot m(B(r, x))$$ 对一切 $r$ 成立。'
      ].join('\n'),
      notes: [
        '两个条件的含义：**装得进去**（$$E_r$$ 在球里）、**不能太瘪**（体积至少是球的 $\\alpha$ 倍）。',
        '典型例子：取 $$E_r = B(r, x)$$ 本身（$\\alpha = 1$）；或取 $$E_r$$ 为球内某个固定形状（如立方体）按比例缩放。',
        '反例：$$E_r$$ 取成球内一条细长的薄片 —— 体积比可以趋于 0，这样的族就不是「可缩地」趋于 $x$。',
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
        '设 $$f \\in L^1_{loc}$$，$$x \\in L_f$$。则对**每一个**可缩地趋于 $x$ 的族 $$\\{E_r\\}_{r>0}$$：',
        '',
        '$$\\lim_{r\\to0} \\frac{1}{m(E_r)} \\int_{E_r} |f(y) - f(x)| dy = 0, $$',
        '$$\\lim_{r\\to0} \\frac{1}{m(E_r)} \\int_{E_r} f(y) dy = f(x)$$'
      ].join('\n'),
      notes: [
        '证明是一行估计：由 $$E_r \\subseteq B(r,x)$$ 与 $$m(E_r) > \\alpha m(B(r,x))$$，',
        '',
        '$$\\frac{1}{m(E_r)} \\int_{E_r} |f - f(x)| \\le \\frac{1}{m(E_r)} \\int_{B(r,x)} |f - f(x)| \\le (1/\\alpha)\\cdot m(B(r,x)) \\int_{B(r,x)} |f - f(x)|$$',
        '',
        '而最右边由「$$x \\in L_f$$」趋于 0。∎',
        '⭐ 全部难度都在把 L_f 的定义选对（用 $$|f(y) - f(x)|$$ 而不是 $$|f(y)|$$）—— 选对之后这一步就是白送的。'
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
        '$\\mathbb{R}^{n}$ 上的 Borel 测度 $\\nu$ 是**正则的**，当且仅当',
        '',
        '$\\cdot$ $$\\nu(K) < \\infty$$ 对每个紧集 $K$ 成立；',
        '$\\cdot$ $$\\nu(E) = \\inf\\{ \\nu(U) : U\\text{ 开}, E \\subseteq U \\}$$ 对每个 $$E \\in \\mathfrak{B}_{\\mathbb{R}^n}$$ 成立（**外正则**）。',
        '',
        '符号测度或复测度 $\\nu$ 叫正则 $\\iff$ $$|\\nu|$$ 正则。'
      ].join('\n'),
      notes: [
        '第二条是「从外面用开集逼近」。在 $\\mathbb{R}^{n}$ 上它其实由第一条推出。',
        '**每个正则测度都是 $\\sigma$有限的**（用紧集的可数覆盖）。',
        '$f \\in L^+(\\mathbb{R}^n)$ 时，$$f\\cdot dm$$ 正则 $\\iff$ $$f \\in L^1_{loc}$$ —— 这条把「正则」与「局部可积」接了起来。'
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
        '设 $\\nu$ 是 $\\mathbb{R}^{n}$ 上的**正则**符号/复 Borel 测度，$$d\\nu = d\\lambda + f\\cdot dm$$ 是它关于 Lebesgue 测度 $m$ 的 Lebesgue–Radon–Nikodym 表示。则对 **m-a.e.** 的 $$x \\in \\mathbb{R}^n$$，',
        '',
        '$$\\lim_{r\\to0} \\nu(E_r) / m(E_r) = f(x)$$',
        '',
        '对**每一个**可缩地趋于 $x$ 的族 $$\\{E_r\\}_{r>0}$$ 成立。'
      ].join('\n'),
      notes: [
        '⭐ 这条定理把 Radon–Nikodym 导数从「抽象的存在物」变成了**可以逐点算出来的极限**：',
        '',
        '$$f(x) = \\lim_{r\\to0} \\nu(B(r, x)) / m(B(r, x))$$',
        '',
        '这正是微积分里「密度 $=$ 质量 / 体积」的严格版本，也是「RN 导数是导数的推广」这一说法的根据。',
        '证明的思路：先验证 $$d|\\nu| = d|\\lambda| + |f| dm$$，于是 $\\lambda$ 与 f dm 都正则、特别地 $$f \\in L^1_{loc}$$；把比值拆成',
        '',
        '$$\\nu(E_r) / m(E_r) = \\lambda(E_r) / m(E_r) + \\frac{1}{m(E_r)} \\int_{E_r} f\\cdot dm$$',
        '',
        '第二项由微分定理趋于 f(x)。第一项要证它是 0，用一个「分块 + 覆盖引理 $\\lambda (A) = m(A^{c}) = 0$」的论证把坏集压成零测。'
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
        '**① 把坏集换成球族。** 令 $$E_\\alpha = \\{x : Hf(x) > \\alpha\\}$$。对每个 $$x \\in E_\\alpha$$，由 Hf 的定义（上确界）存在 $$r_x > 0$$ 使',
        '',
        '$$A_{r_x}|f|(x) > \\alpha\\quad  \\iff\\quad  \\int_{B(r_x, x)} |f(y)| dy > \\alpha\\cdot m(B(r_x, x))$$',
        '',
        '于是 $$\\{B(r_x, x)\\}_{x \\in E_\\alpha}$$ 是 $$E_\\alpha$$ 的一个开球覆盖，且每个球都满足上面那个「超额」不等式。',
        '',
        '**② 用覆盖引理挑不交子族。** 任取 $$c < m(E_\\alpha)$$（先设 $m(E_\\alpha ) < \\infty$）。由**覆盖引理**，存在 $$x_1, \\ldots , x_k \\in E_\\alpha$$ 使 $$B_j = B(r_{x_j}, x_j)$$ 两两不交，且',
        '',
        '$$\\sum_j m(B_j) > 3^{-n} c$$',
        '',
        '**③ 把测度换成积分。** 由 ① 里每个球的超额不等式，',
        '',
        '$$c < 3^n \\sum_j m(B_j) < (3^n/\\alpha)\\cdot\\sum_j \\int_{B_j} |f| dy \\le (3^n/\\alpha)\\cdot\\int_{\\mathbb{R}^n} |f| dy$$',
        '',
        '（最后一步用的是：$$B_j$$ 两两不交，所以把积分加起来不超过整体积分。）',
        '',
        '**④ 令 $c \\to m(E_\\alpha )$。** 得到',
        '',
        '$$m(E_\\alpha) \\le (3^n/\\alpha)\\cdot\\int |f| dy$$',
        '',
        '即 $$C = 3^n$$。∎'
      ].join('\n'),
      note: '⭐ 整段只有一个「魔法」：覆盖引理保证挑出来的不交球虽然装不满 $$E_\\alpha$$，但总测度至少是 $$3^{-n}$$ 倍 —— 恰好够用。'
    },

    {
      id: 'imp.lebesgue-differentiation',
      kind: 'implication',
      sources: ['thm.maximal-theorem', 'thm.approximation-L1', 'lem.average-continuous'],
      target: 'thm.lebesgue-differentiation',
      title: '极大定理 + 连续函数逼近 ⟹ Lebesgue 微分定理',
      proof: [
        '**① 先局部化。** 由 $L^{1}_{l}oc$ 的定义与测度的可数可加性，只需对每个 $$N \\in \\mathbb{N}$$ 证明在球 $$\\{|x| \\le N\\}$$ 上几乎处处成立；把 $f$ 换成 $$f\\cdot\\chi_{B(N+1, 0)}$$ 后即可**设 $$f \\in L^1$$**。',
        '',
        '**② 用连续函数逼近。** 给定 $$\\varepsilon > 0$$，由「$L^{1}$ 里的逼近」，取**连续函数** $g$ 使',
        '',
        '$$\\int |g(y) - f(y)| dy < \\varepsilon$$',
        '',
        '**③ 连续情形是白送的。** 若 $g$ 连续，则对**每一个** $x$ 都有 $$A_r g(x) \\to g(x)$$（$$r \\to 0$$）—— 因为 $g$ 在 $x$ 附近近似为常数。',
        '',
        '**④ 把差值压住。** 对任意 $x$，',
        '',
        '$$\\sup_{r>0} |A_r f(x) - f(x)| = \\sup_r |A_r(f - g)(x) + (A_r g - g)(x) + (g - f)(x)| \\le H(f - g)(x) + |f - g|(x)$$',
        '',
        '（第一项用 $$|A_r(f-g)| \\le A_r|f-g| \\le H(f-g)$$，第二项由 ③ 取 $r \\to 0$）。',
        '',
        '**⑤ 估计坏集。** 令',
        '',
        '$$E_\\alpha = \\{x : \\sup_{r>0} |A_r f(x) - f(x)| > \\alpha\\}$$',
        '',
        '由 ④，$$E_\\alpha \\subseteq F_{\\alpha/2} \\cup \\{x : H(f-g)(x) > \\alpha/2\\}$$，其中 $$F_{\\alpha/2} = \\{|f - g| > \\alpha/2\\}$$。于是',
        '',
        '$$m(E_\\alpha) \\le 2\\varepsilon / \\alpha + 2C\\varepsilon / \\alpha$$',
        '',
        '（第一项用 Markov 不等式，第二项用**极大定理**。）',
        '',
        '**⑥ 令 $\\varepsilon \\to 0$。** 右边对**任意** $\\varepsilon > 0$ 成立，故 $$m(E_\\alpha) = 0$$ 对一切 $$\\alpha > 0$$ 成立。于是',
        '',
        '$$\\lim_{r\\to0} A_r f(x) = f(x)\\quad \\text{ 对一切} x \\notin \\bigcup_{m\\in\\mathbb{N}} E_{1/m}$$',
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
        '**① 对每个复数 $c$ 用一次微分定理。** 固定 $$c \\in \\mathbb{C}$$，把微分定理用在函数 $$h(x) = |f(x) - c|$$ 上（它是 $L^{1}_{l}oc$ 的）：存在零集 $$E_c$$，使对 $$x \\notin E_c$$，',
        '',
        '$$\\lim_{r\\to0} \\frac{1}{m(B(r,x))} \\int_{B(r,x)} |f(y) - c| dy = |f(x) - c|$$',
        '',
        '**② 只取可数多个 $c$。** 取 $\\mathbb{C}$ 的一个**可数稠密子集** $D$（比如 $$\\mathbb{Q} + i\\mathbb{Q}$$），令',
        '',
        '$$E = \\bigcup_{c \\in D} E_c$$',
        '',
        '可数多个零集之并仍是零集，故 $$m(E) = 0$$。',
        '',
        '**③ 在 $E$ 外验证**。设 $$x \\notin E$$，任给 $\\varepsilon > 0$，取 $$c \\in D$$ 使 $$|f(x) - c| < \\varepsilon$$。则',
        '',
        '$$\\frac{1}{m(B(r,x))} \\int_{B(r,x)} |f(y) - f(x)| dy \\le \\frac{1}{m(B(r,x))} \\int_{B(r,x)} |f(y) - c| dy + |f(x) - c|$$',
        '',
        '右边第一项由 ①（$$x \\notin E_c$$）在 $$r \\to 0$$ 时趋于 $$|f(x) - c|$$，于是整个右端的极限 $\\le$ $$|f(x) - c| + \\varepsilon < 2\\varepsilon$$。令 $\\varepsilon \\to 0$ 得极限为 0，即 $$x \\in L_f$$。',
        '',
        '故 $$L_f^c \\subseteq E$$，从而 $$m(L_f^c) = 0$$。∎'
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
        '设 $$x \\in L_f$$，$$\\{E_r\\}$$ 可缩地趋于 $x$，即 $$E_r \\subseteq B(r,x)$$ 且 $$m(E_r) > \\alpha\\cdot m(B(r,x))$$。',
        '',
        '**① 关键估计（一行）。** 因为 $$E_r \\subseteq B(r,x)$$，把积分域放大到球上只会变大；再用 $$m(E_r) > \\alpha m(B(r,x))$$ 把分母换小：',
        '',
        '$$\\frac{1}{m(E_r)} \\int_{E_r} |f(y) - f(x)| dy \\le \\frac{1}{m(E_r)} \\int_{B(r,x)} |f(y) - f(x)| dy \\le (1/\\alpha)\\cdot m(B(r,x)) \\int_{B(r,x)} |f(y) - f(x)| dy$$',
        '',
        '**② 收尾。** 由 $$x \\in L_f$$ 的定义，最右边当 $$r \\to 0$$ 时趋于 0。故第一个极限为 0。',
        '',
        '**③ 第二个极限。** 由',
        '',
        '$$| \\frac{1}{m(E_r)} \\int_{E_r} f - f(x) | \\le \\frac{1}{m(E_r)} \\int_{E_r} |f(y) - f(x)| dy \\to 0$$',
        '',
        '即得 $$\\frac{1}{m(E_r)} \\int_{E_r} f dy \\to f(x)$$。∎'
      ].join('\n'),
      note: '全部难度都被「把 L_f 的定义写成 $$\\int|f(y) - f(x)|$$」吸收掉了 —— 这也解释了为什么定义要那么写。'
    },

    {
      id: 'imp.rn-pointwise',
      kind: 'implication',
      sources: ['thm.differentiation-general', 'def.regular-measure', 'lem.covering'],
      target: 'thm.rn-pointwise',
      title: '微分定理 + 正则性 ⟹ RN 导数的点态公式',
      proof: [
        '设 $$d\\nu = d\\lambda + f\\cdot dm$$（$$\\lambda \\perp  m$$），$\\nu$ 正则。',
        '',
        '**① 先算全变差。** 由全变差的性质，$$d|\\nu| = d|\\lambda| + |f|\\cdot dm$$。既然 $\\nu$ 正则，$|\\nu |$ 正则，于是 $\\lambda$ 与 $$f\\cdot dm$$ 都正则；由「$$g\\cdot dm$$ 正则 $\\iff$ $$g \\in L^1_{loc}$$」得 $$f \\in L^1_{loc}$$。',
        '',
        '**② 拆比值。**',
        '',
        '$$\\nu(E_r) / m(E_r) = \\lambda(E_r) / m(E_r) + \\frac{1}{m(E_r)} \\int_{E_r} f\\cdot dm$$',
        '',
        '第二项由**可缩族的微分定理**趋于 $$f(x)$$（对 m-a.e. x）。所以只需证第一项趋于 0。',
        '',
        '**③ 把 $\\lambda$ 的坏点收集起来。** 不妨设 $$\\lambda \\ge 0$$，并取 $$A$$ 使 $$\\lambda(A) = m(A^c) = 0$$（$\\lambda \\perp m$ 的见证）。令',
        '',
        '$$F_k = \\{ x \\in A : \\limsup_{r\\to0} \\lambda(B(r, x)) / m(B(r, x)) > 1 / k \\}$$',
        '',
        '**④ 用正则性把 $\\lambda$ 压小。** 给定 $\\varepsilon > 0$，由 $\\lambda$ 的正则性（从外面用开集逼近）取开集 $$U \\supseteq A$$ 使 $$\\lambda(U) < \\varepsilon$$（注意 $$\\lambda(A) = 0$$，但 $U$ 比 $A$ 大，多出来的部分也可以做得任意小）。',
        '',
        '**⑤ 每个坏点配一个小球。** 对 $$x \\in F_k$$，由 $$F_k$$ 的定义与 $$B_x \\subseteq U$$（在 $A$ 附近取足够小的球即可），存在球 $$B_x$$ 使',
        '',
        '$$\\lambda(B_x) > (1/k)\\cdot m(B_x)$$',
        '',
        '**⑥ 覆盖引理再来一次。** 令 $$V_\\varepsilon = \\bigcup_{x \\in F_k} B_x$$（它是 $U$ 中的开集，故 $$\\lambda(V_\\varepsilon) \\le \\lambda(U) < \\varepsilon$$）。取 $$c < m(V_\\varepsilon)$$，由**覆盖引理**挑出不交的 $$B_{x_1}, \\ldots , B_{x_j}$$ 使 $$\\sum m(B_{x_i}) > 3^{-n} c$$。于是',
        '',
        '$$c < 3^n \\sum_i m(B_{x_i}) \\le 3^n k \\sum_i \\lambda(B_{x_i}) \\le 3^n k\\cdot\\lambda(V_\\varepsilon) \\le 3^n k \\varepsilon$$',
        '',
        '**⑦ 令 $\\varepsilon \\to 0$。** 得 $$m(V_\\varepsilon) = 0$$，故某个零集包含了一切 $$F_k$$，即 $$F_k$$ 全是零集，从而 $$\\lim_{r\\to0} \\lambda(B(r,x))/m(B(r,x)) = 0$$ 对 m-a.e. x 成立。',
        '',
        '**⑧ 从球换到可缩族。** 上面用的是球；要换成一般的可缩族 $$E_r$$，用',
        '',
        '$$\\lambda(E_r) / m(E_r) \\le \\lambda(B(r,x)) / m(E_r) \\le (1/\\alpha)\\cdot\\lambda(B(r,x)) / m(B(r,x)) \\to 0$$',
        '',
        '（第二个不等号用了 $$m(E_r) > \\alpha m(B(r,x))$$，并且 $$E_r \\subseteq B(r,x)$$ 使分子变大。）把 ⑦ 的结果搬过来即可。∎'
      ].join('\n'),
      note: '⭐ 这条把 Radon–Nikodym 导数彻底「算得出来」了：它就是在小球上质量比的极限 —— 正是「密度 $=$ 质量/体积」的严格版本。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.totalvariation-l1',
      kind: 'definition',
      definition: 'def.rn-derivative',
      usedBy: 'prop.L1-signed',
      note: '$d\\nu /d|\\nu |$ 就是一个 RN 导数。'
    },
    {
      id: 'def-link.integrable-l1signed',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.L1-signed',
      note: '$L^{1}(\\nu )$ 的定义直接搬用 $L^{1}(|\\nu |)$。'
    },
    {
      id: 'def-link.locally-integrable-average',
      kind: 'definition',
      definition: 'def.locally-integrable',
      usedBy: 'def.average-operator',
      note: '平均算子只在 $L^{1}_{l}oc$ 上定义。'
    },
    {
      id: 'def-link.average-maximal',
      kind: 'definition',
      definition: 'def.average-operator',
      usedBy: 'def.maximal-function',
      note: '极大函数就是对 $A_{r}|f|$ 取上确界。'
    },
    {
      id: 'def-link.locally-maximal',
      kind: 'definition',
      definition: 'def.locally-integrable',
      usedBy: 'def.maximal-function',
      note: '极大函数的定义域是 $L^{1}_{l}oc$。'
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
      note: '定理的第一个前提就是 $\\nu$ 正则。'
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
      note: '证明中间要推出 $f \\in L^{1}_{l}oc$。'
    }
  ]
});
