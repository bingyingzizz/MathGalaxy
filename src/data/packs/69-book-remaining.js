/* ==========================================================================
   内容包 · 原书里剩下的条目（第 1–4 章与 §7 的零头）
   --------------------------------------------------------------------------
   这一批补的都是**图上原本没有**的条目，每条都先回原书核对了陈述与证明：
     1.2.4   等价函子的判据（全忠实 + 本质满）
     1.5.10  $p^{-1}$ 有左伴随 $\\iff$ 沿 $p$ 的 Kan 延拓都存在
     1.5.11  有余极限 $\\implies$ Kan 延拓总存在（逐点公式）
     3.1.2   预层范畴的极限与余极限逐点算
     3.2.10  关联层 $X^{\\sharp} = h_{X}^{\\#}$ 及其万有性质
     3.4.2   任意函子诱导预层范畴之间的拓扑斯态射（含 3.4.3）
     4.2.7   $\\mathrm{Cond} \\to k\\mathbf{Top}$ 保有限积
     7.1.20  消解：左/右、投射/内射
     7.2.18  下有界双复形给出谱序列
     7.3.2   覆盖 $\\implies$ $\\mathbb{Z}\\cdot X_{\\bullet}$ 零调
     7.3.8   Čech 到上同调的谱序列
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '函子、层与谱序列',

  nodes: [

    /* ----------------------------------------------------- 1.2.4 */
    {
      id: 'thm.equivalence-criterion',
      cluster: 'cat.functor',
      type: 'theorem',
      label: '等价函子的判据',
      title: '定理：$F$ 是等价 $\\iff$ $F$ 全忠实且本质满',
      regions: ['category'],
      tags: ['定理', '范畴等价', '全忠实', '本质满', '伪逆'],
      statement: [
        '函子 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 是**范畴等价** $\\iff$ $F$ **全忠实**且**本质满**。',
        '',
        '也就是说：$F$ 有伪逆 $\\iff$ 它在每对 Hom 集上是双射，且像**同构于**每个对象。'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '**$(\\Longleftarrow)$** 设 $F$ 全忠实、本质满。对每个 $X\' \\in \\mathcal{C}\'$ 选一个 $G(X\') \\in \\mathcal{C}$ 与一个同构',
          '$$\\varphi_{X\'} : F\\bigl(G(X\')\\bigr) \\longrightarrow X\'$$',
          '（本质满给出存在性，选择公理给出这一族的选择）✓。',
          '对 $f\' : X\' \\to Y\'$，令 $G(f\') : G(X\') \\to G(Y\')$ 是**唯一**使',
          '$$F\\bigl(G(f\')\\bigr) = \\varphi_{Y\'}^{-1} \\circ f\' \\circ \\varphi_{X\'}$$',
          '的态射 —— $F$ 全忠实，这样的态射存在且唯一 ✓。这样定义的 $G$ 保恒等与复合（两边都过了 $F$，再全忠实即得）✓，所以 $G$ 是函子。',
          '由构造，$\\varphi : F \\circ G \\implies 1_{\\mathcal{C}\'}$ 是自然同构 ✓。另一侧：每个 $X$ 处 $\\varphi_{F(X)}^{-1} : F(X) \\to F\\bigl(GF(X)\\bigr)$ 在全忠实之下来自唯一的 $\\psi_{X} : X \\to GF(X)$，而 $\\psi$ 自然（自然性同样过 $F$ 检验，由 $\\varphi$ 的自然性得到）✓，于是 $\\psi : 1_{\\mathcal{C}} \\implies G \\circ F$ 也是自然同构 ✓。',
          '**$(\\Longrightarrow)$** 设 $F$ 有伪逆 $G$，即 $F G \\cong 1_{\\mathcal{C}\'}$、$G F \\cong 1_{\\mathcal{C}}$。',
          '- **本质满**：$X\' \\cong F\\bigl(G(X\')\\bigr)$ ✓；',
          '- **全忠实**：$\\operatorname{Hom}(X, Y) \\xrightarrow{\\ F\\ } \\operatorname{Hom}(FX, FY)$ 的逆由',
          '$$\\operatorname{Hom}(FX, FY) \\xrightarrow{\\ G\\ } \\operatorname{Hom}(GFX, GFY) \\cong \\operatorname{Hom}(X, Y)$$',
          '给出（最后一步用 $GF \\cong 1_{\\mathcal{C}}$ 的自然性）✓。∎'
        ].join('\n'),
        '⭐ 这条把「两个范畴一样」这件含糊的事换成两条**可以逐项检查**的判据：Hom 集上是双射（全忠实）、像覆盖到同构（本质满）。',
        '⚠️ 两条缺一不可：全忠实但不本质满的函子（例如 $\\mathbf{Set}$ 里单点满子范畴的含入）不是等价；本质满但不忠实的函子也不是。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Theorem 1.2.4']
    },

    /* ----------------------------------------------------- 1.5.10 */
    {
      id: 'prop.kan-extension-adjoint',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: 'Kan 延拓与伴随的存在性',
      title: '命题：$p^{-1}$ 有左伴随 $\\iff$ 沿 $p$ 的 Kan 延拓都存在',
      regions: ['category'],
      tags: ['命题', 'Kan 延拓', '伴随', '预复合函子'],
      statement: [
        '设 $p : \\mathcal{C} \\to \\mathcal{C}\'$ 是小范畴之间的函子，$\\mathcal{D}$ 是范畴。则**预复合函子**',
        '',
        '$$p^{-1} : \\operatorname{Hom}(\\mathcal{C}\', \\mathcal{D}) \\longrightarrow \\operatorname{Hom}(\\mathcal{C}, \\mathcal{D}), \\qquad G \\longmapsto G \\circ p$$',
        '',
        '有**左伴随** $p_{!}$ $\\iff$ **沿 $p$ 的、取值在 $\\mathcal{D}$ 中的左 Kan 延拓总存在**。',
        '',
        '对偶地：$p^{-1}$ 有右伴随 $p_{*}$ $\\iff$ 右 Kan 延拓总存在。'
      ].join('\n'),
      notes: [
        [
          '**证明。** 两边逐字对照即可。',
          '「$p^{-1}$ 有左伴随 $p_{!}$」说的是：对每个 $F \\in \\operatorname{Hom}(\\mathcal{C}, \\mathcal{D})$ 存在 $p_{!}F \\in \\operatorname{Hom}(\\mathcal{C}\', \\mathcal{D})$ 与自然同构',
          '$$\\operatorname{Hom}\\bigl(p_{!}F,\\ G\\bigr) \\;\\cong\\; \\operatorname{Hom}\\bigl(F,\\ p^{-1}G\\bigr) = \\operatorname{Hom}\\bigl(F,\\ G \\circ p\\bigr).$$',
          '右边的数据正是「$F$ 沿 $p$ 的左 Kan 延拓」的定义（泛性质）✓：伴随的**单位** $\\eta_{F} : F \\implies p_{!}F \\circ p$ 就是定义里的那条 $\\alpha$，而同构本身给出 $\\alpha$ 的泛性质 ✓。',
          '所以「每个 $F$ 都有左 Kan 延拓」与「$p^{-1}$ 有左伴随」是同一句话；对偶地把箭头反过来即得右 Kan 延拓那一条 ✓。∎'
        ].join('\n'),
        '⭐ 读法：**Kan 延拓不是新东西，它就是预复合函子的伴随**。这一条把「到处都要用 Kan 延拓」与「到处都要用伴随」两套话合成了一套。',
        '⚠️ 命题本身**不保证存在**，它只说「伴随」与「Kan 延拓」同生同死；存在性要另加条件（见「有余极限时 Kan 延拓总存在」）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Proposition 1.5.10']
    },

    /* ----------------------------------------------------- 1.5.11 */
    {
      id: 'prop.kan-extension-exists',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '有余极限时 Kan 延拓总存在',
      title: '命题：$\\mathcal{D}$ 有余极限 $\\implies$ 沿 $p$ 的左 Kan 延拓总存在',
      regions: ['category'],
      tags: ['命题', 'Kan 延拓', '余极限', '逗号范畴', '逐点公式'],
      statement: [
        '若 $\\mathcal{D}$ 有**所有小余极限**，则任意 $F : \\mathcal{C} \\to \\mathcal{D}$ 沿任意 $p : \\mathcal{C} \\to \\mathcal{C}\'$ 的**左 Kan 延拓总存在**，并可由**逐点公式**算出：',
        '',
        '$$(p_{!}F)(X\') \\;=\\; \\varinjlim_{p(X) \\to X\'} F(X),$$',
        '',
        '其中的余极限沿**逗号范畴** $p \\downarrow X\'$ 取（对象是形如 $p(X) \\to X\'$ 的态射）。',
        '',
        '对偶地：$\\mathcal{D}$ 有所有小极限 $\\implies$ 右 Kan 延拓总存在，$(p_{*}F)(X\') = \\varprojlim_{X\' \\to p(X)} F(X)$。'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '**（一）造 $p_{!}F$ 在对象上的值。** 对每个 $X\' \\in \\mathcal{C}\'$，逗号范畴 $p \\downarrow X\'$ 的对象是 $(X, f : p(X) \\to X\')$，态射是使 $f\' \\circ p(u) = f$ 的 $u : X \\to X\'$。这一族 $\\{F(X)\\}$ 连同「$u$ 给出 $F(u) : F(X) \\to F(X\')$」构成一个余锥，取其余极限就得到 $(p_{!}F)(X\')$ ✓。',
          '**（二）在态射上的值。** 给定 $u\' : X\' \\to Y\'$，把 $X\'$ 处的余锥沿 $u\'$ 推前（$(X, f) \\mapsto (X, u\' \\circ f)$）得 $Y\'$ 处的余锥，泛性质给出 $(p_{!}F)(u\')$ ✓，函子性由泛性质中的唯一性得到 ✓。',
          '**（三）那条自然变换 $\\alpha : F \\implies p_{!}F \\circ p$。** 在 $X$ 处取 $p(X) \\xrightarrow{\\ 1\\ } p(X)$ 对应的那条腿 $F(X) \\to (p_{!}F)\\bigl(p(X)\\bigr)$ ✓。',
          '**（四）泛性质。** 设 $G : \\mathcal{C}\' \\to \\mathcal{D}$ 与 $\\gamma : F \\implies G \\circ p$。在 $X\'$ 处，$\\{\\gamma_{X} \\text{ 后接 } G(f) : F(X) \\to G(X\')\\}_{f : p(X) \\to X\'}$ 是 $G(X\')$ 里的一个余锥，于是得唯一的 $\\widetilde{\\gamma}_{X\'} : (p_{!}F)(X\') \\to G(X\')$ ✓；唯一性来自余极限的泛性质，自然性两边都是余锥的映射，逐点验证即可 ✓。',
          '于是 $\\operatorname{Hom}(p_{!}F, G) \\cong \\operatorname{Hom}(F, G \\circ p)$ ✓，即 $p_{!} \\dashv p^{-1}$ ✓。∎'
        ].join('\n'),
        '⭐ 用处：**预层范畴的完备性/余完备性把 Kan 延拓变成自动的**。取 $\\mathcal{D} = \\mathbf{Set}$ 就得到「任何函子在预层范畴之间都诱导一对伴随」—— 这正是「任意函子诱导拓扑斯态射」的引擎。',
        '⚠️ 公式里的余极限**不能随手换成「沿 $\\mathcal{C}$ 取」**：索引范畴是逗号范畴 $p \\downarrow X\'$，它的对象会随 $X\'$ 变化。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Proposition 1.5.11']
    },

    /* ----------------------------------------------------- 3.1.2 */
    {
      id: 'thm.presheaf-limits-colimits',
      cluster: 'cat.yoneda',
      type: 'theorem',
      label: '预层范畴的极限与余极限',
      title: '定理：$\\widehat{\\mathcal{C}}$ 里极限余极限都存在，而且逐点算',
      regions: ['category'],
      tags: ['定理', '预层范畴', '逐点', '完备', '余完备'],
      statement: [
        '预层范畴 $\\widehat{\\mathcal{C}}$ 里**所有小极限与小余极限都存在**，而且都是**逐点**算的：对每个 $X \\in \\mathcal{C}$，',
        '',
        '$$\\Bigl(\\varinjlim_{i} T_{i}\\Bigr)(X) \\;\\cong\\; \\varinjlim_{i} T_{i}(X), \\qquad \\Bigl(\\varprojlim_{i} T_{i}\\Bigr)(X) \\;\\cong\\; \\varprojlim_{i} T_{i}(X).$$',
        '',
        '等价的说法：对每个 $X$，**求值函子** $\\widehat{\\mathcal{C}} \\to \\mathbf{Set}$，$T \\mapsto T(X)$，**既保所有极限也保所有余极限**。'
      ].join('\n'),
      notes: [
        [
          '**证明。** 分两步。',
          '**（一）逐点定义确实给出极限（余极限）。** 在 $\\mathbf{Set}$ 里对每个 $X \\in \\mathcal{C}$ 取那族集合的极限（或余极限）；对态射 $f : Y \\to X$，限制映射 $\\bigl(\\varprojlim T_i\\bigr)(X) \\to \\bigl(\\varprojlim T_i\\bigr)(Y)$ 由极限的泛性质给出（余极限那一侧由余极限的泛性质给出）✓。这样得到的预层连同逐点给出的锥（余锥）满足泛性质：一个锥到 $\\varprojlim T_i$ 的映射在每一点 $X$ 处都唯一确定，而泛性质是**逐点**陈述的，所以在每一点成立就在整体成立 ✓。',
          '**（二）$\\mathbf{Set}$ 完备且余完备。**',
          '- **小极限存在**：小积存在（选择公理给出选择函数的集合）；等化子存在（$\\{x : f(x) = g(x)\\}$ 是子集）；而**极限由积与等化子造**，所以所有小极限存在 ✓。',
          '- **小余极限存在**：小余积是不交并；余等化子是商集；对偶地所有小余极限存在 ✓。',
          '两步合起来：对每个 $X$ 逐点取 $\\mathbf{Set}$ 里的极限（余极限）得到 $\\widehat{\\mathcal{C}}$ 里的极限（余极限）✓，而「求值函子保极限余极限」就是「逐点算」的另一种说法 ✓。∎'
        ].join('\n'),
        '⭐ 这是后面几乎所有构造的**地基**：预层范畴的好处正是「极限余极限不花钱」，于是在它里面可以做各种形式构造，再把结果层化回去。',
        '⚠️ 「逐点算」只对**极限与余极限**成立，不对一般的东西成立 —— 层化、内 Hom、层上同调都不是逐点的。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Theorem 3.1.2']
    },

    /* ----------------------------------------------------- 3.2.10 */
    {
      id: 'def.associated-sheaf',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '关联层',
      title: '定义：$X^{\\sharp} := h_{X}^{\\#}$',
      regions: ['category'],
      tags: ['定义', '关联层', '层化', '米田嵌入', '左正合'],
      statement: [
        '设 $\\mathcal{C}$ 是景，$X \\in \\mathcal{C}$。**关联层**（associated sheaf）是「先米田嵌入、再层化」：',
        '',
        '$$X^{\\sharp} \\;:=\\; h_{X}^{\\#}, \\qquad h_{X} = \\operatorname{Hom}_{\\mathcal{C}}(-, X).$$',
        '',
        '它由一条**万有性质**刻画：对任何层 $F$，',
        '',
        '$$\\operatorname{Hom}\\bigl(X^{\\sharp},\\ F\\bigr) \\;\\cong\\; F(X).$$'
      ].join('\n'),
      notes: [
        '**这个同构怎么来的。** 层化 $(-)^{\\#}$ 与含入 $\\widehat{\\mathcal{C}}^{\\#} \\hookrightarrow \\widehat{\\mathcal{C}}$ 互为伴随，所以',
        '$$\\operatorname{Hom}\\bigl(h_{X}^{\\#},\\ F\\bigr) \\cong \\operatorname{Hom}(h_{X}, F) \\cong F(X),$$',
        '最后一步是米田引理 ✓。',
        '⭐ **用处**：它给出「把 $\\mathcal{C}$ 的对象当成层看」的规范做法 $X \\mapsto X^{\\sharp}$。当拓扑**次标准**时 $h_{X}$ 本来就是层，于是 $X^{\\sharp} = h_{X}$，米田嵌入直接经过层范畴 ✓（这也是「次标准」最常用的等价说法）。',
        '⚠️ 这个函子**左正合**（米田嵌入保极限、层化也左正合），但一般**不忠实**，也不保余极限与无穷极限：层化会把「同一个对象的不同预层描述」粘起来。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Definition 3.2.10']
    },

    /* ----------------------------------------------------- 3.4.2 + 3.4.3 */
    {
      id: 'thm.induced-topos-morphism',
      cluster: 'cat.topos',
      type: 'theorem',
      label: '任意函子诱导拓扑斯态射',
      title: '定理：$\\hat{g}_{!} \\dashv \\hat{g}^{-1} \\dashv \\hat{g}_{*}$，于是 $\\hat{g}$ 是拓扑斯的态射',
      regions: ['category'],
      tags: ['定理', '拓扑斯态射', '预层范畴', '左伴随', '右伴随'],
      statement: [
        '设 $g : \\mathcal{C} \\to \\mathcal{C}\'$ 是任意函子。则预复合',
        '',
        '$$\\hat{g}^{-1} : \\widehat{\\mathcal{C}\'} \\longrightarrow \\widehat{\\mathcal{C}}, \\qquad T\' \\longmapsto T\' \\circ g^{\\mathrm{op}}$$',
        '',
        '**既有一个左伴随 $\\hat{g}_{!}$，又有一个右伴随 $\\hat{g}_{*}$**。特别地 $\\hat{g}^{-1}$ 正合，于是',
        '',
        '$$\\hat{g} : \\widehat{\\mathcal{C}} \\longrightarrow \\widehat{\\mathcal{C}\'}, \\qquad \\hat{g}^{*} := \\hat{g}^{-1} \\ \\dashv\\ \\hat{g}_{*}$$',
        '',
        '是拓扑斯的态射。也就是说，**任意函子都诱导预层范畴之间的态射**，方向与 $g$ 相反。'
      ].join('\n'),
      notes: [
        '⭐ 一句话读法：$g$ 只是范畴之间的一条箭头，可是一旦取预层范畴，它自动长出**两边**的伴随 —— 左边 $\\hat{g}_{!}$ 与右边 $\\hat{g}_{*}$。于是「函子」到了预层这一层就升级成「拓扑斯态射」。',
        '⚠️ 方向容易记反：$g : \\mathcal{C} \\to \\mathcal{C}\'$ 而 $\\hat{g} : \\widehat{\\mathcal{C}} \\to \\widehat{\\mathcal{C}\'}$，**推前** $\\hat{g}_{*}$ 沿 $g$ 的方向走、**拉回** $\\hat{g}^{-1}$ 反着走。',
        '📌 这条是「拓扑空间 / 景之间的映射给出拓扑斯态射」的一般引擎；它在第 4 章被用来把 $\\mathbf{CHaus}$ 上的层与更小景上的层对齐。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Theorem 3.4.2, Corollary 3.4.3']
    },

    /* ----------------------------------------------------- 4.2.7 */
    {
      id: 'cor.cond-ktop-finite-products',
      cluster: 'cond.set',
      type: 'corollary',
      label: '底空间保有限积',
      title: '推论：$(X \\times Y)(\\cdot) \\;\\cong\\; k\\bigl(X(\\cdot) \\times Y(\\cdot)\\bigr)$',
      regions: ['condensed'],
      tags: ['推论', '凝聚态集', '底空间', '紧生成', '有限积'],
      statement: [
        '函子 $\\mathrm{Cond} \\to k\\mathbf{Top}$，$X \\mapsto X(\\cdot)$，**保有限积**：对任意 $X, Y \\in \\mathrm{Cond}$，',
        '',
        '$$(X \\times Y)(\\cdot) \\;\\cong\\; k\\bigl(X(\\cdot) \\times Y(\\cdot)\\bigr).$$',
        '',
        '（右端必须先 $k$-化：$\\mathbf{Top}$ 里那个积一般是紧生成的。）'
      ].join('\n'),
      notes: [
        '⭐ **为什么重要**：它说明「凝聚态集 $\\mapsto$ 底拓扑空间」这个函子**不破坏有限积**，所以 $\\mathrm{Cond}$ 里算出来的积，落到空间上还是那个积（取 $k$-化后）。这是把 $\\mathrm{Cond}$ 里的代数构造翻译回拓扑构造时最常用的一步。',
        '⚠️ 换成 $\\mathbf{Top}$（不取 $k$-化）就**不再成立** —— 根子在 $\\mathbf{Top}$ 不是笛卡尔闭的。',
        '📌 例：$S \\times X(\\cdot) \\cong (S \\times X)(\\cdot)$ 这类投影公式（$S$ 局部紧 Hausdorff）就是同一条道理的另一副面孔。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Corollary 4.2.7']
    },

    /* ----------------------------------------------------- 7.1.20 */
    {
      id: 'def.resolution',
      cluster: 'hom.cohomology',
      type: 'definition',
      label: '消解',
      title: '定义：左/右消解、投射/内射消解',
      regions: ['homology'],
      tags: ['定义', '消解', '内射消解', '投射消解', '拟同构'],
      statement: [
        '设 $f : K^{\\bullet} \\to L^{\\bullet}$ 是复形之间的**拟同构**，就说 $L^{\\bullet}$ 是 $K^{\\bullet}$ 的一个**右消解**（right resolution，也叫 replacement）；若每个 $L^{n}$ 都是**内射**对象，就叫**内射消解**。',
        '',
        '把箭头反过来（即到 $\\mathcal{A}^{\\mathrm{op}}$ 里去取同样的定义），得到**左消解**；若每个 $L^{n}$ 都是**投射**对象，就叫**投射消解**。'
      ].join('\n'),
      notes: [
        '**为什么要「消解」。** 导出函子要拿**好算**的复形去算：内射对象上任何加法函子的高次导出函子为零，所以用内射消解算 $R^{n}F$ 时，只需取 $F$ 再算同调 —— 这就是「消解」的全部意义 ✓。',
        '⚠️ 名字说的是**复形朝哪一侧延伸**（右消解朝高次方向延伸），**不是**箭头的方向：箭头始终是 $K^{\\bullet} \\to L^{\\bullet}$。反过来的箭头叫左消解。',
        '**存在性**：有足够多内射时，每个下有界复形都有内射消解（逐次把核嵌入内射对象）✓；对偶地，有足够多投射时每个上有界复形都有投射消解 ✓。',
        '**例**：自由阿贝尔群层拼出的 $\\mathbb{Z}\\cdot X_{\\bullet} \\to \\mathbb{Z}\\cdot X$ 是一条**投射**消解（见「覆盖给出的自由复形零调」）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Definition 7.1.20']
    },

    /* ----------------------------------------------------- 7.2.18 */
    {
      id: 'prop.bicomplex-spectral',
      cluster: 'hom.spectral',
      type: 'proposition',
      label: '双复形给出谱序列',
      title: '命题：下有界双复形 $\\implies$ $E^{0}_{p,q} = K^{p,q} \\Longrightarrow H^{p+q}(K^{\\bullet})$',
      regions: ['homology'],
      tags: ['命题', '双复形', '谱序列', '全复形', '下有界'],
      statement: [
        '设 $K^{\\bullet,\\bullet}$ 是双复形，且在**两个方向上都下有界**。则存在谱序列',
        '',
        '$$E^{0}_{p,q} \\;=\\; K^{p,q} \\;\\Longrightarrow\\; H^{p+q}(K^{\\bullet}),$$',
        '',
        '其中 $K^{\\bullet}$ 是**全复形** $K^{n} := \\bigoplus_{p+q=n} K^{p,q}$，微分为 $d + d\'$（带符号）。'
      ].join('\n'),
      notes: [
        '⭐ **下一页就是「逐行算完再逐列算」**：沿竖直方向取同调得',
        '$$E^{1}_{p,q} \\;=\\; H^{q}\\bigl(K^{p,\\bullet}\\bigr),$$',
        '再沿水平方向取同调得 $E^{2}$ 页。谱序列说的就是：这两步走完的结果，最终收敛到全复形的同调 $H^{p+q}(K^{\\bullet})$ ✓。',
        '⭐ 典型用法：把「一个复形作内射消解」自然得到的双复形按这条取谱序列，就得到 **Grothendieck 谱序列**；按另一种过滤（先横后竖）则得到 Cartan–Eilenberg 那一套分解 ✓。',
        '⚠️ **下有界**不能省：谱序列在无界情形要额外讨论收敛（一般要用 $\\varprojlim$ 的整套语言）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Proposition 7.2.18']
    },

    /* ----------------------------------------------------- 7.3.2 */
    {
      id: 'lem.covering-free-acyclic',
      cluster: 'hom.sheafcoh',
      type: 'lemma',
      label: '覆盖给出的自由复形零调',
      title: '引理：$X = (X_{i} \\to X)$ 是覆盖 $\\implies$ $\\mathbb{Z}\\cdot X_{\\bullet}$ 零调',
      regions: ['homology'],
      tags: ['引理', '覆盖', '自由复形', '零调', 'Čech 脉', '层化'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯，$X = (X_{i} \\to X)_{i \\in I}$ 是 $\\mathcal{T}$ 中的一个**覆盖**（即 $\\coprod_{i} X_{i} \\to X$ 是满态射）。记它的 **Čech 脉**为',
        '',
        '$$X_{n} \\;:=\\; \\coprod_{i_{0}, \\ldots, i_{n}} X_{i_{0}} \\times_{X} \\cdots \\times_{X} X_{i_{n}},$$',
        '',
        '则增广复形 $\\mathbb{Z}\\cdot X_{\\bullet} \\to \\mathbb{Z}\\cdot X$ **零调**：',
        '',
        '$$H^{n}\\bigl(\\mathbb{Z}\\cdot X_{\\bullet}\\bigr) = 0 \\qquad (n \\ge 0).$$',
        '',
        '这里 $\\mathbb{Z}\\cdot X$ 是 $X$ 生成的**自由阿贝尔群层**。'
      ].join('\n'),
      notes: [
        '⭐ **用处**：它说 $\\mathbb{Z}\\cdot X_{\\bullet} \\to \\mathbb{Z}\\cdot X$ 是一条**自由（因而是投射）消解**。于是「用 Čech 复形算上同调」有了依据 —— $\\check{C}^{\\bullet}(X, M) = \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X_{\\bullet}, M)$ 确实是在拿一条投射消解算 $\\operatorname{RHom}$ ✓（见「Čech 上同调是沿覆盖筛的余极限」）。',
        '⚠️ 注意「覆盖」在这里是**整族** $(X_{i} \\to X)$：零调说的是整条 Čech 脉，而不只是某一个 $X_{i}$。',
        '📌 这条与「带截面的覆盖上 Čech 零调」的关系是：**后者是前者证明里最硬的那一步**（有截面时能写出显式同伦），前者再靠「逐点 + 层化」把截面推广成任意覆盖。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Lemma 7.3.2']
    },

    /* ----------------------------------------------------- 7.3.8 */
    {
      id: 'cor.cech-cohomology-spectral',
      cluster: 'hom.sheafcoh',
      type: 'corollary',
      label: 'Čech 到上同调的谱序列',
      title: '推论：$\\check{H}^{p}\\bigl(X, H^{q}(M)\\bigr) \\Longrightarrow H^{p+q}(X, M)$',
      regions: ['homology'],
      tags: ['推论', 'Čech 上同调', '层上同调', '谱序列', '滤过余极限'],
      statement: [
        '设 $\\mathcal{C}$ 是有纤维积的景、$X \\in \\mathcal{C}$、$M$ 是 $\\mathcal{C}$ 上的**阿贝尔层**。则存在谱序列',
        '',
        '$$E^{p,q}_{2} \\;=\\; \\check{H}^{p}\\bigl(X,\\ H^{q}(M)\\bigr) \\;\\Longrightarrow\\; H^{p+q}(X,\\ M),$$',
        '',
        '其中 $H^{q}(M)$ 记预层 $U \\mapsto H^{q}(U, M)$，而 $\\check{H}^{p}(X, -)$ 是沿覆盖取滤过余极限的 Čech 上同调。'
      ].join('\n'),
      notes: [
        '⭐ **用处**：这是「用 Čech 上同调算层上同调」的一般依据。要让两者直接**相等**（而不只是被一条谱序列联系），只要再要求高次 Čech 群在 $E_{2}$ 页退化 —— 这正是「无环 $\\iff$ Čech 上同调为零」的证明里用的那一步 ✓。',
        '⚠️ 与 Cartan–Leray 那条谱序列的区别：那条**固定一个覆盖** $\\mathfrak{X}$；这条把所有覆盖都取了余极限，所以左端可以直接写成 $\\check{H}^{p}(X, \\cdot)$。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Corollary 7.3.8']
    }

  ],

  edges: [

    /* ---- 1.2.4 ---- */
    {
      id: 'def-link.equivcrit-cat',
      kind: 'definition',
      definition: 'def.cat-equivalence',
      usedBy: 'thm.equivalence-criterion',
      note: '定理要刻画的就是「范畴等价」这条定义。'
    },
    {
      id: 'def-link.equivcrit-ff',
      kind: 'definition',
      definition: 'def.ff-faithful',
      usedBy: 'thm.equivalence-criterion',
      note: '判据的一半是「全忠实」。'
    },
    {
      id: 'def-link.equivcrit-es',
      kind: 'definition',
      definition: 'def.essentially-surjective',
      usedBy: 'thm.equivalence-criterion',
      note: '判据的另一半是「本质满」。'
    },

    /* ---- 1.5.10 / 1.5.11 ---- */
    {
      id: 'def-link.kanadj-kan',
      kind: 'definition',
      definition: 'def.kan-extension',
      usedBy: 'prop.kan-extension-adjoint',
      note: '命题说的是「Kan 延拓存在」与「预复合有伴随」等价。'
    },
    {
      id: 'def-link.kanadj-adj',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.kan-extension-adjoint',
      note: '另一头是伴随的定义。'
    },
    {
      id: 'def-link.kanex-kan',
      kind: 'definition',
      definition: 'def.kan-extension',
      usedBy: 'prop.kan-extension-exists',
      note: '命题给出 Kan 延拓存在的充分条件与逐点公式。'
    },
    {
      id: 'def-link.kanex-comma',
      kind: 'definition',
      definition: 'def.comma-category',
      usedBy: 'prop.kan-extension-exists',
      note: '逐点公式里的索引范畴就是逗号范畴 $p \\downarrow X\'$。'
    },

    /* ---- 3.1.2 ---- */
    {
      id: 'def-link.pfcat-limits',
      kind: 'definition',
      definition: 'def.presheaf-cat',
      usedBy: 'thm.presheaf-limits-colimits',
      note: '定理说的是预层范畴本身的完备性与余完备性。'
    },
    {
      id: 'def-link.pfcat-eval',
      kind: 'definition',
      definition: 'def.presheaf',
      usedBy: 'thm.presheaf-limits-colimits',
      note: '「逐点算」说的就是求值函子 $T \\mapsto T(X)$ 那件事。'
    },

    /* ---- 3.2.10 ---- */
    {
      id: 'def-link.assoc-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'def.associated-sheaf',
      note: '关联层是层范畴里的一个对象，用它的 Hom 集刻画。'
    },
    {
      id: 'def-link.assoc-presheaf',
      kind: 'definition',
      definition: 'def.presheaf',
      usedBy: 'def.associated-sheaf',
      note: '它由可表示预层 $h_{X}$ 层化而来。'
    },

    /* ---- 3.4.2 / 3.4.3 ---- */
    {
      id: 'def-link.indtop-topos',
      kind: 'definition',
      definition: 'def.topos-morphism',
      usedBy: 'thm.induced-topos-morphism',
      note: '结论是「$\\hat{g}$ 是拓扑斯的态射」。'
    },
    {
      id: 'imp-link.kanex-indtop',
      kind: 'implication',
      sources: ['prop.kan-extension-exists', 'thm.presheaf-limits-colimits'],
      target: 'thm.induced-topos-morphism',
      title: '预层范畴完备 $\\implies$ 任意函子诱导拓扑斯态射',
      proof: [
        '由「预层范畴的极限与余极限逐点算」，$\\widehat{\\mathcal{C}}$ 与 $\\widehat{\\mathcal{C}\'}$ 都有所有小极限与小余极限 ✓。',
        '于是对 $\\hat{g}^{-1} = (-) \\circ g^{\\mathrm{op}}$ 沿 $g$ 的左、右 Kan 延拓都存在（由「有余极限时 Kan 延拓总存在」）✓，也即 $\\hat{g}^{-1}$ 既有左伴随 $\\hat{g}_{!}$ 又有右伴随 $\\hat{g}_{*}$ ✓。',
        '再看正合性：$\\hat{g}^{-1}$ 是**右**伴随（它左边站着 $\\hat{g}_{!}$），右伴随保所有极限 ✓，所以 $\\hat{g}^{-1}$ 保有限极限，即左正合 ✓。',
        '于是按拓扑斯态射的定义，$(\\hat{g}^{-1} \\dashv \\hat{g}_{*})$ 连同 $\\hat{g}^{-1}$ 的左正合性给出态射 $\\hat{g} : \\widehat{\\mathcal{C}} \\to \\widehat{\\mathcal{C}\'}$ ✓。∎'
      ].join('\n')
    },

    /* ---- 4.2.7 ---- */
    {
      id: 'def-link.condktop-underlying',
      kind: 'definition',
      definition: 'def.underlying-topological-space',
      usedBy: 'cor.cond-ktop-finite-products',
      note: '函子 $X \\mapsto X(\\cdot)$ 就是「底拓扑空间」。'
    },
    {
      id: 'imp-link.expon-condktop',
      kind: 'implication',
      sources: ['prop.cg-cartesian-closed', 'prop.cond-internal-hom'],
      target: 'cor.cond-ktop-finite-products',
      title: '紧生成空间的指数律 $\\implies$ 底空间保有限积',
      proof: [
        '设 $X, Y \\in \\mathrm{Cond}$，$Z$ 是任意**紧生成**空间。逐步用三条同构：',
        '1. $\\mathbf{Top}$ 里的指数律（紧生成空间是笛卡尔闭的）：',
        '$$C\\bigl(k(X(\\cdot) \\times Y(\\cdot)),\\ Z\\bigr) \\;\\cong\\; C\\bigl(X(\\cdot),\\ kC(Y(\\cdot), Z)\\bigr) ✓$$',
        '2. 内部 Hom 的函数空间刻画（$Z$ 紧生成时 $\\operatorname{Hom}(X, \\underline{Z}) \\cong C(X(\\cdot), Z)$），两次：',
        '$$\\cong \\operatorname{Hom}\\bigl(X,\\ \\operatorname{Hom}(Y, \\underline{Z})\\bigr) \\;\\cong\\; \\operatorname{Hom}\\bigl(X \\times Y,\\ \\underline{Z}\\bigr) ✓$$',
        '3. 再用一次内部 Hom 刻画，并用 $\\operatorname{Hom}(X \\times Y, \\underline{Z}) = (X \\times Y)(\\cdot)$ 的取值定义：',
        '$$\\cong C\\bigl((X \\times Y)(\\cdot),\\ Z\\bigr) ✓$$',
        '于是 $C\\bigl(k(X(\\cdot) \\times Y(\\cdot)), Z\\bigr) \\cong C\\bigl((X \\times Y)(\\cdot), Z\\bigr)$ 对一切紧生成 $Z$ 成立，由米田引理得 $k\\bigl(X(\\cdot) \\times Y(\\cdot)\\bigr) \\cong (X \\times Y)(\\cdot) ✓$。∎',
        '⚠️ 第一步**必须**在紧生成的世界里做：$\\mathbf{Top}$ 一般不是笛卡尔闭的，不取 $k$-化时同构链在第一步就断了。'
      ].join('\n')
    },

    /* ---- 7.1.20 ---- */
    {
      id: 'def-link.res-quasiiso',
      kind: 'definition',
      definition: 'def.quasi-iso',
      usedBy: 'def.resolution',
      note: '「消解」是拿拟同构定义的一条复形。'
    },
    {
      id: 'def-link.res-derived',
      kind: 'definition',
      definition: 'def.right-derived-functor',
      usedBy: 'def.resolution',
      note: '消解存在的意义就是算导出函子。'
    },

    /* ---- 7.2.18 ---- */
    {
      id: 'def-link.bicss-bicomplex',
      kind: 'definition',
      definition: 'def.bicomplex',
      usedBy: 'prop.bicomplex-spectral',
      note: '命题的对象就是双复形连它的全复形。'
    },
    {
      id: 'imp-link.filt-bicss',
      kind: 'implication',
      sources: ['thm.filtered-complex-spectral'],
      target: 'prop.bicomplex-spectral',
      title: '下有界过滤复形给出谱序列 $\\implies$ 双复形给出谱序列',
      proof: [
        '在全复形 $K^{n} = \\bigoplus_{p+q=n} K^{p,q}$ 上取**逐列过滤**',
        '$$F^{p}K^{n} \\;:=\\; \\bigoplus_{i+j=n,\\ i \\ge p} K^{i,j}$$',
        '（$p$ 越大剩下的越少，所以这是**递降**过滤）✓。',
        '**下有界性**：$p \\le$ 两个方向的下界时 $F^{p}K^{n} = K^{n}$ ✓，于是这个过滤下有界，可以套「下有界过滤复形给出谱序列」✓。',
        '**识别第 $0$ 页**：$\\operatorname{Gr}^{p}K^{p+q} = F^{p}K^{p+q}/F^{p+1}K^{p+q} = K^{p,q}$ ✓，所以 $E^{0}_{p,q} = K^{p,q}$ ✓。',
        '**收敛**：那条定理直接给出 $E^{0}_{p,q} \\implies H^{p+q}(K^{\\bullet})$ ✓。∎'
      ].join('\n')
    },

    /* ---- 7.3.2 ---- */
    {
      id: 'def-link.covac-cycle',
      kind: 'definition',
      definition: 'def.cech-functor',
      usedBy: 'lem.covering-free-acyclic',
      note: '这条引理是 Čech 那套机器能开工的前提。'
    },
    {
      id: 'imp-link.sect-covac',
      kind: 'implication',
      sources: ['prop.cech-section-vanishing', 'thm.sheafification'],
      target: 'lem.covering-free-acyclic',
      title: '有截面的 Čech 同伦 $\\implies$ 任意覆盖上自由复形零调',
      proof: [
        '**（一）化到单个满态射。** 令 $X_{0} := \\coprod_{i} X_{i}$。满态射 $X_{0} \\to X$ 的 Čech 脉的第 $n$ 项正是 $\\coprod_{i_{0},\\ldots,i_{n}} X_{i_{0}} \\times_{X} \\cdots \\times_{X} X_{i_{n}} = X_{n}$ ✓，所以只需证明 $X_{0} \\twoheadrightarrow X$ 的情形。',
        '**（二）$\\mathcal{T} = \\mathbf{Set}$。** 满射有截面 $s$（选择公理）✓。沿截面取',
        '$$s^{n} := s \\times_{X} 1_{X_{n}} : X_{n} \\longrightarrow X_{n+1},$$',
        '它满足收缩同伦的恒等式 $1_{X_{n}} = s^{n+1} d_{n} + d_{n+1} s^{n}$ ✓（逐面展开即得），于是增广复形同伦平凡，特别地零调 ✓。这正是「带截面的覆盖上 Čech 零调」那条命题。',
        '**（三）$\\mathcal{T} = \\widehat{\\mathcal{C}}$（预层）。** 由上一条定理，预层范畴里的极限与余极限逐点算，而零调是「逐点取同调为零」，于是在每个 $X \\in \\mathcal{C}$ 处化回 (二) ✓。',
        '**（四）$\\mathcal{T} = \\widehat{\\mathcal{C}}^{\\#}$（景上的层）。** 任意满态射都是 $\\widehat{\\mathcal{C}}$ 中某个满态射的**层化** ✓。层化**正合**（既保有限极限、又保余极限），所以它把预层版本的 Čech 脉逐项送过来、并保持复形的正合性；再由层化的正合性，预层版本的零调直接给出层版本的零调 ✓。∎'
      ].join('\n')
    },

    /* ---- 7.3.8 ---- */
    {
      id: 'def-link.cechss-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'cor.cech-cohomology-spectral',
      note: '推论把 Čech 上同调与层上同调用一条谱序列连起来。'
    },
    {
      id: 'imp-link.cartanleray-cechss',
      kind: 'implication',
      sources: ['thm.cartan-leray', 'prop.cech-as-colim'],
      target: 'cor.cech-cohomology-spectral',
      title: 'Cartan–Leray（固定覆盖）$\\implies$ 取遍覆盖的谱序列',
      proof: [
        '先对 $X$ 的**每个**覆盖 $\\mathfrak{X}$ 用 Cartan–Leray：存在谱序列',
        '$$E^{p,q}_{2} = \\check{H}^{p}\\bigl(\\mathfrak{X},\\ H^{q}(M)\\bigr) \\;\\Longrightarrow\\; H^{p+q}(X, M) ✓$$',
        '（右端与覆盖无关，正是层上同调本身）✓。',
        '再沿所有覆盖取**滤过余极限**：$\\check{H}^{p}(X, -) = \\varinjlim_{\\mathfrak{X} \\in \\operatorname{Cov}(X)} \\check{H}^{p}(\\mathfrak{X}, -)$ ✓（Čech 上同调就是沿覆盖取的余极限）。',
        '滤过余极限**正合**（保有限极限、保正合列），所以它把每一页的谱序列逐项保下来 —— 页、微分、以及收敛到同一个 $H^{p+q}(X, M)$ 都被保住 ✓。于是得到 $E^{p,q}_{2} = \\check{H}^{p}(X, H^{q}(M)) \\implies H^{p+q}(X, M)$ ✓。∎'
      ].join('\n')
    }

  ]
});
