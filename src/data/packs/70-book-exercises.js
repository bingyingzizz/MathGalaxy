/* ==========================================================================
   内容包 · 原书练习里「必要的结论」三条
   --------------------------------------------------------------------------
   这三条是练习条目，但都是后面反复要用的家伙：
     Ex 5.18 + 5.24  阿贝尔群的自由对象 $\\mathbb{Z}\\cdot X$（遗忘函子的左伴随）
     Ex 5.9          阿贝尔范畴里 $\\operatorname{im} f = \\ker(\\operatorname{coker} f)$
     Ex 4.11         投影公式 $S \\times X(\\cdot) \\cong (S \\times X)(\\cdot)$
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '练习里的常用结论',

  nodes: [

    /* ----------------------------------------------------- 5.18 + 5.24 */
    {
      id: 'def.free-abelian-sheaf',
      cluster: 'hom.sheaf',
      type: 'definition',
      label: '自由阿贝尔群层',
      title: '定义：$\\mathbb{Z}\\cdot X$，遗忘函子的左伴随',
      regions: ['homology'],
      tags: ['定义', '自由对象', '阿贝尔层', '左伴随', 'Z[X]'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯。遗忘函子',
        '',
        '$$\\mathcal{T}(\\mathbf{Ab}) \\longrightarrow \\mathcal{T}$$',
        '',
        '（把阿贝尔层忘成底集合层）有**左伴随**，记作',
        '',
        '$$\\mathbb{Z}\\cdot(-) : \\mathcal{T} \\longrightarrow \\mathcal{T}(\\mathbf{Ab}), \\qquad X \\longmapsto \\mathbb{Z}\\cdot X \\quad (\\text{也记 } \\mathbb{Z}[X]),$$',
        '',
        '它由**万有性质**刻画：对 $X \\in \\mathcal{T}$ 与 $M \\in \\mathcal{T}(\\mathbf{Ab})$，',
        '',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ M\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{T}}(X,\\ M) = M(X).$$'
      ].join('\n'),
      notes: [
        '**怎么造。** 先逐点自由化、再层化：把 $X$ 看成预层，取预层 $U \\mapsto \\mathbb{Z}\\cdot X(U)$（逐点自由阿贝尔群），再层化：',
        '$$\\mathbb{Z}\\cdot X \\;:=\\; \\bigl(U \\mapsto \\mathbb{Z}\\cdot X(U)\\bigr)^{\\#}.$$',
        '**为什么这就对。** 预层那一层是逐点的：函子范畴里的伴随逐点造，而 $\\mathbf{Ab} \\to \\mathbf{Set}$ 的遗忘函子有左伴随 $E \\mapsto \\mathbb{Z}\\cdot E$（自由阿贝尔群）✓，于是 $\\widehat{\\mathcal{C}}(\\mathbf{Ab}) \\to \\widehat{\\mathcal{C}}$ 的左伴随即逐点自由 ✓。到层这一层，用「层化 $\\dashv$ 含入」把伴随传下去 ✓：',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ M\\bigr) = \\operatorname{Hom}_{\\widehat{\\mathcal{C}}(\\mathbf{Ab})}\\bigl(\\mathbb{Z}\\cdot X,\\ M\\bigr) \\cong \\operatorname{Hom}_{\\widehat{\\mathcal{C}}}(X,\\ M) = M(X) ✓$$',
        '（$M$ 本身是层，所以在预层那边的 Hom 与层这边的 Hom 一样）。∎',
        '⭐ **用处**：$\\mathbb{Z}\\cdot X$ 是「把一个空间/层当自由生成元看」的装置。Čech 复形就是 $\\check{C}^{\\bullet}(X, M) = \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X_{\\bullet}, M)$；层上同调则是 $H^{n}(X, M) = \\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X, M)$ ✓。',
        '⚠️ **一般不是逐点算的**：层化会改动取值，「逐点自由再层化」与「自由」只有在层条件不碍事的时候才重合。',
        '📌 例：$\\mathbb{Z}\\cdot \\mathbf{1} \\cong \\mathbb{Z}$（常层）；$\\mathbb{Z}\\cdot X$ 永远是**投射**对象的候选（它是自由的）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.18, Exercise 5.24']
    },

    /* ----------------------------------------------------- 5.9 */
    {
      id: 'prop.image-kernel-cokernel',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '像就是余核的核',
      title: '命题：$\\operatorname{im} f = \\ker(\\operatorname{coker} f)$，每个态射都严格',
      regions: ['homology'],
      tags: ['命题', '阿贝尔范畴', '像', '余像', '严格态射'],
      statement: [
        '设 $\\mathcal{C}$ 是阿贝尔范畴，$f : M \\to N$。则',
        '',
        '$$\\operatorname{im} f \\;=\\; \\ker\\bigl(N \\longrightarrow \\operatorname{coker} f\\bigr), \\qquad \\operatorname{coim} f \\;=\\; \\operatorname{coker}\\bigl(\\ker f \\longrightarrow M\\bigr).$$',
        '',
        '特别地典范态射 $\\operatorname{coim} f \\to \\operatorname{im} f$ 是同构 —— **阿贝尔范畴里每个态射都是严格的**。'
      ].join('\n'),
      notes: [
        [
          '**证明（两条基本事实：阿贝尔范畴里每个单态射都是它余核的核、每个满态射都是它核的余核）。**',
          '记 $m := \\ker\\bigl(N \\to \\operatorname{coker} f\\bigr)$，它按定义是单态射 ✓。',
          '**（一）$f$ 穿过 $m$。** 因为 $(\\operatorname{coker} f) \\circ f = 0$ ✓，而 $m$ 正是这个映射的核，所以 $f$ 唯一地分解为 $f = m \\circ e$ ✓。',
          '**（二）$m$ 最小。** 设 $f = m\' \\circ e\'$ 是任意分解且 $m\'$ 是单态射。因为 $(\\operatorname{coker} m\') \\circ m\' = 0$ ✓，得 $(\\operatorname{coker} m\') \\circ f = 0$，于是由 $\\operatorname{coker} f$ 的泛性质，$\\operatorname{coker} m\'$ 穿过 $\\operatorname{coker} f$ ✓，特别地',
          '$$(\\operatorname{coker} m\') \\circ m = 0.$$',
          '再用「单态射 $m\'$ 是它自己余核的核」：$m\' = \\ker(\\operatorname{coker} m\')$ ✓，于是 $m$ 唯一地穿过 $m\'$ —— 即 $m$ 是「$f$ 能穿过的各种单态射」里最小的那个 ✓。',
          '（一）（二）合起来，$m$ 连同分解 $f = m \\circ e$ 正是**像**的泛性质 ✓，所以 $\\operatorname{im} f = \\ker(\\operatorname{coker} f)$ ✓。',
          '对偶地把箭头反过来（在 $\\mathcal{C}^{\\mathrm{op}}$ 里做同一件事）即得余像那条 ✓。',
          '**（三）严格性。** 由 (一) 的分解 $f = m \\circ e$ 与它的对偶分解，$\\operatorname{coim} f \\to \\operatorname{im} f$ 两边都是同一个中间对象，于是它是同构 ✓。∎'
        ].join('\n'),
        '⭐ 这条把「像」从泛性定义（最小中间对象）换成**可以算的公式**：$\\ker(\\operatorname{coker} f)$。同调代数里凡是要「手工取像」的地方，用的都是这个公式。',
        '⚠️ **阿贝尔**这个前提不能省：一般范畴里 $\\operatorname{coim} f \\to \\operatorname{im} f$ 未必同构（那种态射就不叫严格的了）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 5.9']
    },

    /* ----------------------------------------------------- 4.11 */
    {
      id: 'prop.projection-formula-cond',
      cluster: 'cond.set',
      type: 'proposition',
      label: '投影公式',
      title: '投影公式：$S \\times X(\\cdot) \\cong (S \\times X)(\\cdot)$',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '投影公式', '局部紧', 'k-化'],
      statement: [
        '设 $X$ 是凝聚态集，$S$ 是**局部紧 Hausdorff** 拓扑空间。则',
        '',
        '$$S \\times X(\\cdot) \\;\\cong\\; (S \\times X)(\\cdot).$$',
        '',
        '（左边是底空间 $X(\\cdot)$ 与 $S$ 的拓扑积；$S$ 紧 Hausdorff 时这就是「把 $S$ 拉进来不影响 $k$-化」。）'
      ].join('\n'),
      notes: [
        '⭐ **读法**：底空间函子 $X \\mapsto X(\\cdot)$ 与「乘一个局部紧空间」可交换。于是「在空间上乘以紧块」这类操作，可以先在 $\\mathrm{Cond}$ 里做、再落回拓扑空间，也可以反过来做。',
        '📌 它与「底空间保有限积」是一条链上的两步：那条给出 $k$-化后的公式，这条把 $k$-化消掉。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 4.11']
    }

  ],

  edges: [

    {
      id: 'def-link.freeab-abelian',
      kind: 'definition',
      definition: 'def.abelian-sheaf',
      usedBy: 'def.free-abelian-sheaf',
      note: '自由对象要造的是阿贝尔层。'
    },
    {
      id: 'def-link.freeab-adjoint',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'def.free-abelian-sheaf',
      note: '「自由」是用遗忘函子的左伴随来定义的。'
    },

    {
      id: 'def-link.imgkc-image',
      kind: 'definition',
      definition: 'def.image',
      usedBy: 'prop.image-kernel-cokernel',
      note: '命题给的就是「像」的另一副面孔。'
    },
    {
      id: 'def-link.imgkc-kernel',
      kind: 'definition',
      definition: 'def.kernel-cokernel',
      usedBy: 'prop.image-kernel-cokernel',
      note: '公式里出现的核与余核。'
    },
    {
      id: 'def-link.imgkc-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.image-kernel-cokernel',
      note: '「每个态射都严格」只在阿贝尔范畴里成立。'
    },

    {
      id: 'def-link.projcond-underlying',
      kind: 'definition',
      definition: 'def.underlying-topological-space',
      usedBy: 'prop.projection-formula-cond',
      note: '公式两边的 $(-)(\\cdot)$ 就是底拓扑空间。'
    },
    {
      id: 'imp-link.finprod-projcond',
      kind: 'implication',
      sources: ['cor.cond-ktop-finite-products', 'prop.k-product'],
      target: 'prop.projection-formula-cond',
      title: '底空间保有限积 + $k$-化与积 $\\implies$ 投影公式',
      proof: [
        '**（一）$S$ 紧 Hausdorff 的情形。** 此时 $S$ 本身紧、$S(\\cdot) = S$ ✓。由「底空间保有限积」',
        '$$(S \\times X)(\\cdot) \\;\\cong\\; k\\bigl(S(\\cdot) \\times X(\\cdot)\\bigr) = k\\bigl(S \\times X(\\cdot)\\bigr) ✓$$',
        '而 $S$ 紧 Hausdorff 因而局部紧，由「$k$-化与积」$k\\bigl(S \\times X(\\cdot)\\bigr) \\cong S \\times X(\\cdot)$ ✓ —— 这一步正是「乘一个局部紧空间」与 $k$-化交换。',
        '**（二）$S$ 只假设局部紧 Hausdorff 的情形（思路）。** 两边作为集合都是 $S \\times X(\\ast)$ ✓；而底空间的拓扑由「紧 Hausdorff 空间到它的映射」决定（底空间的定义）✓。$S$ 局部紧 Hausdorff 时是它自己的紧子空间的滤过余极限，把 (一) 逐块用上去即可 ✓。',
        '两步合起来即得 $S \\times X(\\cdot) \\cong (S \\times X)(\\cdot)$ ✓。∎',
        '⚠️ **(二) 只是化归的思路**：真正的证明要把「底空间的拓扑由紧块决定」这句话在两边各写清楚（左边靠底空间的定义、右边靠 $k$-化的定义）。这一步不做也没有数学风险，但严格说这里只到「化归到紧的情形」为止。'
      ].join('\n')
    }

  ]
});
