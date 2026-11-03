/* ============================================================================
   内容包 · 审计接线（2026-11-03，B1 批）：只加边 + 一处通名归位
   ----------------------------------------------------------------------------
   来源：`_audit/星图问题清单-2026-11-03.md` 的 C2 / D3 / D4（T5 / T6 / T7）。
   这一包**不改任何节点正文**，只干两件事：
     ① 补三条「本来就该有」的连线（两个词都写在陈述里，却一条边都没有）；
     ② 张量积的通名归位（§10 已定决议：通名给**模**的那版）。

   为什么单独开一包：上面三处分散在 126 / 141 / 16 / 161 / 107 / 120 / 106 七个包里，
   逐包改会和同时在写内容的人撞车；边单独成包，依赖关系一眼可见。

   判据（每条边都要说得出「为什么是这条方向」）：
     · `definition` 边的语义是「结论用到了这个概念/结果」（definition → usedBy）；
     · 因此 `definition` 一旦指向更深的节点，层号会自己跟着动 —— 那是派生量，不为它将就。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '审计接线：Gauss–Bonnet↔χ、L^p↔Banach、张量积通名',

  nodes: [],

  edges: [
    /* ------------------------------------------------ C2：微分几何 ↔ 拓扑 */
    /* 现状（审计 C2）：`thm.gauss-bonnet` 的 title 就叫「Gauss–Bonnet 定理与
       Euler 示性数」，陈述里写着 $\int_M K\,dA = 2\pi\chi(M)$，而它的 7 条入边
       **全在几何侧**；`thm.euler-characteristic` 又是另一片叶子。两边都 out=0。
       ⇒ 微分几何与拓扑之间最有名的那座桥，在图上是断的。*/
    {
      id: 'dep.gaussbonnet-eulerchar',
      kind: 'definition',
      definition: 'thm.euler-characteristic',
      usedBy: 'thm.gauss-bonnet',
      note: 'Gauss–Bonnet 的结论里直接出现 $\\chi(M)$，而 $\\chi$ 此前在几何侧是「外部输入」。' +
        '两边接上之后：把曲面三角剖分，$\\int_M K\\,\\mathrm{d}A = 2\\pi\\chi(M) = 2\\pi(V-E+F)$ —— ' +
        '这就是「曲率积分 = 拓扑不变量」的完整走法。',
    },

    /* ------------------------------------------------ D3：测度 ↔ 泛函 */
    /* 现状（审计 D3）：测度 ↔ 泛函分析整片只有 1 条边，而且是无关的。
       `thm.lp-banach`（$L^p$ 是 Banach 空间）的陈述里两个词都在，却一条边都不接。*/
    {
      id: 'dep.lpbanach-norm',
      kind: 'definition',
      definition: 'def.norm',
      usedBy: 'thm.lp-banach',
      note: '「$L^{p}$ 是 Banach 空间」这句话里的「空间」是**赋范空间**：先有 $\\|\\cdot\\|_{p}$ 这个范数，' +
        '完备性才是相对它说的。此前 `def.lp-norm` 的出边全在测度/分析内部，一条也没通向泛函分析。',
    },
    {
      id: 'dep.lpbanach-banach',
      kind: 'definition',
      definition: 'def.banach-space',
      usedBy: 'thm.lp-banach',
      note: '同理：结论的谓词「是 Banach 空间」本人没被引用。' +
        '`def.banach-space` 原来的入边只有 `def.complete` 一条 —— 于是 $L^{p}$ 与泛函分析互不相认。',
    },

    /* ------------------------------ D4 / T7：张量积的通名归位（§10 已定） */
    /* 现状：`def.tensor-product-vs`（**向量空间**版）的 label 是「张量积」，
       `def.tensor-module`（**模**版，更一般）叫「模的张量积」，两者零边。
       通名该归模版：$K$-向量空间就是 $K$-模；而且模版用自由群 $F/K$ 构造、
       **不依赖选择公理**，向量空间版「取一组基」反而要 AC。*/
    {
      id: 'dep.tensormodule-tensorvs',
      kind: 'definition',
      definition: 'def.tensor-module',
      usedBy: 'def.tensor-product-vs',
      note: '$K$-向量空间就是 $K$-模，所以「向量空间的张量积」是模的张量积的特例（$R = K$）。' +
        '⛔ 反方向的 `imp.derived-multilinear-tensor-dual` 是**粉边**（`layer:false`，用高级工具回头证），' +
        '所以完整图上会出现一个可视环 —— 那是粉边的语义，不参与分层，不必消除。',
    },
  ],
});
