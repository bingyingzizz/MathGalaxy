/* ==========================================================================
   内容包 · 辛几何（二）：辛流形 · Darboux · Hamilton 向量场
   --------------------------------------------------------------------------
   6 个节点，**新开星团** `diffgeom.symplectic`（辛流形与 Hamilton 力学）。

   为什么开团：①的辛向量空间是**线性**对象（一个辛形式 + 一个群），
   这一包全是**流形上的**：每条切空间各带一个辛形式、且要求整体闭（$d\\omega = 0$）。
   判据「为一个能用的东西而存在的一整套结果」—— 这台机器造的是**经典力学的相空间**，
   与「流形上的微分形式」那套装置不是同一台。

   ⚠️ 层号：微分形式 L18、外微分 L19、向量场 L19、余切丛 L19，
      所以这一包从 L20 起。**每条 definition 边都指向流形侧的真实前置**，
      以免整团掉到低层（`139-link-topology.js` 的老坑）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '辛几何：辛流形与 Hamilton 力学',

  nodes: [

    {
      id: 'def.symplectic-manifold',
      cluster: 'diffgeom.symplectic',
      type: 'definition',
      label: '辛流形',
      title: '辛流形：闭的非退化 2-形式',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '辛流形', '辛', '2-形式'],
      statement: [
        '**在做什么**：把辛向量空间「铺到流形上」。每一处切空间都带一个辛形式，而且要求这些形式**整体闭**（$d\\omega = 0$）—— 那一条微分条件就是整个辛几何的刚性来源。',
        '',
        '设 $M$ 是光滑流形（**不必先假设偶数维**，见下面的收尾）。$M$ 上的**辛形式**是一个 2-形式 $\\omega \\in \\Omega^{2}(M)$，满足',
        '',
        '1. **闭**：$d\\omega = 0$；',
        '2. **非退化**：对每点 $p$，$\\omega_{p} : T_{p}M \\times T_{p}M \\to \\mathbb{R}$ 非退化（`def.symplectic-form` 的流形版）。',
        '',
        '称 $(M, \\omega)$ 为**辛流形**。由非退化性知 $\\dim M = 2n$（`thm.symplectic-normal-form` 逐点成立）。',
        '',
        '**标准例子**：$\\mathbb{R}^{2n} = T^{*}\\mathbb{R}^{n}$（余切丛）上取',
        '',
        '$$\\omega_{0} = \\sum_{i=1}^{n} dq_{i} \\wedge dp_{i} ,$$',
        '',
        '这就是经典力学的相空间。'
      ].join('\n'),
      notes: [
        '⚠️ **「闭」这条不能去**：非退化 2-形式总是逐点存在（余切丛上就有），但「闭」是**整体**条件。去掉它得到的是「近辛流形」（almost symplectic）：有非退化 2-形式而不要求闭（那门理论完全不同）。⚠ 「可积」是 almost complex 结构的性质 —— 要再配一个 almost complex 结构才谈得上，与近辛本身的定义无关。$S^{6}$ 是「近辛但非辛」的标准例子。',
        '⭐ **为什么物理学需要它**：$\\omega$ 给出「Hamilton 流」（`def.hamiltonian-vector-field`），而 $d\\omega = 0$ 保证这些流**保持 $\\omega$**（Lie 导数 $\\mathcal{L}_{X_{H}}\\omega = 0$）—— 这就是 Liouville 定理（相体积守恒）的根子。',
        '⚠️ 辛流形**必可定向**（$\\omega^{n}$ 是无处为零的体积形式），但**不必**是 Kähler：Kähler 还要额外的复结构与相容度量。辛几何是比 Kähler 更宽的一层。',
        '⚠️ 紧辛流形有强限制：$[\\omega] \\in H^{2}(M)$ 非零（否则 $\\omega=d\\theta$ 使 $\\omega^{n}=d(\\theta\\wedge\\omega^{n-1})$ 恰当、积分为零，与「$\\omega^{n}$ 是无处为零的体积形式」矛盾 —— 这是「辛流形不能是 $S^{2n}$，$n \\ge 2$」的原因）。本图不展开上同调论证。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics',
        'McDuff–Salamon, Introduction to Symplectic Topology, Ch. 3'
      ]
    },

    {
      id: 'thm.darboux',
      cluster: 'diffgeom.symplectic',
      type: 'theorem',
      label: 'Darboux 定理',
      title: 'Darboux 定理：辛流形局部都长一样',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Darboux', '辛', '局部标准形'],
      statement: [
        '**在做什么**：辛几何的「没有局部不变量」定理。每一点附近都能找到坐标使 $\\omega$ 变成 $\\omega_{0}$ —— 所以辛流形的全部信息都在**整体**。',
        '',
        '设 $(M^{2n}, \\omega)$ 是辛流形，$p \\in M$。则存在 $p$ 的坐标邻域与坐标 $(q_{1}, \\ldots, q_{n}, p_{1}, \\ldots, p_{n})$ 使',
        '',
        '$$\\omega = \\sum_{i=1}^{n} dq_{i} \\wedge dp_{i}$$',
        '',
        '在该邻域上成立。这组坐标叫 **Darboux 坐标**（正则坐标）。',
        '',
        '**与 Riemann 几何的尖锐对照**：Riemann 度量**一般做不到**这一点 —— 曲率是局部不变量，只有**曲率恒为零**（平坦）的度量才能局部化成 $\\delta_{ij}$。而辛形式**永远**能。'
      ].join('\n'),
      notes: [
        '**证明**（Moser 技巧）。目标：在 $p$ 附近把 $\\omega$ 拉成常系数形式 $\\omega_{0} = \\sum_{i=1}^{n} dq_{i} \\wedge dp_{i}$。分五步，每一步都在一个足够小的图卡里做。',
        '**第一步：辛基存在（线性代数）**。设 $(V, \\omega)$ 是 $2n$ 维辛空间。取 $e_{1} \\ne 0$，由非退化性存在 $f_{1}$ 使 $\\omega(e_{1}, f_{1}) \\ne 0$，伸缩 $f_{1}$ 使 $\\omega(e_{1}, f_{1}) = 1$（交错性给 $\\omega(e_{1}, e_{1}) = 0$）。令 $W = \\{v : \\omega(e_{1}, v) = \\omega(f_{1}, v) = 0\\}$。对任意 $v$，$v - \\omega(v, f_{1})e_{1} + \\omega(v, e_{1})f_{1} \\in W$，故 $V = \\operatorname{span}(e_{1}, f_{1}) \\oplus W$；又 $\\omega|_{W}$ 非退化，对 $\\dim W$ 归纳即得辛基 $e_{1}, \\ldots, e_{n}, f_{1}, \\ldots, f_{n}$（`def.symplectic-basis`）。∎',
        '**第二步：造 $\\omega_{0}$，使 $\\omega_{0}(p) = \\omega(p)$**。在 $T_{p}M$ 上取第一步的辛基 $e_{i}, f_{i}$，即 $\\omega_{p}(e_{i}, f_{j}) = \\delta_{ij}$、其余配对为零。取以 $p$ 为心的图卡 $(U, x)$（$x(p) = 0$），令 $q_{i}, p_{i}$ 为对偶基给出的坐标，$\\omega_{0} = \\sum_{i=1}^{n} dq_{i} \\wedge dp_{i}$。则 $\\omega_{0}$ 常系数、闭、非退化，且 $\\omega_{0}(p) = \\omega_{p}$。',
        '**第三步：Moser 同伦与 $\\theta$**。令 $\\eta = \\omega - \\omega_{0}$。它是 $U$ 上的闭 2-形式，且 $\\eta(p) = 0$。把 $U$ 取成以 $p$ 为心的球（星形、可缩）；由 `lem.poincare-lemma`（$k = 2 \\ge 1$）存在 1-形式 $\\theta \\in \\Omega^{1}(U)$ 使 $\\eta = d\\theta$。对 $t \\in [0, 1]$ 令 $\\omega_{t} = \\omega_{0} + t\\eta$。每个 $\\omega_{t}$ 都闭，且由 $\\eta(p) = 0$ 得 $\\omega_{t}(p) = \\omega(p)$ 与 $t$ 无关。非退化性是开条件，$[0, 1]$ 紧，故可把 $U$ 再缩小，使**所有** $\\omega_{t}$（$t \\in [0, 1]$）都非退化。',
        '**第四步：解方程并积分成流**。每个 $\\omega_{t}$ 非退化，故线性映射 $X \\mapsto \\iota_{X}\\omega_{t}$ 是 $T_{x}M \\to T_{x}^{*}M$ 的同构，存在唯一光滑向量场 $X_{t}$ 满足 $\\iota_{X_{t}}\\omega_{t} = -\\theta$，且 $X_{t}$ 光滑依赖于 $(t, x)$。把 $t$ 看成额外坐标，在 $M \\times \\mathbb{R}$ 上对向量场 $(X_{t}, \\partial_{t})$ 用 `thm.flow-local`，得到 $p$ 附近定义在 $[0, 1]$ 上的局部流 $\\varphi_{t}$，满足 $\\varphi_{0} = \\operatorname{id}$ 与 $\\frac{d}{dt}\\varphi_{t}(x) = X_{t}(\\varphi_{t}(x))$。必要时再缩小 $U$，使 $\\varphi_{t}$ 对 $t \\in [0, 1]$ 都有定义。',
        '**第五步：$\\varphi_{1}^{*}\\omega = \\omega_{0}$**。对 $t$ 求导，用 Cartan 公式 $\\mathcal{L}_{X} = d\\iota_{X} + \\iota_{X}d$ 与 $\\frac{d}{dt}\\omega_{t} = \\eta$：\n\n$$\\frac{d}{dt}\\bigl(\\varphi_{t}^{*}\\omega_{t}\\bigr) = \\varphi_{t}^{*}\\bigl(\\mathcal{L}_{X_{t}}\\omega_{t} + \\tfrac{d}{dt}\\omega_{t}\\bigr) = \\varphi_{t}^{*}\\bigl(d\\iota_{X_{t}}\\omega_{t} + \\iota_{X_{t}}d\\omega_{t} + \\eta\\bigr).$$\n\n 由 $d\\omega_{t} = 0$、$\\iota_{X_{t}}\\omega_{t} = -\\theta$、$\\eta = d\\theta$，括号内等于 $-d\\theta + 0 + d\\theta = 0$。所以 $\\varphi_{t}^{*}\\omega_{t}$ 不随 $t$ 变，等于 $t = 0$ 时的 $\\varphi_{0}^{*}\\omega_{0} = \\omega_{0}$；取 $t = 1$ 得 $\\varphi_{1}^{*}\\omega = \\omega_{0}$。于是 $(q_{i} \\circ \\varphi_{1}^{-1},\\, p_{i} \\circ \\varphi_{1}^{-1})$ 就是 $\\varphi_{1}(U)$ 上的 Darboux 坐标。∎',
        '📌 **这条证明依赖什么**：非退化性（解 $X_{t}$）、闭性（$\\omega_{t}$ 闭、$\\eta$ 有原函数 $\\theta$）、图卡可缩（`lem.poincare-lemma`）、以及 ODE 的局部流（`thm.flow-local`）。$\\omega_{0}$ 与 $\\omega$ 在 $p$ 点相同是关键：否则 $\\omega_{t}$ 在 $p$ 点可能退化，Moser 流走不动。本图 `thm.symplectic-normal-form` 目前只给线性代数版的证明提纲；这里把需要的辛基存在性重证了一遍，证明不依赖那个节点。',
        '⭐ **这条定理是辛几何的「分水岭」**：它意味着不能用局部坐标区分辛流形，所以所有辛不变量（Gromov–Witten 不变量、Floer 同调、容量）都是**整体**的。Riemann 几何靠局部（曲率）起家，辛几何只能靠整体。',
        '⚠️ 定理**不**说「辛流形都微分同胚于 $\\mathbb{R}^{2n}$」：只给局部坐标，整体拓扑（如 $T^{2}$ 上的面积形式）不受约束。这是最常见的误读。',
        '⚠️ Darboux 这个名字在数学里有三处：本定理（辛几何）、Darboux 判据/上和下和（`thm.darboux-criterion`，Riemann 积分）、Darboux 定理（实分析：导函数有介值性）。三者无关。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics · Darboux 定理',
        'McDuff–Salamon, Introduction to Symplectic Topology, Ch. 3',
        'da Silva, Lectures on Symplectic Geometry'
      ]
    },

    {
      id: 'def.hamiltonian-vector-field',
      cluster: 'diffgeom.symplectic',
      type: 'definition',
      label: 'Hamilton 向量场',
      title: 'Hamilton 向量场：由函数生出流',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', 'Hamilton 向量场', '辛', '经典力学'],
      statement: [
        '**在做什么**：辛流形上「函数 $\\implies$ 向量场」的那台转换机。它把能量函数（Hamiltonian）变成运动方程 —— 这是整个分析力学的形式化核心。',
        '',
        '设 $(M, \\omega)$ 是辛流形，$H \\in C^{\\infty}(M)$。由 $\\omega$ 非退化，存在唯一的向量场 $X_{H}$ 使',
        '',
        '$$\\iota_{X_{H}}\\omega = +dH ,$$',
        '',
        '称 $X_{H}$ 为 $H$ 的 **Hamilton 向量场**（$\\iota$ 是内乘，见 `def.interior-product`）。它的积分曲线满足**Hamilton 方程**：在 Darboux 坐标下',
        '',
        '$$\\dot{q}_{i} = \\frac{\\partial H}{\\partial p_{i}}, \\qquad \\dot{p}_{i} = -\\frac{\\partial H}{\\partial q_{i}} .$$',
        '',
        '**关键性质**：$\\mathcal{L}_{X_{H}}\\omega = 0$（$H$ 的流保持 $\\omega$），所以也保持体积形式 $\\omega^{n}/n!$ —— 这就是 **Liouville 定理**。'
      ].join('\n'),
      notes: [
        '⚠️ **符号约定五花八门**：$\\iota_{X_{H}}\\omega = dH$、$= -dH$、$\\omega(X_{H}, \\cdot) = dH$ 三种都在用，差一个整体符号（等价于 $H \\mapsto -H$）。\n\n' +
        '本图取 $\\iota_{X_{H}}\\omega = +dH$：Arnold 用 $\\sum dp_{i}\\wedge dq_{i}$ 配 $-dH$，本包的 $\\omega_{0}=\\sum dq_{i}\\wedge dp_{i}$ 与它差一个号，故取 $+dH$；\n\n' +
        '换书时**必须重新核对 Hamilton 方程的符号**。',
        '⭐ **「函数 $\\implies$ 向量场」是辛几何独有的**：一般流形上函数只能求微分（$dH$，一个 1-形式），要有向量场就需要一个「把 1-形式变成向量场」的同构 —— 那正是 $\\omega$ 干的事（$\\flat : TM \\to T^{*}M$，$v \\mapsto \\iota_{v}\\omega$）。\n\nRiemann 度量也能这么干（音乐同构），但得到的流不保持度量。',
        '⚠️ **Hamilton 向量场 $\\ne$ 任意向量场**：它是 $H$ 的「梯度旋转 90°」。\n\n判据：$\\iota_{X}\\omega$ 是**闭**的（即 $d(\\iota_X\\omega)=0$）。\n\n不闭的叫「局部 Hamilton 向量场」，闭的叫「辛向量场」—— 多数书不区分（因为 $H^{1}(M) = 0$ 时两者一致）。',
        '⚠️ 不是所有辛流形上的向量场都来自某个 $H$（需要 $\\iota_{X}\\omega$ 恰当）。所以「辛向量场」比「Hamilton 向量场」宽一层。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics',
        'McDuff–Salamon, Introduction to Symplectic Topology, Ch. 3'
      ]
    },

    {
      id: 'def.poisson-bracket',
      cluster: 'diffgeom.symplectic',
      type: 'definition',
      label: 'Poisson 括号',
      title: 'Poisson 括号：函数之间的辛配对',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', 'Poisson 括号', '辛', '经典力学'],
      statement: [
        '**在做什么**：把「向量场」这一层再翻译回「函数」—— 两个函数配出一个函数。它让 $C^{\\infty}(M)$ 变成一个 Lie 代数，也是量子化时 $\\{,\\}$ 变 $\\frac{1}{i\\hbar}[,]$ 的那个东西。',
        '',
        '设 $(M, \\omega)$ 是辛流形，$f, g \\in C^{\\infty}(M)$。**Poisson 括号**定义为',
        '',
        '$$\\{f, g\\} := \\omega(X_{f}, X_{g}) = -\\iota_{X_{f}}\\iota_{X_{g}}\\omega = X_{g}(f) ,$$',
        '',
        '其中 $X_{f}, X_{g}$ 是 $f$ 与 $g$ 的 Hamilton 向量场。在 Darboux 坐标下',
        '',
        '$$\\{f, g\\} = \\sum_{i=1}^{n}\\Bigl(\\frac{\\partial f}{\\partial q_{i}}\\frac{\\partial g}{\\partial p_{i}} - \\frac{\\partial f}{\\partial p_{i}}\\frac{\\partial g}{\\partial q_{i}}\\Bigr) .$$',
        '',
        '**性质**：双线性、反对称、满足 **Jacobi 恒等式**，且是**导子**（Leibniz 律）。'
      ].join('\n'),
      notes: [
        '**它是「$H$ 能否守恒」的判据**：$\\frac{d}{dt}f = \\{f, H\\}$。所以 $f$ 是运动常数 $\\iff$ $\\{f, H\\} = 0$。力学里的「守恒量」全部由这条代数条件刻画 —— 这也是 Noether 定理的辛版本（对称性 $\\implies$ 守恒量）。',
        '⭐ **$C^{\\infty}(M)$ 因此是 Lie 代数**：括号给出 Lie 括号，而 Hamilton 映射 $H \\mapsto X_{H}$ 是**反** Lie 同态（保线性、翻括号），即 $[X_{f}, X_{g}] = -X_{\\{f,g\\}}$。\n\n这条把「函数代数」与「向量场代数」焊在一起。',
        '⚠️ **Poisson 括号比辛结构更宽**：非退化性不是必需的 —— 允许退化的 Poisson 括号给的是 **Poisson 流形**（例如 Lie 代数对偶 $\\mathfrak{g}^{*}$ 上的 Lie–Poisson 括号）。辛流形是 Poisson 流形的特例（非退化的那个）。本图只收辛的那一支。',
        '⚠️ **与量子力学的关系**：Dirac 的对应规则是 $\\{f,g\\} \\mapsto \\frac{1}{i\\hbar}[\\hat{f}, \\hat{g}]$。这不是定理（没有唯一量子化），但它解释了为什么 Jacobi 恒等式必须成立 —— 它对应交换子的 Jacobi 恒等式。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics',
        'McDuff–Salamon, Introduction to Symplectic Topology, Ch. 3'
      ]
    },

    {
      id: 'def.lagrangian-submanifold',
      cluster: 'diffgeom.symplectic',
      type: 'definition',
      label: 'Lagrange 子流形',
      title: 'Lagrange 子流形：维数刚好一半的辛子流形',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', 'Lagrange 子流形', '辛', '迷向'],
      statement: [
        '**在做什么**：把 `def.lagrangian-subspace` 逐点铺到流形上。它是辛几何里「最大的一块什么都不测」的子流形，也是物理里「构型空间」的数学身份。',
        '',
        '设 $(M^{2n}, \\omega)$ 是辛流形。浸入子流形 $L \\subseteq M$ 叫 **Lagrange 子流形**（Lagrangian submanifold），若',
        '',
        '1. $\\dim L = n$（即 $\\dim M$ 的一半）；',
        '2. $\\omega|_{L} = 0$（$L$ 上 $\\omega$ 恒为零，即 $L$ 迷向）。',
        '',
        '等价说法：对每个 $p \\in L$，$T_{p}L$ 是 $T_{p}M$ 的 Lagrange 子空间。',
        '',
        '**标准例子**：',
        '',
        '- $\\mathbb{R}^{2n}$ 的零截面 $\\{p = 0\\}$（这里是「位置空间」，动量全零）；',
        '- 更一般地，**任意函数的图像** $\\{(q, p) : p = dF(q)\\}$ 是 Lagrange 子流形 —— 因为 $\\omega|_{L} = dq \\wedge d(dF) = 0$。'
      ].join('\n'),
      notes: [
        '⭐ **「$\\omega|_L = 0$」等价于「$p\\,dq$ 在 $L$ 上闭」**：把 $\\omega = d(p\\,dq)$ 拿来，$L$ 上 $p\\,dq$ 闭 $\\iff$ 局部是 $dF$ $\\iff$ $L$ 局部是函数的图像。\n\n所以 Lagrange 子流形 = 「局部的图像」，而 $F$ 叫**生成函数**。\n\n这条把几何与分析焊在一起（Hamilton–Jacobi 理论就建立在它上面）。',
        '⚠️ **$\\dim L = n$ 不能由「迷向」推出来**：迷向子流形可以维数远小于 $n$（一条辛直线就迷向）。必须**额外**要求维数一半，或等价地要求「极大」（$T_pL = (T_pL)^{\\perp}$）。这一点与线性情形（`def.lagrangian-subspace` 的注）完全一致。',
        '⚠️ **Lagrange 子流形不必闭、不必嵌入**：物理里常用的是「浸入」甚至「多重覆叠」（如 Bohr–Sommerfeld 量子化条件里的周期轨道）。本图按「浸入」口径写。',
        '⚠️ 命名：与「Lagrange 子空间」是同一个人、同一个概念的两个尺度；与 `thm.lagrange-identity`（内积几何）**无关**，别接成因果。',
        ,
        '**两条定义条件里「$\\dim = n$」不能由「迷向」推出**（这是最常被省掉的一步）：\n' +
        '\n' +
        '- $\\omega|_{L} \\equiv 0$：**只给迷向**。迷向子流形的维数可以**远小于** $n$（一条辛直线就迷向），所以单靠它得不到“极大”。\n' +
        '- $\\dim L = n$（**必须额外要求**）：等价地要求 $T_{p}L = (T_{p}L)^{\\perp}$（逐点极大）。在非退化型下 $\\dim W + \\dim W^{\\perp} = \\dim V$，于是「$W = W^{\\perp}$」把维数**逼成**一半 —— 这才是 Lagrange 的真正含义。\n' +
        '- **等价说法的方向**：逐点看 $T_{p}L$ 是 Lagrange 子空间 $\\iff$ $L$ 是 Lagrange 子流形（$L$ 浸入、且 $\\omega|_L = 0$、$\\dim = n$）。$(\\Leftarrow)$ 逐点显然；$(\\implies)$ 要「$L$ 的维数是常数」，这一点由浸入保证。\n' +
        '\n' +
        '⚠️ **闭合性不是定义的一部分**：$L$ 不必闭、不必紧、也不必嵌入（可以只是浸入、甚至多重覆叠）。物理里的 Bohr–Sommerfeld 条件用的就是这种“不必嵌入”的 Lagrange 子流形。\n' +
        '⚠️ **「局部是函数的图像」这个等价只在投影 $\\pi:L\\to Q$（$Q$ 为某个 Lagrange 子空间所在的零截面）为局部微分同胚时成立**（$p\\,\\mathrm{d}q$ 的恰当性），不是全局性质 —— 所以“生成函数”只局部存在。\n',
        ,
        '**各方向用到的假设**（逐点定义免费，生成函数须有横截条件）：\n' +
        '- $\\dim L=n$ 且 $\\omega|_L=0$ $\\iff$ 各切空间是 Lagrange 子空间，是对浸入的切映射逐点展开定义；不要求 $L$ 闭、紧或嵌入。\n' +
        '- 迷向且半维 $\\iff$ $T_pL=(T_pL)^\\omega$，用辛型非退化及 $\\dim W+\\dim W^\\omega=2n$；仅迷向不够，$n>1$ 时一维子流形即为反例。\n' +
        '- 在余切坐标中，闭一形式的图像 $\\iff$ Lagrange 图像，用典范辛形式的拉回计算；闭一形式局部为 $dF$ 则用 Poincaré 引理，全局还需恰当性。\n' +
        '- 从一般 Lagrange 子流形反推固定位置坐标下的图像，另需投影为局部微分同胚；余切纤维本身是 Lagrange，却不能在该位置投影下写成 $p=dF(q)$。\n'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics',
        'McDuff–Salamon, Introduction to Symplectic Topology, Ch. 3'
      ]
    },

    {
      id: 'def.lagrange-bracket',
      cluster: 'diffgeom.symplectic',
      type: 'definition',
      label: 'Lagrange 括号',
      title: 'Lagrange 括号：Poisson 括号的逆矩阵',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', 'Lagrange 括号', '经典力学', '辛'],
      statement: [
        '**在做什么**：比 Poisson 括号更早（Lagrange 1808，Poisson 1809）的版本，本质是「Poisson 括号矩阵的逆」。它衡量的是「两族曲线之间的面积」，所以在正则变换理论里更自然。',
        '',
        '设 $(q, p)$ 是 Darboux 坐标，$u = (u_{1}, \\ldots, u_{2n})$、$v = (v_{1}, \\ldots, v_{2n})$ 是两组坐标函数。**Lagrange 括号**定义为',
        '',
        '$$[u, v]_{q,p} := \\sum_{i=1}^{n}\\Bigl(\\frac{\\partial q_{i}}{\\partial u}\\frac{\\partial p_{i}}{\\partial v} - \\frac{\\partial p_{i}}{\\partial u}\\frac{\\partial q_{i}}{\\partial v}\\Bigr) .$$',
        '',
        '**与 Poisson 括号的关系**：把 Poisson 括号矩阵 $\\bigl(\\{u_{i}, u_{j}\\}\\bigr)$ 记为 $P$，Lagrange 括号矩阵记为 $L$，则',
        '',
        '$$L \\cdot P = -I ,$$',
        '',
        '即 $L = -P^{-1}$ —— 两者**差一个符号**才互为逆矩阵（$n = 1$ 时 $L = P = \\begin{pmatrix}0 & 1\\cr -1 & 0\\end{pmatrix}$，$LP = -I$；一般式即 $\\sum_{k} [u_{i},u_{k}]\\{u_{k},u_{j}\\} = -\\delta_{ij}$）。',
        '',
        '**正则性的判据**：变换 $(q, p) \\mapsto (Q, P)$ 是**正则变换**（辛同胚）$\\iff$ 对每个 $i, j$ 有 $[Q_{i}, Q_{j}] = [P_{i}, P_{j}] = 0$ 且 $[Q_{i}, P_{j}] = \\delta_{ij}$。'
      ].join('\n'),
      notes: [
        '**为什么历史上先有 Lagrange 括号**：变分法与正则变换的研究（Lagrange 的《分析力学》）先出现，那时还没有「辛流形」这个概念。\n\nPoisson 后来才发现「对偶的那个括号」满足优美的 Jacobi 恒等式，于是成了现代形式化的主角。\n\n**两个括号记的是同一份信息**（互为逆），只是 Lagrange 的那个不满足 Jacobi，所以现在只当工具用。',
        '⭐ **几何意义**：Lagrange 括号量的是「$u$、$v$ 的等值曲线族在相空间里围出的面积」。所以它天然是「面积」的语言，而 Poisson 括号是「流」的语言 —— 这就是为什么正则变换的条件用 Lagrange 括号写更直观（它直接说「面积不变」）。',
        '⚠️ **$L = -P^{-1}$ 只在同一个坐标系下比较时成立**：写这两个矩阵必须用**同一组** $(u, v)$ 作基，否则无可比性。这条是最容易记错的地方。',
        '⚠️ 符号：有书把 Lagrange 括号写成 $\\{u,v\\}$（与 Poisson 撞），也有写 $[u,v]_{q,p}$ 的。本图用后者，下标标明参照坐标。'
      ].join('\n\n'),
      refs: [
        'Arnold, Mathematical Methods of Classical Mechanics',
        'Landau–Lifshitz, Mechanics'
      ]
    }
  ],

  edges: [
    { id: 'dep.sm-form', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'def.symplectic-manifold',
      note: '辛形式是流形上的 2-形式 —— 用通名的流形版定义（`def.form-on-manifold`）。' },
    { id: 'dep.sm-extd', kind: 'definition',
      definition: 'prop.exterior-derivative-manifold', usedBy: 'def.symplectic-manifold',
      note: '「闭」$d\\omega = 0$ 就是用流形上的外微分陈述的。' },
    { id: 'dep.sm-sympl', kind: 'definition',
      definition: 'def.symplectic-form', usedBy: 'def.symplectic-manifold',
      note: '非退化性是逐点要求，用的正是线性那版辛形式。' },
    { id: 'dep.sm-mf', kind: 'definition',
      definition: 'def.smooth-manifold', usedBy: 'def.symplectic-manifold',
      note: '辛流形首先是光滑流形。' },
    { id: 'dep.sm-cotb', kind: 'definition',
      definition: 'def.cotangent-bundle', usedBy: 'def.symplectic-manifold',
      note: '标准例子 $T^{*}\\mathbb{R}^{n}$ 就是余切丛 —— 相空间的数学身份。' },

    { id: 'dep.darb-sm', kind: 'definition',
      definition: 'def.symplectic-manifold', usedBy: 'thm.darboux',
      note: '定理的主语就是辛流形：局部能化成标准形。' },
    { id: 'dep.darb-snf', kind: 'implication',
      sources: ['thm.symplectic-normal-form'], target: 'thm.darboux',
      proof: 'Moser 论证的第一步是在每点取辛基把 $\\omega_{p}$ 化为 $\\omega_{0}$ —— 这正是 `thm.symplectic-normal-form`（线性标准形）的内容；有了处处等于 $\\omega_{0}$ 的参照形式，才能写 $\\omega_{t}$ 并用同伦公式（`imp.darboux`）走到 $\\omega_{0}$。∎',
      note: '证明的第一步是逐点用线性标准形定理找辛基。' },
    { id: 'dep.darb-mf', kind: 'definition',
      definition: 'def.smooth-manifold', usedBy: 'thm.darboux',
      note: '结论是「存在坐标邻域」—— 坐标系是流形上的东西。' },

    { id: 'dep.hvf-sm', kind: 'definition',
      definition: 'def.symplectic-manifold', usedBy: 'def.hamiltonian-vector-field',
      note: '$\\iota_{X_H}\\omega = +dH$ 里的 $\\omega$ 是辛流形的辛形式。' },
    { id: 'dep.hvf-vf', kind: 'definition',
      definition: 'def.vector-field', usedBy: 'def.hamiltonian-vector-field',
      note: '$X_H$ 本身就是向量场。' },
    { id: 'dep.hvf-iota', kind: 'definition',
      definition: 'def.interior-product', usedBy: 'def.hamiltonian-vector-field',
      note: '定义式用的是内乘 $\\iota$。' },

    { id: 'dep.pb-hvf', kind: 'definition',
      definition: 'def.hamiltonian-vector-field', usedBy: 'def.poisson-bracket',
      note: '$\\{f,g\\} = \\omega(X_f, X_g)$ —— 括号由两个 Hamilton 向量场配对得到。' },
    { id: 'dep.pb-sm', kind: 'definition',
      definition: 'def.symplectic-manifold', usedBy: 'def.poisson-bracket',
      note: '整个构造活在辛流形上。' },

    { id: 'dep.lsm-lag', kind: 'definition',
      definition: 'def.lagrangian-subspace', usedBy: 'def.lagrangian-submanifold',
      note: '逐点看，切空间是 Lagrange 子空间 —— 这就是「子流形」版的全部内容。' },
    { id: 'dep.lsm-sm', kind: 'definition',
      definition: 'def.symplectic-manifold', usedBy: 'def.lagrangian-submanifold',
      note: 'Lagrange 子流形是辛流形的子流形。' },
    { id: 'dep.lsm-mf', kind: 'definition',
      definition: 'def.smooth-manifold', usedBy: 'def.lagrangian-submanifold',
      note: '「浸入子流形」这个概念本身要先有光滑流形。' },

    { id: 'dep.lb-pb', kind: 'definition',
      definition: 'def.poisson-bracket', usedBy: 'def.lagrange-bracket',
      note: '两个括号互为逆矩阵 —— 定义里必须先把 Poisson 括号矩阵写出来。' },
    { id: 'dep.lb-cotb', kind: 'definition',
      definition: 'def.cotangent-bundle', usedBy: 'def.lagrange-bracket',
      note: '$(q, p)$ 是余切丛上的 Darboux 坐标。' },

    /* ---------- Darboux：两处外部依赖（联合来源） ---------- */
    {
      id: 'imp.darboux',
      kind: 'implication',
      sources: ['lem.poincare-lemma', 'thm.flow-local'],
      target: 'thm.darboux',
      title: 'Poincaré 引理 + 局部流 $\\implies$ Moser 同伦给出 Darboux 坐标',
      proof: [
        '**① 闭形式找原函数**。取 $p$ 的球状图卡 $(U,x)$，在 $T_{p}M$ 上取辛基、用对偶坐标造出 $\\omega_{0}=\\sum_{i=1}^{n}dq_{i}\\wedge dp_{i}$，使 $\\omega_{0}(p)=\\omega_{p}$。令 $\\eta=\\omega-\\omega_{0}$：它闭，且 $\\eta(p)=0$。$U$ 可缩、$k=2\\ge1$，由 Poincaré 引理（`lem.poincare-lemma`）存在 $\\theta\\in\\Omega^{1}(U)$ 使 $\\eta=d\\theta$。',
        '**② Moser 同伦**。令 $\\omega_{t}=\\omega_{0}+t\\eta$。$\\eta(p)=0$ 使 $\\omega_{t}(p)$ 与 $t$ 无关；非退化性是开条件而 $[0,1]$ 紧，故可再缩小 $U$，使**所有** $\\omega_{t}$ 都非退化。于是每点有唯一 $X_{t}$ 满足 $\\iota_{X_{t}}\\omega_{t}=-\\theta$，且 $(t,x)\\mapsto X_{t}(x)$ 光滑（$\\omega_{t}$ 光滑、逆映射由 Cramer 公式光滑）。',
        '**③ 积分成流**。在 $M\\times\\mathbb{R}$ 上对 $(X_{t},\\partial_{t})$ 用局部流的存在唯一性（`thm.flow-local`），得 $p$ 附近定义在 $[0,1]$ 上的 $\\varphi_{t}$，$\\varphi_{0}=\\operatorname{id}$。由 Cartan 公式与 $d\\omega_{t}=0$ 得 $\\frac{d}{dt}(\\varphi_{t}^{*}\\omega_{t})=\\varphi_{t}^{*}(\\mathcal{L}_{X_{t}}\\omega_{t}+\\eta)=\\varphi_{t}^{*}(d\\iota_{X_{t}}\\omega_{t}+\\eta)=\\varphi_{t}^{*}(-d\\theta+d\\theta)=0$，故 $\\varphi_{1}^{*}\\omega=\\varphi_{0}^{*}\\omega_{0}=\\omega_{0}$；$(q_{i}\\circ\\varphi_{1}^{-1},\\,p_{i}\\circ\\varphi_{1}^{-1})$ 就是 Darboux 坐标。∎',
      ].join('\n\n'),
      note: '证明（含辛基的线性代数那一步）在本节点的 notes 里；这条边只记两处外部依赖：可缩图卡上的 Poincaré 引理、时变向量场的局部流。`thm.symplectic-normal-form` 只给线性版提纲，不作依赖。',
    }
  ]
});
