/* ==========================================================================
   内容包 · 丛的分类补洞（二）：结构群与转移函数
   --------------------------------------------------------------------------
   用户：「我记得还有个引用了但没定义的节点。。我忘记了你再去检查一下」

   扫描结果（`_tools/_termcheck.mjs` + `_tools/_missingterms2.mjs`）：
     · **结构群**：8 个节点提到它（`def.vector-bundle`、`def.fiber-bundle`、
       `def.principal-bundle`、`def.local-trivialization`、`prop.bundle-metric`、
       `thm.bundle-classification` …），**没有任何节点以它命名**。
       `def.fiber-bundle` 里只有一句「若再给定 Lie 群 $G$ 在 $F$ 上的作用…就说结构群是
       $G$」—— 而 `def.principal-bundle` 的标题、`thm.bundle-classification` 的结论
       （「换成任意的结构群 $G$」）都把它当成**已有概念**在用。
     · **转移函数**：同样是 6 个节点的公共词，也没有节点。
       丛「怎么粘」全记在它身上（分类定理的正文就是「$1$-上闭链模等价」），
       却只散落在各节点的正文里。

   这就是「引用了但没定义」的那一处 —— 也正是丛那几条读起来说不清的原因：
   读者读到「分类由结构群决定」「转移函数满足上闭链」时，两个主语都没有落脚点。

   本包补 2 个节点，都进 `diffgeom.manifold`：
     · def.structure-group   结构群
     · def.transition-function 转移函数
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '结构群与转移函数',

  nodes: [

    {
      id: 'def.transition-function',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '转移函数',
      title: '转移函数：一块丛「怎么粘」的全部数据',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '纤维丛', '转移函数', '上闭链'],
      statement: [
        '**在做什么**：丛不是由一片片「$U \\times F$」决定的，而是由**重叠处怎么对齐**决定的。这些对齐就是转移函数 —— 丛的一切（同构类、结构群、联络、特征类）都从它读出来。',
        '',
        '设 $\\pi : E \\to B$ 是以 $F$ 为纤维的纤维丛，$\\{U_{\\alpha}\\}$ 是一组**局部平凡化** $\\Phi_{\\alpha} : \\pi^{-1}(U_{\\alpha}) \\to U_{\\alpha} \\times F$ 的覆盖（`def.local-trivialization`）。在重叠 $U_{\\alpha\\beta} := U_{\\alpha} \\cap U_{\\beta}$ 上，两条平凡化相差一个纤维自同胚：',
        '',
        '$$\\Phi_{\\alpha} \\circ \\Phi_{\\beta}^{-1} (b, y) = \\bigl(b,\\ g_{\\alpha\\beta}(b)\\, y\\bigr), \\qquad g_{\\alpha\\beta} : U_{\\alpha\\beta} \\longrightarrow \\mathrm{Homeo}(F) .$$',
        '',
        '光滑丛要求 $g_{\\alpha\\beta}$ 光滑（$F$ 是流形时取 $\\mathrm{Diff}(F)$）；向量丛要求它逐纤维线性（于是取值在 $\\mathrm{GL}(k)$ 里）。这些 $g_{\\alpha\\beta}$ 就叫**转移函数**。',
        '',
        '**上闭链条件**：三个覆盖相交处，两次换基必须与一次换基一致 —— 因为左端 $(\\Phi_{\\alpha}\\Phi_{\\beta}^{-1})(\\Phi_{\\beta}\\Phi_{\\gamma}^{-1}) = \\Phi_{\\alpha}\\Phi_{\\gamma}^{-1}$，于是',
        '',
        '$$g_{\\alpha\\alpha} = \\mathrm{id}, \\qquad g_{\\alpha\\beta}\\, g_{\\beta\\gamma}\\, g_{\\gamma\\alpha} = \\mathrm{id} \\quad \\text{在}\\ U_{\\alpha\\beta\\gamma}\\ \\text{上} .$$',
        '',
        '**反过来**（丛的粘合构造）：给定覆盖 $\\{U_{\\alpha}\\}$、纤维 $F$ 与满足上闭链条件的一族 $g_{\\alpha\\beta}$，在不交并 $\\bigsqcup_{\\alpha} U_{\\alpha} \\times F$ 上令',
        '',
        '$$(b, y) \\sim (b,\\ g_{\\alpha\\beta}(b)\\,y) \\quad (b \\in U_{\\alpha\\beta}) ,$$',
        '',
        '取商即得以 $F$ 为纤维的丛。**两方向互逆**（差自然同构），故「丛 = 覆盖 + 满足上闭链的转移函数」。'
      ].join('\n'),
      notes: [
        '**为什么它是「全部数据」**：局部上丛总是平凡的（$U \\times F$），全部区别都在重叠处：丛的几何 = 转移函数的几何。这也解释了为什么分类丛要模掉换基：换一组平凡化（$\\Phi_{\\alpha} \\mapsto h_{\\alpha}\\Phi_{\\alpha}$）会把 $g_{\\alpha\\beta}$ 换成 $h_{\\alpha} g_{\\alpha\\beta} h_{\\beta}^{-1}$，而丛本身没变 —— 这就是分类定理里的「等价」关系（见 `thm.bundle-classification`）。',
        '**取值落在哪里，就决定了是什么丛**：$g_{\\alpha\\beta}$ 落在 $\\mathrm{GL}(k,\\mathbb{R})$ $\\implies$ 实向量丛；落在 $\\mathrm{O}(k)$ $\\implies$ 配了纤维度量的丛；落在 $\\mathrm{GL}(k,\\mathbb{C})$ $\\implies$ 复丛；落在离散群 $\\implies$ 平坦丛。这个「落在哪」的群就叫**结构群**（`def.structure-group`），所以「换结构群」在技术上就是「把转移函数的取值限制在更小的子群里」。',
        '⚠️ **上闭链不是可选项**：$g_{\\alpha\\beta} g_{\\beta\\alpha} = \\mathrm{id}$ 与三重叠条件是**丛存在**的必要条件（它们只是「换基的自洽性」）。但仅有上闭链条件并不保证丛是平凡的 —— 恰恰相反，**第一个障碍**就在三重叠处：那正是 Čech $H^{1}$（非阿贝尔情形）度量的东西。',
        '⚠️ **记号有两套**：$g_{\\alpha\\beta}$（上闭链，丛的粘合）与 $g_{ij}$（流形图卡之间的坐标变换）长得一样，但后者只是 $\\mathrm{id}$ 平凡丛的转移函数。读文献时看上下文：讲丛分类时是前者。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 转移函数', 'Tu, Differential Geometry']
    },

    {
      id: 'def.structure-group',
      cluster: 'diffgeom.characteristic',
      type: 'definition',
      label: '结构群',
      title: '结构群：转移函数允许落在哪个群',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '纤维丛', '结构群', '主丛'],
      statement: [
        '**在做什么**：同一个纤维 $F$ 可以粘成很多互不同构的丛。**结构群**就是「允许用哪些自同胚去粘」—— 它把「丛的类型」压成一个群。',
        '',
        '设 $\\pi : E \\to B$ 是以 $F$ 为纤维的纤维丛，$G \\le \\mathrm{Homeo}(F)$（光滑情形 $G \\le \\mathrm{Diff}(F)$；向量丛 $F = \\mathbb{R}^{k}$ 时 $G \\le \\mathrm{GL}(k,\\mathbb{R})$）。称 $E$ 的**结构群**是 $G$，若存在一组局部平凡化，使全部**转移函数**（`def.transition-function`）都取值在 $G$ 里：',
        '',
        '$$g_{\\alpha\\beta}(U_{\\alpha\\beta}) \\subseteq G \\quad \\text{对一切}\\ \\alpha, \\beta .$$',
        '',
        '**等价说法**：$E$ 可以由一个主 $G$-丛（`def.principal-bundle`）配上一个 $G$-作用在 $F$ 上的作用**配出来**（`def.associated-bundle`）。',
        '',
        '**同一根纤维、不同的结构群**：$F = \\mathbb{R}^{k}$ 时，取 $G = \\mathrm{GL}(k)$ 得到一般向量丛；取 $G = \\mathrm{O}(k)$ 得到「带纤维度量的丛」（由 `prop.bundle-metric`，每个丛都能这样约化）；取 $G = \\mathrm{SL}(k)$ 得到「带体积形式的丛」；取 $G = \\mathrm{GL}(k,\\mathbb{C}) \\subset \\mathrm{GL}(2k,\\mathbb{R})$ 得到复丛。'
      ].join('\n'),
      notes: [
        '**一句话**：结构群 = **转移函数的允许取值**。所以「这个丛有没有某某结构」等于问「它的转移函数能不能都塞进某个子群 $G$ 里」。丛的分类到此变成「按群分类」（见 `thm.bundle-classification`：秩 $k$ 的 $G$-丛由 $\\check{H}^{1}(B; G)$ 分类）。',
        '**约化**：一个丛可能同时容许多个结构群。若 $H \\le G$，把转移函数从 $G$ 塞进 $H$ 叫**结构群约化**（从 $G$ 约化到 $H$）。这是几何里最常用的手法：**每个向量丛都能约化到 $\\mathrm{O}(k)$**（配一个纤维度量，`prop.bundle-metric`），却**不能**总约化到 $\\mathrm{SO}(k)$（那要求可定向）。**「能不能约化」是障碍理论问题**，障碍住在 $H^{1}(B; G/H)$ 一类的地方。',
        '⚠️ **结构群不是唯一的**：一个丛可以同时是 $\\mathrm{GL}(k)$-丛与 $\\mathrm{O}(k)$-丛（后者更精细）。所以「这个丛的结构群是 $G$」这句话的准确读法是「**存在**使转移函数落在 $G$ 里的平凡化」—— 不是「只有 $G$」。',
        '⚠️ **主丛是「结构群 = 纤维」的极端**：主 $G$-丛的纤维就是 $G$ 自己（`def.principal-bundle`），此时结构群与纤维重合，丛的信息全在 $G$ 的右作用里。向量丛与主丛的对应（帧丛 / 配丛）就是「结构群」这个概念的两侧。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 结构群', 'Tu, Differential Geometry（⚠️ 章名未核实，只记书名）']
    }
  ],

  edges: [
    { id: 'dep-tf-localt', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.transition-function',
      note: '转移函数是两条**局部平凡化**在重叠处的差。' },
    { id: 'dep-tf-fiber', kind: 'definition',
      definition: 'def.fiber-bundle', usedBy: 'def.transition-function',
      note: '它是纤维丛的粘合数据。' },
    { id: 'dep-tf-smooth', kind: 'definition',
      definition: 'def.smooth-manifold', usedBy: 'def.transition-function',
      note: '光滑丛要求转移函数光滑（$F$ 是流形）。' },
    { id: 'dep-tf-vector', kind: 'definition',
      definition: 'def.vector-bundle', usedBy: 'def.transition-function',
      note: '向量丛的情形：转移函数逐纤维线性，取值在 $\\mathrm{GL}(k)$。' },
    { id: 'dep-tf-class', kind: 'definition',
      definition: 'def.transition-function', usedBy: 'thm.bundle-classification',
      note: '分类定理的主语就是转移函数：丛的同构类 = 上闭链模换基。' },

    { id: 'dep-sg-tf', kind: 'definition',
      definition: 'def.transition-function', usedBy: 'def.structure-group',
      note: '结构群是用转移函数的**取值**定义的。' },
    { id: 'dep-sg-fiber', kind: 'definition',
      definition: 'def.fiber-bundle', usedBy: 'def.structure-group',
      note: '结构群是对纤维丛说的。' },
    { id: 'dep-sg-principal', kind: 'definition',
      definition: 'def.principal-bundle', usedBy: 'def.structure-group',
      note: '等价刻画用主 $G$-丛（结构群与纤维重合的那一类）。' },
    { id: 'dep-sg-assoc', kind: 'definition',
      definition: 'def.associated-bundle', usedBy: 'def.structure-group',
      note: '「由主 $G$-丛配上 $G$-作用配出来」= 配丛。' },
    { id: 'dep-sg-metric', kind: 'definition',
      definition: 'prop.bundle-metric', usedBy: 'def.structure-group',
      note: '每个向量丛都能约化到 $\\mathrm{O}(k)$ —— 这条是「结构群可约化」最常用的例子。' },
    { id: 'dep-sg-class', kind: 'definition',
      definition: 'def.structure-group', usedBy: 'thm.bundle-classification',
      note: '分类定理的结论按结构群陈述：秩 $k$ 的 $G$-丛由 $\\check{H}^{1}(B;G)$ 分类。' }
  ]
});
