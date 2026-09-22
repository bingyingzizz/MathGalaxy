/* ==========================================================================
   内容包 · 数系的构造：ℕ → ℤ → ℚ → ℝ
   --------------------------------------------------------------------------
   用户问：「你的实数 R 是不是没写构造？是不是该从 N 到 Z 到 Q 到 R 逐步弄出来？」

   确实没有：原来 ℝ 只有**公理刻画**（完备有序域），ℤ 与 ℚ 整个不在图里。
   这一包补上这条链。每一步都是**同一招**：

       手头已经有一类对象 → 想得到另一类 → 用等价关系把前者**粘**成等价类。

     ℕ：最小归纳集 ω（已经有节点「自然数集存在」，不重复录）
     ℤ = (ℕ × ℕ) / ~，其中 (a,b) ~ (c,d) ⟺ a + d = b + c      —— 补掉「减法不一定做得到」
     ℚ = (ℤ × (ℤ∖{0})) / ~，其中 (a,b) ~ (c,d) ⟺ ad = bc       —— 补掉「除法不一定做得到」
     ℝ = {有理 Cauchy 列} / {零列}                              —— 补掉「极限不一定存在」

   ⚠️ ℝ 这一步用的是**完备化**（Cauchy 列模去零列），不是戴德金分割 ——
      用户点名要这条路，因为它与「度量空间的完备化」是同一个构造（泛函分析会用到），
      将来两者之间要连一条**弱边（类比）**。等那条弱边加上时记住：
      **弱边不参与分层**（见 core/layers.js），只表示「思想相通」。

   落点：新星团 set.numbers（数系的构造）。ℝ 的公理刻画仍留在 analysis.real，
   由这一包的构造定理接上去（构造出来的东西满足那三组公理）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '数系的构造',
  nodes: [

    /* --------------------------------------------------- 通用工具：商集 */
    {
      id: 'def.quotient-set',
      cluster: 'set.choice',
      type: 'definition',
      label: '商集与等价类',
      title: '商集 / 等价类（Quotient Set）',
      regions: ['set-theory'],
      tags: ['定义', '等价类', '商集'],
      statement: [
        '设 $\\sim$ 是集合 $A$ 上的一个**等价关系**。对 $a \\in A$，称',
        '',
        '$$[a] := \\{ b \\in A : b \\sim a \\}$$',
        '',
        '为 $a$ 的**等价类**；称',
        '',
        '$$A / \\sim\\ := \\{ [a] : a \\in A \\}$$',
        '',
        '为 $A$ 关于 $\\sim$ 的**商集**。三条基本事实：',
        '',
        '- $a \\in [a]$；',
        '- $[a] = [b] \\iff a \\sim b$；',
        '- 不同的等价类**两两不交**，且全体之并恰为 $A$ —— 也就是说，等价关系把 $A$ **划分**成一块块。'
      ].join('\n'),
      notes: '⭐ 这是数学里「造新对象」最常用的手法：手头只有一类东西，却想得到另一类，就把前者按某个等价关系**粘**起来。本星图里至少四处用到：\n\n- $\\mathbb{Z} = (\\mathbb{N} \\times \\mathbb{N})/\\sim$、$\\mathbb{Q} = (\\mathbb{Z} \\times (\\mathbb{Z}\\setminus\\{0\\}))/\\sim$、$\\mathbb{R} = \\{$有理 Cauchy 列$\\}/\\sim$；\n- $L^1$、$L^p$ 的元素其实是**函数的等价类**（a.e. 相等视为同一个）；\n- RN 导数 $d\\nu/d\\mu$ 也是一个等价类，而不是单个函数。\n\n⚠ 等价类的**代表元不唯一**，所以凡是要在商集上定义的东西（运算、序、范数），都必须先证明「与代表元的选取无关」，也就是**良定义**。这是商构造最容易漏掉的一步。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ----------------------------------------------- 自然数上的归纳法 */
    {
      id: 'thm.induction',
      cluster: 'set.zfc',
      type: 'theorem',
      label: '归纳原理与递推定义',
      title: '归纳原理 / 递推定义（Induction & Recursion）',
      regions: ['set-theory'],
      tags: ['定理', '归纳', '递归'],
      statement: [
        '设 $\\omega$ 是最小归纳集（即 $\\mathbb{N}$）。',
        '',
        '**(i) 归纳原理**：若 $S \\subseteq \\omega$ 满足',
        '',
        '$$\\emptyset \\in S, \\qquad x \\in S \\implies x \\cup \\{x\\} \\in S$$',
        '',
        '则 $S = \\omega$。',
        '',
        '**(ii) 递推定义**：给定集合 $A$、元素 $a_0 \\in A$ 与函数 $F : A \\to A$，存在**唯一**的函数 $g : \\omega \\to A$ 使',
        '',
        '$$g(\\emptyset) = a_0, \\qquad g(x \\cup \\{x\\}) = F(g(x)) \\quad \\forall x \\in \\omega$$'
      ].join('\n'),
      notes: '⭐ **归纳原理管证明，递推定义管构造** —— 两者是一件事的两面，都来自「$\\omega$ 是最小归纳集」这一条。\n\n$\\mathbb{N}$ 上的加法、乘法、序，以及后面 $\\mathbb{Z}$、$\\mathbb{Q}$ 的运算，全都是用递推定义出来、再用归纳原理验证性质的。\n\n⚠ **归纳原理只对 $\\omega$ 成立**；换成一般的良序集要做**超限归纳 / 超限递归**。\n⚠ 递推定义要用「函数 $F$」而不是「一句话」，否则会掉进「用未定义的东西定义自己」的坑。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ------------------------------------------------------------ 整数 */
    {
      id: 'def.int',
      cluster: 'set.numbers',
      type: 'definition',
      label: '整数 ℤ',
      title: '整数 $\\mathbb{Z}$（由 $\\mathbb{N} \\times \\mathbb{N}$ 构造）',
      regions: ['set-theory'],
      tags: ['定义', '整数', '商集'],
      statement: [
        '在 $\\mathbb{N} \\times \\mathbb{N}$ 上定义',
        '',
        '$$(a, b) \\sim (c, d) :\\iff a + d = b + c$$',
        '',
        '（直观：$(a, b)$ 代表 $a - b$；这条等价关系说的正是「差相同」。）它确实是一个等价关系。令',
        '',
        '$$\\mathbb{Z} := (\\mathbb{N} \\times \\mathbb{N}) / \\sim$$',
        '',
        '元素记作 $[a, b]$（即 $a - b$）。$\\mathbb{Z}$ 上的**运算与序**（都要先验证与代表元无关）：',
        '',
        '$$[a, b] + [c, d] := [a + c,\\ b + d]$$',
        '$$[a, b] \\cdot [c, d] := [ac + bd,\\ ad + bc]$$',
        '$$[a, b] \\le [c, d] :\\iff a + d \\le b + c$$',
        '',
        '其中加法与序来自 $\\mathbb{N}$ 的加法与序，乘法的写法是照着 $(a - b)(c - d) = ac + bd - (ad + bc)$ 抄的。'
      ].join('\n'),
      notes: '⭐ 动机一句话：**$\\mathbb{N}$ 里减法学不通**（$3 - 5$ 不存在），但「$3 - 5$」这个**对**总有意义 —— 于是把「差」本身当成新对象。\n\n副产品：$\\mathbb{Z}$ 有加法零元 $[0, 0] = 0$ 与加法逆元 $-[a, b] = [b, a]$ —— 这正是 $\\mathbb{N}$ 缺的东西。\n\n⚠ $\\mathbb{Z}$ 里 $\\mathbb{N}$ 是通过 $a \\mapsto [a, 0]$ **嵌进去**的（单射且保持运算与序），所以写 $3 \\in \\mathbb{Z}$ 时用的是这个嵌入 —— 这一步不能省。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ---------------------------------------------------------- 有理数 */
    {
      id: 'def.rat',
      cluster: 'set.numbers',
      type: 'definition',
      label: '有理数 ℚ',
      title: '有理数 $\\mathbb{Q}$（由 $\\mathbb{Z} \\times (\\mathbb{Z}\\setminus\\{0\\})$ 构造）',
      regions: ['set-theory'],
      tags: ['定义', '有理数', '商集'],
      statement: [
        '在 $\\mathbb{Z} \\times (\\mathbb{Z} \\setminus \\{0\\})$ 上定义',
        '',
        '$$(a, b) \\sim (c, d) :\\iff ad = bc$$',
        '',
        '（直观：$(a, b)$ 代表 $a/b$；这条等价关系说的正是「分数值相同」。）令',
        '',
        '$$\\mathbb{Q} := (\\mathbb{Z} \\times (\\mathbb{Z} \\setminus \\{0\\})) / \\sim$$',
        '',
        '元素记作 $a/b$。运算与序：',
        '',
        '$$\\frac{a}{b} + \\frac{c}{d} := \\frac{ad + bc}{bd}, \\qquad \\frac{a}{b} \\cdot \\frac{c}{d} := \\frac{ac}{bd}, \\qquad \\frac{a}{b} \\le \\frac{c}{d} :\\iff ad \\le bc \\quad (b, d > 0)$$',
        '',
        '于是 $\\mathbb{Q}$ 是一个**有序域**：四则运算齐全，且与序相容。'
      ].join('\n'),
      notes: '⭐ 动机同上：**$\\mathbb{Z}$ 里除法学不通**（$1/2$ 不存在），但「分子分母的对」总有意义。\n\n⚠ 分母取自 $\\mathbb{Z} \\setminus \\{0\\}$ —— 「$0$ 不能作分母」在这里**不是一条约定，而是构造的一部分**：分母的集合里根本没有 $0$。\n⚠ 记号 $a/b$ 会让人以为「$a/b$ 是一个函数值」，其实它是**等价类**；这正好解释了为什么 $\\frac{1}{2} = \\frac{2}{4}$：它们是同一个等价类的两个代表元。\n\n⭐ **到此为止四则运算齐全了，但序还不完备**：$\\{q \\in \\mathbb{Q} : q^2 < 2\\}$ 有上界（比如 $2$）却在 $\\mathbb{Q}$ 里没有上确界。这正是 $\\mathbb{R}$ 要补的那一口气。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* -------------------------------------------- Cauchy 列与零列 */
    {
      id: 'def.cauchy-null',
      cluster: 'set.numbers',
      type: 'definition',
      label: 'Cauchy 列与零列',
      title: '有理 Cauchy 列 / 零列 / 等价（Cauchy & Null Sequences）',
      regions: ['set-theory', 'analysis'],
      tags: ['定义', 'Cauchy 列', '完备化'],
      statement: [
        '设 $(x_n)$ 是**有理数列**（即函数 $\\omega \\to \\mathbb{Q}$），$|x|$ 是 $\\mathbb{Q}$ 上的绝对值，$\\varepsilon$ 一律取**正有理数**（此时还不需要实数）。',
        '',
        '$(x_n)$ 是 **Cauchy 列**：',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall m, n \\ge N : |x_m - x_n| < \\varepsilon$$',
        '',
        '$(x_n)$ 是**零列**：',
        '',
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n \\ge N : |x_n| < \\varepsilon$$',
        '',
        '两个 Cauchy 列**等价**：',
        '',
        '$$(x_n) \\sim (y_n) :\\iff (x_n - y_n) \\text{ 是零列}$$',
        '',
        '（$\\sim$ 是等价关系：自反、对称显然，传递由三角不等式。）'
      ].join('\n'),
      notes: '⭐ **为什么要「模去零列」**：同一个实数有很多种逼近方式 —— 比如 $(1, 1, 1, \\dots)$ 与 $(1.1,\\ 1.01,\\ 1.001,\\ \\dots)$ 都该代表 $1$，而它们的差是零列。等价类把「同一个数的不同逼近」粘成一件事。\n\n⚠ 这里**只用 $\\mathbb{Q}$ 的序与绝对值**（$\\varepsilon$ 取正有理数、绝对值是 $\\mathbb{Q}$ 上的），所以**不构成循环**：这一步在造出 $\\mathbb{R}$ 之前完全说得通。度量空间里那套「距离、Cauchy 列、完备」的语言，正是从这里的做法抽出来的。\n\n三条后面要用的事实：\n- Cauchy 列**有界**；\n- Cauchy 列的**和、差、积仍是 Cauchy 列**；\n- **不是零列的 Cauchy 列，从某一项起 $|x_n| \\ge \\delta$**（某个正有理数 $\\delta$）—— 于是它的倒数（去掉前面有限项）也是 Cauchy 列。第三条是「乘法有逆元」的全部依据。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    {
      id: 'thm.real-completion',
      cluster: 'set.numbers',
      type: 'theorem',
      label: '由 Cauchy 列构造 ℝ',
      title: 'ℝ := 有理 Cauchy 列 / 零列，是一个完备有序域',
      regions: ['set-theory', 'analysis'],
      tags: ['定理', '实数', '完备化', '完备性'],
      statement: [
        '在 $\\{$有理 Cauchy 列$\\}$ 上取上述等价关系 $\\sim$，令',
        '',
        '$$\\mathbb{R} := \\{ \\text{有理 Cauchy 列} \\} / \\sim$$',
        '',
        '元素记作 $[x_n]$。运算**逐项**定义：',
        '',
        '$$[x_n] + [y_n] := [x_n + y_n], \\qquad [x_n] \\cdot [y_n] := [x_n y_n]$$',
        '',
        '序这样定义：称 $[x_n] > 0$，当且仅当存在**正有理数** $q$ 与 $N$，使 $n \\ge N$ 时恒有 $x_n \\ge q$；一般的序由 $[y_n] \\ge [x_n] :\\iff [y_n - x_n] \\ge 0$ 给出。',
        '',
        '则 $(\\mathbb{R}, +, \\cdot, \\le)$ 是**完备有序域**：',
        '',
        '**(i)** 是一个域（$0 := [$零列$]$，$1 := [(1,1,1,\\dots)]$）；',
        '**(ii)** 序与运算相容；',
        '**(iii)** 每个**非空有上界**的子集都有**上确界**。',
        '',
        '并且 $\\mathbb{Q}$ 通过**常数列** $x \\mapsto [(x, x, x, \\dots)]$ 保序、保运算地嵌入 $\\mathbb{R}$，像在 $\\mathbb{R}$ 中稠密。'
      ].join('\n'),
      notes: '⭐ 这条路的**一般化就是「度量空间的完备化」**：把 $\\mathbb{Q}$ 换成任意度量空间 $(X, d)$，把 $|x_m - x_n|$ 换成 $d(x_m, x_n)$，照样「取 Cauchy 列、模去零列」—— 做法一模一样，证明的每一步都能照搬。反过来说，$\\mathbb{R}$ 的构造就是完备化这个构造的**原型**。\n\n(iii) 的走法分两步（见边的证明）：先证**「$\\mathbb{R}$ 里每个 Cauchy 列都收敛」**（用对角线法从代表元里抽出一个有理 Cauchy 列），再由 Cauchy 完备推出确界原理（二分法造递增列与递减上界列，夹逼到同一个极限）。\n\n⭐ 与另一条路的对比：戴德金分割只用一个序关系、完全不用序列，代价是要先讨论 $\\mathbb{Q}$ 的任意子集；完备化这条路只用到**序列**，代价是商集与等价类要多花笔墨。两条路造出来的 $\\mathbb{R}$ 同构，结论一样。\n\n⚠ 常见误解：以为「$\\mathbb{R}$ 是 Cauchy 列的集合」。真正取的是**等价类** —— 否则不同的逼近方式会变成不同的「实数」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3', 'Folland, Real Analysis, §1.5']
    },

    /* ------------------------------------------ 完备有序域的两条基本性质 */
    {
      id: 'lem.archimedean',
      cluster: 'set.numbers',
      type: 'lemma',
      label: '阿基米德性质',
      title: '阿基米德性质与 $\\mathbb{Q}$ 的稠密性',
      regions: ['set-theory', 'analysis'],
      tags: ['引理', '阿基米德', '稠密', '实数'],
      statement: [
        '设 $K$ 是一个**完备有序域**（比如 $\\mathbb{R}$）。则：',
        '',
        '**(i) 阿基米德性质**：自然数在 $K$ 中没有上界 ——',
        '',
        '$$\\forall x \\in K,\\ \\exists n \\in \\mathbb{N} : n > x$$',
        '',
        '**(ii) $\\mathbb{Q}$ 在 $K$ 中稠密**：任意两个元素之间都夹着一个有理数 ——',
        '',
        '$$\\forall x, y \\in K,\\ x < y \\implies \\exists q \\in \\mathbb{Q} : x < q < y$$',
        '',
        '（这里的 $\\mathbb{Q}$ 指 $\\mathbb{Q}$ 在 $K$ 中的嵌入像：$1$ 在 $K$ 中生成 $\\mathbb{Z}$，再取分式得到 $\\mathbb{Q}$。）'
      ].join('\n'),
      notes: '⭐ 两条都是**完备性（确界原理）的推论**，不需要任何别的假设。\n\n它们的用处很大：\n- 证明**完备有序域的唯一性**（$\\mathbb{R}$ 的良定义性）时要靠 (ii) —— 有理数在两边都稠密，才能用「有理数的像」去逼近任意元；\n- 分析里所有的「取 $n$ 足够大」「取 $\\varepsilon = 1/n$」实质上都是在用 (i)；\n- (ii) 也是「用有理数逼近实数」的许可证：任何实数都是有理数的上确界。\n\n⚠ 完备性 $\\implies$ 阿基米德性，但**反过来不成立**：$\\mathbb{Q}$ 是阿基米德的，然而不完备。\n⚠ (ii) 中夹着的那个 $q$ 必须**严格**在两个数之间 —— 这正是「稠密」比「有任意接近的有理数」强的地方。',
      refs: ['Tao, Analysis I, Ch. 5（实数的构造）', 'Rudin, Principles of Mathematical Analysis, Ch. 1']
    },
    {
      id: 'thm.real-unique',
      cluster: 'set.numbers',
      type: 'theorem',
      label: '完备有序域的唯一性',
      title: '任何两个完备有序域同构（$\\mathbb{R}$ 的良定义性）',
      regions: ['set-theory', 'analysis'],
      tags: ['定理', '实数', '唯一性', '同构'],
      statement: [
        '设 $K$、$K\'$ 都是**完备有序域**。则存在**唯一**的双射 $f : K \\to K\'$，它同时保持加法、乘法与序：',
        '',
        '$$f(x + y) = f(x) + f(y), \\qquad f(xy) = f(x)\\,f(y), \\qquad x \\le y \\iff f(x) \\le f(y)$$',
        '',
        '也就是说：**在同构意义下只有一个完备有序域** —— 记作 $\\mathbb{R}$。'
      ].join('\n'),
      notes: '⭐ 这条定理才是「$\\mathbb{R}$ 是良定义的」这句话的**内容**：\n\n- **存在性**由「由 Cauchy 列构造 $\\mathbb{R}$」给出（造出一个具体模型）；\n- **唯一性**就是这一条（任何两个模型都同构）——所以以后说「实数系」时不必指明用的是哪个构造：戴德金分割造出来的那个、Cauchy 列造出来的那个、以及任何别的模型，全都一样。\n\n证明三步（见边）：把 $1$ 的像固定 $\\implies$ $\\mathbb{Q}$ 的嵌入像被唯一确定；$\\implies$ 用**上确界**把映射推广到整个 $K$（这才是要用完备性的地方）；$\\implies$ 唯一性靠「$\\mathbb{Q}$ 在 $K$ 中稠密」把两个同构逼成同一个。\n\n⚠ 少任何一条公理，唯一性就没了：$\\mathbb{Q}$ 不是唯一的有序域（$\\mathbb{Q}(\\sqrt{2})$ 是另一个），$\\mathbb{Q}$ 与 $\\mathbb{Q}(\\sqrt 2)$ 作为有序域不同构，两者都满足「有序域」的全部公理。',
      refs: ['Tao, Analysis I, Ch. 5（实数的构造）']
    },
    {
      id: 'thm.real-uncountable',
      cluster: 'set.numbers',
      type: 'theorem',
      label: 'ℝ 不可数',
      title: '实数集是稠密而不可数的：$|\\mathbb{R}| = 2^{\\aleph_0}$',
      regions: ['analysis', 'set-theory'],
      tags: ['定理', '实数', '不可数', '基数'],
      statement: [
        '**实数集 $\\mathbb{R}$ 不可数**：不存在从 $\\mathbb{N}$ 到 $\\mathbb{R}$ 的满射，即 $\\mathbb{R}$ 不能排成一个序列。',
        '',
        '更强的结论：',
        '',
        '$$|\\mathbb{R}| = |\\mathcal{P}(\\mathbb{N})| = 2^{\\aleph_0} > \\aleph_0$$'
      ].join('\n'),
      notes: '⭐ 证明走**闭区间套 + 对角线**（见边）：假设 $\\mathbb{R}$ 可以排成 $x_1, x_2, \\dots$，就用二分法造一串套起来的闭区间，把 $x_n$ 逐个排除出去，再用**完备性**取出它们唯一的公共点 —— 它不等于任何一个 $x_n$。\n\n⚠ 整段证明**只用到 $\\mathbb{R}$ 的完备性**（确界原理），不需要基数理论；$|\\mathbb{R}| = 2^{\\aleph_0}$ 那一半是拿二进制展开与 $\\mathcal{P}(\\mathbb{N})$ 配对，再引用 Cantor 定理。\n\n**这条定理最反直觉的地方**：$\\mathbb{Q}$ 与 $\\mathbb{R}$ 都稠密、都可以逼近彼此，但 $\\mathbb{Q}$ 可数（排得成一个序列）、$\\mathbb{R}$ 不可数。**「稠密」与「一样多」是两回事** —— 这也正是分析必须做实数、不能只做有理数的根本原因。',
      refs: ['Tao, Analysis I, Ch. 8（可数性）', 'Rudin, Principles of Mathematical Analysis, Ch. 2']
    }
  ],

  edges: [

    /* ---------------------------------------------------------- 依赖 */
    {
      id: 'dep.rel-quotient',
      kind: 'definition',
      definition: 'def.rel',
      usedBy: 'def.quotient-set',
      note: '商集是拿**等价关系**做出来的 —— 先有关系，才谈得上等价类。'
    },
    {
      id: 'dep.omega-induction',
      kind: 'definition',
      definition: 'thm.omega',
      usedBy: 'thm.induction',
      note: '归纳原理与递推定义都来自「$\\omega$ 是**最小归纳集**」这一条。'
    },
    {
      id: 'dep.omega-int',
      kind: 'definition',
      definition: 'thm.omega',
      usedBy: 'def.int',
      note: '$\\mathbb{Z}$ 建在 $\\mathbb{N} \\times \\mathbb{N}$ 上，运算与序都来自 $\\mathbb{N}$。'
    },
    {
      id: 'dep.quotient-int',
      kind: 'definition',
      definition: 'def.quotient-set',
      usedBy: 'def.int',
      note: '$\\mathbb{Z} = (\\mathbb{N} \\times \\mathbb{N})/\\sim$ —— 一个**商集**。'
    },
    {
      id: 'dep.induction-int',
      kind: 'definition',
      definition: 'thm.induction',
      usedBy: 'def.int',
      note: '加法、乘法、序的**良定义**都要用归纳/递推来验。'
    },
    {
      id: 'dep.int-rat',
      kind: 'definition',
      definition: 'def.int',
      usedBy: 'def.rat',
      note: '$\\mathbb{Q}$ 建在 $\\mathbb{Z} \\times (\\mathbb{Z}\\setminus\\{0\\})$ 上。'
    },
    {
      id: 'dep.quotient-rat',
      kind: 'definition',
      definition: 'def.quotient-set',
      usedBy: 'def.rat',
      note: '$\\mathbb{Q} = (\\mathbb{Z} \\times (\\mathbb{Z}\\setminus\\{0\\}))/\\sim$ —— 同样是**商集**。'
    },

    /* -------------------------------------------- 完备化这条路的依赖 */
    {
      id: 'dep.rat-cauchy-null',
      kind: 'definition',
      definition: 'def.rat',
      usedBy: 'def.cauchy-null',
      note: 'Cauchy 列、零列都是**有理数列**：$\\varepsilon$ 取正有理数，绝对值也是 $\\mathbb{Q}$ 上的 —— 用 $\\mathbb{Q}$ 的序与四则运算就够，不必先有 $\\mathbb{R}$。'
    },
    {
      id: 'dep.function-cauchy-null',
      kind: 'definition',
      definition: 'def.function',
      usedBy: 'def.cauchy-null',
      note: '「数列」就是函数 $\\omega \\to \\mathbb{Q}$；下标、子列都是函数语言。'
    },
    {
      id: 'dep.quotient-cauchy-null',
      kind: 'definition',
      definition: 'def.quotient-set',
      usedBy: 'def.cauchy-null',
      note: '「等价」在这里就是商集意义上的**等价关系**：把同一个实数的不同逼近方式粘成一类。'
    },
    {
      id: 'dep.cauchy-null-completion',
      kind: 'definition',
      definition: 'def.cauchy-null',
      usedBy: 'thm.real-completion',
      note: '定理取的就是「Cauchy 列模去零列」这些等价类。'
    },
    {
      id: 'dep.completion-real',
      kind: 'definition',
      definition: 'thm.real-completion',
      usedBy: 'def.real',
      note: '⭐ $\\mathbb{R}$ 的**公理刻画**不是凭空的：上面那条构造给出一个满足这三组公理的模型。反过来，任何两个完备有序域都同构（同构唯一性），所以「$\\mathbb{R}$」是良定义的。'
    },
    {
      id: 'dep.quotient-integrable',
      kind: 'definition',
      definition: 'def.quotient-set',
      usedBy: 'def.integrable',
      note: '$L^1$ 的元素不是函数本身，而是**函数在 a.e. 相等下的等价类** —— 后面 $L^p$、RN 导数用的是同一个手法。'
    },

    /* ------------------------------------- ℝ 这个节点挂上来的三条（性质/唯一性/大小） */
    {
      id: 'dep.rat-archimedean',
      kind: 'definition',
      definition: 'def.rat',
      usedBy: 'lem.archimedean',
      note: '「$\\mathbb{Q}$ 在 $K$ 中稠密」里的 $\\mathbb{Q}$ 就是有理数集在 $K$ 中的嵌入像。'
    },
    {
      id: 'dep.real-unique',
      kind: 'definition',
      definition: 'def.real',
      usedBy: 'thm.real-unique',
      note: '唯一性定理的陈述里说的「完备有序域」就是这条定义的三组公理。（它回答了「$\\mathbb{R}$ 这个记号良不良定义」：存在性由构造给出，唯一性由这条定理给出。）'
    },
    {
      id: 'dep.countable-uncountable',
      kind: 'definition',
      definition: 'def.countable',
      usedBy: 'thm.real-uncountable',
      note: '定理说的就是「$\\mathbb{R}$ **不可数**」。'
    },
    {
      id: 'dep.cardinal-uncountable',
      kind: 'definition',
      definition: 'def.cardinal',
      usedBy: 'thm.real-uncountable',
      note: '结论写成基数就是 $|\\mathbb{R}| = 2^{\\aleph_0} > \\aleph_0$。'
    },
    {
      id: 'dep.cantor-uncountable',
      kind: 'definition',
      definition: 'thm.cantor',
      usedBy: 'thm.real-uncountable',
      note: '后半句 $2^{\\aleph_0} > \\aleph_0$ 用的就是 Cantor 定理（$|A| < |\\mathcal{P}(A)|$）。'
    },

    /* -------------------------------------------------- 带证明的推出 */
    {
      id: 'imp.archimedean',
      kind: 'implication',
      sources: ['def.real'],
      target: 'lem.archimedean',
      title: '完备性 ⟹ 阿基米德性质 + ℚ 稠密',
      proof: [
        '设 $K$ 是完备有序域（把 $\\mathbb{N}$、$\\mathbb{Z}$、$\\mathbb{Q}$ 按 $1$ 生成的子域嵌进去看）。',
        '',
        '**(i) 自然数无上界。** 反设 $\\mathbb{N}$ 在 $K$ 中有上界。由**完备性**，$s := \\sup \\mathbb{N}$ 存在。$s - 1 < s$，故 $s - 1$ 不是上界，于是存在 $n \\in \\mathbb{N}$ 使 $n > s - 1$。但那样 $n + 1 > s$，而 $n + 1 \\in \\mathbb{N}$ —— 与 $s$ 是上界矛盾。故',
        '',
        '$$\\forall x \\in K, \\exists n \\in \\mathbb{N}: n > x$$',
        '',
        '（顺带一句：若 $x > 0$，把 $n$ 换成 $n + 1$ 还能保证 $n \\ge 1$、$1/n < x$。）',
        '',
        '**(ii) $\\mathbb{Q}$ 稠密。** 设 $x < y$，则 $y - x > 0$。由 (i)（取 $x$ 换成 $1/(y-x)$ 的用法）可取 $n \\in \\mathbb{N}$，$n \\ge 1$，使',
        '',
        '$$n (y - x) > 1, \\qquad \\text{即}\\quad \\frac{1}{n} < y - x$$',
        '',
        '再对实数 $nx$ 用一次 (i) 的整数版本：存在 $m \\in \\mathbb{Z}$ 使',
        '',
        '$$m \\le nx < m + 1$$',
        '',
        '（「整数版本」：先用 (i) 取 $k > nx$，再从 $\\{0, 1, \\dots, k\\}$ 中取最小的使 $\\ge nx$ 的那个。）令 $q := (m+1)/n \\in \\mathbb{Q}$。则',
        '',
        '- $q > x$：由 $nx < m + 1$ 两边除以 $n > 0$；',
        '- $q < y$：由 $q = \\frac{m+1}{n} \\le \\frac{nx + 1}{n} = x + \\frac{1}{n} < x + (y - x) = y$。',
        '',
        '故 $x < q < y$，$\\mathbb{Q}$ 在 $K$ 中稠密。$\\blacksquare$',
        '',
        '> ⭐ 注意 (i) 的证明只用了「$\\mathbb{N}$ 的每个元都有后继」与「上确界存在」这两件事 —— 这就是为什么**完备性蕴含阿基米德性**。'
      ].join('\n')
    },
    {
      id: 'imp.real-unique',
      kind: 'implication',
      sources: ['lem.archimedean'],
      target: 'thm.real-unique',
      title: 'ℚ 稠密 ⟹ 完备有序域在同构意义下唯一',
      proof: [
        '设 $K$、$K\'$ 是完备有序域。分三步造出唯一的同构 $f : K \\to K\'$。',
        '',
        '**① $\\mathbb{Q}$ 的部分被唯一确定。** 任何保 $1$ 的域同态都把 $\\mathbb{Z}$ 送到 $\\mathbb{Z}\'$：$n \\mapsto n\'$（加法与乘法都由 $1$ 递推地定出来），再取分式得 $\\mathbb{Q} \\to \\mathbb{Q}\'$，记作 $q \\mapsto q\'$。它保序（$q < r \\implies r - q > 0 \\implies (r-q)\' > 0 \\implies q\' < r\'$）。这一步没有选择的余地。',
        '',
        '**② 用上确界把 $f$ 推广出去。** 对 $x \\in K$ 定义',
        '',
        '$$f(x) := \\sup\\{\\, q\' : q \\in \\mathbb{Q},\\ q < x \\,\\} \\in K\'$$',
        '',
        '这个上确界存在：集合非空（(i) 阿基米德性给出一个 $q < x$）且有上界（取 $r > x$，则所有 $q < x < r$ 满足 $q\' < r\'$）。于是 $f$ 是**保序**的：',
        '',
        '- $x \\le y \\implies f(x) \\le f(y)$：$\\{q : q<x\\} \\subseteq \\{q : q<y\\}$；',
        '- $x < y \\implies f(x) < f(y)$：由 $\\mathbb{Q}$ 稠密取 $q, r$ 使 $x < q < r < y$，则 $f(x) \\le q\' < r\' \\le f(y)$。',
        '',
        '**保运算**：以加法为例，若 $p < x$、$q < y$，则 $p + q < x + y$，故 $f(x) + f(y) \\le f(x+y)$；反向用稠密性：任取 $s < x + y$，取有理数 $u < x$ 使 $s - u < y$，则 $s < u + (s - u) < x + y$ 且 $s\' \\le f(x) + f(y)$，对一切 $s < x+y$ 取上确界得 $f(x+y) \\le f(x) + f(y)$。两边相等。乘法同理（先把正元夹在有理数之间，再用符号规则）。',
        '',
        '**满射**：给定 $y\' \\in K\'$，令 $x := \\sup\\{q \\in \\mathbb{Q} : q\' < y\'\\}$（同样由阿基米德性与完备性存在）。任取有理数 $p < x < r$，则 $p\' \\le y\' \\le r\'$；由 $\\mathbb{Q}$ 稠密取 $p \\nearrow x$、$r \\searrow x$ 代入，得 $f(x) = y\'$。',
        '',
        '**③ 唯一性。** 设 $g : K \\to K\'$ 也是这样的同构。由 ① 的「没有选择余地」，$g$ 与 $f$ 在 $\\mathbb{Q}$ 上一致。任取 $x \\in K$，由 $\\mathbb{Q}$ 在 $K$ 中**稠密**，$x = \\sup\\{ q \\in \\mathbb{Q} : q < x \\}$；又 $g$ 保序且把上确界送到上确界（保序双射 + 稠密性），故',
        '',
        '$$g(x) = g\\big(\\sup\\{q : q < x\\}\\big) = \\sup\\{g(q) : q < x\\} = \\sup\\{q\' : q < x\\} = f(x)$$',
        '',
        '所以 $f = g$：**同构存在且唯一**。$\\blacksquare$',
        '',
        '> ⭐ 三步里每一步都在用前面的准备：① 只用到「$1$ 生成 $\\mathbb{Q}$」；② 才真正用**完备性**（两次取上确界）；③ 用的是**$\\mathbb{Q}$ 稠密**。少任何一条，唯一性就不成立。'
      ].join('\n')
    },
    {
      id: 'imp.real-uncountable',
      kind: 'implication',
      sources: ['def.real'],
      target: 'thm.real-uncountable',
      title: '完备性 ⟹ ℝ 不可数（闭区间套 + 对角线）',
      proof: [
        '反设 $\\mathbb{R} = \\{x_1, x_2, x_3, \\dots\\}$ 可以排成一个序列。下面造一个不属于这个序列的实数。',
        '',
        '**① 二分法造出一串闭区间。** 取 $I_0 := [0, 1]$。已知 $I_{n-1} = [a_{n-1}, b_{n-1}]$ 后，令 $m_n := (a_{n-1} + b_{n-1})/2$，取',
        '',
        '$$I_n := \\begin{cases} [a_{n-1}, m_n], & x_n > m_n \\\\ [m_n, b_{n-1}], & x_n \\le m_n \\end{cases}$$',
        '',
        '于是 $x_n \\notin I_n$，且 $I_0 \\supseteq I_1 \\supseteq I_2 \\supseteq \\cdots$，长度 $b_n - a_n = 2^{-n} \\to 0$。',
        '',
        '**② 完备性给出公共点。** 令 $A := \\{a_n\\}$。$A$ 非空（$a_0 = 0$）且有上界（$1$ 就是上界），故由**确界原理** $a := \\sup A$ 存在。',
        '',
        '**$a \\in I_n$ 对每个 $n$ 成立**：一方面 $a \\ge a_n$（上界）；另一方面对 $k \\ge n$ 有 $a_k \\le b_k \\le b_n$，故 $b_n$ 是 $A$ 的上界，于是 $a \\le b_n$。',
        '',
        '**③ 矛盾。** 由 ① 知 $x_n \\notin I_n$，由 ② 知 $a \\in I_n$，所以 $a \\ne x_n$ 对**一切** $n$ 成立 —— 但 $a \\in \\mathbb{R} = \\{x_1, x_2, \\dots\\}$，与序列穷尽了 $\\mathbb{R}$ 矛盾。故 $\\mathbb{R}$ 不可数。$\\blacksquare$',
        '',
        '**④ 基数版本。** 把实数写成二进制小数（约定不用最后全 1 的写法以避开歧义）得到 $\\mathbb{R} \\hookrightarrow \\mathcal{P}(\\mathbb{N})$；反过来 $\\mathcal{P}(\\mathbb{N}) \\to \\mathbb{R}$ 用三进制展开即可，两边都有单射，由 Schröder–Bernstein 得 $|\\mathbb{R}| = |\\mathcal{P}(\\mathbb{N})| = 2^{\\aleph_0}$。再由 **Cantor 定理** $|\\mathcal{P}(\\mathbb{N})| > |\\mathbb{N}| = \\aleph_0$，即',
        '',
        '$$|\\mathbb{R}| = 2^{\\aleph_0} > \\aleph_0$$'
      ].join('\n')
    },
    {
      id: 'imp.real-completion',
      kind: 'implication',
      sources: ['def.cauchy-null'],
      target: 'thm.real-completion',
      title: 'Cauchy 列模去零列 ⟹ 完备有序域',
      proof: [
        '记 $\\mathcal{C}$ 为有理 Cauchy 列的全体。下面把 $\\mathbb{R} := \\mathcal{C}/\\sim$ 逐条查一遍。',
        '',
        '**① 运算良定义。** 设 $x \\sim x\'$、$y \\sim y\'$（即 $x_n - x\'_n$、$y_n - y\'_n$ 都是零列）。',
        '',
        '加法：$|(x_n + y_n) - (x\'_n + y\'_n)| \\le |x_n - x\'_n| + |y_n - y\'_n| \\to 0$。',
        '',
        '乘法：$x_n y_n - x\'_n y\'_n = x_n (y_n - y\'_n) + y\'_n (x_n - x\'_n)$，而 Cauchy 列**有界**（设 $|x_n| \\le M$、$|y\'_n| \\le M\'$），故两项各自 $\\to 0$。',
        '',
        '**② 域公理。** 结合、交换、分配都是逐项验证后取等价类（$\\mathbb{Q}$ 满足，$\\mathcal{C}$ 对 $+$、$\\cdot$ 封闭）。零元 $0 := [$零列$]$、一 $1 := [(1,1,1,\\dots)]$。',
        '',
        '**乘法逆元**是唯一需要想法的地方：设 $x$ 不是零列。因 $x$ 是 Cauchy 列，「不是零列」意味着',
        '',
        '$$\\exists \\varepsilon > 0: \\forall N, \\exists n \\ge N,\\ |x_n| \\ge \\varepsilon$$',
        '',
        '取这样的 $\\varepsilon$，并用 Cauchy 性取 $N_0$ 使 $m, n \\ge N_0$ 时 $|x_m - x_n| < \\varepsilon/2$；再取 $n_0 \\ge N_0$ 使 $|x_{n_0}| \\ge \\varepsilon$。则对一切 $n \\ge N_0$：',
        '',
        '$$|x_n| \\ge |x_{n_0}| - |x_n - x_{n_0}| > \\varepsilon - \\varepsilon/2 = \\varepsilon/2$$',
        '',
        '于是定义 $y_n := 0$（$n < N_0$）、$y_n := 1/x_n$（$n \\ge N_0$）。$y$ 是 Cauchy 列，因为',
        '',
        '$$|y_m - y_n| = \\frac{|x_m - x_n|}{|x_m|\\,|x_n|} \\le \\frac{4}{\\varepsilon^2}\\,|x_m - x_n|$$',
        '',
        '而 $[x_n y_n] = [(1,1,1,\\dots)] = 1$。故每个非零元可逆。',
        '',
        '**③ 序良定义 + 全序。** $(y_n - x_n)$ 换成等价的代表元后仍是零列的平移，故「$> 0$」的定义与代表元无关。三种情形恰有一种成立：',
        '',
        '- $x$ 是零列 $\\implies [x] = 0$；',
        '- 否！则由 ② 的估计，从某项起 $|x_n| \\ge \\delta$；再用 Cauchy 性（取 $\\varepsilon = \\delta$）知符号最终恒定：若某两项异号则 $|x_m - x_n| \\ge 2\\delta$，矛盾。于是要么最终 $x_n \\ge \\delta$（正），要么最终 $x_n \\le -\\delta$（负）。',
        '',
        '序与运算的相容性（$\\alpha \\le \\beta \\implies \\alpha + \\gamma \\le \\beta + \\gamma$；$\\alpha \\ge 0, \\beta \\ge 0 \\implies \\alpha\\beta \\ge 0$）都逐项验证。',
        '',
        '**④ 嵌入与稠密。** $x \\mapsto [(x,x,x,\\dots)]$ 是保序、保运算的单射。稠密：若 $\\alpha < \\beta$，取代表元 $x \\in \\alpha$、$y \\in \\beta$ 与正有理数 $q$ 使最终 $x_n + q \\le y_n$，则由 $\\mathbb{Q}$ 的稠密性可取有理数 $r$ 夹在中间，常数列 $r$ 满足 $\\alpha < [r] < \\beta$。',
        '',
        '**⑤ $\\mathbb{R}$ 完备（Cauchy 完备）。** 设 $(\\alpha_k)$ 是 $\\mathbb{R}$ 中的 Cauchy 列，$x^{(k)} \\in \\alpha_k$ 是代表元。对每个 $k$，由 $(x^{(k)}_n)_n$ 的 Cauchy 性取 $N_k$，令',
        '',
        '$$y_k := x^{(k)}_{N_k}$$',
        '',
        '（对角抽取。）断言 $(y_k)$ 是有理 Cauchy 列：给定 $\\varepsilon > 0$，由 $(\\alpha_k)$ 的 Cauchy 性取 $K$，使 $k, j \\ge K$ 时 $|\\alpha_k - \\alpha_j| < \\varepsilon/3$，即',
        '',
        '$$\\exists N, \\forall n \\ge N : |x^{(k)}_n - x^{(j)}_n| < \\varepsilon/3$$',
        '',
        '再取 $K\' \\ge K$ 使 $k \\ge K\'$ 时 $1/k < \\varepsilon/3$，并对 $k, j \\ge K\'$ 取 $n \\ge \\max(N_k, N_j, N)$：',
        '',
        '$$|y_k - y_j| \\le |y_k - x^{(k)}_n| + |x^{(k)}_n - x^{(j)}_n| + |x^{(j)}_n - y_j| < \\tfrac{\\varepsilon}{3} + \\tfrac{\\varepsilon}{3} + \\tfrac{\\varepsilon}{3} = \\varepsilon$$',
        '',
        '于是 $\\alpha := [y_k] \\in \\mathbb{R}$。同一组估计给出 $|\\alpha_k - \\alpha| \\le 2\\varepsilon/3$（取 $j$ 充分大），故 $\\alpha_k \\to \\alpha$。**每个 Cauchy 列在 $\\mathbb{R}$ 中收敛。**',
        '',
        '**⑥ 由 Cauchy 完备推出确界原理。** 设 $S \\subseteq \\mathbb{R}$ 非空、有上界 $\\beta_0$，取 $\\alpha_0 \\in S$。归纳地造两个数列：已知 $\\alpha_{n-1} \\in S$ 与上界 $\\beta_{n-1}$，取中点 $m_n := (\\alpha_{n-1} + \\beta_{n-1})/2$：',
        '',
        '- 若 $m_n$ 是 $S$ 的上界，则置 $\\beta_n := m_n$、$\\alpha_n := \\alpha_{n-1}$；',
        '- 否则有 $s \\in S$ 使 $s > m_n$，置 $\\alpha_n := s$、$\\beta_n := \\beta_{n-1}$。',
        '',
        '于是 $(\\alpha_n)$ 递增、$(\\beta_n)$ 递减，且',
        '',
        '$$\\beta_n - \\alpha_n = \\frac{\\beta_0 - \\alpha_0}{2^n} \\xrightarrow{\\ n \\to \\infty\\ } 0$$',
        '',
        '两个列都是 Cauchy 列（单调 + 步长趋于 $0$），由 ⑤ 收敛到同一个 $\\alpha \\in \\mathbb{R}$。',
        '',
        '**$\\alpha$ 是上界**：若不然，存在 $s \\in S$ 使 $s > \\alpha$。取 $n$ 充分大使 $\\beta_n - \\alpha_n < s - \\alpha$；由 $\\alpha_n \\to \\alpha$ 又有 $\\alpha \\le \\beta_n$ 与 $\\alpha_n \\le \\alpha$，于是 $\\alpha_n + (s - \\alpha) > \\beta_n$，而 $\\alpha_n \\in S$ 且 $s \\in S$ 都是 $\\beta_n$ 下面的元素 —— 与「$\\beta_n$ 是上界」矛盾。',
        '',
        '**$\\alpha$ 是最小上界**：任何上界 $\\gamma$ 都满足 $\\gamma \\ge \\alpha_n$（$\\alpha_n \\in S$），取极限得 $\\gamma \\ge \\alpha$。',
        '',
        '故 $\\alpha = \\sup S$ 存在，确界原理成立。$\\blacksquare$',
        '',
        '> ⭐ 注意 ⑤ 与 ⑥ 的位置：**先有「Cauchy 列收敛」，才有确界原理**。这与戴德金分割那条路的顺序正好相反（那里完备性是「并」的直接后果），两条路殊途同归。'
      ].join('\n')
    }
  ]
});
