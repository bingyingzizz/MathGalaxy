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
        '$$C_{r} \\text{ 闭开}, \\qquad C_{r} \\cap C_{s} = \\emptyset \\ (r \\ne s), \\qquad \\bigsqcup_{r} C_{r} = S,$$',
        '',
        '且每个 $C_{r}$ 都含在覆盖的某一支之中。'
      ].join('\n'),
      notes: [
        ['**证明。** Stone 空间就是**投射有限**空间：$S = \\varprojlim_{i \\in I} S_{i}$，每个 $S_{i}$ 有限离散、转移映射满 ✓。于是','$$\\bigl\\{\\, \\pi_{i}^{-1}(x) \\;:\\; i \\in I,\\ x \\in S_{i} \\,\\bigr\\}$$','是 $S$ 的一组**闭开**集基，而且对 $i \\le j$ 有嵌套（$\\pi_{j}$ 的纤维含在 $\\pi_{i}$ 的纤维里）✓。','**① 先取有限闭开子覆盖。** 给定开覆盖 $(U_{\\alpha})$：对每个 $s \\in S$ 取 $i(s)$ 与 $x := \\pi_{i(s)}(s)$，使','$$D_{s} := \\pi_{i(s)}^{-1}(x) \\subseteq U_{\\alpha(s)}$$','（用基的闭开性，取直径足够细的那一层）✓。$\\{D_{s}\\}$ 是开覆盖，而 $S$ **紧** $\\implies$ 抽出有限子覆盖 $D_{1}, \\ldots, D_{m}$ ✓。','**② 再两两不交化。** 记 $D^{1}_{j} := D_{j}$、$D^{0}_{j} := S \\setminus D_{j}$，对每个 $\\varepsilon \\in \\{0,1\\}^{m}$ 取','$$C_{\\varepsilon} := D^{\\varepsilon_{1}}_{1} \\cap \\cdots \\cap D^{\\varepsilon_{m}}_{m}.$$','每个 $C_{\\varepsilon}$ 是闭开的（有限交、补）✓；不同 $\\varepsilon$ 的 $C_{\\varepsilon}$ **两两不交** ✓；它们**并为** $S$（每点属于唯一一个 $C_{\\varepsilon}$）✓。去掉空集，得到有限族 $(C_{r})$。','**③ 每块含在某一支里。** 若 $C_{\\varepsilon} \\ne \\emptyset$，取 $s \\in C_{\\varepsilon}$；由 $\\{D_{j}\\}$ 覆盖 $S$，有 $j$ 使 $s \\in D_{j}$ —— 而 $s \\in D_{j}$ 说明 $\\varepsilon_{j} = 1$，于是','$$C_{\\varepsilon} \\subseteq D_{j} \\subseteq U_{\\alpha(j)} ✓$$','∎'].join('\n'),
        '⭐ 用途：它把「开覆盖」换成「**有限不交闭开分划**」，于是可以**逐块定义、逐块拼起来**。§8.2 里「Stone 空间上 $C(S, M^{\\mathrm{disc}})$ 在 $C(S, M)$ 中稠密」用的就是这一条：在每一块上取一个常值，拼成局部常值函数。'
      ].join('\n\n'),
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
