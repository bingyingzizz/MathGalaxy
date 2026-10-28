/* ============================================================================
   内容包 · 代数拓扑补洞：链同伦与同伦不变性（棱柱算子）

   为什么补这一包：140/141 那批里「同伦不变性」只写在 `def.singular-homology` 的陈述里，
   图上没有证明；而 `thm.sphere-homology` 的归纳链要用它 —— 这是那条链上唯一缺的一环。
   子 agent 交付时自己把它标成了「最薄弱的一环」，这里补上。

   两个节点：
     def.chain-homotopy      链同伦（∂P + P∂ = g − f）与「有链同伦 $\\implies$ 同伦上的同态相等」
     thm.homotopy-invariance 同伦不变性（棱柱算子把 F 变成一条链同伦）
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '代数拓扑补洞：链同伦与同伦不变性',

  nodes: [
    {
      id: 'def.chain-homotopy',
      type: 'definition',
      label: '链同伦',
      title: '链同伦：两个链映射之间的「代数同伦」',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '同调', '链同伦', '链复形'],
      statement: [
        '设 $C = \\{\\, C_{n}, \\partial_{n} \\,\\}$、$D = \\{\\, D_{n}, \\partial_{n}\' \\,\\}$ 是两个链复形，' +
          '$f, g : C \\to D$ 是链映射（即 $\\partial\' f = f \\partial$）。',
        '',
        '$f$ 与 $g$ 之间的一个**链同伦**是一族同态 $P_{n} : C_{n} \\to D_{n+1}$，满足',
        '',
        '$$\\partial_{n+1}\' P_{n} + P_{n-1} \\partial_{n} = g_{n} - f_{n}.$$',
        '',
        '**基本事实**：若存在这样的 $P$，则 $f$ 与 $g$ 在同调上诱导**同一个**同态，即 ' +
          '$f_{*} = g_{*} : H_{n}(C) \\to H_{n}(D)$。',
      ].join('\n'),
      notes: [
        '**为什么「链同伦 $\\implies$ 同调上相等」**：设 $z \\in C_{n}$ 是闭链（$\\partial z = 0$）。则',
        '',
        '$$g(z) - f(z) = \\partial\' P(z) + P\\partial(z) = \\partial\' P(z),$$',
        '',
        '即 $g(z) - f(z)$ 是 $D$ 中的**边缘**，于是它代表的同调类是 $0$。也就是说 ' +
          '$[g(z)] = [f(z)]$，对每个闭链成立 —— 正是 $f_{*} = g_{*}$。∎',
        '',
        '⭐ **它是「同伦」在代数侧的翻译**：拓扑里的同伦是「两映射之间的一条连续形变」，' +
          '链复形里没有空间可形变，于是把形变换成一个**升一次**的同态 $P$。' +
          '$\\partial P + P\\partial$ 这个组合恰好是「链复形的同伦」应该有的样子：' +
          '它与 $\\partial$ 反交换，于是把闭链送到边缘。',
        '',
        '⚠️ 链同伦不是等价关系：$f$ 与 $g$ 链同伦、$g$ 与 $h$ 链同伦不能推出 $f$ 与 $h$ 链同伦' +
          '（$P + Q$ 差一个符号，要对上得调整）。但「存在链同伦」在链映射的集合上确实给出对称的' +
          '关系，同伦范畴就是把它们形式地变成同构。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1（chain homotopy / 链映射与同伦）',
        'Hatcher, Algebraic Topology, Ch. 2.1 · Chain complexes and homology',
      ],
    },
    {
      id: 'thm.homotopy-invariance',
      type: 'theorem',
      label: '同伦不变性',
      title: '同伦不变性：$f \\simeq g$ 蕴含 $f_{*} = g_{*}$（棱柱算子）',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '同调', '同伦不变性', '棱柱算子'],
      statement: [
        '设 $X, Y$ 是拓扑空间，$f, g : X \\to Y$ 连续且**同伦**：存在连续 $F : X \\times [0,1] \\to Y$ ' +
          '使 $F(\\cdot, 0) = f$、$F(\\cdot, 1) = g$。则对每个 $n$，',
        '',
        '$$f_{*} = g_{*} : H_{n}(X) \\to H_{n}(Y).$$',
        '',
        '推论：同伦等价的空间有同构的同调群（同调是**同伦不变量**）。',
      ].join('\n'),
      notes: [
        '**证明（棱柱算子）**：只需造一条链同伦（`def.chain-homotopy`）' +
          '$P_{n} : S_{n}(X) \\to S_{n+1}(Y)$，使 $\\partial P + P\\partial = g_{\\#} - f_{\\#}$。',
        '',
        '**几何图像**：一个奇异单形 $\\sigma : \\Delta^{n} \\to X$ 与 $F$ 一起给出「棱柱」' +
          '$F \\circ (\\sigma \\times \\mathrm{id}) : \\Delta^{n} \\times [0,1] \\to Y$。' +
          '棱柱有 $n+2$ 个面：$n+1$ 个「侧面」加底（$f \\circ \\sigma$）和顶（$g \\circ \\sigma$）。' +
          '把 $\\Delta^{n} \\times [0,1]$ 三角剖分成 $n+1$ 个 $\\Delta^{n+1}$，按定向取侧面之和：',
        '',
        '$$P_{n}(\\sigma) := \\sum_{i=0}^{n} (-1)^{i}\\, F \\circ (\\sigma \\times \\mathrm{id})' +
          ' \\circ \\tau_{i},$$',
        '',
        '其中 $\\tau_{i} := [v_{0}, \\ldots, v_{i}, w_{i}, \\ldots, w_{n}]$ 是棱柱剖分出的第 $i$ 块。',
        '',
        '**关键计算**：对 $P$ 取边缘 $\\partial$，每个「内部面」被相邻两个三角块各算一次、' +
          '定向相反 $\\implies$ 抵消；剩下「底 + 顶 + 一圈侧面」。而那一圈侧面恰好是 $P(\\partial\\sigma)$' +
          '（因为 $\\partial\\sigma$ 的单形正好对应棱柱的侧面）。于是',
        '',
        '$$\\partial P(\\sigma) = g \\circ \\sigma - f \\circ \\sigma + P(\\partial \\sigma),$$',
        '',
        '即 $\\partial P + P\\partial = g_{\\#} - f_{\\#}$。由 `def.chain-homotopy`，' +
          '$f$ 与 $g$ 在同调上诱导同一同态。∎',
        '',
        '⭐ **这一步正是整条链缺的那环**：`thm.sphere-homology` 的归纳法（把 $S^{n}$ 拆成两个半球）' +
          '要用「两个半球各自可缩 $\\implies$ 它们的恒等映射与常值映射在同调上相同」。没有这条，' +
          '那个归纳只能算「算出来是 0 和 $\\mathbb{Z}$」，不能说「所以球面同调就是这样」。',
        '',
        '⚠️ 本节点写的是**完整构造 + 关键抵消**；那一步「内部面两两抵消」在书上是逐个下标验算的，' +
          '这里给的是可复现的骨架（每个面的定向按 $(-1)^{i}$ 交替，抵消的机制写清楚了）。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1（the prism operator / homotopy invariance）',
        'Hatcher, Algebraic Topology, Ch. 2.1 · Homotopy invariance（Theorem 2.10）',
        'Spanier, Algebraic Topology, Ch. 4 · Homology theory',
      ],
    },
  ],

  edges: [
    { kind: 'implication', sources: ['def.chain-group'], target: 'def.chain-homotopy',
      title: '链同伦是链映射之间「升一次」的同态',
      proof: [
        '由 `def.chain-group`，链群是分次阿贝尔群 $C_{n}$ 连同边缘算子 $\\partial_{n} : C_{n} \\to C_{n-1}$，' +
          '满足 $\\partial^{2} = 0$。',
        '',
        '链同伦 $P = \\{\\, P_{n} : C_{n} \\to D_{n+1} \\,\\}$ 是「抬高一阶」的同态族，' +
          '条件 $\\partial\' P + P \\partial = g - f$ 是一族同态的等式，逐个次数校验即可：' +
          '第 $n$ 次两边都是 $C_{n} \\to D_{n}$ 的同态。',
        '',
        '**同调层面为什么有效**：$\\partial$ 取闭链到 $0$，所以对闭链 $z$ 有 ' +
          '$g(z) - f(z) = \\partial P(z)$ 是边缘，同调类为 $0$。∎',
      ].join('\n'),
      note: '链同伦是「同伦」在纯代数侧的对应物：没有空间可形变，就形变映射本身。' },

    { kind: 'implication', sources: ['def.singular-homology'], target: 'thm.homotopy-invariance',
      title: '奇异链上造棱柱算子 $P_{n}$',
      proof: [
        '设 $F : X \\times [0,1] \\to Y$ 给出 $f \\simeq g$。对每个奇异 $n$-单形 ' +
          '$\\sigma : \\Delta^{n} \\to X$，构造 $\\Delta^{n} \\times [0,1]$ 的三角剖分：' +
          '底顶点 $v_{0}, \\ldots, v_{n}$、顶顶点 $w_{0}, \\ldots, w_{n}$，第 $i$ 块是 ' +
          '$[v_{0}, \\ldots, v_{i}, w_{i}, \\ldots, w_{n}]$。',
        '',
        '令 $P_{n}(\\sigma)$ 为这 $n+1$ 块在 $F \\circ (\\sigma \\times \\mathrm{id})$ 下的像的交替和' +
          '（系数 $(-1)^{i}$），线性延拓到整个链群。',
        '',
        '**校验 $\\partial P + P\\partial = g_{\\#} - f_{\\#}$**：取边缘后，剖分内部的面对' +
          '被两块共享且定向相反，相消；剩下底面（给 $f \\circ \\sigma$）、顶面（给 $g \\circ \\sigma$）' +
          '与侧面。侧面之和正是 $P_{n-1}(\\partial \\sigma)$（因为 $\\partial\\sigma$ 的每个面' +
          '对应棱柱的一个侧面）。于是恰好得到 $g_{\\#} - f_{\\#}$。∎',
      ].join('\n'),
      note: '棱柱算子把「连续形变」翻译成「链同伦」——这就是同伦不变性的全部内容。' },

    { kind: 'implication', sources: ['def.homotopy'], target: 'thm.homotopy-invariance',
      title: '同伦的定义就是这里要用的那条形变',
      proof: [
        '由 `def.homotopy`，$f \\simeq g$ 指存在连续 $F : X \\times [0,1] \\to Y$ 使 ' +
          '$F(\\cdot, 0) = f$、$F(\\cdot, 1) = g$。',
        '',
        '这条 $F$ 同时是「棱柱」的原料：$F \\circ (\\sigma \\times \\mathrm{id})$ 把 ' +
          '$\\Delta^{n} \\times [0,1]$ 送进 $Y$，于是任何能把乘积剖分成单形的构造都能用。' +
          '（这正是为什么同调要比同伦群好算：同伦群没有这种「线性」的搬运。）∎',
      ].join('\n'),
      note: '同伦给形变，链同伦给代数：$F$ 就是那根桥。' },

    { kind: 'implication', sources: ['thm.homotopy-invariance'], target: 'thm.sphere-homology',
      title: '球面同调的归纳要用「可缩 $\\implies$ 同调平凡」',
      proof: [
        '`thm.sphere-homology` 的证明把 $S^{n}$ 拆成两个闭半球 $D^{n}_{+} \\cup D^{n}_{-}$，' +
          '再用对 $(S^{n}, D^{n}_{+})$ 的长正合列与归纳。',
        '',
        '**缺的那一步**：两个半球各自可缩，因此它们的恒等映射与「常值映射」同伦；' +
          '由 `thm.homotopy-invariance`，恒等诱导的同态等于常值映射诱导的同态，' +
          '而后者经过 $\\tilde H_{k}(\\text{pt}) = 0$ 分解，故 $\\tilde H_{k}(D^{n}) = 0$。',
        '',
        '没有这一条，归纳只能算出「某个群是 0」，却说不出「为什么半球没有同调」。∎',
      ].join('\n'),
      note: '这条补上了子 agent 交付时自己标注的「最薄弱一环」。' },
  ],
});
