/* ==========================================================================
   内容包 · 实丛的示性类：Stiefel–Whitney · Euler · Pontryagin
   --------------------------------------------------------------------------
   承接 `def.characteristic-class`（定义与公理）与 170 包（陈–Weil 同态 + 陈类）。
   那一套是**复丛**的；实丛对应物是三种，本包补齐，并接上「结构群约化」那条线：

     Stiefel–Whitney 类（$\\mathbb{Z}/2$ 系数，$w_{1}$ 判可定向）
     Euler 类（$\\mathrm{Pfaffian}$，只在可定向丛上，顶维）
     Pontryagin 类（复化后取陈类）
     + 定向 当且仅当 $w_{1} = 0$（结构群可约化到 $\\mathrm{SO}(k)$）

   ⚠️ 本图口径：人名用汉字（陈类 / 陈省身），**欧美名字照惯例写拉丁**（Stiefel–Whitney、
      Pontryagin、Euler）—— 与 `Чебышёв 估计` 那种「用本人语言」的规则不冲突：
      那三条只在有本语写法时适用。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '实丛的示性类：Stiefel–Whitney · Euler · Pontryagin',

  nodes: [
    {
      id: 'def.stiefel-whitney-class',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: 'Stiefel–Whitney 类',
      title: 'Stiefel–Whitney 类：实向量丛的 $\\mathbb{Z}/2$ 示性类',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '示性类', 'Stiefel–Whitney', '可定向'],
      statement: [
        '**在做什么**：实向量丛的「$\\mathbb{Z}/2$ 版陈类」。系数取 $\\mathbb{Z}/2$ 是**被迫**的 —— 实丛的复化才带复结构，而 $w_{i}$ 要避开复数与符号（见注里的挠问题）。',
        '',
        '设 $E \\to B$ 是秩 $k$ 的实向量丛。$E$ 的 **Stiefel–Whitney 类**是一族',
        '',
        '$$w_{i}(E) \\in H^{i}(B; \\mathbb{Z}/2), \\qquad i = 0, 1, \\ldots, k ,$$',
        '',
        '由下列公理唯一确定：',
        '',
        '1. $w_{0} = 1$，$i > k$ 时 $w_{i} = 0$；',
        '2. **自然性**：$w_{i}(f^{*}E) = f^{*}w_{i}(E)$；',
        '3. **Whitney 乘积公式**：$w(E \\oplus E\') = w(E) \\smile w(E\')$，其中 $w = 1 + w_{1} + \\cdots$；',
        '4. **规范化**：线丛 $L$ 的 $w_{1}(L)$ 是 $H^{1}(B;\\mathbb{Z}/2)$ 里那个「定向双重覆叠」对应的类（等价地：非平凡实线丛的 $w_{1} \\ne 0$）。',
        '',
        '**最低一条的含义**：$w_{1}(E) = 0$ 当且仅当 $E$ **可定向**（见 `prop.orientable-iff-w1`）。'
      ].join('\n'),
      notes: [
        '**怎么算出来（与陈类对照）**：把实丛 $E$ 复化得 $E \\otimes \\mathbb{C}$，它是复丛，有陈类 $c_{i}$。**Pontryagin 类**取 $p_{i} = (-1)^{i}c_{2i}(E\\otimes\\mathbb{C})$；而 $w_{i}$ 是 $c_{i}$ 模 $2$ 的「影子」：$\\rho_{2}\\bigl(c_{i}(E\\otimes\\mathbb{C})\\bigr) = w_{i}(E)^{2}$（**次数要对**：$w_{i} \\in H^{i}$ 而 $c_{i} \\in H^{2i}$，所以是 $c_{i}$ 的模 $2$ 约化等于 $w_{i}$ 的**平方**，不是 $w_{i}$ 本身；公理版只是它的最小刻画）。⚠️ 严格陈述要用 Thom–Wu 或 Steenrod 平方才能把模 $2$ 讲清楚，本图不展开。',
        '**为什么系数是 $\\mathbb{Z}/2$ 而不是 $\\mathbb{Z}$**：实丛没有「复数相位」，其示性类天然带 $2$-挠。用 $\\mathbb{Z}$ 系数时 $p_{i}$ 只能取到偶次类、且丢掉奇次信息；这正是 $w_{2}$ 与 $p_{1}$ 分工的原因（$w_{2}$ 还能测「非 Spin」这类纯 $2$-挠现象）。',
        '⚠️ **$w_{i}$ 不能用来判同构**：它只给必要条件（$w \\ne w\' \\implies E \\not\\cong E\'$）。所有平凡丛的 $w$ 都是 $1$，但 $w = 1$ 的丛未必平凡。',
        '⚠️ **$w_{1}$ 与「定向」的等价是本图最常用的那条**：见 `prop.orientable-iff-w1`，它把「结构群可从 $\\mathrm{GL}(k)$ 约化到 $\\mathrm{SO}(k)$」翻译成一个上同调类的消失。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · Stiefel–Whitney 类', 'Bott–Tu, Differential Forms in Algebraic Topology']
    },

    {
      id: 'prop.orientable-iff-w1',
      cluster: 'diffgeom.manifold',
      type: 'proposition',
      label: '定向与 w1 消失',
      title: '命题：可定向 当且仅当第一 Stiefel–Whitney 类为零',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '可定向', 'Stiefel–Whitney', '结构群约化'],
      statement: [
        '**在做什么**：把「能不能定向」这个几何问题变成一个**上同调类是否为零**的代数判据 —— 这是示性类作为「约化障碍」的第一个实例。',
        '',
        '设 $E \\to B$ 是秩 $k$ 的实向量丛。则',
        '',
        '$$E\\ \\text{可定向} \\iff w_{1}(E) = 0 .$$',
        '',
        '**等价说法（结构群口径）**：$E$ 的结构群可从 $\\mathrm{GL}(k, \\mathbb{R})$ **约化**到 $\\mathrm{SO}(k)$（`def.structure-group`）。',
        '',
        '**对切丛**：$M$ 可定向（`def.orientable-manifold`）$\\iff$ $w_{1}(TM) = 0$。'
      ].join('\n'),
      notes: [
        '**为什么是 $w_{1}$ 而不是别的**：约化 $\\mathrm{GL}(k) \\rightsquigarrow \\mathrm{SO}(k)$ 等价于「转移函数（`def.transition-function`）可以全部取在 $\\mathrm{SO}(k)$ 里」，即行列式处处为正 —— 这只给 $\\mathrm{GL}^{+}(k)$；要再配纤维度量才能约化到 $\\mathrm{SO}(k)$（两步不等价：秩 $1$ 平凡丛取转移函数 $(2)$ 行列式为正但不在 $\\mathrm{SO}(1)$ 里）。而行列式取值 $\\pm 1$ 给出一个 $\\mathbb{Z}/2$-值上闭链 —— 那正是 $w_{1}$：它记的是「绕一圈回来符号是否翻转」。所以 $w_{1} = 0$ 就是「能统一符号」。',
        '⭐ **同一件事的三种说法**：$w_{1} = 0$ $\\iff$ $\\Lambda^{k}E^{*}$ 有处处非零的截面（$E = TB$ 时它正是体积形式，`def.orientable-manifold`）$\\iff$ 定向双重覆叠 $\\tilde B \\to B$ 分裂（有截面）。三者互为翻译，但**计算上只有第一条方便** —— 它就是这条命题的价值。',
        '⚠️ **$w_{1}$ 不为零的例子要能举**：$\\mathbb{RP}^{2}$ 的切丛 $w_{1} \\ne 0$（不可定向），$\\mathbb{RP}^{2}$ 上的 tautological 线丛 $w_{1} \\ne 0$。而 $S^{2}$、环面都可定向。',
        '⚠️ **Spin 与 Spin$^{c}$ 要分开**：丛**已定向**后，**Spin 结构 $\\iff w_{2} = 0$**（这是充要条件，不是先决条件）；**Spin$^{c}$ 结构**才多一条整系数条件 —— 障碍是 $W_{3} := \\beta w_{2}$（整系数 Bockstein），即 Spin$^{c} \\iff W_{3} = 0$。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 第一 Stiefel–Whitney 类与定向', 'Bott–Tu, Differential Forms in Algebraic Topology']
    },

    {
      id: 'def.euler-class',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: 'Euler 类',
      title: 'Euler 类：可定向实丛的顶维示性类',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', 'Euler 类', 'Pfaffian', 'Gauss–Bonnet'],
      statement: [
        '**在做什么**：可定向实丛上唯一一个「整系数、顶维」的示性类。它在曲面情形就是高斯曲率的积分（Gauss–Bonnet），在一般维数由 Pfaffian 给出。',
        '',
        '设 $E \\to B$ 是秩 $k = 2m$ 的**可定向**实向量丛（$w_{1}(E) = 0$，`prop.orientable-iff-w1`），配一个与定向相容的联络，曲率 $F$。**Euler 类**定义为',
        '',
        '$$e(E) := \\Bigl[\\, \\operatorname{Pf}\\Bigl(\\frac{F}{2\\pi}\\Bigr) \\,\\Bigr] \\in H^{2m}(B; \\mathbb{Z}) ,$$',
        '',
        '其中 $\\operatorname{Pf}$ 是 **Pfaffian**（对反对称矩阵 $A$ 定义 $\\operatorname{Pf}(A)^{2} = \\det A$，且 $\\operatorname{Pf}$ 在 $\\mathrm{SO}(k)$ 共轭下不变）。',
        '',
        '**基本性质**：',
        '',
        '1. **自然性**：$e(f^{*}E) = f^{*}e(E)$；',
        '2. **与 Pontryagin 类的关系**：$p_{m}(E) = e(E)^{2}$（$k = 2m$ 时）；\n\n$E$ **本身是复丛**时才有 $e(E) = c_{m}(E)$（实丛复化后 $c_{2m}(E\\otimes\\mathbb{C})$ 与 $e(E)^{2}$ 至多差一个符号，见注）；',
        '3. **Gauss–Bonnet（曲面情形）**：$\\Sigma$ 为闭可定向曲面时',
        '',
        '$$\\int_{\\Sigma} e(T\\Sigma) = \\chi(\\Sigma) ,$$',
        '',
        '右端是 Euler 示性数 —— 这就是 `thm.gauss-bonnet` 的上同调说法。'
      ].join('\n'),
      notes: [
        '**为什么用 Pfaffian 而不是行列式**：$\\det$ 在 $\\mathrm{SO}(k)$ 共轭下也不变，但它对反对称矩阵是**完全平方**，取 $\\sqrt{\\det}$ 有符号歧义；$\\operatorname{Pf}$ 对 $\\mathrm{SO}(k)$ 不变而**对 $\\mathrm{O}(k)$ 变号** —— 那个符号**正好**记的事「定向」。所以 Pfaffian 是唯一能把「定向」编码进去的不变多项式（`def.invariant-polynomial` 在 $\\mathfrak{o}(k)$ 上的版本）。',
        '⭐ **它为什么只在偶数秩时存在**：Pfaffian 只对偶数阶反对称矩阵有定义。$k$ 为奇数时 $e(E)$ 按定义为 $0$ —— 这与「奇数维闭流形的 Euler 示性数为零」（Poincaré 对偶的推论）一致。',
        '⚠️ **不要把 $e$ 直接当成 $c_{m}$**：无歧义的那条是 $p_{m}(E) = e(E)^{2}$；而复化丛上 $c_{2m}(E\\otimes\\mathbb{C})$ 与 $e(E)^{2}$ 之间可能差一个 $(-1)^{m}$（取决于曲率与 Pfaffian 的符号约定）。本图取 $\\operatorname{Pf}(F/2\\pi)$ 直接定义 $e$，不做换算。',
        '⚠️ **$e(E) \\ne 0$ 的用处**：它常用来证「某丛非平凡」。例如 $S^{2}$ 的切丛满足 $\\int e(T S^{2}) = 2 \\ne 0$，所以 $T S^{2}$ 不是平凡丛 —— 这是「$S^{2}$ 不能平行化」的示性类证明（比用 $\\chi = 2$ 更本质）。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · Euler 类', 'Bott–Tu, Differential Forms in Algebraic Topology']
    },

    {
      id: 'def.pontryagin-class',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: 'Pontryagin 类',
      title: 'Pontryagin 类：实丛复化之后的偶次陈类',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', 'Pontryagin 类', '示性类', '复化'],
      statement: [
        '**在做什么**：实丛一般没有「$\\mathbb{Z}$ 系数」的示性类 —— 例外是**可定向偶秩的顶维欧拉类** $e$（整系数、只在顶维）；$w_{i}$ 是 $\\mathbb{Z}/2$ 系数的，$p_{i}$ 要**复化之后**才取。取复化 $E \\otimes \\mathbb{C}$ 之后就有整系数陈类了 —— **取其中偶次的那几个**，就是 Pontryagin 类。',
        '',
        '设 $E \\to B$ 是秩 $k$ 的实向量丛。第 $i$ 个 **Pontryagin 类**定义为',
        '',
        '$$p_{i}(E) := (-1)^{i}\\, c_{2i}\\bigl(E \\otimes_{\\mathbb{R}} \\mathbb{C}\\bigr) \\in H^{4i}(B; \\mathbb{Z}) , \\qquad i = 1, 2, \\ldots , \\Bigl\\lfloor \\frac{k}{2} \\Bigr\\rfloor .$$',
        '',
        '**基本性质**：',
        '',
        '1. $p_{0} = 1$；',
        '2. **自然性**：$p_{i}(f^{*}E) = f^{*}p_{i}(E)$；',
        '3. **Whitney 乘积公式**（模 $2$-挠才严格成立）$p(E \\oplus E\') = p(E) \\smile p(E\')$；',
        '4. **复丛的实化**：若 $E = F_{\\mathbb{R}}$ 是复丛 $F$ 的实化，则 $p_{i}(F_{\\mathbb{R}}) = (-1)^{i}\\, c_{2i}(F \\oplus \\overline{F})$（**一般不是** $c_{i}(F)^{2}$；对线丛 $F$ 才有 $p_{1}=c_{1}^{2}$，秩 $m$ 复丛的顶类 $p_{m}=c_{m}^{2}$；例：$F = \\mathcal{O}(1) \\to \\mathbb{CP}^{2}$ 时 $p_{1} = c_{1}^{2} = h^{2}$）。**$p$ 丢掉了 $c$ 的奇次信息**，这正是「实化丢相位」的表现。'
      ].join('\n'),
      notes: [
        '**为什么只取偶次**：复化 $E\\otimes\\mathbb{C}$ 带一个**共轭**结构（把 $i$ 变成 $-i$），于是 $c_{2i+1}(E\\otimes\\mathbb{C}) = -c_{2i+1}$ 型地成对抵消（在 $\\mathbb{Z}$ 系数下变成 $2$-挠元）。所以整系数里只剩偶次是真不变量，奇次的信息要用 $\\mathbb{Z}/2$ 的 $w_{i}$ 去补 —— **这就是 $w$ 与 $p$ 的分工**。',
        '⚠️ **$S^{4}$ 反而是「$p_{1}$ 为零」的例子**：$S^{4}$ 稳定可平行化（$TS^{4} \\oplus \\underline{\\mathbb{R}} \\cong \\underline{\\mathbb{R}}^{5}$），故 $p_{1}(TS^{4}) = 0$；它非平凡要靠 Euler 类检出（$e(TS^{4}) = \\chi(S^{4}) = 2 \\ne 0$）。更著名的是 $\\mathbb{CP}^{2}$ 的 $p_{1}$ 与符号差定理（signature theorem）：$\\sigma(M) = \\frac{1}{3}\\int p_{1}$（四维闭可定向流形），这是 Hirzebruch 指标定理的特例。',
        '⚠️ **Whitney 公式的 $2$-挠警告**：$p(E\\oplus E\') = p(E)p(E\')$ 在 $H^{*}(B;\\mathbb{Z})$ 里**只对模 $2$-挠**成立（严格版要写到 $H^{*}(B;\\mathbb{Z})/\\text{挠}$，或用 $\\mathbb{Z}[1/2]$ 系数）。这一点与陈类形成鲜明对照（陈类的 Whitney 公式是无条件的）—— 因为复化会引入 $2$-挠。',
        '⚠️ **三种实示性类的角色**：$w_{i}$（$\\mathbb{Z}/2$，全维数、能测定向与 Spin）、$e$（$\\mathbb{Z}$，只在可定向且偶数秩、顶维）、$p_{i}$（$\\mathbb{Z}$，$4$ 的倍数维、丢奇次信息）。三者不互相包含 —— 判断某个实丛非平凡时，可能要几种一起用。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · Pontryagin 类', 'Bott–Tu, Differential Forms in Algebraic Topology']
    }
  ],

  edges: [
    { id: 'dep-sw-cc', kind: 'definition', definition: 'def.characteristic-class', usedBy: 'def.stiefel-whitney-class',
      note: 'Stiefel–Whitney 类是实丛的示性类，满足自然性与同构不变。' },
    { id: 'dep-sw-vector', kind: 'definition', definition: 'def.vector-bundle', usedBy: 'def.stiefel-whitney-class',
      note: '定义在实向量丛上。' },
    { id: 'dep-sw-w1', kind: 'definition', definition: 'def.stiefel-whitney-class', usedBy: 'prop.orientable-iff-w1',
      note: '命题的主语就是 $w_1$。' },
    { id: 'dep-w1-orient', kind: 'definition', definition: 'def.orientable-manifold', usedBy: 'prop.orientable-iff-w1',
      note: '结论翻译成「流形可定向」（切丛的 $w_1$ 为零）。' },
    { id: 'dep-w1-sg', kind: 'definition', definition: 'def.structure-group', usedBy: 'prop.orientable-iff-w1',
      note: '等价说法是「结构群可从 $\\mathrm{GL}(k)$ 约化到 $\\mathrm{SO}(k)$」。' },
    { id: 'dep-w1-tf', kind: 'definition', definition: 'def.transition-function', usedBy: 'prop.orientable-iff-w1',
      note: '证明看的是转移函数的行列式符号。' },

    { id: 'dep-ec-cw', kind: 'definition', definition: 'thm.chern-weil', usedBy: 'def.euler-class',
      note: 'Euler 类用陈–Weil 同态算：把 Pfaffian 当成不变多项式。' },
    { id: 'dep-ec-ip', kind: 'definition', definition: 'def.invariant-polynomial', usedBy: 'def.euler-class',
      note: '$\\operatorname{Pf}$ 是 $\\mathfrak{o}(k)$ 上的不变多项式。' },
    { id: 'dep-ec-sw', kind: 'definition', definition: 'prop.orientable-iff-w1', usedBy: 'def.euler-class',
      note: 'Euler 类只在可定向（$w_1 = 0$）时定义。' },
    { id: 'dep-ec-gb', kind: 'definition', definition: 'thm.gauss-bonnet', usedBy: 'def.euler-class',
      note: '曲面情形 $\\int e(T\\Sigma) = \\chi(\\Sigma)$ 正是 Gauss–Bonnet。' },

    { id: 'dep-pc-cc', kind: 'definition', definition: 'def.chern-class', usedBy: 'def.pontryagin-class',
      note: 'Pontryagin 类是「复化后的偶次陈类」。' },
    { id: 'dep-pc-vector', kind: 'definition', definition: 'def.vector-bundle', usedBy: 'def.pontryagin-class',
      note: '定义在实向量丛上（复化之后再取陈类）。' },
    { id: 'dep-pc-sw', kind: 'definition', definition: 'def.stiefel-whitney-class', usedBy: 'def.pontryagin-class',
      note: '整系数的 $p_i$ 丢掉奇次信息，那部分要由 $w_i$ 补 —— 两者分工。' }
  ]
});
