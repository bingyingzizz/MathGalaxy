/* ============================================================================
   内容包 · 接线：基本群 / 同调群 → 它真正用到的基础概念

   为什么要有这一包：140/141 两个包里的节点几乎只互相连边，于是按「最长路径」
   算出来的 layer 落在 0–10 —— 看起来比 ZFC 公理只高几层，用「分层」滑杆时会
   和集合论混在一起。这不是数学，是**漏了定义引用边**。

   这一包只加 `definition` 边（定义 → 用到它的结论），每条带 note，不改任何节点正文。
   判据：节点陈述里**真的**用到了那个概念，才连。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '接线：基本群与同调群的基础依赖',

  nodes: [],

  edges: [
    /* ---- 基本群一侧 ---- */
    { kind: 'definition', definition: 'def.function', usedBy: 'def.path-homotopy',
      note: '道路就是映射 $\\gamma : [0,1] \\to X$ —— 没有「映射」这个定义就写不出道路。' },

    { kind: 'definition', definition: 'def.continuous-map', usedBy: 'def.path-homotopy',
      note: '道路要求 $\\gamma$ 连续；点集拓扑里的连续性在这里第一次被真正用上。' },

    { kind: 'definition', definition: 'def.homotopy', usedBy: 'def.path-homotopy',
      note: '道路同伦是「固定两个端点的映射同伦」：$H(\\cdot, 0) = \\gamma_{0}$、$H(\\cdot, 1) = \\gamma_{1}$，且两个端点不动。' },

    { kind: 'definition', definition: 'def.homotopy', usedBy: 'def.fundamental-group',
      note: '$\\pi_{1}(X, x_{0})$ 的元素是道路的**同伦类** —— 「同伦」这个等价关系是它的定义的一部分。' },

    { kind: 'definition', definition: 'def.quotient-set', usedBy: 'def.fundamental-group',
      note: '把同伦类收成一个元素，就是取商集：$\\pi_{1}$ 的元素集 $=$ 道路的集合 $/$ 同伦。' },

    { kind: 'definition', definition: 'def.group', usedBy: 'def.fundamental-group',
      note: '$\\pi_{1}$ 是**群**：道路类乘法来自拼接，单位元是常值道路，逆是反向道路 —— 群公理要逐条验。' },

    { kind: 'definition', definition: 'def.group-hom', usedBy: 'prop.induced-homomorphism',
      note: '连续映射诱导的 $f_{*}$ 是**群同态**：$f_{*}([\\alpha][\\beta]) = f_{*}([\\alpha])f_{*}([\\beta])$。' },

    { kind: 'definition', definition: 'def.continuous-map', usedBy: 'def.covering-space',
      note: '覆叠映射 $p : E \\to B$ 首先是连续满射，再加「每点有 evenly covered 邻域」。' },

    { kind: 'definition', definition: 'def.hausdorff', usedBy: 'def.covering-space',
      note: '常见的覆叠定理（提升唯一性、纤维离散）要在 Hausdorff（或至少 $T_{1}$）假设下才干净。' },

    { kind: 'definition', definition: 'def.continuous-map', usedBy: 'thm.no-retraction-disk',
      note: '收缩 $r : \\overline{\\mathbb{D}} \\to S^{1}$ 要求连续且 $r|_{S^{1}} = \\mathrm{id}$。' },

    /* ---- 同调一侧 ---- */
    { kind: 'definition', definition: 'def.subset', usedBy: 'def.simplicial-complex',
      note: '单纯复形是「顶点集的子集族」，且对取子集封闭：$\\sigma \\in K$、$\\tau \\subseteq \\sigma$ $\\implies$ $\\tau \\in K$。' },

    { kind: 'definition', definition: 'def.power-set', usedBy: 'def.simplicial-complex',
      note: '$K \\subseteq \\mathcal{P}(V)$ —— 复形活在幂集里，这是它「组合对象」那一面的来源。' },

    { kind: 'definition', definition: 'def.metric-space', usedBy: 'def.standard-simplex',
      note: '标准单形 $\\Delta^{n} \\subset \\mathbb{R}^{n+1}$ 的拓扑来自欧氏距离，所以它的「连续」是距离空间意义下的。' },

    { kind: 'definition', definition: 'def.group', usedBy: 'def.chain-group',
      note: '链群 $C_{n}(K)$ 是**自由阿贝尔群**：以 $n$-单形为基，系数取整。它的群结构就是这里定义的群结构。' },

    { kind: 'definition', definition: 'def.quotient-group', usedBy: 'def.simplicial-homology',
      note: '$H_{n} = \\ker \\partial_{n} / \\operatorname{im} \\partial_{n+1}$ —— 同调群是**商群**，$\\partial^{2} = 0$ 保证分子包含分母。' },

    { kind: 'definition', definition: 'def.continuous-map', usedBy: 'def.singular-homology',
      note: '奇异 $n$-单形是**连续映射** $\\sigma : \\Delta^{n} \\to X$（对照：单纯单形是组合对象，不带拓扑）。' },

    { kind: 'definition', definition: 'def.homotopy', usedBy: 'def.singular-homology',
      note: '奇异同调的**同伦不变性**要用映射同伦（棱柱算子 $P$ 就是它的代数化），所以这条依赖绕不开。' },

    { kind: 'definition', definition: 'def.chain-group', usedBy: 'def.singular-homology',
      note: '奇异链群与单纯链群是同一个构造（自由阿贝尔群 + 边缘算子），只是一个用连续单形、一个用组合单形。' },
  ],
});
