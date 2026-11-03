/* ==========================================================================
   内容包 · 泛函分析（二）：Baire 纲与三大定理 · C(K) 与 Stone–Weierstrass
   --------------------------------------------------------------------------
   与 `161-functional-analysis.js` 同属「泛函分析」领域，拆成两个包只是为了文件别太大：
     161 = 赋范空间与有界算子 + Hilbert 空间（09-28 / 10-12 两份讲义）
     162 = Baire 纲与三大定理 + C(K) 与 Stone–Weierstrass（10-19 / 10-26 两份讲义）

   ⚠️ 讲义写到「一致有界原理」结束；**开映射 / 逆算子 / 闭图像** 三条是用户点名要补的，
      按 Baire 之后的标准路线写，标「骨架」的地方就是没逐字展开的地方。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '泛函分析：Baire 纲与 C(K)',

  nodes: [

    /* ============================================================ Baire 纲 */
    {
      id: 'def.nowhere-dense',
      cluster: 'fa.baire',
      type: 'definition',
      label: '无处稠密',
      title: '无处稠密集',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '拓扑学'],
      statement: [
        '设 $A \\subseteq X$ 是拓扑空间。称 $A$ **无处稠密**（nowhere dense），若 $(\\overline{A})^\\circ = \\emptyset$；等价地：每个非空开集都含一个非空开子集与 $A$ 不交。'
      ].join('\n'),
      notes: [
        '⚠️ 「无处稠密」不是「不稠密」：$(0,1) \\cup (1,2)$ 在 $\\mathbb{R}$ 里既不稠密也无处稠密 —— 它要求「连闭包都没肉」。',
        '例：$\\mathbb{Z} \\subseteq \\mathbb{R}$、$\\{1/n\\}$、Cantor 集。',
        '⭐ Cantor 集是最有教育意义的例子：它**无处稠密**却**不可数**。所以「无处稠密」与「基数小」是两件事。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'def.meager-set',
      cluster: 'fa.baire',
      type: 'definition',
      label: '第一纲 / 第二纲',
      title: '第一纲集、第二纲集与剩余集',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '拓扑学'],
      statement: [
        '$A \\subseteq X$ 叫**第一纲集**（meager，贫集），若 $A$ 可写成可数个无处稠密集之并；不是第一纲的叫**第二纲集**。称 $A$ **剩余**（residual），若 $A^c$ 第一纲。'
      ].join('\n'),
      notes: [
        '「纲」是「大小」的第三种口径，既不是基数也不是测度：$\\mathbb{Q}$ 可数、稠密但是第一纲（每个单点无处稠密）；Cantor 集不可数、测度为零但是第一纲（它本身无处稠密）；$[0,1] \\setminus \\mathbb{Q}$ 是第二纲且剩余。',
        '⚠️ 第二纲 $\\ne$ 稠密：$[0,1] \\cup \\{2\\}$ 也是第二纲。',
        '⭐ 用法：想说「几乎所有点都满足 $P$」，就去证 $\\{x : \\neg P(x)\\}$ 第一纲。在无穷维里这比测度论更顺手（很多函数空间没有自然测度，但有 Baire 纲）。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'def.g-delta',
      cluster: 'fa.baire',
      type: 'definition',
      label: 'G_δ 与 F_σ',
      title: '$G_\\delta$ 集与 $F_\\sigma$ 集',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '拓扑学'],
      statement: [
        '$A$ 叫 **$G_\\delta$ 集**，若 $A$ 是可数个开集之交；叫 **$F_\\sigma$ 集**，若 $A$ 是可数个闭集之并。'
      ].join('\n'),
      notes: [
        '在度量空间里单点闭、开集是可数多个球的并，所以「闭 $\\subseteq F_\\sigma$」「开 $\\subseteq G_\\delta$」。',
        '⭐ Baire 之后，「稠密 $G_\\delta$」是「几乎全部的点」的标准写法：连续点集、可微点集、$C[0,1]$ 里无处可微函数的全体，全是稠密 $G_\\delta$。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'thm.baire',
      cluster: 'fa.baire',
      type: 'theorem',
      label: 'Baire 纲定理',
      title: 'Baire 纲定理',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '完备性', '三大定理'],
      statement: [
        '设 $X$ 是完备度量空间（或局部紧 Hausdorff 空间）。则可数个稠密开集之交仍**稠密**。等价地：',
        '',
        '1. 可数个无处稠密闭集之并的内部为空；',
        '2. 每个非空开集都是**第二纲**的。'
      ].join('\n'),
      notes: [
        '证法（球套法）分四步：\n\n' +
        '1. **起点**：记 $B_0 := B(x, \\varepsilon)$。\n\n' +
        '$O_1$ 稠密开 $\\implies$ $B_0 \\cap O_1$ 是非空开，于是可取 $x_1$ 与 $\\varepsilon_1 < \\min(\\varepsilon/2,\\ 1)$ 使\n\n' +
        '$$\\overline{B(x_1, \\varepsilon_1)} \\subseteq B(x, \\varepsilon) \\cap O_1 .$$\n\n' +
        '2. **归纳**：已取 $x_n, \\varepsilon_n$（且 $\\varepsilon_n < 1/n$）。\n\n' +
        '由 $O_{n+1}$ 稠密开，$B(x_n, \\varepsilon_n) \\cap O_{n+1}$ 仍是非空开，取\n\n' +
        '$$\\overline{B(x_{n+1}, \\varepsilon_{n+1})} \\subseteq B(x_n, \\varepsilon_n) \\cap O_{n+1}, \\qquad \\varepsilon_{n+1} < \\frac{1}{n+1} .$$\n\n' +
        '3. **嵌套闭球取点**：半径 $\\varepsilon_n \\to 0$，而 $X$ 完备，于是 $\\bigcap_n \\overline{B(x_n, \\varepsilon_n)} \\ne \\emptyset$，取其中一点 $y$。\n\n' +
        '（这里「半径趋于 $0$」不能省：完备性只保证半径趋于 $0$ 的嵌套闭球有公共点。）\n\n' +
        '4. **收尾**：对每个 $n$，$y \\in \\overline{B(x_n, \\varepsilon_n)} \\subseteq B_0 \\cap O_n$，所以 $y \\in B_0$ 且 $y \\in \\bigcap_n O_n$。\n\n' +
        '$B_0$ 是任取的，于是 $\\bigcap_n O_n$ 与每个非空开集相交 ，故稠密。\n\n' +
        '∎',
        '⭐ 三种等价写法都要会用，转换只需取补集。',
        '⚠️ 完备性不能去掉：$\\mathbb{Q}$ 上每个单点闭且无处稠密，$\\mathbb{Q}$ 可数，故 $\\mathbb{Q}$ 是第一纲 —— 它不是 Baire 空间。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）', 'Baire 1899'],
    },
    {
      id: 'thm.locally-compact-baire',
      cluster: 'fa.baire',
      type: 'theorem',
      label: '局部紧 Hausdorff 是 Baire',
      title: '局部紧 Hausdorff 空间是 Baire 空间',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '拓扑学'],
      statement: ['局部紧 Hausdorff 空间是 Baire 空间。'].join('\n'),
      notes: [
        '证法与完备度量情形同构，只把「嵌套闭球半径 $\\to 0$」换成「嵌套紧邻域」：交非空由紧集的**有限交性质**保证（不需要半径趋于零）。',
        '⭐ 意义：这条把 Baire 纲从「度量」里解放出来，于是它能用在 $C(K)$、紧群、Stone 空间这些非度量对象上 —— 凝聚态数学里的紧 Hausdorff 空间因此也能用「一般点」论证。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'prop.baire-characterizations',
      cluster: 'fa.baire',
      type: 'proposition',
      label: 'Baire 的三条等价刻画',
      title: 'Baire 空间的等价刻画与「纲的用法」',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '拓扑学'],
      statement: [
        '下列**等价**：',
        '',
        '1. $X$ 是 Baire 空间（可数个稠密开集之交稠密）；',
        '2. $X$ 的每个非空开集是第二纲的；',
        '3. 可数个无处稠密闭集之并不含非空开集（内部为空）。'
      ].join('\n'),
      notes: [
        '三条就是同一条取补集：稠密开 $\\leftrightarrow$ 无处稠密闭、交 $\\leftrightarrow$ 并、「稠密」$\\leftrightarrow$「内部为空」。',
        '⭐ **纲的用法（讲义原话）**：要证「满足性质 $P$ 的点存在」，就去证 $\\{x : P(x)\\}$ 是**稠密 $G_\\delta$**。这样拿到的不只是「存在」，而是「几乎处处存在」（generic）。',
        '⚠️ (2) 里的「第二纲」作用对象是**非空开集**，不是任意集合。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'thm.baire-open-subset',
      cluster: 'fa.baire',
      type: 'theorem',
      label: 'Baire 的开子集是 Baire',
      title: 'Baire 空间的开子集仍是 Baire 空间',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '拓扑学'],
      statement: [
        '$X$ Baire、$\\Omega \\subseteq X$ 开 $\\implies$ $\\Omega$（带子空间拓扑）是 Baire 空间。'
      ].join('\n'),
      notes: [
        '证法：设 $O_n$ 在 $\\Omega$ 里稠密开，写 $O_n = \\Omega \\cap O_n\'$（$O_n\'$ 在 $X$ 中开）。\n\n' +
        '则 $O_n\' \\cup \\Omega^c$ 在 $X$ 中**稠密开**；\n\n' +
        '于是 $\\bigcap_n(O_n\' \\cup \\Omega^c)$ 在 $X$ 稠密，与 $\\Omega$ 相交得 $\\bigcap_n O_n$ 在 $\\Omega$ 稠密。',
        '⭐ 用处：开映射定理要在开集上做局部论证、UBP 要看开子集，这条保证「局部化之后 Baire 性质不丢」。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'lem.countable-closed-cover',
      cluster: 'fa.baire',
      type: 'lemma',
      label: '闭覆盖的内点',
      title: '可数个闭集覆盖 $X$ $\\implies$ 内点之并稠密',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '三大定理'],
      statement: [
        '设 $X$ 是 Baire 空间，$F_n \\subseteq X$ 闭，且 $X = \\bigcup_n F_n$。则 $\\bigcup_n \\operatorname{int} F_n$ 在 $X$ 中**稠密**。特别地，至少有一个 $F_n$ 有非空内部。'
      ].join('\n'),
      notes: [
        '这是把「有一块闭集能被盖住」变成「有一个球里的东西一致地被控制」—— 正是 UBP 与开映射定理要的那一句。',
        '它的对偶写法是「可数个无处稠密闭集之并不含非空开集」，两条是同一件事的两面。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'thm.pointwise-limit-continuity',
      cluster: 'fa.baire',
      type: 'theorem',
      label: '连续点集是稠密 G_δ',
      title: '连续函数点态极限的连续点集',
      regions: ['functional-analysis'],
      tags: ['Baire 纲', '连续'],
      statement: [
        '设 $X$ 是 Baire 空间，$f_n : X \\to E$ 连续（$E$ 度量），且 $f_n \\to f$ **逐点**。则',
        '',
        '$$\\operatorname{cont}(f) := \\{x : f \\text{ 在 } x \\text{ 连续}\\}$$',
        '',
        '是**稠密 $G_\\delta$**。特别地 $f$ 至少在一个稠密 $G_\\delta$ 上连续。'
      ].join('\n'),
      notes: [
        '证法（骨架）：令 $F_{n,k} = \\{x : \\|f_i(x) - f_j(x)\\| \\le 1/k\\ (\\forall i, j \\ge n)\\}$，它是闭集且 $X = \\bigcup_n F_{n,k}$；\n\n由 Baire，$O_k := \\bigcup_n \\operatorname{int} F_{n,k}$ 稠密开。\n\n令 $O := \\bigcap_k O_k$（稠密 $G_\\delta$），在 $O$ 上用「$x$ 落在一个 $\\operatorname{int} F_{n,k}$ 里 $\\implies$ 邻域上 $f_n$ 一致接近」得连续性。',
        '⚠️ 逐点极限**不必**连续（$f_n(x) = x^n$ 在 $[0,1]$ 上）；它只是「连续点很多」。',
        '⭐ 同一模板的经典产物：$C[0,1]$ 里「处处不可微」的函数构成稠密 $G_\\delta$（Banach 1931）。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'thm.ubp',
      cluster: 'fa.baire',
      type: 'theorem',
      label: '共鸣定理',
      title: '共鸣定理（一致有界原理 / Banach–Steinhaus）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '三大定理', 'Baire 纲'],
      statement: [
        '设 $E$ 是 Banach 空间，$F$ 赋范，$\\{u_i\\}_{i \\in I} \\subseteq B(E, F)$。若对每个 $x \\in E$，',
        '',
        '$$\\sup_{i \\in I} \\|u_i(x)\\| < \\infty \\qquad (\\text{逐点有界}) ,$$',
        '',
        '则 $\\displaystyle \\sup_{i \\in I}\\|u_i\\| < \\infty$（**一致**有界）。'
      ].join('\n'),
      notes: [
        '证法：令 $F_k = \\{x : \\sup_i \\|u_i x\\| \\le k\\} = \\bigcap_i \\{x : \\|u_i x\\| \\le k\\}$，每个 $\\{x : \\|u_i x\\| \\le k\\}$ 闭（$u_i$ 连续），故 $F_k$ 闭；\n\n逐点有界 $\\implies E = \\bigcup_k F_k$。\n\n由 Baire（闭覆盖有内点），某个 $F_k$ 含球 $B(x_0, r)$。\n\n于是对 $\\|x\\| \\le r$：$\\sup_i \\|u_i x\\| \\le \\sup_i \\|u_i(x + x_0)\\| + \\sup_i \\|u_i x_0\\| \\le 2k$，取 $x = r y/\\|y\\|$ 得 $\\|u_i y\\| \\le 2k\\|y\\|/r$，故 $\\sup_i\\|u_i\\| \\le 2k/r$。',
        '⭐ **名字**：讲义与很多中文书叫它「共鸣定理」（resonance theorem），也叫「一致有界原理」；本图两个都收进别名。三大定理里它**只要求 $E$ 完备**（$F$ 只要赋范），是最「便宜」的一条。',
        '⚠️ $E$ 完备不能去掉：$E = c_{00}$（有限支撑序列）时取 $u_n(x) = n x_n$，逐点有界而 $\\|u_n\\| = n \\to \\infty$。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）', 'Banach–Steinhaus 1927'],
    },
    {
      id: 'cor.ubp-resonance',
      cluster: 'fa.baire',
      type: 'corollary',
      label: '共振集是稠密 G_δ',
      title: '共振集：一致无界 $\\implies$ 发散点稠密',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '三大定理', 'Baire 纲'],
      statement: [
        '设 $E$ Banach，$F$ 赋范，$u_n \\in B(E, F)$，且 $\\sup_n \\|u_n\\| = \\infty$。则',
        '',
        '$$R := \\Bigl\\{ x \\in E : \\sup_n \\|u_n(x)\\| = \\infty \\Bigr\\}$$',
        '',
        '是**稠密 $G_\\delta$**（特别地非空）。'
      ].join('\n'),
      notes: [
        '证法：令 $\\Omega_k = \\{x : M(x) = \\sup_i\\|u_i x\\| > k\\} = \\bigcup_i \\{x : \\|u_i x\\| > k\\}$，是开集；\n\n$R = \\bigcap_k \\Omega_k$ 是 $G_\\delta$。\n\n若某个 $\\Omega_k$ 不稠密，则存在球 $B(x_0, r) \\subseteq \\Omega_k^c$，球上 $M \\le k$，用与 UBP 同样的平移 + 伸缩得 $\\sup_i\\|u_i\\| \\le 2k/r$，矛盾。',
        '⭐ 意义：「发散」不是个别点，而是**几乎处处**。经典应用：Fourier 级数部分和算子满足 $\\|S_N\\| \\to \\infty$，于是**存在**连续函数其 Fourier 级数在某点发散（du Bois-Reymond 1876）—— 而且这样的函数「很多」。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, Ch. 2（Baire 纲与三大定理）'],
    },
    {
      id: 'thm.open-mapping-banach',
      cluster: 'fa.baire',
      type: 'theorem',
      label: '开映射定理（Banach 版）',
      title: '开映射定理：满射有界算子把开集映成开集',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '三大定理', '开映射', 'Baire 纲'],
      statement: [
        '设 $E, F$ 是 Banach 空间，$u \\in B(E, F)$ **满射**。则 $u$ 是开映射：开集的像是开集。',
        '由 $u$ 线性，这等价于「$0$ 的某邻域的像是 $0$ 的邻域」，即存在 $r > 0$ 使',
        '$$u(B_E) \\supseteq r\\, B_F ,$$',
        '其中 $B_E, B_F$ 是闭单位球。更弱的假设也够：$u(E)$ 在 $F$ 中第二纲即可（$F$ 完备时满射自动满足，故通常只写满射）。'
      ].join('\n'),
      notes: [
        '**证明。** 分两步：先用纲定理把「像」撑到含一个球（此时只用到 $E$ 完备），再用 $E$ 的完备性把闭包去掉。',
        '**第一步：$\\overline{u(B_E)}$ 含 $0$ 的邻域。** 因为 $E = \\bigcup_{k \\ge 1} k\\,B_E$，作用 $u$ 得',
        '$$F = u(E) = \\bigcup_{k \\ge 1} u(k B_E) \\subseteq \\bigcup_{k \\ge 1} \\overline{u(k B_E)} .$$',
        '若每个 $\\overline{u(k B_E)}$ 都无处稠密，$F$ 就是可数个无处稠密集之并，与「$F$ 完备 $\\implies$ 第二纲」矛盾。所以某个 $k$ 使 $\\overline{u(k B_E)}$ 含内点：存在 $y_0$ 与 $\\delta > 0$ 使 $B_F(y_0, \\delta) \\subseteq \\overline{u(k B_E)}$。',
        '把这一点搬回原点。取 $x_0 \\in k B_E$ 使 $\\|y_0 - u(x_0)\\| < \\delta/2$（$y_0$ 在闭包里，故可这样逼近），则对任意 $\\|z\\| < \\delta/2$ 有 $y_0 + z \\in \\overline{u(k B_E)}$，于是 $z = (y_0 + z) - u(x_0) + (u(x_0) - y_0)$ 落在 $\\overline{u(kB_E)} - u(x_0) + B(0,\\delta/2)$ 里；而 $u(kB_E) - u(x_0) = u(kB_E - x_0) \\subseteq u(2k B_E)$（$x_0 \\in kB_E$）。合并得',
        '$$\\overline{u(2k\\, B_E)} \\supseteq B_F(0, \\delta/2) ,$$',
        '再由齐次性（两边同时除以 $2k$）得到：存在 $r = \\delta/(4k) > 0$ 使',
        '$$\\overline{u(B_E)} \\supseteq 2r\\, B_F .$$',
        '**第二步：把闭包去掉。** 要证 $u(B_E) \\supseteq r B_F$。取 $\\|y\\| < r$。由第一步，$\\overline{u(B_E)} \\supseteq 2r B_F$，故 $y \\in \\overline{u(B(0, 1/2))}$：存在 $x_1$，$\\|x_1\\| < 1/2$，使 $\\|y - u(x_1)\\| < r/2$。对 $y - u(x_1)$（范数 $< r/2 < r$）重复同一论证，得 $x_2$，$\\|x_2\\| < 1/4$，使 $\\|y - u(x_1) - u(x_2)\\| < r/4$。如此得到 $(x_n)$，满足',
        '$$\\|x_n\\| < 2^{-n}, \\qquad \\Bigl\\| y - u\\Bigl(\\sum_{j \\le n} x_j\\Bigr) \\Bigr\\| < r\\,2^{-n} .$$',
        '因为 $\\sum \\|x_n\\| < 1$ 而 $E$ **完备**，级数 $x := \\sum_{n} x_n$ 收敛，且 $\\|x\\| < 1$。又 $u$ 连续，故 $u(x) = \\lim_n u(\\sum_{j\\le n} x_j) = y$。于是 $y = u(x)$ 且 $\\|x\\| < 1$，即 $y \\in u(B_E)$。',
        '**第三步：收尾。** 任取开集 $\\Omega \\subseteq E$ 与 $x \\in \\Omega$，取 $\\rho > 0$ 使 $B(x, \\rho) \\subseteq \\Omega$。由齐次性 $u(B(x,\\rho)) = u(x) + \\rho\\, u(B_E) \\supseteq u(x) + \\rho r B_F$，这是 $u(x)$ 的一个邻域，含于 $u(\\Omega)$。故 $u(\\Omega)$ 开。$\\square$',
        '**两条假设各管什么。** $F$ 完备只用在第一步（要纲定理）；$E$ 完备只用在第二步（要级数收敛）。两个缺一不可：$E$ 不完备时恒等映射 $(C[0,1], \\|\\cdot\\|_\\infty) \\to (C[0,1], \\|\\cdot\\|_1)$ 是连续双射但不开；$F$ 不完备的反例见闭图像定理那一条的注。',
        '**与闭图像定理的关系。** 第二步的「完备性去掉闭包」是这条定理真正的技术核心；闭图像定理反过来把它当工具用（先证 $\\pi_1^{-1}$ 有界，再用它得到 $u$ 有界）。所以这两条不是彼此独立的：**开映射 $\\implies$ 逆算子 $\\implies$ 闭图像**。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, 2.11']
    },
    {
      id: 'thm.bounded-inverse',
      cluster: 'fa.baire',
      type: 'theorem',
      label: '逆算子定理',
      title: '逆算子定理：双射有界算子的逆也有界',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '三大定理', '开映射', '逆算子'],
      statement: [
        '设 $E, F$ 是 Banach 空间，$u \\in B(E, F)$ 是**双射**。则 $u^{-1} : F \\to E$ 也是有界线性算子，即 $u$ 是同胚。'
      ].join('\n'),
      notes: [
        '**证明。** $u^{-1}$ 线性是显然的（$u$ 线性且双射），只需证它连续。由开映射定理，$u$ 把开集映成开集；而 $(u^{-1})^{-1}(\\text{开}) = u(\\text{开})$，所以 $u^{-1}$ 连续。等价地看球：开映射定理给出 $u(B_E) \\supseteq r B_F$，两边取 $u^{-1}$ 得 $u^{-1}(r B_F) \\subseteq B_E$，即 $\\|u^{-1} y\\| \\le r^{-1}\\|y\\|$。$\\square$',
        '**为什么这条值得单独记。** 一般拓扑里「连续 + 双射」远不足以保证「逆连续」（同胚比连续双射强得多）。这条定理说的是：在**完备赋范空间**这个设定里，双射线性映射的逆自动连续 —— 也就是说「连续双射线性映射」与「同胚」在这里是同一个条件。注意这并不是因为 $u$ 有什么特殊性，而是因为**定义域和靶子都完备**：去掉任一端的完备性就会出反例。',
        '**与「逆映射定理」不是同一条。** `thm.inverse-function-banach` 是**非线性**的：局部地，$f\'(a)$ 可逆（且 $f$ 连续可微）就给出 $f$ 在 $a$ 附近的局部微分同胚，证明用压缩映射原理；这一条是**线性双射**的整体命题，证明用的是 Baire 纲。中文文献里两者都常被叫作「逆映射定理 / 逆算子定理」，读的时候看假设：出现导数就是前者，出现「双射线性」就是后者。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, 2.12']
    },
    {
      id: 'thm.closed-graph',
      cluster: 'fa.baire',
      type: 'theorem',
      label: '闭图像定理',
      title: '闭图像定理：图像闭的线性映射连续',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '三大定理', '闭图像'],
      statement: [
        '设 $E, F$ 是 Banach 空间，$u : E \\to F$ 线性。若 $u$ 的图像',
        '$$G(u) := \\{(x, u(x)) : x \\in E\\}$$',
        '在乘积空间 $E \\times F$ 中**闭**，则 $u$ 有界（从而连续）。',
        '把乘积拓扑的收敛展开，判据就是一句话：对任意序列 $x_n \\to x$，若 $u(x_n) \\to y$，则必有 $y = u(x)$。'
      ].join('\n'),
      notes: [
        '**证明。** $E \\times F$ 完备（两个完备空间的积完备），而 $G(u)$ 是它的闭子集，故 $G(u)$ 本身是 Banach 空间。两个投影',
        '$$\\pi_1 : G(u) \\to E,\\ (x, u(x)) \\mapsto x ; \\qquad \\pi_2 : G(u) \\to F,\\ (x, u(x)) \\mapsto u(x)$$',
        '都是有界线性映射（$\\|\\pi_1\\| \\le 1$、$\\|\\pi_2\\| \\le 1$），且 $\\pi_1$ 是双射（线性映射的图像与定义域一一对应）。对 $\\pi_1$ 用逆算子定理：$\\pi_1^{-1} : E \\to G(u)$ 有界。于是',
        '$$u = \\pi_2 \\circ \\pi_1^{-1}$$',
        '作为两个有界映射的复合有界。$\\square$',
        '**实用价值在于「闭」比「有界」好验。** 要直接证明 $u$ 有界，得估计 $\\|u x\\|$；而验证图像闭只需要：任取收敛的 $x_n \\to x$ 与 $u(x_n) \\to y$，证明 $y = u(x)$ —— 中间不需要任何范数估计。分布理论里证明微分算子、Fourier 变换这类映射连续，走的就是这条路。',
        '**为什么必须线性、必须两端完备。**「连续 $\\implies$ 图像闭」是初等的（连续映射的图像在乘积空间里当然闭，对任何映射都对），所以容易误以为两者差不多；差别全在逆命题上。',
        '**完备性。** 取 $E = (C[0,1], \\|\\cdot\\|_1)$（不完备）、$F = (C[0,1], \\|\\cdot\\|_\\infty)$（完备），$u = \\mathrm{id}$。若 $f_n \\to f$ 于 $\\|\\cdot\\|_1$、$f_n \\to g$ 于 $\\|\\cdot\\|_\\infty$，则 $\\|\\cdot\\|_1$ 收敛蕴含 $L^1$ 收敛，而 $\\|\\cdot\\|_\\infty$ 收敛蕴含处处（从而 $L^1$）收敛，故 $f = g$：图像闭。但 $\\|u\\| = \\sup\\|f\\|_\\infty / \\|f\\|_1 = \\infty$，$u$ 不有界。可见**定义域或靶子至少一端不完备，结论就失效**。',
        '**线性。** 非线性映射可以有闭图像而不连续：取 $u : \\mathbb{R} \\to \\mathbb{R}$，$u(x) = 1/x$（$x \\ne 0$）、$u(0) = 0$。它的图像在 $\\mathbb{R}^2$ 中闭（是一条双曲线加原点），但 $u$ 在 $0$ 处不连续。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis, 2.15']
    },

    /* ============================================================ C(K) 与 Stone–Weierstrass */
    {
      id: 'def.ck-space',
      cluster: 'fa.ck',
      type: 'definition',
      label: 'C(K,E)',
      title: '$C(K,E)$ 与一致度量',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '连续函数空间'],
      statement: [
        '设 $K$ 紧 Hausdorff，$(E, d)$ 度量。在 $C(K, E)$ 上定义',
        '',
        '$$\\Delta(f, g) := \\sup_{x \\in K} d\\bigl(f(x), g(x)\\bigr) .$$',
        '',
        '$E$ 赋范时它就是一致范数 $\\|f\\| = \\sup_x \\|f(x)\\|$。'
      ].join('\n'),
      notes: [
        '上确界取得到（紧 + 连续）。这个度量就是「一致收敛」的度量，不是「逐点收敛」的（与 `def.uniform-convergence` 同口径）。',
        '⭐ 记号允许任意度量空间 $E$，所以这一团的结论（完备性、Arzelà–Ascoli）比经典的 $\\mathbb{R}$-值版本更宽。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 等度连续与 Arzelà–Ascoli'],
    },
    {
      id: 'thm.ck-complete',
      cluster: 'fa.ck',
      type: 'theorem',
      label: 'C(K,E) 完备',
      title: '$E$ 完备 $\\implies$ $C(K,E)$ 完备',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '连续函数空间', '完备性'],
      statement: [
        '设 $K$ 紧 Hausdorff。$E$ 完备 $\\implies$ $(C(K, E), \\Delta)$ 完备。$E$ 赋范时 $C(K, E)$ 是 Banach 空间。'
      ].join('\n'),
      notes: [
        '证法：Cauchy 列 $\\implies$ 逐点 Cauchy（$d(f_n(x), f_m(x)) \\le \\Delta(f_n, f_m)$）$\\implies$ 逐点极限 $f$（$E$ 完备）$\\implies$ $\\Delta$ 一致的估计给「$f_n \\to f$ 一致」$\\implies$ 一致极限保连续。',
        '⭐ 为什么重要：一致收敛空间让人能「把连续函数的极限留在连续函数里」，这是 Stone–Weierstrass、Arzelà–Ascoli、乃至 $C^*$-代数全部的前提。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 等度连续与 Arzelà–Ascoli'],
    },
    {
      id: 'def.equicontinuous',
      cluster: 'fa.ck',
      type: 'definition',
      label: '等度连续',
      title: '等度连续与一致等度连续',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '等度连续', '紧性'],
      statement: [
        '设 $K$ 拓扑空间、$(E, d)$ 度量、$\\mathcal{H} \\subseteq C(K, E)$。',
        '',
        '- $\\mathcal{H}$ 在 $x_0 \\in K$ **等度连续**：$\\forall \\varepsilon > 0$ 存在 $x_0$ 的邻域 $U$ 使 $d(f(x), f(x_0)) < \\varepsilon$ 对**一切** $f \\in \\mathcal{H}$、$x \\in U$ 同时成立。',
        '- $\\mathcal{H}$ 在 $K$ 上等度连续：在每点 $x \\in K$ 等度连续。',
        '- $K$ 度量空间时，$\\mathcal{H}$ **一致等度连续**：$\\forall \\varepsilon > 0$ $\\exists \\eta > 0$ 使 $\\delta(x, y) < \\eta \\implies d(f(x), f(y)) < \\varepsilon$ 对一切 $f \\in \\mathcal{H}$ 同时成立。'
      ].join('\n'),
      notes: [
        '⚠️ 要害在「**对一切 $f$ 同时**」。去掉这一条就只是「每个 $f$ 各自连续」—— 那是 $\\mathcal{H} \\subseteq C(K,E)$ 的定义，什么也没说。',
        '$\\mathcal{H} = \\{f\\}$ 时等度连续 $\\iff$ $f$ 连续。',
        '⭐ 这是紧性（Arzelà–Ascoli）里**唯一非平凡**的假设：逐点全有界只是「不发散」，等度连续才是「不会越抖越厉害」。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 等度连续与 Arzelà–Ascoli'],
    },
    {
      id: 'thm.equicontinuous-uniform',
      cluster: 'fa.ck',
      type: 'theorem',
      label: '等度连续与一致等度连续',
      title: '紧度量空间上等度连续 $\\implies$ 一致等度连续',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '等度连续', '紧性'],
      statement: [
        '设 $(K, \\delta)$ 紧度量、$(E, d)$ 度量、$\\mathcal{H} \\subseteq C(K, E)$ 等度连续。则 $\\mathcal{H}$ **一致等度连续**。'
      ].join('\n'),
      notes: [
        '证法：给 $\\varepsilon > 0$。\n\n每点 $x$ 取 $\\eta_x > 0$ 使 $\\delta(y, x) < \\eta_x \\implies d(f(y), f(x)) < \\varepsilon/2$（对一切 $f$）。\n\n紧性给有限覆盖 $K = \\bigcup_i B(x_i, \\eta_{x_i}/2)$，取 $\\eta := \\min_i \\eta_{x_i}/2$。\n\n若 $\\delta(x, y) < \\eta$，取 $i$ 使 $x \\in B(x_i, \\eta_{x_i}/2)$（故 $y \\in B(x_i, \\eta_{x_i})$），于是 $d(f(x), f(y)) \\le d(f(x), f(x_i)) + d(f(x_i), f(y)) < \\varepsilon$。',
        '⭐ 讲义末尾用的是 **Lebesgue 数** $\\lambda$（$\\delta(x,y) < \\lambda$ 就落在某个覆盖成员里）。两种写法等价；Lebesgue 数版本的好处是 $\\lambda$ 只依赖覆盖。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 等度连续与 Arzelà–Ascoli'],
    },
    {
      id: 'thm.arzela-ascoli-general',
      cluster: 'fa.ck',
      type: 'theorem',
      label: '广义 Arzelà–Ascoli',
      title: '广义 Arzelà–Ascoli：全有界 $\\iff$ 等度连续 + 逐点全有界',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '紧性', '等度连续'],
      statement: [
        '设 $K$ 紧、$(E, d)$ 度量、$\\mathcal{H} \\subseteq C(K, E)$。则下列**等价**：',
        '',
        '1. $\\mathcal{H}$ 在 $(C(K,E), \\Delta)$ 中**全有界**；',
        '2. (a) $\\mathcal{H}$ 等度连续；(b) $\\mathcal{H}(x) := \\{f(x) : f \\in \\mathcal{H}\\}$ 对每个 $x \\in K$ **全有界**。'
      ].join('\n'),
      notes: [
        '「1 $\\implies$ 2」：全有界给有限 $\\varepsilon$-网 $f_1, \\ldots, f_n$，则 $\\mathcal{H} \\cup \\{f_1,\\ldots,f_n\\}$ 仍等度连续（有限多个连续函数 + 一个等度连续族）。',
        '⭐ 与本图 `thm.arzela-ascoli`（$\\mathbb{R}$ 值、紧距离空间、一致有界）是同一个定理的两档：这条允许 $E$ 是任意度量空间，并把「一致有界」精确化成「逐点全有界」。',
        '⚠️ 「逐点全有界」不能换成「逐点有界」：$E$ 不完备时相对紧需要「盖得住」，有界只是「不发散」。',
        '配合「$C(K,E)$ 完备」就是标准形式：**全有界 + 完备 $=$ 相对紧**。'
      ].join('\n\n'),
      refs: ['Brezis, Functional Analysis, Sobolev Spaces and Partial Differential Equations · 等度连续与 Arzelà–Ascoli'],
    },
    {
      id: 'def.subalgebra-separating',
      cluster: 'fa.ck',
      type: 'definition',
      label: '子代数与分离点',
      title: '子代数、分离点、格',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '连续函数空间', 'Stone–Weierstrass'],
      statement: [
        '设 $K$ 紧 Hausdorff，$A \\subseteq C(K, \\mathbb{K})$。',
        '',
        '- $A$ 是**子代数**：是向量空间且对乘法封闭；',
        '- $A$ **分离点**：$x \\ne y \\implies \\exists f \\in A$，$f(x) \\ne f(y)$；',
        '- $A$ 是**格**（lattice）：对 $\\min, \\max$ 封闭。'
      ].join('\n'),
      notes: [
        '「分离点」是 Stone–Weierstrass 的必要条件：不分离两个点，就把它们粘成一点，$A$ 张不出粘出来的空间上的 $C$。',
        '⚠️ 自伴矩阵的例子（讲义）：自伴矩阵按 $A \\ge B \\iff A - B$ 半正定排序，一般**不是格**（两个自伴矩阵的逐点 min 未必自伴）。所以「格」不是自动的，要靠「闭 + 含单位」换。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · Stone–Weierstrass 定理'],
    },
    {
      id: 'lem.closed-subalgebra-lattice',
      cluster: 'fa.ck',
      type: 'lemma',
      label: '闭子代数是格',
      title: '含单位的闭子代数是格',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '连续函数空间', 'Stone–Weierstrass'],
      statement: [
        '设 $K$ 紧 Hausdorff，$A \\subseteq C(K, \\mathbb{R})$ 是**含单位**的**闭**子代数。则 $A$ 对 $\\min, \\max$ 封闭。'
      ].join('\n'),
      notes: [
        '证法：$\\max(f, g) = \\frac12(f + g + |f - g|)$，所以只需证「$f \\ge 0$、$f \\in A$ $\\implies$ $\\sqrt f \\in A$」。\n\n不妨 $\\|f\\| < 1$：$\\sqrt{1 - u}$ 在 $[-1+\\varepsilon, 1-\\varepsilon]$ 上解析，其 Taylor 级数一致逼近，代 $u = 2 - \\varepsilon - f^2 \\in A$ 得多项式 $p(2-\\varepsilon-f^2) \\in A$，它一致逼近 $\\sqrt f$；\n\n$A$ 闭故 $\\sqrt f \\in A$。',
        '⚠️ 「含单位」不能去掉：不给 $1$ 的话 $\\sqrt{}$ 这一步没有常数可写。',
        '⭐ 这是 Stone–Weierstrass 的**第一步**：先把「代数」升级成「格」，后面才能用 $\\min/\\max$ 上下夹住 $f$。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · Stone–Weierstrass 定理'],
    },
    {
      id: 'thm.stone-weierstrass',
      cluster: 'fa.ck',
      type: 'theorem',
      label: 'Stone–Weierstrass 定理',
      title: 'Stone–Weierstrass 定理（实情形）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '连续函数空间', 'Stone–Weierstrass', '逼近'],
      statement: [
        '设 $K$ 紧 Hausdorff，$A \\subseteq C(K, \\mathbb{R})$ 是**含单位**的**子代数**，且 $A$ **分离点**。则 $\\overline A = C(K, \\mathbb{R})$。'
      ].join('\n'),
      notes: [
        '证明三步：',
        '① 取闭包：$\\overline A$ 仍含单位、分离点，并由「含单位的闭子代数是格」成为**格**。',
        '② **两点插值**：$x \\ne y$、目标值 $\\alpha, \\beta \\in \\mathbb{R}$。取 $g \\in A$ 使 $g(x) \\ne g(y)$，解二元一次方程组得 $f = a\\cdot 1 + b g \\in A$ 使 $f(x) = \\alpha$、$f(y) = \\beta$。',
        '③ **上下夹**（两小步，全程都在 $\\overline{A}$ 里做 —— 它已经由①②验过是闭子代数）：\n\n' +
        '- **逐点从下方压**：固定 $f \\in C(K)$ 与 $\\varepsilon > 0$。\n\n' +
        '对每个 $x \\in K$，由①（单点上逼近）存在 $h_{x} \\in \\overline{A}$ 使 $h_{x}(x) > f(x) - \\varepsilon$；\n\n' +
        '由 $h_x - f$ 连续，存在 $x$ 的开邻域 $U_{x}$，在其上 $h_{x} > f - \\varepsilon$。\n\n' +
        '\n- **紧性取有限并**：$K$ 紧，于是 有限个 $U_{x_{1}}, \\ldots, U_{x_{m}}$ 覆盖 $K$。\n\n' +
        '由②（$\\overline{A}$ 对 $\\max$ 封闭）得 $h := \\max_{i} h_{x_{i}} \\in \\overline{A}$，且 $h > f - \\varepsilon$ 处处成立。\n\n' +
        '\n\n' +
        '- **对称地压上方**：对 $-f$ 重复上面两步（等价地直接用 $\\min$），得 $h\' \\in \\overline{A}$ 使 $h\' < f + \\varepsilon$。\n\n' +
        '\n- **合起来**：$h\' \\le h$ 在 $\\overline{A}$ 里夹住 $f$，取 $h\'\' := \\max(h\', \\min(h, f))$ 或直接用 $\\|h - f\\| \\le \\varepsilon$，得 $\\|f - h\\| < 2\\varepsilon$。\n\n' +
        '$\\varepsilon$ 任意，于是 $f \\in \\overline{A}$，于是 $\\overline{A} = C(K)$。\n\n' +
        '∎',
        '⚠️ 三条假设缺一不可：$A = \\{f : f(0) = 0\\}$ 缺单位；$A = $ 常数函数缺分离点。',
        '⭐ 这是「用**代数**性质换**逼近**能力」的样板：不需要光滑、不需要可数、不需要任何具体核。经典 Weierstrass 定理（多项式逼近）就是 $K = [a,b]$、$A = $ 多项式的特例。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · Stone–Weierstrass 定理', 'Stone 1937'],
    },
    {
      id: 'thm.stone-weierstrass-complex',
      cluster: 'fa.ck',
      type: 'theorem',
      label: 'Stone–Weierstrass（复情形）',
      title: 'Stone–Weierstrass 定理（复情形）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '连续函数空间', 'Stone–Weierstrass'],
      statement: [
        '设 $K$ 紧 Hausdorff，$A \\subseteq C(K, \\mathbb{C})$ 是含单位的子代数、分离点，且**对共轭封闭**（$f \\in A \\implies \\bar f \\in A$）。则 $\\overline A = C(K, \\mathbb{C})$。'
      ].join('\n'),
      notes: [
        '归结到实情形：$\\operatorname{Re}\\, f = (f + \\bar f)/2$、$\\operatorname{Im}\\, f = (f - \\bar f)/(2i)$ 都在 $A$ 里。',
        '⚠️ 「对共轭封闭」不能去掉：取 $A = $ 圆盘代数 $\\mathrm{Alg}(z) \\subseteq C(S^1, \\mathbb{C})$（含单位、分离点），则 $\\bar z \\notin \\overline A$ —— 因为 $\\int_{S^1} p(z)\\,\\bar z\\,dz = 0$ 对一切多项式 $p$ 成立（Cauchy 定理），而 $\\int_{S^1} \\bar z\\,\\bar z\\,dz \\ne 0$。',
        '⭐ 讲义在这里接上了表示论：紧群 $G$ 的矩阵系数 $e_{ij}$ 生成 $C(G)$（因 $\\{e_{ij}\\}$ 对共轭封闭），且 $\\Delta : C(G) \\to C(G) \\otimes C(G)$，$e_{ij} \\mapsto \\sum_k e_{ik} \\otimes e_{kj}$ —— Peter–Weyl 的代数骨架。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · Stone–Weierstrass 定理'],
    },
    {
      id: 'thm.bernstein-approximation',
      cluster: 'fa.ck',
      type: 'theorem',
      label: 'Bernstein 多项式逼近',
      title: 'Bernstein 多项式逼近（Weierstrass 定理的显式证明）',
      regions: ['functional-analysis'],
      tags: ['泛函分析', '连续函数空间', '逼近'],
      statement: [
        '对 $f \\in C[0, 1]$，令',
        '',
        '$$B_n f(x) := \\sum_{k=0}^{n} \\binom{n}{k} f\\!\\left(\\frac{k}{n}\\right) x^k (1 - x)^{n-k} .$$',
        '',
        '则 $\\|B_n f - f\\|_\\infty \\to 0$。'
      ].join('\n'),
      notes: [
        '这是 Weierstrass 逼近定理的**显式**证明：$B_n f(x) = \\mathbb{E}[f(S_n/n)]$（$S_n$ 服从参数 $x$ 的二项分布），用三条恒等式（$\\sum \\binom nk x^k(1-x)^{n-k} = 1$、$\\sum k\\binom nk x^k(1-x)^{n-k} = nx$、方差 $\\le n/4$）加 $f$ 的一致连续性把误差压住。',
        '⭐ 与 Stone–Weierstrass 分工：这条给「一个显式算子列」，只对 $[0,1]$、只对实值；S-W 给「只要代数性质就够」，不管构造。两者互相印证，也互相不能替代。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · Stone–Weierstrass 定理', 'Bernstein 1912'],
    }
  ],

  edges: [
    /* ------------------------------------------------ Baire 一条线 */
    {
      id: 'imp.fa-baire-characterizations',
      kind: 'implication',
      sources: ['thm.baire'],
      target: 'prop.baire-characterizations',
      title: 'Baire 的三种说法等价',
      proof: [
        '设 (1)：可数个稠密开集之交稠密。',
        '(1) $\\iff$ (3)：令 $A_n$ 闭且无处稠密，则 $X \\setminus A_n$ 稠密开；$\\bigcap_n (X \\setminus A_n) = X \\setminus \\bigcup_n A_n$ 稠密 $\\iff$ $\\bigcup_n A_n$ 不含非空开集。',
        '(2) $\\iff$ (3)：非空开集 $U$ 是第一纲 $\\iff$ $U \\subseteq \\bigcup_n A_n$（$A_n$ 闭且无处稠密），即 $\\bigcup_n A_n$ 含非空开集。',
        '所以三条是同一条取补集。$\\blacksquare$'
      ].join('\n'),
      note: '⚠️ (2) 里的「第二纲」作用对象是**非空开集**，不是任意集合。'
    },
    {
      id: 'imp.fa-baire-opensubset',
      kind: 'implication',
      sources: ['thm.baire'],
      target: 'thm.baire-open-subset',
      title: 'Baire $\\implies$ 开子集是 Baire',
      proof: [
        '设 $O_n$ 在 $\\Omega$ 中稠密开，写 $O_n = \\Omega \\cap O_n\'$（$O_n\'$ 在 $X$ 中开）。',
        '断言 $O_n\' \\cup \\Omega^c$ 在 $X$ 中稠密：任取非空开 $U$，若 $U \\cap \\Omega = \\emptyset$ 则 $U \\subseteq \\Omega^c$；\n\n否则 $U \\cap \\Omega$ 是 $\\Omega$ 中非空开，与 $O_n$ 稠密故交非空，于是 $U \\cap O_n\' \\ne \\emptyset$。',
        '由 Baire，$\\bigcap_n (O_n\' \\cup \\Omega^c)$ 在 $X$ 稠密。\n\n任取 $\\Omega$ 中非空开 $V$，它与该稠密集相交，交点必在 $\\Omega$ 里，故它属于每个 $O_n\' \\cap \\Omega = O_n$。\n\n于是 $\\bigcap_n O_n$ 与 $V$ 相交。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '讲义里只写了「$O_n\' := O_n \\cup \\Omega^c$ 在 $X$ 稠密」，剩下就是这个补集论证。'
    },
    {
      id: 'imp.fa-closedcover-ubp',
      kind: 'implication',
      sources: ['lem.countable-closed-cover'],
      target: 'thm.ubp',
      title: '闭覆盖有内点 $\\implies$ 一致有界原理',
      proof: [
        '令 $F_k := \\{x \\in E : \\sup_i \\|u_i x\\| \\le k\\}$。每个 $\\{x : \\|u_i x\\| \\le k\\}$ 是闭集（$u_i$ 与范数连续），故 $F_k$ 闭。',
        '逐点有界 $\\implies E = \\bigcup_k F_k$。由「可数个闭集覆盖 Baire 空间 $\\implies$ 内点之并稠密」，某个 $F_k$ 有内点，即存在 $B(x_0, r) \\subseteq F_k$。',
        '对 $\\|x\\| \\le r$：$\\sup_i\\|u_i x\\| \\le \\sup_i\\|u_i(x + x_0)\\| + \\sup_i\\|u_i x_0\\| \\le 2k$（两项分别落在 $F_k$ 的两点上）。\n\n对任意 $y \\ne 0$ 取 $x = r y/\\|y\\|$，得 $\\|u_i y\\| \\le 2k\\|y\\|/r$ 对一切 $i$，故 $\\sup_i \\|u_i\\| \\le 2k/r < \\infty$。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '整条证明只有一处非平凡：某个 $F_k$ 必须有内点 —— 那就是 Baire。'
    },
    {
      id: 'imp.fa-ubp-resonance',
      kind: 'implication',
      sources: ['thm.ubp'],
      target: 'cor.ubp-resonance',
      title: 'UBP 的补集形态：共振集稠密',
      proof: [
        '令 $M(x) := \\sup_n \\|u_n x\\|$，$\\Omega_k := \\{x : M(x) > k\\} = \\bigcup_n \\{x : \\|u_n x\\| > k\\}$，每个 $\\{\\cdots\\}$ 开，故 $\\Omega_k$ 开；\n\n$R = \\bigcap_k \\Omega_k$ 是 $G_\\delta$。',
        '稠密性：若某 $\\Omega_k$ 不稠密，则存在球 $B(x_0, r) \\subseteq \\Omega_k^c$，即球上 $M \\le k$。\n\n与 UBP 同样的平移 + 伸缩给出 $\\sup_n \\|u_n\\| \\le 2k/r < \\infty$，与 $\\sup_n\\|u_n\\| = \\infty$ 矛盾。\n\n故每个 $\\Omega_k$ 稠密，交也稠密（Baire）。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '⭐ 这条把「一致有界原理」的否定形式写成「发散集是稠密 $G_\\delta$」—— 这才是它在 Fourier 级数、插值算子、数值求积公式里被引用的形态。'
    },
    {
      id: 'imp.fa-openmap',
      kind: 'implication',
      sources: ['lem.countable-closed-cover', 'def.banach-space'],
      target: 'thm.open-mapping-banach',
      title: '闭覆盖有内点 + 完备 $\\implies$ 开映射定理',
      proof: [
        '**① 取内点。** $E = \\bigcup_k \\overline{u(kB_E)}$（满射 + 每个 $x$ 缩放后落在某个 $kB_E$ 里）。\n\n' +
        '由「闭覆盖有内点」与 Baire，某个 $\\overline{u(kB_E)}$ 含内点；\n\n' +
        '由线性（$u(kB_E) = k\\,u(B_E)$）可把内点搬回 $0$，得 $r > 0$ 使 $\\overline{u(B_E)} \\supseteq rB_F$。',
        '**② 去掉闭包。** 归一化后等价于：$u(B_E)$ 在 $B_F$ 里稠密。\n\n' +
        '给定 $y \\in B_F$，递归构造：取 $x_n$ 使 $\\|y_n - u(x_n)\\| < \\varepsilon/2^n$、$\\|x_n\\| \\le \\varepsilon/2^{n-1}$，令 $y_{n+1} := y_n - u(x_n)$。\n\n' +
        '$E$ 完备使 $x := \\sum x_n$ 收敛且 $\\|x\\| \\le 2\\varepsilon$；\n\n' +
        '$u$ 连续给 $u(x) = \\sum u(x_n) = y$（望远镜求和）。',
        '**③ 结论。** 于是 $u$ 把单位球映满 $B_F$ 的一个固定倍数；平移即得任意点的邻域被映满一个球，故 $u$ 把开集映成开集。$\\blacksquare$'
      ].join('\n'),
      note: '⚠️ 第 ② 步是最容易被跳过去的地方（很多笔记只写「由 Baire 得稠密，剩下是标准论证」）。这里的骨架也没把常数的对齐逐字写出 —— 那是 Rudin 2.11 的做法。'
    },
    {
      id: 'imp.fa-bounded-inverse',
      kind: 'implication',
      sources: ['thm.open-mapping-banach'],
      target: 'thm.bounded-inverse',
      title: '开映射 $\\implies$ 逆算子有界',
      proof: [
        '$u$ 双射，故 $u^{-1} : F \\to E$ 存在且线性。',
        '$u^{-1}$ 连续 $\\iff$ 每个开集 $\\Omega \\subseteq E$ 的原像 $(u^{-1})^{-1}(\\Omega) = u(\\Omega)$ 在 $F$ 中开；而开映射定理恰好说 $u$ 把开集映成开集。故 $u^{-1}$ 连续。$\\blacksquare$'
      ].join('\n'),
      note: '一行推导，但它依赖开映射定理的**全部**假设（两边完备 + 满射）。'
    },
    {
      id: 'imp.fa-closed-graph',
      kind: 'implication',
      sources: ['thm.bounded-inverse'],
      target: 'thm.closed-graph',
      title: '逆算子定理 $\\implies$ 闭图像定理',
      proof: [
        '$G(u) \\subseteq E \\times F$ 是闭子空间，$E \\times F$ 按 $\\|(x,y)\\| = \\|x\\| + \\|y\\|$ 是 Banach，故 $G(u)$ 是 Banach 空间。',
        '两个投影 $\\pi_1(x, u(x)) = x$、$\\pi_2(x, u(x)) = u(x)$ 都有界。\n\n$\\pi_1$ 是双射（满射显然；单射：$\\pi_1(x, u(x)) = 0 \\implies x = 0$），故由逆算子定理 $\\pi_1^{-1} : E \\to G(u)$ 有界。\n\n于是 $u = \\pi_2 \\circ \\pi_1^{-1}$ 有界，$\\|u\\| \\le \\|\\pi_2\\|\\,\\|\\pi_1^{-1}\\|$。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '思路极干净：把「$u$ 的图像」当成空间，把「$u$ 有界」化成「$G(u)$ 上的投影有界」。'
    },
    {
      id: 'imp.fa-locallycompact-baire',
      kind: 'implication',
      sources: ['thm.baire', 'def.hausdorff'],
      target: 'thm.locally-compact-baire',
      title: '球套法换成紧邻域链',
      proof: [
        '设 $X$ 局部紧 Hausdorff，$O_n$ 稠密开。任给非空开 $U$，因 $O_1$ 稠密有 $U \\cap O_1 \\ne \\emptyset$；取 $x_1 \\in U \\cap O_1$ 与其**紧**邻域 $V_1 \\subseteq U \\cap O_1$（局部紧 Hausdorff 有紧邻域基）。',
        '归纳：已有 $V_n$，取 $x_{n+1} \\in \\operatorname{int}V_n \\cap O_{n+1}$ 与紧邻域 $V_{n+1} \\subseteq \\operatorname{int}V_n \\cap O_{n+1}$。',
        '紧集族 $\\{V_n\\}$ 嵌套且每个非空，由**有限交性质** $\\bigcap_n V_n \\ne \\emptyset$；取 $x \\in \\bigcap V_n$，则 $x \\in U$ 且 $x \\in O_n$ 对一切 $n$。\n\n故 $\\bigcap O_n$ 与任意非空开 $U$ 相交。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '与完备度量的证明逐字对应，唯一的替换是「半径 $\\to 0$」$	o$「紧集的有限交性质」。这也说明 Baire 纲根本不依赖度量。'
    },
    {
      id: 'imp.fa-baire-pointwise',
      kind: 'implication',
      sources: ['thm.baire', 'lem.countable-closed-cover'],
      target: 'thm.pointwise-limit-continuity',
      title: 'Baire $\\implies$ 连续点集是稠密 $G_\\delta$',
      proof: [
        '对每个 $k$，令 $F_{n,k} := \\{x : \\|f_i(x) - f_j(x)\\| \\le 1/k,\\ \\forall i, j \\ge n\\}$，是闭集（连续函数集的交）。由「$f_n(x)$ 收敛 $\\implies$ Cauchy」得 $X = \\bigcup_n F_{n,k}$。',
        '由 Baire（闭覆盖有内点），$O_k := \\bigcup_n \\operatorname{int}F_{n,k}$ 是稠密开集；$O := \\bigcap_k O_k$ 是稠密 $G_\\delta$。',
        '在 $x \\in O$：给 $\\varepsilon$，取 $k$ 使 $1/k < \\varepsilon/3$；$x \\in \\operatorname{int}F_{n,k}$ 对某个 $n$，取邻域 $U$ 在其内；\n\n再取 $m \\ge n$ 使 $\\|f_m(x) - f(x)\\| < \\varepsilon/3$、取小邻域 $V \\subseteq U$ 使 $f_m$ 在 $V$ 上变化 $< \\varepsilon/3$。\n\n则 $y \\in V$ 时',
        '',
        '$$\\|f(y) - f(x)\\| \\le \\|f(y) - f_m(y)\\| + \\|f_m(y) - f_m(x)\\| + \\|f_m(x) - f(x)\\| < \\varepsilon . \\blacksquare$$'
      ].join('\n'),
      note: '三个 $\\varepsilon/3$ 分别来自：$F_{n,k}$ 里的一致接近、$f_m$ 的连续、$f_m \\to f$ 的逐点收敛。'
    },

    /* ------------------------------------------------ Hilbert 与赋范（161 那些节点的边） */
    {
      id: 'imp.fa-norm-metric',
      kind: 'implication',
      sources: ['def.norm'],
      target: 'prop.norm-induces-metric',
      title: '范数 $\\implies$ 平移不变、齐次、球凸的距离',
      proof: [
        '距离公理：$d(x,y) = 0 \\iff \\|x - y\\| = 0 \\iff x = y$；对称与三角不等式由范数第 2、3 条直接给。',
        '平移不变：$d(x+z, y+z) = \\|x - y\\|$。齐次：$d(\\lambda x, \\lambda y) = |\\lambda|\\,\\|x - y\\|$。',
        '球凸：$\\|u - x\\|, \\|v - x\\| \\le r \\implies \\|tu + (1-t)v - x\\| \\le t\\|u-x\\| + (1-t)\\|v-x\\| \\le r$。',
        '反方向：若 $d$ 平移不变且齐次，令 $\\|x\\| := d(x, 0)$，则 $d(x,y) = d(x-y, 0) = \\|x-y\\|$，且三角不等式由 $d(x,0) \\le d(x,-z) + d(-z,0)$ 配合平移不变得到。$\\blacksquare$'
      ].join('\n'),
      note: '这条把「赋范」的全部几何内容一次摆出来：平移不变 + 齐次 + 球凸。'
    },
    {
      id: 'imp.fa-findim-riesz',
      kind: 'implication',
      sources: ['thm.norm-equiv-finite-dim'],
      target: 'thm.riesz-ball-compact',
      title: '有限维 $\\implies$ 单位球紧',
      proof: [
        '由范数等价，$\\alpha\\|x\\|_\\infty \\le \\|x\\| \\le \\beta\\|x\\|_\\infty$，故 $B_E \\subseteq \\{x : \\|x\\|_\\infty \\le 1/\\alpha\\}$，右端按坐标范数有界闭，由 Heine–Borel 紧；\n\n$B_E$ 是其闭子集（$\\|\\cdot\\|$ 连续），故紧。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '只要「有限维 $\\implies$ 范数等价」，剩下全是 Heine–Borel。'
    },
    {
      id: 'imp.fa-almostorth-riesz',
      kind: 'implication',
      sources: ['lem.almost-orthogonal'],
      target: 'thm.riesz-ball-compact',
      title: '无穷维 $\\implies$ 单位球不紧',
      proof: [
        '递归取 $e_n$：$e_1$ 任取 $\\|e_1\\| = 1$；已有 $e_1..e_{n-1}$ 时，$F_{n-1} = \\operatorname{span}\\{e_1,..,e_{n-1}\\}$ 是有限维闭真子空间，由几乎正交引理取 $e_n$，$\\|e_n\\| = 1$、$d(e_n, F_{n-1}) \\ge 1/2$。',
        '于是 $\\|e_n - e_m\\| \\ge 1/2$（$n > m$ 时 $e_m \\in F_{n-1}$）。这列在 $B_E$ 里但没有收敛子列，故 $B_E$ 不列紧，由「紧 $\\iff$ 列紧」（度量空间）得它不紧。$\\blacksquare$'
      ].join('\n'),
      note: '⭐ 这是「无穷维没有紧单位球」的标准论证。'
    },
    {
      id: 'imp.fa-lincont-bounded',
      kind: 'implication',
      sources: ['def.bounded-operator'],
      target: 'thm.linear-continuous-bounded',
      title: '有界 $\\iff$ 连续（线性）',
      proof: [
        '有界 $\\implies$ Lipschitz：$\\|u(x) - u(y)\\| \\le C\\|x - y\\|$。',
        '在 $0$ 连续 $\\implies$ 有界：反证。\n\n若不存在 $C$，则对每个 $n$ 有 $x_n \\ne 0$ 使 $\\|u(x_n)\\| > n\\|x_n\\|$；令 $y_n = x_n/(n\\|x_n\\|)$，则 $\\|y_n\\| = 1/n \\to 0$ 而 $\\|u(y_n)\\| > 1$，与 $u$ 在 $0$ 连续矛盾。',
        '一点连续 $\\implies$ 在 $0$ 连续：$x \\to 0$ 时 $x + x_0 \\to x_0$，故 $u(x) = u(x + x_0) - u(x_0) \\to 0$。$\\blacksquare$'
      ].join('\n'),
      note: '「一点连续 $\\implies$ 处处连续」只因为线性（平移是连续双射）。'
    },
    {
      id: 'imp.fa-neumann',
      kind: 'implication',
      sources: ['prop.operator-algebra', 'thm.bounded-operators-banach'],
      target: 'thm.neumann-series',
      title: '次可乘 + 完备 $\\implies$ Neumann 级数',
      proof: [
        '由次可乘性归纳得 $\\|u^k\\| \\le \\|u\\|^k$，故 $\\sum_{k \\ge 0}\\|u^k\\| \\le (1 - \\|u\\|)^{-1} < \\infty$；由 $B(E)$ 完备，级数收敛，记为 $v$。',
        '部分和 $s_n = \\sum_{k<n} u^k$ 满足 $(I - u)s_n = s_n(I - u) = I - u^n$，而 $\\|u^n\\| \\to 0$，用乘法连续性取极限得 $(I-u)v = v(I-u) = I$。\n\n故 $v = (I-u)^{-1}$ 且 $\\|v\\| \\le (1-\\|u\\|)^{-1}$。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '两个前提都不能少：次可乘给「几何级数收敛」，完备给「收敛就等于有一个算子」。'
    },
    {
      id: 'imp.fa-extension',
      kind: 'implication',
      sources: ['def.complete'],
      target: 'thm.bounded-extension',
      title: '完备性 $\\implies$ 稠密延拓存在',
      proof: [
        '给 $x \\in E$，取 $g_n \\in G$ 使 $g_n \\to x$。\n\n' +
        '则 $\\|u(g_n) - u(g_m)\\| \\le \\|u\\|\\,\\|g_n - g_m\\| \\to 0$，故 $(u(g_n))$ 在 $F$ 中 Cauchy；\n\n' +
        '$F$ 完备，定义 $\\tilde u(x) := \\lim_n u(g_n)$。',
        '与取法无关：换一列 $g_n\'$ 时 $\\|u(g_n) - u(g_n\')\\| \\to 0$。\n\n线性与界：$\\|\\tilde u(x)\\| \\le \\|u\\|\\,\\|x\\|$，且在 $G$ 上与 $u$ 相同故 $\\|\\tilde u\\| \\ge \\|u\\|$。\n\n唯一性：$G$ 稠密、两者都连续。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '这条常被当成「显然」跳过，但它依赖 $F$ 完备。'
    },
    {
      id: 'imp.fa-polarization-parallelogram',
      kind: 'implication',
      sources: ['thm.polarization'],
      target: 'thm.parallelogram-inner-product',
      title: '极化恒等式 $\\implies$ 平行四边形法则刻画内积',
      proof: [
        '必要性：展开 $\\|x \\pm y\\|^2 = \\|x\\|^2 \\pm 2\\operatorname{Re}\\langle x,y\\rangle + \\|y\\|^2$，两式相加即得。',
        '充分性（实情形）：令 $\\langle x,y\\rangle := \\frac14(\\|x+y\\|^2 - \\|x-y\\|^2)$。\n\n对称性显然；线性性把 $\\langle x + x\', y\\rangle - \\langle x,y\\rangle - \\langle x\',y\\rangle$ 展开成两两差平方，用平行四边形法则整理得 $0$；\n\n齐次性先对整数、再对有理数，最后用范数的**连续性**推到实数。\n\n复情形另验 $\\langle x, iy\\rangle = i\\langle x,y\\rangle$。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '充分性里唯一的「分析」输入是范数的连续性；其余全是代数。'
    },
    {
      id: 'imp.fa-projconvex-subspace',
      kind: 'implication',
      sources: ['thm.projection-convex'],
      target: 'thm.projection-subspace',
      title: '凸闭集投影 $\\implies$ 闭子空间的正交投影',
      proof: [
        '闭子空间是凸闭集，故 $P_E$ 存在唯一，变分不等式给 $\\operatorname{Re}\\langle x - P_E x, z - P_E x\\rangle \\le 0$（$z \\in E$）。',
        '把 $z$ 换成 $P_E x \\pm z$（$z \\in E$）得 $\\operatorname{Re}\\langle x - P_E x, z\\rangle = 0$；再换成 $iz$ 得虚部也为零。故 $x - P_E x \\perp E$。',
        '线性：$\\alpha x_1 + \\beta x_2 - \\alpha P x_1 - \\beta P x_2 \\perp E$，而 $\\alpha P x_1 + \\beta P x_2 \\in E$，由唯一性即得。\n\n界：$\\|x\\|^2 = \\|x - P_E x\\|^2 + \\|P_E x\\|^2$。\n\n分解：$x \\in E + E^\\perp$，且两者交为零。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '这一步把「变分不等式」翻译成「正交」，也是 Riesz 表示的唯一工具。'
    },
    {
      id: 'imp.fa-projsubspace-riesz',
      kind: 'implication',
      sources: ['thm.projection-subspace'],
      target: 'thm.riesz-hilbert',
      title: '正交分解 $\\implies$ Riesz 表示',
      proof: [
        '$\\varphi = 0$ 取 $y = 0$。否则 $E := \\ker\\varphi$ 是闭真子空间，由正交分解取 $0 \\ne z \\in E^\\perp$。',
        '令 $y := \\overline{\\varphi(z)}\\,z/\\|z\\|^2$。\n\n对 $x = e + \\lambda z$（$e \\in E$）：$\\langle x, y\\rangle = \\lambda\\langle z, y\\rangle = \\lambda\\varphi(z) = \\varphi(\\lambda z) = \\varphi(x)$。',
        '范数：$|\\varphi(x)| = |\\langle x,y\\rangle| \\le \\|x\\|\\,\\|y\\|$ 给 $\\|\\varphi\\| \\le \\|y\\|$；\n\n取 $x = y/\\|y\\|$ 得 $\\varphi(x) = \\|y\\|$，故相等。\n\n唯一性：差 $\\perp H$ 故为零。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '只用了三件事：$\\ker\\varphi$ 闭、正交分解、共轭线性的约定。'
    },
    {
      id: 'imp.fa-riesz-adjoint',
      kind: 'implication',
      sources: ['thm.riesz-hilbert'],
      target: 'thm.adjoint-hilbert',
      title: 'Riesz 表示 $\\implies$ 伴随算子存在',
      proof: [
        '固定 $x \\in K$，令 $\\psi_x(y) := \\langle x, u(y)\\rangle_K$；它线性、连续且 $|\\psi_x(y)| \\le \\|x\\|\\,\\|u\\|\\,\\|y\\|$，故 $\\psi_x \\in H^*$。',
        '由 Riesz 表示，存在唯一 $u^*(x) \\in H$ 使 $\\psi_x = \\langle \\cdot, u^*(x)\\rangle$。\n\n' +
        '线性由 $\\psi_x$ 对 $x$ 线性 + 表示唯一性得到；\n\n' +
        '有界靠 $\\|u^*(x)\\| = \\|\\psi_x\\| \\le \\|u\\|\\,\\|x\\|$；\n\n' +
        '$\\|u^*\\| = \\|u\\|$ 用两次 sup 交换。\n\n' +
        '$\\blacksquare$'
      ].join('\n'),
      note: '存在性完全没用到 $u$ 的结构，只用了 $H$ 自对偶。'
    },
    {
      id: 'imp.fa-orthbasis',
      kind: 'implication',
      sources: ['thm.projection-subspace'],
      target: 'thm.orthonormal-basis-exists',
      title: '正交分解 $\\implies$ 正交基存在（Zorn）',
      proof: [
        '令 $\\mathcal{S} := \\{A \\subseteq H : A$ 标准正交$\\}$，按包含成偏序。\n\n若 $\\mathcal{T}$ 全序，令 $A := \\bigcup_{B \\in \\mathcal{T}} B$：任取 $x, y \\in A$，它们分别落在某个 $B_1 \\subseteq B_2$ 里，故正交且单位长；\n\n所以 $A \\in \\mathcal{S}$ 且是上界。',
        'Zorn 给极大元 $M$。\n\n若 $\\overline{\\operatorname{span} M} \\ne H$，由正交分解取 $0 \\ne z \\perp \\overline{\\operatorname{span} M}$，则 $M \\cup \\{z/\\|z\\|\\}$ 仍标准正交且严格更大，矛盾。\n\n$\\blacksquare$'
      ].join('\n'),
      note: 'Zorn 在这里只干一件事：把「不断加向量」这个超限过程一次走完。'
    },
    {
      id: 'imp.fa-bessel-l2',
      kind: 'implication',
      sources: ['thm.bessel-parseval'],
      target: 'thm.separable-hilbert-is-l2',
      title: 'Bessel/Parseval $\\implies$ 可分 Hilbert $\\cong \\ell^2$',
      proof: [
        '取正交基 $\\{e_i\\}$（上一条），定义 $U(x) := (\\langle x, e_i\\rangle)_i$。Bessel 保证 $U(x) \\in \\ell^2$，Parseval（完备性）保证 $\\|U(x)\\|_2 = \\|x\\|$，故 $U$ 是等距。',
        '满射：给 $(\\lambda_i) \\in \\ell^2$，令 $s_J := \\sum_{i \\in J}\\lambda_i e_i$；由 $\\|s_J - s_{J\'}\\|^2 = \\sum_{J \\triangle J\'}|\\lambda_i|^2 \\to 0$ 知它是 Cauchy 列，$H$ 完备故收敛到某 $x$，且 $\\langle x, e_i\\rangle = \\lambda_i$。',
        '可分时正交基可数（不可数正交基给出不可数个两两距离 $\\sqrt2$ 的点），故 $H \\cong \\ell^2(\\mathbb{N})$。$\\blacksquare$'
      ].join('\n'),
      note: '三个工具各司其职：Zorn 给基、Bessel 给「入 $\\ell^2$」、Parseval 给「保范」。'
    },

    /* ------------------------------------------------ C(K) 那几条 */
    {
      id: 'imp.fa-ck-banach',
      kind: 'implication',
      sources: ['def.ck-space', 'def.complete'],
      target: 'thm.ck-complete',
      title: '一致度量的完备性来自 $E$ 的完备性',
      proof: [
        '设 $(f_n)$ 是 $(C(K,E), \\Delta)$ 中的 Cauchy 列。给 $x$：$d(f_n(x), f_m(x)) \\le \\Delta(f_n, f_m) \\to 0$，故 $(f_n(x))$ 在 $E$ 中 Cauchy，$E$ 完备给出极限 $f(x)$。',
        '$f_n \\to f$ 在 $\\Delta$ 下：给 $\\varepsilon$，取 $N$ 使 $n, m \\ge N \\implies \\Delta(f_n, f_m) < \\varepsilon/2$；\n\n固定 $x$ 令 $m \\to \\infty$ 得 $d(f_n(x), f(x)) \\le \\varepsilon/2$，再对 $x$ 取上确界。',
        '$f$ 连续：$d(f(x), f(y)) \\le \\Delta(f, f_n) + d(f_n(x), f_n(y)) + \\Delta(f_n, f)$。$\\blacksquare$'
      ].join('\n'),
      note: '这三步（逐点取极限 $	o$ 一致收敛 $	o$ 保连续）是「一致收敛」语言的万能模板。'
    },
    {
      id: 'imp.fa-equi-uniform',
      kind: 'implication',
      sources: ['def.equicontinuous', 'def.compact'],
      target: 'thm.equicontinuous-uniform',
      title: '紧 $+$ 等度连续 $\\implies$ 一致等度连续',
      proof: [
        '给 $\\varepsilon$。对每个 $x$ 由等度连续取 $\\eta_x > 0$ 使 $\\delta(y,x) < \\eta_x \\implies d(f(y), f(x)) < \\varepsilon/2$（一切 $f$）。',
        '$\\{B(x, \\eta_x/2)\\}$ 覆盖紧集，取有限子覆盖 $B(x_1, \\eta_{x_1}/2), .., B(x_N, \\eta_{x_N}/2)$，令 $\\eta := \\min_i \\eta_{x_i}/2 > 0$。',
        '若 $\\delta(x,y) < \\eta$，取 $i$ 使 $x \\in B(x_i, \\eta_{x_i}/2)$，则 $\\delta(y, x_i) < \\eta_{x_i}$，于是 $d(f(x), f(y)) \\le d(f(x), f(x_i)) + d(f(x_i), f(y)) < \\varepsilon$。\n\n$\\blacksquare$'
      ].join('\n'),
      note: '「有限」用两次：一次有界、一次取 min 后仍 $>0$ —— 无限个正数的下确界可以是 0，这正是紧性的用处。'
    },
    {
      id: 'imp.fa-ascoli',
      kind: 'implication',
      sources: ['thm.equicontinuous-uniform', 'thm.arzela-ascoli'],
      target: 'thm.arzela-ascoli-general',
      title: '一致等度连续 + 逐点全有界 $\\implies$ 全有界',
      proof: [
        '等度连续在紧度量上自动升为一致等度连续。给 $\\varepsilon$，取 $\\eta > 0$ 使 $\\delta(x,y) < \\eta \\implies d(f(x), f(y)) < \\varepsilon/3$（一切 $f$）。',
        '取有限 $\\eta$-网 $x_1,..,x_N$ 覆盖 $K$。每个 $\\mathcal{H}(x_i)$ 全有界，取有限 $\\varepsilon/3$-网，把这些点合起来得有限集 $T \\subseteq E$。',
        '对每个 $f$ 与每个 $i$ 取 $t_i \\in T$ 使 $d(f(x_i), t_i) < \\varepsilon/3$；由「网点取值落在有限集 $T$ 里」给出**有限**多个候选函数 $\\Phi$。对任意 $f$ 与任意 $x \\in B(x_i, \\eta)$：',
        '',
        '$$d(f(x), \\varphi(x)) \\le \\underbrace{d(f(x), f(x_i))}_{< \\varepsilon/3} + \\underbrace{d(f(x_i), \\varphi(x_i))}_{< \\varepsilon/3} + \\underbrace{d(\\varphi(x_i), \\varphi(x))}_{< \\varepsilon/3} < \\varepsilon ,$$',
        '',
        '故 $\\Phi$ 是 $\\mathcal{H}$ 的有限 $\\varepsilon$-网，$\\mathcal{H}$ 全有界。$\\blacksquare$'
      ].join('\n'),
      note: '⚠️ 这段是**骨架**：第三段「$\\Phi$ 的构造」（把网点取值按最近网点常值延拓）在不同的书里写法不同。方向是对的，细节没逐字展开。'
    },
    {
      id: 'imp.fa-closedsubalg-sw',
      kind: 'implication',
      sources: ['lem.closed-subalgebra-lattice', 'def.subalgebra-separating'],
      target: 'thm.stone-weierstrass',
      title: '闭子代数是格 $\\implies$ Stone–Weierstrass',
      proof: [
        '记 $\\bar A$ 为 $A$ 在 $C(K,\\mathbb{R})$ 中的闭包：仍含单位、分离点，且由引理是**格**。',
        '**两点插值**：$x \\ne y$、$\\alpha, \\beta \\in \\mathbb{R}$。\n\n取 $g \\in A$，$g(x) \\ne g(y)$；解 $a + b\\,g(x) = \\alpha$、$a + b\\,g(y) = \\beta$（行列式 $g(x)-g(y) \\ne 0$），得 $f = a\\cdot 1 + b g \\in A$ 在两点取指定值。',
        '**上下夹**：固定 $f \\in C(K)$、$\\varepsilon > 0$。\n\n' +
        '对每个 $x$ 用插值取 $h_x \\in \\bar A$ 在 $x$ 附近 $> f - \\varepsilon$；\n\n' +
        '紧性取有限覆盖并用 $\\max$ 得 $h > f - \\varepsilon$；\n\n' +
        '再对有限多个点用 $\\min$ 压到 $h < f + \\varepsilon$。\n\n' +
        '故 $\\|f - h\\| < 2\\varepsilon$。\n\n' +
        '$\\blacksquare$'
      ].join('\n'),
      note: '⚠️ 讲义里这一段用了两次有限子覆盖（$U^c_{x,y}$ 与 $V_x^\\varepsilon$），这里按同样逻辑压缩成「先压上、再压下」。'
    },
    {
      id: 'imp.fa-sw-complex',
      kind: 'implication',
      sources: ['thm.stone-weierstrass'],
      target: 'thm.stone-weierstrass-complex',
      title: '实情形 $\\implies$ 复情形（多一条共轭封闭）',
      proof: [
        '令 $A_{\\mathbb{R}} := \\{\\operatorname{Re}\\,f : f \\in A\\}$。\n\n对共轭封闭 $\\implies$ $\\operatorname{Re}\\,f = (f + \\bar f)/2 \\in A$、$\\operatorname{Im}\\,f \\in A$；\n\n而 $f = \\operatorname{Re}\\,f + i\\,\\operatorname{Im}\\,f$。',
        '$A_{\\mathbb{R}}$ 是含单位的实子代数（$\\operatorname{Re}(fg)$ 是实部的多项式组合）且分离点。由实情形 $\\overline{A_{\\mathbb{R}}} = C(K,\\mathbb{R})$。',
        '于是任意 $f \\in C(K,\\mathbb{C})$ 的实部、虚部都能被 $A$ 中元素逼近，故 $f \\in \\overline A$。$\\blacksquare$'
      ].join('\n'),
      note: '反例（圆盘代数 $\\mathrm{Alg}(z)$）缺的正是「对共轭封闭」：$\\bar z$ 不在闭包里。'
    },

    /* ------------------------------------------------ 定义引用（跨团/跨领域） */
    { id: 'def-link.fa-vs-norm', kind: 'definition', definition: 'def.vs', usedBy: 'def.norm',
      note: '范数加在向量空间上：第二条公理就是「与标量乘法相容」。' },
    { id: 'def-link.fa-metric-normind', kind: 'definition', definition: 'def.metric-space', usedBy: 'prop.norm-induces-metric',
      note: '范数诱导的距离就是度量空间那条定义里的距离，额外要求平移不变与齐次。' },
    { id: 'def-link.fa-complete-BEF', kind: 'definition', definition: 'def.complete', usedBy: 'thm.bounded-operators-banach',
      note: '这里要的是 $F$ 的度量完备（Cauchy 列收敛）。' },
    { id: 'def-link.fa-banach-ubp', kind: 'definition', definition: 'def.banach-space', usedBy: 'thm.ubp',
      note: '一致有界原理唯一的完备性假设落在 $E$ 是 Banach 上。' },
    { id: 'def-link.fa-banach-openmap', kind: 'definition', definition: 'def.banach-space', usedBy: 'thm.open-mapping-banach',
      note: '$E$ 的完备性用来取内点（Baire），$F$ 的用来去掉闭包。' },
    { id: 'def-link.fa-banach-closedgraph', kind: 'definition', definition: 'def.banach-space', usedBy: 'thm.closed-graph',
      note: '两边都必须是 Banach：乘积空间要完备，逆算子定理才能用。' },
    { id: 'def-link.fa-banach-neumann', kind: 'definition', definition: 'def.banach-space', usedBy: 'thm.neumann-series',
      note: '级数要收敛，先要有 $B(E)$ 完备，而它靠 $E$ 完备。' },
    { id: 'def-link.fa-linmap-op', kind: 'definition', definition: 'def.linear-map', usedBy: 'def.bounded-operator',
      note: '有界算子是线性映射里**连续**的那部分：$L(E,F) \\supseteq B(E,F)$。' },
    { id: 'def-link.fa-norm-op', kind: 'definition', definition: 'def.norm', usedBy: 'def.bounded-operator',
      note: '算子范数就是 $B(E,F)$ 上的那个范数。' },
    { id: 'def-link.fa-normequiv-findim', kind: 'definition', definition: 'def.norm-equivalence', usedBy: 'thm.norm-equiv-finite-dim',
      note: '定理的结论就是「两两等价」，用强弱范数的语言写出来。' },
    { id: 'def-link.fa-compact-riesz', kind: 'definition', definition: 'def.compact', usedBy: 'thm.riesz-ball-compact',
      note: '这里的紧是拓扑紧；在度量空间里等价于列紧 —— 证明用的是后者。' },
    { id: 'def-link.fa-dualspace', kind: 'definition', definition: 'def.dual-space', usedBy: 'def.dual-banach',
      note: '有限维时代数对偶与连续对偶相同；无穷维时 $E^* \\subset E^\\vee$。' },
    { id: 'def-link.fa-inner-hilbert', kind: 'definition', definition: 'def.inner-product', usedBy: 'def.hilbert-space',
      note: 'Hilbert 空间 = 内积空间 + 由内积诱导的范数完备。' },
    { id: 'def-link.fa-inducednorm-pol', kind: 'definition', definition: 'def.induced-norm', usedBy: 'thm.polarization',
      note: '极化恒等式里的 $\\|\\cdot\\|$ 就是内积诱导的范数。' },
    { id: 'def-link.fa-orth-orthonormal', kind: 'definition', definition: 'def.orthogonality', usedBy: 'def.orthonormal-set',
      note: '「正交基」里的正交就是 $f_i \\perp f_j$；「完备」是额外一条拓扑条件。' },
    { id: 'def-link.fa-orthcompl', kind: 'definition', definition: 'def.orthogonal-complement', usedBy: 'thm.projection-subspace',
      note: '正交分解用的就是 $E^\\perp$ 这个定义。' },
    { id: 'def-link.fa-orthproj', kind: 'definition', definition: 'def.orthogonal-projection', usedBy: 'thm.projection-subspace',
      note: '有限维里的正交投影是这里的特例（那时每个子空间都闭）。' },
    { id: 'def-link.fa-projformula', kind: 'definition', definition: 'thm.projection-formula', usedBy: 'thm.projection-convex',
      note: '有限维的最佳逼近公式是这条的有限维特例：那时最近点由内积显式给出。' },
    { id: 'def-link.fa-unitarymatrix', kind: 'definition', definition: 'def.unitary-matrix', usedBy: 'def.unitary-operator',
      note: '有限维酉矩阵是酉算子的一种；无穷维还多出「等距但不满」的移位算子。' },
    { id: 'def-link.fa-adjoint-finitedim', kind: 'definition', definition: 'def.operator-adjoint', usedBy: 'thm.adjoint-hilbert',
      note: '有限维的伴随算子（共轭转置）是这里的特例；无穷维靠 Riesz 表示才存在。' },
    { id: 'def-link.fa-lpbanach-sep', kind: 'definition', definition: 'thm.lp-banach', usedBy: 'def.separable-space',
      note: '$\\ell^p$、$L^p$ 能当「可分」的例子，前提是它们是 Banach 空间。' },
    { id: 'def-link.fa-ell2', kind: 'definition', definition: 'def.ell2-space', usedBy: 'thm.separable-hilbert-is-l2',
      note: '$\\ell^2(I)$ 是这条同构的靶空间。' },
    { id: 'def-link.fa-nowhere-meager', kind: 'definition', definition: 'def.nowhere-dense', usedBy: 'def.meager-set',
      note: '「第一纲」的定义就是「可数个无处稠密集的并」。' },
    { id: 'def-link.fa-gdelta', kind: 'definition', definition: 'def.g-delta', usedBy: 'thm.pointwise-limit-continuity',
      note: '结论里那个「稠密 $G_\\delta$」用的就是这条定义。' },
    { id: 'def-link.fa-meager-bairechar', kind: 'definition', definition: 'def.meager-set', usedBy: 'prop.baire-characterizations',
      note: '三条等价刻画里的「第二纲」「无处稠密」都按这套定义读。' },
    { id: 'def-link.fa-ck-complete', kind: 'definition', definition: 'def.ck-space', usedBy: 'thm.ck-complete',
      note: '完备性是对 $\\Delta$ 这个一致度量说的。' },
    { id: 'def-link.fa-hausdorff-ck', kind: 'definition', definition: 'def.hausdorff', usedBy: 'def.ck-space',
      note: '$K$ 要 Hausdorff：紧 Hausdorff 才是「好」的紧空间（连续函数分离点、Urysohn 等）。' },
    { id: 'def-link.fa-uniformconv-ck', kind: 'definition', definition: 'def.uniform-convergence', usedBy: 'def.ck-space',
      note: '$\\Delta$ 距离收敛就是一致收敛 —— 同一概念的度量写法。' },
    { id: 'def-link.fa-equi-ascoli', kind: 'definition', definition: 'def.equicontinuous', usedBy: 'thm.arzela-ascoli-general',
      note: '广义 A–A 里的 (a) 就是等度连续这条定义。' },
    { id: 'def-link.fa-totbdd-ascoli', kind: 'definition', definition: 'def.totally-bounded', usedBy: 'thm.arzela-ascoli-general',
      note: '结论里的「全有界」与逐点的「全有界」都是这条定义（后者在 $E$ 里取）。' },
    { id: 'def-link.fa-subalgebra-sw', kind: 'definition', definition: 'def.subalgebra-separating', usedBy: 'thm.stone-weierstrass',
      note: '「含单位的子代数 + 分离点」就是这条定义的三个词。' },
    { id: 'def-link.fa-arzela-classic', kind: 'definition', definition: 'thm.arzela-ascoli', usedBy: 'thm.arzela-ascoli-general',
      note: '本图先有的经典版（$\\mathbb{R}$ 值、紧距离空、一致有界）是这条的特例：取 $E = \\mathbb{R}$ 即得。' },
    { id: 'def-link.fa-invfn-banach', kind: 'definition', definition: 'thm.inverse-function-banach', usedBy: 'thm.bounded-inverse',
      note: '⚠️ 两条只共享「逆」这个字：那条是非线性的局部逆（Neumann + 压缩映射），这条是线性双射的全局逆（Baire）。' },
    { id: 'def-link.fa-function-closedgraph', kind: 'definition', definition: 'def.function', usedBy: 'thm.closed-graph',
      note: '「映射就是它的图像」是「映射」那条定义的直接后果（映射 = 一种特殊的关系 = 有序对的集合），所以闭图像定理里的 $G(u)$ 不是新对象。' },
    { id: 'def-link.fa-openmapping-holo', kind: 'definition', definition: 'thm.open-mapping', usedBy: 'thm.open-mapping-banach',
      note: '⚠️ 同名不同物：那条是「非常数全纯函数是开映射」，这条是「满射有界线性算子是开映射」，证明毫无关系。' },

    /* ------------------------------------------------ 定位边：新区域不能悬空在层 0 */
    /* ⚠️ 目的只有一个：把新节点的层号接到已有的数学前提上（否则它们会和 ZFC 挤在层 0~2）。
       每条都写明「陈述/证明里到底用了对方的哪一句」。 */
    { id: 'def-link.fa-vs-norm2', kind: 'definition', definition: 'def.vs', usedBy: 'def.norm',
      note: '范数的定义域是向量空间；第三条公理用的就是向量空间的加法。' },
    { id: 'def-link.fa-norm-normeq', kind: 'definition', definition: 'def.norm', usedBy: 'def.norm-equivalence',
      note: '强弱范数比较的是两个范数 —— 两者都按范数那三条公理。' },
    { id: 'def-link.fa-compact-normeq', kind: 'definition', definition: 'def.compact', usedBy: 'thm.norm-equiv-finite-dim',
      note: '下界 $\\alpha > 0$ 靠的是「单位球面紧 + 连续函数取到最小值」。' },
    { id: 'def-link.fa-norm-almostorth', kind: 'definition', definition: 'def.norm', usedBy: 'lem.almost-orthogonal',
      note: '距离 $d(e, F) = \\inf_{y \\in F}\\|e - y\\|$ 是范数给的距离。' },
    { id: 'def-link.fa-boundedop-opalgebra', kind: 'definition', definition: 'def.bounded-operator', usedBy: 'prop.operator-algebra',
      note: '不等式 $\\|vu\\| \\le \\|v\\|\\,\\|u\\|$ 里的三个范数都是算子范数（那条定义）。' },
    { id: 'def-link.fa-banach-banalg', kind: 'definition', definition: 'def.banach-space', usedBy: 'def.banach-algebra',
      note: 'Banach 代数的第一条要求就是「底层是 Banach 空间」。' },
    { id: 'def-link.fa-norm-schauder', kind: 'definition', definition: 'def.norm', usedBy: 'def.schauder-basis',
      note: '「级数按范数收敛」用的是范数诱导的收敛（不是逐点收敛）。' },
    { id: 'def-link.fa-inner-ell2', kind: 'definition', definition: 'def.inner-product', usedBy: 'def.ell2-space',
      note: '$\\ell^2(I)$ 的内积就是 $\\sum x_i\\overline{y_i}$，逐条对应内积公理。' },
    { id: 'def-link.fa-orthonormal-bessel', kind: 'definition', definition: 'def.orthonormal-set', usedBy: 'thm.bessel-parseval',
      note: 'Bessel / Parseval 的假设与结论都在说「标准正交」与「完备」这两件事。' },
    { id: 'def-link.fa-closed-nowhere', kind: 'definition', definition: 'def.closed-set', usedBy: 'def.nowhere-dense',
      note: '「无处稠密」用的是闭包 $\\overline{A}$ 与内部 —— 两者都在闭集那条定义里。' },
    { id: 'def-link.fa-topology-gdelta', kind: 'definition', definition: 'def.topology', usedBy: 'def.g-delta',
      note: '$G_\\delta$ / $F_\\sigma$ 是拿开集（拓扑那条定义）与闭集堆出来的。' },
    { id: 'def-link.fa-metric-baire', kind: 'definition', definition: 'def.metric-space', usedBy: 'thm.baire',
      note: '球套法里的 $B(x, \\varepsilon)$ 是度量空间的球；「半径 $\\to 0$ 的嵌套闭球交非空」是完备性。' },
    { id: 'def-link.fa-complete-baire', kind: 'definition', definition: 'def.complete', usedBy: 'thm.baire',
      note: 'Baire 的两条证明路线分别用完备性（度量情形）与紧性（局部紧情形）。' },
    { id: 'def-link.fa-closed-closedcover', kind: 'definition', definition: 'def.closed-set', usedBy: 'lem.countable-closed-cover',
      note: '引理说的是「闭集」的覆盖，内部的补与外部的并要用闭集的运算律。' },
    { id: 'def-link.fa-continuous-equi', kind: 'definition', definition: 'def.continuous-map', usedBy: 'def.equicontinuous',
      note: '等度连续 = 「每个 $f$ 连续」再加一条**对全体一致**的 $\\varepsilon$-$\\delta$。' },
    { id: 'def-link.fa-vs-subalgebra', kind: 'definition', definition: 'def.vs', usedBy: 'def.subalgebra-separating',
      note: '子代数先是向量空间（对加法与标量乘法封闭），再加对乘法封闭。' },
    { id: 'def-link.fa-subalg-lattice', kind: 'definition', definition: 'def.subalgebra-separating', usedBy: 'lem.closed-subalgebra-lattice',
      note: '引理的假设「含单位的闭子代数」就是这条定义里的子代数 + 闭 + $1 \\in A$。' },
    { id: 'def-link.fa-ck-bernstein', kind: 'definition', definition: 'def.ck-space', usedBy: 'thm.bernstein-approximation',
      note: '「$\\|B_n f - f\\|_\\infty \\to 0$」里的 $\\|\\cdot\\|_\\infty$ 就是 $C[0,1]$ 上的一致范数。' },
    { id: 'def-link.fa-normedspace-norm', kind: 'definition', definition: 'def.normed-space', usedBy: 'def.norm',
      note: '本图先有的「赋范空间」那条是同一概念的先行版（在多元微分团里）；这条把它作为独立对象重述并补全半范数的区分。' },
    { id: 'def-link.fa-banachspace-hilbert', kind: 'definition', definition: 'def.banach-space', usedBy: 'def.hilbert-space',
      note: 'Hilbert 空间首先是一个 Banach 空间（完备赋范空间），只是范数还额外来自内积。' },
    { id: 'def-link.fa-banachspace-dual', kind: 'definition', definition: 'def.banach-space', usedBy: 'def.dual-banach',
      note: '$E^*$ 永远完备这句话的依据是「$B(E,F)$ 在 $F$ 完备时完备」，而 $\\mathbb{K}$ 完备。' },
    { id: 'def-link.fa-totbdd-ck', kind: 'definition', definition: 'def.totally-bounded', usedBy: 'thm.ck-complete',
      note: '（配套）相对紧 = 全有界 + 完备，两条拼起来才能从 $C(K,E)$ 的完备性拿到紧性。' },
    { id: 'def-link.fa-hausdorff-baire', kind: 'definition', definition: 'def.hausdorff', usedBy: 'thm.locally-compact-baire',
      note: '局部紧 + Hausdorff 才有紧邻域基，球套法才能换成紧邻域链。' }
  ]
});
