/* ==========================================================================
   内容包 · 消解、Tor 与 Ext（24 条）
   --------------------------------------------------------------------------
   填的是两个**登记过但一直空着**的星团：

     hom.resolution「消解与维数」—— 消解怎么比、怎么拼、怎么量长度；
     hom.flat「平坦模」—— 平坦的 Tor 刻画、结构定理，以及由它搭出来的 Tor。

   主线只有一条：**把一个对象换成一条好算的复形，于是「不达到正合」的函子
   变成可以算出偏差的机器。** 而这条复形是「同伦意义下唯一」的 ——
   这就是比较定理，也是导出函子良定义的唯一理由。再往上一层是量长度：
   消解能压多短（维数），以及「压到零」的那个例外（平坦）。

   ⚠️ refs 只写到「书 + 结果的标准名」：离线下没法核对编号，
   宁可不写编号，也不编一个。要补编号请对照原书。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '消解、Tor 与 Ext',

  nodes: [

    /* ======================================================================
       一 · 消解之间怎么比较
       ====================================================================== */

    {
      id: 'thm.comparison-theorem',
      cluster: 'hom.resolution',
      type: 'theorem',
      label: '比较定理',
      title: '比较定理：两条投射消解之间的提升存在且同伦唯一',
      regions: ['homology'],
      tags: ['同调代数', '消解', '比较定理', '链映射', '链同伦', '提升'],
      statement: [
        '设 $R$ 是环，$M, N$ 是 $R$-模，$f : M \\to N$ 是模同态。又设',
        '',
        '$$\\cdots \\to P_{1} \\xrightarrow{\\ d_{1}\\ } P_{0} \\xrightarrow{\\ \\varepsilon_{P}\\ } M \\to 0, \\qquad \\cdots \\to Q_{1} \\xrightarrow{\\ e_{1}\\ } Q_{0} \\xrightarrow{\\ \\varepsilon_{Q}\\ } N \\to 0$$',
        '',
        '是两条**投射消解**。则：',
        '',
        '1. 存在**链映射** $\\varphi : P_{\\bullet} \\to Q_{\\bullet}$ 提升 $f$：即 $\\varepsilon_{Q}\\varphi_{0} = f\\varepsilon_{P}$，且 $\\varphi_{n-1}d_{n} = e_{n}\\varphi_{n}$ 对一切 $n \\ge 1$；',
        '2. 任意两个提升 $\\varphi, \\psi$ **链同伦**：存在 $s_{n} : P_{n} \\to Q_{n+1}$ 使',
        '$$\\varphi_{n} - \\psi_{n} = e_{n+1}s_{n} + s_{n-1}d_{n},$$',
        '其中约定 $s_{-1} = 0$，并把 $e_{0}$ 读作 $\\varepsilon_{Q}$、$d_{0}$ 读作 $\\varepsilon_{P}$。'
      ].join('\n'),
      notes: [
        [
          '**证明（一）存在性：逐层抬升。**',
          '第 $0$ 层：$f\\varepsilon_{P} : P_{0} \\to N$ 沿满射 $\\varepsilon_{Q} : Q_{0} \\twoheadrightarrow N$ 抬升。$P_{0}$ 投射，故存在 $\\varphi_{0} : P_{0} \\to Q_{0}$ 使 $\\varepsilon_{Q}\\varphi_{0} = f\\varepsilon_{P}$ ✓。',
          '归纳步：设 $\\varphi_{n} : P_{n} \\to Q_{n}$ 已造好，且 $e_{n}\\varphi_{n} = \\varphi_{n-1}d_{n}$。要造 $\\varphi_{n+1}$，只需使 $e_{n+1}\\varphi_{n+1} = \\varphi_{n}d_{n+1}$。令 $\\theta := \\varphi_{n}d_{n+1} : P_{n+1} \\to Q_{n}$，算一下：',
          '$$e_{n}\\theta = e_{n}\\varphi_{n}d_{n+1} = \\varphi_{n-1}d_{n}d_{n+1} = 0,$$',
          '所以 $\\operatorname{im}\\theta \\subseteq \\ker e_{n} = \\operatorname{im} e_{n+1}$（两端的复形都正合）✓。沿满射 $Q_{n+1} \\twoheadrightarrow \\operatorname{im} e_{n+1}$ 用 $P_{n+1}$ 的投射性抬升 $\\theta$，得 $\\varphi_{n+1}$ ✓。'
        ].join('\n'),
        [
          '**（二）同伦唯一性：同样的抬升，目标换成「同伦方程」。** 记 $\\Delta_{n} := \\varphi_{n} - \\psi_{n}$。',
          '$n = 0$：$\\varepsilon_{Q}\\Delta_{0} = f\\varepsilon_{P} - f\\varepsilon_{P} = 0$，故 $\\operatorname{im}\\Delta_{0} \\subseteq \\ker\\varepsilon_{Q} = \\operatorname{im} e_{1}$ ✓，沿 $Q_{1} \\twoheadrightarrow \\operatorname{im} e_{1}$ 抬升得 $s_{0}$，即 $e_{1}s_{0} = \\Delta_{0}$ ✓。',
          '归纳步：设 $s_{0}, \\ldots, s_{n-1}$ 已使 $\\Delta_{k} = e_{k+1}s_{k} + s_{k-1}d_{k}$（$k < n$）。令 $\\Delta_{n}^{\\circ} := \\Delta_{n} - s_{n-1}d_{n}$，则',
          '$$e_{n}\\Delta_{n}^{\\circ} = e_{n}\\Delta_{n} - \\bigl(\\Delta_{n-1} - s_{n-2}d_{n-1}\\bigr)d_{n} = \\bigl(e_{n}\\varphi_{n} - \\varphi_{n-1}d_{n}\\bigr) - \\bigl(e_{n}\\psi_{n} - \\psi_{n-1}d_{n}\\bigr) = 0,$$',
          '于是 $\\operatorname{im}\\Delta_{n}^{\\circ} \\subseteq \\operatorname{im} e_{n+1}$ ✓，再抬升一次得 $s_{n}$。逐层下去就得到整族同伦 ✓。∎'
        ].join('\n'),
        '⭐ **意义**：消解**不唯一**，但「唯一到链同伦」已经够用 —— 导出函子、$\\operatorname{Ext}$、$\\operatorname{Tor}$ 都只依赖消解的同伦类，于是它们的定义与消解选取无关。没有这条，整套求导机械都无定义。',
        '⚠️ 结论**只到同伦**，不到同构：同一模的两条投射消解可以差一个可缩复形（例如一条消解与它的「直和一条形如 $0 \\to P \\xrightarrow{1} P \\to 0$ 的可缩复形」）。这不是缺陷，反而是导出范畴里「同构」的正确含义。',
        '**对偶版本**：内射消解之间的提升有同样两条，只是抬升方向反过来（用内射对象的延拓性质），见「内射消解之间的提升」。',
        '⚠️ 用到的只有「每一项投射」与「两端正合」；**不需要**选择公理之外的东西，也不要求环交换。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 关于消解（resolutions）的部分 · 比较定理（Comparison Theorem）',
        'Weibel, An Introduction to Homological Algebra, 投射消解（projective resolutions）一节 · Comparison Theorem'
      ]
    },

    {
      id: 'prop.resolution-homotopy',
      cluster: 'hom.resolution',
      type: 'proposition',
      label: '消解的同伦唯一性',
      title: '同一模的任意两条投射消解彼此同伦等价',
      regions: ['homology'],
      tags: ['同调代数', '消解', '同伦等价', '良定义'],
      statement: [
        '设 $P_{\\bullet} \\twoheadrightarrow M$ 与 $Q_{\\bullet} \\twoheadrightarrow M$ 是同一个 $R$-模 $M$ 的两条**投射消解**。则存在链映射',
        '',
        '$$P_{\\bullet} \\xrightarrow{\\ \\varphi\\ } Q_{\\bullet}, \\qquad Q_{\\bullet} \\xrightarrow{\\ \\psi\\ } P_{\\bullet}$$',
        '',
        '使 $\\psi\\varphi \\sim 1_{P_{\\bullet}}$、$\\varphi\\psi \\sim 1_{Q_{\\bullet}}$。也就是说：两条投射消解在**同伦范畴**里同构。',
        '',
        '特别地，对任意 $R$-模 $N$ 与每个 $n \\ge 0$，$\\operatorname{Hom}(- , N)$ 作用后取同调给出的群都同构 —— 于是 $\\operatorname{Ext}^{n}_{R}(M, N)$ 与消解的选取无关。'
      ].join('\n'),
      notes: [
        [
          '**证明（比较定理取 $f = 1_{M}$，两次）。**',
          '对 $1_{M} : M \\to M$ 与（$P_{\\bullet}$、$Q_{\\bullet}$）用比较定理的存在性，得提升 $\\varphi$；把两个消解互换再用一次，得提升 $\\psi$。两次都有 $\\varepsilon\\psi = \\varepsilon$。',
          '再看复合：$\\psi\\varphi : P_{\\bullet} \\to P_{\\bullet}$ 也是 $1_{M}$ 的提升（增广处：$\\varepsilon\\psi\\varphi = \\varepsilon\\varphi = \\varepsilon$ ✓），而 $1_{P_{\\bullet}}$ 当然是 $1_{M}$ 的提升，于是由比较定理的**同伦唯一性**得 $\\psi\\varphi \\sim 1_{P_{\\bullet}}$ ✓；另一边同理 ✓。∎'
        ].join('\n'),
        '⭐ **这才是「消解可以随便挑」的合法依据。** 计算时通常挑最短、最显式的那条（自由模、两项、Koszul 复形），换一条不影响结果 —— 但只保证结果同构，**不保证中间出现的族一致**。',
        '**举例（同伦等价但不同构）**：在 $P_{\\bullet}$ 上直和一条形如',
        '$$\\cdots \\to 0 \\to P_{0} \\xrightarrow{\\ 1\\ } P_{0} \\to 0 \\to \\cdots$$',
        '的可缩复形，得到 $M$ 的另一条投射消解，它明显与 $P_{\\bullet}$ 不同构（每一项都大了一倍），却同伦等价 ✓。',
        '⚠️ **对偶情形**：内射消解也有同样的结论（在另一侧用比较定理）。这条与「内射消解之间的提升」合起来，才是「用任意一侧的消解算导出函子」的全部依据。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 关于消解（resolutions）的部分 · 消解在同伦意义下唯一',
        'Weibel, An Introduction to Homological Algebra, 投射消解（projective resolutions）一节 · 两条消解同伦等价'
      ]
    },

    {
      id: 'def.deleted-resolution',
      cluster: 'hom.resolution',
      type: 'definition',
      label: '删除消解',
      title: '删除消解：去掉增广之后剩下的复形',
      regions: ['homology'],
      tags: ['定义', '消解', '删除消解', '增广', '复形'],
      statement: [
        '设 $\\varepsilon : P_{0} \\to M$ 是 $R$-模 $M$ 的一条投射消解的**增广**，即',
        '',
        '$$\\cdots \\to P_{2} \\xrightarrow{\\ d_{2}\\ } P_{1} \\xrightarrow{\\ d_{1}\\ } P_{0} \\xrightarrow{\\ \\varepsilon\\ } M \\to 0$$',
        '',
        '处处正合、每项 $P_{n}$ 投射。**删除消解**（deleted resolution）是**去掉增广**留下的链复形',
        '',
        '$$P_{\\bullet} : \\quad \\cdots \\to P_{2} \\xrightarrow{\\ d_{2}\\ } P_{1} \\xrightarrow{\\ d_{1}\\ } P_{0} \\to 0 .$$',
        '',
        '换句话说：把 $M$ 支在 $-1$ 次的那条正合复形，删掉 $-1$ 次的那一项，其余原样保留。'
      ].join('\n'),
      notes: [
        '**为什么值得单独命名。** 求导时，函子并不是作用在**增广**上的：真正算的是删除消解上的复形',
        '',
        '$$\\operatorname{Ext}^{n}_{R}(M, N) = H^{n}\\bigl(\\operatorname{Hom}_{R}(P_{\\bullet}, N)\\bigr), \\qquad \\operatorname{Tor}_{n}^{R}(M, N) = H_{n}\\bigl(P_{\\bullet} \\otimes_{R} N\\bigr).$$',
        '',
        '右边两个 $H$ 取的都是删除消解本身，而不是带 $M$ 的那条。见「扩展群的双边算法」与「挠积」。',
        '**两个容易翻的细节。** ① 删除消解**不再正合**：$H_{0}(P_{\\bullet}) = P_{0}/\\operatorname{im} d_{1} \\cong M$，高次同调全为零 —— 它「只在 $0$ 次与原来不同」；② 也有书把 $M$ 留在 $-1$ 次（叫**增广复形**），两者只差一项，写公式时必须说清用的是哪一个。',
        '⚠️ **记号陷阱**：$\\operatorname{Hom}(P_{\\bullet}, N)$ 是把 $N$ 看成支在 $0$ 次的复形之后取的 Hom 复形，其次数与 $P_{\\bullet}$ 的**上下标方向相反**（不上对偶就只得到链复形）；所以那里写 $H^{n}$，这里写 $H_{n}$。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 关于消解（resolutions）的部分 · 删除消解（deleted resolution）',
        'Weibel, An Introduction to Homological Algebra, 投射消解（projective resolutions）一节 · 用删除消解定义 Ext 与 Tor'
      ]
    },

    /* ======================================================================
       二 · 马蹄引理：短正合列两端有消解则中间也有
       ====================================================================== */

    {
      id: 'lem.horseshoe',
      cluster: 'hom.resolution',
      type: 'lemma',
      label: '马蹄引理',
      title: '马蹄引理：短正合列两端有投射消解则中间也有',
      regions: ['homology'],
      tags: ['引理', '马蹄引理', '消解', '双复形', '长正合列'],
      statement: [
        '设 $0 \\to M_{1} \\xrightarrow{\\ i\\ } M \\xrightarrow{\\ p\\ } M_{2} \\to 0$ 是 $R$-模的短正合列，两端各有投射消解',
        '',
        '$$\\cdots \\to P_{1} \\xrightarrow{\\ d_{1}\\ } P_{0} \\xrightarrow{\\ \\varepsilon\\ } M_{1} \\to 0, \\qquad \\cdots \\to Q_{1} \\xrightarrow{\\ e_{1}\\ } Q_{0} \\xrightarrow{\\ \\eta\\ } M_{2} \\to 0 .$$',
        '',
        '则存在 $M$ 的投射消解 $R_{\\bullet} \\twoheadrightarrow M$，使',
        '',
        '1. $R_{n} = P_{n} \\oplus Q_{n}$（逐项直和）；',
        '2. 含入与投影拼成复形的短正合列 $0 \\to P_{\\bullet} \\to R_{\\bullet} \\to Q_{\\bullet} \\to 0$，且它**逐项分裂**；',
        '3. 增广 $R_{0} = P_{0}\\oplus Q_{0} \\to M$ 由 $i\\varepsilon$ 与 $\\eta$ 的一个提升拼成。',
        '',
        '三个消解拼起来的图就是**双复形**：横向是 $M$ 的消解，纵向是两端各自的消解 —— 形状像一只马蹄。'
      ].join('\n'),
      notes: [
        [
          '**证明（先造微分，再用长正合列验正合）。**',
          '**① 逐层分裂。** 含入与投影 $0 \\to P_{n} \\to P_{n}\\oplus Q_{n} \\to Q_{n} \\to 0$ 本来就有显式截面 $(p, q) \\mapsto q$、缩回 $x \\mapsto (x, 0)$，与投射性无关；用的是这一步的**分裂性**，不是 $P_{n}$ 投射 ✓。',
          '**② 选微分。** 令',
          '$$d_{n} = \\begin{pmatrix} d_{n}^{P} & \\chi_{n} \\\\ 0 & e_{n} \\end{pmatrix} : P_{n}\\oplus Q_{n} \\longrightarrow P_{n-1}\\oplus Q_{n-1}, \\qquad \\chi_{n} : Q_{n} \\to P_{n-1}.$$',
          '分块乘法给出 $d_{n-1}d_{n}$ 的右上块 $= d_{n-1}^{P}\\chi_{n} + \\chi_{n-1}e_{n}$，另外三块为零。所以 $d^{2} = 0$ 当且仅当 $d_{n-1}^{P}\\chi_{n} = -\\chi_{n-1}e_{n}$。而 $\\chi_{n}$ 可以**归纳地**选：已有 $\\chi_{n-1}$ 时，',
          '$$d_{n-2}^{P}\\bigl(-\\chi_{n-1}e_{n}\\bigr) = -\\bigl(d_{n-2}^{P}\\chi_{n-1}\\bigr)e_{n} = \\chi_{n-2}e_{n-1}e_{n} = 0,$$',
          '故 $-\\chi_{n-1}e_{n}$ 的像落在 $\\ker d_{n-2}^{P} = \\operatorname{im} d_{n-1}^{P}$ 里（$P_{\\bullet}$ 正合）✓；沿满射 $P_{n-1} \\twoheadrightarrow \\operatorname{im} d_{n-1}^{P}$ 用 $Q_{n}$ 的**投射性**抬升，即得 $\\chi_{n}$ ✓。',
          '**③ 增广。** $Q_{0}$ 投射、$p$ 满，故 $\\eta$ 沿 $p$ 抬升为 $\\sigma : Q_{0} \\to M$（$p\\sigma = \\eta$）✓；令 $\\varepsilon_{R}(x, y) := i\\varepsilon(x) + \\sigma(y)$。要 $\\varepsilon_{R}d_{0} = 0$，只需在 $\\chi_{0} : Q_{0} \\to P_{-1} = M_{1}$ 上补一个条件：由 $p\\sigma e_{0} = \\eta e_{0} = 0$ 知 $\\sigma e_{0}$ 的像落在 $\\ker p = \\operatorname{im} i$ 里，写成 $i\\theta$；再用 $\\varepsilon$ 满、$Q_{0}$ 投射把 $\\theta : Q_{0} \\to M_{1}$ 抬成 $\\chi_{0}$，即 $\\varepsilon\\chi_{0} = -\\theta$ ✓。于是 $\\varepsilon_{R}d_{0} = i\\varepsilon d_{0}^{P} + i\\varepsilon\\chi_{0} + \\sigma e_{0} = 0 - i\\theta + i\\theta = 0$ ✓。',
          '**④ 验正合（关键一步）。** 于是 $R_{\\bullet}$ 是一条复形，而 $0 \\to P_{\\bullet} \\to R_{\\bullet} \\to Q_{\\bullet} \\to 0$ 是**逐项分裂**的复形短正合列。取它的同调长正合列',
          '$$\\cdots \\to H_{n}(P) \\to H_{n}(R) \\to H_{n}(Q) \\xrightarrow{\\ \\delta\\ } H_{n-1}(P) \\to \\cdots$$',
          '其中 $H_{0}(P) \\cong M_{1}$、$H_{0}(Q) \\cong M_{2}$，而 $H_{n}(P) = H_{n}(Q) = 0$（$n \\ge 1$，两端是消解）。逐段读：',
          '- $n \\ge 2$：$H_{n}(R)$ 被两个 $0$ 夹住，为零 ✓；',
          '- $n = 1$：$0 = H_{1}(P) \\to H_{1}(R) \\to H_{1}(Q) = 0$，故 $H_{1}(R) = 0$ ✓；',
          '- $n = 0$：得正合段 $M_{1} \\xrightarrow{\\ i\\ } H_{0}(R) \\to M_{2} \\to 0$，与 $0 \\to M_{1} \\to M \\to M_{2} \\to 0$ 比较即得 $H_{0}(R) \\cong M$ ✓。',
          '三条合起来：$H_{0}(R) \\cong M$、$H_{n}(R) = 0$（$n \\ge 1$），而每项 $R_{n}$ 是投射对象的直和、仍投射 —— 所以 $R_{\\bullet}$ 确实是 $M$ 的投射消解 ✓。∎'
        ].join('\n'),
        '⭐ **它的实际用途**：想给一个 $M$ 造消解而拿不到显式构造时，把它塞进一条短正合列、给两端造消解，就得到 $M$ 的消解 —— **而且是逐项直和形式的、写得出来的**。Koszul 复形、张量积的消解、谱序列里的双复形，全都是这样拼出来的。',
        '**对偶版本**：把箭头全部反过来，得到内射消解的马蹄引理；它与「全复形还是内射消解」是同一条道理的两面（双复形的全复形仍是消解）。',
        '⚠️ 三个消解**平级**地拼成双复形，所以马蹄引理给出的是「双复形 + 两条谱序列」的来源；用哪一条先算（先横后竖 / 先竖后横）就得到不同的谱序列 —— 见「双复形给出谱序列」。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 关于消解（resolutions）的部分 · 马蹄引理（Horseshoe Lemma）',
        'Weibel, An Introduction to Homological Algebra, 投射消解（projective resolutions）一节 · Horseshoe Lemma'
      ]
    },

    /* ======================================================================
       三 · 合冲：消解的逐层核
       ====================================================================== */

    {
      id: 'def.syzygy',
      cluster: 'hom.resolution',
      type: 'definition',
      label: '合冲',
      title: '合冲与高阶合冲',
      regions: ['homology'],
      tags: ['定义', '合冲', '消解', '核', 'Hilbert'],
      statement: [
        '设 $M$ 是 $R$-模，取满射 $\\pi_{0} : P_{0} \\twoheadrightarrow M$（通常 $P_{0}$ 自由）。它的核',
        '',
        '$$\\Omega M := \\ker\\bigl(\\pi_{0} : P_{0} \\to M\\bigr)$$',
        '',
        '叫 $M$ 的**（第一）合冲**（syzygy），也记 $\\Omega^{1}M$。递归地：给定 $\\pi_{n} : P_{n} \\twoheadrightarrow \\Omega^{n}M$，令',
        '',
        '$$\\Omega^{n+1}M := \\ker\\bigl(\\pi_{n}\\bigr), \\qquad \\Omega^{0}M := M .$$',
        '',
        '于是这些 $P_{n}$ 与 $\\pi_{n}$ 拼成 $M$ 的一条投射（自由）消解，而 $\\Omega^{n}M$ 就是这条消解在 $n$ 次处的「像 / 核」。'
      ].join('\n'),
      notes: [
        '**名字的来历**：Hilbert 解线性方程组时，$\\Omega M$ 正是「剩下的未知量之间的线性关系」（希腊语 syzygy 原意是「配对」）。在 $M = R/(a_{1}, \\ldots, a_{m})$ 的情形，$\\Omega M$ 就是由关系 $\\sum a_{i}e_{i} = 0$ 生成的子模 —— 也就是**方程组的一次合冲**。',
        '**它把「消解」翻译成「一列模」。** 一条消解',
        '',
        '$$\\cdots \\to P_{2} \\to P_{1} \\to P_{0} \\to M \\to 0$$',
        '',
        '与一串合冲 $\\Omega M \\hookrightarrow P_{0}$、$\\Omega^{2}M \\hookrightarrow P_{1}$、$\\ldots$ 是同一份数据。所以「$M$ 有没有长度 $n$ 的投射消解」就等价于「$\\Omega^{n}M$ 投射」（见「投射维数与扩展群的消失刻画」）。',
        '⚠️ **合冲依赖消解**：换一条消解，$\\Omega M$ 会变。它只在「相差一个投射直和项」的意义下唯一 —— 那正是「合冲的稳定性」那条命题的内容，依据是合冲比较引理。',
        '📌 Hilbert 合冲定理是这条路线最著名的结论：$R = k[x_{1}, \\ldots, x_{n}]$ 上每个有限生成模的第 $n$ 合冲是自由模，于是 $\\operatorname{gl.dim} R = n$（对多项式环，Koszul 复形给出显式的长度 $n$ 消解）。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 合冲（syzygies）的部分 · 合冲的定义与 Hilbert 合冲定理',
        'Eisenbud, Commutative Algebra with a View Toward Algebraic Geometry, 自由消解（free resolutions）的部分 · syzygy'
      ]
    },

    {
      id: 'lem.schanuel',
      cluster: 'hom.resolution',
      type: 'lemma',
      label: '合冲比较引理',
      title: '合冲比较引理：两条短正合列的首项与核彼此互补',
      regions: ['homology'],
      tags: ['引理', '合冲', 'Schanuel', '纤维积', '分裂'],
      statement: [
        '设 $M$ 是 $R$-模，另有两条短正合列',
        '',
        '$$0 \\to K \\to P \\xrightarrow{\\ \\pi\\ } M \\to 0, \\qquad 0 \\to K_{1} \\to P_{1} \\xrightarrow{\\ \\pi_{1}\\ } M \\to 0,$$',
        '',
        '其中 $P, P_{1}$ 都**投射**。则',
        '',
        '$$P_{1} \\oplus K \\;\\cong\\; P \\oplus K_{1} .$$',
        '',
        '也就是说：两条「$M$ 的投射预覆盖」各自的核，可以互相补偿成同一个模。'
      ].join('\n'),
      notes: [
        [
          '**证明（纤维积一次搞定）。** 令 $X$ 是 $\\pi$ 与 $\\pi_{1}$ 的**纤维积**（拉回）',
          '$$X := \\{\\, (x, x_{1}) \\in P \\oplus P_{1} : \\pi(x) = \\pi_{1}(x_{1}) \\,\\}.$$',
          '两个投影给出交换图，而 $\\pi_{1}$ 满、$\\pi$ 满分别是「$X \\to P$ 满」与「$X \\to P_{1}$ 满」的原因 ✓。逐条读核：',
          '- $\\ker(X \\to P_{1}) = \\{\\, (x, 0) : \\pi(x) = 0 \\,\\} = K$ ✓；',
          '- $\\ker(X \\to P) = \\{\\, (0, x_{1}) : \\pi_{1}(x_{1}) = 0 \\,\\} = K_{1}$ ✓。',
          '于是得到两条短正合列 $0 \\to K \\to X \\to P_{1} \\to 0$ 与 $0 \\to K_{1} \\to X \\to P \\to 0$。**第一条分裂**：$P_{1}$ 投射，故 $X \\to P_{1}$ 有截面，于是 $X \\cong P_{1}\\oplus K$ ✓。**第二条也分裂**（$P$ 投射），于是 $X \\cong P\\oplus K_{1}$ ✓。两者一比即得 $P_{1}\\oplus K \\cong P\\oplus K_{1}$ ✓。∎'
        ].join('\n'),
        '⭐ **它说的是「合冲只差一个投射直和项」**，而且**两条预覆盖的中间项都必须是投射的**才有这个结论 —— 这也是为什么「投射」在合冲的整套叙述里反复出现：它是唯一让「分裂」生效的假设。',
        '⚠️ 结论是**直和同构**，不是同构：$K$ 与 $K_{1}$ 一般不同构。要「取掉」这个自由度，就得在**稳定范畴**里工作 —— 把相差投射直和项的对象等同起来。',
        '**名字**：这叫 Schanuel 引理，最早出现在 Schanuel 的讲义里（未发表），经 Rotman、Cartan–Eilenberg 等书传播。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 合冲（syzygies）的部分 · Schanuel 引理',
        'Cartan–Eilenberg, Homological Algebra (1956), 关于合冲与维数的部分 · Schanuel 引理'
      ]
    },

    {
      id: 'prop.syzygy-stability',
      cluster: 'hom.resolution',
      type: 'proposition',
      label: '合冲的稳定性',
      title: '合冲在相差投射直和项的意义下与消解无关',
      regions: ['homology'],
      tags: ['命题', '合冲', '稳定性', '稳定范畴', '投射维数'],
      statement: [
        '设 $M$ 是 $R$-模，$P_{\\bullet}$、$Q_{\\bullet}$ 是它的两条投射消解，各自算出第 $n$ 合冲 $\\Omega^{n}M$ 与 $\\Omega_{1}^{n}M$。则对每个 $n \\ge 0$ 存在投射模 $F, F_{1}$ 与同构',
        '',
        '$$\\Omega^{n}M \\oplus F \\;\\cong\\; \\Omega_{1}^{n}M \\oplus F_{1} .$$',
        '',
        '特别地：$\\Omega^{n}M$ 投射 $\\iff$ $\\Omega_{1}^{n}M$ 投射。于是「第 $n$ 合冲是否投射」与消解的选取无关 —— 这正是投射维数能良定义的原因。'
      ].join('\n'),
      notes: [
        [
          '**证明（对 $n$ 归纳，每次用合冲比较引理）。**',
          '$n = 0$：$M \\cong M$，取 $F = F_{1} = 0$ ✓。',
          '$n = 1$：两条预覆盖 $0 \\to \\Omega M \\to P_{0} \\to M \\to 0$ 与 $0 \\to \\Omega_{1}M \\to Q_{0} \\to M \\to 0$ 都用投射项，直接引比较引理得 $P_{0}\\oplus\\Omega_{1}M \\cong Q_{0}\\oplus\\Omega M$ ✓。',
          '归纳步：设 $\\Omega^{n}M \\oplus F \\cong \\Omega_{1}^{n}M \\oplus F_{1}$。两条消解在 $n+1$ 次处给出两条预覆盖，中间项 $P_{n}$、$Q_{n}$ 都投射，但它们的「目标」分别是 $\\Omega^{n}M$ 与 $\\Omega_{1}^{n}M$ —— 不同的模，比较引理不能直接用。补救的办法：把直和项并进去。取',
          '$$P_{n} \\oplus Q_{n} \\twoheadrightarrow \\Omega^{n}M \\oplus F, \\qquad P_{n} \\oplus Q_{n} \\twoheadrightarrow \\Omega_{1}^{n}M \\oplus F_{1},$$',
          '（第二块用归纳假设中的同构把目标搬过去），两条预覆盖的中间项都是 $P_{n}\\oplus Q_{n}$、都投射 ✓，再用一次比较引理，得',
          '$$\\Omega^{n+1}M \\oplus \\bigl(P_{n}\\oplus Q_{n}\\bigr) \\;\\cong\\; \\Omega_{1}^{n+1}M \\oplus \\bigl(P_{n}\\oplus Q_{n}\\bigr),$$',
          '而这正是要的形式（投影项是投射模）✓。∎'
        ].join('\n'),
        '⚠️ 上面的归纳步里，「$\\Omega^{n}M$ 与 $\\Omega_{1}^{n}M$ 不同」这件事不能靠一句「同构」带过 —— 归纳假设给的是**带直和项的同构**，所以每一步都得在直和之后重新做预覆盖。这正是「稳定」这个词的含义。',
        '⭐ **规范化**：把「相差一个投射直和项」商掉之后，$\\Omega^{n}$ 才成为真正的函子 —— 那个商范畴就是**稳定模范畴**，合冲在里面是良定义的对象。这也解释了为什么 $K_{0}$、稳定同伦论、以及 $K$ 理论都从「稳定」这个字眼开始。',
        '📌 一个立刻的推论：$\\operatorname{pd}_{R} M \\le n \\iff \\Omega^{n}M$ 投射 —— 这条在本图里被「投射维数与扩展群的消失刻画」用作主判据。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 合冲（syzygies）的部分 · 合冲在相差投射直和项下唯一',
        'Weibel, An Introduction to Homological Algebra, 关于合冲与稳定范畴（syzygies, stable category）的部分'
      ]
    },

    /* ======================================================================
       四 · 量长度：投射维数、内射维数、整体维数
       ====================================================================== */

    {
      id: 'def.projective-dimension',
      cluster: 'hom.resolution',
      type: 'definition',
      label: '投射维数',
      title: '投射维数：最短投射消解的长度',
      regions: ['homology'],
      tags: ['定义', '投射维数', '消解', '维数'],
      statement: [
        '设 $M$ 是 $R$-模。说 $\\operatorname{pd}_{R} M \\le n$，如果 $M$ 有一条**长度 $n$ 的投射消解**，即存在正合列',
        '',
        '$$0 \\to P_{n} \\to \\cdots \\to P_{1} \\to P_{0} \\to M \\to 0$$',
        '',
        '而每项 $P_{k}$ 都投射。$M$ 的**投射维数** $\\operatorname{pd}_{R} M \\in \\mathbb{N} \\cup \\{\\infty\\}$ 是使此式成立的最小 $n$；若没有这样的 $n$，记 $\\operatorname{pd}_{R} M = \\infty$。'
      ].join('\n'),
      notes: [
        '**读法**：维数说的不是「消解有多长」，而是「**能压到多短**」。任意 $R$-模都有任意长的投射消解，有趣的是它能不能被截断到某一步。',
        '**两个端点**：$\\operatorname{pd}_{R} M = 0 \\iff M$ 投射（消解 $0 \\to M \\xrightarrow{\\ 1\\ } M \\to 0$ 就够，长度为 $0$）；$\\operatorname{pd}_{R} M \\le 1$ 说的是「存在投射预覆盖 $P_{0} \\twoheadrightarrow M$ 且它的核投射」。',
        '**无穷维确实会发生**：取 $R = k[x,y]/(xy)$ 在极大理想 $(x,y)$ 处的局部化，则剩余域 $k = R/(x,y)$ 的投射维数是 $\\infty$。理由是一般的：诺特局部环上 $\\operatorname{gl.dim} R < \\infty$ 恰好等价于 $R$ 正则，而 $k[x,y]/(xy)$ 局部化后在 $(x,y)$ 处不是正则环（维数 $1$、嵌入维数 $2$）✓。',
        '⭐ **等价刻画**（见「投射维数与扩展群的消失刻画」）：$\\operatorname{pd}_{R} M \\le n$ 当且仅当 $\\operatorname{Ext}^{k}_{R}(M, -) = 0$ 对一切 $k > n$ 成立。于是维数就是「第一个不再消失的次数」减一。',
        '⚠️ **不要与「有投射预覆盖」混淆**：预覆盖只要求 $P_{0} \\twoheadrightarrow M$，任何模都有（自由模盖住即可）；维数是关于**能压多短**的信息，不是关于覆盖存在性的信息。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 维数（dimensions）的部分 · 投射维数',
        'Weibel, An Introduction to Homological Algebra, 关于投射维数（projective dimension）的部分'
      ]
    },

    {
      id: 'def.injective-dimension',
      cluster: 'hom.resolution',
      type: 'definition',
      label: '内射维数',
      title: '内射维数：最短内射消解的长度',
      regions: ['homology'],
      tags: ['定义', '内射维数', '消解', '维数', '对偶'],
      statement: [
        '设 $M$ 是 $R$-模。说 $\\operatorname{id}_{R} M \\le n$，如果 $M$ 有一条**长度 $n$ 的内射消解**，即存在正合列',
        '',
        '$$0 \\to M \\to I^{0} \\to I^{1} \\to \\cdots \\to I^{n} \\to 0$$',
        '',
        '而每项 $I^{k}$ 都内射。$M$ 的**内射维数** $\\operatorname{id}_{R} M$ 是使此式成立的最小 $n$（不存在则记 $\\infty$）。',
        '',
        '对偶地，它等于 $M$ 看作**右**模时的投射维数：$\\operatorname{id}_{R} M = \\operatorname{pd}_{R^{\\mathrm{op}}} M$。'
      ].join('\n'),
      notes: [
        '**与投射维数完全对称**，但方向反了：消解朝**右**延伸，因为内射对象是「能接收映射」的那一侧。逐条对照：',
        '',
        '- $\\operatorname{id}_{R} M = 0 \\iff M$ 内射；',
        '- $\\operatorname{id}_{R} M \\le n \\iff \\operatorname{Ext}^{k}_{R}(N, M) = 0$ 对一切 $N$ 与 $k > n$ 成立（注意是**第二个**变量）；',
        '- $\\operatorname{id}_{R} M$ 等于使 $\\operatorname{Ext}^{n}_{R}(-, M)$ 不全为零的最大 $n$。',
        '**例子（$\\mathbb{Z}$ 上）**：$\\mathbb{Q}$ 内射（可除群）故 $\\operatorname{id}_{\\mathbb{Z}}\\mathbb{Q} = 0$；$\\mathbb{Z}$ 不内射，而 $0 \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{Q}/\\mathbb{Z} \\to 0$ 是长度 $1$ 的内射消解，故 $\\operatorname{id}_{\\mathbb{Z}}\\mathbb{Z} = 1$ ✓。',
        '⭐ **为什么两边都要有**：算 $\\operatorname{Ext}^{n}(M, N)$ 时，用 $M$ 的**投射**消解（左边）或用 $N$ 的**内射**消解（右边）都行；两边分别由 $\\operatorname{pd} M$ 与 $\\operatorname{id} N$ 决定难易，于是「$\\operatorname{Ext}^{n}(M, -) = 0$（$n > \\operatorname{pd} M$）」与「$\\operatorname{Ext}^{n}(-, N) = 0$（$n > \\operatorname{id} N$）」同时成立。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 维数（dimensions）的部分 · 内射维数',
        'Weibel, An Introduction to Homological Algebra, 关于内射维数（injective dimension）的部分'
      ]
    },

    {
      id: 'def.global-dimension',
      cluster: 'hom.resolution',
      type: 'definition',
      label: '整体维数',
      title: '环的整体维数',
      regions: ['homology'],
      tags: ['定义', '整体维数', '维数', '环', '同调维数'],
      statement: [
        '环 $R$ 的**（左）整体维数**是全体左模的投射维数的上确界：',
        '',
        '$$\\operatorname{gl.dim} R := \\sup_{M} \\operatorname{pd}_{R} M ,$$',
        '',
        '上确界取遍所有左 $R$-模 $M$。等价地',
        '',
        '$$\\operatorname{gl.dim} R = \\sup_{M} \\operatorname{id}_{R} M ,$$',
        '',
        '也等于使「$\\operatorname{Ext}^{n}_{R}(-,-)$ 对一切 $n > d$ 恒为零」成立的最小 $d$。',
        '',
        '相应地还有**右整体维数** $\\operatorname{gl.dim} R^{\\mathrm{op}}$；两者可以不相等。'
      ].join('\n'),
      notes: [
        '**为什么这三个上确界相等**：由维数消失刻画，「$\\operatorname{pd}_{R} M \\le d$ 对一切 $M$」「$\\operatorname{id}_{R} N \\le d$ 对一切 $N$」「$\\operatorname{Ext}^{n}_{R}(-,-)$ 对一切 $n > d$ 恒为零」是**同一句话** —— 三条都只是在说「这一整族群在 $n > d$ 处消失」✓。',
        '**四个基本例子**：',
        '',
        '- $\\operatorname{gl.dim} R = 0 \\iff R$ 半单（Wedderburn–Artin：每个模都投射）；域上为 $0$；',
        '- $\\operatorname{gl.dim} \\mathbb{Z} = 1$（主理想整环，见「主理想整环的整体维数」）；',
        '- $\\operatorname{gl.dim} k[x_{1}, \\ldots, x_{n}] = n$（Hilbert 合冲定理 + Koszul 复形）；',
        '- $\\operatorname{gl.dim} R = \\infty$ 会发生（例如 $k[x,y]/(xy)$），此时「没有统一的上界」。',
        '⭐ **它衡量的是「计算 $\\operatorname{Ext}$ 需要多少层」**：整体维数越小，导出函子的机器越短。$0$ 维就是「什么都不用算」，$1$ 维就是「只需两条正合列互相推」，这也是阿贝尔群那套同调代数如此简单的原因。',
        '⚠️ **左右之分不是学究**：非交换环上左、右整体维数可以不相等；交换环上两者相等，于是符号可以只写一个。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 维数（dimensions）的部分 · 整体维数（global dimension）',
        'Weibel, An Introduction to Homological Algebra, 关于整体维数（global dimension）与半单环的部分'
      ]
    },

    {
      id: 'prop.pd-vanishing',
      cluster: 'hom.resolution',
      type: 'proposition',
      label: '投射维数与消失',
      title: '投射维数与扩展群的消失刻画',
      regions: ['homology'],
      tags: ['命题', '投射维数', 'Ext', '消失', '合冲'],
      statement: [
        '设 $M$ 是 $R$-模、$n \\ge 0$。下列条件**等价**：',
        '',
        '1. $\\operatorname{pd}_{R} M \\le n$；',
        '2. 第 $n$ 合冲 $\\Omega^{n}M$ **投射**（等价地：$M$ 有长度 $n$ 的投射消解）；',
        '3. 对一切 $R$-模 $N$ 与一切 $k > n$：$\\operatorname{Ext}^{k}_{R}(M, N) = 0$；',
        '4. 对一切 $R$-模 $N$：$\\operatorname{Ext}^{n+1}_{R}(M, N) = 0$。',
        '',
        '对偶地：$\\operatorname{id}_{R} M \\le n$ 当且仅当 $\\operatorname{Ext}^{k}_{R}(N, M) = 0$ 对一切 $N$ 与一切 $k > n$ 成立。'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '$(1) \\implies (3)$：取长度 $n$ 的投射消解 $P_{\\bullet}$，则删除消解在 $k > n$ 处为零，故 $\\operatorname{Hom}(P_{\\bullet}, N)$ 在 $k > n$ 次也为零，上同调自然为零 ✓（用到了「用投射消解算与用内射消解算给出同一个群」，见「扩展群的双边算法」）。',
          '$(3) \\implies (4)$：取 $k = n+1$ ✓。',
          '$(4) \\implies (1)$：取任意投射消解并算出 $K := \\Omega^{n}M$。由**维数转移**（连用 $n$ 次）得 $\\operatorname{Ext}^{1}_{R}(K, N) \\cong \\operatorname{Ext}^{n+1}_{R}(M, N)$，对一切 $N$ 为零 ✓。',
          '而「$\\operatorname{Ext}^{1}_{R}(K, -)$ 恒为零」迫使 $K$ 投射：若 $K$ 不投射，取满射 $F \\twoheadrightarrow K$（$F$ 自由），它不分裂，于是由「一阶扩展的分类」得到 $\\operatorname{Ext}^{1}_{R}(K, \\ker) \\ne 0$，矛盾 ✓。于是 $M$ 有一条长度 $n$ 的投射消解 ✓，即 $(1)$。',
          '$(1) \\iff (2)$ 是合冲的定义重述 ✓。∎'
        ].join('\n'),
        '⭐ **实用形式**：验维数时通常只算**一个**群 —— $\\operatorname{Ext}^{n+1}_{R}(M, N)$ 对一切 $N$ 为零即可，不必逐层算。反过来，想知道 $\\operatorname{pd}$ 到底多大，就找出一个使 $\\operatorname{Ext}^{n}$ 非零的 $N$。',
        '⚠️ **两个方向别记反**：$\\operatorname{pd}_{R} M$ 管的是 $\\operatorname{Ext}(M, -)$（**第一个**变量），$\\operatorname{id}_{R} N$ 管的是 $\\operatorname{Ext}(-, N)$（**第二个**变量）。',
        '📌 一个立刻的推论：$R$ 是半单环 $\\iff$ 每个模都投射 $\\iff \\operatorname{gl.dim} R = 0$。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 维数（dimensions）的部分 · 维数的 Ext 消失刻画',
        'Weibel, An Introduction to Homological Algebra, 关于投射维数与 Ext 消失的部分'
      ]
    },

    {
      id: 'cor.gldim-pid',
      cluster: 'hom.resolution',
      type: 'corollary',
      label: '主理想整环的整体维数',
      title: '主理想整环上每个模的投射维数不超过一',
      regions: ['homology'],
      tags: ['推论', '整体维数', '主理想整环', 'PID', '自由模'],
      statement: [
        '设 $R$ 是**主理想整环**。则每个 $R$-模 $M$ 都有长度不超过 $1$ 的**自由**消解，于是',
        '',
        '$$\\operatorname{pd}_{R} M \\le 1 , \\qquad \\operatorname{gl.dim} R \\le 1 .$$',
        '',
        '（上式对一切 $R$-模 $M$ 成立。）进一步：$R$ 是域时 $\\operatorname{gl.dim} R = 0$，否则 $\\operatorname{gl.dim} R = 1$。特别地',
        '',
        '$$\\operatorname{gl.dim} \\mathbb{Z} = 1 .$$'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '**① 长度 $2$ 的自由消解。** 取生成元集 $I$ 与满射 $\\pi : R^{(I)} \\twoheadrightarrow M$（自由模）。它的核 $K$ 是自由模 $R^{(I)}$ 的**子模**，而主理想整环上自由模的子模仍自由 ✓。取满射 $R^{(J)} \\twoheadrightarrow K$，拼成',
          '$$0 \\to R^{(J)} \\to R^{(I)} \\to M \\to 0 ,$$',
          '正是长度 $1$ 的自由（因而是投射）消解 ✓，故 $\\operatorname{pd}_{R} M \\le 1$ 对一切 $M$ ✓。',
          '**② $\\operatorname{gl.dim} = 0$ 的情形。** 若 $R$ 是域，每个模都是自由模（向量空间取基），故投射，$\\operatorname{pd} = 0$，$\\operatorname{gl.dim} R = 0$ ✓。',
          '**③ 非域时 $\\operatorname{gl.dim} = 1$。** 取非零非单位的 $a \\in R$，看 $M := R/(a)$。它投射会有矛盾：若投射，则短正合列 $0 \\to (a) \\to R \\to R/(a) \\to 0$ 必分裂（$R/(a)$ 投射），于是 $(a)$ 是 $R$ 的直和项、由某个幂等元切出；而整环里幂等元只有 $0, 1$，$(a) \\ne 0$ 且 $(a) \\ne R$，矛盾 ✓。故 $\\operatorname{pd}_{R} M = 1$（上界由 ① 给出），于是 $\\operatorname{gl.dim} R = 1$ ✓。∎'
        ].join('\n'),
        '⭐ **与「阿贝尔群的 Ext」是同一件事**：$\\operatorname{gl.dim}\\mathbb{Z} = 1$ 换成 $\\operatorname{Ext}$ 的语言就是「$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M, N) = 0$ 对一切 $n \\ge 2$」—— 正是「阿贝尔群的 Ext」那条命题。两条说的是同一句话的两副面孔。',
        '⚠️ **为什么偏偏是 PID**：证明里唯一用到环的地方是「自由模的子模自由」。这条在 $k[x,y]$ 上就失败了，于是 $k[x,y]$ 上确实有 $\\operatorname{pd} = 2$ 的模（$k$ 自己），整体维数升到 $2$。',
        '📌 同一套论证给**主理想整环上的无挠模平坦**（无挠 + 长度 $1$ 自由消解 $\\implies$ 平坦）—— 见「平坦模」。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 特定环（specific rings）的部分 · 主理想整环上的维数',
        'Weibel, An Introduction to Homological Algebra, 关于主理想整环（PID）上整体维数的部分'
      ]
    },

    /* ======================================================================
       五 · 两种算法与两类群：维数转移、Ext 的两种算法、一阶扩展
       ====================================================================== */

    {
      id: 'prop.dimension-shift',
      cluster: 'hom.resolution',
      type: 'proposition',
      label: '维数转移',
      title: '维数转移：扩展群与挠积都可以往低一次挪',
      regions: ['homology'],
      tags: ['命题', '维数转移', 'Ext', 'Tor', '合冲'],
      statement: [
        '设 $0 \\to K \\to P \\xrightarrow{\\ \\pi\\ } M \\to 0$ 是 $R$-模的短正合列，且 $P$ **投射**（等价地：$K$ 是 $M$ 的一个合冲）。则对一切 $n \\ge 0$ 与任意 $R$-模 $N$：',
        '',
        '$$\\operatorname{Ext}^{n+1}_{R}(M, N) \\;\\cong\\; \\operatorname{Ext}^{n}_{R}(K, N), \\qquad \\operatorname{Tor}_{n+1}^{R}(M, N) \\;\\cong\\; \\operatorname{Tor}_{n}^{R}(K, N).$$',
        '',
        '反复使用即得：对 $k \\ge 0$，$\\operatorname{Ext}^{n+k}_{R}(M, N) \\cong \\operatorname{Ext}^{n}_{R}(\\Omega^{k}M, N)$（$n \\ge 1$）。'
      ].join('\n'),
      notes: [
        [
          '**证明（Ext 一侧：用 $N$ 的内射消解）。** 取 $N$ 的内射消解 $N \\to I^{\\bullet}$。$I^{k}$ 内射使 $\\operatorname{Hom}(-, I^{k})$ 正合，故把短正合列逐项作用后得到**复形的短正合列**（方向相反）',
          '$$0 \\to \\operatorname{Hom}(M, I^{\\bullet}) \\to \\operatorname{Hom}(P, I^{\\bullet}) \\to \\operatorname{Hom}(K, I^{\\bullet}) \\to 0 .$$',
          '取它的上同调长正合列',
          '$$\\cdots \\to \\operatorname{Ext}^{n}(M, N) \\to \\operatorname{Ext}^{n}(P, N) \\to \\operatorname{Ext}^{n}(K, N) \\xrightarrow{\\ \\delta\\ } \\operatorname{Ext}^{n+1}(M, N) \\to \\operatorname{Ext}^{n+1}(P, N) \\to \\cdots$$',
          '而 $P$ 投射使 $\\operatorname{Ext}^{k}(P, N) = 0$（$k \\ge 1$），于是每一段都退化成同构：$\\delta$ 是双射，即 $\\operatorname{Ext}^{n+1}(M, N) \\cong \\operatorname{Ext}^{n}(K, N)$ ✓。',
          '**Tor 一侧（对偶：把短正合列张量 $N$）。** $\\otimes$ 右正合，故张量后 $P\\otimes N \\to M\\otimes N$ 仍满；左端的单射可以断掉，那正是 $\\operatorname{Tor}$ 冒出来的地方。取长正合列',
          '$$\\cdots \\to \\operatorname{Tor}_{n+1}(P, N) \\to \\operatorname{Tor}_{n+1}(M, N) \\to \\operatorname{Tor}_{n}(K, N) \\to \\operatorname{Tor}_{n}(P, N) \\to \\cdots$$',
          '$P$ 投射 $\\implies$ 平坦 $\\implies$ $\\operatorname{Tor}_{k}(P, N) = 0$（$k \\ge 1$），于是 $\\operatorname{Tor}_{n+1}(M, N) \\cong \\operatorname{Tor}_{n}(K, N)$ ✓。∎'
        ].join('\n'),
        '⭐ **为什么它叫「转移」**：把「$M$ 的 $n+1$ 次不变量」换成「它的合冲的 $n$ 次不变量」。于是任何关于 $\\operatorname{Ext}^{n}$ 的陈述都能**逐次降维**，直到落在 $\\operatorname{Ext}^{0} = \\operatorname{Hom}$ 或 $\\operatorname{Ext}^{1}$ 上 —— 这两个是唯一「看得见元素」的层次。',
        '⚠️ 条件「$P$ 投射」不能省：$\\operatorname{Ext}^{n+1}(M,N)\\cong\\operatorname{Ext}^n(K,N)$ 的证明完全靠 $P$ 的那一项消失。对一般短正合列只有一条**五段长正合列**，不是同构。',
        '**与合冲联用**：$\\operatorname{Ext}^{n}(M, N) \\cong \\operatorname{Ext}^{1}(\\Omega^{n-1}M, N)$，配上「一阶扩展的分类」，就把高次 Ext 变成了「$N$ 被 $\\Omega^{n-1}M$ 的扩张」。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · 维数转移（dimension shift）',
        'Weibel, An Introduction to Homological Algebra, 关于维数转移（dimension shifting）的部分'
      ]
    },

    {
      id: 'thm.ext-balanced',
      cluster: 'hom.resolution',
      type: 'theorem',
      label: '扩展群的双边算法',
      title: '扩展群可以用任意一侧的消解计算',
      regions: ['homology'],
      tags: ['定理', 'Ext', '消解', '导出范畴', '平衡函子'],
      statement: [
        '设 $P_{\\bullet} \\twoheadrightarrow M$ 是 $M$ 的投射消解（取删除消解），$M \\to I^{\\bullet}$ 是内射消解。则对每个 $R$-模 $N$ 与每个 $n \\ge 0$：',
        '',
        '$$H^{n}\\bigl(\\operatorname{Hom}_{R}(P_{\\bullet}, N)\\bigr) \\;\\cong\\; \\operatorname{Ext}^{n}_{R}(M, N) \\;\\cong\\; H^{n}\\bigl(\\operatorname{Hom}_{R}(M, I^{\\bullet})\\bigr).$$',
        '',
        '也就是说：$\\operatorname{Ext}$ 既可以用**第一个变量**的投射消解算（左边），也可以用**第二个变量**的内射消解算（右边），两边给出同一个群。'
      ].join('\n'),
      notes: [
        [
          '**证明（把两种算法都认成导出范畴里的同一个 Hom）。** 由 $\\operatorname{Ext}$ 的定义，$\\operatorname{Ext}^{n}_{R}(M, N) = \\operatorname{Hom}_{D(R)}(M, N[n])$，其中 $N$ 支在 $0$ 次。',
          '- **右边**：由「Ext 就是 RHom」，$H^{n}(\\operatorname{Hom}(M, I^{\\bullet})) = R^{n}\\operatorname{Hom}(M, N) = \\operatorname{Ext}^{n}(M, N)$ ✓。',
          '- **左边**：由「内射复形就是导出范畴」的对偶版本，$K^{-}(\\mathcal{P}) \\to D^{-}(R\\text{-}\\mathbf{Mod})$ 是等价，故 $P_{\\bullet}$ 在导出范畴里代表 $M$、$\\operatorname{Hom}_{K}(P_{\\bullet}, N[n]) = \\operatorname{Hom}_{D}(P_{\\bullet}, N[n])$ ✓。而 $H^{n}(\\operatorname{Hom}(P_{\\bullet}, N)) = \\operatorname{Hom}_{K}(P_{\\bullet}, N[n])$（同调第 $n$ 层就是「同伦类」那一步的标准换算）✓，于是左边也等于 $\\operatorname{Hom}_{D}(M, N[n])$ ✓。',
          '两条路落在同一个导出 Hom 上，所以两边相等 ✓。∎'
        ].join('\n'),
        '⭐ **实用价值**：挑好算的那一边。$M$ 有很短的（甚至两项的）投射消解时用左边 —— PID、正则局部环、Koszul 情形都是这样；$N$ 有很短的内射消解时用右边 —— 可除群、$\\mathbb{Q}/\\mathbb{Z}$ 这类。两边都不短时才需要谱序列。',
        '📌 **一般化的说法**：$\\operatorname{Hom}$ 是「在（投射, 内射）上平衡的双函子」，于是它的导出函子可以用任一侧的消解算。同一条道理对 $\\otimes$ 也成立 —— 那正是「挠积」两侧一致（交换环上）的来源。',
        '⚠️ 两边相等的前提是**两个消解都存在**（有足够多投射、有足够多内射）。不满足时只能谈导出范畴里的 Hom，不能谈消解。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · 平衡函子（balanced functor）与两边的 Ext 一致',
        'Weibel, An Introduction to Homological Algebra, 关于平衡函子（balanced functors）的部分'
      ]
    },

    {
      id: 'thm.ext1-extensions',
      cluster: 'hom.resolution',
      type: 'theorem',
      label: '一阶扩展的分类',
      title: '一阶扩展群与模扩张的等价类一一对应',
      regions: ['homology'],
      tags: ['定理', 'Ext', '扩张', 'Baer 和', '分裂'],
      statement: [
        '设 $M, N$ 是 $R$-模。$N$ 被 $M$ 的一个**扩张**是一条短正合列',
        '',
        '$$0 \\to N \\to E \\xrightarrow{\\ \\pi\\ } M \\to 0 .$$',
        '',
        '两个扩张之间若有使两个方形都交换的同构（在 $N$ 与 $M$ 上都取恒等），就叫**等价**。则：等价类与 $\\operatorname{Ext}^{1}_{R}(M, N)$ **一一对应**；在等价类上取 **Baer 和**使它成为一个阿贝尔群，与之同构。',
        '',
        '其中**分裂扩张**（$E \\cong N\\oplus M$）恰对应零元。'
      ].join('\n'),
      notes: [
        [
          '**证明（用一条投射预覆盖造映射）。** 取投射预覆盖 $0 \\to K \\to P \\xrightarrow{\\ p\\ } M \\to 0$。由维数转移，$\\operatorname{Ext}^{1}_{R}(M, N) \\cong \\operatorname{coker}\\bigl(\\operatorname{Hom}(P, N) \\to \\operatorname{Hom}(K, N)\\bigr)$ ✓。',
          '**① 从扩张到类。** 给定扩张 $0 \\to N \\to E \\to M \\to 0$，沿 $p$ 拉回：得 $0 \\to N \\to E_{0} \\to P \\to 0$，其中 $E_{0} = \\{\\, (e, x) : \\pi(e) = p(x) \\,\\}$。$P$ 投射，故这条列**分裂**，取分裂 $\\sigma : P \\to E_{0}$；复合 $K \\hookrightarrow P \\xrightarrow{\\sigma} E_{0} \\to N$ 给出 $\\theta \\in \\operatorname{Hom}(K, N)$ ✓。分裂的选取差一个 $\\operatorname{Hom}(P, N)$ 的元素，所以 $\\theta$ 的**类**在余核里是良定义的 ✓。',
          '**② 从类到扩张。** 给定 $\\theta : K \\to N$，作推出（pushout）：$E := (P \\oplus N)/\\{\\, (k, -\\theta k) : k \\in K \\,\\}$，得交换图与短正合列 $0 \\to N \\to E \\to M \\to 0$ ✓。',
          '**③ 两个方向互逆。** 由构造，①② 逐条对消（拉回后再推出同构于原扩张；反过来 $\\theta$ 的类被还原）✓。这一步用的是 ① 里「分裂差一个 $\\operatorname{Hom}(P,N)$」。',
          '**④ Baer 和。** 给定两个扩张 $E_{1}, E_{2}$，取 $M$ 上的纤维积 $E_{1}\\times_{M}E_{2}$（它在同一个 $M$ 上同时是两者的中间项），再商掉反对角线 $\\{\\, (n, -n) : n \\in N \\,\\}$ 的像 —— 得到的中间项记 $E_{1} + E_{2}$，即 Baer 和 ✓。逐条验：结合、交换来自纤维积与商；零元是 $N\\oplus M$（分裂扩张）；$E$ 的逆元是「把 $E\\to M$ 换成 $N\\to E$ 的负号」，即把 $E$ 里的 $N$ 反号 ✓。于是等价类成阿贝尔群 ✓。',
          '**⑤ 与 $\\operatorname{Ext}^{1}$ 的群结构一致。** ①② 那个双射把 Baer 和送到 $\\operatorname{Ext}^{1}$ 里的加法：两条扩张的类相加，其拉回分裂的选择可以并在一起取，于是 $\\theta$ 相加 ✓。∎'
        ].join('\n'),
        '⭐ **这是 $\\operatorname{Ext}^{1}$ 的「元素解释」**：$\\operatorname{Ext}^{1}$ 不是一组抽象的上同调类，它数的是**真正存在的中间项**。于是「$\\operatorname{Ext}^{1}(M, N) = 0$」有了一个可以手算的含义：**一切扩张都分裂**。',
        '📌 高次 $\\operatorname{Ext}$ 也有元素解释：$\\operatorname{Ext}^{n}(M, N)$ 分类「$Y$ 形如 $N \\to E_{1}\\to \\cdots \\to E_{n}\\to M$ 的 $n$ 次扩张」（长度 $n$ 的正合列的同伦类）。$\\operatorname{Ext}^{1}$ 这条是 $n = 1$ 的最简单情形。',
        '⚠️ 「等价」的严格含义：同构必须**恒等在两端**。允许两端也取（非恒等的）同构时，得到的分类会粗一档 —— 那种版本对应的是 $\\operatorname{Hom}$ 里可逆元的轨道，不再是一一对应。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · 扩张的等价类与一阶 Ext 一一对应（Baer sum）',
        'Mac Lane, Homology (1963), 扩张（extensions）的部分 · Ext 与扩张的对应'
      ]
    },

    /* ======================================================================
       六 · 平坦、挠积与结构定理（星团 hom.flat）
       ====================================================================== */

    {
      id: 'def.flat-module',
      cluster: 'hom.flat',
      type: 'definition',
      label: '平坦模',
      title: '平坦模：与它作张量仍保持正合',
      regions: ['homology'],
      tags: ['定义', '平坦模', '张量积', '正合'],
      statement: [
        '设 $R$ 是环、$F$ 是**右** $R$-模。$F$ 叫**平坦的**（flat），如果函子',
        '',
        '$$F \\otimes_{R} - : R\\text{-}\\mathbf{Mod} \\longrightarrow \\mathbf{Ab}$$',
        '',
        '是**正合**的。展开成一条要求：对每条短正合列 $0 \\to M_{1} \\to M \\to M_{2} \\to 0$，张量后',
        '',
        '$$0 \\to F\\otimes_{R} M_{1} \\to F\\otimes_{R} M \\to F\\otimes_{R} M_{2} \\to 0$$',
        '',
        '仍正合。（右端自动满，因为 $\\otimes$ 右正合；所以真正的要求只有「保住单射」。）'
      ].join('\n'),
      notes: [
        '**等价说法一大堆**，常用的是：',
        '',
        [
          '- $\\operatorname{Tor}_{n}^{R}(F, -) = 0$ 对一切 $n \\ge 1$（见「平坦当且仅当所有高次挠积为零」）；',
          '- 对每个**有限生成理想** $I \\subseteq R$，$F\\otimes I \\to F\\otimes R$ 是单射（**Lambek 判据**，只需验有限生成理想）；',
          '- $F = \\varinjlim F_{i}$，$F_{i}$ 有限生成自由（见「平坦模是有限生成自由模的滤过余极限」）。'
        ].join('\n'),
        '**谁平坦**：自由模、投射模（投射是自由模的直和项，而直和项保持平坦）、局部化 $S^{-1}R$（$\\otimes$ 与局部化交换，而 $R$ 上正合）。整环上平坦模必定**无挠**；主理想整环（更一般地，Bézout 整环）上反过来也对，所以那里「平坦 = 无挠」✓。',
        '⚠️ **平坦与投射不等价**：$\\mathbb{Q}$ 在 $\\mathbb{Z}$ 上平坦（$\\mathbb{Q}$ 无挠）却**不投射**（$\\mathbb{Q}$ 不自由，也不是自由模的直和项）。所以「平坦」确实比「投射」弱一档。',
        '⚠️ **与拓扑斯里的平坦不是一回事**：层的范畴里的「平坦阿贝尔群」是另一条定义（用滤过余极限 / 张量正合的双重条件），见「平坦阿贝尔层」。本条专指模范畴。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 特殊模（special modules）的部分 · 平坦模的定义与 Lambek 判据',
        'Weibel, An Introduction to Homological Algebra, 关于平坦模（flat modules）的部分'
      ]
    },

    {
      id: 'def.tor',
      cluster: 'hom.flat',
      type: 'definition',
      label: '挠积',
      title: '挠积：张量函子的左导出函子',
      regions: ['homology'],
      tags: ['定义', '挠积', 'Tor', '导出函子', '张量积'],
      statement: [
        '设 $R$ 是环，$M$ 是右 $R$-模、$N$ 是左 $R$-模，取 $M$ 的一条投射消解 $P_{\\bullet} \\twoheadrightarrow M$（用删除消解）。**挠积**定义为 $H_{n}(P_{\\bullet} \\otimes_{R} N)$，即',
        '',
        '$$\\operatorname{Tor}_{n}^{R}(M, N) := H_{n}\\bigl(P_{\\bullet} \\otimes_{R} N\\bigr).$$',
        '',
        '也就是说 $\\operatorname{Tor}_{n}^{R}(M, -)$ 是张量函子 $M\\otimes_{R} -$ 的第 $n$ 个**左导出函子**：$\\operatorname{Tor}_{0}^{R}(M, N) = M\\otimes_{R} N$，$\\operatorname{Tor}_{n}^{R}(M, N) = 0$（$n < 0$）。'
      ].join('\n'),
      notes: [
        '**良定义靠「消解的同伦唯一性」**：换一条投射消解，$P_{\\bullet}\\otimes N$ 只差一个同伦等价，同调不变 ✓。',
        '**名字里的 torsion（挠）是有根据的**：$\\mathbb{Z}$ 上 $\\operatorname{Tor}_{1}(\\mathbb{Q}/\\mathbb{Z}, A) \\cong A_{\\mathrm{tors}}$ —— 它把挠元挑了出来（见「一阶挠积算出阿贝尔群的挠子群」）。',
        '**两侧对称吗**：$\\operatorname{Tor}$ 本来定义在（右模, 左模）上；交换环上左右不分，于是可以写成对称的形式（见「交换环上挠积对两个变量对称」）。非交换时必须分清哪一侧是右模。',
        '📌 **与 Ext 的对照**：$\\operatorname{Ext}$ 是 $\\operatorname{Hom}$ 的**右**导出（用内射消解，补左正合的断口），$\\operatorname{Tor}$ 是 $\\otimes$ 的**左**导出（用投射消解，补右正合的断口）。两条长正合列的形状也一样，只是标号反向。',
        '⚠️ $\\operatorname{Tor}_{0}^{R}(M, N)$ 的「张量积」是由万有性质刻画的那一个（见「张量积对双线性映射万有」），不是另外定义的。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · Tor 的定义',
        'Weibel, An Introduction to Homological Algebra, 关于 Tor（torsion product）的部分'
      ]
    },

    {
      id: 'prop.tor-symmetry',
      cluster: 'hom.flat',
      type: 'proposition',
      label: '挠积的对称性',
      title: '交换环上挠积对两个变量对称',
      regions: ['homology'],
      tags: ['命题', '挠积', 'Tor', '交换环', '双复形'],
      statement: [
        '设 $R$ 是**交换环**，$M, N$ 是 $R$-模。则对一切 $n \\ge 0$：',
        '',
        '$$\\operatorname{Tor}_{n}^{R}(M, N) \\;\\cong\\; \\operatorname{Tor}_{n}^{R}(N, M).$$',
        '',
        '于是交换环上挠积可以只写一个符号、把两个变量当对称的看待。'
      ].join('\n'),
      notes: [
        [
          '**证明（双复形的两种算法）。** 取 $M, N$ 各自的投射消解 $P_{\\bullet} \\twoheadrightarrow M$、$Q_{\\bullet} \\twoheadrightarrow N$，作双复形 $P \\otimes Q$（$p$ 次行为 $P_{p}\\otimes Q_{q}$），取全复形 $T_{\\bullet}$。对它按**行**过滤：',
          '$$E_{p,q}^{1} = H_{q}\\bigl(P_{p}\\otimes Q_{\\bullet}\\bigr) = \\begin{cases} P_{p}\\otimes N , & q = 0 \\\\ 0 , & q \\ne 0 \\end{cases}$$',
          '（因为 $Q_{\\bullet} \\to N$ 是消解、$P_{p}$ 平坦，张量后仍正合）✓。于是谱序列在 $E^{1}$ 页就只剩一行，退化，得 $H_{n}(T_{\\bullet}) \\cong H_{n}(P_{\\bullet}\\otimes N) = \\operatorname{Tor}_{n}^{R}(M, N)$ ✓。',
          '再按**列**过滤（交换环上 $P\\otimes Q \\cong Q\\otimes P$，双复形转置）：同一步计算给出 $H_{n}(T_{\\bullet}) \\cong H_{n}(Q_{\\bullet}\\otimes M) = \\operatorname{Tor}_{n}^{R}(N, M)$ ✓。同一个 $H_{n}(T_{\\bullet})$ 被算出两次，故两者同构 ✓。∎'
        ].join('\n'),
        '⚠️ **「交换」不能省**：非交换时 $M\\otimes_{R} N$ 只在 $M$ 右、$N$ 左时有定义，$N\\otimes_{R} M$ 一般**根本没有定义**。错的方向是「$\\operatorname{Tor}_{n}^{R}(M,N) \\cong \\operatorname{Tor}_{n}^{R^{\\mathrm{op}}}(N,M)$」这种带对偶环的写法。',
        '⭐ 这条的实际用处：**计算时可以任选一边做消解**。例如算 $\\operatorname{Tor}_{n}^{R}(R/I, N)$ 时，通常用 $R/I$ 的两项消解（$0 \\to I \\to R \\to R/I \\to 0$）更省事 —— 有了对称性就知道这等价于对 $N$ 取消解。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · Tor 在交换环上的对称性',
        'Weibel, An Introduction to Homological Algebra, 关于 Tor 的对称性（symmetry）的部分'
      ]
    },

    {
      id: 'prop.tor-flat-vanishing',
      cluster: 'hom.flat',
      type: 'proposition',
      label: '平坦与挠积消失',
      title: '平坦当且仅当所有高次挠积为零',
      regions: ['homology'],
      tags: ['命题', '平坦模', '挠积', '消失', '判据'],
      statement: [
        '设 $R$ 是环、$F$ 是右 $R$-模。下列条件等价：',
        '',
        '1. $F$ **平坦**；',
        '2. 对每个左 $R$-模 $N$：$\\operatorname{Tor}_{1}^{R}(F, N) = 0$；',
        '3. 对每个左 $R$-模 $N$ 与每个 $n \\ge 1$：$\\operatorname{Tor}_{n}^{R}(F, N) = 0$。',
        '',
        '于是「平坦」恰好是「挠积全都消失」的模 —— 与「投射恰好是「$\\operatorname{Ext}$ 高次全消失」的模」严格平行。'
      ].join('\n'),
      notes: [
        [
          '**证明。**',
          '$(1) \\implies (3)$：取 $F$ 的一个投射消解 $P_{\\bullet} \\to F$。$F$ 平坦时 $\\operatorname{Tor}_{n}$ 还可以改用 $N$ 的消解来算，于是取 $N$ 的投射消解 $Q_{\\bullet}$：$N$ 一侧的消解给出 $\\operatorname{Tor}_{n}(F, N) = H_{n}(F\\otimes Q_{\\bullet})$；而 $F\\otimes -$ 正合、$Q_{\\bullet} \\to N$ 正合，故 $F\\otimes Q_{\\bullet}$ 只在 $0$ 次有同调，高次为零 ✓。',
          '$(3) \\implies (2)$：取 $n = 1$ ✓。',
          '$(2) \\implies (1)$：任取单射 $f : M_{1} \\rightarrowtail M$，要证 $F\\otimes M_{1} \\to F\\otimes M$ 单。把它塞进短正合列 $0 \\to M_{1} \\to M \\to M/M_{1} \\to 0$，张量 $F$ 取长正合列',
          '$$\\operatorname{Tor}_{1}^{R}(F,\\ M/M_{1}) \\to F\\otimes M_{1} \\to F\\otimes M \\to F\\otimes M/M_{1} \\to 0 ,$$',
          '左端为零（条件 2），故 $F\\otimes M_{1} \\to F\\otimes M$ 是**单射** ✓，即 $F\\otimes -$ 正合 ✓。∎'
        ].join('\n'),
        '⭐ **它把「平坦」变成了可以逐项验算的条件**：不必考察所有单射，只要对每一个 $N$ 算 $\\operatorname{Tor}_{1}$。实践中这条常与「只需要对有限生成理想验」的 Lambek 判据合用。',
        '📌 **推论**：平坦模的**直和项**平坦（$\\operatorname{Tor}$ 与直和交换）、直和**平坦**；投射模平坦（$\\operatorname{Ext}$ 一侧的高次消失是同一现象的对偶）。',
        '⚠️ 这里的 $\\operatorname{Tor}_{n}^{R}(F, -)$ 把 $F$ 当**右**模。非交换环上「$F$ 右平坦」与「$F$ 左平坦」（即 $\\operatorname{Tor}_{n}^{R}(-, F) = 0$）是**两条不同的条件**，本条只讲前者。交换环上左右不分，只谈一条即可 ✓。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · 平坦 ⟺ 高次 Tor 为零',
        'Weibel, An Introduction to Homological Algebra, 关于平坦模与 Tor 消失的部分'
      ]
    },

    {
      id: 'thm.tor-torsion',
      cluster: 'hom.flat',
      type: 'theorem',
      label: '挠积给出挠元',
      title: '一阶挠积算出阿贝尔群的挠子群',
      regions: ['homology'],
      tags: ['定理', '挠积', 'Tor', '挠元', '可除群'],
      statement: [
        '对任意阿贝尔群 $A$（即 $\\mathbb{Z}$-模）：',
        '',
        '$$\\operatorname{Tor}_{1}^{\\mathbb{Z}}\\bigl(\\mathbb{Q}/\\mathbb{Z},\\ A\\bigr) \\;\\cong\\; A_{\\mathrm{tors}} ,$$',
        '',
        '其中 $A_{\\mathrm{tors}}$ 是**挠子群**，即被某个正整数杀死的元素全体。更一般地，$R$ 是整环、$K$ 是分式域时，$\\operatorname{Tor}_{1}^{R}(K/R, M) \\cong M_{\\mathrm{tors}}$。'
      ].join('\n'),
      notes: [
        [
          '**证明（一条两项消解 + 一次长正合列）。** $\\mathbb{Q}/\\mathbb{Z}$ 有长度 $1$ 的自由消解',
          '$$0 \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{Q}/\\mathbb{Z} \\to 0 ,$$',
          '（$\\mathbb{Z} \\hookrightarrow \\mathbb{Q}$ 单、$\\mathbb{Q} \\twoheadrightarrow \\mathbb{Q}/\\mathbb{Z}$ 满，核恰好是 $\\mathbb{Z}$）。张量 $A$ 取长正合列：',
          '$$\\operatorname{Tor}_{1}^{\\mathbb{Z}}(\\mathbb{Q}, A) \\to \\operatorname{Tor}_{1}^{\\mathbb{Z}}(\\mathbb{Q}/\\mathbb{Z}, A) \\to \\mathbb{Z}\\otimes A \\xrightarrow{\\ \\alpha\\ } \\mathbb{Q}\\otimes A .$$',
          '$\\mathbb{Q}$ 在 $\\mathbb{Z}$ 上**平坦**（无挠），故第一项为零 ✓，于是 $\\operatorname{Tor}_{1}(\\mathbb{Q}/\\mathbb{Z}, A) \\cong \\ker\\alpha$ ✓。',
          '再识别 $\\alpha$：$\\mathbb{Z}\\otimes A \\cong A$、$\\mathbb{Q}\\otimes A \\cong A\\otimes_{\\mathbb{Z}}\\mathbb{Q}$，$\\alpha$ 就是 $a \\mapsto a\\otimes 1$。它的核恰是挠元 —— 若 $ka = 0$，则',
          '$$a\\otimes 1 = a\\otimes\\Bigl(k\\cdot\\frac{1}{k}\\Bigr) = (ka)\\otimes\\frac{1}{k} = 0 ;$$',
          '反之若 $a\\otimes 1 = 0$，则由张量积的显式构造（或「$\\mathbb{Q}$ 上有限个分母的通分」）存在 $k \\ge 1$ 使 $ka = 0$ ✓。于是 $\\operatorname{Tor}_{1}(\\mathbb{Q}/\\mathbb{Z}, A) \\cong A_{\\mathrm{tors}}$ ✓。∎'
        ].join('\n'),
        '⭐ **读法**：$\\mathbb{Q}/\\mathbb{Z}$ 是「所有有限阶循环群 $\\mathbb{Z}/k$ 装在一起的容器」，而 $\\operatorname{Tor}_{1}(\\mathbb{Q}/\\mathbb{Z}, A)$ 恰好把 $A$ 里所有有限阶的元素挑出来。同一条现象在 $\\operatorname{Hom}$ 那一侧对应 $\\operatorname{Hom}(\\mathbb{Q}/\\mathbb{Z}, A) = A_{\\mathrm{tors}}$（对偶的那一半，Pontryagin 对偶里到处在用）。',
        '📌 **一个健康检查**：若 $A$ 无挠（例如 $A = \\mathbb{Z}$、$\\mathbb{Q}$、$\\mathbb{R}$），结论说 $\\operatorname{Tor}_{1}^{\\mathbb{Z}}(\\mathbb{Q}/\\mathbb{Z}, A) = 0$ —— 与「无挠 $\\iff$ 平坦（PID 上）」一致 ✓。',
        '⚠️ 这里 **$\\operatorname{Tor}_{1}$ 而不是 $\\operatorname{Tor}_{0}$**：$\\operatorname{Tor}_{0}(\\mathbb{Q}/\\mathbb{Z}, A) = (\\mathbb{Q}/\\mathbb{Z})\\otimes A$，那是另一个东西（一般非零、且和挠元无关）。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · Tor 与挠（torsion）',
        'Weibel, An Introduction to Homological Algebra, 关于 Tor 与挠子群的部分'
      ]
    },

    {
      id: 'thm.lazard',
      cluster: 'hom.flat',
      type: 'theorem',
      label: '平坦模的结构定理',
      title: '平坦模是有限生成自由模的滤过余极限',
      regions: ['homology'],
      tags: ['定理', '平坦模', 'Lazard', '滤过余极限', '自由模'],
      statement: [
        '设 $R$ 是环。右 $R$-模 $F$ **平坦**，当且仅当存在有向集 $I$ 上的正向系 $(F_{i}, f_{ij})$ 与自然同构',
        '',
        '$$F \\;\\cong\\; \\varinjlim_{i \\in I} F_{i} ,$$',
        '',
        '其中每个 $F_{i}$ 是**有限生成自由** $R$-模，有向集上的过渡映射 $f_{ij} : F_{i} \\to F_{j}$ 都是模同态。'
      ].join('\n'),
      notes: [
        [
          '**证明（给骨架与关键一步）。**',
          '$(\\Longleftarrow)$ 有限生成自由模平坦；滤过余极限正合，故与 $\\otimes$ 交换，于是「每个 $F_{i}$ 上 $\\otimes$ 正合」升级为「$F$ 上正合」 ✓。',
          '$(\\Longrightarrow)$ 方向的心是**用有限生成自由模把 $F$ 逼近**。取遍所有 $R^{(n)} \\to F$（有限生成自由模到 $F$ 的映射），按「映射的像被包含」排成有向集，显然有 $F = \\varinjlim R^{(n)}$；但这样得到的系统不一定「滤过」得足够好（余极限的正确性要逐元素核验）。Lazard 的补救办法是**把有限呈现模也收进系统**：对每个有限呈现 $G$、每个映射 $G \\to F$ 与每个有限步的关系，用 $F$ 的平坦性把「有限的相容性数据」提升为真正的映射（平坦给出 $\\operatorname{Hom}(G,F)$ 上有限相容条件可以逐个满足），再取这些提升组成的系统 —— 它是有向的、滤过的，而余极限仍是 $F$ ✓。',
          '**关键的过滤性**：把上面那个有向系统重选 —— 对每个有限生成子模 $F_{0} \\subseteq F$ 取一个满射 $R^{(n)} \\twoheadrightarrow F_{0}$，过渡映射沿包含关系取相容的提升；重选后系统仍滤过（两条映射经由其像的和分解），余极限也不变。于是 $F \\cong \\varinjlim F_{i}$ 是滤过余极限。∎'
        ].join('\n'),
        '⭐ **意义**：它把平坦模说成「自由模的极限」，于是**凡是对有限生成自由模成立、且对滤过余极限保持的陈述，自动对平坦模成立**。这条路线比「直接对平坦模验」短得多 —— 例如「平坦模的挠积全消失」、「平坦模的直和仍平坦」都可以这样一句话推过去。',
        '📌 同一件事的另一种说法：平坦 = 「局部自由」的精确代数版本。在局部环上平坦 + 有限生成 $\\implies$ 自由（这是局部判据），而 Lazard 定理把它推广到任意环上的任意（不必有限生成的）模。',
        '⚠️ 「有限生成」不能换成「有限呈现」以外的更弱条件：「自由模的滤过余极限」这个描述本身是**等价**的，所以不能随意放宽任一半。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 特殊模（special modules）的部分 · Lazard 定理（平坦 = 有限生成自由模的滤过余极限）',
        'Lazard, Autour de la platitude, Bull. Soc. Math. France 97 (1969)'
      ]
    },

    {
      id: 'thm.watts',
      cluster: 'hom.flat',
      type: 'theorem',
      label: '张量函子的刻画',
      title: '保直和的右正合函子都同构于张量函子',
      regions: ['homology'],
      tags: ['定理', 'Watts', '右正合', '张量函子', '直和'],
      statement: [
        '设 $R$ 是**交换环**，$F : R\\text{-}\\mathbf{Mod} \\to R\\text{-}\\mathbf{Mod}$ 是**右正合**的加性函子，且 $F$ 与**任意直和**交换（$F\\bigl(\\bigoplus_{i} M_{i}\\bigr) \\cong \\bigoplus_{i} F(M_{i})$，自然）。则存在自然同构',
        '',
        '$$F(M) \\;\\cong\\; M \\otimes_{R} F(R) ,$$',
        '',
        '而且 $F(R)$ 上的 $R$-模结构由 $F$ 自动给出（不另作假设）。'
      ].join('\n'),
      notes: [
        [
          '**证明（自由模上验、右正合推广）。**',
          '**① $F(R)$ 是 $R$-模。** $R$ 上的左乘给出 $\\operatorname{End}_{R\\text{-}\\mathbf{Mod}}(R) \\cong R^{\\mathrm{op}}$ 的作用；$F$ 把它送到 $F(R)$ 的自同态，于是 $F(R)$ 自动带上模结构 ✓（交换环上左右不分，可以就写 $R$）。',
          '**② 自由模上成立。** 对 $M = R^{(I)} = \\bigoplus_{i \\in I} R$，保直和给出',
          '$$F\\bigl(R^{(I)}\\bigr) \\cong \\bigoplus_{i} F(R) \\cong R^{(I)}\\otimes_{R} F(R)$$',
          '（最后一步是「自由模张量＝按系数重排」）✓。',
          '**③ 一般模上由右正合推过去。** 取自由表现 $R^{(J)} \\to R^{(I)} \\to M \\to 0$。$F$ 右正合，保这个右正合列；而 $M\\otimes_{R}-$ 也右正合，保同一个右正合列。② 给出两端（$R^{(I)}$ 与 $R^{(J)}$ 处）的自然同构，于是两行比较、用「$F(M) \\to M\\otimes F(R)$ 那个自然变换在两侧都是同构」以及五项（或三项）引理，中间也是同构 ✓。',
          '说明：那个自然变换 $\\tau_{M} : F(M) \\to M\\otimes_{R} F(R)$ 的构造是「$M$ 的元素沿 $R \\to M$ 送入、再作用 $F$」的一般化 —— 它在自由模上由 ② 给出、与生成元选取无关 ✓。∎'
        ].join('\n'),
        '⭐ **它说的是「右正合 + 保直和」这个组合已经把函子锁死成张量函子** —— 于是要判定某个构造「是不是张量」，不必猜，只要验这两条再加一个 $F(R)$。',
        '📌 **推论（Eilenberg–Watts）**：范畴等价 $R\\text{-}\\mathbf{Mod} \\to S\\text{-}\\mathbf{Mod}$（保直和、正合）必然是 $M \\mapsto M\\otimes_{R} B$，其中 $B$ 是可逆双模 —— 这就是 Morita 等价的标准形状。',
        '⚠️ **「保直和」不能省**：证明的第二步要用 $F\\bigl(R^{(I)}\\bigr) \\cong \\bigoplus_{I} F(R)$ 对**任意**下标集 $I$ 成立；只保有限直和时，自由模上的比较就断了，也就没法过渡到一般模。⚠️ **「右正合」也不能省**：不右合时 $F(M)$ 不是自由模那一层的余核，两行根本对不起来。',
        '⚠️ **非交换版本**符号要小心：$F : R\\text{-}\\mathbf{Mod} \\to \\mathbf{Ab}$ 时 $F(R)$ 是右 $R$-模，同构写成 $F(M) \\cong F(R)\\otimes_{R} M$ —— 顺序反了。交换环上两种写法一致，所以本图采用交换的版本。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Ext 与 Tor 的部分 · Watts 定理（保直和的右正合函子都是张量）',
        'Watts, Intrinsic characterizations of some additive functors, Proc. Amer. Math. Soc. 11 (1960)'
      ]
    },

    /* ======================================================================
       七 · 系数扩张、嵌入定理的细化
       ====================================================================== */

    {
      id: 'thm.universal-coefficients',
      cluster: 'hom.complex',
      type: 'theorem',
      label: '万有系数定理',
      title: '万有系数定理：系数扩张之后的同调',
      regions: ['homology'],
      tags: ['定理', '万有系数', '同调', '挠积', '链复形', '分裂'],
      statement: [
        '设 $R$ 是**主理想整环**，$C_{\\bullet}$ 是**每项自由**的链复形，$A$ 是 $R$-模。则对每个 $n$ 存在自然短正合列',
        '',
        '$$0 \\to H_{n}(C)\\otimes_{R} A \\to H_{n}\\bigl(C\\otimes_{R} A\\bigr) \\to \\operatorname{Tor}_{1}^{R}\\bigl(H_{n-1}(C),\\ A\\bigr) \\to 0 .$$',
        '',
        '它**分裂**（但分裂映射一般不自然：它依赖「选一条分裂」）。',
        '',
        '于是 $H_{n}(C\\otimes_{R} A)$ 由 $H_{n}(C)\\otimes A$ 与一个挠项决定 —— 后者只依赖**低一次**的同调。'
      ].join('\n'),
      notes: [
        [
          '**证明（两条张量后的正合列，再比核与像）。** 记 $Z_{n} := \\ker d_{n}$、$B_{n} := \\operatorname{im} d_{n+1}$，于是 $H_{n}(C) = Z_{n}/B_{n}$。有两个短正合列',
          '$$0 \\to Z_{n} \\to C_{n} \\to B_{n-1} \\to 0 , \\qquad 0 \\to B_{n} \\to Z_{n} \\to H_{n}(C) \\to 0 .$$',
          '主理想整环上 $C_{n}$ 自由，故 $Z_{n}$、$B_{n-1}$ 都**自由**（自由模的子模自由），于是第一条**分裂**，张量 $A$ 后仍正合；又自由 $\\implies$ 平坦，故 $\\operatorname{Tor}_{1}^{R}(Z_{n}, A) = \\operatorname{Tor}_{1}^{R}(B_{n}, A) = 0$ ✓。',
          '**① 算中间的分子。** 把第一条张量 $A$ 后正合，得 $Z_{n}\\otimes A \\to C_{n}\\otimes A$ 单、其像为 $\\ker\\bigl(C_{n}\\otimes A \\to B_{n-1}\\otimes A\\bigr)$，于是',
          '$$H_{n}(C\\otimes A) = \\frac{\\ker\\bigl(Z_{n}\\otimes A \\to B_{n-1}\\otimes A\\bigr)}{\\operatorname{im}\\bigl(B_{n}\\otimes A \\to Z_{n}\\otimes A\\bigr)} .$$',
          '**② 两个端点。** 把第二条张量 $A$（用 $\\operatorname{Tor}_{1}(Z_{n},A) = 0$ 与 $\\operatorname{Tor}_{0} = \\otimes$）得正合段',
          '$$\\operatorname{Tor}_{1}^{R}\\bigl(H_{n}(C), A\\bigr) \\to B_{n}\\otimes A \\to Z_{n}\\otimes A \\to H_{n}(C)\\otimes A \\to 0 ,$$',
          '于是 $\\operatorname{im}\\bigl(B_{n}\\otimes A \\to Z_{n}\\otimes A\\bigr)$ 是某个映射的像、而 $H_{n}(C)\\otimes A$ 是它的**余核**；把同一条正合段在 $n-1$ 处再用一次，$\\operatorname{Tor}_{1}^{R}(H_{n-1}(C), A)$ 正是 $B_{n-1}\\otimes A \\to Z_{n-1}\\otimes A$ 的**核** ✓。',
          '**③ 拼起来。** 把 ① 记成 $H_{n}(C\\otimes A) = L/K$，其中 $L := \\ker(Z_{n}\\otimes A \\to B_{n-1}\\otimes A)$、$K := \\operatorname{im}(B_{n}\\otimes A \\to Z_{n}\\otimes A)$ ✓。',
          '下段由 ② 在 $n$ 处，得 $(Z_{n}\\otimes A)/K \\cong H_{n}(C)\\otimes A$ ✓；上段由 ② 在 $n-1$ 处，得 $\\operatorname{Tor}_{1}^{R}(H_{n-1}(C), A) = \\ker\\bigl(B_{n-1}\\otimes A \\to Z_{n-1}\\otimes A\\bigr)$ ✓。而第一条张量后正合给出 $Z_{n}\\otimes A \\twoheadrightarrow B_{n-1}\\otimes A$，所以 $L$ 正是这个核沿这条满射的**原像** —— 于是 $L/K$ 满射到 $\\operatorname{Tor}_{1}^{R}(H_{n-1}(C), A)$、核为 $K$ ✓。合起来即得短正合列',
          '$$0 \\to \\frac{Z_{n}\\otimes A}{K} \\to H_{n}(C\\otimes A) \\to \\operatorname{Tor}_{1}^{R}\\bigl(H_{n-1}(C), A\\bigr) \\to 0 ,$$',
          '左端就是 $H_{n}(C)\\otimes A$ ✓，正是要的那条 ✓。',
          '**④ 分裂。** 第一条短正合列分裂，故 $Z_{n}\\otimes A \\to B_{n-1}\\otimes A$ 可裂，于是 ③ 里的短正合列分裂 ✓。分裂的选法依赖 ① 中选定的截面，故一般**不自然** ✓。∎'
        ].join('\n'),
        '⭐ **最常见的用法**：$A$ 取成域（$\\mathbb{Z}$ 上的 $\\mathbb{Q}$、域 $k$ 上的 $k$），$\\operatorname{Tor}$ 项自动为零，于是',
        '',
        '$$H_{n}(C\\otimes_{R} k) \\cong H_{n}(C)\\otimes_{R} k ,$$',
        '',
        '「系数扩张到域上」只是把同调张过去，**不产生新的类**。反过来，$A$ 有挠时多出来的那一块就来自低一次同调 —— 这正是万有系数定理真正的内容。',
        '⚠️ **两条假设**：$R$ 主理想整环（保证子模自由）与 $C_{\\bullet}$ 每项自由。一般环上要换成「上边缘 $B_{n}$ 都投射」（即复形逐层分裂），否则 ① 的第一步就断。',
        '📌 同一条定理有**上同调版本**（$0 \\to \\operatorname{Ext}^{1}(H_{n-1}(C), A) \\to H^{n}(\\operatorname{Hom}(C, A)) \\to \\operatorname{Hom}(H_{n}(C), A) \\to 0$），两项的角色由 $\\operatorname{Tor}$ 换成 $\\operatorname{Ext}$。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), 万有系数定理（Universal Coefficient Theorem）的部分',
        'Weibel, An Introduction to Homological Algebra, 关于万有系数定理（universal coefficient theorem）的部分'
      ]
    },

    {
      id: 'prop.mitchell-exactness',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '嵌入定理的细化',
      title: '嵌入定理的细化：正合，且反射投射与内射',
      regions: ['homology'],
      tags: ['命题', 'Freyd-Mitchell', '嵌入', '正合', '反射', '投射对象', '内射对象'],
      statement: [
        '设 $\\mathcal{C}$ 是**小阿贝尔**范畴，$E : \\mathcal{C} \\to A\\text{-}\\mathbf{Mod}$ 是 Freyd–Mitchell 嵌入（全忠实、正合）。则',
        '',
        '1. $E$ **正合**：保有限极限与有限余极限，把核、余核、像与短正合列原样搬过去；',
        '2. $E$ **反射**投射与内射对象：若 $EP$ 在 $A\\text{-}\\mathbf{Mod}$ 里投射，则 $P$ 在 $\\mathcal{C}$ 里投射（内射同理：$EI$ 内射 $\\implies$ $I$ 内射）；',
        '3. 于是「某个对象在 $\\mathcal{C}$ 里投射 / 内射」这件事，可以搬到模范畴里判 —— 那边有元素、有直和项、有显式的自由模，判起来容易得多。',
        '',
        '这是「追元素」最常用的那一步的精确形式：**难点在 $\\mathcal{C}$，验算放在 $A\\text{-}\\mathbf{Mod}$**。'
      ].join('\n'),
      notes: [
        [
          '**证明（只用到「全忠实 + 正合」）。**',
          '**① 正合。** 这是 Freyd–Mitchell 定理陈述的一部分（正合 = 保有限极限与有限余极限），于是核、余核、像、短正合列都被原样搬过去 ✓。',
          '**② 反射投射。** 设 $EP$ 在 $A\\text{-}\\mathbf{Mod}$ 里投射，即 $\\operatorname{Hom}_{A\\text{-}\\mathbf{Mod}}(EP, -)$ 正合。把它限制到 $E$ 的像上仍然正合；而 $E$ 全忠实给出自然同构',
          '$$\\operatorname{Hom}_{\\mathcal{C}}(P, X) \\;\\cong\\; \\operatorname{Hom}_{A\\text{-}\\mathbf{Mod}}(EP, EX),$$',
          '所以 $\\operatorname{Hom}_{\\mathcal{C}}(P, -)$ 正合 ✓，即 $P$ 在 $\\mathcal{C}$ 里投射 ✓。（用到的只有「$E$ 全忠实」—— 一个满射被 $E$ 送到满射是因为 $E$ 正合、保商。）',
          '**③ 反射内射。** 对偶：$\\operatorname{Hom}_{\\mathcal{C}}(-, I) \\cong \\operatorname{Hom}(-, EI)$，$EI$ 内射使右边把单态射送到满态射；而 $E$ 正合把 $\\mathcal{C}$ 里的单态射送到单态射，于是左边也如此 ✓。',
          '**④ 注意方向。** 上面证的是「模范畴里投射 $\\implies$ $\\mathcal{C}$ 里投射」，用起来正好：想在 $\\mathcal{C}$ 里认定 $P$ 投射，就到 $A\\text{-}\\mathbf{Mod}$ 里验 $EP$ 投射。∎'
        ].join('\n'),
        '⭐ **为什么「反射」这个方向才是好用的那一半**：模范畴里判投射有现成手段（直和项、$\\operatorname{Ext}^{1}$ 消失、Baer 型判据），而在抽象的小阿贝尔范畴里几乎没办法下手。反射把「$\\mathcal{C}$ 里的难题」变成「模范畴里的易题」。',
        '⚠️ **另一半（$\\mathcal{C}$ 里投射 $\\implies EP$ 投射）不是本条断言的东西**，它也不是「全忠实 + 正合」这两条能直接给出的：要得到它得额外用嵌入的具体构造（Mitchell 的构造是「取 Hom 进模范畴」的米田型函子，在标准构造下这一半确实成立）。本图不在此处主张它 —— 需要时请引用具体构造。',
        '⚠️ **不要过度承诺**：$E$ 一般**不**保无穷余积与无穷积（除非另加 AB4 之类的完备性条件）。所以「用余积造的构造」（例如生成元的自由消解）不能无条件搬过去。',
        '📌 与 Giraud 定理的分工：Giraud 把拓扑斯嵌成预层范畴的正合反射子范畴；Freyd–Mitchell 把小阿贝尔范畴嵌成模范畴的全忠实正合子范畴。两条都是「找一个具体的大范畴装下自己」，本条补的是「装进去之后，哪些性质可以往回搬」。'
      ].join('\n\n'),
      refs: [
        'Freyd, Abelian Categories (1964), 嵌入定理（full embedding theorem）的部分',
        'Mitchell, The full imbedding theorem, Amer. J. Math. 86 (1964)'
      ]
    }

  ],

  edges: [

    /* ------------------------------------------------------- 定义引用（蓝线） */

    {
      id: 'def-link.comparison-res',
      kind: 'definition',
      definition: 'def.resolution',
      usedBy: 'thm.comparison-theorem',
      note: '比较的正是两条**投射消解**之间的链映射 —— 消解这条定义的两个实例。'
    },
    {
      id: 'def-link.comparison-projobj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'thm.comparison-theorem',
      note: '逐层抬升的每一步都靠投射对象的提升性质；同伦的每一步也一样。'
    },
    {
      id: 'def-link.homotopy-res',
      kind: 'definition',
      definition: 'def.homotopy',
      usedBy: 'prop.resolution-homotopy',
      note: '结论里的「同伦等价」用的就是链同伦这条定义。'
    },
    {
      id: 'def-link.deleted-projobj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'def.deleted-resolution',
      note: '删除消解要求每一项都投射，否则求导时的复形不会只在 $0$ 次以外出现同调。'
    },
    {
      id: 'def-link.horse-enough',
      kind: 'definition',
      definition: 'def.enough-projectives',
      usedBy: 'lem.horseshoe',
      note: '两端各有投射消解这件事，靠的是「有足够多投射对象」。'
    },
    {
      id: 'def-link.horse-split',
      kind: 'definition',
      definition: 'def.split-exact',
      usedBy: 'lem.horseshoe',
      note: '每一层 $0 \\to P_{n} \\to R_{n} \\to Q_{n} \\to 0$ 都是分裂短正合列，于是取同调的长正合列才可用。'
    },
    {
      id: 'def-link.syzygy-module',
      kind: 'definition',
      definition: 'def.module',
      usedBy: 'def.syzygy',
      note: '合冲是 $R$-模的核，整条定义都活在模范畴里。'
    },
    {
      id: 'def-link.schanuel-projobj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'lem.schanuel',
      note: '纤维积的两条投影要能分裂，用的正是 $P$ 与 $P_{1}$ 投射。'
    },
    {
      id: 'def-link.schanuel-module',
      kind: 'definition',
      definition: 'def.module',
      usedBy: 'lem.schanuel',
      note: '结论是 $R$-模的直和同构，两条短正合列都在 $R$-模范畴里。'
    },
    {
      id: 'def-link.syzstab-syzygy',
      kind: 'definition',
      definition: 'def.syzygy',
      usedBy: 'prop.syzygy-stability',
      note: '稳定性说的就是「第 $n$ 合冲」这个对象差多少才算变。'
    },
    {
      id: 'def-link.projdim-res',
      kind: 'definition',
      definition: 'def.resolution',
      usedBy: 'def.projective-dimension',
      note: '投射维数量的就是最短投射消解的长度。'
    },
    {
      id: 'def-link.injdim-res',
      kind: 'definition',
      definition: 'def.resolution',
      usedBy: 'def.injective-dimension',
      note: '内射维数量的是最短内射消解的长度。'
    },
    {
      id: 'def-link.gldim-projdim',
      kind: 'definition',
      definition: 'def.projective-dimension',
      usedBy: 'def.global-dimension',
      note: '整体维数是全体投射维数的上确界。'
    },
    {
      id: 'def-link.pdvan-ext',
      kind: 'definition',
      definition: 'def.ext',
      usedBy: 'prop.pd-vanishing',
      note: '判据说的是扩展群在哪些次数上消失。'
    },
    {
      id: 'def-link.pdvan-projobj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.pd-vanishing',
      note: '等价条件之一是「第 $n$ 合冲投射」，那一侧用的就是投射对象的定义。'
    },
    {
      id: 'def-link.dimshift-syzygy',
      kind: 'definition',
      definition: 'def.syzygy',
      usedBy: 'prop.dimension-shift',
      note: '维数转移把 $M$ 换成它的一个合冲，于是高一次的群落到低一次上。'
    },
    {
      id: 'def-link.extbalanced-res',
      kind: 'definition',
      definition: 'def.resolution',
      usedBy: 'thm.ext-balanced',
      note: '定理比较的两条算法分别用投射消解与内射消解。'
    },
    {
      id: 'def-link.extbalanced-derived',
      kind: 'definition',
      definition: 'def.right-derived-functor',
      usedBy: 'thm.ext-balanced',
      note: '两边都是 $\\operatorname{Hom}$ 的导出函子，只是换了算它的那一侧。'
    },
    {
      id: 'def-link.ext1-ext',
      kind: 'definition',
      definition: 'def.ext',
      usedBy: 'thm.ext1-extensions',
      note: '被分类的就是一阶扩展群 $\\operatorname{Ext}^{1}$。'
    },
    {
      id: 'def-link.ext1-dimshift',
      kind: 'definition',
      definition: 'prop.dimension-shift',
      usedBy: 'thm.ext1-extensions',
      note: '把 $\\operatorname{Ext}^{1}$ 写成 $\\operatorname{coker}$ 的那一步，正是维数转移。'
    },
    {
      id: 'def-link.flat-module',
      kind: 'definition',
      definition: 'def.module',
      usedBy: 'def.flat-module',
      note: '平坦性说的是 $R$-模范畴里张量函子的正合性。'
    },
    {
      id: 'def-link.flat-exact',
      kind: 'definition',
      definition: 'def.exact-functor',
      usedBy: 'def.flat-module',
      note: '「$-\\otimes_{R} F$ 正合」用的正是正合函子这条定义。'
    },
    {
      id: 'def-link.tor-derived',
      kind: 'definition',
      definition: 'def.right-derived-functor',
      usedBy: 'def.tor',
      note: '挠积是张量函子的左导出函子 —— 与右导出只差把内射换成投射。'
    },
    {
      id: 'def-link.tor-tensor',
      kind: 'definition',
      definition: 'prop.module-tensor-universal',
      usedBy: 'def.tor',
      note: '挠积的 $0$ 次项就是由万有性质刻画的那个张量积。'
    },
    {
      id: 'def-link.torsym-tor',
      kind: 'definition',
      definition: 'def.tor',
      usedBy: 'prop.tor-symmetry',
      note: '对称性说的是同一个挠积符号在两边的两种读法。'
    },
    {
      id: 'def-link.torflat-flat',
      kind: 'definition',
      definition: 'def.flat-module',
      usedBy: 'prop.tor-flat-vanishing',
      note: '判据刻画的就是平坦性本身。'
    },
    {
      id: 'def-link.tortorsion-tor',
      kind: 'definition',
      definition: 'def.tor',
      usedBy: 'thm.tor-torsion',
      note: '定理算的是一阶挠积。'
    },
    {
      id: 'def-link.tortorsion-flat',
      kind: 'definition',
      definition: 'def.flat-module',
      usedBy: 'thm.tor-torsion',
      note: '证明里用 $\\mathbb{Q}$ 在 $\\mathbb{Z}$ 上平坦来杀掉靠近零的那一项。'
    },
    {
      id: 'def-link.lazard-flat',
      kind: 'definition',
      definition: 'def.flat-module',
      usedBy: 'thm.lazard',
      note: '定理给的就是平坦模的结构，两侧是同一个概念的两副面孔。'
    },
    {
      id: 'def-link.watts-additive',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'thm.watts',
      note: '定理的前提是加性函子。'
    },
    {
      id: 'def-link.watts-exact',
      kind: 'definition',
      definition: 'def.exact-functor',
      usedBy: 'thm.watts',
      note: '另一条前提是右正合。'
    },
    {
      id: 'def-link.uct-complex',
      kind: 'definition',
      definition: 'def.cochain-complex',
      usedBy: 'thm.universal-coefficients',
      note: '定理说的是把链复形张量系数之后取同调。'
    },
    {
      id: 'def-link.uct-homology',
      kind: 'definition',
      definition: 'def.cohomology',
      usedBy: 'thm.universal-coefficients',
      note: '两端的 $H_{n}$ 都是复形的同调。'
    },
    {
      id: 'def-link.uct-snake',
      kind: 'definition',
      definition: 'thm.snake-lemma',
      usedBy: 'thm.universal-coefficients',
      note: '证明最后一步是把两条张量后的正合列摆在一起追图 —— 用的就是蛇引理那套。'
    },
    {
      id: 'def-link.mitchell-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.mitchell-exactness',
      note: '讨论的场地是小阿贝尔范畴与它的模范畴实现。'
    },
    {
      id: 'def-link.gldimpid-projdim',
      kind: 'definition',
      definition: 'def.projective-dimension',
      usedBy: 'cor.gldim-pid',
      note: '结论是「每个模的投射维数不超过一」，于是整体维数不超过一。'
    },

    /* ---------------------------------------------------------- 推导（黑箭头） */

    {
      id: 'imp-link.comparison-reshomotopy',
      kind: 'implication',
      sources: ['thm.comparison-theorem'],
      target: 'prop.resolution-homotopy',
      title: '比较定理（取恒等映射）$\\implies$ 两条消解同伦等价',
      proof: [
        '把比较定理用到 $f = 1_{M} : M \\to M$ 上：存在性给出提升 $\\varphi : P_{\\bullet} \\to Q_{\\bullet}$，同伦唯一性说任意两个提升同伦。',
        '再把两条消解**互换**用一次，得提升 $\\psi : Q_{\\bullet} \\to P_{\\bullet}$。',
        '复合 $\\psi\\varphi$ 与 $1_{P_{\\bullet}}$ 都是 $1_{M}$ 的提升（增广处都等于 $\\varepsilon$），故由同伦唯一性 $\\psi\\varphi \\sim 1_{P_{\\bullet}}$ ✓；另一边同理 ✓。这正是同伦等价。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.reshomotopy-extbal',
      kind: 'implication',
      sources: ['prop.resolution-homotopy', 'thm.k-plus-injectives'],
      target: 'thm.ext-balanced',
      title: '消解同伦唯一 + 内射复形就是导出范畴 $\\implies$ 两种算法一致',
      proof: [
        '两种算法都是在算导出范畴里的同一个 Hom：$\\operatorname{Ext}^{n}_{R}(M, N) = \\operatorname{Hom}_{D(R)}(M, N[n])$。',
        '- **右侧**（内射算法）：由「内射复形就是导出范畴」的等价 $K^{+}(\\mathcal{I}) \\simeq D^{+}$，$\\operatorname{Hom}_{D}(M, N[n]) = \\operatorname{Hom}_{K}(M, I^{\\bullet}[n]) = H^{n}\\operatorname{Hom}(M, I^{\\bullet})$ ✓。',
        '- **左侧**（投射算法）：由同一条定理的对偶 $K^{-}(\\mathcal{P}) \\simeq D^{-}$，$P_{\\bullet}$ 在导出范畴里代表 $M$，于是 $\\operatorname{Hom}_{D}(M, N[n]) = \\operatorname{Hom}_{K}(P_{\\bullet}, N[n]) = H^{n}\\operatorname{Hom}(P_{\\bullet}, N)$ ✓。',
        '两条路落在同一个群里，故两者相等 ✓。而「换成别的投射消解结果不变」正是消解的同伦唯一性给的 —— 少了它，左边的写法没有意义 ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.dimshift-extrhom',
      kind: 'implication',
      sources: ['prop.ext-is-rhom', 'thm.long-exact', 'prop.ext-projective-vanishes'],
      target: 'prop.dimension-shift',
      title: 'Ext 就是 RHom + 长正合列 + 投射没有高次 Ext $\\implies$ 维数转移',
      proof: [
        '取 $N$ 的内射消解 $N \\to I^{\\bullet}$。$I^{k}$ 内射，故 $\\operatorname{Hom}(-, I^{k})$ 正合，把 $0 \\to K \\to P \\to M \\to 0$ 逐项作用后得到**复形的短正合列**',
        '$$0 \\to \\operatorname{Hom}(M, I^{\\bullet}) \\to \\operatorname{Hom}(P, I^{\\bullet}) \\to \\operatorname{Hom}(K, I^{\\bullet}) \\to 0 .$$',
        '由「短正合列给出长正合列」取上同调，得',
        '$$\\cdots \\to \\operatorname{Ext}^{n}(M, N) \\to \\operatorname{Ext}^{n}(P, N) \\to \\operatorname{Ext}^{n}(K, N) \\xrightarrow{\\ \\delta\\ } \\operatorname{Ext}^{n+1}(M, N) \\to \\operatorname{Ext}^{n+1}(P, N) \\to \\cdots$$',
        '（$\\operatorname{Ext}^{n}(-, N) = R^{n}\\operatorname{Hom}(-, N)$ 由「Ext 就是 RHom」给出 ✓。）',
        '$P$ 投射使 $\\operatorname{Ext}^{k}(P, N) = 0$（$k \\ge 1$），故 $\\delta$ 两端都是零群，$\\delta$ 是双射：$\\operatorname{Ext}^{n+1}(M, N) \\cong \\operatorname{Ext}^{n}(K, N)$ ✓。',
        'Tor 一侧照抄：张量 $N$ 取长正合列，$P$ 投射 $\\implies$ 平坦 $\\implies$ $\\operatorname{Tor}_{k}(P, N) = 0$（$k \\ge 1$），于是 $\\operatorname{Tor}_{n+1}(M, N) \\cong \\operatorname{Tor}_{n}(K, N)$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.dimshift-pdvan',
      kind: 'implication',
      sources: ['prop.dimension-shift', 'thm.ext1-extensions'],
      target: 'prop.pd-vanishing',
      title: '维数转移 + 一阶扩展的分类 $\\implies$ 投射维数的消失刻画',
      proof: [
        '$(1) \\implies (3)$：长度 $n$ 的投射消解在 $k > n$ 处为零，于是 $\\operatorname{Hom}(P_{\\bullet}, N)$ 在 $k > n$ 处为零，上同调为零 ✓。',
        '$(3) \\implies (4)$：取 $k = n+1$ ✓。',
        '$(4) \\implies (1)$：由维数转移连用 $n$ 次，$\\operatorname{Ext}^{n+1}_{R}(M, N) \\cong \\operatorname{Ext}^{1}_{R}(\\Omega^{n}M, N)$ ✓（这里用到「用投射消解算与用内射消解算给出同一个群」，即两种算法一致，所以维数转移的两个方向都可靠）。',
        '条件 (4) 于是说的是 $\\operatorname{Ext}^{1}_{R}(\\Omega^{n}M, -)$ 恒为零。若 $\\Omega^{n}M$ 不投射，取自由模盖住它得 $0 \\to L \\to F \\to \\Omega^{n}M \\to 0$，它不分裂，由「一阶扩展的分类」这条路对应 $\\operatorname{Ext}^{1}(\\Omega^{n}M, L)$ 里的**非零**类，矛盾 ✓。故 $\\Omega^{n}M$ 投射，即 (1) ✓。',
        '$(1) \\iff (2)$ 是合冲的定义重述 ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.schanuel-syzstab',
      kind: 'implication',
      sources: ['lem.schanuel'],
      target: 'prop.syzygy-stability',
      title: '合冲比较引理（逐层使用）$\\implies$ 合冲在相差投射直和项下唯一',
      proof: [
        '$n = 1$ 直接是合冲比较引理：两条预覆盖的中间项 $P_{0}, Q_{0}$ 都投射，故 $P_{0}\\oplus\\Omega_{1}M \\cong Q_{0}\\oplus\\Omega M$ ✓。',
        '归纳步：设 $\\Omega^{n}M \\oplus F \\cong \\Omega_{1}^{n}M \\oplus F_{1}$（$F, F_{1}$ 投射）。把直和项并进去，得两条**目标相同、中间项相同**的预覆盖',
        '$$P_{n}\\oplus Q_{n} \\twoheadrightarrow \\Omega^{n}M\\oplus F, \\qquad P_{n}\\oplus Q_{n} \\twoheadrightarrow \\Omega_{1}^{n}M\\oplus F_{1},$$',
        '再用一次比较引理即得 $\\Omega^{n+1}M \\oplus (P_{n}\\oplus Q_{n}) \\cong \\Omega_{1}^{n+1}M \\oplus (P_{n}\\oplus Q_{n})$ ✓，而 $P_{n}\\oplus Q_{n}$ 投射 ✓。',
        '于是「$\\Omega^{n}M$ 投射」与「$\\Omega_{1}^{n}M$ 投射」等价：一边投射时 $\\Omega^{n}M\\oplus F$ 投射，故另一边的 $\\Omega_{1}^{n}M$ 是投射模的直和项、仍投射 ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.pdvan-gldimpid',
      kind: 'implication',
      sources: ['prop.pd-vanishing', 'prop.ext-abelian-groups'],
      target: 'cor.gldim-pid',
      title: '维数消失刻画 + 阿贝尔群只有 $0$、$1$ 次 Ext $\\implies$ 主理想整环的整体维数',
      proof: [
        '主理想整环上，任取自由模盖住 $M$，其核是自由模的子模、仍自由，故 $M$ 有长度 $1$ 的自由消解 ✓。由「投射维数与消失刻画」的 $(2) \\implies (1)$，$\\operatorname{pd}_{R}M \\le 1$ 对一切 $M$ ✓，故 $\\operatorname{gl.dim} R \\le 1$ ✓。',
        '$\\mathbb{Z}$ 上「只有 $0$、$1$ 次 Ext」那条命题说的正是「$\\operatorname{Ext}^{n}(-, -) = 0$ 对一切 $n \\ge 2$」，由消失刻画这等价于「所有模的投射维数不超过 $1$」✓ —— 两条是同一句话。',
        '再定值：$R$ 是域时每个模自由，$\\operatorname{pd} = 0$，$\\operatorname{gl.dim} = 0$ ✓；$R$ 不是域时取非零非单位的 $a$，$R/(a)$ 不投射（否则 $(a)$ 是 $R$ 的直和项，而整环里没有非平凡幂等元），故 $\\operatorname{pd}_{R}R/(a) = 1$，$\\operatorname{gl.dim} R = 1$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.snake-horseshoe',
      kind: 'implication',
      sources: ['thm.snake-lemma', 'thm.long-exact'],
      target: 'lem.horseshoe',
      title: '长正合列（蛇引理）$\\implies$ 马蹄引理',
      proof: [
        '按马蹄引理的构造，取 $R_{n} = P_{n}\\oplus Q_{n}$、微分 $d_{n} = \\begin{pmatrix} d_{n}^{P} & \\chi_{n} \\\\ 0 & e_{n}\\end{pmatrix}$，其中 $\\chi_{n}$ 归纳地由 $Q_{n}$ 的投射性抬升得出，使 $d^{2} = 0$ ✓。',
        '于是 $0 \\to P_{\\bullet} \\to R_{\\bullet} \\to Q_{\\bullet} \\to 0$ 是**逐项分裂**的复形短正合列。对它用「短正合列给出长正合列」：',
        '$$\\cdots \\to H_{n}(P) \\to H_{n}(R) \\to H_{n}(Q) \\xrightarrow{\\ \\delta\\ } H_{n-1}(P) \\to \\cdots$$',
        '两端是消解，故 $H_{n}(P) = H_{n}(Q) = 0$（$n \\ge 1$）、$H_{0}(P) \\cong M_{1}$、$H_{0}(Q) \\cong M_{2}$ ✓。逐段读：$n \\ge 2$ 时 $H_{n}(R)$ 被两个零夹住；$n = 1$ 时 $0 \\to H_{1}(R) \\to 0$；$n = 0$ 时 $M_{1} \\to H_{0}(R) \\to M_{2} \\to 0$ 与原来的短正合列比较得 $H_{0}(R) \\cong M$ ✓。',
        '（追图部分用蛇引理把 $\\delta$ 与边际映射对齐，正是「长正合列」那条定理证明里的那一步。）于是 $R_{\\bullet}$ 是 $M$ 的投射消解 ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.lazard-torflat',
      kind: 'implication',
      sources: ['thm.lazard'],
      target: 'prop.tor-flat-vanishing',
      title: '平坦 = 有限生成自由模的滤过余极限 $\\implies$ 平坦当且仅当高次挠积全消失',
      proof: [
        '$(1) \\implies (3)$：由 Lazard，$F \\cong \\varinjlim F_{i}$，$F_{i}$ 有限生成自由。对任意 $N$ 取投射消解 $Q_{\\bullet} \\to N$，则',
        '$$\\operatorname{Tor}_{n}^{R}(F, N) = H_{n}(F\\otimes Q_{\\bullet}) = H_{n}\\bigl(\\varinjlim_{i} (F_{i}\\otimes Q_{\\bullet})\\bigr) = \\varinjlim_{i} H_{n}(F_{i}\\otimes Q_{\\bullet}) = \\varinjlim_{i} \\operatorname{Tor}_{n}^{R}(F_{i}, N),$$',
        '其中「$H_{n}$ 与滤过余极限交换」用的是滤过余极限**正合** ✓。而 $F_{i}$ 自由 $\\implies$ 平坦 $\\implies$ $\\operatorname{Tor}_{n}(F_{i}, N) = 0$（$n \\ge 1$）✓，故 $\\operatorname{Tor}_{n}(F, N) = 0$ ✓。',
        '$(3) \\implies (2)$ 显然；$(2) \\implies (1)$ 用张量后的长正合列：$\\operatorname{Tor}_{1}(F, M/M_{1}) = 0$ 使 $F\\otimes M_{1}\\to F\\otimes M$ 单，故 $F\\otimes-$ 正合 ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.torflat-tortorsion',
      kind: 'implication',
      sources: ['prop.tor-flat-vanishing'],
      target: 'thm.tor-torsion',
      title: '平坦 $\\implies$ 挠积消失 $\\implies$ 一阶挠积算出挠子群',
      proof: [
        '$\\mathbb{Q}$ 在 $\\mathbb{Z}$ 上无挠，故平坦 ✓。对两项消解 $0 \\to \\mathbb{Z} \\to \\mathbb{Q} \\to \\mathbb{Q}/\\mathbb{Z} \\to 0$ 张量 $A$，取长正合列',
        '$$\\operatorname{Tor}_{1}^{\\mathbb{Z}}(\\mathbb{Q}, A) \\to \\operatorname{Tor}_{1}^{\\mathbb{Z}}(\\mathbb{Q}/\\mathbb{Z}, A) \\to \\mathbb{Z}\\otimes A \\xrightarrow{\\ \\alpha\\ } \\mathbb{Q}\\otimes A .$$',
        '由「平坦 $\\implies$ 高次挠积为零」，第一项为零 ✓，于是 $\\operatorname{Tor}_{1}(\\mathbb{Q}/\\mathbb{Z}, A) \\cong \\ker\\alpha$ ✓。',
        '而 $\\alpha$ 就是 $a \\mapsto a\\otimes 1$：若 $ka = 0$ 则 $a\\otimes 1 = (ka)\\otimes\\frac{1}{k} = 0$；反之 $a\\otimes 1 = 0$ 迫使 $a$ 有有限阶（把 $\\mathbb{Q}$ 的元素写成有限个分母的通分即可看出）✓。故 $\\ker\\alpha = A_{\\mathrm{tors}}$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.dimshift-ext1',
      kind: 'implication',
      sources: ['prop.dimension-shift'],
      target: 'thm.ext1-extensions',
      title: '维数转移的显式形式 $\\implies$ 一阶扩展与扩张的等价类一一对应',
      proof: [
        '取投射预覆盖 $0 \\to K \\to P \\xrightarrow{p} M \\to 0$。由维数转移（$n = 0$ 的那一档展开成余核）',
        '$$\\operatorname{Ext}^{1}_{R}(M, N) \\cong \\operatorname{coker}\\bigl(\\operatorname{Hom}(P, N) \\xrightarrow{\\ \\circ d\\ } \\operatorname{Hom}(K, N)\\bigr).$$',
        '**扩张 $\\to$ 类**：沿 $p$ 拉回得 $0 \\to N \\to E_{0} \\to P \\to 0$，$P$ 投射使这条列分裂，取截面 $\\sigma$ 后复合出 $K \\to N$；换一个截面差一个 $\\operatorname{Hom}(P, N)$ 的元素，故在**余核**里良定义 ✓。',
        '**类 $\\to$ 扩张**：给定 $\\theta : K \\to N$，作推出 $E := (P\\oplus N)/\\{(k, -\\theta k)\\}$，得 $0 \\to N \\to E \\to M \\to 0$ ✓。',
        '两个方向逐条对消（拉回再推出同构于原扩张；推出再拉回还原 $\\theta$ 的类）$\\implies$ 一一对应 ✓。',
        '**群结构**：Baer 和（纤维积后商掉反对角线）逐条满足结合、交换、零元（分裂扩张）、逆元（把 $N$ 反号），而上面那个双射把它送到余核里的加法 —— 因为两条扩张可以**共用**一次拉回与一个截面，于是 $\\theta$ 直接相加 ✓。∎'
      ].join('\n')
    },
    {
      id: 'imp-link.fm-mitchell',
      kind: 'implication',
      sources: ['thm.freyd-mitchell'],
      target: 'prop.mitchell-exactness',
      title: 'Freyd–Mitchell 嵌入 $\\implies$ 它还反射投射与内射',
      proof: [
        '嵌入 $E$ 全忠实，于是对任意 $X \\in \\mathcal{C}$ 有自然同构 $\\operatorname{Hom}_{\\mathcal{C}}(P, X) \\cong \\operatorname{Hom}_{A\\text{-}\\mathbf{Mod}}(EP, EX)$ ✓。',
        '**投射。** 设 $EP$ 在 $A\\text{-}\\mathbf{Mod}$ 里投射，即 $\\operatorname{Hom}(EP, -)$ 正合；限制到 $E$ 的像上仍正合，借上面那个自然同构转回 $\\mathcal{C}$，得 $\\operatorname{Hom}_{\\mathcal{C}}(P, -)$ 正合 ✓，故 $P$ 投射 ✓。',
        '**内射。** 对偶：$\\operatorname{Hom}_{\\mathcal{C}}(-, I) \\cong \\operatorname{Hom}(-, EI)$，$EI$ 内射使右边把单态射送到满态射；而 $E$ 正合（Freyd–Mitchell 定理的另一半）把 $\\mathcal{C}$ 里的单态射送到单态射，故左边也如此 ✓。',
        '**正合部分**就是 Freyd–Mitchell 定理本身的陈述（$E$ 正合），这条只把「反射」补上 ✓。∎'
      ].join('\n')
    }

  ]
});
