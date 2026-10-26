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
      cluster: 'set.rel',
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
      cluster: 'set.numbers',
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

    /* ------------------------------------------- 自然数上的加法与乘法 */
    {
      id: 'def.nat-arith',
      cluster: 'set.numbers',
      type: 'definition',
      label: '自然数的加法与乘法',
      title: '自然数上的加法与乘法（由递推定义）',
      regions: ['set-theory'],
      tags: ['定义', '自然数', '递推', '加法', '乘法'],
      statement: [
        '设 $\\omega = \\mathbb{N}$，$S(n) := n \\cup \\{n\\}$，$0 := \\emptyset$。用**递推定义**在 $\\omega$ 上定义两个运算。',
        '',
        '**加法**：对每个固定的 $m$，$n \\mapsto m + n$ 是满足下式的唯一 $g : \\omega \\to \\omega$：',
        '',
        '$$m + 0 := m, \\qquad m + S(n) := S(m + n)$$',
        '',
        '**乘法**：同样地，',
        '',
        '$$m \\cdot 0 := 0, \\qquad m \\cdot S(n) := m \\cdot n + m$$'
      ].join('\n'),
      notes: [
        '**为什么只能这样定义**：$\\omega$ 本身就是递归地造出来的，唯一「从 $\\omega$ 出发造东西」的工具就是递推定义。加法、乘法、幂、序，全从这一条出来。',
        '⚠️ 这两条只是「**存在唯一**」的断言 —— 存在性正是**递推定义定理**给的内容，所以它们是**定义**而不是公理，也不需要额外的公理。',
        '**性质靠归纳原理验证**（不属于定义）：以 $0 + n = n$ 为例 —— $n = 0$ 时两边都是 $0$；设 $0 + n = n$，则 $0 + S(n) = S(0 + n) = S(n)$ ✓。交换律 $m + n = n + m$ 要先证两条引理 $0 + n = n$ 与 $S(m) + n = S(m + n)$，再对 $n$ 归纳；结合律、分配律 $m(n+k) = mn + mk$ 同理。',
        '⭐ **它是后面所有运算的原型**：$\\mathbb{Z}$ 的加法 $[a,b] + [c,d] := [a+c,\\ b+d]$ 里的 $+$、$\\mathbb{Q}$ 的加法、$\\mathbb{R}$ 的逐项加法，里子都是这一个 $+$。'
      ].join('\n\n'),
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

    /* ------------------------------------------------ 绝对值 */
    {
      id: 'def.abs',
      cluster: 'analysis.real-calc',
      type: 'definition',
      label: '绝对值 |x|',
      title: '绝对值 $|x|$（Absolute Value）',
      regions: ['set-theory', 'analysis'],
      tags: ['定义', '绝对值', '序'],
      statement: [
        '设 $K$ 是**有序域**（$\\mathbb{Q}$ 与 $\\mathbb{R}$ 都是），$x \\in K$。定义',
        '',
        '$$|x| := \\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases} \\qquad\\text{即}\\qquad |x| = \\max\\{x, -x\\}$$',
        '',
        '于是 $|x| \\ge 0$ 恒成立，且 $|x| = 0 \\iff x = 0$。'
      ].join('\n'),
      notes: '⭐ 读法：$|x|$ 是**到原点的距离**，与符号无关。两点之间的距离就是 $|x - y|$ —— 这就是后来**距离空间**里那个距离的原型：把「差」扔掉，只留下「距离」这个概念本身。\n\n立刻能验证的两条（都由定义分情形）：\n- $|-x| = |x|$；\n- $|xy| = |x|\\,|y|$。\n\n⚠ **不等号那一侧的估计不属于定义**：$|x + y| \\le |x| + |y|$ 是一条**定理**（见「三角不等式」）—— 定义里只有分情形，没有不等式。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1']
    },
    {
      id: 'thm.triangle',
      cluster: 'analysis.real-calc',
      type: 'theorem',
      label: '三角不等式',
      title: '三角不等式 $|x + y| \\le |x| + |y|$',
      regions: ['set-theory', 'analysis'],
      tags: ['定理', '不等式', '绝对值'],
      statement: [
        '设 $K$ 是有序域（如 $\\mathbb{Q}$、$\\mathbb{R}$），$x, y \\in K$。则',
        '',
        '$$|x + y| \\le |x| + |y|$$',
        '',
        '并且由此得到两个常用的变形：',
        '',
        '$$\\big| |x| - |y| \\big| \\le |x - y|, \\qquad |x_1 + x_2 + \\cdots + x_n| \\le |x_1| + |x_2| + \\cdots + |x_n|$$',
        '',
        '（后者由前者对 $n$ 归纳。）'
      ].join('\n'),
      notes: '⭐ 这是**一切估计的起点**：Cauchy 列的线性运算、极限的四则运算、级数的比较判别法、距离空间里那条 $d(x, z) \\le d(x, y) + d(y, z)$，归根到底都是它（距离空间那条是把它**取作公理**）。\n\n⚠ 证明只有分情形，没有任何技巧 —— 但**「$a \\le |a|$ 且 $-a \\le |a|$」这两句是全部的关键**：由它得 $-(|x| + |y|) \\le x + y \\le |x| + |y|$，而 $|t| \\le c \\iff -c \\le t \\le c$（$c \\ge 0$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1']
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
        '两个 Cauchy 列**等价**（记作 $(x_n) \\sim (y_n)$）当且仅当 $(x_n - y_n)$ 是零列。',
        '',
        '（$\\sim$ 是等价关系：自反、对称显然，传递由三角不等式。）'
      ].join('\n'),
      notes: '⭐ **为什么要「模去零列」**：同一个实数有很多种逼近方式 —— 比如 $(1, 1, 1, \\ldots)$ 与 $(1.1,\\ 1.01,\\ 1.001,\\ \\ldots)$ 都该代表 $1$，而它们的差是零列。等价类把「同一个数的不同逼近」粘成一件事。\n\n⚠ 这里**只用 $\\mathbb{Q}$ 的序与绝对值**（$\\varepsilon$ 取正有理数、绝对值是 $\\mathbb{Q}$ 上的），所以**不构成循环**：这一步在造出 $\\mathbb{R}$ 之前完全说得通。度量空间里那套「距离、Cauchy 列、完备」的语言，正是从这里的做法抽出来的。\n\n三条后面要用的事实：\n- Cauchy 列**有界**；\n- Cauchy 列的**和、差、积仍是 Cauchy 列**；\n- **不是零列的 Cauchy 列，从某一项起 $|x_n| \\ge \\delta$**（某个正有理数 $\\delta$）—— 于是它的倒数（去掉前面有限项）也是 Cauchy 列。第三条是「乘法有逆元」的全部依据。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },
    /* ------------------------------------------------------------ 实数 */
    {
      id: 'def.real',
      cluster: 'set.numbers',
      type: 'definition',
      label: '实数系 ℝ',
      title: '实数系 $\\mathbb{R}$（由 Cauchy 列构造）',
      regions: ['set-theory', 'analysis'],
      tags: ['定义', '实数', '商集', '完备化'],
      statement: [
        '记 $\\mathcal{C}$ 为全体**有理 Cauchy 列**，$\\sim$ 是「差为**零列**」这个等价关系（见「Cauchy 列与零列」）。令',
        '',
        '$$\\mathbb{R} := \\mathcal{C} / \\sim$$',
        '',
        '元素是等价类 $[x_n]$。运算**逐项**定义，序用代表元定义：',
        '',
        '$$[x_n] + [y_n] := [x_n + y_n], \\qquad [x_n] \\cdot [y_n] := [x_n y_n]$$',
        '',
        '$${}[x_n] > 0 :\\iff \\exists q \\in \\mathbb{Q},\\ q > 0,\\ \\exists N,\\ \\forall n \\ge N : x_n \\ge q$$',
        '',
        '（一般的序由 $[y_n] \\ge [x_n] :\\iff [y_n - x_n] \\ge 0$ 给出。）零与一取常数列：',
        '',
        '$$0 := [(0,0,0,\\ldots)], \\qquad 1 := [(1,1,1,\\ldots)]$$',
        '',
        '最后，$\\mathbb{Q}$ 通过**常数列**嵌入 $\\mathbb{R}$：',
        '',
        '$$q \\mapsto [(q, q, q, \\ldots)]$$'
      ].join('\n'),
      notes: '⭐ **这就是构造**：$\\mathbb{R}$ 不被假定存在，它由**上一层的对象**粘出来 —— 有理数（$\\mathbb{Q}$）$\\to$ 有理数列（函数 $\\omega \\to \\mathbb{Q}$）$\\to$ 其中的 Cauchy 列 $\\to$ 按等价关系取商集。每一步都只用到已经有的东西，一个新的对象都没有凭空进来。\n\n- 元素是**等价类**，不是序列本身；否则同一个数的不同逼近方式会变成不同的实数。\n- 运算与序是**用代表元写出来的**，所以必须验证它们**与代表元的选取无关**（良定义）—— 这是商构造最容易漏的一步。\n\n⭐ 这一手法的**一般化就是「度量空间的完备化」**：把 $\\mathbb{Q}$ 换成任意度量空间 $(X, d)$，把 $|x_m - x_n|$ 换成 $d(x_m, x_n)$，「取 Cauchy 列、模去零列」照搬无误 —— $\\mathbb{R}$ 的构造是它的原型。\n\n📌 **三组性质不在定义里**：域公理、序公理、确界原理都是关于这个构造的**定理**（见「$\\mathbb{R}$ 是完备有序域」）。存在性由构造给出，不需要公理。\n\n📌 另一条路是**戴德金分割**（取 $\\mathbb{Q}$ 的满足「非空、有上界、无最大元」的子集作为元素）：路数不同，造出来的对象同构 —— 见「完备有序域的唯一性」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3', 'Tao, Analysis I, Ch. 5']
    },
    {
      id: 'thm.real-ordered-field',
      /* 2026-10-16 挪团（用户已批）：它是「实数完备性的等价刻画」那一团的**入口**，
         不再挂在 analysis.real 下。只改这一行，引用它的 13 处全是按 id 指的。 */
      cluster: 'analysis.completeness',
      type: 'theorem',
      label: 'ℝ 是完备有序域',
      title: '$\\mathbb{R}$ 是完备有序域（确界原理）',
      regions: ['set-theory', 'analysis'],
      tags: ['定理', '实数', '完备性', '确界原理'],
      statement: [
        '上面构造出来的 $(\\mathbb{R}, +, \\cdot, \\le)$ 满足三组性质：',
        '',
        '**(i) 域公理**：$(\\mathbb{R}, +, \\cdot)$ 是域 —— 加减乘除（除以非零元）都封闭，且有结合、交换、分配律；',
        '',
        '**(ii) 序公理**：$\\le$ 是全序，且与运算相容：',
        '$$a \\le b \\implies a + c \\le b + c, \\qquad a \\le b,\\ 0 \\le c \\implies ac \\le bc$$',
        '',
        '**(iii) 完备性（确界原理）**：$\\mathbb{R}$ 的**每个非空有上界的子集都有上确界**。',
        '',
        '此外 $\\mathbb{Q}$ 的嵌入像在 $\\mathbb{R}$ 中**稠密**。'
      ].join('\n'),
      notes: '⚠ **注意这一条的位置**：它是**定理**，不是定义 —— 先有构造（「实数系 $\\mathbb{R}$」），再证明造出来的东西满足这三组性质。\n\n⭐ **第 (iii) 条才是分析学的引擎**：没有它 $\\mathbb{Q}$ 也满足前两条，但 $\\{ x \\in \\mathbb{Q} : x^2 < 2 \\}$ 在 $\\mathbb{Q}$ 里没有上确界。（$\\mathbb{Q}$ 因此不是完备有序域 —— 这不是缺陷，而正是要把 $\\mathbb{Q}$ 补成 $\\mathbb{R}$ 的理由。）\n\n由 (iii) 推出分析里最常用的两件事：\n- **单调有界数列收敛**；\n- **闭区间套定理**、**Bolzano–Weierstrass**、**Cauchy 列收敛**。\n\n⚠ 完备性说的是「**上确界存在**」，不是「极限一定存在」—— 后者是它的推论。\n\n📌 (iii) 的走法分两步（见边的证明）：先证**「$\\mathbb{R}$ 里每个 Cauchy 列都收敛」**（用对角线法从代表元里抽出一个有理 Cauchy 列），再由 Cauchy 完备推出确界原理（二分法造递增列与递减上界列，夹逼到同一个极限）。\n\n📌 由这三条推出来的、后面到处要用的性质：**阿基米德性质**与 **$\\mathbb{Q}$ 在 $\\mathbb{R}$ 中稠密**（见「阿基米德性质」）；$\\mathbb{R}$ 还**不可数**（$|\\mathbb{R}| = 2^{\\aleph_0}$）—— 「稠密」与「一样多」是两件事。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1', 'Ch. 3']
    },

    /* ------------------------------------------ 完备有序域的两条基本性质 */
    {
      id: 'lem.archimedean',
      cluster: 'analysis.real-calc',
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
      title: '任何完备有序域都与 $\\mathbb{R}$ 同构（构造无关性）',
      regions: ['set-theory', 'analysis'],
      tags: ['定理', '实数', '唯一性', '同构'],
      statement: [
        '设 $K$ 是**完备有序域**。则存在**唯一**的双射 $f : \\mathbb{R} \\to K$，它同时保持加法、乘法与序：',
        '',
        '$$f(x + y) = f(x) + f(y), \\qquad f(xy) = f(x)\\,f(y), \\qquad x \\le y \\iff f(x) \\le f(y)$$',
        '',
        '也就是说：$\\mathbb{R}$ 之外没有别的完备有序域 —— 任何一个都与它同构。'
      ].join('\n'),
      notes: '⭐ **这条定理说的是「构造之间的一致性」**：$\\mathbb{R}$ 的存在性已经由构造给出（不需要它），它说的是换一条路造 $\\mathbb{R}$（Cauchy 列、戴德金分割、小数展开……）得到的是**同一个对象** —— 所以「$\\mathbb{R}$ 有什么性质」不取决于选了哪条路，两条路造出来的东西可以互相替换。\n\n证明三步（见边）：把 $1$ 的像固定 $\\implies$ $\\mathbb{Q}$ 的嵌入像被唯一确定；$\\implies$ 用**上确界**把映射推广到整个 $K$（这才是要用完备性的地方）；$\\implies$ 唯一性靠「$\\mathbb{Q}$ 在 $K$ 中稠密」把两个同构逼成同一个。\n\n⚠ 少任何一条公理，唯一性就没了：$\\mathbb{Q}$ 不是唯一的有序域（$\\mathbb{Q}(\\sqrt{2})$ 是另一个），$\\mathbb{Q}$ 与 $\\mathbb{Q}(\\sqrt 2)$ 作为有序域不同构，两者都满足「有序域」的全部公理。',
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
      notes: '⭐ 证明走**闭区间套 + 对角线**（见边）：假设 $\\mathbb{R}$ 可以排成 $x_1, x_2, \\ldots$，就用二分法造一串套起来的闭区间，把 $x_n$ 逐个排除出去，再用**完备性**取出它们唯一的公共点 —— 它不等于任何一个 $x_n$。\n\n⚠ 整段证明**只用到 $\\mathbb{R}$ 的完备性**（确界原理），不需要基数理论；$|\\mathbb{R}| = 2^{\\aleph_0}$ 那一半是拿二进制展开与 $\\mathcal{P}(\\mathbb{N})$ 配对，再引用 Cantor 定理。\n\n**这条定理最反直觉的地方**：$\\mathbb{Q}$ 与 $\\mathbb{R}$ 都稠密、都可以逼近彼此，但 $\\mathbb{Q}$ 可数（排得成一个序列）、$\\mathbb{R}$ 不可数。**「稠密」与「一样多」是两回事** —— 这也正是分析必须做实数、不能只做有理数的根本原因。',
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
      id: 'dep.induction-natarith',
      kind: 'definition',
      definition: 'thm.induction',
      usedBy: 'def.nat-arith',
      note: '加法与乘法都是**递推定义** —— 「存在唯一」那一条正是递推定义定理给的内容。'
    },
    {
      id: 'dep.natarith-int',
      kind: 'definition',
      definition: 'def.nat-arith',
      usedBy: 'def.int',
      note: '$\\mathbb{Z}$ 的加法 $[a,b] + [c,d] := [a+c, b+d]$ 里子里的 $+$，就是自然数的加法。'
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
      id: 'dep.ordered-rat',
      kind: 'definition',
      definition: 'def.ordered-field',
      usedBy: 'def.rat',
      note: '⭐ 造完 $\\mathbb{Q}$ 的第一件事是**核对它是哪一种结构**：四则运算齐全（域）、序与运算相容（有序域）—— 它是本图里第一个**有序域**。'
    },
    {
      id: 'dep.ordered-abs',
      kind: 'definition',
      definition: 'def.ordered-field',
      usedBy: 'def.abs',
      note: '绝对值定义在**有序域**上（$\\mathbb{Q}$ 与 $\\mathbb{R}$ 都是）。'
    },
    {
      id: 'dep.ordered-triangle',
      kind: 'definition',
      definition: 'def.ordered-field',
      usedBy: 'thm.triangle',
      note: '三角不等式对任意有序域成立 —— 证明只用到分情形与「序与加法相容」。'
    },
    {
      id: 'dep.ordered-realfield',
      kind: 'definition',
      definition: 'def.ordered-field',
      usedBy: 'thm.real-ordered-field',
      note: '要证的就是「构造出来的 $\\mathbb{R}$ 是一个**完备有序域**」：前两组公理是「有序域」，第三组是不属于这条定义的额外一条。'
    },
    {
      id: 'dep.ordered-archimedean',
      kind: 'definition',
      definition: 'def.ordered-field',
      usedBy: 'lem.archimedean',
      note: '「$\\mathbb{N}$ 在 $K$ 中无上界」里的 $K$ 是**有序域**（$\\mathbb{N}$ 按 $1$ 生成的子结构嵌在里面）。'
    },
    {
      id: 'dep.ordered-unique',
      kind: 'definition',
      definition: 'def.ordered-field',
      usedBy: 'thm.real-unique',
      note: '定理说的「完备有序域」就是这条定义再加上完备性。'
    },
    {
      id: 'dep.abs-cauchy-null',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.cauchy-null',
      note: 'Cauchy 列的定义式 $|x_m - x_n| < \\varepsilon$ 里的 $|\\cdot|$ 就是它，而 $\\varepsilon$ 取**正有理数** —— 这样在造出 $\\mathbb{R}$ 之前就说得通。'
    },
    {
      id: 'dep.cauchy-null-real',
      kind: 'definition',
      definition: 'def.cauchy-null',
      usedBy: 'def.real',
      note: '⭐ $\\mathbb{R}$ 的元素就是「Cauchy 列模去零列」这些等价类 —— 构造直接踩在它上面。'
    },
    {
      id: 'dep.quotient-real',
      kind: 'definition',
      definition: 'def.quotient-set',
      usedBy: 'def.real',
      note: '和 $\\mathbb{Z}$、$\\mathbb{Q}$ 是**同一招**：把已有对象按等价关系粘成等价类。整条链 $\\mathbb{N} \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{R}$ 用的都是这一个手法。'
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
      id: 'imp.triangle',
      kind: 'implication',
      sources: ['def.abs'],
      target: 'thm.triangle',
      title: '绝对值的定义 $\\implies$ 三角不等式',
      proof: [
        '设 $x, y \\in K$。先看两个基本事实（都由 $|t| = \\max\\{t, -t\\}$ 直接读出）：',
        '',
        '- $t \\le |t|$ 且 $-t \\le |t|$，即 $-|t| \\le t \\le |t|$。',
        '',
        '于是',
        '',
        '$$x \\le |x|, \\qquad -x \\le |x|, \\qquad y \\le |y|, \\qquad -y \\le |y|$$',
        '',
        '两两相加（序与加法相容）：',
        '',
        '$$x + y \\le |x| + |y|, \\qquad -(x + y) \\le |x| + |y|$$',
        '',
        '即 $-c \\le x + y \\le c$，其中 $c := |x| + |y| \\ge 0$。而',
        '',
        '$$-c \\le t \\le c \\iff |t| \\le c \\qquad (c \\ge 0)$$',
        '',
        '（$\\Longleftarrow$：由 $t \\le c$ 与 $-t \\le c$ 分别取 $\\max$；$\\implies$：$|t|$ 等于 $t$ 或 $-t$，两种情形都在 $c$ 以下。）取 $t = x + y$ 得',
        '',
        '$$|x + y| \\le |x| + |y| \\qquad \\blacksquare$$',
        '',
        '**变形。** 在 $|x + y| \\le |x| + |y|$ 中把 $x$ 换成 $x - y$ 得 $|x| \\le |x - y| + |y|$，即 $|x| - |y| \\le |x - y|$；交换 $x, y$ 得另一侧，两者合起来就是 $\\big| |x| - |y| \\big| \\le |x - y|$。$n$ 元版本由归纳：$|x_1 + \\cdots + x_n| \\le |x_1 + \\cdots + x_{n-1}| + |x_n|$。'
      ].join('\n')
    },
    {
      id: 'imp.triangle-cauchy',
      kind: 'implication',
      sources: ['thm.triangle'],
      target: 'def.cauchy-null',
      title: '三角不等式 $\\implies$ 零列关系是等价关系',
      proof: '自反、对称直接由定义读出；**传递**要三角不等式：若 $(x_n) \\sim (y_n)$、$(y_n) \\sim (z_n)$，则 $|x_n - z_n| \\le |x_n - y_n| + |y_n - z_n|$，右边两项都是零列，故 $(x_n) \\sim (z_n)$。没有这一条，$\\mathbb{R}$ 就没法定义成商集。∎'
    },
    {
      id: 'imp.real-ordered-field',
      kind: 'implication',
      sources: ['def.real'],
      target: 'thm.real-ordered-field',
      title: 'Cauchy 列的等价类 $\\implies$ 完备有序域',
      proof: [
        '记 $\\mathcal{C}$ 为有理 Cauchy 列的全体。下面把 $\\mathbb{R} := \\mathcal{C}/\\sim$ 逐条查一遍。',
        '',
        '**① 运算良定义。** 设 $x \\sim x\'$、$y \\sim y\'$（即 $x_n - x\'_n$、$y_n - y\'_n$ 都是零列）。',
        '',
        '加法：$|(x_n + y_n) - (x\'_n + y\'_n)| \\le |x_n - x\'_n| + |y_n - y\'_n| \\to 0$（三角不等式）。',
        '',
        '乘法：$x_n y_n - x\'_n y\'_n = x_n (y_n - y\'_n) + y\'_n (x_n - x\'_n)$，而 Cauchy 列**有界**（设 $|x_n| \\le M$、$|y\'_n| \\le M\'$），故两项各自 $\\to 0$。',
        '',
        '**② 域公理。** 结合、交换、分配都是逐项验证后取等价类（$\\mathbb{Q}$ 满足，$\\mathcal{C}$ 对 $+$、$\\cdot$ 封闭）。零元 $0 := [$零列$]$、一 $1 := [(1,1,1,\\ldots)]$。',
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
        '而 $[x_n y_n] = [(1,1,1,\\ldots)] = 1$。故每个非零元可逆。',
        '',
        '**③ 序良定义 + 全序。** $(y_n - x_n)$ 换成等价的代表元后仍是零列的平移，故「$> 0$」的定义与代表元无关。三种情形恰有一种成立：',
        '',
        '- $x$ 是零列 $\\implies [x] = 0$；',
        '- 否！则由 ② 的估计，从某项起 $|x_n| \\ge \\delta$；再用 Cauchy 性（取 $\\varepsilon = \\delta$）知符号最终恒定：若某两项异号则 $|x_m - x_n| \\ge 2\\delta$，矛盾。于是要么最终 $x_n \\ge \\delta$（正），要么最终 $x_n \\le -\\delta$（负）。',
        '',
        '序与运算的相容性（$\\alpha \\le \\beta \\implies \\alpha + \\gamma \\le \\beta + \\gamma$；$\\alpha \\ge 0, \\beta \\ge 0 \\implies \\alpha\\beta \\ge 0$）都逐项验证。',
        '',
        '**④ 嵌入与稠密。** $x \\mapsto [(x,x,x,\\ldots)]$ 是保序、保运算的单射。稠密：若 $\\alpha < \\beta$，取代表元 $x \\in \\alpha$、$y \\in \\beta$ 与正有理数 $q$ 使最终 $x_n + q \\le y_n$，则由 $\\mathbb{Q}$ 的稠密性可取有理数 $r$ 夹在中间，常数列 $r$ 满足 $\\alpha < [r] < \\beta$。',
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
        '> ⭐ 注意 ⑤ 与 ⑥ 的位置：**先有「Cauchy 列收敛」，才有确界原理**。戴德金分割那条路的顺序正好相反（那里完备性是「并」的直接后果），两条路殊途同归。'
      ].join('\n')
    },
    {
      id: 'imp.archimedean',
      kind: 'implication',
      sources: ['thm.real-ordered-field'],
      target: 'lem.archimedean',
      title: '完备性 $\\implies$ 阿基米德性质 + $\\mathbb{Q}$ 稠密',
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
        '（「整数版本」：先用 (i) 取 $k > nx$，再从 $\\{0, 1, \\ldots, k\\}$ 中取最小的使 $\\ge nx$ 的那个。）令 $q := (m+1)/n \\in \\mathbb{Q}$。则',
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
      sources: ['lem.archimedean', 'def.real'],
      target: 'thm.real-unique',
      title: '$\\mathbb{Q}$ 稠密 $\\implies$ 完备有序域与 $\\mathbb{R}$ 同构',
      proof: [
        '设 $K$ 是完备有序域，取 $K\' := \\mathbb{R}$（上面构造出来的那个）。分三步造出唯一的同构 $f : K \\to \\mathbb{R}$。',
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
      sources: ['thm.real-ordered-field'],
      target: 'thm.real-uncountable',
      title: '完备性（确界原理）$\\implies \\mathbb{R}$ 不可数（闭区间套 + 对角线）',
      proof: [
        '反设 $\\mathbb{R} = \\{x_1, x_2, x_3, \\ldots\\}$ 可以排成一个序列。下面造一个不属于这个序列的实数。',
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
        '**③ 矛盾。** 由 ① 知 $x_n \\notin I_n$，由 ② 知 $a \\in I_n$，所以 $a \\ne x_n$ 对**一切** $n$ 成立 —— 但 $a \\in \\mathbb{R} = \\{x_1, x_2, \\ldots\\}$，与序列穷尽了 $\\mathbb{R}$ 矛盾。故 $\\mathbb{R}$ 不可数。$\\blacksquare$',
        '',
        '**④ 基数版本。** 把实数写成二进制小数（约定不用最后全 1 的写法以避开歧义）得到 $\\mathbb{R} \\hookrightarrow \\mathcal{P}(\\mathbb{N})$；反过来 $\\mathcal{P}(\\mathbb{N}) \\to \\mathbb{R}$ 用三进制展开即可，两边都有单射，由 Schröder–Bernstein 得 $|\\mathbb{R}| = |\\mathcal{P}(\\mathbb{N})| = 2^{\\aleph_0}$。再由 **Cantor 定理** $|\\mathcal{P}(\\mathbb{N})| > |\\mathbb{N}| = \\aleph_0$，即',
        '',
        '$$|\\mathbb{R}| = 2^{\\aleph_0} > \\aleph_0$$'
      ].join('\n')
    },
  ]
});
