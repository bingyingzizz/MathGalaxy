/* ============================================================================
   内容包 · Galois 理论（2026-11-03，审计 E2）
   ----------------------------------------------------------------------------
   病灶：图里 **只有零件** —— `def.solvable-group`(L9)、`prop.sn-solvable`(L12)、
   `thm.solvable-quotients`(L10) 都在，可是**域扩张 / 伽罗瓦群 / 正规扩张 / 可分扩张 /
   分裂域 / 伽罗瓦对应 / 根式可解 / 五次方程**一个都没有。
   $\\implies$ 图里有一句「$S_{5}$ 不可解」，却**没有任何一条线通向「所以五次方程没有根式解」**。

   这一包按构造顺序铺一条完整的链（准则①：每一层由上一层造出来）：
     域扩张 $\\to$ 代数元/极小多项式 $\\to$ 代数扩张 $\\to$ 分裂域 $\\to$ 正规 / 可分 $\\to$ 伽罗瓦群
     $\\to$ 伽罗瓦扩张 $\\to$ 伽罗瓦对应（基本定理）$\\to$ 根式可解 $\\iff$ 群可解 $\\to$ 五次方程无根式解

   ⚠️ **诚实标注**：后三条（伽罗瓦对应、根式可解、五次方程）都标 `status: 'skeleton'` ——
      它们的证明是整门课的内容，本图只给陈述、路线与关键一步，不假装证完了。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: 'Galois 理论：从域扩张到五次方程',

  nodes: [
    {
      id: 'def.field-extension',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '域扩张',
      title: '域扩张 $K/F$ 与次数 $[K:F]$',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '设 $F \\subseteq K$ 都是域，且 $F$ 的运算就是 $K$ 的运算在 $F$ 上的限制。' +
          '这时称 $K$ 是 $F$ 的一个**扩域**，记作 $K/F$（读作「$K$ over $F$」）。',
        '',
        '把 $K$ 看成 $F$ 上的**向量空间**（加法来自 $K$，纯量乘法就是 $F$ 中的乘法），它的维数叫**次数**：',
        '',
        '$$[K : F] := \\dim_{F} K .$$',
        '',
        '$[K:F] < \\infty$ 时叫**有限扩张**。',
      ].join('\n'),
      notes: [
        '⭐ **「扩张」不是新对象，是换视角**：同一个域 $K$，一旦指定子域 $F$，就能把 $K$ 当 $F$-向量空间看。' +
          '于是「域论」立刻借到线性代数的整套机器（基、维数、线性无关）—— 这是整个 Galois 理论的起手式。',
        '⭐ **次数怎么算**：$[\\mathbb{C}:\\mathbb{R}] = 2$（基 $\\{1, i\\}$）；' +
          '$[\\mathbb{Q}(\\sqrt{2}):\\mathbb{Q}] = 2$；$[\\mathbb{F}_{p^{n}}:\\mathbb{F}_{p}] = n$。',
        '⭐ **塔公式**（本图未成节点）：有限扩张 $F \\subseteq K \\subseteq L$ 满足',
        '',
        '$$[L:F] = [L:K]\\,[K:F],$$',
        '',
        '因为 $L$ 是自由 $K$-模、$K$ 是自由 $F$-模，取基作积。后面所有「次数整除」的结论都靠它。',
        '⚠ **次数有限不等于「能算」**：$[\\mathbb{Q}(\\alpha):\\mathbb{Q}]$ 可能很大，而 $\\alpha$ 是某个具体多项式的根 ——' +
          '「写得出来」与「有限」是两件事（这正是五次方程那条线的主题）。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. V', 'Hungerford, Algebra, Ch. V'],
    },

    {
      id: 'def.algebraic-element',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '代数元与极小多项式',
      title: '代数元 / 超越元，极小多项式 $m_{\\alpha}$',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '设 $K/F$ 是域扩张，$\\alpha \\in K$。称 $\\alpha$ 在 $F$ 上**代数**，如果存在**非零**多项式 $f \\in F[x]$ 使',
        '',
        '$$f(\\alpha) = 0 ;$$',
        '',
        '否则叫**超越**。',
        '',
        '若 $\\alpha$ 代数，则集合 $\\{\\, f \\in F[x] : f(\\alpha) = 0 \\,\\}$ 是 $F[x]$ 的**非零理想**，' +
          '它由唯一一个**首一**多项式 $m_{\\alpha}$ 生成，叫 $\\alpha$ 在 $F$ 上的**极小多项式**；' +
          '$\\deg m_{\\alpha}$ 叫 $\\alpha$ 的**次数**。',
      ].join('\n'),
      notes: [
        '⭐ **为什么那个集合是理想**：它非空（代数）、对加法与乘 $F[x]$ 中任意多项式封闭（代入 $\\alpha$ 后仍是 $0$）。' +
          '$F[x]$ 是主理想整环，所以它 $= (m_{\\alpha})$；再取首一代表就得唯一性。',
        '⭐ **极小多项式是「$\\alpha$ 满足的最低条件」**：它不可约（若 $m = gh$ 且次数都更小，' +
          '则 $g(\\alpha)h(\\alpha) = 0$，域里无零因子，故其中一个已 $0$，与极小性矛盾）。于是',
        '',
        '$$F[x]/(m_{\\alpha}) \\;\\cong\\; F(\\alpha), \\qquad [F(\\alpha):F] = \\deg m_{\\alpha}.$$',
        '',
        '这条同构是整条链的引擎：**「造扩域」与「模掉多项式」是同一件事**。',
        '⭐ 例子：$\\alpha = \\sqrt{2}$ 在 $\\mathbb{Q}$ 上：$m = x^{2} - 2$，次数 2；' +
          '$\\alpha = \\sqrt[3]{2}$：$m = x^{3} - 2$，次数 3；' +
          '$\\pi$、$e$ 在 $\\mathbb{Q}$ 上**超越**（Hermite / Lindemann，本图未收）。',
        '⚠ **极小多项式依赖基域**：$\\sqrt{2}$ 在 $\\mathbb{Q}$ 上次数 2，但在 $\\mathbb{Q}(\\sqrt{2})$ 上次数 $1$。' +
          '说「$\\alpha$ 的次数」时必须先指明基域。\n\n📌 本节点讲**代数元**的极小多项式；**线性算子**的极小多项式是 `def.minimal-poly`。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. V §1', 'Hungerford, Algebra, Ch. V §1'],
    },

    {
      id: 'def.algebraic-extension',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '代数扩张',
      title: '代数扩张（每个元素都代数）',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '域扩张 $K/F$ 叫**代数扩张**，如果 $K$ 中**每一个**元素在 $F$ 上都是代数的；' +
          '否则叫**超越扩张**。',
        '',
        '有限扩张一定是代数的：若 $[K:F] = n < \\infty$，取 $0 \\ne \\alpha \\in K$，' +
          '则 $1, \\alpha, \\ldots, \\alpha^{n}$ 这 $n+1$ 个向量在 $n$ 维空间里**必线性相关**，' +
          '给出一个以 $\\alpha$ 为根的非零多项式。',
      ].join('\n'),
      notes: [
        '⭐ **反过来不成立**：$\\overline{\\mathbb{Q}}/\\mathbb{Q}$（$\\mathbb{Q}$ 的代数闭包）是代数扩张，' +
          '但次数**无限**。所以「代数」与「有限」是两件事 —— 这条差别在伽罗瓦理论里很要紧' +
          '（基本定理只对**有限**伽罗瓦扩张成立）。',
        '⭐ **代数扩张对「塔」封闭**：$F \\subseteq K \\subseteq L$，若 $K/F$ 与 $L/K$ 都代数，则 $L/F$ 代数。' +
          '（证明要用「有限生成」过渡，本图未展开。）',
        '⚠ 超越扩张的典型例子：$\\mathbb{Q}(x)/\\mathbb{Q}$（有理函数域）—— 它连**次数**都无从谈起。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. V §1'],
    },

    {
      id: 'def.splitting-field',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '分裂域',
      title: '分裂域：让 $f$ 彻底分解的最小扩域',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '设 $F$ 是域，$f \\in F[x]$ 是**非零**多项式。扩域 $K/F$ 叫 $f$ 的**分裂域**，如果',
        '',
        '- $f$ 在 $K[x]$ 中分解成**一次因子**的乘积：$f = c\\,(x - \\alpha_{1})\\cdots(x - \\alpha_{n})$，$c \\in F^{\\times}$；',
        '- 且 $K = F(\\alpha_{1}, \\ldots, \\alpha_{n})$ —— 由这些根**生成**，不多不少。',
      ].join('\n'),
      notes: [
        '⭐ **存在性靠构造**（准则①）：把 $f$ 的一个不可约因子模掉，得到 $F_{1} = F[x]/(g)$，' +
          '$f$ 在 $F_{1}$ 上多了一个根；对 $f / (x - \\alpha)$ 递归，最多 $\\deg f$ 步就停下来。' +
          '所以分裂域**总是存在且次数 $\\le (\\deg f)!$**。',
        '⭐ **唯一性（同构意义下）**：两个分裂域之间存在 $F$-同构（保持 $F$ 不动的同构）。' +
          '所以「$f$ 的分裂域」这个说法有意义 —— 但**只在同构意义下**，具体的域可以长得不一样。' +
          '⚠ 证明要用「同构延拓」（把 $F$-同构延拓到 $F(\\alpha) \\to F\'(\\alpha\')$），本图未成节点。',
        '⭐ 例子：$f = x^{2} - 2$ 在 $\\mathbb{Q}$ 上：分裂域 $\\mathbb{Q}(\\sqrt{2})$，次数 2。' +
          '$f = x^{3} - 2$ 在 $\\mathbb{Q}$ 上：根是 $\\sqrt[3]{2}, \\omega\\sqrt[3]{2}, \\omega^{2}\\sqrt[3]{2}$（$\\omega = e^{2\\pi i/3}$），' +
          '分裂域 $\\mathbb{Q}(\\sqrt[3]{2}, \\omega)$，次数 **6** —— 注意它比 $\\mathbb{Q}(\\sqrt[3]{2})$（次数 3）大，' +
          '因为**加一个根不等于加全部根**。这正是下面「正规扩张」要管的事。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. V §2', 'Hungerford, Algebra, Ch. V §3'],
    },

    {
      id: 'def.normal-extension',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '正规扩张',
      title: '正规扩张：一个根就有全部根',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '代数扩张 $K/F$ 叫**正规**（normal），如果 $F[x]$ 中每个**不可约**多项式只要在 $K$ 中有一个根，' +
          '就**在 $K$ 中分裂**（全部根都在 $K$ 里）。',
        '',
        '等价说法：$K$ 是 $F[x]$ 中**某一族**多项式的分裂域。',
      ].join('\n'),
      notes: [
        '⭐ **它衡量的正是「加一个根够不够」**：$\\mathbb{Q}(\\sqrt[3]{2})/\\mathbb{Q}$ **不**正规 ——' +
          '$x^{3} - 2$ 在其中有一个根，但 $\\omega\\sqrt[3]{2}$ 不在。而 $\\mathbb{Q}(\\sqrt{2})/\\mathbb{Q}$ 正规。',
        '⭐ **与「正规子群」无关**：这里 normal 是「正规扩张」，群论那个 normal 是「正规子群」。' +
          '两者在伽罗瓦对应里确实会碰上（中间域正规 $\\iff$ 对应子群正规），但**定义完全不同**，' +
          '别把中文词混起来读。',
        '⚠ 正规性是**对基域说的**：$K/F$ 正规不蕴含 $K/E$ 对中间域 $E$ 正规（要伽罗瓦才两端都好）。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §1', 'Hungerford, Algebra, Ch. V §3'],
    },

    {
      id: 'def.separable-extension',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '可分扩张',
      title: '可分扩张：极小多项式没有重根',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '代数扩张 $K/F$ 叫**可分**（separable），如果每个 $\\alpha \\in K$ 的极小多项式 $m_{\\alpha}$ 在 $K$ 上' +
          '**没有重根**（等价地：$m_{\\alpha}$ 与它的形式导数 $m_{\\alpha}\'$ 互素）。',
        '',
        '**特征 0 的域上，一切代数扩张都自动可分。**',
      ].join('\n'),
      notes: [
        '⭐ **为什么 char 0 自动可分**：不可约的 $m$ 若与 $m\'$ 有公共因子，则因 $\\deg m\' < \\deg m$ 只能 $m\' = 0$；' +
          '而 char 0 时 $m\' = 0$ 只可能是常多项式，与 $m$ 不可约矛盾。' +
          '**char $p$ 时才有真麻烦**：$x^{p} - t$ 在 $\\mathbb{F}_{p}(t)$ 上不可约，但 $x^{p} - t = (x - \\sqrt[p]{t})^{p}$' +
          '（在分裂域里）—— 一个根，重数 $p$。这叫**不可分扩张**。',
        '⭐ **伽罗瓦理论为什么需要可分**：伽罗瓦对应要数「自同构的个数」，而自同构只能把根送到**不同的根**。' +
          '有重根时根的数量不够，$|\\operatorname{Gal}|$ 就掉到 $[K:F]$ 以下，对应关系失效。',
        '⚠ 所以标准教材的「伽罗瓦扩张」定义是**有限 + 正规 + 可分**三件套；' +
          'char 0 下第三条自动满足，于是常被悄悄省掉 —— 那是**在 char 0 的前提下**省，不是普遍成立。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §1', 'Hungerford, Algebra, Ch. V §4'],
    },

    {
      id: 'def.galois-group',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '伽罗瓦群',
      title: '伽罗瓦群 $\\operatorname{Gal}(K/F)$',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '设 $K/F$ 是域扩张。$K$ 的**$F$-自同构**指域同构 $\\sigma : K \\to K$ 且 $\\sigma|_{F} = \\mathrm{id}_{F}$。' +
          '它们全体在复合下构成一个群，记',
        '',
        '$$\\operatorname{Gal}(K/F) := \\operatorname{Aut}_{F}(K).$$',
        '',
        '对多项式 $f \\in F[x]$，常记 $\\operatorname{Gal}(f) := \\operatorname{Gal}(K/F)$，其中 $K$ 是 $f$ 的分裂域。',
      ].join('\n'),
      notes: [
        '⭐ **$F$-自同构必然把根送到根**：若 $\\alpha$ 是 $f \\in F[x]$ 的根，则',
        '',
        '$$f(\\sigma(\\alpha)) = \\sigma(f(\\alpha)) = \\sigma(0) = 0$$',
        '',
        '（因为 $\\sigma$ 固定 $F$ 的系数）。所以 $\\operatorname{Gal}(K/F)$ **作用**在「$f$ 的根集」上 —— ' +
        '整个伽罗瓦理论就是在数这个作用。',
        '⭐ **这给了群与域之间的桥**：一边是子域（域的中间层），一边是这个群（群论对象），' +
          '伽罗瓦对应（`thm.galois-correspondence`）说它们是**同一张格子的两面**。',
        '⚠ **$\\operatorname{Gal}(K/F)$ 一般不必交换**：$x^{3} - 2$ 的分裂域上它是 $S_{3}$。' +
          '「可解」这个词能起作用，恰恰因为非交换群也有「可解」这个概念（可解群）。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §1'],
    },

    {
      id: 'def.galois-extension',
      cluster: 'algebra.galois',
      type: 'definition',
      label: '伽罗瓦扩张',
      title: '伽罗瓦扩张（有限 + 正规 + 可分）',
      regions: ['algebra'],
      tags: ['定义', '代数', '域论'],
      statement: [
        '有限扩张 $K/F$ 叫**伽罗瓦扩张**，如果它**同时**是正规的（`def.normal-extension`）与可分的' +
          '（`def.separable-extension`）。',
        '',
        '等价条件（任一）：',
        '',
        '- $|\\operatorname{Gal}(K/F)| = [K:F]$；',
        '- $F = K^{\\operatorname{Gal}(K/F)}$（被群固定的元素只有 $F$ 自己）；',
        '- $K$ 是某个**可分**多项式在 $F$ 上的分裂域。',
      ].join('\n'),
      notes: [
        '⭐ **为什么这三条等价**：正规 + 可分保证「根都被送到根、且根互不相同」，' +
          '于是自同构能把 $[K:F]$ 个共轭伸满；反过来，自同构数够多就逼出正规与可分。' +
          '三条等价的完整证明是这门课的主干，本图不展开。',
        '⭐ **不变量是「不动点」**：$K^{G} := \\{\\, x \\in K : \\sigma(x) = x\\ \\ \\forall \\sigma \\in G \\,\\}$ 是 $K$ 的子域，' +
          '自动包含 $F$；伽罗瓦条件说的正是「它**恰好等于** $F$，不多」。',
        '⚠ **最常见的误会**：以为「分裂域 = 伽罗瓦扩张」。缺的是**可分**：char $p$ 下 $x^{p} - t$ 的分裂域' +
          '（$\\mathbb{F}_{p}(t)$ 上）不可分，所以不是伽罗瓦扩张。char 0 下这个区别消失 —— ' +
          '这也是为什么初学时看不出来。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §1', 'Hungerford, Algebra, Ch. V §4'],
    },

    {
      id: 'thm.galois-correspondence',
      cluster: 'algebra.galois',
      type: 'theorem',
      label: '伽罗瓦基本定理',
      title: '伽罗瓦对应：中间域 $\\leftrightarrow$ 子群（反包含、次数换指数）',
      regions: ['algebra'],
      tags: ['定理', '代数', '域论'],
      statement: [
        '设 $K/F$ 是**有限伽罗瓦扩张**，$G = \\operatorname{Gal}(K/F)$。则',
        '',
        '- 映射 $E \\mapsto \\operatorname{Gal}(K/E)$ 给出「中间域 $F \\subseteq E \\subseteq K$」与「$G$ 的子群」之间的**反序双射**',
        '（$E_{1} \\subseteq E_{2} \\iff \\operatorname{Gal}(K/E_{1}) \\supseteq \\operatorname{Gal}(K/E_{2})$）；',
        '- $[K:E] = |\\operatorname{Gal}(K/E)|$，且 $[E:F] = [G : \\operatorname{Gal}(K/E)]$；',
        '- $E/F$ 是**正规**扩张 $\\iff \\operatorname{Gal}(K/E) \\trianglelefteq G$；此时',
        '',
        '$$\\operatorname{Gal}(E/F) \\;\\cong\\; G \\big/ \\operatorname{Gal}(K/E).$$',
      ].join('\n'),
      notes: [
        '**证明**：核心是 Artin 定理（有限自同构群的阶 = 大域对固定域的次数）。先证三个引理，再逐条推。记 $K^{H} := \\{x\\in K : \\sigma(x)=x\\ \\text{对一切}\\ \\sigma\\in H\\}$。',
        '**引理 1（Dedekind 线性无关）**：域 $K$ 的两两不同的自同构 $\\sigma_{1},\\ldots,\\sigma_{n}$，作为 $K\\to K$ 的函数，在 $K$ 上线性无关。证明：设 $\\sum_{i}c_{i}\\sigma_{i}=0$ 是非零关系、非零系数个数 $r$ 最少；则 $r\\ge 2$ 且 $c_{1},\\ldots,c_{r}\\ne 0$（重排后）。取 $x\\in K$ 使 $\\sigma_{1}(x)\\ne\\sigma_{2}(x)$。对任意 $y$，把关系作用在 $xy$ 上得 $\\sum c_{i}\\sigma_{i}(x)\\sigma_{i}(y)=0$，再减去 $\\sigma_{1}(x)\\sum c_{i}\\sigma_{i}(y)=0$，得 $\\sum_{i\\ge 2}c_{i}\\bigl(\\sigma_{i}(x)-\\sigma_{1}(x)\\bigr)\\sigma_{i}(y)=0.$ 这是非零关系（$i=2$ 项系数 $c_{2}(\\sigma_{2}(x)-\\sigma_{1}(x))\\ne 0$），非零系数个数 $\\le r-1$，矛盾。',
        '**引理 2**：$|\\operatorname{Aut}(K/F)|\\le [K:F]$。证明：设 $m=[K:F]$，取 $F$-基 $e_{1},\\ldots,e_{m}$。若 $n>m$ 个不同自同构 $\\sigma_{1},\\ldots,\\sigma_{n}$ 存在，则 $K^{m}$ 中 $n$ 个向量 $\\bigl(\\sigma_{i}(e_{1}),\\ldots,\\sigma_{i}(e_{m})\\bigr)$ 线性相关：存在不全为零的 $c_{i}\\in K$ 使 $\\sum_{i}c_{i}\\sigma_{i}(e_{j})=0$ 对每个 $j$，于是 $\\sum_{i}c_{i}\\sigma_{i}=0$ 在 $K$ 上成立，违背引理 1。',
        '**引理 3（Artin 定理）**：设 $G$ 是 $K$ 的有限自同构群、$n=|G|$、$F=K^{G}$。则 $[K:F]=n$。证明分两步。先证 $[K:F]\\le n$：反设 $m=[K:F]>n$，取 $F$-线性无关的 $x_{1},\\ldots,x_{n+1}\\in K$。方程组 $\\sum_{j=1}^{n+1}\\sigma_{i}(x_{j})c_{j}=0$（$i=1,\\ldots,n$）是 $n$ 个方程、$n+1$ 个未知量，有非零解 $c\\in K^{n+1}$。在所有非零解中取非零分量个数 $r$ 最小者。$r\\ge 2$：若只有 $c_{j}\\ne 0$，由 $\\sigma_{1}=\\operatorname{id}$ 的方程得 $c_{j}x_{j}=0$，与 $x_{j}\\ne 0$ 矛盾。重排并伸缩，使 $c_{r}=1$（于是 $c_{r}\\in F$）；若此时所有分量都落在 $F$，则由 $\\sigma_{1}=\\operatorname{id}$ 的方程 $\\sum c_{j}x_{j}=0$ 与 $x_{j}$ 的 $F$-线性无关得所有 $c_{j}=0$，与非零解矛盾。故有某个分量 $\\notin F$，它必不是第 $r$ 个；重排前 $r-1$ 个分量使 $c_{1}\\notin F$。取 $\\tau\\in G$ 使 $\\tau(c_{1})\\ne c_{1}$。把方程组逐项作用 $\\tau$，并由 $\\{\\tau\\sigma_{i}\\}=\\{\\sigma_{i}\\}$ 重排，知 $\\bigl(\\tau(c_{j})\\bigr)$ 也是解；相减得解 $d_{j}=c_{j}-\\tau(c_{j})$：$d_{r}=0$、$d_{1}\\ne 0$，故非零分量个数 $\\le r-1$，矛盾。于是 $[K:F]\\le n$。再证 $n\\le[K:F]$：$G\\subseteq\\operatorname{Aut}(K/F)$，由引理 2 得 $n\\le|\\operatorname{Aut}(K/F)|\\le[K:K^{G}]=[K:F]$。合起来 $[K:F]=n$。∎',
        '**回到定理**。先说明 $K^{G}=F$：$K/F$ 正规且可分，若 $\\alpha\\notin F$，其极小多项式在 $K$ 中分裂且有另一个根 $\\beta\\ne\\alpha$（可分性保证无重根、正规性保证其它根都在 $K$），$F$-嵌入 $\\alpha\\mapsto\\beta$ 由正规性延拓为 $K$ 的自同构，它移动 $\\alpha$。故固定域恰为 $F$，引理 3 给出 $[K:F] = |G|.$ 对中间域 $E$，$K/E$ 仍有限伽罗瓦（正规、可分都继承），故 $|\\operatorname{Gal}(K/E)|=[K:E]$。',
        '**反序双射**。记 $\\Phi(E)=\\operatorname{Gal}(K/E)$。反序显然：$E_{1}\\subseteq E_{2}$ 时，固定 $E_{2}$ 的自同构也固定 $E_{1}$。单射：若 $\\Phi(E_{1})=\\Phi(E_{2})=H$，把引理 3 用于 $K$ 与 $H$ 得 $[K:K^{H}]=|H|$；而 $[K:E_{i}]=|\\Phi(E_{i})|=|H|$，且 $E_{i}\\subseteq K^{H}$，次数相等故 $E_{i}=K^{H}$，于是 $E_{1}=E_{2}$。满射：任给子群 $H\\le G$，令 $E=K^{H}$；引理 3 给 $[K:E]=|H|$，而 $H\\subseteq\\operatorname{Gal}(K/E)$ 且 $|\\operatorname{Gal}(K/E)|=[K:E]=|H|$，故 $H=\\operatorname{Gal}(K/E)=\\Phi(E)$。',
        '**次数与指数**。$[K:E]=|\\operatorname{Gal}(K/E)|$ 已证；由 $[K:F]=[K:E][E:F]$ 与 $[K:F]=|G|$ 得 $[E:F]=\\frac{|G|}{|\\operatorname{Gal}(K/E)|}=[G:\\operatorname{Gal}(K/E)].$',
        '**正规性**。$E/F$ 正规 $\\iff$ 对每个 $\\sigma\\in G$ 有 $\\sigma(E)=E$。理由：若 $E/F$ 正规、$\\sigma\\in G$，则 $\\sigma|_{E}$ 是 $E$ 到代数闭包里的 $F$-嵌入，正规性迫使 $\\sigma(E)\\subseteq E$，次数相同故相等；反之若 $\\sigma(E)=E$ 对一切 $\\sigma$，则 $E$ 中元素的每个共轭仍在 $E$，故 $E/F$ 正规。又 $\\operatorname{Gal}(K/\\sigma(E))=\\sigma\\operatorname{Gal}(K/E)\\sigma^{-1},$ 于是 $\\operatorname{Gal}(K/E)\\trianglelefteq G \\iff \\operatorname{Gal}(K/\\sigma(E))=\\operatorname{Gal}(K/E)\\ \\text{对一切}\\ \\sigma \\iff \\sigma(E)=E\\ \\text{对一切}\\ \\sigma \\iff E/F\\ \\text{正规},$ 中间一步用双射的单射性。最后，限制映射 $G\\to\\operatorname{Gal}(E/F)$ 是满射（$E/F$ 正规，$E$ 的 $F$-自同构可延拓到 $K$），核为 $\\operatorname{Gal}(K/E)$，故 $\\operatorname{Gal}(E/F)\\cong G/\\operatorname{Gal}(K/E)$。∎',
        '⭐ **第三条（正规 $\\iff$ 正规子群）是这条定理最有用的部分**：它把「域扩张的正规性」这个看起来抽象的条件，翻译成「对应的子群正规」。五次方程那条线就是靠它把「域的可解性」降成「群的可解性」。',
        '⚠ **三个条件都不能省**：不有限（$\\overline{\\mathbb{Q}}/\\mathbb{Q}$）时子群太多、中间域太多，双射变成「子群 $\\to$ 中间域」的单向且不满（伽罗瓦群是 profinite 群，要做无穷版本）；不可分时 $|\\operatorname{Gal}| < [K:F]$，数都对不上。'
      ].join('\n\n'),
      refs: [
        'Lang, Algebra, Ch. VI §2',
        'Hungerford, Algebra, Ch. V §4',
        'Artin, Galois Theory'
      ]
    },

    {
      id: 'thm.radical-solvable',
      cluster: 'algebra.galois',
      type: 'theorem',
      label: '根式可解 与 伽罗瓦群可解',
      title: '根式可解 $\\iff$ $\\operatorname{Gal}(f)$ 可解（char 0）',
      regions: ['algebra'],
      tags: ['定理', '代数', '域论', '群论'],
      statement: [
        '设 $F$ 是**特征 0** 的域，$f \\in F[x]$ 非零，$K$ 是 $f$ 的分裂域。则',
        '',
        '$f$ 的根可以用**根式**（四则运算与开 $n$ 次方）从 $F$ 的元素表示出来 $\\iff$ $\\operatorname{Gal}(K/F)$ 是**可解群**。',
      ].join('\n'),
      notes: [
        '**证明**。先把「根式可解」说清楚：存在域塔 $F=F_{0}\\subseteq F_{1}\\subseteq\\cdots\\subseteq F_{m}$，$F_{i}=F_{i-1}(\\alpha_{i})$、$\\alpha_{i}^{n_{i}}\\in F_{i-1}$（$1\\le i\\le m$），且 $K\\subseteq F_{m}$。char 0 下 $K/F$ 是伽罗瓦扩张（分裂域 + 可分）。两个方向分别证。',
        '**引理（Kummer 一步）**：设 $F$ 含本原 $m$ 次单位根 $\\zeta$，$E/F$ 是 $m$ 次循环扩张，则 $E=F(\\beta)$ 且 $\\beta^{m}\\in F$。证明：取生成元 $\\sigma$，把 $\\sigma$ 看成 $F$-线性变换。$\\sigma^{m}=1$，而 $x^{m}-1$ 在 $F$ 上分裂且无重根，故 $\\sigma$ 可对角化；又 $\\sigma$ 的阶为 $m$，故其特征值的阶的最小公倍数为 $m$，其中必有一个本原 $m$ 次单位根 $\\zeta^{k}$。取对应的特征向量 $\\beta$：$\\sigma(\\beta)=\\zeta^{k}\\beta$。于是 $\\sigma(\\beta^{m})=\\beta^{m}$，$\\beta^{m}$ 在 $\\sigma$ 的固定域里；循环扩张的固定域恰为 $F$，故 $\\beta^{m}\\in F$。又 $\\beta\\notin F$（否则 $\\sigma(\\beta)=\\beta$）。由于 $\\zeta^{k}$ 本原，$\\sigma^{d}(\\beta)=\\beta$ 当且仅当 $m\\mid d$；故 $F(\\beta)$ 的固定子群只含单位元，$[F(\\beta):F]=m$，从而 $E=F(\\beta)$。∎',
        '**$\\Leftarrow$（群可解 $\\implies$ 根式可解）**：设 $G=\\operatorname{Gal}(K/F)$ 可解。先假设 $F$ 含本原 $n$ 次单位根，$n=|G|$；对 $|G|$ 归纳。$|G|=1$ 时 $K=F$，无事可做。设 $|G|>1$。可解群有极大的真正规子群 $H$，此时 $G/H$ 单且交换，故是素数阶 $p$ 的循环群。令 $E=K^{H}$，伽罗瓦对应给 $[E:F]=p$、$\\operatorname{Gal}(E/F)=G/H$ 循环。$F$ 含 $\\zeta_{p}$，由 Kummer 一步，$E=F(\\beta)$、$\\beta^{p}\\in F$。另一方面 $K/E$ 伽罗瓦、群为 $H$，$H$ 可解且 $|H|<|G|$；$E$ 含本原 $|H|$ 次单位根（$|H|$ 整除 $n$），归纳假设给出从 $E$ 到 $K$ 的根式塔。把它接在一步 $F\\subseteq E$ 之后，就是 $K$ 在 $F$ 上的根式塔。',
        '**去掉单位根假设**：一般 $F$ 未必含 $\\zeta_{n}$。取 $N$ 为 $1,2,\\ldots,n$ 的公倍数（例如 $n!$），令 $F_{1}=F(\\zeta_{N})$、$K_{1}=K(\\zeta_{N})$。$K_{1}/F_{1}$ 伽罗瓦，限制映射 $\\operatorname{Gal}(K_{1}/F_{1})\\to\\operatorname{Gal}(K/F)$ 是单射，故 $G_{1}=\\operatorname{Gal}(K_{1}/F_{1})$ 可解且 $|G_{1}|\\le n$。$F_{1}$ 含所有次数 $\\le n$ 的单位根，特别是 $\\zeta_{|G_{1}|}$；上面已证的情形给出 $K_{1}$ 在 $F_{1}$ 上的根式塔。又 $F\\subseteq F_{1}=F(\\zeta_{N})$ 本身是一步根式扩张（$\\zeta_{N}^{N}=1\\in F$）。两段接起来，$K\\subseteq K_{1}$ 含在 $F$ 的根式塔中，故 $f$ 的根根式可解。',
        '**$\\implies$（根式可解 $\\implies$ 群可解）**：设 $F=F_{0}\\subseteq\\cdots\\subseteq F_{m}$ 是根式塔、$K\\subseteq F_{m}$、$\\alpha_{i}^{n_{i}}\\in F_{i-1}$。取 $N$ 为各 $n_{i}$ 的公倍数，令 $F^{\\prime}=F(\\zeta_{N})$、$E_{i}=F_{i}(\\zeta_{N})$；则 $E_{i}=E_{i-1}(\\alpha_{i})$、$\\alpha_{i}^{n_{i}}\\in E_{i-1}$，仍是根式塔，且底域 $E_{0}=F^{\\prime}$ 含 $\\zeta_{n_{i}}$。令 $M$ 为 $E_{m}$ 在 $F^{\\prime}$ 上的伽罗瓦闭包（各生成元极小多项式之积的分裂域），则 $M/F^{\\prime}$ 伽罗瓦，且 $K^{\\prime}=K(\\zeta_{N})\\subseteq M$。',
        '**逐层加闭包**：令 $M_{i}$ 为 $E_{i}$ 的所有 $F^{\\prime}$-共轭生成的合成域，则 $M_{0}=F^{\\prime}$、$M_{m}=M$，且每个 $M_{i}/F^{\\prime}$ 伽罗瓦。关键是 $M_{i}$ 由 $M_{i-1}$ 添加若干 $\\alpha_{i}$ 的共轭 $\\beta$ 得到，$\\beta^{n_{i}}\\in M_{i-1}$：写 $\\beta=\\sigma(\\alpha_{i})$，则 $\\beta^{n_{i}}=\\sigma(\\alpha_{i}^{n_{i}})\\in\\sigma(F_{i-1})\\subseteq M_{i-1}$。于是 $M_{i}/M_{i-1}$ 由若干 $n_{i}$ 次根生成，且 $\\zeta_{n_{i}}\\in F^{\\prime}\\subseteq M_{i-1}$，它是 Kummer 扩张：任意 $\\tau\\in\\operatorname{Gal}(M_{i}/M_{i-1})$ 把每个生成元 $\\beta$ 送到 $\\zeta_{n_{i}}^{k_{\\beta}}\\beta$，$\\tau\\mapsto(k_{\\beta})_{\\beta}$ 是到 $(\\mathbb{Z}/n_{i})^{r}$ 的单同态，故 $\\operatorname{Gal}(M_{i}/M_{i-1})$ 交换。',
        '**可解列**：因 $M_{i}/M_{i-1}$ 伽罗瓦，$\\operatorname{Gal}(M/M_{i})\\trianglelefteq\\operatorname{Gal}(M/M_{i-1})$，且商同构于 $\\operatorname{Gal}(M_{i}/M_{i-1})$，交换。于是 $\\operatorname{Gal}(M/F^{\\prime})\\ \\trianglerighteq\\ \\operatorname{Gal}(M/M_{1})\\ \\trianglerighteq\\ \\cdots\\ \\trianglerighteq\\ \\operatorname{Gal}(M/M_{m})=1$ 是正规列，各商交换，故 $\\operatorname{Gal}(M/F^{\\prime})$ 可解。',
        '**回到 $K$**：$K^{\\prime}/F$ 伽罗瓦（两个正规扩张的合成），限制映射 $\\operatorname{Gal}(M/F^{\\prime})\\to\\operatorname{Gal}(K^{\\prime}/F^{\\prime})$ 满射，故 $\\operatorname{Gal}(K^{\\prime}/F^{\\prime})$ 可解。又有正合列 $1\\to\\operatorname{Gal}(K^{\\prime}/F^{\\prime})\\to\\operatorname{Gal}(K^{\\prime}/F)\\to\\operatorname{Gal}(F^{\\prime}/F)\\to1$（分圆扩张伽罗瓦，限制满射），两端可解、$\\operatorname{Gal}(F^{\\prime}/F)$ 交换，故 $\\operatorname{Gal}(K^{\\prime}/F)$ 可解。最后 $\\operatorname{Gal}(K/F)$ 是 $\\operatorname{Gal}(K^{\\prime}/F)$ 的商：$K^{\\prime}/F$ 正规，$K$ 的每个 $F$-自同构都可延拓到 $K^{\\prime}$。可解群的商可解，故 $\\operatorname{Gal}(K/F)$ 可解。∎',
        '⭐ **为什么必须 char 0**：两个方向都用了「$x^{m}-1$ 无重根」（从而 $\\sigma$ 可对角化）与可分性。char $p$ 时纯开方扩张要换成 Artin–Schreier 扩张 $x^{p}-x-a$，结论要改写。',
        '📌 **这条定理是「五次方程」那条线的唯一入口**：它把「有没有根式公式」这个分析/代数混着的问题，换成一个纯群论问题（$S_{n}$ 可解 $\\iff n\\le4$，见「对称群的可解性」）。注意反过来用时要说清：$\\operatorname{Gal}(f)$ 不可解 $\\implies$ 无根式解；而不是「方程无解」。'
      ].join('\n\n'),
      refs: [
        'Lang, Algebra, Ch. VI §6',
        'Hungerford, Algebra, Ch. V §5',
        'Artin, Galois Theory'
      ]
    },

    {
      id: 'thm.quintic-unsolvable',
      cluster: 'algebra.galois',
      type: 'theorem',
      label: '五次方程没有根式解',
      title: 'Abel–Ruffini：一般五次方程无根式解',
      regions: ['algebra'],
      tags: ['定理', '代数', '域论', '群论'],
      statement: [
        '存在有理系数的五次多项式 $f \\in \\mathbb{Q}[x]$，它的根**不能**用四则运算与开方从 $\\mathbb{Q}$ 的元素表示；' +
          '更准确地说，$\\operatorname{Gal}(f) \\cong S_{5}$，而 $S_{5}$ 不可解。',
        '',
        '因此**不存在**用根式写出一般五次方程根的通用公式（Abel–Ruffini，1824）。',
      ].join('\n'),
      notes: [
        '**证明**。取 $f = x^{5} - 4x + 2$，分四步：$f$ 不可约 $\\implies$ 伽罗瓦群传递且含 5-循环；$f$ 恰有三个实根 $\\implies$ 复共轭给出换位；5-循环与换位生成 $S_{5}$；最后用 `thm.radical-solvable` 与 `prop.sn-solvable`。',
        '**第一步：$f$ 在 $\\mathbb{Q}$ 上不可约**。反设 $f = gh$，其中 $g, h \\in \\mathbb{Z}[x]$ 本原、$1 \\le \\deg g \\le 4$（Gauss 引理把 $\\mathbb{Q}[x]$ 的分解搬到 $\\mathbb{Z}[x]$）。模 $2$ 约化：$f \\equiv x^{5} \\pmod 2$，因为 $-4x$ 与 $2$ 都被 $2$ 整除。$\\mathbb{F}_{2}[x]$ 是唯一分解整环，$x^{5}$ 的非常数首一因子只有 $x^{k}$，故 $\\bar g = x^{k}$、$\\bar h = x^{5-k}$（$1 \\le k \\le 4$）。于是 $g(0) \\equiv h(0) \\equiv 0 \\pmod 2$，即 $4 \\mid g(0)h(0) = f(0) = 2$，矛盾。故 $f$ 不可约。∎',
        '**第二步：$G = \\operatorname{Gal}(f)$ 传递且含 5-循环**。不可约多项式的伽罗瓦群在根集上传递：任取两根 $\\alpha, \\beta$，$\\mathbb{Q}(\\alpha) \\cong \\mathbb{Q}[x]/(f) \\cong \\mathbb{Q}(\\beta)$ 给出一个把 $\\alpha$ 送到 $\\beta$ 的 $\\mathbb{Q}$-嵌入，再延拓到分裂域。传递群的轨道大小 $5$ 整除 $|G|$，故 $5 \\mid |G|$；由 Cauchy 定理，$G$ 含 5 阶元，而 $S_{5}$ 中的 5 阶元恰是 5-循环。记其中一个为 $\\sigma$。',
        '**第三步：$G$ 含一个换位**。$f^{\\prime}(x) = 5x^{4} - 4$，唯一临界点为 $\\pm\\alpha$，$\\alpha = (4/5)^{1/4} \\in (3/4, 1)$。$f$ 在 $(-\\infty, -\\alpha)$ 与 $(\\alpha, \\infty)$ 上递增、在 $(-\\alpha, \\alpha)$ 上递减。又 $\\alpha^{5} = \\tfrac{4}{5}\\alpha$，故 $f(\\alpha) = 2 - \\tfrac{16}{5}\\alpha < 2 - \\tfrac{16}{5}\\cdot\\tfrac{3}{4} = -\\tfrac{2}{5} < 0$，而 $f(-\\alpha) = 2 + \\tfrac{16}{5}\\alpha > 0$；且 $x \\to -\\infty$ 时 $f \\to -\\infty$，$x \\to +\\infty$ 时 $f \\to +\\infty$。由介值定理与上述单调性，$f$ 恰有三个实根，分别落在 $(-\\infty, -\\alpha)$、$(-\\alpha, \\alpha)$、$(\\alpha, \\infty)$ 内。复共轭 $\\tau$ 固定这三个实根、交换剩下两个非实根，所以 $\\tau \\in G$ 是一个换位（奇置换）。',
        '**第四步：$\\langle \\sigma, \\tau \\rangle = S_{5}$**。把 $\\sigma$ 写成 $(0\\,1\\,2\\,3\\,4)$。换位 $\\tau = (a\\,b)$ 的两个点在 5-循环上的距离只可能是 $1$ 或 $2$（距离 $d$ 与 $5-d$ 等价）。若距离为 $1$，$\\sigma^{k}\\tau\\sigma^{-k}$ 给出全部相邻换位 $(i\\,i+1)$，它们生成 $S_{5}$。若距离为 $2$，不妨取 $\\tau = (0\\,2)$：共轭给出 $(0\\,2), (1\\,3), (2\\,4), (3\\,0), (4\\,1)$。由 $(0\\,2)$ 与 $(2\\,4)$ 得乘积 $(0\\,4\\,2)$，于是 $\\{0, 2, 4\\}$ 上的 $S_{3}$（含换位 $(0\\,2)$）落在 $G$ 里；$S_{3}$ 与 5-循环合起来使 $|G|$ 被 $6$ 与 $5$ 整除，故 $30 \\mid |G|$。若 $|G|=30$，则 $G$ 是 $S_{5}$ 的指数 $4$ 子群；$S_{5}$ 在 $G$ 的 $4$ 个左陪集上的作用给出**传递**同态 $\\varphi:S_{5}\\to S_{4}$，其核必为 $S_{5}$ 的正规子群 $1$、$A_{5}$ 或 $S_{5}$。核为 $1$ 时得单射 $S_{5}\\hookrightarrow S_{4}$，$120>24$ 不可能；核为 $A_{5}$ 时像为 $S_{5}/A_{5}\\cong C_{2}$，而 $C_{2}$ 在 $4$ 个点上每条轨道长 $\\le 2$，不能传递；核为 $S_{5}$ 时作用平凡，也不能传递。矛盾，故 $|G|\\ne30$。$G$ 含奇置换，不能等于 $A_{5}$（$S_{5}$ 中唯一的指数 2 子群），所以 $|G| = 120$、$G = S_{5}$。',
        '**收尾**。于是 $\\operatorname{Gal}(f) \\cong S_{5}$。由 `prop.sn-solvable`，$S_{5}$ 不可解；由 `thm.radical-solvable`（特征 $0$，底域 $\\mathbb{Q}$），根式可解当且仅当伽罗瓦群可解。所以 $f$ 的根不能由 $\\mathbb{Q}$ 的元素经四则运算与开方写出，特别地不存在一般的五次根式公式。∎',
        '⭐ **精确的说法**：不是「五次方程没有解」，而是「**没有用根式写出的通用公式**」。根当然存在（代数基本定理），只是写不成开方的组合。有些特殊的五次方程有根式解，例如 $x^{5} - 2 = 0$，它的伽罗瓦群是循环群。',
        '⭐ **为什么是 5**：$S_{4}$ 可解（$A_{4}$ 可解），所以四次还有 Ferrari 公式；$A_{5}$ 是最小的非交换单群，可解性在这里第一次断掉。数字 5 的全部特殊性就在这一处。',
        '📌 **图上的位置**：这条定理的链条是「$\\operatorname{Gal}(f)$ 的可解性」（`prop.sn-solvable`）$\\to$「根式可解当且仅当群可解」（`thm.radical-solvable`）$\\to$ 本条。反过来用时要说清：不可解 $\\implies$ 无根式解，而不是「方程无解」。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §6', 'Stewart, Galois Theory, Ch. 24'],
    },
  ],

  edges: [
    /* ---------- 域扩张的两块原料 ---------- */
    {
      id: 'dep.field-fieldext',
      kind: 'definition',
      definition: 'def.field',
      usedBy: 'def.field-extension',
      note: '扩张的两端都是**域**；「子域」这个概念本身来自 `def.field` 的子结构。',
    },
    {
      id: 'dep.vectorspace-fieldext',
      kind: 'definition',
      definition: 'def.vector-space',
      usedBy: 'def.field-extension',
      note: '次数 $[K:F]$ 的定义就是「把 $K$ 看成 $F$-向量空间的维数」—— 借的是线性代数的机器。',
    },
    /* ---------- 代数元 ---------- */
    {
      id: 'dep.polyring-algelem',
      kind: 'definition',
      definition: 'def.polynomial-ring',
      usedBy: 'def.algebraic-element',
      note: '「$\\alpha$ 满足某个多项式」需要先有多项式环 $F[x]$；极小多项式也是 $F[x]$ 里的对象。',
    },
    {
      id: 'dep.fieldext-algelem',
      kind: 'definition',
      definition: 'def.field-extension',
      usedBy: 'def.algebraic-element',
      note: '代数性是「对某个基域 $F$」说的，所以先要有扩张。',
    },
    {
      id: 'dep.ideal-algelem',
      kind: 'definition',
      definition: 'def.ideal',
      usedBy: 'def.algebraic-element',
      note: '以 $\\alpha$ 为根的多项式构成**理想**（对加法与任意倍封闭），极小多项式是它的首一生成元。',
    },
    /* ---------- 代数扩张 ---------- */
    {
      id: 'dep.algelem-algext',
      kind: 'definition',
      definition: 'def.algebraic-element',
      usedBy: 'def.algebraic-extension',
      note: '代数扩张 = 每个元素都代数。',
    },
    /* ---------- 分裂域 ---------- */
    {
      id: 'dep.polyring-splitting',
      kind: 'definition',
      definition: 'def.polynomial-ring',
      usedBy: 'def.splitting-field',
      note: '分裂域是「让 $f \\in F[x]$ 彻底分解」的扩域。',
    },
    {
      id: 'dep.fieldext-splitting',
      kind: 'definition',
      definition: 'def.field-extension',
      usedBy: 'def.splitting-field',
      note: '分裂域是一种扩域（而且要求「由根生成」，不能随便加大）。',
    },
    /* ---------- 正规 / 可分 ---------- */
    {
      id: 'dep.algext-normal',
      kind: 'definition',
      definition: 'def.algebraic-extension',
      usedBy: 'def.normal-extension',
      note: '正规性是**代数扩张**的性质（不是任意扩张）。',
    },
    {
      id: 'dep.splitting-normal',
      kind: 'definition',
      definition: 'def.splitting-field',
      usedBy: 'def.normal-extension',
      note: '等价刻画：正规扩张就是「某一族多项式的分裂域」。',
    },
    {
      id: 'dep.algelem-separable',
      kind: 'definition',
      definition: 'def.algebraic-element',
      usedBy: 'def.separable-extension',
      note: '可分性用**极小多项式**有没有重根来判定。',
    },
    {
      id: 'dep.characteristic-separable',
      kind: 'definition',
      definition: 'def.characteristic',
      usedBy: 'def.separable-extension',
      note: '「char 0 自动可分」这条要拿特征做判据：char 0 时 $m\' \\ne 0$，于是不可约的 $m$ 与 $m\'$ 互素。',
    },
    /* ---------- 伽罗瓦群 ---------- */
    {
      id: 'dep.fieldext-galoisgroup',
      kind: 'definition',
      definition: 'def.field-extension',
      usedBy: 'def.galois-group',
      note: '伽罗瓦群是「固定 $F$ 的 $K$ 的自同构」，先要有扩张 $K/F$。',
    },
    {
      id: 'dep.group-galoisgroup',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.galois-group',
      note: '自同构在复合下成群 —— 群论由此进入域论。',
    },
    /* ---------- 伽罗瓦扩张 ---------- */
    {
      id: 'dep.normal-galoisext',
      kind: 'definition',
      definition: 'def.normal-extension',
      usedBy: 'def.galois-extension',
      note: '伽罗瓦 = 正规 + 可分 + 有限。',
    },
    {
      id: 'dep.separable-galoisext',
      kind: 'definition',
      definition: 'def.separable-extension',
      usedBy: 'def.galois-extension',
      note: '可分这一条保证「自同构够多」（$|\\operatorname{Gal}| = [K:F]$）。',
    },
    {
      id: 'dep.galoisgroup-galoisext',
      kind: 'definition',
      definition: 'def.galois-group',
      usedBy: 'def.galois-extension',
      note: '伽罗瓦扩张的等价刻画全部用伽罗瓦群说（$|G| = [K:F]$、$K^{G} = F$）。',
    },
    /* ---------- 基本定理 ---------- */
    {
      id: 'dep.galoisext-correspondence',
      kind: 'definition',
      definition: 'def.galois-extension',
      usedBy: 'thm.galois-correspondence',
      note: '基本定理的主语是**有限伽罗瓦扩张**；三个条件缺一条双射就坏。',
    },
    {
      id: 'dep.galoisgroup-correspondence',
      kind: 'definition',
      definition: 'def.galois-group',
      usedBy: 'thm.galois-correspondence',
      note: '对应的另一端就是 $G = \\operatorname{Gal}(K/F)$ 的子群格。',
    },
    {
      id: 'dep.normalsubgroup-correspondence',
      kind: 'definition',
      definition: 'def.normal-subgroup',
      usedBy: 'thm.galois-correspondence',
      note: '「中间域正规 $\\iff$ 对应子群正规」—— 这里用的是**群论**那个正规子群。',
    },
    {
      id: 'dep.lagrange-correspondence',
      kind: 'implication',
      sources: ['thm.lagrange'],
      target: 'thm.galois-correspondence',
      proof: '对应把中间域 $E$ 送到 $H=\\operatorname{Gal}(K/E)$。由 $[K:F]=[K:E][E:F]$ 与 Lagrange 定理 $[G:H]=|G|/|H|$，两边同除得 $[G:H]=[E:F]$ —— 这正是基本定理里的指数匹配。∎',
      note: '$[E:F] = [G : \\operatorname{Gal}(K/E)]$ 的右端是**指数**，靠 Lagrange 定理与群阶对上。',
    },
    /* ---------- 根式可解 ---------- */
    {
      id: 'dep.galoisgroup-radical',
      kind: 'definition',
      definition: 'def.galois-group',
      usedBy: 'thm.radical-solvable',
      note: '定理的左端是「根式写成」，右端是 $\\operatorname{Gal}(f)$ 的可解性 —— 桥就是它。',
    },
    {
      id: 'dep.solvable-radical',
      kind: 'definition',
      definition: 'def.solvable-group',
      usedBy: 'thm.radical-solvable',
      note: '「可解」在这里是**群论**的可解（有正规列、商群阿贝尔），与「方程可解」不是同一个意思 —— 定理说的正是两者等价。',
    },
    {
      id: 'dep.splitting-radical',
      kind: 'definition',
      definition: 'def.splitting-field',
      usedBy: 'thm.radical-solvable',
      note: '要谈「$f$ 的伽罗瓦群」得先有 $f$ 的分裂域。',
    },
    {
      id: 'dep.solvablequotients-radical',
      kind: 'implication',
      sources: ['thm.solvable-quotients'],
      target: 'thm.radical-solvable',
      title: '可解性对子群与商群的封闭支撑两个方向',
      proof: '两个方向都要「可解性对子群、商群封闭」（`thm.solvable-quotients`）。$(\\implies)$ 设 $K/F$ 根式可解，塔 $F=F_{0}\\subseteq\\cdots\\subseteq F_{m}$ 每步是循环扩张（或 $S_{p}$ 型）。令 $G_{i}=\\operatorname{Gal}(K/F_{i})$，得 $G_{0}=G\\supseteq\\cdots\\supseteq G_{m}=1$；每步 $G_{i+1}\\trianglelefteq G_{i}$ 且 $G_{i}/G_{i+1}\\cong\\operatorname{Gal}(F_{i+1}/F_{i})$ 循环或 $S_{p}$ 型，故各商可解，由封闭性 $G$ 可解。$(\\Leftarrow)$ 设 $G$ 可解，取可解列 $G=G_{0}\\supseteq\\cdots\\supseteq G_{m}=1$，对应固定域塔 $F\\subseteq K^{G_{m}}\\subseteq\\cdots\\subseteq K$；每步 $K^{G_{i+1}}/K^{G_{i}}$ 是循环扩张，由 Kummer 理论（含足够单位根时）可写成根式添加，故 $K$ 落在根式塔内。反向用到的「子群亦可解」同样出自这条定理。∎',
      note: '两个方向都要「可解性对商群/子群封闭」：塔的每一步商群可解 $\\iff$ 整个群可解。',
    },
    /* ---------- 五次方程 ---------- */
    {
      id: 'dep.radical-quintic',
      kind: 'implication',
      sources: ['thm.radical-solvable'],
      target: 'thm.quintic-unsolvable',
      proof: '`thm.radical-solvable` 给出「根式可解 $\\iff$ 群可解」，取逆否得「群不可解 $\\implies$ 无根式解」；$S_{5}$ 含不可解的正规子群 $A_{5}$，故以 $S_{5}$ 为伽罗瓦群的五次多项式无根式解。∎',
      note: '「$\\operatorname{Gal}(f)$ 不可解 $\\implies$ 无根式解」这一步就是那条定理的逆否。',
    },
    {
      id: 'dep.snsolvable-quintic',
      kind: 'implication',
      sources: ['prop.sn-solvable'],
      target: 'thm.quintic-unsolvable',
      title: '$S_{5}$ 不可解排除根式解',
      proof: '取 $f=x^{5}-4x+2$。前三步定出伽罗瓦群是 $S_{5}$：不可约 $\\implies$ 传递含 $5$-循环；恰三实根 $\\implies$ 复共轭给一个换位；$5$-循环加换位生成 $S_{5}$。最后一步取逆否：若 $f$ 根式可解，`thm.radical-solvable` 给出 $\\operatorname{Gal}(f)$ 可解；但 $S_{5}$ 不可解 —— 这正是 `prop.sn-solvable` 的内容（$A_{5}$ 单且非交换，故 $S_{5}$ 的换位子列停在 $A_{5}\\ne1$）。矛盾。∎',
      note: '$S_{5}$ 不可解（$A_{5}$ 单且非交换）—— 图里那句孤立的话，现在终于有下游了。',
    },
    /* ---------- 与既有零件的类比：伽罗瓦群 vs 向量空间的对称 ---------- */
    {id: "e183.analogy",
      kind: 'analogy',
      a: 'def.galois-group',
      b: 'def.vector-space',
      title: '「固定基域的自同构」与「保持结构的映射」是同一个套路',
      note: [
        '两处都在做**同一件事**：先定一个「结构」（这里是域扩张 $K/F$，那里是向量空间），' +
          '再取「保持它不变的变换」（$F$-自同构 / 线性映射），然后数这些变换。',
        '差别在于：向量空间那边数出来的是**环**（$\\operatorname{End}$），伽罗瓦这边数出来的是**群**，' +
          '而域的自同构太少（只有群，没有加法结构可加），这恰恰是伽罗瓦理论能反过来说「域由群决定」的原因。',
      ].join('\n\n'),
    },
  ],
});
