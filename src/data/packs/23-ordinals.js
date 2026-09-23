/* ==========================================================================
   内容包 · 序数与超限
   --------------------------------------------------------------------------
   这一包补的是全图最大的一处「用到了却没节点」：**序数**被 8 个节点的正文和
   6 条边的证明引用（Hartogs 定理、基数可比定理、AC ⟹ 良序定理、AC ⟹ 佐恩引理），
   而序数本身一直没有节点。

   构造路线（内容准则第 ① 条）—— 每一步都只用已经有的东西：

       良序集（已有）───→ 良序集上的递归定理 ───→ 序数（传递的良序集）
                              ↘ 序数的三歧性 ───→ 每个良序集有唯一序型
                                             └──→ 序数全体是真类

   ⭐ 序数**不是**用「满足某组性质的对象（在同构意义下唯一）」引入的 —— 它是一个
      **精选代表**：每个良序集恰好同构于一个序数，而「序型」（同构类）本身是真类、
      取不出来。这正是准则第 ① 条「具体对象必须构造」的正面例子。

   ⚠️ 与既有内容的接口：`def.wellorder` 的陈述里原先写着「每个良序集序同构于唯一的
      一个序数」—— 那是一条**定理**，已经挪到本包的 `thm.wellorder-ordinal`，
      否则会连出「良序集 ↺ 序数」的环（Tarjan 缩点后两者同层）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '序数与超限',

  nodes: [

    /* ---------------------------------------------------------- 序同构 */
    {
      id: 'def.order-iso',
      cluster: 'order.structure',
      type: 'definition',
      label: '序同构',
      title: '序同构与序型（Order Isomorphism）',
      regions: ['order-theory'],
      tags: ['定义', '序', '序同构', '序型'],
      statement: [
        '设 $(A, \\preceq )$ 与 $(B, \\sqsubseteq )$ 是**偏序集**。双射 $f : A \\to B$ 称为**序同构**，当且仅当',
        '',
        '$$\\forall a, b \\in A\\; ( a \\preceq b \\iff f(a) \\sqsubseteq f(b) )$$',
        '',
        '即 $f$ 与 $f^{-1}$ **都保序**。此时称 $A$ 与 $B$ **序同构**，记 $A \\cong B$。'
      ].join('\n'),
      notes: '⭐ **序同构比「同构」严**：它要求**双向**保序，只要求 $f$ 保序是不够的 —— $f$ 保序且是双射时，$f^{-1}$ 不一定保序。\n\n⭐ **良序集上就省事了**：若两个良序集之间有**保序单射**，它自动是到某个初始段的序同构 —— 不必再回头验逆映射。这条性质是「序数可以比较」的全部技术来源。\n\n⚠ **序型**是序同构给出的等价类。良序集的序型**不是集合**：所有良序集的序型凑在一起构成真类，用一个具体的代表来替代它 —— 那就是序数。',
      refs: ['Kunen, Set Theory, I.11', 'Jech, Set Theory, 2.2']
    },

    /* ------------------------------------------------------------ 序数 */
    {
      id: 'def.ordinal',
      cluster: 'set.ordinal',
      type: 'definition',
      label: '序数',
      title: '序数（von Neumann Ordinal）',
      regions: ['set-theory'],
      tags: ['定义', '序数', '传递集', '良序'],
      statement: [
        '集合 $\\alpha$ 称为**序数**（von Neumann 序数），当且仅当：',
        '',
        '1. **$\\alpha$ 是传递的**：$\\forall x \\in \\alpha,\\; x \\subseteq \\alpha$（元素的元素仍是元素）；',
        '2. **$\\in$ 在 $\\alpha$ 上是良序**：把 $\\in$ 限制到 $\\alpha$ 上，$\\alpha$ 成为**良序集** —— 即对任意 $x, y \\in \\alpha$，$x \\in y$、$x = y$、$y \\in x$ 恰有一个成立，且 $\\alpha$ 的每个非空子集有 $\\in$-最小元。',
        '',
        '由传递性，$\\alpha$ 的**每个元素本身也是序数**。约定：$0 := \\emptyset$，**后继序数** $\\alpha + 1 := \\alpha \\cup \\{ \\alpha \\}$；不含最大元的非零序数叫**极限序数**，$\\omega$ 是最小的极限序数。序数全体记作 $\\mathrm{On}$。',
        '',
        '开头的几个：$\\emptyset,\\ \\{ \\emptyset \\},\\ \\{ \\emptyset, \\{ \\emptyset \\} \\},\\ \\ldots$，即 $0, 1, 2, \\ldots$；接着是 $\\omega,\\ \\omega + 1,\\ \\omega + 2,\\ \\ldots,\\ \\omega + \\omega,\\ \\ldots$'
      ].join('\n'),
      notes: [
        '⭐⭐ **格式还是「集合 + 关系 + 公理」**：序数不是凭空的对象 —— 一个**传递集**，配上 $\\in$ 这个**现成的**关系，就定出了一个序数。判别一个集合是不是序数，就是核对这两条。',
        '⭐⭐ **为什么不让「序型」当对象** —— 这是本包最要紧的一步：序型是同构类，而所有良序集的序型构成真类，取不出来（见「序数全体是真类」）。序数绕开了这件事：它给每个序型挑了一个**具体的代表**，就是一个传递的良序集。于是「序型之间的比较」变成「$\\in$ 的比较」，可以真刀真枪地算。',
        '⚠ **$\\alpha \\in \\beta$ 与 $\\alpha < \\beta$ 是同一件事**：序数上的 $\\in$ 就是它的序。写 $\\alpha < \\beta$ 时，背后用的其实是 $\\in$。',
        '⚠ 序数不只是「$\\mathbb{N}$ 的推广」。$\\omega$ 之后的序数一个比一个长，但它们的**大小**（基数）可以一直停在 $\\aleph_0$ —— 在序数里，「更长」与「更大」是两件事。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.11', 'Jech, Set Theory, 2.2']
    },

    /* ------------------------------------------ 良序集上的递归定理 */
    {
      id: 'thm.recursion-wellorder',
      cluster: 'set.ordinal',
      type: 'theorem',
      label: '超限递归',
      title: '良序集上的递归定理（含超限归纳）',
      regions: ['set-theory'],
      tags: ['定理', '良序', '超限递归', '超限归纳', 'ZF'],
      statement: [
        '设 $(W, \\preceq )$ 是**良序集**，$G$ 是任给的函数（可以取在一整个真类上）。记 $W_{< w} = \\{ v \\in W : v \\prec w \\}$。则存在**唯一**的函数 $F$ 定义在 $W$ 上，使',
        '',
        '$$F(w) = G\\big( F \\upharpoonright W_{< w} \\big), \\qquad \\forall w \\in W$$',
        '',
        '也就是说：**每一步只依赖前面已经取到的值**。',
        '',
        '**推论（超限归纳）**：若 $S \\subseteq W$ 且 $\\forall w \\in W\\; ( W_{< w} \\subseteq S \\to w \\in S )$，则 $S = W$。',
        '',
        '取 $W = \\omega$，就是 $\\mathbb{N}$ 上的**递推定义**与**数学归纳法**；$W$ 取任意良序集，就是**超限递归**与**超限归纳**。'
      ].join('\n'),
      notes: [
        '⭐⭐ 这是「**在无穷上做构造**」的许可证。在此之前，能用来造东西的只有有限的几步（配对、并、幂集、分离、替换）；要造出一整族互相依赖的对象，靠的就是这一条。它也是「良序」这个词真正的用途 —— 良序保证每一步之前的部分**有头有尾**，递归才停得下来。',
        '⭐ **为什么收「良序集」版而不是「序数」版**：$\\omega$ 上的递推、序数上的超限递归都是它的特例，所以只收最通用的一条。（例外：$\\mathbb{N}$ 上的数学归纳法另有更直接的来路 —— 它来自「$\\omega$ 是最小归纳集」，不需要良序性的一般理论，所以那个节点保留。）',
        '⚠ 递归式右边给的是「前面全部取值」这个**函数** $F \\upharpoonright W_{< w}$，而不是一句话。写成一句话就会掉进「用未定义的东西定义自己」的坑。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.9', 'Jech, Set Theory, 2.3']
    },

    /* -------------------------------------------------------- 三歧性 */
    {
      id: 'thm.ordinal-trichotomy',
      cluster: 'set.ordinal',
      type: 'theorem',
      label: '序数可比',
      title: '序数的三歧性：$\\in$ 在 $\\mathrm{On}$ 上是良序',
      regions: ['set-theory'],
      tags: ['定理', '序数', '可比', 'ZF'],
      statement: [
        '对任意两个序数 $\\alpha, \\beta$，下式**恰有一个**成立：',
        '',
        '$$\\alpha \\in \\beta, \\qquad \\alpha = \\beta, \\qquad \\beta \\in \\alpha$$',
        '',
        '特别地，$\\in$ 在序数全体上是**良序**：任意非空的一族序数都有最小元。'
      ].join('\n'),
      notes: [
        '⭐ 三歧性使序数可以当「坐标」用：任意两个**良序集**的序型一定可比，而且**不需要选择公理**。',
        '⚠ 这与「任意两个**基数**可比」完全是两件事，后者要用 AC（见「基数可比定理」）。差别在于序数**自带**一个良序 —— 就是 $\\in$；而一般的集合没有先验的良序，要给它找一个，那正是良序定理（$\\iff$ 选择公理）的内容。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.11']
    },

    /* -------------------------------------------------------- 序型 */
    {
      id: 'thm.wellorder-ordinal',
      cluster: 'set.ordinal',
      type: 'theorem',
      label: '良序集的序型',
      title: '每个良序集序同构于唯一的序数',
      regions: ['set-theory'],
      tags: ['定理', '序数', '序型', '序同构', 'ZF'],
      statement: [
        '设 $(W, \\preceq )$ 是**良序集**。则存在**唯一**的序数 $\\alpha$，使 $(W, \\preceq )$ 与 $(\\alpha, \\in)$ **序同构**。这个 $\\alpha$ 称为 $W$ 的**序型**，记作 $\\operatorname{ot}(W) = \\alpha$。'
      ].join('\n'),
      notes: [
        '⭐⭐ 这一条就是「序数」这个东西真正被**造出来**的地方：序数不是先验摆在那里的，它由「每个良序集对应的那个规范良序集」给出 —— 而那个规范集是由**递归定理**一步步算出来的。',
        '⭐ 于是「$W$ 有多长」变成「$\\operatorname{ot}(W)$ 是哪个序数」，两个良序集比长短变成比 $\\in$ —— 这就是三歧性的用处。',
        '⚠ **唯一性**这一半要用到三歧性：两个序数若互相序同构，就必须相等。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.11', 'Jech, Set Theory, 2.3']
    },

    /* --------------------------------------------------- 真类 */
    {
      id: 'thm.burali-forti',
      cluster: 'set.ordinal',
      type: 'theorem',
      label: '序数全体是真类',
      title: 'Burali–Forti：序数全体不构成集合',
      regions: ['set-theory'],
      tags: ['定理', '序数', '真类', '悖论', 'ZF'],
      statement: [
        '序数全体 $\\mathrm{On}$ **不构成集合**（它是一个**真类**）：不存在一个集合，它的元素恰好是全部序数。'
      ].join('\n'),
      notes: [
        '证明只有一行：若 $\\mathrm{On}$ 是集合，则它是**传递的**（序数的元素还是序数），$\\in$ 在它上面是**良序**（三歧性给出可比性），于是 $\\mathrm{On}$ 本身就是一个序数，从而 $\\mathrm{On} \\in \\mathrm{On}$ —— 与序数不能自属矛盾（$\\in$ 在序数上是良序，不允许 $\\in$-循环）。',
        '⭐ 这正是 **Hartogs 定理**的另一面：序数多到装不进任何集合。「存在不能单射进 $X$ 的序数」与「序数全体是真类」说的是同一件事。',
        '⚠ 与 Russell 悖论的关系：两者都是「把某个『全体』当成集合」引起的矛盾。在 ZFC 里它们的解决方式也一样 —— 那个「全体」是真类，不是集合，因此分离公理模式根本无从下手。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.11', 'Jech, Set Theory, 2.2']
    }
  ],

  edges: [

    /* ------------------------------------------------ 定义依赖骨架 */
    {
      id: 'dep.poset-order-iso',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.order-iso',
      note: '序同构是**偏序集**之间的映射：先有偏序，才谈得上保序。'
    },
    {
      id: 'dep.wellorder-ordinal',
      kind: 'definition',
      definition: 'def.wellorder',
      usedBy: 'def.ordinal',
      note: '序数的第二条要求是「$\\in$ 在 $\\alpha$ 上是**良序**」—— 先有良序集这个概念，才能说传递集上的 $\\in$ 是不是良序。'
    },
    {
      id: 'def-link.wellorder-recursion',
      kind: 'definition',
      definition: 'def.wellorder',
      usedBy: 'thm.recursion-wellorder',
      note: '递归定理的舞台是**良序集**：每一步之前的部分必须是有头有尾的，递归才停得下来。'
    },
    {
      id: 'def-link.ordinal-hartogs',
      kind: 'definition',
      definition: 'def.ordinal',
      usedBy: 'thm.hartogs',
      note: 'Hartogs 定理陈述里的「不能单射进 $X$ 的序数」直接用到序数。'
    },
    {
      id: 'def-link.ordinal-cardinal-comparable',
      kind: 'definition',
      definition: 'def.ordinal',
      usedBy: 'thm.cardinal-comparable',
      note: '基数可比定理的证明路线是「先良序化 $\\to$ 换成序数 $\\to$ 序数一定可比」，落点正是序数。'
    },
    {
      id: 'def-link.ordinal-cardinal',
      kind: 'definition',
      definition: 'def.ordinal',
      usedBy: 'def.cardinal',
      note: '严格说来「等势类」是真类，通行做法是取每个等势类里最小的**序数**作代表 —— 那个序数才叫基数。（本图的 $|A|$ 只用到单射/双射，所以这条依赖是概念上的，不是定义上的。）'
    },
    {
      id: 'def-link.recursion-wellordering',
      kind: 'definition',
      definition: 'thm.recursion-wellorder',
      usedBy: 'thm.wellordering',
      note: '证明良序定理时用超限递归沿良序一步步往下取元素。'
    },

    /* ------------------------------------------------------ 推出 */
    {
      id: 'imp.recursion-wellorder',
      kind: 'implication',
      sources: ['def.wellorder'],
      target: 'thm.recursion-wellorder',
      title: '良序性 $\\implies$ 递归定理',
      proof: [
        '设 $(W, \\preceq )$ 是良序集，$G$ 任给。记 $W_{< w} = \\{ v \\in W : v \\prec w \\}$。',
        '',
        '**① 初始段上的解至多一个。** 设 $w \\in W$，$f, g$ 都是 $W_{< w}$ 上满足递归式的函数。反设 $f \\ne g$，取最小的 $v \\prec w$ 使 $f(v) \\ne g(v)$（这一步用的是**良序性**：$\\{ u \\prec w : f(u) \\ne g(u) \\}$ 非空故有最小元）。于是在 $W_{< v}$ 上 $f$ 与 $g$ 相同，从而',
        '',
        '$$f(v) = G\\big( f \\upharpoonright W_{< v} \\big) = G\\big( g \\upharpoonright W_{< v} \\big) = g(v)$$',
        '',
        '矛盾。故 $W_{< w}$ 上至多一个解，且这个解唯一确定。',
        '',
        '**② 构造候选关系的集合。** 令',
        '',
        '$$R = \\{ (w, y) : \\text{存在函数} f \\text{ 定义在} W_{< w} \\text{ 上、满足递归式，且} y = G(f) \\}$$',
        '',
        '它是集合：候选的 $f$ 都是 $W_{< w} \\times V$ 的子集，先由幂集公理拿到 $\\mathcal{P}(W \\times V)$，再用分离公理模式从里面筛出满足条件的那些（$V$ 取一个足够大的集合即可，例如 $G$ 的值域之并的幂集的幂集）。由 ①，对每个 $w$ 至多一个 $y$，所以 $R$ **是单值的**，即 $R$ 是一个函数。',
        '',
        '**③ $R$ 的定义域是整个 $W$。** 反设不然，取最小的 $w \\notin \\operatorname{dom}\\, R$。则 $W_{< w} \\subseteq \\operatorname{dom}\\, R$，于是 $f := R \\upharpoonright W_{< w}$ 是 $W_{< w}$ 上满足递归式的函数（若 $v \\prec w$，由 $v \\in \\operatorname{dom}\\, R$ 及单值性得 $f(v) = G(f \\upharpoonright W_{< v})$）。于是 $(w, G(f)) \\in R$，与 $w \\notin \\operatorname{dom}\\, R$ 矛盾。',
        '',
        '故 $R$ 就是所求的函数 $F$，由 ① 唯一。',
        '',
        '**④ 超限归纳。** 设 $W \\setminus S$ 非空，取它的最小元 $w$。则 $W_{< w} \\subseteq S$，由假设 $w \\in S$，矛盾。故 $S = W$。∎'
      ].join('\n'),
      note: '① 是唯一性、②③ 是存在性。整个证明里**只用**了良序性、幂集公理和分离公理模式 —— 没有用到选择公理。这是它能在 ZF 里安全使用的原因。'
    },

    {
      id: 'imp.ordinal-trichotomy',
      kind: 'implication',
      sources: ['def.ordinal', 'ax.found'],
      target: 'thm.ordinal-trichotomy',
      title: '序数的定义 $\\implies$ 三歧性',
      proof: [
        '设 $\\alpha, \\beta$ 是序数。',
        '',
        '**① 序数的元素是序数。** 若 $\\gamma \\in \\alpha$：$\\gamma \\subseteq \\alpha$（$\\alpha$ 传递），故 $\\gamma$ 传递（$\\gamma$ 的元素属于 $\\alpha$，而 $\\alpha$ 传递）；又 $\\in$ 在 $\\gamma$ 上继承 $\\alpha$ 上的良序性，故 $\\gamma$ 是序数。',
        '',
        '**② 若 $\\beta \\subset \\alpha$ 则 $\\beta \\in \\alpha$。** 取 $b$ 为 $\\alpha \\setminus \\beta$ 的 $\\in$-最小元。断言 $\\beta = b$。',
        '　$\\subseteq$：设 $x \\in \\beta$。由 $\\beta \\subseteq \\alpha$ 有 $x \\in \\alpha$，故 $x, b \\in \\alpha$；由 $\\in$ 在 $\\alpha$ 上的**三歧性**（良序蕴含全序），$x \\in b$、$x = b$、$b \\in x$ 恰有一个成立。后两种都会给出 $b \\in \\beta$（$x = b$ 直接，$b \\in x$ 用 $\\beta$ 传递），与 $b$ 的取法矛盾。故 $x \\in b$。',
        '　$\\supseteq$：设 $x \\in b$。由 $\\alpha$ 传递得 $x \\in \\alpha$。若 $x \\in \\alpha \\setminus \\beta$，则 $x \\in b$ 与 $b$ 的最小性矛盾（$x \\in b$ 即 $x$ 比 $b$ 小）。故 $x \\in \\beta$。',
        '　于是 $\\beta = b$，而 $b \\in \\alpha$，即 $\\beta \\in \\alpha$。',
        '',
        '**③ 三歧性。** 若 $\\alpha \\ne \\beta$，则 $\\alpha \\subseteq \\beta$ 与 $\\beta \\subseteq \\alpha$ 不能同时成立。不妨设 $\\beta \\nsubseteq \\alpha$，则 $\\beta \\setminus \\alpha \\ne \\emptyset$，故 $\\beta \\subset \\alpha$ 不成立，由 ② 得 $\\alpha \\in \\beta$。对调 $\\alpha, \\beta$ 同理。',
        '',
        '**④ 三者不相容。** 若 $\\alpha \\in \\beta$ 且 $\\beta \\in \\alpha$，则由传递性 $\\alpha \\in \\alpha$，与 $\\in$ 在 $\\alpha$ 上是良序（无 $\\in$-循环）矛盾。又 $\\alpha \\in \\beta$ 与 $\\alpha = \\beta$ 显然不相容。',
        '',
        '**⑤ $\\in$ 是良序。** 可比性已得；非空序数集合 $S$ 取 $\\alpha \\in S$，若 $\\alpha$ 不是 $\\in$-最小元，则 $\\alpha \\cap S$ 是集合，由正则公理有 $\\in$-最小元 $m$，而 $m$ 也是 $S$ 的 $\\in$-最小元。∎'
      ].join('\n'),
      note: '② 是全部关键：「序数之间 $\\subset$ 就是 $\\in$」。它让序数的比较退化成集合的属于关系。'
    },

    {
      id: 'imp.wellorder-ordinal',
      kind: 'implication',
      sources: ['thm.recursion-wellorder', 'ax.repl', 'ax.found', 'thm.ordinal-trichotomy'],
      target: 'thm.wellorder-ordinal',
      title: '递归定理 + 替换公理 $\\implies$ 每个良序集有唯一序型',
      proof: [
        '设 $(W, \\preceq )$ 是良序集。',
        '',
        '**① 造出函数。** 由**递归定理**（取 $G(f) = \\operatorname{ran}\\, f$，即「前面全部取值的值域」）得到唯一的 $F$ 定义在 $W$ 上，使',
        '',
        '$$F(w) = \\{ F(v) : v \\prec w \\}, \\qquad \\forall w \\in W$$',
        '',
        '每个 $F(w)$ 都是集合 —— 由**替换公理模式**，$\\{ F(v) : v \\prec w \\}$ 是某个集合的像。',
        '',
        '**② $F$ 保序。** 若 $v \\prec w$，则 $F(v) \\in \\{ F(u) : u \\prec w \\} = F(w)$。反过来若 $F(v) \\in F(w)$，则 $F(v) = F(u)$ 对某个 $u \\prec w$；再由 ③ 的单射性得 $v = u \\prec w$。',
        '',
        '**③ $F$ 是单射。** 反设存在 $v \\ne w$ 使 $F(v) = F(w)$；由于 $\\preceq$ 是全序，不妨 $v \\prec w$。由 ② 得 $F(v) \\in F(w) = F(v)$，即 $F(v) \\in F(v)$ —— 与「任何集合都不属于自身」（正则公理的推论）矛盾。（这一步是真正用到**正则公理**的地方。）',
        '',
        '**④ $\\alpha := \\operatorname{ran}\\, F$ 是序数。** 由替换公理模式，$\\alpha = \\{ F(w) : w \\in W \\}$ 是集合。**传递性**：若 $x \\in F(w)$，则 $x = F(v)$ 对某个 $v \\prec w$，故 $x \\in \\alpha$。**$\\in$ 良序**：$\\alpha$ 上的 $\\in$ 经 ②③ 就是 $(W, \\prec)$ 的序（$x \\in y \\iff F^{-1}(x) \\prec F^{-1}(y)$），良序性原样搬过来。',
        '',
        '**⑤ 于是 $F$ 是 $(W, \\preceq ) \\to (\\alpha, \\in)$ 的序同构**，故 $W$ 的序型 $\\alpha$ 存在。',
        '',
        '**⑥ 唯一性。** 设 $\\alpha, \\beta$ 都是 $W$ 的序型，则 $(\\alpha, \\in) \\cong (\\beta, \\in)$。由**三歧性**，$\\alpha \\in \\beta$、$\\alpha = \\beta$、$\\beta \\in \\alpha$ 恰有一个成立。若 $\\alpha \\in \\beta$：由 $\\beta$ 传递得 $\\alpha \\subseteq \\beta$，且 $\\alpha = \\{ x \\in \\beta : x \\in \\alpha \\}$ 是 $\\beta$ 的**真**初始段。把两个序同构接起来，得到 $(\\alpha, \\in)$ 与自己的真初始段序同构 —— 而**良序集不能与自己的真初始段序同构**（见下），矛盾。故 $\\alpha \\notin \\beta$；交换 $\\alpha, \\beta$ 同理得 $\\beta \\notin \\alpha$。于是只能 $\\alpha = \\beta$。',
        '',
        '**引理**（上一步用到）：良序集 $(L, \\prec)$ 不可能与它的真初始段 $L_{< a} = \\{ x \\in L : x \\prec a \\}$ 序同构。',
        '证：设 $h : L \\to L_{< a}$ 是序同构。对 $x \\prec a$ 用**超限归纳**：若 $\\forall y \\prec x,\\ h(y) = y$，则 $h(x)$ 是 $L_{< a}$ 中大于一切 $h(y) = y\\ (y \\prec x)$ 的最小元，也就是「大于一切 $y \\prec x$ 的最小元」，即 $h(x) = x$（序同构把「小于 $x$ 的全部元素」映成「小于 $h(x)$ 的全部元素」）。故 $h$ 在 $L_{< a}$ 上恒等；于是 $h(a)$ 是 $L_{< a}$ 中大于一切 $y \\prec a$ 的最小元，即 $h(a) = a$ —— 但 $h(a) \\in L_{< a}$ 意为 $h(a) \\prec a$，矛盾。∎'
      ].join('\n'),
      note: '整个证明只用 **ZF**（递归定理 + 替换公理 + 三歧性），不要选择公理。这正是 Hartogs 定理能在 ZF 里成立的原因之一。'
    },

    {
      id: 'imp.burali-forti',
      kind: 'implication',
      sources: ['def.ordinal', 'thm.ordinal-trichotomy'],
      target: 'thm.burali-forti',
      title: '序数的定义 + 三歧性 $\\implies$ 序数全体是真类',
      proof: [
        '反设 $\\mathrm{On}$ 是一个集合。',
        '',
        '**① $\\mathrm{On}$ 传递。** 若 $x \\in \\mathrm{On}$，则 $x$ 是序数，而序数的元素还是序数（见三歧性的证明 ①），故 $x \\subseteq \\mathrm{On}$。',
        '',
        '**② $\\in$ 在 $\\mathrm{On}$ 上良序。** 可比性来自三歧性；$\\mathrm{On}$ 的非空子集 $S$ 取 $\\alpha \\in S$，若 $\\alpha$ 不是 $\\in$-最小元，则由正则公理 $\\alpha \\cap S$ 有 $\\in$-最小元，它也是 $S$ 的 $\\in$-最小元。',
        '',
        '**③ 于是 $\\mathrm{On}$ 是序数。** ①② 正是序数定义的两条。',
        '',
        '**④ 矛盾。** $\\mathrm{On}$ 是序数故 $\\mathrm{On} \\in \\mathrm{On}$，与 $\\in$ 在 $\\mathrm{On}$ 上良序（无 $\\in$-循环）矛盾。∎'
      ].join('\n'),
      note: '「序数全体」是**真类**而不是集合 —— 所以分离公理模式不能用在它身上。这正是 ZFC 处理 Russell 悖论、Burali–Forti 悖论的统一办法。'
    }
  ]
});
