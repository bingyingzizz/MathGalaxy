/* ==========================================================================
   内容包 · 范畴与图（6 条）
   --------------------------------------------------------------------------
   星系「范畴论」的地基：宇宙 → 图 → 图的态射 → 范畴 → 截面与收缩。

   顺序不是随便排的：图是由「两个集合 + 两个函数」造出来的，范畴是由「一个图
   + 复合 + 单位」造出来的 —— 每一步都只用到已经有的东西。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '范畴与图',
  nodes: [

    /* ------------------------------------------------------------ 宇宙 */
    {
      id: 'def.universe',
      cluster: 'cat.basic',
      type: 'definition',
      label: 'Grothendieck 宇宙',
      title: 'Grothendieck 宇宙',
      regions: ['category'],
      tags: ['范畴论', '大与小', '集合论'],
      statement: [
        '一个集合 $U$ 叫**宇宙**，如果它对集合论的基本构造封闭：',
        '',
        '1. （传递）$x \\in u \\in U \\implies x \\in U$；',
        '2. $x, y \\in U \\implies \\{ x, y \\} \\in U$；',
        '3. $x \\in U \\implies \\mathcal{P}(x) \\in U$；',
        '4. 对任意 $p \\in U$ 与任意 $f : p \\to U$，有 $\\bigcup_{t \\in p} f(t) \\in U$。',
        '',
        '若 $U$ 含有无穷集，则 $\\mathbb{N} \\in U$。'
      ].join('\n'),
      notes: [
        '**宇宙存在**是一条额外的公理，不在 ZFC 里 —— 它自成一个节点：「Grothendieck 宇宙公理」。',
        '它的用处是给「大」与「小」一个**相对**的标准：$U$ 里的东西叫小，$U$ 本身叫大。$\\mathbf{Set}$、$\\mathbf{Grp}$ 这些范畴的对象全体不构成集合，但相对于一个宇宙它们都是小的 —— 「小范畴」这个词背后就是这件事。',
        '封装的四条足够把常见构造全搬进 $U$：由 2 取 $x = y$ 得单点集，再取一次得有序对 $\\{ \\{x\\}, \\{x,y\\} \\}$；由 3、4 得笛卡尔积（$A \\times B \\subseteq \\mathcal{P}(\\mathcal{P}(A \\cup B))$）与函数集。'
      ].join('\n\n'),
      refs: ['SGA 4, I.0']
    },

    /* --------------------------------------------------------- 宇宙公理 */
    {
      id: 'ax.grothendieck-universe',
      cluster: 'cat.basic',
      type: 'axiom',
      label: 'Grothendieck 宇宙公理',
      title: 'Grothendieck 宇宙公理',
      regions: ['set-theory', 'category'],
      tags: ['范畴论', '大与小', '集合论', '大基数', '公理'],
      statement: [
        '**每个集合都装得进某个宇宙。** 这是一条独立的公理：',
        '',
        '$$\\forall x \\, \\exists U \\left[ U \\in \\mathrm{Univ} \\wedge  x \\in U \\right]$$',
        '',
        '其中「宇宙」按「Grothendieck 宇宙」那份定义：传递，且对配对、幂集、以内部集合为索引的并封闭。',
        '',
        '⭐ 等价的常用说法：**强不可达基数无界地多** —— 对每个序数 $\\alpha$ 都有强不可达基数 $\\kappa > \\alpha$，此时 $V_{\\kappa}$ 本身就是一个宇宙。'
      ].join('\n'),
      notes: [
        '它**不在 ZFC 里**。取强不可达基数 $\\kappa$，$V_{\\kappa} \\models \\mathrm{ZFC}$，所以这条公理蕴含 $\\mathrm{Con}(\\mathrm{ZFC})$；由 Gödel 第二不完备定理，ZFC 若一致就**证不出**它。所以用到它的定理必须把它写进前提，不能默认。',
        '它比「存在一个宇宙」**强**：说的是宇宙无界地多。范畴论要的正是这一点 —— $\\mathbf{Set}$ 相对于 $U$ 是小范畴，而 $U$ 本身落在更大的宇宙 $U^{+}$ 里，于是「$U$-小范畴的范畴」又是 $U^{+}$ 里的小范畴。**每往上走一级都有地方站。**',
        '弱形式：只处理固定的几个范畴时，假设「存在一个宇宙」（等价于「存在一个强不可达基数」）就够，不必要求无界地多。',
        '⚠️ 实践中的替代：类型论用**宇宙层级**把这件事自动化（Lean 的 `Type u`、Coq 的 `Type_i`）；本图按 SGA 的惯例，用一条公理一次性解决。'
      ].join('\n\n'),
      refs: ['SGA 4, I.0', 'Mac Lane, Categories for the Working Mathematician, I.6', 'Jech, Set Theory, 12（不可达基数）']
    },

    /* -------------------------------------------------------------- 图 */
    {
      id: 'def.graph',
      cluster: 'cat.basic',
      type: 'definition',
      label: '图',
      title: '图',
      regions: ['category'],
      tags: ['范畴论', '有向图'],
      statement: [
        '一个**图**是一个四元组',
        '',
        '$$( V, E, s, t )$$',
        '',
        '其中 $V$ 与 $E$ 是集合，$s, t : E \\to V$ 是函数 —— 分别叫**起点映射**与**终点映射**。$V$ 的元素叫**顶点**，$E$ 的元素叫**边**。'
      ].join('\n'),
      notes: [
        '这里的「图」是有向多重图：不要求 $s(e) \\ne t(e)$（允许自环），也不要求两条边的端点不同（允许平行边）。所以它比日常说的「图的图形」宽 —— 它只是一份「哪些边从哪连到哪」的数据。',
        '四元组是**嵌套的有序对**，所以编码方式不是无关紧要的。$(x, y) := \\{ \\{x\\}, \\{x,y\\} \\}$ 满足有序对公理',
        '',
        '$$(a, b) = (c, d) \\iff a = c \\wedge b = d$$',
        '',
        '而换成 $\\{ x, \\{x,y\\} \\}$ 就必须拿这条公理逐条去验，不能想当然。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1']
    },

    /* --------------------------------------------------------- 图的态射 */
    {
      id: 'def.graph-morphism',
      cluster: 'cat.basic',
      type: 'definition',
      label: '图的态射',
      title: '图的态射',
      regions: ['category'],
      tags: ['范畴论', '有向图', '交换图'],
      statement: [
        '从图 $(V, E, s, t)$ 到图 $(V\', E\', s\', t\')$ 的**态射**是一对函数',
        '',
        '$$\\varphi_1 : V \\to V\', \\qquad \\varphi_2 : E \\to E\'$$',
        '',
        '使得下面两个方块都交换：',
        '',
        '$$s\' \\circ \\varphi_2 = \\varphi_1 \\circ s, \\qquad t\' \\circ \\varphi_2 = \\varphi_1 \\circ t$$',
        '',
        '也就是说：$\\varphi_1$ 把一条边的起点送到这条边的像的起点，把终点送到终点。'
      ].join('\n'),
      notes: '两条等式各管一头。把它们画成方块就是「图的态射」这个名字的全部内容 —— 顶点那层与边那层各自连续，并且方向对得上。',
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1']
    },

    /* ------------------------------------------------------------ 范畴 */
    {
      id: 'def.category',
      cluster: 'cat.basic',
      type: 'definition',
      label: '范畴',
      title: '范畴',
      regions: ['category'],
      tags: ['范畴论', '复合', '单位'],
      statement: [
        '一个**范畴**是一个六元组',
        '',
        '$$( \\mathcal{O}, M, s, t, \\circ, i )$$',
        '',
        '其中 $(\\mathcal{O}, M, s, t)$ 是一个**图**：$\\mathcal{O}$ 是**对象**，$M$ 是**态射**，$s, t : M \\to \\mathcal{O}$ 给出每条态射的**源**与**靶**，记 $f : X \\to Y$ 表示 $s(f) = X$、$t(f) = Y$。\n\n此外还有两个映射：',
        '',
        '**复合** $\\circ$ 定义在可复合的态射对上。记',
        '',
        '$$M \\times_{s,t} M = \\{ (f, g) \\in M \\times M : s(f) = t(g) \\}$$',
        '',
        '这是「$g$ 的靶等于 $f$ 的源」的全部态射对；$\\circ : M \\times_{s,t} M \\to M$ 把 $(f, g)$ 送到 $f \\circ g$，并满足**结合律**',
        '',
        '$$h \\circ (g \\circ f) = (h \\circ g) \\circ f$$',
        '',
        '（只要两边都有定义）。',
        '',
        '**单位** $i : \\mathcal{O} \\to M$ 给每个对象 $X$ 指定一条态射 $1_X = i(X)$，满足**单位律**',
        '',
        '$$f \\circ 1_X = f = 1_Y \\circ f \\qquad (f : X \\to Y)$$'
      ].join('\n'),
      notes: [
        '要害是 $M \\times_{s,t} M$ 这个**纤维积**：复合不是 $M \\times M$ 上的运算，只在一部分态射对上定义。所以范畴里的复合是**部分运算**，「$f \\circ g$ 有没有定义」本身就是要检查的事。',
        '例：$\\mathbf{Set}$（集合与函数）、$\\mathbf{Mon}$（幺半群）、$\\mathbf{Grp}$（群）、$\\mathbf{Ab}$（交换群）、$\\mathbf{Rng}$（环）、$G\\text{-}\\mathbf{Set}$（$G$-集）。',
        '**单形范畴**：$\\mathcal{O} = \\mathbb{N}$，',
        '',
        '$$M = \\{ (m, n, f) : m, n \\in \\mathbb{N},\\ f : [m] \\to [n] \\text{increasing} \\}, \\qquad [m] = \\{ 1, \\ldots, m \\}$$',
        '',
        '态射是从 $m$ 到 $n$ 的递增映射。',
        '**开集范畴** $\\operatorname{Open}(X)$：给定拓扑空间 $(X, \\tau)$，取 $\\mathcal{O} = \\tau$，',
        '',
        '$$M = \\{ (u, v) : u \\subseteq v \\} \\subseteq \\tau \\times \\tau$$',
        '',
        '即「从小的开集到包含它的开集」。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1']
    },

    /* -------------------------------------------------------- 截面与收缩 */
    {
      id: 'def.section-retraction',
      cluster: 'cat.basic',
      type: 'definition',
      label: '截面与收缩',
      title: '截面与收缩',
      regions: ['category'],
      tags: ['范畴论', '态射', '左逆右逆'],
      statement: [
        '设 $f : X \\to Y$ 是范畴里的一条态射。',
        '',
        '- $f$ 的**截面**（section）是态射 $g : Y \\to X$，使',
        '',
        '$$f \\circ g = 1_Y$$',
        '',
        '- $f$ 的**收缩**（retraction）是态射 $g : Y \\to X$，使',
        '',
        '$$g \\circ f = 1_X$$'
      ].join('\n'),
      notes: '两条等式方向相反：截面是「先 $g$ 再 $f$，回到 $Y$ 原地」，收缩是「先 $f$ 再 $g$，回到 $X$ 原地」。换句话说，截面是 $f$ 的右逆，收缩是 $f$ 的左逆 —— 名字不同是因为复合的写法与映射的写法反着来。',
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1']
    },

    /* -------------------------------------------------------- 群范畴 */
    {
      id: 'def.category-of-groups',
      cluster: 'cat.basic',
      type: 'definition',
      label: '群范畴',
      title: '群范畴 $\\mathbf{Grp}$',
      regions: ['category', 'algebra'],
      tags: ['范畴论', '群', '群同态'],
      statement: [
        '**群范畴** $\\mathbf{Grp}$：对象是群，态射是群同态，复合是映射复合，单位是恒等同态。',
        '',
        '**极限与余极限**：积是直积、终对象是平凡群；等化子是子群、拉回是纤维积。余积是自由积、始对象也是平凡群（与终对象同构，故 $\\mathbf{Grp}$ 有零对象）；余等化子是商群（取正规闭包），推出是 amalgamated free product。',
        '它有**遗忘函子** $\\mathbf{Grp}\\to\\mathbf{Set}$；交换群另单列为 `def.abelian-group`，其范畴见 `def.category-of-abelian-groups`。'
      ].join('\n'),
      notes: [
        '**不是阿贝尔范畴**：$\\hom_{\\mathbf{Grp}}(G,H)$ 一般没有群结构（不能逐点相加），所以不能像 $A\\text{-}\\mathbf{Mod}$ 那样做同调代数。',
        '**单态射 = 单同态**，**满态射 = 满同态**。积是直积，余积是自由积；零对象只有平凡群，所以 $\\mathbf{Grp}$ 不是加性范畴。',
        '笛卡尔积给出对称幺半结构，单位元是平凡群；但它不是笛卡尔闭的（$\\hom(G,H)$ 一般不能自然成为群）。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I, II']
    },

    /* -------------------------------------------------------- 阿贝尔群范畴 */
    {
      id: 'def.category-of-abelian-groups',
      cluster: 'cat.basic',
      type: 'definition',
      label: '阿贝尔群范畴',
      title: '阿贝尔群范畴 $\\mathbf{Ab}$',
      regions: ['category', 'algebra'],
      tags: ['范畴论', '阿贝尔群', '阿贝尔范畴'],
      statement: [
        '**阿贝尔群范畴** $\\mathbf{Ab}$：对象是阿贝尔群，态射是群同态；它是 $\\mathbf{Grp}$ 的**全子范畴**。',
        '',
        '遗忘函子 $\\mathbf{Ab}\\to\\mathbf{Set}$ 把阿贝尔群送到其底层集合；$\\mathbb Z\\text{-}\\mathbf{Mod}$ 与 $\\mathbf{Ab}$ 等价。极限：积为直积、终对象为零群、等化子为子群、拉回为纤维积；余极限：余积为直和、始对象为零群、余等化子为商群、推出为粘合。'
      ].join('\n'),
      notes: [
        '**阿贝尔范畴的原型**：有核、余核，单/满态射都严格；$\\hom(A,B)$ 逐点加法构成阿贝尔群。',
        '**足够投射/内射对象**：自由阿贝尔群投射；$\\mathbb Q/\\mathbb Z$ 给出内射余生成元，每个阿贝尔群都能嵌入内射群。',
        '**张量积**给出对称幺半结构，单位元是 $\\mathbb Z$；$\\hom(A,B)$ 又是阿贝尔群，所以 $\\mathbf{Ab}$ 还是对称幺半闭的。',
        '与 $A\\text{-}\\mathbf{Mod}$ 的关系：$\\mathbb Z\\text{-}\\mathbf{Mod}\\simeq\\mathbf{Ab}$，这是「模」统一「阿贝尔群」的最基本例子。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I, II', 'Weibel, An Introduction to Homological Algebra, Ch. 1']
    },

    {
      id: "def.category-of-sets",
      cluster: "cat.basic",
      type: "definition",
      label: "集合范畴",
      title: "集合范畴 $\\mathbf{Set}$",
      regions: ["category"],
      tags: ["范畴论", "集合", "Set"],
      statement: [
        "**集合范畴** $\\mathbf{Set}$：对象是集合，态射是函数，复合是映射复合，单位是恒等映射。",
        "$\\mathbf{Set}$ 中积是笛卡尔积 $X\\times Y$（投影为坐标映射），终对象是单点集，等化子是 $\\{x:f(x)=g(x)\\}$，拉回是纤维积 $X\\times_Z Y$；余积是不交并 $X\\sqcup Y$，始对象是空集，余等化子是商 $Y/\\sim$（由 $f(x)\\sim g(x)$ 生成），推出是粘合。它是遗忘函子的标准靶。"
      ].join('\n'),
      notes: [
        "**完备且余完备**：小积与等化子给出所有小极限，小余积与余等化子给出所有小余极限。",
        "**笛卡尔闭**：$\\mathbf{Set}$ 有指数对象 $Y^X=\\hom(X,Y)$，求值与 curry 化逐点验证；它还是拓扑斯，见 `def.cartesian-closed-category`。",
        "**不是加性范畴**：$\\hom(A,B)$ 一般没有群结构，不能逐点相加。",
        "**与拓扑空间范畴的关系**：存在遗忘函子 $\\mathbf{Top}\\to\\mathbf{Set}$，它保极限与余极限，因为拓扑都按底层集合逐点构造。"
      ].join('\n\n'),
      refs: ["Mac Lane, Categories for the Working Mathematician, Ch. I, II"]
    },

    {
      id: "def.category-of-topological-spaces",
      cluster: "cat.basic",
      type: "definition",
      label: "拓扑空间范畴",
      title: "拓扑空间范畴 $\\mathbf{Top}$",
      regions: ["category", "topology"],
      tags: ["范畴论", "拓扑空间", "Top"],
      statement: [
        "**拓扑空间范畴** $\\mathbf{Top}$：对象是拓扑空间，态射是连续映射，复合是映射复合，单位是恒等映射。",
        "积取积拓扑，终对象是单点空间；等化子取子空间拓扑，拉回取纤维积。余积取不交并拓扑（始对象是空空间），余等化子取商拓扑，推出取粘合。"
      ].join('\n'),
      notes: [
        "**完备且余完备**：上述构造逐项给出小极限与小余极限。",
        "**遗忘函子** $\\mathbf{Top}\\to\\mathbf{Set}$ 保所有极限与余极限，但它忠实而不满：不是每个函数都连续。",
        "**不是加性范畴**：$\\hom(X,Y)$ 一般没有群结构；开映射也不是态射（态射只要求连续）。",
        "**不是笛卡尔闭**：指数拓扑使求值连续的条件太强；紧生成弱 Hausdorff 空间（CGWH）才是笛卡尔闭的，见 `prop.cg-cartesian-closed`。"
      ].join('\n\n'),
      refs: ["Mac Lane, Categories for the Working Mathematician, Ch. I, II"]
    }
    ,
    {
      id: 'def.category-of-vector-spaces',
      cluster: 'cat.basic',
      type: 'definition',
      label: '向量空间范畴',
      title: '向量空间范畴 $\\mathbf{Vect}_K$',
      regions: ['category', 'algebra'],
      tags: ['范畴论', '线性代数', 'Vect'],
      statement: [
        '**向量空间范畴** $\\mathbf{Vect}_K$：对象是域 $K$ 上的向量空间，态射是 $K$-线性映射，复合是映射复合，单位是恒等映射。',
        '',
        '有限维向量空间构成**全子范畴** $\\mathbf{Vect}_K^{\\mathrm{fd}}$：对象只取有限维空间，态射仍是全部线性映射。',
        '',
        '$\\mathbf{Vect}_K$ 是**加性范畴**：$\\operatorname{Hom}_K(V,W)$ 按逐点和、逐点数乘成为 $K$-向量空间，复合对每个变元线性；有限直和同时是积与余积。它是**完备且余完备**的：积=直积、终对象=零空间、等化子=子空间、拉回=纤维积；余积=直和、始对象=零空间、余等化子=商空间、推出=粘合。'
      ].join('\n'),
      notes: [
        '**为什么单列**：线性代数的「对象 + 线性映射」在范畴语言里就是 $\\mathbf{Vect}_K$；有了它，「对偶」「Hom」才能写成函子。',
        '**忘掉结构**：遗忘函子 $\\mathbf{Vect}_K\\to\\mathbf{Set}$ 忘掉加法与数乘，只留底层集合与函数；它忠实但不满（不是每个函数都线性）。',
        '**与加性范畴**：Hom 集本身是向量空间，复合双线性；有限直和 = 有限积，所以它是加性范畴，进而是预阿贝尔范畴（核与余核逐点取）。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I, II', 'Weibel, An Introduction to Homological Algebra, Ch. 1']
    },
    {
      id: 'def.hom-functor',
      cluster: 'cat.functor',
      type: 'definition',
      label: 'Hom 函子',
      title: 'Hom 函子 $\\operatorname{Hom}(V,-)$ 与 $\\operatorname{Hom}(-,W)$',
      regions: ['category', 'algebra'],
      tags: ['范畴论', 'Hom', '函子'],
      statement: [
        '固定 $V\\in\\mathbf{Vect}_K$。**协变 Hom 函子**',
        '',
        '$$\\operatorname{Hom}_K(V,-):\\mathbf{Vect}_K\\to\\mathbf{Vect}_K$$',
        '',
        '在对象上 $U\\mapsto\\operatorname{Hom}_K(V,U)$，在态射上把 $T:U_1\\to U_2$ 送到前复合 $T\\circ(-):\\operatorname{Hom}_K(V,U_1)\\to\\operatorname{Hom}_K(V,U_2)$。',
        '',
        '固定 $W$。**反变 Hom 函子** $\\operatorname{Hom}_K(-,W):\\mathbf{Vect}_K^{\\mathrm{op}}\\to\\mathbf{Vect}_K$ 在对象上 $U\\mapsto\\operatorname{Hom}_K(U,W)$，在态射上把 $T:U_1\\to U_2$ 送到后复合 $(-)\\circ T:\\operatorname{Hom}_K(U_2,W)\\to\\operatorname{Hom}_K(U_1,W)$。',
        '',
        '两个 Hom 集都按逐点和、逐点数乘成为 $K$-向量空间，且函子的态射部分线性，所以靶范畴是 $\\mathbf{Vect}_K$，不只是 $\\mathbf{Set}$。'
      ].join('\n'),
      notes: [
        '**函子性**：$\\operatorname{Hom}(V,-)$ 保恒等与复合；$\\operatorname{Hom}(-,W)$ 反变，把复合顺序倒过来。',
        '**与对偶的关系**：取 $W=K$，$\\operatorname{Hom}_K(-,K)=(-)^{\\ast}$ 就是对偶函子；对偶空间是 Hom 函子在 $K$ 处的取值。',
        '**内 Hom**：在闭结构里 Hom 函子由内 Hom 对象表示；本图的内 Hom 是拓扑斯里的版本，表示关系是「内 Hom 表示 Hom 函子」。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, Ch. II', 'Weibel, An Introduction to Homological Algebra, Ch. 1']
    },
    {
      id: 'def.forgetful-functor',
      cluster: 'cat.functor',
      type: 'definition',
      label: '遗忘函子',
      title: '遗忘函子',
      regions: ['category'],
      tags: ['范畴论', '函子', '具体范畴'],
      statement: [
        '**遗忘函子**是把结构「忘掉」一部分、只保留底层数据的函子：对象上 $(X,\\text{structure})\\mapsto X$，态射上保持同一个底层映射。',
        '',
        '典型例子：',
        '',
        '- $\\mathbf{Top}\\to\\mathbf{Set}$：忘掉开集，只留底层集合与函数；',
        '- $\\mathbf{Grp}\\to\\mathbf{Set}$：忘掉群运算与单位元；',
        '- $\\mathbf{Vect}_K\\to\\mathbf{Set}$：忘掉加法与数乘；',
        '- $\\mathbf{Vect}_K\\to\\mathbf{Ab}$：忘掉 $K$-数乘，只留加法群。',
        '',
        '严格说，遗忘函子不是单一函子，而是一类**具体范畴**（带忠实函子到 $\\mathbf{Set}$ 的范畴）到 $\\mathbf{Set}$ 的标准函子。'
      ].join('\n'),
      notes: [
        '**忠实但通常不满**：底层映射相同不保证保持结构；$\\mathbf{Top}\\to\\mathbf{Set}$、$\\mathbf{Ab}\\to\\mathbf{Set}$ 都忠实而不满。',
        '**左伴随是自由构造**：自由群、自由向量空间分别是相应遗忘函子的左伴随；$\\mathbf{Top}\\to\\mathbf{Set}$ 的左伴随是**密着拓扑**（indiscrete，只含 $\\emptyset$ 与全集），右伴随才是**离散拓扑** —— 两侧方向不能对调。',
        '**极限与余极限**：代数类遗忘函子（$\\mathbf{Mon}$、$\\mathbf{Gr}$、$\\mathbf{Ab}$、$A\\text{-}\\mathbf{Mod}$ 等）保所有极限（逐点构造），但一般不保余极限；拓扑类行为不同 —— $\\mathbf{Top}\\to\\mathbf{Set}$ 反而保所有余极限（商拓扑逐点拼出）。所以「保不保」要按具体范畴看，不能一概而论。',
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, Ch. IV', 'Riehl, Category Theory in Context, Section 1.2']
    }

  ],

  edges: [

    {
      id: 'def-link.category-groups',
      kind: 'definition',
      definition: 'def.category',
      usedBy: 'def.category-of-groups',
      note: '群范畴就是「对象为群、态射为群同态」的范畴，是 def.category 的标准例子。'
    },
    {
      id: 'def-link.group-groups',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.category-of-groups',
      note: '群范畴的对象类正是全体群。'
    },
    {
      id: 'def-link.category-abelian-groups',
      kind: 'definition',
      definition: 'def.category',
      usedBy: 'def.category-of-abelian-groups',
      note: '阿贝尔群范畴是另一个标准例子；它还是 def.category-of-groups 的全子范畴。'
    },
    {
      id: 'def-link.group-abelian-groups',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.category-of-abelian-groups',
      note: '阿贝尔群是群的特例，对象类取 def.group 中交换的那些。'
    },
    {
      id: 'analogy.grp-ab',
      kind: 'analogy',
      a: 'def.category-of-groups',
      b: 'def.category-of-abelian-groups',
      note: 'Ab 是 Grp 的全子范畴；把群运算再加交换律就得到阿贝尔群。'
    },

    /* ------------------------------------------------------- 宇宙公理 */
    /* 「宇宙」这个定义是公理陈述的前提：不先知道那四条封闭性，
       「$U$ 是宇宙」就是一句空话。（definition 边的方向是 定义 → 用到它的东西） */
    {
      id: 'def-link.gu-universe',
      kind: 'definition',
      definition: 'def.universe',
      usedBy: 'ax.grothendieck-universe',
      note: '公理只断言「这样的 $U$ 存在」，把封闭性那四条交给定义。分开写的好处：换一套宇宙的定义（比如换成 Tarski 的写法），公理本身一个字不用改。'
    },

    {
      id: "dep.catset-category",
      kind: 'definition',
      definition: "def.category",
      usedBy: "def.category-of-sets",
      note: "集合范畴是「对象为集合、态射为函数」的范畴，是 def.category 的标准例子。"
    },

    {
      id: "dep.cattop-category",
      kind: 'definition',
      definition: "def.category",
      usedBy: "def.category-of-topological-spaces",
      note: "拓扑空间范畴是「对象为拓扑空间、态射为连续映射」的范畴，是 def.category 的标准例子。"
    },
    { id: 'dep.cat-sets-def-category-of-abelian-groups', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'def.category-of-abelian-groups', note: '陈述以集合范畴 $\\mathbf{Set}$ 为环境范畴' },
    {"id":"dep.cvect-category","kind":"definition","definition":"def.category","usedBy":"def.category-of-vector-spaces","note":"向量空间范畴是范畴的一般定义在「对象=向量空间、态射=线性映射」上的实例"},
    {"id":"dep.cvect-vectorspace","kind":"definition","definition":"def.vector-space","usedBy":"def.category-of-vector-spaces","note":"对象类正是域 K 上的向量空间"},
    {"id":"dep.cvect-linearmap","kind":"definition","definition":"def.linear-map","usedBy":"def.category-of-vector-spaces","note":"态射类正是 K-线性映射"},
    {"id":"dep.homfunctor-functor","kind":"definition","definition":"def.functor","usedBy":"def.hom-functor","note":"Hom 函子是两个具体函子，按函子定义验证函子性"},
    {"id":"dep.homfunctor-cvect","kind":"definition","definition":"def.category-of-vector-spaces","usedBy":"def.hom-functor","note":"源范畴与靶范畴都是向量空间范畴"},
    {"id":"dep.homfunctor-linearmap","kind":"definition","definition":"def.linear-map","usedBy":"def.hom-functor","note":"Hom 集由线性映射组成，态射作用为前复合或后复合"},
    {"id":"dep.homfunctor-dualspace","kind":"analogy","a":"def.dual-space","b":"def.hom-functor","note":"对偶空间是 Hom 函子在 $W=K$ 处的取值：这是特例/实例，不是 Hom 函子定义的一部分"},
    {"id":"dep.homfunctor-internal","kind":"definition","definition":"def.hom-functor","usedBy":"def.internal-hom","note":"内 Hom 对象表示 Hom 函子，故以 Hom 函子为前提"},
    {"id":"dep.forgetful-functor","kind":"definition","definition":"def.functor","usedBy":"def.forgetful-functor","note":"遗忘函子是函子的一般定义在具体范畴上的实例"},
    {"id":"dep.forgetful-sets","kind":"definition","definition":"def.category-of-sets","usedBy":"def.forgetful-functor","note":"标准靶范畴是集合范畴"},
    {"id":"dep.forgetful-top","kind":"analogy","a":"def.category-of-topological-spaces","b":"def.forgetful-functor","note":"$\\mathbf{Top}\\to\\mathbf{Set}$ 的遗忘函子是标准例子，不是一般定义的依赖"},
    {"id":"dep.forgetful-cvect","kind":"analogy","a":"def.category-of-vector-spaces","b":"def.forgetful-functor","note":"$\\mathbf{Vect}_K\\to\\mathbf{Set}$ 的遗忘函子是标准例子，不是一般定义的依赖"},
    {"id":"dep.forgetful-prop-ffnf","kind":"definition","definition":"def.forgetful-functor","usedBy":"prop.forgetful-faithful-not-full","note":"命题说的正是遗忘函子的忠实性与不满性"},
    {"id":"dep.forgetful-prop-fae","kind":"definition","definition":"def.forgetful-functor","usedBy":"prop.forgetful-adjoints-examples","note":"命题列举遗忘函子的左伴随"},
    {"id":"dep.forgetful-prop-frep","kind":"definition","definition":"def.forgetful-functor","usedBy":"prop.forgetful-representable","note":"命题讨论以 Set 为值的遗忘函子的可表示性"},
    {"id":"dep.forgetful-prop-fpl","kind":"definition","definition":"def.forgetful-functor","usedBy":"prop.forgetful-preserves-limits","note":"命题讨论遗忘函子保极限"}
  ]
});
