/* ==========================================================================
   内容包 · 范畴与图（5 条）
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
      title: 'Grothendieck 宇宙（Grothendieck Universe）',
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
        '**宇宙存在**是一条额外的公理（Grothendieck 公理），不在 ZFC 里。',
        '它的用处是给「大」与「小」一个**相对**的标准：$U$ 里的东西叫小，$U$ 本身叫大。$\\mathbf{Set}$、$\\mathbf{Grp}$ 这些范畴的对象全体不构成集合，但相对于一个宇宙它们都是小的 —— 「小范畴」这个词背后就是这件事。',
        '封装的四条足够把常见构造全搬进 $U$：由 2 取 $x = y$ 得单点集，再取一次得有序对 $\\{ \\{x\\}, \\{x,y\\} \\}$；由 3、4 得笛卡尔积（$A \\times B \\subseteq \\mathcal{P}(\\mathcal{P}(A \\cup B))$）与函数集。'
      ].join('\n\n'),
      refs: ['SGA 4, I.0']
    },

    /* -------------------------------------------------------------- 图 */
    {
      id: 'def.graph',
      cluster: 'cat.basic',
      type: 'definition',
      label: '图',
      title: '图（Graph）',
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
      ].join('\n\n')
    },

    /* --------------------------------------------------------- 图的态射 */
    {
      id: 'def.graph-morphism',
      cluster: 'cat.basic',
      type: 'definition',
      label: '图的态射',
      title: '图的态射（Morphism of Graphs）',
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
      notes: '两条等式各管一头。把它们画成方块就是「图的态射」这个名字的全部内容 —— 顶点那层与边那层各自连续，并且方向对得上。'
    },

    /* ------------------------------------------------------------ 范畴 */
    {
      id: 'def.category',
      cluster: 'cat.basic',
      type: 'definition',
      label: '范畴',
      title: '范畴（Category）',
      regions: ['category'],
      tags: ['范畴论', '复合', '单位'],
      statement: [
        '一个**范畴**是一个六元组',
        '',
        '$$( \\mathcal{O}, M, s, t, \\circ, i )$$',
        '',
        '其中 $(\\mathcal{O}, M, s, t)$ 是一个**图**：$\\mathcal{O}$ 是**对象**，$M$ 是**态射**，$s, t : M \\to \\mathcal{O}$ 给出每条态射的**源**与**靶**，记 $f : X \\to Y$ 表示 $s(f) = X$、$t(f) = Y$。此外还有两个映射：',
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
        '$$M = \\{ (m, n, f) : m, n \\in \\mathbb{N},\\ f : [m] \\to [n] \\text{ 递增} \\}, \\qquad [m] = \\{ 1, \\ldots, m \\}$$',
        '',
        '态射是从 $m$ 到 $n$ 的递增映射。',
        '**开集范畴** $\\operatorname{Open}(X)$：给定拓扑空间 $(X, \\tau)$，取 $\\mathcal{O} = \\tau$，',
        '',
        '$$M = \\{ (u, v) : u \\subseteq v \\} \\subseteq \\tau \\times \\tau$$',
        '',
        '即「从小的开集到包含它的开集」。'
      ].join('\n\n')
    },

    /* -------------------------------------------------------- 截面与收缩 */
    {
      id: 'def.section-retraction',
      cluster: 'cat.basic',
      type: 'definition',
      label: '截面与收缩',
      title: '截面与收缩（Section / Retraction）',
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
      notes: '两条等式方向相反：截面是「先 $g$ 再 $f$，回到 $Y$ 原地」，收缩是「先 $f$ 再 $g$，回到 $X$ 原地」。换句话说，截面是 $f$ 的右逆，收缩是 $f$ 的左逆 —— 名字不同是因为复合的写法与映射的写法反着来。'
    }
  ],

  edges: []
});
