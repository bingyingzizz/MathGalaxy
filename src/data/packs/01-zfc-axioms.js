/* ==========================================================================
   内容包 · ZFC 公理系统（9 条）
   --------------------------------------------------------------------------
   一个「包」= 若干节点 + 若干连线。可以自由增删、拆分成更多文件。
   节点字段说明见 README.md「怎么加内容」一节。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'ZFC 公理系统',
  nodes: [

    /* ---------------------------------------------------------- 外延 */
    {
      id: 'ax.ext',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '外延公理',
      title: '外延公理（Axiom of Extensionality）',
      regions: ['set-theory'],
      tags: ['ZFC', '集合相等'],
      statement: [
        '集合由它的元素唯一决定：',
        '',
        '$$\\forall A \\forall B [ \\forall x ( x \\in A \\leftrightarrow  x \\in B ) \\to A = B ]$$',
        '',
        '反方向（$A = B \\to$ 元素完全相同）由等词逻辑自动成立，所以常写成 $\\leftrightarrow$。',
        '这条公理保证了「用条件刻画集合」时结果是唯一的，因此 $\\{ x \\in A : \\varphi (x) \\}$ 这种写法不会产生歧义。'
      ].join('\n'),
      notes: [
        '它是「集合」这个名字的全部含义：一个集合 $=$ 一个外延（一堆元素），与「怎么描述它」无关。',
        '去掉它，就可以有元素完全相同却彼此不同的对象（例如带原子 ur-element 的集合论）。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.2', 'Jech, Set Theory, 1.2']
    },

    /* ---------------------------------------------------------- 分离 */
    {
      id: 'ax.sep',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '分离公理模式',
      title: '分离公理模式（Axiom Schema of Separation）',
      regions: ['set-theory'],
      tags: ['ZFC', '子集', '公理模式'],
      statement: [
        '对每个公式 $\\varphi (x, p)$（其中 $B$ 不出现），下面是一条公理：',
        '',
        '$$\\forall p \\forall A \\exists B \\forall x [ x \\in B \\leftrightarrow  ( x \\in A \\wedge  \\varphi(x, p) ) ]$$',
        '',
        '由外延公理，这样的 $B$ 唯一，记作 $B = \\{ x \\in A : \\varphi (x, p) \\}$。俗称「子集公理」。'
      ].join('\n'),
      notes: [
        '它是**公理模式**而不是单条公理：每取一个公式 $\\varphi$ 就得到一条公理，ZFC 因此有无穷多条公理。',
        '限制 `$x \\in A$` 是关键——不能写成 $\\{ x : x \\notin x \\}$，否则就是罗素悖论。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.4']
    },

    /* ---------------------------------------------------------- 配对 */
    {
      id: 'ax.pair',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '配对公理',
      title: '配对公理（Axiom of Pairing）',
      regions: ['set-theory'],
      tags: ['ZFC'],
      statement: [
        '任给两个集合，可以打包成「只含这两个元素的集合」：',
        '',
        '$$\\forall a \\forall b \\exists A \\forall x [ x \\in A \\leftrightarrow  ( x = a \\vee  x = b ) ]$$',
        '',
        '由外延公理 $A$ 唯一，记作 { a, b }（无序对）。取 $a = b$ 即得单点集 { a }。'
      ].join('\n'),
      notes: '有了配对公理，「{a, b}」才是集合；它也是构造有序对 $(a,b) = \\{\\{a\\},\\{a,b\\}\\}$ 的第一步。',
      refs: ['Kunen, Set Theory, I.3']
    },

    /* ---------------------------------------------------------- 并集 */
    {
      id: 'ax.union',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '并集公理',
      title: '并集公理（Axiom of Union）',
      regions: ['set-theory'],
      tags: ['ZFC'],
      statement: [
        '一个集合族的所有成员的元素，仍然构成一个集合：',
        '',
        '$$\\forall F \\exists A \\forall x [ x \\in A \\leftrightarrow  \\exists Y ( Y \\in F \\wedge  x \\in Y ) ]$$',
        '',
        '记作 $\\bigcup F$。配合配对公理可得二元并 $a \\cup b = \\bigcup \\{ a, b \\}$。'
      ].join('\n'),
      notes: '注意 $\\bigcup F$ 是「$F$ 中元素的元素」，不是 $F$ 自身；$\\bigcup \\{a,b\\} = a \\cup b$ 正是我们要的二元并。',
      refs: ['Kunen, Set Theory, I.3']
    },

    /* ---------------------------------------------------------- 幂集 */
    {
      id: 'ax.power',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '幂集公理',
      title: '幂集公理（Axiom of Power Set）',
      regions: ['set-theory'],
      tags: ['ZFC', '子集'],
      statement: [
        '一个集合的所有子集构成一个集合：',
        '',
        '$$\\forall A \\exists P \\forall x [ x \\in P \\leftrightarrow  x \\subseteq A ]$$',
        '',
        '记作 $\\mathcal{P}(A)$（或 P(A)）。它把「$A$ 的所有子集」这件事本身变成一个集合 —— 幂集是「造更大的集合」的基本手段。'
      ].join('\n'),
      notes: '它是笛卡尔积 $A \\times B$ 存在性的关键：{{a},{a,b}} 落在 $\\mathcal{P}(\\mathcal{P}(A \\cup B))$ 里。',
      refs: ['Kunen, Set Theory, I.3']
    },

    /* ---------------------------------------------------------- 无穷 */
    {
      id: 'ax.inf',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '无穷公理',
      title: '无穷公理（Axiom of Infinity）',
      regions: ['set-theory'],
      tags: ['ZFC', '归纳集', '自然数'],
      statement: [
        '存在一个「归纳集」——含有 $\\emptyset$ 且对后继封闭的集合：',
        '',
        '$$\\exists I [ \\emptyset \\in I \\wedge  \\forall x ( x \\in I \\to x \\cup \\{ x \\} \\in I ) ]$$',
        '',
        '公理本身只要求 $I$ **非空**且对后继封闭；写成 $\\emptyset \\in I$ 只是为了好看，$\\emptyset$ 是原始对象（见「空集」）。',
        '这条公理宣告了无穷集合的存在，是从中构造自然数集 $\\omega$ 的唯一来源。'
      ].join('\n'),
      notes: '没有它，$V_\\omega$ 就是一个模型，所有集合都有限，算术只能在有界范围内进行。\n\n记号方面：$x \\cup \\{x\\}$ 由配对公理与并集公理写出来，它们与这条公理、以及 $\\emptyset$，都在同一层地基上 —— 地基内部的相互引用不画成依赖边。',
      refs: ['Kunen, Set Theory, I.5']
    },

    /* ---------------------------------------------------------- 替换 */
    {
      id: 'ax.repl',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '替换公理模式',
      title: '替换公理模式（Axiom Schema of Replacement）',
      regions: ['set-theory'],
      tags: ['ZFC', '公理模式', '函数'],
      statement: [
        '若一个公式定义了「函数关系」，则任一集合的像仍是集合。对每个公式 $\\varphi (x, y, p)$（其中 $B$ 不出现）：',
        '',
        '$$\\forall p [ \\forall x\\forall y\\forall z ( \\varphi(x,y,p) \\wedge  \\varphi(x,z,p) \\to y = z ) \\to \\forall A \\exists B \\forall y ( y \\in B \\leftrightarrow  \\exists x \\in A, \\varphi(x,y,p) ) ]$$',
        '',
        '它保证了「替换」不会跑出集合论宇宙：像 $B$ 也是集合。'
      ].join('\n'),
      notes: '替换公理模式是 $Z$ 与 ZF 的分水岭。由它（加上任取一个集合 $A$）可以推出分离公理模式。',
      refs: ['Kunen, Set Theory, I.6']
    },

    /* ---------------------------------------------------------- 正则 */
    {
      id: 'ax.found',
      cluster: 'set.zfc',
      type: 'axiom',
      label: '正则公理',
      title: '正则公理 / 基础公理（Axiom of Foundation）',
      regions: ['set-theory'],
      tags: ['ZFC', '良基', '∈-链'],
      statement: [
        '每个非空集合都有「$\\in$极小元」：',
        '',
        '$$\\forall A [ A \\ne \\emptyset \\to \\exists x ( x \\in A \\wedge  x \\cap A = \\emptyset ) ]$$',
        '',
        '等价说法：$\\in$ 是良基关系，不存在无穷递减链',
        '',
        '$$x_0 \\ni  x_1 \\ni  x_2 \\ni  \\cdots$$'
      ].join('\n'),
      notes: [
        '它排除了 $A \\in A$ 这类循环集合，也排除了「集合的无穷下降」。',
        '正则公理等价于「集合论宇宙 $V$ 是累积层级 $\\bigcup_{\\alpha} V_\\alpha$」，这条公理让 $\\in$归纳法成为合法的证明方法。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.9']
    },

    /* ---------------------------------------------------------- 选择 */
    {
      id: 'ax.choice',
      cluster: 'order.choice',
      type: 'axiom',
      label: '选择公理',
      title: '选择公理（Axiom of Choice, AC）',
      regions: ['set-theory'],
      tags: ['ZFC', '选择', '等价命题'],
      statement: [
        '任意一族非空集合都可以「同时」各挑出一个元素。写成选择函数的形式：',
        '',
        '$$\\forall F [ ( \\forall X \\in F, X \\ne \\emptyset ) \\to \\exists f ( f\\text{ 是函数} \\wedge  \\operatorname{dom} f = F \\wedge  \\forall X \\in F, f(X) \\in X ) ]$$',
        '',
        '另一种常见形式（两两不交形式）：若 $F$ 是两两不交的非空集合族，则存在集合 $C$，使对每个 $X \\in F$ 都有 $|C \\cap X| = 1$。',
        '',
        '选择函数 $f$ 就是「同时挑元素」的工具；AC 断言这种同时挑选永远做得到。'
      ].join('\n'),
      notes: [
        'AC 与 ZF 独立：Gödel (1938) 证明 $Con(ZF) \\to Con(ZF + AC)$，Cohen (1963) 证明 $Con(ZF) \\to Con(ZF + \\neg AC)$。',
        '它是本星系里大量命题的枢纽——佐恩引理、良序定理、Hausdorff 极大原理、Tukey 引理都与它等价。',
        '有限个非空集合可以逐个挑选，这正是 AC 只在无穷情形才显出力量的原因。'
      ].join('\n\n'),
      refs: ['Jech, The Axiom of Choice', 'Kunen, Set Theory, I.12']
    }
  ],

  edges: [
    {
      id: 'imp.repl-to-sep',
      kind: 'implication',
      sources: ['ax.repl'],
      target: 'ax.sep',
      title: '替换公理模式 $\\implies$ 分离公理模式',
      proof: [
        '设 $\\varphi (x, p)$ 是不含 $B$ 的公式，$A$ 是任意集合。取公式',
        '',
        '$$\\psi(x, y, p) :\\equiv  ( x = y \\wedge  \\varphi(x, p) )$$',
        '',
        '对任意 $x$，至多只有一个 $y$ 使 $\\psi (x, y, p)$ 成立（因为 $x = y$ 已经确定了 $y$）。于是替换公理模式给出一个集合',
        '',
        '$$B = \\{ y : \\exists x \\in A, \\psi(x, y, p) \\} = \\{ x \\in A : \\varphi(x, p) \\}$$',
        '',
        '这正是分离公理模式所要的 $B$（外延公理保证唯一）。∎'
      ].join('\n'),
      note: '所以 ZF 里其实只需要「替换 + 一个集合存在」就够了，教材仍保留分离公理是为了方便陈述与使用。'
    }
  ]
});
