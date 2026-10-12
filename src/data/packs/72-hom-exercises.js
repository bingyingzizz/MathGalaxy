/* ==========================================================================
   内容包 · 原书第 5 章练习里的性质（小节点）
   --------------------------------------------------------------------------
   5.10 · 5.12 · 5.13 · 5.15 · 5.19 · 5.20 · 5.29
   （5.8 / 5.21 / 5.22 / 5.23 / 5.30 的内容已在图上，只登记书号）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '加法范畴与阿贝尔层的性质',

  nodes: [

    /* ----------------------------------------------------- 5.10 */
    {
      id: 'prop.exact-at-points',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '正合就是逐点正合',
      title: '命题：短正合 $\\iff$ 三处都正合',
      regions: ['homology'],
      tags: ['命题', '正合列', '短正合', '左正合', '右正合'],
      statement: [
        '设 $0 \\to M\' \\xrightarrow{\\ i\\ } M \\xrightarrow{\\ p\\ } M\'\' \\to 0$ 是阿贝尔范畴里的列。则',
        '',
        '- **短正合** $\\iff$ 在 $M\'$、$M$、$M\'\'$ **三处都正合**；',
        '- **左正合** $\\iff$ 在 $M\'$、$M$ 处正合；',
        '- **右正合** $\\iff$ 在 $M$、$M\'\'$ 处正合。'
      ].join('\n'),
      notes: [
        '**证明。** 三句话逐条对照定义即可：「在 $M\'$ 处正合」读作 $\\ker i = 0$（即 $i$ 单）；「在 $M$ 处正合」读作 $\\operatorname{im} i = \\ker p$；「在 $M\'\'$ 处正合」读作 $\\operatorname{coker} p = 0$（即 $p$ 满）✓。把这几条组合起来正是左/右/短正合的定义 ✓。∎',
        '⭐ 用处：把「整条列正合」这件整体的事拆成**逐点检查**，实际验证时用的就是这一条。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.10']
    },

    /* ----------------------------------------------------- 5.12 */
    {
      id: 'prop.subcat-additive',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '子范畴继承加法与阿贝尔性',
      title: '命题：全忠实 + 有伴随 $\\implies$ $\\mathcal{C}$ 也加法（阿贝尔）',
      regions: ['homology'],
      tags: ['命题', '加法范畴', '阿贝尔范畴', '全忠实', '伴随'],
      statement: [
        '设 $F : \\mathcal{C} \\hookrightarrow \\mathcal{D}$ 是**全忠实**函子，$\\mathcal{D}$ 加法（resp. 阿贝尔）。若 $F$ 有**伴随或余伴随**（resp. 且 $F$ 正合），则 $\\mathcal{C}$ 也是**加法**（resp. **阿贝尔**）范畴。'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '**（一）双积。** 伴随（不论左右）都加法：右伴随保积、左伴随保余积 ✓（见「伴随函子都加法」）。于是 $\\mathcal{D}$ 里 $F(X) \\oplus F(Y)$ 是双积，而 $F$ 全忠实把它「如实」搬回 $\\mathcal{C}$：由米田引理，$\\operatorname{Hom}_{\\mathcal{C}}(Z, \\cdot)$ 上的两条等式与 $\\mathcal{D}$ 里的完全一致 ✓。',
          '**（二）阿贝尔性。** 有了双积后核余核再由 $\\mathcal{D}$ 里「每个态射都严格」（$\\operatorname{coker}(\\ker u) \\cong \\ker(\\operatorname{coker} u)$）沿**正合**函子搬回来 ✓。∎'
        ].join('\n'),
        '⭐ 读法：**「往里放」的全忠实函子只要还有伴随，子范畴就白拿加法结构** —— 这就是「$\\mathbf{Ab}$ 的子范畴为什么自动加法」的答案。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.12']
    },

    /* ----------------------------------------------------- 5.13 */
    {
      id: 'prop.generator-coproduct-epi',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '生成元的余积刻画',
      title: '命题：$G$ 生成 $\\iff$ 每个 $M$ 都有 $G^{(I)} \\twoheadrightarrow M$',
      regions: ['homology'],
      tags: ['命题', '生成元', '余积', 'AB3', '满态射'],
      statement: [
        '设 $\\mathcal{C}$ 是有余积的阿贝尔范畴、$G \\in \\mathcal{C}$。则',
        '',
        '$$G \\text{ 是生成元} \\iff \\text{对每个 } M \\in \\mathcal{C},\\ \\exists I:\\ G^{(I)} \\twoheadrightarrow M.$$'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '**$(\\Longrightarrow)$** 取 $I := \\operatorname{Hom}_{\\mathcal{C}}(G, M)$，令 $\\coprod_I G \\to M$ 的各分量按对应态射来 ✓。若它不是满射，则 $M \\to \\operatorname{coker}$ 非零，由生成性存在 $g : G \\to M$ 使这个复合非零 —— 可是 $g$ 本来就是 $I$ 中的一个分量，它的像落在 $\\operatorname{im}$ 里，矛盾 ✓。',
          '**$(\\Longleftarrow)$** 给 $f \\ne g : M \\to N$，则 $h := f - g \\ne 0$。取满射 $G^{(I)} \\twoheadrightarrow M$，于是 $h \\circ (\\text{满射}) \\ne 0$，特别地某个分量 $G \\to M$ 上非零 ✓，即 $\\operatorname{Hom}(G, h) \\ne 0$ —— 所以 $\\operatorname{Hom}(G, -)$ 忠实，$G$ 是生成元 ✓。∎'
        ].join('\n'),
        '⚠️ 这条判据其实**只用到余积**（AB3），滤过余极限没有出场（AB5 的那部分条件用不上）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.13']
    },

    /* ----------------------------------------------------- 5.15 */
    {
      id: 'thm.abelian-sheaf-equiv',
      cluster: 'hom.sheaf',
      type: 'theorem',
      label: '阿贝尔层即拓扑斯里的阿贝尔群',
      title: '定理：$\\widetilde{\\mathcal{C}}(\\mathbf{Ab}) \\simeq \\mathbf{Ab}(\\widetilde{\\mathcal{C}})$',
      regions: ['homology'],
      tags: ['定理', '阿贝尔层', '拓扑斯', '阿贝尔群对象', '范畴等价'],
      statement: [
        '设 $\\mathcal{C}$ 是 site。则「site 上的**阿贝尔层**」与「拓扑斯 $\\widetilde{\\mathcal{C}}$ 里的**阿贝尔群对象**」是同一个范畴：',
        '',
        '$$\\widetilde{\\mathcal{C}}(\\mathbf{Ab}) \\;\\simeq\\; \\mathbf{Ab}\\bigl(\\widetilde{\\mathcal{C}}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明的思路。** 两个方向都是「**逐点取值**」：',
        '- $\\to$：拓扑斯里的阿贝尔群对象 $M$ 在 $X \\in \\mathcal{C}$ 上取值，用的是**整体截面函子保积**（群的运算、$0$、逆元逐点读出来）✓，于是 $X \\mapsto M(X)$ 给出一个阿贝尔预层，而且它是层 ✓；',
        '- $\\leftarrow$：反过来给阿贝尔层 $M$，在每个 $X$ 处的取值自动带阿贝尔群结构，而层范畴里的群结构由这些值逐点决定（预层范畴里的群对象就是逐点的群）✓。',
        '两个方向互逆，因为都是「取遍每个 $X$ 的值」✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.15']
    },

    /* ----------------------------------------------------- 5.19 */
    {
      id: 'prop.presheaf-free-projective',
      cluster: 'hom.sheaf',
      type: 'proposition',
      label: '自由的预层是投射的',
      title: '命题：$\\mathbb{Z}\\cdot h_{X}$ 在 $\\widehat{\\mathcal{C}}(\\mathbf{Ab})$ 里投射',
      regions: ['homology'],
      tags: ['命题', '自由对象', '投射对象', '预层范畴', '正合'],
      statement: [
        '设 $\\mathcal{C}$ 是范畴、$X \\in \\mathcal{C}$。则 $\\mathbb{Z}\\cdot h_{X}$ 是预层范畴 $\\widehat{\\mathcal{C}}(\\mathbf{Ab})$ 里的**投射对象**；更一般地，$\\mathbb{Z}\\cdot T$（$T$ 是任意预层）也投射。'
      ].join('\n'),
      notes: [
        '**证明。** 投射性等价于 $\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot T, -)$ **正合** ✓。由自由对象的万有性质，$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot T, M) \\cong M(T)$ —— 这里的 $M(T)$ 指「预层的 $T$ 处取值」那一族逐点取值 ✓；而预层范畴里的正合性是**逐点判**的，逐点正是阿贝尔群之间的 Hom，因而是正合的 ✓。∎',
        '⭐ 这就是「自由即投射」在层论里的样子，也是 $\\mathbb{Z}\\cdot X_{\\bullet}$ 能充当投射消解的依据。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.19']
    },

    /* ----------------------------------------------------- 5.20 */
    {
      id: 'prop.generators-abelian-sheaves',
      cluster: 'hom.sheaf',
      type: 'proposition',
      label: '生成元给出阿贝尔层的生成元',
      title: '命题：$S$ 生成 $\\mathcal{T}$ $\\implies$ $\\{\\mathbb{Z}\\cdot X\\}$ 生成 $\\mathcal{T}(\\mathbf{Ab})$',
      regions: ['homology'],
      tags: ['命题', '生成元', '自由对象', 'Grothendieck', '拓扑斯'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$S$ 是它的一组**生成元**。则',
        '',
        '$$\\bigl\\{\\ \\mathbb{Z}\\cdot X \\ :\\ X \\in S\\ \\bigr\\}$$',
        '',
        '是 $\\mathcal{T}(\\mathbf{Ab})$ 的一组生成元。'
      ].join('\n'),
      notes: [
        '**证明。** 由自由对象的万有性质，$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X, M) = M(X) = \\operatorname{Hom}(X, M)$ ✓ —— 于是「用 $\\mathbb{Z}\\cdot X$ 检测态射」与「用 $X$ 检测态射」是同一件事 ✓。$S$ 生成 $\\mathcal{T}$ 说明后者够用，所以前者也够用 ✓。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.20']
    },

    /* ----------------------------------------------------- 5.29 */
    {
      id: 'prop.free-sheaf-tensor',
      cluster: 'hom.sheaf',
      type: 'proposition',
      label: '自由对象的张量积',
      title: '命题：$\\mathbb{Z}\\cdot X \\otimes \\mathbb{Z}\\cdot Y \\cong \\mathbb{Z}\\cdot(X \\times Y)$',
      regions: ['homology'],
      tags: ['命题', '张量积', '自由对象', '积', '米田'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$X, Y \\in \\mathcal{T}$。则',
        '',
        '$$\\mathbb{Z}\\cdot X \\;\\otimes_{\\mathbb{Z}}\\; \\mathbb{Z}\\cdot Y \\;\\cong\\; \\mathbb{Z}\\cdot (X \\times Y).$$'
      ].join('\n'),
      notes: [
        [
          '**证明（米田）。** 对任意 $N \\in \\mathcal{T}(\\mathbf{Ab})$，',
          '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X \\otimes \\mathbb{Z}\\cdot Y,\\ N\\bigr) \\cong \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot Y, N)\\bigr) \\cong \\operatorname{Hom}\\bigl(X,\\ \\operatorname{Hom}(Y, N)\\bigr) \\cong \\operatorname{Hom}(X \\times Y,\\ N) \\cong \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot(X \\times Y),\\ N\\bigr) ✓$$',
          '（第一、三步是张量–内 Hom 伴随，第二、四步是自由对象的万有性质，中间一步是 $X \\times Y$ 的泛性质。）对一切 $N$ 成立，由米田引理即得同构 ✓。∎'
        ].join('\n'),
        '⭐ 读法：**自由对象把拓扑斯里的积翻译成阿贝尔群层里的张量积**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.29']
    }

  ],

  edges: [

    {
      id: 'def-link.exactpts-exactseq',
      kind: 'definition',
      definition: 'def.exact-sequence',
      usedBy: 'prop.exact-at-points',
      note: '命题比较的就是「正合」这条定义的三档说法。'
    },
    {
      id: 'def-link.exactpts-kernel',
      kind: 'definition',
      definition: 'def.kernel-cokernel',
      usedBy: 'prop.exact-at-points',
      note: '逐点读法用的核与余核。'
    },
    {
      id: 'def-link.subcatadd-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.subcat-additive',
      note: '结论是「$\\mathcal{C}$ 也加法 / 阿贝尔」。'
    },
    {
      id: 'imp-link.adjadd-subcatadd',
      kind: 'implication',
      sources: ['prop.adjoint-additive', 'prop.image-kernel-cokernel'],
      target: 'prop.subcat-additive',
      title: '伴随都加法 + 阿贝尔里态射严格 $\\implies$ 子范畴继承',
      proof: [
        '伴随（左右不论）都加法，故保双积；$\\mathcal{D}$ 里的双积经全忠实函子如实映回 $\\mathcal{C}$ ✓，于是 $\\mathcal{C}$ 有双积、加法结构相容 ✓。',
        '阿贝尔性再要核余核：$\\mathcal{D}$ 里每个态射都严格（$\\operatorname{coker}(\\ker u) \\cong \\ker(\\operatorname{coker} u)$）✓，正合函子把这条等式搬回 $\\mathcal{C}$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.gencopro-generator',
      kind: 'definition',
      definition: 'def.generator',
      usedBy: 'prop.generator-coproduct-epi',
      note: '命题给出生成元的等价刻画。'
    },
    {
      id: 'def-link.absheafequiv-abelian',
      kind: 'definition',
      definition: 'def.abelian-sheaf',
      usedBy: 'thm.abelian-sheaf-equiv',
      note: '等价的一边就是阿贝尔层。'
    },
    {
      id: 'imp-link.section-absheafequiv',
      kind: 'implication',
      sources: ['prop.condab-section'],
      target: 'thm.abelian-sheaf-equiv',
      title: '整体截面函子保积 $\\implies$ 阿贝尔层即拓扑斯里的阿贝尔群',
      proof: [
        '整体截面函子保积 ✓，所以拓扑斯里的阿贝尔群对象 $M$ 在每个对象 $X$ 处的取值 $M(X)$ 自然带阿贝尔群结构、且随 $X$ 函子化 ✓，得到一侧的函子。',
        '反过来，阿贝尔层 $M$ 的每个取值都是阿贝尔群，而层范畴里的群结构由逐点取值决定 ✓，得到另一侧的函子。',
        '两个方向都是「取遍每个 $X$ 的值」，互为逆 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.pffreeproj-free',
      kind: 'definition',
      definition: 'def.free-abelian-sheaf',
      usedBy: 'prop.presheaf-free-projective',
      note: '命题说的是 $\\mathbb{Z}\\cdot(-)$ 出来的对象。'
    },
    {
      id: 'def-link.pffreeproj-proj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.presheaf-free-projective',
      note: '结论就是「投射对象」。'
    },
    {
      id: 'def-link.gensab-generator',
      kind: 'definition',
      definition: 'def.generator',
      usedBy: 'prop.generators-abelian-sheaves',
      note: '两边的「生成元」都按这条定义读。'
    },
    {
      id: 'def-link.freetensor-tensor',
      kind: 'definition',
      definition: 'def.tensor-abelian-sheaf',
      usedBy: 'prop.free-sheaf-tensor',
      note: '公式里的 $\\otimes$ 就是阿贝尔层张量积。'
    },
    {
      id: 'def-link.freetensor-free',
      kind: 'definition',
      definition: 'def.free-abelian-sheaf',
      usedBy: 'prop.free-sheaf-tensor',
      note: '两边都是自由对象。'
    }

  ]
});
