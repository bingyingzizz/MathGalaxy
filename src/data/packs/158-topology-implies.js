/* ============================================================================
   内容包 · 接线：拓扑侧漏掉的蕴含（只加边，不改节点正文）

   为什么要有这一包：「真的有蕴含的要画上线，然后比如说度量空间
   一定 T6 这种推出也要画，你检查有没有漏的」。查完之后，下列三条**既不平凡、也不
   可传递得到**，却一直没画：

     · 紧 ⟹ 局部紧       （每个点都有紧邻域：取 $X$ 自己）
     · 紧 ⟹ 仿紧         （有限子覆盖本身就是局部有限的加细）
     · 度量 ⟹ 仿紧       （Stone 定理；**这条是真定理**，不是平凡蕴含）

   ⛔ **有意不画的**（可传递得到，画了只是噪音）：
     · 度量 ⟹ 正规 / $T_2$ / $T_0$ —— 已有 度量 ⟹ 完美正规 ⟹ 完全正规 ⟹ 正规 ⟹ 完全正则 ⟹ 正则 ⟹ $T_2$ ⟹ $T_1$ ⟹ $T_0$
     · 正规 ⟹ 正则、完全正规 ⟹ 正则 —— 同上，走 完全正则 一层
     · 仿紧 ⟹ 正规 —— **假的**（要加 Hausdorff，那条已有：`imp.pcp-paracompact-hausdorff-normal`）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑蕴含补漏：紧 ⟹ 局部紧 / 仿紧，度量 ⟹ 仿紧',

  nodes: [],

  edges: [
    {
      id: 'imp.compact-locally-compact',
      kind: 'implication',
      sources: ['def.compact'],
      target: 'def.locally-compact-space',
      proof: [
        '设 $X$ 紧。\n\n对任意 $x \\in X$：$X$ 自己是紧集（假设），而 $X$ 又是 $x$ 的邻域（$X$ 开于自身）。\n\n于是 $x \\in \\mathring{X} = X \\subseteq X$ —— 这正是「每个点都有紧邻域」的要求（`def.locally-compact-space` 的判据 $x \\in \\mathring{K}$，取 $K = X$）✓。\n\n∎',
        '',
        '⭐ 这条几乎是定义级别的，但它**不是**废话：局部紧的定义允许「每个点有个小的紧邻域」，紧性给的是「整体紧」，而整体紧在**子空间**上不遗传给邻域 —— 所以「紧 $\\implies$ 局部紧」要用 $K = X$ 这一招，而「局部紧」的逆不成立（$\\mathbb{R}$ 局部紧但不紧）。这条证明的是**局部紧**；要得到「局部紧 Hausdorff」，还需把 Hausdorff 作为额外假设（见下一条）。'
      ].join('\n')
    },
    {
      id: 'imp.compact-hausdorff-locallycompact',
      kind: 'implication',
      sources: ['def.compact', 'def.hausdorff'],
      target: 'def.locally-compact-space',
      proof: [
        '设 $X$ 紧且 Hausdorff。紧性给：对任意 $x \\in X$，取 $K = X$ 就是 $x$ 的紧邻域（$X$ 开于自身，故 $x \\in \\mathring{X}$）。Hausdorff 是额外假设。',
        '',
        '结论：$X$ **局部紧**（上一条）且 **Hausdorff**（本条假设）。∎',
        '',
        '⭐ 与上一条的分工：上一条只给局部紧（不需要 Hausdorff）；本条的额外输入只有 Hausdorff 这一条假设。'
      ].join('\n')
    },
    {
      id: 'imp.compact-paracompact',
      kind: 'implication',
      layer: false,
      sources: ['def.compact'],
      target: 'def.paracompact',
      proof: [
        '设 $X$ 紧，$\\mathcal{U}$ 是 $X$ 的任一开覆盖。由紧性取**有限**子覆盖 $U_{1}, \\ldots, U_{n}$，令 $\\mathcal{V} := \\{\\, U_{1}, \\ldots, U_{n} \\,\\}$。',
        '',
        '检查仿紧的两条要求（`def.paracompact`）：',
        '',
        '1. **加细**：$\\mathcal{V} \\subseteq \\mathcal{U}$，是自身的加细 ✓；',
        '2. **局部有限**：有限族在**任意点**都只碰到有限多个成员 —— 事实上最多碰到 $n$ 个 ✓。',
        '',
        '所以每个开覆盖都有局部有限的開加细，$X$ 仿紧 ✓。∎',
        '',
        '⚠️ **反向不成立**：$\\mathbb{R}$ 仿紧但不紧。仿紧是「局部有限」这一侧的紧性，比紧弱得多。'
      ].join('\n')
    },
    {
      id: 'imp.metric-paracompact',
      kind: 'implication',
      layer: false,
      sources: ['def.metric-space'],
      target: 'def.paracompact',
      proof: [
        '**骨架**（Stone 定理：距离空间都仿紧；完整证明属一般拓扑的标准定理，这里给结构与关键构造）。',
        '',
        '设 $(X, d)$ 是距离空间，$\\mathcal{U}$ 是开覆盖。分三步：',
        '',
        '**第 1 步（造 $\\sigma$-离散加细）**：对每个 $n \\ge 1$，取极大的「$2^{-n}$-分离」子集 $S_{n} \\subseteq X$（任意两点距离 $\\ge 2^{-n}$；用 Zorn 引理或超限递归取极大）。由极大性，球族',
        '',
        '$$\\mathcal{B}_{n} := \\bigl\\{\\, B(s, 2^{-n}) : s \\in S_{n} \\,\\bigr\\}$$',
        '',
        '覆盖 $X$（否则可再加一点，与极大性矛盾）。\n\n**半径要减半**：中心相距 $\\ge 2^{-n}$ 只保证**半径 $2^{-n-1}$** 的球两两不交（两球交于 $z$ 会给出 $d(x,y) \\le d(x,z)+d(z,y) < 2\\cdot 2^{-n-1} = 2^{-n}$，矛盾）；半径 $2^{-n}$ 那族只负责**覆盖**。下面说的「离散族」指的都是减半后的 $\\bigl\\{, B(s,2^{-n-1}):s\\in S_{n},\\bigr\\}$；\n\n$\\bigcup_{n}\\mathcal{B}_{n}$ 是 $\\sigma$-离散族。',
        '',
        '**第 2 步（$\\sigma$-离散 $\\implies$ 局部有限）**：对一个固定点 $x$，$B(x, 2^{-n})$ 只与 $S_{n}$ 中有限多个点相交（它们两两相距 $\\ge 2^{-n}$，而都落在 $B(x, 2^{-n+1})$ 里 —— 直径有限的距离空间里这样的点最多有限多个）。\n\n于是 $x$ 的一个邻域只碰到 $\\mathcal{B}_{n}$ 中有限多个成员 ✓。',
        '',
        '**第 3 步（贴回覆盖）**：把 $\\mathcal{B}_{n}$ 的每个球 $B(s, 2^{-n})$ 换成「$s$ 所在的某个 $U \\in \\mathcal{U}$」，并对 $n$ 用 $\\sigma$-离散 $\\implies$ 由 Stone 的加细定理（$\\sigma$-离散族可加细进任意开覆盖）得到 $\\mathcal{U}$ 的局部有限开加细。\n\n于是 $X$ 仿紧 ✓。\n\n∎',
        '',
        '⛔ **这条不能靠「度量 $\\implies$ 正规」绕过去**：正规**不**蕴含仿紧（Sorgenfrey 直线正规、仿紧，但存在正规而不仿紧的空间）。所以度量 $\\implies$ 仿紧是一条**独立**的定理，不是分离公理的推论。'
      ].join('\n')
    }
  ]
});
