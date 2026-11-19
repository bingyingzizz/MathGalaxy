/* ==========================================================================
   内容包 · 阿贝尔群的 Ext（原书 §7.2 的练习 7.25）
   --------------------------------------------------------------------------
   为什么值得单独一条：阿贝尔群是整套同调代数的「训练场」——
   它给出**最短**的消解，于是 Ext 全都能显式算出来。
   这条也是后面「离散群只有 0 次与 1 次 Ext」那句话的来源。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '阿贝尔群的扩展群',
  nodes: [

    {
      id: 'prop.ext-abelian-groups',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '阿贝尔群的 Ext',
      title: '命题：$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M,N) = 0$（$n \\ge 2$）与 $\\operatorname{Ext}^{1}(\\mathbb{Z}/k,\\,N) = N/kN$',
      regions: ['homology'],
      tags: ['命题', 'Ext', '阿贝尔群', '自由消解'],
      statement: [
        '取 $\\mathcal{A} = \\mathbf{Ab}$（阿贝尔群）。则',
        '',
        '1. 对任意阿贝尔群 $M, N$ 与一切 $n \\ge 2$：',
        '$$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M,\\ N) = 0, \\qquad \\operatorname{Ext}^{0}_{\\mathbb{Z}}(M,\\ N) = \\operatorname{Hom}_{\\mathbb{Z}}(M,\\ N);$$',
        '2. 对 $k \\ge 1$：',
        '$$\\operatorname{Ext}^{1}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}/k\\mathbb{Z},\\ N\\bigr) \\;\\cong\\; N/kN, \\qquad \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}/k\\mathbb{Z},\\ N\\bigr) = N[k].$$',
        '',
        '（$N[k] := \\{n \\in N : kn = 0\\}$。）'
      ].join('\n'),
      notes: "⭐ 这两条合起来是一句话：**阿贝尔群的同调代数只有两层**（$n = 0$ 与 $n = 1$）。所以「高次 Ext」是只有换了范畴（层、凝聚态阿贝尔群）之后才会真正出现的现象 —— 后面整套凝聚态上同调做的正是这件事。",
      refs: ['Le Stum, An introduction to condensed mathematics, §7.2']
    }

  ],

  edges: [
    {
      id: 'def-link.extab-ext',
      kind: 'definition',
      definition: 'def.ext',
      usedBy: 'prop.ext-abelian-groups',
      note: '命题算的就是这条定义里的扩展群 $\\operatorname{Ext}^{n}$。'
    },
    {
      id: 'def-link.extab-enough',
      kind: 'definition',
      definition: 'def.enough-projectives',
      usedBy: 'prop.ext-abelian-groups',
      note: 'Ab 有足够多投射（自由群），消解才存在。'
    },
    { id: 'dep.cat-ab-prop-ext-abelian-groups', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.ext-abelian-groups', note: '陈述以阿贝尔群范畴 $\\mathbf{Ab}$ 为环境范畴' }
  ]
});
