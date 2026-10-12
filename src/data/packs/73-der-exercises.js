/* ==========================================================================
   内容包 · 原书第 7 章 §7.2 练习里的性质（小节点）
   --------------------------------------------------------------------------
   7.27 · 7.29 · 7.30 · 7.31 · 7.34 · 7.35 · 7.39 · 7.40
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '导出函子与谱序列的性质',

  nodes: [

    /* ----------------------------------------------------- 7.27 */
    {
      id: 'prop.additive-complex-construction',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '加法函子与复形构造交换',
      title: '命题：$F(C(\\mathcal{A})) \\cong C(F(\\mathcal{A}))$',
      regions: ['homology'],
      tags: ['命题', '加法函子', '复形范畴', '逐项作用'],
      statement: [
        '加法函子 $F : \\mathcal{A} \\to \\mathcal{A}\'$ 逐项作用给出函子',
        '',
        '$$C(F) : C(\\mathcal{A}) \\longrightarrow C(\\mathcal{A}\'), \\qquad (K^{n}, d^{n}) \\longmapsto \\bigl(FK^{n},\\ Fd^{n}\\bigr),$$',
        '',
        '即 $F(C(\\mathcal{A})) \\cong C(F(\\mathcal{A}))$：**先取复形范畴再作用 $F$，与先作用 $F$ 再取复形范畴一样**。'
      ].join('\n'),
      notes: [
        '**证明。** 复形的数据只有「一族对象 + 一族态射 + $d \\circ d = 0$」✓，全是加法范畴的语言：加法函子保零态射、保复合、保加法，于是 $F(d^{n+1}) \\circ F(d^{n}) = F(d^{n+1} \\circ d^{n}) = 0$ ✓，$C(F)$ 是函子（$F$ 保持交换图）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.27']
    },

    /* ----------------------------------------------------- 7.29 */
    {
      id: 'prop.spectral-degenerate-row',
      cluster: 'hom.spectral',
      type: 'proposition',
      label: '谱序列的退化行',
      title: '命题：只有 $p = 0$ 那一行时 $E^{0,q} \\cong H^{q}$',
      regions: ['homology'],
      tags: ['命题', '谱序列', '第一象限', '退化'],
      statement: [
        '设 $E^{p,q}_{r} \\implies H^{p+q}$ 是**第一象限**谱序列。若对某个 $r \\ge 1$ 有',
        '',
        '$$p \\ne 0 \\implies E^{p,q}_{r} = 0 \\qquad (\\forall q),$$',
        '',
        '则对一切 $q$：$E^{0,q}_{r} \\cong H^{q}$。'
      ].join('\n'),
      notes: [
        '**证明。** 固定 $q$。第一象限保证 $p < 0$ 或 $q < 0$ 的项恒为零 ✓，所以 $E^{0,q}$ 处进出它的微分都要离开 $p = 0$ 这一行或跑出第一象限，于是',
        '$$E^{0,q}_{r} = E^{0,q}_{r+1} = \\cdots = E^{0,q}_{\\infty} ✓$$',
        '而收敛到 $H^{q}$ 的过滤里，$E^{\\infty}_{0,q} = \\operatorname{Gr}^{0}H^{q}$，且 $p < 0$ 的项全为零说明 $H^{q}$ 的过滤在 $0$ 处没有更低的层，故 $\\operatorname{Gr}^{0}H^{q} = H^{q}$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.29']
    },

    /* ----------------------------------------------------- 7.30 */
    {
      id: 'prop.five-term-spectral-sequence',
      cluster: 'hom.spectral',
      type: 'proposition',
      label: '谱序列的五项正合列',
      title: '命题：$0 \\to E^{1,0}_{2} \\to H^{1} \\to E^{0,1}_{2} \\xrightarrow{d_{2}} E^{2,0}_{2} \\to H^{2}$',
      regions: ['homology'],
      tags: ['命题', '谱序列', '五项正合列', '第一象限'],
      statement: [
        '第一象限谱序列 $E^{p,q}_{2} \\implies H^{p+q}$ 给出**五项正合列**',
        '',
        '$$0 \\longrightarrow E^{1,0}_{2} \\longrightarrow H^{1} \\longrightarrow E^{0,1}_{2} \\xrightarrow{\\ d_{2}\\ } E^{2,0}_{2} \\longrightarrow H^{2}.$$'
      ].join('\n'),
      notes: [
        '**证明（逐页核对）。** 第一象限里 $d_{2} : E^{0,1}_{2} \\to E^{2,0}_{2}$ 是这两项唯一可能的非零微分 ✓；$E^{1,0}$ 与 $E^{0,1}$ 都活到 $E^{\\infty}$（没有更低的 $q$ 可以被打到）✓。把 $E^{\\infty}_{1,0} = \\operatorname{Gr}^{1}H^{1}$、$E^{\\infty}_{0,1} = \\operatorname{Gr}^{0}H^{1}$ 连同 $E^{\\infty}_{2,0} = \\operatorname{Gr}^{2}H^{2}$ 的过滤逐项拼起来，就得到上面这条链 ✓。∎',
        '⭐ 用处：这是「谱序列直接给出低次正合列」的标准工具，$H^{1}$ 与 $H^{2}$ 的低次项就从这里读出来。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.30']
    },

    /* ----------------------------------------------------- 7.31 */
    {
      id: 'prop.filtered-first-page',
      cluster: 'hom.spectral',
      type: 'proposition',
      label: '过滤复形的第一页',
      title: '命题：$E^{1}_{p,q} = H^{p+q}(\\operatorname{Gr}^{p}K^{\\bullet})$',
      regions: ['homology'],
      tags: ['命题', '谱序列', '过滤复形', '分次片'],
      statement: [
        '设 $K^{\\bullet}$ 是带（递降）过滤的复形，$E^{p,q}_{r}$ 是它给出的谱序列。则',
        '',
        '$$E^{1}_{p,q} \\;=\\; H^{p+q}\\bigl(\\operatorname{Gr}^{p}K^{\\bullet}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** 由 $E^{0}_{p,q} = \\operatorname{Gr}^{p}K^{p+q}$ ✓，而第 $0$ 页的微分 $d_{0}$ 是过滤商上诱导的微分（也就是 $K^{\\bullet}$ 的微分下到分次片上）✓；取同调即得 $E^{1}_{p,q} = H^{p+q}(\\operatorname{Gr}^{p}K^{\\bullet})$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.31']
    },

    /* ----------------------------------------------------- 7.34 */
    {
      id: 'prop.total-complex-injective-resolution',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '全复形还是内射消解',
      title: '命题：全复形 $I^{\\bullet}$ 仍是 $K^{\\bullet}$ 的内射消解',
      regions: ['homology'],
      tags: ['命题', '全复形', '内射消解', '双复形'],
      statement: [
        '设 $K^{\\bullet,\\bullet}$ 是下有界双复形、每项内射，且其全复形 $I^{\\bullet}$ 连同增广给出 $K^{\\bullet}$ 的一条消解。则 $K^{\\bullet} \\to I^{\\bullet}$ **仍是内射消解**。'
      ].join('\n'),
      notes: [
        '**证明。** 全复形的每一项是**有限**多个内射对象的直和（下有界保证每个次数上只有有限多项），直和仍是内射 ✓；而全复形与双复形同调相容：$H^{n}(\\operatorname{Tot}) \\cong H^{n}$（这里用的是「下有界 + 每列是消解」的收敛性）✓，所以 $K^{\\bullet} \\to I^{\\bullet}$ 是拟同构 ✓。∎',
        '⭐ 这一条是 Cartan–Eilenberg 那套「双复形 $\\to$ 全复形」的合法性依据。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.34']
    },

    /* ----------------------------------------------------- 7.35 */
    {
      id: 'prop.derived-functor-exact-factor',
      cluster: 'hom.spectral',
      type: 'proposition',
      label: '正合因子让谱序列退化',
      title: '命题：$F$ 正合 $\\implies R^{n}G(FK) \\cong R^{n}(G \\circ F)(K)$',
      regions: ['homology'],
      tags: ['命题', '导出函子', '正合函子', 'Grothendieck 谱序列', '退化'],
      statement: [
        '设 $\\mathcal{A} \\xrightarrow{F} \\mathcal{A}\' \\xrightarrow{G} \\mathcal{A}\'\'$ 是加法函子，满足 Grothendieck 谱序列的条件。若 $F$ 正合，则',
        '',
        '$$R^{n}G\\bigl(F(K)\\bigr) \\;\\cong\\; R^{n}(G \\circ F)(K);$$',
        '对偶地，若 $G$ 正合，则 $G\\bigl(R^{n}F(K)\\bigr) \\cong R^{n}(G \\circ F)(K)$。'
      ].join('\n'),
      notes: [
        '**证明。** 正合函子的高次导出函子为零：$R^{q}F = 0$（$q > 0$）✓。在 Grothendieck 谱序列 $E^{p,q}_{2} = R^{p}G(R^{q}F(K)) \\implies R^{p+q}(G\\circ F)(K)$ 里，$E_{2}$ 页只剩下 $q = 0$ 那一行 ✓，于是谱序列退化，$R^{n}(G\\circ F)(K) \\cong R^{n}G(F(K))$ ✓。对偶地把 $F,G$ 互换（另一半用 $G$ 正合 $\\implies$ $R^{p}G = 0$）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.35']
    },

    /* ----------------------------------------------------- 7.39 */
    {
      id: 'prop.flat-tensor-acyclic',
      cluster: 'hom.sheaf',
      type: 'proposition',
      label: '平坦张量保持零调',
      title: '命题：$P$ 平坦、$M$ 下有界零调 $\\implies P \\otimes M$ 零调',
      regions: ['homology'],
      tags: ['命题', '平坦', '张量积', '零调复形'],
      statement: [
        '设 $P$ 是拓扑斯里的**平坦**阿贝尔群，$M$ 是幂（下有界、在 $n \\ne 0$ 处同调为零）的**零调**复形。则 $P \\otimes_{\\mathbb{Z}} M$ 也零调。'
      ].join('\n'),
      notes: [
        '**证明。** 平坦就是说 $P \\otimes_{\\mathbb{Z}} -$ **正合** ✓。「下有界 + 零调」的复形就是一条正合列 ✓，正合函子把正合列仍送到正合列，所以 $P \\otimes M$ 也正合，即零调 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.39']
    },

    /* ----------------------------------------------------- 7.40 */
    {
      id: 'prop.cech-cochain-formula',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: 'Čech 上链的具体公式',
      title: '命题：$\\check{C}^{n}(\\mathfrak{X}, M) = \\prod M(X_{i_{0}} \\times_{X} \\cdots \\times_{X} X_{i_{n}})$',
      regions: ['homology'],
      tags: ['命题', 'Čech 复形', '上链', '纤维积'],
      statement: [
        '设 site $\\mathcal{C}$ 有纤维积，$\\mathfrak{X} = (X_{i} \\to X)_{i \\in I}$ 是一族态射，$M$ 是阿贝尔层。则',
        '',
        '$$\\check{C}^{n}(\\mathfrak{X}, M) \\;=\\; \\prod_{i_{0}, \\ldots, i_{n}} M\\bigl(X_{i_{0}} \\times_{X} \\cdots \\times_{X} X_{i_{n}}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** 按定义 $\\check{C}^{\\bullet}(\\mathfrak{X}, M) = \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X_{\\bullet}, M)$ ✓，而 Čech 脉的 $n$ 次项是 $X_{n} = \\coprod_{i_{0},\\ldots,i_{n}} X_{i_{0}} \\times_{X} \\cdots \\times_{X} X_{i_{n}}$ ✓。自由对象把余积换成直和、把取值写成 Hom：',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\Bigl(\\bigoplus_{i_{0},\\ldots,i_{n}} \\mathbb{Z}\\cdot\\bigl(X_{i_{0}} \\times_{X} \\cdots \\times_{X} X_{i_{n}}\\bigr),\\ M\\Bigr) = \\prod_{i_{0},\\ldots,i_{n}} M\\bigl(X_{i_{0}} \\times_{X} \\cdots \\times_{X} X_{i_{n}}\\bigr) ✓$$',
        '∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.40']
    }

  ],

  edges: [

    {
      id: 'def-link.addcomplex-complex',
      kind: 'definition',
      definition: 'def.cochain-complex',
      usedBy: 'prop.additive-complex-construction',
      note: '命题说的就是复形范畴本身。'
    },
    {
      id: 'def-link.addcomplex-functor',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'prop.additive-complex-construction',
      note: '前提是 $F$ 加法。'
    },
    {
      id: 'def-link.degrow-ss',
      kind: 'definition',
      definition: 'def.spectral-sequence',
      usedBy: 'prop.spectral-degenerate-row',
      note: '命题说的是谱序列的退化情形。'
    },
    {
      id: 'def-link.fiveterm-ss',
      kind: 'definition',
      definition: 'def.spectral-sequence',
      usedBy: 'prop.five-term-spectral-sequence',
      note: '五项正合列从谱序列的页里读出来。'
    },
    {
      id: 'imp-link.degrow-fiveterm',
      kind: 'implication',
      sources: ['prop.spectral-degenerate-row'],
      target: 'prop.five-term-spectral-sequence',
      title: '退化行 $\\implies$ 五项正合列',
      proof: [
        '第一象限里 $H^{1}$ 只由 $E^{1,0}$、$E^{0,1}$ 两层拼成，$H^{2}$ 的低层是 $E^{2,0}$ ✓。',
        '把 $E^{\\infty}$ 页的这几项按过滤拼回 $H^{1}$、$H^{2}$：$0 \\to E^{1,0}_{2} \\to H^{1} \\to E^{0,1}_{2}$ 正合用的是 $\\operatorname{Gr}^{1}H^{1} = E^{\\infty}_{1,0}$，而 $E^{0,1}_{2} \\xrightarrow{d_{2}} E^{2,0}_{2}$ 的核正是活到 $E^{\\infty}$ 的部分 ✓，其后 $E^{2,0}_{2} \\to H^{2}$ 用的是 $\\operatorname{Gr}^{2}H^{2} = E^{\\infty}_{2,0}$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.firstpage-filtered',
      kind: 'definition',
      definition: 'def.filtration',
      usedBy: 'prop.filtered-first-page',
      note: '公式里的分次片就是过滤商。'
    },
    {
      id: 'imp-link.filteredss-firstpage',
      kind: 'implication',
      sources: ['thm.filtered-complex-spectral'],
      target: 'prop.filtered-first-page',
      title: '下有界过滤复形给出谱序列 $\\implies$ 第一页是分次片的同调',
      proof: [
        '那条定理给出 $E^{0}_{p,q} = \\operatorname{Gr}^{p}K^{p+q}$ ✓，而第 $0$ 页的微分正是过滤商上诱导的微分 ✓；取同调即得 $E^{1}_{p,q} = H^{p+q}(\\operatorname{Gr}^{p}K^{\\bullet})$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.totalcomplex-bicomplex',
      kind: 'definition',
      definition: 'def.bicomplex',
      usedBy: 'prop.total-complex-injective-resolution',
      note: '命题说的是双复形的全复形。'
    },
    {
      id: 'def-link.totalcomplex-res',
      kind: 'definition',
      definition: 'def.resolution',
      usedBy: 'prop.total-complex-injective-resolution',
      note: '结论是「仍是内射消解」。'
    },
    {
      id: 'def-link.derivedexact-grothendieck',
      kind: 'definition',
      definition: 'def.right-derived-functor',
      usedBy: 'prop.derived-functor-exact-factor',
      note: '命题比较两边的导出函子。'
    },
    {
      id: 'imp-link.grothendieck-derivedexact',
      kind: 'implication',
      sources: ['cor.grothendieck-spectral'],
      target: 'prop.derived-functor-exact-factor',
      title: 'Grothendieck 谱序列 $\\implies$ 正合因子时退化',
      proof: [
        '正合函子高次导出为零：$R^{q}F = 0$（$q > 0$）✓，于是谱序列 $E^{p,q}_{2} = R^{p}G(R^{q}F(K))$ 只剩 $q = 0$ 一行 ✓。',
        '一行谱序列处处退化，$E^{n,0}_{2} = E^{n,0}_{\\infty} = \\operatorname{Gr}^{n}$，收敛给出 $R^{n}(G \\circ F)(K) \\cong R^{n}G(F(K))$ ✓。对偶地把 $G$ 正合的情形照做 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.flattensor-flat',
      kind: 'definition',
      definition: 'def.flat-abelian-sheaf',
      usedBy: 'prop.flat-tensor-acyclic',
      note: '前提是 $P$ 平坦。'
    },
    {
      id: 'def-link.flattensor-acyclic',
      kind: 'definition',
      definition: 'def.quasi-iso',
      usedBy: 'prop.flat-tensor-acyclic',
      note: '结论是零调。'
    },
    {
      id: 'def-link.cechformula-cech',
      kind: 'definition',
      definition: 'def.cech-functor',
      usedBy: 'prop.cech-cochain-formula',
      note: '公式就是 Čech 复形逐项写出来。'
    },
    {
      id: 'def-link.cechformula-free',
      kind: 'definition',
      definition: 'def.free-abelian-sheaf',
      usedBy: 'prop.cech-cochain-formula',
      note: '推导用的是自由对象把余积换成直和。'
    }

  ]
});
