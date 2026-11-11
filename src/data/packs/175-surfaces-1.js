/* ============================================================================
   内容包 · 曲面地形 第一刀（2026-11-03，T18 / 审计 B2·B6）
   ----------------------------------------------------------------------------
   病灶：图里三种「曲面」互不相等，而**闭曲面分类定理要的那个对象根本不存在**：
     · `def.regular-surface` / `def.orientable-surface` —— $S \subseteq \mathbb{R}^{3}$ 的参数化曲面（外在）
     · `def.riemann-surface` —— 一维复流形
     · `def.smooth-manifold` —— 图册 + 光滑转移
     · **拓扑流形 / 闭曲面 / 亏格 / 连通和** —— 全都没有节点
   ⇒ 分类定理（第二刀）一开口就得说「紧连通二维拓扑流形」，而这个词在图里是空的。

   这一刀只补**三块地基**（审计 §10 已定）：
     · `def.connected-sum` —— 连通和（挖球 + 沿边界粘）
     · `def.genus`         —— 亏格，按「方案 1」用同调定义，避开循环
     · 星团 `topology.surfaces`（本刀新开；第二刀往这里放分类定理）

   ⚠️ **亏格的定义**：审计写的是 `g := rank H₁`，但那是**两倍**——闭可定向曲面的
      $H_{1} \cong \mathbb{Z}^{2g}$（环面 rank = 2 而亏格是 1）。所以这里定义成
      $g := \tfrac{1}{2}\operatorname{rank}_{\mathbb{Z}} H_{1}$，并在注里把「为什么除 2」写清。
      ⛔ 不改审计的意图（用同调避开循环），只把因子写对。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '曲面地形（一）：连通和与亏格',

  nodes: [
    {
      id: 'def.connected-sum',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '连通和',
      title: '连通和 $M \\# N$（挖球再沿边界粘）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面'],
      statement: [
        '设 $M$、$N$ 是两个 $n$ 维**连通**拓扑流形（$n \\ge 1$）。在 $M$ 里取一个开球 $B_{M}$、' +
          '在 $N$ 里取一个开球 $B_{N}$，挖掉它们的内部，得到两个带边界球面的流形',
        '',
        '$$M^{\\circ} := M \\setminus \\operatorname{int} B_{M}, \\qquad N^{\\circ} := N \\setminus \\operatorname{int} B_{N},$$',
        '',
        '它们的边界都是 $S^{n-1}$。任取一个同胚 $h : \\partial M^{\\circ} \\to \\partial N^{\\circ}$，把两者沿边界粘起来：',
        '',
        '$$M \\# N := M^{\\circ} \\sqcup N^{\\circ} \\big/ \\bigl( x \\sim h(x) \\bigr).$$',
        '',
        '得到的拓扑空间叫 $M$ 与 $N$ 的**连通和**。',
      ].join('\n'),
      notes: [
        '⭐ **粘合就是取商**：$\\sqcup$ 之后按 $x \\sim h(x)$ 取商拓扑（`def.quotient-set` 那一套：' +
          '开集是「原像开」的集合）。所以连通和不是新构造，是「不交并 + 商」的组合。',
        '⭐ **结果是流形，且与选取无关**：接缝处 $M^{\\circ}$ 的那一圈 $S^{n-1}$ 与 $N^{\\circ}$ 的那一圈' +
          '在粘之后各自有半边的欧氏邻域，拼起来仍是 $\\mathbb{R}^{n}$ 的开集 —— 每一点都有图卡。' +
          '换成别的球或别的同胚，得到的结果同胚（这一点靠「球内任何两个嵌入的球都同痕」，本图未展开）。',
        '⭐ 球面是**单位元**：$S^{n} \\# M \\cong M$（在 $M$ 里挖一个球、把 $S^{n}$ 也挖一个球，' +
          '粘回去正好把洞补成原来的样子）。于是「$n$ 维闭流形」在连通和下构成一个**交换幺半群**：' +
          '交换、有单位元，但**一般没有逆元**（这正是分类问题有意思的地方）。',
        '⚠ **必须在同一个维数下取连通和**，而且要连通（不连通的话挖球可能挖在不同的分支上，' +
          '结果依赖选取）。',
        '📌 亏格（`def.genus`）就是「一个曲面等于几个环面的连通和」的那个数 —— 本图把这条等价' +
          '留到分类定理（下一刀），这里只立定义。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12（分类定理前的准备）', 'Hatcher, Algebraic Topology, Ch. 0'],
    },

    {
      id: 'def.genus',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '亏格',
      title: '亏格 $g$（闭可定向曲面：$\\tfrac{1}{2}\\operatorname{rank} H_{1}$）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '同调'],
      statement: [
        '设 $M$ 是**闭的**（紧、无边界）**可定向**曲面。定义它的**亏格**为',
        '',
        '$$g(M) := \\tfrac{1}{2} \\operatorname{rank}_{\\mathbb{Z}} H_{1}(M; \\mathbb{Z}).$$',
        '',
        '即一阶整同调的自由秩的一半。',
      ].join('\n'),
      notes: [
        '⭐ **为什么除以 2**：闭可定向曲面的 $H_{1}$ 是自由阿贝尔群，且',
        '',
        '$$H_{1}(M; \\mathbb{Z}) \\cong \\mathbb{Z}^{2g},$$',
        '',
        '所以 **rank 是 $2g$**。环面是第一个例子：$H_{1}(T^{2}) \\cong \\mathbb{Z}^{2}$，rank = 2，' +
          '而亏格是 **1**。若直接把亏格定义成 rank，环面就成了「亏格 2」，' +
          '连带 $\\chi = 2 - 2g$ 也会算错（环面 $\\chi = 0$）。除以 2 才是那个「洞的个数」。',
        '⭐ **为什么不用「环柄个数」或「$\\chi = 2-2g$」来定义**：那两条都要先有分类定理' +
          '（每个闭可定向曲面都是若干环面的连通和），而分类定理本身要用 $g$ —— 会成环。' +
          '同调定义**不依赖分类**，所以它是这一层唯一干净的选择。',
        '⭐ 由定义立刻能算的三个值：球面 $g = 0$（$H_{1} = 0$）；环面 $g = 1$；' +
          '$g$ 个环面的连通和满足 $g(M \\# N) = g(M) + g(N)$（连通和的 $H_{1}$ 是两个加项直和的那一部分）。' +
          '⚠ 最后这条是**定理**（要 Mayer–Vietoris），本图还没写成节点。',
        '⚠ **这个定义只对闭可定向曲面上班**：带边界的曲面要看相对同调或先补洞；' +
          '**不可定向**的情形 $H_{1}$ 有挠部（射影平面 $H_{1} \\cong \\mathbb{Z}/2$），' +
          '「亏格」得换成别的量（不可定向亏格 $k$，$\\chi = 2 - k$）。',
        '📌 与 Euler 示性数的关系 $\\chi(M) = 2 - 2g(M)$ 也是**定理**（下一刀），这里只记一句。',
      ].join('\n\n'),
      refs: ['Hatcher, Algebraic Topology, Ch. 2.2（曲面与亏格）', 'Massey, A Basic Course in Algebraic Topology'],
    },
    {
      id: 'def.polygon-representation',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '多边形表示',
      title: '曲面的多边形表示（边配对粘合）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '多边形表示', '粘合'],
      statement: '设 $n\\ge 2$，$P$ 是平面上的正 $2n$ 边形，其边界边按一个无不动点的对合 $\\tau$ 两两配对。把每对边按 $x\\sim\\tau(x)$ 粘合，商空间 $S=P/{\\sim}$ 称为一个**多边形表示**。若每对边粘合时定向相反，则 $S$ 可定向；若存在同向粘合的边对，则 $S$ 不可定向。',
      notes: '**标准形**：可定向闭曲面有 $4g$ 边形表示 $a_{1}b_{1}a_{1}^{-1}b_{1}^{-1}\\cdots a_{g}b_{g}a_{g}^{-1}b_{g}^{-1}$；不可定向闭曲面有 $2k$ 边形表示 $c_{1}c_{1}\\cdots c_{k}c_{k}$。\n\n**例子**：环面是 $4$ 边形 $aba^{-1}b^{-1}$；射影平面是 $2$ 边形 $aa$；克莱因瓶是 $4$ 边形 $abab^{-1}$。\n\n**为什么用它**：多边形表示把曲面压成有限组合数据（边配对），分类定理的输入正是这个数据；「粘边」是构造曲面的逆操作。\n\n⚠ 粘合结果未必是流形：若某个顶点链环不是圆（例如 $2$ 边形 $aa$ 的两个端点粘成一点时需单独检查），商空间可能是伪流形。多边形表示的定义只给商空间，是不是曲面要另验。',
      refs: ['Munkres, Topology (2nd ed.), Ch. 12 · classification of surfaces', 'Hatcher, Algebraic Topology, Ch. 2 §2.2 · polygonal presentation'],
    },
    {
      id: 'def.handle',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '环柄',
      title: '环柄（连通和 $T^{2}$）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '环柄', '连通和'],
      statement: '设 $S$ 是闭曲面。在 $S$ 上挖去两个开圆盘，得到边界为两个圆周的曲面；再把圆柱 $S^{1}\\times[0,1]$ 的两端分别粘到这两个边界圆周上，所得闭曲面称为在 $S$ 上**加一个环柄**。等价地，加环柄就是与环面作连通和：$S\\mapsto S\\#T^{2}$。',
      notes: '**对可定向曲面**：加一个环柄使亏格 $g$ 加 $1$、Euler 示性数减 $2$。闭可定向曲面恰由球面加 $g$ 个环柄得到（分类定理）。\n\n**对不可定向曲面**：加环柄保持不可定向，但会增加「可定向部分」的亏格；不可定向曲面的标准形用交叉帽而不是环柄。\n\n⚠ 环柄与交叉帽不同：挖两个洞粘圆柱 vs 挖一个洞粘 Möbius 带；前者保持可定向性，后者破坏它。',
      refs: ['Munkres, Topology (2nd ed.), Ch. 12 · connected sum and handle', 'Hatcher, Algebraic Topology, Ch. 2 §2.2 · genus'],
    },
    {
      id: 'def.crosscap',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '交叉帽',
      title: '交叉帽（连通和 $\\mathbb{R}P^{2}$）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '交叉帽', '连通和', '不可定向'],
      statement: '设 $S$ 是闭曲面。在 $S$ 上挖去一个开圆盘，把边界圆周上的对径点粘合（$x\\sim -x$），所得闭曲面称为在 $S$ 上**加一个交叉帽**。等价地，加交叉帽就是与射影平面作连通和：$S\\mapsto S\\#\\mathbb{R}P^{2}$；也等于把 Möbius 带沿边界粘到挖去的圆盘上。',
      notes: '**效果**：加一个交叉帽使 Euler 示性数减 $1$，并使曲面不可定向。球面加 $k\\ge1$ 个交叉帽得到全部闭不可定向曲面（分类定理）。\n\n**例子**：$k=1$ 是射影平面；$k=2$ 是克莱因瓶。\n\n⚠ 交叉帽不是「把圆盘直接粘回去」：对径粘合改变边界附近的局部结构，使曲面不可定向；直接粘回则只是原曲面。',
      refs: ['Munkres, Topology (2nd ed.), Ch. 12 · crosscap', 'Hatcher, Algebraic Topology, Ch. 2 §2.2 · nonorientable surfaces'],
    },
    {
      id: 'def.nonorientable-genus',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '不可定向亏格',
      title: '不可定向亏格 $k$（$\\chi=2-k$）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '亏格', '不可定向'],
      statement: '设 $M$ 是闭不可定向曲面。它的**不可定向亏格** $k(M)$ 是使 $M$ 同胚于 $k$ 个射影平面的连通和的最小整数 $k\\ge 1$。等价地，$k(M)$ 是标准形中交叉帽的个数，且 Euler 示性数满足 $\\chi(M)=2-k(M)$。',
      notes: '**为什么不直接用 $\\chi=2-k$ 当定义**：那会先假定分类定理（每个闭不可定向曲面都同胚于标准形）；用「射影平面连通和的最小个数」定义不依赖分类，和 `def.genus` 用同调定义是同一个思路。\n\n**低值**：$k=1$ 射影平面；$k=2$ 克莱因瓶；$k=3$ 是「三交叉帽」曲面。\n\n**与可定向亏格的区别**：可定向 $\\chi=2-2g$；不可定向 $\\chi=2-k$。同一个 $\\chi$ 在两类曲面里给出不同的「洞数」，不能混用。\n\n**同调读数**：$H_{1}(M;\\mathbb{Z})\\cong\\mathbb{Z}^{k-1}\\oplus\\mathbb{Z}/2$（$k\\ge1$），挠部正是不可定向性的痕迹。\n\n⚠ $k$ 与 $g$ 之间没有简单换算；把不可定向曲面「可定向双覆盖」后才得到可定向亏格 $g=k-1$。',
      refs: ['Munkres, Topology (2nd ed.), Ch. 12 · nonorientable genus', 'Hatcher, Algebraic Topology, Ch. 2 §2.2 · Euler characteristic of surfaces'],
    },
  ],

  edges: [
    { id: 'dep.poly-quotient', kind: 'definition', definition: 'def.quotient-topology', usedBy: 'def.polygon-representation',
      note: '多边形表示是把边界按配对粘合得到的商空间。' },
    { id: 'dep.poly-closed', kind: 'definition', definition: 'def.closed-surface', usedBy: 'def.polygon-representation',
      note: '多边形表示构造的对象是闭曲面（粘合后需验证流形性）。' },
    { id: 'dep.handle-connsum', kind: 'definition', definition: 'def.connected-sum', usedBy: 'def.handle',
      note: '加环柄等价于与环面作连通和。' },
    { id: 'dep.handle-torus', kind: 'definition', definition: 'ex.torus', usedBy: 'def.handle',
      note: '环柄的基本例子是环面。' },
    { id: 'dep.handle-genus', kind: 'definition', definition: 'def.genus', usedBy: 'def.handle',
      note: '加环柄使可定向亏格加 1。' },
    { id: 'dep.crosscap-projective', kind: 'definition', definition: 'ex.projective-plane', usedBy: 'def.crosscap',
      note: '交叉帽的基本例子是射影平面。' },
    { id: 'dep.crosscap-mobius', kind: 'definition', definition: 'def.mobius-band', usedBy: 'def.crosscap',
      note: '交叉帽等于沿边界粘 Möbius 带。' },
    { id: 'dep.crosscap-connsum', kind: 'definition', definition: 'def.connected-sum', usedBy: 'def.crosscap',
      note: '交叉帽等价于与射影平面作连通和。' },
    { id: 'dep.nongenus-crosscap', kind: 'definition', definition: 'def.crosscap', usedBy: 'def.nonorientable-genus',
      note: '不可定向亏格按交叉帽个数定义。' },
    { id: 'dep.nongenus-euler', kind: 'definition', definition: 'thm.euler-characteristic', usedBy: 'def.nonorientable-genus',
      note: '读数 chi = 2 - k 依赖 Euler 示性数。' },
    { id: 'dep.nongenus-connsum', kind: 'definition', definition: 'def.connected-sum', usedBy: 'def.nonorientable-genus',
      note: '定义用射影平面的连通和。' },
    /* -------- 连通和的两块原料 -------- */
    {
      id: 'dep.quotientset-connectedsum',
      kind: 'definition',
      definition: 'def.quotient-set',
      usedBy: 'def.connected-sum',
      note: '粘合这一步**就是商空间**：不交并之后按 $x \\sim h(x)$ 取商拓扑。',
    },
    {
      id: 'dep.smoothmanifold-connectedsum',
      kind: 'definition',
      definition: 'def.smooth-manifold',
      usedBy: 'def.connected-sum',
      note: '连通和是在 $n$ 维**流形**上做的：要先有「开球」「边界球面」这些概念。',
    },
    /* -------- 亏格的两块原料 -------- */
    {
      id: 'dep.simphomology-genus',
      kind: 'definition',
      definition: 'def.simplicial-homology',
      usedBy: 'def.genus',
      note: '亏格用**一阶整同调的秩**定义 —— 这是为了避开「先有分类定理」的循环（见该节点的注）。',
    },
    {
      id: 'dep.connectedsum-genus',
      kind: 'definition',
      definition: 'def.connected-sum',
      usedBy: 'def.genus',
      note: '「$g$ 就是几个环面的连通和」这个直觉要靠连通和才说得出来；' +
        '但那件事本身是**定理**（分类定理，下一刀），定义里不用它。',
    },
    /* -------- 与 Euler 示性数的桥：先记类比，定理留给下一刀 -------- */
    {id: "e181.analogy",
      kind: 'analogy',
      a: 'def.genus',
      b: 'thm.euler-characteristic',
      title: '亏格与 Euler 示性数：同一个数换了身衣服',
      note: [
        '闭可定向曲面上 $\\chi(M) = 2 - 2g(M)$ —— 两个数互相决定，所以「数 Betti 数」与「数洞」是同一件事。',
        '⚠ 本图把这条**留成类比**而不是 implication：它需要一个正经的定理节点（下一刀补），' +
          '现在写死成推出关系就等于把「还没写的证明」当成已证。',
      ].join('\n\n'),
    },
  ],
});
