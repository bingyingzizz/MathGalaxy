/* ==========================================================================
   内容包 · 搜索补洞（一）：勒贝格数引理 · Riemann–Lebesgue 引理
   --------------------------------------------------------------------------
   用户报：「缺少 lebesgue 数这个节点」「搜索 Riemann Lebesgue 引理更是搜不到」。

   查证（补前）：全库 `勒贝格数 / Lebesgue number` **0 命中**；
   「Riemann–Lebesgue 引理」也**没有节点**（搜出来的两条是「Lebesgue 判据」与
   「Riemann 可积 ⟹ Lebesgue 可积」，都不是那个引理）。

   两条都是标准结果，各补一个节点：
     · def.lebesgue-number     勒贝格数（紧度量空间上开覆盖的「一致尺度」）
     · thm.riemann-lebesgue    Riemann–Lebesgue 引理（Fourier 系数趋于 0）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '勒贝格数与 Riemann–Lebesgue 引理',

  nodes: [

    {
      id: 'def.lebesgue-number',
      cluster: 'topology.metric',
      type: 'definition',
      label: '勒贝格数',
      title: '勒贝格数：紧度量空间上开覆盖的一致尺度',
      regions: ['topology'],
      tags: ['定义', '拓扑', '度量空间', '紧', '覆盖'],
      statement: [
        '**要解决什么问题**：紧性只保证「每个开覆盖有有限子覆盖」，但**没说每个点周围能有多小**。连续性的 $\\varepsilon$-论证需要「存在一个统一的尺度 $\\delta$，使任何直径小于 $\\delta$ 的集合都落在某个覆盖成员里」—— 这就是勒贝格数。',
        '',
        '设 $(X, d)$ 是**紧**度量空间，$\\mathcal{U} = \\{U_{i}\\}_{i \\in I}$ 是它的开覆盖。称 $\\lambda > 0$ 为该覆盖的**勒贝格数**，若',
        '',
        '$$\\operatorname{diam}(A) < \\lambda \\ \\Longrightarrow\\ A \\subseteq U_{i} \\ \\text{对某个}\\ i .$$',
        '',
        '**引理**：紧度量空间的每个开覆盖都有正勒贝格数。',
        '',
        '**证明。** 由紧性取有限子覆盖 $U_{1}, \\ldots, U_{n}$。令',
        '',
        '$$f(x) := \\max_{1 \\le j \\le n} d(x,\\, X \\setminus U_{j}) = \\max_{j}\\ \\inf_{y \\notin U_{j}} d(x, y) ,$$',
        '',
        '每个 $x \\mapsto d(x, X\\setminus U_{j})$ 是连续函数（距离函数连续），有限个的 max 仍连续；又因为 $\\{U_{j}\\}$ 覆盖 $X$，每个 $x$ 至少属于某个 $U_{j}$，于是 $d(x, X \\setminus U_{j}) > 0$，故 $f(x) > 0$ 处处成立。$X$ 紧、$f$ 连续 $\\implies$ $f$ 取到最小值 $\\lambda := \\min f > 0$（这里用到 $f > 0$ 处处成立：最小值不可能为 $0$）。',
        '',
        '于是任取 $A$ 且 $\\operatorname{diam}(A) < \\lambda$，取 $x \\in A$，设 $f(x) = d(x, X \\setminus U_{k})$ 取到（某个 $k$）。对任意 $y \\in A$ 有 $d(x, y) \\le \\operatorname{diam}(A) < \\lambda \\le d(x, X\\setminus U_{k})$，故 $y \\notin X \\setminus U_{k}$，即 $y \\in U_{k}$。因此 $A \\subseteq U_{k}$。$\\square$'
      ].join('\n'),
      notes: [
        '**它最常见的用途**：紧度量空间上**连续 $\\implies$ 一致连续**。证明只用三行：给 $\\varepsilon > 0$，取覆盖 $\\{B(x, \\varepsilon/2)\\}_{x \\in X}$ 的勒贝格数 $\\lambda$，则 $d(p,q) < \\lambda$ 推出 $p,q$ 落在同一个半径 $\\varepsilon/2$ 的球里，于是 $d(f p, f q) < \\varepsilon$。**开覆盖换成半径 $\\varepsilon/2$ 的球族**这一步，就是把「逐点的连续性」升级成「一致」的全部内容。',
        '⚠️ **勒贝格数只能保证存在，不能算出**：证明用的是 $f$ 的最小值（$f$ 由覆盖决定），实际求不出来，也不唯一（任何更小的正数也是勒贝格数）。所以它在证明里出现时永远是「取一个勒贝格数 $\\lambda$」，而不是具体数字。',
        '⚠️ **紧性不能去掉**：$(0,1)$ 上取覆盖 $\\{(0, 1 - 1/n)\\}_{n \\ge 2}$，任何 $\\lambda > 0$ 都能取到直径更小却跨过所有 $1 - 1/n$ 的集合，故没有正勒贝格数。$\\mathbb{Q} \\cap [0,1]$ 也一样（不紧）。',
        '⚠️ **与「$\\varepsilon$-网」不是一回事**：$\\varepsilon$-网是「选有限多个点覆盖」，勒贝格数是对**任意集族**说的尺度。紧度量空间上两者都由紧性保证，但一个给点集，一个给尺度。'
      ].join('\n\n'),
      refs: ['Munkres, Topology, 27（Lebesgue number lemma）', 'Rudin, Principles of Mathematical Analysis']
    },

    {
      id: 'thm.riemann-lebesgue',
      cluster: 'analysis.riemann',
      type: 'theorem',
      label: 'Riemann–Lebesgue 引理',
      title: 'Riemann–Lebesgue 引理：Fourier 系数趋于零',
      regions: ['topology'],
      tags: ['定理', '数学分析', '傅里叶级数', 'Riemann 积分', '振荡'],
      statement: [
        '**在说什么**：高频振荡把积分抹平。它既是 Fourier 级数收敛性的第一步，也是「Riemann 可积函数在频率轴上衰减」的定量说法。',
        '',
        '设 $f$ 在 $[a, b]$ 上 **Riemann 可积**。则',
        '',
        '$$\\lim_{|\\lambda| \\to \\infty} \\int_{a}^{b} f(x)\\, e^{i\\lambda x}\\, dx = 0 .$$',
        '',
        '取实部、虚部（或把 $e^{i\\lambda x}$ 换成 $\\cos \\lambda x$、$\\sin \\lambda x$）就是最常见的两条形式：**Fourier 系数 $\\hat{f}(n) \\to 0$（$|n| \\to \\infty$）**。'
      ].join('\n'),
      notes: [
        '**证明（阶梯函数逼近）。** 分三步，核心是「可积函数可以用阶梯函数在 $L^{1}$ 意义下逼近到任意精度」。',
        '',
        '① **阶梯函数**：设 $\\psi = \\sum_{k} c_{k}\\,\\mathbf{1}_{[x_{k-1}, x_{k}]}$ 是阶梯函数。直接算',
        '',
        '$$\\int_{a}^{b} \\psi(x)\\,e^{i\\lambda x}dx = \\sum_{k} c_{k}\\int_{x_{k-1}}^{x_{k}} e^{i\\lambda x}dx = \\sum_{k} c_{k}\\,\\frac{e^{i\\lambda x_{k}} - e^{i\\lambda x_{k-1}}}{i\\lambda} ,$$',
        '',
        '右端绝对值不超过 $\\frac{2\\sum_{k}|c_{k}|}{|\\lambda|} \\to 0$。所以结论对阶梯函数成立。',
        '',
        '② **逼近**：对 $\\varepsilon > 0$，取阶梯函数 $\\psi$ 使 $\\int_{a}^{b}|f - \\psi| < \\varepsilon/2$（Riemann 可积的定义直接给这一步：可积函数被阶梯函数在 $L^{1}$ 意义下逼近）。',
        '',
        '③ **合并**：',
        '',
        '$$\\Bigl|\\int_{a}^{b} f e^{i\\lambda x}\\Bigr| \\le \\int_{a}^{b} |f - \\psi| + \\Bigl|\\int_{a}^{b}\\psi\\, e^{i\\lambda x}\\Bigr| < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} ,$$',
        '',
        '最后一个不等号对足够大的 $|\\lambda|$ 成立（由①）。$\\square$',
        '',
        '**为什么它重要**：Fourier 系数趋于 $0$ 是 Fourier 级数收敛理论的入口（Riemann–Lebesgue 本身不足以给出逐点收敛，那需要 Dirichlet 核与分段光滑性）；在测度论里它升级成「$L^{1}$ 函数的 Fourier 变换在无穷远处趋于 $0$」（$L^{1}$ 情形的 Riemann–Lebesgue），进一步就是「$L^{2}$ 里 Fourier 变换是酉算子」。',
        '',
        '⚠️ **名字里两个人都要提**：只说「Riemann 引理」或「Lebesgue 引理」都不对（后者另有所指：可积的 Lebesgue 判据）。本图把它记作 `thm.riemann-lebesgue`，与 `thm.riemann-lebesgue-criterion`（可积  $\\iff$  不连续点零测，那是 **Lebesgue 判据**）是两个不同的东西 —— 搜的时候容易撞。',
        '⚠️ **「Riemann 可积」不能换成「有界」**：反例是 $f = \\mathbf{1}_{\\mathbb{Q}}$（Dirichlet 函数）—— 有界但不 Riemann 可积，且它的「积分」没有意义，定理无从谈起。至于 Lebesgue 可积情形，同样的证明用 $L^{1}$ 逼近（简单函数代替阶梯函数）即可。'
      ].join('\n\n'),
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6（振荡与逼近）', 'Zygmund, Trigonometric Series']
    }
  ],

  edges: [
    { id: 'dep-ln-compact', kind: 'definition',
      definition: 'def.compact', usedBy: 'def.lebesgue-number',
      note: '勒贝格数的存在性完全靠紧性（先取有限子覆盖）。' },
    { id: 'dep-ln-metric', kind: 'definition',
      definition: 'def.metric-space', usedBy: 'def.lebesgue-number',
      note: '「直径」与「距离函数」都要求有度量。' },
    { id: 'dep-ln-cover', kind: 'definition',
      definition: 'def.topology', usedBy: 'def.lebesgue-number',
      note: '开覆盖是拓扑概念，先有开集。' },

    { id: 'dep-rl-int', kind: 'definition',
      definition: 'def.riemann-integrable', usedBy: 'thm.riemann-lebesgue',
      note: '定理的假设（Riemann 可积）与证明里的阶梯函数逼近都在这条定义上。' },
    { id: 'dep-rl-sum', kind: 'definition',
      definition: 'def.riemann-sum', usedBy: 'thm.riemann-lebesgue',
      note: 'Riemann 积分由 Riemann 和定义 —— 证明里算阶梯函数的积分要用它。' }
  ]
});
