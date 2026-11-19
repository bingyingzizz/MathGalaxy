/* ==========================================================================
   内容包 · 第 1 章的习题结论（14 条）
   --------------------------------------------------------------------------
   ⚠️ 把一大堆**必要的结论**放在 Exercise 里（「Define …」「Show that …」），
   它们和 Proposition 一样是内容，不该漏。这一包收第 1 章里最有用的那些。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '第 1 章的习题结论',
  nodes: [

    {
      id: 'ex.algebra-categories',
      cluster: 'cat.algebra',
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
          '- $k\\text{-}\\mathbf{Alg}$：$k$-代数（$k$ 交换环）。',
          '',
          '各范畴的极限、余极限与 AB 公理见 `def.category-of-monoids`、`def.category-of-groups`、`def.category-of-rings`、`def.category-of-g-sets`、`def.module-category`、`def.category-of-algebras`、`def.category-of-sets`、`def.category-of-topological-spaces`、`def.category-of-abelian-groups`、`def.category-of-vector-spaces`；统一构造见 `prop.algebra-categories-limits` 与 `prop.algebra-categories-colimits`。'
        ].join('\n')
      ].join('\n'),
      notes: '⭐ **它们的共同点**：全都是「集合 + 运算 + 公理」，只是运算的元数与公理的条数不同。\n\n所以**关于它们的定理几乎逐字通用**（极限逐点算、遗忘函子保所有极限、自由对象是左伴随……）。\n\n**两个特殊的**：$G\\text{-}\\mathbf{Set}$ 是**函子范畴**（$G$ 看成单对象范畴，$G$-集就是 $G \\to \\mathbf{Set}$ 的函子，$G$-映射就是自然变换）；\n\n$A\\text{-}\\mathbf{Mod}$ 是同调代数的样板间。',
      refs: ['Lang, Algebra']
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
      notes: "⭐ 这正是「交换化是左伴随」的含义：它是「把非交换性清零」的**最经济**的函子 —— 任何到阿贝尔群的映射都只能看到 $G^{\\mathrm{ab}}$。",
      refs: ['Le Stum, Exercise 1.9'],
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
        '$$\\lim D = \\inf D, \\qquad \\varinjlim D = \\sup D,$$',
        '即极限是**下确界**、余极限是**上确界**。',
        '',
        '只要它们存在。'
      ].join('\n'),
      notes: "⭐ **这条把整套范畴语言翻译成序语言**，也是最好的入门例子：\n\n\n\n- **积** = 下确界 $\\inf\\{x, y\\}$；**余积** = 上确界 $\\sup\\{x, y\\}$；\n- **终对象** = 最大元；**始对象** = 最小元；\n- **拉回**（纤维积）= 两个元素的下确界；**推出** = 上确界；\n- **等化子**：因为 Hom 至多一个元素，平行的 $f, g$ 只有「相等」或「不平行」两种，所以等化子平凡。\n\n**由此立刻得到**：完备格 = 有所有小极限与小余极限的偏序集；$\\mathbb{Q}$ 作为偏序集**不**完备（$\\{q : q^{2} < 2\\}$ 没有上确界）—— 这与实数完备性那条是同一件事的两种说法。",
      refs: ['Le Stum, Exercise 1.30'],
    },

    {
      id: 'def.strict-morphism',
      cluster: 'cat.structure',
      type: 'definition',
      label: '严格态射',
      title: '严格态射',
      regions: ['category'],
      tags: ['范畴论', '严格', '余像', '像'],
      statement: [
        '态射 $f : X \\to Y$ 叫**严格的**（strict），如果它在**余像**上的分解 $X \\twoheadrightarrow \\operatorname{coim} f \\to \\operatorname{im} f \\hookrightarrow Y$ 中间那一步是**同构** —— 即「余像与像之间的自然映射」可逆。'
      ].join('\n'),
      notes: [
        '⭐ **「严格」是阿贝尔范畴与一般范畴的分水岭**：阿贝尔范畴的**每条态射都严格**；而 $\\mathbf{Top}$ 里不严格。',
        '**反例为什么在拓扑里出现**：$\\mathbb{R}^{\\mathrm{disc}} \\to \\mathbb{R}$ 是单态射（同构于自己的像），但它的**余像**平凡（因为像在余核里被商掉了），于是余像 $\\to$ 像那一步不是同构。\n\n**这正是一条 $\\mathbf{Top}$ 上「拓扑阿贝尔群不是阿贝尔范畴」的原因。**',
        '**在 $\\mathbf{Set}$ 与 $\\mathbf{Ab}$ 里每条态射都严格**：那边余像与像都能具体算成分解，中间那个映射就是恒等。',
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 1.33'],
    },

    {
      id: 'prop.preserves-products-kernels',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '保积与核 ⟹ 保所有有限极限',
      title: '保积 + 保核 $\\implies$ 保所有有限极限',
      regions: ['category'],
      tags: ['范畴论', '保极限', '积', '核', '左正合'],
      statement: '函子 $F$ 若保**所有有限积**与**所有核**（等化子），则 $F$ 保**所有有限极限**（即 $F$ 左正合）。',
    notes:         "⚠️ 只保「积」不够：还要保核（等化子），否则上面第二条会断。",
      refs: ['Le Stum, An introduction to condensed mathematics, §1.4.2']
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
      ].join('\n'),
      refs: ['Le Stum, Exercise 1.46'],
    },

    {
      id: 'prop.projective-coproduct',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '投射对象的余积投射',
      title: '投射对象的余积还是投射的',
      regions: ['homology'],
      tags: ['同调代数', '投射对象', '余积', '对偶'],
      statement: '投射对象的**余积**还是投射的；对偶地，内射对象的**积**还是内射的。',
      notes: "对偶地（把上面每个箭头反向、余积换积、满态射换单态射）：内射对象的积仍内射。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1–5.2']
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
      notes: "⭐ **实用价值**：这条让「在 $\\mathcal{C}$ 里算极限」与「在 $\\mathrm{Ab}(\\mathcal{C})$ 里算极限」完全一致 —— 凝聚态那一侧 $\\mathrm{Ab}(\\mathrm{Cond}) = \\mathrm{CondAb}$ 有所有极限，就是这条在 $\\mathcal{C} = \\mathrm{Cond}$ 上的一次应用。",
      refs: ['Le Stum, Exercise 1.52']
    },

    {
      id: 'prop.left-adjoint-unique',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '左伴随唯一',
      title: '同一个右伴随的左伴随在同构意义下唯一',
      regions: ['category'],
      tags: ['范畴论', '伴随', '唯一性'],
      statement: '若 $F_{1} \\dashv G$ 且 $F_{2} \\dashv G$，则 $F_{1} \\cong F_{2}$（对偶地：同一个左伴随的右伴随在同构意义下唯一）。',
    notes:         "",
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    {
      id: 'prop.counit-epi-iff-faithful',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '余单位与忠实性',
      title: '$G$ 忠实 $\\iff$ 余单位是满',
      regions: ['category'],
      tags: ['范畴论', '伴随', '余单位', '忠实'],
      statement: '设 $F \\dashv G$，单位 $\\eta$、余单位 $\\varepsilon$。则 $G$ **忠实** $\\iff$ 余单位 $\\varepsilon$ 是**满态射**（对偶地：$F$ 忠实 $\\iff$ 单位是单态射）。',
    notes:         "",
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    {
      id: 'prop.ab6',
      cluster: 'hom.ab',
      type: 'proposition',
      label: 'AB6：滤过余极限与积交换',
      title: '$\\mathbf{Ab}$ 满足 AB6',
      regions: ['homology'],
      tags: ['同调代数', 'AB6', '滤过余极限', '积'],
      statement: [
        '在 $\\mathbf{Ab}$（以及 $A\\text{-}\\mathbf{Mod}$）里**一族滤过余极限与积交换**，这就是 Grothendieck 的 **AB6** 公理：对任意指标族 $J$、**各自**的滤过范畴 $I_{j}$（$j \\in J$）与函子 $M_{j} : I_{j} \\to \\mathbf{Ab}$，自然映射',
        '',
        '$$\\varinjlim_{(i_{j})_{j} \\in \\prod_{j} I_{j}} \\ \\prod_{j \\in J} M_{j}(i_{j}) \\longrightarrow \\prod_{j \\in J} \\varinjlim_{i_{j} \\in I_{j}} M_{j}(i_{j})$$',
        '',
        '是同构。'
      ].join('\n'),
      notes: "⚠️ **关键是「每个 $j$ 各有自己的滤过范畴」。** 若所有 $j$ 共用同一个 $I$（取对角），断言**是错的** —— 那时只有 $J$ **有限**才对（那就是「滤过余极限与有限积交换」，来自滤过余极限是 sifted 余极限）。\n反例：$I = (\\mathbb{N}, \\le)$、$M_{i,j} = \\mathbb{Z}/p^{i}$，转移映射取「乘以 $p$」，于是 $\\varinjlim_{i} \\mathbb{Z}/p^{i} = \\mathbb{Z}[1/p]/\\mathbb{Z}$。\n\n取 $t = (t_{j})_{j}$，其中 $t_{j}$ 是阶为 $p^{j}$ 的那个元素：任何单个 $i$ 上，元素只能有阶 $\\le p^{i}$，所以 $j > i$ 的分量根本提不出来 —— 而 $\\prod_{j} I_{j}$ 上就没这个问题，每个 $j$ 可以各自跑到够高的层级。\n\n与 AB5 的关系：AB6 = AB5 + 上面这条（AB5 管「滤过余极限正合」，AB6 再管「它与积交换」）。",
      refs: ['Le Stum, Definition 5.2.5']
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
      notes: "**反射函子**就是「取形式余极限的真正余极限」：把 Ind-对象「$\\varinjlim X_{i}$」送到 $\\mathcal{C}$ 里真实存在的那个 $\\varinjlim X_{i}$。\n\n⭐ 于是 $\\operatorname{Ind}(\\mathcal{C})$ 是「把 $\\mathcal{C}$ 补齐到对滤过余极限封闭」的最小范畴 —— 反射性说的正是「补完之后原来的东西没被改坏」。",
      refs: ['Le Stum, An introduction to condensed mathematics, §1.3']
    },

    {
      id: 'prop.filtered-finite-colimits',
      cluster: 'cat.limit',
      type: 'proposition',
      label: '滤过 + 有限余极限 ⟹ 所有余极限',
      title: '有余滤过余极限与有限余极限 $\\implies$ 有所有余极限',
      regions: ['category'],
      tags: ['范畴论', '滤过余极限', '余极限', '完备性'],
      statement: '有**滤过余极限**与**有限余极限**的范畴有**所有余极限**。',
    notes:         "⚠️ 前提「有限余极限」不能只留「余积」：还要有推出 / 余等化子，上面的两步走才封得住。",
      refs: ['Le Stum, An introduction to condensed mathematics, §1.3']
    },

    {
      id: 'prop.ring-tensor-coproduct',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '交换环的纤维余积是张量积',
      title: '交换环的推出 = 张量积',
      regions: ['algebra', 'category'],
      tags: ['代数', '环', '张量积', '推出'],
      statement: '在**交换环**范畴里，沿 $A \\to B$、$A \\to C$ 的**纤维余积**（推出）是 $B \\otimes_{A} C$。',
      notes: "⚠️ **交换性是必需的**：非交换环上，$B\\otimes_{A}C$ 一般不是环（乘法在张量积上不下降）—— 那时纤维余积要用自由积 / 余等化子另造。",
      refs: ['Le Stum, Exercise 1.36']
    }
  ],

  edges: [
    { id: 'dep.cat-sets-ex-algebra-categories', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'ex.algebra-categories', note: '陈述以集合范畴 $\\mathbf{Set}$ 为环境范畴' },
    { id: 'dep.cat-ab-prop-abelianization', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.abelianization', note: '陈述以阿贝尔群范畴 $\\mathbf{Ab}$ 为环境范畴' },
    { id: 'dep.cat-ab-prop-ab6', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.ab6', note: '陈述以阿贝尔群范畴 $\\mathbf{Ab}$ 为环境范畴' },
    {
      id: "imp.abelianization",
      kind: "implication",
      strength: "strong",
      sources: ["def.commutator-subgroup","def.quotient-group","def.group-hom"],
      target: "prop.abelianization",
      note: "换位子被送到单位元，万有性质给出自然双射。",
      proof: "**证明。** 要造自然双射\n$$\\operatorname{Hom}_{\\mathbf{Grp}}(G,\\ A) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Ab}}\\bigl(G^{\\mathrm{ab}},\\ A\\bigr),\\qquad A\\ \\text{阿贝尔}.$$\n- **良定义**：任给群同态 $\\varphi : G\\to A$（$A$ 阿贝尔）。\n\n换位子 $ghg^{-1}h^{-1}$ 被送到 $\\varphi(g)\\varphi(h)\\varphi(g)^{-1}\\varphi(h)^{-1} = e$（交换性！），故 $[G,G] \\subseteq \\ker\\varphi$，于是 $\\varphi$ 唯一地穿过商 $G\\twoheadrightarrow G^{\\mathrm{ab}}$ ✓。\n- **反向**是 $G\\to G^{\\mathrm{ab}}$ 与函数的复合 ✓，且两个方向互逆（在 $G^{\\mathrm{ab}}$ 上验一次、在 $\\operatorname{Hom}(G,A)$ 上验一次）✓。\n- **自然性**对 $G$ 与 $A$ 都逐项验证（$G\\to G'$ 的像把 $[G,G]$ 送进 $[G',G']$，故诱导 $G^{\\mathrm{ab}}\\to G'^{\\mathrm{ab}}$）✓。∎",
    }
  ]
});
