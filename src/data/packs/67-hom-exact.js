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
        '$F$ **左正合** $\\iff$ $F$ **加法，且把左正合列送到左正合列**',
        '',
        '对偶地：$F$ 右正合 $\\iff$ $F$ 加法，且把右正合列送到右正合列。'
      ].join('\n'),
      notes: "⭐ 这条把「左正合」拆成两件**逐项可查**的事：**加法**（看双积）与**保左正合列**（看具体的列）。实际验证函子左正合时用的就是这两把尺子。",
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
        '$F$ **左正合** $\\iff$ 对每个 $M \\in \\mathcal{A}$ 都有 $R^{0}F(M) \\cong F(M)$。',
        '',
        '对偶地（有足够多投射时）：$F$ 右正合 $\\iff L_{0}F \\cong F$。'
      ].join('\n'),
      notes: "⭐ 一句话：**左正合性可以只用 $0$ 次导出函子来检验**。反过来，这也解释了为什么「$R^{0}F = F$」在导出函子的记号里被当成左正合的默认性质。\n\n⚠️ 前提「$F$ 加法」不能省：非加法函子的导出函子没有意义（导出函子是在加法范畴的复形上定义的）。",
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
    },
    {
      id: "dep.leftexact-abelian",
      kind: 'definition',
      definition: "def.abelian-category",
      usedBy: "prop.left-exact-criterion",
      note: "左正合判据在阿贝尔范畴中。"
    },
    {
      id: "dep.leftexactR0-abelian",
      kind: 'definition',
      definition: "def.abelian-category",
      usedBy: "prop.left-exact-iff-R0",
      note: "左正合等价于 R^1 消失，在阿贝尔范畴中。"
    }
  ]
});
