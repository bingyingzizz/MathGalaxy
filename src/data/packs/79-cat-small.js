/* ==========================================================================
   内容包 · 原书第 1 章的教材练习（小节点）+ 第 3/7 章两条技术性的
   --------------------------------------------------------------------------
   1.8 · 1.10 · 1.11 · 1.12 · 1.13 · 1.14 · 1.16 · 1.19 · 1.20 · 1.22 · 1.23 ·
   1.28 · 1.31 · 1.50 · 1.54 · 1.55 · 1.56 · 1.57 · 1.61 · 1.62 · 1.65 · 1.66 ·
   1.71 · 1.72 · 3.62 · 7.28
   这一批按用户要求写得**更小**：陈述 1–2 行、notes 只留一句证明 + ✓/∎。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '范畴论小条目',

  nodes: [

    {
      id: 'prop.free-objects-examples',
      cluster: 'cat.algebra',
      type: 'proposition',
      label: '自由对象的例子',
      title: '命题：各代数范畴里的自由对象',
      regions: ['category'],
      tags: ['命题', '自由对象', '幺半群', '群', '环', '模'],
      statement: '「自由」在几个代数范畴里的样子：$\\mathbf{Mon}$ 里是以 $X$ 为生成元的**字幺半群**；$\\mathbf{Gr}$ 里是**字群**（允许消去）；$\\mathbf{Rng}$ 里是非交换多项式环；$G\\text{-}\\mathbf{Set}$ 里是 $G$ 本身（正则作用）；$A\\text{-}\\mathbf{Mod}$ 里是 $A^{(X)}$；$k\\text{-}\\mathbf{Alg}$ 里是**张量代数**。',
      notes: '**证明。** 逐条核对自由对象的万有性质 $\\operatorname{Hom}(FX, -) \\cong \\operatorname{Hom}_{\\mathbf{Set}}\\bigl(X, U(-)\\bigr)$ ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.8']
    },

    {
      id: 'prop.zmod-is-ab',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: 'Z-模就是阿贝尔群',
      title: '命题：$\\mathbb{Z}\\text{-}\\mathbf{Mod} \\cong \\mathbf{Ab}$、$\\mathbb{Z}\\text{-}\\mathbf{Alg} \\cong \\mathbf{Rng}$',
      regions: ['algebra'],
      tags: ['命题', '模', '环', '范畴同构'],
      statement: '$\\mathbb{Z}\\text{-}\\mathbf{Mod} \\cong \\mathbf{Ab}$（范畴**同构**）；$\\mathbb{Z}\\text{-}\\mathbf{Alg} \\cong \\mathbf{Rng}$；更一般地 $k\\text{-}\\mathbf{Alg} \\simeq k\\backslash\\mathbf{Rng}$ 的全子范畴（要求 $k$ 的像落在中心里）。',
      notes: '**证明。** $\\mathbb{Z}$-模结构由「$n$ 倍」唯一确定，所以 $\\mathbb{Z}$-模就是阿贝尔群 ✓；$\\mathbb{Z}$-代数就是环 ✓；$k$-代数就是「带一个中心里装着 $k$ 的环」✓，逐条对照公理即得。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.10']
    },

    {
      id: 'prop.functor-preserves-sections',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '函子保截面与收缩',
      title: '命题：函子把截面（收缩、同构）送到同类',
      regions: ['category'],
      tags: ['命题', '截面', '收缩', '同构', '函子'],
      statement: '函子把**截面**（resp. **收缩**、**同构**）送到截面（resp. 收缩、同构）；特别地函子把同构送到同构。',
      notes: '**证明。** $f \\circ g = 1$ 与 $g \\circ f = 1$ 在函子下仍是同样的等式（函子保恒等、保复合）✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.11']
    },

    {
      id: 'def.mor-domain-codomain',
      cluster: 'cat.basic',
      type: 'definition',
      label: '态射范畴上的域与余域函子',
      title: '定义：$\\operatorname{Mor}(\\mathcal{C}) \\to \\mathcal{C}$ 的两个投影',
      regions: ['category'],
      tags: ['定义', '态射范畴', '域函子', '切片范畴'],
      statement: '$\\operatorname{Mor}(\\mathcal{C})$ 上有**域函子**与**余域函子**到 $\\mathcal{C}$；对固定 $X$，切片 $\\mathcal{C}/X \\to \\mathcal{C}$ 与余切片 $X\\backslash\\mathcal{C} \\to \\mathcal{C}$ 是遗忘函子。',
      notes: '**证明。** $(\\text{域}, \\text{余域})$ 把 $f : X \\to Y$ 送到 $X$（resp. $Y$）✓；切片里把 $(A \\to X)$ 送到 $A$，态射的复合按定义就相容 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.12']
    },

    {
      id: 'prop.op-category-is-modules',
      cluster: 'cat.algebra',
      type: 'proposition',
      label: '带算子的对象就是模',
      title: '命题：$\\operatorname{Op}(k\\text{-}\\mathbf{Mod}) \\simeq k[T]\\text{-}\\mathbf{Mod}$',
      regions: ['category'],
      tags: ['命题', '算子', '模', '自同态'],
      statement: '记 $\\operatorname{Op}(\\mathcal{C}) \\subseteq \\operatorname{Mor}(\\mathcal{C})$ 为由「域 = 余域」的态射组成的**满子范畴**（带算子的对象）。$k$ 交换时 $\\operatorname{Op}(k\\text{-}\\mathbf{Mod}) \\simeq k[T]\\text{-}\\mathbf{Mod}$。',
      notes: '**证明。** 「$k$-模 $M$ 带上一个自同态 $T : M \\to M$」与「$k[T]$-模结构」是同一份数据（$T$ 给出 $k[T] \\to \\operatorname{End}(M)$）✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.13']
    },

    {
      id: 'prop.forgetful-faithful-not-full',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '遗忘函子忠实但不满',
      title: '命题：$\\mathbf{Top} \\to \\mathbf{Set}$ 与 $\\mathbf{Ab} \\to \\mathbf{Set}$ 忠实不满',
      regions: ['category'],
      tags: ['命题', '遗忘函子', '忠实', '满'],
      statement: '遗忘函子 $\\mathbf{Top} \\to \\mathbf{Set}$ 与 $\\mathbf{Ab} \\to \\mathbf{Set}$ 都是**忠实但不满**的。',
      notes: '**证明。** 映射的集合不变，所以忠实 ✓；但两个拓扑空间之间的连续映射只是全体映射的一部分、两个群之间的映射还要求保运算 ✓ —— 所以不满 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.14']
    },

    {
      id: 'prop.nat-iso-invariants',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '自然同构不改变函子的性质',
      title: '命题：$F \\cong F\'$ 则两者忠实/满/全忠实/本质满/等价性一致',
      regions: ['category'],
      tags: ['命题', '自然同构', '忠实', '本质满', '范畴等价'],
      statement: '若 $F \\cong F\'$，则 $F$ 忠实（resp. 满、全忠实、本质满、是等价）$\\iff$ $F\'$ 也如此。',
      notes: '**证明。** 自然同构在每对 Hom 集上给出一族与复合相容的双射 ✓，于是「$\\operatorname{Hom}(X,Y) \\to \\operatorname{Hom}(FX, FY)$ 是不是双射」这件事两边同时成立 ✓；本质满与等价同理（同构平移对象）✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.16']
    },

    {
      id: 'prop.matrix-category',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '矩阵范畴',
      title: '命题：$\\operatorname{Mat}(k)$ 是小范畴，与有限维向量空间等价',
      regions: ['category'],
      tags: ['命题', '矩阵', '小范畴', '有限维向量空间'],
      statement: '$k$ 交换时 $\\operatorname{Mat}(k)$（对象 $\\mathbb{N}$、$\\operatorname{Hom}(m,n) = M_{n \\times m}(k)$、复合是矩阵乘法）是**小范畴**；$k$ 是域时 $\\operatorname{Mat}(k) \\simeq$ 有限维 $k$-向量空间范畴（**等价但不同构**）。',
      notes: '**证明。** 矩阵乘法满足结合律与单位律 ✓；取一组基给出到有限维空间的函子，它是全忠实且本质满的 ✓，但没有同构 —— 左边是小范畴、右边是大范畴 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.19']
    },

    {
      id: 'prop.forgetful-representable',
      cluster: 'cat.yoneda',
      type: 'proposition',
      label: '遗忘函子可表示',
      title: '命题：以集合为值的常见遗忘函子都可表示',
      regions: ['category'],
      tags: ['命题', '可表示', '遗忘函子', '自由对象'],
      statement: '以 $\\mathbf{Set}$ 为值的常见遗忘函子都是**可表示的**，表示对象就是相应的**自由对象**。',
      notes: '**证明。** $\\mathbf{Grp} \\to \\mathbf{Set}$ 由 $\\mathbb{Z}$ 表示（同态 $\\mathbb{Z} \\to G$ 就是选一个元素）✓；$\\mathbf{Rng} \\to \\mathbf{Set}$ 由 $\\mathbb{Z}[t]$ 表示 ✓；$\\mathbf{Top} \\to \\mathbf{Set}$ 由单点空间表示 ✓；一般地 $U \\cong \\operatorname{Hom}(F\\mathbf{1}, -)$ ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.20']
    },

    {
      id: 'prop.solution-functor-representable',
      cluster: 'cat.yoneda',
      type: 'proposition',
      label: '解集函子可表示',
      title: '命题：$A \\mapsto \\{a \\in A^{n} : f_{i}(a) = 0\\}$ 可表示',
      regions: ['category'],
      tags: ['命题', '可表示', '多项式', '解集'],
      statement: '设 $f_{1}, \\ldots, f_{r} \\in k[t_{1}, \\ldots, t_{n}]$。把交换 $k$-代数 $A$ 送到**解集** $S(A) = \\{(a_{1}, \\ldots, a_{n}) \\in A^{n} : f_{1}(a) = \\cdots = f_{r}(a) = 0\\}$ 的函子**可表示**。',
      notes: '**证明。** $k$-代数同态 $k[t_{1},\\ldots,t_{n}]/(f_{1},\\ldots,f_{r}) \\to A$ 完全由 $t_{i}$ 的像决定，而像必须把每个 $f_{i}$ 送到 $0$ ✓ —— 于是这族同态正是 $S(A)$ ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.22']
    },

    {
      id: 'prop.universal-unique-iso',
      cluster: 'cat.yoneda',
      type: 'proposition',
      label: '万有元素唯一到唯一同构',
      title: '命题：$(X,s)$ 与 $(X\',s\')$ 都万有 $\\implies$ 唯一的 $f : X \\cong X\'$ 带 $s$ 到 $s\'$',
      regions: ['category'],
      tags: ['命题', '万有元素', '表示', '米田引理'],
      statement: '若 $(X, s)$ 与 $(X\', s\')$ 都是函子 $F$ 的**万有元素**，则存在**唯一的同构** $f : X \\to X\'$ 使 $F(f)(s) = s\'$。',
      notes: '**证明。** 两个万有元素各自给出 $h_{X} \\cong F \\cong h_{X\'}$ ✓，由米田引理得唯一的同构 $X \\cong X\'$ ✓，而「把 $s$ 送到 $s\'$」正是这个同构在元素层的写法 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.23']
    },

    {
      id: 'prop.algebra-categories-limits',
      cluster: 'cat.algebra',
      type: 'proposition',
      label: '代数范畴里的极限与余极限',
      title: '命题：极限逐点算，余极限由自由构造加商给出',
      regions: ['category'],
      tags: ['命题', '极限', '余极限', '自由对象', '代数范畴'],
      statement: '$\\mathbf{Mon}$、$\\mathbf{Gr}$、$\\mathbf{Rng}$、$G\\text{-}\\mathbf{Set}$、$A\\text{-}\\mathbf{Mod}$、$k\\text{-}\\mathbf{Alg}$ 里的**极限逐点算**（忘到底集合就是集合的极限）；**余极限**由「先自由生成、再取商」给出 —— 例如 $\\mathbf{Gr}$ 里的余积是自由积。',
      notes: '**证明。** 这些遗忘函子都**保极限** ✓，所以极限 = 底层集合的极限配上由泛性质逐点给出的结构 ✓；余积则先把生成元自由地拼起来、再商掉关系 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.28']
    },

    {
      id: 'prop.cat-final-initial-products',
      cluster: 'cat.basic',
      type: 'proposition',
      label: 'Cat 的终始对象与有限积',
      title: '命题：$\\mathbf{Cat}$ 有终对象 $\\mathbf{1}$、始对象 $\\mathbf{0}$ 与积范畴',
      regions: ['category'],
      tags: ['命题', 'Cat', '终对象', '始对象', '积范畴'],
      statement: '$\\mathbf{Cat}$ 有**终对象**（单对象范畴 $\\mathbf{1}$）、有**始对象**（空范畴 $\\mathbf{0}$）、有**有限积**（积范畴 $\\mathcal{C} \\times \\mathcal{C}\'$）；并且 $\\operatorname{Op}(\\mathcal{C})$ 是域与余域函子 $\\operatorname{Mor}(\\mathcal{C}) \\rightrightarrows \\mathcal{C}$ 的**核**。',
      notes: '**证明。** 终/始对象与积范畴的泛性质逐条验证 ✓；「域 = 余域」正是两条函子的等化子 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.31']
    },

    {
      id: 'prop.bialgebra-examples',
      cluster: 'cat.algebra',
      type: 'proposition',
      label: '双代数的例子',
      title: '命题：$k[t]$ 与 $k[t,1/t]$ 都是双代数',
      regions: ['category'],
      tags: ['命题', '双代数', '幺半群对象', '余乘'],
      statement: '**双代数** = $k$-代数范畴的反范畴里的**幺半群**。$k[t]$ 带 $t \\mapsto t \\otimes 1 + 1 \\otimes t$、$k[t, 1/t]$ 带 $t \\mapsto t \\otimes t$ 都是双代数。',
      notes: '**证明。** 把「反范畴里的幺半群」翻译回 $k$-代数，就是「余乘 $\\Delta : A \\to A \\otimes A$ 是**代数同态**」✓；上面两个 $\\Delta$ 都保乘法 ✓（$k[t,1/t]$ 里 $t$ 可逆，所以只有 $t \\mapsto t \\otimes t$ 这一种选择）✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.50']
    },

    {
      id: 'prop.localization-functor-exact',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '允许右分式演算时局部化函子正合',
      title: '命题：右分式演算 $\\implies$ $Q : \\mathcal{C} \\to \\mathrm{ho}(\\mathcal{C})$ 正合',
      regions: ['category'],
      tags: ['命题', '局部化', '分式演算', '正合'],
      statement: '若 $\\mathcal{C}$ 关于 $W$ 容许**右分式演算**，则局部化函子 $Q : \\mathcal{C} \\to \\mathrm{ho}(\\mathcal{C})$ **正合**。',
      notes: '**证明。** 右分式演算说 $\\operatorname{Hom}_{\\mathrm{ho}}(X, Y)$ 是形如 $X \\xleftarrow{\\ w\\ } X\' \\xrightarrow{\\ f\\ } Y$（$w \\in W$）的分式的商 ✓，而 $Q$ 在这些 Hom 集上是满的、并与原范畴的映射交换 ✓，于是它保有限极限与有限余极限 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.54']
    },

    {
      id: 'prop.adjunction-naturality',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '伴随双射的自然性',
      title: '命题：$\\Phi$ 自然的显式写法',
      regions: ['category'],
      tags: ['命题', '伴随', '自然性', '单位与余单位'],
      statement: '伴随双射 $\\Phi_{X, X\'} : \\operatorname{Hom}\\bigl(F(X), X\'\\bigr) \\cong \\operatorname{Hom}\\bigl(X, G(X\')\\bigr)$ 的自然性说的是：对 $g : Y \\to X$、$g\' : X\' \\to Y\'$ 与 $f : F(X) \\to X\'$，有 $\\Phi\\bigl(g\' \\circ f \\circ F(g)\\bigr) = G(g\') \\circ \\Phi(f) \\circ g$。',
      notes: '**证明。** 代 $\\Phi(f) = G(f) \\circ \\eta_{X}$ 与 $\\Phi^{-1}(h) = \\varepsilon_{X\'} \\circ F(h)$ ✓，两边都用单位与余单位的自然性即得那条等式 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.55']
    },

    {
      id: 'prop.forgetful-adjoints-examples',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '遗忘函子的伴随',
      title: '命题：自由 $\\dashv$ 遗忘、层化 $\\dashv$ 含入、$k$-化 $\\dashv$ 含入',
      regions: ['category'],
      tags: ['命题', '伴随', '遗忘函子', '含入', '自由对象'],
      statement: '常见的一对对子：**自由 $\\dashv$ 遗忘**（$\\mathbf{Mon}$、$\\mathbf{Gr}$、$\\mathbf{Ab}$、$A\\text{-}\\mathbf{Mod}$……）、**层化 $\\dashv$ 含入**（$\\widetilde{\\mathcal{C}} \\hookrightarrow \\widehat{\\mathcal{C}}$）、**$k$-化 $\\dashv$ 含入**（$k\\mathbf{Top} \\hookrightarrow \\mathbf{Top}$）。一般规律：**「忘掉结构 / 放宽结构」的函子是右伴随，其左伴随即「自由地补上结构」**。',
      notes: '**证明。** 逐例核对万能性质：$\\operatorname{Hom}_{\\mathbf{Mon}}(\\text{自由幺半群},\\ G) \\cong \\operatorname{Hom}_{\\mathbf{Set}}(X, G)$ ✓；$\\operatorname{Hom}(T^{\\#}, F) \\cong \\operatorname{Hom}(T, F)$ ✓；$\\operatorname{Hom}_{k\\mathbf{Top}}(kX, Y) \\cong \\operatorname{Hom}_{\\mathbf{Top}}(X, Y)$ ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.56']
    },

    {
      id: 'prop.currying',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: 'Currying',
      title: '命题：$X \\mapsto X \\times Y \\;\\dashv\\; Z \\mapsto \\mathbf{Set}(Y, Z)$',
      regions: ['category'],
      tags: ['命题', 'Currying', '笛卡尔闭', '伴随'],
      statement: '在 $\\mathbf{Set}$ 里 $X \\mapsto X \\times Y$ **$\\dashv$** $Z \\mapsto \\mathbf{Set}(Y, Z)$：',
      notes: '**证明。** 给 $f : X \\times Y \\to Z$，令 $\\widehat{f}(x)(y) = f(x, y)$ ✓；反过来给 $g$ 令 $f(x,y) = g(x)(y)$ ✓ —— 两个方向互逆且自然 ✓，所以 $\\mathbf{Set}(X \\times Y, Z) \\cong \\mathbf{Set}\\bigl(X, \\mathbf{Set}(Y, Z)\\bigr)$ ✓。$\\mathbf{Cat}$（函子范畴）与 $\\mathbf{Ab}$ 里有同一套伴随 —— 这就是**笛卡尔闭**。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.57']
    },

    {
      id: 'prop.unit-counit-examples',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '常见伴随的单位与余单位',
      title: '命题：从单位/余单位读出忠实性',
      regions: ['category'],
      tags: ['命题', '单位', '余单位', '忠实'],
      statement: '几对常见伴随的单位：**自由 $\\dashv$ 遗忘** 的单位是「把 $x$ 送进生成元」；**层化 $\\dashv$ 含入** 的单位是 $T \\to T^{\\#}$；**$k$-化 $\\dashv$ 含入** 的单位是恒等（$X \\to kX$ 当 $X$ 已紧生成时）。由「余单位满 $\\iff$ 忠实」还能从单位/余单位读出忠实性。',
      notes: '**证明。** 逐例用 $\\eta_{X} = \\Phi(1_{FX})$、$\\varepsilon_{Y} = \\Phi^{-1}(1_{GY})$ 算即可 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.61']
    },

    {
      id: 'prop.copowers-give-adjoint',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '有余幂则可表示函子有伴随',
      title: '命题：$\\mathcal{C}$ 有余幂 $\\implies$ $X^{(I)} \\dashv h_{X}$',
      regions: ['category'],
      tags: ['命题', '余幂', '可表示函子', '伴随'],
      statement: '若小范畴 $\\mathcal{C}$ 有**余幂**，则每个可表示函子 $h_{X}$ 都有左伴随：$\\mathbf{Set} \\to \\mathcal{C},\\ I \\mapsto X^{(I)}$ **$\\dashv$** $h_{X} = \\operatorname{Hom}_{\\mathcal{C}}(X, -)$。',
      notes: '**证明。** 余幂的泛性质给出 $\\operatorname{Hom}_{\\mathcal{C}}\\bigl(X^{(I)}, Y\\bigr) \\cong \\operatorname{Hom}_{\\mathbf{Set}}\\bigl(I, \\operatorname{Hom}_{\\mathcal{C}}(X, Y)\\bigr) = \\mathbf{Set}\\bigl(I, h_{X}(Y)\\bigr)$ ✓，正是伴随的定义 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.62']
    },

    {
      id: 'prop.forgetful-preserves-limits',
      cluster: 'cat.algebra',
      type: 'proposition',
      label: '代数遗忘函子保极限',
      title: '命题：$\\mathbf{Mon}, \\mathbf{Gr}, \\mathbf{Rng}, \\ldots \\to \\mathbf{Set}$ 保所有极限',
      regions: ['category'],
      tags: ['命题', '遗忘函子', '极限', '代数理论'],
      statement: '$\\mathbf{Mon}$、$\\mathbf{Gr}$、$\\mathbf{Rng}$、$G\\text{-}\\mathbf{Set}$、$A\\text{-}\\mathbf{Mod}$、$k\\text{-}\\mathbf{Alg}$ 到 $\\mathbf{Set}$ 的遗忘函子都**保所有极限**。',
      notes: '**证明。** 这些结构都是「在集合上逐点给出运算 + 逐点验证等式」✓，于是极限图表的泛性质在底层集合上逐点成立，结构自动拼出 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.65']
    },

    {
      id: 'prop.forgetful-exactness',
      cluster: 'cat.algebra',
      type: 'proposition',
      label: '遗忘与含入函子的正合性',
      title: '命题：遗忘保极限不保余极限；层化正合',
      regions: ['category'],
      tags: ['命题', '正合性', '遗忘函子', '含入函子', '层化'],
      statement: '代数遗忘函子**保极限但不保余极限**；含入 $\\widetilde{\\mathcal{C}} \\hookrightarrow \\widehat{\\mathcal{C}}$ 保极限不保余极限，而它的左伴随（**层化**）**正合**。',
      notes: '**证明。** 保极限见「代数遗忘函子保极限」✓；不保余极限：$M \\oplus N$ 的底集合不是 $M \\sqcup N$ ✓；层化是左伴随又左正合，故正合 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.66']
    },

    {
      id: 'prop.reflection-criterion',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '反射的判据',
      title: '命题：$F$ 是反射 $\\iff$ 存在 $\\alpha_{X} : X \\to F(X)$，在 $\\mathcal{C}\'$ 上是同构',
      regions: ['category'],
      tags: ['命题', '反射子范畴', '单位', '全忠实'],
      statement: '设 $\\mathcal{C}\'$ 是 $\\mathcal{C}$ 的**满**子范畴、$F : \\mathcal{C} \\to \\mathcal{C}\'$。则 $F$ 是**反射** $\\iff$ 存在自然态射 $\\alpha_{X} : X \\to F(X)$（$X \\in \\mathcal{C}$），且 $X \\in \\mathcal{C}\'$ 时 $\\alpha_{X}$ 是**同构**。',
      notes: [
        '**证明。** ($\\Longrightarrow$) 取单位 $\\alpha = \\eta$ ✓；$X \\in \\mathcal{C}\'$ 时含入全忠实使 $\\eta_{X}$ 是同构（三角等式逼出逆）✓。',
        '($\\Longleftarrow$) 由 $\\alpha$ 的泛性，每个 $X \\to Y$（$Y \\in \\mathcal{C}\'$）唯一地穿过 $\\alpha_{X}$ ✓ —— 正是反射的泛性质 ✓。∎'
      ].join('\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.71']
    },

    {
      id: 'prop.coreflective-monoids-full',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '余反射子范畴上的幺半群',
      title: '命题：$\\mathcal{C}\'$ 余反射 $\\implies \\mathrm{Mon}(\\mathcal{C}\')$ 是 $\\mathrm{Mon}(\\mathcal{C})$ 的满子范畴',
      regions: ['category'],
      tags: ['命题', '余反射', '幺半群对象', '满子范畴'],
      statement: '若 $\\mathcal{C}\'$ 是 $\\mathcal{C}$ 的**余反射**子范畴，则 $\\mathrm{Mon}(\\mathcal{C}\')$ 是 $\\mathrm{Mon}(\\mathcal{C})$ 的**满子范畴**；$\\mathrm{Gr}$、$\\mathbf{Ab}$ 等同样。',
      notes: '**证明。** $\\mathcal{C}\'$ 是满子范畴，所以 $\\mathrm{Mon}(\\mathcal{C}\') \\to \\mathrm{Mon}(\\mathcal{C})$ 自动全忠实 ✓。结构能对上靠**余单位**：含入 $i$ 有右伴随 $r$（这就是余反射），于是 $\\mathcal{C}\'$ 里的积是 $G \\times_{\\mathcal{C}\'} G\' = r(G \\times_{\\mathcal{C}} G\')$ ✓，而 $\\varepsilon : i\\,r \\to 1$ 给出 $\\mathcal{C}$ 里的态射 $G \\times_{\\mathcal{C}\'} G\' \\to G \\times_{\\mathcal{C}} G\'$ —— 用它可以把 $\\mathcal{C}\'$ 里的乘法搬到 $\\mathcal{C}$ 里，反之亦然 ✓。∎',
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.72']
    },

    {
      id: 'prop.slice-covering-sieve',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '切片里的覆盖筛',
      title: '命题：$R$ 在 $\\mathcal{C}/T$ 里覆盖 $\\iff$ $\\hat j_{T!}R$ 在 $\\mathcal{C}$ 里是覆盖筛',
      regions: ['category'],
      tags: ['命题', '切片范畴', '覆盖筛', 'site 的态射'],
      statement: '设 $\\mathcal{C}$ 是 site、$T \\in \\widehat{\\mathcal{C}}$、$s \\in T(X)$。则 $s$ 上的一个筛 $R$ 在 $\\mathcal{C}/T$ 里是**覆盖** $\\iff$ $\\hat j_{T!}R$ 是 $X$ 在 $\\mathcal{C}$ 里的**覆盖筛**。',
      notes: [
        '**证明。** 两边都是「沿 $R$ 的余锥能不能覆盖」这件事的翻译 ✓：$\\mathcal{C}/T$ 里的覆盖由 $\\mathcal{C}$ 的覆盖沿 $j_{T}$ 拉来，而 $j_{T!}$ 正是把 $\\mathcal{C}/T$ 里的筛搬回 $\\mathcal{C}$ 的函子 ✓。',
        '⚠️ 但 $j_{T!}$ **一般不左正合** —— 所以这条给不出 site 的态射（这正是为什么后面要用 $j_{T}$ 的**余连续性**去造拓扑斯态射）。∎'
      ].join('\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.62']
    },

    {
      id: 'prop.spectral-sequence-page-picture',
      cluster: 'hom.spectral',
      type: 'proposition',
      label: '谱序列的页画在 (p,q) 平面上',
      title: '命题：$E_{0}, E_{1}, E_{2}$ 都是 $(p,q)$ 平面上的格点族',
      regions: ['homology'],
      tags: ['命题', '谱序列', '页', '微分'],
      statement: '谱序列的每一页 $E_{r}$ 都可以画成 $(p, q)$ 平面上的**格点族**（每个格点挂一个对象 $E^{p,q}_{r}$），而微分 $d_{r}$ 是从 $(p,q)$ 指向 $(p+r,\\, q-r+1)$ 的**斜向箭头**。于是 $E_{0}, E_{1}, E_{2}$ 只是同一张图上不同的「向量场」。',
      notes: [
        '**证明。** 逐项对定义：$E_{0}$ 的箭头是 $(p,q) \\to (p, q+1)$（纵向）✓；$E_{1}$ 的是 $(p,q) \\to (p+1, q)$（横向）✓；$E_{2}$ 的是 $(p,q) \\to (p+2, q-1)$（斜率 $-\\frac{1}{2}$）✓ —— 每翻一页箭头就转一次、同时「吃掉」更多格点 ✓。∎',
        '⭐ 用处：**第一象限**谱序列里，这条图画出来一眼就能看出哪些项会活到 $E_{\\infty}$（比如 $E^{0,q}$ 只可能被从左上来的箭头打到）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.28']
    }

  ],

  edges: [

    {
      id: 'def-link.freeobj-mon',
      kind: 'definition',
      definition: 'def.monoid-object',
      usedBy: 'prop.free-objects-examples',
      note: '自由对象要在这些代数范畴里造。'
    },
    {
      id: 'def-link.zmod-ring',
      kind: 'definition',
      definition: 'def.ring',
      usedBy: 'prop.zmod-is-ab',
      note: '命题把模与环和 Z-模、Z-代数对上。'
    },
    {
      id: 'def-link.fsections-section',
      kind: 'definition',
      definition: 'def.section-retraction',
      usedBy: 'prop.functor-preserves-sections',
      note: '保的就是截面与收缩。'
    },
    {
      id: 'def-link.morcat-slice',
      kind: 'definition',
      definition: 'def.slice-category',
      usedBy: 'def.mor-domain-codomain',
      note: '切片范畴那两个遗忘函子就在这里。'
    },
    {
      id: 'def-link.opcat-monoid',
      kind: 'definition',
      definition: 'def.monoid-object',
      usedBy: 'prop.op-category-is-modules',
      note: '带算子的对象就是「单对象 + 自同态」这套数据。'
    },
    {
      id: 'def-link.ffnotfull-ff',
      kind: 'definition',
      definition: 'def.ff-faithful',
      usedBy: 'prop.forgetful-faithful-not-full',
      note: '判定的是忠实与满。'
    },
    {
      id: 'def-link.natisoinv-equiv',
      kind: 'definition',
      definition: 'def.cat-equivalence',
      usedBy: 'prop.nat-iso-invariants',
      note: '等价性在自然同构下不变。'
    },
    {
      id: 'def-link.matcat-cat',
      kind: 'definition',
      definition: 'def.category',
      usedBy: 'prop.matrix-category',
      note: '要验的首先是一个小范畴。'
    },
    {
      id: 'def-link.forgetrepr-representable',
      kind: 'definition',
      definition: 'def.representable',
      usedBy: 'prop.forgetful-representable',
      note: '结论是「可表示」。'
    },
    {
      id: 'def-link.solutionrepr-representable',
      kind: 'definition',
      definition: 'def.representable',
      usedBy: 'prop.solution-functor-representable',
      note: '解集函子可表示。'
    },
    {
      id: 'def-link.univuniq-yoneda',
      kind: 'definition',
      definition: 'lem.yoneda',
      usedBy: 'prop.universal-unique-iso',
      note: '唯一性由米田引理给出。'
    },
    {
      id: 'def-link.algcatlim-limit',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.algebra-categories-limits',
      note: '说这些范畴里的极限余极限怎么算。'
    },
    {
      id: 'def-link.catfinal-final',
      kind: 'definition',
      definition: 'def.final-initial',
      usedBy: 'prop.cat-final-initial-products',
      note: '终对象与始对象在 Cat 里是谁。'
    },
    {
      id: 'def-link.bialg-monoid',
      kind: 'definition',
      definition: 'def.monoid-object',
      usedBy: 'prop.bialgebra-examples',
      note: '双代数就是反范畴里的幺半群。'
    },
    {
      id: 'def-link.locfunctor-localization',
      kind: 'definition',
      definition: 'def.localization',
      usedBy: 'prop.localization-functor-exact',
      note: '正合说的是局部化函子。'
    },
    {
      id: 'def-link.adjnat-adjoint',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.adjunction-naturality',
      note: '把伴随双射的自然性写成显式等式。'
    },
    {
      id: 'def-link.forgetadj-adjoint',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.forgetful-adjoints-examples',
      note: '一批常用伴随。'
    },
    {
      id: 'def-link.currying-adjoint',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.currying',
      note: 'Currying 就是一对伴随。'
    },
    {
      id: 'def-link.unitcounit-adjunit',
      kind: 'definition',
      definition: 'def.adjunction-unit',
      usedBy: 'prop.unit-counit-examples',
      note: '把各例的单位余单位算出来。'
    },
    {
      id: 'def-link.copowers-adjoint',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.copowers-give-adjoint',
      note: '余幂给出左伴随。'
    },
    {
      id: 'def-link.forgetlim-monoid',
      kind: 'definition',
      definition: 'def.monoid-object',
      usedBy: 'prop.forgetful-preserves-limits',
      note: '这些遗忘函子保极限。'
    },
    {
      id: 'def-link.forgetexact-exactfun',
      kind: 'definition',
      definition: 'def.exact-functor',
      usedBy: 'prop.forgetful-exactness',
      note: '讨论的是正合性。'
    },
    {
      id: 'def-link.reflectcrit-reflective',
      kind: 'definition',
      definition: 'def.reflective-subcategory',
      usedBy: 'prop.reflection-criterion',
      note: '给出反射的一个判据。'
    },
    {
      id: 'def-link.corefmon-monoid',
      kind: 'definition',
      definition: 'def.monoid-object',
      usedBy: 'prop.coreflective-monoids-full',
      note: '幺半群对象沿余反射子范畴的限制。'
    },
    {
      id: 'imp-link.slicetopos-slicecov',
      kind: 'implication',
      sources: ['prop.slice-topos'],
      target: 'prop.slice-covering-sieve',
      title: '切片拓扑斯 $\\implies$ 切片里的覆盖筛判据',
      proof: [
        '由「切片拓扑斯」那条，$j_{T}$ 余连续、$\\widetilde{\\mathcal{C}/T} \\simeq \\widetilde{\\mathcal{C}}/\\widetilde{T}$ ✓，于是 $\\mathcal{C}/T$ 里的覆盖就是 $\\mathcal{C}$ 的覆盖沿 $j_{T}$ 拉来的 ✓；把筛 $R$ 沿 $j_{T!}$ 推回去即得判据 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.sspage-ss',
      kind: 'definition',
      definition: 'def.spectral-sequence',
      usedBy: 'prop.spectral-sequence-page-picture',
      note: '把谱序列的页画在平面上。'
    }

  ]
});
