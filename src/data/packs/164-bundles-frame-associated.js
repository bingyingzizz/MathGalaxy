/* ==========================================================================
   内容包 · 丛的分类补洞：帧丛与配丛
   --------------------------------------------------------------------------
   用户原话：「我发现丛的分类那几个相关的点写的不太好，不太详细，让人不知道在说啥」。

   诊断（补前取证）：`def.principal-bundle` 的正文里写了
     · 「**帧丛**（每点取纤维的一组基）给出最常用的例子」
     · 「向量丛都能从主丛造出来（取**配丛**）」
   而 **帧丛 3 次、配丛 5 次** 的提及，全库**没有一个节点**解释它们是什么。
   于是「主丛 → 向量丛」这座桥在半空断掉：读者读到「取配丛」就卡住了。
   这正是「不知道在说啥」的直接原因。

   本包补 2 个节点（都进 `diffgeom.manifold`，与主丛 / 向量丛同团）：
     · def.frame-bundle     帧丛：把「向量丛」变成「主 GL(k)-丛」的那座桥
     · def.associated-bundle 配丛：把「主 G-丛」变成「纤维为 F 的丛」的那座桥
   两者互为逆：向量丛 ↦ 帧丛 ↦ 配丛（用标准表示）回到原丛。

   ⚠️ 层号：主丛在 L26、向量丛在 L9，所以帧丛只能排在 L27+。
      这是「主丛那条链本来就深」的后果，不是错误。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '帧丛与配丛：向量丛与主丛之间的两座桥',

  nodes: [

    {
      id: 'def.frame-bundle',
      cluster: 'diffgeom.characteristic',
      type: 'definition',
      label: '帧丛',
      title: '帧丛：把向量丛变成主 $\\mathrm{GL}(k)$-丛',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '帧丛', '主丛', '向量丛'],
      statement: [
        '**在做什么**：向量丛的纤维是**向量空间**（有加法、有零元）；主丛的纤维是 $G$-**挠集**（torsor：$G$ 自由且传递地作用，自身没有典范的单位元 —— 选定一个基点后才**非典范地**认成 $G$）。帧丛就是两者之间那座桥：把每根纤维里的「一组基」而不是「一个向量」取出来当新纤维。',
        '',
        '设 $\\pi : E \\to M$ 是秩 $k$ 的光滑实向量丛。**帧丛** $\\mathrm{Fr}(E) \\to M$ 的纤维是',
        '',
        '$$\\mathrm{Fr}(E)_{p} := \\{\\, (e_{1}, \\ldots, e_{k}) : e_{i} \\in E_{p},\\ (e_{i})\\ \\text{是}\\ E_{p}\\ \\text{的一组基} \\,\\} ,$$',
        '',
        '全体帧丛取不交并 $\\mathrm{Fr}(E) := \\bigsqcup_{p} \\mathrm{Fr}(E)_{p}$，投影取「忘记基、只留 $p$」。',
        '',
        '**结构**：$\\mathrm{GL}(k,\\mathbb{R})$ 在右侧自由作用（换一组基就是右乘一个矩阵），',
        '',
        '$$(e_{1}, \\ldots, e_{k})\\cdot A := \\Bigl(\\sum_{i} e_{i}A_{i1}, \\ldots, \\sum_{i} e_{i}A_{ik}\\Bigr) ,$$',
        '',
        '于是 $\\mathrm{Fr}(E) \\to M$ 是**主 $\\mathrm{GL}(k,\\mathbb{R})$-丛**（`def.principal-bundle`）。',
        '',
        '**反过来**：给定主 $\\mathrm{GL}(k)$-丛 $P \\to M$，配丛 $P \\times_{\\mathrm{GL}(k)} \\mathbb{R}^{k}$ 就是一个秩 $k$ 向量丛；这两个构造互逆（差一个自然同构）。'
      ].join('\n'),
      notes: [
        '⭐ **为什么需要它**：很多构造对「向量丛」不好讲、对「主丛」却很好讲（联络、曲率、特征类）。帧丛让你**把向量丛搬到主丛那边做完，再搬回来** —— 这就是「向量丛的理论 = 主 $\\mathrm{GL}(k)$-丛的理论」的技术含义。',
        '**光滑性**：$\\mathrm{Fr}(E)$ 上有唯一的流形结构使投影光滑且局部平凡（在 $E$ 的局部平凡化 $U \\times \\mathbb{R}^{k}$ 上，帧就是 $U \\times \\mathrm{GL}(k,\\mathbb{R})$）。所以「帧丛是主丛」不是集合层面的巧合，而是光滑层面的同构。',
        '⚠️ **$\\mathrm{Fr}(E)$ 的维数**是 $\\dim M + k^{2}$（$\\mathrm{GL}(k)$ 的维数是 $k^{2}$），而不是 $\\dim M + k$。\n\n这一点常被写错：帧丛**比原丛大得多**（$k = 1$ 时两者维数才相同，因为 $\\mathrm{GL}(1) = \\mathbb{R}^{\\times}$ 是一维的）。',
        '⚠️ **约化结构群 = 额外的几何结构**：$\\mathrm{Fr}(E)$ 里挑出「关于某个度量标准正交」的帧，得到一个主 $\\mathrm{O}(k)$-子丛；挑出「关于某个复结构是复线性」的帧，得到 $\\mathrm{GL}(k,\\mathbb{C})$。\n\n**反过来，主 $G$-子丛 与 向量丛上的 $G$-结构**（度量、复结构、定向、$\\mathrm{Spin}$ 结构……）。\n\n这是「$G$-结构」这套语言的起点。'
      ].join('\n\n'),
      refs: [
        'Tu, Differential Geometry',
        'Kobayashi–Nomizu, Foundations of Differential Geometry'
      ]
    },

    {
      id: 'def.associated-bundle',
      cluster: 'diffgeom.characteristic',
      type: 'definition',
      label: '配丛',
      title: '配丛：主 $G$-丛配上一个 $G$-作用得到的新丛',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '配丛', '主丛', '纤维丛'],
      statement: [
        '**在做什么**：主丛的纤维是群 $G$，但你要的纤维常常是别的空间 $F$（向量空间、球面、旗流形……）。**配丛**就是「把 $G$ 换成 $F$」的标准手术：拿 $G$ 在 $F$ 上的作用把两者粘起来。',
        '',
        '设 $P \\to M$ 是主 $G$-丛（`def.principal-bundle`），$F$ 是带左 $G$-作用的流形。积空间 $P \\times F$ 上令 $G$ 右作用',
        '',
        '$$(u, y)\\cdot g := (u \\cdot g,\\ g^{-1}\\cdot y) ,$$',
        '',
        '其轨道空间记',
        '',
        '$$P \\times_{G} F := (P \\times F)\\big/ G ,$$',
        '',
        '投影 $[u, y] \\mapsto \\pi(u)$ 把它做成以 $F$ 为纤维的纤维丛，叫**配丛**（associated bundle）。',
        '',
        '**最重要的情形**：取 $F = \\mathbb{R}^{k}$ 与 $G = \\mathrm{GL}(k,\\mathbb{R})$ 的标准作用，则',
        '',
        '$$\\mathrm{Fr}(E) \\times_{\\mathrm{GL}(k)} \\mathbb{R}^{k} \\;\\cong\\; E ,$$',
        '',
        '即**每个向量丛都是其帧丛的配丛** —— 这与 `def.frame-bundle` 合起来就是「向量丛 $\\leftrightarrow$ 秩 $k$ 向量丛的主 $\\mathrm{GL}(k)$-丛」的一一对应（分类只在同构意义下说）。'
      ].join('\n'),
      notes: [
        '⭐ **$g^{-1}$ 不是笔误**：要让右作用真的成立，必须一边用 $g$、一边用 $g^{-1}$（否则 $(u,y)\\cdot g\\cdot h$ 会变成 $(u\\cdot gh, h^{-1}g^{-1}y)$，与 $(u,y)\\cdot(gh)$ 不一致）。这是配丛最容易写错的一处记号。',
        '**为什么用 $G$ 而不是「随便一个同构」**：配丛的定义里，$G$-作用就是**唯一的粘合数据**。所以「配丛」把「纤维丛 + 结构群落在 $G$ 里」这件事写成了一个具体构造 —— 这与 `def.fiber-bundle` 里「结构群是 $G$」那句话是同一件事的两种说法。',
        '⚠️ **截面 与 等变映射**：配丛的截面 $M \\to P\\times_{G}F$ 与「$G$-等变映射 $P \\to F$」一一对应。\n\n这条对应是**物理里「规范场 与 主丛上的等变函数」**的数学形式，也是「向量丛的截面 = 帧丛上的 $\\mathrm{GL}(k)$-等变 $\\mathbb{R}^{k}$-值函数」的来源。',
        '⚠️ 配丛**不需要** $G$ 离散、也不需要 $F$ 线性。取 $F = G/H$ 得到「齐性空间丛」（例如 $F = S^{2} = \\mathrm{SO}(3)/\\mathrm{SO}(2)$ 给出「球面丛」），取 $F = G$ 且作用取左乘/右乘，可以造出伴主丛 —— 后者正是「$G$-丛的扭子」那类构造。'
      ].join('\n\n'),
      refs: [
        'Tu, Differential Geometry',
        'Kobayashi–Nomizu, Foundations of Differential Geometry'
      ]
    }
  ],

  edges: [
    { id: 'dep.fr-vector', kind: 'definition',
      definition: 'def.vector-bundle', usedBy: 'def.frame-bundle',
      note: '帧丛是「向量丛 + 每根纤维选一组基」，先有向量丛。' },
    { id: 'dep.fr-principal', kind: 'definition',
      definition: 'def.principal-bundle', usedBy: 'def.frame-bundle',
      note: '结论是「帧丛是主 $\\mathrm{GL}(k)$-丛」—— 用的是主丛的定义。' },
    { id: 'dep.fr-localt', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.frame-bundle',
      note: '帧丛的局部平凡化来自向量丛的局部平凡化（$U \\times \\mathrm{GL}(k)$）。' },

    { id: 'dep.ab-principal', kind: 'definition',
      definition: 'def.principal-bundle', usedBy: 'def.associated-bundle',
      note: '配丛是「主丛 + $G$-作用」粘出来的，主丛是全部输入。' },
    { id: 'dep.ab-fiber', kind: 'definition',
      definition: 'def.fiber-bundle', usedBy: 'def.associated-bundle',
      note: '配丛本身是以 $F$ 为纤维的纤维丛。' },
    { id: 'dep.ab-frame', kind: 'definition',
      definition: 'def.frame-bundle', usedBy: 'def.associated-bundle',
      note: '关键恒等式：每个向量丛 = 帧丛的配丛（$F = \\mathbb{R}^{k}$）。' },
    { id: 'dep.ab-vector', kind: 'definition',
      definition: 'def.vector-bundle', usedBy: 'def.associated-bundle',
      note: '主要情形 $F = \\mathbb{R}^{k}$ 的结论就是「又得到向量丛」。' }
  ]
});
