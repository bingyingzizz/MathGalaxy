/* ==========================================================================
   内容包 · 原书第 7 章 §7.3–§7.4 练习里的性质（小节点）
   --------------------------------------------------------------------------
   7.43 · 7.45 · 7.47 · 7.48 · 7.49（层上同调的计算）
   7.51 · 7.52（拓扑斯态射给出的伴随）
   7.54 · 7.55 · 7.56（上同调的函子性与 Leray 谱序列）
   7.57–7.61（$j_{X!} \\dashv j_{X}^{-1}$ 这一对伴随的公式）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '层上同调与拓扑斯态射的性质',

  nodes: [

    /* ----------------------------------------------------- 7.43 */
    {
      id: 'prop.higher-cohomology-presheaf-zero',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '高次上同调预层的关联层为零',
      title: '命题：$n \\ne 0$ 时 $\\widetilde{H^{n}(M)} = 0$',
      regions: ['homology'],
      tags: ['命题', '上同调预层', '关联层', '内射消解'],
      statement: [
        '设 $M$ 是景 $\\mathcal{C}$ 上的阿贝尔层、$n \\ne 0$。则预层',
        '',
        '$$U \\longmapsto H^{n}(U,\\ M)$$',
        '',
        '的**关联层为零**：它的层化是零层。'
      ].join('\n'),
      notes: [
        '**证明。** 取 $M$ 的一条内射消解 $I^{\\bullet}$ ✓，则 $H^{n}(U, M) = H^{n}\\Gamma(U, I^{\\bullet})$ ✓。给一个上同调类 $s$，用它在某条覆盖的每一块上的代表上链 $c$：因为 $I^{\\bullet}$ 作为复形在每个点处正合，$c$ 在局部是某个上链的**边界** ✓ —— 于是 $s$ 限制到覆盖的每一块上都是 $0$ ✓，也就是说它在关联层里的芽为 $0$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.43']
    },

    /* ----------------------------------------------------- 7.45 */
    {
      id: 'prop.cech-higher-cohomology-presheaf',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '高次上同调预层没有 Čech 上同调',
      title: '命题：$n \\ne 0 \\implies \\check{H}^{p}\\bigl(H^{n}(M)\\bigr) = 0$',
      regions: ['homology'],
      tags: ['命题', 'Čech 上同调', '上同调预层', '层化'],
      statement: [
        '设 $M$ 是景上的阿贝尔层、$n \\ne 0$，并把 $H^{n}(M)$ 记作预层 $U \\mapsto H^{n}(U, M)$。则',
        '',
        '$$\\check{H}^{p}\\bigl(H^{n}(M)\\bigr) = 0 \\qquad (\\forall p \\ge 0).$$'
      ].join('\n'),
      notes: [
        '**证明。** 由「高次上同调预层的关联层为零」，$H^{n}(M)$ 层化之后是零层 ✓；而 Čech 上同调只依赖预层的**层化**（Čech 函子分解成两趟 $(-)^{+}$）✓ —— 零层上当然没有 Čech 上同调 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.45']
    },

    /* ----------------------------------------------------- 7.47 */
    {
      id: 'prop.cech-interval-vanishing',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '区间上没有高阶 Čech 上同调',
      title: '命题：$M$ 常 $\\implies \\check{H}^{n}([0,1], M) = 0$（$n \\ne 0$）',
      regions: ['homology'],
      tags: ['命题', 'Čech 上同调', '区间', '常层'],
      statement: [
        '设 $M$ 是 $[0,1]$ 上的**常**阿贝尔群。则',
        '',
        '$$\\check{H}^{n}\\bigl([0,1],\\ M\\bigr) = 0 \\qquad (n \\ne 0).$$'
      ].join('\n'),
      notes: [
        '**证明。** 先看加细：$[0,1]$ 的任一开覆盖都有形如',
        '$$[0,1] = \\bigcup_{k=0}^{r} I_{k}, \\qquad I_{k} \\cap I_{k+1} = J_{k} \\text{ 也是区间}$$',
        '的加细 ✓（画个图即可）。对这种「区间拼区间」的覆盖，增广 Čech 复形可以写出**显式同伦收缩** ✓，于是这个覆盖上的高阶 Čech 群为零 ✓。',
        '而 Čech 上同调是**沿覆盖取滤过余极限** ✓，加细上为零 $\\implies$ 极限上为零 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.47']
    },

    /* ----------------------------------------------------- 7.48 */
    {
      id: 'prop.cech-h1-equals-h1',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '一次 Čech 就是一次上同调',
      title: '命题：$\\check{H}^{1}(X, M) \\cong H^{1}(X, M)$',
      regions: ['homology'],
      tags: ['命题', 'Čech 上同调', '层上同调', '谱序列', '五项正合列'],
      statement: [
        '设 $\\mathcal{C}$ 是有纤维积的景、$X \\in \\mathcal{C}$、$M$ 是阿贝尔层。则',
        '',
        '$$\\check{H}^{1}(X,\\ M) \\;\\cong\\; H^{1}(X,\\ M).$$'
      ].join('\n'),
      notes: [
        [
          '**证明。** 用 Čech 到上同调的谱序列',
          '$$E^{p,q}_{2} = \\check{H}^{p}\\bigl(X,\\ H^{q}(M)\\bigr) \\implies H^{p+q}(X, M) ✓$$',
          '由「高次上同调预层没有 Čech 上同调」，$q \\ne 0$ 那一整块都为零 ✓，特别地 $E^{0,1}_{2} = 0$。',
          '再由第一象限谱序列的五项正合列',
          '$$0 \\to E^{1,0}_{2} \\to H^{1} \\to E^{0,1}_{2} \\to \\cdots$$',
          '最后一项为零，故 $E^{1,0}_{2} \\cong H^{1}$ ✓；而 $E^{1,0}_{2} = \\check{H}^{1}(X, H^{0}(M)) = \\check{H}^{1}(X, M)$ ✓（$H^{0}(M) = M$）。∎'
        ].join('\n'),
        '⭐ 于是**一次** Čech 上同调永远等于一次层上同调，高次才会差（差多少由谱序列量出来）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.48']
    },

    /* ----------------------------------------------------- 7.49 */
    {
      id: 'prop.acyclic-equivalent-conditions',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '无环性的四条等价说法',
      title: '命题：$M$ 无环 $\\iff$ 处处上同调为零 $\\iff$ 处处 Čech 为零',
      regions: ['homology'],
      tags: ['命题', '无环层', 'Čech 上同调', '层上同调'],
      statement: [
        '设 $M$ 是景 $\\mathcal{C}$ 上的阿贝尔层。以下四条等价：',
        '',
        '1. $M$ **无环**：$H^{n}(M) = 0$（$n \\ne 0$）；',
        '2. 对每个 $X \\in \\mathcal{C}$：$H^{n}(X, M) = 0$（$n \\ne 0$）；',
        '3. 对每个覆盖族 $\\mathfrak{X}$：$\\check{H}^{n}(\\mathfrak{X}, M) = 0$（$n \\ne 0$）；',
        '4. 对每个 $X \\in \\mathcal{C}$：$\\check{H}^{n}(X, M) = 0$（$n \\ne 0$）。'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '**(1) $\\iff$ (2)**：层上同调就是「高次上同调预层」的整体截面，$H^{n}(X, M) = \\Gamma\\bigl(X, H^{n}(M)\\bigr)$ ✓，两边同时为零 ✓。',
          '**(1) $\\implies$ (3)**：对固定覆盖用 Cartan–Leray 谱序列 $E^{p,q}_{2} = \\check{H}^{p}(\\mathfrak{X}, H^{q}(M)) \\implies H^{p+q}(X,M)$ ✓；(1) 让 $q \\ne 0$ 的行全为零、$H^{p+q}$ 也全为零（$p+q \\ne 0$），谱序列退化给出 $\\check{H}^{n}(\\mathfrak{X}, M) = 0$ ✓。',
          '**(3) $\\implies$ (4)**：$\\check{H}^{n}(X, -)$ 是沿覆盖取的滤过余极限 ✓，每个覆盖上都为零故为零 ✓。',
          '**(4) $\\implies$ (1)**：把同一句话反过来 —— 用 Čech 到上同调的谱序列逐次消去，$E^{p,q}_{2}$ 的右端全为零，故全为零 ✓。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.49']
    },

    /* ----------------------------------------------------- 7.51 */
    {
      id: 'prop.topos-morphism-abelian-adjunction',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '拓扑斯态射在阿贝尔群上给出伴随',
      title: '命题：$f^{-1} \\dashv f_{*}$ 升级到 $\\mathcal{T}(\\mathbf{Ab})$',
      regions: ['category'],
      tags: ['命题', '拓扑斯态射', '阿贝尔群', '正合', '伴随'],
      statement: [
        '设 $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是拓扑斯态射。则拉回 $f^{-1} : \\mathcal{T}\'(\\mathbf{Ab}) \\to \\mathcal{T}(\\mathbf{Ab})$ 有**右伴随** $f_{*}$，而且 $f^{-1}$ **正合**。'
      ].join('\n'),
      notes: [
        '**证明。** 在底层 $f^{-1} \\dashv f_{*}$ 且 $f^{-1}$ 正合 ✓；而阿贝尔群层的结构是**逐点**给的（群运算是态射、等式逐点验证），所以这对伴随连同正合性自动升级到 $\\mathbf{Ab}$ 这一层 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.51']
    },

    /* ----------------------------------------------------- 7.52 */
    {
      id: 'prop.inverse-image-tensor',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '拉回与内 Hom、张量积相容',
      title: '命题：$f_{*}\\operatorname{Hom}(f^{-1}M, N) = \\operatorname{Hom}(M, f_{*}N)$，$f^{-1}(M \\otimes N) \\cong f^{-1}M \\otimes f^{-1}N$',
      regions: ['category'],
      tags: ['命题', '拓扑斯态射', '张量积', '内 Hom', '拉回'],
      statement: [
        '设 $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是拓扑斯态射、$M, N$ 是阿贝尔群层。则',
        '',
        '$$f_{*}\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(f^{-1}M,\\ N\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M,\\ f_{*}N\\bigr), \\qquad f^{-1}\\bigl(M \\otimes_{\\mathbb{Z}} N\\bigr) \\cong f^{-1}M \\otimes_{\\mathbb{Z}} f^{-1}N.$$'
      ].join('\n'),
      notes: [
        '**证明。** 第一条把伴随 $f^{-1} \\dashv f_{*}$ 与内 Hom 的伴随性串起来 ✓（两边在测试对象上给出的自然同构是同一个）。',
        '第二条：$f^{-1}$ 是左伴随因而**保余极限** ✓，而张量积是幺半结构里的余极限（商的余核）✓；也可以逐点验证 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.52']
    },

    /* ----------------------------------------------------- 7.54 */
    {
      id: 'prop.cohomology-functoriality',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '上同调的函子性',
      title: '命题：$H^{n}(X\', M^{\\bullet}) \\to H^{n}\\bigl(f^{-1}(X\'), f^{-1}M^{\\bullet}\\bigr)$',
      regions: ['homology'],
      tags: ['命题', '层上同调', '拓扑斯态射', '拉回', '典范映射'],
      statement: [
        '设 $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是拓扑斯态射。则对 $X\' \\in \\mathcal{T}\'$ 与复形 $M^{\\bullet}$，存在**典范映射**',
        '',
        '$$H^{n}\\bigl(X\',\\ M^{\\bullet}\\bigr) \\longrightarrow H^{n}\\bigl(f^{-1}(X\'),\\ f^{-1}M^{\\bullet}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** 由伴随 $f^{-1} \\dashv f_{*}$，整体截面满足',
        '$$\\Gamma\\bigl(X\',\\ M\\bigr) = \\operatorname{Hom}(X\', M) = \\operatorname{Hom}\\bigl(f^{-1}(X\'),\\ f^{-1}M\\bigr) = \\Gamma\\bigl(f^{-1}(X\'),\\ f^{-1}M\\bigr) ✓$$',
        '而 $f^{-1}$ 正合、保内射 ✓，所以它把内射消解送到内射消解，两边取导出函子即得这条典范映射 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.54']
    },

    /* ----------------------------------------------------- 7.55 */
    {
      id: 'prop.derived-pushforward-composition',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '推前的复合',
      title: '命题：$Rf\'_{*} \\circ Rf_{*} = R(f\' \\circ f)_{*}$',
      regions: ['homology'],
      tags: ['命题', '推前', '导出函子', 'Grothendieck 谱序列'],
      statement: [
        '设 $\\mathcal{T} \\xrightarrow{\\ f\\ } \\mathcal{T}\' \\xrightarrow{\\ f\'\\ } \\mathcal{T}\'\'$ 是拓扑斯态射的序列。则',
        '',
        '$$Rf\'_{*} \\circ Rf_{*} \\;=\\; R(f\' \\circ f)_{*},$$',
        '',
        '并且有谱序列 $E^{p,q}_{2} = R^{p}f\'_{*}\\bigl(R^{q}f_{*}M\\bigr) \\implies R^{p+q}(f\' \\circ f)_{*}M$。'
      ].join('\n'),
      notes: [
        '**证明。** 这是 Grothendieck 谱序列的又一特例：$f_{*}$ 把内射层送到 $f\'_{*}$-零调对象 ✓，于是在 $\\Gamma\\bigl(X\'\', \\cdot\\bigr)$ 这一层套用 Grothendieck 谱序列即得 ✓；谱序列在 $f_{*}$ 严格保持内射时退化成上面那条等式 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.55']
    },

    /* ----------------------------------------------------- 7.56 */
    {
      id: 'thm.leray-spectral-sequence',
      cluster: 'hom.sheafcoh',
      type: 'theorem',
      label: 'Leray 谱序列',
      title: '定理：$E^{p,q}_{2} = H^{p}\\bigl(X\', R^{q}f_{*}M^{\\bullet}\\bigr) \\implies H^{p+q}\\bigl(f^{-1}X\', M^{\\bullet}\\bigr)$',
      regions: ['homology'],
      tags: ['定理', 'Leray 谱序列', '拓扑斯态射', '导出推前'],
      statement: [
        '设 $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是拓扑斯态射、$X\' \\in \\mathcal{T}\'$、$M^{\\bullet}$ 是 $\\mathcal{T}$ 里的阿贝尔群复形。则存在谱序列',
        '',
        '$$E^{p,q}_{2} \\;=\\; H^{p}\\bigl(X\',\\ R^{q}f_{*}M^{\\bullet}\\bigr) \\;\\Longrightarrow\\; H^{p+q}\\bigl(f^{-1}(X\'),\\ M^{\\bullet}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** 关键的一条是伴随给出的截面同构',
        '$$\\Gamma\\bigl(X\',\\ f_{*}M\\bigr) = \\Gamma\\bigl(f^{-1}(X\'),\\ M\\bigr) ✓$$',
        '把 $\\Gamma\\bigl(f^{-1}(X\'), \\cdot\\bigr)$ 写成 $\\Gamma(X\', \\cdot) \\circ f_{*}$，再套 Grothendieck 谱序列（$f_{*}$ 把内射送到 $f_{*}$ 的零调对象 —— 内射本身零调）✓，即得 ✓。∎',
        '⭐ 用处：**先在 $\\mathcal{T}$ 这一侧算 $R^{q}f_{*}$，再在 $\\mathcal{T}\'$ 那一侧算 $H^{p}$**，两层的信息由这条谱序列拼起来。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.56']
    },

    /* ----------------------------------------------------- 7.57 */
    {
      id: 'prop.abelian-slice-adjunction',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '切片上的正合左伴随',
      title: '命题：$j_{X!} \\dashv j_{X}^{-1}$ 且 $j_{X!}$ 正合',
      regions: ['category'],
      tags: ['命题', '切片拓扑斯', '正合左伴随', '阿贝尔群'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$X \\in \\mathcal{T}$。则函子',
        '',
        '$$j_{X}^{-1} : \\mathcal{T}(\\mathbf{Ab}) \\longrightarrow \\mathcal{T}/X(\\mathbf{Ab})$$',
        '',
        '有**左伴随** $j_{X!}$，而且 $j_{X!}$ **正合**。'
      ].join('\n'),
      notes: [
        '**证明。** 预层情形有显式公式',
        '$$j_{S!}M(U) = \\bigoplus_{s : U \\to S} M(s) ✓$$',
        '它明显是 $j_{S}^{-1}$ 的左伴随 ✓，正合性来自「$\\bigoplus$ 与拉回交换」✓。一般拓扑斯上把两边层化即得 ✓（正合性对层化保持，因为层化正合）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.57']
    },

    /* ----------------------------------------------------- 7.58 */
    {
      id: 'prop.slice-shriek-z',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '切片左伴随作用在 Z 上',
      title: '命题：$j_{X!}\\mathbb{Z} = \\mathbb{Z}\\cdot X$',
      regions: ['category'],
      tags: ['命题', '切片拓扑斯', '自由对象', '伴随'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$X \\in \\mathcal{T}$。则',
        '',
        '$$j_{X!}\\mathbb{Z} \\;=\\; \\mathbb{Z}\\cdot X.$$'
      ].join('\n'),
      notes: [
        '**证明。** 逐条用伴随：',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(j_{X!}\\mathbb{Z},\\ M\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z},\\ j_{X}^{-1}M\\bigr) = \\operatorname{Hom}\\bigl(\\mathbf{1}_{X},\\ j_{X}^{-1}M\\bigr) = \\operatorname{Hom}(X,\\ M) ✓$$',
        '最后一式用了「$X$ 上方的终对象给出 $\\operatorname{Hom}(\\mathbf{1}_{X}, j_X^{-1}M) = M(X) = \\operatorname{Hom}(X,M)$」✓。与 $\\mathbb{Z}\\cdot X$ 的万有性质比对，由米田引理即得 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.58']
    },

    /* ----------------------------------------------------- 7.59 */
    {
      id: 'prop.cohomology-slice-identification',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '切片上的上同调就是原上同调',
      title: '命题：$H^{n}\\bigl(\\mathbf{1}_{X}, j_{X}^{-1}M^{\\bullet}\\bigr) = H^{n}(X, M^{\\bullet})$',
      regions: ['category'],
      tags: ['命题', '切片拓扑斯', '层上同调', '保内射'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$X \\in \\mathcal{T}$、$M^{\\bullet}$ 是阿贝尔群复形。则',
        '',
        '$$H^{n}\\bigl(\\mathbf{1}_{X},\\ j_{X}^{-1}M^{\\bullet}\\bigr) \\;=\\; H^{n}\\bigl(X,\\ M^{\\bullet}\\bigr),$$',
        '',
        '其中 $\\mathbf{1}_{X}$ 是切片拓扑斯 $\\mathcal{T}/X$ 的终对象。'
      ].join('\n'),
      notes: [
        '**证明。** 先看 $0$ 次：',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z},\\ j_{X}^{-1}M\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(j_{X!}\\mathbb{Z},\\ M\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ M\\bigr) = M(X) ✓$$',
        '再用「$j_{X}^{-1}$ 有正合左伴随，因而保内射」✓，于是两边的内射消解一一对应，取导出函子即得等式 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.59']
    },

    /* ----------------------------------------------------- 7.60 */
    {
      id: 'prop.internal-hom-slice-value',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '内 Hom 的取值',
      title: '命题：$\\operatorname{Hom}_{\\mathbb{Z}}(M, N)(X) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(j_{X}^{-1}M, j_{X}^{-1}N\\bigr)$',
      regions: ['category'],
      tags: ['命题', '内 Hom', '切片拓扑斯', '伴随'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$X \\in \\mathcal{T}$、$M, N$ 是阿贝尔群层。则',
        '',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}(M, N)(X) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(j_{X!}j_{X}^{-1}M,\\ N\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(j_{X}^{-1}M,\\ j_{X}^{-1}N\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M,\\ j_{X*}j_{X}^{-1}N\\bigr).$$',
        '',
        '对一个**测试对象** $Z$ 也一样：$\\operatorname{Hom}(X, N)(Z) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(j_{Z}^{-1} X,\\ j_{Z}^{-1}N\\bigr)$（只是把 $X$ 换成 $Z$ 那一对伴随）。'
      ].join('\n'),
      notes: [
        '**证明。** 每一步都是一次伴随：内 Hom 的取值 $\\operatorname{Hom}_{\\mathbb{Z}}(M,N)(X) = \\operatorname{Hom}_{\\mathbb{Z}}(M, N)(\\mathbf{1}_{X})$ 与 $\\operatorname{Hom}_{\\mathbb{Z}}(j_{X}^{-1}M, j_{X}^{-1}N)$ 之间用 $j_{X!} \\dashv j_{X}^{-1}$ 搭桥 ✓，$j_{X}^{-1} \\dashv j_{X*}$ 则把中间的 Hom 换成最后一式 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.60']
    },

    /* ----------------------------------------------------- 7.61 */
    {
      id: 'prop.slice-shriek-projection',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '切片的投影公式',
      title: '命题：$j_{X!}(M \\otimes j_{X}^{-1}N) = j_{X!}M \\otimes N$',
      regions: ['category'],
      tags: ['命题', '切片拓扑斯', '投影公式', '张量积', '伴随'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$X \\in \\mathcal{T}$、$M, N$ 是阿贝尔群层。则',
        '',
        '$$j_{X!}\\bigl(M \\otimes_{\\mathbb{Z}} j_{X}^{-1}N\\bigr) = j_{X!}M \\otimes_{\\mathbb{Z}} N, \\qquad j_{X!}\\bigl(j_{X}^{-1}M \\otimes_{\\mathbb{Z}} N\\bigr) = M \\otimes_{\\mathbb{Z}} j_{X!}N.$$',
        '',
        '特别地',
        '',
        '$$M\\cdot X \\;:=\\; M \\otimes_{\\mathbb{Z}} \\mathbb{Z}\\cdot X \\;=\\; j_{X!}j_{X}^{-1}M.$$'
      ].join('\n'),
      notes: [
        '**证明。** 投影公式是「左伴随与封闭幺半结构相容」的一般现象：把两边的 Hom 用 $j_{X!} \\dashv j_{X}^{-1}$ 与张量–内 Hom 伴随对到同一处，由米田引理得同构 ✓。最后一式把 $N = \\mathbb{Z}$ 代入并记住 $j_{X!}\\mathbb{Z} = \\mathbb{Z}\\cdot X$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.61']
    }

  ],

  edges: [

    {
      id: 'def-link.higherpresheaf0-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.higher-cohomology-presheaf-zero',
      note: '命题说的是层上同调给出的那个预层。'
    },
    {
      id: 'def-link.cechhigher-cech',
      kind: 'definition',
      definition: 'def.cech-cohomology',
      usedBy: 'prop.cech-higher-cohomology-presheaf',
      note: '命题说这个预层的 Čech 上同调为零。'
    },
    {
      id: 'imp-link.higherpresheaf0-cechhigher',
      kind: 'implication',
      sources: ['prop.higher-cohomology-presheaf-zero'],
      target: 'prop.cech-higher-cohomology-presheaf',
      title: '关联层为零 $\\implies$ Čech 全为零',
      proof: [
        '$H^{n}(M)$ 的关联层为零 ✓，而 Čech 上同调只依赖预层的层化（Čech 函子分解成两趟 $(-)^{+}$）✓ —— 零层上取不到非零的 Čech 上同调 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.intervalvanish-cech',
      kind: 'definition',
      definition: 'def.cech-cohomology',
      usedBy: 'prop.cech-interval-vanishing',
      note: '结论是区间上的高阶 Čech 上同调为零。'
    },
    {
      id: 'imp-link.cechhigher-h1',
      kind: 'implication',
      sources: ['cor.cech-cohomology-spectral', 'prop.cech-higher-cohomology-presheaf', 'prop.five-term-spectral-sequence'],
      target: 'prop.cech-h1-equals-h1',
      title: 'Čech 到上同调谱序列 + 高次预层为零 $\\implies$ 一次 Čech 就是一次上同调',
      proof: [
        '谱序列 $E^{p,q}_{2} = \\check{H}^{p}(X, H^{q}(M)) \\implies H^{p+q}(X,M)$ ✓ 里，$q \\ne 0$ 的项全为零 ✓，特别地 $E^{0,1}_{2} = 0$。',
        '五项正合列 $0 \\to E^{1,0}_{2} \\to H^{1} \\to E^{0,1}_{2} \\to \\cdots$ ✓ 于是给出 $E^{1,0}_{2} \\cong H^{1}$，而 $E^{1,0}_{2} = \\check{H}^{1}(X, M)$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.acyclicconds-acyclic',
      kind: 'definition',
      definition: 'def.acyclic-sheaf',
      usedBy: 'prop.acyclic-equivalent-conditions',
      note: '命题给出「无环」的四条等价说法。'
    },
    {
      id: 'def-link.toposab-adjunction',
      kind: 'definition',
      definition: 'def.topos-morphism',
      usedBy: 'prop.topos-morphism-abelian-adjunction',
      note: '命题说的就是拓扑斯态射的那一对函子。'
    },
    {
      id: 'def-link.invtensor-tensor',
      kind: 'definition',
      definition: 'def.tensor-abelian-sheaf',
      usedBy: 'prop.inverse-image-tensor',
      note: '第二条公式里的张量积。'
    },
    {
      id: 'def-link.cohomfun-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.cohomology-functoriality',
      note: '映射的两端都是层上同调。'
    },
    {
      id: 'def-link.derivedcomp-toposmor',
      kind: 'definition',
      definition: 'def.topos-morphism',
      usedBy: 'prop.derived-pushforward-composition',
      note: '命题比较两条推前的复合。'
    },
    {
      id: 'def-link.leray-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'thm.leray-spectral-sequence',
      note: '谱序列两端都是层上同调。'
    },
    {
      id: 'imp-link.grothendieck-leray',
      kind: 'implication',
      sources: ['cor.grothendieck-spectral'],
      target: 'thm.leray-spectral-sequence',
      title: 'Grothendieck 谱序列 $\\implies$ Leray 谱序列',
      proof: [
        '由伴随，$\\Gamma\\bigl(f^{-1}(X\'), -\\bigr) = \\Gamma(X\', f_{*}-)$ ✓，即所考虑的函子是 $\\Gamma(X\',-)$ 与 $f_{*}$ 的复合。',
        '内射层是 $f_{*}$-零调的 ✓，于是 Grothendieck 谱序列给出 $E^{p,q}_{2} = H^{p}(X\', R^{q}f_{*}M^{\\bullet}) \\implies H^{p+q}(f^{-1}X\', M^{\\bullet})$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.sliceadj-slice',
      kind: 'definition',
      definition: 'def.topos',
      usedBy: 'prop.abelian-slice-adjunction',
      note: '切片拓扑斯上的这对伴随。'
    },
    {
      id: 'def-link.slicez-free',
      kind: 'definition',
      definition: 'def.free-abelian-sheaf',
      usedBy: 'prop.slice-shriek-z',
      note: '右边就是自由阿贝尔群层。'
    },
    {
      id: 'imp-link.slicez-cohslice',
      kind: 'implication',
      sources: ['prop.slice-shriek-z'],
      target: 'prop.cohomology-slice-identification',
      title: '$j_{X!}\\mathbb{Z} = \\mathbb{Z}\\cdot X$ $\\implies$ 切片上的上同调就是原上同调',
      proof: [
        '$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}, j_{X}^{-1}M) = \\operatorname{Hom}_{\\mathbb{Z}}(j_{X!}\\mathbb{Z}, M) = \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X, M) = M(X)$ ✓，两端作为函子相同。',
        '又 $j_{X}^{-1}$ 有正合左伴随，因而保内射 ✓，所以两边可以用同一批内射消解取导出函子，得到 $H^{n}(\\mathbf{1}_{X}, j_{X}^{-1}M^{\\bullet}) = H^{n}(X, M^{\\bullet})$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.inthomslice-internal',
      kind: 'definition',
      definition: 'def.internal-hom',
      usedBy: 'prop.internal-hom-slice-value',
      note: '命题算的就是内 Hom 在 $X$ 处的取值。'
    },
    {
      id: 'imp-link.slicez-sliceproj',
      kind: 'implication',
      sources: ['prop.slice-shriek-z', 'prop.inverse-image-tensor'],
      target: 'prop.slice-shriek-projection',
      title: '伴随 + 张量相容 $\\implies$ 切片的投影公式',
      proof: [
        '把两边对到同一处 Hom：用 $j_{X!} \\dashv j_{X}^{-1}$ 把左边的 Hom 换到 $\\operatorname{Hom}(M \\otimes j_{X}^{-1}N, j_{X}^{-1}-)$，再用 $f^{-1}$ 与张量积的相容性 ✓，由米田引理得同构 ✓。',
        '最后一式取 $N = \\mathbb{Z}$，并用 $j_{X!}\\mathbb{Z} = \\mathbb{Z}\\cdot X$ ✓。∎'
      ].join('\n')
    }

  ]
});
