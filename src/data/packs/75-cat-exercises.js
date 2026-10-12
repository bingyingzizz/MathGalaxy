/* ==========================================================================
   内容包 · 原书第 1 章练习里的性质（小节点）
   --------------------------------------------------------------------------
   1.17 · 1.15+1.18 · 1.32 · 1.49 · 1.53 · 1.63 · 1.74
   （1.24 / 1.25 / 1.26 / 1.37 / 1.39 / 1.40 / 1.42 / 1.44 / 1.47 / 1.51 / 1.64 / 1.67 / 1.70
     的内容已在图上，只登记书号）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '范畴论的性质',

  nodes: [

    /* ----------------------------------------------------- 1.17 */
    {
      id: 'prop.fully-faithful-injective',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '全忠实函子本质单射',
      title: '命题：$F$ 全忠实 $\\implies$ $F(X) \\cong F(Y)$ 则 $X \\cong Y$',
      regions: ['category'],
      tags: ['命题', '全忠实', '本质单射', '同构'],
      statement: [
        '若 $F : \\mathcal{C} \\to \\mathcal{D}$ **全忠实**，则它**本质单射**：',
        '',
        '$$F(X) \\cong F(Y) \\implies X \\cong Y.$$'
      ].join('\n'),
      notes: [
        '**证明。** 给同构 $u : F(X) \\to F(Y)$。由全忠实，$u$ 唯一地来自某个 $f : X \\to Y$，$u^{-1}$ 唯一地来自某个 $g : Y \\to X$ ✓。于是 $F(g f) = u^{-1} u = 1_{F(X)} = F(1_{X})$ ✓，再由全忠实（忠实）得 $g f = 1_{X}$ ✓；对称地 $f g = 1_{Y}$ ✓。∎',
        '⚠️ 反过来不对：本质单射的函子未必全忠实。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.17']
    },

    /* ----------------------------------------------------- 1.15 + 1.18 */
    {
      id: 'prop.preorder-as-category',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '预序集就是「Hom 至多一元」的小范畴',
      title: '命题：预序集 $\\hookrightarrow$ 小范畴，且与其有序商等价',
      regions: ['category'],
      tags: ['命题', '预序集', '小范畴', '全忠实', '范畴等价'],
      statement: [
        '1. 把预序集看成小范畴（$x \\le y$ 给唯一态射）给出一个**全忠实**函子，其本质像恰是「每对对象之间至多一个态射」的小范畴；',
        '2. 预序集 $X$ 与它的**有序商** $Y$（把 $x \\le y \\le x$ 粘起来）是**等价**的范畴。'
      ].join('\n'),
      notes: [
        '**证明。** (1) 两个预序集之间的函子就是保序映射 ✓，而 Hom 集至多一个元素让忠实与满自动成立 ✓。(2) 商映射 $X \\to Y$ 保序 ✓；在每个等价类里选一个代表，给出反方向函子 $Y \\to X$ ✓；两个复合都是恒等（在 $Y$ 上）或与恒等自然同构（在 $X$ 上，$x \\le$ 代表 $\\le x$）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.15, Exercise 1.18']
    },

    /* ----------------------------------------------------- 1.32 */
    {
      id: 'prop.slice-fully-faithful-mono',
      cluster: 'cat.structure',
      type: 'proposition',
      label: '单态射的切片刻画',
      title: '命题：$f$ 单 $\\iff$ $\\mathcal{C}/Y \\to \\mathcal{C}/X$ 全忠实',
      regions: ['category'],
      tags: ['命题', '单态射', '满态射', '切片范畴', '全忠实'],
      statement: [
        '态射 $f : Y \\to X$ 是**单态射** $\\iff$ 沿 $f$ 的切片函子',
        '',
        '$$\\mathcal{C}/Y \\longrightarrow \\mathcal{C}/X, \\qquad (A \\to Y) \\longmapsto (A \\to Y \\to X)$$',
        '',
        '是**全忠实**的。对偶地：$f$ 是满态射 $\\iff$ $X\\backslash\\mathcal{C} \\to Y\\backslash\\mathcal{C}$ 全忠实。'
      ].join('\n'),
      notes: [
        '**证明。** 该函子在 Hom 集上就是包含映射（两边都是 $\\operatorname{Hom}(A, B)$ 的子集），所以**忠实自动成立** ✓，只需看满。',
        '**$(\\Longrightarrow)$** 给 $v : A \\to B$ 与 $b \\circ v = f \\circ a$：由 $f$ 单得 $b \\circ v = a$ ✓，即 $v$ 是 $/Y$ 里的态射 ✓。',
        '**$(\\Longleftarrow)$** 若 $f g = f h$，取 $a = g$、$b = 1_{Y}$：在 $/X$ 里 $h$ 与 $g$ 都是同一对对象之间的态射，由忠实得 $g = h$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.32']
    },

    /* ----------------------------------------------------- 1.49 */
    {
      id: 'prop.projective-universal-epi',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '投射对象与满态射的截面',
      title: '命题：满态射万有时，投射 $\\iff$ 到它的满射都分裂',
      regions: ['category'],
      tags: ['命题', '投射对象', '满态射', '截面', '拉回'],
      statement: [
        '设 $\\mathcal{C}$ 有纤维积、且**满态射是万有的**（沿任意态射拉回仍是满态射）。则',
        '',
        '$$X \\text{ 是投射对象} \\iff \\text{每个满态射 } Y \\twoheadrightarrow X \\text{ 都有截面}.$$'
      ].join('\n'),
      notes: [
        '**证明。**',
        '**$(\\Longleftarrow)$** 给满态射 $p : Y \\twoheadrightarrow Z$ 与 $f : X \\to Z$。取拉回 $X \\times_{Z} Y \\to X$：由万有性它是满态射 ✓，于是有截面 $s$ ✓；$s$ 与第二条投影复合给出 $X \\to Y$ 使 $p \\circ (\\text{复合}) = f$ ✓，即 $f$ 提升 ✓。',
        '**$(\\Longrightarrow)$** 满态射 $Y \\twoheadrightarrow X$ 本身就是一次提升测试（拿 $1_{X}$ 去提升）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.49']
    },

    /* ----------------------------------------------------- 1.53 */
    {
      id: 'prop.functor-preserves-monoid-objects',
      cluster: 'cat.algebra',
      type: 'proposition',
      label: '保有限积的函子作用于代数对象',
      title: '命题：$F$ 保有限积 $\\implies F$ 诱导 $\\mathrm{Mon}(\\mathcal{C}) \\to \\mathrm{Mon}(\\mathcal{D})$',
      regions: ['category'],
      tags: ['命题', '幺半群对象', '群对象', '环对象', '保有限积'],
      statement: [
        '若 $F : \\mathcal{C} \\to \\mathcal{D}$ **保有限积**（含终对象），则它把',
        '',
        '$$\\text{幺半群对象} \\longmapsto \\text{幺半群对象}, \\qquad \\text{群对象} \\longmapsto \\text{群对象}, \\qquad \\text{环对象} \\longmapsto \\text{环对象},$$',
        '',
        '以及 $G$-对象、$A$-模、$k$-代数同理 —— 于是它诱导出 $\\mathrm{Mon}(\\mathcal{C}) \\to \\mathrm{Mon}(\\mathcal{D})$ 等一串函子。'
      ].join('\n'),
      notes: [
        '**证明。** 一个群对象就是「$m : G \\times G \\to G$、$e : \\mathbf{1} \\to G$、$i : G \\to G$ 加上若干交换图」✓。$F$ 保有限积（特别地保 $G \\times G$ 与 $\\mathbf{1}$），把这些态射与交换图逐条搬过去，得到的仍是群对象 ✓。环对象、模、$G$-对象也一样（它们的数据都只用到有限积）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.53']
    },

    /* ----------------------------------------------------- 1.63 */
    {
      id: 'prop.adjunction-extends-to-diagrams',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '伴随延拓到图范畴',
      title: '命题：$F \\dashv G \\implies F_{I} \\dashv G_{I}$（逐点）',
      regions: ['category'],
      tags: ['命题', '伴随', '图范畴', '逐点', '函子范畴'],
      statement: [
        '若 $F : \\mathcal{C} \\to \\mathcal{D}$ 与 $G : \\mathcal{D} \\to \\mathcal{C}$ 互为伴随，则对任意指标范畴 $I$，**逐点作用**给出图范畴之间的伴随',
        '',
        '$$F_{I} \\dashv G_{I}, \\qquad F_{I}(D) = F \\circ D,\\quad G_{I}(E) = G \\circ E,$$',
        '',
        '即 $\\operatorname{Hom}_{\\mathcal{D}^{I}}\\bigl(F \\circ D,\\ E\\bigr) \\cong \\operatorname{Hom}_{\\mathcal{C}^{I}}\\bigl(D,\\ G \\circ E\\bigr)$。'
      ].join('\n'),
      notes: [
        '**证明。** 图范畴里的 Hom 集是**逐点**交出来的：给出自然变换等价于给出一族相容的态射 ✓。在每个 $i \\in I$ 上用 $F \\dashv G$ 得到 $\\operatorname{Hom}(FD_{i}, E_{i}) \\cong \\operatorname{Hom}(D_{i}, GE_{i})$ ✓；这族同构与 $I$ 中的态射相容（因为原来的同构关于 $F,G$ 自然）✓，于是它们拼成两个 Hom 集之间的同构 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.63']
    },

    /* ----------------------------------------------------- 1.74 */
    {
      id: 'prop.kan-extension-fully-faithful',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '全忠实沿自身的 Kan 延拓',
      title: '命题：$p$ 全忠实 $\\implies p_{!}F \\circ p \\cong F$',
      regions: ['category'],
      tags: ['命题', 'Kan 延拓', '全忠实', '余极限', '逗号范畴'],
      statement: [
        '设 $p : \\mathcal{C} \\to \\mathcal{C}\'$ **全忠实**、$\\mathcal{D}$ 有余极限。则对每个 $F : \\mathcal{C} \\to \\mathcal{D}$，左 Kan 延拓满足',
        '',
        '$$p_{!}F \\circ p \\;\\cong\\; F.$$'
      ].join('\n'),
      notes: [
        '**证明。** 用逐点公式 $p_{!}F(X\') = \\varinjlim_{p(X) \\to X\'} F(X)$ ✓。取 $X\' = p(X_{0})$：逗号范畴 $p \\downarrow p(X_{0})$ 以 $1_{p(X_{0})}$ 为**终对象**（$p$ 全忠实说明 $p(X_0)$ 的态射到 $p(X)$ 唯一地来自 $X_0 \\to X$）✓，而沿带终对象的范畴取余极限就是取终对象处的值 ✓，于是 $(p_{!}F)(p(X_{0})) \\cong F(X_{0})$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.74']
    }

  ],

  edges: [

    {
      id: 'def-link.ffinj-ff',
      kind: 'definition',
      definition: 'def.ff-faithful',
      usedBy: 'prop.fully-faithful-injective',
      note: '命题的假设就是全忠实。'
    },
    {
      id: 'def-link.preorder-cat',
      kind: 'definition',
      definition: 'def.category',
      usedBy: 'prop.preorder-as-category',
      note: '把预序集看成小范畴。'
    },
    {
      id: 'def-link.preorder-equiv',
      kind: 'definition',
      definition: 'def.cat-equivalence',
      usedBy: 'prop.preorder-as-category',
      note: '第二条结论是范畴等价。'
    },
    {
      id: 'def-link.slicemono-mono',
      kind: 'definition',
      definition: 'def.mono',
      usedBy: 'prop.slice-fully-faithful-mono',
      note: '判定的是单（满）态射。'
    },
    {
      id: 'def-link.slicemono-slice',
      kind: 'definition',
      definition: 'def.slice-category',
      usedBy: 'prop.slice-fully-faithful-mono',
      note: '全忠实的那条函子活在切片范畴之间。'
    },
    {
      id: 'def-link.projepi-proj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.projective-universal-epi',
      note: '命题给出投射性的可操作判据。'
    },
    {
      id: 'def-link.projepi-fibered',
      kind: 'definition',
      definition: 'def.fibered-product',
      usedBy: 'prop.projective-universal-epi',
      note: '证明里取的是纤维积。'
    },
    {
      id: 'def-link.presmon-mon',
      kind: 'definition',
      definition: 'def.monoid-object',
      usedBy: 'prop.functor-preserves-monoid-objects',
      note: '被搬运的对象就是幺半群对象。'
    },
    {
      id: 'def-link.presmon-group',
      kind: 'definition',
      definition: 'def.group-object',
      usedBy: 'prop.functor-preserves-monoid-objects',
      note: '群对象同理。'
    },
    {
      id: 'def-link.adjdiag-adj',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.adjunction-extends-to-diagrams',
      note: '结论是伴随在函子范畴上的版本。'
    },
    {
      id: 'imp-link.kanex-adjdiag',
      kind: 'implication',
      sources: ['prop.kan-extension-exists'],
      target: 'prop.adjunction-extends-to-diagrams',
      title: 'Kan 延拓存在 $\\implies$ 伴随延拓到图范畴',
      proof: [
        '图范畴里的 Hom 是逐点交出来的 ✓，逐点上用 $F \\dashv G$ 的同构，再由自然性把它们拼起来即得两个 Hom 集之间的同构 ✓，即 $F_{I} \\dashv G_{I}$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.kanff-kan',
      kind: 'definition',
      definition: 'def.kan-extension',
      usedBy: 'prop.kan-extension-fully-faithful',
      note: '命题说的是沿全忠实函子的左 Kan 延拓。'
    },
    {
      id: 'imp-link.kanex-kanff',
      kind: 'implication',
      sources: ['prop.kan-extension-exists', 'prop.kan-extension-adjoint'],
      target: 'prop.kan-extension-fully-faithful',
      title: '逐点公式 $\\implies$ 全忠实时延拓回到自己',
      proof: [
        '逐点公式给出 $(p_{!}F)(X\') = \\varinjlim_{p(X) \\to X\'} F(X)$ ✓，而单位 $F \\implies p_{!}F \\circ p$ 就是那条自然变换 ✓。',
        '取 $X\' = p(X_{0})$：逗号范畴 $p \\downarrow p(X_{0})$ 有终对象 $1_{p(X_{0})}$（$p$ 全忠实）✓，沿带终对象的范畴取余极限即取终对象处的值 ✓，故 $(p_{!}F)(p(X_{0})) \\cong F(X_{0})$，单位是自然同构 ✓。∎'
      ].join('\n')
    }

  ]
});
