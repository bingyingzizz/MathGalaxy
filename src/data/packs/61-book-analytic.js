/* ==========================================================================
   内容包 · §8.2 的解析侧练习与两条拓扑引理（8.4 ~ 8.7）
   --------------------------------------------------------------------------
   K-有界正合（定义 8.2.1）那一节的正文进图了，但支撑它的几条练习还缺：

     K-有界正合沿滤过余极限保持（8.4）
     C(S, M) 是（半）范数 / Banach 阿贝尔群；Stone 上 C(S, M^disc) 稠密（8.5）
     闭映射的邻域基（8.6） ·  仿紧 / 正规 ⟺ 单位分解（8.7）

   前两条是「把半范数那一层算清楚」，
   后两条是 Tietze 延拓（8.2.7）证明里用到的拓扑准备工作。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'K-有界正合的解析准备与延拓引理',
  nodes: [

    /* ------------------------------------------------------ 8.4 */
    {
      id: 'prop.k-bounded-exact-filtered-colimit',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'K-有界正合沿滤过余极限保持',
      title: '命题：等距转移下的滤过余极限保持 $K$-有界正合',
      regions: ['condensed'],
      tags: ['命题', '半范数', 'K-有界正合', '滤过余极限'],
      statement: [
        '设 $M^{\\bullet} = \\varinjlim_{k} M^{\\bullet}_{k}$ 是半范数阿贝尔群复形的**滤过余极限**，且转移映射都是**等距**的。若每个 $M^{\\bullet}_{k}$ 在 $M^{n}_{k}$ 处 $K$-有界正合，则 $M^{\\bullet}$ 在 $M^{n}$ 处 $K$-有界正合。'
      ].join('\n'),
      notes: [
        ['**证明。** 等距转移映射给出两条关键事实：余极限的**半范数就是代表元的半范数**（所有代表元范数相同，否则沿等距映射传递会矛盾）✓；微分与转移映射交换，因此 $\\|d s\\| = \\|d s_{k}\\|$ 对任何代表元 $s_{k} \\mapsto s$ 成立 ✓。','给定 $s \\in M^{n}$ 与 $\\varepsilon > 0$：取代表元 $s_{k} \\in M^{n}_{k}$（余极限的元素都是某个有限阶段的元素）✓；在 $M^{\\bullet}_{k}$ 里用 $K$-有界正合，得到 $s\'_{k} \\in M^{n+1}_{k}$ 使','$$\\|s_{k} - d^{n+1}s\'_{k}\\| \\le K\\,\\|d^{n}s_{k}\\| + \\varepsilon.$$','把 $s\'_{k}$ 映进余极限得 $s\' \\in M^{n+1}$，再由等距性与微分的交换性，左边与右边逐项搬过去：','$$\\|s - d^{n+1}s\'\\| = \\|s_{k} - d^{n+1}s\'_{k}\\| \\le K\\,\\|d^{n}s_{k}\\| + \\varepsilon = K\\,\\|d^{n}s\\| + \\varepsilon ✓$$','这正是 $K$-有界正合在 $M^{n}$ 处的要求 ✓。∎'].join('\n'),
        '⭐ 用处：$K$-有界正合这件「带常数的解析性质」在**往大的复形里并**时不会丢 —— 于是可以先用有限 / 简单的复形验条件，再取余极限。',
        '⚠️ **等距**这一条不能省：若转移映射只是连续而范数会缩小，余极限上的半范数就变成「代表元范数的下确界」，上面的 $\\|d s\\| = \\|d s_{k}\\|$ 立刻失效。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.2']
    },

    /* ------------------------------------------------------ 8.5 */
    {
      id: 'prop.continuous-functions-normed',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '连续函数空间的范数',
      title: '命题：$C(S, M)$ 是（半）范数 / Banach 阿贝尔群，且 Stone 上离散值函数稠密',
      regions: ['condensed'],
      tags: ['命题', 'Banach', '连续函数', '稠密'],
      statement: [
        '设 $S$ 是**紧 Hausdorff** 空间，$M$ 是（半）范数阿贝尔群（相应地 Banach 阿贝尔群）。则',
        '',
        '1. 连续同态 $C(S, M) := \\operatorname{Hom}_{\\mathrm{top}}(S, M)$ 配以',
        '$$\\|f\\| := \\sup_{x \\in S}\\|f(x)\\|$$',
        '是（半）范数阿贝尔群（相应地 Banach 阿贝尔群）；',
        '2. 若 $S$ 还是 **Stone** 空间，则 $C(S, M^{\\mathrm{disc}})$ 在 $C(S, M)$ 中**稠密**。'
      ].join('\n'),
      notes: [
        ['**证明。**','**1.** $\\sup$ 有限：连续函数在紧空间上有界（$f(S)$ 紧，而范数球的半径有限）✓；三条半范数公理由 $M$ 的半范数逐点验证、再取上确界 ✓；$\\|f\\| = 0 \\implies f = 0$ 当且仅当 $M$ 是 Hausdorff 的（即范数而非半范数）✓。','**完备性**：设 $(f_{j})$ 是 $\\|\\cdot\\|$ 下的 Cauchy 列，则每个 $x$ 处 $(f_{j}(x))$ 是 Cauchy 列，由 $M$ 完备有极限 $f(x)$ ✓；Cauchy 列是**一致**Cauchy 的（$\\|f_{j}-f_{k}\\| < \\varepsilon$ 对每个 $x$ 成立），故 $f_{j} \\to f$ **一致**，一致极限保持连续性 ✓，于是 $M$ 完备时 $C(S,M)$ 完备 ✓。','**2.** 给 $f \\in C(S, M)$ 与 $\\varepsilon > 0$。开覆盖','$$S = \\bigcup_{m \\in M} f^{-1}\\bigl(B(m, \\varepsilon/2)\\bigr)$$','由 $S$ 是 Stone 空间，它有**有限的、两两不交的闭开加细** $S = \\bigsqcup_{r} S_{r}$（Stone 空间上任何开覆盖都有这样的加细）✓。在每个 $S_{r}$ 上任取 $m_{r}$ 使 $S_{r} \\subseteq f^{-1}(B(m_{r},\\varepsilon/2))$ ✓，令 $g := m_{r}$ 在 $S_{r}$ 上。则 $g$ **局部常值**，即映入离散群 $M^{\\mathrm{disc}}$ 的连续函数 ✓，且逐点 $\\|f - g\\| \\le \\varepsilon/2$ ✓，故 $\\|f-g\\| \\le \\varepsilon/2 < \\varepsilon$ ✓。于是 $C(S,M^{\\mathrm{disc}})$ 稠密 ✓。∎'].join('\n'),
        '⭐ 第 2 条是「**离散值函数足够多**」的精确版本：Stone 空间上任何连续 $M$-值函数都可以用局部常值函数一致逼近。它在 Banach 系数零调（8.2.6 / 8.2.8）的证明里是关键一步。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.2']
    },

    /* ------------------------------------------------------ 8.6 */
    {
      id: 'prop.closed-map-neighborhood-basis',
      cluster: 'topology.general',
      type: 'proposition',
      label: '闭映射的邻域基',
      title: '命题：闭映射下 $\\pi^{-1}(A)$ 的邻域基',
      regions: ['topology'],
      tags: ['命题', '拓扑', '闭映射', '邻域基'],
      statement: [
        '设 $\\pi : Y \\to X$ 是**闭**连续映射，$A \\subseteq X$。则「$A$ 的邻域的原像」',
        '',
        '$$\\bigl\\{\\, \\pi^{-1}(U) \\;:\\; U \\text{ 是 } A \\text{ 在 } X \\text{ 中的邻域} \\,\\bigr\\}$$',
        '',
        '构成 $\\pi^{-1}(A)$ 在 $Y$ 中的一个**邻域基**。'
      ].join('\n'),
      notes: [
        ['**证明。** 设 $V \\subseteq Y$ 是 $\\pi^{-1}(A)$ 的开邻域。取','$$U := X \\setminus \\pi(Y \\setminus V).$$','$\\pi$ **闭**说明 $\\pi(Y\\setminus V)$ 闭，故 $U$ 是开集 ✓。逐条验：','- **$A \\subseteq U$**：若 $a \\in A$，则 $\\pi^{-1}(a) \\subseteq \\pi^{-1}(A) \\subseteq V$，故 $\\pi^{-1}(a) \\cap (Y\\setminus V) = \\emptyset$，即 $a \\notin \\pi(Y\\setminus V)$，于是 $a \\in U$ ✓；','- **$\\pi^{-1}(U) \\subseteq V$**：若 $y \\in \\pi^{-1}(U)$，则 $\\pi(y) \\notin \\pi(Y\\setminus V)$，特别地 $y \\notin Y \\setminus V$，即 $y \\in V$ ✓。','于是每个 $\\pi^{-1}(A)$ 的开邻域 $V$ 都含着一个形如 $\\pi^{-1}(U)$ 的邻域，即这一族构成邻域基 ✓。∎'].join('\n'),
        '⭐ 一句话：**闭映射把「$A$ 的邻域」原样搬成「$\\pi^{-1}(A)$ 的邻域」**。这条在构造延拓时用来把「局部定义域」从 $X$ 抬到 $Y$ 而不丢失信息（延拓定理证明里的标准一步）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.3']
    },

    /* ------------------------------------------------------ 8.7 */
    {
      id: 'prop.paracompact-partition-unity',
      cluster: 'topology.general',
      type: 'proposition',
      label: '仿紧性与单位分解',
      title: '命题：仿紧 Hausdorff / 正规 $\\iff$ 单位分解存在',
      regions: ['topology'],
      tags: ['命题', '拓扑', '仿紧', '正规', '单位分解'],
      statement: [
        '对拓扑空间 $X$：',
        '',
        '1. $X$ 是**仿紧 Hausdorff** 空间 $\\iff$ 每个开覆盖都有一族从属于它的**单位分解**；',
        '2. $X$ 是**正规**空间 $\\iff$ 每个**局部有限**开覆盖都有一族从属于它的单位分解。'
      ].join('\n'),
      notes: [
        ['**证明（两个方向）。**','**$(\\Longleftarrow)$ 单位分解给出局部有限的加细。** 设 $\\{\\rho_{i}\\}$ 是从属于覆盖 $\\{U_{i}\\}$ 的单位分解。由单位分解的定义，$\\operatorname{supp}\\rho_{i} \\subseteq U_{i}$ 且这族支撑是**局部有限**的 ✓；于是 $\\{ \\rho_{i}^{-1}\\bigl((0,1]\\bigr) \\}$ 是 $\\{U_{i}\\}$ 的一个开加细，且仍然局部有限（每个点是有限多个支撑之外的点）✓ —— 这正是仿紧（在 Hausdorff 前提下）要求的「每个开覆盖都有局部有限开加细」。正规的情形同理（局部有限覆盖取局部有限的 $\\{\\operatorname{supp}\\rho_{i}\\}$）✓。','**$(\\Longrightarrow)$ 用正规性逐步造 $\\rho_{i}$。**','- 先取一个**局部有限**的开加细 $\\{V_{i}\\}$（仿紧的定义；正规的情形直接取自局部有限覆盖本身）✓；','- 正规性给出：存在开集 $W_{i}$ 使 $\\overline{W_{i}} \\subseteq V_{i}$ 且 $\\{W_{i}\\}$ 仍覆盖 $X$（这是正规空间的标准「收缩」引理，由 Urysohn 引理或它的变体得到）✓；','- 对每对 $(\\overline{W_{i}}, X \\setminus V_{i})$（不交闭集）用 **Urysohn 引理**取连续函数 $g_{i} : X \\to [0,1]$ 使 $g_{i}|_{\\overline{W_{i}}} = 1$、$g_{i}|_{X\\setminus V_{i}} = 0$ ✓；','- 令 $g := \\sum_{i} g_{i}$：局部有限性保证这是**局部有限和**，故 $g$ 连续 ✓，且因为 $\\{W_{i}\\}$ 覆盖 $X$，每点处 $g \\ge 1$（至少一项为 1）✓；','- 取 $\\rho_{i} := g_{i}/g$ ✓：非负、和恒为 1、$\\operatorname{supp}\\rho_{i} \\subseteq V_{i} \\subseteq U_{i}$，且支撑仍局部有限 ✓。','于是得到从属于原覆盖的单位分解 ✓。∎'].join('\n'),
        '⭐ 这条是**延拓定理的引擎**：单位分解把「局部定义的东西」加权求和成整体定义的函数 —— Tietze / Dugundji 型延拓、流形上的积分与 Stokes 定理，用的都是这一招。',
        '⚠️ **局部有限不能省**：没有局部有限性，$\\sum \\rho_{i} = 1$ 只是一个「点态」的断言，逐点求和出来的函数未必连续。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.3']
    }

  ],

  edges: [

    /* ------------------------------- 定义引用（蓝线） ------------------------------- */
    {
      id: 'def-link.kbfc-kbounded',
      kind: 'definition',
      definition: 'def.k-bounded-exact',
      usedBy: 'prop.k-bounded-exact-filtered-colimit',
      note: '命题要证的就是「$K$-有界正合」在滤过余极限下保持。'
    },
    {
      id: 'def-link.kbfc-seminorm',
      kind: 'definition',
      definition: 'def.semi-normed-ab-group',
      usedBy: 'prop.k-bounded-exact-filtered-colimit',
      note: '讨论的对象是半范数阿贝尔群的复形，等距性是按半范数说的。'
    },
    {
      id: 'def-link.cfn-banach',
      kind: 'definition',
      definition: 'def.banach-ab-group',
      usedBy: 'prop.continuous-functions-normed',
      note: '结论里出现 Banach 阿贝尔群（系数的完备性传给连续函数空间）。'
    },
    {
      id: 'def-link.cfn-seminorm',
      kind: 'definition',
      definition: 'def.semi-normed-ab-group',
      usedBy: 'prop.continuous-functions-normed',
      note: '上确界范数是按系数的半范数定义的。'
    },
    {
      id: 'def-link.closedmap-closed',
      kind: 'definition',
      definition: 'def.closed-set',
      usedBy: 'prop.closed-map-neighborhood-basis',
      note: '证明里用了「闭映射把闭集送到闭集」与开集的定义。'
    },
    {
      id: 'def-link.closedmap-cont',
      kind: 'definition',
      definition: 'def.continuous-map',
      usedBy: 'prop.closed-map-neighborhood-basis',
      note: '$\\pi$ 是连续的闭映射。'
    },
    {
      id: 'def-link.pcpu-normal',
      kind: 'definition',
      definition: 'def.normal-space',
      usedBy: 'prop.paracompact-partition-unity',
      note: '第二条说的就是正规空间里的单位分解。'
    },
    {
      id: 'def-link.pcpu-urysohn',
      kind: 'definition',
      definition: 'lem.urysohn',
      usedBy: 'prop.paracompact-partition-unity',
      note: '构造 $g_{i}$ 那一步用的是 Urysohn 引理。'
    }

  ]
});
