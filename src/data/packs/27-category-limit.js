/* ==========================================================================
   内容包 · 图与极限（13 条）
   --------------------------------------------------------------------------
   第三团：交换图 → 锥 → 极限 → 各种形状的极限 → 子对象与像。

   依赖顺序：图就是函子，所以先有函子；锥是「常图到图」的自然变换；
   极限是泛锥；积、纤维积、等化子都是「换一个索引范畴」的特例。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '图与极限',
  nodes: [

    /* ---------------------------------------------------------- 图 */
    {
      id: 'def.commutative-diagram',
      cluster: 'cat.limit',
      type: 'definition',
      label: '交换图',
      title: '交换图（Commutative Diagram）',
      regions: ['category'],
      tags: ['范畴论', '图', '索引范畴'],
      statement: [
        '设 $I$ 是一个**小范畴**（只有一个小集合那么多对象与态射）。$\\mathcal{C}$ 中**以 $I$ 为索引范畴的图**（也叫 $I$ 上的交换图）就是一个函子',
        '',
        '$$D : I \\longrightarrow \\mathcal{C}$$',
        '',
        '所有这样的图以自然变换为态射，组成范畴',
        '',
        '$$\\mathcal{C}^{I} := \\operatorname{Hom}(I, \\mathcal{C})$$'
      ].join('\n'),
      notes: [
        '之所以叫「交换图」，是因为 $I$ 里的复合 $\\beta \\circ \\alpha$ 被 $D$ 送到 $\\mathcal{C}$ 里的复合 $D(\\beta) \\circ D(\\alpha)$ —— 函子的定义里已经写死了两个复合相等，所以图上沿不同路径走结果一样，这正是「交换」。',
        '$I$ 叫**索引范畴**：它只规定图的形状，不规定内容。',
        '沿一个函子 $\\lambda : I \\to J$ 预复合，得到**重索引** $\\lambda^{*} : \\mathcal{C}^{J} \\to \\mathcal{C}^{I}$：把 $J$ 形状的图截成 $I$ 形状的图。特别地，到终范畴的唯一函子 $I \\to \\mathbf{1}$ 诱导**常图函子** $\\Delta : \\mathcal{C} \\longrightarrow \\mathcal{C}^{I}$，它把对象 $X$ 送到「每个位置都是 $X$、每条箭头都是 $1_X$」的常图。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 单纯对象 */
    {
      id: 'def.simplicial',
      cluster: 'cat.limit',
      type: 'definition',
      label: '单纯对象',
      title: '单纯对象（Simplicial Object）',
      regions: ['category'],
      tags: ['范畴论', '单纯', '索引范畴'],
      statement: [
        '**单纯形范畴** $\\Delta$ 的对象是',
        '',
        '$$[0], \\ [1], \\ [2], \\ \\ldots, \\ [n], \\ \\ldots$$',
        '',
        '而 $[n] \\to [m]$ 的态射取全体**单调映射**（不要求 $n \\le m$，也不要求严格）。$\\Delta$ 的全体态射由两类生成：',
        '',
        '- **面映射** $\\delta^{i} : [n-1] \\to [n]$：跳过第 $i$ 个点（$i = 0, \\ldots, n$）；',
        '- **退化映射** $\\sigma^{i} : [n] \\to [n-1]$：重复第 $i$ 个点。',
        '',
        '只保留面映射的子范畴记 $\\Delta_{\\mathrm{inj}}$，只保留退化映射的记 $\\Delta_{\\mathrm{surj}}$。$\\mathcal{C}$ 中的**单纯对象**是图',
        '',
        '$$X : \\Delta^{\\mathrm{op}} \\longrightarrow \\mathcal{C}$$',
        '',
        '只保留面映射的图（$\\Delta_{\\mathrm{inj}}^{\\mathrm{op}} \\to \\mathcal{C}$）叫**半单纯对象**。'
      ].join('\n'),
      notes: [
        '把 $[n]$ 画成一个顶点数 $n+1$ 的标准单纯形，面映射就是「贴一个面」，退化映射就是「把一个顶点压扁」。于是 $\\Delta$ 是「所有标准单纯形及其贴合方式」的骨架，$\\Delta^{\\mathrm{op}} \\to \\mathcal{C}$ 的一个图就是把一串层层相套的单纯形安进 $\\mathcal{C}$ 里 —— 这是把空间编码成代数数据的最省事的办法。',
        '取 $\\mathcal{C} = \\mathbf{Set}$，$X([n])$ 就是「$n$ 维单纯形的集合」，$X(\\delta^i)$ 给出「第 $i$ 个面」，$X(\\sigma^i)$ 给出「退化」。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------------- 锥 */
    {
      id: 'def.cone',
      cluster: 'cat.limit',
      type: 'definition',
      label: '锥',
      title: '锥与余锥（Cone / Cocone）',
      regions: ['category'],
      tags: ['范畴论', '锥', '自然变换'],
      statement: [
        '设 $D : I \\to \\mathcal{C}$ 是一个图。$D$ 上的**锥**是一个对象 $X \\in \\mathcal{C}$ 连同一族态射',
        '',
        '$$p_i : X \\longrightarrow D(i) \\qquad (i \\in I)$$',
        '',
        '使得对 $I$ 中每条 $\\alpha : i \\to j$ 都有',
        '',
        '$$D(\\alpha) \\circ p_i = p_j$$',
        '',
        '等价地说，锥就是从常图 $\\Delta X$ 到 $D$ 的一个自然变换。把其中的箭头全部反向，得到**余锥**。'
      ].join('\n'),
      notes: [
        '直观：$X$ 站在图外面，往 $D$ 的每个位置上各投一束光，而且要求投影之间彼此相容（先投影再走图中的箭头，与直接投影到终点，结果一样）。',
        '$X$ 固定时，$D$ 上的锥恰好是自然变换集 $\\operatorname{Nat}(\\Delta X, D)$，所以「锥」不是新东西，只是把自然变换换了个说法。'
      ].join('\n\n')
    },

    /* -------------------------------------------------------- 极限 */
    {
      id: 'def.limit',
      cluster: 'cat.limit',
      type: 'definition',
      label: '极限',
      title: '极限与余极限（Limit / Colimit）',
      regions: ['category'],
      tags: ['范畴论', '极限', '泛性质'],
      statement: [
        '图 $D : I \\to \\mathcal{C}$ 的**极限**是对 $D$ 上的锥具有泛性质的那一个：锥 $(\\lim D,\\ p_i)$ 使得对任意锥 $(Y,\\ g_i)$，存在**唯一**的态射 $g : Y \\to \\lim D$ 使',
        '',
        '$$p_i \\circ g = g_i \\qquad (i \\in I)$$',
        '',
        '等价地，锥函子被 $\\lim D$ 表示：',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}^{I}}(\\Delta Y, D) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}(Y, \\lim D)$$',
        '',
        '对偶地，$D$ 的**余极限** $\\operatorname{colim} D$ 满足 $\\operatorname{Hom}_{\\mathcal{C}^{I}}(D, \\Delta Y) \\cong \\operatorname{Hom}_{\\mathcal{C}}(\\operatorname{colim} D, Y)$。$I$ 有限时叫**有限极限**。'
      ].join('\n'),
      notes: [
        '泛性质的含义只有一句：**任何别的锥都唯一地穿过它**。所以极限一旦存在，就在同构意义下唯一 —— 不必挑一个具体构造，用哪个都行。',
        '两个等价的写法：「泛锥」与「$\\operatorname{Hom}_{\\mathcal{C}^{I}}(\\Delta -, D)$ 可被表示」。后者把极限变成了一条可计算的同构。',
        '「泛」还可以说得更彻底：极限就是锥范畴里的**终对象**（见「元素范畴」）。这一句话在后面反复出现。'
      ].join('\n\n')
    },

    /* -------------------------------------------------- 终 / 始对象 */
    {
      id: 'def.final-initial',
      cluster: 'cat.limit',
      type: 'definition',
      label: '终对象 / 始对象',
      title: '终对象与始对象（Terminal / Initial Object）',
      regions: ['category'],
      tags: ['范畴论', '极限', '空图'],
      statement: [
        '$\\mathcal{C}$ 的**终对象** $\\mathbf{1}_{\\mathcal{C}}$ 是空图 $\\emptyset \\to \\mathcal{C}$ 的极限，**始对象** $\\mathbf{0}_{\\mathcal{C}}$ 是它的余极限。用同构集来刻画：',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}(X, \\mathbf{1}_{\\mathcal{C}}) = \\{*\\}, \\qquad \\operatorname{Hom}_{\\mathcal{C}}(\\mathbf{0}_{\\mathcal{C}}, X) = \\{*\\}$$',
        '',
        '（对每个对象 $X$ 都恰好只有一个态射）。二者同时存在且同构时，叫**零对象**。'
      ].join('\n'),
      notes: [
        '例：在 $\\mathbf{Set}$ 里 $\\mathbf{0} = \\emptyset$（射入 $X$ 的映射只有空映射）、$\\mathbf{1} = \\{\\emptyset\\}$（射入单点集的映射唯一）。在 $\\mathbf{Top}$ 里相同。在 $\\mathbf{Ab}$ 里两者都是 $\\{0\\}$。',
        '另一头：$\\mathbb{Z}$ 是环范畴的始对象 —— 每个环都有唯一的 $\\mathbb{Z} \\to R$。所以说 $\\mathbb{Z}$「在所有环里泛」，说的正是这件事。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------------- 积 */
    {
      id: 'def.product',
      cluster: 'cat.limit',
      type: 'definition',
      label: '积 / 余积',
      title: '积与余积（Product / Coproduct）',
      regions: ['category'],
      tags: ['范畴论', '极限', '离散范畴'],
      statement: [
        '取 $I$ 为**离散范畴**（只有对象，没有非恒等的态射），图 $D : I \\to \\mathcal{C}$ 就只是一族对象 $(X_i)_{i \\in I}$。它的极限叫**积** $\\prod_{i} X_i$，余极限叫**余积** $\\coprod_{i} X_i$。泛性质写成同构集就是',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}\\Bigl(Y, \\prod_{i} X_i\\Bigr) \\;\\cong\\; \\prod_{i} \\operatorname{Hom}_{\\mathcal{C}}(Y, X_i)$$'
      ].join('\n'),
      notes: [
        '一句话：**积就是「一个映射 = 一族映射」**。射入积的映射与「分别射入每个分量的映射组成的族」一一对应，投影 $p_i$ 就是取出第 $i$ 个分量。',
        '例：$\\mathbf{Set}$ 里积是笛卡尔积，余积是无交并；$\\mathbf{Top}$ 里积取**乘积拓扑**（使它成为积的最粗的拓扑），余积取**不交并拓扑**（最细的那个）；$\\mathbf{Ab}$ 里积是直积 $\\prod_i A_i$，余积是直和 $\\bigoplus_i A_i$。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------- 纤维积 */
    {
      id: 'def.fibered-product',
      cluster: 'cat.limit',
      type: 'definition',
      label: '纤维积 / 纤维余积',
      title: '纤维积与纤维余积（Pullback / Pushout）',
      regions: ['category'],
      tags: ['范畴论', '极限', '拉回'],
      statement: [
        '形状为 $X_1 \\xrightarrow{f_1} X_0 \\xleftarrow{f_2} X_2$ 的图的极限叫**纤维积**，记 $X_1 \\times_{X_0} X_2$，也叫 $f_1$ 沿 $f_2$ 的**拉回**。它补成一个交换方块',
        '',
        '$$\\begin{array}{ccc} X_1 \\times_{X_0} X_2 & \\longrightarrow & X_2 \\\\ \\downarrow & & \\downarrow f_2 \\\\ X_1 & \\xrightarrow{f_1} & X_0 \\end{array}$$',
        '',
        '这样的方块叫**笛卡尔的**。对偶地，图的余极限叫**纤维余积**，也叫**推出**。'
      ].join('\n'),
      notes: [
        '直观：拉回是「在底 $X_0$ 上匹配之后的积」—— 解方程 $f_1(x_1) = f_2(x_2)$；推出是「把 $X_1, X_2$ 在 $X_0$ 的像上粘起来」。',
        '例（$\\mathbf{Set}$）：',
        '',
        '$$X_1 \\times_{X_0} X_2 = \\{(x_1, x_2) \\in X_1 \\times X_2 : f_1(x_1) = f_2(x_2)\\}, \\qquad X_1 \\cup_{X_0} X_2 = (X_1 \\sqcup X_2)/\\!\\sim$$',
        '',
        '其中 $\\sim$ 由 $f_1(x_0) \\sim f_2(x_0)$（$x_0 \\in X_0$）生成。$\\mathbf{Top}$ 里拉回取子空间拓扑、推出取商拓扑。',
        '$\\mathbf{Ab}$ 里两个都化成核与余核：把 $f: X \\to S$、$g: Y \\to S$ 拼成 $\\varphi : X \\oplus Y \\to S$，$(x,y) \\mapsto f(x) - g(y)$，则推出 $= \\operatorname{coker} \\varphi$、拉回 $= \\ker \\varphi$ —— 第一步取直和，第二步把 $f, g$ 的差商掉。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------- 等化子 */
    {
      id: 'def.equalizer',
      cluster: 'cat.limit',
      type: 'definition',
      label: '等化子 / 余等化子',
      title: '等化子与余等化子（Equalizer / Coequalizer）',
      regions: ['category'],
      tags: ['范畴论', '极限', '核'],
      statement: [
        '平行对 $f, g : X \\rightrightarrows Y$ 的极限叫**等化子**，记 $\\operatorname{eq}(f,g) = \\ker(f,g)$；余极限叫**余等化子**，记 $\\operatorname{coker}(f,g)$。它们接成',
        '',
        '$$\\ker(f,g) \\longrightarrow X \\overset{f}{\\underset{g}{\\rightrightarrows}} Y \\longrightarrow \\operatorname{coker}(f,g)$$',
        '',
        '且中间的 $\\ker(f,g) \\to X$ 是单态射、右端的 $Y \\to \\operatorname{coker}(f,g)$ 是满态射。这一段叫**左正合**。'
      ].join('\n'),
      notes: [
        '直观：等化子是 $X$ 里「被 $f$ 与 $g$ 送到同一处」的那一部分；余等化子是 $Y$ 里「把 $f(x)$ 与 $g(x)$ 粘起来」的商。',
        '例：$\\mathbf{Set}$ 里 $\\ker(f,g) = \\{x \\in X : f(x) = g(x)\\}$，$\\operatorname{coker}(f,g) = Y/\\!\\sim$（$\\sim$ 由 $f(x) \\sim g(x)$ 生成）。$\\mathbf{Top}$ 里加子空间 / 商拓扑。$\\mathbf{Ab}$ 里 $\\ker(f,g) = \\ker(f - g)$ —— 两个映射的等化子退化成**一个**映射的核，这正是「核」这个名字的来源。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 单态射 */
    {
      id: 'def.mono',
      cluster: 'cat.structure',
      type: 'definition',
      label: '单态射 / 满态射',
      title: '单态射与满态射（Monomorphism / Epimorphism）',
      regions: ['category'],
      tags: ['范畴论', '单态射', '可消'],
      statement: [
        '态射 $i : Y \\to X$ 叫**单态射**（mono），如果对任意对象 $Z$ 与任意 $f, g : Z \\to Y$，',
        '',
        '$$i \\circ f = i \\circ g \\;\\Longrightarrow\\; f = g$$',
        '',
        '（左可消）。等价地：方块 $Y \\to Y \\times_X Y$ 是笛卡尔的，即 $Y \\cong Y \\times_X Y$，其中 $Y \\times_X Y$ 是沿 $i$ 的两个拉回。把箭头全部反向，得到**满态射**（epi，右可消）。'
      ].join('\n'),
      notes: [
        '在 $\\mathbf{Set}$ 里单态射恰好是单射、满态射恰好是满射（后者要用选择公理）。但一般范畴里「可消」才是定义，「一对一 / 到上」只是它在具体范畴里的表现：在环范畴里 $\\mathbb{Z} \\to \\mathbb{Q}$ 是满态射，可它的底层映射并不是满射 —— 遗忘函子把它送出去就不再是满的了。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 子对象 */
    {
      id: 'def.subobject',
      cluster: 'cat.structure',
      type: 'definition',
      label: '子对象',
      title: '子对象（Subobject）',
      regions: ['category'],
      tags: ['范畴论', '子对象', '拉回'],
      statement: [
        '把单态射 $Y \\rightarrowtail X$ 看作 $X$ 的一个**子对象**，记 $Y \\subseteq X$。两个子对象的**交**与原像都用拉回定义：',
        '',
        '$$Y \\cap Z := Y \\times_{X} Z, \\qquad f^{-1}(Y) := Y \\times_{X} X\'$$',
        '',
        '（对 $Y, Z \\subseteq X$ 与任意 $f : X\' \\to X$；存在时才有定义）。'
      ].join('\n'),
      notes: [
        '把「子集」换成「单态射」，好处是不再依赖元素 —— 于是这套语言可以照搬到没有元素的范畴里去。「交」变成拉回、「原像」也变成拉回，两种操作合成了一个：$Y \\cap Z$ 解的是「既在 $Y$ 里又在 $Z$ 里」的部分，$f^{-1}(Y)$ 解的是「$y = f(x)$ 有解」的部分。'
      ].join('\n\n')
    },

    /* -------------------------------------------------- 极限的函子性 */
    {
      id: 'thm.lim-functor',
      cluster: 'cat.limit',
      type: 'theorem',
      label: '极限的函子性',
      title: '极限是函子（Limits as a Functor）',
      regions: ['category'],
      tags: ['范畴论', '极限', '函子'],
      statement: [
        '设 $\\mathcal{C}$ 具有所有以 $I$ 为索引的极限。给定图 $F, G : I \\to \\mathcal{C}$ 与自然变换 $\\alpha : F \\implies G$，族',
        '',
        '$$\\{\\, \\alpha_i \\circ \\pi^{F}_{i} : \\lim F \\to G(i) \\,\\}_{i \\in I}$$',
        '',
        '是 $\\lim F$ 到 $G$ 的一个锥，于是泛性给出**唯一**的态射',
        '',
        '$$\\lim \\alpha : \\lim F \\longrightarrow \\lim G, \\qquad \\pi^{G}_{i} \\circ \\lim \\alpha = \\alpha_i \\circ \\pi^{F}_{i}$$',
        '',
        '这样得到的 $\\lim : \\mathcal{C}^{I} \\to \\mathcal{C}$ 是一个函子。'
      ].join('\n'),
      notes: [
        '这就是「泛性」的标准用法：**先造一个锥，再让唯一性把态射免费送上门**。极限的对象层是构造，态射层是泛性，两者合起来才是函子。',
        '有了它，「$\\lim$ 保持某个性质」才说得通 —— 后面讨论「某个函子保极限」时，正是拿这个函子去做文章。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------------- 像 */
    {
      id: 'def.image',
      cluster: 'cat.structure',
      type: 'definition',
      label: '像 / 余像',
      title: '像与余像（Image / Coimage）',
      regions: ['category'],
      tags: ['范畴论', '像', '泛性质'],
      statement: [
        '态射 $f : X \\to Y$ 的**像** $\\operatorname{im} f$ 是 $Y$ 的一个子对象，它在一切分解 $f : X \\to I \\rightarrowtail Y$ 组成的范畴中是**始对象**（即：任何别的分解都唯一地穿过它）。对偶地，$\\operatorname{coim} f$ 是分解 $X \\twoheadrightarrow I \\to Y$ 的余泛对象。',
        '',
        '总有一个态射',
        '',
        '$$\\operatorname{coim} f \\longrightarrow \\operatorname{im} f$$',
        '',
        '它是同构时，称 $f$ 是**严格的**（strict）。'
      ].join('\n'),
      notes: [
        '在 $\\mathbf{Set}$、$\\mathbf{Ab}$、$\\mathbf{Top}$ 这些范畴里 $\\operatorname{coim} f \\to \\operatorname{im} f$ 总是同构，所以平时不必区分两者；一般范畴里则不然。',
        '与 $\\mathbf{Set}$ 里「像就是 $\\{f(x)\\}$」相比，这里多出来的东西是**泛性**：像不再是一堆点的集合，而是「最小的那个可以穿过它的中间对象」。子对象、单态射、像三者连在一起看，就是「把元素语言换成箭头语言」的样例。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------- 元素范畴 */
    {
      id: 'def.elements-category',
      cluster: 'cat.structure',
      type: 'definition',
      label: '元素范畴',
      title: '元素范畴（Category of Elements）',
      regions: ['category'],
      tags: ['范畴论', '泛性', '始对象'],
      statement: [
        '函子 $F : \\mathcal{C} \\to \\mathbf{Set}$ 的**元素范畴** $\\operatorname{el}(F)$ 以',
        '',
        '$$\\bigl\\{(Y, t) : Y \\in \\mathcal{C},\\ t \\in F(Y)\\bigr\\}$$',
        '',
        '为对象，从 $(Y, t)$ 到 $(Z, u)$ 的态射取使 $F(f)(t) = u$ 的 $f : Y \\to Z$。',
        '',
        '称 $(X, s)$ 是 $F$ 的**泛元素**，如果它是 $\\operatorname{el}(F)$ 的始对象。'
      ].join('\n'),
      notes: [
        '这条把「**泛**」这个字一次说清：**泛 = 某个辅助范畴里的始对象（或终对象）**。于是「泛锥」「泛分解」「泛元素」其实是同一句套话的三次应用。',
        '例：$\\mathbb{Z}$ 是环范畴的始对象，所以说它「在所有环里泛」；空图上的泛锥就是终对象；极限就是锥范畴的终对象。'
      ].join('\n\n')
    }
  ],

  edges: []
});
