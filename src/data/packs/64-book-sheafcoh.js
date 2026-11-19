/* ==========================================================================
   内容包 · 层上同调与 Ext 的对接（原书 §7.2 / §7.3 的练习）
   --------------------------------------------------------------------------
   §7.2 / §7.3 的正文都进图了，这一包补上四条第**到处在用**的练习：

     投射对象没有高次 Ext（7.24）      内射 ⟺ 对一切左正合函子零调（7.26）
     上同调就是 Ext（7.37）            预层在可表示对象上没有高次上同调（7.41）

   最后一条是「为什么层化一定要有」的最好说明：**预层层面是正合的，层化把它打破了**。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '层上同调与 Ext 的对接',
  nodes: [

    /* ----------------------------------------------------- 7.24 */
    {
      id: 'prop.ext-projective-vanishes',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '投射对象没有高次 Ext',
      title: '命题：$P$ 投射 $\\implies \\operatorname{Ext}^{n}(P, M) = 0$（$n > 0$）',
      regions: ['homology'],
      tags: ['命题', 'Ext', '投射对象', '导出函子'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$P \\in \\mathcal{A}$ 是**投射**对象，$M \\in \\mathcal{A}$ 任意。则',
        '',
        '$$\\operatorname{Ext}^{n}_{\\mathcal{A}}(P,\\ M) = 0 \\qquad (n > 0), \\qquad \\operatorname{Ext}^{0}_{\\mathcal{A}}(P,\\ M) = \\operatorname{Hom}_{\\mathcal{A}}(P,\\ M).$$',
        '',
        '注意：这句话**不需要** $\\mathcal{A}$ 有足够多投射对象 —— $P$ 投射本身就给出 $P$ 的一条长度 $0$ 的投射消解。'
      ].join('\n'),
      notes: "⭐ 对偶地：**内射对象没有高次 Ext**（$\\operatorname{Ext}^{n}(M, I) = 0$，$n>0$）—— 这两条合起来就是「投射 / 内射对象可以拿来替代消解里的项」的全部理由。",
      refs: ['Le Stum, An introduction to condensed mathematics, §7.2']
    },

    /* ----------------------------------------------------- 7.26 */
    {
      id: 'prop.injective-iff-acyclic',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '内射与零调的等价',
      title: '命题：内射 $\\iff$ 对一切左正合函子零调',
      regions: ['homology'],
      tags: ['命题', '内射对象', '零调', '导出函子'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$I \\in \\mathcal{A}$。则下列等价：',
        '',
        '1. $I$ 是**内射**对象；',
        '2. $I$ 对**一切左正合**加法函子 $F : \\mathcal{A} \\to \\mathcal{A}\'$ 都是 $F$-零调的；',
        '3. $I$ 对一切形如 $F = \\operatorname{Hom}_{\\mathcal{A}}(M, -)$ 的左正合函子都是 $F$-零调的。'
      ].join('\n'),
      notes: [
        ['**证明。**','$(1) \\implies (2)$：$I$ 内射时，$I$ 自己（连同恒等映射）就是一条**长度 $0$ 的内射消解** $0 \\to I \\xrightarrow{\\ 1\\ } I \\to 0$ ✓。\n\n用它算右导出函子：$RF(I) = F(I)$ 集中在 $0$ 次，故 $R^{n}F(I) = 0$（$n > 0$）✓，即 $I$ 是 $F$-零调的。','$(2) \\implies (3)$：显然（$\\operatorname{Hom}(M,-)$ 是左正合的）。','$(3) \\implies (1)$：对每个 $M$，$I$ 对 $\\operatorname{Hom}(M,-)$ 零调意味着 $R^{n}\\operatorname{Hom}(M, I) = \\operatorname{Ext}^{n}(M, I) = 0$（$n > 0$），特别地 $\\operatorname{Ext}^{1}_{\\mathcal{A}}(M, I) = 0$ 对一切 $M$ 成立 ✓。\n\n而由**内射判据**，$\\operatorname{Ext}^{1}_{\\mathcal{A}}(-, I) = 0$ 正是「$I$ 内射」的等价刻画（在阿贝尔范畴里，它等价于「每个单态射 $I \\rightarrowtail N$ 都有收缩」）✓。\n\n于是 $I$ 内射 ✓。\n\n∎'].join('\n'),
        '⭐ 用途：验「内射」时可以从**任何**左正合函子那一侧下手 —— 而在凝聚态 / 层的情形里，最方便的左正合函子就是取截面 $\\Gamma(S, -)$。',
        ,
        '**各方向用到的假设**（须先保证所用右导出函子存在）：\n' +
        '- 零调 $\\iff$ 所有正次右导出为零是定义；在通常内射消解框架中，应补充 $\\mathcal A$ 有足够多内射对象，或另行说明导出函子的存在机制，不能仅凭阿贝尔范畴就默认可用。\n' +
        '- (1) $\\implies$ (2)：用长度零的内射消解计算导出函子；(2) $\\implies$ (3) 是取函子特例，加上 $\\operatorname{Hom}(M,-)$ 左正合的基本事实。\n' +
        '- (3) $\\implies$ (1)：只需所有 $M$ 的 $\\operatorname{Ext}^1(M,I)=0$；用一阶 Ext 的扩张分类使每条 $0\\to I\\to E\\to M\\to0$ 分裂，再由推出图得到内射延拓性质。这一步是内射判据，不是定义展开。\n' +
        '- 「所有函子」不能降为任意挑一个函子：恒等函子正合，对所有对象都零调，但 $\\mathbb Z$ 作为阿贝尔群不内射；故原注说可从任何函子验内射须理解为有额外检验充分性。\n'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.2']
    },

    /* ----------------------------------------------------- 7.37 */
    {
      id: 'prop.cohomology-as-ext',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '上同调就是 Ext',
      title: '命题：$H^{n}(X, M^{\\bullet}) \\cong \\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X,\\ M^{\\bullet})$',
      regions: ['homology'],
      tags: ['命题', '层上同调', 'Ext', '拓扑斯'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯，$X \\in \\mathcal{T}$，$M^{\\bullet}$ 是 $\\mathcal{T}$ 中阿贝尔群的复形。则',
        '',
        '$$\\operatorname{R}\\Gamma(X,\\ M^{\\bullet}) \\;\\cong\\; \\operatorname{RHom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ M^{\\bullet}\\bigr), \\qquad H^{n}(X,\\ M^{\\bullet}) \\;\\cong\\; \\operatorname{Ext}^{n}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ M^{\\bullet}\\bigr).$$'
      ].join('\n'),
      notes: "⭐ 这条是**两套语言之间的桥**：一边是几何味的「截面」（$\\Gamma(X,-)$），一边是代数味的「导出 Hom」。有了它，层上同调的一切计算都能翻译成导出范畴里的 Ext 计算 —— 反过来，Ext 的几何意义也清楚了：**它就是某个空间上的上同调**。\n\n📌 与「Stonean 上的截面公式」对照看：那条把 Ext 写成 $\\operatorname{Ext}^{n}(M \\cdot S, N)$，这条把 Ext 写成 $H^{n}(X, N)$，两条合起来正是「$H^{n}(X, N)$ 可以用 $\\mathbb{Z}\\cdot X$ 的消解来算」。",
      refs: ['Le Stum, An introduction to condensed mathematics, §7.3']
    },

    /* ----------------------------------------------------- 7.41 */
    {
      id: 'prop.presheaf-representable-acyclic',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '预层在可表示对象上没有高次上同调',
      title: '命题：$H^{n}(h_{X}, M) = 0$（$n > 0$，预层情形）',
      regions: ['homology'],
      tags: ['命题', '预层', '上同调', '可表示'],
      statement: [
        '设 $\\mathcal{C}$ 是任意范畴、$\\widehat{\\mathcal{C}}$ 配标准拓扑，$X \\in \\mathcal{C}$、$M$ 是 $\\widehat{\\mathcal{C}}$ 上的阿贝尔**预层**。则',
        '',
        '$$H^{n}\\bigl(h_{X},\\ M\\bigr) = 0 \\qquad (n > 0).$$'
      ].join('\n'),
      notes: "⭐ **为什么值得单独说**：因为这是「**层化为什么必要**」的最好说明 —— 在预层层面，可表示对象上根本没有高次上同调（一切正合）；一取层化，$\\mathbb{Z}\\cdot X$ 就不再是「取值」那个函子，高次才冒出来。层上同调的非平凡性，全部来自**层的范畴里正合性被打破**这一点。",
      refs: ['Le Stum, An introduction to condensed mathematics, §7.3']
    }

  ],

  edges: [
    {
      id: 'def-link.extproj-ext',
      kind: 'definition',
      definition: 'def.ext',
      usedBy: 'prop.ext-projective-vanishes',
      note: '结论说的是扩展群 $\\operatorname{Ext}^{n}(P,M)$。'
    },
    {
      id: 'def-link.extproj-projective',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.ext-projective-vanishes',
      note: '前提是 $P$ 投射，证明靠 $\\operatorname{Hom}(P,-)$ 正合。'
    },
    {
      id: 'def-link.injacy-acyclic',
      kind: 'definition',
      definition: 'def.f-acyclic',
      usedBy: 'prop.injective-iff-acyclic',
      note: '命题要刻画的就是「$F$-零调」这条定义。'
    },
    {
      id: 'def-link.injacy-injective',
      kind: 'implication',
      sources: ['prop.injective-criterion'],
      target: 'prop.injective-iff-acyclic',
      title: '内射判据把「无环」接回内射性',
      proof: [
        '$\\operatorname{Ext}^{1}(A,I) = 0$ 对一切 $A$ 成立，是内射性的同调刻画。',
        '`prop.injective-criterion` 正是这条判据；(3) $\\implies$ (1) 把它用在 $I$ 上，得到 $I$ 内射。',
        '另一侧（内射 $\\implies$ 无环）由长正合列立刻得到。∎',
      ].join('\n'),
      note: '$(3) \\implies (1)$ 用的是内射对象的判据（$\\operatorname{Ext}^{1}(-,I) = 0$）。'
    },
    {
      id: 'def-link.chext-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.cohomology-as-ext',
      note: '左边就是层上同调 $H^{n}(X, M^{\\bullet})$。'
    },
    {
      id: 'def-link.chext-internal',
      kind: 'definition',
      definition: 'def.internal-hom',
      usedBy: 'prop.cohomology-as-ext',
      note: '右边的 $\\operatorname{RHom}(\\mathbb{Z}\\cdot X, -)$ 是内部 Hom 的导出版本。'
    },
    {
      id: 'def-link.preshcoh-presheaf',
      kind: 'definition',
      definition: 'def.presheaf',
      usedBy: 'prop.presheaf-representable-acyclic',
      note: '系数 $M$ 是预层，不是层 —— 这是整条命题的关键。'
    },
    {
      id: 'def-link.preshcoh-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.presheaf-representable-acyclic',
      note: '结论是「预层情形下可表示对象的上同调为零」，与层上同调对照。'
    },
    {
      id: "dep.injacyclic-abelian",
      kind: 'definition',
      definition: "def.abelian-category",
      usedBy: "prop.injective-iff-acyclic",
      note: "内射等价于无环，在阿贝尔范畴中。"
    }
  ]
});
