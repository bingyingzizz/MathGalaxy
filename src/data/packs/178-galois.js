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
      status: 'skeleton',
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
        '⚠ **本节点只给骨架**（`status: skeleton`）。完整证明分两大段，本图只写路线：',
        '1. **反向单射**：$E \\mapsto \\operatorname{Gal}(K/E)$ 显然反序；要证「$E = K^{\\operatorname{Gal}(K/E)}$」' +
          '—— 这一步用伽罗瓦条件 + Artin 的线性无关性引理（不同自同构线性无关），是本图的空白。',
        '2. **满射**：任一子群 $H \\le G$ 都要是某个中间域的固定群，即 $H = \\operatorname{Gal}(K/K^{H})$，' +
          '且 $[K : K^{H}] = |H|$（Artin 定理）。',
        '⭐ **第三条（正规 $\\iff$ 正规子群）是这条定理最有用的部分**：它把「域扩张的正规性」这个' +
          '看起来抽象的条件，翻译成「对应的子群正规」。五次方程那条线就是靠它把「域的可解性」' +
          '降成「群的可解性」。',
        '⚠ **三个条件都不能省**：不有限（$\\overline{\\mathbb{Q}}/\\mathbb{Q}$）时子群太多、中间域太多，' +
          '双射变成「子群 $\\to$ 中间域」的单向且不满（伽罗瓦群是 profinite 群，要做无穷版本）；' +
          '不可分时 $|\\operatorname{Gal}| < [K:F]$，数都对不上。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §2', 'Hungerford, Algebra, Ch. V §4', 'Artin, Galois Theory'],
    },

    {
      id: 'thm.radical-solvable',
      cluster: 'algebra.galois',
      type: 'theorem',
      label: '根式可解 与 伽罗瓦群可解',
      title: '根式可解 $\\iff$ $\\operatorname{Gal}(f)$ 可解（char 0）',
      regions: ['algebra'],
      tags: ['定理', '代数', '域论', '群论'],
      status: 'skeleton',
      statement: [
        '设 $F$ 是**特征 0** 的域，$f \\in F[x]$ 非零，$K$ 是 $f$ 的分裂域。则',
        '',
        '$f$ 的根可以用**根式**（四则运算与开 $n$ 次方）从 $F$ 的元素表示出来 $\\iff$ $\\operatorname{Gal}(K/F)$ 是**可解群**。',
      ].join('\n'),
      notes: [
        '⚠ **骨架**。两个方向各有一条主线，本图只记路线：',
        '- **$\\Leftarrow$（可解 $\\implies$ 根式可解）**：把可解列 $G = G_{0} \\trianglerighteq G_{1} \\trianglerighteq \\cdots \\trianglerighteq \\{e\\}$ ' +
          '翻译成域塔 $F = E_{0} \\subseteq E_{1} \\subseteq \\cdots \\subseteq K$，每一步商群是循环群；' +
          '循环扩张在 char 0 下可以靠**添加单位根 + Kummer 理论**用开方实现。',
        '- **$\\implies$（根式可解 $\\implies$ 可解）**：反过来，把根式塔翻译成群塔，用「循环扩张的伽罗瓦群是循环群」' +
          '（这一步又靠伽罗瓦对应 + `thm.solvable-quotients`），拼出可解列。',
        '⭐ **为什么必须 char 0**：可解 $\\implies$ 根式那一步要用 $n$ 次单位根与 Kummer 理论；' +
          'char $p$ 时 $x^{p} - x - a$ 这类 Artin–Schreier 扩张取代了纯开方扩张，结论要改写。',
        '📌 这条定理是「五次方程」那条线**唯一的入口**：它把「有没有根式公式」这个分析/代数混着的问题，' +
          '换成一个纯群论问题（$S_{n}$ 可解 $\\iff n \\le 4$，见「对称群的可解性」）。',
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. VI §6', 'Hungerford, Algebra, Ch. V §5', 'Artin, Galois Theory'],
    },

    {
      id: 'thm.quintic-unsolvable',
      cluster: 'algebra.galois',
      type: 'theorem',
      label: '五次方程没有根式解',
      title: 'Abel–Ruffini：一般五次方程无根式解',
      regions: ['algebra'],
      tags: ['定理', '代数', '域论', '群论'],
      status: 'skeleton',
      statement: [
        '存在有理系数的五次多项式 $f \\in \\mathbb{Q}[x]$，它的根**不能**用四则运算与开方从 $\\mathbb{Q}$ 的元素表示；' +
          '更准确地说，$\\operatorname{Gal}(f) \\cong S_{5}$，而 $S_{5}$ 不可解。',
        '',
        '因此**不存在**用根式写出一般五次方程根的通用公式（Abel–Ruffini，1824）。',
      ].join('\n'),
      notes: [
        '⚠ **骨架**，但这一步的拼装很短，本图的零件已经齐了：',
        '1. 取 $f = x^{5} - 4x + 2$（或任何 $\\operatorname{Gal}(f) = S_{5}$ 的五次多项式）—— ' +
          '需要一条判据（模 $p$ 的分解型定出伽罗瓦群的循环子群），本图未收；',
        '2. $S_{5}$ 不可解（$A_{5}$ 单且非交换，见「对称群的可解性」）；',
        '3. 由 `thm.radical-solvable`，$\\operatorname{Gal}(f)$ 不可解 $\\implies$ 无根式解。',
        '⭐ **精确的说法**：不是「五次方程没有解」，是「**没有用根式写出的通用公式**」——' +
          '根当然存在（代数基本定理），只是写不成开方的组合。有些特殊的五次方程有根式解' +
          '（例如 $x^{5} - 2 = 0$，伽罗瓦群是循环群）。',
        '⭐ **为什么是 5**：$S_{4}$ 可解（$A_{4}$ 可解），所以四次还有 Ferrari 公式；' +
          '$A_{5}$ 是**最小的非交换单群**，可解性在这里第一次断掉 —— 数字 5 的全部特殊性就在这。',
        '📌 这条定理在图上终于接上了：以前「$S_{5}$ 不可解」是一句孤立的话，' +
          '没有一条线通向「所以五次方程没有根式解」。现在那条线是：' +
          '$\\operatorname{Gal}(f)$ 的可解性 $\\to$ 根式可解那条定理 $\\to$ 本条。',
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
      kind: 'definition',
      definition: 'thm.lagrange',
      usedBy: 'thm.galois-correspondence',
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
      kind: 'definition',
      definition: 'thm.solvable-quotients',
      usedBy: 'thm.radical-solvable',
      note: '两个方向都要「可解性对商群/子群封闭」：塔的每一步商群可解 $\\iff$ 整个群可解。',
    },
    /* ---------- 五次方程 ---------- */
    {
      id: 'dep.radical-quintic',
      kind: 'definition',
      definition: 'thm.radical-solvable',
      usedBy: 'thm.quintic-unsolvable',
      note: '「$\\operatorname{Gal}(f)$ 不可解 $\\implies$ 无根式解」这一步就是那条定理的逆否。',
    },
    {
      id: 'dep.snsolvable-quintic',
      kind: 'definition',
      definition: 'prop.sn-solvable',
      usedBy: 'thm.quintic-unsolvable',
      note: '$S_{5}$ 不可解（$A_{5}$ 单且非交换）—— 图里那句孤立的话，现在终于有下游了。',
    },
    /* ---------- 与既有零件的类比：伽罗瓦群 vs 向量空间的对称 ---------- */
    {
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
