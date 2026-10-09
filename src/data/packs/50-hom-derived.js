/* ==========================================================================
   内容包 · 导出范畴与导出函子（14 条）
   --------------------------------------------------------------------------
    §7.2。这一团造出的东西是：**一套把「不达到正合的函子」变成正合的机器**。

   路线：同伦范畴 $K(\mathcal{A})$ 关于拟同构做局部化得到**导出范畴** $D(\mathcal{A})$
   → 在那里取**右导出函子** $RF$ → 它给出**长正合列** → 用它造出 $\operatorname{Ext}^{n}$。

   再往上：过滤复形与双复形给**谱序列**，也就是「逐页逼近同调」的算法。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '导出范畴与导出函子',
  nodes: [

    {
      id: 'prop.k-calculus-fractions',
      cluster: 'hom.complex',
      type: 'proposition',
      label: 'K(A) 允许分式演算',
      title: '$K(\\mathcal{A})$ 关于拟同构允许左右分式演算',
      regions: ['homology'],
      tags: ['同调代数', '同伦范畴', '拟同构', '分式演算'],
      statement: '$K(\\mathcal{A})$ 关于**拟同构**这一族态射同时允许**左**与**右分式演算**。'
    },

    {
      id: 'def.derived-category',
      cluster: 'hom.complex',
      type: 'definition',
      label: '导出范畴',
      title: '导出范畴 $D(\\mathcal{A})$',
      regions: ['homology'],
      tags: ['同调代数', '导出范畴', '局部化', '拟同构'],
      statement: [
        '阿贝尔范畴 $\\mathcal{A}$ 的**导出范畴** $D(\\mathcal{A})$ 是**同伦范畴 $K(\\mathcal{A})$ 关于拟同构的局部化**。',
        '',
        '于是 $D(\\mathcal{A})$ 的对象与 $K(\\mathcal{A})$（等价地 $C(\\mathcal{A})$）相同，而 $K^{\\bullet} \\to L^{\\bullet}$ 的一个态射是一个「屋顶」：',
        '',
        '$$K^{\\bullet} \\xleftarrow{\\ \\sim\\ } K\'^{\\bullet} \\longrightarrow L^{\\bullet},$$',
        '',
        '左边的箭头是**拟同构**（已变成同构）。'
      ].join('\n'),
      notes: [
        '⭐ **为什么要在 $K(\\mathcal{A})$ 里再商一次**：$K(\\mathcal{A})$ 里同伦的态射被identify了，但**拟同构还不是同构** —— 而求导函子、$\\operatorname{Ext}$、谱序列这些机器真正想要的，是「拟同构 = 同构」的那个范畴。$D(\\mathcal{A})$ 就是为此造的。',
        '**「屋顶」是什么**：局部化一般不能只靠「右走一步」，因为拟同构不总能通分；于是态射写成「先逆一个拟同构、再走一步」。这也正是 $D(\\mathcal{A})$ 的 Hom **可能不再是集合**的原因 —— 只有当 $\\mathcal{A}$ 有足够多内射（或投射）时才控制得住。',
        '📌 上有界、下有界、有界版本记 $D^{+}$、$D^{-}$、$D^{b}$；内射复形的版本记 $K^{+}(\\mathcal{I})$ 等。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.2.2'],
    },

    {
      id: 'prop.exact-to-triangle',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '正合列给出导出三角',
      title: '复形的短正合列 $\\implies$ 导出三角',
      regions: ['homology'],
      tags: ['同调代数', '正合列', '导出三角', '映射锥'],
      statement: '若 $0 \\to K^{\\bullet} \\xrightarrow{f} L^{\\bullet} \\xrightarrow{g} M^{\\bullet} \\to 0$ 是复形的**短正合列**，则存在一个**导出三角**',
      notes: '本质上是说：这个短正合列「就是」某个映射锥三角（在 $D(\\mathcal{A})$ 里同构于 $K^{\\bullet} \\xrightarrow{f} L^{\\bullet} \\to M(f) \\to K^{\\bullet}[1]$）。\n\n⭐ **这就是长正合列的来源**：有了三角，取同调函子就直接得到长正合列（见「长正合列」）。\n\n📌  **Proposition 7.2.4**。'
    },

    {
      id: 'prop.hom-k-eq-hom-d',
      cluster: 'hom.complex',
      type: 'proposition',
      label: 'Hom 在同伦范畴与导出范畴里一样',
      title: '$\\operatorname{Hom}_{K}(K^{\\bullet}, I^{\\bullet}) = \\operatorname{Hom}_{D}(K^{\\bullet}, I^{\\bullet})$',
      regions: ['homology'],
      tags: ['同调代数', '导出范畴', '内射', '同伦范畴']
    },

    {
      id: 'thm.k-plus-injectives',
      cluster: 'hom.complex',
      type: 'theorem',
      label: '内射复形就是导出范畴',
      title: '$K^{+}(\\mathcal{I}) \\simeq D^{+}(\\mathcal{A})$',
      regions: ['homology'],
      tags: ['同调代数', '导出范畴', '内射消解', '等价'],
      statement: '若 $\\mathcal{A}$ **有足够多内射对象**，则含入',
      notes: '记 $K^{+}(\\mathcal{I})$ 为**上有界内射复形**模同伦构成的范畴。这条说：要算 $D^{+}(\\mathcal{A})$ 里的东西，**只需要看内射复形**。\n\n⭐ **实用价值**：这就是「用内射消解算右导出函子」的合法性来源 —— 右导出函子 $RF$ 的定义本来就要求把复形换成内射复形，这条保证了那一侧的范畴**就是**导出范畴本身，替换不会丢信息。\n\n对偶地：有足够多投射时 $K^{-}(\\mathcal{P}) \\simeq D^{-}(\\mathcal{A})$。\n\n📌  **Theorem 7.2.6**。'
    },

    {
      id: 'def.right-derived-functor',
      cluster: 'hom.complex',
      type: 'definition',
      label: '右导出函子',
      title: '右导出函子 $RF$',
      regions: ['homology'],
      tags: ['同调代数', '导出函子', '内射消解', '求导'],
      statement: [
        '设 $F : \\mathcal{A} \\to \\mathcal{A}\'$ 是**加法函子**、$\\mathcal{A}$ 有足够多内射对象。$F$ 的**右导出函子** $RF$ 是（在同构意义下唯一的）使下图交换的函子',
        '',
        '$$\\begin{array}{ccc} K^{+}(\\mathcal{A}) & \\xrightarrow{\\;F\\;} & K^{+}(\\mathcal{A}\') \\\\[2pt] {\\scriptstyle \\text{换成内射复形}}\\big\\downarrow & & \\\\[2pt] K^{+}(\\mathcal{I}) & \\xrightarrow[\\;RF\\;]{} & \\end{array}$$'
      ].join('\n'),
      notes: [
        '**读法**：$F$ 本身不正合（所以不能把它直接送到导出范畴里），但**先把复形换成内射复形**、再作用 $F$、再回导出范畴，这一步就正合了 —— 那个复合就是 $RF$。',
        '**分量形式**：$R^{n}F(M) := H^{n}(RF(M))$，其中 $M$ 看成集中在 $0$ 次的复形。$R^{0}F = F$（对左正合函子），$R^{n}F = 0$（$n < 0$）。',
        '⭐ **动机**：$F$ 左正合时，短正合列 $0 \\to M\' \\to M \\to M\'\' \\to 0$ 只给出 $0 \\to FM\' \\to FM \\to FM\'\'$ —— **右边断掉了**。右导出函子 $R^{1}F(M\'\')$ 正好补上那个断口，把长正合列接起来。',
        '**对偶**：左导出函子 $LF$ 用**投射**消解，补的是「右半段断掉」的情形（$M \\otimes_{A} -$、$\\operatorname{Tor}$）。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.2.7'],
    },

    {
      id: 'thm.derived-long-exact',
      cluster: 'hom.complex',
      type: 'theorem',
      label: '导出函子的长正合列',
      title: '短正合列 $\\implies$ 右导出函子的长正合列',
      regions: ['homology'],
      tags: ['同调代数', '导出函子', '长正合列'],
      statement: '任意短正合列 $0 \\to K^{\\bullet} \\to L^{\\bullet} \\to M^{\\bullet} \\to 0$（在 $C^{+}(\\mathcal{A})$ 里）给出长正合列',
      notes: '$$\\cdots \\to R^{n}FK^{\\bullet} \\to R^{n}FL^{\\bullet} \\to R^{n}FM^{\\bullet} \\xrightarrow{\\ \\delta\\ } R^{n+1}FK^{\\bullet} \\to \\cdots$$\n\n⭐ **这就是「求导」的全部收益**：原来 $F$ 只给半条，$RF$ 把连接同态 $\\delta$ 补上，长正合列就活了。\n\n📌  **Theorem 7.2.8**。'
    },

    {
      id: 'def.ext',
      cluster: 'hom.complex',
      type: 'definition',
      label: '扩展群 Ext',
      title: '扩展群 $\\operatorname{Ext}^{n}$',
      regions: ['homology'],
      tags: ['同调代数', 'Ext', '导出范畴', '扩展'],
      statement: [
        '$L^{\\bullet}$ 被 $K^{\\bullet}$ 的**第 $n$ 个扩展群**是',
        '',
        '$$\\operatorname{Ext}^{n}(K^{\\bullet}, L^{\\bullet}) := \\operatorname{Hom}_{D(\\mathcal{A})}\\bigl(K^{\\bullet},\\ L^{\\bullet}[n]\\bigr).$$'
      ].join('\n'),
      notes: [
        '**几条立刻要记住的**（对 $\\mathcal{A}$ 里的对象 $M, N$）：',
        '',
        [
          '- $\\operatorname{Ext}^{n}(M, N) = 0$（$n < 0$）；',
          '- $\\operatorname{Ext}^{0}(M, N) = \\operatorname{Hom}(M, N)$；',
          '- $\\operatorname{Ext}^{1}(M, N)$ **分类 $N$ 被 $M$ 的扩张**（同构意义下）；',
          '- 在 $\\mathbf{Ab}$ 里 $\\operatorname{Ext}^{n}(M, N) = 0$（$n > 1$）；',
          '- $\\operatorname{Ext}^{1}(\\mathbb{Z}/n\\mathbb{Z},\\ \\mathbb{Z}/m\\mathbb{Z}) = \\mathbb{Z}/d\\mathbb{Z}$，$d = \\gcd(m, n)$。'
        ].join('\n'),
        '⭐ **两种算法**：$\\operatorname{Ext}^{n} = $ 「导出范畴里的 Hom」（这条定义）$ = R^{n}\\operatorname{Hom}$（用内射消解算）。两者一致 —— 见下一条。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.2.9'],
    },

    {
      id: 'prop.ext-is-rhom',
      cluster: 'hom.complex',
      type: 'proposition',
      label: 'Ext 就是 RHom',
      title: '$R^{n}\\operatorname{Hom}(M, K^{\\bullet}) = \\operatorname{Ext}^{n}(M, K^{\\bullet})$',
      regions: ['homology'],
      tags: ['同调代数', 'Ext', 'RHom', '内射消解'],
      statement: '若 $M \\in \\mathcal{A}$、$K^{\\bullet} \\in C^{+}(\\mathcal{A})$，则 $R^{n}\\operatorname{Hom}(M, K^{\\bullet}) = \\operatorname{Ext}^{n}(M, K^{\\bullet})$（对偶地 $R^{n}\\operatorname{Hom}(-, N)$ 给出另一边的 $\\operatorname{Ext}$）。'
    },

    {
      id: 'def.f-acyclic',
      cluster: 'hom.complex',
      type: 'definition',
      label: 'F-零调对象',
      title: '$F$-零调对象（$F$-Acyclic）',
      regions: ['homology'],
      tags: ['同调代数', '零调', '导出函子', '消解'],
      statement: [
        '设 $F$ 是**左正合**加法函子、有足够多内射。对象 $M \\in \\mathcal{A}$ 叫（右）**$F$-零调的**，如果',
        '',
        '$$FM = RFM,$$',
        '',
        '即 $FM = R^{0}FM$ 且 $R^{n}FM = 0$（$n \\ne 0$）。'
      ].join('\n'),
      notes: [
        '**为什么重要**：$F$-零调对象**可以拿来做消解** —— 算 $RF$ 时不必只用内射对象，用零调对象也合法（这就是下一条 Leray 零调性说的）。',
        '**例子**：内射对象当然零调（$RF$ 就是用它们定义的）；平坦模对 $M \\otimes_{A} -$ 零调；**Stonean 空间上的凝聚态阿贝尔群**在取截面函子下零调 —— 那正是 §8 的开头。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.2.11'],
    },

    {
      id: 'prop.leray-acyclicity',
      cluster: 'hom.complex',
      type: 'proposition',
      label: 'Leray 零调性',
      title: 'Leray 零调性：零调复形算导出函子',
      regions: ['homology'],
      tags: ['同调代数', '零调', 'Leray', '导出函子'],
      statement: '若 $K^{\\bullet} \\in C^{+}(\\mathcal{A})$ 且每个 $K^{n}$ 都是 **$F$-零调**的，则 $RFK^{\\bullet} = FK^{\\bullet}$。'
    },

    {
      id: 'thm.filtered-complex-spectral',
      cluster: 'hom.spectral',
      type: 'theorem',
      label: '过滤复形给出谱序列',
      title: '下有界过滤复形 $\\implies$ 谱序列',
      regions: ['homology'],
      tags: ['同调代数', '谱序列', '过滤', '下有界'],
      statement: '设 $K^{\\bullet}$ 是**带过滤**的复形，且**下有界**。则存在谱序列',
      notes: '$$E^{p,q}_{1} = H^{p+q}\\bigl(\\operatorname{Gr}^{p}K^{\\bullet}\\bigr) \\;\\Longrightarrow\\; H^{p+q}(K^{\\bullet}).$$\n\n⭐ **读法**：先把带过滤的复形「按层切碎」（取关联分次 $\\operatorname{Gr}^{p}$），算出每层的同调当第一页；然后微分一页一页地把它们拼回去，收敛到**原来的**同调。\n\n⚠️ 「下有界」这个条件不能省 —— 它保证收敛（不是每个谱序列都会收敛到什么东西）。\n\n📌  **Theorem 7.2.16**。'
    },

    {
      id: 'def.bicomplex',
      cluster: 'hom.spectral',
      type: 'definition',
      label: '双复形',
      title: '双复形（Bicomplex）',
      regions: ['homology'],
      tags: ['同调代数', '双复形', '复形的复形'],
      statement: [
        '加法范畴里的**双复形**就是**复形的复形**：即 $(\\mathbb{Z}, \\preceq)^{2}$ 上的图 $(K^{p,q}, d^{p,q}, d\'^{p,q})$，使对一切 $p, q$',
        '',
        '$$d^{p+1,q} \\circ d^{p,q} = 0, \\qquad d\'^{p,q+1} \\circ d\'^{p,q} = 0, \\qquad d\'^{p+1,q} \\circ d^{p,q} = d^{p,q+1} \\circ d\'^{p,q}.$$'
      ].join('\n'),
      notes: [
        '前两条说「每个方向各自是复形」；**第三条说两个方向的微分交换**（差一个符号，视约定）。',
        '⭐ **怎么把它变成一个普通复形**：取**全复形** $K^{n} := \\bigoplus_{p+q=n} K^{p,q}$，微分 $d + d\'$（带符号）。于是双复形的同调与「逐行算完再逐列算」的关系，正是给出谱序列的地方。',
        '**典型来源**：把复形作内射消解时自然会得到双复形（$I^{p,q}$ 里 $p$ 是原复形的次数、$q$ 是消解的次数）。**Grothendieck 谱序列**就是从它来的。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.2.17'],
    },

    {
      id: 'cor.grothendieck-spectral',
      cluster: 'hom.spectral',
      type: 'corollary',
      label: 'Grothendieck 谱序列',
      title: 'Grothendieck 谱序列',
      regions: ['homology'],
      tags: ['同调代数', '谱序列', 'Grothendieck', '复合函子'],
      statement: [
        '设 $\\mathcal{A} \\xrightarrow{F} \\mathcal{A}\' \\xrightarrow{G} \\mathcal{A}\'\'$ 是加法函子，$\\mathcal{A}, \\mathcal{A}\'$ **有足够多内射**、且 $F$ 把内射对象送到 $G$-零调对象。则存在谱序列',
        '',
        '$$E^{p,q}_{2} = R^{p}G\\bigl(R^{q}F(M)\\bigr) \\;\\Longrightarrow\\; R^{p+q}(G \\circ F)(M).$$'
      ].join('\n'),
      notes: [
        '⭐ **它的用处**：想算复合函子的导出函子 $R^{n}(G \\circ F)$，可以**先算 $R^{q}F$、再算 $R^{p}G$**，中间用谱序列把两层的贡献拼起来。这是同调代数里最基本的「两步走」工具。',
        '**典型应用**：层上同调 — 先层化再取截面、Čech 上同调到 de Rham 上同调、群的同调里的 Lyndon–Hochschild–Serre 谱序列，都是它的特例。',
        '**为什么要求 $F$ 把内射送到 $G$-零调**：这样 $F$ 的内射消解才能拿来做 $G$ 的零调消解，两边才接得上。',
      ].join('\n\n'),
      refs: ['Le Stum, Corollary 7.2.13', 'Le Stum, Corollary 7.2.21'],
    }
  ],

  edges: []
});
