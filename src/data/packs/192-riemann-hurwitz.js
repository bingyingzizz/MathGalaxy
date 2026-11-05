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
      status: 'skeleton',
      statement: [
        '设 $p : Y \\to X$ 是紧 Riemann 面之间的 $d$ 次**分支覆盖**（`def.branched-cover`），$g_{X}, g_{Y}$ 是两边的亏格（`def.genus`），$\\{e_{q}\\}$ 是分歧指数（`def.ramification-index`）。则',
        '',
        '$$2g_{Y} - 2 = d\\,(2g_{X} - 2) + \\sum_{q \\in Y} (e_{q} - 1) .$$',
        '',
        '换成 Euler 示性数的写法更整齐（`prop.eulerchar-genus`）：',
        '',
        '$$\\chi(Y) = d\\,\\chi(X) - \\sum_{q \\in Y}(e_{q} - 1) .$$',
      ].join('\n'),
      notes: [
        '⚠️ **本节点只给陈述与结构，不是完整证明。** 证明要用两件本图还没细做的东西：',
        '',
        '1. **拉回剖分**：把 $X$ 的一个三角剖分沿 $p$ 拉回成 $Y$ 的三角剖分（这要用三角剖分的局部结构 + 紧性）。',
        '2. **分支点局部计数**：在一个分支点附近，$d$ 个原像里有 $e_{q}$ 个「粘成一点」，于是顶点数少了 $e_{q} - 1$；把所有点加起来就是求和号。',
        '',
        '两步拼起来就是 $\\chi(Y) = d\\,\\chi(X) - \\sum(e_{q}-1)$，再用 $\\chi = 2 - 2g$ 换回亏格。',
        '⭐ **两个立刻可用的推论**：',
        '',
        '- $g_{Y} \\ge g_{X}$（$d \\ge 1$、求和项 $\\ge 0$）；等号当且仅当 $d(2g_{X} - 2) + R = 2g_{X} - 2$（**不**只有「$d = 1$ 且无分歧」：$z^{2} : \\mathbb{P}^{1} \\to \\mathbb{P}^{1}$ 有 $d = 2$、$R = 2$，仍给 $g_{Y} = g_{X} = 0$）；',
        '- **算亏格**：$\\mathbb{P}^{1}$ 上 $d$ 次分支覆盖的亏格由「分支点总分歧量」决定。经典例子：超椭圆曲线',
        '',
        '$$y^{2} = \\prod_{i=1}^{2g+2}(x - a_{i})$$',
        '',
        '是 $\\mathbb{P}^{1}$ 的 $2$ 次分支覆盖、恰有 $2g+2$ 个分支点（每个 $e = 2$），代入得 $2g_{Y} - 2 = 2(-2) + (2g+2) \\implies g_{Y} = g$。',
        '⚠️ 与 `thm.gauss-bonnet` 分工：GB 是 $\\chi$ 的**积分**版本（曲率），RH 是 $\\chi$ 的**乘性**版本（覆盖次数）——',
        '两者通过同一个 $\\chi$ 相认，但谁也不能替代谁。',
        '📌 出处：Riemann (1857) 的原型 + Hurwitz (1891) 的公式化；现代叙述见 Miranda Ch. II §2。',
      ].join('\n\n'),
      refs: [
        'Hurwitz, Über Riemannsche Flächen mit gegebenen Verzweigungspunkten (1891)',
        'Miranda, Algebraic Curves and Riemann Surfaces, Ch. II §2',
        'Forster, Lectures on Riemann Surfaces, §17',
      ],
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
      kind: 'definition',
      definition: 'prop.eulerchar-genus',
      usedBy: 'thm.riemann-hurwitz',
      note: '换成 $\\chi$ 的写法要用 $\\chi = 2 - 2g$ 这条命题。',
    },
  ],
});
