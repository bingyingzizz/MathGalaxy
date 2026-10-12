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
      notes: [
        ['**证明。** $P$ **投射**意味着函子 $\\operatorname{Hom}_{\\mathcal{A}}(P, -)$ **正合** ✓。而 $P$ 的投射消解可以取成','$$\\cdots \\to 0 \\to 0 \\to P \\xrightarrow{\\ 1\\ } P \\to 0,$$','即「长度 $0$ 的消解」（$P$ 自己就是投射的，不需要再找覆盖）✓。把 $\\operatorname{Hom}(P, -)$ 作用在 $M$ 的内射消解 $M \\to I^{\\bullet}$ 上：因为 $\\operatorname{Hom}(P,-)$ 正合、$M \\to I^{\\bullet}$ 正合，复形 $\\operatorname{Hom}(P, I^{\\bullet})$ 只可能在 $0$ 次有上同调 ✓，即','$$R^{n}\\operatorname{Hom}(P, M) = \\operatorname{Ext}^{n}(P, M) = 0 \\quad (n > 0) ✓$$','（也可以直接从 $\\operatorname{RHom}(P, M) = \\operatorname{Hom}(P, M)$ 这件事读出来：正合函子的右导出函子就是它自己。）∎'].join('\n'),
        '⭐ 对偶地：**内射对象没有高次 Ext**（$\\operatorname{Ext}^{n}(M, I) = 0$，$n>0$）—— 这两条合起来就是「投射 / 内射对象可以拿来替代消解里的项」的全部理由。'
      ].join('\n\n'),
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
        ['**证明。**','$(1) \\implies (2)$：$I$ 内射时，$I$ 自己（连同恒等映射）就是一条**长度 $0$ 的内射消解** $0 \\to I \\xrightarrow{\\ 1\\ } I \\to 0$ ✓。用它算右导出函子：$RF(I) = F(I)$ 集中在 $0$ 次，故 $R^{n}F(I) = 0$（$n > 0$）✓，即 $I$ 是 $F$-零调的。','$(2) \\implies (3)$：显然（$\\operatorname{Hom}(M,-)$ 是左正合的）。','$(3) \\implies (1)$：对每个 $M$，$I$ 对 $\\operatorname{Hom}(M,-)$ 零调意味着 $R^{n}\\operatorname{Hom}(M, I) = \\operatorname{Ext}^{n}(M, I) = 0$（$n > 0$），特别地 $\\operatorname{Ext}^{1}_{\\mathcal{A}}(M, I) = 0$ 对一切 $M$ 成立 ✓。而由**内射判据**，$\\operatorname{Ext}^{1}_{\\mathcal{A}}(-, I) = 0$ 正是「$I$ 内射」的等价刻画（在阿贝尔范畴里，它等价于「每个单态射 $I \\rightarrowtail N$ 都有收缩」）✓。于是 $I$ 内射 ✓。∎'].join('\n'),
        '⭐ 用途：验「内射」时可以从**任何**左正合函子那一侧下手 —— 而在凝聚态 / 层的情形里，最方便的左正合函子就是取截面 $\\Gamma(S, -)$。'
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
      notes: [
        ['**证明。** 关键在于这两个函子**本来是同一个函子**。由 $\\mathbb{Z}\\cdot X$ 的泛性质（它是自由对象：$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X, M) = \\operatorname{Hom}(X, M)$）✓，','$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ M\\bigr) \\;=\\; \\operatorname{Hom}_{\\mathcal{T}}\\bigl(X,\\ M\\bigr) \\;=\\; \\Gamma(X, M) = M(X) ✓$$','即「取截面」函子与「$\\operatorname{Hom}(\\mathbb{Z}\\cdot X, -)$」逐字相同 ✓。右导出函子只依赖函子本身，故两者的右导出函子在导出范畴里同构：$\\operatorname{R}\\Gamma(X, -) \\cong \\operatorname{RHom}(\\mathbb{Z}\\cdot X, -)$ ✓；逐类取上同调就得到第二个同构 ✓。∎'].join('\n'),
        '⭐ 这条是**两套语言之间的桥**：一边是几何味的「截面」（$\\Gamma(X,-)$），一边是代数味的「导出 Hom」。有了它，层上同调的一切计算都能翻译成导出范畴里的 Ext 计算 —— 反过来，Ext 的几何意义也清楚了：**它就是某个空间上的上同调**。',
        '📌 与「Stonean 上的截面公式」对照看：那条把 Ext 写成 $\\operatorname{Ext}^{n}(M \\cdot S, N)$，这条把 Ext 写成 $H^{n}(X, N)$，两条合起来正是「$H^{n}(X, N)$ 可以用 $\\mathbb{Z}\\cdot X$ 的消解来算」。'
      ].join('\n\n'),
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
      notes: [
        ['**证明。** 取截面函子 $\\Gamma(h_{X}, -)$：由 Yoneda 引理','$$\\Gamma(h_{X}, M) = \\operatorname{Hom}_{\\widehat{\\mathcal{C}}}(h_{X}, M) = M(X) ✓$$','而在**预层**范畴上，「逐点取值」$M \\mapsto M(X)$ 是**正合**的 ✓（预层的核、像、余核都逐点算；$M(X)$ 就是一个普通的阿贝尔群）。','正合函子的右导出函子集中在 $0$ 次（用长度 $0$ 的「消解」$M \\to M$ 即可看出）✓，于是 $H^{n}(h_{X}, M) = R^{n}\\Gamma(h_{X}, M) = 0$（$n > 0$）✓。∎'].join('\n'),
        '⭐ **为什么值得单独说**：因为这是「**层化为什么必要**」的最好说明 —— 在预层层面，可表示对象上根本没有高次上同调（一切正合）；一取层化，$\\mathbb{Z}\\cdot X$ 就不再是「取值」那个函子，高次才冒出来。层上同调的非平凡性，全部来自**层的范畴里正合性被打破**这一点。'
      ].join('\n\n'),
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
      kind: 'definition',
      definition: 'prop.injective-criterion',
      usedBy: 'prop.injective-iff-acyclic',
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
    }
  ]
});
