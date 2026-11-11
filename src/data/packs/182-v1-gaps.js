/* ============================================================================
   内容包 · 补 v1 的 B3 / B5 / B7（2026-11-03，回应《交付核对》）
   ----------------------------------------------------------------------------
   这三条是 v1 报告里「定义链」类没做的部分：

   **B3 通名缺席**（四个词被大量引用、却没有通名节点）
     · 同构（231 个节点提到）—— 各分支有 `def.linear-isomorphism` / `def.order-iso` /
       `def.homeomorphism`，通名只有范畴论的 `def.mono`（而且它是「单态射/满态射/同构」三合一）
     · 原函数（9 处提及）—— 连别名都没有
     · 二元运算（3 处）—— 群/环/域各自内联一次
     · 群的阶 / 元素的阶 —— 多个节点直接用 $|G|$ 与 $\operatorname{ord}(x)$

   **B5 三角只有 sin/cos**：`def.trig-function` 只造 $\sin,\cos$；
     $\tan,\cot,\sec,\csc$ 与**反三角**全无节点（搜「正切」「反三角函数」0 命中）。

   **B7 完备的三义互不相认**：`def.complete`（度量完备）、`thm.real-ordered-field`
     （序完备）、`def.null-set`（测度完备）三者之间**零边**，搜「完备性」把它们平铺在一起。
     本包补两条真依赖 + 一条类比 + 消歧注，不新增节点。

   ⚠️ 同构一条按「通名归位」处理：通名给**范畴论的一般定义**（可逆态射），
      各分支的名字（双射 / 同胚 / 线性同构 / 序同构）写进它的注与类比边。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '补 v1：通名四缺、三角扩展、完备三义',

  nodes: [
    {
      id: 'def.isomorphism',
      cluster: 'cat.basic',
      type: 'definition',
      label: '同构',
      title: '同构（可逆态射）—— 各分支的通名',
      regions: ['category', 'algebra'],
      tags: ['定义', '范畴', '代数'],
      statement: [
        '设 $\\mathcal{C}$ 是范畴，$f : X \\to Y$ 是其中的态射。称 $f$ 是**同构**，' +
          '如果存在态射 $g : Y \\to X$ 使',
        '',
        '$$g \\circ f = \\mathrm{id}_{X}, \\qquad f \\circ g = \\mathrm{id}_{Y}.$$',
        '',
        '这样的 $g$ 唯一（若 $g, g\'$ 都行，则 $g = g\' f g = g\'$），记 $g = f^{-1}$；' +
          '此时称 $X$ 与 $Y$ **同构**，记 $X \\cong Y$。',
      ].join('\n'),
      notes: [
        '⭐ **它是各分支里同一个概念的通名**（此前全库只有范畴论那个三合一的 `def.mono`）：',
        '- 集合 / $\\mathbf{Set}$：同构 = **双射**；',
        '- 群、环、模：同构 = 双射的同态；',
        '- 拓扑 / $\\mathbf{Top}$：同构 = **同胚**（`def.homeomorphism`）；',
        '- 向量空间：同构 = **线性同构**（`def.linear-isomorphism`）；',
        '- 序集：同构 = **序同构**（`def.order-iso`）；',
        '- 而「单态射 / 满态射」是**另一对概念** —— 一般范畴里单 + 满**不**蕴含同构' +
          '（例如 $\\mathbf{Top}$ 里连续双射不必同胚），所以它不能当同构的通名。',
        '⚠ **「同构」不等于「相等」**：同构说的是「在保持结构的映射下无法区分」。' +
          '整张星图里绝大多数结论都只在同构意义下成立（例如「$V \\cong K^{n}$」而不是「$V = K^{n}$」）。',
        '📌 与「等价」的区别：范畴之间的**等价**（`def.adjoint` 那一族讨论的）只需要「差一个自然同构」，' +
          '比同构弱；同构是最强的那一档。',
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I §5', 'Lang, Algebra, Ch. I'],
    },

    {
      id: 'def.antiderivative',
      cluster: 'analysis.riemann',
      type: 'definition',
      label: '原函数',
      title: '原函数：$F\' = f$ 的那个 $F$',
      regions: ['analysis'],
      tags: ['定义', '分析', '积分'],
      statement: [
        '设 $I \\subseteq \\mathbb{R}$ 是区间，$f : I \\to \\mathbb{R}$。函数 $F : I \\to \\mathbb{R}$ 叫 $f$ 在 $I$ 上的' +
          '**原函数**（也叫**不定积分**），如果 $F$ 在 $I$ 上可导且',
        '',
        '$$F\'(x) = f(x) \\qquad (\\forall x \\in I).$$',
        '',
        '若 $F$ 是一个原函数，则 $f$ 的**全部**原函数恰好是 $\\{ F + C : C \\in \\mathbb{R} \\}$。',
      ].join('\n'),
      notes: [
        '⭐ **为什么「全部」只差常数**：若 $F\' = G\' = f$，则 $(F - G)\' = 0$，' +
          '由中值定理（`thm.mvt`）$F - G$ 是常数。这一步是「不定积分」这个记号 $\\int f\\,\\mathrm{d}x = F + C$ 的全部依据。',
        '⭐ **存在性不是白给的**：$f$ **连续**时一定有原函数 —— 取 $F(x) = \\int_{a}^{x} f$，' +
          '就是变上限积分的导数（微积分基本定理第一部分）。而不连续的函数可能没有原函数' +
          '（有第一类间断点的导数不存在原函数：导函数不能有跳跃间断）。',
        '⚠ **「原函数」与「定积分」是两件事**：原函数是一个**函数**（差一个常数），' +
          '定积分是一个**数**；把它们粘起来的是微积分基本定理。',
        '⚠ 与 `def.riemann-integrable` 的分工：可积 $\\ne$ 有原函数。$|x|$ 在 $[-1,1]$ 上可积且它有原函数，' +
          '但 $\\operatorname{sgn}(x)$ 可积却**没有**原函数（跳跃间断）。',
      ].join('\n\n'),
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 6', 'Folland, Real Analysis, Ch. 1'],
    },

    {
      id: 'def.binary-operation',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '二元运算',
      title: '二元运算（$S \\times S \\to S$）',
      regions: ['algebra'],
      tags: ['定义', '代数'],
      statement: [
        '集合 $S$ 上的**（二元）运算**就是一个映射',
        '',
        '$$\\ast : S \\times S \\longrightarrow S, \\qquad (a, b) \\longmapsto a \\ast b .$$',
        '',
        '「像落在 $S$ 里」这一条就是常说的**封闭性** —— 它是定义的一部分，不是额外要求。',
      ].join('\n'),
      notes: [
        '⭐ **群、环、域、格、半群全部建立在它上面**：`def.group` 说的是「一个运算 + 三条公理」，' +
          '环是两个运算 + 分配律，格是两条幂等交换运算 + 吸收律。此前这些定义各自**内联**了一次' +
          '「$S \\times S \\to S$」，没有通名节点。',
        '⚠ **运算 vs 关系**：$S \\times S \\to S$ 是**运算**（有返回值），$S \\times S \\to \\{\\text{真}, \\text{假}\\}$' +
          '是**二元关系**（如 $\\le$、$\\in$）。两者不能混：关系没有「封闭性」问题，因为它不往 $S$ 里取值。',
        '⭐ **结合律不是运算的定义的一部分**：$a \\ast (b \\ast c) = (a \\ast b) \\ast c$ 是**额外条件**，' +
          '满足它的叫半群。这是初学者最常见的混淆点。',
        '📌 例子：$\\mathbb{Z}$ 上的加法与乘法都是二元运算；$\\mathbb{Z}$ 上的除法**不是**（$1/2 \\notin \\mathbb{Z}$，' +
          '不封闭）；$\\mathbb{R}^{\\times}$ 上的乘法也封闭 —— 去掉 $0$ 不是为了封闭性，而是为了让**每个元素有乘法逆元**。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. I §1', 'Hungerford, Algebra, Ch. I'],
    },

    {
      id: 'def.group-order',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '群的阶与元素的阶',
      title: '群的阶 $|G|$ 与元素的阶 $\\operatorname{ord}(x)$',
      regions: ['algebra'],
      tags: ['定义', '代数', '群论'],
      statement: [
        '设 $G$ 是群。',
        '',
        '- $G$ 的**阶**指它的**基数**，记 $|G|$（$G$ 有限时就是元素个数）；',
        '- $x \\in G$ 的**阶**指使 $x^{n} = e$ 成立的**最小正整数** $n$，记 $\\operatorname{ord}(x)$；' +
          '若不存在这样的 $n$，说 $x$ 的阶为**无穷**。',
      ].join('\n'),
      notes: [
        '⭐ **两个「阶」靠 Lagrange 定理连起来**：$G$ **有限**时 $\\operatorname{ord}(x)$ 整除 $|G|$（$G = \\mathbb{Z}$、$x = 1$ 的阶是无穷，两边无从谈起），' +
          '而且 $\\operatorname{ord}(x)$ 就是循环子群 $\\langle x \\rangle$ 的阶。这条是初等群论里最常用的桥。',
        '⚠ **$|G|$ 这个记号在本图有两个含义**（同一个符号、不同语境，见 `notation` 的 R13）：' +
          '群的阶用 $|G|$，而**集合的势**用 $\\#A$。两者数学上是同一件事（群的阶就是其底层集合的势），' +
          '但写法按语境分工 —— 读的时候看落点是不是群。',
        '⚠ **与「元素的次数」不是一回事**：环里 $x$ 的「幂零次数」、域元素的「次数」$[F(x):F]$ 都是别的量。',
        '📌 读数：$|S_{n}| = n!$；$\\operatorname{ord}((1\\,2\\,3)) = 3$；' +
          '$\\mathbb{Z}/n$ 里 $\\operatorname{ord}(\\bar{k}) = n/\\gcd(n,k)$。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. I §4', 'Hungerford, Algebra, Ch. I §4'],
    },

    {
      id: 'def.tan-cot-sec',
      cluster: 'analysis.real-calc',
      type: 'definition',
      label: '正切、余切、正割、余割',
      title: '$\\tan,\\ \\cot,\\ \\sec,\\ \\csc$ —— 都是 $\\sin,\\cos$ 的商与倒数',
      regions: ['analysis'],
      tags: ['定义', '分析', '初等函数'],
      statement: [
        '在 $\\sin,\\cos$ 已经定义的区间上，令',
        '',
        '$$\\tan x := \\frac{\\sin x}{\\cos x}\\ (\\cos x \\ne 0), \\qquad ' +
          '\\cot x := \\frac{\\cos x}{\\sin x}\\ (\\sin x \\ne 0),$$',
        '$$\\sec x := \\frac{1}{\\cos x}, \\qquad \\csc x := \\frac{1}{\\sin x}.$$',
        '',
        '定义域相应去掉分母为零的点（例如 $\\tan$ 在 $x = \\pi/2 + k\\pi$ 处无定义）。',
      ].join('\n'),
      notes: [
        '⭐ **它们不是新函数**：全部由 $\\sin,\\cos$ 的商/倒数给出，所以导数和恒等式都能从 $\\sin,\\cos$ 推 —— ' +
          '$\\tan\' = \\sec^{2}$、$(\\sec)\' = \\sec\\tan$。此前本图只有 `def.trig-function`（只造 $\\sin,\\cos$），' +
          '搜「正切」0 命中。',
        '⭐ **基本恒等式**（把 $\\sin^{2} + \\cos^{2} = 1$ 分别除以 $\\cos^{2}$、$\\sin^{2}$：前者给 $1 + \\tan^{2} = \\sec^{2}$，后者给 $1 + \\cot^{2} = \\csc^{2}$，都在分母非零处成立）：',
        '',
        '$$1 + \\tan^{2} x = \\sec^{2} x, \\qquad 1 + \\cot^{2} x = \\csc^{2} x .$$',
        '⚠ **定义域是真事**：$\\tan$ 在 $\\pi/2$ 处发散（竖直渐近线），这不是「画不出来」，是函数在那里没定义。' +
          '所以 $\\tan$ 在 $(-\\pi/2, \\pi/2)$ 上才是双射 —— 反函数只在这样的区间上取（见 `def.inverse-trig`）。',
        '📌 名字的来历：$\\sec$ 是 secant（割线），$\\csc$ 是 cosecant；中文「正割/余割」与「正弦/余弦」同源的配对约定，' +
          '与「正/余」在 $\\sin(\\pi/2 - x) = \\cos x$ 意义下的互换一致。',
      ].join('\n\n'),
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8', 'Apostol, Calculus, Ch. 1'],
    },

    {
      id: 'def.inverse-trig',
      cluster: 'analysis.real-calc',
      type: 'definition',
      label: '反三角函数',
      title: '$\\arcsin,\\ \\arccos,\\ \\arctan$ —— 在单调区间上取反函数',
      regions: ['analysis'],
      tags: ['定义', '分析', '初等函数'],
      statement: [
        '三角函数是周期的，**整体上没有反函数**；但在单调区间上可以取反函数：',
        '',
        '- $\\arcsin : [-1, 1] \\to [-\\pi/2, \\pi/2]$ 是 $\\sin$ 限制在 $[-\\pi/2, \\pi/2]$ 上的反函数；',
        '- $\\arccos : [-1, 1] \\to [0, \\pi]$ 是 $\\cos$ 限制在 $[0, \\pi]$ 上的反函数；',
        '- $\\arctan : \\mathbb{R} \\to (-\\pi/2, \\pi/2)$ 是 $\\tan$ 限制在 $(-\\pi/2, \\pi/2)$ 上的反函数。',
        '',
        '即 $\\sin(\\arcsin x) = x$（$|x| \\le 1$），而 $\\arcsin(\\sin x) = x$ **只在** $|x| \\le \\pi/2$ 时成立。',
      ].join('\n'),
      notes: [
        '⚠ **最关键的一条**：$\\arcsin(\\sin x) = x$ 一般**不成立**（只在上面的单调区间内成立）；' +
          '反过来 $\\sin(\\arcsin x) = x$ 在定义域内总成立。这个「一侧总成立、另一侧要看区间」是反函数的一般规律。',
        '⭐ **为什么必须挑区间**：$\\sin$ 在 $[0, \\pi]$ 上不单调，所以那里没有单值的反函数；' +
          '选 $[-\\pi/2, \\pi/2]$ 是约定（值域对称、含 $0$、连续），换一个区间就是另一个反函数。',
        '⭐ **导数**（都能从反函数求导 + $\\sin^{2}+\\cos^{2}=1$ 推出）：',
        '',
        '$$(\\arcsin x)\' = \\frac{1}{\\sqrt{1 - x^{2}}}, \\qquad (\\arctan x)\' = \\frac{1}{1 + x^{2}} .$$',
        '⚠ 两个都要注意开区间：$\\arcsin$ 在 $x = \\pm 1$ 处导数发散（竖直切线），' +
          '所以端点的单侧差商 $\\to +\\infty$ —— 不存在**有限的**单侧导数。',
        '📌 本图没有「弧度」与「单位圆」的节点（E4 缺口），所以这里只说「$\\sin$ 限制在区间上」，' +
          '不引入角度语言 —— 从级数/微分方程定义 $\\sin,\\cos$ 的那条线上，$\\pi$ 是 $2\\sin^{-1}(1)$。',
      ].join('\n\n'),
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 8', 'Apostol, Calculus, Ch. 6'],
    },
  ],

  edges: [
    /* ---------- 同构：范畴论通名 ---------- */
    {
      id: 'dep.category-isomorphism',
      kind: 'definition',
      definition: 'def.category',
      usedBy: 'def.isomorphism',
      note: '同构是**范畴里的**概念（可逆态射），先要有范畴。',
    },
    /* ---------- 原函数 ---------- */
    {
      id: 'dep.derivative-antiderivative',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'def.antiderivative',
      note: '原函数就是用导数**倒过来**定义的：$F\' = f$。',
    },
    {
      id: 'dep.interval-antiderivative',
      kind: 'definition',
      definition: 'def.interval',
      usedBy: 'def.antiderivative',
      note: '原函数是「在某个**区间**上」说的 —— 在两点集上取原函数没有意义（中值定理要区间）。',
    },
    /* ---------- 二元运算 ---------- */
    {
      id: 'dep.function-binaryop',
      kind: 'definition',
      definition: 'def.function',
      usedBy: 'def.binary-operation',
      note: '运算就是一个**映射**（$S \\times S \\to S$）；「封闭性」由像集落在 $S$ 内自动给出。',
    },
    /* ---------- 群的阶 ---------- */
    {
      id: 'dep.group-grouporder',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.group-order',
      note: '群的阶与元素的阶都是**群**上的量。',
    },
    /* 与既有的群论节点互通：他们早就用 $|G|$，但没指向这个定义 */
    {
      id: 'dep.grouporder-vs',
      kind: 'definition',
      definition: 'def.group-order',
      usedBy: 'def.vs',
      note: '基的存在性定理要数「基的势」，而群那一侧用的是「$|G|$ 是阶」这套语言 —— 两个「大小」在这里对上。',
    },
    /* ---------- 三角扩展 ---------- */
    {
      id: 'dep.trig-tancot',
      kind: 'definition',
      definition: 'def.trig-function',
      usedBy: 'def.tan-cot-sec',
      note: '四个新函数全部由 $\\sin,\\cos$ 的商与倒数给出 —— 这是它们**不是新函数**的准确含义。',
    },
    {
      id: 'dep.trig-inversetrig',
      kind: 'definition',
      definition: 'def.trig-function',
      usedBy: 'def.inverse-trig',
      note: '反三角函数是 $\\sin,\\cos$（以及由它们定义的 $\\tan$）在单调区间上的反函数。',
    },
    /* ---------- B7 完备三义：两条真依赖 + 一条类比 ---------- */
    {
      id: 'dep.cauchy-complete',
      kind: 'definition',
      definition: 'def.cauchy-sequence',
      usedBy: 'def.complete',
      note: '**完备的定义就是「每个 Cauchy 列都收敛」** —— 此前这两个节点之间一条边都没有，' +
        '读 `def.complete` 的人不知道 Cauchy 列是什么，读 Cauchy 列的人不知道它被谁用。',
    },
    {
      id: 'dep.realcomplete-complete',
      kind: 'definition',
      definition: 'def.complete',
      usedBy: 'thm.real-ordered-field',
      note: '$\\mathbb{R}$ 是**完备有序域**：这里的完备是**序完备**（有上确界），' +
        '它与「度量完备」（Cauchy 列收敛）在 $\\mathbb{R}$ 上等价 —— 但那要一条定理，不是定义。' +
        '⚠ 两个「完备」不是同一个概念，只是在这条线上恰好重合。',
    },
    {id: "e191.analogy",
      kind: 'analogy',
      a: 'def.complete',
      b: 'def.null-set',
      title: '两个「完备」：度量完备 vs 测度完备',
      note: [
        '**同名不同物**（第三个是序完备，见 `thm.real-ordered-field` 那条边）：',
        '- `def.complete`：距离空间的完备 —— **每个 Cauchy 列都收敛**（关于距离）；',
        '- 测度空间的完备（`def.null-set` 那一族）：**零集的子集仍可测**（关于 $\\sigma$-代数）；',
        '- 序完备：每个有上界的非空子集有上确界（关于 $\\le$）。',
        '⚠ 三者在 $\\mathbb{R}$ 上刚好都成立，所以初学时容易以为是一件事；换一个空间就分开了（$\\mathbb{Q}$ 序不完备；某个测度空间可以测度完备而作为度量空间不完备，反之亦然）。',
        '⛔ 不能连 definition：一个是「列都收敛」，一个是「零集都进 $\\sigma$-代数」，没有蕴含关系。',
      ].join('\n\n'),
    },
  ],
});
