/* ==========================================================================
   内容包 · 闭链 / 上闭链、边缘 / 上边缘
   --------------------------------------------------------------------------
   用户原话：「我发现这里闭链和上闭链没有定义，直接连接到同调了，那个节点里也没有说」

   查证（补前）：
     · `def.cohomology`（同调，L13）的**陈述**直接写 $Z^{n}(K)/B^{n}(K)$，
       而 $Z^{n}$、$B^{n}$ 这两个记号全篇没有任何地方定义 —— 只在正文里出现「闭链」二字；
     · `def.simplicial-homology`（L18）同样用 $Z_{p}/B_{p}$，只说「$z \\in Z_p$ 是代表闭链」；
     · 全库 **没有** `def.cycle` / `def.cocycle` / `def.boundary` / `def.coboundary`；
     · 更糟：`def.cohomology` 的 **aka 里挂了「闭链 / 上边缘」** ⇒ 搜「闭链」第一名是「同调」，
       点进去却找不到闭链是什么。这是「别名指向了不存在的概念」。

   做法：每个概念一个节点，但**链 / 上链两面写在同一节点里** —— 因为它们是同一个对象
   （$\ker d$）在 $\mathbb{Z}$-分次的两个写法，与 `def.cohomology` 本身「同调 / 上同调
   一个节点」的口径一致。⛔ 不要再拆成「闭链」「上闭链」两个节点：内容会一字不差地重复
   （用户刚因为「紧 Hausdorff 正规」与「仿紧 Hausdorff 正规」重复让我删过一个节点）。

   归属：`hom.complex`（复形与同伦，14 → 16 点）。层号从 L11 起（上链复形在 L10）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '闭链与边缘（上闭链与上边缘）',

  nodes: [

    {
      id: 'def.cycle',
      cluster: 'hom.complex',
      type: 'definition',
      label: '闭链',
      title: '闭链与上闭链：被微分杀掉的元素',
      regions: ['homology'],
      tags: ['定义', '同调代数', '闭链', '上闭链', '复形'],
      statement: [
        '**在做什么**：把同调公式 $H^{n} = Z^{n}/B^{n}$ 里那个分子说清楚。闭链就是**被微分杀掉**的元素 —— 整门同调代数都在问「杀掉的里面，有多少是真的来了、有多少是绕了远路」。',
        '',
        '设 $K$ 是加法范畴 $\\mathcal{C}$ 中的复形，微分 $d^{n} : K^{n} \\to K^{n+1}$（`def.cochain-complex`）。',
        '',
        '**上链情形**：第 $n$ 阶**上闭链群**（cocycles）是',
        '',
        '$$Z^{n}(K) := \\ker d^{n} = \\{\\, x \\in K^{n} : d^{n}x = 0 \\,\\} ;$$',
        '',
        '它的元素叫**上闭链**（cocycle）。',
        '',
        '**链情形**（箭头反向，$d_{n} : K_{n} \\to K_{n-1}$）：第 $n$ 阶**闭链群**（cycles）是',
        '',
        '$$Z_{n}(K) := \\ker d_{n} ,$$',
        '',
        '它的元素叫**闭链**（cycle）。',
        '',
        '⚠️ 两个名字指的是**同一个东西**（$d$ 的核），只是复形的分次方向不同：上链复形的核记 $Z^{n}$、链复形的核记 $Z_{n}$。'
      ].join('\n'),
      notes: [
        '⭐ **「闭」这个字是拓扑来的**：单形复形里 $\\partial z = 0$ 的链是「没有边界的链」—— 直觉上就是一串闭起来的单形（一个圈、一个球面）。de Rham 复形里 $d\\omega = 0$ 的形式就叫**闭形式**，完全同一条定义。所以「闭链 / 闭形式 / 上闭链」是一句话的三种说法。',
        '⚠️ **字母 $Z$ 的来源**：德语 *Zyklus*（循环）。$B$ 来自 *boundary*（边缘）—— 见 `def.boundary`。老文献里也写 $C^{n}$（cocycle）与 $B^{n}$，读到时对一下记号。',
        '⚠️ **$Z^{n}$ 是 $K^{n}$ 的子对象**（核），但它**不是**复形的子复形：把 $d$ 限制到 $Z^{n}$ 上得零映射，于是 $Z$ 自带一个「处处为零」的复形结构。用它的时侯要分清是在说子对象还是子复形。',
        '⭐ **同调就是量「闭链里有多少不是边缘」**：$H^{n} = Z^{n}/B^{n}$（`def.cohomology`）。所以 $H^{n} = 0 \\iff$ 每个闭链都是边缘 $\\iff$ 复形在 $n$ 处正合。这是把「同调为 0」翻译成「闭 = 边缘」的唯一桥梁。'
      ].join('\n\n'),
      refs: [
        'Le Stum, An introduction to condensed mathematics（⚠️ 章节未核实，只记书名）· 复形与同调',
        'Weibel, An Introduction to Homological Algebra（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.boundary',
      cluster: 'hom.complex',
      type: 'definition',
      label: '边缘',
      title: '边缘与上边缘：被微分打出来的元素',
      regions: ['homology'],
      tags: ['定义', '同调代数', '边缘', '上边缘', '复形'],
      statement: [
        '**在做什么**：把同调公式 $H^{n} = Z^{n}/B^{n}$ 里那个分母说清楚。边缘是**从上一层打过来**的元素 —— 它们是「平凡的闭链」，同调要做的就是把它们除掉。',
        '',
        '设 $K$ 是加法范畴 $\\mathcal{C}$ 中的复形，微分 $d^{n} : K^{n} \\to K^{n+1}$。',
        '',
        '**上链情形**：第 $n$ 阶**上边缘群**（coboundaries）是',
        '',
        '$$B^{n}(K) := \\operatorname{im} d^{n-1} = \\{\\, d^{n-1}x : x \\in K^{n-1} \\,\\} ,$$',
        '',
        '它的元素叫**上边缘**（coboundary）。',
        '',
        '**链情形**：第 $n$ 阶**边缘群**（boundaries）是',
        '',
        '$$B_{n}(K) := \\operatorname{im} d_{n+1} ,$$',
        '',
        '它的元素叫**边缘**（boundary）。',
        '',
        '**为什么 $B \\subseteq Z$**：由复形的定义 $d^{n} \\circ d^{n-1} = 0$，对 $x = d^{n-1}y$ 有 $d^{n}x = d^{n}d^{n-1}y = 0$，所以每个上边缘都是上闭链。因此商 $Z^{n}/B^{n}$ 有意义。'
      ].join('\n'),
      notes: [
        '⭐ **$d^{2} = 0$ 的全部内容就是这一条**：$B^{n} \\subseteq Z^{n}$。复形的公理（$d\\circ d = 0$）没有别的用处 —— 它存在的唯一理由就是让「闭链 / 边缘」这个商能取。所以复形 = 「一个能让同调有定义的装置」。',
        '⚠️ **「边缘」与拓扑的「边界」撞名**：流形的边界 $\\partial M$、单形复形的边界算子 $\\partial_{n}$ 里的「边界」在复形语言里就是这里的边缘（$\\partial_{n}$ 就是 $d_{n}$）。但**一般范畴里没有「点集边界」这个概念**，只有像。读「边缘」时一律按 $\\operatorname{im} d$ 理解。',
        '⚠️ **记号**：$B^{n}$（boundary）、$\\operatorname{im} d^{n-1}$、$d(K^{n-1})$ 三种都在用。$B$ 与 $Z$ 一起出现时注意台阶：$B^{n} = \\operatorname{im} d^{n-1}$ 比 $Z^{n} = \\ker d^{n}$ **低一阶的微分**，这个「错位」是同调代数里所有符号错误的来源。',
        '⭐ **de Rham 版**：$d\\omega = 0$ 的叫闭形式（= 闭链），$\\omega = d\\eta$ 的叫**恰当形式**（= 边缘）。所以「闭形式恰当」$\\iff$ $H^{1} = 0$ 的那部分 —— 这正是 Poincaré 引理（`lem.poincare-lemma`）的内容。'
      ].join('\n\n'),
      refs: [
        'Le Stum, An introduction to condensed mathematics（⚠️ 章节未核实，只记书名）· 复形与同调',
        'Weibel, An Introduction to Homological Algebra（⚠️ 章节未核实，只记书名）'
      ]
    }
  ],

  edges: [
    { id: 'dep.cyc-cocomplex', kind: 'definition',
      definition: 'def.cochain-complex', usedBy: 'def.cycle',
      note: '闭链是复形的微分的核 —— 先有复形与 $d$。' },
    { id: 'dep.cyc-kernel', kind: 'definition',
      definition: 'def.kernel-cokernel', usedBy: 'def.cycle',
      note: '$Z^{n} = \\ker d^{n}$ 用的是加法范畴里的核。' },

    { id: 'dep.bnd-cocomplex', kind: 'definition',
      definition: 'def.cochain-complex', usedBy: 'def.boundary',
      note: '边缘是微分的像 —— 同样先有复形。' },
    { id: 'dep.bnd-image', kind: 'definition',
      definition: 'def.image', usedBy: 'def.boundary',
      note: '$B^{n} = \\operatorname{im} d^{n-1}$ 用的是像。' },

    { id: 'dep.cyc-hom', kind: 'definition',
      definition: 'def.cycle', usedBy: 'def.cohomology',
      note: '同调的定义 $H^{n} = Z^{n}/B^{n}$ 的分子就是闭链。' },
    { id: 'dep.bnd-hom', kind: 'definition',
      definition: 'def.boundary', usedBy: 'def.cohomology',
      note: '分母是边缘。' },

    { id: 'dep.cyc-simplicial', kind: 'definition',
      definition: 'def.cycle', usedBy: 'def.simplicial-homology',
      note: '单纯同调 $H_{p} = Z_{p}/B_{p}$ 里的 $Z_{p}$ 就是闭链群。' },
    { id: 'dep.bnd-simplicial', kind: 'definition',
      definition: 'def.boundary', usedBy: 'def.simplicial-homology',
      note: '同一个公式里的 $B_{p}$ 是边缘群。' },

    { id: 'dep.cyc-singular', kind: 'definition',
      definition: 'def.cycle', usedBy: 'def.singular-homology',
      note: '奇异同调同样取闭链模边缘。' },
    { id: 'dep.bnd-singular', kind: 'definition',
      definition: 'def.boundary', usedBy: 'def.singular-homology',
      note: '奇异同调里的边缘群。' },

    { id: 'dep.cyc-derham', kind: 'definition',
      definition: 'def.cycle', usedBy: 'def.de-rham-complex',
      note: 'de Rham 复形里的闭链就是**闭形式**（$d\\omega = 0$）。' },
    { id: 'dep.bnd-derham', kind: 'definition',
      definition: 'def.boundary', usedBy: 'def.de-rham-complex',
      note: 'de Rham 复形里的边缘就是**恰当形式**（$\\omega = d\\eta$）。' }
  ]
});
