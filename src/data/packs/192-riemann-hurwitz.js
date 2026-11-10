/* ============================================================================
   内容包 · Riemann–Hurwitz（2026-11-04，审计第③刀）
   ----------------------------------------------------------------------------
   前两刀补了「分类定理要说的对象」和「它的第一步（三角剖分 / Radó）」。
   这一刀补**亏格怎么算**：分支覆盖 → 分歧指数 → Riemann–Hurwitz 公式。

   ⚠️ 为什么这属于「曲面的地形」而不是复变函数：RH 的对象是 Riemann 表面（带复结构），
      但它的**产出**是亏格 $g$ 与 $\chi$ 的等式 —— 和 `def.genus`、`prop.eulerchar-genus`、
      `thm.classification-surfaces` 是同一套账。所以放进 topology.surfaces，用定义边
      接到 analysis.complex 那一侧（`def.riemann-surface` / `def.holomorphic`）——
      这也是审计说的「RH 会让 complex ↔ topology 第一次非零」。
   ⚠️ `thm.riemann-hurwitz` 标 skeleton：证明要用「拉回剖分 + 分支点局部计数」，
      本图只给结构，不假装逐字证过。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: 'Riemann–Hurwitz：分支覆盖与亏格',

  nodes: [
    /* ---------------------------------------------------------- 分支覆盖 */
    {
      id: 'def.branched-cover',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '分支覆盖',
      title: '分支覆盖（紧 Riemann 面之间）',
      regions: ['topology', 'complex'],
      tags: ['定义', 'Riemann 面', '覆叠', '曲面'],
      statement: [
        '设 $X, Y$ 是紧 Riemann 面（`def.riemann-surface`），$p : Y \\to X$ 是**非常数全纯**映射（`def.holomorphic`）。则',
        '',
        '- 存在有限集 $B \\subset X$，使 $p$ 限制在 $Y \\setminus p^{-1}(B) \\to X \\setminus B$ 上是**覆叠映射**（`def.covering-space`）；',
        '- 这时的层数 $d$（与点无关，见下面「分歧指数」那条的求和恒等式）叫 $p$ 的**次数**；',
        '- $B$ 叫**分支点集**，$p^{-1}(B)$ 的点叫**分歧点**；$p$ 叫 $X$ 上的 $d$ 次**分支覆盖**。',
      ].join('\n'),
      notes: [
        '⭐ **为什么必须「紧 + 全纯」才能这样定义**：紧性保证层数有限、$B$ 有限（否则同一点可以有无限多个原像、分支点可以累积）；',
        '全纯性（开映射 + 零点的孤立性）保证局部形状只有 $z \\mapsto z^{e}$ 这一种 —— 纯拓扑的分支覆盖得把「有限层 + 有限分支集」当额外假设写进去。',
        '⚠️ 分支覆盖**不是**覆叠映射：去掉 $B$ 之后才是。最常见的例子：',
        '',
        '$$p : \\mathbb{P}^{1} \\to \\mathbb{P}^{1}, \\qquad z \\mapsto z^{2}$$',
        '',
        '它是 $2$ 次分支覆盖，分支点是 $0$ 与 $\\infty$（这两点处 $2$ 对 $1$），其余处处 $2$ 对 $1$。',
        '📌 一句话记法：分支覆盖 = 「有限覆叠 $+$ 有限个允许出问题（分歧）的点」。',
      ].join('\n\n'),
      refs: [
        'Miranda, Algebraic Curves and Riemann Surfaces, Ch. II',
        'Forster, Lectures on Riemann Surfaces, §4',
      ],
    },

    /* ---------------------------------------------------------- 分歧指数 */
    {
      id: 'def.ramification-index',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '分歧指数',
      title: '分歧指数（局部的 $e$ 对 $1$）',
      regions: ['topology', 'complex'],
      tags: ['定义', 'Riemann 面', '覆叠', '曲面'],
      statement: [
        '设 $p : Y \\to X$ 是紧 Riemann 面之间的非常数全纯映射，$q \\in Y$、$p(q) = r$。取 $q, r$ 附近的局部坐标，把 $p$ 写成',
        '',
        '$$p(z) - r = (z - q)^{e}\\, u(z), \\qquad u \\text{ 在 } q \\text{ 附近全纯且 } u(q) \\ne 0 .$$',
        '',
        '这个正整数 $e = e_{q}$ 叫 $p$ 在 $q$ 的**分歧指数**（ramification index）。',
        '$e_{q} > 1$ 时 $q$ 叫**分歧点**、$r$ 叫**分支点**；$e_{q} = 1$ 时 $p$ 在 $q$ 局部双全纯。',
      ].join('\n'),
      notes: [
        '局部形状就是 $z \\mapsto z^{e}$ 乘一个不消失的全纯函数 —— 所以「$e$ 对 $1$」是唯一的局部模型，没有第二种可能。',
        '⭐ **求和恒等式（RH 里那个求和的意义所在）**：对每个 $r \\in X$，',
        '',
        '$$\\sum_{q \\in p^{-1}(r)} e_{q} = d ,$$',
        '',
        '即「按分歧指数计重数的原像个数恒等于次数 $d$」。它保证了 $d$ 与 $r$ 无关（下面的 RH 公式要用）。',
        '⚠️ $e_{q}$ 就是**零点重数**：$p - r$ 是 $Y$ 上的全纯函数（常值 $r$ 的拉回），$q$ 是它的 $e_{q}$ 重零点。',
        '所以「分歧」不是新现象，就是「$p - r$ 的零点不单重」。',
        '📌 对 $d$ 次分支覆盖，$\\sum_{q}(e_{q} - 1)$ 是一个**有限和**：只有分歧点贡献（$e_q = 1$ 时贡献 $0$）。',
      ].join('\n\n'),
      refs: ['Miranda, Algebraic Curves and Riemann Surfaces, Ch. II', 'Forster, Lectures on Riemann Surfaces, §4'],
    },

    /* ------------------------------------------------------ Riemann–Hurwitz */
    {
      id: 'thm.riemann-hurwitz',
      cluster: 'topology.surfaces',
      type: 'theorem',
      label: 'Riemann–Hurwitz 公式',
      title: 'Riemann–Hurwitz：分支覆盖下亏格怎么变',
      regions: ['topology', 'complex'],
      tags: ['定理', 'Riemann 面', '亏格', '曲面'],
      statement: [
        '设 $p : Y \\to X$ 是紧 Riemann 面之间的 $d$ 次**分支覆盖**（`def.branched-cover`），$g_{X}, g_{Y}$ 是两边的亏格（`def.genus`），$\\{e_{q}\\}$ 是分歧指数（`def.ramification-index`）。记',
        '',
        '$$R := \\sum_{q \\in Y} (e_{q} - 1)$$',
        '',
        '（分歧除子的次数：按 $e_q - 1$ 计，**不是**分支点个数）。则',
        '',
        '$$2g_{Y} - 2 = d\\,(2g_{X} - 2) + R .$$',
        '',
        '换成 Euler 示性数的写法更整齐（`prop.eulerchar-genus`）：',
        '',
        '$$\\chi(Y) = d\\,\\chi(X) - R .$$',
      ].join('\n'),
      notes: [
        '**证明**：核心是「把 $X$ 的一个三角剖分沿 $p$ 拉成 $Y$ 的一个有限 CW 剖分，再数 $0,1,2$ 维胞腔」。',
        '**记号**：$B \\subset X$ 是分支点集（有限），$p^{-1}(B)$ 是分歧点集；对 $r \\in X$ 记 $p^{-1}(r) = \\{q_{1}, \\ldots, q_{m_{r}}\\}$，则 `def.ramification-index` 的求和恒等式给出',
        '$$\\sum_{i=1}^{m_{r}} e_{q_{i}} = d,\\qquad\\text{即}\\qquad m_{r} = d - \\sum_{i}(e_{q_{i}} - 1).$$',
        '特别地 $r \\notin B$ 时 $m_{r} = d$。',
        '**引理（适配三角剖分）**：存在 $X$ 的有限三角剖分 $K$，使 (i) $B$ 中每个点都是 $K$ 的顶点；(ii) 对 $K$ 的每个开单纯形 $\\sigma$，$p^{-1}(\\sigma) \\to \\sigma$ 是 $d$ 重覆叠，且每个连通分支同胚地映到 $\\sigma$。',
        '证明：对 $X$ 的每点取「适配图卡」：$x \\notin B$ 时取使 $p$ 平凡化的图卡 $U_{x}$（$p^{-1}(U_{x}) \\cong U_{x} \\times \\{1, \\ldots, d\\}$）；$b \\in B$ 时取以 $b$ 为原点的图卡，使 $p$ 呈 $z \\mapsto z^{e_{q}}$ 的形状。这些开集覆盖紧空间 $X$，取有限子覆盖。曲面论的标准事实：$X$ 有有限三角剖分，且可取得从属于这个有限开覆盖、并把指定的有限点集 $B$ 全部取为顶点（先给 $X$ 任一三角剖分，再在 $B$ 处做重心重分并把 $B$ 细化成顶点，最后用 Lebesgue 数保证每个闭单纯形落在某个覆盖成员里）。于是每个开单纯形 $\\sigma$ 落在某个适配图卡 $U$ 里。若 $U$ 无分支，$p$ 在 $U$ 上平凡，结论成立；若 $U$ 是以 $b$ 为原点的分歧图卡，则 $\\sigma$ 不含 $b$（$b$ 已是顶点，开单纯形不含顶点），而 $U \\setminus \\{b\\}$ 上的 $p$ 是覆叠映射，$\\sigma$ 单连通，故覆叠在 $\\sigma$ 上平凡。',
        '**引理（拉回剖分与计数）**：把 $Y$ 写成 $X$ 的开单纯形的原像之并：$0$-胞腔 $=$ 顶点原像，$1$-胞腔 $=$ 开边的原像分支，$2$-胞腔 $=$ 开面的原像分支。这是一个有限 CW 剖分，且',
        '$$V_{Y} = d\\,V_{X} - R,\\qquad E_{Y} = d\\,E_{X},\\qquad F_{Y} = d\\,F_{X}.$$',
        '证明：$1$-胞腔与 $2$-胞腔部分由上一个引理直接给出（每个开边/开面有 $d$ 个分支）。$0$-胞腔：对每个顶点 $x$，原像个数是 $m_{x}$；对 $x \\notin B$ 它是 $d$，对 $x = b \\in B$ 它是 $d - \\sum_{q|b}(e_{q} - 1)$。求和',
        '$$V_{Y} = \\sum_{x \\in V_{X}} m_{x} = d\\,V_{X} - \\sum_{b \\in B}\\sum_{q|b}(e_{q} - 1) = d\\,V_{X} - R,$$',
        '因为只有分歧点使 $e_{q} > 1$，非分歧点对 $R$ 的贡献是 $0$，而 $R$ 按定义就是全部分歧点求和。',
        '「这是 CW 剖分」需要说明 2-胞腔的闭包是闭圆盘：在分歧点的模型 $z \\mapsto z^{e}$ 下，$e$ 个扇区（2-胞腔）共享顶点 $q$，每个扇区的闭包是一个闭三角形，$e$ 个扇区拼成 $q$ 的一个邻域圆盘；在非分歧点同理。于是每个 2-胞腔的闭包是闭圆盘，贴合映射连续，确实给出有限 CW 结构。',
        '**收尾**：CW 剖分的 Euler 示性数按胞腔数计算，',
        '$$\\chi(Y) = V_{Y} - E_{Y} + F_{Y} = d(V_{X} - E_{X} + F_{X}) - R = d\\,\\chi(X) - R.$$',
        '再用 `prop.eulerchar-genus` 把 $\\chi(X) = 2 - 2g_{X}$、$\\chi(Y) = 2 - 2g_{Y}$ 代入，即得 $2g_{Y} - 2 = d(2g_{X} - 2) + R$。∎',
        '**等号条件（$g_{Y} = g_{X}$ 到底什么时候成立）**：由 $2g_{Y} - 2 = d(2g_{X} - 2) + R$，$g_{Y} = g_{X}$ 等价于',
        '$$d\\,(2g_{X} - 2) + R = 2g_{X} - 2,\\qquad\\text{即}\\qquad (d - 1)(2g_{X} - 2) = -R.$$',
        '因为 $d \\ge 1$、$R \\ge 0$，分三种情形：',
        '- $g_{X} \\ge 2$：$(d - 1)(2g_{X} - 2) \\ge 0$，要等于 $-R \\le 0$，只能 $d = 1$ 且 $R = 0$（双全纯）。',
        '- $g_{X} = 1$：$0 = -R$，故 $R = 0$；$d$ 任意（环面的无分歧覆叠）。',
        '- $g_{X} = 0$：等式变成 $R = 2d - 2$。$d = 2$ 时 $R = 2$，例如两个 $e = 2$ 的分支点；$z^{2} : \\mathbb{P}^{1} \\to \\mathbb{P}^{1}$ 正是这种情形（$d = 2$、两个分支点、$R = 2$），仍有 $g_{Y} = g_{X} = 0$。',
        '⚠️ **不要把 $R$ 和「分支点个数」混用**：一个分支点 $b$ 贡献的是 $\\sum_{q|b}(e_{q} - 1) = d - m_{b}$，可以大于 $1$（例如 $z^{3}$ 在 $0$ 处 $e = 3$，贡献 $2$）。也不要把「$g_{Y} = g_{X}$」直接说成「$d = 1$ 且无分歧」——$g_{X} = 0$ 的反例正是 $z^{2}$。',
        '**例子（超椭圆曲线）**：$y^{2} = \\prod_{i=1}^{2g+2}(x - a_{i})$ 定义 $\\mathbb{P}^{1}$ 的 $2$ 次分支覆盖，分支点是 $2g+2$ 个互不相同的 $a_{i}$（每个 $e = 2$，贡献 $1$），故 $R = 2g + 2$。代入：$2g_{Y} - 2 = 2(-2) + (2g + 2) = 2g - 2$，即 $g_{Y} = g$。',
        '⚠️ **依赖**：收尾用了 `prop.eulerchar-genus`（本图该节点仍是 skeleton），以及「紧曲面有有限三角剖分」这一标准事实（Rado 定理本图也是 skeleton）。本证明没有用到闭曲面分类。',
      ].join('\n\n'),
      refs: [
        'Hurwitz, Über Riemannsche Flächen mit gegebenen Verzweigungspunkten (1891)',
        'Miranda, Algebraic Curves and Riemann Surfaces, Ch. II §2',
        'Forster, Lectures on Riemann Surfaces, §17',
      ]
    },
  ],

  edges: [
    /* -------- 分支覆盖的原料 -------- */
    {
      id: 'dep.cover-branchedcover',
      kind: 'definition',
      definition: 'def.covering-space',
      usedBy: 'def.branched-cover',
      note: '分支覆盖 = 去掉有限个分支点之后的**覆叠映射**，所以那条定义的「层」「局部同胚」直接搬过来用。',
    },
    {
      id: 'dep.riemannsurface-branchedcover',
      kind: 'definition',
      definition: 'def.riemann-surface',
      usedBy: 'def.branched-cover',
      note: '两边都是**紧** Riemann 面；紧性保证层数与分支点有限。',
    },
    {
      id: 'dep.holomorphic-branchedcover',
      kind: 'definition',
      definition: 'def.holomorphic',
      usedBy: 'def.branched-cover',
      note: '局部形状 $z \\mapsto z^{e}$ 是「非常数全纯」的推论（开映射 + 零点孤立），不是额外假设。',
    },
    /* -------- 分歧指数 -------- */
    {
      id: 'dep.riemannsurface-ramification',
      kind: 'definition',
      definition: 'def.riemann-surface',
      usedBy: 'def.ramification-index',
      note: '局部坐标要靠复结构才写得出来。',
    },
    {
      id: 'dep.branchedcover-ramification',
      kind: 'definition',
      definition: 'def.branched-cover',
      usedBy: 'def.ramification-index',
      note: '「次数 $d$」「分支点」这些词都是从分支覆盖那条定义来的；分歧指数是给它们配的数。',
    },
    {
      id: 'dep.holomorphic-ramification',
      kind: 'definition',
      definition: 'def.holomorphic',
      usedBy: 'def.ramification-index',
      note: '分歧指数是「非常数全纯映射」的局部不变量。',
    },
    {
      id: 'dep.branchedcover-riemannhurwitz',
      kind: 'definition',
      definition: 'def.branched-cover',
      usedBy: 'thm.riemann-hurwitz',
      note: '公式的假设就是「$d$ 次分支覆盖」。',
    },
    /* -------- RH 的三块原料 -------- */
    {
      id: 'dep.ramification-riemannhurwitz',
      kind: 'definition',
      definition: 'def.ramification-index',
      usedBy: 'thm.riemann-hurwitz',
      note: '公式里的求和号 $\\sum(e_{q} - 1)$ 就是分歧指数在分歧点上求和。',
    },
    {
      id: 'dep.genus-riemannhurwitz',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'thm.riemann-hurwitz',
      note: '公式两边都是亏格；亏格在这里用同调定义（$g = \\tfrac12 \\operatorname{rank} H_{1}$），所以不会绕回分类定理。',
    },
    {
      id: 'dep.eulerchar-riemannhurwitz',
      kind: 'implication',
      sources: ['prop.eulerchar-genus'],
      target: 'thm.riemann-hurwitz',
      proof: 'Riemann–Hurwitz 的原形是 $2g(S)-2=n(2g(T)-2)+\\sum_{p}(e_{p}-1)$；代入 $\\chi=2-2g$（`prop.eulerchar-genus`）即得 $\\chi(S)=n\\chi(T)-\\sum_{p}(e_{p}-1)$。∎',
      note: '换成 $\\chi$ 的写法要用 $\\chi = 2 - 2g$ 这条命题。',
    },
  ],
});
