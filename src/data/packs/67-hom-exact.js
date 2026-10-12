/* ==========================================================================
   内容包 · 左正合性的两条判据（原书 §5.2 / §7.2 的练习 5.11 与 7.23）
   --------------------------------------------------------------------------
   两条都在回答同一个问题：**怎么验「左正合」**。
     5.11：左正合 ⟺ 加法 + 保左正合列
     7.23：左正合 ⟺ 0 次导出函子就是自己
   两条合起来，把「保有限极限」这件抽象的事化成可以逐项检查的条件。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '左正合性的判据',
  nodes: [

    /* ----------------------------------------------------- 5.11 */
    {
      id: 'prop.left-exact-criterion',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '左正合性的判据',
      title: '命题：$F$ 左正合 $\\iff$ $F$ 加法且保左正合列',
      regions: ['homology'],
      tags: ['命题', '正合函子', '左正合', '加法函子'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{D}$ 是阿贝尔范畴，$F : \\mathcal{C} \\to \\mathcal{D}$ 是函子。则',
        '',
        '$$F \\text{ 左正合} \\iff F \\text{ 加法，且把左正合列送到左正合列}.$$',
        '',
        '对偶地：$F$ 右正合 $\\iff$ $F$ 加法，且把右正合列送到右正合列。'
      ].join('\n'),
      notes: [
        ['**证明。**','**$(\\Longrightarrow)$** 左正合就是**保有限极限** ✓。保有限极限当然保有限积与核，于是：$F$ 保双积 $\\implies$ $F$ 加法（见「加法函子的刻画」）✓；而左正合列 $0 \\to M\' \\to M \\to M\'\'$ 本身就是一个有限极限图表，被 $F$ 送到同样的图表，即仍是左正合列 ✓。','**$(\\Longleftarrow)$** 设 $F$ 加法且保左正合列。由「保有限积 + 保核 $\\implies$ 保所有有限极限」，只需证这两条 ✓：','- **保核**：$0 \\to \\ker f \\xrightarrow{\\ i\\ } M \\xrightarrow{\\ f\\ } N$ 是左正合列 ✓，被送到左正合列 $0 \\to F(\\ker f) \\xrightarrow{\\ Fi\\ } FM \\xrightarrow{\\ Ff\\ } FN$，这正是 $F(\\ker f) \\cong \\ker(Ff)$ ✓；','- **保有限积**：$0 \\to M \\xrightarrow{\\ i_{1}\\ } M \\oplus N \\xrightarrow{\\ p_{2}\\ } N$ 也是左正合列（$i_{1}$ 单、$\\operatorname{im}i_{1} = \\ker p_{2}$）✓，被送到左正合列 $0 \\to FM \\to F(M\\oplus N) \\to FN$；而 $F$ **加法**说明 $F$ 保双积、$Fi_{1}$ 就是第一个含入 ✓，于是 $F(M \\oplus N)$ 连同 $Fi_{1}, Fi_{2}$ 满足直和的三条等式（见「直和就是积」），即 $F(M\\oplus N) \\cong FM \\oplus FN$ ✓。','两条合起来：$F$ 保有限积与核，从而保所有有限极限，即左正合 ✓。∎'].join('\n'),
        '⭐ 这条把「左正合」拆成两件**逐项可查**的事：**加法**（看双积）与**保左正合列**（看具体的列）。实际验证函子左正合时用的就是这两把尺子。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.2']
    },

    /* ----------------------------------------------------- 7.23 */
    {
      id: 'prop.left-exact-iff-R0',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '左正合性与 R⁰',
      title: '命题：$F$ 左正合 $\\iff$ $R^{0}F \\cong F$',
      regions: ['homology'],
      tags: ['命题', '导出函子', '左正合', '内射消解'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴（有足够多内射）、$\\mathcal{A}\'$ 是阿贝尔范畴，$F : \\mathcal{A} \\to \\mathcal{A}\'$ 是**加法**函子。则',
        '',
        '$$F \\text{ 左正合} \\iff \\forall M \\in \\mathcal{A}:\\ R^{0}F(M) \\cong F(M).$$',
        '',
        '对偶地（有足够多投射时）：$F$ 右正合 $\\iff L_{0}F \\cong F$。'
      ].join('\n'),
      notes: [
        ['**证明。**','**$(\\Longrightarrow)$** 取 $M$ 的一条内射消解 $0 \\to M \\xrightarrow{\\ \\varepsilon\\ } I^{0} \\xrightarrow{\\ d^{0}\\ } I^{1} \\to \\cdots$ ✓。$F$ **左正合**，所以它把上半段正合列送到正合列','$$0 \\longrightarrow FM \\xrightarrow{\\ F\\varepsilon\\ } FI^{0} \\xrightarrow{\\ Fd^{0}\\ } FI^{1} ✓$$','于是由 $R^{0}F(M) = H^{0}(FI^{\\bullet})$ 的定义','$$R^{0}F(M) = \\ker(Fd^{0}) = \\operatorname{im}(F\\varepsilon) \\cong FM ✓$$','**$(\\Longleftarrow)$** 设 $R^{0}F \\cong F$。短正合列 $0 \\to M\' \\to M \\to M\'\' \\to 0$ 的长正合列开头是','$$0 \\to R^{0}F(M\') \\to R^{0}F(M) \\to R^{0}F(M\'\') \\to R^{1}F(M\') \\to \\cdots$$','用 $R^{0}F \\cong F$ 换掉前三项，得到 $0 \\to FM\' \\to FM \\to FM\'\'$ **正合** ✓，即 $F$ 左正合 ✓。∎'].join('\n'),
        '⭐ 一句话：**左正合性可以只用 $0$ 次导出函子来检验**。反过来，这也解释了为什么「$R^{0}F = F$」在导出函子的记号里被当成左正合的默认性质。',
        '⚠️ 前提「$F$ 加法」不能省：非加法函子的导出函子没有意义（导出函子是在加法范畴的复形上定义的）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.2']
    }

  ],

  edges: [
    {
      id: 'def-link.lcrit-exactfun',
      kind: 'definition',
      definition: 'def.exact-functor',
      usedBy: 'prop.left-exact-criterion',
      note: '命题要刻画的就是「左正合函子」这条定义。'
    },
    {
      id: 'def-link.lcrit-addfun',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'prop.left-exact-criterion',
      note: '判据里的一半是「$F$ 加法」。'
    },
    {
      id: 'def-link.lcrit-res',
      kind: 'definition',
      definition: 'def.preserves-limit',
      usedBy: 'prop.left-exact-criterion',
      note: '左正合 = 保有限极限，用的是保极限那条定义。'
    },
    {
      id: 'def-link.r0-derfun',
      kind: 'definition',
      definition: 'def.right-derived-functor',
      usedBy: 'prop.left-exact-iff-R0',
      note: '命题比较的就是右导出函子的 $0$ 次分量与 $F$ 本身。'
    },
    {
      id: 'def-link.r0-exactfun',
      kind: 'definition',
      definition: 'def.exact-functor',
      usedBy: 'prop.left-exact-iff-R0',
      note: '结论是「$F$ 左正合」。'
    }
  ]
});
