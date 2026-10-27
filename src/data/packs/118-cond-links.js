/* ==========================================================================
   内容包 · 接线：完备化判据引用的三个范畴论定义
   --------------------------------------------------------------------------
   背景：`lem.solid-completion-criterion` 是纯范畴论引理，原文里它的假设直接
   就是「阿贝尔范畴 + 一族紧投射生成元」。上一版没接线，它因此掉进了第 0 层
   （`_layers` 报「层 0 里还有 完备化判据」）。这里补上三条定义边。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '接线：完备化判据的范畴论前提',

  nodes: [],

  edges: [
    {
      id: 'def-link.solid-criterion-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'lem.solid-completion-criterion',
      note: '引理的假设第一条就是「$\\mathcal{A}$ 是阿贝尔范畴」—— 核、余核、复形、同调全都在这里取。'
    },
    {
      id: 'def-link.solid-criterion-projective',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'lem.solid-completion-criterion',
      note: '要求 $\\mathcal{A}_0$ 由**紧投射**对象组成：紧性用来让 $\\operatorname{RHom}(F(S), -)$ 与直和交换，投射性用来把消解搬来搬去。'
    },
    {
      id: 'def-link.solid-criterion-generator',
      kind: 'definition',
      definition: 'def.generator',
      usedBy: 'lem.solid-completion-criterion',
      note: '要求 $\\mathcal{A}_0$ 是**生成元族**：否则 $\\mathcal{A}_F$ 里可能有非零对象在所有 $F(S)$ 上都看不见，完备化子范畴就不是「由 $F$ 决定」的了。'
    }
  ]
});
