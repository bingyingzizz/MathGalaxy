/* ==========================================================================
   内容包 · 泛函分析（一）：赋范空间与有界算子（16 条）
   --------------------------------------------------------------------------
   来源：用户的泛函分析讲义（`H:\Download\泛函分析`，2026-09-14 ~ 10-26，25 页手写，
   已 OCR/人工转写）。2026-09-28 那一份是这一团的主干。

   团的口径：**造出「能算长度的空间」和「能算大小的算子」这套装置**。
   顺序是硬顺序：范数 $	o$ 诱导距离 $	o$ 等价范数 $	o$ 有限维（球紧）$	o$ 无穷维的反面
   （几乎正交）$	o$ 算子 $	o$ 有界 ⟺ 连续 $	o$ 算子范数 $	o$ B(E,F) 完备 $	o$ 对偶 E*。
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
        '- 半范数 $\\implies$ 范数仅在零空间为零时成立；非零空间上的零函数是反例。商掉零空间所得范数的良定义用三角不等式，不用选择公理。\n'
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
        '这条说清了「赋范」比「度量」多出来的是什么：**平移不变 + 齐次 + 球凸**。所以「这个度量是否来自范数」是一个有内容的问题（反例：$\\min(d, 1)$ 与 $\\sum_i 2^{-i}\\frac{|x_i - y_i|}{1 + |x_i - y_i|}$ 都不平移不变）。',
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
        '⚠️ 强弱不对称，而且方向和直觉相反：**强**范数（$p$ 大）的球更小、开集更少、收敛更难、Cauchy 列更多。所以「换成强范数」会**减少**收敛的东西 —— 这也是为什么要挑最弱的、够用的范数（例如弱拓扑）。',
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
        '「$\\Longleftarrow$」：有限维时所有范数等价（`thm.norm-equiv-finite-dim`），于是可以用 $\\|\\cdot\\|_\\infty$ 的坐标球来判断紧性；\n\n而坐标球 $\\overline{B}^{\\infty}(0,1) = [-1,1]^{n}$ 是有界闭集，由 Heine–Borel（`cor.heine-borel`）紧。\n\n∎',
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
        '⚠️ **名字是个历史误会**：这里「有界」**不是**「函数有界」（只有 $E = 0$ 时才等价）。真正的含义是「把有界集送到有界集」，等价于**连续**（下一条）。读老书时别被这个名字带歪。',
        '⚠️ 三个 sup 相等要求 $E \\ne 0$（否则球面空集、sup 无意义）。',
        '⭐ 无穷维里 $L(E, F) \\ne B(E, F)$：不连续的线性算子确实存在（要用选择公理造）。所以本图把「线性」与「有界」分成两个节点：$L(E,F)$ 是**代数**上的 Hom，$B(E,F)$ 是其中连续的那部分。'
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
        '特别地 $B(E)$ 是**赋范代数**（乘法连续），且 $\\|\\mathrm{id}\\| = 1$。'
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
        '例：$B(E)$（$E$ Banach）、$C(K)$（上确界范数）、$L^1(\\mathbb{R})$（卷积乘法）、$\\ell^1(\\mathbb{Z})$、以及 $C^*$-代数（再要一条 $\\|x^* x\\| = \\|x\\|^2$）。',
        '⭐ 这一族是「把分析问题化成代数问题」的通用容器：Gelfand 理论（交换 Banach 代数 $\\cong C(\\text{极大理想空间})$）就是从这条定义出发的。'
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
        '⭐ 对偶是把「空间」变成「函数」的唯一正经通道：弱拓扑、Riesz 表示、Hahn–Banach、对偶配对全在 $E^*$ 上进行。'
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
        '**可分的**：$\\ell^p(\\mathbb{N})$（$1 \\le p < \\infty$）、$L^p(\\Omega)$、$C(K)$（$K$ 紧度量）、任何有限维空间。',
        '**不可分的**：$\\ell^\\infty(\\mathbb{N})$。证法：取 $A = \\{(e_n) : e_n = \\pm 1\\}$（$2^{\\aleph_0}$ 个点），任意两点距离 $\\ge 2$，故半径 $1$ 的两两不交球有不可数多个 —— 可数稠密集顶多覆盖可数多个。',
        '⭐ 讲义里那句「不可分 $\\implies$ 不能由一个可数集作为代数生成」很值得记：它把「基」的直觉挡在门外 —— $\\ell^\\infty$ 连可数 Schauder 基都没有（见「Schauder 基」）。',
        '⚠️ 可分性对**闭子空间**遗传、对**商**遗传，但对连续像不一定、对乘积不遗传（$\\mathbb{R}^{\\mathbb{R}}$ 不可分）。'
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
        '⚠️ 与 Hilbert 空间的「正交基」不同：Schauder 基不要求正交、也不要求唯一性来自内积；Hilbert 空间里正交基一定是 Schauder 基，反之不然。'
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
        '$$\\ell^2(I) := \\left\\{ x = (x_i)_{i \\in I} \\subseteq \\mathbb{K} \\ : \\ \\|x\\|_2 := \\sup_{\\substack{J \\subseteq I \\\\ |J| < \\infty}} \\Bigl( \\sum_{j \\in J} |x_j|^2 \\Bigr)^{1/2} < \\infty \\right\\} ,$$',
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
        '设 $(H, \\langle\\cdot, \\cdot\\rangle)$ 是 $\\mathbb{K}$ 上的内积空间（本图约定：**对第一变元线性，对第二变元共轭线性**），配范数 $\\|x\\| := \\sqrt{\\langle x, x\\rangle}$。\n\n若 $(H, \\|\\cdot\\|)$ 完备，则叫 **Hilbert 空间**。'
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
        '- 闭性不能删：$E=c_{00}\\subset\\ell^2$ 时，对 $x\\in\\ell^2\\setminus c_{00}$ 距离为零却不取到，故不存在 $E$ 中最近点。\n'
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
        '⚠️ 别与 $L^p$ 的 Riesz 表示混淆：那是 $(L^p)^* \\cong L^q$（$1<p<\\infty$，$1/p + 1/q = 1$），靠 Hölder 不等式；这条靠正交分解。两者只共享名字。'
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
      title: '酉算子与部分等距',
      regions: ['functional-analysis'],
      tags: ['泛函分析', 'Hilbert 空间', '算子'],
      statement: [
        '设 $u \\in B(H)$。称 $u$ 是**酉算子**（unitary），若',
        '',
        '$$u\\,u^* = u^*\\,u = I .$$',
        '',
        '称 $u$ 是**部分等距**（partial isometry），若 $u\\,u^*$ 与 $u^*u$ 都是正交投影。'
      ].join('\n'),
      notes: [
        '酉 $\\iff$ 保内积的可逆算子（$\\langle ux, uy\\rangle = \\langle x, y\\rangle$ 且满射）。',
        '⚠️ **无穷维里「等距」$\\ne$「酉」**：单侧移位 $S(x_1, x_2, \\ldots) = (0, x_1, x_2, \\ldots)$ 满足 $\\|Sx\\| = \\|x\\|$（等距），但不满；\n\n$S^*S = I$ 而 $S\\,S^* = I - P_{\\ker S^*}$ 是投影。\n\n这就是「部分等距」这个概念的用处：它把「在某个闭子空间上是等距」包起来。',
        '⭐ 极分解 $u = V|u|$（$V$ 部分等距，$|u| = \\sqrt{u^*u}$）就是部分等距的标准出场方式。有限维版本见 `def.unitary-matrix`。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
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
        '设 $H$ 是 Hilbert 空间，$\\dim H = |I|$（Hilbert 维数）。则 $H$ 等距同构于 $\\ell^2(I)$。特别地，无穷维可分 Hilbert 空间都等距同构于 $\\ell^2(\\mathbb{N})$。'
      ].join('\n'),
      notes: [
        '映射 $U : H \\to \\ell^2(I)$，$U(x) := (\\langle x, e_i\\rangle)_{i \\in I}$。\n\n' +
        '由 Bessel 它入 $\\ell^2$、由 Parseval 它保范；\n\n' +
        '满射性：若 $(\\lambda_i) \\in \\ell^2$，则部分和 $\\sum_{i \\in J}\\lambda_i e_i$ 是 Cauchy（$\\|\\sum_{J \\setminus J\'}\\lambda_i e_i\\|^2 = \\sum_{J \\setminus J\'}|\\lambda_i|^2$），其极限的坐标就是 $\\lambda_i$。',
        '⭐ 结论：**可分无穷维 Hilbert 空间在等距意义下只有一个**。Banach 空间完全不是这样：$\\ell^p$（不同 $p$）两两不同构，$C[0,1]$、$L^1$、$c_0$ 也各自不同。这就是「Hilbert 空间简单」的确切含义。',
        '⚠️ 「可分」不能去掉：$\\ell^2(I)$（不可数 $I$）与 $\\ell^2(J)$ 同构 $\\iff \\#I = \\#J$（用正交基的基数比）。'
      ].join('\n\n'),
      refs: ['Conway, A Course in Functional Analysis · Hilbert 空间与正交基'],
    }
  ],

  edges: []
});
