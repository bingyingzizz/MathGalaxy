/* ============================================================================
   内容包 · 团体检补漏（2026-11-03，对前几批补跑 clustercheck 的结果）
   ----------------------------------------------------------------------------
   对 `topology.surfaces` 与 `logic.fol` 补跑 `tools/clustercheck.mjs`，报出的
   「文引无边」逐条判断后处理：

   A. **真关系 → 补边**（5 条）
      1. `def.genus` 的定义域就是「闭可定向曲面」⇒ 闭曲面 → 亏格（definition）。
      2. 球面是连通和的**单位元** ⇒ 连通和 → 球面（definition）。
      3. 拓扑曲面 ↔ $\\mathbb{R}^{3}$ 里的参数化曲面：**同名不同物**（内蕴 vs 外在）⇒ analogy。
      4. 拓扑曲面 ↔ Riemann 曲面：**同名不同物**（拓扑 vs 一维复结构）⇒ analogy。
      5. 分类定理 ↔ Gauss–Bonnet：**同一个 $\chi$** 把两者焊在一起 ⇒ analogy
         （⛔ 不连 implication：$\int K = 2\pi\chi$ 是 Gauss–Bonnet 的结论，
          而 $\chi = 2-2g$ 是本团另一条命题的结论，两者组合才给出 $\int K = 4\pi(1-g)$，
          本图没有那条「组合」节点，所以只到类比）。

   B. **只是顺带提及 → 降反引号**（4 处，见各包正文的改动）
      反引号是「点进去能看到这个节点」的**承诺**；`def.satisfaction`（⊢ vs ⊨ 的对照）、
      `thm.compactness`（前向指路）、`def.complete`（「别与完备空间混」）、
      `def.orientable-surface`（「那是另一侧的事」）都只是提一句，不该承诺连线。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '团体检补漏：曲面团的 5 条接口线',

  nodes: [],

  edges: [
    {
      id: 'dep.closedsurface-genus',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'def.genus',
      note: '亏格只对**闭可定向曲面**定义（$\\tfrac{1}{2}\\operatorname{rank} H_{1}$ 这个式子依赖「闭 + 可定向」），' +
        '所以闭曲面是它的前提。此前这条边缺失：`def.genus` 的定义里写着「闭可定向曲面」，却没连过去。',
    },
    {
      id: 'dep.connectedsum-sphere',
      kind: 'definition',
      definition: 'def.connected-sum',
      usedBy: 'ex.sphere',
      note: '球面是连通和的**单位元**（$S^{2}\\# M \\cong M$）—— 这句话要用连通和才说得出来，' +
        '所以这个例子的说明依赖连通和。',
    },
    {id: "e186.analogy",
      kind: 'analogy',
      a: 'def.closed-surface',
      b: 'def.regular-surface',
      title: '两个「曲面」：拓扑的 vs $\\mathbb{R}^{3}$ 里被参数化覆盖的',
      note: [
        '**同名不同物**，这正是审计 B2 点出的那件事：',
        '- `def.regular-surface` 说的是「$U \\subseteq \\mathbb{R}^{2}$ 经 $r$ 打到 $\\mathbb{R}^{3}$ 的像」，' +
          '自带**嵌入、度量、曲率**；',
        '- 定义里只有「紧、连通、无边界、局部同胚于 $\\mathbb{R}^{2}$」，**没有任何外部空间**。',
        '所以「球面」在两边指的不是一回事：一边是 $\\mathbb{R}^{3}$ 里的单位球面（有面积、有 Gauss 曲率），' +
          '一边是抽象的 $S^{2}$（只有拓扑）。',
        '⛔ 不能连 definition/implication：一边嵌在 $\\mathbb{R}^{3}$ 里、一边不嵌，没有谁是谁的前提。',
      ].join('\n\n'),
    },
    {id: "e187.analogy",
      kind: 'analogy',
      a: 'def.closed-surface',
      b: 'def.riemann-surface',
      title: '两个「曲面」：拓扑的 2 维流形 vs 一维复流形',
      note: [
        '**同名不同物**，而且维数说法都不一样：',
        '- 拓扑曲面是**实 2 维**（局部同胚于 $\\mathbb{R}^{2}$）；',
        '- Riemann 曲面是**复 1 维**（局部双全纯于 $\\mathbb{C}$ 的开集），它额外带一个**复结构**。',
        '⭐ 每个 Riemann 曲面都是拓扑曲面（忘记复结构即可），但反过来不成立 —— ' +
          '球面恰好只有**一个**复结构（Riemann 映射定理的推论），环面却有一整族（模空间）。' +
          '这条差别正是「复结构是额外数据」的体现。',
        '⛔ 不能连 implication：本图的 Riemann 曲面是从「一维复流形」定义的，' +
          '而闭曲面是从拓扑定义的，两边的前提不同（真要连得先有「忘记复结构」这个函子）。',
      ].join('\n\n'),
    },
    { id: "e188.analogy",
      kind: 'analogy',
      a: 'thm.classification-surfaces',
      b: 'thm.gauss-bonnet',
      title: '分类定理与 Gauss–Bonnet：被同一个 $\\chi$ 焊在一起',
      note: [
        '一边是**纯拓扑**的分类（闭曲面由 $g$ 或 $k$ 决定，等价地由 $\\chi$ 与可定向性决定），' +
          '一边是**几何**的等式（$\\int_{M} K\\,\\mathrm{d}A = 2\\pi\\chi(M)$）。',
        '把两者拼起来就得到微分几何里最有名的一句：**曲率的总量只由亏格决定** ——',
        '',
        '$$\\int_{M} K\\,\\mathrm{d}A = 4\\pi(1-g).$$',
        '',
        '球面（$g=0$）必须是 $4\\pi$，环面（$g=1$）必须是 $0$ —— 无论怎么把环面捏变形，只要不同胚就改不了。',
        '⚠ 本图**没有**那条「组合」命题（$\\int K = 4\\pi(1-g)$）的节点，所以这里只连类比；' +
          '⛔ 也不连 implication：分类定理不推出 Gauss–Bonnet（后者要度量）。',
      ].join('\n\n'),
    },
    {id: "e189.analogy",
      kind: 'analogy',
      a: 'prop.eulerchar-nonorientable',
      b: 'def.genus',
      title: '两个「亏格」：可定向的 $g$ 与不可定向的 $k$',
      note: [
        '同一个中文词、两套数法（这正是这条命题存在的理由）：',
        '- 可定向侧：$g = \\tfrac{1}{2}\\operatorname{rank} H_{1}$，$\\chi = 2 - 2g$；',
        '- 不可定向侧：$k$（几个射影平面的连通和），$\\chi = 2 - k$。',
        '⚠ 斜率不同（$-2$ vs $-1$），所以**同一个 $\\chi$ 在两族里不是同一个曲面**：' +
          '$\\chi = 0$ 既可能是环面（$g=1$）也可能是克莱因瓶（$k=2$）。',
        '⛔ 不能连 definition：`def.genus` 的定义里那个「除以 2」依赖 $H_{1}$ 的自由秩为**偶数**，' +
          '不可定向时秩可能是奇数（$\\mathbb{RP}^{2}$ 的自由秩是 0），公式直接不成立。',
      ].join('\n\n'),
    },
  ],
});
