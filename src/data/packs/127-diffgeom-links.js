/* ==========================================================================
   内容包 · 接线：把「Gauss 方程」与「绝妙定理」在图上连起来
   --------------------------------------------------------------------------
   125（活动标架 / 曲面论）与 126（内蕴几何）是并行写的。126 的绝妙定理用到了
   125 的 Gauss 方程，但当时两边只走 definition 边，定理到定理的推导没有画出来。
   这一包只补这条 implication 边。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '接线：Gauss 方程给出绝妙定理',

  nodes: [],

  edges: [
    {
      id: 'imp.gauss-egregium',
      kind: 'implication',
      sources: ['thm.gauss-equation', 'thm.structure-equations'],
      target: 'thm.theorema-egregium',
      title: 'Gauss 方程 + 结构方程 $\\implies$ 高斯曲率只依赖第一基本形式',
      proof: [
        '**第一步：$\\omega^{1}{}_{2}$ 由 $I$ 决定。** 取适配标架（$e_{3}=n$），则 $\\omega^{3}=0$。第一结构方程给出',
        '',
        '$$\\mathrm{d}\\omega^{1} = \\omega^{1}{}_{2}\\wedge\\omega^{2}, \\qquad \\mathrm{d}\\omega^{2} = \\omega^{2}_{\\ 1}\\wedge\\omega^{1} = -\\omega^{1}{}_{2}\\wedge\\omega^{1}.$$',
        '',
        '把 $\\omega^{1}, \\omega^{2}$ 看成 $I = (\\omega^{1})^{2}+(\\omega^{2})^{2}$ 给出的余标架，这两条方程就是关于 $\\omega^{1}{}_{2}$ 的线性方程组。若 $\\tilde\\omega^{1}{}_{2}$ 是另一解，则 $(\\omega^{1}{}_{2}-\\tilde\\omega^{1}{}_{2})\\wedge\\omega^{1} = (\\omega^{1}{}_{2}-\\tilde\\omega^{1}{}_{2})\\wedge\\omega^{2} = 0$；由 $\\{\\omega^{1},\\omega^{2}\\}$ 是基，差必为零。故 $\\omega^{1}{}_{2}$ **只依赖 $I$**（这是「无挠 Levi-Civita 联络由度量唯一确定」的标架版）。',
        '',
        '**第二步：$K$ 是 $\\omega^{1}{}_{2}$ 的外微分。** 第二结构方程在 $j=2$、去掉 $k=3$ 的项后为',
        '',
        '$$\\mathrm{d}\\omega^{1}{}_{2} = -\\sum_{k}\\omega^{1}_{\\ k}\\wedge\\omega^{k}_{\\ 2} = \\omega^{1}_{\\ 3}\\wedge\\omega^{2}_{\\ 3}.$$',
        '',
        '（$\\mathbb{R}^{3}$ 的曲率形式为零，$\\Omega^{1}{}_{2}=0$，于是 $\\mathrm{d}\\omega^{1}{}_{2}+\\omega^{1}_{\\ 3}\\wedge\\omega^{3}_{\\ 2}=0$，而 $\\omega^{3}_{\\ 2}=-\\omega^{2}_{\\ 3}$。）又 $\\omega^{1}_{\\ 3} = h_{11}\\omega^{1}+h_{12}\\omega^{2}$、$\\omega^{2}_{\\ 3} = h_{21}\\omega^{1}+h_{22}\\omega^{2}$，故',
        '',
        '$$\\mathrm{d}\\omega^{1}{}_{2} = \\bigl(h_{11}h_{22}-h_{12}h_{21}\\bigr)\\,\\omega^{1}\\wedge\\omega^{2} = \\det(h_{ij})\\,\\omega^{1}\\wedge\\omega^{2}.$$',
        '',
        '**第三步：读出来。** Gauss 方程把右边认成 $K\\,\\omega^{1}\\wedge\\omega^{2}$，所以 $K = \\det(h_{ij})$。右边是 $I$-侧的量（第一步只用了 $I$），左边 $\\det h$ 是外蕴的主曲率之积 —— 两者相等即「$K$ 只依赖 $I$」。$\\blacksquare$'
      ].join('\n'),
      note: '这条把两个包接上：曲率形式这条路**不需要** Christoffel 符号的坐标计算，只需要第一、第二结构方程与 $\\omega^{3}=0$。'
    }
  ]
});
