/* ==========================================================================
   内容包 · Stone 空间的闭开加细（原书 §2.2 的练习 2.20）
   --------------------------------------------------------------------------
   只有一条，但它是 Stone 空间最实用的一条性质：
   **任何开覆盖都能换成有限的、两两不交的闭开分划。**
   有了它，「逐块定义连续函数」这件事就永远合法 —— §8.2 里
   「Stone 上 $C(S, M^{\\mathrm{disc}})$ 稠密」用的正是这一条。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'Stone 空间的闭开分划',
  nodes: [

    {
      id: 'prop.stone-clopen-refinement',
      cluster: 'topo.stone',
      type: 'proposition',
      label: 'Stone 空间的闭开加细',
      title: '命题：Stone 空间的开覆盖有有限不交闭开加细',
      regions: ['topology'],
      tags: ['命题', 'Stone 空间', '闭开集', '加细'],
      statement: [
        '设 $S$ 是 **Stone** 空间。则 $S$ 的**任何开覆盖都有有限的、两两不交的闭开加细**：存在有限族 $(C_{r})_{r \\le m}$ 使',
        '',
        '- 每个 $C_{r}$ **闭开**；',
        '- $r \\ne s$ 时 $C_{r} \\cap C_{s} = \\emptyset$；',
        '- $\\bigsqcup_{r} C_{r} = S$。',
        '',
        '且每个 $C_{r}$ 都含在覆盖的某一支之中。'
      ].join('\n'),
      notes: "⭐ 用途：它把「开覆盖」换成「**有限不交闭开分划**」，于是可以**逐块定义、逐块拼起来**。§8.2 里「Stone 空间上 $C(S, M^{\\mathrm{disc}})$ 在 $C(S, M)$ 中稠密」用的就是这一条：在每一块上取一个常值，拼成局部常值函数。",
      refs: ['Le Stum, An introduction to condensed mathematics, §2.2']
    }

  ],

  edges: [
    {
      id: 'def-link.clopenref-clopen',
      kind: 'definition',
      definition: 'def.clopen',
      usedBy: 'prop.stone-clopen-refinement',
      note: '加细用的块就是闭开集。'
    },
    {
      id: 'def-link.clopenref-stone',
      kind: 'definition',
      definition: 'def.stone-space',
      usedBy: 'prop.stone-clopen-refinement',
      note: '证明的第一步是「Stone 空间 = 投射有限空间」，用的是这条定义。'
    }
  ]
});
