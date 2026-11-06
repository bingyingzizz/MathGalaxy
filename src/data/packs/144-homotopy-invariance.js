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
          '它与 $\\partial$ **交换**（$\\partial T = T\\partial$，所以 $T$ 是链映射），于是把闭链送到边缘；反交换的是 $P$ 与 $\\partial$ 的逐项关系（$\\partial P = T - P\\partial$）。',
        '',
        '✅ 链同伦**是**等价关系：自反取 $0$、对称取 $-P$、传递取 $P + Q$（$\\partial(P+Q) + (P+Q)\\partial = (g - f) + (h - g) = h - f$）。' +
          '所以「链同伦类」才是同伦范畴里真正的态射；' +
          '把链同伦类形式地当作同构，就得到同伦范畴。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1（chain homotopy / 链映射与同伦）',
        'Hatcher, Algebraic Topology, Ch. 2.1 · Chain complexes and homology',
      ],
    },
    {
      id: 'thm.homotopy-invariance',
      cluster: 'topology.homology',
      type: 'theorem',
      label: '同伦不变性',
      title: '同伦不变性：$f \\simeq g$ 蕴含 $f_{*} = g_{*}$（棱柱算子）',
      regions: ['topology'],
      tags: ['代数拓扑', '同调', '同伦不变性', '棱柱算子'],
      statement: [
        '设 $X, Y$ 是拓扑空间，$f, g : X \\to Y$ 连续且**同伦**：存在连续 $F : X \\times [0,1] \\to Y$ 使 $F(\\cdot, 0) = f$、$F(\\cdot, 1) = g$。则对每个 $n$，',
        '',
        '$$f_{*} = g_{*} : H_{n}(X) \\to H_{n}(Y).$$',
        '',
        '推论：同伦等价的空间有同构的同调群（同调是**同伦不变量**）。'
      ].join('\n'),
      notes: [
        '**证明**：只需造一族同态 $P_{n} : S_{n}(X) \\to S_{n+1}(Y)$，使 $\\partial P_{n} + P_{n-1}\\partial = g_{\\#} - f_{\\#}$；再引用 `def.chain-homotopy` 即得 $f_{*} = g_{*}$。下面把 $P_{n}$ 造出来并验证这条等式。',
        '**棱柱与剖分。** 记 $\\Delta^{n}$ 的顶点为 $e_{0}, \\ldots, e_{n}$，把 $\\Delta^{n} \\times [0,1]$ 的顶点写成 $v_{j} := (e_{j}, 0)$、$w_{j} := (e_{j}, 1)$。把棱柱三角剖分成 $n+1$ 个 $(n+1)$-单纯形：对 $i = 0, \\ldots, n$，令 $\\tau_{i} : \\Delta^{n+1} \\to \\Delta^{n} \\times [0,1]$ 为把标准顶点依次送到',
        '$$[v_{0}, \\ldots, v_{i}, w_{i}, \\ldots, w_{n}]$$',
        '的仿射映射（第 $i$ 块）。对生成元 $\\sigma : \\Delta^{n} \\to X$ 定义',
        '$$P_{n}(\\sigma) := \\sum_{i=0}^{n} (-1)^{i}\\, F \\circ (\\sigma \\times \\mathrm{id}) \\circ \\tau_{i},$$',
        '再线性延拓到 $S_{n}(X)$。',
        '**边界计算。** 把 $\\tau_{i}$ 的顶点依次记为 $u_{0}, \\ldots, u_{n+1}$（即 $v_{0}, \\ldots, v_{i}, w_{i}, \\ldots, w_{n}$）。在 $\\partial\\tau_{i}$ 中，删去第 $r$ 个顶点的面带符号 $(-1)^{r}$。逐项看 $\\partial P_{n}(\\sigma)$：',
        '① **内部面。** 从 $\\tau_{i}$ 删去 $w_{i}$（位置 $i+1$，符号 $(-1)^{i+1}$）与从 $\\tau_{i+1}$ 删去 $v_{i+1}$（位置 $i+1$，符号 $(-1)^{i+1}$）得到同一个面 $[v_{0}, \\ldots, v_{i}, w_{i+1}, \\ldots, w_{n}]$。它在 $\\partial P_{n}(\\sigma)$ 中的两个系数分别是 $(-1)^{i}(-1)^{i+1} = -1$ 与 $(-1)^{i+1}(-1)^{i+1} = +1$，相消。$i = 0, \\ldots, n-1$ 共 $n$ 对面全部消掉。',
        '② **两端。** $\\tau_{0}$ 删去 $v_{0}$（符号 $+1$）得 $[w_{0}, \\ldots, w_{n}]$，即 $g \\circ \\sigma$；$\\tau_{n}$ 删去 $w_{n}$（位置 $n+1$，符号 $(-1)^{n+1}$）得 $[v_{0}, \\ldots, v_{n}]$，即 $f \\circ \\sigma$，再乘 $P_{n}$ 的系数 $(-1)^{n}$，得 $-f \\circ \\sigma$。',
        '③ **侧面。** 剩下的是删去某个 $v_{j}$（$j < i$）或某个 $w_{j}$（$j > i$）的面。对 $j < i$：该面在 $\\partial\\tau_{i}$ 中的符号是 $(-1)^{j}$，在 $\\partial P_{n}(\\sigma)$ 中的总系数是 $(-1)^{i+j}$；而在棱柱 $\\Delta^{n-1} \\times [0,1]$ 的剖分里，它正是 $d_{j}\\sigma$ 的第 $(i-1)$ 块，在 $P_{n-1}(d_{j}\\sigma)$ 中的系数是 $(-1)^{i-1}$，再乘 $\\partial\\sigma$ 中 $d_{j}$ 的符号 $(-1)^{j}$，得 $(-1)^{i+j-1} = -(-1)^{i+j}$。对 $j > i$：该面在 $\\partial\\tau_{i}$ 中的符号是 $(-1)^{j+1}$，总系数是 $(-1)^{i+j+1}$；它对应 $d_{j}\\sigma$ 的第 $i$ 块，在 $P_{n-1}(d_{j}\\sigma)$ 中系数为 $(-1)^{i}(-1)^{j} = (-1)^{i+j}$，同样是相反数。所以侧面之和恰为 $-P_{n-1}(\\partial\\sigma)$。',
        '合并 ①–③ 得',
        '$$\\partial P_{n}(\\sigma) = g \\circ \\sigma - f \\circ \\sigma - P_{n-1}(\\partial \\sigma),$$',
        '即 $\\partial P_{n} + P_{n-1}\\partial = g_{\\#} - f_{\\#}$（约定 $P_{-1} = 0$；$n = 0$ 时 $\\tau_{0} = [v_{0}, w_{0}]$，①③ 都不出现，公式直接给出 $g\\sigma - f\\sigma$）。由 `def.chain-homotopy`，$f$ 与 $g$ 在同调上诱导同一同态。∎',
        '**同伦等价的情形**：若 $f : X \\to Y$ 与 $h : Y \\to X$ 满足 $h \\circ f \\simeq \\mathrm{id}_{X}$、$f \\circ h \\simeq \\mathrm{id}_{Y}$，则 $h_{*}f_{*} = \\mathrm{id}$、$f_{*}h_{*} = \\mathrm{id}$，故 $f_{*}$ 是同构。',
        '⭐ **这一步是球面同调归纳的支点**：`thm.sphere-homology` 把 $S^{n}$ 拆成两个可缩半球，需要「恒等映射与常值映射在同调上相同」——那正是本定理的直接推论（可缩空间里 $\\mathrm{id} \\simeq \\text{常值}$）。',
        '⚠️ 上面 ③ 的两行就是「内部面抵消」的逐下标验算；$n = 1$ 时可以手验：正方形剖成两块三角形，四个侧面正好是 $\\partial\\sigma$ 的两块棱柱。',
      ].join('\n\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1（the prism operator / homotopy invariance）',
        'Hatcher, Algebraic Topology, Ch. 2.1 · Homotopy invariance（Theorem 2.10）',
        'Spanier, Algebraic Topology, Ch. 4 · Homology theory',
      ]
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
          '被两块共享且定向相反，相消；剩下底面（给 $f \\circ \\sigma$）、顶面（给 $g \\circ \\sigma$）与侧面。\n\n' +
          '侧面之和正是 $P_{n-1}(\\partial \\sigma)$（因为 $\\partial\\sigma$ 的每个面对应棱柱的一个侧面）。\n\n' +
          '于是恰好得到 $g_{\\#} - f_{\\#}$。\n\n' +
          '∎',
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
        '`thm.sphere-homology` 的证明把 $S^{n}$ 拆成两个**开**半球 $U = S^{n} \\setminus \\{\\text{北极 } N\\}$、$V = S^{n} \\setminus \\{\\text{南极 } S\\}$（各自经球极投影同胚于 $\\mathbb{R}^{n}$，可缩），' +
          '再用**约化** Mayer–Vietoris 与对 $\\tilde{H}_{p}(S^{n-1})$ 的归纳。',
        '',
        '**缺的那一步**：两个开半球各自可缩，因此它们的恒等映射与「常值映射」同伦；' +
          '由 `thm.homotopy-invariance`，恒等诱导的同态等于常值映射诱导的同态，' +
          '而后者经过 $\\tilde H_{k}(\\text{pt}) = 0$ 分解，故 $\\tilde H_{k}(D^{n}) = 0$。',
        '',
        '没有这一条，归纳只能算出「某个群是 0」，却说不出「为什么半球没有同调」。∎',
      ].join('\n'),
      note: '这条补上了子 agent 交付时自己标注的「最薄弱一环」。' },
  ],
});
