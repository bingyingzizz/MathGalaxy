/* ==========================================================================
   内容包 · 集合论基本定义与定理
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '集合论基本定义与定理',
  nodes: [

    /* -------------------------------------------------------- 子集 */
    {
      id: 'def.subset',
      cluster: 'set.construct',
      type: 'definition',
      label: '子集',
      title: '子集 / 真子集（Subset）',
      regions: ['set-theory'],
      tags: ['定义', '包含关系'],
      statement: [
        '设 $A$、$B$ 是集合。',
        '',
        '- **$A$ 是 $B$ 的子集**（记 $A \\subseteq B$）：$$\\forall x ( x \\in A \\to x \\in B )$$',
        '- **$A$ 是 $B$ 的真子集**（记 $A \\subset B$）：$A \\subseteq B$ 且 $A \\ne B$。',
        '',
        '基本性质：$\\subseteq$ 自反、传递；并且由外延公理，',
        '',
        '$$A = B \\iff A \\subseteq B \\wedge  B \\subseteq A$$',
        '',
        '这是证明两个集合相等最常用的套路：**两边互包**。'
      ].join('\n'),
      notes: '$\\emptyset \\subseteq A$ 对一切 $A$ 成立（空泛真）。',
      refs: ['Kunen, Set Theory, I.2']
    },

    /* ------------------------------------------------------ 有序对 */
    {
      id: 'def.pair',
      cluster: 'set.construct',
      type: 'definition',
      label: '有序对',
      title: '有序对（Ordered Pair, Kuratowski）',
      regions: ['set-theory'],
      tags: ['定义', 'Kuratowski'],
      statement: [
        'Kuratowski 定义：',
        '',
        '$$(a, b) := \\{ \\{a\\}, \\{a, b\\} \\}$$',
        '',
        '它由配对公理与幂集公理保证是集合。',
        '',
        '**特征性质**（这才是「有序」的全部含义）：',
        '',
        '$$(a, b) = (c, d) \\iff a = c \\wedge  b = d$$',
        '',
        '$n$ 元组递归定义为 $(a_{1}$ …$a_{n}) = ( (a_{1}$ …$a_{n-1}), a_{n} )$。'
      ].join('\n'),
      notes: '用集合「编码」有序对之后，关系、函数、序型等等才都能在 ZFC 内部说清楚。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* -------------------------------------------------------- 关系 */
    {
      id: 'def.rel',
      cluster: 'set.rel',
      type: 'definition',
      label: '关系',
      title: '关系（Relation）',
      regions: ['set-theory'],
      tags: ['定义', '关系'],
      statement: [
        '设 $A$、$B$ 是集合。',
        '',
        '**关系** $R$ 由有序对组成；$R \\subseteq A \\times B$ 表示 $R$ 是 $A$ 到 $B$ 的关系。',
        '',
        '- **定义域** $\\operatorname{dom} R = \\{ a : \\exists b (a, b) \\in R \\}$；',
        '- **值域** $\\operatorname{ran} R = \\{ b : \\exists a (a, b) \\in R \\}$；',
        '- **逆** $R^{-1} = \\{ (b, a) : (a, b) \\in R \\}$。'
      ].join('\n'),
      notes: '在 ZFC 里关系就是一个集合（由有序对组成），没有额外的原始概念 —— 所以「$\\preceq$ 是 $A$ 上的关系」这句话本身是有内容的：它说的是一族有序对。\n\n常见的两类关系：**等价关系**（自反、对称、传递）与**偏序**（自反、反对称、传递）——后者另开一条节点。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* -------------------------------------------------------- 函数 */
    {
      id: 'def.function',
      cluster: 'set.rel',
      type: 'definition',
      label: '函数',
      title: '函数（Function）',
      regions: ['set-theory'],
      tags: ['定义', '函数'],
      statement: [
        '设 $f$ 是 $A$ 到 $B$ 的关系。$f$ 是一个**函数**（记 $f : A \\to B$），当且仅当对每个输入恰有一个输出：',
        '',
        '$$\\forall a \\in A, \\exists! b \\in B, (a, b) \\in f$$',
        '',
        '唯一性使 $f(a) = b$ 这个记号不会歧义；此时 $\\operatorname{dom} f = A$，$f$ 的**像**是 $f(A) = \\{ f(a) : a \\in A \\}$。',
        '',
        '单射 / 满射 / 双射见另一条节点。'
      ].join('\n'),
      notes: '在 ZFC 里「函数就是一种特殊的关系」：它只多了一条要求 —— 每个输入的输出**唯一**。\n\n⚠ 两个容易混的地方：\n- 「$f$ 是函数」不要求 $A$ 上处处有定义；要求了才写 $f : A \\to B$（即 $\\operatorname{dom} f = A$）。\n- 像 $f(A)$ 一般只是 $B$ 的子集，满射才要求 $f(A) = B$。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ---------------------------------------------------- 选择函数 */
    {
      id: 'def.choicefn',
      cluster: 'order.choice',
      type: 'definition',
      label: '选择函数',
      title: '选择函数（Choice Function）',
      regions: ['set-theory'],
      tags: ['定义', '选择'],
      statement: [
        '设 $F$ 是一个集合族，且 $\\emptyset \\notin F$。',
        '',
        '$f$ 是 $F$ 的**选择函数**，当且仅当',
        '',
        '$f$ 是函数，$\\operatorname{dom} f = F$；',
        '$\\forall X \\in F, f(X) \\in X$。',
        '',
        '即：$f$ 从 $F$ 的每一个成员里各挑出一个元素。',
        '',
        '于是选择公理可以简洁地写成：**每个满足 $\\emptyset \\notin F$ 的集合族 $F$ 都有选择函数**。'
      ].join('\n'),
      notes: '若 $F$ 有限，逐个挑选即可，无需 AC。难点只在无穷族，尤其是不可数族。',
      refs: ['Jech, The Axiom of Choice']
    },

    /* -------------------------------------------------- 空集存在 */
    {
      id: 'thm.empty',
      cluster: 'set.construct',
      type: 'theorem',
      label: '空集存在',
      title: '空集存在且唯一',
      regions: ['set-theory'],
      tags: ['定理'],
      statement: [
        '存在一个不含任何元素的集合：',
        '',
        '$$\\exists B \\forall x ( x \\notin B )$$',
        '',
        '由外延公理，这样的 $B$ 唯一，记作 $\\emptyset$。'
      ].join('\n'),
      notes: '$\\emptyset$ 是 $\\in$ 关系的最小元，也是 $\\subseteq$ 关系的最小元：$\\emptyset \\subseteq A$ 对一切 $A$ 成立。\n\n⭐ 这条定理的意义：**不把 $\\emptyset$ 当原始对象**，只用分离公理模式（对任一集合 $A$ 取 $\\{x \\in A : x \\ne x\\}$）也能把它造出来 —— 所以「空集」在 ZF 里不是一条额外的假设。',
      refs: ['Kunen, Set Theory, I.4']
    },

    /* ------------------------------------------------ 无自属集合 */
    {
      id: 'thm.noself',
      cluster: 'set.zfc',
      type: 'theorem',
      label: '无自属集合',
      title: '任何集合都不属于自身',
      regions: ['set-theory'],
      tags: ['定理', '正则公理'],
      statement: [
        '$$\\forall A ( A \\notin A )$$',
        '',
        '更一般地，正则公理排除了任何有限的 $\\in$循环：',
        '',
        '$$A_0 \\ni  A_1 \\ni  \\cdots \\ni  A_n = A_0$$'
      ].join('\n'),
      notes: '这条定理说明罗素悖论里的「集合 $R = \\{ x : x \\notin x \\}$」不可能存在——否则 $R \\in R$ 与 $R \\notin R$ 同时成立。',
      refs: ['Kunen, Set Theory, I.9']
    },

    /* ------------------------------------------------ 自然数集 */
    {
      id: 'thm.omega',
      cluster: 'set.numbers',
      type: 'theorem',
      label: '自然数集存在',
      title: '自然数集 ω 存在',
      regions: ['set-theory'],
      tags: ['定理', '自然数', '序数'],
      statement: [
        '存在**最小归纳集** $\\omega$：它含有 $\\emptyset$，对 $x \\mapsto x \\cup \\{x\\}$ 封闭，且含于一切归纳集之中：',
        '',
        '$$\\omega = \\{ \\emptyset, \\{\\emptyset\\}, \\{\\emptyset, \\{\\emptyset\\}\\}, \\{\\emptyset, \\{\\emptyset\\}, \\{\\emptyset, \\{\\emptyset\\}\\}\\}, \\ldots  \\}$$',
        '',
        '把 $\\in$ 读作 $<$，$\\langle \\omega , \\in \\rangle$ 就是自然数系 $\\langle \\mathbb{N}, <\\rangle$。'
      ].join('\n'),
      notes: '$\\omega$ 同时也是最小的极限序数。构造它需要无穷公理 + 幂集公理 + 分离公理模式三者合力。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ---------------------------------------------------- 二元并 */
    {
      id: 'thm.binunion',
      cluster: 'set.construct',
      type: 'theorem',
      label: '二元并存在',
      title: '二元并 a ∪ b 存在',
      regions: ['set-theory'],
      tags: ['定理'],
      statement: [
        '任给两个集合，它们的并仍是集合：',
        '',
        '$$\\forall a \\forall b \\exists A \\forall x [ x \\in A \\leftrightarrow  ( x \\in a \\vee  x \\in b ) ]$$',
        '',
        '记作 $a \\cup b$。'
      ].join('\n'),
      notes: '$a \\cup b$ 是包含 $a$ 与 $b$ 的最小集合（$\\subseteq$意义下）。',
      refs: ['Kunen, Set Theory, I.3']
    },

    /* -------------------------------------------------- 笛卡尔积 */
    {
      id: 'thm.product',
      cluster: 'set.construct',
      type: 'theorem',
      label: '笛卡尔积存在',
      title: '笛卡尔积 A × B 存在',
      regions: ['set-theory'],
      tags: ['定理', '有序对'],
      statement: [
        '任给两个集合，全体有序对构成一个集合：',
        '',
        '$$\\forall A \\forall B \\exists C \\forall z [ z \\in C \\leftrightarrow  \\exists a \\in A, \\exists b \\in B, z = (a, b) ]$$',
        '',
        '记作 $A \\times B = \\{ (a, b) : a \\in A, b \\in B \\}$。'
      ].join('\n'),
      notes: '它是「关系」「函数」得以定义为集合的前提：没有 $A \\times B$，就没有 $R \\subseteq A \\times B$ 这个说法。',
      refs: ['Kunen, Set Theory, I.5']
    }
  ],

  edges: [
    {
      id: 'imp.sep-to-empty',
      kind: 'implication',
      sources: ['ax.sep'],
      target: 'thm.empty',
      title: '分离公理模式 ⇒ 空集存在',
      proof: [
        '取任意集合 $a$（一阶逻辑的论域非空，故这样的 $a$ 存在；在 ZF 中也可由无穷公理提供）。',
        '',
        '取公式 $\\varphi (x) :\\equiv ( x \\ne x )$，它是矛盾式。分离公理模式给出集合',
        '',
        '$$B = \\{ x \\in a : x \\ne x \\}$$',
        '',
        '对任意 $x$，$x \\in B \\leftrightarrow ( x \\in a \\wedge x \\ne x )$ 恒为假，故 $B$ 不含任何元素。',
        '由外延公理，这样的 $B$ 唯一，记作 $\\emptyset$。∎'
      ].join('\n'),
      note: '严格地说，「论域非空」是一阶逻辑的约定，不属于 ZF 公理。若不喜欢这个约定，也可以先由无穷公理取出一个集合再分离。'
    },
    {
      id: 'imp.found-to-noself',
      kind: 'implication',
      sources: ['ax.found', 'ax.pair'],
      target: 'thm.noself',
      title: '正则公理 + 配对公理 ⇒ A ∉ A',
      proof: [
        '反设存在集合 $A$ 使 $A \\in A$。由配对公理取 $a = b = A$，得单点集 {A}。',
        '',
        '由外延公理 $\\{A\\} \\ne \\emptyset$（它含有 $A$）。对 {A} 用正则公理：存在 $x \\in \\{A\\}$ 使',
        '',
        '$$x \\cap \\{ A \\} = \\emptyset$$',
        '',
        '而 {A} 只有唯一的元素，故 $x = A$。于是 $A \\cap \\{A\\} = \\emptyset$。',
        '',
        '但由假设 $A \\in A$ 且 $A \\in \\{A\\}$，所以 $A \\in A \\cap \\{A\\}$，与 $A \\cap \\{A\\} = \\emptyset$ 矛盾。故 $A \\notin A$。∎'
      ].join('\n'),
      note: '把同样的论证用在任意有限 $\\in$循环 $A_{0} \\ni A_{1} \\ni \\cdots \\ni A_{n} = A_{0}$ 上，取集合 $\\{A_{0}$ …$A_{n-1}\\}$（可由配对公理反复构造），也能得到矛盾。'
    },
    {
      id: 'imp.inf-to-omega',
      kind: 'implication',
      sources: ['ax.inf', 'ax.power', 'ax.sep'],
      target: 'thm.omega',
      title: '无穷公理 + 幂集公理 + 分离公理模式 ⇒ ω 存在',
      proof: [
        '1. 由无穷公理取一个归纳集 $I$。称 $J \\subseteq I$ 是**归纳的**，若 $\\emptyset \\in J$ 且 $\\forall x (x \\in J \\to x \\cup \\{x\\} \\in J)$。',
        '',
        '2. 由幂集公理，$\\mathcal{P}(I)$ 是集合；再用分离公理模式取',
        '',
        '$$S = \\{ J \\in \\mathcal{P}(I) : J\\text{ 是归纳集} \\}$$',
        '',
        '$S$ 非空（$I \\in S$）。',
        '',
        '3. 再对 $\\mathcal{P}(I)$ 用一次分离公理模式，令',
        '',
        '$$\\omega = \\{ x \\in I : \\forall J ( J \\in S \\to x \\in J ) \\}$$',
        '',
        '即 $\\omega$ 是所有归纳子集的交。',
        '',
        '4. $\\omega$ 是归纳集：$\\emptyset$ 属于每个 $J \\in S$，故 $\\emptyset \\in \\omega$；若 $x \\in \\omega$，则 $x$ 属于每个 $J \\in S$，从而 $x \\cup \\{x\\}$ 属于每个 $J \\in S$，故 $x \\cup \\{x\\} \\in \\omega$。',
        '',
        '5. $\\omega$ 含于一切归纳集：若 $K$ 是归纳集，则 $K \\cap I$ 也是归纳集且 $K \\cap I \\in S$，由 $\\omega$ 的定义 $\\omega \\subseteq K \\cap I \\subseteq K$。',
        '',
        '故 $\\omega$ 是最小归纳集，即自然数集。∎'
      ].join('\n')
    },
    {
      id: 'imp.binunion',
      kind: 'implication',
      sources: ['ax.pair', 'ax.union'],
      target: 'thm.binunion',
      title: '配对公理 + 并集公理 ⇒ 二元并存在',
      proof: [
        '任给 $a$、$b$。',
        '',
        '1. 由配对公理，{ a, b } 是集合。',
        '2. 由并集公理，$\\bigcup \\{ a, b \\}$ 是集合，且',
        '',
        '$$x \\in \\bigcup\\{ a, b \\} \\iff \\exists Y ( Y \\in \\{ a, b \\} \\wedge  x \\in Y ) \\iff ( x \\in a \\vee  x \\in b )$$',
        '',
        '取 $A = \\bigcup \\{ a, b \\}$ 即为所求。∎'
      ].join('\n')
    },
    {
      id: 'imp.product',
      kind: 'implication',
      sources: ['ax.power', 'ax.pair', 'ax.union', 'ax.sep'],
      target: 'thm.product',
      title: '幂集 + 配对 + 并集 + 分离公理模式 ⇒ A × B 存在',
      proof: [
        '任给 $A$、$B$。',
        '',
        '1. 由配对公理与并集公理，$A \\cup B$ 是集合。',
        '',
        '2. 对任意 $a \\in A$、$b \\in B$，Kuratowski 有序对 $(a, b) = \\{\\{a\\}, \\{a, b\\}\\}$。其中 $\\{a\\} \\subseteq A \\cup B$，$\\{a, b\\} \\subseteq A \\cup B$，所以 $\\{a\\}, \\{a, b\\} \\in \\mathcal{P}(A \\cup B)$，进而 $(a, b) \\in \\mathcal{P}(\\mathcal{P}(A \\cup B))$。',
        '',
        '3. 由幂集公理，$\\mathcal{P}(\\mathcal{P}(A \\cup B))$ 是集合。用分离公理模式取',
        '',
        '$$C = \\{ z \\in \\mathcal{P}(\\mathcal{P}(A \\cup B)) : \\exists a \\in A, \\exists b \\in B, z = (a, b) \\}$$',
        '',
        '则 $C$ 恰是 $A \\times B$：一方面每个 (a, b) 都在 $\\mathcal{P}(\\mathcal{P}(A \\cup B))$ 中，另一方面 $z$ 是不在 $A$、$B$ 中任意点处取到的有序对时不会被选进来。∎'
      ].join('\n'),
      note: '这个证明展示了一个典型套路：先用幂集「造一个足够大的容器」，再用分离公理模式「筛出真正想要的东西」。'
    }
  ]
});
