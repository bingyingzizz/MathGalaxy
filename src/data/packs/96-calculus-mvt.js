/* ==========================================================================
   内容包 · 初等微积分 ③：微分中值定理与 Taylor
   --------------------------------------------------------------------------
   新星团 `analysis.mvt`（13 点）。这一包造的是一个**翻译器**：

     把「函数值差了多少」翻译成「导数在某个中间点等于多少」。

   链条：Fermat 引理 → Rolle → Lagrange → Cauchy → L'Hôpital，
   顶点是 Taylor 公式 —— 用导数把一个函数**局部地重写成多项式**。

   ⚠️ 所有证明都只用到两样东西：闭区间上连续函数取到最值（`thm.evt`）与
      Rolle 的那一个「拉平」技巧。真正的外来输入是**实数完备性**。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：中值定理与 Taylor',
  nodes: [

    {
      id: 'def.local-extremum',
      cluster: 'analysis.mvt',
      type: 'definition',
      label: '局部极值',
      title: '局部极大与局部极小',
      regions: ['analysis'],
      tags: ['定义', '导数'],
      statement: [
        '设 $f$ 在 $x_0$ 的某个邻域上有定义。称 $x_0$ 是 $f$ 的',
        '',
        '- **局部极大值点**：存在 $\\delta > 0$，使 $|x - x_0| < \\delta$ 时 $f(x) \\le f(x_0)$；',
        '- **局部极小值点**：存在 $\\delta > 0$，使 $|x - x_0| < \\delta$ 时 $f(x) \\ge f(x_0)$。',
        '',
        '两者统称**局部极值点**。把 $\\le$、$\\ge$ 换成 $<$、$>$（对 $x \\ne x_0$）就得到**严格**局部极值。',
        '',
        '若 $x_0$ 在定义域**内部**且是局部极值点，则称它是**内点极值点**。'
      ].join('\n'),
      notes: '⭐ 「局部」二字是全部要害：定义只比较 $x_0$ 附近的值，与远处的值无关。所以局部极值点可以有很多个（$\\sin x$ 有无穷多个），而**整体**最值（最值定理给的那个）最多两个。\n\n⚠ 端点不算内点极值点 —— 这一点是 Fermat 引理的前提，因为端点处导数的**单侧**性会毁掉论证。\n\n⚠ 局部极大**不必**是整体最大：$f(x) = x^{3} - x$ 在 $x = -1$ 附近局部极大，但全局无界。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5', 'Spivak, Calculus, Ch. 11']
    },
    {
      id: 'thm.fermat',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: 'Fermat 引理',
      title: 'Fermat 引理：内点极值 $\\implies$ 导数为零',
      regions: ['analysis'],
      tags: ['定理', '导数'],
      statement: [
        '设 $f$ 在 $x_0$ 的某个邻域上有定义、在 $x_0$ 处可导，且 $x_0$ 是 $f$ 的**内点**局部极值点。则',
        '',
        '$$f\'(x_0) = 0$$'
      ].join('\n'),
      notes: '⭐ 这是整个微分学的**第一推动**：它把「极值」这个纯序的概念翻译成了「导数取零」这个纯代数的条件，于是求极值变成了解方程 $f\' = 0$。\n\n⚠ 三个前提一个都不能少：可导性（$|x|$ 在 $0$ 处是内点极小但不可导）、内点性（$f(x) = x$ 在 $[0, 1]$ 的端点 $0$ 处取最小值而 $f\'(0) = 1 \\ne 0$）、极值性。\n\n⚠ **逆命题不成立**：$f\'(x_0) = 0$ 不保证极值（$f(x) = x^{3}$ 在 $0$ 处）。满足 $f\' = 0$ 的点叫**驻点**，驻点要与不可导点、端点一起排队检查。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'thm.rolle',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: 'Rolle 中值定理',
      title: 'Rolle 中值定理（Rolle\'s Theorem）',
      regions: ['analysis'],
      tags: ['定理', '导数'],
      statement: [
        '设 $f$ 在闭区间 $[a, b]$ 上连续、在开区间 $(a, b)$ 内可导，且 $f(a) = f(b)$。则存在 $\\xi \\in (a, b)$ 使',
        '',
        '$$f\'(\\xi) = 0$$'
      ].join('\n'),
      notes: '⭐ 几何内容：两端等高时，中间必有一个水平切线点。它是中值定理家族里**唯一需要紧性**的一条（用最值定理找内部极值点），后面几条都是它换一件衣服。\n\n⚠ 两个前提同样不能丢：「$[a, b]$ 上连续」保证最值存在（紧性），「$(a, b)$ 内可导」保证那个极值点是内点、可以用 Fermat 引理。$f(a) = f(b)$ 若换成 $f(a) \\ne f(b)$ 就是 Lagrange 中值定理。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'thm.mvt',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: 'Lagrange 中值定理',
      title: 'Lagrange 中值定理',
      regions: ['analysis'],
      tags: ['定理', '导数'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上连续、在 $(a, b)$ 内可导。则存在 $\\xi \\in (a, b)$ 使',
        '',
        '$$f(b) - f(a) = f\'(\\xi)\\,(b - a)$$',
        '',
        '等价地 $f\'(\\xi) = \\dfrac{f(b) - f(a)}{b - a}$：**平均变化率必在某点被瞬时变化率取到**。'
      ].join('\n'),
      notes: '⭐ 这是整个微分学的**总开关**：凡是要「从逐点的导数信息推出整体结论」的定理，第一个动作都是「用中值定理把差写成导数」。单调性判据、常函数判据、L\'Hôpital、Taylor 公式、凸性判据，全都是它的推论。\n\n⚠ **$\\xi$ 不可控**：定理只保证存在，不说在哪 —— 这就是为什么中值定理不能用来**计算** $f(b) - f(a)$，只能用来证明不等式与结构性质。\n\n⚠ 一般情形的反例说明「连续」不能丢：$f(x) = x$ 在 $[0, 1] \\setminus \\{1/2\\}$ 上加一点跳跃就能让平均斜率无处可取。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5', 'Spivak, Calculus, Ch. 11']
    },
    {
      id: 'thm.cauchy-mvt',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: 'Cauchy 中值定理',
      title: 'Cauchy 中值定理（广义中值定理）',
      regions: ['analysis'],
      tags: ['定理', '导数'],
      statement: [
        '设 $f, g$ 在 $[a, b]$ 上连续、在 $(a, b)$ 内可导，且 $g\'(x) \\ne 0$ 在 $(a, b)$ 内处处成立。则存在 $\\xi \\in (a, b)$ 使',
        '',
        '$$\\frac{f(b) - f(a)}{g(b) - g(a)} = \\frac{f\'(\\xi)}{g\'(\\xi)}$$'
      ].join('\n'),
      notes: '⭐ 它不是 Lagrange 的「取 $g(x) = x$」那么简单：把两个函数的增量**同时**用同一个点 $\\xi$ 表示出来，这是 L\'Hôpital 法则能成立的全部理由。\n\n⚠ $g\' \\ne 0$ 的条件不可省 —— 它同时保证 $g(b) \\ne g(a)$（由 Rolle 定理），分母才有意义。\n\n⚠ 参数曲线读法：$t \\mapsto (g(t), f(t))$ 是一条曲线，结论说的是曲线在某个内点处的切线**平行于**两端点的连线 —— 与 Lagrange 的「平行于弦」是同一个几何意思，只是现在弦不必是函数的图像。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'cor.constant-iff-zero-derivative',
      cluster: 'analysis.mvt',
      type: 'corollary',
      label: '导数为零 ⟺ 常函数',
      title: '推论：区间上导数恒为零 $\\iff$ 函数为常数',
      regions: ['analysis'],
      tags: ['推论', '导数'],
      statement: [
        '设 $f$ 在区间 $I$ 上可导。则 $f$ 在 $I$ 上恒为常数，当且仅当对一切 $x \\in I$ 有',
        '',
        '$$f\'(x) = 0$$'
      ].join('\n'),
      notes: '⭐ 这条推论的含义比它看起来大：**「求导」在区间上丢失的信息只有一个常数**。所以「求原函数」这件事才有意义、才只差一个常数（微积分基本定理的另一半）。\n\n⚠ 定义域必须是**区间**：在 $(0, 1) \\cup (2, 3)$ 上导数处处为零的函数可以在两段上分别取不同的常数。\n\n⭐ 在测度论里它的地位被改写：$f\' = 0$ a.e. 而 $f$ 不必是常数（Cantor 函数）—— 「几乎处处」不足以锁住函数，那正是绝对连续要补的那一刀。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'prop.derivative-monotone',
      cluster: 'analysis.mvt',
      type: 'proposition',
      label: '导数符号 ⟹ 单调性',
      title: '命题：导数符号与单调性',
      regions: ['analysis'],
      tags: ['命题', '导数', '单调'],
      statement: [
        '设 $f$ 在区间 $I$ 上可导。',
        '',
        '- $f\' \\ge 0$ 在 $I$ 上处处成立 $\\implies$ $f$ 在 $I$ 上递增；',
        '- $f\' \\le 0$ 处处成立 $\\implies$ $f$ 递减；',
        '- $f\' > 0$ 处处成立 $\\implies$ $f$ **严格**递增。',
        '',
        '反之：若 $f$ 递增且可导，则 $f\' \\ge 0$。'
      ].join('\n'),
      notes: '⭐ 「$f\' > 0 \\implies$ 严格递增」的反命题**不成立**：$f(x) = x^{3}$ 严格递增而 $f\'(0) = 0$。要得到严格单调，只能用 Lagrange 中值定理逐段验证（每一段上导数不恒为零即可），不能指望点点为正。\n\n⚠ 「$f\' \\ge 0$ 处处成立」也推不出严格递增（常数函数）；反之那一半（递增 $\\implies f\' \\ge 0$）是差商的极限，与中值定理无关。\n\n⭐ 这是微积分里第一个「局部信息（导数）决定整体形状（单调）」的定理，也是求最值那套流程的理论依据。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'thm.lhopital',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: 'L\'Hôpital 法则',
      title: 'L\'Hôpital 法则（不定式极限）',
      regions: ['analysis'],
      tags: ['定理', '导数', '极限'],
      statement: [
        '设 $f, g$ 在 $x_0$ 的某去心邻域内可导、$g\' \\ne 0$，且',
        '',
        '$$\\lim_{x \\to x_0} f(x) = \\lim_{x \\to x_0} g(x) = 0$$',
        '',
        '（或两者都趋于 $\\pm\\infty$）。若 $\\lim_{x \\to x_0} \\dfrac{f\'(x)}{g\'(x)}$ 存在（允许 $\\pm\\infty$），则',
        '',
        '$$\\lim_{x \\to x_0} \\frac{f(x)}{g(x)} = \\lim_{x \\to x_0} \\frac{f\'(x)}{g\'(x)}$$'
      ].join('\n'),
      notes: '⭐ 它把「两个都趋于零的东西之比」换成了「导数之比」—— 唯一的依据就是 Cauchy 中值定理，而且是**逆命题式**的使用习惯：先算出导数之比好算，再宣布原比值相等。\n\n⚠ 三个前提不要漏：**不定式**（$0/0$ 或 $\\infty/\\infty$；$\\dfrac{0}{\\infty}$ 之类直接是 $0$，用不上它）、$g\' \\ne 0$、右边那个极限**存在**。最后一个最要命：$\\lim f\'/g\'$ 不存在时，右边不等于左边 —— 除了不能说，什么都不能说（典型：$f = x + \\sin x$、$g = x$）。\n\n⚠ 「$\\infty/\\infty$ 型」的证明比 $0/0$ 型麻烦一些（要先用 $g$ 的单调性做截断），但结论一样。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'def.higher-derivative',
      cluster: 'analysis.mvt',
      type: 'definition',
      label: '高阶导数与 C^k',
      title: '高阶导数与 $C^{k}$ 类',
      regions: ['analysis'],
      tags: ['定义', '导数'],
      statement: [
        '若 $f\'$ 在 $x_0$ 处可导，记',
        '',
        '$$f\'\'(x_0) := (f\')\'(x_0), \\qquad f^{(n+1)}(x_0) := \\bigl( f^{(n)} \\bigr)\'(x_0)$$',
        '',
        '称 $f^{(n)}$ 为 $f$ 的 **$n$ 阶导数**。约定 $f^{(0)} := f$。',
        '',
        '**连续可导类**：$f \\in C^{0}(I)$ 表示 $f$ 在 $I$ 上连续；递归地，$f \\in C^{k}(I)$ 表示 $f$ 可导且 $f\' \\in C^{k-1}(I)$；$f \\in C^{\\infty}(I)$ 表示对一切 $k$ 都有 $f \\in C^{k}(I)$（称光滑）。'
      ].join('\n'),
      notes: '⭐ 记号上的坑：$f^{(n)}$ 用的是**括号上标**，因为 $f^{n}$ 已经被「$f$ 的 $n$ 次幂」占用了。\n\n⭐ $C^{2}$ 是凸性判据的入场券（要谈 $f\'\'$ 就得先有二阶导数），$C^{n}$ 是 Taylor 公式的入场券。\n\n⚠ $C^{k}$ 是**严格递减**的一串（本图的真包含写 $\\subset$）：$C^{\\infty} \\subset C^{k} \\subset \\cdots \\subset C^{1} \\subset C^{0}$。反例：$f(x) = x^{2} \\sin(1/x)$（补 $f(0) = 0$）在 $0$ 处可导但导数不连续，所以 $f \\in C^{0} \\setminus C^{1}$。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    },
    {
      id: 'def.convex-function',
      cluster: 'analysis.mvt',
      type: 'definition',
      label: '凸函数',
      title: '凸函数与 Jensen 不等式',
      regions: ['analysis', 'order-theory'],
      tags: ['定义', '导数', '凸性'],
      statement: [
        '设 $I$ 是区间，$f : I \\to \\mathbb{R}$。称 $f$ **凸**，当且仅当对一切 $x, y \\in I$ 与一切 $t \\in [0, 1]$，',
        '',
        '$$f\\bigl( (1 - t) x + t y \\bigr) \\le (1 - t) f(x) + t f(y)$$',
        '',
        '即图像总在弦的**下方**。把 $\\le$ 换成 $\\ge$ 得**凹函数**（concave）。',
        '',
        '由此归纳得到 **Jensen 不等式**：若 $\\lambda_i \\ge 0$、$\\sum_i \\lambda_i = 1$，则',
        '',
        '$$f\\Bigl( \\sum_i \\lambda_i x_i \\Bigr) \\le \\sum_i \\lambda_i f(x_i)$$'
      ].join('\n'),
      notes: '⭐ 凸性是**序与几何**的性质（两点之间的值受两端值约束），不需要可导就能定义 —— 这一点很重要：$|x|$、$e^{x}$、$x^{2}$ 都凸，但 $|x|$ 在 $0$ 处不可导。\n\n⭐ Jensen 不等式是概率论与分析里大量不等式的统一来源（AM–GM、Hölder、$e^{\\mathbb{E}} \\le \\mathbb{E} e^{\\cdot}$）。\n\n⚠ 别把「凸」与「严格凸」混：严格凸要 $t \\in (0, 1)$、$x \\ne y$ 时不等号严格。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5', 'Rockafellar, Convex Analysis']
    },
    {
      id: 'thm.convex-criterion',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: '凸性的导数判据',
      title: '定理：凸 $\\iff$ 导数递增 $\\iff f\'\' \\ge 0$',
      regions: ['analysis'],
      tags: ['定理', '导数', '凸性'],
      statement: [
        '设 $f$ 在区间 $I$ 上可导。则 $f$ 是凸函数，当且仅当 $f\'$ 在 $I$ 上递增。',
        '',
        '若 $f$ 二阶可导，则 $f$ 凸 $\\iff f\'\'(x) \\ge 0$ 对一切 $x \\in I$ 成立。'
      ].join('\n'),
      notes: '⭐ 这条把凸性这个**几何**条件翻译成了**导数单调**这个分析条件 —— 与「导数符号 $\\implies$ 单调性」合起来，就得到完整的「二阶导数的符号 $\\implies$ 函数的弯曲方向」这条链。\n\n⚠ 只用二阶导数的**符号**判定凸性时要求二阶可导；$|x|$ 凸但无二阶导数，所以在 $C^{2}$ 之外必须回到导数递增或弦的判据。\n\n⚠ 严格凸（$f\'\' > 0$）与凸（$f\'\' \\ge 0$）同样不能互换：$f(x) = x^{4}$ 在 $0$ 处 $f\'\'(0) = 0$ 但仍严格凸。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5', 'Rockafellar, Convex Analysis']
    },
    {
      id: 'thm.taylor',
      cluster: 'analysis.mvt',
      type: 'theorem',
      label: 'Taylor 公式',
      title: 'Taylor 公式（带 Lagrange 余项）',
      regions: ['analysis'],
      tags: ['定理', '导数', 'Taylor'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上有 $n$ 阶连续导数、在 $(a, b)$ 内 $n+1$ 阶可导，取 $x_0 \\in [a, b]$。则对每个 $x \\in [a, b]$，$x \\ne x_0$，存在介于 $x_0$ 与 $x$ 之间的 $\\xi$，使',
        '',
        '$$f(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}\\,(x - x_0)^{k} + \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\,(x - x_0)^{n+1}$$',
        '',
        '右边第二项叫 **Lagrange 余项**。'
      ].join('\n'),
      notes: '⭐ 一句话：**高阶可导的函数局部就是多项式**，误差由那一项余项控制。这是初等微积分里唯一一个「把函数还原成有限信息」的定理，也是后来幂级数、解析函数那一整条线的入口。\n\n⭐ 余项的形状与中值定理同源：$n = 0$ 时 Taylor 公式**就是** Lagrange 中值定理。\n\n⚠ 余项只保证存在 $\\xi$，不给出位置；要**估计**误差必须另外知道 $f^{(n+1)}$ 的界（这是「余项写成 sup 形式」的用处）。\n\n⚠ 两个前提：区间上要足够多次可导；$\\xi$ 与 $x$、$n$ 都有关。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5', 'Spivak, Calculus, Ch. 20']
    },
    {
      id: 'prop.taylor-peano',
      cluster: 'analysis.mvt',
      type: 'proposition',
      label: 'Taylor 公式（Peano 余项）',
      title: '命题：Taylor 公式的 Peano 余项形式',
      regions: ['analysis'],
      tags: ['命题', '导数', 'Taylor'],
      statement: [
        '设 $f$ 在 $x_0$ 的邻域内有 $n$ 阶导数（第 $n$ 阶在 $x_0$ 处连续即可），则当 $x \\to x_0$ 时',
        '',
        '$$f(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}\\,(x - x_0)^{k} + o\\bigl( (x - x_0)^{n} \\bigr)$$',
        '',
        '即余项关于 $(x - x_0)^{n}$ 是**高阶无穷小**。'
      ].join('\n'),
      notes: '⭐ 与 Lagrange 余项的分工：**Peano 说的是「余项有多小」，Lagrange 说的是「余项等于什么」**。前者只要 $n$ 阶导数、只要局部，用来算极限最好用；后者要 $n+1$ 阶导数、要整个区间，用来估误差最好用。图上把两者分成两个节点就是为了这件事。\n\n⚠ Peano 余项是**局部**结论：$x$ 必须趋于 $x_0$，离开 $x_0$ 就没有任何控制。\n\n⭐ 典型用途：算 $\\lim_{x \\to 0} (\\sin x - x)/x^{3}$ 这类极限（把 $\\sin x$ 展到三阶，余项一除就没了）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 5']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.derivative-localextremum',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'def.local-extremum',
      note: '局部极值只在 $x_0$ 的邻域里比较函数值，是纯序的概念；但它与导数的联系（Fermat 引理）才是整个微分学的起点。'
    },
    {
      id: 'dep.derivative-higher',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'def.higher-derivative',
      note: '高阶导数就是把求导这个操作反复做：$f^{(n+1)} := (f^{(n)})\'$。'
    },
    {
      id: 'dep.interval-convex',
      kind: 'definition',
      definition: 'def.interval',
      usedBy: 'def.convex-function',
      note: '凸性的定义要求 $(1 - t)x + ty$ 仍落在定义域内 —— 这正是「定义域必须是区间」的原因，换成一般的集合这个定义根本写不出来。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.fermat',
      kind: 'implication',
      sources: ['def.local-extremum', 'def.derivative'],
      target: 'thm.fermat',
      title: '导数与局部极值的定义 $\\implies$ Fermat 引理',
      proof: [
        '设 $x_0$ 是内点局部极大值点（极小同理，把不等号反向）。由定义存在 $\\delta > 0$，使 $|x - x_0| < \\delta$ 时 $f(x) \\le f(x_0)$。',
        '',
        '对 $0 < h < \\delta$ 有 $f(x_0 + h) - f(x_0) \\le 0$，故差商 $\\le 0$；对 $-\\delta < h < 0$ 差商的分子 $\\le 0$ 而分母 $< 0$，故差商 $\\ge 0$。',
        '',
        '于是',
        '',
        '$$\\lim_{h \\to 0^{+}} \\frac{f(x_0 + h) - f(x_0)}{h} \\le 0, \\qquad \\lim_{h \\to 0^{-}} \\frac{f(x_0 + h) - f(x_0)}{h} \\ge 0$$',
        '',
        '而 $f$ 在 $x_0$ 可导，两个单侧极限都等于 $f\'(x_0)$，故 $f\'(x_0) \\le 0$ 且 $f\'(x_0) \\ge 0$，即 $f\'(x_0) = 0$。∎'
      ].join('\n'),
      note: '「内点」用在了 $h$ 可以取正负两侧 —— 若 $x_0$ 是端点，只有一侧的差商可谈，结论就不成立（$f(x) = x$ 在 $[0, 1]$ 的端点）。'
    },
    {
      id: 'imp.rolle',
      kind: 'implication',
      sources: ['thm.fermat', 'thm.evt'],
      target: 'thm.rolle',
      title: 'Fermat 引理 + 最值定理 $\\implies$ Rolle 中值定理',
      proof: [
        '设 $f$ 在 $[a, b]$ 上连续、在 $(a, b)$ 内可导、$f(a) = f(b)$。',
        '',
        '1. 由最值定理，$f$ 在 $[a, b]$ 上取到最大值 $M$ 与最小值 $m$。',
        '2. 若 $M = m$，则 $f$ 是常数，于是 $(a, b)$ 内任取 $\\xi$ 都有 $f\'(\\xi) = 0$。',
        '3. 否则 $M > m$。因为 $f(a) = f(b)$，两个数 $M, m$ 中至少有一个**不等于** $f(a)$，所以它在 $(a, b)$ 内的某点 $\\xi$ 处被取到 —— 这个 $\\xi$ 是内点极值点。',
        '4. 由 Fermat 引理，$f\'(\\xi) = 0$。∎'
      ].join('\n'),
      note: '第 3 步是全部技巧所在：「两端相等」保证最值不能在两个端点同时取到，于是必有一个最值被内点取到 —— 紧性（由最值定理提供）与可导性（由 Fermat 引理使用）就在这一点上汇合。'
    },
    {
      id: 'imp.mvt',
      kind: 'implication',
      sources: ['thm.rolle'],
      target: 'thm.mvt',
      title: 'Rolle 定理 $\\implies$ Lagrange 中值定理',
      proof: [
        '令',
        '',
        '$$g(x) := f(x) - \\frac{f(b) - f(a)}{b - a}\\,(x - a)$$',
        '',
        '即把 $f$ 减去那条弦。$g$ 在 $[a, b]$ 上连续、在 $(a, b)$ 内可导（差一个线性函数），且',
        '',
        '$$g(a) = f(a), \\qquad g(b) = f(b) - (f(b) - f(a)) = f(a)$$',
        '',
        '故 $g(a) = g(b)$。由 Rolle 定理，存在 $\\xi \\in (a, b)$ 使 $g\'(\\xi) = 0$，即',
        '',
        '$$f\'(\\xi) = \\frac{f(b) - f(a)}{b - a}$$',
        '',
        '整理即得 $f(b) - f(a) = f\'(\\xi)(b - a)$。∎'
      ].join('\n'),
      note: '「减去弦」这个手法（找一个辅助函数让它满足 Rolle 的条件）在中值定理家族里是标准动作，下面 Cauchy 版也是同一招。'
    },
    {
      id: 'imp.cauchy-mvt',
      kind: 'implication',
      sources: ['thm.rolle'],
      target: 'thm.cauchy-mvt',
      title: 'Rolle 定理 $\\implies$ Cauchy 中值定理',
      proof: [
        '先注意 $g(b) \\ne g(a)$：若 $g(b) = g(a)$，由 Rolle 定理存在内点使 $g\' = 0$，与 $g\' \\ne 0$ 矛盾。于是下面的分母不为零。',
        '',
        '令',
        '',
        '$$h(x) := \\bigl( f(b) - f(a) \\bigr) g(x) - \\bigl( g(b) - g(a) \\bigr) f(x)$$',
        '',
        '$h$ 在 $[a, b]$ 上连续、在 $(a, b)$ 内可导，且',
        '',
        '$$h(a) = (f(b) - f(a)) g(a) - (g(b) - g(a)) f(a), \\qquad h(b) = (f(b) - f(a)) g(b) - (g(b) - g(a)) f(b)$$',
        '',
        '两式相减得 $h(b) - h(a) = (f(b) - f(a))(g(b) - g(a)) - (g(b) - g(a))(f(b) - f(a)) = 0$。由 Rolle 定理存在 $\\xi \\in (a, b)$ 使 $h\'(\\xi) = 0$，即',
        '',
        '$$\\bigl( f(b) - f(a) \\bigr) g\'(\\xi) = \\bigl( g(b) - g(a) \\bigr) f\'(\\xi)$$',
        '',
        '两边同除 $g\'(\\xi)\\,(g(b) - g(a))$（都不为零）即得结论。∎'
      ].join('\n'),
      note: '辅助函数 $h$ 是「弦」的推广：$g(x) = x$ 时 $h$ 就是 Lagrange 版里那个 $g$ 的常数倍。'
    },
    {
      id: 'imp.constant-derivative',
      kind: 'implication',
      sources: ['thm.mvt'],
      target: 'cor.constant-iff-zero-derivative',
      title: 'Lagrange 中值定理 $\\implies$ 导数为零 $\\implies$ 常函数',
      proof: [
        '「$\\Longleftarrow$」平凡：常数函数的导数为零。',
        '',
        '「$\\implies$」设 $f\' = 0$ 在区间 $I$ 上处处成立。任取 $x < y \\in I$，对 $[x, y]$ 用 Lagrange 中值定理：存在 $\\xi \\in (x, y)$ 使',
        '',
        '$$f(y) - f(x) = f\'(\\xi)\\,(y - x) = 0$$',
        '',
        '故 $f(y) = f(x)$。由 $x, y$ 任意，$f$ 在 $I$ 上是常数。∎'
      ].join('\n'),
      note: '$I$ 必须是区间（任意两点之间都落在 $I$ 里）—— 这正是证明里要能对 $[x, y]$ 用中值定理的原因。'
    },
    {
      id: 'imp.derivative-monotone',
      kind: 'implication',
      sources: ['thm.mvt'],
      target: 'prop.derivative-monotone',
      title: 'Lagrange 中值定理 $\\implies$ 导数符号 $\\implies$ 单调性',
      proof: [
        '设 $f\' \\ge 0$ 在区间 $I$ 上处处成立。取 $x < y \\in I$，由中值定理存在 $\\xi \\in (x, y)$ 使',
        '',
        '$$f(y) - f(x) = f\'(\\xi)\\,(y - x) \\ge 0$$',
        '',
        '故 $f(x) \\le f(y)$，即 $f$ 递增。$f\' \\le 0$ 的情形同法。',
        '',
        '若 $f\' > 0$ 处处成立，则上式严格为正，于是 $f$ **严格**递增。',
        '',
        '反之设 $f$ 递增且可导。对 $h > 0$，$\\dfrac{f(x + h) - f(x)}{h} \\ge 0$，取极限得 $f\'(x) \\ge 0$。∎'
      ].join('\n'),
      note: '「严格递增」那一半只用到 $f\' > 0$ 的**处处**成立；若只知道「导数非负且不恒为零」，要严格单调得逐段用中值定理，不能用现在这个论证。'
    },
    {
      id: 'imp.lhopital',
      kind: 'implication',
      sources: ['thm.cauchy-mvt'],
      target: 'thm.lhopital',
      title: 'Cauchy 中值定理 $\\implies$ L\'Hôpital 法则',
      proof: [
        '先讲 $0/0$ 型在 $x \\to x_0^{+}$ 的情形。把 $f, g$ 在 $x_0$ 处补充定义为 $f(x_0) = g(x_0) = 0$，则它们在 $[x_0, x]$ 上连续、在 $(x_0, x)$ 内可导。对区间 $[x_0, x]$ 用 Cauchy 中值定理：存在 $\\xi \\in (x_0, x)$ 使',
        '',
        '$$\\frac{f(x)}{g(x)} = \\frac{f(x) - f(x_0)}{g(x) - g(x_0)} = \\frac{f\'(\\xi)}{g\'(\\xi)}$$',
        '',
        '当 $x \\to x_0^{+}$ 时 $\\xi \\to x_0^{+}$，故右端的极限就是 $\\lim_{x \\to x_0^{+}} f\'(x) / g\'(x)$。左邻域与双侧的情形同法。',
        '',
        '$\\infty/\\infty$ 型要多一步：对给定的 $\\varepsilon > 0$，先用 $g$ 在 $x_0$ 附近的单调性挑一个 $x_1$，把 $|g|$ 压得足够大，再用 Cauchy 中值定理处理 $[x_1, x]$，最后让 $x_1 \\to x_0$。∎'
      ].join('\n'),
      note: '注意证明里 $\\xi$ **依赖**于 $x$ —— 但这不妨碍取极限，因为 $x \\to x_0$ 时 $\\xi$ 被夹在 $x_0$ 与 $x$ 之间，必然也趋于 $x_0$。'
    },
    {
      id: 'imp.convex-criterion',
      kind: 'implication',
      sources: ['thm.mvt'],
      target: 'thm.convex-criterion',
      title: '中值定理 $\\implies$ 凸性的导数判据',
      proof: [
        '记 $R(x, y) := \\dfrac{f(x) - f(y)}{x - y}$（$x \\ne y$）。凸性的定义等价于：$R(x, y)$ 关于 $x$ 递增（固定 $y$）。',
        '',
        '**(i) 凸 $\\implies f\'$ 递增。** 由中值定理，对 $x < z$ 存在 $\\xi \\in (x, z)$ 使 $f\' (\\xi) = R(z, x)$；把上式里的 $y$ 分别取成 $x$ 与 $z$ 并比较，可得',
        '',
        '$$f\'(x) \\le R(z, x) \\le f\'(z)$$',
        '',
        '（左不等式对 $h \\to 0^{+}$ 取极限即得；右不等式同理。）故 $f\'$ 递增。',
        '',
        '**(ii) $f\'$ 递增 $\\implies$ 凸。** 给定 $x < z$ 与 $t \\in [0, 1]$，记 $w := (1 - t)x + tz$。对 $[x, w]$ 与 $[w, z]$ 各用一次中值定理，得两点 $\\xi_1 < \\xi_2$，于是 $f\'(\\xi_1) \\le f\'(\\xi_2)$，展开整理即得凸性不等式。',
        '',
        '**(iii) $f\'\' \\ge 0 \\iff f\'$ 递增**：这正是「导数符号 $\\implies$ 单调性」用在 $f\'$ 上。∎'
      ].join('\n'),
      note: '整条链子是「凸性（几何）$\\iff$ 斜率单调（序）$\\iff f\'$ 递增（分析）$\\iff f\'\' \\ge 0$（代数）」—— 每一段换的都是一件衣服。'
    },
    {
      id: 'imp.taylor',
      kind: 'implication',
      sources: ['thm.rolle', 'thm.cauchy-mvt'],
      target: 'thm.taylor',
      title: 'Rolle / Cauchy 中值定理 $\\implies$ Taylor 公式',
      proof: [
        '固定 $x \\ne x_0$，记多项式部分为',
        '',
        '$$P(t) := \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}\\,(t - x_0)^{k}$$',
        '',
        '待定的常数 $M$ 由方程 $f(x) = P(x) + M (x - x_0)^{n+1}$ 确定，即 $M := \\dfrac{f(x) - P(x)}{(x - x_0)^{n+1}}$。要证的就是 $M = \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}$ 对某个介于 $x_0$ 与 $x$ 之间的 $\\xi$ 成立。',
        '',
        '令辅助函数',
        '',
        '$$\\Phi(t) := f(t) - P(t) - M (t - x_0)^{n+1}$$',
        '',
        '则 $\\Phi$ 有 $n+1$ 阶导数，且 $\\Phi^{(k)}(x_0) = 0$（$k = 0, 1, \\ldots, n$，因为 $P$ 逐项消掉了 $f$ 在 $x_0$ 的各阶导数），而 $\\Phi(x) = 0$（$M$ 的定义）。',
        '',
        '于是 $\\Phi$ 在 $x_0$ 与 $x$ 之间有 $n+2$ 个零点（$x_0$ 处按重数算 $n+1$ 阶）。反复用 Rolle 定理 $n+1$ 次：$\\Phi\'$ 有 $n+1$ 个零点，$\\Phi\'\'$ 有 $n$ 个……最后 $\\Phi^{(n+1)}$ 在 $x_0$ 与 $x$ 之间有零点 $\\xi$。',
        '',
        '而 $\\Phi^{(n+1)}(t) = f^{(n+1)}(t) - M\\,(n+1)!$（$P$ 是 $n$ 次多项式，$n+1$ 阶导数为零），故 $0 = \\Phi^{(n+1)}(\\xi) = f^{(n+1)}(\\xi) - M(n+1)!$，即 $M = f^{(n+1)}(\\xi)/(n+1)!$。代回 $M$ 的定义即得结论。∎',
        '',
        '$n = 0$ 时这一串退化成 $f(x) = f(x_0) + f\'(\\xi)(x - x_0)$，正是 Lagrange 中值定理。'
      ].join('\n'),
      note: '「$\\Phi^{(n+1)}$ 有零点」这一步用的是 Rolle 定理被反复套用的形式：一个函数若有 $m$ 个零点，它的导函数在相邻零点之间各有一个零点 —— 每套一次零点数减一。'
    },
    {
      id: 'imp.taylor-peano',
      kind: 'implication',
      sources: ['thm.lhopital'],
      target: 'prop.taylor-peano',
      title: 'L\'Hôpital 法则 $\\implies$ Peano 余项',
      proof: [
        '记 $R(x) := f(x) - \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^{k}$。要证 $R(x) = o((x - x_0)^{n})$，即',
        '',
        '$$\\lim_{x \\to x_0} \\frac{R(x)}{(x - x_0)^{n}} = 0$$',
        '',
        '对分子分母反复用 L\'Hôpital 法则 $n$ 次：每次求导后分母降一阶、分子把多项式部分再消掉一项。$n$ 次之后',
        '',
        '$$\\frac{R^{(n)}(x)}{n!} = \\frac{f^{(n)}(x) - f^{(n)}(x_0)}{n!}$$',
        '',
        '由 $f^{(n)}$ 在 $x_0$ 连续，这个商当 $x \\to x_0$ 时趋于 $0$。∎'
      ].join('\n'),
      note: '所以「Peano 余项」这件事的代价是**第 $n$ 阶导数在 $x_0$ 连续**（否则 L\'Hôpital 的头几步代价太大）；而 Lagrange 余项要求的是 $n+1$ 阶可导，两者是不同方向的条件。'
    }
  ]
});
