/* ==========================================================================
   内容包 · 补齐「被直接使用却没有定义」的概念
   --------------------------------------------------------------------------
   2026-09-22 做了一次体检：拿一份标准概念词表去扫全部正文与证明，
   找出「出现了、但图里没有节点」的词。结果 36 个，其中被用得最多的几个是

       并/交/差/补 119 个节点 · 几乎处处 66 · 基数/等势 64 · 可数 60
       连续 56 · 绝对值 40 · 收敛 39 · 空集 38 · 数列极限 30 …

   这一包补掉其中「基础得不能再基础」的几个（实数与区间另开一包）。
   剩下的（基数/等势、拓扑空间、紧支集、向量空间、域、计数测度、
   Riemann 积分…）列在 HANDOVER 的待办里，等用户点头再补。

   落点：并/交/差/补/空集 归「集合的构造」，可数/单射满射 归「关系与选择」，
   几乎处处 归「测度的构造」。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '基础概念补漏',
  nodes: [

    /* ------------------------------------------------ 集合的运算 */
    {
      id: 'def.union-inter',
      cluster: 'set.construct',
      type: 'definition',
      label: '并集与交集',
      title: '并集 / 交集（Union & Intersection）',
      regions: ['set-theory'],
      tags: ['定义', '集合运算'],
      statement: [
        '设 $\\mathcal{A}$ 是一族集合（$A$ 的**并**与**交**是它只有两个成员时的特例）：',
        '',
        '$$\\bigcup \\mathcal{A} := \\{ x : \\exists A \\in \\mathcal{A},\\ x \\in A \\}$$',
        '$$\\bigcap \\mathcal{A} := \\{ x : \\forall A \\in \\mathcal{A},\\ x \\in A \\}$$',
        '',
        '两个集合的情形记作 $A \\cup B$、$A \\cap B$；可数族的并、交常记作 $\\bigcup_{n} A_n$、$\\bigcap_{n} A_n$。',
        '',
        '显然 $A \\cap B \\subseteq A \\subseteq A \\cup B$。'
      ].join('\n'),
      notes: '由并集公理，$\\bigcup \\mathcal{A}$ 是集合；$\\bigcap \\mathcal{A}$ 由分离公理模式取出。\n\n⭐ **「对可数并封闭」「对可数交封闭」是整段测度论反复出现的条件**（$\\sigma$-环、$\\sigma$-代数、单调类都是这么定义的）。\n\n⚠ 分配律对任意族都成立：$A \\cap \\bigcup_i B_i = \\bigcup_i (A \\cap B_i)$；补与并、交的交换就是 De Morgan 律。',
      refs: ['Kunen, Set Theory, I.5']
    },
    {
      id: 'def.diff-complement',
      cluster: 'set.construct',
      type: 'definition',
      label: '差集与补集',
      title: '差集 / 补集 / 对称差（Difference, Complement & Symmetric Difference）',
      regions: ['set-theory'],
      tags: ['定义', '集合运算'],
      statement: [
        '设 $A$、$B$、$X$ 是集合且 $A, B \\subseteq X$：',
        '',
        '- **差集**：$A \\setminus B := \\{ x \\in A : x \\notin B \\}$；',
        '- **补集**（相对于 $X$）：$A^{c} := X \\setminus A$；',
        '- **对称差**：$A \\triangle B := (A \\setminus B) \\cup (B \\setminus A)$。',
        '',
        '基本恒等式：',
        '',
        '$$A \\setminus B = A \\cap B^{c}, \\qquad (A^{c})^{c} = A, \\qquad (\\bigcup_i A_i)^{c} = \\bigcap_i A_i^{c}$$',
        '',
        '最后一条就是 **De Morgan 律**。'
      ].join('\n'),
      notes: '⭐ De Morgan 律是「用差 + 可数并推出可数交」的全部依据：$\\bigcap_n A_n = A_1 \\setminus \\bigcup_{n \\ge 2} (A_1 \\setminus A_n)$ —— $\\sigma$-环只要求对差与可数并封闭，可数交就自动有了。\n\n⚠ **补集必须相对于某个全集 $X$ 才有意义**，这也正是 $\\sigma$-代数要含 $X$ 的原因：不含 $X$ 就只剩 $\\sigma$-环，补运算落不到里面。',
      refs: ['Kunen, Set Theory, I.5']
    },
    {
      id: 'def.empty',
      cluster: 'set.construct',
      type: 'definition',
      label: '空集 ∅',
      title: '空集（Empty Set）',
      regions: ['set-theory'],
      tags: ['定义', '空集'],
      statement: [
        '**空集**是不含任何元素的集合：',
        '',
        '$$\\emptyset := \\{ x : x \\ne x \\}$$',
        '',
        '由外延公理，这样的集合至多一个；由分离公理模式（对任一集合 $A$ 取 $\\{x \\in A : x \\ne x\\}$），它确实存在。',
        '',
        '于是对一切集合 $A$：$\\emptyset \\subseteq A$（空泛真），且 $\\emptyset$ 是 $\\subseteq$ 的最小元。'
      ].join('\n'),
      notes: '⭐「$\\emptyset \\in \\mathcal{A}$」「$\\emptyset \\notin F$」这类条件在测度论里到处都是（选择公理要求集合族里没有空集；$\\mu(\\emptyset) = 0$ 是测度的第一条）。\n\n⚠ 区分 $\\emptyset$ 与 $\\{\\emptyset\\}$：后者含一个元素（那个元素是空集），所以 $\\{\\emptyset\\} \\ne \\emptyset$。\n⚠ $\\emptyset \\subseteq A$ 是**空泛真**（vacuously true）：没有任何 $x \\in \\emptyset$ 需要检查。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ------------------------------------------------ 映射与基数 */
    {
      id: 'def.bijection',
      cluster: 'set.choice',
      type: 'definition',
      label: '单射 / 满射 / 双射',
      title: '单射 / 满射 / 双射（Injective / Surjective / Bijective）',
      regions: ['set-theory'],
      tags: ['定义', '函数'],
      statement: [
        '设 $f : A \\to B$。',
        '',
        '- $f$ **单射**（injective）：$f(a) = f(a\') \\implies a = a\'$，即不同输入给不同输出；',
        '- $f$ **满射**（surjective）：$\\forall b \\in B, \\exists a \\in A : f(a) = b$，即 $f(A) = B$；',
        '- $f$ **双射**（bijective）：既单又满。',
        '',
        '双射 $f : A \\to B$ 的**逆** $f^{-1} : B \\to A$ 也是双射（把 $f$ 看作关系时，逆关系就是 $f^{-1}$）。',
        '',
        '于是「存在双射 $A \\to B$」是集合之间的一种等价关系，用来定义**等势**。'
      ].join('\n'),
      notes: '⭐ 单射在这里最常见的用法是**反证**：Hartogs 定理断言「存在不能单射进 $X$ 的序数」，良序定理的证明里「$\\alpha \\hookrightarrow X$ 不成立」也是同一个句式。\n\n⚠ 「是单射/满射」必须相对**指定的 $B$** 说：同一个函数 $f : \\mathbb{R} \\to \\mathbb{R}$，$x \\mapsto x^2$ 既不单也不满；把陪域改成 $[0, \\infty)$ 就满了。',
      refs: ['Kunen, Set Theory, I.5']
    },
    {
      id: 'def.countable',
      cluster: 'set.choice',
      type: 'definition',
      label: '可数与不可数',
      title: '可数 / 至多可数（Countable）',
      regions: ['set-theory'],
      tags: ['定义', '基数', '可数'],
      statement: [
        '设 $\\mathbb{N} = \\{0, 1, 2, \\dots\\}$ 是自然数集。',
        '',
        '集合 $A$ **可数**，当且仅当存在双射 $A \\to \\mathbb{N}$（即能把 $A$ 排成一个无穷序列 $a_0, a_1, a_2, \\dots$，一个不漏、一个不重）。',
        '',
        '既有限又可数的情形合起来叫**至多可数**：$A$ 至多可数 $\\iff$ 存在单射 $A \\to \\mathbb{N}$。',
        '',
        '不是至多可数的集合叫**不可数**。'
      ].join('\n'),
      notes: '⭐ 这一条撑起了两大块内容：\n- **$\\sigma$-环 / $\\sigma$-代数 / 单调类**：可数并、可数交里的「可数」就是它；\n- **测度的可数可加**：$\\mu(\\bigcup_n E_n) = \\sum_n \\mu(E_n)$ 里的下标集要可数。\n\n基本事实：$\\mathbb{N} \\times \\mathbb{N}$ 可数；至多可多个可数集的并仍可数；$\\mathbb{R}$ 不可数（Cantor 对角线法）。\n\n⚠ 「可数」不是「数得完」：$\\mathbb{N}$ 自己就可数但数不完。',
      refs: ['Kunen, Set Theory, I.6']
    },

    /* -------------------------------------------------- 几乎处处 */
    {
      id: 'def.ae',
      cluster: 'analysis.measure',
      type: 'definition',
      label: '几乎处处',
      title: '几乎处处（Almost Everywhere, a.e.）',
      regions: ['analysis'],
      tags: ['定义', '零集'],
      statement: [
        '设 $(X, \\mathcal{M}, \\mu)$ 是测度空间。称一个关于点 $x$ 的命题 $P(x)$ **几乎处处成立**（记 a.e.），当且仅当',
        '',
        '$$\\exists E \\in \\mathcal{M}:\\ \\mu(E) = 0 \\quad \\text{且} \\quad \\forall x \\in X \\setminus E,\\ P(x)\\ \\text{成立}$$',
        '',
        '即：**使命题不成立的那些点构成一个零集**。',
        '',
        '常见的用法：$f = g$ a.e.（$\\{f \\ne g\\}$ 是零集）、$f_n \\to f$ a.e.（不收敛的点是零集）、$F\' = 0$ a.e.。'
      ].join('\n'),
      notes: '⭐ a.e. 是 Lebesgue 理论的**润滑剂**：$L^1$、$L^p$ 的元素其实是**函数的等价类**（a.e. 相等视为同一个），几乎所有收敛定理（MCT、Fatou、DCT 的 a.e. 版本、Egorov）都只要求 a.e. 收敛 —— 因为零集上的取值对积分没有贡献。\n\n⚠ 「a.e. 相等」与「处处相等」是不同的关系：$\\int |f| = 0 \\implies f = 0$ a.e.（而不是处处 0）。\n⚠ 零集的**子集**未必可测，除非测度空间完备 —— 这就是「完备化」要解决的问题。',
      refs: ['Rudin, Real and Complex Analysis, Ch. 1']
    }
  ],

  edges: [

    /* ------------------------------------------------ 集合运算的依赖 */
    {
      id: 'dep.subset-union-inter',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.union-inter',
      note: '两个运算都用 $\\subseteq$ 说事（$A \\cap B \\subseteq A \\subseteq A \\cup B$）。'
    },
    {
      id: 'dep.subset-diff',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.diff-complement',
      note: '$A \\setminus B \\subseteq A$；「含全集 $X$」也是子集关系。'
    },
    {
      id: 'dep.ext-empty',
      kind: 'definition',
      definition: 'def.empty',
      usedBy: 'thm.empty',
      note: '「空集存在」证明的就是这条定义里的那个集合确实存在（由分离公理），并且唯一（由外延公理）。'
    },
    {
      id: 'dep.empty-union',
      kind: 'definition',
      definition: 'def.empty',
      usedBy: 'def.union-inter',
      note: '$\\bigcap \\emptyset$ 要注意：它必须相对某个全集才有意义 —— 空集的出现方式常常是这种边角。'
    },

    /* ------------------------------------------------ 映射与可数 */
    {
      id: 'dep.function-bijection',
      kind: 'definition',
      definition: 'def.function',
      usedBy: 'def.bijection',
      note: '单射、满射、双射都是**函数**的性质。'
    },
    {
      id: 'dep.pair-bijection',
      kind: 'definition',
      definition: 'def.pair',
      usedBy: 'def.bijection',
      note: '判断单射时用的是「$f(a) = f(b) \\implies a = b$」，即在有序对层面比较。'
    },
    {
      id: 'dep.bijection-countable',
      kind: 'definition',
      definition: 'def.bijection',
      usedBy: 'def.countable',
      note: '可数就是「存在双射 $A \\to \\mathbb{N}$」；至多可数是「存在单射」。'
    },
    {
      id: 'dep.nat-countable',
      kind: 'definition',
      definition: 'thm.omega',
      usedBy: 'def.countable',
      note: '$\\mathbb{N}$ 由无穷公理给出（见「自然数集存在」），可数就是拿它当标尺去量别的集合。'
    },

    /* ------------------------------------------------ 几乎处处 */
    {
      id: 'dep.nullset-ae',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'def.ae',
      note: 'a.e. 的定义就是「例外集是**零集**」。'
    },
    {
      id: 'dep.measure-ae',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'def.ae',
      note: '$\\mu(E) = 0$ 里的 $\\mu$ 是测度；a.e. 是测度空间上的说法。'
    },
    {
      id: 'dep.interval-ls',
      kind: 'definition',
      definition: 'def.interval',
      usedBy: 'def.fundamental-class',
      note: '半开区间族 $\\{ (a, b] : a < b \\}$ 就是构造 Lebesgue–Stieltjes 测度时用的那个**基本类**。'
    },
    {
      id: 'dep.sup-integral-nonneg',
      kind: 'definition',
      definition: 'def.sup',
      usedBy: 'def.integral-nonneg',
      note: '非负函数的积分定义成 $\\sup \\{ \\int \\varphi \\}$ —— 取的是实数（或 $+\\infty$）的上确界。'
    },
    {
      id: 'dep.extended-measure',
      kind: 'definition',
      definition: 'def.extended-real',
      usedBy: 'def.measure',
      note: '测度的取值放在 $[0, +\\infty]$ 里，正是扩充实数。'
    },
    {
      id: 'dep.real-metric',
      kind: 'definition',
      definition: 'def.real',
      usedBy: 'def.metric-space',
      note: '距离取值 $d : X \\times X \\to [0, +\\infty) \\subseteq \\mathbb{R}$，用的是实数的序与绝对值。'
    },
    {
      id: 'dep.interval-bv',
      kind: 'definition',
      definition: 'def.interval',
      usedBy: 'def.ac-function',
      note: '绝对连续的定义里，「任意有限个两两不交的区间」说的就是区间。'
    },
    {
      id: 'dep.derivative-bv',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'def.bounded-variation',
      note: '全变差与 $F\'$ 都在讨论函数的**逐点**行为。'
    },
    {
      id: 'dep.derivative-monotone-thm',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'thm.monotone-differentiable',
      note: '「单调函数几乎处处可导」说的就是这条定义里的导数存在 a.e.。'
    },
    {
      id: 'dep.complex-integral-complex',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.integral-complex',
      note: '复值函数的积分就是拆成 $\\operatorname{Re} f$、$\\operatorname{Im} f$ 两个实值积分。'
    },
    {
      id: 'dep.complex-complex-measure',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.complex-measure',
      note: '复测度取值在 $\\mathbb{C}$ 里 —— 所以它自动有限。'
    },
    {
      id: 'dep.complex-lp',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.lp-norm',
      note: '$L^p$ 的元素取复值：$f : X \\to \\mathbb{C}$。'
    },
    {
      id: 'dep.continuous-continuous-measurable',
      kind: 'definition',
      definition: 'def.continuous',
      usedBy: 'cor.continuous-measurable',
      note: '「连续 $\\implies$ Borel 可测」要把连续的 $\\varepsilon$-$\\delta$ 定义翻译成开集的原像。'
    },
    {
      id: 'dep.real-lp',
      kind: 'definition',
      definition: 'def.real',
      usedBy: 'def.essential-sup',
      note: '本性上界是「$\\mu(\\{|f| > a\\}) = 0$ 的那些 $a \\ge 0$ 的下确界」——$a$ 是实数。'
    }
  ]
});
