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
     ℝ = ℚ 的**戴德金分割**全体                                  —— 补掉「上确界不一定存在」

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
      notes: '⭐ 这是数学里「造新对象」最常用的手法：手头只有一类东西，却想得到另一类，就把前者按某个等价关系**粘**起来。本星图里至少四处用到：\n\n- $\\mathbb{Z} = (\\mathbb{N} \\times \\mathbb{N})/\\sim$、$\\mathbb{Q} = (\\mathbb{Z} \\times (\\mathbb{Z}\\setminus\\{0\\}))/\\sim$；\n- $L^1$、$L^p$ 的元素其实是**函数的等价类**（a.e. 相等视为同一个）；\n- RN 导数 $d\\nu/d\\mu$ 也是一个等价类，而不是单个函数。\n\n⚠ 等价类的**代表元不唯一**，所以凡是要在商集上定义的东西（运算、序、范数），都必须先证明「与代表元的选取无关」，也就是**良定义**。这是初学商构造时最容易漏掉的一步。',
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

    /* ------------------------------------------------------ 戴德金分割 */
    {
      id: 'def.dedekind-cut',
      cluster: 'set.numbers',
      type: 'definition',
      label: '戴德金分割',
      title: '戴德金分割（Dedekind Cut）',
      regions: ['set-theory', 'analysis'],
      tags: ['定义', '实数', '完备性'],
      statement: [
        '$\\mathbb{Q}$ 的子集 $\\alpha \\subseteq \\mathbb{Q}$ 是一个**分割**，当且仅当：',
        '',
        '1. $\\alpha \\ne \\emptyset$ 且 $\\alpha \\ne \\mathbb{Q}$；',
        '2. **向下封闭**：$q \\in \\alpha$ 且 $p < q \\implies p \\in \\alpha$；',
        '3. $\\alpha$ 中**没有最大元**。',
        '',
        '令 $\\mathbb{R} := \\{ \\alpha : \\alpha$ 是分割 $\\}$，并在其上定义',
        '',
        '$$\\alpha \\le \\beta :\\iff \\alpha \\subseteq \\beta$$'
      ].join('\n'),
      notes: '⭐ 直观：分割就是「把数轴切一刀」的位置 —— $\\alpha$ 是切点**左边**的全部有理数。第三条（没有最大元）的意思是「切在缺口上，而不是切在某个有理数上」。\n\n**关键在于切点本身不必是有理数**：\n\n$$\\alpha_{\\sqrt{2}} = \\{ q \\in \\mathbb{Q} : q < 0 \\text{ 或 } q^2 < 2 \\}$$\n\n这个 $\\alpha_{\\sqrt{2}}$ 满足三条公理（向下封闭、无最大元，因为它逼近 $\\sqrt{2}$ 却取不到），但**没有任何有理数 $q$ 使 $\\alpha_q = \\alpha_{\\sqrt{2}}$** —— 它就是一个新对象。把所有这些「缺口」本身收进来当元素，$\\mathbb{R}$ 就造好了。\n\n⭐ 这个构造**完全不用极限、不用序列、不用距离**，只用一个序关系：所以它属于集合论/序理论，任何有序域都可以照做。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1']
    },
    {
      id: 'thm.real-construction',
      cluster: 'set.numbers',
      type: 'theorem',
      label: '由分割构造 ℝ',
      title: '戴德金分割全体是一个完备有序域',
      regions: ['set-theory', 'analysis'],
      tags: ['定理', '实数', '完备性'],
      statement: [
        '在 $\\mathbb{R} = \\{$分割$\\}$ 上取上述的序 $\\alpha \\le \\beta \\iff \\alpha \\subseteq \\beta$，并定义',
        '',
        '$$\\alpha + \\beta := \\{ p + q : p \\in \\alpha,\\ q \\in \\beta \\}, \\qquad 0 := \\{ q \\in \\mathbb{Q} : q < 0 \\}$$',
        '$$-\\alpha := \\{ q \\in \\mathbb{Q} : \\exists r > q,\\ -r \\notin \\alpha \\}, \\qquad 1 := \\{ q \\in \\mathbb{Q} : q < 1 \\}$$',
        '',
        '乘法按 $\\alpha, \\beta \\ge 0$ 的情形先定义（$\\alpha \\beta := \\{ pq : p \\in \\alpha, q \\in \\beta,\\ p, q \\ge 0 \\} \\cup \\{q < 0\\}$），再用符号规则推广。则 $(\\mathbb{R}, +, \\cdot, \\le)$ 是**完备有序域**：',
        '',
        '**(i)** 是一个域；**(ii)** 序与运算相容；**(iii)** 每个**非空有上界**的子集都有**上确界**。'
      ].join('\n'),
      notes: '⭐ (iii) 的证明只有一行：一族分割 $\\{\\alpha_i\\}_{i \\in I}$ 的上确界就是它们的**并** $\\bigcup_i \\alpha_i$（有上界保证这个并不是 $\\mathbb{Q}$ 全体；「向下封闭」与「无最大元」在并之下都保持）。\n\n也就是说：**$\\mathbb{R}$ 的完备性不再是公理，而是「并」这个运算的直接后果。**\n\n⚠ 代价是域运算要逐条验证（结合律、分配律、乘法的符号情形），写起来长，但全是机械的。\n\n⭐ 另一条同样可行的路是 **Cauchy 列的等价类**（Cantor 的补全）：两条路造出来的东西同构。Cauchy 那条更「度量」，戴德金这条更「序」——本图里两条路都能接上：一条走「完备」与「完备化」，一条走「上确界」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 1']
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
    {
      id: 'dep.subset-cut',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.dedekind-cut',
      note: '分割是 $\\mathbb{Q}$ 的一个**子集**（还要求向下封闭、没有最大元）。'
    },
    {
      id: 'dep.rat-cut',
      kind: 'definition',
      definition: 'def.rat',
      usedBy: 'def.dedekind-cut',
      note: '分割是「把 $\\mathbb{Q}$ 切一刀」的位置 —— $\\mathbb{Q}$ 的序是它唯一的原料。'
    },
    {
      id: 'dep.cut-real-construction',
      kind: 'definition',
      definition: 'def.dedekind-cut',
      usedBy: 'thm.real-construction',
      note: '定理说的就是「分割全体配上这些运算与序是一个完备有序域」。'
    },
    {
      id: 'dep.construction-real',
      kind: 'definition',
      definition: 'thm.real-construction',
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

    /* -------------------------------------------------- 带证明的推出 */
    {
      id: 'imp.real-construction',
      kind: 'implication',
      sources: ['def.dedekind-cut'],
      target: 'thm.real-construction',
      title: '分割全体 ⟹ 完备有序域',
      proof: [
        '**① 序。** $\\alpha \\le \\beta \\iff \\alpha \\subseteq \\beta$ 显然是全序：$\\subseteq$ 是偏序，而两个分割总有一个包含另一个。',
        '',
        '  事实上若 $\\alpha \\not\\subseteq \\beta$，取 $q \\in \\alpha \\setminus \\beta$；对任意 $p \\in \\beta$，若 $q < p$ 则由 $\\beta$ 向下封闭得 $q \\in \\beta$，矛盾，故 $p < q$，再由 $\\alpha$ 向下封闭得 $p \\in \\alpha$，即 $\\beta \\subseteq \\alpha$。',
        '',
        '**② 加法良定义。** 先验证 $\\alpha + \\beta$ 仍是分割：非空、非全（取 $p_0 \\notin \\alpha$、$q_0 \\notin \\beta$，则 $p_0 + q_0 \\notin \\alpha + \\beta$）、向下封闭、无最大元（$p + q$ 可被 $p\' + q$ 超过）。',
        '',
        '**③ 逆元。** $-\\alpha := \\{ q : \\exists r > q, -r \\notin \\alpha \\}$ 是分割，且 $\\alpha + (-\\alpha) = 0$。（$\\subseteq$ 方向：若 $p \\in \\alpha$、$q \\in -\\alpha$，取 $r > q$ 使 $-r \\notin \\alpha$，则 $p < -r$，故 $p + q < 0$。反向靠 $\\mathbb{Q}$ 的稠密性逐点逼近。）',
        '',
        '**④ 乘法。** 先在 $\\alpha, \\beta \\ge 0$ 时定义，逐条验证结合律、交换律与分配律（都用 $\\mathbb{Q}$ 的对应性质逐点搬运）；再用 $\\alpha \\beta := -((-\\alpha)\\beta)$ 之类把符号补全。这一步最长，但全是机械验证。',
        '',
        '**⑤ 完备性（关键一步）。** 设 $S \\subseteq \\mathbb{R}$ 非空、有上界 $\\gamma$。令',
        '',
        '$$\\sigma := \\bigcup_{\\alpha \\in S} \\alpha$$',
        '',
        '  则 $\\sigma$ 仍是分割：非空（$S \\ne \\emptyset$）；$\\sigma \\ne \\mathbb{Q}$（因为每个 $\\alpha \\subseteq \\gamma$，故 $\\sigma \\subseteq \\gamma \\subsetneq \\mathbb{Q}$）；向下封闭（每个 $\\alpha$ 都向下封闭）；无最大元（若 $q \\in \\sigma$，则 $q \\in \\alpha$ 对某个 $\\alpha \\in S$，而 $\\alpha$ 无最大元，故有 $q\' \\in \\alpha \\subseteq \\sigma$ 且 $q\' > q$）。',
        '',
        '  由构造成 $\\sigma \\supseteq \\alpha$ 对一切 $\\alpha \\in S$，故 $\\sigma$ 是上界；而任何上界 $\\eta \\supseteq \\alpha$（$\\forall \\alpha$）都满足 $\\eta \\supseteq \\sigma$，故 $\\sigma$ 是最小上界。即 $\\sup S = \\sigma$ 存在。$\\blacksquare$',
        '',
        '> ⭐ 这就是这个构造最漂亮的地方：**完备性不是公理，而是「并」这个运算的直接后果**。',
        '',
        '**⑥ 嵌入 $\\mathbb{Q}$。** $q \\mapsto \\{ p : p < q \\}$ 是保序、保运算的单射，所以 $\\mathbb{Q}$ 可以看成 $\\mathbb{R}$ 的稠密子集。'
      ].join('\n')
    }
  ]
});
