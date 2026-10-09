/* ==========================================================================
   内容包 · 共尾函子与滤过余极限（5 条）
   --------------------------------------------------------------------------
   这一团补的是「算余极限时可以换指标范畴」这件事：

   滤过余极限（沿有向集）是最好算的一种；**共尾函子**给出把一般指标范畴
   换成更小、更好算的指标范畴的判据 —— $F$ 共尾时，
   「沿 $J$ 算」与「沿 $I$ 算」给出同构的余极限。

   顺带补上：连通范畴（共尾的定义要用它）、可表函子保所有极限、
   滤过范畴可被有向集替换。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '共尾函子与滤过余极限',
  nodes: [

    /* -------------------------------------------------------- 连通范畴 */
    {
      id: 'def.connected-category',
      cluster: 'cat.limit',
      type: 'definition',
      label: '连通范畴',
      title: '连通范畴（Connected Category）',
      regions: ['category'],
      tags: ['范畴论', '连通', '共尾', '指标范畴'],
      statement: [
        '范畴 $\\mathcal{C}$ 叫**连通的**，如果对任意两个对象 $A, B \\in \\mathcal{C}$，都存在一条**有限锯齿**',
        '',
        '$$A = X_{0} \\longrightarrow X_{1} \\longleftarrow X_{2} \\longrightarrow \\cdots \\longleftarrow X_{n} = B,$$',
        '',
        '或同样一条但箭头方向相反（$A = X_{0} \\leftarrow X_{1} \\to X_{2} \\leftarrow \\cdots \\to X_{n} = B$）把 $A$ 与 $B$ 连起来。'
      ].join('\n'),
      notes: [
        '「锯齿」的意思是：每个 $X_{k} \\to X_{k+1}$ 或 $X_{k} \\leftarrow X_{k+1}$ 都得是**真态射**，方向可以来回换，只要首尾接得上。',
        '**空范畴不连通**（它连一个对象都没有）；**单对象范畴连通**（$n = 0$ 的空锯齿就够了）。',
        '⚠️ 与拓扑里的连通**不是一回事**：这里纯粹是「态射图画成的无向图连通」，没有任何开集。',
        '⭐ **为什么需要它**：滤过范畴要求「任意两个对象都有共同的上界」，那是连通性的一种强形式。共尾函子的定义（每个逗号范畴非空**且连通**）里，连通那一条正是用来保证「两条不同的路给出同一个答案」。'
      ].join('\n\n')
    },

    /* -------------------------------------------------------- 共尾函子 */
    {
      id: 'def.cofinal-functor',
      cluster: 'cat.limit',
      type: 'definition',
      label: '共尾函子',
      title: '共尾函子（Cofinal Functor）',
      regions: ['category'],
      tags: ['范畴论', '共尾', 'cofinal', 'final', '余极限'],
      statement: [
        '设 $F : J \\to I$ 是函子。对 $i \\in I$，记 $i \\downarrow F$ 为逗号范畴，它的对象是 $\\{\\, f : i \\to F(j) \\,\\}$（$j \\in J$）。',
        '',
        '称 $F$ 是**共尾的**（cofinal，也写作 **final**），如果对每个 $i \\in I$：',
        '',
        '$$i \\downarrow F \\quad \\text{非空，且连通。}$$'
      ].join('\n'),
      notes: [
        '⭐ **直观**：$F$ 的像在 $I$ 里「到处都有、而且没有被隔开」。非空 = 每个 $i$ 都有一条路走到 $F$ 的像里；连通 = 不同的走法之间能互相转换。**满足这两条，$J$ 就在 $I$ 里「铺得足够满」**，沿着它算余极限与沿着整个 $I$ 算是一回事（见下一条）。',
        '**对偶**：把 $i \\downarrow F$ 换成**下**逗号范畴 $F \\downarrow i$（对象是 $\\{\\, f : F(j) \\to i \\,\\}$）得到的条件叫 **coinitial**，它保的是**极限**。',
        '**例子**：$J \\to \\mathbf{1}$ 共尾 $\\iff$ $J$ 连通；有向集沿 $\\le$ 的含入 $\\mathbb{N} \\to \\mathbb{Z}$ 是共尾的；$\\mathcal{C}$ 到它的反射子范畴的含入一般**不是**共尾的（方向反了就看 coinitial）。'
      ].join('\n\n')
    },

    /* ------------------------------------------- 共尾 ⟹ 余极限同构 */
    {
      id: 'thm.cofinal-colimit',
      cluster: 'cat.limit',
      type: 'theorem',
      label: '共尾函子不改变余极限',
      title: '共尾 $\\implies$ 沿 $F$ 算余极限与沿 $I$ 算同构',
      regions: ['category'],
      tags: ['范畴论', '共尾', '余极限', '同构'],
      statement: [
        '设 $F : J \\to I$ **共尾**，$D : I \\to \\mathcal{C}$ 是图。若 $\\varinjlim_{j \\in J} D(F(j))$ 存在，则 $\\varinjlim_{i \\in I} D(i)$ 存在，并且',
        '',
        '$$\\varinjlim_{j \\in J} D\\bigl(F(j)\\bigr) \\;\\cong\\; \\varinjlim_{i \\in I} D(i).$$'
      ].join('\n'),
      notes: [
        '**证明的走法**（记 $L = \\varinjlim_{i \\in I} D(i)$，要证 $L$ 也是 $D \\circ F$ 的余极限）：',
        '',
        [
          '- $L$ 显然是 $D \\circ F$ 的余锥（余锥的腿复合一下就到 $D \\circ F$ 上）。',
          '- 设 $\\{\\, g_{j} : D(F(j)) \\to M \\,\\}$ 是 $D\\circ F$ 的余锥。要对**每个** $i \\in I$ 造一条腿 $p_{i} : D(i) \\to M$：由 $i \\downarrow F$ **非空**，取一条 $f : i \\to F(j)$，令 $p_{i} := g_{j} \\circ D(f)$。',
          '- **良定义**靠连通性：换一条 $f\' : i \\to F(j\')$，两个选择 $(j, f)$、$(j\', f\')$ 由 $i \\downarrow F$ 的连通性被一条锯齿连起来，沿锯齿走一遍交换图，两条腿给出同一个 $p_{i}$。',
          '- 这样 $M$ 变成 $D$ 的余锥，泛性给出唯一的 $L \\to M$ —— 于是 $L$ 满足 $D \\circ F$ 余锥的泛性质。',
          '- 反方向由「余锥复合」直接得到。两边互逆。∎'
        ].join('\n'),
        '⭐ **用途**：算余极限时可以**把指标范畴换成一个共尾的子范畴**。最常用的一招是把 $\\mathbb{N}$ 换成一个子列、或者把有向集换成它的共尾子集 —— 极限不变。',
        '对偶地：**coinitial** 函子不改变极限。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 滤过范畴 */
    {
      id: 'def.filtered-category',
      cluster: 'cat.limit',
      type: 'definition',
      label: '滤过范畴',
      title: '滤过范畴与滤过余极限（Filtered Category）',
      regions: ['category'],
      tags: ['范畴论', '滤过', 'filtered', '余极限', '有向集'],
      statement: [
        '范畴 $I$ 叫**滤过的**（filtered），如果：',
        '',
        [
          '1. **非空**：$I$ 至少有一个对象；',
          '2. **上界**：对任意 $i, j \\in I$，存在 $k \\in I$ 与态射 $i \\to k$、$j \\to k$；',
          '3. **余等化**：对任意平行的 $u, v : i \\rightrightarrows j$，存在 $w : j \\to k$ 使 $w \\circ u = w \\circ v$。'
        ].join('\n'),
        '',
        '等价的说法是：**$I$ 中每个有限图都有余锥。** 沿滤过范畴取的余极限叫**滤过余极限**。'
      ].join('\n'),
      notes: [
        '**三条 $\\iff$ 有限余锥**：三条正好对应「有限图的余锥存在」的三种情形 —— 空图（就是第 1 条）、两个点（第 2 条）、一对平行箭头（第 3 条）。所以「滤过」=「有限图都有余锥」= **所有信息都能在后面被接住**。',
        '**与有向集的关系**：有向集（偏序集 + 任意两元有上界）看成范畴就是滤过的；反过来，**任何滤过范畴都能换成一个共尾的有向集**（见「滤过范畴可换成有向集」）。所以「滤过余极限」与「沿有向集的余极限」是同一件事。',
        '⭐ **为什么处处要求它**：滤过余极限在 $\\mathbf{Set}$、$A\\text{-}\\mathbf{Mod}$、$\\mathrm{CondAb}$ 里都**正合**（与有限极限交换），这是 Grothendieck 的 **AB5** 公理，也是同调代数挑范畴时的关键条件。沿一般范畴取余极限没有这条好性质。',
        '⚠️ 与「链」区分：链是**全序**子集，比滤过强；滤过只要求「有共同上界」，任意两元之间不必可比。'
      ].join('\n\n')
    },

    /* --------------------------------- 滤过范畴可被有向集替换 */
    {
      id: 'prop.filtered-directed',
      cluster: 'cat.limit',
      type: 'proposition',
      label: '滤过范畴可换成有向集',
      title: '滤过 $\\implies$ 存在共尾的有向集',
      regions: ['category'],
      tags: ['范畴论', '滤过', '有向集', '共尾', '余极限'],
      statement: [
        '若 $I$ 是**滤过**范畴，则存在**有向集** $J$ 与函子 $u : J \\to I$，使得对任何图 $D : I \\to \\mathcal{C}$：',
        '',
        '若 $\\varinjlim_{J} D \\circ u$ 存在，则 $\\varinjlim_{I} D$ 存在，且 $\\varinjlim_{J} D\\circ u \\cong \\varinjlim_{I} D$。'
      ].join('\n'),
      notes: [
        '**构造**：取 $J$ 为「$I$ 中的有限图连同它选定的一个余锥」组成的集合',
        '',
        '$$J = \\bigl\\{\\, (K,\\ D : K \\to I,\\ i,\\ \\{\\Phi_{k} : D(k) \\to i\\}_{k \\in K}) \\,\\bigr\\},$$',
        '',
        '按「$D\'$ 包含 $D$、且存在相容的 $i \\to i\'$」排成偏序（滤过性保证任意两个元都有共同上界，所以这确实是个有向集）。令 $u : J \\to I$ 把 $(K, D, i, \\Phi)$ 送到 $i$。',
        '**只需验证 $u$ 共尾**：',
        '',
        [
          '- **非空**：把 $i$ 自己看成一个单点范畴上的图，它当然有余锥，于是 $(\\cdot, i, \\emptyset) \\in J$ 给出 $i \\downarrow u$ 的一个对象。',
          '- **连通**：给定两个对象 $(j\', f\')$、$(j\'\', f\'\')$，由 $I$ 的滤过性可以把它们的两张有限图并起来、再找一个共同的余锥 $a$，于是 $(j\', f\') \\leftarrow (a, f) \\to (j\'\', f\'\')$ 把它俩连起来。∎',
        ].join('\n'),
        '',
        '⭐ **推论**：**滤过余极限 = 沿有向集的余极限**。所以关于「滤过余极限」的定理，只要对有向集这一种最简单的指标范畴证一遍，就自动对一切滤过范畴成立。',
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 1.4.2'],
    },

    /* --------------------------------- 可表函子保所有极限 */
    {
      id: 'prop.representable-preserves-limits',
      cluster: 'cat.yoneda',
      type: 'proposition',
      label: '可表函子保所有极限',
      title: '可表函子保所有极限',
      regions: ['category'],
      tags: ['范畴论', '可表函子', '保极限', '米田', 'left exact'],
      statement: [
        '若 $F : \\mathcal{C} \\to \\mathbf{Set}$ **可表**，即 $F \\cong \\operatorname{Hom}_{\\mathcal{C}}(X, -)$，则 $F$ **保所有极限**：对任何图 $D : I \\to \\mathcal{C}$（只要 $\\lim D$ 存在），',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ \\lim D\\bigr) \\;\\cong\\; \\lim \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ D(-)\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** 先证 $h^{X} = \\operatorname{Hom}(X, -)$ 保极限。取 $D : I \\to \\mathcal{C}$，链式：',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ \\lim D\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}^{I}}\\bigl(\\underline{\\{0\\}},\\ h^{X} \\circ D\\bigr) \\;\\cong\\; \\lim \\bigl(h^{X} \\circ D\\bigr).$$',
        '',
        '第一式是**极限的定义**（$\\lim D$ 表示锥函子：$\\operatorname{Hom}(\\Delta Y, D) \\cong \\operatorname{Hom}(Y, \\lim D)$，取 $Y = X$）；第二式是「函子范畴里的极限逐点算」。这里 $\\underline{\\{0\\}}$ 是取值恒为 $\\{0\\}$ 的**常函子**（在函子范畴 $\\mathcal{C}^{I}$ 里它才是 $\\operatorname{Hom}$ 的合法对象）。∎',
        '再由 $F \\cong \\operatorname{Hom}(X,-)$，同构的函子保的东西一样，$F$ 也保所有极限。',
        '**一批立刻的推论**：',
        '',
        [
          '- **反变**可表函子 $\\operatorname{Hom}(-, X)$ 把**余极限**变成**极限**（取对偶范畴即得）；',
          '- $\\operatorname{Hom}(X, -)$ 保**有限**极限这一点，就是说 $X$ 与一切有限极限「相容」。'
        ].join('\n'),
        '说一个函子 **left exact**（左正合），指它保所有**有限**极限 —— 所以右正合就是保所有有限余极限，「正合」是两者都对。'
      ].join('\n\n')
    }
  ],

  edges: []
});
