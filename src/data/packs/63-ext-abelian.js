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
      notes: [
        ['**证明。**','**1.** 每个阿贝尔群都有**长度 2 的自由消解**：取满射 $\\mathbb{Z}^{(I)} \\twoheadrightarrow M$（由生成元集 $I$ 给出），它的核 $K$ 是自由阿贝尔群 $\\mathbb{Z}^{(I)}$ 的子群，**因而也自由**（$\\mathbb{Z}$ 是主理想整环，PID 上自由模的子模仍自由 ✓）。取 $\\mathbb{Z}^{(J)} \\twoheadrightarrow K$ 得','$$0 \\longrightarrow \\mathbb{Z}^{(J)} \\longrightarrow \\mathbb{Z}^{(I)} \\longrightarrow M \\longrightarrow 0.$$','只要有一条长度 2 的消解，就可以用它算 $\\operatorname{Ext}^{n}$：复形 $\\operatorname{Hom}(\\mathbb{Z}^{(\\bullet)}, N)$ 只在 $0$、$1$ 次非零，故上同调只在 $n = 0, 1$ 次可能出现：$\\operatorname{Ext}^{n}(M,N) = 0$（$n \\ge 2$）✓，且 $\\operatorname{Ext}^{0} = \\operatorname{Hom}(M,N)$ ✓。','**2.** 用 $\\mathbb{Z}/k$ 的标准消解','$$0 \\longrightarrow \\mathbb{Z} \\xrightarrow{\\ \\times k\\ } \\mathbb{Z} \\longrightarrow \\mathbb{Z}/k \\longrightarrow 0$$','作用 $\\operatorname{Hom}_{\\mathbb{Z}}(-, N)$ 得长正合列','$$0 \\to \\operatorname{Hom}(\\mathbb{Z}/k, N) \\to \\operatorname{Hom}(\\mathbb{Z}, N) \\xrightarrow{\\ (\\times k)^{*}\\ } \\operatorname{Hom}(\\mathbb{Z}, N) \\to \\operatorname{Ext}^{1}(\\mathbb{Z}/k, N) \\to \\underbrace{\\operatorname{Ext}^{1}(\\mathbb{Z}, N)}_{=\\,0} \\to \\cdots$$','其中 $\\operatorname{Hom}(\\mathbb{Z}, N) \\cong N$、$(\\times k)^{*}$ 就是「乘 $k$」这个自同态 ✓（$\\operatorname{Ext}^{1}(\\mathbb{Z}, N) = 0$ 因为 $\\mathbb{Z}$ 投射）。于是','$$\\operatorname{Hom}(\\mathbb{Z}/k, N) = \\ker(\\times k) = N[k], \\qquad \\operatorname{Ext}^{1}(\\mathbb{Z}/k, N) = \\operatorname{coker}(\\times k) = N/kN ✓$$','∎'].join('\n'),
        '⭐ 这两条合起来是一句话：**阿贝尔群的同调代数只有两层**（$n = 0$ 与 $n = 1$）。所以「高次 Ext」是只有换了范畴（层、凝聚态阿贝尔群）之后才会真正出现的现象 —— 后面整套凝聚态上同调做的正是这件事。'
      ].join('\n\n'),
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
    }
  ]
});
