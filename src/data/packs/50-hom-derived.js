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
      statement: '$K(\\mathcal{A})$ 关于**拟同构**这一族态射同时允许**左**与**右分式演算**。',
      notes: [
        '**预备：锥零调 $\\iff$ 拟同构。** 复形态射 $s : K^{\\bullet} \\to L^{\\bullet}$ 是拟同构，当且仅当它的**映射锥** $M(s)^{\\bullet}$ 零调 —— 三角 $K^{\\bullet} \\to L^{\\bullet} \\to M(s)^{\\bullet} \\to K^{\\bullet}[1]$ 取同调得长正合列，$M(s)$ 零调正是「$H^{n}(s)$ 全是同构」。',
        '**Ore 条件。** 给定拟同构 $w : L\'^{\\bullet} \\to L^{\\bullet}$ 与任意 $f : K^{\\bullet} \\to L^{\\bullet}$。记 $\\theta := f - w : K^{\\bullet} \\oplus L\'^{\\bullet} \\to L^{\\bullet}$，取它的**移位锥** $N^{\\bullet} := M(\\theta)[-1]$ —— 锥的三角给出两个态射，方形交换',
        '',
        '$$N^{\\bullet} \\xrightarrow{\\;g\\;} K^{\\bullet}, \\qquad N^{\\bullet} \\xrightarrow{\\;t\\;} L\'^{\\bullet}, \\qquad f \\circ g = w \\circ t .$$',
        '',
        ['**为什么 $t$ 是拟同构。** 关键在「把 $w$ 放在 $\\theta$ 的第二个分量」：于是 $\\theta_{*}$ 的第二分量是 $w_{*}$，可逆，所以 $\\theta_{*}$ 是**满**的，三角的长正合列就把 $M(\\theta)$ 的同调压进 $\\ker \\theta_{*}$ 里：',
          '- $\\theta_{*}$ 满，故连接同态为零，$H^{n}(M(\\theta)) \\cong \\ker \\theta_{*}^{n}$；',
          '- $\\ker \\theta_{*}^{n} = \\{(k, \\ell) : f_{*}k = w_{*}\\ell\\} \\xrightarrow{\\;\\sim\\;} H^{n}(K^{\\bullet})$（给定 $k$，$\\ell = w_{*}^{-1}f_{*}k$ 唯一）；',
          '- 这条同构下 $H^{n}(N^{\\bullet}) = H^{n-1}(M(\\theta)) \\xrightarrow{\\;t_{*}\\;} H^{n}(L\'^{\\bullet})$ 就是 $w_{*}^{-1}f_{*}$，是**同构**。'
        ].join('\n'),
        '**消去条件。** 设 $f \\circ s \\simeq g \\circ s$（$s$ 是拟同构），记 $h := f - g$。则 $h s \\simeq 0$；由映射锥的泛性质，$h$ 分解成 $L^{\\bullet} \\xrightarrow{\\;i\\;} M(s)^{\\bullet} \\xrightarrow{\\;h\'\\;} M^{\\bullet}$。取 $t : M^{\\bullet} \\to M(h\')^{\\bullet}$ 为映射锥的包含，则 $t h \\simeq 0$；而三角 $M(s) \\xrightarrow{h\'} M^{\\bullet} \\xrightarrow{t} M(h\') \\to M(s)[1]$ 的长正合列配上「$M(s)$ 零调」给出 $H^{n}(M^{\\bullet}) \\cong H^{n}(M(h\')^{\\bullet})$ —— 所以 **$t$ 是拟同构**，于是 $t f \\simeq t g$。',
        '恒等是拟同构、拟同构对复合封闭 —— 这两条平凡（$H^{n}$ 是函子）。**左**分式演算把同一套构造放到 $\\mathcal{A}^{\\mathrm{op}}$ 里做（等价地：让 $\\theta$ 的拟同构分量换到第一边）即得。∎',
        '⭐ **意义**：有了它，$D(\\mathcal{A})$ 的态射就能老老实实写成**屋顶** $K^{\\bullet} \\xleftarrow{\\;\\sim\\;} K\'^{\\bullet} \\longrightarrow L^{\\bullet}$，不必去处理任意长的分式链。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.2.1']
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
      statement: [
        '若 $0 \\to K^{\\bullet} \\xrightarrow{\\;f\\;} L^{\\bullet} \\xrightarrow{\\;g\\;} M^{\\bullet} \\to 0$ 是复形的**短正合列**，则在 $D(\\mathcal{A})$ 里存在**导出三角**',
        '',
        '$$K^{\\bullet} \\xrightarrow{\\;f\\;} L^{\\bullet} \\xrightarrow{\\;g\\;} M^{\\bullet} \\longrightarrow K^{\\bullet}[1].$$'
      ].join('\n'),
      notes: [
        '本质上是说：这个短正合列「就是」某个映射锥三角（在 $D(\\mathcal{A})$ 里同构于 $K^{\\bullet} \\xrightarrow{f} L^{\\bullet} \\to M(f) \\to K^{\\bullet}[1]$）。',
        ['**证明。** 由映射锥的显式写法（$M(f)^{n} = L^{n}\\oplus K^{n+1}$），复合',
          '$$M(f)^{n} \\longrightarrow L^{n} \\xrightarrow{\\;g\\;} M^{n}$$',
          '是复形态射（把 $L^{n}$ 那一块投过去），记作 $\\varphi : M(f)^{\\bullet} \\to M^{\\bullet}$。于是有复形的短正合列',
          '$$0 \\to M(\\mathrm{id}_{K^{\\bullet}})^{\\bullet} \\longrightarrow M(f)^{\\bullet} \\xrightarrow{\\;\\varphi\\;} M^{\\bullet} \\to 0 .$$',
          '而 $M(\\mathrm{id}_{K^{\\bullet}})$ 是**零调**的（$\\mathrm{id}_{K}$ 是拟同构；显式看就是可缩复形）。取长正合列，两头零调把首尾杀掉，读出 $\\varphi$ 是**拟同构** —— 于是它在 $D(\\mathcal{A})$ 里是同构，三角 $K^{\\bullet} \\xrightarrow{f} L^{\\bullet} \\to M(f)^{\\bullet} \\to K^{\\bullet}[1]$ 与要的那条同构。∎'
        ].join('\n'),
        '⭐ **这就是长正合列的来源**：有了三角，取同调函子（三角 $\\implies$ 同调长正合列）就直接得到长正合列 —— 见「导出函子的长正合列」。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.2.4']
    },

    {
      id: 'prop.hom-k-eq-hom-d',
      cluster: 'hom.complex',
      type: 'proposition',
      label: 'Hom 在同伦范畴与导出范畴里一样',
      title: '$\\operatorname{Hom}_{K}(K^{\\bullet}, I^{\\bullet}) = \\operatorname{Hom}_{D}(K^{\\bullet}, I^{\\bullet})$',
      regions: ['homology'],
      tags: ['同调代数', '导出范畴', '内射', '同伦范畴'],
      statement: [
        '设 $K^{\\bullet} \\in C(\\mathcal{A})$、$I^{\\bullet} \\in C^{+}(\\mathcal{I})$（上有界内射复形）。则局部化函子给出的映射',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{K}(\\mathcal{A})}(K^{\\bullet}, I^{\\bullet}) \\xrightarrow{\\;\\sim\\;} \\operatorname{Hom}_{D(\\mathcal{A})}(K^{\\bullet}, I^{\\bullet})$$',
        '',
        '是双射。对偶地：以**投射**复形为源（$P^{\\bullet} \\in C^{-}(\\mathcal{P})$）时同样成立。'
      ].join('\n'),
      notes: [
        '**要用的那条引理。** 若 $s : K\'^{\\bullet} \\to K^{\\bullet}$ 是拟同构、$I^{\\bullet} \\in C^{+}(\\mathcal{I})$，则「右乘 $s$」',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{K}}(K^{\\bullet}, I^{\\bullet}) \\xrightarrow{\\;\\circ s\\;} \\operatorname{Hom}_{\\mathbf{K}}(K\'^{\\bullet}, I^{\\bullet})$$',
        '',
        ['是**双射**。证：把 $s$ 补成三角 $K\'^{\\bullet} \\to K^{\\bullet} \\to M^{\\bullet} \\to K\'^{\\bullet}[1]$（$M^{\\bullet}$ 零调），对共调函子 $\\operatorname{Hom}_{\\mathbf{K}}(-, I^{\\bullet})$ 取长正合列得',
          '$$\\operatorname{Hom}_{\\mathbf{K}}(M^{\\bullet}[-1], I^{\\bullet}) \\to \\operatorname{Hom}_{\\mathbf{K}}(K^{\\bullet}, I^{\\bullet}) \\xrightarrow{\\;\\circ s\\;} \\operatorname{Hom}_{\\mathbf{K}}(K\'^{\\bullet}, I^{\\bullet}) \\to \\operatorname{Hom}_{\\mathbf{K}}(M^{\\bullet}, I^{\\bullet}),$$',
          '再用「零调的源到上有界内射复形的态射同伦于零」（逐项提升造同伦 $s^{n+1} \\circ d^{n} = f^{n} - d^{n-1}\\circ s^{n}$）把两头杀掉。'
        ].join('\n'),
        '**满。** $D$ 里的态射是屋顶 $K^{\\bullet} \\xleftarrow{\\;s\\;} K\'^{\\bullet} \\xrightarrow{\\;q\\;} I^{\\bullet}$（$s$ 拟同构）。由引理「右乘 $s$」是满射，存在 $p : K^{\\bullet} \\to I^{\\bullet}$ 使 $p s \\simeq q$ —— 屋顶与直接态射 $p$ 在 $D$ 里表示同一个态射。',
        '**单。** 若 $p, p\'$ 在 $D$ 里相等，则存在拟同构 $s$ 使 $p s \\simeq p\' s$（屋顶的等价关系按定义就是「存在公共细化」）；由引理「右乘 $s$」是单射，得 $p \\simeq p\'$。∎',
        '⭐ **用途**：这是「上有界内射复形**就是**导出范畴」与「用内射消解算 $R\\operatorname{Hom}$」两件事的共同地基 —— 以 $I^{\\bullet}$ 为靶时，同伦类和导出态射没有区别，于是可以安心在 $\\mathbf{K}$ 里算。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.2.5']
    },

    {
      id: 'thm.k-plus-injectives',
      cluster: 'hom.complex',
      type: 'theorem',
      label: '内射复形就是导出范畴',
      title: '$K^{+}(\\mathcal{I}) \\simeq D^{+}(\\mathcal{A})$',
      regions: ['homology'],
      tags: ['同调代数', '导出范畴', '内射消解', '等价'],
      statement: [
        '若 $\\mathcal{A}$ **有足够多内射对象**，则含入函子',
        '',
        '$$\\mathbf{K}^{+}(\\mathcal{I}) \\xrightarrow{\\;\\sim\\;} D^{+}(\\mathcal{A})$$',
        '',
        '是**范畴等价**。对偶地：有足够多投射对象时 $\\mathbf{K}^{-}(\\mathcal{P}) \\xrightarrow{\\;\\sim\\;} D^{-}(\\mathcal{A})$。'
      ].join('\n'),
      notes: [
        '记 $\\mathbf{K}^{+}(\\mathcal{I})$ 为**上有界内射复形**模同伦构成的范畴。这条说：要算 $D^{+}(\\mathcal{A})$ 里的东西，**只需要看内射复形**。',
        ['**证明：全忠实 + 本质满。**',
          '- **全忠实**：源与靶都是 $C^{+}(\\mathcal{I})$ 里的复形，由「上有界内射复形里 Hom 就是导出 Hom」直接得 $\\operatorname{Hom}_{\\mathbf{K}}(I^{\\bullet}, J^{\\bullet}) = \\operatorname{Hom}_{D}(I^{\\bullet}, J^{\\bullet})$，所以含入在 Hom 上是双射。',
          '- **本质满**：任给 $K^{\\bullet} \\in C^{+}(\\mathcal{A})$，由「足够多内射」可逐项提升，造出**由单射组成**的内射消解 $K^{\\bullet} \\rightarrowtail I^{\\bullet}$（同伦范畴里每步用内射性延拓态射即可，从上往下递推）。消解是拟同构，于是在 $D^{+}(\\mathcal{A})$ 里是同构 —— $K^{\\bullet}$ 与 $I^{\\bullet}$ 同构。'
        ].join('\n'),
        '⭐ **实用价值**：这就是「用内射消解算右导出函子」的合法性来源 —— 右导出函子 $RF$ 的定义本来就要求把复形换成内射复形，这条保证了那一侧的范畴**就是**导出范畴本身，替换不会丢信息。'
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 7.2.6', 'Le Stum, Proposition 7.1.21']
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
      statement: [
        '任意短正合列 $0 \\to K^{\\bullet} \\to L^{\\bullet} \\to M^{\\bullet} \\to 0$（在 $C^{+}(\\mathcal{A})$ 里）给出长正合列',
        '',
        '$$\\cdots \\to R^{n}FK^{\\bullet} \\to R^{n}FL^{\\bullet} \\to R^{n}FM^{\\bullet} \\xrightarrow{\\ \\delta\\ } R^{n+1}FK^{\\bullet} \\to \\cdots$$'
      ].join('\n'),
      notes: [
        '（$\\delta$ 就是三角的连接同态经 $H^{n}$ 取出来的那一段。）',
        ['**证明。** 由「短正合列给出导出三角」，在 $D^{+}(\\mathcal{A})$ 里有导出三角',
          '$$K^{\\bullet} \\to L^{\\bullet} \\to M^{\\bullet} \\to K^{\\bullet}[1].$$',
          '由 $\\mathbf{K}^{+}(\\mathcal{I}) \\simeq D^{+}(\\mathcal{A})$，可以假设这三个复形都**由内射对象组成**，态射也都在 $C(\\mathcal{A})$ 里取到（同构不改变同调）。于是把它们送到 $K^{+}(\\mathcal{A}\')$ 里仍然是一条三角（$F$ 加法，映射锥三角逐项送过去还是映射锥三角）。',
          '而 $H^{n} : \\mathbf{K}(\\mathcal{A}\') \\to \\mathcal{A}\'$ 是**共调函子**：三角取同调就是长正合列。在内射复形上 $R^{n}F = H^{n}F$，于是得到',
          '$$\\cdots \\to H^{n}FK^{\\bullet} \\to H^{n}FL^{\\bullet} \\to H^{n}FM^{\\bullet} \\to H^{n+1}FK^{\\bullet} \\to \\cdots ,$$',
          '正是要的那条。∎'
        ].join('\n'),
        '⭐ **这就是「求导」的全部收益**：原来 $F$ 只给半条，$RF$ 把连接同态 $\\delta$ 补上，长正合列就活了。'
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 7.2.8']
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
      statement: '若 $M \\in \\mathcal{A}$、$K^{\\bullet} \\in C^{+}(\\mathcal{A})$，则 $R^{n}\\operatorname{Hom}(M, K^{\\bullet}) = \\operatorname{Ext}^{n}(M, K^{\\bullet})$（对偶地 $R^{n}\\operatorname{Hom}(-, N)$ 给出另一边的 $\\operatorname{Ext}$）。',
      notes: [
        ['**证明。** 右边 $\\operatorname{Ext}^{n}(M, K^{\\bullet}) = \\operatorname{Hom}_{D}(M, K^{\\bullet}[n])$，左边用内射消解算。先化到 $K^{\\bullet}$ **本身就是内射复形**的情形（一般情形取内射消解 $K^{\\bullet} \\to I^{\\bullet}$，两边都对它不变）。于是由「上有界内射复形里 Hom 就是导出 Hom」',
          '$$\\operatorname{Ext}^{n}(M, I^{\\bullet}) = \\operatorname{Hom}_{D}(M, I^{\\bullet}[n]) = \\operatorname{Hom}_{\\mathbf{K}}(M, I^{\\bullet}[n]) = H^{0}\\bigl(\\operatorname{Hom}(M, I^{\\bullet}[n])\\bigr) = H^{n}\\bigl(\\operatorname{Hom}(M, I^{\\bullet})\\bigr),$$',
          '而最右边正是 $R^{n}\\operatorname{Hom}(M, I^{\\bullet})$（内射复形上 $R\\operatorname{Hom} = \\operatorname{Hom}$）。',
          '**最后那步 $\\operatorname{Hom}_{\\mathbf{K}} = H^{0}(\\operatorname{Hom})$ 要交代一句**：',
          '- $\\operatorname{Hom}_{C}(M, I^{\\bullet}) = Z^{0}\\bigl(\\operatorname{Hom}(M, I^{\\bullet})\\bigr)$ —— 链映射就是「$f : M \\to I^{0}$ 且 $d^{0} f = 0$」，即 $0$-闭上链；',
          '- $f$ 同伦于零 $\\iff$ $f = d^{0} \\circ s$（$M$ 集中在 $0$ 次，同伦只剩一项），即 $f \\in B^{0}$。',
          '两句话一比即得。∎'
        ].join('\n'),
        '⭐ **读法**：$\\operatorname{Ext}$ 有两种算法 —— 导出范畴里的 Hom，和用内射消解算的 $R^{n}\\operatorname{Hom}$；这条说它们给出同一个东西，所以实践中挑好算的那个。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.2.10']
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
      statement: '若 $K^{\\bullet} \\in C^{+}(\\mathcal{A})$ 且每个 $K^{n}$ 都是 **$F$-零调**的，则 $RFK^{\\bullet} = FK^{\\bullet}$。',
      notes: [
        ['**证明（截断 + 递推）。** 不妨设 $K^{n} = 0$（$n < 0$）。先设 $K^{\\bullet}$ **有界**，记它的「丢掉第 $0$ 项」的截断为 $K\'^{\\bullet} := (K^{1} \\to K^{2} \\to \\cdots)$，有复形的短正合列',
          '$$0 \\to K\'^{\\bullet} \\to K^{\\bullet} \\to [K^{0}] \\to 0 .$$',
          '由「短正合列给出导出三角」，它在 $D(\\mathcal{A})$ 里给出三角；把它与 $RF$ 作用后的三角摆在一起（右边用 $R^{n}F$ 的长正合列比较），两列竖直箭头构成三角之间的态射：',
          '$$\\begin{array}{ccccccc} FK\'^{\\bullet} & \\to & FK^{\\bullet} & \\to & FK^{0} & \\to & FK\'^{\\bullet}[1] \\\\ \\downarrow{\\scriptstyle \\sim} & & \\downarrow & & \\downarrow{\\scriptstyle \\sim} & & \\downarrow{\\scriptstyle \\sim} \\\\ RFK\'^{\\bullet} & \\to & RFK^{\\bullet} & \\to & RFK^{0} & \\to & RFK\'^{\\bullet}[1]. \\end{array}$$',
          '- 第三列左右相等，因为 $K^{0}$ 零调：$RFK^{0} = FK^{0}$；',
          '- 第一列由归纳假设（$K\'^{\\bullet}$ 更短，且每一项仍零调）是同构；',
          '- 于是由三角的四条「五引理」（两端是同构则中间也是），中间那列也是同构，即 $RFK^{\\bullet} = FK^{\\bullet}$。',
          '**无界情形**：把 $K^{\\bullet}$ 按 $K\'\'^{\\bullet} := (K^{0} \\to \\cdots \\to K^{n+1})$ 截出有界尾段，对 $0 \\to K\'^{\\bullet} \\to K^{\\bullet} \\to K\'\'^{\\bullet} \\to 0$ 取两条长正合列逐项比较（$\\varinjlim$ 让 $n \\to \\infty$），即得上一条。∎'
        ].join('\n'),
        '**推论（常用形式）**：若 $M \\to K^{\\bullet}$ 是**右消解**、且每个 $K^{n}$ 都 $F$-零调，则 $RFM = FK^{\\bullet}$，于是 $R^{n}FM = H^{n}(FK^{\\bullet})$ —— 这就是为什么算 $RF$ 不一定非要用内射消解。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.2.12']
    },

    {
      id: 'thm.filtered-complex-spectral',
      cluster: 'hom.spectral',
      type: 'theorem',
      label: '过滤复形给出谱序列',
      title: '下有界过滤复形 $\\implies$ 谱序列',
      regions: ['homology'],
      tags: ['同调代数', '谱序列', '过滤', '下有界'],
      statement: [
        '设 $K^{\\bullet}$ 是**带过滤**的复形（递降过滤 $F^{p}K^{\\bullet}$），且**下有界**（对每个 $n$，$p \\ll 0$ 时 $F^{p}K^{n} = K^{n}$）。则存在谱序列',
        '',
        '$$E^{p,q}_{0} = \\operatorname{Gr}^{p}K^{p+q} \\;\\Longrightarrow\\; H^{p+q}(K^{\\bullet}).$$'
      ].join('\n'),
      notes: [
        ['**构造（逐页逼近的真身）。** 对 $r \\ge 0$ 定义两族子对象',
          '$$Z^{p,q}_{r} := F^{p}K^{p+q} \\cap (d^{p+q})^{-1}\\bigl(F^{p+r}K^{p+q+1}\\bigr), \\qquad B^{p,q}_{r} := F^{p}K^{p+q} \\cap d^{p+q-1}\\bigl(F^{p-r+1}K^{p+q-1}\\bigr),$$',
          '并令 $E^{p,q}_{r} := Z^{p,q}_{r}/B^{p,q}_{r}$。逐条读：',
          '- $r = 0$：$Z^{p,q}_{0} = F^{p}K^{p+q}$、$B^{p,q}_{0} = F^{p+1}K^{p+q}$，所以 $E^{p,q}_{0} = \\operatorname{Gr}^{p}K^{p+q}$ —— **第一页就是把过滤一层层切开**；',
          '- $r = 1$：$Z^{p,q}_{1}$ 是 $\\operatorname{Gr}^{p}K^{p+q}$ 里的闭上链、$B^{p,q}_{1}$ 是边界，故 $E^{p,q}_{1} = H^{p+q}(\\operatorname{Gr}^{p}K^{\\bullet})$；',
          '- 一般地，$d$ 把 $Z^{p,q}_{r}$ 送进 $Z^{p+r,q-r+1}_{r}$ 并把 $B^{p,q}_{r}$ 送进 $B^{p+r,q-r+1}_{r}$，因此下降为微分 $d_{r} : E^{p,q}_{r} \\to E^{p+r,q-r+1}_{r}$，而**第 $r+1$ 页就是第 $r$ 页对 $d_{r}$ 取同调**：$E_{r+1} = H(E_{r}, d_{r})$。',
          '- **收敛**：$r$ 增大时 $Z^{p,q}_{r}$ 递升、$B^{p,q}_{r}$ 递降；因为过滤下有界，「$d$ 跳得够远」这件事在有限步后就空了，所以每个 $(p,q)$ 上 $Z^{p,q}_{r}$ 与 $B^{p,q}_{r}$ 都**稳定**，极限就是 $H^{p+q}(K^{\\bullet})$ 配上诱导过滤后的关联分次。∎'
        ].join('\n'),
        '⭐ **读法**：先把带过滤的复形「按层切碎」（取关联分次 $\\operatorname{Gr}^{p}$），算出每层的同调当第一页；然后微分一页一页地把它们拼回去，收敛到**原来的**同调。',
        '⚠️ 「下有界」这个条件不能省 —— 它保证上面的 $Z$、$B$ 真的会稳定（不是每个谱序列都会收敛到什么东西）。'
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 7.2.16', 'Weibel, An Introduction to Homological Algebra, 5.4.1']
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
        ['**证明（双复形 + 两个谱序列）。** 取 $M$ 的内射消解 $I^{\\bullet}$，令 $A^{\\bullet} := F I^{\\bullet}$。',
          '- 由假设，$I^{n}$ 内射，故 $FI^{n}$ 是 $G$-零调的，所以 $A^{\\bullet}$ 是 $FM$ 的一个**由 $G$-零调对象组成的**右消解，于是 $R(G\\circ F)M = G A^{\\bullet}$ 在导出范畴里（Leray 零调性），即 $R^{n}(G\\circ F)M = H^{n}(GA^{\\bullet})$；',
          '- 再对 $A^{\\bullet}$ 取 **Cartan–Eilenberg 分解** $J^{\\bullet,\\bullet}$（每个 $J^{p,\\bullet}$ 是 $A^{p}$ 的 $G$-零调消解，横竖两方向的同调都算得出来）；',
          '- 双复形的两个谱序列：按 $p$ 先过滤收敛到 $H^{p+q}(G J^{\\bullet,\\bullet}) = R^{p+q}(G\\circ F)M$，而它的 $E_{2}$ 页是「先竖后横」算出来的 $R^{p}G\\bigl(H^{q}(A^{\\bullet})\\bigr) = R^{p}G\\bigl(R^{q}FM\\bigr)$；另一个谱序列（先横后竖）因为每列都是零调消解而在 $E_{2}$ 页退化，两边收敛到同一个东西。∎',
          '细节在前两条里：Cartan–Eilenberg 分解的存在性，双复形谱序列的收敛与 $E_{2}$ 页的识别。'
        ].join('\n'),
        '**典型应用**：层上同调 — 先层化再取截面、Čech 上同调到 de Rham 上同调、群的同调里的 Lyndon–Hochschild–Serre 谱序列，都是它的特例。',
        '**为什么要求 $F$ 把内射送到 $G$-零调**：这样 $F$ 的内射消解才能直接拿来做 $G$ 的零调消解，两边才接得上。',
      ].join('\n\n'),
      refs: ['Le Stum, Corollary 7.2.13', 'Le Stum, Corollary 7.2.21'],
    }
  ],

  edges: []
});
