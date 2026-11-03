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
  ],

  edges: [
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
    {
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
