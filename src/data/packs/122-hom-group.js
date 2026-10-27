/* ==========================================================================
   内容包 · 群上同调、天际线层、正合偶（24 条）
   --------------------------------------------------------------------------
   这一包补三条此前只在星团 desc 里挂过名、节点还没落地的线，外加一条
   「另一条路」：

     §A 群上同调（hom.group）
        群环 → G-模 → 不变量函子 → 群上同调 → 标准（bar）消解 → 显式上链复形
          → 一维：交叉同态 → 一维：分裂扩张
          → 二维：群扩张 + 2-上圈 → 二维分类定理
          → 低次正合列（把上面几条的技术源头说清楚）

     §B 天际线层（hom.sheafcoh）
        天际线层 → 它的茎 → 它何时内射 → 足够多内射层（层上同调的定义合法性）

     §C 仿紧的 Čech（hom.sheafcoh）
        仿紧 Hausdorff 上 Čech 上同调 = 层上同调（接 `prop.chaus-cech-eq-h`）

     §D 谱序列的另一条路（hom.spectral）
        正合偶 → 正合偶给出谱序列 → 过滤复形给出正合偶
          （与 `thm.filtered-complex-spectral` 的「直接构造」是同一个谱序列）

     §E étale 层（hom.sheafcoh）
        étale 空间（拓扑的 espace étalé）→ étale 层（概形的 étale site）
          → 例子：开浸入、有限 étale 覆叠、常值层

   ⭐ 与图上别处的接口：
     · `def.right-derived-functor` / `def.ext`（群上同调就是 Ext）
     · `def.spectral-sequence` / `thm.filtered-complex-spectral` / `prop.bicomplex-spectral`
     · `def.sheaf-cohomology` / `def.cech-cohomology` / `prop.chaus-cech-eq-h`
     · `def.paracompact` / `prop.paracompact-partition-unity`（拓扑那一团给的）
     · `def.injective-object` 一类（hom.injective 团）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '群上同调与谱序列的另一条路',
  nodes: [

    /* ======================================================================
       §A 群上同调
       ====================================================================== */

    {
      id: 'def.group-ring',
      cluster: 'hom.group',
      type: 'definition',
      label: '群环',
      title: '群环 $R[G]$',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '群环', '群代数'],
      refs: ['Weibel, An Introduction to Homological Algebra, Chapter 6（群环与群模）'],
      statement: [
        '设 $R$ 是有 $1$ 的交换环、$G$ 是群。**群环** $R[G]$ 的元素是**形式有限和**',
        '',
        '$$\\sum_{g \\in G} a_{g}\\, g ,$$',
        '',
        '其中 $a_{g} \\in R$，且 $a_{g} = 0$ 对除有限多个 $g$ 之外的所有 $g$ 成立。加法逐分量，乘法按双线性展开：',
        '',
        '$$\\Bigl(\\sum_{g} a_{g} g\\Bigr)\\Bigl(\\sum_{h} b_{h} h\\Bigr) := \\sum_{g,h}\\, a_{g} b_{h}\\, (gh) .$$'
      ].join('\n'),
      notes: [
        '⭐ **一句话**：群环把群论问题摊成线性代数问题 —— 群的乘法被展开成 $R$-模上的双线性运算，于是「模」「消解」「导出函子」这些机器就能用在群上。',
        '',
        '**基本性质**：',
        '- $G = \\{1\\}$ 时 $R[G] = R$；$G$ 有限时 $R[G]$ 作为 $R$-模**以 $G$ 为基**，即 $R[G] \\cong R^{\\oplus |G|}$。',
        '- $R[G]$ **一般不是交换环**：$gh \\ne hg$ 时 $g$ 与 $h$ 是不同的基元素，$g h$ 与 $h g$ 也就不同。所以 $R[G]\\text{-}\\mathbf{Mod}$ 一般不构成对称幺半范畴。',
        '- $g \\mapsto g^{-1}$ 给出 $R[G]^{\\mathrm{op}} \\cong R[G]$。于是「左模」与「右模」只差一个取逆 —— 群上同调里不必太在意左右。',
        '',
        '**为什么必须造它**：群 $G$ 本身不是环，谈不上模、内射、消解。把 $G$ 塞进 $R[G]$ 之后，「$G$ 在某个阿贝尔群上的作用」就变成了「$R[G]$ 的模」，整个同调代数立刻可用。'
      ].join('\n')
    },

    {
      id: 'def.g-module',
      cluster: 'hom.group',
      type: 'definition',
      label: '群模',
      title: '$G$-模（$R[G]$-模）',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '群作用', '模'],
      refs: ['Weibel, An Introduction to Homological Algebra, Chapter 6（群模与群环的模）'],
      statement: [
        '设 $R$ 是有 $1$ 的交换环、$G$ 是群。一个**左 $G$-模**是一个 $R$-模 $M$ 配上一个作用映射 $G \\times M \\to M$，$(g, m) \\mapsto g \\cdot m$，满足',
        '',
        '- 对每个 $g \\in G$，$m \\mapsto g \\cdot m$ 是 $R$-线性的，即 $g \\cdot (m + n) = g \\cdot m + g \\cdot n$、$g \\cdot (r m) = r\\, (g \\cdot m)$；',
        '- $(g h) \\cdot m = g \\cdot (h \\cdot m)$ 且 $1 \\cdot m = m$（对一切 $g, h \\in G$、$m, n \\in M$、$r \\in R$）。',
        '',
        '三种说法完全等价：$G$ 在 $M$ 上的一个作用 $\\iff$ $M$ 是左 $R[G]$-模 $\\iff$ 有群同态 $G \\to \\operatorname{Aut}_{R}(M)$。'
      ].join('\n'),
      notes: [
        '**等价性怎么来的**：群环的泛性质给出',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{Ring}}\\bigl(R[G],\\ \\operatorname{End}_{R}(M)\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Grp}}\\bigl(G,\\ \\operatorname{Aut}_{R}(M)\\bigr),$$',
        '',
        '左边正是「$M$ 是 $R[G]$-模」，右边正是「$G$ 作用在 $M$ 上」。',
        '',
        '**三个要记住的例子**：',
        '- **平凡模**：$g \\cdot m = m$。记 $R$ 带平凡作用就是这一条 —— 它是群上同调定义里那个「底模」，$H^{n}(G, M)$ 里的第二个变量往往取它。',
        '- **左正则模** $R[G]$ 自己：$g \\cdot x := g x$（群环里相乘）。',
        '- **符号模**：当 $G$ 有一个到 $\\{\\pm 1\\}$ 的同态时，取 $g \\cdot n := \\operatorname{sgn}(g)\\, n$（$M = \\mathbb{Z}$）。',
        '',
        '⚠️ **左右之别**：$R[G]^{\\mathrm{op}} \\cong R[G]$（取逆），所以左 $G$-模与右 $G$-模是同一件事的两面；本图一律用左模。'
      ].join('\n')
    },

    {
      id: 'def.invariant-functor',
      cluster: 'hom.group',
      type: 'definition',
      label: '不变量函子',
      title: '不变量函子 $(-)^{G}$',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '不变量', '左正合'],
      refs: ['Weibel, An Introduction to Homological Algebra, Chapter 6（不变量函子与群上同调）'],
      statement: [
        '设 $M$ 是 $G$-模。对 $g \\in G$ 记 $g - 1 : M \\to M$ 为 $R$-线性映射 $m \\mapsto g \\cdot m - m$。$M$ 的**不变量子模**是',
        '',
        '$$M^{G} := \\bigcap_{g \\in G} \\ker\\bigl(g - 1\\bigr) \\;\\subseteq\\; M .$$',
        '',
        '$M \\mapsto M^{G}$、$f \\mapsto f|_{M^{G}}$ 构成**不变量函子**',
        '',
        '$$(-)^{G} : R[G]\\text{-}\\mathbf{Mod} \\longrightarrow R\\text{-}\\mathbf{Mod} .$$',
        '',
        '它自然同构于 $\\operatorname{Hom}_{R[G]}(R, -)$（$R$ 带平凡 $G$-作用），因而**左正合**，但一般不右正合。'
      ].join('\n'),
      notes: [
        '⭐ **一句话**：$(-)^{G}$ 就是「取不动点」。它把群作用的信息压到 $R$-模上，是群上同调的起点（$H^{0} = (-)^{G}$）。',
        '',
        '**为什么是 $\\operatorname{Hom}_{R[G]}(R, -)$**：$R[G]$-线性映射 $f : R \\to M$ 由 $f(1)$ 决定，而 $f(1) = f(g \\cdot 1) = g \\cdot f(1)$，所以 $f(1) \\in M^{G}$；反过来任给 $m \\in M^{G}$ 都能这样定义 $f$。于是 $(-)^{G} = \\operatorname{Hom}_{R[G]}(R, -)$ —— 它对第二个变量左正合。',
        '',
        '**左正合但不右正合**：短正合列 $0 \\to L \\to M \\to N \\to 0$ 取不变量只得到',
        '',
        '$$0 \\longrightarrow L^{G} \\longrightarrow M^{G} \\longrightarrow N^{G},$$',
        '',
        '右边**接不上**。典型反例：$G = \\mathbb{Z}/2$ 以符号作用在 $\\mathbb{Z}$ 上，取 $0 \\to \\mathbb{Z} \\xrightarrow{\\cdot 2} \\mathbb{Z} \\to \\mathbb{Z}/2 \\to 0$，则 $M^{G} = 0$ 而 $N^{G} = \\mathbb{Z}/2$，$M^{G} \\to N^{G}$ 不是满射。',
        '',
        '⚠️ **对偶那一侧不是它**：$M \\mapsto M_{G} := M\\big/\\langle g m - m \\rangle$（余不变量）右正合，对应群**同调** $H_{n}(G, M)$。本图只走**上**同调这条线。'
      ].join('\n')
    },

    {
      id: 'def.group-cohomology',
      cluster: 'hom.group',
      type: 'definition',
      label: '群上同调',
      title: '群上同调 $H^{n}(G, M)$',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '导出函子', 'Ext'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5', 'Rotman, An Introduction to Homological Algebra —— 群上同调一章'],
      statement: [
        '设 $M$ 是 $G$-模。群 $G$ 系数在 $M$ 里的**第 $n$ 个上同调群**是**不变量函子的右导出函子**：',
        '',
        '$$H^{n}(G, M) := R^{n}(-)^{G}(M),$$',
        '',
        '等价地',
        '',
        '$$H^{n}(G, M) = \\operatorname{Ext}^{n}_{R[G]}\\bigl(R,\\ M\\bigr),$$',
        '',
        '其中 $R$ 带平凡 $G$-作用。特别地 $H^{0}(G, M) = M^{G}$ 且 $H^{n}(G, M) = 0$（$n < 0$）。'
      ].join('\n'),
      notes: [
        '⭐ **一句话**：$H^{0}$ 只是「不动点」；$H^{n}$（$n \\ge 1$）量的是**不变量函子断了多远**，也就是 $G$ 的作用有多不平凡。',
        '',
        '**两条算法**：',
        '- **内射消解**（定义本身）：取 $M$ 的内射 $R[G]$-模消解 $M \\rightarrowtail I^{\\bullet}$，取不变量、取同调。最干净，但内射 $R[G]$-模看不见摸不着。',
        '- **标准（bar）消解**（可算）：取 $R$ 的**自由** $R[G]$-模消解 $B_{\\bullet} \\to R$，再取 $\\operatorname{Hom}_{R[G]}(B_{\\bullet}, M)$，得到一个**显式**上链复形。这一条给出 $H^{n}$ 的具体公式，见「用标准消解计算群上同调」。',
        '',
        '**为什么等于 $\\operatorname{Ext}$**：$(-)^{G} = \\operatorname{Hom}_{R[G]}(R, -)$，而用 $R$ 的内射消解算 $R^{n}\\operatorname{Hom}_{R[G]}(R, -)$ 正是 $\\operatorname{Ext}^{n}_{R[G]}(R, -)$。同一个右导出函子，只是换了名字。$H^{n} = 0$（$n < 0$）也正是「右导出函子」的直接后果。',
        '',
        '**两条立刻能用的**：',
        '- 若 $M$ 是 $\\mathbb{Q}$-向量空间且 $G$ 作用平凡，则 $(-)^{G}$ 就是恒等函子（正合），于是 $H^{n}(G, M) = 0$（$n \\ge 1$）。',
        '- 若 $G$ 在 $M$ 上作用平凡，则 $H^{1}(G, M) = \\operatorname{Hom}(G, M)$；一般情形要换成「交叉同态」，见后面两条。'
      ].join('\n')
    },

    {
      id: 'def.bar-resolution',
      cluster: 'hom.group',
      type: 'definition',
      label: '标准消解',
      title: '标准（bar）消解',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', 'bar 消解', '自由消解'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5（标准消解）', 'Rotman, An Introduction to Homological Algebra —— 群上同调一章'],
      statement: [
        '设 $R$ 是有 $1$ 的交换环、$G$ 是群，$R$ 带平凡 $G$-作用。**标准消解**（bar resolution）是 $R$ 的一个自由 $R[G]$-模消解',
        '',
        '$$\\cdots \\longrightarrow B_{2} \\xrightarrow{\\ d_{2}\\ } B_{1} \\xrightarrow{\\ d_{1}\\ } B_{0} \\xrightarrow{\\ \\varepsilon\\ } R \\longrightarrow 0 ,$$',
        '',
        '其中 $B_{n}$ 是以**符号** $[g_{0}|g_{1}|\\cdots|g_{n}]$（$g_{i} \\in G$）为 $R$-基的自由 $R$-模，$R[G]$ 通过最左边的分量作用：',
        '',
        '$$g \\cdot [g_{0}|g_{1}|\\cdots|g_{n}] := [g g_{0}|g_{1}|\\cdots|g_{n}] .$$',
        '',
        '微分与增广是',
        '',
        '$$d_{n}[g_{0}|\\cdots|g_{n}] := \\sum_{i=0}^{n} (-1)^{i}\\,[g_{0}|\\cdots|\\widehat{g_{i}}|\\cdots|g_{n}], \\qquad \\varepsilon[g_{0}] := 1 ,$$',
        '',
        '其中 $\\widehat{g_{i}}$ 表示把那一项删掉。'
      ].join('\n'),
      notes: [
        '**两条与写法有关的事**：',
        '- **$R[G]$-自由性**：$[g_{0}|\\cdots|g_{n}] = g_{0} \\cdot [1|g_{1}|\\cdots|g_{n}]$，所以 $B_{n}$ 作为 $R[G]$-模有基 $\\{[1|g_{1}|\\cdots|g_{n}]\\}$ —— 它是**自由**的，这是整套消解能拿来算导出函子的关键（自由 $\\implies$ 投射）。',
        '- **归一化版本**：把「$i \\ge 1$ 时 $g_{i} = 1$」的那些符号生成的子复形记 $B^{\\mathrm{norm}}_{\\bullet}$，则含入 $B^{\\mathrm{norm}}_{\\bullet} \\hookrightarrow B_{\\bullet}$ 是拟同构（逐项可缩），所以拿它算同调给出同一个答案，但项要少得多。',
        '',
        '**正合性（收缩同伦）**：约定 $B_{-1} := R$、$d_{0} := \\varepsilon$，令',
        '',
        '$$s_{n}[g_{0}|\\cdots|g_{n}] := [1|g_{0}|\\cdots|g_{n}] \\qquad (n \\ge 0), \\qquad s_{-1}(1) := [1] .$$',
        '',
        '逐项展开可得 $d_{n+1} s_{n} + s_{n-1} d_{n} = \\mathrm{id}$：$s d$ 给出一串「补上 $1$、删掉某个 $g_{i}$」的项，$d s$ 给出同一串**带相反符号**的项再加一项 $[g_{0}|\\cdots|g_{n}]$ 本身，两串相消，只剩那一项。故增广复形可缩，$H_{n}(B_{\\bullet}) = 0$（$n > 0$）、$H_{0} = R$，消解成立。∎',
        '',
        '⭐ **为什么叫 bar**：符号 $[g_{0}|g_{1}|\\cdots|g_{n}]$ 里那些竖线在旧文献里印成横杠，于是得名。它是「把群的乘积结构逐个拉开」这件事最朴素的做法 —— 没有任何选择，纯组合。'
      ].join('\n')
    },

    {
      id: 'prop.group-cohom-compute',
      cluster: 'hom.group',
      type: 'proposition',
      label: '用标准消解计算群上同调',
      title: '用标准消解计算：$H^{n}(G, M) = H^{n}\\bigl(C^{\\bullet}(G, M)\\bigr)$',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '上链复形', 'bar 消解'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5（上链复形）', 'Rotman, An Introduction to Homological Algebra —— 群上同调一章'],
      statement: [
        '设 $M$ 是 $G$-模。令',
        '',
        '$$C^{n}(G, M) := \\operatorname{Hom}_{R[G]}\\bigl(B_{n},\\ M\\bigr) \\;\\cong\\; \\bigl\\{\\, c : G^{n} \\to M \\,\\bigr\\}$$',
        '',
        '（$C^{0}(G, M) = M$，约定 $G^{0}$ 是单点集），微分',
        '',
        '$$(\\delta c)(g_{1}, \\cdots, g_{n+1}) := g_{1} c(g_{2}, \\cdots, g_{n+1}) + \\sum_{i=1}^{n} (-1)^{i} c(g_{1}, \\cdots, g_{i} g_{i+1}, \\cdots, g_{n+1}) + (-1)^{n+1} c(g_{1}, \\cdots, g_{n}) .$$',
        '',
        '则 $H^{n}(G, M) \\cong H^{n}\\bigl(C^{\\bullet}(G, M)\\bigr)$ 对一切 $n \\ge 0$ 成立。'
      ].join('\n'),
      notes: [
        '**按 $n$ 展开就是最有用的那几行**：',
        '- $n = 0$：$C^{0} = M$、$(\\delta^{0} m)(g) = g m - m$，故 $H^{0} = \\ker \\delta^{0} = M^{G}$。',
        '- $n = 1$：$Z^{1}$ 是**交叉同态**、$B^{1}$ 是**主交叉同态**，见「一维上同调与交叉同态」。',
        '- $n = 2$：$Z^{2}$ 是满足结合律条件的 **$2$-上圈**、$B^{2}$ 是 **$2$-上边界**，见「二维上圈与上边界」与「二维上同调分类群扩张」。',
        '',
        '⭐ **实用价值**：这个复形是**显式**的 —— 每一项都是「$G^{n}$ 到 $M$ 的任意函数」，$\\delta$ 是纯组合公式，没有任何消解要挑。于是群上同调在原则上可以硬算；代价是 $C^{n}$ 巨大，实际计算要靠小消解或谱序列。',
        '',
        '⚠️ **别把它当成「另一个群上同调」**：它算出来的就是 $R^{n}(-)^{G}$，只是换了一条（等价但可算的）路。两条路给出同构，且这个同构是**自然**的。'
      ].join('\n')
    },

    {
      id: 'thm.h1-crossed',
      cluster: 'hom.group',
      type: 'theorem',
      label: '一维上同调与交叉同态',
      title: '$H^{1}(G, M)$ 是交叉同态模主交叉同态',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '交叉同态', '一维上同调'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5（一维上同调与交叉同态）', 'Serre, Galois Cohomology —— 一维上同调与交叉同态'],
      statement: [
        '设 $M$ 是 $G$-模（记法用加法）。映射 $d : G \\to M$ 叫**交叉同态**（crossed homomorphism，也就是 $1$-上圈），如果',
        '',
        '$$d(g_{1} g_{2}) = d(g_{1}) + g_{1}\\, d(g_{2}) \\qquad (g_{1}, g_{2} \\in G).$$',
        '',
        '由**固定元素**给出的那一类',
        '',
        '$$d_{m}(g) := g\\, m - m \\qquad (m \\in M)$$',
        '',
        '叫**主交叉同态**（$1$-上边界）。记全体交叉同态为 $Z^{1}(G, M)$、全体主交叉同态为 $B^{1}(G, M) \\subseteq Z^{1}(G, M)$。则',
        '',
        '$$H^{1}(G, M) \\;\\cong\\; Z^{1}(G, M) \\big/ B^{1}(G, M) .$$'
      ].join('\n'),
      notes: [
        '**读法**：交叉同态是「差一个作用」的同态 —— 作用平凡时它退化成普通的群同态 $G \\to M$，主交叉同态则全部坍成 $0$。',
        '',
        '**证明只用一行**：在标准上链复形里 $C^{1}(G, M)$ 就是全体映射 $G \\to M$，而',
        '',
        '$$\\delta c(g_{1}, g_{2}) = g_{1} c(g_{2}) - c(g_{1} g_{2}) + c(g_{1}),$$',
        '',
        '所以 $\\delta c = 0 \\iff c(g_{1}g_{2}) = c(g_{1}) + g_{1}c(g_{2})$，即 $Z^{1}$ 恰是交叉同态。又 $C^{0} = M$、$(\\delta^{0}m)(g) = g m - m$，故 $\\operatorname{im}\\delta^{0} = B^{1}$。于是 $H^{1} = \\ker\\delta^{1}/\\operatorname{im}\\delta^{0} = Z^{1}/B^{1}$。∎',
        '',
        '**两个立刻能用的**：',
        '- 作用**平凡**时 $Z^{1} = \\operatorname{Hom}(G, M)$ 而 $B^{1} = 0$，于是 $H^{1}(G, M) = \\operatorname{Hom}(G, M)$。',
        '- $G$ **有限**、$M$ 无挠且作用平凡 $\\implies H^{1}(G, M) = 0$（有限群到无挠群没有非同态）。',
        '',
        '**为什么叫「交叉」**：$d(g_{1}g_{2}) = d(g_{1}) + g_{1}d(g_{2})$ 正是「把 $g_{1}$ 提出来时要按 $g_{1}$ 扭曲一下」的 Leibniz 公式 —— 和导子（derivation）是同一条式子，只是系数换成了模。'
      ].join('\n')
    },

    {
      id: 'def.semidirect-product',
      cluster: 'hom.group',
      type: 'definition',
      label: '半直积',
      title: '半直积 $M \\rtimes_{\\varphi} G$',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群论', '半直积', '分裂扩张'],
      refs: ['Dummit–Foote, Abstract Algebra —— 第五章「半直积」一节'],
      statement: [
        '设 $H$、$G$ 是群，$\\varphi : G \\to \\operatorname{Aut}(H)$ 是群同态。**半直积** $H \\rtimes_{\\varphi} G$ 的底层集合是 $H \\times G$，乘法取',
        '',
        '$$(h_{1}, g_{1})(h_{2}, g_{2}) := \\bigl(h_{1}\\, \\varphi(g_{1})(h_{2}),\\ g_{1} g_{2}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**为什么这样乘**：要让 $H \\times G$ 成为群、同时让 $H \\hookrightarrow H \\rtimes_{\\varphi} G$ 与 $G \\hookrightarrow H \\rtimes_{\\varphi} G$ 都是群同态，就必须允许 $G$ 在「穿过」$H$ 时把 $H$ 扭曲一次 —— 那个扭曲就是 $\\varphi(g_{1})$。',
        '',
        '**三条基本性质**：',
        '- 单位元是 $(1_{H}, 1_{G})$，逆元是 $(h, g)^{-1} = \\bigl(\\varphi(g^{-1})(h^{-1}),\\ g^{-1}\\bigr)$；',
        '- 有**分裂**的短正合列 $1 \\to H \\to H \\rtimes_{\\varphi} G \\xrightarrow{\\ \\pi\\ } G \\to 1$，截面 $g \\mapsto (1_{H}, g)$ 是一个**群同态**；',
        '- $\\varphi$ 平凡时 $H \\rtimes_{\\varphi} G = H \\times G$（直积）。',
        '',
        '⚠️ **反方向要小心**：有同态截面的短正合列 $1 \\to H \\to E \\xrightarrow{\\pi} G \\to 1$ 只告诉你 $E$ 是 $H$ 与 $G$ 的**半直积**（当 $H$ 在 $E$ 中正规时有 $E \\cong H \\rtimes_{\\varphi} G$，$\\varphi$ 由共轭给出）；但**给定 $G$-模结构后，分裂扩张在相差同构的意义下只有一个**。$H^{1}$ 分类的是**截面的选择**，不是扩张本身 —— 见「一维上同调与分裂扩张」里的警告。'
      ].join('\n')
    },

    {
      id: 'def.group-extension',
      cluster: 'hom.group',
      type: 'definition',
      label: '群扩张',
      title: '群扩张 $1 \\to A \\to E \\to G \\to 1$',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '群扩张', '正规子群'],
      refs: ['Weibel, An Introduction to Homological Algebra, Chapter 6（群扩张）'],
      statement: [
        '设 $A$ 是阿贝尔群。$A$ 被 $G$ 的**扩张**是短正合列',
        '',
        '$$1 \\longrightarrow A \\xrightarrow{\\ i\\ } E \\xrightarrow{\\ \\pi\\ } G \\longrightarrow 1 .$$',
        '',
        '于是 $i(A) \\trianglelefteq E$ 是 $E$ 的正规阿贝尔子群、$G \\cong E/i(A)$。$A$ 上的 $G$-模结构取**共轭作用**',
        '',
        '$$g \\cdot a := \\tilde g\\, a\\, \\tilde g^{-1}, \\qquad \\tilde g \\in \\pi^{-1}(g),$$',
        '',
        '它与 $\\tilde g$ 的选取无关（因为 $A$ 交换）。两个扩张**等价**，如果存在群同构 $E \\to E^{\\prime}$ 使整条三角交换。'
      ].join('\n'),
      notes: [
        '⭐ **关键点：没有截面也要有 $G$-模结构。** 扩张只给了一个正合列，根本没给 $G \\to E$ 的映射；但**共轭**照样让 $G$ 作用在 $A$ 上。所以「$A$ 是个 $G$-模」是扩张**自带**的结构，不是外面贴上去的。',
        '',
        '**良定义性**：若 $\\tilde g^{\\prime} = \\tilde g\\, i(a_{0})$，则 $\\tilde g^{\\prime} a \\tilde g^{\\prime -1} = \\tilde g a_{0} a a_{0}^{-1} \\tilde g^{-1} = \\tilde g a \\tilde g^{-1}$ —— 这一步**正好用了 $A$ 交换**。',
        '',
        '**三类扩张，分别由不同的东西管**：',
        '- **分裂的**（有群同态截面 $G \\to E$）：$E \\cong A \\rtimes_{\\varphi} G$；截面的选择由 $H^{1}(G, A)$ 管。',
        '- **一般的**：由 $H^{2}(G, A)$ 管（见「二维上同调分类群扩张」）。',
        '- **$G$ 在 $A$ 上作用平凡**：此时扩张就是「$A$ 被 $G$ 的阿贝尔扩张」，由 $\\operatorname{Ext}^{1}_{\\mathbb{Z}}(G, A)$ 分类 —— 这一档与 $H^{2}$ 在作用平凡时重合。',
        '',
        '⭐ **抽象层面的意义**：$H^{2}(G, A)$ 就是「$A$ 与 $G$ 拼成一个群」的所有拼法；$H^{1}$ 管的是「拼好之后截面还能怎么挪」。'
      ].join('\n')
    },

    {
      id: 'def.cocycle-2',
      cluster: 'hom.group',
      type: 'definition',
      label: '二维上圈与上边界',
      title: '$2$-上圈与 $2$-上边界',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '上圈', '上边界'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5（上圈与上边界）', 'Rotman, An Introduction to Homological Algebra —— 群上同调一章'],
      statement: [
        '设 $M$ 是 $G$-模（记法用加法）。**$2$-上链**是任意映射 $c : G \\times G \\to M$。它是 **$2$-上圈**，如果对一切 $g_{1}, g_{2}, g_{3} \\in G$',
        '',
        '$$g_{1} \\cdot c(g_{2}, g_{3}) + c(g_{1}, g_{2} g_{3}) = c(g_{1}, g_{2}) + c(g_{1} g_{2}, g_{3}) .$$',
        '',
        '它是 **$2$-上边界**，如果存在映射 $u : G \\to M$ 使',
        '',
        '$$c(g_{1}, g_{2}) = g_{1} \\cdot u(g_{2}) - u(g_{1} g_{2}) + u(g_{1}) .$$',
        '',
        '记全体 $2$-上圈 / $2$-上边界为 $Z^{2}(G, M) / B^{2}(G, M)$，则 $B^{2} \\subseteq Z^{2}$，且',
        '',
        '$$H^{2}(G, M) = Z^{2}(G, M) \\big/ B^{2}(G, M) .$$'
      ].join('\n'),
      notes: [
        '**这两个公式不是凭空来的**：它们就是标准上链复形在次数 $2$ 处的 $\\delta c = 0$ 与 $c = \\delta u$ 展开。三元的那一条是',
        '',
        '$$(\\delta c)(g_{1}, g_{2}, g_{3}) = g_{1} c(g_{2}, g_{3}) - c(g_{1} g_{2}, g_{3}) + c(g_{1}, g_{2} g_{3}) - c(g_{1}, g_{2}),$$',
        '',
        '置零并移项就得到上面的上圈条件；而 $B^{2} \\subseteq Z^{2}$ 只是 $\\delta^{2} \\circ \\delta^{1} = 0$。',
        '',
        '**归一化**：总可以选「$c(1, g) = c(g, 1) = 0$」的上圈来代表同一个类 —— 把截面取成 $\\sigma(1) = 1$ 就自动如此。',
        '',
        '**这两条式子的语义**（下一层的分类定理全靠它）：',
        '- **上圈条件 = 结合律**。在 $M \\times G$ 上定义 $(m_{1}, g_{1})(m_{2}, g_{2}) := (m_{1} + g_{1}m_{2} + c(g_{1},g_{2}),\\ g_{1}g_{2})$，则这个乘法满足结合律 $\\iff$ $c$ 是 $2$-上圈。',
        '- **上边界 = 换截面**。把截面从 $\\sigma$ 换成 $g \\mapsto i(u(g))\\sigma(g)$，读出来的 $2$-上圈就加上 $\\delta^{1}u$。'
      ].join('\n')
    },

    {
      id: 'thm.h2-group-extensions',
      cluster: 'hom.group',
      type: 'theorem',
      label: '二维上同调分类群扩张',
      title: '$H^{2}(G, A)$ 与群扩张的等价类一一对应',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '群扩张', '分类定理'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5（扩张与二维上同调）', 'Rotman, An Introduction to Homological Algebra —— 群上同调一章'],
      statement: [
        '设 $A$ 是 $G$-模。固定这个 $G$-模结构后，「$A$ 被 $G$ 的扩张」（即短正合列 $1 \\to A \\to E \\xrightarrow{\\pi} G \\to 1$，并带着它给出的共轭作用）的**等价类**与 $H^{2}(G, A)$ 的元素**一一对应**：',
        '',
        '- **给定扩张读上圈**：取一个集合论截面 $\\sigma : G \\to E$（$\\pi \\sigma = \\operatorname{id}$，$\\sigma(1) = 1$），令 $c(g_{1}, g_{2})$ 由',
        '',
        '$$\\sigma(g_{1})\\, \\sigma(g_{2}) = i\\bigl(c(g_{1}, g_{2})\\bigr)\\, \\sigma(g_{1} g_{2})$$',
        '',
        '确定。则 $c \\in Z^{2}(G, A)$，且它的类 $[c] \\in H^{2}(G, A)$ 与 $\\sigma$ 的选取无关（换截面只改一个上边界）。',
        '- **给定上圈造扩张**：若 $c \\in Z^{2}(G, A)$，则',
        '',
        '$$(a_{1}, g_{1})(a_{2}, g_{2}) := \\bigl(a_{1} + g_{1} a_{2} + c(g_{1}, g_{2}),\\ g_{1} g_{2}\\bigr)$$',
        '',
        '在 $A \\times G$ 上定义出一个群 $E_{c}$，并给出扩张 $1 \\to A \\to E_{c} \\to G \\to 1$。',
        '',
        '- **分裂扩张对应的类是 $0$**。'
      ].join('\n'),
      notes: [
        '⭐ **一句话**：$H^{2}(G, A)$ 就是「$A$ 与 $G$ 拼成一个群」的所有拼法，模掉同构。',
        '',
        '**为什么偏偏是 $2$ 次**：拼接的约束是**三元**的结合律，而三元条件正好是一个 $2$-上链的 $\\delta = 0$；换截面带来的「错位」是**二元**的，正好是一个 $1$-上链的 $\\delta$。所以**障碍**落在 $H^{2}$、**可调整性**落在 $H^{1}$。高次上同调对应的是更高阶的结合性障碍（$A_{\\infty}$ 结构那一套），这里不需要。',
        '',
        '**与 $\\operatorname{Ext}$ 的关系**：当 $G$ 在 $A$ 上**作用平凡**时，扩张就是阿贝尔语境里的「$A$ 被 $G$ 的扩张」，由 $\\operatorname{Ext}^{1}_{\\mathbb{Z}}(G, A)$ 分类；一般情形 $H^{2}(G, A)$ 更大 —— 它同时记录了作用不平凡的拼法。⚠️ $\\operatorname{Ext}^{1}$ 用的是**交换群**语境，$H^{2}$ 用的是**群**语境，两者不可混用。',
        '',
        '**自然性**：$G$-模的短正合列 $0 \\to A \\to A^{\\prime} \\to A^{\\prime\\prime} \\to 0$ 给出 $H^{2}$ 的长正合列 —— 于是「能否把一个 $A^{\\prime\\prime}$-扩张抬成 $A^{\\prime}$-扩张」这件事变成一次正合性判断。这是群上同调在群论里最常用的用法。',
        '',
        '⚠️ **别弄反输入输出**：分类的是「以 $A$ 为核、以 $G$ 为商」的群；$A$ 的 $G$-模结构是**输入**（由扩张自动给出），不是结论。'
      ].join('\n')
    },

    {
      id: 'thm.h1-semidirect',
      cluster: 'hom.group',
      type: 'theorem',
      label: '一维上同调与分裂扩张',
      title: '$H^{1}(G, A)$ 与半直积式的分裂结构',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '分裂扩张', '半直积'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5（分裂扩张）', 'Serre, Galois Cohomology —— 一维上同调与半直积'],
      statement: [
        '设 $A$ 是 $G$-模，$1 \\to A \\xrightarrow{i} E \\xrightarrow{\\pi} G \\to 1$ 是一个固定的扩张，并且它有**同态截面** $s : G \\to E$（即 $\\pi s = \\operatorname{id}_{G}$）。则：',
        '',
        '1. **截面与交叉同态一一对应**：全体同态截面恰是 $\\{\\, s_{d} : d \\in Z^{1}(G, A) \\,\\}$，其中',
        '',
        '$$s_{d}(g) := i\\bigl(d(g)\\bigr)\\, s(g) .$$',
        '',
        '2. **模掉 $A$-共轭之后就是 $H^{1}$**：把两个截面 $s, s^{\\prime}$ 叫 **$A$-共轭**，如果存在 $a \\in A$ 使 $s^{\\prime}(g) = i(a)^{-1} s(g) i(a)$ 对一切 $g \\in G$ 成立。则 $A$-共轭类与 $H^{1}(G, A)$ 一一对应；$s_{d}$ 的共轭类是零类，当且仅当 $d \\in B^{1}(G, A)$。',
        '',
        '3. 零类对应的正是**半直积** $A \\rtimes_{\\varphi} G$（$\\varphi$ 是给定的 $G$-模结构）的规范截面 $g \\mapsto (0, g)$ 所在的共轭类。'
      ].join('\n'),
      notes: [
        '**第 1 条为什么成立**：$s^{\\prime}(g) s(g)^{-1} \\in \\ker\\pi = i(A)$，所以它必然是 $i(d(g))$ 的形状。把 $s_{d}(g) = i(d(g)) s(g)$ 代进「$s_{d}$ 是同态」里：',
        '',
        '$$i\\bigl(d(g_{1}g_{2})\\bigr) s(g_{1}g_{2}) = i\\bigl(d(g_{1})\\bigr) s(g_{1})\\, i\\bigl(d(g_{2})\\bigr) s(g_{2}) = i\\bigl(d(g_{1}) + g_{1} d(g_{2})\\bigr) s(g_{1} g_{2}),$$',
        '',
        '中间的等号用了 $s(g_{1})\\, i(a)\\, s(g_{1})^{-1} = i(g_{1} \\cdot a)$ —— 这正是 $A$ 上 $G$-模结构的定义。两边一比就是交叉同态关系。∎',
        '',
        '**第 2 条的「共轭」是什么**：$E$ 的内自同构 $\\operatorname{Inn}(i(a))$ 保持 $i(A)$ 与 $\\pi$，所以它把扩张送到一个**等价**的扩张。它作用在截面上是',
        '',
        '$$s(g) \\longmapsto i(a)^{-1} s(g) i(a) = i\\bigl(g \\cdot a - a\\bigr)\\, s(g),$$',
        '',
        '也就是把 $d$ 换成 $d + (g \\mapsto g \\cdot a - a)$ —— 恰好加上一个**主**交叉同态。反过来任何保持 $i$ 与 $\\pi$ 的扩张同构都能写成这样的共轭，于是 $A$-共轭类恰是 $H^{1}$ 的元素。∎',
        '',
        '⚠️⚠️ **最容易误读的一条**：$H^{1}(G, A)$ **不是**「分裂扩张的同构类」。给定 $G$-模结构后，分裂扩张在相差同构的意义下**只有一个**（就是 $A \\rtimes_{\\varphi} G$）。$H^{1}$ 分类的是**截面（分裂方式）的选择**。举例最清楚：$G = A = \\mathbb{Z}/2$、作用平凡时 $H^{1} = \\operatorname{Hom}(\\mathbb{Z}/2, \\mathbb{Z}/2) = \\mathbb{Z}/2 \\ne 0$，而分裂扩张只有 $\\mathbb{Z}/2 \\times \\mathbb{Z}/2$ 一个同构类。',
        '',
        '⭐ **分工**：$H^{2}$ 管「拼得上拼不上」，$H^{1}$ 管「拼法内部还能怎么挪」。这也解释了作用的平凡化为何让 $H^{1}$ 变大而不是变小 —— 截面可以自由地在直积的两条腿上错动。'
      ].join('\n')
    },

    {
      id: 'prop.low-degree-exact',
      cluster: 'hom.group',
      type: 'proposition',
      label: '低次正合列',
      title: '低次的那几项正合列',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '群上同调', '正合列', '交叉同态'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 6.5（低次正合列）'],
      statement: [
        '设 $M$ 是 $G$-模。标准上链复形的低次项给出正合列',
        '',
        '$$0 \\longrightarrow M^{G} \\longrightarrow M \\xrightarrow{\\ \\delta^{0}\\ } Z^{1}(G, M) \\longrightarrow H^{1}(G, M) \\longrightarrow 0 ,$$',
        '',
        '其中 $(\\delta^{0} m)(g) = g m - m$，$Z^{1}(G, M)$ 是交叉同态的群。特别地：',
        '',
        '- 若 $G$ 在 $M$ 上作用**平凡**，则 $\\delta^{0} = 0$，于是 $M^{G} = M$ 且 $H^{1}(G, M) = \\operatorname{Hom}(G, M)$；',
        '- 对 $G$-模的短正合列 $0 \\to A \\to B \\to C \\to 0$，有正合列',
        '',
        '$$0 \\to A^{G} \\to B^{G} \\to C^{G} \\xrightarrow{\\ \\partial\\ } H^{1}(G, A) \\to H^{1}(G, B) \\to H^{1}(G, C).$$'
      ].join('\n'),
      notes: [
        '**第一行直接从复形读出来**：$H^{0} = \\ker\\delta^{0} = M^{G}$、$H^{1} = \\ker\\delta^{1}/\\operatorname{im}\\delta^{0} = Z^{1}/B^{1}$，而 $B^{1} = \\operatorname{im}\\delta^{0}$。把',
        '',
        '$$0 \\to \\ker\\delta^{0} \\to M \\to \\ker\\delta^{1} \\to \\ker\\delta^{1}\\big/\\operatorname{im}\\delta^{0} \\to 0$$',
        '',
        '写出来就是它 —— 三段正合各只用到定义。',
        '',
        '**「作用平凡」那句**：$\\delta^{0} m$ 是常函数 $g \\mapsto g m - m$；作用平平时恒为 $0$，于是 $B^{1} = 0$、$Z^{1} = \\operatorname{Hom}(G, M)$。',
        '',
        '**第二行是长正合列的头几项**：$0 \\to A \\to B \\to C \\to 0$ 取右导出函子（$R^{0} = (-)^{G}$、$R^{1} = H^{1}$）得到的长正合列，按定义就是这一段；连接同态 $\\partial$ 把「$C$ 的不动点」送到「$A$ 的一维上同调」。',
        '',
        '⭐ **这两条是 $H^{1}$、$H^{2}$ 有具体含义的技术源头**：第一行说明 $H^{1}$ 是「截面 / 交叉同态」的空间，第二行说明短正合列的**断点**恰好落在 $H^{1}$ 上 —— 后面两条分类定理都是在给 $Z^{1}$、$Z^{2}$ 加语义。',
        '',
        '⚠️ 别与**完整长正合列**搞混：真正接下去还有 $\\cdots \\to H^{1}(G, C) \\to H^{2}(G, A) \\to H^{2}(G, B) \\to \\cdots$，这里只把前面几项单独摘出来看。'
      ].join('\n')
    },

    /* ======================================================================
       §B 天际线层与足够多内射
       ====================================================================== */

    {
      id: 'def.skyscraper-sheaf',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: '天际线层',
      title: '天际线层 $i_{x,*}A$',
      regions: ['homology', 'category'],
      tags: ['同调代数', '层论', '天际线层', '推前'],
      refs: ['Iversen, Cohomology of Sheaves —— 层的构造一章（skyscraper sheaf）', 'Godement, Topologie algébrique et théorie des faisceaux, Chapitre II（层与 espace étalé）'],
      statement: [
        '设 $X$ 是拓扑空间、$x \\in X$、$A$ 是阿贝尔群，$i_{x} : \\{x\\} \\hookrightarrow X$ 是含入。**$x$ 处取值 $A$ 的天际线层**（skyscraper sheaf）是推前层',
        '',
        '$$i_{x,*}A : \\quad U \\;\\longmapsto\\; \\begin{cases} A, & x \\in U, \\\\ 0, & x \\notin U . \\end{cases}$$',
        '',
        '限制映射：$x \\in U \\subseteq V$ 时是 $\\mathrm{id}_{A}$，其余情形是零映射。等价地，$i_{x,*}A$ 是把 $A$ **架在单点** $x$ 上、别处一点也不留的层。'
      ].join('\n'),
      notes: [
        '⭐ **形状**：一根柱子上顶着一个群 —— 所以叫「天际线」。它是最简单的**非平凡**层：只有一层有内容。',
        '',
        '**两条结构性质**：',
        '- $i_{x,*}$ 是**推前**，与 $i_{x}^{-1}$（在单点情形就是取茎）构成伴随 $i_{x}^{-1} \\dashv i_{x,*}$；',
        '- $i_{x,*}$ 正合且忠实：$\\{x\\}$ 上只有两个开集 $\\{x\\}$ 与 $\\emptyset$，没有正合性可以坏。',
        '',
        '**用处**：天际线层是**造内射层**的原料 —— 「层范畴有足够多内射对象」的标准证明就是「把每一根茎用内射群撑起来，再取直积」，见「足够多内射层」。',
        '',
        '⚠️ 别与「茎为常值的层」弄混：天际线层在 $x$ 处的茎是 $A$，在别的点处一般**不是** $A$ —— 在 $T_{1}$ 空间上除 $x$ 之外全是 $0$，在更一般的空间上支撑是闭包 $\\overline{\\{x\\}}$。见「天际线层的茎」。'
      ].join('\n')
    },

    {
      id: 'prop.skyscraper-stalks',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '天际线层的茎',
      title: '天际线层在各点的茎',
      regions: ['homology', 'category'],
      tags: ['同调代数', '层论', '天际线层', '茎'],
      refs: ['Iversen, Cohomology of Sheaves —— 茎与 skyscraper sheaf 一章'],
      statement: [
        '设 $X$ 是拓扑空间、$x \\in X$、$A$ 是阿贝尔群。则天际线层 $i_{x,*}A$ 在 $y \\in X$ 处的茎是',
        '',
        '$$(i_{x,*}A)_{y} \\;=\\; \\begin{cases} A, & y \\in \\overline{\\{x\\}}, \\\\ 0, & y \\notin \\overline{\\{x\\}} . \\end{cases}$$',
        '',
        '特别地 $(i_{x,*}A)_{x} = A$；若 $X$ 是 $T_{1}$ 空间（Hausdorff 就够），则 $y \\ne x$ 时 $(i_{x,*}A)_{y} = 0$。'
      ].join('\n'),
      notes: [
        '**证明。** 茎是沿 $y$ 的开邻域取滤过余极限：',
        '',
        '$$(i_{x,*}A)_{y} = \\varinjlim_{U \\ni y}\\ (i_{x,*}A)(U) .$$',
        '',
        '- 若 $y \\in \\overline{\\{x\\}}$：每个开邻域 $U \\ni y$ 都含 $x$（这是闭包的刻画），于是系统里每一项都是 $A$、每个过渡映射都是 $\\mathrm{id}_{A}$ —— 余极限是 $A$。',
        '- 若 $y \\notin \\overline{\\{x\\}}$：存在开邻域 $U_{0} \\ni y$ 不含 $x$。取各项都落在 $U_{0}$ 内的那个**共尾**子系统，其中每一项都是 $0$ —— 余极限是 $0$。∎',
        '',
        '**推论（$T_{1}$ 情形）**：$X$ 是 $T_{1}$ $\\iff$ 单点集闭 $\\iff$ $\\overline{\\{x\\}} = \\{x\\}$，于是天际线层的茎只在 $x$ 处非零 —— 这时「$A$ 架在一个点上」是字面意义上的。',
        '',
        '⚠️ 一般拓扑空间（比如带特化关系的谱空间）上，天际线层的**支撑**是闭包 $\\overline{\\{x\\}}$ 而不是 $\\{x\\}$。把天际线层搬到概形、adic 空间上时这一步要重新看。'
      ].join('\n')
    },

    {
      id: 'prop.skyscraper-injective',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '天际线层是内射层',
      title: '系数内射则天际线层内射',
      regions: ['homology', 'category'],
      tags: ['同调代数', '层论', '天际线层', '内射对象'],
      refs: ['Iversen, Cohomology of Sheaves —— 内射层与 skyscraper sheaf 一章'],
      statement: [
        '设 $X$ 是拓扑空间、$x \\in X$、$A$ 是阿贝尔群。若 $A$ 在 $\\mathbf{Ab}$ 中是**内射对象**（即 $A$ 是可除群），则天际线层 $i_{x,*}A$ 在阿贝尔层范畴 $\\mathbf{Ab}(X)$ 中是**内射对象**。',
        '',
        '反过来，若 $i_{x,*}A$ 在 $\\mathbf{Ab}(X)$ 中内射，则 $A$ 在 $\\mathbf{Ab}$ 中内射。'
      ].join('\n'),
      notes: [
        '**证明（把内射性搬到茎上）。** 关键是一个自然同构：对任意层 $\\mathcal{F}$，',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{Ab}(X)}\\bigl(\\mathcal{F},\\ i_{x,*}A\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Ab}}\\bigl(\\mathcal{F}_{x},\\ A\\bigr),$$',
        '',
        '它来自伴随 $i_{x}^{-1} \\dashv i_{x,*}$ 与「$i_{x}^{-1}\\mathcal{F} = \\mathcal{F}_{x}$」。',
        '',
        '内射性要检验的是：对每个层的单射 $\\mathcal{G} \\rightarrowtail \\mathcal{H}$，$\\operatorname{Hom}(\\mathcal{H}, i_{x,*}A) \\to \\operatorname{Hom}(\\mathcal{G}, i_{x,*}A)$ 满。用上面的同构，这等价于',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{Ab}}(\\mathcal{H}_{x},\\ A) \\longrightarrow \\operatorname{Hom}_{\\mathbf{Ab}}(\\mathcal{G}_{x},\\ A)$$',
        '',
        '满。而取茎是滤过余极限、**正合**，故 $\\mathcal{G}_{x} \\rightarrowtail \\mathcal{H}_{x}$ 是阿贝尔群的单射；$A$ 内射于是上式满。∎',
        '',
        '**反过来**：设 $B \\rightarrowtail C$ 是 $\\mathbf{Ab}$ 中的单射、并给了 $B \\to A$。$i_{x,*}$ 正合，故 $i_{x,*}B \\rightarrowtail i_{x,*}C$ 是层的单射；$i_{x,*}A$ 内射于是 $\\operatorname{Hom}(i_{x,*}C, i_{x,*}A) \\to \\operatorname{Hom}(i_{x,*}B, i_{x,*}A)$ 满，而过同一个伴随同构它就是把 $\\operatorname{Hom}(C, A) \\to \\operatorname{Hom}(B, A)$ 抬上去的那条 —— 故后者满，$A$ 内射。∎',
        '',
        '**为什么必须 $A$ 可除**：$\\mathbf{Ab}$ 里内射 $=$ 可除。$A = \\mathbb{Z}$ 时天际线层**不是**内射层（$\\mathbb{Z} \\rightarrowtail \\mathbb{Q}$ 这一步提升不上去），所以造内射层必须先用内射包把每根茎撑大。'
      ].join('\n')
    },

    {
      id: 'thm.pushforward-enough-injectives',
      cluster: 'hom.sheafcoh',
      type: 'theorem',
      label: '足够多内射层',
      title: '阿贝尔层范畴有足够多内射对象',
      regions: ['homology', 'category'],
      tags: ['同调代数', '层论', '内射对象', '层上同调'],
      refs: ['Iversen, Cohomology of Sheaves —— 内射层一章', 'Godement, Topologie algébrique et théorie des faisceaux, Chapitre II（软层与内射层）'],
      statement: [
        '设 $X$ 是拓扑空间。则阿贝尔层范畴 $\\mathbf{Ab}(X)$ **有足够多内射对象**：对每个 $\\mathcal{F} \\in \\mathbf{Ab}(X)$，把每根茎嵌进它在 $\\mathbf{Ab}$ 里的内射包 $\\mathcal{F}_{x} \\rightarrowtail I_{x}$，则自然映射',
        '',
        '$$\\mathcal{F} \\longrightarrow \\prod_{x \\in X} i_{x,*}\\, I_{x}$$',
        '',
        '是**单射**，且目标是**内射层**。于是：',
        '',
        '1. 每个层都有内射消解，且可取**下有界**的；',
        '2. 截面函子 $\\Gamma(X, -)$ 与任意连续映射 $f$ 的推前 $f_{*}$ 的右导出函子 $R^{q}\\Gamma$、$R^{q}f_{*}$ 对下有界复形有定义，且与内射消解的选取无关；',
        '3. $f_{*}$ 把内射层送到内射层（$f^{-1}$ 正合、$f^{-1} \\dashv f_{*}$），所以「$f_{*}$ 这一侧的内射类」也够用来算 $Rf_{*}$。'
      ].join('\n'),
      notes: [
        '**证明：单性。** 层的映射是单射 $\\iff$ 在每个开集上取截面后是单射。取 $U$ 开、$s \\in \\mathcal{F}(U)$；它在第 $x$ 个分量（$x \\in U$ 时）的像是 $s$ 的茎 $s_{x} \\in \\mathcal{F}_{x} \\rightarrowtail I_{x}$（$x \\notin U$ 时分量落进 $0$）。若 $s \\ne 0$，则存在 $x \\in U$ 使 $s_{x} \\ne 0$（**层由它的全部茎决定**），于是某个分量非零。故 $\\mathcal{F} \\to \\prod_{x} i_{x,*}I_{x}$ 单。∎',
        '',
        '**证明：目标是内射的。** 要 $\\operatorname{Hom}_{\\mathbf{Ab}(X)}(-, \\prod_{x} i_{x,*}I_{x})$ 正合。$\\operatorname{Hom}$ 与直积在**第二个**变量上都保极限，所以只需逐 $x$ 检验 $i_{x,*}I_{x}$：由伴随与「$i_{x}^{-1} = $ 取茎」，',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{Ab}(X)}\\bigl(\\mathcal{F},\\ i_{x,*}I_{x}\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Ab}}\\bigl(\\mathcal{F}_{x},\\ I_{x}\\bigr),$$',
        '',
        '而 $\\mathcal{F} \\mapsto \\mathcal{F}_{x}$ 正合、$I_{x}$ 内射，故右端关于 $\\mathcal{F}$ 正合 —— 每个 $i_{x,*}I_{x}$ 内射，它们的直积也内射（逐点论证对直积一字不改地成立）。∎',
        '',
        '⭐ **为什么这使层上同调的定义「合法」**：定义 $H^{n}(X, \\mathcal{F}) := R^{n}\\Gamma(X, \\mathcal{F})$ 必须先有内射消解。没有足够多内射，消解根本不存在，$R^{n}\\Gamma$ 无从定义。有了上面两条，每个 $\\mathcal{F}$ 都有内射消解；再由**比较定理**（两个内射消解之间的映射在同伦意义下唯一），$H^{n}$ 与消解的选取无关 —— 层上同调这才成为一个**定义良好的函子**。同一句话对 $R^{n}f_{*}$ 成立。',
        '',
        '⭐ **论证的形状值得记住**：它只用了「茎」和「直积」两样东西，所以对任何「点足够多」的景都成立：在拓扑空间、拓扑斯的阿贝尔层范畴里，**内射性可以逐点检验**。这也是「层上同调可以从茎一层层读出来」的最朴素来源。',
        '',
        '⚠️ $I_{x}$ 的选取要用到 $\\mathbf{Ab}$ 有足够多内射（$\\mathbb{Q}/\\mathbb{Z}$ 的直积给出内射包）—— 那是 $\\mathbf{Ab}$ 的 Baer 判据，不在这一条里重做。'
      ].join('\n')
    },

    /* ======================================================================
       §C 仿紧的 Čech
       ====================================================================== */

    {
      id: 'thm.paracompact-cech-equals-sheaf',
      cluster: 'hom.sheafcoh',
      type: 'theorem',
      label: '仿紧空间上的 Čech 就是上同调',
      title: '仿紧 Hausdorff：Čech 上同调等于层上同调',
      regions: ['homology', 'topology'],
      tags: ['同调代数', '层论', 'Čech 上同调', '仿紧', '单位分解'],
      refs: ['Godement, Topologie algébrique et théorie des faisceaux —— 仿紧空间上的软层与 Čech 上同调', 'Iversen, Cohomology of Sheaves —— Čech 上同调与层上同调的比较'],
      statement: [
        '设 $X$ 是**仿紧 Hausdorff** 空间（仿紧性的定义与等价刻画见拓扑那一团的 `def.paracompact`）。则对任意阿贝尔层 $\\mathcal{M}$ 与任意 $n \\ge 0$，',
        '',
        '$$\\check{H}^{n}(X, \\mathcal{M}) \\;\\cong\\; H^{n}(X, \\mathcal{M}) .$$',
        '',
        '更强的形式：对每个**局部有限**的开覆盖 $\\mathfrak{U}$，规范映射 $\\check{H}^{n}(\\mathfrak{U}, \\mathcal{M}) \\to H^{n}(X, \\mathcal{M})$ 已经是同构；一般覆盖先取局部有限的开细化。'
      ].join('\n'),
      notes: [
        '**标准证明的三个零件。**',
        '',
        '**① Čech 层复形是消解。** 对覆盖 $\\mathfrak{U} = (U_{i})_{i}$ 令',
        '',
        '$$\\check{\\mathcal{C}}^{p}(\\mathfrak{U}, \\mathcal{M}) := \\prod_{i_{0} < \\cdots < i_{p}} j_{*}\\bigl(\\mathcal{M}|_{U_{i_{0} \\cdots i_{p}}}\\bigr),$$',
        '',
        '其中 $j : U_{i_{0} \\cdots i_{p}} \\hookrightarrow X$ 是含入。$\\mathcal{M}$ 是层，故 Čech 正合性可逐点验证；于是 $\\check{\\mathcal{C}}^{\\bullet}(\\mathfrak{U}, \\mathcal{M})$ 是 $\\mathcal{M}$ 的一个消解，且取整体截面就回到 $\\check{C}^{\\bullet}(\\mathfrak{U}, \\mathcal{M})$。',
        '',
        '**② 每一项是软的。** 仿紧 Hausdorff 上，局部有限覆盖配**单位分解**（见 `prop.paracompact-partition-unity`）：单位分解可以把 $j_{*}(\\mathcal{M}|_{U})$ 型的层按覆盖成员劈开，于是 $\\check{\\mathcal{C}}^{p}$ 是**细的**（fine，带从属于 $\\mathfrak{U}$ 的分割）；细层在仿紧空间上**软**，而软层对 $\\Gamma$ **无环**（软层可以「局部化到闭集」，再用单位分解把整体截面拼出来）。',
        '',
        '**③ 无环消解算导出函子。** 由 ① ②，$\\check{\\mathcal{C}}^{\\bullet}$ 是一个由 $\\Gamma$-无环层组成的消解；由 Leray 零调性（零调消解算右导出函子），',
        '',
        '$$H^{n}(X, \\mathcal{M}) = H^{n}\\bigl(\\Gamma(X, \\check{\\mathcal{C}}^{\\bullet})\\bigr) = \\check{H}^{n}(\\mathfrak{U}, \\mathcal{M}) .$$',
        '',
        '再沿覆盖取余极限（Čech 上同调按定义就是沿覆盖的滤过余极限）得到一般结论。∎',
        '',
        '⭐ **与「紧 Hausdorff」那条的关系**：紧 Hausdorff 必仿紧，所以这一条把 `prop.chaus-cech-eq-h` 覆盖在内；但两条的**证明**完全不同 —— 紧性用的路子是「有限覆盖在滤过系统里共尾 + 有限直积可由可表对象控制」，仿紧性用的是「局部有限 + 单位分解给出的软性」。同一个结论，两套互不依赖的机制。',
        '',
        '⚠️ **仿紧这个条件不能去掉**：在一般（甚至紧生成）的空间上，Čech 上同调与层上同调可以不同。「Čech 就是层上同调」是拓扑 / 层论里最常被无条件引用的一句话 —— 引用时一定要带上空间条件。',
        '',
        '📌 这一条是**深层定理**，上面给的是标准论证的骨架（三个零件各自都是完整的陈述）；逐步细节见 Godement 的原始处理。'
      ].join('\n')
    },

    /* ======================================================================
       §D 谱序列的另一条路：正合偶
       ====================================================================== */

    {
      id: 'def.exact-couple',
      cluster: 'hom.spectral',
      type: 'definition',
      label: '正合偶',
      title: '正合偶',
      regions: ['homology'],
      tags: ['同调代数', '谱序列', '正合偶', '导出偶'],
      refs: ['Weibel, An Introduction to Homological Algebra, Chapter 5（正合偶）', 'Cartan–Eilenberg, Homological Algebra —— 谱序列与正合偶一章'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$D = \\bigoplus D^{p,q}$、$E = \\bigoplus E^{p,q}$ 是双分次对象。一个**正合偶**是三元组 $(D, E, i, j, k)$，由下面的「三角形」组成：',
        '',
        '$$D \\xrightarrow{\\ i\\ } D \\xrightarrow{\\ j\\ } E \\xrightarrow{\\ k\\ } D ,$$',
        '',
        '其中 $i, j, k$ 是双齐次态射，且在每个位置都正合：',
        '',
        '$$\\ker i = \\operatorname{im} k, \\qquad \\ker j = \\operatorname{im} i, \\qquad \\ker k = \\operatorname{im} j .$$',
        '',
        '此时 $d := j \\circ k : E \\to E$ 满足 $d^{2} = j (k j) k = 0$（因为 $kj = 0$ 由正合性给出）。**导出偶**是 $(D^{\\prime}, E^{\\prime}, i^{\\prime}, j^{\\prime}, k^{\\prime})$，其中',
        '',
        '$$D^{\\prime} := \\operatorname{im} i, \\qquad E^{\\prime} := H(E, d) = \\ker d \\big/ \\operatorname{im} d ,$$',
        '',
        '$$i^{\\prime} := i|_{D^{\\prime}}, \\qquad j^{\\prime}\\bigl(i(x)\\bigr) := \\bigl[\\,j(x)\\,\\bigr], \\qquad k^{\\prime}\\bigl([e]\\bigr) := k(e),$$',
        '',
        '方括号 $[\\,\\cdot\\,]$ 表示在 $H(E, d)$ 中的类。'
      ].join('\n'),
      notes: [
        '**三条良定义性的检验**（这是「导出偶仍是正合偶」的全部难点）：',
        '- $j^{\\prime}$：若 $i(x) = i(x^{\\prime})$，则 $x - x^{\\prime} \\in \\ker i = \\operatorname{im} k$，于是 $j(x - x^{\\prime}) \\in j(\\operatorname{im} k) = 0$（因为 $kj = 0$）—— 与代表元无关。又 $j(x)$ 是 $d$-闭上链：$d\\, j(x) = j k j(x) = 0$。',
        '- $k^{\\prime}$：若 $e \\in \\ker d$（即 $j k e = 0$），则 $k e \\in \\ker j = \\operatorname{im} i = D^{\\prime}$，故 $k^{\\prime}$ 落在 $D^{\\prime}$ 里；若 $e \\in \\operatorname{im} d$（即 $e = j k(e_{0})$），则 $k e = k j k(e_{0}) = 0$ —— 与代表元无关。',
        '- $i^{\\prime}$：$i(D^{\\prime}) = i^{2}(D) \\subseteq i(D) = D^{\\prime}$。',
        '',
        '再验一遍三处正合即得导出偶又是正合偶。于是可以**无穷递推**：$E_{1} := E$、$E_{r+1} := H(E_{r}, d_{r})$。这正是谱序列的「一页一页算」。',
        '',
        '**双次数。** 最常用的情形来自**过滤复形**：$i$ 的双次数是 $(-1, 1)$、$j$ 是 $(0, 0)$、$k$ 是 $(1, 0)$。导出一次之后 $j$ 的双次数变成 $(1, -1)$ —— 因为 $j^{\\prime}$ 作用在 $i(x)$ 上、读出的却是 $j(x)$，而 $i$ 已经先把次数挪了一步。$i$、$k$ 在导出时不变。归纳得：$j_{r}$ 的双次数是 $(r - 1,\\ 1 - r)$，于是 $d_{r} = j_{r} k_{r}$ 的双次数是 $(r,\\ 1 - r)$。',
        '',
        '⭐ **为什么需要它**：直接构造谱序列要求先有一个**过滤**。正合偶把这层依赖剥掉了 —— 只要有一个三角形的正合结构，就能烧出一台谱序列。Bockstein、同伦群、Gysin 那类谱序列都只有这条路可走。'
      ].join('\n')
    },

    {
      id: 'thm.exact-couple-spectral',
      cluster: 'hom.spectral',
      type: 'theorem',
      label: '正合偶给出谱序列',
      title: '正合偶给出谱序列',
      regions: ['homology'],
      tags: ['同调代数', '谱序列', '正合偶', '收敛'],
      refs: ['Weibel, An Introduction to Homological Algebra, Chapter 5（正合偶给出谱序列）'],
      statement: [
        '设 $(D, E, i, j, k)$ 是双分次正合偶，$i, j, k$ 的双次数分别是 $(-1, 1)$、$(0, 0)$、$(1, 0)$。令 $E_{1} := E$，并递推地取导出偶：$E_{r+1} := H(E_{r}, d_{r})$、$d_{r} := j_{r} k_{r}$。则：',
        '',
        '1. $(E_{r}, d_{r})_{r \\ge 1}$ 是一个**谱序列**，微分满足',
        '',
        '$$d_{r} : E_{r}^{p,q} \\longrightarrow E_{r}^{p+r,\\ q-r+1} , \\qquad E_{r+1} = H(E_{r}, d_{r}) ;$$',
        '',
        '2. 若对每个 $(p, q)$，$D_{r}^{p,q}$ 与 $E_{r}^{p,q}$ 在 $r \\gg 0$ 时**稳定**（过滤有界的情形自动如此），则记 $D_{\\infty}^{p,q} := \\bigcap_{r} D_{r}^{p,q}$，有',
        '',
        '$$E_{\\infty}^{p,q} \\;\\cong\\; D_{\\infty}^{p,q} \\big/ D_{\\infty}^{p+1,\\, q-1} ,$$',
        '',
        '即「$E_{\\infty}$ 是极限偶 $D_{\\infty}$ 的关联分次」。'
      ].join('\n'),
      notes: [
        '**证明就是「递推 + 读双次数」。**',
        '',
        '- **谱序列结构**：导出偶仍是正合偶（三条良定义性），所以能一路递推下去；而 $E_{r+1} = H(E_{r}, d_{r})$ 按构造成立。',
        '- **微分的双次数**：$i_{r}$ 恒为 $(-1, 1)$、$k_{r}$ 恒为 $(1, 0)$（导出时不改），而 $j_{r}$ 每导出一次多一个 $(1, -1)$。故 $j_{r}$ 的双次数是 $(r - 1,\\ 1 - r)$，乘上 $k_{r}$ 得',
        '',
        '$$d_{r} = j_{r} k_{r} : \\quad (p, q) \\longmapsto \\bigl(p + r,\\ q - (r - 1)\\bigr) .$$',
        '',
        '- **极限项**：$D_{r+1} = i_{r}(D_{r}) \\subseteq D_{r}$ 是**递降**的，其交 $D_{\\infty}$ 就是「极限项」；$i$ 的像已被取尽、$k$ 的像已被除掉，剩下正好是 $j$ 那一步的商，于是 $E_{\\infty}^{p,q} = D_{\\infty}^{p,q} / D_{\\infty}^{p+1, q-1}$。∎',
        '',
        '⭐ **读法**：谱序列的「一页一页算」在正合偶语言里就是「把偶导出一次」。$D$ 是「已经知道的东西」，$E$ 是「这一页的商」，$i$ 是「忘掉一层」，$j$ 是「取商」，$k$ 是「连接同态」。',
        '',
        '⚠️ **双次数不是唯一的**：这里固定了过滤复形那一套 $(-1,1)/(0,0)/(1,0)$。换成同调记法就是 $(1,-1)/(0,0)/(1,0)$，两套的微分落点差一格，换算时只差一个指标平移。',
        '',
        '⚠️ **收敛不是免费的**：稳定条件必须验。正合偶本身只保证「页与页的关系」，不保证 $E_{\\infty}$ 一定等于什么东西的关联分次 —— 无界情形能出反例。'
      ].join('\n')
    },

    {
      id: 'prop.filtered-complex-exact-couple',
      cluster: 'hom.spectral',
      type: 'proposition',
      label: '过滤复形给出正合偶',
      title: '过滤复形给出正合偶，从而给出谱序列',
      regions: ['homology'],
      tags: ['同调代数', '谱序列', '过滤复形', '正合偶', '连接同态'],
      refs: ['Weibel, An Introduction to Homological Algebra, Section 5.4（过滤复形的谱序列）', 'Cartan–Eilenberg, Homological Algebra —— 过滤复形与谱序列一章'],
      statement: [
        '设 $K$ 是带**递降过滤** $F^{p}K$ 的复形（$d$ 保过滤，即 $d(F^{p}K^{n}) \\subseteq F^{p}K^{n+1}$）。对每个 $p$ 有复形的短正合列',
        '',
        '$$0 \\longrightarrow F^{p+1}K \\longrightarrow F^{p}K \\longrightarrow \\operatorname{Gr}^{p}K \\longrightarrow 0 .$$',
        '',
        '把它们的**长正合列**在一切 $p$ 上并排，得到正合偶',
        '',
        '$$D_{1}^{p,q} := H^{p+q}\\bigl(F^{p}K\\bigr), \\qquad E_{1}^{p,q} := H^{p+q}\\bigl(\\operatorname{Gr}^{p}K\\bigr),$$',
        '',
        '其中 $i$ 由含入 $F^{p+1}K \\hookrightarrow F^{p}K$ 诱导、$j$ 由商映射诱导、$k$ 是长正合列的**连接同态**。它给出的谱序列满足',
        '',
        '$$E_{r}^{p,q} = Z_{r}^{p,q} \\big/ B_{r}^{p,q}, \\qquad Z_{r}^{p,q} := F^{p}K^{p+q} \\cap d^{-1}\\bigl(F^{p+r}K^{p+q+1}\\bigr), \\qquad B_{r}^{p,q} := F^{p}K^{p+q} \\cap d\\bigl(F^{p-r+1}K^{p+q-1}\\bigr),$$',
        '',
        '即**与直接构造给出同一个谱序列**；过滤下有界时收敛到 $E_{\\infty}^{p,q} = \\operatorname{Gr}^{p} H^{p+q}(K)$。'
      ].join('\n'),
      notes: [
        '**这一条是把两条路焊在一起的螺丝。**',
        '',
        '- **一条路**（图上已有）：直接对过滤复形定义 $Z^{p,q}_{r}$、$B^{p,q}_{r}$，验证 $E_{r+1} = H(E_{r}, d_{r})$、收敛到 $\\operatorname{Gr}^{p}H^{p+q}$ —— 见 `thm.filtered-complex-spectral`。',
        '- **另一条路**（这一条）：把长正合列的「三项正合」打包成正合偶，让正合偶的导出机制自动生成谱序列 —— 见 `thm.exact-couple-spectral`。',
        '',
        '**两条路为什么是同一个。**',
        '',
        '① **第一页相同**：两边都是 $E_{1}^{p,q} = H^{p+q}(\\operatorname{Gr}^{p}K)$。',
        '',
        '② **第一微分相同**：导出偶的 $d_{1} = j k$ 是',
        '',
        '$$H^{p+q}\\bigl(\\operatorname{Gr}^{p}K\\bigr) \\xrightarrow{\\ k\\ } H^{p+q+1}\\bigl(F^{p+1}K\\bigr) \\xrightarrow{\\ j\\ } H^{p+q+1}\\bigl(\\operatorname{Gr}^{p+1}K\\bigr),$$',
        '',
        '即「连接同态 + 落到关联分次」，这正是直接构造里 $\\operatorname{Gr}^{p} \\to \\operatorname{Gr}^{p+1}$ 的那个微分，其落点 $(p+1, q)$ 与 $d_{r}$ 的规律 $(r, 1-r)$ 在 $r = 1$ 时吻合。',
        '',
        '③ **逐叶归纳**：把 $D_{r}$、$E_{r}$ 用 $Z_{r}/B_{r}$ 显式写出（$D_{r}^{p,q}$ 是「$F^{p}$ 里 $d$ 至少跳 $r$ 步仍留在 $F^{p+r-1}$ 内的那些类」），代入导出偶的三条公式，得到的就是上面的 $Z_{r}^{p,q}$、$B_{r}^{p,q}$。归纳步只用到 $d^{2} = 0$ 与核 / 余核的泛性质，没有额外输入。∎',
        '',
        '⭐ **实用价值**：想算某个谱序列时，挑好算的那条路走。**双复形**的情形通常用直接构造（两个方向的过滤各给一台，比较 $E_{2}$ 页即可，见 `prop.bicomplex-spectral`）；而**一般正合偶**（同伦群、Bockstein、Gysin 那类）只有正合偶这条路 —— 那里根本没有一个复形可以过滤。',
        '',
        '⚠️ 收敛仍要**下有界**（或至少「对每个 $(p,q)$，$r$ 充分大时 $Z_{r}$、$B_{r}$ 稳定」）。无界复形的谱序列可以「不收敛到任何东西」，别默认那个符号一定成立。'
      ].join('\n')
    },

    /* ======================================================================
       §E étale 层
       ====================================================================== */

    {
      id: 'def.etale-space',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: 'étale 空间',
      title: 'étale 空间（espace étalé）',
      regions: ['homology', 'topology'],
      tags: ['同调代数', '层论', 'étale 空间', '局部同胚'],
      refs: ['Godement, Topologie algébrique et théorie des faisceaux, Chapitre II（层与 espace étalé）', 'Iversen, Cohomology of Sheaves —— étale 空间与层的等价'],
      statement: [
        '设 $X$ 是拓扑空间。连续映射 $p : E \\to X$ 叫 **étale 映射**（局部同胚），如果每个 $e \\in E$ 都有开邻域 $V \\ni e$ 使得 $p(V)$ 是 $X$ 中的开集、且 $p|_{V} : V \\to p(V)$ 是同胚。此时 $(E, p)$ 叫 $X$ 上的一个 **étale 空间**（espace étalé）。'
      ].join('\n'),
      notes: [
        '**三条立刻要记住的**：',
        '- **纤维是离散的**：$p$ 局部同胚 $\\implies$ 每个 $p^{-1}(x)$ 在 $E$ 中离散（同时也是闭的）。',
        '- **开浸入是 étale 映射**：取 $V = E$ 就够。',
        '- **截面的连续性可以省**：$p$ 局部同胚时，满足 $p \\circ s = \\mathrm{id}_{U}$ 的映射 $s : U \\to E$ **自动连续**，于是「$U$ 上的截面」就是纯集合论的 $s$。',
        '',
        '⭐ **与层的等价**：$X$ 上的层与 $X$ 上的 étale 空间构成范畴等价，函子由',
        '',
        '$$\\mathcal{F} \\longmapsto \\Bigl(\\coprod_{x \\in X} \\mathcal{F}_{x} \\longrightarrow X\\Bigr)$$',
        '',
        '给出：右边带「茎的拓扑」—— 每对 $(U, s)$（$U$ 开、$s \\in \\mathcal{F}(U)$）贡献开集 $\\{\\, s_{x} : x \\in U \\,\\}$。这就是「层 = 局部同构地摊在底空间上的时空」的精确意思，也解释了为什么「推出层 / 推出开集」这类操作在 étale 空间上变成「把纤维拼起来」。',
        '',
        '⚠️ **名词的坑**：这里说的是拓扑空间上的**局部同胚**（法文 espace étalé）。代数几何里的 **étale 映射**是另一回事（局部有限展示 + 平坦 + 无分歧），见「étale 层」。两者共用名字 —— Grothendieck 是有意为之，因为概形的 étale 映射确实是「局部同构 + 有限覆叠」的代数替身 —— 但**不能互换**：局部同胚的纤维是离散的任意集合，étale 概形态射的纤维是一般离散的**有限**概形。'
      ].join('\n')
    },

    {
      id: 'def.etale-sheaf',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: 'étale 层',
      title: '$X_{\\text{et}}$ 上的 étale 层',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '层论', 'étale 拓扑', 'étale 层'],
      refs: ['Milne, Étale Cohomology —— étale 拓扑与 étale 层', 'Stacks Project —— Étale Cohomology 一章（étale 拓扑的定义）'],
      statement: [
        '设 $X$ 是概形。记 $X_{\\text{et}}$ 为 $X$ 的**小 étale site**：对象是 étale 映射 $U \\to X$（通常限制到**仿射的、局部有限展示的**那些，以保证范畴本质小），态射是 $X$-态射，**覆盖**是联合满射的 étale 族 $\\{U_{i} \\to U\\}$。$X_{\\text{et}}$ 上的**预层**是反变函子',
        '',
        '$$\\mathcal{F} : \\bigl(X_{\\text{et}}\\bigr)^{\\mathrm{op}} \\longrightarrow \\mathbf{Ab} .$$',
        '',
        '它是 **étale 层**，如果对每个 étale 覆盖 $\\{U_{i} \\to U\\}$ 都有序列正合：',
        '',
        '$$0 \\longrightarrow \\mathcal{F}(U) \\longrightarrow \\prod_{i} \\mathcal{F}(U_{i}) \\longrightarrow \\prod_{i,j} \\mathcal{F}\\bigl(U_{i} \\times_{U} U_{j}\\bigr).$$',
        '',
        'étale 层的范畴记作 $\\mathbf{Sh}(X_{\\text{et}}, \\mathbf{Ab})$。'
      ].join('\n'),
      notes: [
        '**「étale」这个名字在两处的关系**：概形的 étale 映射是**同时**满足下列三条的态射：',
        '- 局部有限展示；',
        '- **平坦**；',
        '- **无分歧**（unramified，即 $\\Omega^{1}_{U/X} = 0$）。',
        '',
        '这三条正是拓扑里「局部同胚」的代数替身，但它额外允许**有限覆叠**（例如 $\\operatorname{Spec}\\mathbb{C} \\to \\operatorname{Spec}\\mathbb{R}$：两点盖一点）。',
        '',
        '**为什么必须换拓扑**：Zariski 拓扑太粗 —— 它在 $\\operatorname{Spec} k(t)$ 上看不见 $k$ 的 Galois 覆叠。换成 étale 拓扑之后，$\\mathbb{Z}/n$ 这样的系数才看得见几何（Galois 群、Kummer 序列、Weil 猜想那一整套都在这一步之后才有意义）。',
        '',
        '⭐ **Zariski 覆盖是 étale 覆盖**（开浸入是 étale 的，且开覆盖当然联合满射）。于是拓扑「变细」、层「变少」：',
        '',
        '$$\\mathbf{Sh}(X_{\\text{et}}, \\mathbf{Ab}) \\longrightarrow \\mathbf{Sh}(X_{\\mathrm{Zar}}, \\mathbf{Ab})$$',
        '',
        '是「忘掉 étale 结构」，**不是**等价。一句话：étale 层一定是 Zariski 层，反之不然。',
        '',
        '⚠️ **技术条件不省**：「小 étale site」要能成为集合（而非真类），故通常取「仿射的、局部有限展示的 étale $X$-概形」这套对象；不同文献取法略异，但给出的拓扑斯相同。这里不纠结这一点。',
        '',
        '📌 本图只到「étale 层是什么」这一层。要做 étale 上同调还需要：$\\mathbf{Sh}(X_{\\text{et}}, \\mathbf{Ab})$ 是 Grothendieck 范畴、它上面有足够多内射（同样靠「点足够多」的论证，点取几何点）、以及 $f_{*}$、$R^{n}f_{*}$ 的长正合列相容性 —— 那是另一整套装置。'
      ].join('\n')
    },

    {
      id: 'prop.etale-sheaf-examples',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: 'étale 层的例子',
      title: '开浸入、有限 étale 覆叠、常值层',
      regions: ['homology', 'algebra'],
      tags: ['同调代数', '层论', 'étale 层', '有限 étale 覆叠'],
      refs: ['Milne, Étale Cohomology —— étale 拓扑与有限 étale 覆叠', 'Stacks Project —— Étale Cohomology 一章（étale 层的例子）'],
      statement: [
        '设 $X$ 是概形。',
        '',
        '1. **开浸入**：开浸入 $j : U \\to X$ 是 étale 映射，故 $U$ 是 $X_{\\text{et}}$ 的一个对象；每个开覆盖都是 étale 覆盖，于是**每个 étale 层都是 Zariski 层**。反过来不成立。',
        '',
        '2. **有限 étale 覆叠**：若 $Y \\to X$ 有限、平坦、无分歧（即「有限 étale」），则它在 étale 拓扑下是覆盖，而且',
        '',
        '$$\\mathcal{G}_{Y}(U) := \\operatorname{Hom}_{X}\\bigl(U,\\ Y\\bigr)$$',
        '',
        '是 $X_{\\text{et}}$ 上的层 —— 这是「常值层」的正确推广。',
        '',
        '3. **常值层**：$\\underline{A}$（把 $A$ 看成离散群、取局部常值函数）是 étale 层，也是 étale 上同调里最常用的系数。⚠️ 常值**预层**（每个 $U$ 都取 $A$、每个映射都取恒等）一般**不是**层，必须层化。',
        '',
        '4. **具体例子**：$\\operatorname{Spec}\\mathbb{C} \\to \\operatorname{Spec}\\mathbb{R}$ 是有限 étale 的（次数 $2$）；$t \\mapsto t^{n} : \\mathbb{G}_{m} \\to \\mathbb{G}_{m}$ 在 $n$ 于基上可逆时是有限 étale 的（Kummer 覆叠）。'
      ].join('\n'),
      notes: [
        '**读法**：étale 层 = 「可以用 étale 覆盖做下降」的预层。上面三道例子的共同点是 —— 它们都是**局部看是常值、或者由覆叠决定**的对象，所以能下降。',
        '',
        '**第 1 条的意义（Zariski 比 étale 粗）**：拓扑越细，层越少、条件越严。所以 étale 层自动是 Zariski 层；而 étale 上同调能算出比 Zariski 上同调更多的东西，正因为它多认了「有限覆叠」这一类信息。',
        '',
        '**第 2 条为什么叫「常值的推广」**：$Y \\to X$ 有限 étale 时，$Y$ 局部（在 étale 拓扑下）长得像 $n$ 份 $X$，于是 $\\mathcal{G}_{Y}$ 局部同构于常值层。类比是拓扑里的「$n$ 层覆叠 $E \\to X$ 给出局部系（local system）」。',
        '',
        '**第 4 条两个例子的直觉**：$\\operatorname{Spec}\\mathbb{C} \\to \\operatorname{Spec}\\mathbb{R}$ 是「$2$ 点盖 $1$ 点」，正是 Galois 覆叠的原型；$t \\mapsto t^{n}$ 是「$n$ 次 Kummer 覆叠」，把开 $n$ 次方这件事变成一层线性结构 —— Kummer 理论说的就是「$\\mu_{n}$-torsor 由 $H^{1}(X_{\\text{et}}, \\mu_{n})$ 分类」。',
        '',
        '⚠️ **别把第 3 条读成废话**：常值预层不是层这件事，在 Zariski 拓扑下就已经发生（两个开集的交叠上要粘），换成 étale 拓扑后粘合条件更强。层化之后的 $\\underline{A}$ 才是那个「$A$-值局部常值函数」的层。'
      ].join('\n')
    }
  ],

  edges: [

    /* ------------------------------------------------ §A 群上同调：推导 */

    {
      id: 'imp.bar-compute',
      kind: 'implication',
      sources: ['def.bar-resolution', 'def.group-cohomology'],
      target: 'prop.group-cohom-compute',
      title: '标准消解 $\\implies$ 显式上链复形算出群上同调',
      proof: [
        '**要证**：$H^{n}(G, M) = H^{n}\\bigl(\\operatorname{Hom}_{R[G]}(B_{\\bullet}, M)\\bigr)$。',
        '',
        '**第一步：$B_{\\bullet}$ 是自由（因而投射）消解。** 由「标准消解」那条，$B_{\\bullet} \\to R$ 正合、每项自由。自由 $\\implies$ 投射，投射消解可以拿来算右导出函子。',
        '',
        '**第二步：投射消解算 $R^{n}\\operatorname{Hom}$。** 对左正合加法函子 $F = \\operatorname{Hom}_{R[G]}(R, -)$，取 $R$ 的投射消解 $P_{\\bullet} \\to R$，则',
        '',
        '$$R^{n}F(M) = H^{n}\\bigl(\\operatorname{Hom}_{R[G]}(P_{\\bullet}, M)\\bigr).$$',
        '',
        '为什么：$\\operatorname{Hom}_{R[G]}(P_{\\bullet}, M)$ 与「先取 $M$ 的内射消解再取 Hom」给出同一族右导出函子（两者都是 $\\delta$-函子，且在 $n = 0$ 处都与 $\\operatorname{Hom}_{R[G]}(R, M) = M^{G}$ 一致、都可擦除），由同调代数的唯一性比较即得。取 $P_{\\bullet} = B_{\\bullet}$ 即可。',
        '',
        '**第三步：把 Hom 翻译成函数。** $\\operatorname{Hom}_{R[G]}(B_{n}, M)$ 里的元素由 $c(g_{1}, \\cdots, g_{n}) := f\\bigl([1|g_{1}|\\cdots|g_{n}]\\bigr)$ 唯一确定：给定任意 $c$，令 $f\\bigl(g_{0}[1|g_{1}|\\cdots|g_{n}]\\bigr) := g_{0}\\, c(g_{1}, \\cdots, g_{n})$ 即得 $R[G]$-线性映射（良定义因为 $\\{[1|g_{1}|\\cdots|g_{n}]\\}$ 是 $R[G]$-基）。于是 $C^{n}(G, M) \\cong \\{c : G^{n} \\to M\\}$。',
        '',
        '**第四步：微分对上号。** 由 $d_{n}[1|g_{1}|\\cdots|g_{n}] = [g_{1}|\\cdots|g_{n}] + \\sum_{i=1}^{n} (-1)^{i}[1|\\cdots|g_{i}g_{i+1}|\\cdots|g_{n}] + (-1)^{n+1}[1|\\cdots|g_{n}]$（把 $i = 0$ 那一项用 $R[G]$-线性搬到最左边：$[g_{1}|\\cdots|g_{n}] = g_{1}\\cdot[1|g_{2}|\\cdots|g_{n}]$），对 $f$ 取值并记 $c$ 为对应的函数，逐项读出的就是',
        '',
        '$$(\\delta c)(g_{1}, \\cdots, g_{n+1}) = g_{1}c(g_{2}, \\cdots, g_{n+1}) + \\sum_{i=1}^{n}(-1)^{i} c(\\cdots, g_{i}g_{i+1}, \\cdots) + (-1)^{n+1} c(g_{1}, \\cdots, g_{n}).$$',
        '',
        '三步合起来即得 $H^{n}(G, M) \\cong H^{n}(C^{\\bullet}(G, M))$，且同构是自然的。∎'
      ].join('\n'),
      note: '这是「群上同调可算」的全部内容：把内射消解换成 bar 消解，再把 Hom 翻译成 $G^{n}$ 上的函数。'
    },

    {
      id: 'imp.h1-crossed',
      kind: 'implication',
      sources: ['def.group-cohomology', 'def.bar-resolution'],
      target: 'thm.h1-crossed',
      title: '上链复形的低次项 $\\implies$ 一维上同调就是交叉同态模主交叉同态',
      proof: [
        '**第一步：写下 $C^{1}$ 与两个微分。** 由上一条的翻译，',
        '',
        '$$C^{0}(G, M) = M, \\qquad C^{1}(G, M) = \\{c : G \\to M\\}, \\qquad C^{2}(G, M) = \\{c : G \\times G \\to M\\},$$',
        '',
        '$$(\\delta^{0} m)(g) = g m - m, \\qquad (\\delta^{1} c)(g_{1}, g_{2}) = g_{1} c(g_{2}) - c(g_{1}g_{2}) + c(g_{1}).$$',
        '',
        '**第二步：$Z^{1}$ 就是交叉同态。** $\\delta^{1} c = 0$ $\\iff$ $c(g_{1}g_{2}) = g_{1}c(g_{2}) + c(g_{1})$，正是交叉同态关系（左端调换书写顺序即得题述形式）。',
        '',
        '**第三步：$B^{1}$ 就是主交叉同态。** $B^{1} = \\operatorname{im}\\delta^{0}$，而 $\\delta^{0}m$ 就是函数 $g \\mapsto g m - m$，即 $d_{m}$。',
        '',
        '**第四步：$B^{1} \\subseteq Z^{1}$。** 这是 $\\delta^{1}\\delta^{0} = 0$ 的展开，也可直接验：$d_{m}(g_{1}g_{2}) = g_{1}g_{2}m - m$，而 $d_{m}(g_{1}) + g_{1}d_{m}(g_{2}) = (g_{1}m - m) + (g_{1}g_{2}m - g_{1}m) = g_{1}g_{2}m - m$，相等。',
        '',
        '于是 $H^{1}(G, M) = \\ker\\delta^{1}/\\operatorname{im}\\delta^{0} = Z^{1}(G,M)/B^{1}(G,M)$。∎'
      ].join('\n'),
      note: '一维上同调的分类含义不是外加的，是把标准复形第 $1$、$2$ 项写出来的直接结果。'
    },

    {
      id: 'imp.h1-semidirect',
      kind: 'implication',
      sources: ['thm.h1-crossed', 'def.semidirect-product'],
      target: 'thm.h1-semidirect',
      title: '交叉同态 + 半直积 $\\implies$ 一维上同调分类分裂结构',
      proof: [
        '设 $1 \\to A \\xrightarrow{i} E \\xrightarrow{\\pi} G \\to 1$ 有同态截面 $s$。',
        '',
        '**① 截面就是交叉同态。** 对 $d : G \\to A$ 令 $s_{d}(g) := i(d(g)) s(g)$；则 $\\pi s_{d} = \\pi s = \\operatorname{id}$，所以 $s_{d}$ 是截面。又',
        '',
        '$$s_{d}(g_{1})s_{d}(g_{2}) = i(d(g_{1}))\\, s(g_{1})\\, i(d(g_{2}))\\, s(g_{2}) = i\\bigl(d(g_{1}) + g_{1}d(g_{2})\\bigr)\\, s(g_{1}g_{2}),$$',
        '',
        '其中用了共轭恒等式 $s(g_{1})\\, i(a)\\, s(g_{1})^{-1} = i(g_{1} \\cdot a)$（这正是 $A$ 上 $G$-模结构的定义）。而 $s_{d}(g_{1}g_{2}) = i(d(g_{1}g_{2})) s(g_{1}g_{2})$。两式相等 $\\iff$ $d(g_{1}g_{2}) = d(g_{1}) + g_{1}d(g_{2})$，即 $d \\in Z^{1}$。反向：任何截面 $s^{\\prime}$ 都满足 $s^{\\prime}(g)s(g)^{-1} \\in \\ker\\pi = i(A)$，故唯一地是 $i(d(g))$ 的形状，而上面的计算说明 $d \\in Z^{1}$。',
        '',
        '**② 共轭就是加上一个上边界。** 取 $a \\in A$，把 $s_{d}$ 换成 $i(a)^{-1} s_{d}(g) i(a)$：',
        '',
        '$$i(a)^{-1} i(d(g)) s(g) i(a) = i\\bigl(-a + d(g)\\bigr)\\, i(g \\cdot a)\\, s(g) = i\\bigl(d(g) + g\\cdot a - a\\bigr)\\, s(g) = s_{d + \\delta^{1}a}(g).$$',
        '',
        '所以 $A$-共轭类恰是 $d$ 模 $B^{1}(G, A)$。另一方面，任何保持 $i$ 与 $\\pi$ 的扩张同构 $E \\to E$ 由 $\\alpha(i(a)s(g)) = i(a)\\alpha(s(g))$ 决定，而 $\\alpha \\circ s$ 是另一个同态截面，于是又回到上面那族 $d$ —— 即「扩张等价」与「$A$-共轭」是同一件事。',
        '',
        '**③ 零类就是半直积那一档。** 若 $E = A \\rtimes_{\\varphi} G$ 且 $s(g) = (0, g)$ 是规范截面，则 $s_{d}(g) = (d(g), g)$；而 $i(a)^{-1}(0,g)i(a) = (g\\cdot a - a,\\ g)$。于是 $s_{d}$ 与 $s$ 共轭 $\\iff$ $d = g \\mapsto g\\cdot a - a \\in B^{1}$，即 $[d] = 0$。',
        '',
        '**④ 双射。** 由 ①②，映射 $d \\mapsto s_{d}$ 把 $Z^{1}$ 双射到全体同态截面、把 $B^{1}$ 双射到与 $s$ 共轭的那一片，于是 $H^{1}(G, A) \\to \\{A\\text{-共轭类}\\}$ 是双射。∎',
        '',
        '⚠️ **注意定理说了什么、没说什么**：它分类的是**截面**，不是扩张。给定 $G$-模结构后，分裂扩张在相差同构的意义下只有一个（$A \\rtimes_{\\varphi} G$）。'
      ].join('\n'),
      note: '这是「$H^{1}$ 管调整截面的旋钮」的精确版：截面 = 交叉同态，共轭 = 上边界。'
    },

    {
      id: 'imp.h2-extensions',
      kind: 'implication',
      sources: ['def.group-extension', 'def.cocycle-2', 'def.group-cohomology'],
      target: 'thm.h2-group-extensions',
      title: '群扩张 + $2$-上圈 $\\implies$ $H^{2}$ 分类扩张',
      proof: [
        '**方向一：扩张 $\\mapsto$ 上圈类。** 设 $1 \\to A \\xrightarrow{i} E \\xrightarrow{\\pi} G \\to 1$。取集合论截面 $\\sigma : G \\to E$，$\\pi\\sigma = \\operatorname{id}$、$\\sigma(1) = 1$。由 $\\pi$ 的核是 $i(A)$，存在唯一的 $c(g_{1}, g_{2}) \\in A$ 使',
        '',
        '$$\\sigma(g_{1})\\, \\sigma(g_{2}) = i\\bigl(c(g_{1}, g_{2})\\bigr)\\, \\sigma(g_{1}g_{2}) .$$',
        '',
        '**结合律给上圈条件。** 把 $(\\sigma(g_{1})\\sigma(g_{2}))\\sigma(g_{3})$ 与 $\\sigma(g_{1})(\\sigma(g_{2})\\sigma(g_{3}))$ 各算一遍：',
        '',
        '$$i\\bigl(c(g_{1}, g_{2})\\bigr)\\, i\\bigl(c(g_{1}g_{2}, g_{3})\\bigr) = i\\bigl(c(g_{1}, g_{2}g_{3})\\bigr)\\, \\sigma(g_{1})\\, i\\bigl(c(g_{2}, g_{3})\\bigr)\\, \\sigma(g_{1})^{-1}.$$',
        '',
        '右端用共轭恒等式 $\\sigma(g_{1})\\, i(a)\\, \\sigma(g_{1})^{-1} = i(g_{1}\\cdot a)$（$G$-模结构的定义），再用 $i$ 单、$A$ 交换把因子挪到可加号后，得到',
        '',
        '$$c(g_{1}, g_{2}) + c(g_{1}g_{2}, g_{3}) = g_{1}\\cdot c(g_{2}, g_{3}) + c(g_{1}, g_{2}g_{3}),$$',
        '',
        '即 $c \\in Z^{2}$。',
        '',
        '**换截面只改一个上边界。** 另一截面 $\\sigma^{\\prime}(g) = i(u(g))\\sigma(g)$（$u : G \\to A$，因 $\\pi\\sigma^{\\prime} = \\pi\\sigma$ 必是此形状）。把 $\\sigma^{\\prime}$ 塞进定义式，展开 $i(u(g_{1}))\\sigma(g_{1}) i(u(g_{2}))\\sigma(g_{2})$ 并用共轭恒等式，得',
        '',
        '$$c^{\\prime}(g_{1}, g_{2}) = c(g_{1}, g_{2}) + g_{1}\\cdot u(g_{2}) - u(g_{1}g_{2}) + u(g_{1}) = c + \\delta^{1}u ,$$',
        '',
        '即 $[c^{\\prime}] = [c]$。所以类 $[c] \\in H^{2}(G, A)$ 只依赖扩张。扩张同构的映射取同一个截面时读出的 $c$ 相同，故类也不变。',
        '',
        '**方向二：上圈 $\\mapsto$ 扩张。** 给定 $c \\in Z^{2}$，在 $A \\times G$ 上定义',
        '',
        '$$(a_{1}, g_{1})(a_{2}, g_{2}) := \\bigl(a_{1} + g_{1}a_{2} + c(g_{1}, g_{2}),\\ g_{1}g_{2}\\bigr).$$',
        '',
        '单位元是 $(0, 1)$（用归一化 $c(1, g) = c(g, 1) = 0$，它可由换截面达到）；结合律的等式两端之差恰是 $\\delta^{2}c = 0$，故这是群 $E_{c}$。投影 $(a, g) \\mapsto g$ 是满同态、核是 $A \\times \\{1\\} \\cong A$，于是得到扩张。',
        '',
        '**两个方向互逆。** 从扩张读出的 $c$ 再按方向二造 $E_{c}$，则 $(a, g) \\mapsto i(a)\\sigma(g)$ 是群同构 $E_{c} \\to E$（直接验乘法：$i(a_{1})\\sigma(g_{1})\\, i(a_{2})\\sigma(g_{2}) = i(a_{1} + g_{1}a_{2} + c(g_{1},g_{2}))\\sigma(g_{1}g_{2})$）；反之从 $c$ 出发造 $E_{c}$ 再取截面 $g \\mapsto (0, g)$ 读回 $c$。于是等价类与 $H^{2}(G, A)$ 一一对应。∎',
        '',
        '**零类**：$c \\in B^{2}$ $\\iff$ 可换截面使 $c = 0$ $\\iff$ 该截面 $\\sigma$ 本身是同态 $\\iff$ 扩张分裂。∎'
      ].join('\n'),
      note: '「结合律 = 上圈条件」「换截面 = 上边界」这两句是整条定理的全部：前者给存在性，后者给唯一性。'
    },

    {
      id: 'imp.low-degree',
      kind: 'implication',
      sources: ['def.bar-resolution', 'def.invariant-functor'],
      target: 'prop.low-degree-exact',
      title: '标准复形的低次项 $\\implies$ 低次正合列',
      proof: [
        '**第一行。** 由上链复形的显式公式，$\\delta^{0} : M \\to C^{1}(G, M)$ 是 $m \\mapsto (g \\mapsto g m - m)$，故 $\\ker\\delta^{0} = M^{G}$（$\\delta^{0}m = 0$ $\\iff$ 每个 $g$ 都固定 $m$）。而 $Z^{1} = \\ker\\delta^{1}$、$B^{1} = \\operatorname{im}\\delta^{0}$，于是',
        '',
        '$$0 \\to \\ker\\delta^{0} \\to M \\xrightarrow{\\ \\delta^{0}\\ } \\ker\\delta^{1} \\to \\ker\\delta^{1}\\big/\\operatorname{im}\\delta^{0} \\to 0$$',
        '',
        '正合：第一段是 $\\ker$ 的定义；第二段的核恰是 $\\operatorname{im}\\delta^{0}$（把 $\\delta^{0}$ 的靶从 $C^{1}$ 缩到 $\\ker\\delta^{1}$，像不变，因为 $\\delta^{1}\\delta^{0} = 0$）；第三段是商映射。把 $\\ker\\delta^{0}$、$\\ker\\delta^{1}$、右边那一项分别认成 $M^{G}$、$Z^{1}$、$H^{1}$ 即得题述第一行。∎',
        '',
        '**作用平凡的情形。** 若 $g\\cdot m = m$ 对一切 $g$，则 $\\delta^{0}m$ 是零函数，所以 $\\delta^{0} = 0$：于是 $M^{G} = \\ker\\delta^{0} = M$、$B^{1} = 0$，而 $Z^{1} = \\{c : c(g_{1}g_{2}) = c(g_{1}) + c(g_{2})\\} = \\operatorname{Hom}(G, M)$。第一行塌成 $0 \\to M \\to M \\to \\operatorname{Hom}(G,M) \\to H^{1} \\to 0$，读出 $H^{1} = \\operatorname{Hom}(G, M)$。∎',
        '',
        '**第二行。** $0 \\to A \\to B \\to C \\to 0$ 是 $G$-模的短正合列，取右导出函子（$R^{0} = (-)^{G}$、$R^{n} = H^{n}$）得长正合列',
        '',
        '$$0 \\to A^{G} \\to B^{G} \\to C^{G} \\xrightarrow{\\ \\partial\\ } H^{1}(G, A) \\to H^{1}(G, B) \\to H^{1}(G, C) \\to H^{2}(G, A) \\to \\cdots ,$$',
        '',
        '截取前六项就是题述那一行。存在性用标准事实：$(-)^{G}$ 左正合、其右导出函子给长正合列（由导出范畴里「短正合列给出导出三角」+ 共调函子得到）。∎',
        '',
        '**连接同态 $\\partial$ 是什么。** 它就是「把 $c \\in C^{G}$ 沿 $B \\to C$ 局部提升成 $b$，再量 $g b - b$ 落在 $A$ 里的那一项」—— 与经典的蛇引理连接同态完全一致，只是这里换成了 $(-)^{G}$ 的导出版本。'
      ].join('\n'),
      note: '低次正合列不是新定理，它就是标准复形第 $0$、$1$ 项的正合性加上右导出函子的长正合列。'
    },

    /* --------------------------------------- §B 天际线层与足够多内射 */

    {
      id: 'imp.skyscraper-stalks',
      kind: 'implication',
      sources: ['def.skyscraper-sheaf'],
      target: 'prop.skyscraper-stalks',
      title: '天际线层的定义 $\\implies$ 它的茎',
      proof: [
        '**第一步：写清截面。** 由定义，$(i_{x,*}A)(U)$ 在 $x \\in U$ 时是 $A$、否则是 $0$；限制映射在 $x \\in U \\subseteq V$ 时是 $\\mathrm{id}_{A}$、其余是零。',
        '',
        '**第二步：取茎。** 茎是沿 $y$ 的开邻域取滤过余极限：',
        '',
        '$$(i_{x,*}A)_{y} = \\varinjlim_{U \\ni y}\\ (i_{x,*}A)(U) .$$',
        '',
        '**第三步：$y \\in \\overline{\\{x\\}}$ 的情形。** 闭包的刻画给出：每个开邻域 $U \\ni y$ 都满足 $U \\cap \\{x\\} \\ne \\emptyset$，即 $x \\in U$。于是这个滤过系统里**每一项**都是 $A$，而相邻两个邻域之间的过渡映射都是 $\\mathrm{id}_{A}$ —— 常图（constant diagram）的余极限就是 $A$。',
        '',
        '**第四步：$y \\notin \\overline{\\{x\\}}$ 的情形。** 此时存在开邻域 $U_{0} \\ni y$ 使 $x \\notin U_{0}$。考虑 $\\{U \\ni y : U \\subseteq U_{0}\\}$ —— 它是原系统的一个**共尾**子系统（任给 $U \\ni y$，取 $U \\cap U_{0}$）。这个子系统里每一项都是 $0$，故余极限是 $0$。',
        '',
        '**第五步：特化。** $y = x$ 时 $x \\in \\overline{\\{x\\}}$ 恒成立，故 $(i_{x,*}A)_{x} = A$。若 $X$ 是 $T_{1}$，则 $\\overline{\\{x\\}} = \\{x\\}$，于是 $y \\ne x$ 时 $y \\notin \\overline{\\{x\\}}$、茎为 $0$。∎'
      ].join('\n'),
      note: '「天际线」只在闭包上立得住：$T_{1}$ 空间上是一个点，一般空间上可能是一整条闭包。'
    },

    {
      id: 'imp.skyscraper-injective',
      kind: 'implication',
      sources: ['def.skyscraper-sheaf', 'prop.skyscraper-stalks'],
      target: 'prop.skyscraper-injective',
      title: '天际线层 + 取茎 $\\implies$ 系数内射则层内射',
      proof: [
        '**第一步：把 Hom 搬到茎上。** 由伴随 $i_{x}^{-1} \\dashv i_{x,*}$（$i_{x}^{-1}$ 在单点情形等于取茎，这正是上一条算清楚的东西），对任意层 $\\mathcal{F}$ 有自然同构',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{Ab}(X)}\\bigl(\\mathcal{F},\\ i_{x,*}A\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Ab}}\\bigl(\\mathcal{F}_{x},\\ A\\bigr), \\qquad \\varphi \\longmapsto \\varphi_{x} .$$',
        '',
        '**第二步：把内射性搬到茎上。** $i_{x,*}A$ 内射 $\\iff$ $\\operatorname{Hom}(-, i_{x,*}A)$ 正合 $\\iff$ 对每个层的单射 $\\mathcal{G} \\rightarrowtail \\mathcal{H}$，映射 $\\operatorname{Hom}(\\mathcal{H}, i_{x,*}A) \\to \\operatorname{Hom}(\\mathcal{G}, i_{x,*}A)$ 满。用第一步的同构，这等价于',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{Ab}}(\\mathcal{H}_{x},\\ A) \\longrightarrow \\operatorname{Hom}_{\\mathbf{Ab}}(\\mathcal{G}_{x},\\ A)$$',
        '',
        '满。取茎是滤过余极限、故**正合**，于是 $\\mathcal{G}_{x} \\rightarrowtail \\mathcal{H}_{x}$ 是阿贝尔群的单射；由 $A$ 内射，上式满。∎',
        '',
        '**第三步：反之。** 设 $i_{x,*}A$ 内射。取 $\\mathbf{Ab}$ 中的单射 $B \\rightarrowtail C$ 与任意 $B \\to A$。$i_{x,*}$ 正合（单点空间上无反例可坏正合性），故 $i_{x,*}B \\rightarrowtail i_{x,*}C$；由 $i_{x,*}A$ 内射，$\\operatorname{Hom}(i_{x,*}C, i_{x,*}A) \\to \\operatorname{Hom}(i_{x,*}B, i_{x,*}A)$ 满。而第一步的同构把这个映射认成 $\\operatorname{Hom}(C, A) \\to \\operatorname{Hom}(B, A)$，故后者满 —— $A$ 内射。∎',
        '',
        '**第四步：$\\mathbf{Ab}$ 里的翻译。** $\\mathbf{Ab}$ 中内射 $\\iff$ 可除（Baer 判据）。所以「$A$ 内射」可以读成「$A$ 可除」，而 $\\mathbb{Z}$ 不可除 —— 于是 $i_{x,*}\\mathbb{Z}$ **不是**内射层。这一步解释了为什么造内射层必须先把每根茎用内射包撑大。∎'
      ].join('\n'),
      note: '内射性在层范畴里可以「逐点」检验：这一条只用了取茎的伴随与正合性。'
    },

    {
      id: 'imp.enough-injectives-sheaf',
      kind: 'implication',
      sources: ['prop.skyscraper-injective', 'prop.skyscraper-stalks'],
      target: 'thm.pushforward-enough-injectives',
      title: '内射的天际线层 $\\implies$ 层范畴有足够多内射',
      proof: [
        '**目标**：每个 $\\mathcal{F} \\in \\mathbf{Ab}(X)$ 嵌进一个内射层。',
        '',
        '**第一步：构造。** 对每点 $x$，把茎 $\\mathcal{F}_{x}$ 嵌进 $\\mathbf{Ab}$ 里的内射包 $\\mathcal{F}_{x} \\rightarrowtail I_{x}$（$\\mathbf{Ab}$ 有足够多内射：$\\mathbb{Q}/\\mathbb{Z}$ 的适当直积给出内射余生成元）。令',
        '',
        '$$\\mathcal{I} := \\prod_{x \\in X} i_{x,*}\\, I_{x} .$$',
        '',
        '**第二步：$\\mathcal{F} \\to \\mathcal{I}$ 是单。** 层的映射是单 $\\iff$ 在每个开集上取截面后是单。取 $U$ 开、$s \\in \\mathcal{F}(U)$、$s \\ne 0$。层由其全部茎决定，故存在 $x_{0} \\in U$ 使 $s_{x_{0}} \\ne 0$。$s$ 在第 $x_{0}$ 个分量上的像是 $\\mathcal{F}(U) \\to \\mathcal{F}_{x_{0}} \\rightarrowtail I_{x_{0}}$ 下的 $s_{x_{0}}$（$x_{0} \\in U$，故这个分量落在 $I_{x_{0}}$ 而不是 $0$），非零。于是整个像非零 —— 逐 $U$ 单，故是层的单射。',
        '',
        '**第三步：$\\mathcal{I}$ 内射。** 由上一条，每个 $i_{x,*}I_{x}$ 内射。要证它们的**直积**内射：对层的单射 $\\mathcal{G} \\rightarrowtail \\mathcal{H}$ 与任意 $\\mathcal{G} \\to \\mathcal{I}$，竖着拆成每个 $x$ 的分量 $\\mathcal{G} \\to i_{x,*}I_{x}$；用第二步那个伴随同构，这等价于 $\\mathcal{G}_{x} \\to I_{x}$，而 $\\mathcal{G}_{x} \\rightarrowtail \\mathcal{H}_{x}$ 是阿贝尔群的单射、$I_{x}$ 内射，故可沿 $\\mathcal{G}_{x} \\to \\mathcal{H}_{x}$ 提升为 $\\mathcal{H}_{x} \\to I_{x}$，再翻译回 $\\mathcal{H} \\to i_{x,*}I_{x}$。逐分量做完、由直积的泛性质拼成一个 $\\mathcal{H} \\to \\mathcal{I}$。故 $\\mathcal{I}$ 内射。∎',
        '',
        '**第四步：导出函子合法。** 有了「每个层嵌入内射层」，逐项把 $\\mathcal{F}$ 换成内射层即得内射消解（$\\mathcal{F} \\to I^{0} \\to I^{1} \\to \\cdots$，每次对余核重复），且可取下有界。于是 $R^{q}\\Gamma$、$R^{q}f_{*}$ 按「内射消解 + 取同调」有定义；再由比较定理（任一两个内射消解之间的态射在同伦意义下唯一），$R^{q}$ 与消解选取无关。∎',
        '',
        '**第五步：$f_{*}$ 保内射。** $f^{-1} \\dashv f_{*}$ 且 $f^{-1}$ 正合；右伴随的左伴随正合 $\\implies$ 右伴随保内射。故 $f_{*}$ 把 $X$ 上的内射层送到 $Y$ 上的内射层 —— 这就是「$f_{*}$ 这一侧有足够多内射」的确切含义，也是 $Rf_{*}$ 能用 $X$ 上的内射消解去算的理由。∎'
      ].join('\n'),
      note: '「层范畴有足够多内射」的整个证明只用到两件事：取茎是正合的、直积可以逐分量提升。'
    },

    /* ------------------------------------------------- §C 仿紧的 Čech */

    {
      id: 'imp.paracompact-cech',
      kind: 'implication',
      sources: ['thm.pushforward-enough-injectives', 'prop.skyscraper-injective'],
      target: 'thm.paracompact-cech-equals-sheaf',
      title: '足够多内射 + 软层无环 $\\implies$ 仿紧上 Čech 等于层上同调',
      proof: [
        '**要证**：仿紧 Hausdorff 上 $\\check{H}^{n}(X, \\mathcal{M}) = H^{n}(X, \\mathcal{M})$。走法是「造一个由无环层组成的消解」。',
        '',
        '**第一步：Čech 层复形是消解。** 对局部有限开覆盖 $\\mathfrak{U} = (U_{i})_{i}$，令 $\\check{\\mathcal{C}}^{p}(\\mathfrak{U}, \\mathcal{M}) := \\prod_{i_{0} < \\cdots < i_{p}} j_{*}(\\mathcal{M}|_{U_{i_{0}\\cdots i_{p}}})$。$\\mathcal{M}$ 是层，Čech 正合性可以在每个点的小邻域里逐点验证（局部有限保证「只有有限多个 $U_{i}$ 参与」），于是 $0 \\to \\mathcal{M} \\to \\check{\\mathcal{C}}^{0} \\to \\check{\\mathcal{C}}^{1} \\to \\cdots$ 正合。取整体截面：$\\Gamma(X, \\check{\\mathcal{C}}^{p}) = \\check{C}^{p}(\\mathfrak{U}, \\mathcal{M})$（直积与截面对 $j_{*}$ 的相容性），故其同调就是 $\\check{H}^{\\bullet}(\\mathfrak{U}, \\mathcal{M})$。',
        '',
        '**第二步：每一项软。** 仿紧 Hausdorff 上每个开覆盖有局部有限的开细化，局部有限覆盖配**从属的单位分解**（`prop.paracompact-partition-unity`）：一族连续 $\\varphi_{i} : X \\to [0,1]$，支撑在 $U_{i}$ 里、局部有限、局部求和为 $1$。用 $\\varphi_{i}$ 逐块切截面，就能把 $\\check{\\mathcal{C}}^{p}$ 的整体截面「拆成」各覆盖成员上的截面再拼回来 —— 这正是**软性**（soft：每个闭集上的截面都能延拓到全空间）。',
        '',
        '**第三步：软层对 $\\Gamma$ 无环。** 软层在仿紧 Hausdorff 上无环：给定软层 $\\mathcal{S}$ 与短正合列 $0 \\to \\mathcal{S} \\to \\mathcal{A} \\to \\mathcal{B} \\to 0$，要证 $\\Gamma(\\mathcal{A}) \\to \\Gamma(\\mathcal{B})$ 满。取 $s \\in \\Gamma(\\mathcal{B})$，用仿紧性 + 局部有限覆盖把它**局部**提升成一族局部截面，再用从属于该覆盖的单位分解把它们拼成一个整体截面 —— 拼的时候软性保证每步都合法。于是 $H^{n}(X, \\mathcal{S}) = 0$（$n > 0$）。',
        '',
        '**第四步：无环消解算导出函子。** 由第一到第三步，$\\check{\\mathcal{C}}^{\\bullet}(\\mathfrak{U}, \\mathcal{M})$ 是一个由 $\\Gamma$-无环层组成的消解。由 Leray 零调性（对右导出函子，用 $F$-零调对象组成的消解算出的同调与用内射消解算出的相同 —— 这一步的合法性由「足够多内射」保证，见 `thm.pushforward-enough-injectives`），',
        '',
        '$$H^{n}(X, \\mathcal{M}) = H^{n}\\bigl(\\Gamma(X, \\check{\\mathcal{C}}^{\\bullet})\\bigr) = \\check{H}^{n}(\\mathfrak{U}, \\mathcal{M}) .$$',
        '',
        '**第五步：去掉局部有限。** 一般开覆盖取局部有限细化 $\\mathfrak{V} \\preceq \\mathfrak{U}$；细化映射 $\\check{H}^{n}(\\mathfrak{U}, \\mathcal{M}) \\to \\check{H}^{n}(\\mathfrak{V}, \\mathcal{M})$ 与到 $H^{n}(X, \\mathcal{M})$ 的规范映射相容，而后者已是同构，故沿覆盖取余极限仍得同构。∎',
        '',
        '⚠️ 三个零件（Čech 正合、软性、软层无环）都**用到了仿紧性**：它同时提供「局部有限细化」与「单位分解」。去掉仿紧性，第一步或第二步会坏，结论就未必成立。'
      ].join('\n'),
      note: '这条定理的形状是「造一个无环消解」：Čech 复形本身便宜，仿紧性负责让它无环，于是它就算出了层上同调。'
    },

    /* ------------------------------------------------ §D 谱序列的另一条路 */

    {
      id: 'imp.exact-couple-spectral',
      kind: 'implication',
      sources: ['def.exact-couple'],
      target: 'thm.exact-couple-spectral',
      title: '导出偶的递推 $\\implies$ 谱序列及其微分规律',
      proof: [
        '**第一步：递推有定义。** 由正合偶的定义那一条已验证：导出偶 $(D^{\\prime}, E^{\\prime}, i^{\\prime}, j^{\\prime}, k^{\\prime})$ 又是正合偶。于是归纳地得到一列正合偶',
        '',
        '$$(D_{r}, E_{r}, i_{r}, j_{r}, k_{r})_{r \\ge 1}, \\qquad E_{r+1} = H(E_{r}, d_{r}), \\quad d_{r} = j_{r}k_{r} .$$',
        '',
        '这就是谱序列定义里「每页是上一页的同调」那一条。',
        '',
        '**第二步：$i_{r}$、$k_{r}$ 的双次数不随 $r$ 变。** 因为 $i^{\\prime} = i|_{D^{\\prime}}$ 与 $k^{\\prime}([e]) = k(e)$ 都直接沿用原来的映射，双次数原样保留：$i_{r}$ 恒为 $(-1, 1)$、$k_{r}$ 恒为 $(1, 0)$。',
        '',
        '**第三步：$j_{r}$ 每步多一个 $(1,-1)$。** 归纳：设 $j_{r}$ 的双次数是 $(a_{r}, b_{r})$。导出时 $j_{r+1}(i_{r}(x)) = [j_{r}(x)]$ —— 输入是 $i_{r}(x)$（比 $x$ 多一个 $(-1,1)$），输出却是 $j_{r}(x)$（没有那一步），所以 $j_{r+1}$ 的双次数是 $j_{r}$ 的加上 $(1,-1)$。由 $j_{1} = j$ 的双次数 $(0,0)$ 起算，得 $j_{r}$ 的双次数是 $(r-1,\\ 1-r)$。',
        '',
        '**第四步：乘出 $d_{r}$。** $d_{r} = j_{r}k_{r}$ 的双次数是 $(r-1, 1-r) + (1, 0) = (r,\\ 1-r)$，逐分量写出就是',
        '',
        '$$d_{r} : E_{r}^{p,q} \\longrightarrow E_{r}^{p+r,\\ q-(r-1)} .$$',
        '',
        '这正是谱序列定义里 $d_{r} : E^{p,q}_{r} \\to E^{p+r,\\, q-r+1}_{r}$ 的那条规律（$q-(r-1) = q-r+1$）。',
        '',
        '**第五步：极限项。** $D_{r+1} = i_{r}(D_{r}) \\subseteq D_{r}$ 递降，故 $D_{\\infty} := \\bigcap_{r} D_{r}$ 有定义。稳定条件下，$E_{r}$ 在每格上稳定于某个 $E_{\\infty}$，而「$i$ 的像取尽、$k$ 的像除掉之后剩下的正是 $j$ 那一步的商」逐格核对给出 $E_{\\infty}^{p,q} = D_{\\infty}^{p,q}/D_{\\infty}^{p+1,q-1}$。∎',
        '',
        '**为什么这算「收敛」**：$D_{\\infty}$ 就是那个被过滤的极限对象，$D^{p,q}_{\\infty}$ 是它的第 $p$ 层，相邻两层之商就是 $E_{\\infty}^{p,q}$ —— 与谱序列定义里「$\\operatorname{Gr}^{p}H^{p+q} \\cong E^{p,q}_{r}$（$r$ 充分大）」逐字对应。'
      ].join('\n'),
      note: '谱序列的全部机制只有两句：导出偶还是正合偶（所以能递推）、$j$ 每导出一次双次数多 $(1,-1)$（所以微分落点一格一格往外挪）。'
    },

    {
      id: 'imp.filtered-exact-couple',
      kind: 'implication',
      sources: ['def.exact-couple', 'thm.exact-couple-spectral'],
      target: 'prop.filtered-complex-exact-couple',
      title: '长正合列打包成正合偶 $\\implies$ 与直接构造同一个谱序列',
      proof: [
        '**第一步：构造偶。** 对每个 $p$ 有复形的短正合列 $0 \\to F^{p+1}K \\to F^{p}K \\to \\operatorname{Gr}^{p}K \\to 0$。取长正合列',
        '',
        '$$\\cdots \\to H^{n}(F^{p+1}K) \\xrightarrow{\\ i\\ } H^{n}(F^{p}K) \\xrightarrow{\\ j\\ } H^{n}(\\operatorname{Gr}^{p}K) \\xrightarrow{\\ k\\ } H^{n+1}(F^{p+1}K) \\to \\cdots$$',
        '',
        '并把 $H^{p+q}$ 认成双次数 $(p,q)$ 的分量：$D_{1}^{p,q} := H^{p+q}(F^{p}K)$、$E_{1}^{p,q} := H^{p+q}(\\operatorname{Gr}^{p}K)$。于是',
        '',
        '$$i : D_{1}^{p,q} \\to D_{1}^{p-1,q+1} \\ (\\text{等价地 } D_{1}^{p+1,q-1} \\to D_{1}^{p,q}), \\qquad j : D_{1}^{p,q} \\to E_{1}^{p,q}, \\qquad k : E_{1}^{p,q} \\to D_{1}^{p+1,q} .$$',
        '',
        '**正合性**：三角形的三处正合恰好就是长正合列中相邻三项的正合性（$\\operatorname{im} i = \\ker j$ 是「$F^{p+1} \\to F^{p} \\to \\operatorname{Gr}^{p}$ 处正合」，$\\operatorname{im} j = \\ker k$、$\\operatorname{im} k = \\ker i$ 同理）。故这是一个正合偶。∎',
        '',
        '**第二步：由定理得谱序列。** 由 `thm.exact-couple-spectral`，它给出谱序列，微分 $d_{r} : E_{r}^{p,q} \\to E_{r}^{p+r,q-r+1}$。∎',
        '',
        '**第三步：与直接构造逐页一致。** 对 $r$ 归纳证明',
        '',
        '$$E_{r}^{p,q} = Z_{r}^{p,q}\\big/ B_{r}^{p,q}, \\qquad Z_{r}^{p,q} = F^{p}K^{p+q} \\cap d^{-1}(F^{p+r}K^{p+q+1}), \\qquad B_{r}^{p,q} = F^{p}K^{p+q} \\cap d(F^{p-r+1}K^{p+q-1}) .$$',
        '',
        '- $r = 1$：$Z_{1} = F^{p}K \\cap d^{-1}(F^{p+1}K)$、$B_{1} = F^{p}K \\cap d(F^{p}K)$，商就是 $H^{p+q}(\\operatorname{Gr}^{p}K)$ —— 与第一步的 $E_{1}$ 相同。✓',
        '- $r = 2$：$d_{1} = jk$ 就是「连接同态 + 落到 $\\operatorname{Gr}^{p+1}$」，其核商掉 $d_{1}$ 的像正好把 $Z_{1}$ 放宽到 $d^{-1}(F^{p+2}K)$ —— 即 $Z_{2}/B_{2}$。✓',
        '- 归纳步：$Z_{r+1}$ 比 $Z_{r}$ 放宽一层（$d$ 允许再跳一格）、$B_{r+1}$ 比 $B_{r}$ 放宽一层（前一步允许再远一格），而导出偶的三条公式代入后给出**逐字相同**的两个递推。这一步只用到 $d^{2}=0$ 与核 / 余核的泛性质，无额外输入。∎',
        '',
        '**第四步：收敛。** 过滤下有界时每格稳定，由 `thm.exact-couple-spectral` 得 $E_{\\infty}^{p,q} = D_{\\infty}^{p,q}/D_{\\infty}^{p+1,q-1}$；而 $D_{\\infty}^{p,q} = \\bigcap_{r} \\operatorname{im}\\bigl(H^{p+q}(F^{p+r}K) \\to H^{p+q}(F^{p}K)\\bigr) = \\operatorname{im}\\bigl(H^{p+q}(F^{p}K) \\to H^{p+q}(K)\\bigr) = F^{p}H^{p+q}(K)$（下有界时这个递降链在每格上稳定到一个偏序集里的极限，而 $\\bigcup_{p} F^{p}K = K$ 让它落在那条映射的像上）。于是 $E_{\\infty}^{p,q} = F^{p}H^{p+q}/F^{p+1}H^{p+q} = \\operatorname{Gr}^{p}H^{p+q}(K)$。∎'
      ].join('\n'),
      note: '两条路的差别只在「$Z_{r}/B_{r}$ 的递推怎么打包」：直接构造把递推写在 $E_{r}$ 上，正合偶把递推交给导出机制；两者给出的 $E_{r}$ 与微分逐页相同。'
    },

    /* ----------------------------------------------------- §E étale 层 */

    {
      id: 'imp.etale-examples',
      kind: 'implication',
      sources: ['def.etale-sheaf', 'def.etale-space'],
      target: 'prop.etale-sheaf-examples',
      title: 'étale 层的定义 $\\implies$ 开浸入、有限 étale 覆叠、常值层都是层',
      proof: [
        '**准备：层条件要验什么。** 由定义，$\\mathcal{F}$ 是 étale 层 $\\iff$ 对每个联合满射的 étale 族 $\\{U_{i} \\to U\\}$，$\\mathcal{F}(U) \\to \\prod_{i}\\mathcal{F}(U_{i}) \\rightrightarrows \\prod_{i,j}\\mathcal{F}(U_{i}\\times_{U}U_{j})$ 正合。下面逐个验。',
        '',
        '**① 开浸入与 Zariski 覆盖。** 开浸入是平坦的（开集上的模在 $R^{\\prime}$ 上还是模，局部化正合）、无分歧的（$\\Omega^{1}_{U/U} = 0$ 且局部同构于一），且局部有限展示，故是 étale 映射。于是 Zariski 覆盖 $\\{U_{i} \\to U\\}$ 的每个成员都是 étale 映射、族联合满射，是一个 étale 覆盖。所以 étale 层必须满足 Zariski 层的粘合条件 —— 即**是 Zariski 层**。',
        '',
        '**反例方向（为何反之不然）**：étale 覆盖可以有非开浸入的成员（如 $\\operatorname{Spec}\\mathbb{C} \\to \\operatorname{Spec}\\mathbb{R}$），于是粘合系统更长、条件更严；满足 Zariski 粘合的预层未必满足这些更长的系统。故「étale 层 $\\to$ Zariski 层」不是等价。∎',
        '',
        '**② 有限 étale 覆叠给出层。** 设 $Y \\to X$ 有限 étale，令 $\\mathcal{G}_{Y}(U) := \\operatorname{Hom}_{X}(U, Y)$。要证：给定 $U_{i}$ 上的态射 $f_{i} : U_{i} \\to Y$，若在双重纤维积上一致（即 $f_{i}$ 与 $f_{j}$ 在 $U_{i}\\times_{U}U_{j}\\to U_{i},U_{j}\\to Y$ 上相同），则存在唯一 $f : U \\to Y$ 拉回成各 $f_{i}$。',
        '',
        '- **唯一性**：$\\{U_{i} \\to U\\}$ 联合满射（集合层上的满射），故 $|U| = \\bigcup |U_{i}|$，$f$ 的取值被各 $f_{i}$ 完全钉住 —— 至多一个。',
        '- **存在性**：$Y \\to X$ 是 étale，故 $Y$ 在 étale 拓扑下由 $X$ 上可表的层（$h_{Y}$）；而可表预层在 Grothendieck 拓扑下**总是层**（态射的下降对可表函子成立）。把这条用在族 $\\{U_{i}\\to U\\}$ 上，双重纤维积上的一致条件恰好是下降数据，于是给出 $f : U \\to Y$。',
        '',
        '（这一步正是 $\\mathcal{G}_{Y}$ 与常值层的类比所在：$Y = \\coprod_{n} X$ 时 $\\mathcal{G}_{Y}(U)$ 就是「$n$ 个分支的选取」，即常值层。）∎',
        '',
        '**③ 常值层。** 常值预层 $U \\mapsto A$ 一般不是层（Zariski 下就已经如此：两条开集上的常值函数若在交叠上一致，未必是整体常值）。层化之后的 $\\underline{A}$ 才是「$A$-值局部常值函数」，它在 étale 拓扑下当然是层 —— 因为它由 Zariski 层满足粘合，而 étale 覆盖比 Zariski 覆盖细，粘合条件更强但整体函数仍然唯一决定。∎',
        '',
        '**④ 两个具体例子是有限 étale 的。** $\\operatorname{Spec}\\mathbb{C} \\to \\operatorname{Spec}\\mathbb{R}$：有限（作为 $\\mathbb{R}$-模秩 $2$）、平坦（自由）、无分歧（$\\mathbb{C}/\\mathbb{R}$ 是可分扩张，$\\Omega^{1} = 0$）。$t \\mapsto t^{n} : \\mathbb{G}_{m} \\to \\mathbb{G}_{m}$：有限平坦；在 $n$ 于基上可逆时无分歧（微分 $n t^{n-1}dt$ 是单位倍的 $dt$）。∎',
        '',
        '⚠️ **一点诚实提示**：本图只到「这些是 étale 层」这一层，没有把 étale 上同调的长正合列机器搭起来 —— 那需要 site 上的拓扑斯理论（Grothendieck 范畴、几何点、$R^{n}f_{*}$ 的相容性），是另一整套装置。'
      ].join('\n'),
      note: '三个例子其实是一句话：可表的预层在 Grothendieck 拓扑下自动是层；常值层是「$n$ 份 $X$」这个可表对象的特例。'
    },

    /* -------------------------------------------------- 定义引用（蓝线） */

    {
      id: 'def-link.gring-gmodule',
      kind: 'definition',
      definition: 'def.group-ring',
      usedBy: 'def.g-module',
      note: '「$G$-模」的标准定义就是「$R[G]$-模」—— 群作用的三条公理与模的三条公理逐条对上。没有群环，$G$-模只是一句口头约定。'
    },
    {
      id: 'def-link.gmodule-groupcoh',
      kind: 'definition',
      definition: 'def.g-module',
      usedBy: 'def.group-cohomology',
      note: '群上同调的第一个变量是群、第二个变量必须是**$G$-模**（否则「$g \\cdot m$」没有意义）。作用的扭曲方式正是 $H^{n}$ 的全部内容。'
    },
    {
      id: 'def-link.invfun-groupcoh',
      kind: 'definition',
      definition: 'def.invariant-functor',
      usedBy: 'def.group-cohomology',
      note: '群上同调**就是**不变量函子的右导出函子 —— 这一步是定义，不是定理。左正合性正是 $H^{n}$（$n \\ge 1$）存在的理由。'
    },
    {
      id: 'def-link.gring-bar',
      kind: 'definition',
      definition: 'def.group-ring',
      usedBy: 'def.bar-resolution',
      note: '标准消解的每一项 $B_{n}$ 都是**自由 $R[G]$-模** —— 「自由」这个词只有在群环上才有意义。'
    },
    {
      id: 'def-link.groupcoh-h1crossed',
      kind: 'definition',
      definition: 'def.group-cohomology',
      usedBy: 'thm.h1-crossed',
      note: '一维上同调指的是 $H^{1}(G, M)$，即不变量函子的**第一个**右导出函子 —— 换任何别的函子都不叫这个名字。'
    },
    {
      id: 'def-link.semidirect-h1',
      kind: 'definition',
      definition: 'def.semidirect-product',
      usedBy: 'thm.h1-semidirect',
      note: '零类对应的那个对象是半直积 $A \\rtimes_{\\varphi} G$：它的规范截面 $g \\mapsto (0, g)$ 是「不动」的那一档，其它截面都由交叉同态搬动。'
    },
    {
      id: 'def-link.gext-h2',
      kind: 'definition',
      definition: 'def.group-extension',
      usedBy: 'thm.h2-group-extensions',
      note: '分类的对象就是这里定义的扩张 —— 短正合列 $1 \\to A \\to E \\to G \\to 1$ 的等价类。'
    },
    {
      id: 'def-link.cocycle2-h2',
      kind: 'definition',
      definition: 'def.cocycle-2',
      usedBy: 'thm.h2-group-extensions',
      note: '定理的两半都是这个定义的两半：取截面读出 $2$-上圈，换截面加上 $2$-上边界。'
    },
    {
      id: 'def-link.skyscraper-stalks',
      kind: 'definition',
      definition: 'def.skyscraper-sheaf',
      usedBy: 'prop.skyscraper-stalks',
      note: '要算茎，先得知道那个层在每个开集上取什么值 —— 天际线层的取值就只有 $A$ 与 $0$ 两种，茎也就只能是 $A$ 或 $0$。'
    },
    {
      id: 'def-link.skyscraper-inj',
      kind: 'definition',
      definition: 'def.skyscraper-sheaf',
      usedBy: 'prop.skyscraper-injective',
      note: '内射性判定的是这个具体的层（由 $i_{x,*}$ 造出的推前层），所以必须先有天际线层的定义。'
    },
    {
      id: 'def-link.exactcouple-ss',
      kind: 'definition',
      definition: 'def.exact-couple',
      usedBy: 'thm.exact-couple-spectral',
      note: '谱序列是**正合偶导出序列**的同调页序列；没有正合偶，$d_{r}$ 的双次数规律就无从说起。'
    },
    {
      id: 'def-link.exactcouple-filtered',
      kind: 'definition',
      definition: 'def.exact-couple',
      usedBy: 'prop.filtered-complex-exact-couple',
      note: '过滤复形只是**造出**正合偶的一种方式；命题的内容是「这个偶的导出序列等于直接构造的那个谱序列」。'
    },
    {
      id: 'def-link.etalesheaf-examples',
      kind: 'definition',
      definition: 'def.etale-sheaf',
      usedBy: 'prop.etale-sheaf-examples',
      note: '三个例子要验的都是同一个层条件：在联合满射的 étale 族上，截面由各成员上的截面 + 双重纤维积上的一致性唯一决定。'
    }
  ]
});
