/* ==========================================================================
   内容包 · 紧 Hausdorff 阿贝尔群的两项消解（原书 §6.2 的练习 6.10）
   --------------------------------------------------------------------------
   一条短但好用的结论：紧 Hausdorff 阿贝尔群总能用**两个连通**的紧群把它夹起来：

     0 → M → M₀ → M₁ → 0,     M₀, M₁ 都连通。

   证法只用 Pontryagin 对偶：离散侧的满射 ℤ^(I) ↠ M^ 对偶回来就是 M ↪ T^I，
   而 T^I 连通、T^I/M 也是某个自由离散群的对偶（因而连通）。
   后面算 Ext 时，正是靠它把一般的紧群**拆成连通的两块**。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '紧阿贝尔群的两项消解',
  nodes: [

    {
      id: 'prop.chaus-two-term-resolution',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '紧阿贝尔群的两项消解',
      title: '命题：紧 Hausdorff 阿贝尔群有两项连通消解',
      regions: ['condensed'],
      tags: ['命题', 'Pontryagin 对偶', '紧阿贝尔群', '连通'],
      statement: [
        '设 $M$ 是**紧 Hausdorff 阿贝尔群**。则存在短正合列（一个「两项消解」）',
        '',
        '$$0 \\longrightarrow M \\longrightarrow M_{0} \\longrightarrow M_{1} \\longrightarrow 0$$',
        '',
        '其中 $M_{0}$、$M_{1}$ 都是**连通的**紧 Hausdorff 阿贝尔群。'
      ].join('\n'),
      notes: [
        ['**证明（对偶过去再对偶回来）。** 记 $\\widehat{M} = \\operatorname{Hom}_{\\mathrm{cts}}(M, T)$ 为 Pontryagin 对偶（$T = \\mathbb{R}/\\mathbb{Z}$），由 Pontryagin–van Kampen 对偶，$M$ 紧 $\\iff$ $\\widehat{M}$ **离散** ✓。','**① 对离散的一侧造一个满射。** 取 $\\widehat{M}$ 的一组生成元 $(e_{i})_{i \\in I}$，得满射','$$\\mathbb{Z}^{(I)} \\twoheadrightarrow \\widehat{M} ✓$$','（自由离散群是离散群的投射覆盖。）','**② 对偶回来。** Pontryagin 对偶把满射换成**单态射**、把自由离散群 $\\mathbb{Z}^{(I)}$ 换成 $T^{I}$ ✓，于是','$$M \\hookrightarrow T^{I}, \\qquad M_{0} := T^{I} \\text{ 连通（$T$ 连通，连通空间的积连通）}\\;\\checkmark$$','**③ 商也是连通的。** 令 $M_{1} := M_{0}/M$。对偶这条短正合列','$$0 \\to M \\to M_{0} \\to M_{1} \\to 0 \\quad\\leadsto\\quad 0 \\to \\widehat{M_{1}} \\to \\mathbb{Z}^{(I)} \\to \\widehat{M} \\to 0,$$','其中 $\\widehat{M_{1}}$ 是自由离散群 $\\mathbb{Z}^{(I)}$ 的**子群**，因而本身也是**自由离散群** $\\cong \\mathbb{Z}^{(J)}$ ✓（PID 上自由模的子模自由）。再对偶回来：$M_{1} \\cong T^{J}$ ✓ —— 连通（并紧）✓。','两部分合起来就是所求的两项消解 ✓。∎'].join('\n'),
        '⭐ 用处：把「**紧**阿贝尔群」化归成「**连通紧**阿贝尔群」。例如算 $\\operatorname{RHom}$ 时，中间项与右端项都是连通的，于是可以用连通情形的结论（连通时只剩 $0$ 次与 $1$ 次 Ext）把高次 Ext 一次性掐掉。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §6.2']
    }

  ],

  edges: [
    {
      id: 'def-link.ttr-dual',
      kind: 'definition',
      definition: 'def.pontryagin-dual',
      usedBy: 'prop.chaus-two-term-resolution',
      note: '整个证明就是在 Pontryagin 对偶两侧来回搬运。'
    },
    {
      id: 'def-link.ttr-lc',
      kind: 'definition',
      definition: 'thm.pontryagin-van-kampen',
      usedBy: 'prop.chaus-two-term-resolution',
      note: '「紧 $\\iff$ 对偶离散」用的是 Pontryagin–van Kampen 对偶。'
    }
  ]
});
