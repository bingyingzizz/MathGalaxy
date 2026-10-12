/* ==========================================================================
   内容包 · 原书第 4 章练习里的性质
   --------------------------------------------------------------------------
   4.4（登记在「底拓扑空间」上）· 4.6 · 4.7 · 4.9（连同 4.2.5）· 4.12 · 4.13
   都是 §4 里立刻会用到的性质。节点按「小节点」写：陈述短、notes 只留紧凑证明 + 一句读法。
   ⚠️ 4.5 与 4.8 没写：PDF 抽取把关键符号吃掉了（离散/常层那对符号、余积那个符号），读不准不编。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态集的性质',

  nodes: [

    /* ----------------------------------------------------- 4.2.5 + 4.9 */
    {
      id: 'prop.cond-epi-open-surjective',
      cluster: 'cond.set',
      type: 'proposition',
      label: '开满射是满态射',
      title: '命题：开满 + 弱 Hausdorff $\\implies$ 在 $\\mathrm{Cond}$ 里满',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '满态射', '弱 Hausdorff', '开映射'],
      statement: [
        '设 $f : X \\to Y$ 是连续映射。若 $Y$ **弱 Hausdorff**，且每个紧 Hausdorff 子集 $K \\subseteq Y$ 都含于某个 $f(S)$（$S$ 紧 Hausdorff），则 $f$ 在 $\\mathrm{Cond}$ 里是**满态射**。',
        '',
        '特例：$X$ 局部紧 Hausdorff、$Y$ 弱 Hausdorff、$f$ **开且满**时，上面的条件自动满足。'
      ].join('\n'),
      notes: [
        [
          '**证明。** 由「凝聚态集满态射的判据」，只需对每个**自由**紧 Hausdorff 空间 $F$ 验证 $C(F, X) \\to C(F, Y)$ 是满射 ✓。',
          '给 $g : F \\to Y$。因为 $F$ 紧、$Y$ 弱 Hausdorff，$g(F)$ 是紧 Hausdorff 子集 ✓，于是存在紧 Hausdorff $S \\subseteq X$ 使 $g(F) = f(S)$ ✓。',
          '$F$ 是紧 Hausdorff 范畴里的**投射对象**（自由即投射），所以 $F \\to f(S)$ 可提升为 $F \\to S$ ✓，再嵌回 $X$ 即得 $g$ 的原像 ✓。∎',
          '**特例的验证。** $X$ 局部紧时每个点有紧邻域 $S_x$；$f$ 开说明 $f(S_x)$ 是 $f(x)$ 的邻域，$f$ 满说明 $Y = \\bigcup_x f(S_x)$ ✓；$Y$ 里任何紧集被有限多个 $f(S_{x_i})$ 覆盖，取 $S := \\bigcup_i S_{x_i}$（有限并仍是紧 Hausdorff）✓。'
        ].join('\n'),
        '⭐ 这是「一个拓扑映射在两个拓扑空间之间是满态射」的可操作判据：**先看弱 Hausdorff，再看紧块的像够不够大**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Proposition 4.2.5, Exercise 4.9']
    },

    /* ----------------------------------------------------- 4.6 */
    {
      id: 'prop.open-covering-covering',
      cluster: 'cond.set',
      type: 'proposition',
      label: '开覆盖给出覆盖',
      title: '命题：开覆盖 $X = \\bigsqcup_{i} X_{i}$ $\\implies$ 它是覆盖',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '覆盖', '开覆盖'],
      statement: [
        '若 $X = \\bigcup_{i \\in I} X_{i}$ 是拓扑空间 $X$ 的**开覆盖**（$X_i$ 开），则把每个 $X_i$ 看成凝聚态集时，$(X_{i} \\to X)_{i \\in I}$ 是 $X$ 在 $\\mathrm{Cond}$ 中的一个**覆盖**。'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '**（一）$X = S$ 紧 Hausdorff。** 开覆盖可取有限子覆盖，而紧 Hausdorff 是正规的，每块开集里含一个闭邻域、闭子集紧 ✓ —— 于是把开覆盖换成**有限的紧覆盖**，而「有限族拼起来等于全空间」正是 $\\mathbf{FCHaus}$ 上预拓扑允许的覆盖 ✓。',
          '**（二）一般 $X$。** 取 $f : S \\to X$（$S$ 紧 Hausdorff），把覆盖拉回：$S = \\bigcup_i f^{-1}(X_{i})$ 仍是开覆盖，由 (一) 得 $(S \\times_{X} X_{i} \\to S)_{i}$ 是 $S$ 的覆盖 ✓；覆盖沿覆盖下降（传递性），于是 $(X_{i} \\to X)_{i}$ 是 $X$ 的覆盖 ✓。∎'
        ].join('\n'),
        '⭐ 用处：$\\mathrm{Cond}$ 里的覆盖可以**直接用拓扑的开覆盖**给出，这是后面「层在开集上算」的依据。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 4.6']
    },

    /* ----------------------------------------------------- 4.7 */
    {
      id: 'prop.hom-presheaf-sheaf',
      cluster: 'cond.set',
      type: 'proposition',
      label: 'Hom 预层是层',
      title: '命题：$U \\mapsto \\operatorname{Hom}_{/X}(U, Y)$ 是 $X$ 上的层',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '层', '截面', '拓扑斯'],
      statement: [
        '设 $X$ 是拓扑空间、$Y \\to X$ 是凝聚态集之间的态射（即 $Y \\in \\mathrm{Cond}/X$）。则预层',
        '',
        '$$U \\;\\longmapsto\\; Y(U) := \\operatorname{Hom}_{/X}\\bigl(\\underline{U},\\ Y\\bigr) \\qquad (U \\subseteq X \\text{ 开})$$',
        '',
        '是 $X$ 上的一个**层**。'
      ].join('\n'),
      notes: [
        [
          '**证明。** 由「开覆盖给出覆盖」，开覆盖 $U = \\bigcup_i U_{i}$ 给出 $\\mathrm{Cond}/X$ 里的覆盖 $\\coprod_i \\underline{U_{i}} \\to \\underline{U}$ ✓。',
          '而 $Y$ 是拓扑斯 $\\mathrm{Cond}/X$ 的对象，拓扑斯的对象对**标准拓扑**下的每个覆盖筛都满足下降 —— 层条件的定义正是「$\\operatorname{Hom}(-, Y)$ 把覆盖筛变成等化子」✓。',
          '把这条用在上面的覆盖上：$Y(U) \\to \\prod_i Y(U_{i}) \\rightrightarrows \\prod_{i,j} Y(U_{i} \\cap U_{j})$ 是等化子，正是 $U \\mapsto Y(U)$ 的层条件 ✓。∎'
        ].join('\n'),
        '⭐ 一句话：**「$X$ 上的开集给的截面」就是层**，因为开覆盖已经是 $\\mathrm{Cond}/X$ 里的覆盖。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 4.7']
    },

    /* ----------------------------------------------------- 4.12 */
    {
      id: 'prop.countable-colimit-qseparated',
      cluster: 'cond.set',
      type: 'proposition',
      label: '可数递增余极限是拟分离的',
      title: '命题：$X = \\varinjlim_{n} S_{n}$（含入、可数）$\\implies$ 拟分离',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '拟分离', '滤过余极限', '紧 Hausdorff'],
      statement: [
        '若 $X = \\varinjlim_{n \\in \\mathbb{N}} S_{n}$ 是一列紧 Hausdorff 空间沿**含入** $S_{n} \\hookrightarrow S_{n+1}$ 的拓扑余极限，则',
        '',
        '1. $X$ 作为凝聚态集是**拟分离**的；',
        '2. 这个余极限**在 $\\mathrm{Cond}$ 里算也一样**：$X \\cong \\varinjlim_{n} S_{n}$。'
      ].join('\n'),
      notes: [
        [
          '**证明。** 由「拟分离 $\\iff$ 含入过渡的滤过余极限」，含入过渡的滤过余极限总是拟分离的 ✓ —— 可数情形是它的特例。',
          '第二条是「元素从有限层来」：给紧 Hausdorff $T$ 与连续 $f : T \\to X$，因为 $T$ 紧而 $\\{S_{n}\\}$ 是递增的开覆盖式的逼近，$f(T)$ 落在某个 $S_{n}$ 里 ✓（这正是「紧集只能看见有限层」），于是 $f$ 来自某个 $T \\to S_{n}$ ✓。∎'
        ].join('\n'),
        '⭐ 用处：**局部紧 Hausdorff 空间就是这种可数递增余极限**（取它的紧块），所以它们的凝聚态版本总是拟分离的。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 4.12']
    },

    /* ----------------------------------------------------- 4.13 */
    {
      id: 'prop.qseparated-mono',
      cluster: 'cond.set',
      type: 'proposition',
      label: '拟分离嵌入底空间',
      title: '命题：$X$ 拟分离 $\\implies$ $X \\hookrightarrow X(\\cdot)$ 是单态射',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '拟分离', '单态射', '底空间'],
      statement: [
        '若 $X$ 是**拟分离**的凝聚态集，则典范映射',
        '',
        '$$X \\longrightarrow \\underline{X(\\cdot)}$$',
        '',
        '（把 $X$ 送到它的底拓扑空间 $X(\\cdot)$ 所代表的凝聚态集）是**单态射**。'
      ].join('\n'),
      notes: [
        [
          '**证明。** 只需对每个紧 Hausdorff $S$ 验证 $X(S) \\to \\underline{X(\\cdot)}(S) = C(S, X(\\cdot))$ 是单射 ✓（单态射按点检验）。',
          '由「可数递增余极限」那一条的推广（拟分离 $\\iff$ 含入过渡的滤过余极限），$X = \\varinjlim_i S_{i}$ 且 $X(S) = \\varinjlim_i \\operatorname{Hom}(S, S_{i})$ ✓。',
          '取 $f, g \\in X(S)$ 映到同一个连续映射：它们都来自某个 $i$ 的 $\\tilde f, \\tilde g : S \\to S_{i}$，而 $S_{i} \\hookrightarrow X(\\cdot)$ 是含入、特别地是单射 ✓，于是 $\\tilde f = \\tilde g$，从而 $f = g$ ✓。∎'
        ].join('\n'),
        '⭐ 读法：**拟分离的凝聚态集不会丢信息** —— 它整个能从底空间里被读回来。反面是一般凝聚态集的底空间会把精细结构抹掉。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 4.13']
    }

  ],

  edges: [

    {
      id: 'imp-link.condepi-opensurj',
      kind: 'implication',
      sources: ['prop.cond-epi'],
      target: 'prop.cond-epi-open-surjective',
      title: '满态射判据 $\\implies$ 开满射是满态射',
      proof: [
        '按「凝聚态集满态射的判据」，只需对每个自由紧 Hausdorff $F$ 验证 $C(F, X) \\to C(F, Y)$ 满 ✓。',
        '给 $g : F \\to Y$：$g(F)$ 紧 Hausdorff（$F$ 紧、$Y$ 弱 Hausdorff）✓，于是 $g(F) = f(S)$ 对某个紧 Hausdorff $S \\subseteq X$ ✓；$F$ 自由因而投射，$F \\to f(S)$ 可提升为 $F \\to S \\hookrightarrow X$ ✓，即 $g$ 有原像 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.condepi-wh',
      kind: 'definition',
      definition: 'def.weak-hausdorff',
      usedBy: 'prop.cond-epi-open-surjective',
      note: '假设里的一条：$Y$ 弱 Hausdorff。'
    },
    {
      id: 'def-link.opencov-pretop',
      kind: 'definition',
      definition: 'def.grothendieck-topology',
      usedBy: 'prop.open-covering-covering',
      note: '结论就是「这族映射是覆盖」，用的是覆盖的定义。'
    },
    {
      id: 'imp-link.opencov-hompresheaf',
      kind: 'implication',
      sources: ['prop.open-covering-covering'],
      target: 'prop.hom-presheaf-sheaf',
      title: '开覆盖是覆盖 $\\implies$ $\\operatorname{Hom}$ 预层是层',
      proof: [
        '开覆盖 $U = \\bigcup_i U_{i}$ 给出覆盖 $\\coprod_i \\underline{U_{i}} \\to \\underline{U}$ ✓，而拓扑斯里的对象对每个覆盖筛都满足下降（层条件就是「$\\operatorname{Hom}(-, Y)$ 把覆盖筛变成等化子」）✓，于是截面沿开覆盖的等化子条件成立，即 $U \\mapsto Y(U)$ 是层 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.ccolim-qsep',
      kind: 'definition',
      definition: 'def.quasi-separated',
      usedBy: 'prop.countable-colimit-qseparated',
      note: '结论说的就是拟分离。'
    },
    {
      id: 'def-link.qsepmono-underlying',
      kind: 'definition',
      definition: 'def.underlying-topological-space',
      usedBy: 'prop.qseparated-mono',
      note: '单态射的靶就是底拓扑空间代表的凝聚态集。'
    },
    {
      id: 'imp-link.ccolim-qsepmono',
      kind: 'implication',
      sources: ['prop.countable-colimit-qseparated'],
      target: 'prop.qseparated-mono',
      title: '拟分离即含入过渡的滤过余极限 $\\implies$ 嵌入底空间是单的',
      proof: [
        '若 $X = \\varinjlim_i S_{i}$（含入过渡），则 $X(S) = \\varinjlim_i \\operatorname{Hom}(S, S_{i})$ ✓；两个元素映到底空间里同一个连续映射时，它们来自某个 $S_{i}$，而 $S_{i} \\hookrightarrow X(\\cdot)$ 是含入、特别地单射，故两个元素相等 ✓。于是 $X(S) \\to C(S, X(\\cdot))$ 单射，对每个紧 Hausdorff $S$ 成立即得单态射 ✓。∎'
      ].join('\n')
    }

  ]
});
