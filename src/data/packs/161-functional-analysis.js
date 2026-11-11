/* ==========================================================================
   内容包 · 泛函分析（一）：赋范空间与有界算子（16 条）
   --------------------------------------------------------------------------
   来源：用户的泛函分析讲义（`H:\Download\泛函分析`，2026-09-14 ~ 10-26，25 页手写，
   已 OCR/人工转写）。2026-09-28 那一份是这一团的主干。

   团的口径：**造出「能算长度的空间」和「能算大小的算子」这套装置**。
   顺序是硬顺序：范数 → 诱导距离 → 等价范数 → 有限维（球紧）→ 无穷维的反面
   （几乎正交）→ 算子 → 有界 ⟺ 连续 → 算子范数 → B(E,F) 完备 → 对偶 E*。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '泛函分析：赋范空间与有界算子',

  nodes: [

    /* ------------------------------------------------------------ 范数 */
    {
      id: 'def.norm',
      cluster: 'fa.norm',
      type: 'definition',
      label: '范数',
      title: '范数（赋范空间）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '赋范空间', '范数'],
      statement: [
        '设 $E$ 是 $\\mathbb{K}$（$\\mathbb{K} = \\mathbb{R}$ 或 $\\mathbb{C}$）上的向量空间。函数 $\\|\\cdot\\| : E \\to [0, +\\infty)$ 叫**范数**，若',
        '',
        '1. $\\|x\\| = 0 \\iff x = 0$；',
        '2. $\\|\\lambda x\\| = |\\lambda|\\,\\|x\\|$；',
        '3. $\\|x + y\\| \\le \\|x\\| + \\|y\\|$。',
        '',
        '带范数的空间叫**赋范空间**。只满足 2、3（允许非零元素有零范数）叫**半范数**。'
      ].join('\n'),
      notes: [
        '范数比距离多的是**线性**：它只记住「离原点多远」，距离由平移得到（见「范数诱导的距离」）。所以赋范空间是「有原点、有尺度、平移不变」的度量空间。',
        '⚠️ 半范数不等于范数：商掉零范数子空间才成为范数（$L^p$ 的构造里「$\\|f\\|_p = 0$ 只说明 $f = 0$ a.e.」就是这件事，见「$L^p$ 范数」）。',
        ,
        '**各方向用到的假设**（范数公理中的等价与由公理推出的事实要分开）：\n' +
        '- 范数 $\\iff$ 满足三条公理：两方向都是定义展开，不要求完备性或有限维。\n' +
        '- $x=0\\implies\\|x\\|=0$：由绝对齐次性取标量零即得；反向是正定性公理，不能从齐次性和三角不等式推出。\n' +
        '- 半范数 $\\implies$ 范数仅在零空间为零时成立；非零空间上的零函数是反例。商掉零空间所得范数的良定义用三角不等式，不用选择公理。\n\n📌 **赋范空间**的定义见 `def.normed-space`。\n'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有限维', 'Rudin, Functional Analysis, Ch. 1'],
    },

    /* ------------------------------------------------ 范数诱导的距离 */
    {
      id: 'prop.norm-induces-metric',
      cluster: 'fa.norm',
      type: 'proposition',
      label: '范数诱导的距离',
      title: '范数诱导的距离：平移不变 + 齐次',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '赋范空间', '度量'],
      statement: [
        '令 $d(x, y) := \\|x - y\\|$。则 $d$ 是 $E$ 上的距离，并且',
        '',
        '- **平移不变**：$d(x + z,\\ y + z) = d(x, y)$；',
        '- **齐次**：$d(\\lambda x,\\ \\lambda y) = |\\lambda|\\,d(x, y)$；',
        '- 每个球 $B(x, r)$ 都是**凸**的。',
        '',
        '反过来，若距离满足平移不变与齐次，则 $\\|x\\| := d(x, 0)$ 是范数，且它诱导回这个距离。'
      ].join('\n'),
      notes: [
        '这条说清了「赋范」比「度量」多出来的是什么：**平移不变 + 齐次 + 球凸**。所以「这个度量是否来自范数」是一个有内容的问题（反例：$\\min(d, 1)$ 与 $\\sum_i 2^{-i}\\frac{|x_i - y_i|}{1 + |x_i - y_i|}$ 都**平移不变**，缺的是**齐次性**：前者取 $x = 1, y = 0, \\lambda = 2$ 得 $1 \\ne 2$）。',
        '⭐ 球凸这一条后面要用两次：凸集上的最近点（Hilbert 的投影定理）、以及「开球的像是否开」（开映射定理）。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有限维'],
    },

    /* -------------------------------------------------------- 等价范数 */
    {
      id: 'def.norm-equivalence',
      cluster: 'fa.norm',
      type: 'definition',
      label: '等价范数',
      title: '强弱范数与等价范数',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '赋范空间', '范数'],
      statement: [
        '设 $p, q$ 是 $E$ 上两个范数。称 $p$ **强于** $q$（记 $q \\preceq p$），若存在 $C > 0$ 使',
        '',
        '$$q(x) \\le C\\,p(x) \\qquad \\forall x \\in E .$$',
        '',
        '若互相强于，称 $p$ 与 $q$ **等价**，记 $p \\sim q$。'
      ].join('\n'),
      notes: [
        '- (a) 等价' +
        '- (b) 诱导同一个拓扑' +
        '- (c) 同一批 Cauchy 列' +
        '- (d) 同一批收敛列。',
        '⚠️ 强弱不对称，而且方向和直觉相反：**强**范数（$p$ 大）的球更小、开集**更多**、收敛更难、Cauchy 列**更少**。所以「换成强范数」会**减少**收敛的东西 —— 这也是为什么要挑最弱的、够用的范数（例如弱拓扑）。',
        '⚠️ 等价不保完备性以外的一切：两个等价范数下完备性一样（Cauchy 列集合相同），但**极值问题**的答案可以不同（球不同）。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有限维'],
    },

    /* ---------------------------------------------- 有限维范数都等价 */
    {
      id: 'thm.norm-equiv-finite-dim',
      cluster: 'fa.norm',
      type: 'theorem',
      hypotheses: ['有限维'],
      label: '有限维范数等价',
      title: '有限维空间上所有范数等价',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '赋范空间', '有限维'],
      statement: [
        '设 $\\dim E < \\infty$。则 $E$ 上任意两个范数等价；等价地，任取一组基 $e_1, \\ldots, e_n$，则存在 $\\alpha, \\beta > 0$ 使',
        '',
        '$$\\alpha\\,\\|x\\|_\\infty \\le \\|x\\| \\le \\beta\\,\\|x\\|_\\infty , \\qquad \\|x\\|_\\infty := \\max_{1 \\le k \\le n} |x_k| .$$'
      ].join('\n'),
      notes: [
        '证法只有两步：**上界**用三角不等式 $\\|x\\| \\le \\sum |x_k|\\,\\|e_k\\| \\le \\|x\\|_\\infty \\sum \\|e_k\\|$；\n\n**下界**把 $\\|\\cdot\\|$ 看成单位球面 $S = \\{x : \\|x\\|_\\infty = 1\\}$ 上的连续函数 —— $S$ 紧、$\\|\\cdot\\|$ 无处为零，故取下确界 $\\alpha > 0$。',
        '⭐ 整条定理的实质是「**紧 + 连续 + 无零点 $\\implies$ 有正的最小值**」，也就是「单位球面紧」。所以它在无穷维必错（见「单位球紧 $\\iff$ 有限维」）。',
        '⚠️ 反例（讲义没有列，但值得记）：$C[0,1]$ 上 $\\|\\cdot\\|_\\infty$ 严格强于 $\\|\\cdot\\|_1$：$f_n(x) = x^n$ 在 $\\|\\cdot\\|_1$ 下趋于 $0$，却**不**一致收敛于 $0$（点态极限是 $x = 1$ 处的跳变）。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有限维'],
    },

    /* -------------------------------------------- 几乎正交（Riesz 引理） */
    {
      id: 'lem.almost-orthogonal',
      cluster: 'fa.norm',
      type: 'lemma',
      label: '几乎正交引理',
      title: '闭真子空间外的单位向量（Riesz 引理）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '赋范空间', '子空间'],
      statement: [
        '设 $F \\subset E$ 是赋范空间 $E$ 的**闭**真子空间。则对每个 $\\varepsilon \\in (0,1)$ 存在 $e \\in E$ 使',
        '',
        '$$\\|e\\| = 1, \\qquad d(e, F) := \\inf_{y \\in F} \\|e - y\\| \\ge 1 - \\varepsilon .$$'
      ].join('\n'),
      notes: [
        '证明：取 $x \\notin F$，因 $F$ 闭有 $d := d(x, F) > 0$；取 $y\' \\in F$ 使 $\\|x - y\'\\| \\le d/(1 - \\varepsilon)$，令 $e = (x - y\')/\\|x - y\'\\|$。\n\n对任意 $y \\in F$，$y\' + \\|x - y\'\\|\\,y \\in F$，于是',
        '',
        '$$\\|e - y\\| = \\frac{\\|x - y\' - \\|x - y\'\\| y\\|}{\\|x - y\'\\|} \\ge \\frac{d}{\\|x - y\'\\|} \\ge 1 - \\varepsilon .$$',
        '⭐ 这叫「几乎正交」：**在无穷维里拿不到真正的正交**（一般没有内积），只能拿到「$1 - \\varepsilon$ 的正交」。这一步是「有限维 $\\ne$ 无穷维」最省力的裂缝，单位球紧性的反方向全靠它。',
        '⭐ 反面参照：Hilbert 空间里可以取 $\\varepsilon = 0$（每个闭子空间都有正交补，见「闭子空间的正交投影」）—— 这也说明 Hilbert 空间在赋范空间里是「特殊的好」。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有限维'],
    },

    /* ------------------------------------------------ 单位球紧 ⟺ 有限维 */
    {
      id: 'thm.riesz-ball-compact',
      cluster: 'fa.norm',
      type: 'theorem',
      hypotheses: ['有限维'],
      label: '单位球紧 ⟺ 有限维',
      title: '闭单位球紧 $\\iff$ 有限维（Riesz）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '紧性', '有限维'],
      statement: [
        '赋范空间 $E$ 的闭单位球 $B_E = \\{x \\in E : \\|x\\| \\le 1\\}$ 紧 $\\iff$ $\\dim E < \\infty$。'
      ].join('\n'),
      notes: [
        '「$\\Longleftarrow$」：有限维时所有范数等价（`thm.norm-equiv-finite-dim`），于是可以用 $\\|\\cdot\\|_\\infty$ 的坐标球来判断紧性；\n\n而坐标球 $\\overline{B}^{\\infty}(0,1)$ 是有界闭集（实情形就是 $[-1,1]^{n}$；复情形是单位多圆柱，看作 $\\mathbb{R}^{2n}$ 的闭有界集），由 Heine–Borel（`cor.heine-borel`）紧。\n\n∎',
        '「$\\implies$」：若 $\\dim E = \\infty$，用 Riesz 引理（`lem.almost-orthogonal`）递归造单位向量 $\\|e_n - e_m\\| \\ge 1/2$（$n \\ne m$），这样的序列没有收敛子列，于是闭单位球不列紧、因而不紧。',
        '',
        '⭐ 这一条是「有限维  当且仅当  局部紧」的一半：有限维赋范空间局部紧，无穷维的**从不**局部紧。它也是「有界闭集紧」只在有限维成立的精确版本 —— 无穷维里 Heine–Borel 失效。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有限维', 'Riesz 1918'],
    },

    /* -------------------------------------------------- 有界线性算子 */
    {
      id: 'def.bounded-operator',
      cluster: 'fa.norm',
      type: 'definition',
      label: '有界线性算子',
      title: '有界线性算子与算子范数',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '有界算子', '算子范数'],
      statement: [
        '设 $u : E \\to F$ 线性。称 $u$ **有界**，若存在 $C$ 使 $\\|u(x)\\| \\le C\\|x\\|$ 对一切 $x$ 成立。全体记 $B(E, F)$，并记 $B(E) := B(E, E)$。定义',
        '',
        '$$\\|u\\| := \\sup_{\\|x\\| \\le 1} \\|u(x)\\| = \\sup_{\\|x\\| = 1} \\|u(x)\\| = \\sup_{x \\ne 0} \\frac{\\|u(x)\\|}{\\|x\\|} ,$$',
        '',
        '它使 $B(E, F)$ 成为赋范空间（$E = 0$ 时约定 $\\|u\\| = 0$）。'
      ].join('\n'),
      notes: [
        '⚠️ **名字是个历史误会**：这里「有界」**不是**「函数有界」：线性映射作为函数有界 $\\iff$ 它是零映射（任意 $E \\ne 0$ 的零映射都符合）。真正的含义是「把有界集送到有界集」，等价于**连续**（下一条）。读老书时别被这个名字带歪。',
        '⚠️ 三个 sup 相等要求 $E \\ne 0$（否则球面空集、sup 无意义）。',
        '⭐ $E$ 无穷维且 $F \\ne \\{0\\}$ 时 $L(E, F) \\ne B(E, F)$：不连续的线性算子确实存在（要用选择公理造）。所以本图把「线性」与「有界」分成两个节点：$L(E,F)$ 是**代数**上的 Hom，$B(E,F)$ 是其中连续的那部分。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 有界线性算子、对偶与 Neumann 级数'],
    },

    /* -------------------------------------- 连续 ⟺ 有界（线性专属） */
    {
      id: 'thm.linear-continuous-bounded',
      cluster: 'fa.norm',
      type: 'theorem',
      label: '连续 ⟺ 有界',
      title: '线性映射连续 $\\iff$ 有界',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '有界算子', '连续'],
      statement: [
        '设 $E, F$ 是赋范空间，$u : E \\to F$ 线性。则下列**等价**：',
        '',
        '1. $u$ 连续；',
        '2. $u$ 在**某一点**连续；',
        '3. $u$ 在 $0$ 连续；',
        '4. $u$ 有界（即 $\\|u(x)\\| \\le C\\|x\\|$）；',
        '5. $u$ 是 Lipschitz 的。'
      ].join('\n'),
      notes: [
        '唯一有内容的一步是「在 0 连续 $\\implies$ 有界」，而且必须反证：若不存在这样的 $C$，则对每个 $n$ 有 $x_n$ 使 $\\|u(x_n)\\| \\ge n\\|x_n\\|$；\n\n令 $y_n = x_n / (n\\|x_n\\|)$，则 $\\|y_n\\| \\to 0$ 而 $\\|u(y_n)\\| \\ge 1$ —— 与在 $0$ 连续矛盾。',
        '⭐ 「一点连续就处处连续」是**线性**的赠品（平移把任意点搬到 $0$）。对非线性映射这句话当然错。',
        '⭐ 于是「连续线性算子」「有界线性算子」「Lipschitz 线性算子」从此是同义词，$B(E,F)$ 这个名字里的「B」正是 bounded。',
        ,
        '**各方向用到的假设**（五条里前四条几乎免费，真正的代价在最后一条）：\n' +
        '\n' +
        '- (1) $\\iff$ (2) $\\iff$ (3)：**只需要「线性」+「平移」**。线性映射把 $a$ 处的连续性平移到 $0$：$u(x) - u(x_{0}) = u(x - x_{0})$；反过来 $0$ 处连续也平移到任意点。这一步**不用完备性、不用有限维**。\n' +
        '- (3) $\\implies$ (4)：**只用 $\\varepsilon$-$\\delta$ 的定义**。取 $\\varepsilon = 1$，得 $\\delta > 0$ 使 $\\lVert x\\rVert \\le \\delta \\implies \\lVert u(x)\\rVert \\le 1$；再由齐次性 $\\lVert u(x)\\rVert \\le \\frac{1}{\\delta}\\lVert x\\rVert$。**注意这里用到的正是线性**（齐次性），非线性映射即使连续也不「有界」。\n' +
        '- (4) $\\implies$ (1)：**一行**：$\\lVert u(x) - u(y)\\rVert \\le C\\lVert x - y\\rVert$。\n' +
        '- (4) $\\iff$ (5)：**只差一个常数**。有界 $\\implies$ Lipschitz（取 $C$）；Lipschitz $\\implies$ 有界（$x = 0$ 处取 $C$ 并平移）。\n' +
        '- ⚠️ **「某一点连续」不能弱成「某一点处有界」**：后者对任意映射都无意义（有界性对线性映射才是全局概念）。这一条的实质是「一点连续 $\\implies$ 处处连续」，而它**只对线性映射成立**。\n' +
        '\n' +
        '**几个需要留意的边界**：\n' +
        '\n' +
        '- **不需要完备性**：五条等价在任意赋范空间（哪怕不完备）上都成立。这一点常被误记成「Banach 空间才成立」——其实只有**开映射/闭图像/一致有界**那三条才要完备性。\n' +
        '- **不能去掉线性**：$f : \\mathbb{R} \\to \\mathbb{R}$，$f(x) = x^{2}$ 处处连续但不 Lipschitz、也不「有界」（在 $\\lVert f(x)\\rVert \\le C\\lVert x\\rVert$ 的意义下）。\n' +
        '- **有界 $\\ne$ 函数值有界**：线性映射的「有界」是「把有界集送到有界集」，与「$\\sup\\lVert u\\rVert < \\infty$ 于整个空间」无关（后者对非零线性映射永远不成立）。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 有界线性算子、对偶与 Neumann 级数'],
    },

    /* ------------------------------------------------ 算子代数结构 */
    {
      id: 'prop.operator-algebra',
      cluster: 'fa.norm',
      type: 'proposition',
      label: '算子乘法的范数不等式',
      title: '复合与算子范数：$\\|vu\\| \\le \\|v\\|\\,\\|u\\|$',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '有界算子', 'Banach 代数'],
      statement: [
        '设 $u \\in B(E, F)$，$v \\in B(F, G)$。则 $v \\circ u \\in B(E, G)$ 且',
        '',
        '$$\\|v \\circ u\\| \\le \\|v\\| \\, \\|u\\| .$$',
        '',
        '特别地 $B(E)$ 是**赋范代数**（乘法连续）；$E \\ne \\{0\\}$ 时 $\\|\\mathrm{id}\\| = 1$。'
      ].join('\n'),
      notes: [
        '一句话：$\\|vu(x)\\| \\le \\|v\\|\\,\\|u(x)\\| \\le \\|v\\|\\,\\|u\\|\\,\\|x\\|$。',
        '⚠️ $B(E)$ 一般**不交换**（$\\dim E \\ge 2$ 时），所以它是「非交换 Banach 代数」的原型，而不是函数代数的类比对象。',
        '$\\|\\cdot\\|$ 是**次可乘**的（submultiplicative）——这条不等式就是「Banach 代数」定义里的第二条，也是 Neumann 级数能收敛的唯一依据。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 有界线性算子、对偶与 Neumann 级数'],
    },

    /* ---------------------------------------------------- Banach 代数 */
    {
      id: 'def.banach-algebra',
      cluster: 'fa.norm',
      type: 'definition',
      label: 'Banach 代数',
      title: 'Banach 代数',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 代数'],
      statement: [
        '结合代数 $\\mathcal{A}$ 配范数 $\\|\\cdot\\|$ 叫 **Banach 代数**，若',
        '',
        '1. $(\\mathcal{A}, \\|\\cdot\\|)$ 是 Banach 空间；',
        '2. 乘法次可乘：$\\|xy\\| \\le \\|x\\|\\,\\|y\\|$。',
        '',
        '若还有单位元且 $\\|1\\| = 1$，叫**含单位 Banach 代数**。'
      ].join('\n'),
      notes: [
        '2 保证乘法连续（双线性 + 有界）。',
        '例：$B(E)$（$E$ Banach）、$C(K)$（$K$ 紧 Hausdorff、上确界范数）、$L^1(\\mathbb{R})$（卷积乘法）、$\\ell^1(\\mathbb{Z})$、以及 $C^*$-代数（再要一条 $\\|x^* x\\| = \\|x\\|^2$）。',
        '⭐ 这一族是「把分析问题化成代数问题」的通用容器：Gelfand 理论（**交换含单位 $C^{*}$-代数** $\\cong C(\\text{极大理想空间})$，等距 $\\ast$-同构，Gelfand–Naimark；一般交换 Banach 代数只给同态，核是 Jacobson 根）就是从这条定义出发的。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有界算子'],
    },

    /* -------------------------------------------- B(E,F) 是 Banach */
    {
      id: 'thm.bounded-operators-banach',
      cluster: 'fa.norm',
      type: 'theorem',
      label: 'B(E,F) 完备',
      title: '$F$ 完备 $\\implies$ $B(E,F)$ 是 Banach 空间',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '有界算子', 'Banach 空间'],
      statement: [
        '设 $E$ 赋范、$F$ Banach。则 $(B(E, F), \\|\\cdot\\|)$ 是 Banach 空间。特别地，对偶空间 $E^* = B(E, \\mathbb{K})$ **总是** Banach（不论 $E$ 是否完备）。'
      ].join('\n'),
      notes: [
        '证法（逐点取极限）：取 $B(E,F)$ 里的 Cauchy 列 $u_n$。\n\n对每个 $x$，$\\|u_n x - u_m x\\| \\le \\|u_n - u_m\\|\\,\\|x\\| \\to 0$，故 $(u_n x)$ 在 $F$ 里 Cauchy，有极限 $u(x)$。\n\n$u$ 线性（极限保线性）、有界（取 $N$ 使 $n, m \\ge N$ 时 $\\|u_n - u_m\\| < \\varepsilon$，则 $\\|u(x)\\| \\le \\|u(x) - u_N(x)\\| + \\|u_N(x)\\| \\le (\\varepsilon + \\|u_N\\|)\\|x\\|$），且 $\\|u_n - u\\| \\to 0$。',
        '⭐ 要害是「$\\|u_n\\|$ 一致有界」（Cauchy 列必一致有界），所以极限的范数不会跳。',
        '⚠️ $E$ 不需要完备：完备性只用在 $F$ 上。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 有界线性算子、对偶与 Neumann 级数'],
    },

    /* ------------------------------------------------------ 对偶空间 */
    {
      id: 'def.dual-banach',
      cluster: 'fa.norm',
      type: 'definition',
      label: '连续对偶空间',
      title: '对偶空间 $E^*$（连续对偶）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '对偶空间', '有界泛函'],
      statement: [
        '赋范空间 $E$ 的**对偶空间**指',
        '',
        '$$E^* := B(E, \\mathbb{K}) , \\qquad \\|\\varphi\\| := \\sup_{\\|x\\| \\le 1} |\\varphi(x)| .$$',
        '',
        '由「$B(E,F)$ 完备」，$E^*$ 永远是 Banach 空间。'
      ].join('\n'),
      notes: [
        '⚠️ 与**代数对偶** $E^\\vee = \\operatorname{Hom}(E, \\mathbb{K})$ 区分：无穷维时 $E^* \\subset E^\\vee$，不连续的线性泛函属于后者而不属于前者（要选择公理才能造出来）。本图里 `def.dual-space` 是有限维的对偶（那时两者相同）。',
        '⭐ 对偶是把「空间」变成「函数」的唯一正经通道：弱拓扑、Riesz 表示、Hahn–Banach、对偶配对全在 $E^*$ 上进行。\n\n📌 通名「对偶空间」见 `def.dual-space`；本节点专指 **Banach 对偶** $E^{*} = B(E, \\mathbb{K})$。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 有界线性算子、对偶与 Neumann 级数'],
    },

    /* -------------------------------------------------- 稠密延拓定理 */
    {
      id: 'thm.bounded-extension',
      cluster: 'fa.norm',
      type: 'theorem',
      label: '有界算子的延拓',
      title: '稠密子空间上的有界算子唯一延拓',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '延拓', '有界算子'],
      statement: [
        '设 $E, F$ 都是 Banach 空间，$G \\subseteq E$ 是**稠密**子空间，$u : G \\to F$ 有界（线性）。则存在**唯一**的有界线性 $\\tilde u : E \\to F$ 使 $\\tilde u|_G = u$，并且',
        '',
        '$$\\|\\tilde u\\| = \\|u\\| .$$'
      ].join('\n'),
      notes: [
        '证法：给 $x \\in E$ 取 $g_n \\in G$，$g_n \\to x$。\n\n' +
        '由 $\\|u(g_n) - u(g_m)\\| \\le \\|u\\|\\,\\|g_n - g_m\\|$ 知 $(u(g_n))$ 是 Cauchy 列，$F$ 完备给出极限；\n\n' +
        '定义 $\\tilde u(x) := \\lim_n u(g_n)$（与取法无关），逐条验证线性、$\\|\\tilde u\\| \\le \\|u\\|$，而在 $G$ 上 $\\tilde u = u$ 又给出 $\\|\\tilde u\\| \\ge \\|u\\|$。',
        '⭐ 这是「**先在好用的稠密子集上造算子，再延拓**」的许可证：Fourier 变换（$L^1 \\cap L^2$ 上先定义）、Stieltjes 积分、特征值问题的变分形式，全走这一步。',
        '⚠️ $F$ 完备不能去掉（去掉就没有极限可拿）；$G$ 稠密也不能去掉（不稠密时延拓不唯一，只剩 Hahn–Banach 那种「保范但有选择」的延拓）。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 赋范空间与有界算子'],
    },

    /* --------------------------------------------------- Neumann 级数 */
    {
      id: 'thm.neumann-series',
      cluster: 'fa.norm',
      type: 'theorem',
      label: 'Neumann 级数',
      title: '$\\|u\\| < 1 \\implies I - u$ 可逆（Neumann 级数）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '有界算子', '可逆性'],
      statement: [
        '设 $E$ Banach，$u \\in B(E)$，$\\|u\\| < 1$。则 $I - u$ 可逆，且',
        '',
        '$$(I - u)^{-1} = \\sum_{k=0}^{\\infty} u^k , \\qquad \\|(I - u)^{-1}\\| \\le \\frac{1}{1 - \\|u\\|} ,$$',
        '',
        '右端按算子范数绝对收敛。'
      ].join('\n'),
      notes: [
        '证法：$\\|u^k\\| \\le \\|u\\|^k$（次可乘），故 $\\sum \\|u^k\\| \\le (1 - \\|u\\|)^{-1} < \\infty$；$B(E)$ 完备（$E$ 完备 +「$B(E,F)$ 完备」）故级数收敛到某 $v$。\n\n部分和满足 $(I - u)\\sum_{k<n} u^k = I - u^n \\to I$，同法右乘，得 $v = (I-u)^{-1}$。',
        '⭐ 这是三大定理之外最常用的「开工工具」：它给的是**显式**的逆，且只要求 $\\|u\\| < 1$。摄动论（$A + tB$ 的谱、Kato 的解析扰动）、数值分析里的迭代收敛、Banach 逆映射定理里的局部逆，全靠它。',
        '⚠️ 反过来「$I - u$ 可逆 $\\implies$ $\\|u\\| < 1$」是**错的**：$u = -2I$ 时 $I - u = 3I$ 可逆。有界逆定理给的是另一件事（双射 $\\implies$ 逆连续），不是这条。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · 有界线性算子、对偶与 Neumann 级数'],
    },

    /* -------------------------------------------------------- 可分性 */
    {
      id: 'def.separable-space',
      cluster: 'fa.norm',
      type: 'definition',
      label: '可分空间',
      title: '可分空间',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '可分空间', '基数'],
      statement: [
        '拓扑空间（特别地赋范空间）$E$ 叫**可分**，若它含一个可数稠密子集。'
      ].join('\n'),
      notes: [
        '**可分的**：$\\ell^p(\\mathbb{N})$（$1 \\le p < \\infty$）、$L^p(\\Omega)$（Lebesgue 测度、$1 \\le p < \\infty$）、$C(K)$（$K$ 紧度量）、任何有限维空间。',
        '**不可分的**：$\\ell^\\infty(\\mathbb{N})$。证法：取 $A = \\{(e_n) : e_n = \\pm 1\\}$（$2^{\\aleph_0}$ 个点），任意两点距离 $\\ge 2$，故半径 $1$ 的两两不交球有不可数多个 —— 可数稠密集顶多覆盖可数多个。',
        '⭐ 讲义里那句「不可分 $\\implies$ 不能由一个可数集作为代数生成」很值得记：它把「基」的直觉挡在门外 —— $\\ell^\\infty$ 连可数 Schauder 基都没有（见「Schauder 基」）。',
        '⚠️ 可分性对**连续像**遗传（$D$ 可数稠密 $\\implies$ $f(D)$ 在 $f(X)$ 中稠密）；在**度量空间**里对子空间也遗传，但一般拓扑空间不成立（$D$ 不可数、开集全取含 $p$ 的集合时，$X = D \\cup \\{p\\}$ 可分而闭子空间 $D$ 是不可数离散空间）。乘积也不遗传：$\\{0,1\\}^{I}$（$\\#I > 2^{\\aleph_0}$）不可分，而 $\\mathbb{R}^{\\mathbb{R}}$ **反而可分**。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ----------------------------------------------------- Schauder 基 */
    {
      id: 'def.schauder-basis',
      cluster: 'fa.norm',
      type: 'definition',
      label: 'Schauder 基',
      title: 'Schauder 基',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '基', '可分空间'],
      statement: [
        '赋范空间 $E$ 的序列 $(e_n)_{n \\in \\mathbb{N}}$ 叫 **Schauder 基**，若对每个 $x \\in E$ 存在**唯一**的标量列 $(a_n)$ 使',
        '',
        '$$x = \\sum_{n=1}^{\\infty} a_n e_n \\qquad (\\text{按范数收敛}) .$$'
      ].join('\n'),
      notes: [
        '🆚 **Hamel 基（代数基）**：只允许**有限**线性组合。无穷维 Banach 空间的 Hamel 基一定**不可数**（Baire 纲定理的经典应用：若可数，则 $E$ 是可数个有限维闭子空间之并，与 Baire 矛盾）。',
        'Schauder 基要求的是**级数收敛**，所以可以是可数的；而且 Schauder 基 $\\implies$ **可分**（有理系数的有限组合稠密）。',
        '⚠️ 「有 Schauder 基」曾长期是开放问题：Enflo (1973) 造出无 Schauder 基的可分 Banach 空间，所以它**不能**当成默认假设。',
        '⚠️ 与 Hilbert 空间的「正交基」不同：Schauder 基不要求正交、也不要求唯一性来自内积。Hilbert 空间里**可数**正交归一基（枚举后）一定是 Schauder 基，反之不然；不可数指标集的 $\\ell^2(I)$ 有完备正交归一族，但任何序列只涉及可数多个坐标，闭张成漏掉其余基向量 —— 那不是 Schauder 基（该空间也不可分）。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基', 'Enflo, Acta Math. 130 (1973)'],
    },

    /* ---------------------------------------------------------- ℓ²(I) */
    {
      id: 'def.ell2-space',
      cluster: 'fa.norm',
      type: 'definition',
      label: 'ℓ²(I)',
      title: '$\\ell^2(I)$：任意指标集上的平方可和族',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '序列空间'],
      statement: [
        '对任意指标集 $I$，令',
        '',
        '$$\\ell^2(I) := \\left\\{ x = (x_i)_{i \\in I} \\subseteq \\mathbb{K} \\ : \\ \\|x\\|_2 := \\sup_{\\substack{J \\subseteq I \\\\ \\#J < \\infty}} \\Bigl( \\sum_{j \\in J} |x_j|^2 \\Bigr)^{1/2} < \\infty \\right\\} ,$$',
        '',
        '内积 $\\langle x, y\\rangle := \\sum_{i \\in I} x_i \\overline{y_i}$。'
      ].join('\n'),
      notes: [
        '⭐ 那个「上确界」是为了绕开「不可数求和」：$\\|x\\|_2 < \\infty$ 时，$\\{i : x_i \\ne 0\\}$ 一定**至多可数**（否则取 $J_n$ 含 $n$ 个 $|x_j| > 1/n$ 的指标，得 $\\|x\\|_2^2 \\ge n \\cdot 1/n^2 = 1/n \\to 0$ 的矛盾），于是求和其实是对一个可数集求和。',
        '于是 $(x_i) \\mapsto$（非零坐标的级数）是良定义的，$\\ell^2(I)$ 是 Hilbert 空间（完备性由「$\\ell^p(I)$ 是 Banach」那类逐项论证给出）。',
        '⭐ 这条是「可分 Hilbert 空间 $\\cong \\ell^2$」里 $\\ell^2$ 那一端：$I$ 取可数时就是通常的 $\\ell^2$。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ============================================================ Hilbert 空间 */
    {
      id: 'def.hilbert-space',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: 'Hilbert 空间',
      title: 'Hilbert 空间（完备的内积空间）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '内积'],
      statement: [
        '设 $(H, \\langle\\cdot, \\cdot\\rangle)$ 是 $\\mathbb{K}$ 上的内积空间（**对第一变元线性，对第二变元共轭线性**），配范数 $\\|x\\| := \\sqrt{\\langle x, x\\rangle}$。\n\n若 $(H, \\|\\cdot\\|)$ 完备，则叫 **Hilbert 空间**。'
      ].join('\n'),
      notes: [
        '原型：$L^2(\\Omega, \\mu)$（完备性来自 Riesz–Fischer），以及 $\\ell^2(I)$。有限维内积空间自动完备，所以它们是退化的 Hilbert 空间。',
        '⚠️ 惯例冲突：数学文献常取「对第一变元线性」，物理（Dirac）取「对第二变元线性」。差一个共轭，但**改惯例会连带改 Riesz 表示里的共轭线性**（$y \\mapsto \\langle \\cdot , y\\rangle$ 是共轭线性还是线性），所以一份文档里必须统一。',
        '⭐ Hilbert 空间 = 「自对偶的 Banach 空间」（见「Riesz 表示定理（Hilbert 版）」），这是它能把线性泛函当成向量用的根源。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ------------------------------------------------------- 极化恒等式 */
    {
      id: 'thm.polarization',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: '极化恒等式',
      title: '极化恒等式：内积由范数恢复',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '内积'],
      statement: [
        '在实内积空间：',
        '',
        '$$\\langle x, y\\rangle = \\tfrac{1}{4}\\bigl( \\|x + y\\|^2 - \\|x - y\\|^2 \\bigr) .$$',
        '',
        '在复内积空间：',
        '',
        '$$\\langle x, y\\rangle = \\tfrac{1}{4}\\sum_{k=0}^{3} i^k \\,\\| x + i^k y \\|^2 .$$'
      ].join('\n'),
      notes: [
        '直接把 $\\|x \\pm y\\|^2 = \\|x\\|^2 \\pm 2\\,\\operatorname{Re}\\langle x,y\\rangle + \\|y\\|^2$ 相减即得实情形；复情形多取一个 $iy$ 把虚部抽出来。',
        '⭐ 意义：**内积完全由范数决定**。所以「两个内积空间等距」就等于「内积空间同构」；也所以判断「一个范数是否来自内积」才是一个真问题（下一条）。',
        '⚠️ 复情形的系数是 $i^k$（四个都要：$1, i, -1, -i$），不是 $(-1)^k$ ——写成 $(-1)^k$ 只能抽出实部，会把内积丢掉一半信息。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* -------------------------------------------- 平行四边形法则刻画内积 */
    {
      id: 'thm.parallelogram-inner-product',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: '平行四边形法则',
      title: '平行四边形法则 $\\iff$ 范数来自内积（Jordan–von Neumann）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '范数'],
      statement: [
        '赋范空间 $E$ 的范数来自某个内积 $\\iff$ 它对一切 $x, y$ 满足**平行四边形法则**',
        '',
        '$$\\|x + y\\|^2 + \\|x - y\\|^2 = 2\\|x\\|^2 + 2\\|y\\|^2 .$$'
      ].join('\n'),
      notes: [
        '「$\\Longleftarrow$」分三段（顺序不能换）：\n\n' +
        '1. **用极化恒等式定义内积**。\n\n' +
        '实情形取 $\\langle x,y\\rangle := \\frac14\\bigl(\\|x+y\\|^2 - \\|x-y\\|^2\\bigr)$；\n\n' +
        '复情形取 $\\langle x,y\\rangle := \\frac14\\sum_{k=0}^{3} i^{k}\\|x + i^{k} y\\|^2$。\n\n' +
        '这一段的要点是：平行四边形法则恰好保证「展开后的交叉项能两两抵消」，所以范数真的能反推出双线性型。\n\n' +
        '\n\n' +
        '2. **加法性**。\n\n' +
        '把 $\\langle x, y+z\\rangle$ 与 $\\langle x,y\\rangle + \\langle x,z\\rangle$ 相减，展开成 8 个范数平方项；\n\n' +
        '对 $(y, z)$ 与 $(x,\\, y+z)$ 各用一次平行四边形法则，所有项成对抵消，得 $0$。\n\n' +
        '这一步**只用平行四边形法则**，不假设任何线性。\n\n' +
        '\n\n' +
        '3. **齐次性**。\n\n' +
        '先对 $\\lambda \\in \\mathbb{Q}$：整数由加法性归纳，分母靠 $n\\langle x, y\\rangle = \\langle x, ny\\rangle$；\n\n' +
        '再对 $\\lambda \\in \\mathbb{R}$ 取有理数列 $\\lambda_n \\to \\lambda$，用**范数连续**（$\\bigl|\\|u\\| - \\|v\\|\\bigr| \\le \\|u - v\\|$）取极限。\n\n' +
        '复情形额外验一条 $\\langle x, iy\\rangle = i\\langle x,y\\rangle$，之后按 $\\mathbb{C}$-线性延拓，其余公理随实情形继承。\n\n' +
        '\n\n' +
        '✓ 至此三条公理齐备；\n\n' +
        '正定性来自 $\\langle x,x\\rangle = \\|x\\|^2 \\ge 0$，且等号 $\\iff x = 0$。',
        '⭐ 经典反例：$\\ell^1$、$\\ell^\\infty$、$C[0,1]$ 都不满足（取不交支撑的 $x, y$ 一看）。所以它们的范数**不是**内积给的 —— 这是「Hilbert 空间为什么特殊」的定量答案。',
        '⚠️ 讲义里写的是「$\\|x+y\\|^2 + \\|x-y\\|^2 = 2\\|x\\|^2 + 2\\|y\\|^2$」加一句「平行四边行」——把几何里的「平行四边形两条对角线平方和 = 四边平方和」直接搬到了范数上。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基', 'Jordan–von Neumann, Ann. of Math. 36 (1935)'],
    },

    /* ------------------------------------ Hilbert 空间一致凸（平行四边形律） */
    {
      id: 'thm.hilbert-uniformly-convex',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: 'Hilbert 空间一致凸',
      title: 'Hilbert 空间一致凸（平行四边形律）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '一致凸'],
      statement: [
        '设 $H$ 是 Hilbert 空间。则 $H$ **一致凸**：对每个 $\\varepsilon \\in (0, 2]$，取',
        '',
        '$$\\delta = 1 - \\sqrt{1 - \\varepsilon^{2}/4} > 0 ,$$',
        '',
        '则当 $\\|x\\| = \\|y\\| = 1$、$\\|x - y\\| \\ge \\varepsilon$ 时，$\\left\\|\\frac{x + y}{2}\\right\\| \\le 1 - \\delta$。'
      ].join('\n'),
      notes: [
        '**证明。** 令 $\\|x\\| = \\|y\\| = 1$。由平行四边形律，',
        '',
        '$$\\|x + y\\|^{2} + \\|x - y\\|^{2} = 2\\|x\\|^{2} + 2\\|y\\|^{2} = 4 ,$$',
        '',
        '即 $\\left\\|\\frac{x + y}{2}\\right\\|^{2} = 1 - \\frac{\\|x - y\\|^{2}}{4}$。当 $\\|x - y\\| \\ge \\varepsilon$ 时右端 $\\le 1 - \\varepsilon^{2}/4$，开方得 $\\left\\|\\frac{x + y}{2}\\right\\| \\le \\sqrt{1 - \\varepsilon^{2}/4} = 1 - \\delta$。$\\blacksquare$'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基']
    },

    /* ------------------------------------------- 凸集与星形集 */
    {
      id: 'def.convex-set',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: '凸集',
      title: '凸集：任意两点的连线不跑出集合',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '凸集', '凸组合'],
      statement: [
        '设 $V$ 是实向量空间，$C \\subseteq V$。称 $C$ 为**凸集**，若 对任意 $x, y \\in C$、$t \\in [0,1]$，',
        '',
        '$$(1-t)x + ty \\in C.$$',
        '',
        '等价地：$C$ 包含任意两点之间的整条线段。'
      ].join('\n'),
      notes: '⭐ 凸性只用**仿射结构**，不需要范数或内积；在无穷维里它是「极小元存在」的关键假设（见 thm.projection-convex）。\n\n⚠ 空集按此定义也是凸集（「任意两点」条件真空成立）；需要非空时会在定理里单独假设（如投影定理）。\n\n💡 凸组合、凸包、分离定理都从这里出发。',
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基']
    },
    {
      id: 'def.star-shaped',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: '星形集',
      title: '星形集：存在一个能看见全集合的点',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '凸集', '星形'],
      statement: [
        '设 $V$ 是实向量空间，$S \\subseteq V$。称 $S$ 为**星形集**，若存在 $x_{0} \\in S$，使对每个 $x \\in S$ 与 $t \\in [0,1]$，',
        '',
        '$$(1-t)x_{0} + t x \\in S.$$',
        '',
        '这样的 $x_{0}$ 叫 $S$ 的一个**星点**（star center）。'
      ].join('\n'),
      notes: '⭐ **非空**凸集一定是星形集：任取 $x_{0} \\in C$，凸性给出整条线段。空集是凸的，却一个点都没有，故不是星形集 —— 「非空」这个前提不能省。反之不然：平面里的十字形关于中心星形，却不凸。\n\n⚠ 星点不必唯一；Poincaré 引理只要求区域能缩成一点，因此星形比凸性弱（见 lem.poincare-lemma）。',
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基']
    },

    {
      id: 'def.convex-combination',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: '凸组合',
      title: '凸组合：系数非负且和为 1 的有限线性组合',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '凸集', '凸组合'],
      statement: [
        '设 $V$ 是实向量空间，$x_{1}, \\ldots, x_{n} \\in V$。若 $\\lambda_{i} \\ge 0$ 且 $\\sum_{i=1}^{n} \\lambda_{i} = 1$，称',
        '',
        '$\\sum_{i=1}^{n} \\lambda_{i} x_{i}$',
        '',
        '为这些点的一个**凸组合**。等价地，凸组合就是「先取线段、再反复取线段」得到的点；$n=2$ 时就是两点间的线段。'
      ].join('\n'),
      notes: '⭐ 凸集 $C$ 的刻画：$C$ 凸 $\\iff$ $C$ 对任意有限凸组合封闭；这是凸性从两点推广到有限点的标准方式。⚠ 这里只允许**有限**个点；无穷凸组合一般需要拓扑/收敛性，不在初等定义里。',
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基']
    },
    {
      id: 'def.convex-hull',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: '凸包',
      title: '凸包：包含 $S$ 的最小凸集',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '凸集', '凸包'],
      statement: [
        '设 $S \\subseteq V$。$S$ 的**凸包**定义为',
        '',
        '$\\operatorname{conv}(S) := \\bigcap\\{ C : C \\supseteq S,\\ C \\text{ 凸} \\}.$',
        '',
        '等价地，$\\operatorname{conv}(S)$ 恰是 $S$ 中点的所有有限凸组合之集；$S=\\emptyset$ 时为空集。'
      ].join('\n'),
      notes: '⭐ 两条等价刻画：交定义（最小凸集）与有限凸组合定义。前者说明「凸包是最小的」，后者说明「凸包里的点长什么样」。\n\n⚠ 空集的凸包是空集；不要把「凸集」默认成非空。',
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基']
    },
    /* ------------------------------------------------- 凸闭集上的投影 */
    {
      id: 'thm.projection-convex',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: '凸闭集的最近点',
      title: '凸闭集上的最近点（投影算子）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '投影', '凸集'],
      statement: [
        '设 $H$ 是 Hilbert 空间，$C \\subseteq H$ 非空、**凸**、**闭**。则',
        '',
        '1. 每个 $x \\in H$ 有**唯一**的 $y = P_C(x) \\in C$ 使 $\\|x - y\\| = d(x, C)$；',
        '2. $y = P_C(x) \\iff \\operatorname{Re}\\langle x - y, z - y\\rangle \\le 0$ 对一切 $z \\in C$；',
        '3. $\\|P_C(x) - P_C(x\')\\| \\le \\|x - x\'\\|$（非扩张）；',
        '4. $P_C \\circ P_C = P_C$。'
      ].join('\n'),
      notes: [
        '(1) 的证明全靠平行四边形法则：取极小化序列 $y_n$，则',
        '',
        '$$\\|y_n - y_m\\|^2 = 2\\|x - y_n\\|^2 + 2\\|x - y_m\\|^2 - 4\\Bigl\\| x - \\tfrac{y_n + y_m}{2} \\Bigr\\|^2 \\le 2(d^2 + \\tfrac1n) + 2(d^2 + \\tfrac1m) - 4d^2 \\to 0 ,$$',
        '',
        '（中间那个点落在 $C$ 里，所以它的距离 $\\ge d$）—— Cauchy 列 + $C$ 闭给出极限。唯一性同式取两个最小点即得。',
        '(2) 是「变分不等式」：对 $z \\in C$、$t \\in (0,1)$，$y + t(z-y) \\in C$，展开 $\\|x - (y + t(z-y))\\|^2 \\ge d^2$、舍 $t^2$ 项。',
        '⚠️ **凸**不能去掉：$\\mathbb{R}^2$ 的单位圆周上最近点不唯一；闭但不能去掉：开圆盘里没有最近点。',
        '⭐ 这是无穷维里「极小元存在」最干净的样本：强制性（$\\|x\\| \\to \\infty$）+ 弱下半连续 + 凸，就能推出存在性；这里的凸集不然。',
        ,
        '**四条里第一条是“存在+唯一”，第二条才是“怎么算”，后两条是推论**：\n' +
        '\n' +
        '- **① 存在且唯一**：存在用**极小化序列 + 凸性取中点**（$\\frac{x_{n}+x_{m}}{2}$ 仍在 $C$ 里，于是 $\\lVert\\cdot\\rVert^{2}$ 的平行四边形法则给 Cauchy），唯一用**严格凸性**（内积空间的范数是严格凸的：等号只在同一点）。⚠️ 这一步**要完备性**（Hilbert 而非一般内积空间，否则极小区间可能不收敛）。\n' +
        '- **② 变分不等式**：$y = P_C(x)$ $\\iff$ $\\operatorname{Re}\\langle x-y, z-y\\rangle \\le 0$（$\\forall z\\in C$）。$(\\implies)$ 用 $y + t(z-y) \\in C$ 对 $t \\in (0,1)$ 展开 $\\lVert x - (\\cdot)\\rVert^2$ 取 $t \\to 0$；$(\\Leftarrow)$ 由同一个展开式（凸性保证二次项 $\\ge 0$）。**这一条不需要完备性**（只要 $P_C(x)$ 存在）。\n' +
        '- **③ 非扩张**：**由 ② 两边相加**（对 $x$ 与 $x\'$ 各写一次变分不等式）得 $\\lVert P x - P x\'\\rVert^2 \\le \\operatorname{Re}\\langle x - x\', Px - Px\'\\rangle$，再 Cauchy–Schwarz。\n' +
        '- **④ 幂等**：$y \\in C$ 时 $P_C(y) = y$（距离为 $0$ 且唯一）。\n' +
        '\n' +
        '⚠️ **凸性与闭性都不可去**：非凸闭集最小点可以不唯一（圆周上两点等距）；凸但非闭可以没有最小点（$\\mathbb{R}^{2}$ 里的开半平面）。⚠️ **复 Hilbert 空间要写 $\\operatorname{Re}\\langle\\cdot,\\cdot\\rangle$**，直接写 $\\le 0$ 会退化成对复数的比较（无意义）。\n',
        ,
        '**各方向用到的假设**（存在性有完备性代价，变分刻画是局部代数论证）：\n' +
        '- 最近点 $\\implies$ 变分不等式：先要求 $y\\in C$，用凸性保证 $y+t(z-y)\\in C$，展开平方后令 $t\\to0$；不是定义展开，不需要完备性。\n' +
        '- 变分不等式 $\\implies$ 最近点：仍须 $y\\in C$，平方展开即可，此方向甚至不用凸性、闭性或完备性。\n' +
        '- 对所有 $x$ 的存在唯一性：用非空性、凸性、平行四边形恒等式、完备性及闭性；非凸圆周对圆心最近点不唯一，开区间对外点不取到距离。\n' +
        '- 非扩张由两次变分不等式与 Cauchy–Schwarz 推出；幂等由距离为零及唯一性直接得，不是四条互相等价。\n'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ----------------------------------------------- 闭子空间的正交投影 */
    {
      id: 'thm.projection-subspace',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: '闭子空间的正交投影',
      title: '正交投影与正交分解：$H = E \\oplus E^\\perp$',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '投影', '正交补'],
      statement: [
        '设 $H$ 是 Hilbert 空间，$E \\subseteq H$ 是**闭**子空间。则',
        '',
        '1. $y = P_E(x) \\iff y \\in E$ 且 $x - y \\in E^\\perp$；',
        '2. $P_E$ 线性，且 $\\|P_E\\| \\le 1$（$E \\ne 0$ 时为 $1$）；',
        '3. 正交分解 $H = E \\oplus E^\\perp$，且 $\\|x\\|^2 = \\|x - P_E x\\|^2 + \\|P_E x\\|^2$。'
      ].join('\n'),
      notes: [
        '证法：由凸闭集投影，(1) 的「$\\implies$」把 $z$ 换成 $\\pm z$ 消掉实部得 $\\operatorname{Re}\\langle x - y, z\\rangle \\le 0$ 对所有 $z \\in E$，即 $x - y \\perp E$；\n\n「$\\Longleftarrow$」用 $\\|x - z\\|^2 = \\|x - y\\|^2 + \\|y - z\\|^2 \\ge \\|x - y\\|^2$。\n\n(2) 用 $\\alpha_1 x_1 + \\alpha_2 x_2 - \\alpha_1 P x_1 - \\alpha_2 P x_2 \\perp E$。\n\n(3) 勾股定理。',
        '⚠️ 「$E$ 闭」不能去掉：$E = $ 有限支撑序列在 $\\ell^2$ 里稠密但不闭，最近点存在但**不落在 $E$ 里**，正交分解也失效。',
        '⭐ 这条是 Hilbert 空间与一般 Banach 空间的最大区别之一：一般 Banach 空间里闭子空间不一定有补（$c_0 \\subset \\ell^\\infty$ 就没有），所以「投影」这个词在 Banach 空间里不能乱用。',
        ,
        '**各方向用到的假设**（正交刻画不靠完备性，全局分解靠投影存在）：\n' +
        '- 最近点 $\\implies$ 正交：用子空间中任意实数倍方向作变分；复空间还须用纯虚数倍方向，才能从实部为零推出内积为零。\n' +
        '- $y\\in E$ 且 $x-y\\in E^\\perp\\implies y=P_E x$：由勾股恒等式直接得唯一最小点，不要求闭性或完备性；正交补本身的条件才是定义展开。\n' +
        '- 每个 $x$ 都有正交分解：调用 `thm.projection-convex`，用 Hilbert 完备性与 $E$ 闭；线性由分解唯一性推出，范数界由勾股恒等式推出。\n' +
        '- 闭性不能删：$E=c_{00}\\subset\\ell^2$ 时，对 $x\\in\\ell^2\\setminus c_{00}$ 距离为零却不取到，故不存在 $E$ 中最近点。\n\n📌 「正交投影」的定义在 `def.orthogonal-projection`；本节点讲的是「投影像恰是闭子空间」这条。\n'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* -------------------------------------------------- Riesz 表示（Hilbert） */
    {
      id: 'thm.riesz-hilbert',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: 'Riesz 表示（Hilbert）',
      title: 'Riesz 表示：$H^* \\cong \\overline{H}$',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '对偶空间'],
      statement: [
        '设 $H$ 是 Hilbert 空间，$\\varphi \\in H^*$。则存在**唯一**的 $y \\in H$ 使',
        '',
        '$$\\varphi(x) = \\langle x, y\\rangle \\qquad \\forall x \\in H , \\qquad \\text{且} \\ \\|y\\| = \\|\\varphi\\| .$$',
        '',
        '于是 $y \\mapsto \\langle \\cdot, y\\rangle$ 是 $H \\to H^*$ 的等距同构（复情形为共轭线性）。'
      ].join('\n'),
      notes: [
        '证法：$\\varphi = 0$ 取 $y = 0$。\n\n否则 $E = \\ker\\varphi$ 是**闭真**子空间，由正交分解取 $0 \\ne z \\in E^\\perp$，令 $y = \\overline{\\varphi(z)}\\, z / \\|z\\|^2$；\n\n则 $x \\mapsto \\langle x, y\\rangle$ 与 $\\varphi$ 在 $E$ 上都为 $0$、在 $z$ 上相等，而 $H = E \\oplus \\mathbb{K} z$，故相等。\n\n$\\|y\\| = \\|\\varphi\\|$ 由 $\\|\\varphi\\| = \\sup_{\\|x\\| \\le 1} |\\langle x, y\\rangle| = \\|y\\|$。',
        '⭐ 意义：**Hilbert 空间是自己的对偶**（共轭线性）。Banach 空间一般不是：$(\\ell^1)^* = \\ell^\\infty$、$(\\ell^\\infty)^* \\supsetneq \\ell^1$。这让 Hilbert 空间在「像有限维」这条路上走得最远：泛函与向量可以互换。',
        '⚠️ 共轭线性：$\\alpha y \\mapsto \\bar\\alpha\\,\\varphi$。所以严格说不是「同构」而是「共轭等距同构」（anti-linear isometry）。',
        '⚠️ 别与 $L^p$ 的 Riesz 表示混淆：那是 $(L^p)^* \\cong L^q$（$1<p<\\infty$，$1/p + 1/q = 1$），靠 Hölder 不等式；这条靠正交分解。两者只共享名字。\n\n📌 本图另有一条 **Lp 版**的 Riesz 表示：`thm.riesz-representation-lp`（$(L^{p})^{*} \\cong L^{q}$）。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ------------------------------------------------------ 伴随算子存在 */
    {
      id: 'thm.adjoint-hilbert',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: '伴随算子',
      title: '伴随算子存在且 $\\|u^*\\| = \\|u\\|$',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '伴随算子'],
      statement: [
        '设 $H, K$ 是 Hilbert 空间，$u \\in B(H, K)$。则存在**唯一**的 $u^* \\in B(K, H)$ 使',
        '',
        '$$\\langle u^*(x), y\\rangle_H = \\langle x, \\, u(y)\\rangle_K \\qquad (x \\in K,\\ y \\in H) ,$$',
        '',
        '且 $\\|u^*\\| = \\|u\\|$。'
      ].join('\n'),
      notes: [
        '存在性完全靠 Riesz：固定 $x \\in K$，泛函 $y \\mapsto \\langle x, u(y)\\rangle_K$ 在 $H$ 上连续（界 $\\le \\|x\\|\\,\\|u\\|$），由 Riesz 表示得唯一的 $u^*(x)$。\n\n' +
        '再验 $u^*$ 线性（由 $\\langle x, u(\\cdot)\\rangle$ 对 $x$ 线性）与有界；\n\n' +
        '$\\|u^*\\| = \\|u\\|$ 用两次 sup 交换。',
        '⭐ 这解释了为什么 Banach 空间没有「伴随」而只有「转置/共轭」：转置活在**对偶**之间（${}^t\\!: F^* \\to E^*$），而 Hilbert 空间里 $H^* \\cong H$ 让转置可以搬回空间上。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ------------------------------------------------------ 酉 / 部分等距 */
    {
      id: 'def.unitary-operator',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: '酉算子',
      title: '酉算子',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '算子'],
      statement: [
        '设 $u \\in B(H)$。称 $u$ 是**酉算子**（unitary），若',
        '',
        '$$u\\,u^* = u^*\\,u = I .$$',
        '',
        '等价地：$u$ 是保内积的满射，或 $u^* = u^{-1}$。'
      ].join('\n'),
      notes: [
        '酉算子就是「可逆的等距」：$\\langle ux, uy\\rangle = \\langle x, y\\rangle$ 且 $u$ 满射。',
        '⚠️ **无穷维里「等距」$\\ne$「酉」**：单侧移位 $S(x_1, x_2, \\ldots) = (0, x_1, x_2, \\ldots)$ 满足 $\\|Sx\\| = \\|x\\|$（等距），但不满；$S$ 是部分等距而不是酉算子。部分等距的完整定义与等价条件见 `def.partial-isometry`。',
        '⭐ 极分解 $u = V|u|$（$V$ 部分等距，$|u| = \\sqrt{u^*u}$）就是部分等距的标准出场方式。有限维版本见 `def.unitary-matrix`。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基', 'Rudin, Functional Analysis, Ch. 12'],
    },

    /* ------------------------------------------------------ 正交集与正交基 */
    {
      id: 'def.orthonormal-set',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: '正交基',
      title: '标准正交集、完备性与正交基',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '正交基'],
      statement: [
        '设 $\\{f_i\\}_{i \\in I} \\subseteq H$。',
        '',
        '- **正交**：$f_i \\perp f_j$（$i \\ne j$）；',
        '- **标准正交**：正交 + $\\|f_i\\| = 1$；',
        '- **完备**：$\\overline{\\operatorname{span}\\{f_i\\}} = H$；',
        '- **正交基**：标准正交 + 完备。'
      ].join('\n'),
      notes: [
        '⚠️ 完备不是「张成 $H$」而是「张成的**闭包**是整个空间」：$\\{e_n\\}$ 在 $\\ell^2$ 里的代数张成是有限支撑序列，稠密但不等于 $\\ell^2$。',
        '⚠️ 无穷维里正交基**不可数例子真实存在**：$L^2(\\mathbb{R})$ 的 Hermite 函数可数，但一般 $\\ell^2(I)$ 的正交基就是 $\\{e_i\\}_{i \\in I}$，$I$ 可以任意大。',
        '⭐ 有了正交基，Hilbert 空间就变成「不带权重的 $\\ell^2$」（见 Bessel/Parseval 与「可分 Hilbert $\\cong \\ell^2$」）。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* -------------------------------------------------- Bessel / Parseval */
    {
      id: 'thm.bessel-parseval',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: 'Bessel 与 Parseval',
      title: 'Bessel 不等式与 Parseval 等式',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '正交基'],
      statement: [
        '设 $\\{e_i\\}_{i \\in I}$ 标准正交。则对每个 $x \\in H$，',
        '',
        '**Bessel**：$\\displaystyle \\|x\\|^2 \\ge \\sum_{i \\in I} |\\langle x, e_i\\rangle|^2$；',
        '',
        '且下列等价：',
        '',
        '1. $\\{e_i\\}$ 是正交基；',
        '2. 对每个 $x$ 取等号（**Parseval**）：$\\|x\\|^2 = \\sum_i |\\langle x, e_i\\rangle|^2$；',
        '3. 对每个 $x$：$x = \\sum_{i \\in I} \\langle x, e_i\\rangle\\, e_i$（按范数收敛）。'
      ].join('\n'),
      notes: [
        'Bessel 的证明：对有限 $J$，$0 \\le \\|x - \\sum_{j \\in J}\\langle x, e_j\\rangle e_j\\|^2 = \\|x\\|^2 - \\sum_{j \\in J}|\\langle x,e_j\\rangle|^2$，再对 $J$ 取上确界。',
        '⭐ 读法：Bessel 说「坐标投影不增加长度」（$x$ 在子空间上的影子不会比 $x$ 长）；Parseval 说「没有漏掉任何方向」。所以**完备性 $\\iff$ 等号成立**——这就是把「基」这件几何事实变成一个**数值等式**。',
        '⚠️ 不可数 $I$ 时 $\\sum_{i \\in I}$ 要按「非零项至多可数」理解（见 $\\ell^2(I)$ 的注），否则这个和没有定义。',
        ,
        '**各方向用到的假设**（基的稠密性与系数等式之间要用正交平方恒等式）：\n' +
        '- Bessel 不等式由有限正交和的平方展开及取上确界得到，不用空间完备性；标准正交假设不能删，例如重复同一个单位向量会重复计算坐标。\n' +
        '- (1) $\\implies$ (3)：若正交基按闭线性张成等于 $H$ 定义，稠密性是定义展开，具体 Fourier 和逼近则用有限正交投影的最佳逼近性质。\n' +
        '- (2) $\\implies$ (3)：有限和余项的平方等于总范数平方减系数平方和，Parseval 使余项趋零，不需另取完备化；(3) $\\implies$ (2) 用范数连续性。\n' +
        '- (3) $\\implies$ (1)：每个向量都是有限线性组合的极限，按稠密张成的基定义直接得；若把基定义成极大正交族，转到稠密张成需 Hilbert 投影定理。\n' +
        '- 正交族不完备时 Parseval 不能保证：$\\mathbb R^2$ 中只取第一个坐标单位向量，第二个坐标单位向量的全部系数为零。不可数求和按有限子集网理解。\n'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ----------------------------------------------------- 正交基一定存在 */
    {
      id: 'thm.orthonormal-basis-exists',
      cluster: 'fa.hilbert',
      type: 'theorem',
      label: '正交基存在',
      title: '每个 Hilbert 空间都有正交基（Zorn）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '选择公理'],
      statement: [
        '每个 Hilbert 空间都含一组正交基。'
      ].join('\n'),
      notes: [
        '证法：令 $\\mathcal{S} = \\{ A \\subseteq H : A \\text{ 标准正交} \\}$，按包含成偏序。\n\n' +
        '全序子族的并仍标准正交（每个元素只与族里有限多个打交道），故有上界；\n\n' +
        'Zorn 给极大元 $M$。\n\n' +
        '若 $\\overline{\\operatorname{span} M} \\ne H$，由正交分解取出 $0 \\ne z \\perp \\overline{\\operatorname{span} M}$，则 $M \\cup \\{z/\\|z\\|\\}$ 严格更大，矛盾。',
        '⭐ 这是**非构造**的存在性（Zorn = 选择公理）：能显式写出正交基的只有少数空间（$L^2[0,1]$ 的 Fourier 基、球面上的球谐函数、Hermite 函数）。',
        '⚠️ 与 Gram–Schmidt 的分工：G–S 只从**可数**线性无关族出发、靠归纳造标准正交集（`thm.gram-schmidt`）；正交基一般不可数，只能靠 Zorn。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },

    /* ------------------------------------------- 可分 Hilbert ≅ ℓ² */
    {
      id: 'thm.separable-hilbert-is-l2',
      cluster: 'fa.hilbert',
      type: 'theorem',
      hypotheses: ['可分'],
      label: '可分 Hilbert 空间等距于 ℓ²',
      title: '可分 Hilbert 空间等距同构于 $\\ell^2$',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '同构'],
      statement: [
        '设 $H$ 是 Hilbert 空间，$\\dim H = \\#I$（Hilbert 维数）。则 $H$ 等距同构于 $\\ell^2(I)$。特别地，无穷维可分 Hilbert 空间都等距同构于 $\\ell^2(\\mathbb{N})$。'
      ].join('\n'),
      notes: [
        '映射 $U : H \\to \\ell^2(I)$，$U(x) := (\\langle x, e_i\\rangle)_{i \\in I}$。\n\n' +
        '由 Bessel 它入 $\\ell^2$、由 Parseval 它保范；\n\n' +
        '满射性：若 $(\\lambda_i) \\in \\ell^2$，则部分和 $\\sum_{i \\in J}\\lambda_i e_i$ 是 Cauchy（$\\|\\sum_{J \\setminus J\'}\\lambda_i e_i\\|^2 = \\sum_{J \\setminus J\'}|\\lambda_i|^2$），其极限的坐标就是 $\\lambda_i$。',
        '⭐ 结论：**可分无穷维 Hilbert 空间在等距意义下只有一个**。Banach 空间完全不是这样：$\\ell^p$（不同 $p$）两两不同构，$C[0,1]$、$L^1$、$c_0$ 也各自不同。这就是「Hilbert 空间简单」的确切含义。',
        '⚠️ 「可分」不能去掉：$\\ell^2(I)$（不可数 $I$）与 $\\ell^2(J)$ 同构 $\\iff \\#I = \\#J$（用正交基的基数比）。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    },
    {
      id: 'thm.lax-milgram',
      cluster: 'fa.hilbert',
      type: 'theorem',
      hypotheses: ['完备'],
      label: 'Lax–Milgram 定理',
      title: '定理（Lax–Milgram）：强制半双线性型的 Riesz 表示',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', 'Lax–Milgram', '变分方法'],
      statement: [
        '设 $H$ 是 Hilbert 空间，$L : H \\times H \\to \\mathbb{K}$ 满足：',
        '',
        '1. **半双线性**：$L$ 对第一变量线性，对第二变量共轭线性（与本图内积约定一致）；',
        '2. **有界**：存在 $M > 0$ 使 $|L(x, y)| \\le M \\|x\\| \\, \\|y\\|$ 对一切 $x, y \\in H$ 成立；',
        '3. **强制（coercive）**：存在 $\\delta > 0$ 使 $|L(x, x)| \\ge \\delta \\|x\\|^{2}$ 对一切 $x \\in H$ 成立。',
        '',
        '则存在唯一的 $A \\in B(H)$ 使',
        '',
        '$$L(x, y) = \\langle x, A y \\rangle \\qquad (x, y \\in H),$$',
        '',
        '且 $\\|A\\| \\le M$。在 (3) 下 $A$ 还可逆、$A^{-1} \\in B(H)$，并且',
        '',
        '$$\\|A^{-1}\\| \\le \\frac{1}{\\delta} .$$'
      ].join('\n'),
      notes: [
        '**约定说明。** 本图内积对第一变量线性、对第二变量共轭线性（见 `def.inner-product`、`def.hilbert-space`），所以这里把 $L$ 取成「第一变量线性、第二变量共轭线性」。如果教材把共轭放在第一变量（很多泛函分析书如此），把 $L$ 换成 $(x,y) \\mapsto \\overline{L(x,y)}$ 即可，$A$ 不变，结论逐字相同。',
        '',
        '**第一步：用 Riesz 表示定义 $A$。** 固定 $y \\in H$，泛函 $\\varphi_y(x) := L(x, y)$ 是连续线性泛函（线性由半双线性，连续性由 (2)：$|\\varphi_y(x)| \\le M\\|y\\| \\, \\|x\\|$）。由 Riesz 表示定理（`thm.riesz-hilbert`），存在唯一 $A y \\in H$ 使',
        '',
        '$$L(x, y) = \\langle x, A y \\rangle \\qquad (x \\in H), \\qquad \\|A y\\| = \\|\\varphi_y\\| \\le M \\|y\\| .$$',
        '',
        '**第二步：$A$ 线性且 $\\|A\\| \\le M$。** 对 $y, z \\in H$、$\\alpha, \\beta \\in \\mathbb{K}$，由 $L$ 对第二变量共轭线性（它给出的共轭与内积第二变元的共轭相消），',
        '',
        '$$\\langle x, A(\\alpha y + \\beta z) \\rangle = L(x, \\alpha y + \\beta z) = \\bar{\\alpha} L(x, y) + \\bar{\\beta} L(x, z) = \\langle x, \\alpha A y + \\beta A z \\rangle$$',
        '',
        '对一切 $x$ 成立，故 $A(\\alpha y + \\beta z) = \\alpha A y + \\beta A z$。又 $\\|A y\\| \\le M \\|y\\|$，故 $A \\in B(H)$ 且 $\\|A\\| \\le M$。唯一性由 Riesz 表示的唯一性（每个 $y$ 的 $A y$ 唯一确定）得到。',
        '',
        '**第三步：强制性给出下界。** 由 (3) 与 $L(x, x) = \\langle x, A x \\rangle$，',
        '',
        '$$\\delta \\|x\\|^{2} \\le |L(x, x)| = |\\langle x, A x \\rangle| \\le \\|x\\| \\, \\|A x\\| ,$$',
        '',
        '所以 $\\|A x\\| \\ge \\delta \\|x\\|$。特别地 $A$ 单射。',
        '',
        '**第四步：$A(H)$ 闭。** 设 $A x_n \\to z$。则',
        '',
        '$$\\|x_n - x_m\\| \\le \\frac{1}{\\delta} \\|A(x_n - x_m)\\| \\to 0 ,$$',
        '',
        '故 $(x_n)$ 是 Cauchy 列；$H$ 完备，设 $x_n \\to x$。由 $A$ 连续，$A x = z$，故 $z \\in A(H)$。',
        '',
        '**第五步：$A$ 满射。** 若 $A(H) \\ne H$，则 $A(H)$ 是闭真子空间，由正交分解（`thm.projection-subspace`）存在 $0 \\ne y \\perp A(H)$。于是 $\\langle y, A y \\rangle = 0$（因为 $A y \\in A(H)$），即 $L(y, y) = 0$，与 $\\delta \\|y\\|^{2} > 0$ 矛盾。故 $A$ 满射。',
        '',
        '**第六步：$A^{-1}$ 有界。** $A$ 是 Banach 空间之间的有界双射。考察 $A^{-1}$ 的图像：若 $y_n \\to y$ 且 $A^{-1} y_n \\to x$，则 $A(A^{-1} y_n) = y_n \\to y$，由 $A$ 连续得 $A x = y$，即 $x = A^{-1} y$。故 $G(A^{-1})$ 闭；由闭图像定理（`thm.closed-graph`），$A^{-1} \\in B(H)$。',
        '',
        '**第七步：逆的范数界。** 对任意 $y \\in H$，以 $x = A^{-1} y$ 代入第三步的下界：',
        '',
        '$$\\delta \\|A^{-1} y\\|^{2} \\le |L(A^{-1} y, A^{-1} y)| = |\\langle A^{-1} y, y \\rangle| \\le \\|A^{-1} y\\| \\, \\|y\\| ,$$',
        '',
        '故 $\\|A^{-1} y\\| \\le \\delta^{-1} \\|y\\|$，即 $\\|A^{-1}\\| \\le 1/\\delta$。$\\blacksquare$',
        '⭐ **它解决什么。** 解变分问题「求 $u$ 使 $L(u, v) = F(v)$ 对一切 $v$」时，$L$ 满足 (2)(3) 就等价于 $A u = F$ 的可逆性：$u = A^{-1} F$ 存在唯一且连续依赖 $F$（$\\|u\\| \\le \\delta^{-1}\\|F\\|$）。这正是椭圆 PDE 的 Lax–Milgram 引理（弱解存在唯一性）的抽象版本。',
        '⚠️ 强制性 (3) 不能去掉：$L \\equiv 0$ 满足 (1)(2)（$M$ 任意），但 $A = 0$ 不可逆。',
        '⚠️ 有界性 (2) 也不能去掉：它同时保证 $A$ 有界与第一步 Riesz 表示的适用；只「逐点」有限不够。',
        '📌 与 Riesz 表示的关系：$L(x, y) = \\langle x, y \\rangle$ 时 $A = I$；Lax–Milgram 是「用有界强制半双线性型替换内积」后的同一套 Riesz 机器。'
      ].join('\n\n'),
      refs: ['泛函分析讲义（用户手写笔记，2026-11-09）', 'Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations, Ch. 5（Lax–Milgram）'],
    },
    {
      id: 'def.complemented-subspace',
      cluster: 'fa.norm',
      type: 'definition',
      label: '可补子空间',
      title: '定义：代数互补、拓扑互补与可补子空间',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 空间', '子空间', '投影'],
      statement: [
        '设 $E$ 是赋范空间，$X, Y \\subseteq E$ 是线性子空间。',
        '',
        '1. 称 $X, Y$ **代数互补**（记 $\\mathrm{AC}$），若 $X + Y = E$ 且 $X \\cap Y = \\{0\\}$。此时每个 $e \\in E$ 唯一写成 $e = x + y$，定义**投影** $P_X e := x$、$P_Y e := y$。',
        '2. 称 $X, Y$ **拓扑互补**（记 $\\mathrm{TC}$），若 $P_X$（等价地 $P_Y = I - P_X$）是**有界**线性算子。',
        '3. 称子空间 $X \\subseteq E$ **可补**，若存在子空间 $Y \\subseteq E$ 使 $X, Y$ 拓扑互补。'
      ].join('\n'),
      notes: [
        '**代数互补的直接推论。** 由定义 $P_X + P_Y = I$、$P_X^{2} = P_X$、$P_Y^{2} = P_Y$、$P_X P_Y = P_Y P_X = 0$，且 $P_X(E) = X$、$P_Y(E) = Y$、$\\ker P_X = Y$、$\\ker P_Y = X$。所以「$X$ 可补」等价于「存在有界投影 $P \\in B(E)$ 使 $P(E) = X$」：取 $Y = \\ker P$；反之给定 $Y$ 取 $P = P_X$。',
        '**TC 的定义不依赖选 $P_X$ 还是 $P_Y$。** $P_Y = I - P_X$，故 $P_X$ 有界 $\\iff$ $P_Y$ 有界。',
        '⚠️ **AC 不自动 TC**：一般赋范空间里 $X, Y$ 代数互补时投影可能无界。$E$ 完备时，若 $X, Y$ 都闭，则由开映射/有界逆定理它们自动拓扑互补（见 `thm.complemented-subspace-criterion`）；但不完备时「闭 + AC」也不够。',
        '⚠️ **可补要求 $Y$ 闭**：由 $Y = \\ker P_X$ 与 $P_X$ 连续知 $Y$ 闭；同理 $X$ 闭。所以可补子空间必闭。反过来闭子空间不一定可补：$c_0(\\mathbb{N})$ 在 $\\ell^{\\infty}(\\mathbb{N})$ 中闭但不可补（Phillips 1940；证明要用 Banach 极限/超滤子，本图不展开）。',
        '⭐ **两个标准例子。** (1) Hilbert 空间 $H$ 的每个闭子空间 $X$ 都可补：正交分解 $H = X \\oplus X^{\\perp}$，正交投影 $P_X$ 有界（`thm.projection-subspace`）。(2) 有限维子空间总可补：任取代数补空间，投影的像在有限维空间上、核闭，投影自动有界（也可由「有限维空间上的线性映射自动有界」证明）。',
        '📌 **为什么重要**：$X$ 可补 $\\iff$ 商映射 $E \\to E/X$ 有有界右逆 $\\iff$ $E$ 拓扑同构于 $X \\times Y$。所以「可补」是把「直和分解」从代数层面提升到拓扑层面的正确说法；在算子理论、Banach 空间分类与 PDE 的分解问题里都出现。'
      ].join('\n\n'),
      refs: ['泛函分析讲义（用户手写笔记，2026-11-09）', 'Rudin, Functional Analysis · 补子空间与投影', 'Lindenstrauss–Tzafriri, Classical Banach Spaces I · c0 与 ℓ∞'],
    },
    {
      id: 'thm.complemented-subspace-criterion',
      cluster: 'fa.norm',
      type: 'theorem',
      hypotheses: ['完备'],
      label: '可补子空间的判别',
      title: '定理：代数互补何时拓扑互补（Banach 版）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 空间', '子空间', '开映射'],
      statement: [
        '设 $E$ 是赋范空间，$X, Y \\subseteq E$ 代数互补，$\\Phi : X \\times Y \\to E$，$\\Phi(x, y) := x + y$。则',
        '',
        '$$X, Y \\text{ 拓扑互补} \\iff \\Phi \\text{ 是同胚（有界双射且逆有界）}.$$',
        '',
        '若 $E$ 还是 Banach 空间，则进一步有',
        '',
        '$$X, Y \\text{ 拓扑互补} \\iff X, Y \\text{ 都闭}.$$'
      ].join('\n'),
      notes: [
        '**第一部分（不用完备性）。** 由代数互补，$\\Phi$ 是线性双射。它有界：$\\|\\Phi(x, y)\\| = \\|x + y\\| \\le \\|x\\| + \\|y\\| \\le 2\\max\\{\\|x\\|, \\|y\\|\\}$（乘积空间用 $\\max$ 范数或和范数都等价）。',
        '',
        '若 $X, Y$ 拓扑互补，则 $\\Phi^{-1} e = (P_X e, P_Y e)$，故',
        '',
        '$$\\|\\Phi^{-1} e\\| \\le \\max\\{ \\|P_X\\|, \\|P_Y\\| \\} \\, \\|e\\| ,$$',
        '',
        '即 $\\Phi^{-1}$ 有界。',
        '',
        '反之若 $\\Phi$ 是同胚，则 $P_X = \\pi_X \\circ \\Phi^{-1}$（$\\pi_X : X \\times Y \\to X$ 是投影，范数 $\\le 1$）作为有界映射的复合有界，故 $X, Y$ 拓扑互补。',
        '',
        '**第二部分（$E$ 完备）。** 若 $X, Y$ 拓扑互补，则 $X = \\ker P_Y$、$Y = \\ker P_X$ 都是闭子空间。',
        '',
        '反之设 $X, Y$ 都闭。$E$ 是 Banach 空间，闭子空间 $X, Y$ 本身是 Banach 空间，故乘积 $X \\times Y$ 是 Banach 空间。$\\Phi$ 是有界双射，由逆算子定理（`thm.bounded-inverse`，等价于开映射定理），$\\Phi^{-1}$ 有界。于是 $P_X = \\pi_X \\circ \\Phi^{-1}$ 有界，即 $X, Y$ 拓扑互补。',
        '',
        '**为什么完备性不能省。** 第二部分只用「$X \\times Y$ 完备 + 有界逆定理」；去掉 $E$ 的完备性，即使 $X, Y$ 闭也不能保证投影有界（反例需要构造不完备的赋范空间，本图不展开）。',
        '⭐ **可补性的等价刻画**：$X$ 可补 $\\iff$ 存在有界投影 $P \\in B(E)$ 使 $P(E) = X$；在 Banach 空间中，这又等价于「存在闭子空间 $Y$ 使 $X \\oplus Y = E$ 是拓扑直和」。',
        '📌 **两个例子。** Hilbert 空间闭子空间总可补（正交投影）；$c_0(\\mathbb{N})$ 在 $\\ell^{\\infty}(\\mathbb{N})$ 中闭但不可补（Phillips 1940，外部定理）。'
      ].join('\n\n'),
      refs: ['泛函分析讲义（用户手写笔记，2026-11-09）', 'Rudin, Functional Analysis · 开映射定理与补子空间'],
    },
    {
      id: 'def.partial-isometry',
      cluster: 'fa.hilbert',
      type: 'definition',
      label: '部分等距',
      title: '部分等距与等价刻画',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '算子', '等距'],
      statement: [
        '设 $u \\in B(H)$。称 $u$ 是**部分等距**（partial isometry），若 $u^*u$ 是正交投影（记 $P = u^*u$）。',
        '',
        '此时 $u$ 在 $(\\ker u)^\\perp$ 上是等距，且 $u\\,u^*$ 也是正交投影。'
      ].join('\n'),
      notes: [
        '**四个等价条件**（定义取 (3)）：',
        '',
        '(1) $u$ 在 $(\\ker u)^\\perp$ 上是等距：对 $x \\in (\\ker u)^\\perp$ 有 $\\|u x\\| = \\|x\\|$；',
        '',
        '(2) $u = u\\,u^*u$；',
        '',
        '(3) $u^*u$ 是正交投影；',
        '',
        '(4) $u\\,u^*$ 是正交投影。',
        '',
        '证明的骨架：若 (3) 成立，令 $P = u^*u$。则 $\\|u x\\|^2 = \\langle u^*u x, x\\rangle = \\|P x\\|^2$。正交投影 $P$ 的像是 $(\\ker P)^\\perp$，而 $\\ker P = \\ker u$，故在 $(\\ker u)^\\perp$ 上 $Px = x$，得 (1)。由 (1)，$u$ 与 $uP$ 在 $\\ker u$ 上同为 $0$、在 $(\\ker u)^\\perp$ 上同为 $u$，得 (2)。(2) 两边取伴随得 $u\\,u^* = (u\\,u^*)^2$，且 $u\\,u^*$ 自伴，故 (4)。对 $u^*$ 重复 (3)$\\implies$(4) 得 (4)$\\implies$(3)，四者等价。',
        '',
        '**初始与最终投影**：$P = u^*u$ 的像是 $(\\ker u)^\\perp$（初始空间），$Q = u\\,u^*$ 的像是 $\\operatorname{im} u$（最终空间），且 $u$ 把 $P H$ 等距同构到 $Q H$。',
        '',
        '⚠️ 单侧移位 $S(x_1, x_2, \\ldots) = (0, x_1, x_2, \\ldots)$ 是部分等距但不是酉算子：$S^*S = I$，而 $S\\,S^* = I - \\operatorname{proj}_{\\ker(S^*)}$ 是投影（不是 $I$）。',
        '',
        '⭐ 极分解与极坐标分解里出现的都是部分等距；酉算子正是初始投影与最终投影都为 $I$ 的特殊情形。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基', 'Rudin, Functional Analysis, Ch. 12'],
    },
    {
      id: 'def.perfect-pairing',
      cluster: 'fa.norm',
      type: 'definition',
      label: '完美配对',
      title: '完美配对（perfect pairing）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '对偶', '配对'],
      statement: [
        '设 $X, Y$ 是 $\\mathbb{K}$ 上的赋范空间，$\\langle\\cdot,\\cdot\\rangle : X \\times Y \\to \\mathbb{K}$ 是双线性映射（$\\mathbb{K} = \\mathbb{C}$ 时对第二变元共轭线性）。称它是**完美配对**，若',
        '',
        '1. **非退化**：$\\langle x, y\\rangle = 0$ 对一切 $y$ 成立 $\\implies x = 0$；$\\langle x, y\\rangle = 0$ 对一切 $x$ 成立 $\\implies y = 0$；',
        '2. **有界**：$|\\langle x, y\\rangle| \\le \\|x\\|\\,\\|y\\|$；',
        '3. **两侧都定范**：$\\|x\\| = \\sup_{\\|y\\| \\le 1} |\\langle x, y\\rangle|$，$\\|y\\| = \\sup_{\\|x\\| \\le 1} |\\langle x, y\\rangle|$。'
      ].join('\n'),
      notes: [
        '三条合起来等价于：$x \\mapsto \\langle x, \\cdot\\rangle$ 与 $y \\mapsto \\langle \\cdot, y\\rangle$ 都是**等距嵌入** $X \\hookrightarrow Y^*$、$Y \\hookrightarrow X^*$。',
        '**例子**：Hilbert 空间 $H$ 与自身、配对 $\\langle x, y\\rangle$；$L^p$ 与 $L^q$（$1/p + 1/q = 1$）、配对 $\\int f g$（Hölder 给有界，定范由 $g = |f|^{p-1}\\operatorname{sgn} f$ 的共轭指数构造给出）。',
        '⚠ **完美配对不保证满射**：$X = \\ell^1$、$Y = c_0$、$\\langle x, y\\rangle = \\sum x_n y_n$ 满足三条（$c_0^* \\cong \\ell^1$ 给 $Y \\to X^*$ 满，但 $X \\to Y^* = \\ell^\\infty$ 只是等距嵌入，不满）。所以「完美」是「无废坐标 + 范数可由配对读出」，不是「互为对偶」。',
        '⭐ 把 Riesz 表示定理的两种版本放在同一框架下：Hilbert 版与 $L^p$ 版都在说「这对配对里映射是满的」——见 `thm.riesz-perfect-pairing`。',
        '📌 有限维时三条自动给出 $X \\cong Y^*$（维数相同 + 单射即满射）。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基', 'Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 对偶与自反'],
    },
    {
      id: 'thm.riesz-perfect-pairing',
      cluster: 'fa.norm',
      type: 'theorem',
      label: 'Riesz 表示的配对版',
      title: 'Riesz 表示定理：完美配对框架',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '对偶', 'Riesz 表示', '自反'],
      statement: [
        '设 $(X, Y, \\langle\\cdot,\\cdot\\rangle)$ 是完美配对（`def.perfect-pairing`）。则',
        '',
        '(a) $x \\mapsto \\langle x, \\cdot\\rangle$ 是等距同构 $X \\to Y^*$ 的像，$y \\mapsto \\langle \\cdot, y\\rangle$ 是 $Y \\to X^*$ 的等距嵌入；',
        '',
        '(b) 若其中一个映射满射，则另一个也满射，且 $X \\cong Y^*$、$Y \\cong X^*$（等距同构）；',
        '',
        '(c) Hilbert 空间 $H$ 与 $L^p$（$1 < p < \\infty$，$1/p + 1/q = 1$）的配对满足满射性，因此 $H^* \\cong H$、$(L^p)^* \\cong L^q$ 都是完美配对的直接推论。'
      ].join('\n'),
      notes: [
        '**证明 (a)**：由定范条件，$\\|x\\| = \\sup_{\\|y\\| \\le 1}|\\langle x, y\\rangle| = \\|T x\\|$，其中 $T x := \\langle x, \\cdot\\rangle$；由非退化 $T$ 单射，故 $T$ 是等距嵌入。对 $y$ 同理。$\\blacksquare$',
        '',
        '**证明 (b)**：若 $T : X \\to Y^*$ 满射，则由等距性 $X \\cong Y^*$。对偶化得 $X^* \\cong Y^{**}$；把 (a) 用于 $Y$ 一侧得 $Y \\hookrightarrow X^*$ 等距嵌入。要证满：任取 $\\varphi \\in X^*$，它在 $X \\cong Y^*$ 下对应 $y_0 \\in Y$（$\\varphi(x) = \\langle x, y_0\\rangle$），这正是 $y \\mapsto \\langle\\cdot, y\\rangle$ 的像，故满。$\\blacksquare$',
        '',
        '**证明 (c)**：Hilbert 情形就是 `thm.riesz-hilbert`（每个连续线性泛函由内积给出）；$L^p$ 情形就是 `thm.riesz-representation-lp`（$(L^p)^* \\cong L^q$）。两条定理的证明里，满射性分别来自投影定理与 Radon–Nikodym（或测度论版本），配对本身只提供有界与定范。',
        '',
        '⭐ 统一的意义：两个 Riesz 定理不再像两个孤立技巧，而是同一个「完美配对 + 该配对满射」框架的两个实例；`172-audit-c1.js` 里的类比边 `analogy` 现在有了正式的共同祖先。',
        '⚠ 本图尚未立「Banach–Alaoglu / 弱拓扑 / Eberlein–Šmulian」节点；因此 (b) 的「谁满谁」只在具体例子里借 Riesz 定理验证，不试图从配对的三条公理推出满射（那是假的，见 `def.perfect-pairing` 的 $\\ell^1/c_0$ 反例）。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基', 'Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 对偶与自反', 'Rudin, Real and Complex Analysis, Ch. 6'],
    },
    {
      id: 'def.uniformly-convex',
      cluster: 'fa.norm',
      type: 'definition',
      label: '一致凸',
      title: '一致凸空间',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 空间', '凸性'],
      statement: [
        '称赋范空间 $(X, \\|\\cdot\\|)$ **一致凸**（uniformly convex），若对每个 $\\varepsilon \\in (0, 2]$ 存在 $\\delta > 0$，使得',
        '',
        '$\\|x\\| = \\|y\\| = 1,\\quad \\|x - y\\| \\ge \\varepsilon \\implies \\left\\|\\frac{x + y}{2}\\right\\| \\le 1 - \\delta .$',
        '',
        '即「单位球面上相距不近的两点，中点严格深入球内，且深入量只依赖距离」。'
      ].join('\n'),
      notes: [
        '**例子**：Hilbert 空间（平行四边形律给 $\\|(x+y)/2\\|^2 = 1 - \\|x-y\\|^2/4$，取 $\\delta = 1 - \\sqrt{1 - \\varepsilon^2/4}$）；$L^p$（$1 < p < \\infty$，Clarkson 不等式）；$\\ell^p$（$1 < p < \\infty$）。',
        '**反例**：$\\ell^1$、$\\ell^\\infty$、$c_0$、$C[0,1]$ 都不一致凸（$\\ell^1$ 里 $e_1, e_2$ 的中点仍范数 $1$；$\\ell^\\infty$ 里 $(1,0,\\ldots)$ 与 $(1,1,0,\\ldots)$ 之类的分段常值序列可构造）。',
        '⭐ 一致凸 $\\implies$ 严格凸（`def.strictly-convex`）：若 $\\|x\\| = \\|y\\| = 1$、$x \\ne y$，取 $\\varepsilon = \\|x - y\\| > 0$ 即得中点范数 $< 1$。',
        '📌 一致凸是「范数一致地弯」：它把「严格凸」逐点、逐对的结论升级成对全部单位向量一致的估计，这正是 Milman–Pettis（`thm.milman-pettis`）与 Clarkson 不等式需要的定量形式。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 一致凸与自反', 'Conway, A Course in Functional Analysis · Banach 空间'],
    },
    {
      id: 'def.strictly-convex',
      cluster: 'fa.norm',
      type: 'definition',
      label: '严格凸',
      title: '严格凸空间',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 空间', '凸性'],
      statement: [
        '称赋范空间 $(X, \\|\\cdot\\|)$ **严格凸**（strictly convex），若单位球面不含线段：',
        '',
        '$\\|x\\| = \\|y\\| = 1,\\quad x \\ne y \\implies \\left\\|\\frac{x + y}{2}\\right\\| < 1 .$',
        '',
        '等价地：$\\|x + y\\| = \\|x\\| + \\|y\\|$ 且 $x, y \\ne 0$ 时必有 $y = \\lambda x$（$\\lambda > 0$）。'
      ].join('\n'),
      notes: [
        '**例子**：Hilbert 空间、$\\ell^p$ 与 $L^p$（$1 < p < \\infty$）。',
        '**反例**：$\\ell^1$、$\\ell^\\infty$、$c_0$、$C[0,1]$；$\\mathbb{R}^2$ 上的 $\\|(x,y)\\| = \\max(|x|, |y|)$。',
        '⭐ 严格凸 $\\iff$ 单位球面上每点的「面」是单点 $\\iff$ 每个范数可达的泛函在单位球上有唯一最大值点。',
        '⚠ 严格凸 $\\not\\implies$ 一致凸（`def.uniformly-convex`）：存在严格凸但不一致凸的 Banach 空间（如某些加权序列空间）；一致凸是更强的定量条件。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 一致凸与自反', 'Conway, A Course in Functional Analysis · Banach 空间'],
    },
    {
      id: 'def.reflexive-space',
      cluster: 'fa.norm',
      type: 'definition',
      label: '自反空间',
      title: '自反 Banach 空间',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 空间', '对偶', '自反'],
      statement: [
        '设 $X$ 是 Banach 空间，$J_X : X \\to X^{**}$ 是自然嵌入 $J_X(x)(\\varphi) = \\varphi(x)$。称 $X$ **自反**（reflexive），若 $J_X$ 是满射（从而是等距同构）。'
      ].join('\n'),
      notes: [
        '自然嵌入总是等距的（Hahn–Banach）：$\\|J_X x\\| = \\sup_{\\|\\varphi\\| \\le 1}|\\varphi(x)| = \\|x\\|$。所以自反 $\\iff$ $X^{**}$ 中每个元素都来自 $X$。',
        '**例子**：Hilbert 空间；$L^p$、$\\ell^p$（$1 < p < \\infty$，见 `cor.lp-reflexive`）；有限维空间。',
        '**反例**：$c_0$（$c_0^{**} = \\ell^\\infty \\ne c_0$）、$\\ell^1$（$\\ell^{1**} = (\\ell^\\infty)^* \\supsetneq \\ell^1$）、$C[0,1]$。',
        '⭐ 自反的核心用途：有界序列有弱收敛子列（Eberlein–Šmulian；本图尚未立弱拓扑节点），这是变分存在性与 Milman–Pettis 的入口。',
        '📌 与配对语言的关系：$X$ 自反 $\\iff$ 完美配对 $(X, X^*)$ 的两个嵌入都满（`def.perfect-pairing`、`thm.riesz-perfect-pairing`）。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 对偶与自反', 'Conway, A Course in Functional Analysis · Banach 空间'],
    },
    {
      id: 'thm.milman-pettis',
      cluster: 'fa.norm',
      type: 'theorem',
      status: 'skeleton',
      label: 'Milman–Pettis 定理',
      title: '一致凸 Banach 空间自反（Milman–Pettis）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 空间', '自反', '一致凸'],
      statement: [
        '一致凸 Banach 空间（`def.uniformly-convex`）是自反的（`def.reflexive-space`）。'
      ].join('\n'),
      notes: [
        '⚠ **本节点仍标 skeleton**：唯一未证的外部定理是 Goldstine 定理（见最后一段）；下面给出「Goldstine 推出自反」的完整归约，因此缺口只剩 Goldstine 与弱*拓扑的基本语言，不再有其它黑箱。',
        '**框架（弱*拓扑）**：在 $X^{**}$ 上取由半范数族 $\\xi \\mapsto |\\langle \\varphi, \\xi \\rangle|$（$\\varphi \\in X^*$）诱导的局部凸拓扑，称为弱*拓扑；网 $\\xi_\\alpha \\to \\xi$ 当且仅当对每个 $\\varphi \\in X^*$ 有 $\\langle \\varphi, \\xi_\\alpha \\rangle \\to \\langle \\varphi, \\xi \\rangle$。自然嵌入 $J_X : X \\to X^{**}$ 满足 $\\langle \\varphi, J_X x \\rangle = \\varphi(x)$。',
        '**Goldstine 定理（外部输入，本图无节点）**：$J_X(B_X)$ 在 $B_{X^{**}}$ 中弱*稠密。标准证明走 Hahn–Banach 分离（或用 Banach–Alaoglu 加 Krein–Milman）；本图既无 Hahn–Banach 节点，也无弱*拓扑/网收敛节点，故不在此展开。',
        '**归约（假设 Goldstine）**：设 $X$ 一致凸，$\\xi \\in X^{**}$、$\\|\\xi\\| = 1$。任取 $\\varepsilon \\in (0, 2]$，取一致凸定义中的 $\\delta = \\delta(\\varepsilon) > 0$。由 Goldstine，存在网 $(x_\\alpha) \\subset B_X$ 弱*收敛到 $\\xi$。由 $\\|\\xi\\| = 1$ 可取 $\\varphi \\in X^*$、$\\|\\varphi\\| = 1$ 使 $\\operatorname{Re}\\varphi(\\xi) > 1 - \\delta/2$（泛函范数的上确界定义）；于是 $\\operatorname{Re}\\varphi(x_\\alpha) \\to \\operatorname{Re}\\varphi(\\xi) > 1 - \\delta/2$，且 $\\operatorname{Re}\\varphi(x_\\alpha) \\le \\|x_\\alpha\\| \\le 1$，故 $\\|x_\\alpha\\| \\to 1$。',
        '记 $y_\\alpha = x_\\alpha / \\|x_\\alpha\\|$（当 $\\|x_\\alpha\\| > 0$；最终成立），则 $y_\\alpha \\in S_X$、$\\|y_\\alpha - x_\\alpha\\| \\to 0$，且 $\\operatorname{Re}\\varphi(y_\\alpha) \\to \\operatorname{Re}\\varphi(\\xi) > 1 - \\delta/2$。对充分大的 $\\alpha, \\beta$：若 $\\|y_\\alpha - y_\\beta\\| \\ge \\varepsilon$，由一致凸性 $\\|(y_\\alpha + y_\\beta)/2\\| \\le 1 - \\delta$，但 $\\operatorname{Re}\\varphi((y_\\alpha + y_\\beta)/2) > 1 - \\delta/2 > 1 - \\delta$，与 $\\|\\cdot\\|$ 是范数矛盾；故最终 $\\|y_\\alpha - y_\\beta\\| < \\varepsilon$。于是 $(y_\\alpha)$ 是范数 Cauchy，$(x_\\alpha)$ 也是（因两者差趋于 0）。',
        '由 $X$ 完备，$x_\\alpha \\to x \\in X$。范数收敛蕴含弱*收敛（$J_X x_\\alpha \\to J_X x$），而 $J_X x_\\alpha = x_\\alpha \\to \\xi$ 弱*；弱*极限唯一，故 $\\xi = J_X x$。对 $\\xi = 0$ 显然；对一般 $\\xi \\ne 0$ 用 $\\xi/\\|\\xi\\|$ 缩放。于是 $J_X$ 满射，$X$ 自反。$\\blacksquare$（在 Goldstine 的前提下）',
        '**缺口清单**：① Goldstine 定理（唯一实质外部定理；本图无节点）；② 弱*拓扑与网收敛的定义（本图无独立节点，但已在上面用半范数族给出，可视为语言约定）。一旦 ① 有节点或被证明，本节点可删 skeleton。',
        '📌 本图已有 `cor.lp-reflexive` 直接对 $L^p$ 验证自反；Milman–Pettis 是把「一致凸」这个几何条件转成「自反」的通用桥梁。',
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 一致凸与自反', 'Conway, A Course in Functional Analysis · Banach 空间'],
    },
    {
      id: 'thm.james',
      cluster: 'fa.norm',
      type: 'theorem',
      status: 'skeleton',
      label: 'James 定理',
      title: 'James 定理：自反 $\\iff$ 每个泛函达到范数',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Banach 空间', '自反'],
      statement: [
        'Banach 空间 $X$ 自反（`def.reflexive-space`）当且仅当每个 $\\varphi \\in X^*$ 都在单位球 $B_X$ 上达到其范数：存在 $x \\in B_X$ 使 $\\varphi(x) = \\|\\varphi\\|$。'
      ].join('\n'),
      notes: [
        '⚠ **本节点仍标 skeleton**：($\\Longleftarrow$) 方向就是 James 定理本身（本图无节点、且是深定理）；($\\Longrightarrow$) 方向可在 Banach–Alaoglu 的前提下写完整，见下。',
        '**($\\Longrightarrow$) 方向（模 Banach–Alaoglu）**：设 $X$ 自反，$J_X : X \\to X^{**}$ 是满射等距，故 $J_X(B_X) = B_{X^{**}}$。Banach–Alaoglu 定理说 $B_{X^{**}}$ 在弱*拓扑下紧；而 $X$ 的弱拓扑 $\\sigma(X, X^*)$ 正是 $J_X$ 拉回的弱*拓扑，所以 $B_X$ 弱紧。任取 $\\varphi \\in X^*$，$\\varphi$ 在弱拓扑下连续，$|\\varphi|$ 在弱紧集 $B_X$ 上达到最大值；最大值等于 $\\|\\varphi\\|$（由 $\\|\\varphi\\| = \\sup_{x \\in B_X}|\\varphi(x)|$），故存在 $x \\in B_X$ 使 $\\varphi(x) = \\|\\varphi\\|$。$\\blacksquare$',
        '**($\\Longleftarrow$) 方向 = James 定理（外部，深）**：若 $X$ 不自反，则存在 $\\varphi \\in X^*$ 在 $B_X$ 上达不到范数。证明不是「取弱*极限」能得到的：需要 James 的构造——从 $\\xi \\in X^{**} \\setminus J_X(X)$ 出发，递归地造单位球中的点与泛函，用分离/对角线论证逼出一个在 $B_X$ 上不可达的泛函（James 1951 对可分情形、1957 对一般 Banach 空间）。本图无弱拓扑、无 Banach–Alaoglu、无该构造，故不展开。',
        '**缺口清单**：① Banach–Alaoglu 定理（本图无节点）；② 弱拓扑/弱*拓扑的定义与紧性（本图无节点）；③ James 定理的 ($\\Longleftarrow$) 方向（外部深定理，需专文）。因此本节点保留 skeleton。',
        '📌 本图只有正向的具体例子：Hilbert 空间与 $L^p$（$1<p<\\infty$）自反，故每个泛函达到范数（由 Riesz 表示可直接看出）。',
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Banach 空间', 'Diestel, Sequences and Series in Banach Spaces, Ch. 3'],
     },
    {
      id: 'def.weak-topology',
      cluster: 'fa.norm',
      type: 'definition',
      label: '弱拓扑',
      title: '弱拓扑 $\\sigma(E,E^{*})$',
      regions: ['analysis'],
      tags: ['定义', '泛函分析', '弱拓扑', '对偶', 'Banach 空间'],
      statement: '设 $E$ 是赋范空间，$E^{*}$ 是其连续对偶。$E$ 上的**弱拓扑** $\\sigma(E,E^{*})$ 是使所有 $\\varphi\\in E^{*}$ 都连续的最弱拓扑；等价地，它由半范数族 $p_{\\varphi}(x)=|\\varphi(x)|$（$\\varphi\\in E^{*}$）生成。',
      notes: '**基本事实**：范数收敛推出弱收敛，反之不然。例如 $\\ell^{2}$ 中的标准基 $e_{n}\\rightharpoonup0$（弱收敛），但 $\\|e_{n}\\|=1$ 不趋于 $0$。\n\n**为什么用它**：弱拓扑把对偶的元素都变成连续函数，于是可以用泛函分离点、取弱紧性；自反空间的有界闭球弱紧（Eberlein–Šmulian，本图尚无节点）。\n\n**与弱*拓扑的区别**：弱*拓扑在 $E^{*}$ 上由 $E$ 的元素 $x\\mapsto\\varphi(x)$ 生成，$E^{*}$ 的弱*紧性即 Banach–Alaoglu 定理（本图尚无节点）。\n\n⚠ 弱拓扑不是范数拓扑：弱开集比范数开集少得多；无限维赋范空间的弱拓扑不第一可数。',
      refs: ['Rudin, Functional Analysis, Ch. 3 · weak topology', 'Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations, Ch. 3 · weak topology'],
    },
  ],

  edges: [
    { id: 'dep.weak-banach', kind: 'definition', definition: 'def.banach-space', usedBy: 'def.weak-topology',
      note: '弱拓扑定义在赋范空间（特别 Banach 空间）上。' },
    { id: 'dep.weak-dual', kind: 'definition', definition: 'def.dual-space', usedBy: 'def.weak-topology',
      note: '弱拓扑由连续对偶的元素生成。' },
    { id: 'def-link.pp-dual', kind: 'definition', definition: 'def.dual-space',
      usedBy: 'def.perfect-pairing',
      note: '配对的两侧嵌入到对方对偶空间；完美配对的第三条要求这两个嵌入保范。' },
    { id: 'def-link.pp-norm', kind: 'definition', definition: 'def.norm',
      usedBy: 'def.perfect-pairing',
      note: '完美配对的两侧都是赋范空间，第三条用范数写出。' },
    { id: 'def-link.rpp-pp', kind: 'definition', definition: 'def.perfect-pairing',
      usedBy: 'thm.riesz-perfect-pairing',
      note: '统一 Riesz 定理的出发点：完美配对的三个公理。' },
    { id: 'def-link.rpp-dual', kind: 'definition', definition: 'def.dual-space',
      usedBy: 'thm.riesz-perfect-pairing',
      note: '结论是 $X \\cong Y^*$、$Y \\cong X^*$，所以两边都是对偶空间。' },
    {
      id: 'imp.fa-perfectpairing-riesz',
      kind: 'implication',
      sources: ['def.perfect-pairing'],
      target: 'thm.riesz-perfect-pairing',
      title: '完美配对 $\\implies$ 两个 Riesz 嵌入与互满准则',
      proof: [
        '设 $(X, Y, \\langle\\cdot,\\cdot\\rangle)$ 是完美配对。',
        '',
        '**(a)** 令 $T x = \\langle x, \\cdot\\rangle \\in Y^*$。由定义第三条，$\\|x\\| = \\sup_{\\|y\\| \\le 1}|\\langle x, y\\rangle| = \\|T x\\|$；由第一条，$T x = 0 \\implies x = 0$。故 $T$ 是等距嵌入。对 $S y = \\langle\\cdot, y\\rangle \\in X^*$ 同理。',
        '',
        '**(b)** 若 $T$ 满，则 $T$ 是等距同构 $X \\to Y^*$。对偶化得 $T^* : Y^{**} \\to X^*$ 等距同构；而 $S : Y \\to X^*$ 是等距嵌入，且 $T^*$ 把 $J_Y(Y)$ 送到 $S(Y)$（验证：$T^* J_Y y (x) = J_Y y(T x) = \\langle x, y\\rangle = S y(x)$）。$J_Y$ 总是等距，故 $S(Y) = T^* J_Y(Y)$ 在 $T^*$ 下同构于 $Y$，而 $T^*$ 满（同构），所以 $S$ 也满。$\\blacksquare$',
        '',
        '于是 (b) 成立；把 (c) 的两个具体配对代入即得 $H^* \\cong H$ 与 $(L^p)^* \\cong L^q$。'
      ].join('\n'),
      note: '注意 (b) 只用「一个满」推出「另一个满」，不声称三条公理本身蕴含满射——反例见 `def.perfect-pairing` 的 $\\ell^1/c_0$。'
    },
    { id: 'def-link.uc-norm', kind: 'definition', definition: 'def.norm',
      usedBy: 'def.uniformly-convex',
      note: '一致凸的定义全用范数写出。' },
    { id: 'def-link.uc-banach', kind: 'definition', definition: 'def.banach-space',
      usedBy: 'def.uniformly-convex',
      note: '一致凸通常对 Banach 空间讨论；定义本身对任意赋范空间有意义。' },
    { id: 'def-link.sc-norm', kind: 'definition', definition: 'def.norm',
      usedBy: 'def.strictly-convex',
      note: '严格凸用单位球面不含线段来定义。' },
    {
      id: 'imp.fa-uniformconvex-strict',
      kind: 'implication',
      sources: ['def.uniformly-convex'],
      target: 'def.strictly-convex',
      layer: false,
      title: '一致凸 $\\implies$ 严格凸',
      proof: [
        '设 $X$ 一致凸，取 $\\|x\\| = \\|y\\| = 1$、$x \\ne y$，令 $\\varepsilon = \\|x - y\\| > 0$。',
        '由一致凸，存在 $\\delta = \\delta(\\varepsilon) > 0$ 使 $\\|(x + y)/2\\| \\le 1 - \\delta < 1$。',
        '按 `def.strictly-convex` 的定义，这正是严格凸。$\\blacksquare$'
      ].join('\n'),
      note: '严格凸是独立定义，不由一致凸构造；这条只是逻辑包含，故不分层。反向不成立：存在严格凸但不一致凸的 Banach 空间。'
    },
    { id: 'def-link.ref-dual', kind: 'definition', definition: 'def.dual-space',
      usedBy: 'def.reflexive-space',
      note: '自反性用二次对偶 $X^{**}$ 与自然嵌入 $J_X$ 定义。' },
    { id: 'def-link.ref-banach', kind: 'definition', definition: 'def.banach-space',
      usedBy: 'def.reflexive-space',
      note: '自反性是对 Banach 空间说的（完备性用于 $X^{**}$ 的范数结构）。' },
    { id: 'def-link.lpref-ref', kind: 'definition', definition: 'def.reflexive-space',
      usedBy: 'cor.lp-reflexive',
      note: '$L^p$（$1 < p < \\infty$）自反正是这个一般定义的具体实例。' },
    { id: 'def-link.mp-uc', kind: 'definition', definition: 'def.uniformly-convex',
      usedBy: 'thm.milman-pettis',
      note: 'Milman–Pettis 的假设：一致凸。' },
    { id: 'def-link.mp-ref', kind: 'definition', definition: 'def.reflexive-space',
      usedBy: 'thm.milman-pettis',
      note: 'Milman–Pettis 的结论：自反。' },
    { id: 'def-link.james-ref', kind: 'definition', definition: 'def.reflexive-space',
      usedBy: 'thm.james',
      note: 'James 定理用自反性刻画「每个泛函达到范数」。' },
    { id: 'def-link.rieszhil-pp', kind: 'definition', definition: 'def.perfect-pairing',
      usedBy: 'thm.riesz-hilbert',
      note: 'Hilbert 的 Riesz 表示所用的内积配对 $(H, H)$ 是完美配对，且映射满。' },
    { id: 'def-link.rieszlp-pp', kind: 'definition', definition: 'def.perfect-pairing',
      usedBy: 'thm.riesz-representation-lp',
      note: '$L^p$ 的 Riesz 表示所用的配对 $(L^p, L^q)$ 是完美配对，且映射满。' },
    { kind: 'definition', definition: 'def.vector-space', usedBy: 'def.convex-set',
      note: '凸集是向量空间的子集；凸性只用仿射结构，不用范数。' },
    { kind: 'definition', definition: 'def.convex-set', usedBy: 'thm.projection-convex',
      note: '投影定理的核心假设：凸、闭、非空。' },
    { kind: 'definition', definition: 'def.star-shaped', usedBy: 'lem.poincare-lemma',
      note: 'Poincaré 引理里的星形区域就是这里的星形开集；星点可作收缩中心。' },
    { kind: 'implication', sources: ['def.convex-set'], target: 'def.star-shaped',
      title: '非空凸集 $\\implies$ 星形集',
      proof: [
        '设 $C \\ne \\emptyset$ 凸，取 $x_{0} \\in C$。对任意 $x \\in C$、$t \\in [0,1]$，由凸性 $(1-t)x_{0} + tx \\in C$。',
        '这正是星形集关于 $x_{0}$ 的定义，故 $C$ 是星形集。∎'
      ].join('\n'),
      note: '「非空」不能省：空集是凸的但不是星形集（没有星点）。逆命题也不成立：十字形星形但不凸。'
    },
    { kind: 'definition', definition: 'def.convex-set', usedBy: 'def.convex-combination',
      note: '凸组合是凸集对有限线性组合封闭的载体；两点情形就是凸集定义里的线段。' },
    { kind: 'definition', definition: 'def.convex-combination', usedBy: 'def.convex-hull',
      note: '凸包的有限凸组合刻画直接用到凸组合。' },
    { kind: 'definition', definition: 'def.convex-hull', usedBy: 'def.standard-simplex',
      note: '标准单纯形正是其顶点集的凸包；这里把几何单纯形与凸包概念接上。' },
    {
      id: 'imp.fa-riesz-laxmilgram',
      kind: 'implication',
      sources: ['thm.riesz-hilbert'],
      target: 'thm.lax-milgram',
      title: 'Riesz 表示 $\\implies$ Lax–Milgram（第一步）',
      proof: [
        '固定 $y$，$\\varphi_y(x) = L(x, y)$ 是连续线性泛函。由 Riesz 表示定理，存在唯一 $A y$ 使 $L(x, y) = \\langle x, A y\\rangle$，且 $\\|A y\\| = \\|\\varphi_y\\| \\le M \\|y\\|$。',
        '这就给出算子 $A$ 并证明 $\\|A\\| \\le M$；$A$ 的线性来自 $L$ 对第二变量的线性。'
      ].join('\n'),
      note: 'Lax–Milgram 的「存在唯一 $A$」完全由 Riesz 表示承担；强制性只用于后面的可逆性。'
    },
    {
      id: 'imp.fa-closedgraph-laxmilgram',
      kind: 'implication',
      sources: ['thm.closed-graph'],
      target: 'thm.lax-milgram',
      title: '闭图像定理 $\\implies$ Lax–Milgram 的逆有界',
      proof: [
        '强制性给出 $\\|A x\\| \\ge \\delta \\|x\\|$；由此 $A$ 单射、像闭，再用正交分解证满射，故 $A$ 是 Banach 空间之间的有界双射。',
        '考察 $A^{-1}$ 的图像：若 $y_n \\to y$ 且 $A^{-1} y_n \\to x$，则 $A(A^{-1} y_n) = y_n \\to y$，由 $A$ 连续得 $A x = y$，即 $x = A^{-1} y$。图像闭，由闭图像定理 $A^{-1}$ 有界。'
      ].join('\n'),
      note: '这里用的是闭图像定理（而不是开映射定理）；两者等价，但闭图像形式在「逆映射」上更直接。'
    },
    { id: 'def-link.fa-hilbert-lax', kind: 'definition', definition: 'def.hilbert-space',
      usedBy: 'thm.lax-milgram',
      note: '内积与正交分解（Riesz 表示、正交补）都要求 Hilbert 空间。' },
    { id: 'def-link.fa-op-lax', kind: 'definition', definition: 'def.bounded-operator',
      usedBy: 'thm.lax-milgram',
      note: '结论是 $A \\in B(H)$，且估计 $\\|A\\| \\le M$、$\\|A^{-1}\\| \\le 1/\\delta$。' },
    { id: 'def-link.fa-vector-complemented', kind: 'definition', definition: 'def.vector-space',
      usedBy: 'def.complemented-subspace',
      note: '代数互补只用向量空间的加法与子空间结构，不需要范数。' },
    { id: 'def-link.fa-banach-complemented', kind: 'definition', definition: 'def.banach-space',
      usedBy: 'def.complemented-subspace',
      note: '可补性的判别定理（闭 $\\iff$ 拓扑互补）要求 $E$ 完备；定义本身只需要赋范空间。' },
    { id: 'def-link.fa-complemented-criterion', kind: 'definition', definition: 'def.complemented-subspace',
      usedBy: 'thm.complemented-subspace-criterion',
      note: '定理用的正是这里的代数互补、投影与拓扑互补三个概念。' },
    {
      id: 'imp.fa-openmap-complemented',
      kind: 'implication',
      sources: ['thm.bounded-inverse'],
      target: 'thm.complemented-subspace-criterion',
      title: '有界逆定理 $\\implies$ 闭的代数互补必拓扑互补',
      proof: [
        '设 $E$ Banach，$X, Y$ 闭且代数互补。则 $X, Y$ 是 Banach 空间，$X \\times Y$ 是 Banach 空间。',
        '$\\Phi : X \\times Y \\to E$，$\\Phi(x, y) = x + y$，是有界线性双射。由逆算子定理，$\\Phi^{-1}$ 有界。',
        '于是 $P_X = \\pi_X \\circ \\Phi^{-1}$ 有界（$\\pi_X$ 是乘积到第一因子的投影，范数 $\\le 1$），即 $X, Y$ 拓扑互补。$\\blacksquare$'
      ].join('\n'),
      note: '这条正是「闭子空间 + 代数互补 $\\implies$ 有界投影」的全部内容；$E$ 的完备性只在这里用到。'
    },
    { id: 'def-link.fa-partial-bounded', kind: 'definition', definition: 'def.bounded-operator',
      usedBy: 'def.partial-isometry',
      note: '部分等距首先是有界算子。' },
    { id: 'def-link.fa-partial-proj', kind: 'definition', definition: 'def.orthogonal-projection',
      usedBy: 'def.partial-isometry',
      note: '定义要求 $u^*u$ 是正交投影；等价刻画里 $u\\,u^*$ 也是正交投影。' },
    {
      id: 'imp.fa-unitary-partial',
      kind: 'implication',
      sources: ['def.unitary-operator'],
      target: 'def.partial-isometry',
      title: '酉算子 $\\implies$ 部分等距',
      proof: [
        '设 $u$ 是酉算子，即 $u^*u = u\\,u^* = I$。',
        '$I$ 是正交投影，故按定义 $u^*u = I$ 是正交投影，$u$ 是部分等距。$\\blacksquare$'
      ].join('\n'),
      note: '反向不成立：单侧移位是部分等距但不是酉算子（$S\\,S^*$ 不是 $I$）。'
    },
    { id: 'def-link.huc-hilbert', kind: 'definition', definition: 'def.hilbert-space',
      usedBy: 'thm.hilbert-uniformly-convex',
      note: '证明用 Hilbert 空间的内积与由它诱导的范数（平行四边形律）。' },
    { id: 'def-link.huc-uc', kind: 'definition', definition: 'def.uniformly-convex',
      usedBy: 'thm.hilbert-uniformly-convex',
      note: '结论按一致凸的定义陈述：$\\delta$ 只依赖 $\\varepsilon$。' },
    {
      id: 'imp.riesz-hilbert-pink',
      kind: 'implication',
      sources: ['thm.riesz-perfect-pairing'],
      target: 'thm.riesz-hilbert',
      layer: false,
      title: '配对框架到 Hilbert 版 Riesz 表示（组织性回头边）',
      proof: [
        '**组织性说明（非推导）。** `thm.riesz-perfect-pairing` 只给出完美配对框架，并把 Hilbert 内积配对列为实例：三条公理由 Cauchy–Schwarz 与非退化性验证。',
        '它**不**推出满射性 $H^{*}\\cong H$；满射性由 `thm.riesz-hilbert` 用投影定理/正交分解独立证明。',
        '因此这条边表达「框架到实例」的回头关系（便于从框架跳到具体定理），不是从完美配对的三条公理单独推出满射，故 `layer: false`。'
      ].join('\n'),
      note: '组织性回头边：配对定理只给框架；满射性仍由投影定理给出，不是从完美配对的三条公理单独推出。'
    },
    {
      id: 'imp.riesz-lp-pink',
      kind: 'implication',
      sources: ['thm.riesz-perfect-pairing'],
      target: 'thm.riesz-representation-lp',
      layer: false,
      title: '配对框架到 $L^p$ 版 Riesz 表示（组织性回头边）',
      proof: [
        '**组织性说明（非推导）。** `thm.riesz-perfect-pairing` 把 $(L^{p},L^{q})$ 列为完美配对实例：三条公理由 Hölder 与对偶刻画验证。',
        '它**不**推出 $(L^{p})^{*}\\cong L^{q}$；满射性由 `thm.riesz-representation-lp` 用 Radon–Nikodym 独立证明。',
        '因此这条边表达「框架到实例」的回头关系（便于从框架跳到具体定理），不是从完美配对的三条公理单独推出满射，故 `layer: false`。'
      ].join('\n'),
      note: '组织性回头边：配对定理只给框架；满射性仍由 Radon–Nikodym / 对偶刻画给出，不是从完美配对的三条公理单独推出。'
    }
  ]
});
