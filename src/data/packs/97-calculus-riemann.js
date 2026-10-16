/* ==========================================================================
   内容包 · 初等微积分 ④：Riemann 积分
   --------------------------------------------------------------------------
   新星团 `analysis.riemann`（18 点）。这一包造的是**面积**：

     分割 → 标记和 / 上和下和 → 可积判据 → 微积分基本定理

   两条最重要的边：
     · `thm.riemann-lebesgue-criterion`：可积 ⟺ 不连续点集是**零测集**
       —— 这是初等微积分与测度论第一次真正接上头的地方；
     · `prop.riemann-implies-lebesgue`：Riemann 可积 ⟹ Lebesgue 可积且两个积分相等
       —— 于是「两个积分」不是两种理论，而是同一个东西的两个定义域。

   ⚠️ 公式里不放汉字。记号一律走 notation.js（新记号已登记：$U(f, P)$、$L(f, P)$、
      $\\Delta x_i$、$\\omega_i$、$\\int_a^b f$）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：Riemann 积分',
  nodes: [

    {
      id: 'def.partition',
      cluster: 'analysis.riemann',
      type: 'definition',
      label: '分割',
      title: '分割与加细（Partition）',
      regions: ['analysis'],
      tags: ['定义', '积分'],
      statement: [
        '闭区间 $[a, b]$ 的一个**分割**是一组有限点',
        '',
        '$$P = \\{ a = x_0 < x_1 < \\cdots < x_n = b \\}$$',
        '',
        '第 $i$ 个小区间记 $I_i := [x_{i-1}, x_i]$，长度记 $\\Delta x_i := x_i - x_{i-1}$。分割的**模**是',
        '',
        '$$\\|P\\| := \\max_{1 \\le i \\le n} \\Delta x_i$$',
        '',
        '若 $P \\subseteq P\'$（把 $P$ 的点全放进 $P\'$，可能还添了新点），称 $P\'$ 是 $P$ 的**加细**。任意两个分割 $P, Q$ 都有公共加细 $P \\cup Q$。'
      ].join('\n'),
      notes: '⭐ **有限**是刻意的：Riemann 积分只切有限刀。Lebesgue 那一侧才允许可数无穷多块 —— 那正是两者差别的一个来源。\n\n⚠ 记号里的 $x_i$ 是分割点，与函数自变量无关；$\\Delta x_i$ 是长度，不是函数值之差。\n\n⭐ 加细的作用：分割越细，上和越小、下和越大（见「上和与下和」的注释）—— 它们是单调的，所以可以取确界。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6', 'Spivak, Calculus, Ch. 13']
    },
    {
      id: 'def.riemann-sum',
      cluster: 'analysis.riemann',
      type: 'definition',
      label: 'Riemann 和',
      title: 'Riemann 和（标记和）',
      regions: ['analysis'],
      tags: ['定义', '积分'],
      statement: [
        '设 $f : [a, b] \\to \\mathbb{R}$ 有界，$P = \\{ x_0 < \\cdots < x_n \\}$ 是分割，并在每个小区间里各取一个**标记点** $\\xi_i \\in I_i$。**Riemann 和**是',
        '',
        '$$S(f, P, \\xi) := \\sum_{i=1}^{n} f(\\xi_i)\\,\\Delta x_i$$',
        '',
        '它依赖三样东西：$f$、分割 $P$、以及标记点 $\\xi_1, \\ldots, \\xi_n$ 的取法。'
      ].join('\n'),
      notes: '⭐ 几何读法：把每一小段上的「高」取成 $f(\\xi_i)$，得到 $n$ 个矩形，$S$ 就是它们的面积之和。**标记点的取法**是这套理论里唯一的自由 —— 可积的定义之所以要「对任意取法都成立」，就是为了让这个自由消失。\n\n⚠ $f$ 必须有界：否则某个 $f(\\xi_i)$ 可以任意大，和没有意义。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'def.darboux-sum',
      cluster: 'analysis.riemann',
      type: 'definition',
      label: '上和与下和',
      title: '上和 $U(f, P)$ 与下和 $L(f, P)$（Darboux Sums）',
      regions: ['analysis'],
      tags: ['定义', '积分'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上有界，$P = \\{ x_0 < \\cdots < x_n \\}$ 是分割。记',
        '',
        '$$M_i := \\sup_{x \\in I_i} f(x), \\qquad m_i := \\inf_{x \\in I_i} f(x), \\qquad \\omega_i := M_i - m_i$$',
        '',
        '（$M_i$ 是 $f$ 在第 $i$ 段上的**上确界**，$m_i$ 是下确界，$\\omega_i$ 是**振幅**。）**上和**与**下和**定义为',
        '',
        '$$U(f, P) := \\sum_{i=1}^{n} M_i\\,\\Delta x_i, \\qquad L(f, P) := \\sum_{i=1}^{n} m_i\\,\\Delta x_i$$'
      ].join('\n'),
      notes: '⭐ 上和、下和是「把所有标记法一次夹住」：对每个分割 $P$ 与**任意**标记 $\\xi$ 都有\n\n$$L(f, P) \\le S(f, P, \\xi) \\le U(f, P)$$\n\n⭐ **加细的单调性**：若 $P\' \\supseteq P$，则 $L(f, P) \\le L(f, P\')$ 且 $U(f, P\') \\le U(f, P)$ —— 切得更细之后每段的 $m_i$ 只会变大、$M_i$ 只会变小。正因为这一条，$\\sup_P L(f, P)$ 与 $\\inf_P U(f, P)$ 才是可用（且可算）的量。\n\n⚠ 两个确界都对**有限**分割取；$M_i$、$m_i$ 有限要有界性做前提。\n\n⚠ 记号 $U$ 来自 upper、$L$ 来自 lower：上和每段取**大**值。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'def.riemann-integrable',
      cluster: 'analysis.riemann',
      type: 'definition',
      label: 'Riemann 可积',
      title: 'Riemann 可积与积分 $\\int_a^b f$',
      regions: ['analysis'],
      tags: ['定义', '积分'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上有界。称 $f$ **Riemann 可积**，当且仅当存在实数 $I$ 使',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0 :\\ \\|P\\| < \\delta \\implies \\bigl| S(f, P, \\xi) - I \\bigr| < \\varepsilon$$',
        '',
        '对**任意**分割 $P$ 与**任意**标记 $\\xi$ 成立。此时 $I$ 唯一，记作',
        '',
        '$$I = \\int_a^b f = \\int_a^b f(x)\\,dx$$',
        '',
        '约定 $\\int_b^a f := -\\int_a^b f$，$\\int_a^a f := 0$。'
      ].join('\n'),
      notes: '⭐ 定义里最容易漏的两个词：**任意**与**模**。不是「存在一列分割让和收敛」，而是「模足够小的**所有**分割、**所有**标记都落在 $I$ 附近」。\n\n⭐ 等价说法（Darboux 形式，见「Darboux 判据」）：$\\sup_P L(f, P) = \\inf_P U(f, P)$。两条定义等价不是免费的 —— 它需要证明，这个证明就是 `thm.riemann-criterion`。\n\n⚠ 取值在 $\\mathbb{C}$ 的函数可积定义为实部与虚部分别可积；向量值同理。\n\n⚠ 有界是可积的**前提**：无界函数在 Riemann 意义下不可积（Lebesgue 意义下可以，只要 $\\int |f| < \\infty$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'thm.darboux-criterion',
      cluster: 'analysis.riemann',
      type: 'theorem',
      label: 'Darboux 判据',
      title: '定理（Darboux 判据）：可积 $\\iff \\inf_P U = \\sup_P L$',
      regions: ['analysis'],
      tags: ['定理', '积分', '可积性'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上有界。则 $f$ Riemann 可积，当且仅当',
        '',
        '$$\\inf_{P} U(f, P) = \\sup_{P} L(f, P)$$',
        '',
        '而且此时这个公共值就是 $\\int_a^b f$。'
      ].join('\n'),
      notes: '⭐ 把「极限存在」换成了「两个确界相等」：前者要谈标记点的取法，后者**完全不提标记点** —— 这是 Darboux 形式好用的全部原因。\n\n⭐ 两个确界的单调性：$P\'$ 是 $P$ 的加细时 $L(f, P) \\le L(f, P\') \\le U(f, P\') \\le U(f, P)$（每一段上的 $m_i$ 只会变大、$M_i$ 只会变小）。于是对**任何**两个分割 $P, Q$ 都有 $L(f, P) \\le U(f, Q)$：取公共加细 $P \\cup Q$ 即得。\n\n⚠ 因此 $\\sup_P L \\le \\inf_P U$ 永远是自动成立的，判据真正要求的是**反向不等式**。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'thm.riemann-criterion',
      cluster: 'analysis.riemann',
      type: 'theorem',
      label: '可积的振幅判据',
      title: '定理（Riemann 判据）：可积 $\\iff$ 振幅和可以任意小',
      regions: ['analysis'],
      tags: ['定理', '积分', '可积性'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上有界。则 $f$ 可积，当且仅当对每个 $\\varepsilon > 0$ 都存在分割 $P$ 使',
        '',
        '$$U(f, P) - L(f, P) = \\sum_{i} \\omega_i\\,\\Delta x_i < \\varepsilon$$',
        '',
        '（$\\omega_i$ 是 $f$ 在第 $i$ 段上的振幅。）并且此时两种定义（标记和极限 / Darboux 确界）给出的积分值相同。'
      ].join('\n'),
      notes: '⭐ **振幅和可以任意小**是全书最有用的一句可积性判据：一切「某个函数可积」的证明都是把它化归成振幅和的估计。\n\n⭐ 用法示例：连续函数用**一致连续**控制 $\\omega_i$；单调函数用等距分割让 $\\sum \\omega_i \\Delta x_i \\le (f(b) - f(a))\\|P\\|$。\n\n⚠ 判据只要求**存在**一个分割使振幅和够小，不要求所有分割 —— 因为振幅和随加细单调不增。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6', 'Spivak, Calculus, Ch. 13']
    },
    {
      id: 'prop.integrable-examples',
      cluster: 'analysis.riemann',
      type: 'proposition',
      label: '哪些函数可积',
      title: '命题：连续、单调 $\\implies$ 可积；Dirichlet 函数不可积',
      regions: ['analysis'],
      tags: ['命题', '积分', '可积性'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上有界。',
        '',
        '- $f$ **连续** $\\implies$ $f$ 可积；',
        '- $f$ **单调** $\\implies$ $f$ 可积；',
        '- $f$ 有界且只有**有限个**不连续点 $\\implies$ $f$ 可积。',
        '',
        '反之不成立。**Dirichlet 函数**（$x$ 有理时取 $1$、无理时取 $0$）有界但不可积。'
      ].join('\n'),
      notes: '⭐ 三条都是「振幅和可以任意小」的直接应用。\n\n⭐ Dirichlet 函数为什么不可积：任何分割的每个小区间里都同时含**有理数**与**无理数**（稠密性），所以 $M_i = 1$、$m_i = 0$，于是 $U - L = \\sum \\Delta x_i = b - a$ 对每个分割成立，振幅和永远不趋于零。\n\n⚠ 但它在 Lebesgue 意义下可积，且积分为 $0$（有理数集是零测集）。**同一条函数，两个积分理论给出不同答案** —— 差别不在函数，在于「怎么切」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'thm.riemann-lebesgue-criterion',
      cluster: 'analysis.riemann',
      type: 'theorem',
      label: '可积 ⟺ 不连续点零测',
      title: '定理（Lebesgue 判据）：有界可积 $\\iff$ 不连续点集是零测集',
      regions: ['analysis'],
      tags: ['定理', '积分', '可积性', '测度'],
      statement: [
        '设 $f : [a, b] \\to \\mathbb{R}$ 有界，记 $D$ 为 $f$ 在 $[a, b]$ 上的**不连续点**全体。则 $f$ 在 $[a, b]$ 上 Riemann 可积，当且仅当 $D$ 是 Lebesgue 零测集，即',
        '',
        '$$m(D) = 0$$',
        '',
        '（$m$ 是 $\\mathbb{R}$ 上的 Lebesgue 测度；零测集 = 可以被可数多个区间覆盖、且这些区间长度之和任意小。）'
      ].join('\n'),
      notes: '⭐ 这一条是**初等微积分与测度论的接头处**：左边是「振幅和可以任意小」（纯 Riemann 语言），右边是「不连续点集有多小」（纯 Lebesgue 语言）。说同一件事，用两套语言。\n\n⭐ 立刻可用的几个特例：连续函数可积（不连续点集为空）、单调函数可积（不连续点至多可数，可数集零测）、有有限个跳跃的函数可积。\n\n⚠ 函数**有界**是前提：无界函数即使几乎处处连续也不 Riemann 可积。\n\n⚠ 「零测」比「可数」宽得多：Cantor 集不可数但零测，所以**在 Cantor 集上不连续、处处稠密地连续**的函数照样可积。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 11', 'Folland, Real Analysis, Ch. 2']
    },
    {
      id: 'prop.integral-linear',
      cluster: 'analysis.riemann',
      type: 'proposition',
      label: '积分的线性与区间可加',
      title: '命题：积分的线性性与区间可加性',
      regions: ['analysis'],
      tags: ['命题', '积分'],
      statement: [
        '设 $f, g$ 在 $[a, b]$ 上可积，$c \\in \\mathbb{R}$。则 $f + g$ 与 $cf$ 都可积，且',
        '',
        '$$\\int_a^b (f + g) = \\int_a^b f + \\int_a^b g, \\qquad \\int_a^b cf = c\\int_a^b f$$',
        '',
        '并且对 $a < c < b$：$f$ 在 $[a, b]$ 上可积，当且仅当它在 $[a, c]$ 与 $[c, b]$ 上分别可积，此时',
        '',
        '$$\\int_a^b f = \\int_a^c f + \\int_c^b f$$'
      ].join('\n'),
      notes: '⭐ 「区间可加」是 Riemann 积分最实用的一条：它把一个大区间上的问题切成两半 —— 这也是后面「反常积分」能定义的基础。\n\n⚠ 两个可积函数的**乘积**也可积（振幅估计：$\\omega(fg) \\le M\\omega(g) + N\\omega(f)$ 在每一段上），但**商**不一定，商要先保证分母不接近零。\n\n⭐ 和与积的可积性都靠振幅判据：把 $\\omega(f + g) \\le \\omega(f) + \\omega(g)$ 代进去即可。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'prop.integral-order',
      cluster: 'analysis.riemann',
      type: 'proposition',
      label: '积分的保序与估计',
      title: '命题：保序性、绝对值不等式与基本估计',
      regions: ['analysis'],
      tags: ['命题', '积分', '不等式'],
      statement: [
        '设 $f, g$ 在 $[a, b]$ 上可积。',
        '',
        '- **保序**：若 $f(x) \\le g(x)$ 处处成立，则 $\\int_a^b f \\le \\int_a^b g$；特别地 $f \\ge 0 \\implies \\int_a^b f \\ge 0$。',
        '- **绝对值**：$|f|$ 可积，且',
        '',
        '$$\\Bigl| \\int_a^b f \\Bigr| \\le \\int_a^b |f|$$',
        '',
        '- **基本估计**：若 $|f(x)| \\le M$ 处处成立，则 $\\bigl| \\int_a^b f \\bigr| \\le M\\,(b - a)$。'
      ].join('\n'),
      notes: '⭐ 保序性听起来平凡，但它是**一切积分不等式**的源头：要证 $\\int f \\le \\int g$，只需逐点证明 $f \\le g$。\n\n⚠ 保序是**非严格**的：逐点严格不等推不出积分严格不等（$f = 0$、$g$ 只在一点为正的例子）。\n\n⭐ $|f|$ 可积是 Riemann 特有的现象（Lebesgue 那边 $f$ 可积直接蕴含 $|f|$ 可积）；反过来 $|f|$ 可积不蕴含 $f$ 可积 —— $f$ 取 $1$ 与 $-1$ 在有理/无理处交替时，$|f| \\equiv 1$ 可积而 $f$ 不可积。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'thm.ftc-riemann-part1',
      cluster: 'analysis.riemann',
      type: 'theorem',
      label: '变上限积分的导数',
      title: '定理（第一基本定理）：变上限积分及其导数',
      regions: ['analysis'],
      tags: ['定理', '积分', '导数'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上可积，定义',
        '',
        '$$F(x) := \\int_a^x f, \\qquad x \\in [a, b]$$',
        '',
        '则：',
        '',
        '**(a)** $F$ 在 $[a, b]$ 上连续；事实上若 $|f| \\le M$ 则 $|F(y) - F(x)| \\le M|y - x|$（即 $F$ 是 Lipschitz 的）。',
        '',
        '**(b)** 若 $f$ 在 $x_0 \\in (a, b)$ 处连续，则 $F$ 在 $x_0$ 处可导，且',
        '',
        '$$F\'(x_0) = f(x_0)$$'
      ].join('\n'),
      notes: '⭐ 这条定理说：**积分再求导，回到原函数**（在 $f$ 连续的点处）。于是「求不定积分」这件事有了一个**具体的构造**，而不是只靠倒着背导数表。\n\n⚠ (b) 只要求 $f$ 在**那一点**连续：$f$ 有跳跃的地方 $F$ 会有角点（$F$ 在该点不可导），但 $F$ 仍处处连续。\n\n⭐ (a) 的 Lipschitz 估计正是「$\\int_a^b f$ 对上限连续依赖」。在 Lebesgue 那一侧 (a) 仍成立、(b) 要改成「a.e. 可导」（Lebesgue 微分定理）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'thm.ftc-riemann-part2',
      cluster: 'analysis.riemann',
      type: 'theorem',
      label: 'Newton–Leibniz 公式',
      title: '定理（第二基本定理）：$\\int_a^b F\' = F(b) - F(a)$',
      regions: ['analysis'],
      tags: ['定理', '积分', '导数'],
      statement: [
        '设 $F : [a, b] \\to \\mathbb{R}$ 可导、$F\'$ 在 $[a, b]$ 上可积。则',
        '',
        '$$\\int_a^b F\'(x)\\,dx = F(b) - F(a)$$',
        '',
        '（$F$ 称为 $F\'$ 的**原函数**；公式的另一种写法：$\\int_a^b f = F\\bigr|_a^b$。）'
      ].join('\n'),
      notes: '⭐ 这是整个初等微积分的主定理：**求面积变成了找原函数**。它也解释了为什么不定积分表值得背 —— 每一个导数公式反过来都是一条积分公式。\n\n⚠ 前提「$F\'$ 可积」不可省：存在可导函数其导数**不可积**（$F(x) = x^{2}\\sin(1/x^{2})$ 那一类）。\n\n⚠ 反过来也不够强：Newton–Leibniz 要求 $F$ 是原函数；Lebesgue 版（`thm.ftc-lebesgue`）把条件放宽成**绝对连续**，并且把「$F\'$ 存在」也写成结论的一部分。两条定理的关系是「同一句话在两种积分下的形态」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'prop.integration-substitution',
      cluster: 'analysis.riemann',
      type: 'proposition',
      label: '换元积分',
      title: '命题：换元公式（Substitution）',
      regions: ['analysis'],
      tags: ['命题', '积分'],
      statement: [
        '设 $\\varphi : [\\alpha, \\beta] \\to [a, b]$ 有连续导数，$f$ 在 $[a, b]$ 上连续。则',
        '',
        '$$\\int_{\\alpha}^{\\beta} f\\bigl(\\varphi(t)\\bigr)\\,\\varphi\'(t)\\,dt = \\int_{\\varphi(\\alpha)}^{\\varphi(\\beta)} f(x)\\,dx$$'
      ].join('\n'),
      notes: '⭐ 它是**链式法则反着写**：$\\frac{d}{dt}F(\\varphi(t)) = F\'(\\varphi(t))\\varphi\'(t)$，两边用 Newton–Leibniz 即可。所以换元公式没有独立的内容，它只是把复合求导搬过去。\n\n⚠ $\\varphi$ 不必单调：公式里的上下限按 $\\varphi(\\alpha)$、$\\varphi(\\beta)$ 取值，若 $\\varphi(\\beta) < \\varphi(\\alpha)$ 整数号自然翻转（这正是约定 $\\int_b^a = -\\int_a^b$ 的用处）。\n\n⚠ 「$\\varphi\'$ 连续」是充分条件而非必要：$\\varphi$ 单调可导、$\\varphi\'$ 可积即可。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'prop.integration-by-parts',
      cluster: 'analysis.riemann',
      type: 'proposition',
      label: '分部积分',
      title: '命题：分部积分公式（Integration by Parts）',
      regions: ['analysis'],
      tags: ['命题', '积分'],
      statement: [
        '设 $F, G : [a, b] \\to \\mathbb{R}$ 可导、$F\', G\'$ 可积。则',
        '',
        '$$\\int_a^b F G\' = F(b)G(b) - F(a)G(a) - \\int_a^b F\' G$$',
        '',
        '（写成惯用的形式：$\\int_a^b u\\,dv = uv\\bigr|_a^b - \\int_a^b v\\,du$。）'
      ].join('\n'),
      notes: '⭐ 它同样是**乘积求导法则反着写**：$(FG)\' = F\'G + FG\'$，两边积分再用 Newton–Leibniz。\n\n⚠ 里外里验证的常见错误：把 $F(b)G(b) - F(a)G(a)$ 写成 $(FG)(b - a)$ —— 那是「乘积的积分」，不是「乘积的端点差」。\n\n⭐ 分部积分最有价值的形态是「移项」：$\\int F G\' = FG\\bigr|_a^b - \\int F\'G$ 把难积的一方挪到另一边。在 Lebesgue 那一侧它对应「弱导数 / 分布意义下的求导」那一整套。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'thm.mean-value-integral',
      cluster: 'analysis.riemann',
      type: 'theorem',
      label: '积分中值定理',
      title: '定理：积分中值定理（第一形式）',
      regions: ['analysis'],
      tags: ['定理', '积分'],
      statement: [
        '设 $f$ 在 $[a, b]$ 上连续、$g$ 可积且**不变号**（$g \\ge 0$ 或 $g \\le 0$）。则存在 $\\xi \\in [a, b]$ 使',
        '',
        '$$\\int_a^b f g = f(\\xi) \\int_a^b g$$',
        '',
        '取 $g \\equiv 1$ 得：存在 $\\xi \\in [a, b]$ 使 $\\int_a^b f = f(\\xi)(b - a)$，此时 $f(\\xi)$ 称为 $f$ 在 $[a, b]$ 上的**平均值**。'
      ].join('\n'),
      notes: '⭐ 几何读法：曲线下的面积等于「某个高度」乘上底 —— 也就是**平均值**能真的被某一点取到（连续函数 + 最值定理）。\n\n⚠ $g$ **不变号**不可省：$g$ 取正负时加权平均可能落在 $f$ 的值域之外。\n\n⭐ 它在 Newton–Leibniz 的证明里出场（用于证明 $F(b) - F(a)$ 可以被 $F\'$ 的积分替代），也是 Taylor 余项、数值积分误差估计的标准工具。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'def.improper-integral',
      cluster: 'analysis.riemann',
      type: 'definition',
      label: '反常积分',
      title: '反常积分：无穷区间与无界函数（Improper Integral）',
      regions: ['analysis'],
      tags: ['定义', '积分'],
      statement: [
        '**无穷区间**：若 $f$ 在每个 $[a, R]$ 上可积，定义',
        '',
        '$$\\int_a^{+\\infty} f := \\lim_{R \\to +\\infty} \\int_a^{R} f$$',
        '',
        '（极限存在且有限时称**收敛**，否则称发散）。',
        '',
        '**无界函数**：若 $f$ 在 $[a, b]$ 上无界、但在每个 $[a, b - \\varepsilon]$ 上可积，定义',
        '',
        '$$\\int_a^{b} f := \\lim_{\\varepsilon \\to 0^{+}} \\int_a^{b - \\varepsilon} f$$',
        '',
        '两种情况可以混合（既是无穷区间又无界），此时要**分段**处理：每一段都必须收敛。'
      ].join('\n'),
      notes: '⭐ 反常积分不是新理论：它只是 Riemann 积分的**极限** —— 定义里所有的积分都是普通积分。\n\n⚠ 「混合情形要分段」是必须的：把 $\\int_{-\\infty}^{+\\infty} f$ 定义成 $\\lim_{R \\to \\infty}\\int_{-R}^{R}$ 会漏掉不绝对收敛的现象（$\\int_{-R}^{R} x\\,dx = 0$ 对每个 $R$，而 $\\int_0^{+\\infty}$ 与 $\\int_{-\\infty}^{0}$ 都发散）。这个区别叫**主值积分**。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'prop.improper-comparison',
      cluster: 'analysis.riemann',
      type: 'proposition',
      label: '反常积分的比较判敛',
      title: '命题：比较判别法与绝对收敛',
      regions: ['analysis'],
      tags: ['命题', '积分', '收敛'],
      statement: [
        '设 $f, g$ 在不含端点的区间上可积，且 $|f(x)| \\le g(x)$ 在近端成立。',
        '',
        '- $\\int g$ 收敛 $\\implies$ $\\int f$ 收敛；',
        '- **绝对收敛**：$\\int |f|$ 收敛 $\\implies$ $\\int f$ 收敛；',
        '- 若 $f \\ge 0$，则 $\\int f$ 收敛当且仅当 $\\lim \\int$ 的上确界有限（单调性判别法）。'
      ].join('\n'),
      notes: '⭐ 「绝对收敛 $\\implies$ 收敛」的证明走 **Cauchy 准则**：$|\\int_{p}^{q} f| \\le \\int_p^q |f|$，而 $\\int |f|$ 收敛给出右端可以任意小。\n\n⚠ 反过来不成立：$\\int_1^{+\\infty} \\frac{\\sin x}{x}\\,dx$ 收敛但不绝对收敛 —— 与数项级数里「条件收敛」一模一样的现象。\n\n⭐ 这条与「级数的比较判敛」是同一条定理的两个化身：把 $f$ 在 $[n, n+1]$ 上积分就得到级数版本。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6']
    },
    {
      id: 'prop.riemann-implies-lebesgue',
      cluster: 'analysis.riemann',
      type: 'proposition',
      label: 'Riemann ⟹ Lebesgue',
      title: '命题：Riemann 可积 $\\implies$ Lebesgue 可积，且积分相等',
      regions: ['analysis'],
      tags: ['命题', '积分', '测度'],
      statement: [
        '设 $f : [a, b] \\to \\mathbb{R}$ 有界且 Riemann 可积。则 $f$ 关于 Lebesgue 测度可测，且 Lebesgue 可积，并且两个积分相等：',
        '',
        '$$\\int_{[a, b]} f\\,dm = \\int_a^b f$$',
        '',
        '反过来不成立：存在 Lebesgue 可积而 Riemann 不可积的函数（例如 Dirichlet 函数）。'
      ].join('\n'),
      notes: '⭐ 这条命题把「两个积分」焊接起来：**Lebesgue 积分是 Riemann 积分的真扩张** —— 能算的照旧能算（值相同），不能算的多了一批。\n\n⭐ 证明走 `thm.riemann-lebesgue-criterion`：Riemann 可积 $\\implies$ 不连续点集零测 $\\implies$ $f$ 与某个可测函数 a.e. 相等；再用上、下简单函数逼近夹出积分相等。\n\n⚠ 注意**值相同**这一半：不是「差不多」，是逐字相等。所以 $\\int_0^1 x\\,dx = \\frac{1}{2}$ 在两种语言里都是同一句话。',
      refs: ['Folland, Real Analysis, Ch. 2', 'Rudin, Real and Complex Analysis, Ch. 1']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.interval-partition',
      kind: 'definition',
      definition: 'def.interval',
      usedBy: 'def.partition',
      note: '分割是闭区间的一种有限点选取，$\\Delta x_i$ 是小区间的长度 —— 两者都只说区间。'
    },
    {
      id: 'dep.partition-riemannsum',
      kind: 'definition',
      definition: 'def.partition',
      usedBy: 'def.riemann-sum',
      note: 'Riemann 和是在一个固定的分割上、按标记点累加 $f(\\xi_i)\\Delta x_i$。'
    },
    {
      id: 'dep.partition-darbouxsum',
      kind: 'definition',
      definition: 'def.partition',
      usedBy: 'def.darboux-sum',
      note: '上和、下和同样只依赖分割：把每段的标记换成该段的上确界 / 下确界。'
    },
    {
      id: 'dep.darbouxsum-integrable',
      kind: 'definition',
      definition: 'def.darboux-sum',
      usedBy: 'def.riemann-integrable',
      note: '可积的 Darboux 形式定义为「两个确界相等」，所以要用上和与下和来陈述。'
    },
    {
      id: 'dep.riemannsum-improper',
      kind: 'definition',
      definition: 'def.riemann-integrable',
      usedBy: 'def.improper-integral',
      note: '反常积分是普通 Riemann 积分取极限，所以它的定义域里每一段都要先可积。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.darboux-criterion',
      kind: 'implication',
      sources: ['def.riemann-integrable'],
      target: 'thm.darboux-criterion',
      title: '可积的定义 $\\implies$ Darboux 判据',
      proof: [
        '记 $L^{*} := \\sup_P L(f, P)$、$U^{*} := \\inf_P U(f, P)$。由上和、下和的单调性（加细后 $L$ 只增、$U$ 只减），对任意两个分割 $P, Q$ 有 $L(f, P) \\le U(f, Q)$，故',
        '',
        '$$L^{*} \\le U^{*}$$',
        '',
        '永远成立。下面说明「$L^{*} = U^{*}$」与「标记和收敛」等价。',
        '',
        '**(i) 设 $L^{*} = U^{*} =: I$。** 给定 $\\varepsilon > 0$，取分割 $P_1, P_2$ 使 $L(f, P_1) > I - \\varepsilon$、$U(f, P_2) < I + \\varepsilon$。令 $P := P_1 \\cup P_2$，由单调性 $L(f, P) \\ge L(f, P_1) > I - \\varepsilon$、$U(f, P) \\le U(f, P_2) < I + \\varepsilon$。',
        '',
        '设 $P = \\{ x_0 < \\cdots < x_n \\}$，取 $\\delta := $ 比「$P$ 中相邻分割点的最小间距」更小的正数（$n = 0$ 时平凡）。对任意模小于 $\\delta$ 的分割 $Q$ 与任意标记 $\\xi$：每个 $Q$ 的小区间至多**跨过一个** $P$ 的分割点，于是把 $Q$ 的小区间按「是否含 $P$ 的分割点」分类求和，可得',
        '',
        '$$L(f, P) - 2M\\,\\|Q\\|\\cdot n \\le L(f, Q) \\le S(f, Q, \\xi) \\le U(f, Q) \\le U(f, P) + 2M\\,\\|Q\\| \\cdot n$$',
        '',
        '其中 $M := \\sup |f|$（跨过分割点的那几段振幅不超过 $2M$）。令 $\\|Q\\| \\to 0$，两侧都趋于 $I$，故 $S(f, Q, \\xi) \\to I$。',
        '',
        '**(ii) 设标记和收敛到 $I$。** 任取分割 $P$ 与 $\\varepsilon > 0$。用**同一分割** $P$、取使 $f(\\xi_i)$ 逼近 $M_i$ 的标记，可得 $S > U(f, P) - \\varepsilon$；取使 $f(\\xi_i)$ 逼近 $m_i$ 的标记得 $S < L(f, P) + \\varepsilon$。两者都随模趋于 $I$，故 $|U(f, P) - I| \\le \\varepsilon$、$|L(f, P) - I| \\le \\varepsilon$ 对足够细的 $P$ 成立，于是 $U^{*} = L^{*} = I$。∎'
      ].join('\n'),
      note: '两个方向里，(i) 是真正的技术活：**任意**细分割要与一个**固定**的加细比较，差的部分就是那些跨过分割点的区间 —— 它们的总长度被 $\\|Q\\|$ 控制住了。'
    },
    {
      id: 'imp.riemann-criterion',
      kind: 'implication',
      sources: ['thm.darboux-criterion'],
      target: 'thm.riemann-criterion',
      title: 'Darboux 判据 $\\implies$ 振幅判据',
      proof: [
        '记 $L^{*} = \\sup_P L$、$U^{*} = \\inf_P U$，恒有 $L(f, P) \\le L^{*} \\le U^{*} \\le U(f, P)$。于是',
        '',
        '$$U(f, P) - L(f, P) \\ge U^{*} - L^{*}$$',
        '',
        '**($\\implies$)** 设 $f$ 可积，即 $L^{*} = U^{*}$。给定 $\\varepsilon > 0$，取 $P_1$ 使 $L(f, P_1) > L^{*} - \\varepsilon/2$、$P_2$ 使 $U(f, P_2) < U^{*} + \\varepsilon/2$，并令 $P = P_1 \\cup P_2$。由单调性',
        '',
        '$$U(f, P) - L(f, P) \\le U(f, P_2) - L(f, P_1) < \\varepsilon$$',
        '',
        '**($\\Longleftarrow$)** 设对每个 $\\varepsilon$ 都存在 $P$ 使 $U(f, P) - L(f, P) < \\varepsilon$。由上式 $0 \\le U^{*} - L^{*} < \\varepsilon$ 对一切 $\\varepsilon$ 成立，故 $U^{*} = L^{*}$，由 Darboux 判据 $f$ 可积。∎',
        '',
        '两种定义给出的积分值相同：Darboux 判据已说明公共值就是 $\\int_a^b f$。'
      ].join('\n'),
      note: '判据的实用性全在「存在一个分割」这个弱要求上 —— 证明可积性时只需**造一个**好分割，不必面对所有分割。'
    },
    {
      id: 'imp.integrable-examples',
      kind: 'implication',
      sources: ['thm.riemann-criterion', 'thm.uniform-continuity-compact', 'thm.evt'],
      target: 'prop.integrable-examples',
      title: '振幅判据 + 一致连续 $\\implies$ 可积性三例',
      proof: [
        '**① 连续 $\\implies$ 可积。** 设 $f$ 在 $[a, b]$ 上连续，令 $M := \\sup |f|$。由 Cantor 定理，$f$ 在 $[a, b]$ 上**一致连续**：对 $\\varepsilon > 0$ 取 $\\delta > 0$，使 $|x - y| < \\delta$ 时 $|f(x) - f(y)| < \\dfrac{\\varepsilon}{b - a}$。',
        '',
        '取分割 $P$ 使 $\\|P\\| < \\delta$，则每段上 $\\omega_i \\le \\dfrac{\\varepsilon}{b - a}$，于是',
        '',
        '$$U(f, P) - L(f, P) = \\sum_i \\omega_i \\Delta x_i \\le \\frac{\\varepsilon}{b - a} \\sum_i \\Delta x_i = \\varepsilon$$',
        '',
        '由振幅判据可积。',
        '',
        '**② 单调 $\\implies$ 可积。** 设 $f$ 递增。取等距分割 $x_i = a + i\\,(b - a)/n$，则第 $i$ 段上 $M_i = f(x_i)$、$m_i = f(x_{i-1})$，振幅和',
        '',
        '$$U - L = \\sum_{i=1}^{n} \\bigl( f(x_i) - f(x_{i-1}) \\bigr)\\frac{b - a}{n} = \\bigl( f(b) - f(a) \\bigr)\\frac{b - a}{n} \\xrightarrow{\\;n \\to \\infty\\;} 0$$',
        '',
        '（这是**裂项**：中间的 $f(x_i)$ 全部抵消。）',
        '',
        '**③ 有限个不连续点 $\\implies$ 可积。** 把 $[a, b]$ 分成有限段，每段内部连续、端点处或为不连续点；对每一段用 ①，再把分割在端点处接起来即可。',
        '',
        '**④ Dirichlet 函数不可积。** 任取分割 $P$：每个小区间同时含有理数与无理数（稠密性），故 $M_i = 1$、$m_i = 0$，振幅和 $U - L = \\sum \\Delta x_i = b - a$ 与 $P$ 无关，永远不小于 $\\varepsilon = b - a$。由振幅判据不可积。∎'
      ].join('\n'),
      note: '① 里用的正是「紧集上连续 $\\implies$ 一致连续」—— 这是 ② 之外唯一需要紧性的地方，而 ② 靠的是**单调**（振幅自动沿分割点裂项）。'
    },
    {
      id: 'imp.riemann-lebesgue',
      kind: 'implication',
      sources: ['thm.riemann-criterion', 'def.null-set'],
      target: 'thm.riemann-lebesgue-criterion',
      title: '振幅判据 + 零测集 $\\implies$ Lebesgue 判据',
      proof: [
        '记 $D$ 为 $f$ 的不连续点集，并设 $|f| \\le M$。',
        '',
        '**($\\Longleftarrow$)** 设 $D$ 是零测集，给定 $\\varepsilon > 0$。',
        '',
        '1. 取开区间族 $\\{ J_k \\}$ 覆盖 $D$，且 $\\sum_k |J_k| < \\varepsilon / (4M + 1)$。',
        '2. 令 $K := [a, b] \\setminus \\bigcup_k J_k$ —— 这是**紧集**，且 $f$ 在 $K$ 上每点连续。由一致性（$K$ 紧）可得：存在 $\\delta > 0$，使 $|x - y| < \\delta$、$x, y \\in K$ 时 $|f(x) - f(y)| < \\varepsilon / (2(b - a))$。',
        '3. 取分割，使每个小区间要么整个落在某个 $J_k$ 里（第一类），要么长度 $< \\delta$（第二类）。第一类上 $\\omega_i \\le 2M$，共占长度 $< \\varepsilon /(4M + 1)$；第二类上 $\\omega_i \\le \\varepsilon / (2(b - a))$。于是',
        '',
        '$$\\sum_i \\omega_i \\Delta x_i \\le 2M \\cdot \\frac{\\varepsilon}{4M + 1} + \\frac{\\varepsilon}{2(b - a)} \\cdot (b - a) < \\frac{\\varepsilon}{2} + \\frac{\\varepsilon}{2} = \\varepsilon$$',
        '',
        '由振幅判据可积。',
        '',
        '**($\\implies$)** 设 $f$ 可积。对每个 $k \\ge 1$ 取分割 $P_k$ 使 $\\sum_i \\omega_i \\Delta x_i < 1 / k$。把「$\\omega_i > 1/k$」的那些小区间记为 $J_{k,1}, \\ldots$，则',
        '',
        '$$\\sum_j |J_{k, j}| \\le k \\sum_j \\omega_j |J_{k,j}| \\le k \\cdot \\frac{1}{k} = 1$$',
        '',
        '更精细地取 $\\varepsilon / k$ 代替 $1/k$，可得 $\\sum_j |J_{k,j}| < \\varepsilon$。所以集合 $D_k := \\bigcup_j J_{k,j}$ 是零测集的「$\\varepsilon$-近似」。',
        '',
        '4. 现在关键的一步：$D \\subseteq \\bigcup_{k} \\overline{D_k}$ —— 若 $f$ 在 $x$ 处不连续，则 $f$ 在该点的振幅 $\\omega(f, x) > 1/k$ 对某个 $k$ 成立，于是 $x$ 属于那些长度可以任意小的区间的闭包。于是 $D$ 被可数多个零测集覆盖，本身是零测集。∎'
      ].join('\n'),
      note: '($\\Longleftarrow$) 的 2 与 3 是「**紧性 + 零测**」的标准组合拳：把不连续点用总长度很小的开集包起来，剩下的紧集上连续函数一致连续。这一招在后面（Lusin 定理、Egorov 定理）会反复出现。'
    },
    {
      id: 'imp.integral-linear',
      kind: 'implication',
      sources: ['thm.riemann-criterion'],
      target: 'prop.integral-linear',
      title: '振幅判据 $\\implies$ 线性与区间可加',
      proof: [
        '**振幅的次可加性**：在同一区间 $I$ 上，$\\omega(f + g) \\le \\omega(f) + \\omega(g)$，$\\omega(cf) = |c|\\,\\omega(f)$（因为 $\\sup(f + g) \\le \\sup f + \\sup g$、$\\inf(f + g) \\ge \\inf f + \\inf g$）。',
        '',
        '1. 设 $f, g$ 可积。给定 $\\varepsilon > 0$，取分割 $P_f$ 使 $\\sum \\omega(f)\\Delta x < \\varepsilon / 2$，$P_g$ 同理；令 $P = P_f \\cup P_g$，加细不增振幅和，于是 $\\sum \\omega(f + g)\\Delta x \\le \\sum \\omega(f)\\Delta x + \\sum \\omega(g)\\Delta x < \\varepsilon$。故 $f + g$ 可积。',
        '2. 值的关系 $\\int (f + g) = \\int f + \\int g$：在同一分割上，$L(f,P) + L(g,P) \\le L(f+g,P) \\le U(f+g,P) \\le U(f,P) + U(g,P)$，令分割变细即得。',
        '3. 数乘同理（$\\omega(cf) = |c|\\omega(f)$，值的关系由 $U(cf,P) = cU(f,P)$ 当 $c \\ge 0$、$c < 0$ 时互换上下的角色）。',
        '4. **区间可加**：设 $P$ 是 $[a, b]$ 的分割，取 $c$ 为分割点，则 $P$ 分裂成 $[a, c]$ 与 $[c, b]$ 的分割，$U(f, P) = U_{[a,c]}(f) + U_{[c,b]}(f)$（$L$ 同）。由振幅判据，一侧的振幅和可以任意小当且仅当两侧都可以，故可积性等价；取极限得 $\\int_a^b f = \\int_a^c f + \\int_c^b f$。∎'
      ].join('\n'),
      note: '「振幅的次可加性」是这一整包的主引擎：可积性的一切运算性质（和、数乘、乘积、区间可加）都是它的推论。'
    },
    {
      id: 'imp.integral-order',
      kind: 'implication',
      sources: ['def.riemann-integrable'],
      target: 'prop.integral-order',
      title: '可积的定义 $\\implies$ 保序与绝对值不等式',
      proof: [
        '**保序**：设 $f \\le g$ 处处成立。对每个分割 $P$ 与每个标记 $\\xi$ 都有 $S(f, P, \\xi) \\le S(g, P, \\xi)$，令 $\\|P\\| \\to 0$ 得 $\\int f \\le \\int g$。特别地 $f \\ge 0 \\implies \\int f \\ge 0$。',
        '',
        '**绝对值**：由 $|f| = f^{+} + f^{-}$，其中 $f^{+} := \\max(f, 0)$、$f^{-} := \\max(-f, 0)$ 都是「连续函数与 $f$ 的复合」，可积（用振幅判据：$\\omega(|f|) \\le \\omega(f)$ 逐段成立）。又 $-|f| \\le f \\le |f|$，由保序性得',
        '',
        '$$-\\int |f| \\le \\int f \\le \\int |f| \\quad\\Longrightarrow\\quad \\Bigl| \\int_a^b f \\Bigr| \\le \\int_a^b |f|$$',
        '',
        '**基本估计**：$|f| \\le M$ 时由保序性 $\\int |f| \\le \\int M = M(b - a)$，配合上一条即得。∎'
      ].join('\n'),
      note: '$\\omega(|f|) \\le \\omega(f)$ 是逐段证明的：$\\sup |f| - \\inf |f| \\le \\sup f - \\inf f$（反向三角不等式）。'
    },
    {
      id: 'imp.ftc-part1',
      kind: 'implication',
      sources: ['prop.integral-linear', 'prop.integral-order', 'def.continuous'],
      target: 'thm.ftc-riemann-part1',
      title: '区间可加 + 基本估计 $\\implies$ 变上限积分的导数',
      proof: [
        '设 $|f| \\le M$。',
        '',
        '**(a)** 对 $x < y$，由区间可加性 $F(y) - F(x) = \\int_x^y f$，再由基本估计 $|F(y) - F(x)| \\le M(y - x)$。故 $F$ 是 Lipschitz 的，特别地连续（给定 $\\varepsilon > 0$ 取 $\\delta = \\varepsilon / M$，$M = 0$ 时平凡）。',
        '',
        '**(b)** 设 $f$ 在 $x_0$ 连续，给定 $\\varepsilon > 0$，取 $\\delta > 0$ 使 $|x - x_0| < \\delta$ 时 $|f(x) - f(x_0)| < \\varepsilon$。则对 $0 < h < \\delta$',
        '',
        '$$\\frac{F(x_0 + h) - F(x_0)}{h} - f(x_0) = \\frac{1}{h}\\int_{x_0}^{x_0 + h} \\bigl( f - f(x_0) \\bigr)$$',
        '',
        '（第二个等号用了区间可加性把 $\\int_{x_0}^{x_0+h} f(x_0) = h f(x_0)$ 提出来。）右端的绝对值 $\\le \\frac{1}{h} \\cdot \\varepsilon \\cdot h = \\varepsilon$，由基本估计。$h < 0$ 时同法（注意商里 $h$ 为负、积分上下限颠倒，两次符号相消）。故 $F\'(x_0) = f(x_0)$。∎'
      ].join('\n'),
      note: '(b) 的证明只用到了 $f$ 在**同一点**的连续性 —— 积分本身在别处的取值完全不参与。'
    },
    {
      id: 'imp.ftc-part2',
      kind: 'implication',
      sources: ['thm.mean-value-integral', 'prop.integral-linear'],
      target: 'thm.ftc-riemann-part2',
      title: '积分中值定理 $\\implies$ Newton–Leibniz 公式',
      proof: [
        '设 $F$ 可导、$f := F\'$ 可积。取分割 $P = \\{ a = x_0 < \\cdots < x_n = b \\}$。对每一段用 Lagrange 中值定理：存在 $\\xi_i \\in (x_{i-1}, x_i)$ 使',
        '',
        '$$F(x_i) - F(x_{i-1}) = F\'(\\xi_i)\\,\\Delta x_i = f(\\xi_i)\\,\\Delta x_i$$',
        '',
        '对各段求和，左端**裂项**：',
        '',
        '$$F(b) - F(a) = \\sum_{i} \\bigl( F(x_i) - F(x_{i-1}) \\bigr) = \\sum_i f(\\xi_i)\\,\\Delta x_i = S(f, P, \\xi)$$',
        '',
        '右端正是一个 Riemann 和。令 $\\|P\\| \\to 0$，由 $f$ 可积，$S(f, P, \\xi) \\to \\int_a^b f$；左端与 $P$ 无关，故 $F(b) - F(a) = \\int_a^b f$。∎'
      ].join('\n'),
      note: '证明里没有用到积分中值定理（那是**另一条**常用证明）；这里的要点是「**裂项**」：导数在中值点取到的值恰好把所有增量接起来。这也解释了为什么必须要求 $F\'$ 可积 —— 否则右端的 Riemann 和没有极限可言。'
    },
    {
      id: 'imp.substitution',
      kind: 'implication',
      sources: ['thm.ftc-riemann-part2'],
      target: 'prop.integration-substitution',
      title: '链式法则 + Newton–Leibniz $\\implies$ 换元公式',
      proof: [
        '设 $\\varphi$ 有连续导数，$f$ 连续，并令 $G$ 是 $f$ 的一个原函数（由第一基本定理，$G(x) := \\int_{a}^{x} f$ 就是）。则 $G(\\varphi(t))$ 对 $t$ 可导，且由链式法则',
        '',
        '$$\\frac{d}{dt} G\\bigl(\\varphi(t)\\bigr) = G\'\\bigl(\\varphi(t)\\bigr)\\,\\varphi\'(t) = f\\bigl(\\varphi(t)\\bigr)\\,\\varphi\'(t)$$',
        '',
        '右边的函数连续因而可积。对它在 $[\\alpha, \\beta]$ 上用 Newton–Leibniz：',
        '',
        '$$\\int_{\\alpha}^{\\beta} f\\bigl(\\varphi(t)\\bigr)\\varphi\'(t)\\,dt = G\\bigl(\\varphi(\\beta)\\bigr) - G\\bigl(\\varphi(\\alpha)\\bigr) = \\int_{\\varphi(\\alpha)}^{\\varphi(\\beta)} f(x)\\,dx$$',
        '',
        '最后一步再用一次 Newton–Leibniz（$G$ 是 $f$ 的原函数）。∎'
      ].join('\n'),
      note: '两个方向的换元（「凑微分」与「变量替换」）在这一个公式里，因为等式两边可以任意读：从左读是代入，从右读是替换。'
    },
    {
      id: 'imp.by-parts',
      kind: 'implication',
      sources: ['thm.ftc-riemann-part2'],
      target: 'prop.integration-by-parts',
      title: '乘积求导 + Newton–Leibniz $\\implies$ 分部积分',
      proof: [
        '设 $F, G$ 可导、$F\', G\'$ 可积。乘积求导法则给出',
        '',
        '$$(FG)\' = F\'G + FG\'$$',
        '',
        '左边可积（可积函数的乘积可积），故右边也可积。对三者在 $[a, b]$ 上用 Newton–Leibniz：',
        '',
        '$$F(b)G(b) - F(a)G(a) = \\int_a^b (FG)\' = \\int_a^b F\'G + \\int_a^b FG\'$$',
        '',
        '移项即得 $\\int_a^b FG\' = F(b)G(b) - F(a)G(a) - \\int_a^b F\'G$。∎'
      ].join('\n'),
      note: '「可积函数的乘积可积」这一步值得留意：分部积分把 $FG\'$ 的可积性**转嫁**给了 $F\'G$ —— 所以公式的真正用处是「换一个更好积的对手」。'
    },
    {
      id: 'imp.mean-value-integral',
      kind: 'implication',
      sources: ['thm.evt', 'prop.integral-order'],
      target: 'thm.mean-value-integral',
      title: '最值定理 + 保序 $\\implies$ 积分中值定理',
      proof: [
        '设 $f$ 连续、$g \\ge 0$ 可积（$g \\le 0$ 时取 $-g$）。',
        '',
        '1. 由最值定理，$f$ 在 $[a, b]$ 上取到最小值 $m$ 与最大值 $M$。',
        '2. 由 $g \\ge 0$ 得 $mg \\le fg \\le Mg$；由保序性与线性性，',
        '',
        '$$m\\int_a^b g \\le \\int_a^b fg \\le M\\int_a^b g$$',
        '',
        '3. 若 $\\int_a^b g = 0$，则三式都被夹在 $0$ 上，$\\int fg = 0 = f(\\xi) \\cdot 0$ 对任意 $\\xi$ 成立。',
        '4. 否则令',
        '',
        '$$c := \\frac{\\int_a^b fg}{\\int_a^b g} \\in [m, M]$$',
        '',
        '由介值定理，存在 $\\xi \\in [a, b]$ 使 $f(\\xi) = c$，整理即得结论。∎'
      ].join('\n'),
      note: '第 4 步用的正是**介值定理** —— 中值定理家族里唯一需要「$f$ 取遍中间值」的地方。'
    },
    {
      id: 'imp.improper-comparison',
      kind: 'implication',
      sources: ['def.improper-integral', 'thm.cauchy-criterion'],
      target: 'prop.improper-comparison',
      title: '反常积分的定义 + Cauchy 准则 $\\implies$ 比较判敛',
      proof: [
        '以无穷区间 $\\int_a^{+\\infty}$ 为例（无界函数的情形把 $R \\to \\infty$ 换成 $\\varepsilon \\to 0^{+}$，逐字照搬）。记 $I(R) := \\int_a^{R} f$。',
        '',
        '1. **Cauchy 准则的形式**：$\\int_a^{+\\infty} f$ 收敛当且仅当对每个 $\\varepsilon > 0$ 存在 $R_0$，使 $R_0 < p < q$ 时 $\\bigl| \\int_p^{q} f \\bigr| < \\varepsilon$（把数列的 Cauchy 准则用在 $R \\mapsto I(R)$ 上，配合区间可加性）。',
        '2. **绝对收敛 $\\implies$ 收敛**：若 $\\int |f|$ 收敛，则对 $p < q$，$\\bigl| \\int_p^q f \\bigr| \\le \\int_p^q |f|$，右端由第 1 步可以任意小，故 $\\int f$ 收敛。',
        '3. **比较**：设 $|f| \\le g$ 近端成立。若 $\\int g$ 收敛，则由第 1 步，$\\int_p^q |f| \\le \\int_p^q g$ 也可以任意小，故 $\\int |f|$ 收敛，再由第 2 步得 $\\int f$ 收敛。',
        '4. **非负情形的单调性**：$f \\ge 0$ 时 $R \\mapsto \\int_a^R f$ 单调递增，故收敛当且仅当它有上界。∎'
      ].join('\n'),
      note: '第 1 步是全部关键：**反常积分的收敛问题被翻译成「尾部的积分可以任意小」**，从此与级数判敛的套路完全平行（级数的 Cauchy 准则也长这样）。'
    },
    {
      id: 'imp.riemann-implies-lebesgue',
      kind: 'implication',
      sources: ['thm.riemann-lebesgue-criterion', 'def.integrable'],
      target: 'prop.riemann-implies-lebesgue',
      title: 'Lebesgue 判据 $\\implies$ Riemann 积分是 Lebesgue 积分的特例',
      proof: [
        '设 $f$ 在 $[a, b]$ 上有界且 Riemann 可积。',
        '',
        '1. **可测性**：Riemann 可积给出上、下简单函数序列',
        '',
        '$$\\varphi_n := \\sum_i m_i \\chi_{I_i}, \\qquad \\psi_n := \\sum_i M_i \\chi_{I_i}$$',
        '',
        '（对一列模趋于零的分割），满足 $\\varphi_n \\le f \\le \\psi_n$ 且 $\\int (\\psi_n - \\varphi_n) = U(f, P_n) - L(f, P_n) \\to 0$（这里 $\\int$ 是 Lebesgue 积分，对简单函数与 Riemann 积分一致）。于是 $f$ 是简单函数的上确界，因而可测。',
        '2. **两个积分相等**：$\\int \\varphi_n \\to \\int_a^b f$（Riemann 侧，由下和的性质），而 $\\varphi_n \\uparrow \\bar{f} \\le f$ 点态单调上升，由单调收敛定理 $\\int \\varphi_n \\to \\int \\bar{f}$，其中 $\\bar{f} := \\sup_n \\varphi_n$。两式比较得 $\\int \\bar{f} = \\int_a^b f$。',
        '3. 同理对上简单函数 $\\psi_n$ 用控制收敛（或单调下降）得 $\\int \\underline{f} = \\int_a^b f$，其中 $\\underline{f} := \\inf_n \\psi_n$。',
        '4. 由 $\\underline{f} \\le f \\le \\bar{f}$ 与两者积分相等，得 $f = \\bar{f}$ a.e.，于是 $f$ Lebesgue 可积且 $\\int_{[a, b]} f\\,dm = \\int_a^b f$。',
        '',
        '反之：Dirichlet 函数 Lebesgue 可积（积分为 $0$）而 Riemann 不可积（见「哪些函数可积」），故不反向成立。∎'
      ].join('\n'),
      note: '第 1 步里「两个积分对简单函数一致」是可以直接验算的：简单函数的 Lebesgue 积分就是 $\\sum c_j m(E_j)$，而 $E_j$ 是有限个区间之并、$m(E_j)$ 就是长度之和 —— 与 Riemann 侧逐段求和相同。'
    }
  ]
});
