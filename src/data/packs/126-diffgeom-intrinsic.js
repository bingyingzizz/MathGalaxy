/* ==========================================================================
   内容包 · 曲面的内蕴几何（16 个节点 / 26 条边：17 条定义引用 + 9 条推导）
   --------------------------------------------------------------------------
   主题只有一句：**只用第一基本形式 $I$ 能读出什么？**

     内蕴量 / 等距                ← 先把「内蕴」这件事说清楚
     克里斯托费尔记号 → 测地线     ← $I$ 的一阶导数给出联络，联络给出测地线
     测地曲率 → 刘维尔公式         ← 曲线「转得多快」，完全由 $E,G$ 决定
     指数映射 → 高斯引理 → 法坐标   ← 测地线铺成坐标，$I$ 只剩一个系数 $G$
     曲率张量 → 高斯曲率           ← $I$ 的二阶导数，这才是不可消除的量
     绝妙定理 · 高斯–博内          ← 前者说 $K$ 内蕴，后者把 $K$ 接到拓扑上

   星团：diffgeom.intrinsic（内蕴几何）。

   ⚠️ 本包**不**重建活动标架那一批的节点（活动标架 / 联络形式 / 结构方程 /
      第一与第二基本形式 / Weingarten 变换 / 高斯方程 / Codazzi–Mainardi /
      法曲率 / 主曲率 / 平均曲率），只在 `definition` 边里引用它们。

   ⚠️ 符号约定（全包统一，见 def.gauss-curvature 的 notes）：
      · 曲率算子 $R(X,Y)Z = \nabla_{X}\nabla_{Y}Z-\nabla_{Y}\nabla_{X}Z-\nabla_{[X,Y]}Z$，
        分量 $R_{ijk\ell} = \langle R(\partial_{i},\partial_{j})\partial_{k},\partial_{\ell}\rangle$；
      · 联络形式 $\nabla_{X}e_{j} = \omega^{k}_{j}(X)e_{k}$，即 $\omega^{1}_{2} = \langle \nabla e_{2},e_{1}\rangle$；
      · 按这套约定，单位球面给出 $K = 1$、$R_{1221} = \det(g)$、$R_{1212} = -\det(g)$，
        $d\omega^{1}_{2} = K\,\omega^{1}\wedge\omega^{2}$，$k_{g} = \frac{\mathrm{d}\theta}{\mathrm{d}s}-\omega^{1}_{2}(\dot\gamma)$。
        两条彼此独立的自检（测地极坐标直接算、球面上的显式计算）都对得上。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '曲面的内蕴几何',
  nodes: [

    /* ------------------------------------------------ 内蕴 vs 外在 */
    {
      id: 'def.intrinsic-quantity',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '内蕴量',
      title: '内蕴量与外在量',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '第一基本形式'],
      statement: [
        '设 $S \\subseteq \\mathbb{R}^{3}$ 是正则曲面，$I$ 是它的第一基本形式。由 $S$ 上的点、切向量与曲线所决定的一个量叫**内蕴的**，如果它只依赖 $I$（等价地：只依赖度量系数 $g_{ij}$ 及其导数）；否则叫**外在的**。',
        '',
        '形式化的版本：若 $\\varphi : S_{1}\\to S_{2}$ 是局部等距，则内蕴量在 $\\varphi$ 下不变；反之，一切局部等距都保持的量就是内蕴量。',
        '',
        '判别上的经验法则：只用到 $\\langle \\dot\\gamma,\\dot\\gamma\\rangle = 1$、角度、面积这类计算的量是内蕴的；一旦式子里出现曲面的单位法向 $n$ 或第二基本形式，就是外在的。'
      ].join('\n'),
      notes: [
        '**内蕴的**：弧长、两条曲线的夹角、区域面积、测地曲率 $k_{g}$、**高斯曲率** $K$、欧拉示性数 $\\chi$。',
        '**外在的**：主曲率 $k_{1},k_{2}$、平均曲率 $H$、第二基本形式 $\\mathrm{II}$、法曲率 $\\kappa_{n}$（法向取定后）、曲线在 $\\mathbb{R}^{3}$ 中的曲率 $\\kappa$。',
        '⭐ $K$ 出现在「内蕴」这一栏是**定理**而不是定义：它原本定义为两个外在量的乘积 $k_{1}k_{2}$，要等绝妙定理才说明它其实只依赖 $I$。整条内蕴几何都从这一步开始。',
        '⚠️ $\\kappa$ 与 $k_{g}$ 不是一回事：$\\kappa^{2} = k_{g}^{2}+\\kappa_{n}^{2}$，前者外在、后者内蕴。初学者最容易在这里把「曲面的曲率」和「曲线的曲率」混成一个东西。',
        '⚠️ 「内蕴」不是「与嵌入无关」的同义词，它更强：它说的是**只由诱导度量决定**。同一个微分流形上换一个度量，内蕴量就全变了。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 等距与内蕴几何',
        'do Carmo, Differential Forms and Applications, 第 3 章「联络形式」· 内蕴与外蕴'
      ]
    },

    {
      id: 'def.isometry-surface',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '等距',
      title: '曲面的等距',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '等距'],
      statement: [
        '设 $S_{1},S_{2}$ 是两张曲面。映射 $\\varphi : S_{1}\\to S_{2}$ 叫**等距**，如果它是微分同胚且保持曲线长度：对每条曲线 $\\alpha \\subseteq S_{1}$ 有 $\\operatorname{length}(\\varphi\\circ\\alpha) = \\operatorname{length}(\\alpha)$。等价地，微分保持内积：',
        '',
        '$$\\langle \\mathrm{d}\\varphi_{p}(v),\\mathrm{d}\\varphi_{p}(w)\\rangle = \\langle v,w\\rangle,\\qquad v,w \\in T_{p}S_{1}.$$',
        '',
        '若每点都有邻域与之等距，叫**局部等距**（此时只要求 $\\varphi$ 是局部微分同胚）。'
      ].join('\n'),
      notes: [
        '**判定准则**：写成参数形式，「局部等距」$\\iff$ 存在参数化使两张曲面的第一基本形式系数逐个相等（$E = \\bar E$、$F = \\bar F$、$G = \\bar G$）。这就是「$I$ 是唯一的度量不变量」的准确含义。',
        '**经典例子**：平面到圆柱面的卷绕是局部等距（弧长不变），但不是整体等距 —— 圆柱面上一条纬线是闭曲线，平面上没有闭的直线段。这类「局部等距而非整体等距」正是内蕴几何真正关心的现象。',
        '**反向的用处**：绝妙定理说 $K$ 内蕴，于是「$K$ 不同的两片曲面不可能局部等距」。柱面（$K = 0$）与球面（$K = 1/R^{2}$）不局部等距，尽管两者都摆在 $\\mathbb{R}^{3}$ 里、看上去都「弯」。',
        '⚠️ 反过来不成立：$K$ 相同**不足以**判定局部等距。常曲率情形是例外 —— Minding 定理说 $K$ 相等的常曲率曲面局部等距。判定两张一般曲面是否局部等距，需要比较整个 $I$，不是比较一个数。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 等距',
        'Kühnel, Differential Geometry: Curves — Surfaces — Manifolds, 「曲面的内蕴几何」一章·等距'
      ]
    },

    /* ------------------------------------------------ 联络与测地线 */
    {
      id: 'def.christoffel-symbol',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '克里斯托费尔记号',
      title: '克里斯托费尔记号',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '联络', '克里斯托费尔记号'],
      statement: [
        '白话：在曲面上「把向量沿曲线搬家」要一个规则，这个规则叫**联络**；一旦选了局部坐标，联络就退化成 $2^{3}$ 个函数 $\\Gamma^{k}_{ij}$，它们说「$\\partial_{j}$ 沿 $\\partial_{i}$ 方向搬一点，会多出多少 $\\partial_{k}$ 分量」。全部内容只用到度量系数 $g_{ij}$ 和它的一阶导数 —— 所以它是最早出现的**内蕴**对象。',
        '',
        '设 $(x^{1},x^{2})$ 是曲面 $S$ 的局部坐标，$g_{ij} = \\langle \\partial_{i},\\partial_{j}\\rangle$，$(g^{ij})$ 是 $(g_{ij})$ 的逆矩阵。**克里斯托费尔记号**定义为',
        '',
        '$$\\Gamma^{k}_{ij} = \\frac{1}{2}g^{k\\ell}\\left(\\partial_{i}g_{j\\ell}+\\partial_{j}g_{i\\ell}-\\partial_{\\ell}g_{ij}\\right).$$',
        '',
        '它是 Levi-Civita 联络在坐标标架下的系数：',
        '',
        '$$\\nabla_{\\partial_{i}}\\partial_{j} = \\Gamma^{k}_{ij}\\partial_{k},\\qquad \\Gamma^{k}_{ij} = \\Gamma^{k}_{ji}.$$',
        '',
        '（Christoffel symbols。整套内蕴几何的第一台发动机。）'
      ].join('\n'),
      notes: [
        '**来处只有 Koszul 公式**。「挠率为零」与「保度量」两条要求合起来给出唯一解：',
        '$$2\\langle \\nabla_{X}Y,Z\\rangle = X\\langle Y,Z\\rangle+Y\\langle Z,X\\rangle-Z\\langle X,Y\\rangle+\\langle [X,Y],Z\\rangle-\\langle [Y,Z],X\\rangle+\\langle [Z,X],Y\\rangle.$$',
        '对坐标标架 $[\\partial_{i},\\partial_{j}] = 0$，右端只剩两个导数项，左端是 $2\\Gamma^{\\ell}_{ij}g_{\\ell k}$，解出来就是上面的公式。**推导里只用到 $g_{ij}$ 和它的一阶导数** —— 这是第一个内蕴量。',
        '⚠️ $\\Gamma^{k}_{ij}$ **不是张量**：换坐标时多出一个非齐次的二阶导数项，所以「$\\Gamma$ 在 $p$ 处等于某个数」随坐标变。但「**存在**使 $\\Gamma(p) = 0$ 的坐标」是坐标无关的事实（法坐标），两者的区别是「数值」与「存在性」。',
        '**为什么它决定测地线**：测地线方程里唯一的外来数据就是 $\\Gamma$，所以「哪些曲线是测地线」完全是 $I$ 的事 —— 这已经是内蕴几何的第一步。',
        '⚠️ 二维时只有 $2^{3} = 8$ 个记号，但独立的分量由对称性减到 $6$ 个（$k$ 定、$i \\le j$）；平坦坐标下它们全为零。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 克里斯托费尔记号',
        'do Carmo, Differential Forms and Applications, 第 3 章「联络形式」· 联络系数'
      ]
    },

    {
      id: 'prop.christoffel-frame',
      cluster: 'diffgeom.intrinsic',
      type: 'proposition',
      label: '标架下的联络系数',
      title: '正交标架下的联络系数',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '内蕴几何', '活动标架', '联络形式'],
      statement: [
        '设 $e_{1},e_{2}$ 是曲面上的局部单位正交标架，联络形式由 $\\nabla_{X}e_{j} = \\omega^{k}_{j}(X)e_{k}$ 定义（于是 $\\omega^{k}_{j} = -\\omega^{j}_{k}$）。则',
        '',
        '① **Koszul 公式给出全部系数**：',
        '',
        '$$\\omega^{k}_{j}(e_{i}) = \\frac{1}{2}\\left(\\langle [e_{i},e_{j}],e_{k}\\rangle-\\langle [e_{j},e_{k}],e_{i}\\rangle+\\langle [e_{k},e_{i}],e_{j}\\rangle\\right).$$',
        '',
        '② 若标架是**正交坐标的单位化** $e_{1} = \\partial_{u}/\\sqrt{E}$、$e_{2} = \\partial_{v}/\\sqrt{G}$（$F = 0$），则',
        '',
        '$$\\omega^{1}_{2} = \\frac{1}{\\sqrt{EG}}\\left(\\frac{E_{v}}{2}\\,\\mathrm{d}u-\\frac{G_{u}}{2}\\,\\mathrm{d}v\\right) = \\frac{(\\ln E)_{v}}{2\\sqrt{G}}\\,\\omega^{1}-\\frac{(\\ln G)_{u}}{2\\sqrt{E}}\\,\\omega^{2},$$',
        '',
        '其中 $\\omega^{1} = \\sqrt{E}\\,\\mathrm{d}u$、$\\omega^{2} = \\sqrt{G}\\,\\mathrm{d}v$ 是正交余标架。',
        '',
        '一句话：$\\Gamma^{k}_{ij}$ 与 $\\omega^{k}_{j}$ 是同一件东西（联络系数）在两个标架下的样子。'
      ].join('\n'),
      notes: [
        '**① 与 $\\Gamma$ 的真实关系**：坐标标架 $\\partial_{i}$ 一般既不正交也不单位；正交归一化之后 $e_{i}$ 就不再是坐标标架（$[e_{1},e_{2}]\\ne 0$），多出来的 $\\langle [e_{i},e_{j}],e_{k}\\rangle$ 项正是这件事的代价。所以「$\\omega^{k}_{j}(e_{i})$ 等于某个 $\\Gamma$」只在度量已经被坐标拉直（平坦的笛卡尔坐标）时才字面成立。',
        '**曲线上两种写法**，这是对照里最有用的一条：',
        [
          '- 坐标标架：$\\dot\\gamma = \\dot x^{k}\\partial_{k}$，$\\nabla_{\\dot\\gamma}\\dot\\gamma = \\left(\\ddot x^{k}+\\Gamma^{k}_{ij}\\dot x^{i}\\dot x^{j}\\right)\\partial_{k}$；',
          '- 正交标架：$\\dot\\gamma = y^{j}e_{j}$，$\\nabla_{\\dot\\gamma}\\dot\\gamma = \\left(\\dot y^{k}+\\omega^{k}_{j}(\\dot\\gamma)y^{j}\\right)e_{k}$。'
        ].join('\n'),
        '后一式里没有二次项，因为标架自己在转：二次项被吸收进 $\\dot y$ 与 $\\omega$ 了。**「测地线方程里有没有二次项」取决于标架，不取决于曲面。**',
        '⭐ ② 是刘维尔公式的全部燃料：正交参数网下测地曲率的两个系数项，就是 $\\omega^{1}_{2}$ 的两个分量。',
        '⚠️ 符号：$\\omega^{1}_{2}$ 的符号随定向与「$e_{1},e_{2}$ 谁在前」而反号。本包统一取 $\\omega^{1}_{2} = \\langle \\nabla e_{2},e_{1}\\rangle$。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Forms and Applications, 第 3 章「联络形式」· 联络形式与结构方程',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 克里斯托费尔记号'
      ]
    },

    {
      id: 'def.geodesic',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '测地线',
      title: '测地线与测地线方程',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '测地线'],
      statement: [
        '设 $\\gamma : I\\to S$ 是曲面 $S$ 上按弧长参数化的曲线（$\\langle \\dot\\gamma,\\dot\\gamma\\rangle = 1$）。$\\gamma$ 叫**测地线**，如果它的切向量沿自身平行：',
        '',
        '$$\\nabla_{\\dot\\gamma(s)}\\dot\\gamma(s) = 0,\\qquad s \\in I.$$',
        '',
        '展开成坐标就是**测地线方程**：',
        '',
        '$$\\frac{\\mathrm{d}^{2}x^{k}}{\\mathrm{d}s^{2}}+\\Gamma^{k}_{ij}(\\gamma(s))\\frac{\\mathrm{d}x^{i}}{\\mathrm{d}s}\\frac{\\mathrm{d}x^{j}}{\\mathrm{d}s} = 0,\\qquad k = 1,2.$$',
        '',
        '等价的第三张面孔：$\\gamma$ 上任意足够短的一段弧，是连接其两端点的**最短**曲线。'
      ].join('\n'),
      notes: [
        '**三种刻画的分工**：$\\nabla_{\\dot\\gamma}\\dot\\gamma = 0$ 是不变量写法（哪本教材都认），测地线方程是计算工具（两阶 ODE 组），最短性是最初的几何动机（变分）。前两者等价是纯粹的展开，第三者见高斯引理那一段的说明。',
        '**参数必须是仿射参数**：$s\\mapsto as+b$ 仍是测地线参数，换成一般参数 $t$ 后方程会多出 $\\frac{\\mathrm{d}^{2}s}{\\mathrm{d}t^{2}}\\big/\\frac{\\mathrm{d}s}{\\mathrm{d}t}$ 这一项。曲线本身没变，变的只是「匀速」这件事 —— 所以「测地线」这个词总带仿射参数。',
        '⚠️ **局部最短不等于整体最短**：大圆是球面的测地线，但绕过大半圈的那一段不是最短连线。反过来「最短 $\\implies$ 测地线」是真的（变分证明），「测地线 $\\implies$ 局部最短」只在足够短的弧上成立（指数映射的单射半径之内）。',
        '**为什么平行移动让长度不变**：$\\frac{\\mathrm{d}}{\\mathrm{d}s}\\langle \\dot\\gamma,\\dot\\gamma\\rangle = 2\\langle \\nabla_{\\dot\\gamma}\\dot\\gamma,\\dot\\gamma\\rangle$，而在测地线上这个式子为零，于是速度恒定、参数必然是弧长的仿射函数。',
        '**唯一的例子都值得记住**：平面上的测地线是直线；球面上的测地线是大圆；旋转面上的测地线由 Clairaut 关系约束；圆柱面上把展开图里直线卷回去即可。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 测地线',
        'do Carmo, Differential Forms and Applications, 第 4 章「结构方程」· 测地线'
      ]
    },

    {
      id: 'prop.geodesic-existence',
      cluster: 'diffgeom.intrinsic',
      type: 'proposition',
      label: '测地线的局部存在唯一性',
      title: '测地线的局部存在唯一性',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '内蕴几何', '测地线', '常微分方程'],
      statement: [
        '白话：**从任意一点、朝任意方向，都能画出唯一一条「笔直走」的曲线（测地线）** —— 至少在一小段上。这是解二阶常微分方程的存在唯一性，没有任何几何玄机；它的用途是把「方向」变成「位置」（下一站的指数映射）。',
        '',
        '对任意 $p \\in S$ 与任意 $v \\in T_{p}S$，存在 $\\varepsilon > 0$ 与唯一的测地线 $\\gamma_{v} : (-\\varepsilon,\\varepsilon)\\to S$ 使 $\\gamma_{v}(0) = p$、$\\dot\\gamma_{v}(0) = v$。并且解光滑依赖于初值 $(p,v)$，还满足齐次性',
        '',
        '$$\\gamma_{cv}(t) = \\gamma_{v}(ct)\\qquad (c > 0).$$',
        '',
        '于是从任意一点沿任意方向都能出发，而「出发速度的大小」只决定走多快、不决定走哪条。'
      ].join('\n'),
      notes: [
        '**这是纯 ODE 定理**：测地线方程是一阶化之后的方程组 $\\dot x^{k} = u^{k}$、$\\dot u^{k} = -\\Gamma^{k}_{ij}(x)u^{i}u^{j}$，右端关于 $(x,u)$ 光滑（$\\Gamma$ 光滑），于是 Picard–Lindelöf 给出局部存在唯一，解对初值的光滑依赖由同一套定理的加强版给出。',
        '**齐次性为什么成立**：方程在 $s\\mapsto cs$ 下齐二次，$t\\mapsto\\gamma_{v}(ct)$ 与 $t\\mapsto\\gamma_{cv}(t)$ 满足同一个初值问题，由唯一性即得。**这条齐次性是指数映射能定义出来的唯一理由**。',
        '**整体存在不必**：解只保证延拓到极大区间，可能在有限时间「跑出曲面」（例如 $\\mathbb{R}^{2}\\setminus\\{0\\}$ 上的直线，或开曲面上走向无穷远的测地线）。紧致曲面才自动完备（Hopf–Rinow 的整体版本）。',
        '⚠️ 「唯一」是**在同一条曲线**意义下的唯一；换一个仿射参数得到的仍是同一条曲线的重参数化，不是另一个解。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 测地线的存在与唯一性',
        'do Carmo, Riemannian Geometry, 「测地线」一章·指数映射'
      ]
    },

    /* ------------------------------------------------ 测地曲率 */
    {
      id: 'def.geodesic-curvature',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '测地曲率',
      title: '测地曲率',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '测地曲率'],
      statement: [
        '设 $\\gamma$ 是 $S$ 上按弧长参数化的曲线，$n$ 是 $S$ 的单位法向。**测地曲率向量**与**测地曲率**分别是',
        '',
        '$$\\vec\\kappa_{g} = \\nabla_{\\dot\\gamma}\\dot\\gamma = (\\ddot\\gamma)^{\\top},\\qquad k_{g} = \\langle \\vec\\kappa_{g},\\,n\\times\\dot\\gamma\\rangle = \\langle \\ddot\\gamma,\\,n\\times\\dot\\gamma\\rangle,$$',
        '',
        '其中 $(\\cdot)^{\\top}$ 表示投到切平面，$n\\times\\dot\\gamma$ 是切平面内与 $\\dot\\gamma$ 正交的单位向量（Darboux 标架 $(T,n,u)$ 里的 $u$，$T = \\dot\\gamma$）。于是「$k_{g}$ 恒等于零」正好就是测地线的判据：',
        '',
        '$$k_{g}(\\gamma)\\equiv 0 \\iff \\nabla_{\\dot\\gamma}\\dot\\gamma\\equiv 0 .$$'
      ].join('\n'),
      notes: [
        '**符号**：$k_{g}$ 依赖定向。$(T,u,n)$ 取正向时 $u = n\\times T$，曲线往 $u$ 那一侧拐则 $k_{g} > 0$。把 $u$ 换成 $-u$ 就整体反号 —— 讨论「$k_{g}$ 的积分」时必须先把定向说清楚，高斯–博内定理里这件事格外要紧。',
        '**为什么内蕴**：$\\ddot\\gamma$ 的切向部分只用到 $\\nabla$（也就是 $I$），完全不需要 $n$ 或第二基本形式。所以 $k_{g}$ 是内蕴量，与 $\\kappa_{n}$ 正相反。',
        '**平面上**：$\\nabla$ 就是普通导数，$\\vec\\kappa_{g} = \\ddot\\gamma$，$k_{g}$ 退化为有号曲率 $\\kappa$（半径 $r$ 的圆：$k_{g} = \\pm 1/r$）。曲面上的 $k_{g}$ 就是「把曲面沿曲线摊平之后」看到的曲率。',
        '**与平行移动的关系**：$\\vec\\kappa_{g}$ 度量「切向量偏离平行移动有多快」；$\\vec\\kappa_{g}\\equiv0$ 就是「切向量沿自身平行」，也就是测地线。',
        '⚠️ 与 $\\kappa$ 的区别见曲率分解那一条：$\\kappa^{2} = k_{g}^{2}+\\kappa_{n}^{2}$。$k_{g}$ 是 $\\kappa$ 的切向分量，$\\kappa_{n}$ 是法向分量。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 测地曲率',
        'do Carmo, Differential Forms and Applications, 第 3 章「联络形式」· 测地曲率与联络形式'
      ]
    },

    {
      id: 'thm.liouville-formula',
      cluster: 'diffgeom.intrinsic',
      type: 'theorem',
      label: '刘维尔公式',
      title: '测地曲率的刘维尔公式',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '内蕴几何', '测地曲率', '刘维尔公式'],
      statement: [
        '白话：**测地曲率 = 曲线自己转的角度减去标架被度量「带着转」的角度**，而后者只由 $E, G$ 的偏导数决定。所以只要知道度量（也就是 $I$），就能算出任何曲线的测地曲率 —— 不需要曲面怎么嵌在 $\\mathbb{R}^{3}$ 里。',
        '',
        '设 $(u,v)$ 是 $S$ 的**正交**参数网（$F = 0$，$I = E\\,\\mathrm{d}u^{2}+G\\,\\mathrm{d}v^{2}$），$\\gamma$ 按弧长参数化，$\\theta(s)$ 是 $\\dot\\gamma(s)$ 与 $u$ 线（$\\partial_{u}$ 方向）的夹角。则',
        '',
        '$$k_{g}(\\gamma) = \\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}-\\frac{(\\ln E)_{v}}{2\\sqrt{G}}\\cos\\theta+\\frac{(\\ln G)_{u}}{2\\sqrt{E}}\\sin\\theta.$$',
        '',
        '特别地：$\\gamma$ 是测地线当且仅当 $\\theta$ 满足这个一阶方程 —— 测地线的「转向」，被度量系数的导数完全决定。'
      ].join('\n'),
      notes: [
        '**结构**：$k_{g} = \\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}-\\omega^{1}_{2}(\\dot\\gamma)$，第一项是曲线相对标架的转角，第二项是标架本身的转动；把 $\\omega^{1}_{2} = \\frac{(\\ln E)_{v}}{2\\sqrt G}\\omega^{1}-\\frac{(\\ln G)_{u}}{2\\sqrt E}\\omega^{2}$ 代进去就是上式。',
        '**两处校验**（都能手算）：',
        [
          '- 平面极坐标（$E = 1$，$G = \\rho^{2}$）上半径 $\\rho_{0}$ 的同心圆：$\\theta\\equiv\\frac{\\pi}{2}$、$\\frac{\\mathrm{d}\\theta}{\\mathrm{d}s} = 0$，公式给 $k_{g} = \\frac{2/\\rho_{0}}{2} = \\frac{1}{\\rho_{0}}$ —— 圆的曲率，正确；',
          '- 球面（$I = \\mathrm{d}\\rho^{2}+\\sin^{2}\\rho\\,\\mathrm{d}\\theta^{2}$）上的纬线圈 $\\rho = \\rho_{0}$：$k_{g} = \\frac{2\\cot\\rho_{0}}{2} = \\cot\\rho_{0}$，与直接计算一致。'
        ].join('\n'),
        '⚠️ 一个常见的误写是在「曲率线参数」下把上式再简化成 $\\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}+(k_{1}-k_{2})\\sin\\theta\\cos\\theta$。用球面就能否掉它：平行圆上 $\\theta\\equiv\\frac{\\pi}{2}$、$\\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}\\equiv 0$，而 $k_{g} = \\cot\\rho_{0}\\ne0$；球面 $k_{1} = k_{2} = 1$ 又让右端的两项全为零。**该简化式不成立，不要用。**',
        '**特例**：正交网若还是测地参数（$E\\equiv1$），公式退化为 $k_{g} = \\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}+\\frac{(\\ln G)_{u}}{2}\\sin\\theta$；再若 $G$ 不依赖 $u$，就是平面极坐标那一种情形。',
        '⭐ 这条公式是「量 $k_{g}$ 只需要 $I$」的**显式版本**：右端只有 $E,G$ 和曲线自己的角度，没有任何外在数据。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 测地曲率',
        'do Carmo, Differential Forms and Applications, 第 3 章「联络形式」· 联络形式与测地曲率'
      ]
    },

    {
      id: 'prop.curvature-split',
      cluster: 'diffgeom.intrinsic',
      type: 'proposition',
      label: '曲率分解',
      title: '法曲率与测地曲率的分解',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '内蕴几何', '测地曲率', '法曲率'],
      statement: [
        '设 $\\gamma$ 是 $S$ 上按弧长参数化的曲线，$n$ 是 $S$ 的单位法向，$\\kappa$、$\\kappa_{n}$、$k_{g}$ 分别是它在 $\\mathbb{R}^{3}$ 中的曲率、关于 $n$ 的法曲率和测地曲率。则 $\\{n,\\,n\\times\\dot\\gamma\\}$ 是 $\\dot\\gamma$ 的正交补的一组单位正交基，且',
        '',
        '$$\\ddot\\gamma = \\kappa_{n}n+k_{g}\\,(n\\times\\dot\\gamma),\\qquad \\kappa^{2} = k_{g}^{2}+\\kappa_{n}^{2},$$',
        '',
        '其中 $\\kappa_{n} = \\mathrm{II}(\\dot\\gamma,\\dot\\gamma) = -\\langle \\dot\\gamma,\\mathrm{d}n(\\dot\\gamma)\\rangle$。'
      ].join('\n'),
      notes: [
        '**证明就是正交分解**：$|\\dot\\gamma| = 1$ 给出 $\\ddot\\gamma\\perp\\dot\\gamma$，而 $\\{n, n\\times\\dot\\gamma\\}$ 是 $\\dot\\gamma$ 的正交补的一组单位正交基；两个分量就是两个内积，模长的勾股关系即得。',
        '**这是「内蕴 vs 外在」的定量版**：$\\kappa$ 是空间量，$\\kappa_{n}$ 纯外在（必须用 $n$），$k_{g}$ 纯内蕴（只用 $\\nabla$）。三者被一条勾股关系绑住 —— 知道两个就有第三个。',
        '**两个特例**：$k_{g}\\equiv0$（测地线）时 $|\\kappa| = |\\kappa_{n}|$，此时曲线的曲率整个来自曲面的弯曲；$\\kappa_{n}\\equiv0$（曲线落在一条渐近线上）时 $|\\kappa| = |k_{g}|$，曲率整个来自曲面内部的转动。',
        '⚠️ $H = \\frac{1}{2}(k_{1}+k_{2})$ 与 $\\kappa_{n}$ 都是外在量，不能用 $I$ 算出来，所以它们在内蕴几何里不出现。反过来说：任何只用 $\\kappa$ 与 $k_{g}$ 拼出来的量都不该出现在内蕴公式里 —— 除非恰好拼成 $K$ 或它的导数。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「高斯映射的几何」· 法曲率',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 测地曲率'
      ]
    },

    /* ------------------------------------------------ 指数映射 */
    {
      id: 'def.exponential-map',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '指数映射',
      title: '指数映射与法坐标',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '指数映射', '法坐标'],
      statement: [
        '白话：**指数映射把「朝哪个方向走多远」变成「最后落在哪一点」** —— 从一个切向量 $v$ 出发、沿测地线走 $1$ 秒，落点就是 $\\exp_{p}(v)$。有了它，弯曲曲面在 $p$ 附近就能用平面上的极坐标 $(\\rho,\\theta)$ 记账。',
        '',
        '固定 $p \\in S$。由测地线的存在唯一性，每个 $v \\in T_{p}S$ 有唯一测地线 $\\gamma_{v}$ 满足 $\\gamma_{v}(0) = p$、$\\dot\\gamma_{v}(0) = v$。**指数映射**定义为',
        '',
        '$$\\exp_{p}(v) = \\gamma_{v}(1) = \\gamma_{v/|v|}(|v|),\\qquad \\exp_{p}(0) = p,$$',
        '',
        '它是 $T_{p}S$ 中原点的一个邻域到 $S$ 上 $p$ 的一个邻域的光滑映射，且',
        '',
        '$$(\\mathrm{d}\\exp_{p})_{0} = \\mathrm{id}_{T_{p}S},$$',
        '',
        '于是由反函数定理，$\\exp_{p}$ 在原点附近是微分同胚。取 $T_{p}S$ 的一组单位正交基，把 $v = x^{1}e_{1}+x^{2}e_{2}$ 送到 $\\exp_{p}(v)$ 得到的坐标叫**法坐标**；改用极坐标 $(\\rho,\\theta)$ 则是**测地极坐标**。'
      ].join('\n'),
      notes: [
        '**$(\\mathrm{d}\\exp_{p})_{0} = \\mathrm{id}$ 的三行算法**：取 $c(t) = tv$，则 $(\\mathrm{d}\\exp_{p})_{0}(v) = \\frac{\\mathrm{d}}{\\mathrm{d}t}\\big|_{t=0}\\exp_{p}(tv) = \\frac{\\mathrm{d}}{\\mathrm{d}t}\\big|_{t=0}\\gamma_{v}(t) = \\dot\\gamma_{v}(0) = v$。这就是「齐次性」换来的东西。',
        '**法坐标在 $p$ 处是欧氏的**：由上一行得 $g_{ij}(p) = \\delta_{ij}$，进一步还有 $\\Gamma^{k}_{ij}(p) = 0$ 与 $\\partial_{k}g_{ij}(p) = 0$（见「法坐标的欧氏性」那条引理）。⚠️ 只在 $p$ **一点**成立 —— 若在邻域上成立，曲面就平了。',
        '**测地极坐标的构造**：$(\\rho,\\theta)\\mapsto \\exp_{p}(\\rho\\cos\\theta\\,e_{1}+\\rho\\sin\\theta\\,e_{2})$。第一条坐标线是测地线、$\\rho$ 是弧长，第二条是「测地圆」。由高斯引理，第一基本形式在这个坐标下只剩 $I = \\mathrm{d}\\rho^{2}+G(\\rho,\\theta)\\,\\mathrm{d}\\theta^{2}$。',
        '⚠️ $\\exp_{p}$ 一般**不是**整体微分同胚：沿一条测地线走太远会撞上另一条测地线的像（对径点、割迹）。只有在单射半径以内它才是微分同胚，越过之后坐标会重复，$I = \\mathrm{d}\\rho^{2}+G\\,\\mathrm{d}\\theta^{2}$ 也失效。',
        '⭐ 指数映射的用处是**把测地线问题变成坐标问题**：所有「径向」的事情都变成「坐标线」，于是内蕴几何可以用微积分硬算。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 指数映射',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「高斯映射的几何」· 法坐标'
      ]
    },

    {
      id: 'lem.gauss-lemma',
      cluster: 'diffgeom.intrinsic',
      type: 'lemma',
      label: '高斯引理',
      title: '高斯引理与测地极坐标',
      regions: ['diffgeom'],
      tags: ['引理', '微分几何', '内蕴几何', '高斯引理', '测地极坐标'],
      statement: [
        '设 $p \\in S$、$v \\in T_{p}S$、$w \\in T_{v}(T_{p}S)$。则',
        '',
        '$$\\langle (\\mathrm{d}\\exp_{p})_{v}(v),\\,(\\mathrm{d}\\exp_{p})_{v}(w)\\rangle = \\langle v,w\\rangle .$$',
        '',
        '也就是说：指数映射在径向方向上按弧长成比例（测地线按弧长参数化），而**测地线与测地圆处处正交**。写成测地极坐标就是',
        '',
        '$$I = \\mathrm{d}\\rho^{2}+G(\\rho,\\theta)\\,\\mathrm{d}\\theta^{2},\\qquad \\sqrt{G} = \\rho+O(\\rho^{3}).$$'
      ].join('\n'),
      notes: [
        '**证明骨架（细节在边上）**：沿测地线对 $\\langle \\partial_{\\rho},\\partial_{\\theta}\\rangle$ 求 $\\rho$ 的导数，第一项因测地线为零，第二项用 $[\\partial_{\\rho},\\partial_{\\theta}] = 0$ 与 $|\\partial_{\\rho}| = 1$ 化成 $\\frac{1}{2}\\partial_{\\theta}\\langle \\partial_{\\rho},\\partial_{\\rho}\\rangle = 0$。于是这个内积沿 $\\rho$ 是常数；$\\rho\\to0$ 时 $\\partial_{\\theta}\\to0$，常数只能是 $0$。',
        '**同一个引理的两种说法**：几何说法是「径向 $\\perp$ 球面」（高斯引理的本来面貌）；坐标说法是「$F\\equiv0$」（测地极坐标下的展开）。而 $E = |\\partial_{\\rho}|^{2} = 1$ 只是因为 $\\rho$ 是弧长。',
        '⭐ **这是整门内蕴几何的枢纽**：它把「测地线」翻译成「坐标线」，于是 $I$ 在测地极坐标下只剩**一个**未知函数 $G$。而 $G$ 的展开系数就是曲率：',
        '$$\\sqrt{G(\\rho,\\theta)} = \\rho-\\frac{K(p)}{6}\\rho^{3}+O(\\rho^{5}),$$',
        '等价地，半径 $\\rho$ 的测地圆周长 $L(\\rho) = 2\\pi\\rho\\left(1-\\frac{K(p)}{6}\\rho^{2}+O(\\rho^{4})\\right)$。**一个会量长度的人就能把 $K$ 量出来** —— 这就是绝妙定理的操作形式。',
        '⚠️ 只在 $\\exp_{p}$ 是微分同胚的范围内成立；越过割迹，同一组 $(\\rho,\\theta)$ 会对应多个点。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 高斯引理与测地极坐标',
        'Petersen, Riemannian Geometry, 「高斯引理与法坐标」一章'
      ]
    },

    {
      id: 'lem.normal-coord-euclidean',
      cluster: 'diffgeom.intrinsic',
      type: 'lemma',
      label: '法坐标的欧氏性',
      title: '法坐标只在一阶上像欧氏坐标',
      regions: ['diffgeom'],
      tags: ['引理', '微分几何', '内蕴几何', '法坐标'],
      statement: [
        '设 $(x^{1},x^{2})$ 是 $p$ 处的法坐标。则在该点',
        '',
        '$$g_{ij}(p) = \\delta_{ij},\\qquad \\Gamma^{k}_{ij}(p) = 0,\\qquad \\partial_{k}g_{ij}(p) = 0 .$$',
        '',
        '即：度量在**任意一点**都可以被坐标一阶拉直。'
      ].join('\n'),
      notes: [
        '**$\\Gamma(p) = 0$ 的证明**（细节在边上）：$T_{p}S$ 中过原点的每条直线 $t\\mapsto tv$（$v = \\cos\\theta_{0}\\,e_{1}+\\sin\\theta_{0}\\,e_{2}$）在 $\\exp_{p}$ 下都是测地线，坐标就是 $x^{k}(t) = tv^{k}$。代入测地线方程得 $\\Gamma^{k}_{ij}(p)v^{i}v^{j} = 0$，对一切方向 $v$ 成立；于是 $\\Gamma$ 的对称部分为零，而 $\\Gamma$ 本来就关于下指标对称。',
        '**$\\partial_{k}g_{ij}(p) = 0$ 是它的推论**：$\\partial_{k}g_{ij} = \\langle \\nabla_{\\partial_{k}}\\partial_{i},\\partial_{j}\\rangle+\\langle \\partial_{i},\\nabla_{\\partial_{k}}\\partial_{j}\\rangle = \\Gamma^{\\ell}_{ki}g_{\\ell j}+\\Gamma^{\\ell}_{kj}g_{i\\ell}$，在 $p$ 处为零。',
        '⭐ **与曲率的关系**：既然 $\\Gamma$ 可以在一阶上被坐标杀掉，曲率张量里唯一杀不掉的就是 $\\partial\\Gamma$ 那一部分，而它由 $g$ 的二阶导数决定。这就是「曲率是二阶不可去掉的度量信息」的准确含义 —— 也正是它内蕴的理由。',
        '⚠️ 只在一个点上成立。若要求整个邻域上 $\\Gamma\\equiv0$，那等价于局部等距于平面（$R\\equiv0$）；两者的差距就是曲率。',
        '**用起来最爽的地方**：需要算一个张量恒等式时，挑 $p$ 为任意点、用 $p$ 处的法坐标，$\\Gamma$ 与 $\\partial g$ 全消失，只剩 $g_{ij} = \\delta_{ij}$ —— 对称性论证就退化成线性代数。因为恒等式是张量等式，一点成立即处处成立。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「高斯映射的几何」· 法坐标',
        'Petersen, Riemannian Geometry, 「高斯引理与法坐标」一章·法坐标下度量的展开'
      ]
    },

    /* ------------------------------------------------ 曲率 */
    {
      id: 'def.curvature-tensor',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '黎曼曲率张量',
      title: '黎曼曲率张量与局部平坦性',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '曲率张量', '比安基恒等式'],
      statement: [
        '白话：**曲率张量量的是「沿两个方向搬来搬去，顺序换一下，结果差多少」**。在平坦的平面里怎么换都对，差为零；在球面上换顺序就会差一点，那一点就是曲率。它是内蕴的：公式里只出现 $g$ 与它的导数，没有法向、没有第二基本形式。',
        '',
        '曲面上的 Levi-Civita 联络定义**曲率算子**',
        '',
        '$$R(X,Y)Z = \\nabla_{X}\\nabla_{Y}Z-\\nabla_{Y}\\nabla_{X}Z-\\nabla_{[X,Y]}Z,$$',
        '',
        '在坐标下记 $R(\\partial_{i},\\partial_{j})\\partial_{k} = R^{\\ell}_{ijk}\\partial_{\\ell}$，其中',
        '',
        '$$R^{\\ell}_{ijk} = \\partial_{i}\\Gamma^{\\ell}_{jk}-\\partial_{j}\\Gamma^{\\ell}_{ik}+\\Gamma^{\\ell}_{ip}\\Gamma^{p}_{jk}-\\Gamma^{\\ell}_{jp}\\Gamma^{p}_{ik},$$',
        '',
        '并降下标 $R_{ijk\\ell} = g_{\\ell p}R^{p}_{ijk}$。它满足',
        '',
        '$$R_{ijk\\ell} = -R_{jik\\ell} = -R_{ij\\ell k} = R_{k\\ell ij},\\qquad R_{ijk\\ell}+R_{jki\\ell}+R_{kij\\ell} = 0$$',
        '',
        '（后者是**第一比安基恒等式**）。**平坦判据**：$R\\equiv0$ 当且仅当每点附近有坐标使 $g_{ij} = \\delta_{ij}$，即曲面局部等距于平面。'
      ].join('\n'),
      notes: [
        '**来处是可积性条件**。想找坐标把 $g_{ij}$ 拉成 $\\delta_{ij}$，等价于解 $g_{ij} = \\delta_{\\alpha\\beta}\\frac{\\partial y^{\\alpha}}{\\partial x^{i}}\\frac{\\partial y^{\\beta}}{\\partial x^{j}}$；而「$\\partial_{i}\\partial_{j} = \\partial_{j}\\partial_{i}$」的相容性要求的正是 $R^{\\ell}_{ijk} = 0$。所以 $R$ 从一开始就是「能不能把度量摊平」的阻碍。',
        '**Ricci 恒等式**：$[\\nabla_{\\partial_{i}},\\nabla_{\\partial_{j}}]\\partial_{k} = R^{\\ell}_{ijk}\\partial_{\\ell}$。所以 $R$ 度量的是「协变导数交换次序差多少」—— 这是它最常用的定义方式，也是本图选它的理由。',
        '**为什么内蕴**：$R$ 的公式里只有 $\\Gamma$ 与 $\\partial\\Gamma$，而 $\\Gamma$ 只有 $g$ 与 $\\partial g$。**第二基本形式没有出现。**',
        '⚠️ 二维时独立分量只有一个（$R_{1212}$，其余由对称性决定），所以曲面上的「曲率」是一个数而不是一堆数；三维以上 $R$ 才真正有张量结构（那时 $K$ 只能给出它的迹的部分）。',
        '⚠️ 符号约定：本包取上式。换一种约定（把括号里两个 $\\Gamma$ 乘积项搬到另一边）会让所有分量整体反号，曲率的所有**定义**随之反号，而几何内容不变。用单位球面检验是分辨约定最快的办法。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 曲率张量',
        'do Carmo, Riemannian Geometry, 「曲率」一章·Ricci 恒等式与比安基恒等式'
      ]
    },

    {
      id: 'def.gauss-curvature',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '高斯曲率',
      title: '高斯曲率的内蕴定义',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '内蕴几何', '高斯曲率', '曲率张量'],
      statement: [
        '白话：二维曲面上「曲率」其实只有**一个数**，这个数就是高斯曲率 $K$。这里用曲率张量的一个分量算出它，下一节点（绝妙定理）再说明它和 $k_{1}k_{2}$ 是同一个数。',
        '',
        '曲面 $S$ 在点 $p$ 的**高斯曲率**由曲率张量定义为',
        '',
        '$$K(p) = \\frac{\\langle R(\\partial_{1},\\partial_{2})\\partial_{2},\\partial_{1}\\rangle}{\\det(g_{ij})} = \\frac{R_{1221}}{g_{11}g_{22}-g_{12}^{2}},$$',
        '',
        '（$1,2$ 是局部坐标指标）。在单位正交标架 $e_{1},e_{2}$ 下它退化为',
        '',
        '$$K = \\langle R(e_{1},e_{2})e_{2},e_{1}\\rangle .$$',
        '',
        '另一方面，若 $h_{ij}$ 是第二基本形式在同一标架下的系数矩阵，则 $K = \\det(h_{ij}) = k_{1}k_{2}$。'
      ].join('\n'),
      notes: [
        '⚠️ **符号与指标顺序**（本包全包统一）：$R_{ijk\\ell} = \\langle R(\\partial_{i},\\partial_{j})\\partial_{k},\\partial_{\\ell}\\rangle$，于是单位球面（$K = 1$、$g_{ij} = \\delta_{ij}$）上 $R_{1221} = 1$、$R_{1212} = -1$。很多书写成「$K = R_{1212}/\\det g$」，那用的是另一种指标顺序（或另一种 $R$ 的符号），数学上是同一件事。**判断约定对不对的检查只有一条：单位球面必须给出 $K = 1$。**',
        '**与缩并写法 $\\frac{1}{2}g^{ik}g^{j\\ell}R_{ijk\\ell}$ 的关系**：二维只有一个独立分量，把四个指标枚举一遍就得到 $K = -\\frac{1}{2}g^{ik}g^{j\\ell}R_{ijk\\ell}$（本包约定下的符号）。两个写法给的是同一个数，差别只在指标顺序带来的负号。',
        '**两条路都通向它**：',
        [
          '- 内蕴方向：$R$ 只含 $g$ 及其一、二阶导数（$\\Gamma$ 一阶、$R$ 含 $\\partial\\Gamma$），所以只要知道 $I$ 就能把 $K$ 算出来；',
          '- 外在方向：$K = k_{1}k_{2} = \\det(h_{ij})$，用的是两个主曲率。'
        ].join('\n'),
        '两条路给出同一个数，这就是**绝妙定理**的内容 —— 在那个节点里给证明。',
        '⚠️ $K$ 是**一个点**上的量，与「曲线的曲率」没有直接大小关系：$K = 1$ 的曲面上可以有曲率为 $0$ 的曲线（测地线），$K = 0$ 的柱面上可以有曲率非零的曲线。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 高斯曲率',
        'do Carmo, Differential Forms and Applications, 第 4 章「结构方程」· 高斯方程'
      ]
    },

    {
      id: 'thm.theorema-egregium',
      cluster: 'diffgeom.intrinsic',
      type: 'theorem',
      label: '绝妙定理',
      title: '高斯曲率是内蕴量',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '内蕴几何', '高斯曲率', '绝妙定理'],
      statement: [
        '高斯曲率 $K$ 只依赖第一基本形式 $I$。准确地说：若 $\\varphi : S_{1}\\to S_{2}$ 是局部等距，则',
        '',
        '$$K_{1}(p) = K_{2}(\\varphi(p))\\qquad (p \\in S_{1}).$$',
        '',
        '等价地，$K$ 可以只用 $g_{ij}$ 及其一、二阶导数写成一条公式。',
        '',
        '而 $K$ 的原始定义 $k_{1}k_{2}$ 用到第二基本形式（外在量）—— 所以这不是定义的推论，而是定理。'
      ].join('\n'),
      notes: [
        '**为什么叫「绝妙」**：$K$ 是两个主曲率的乘积，主曲率来自 $\\mathrm{d}n$，而 $n$ 是 $\\mathbb{R}^{3}$ 里的单位法向 —— 怎么看都是外在数据。可它竟然只靠曲面内部的度量就能读出来。内蕴几何的全部结果（高斯–博内、单值化、$K$ 的拓扑含义）都从这一条长出来。',
        '**操作的读法**：如果一个人住在曲面里、只能量长度，他仍然能测出 $K$。量半径 $\\rho$ 的小测地圆周长 $L(\\rho)$，则',
        '$$K(p) = \\frac{3}{\\pi}\\lim_{\\rho\\to0}\\frac{2\\pi\\rho-L(\\rho)}{\\rho^{3}}.$$',
        '这是把绝妙定理变成实验的说法：曲率就是「圆周长比 $2\\pi\\rho$ 短多少」的三阶速率。',
        '**两个佐证**：柱面（$K = 0$）与平面局部等距，曲率必然相同；球面（$K = 1/R^{2}$）与任何 $K = 0$ 的曲面都不局部等距，所以曲率确实是等距不变量。',
        '⚠️ **不内蕴的东西**：$k_{1}$、$k_{2}$、$H$ 都不内蕴（柱面与平面就是反例：$k_{1}$ 分别是 $1/R$ 与 $0$）。绝妙定理只对**乘积**成立，不对因子成立。这也解释了为什么内蕴几何里 $K$ 处处出现而 $H$ 几乎不出现。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 高斯的绝妙定理',
        'do Carmo, Differential Forms and Applications, 第 4 章「结构方程」· 高斯方程与绝妙定理'
      ]
    },

    {
      id: 'thm.gauss-bonnet',
      cluster: 'diffgeom.intrinsic',
      type: 'theorem',
      label: '高斯博内定理',
      title: '高斯博内定理与欧拉示性数',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '内蕴几何', '高斯博内', '欧拉示性数'],
      statement: [
        '设 $M \\subseteq \\mathbb{R}^{3}$ 是紧致、可定向的曲面（允许带分段光滑边界）。则',
        '',
        '$$\\int_{M}K\\,\\mathrm{d}A+\\int_{\\partial M}k_{g}\\,\\mathrm{d}s = 2\\pi\\chi(M),$$',
        '',
        '其中 $\\chi(M)$ 是欧拉示性数，$\\mathrm{d}A$ 是面积元，$\\partial M$ 取使 $M$ 落在左侧的定向。特别地，**闭**曲面（$\\partial M = \\emptyset$）上',
        '',
        '$$\\int_{M}K\\,\\mathrm{d}A = 2\\pi\\chi(M).$$',
        '',
        '于是 $K$ 的全积分是一个**拓扑**量：球面 $4\\pi$、环面 $0$、亏格 $g$ 的闭曲面 $4\\pi(1-g)$。'
      ].join('\n'),
      notes: [
        '**局部版是核心**（Gauss–Bonnet）：对由一条分段光滑简单闭曲线围成的区域 $D$，',
        '$$\\int_{D}K\\,\\mathrm{d}A+\\int_{\\partial D}k_{g}\\,\\mathrm{d}s = 2\\pi .$$',
        '整体版就是把它沿三角剖分求和，角落项在求和时自动整理成 $2\\pi\\chi$。详细的提纲在边上。',
        '**测地三角形的特例**：若 $\\partial T$ 的三条边都是测地线（$k_{g}\\equiv0$），则 $\\alpha_{1}+\\alpha_{2}+\\alpha_{3}-\\pi = \\int_{T}K\\,\\mathrm{d}A$ —— 内角和超出 $\\pi$ 的部分，正好是高斯曲率的总量。球面上的八分之一球面三角形：三个内角都是直角，$\\int_{T}K\\,\\mathrm{d}A = \\frac{\\pi}{2}$，与面积 $\\frac{4\\pi}{8}$ 相符。平面上所有三角形内角和都是 $\\pi$，正因为 $K\\equiv0$。',
        '⭐ **这条定理的位置**：它把「度量」与「拓扑」缝在一起 —— $K$ 是纯内蕴的度量量，$\\chi$ 是纯组合量，而它们的积分被钉死。曲面分类的度量侧（$K$ 的总量）与拓扑侧（亏格）从此等价。',
        '⚠️ 需要**可定向**：否则面积元与 $\\omega^{1}_{2}$ 的符号说不清，公式要么模 $2$、要么换成绝对值形式。本图不展开不可定向的情形。',
        '⚠️ 不需要**紧致**也可以有版本，但那时边界与端（尖点、漏斗）要各自记账，形式会变；本节点只写紧致情形，因为它是「$K$ 的积分 = 拓扑量」最干净的说法。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 高斯–博内定理',
        'do Carmo, Differential Forms and Applications, 第 4 章「结构方程」· 高斯–博内定理与指标定理'
      ]
    }
  ],

  edges: [

    /* ------------------------------------------------ 定义引用（自己的节点） */
    {
      id: 'dep.isometry-intrinsic',
      kind: 'definition',
      definition: 'def.isometry-surface',
      usedBy: 'def.intrinsic-quantity',
      note: '「内蕴量」正是用等距来定义的：等距不变的量叫内蕴量。所以内蕴性的判据永远是「拿一个等距去试」。'
    },
    {
      id: 'dep.christoffel-geodesic',
      kind: 'definition',
      definition: 'def.christoffel-symbol',
      usedBy: 'def.geodesic',
      note: '测地线方程里的二次项系数就是 $\\Gamma^{k}_{ij}$：测地线不变量地写成 $\\nabla_{\\dot\\gamma}\\dot\\gamma = 0$，一落到坐标就全靠 $\\Gamma$。'
    },
    {
      id: 'dep.geodesic-gcurv',
      kind: 'definition',
      definition: 'def.geodesic',
      usedBy: 'def.geodesic-curvature',
      note: '测地曲率是「测地线的偏离量」：以 $k_{g} = 0$ 的那一族曲线为基准，$k_{g}$ 度量一条曲线偏离它们多远。'
    },
    {
      id: 'dep.geodesic-exp',
      kind: 'definition',
      definition: 'def.geodesic',
      usedBy: 'def.exponential-map',
      note: '指数映射的定义就是把 $T_{p}S$ 的每条射线「顺着测地线走单位时间」，所以它整个建立在测地线的存在唯一性上。'
    },
    {
      id: 'dep.curv-gauss',
      kind: 'definition',
      definition: 'def.curvature-tensor',
      usedBy: 'def.gauss-curvature',
      note: '高斯曲率是曲率张量在二维时唯一独立分量的归一化：$K = R_{1221}/\\det(g)$。没有曲率张量，这个定义无法陈述。'
    },
    {
      id: 'dep.intrinsic-egregium',
      kind: 'definition',
      definition: 'def.intrinsic-quantity',
      usedBy: 'thm.theorema-egregium',
      note: '绝妙定理的结论用的是「内蕴」这个词，所以它必须先有定义：$K$ 是内蕴量 $\\iff$ 一切局部等距都保持它。'
    },
    {
      id: 'dep.gauss-bonnet',
      kind: 'definition',
      definition: 'def.gauss-curvature',
      usedBy: 'thm.gauss-bonnet',
      note: '高斯–博内定理的被积函数就是高斯曲率；定理说的是这个被积函数的全积分与拓扑量的关系。'
    },
    {
      id: 'dep.gcurv-bonnet',
      kind: 'definition',
      definition: 'def.geodesic-curvature',
      usedBy: 'thm.gauss-bonnet',
      note: '带边界的版本里，边界的贡献是测地曲率的积分 —— 少了 $k_{g}$ 的定义，公式右端的 $2\\pi$ 就解释不了。'
    },

    /* ------------------------------------------------ 定义引用（活动标架那一批） */
    {
      id: 'dep.iff-intrinsic',
      kind: 'definition',
      definition: 'def.first-fundamental-form',
      usedBy: 'def.intrinsic-quantity',
      note: '「内蕴」的定义就是「只依赖第一基本形式」。这句定义离开 $I$ 无法陈述。'
    },
    {
      id: 'dep.iff-christoffel',
      kind: 'definition',
      definition: 'def.first-fundamental-form',
      usedBy: 'def.christoffel-symbol',
      note: '克里斯托费尔记号的公式里只有 $g_{ij}$ 与 $\\partial_{k}g_{ij}$，而 $g_{ij}$ 就是 $I$ 的系数矩阵。'
    },
    {
      id: 'dep.iff-isometry',
      kind: 'definition',
      definition: 'def.first-fundamental-form',
      usedBy: 'def.isometry-surface',
      note: '局部等距的判定准则是「存在参数化使 $E,F,G$ 相同」，说的就是第一基本形式相同。'
    },
    {
      id: 'dep.frame-christoffel',
      kind: 'definition',
      definition: 'def.moving-frame',
      usedBy: 'prop.christoffel-frame',
      note: '该命题把联络系数搬到单位正交标架上讲，用的正是活动标架。'
    },
    {
      id: 'dep.conn-christoffel',
      kind: 'definition',
      definition: 'def.connection-form',
      usedBy: 'prop.christoffel-frame',
      note: '命题里的 $\\omega^{k}_{j}$ 就是联络形式；该命题的全部内容是「$\\omega$ 与 $\\Gamma$ 是同一件东西在两个标架下的样子」。'
    },
    {
      id: 'dep.secondff-split',
      kind: 'definition',
      definition: 'def.second-fundamental-form',
      usedBy: 'prop.curvature-split',
      note: '曲率分解里的法向分量就是第二基本形式：$\\kappa_{n} = \\mathrm{II}(\\dot\\gamma,\\dot\\gamma)$。'
    },
    {
      id: 'dep.normal-curv-split',
      kind: 'definition',
      definition: 'def.normal-curvature',
      usedBy: 'prop.curvature-split',
      note: '分解的另一半是法曲率；勾股关系 $\\kappa^{2} = k_{g}^{2}+\\kappa_{n}^{2}$ 讲的就是这两个曲率怎么拼成空间曲率。'
    },
    {
      id: 'dep.weingarten-split',
      kind: 'definition',
      definition: 'def.weingarten-map',
      usedBy: 'prop.curvature-split',
      note: '法曲率的第二种算法 $\\kappa_{n} = -\\langle \\dot\\gamma,\\mathrm{d}n(\\dot\\gamma)\\rangle$ 用的就是 Weingarten 变换。'
    },
    {
      id: 'dep.principal-liouville',
      kind: 'definition',
      definition: 'def.principal-curvature',
      usedBy: 'thm.liouville-formula',
      note: '刘维尔公式的 notes 里要用主曲率 $k_{1},k_{2}$ 去否掉一个常见的错误简化式，所以这里必须引用主曲率。'
    },

    /* ------------------------------------------------ 推导（证明写在边上） */
    {
      id: 'imp.christoffel-frame',
      kind: 'implication',
      sources: ['def.christoffel-symbol'],
      target: 'prop.christoffel-frame',
      proof: [
        '**① Koszul 公式在正交标架上退化。** 对单位正交标架 $e_{1},e_{2}$，Koszul 公式里的三个度量导数项 $e_{i}\\langle e_{j},e_{k}\\rangle$ 全为零，剩下',
        '$$2\\langle \\nabla_{e_{i}}e_{j},e_{k}\\rangle = \\langle [e_{i},e_{j}],e_{k}\\rangle-\\langle [e_{j},e_{k}],e_{i}\\rangle+\\langle [e_{k},e_{i}],e_{j}\\rangle .$$',
        '而正交标架下 $\\omega^{k}_{j}(e_{i}) = \\langle \\nabla_{e_{i}}e_{j},e_{k}\\rangle$，两边除以 $2$ 即得 ①。',
        '**② 算正交参数网的单位化标架。** $e_{1} = \\partial_{u}/\\sqrt E$、$e_{2} = \\partial_{v}/\\sqrt G$，于是对任意 $X$',
        '$$\\omega^{1}_{2}(X) = \\langle \\nabla_{X}e_{2},e_{1}\\rangle = \\frac{1}{\\sqrt{EG}}\\langle \\nabla_{X}\\partial_{v},\\partial_{u}\\rangle ,$$',
        '因为 $X$ 作用在系数 $1/\\sqrt G$ 上那一项与 $\\partial_{u}$ 正交。再用 $F = 0$ 得两条：',
        [
          '- $\\partial_{v}\\langle \\partial_{u},\\partial_{u}\\rangle = 2\\langle \\nabla_{\\partial_{v}}\\partial_{u},\\partial_{u}\\rangle = 2\\langle \\nabla_{\\partial_{u}}\\partial_{v},\\partial_{u}\\rangle$（用无挠 $[\\partial_{u},\\partial_{v}] = 0$），故 $\\langle \\nabla_{\\partial_{u}}\\partial_{v},\\partial_{u}\\rangle = \\frac{E_{v}}{2}$；',
          '- $\\partial_{v}\\langle \\partial_{v},\\partial_{u}\\rangle = 0$ 给出 $\\langle \\nabla_{\\partial_{v}}\\partial_{v},\\partial_{u}\\rangle = -\\frac{1}{2}\\partial_{u}\\langle \\partial_{v},\\partial_{v}\\rangle = -\\frac{G_{u}}{2}$。'
        ].join('\n'),
        '把 $X$ 按 $\\mathrm{d}u,\\mathrm{d}v$ 展开即得',
        '$$\\omega^{1}_{2} = \\frac{1}{\\sqrt{EG}}\\left(\\frac{E_{v}}{2}\\,\\mathrm{d}u-\\frac{G_{u}}{2}\\,\\mathrm{d}v\\right),$$',
        '再代入 $\\omega^{1} = \\sqrt E\\,\\mathrm{d}u$、$\\omega^{2} = \\sqrt G\\,\\mathrm{d}v$，得',
        '$$\\omega^{1}_{2} = \\frac{(\\ln E)_{v}}{2\\sqrt G}\\,\\omega^{1}-\\frac{(\\ln G)_{u}}{2\\sqrt E}\\,\\omega^{2}. \\quad\\blacksquare$$',
        '**与 $\\Gamma$ 的对照**：若坐标标架本身就单位正交（$E = G = 1$，$F = 0$，即度量已被坐标拉直），则 $\\omega^{1}_{2} = 0$，与「平坦坐标下 $\\Gamma\\equiv0$」一致。一般情形下差别来自 $[e_{1},e_{2}]\\ne0$：$e_{i}$ 不再完整，联络系数就多出括号项。'
      ].join('\n')
    },

    {
      id: 'imp.geodesic-existence',
      kind: 'implication',
      sources: ['def.geodesic', 'def.christoffel-symbol'],
      target: 'prop.geodesic-existence',
      proof: [
        '**一阶化。** 测地线方程是二阶组 $\\ddot x^{k} = -\\Gamma^{k}_{ij}(x)\\dot x^{i}\\dot x^{j}$。令 $u^{k} = \\dot x^{k}$，把它写成一阶组',
        '$$\\dot x^{k} = u^{k},\\qquad \\dot u^{k} = -\\Gamma^{k}_{ij}(x)u^{i}u^{j}.$$',
        '右端关于 $(x,u)$ 光滑（$\\Gamma$ 由光滑的 $g_{ij}$ 与 $g^{ij}$ 表出，因而光滑），于是 Picard–Lindelöf 定理给出：对每个初值 $(p,v)$ 存在 $\\varepsilon > 0$ 与唯一的解 $(x,u):(-\\varepsilon,\\varepsilon)\\to \\mathbb{R}^{4}$。同一套定理的「对参数的光滑依赖」部分给出解对 $(p,v)$ 的光滑依赖。',
        '**齐次性。** 设 $\\gamma_{v}$ 是初值为 $(p,v)$ 的解。定义 $\\sigma(t) = \\gamma_{v}(ct)$：由链式法则 $\\dot\\sigma(t) = c\\dot\\gamma_{v}(ct)$、$\\ddot\\sigma(t) = c^{2}\\ddot\\gamma_{v}(ct)$，代入方程得',
        '$$\\ddot\\sigma^{k}+\\Gamma^{k}_{ij}(\\sigma)\\dot\\sigma^{i}\\dot\\sigma^{j} = c^{2}\\left(\\ddot\\gamma_{v}^{k}+\\Gamma^{k}_{ij}(\\gamma_{v})\\dot\\gamma_{v}^{i}\\dot\\gamma_{v}^{j}\\right) = 0,$$',
        '且 $\\sigma(0) = p$、$\\dot\\sigma(0) = cv$。由唯一性 $\\sigma = \\gamma_{cv}$，即 $\\gamma_{cv}(t) = \\gamma_{v}(ct)$。',
        '**是测地线且按弧长参数化。** 解出来的曲线满足 $\\nabla_{\\dot\\gamma}\\dot\\gamma = 0$，正是测地线；又 $\\frac{\\mathrm{d}}{\\mathrm{d}s}\\langle \\dot\\gamma,\\dot\\gamma\\rangle = 2\\langle \\nabla_{\\dot\\gamma}\\dot\\gamma,\\dot\\gamma\\rangle = 0$，故速度恒定。$\\blacksquare$'
      ].join('\n')
    },

    {
      id: 'imp.gauss-lemma',
      kind: 'implication',
      sources: ['def.exponential-map', 'def.geodesic'],
      target: 'lem.gauss-lemma',
      proof: [
        '**先证 $\\langle \\partial_{\\rho},\\partial_{\\theta}\\rangle = 0$。** 在测地极坐标下 $\\gamma(\\rho,\\theta) = \\exp_{p}(\\rho\\cos\\theta\\,e_{1}+\\rho\\sin\\theta\\,e_{2})$。对固定的 $\\theta$，$\\rho\\mapsto\\gamma(\\rho,\\theta)$ 是测地线且按弧长参数化，所以 $|\\partial_{\\rho}| = 1$ 且 $\\nabla_{\\partial_{\\rho}}\\partial_{\\rho} = 0$；又 $\\partial_{\\rho},\\partial_{\\theta}$ 是坐标向量场，$[\\partial_{\\rho},\\partial_{\\theta}] = 0$。于是',
        '$$\\partial_{\\rho}\\langle \\partial_{\\rho},\\partial_{\\theta}\\rangle = \\langle \\nabla_{\\partial_{\\rho}}\\partial_{\\rho},\\partial_{\\theta}\\rangle+\\langle \\partial_{\\rho},\\nabla_{\\partial_{\\rho}}\\partial_{\\theta}\\rangle = 0+\\langle \\partial_{\\rho},\\nabla_{\\partial_{\\theta}}\\partial_{\\rho}\\rangle = \\frac{1}{2}\\partial_{\\theta}\\langle \\partial_{\\rho},\\partial_{\\rho}\\rangle = 0 .$$',
        '第一步用了测地线方程，第二步用了无挠（$[\\partial_{\\rho},\\partial_{\\theta}] = 0$），第三步用了 $|\\partial_{\\rho}| = 1$。所以这个内积沿 $\\rho$ 是常数。',
        '**定常数。** $\\rho\\to0$ 时所有射线汇到同一点 $p$，$\\partial_{\\theta}\\to0$（其长度 $O(\\rho)$），故内积的极限为 $0$，常数只能是 $0$：$F\\equiv0$，即 $I = \\mathrm{d}\\rho^{2}+G\\,\\mathrm{d}\\theta^{2}$，其中 $E = |\\partial_{\\rho}|^{2} = 1$。',
        '**一般形式（任意方向的 $w$）。** 把 $w\\in T_{v}(T_{p}S)\\cong T_{p}S$ 分解成径向部分 $\\lambda v$ 与正交部分 $w^{\\perp}$。正交部分用上面同一套计算（把 $v,w^{\\perp}$ 张成的平面当成 $\\rho\\theta$ 平面）得 $\\langle (\\mathrm{d}\\exp_{p})_{v}(v),(\\mathrm{d}\\exp_{p})_{v}(w^{\\perp})\\rangle = 0$。径向部分：$t\\mapsto\\exp_{p}((1+t)v) = \\gamma_{v}(1+t)$ 是单位速度测地线的重参数化，故 $(\\mathrm{d}\\exp_{p})_{v}(v) = \\dot\\gamma_{v}(1)$，长度是 $|v|$，于是 $(\\mathrm{d}\\exp_{p})_{v}(\\lambda v) = \\lambda\\dot\\gamma_{v}(1)$ 给出 $\\lambda|v|^{2}$。两部分相加：',
        '$$\\langle (\\mathrm{d}\\exp_{p})_{v}(v),(\\mathrm{d}\\exp_{p})_{v}(w)\\rangle = \\lambda|v|^{2}+0 = \\langle v,\\,\\lambda v+w^{\\perp}\\rangle .$$',
        '这正是 Gauss 引理。',
        '**$\\sqrt G$ 的展开。** $G = |\\partial_{\\theta}|^{2}$。$(-\\rho,\\theta+\\pi)$ 与 $(\\rho,\\theta)$ 是同一点，故 $G$ 在 $\\rho$ 方向上是偶的（$\\theta$ 上差 $\\pi$），Taylor 展开只有 $\\rho$ 的偶次项：$G = \\rho^{2}+c_{4}\\rho^{4}+O(\\rho^{6})$，即 $\\sqrt G = \\rho+O(\\rho^{3})$。二次项系数为 $1$ 是因为 $(\\mathrm{d}\\exp_{p})_{0} = \\mathrm{id}$：$\\rho = 0$ 处的一阶行为就是欧氏的。$\\blacksquare$'
      ].join('\n')
    },

    {
      id: 'imp.normal-coord',
      kind: 'implication',
      sources: ['def.exponential-map'],
      target: 'lem.normal-coord-euclidean',
      proof: [
        '**$g_{ij}(p) = \\delta_{ij}$** 就是 $(\\mathrm{d}\\exp_{p})_{0} = \\mathrm{id}$ 在坐标下的写法：基向量 $e_{i}$ 被送到 $\\partial_{i}|_{p}$。',
        '**$\\Gamma^{k}_{ij}(p) = 0$。** $T_{p}S$ 中过原点的直线 $t\\mapsto tv$ 在 $\\exp_{p}$ 下是测地线，其中 $v = \\cos\\theta_{0}\\,e_{1}+\\sin\\theta_{0}\\,e_{2}$。它在法坐标下的分量就是 $x^{k}(t) = tv^{k}$，于是 $\\dot x^{i} = v^{i}$、$\\ddot x^{k} = 0$。代入测地线方程得',
        '$$\\Gamma^{k}_{ij}(p)v^{i}v^{j} = 0,$$',
        '对一切方向 $v$ 都要成立。',
        '把 $v$ 换成 $v+w$ 再与 $v$、$w$ 两式相减，得 $\\Gamma^{k}_{ij}(p)(v^{i}w^{j}+w^{i}v^{j}) = 0$；任取单位方向即得 $\\Gamma^{k}_{ij}(p)+\\Gamma^{k}_{ji}(p) = 0$，也就是说 $\\Gamma^{k}_{ij}(p)$ 的对称部分为零。而 $\\Gamma^{k}_{ij}$ 本来就关于 $i,j$ 对称（无挠），故 $\\Gamma^{k}_{ij}(p) = 0$。',
        '**$\\partial_{k}g_{ij}(p) = 0$。**',
        '$$\\partial_{k}g_{ij} = \\langle \\nabla_{\\partial_{k}}\\partial_{i},\\partial_{j}\\rangle+\\langle \\partial_{i},\\nabla_{\\partial_{k}}\\partial_{j}\\rangle = \\Gamma^{\\ell}_{ki}g_{\\ell j}+\\Gamma^{\\ell}_{kj}g_{i\\ell},$$',
        '在 $p$ 处两个 $\\Gamma$ 都为零，右端为零。$\\blacksquare$'
      ].join('\n')
    },

    {
      id: 'imp.liouville',
      kind: 'implication',
      sources: ['def.geodesic-curvature', 'prop.christoffel-frame'],
      target: 'thm.liouville-formula',
      proof: [
        '**第一步：曲线在正交标架里的绝对导数。** 取 $e_{1} = \\partial_{u}/\\sqrt E$、$e_{2} = \\partial_{v}/\\sqrt G$，写 $\\dot\\gamma = \\cos\\theta\\,e_{1}+\\sin\\theta\\,e_{2}$（$\\theta$ 就是与 $u$ 线的夹角），于是 $n\\times\\dot\\gamma = -\\sin\\theta\\,e_{1}+\\cos\\theta\\,e_{2}$。由 $\\nabla e_{1} = -\\omega^{1}_{2}\\otimes e_{2}$、$\\nabla e_{2} = \\omega^{1}_{2}\\otimes e_{1}$ 得',
        '$$\\nabla_{\\dot\\gamma}\\dot\\gamma = \\left(-\\sin\\theta\\,\\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}-\\cos\\theta\\,\\omega^{1}_{2}(\\dot\\gamma)\\right)e_{1}+\\left(\\cos\\theta\\,\\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}-\\sin\\theta\\,\\omega^{1}_{2}(\\dot\\gamma)\\right)e_{2}.$$',
        '与 $n\\times\\dot\\gamma$ 作内积，两组交叉项抵消、平方项各给 $1$：',
        '$$k_{g} = \\langle \\nabla_{\\dot\\gamma}\\dot\\gamma,\\,n\\times\\dot\\gamma\\rangle = \\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}-\\omega^{1}_{2}(\\dot\\gamma).$$',
        '**第二步：代入 $\\omega^{1}_{2}$。** 由「标架下的联络系数」那一条，',
        '$$\\omega^{1}_{2} = \\frac{(\\ln E)_{v}}{2\\sqrt G}\\,\\omega^{1}-\\frac{(\\ln G)_{u}}{2\\sqrt E}\\,\\omega^{2},$$',
        '而 $\\omega^{1}(\\dot\\gamma) = \\cos\\theta$、$\\omega^{2}(\\dot\\gamma) = \\sin\\theta$（因为 $\\dot\\gamma$ 在这组单位正交余标架下的分量就是 $\\cos\\theta,\\sin\\theta$）。所以',
        '$$\\omega^{1}_{2}(\\dot\\gamma) = \\frac{(\\ln E)_{v}}{2\\sqrt G}\\cos\\theta-\\frac{(\\ln G)_{u}}{2\\sqrt E}\\sin\\theta ,$$',
        '代回第一步即得',
        '$$k_{g}(\\gamma) = \\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}-\\frac{(\\ln E)_{v}}{2\\sqrt G}\\cos\\theta+\\frac{(\\ln G)_{u}}{2\\sqrt E}\\sin\\theta .$$',
        '**第三步：测地线的判据。** 由 $\\gamma$ 是测地线 $\\iff k_{g}\\equiv0$，上式为零就是测地线在这组坐标下的方程 —— 一个关于 $\\theta$ 的一阶方程，比二阶的测地线方程组好用了整整一个量级。$\\blacksquare$'
      ].join('\n')
    },

    {
      id: 'imp.curvature-split',
      kind: 'implication',
      sources: ['def.geodesic-curvature'],
      target: 'prop.curvature-split',
      proof: [
        '**正交基。** $|\\dot\\gamma| = 1$ 给出 $\\langle \\ddot\\gamma,\\dot\\gamma\\rangle = \\frac{1}{2}\\frac{\\mathrm{d}}{\\mathrm{d}s}|\\dot\\gamma|^{2} = 0$，所以 $\\ddot\\gamma$ 落在 $\\dot\\gamma$ 的正交补里。$n$ 是 $S$ 的单位法向因而 $n\\perp\\dot\\gamma$；$n\\times\\dot\\gamma$ 与两者都正交且是单位向量。于是 $\\{n,\\,n\\times\\dot\\gamma\\}$ 是 $T_{\\gamma}S$ 中 $\\dot\\gamma^{\\perp}$ 的一组单位正交基（这里 $\\dot\\gamma^{\\perp}$ 指 $\\mathbb{R}^{3}$ 中与 $\\dot\\gamma$ 正交的二维空间）。',
        '**分解。** 因此',
        '$$\\ddot\\gamma = \\langle \\ddot\\gamma,n\\rangle n+\\langle \\ddot\\gamma,n\\times\\dot\\gamma\\rangle\\,(n\\times\\dot\\gamma) = \\kappa_{n}n+k_{g}\\,(n\\times\\dot\\gamma).$$',
        '两个系数：第一个就是法曲率 $\\kappa_{n} = \\langle \\ddot\\gamma,n\\rangle$，而 $\\langle \\ddot\\gamma,n\\rangle = -\\langle \\dot\\gamma,\\mathrm{d}n(\\dot\\gamma)\\rangle = \\mathrm{II}(\\dot\\gamma,\\dot\\gamma)$ 由 $\\langle \\dot\\gamma,n\\rangle\\equiv0$ 求导得到；第二个正是测地曲率的定义。',
        '**取模长。** 两项正交，故',
        '$$\\kappa^{2} = |\\ddot\\gamma|^{2} = \\kappa_{n}^{2}+k_{g}^{2}. \\quad\\blacksquare$$'
      ].join('\n')
    },

    {
      id: 'imp.egregium-frame',
      kind: 'implication',
      sources: ['def.gauss-curvature', 'def.curvature-tensor', 'prop.christoffel-frame'],
      target: 'thm.theorema-egregium',
      proof: [
        '**思路：$K$ 的两条表达式，一条只含 $I$，一条是 $\\det(h_{ij})$，两边必相等。**',
        '**① 联络形式由 $I$ 唯一确定。** 取局部单位正交余标架 $\\omega^{1},\\omega^{2}$（由 $I$ 定出，$g = (\\omega^{1})^{2}+(\\omega^{2})^{2}$）。第一结构方程要求 $\\mathrm{d}\\omega^{1} = \\omega^{2}\\wedge\\omega^{1}_{2}$、$\\mathrm{d}\\omega^{2} = \\omega^{1}\\wedge\\omega^{2}_{1}$，加上 $\\omega^{1}_{2} = -\\omega^{2}_{1}$。写 $\\omega^{1}_{2} = a\\,\\omega^{1}+b\\,\\omega^{2}$：第一式定出 $a$，第二式定出 $b$（两式分别给出 $a$ 与 $b$ 的一个方程）。所以 $\\omega^{1}_{2}$ 完全由 $\\mathrm{d}\\omega^{1},\\mathrm{d}\\omega^{2}$ 决定，也就是完全由 $I$ 决定 —— 这正是 Levi-Civita 联络的唯一性。',
        '**② $\\mathrm{d}\\omega^{1}_{2}$ 是内蕴可算的。** 由上一步，$\\mathrm{d}\\omega^{1}_{2}$ 只含 $I$ 的一、二阶导数。',
        '**③ 外在那一侧。** 在 $\\mathbb{R}^{3}$ 的活动标架 $\\{e_{1},e_{2},e_{3}\\}$（$e_{3} = n$）里，第二结构方程给出 $\\mathrm{d}\\omega^{1}_{2} = \\omega^{3}_{2}\\wedge\\omega^{1}_{3}$。写 $\\omega^{i}_{3} = \\sum_{j}h_{ij}\\omega^{j}$（$h_{ij}$ 对称），把 $\\omega^{3}_{2}\\wedge\\omega^{1}_{3} = -\\omega^{2}_{3}\\wedge\\omega^{1}_{3}$ 展开：两个交叉项相消，对角项留下 $h_{11}h_{22}-h_{12}^{2}$，所以',
        '$$\\mathrm{d}\\omega^{1}_{2} = \\omega^{3}_{2}\\wedge\\omega^{1}_{3} = \\det(h_{ij})\\,\\omega^{1}\\wedge\\omega^{2}.$$',
        '而 $n$ 反号会让整个 $h_{ij}$ 反号、$\\det$ 不变，所以 $\\det(h_{ij}) = k_{1}k_{2}$ 是法向无关的外在量，正是高斯曲率：$\\det(h_{ij}) = K$。于是',
        '$$K\\,\\omega^{1}\\wedge\\omega^{2} = \\mathrm{d}\\omega^{1}_{2},$$',
        '右端只依赖 $I$（第②步），所以 $K$ 只依赖 $I$。',
        '**④ 收尾。** 若 $\\varphi$ 是局部等距，则 $I_{1} = \\varphi^{*}I_{2}$，故两侧的 $\\omega$ 都被拉回、$\\mathrm{d}\\omega^{1}_{2}$ 逐点相等，于是 $K_{1} = K_{2}\\circ\\varphi$。$\\blacksquare$',
        '⚠️ 符号与约定：本包取 $\\omega^{i}_{j} = \\langle\\nabla e_{j},e_{i}\\rangle$。这时单位球面可以直接验算：取测地极坐标，$\\omega^{1} = \\mathrm{d}\\rho$、$\\omega^{2} = \\sin\\rho\\,\\mathrm{d}\\theta$、$\\omega^{1}_{2} = -\\cos\\rho\\,\\mathrm{d}\\theta$，于是 $\\mathrm{d}\\omega^{1}_{2} = \\sin\\rho\\,\\mathrm{d}\\rho\\wedge\\mathrm{d}\\theta = +\\omega^{1}\\wedge\\omega^{2}$，即 $K = 1$；同时 $\\omega^{1}_{3} = \\omega^{1}$、$\\omega^{2}_{3} = \\omega^{2}$，$h_{ij} = \\delta_{ij}$、$\\det = 1$ ✓。换另一支约定（$\\omega^{i}_{j}$ 整体反号）时，证明里所有 $\\omega^{i}_{j}$ 一起反号、$K$ 的符号随之统一反号，「$K$ 内蕴」这个结论不变。'
      ].join('\n')
    },

    {
      id: 'imp.egregium-polar',
      kind: 'implication',
      sources: ['lem.gauss-lemma', 'def.gauss-curvature'],
      target: 'thm.theorema-egregium',
      proof: [
        '**目标：把 $K$ 写成只含唯一度量系数 $G$ 的表达式。**',
        '**① 测地极坐标把 $I$ 压到一个函数。** 由高斯引理，$I = \\mathrm{d}\\rho^{2}+G(\\rho,\\theta)\\,\\mathrm{d}\\theta^{2}$，其中 $E\\equiv1$、$F\\equiv0$。于是所有 $\\Gamma$ 都可以用 $G$ 显式写出：$\\Gamma^{\\theta}_{\\rho\\theta} = \\frac{G_{\\rho}}{2G}$、$\\Gamma^{\\rho}_{\\theta\\theta} = -\\frac{G_{\\rho}}{2}$，其余为零。',
        '**② 直接算唯一独立分量。** 代入 $R^{\\ell}_{ijk}$ 的公式，取 $R_{1212}$（$1 = \\rho$，$2 = \\theta$）：',
        '$$R_{1212} = \\frac{1}{2}\\left(\\partial_{\\rho}\\partial_{\\rho}G\\right)-g_{\\theta\\theta}\\Gamma^{\\theta}_{\\rho\\theta}\\Gamma^{\\theta}_{\\theta\\rho} = \\frac{G_{\\rho\\rho}}{2}-\\frac{G_{\\rho}^{2}}{4G}.$$',
        '（$g_{11} = 1$，$\\Gamma^{\\rho}_{\\rho\\rho} = \\Gamma^{\\theta}_{\\rho\\rho} = 0$，两个 $\\Gamma\\Gamma$ 项在公式里是相减的。）再由 $K = R_{1221}/\\det(g) = -R_{1212}/G$ 得',
        '$$K = -\\frac{1}{G}\\left(\\frac{G_{\\rho\\rho}}{2}-\\frac{G_{\\rho}^{2}}{4G}\\right) = -\\frac{(\\sqrt G)_{\\rho\\rho}}{\\sqrt G}.$$',
        '最后一步是恒等式 $\\frac{(\\sqrt G)_{\\rho\\rho}}{\\sqrt G} = \\frac{G_{\\rho\\rho}}{2G}-\\frac{G_{\\rho}^{2}}{4G^{2}}$。',
        '**③ 结论。** 右端只有 $G$，而 $G$ 是 $I$ 的系数。所以 $K$ 由 $I$ 决定，绝妙定理成立。$\\blacksquare$',
        '**④ 副产品：小圆的读数。** 把 $\\sqrt G = \\rho-\\frac{K(p)}{6}\\rho^{3}+O(\\rho^{5})$（高斯引理那一条的展开）代回上式，两端逐阶相符 —— 这说明上面的公式是自洽的，也给出可操作的读数：$K(p)$ 就是「半径 $\\rho$ 的测地圆比 $2\\pi\\rho$ 短多少」的三阶速率。'
      ].join('\n')
    },

    {
      id: 'imp.gauss-bonnet',
      kind: 'implication',
      sources: ['thm.liouville-formula', 'def.geodesic-curvature', 'def.gauss-curvature'],
      target: 'thm.gauss-bonnet',
      proof: [
        '**第一步（局部版）：简单闭曲线围成的区域。** 设 $D$ 由分段光滑简单闭曲线 $\\partial D$ 围成，取正交单位标架与联络形式 $\\omega^{1}_{2}$。由刘维尔公式（或等价地 $k_{g} = \\frac{\\mathrm{d}\\theta}{\\mathrm{d}s}-\\omega^{1}_{2}(\\dot\\gamma)$），',
        '$$\\int_{\\partial D}k_{g}\\,\\mathrm{d}s = \\int_{\\partial D}\\mathrm{d}\\theta-\\int_{\\partial D}\\omega^{1}_{2} = 2\\pi-\\int_{D}\\mathrm{d}\\omega^{1}_{2}.$$',
        '第一项是切线转角定理：简单闭曲线的切方向恰好转一整圈，$\\int\\mathrm{d}\\theta = 2\\pi$（分段光滑也一样，顶点处的外角补齐即可）。第二项用斯托克斯公式。再由高斯方程 $\\mathrm{d}\\omega^{1}_{2} = K\\,\\omega^{1}\\wedge\\omega^{2} = K\\,\\mathrm{d}A$ 得',
        '$$\\int_{\\partial D}k_{g}\\,\\mathrm{d}s = 2\\pi-\\int_{D}K\\,\\mathrm{d}A,$$',
        '移项即得',
        '$$\\int_{D}K\\,\\mathrm{d}A+\\int_{\\partial D}k_{g}\\,\\mathrm{d}s = 2\\pi .$$',
        '**第二步：三角剖分求和。** 把 $M$ 剖分成 $F$ 个三角形，$E$ 条边（内部 $E_{i}$、边界 $E_{b}$），$V$ 个顶点（内部 $V_{i}$、边界 $V_{b}$）。对每个三角形 $T$ 用局部版。三角形是三边都是测地线段时最简单；一般情形把局部版写成带内角 $\\beta_{j}$ 的形式：',
        '$$\\int_{T}K\\,\\mathrm{d}A+\\int_{\\partial T}k_{g}\\,\\mathrm{d}s = \\beta_{1}+\\beta_{2}+\\beta_{3}-\\pi .$$',
        '（这就是第一步的局部版：把 $\\int\\mathrm{d}\\theta = 2\\pi$ 换成「沿三角形边界的转角 = $2\\pi-$ 外角和 = 内角和 $-\\pi$」。）',
        '把所有三角形相加：',
        [
          '- **边的项**：每条内部边被两个三角形各走一次、方向相反，$\\int k_{g}$ 相消；边界边只走一次，留下 $\\int_{\\partial M}k_{g}$；',
          '- **角的项**：内部顶点周围的内角合起来恰是 $2\\pi$，每个内部顶点贡献 $2\\pi$；边界顶点周围的内角合起来是 $\\pi$，每个边界顶点贡献 $\\pi$。'
        ].join('\n'),
        '于是',
        '$$\\int_{M}K\\,\\mathrm{d}A+\\int_{\\partial M}k_{g}\\,\\mathrm{d}s = 2\\pi V_{i}+\\pi V_{b}-\\pi F .$$',
        '**第三步：把右端认成 $2\\pi\\chi$。** 每个三角形有三条边，内部边被数两次、边界边被数一次：$3F = 2E_{i}+E_{b}$，而 $E_{b} = V_{b}$（边界的每条边对应一段）。于是',
        '$$E = E_{i}+E_{b} = \\frac{3F-E_{b}}{2}+E_{b} = \\frac{3F+V_{b}}{2},$$',
        '$$2\\pi\\left(V-E+F\\right) = 2\\pi\\left(V_{i}+V_{b}-\\frac{3F+V_{b}}{2}+F\\right) = 2\\pi V_{i}+\\pi V_{b}-\\pi F .$$',
        '两端相同，且 $V-E+F = \\chi(M)$ 与剖分无关，故',
        '$$\\int_{M}K\\,\\mathrm{d}A+\\int_{\\partial M}k_{g}\\,\\mathrm{d}s = 2\\pi\\chi(M).$$',
        '**第四步：闭曲面的特例与数值。** $\\partial M = \\emptyset$ 时边界项消失，得 $\\int_{M}K\\,\\mathrm{d}A = 2\\pi\\chi(M)$。球面 $\\chi = 2$ 给出 $\\int K\\,\\mathrm{d}A = 4\\pi$（$K = 1/R^{2}$、面积 $4\\pi R^{2}$，相符）；环面 $\\chi = 0$ 给出 $\\int K = 0$（环面的外侧 $K > 0$、内侧 $K < 0$，正好抵消）；亏格 $g$ 的闭曲面 $\\chi = 2-2g$ 给出 $4\\pi(1-g)$。$\\blacksquare$'
      ].join('\n')
    }
  ]
});
