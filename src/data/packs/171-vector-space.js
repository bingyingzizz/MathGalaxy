/* ============================================================================
   内容包 · 向量空间的定义（2026-11-03，T9）
   ----------------------------------------------------------------------------
   病灶（审计 B1）：全库 **65 个节点**的正文写着「设 $V$ 是 $K$ 上的向量空间」，
   而**没有任何节点定义它**。`def.vs` 的 label 是「向量空间的基」，aka 里却有
   「向量空间」—— 于是搜索看来「已经有了」，点进去才发现第一句就是「设 $V$ 是
   $K$ 上的向量空间」。线性代数的第一块砖是空的。

   补法（按项目的内容准则①：每一层由上一层**构造**出来）：
   向量空间 = **阿贝尔群**（加法）+ **域**（标量）+ 一个作用 —— 不用「满足八条
   公理的对象」这种公理刻画式引入。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '向量空间的定义（补 65 处引用的空砖）',

  nodes: [
    {
      id: 'def.vector-space',
      cluster: 'algebra.vectorspace',
      type: 'definition',
      label: '向量空间',
      title: '向量空间 / 线性空间（$K$ 上的）',
      regions: ['algebra'],
      tags: ['定义', '线性代数'],
      statement: [
        '设 $K$ 是**域**。$K$ 上的**向量空间**（也叫**线性空间**）是一个集合 $V$，配两种运算',
        '',
        '$$\\text{加法}: V \\times V \\to V,\\qquad \\text{标量乘法}: K \\times V \\to V,$$',
        '',
        '使得 $(V, +)$ 是**阿贝尔群**，并且对一切 $a, b \\in K$、$u, v \\in V$：',
        '',
        '- $a(u + v) = au + av$（标量对向量和的分配律）；',
        '- $(a + b)v = av + bv$（向量对标量和的分配律）；',
        '- $(ab)v = a(bv)$（标量乘法的结合）；',
        '- $1 \\cdot v = v$（单位律）。',
        '',
        '$V$ 的零元记 $0$，$v$ 的加法逆元记 $-v$；$V$ 的元素叫**向量**，$K$ 的元素叫**标量**。'
      ].join('\n'),
      notes: [
        '⭐ **它是由两块现成的东西拼出来的，不是新公理**：$(V, +)$ 是**阿贝尔群**（`def.group`），$K$ 是**域**（`def.field`），' +
        '两者靠「标量乘法」这条**作用**连起来。所以「向量空间」= 群 + 域 + 一个作用 + 四条混合律。',
        '⭐ **它就是 $R = K$ 时的模**：把域放宽成环，上面四条混合律原样有意义（见「模的张量积」那一族）。' +
        '向量空间比一般模好使，只因为 $K$ 里**每个非零元都可逆** —— 于是「线性无关」能被补成「基」，而模一般没有基。',
        '⚠ **基与维数不在这里**：本节点只说「什么叫向量空间」。线性无关 / 张成 / 基见 `def.vs`，' +
        '维数良定义见 `thm.dimension`，存在性（每个向量空间都有基）见 `thm.vsbasis`。',
        '⚠ 常说的「八条公理」是把加法那四条也写出来；这里把加法那半收进「阿贝尔群」，所以只剩四条要写。',
        '⭐ 常见的三个例子：$K^{n}$（分量运算逐条验证）；$K[X]$ 与 $M_{n}(K)$（加法就是逐项加）；' +
        '函数空间 $\\{f : S \\to K\\}$（点态运算）—— 三个都是「同一套验证」的重复。'
      ].join('\n\n'),
      refs: ['Lang, Linear Algebra', 'Hoffman–Kunze, Linear Algebra, Ch. 2'],
    },
  ],

  edges: [
    /* -------- 两块原料 -------- */
    {
      id: 'dep.field-vectorspace',
      kind: 'definition',
      definition: 'def.field',
      usedBy: 'def.vector-space',
      note: '标量取自**域**：$K$ 要能加、能乘，**非零元还要可逆** —— 整个「线性」理论都要靠这一条' +
        '（没有逆元就解不出 $a v = w$，也就没有「基可以换」）。',
    },
    {
      id: 'dep.group-vectorspace',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.vector-space',
      note: '加法那一半就是**阿贝尔群**：结合、单位元、逆元来自群公理，交换性单独要（$u + v = v + u$）。',
    },
    /* -------- 谁用到了「向量空间」这个定义 -------- */
    {
      id: 'dep.vectorspace-vs',
      kind: 'definition',
      definition: 'def.vector-space',
      usedBy: 'def.vs',
      note: '「基 / 线性无关 / 张成」全部是对向量空间说的：没有 `def.vector-space`，这一整条线是悬空的。',
    },
    {
      id: 'dep.vectorspace-subspace',
      kind: 'definition',
      definition: 'def.vector-space',
      usedBy: 'def.subspace',
      note: '子空间的定义第一句就是「设 $V$ 是域 $K$ 上的向量空间」（原文如此）—— 此前它指向的是一块空地。',
    },
    {
      id: 'dep.vectorspace-linearmap',
      kind: 'definition',
      definition: 'def.vector-space',
      usedBy: 'def.linear-map',
      note: '线性映射是「保持两种运算的映射」，两端都是向量空间。',
    },
    {
      id: 'dep.vectorspace-lineariso',
      kind: 'definition',
      definition: 'def.vector-space',
      usedBy: 'def.linear-isomorphism',
      note: '线性同构 = 双射的线性映射；两端的结构就是向量空间结构。',
    },
  ],
});
