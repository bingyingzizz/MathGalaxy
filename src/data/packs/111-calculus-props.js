/* ==========================================================================
   内容包 · 初等微积分补遗：定义之后该有的性质
   --------------------------------------------------------------------------
   这一包只补「定义写完了、性质没跟上」的地方：

     prop.limit-basic                 极限唯一 / 有界 / 保号 / 子列
     prop.continuous-arithmetic       连续函数的和差积商、绝对值、复合
     prop.differentiable-implies-continuous  可导 ⟹ 连续
     thm.derivative-rules             线性、乘积、商、链式
     thm.elementary-derivatives       幂、三角、指数、对数、根号的导数
     thm.geometric-series             几何级数（所有判别法的标尺）
     thm.p-series                     p-级数

   ⭐ 前四条是 MVT / Taylor / L'Hôpital 全部证明的**前置许可证**；
     `thm.geometric-series` 是 `thm.root-test`、`thm.comparison-test`、
     `imp.banach-fixed-point` 里那句「几何级数收敛」的出处。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：定义之后的性质',
  nodes: [

    {
      id: 'prop.limit-basic',
      cluster: 'analysis.real',
      type: 'proposition',
      label: '极限的基本性质',
      title: '命题：极限的唯一性、有界性与保号性（Basic Properties of Limits）',
      regions: ['analysis'],
      tags: ['命题', '极限', '数列'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3'],
      statement: [
        '设数列 $\\{x_n\\} \\subseteq \\mathbb{R}$ 收敛到 $x$。则：',
        '',
        '**(i) 唯一性**：若 $x_n \\to x$ 且 $x_n \\to x\'$，则 $x = x\'$；',
        '',
        '**(ii) 有界性**：存在 $M$ 使 $|x_n| \\le M$ 对一切 $n$ 成立；',
        '',
        '**(iii) 保号性**：若 $x > 0$，则存在 $N$ 使 $n \\ge N$ 时 $x_n > x/2 > 0$；若 $x < 0$，则存在 $N$ 使 $n \\ge N$ 时 $x_n < x/2 < 0$；',
        '',
        '**(iv) 子列**：任何子列 $x_{n_k} \\to x$。'
      ].join('\n'),
      notes: '⭐ 这四条是 $\\varepsilon$-$N$ 语言的「第一批练习」，但后面每一处都在默认使用：唯一性给夹逼定理收尾，有界性给乘积法则（$|f(x)| \\le M$）用，保号性给倒数法则（$|g(x)| > |B|/2$）用，子列那条给聚点与紧性用。\n\n⭐ 保号性的常数取 $x/2$ 是个技巧：留出一半余量，后面才能对 $|x_n - x|$ 做估计而不必担心符号翻转。\n\n⚠ 有界**不**保证收敛（$(-1)^{n}$），保号**不**说明极限存在 —— 它们都是收敛的**后果**，不是判据。'
    },
    {
      id: 'prop.continuous-arithmetic',
      cluster: 'analysis.continuity',
      type: 'proposition',
      label: '连续函数的运算',
      title: '命题：连续函数的和差积商与复合（Algebra of Continuous Functions）',
      regions: ['analysis'],
      tags: ['命题', '连续', '运算'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 4'],
      statement: [
        '设 $f, g : \\mathbb{R} \\to \\mathbb{R}$ 在 $x_0$ 连续，$c \\in \\mathbb{R}$。则下列函数在 $x_0$ 连续：',
        '',
        '$$f + g, \\quad f - g, \\quad cf, \\quad fg, \\quad |f|;$$',
        '',
        '若 $g(x_0) \\ne 0$，则 $f/g$ 在 $x_0$ 连续。若 $g$ 在 $f(x_0)$ 连续，则复合 $g \\circ f$ 在 $x_0$ 连续。'
      ].join('\n'),
      notes: '⭐ 前五条由**极限的四则运算**（`prop.limit-arithmetic`）直接翻译过来：连续就是「极限等于函数值」，所以极限能做的运算连续也能做。\n\n⚠ 复合那条**不能**照搬：$\\lim_{x \\to x_0} f(x) = f(x_0)$ 与 $\\lim_{y \\to y_0} g(y) = g(y_0)$ 要拼成 $\\lim_{x \\to x_0} g(f(x)) = g(f(x_0))$，中间要过一道 $\\varepsilon$-$\\delta$ 的传递。\n\n⭐ 推论：多项式处处连续；有理函数在分母不为零处连续；由 `thm.elementary-derivatives` 与幂级数，$\\exp$、$\\sin$、$\\cos$ 也连续 —— 于是「初等函数在其定义域内连续」这句话是**证出来的**，不是约定。'
    },
    {
      id: 'prop.differentiable-implies-continuous',
      cluster: 'analysis.mvt',
      type: 'proposition',
      label: '可导 ⟹ 连续',
      title: '命题：可导蕴含连续（Differentiable $\\implies$ Continuous）',
      regions: ['analysis'],
      tags: ['命题', '导数', '连续'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5'],
      statement: [
        '若 $f$ 在 $x_0$ 可导，则 $f$ 在 $x_0$ 连续。'
      ].join('\n'),
      notes: '⭐ 一句话证明：$f(x) - f(x_0) = \\dfrac{f(x) - f(x_0)}{x - x_0}\\,(x - x_0)$，右边第一个因子趋于 $f\'(x_0)$、第二个趋于 $0$，乘积趋于 $0$。\n\n⚠ 逆命题不成立：$f(x) = |x|$ 在 $0$ 连续但不可导（左右导数差一个符号）。所以「连续」是比「可导」严格更弱的条件 —— 图上的层号里 $\\text{可导}$ 在 $\\text{连续}$ 之上。\n\n⭐ 这条在 `thm.derivative-rules` 的乘积法则里要用：$g(x) \\to g(x_0)$ 那一步就是它。'
    },
    {
      id: 'thm.derivative-rules',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: '求导法则',
      title: '定理：求导的四则运算与链式法则（Derivative Rules）',
      regions: ['analysis'],
      tags: ['定理', '导数', '运算'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5'],
      statement: [
        '设 $f, g$ 在 $x_0$ 可导，$c \\in \\mathbb{R}$。则',
        '',
        '$$(f \\pm g)\'(x_0) = f\'(x_0) \\pm g\'(x_0), \\qquad (cf)\'(x_0) = c\\,f\'(x_0),$$',
        '',
        '$$(fg)\'(x_0) = f\'(x_0)\\,g(x_0) + f(x_0)\\,g\'(x_0),$$',
        '',
        '$$\\left(\\frac{f}{g}\\right)\'(x_0) = \\frac{f\'(x_0)\\,g(x_0) - f(x_0)\\,g\'(x_0)}{g(x_0)^{2}} \\quad (g(x_0) \\ne 0),$$',
        '',
        '$$(g \\circ f)\'(x_0) = g\'(f(x_0))\\,f\'(x_0).$$'
      ].join('\n'),
      notes: '⭐ 乘积法则的证明要点是**加一项减一项**：$f(x)g(x) - f(x_0)g(x_0) = [f(x) - f(x_0)]\\,g(x) + f(x_0)[g(x) - g(x_0)]$。第一项里的 $g(x)$ 要用「可导 $\\implies$ 连续」换成 $g(x_0)$ —— 这就是为什么 `prop.differentiable-implies-continuous` 必须排在它前面。\n\n⚠ 链式法则**不能**直接写 $\\dfrac{\\Delta g}{\\Delta f}\\cdot\\dfrac{\\Delta f}{\\Delta x}$：$\\Delta f$ 可能为 $0$（$f$ 在 $x_0$ 附近取值相同），分母会消失。正确写法是把 $g$ 的增量写成「线性主部 + 余项」：$g(y) - g(y_0) = [g\'(y_0) + \\varepsilon(y)]\\,(y - y_0)$，其中 $\\varepsilon(y) \\to 0$。\n\n⭐ 商法则由乘积法则与 $\\left(\\dfrac{1}{g}\\right)\' = -\\dfrac{g\'}{g^{2}}$ 合成；后者是把 $\\dfrac{1}{g(x)} - \\dfrac{1}{g(x_0)} = -\\dfrac{g(x) - g(x_0)}{g(x)g(x_0)}$ 除以 $x - x_0$ 再取极限。'
    },
    {
      id: 'thm.elementary-derivatives',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: '初等函数的导数',
      title: '定理：初等函数的导数表（Derivatives of Elementary Functions）',
      regions: ['analysis'],
      tags: ['定理', '导数', '初等函数'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8'],
      statement: [
        '在各自的定义域内：',
        '',
        '$$(x^{n})\' = n x^{n-1} \\quad (n \\in \\mathbb{Z}), \\qquad (\\sqrt{x})\' = \\frac{1}{2\\sqrt{x}} \\quad (x > 0),$$',
        '',
        '$$(\\sin x)\' = \\cos x, \\qquad (\\cos x)\' = -\\sin x,$$',
        '',
        '$$(\\exp x)\' = \\exp x, \\qquad (\\ln x)\' = \\frac{1}{x} \\quad (x > 0).$$'
      ].join('\n'),
      notes: '⭐ 三个来源：$x^{n}$ 用乘积法则归纳（负指数用商法则）；$\\sin$、$\\cos$、$\\exp$ 由**幂级数**定义，所以求导就是**逐项求导**（`thm.power-series-analytic`）；$\\ln$ 是 $\\exp$ 的反函数，用链式法则从 $\\exp(\\ln y) = y$ 两边求导得到。\n\n⭐ $\\sqrt{x}$ 由 $x = (\\sqrt{x})^{2}$ 两边求导：$1 = 2\\sqrt{x}\\,(\\sqrt{x})\'$。\n\n⚠ 这张表是**定理**，不是定义的一部分：`def.trig-function` 与 `def.exp-function` 只用级数规定了函数值，导数要另外算。'
    },
    {
      id: 'thm.geometric-series',
      cluster: 'analysis.series',
      type: 'theorem',
      label: '几何级数',
      title: '定理：几何级数（Geometric Series）',
      regions: ['analysis'],
      tags: ['定理', '级数', '几何级数'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3'],
      statement: [
        '设 $q \\in \\mathbb{R}$。则级数 $\\sum_{n=0}^{\\infty} q^{n}$ 收敛**当且仅当** $|q| < 1$；此时',
        '',
        '$$\\sum_{n=0}^{\\infty} q^{n} = \\frac{1}{1 - q}.$$'
      ].join('\n'),
      notes: '⭐ 这是所有级数判别法的**标尺**：比较判别法、根值判别法、比值判别法最后都归结到「某个几何级数收敛」。`imp.root-test` 与 `imp.banach-fixed-point` 里那句「几何级数收敛」指的就是这条。\n\n⭐ $|q| < 1$ 时 $q^{n} \\to 0$ 的证明要用 Bernoulli + 阿基米德性：写 $1/|q| = 1 + h$（$h > 0$），则 $(1+h)^{n} \\ge 1 + nh$，于是 $|q|^{n} \\le \\dfrac{1}{1 + nh} \\le \\dfrac{1}{n h}$ 可以任意小。\n\n⚠ $|q| \\ge 1$ 时通项不趋于 $0$，级数必发散 —— 这一半不需要任何判据。'
    },
    {
      id: 'thm.p-series',
      cluster: 'analysis.series',
      type: 'theorem',
      label: 'p-级数',
      title: '定理：$p$-级数的敛散性（$p$-Series）',
      regions: ['analysis'],
      tags: ['定理', '级数', 'p-级数'],
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3'],
      statement: [
        '设 $p \\in \\mathbb{R}$。则级数',
        '',
        '$$\\sum_{n=1}^{\\infty} \\frac{1}{n^{p}}$$',
        '',
        '收敛**当且仅当** $p > 1$。'
      ].join('\n'),
      notes: '⭐ $p = 1$ 是调和级数（发散），$p = 2$ 是 $\\sum 1/n^{2} = \\pi^{2}/6$（收敛）—— 两者是「判别法在边界上失灵」的标准例子：根值判别法对它们都给出 $\\alpha = 1$。\n\n⭐ 证明是 `thm.cauchy-condensation`（Cauchy 凝聚判别法）最漂亮的应用：$a_n = n^{-p}$ 单调递减时，原级数收敛 $\\iff$ $\\sum 2^{k} a_{2^{k}} = \\sum (2^{1-p})^{k}$ 收敛，而后者是公比 $2^{1-p}$ 的几何级数，收敛 $\\iff$ $2^{1-p} < 1 \\iff p > 1$。'
    }
  ],

  edges: [

    {
      id: 'imp.limit-basic',
      kind: 'implication',
      sources: ['def.sequence-limit', 'prop.order-rules'],
      target: 'prop.limit-basic',
      title: '$\\varepsilon$-$N$ 定义 $\\implies$ 极限的基本性质',
      proof: [
        '**(i)** 设 $x_n \\to x$、$x_n \\to x\'$ 且 $x \\ne x\'$，不妨 $x < x\'$。取 $\\varepsilon = (x\' - x)/2 > 0$，则 $n$ 充分大时同时有 $|x_n - x| < \\varepsilon$、$|x_n - x\'| < \\varepsilon$，于是',
        '',
        '$$x\' - x \\le |x\' - x_n| + |x_n - x| < 2\\varepsilon = x\' - x,$$',
        '',
        '矛盾。',
        '',
        '**(ii)** 取 $\\varepsilon = 1$，存在 $N$ 使 $n \\ge N$ 时 $|x_n - x| < 1$，故 $|x_n| \\le |x| + 1$。令 $M := \\max\\{|x_1|, \\ldots, |x_{N-1}|, |x| + 1\\}$ 即可。',
        '',
        '**(iii)** 设 $x > 0$，取 $\\varepsilon = x/2$，则 $n \\ge N$ 时 $|x_n - x| < x/2$，即 $x_n > x - x/2 = x/2 > 0$。$x < 0$ 时对 $-x_n$ 用同一结论。',
        '',
        '**(iv)** 若 $n_k \\ge k$（子列指标的单调性），则 $n_k \\ge N$ 当 $k \\ge N$，于是 $|x_{n_k} - x| < \\varepsilon$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.continuous-arithmetic',
      kind: 'implication',
      sources: ['def.continuous', 'prop.limit-arithmetic'],
      target: 'prop.continuous-arithmetic',
      title: '连续的定义 + 极限四则运算 $\\implies$ 连续函数的运算',
      proof: [
        '前五条：连续等价于 $\\lim_{x \\to x_0} f(x) = f(x_0)$，把 `prop.limit-arithmetic` 的结论逐条翻译过来即可（和、差、数乘、积、绝对值）。',
        '',
        '**商。** 由 $g(x_0) \\ne 0$ 与保号性，$g$ 在 $x_0$ 附近不为零，再用极限的商法则。',
        '',
        '**复合。** 给定 $\\varepsilon > 0$。$g$ 在 $y_0 := f(x_0)$ 连续，故存在 $\\eta > 0$ 使 $|y - y_0| < \\eta \\implies |g(y) - g(y_0)| < \\varepsilon$。$f$ 在 $x_0$ 连续，故存在 $\\delta > 0$ 使 $|x - x_0| < \\delta \\implies |f(x) - f(x_0)| < \\eta$。于是 $|x - x_0| < \\delta \\implies |g(f(x)) - g(f(x_0))| < \\varepsilon$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.differentiable-continuous',
      kind: 'implication',
      sources: ['def.derivative', 'prop.limit-arithmetic'],
      target: 'prop.differentiable-implies-continuous',
      title: '导数定义 $\\implies$ 可导蕴含连续',
      proof: [
        '对 $x \\ne x_0$，',
        '',
        '$$f(x) - f(x_0) = \\frac{f(x) - f(x_0)}{x - x_0}\\,(x - x_0).$$',
        '',
        '由可导性，第一个因子当 $x \\to x_0$ 时趋于 $f\'(x_0)$；第二个因子趋于 $0$。由极限的乘积法则（`prop.limit-arithmetic`），$f(x) - f(x_0) \\to 0$，即 $f(x) \\to f(x_0)$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.derivative-rules',
      kind: 'implication',
      sources: ['def.derivative', 'prop.limit-arithmetic', 'prop.differentiable-implies-continuous'],
      target: 'thm.derivative-rules',
      title: '导数定义 + 极限四则运算 $\\implies$ 求导法则',
      proof: [
        '**线性。** 差商 $(f \\pm g)(x) - (f \\pm g)(x_0)$ 拆成两个差商之和，取极限。',
        '',
        '**乘积。** 加一项减一项：',
        '',
        '$$\\frac{(fg)(x) - (fg)(x_0)}{x - x_0} = \\frac{f(x) - f(x_0)}{x - x_0}\\,g(x) + f(x_0)\\,\\frac{g(x) - g(x_0)}{x - x_0}.$$',
        '',
        '第一项：差商 $\\to f\'(x_0)$，$g(x) \\to g(x_0)$（可导 $\\implies$ 连续），乘积 $\\to f\'(x_0)g(x_0)$。第二项 $\\to f(x_0)g\'(x_0)$。',
        '',
        '**倒数。** 对 $g(x_0) \\ne 0$，$x$ 靠近 $x_0$ 时 $g(x) \\ne 0$，且',
        '',
        '$$\\frac{1}{g(x)} - \\frac{1}{g(x_0)} = -\\frac{g(x) - g(x_0)}{g(x)\\,g(x_0)},$$',
        '',
        '除以 $x - x_0$ 后两个因子分别趋于 $g\'(x_0)$ 与 $-1/g(x_0)^{2}$。商法则再由乘积法则合成。',
        '',
        '**链式。** 记 $y_0 = f(x_0)$。由 $g$ 在 $y_0$ 可导，存在函数 $\\varepsilon$ 使 $\\varepsilon(y) \\to 0$（$y \\to y_0$）且',
        '',
        '$$g(y) - g(y_0) = \\bigl(g\'(y_0) + \\varepsilon(y)\\bigr)(y - y_0).$$',
        '',
        '取 $y = f(x)$、$y_0 = f(x_0)$，除以 $x - x_0$：',
        '',
        '$$\\frac{g(f(x)) - g(f(x_0))}{x - x_0} = \\bigl(g\'(f(x_0)) + \\varepsilon(f(x))\\bigr)\\,\\frac{f(x) - f(x_0)}{x - x_0}.$$',
        '',
        '因 $f$ 连续，$x \\to x_0$ 时 $f(x) \\to f(x_0)$，故 $\\varepsilon(f(x)) \\to 0$；第二个因子 $\\to f\'(x_0)$。取极限得 $(g \\circ f)\'(x_0) = g\'(f(x_0))f\'(x_0)$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.elementary-derivatives',
      kind: 'implication',
      sources: ['def.power', 'thm.derivative-rules', 'thm.power-series-analytic', 'def.log-function'],
      target: 'thm.elementary-derivatives',
      title: '求导法则 + 幂级数逐项求导 $\\implies$ 初等函数导数表',
      proof: [
        '**$x^{n}$（$n \\ge 0$）**：对 $n$ 归纳，$n = 0$ 时为常函数；归纳步用乘积法则与 $(x)\' = 1$。$n < 0$ 时用商法则 $(x^{n})\' = \\left(1/x^{-n}\\right)\'$。',
        '',
        '**$\\exp$、$\\sin$、$\\cos$**：三者都由收敛半径 $+\\infty$ 的幂级数定义，由 `thm.power-series-analytic` 可在收敛区间内逐项求导：',
        '',
        '$$(\\exp x)\' = \\sum_{n \\ge 1} \\frac{n x^{n-1}}{n!} = \\sum_{m \\ge 0} \\frac{x^{m}}{m!} = \\exp x,$$',
        '',
        '$$(\\sin x)\' = \\sum_{k \\ge 0} \\frac{(-1)^{k}(2k+1)x^{2k}}{(2k+1)!} = \\cos x, \\qquad (\\cos x)\' = -\\sin x \\ \\text{同理}.$$',
        '',
        '**$\\ln$**：由 $\\exp(\\ln y) = y$（$y > 0$）两边求导，链式法则给 $\\exp(\\ln y)\\,(\\ln y)\' = 1$，即 $y\\,(\\ln y)\' = 1$。',
        '',
        '**$\\sqrt{x}$**：由 $x = (\\sqrt{x})^{2}$ 两边求导得 $1 = 2\\sqrt{x}\\,(\\sqrt{x})\'$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.geometric-series',
      kind: 'implication',
      sources: ['def.series', 'thm.bernoulli', 'cor.archimedean-epsilon'],
      target: 'thm.geometric-series',
      title: '部分和公式 + Bernoulli $\\implies$ 几何级数',
      proof: [
        '**$|q| < 1$。** 部分和（$q \\ne 1$）',
        '',
        '$$s_N = \\sum_{n=0}^{N} q^{n} = \\frac{1 - q^{N+1}}{1 - q}.$$',
        '',
        '要证 $q^{N} \\to 0$。写 $1/|q| = 1 + h$（$h > 0$）。由 Bernoulli，$(1 + h)^{N} \\ge 1 + Nh$，故',
        '',
        '$$|q|^{N} \\le \\frac{1}{1 + Nh} \\le \\frac{1}{Nh}.$$',
        '',
        '给定 $\\varepsilon > 0$，由 `cor.archimedean-epsilon` 取 $N$ 使 $1/(Nh) < \\varepsilon$。于是 $s_N \\to 1/(1-q)$。',
        '',
        '**$|q| \\ge 1$。** 此时 $|q^{n}| \\ge 1$，通项不趋于 $0$，由级数收敛的必要条件（`thm.cauchy-criterion-series`）发散。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.p-series',
      kind: 'implication',
      sources: ['thm.cauchy-condensation', 'thm.geometric-series'],
      target: 'thm.p-series',
      title: '凝聚判别法 + 几何级数 $\\implies$ p-级数',
      proof: [
        '**$p \\le 0$**：$1/n^{p} \\ge 1$，通项不趋于 $0$，发散。',
        '',
        '**$p > 0$**：$a_n = n^{-p}$ 非负且单调递减。由 Cauchy 凝聚判别法（`thm.cauchy-condensation`），',
        '',
        '$$\\sum_{n \\ge 1} \\frac{1}{n^{p}} \\ \\text{收敛} \\iff \\sum_{k \\ge 0} 2^{k} \\cdot \\frac{1}{(2^{k})^{p}} = \\sum_{k \\ge 0} \\left(2^{1-p}\\right)^{k} \\ \\text{收敛}.$$',
        '',
        '右边是公比 $q = 2^{1-p}$ 的几何级数。由 `thm.geometric-series`，它收敛 $\\iff$ $q < 1$ $\\iff$ $2^{1-p} < 1$ $\\iff$ $p > 1$。$\\blacksquare$'
      ].join('\n')
    }
  ]
});
