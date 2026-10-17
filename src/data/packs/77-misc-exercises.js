/* ==========================================================================
   内容包 · 原书练习补遗（收尾一批小节点）
   --------------------------------------------------------------------------
   1.21 · 1.38+1.45 · 1.59 · 2.12 · 2.13 · 3.10 · 6.8
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '练习补遗',

  nodes: [

    /* ----------------------------------------------------- 1.21 */
    {
      id: 'prop.module-tensor-universal',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '张量积对双线性映射万有',
      title: '命题：$\\operatorname{Bil}(M \\times N,\\ P) \\cong \\operatorname{Hom}(M \\otimes N,\\ P)$',
      regions: ['algebra'],
      tags: ['命题', '张量积', '双线性', '泛性质'],
      statement: [
        '张量积 $M \\otimes_{\\mathbb{Z}} N$（resp. $M \\otimes_{k} N$）对 $\\mathbb{Z}$-双线性（resp. $k$-双线性）映射**万有**：',
        '',
        '$$\\operatorname{Bil}_{\\mathbb{Z}}(M \\times N,\\ P) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M \\otimes_{\\mathbb{Z}} N,\\ P\\bigr),$$',
        '',
        '左边的双线性映射与右边的群同态一一对应。'
      ].join('\n'),
      notes: [
        '**证明。** 先造自由模上的张量积：取 $\\mathbb{Z}\\cdot(M \\times N)$（自由阿贝尔群），商掉「双线性关系」',
        '$$(m + m\', n) \\sim (m, n) + (m\', n), \\quad (m, n + n\') \\sim (m, n) + (m, n\'), \\quad (am, n) \\sim a(m,n) \\sim (m, an) ✓$$',
        '一般模由自由模商出（取表现）✓，商上的张量积就是商 ✓。这时 $M \\times N \\to M \\otimes N$ 双线性 ✓，任何双线性映射 $M \\times N \\to P$ 唯一地穿过它 ✓ —— 这正是万有性质 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.21']
    },

    /* ----------------------------------------------------- 1.38 + 1.45 */
    {
      id: 'prop.set-top-ab-complete',
      cluster: 'cat.limit',
      type: 'proposition',
      label: 'Set、Top、Ab 的完备性',
      title: '命题：$\\mathbf{Set} / \\mathbf{Top} / \\mathbf{Ab}$ 完备且余完备',
      regions: ['category'],
      tags: ['命题', '完备', '余完备', '遗忘函子', 'Set'],
      statement: [
        '$\\mathbf{Set}$、$\\mathbf{Top}$、$\\mathbf{Ab}$ 都有**所有小极限与小余极限**。',
        '',
        '遗忘函子 $\\mathbf{Top} \\to \\mathbf{Set}$ **既保所有极限又保所有余极限**；而 $\\mathbf{Ab} \\to \\mathbf{Set}$ **保所有极限，但不保余积**。'
      ].join('\n'),
      notes: [
        '**证明。** $\\mathbf{Set}$：小积与等化子给出所有小极限 ✓，不交并与余等化子给出所有小余极限 ✓。$\\mathbf{Top}$：同样的构造配上相应的拓扑（积拓扑、子空间/等化子拓扑、不交并拓扑、商拓扑）✓。$\\mathbf{Ab}$：用自由阿贝尔群与商群造 ✓。',
        '遗忘函子保极限是因为拓扑与代数结构都是「逐点」定义的 ✓；但 $M \\oplus N$ 的底集合不是 $M \\sqcup N$，所以 $\\mathbf{Ab} \\to \\mathbf{Set}$ 不保余积 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.38, Exercise 1.45']
    },

    /* ----------------------------------------------------- 1.59 */
    {
      id: 'prop.adjunction-composition',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '伴随的复合',
      title: '命题：$F_{1} \\dashv G_{1}$、$F_{2} \\dashv G_{2}$ $\\implies$ $F_{2}F_{1} \\dashv G_{1}G_{2}$',
      regions: ['category'],
      tags: ['命题', '伴随', '复合'],
      statement: [
        '若 $F_{1} \\dashv G_{1}$（$\\mathcal{C} \\to \\mathcal{D}$）与 $F_{2} \\dashv G_{2}$（$\\mathcal{D} \\to \\mathcal{E}$），则',
        '',
        '$$F_{2} \\circ F_{1} \\;\\dashv\\; G_{1} \\circ G_{2}.$$'
      ].join('\n'),
      notes: [
        '**证明。** 把两个伴随的同构串起来 ✓：对 $X \\in \\mathcal{C}$、$Z \\in \\mathcal{E}$，',
        '$$\\operatorname{Hom}_{\\mathcal{E}}\\bigl(F_{2}F_{1}X,\\ Z\\bigr) \\cong \\operatorname{Hom}_{\\mathcal{D}}\\bigl(F_{1}X,\\ G_{2}Z\\bigr) \\cong \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ G_{1}G_{2}Z\\bigr) ✓$$',
        '两次都用伴随的定义，而这族同构关于 $X, Z$ 自然（两个自然同构的复合仍自然）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 1.59']
    },

    /* ----------------------------------------------------- 2.12 */
    {
      id: 'prop.coproduct-chaus',
      cluster: 'topo.chaus',
      type: 'proposition',
      label: '不交并是紧 Hausdorff 的余积',
      title: '命题：$S \\sqcup T$ 是 $\\mathbf{CHaus}$ 里的余积',
      regions: ['topology'],
      tags: ['命题', '紧 Hausdorff', '不相交并', '余积'],
      statement: [
        '在**紧 Hausdorff** 空间范畴里（自由紧 Hausdorff 空间之间也一样），**不交并**是**余积**：',
        '',
        '$$\\operatorname{Hom}(S \\sqcup T,\\ Z) \\;\\cong\\; \\operatorname{Hom}(S, Z) \\times \\operatorname{Hom}(T, Z).$$'
      ].join('\n'),
      notes: [
        '**证明。** 一个连续映射 $S \\sqcup T \\to Z$ 由它在两半上的限制决定 ✓；反之给两条连续映射，把它们拼起来仍连续（不交并的拓扑就是两块拓扑的和）✓。于是上面的自然双射成立，即余积的泛性质 ✓。紧 Hausdorff 对有限不交并封闭（两块紧、两块 Hausdorff）✓。∎',
        '⚠️ 无限个不交并一般**不**紧，所以余积只对有限族留在范畴里；这也是后面用预拓扑（有限不交并）而不是一般不交并的原因。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.12']
    },

    /* ----------------------------------------------------- 2.13 */
    {
      id: 'prop.connected-image-closure',
      cluster: 'topology.general',
      type: 'proposition',
      label: '连通的像与闭包',
      title: '命题：连通空间的像连通；连通子集的闭包连通',
      regions: ['topology'],
      tags: ['命题', '连通', '连续像', '闭包'],
      statement: [
        '1. **连通**空间在连续映射下的像是连通的；',
        '2. 连通子集的**闭包**是连通的。'
      ].join('\n'),
      notes: [
        [
          '**证明。** (1) 若 $f(X) = U \\sqcup V$ 是两块不交非空开集，则 $X = f^{-1}(U) \\sqcup f^{-1}(V)$ 断开 $X$ ✓。',
          '(2) 设 $A \\subseteq X$ 连通、$\\overline{A} = U \\sqcup V$（$U, V$ 在 $\\overline{A}$ 中非空开）。则 $A = (A \\cap U) \\sqcup (A \\cap V)$ ✓；由 $A$ 连通，不妨 $A \\cap V = \\emptyset$，于是 $A \\subseteq U$ 且 $V \\cap U = \\emptyset$ 蕴含 $V$ 在 $\\overline{A}$ 中也是闭的 ✓，故 $\\overline{A} \\subseteq U$，与 $V \\ne \\emptyset$ 矛盾 ✓。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.13']
    },

    /* ----------------------------------------------------- 3.10 */
    {
      id: 'prop.sieve-generated-by-family',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '族生成的筛',
      title: '命题：$R = \\coprod_{i} \\operatorname{im}(h_{f_{i}})$',
      regions: ['category'],
      tags: ['命题', '筛', '生成的筛', 'Yoneda'],
      statement: [
        '族 $(f_{i} : X_{i} \\to X)_{i \\in I}$ 生成的筛是',
        '',
        '$$R \\;=\\; \\coprod_{i \\in I} \\operatorname{im}\\bigl(h_{f_{i}}\\bigr),$$',
        '',
        '其中 $h_{f_{i}} : h_{X_{i}} \\to h_{X}$。也就是说：$g : Y \\to X$ 落在 $R$ 中 $\\iff$ 它在 $\\widehat{\\mathcal{C}}$ 里穿过某个 $f_{i}$。'
      ].join('\n'),
      notes: [
        '**证明。** 筛就是对每个 $Y$ 给一个 $\\operatorname{Hom}(Y, X)$ 的子集、且对预复合封闭 ✓。按定义，由 $\\{f_i\\}$ 生成的筛是**含全体 $f_{i}$ 的那个最小筛** ✓；而 $\\operatorname{im}(h_{f_{i}})$ 的取值正是「穿过 $f_{i}$ 的那些 $g$」，对预复合封闭 ✓，取并（余积）就得到最小的那个 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.10']
    },

    /* ----------------------------------------------------- 6.8 */
    {
      id: 'prop.pontryagin-finite-dim-banach',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '有限维 Banach 空间的对偶是向量空间对偶',
      title: '命题：$V$ 有限维实 Banach $\\implies \\widehat{V} \\cong V^{\\ast}$',
      regions: ['condensed'],
      tags: ['命题', 'Pontryagin 对偶', 'Banach 空间', '有限维'],
      statement: [
        '设 $V$ 是**有限维**实 Banach 空间。则 Pontryagin 对偶就是通常的向量空间对偶：',
        '',
        '$$\\widehat{V} \\;\\cong\\; V^{\\ast} = \\operatorname{Hom}_{\\mathbb{R}}(V,\\ \\mathbb{R}).$$'
      ].join('\n'),
      notes: [
        '**证明。** 因为 $\\mathbb{T} = \\mathbb{R}/\\mathbb{Z}$，而 $V$ 是有限维实向量空间、特别地**单连通** ✓，连续同态 $V \\to \\mathbb{T}$ 都能唯一地提升为连续同态 $V \\to \\mathbb{R}$ ✓。再注意：**连续的加法映射 $V \\to \\mathbb{R}$ 自动是 $\\mathbb{R}$-线性的** —— 先在有理数上由加性得 $f(qv) = q f(v)$ ✓，再由连续性逼近实数系数 ✓。于是 $\\widehat{V} \\cong \\operatorname{Hom}_{\\mathbb{R}}(V, \\mathbb{R}) = V^{\\ast}$ ✓。∎',
        '📌 前提「有限维」不能去掉：实 Banach 空间**局部紧当且仅当有限维**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 6.8']
    }

  ],

  edges: [

    {
      id: 'def-link.tensoruniv-bilinear',
      kind: 'definition',
      definition: 'def.module',
      usedBy: 'prop.module-tensor-universal',
      note: '张量积是模上的构造。'
    },
    {
      id: 'def-link.settopab-set',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.set-top-ab-complete',
      note: '命题说的是这些范畴里极限余极限都存在。'
    },
    {
      id: 'def-link.settopab-product',
      kind: 'definition',
      definition: 'def.product',
      usedBy: 'prop.set-top-ab-complete',
      note: '完备性由积与等化子给出。'
    },
    {
      id: 'def-link.adjcomp-adj',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.adjunction-composition',
      note: '命题是伴随的复合律。'
    },
    {
      id: 'def-link.coprodchaus-chaus',
      kind: 'definition',
      definition: 'def.chaus',
      usedBy: 'prop.coproduct-chaus',
      note: '命题活在紧 Hausdorff 范畴里。'
    },
    {
      id: 'def-link.coprodchaus-product',
      kind: 'definition',
      definition: 'def.product',
      usedBy: 'prop.coproduct-chaus',
      note: '结论是「这是余积」。'
    },
    {
      id: 'def-link.connimg-connected',
      kind: 'definition',
      definition: 'def.connected',
      usedBy: 'prop.connected-image-closure',
      note: '两条都围绕连通性。'
    },
    {
      id: 'def-link.sievegen-sieve',
      kind: 'definition',
      definition: 'def.sieve',
      usedBy: 'prop.sieve-generated-by-family',
      note: '算的是族生成的筛。'
    },
    {
      id: 'def-link.pontbanach-dual',
      kind: 'definition',
      definition: 'def.pontryagin-dual',
      usedBy: 'prop.pontryagin-finite-dim-banach',
      note: '有限维情形下对偶退化成向量空间对偶。'
    }

  ]
});
