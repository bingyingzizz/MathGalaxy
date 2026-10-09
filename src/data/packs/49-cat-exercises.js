/* ==========================================================================
   内容包 · 原书第 1 章的习题结论（14 条）
   --------------------------------------------------------------------------
   ⚠️ 原书把一大堆**必要的结论**放在 Exercise 里（「Define …」「Show that …」），
   它们和 Proposition 一样是内容，不该漏。这一包收第 1 章里最有用的那些。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '原书第 1 章的习题结论',
  nodes: [

    {
      id: 'ex.algebra-categories',
      cluster: 'algebra.structures',
      type: 'example',
      label: '代数的几个范畴',
      title: '$\\mathrm{Mon}$、$\\mathrm{Gr}$、$\\mathrm{Rng}$、$G\\text{-}\\mathbf{Set}$、$A\\text{-}\\mathbf{Mod}$、$k\\text{-}\\mathbf{Alg}$',
      regions: ['algebra', 'category'],
      tags: ['代数', '范畴', '幺半群', '环', '模', '代数'],
      statement: [
        '常用的代数范畴（对象 + 保结构映射）：',
        '',
        [
          '- $\\mathrm{Mon}$：幺半群；',
          '- $\\mathrm{Gr}$（也写 $\\mathbf{Grp}$）：群；',
          '- $\\mathrm{Rng}$：环；',
          '- $G\\text{-}\\mathbf{Set}$：$G$-集（带 $G$ 作用的集合）；',
          '- $A\\text{-}\\mathbf{Mod}$：$A$-模；',
          '- $k\\text{-}\\mathbf{Alg}$：$k$-代数（$k$ 交换环）。'
        ].join('\n')
      ].join('\n'),
      notes: '⭐ **它们的共同点**：全都是「集合 + 运算 + 公理」，只是运算的元数与公理的条数不同。所以**关于它们的定理几乎逐字通用**（极限逐点算、遗忘函子保所有极限、自由对象是左伴随……）。\n\n**两个特殊的**：$G\\text{-}\\mathbf{Set}$ 是**函子范畴**（$G$ 看成单对象范畴，$G$-集就是 $G \\to \\mathbf{Set}$ 的函子，$G$-映射就是自然变换）；$A\\text{-}\\mathbf{Mod}$ 是同调代数的样板间。\n\n📌 原书 **Exercise 1.1**。'
    },

    {
      id: 'prop.abelianization',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '交换化',
      title: '交换化 $G \\mapsto G^{\\mathrm{ab}}$ 是左伴随',
      regions: ['algebra'],
      tags: ['代数', '群', '交换化', '伴随'],
      statement: [
        '**交换化**函子',
        '',
        '$$(-)^{\\mathrm{ab}} : \\mathbf{Grp} \\longrightarrow \\mathbf{Ab}, \\qquad G \\longmapsto G^{\\mathrm{ab}} := G / [G, G]$$',
        '',
        '是含入函子 $\\mathbf{Ab} \\hookrightarrow \\mathbf{Grp}$ 的**左伴随**。'
      ].join('\n'),
      notes: [
        '记号 $[G, G]$ 是**换位子子群**（由所有 $g h g^{-1} h^{-1}$ 生成）—— 它是正规子群，商掉它正好把「非交换性」清零。',
        '⭐ **伴随的读法**：任何群同态 $G \\to A$（$A$ 阿贝尔）都唯一地穿过 $G \\to G^{\\mathrm{ab}}$。也就是说**「从 $G$ 到阿贝尔群」的映射全都只看 $G^{\\mathrm{ab}}$** —— 这就是「交换化是最经济的把群变阿贝尔的办法」。',
        '**例子**：自由群 $F(S)^{\\mathrm{ab}} \\cong \\mathbb{Z}^{\\oplus S}$（自由阿贝尔群）。所以「自由阿贝尔群函子」= 「自由群函子」再交换化。',
        '📌 原书 **Exercise 1.9**。它同时说明 $\\mathbf{Ab} \\hookrightarrow \\mathbf{Grp}$ 除了是满子范畴之外，还有一条左伴随 —— 于是 $\\mathbf{Ab}$ 是 $\\mathbf{Grp}$ 的**反射子范畴**。'
      ].join('\n\n')
    },

    {
      id: 'prop.poset-limit-join',
      cluster: 'cat.limit',
      type: 'proposition',
      label: '偏序集里的极限是交',
      title: '偏序集里：极限 = 下确界，余极限 = 上确界',
      regions: ['category', 'order-theory'],
      tags: ['范畴论', '极限', '偏序集', '上确界', '下确界'],
      statement: [
        '把偏序集 $(P, \\preceq)$ 看作范畴（对象是元素，$x \\to y \\iff x \\preceq y$）。则对任何图 $D : I \\to P$：',
        '',
        '$$\\lim D = \\inf D \\;(\\text{下确界}), \\qquad \\varinjlim D = \\sup D \\;(\\text{上确界}),$$',
        '',
        '只要它们存在。'
      ].join('\n'),
      notes: [
        '⭐ **这条把整套范畴语言翻译成序语言**，也是最好的入门例子：',
        '',
        [
          '- **积** = 下确界 $\\inf\\{x, y\\}$；**余积** = 上确界 $\\sup\\{x, y\\}$；',
          '- **终对象** = 最大元；**始对象** = 最小元；',
          '- **拉回**（纤维积）= 两个元素的下确界；**推出** = 上确界；',
          '- **等化子**：因为 Hom 至多一个元素，平行的 $f, g$ 只有「相等」或「不平行」两种，所以等化子平凡。'
        ].join('\n'),
        '**由此立刻得到**：完备格 = 有所有小极限与小余极限的偏序集；$\\mathbb{Q}$ 作为偏序集**不**完备（$\\{q : q^{2} < 2\\}$ 没有上确界）—— 这与实数完备性那条是同一件事的两种说法。',
        '📌 原书 **Exercise 1.30**。'
      ].join('\n\n')
    },

    {
      id: 'def.strict-morphism',
      cluster: 'cat.structure',
      type: 'definition',
      label: '严格态射',
      title: '严格态射（Strict Morphism）',
      regions: ['category'],
      tags: ['范畴论', '严格', '余像', '像'],
      statement: [
        '态射 $f : X \\to Y$ 叫**严格的**（strict），如果它在**余像**上的分解 $X \\twoheadrightarrow \\operatorname{coim} f \\to \\operatorname{im} f \\hookrightarrow Y$ 中间那一步是**同构** —— 即「余像与像之间的自然映射」可逆。'
      ].join('\n'),
      notes: [
        '⭐ **「严格」是阿贝尔范畴与一般范畴的分水岭**：阿贝尔范畴的**每条态射都严格**；而 $\\mathbf{Top}$ 里不严格。',
        '**反例为什么在拓扑里出现**：$\\mathbb{R}^{\\mathrm{disc}} \\to \\mathbb{R}$ 是单态射（同构于自己的像），但它的**余像**平凡（因为像在余核里被商掉了），于是余像 $\\to$ 像那一步不是同构。**这正是一条 $\\mathbf{Top}$ 上「拓扑阿贝尔群不是阿贝尔范畴」的原因。**',
        '**在 $\\mathbf{Set}$ 与 $\\mathbf{Ab}$ 里每条态射都严格**：那边余像与像都能具体算成分解，中间那个映射就是恒等。',
        '📌 原书 **Exercise 1.33**。'
      ].join('\n\n')
    },

    {
      id: 'prop.preserves-products-kernels',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '保积与核 ⟹ 保所有有限极限',
      title: '保积 + 保核 $\\implies$ 保所有有限极限',
      regions: ['category'],
      tags: ['范畴论', '保极限', '积', '核', '左正合'],
      statement: '函子 $F$ 若保**所有有限积**与**所有核**（等化子），则 $F$ 保**所有有限极限**（即 $F$ 左正合）。'
    },

    {
      id: 'prop.preserves-fibered-products-mono',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '保纤维积 ⟹ 保单态射',
      title: '保拉回 $\\implies$ 保单态射',
      regions: ['category'],
      tags: ['范畴论', '纤维积', '拉回', '单态射', '保'],
      statement: '函子 $F$ 若保**纤维积**（拉回），则 $F$ 保**单态射**；对偶地，若保**纤维余积**（推出），则保**满态射**。',
      notes: [
        '**为什么**：$f : Y \\to X$ 是单态射，等价于说「$Y \\to X$ 上 $\\mathrm{id}$ 与 $\\mathrm{id}$ 的两个拉回重合」，即方块',
        '',
        '$$\\begin{array}{ccc} Y & \\xrightarrow{\\;\\mathrm{id}\\;} & Y \\\\[2pt] {\\scriptstyle \\mathrm{id}}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle f} \\\\[2pt] Y & \\xrightarrow[\\;f\\;]{} & X \\end{array}$$',
        '',
        '是拉回方块。保拉回就把这个重合保下来了，于是 $F(f)$ 仍是单态射。∎',
        '📌 原书 **Exercise 1.46**。'
      ].join('\n')
    },

    {
      id: 'prop.projective-coproduct',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '投射对象的余积投射',
      title: '投射对象的余积还是投射的',
      regions: ['homology'],
      tags: ['同调代数', '投射对象', '余积', '对偶'],
      statement: '投射对象的**余积**还是投射的；对偶地，内射对象的**积**还是内射的。'
    },

    {
      id: 'prop.ab-limits-forgetful',
      cluster: 'hom.ab',
      type: 'proposition',
      label: 'Ab(C) 的极限',
      title: '$\\mathrm{Ab}(\\mathcal{C})$ 有所有极限',
      regions: ['homology', 'category'],
      tags: ['同调代数', '阿贝尔群对象', '极限', '遗忘函子'],
      statement: '若 $\\mathcal{C}$ 有所有极限，则 $\\mathrm{Ab}(\\mathcal{C})$ 也有所有极限，并且**遗忘函子** $\\mathrm{Ab}(\\mathcal{C}) \\to \\mathcal{C}$ 保它们。',
      notes: '⭐ **实用价值**：这条让「在 $\\mathcal{C}$ 里算极限」与「在 $\\mathrm{Ab}(\\mathcal{C})$ 里算极限」完全一致 —— 凝聚态那一侧 $\\mathrm{Ab}(\\mathrm{Cond}) = \\mathrm{CondAb}$ 有所有极限，就是这条在 $\\mathcal{C} = \\mathrm{Cond}$ 上的一次应用。\n\n📌 原书 **Exercise 1.52**。'
    },

    {
      id: 'prop.left-adjoint-unique',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '左伴随唯一',
      title: '同一个右伴随的左伴随在同构意义下唯一',
      regions: ['category'],
      tags: ['范畴论', '伴随', '唯一性'],
      statement: '若 $F_{1} \\dashv G$ 且 $F_{2} \\dashv G$，则 $F_{1} \\cong F_{2}$（对偶地：同一个左伴随的右伴随在同构意义下唯一）。'
    },

    {
      id: 'prop.counit-epi-iff-faithful',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '余单位与忠实性',
      title: '$G$ 忠实 $\\iff$ 余单位是满',
      regions: ['category'],
      tags: ['范畴论', '伴随', '余单位', '忠实'],
      statement: '设 $F \\dashv G$，单位 $\\eta$、余单位 $\\varepsilon$。则 $G$ **忠实** $\\iff$ 余单位 $\\varepsilon$ 是**满态射**（对偶地：$F$ 忠实 $\\iff$ 单位是单态射）。'
    },

    {
      id: 'prop.ab6',
      cluster: 'hom.ab',
      type: 'proposition',
      label: 'AB6：滤过余极限与积交换',
      title: '$\\mathbf{Ab}$ 满足 AB6',
      regions: ['homology'],
      tags: ['同调代数', 'AB6', '滤过余极限', '积'],
      statement: '在 $\\mathbf{Ab}$（以及 $A\\text{-}\\mathbf{Mod}$）里，**滤过余极限与积交换** —— 这就是 Grothendieck 的 **AB6** 公理。'
    },

    {
      id: 'prop.ind-reflective',
      cluster: 'cat.limit',
      type: 'proposition',
      label: 'C 是 Ind(C) 的反射子范畴',
      title: '$\\mathcal{C} \\hookrightarrow \\operatorname{Ind}(\\mathcal{C})$ 是反射',
      regions: ['category'],
      tags: ['范畴论', 'Ind-对象', '反射子范畴', '滤过余极限'],
      statement: '若 $\\mathcal{C}$ 有滤过余极限，则 $\\mathcal{C}$ 是 $\\operatorname{Ind}(\\mathcal{C})$ 的**反射子范畴**。',
      notes: '**反射函子**就是「取形式余极限的真正余极限」：把 Ind-对象「$\\varinjlim X_{i}$」送到 $\\mathcal{C}$ 里真实存在的那个 $\\varinjlim X_{i}$。\n\n⭐ 于是 $\\operatorname{Ind}(\\mathcal{C})$ 是「把 $\\mathcal{C}$ 补齐到对滤过余极限封闭」的最小范畴 —— 反射性说的正是「补完之后原来的东西没被改坏」。\n\n📌 原书 **Exercise 1.73**。'
    },

    {
      id: 'prop.filtered-finite-colimits',
      cluster: 'cat.limit',
      type: 'proposition',
      label: '滤过 + 有限余极限 ⟹ 所有余极限',
      title: '有余滤过余极限与有限余极限 $\\implies$ 有所有余极限',
      regions: ['category'],
      tags: ['范畴论', '滤过余极限', '余极限', '完备性'],
      statement: '有**滤过余极限**与**有限余极限**的范畴有**所有余极限**。'
    },

    {
      id: 'prop.ring-tensor-coproduct',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '交换环的纤维余积是张量积',
      title: '交换环的推出 = 张量积',
      regions: ['algebra', 'category'],
      tags: ['代数', '环', '张量积', '推出'],
      statement: '在**交换环**范畴里，沿 $A \\to B$、$A \\to C$ 的**纤维余积**（推出）是 $B \\otimes_{A} C$。'
    }
  ],

  edges: []
});
