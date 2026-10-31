/* ==========================================================================
   内容包 · 微分几何补编（曲线论 / 微分形式 / 流形 / 联络与曲率）
   --------------------------------------------------------------------------
   21 个节点 / 52 条边（37 条定义引用 + 15 条推导）。星团沿用已在册的三个：

     diffgeom.frame（活动标架与结构方程）
        曲线：正则曲线 → 弧长 → Frenet 标架 / 曲率挠率 → Frenet–Serret → 曲线基本定理
        形式：微分形式 → 外微分 → 拉回
       ⭐ 曲线与形式都归这里：Frenet 标架就是「曲线的活动标架」，
          $\\mathrm{d}\\omega$ 就是结构方程里那个 $\\mathrm{d}$。三块共用同一套记账。

     diffgeom.surface（曲面论）
        面积元 / 可定向曲面 —— 只补 125 里没有的，基本形式与曲率一律不重建。

     diffgeom.intrinsic（内蕴几何）
        流形与切空间（光滑流形 / 切空间 / 正则水平集定理 / 黎曼度量）
        联络与曲率（仿射联络 / 曲率张量的对称性 / 比安基恒等式 / 截面曲率 / Ricci 曲率）
        积分（形式的积分 / Stokes 定理）

   ⚠️ 参考书与**引用政策**：用户指定的参考书是 Tu, An Introduction to Manifolds
      (GTM 334)。⚠️ 我对该书的章号与定理编号**没有把握**，所以 refs 一律只写
      「书名 + 主题名」，⛔ 不编号、不编编号；能确定的经典分章（do Carmo 曲面论五章、
      do Carmo《微分形式及其应用》的分章）照常写。

   ⚠️ 符号约定（全包统一，与 125 / 126 对齐 —— 引用公式前先对齐这几条）：
      · 曲线：弧长参数记 $s$，$T = \\gamma'$，$\\kappa = \\lVert T'\\rVert$，$\\tau = -\\langle B',N\\rangle$；
      · 形式：外微分记 $\\mathrm{d}$，$\\mathrm{d}^{2}=0$，拉回记 $F^{\\ast}$；
      · 曲率：$R(X,Y)Z = \\nabla_{X}\\nabla_{Y}Z-\\nabla_{Y}\\nabla_{X}Z-\\nabla_{[X,Y]}Z$，
        $R_{ijk\\ell} = \\langle R(\\partial_{i},\\partial_{j})\\partial_{k},\\partial_{\\ell}\\rangle$，
        单位球面给 $R_{1221} = +1$、$K = 1$；
      · Ricci：$\\operatorname{Ric}(X,Y) = \\operatorname{tr}\\bigl(Z\\mapsto R(Z,X)Y\\bigr)$、$R_{ij} = R^{k}_{\\ kij}$，
        单位球面给 $\\operatorname{Ric} = (n-1)g$、$S = n(n-1)$ —— 这是判别符号约定的硬检验。

   ⚠️ 与已有包的分工：活动标架、两张基本形式、Gauss–Codazzi、测地线、绝妙定理、Gauss–Bonnet
      都在 125 / 126 里，本包**不重建**任何一个，只补上面列的缺口，再用边接过去。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '微分几何补编：曲线、形式、流形与曲率',

  nodes: [

    /* ======================================================================
       §A 曲线论（diffgeom.frame）
       ====================================================================== */

    {
      id: 'def.regular-curve',
      cluster: 'diffgeom.frame',
      type: 'definition',
      label: '正则曲线',
      title: '正则曲线与切线',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲线', '切向量', '参数化'],
      statement: [
        '**在做什么**：先把「一条能走的线」钉死 —— 它要有速度，而且速度处处不为零，这样才有切线、才能量弧长、才能谈弯曲。',
        '',
        '设 $I \\subseteq \\mathbb{R}$ 是区间，$\\gamma : I\\to\\mathbb{R}^{3}$ 是 $C^{\\infty}$ 映射，写成 $\\gamma(t) = (x(t),y(t),z(t))$；$t$ 叫**参数**，$\\gamma$ 的像叫**参数曲线**。**速度**逐分量求导：',
        '',
        '$$\\gamma\'(t) = \\bigl(x\'(t),\\ y\'(t),\\ z\'(t)\\bigr).$$',
        '',
        '若 $\\gamma\'(t)\\ne 0$ 对一切 $t$ 成立，称 $\\gamma$ **正则**，$t$ 叫正则参数，像集叫**正则曲线**；此时 $\\gamma\'(t)$ 张成的一维子空间叫 $t$ 处的**切线方向**。若 $\\gamma$ 还是单射且逆连续，叫**简单曲线**。',
        '',
        '**反例**：$\\gamma(t) = (t^{2},t^{3})$ 在 $t = 0$ 处 $\\gamma\' = (0,0)$，像集是尖点，那里没有切线 —— 可见「像集有尖点」与「参数不正则」是同一件事的两面。'
      ].join('\n'),
      notes: [
        '**正则性的几何含义**：$\\gamma\'(t)\\ne 0$ 说的是「按这个参数真的在动」。换参数可能改变速度（甚至让某个参数值处速度为零），但「像集有没有切线」是像集自己的性质 —— 所以谈正则性时必须说清是**相对哪个参数化**。',
        '**参数不是曲线**：同一像集有无穷多参数化 $\\gamma\\circ h$（$h$ 是微分同胚）。凡是要写下来的量，都要先问「换参数后怎么变」：弧长、曲率、挠率换参数不变；速度、速率会变。这条纪律贯穿整节。',
        '⚠️ **光滑性等级**：本节只用到三阶导数（$\\kappa$ 要二阶、$\\tau$ 要三阶），所以 $C^{3}$ 就够；写成 $C^{\\infty}$ 只是省掉反复交代。',
        '⚠️ **挠率只在 $\\mathbb{R}^{3}$ 里有**：平面曲线的挠率恒为零，反之（在 $\\kappa>0$ 处）挠率为零也说明曲线落在某个平面里。四条以上维数时「挠率」变成一族量，不再是两个函数。',
        '**与切空间的关系**：$\\gamma\'(t)$ 就是切映射 $\\mathrm{d}\\gamma(\\partial_{t})$，即「沿曲线走的方向」。抽象流形上没有差商，这个说法要换成 `def.tangent-space-manifold` 里「曲线等价类」的定义。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲线」· 正则曲线、速率与切线',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 1 章「曲线」· 参数曲线与正则曲线'
      ]
    },

    {
      id: 'def.arc-length',
      cluster: 'diffgeom.frame',
      type: 'definition',
      label: '弧长',
      title: '弧长与弧长参数化',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲线', '弧长', '重参数化'],
      statement: [
        '**在做什么**：给曲线装一把尺 —— 把速度的模长一路累加得到长度，再用长度当参数，把曲线改写成匀速的。',
        '',
        '设 $\\gamma : [a,b]\\to\\mathbb{R}^{3}$ 是 $C^{1}$ 曲线。它的**弧长**是',
        '',
        '$$L(\\gamma) := \\int_{a}^{b}\\lVert\\gamma\'(t)\\rVert\\,\\mathrm{d}t ,\\qquad \\lVert\\gamma\'(t)\\rVert = \\sqrt{x\'(t)^{2}+y\'(t)^{2}+z\'(t)^{2}} .$$',
        '',
        '从 $t_{0}\\in[a,b]$ 量起的**弧长函数**是',
        '',
        '$$s(t) := \\int_{t_{0}}^{t}\\lVert\\gamma\'(u)\\rVert\\,\\mathrm{d}u ,\\qquad s\'(t) = \\lVert\\gamma\'(t)\\rVert .$$',
        '',
        '若 $\\lVert\\gamma\'(t)\\rVert\\equiv 1$，称 $\\gamma$ 是**弧长参数化**（单位速参数化），此时弧长就是参数之差。正则曲线总能重参数化成弧长参数（边上给构造），此后一律用 $s$ 记参数、$T := \\gamma\'(s)$ 记单位切向量。'
      ].join('\n'),
      notes: [
        '**弧长与参数化无关**：$L(\\gamma\\circ h) = L(\\gamma)$（$h$ 单调 $C^{1}$），一行换元公式。这是「长度属于曲线、不属于参数化」的正式说法。',
        '**弧长参数唯一到常数与定向**：两个弧长参数只差一个常数；反向走一遍得 $s\\mapsto -s$。所以弧长参数下的公式里，出现的常数都没有几何意义、出现的导数都有。',
        '**记号纪律**：点号表示对**弧长**求导（$\\dot\\gamma = T$、$\\ddot\\gamma = \\kappa N$），撇号表示对**任意**参数求导。混用时公式会差一个 $\\lVert\\gamma\'\\rVert$ 的因子，这是曲线论最常见的抄错。',
        '⚠️ 弧长只用到**内积**，不用外围空间的任何别的结构，所以在黎曼流形上照搬：把 $\\lVert\\gamma\'\\rVert$ 换成 $\\sqrt{g(\\dot\\gamma,\\dot\\gamma)}$ 就是 `def.riemannian-metric` 里的长度。',
        '⚠️ 弧长是一维的测度；二维的对应物是 `def.area-element`（面积元）。两者都是「把度量写成可积的量」。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲线」· 弧长与弧长参数化',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 1 章「曲线」· 弧长'
      ]
    },

    {
      id: 'def.frenet-frame',
      cluster: 'diffgeom.frame',
      type: 'definition',
      label: '曲率与挠率',
      title: 'Frenet 标架、曲率与挠率',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲线', 'Frenet 标架', '曲率', '挠率'],
      statement: [
        '**在做什么**：沿曲线架一副跟着转的正交标架，把「弯」与「扭」各压缩成一个数 —— 这是曲线的活动标架法。',
        '',
        '设 $\\gamma$ 是弧长参数化的 $C^{3}$ 正则曲线，$T := \\gamma\'$。**曲率**定义为',
        '',
        '$$\\kappa(s) := \\lVert T\'(s)\\rVert \\ge 0 .$$',
        '',
        '在 $\\kappa(s)>0$ 处定义**主法向**与**副法向**',
        '',
        '$$N := \\frac{T\'}{\\kappa},\\qquad B := T\\times N ,$$',
        '',
        '三者两两正交且都是单位向量，$(T,N,B)$ 叫 **Frenet 标架**（曲线的活动标架）。**挠率**定义为',
        '',
        '$$\\tau(s) := -\\langle B\'(s),N(s)\\rangle .$$',
        '',
        '$(T,N)$ 张成的平面叫**密切平面**（$B$ 是它的法向）：$\\kappa$ 量「切线转得多快」，$\\tau$ 量「曲线离开密切平面多快」。'
      ].join('\n'),
      notes: [
        '**量纲与例子**：$\\kappa$ 的量纲是长度的倒数。直线 $\\kappa = 0$；半径 $R$ 的圆 $\\kappa = 1/R$、$\\tau = 0$；圆柱螺旋线的 $\\kappa$ 与 $\\tau$ 都是非零常数。',
        '**$\\kappa = 0$ 处定义不出来**：$N$ 要靠 $T\'$ 定向，直线段上 $T$ 是常向量。所以 Frenet 标架只在 $\\kappa>0$ 的区间上存在，跨过拐点时会跳 —— 这也解释了为什么曲线基本定理要假设 $\\kappa>0$。',
        '**任意参数下的公式**（链式法则直接算）：$\\kappa = \\lVert\\gamma\'\\times\\gamma\'\'\\rVert/\\lVert\\gamma\'\\rVert^{3}$，$\\tau = \\langle\\gamma\'\\times\\gamma\'\',\\gamma\'\'\'\\rangle/\\lVert\\gamma\'\\times\\gamma\'\'\\rVert^{2}$（后者在 $\\kappa>0$ 处）。它们说明 $\\kappa,\\tau$ 只依赖像集与定向。',
        '**符号约定**：本图取 $\\tau = -\\langle B\',N\\rangle$，于是 Frenet 公式是 $N\' = -\\kappa T+\\tau B$、$B\' = -\\tau N$（`thm.frenet-serret`）。若某本书取 $\\tau = \\langle B\',N\\rangle$，它的挠率与本图差一个符号 —— 抄公式前先对齐。',
        '**与曲面的活动标架同源**：曲面用 $(e_{1},e_{2},e_{3})$，曲线用 $(T,N,B)$，都是「沿参数走、标架随地转」；联络形式那一套（`def.connection-form`）在曲线情形退化成 $\\pm\\kappa\\,\\mathrm{d}s$ 与 $\\pm\\tau\\,\\mathrm{d}s$。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲线」· Frenet 标架、曲率与挠率',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 1 章「曲线」· 曲率与挠率'
      ]
    },

    {
      id: 'thm.frenet-serret',
      cluster: 'diffgeom.frame',
      type: 'theorem',
      label: 'Frenet–Serret 公式',
      title: 'Frenet–Serret 公式',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '曲线', 'Frenet 标架', '结构方程'],
      statement: [
        '设 $\\gamma$ 是弧长参数化的 $C^{3}$ 正则曲线，$\\kappa>0$。则',
        '',
        '$$T\' = \\kappa N,\\qquad N\' = -\\kappa T+\\tau B,\\qquad B\' = -\\tau N .$$',
        '',
        '写成矩阵就是',
        '',
        '$$\\begin{pmatrix} T\' \\\\ N\' \\\\ B\' \\end{pmatrix} = \\begin{pmatrix} 0 & \\kappa & 0 \\\\ -\\kappa & 0 & \\tau \\\\ 0 & -\\tau & 0 \\end{pmatrix}\\begin{pmatrix} T \\\\ N \\\\ B \\end{pmatrix}.$$',
        '',
        '系数矩阵反称 —— 这正是「标架始终是正交标架」的无穷小写法。'
      ].join('\n'),
      notes: [
        '⭐ **为什么只有两个函数**：$3\\times3$ 反称矩阵有 $3$ 个自由度，但 $T\'$ 的方向被 $N$ 的定义锁死（$\\langle T\',T\\rangle = \\langle T\',B\\rangle = 0$ 是恒等式），于是只剩 $\\kappa$ 与 $\\tau$。',
        '**与结构方程是同一件事**：把 $\\mathrm{d}T,\\mathrm{d}N,\\mathrm{d}B$ 按标架展开，系数就是 $\\kappa\\,\\mathrm{d}s$、$\\tau\\,\\mathrm{d}s$。曲面的 $\\omega^{i}_{\\ j}$（`def.connection-form`）在曲线情形退化成这三个数乘以 $\\mathrm{d}s$。',
        '**反称性的来源**：$\\langle T,T\\rangle = \\langle N,N\\rangle = \\langle B,B\\rangle = 1$、$\\langle T,N\\rangle = \\langle T,B\\rangle = \\langle N,B\\rangle = 0$ 都是常数，求导即得矩阵反称 —— 与 `prop.connection-antisymmetric` 的证明逐字相同。',
        '⚠️ 只在 $\\kappa>0$ 处成立。$\\kappa = 0$ 的孤立点上 $N$ 不存在，公式没有意义（但 $\\kappa$ 本身仍然有定义）。',
        '**它的用处**：把曲线的几何问题化成一个线性方程组问题 —— 于是「存在性 + 唯一性」可以整块交给 ODE（`thm.curve-fundamental-theorem`）。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲线」· Frenet–Serret 公式',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 1 章「曲线」· Frenet 标架与 Frenet 公式'
      ]
    },

    {
      id: 'thm.curve-fundamental-theorem',
      cluster: 'diffgeom.frame',
      type: 'theorem',
      label: '曲线基本定理',
      title: '曲线基本定理：曲率与挠率决定曲线',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '曲线', '存在唯一性', '刚体运动'],
      statement: [
        '设 $I\\subseteq\\mathbb{R}$ 是区间，$\\kappa : I\\to(0,\\infty)$ 与 $\\tau : I\\to\\mathbb{R}$ 连续。则存在弧长参数化的 $C^{3}$ 正则曲线 $\\gamma : I\\to\\mathbb{R}^{3}$，其曲率与挠率恰为 $\\kappa,\\tau$；并且这样的曲线**唯一到刚体运动**（旋转加平移）为止。',
        '',
        '换句话说：一对函数 $(\\kappa,\\tau)$ **完全决定**一条空间曲线的形状，再没有别的自由度。'
      ].join('\n'),
      notes: [
        '**为什么恰好是两个函数**：曲线有 $3$ 个分量；去掉重参数化（$1$ 个函数）与刚体运动（$6$ 个常数）之后，剩下的局部不变量就是 $2$ 个函数 —— 与 Frenet 公式里出现的系数个数吻合。',
        '**与曲面论基本定理同构**：两处都是「结构方程 + 可积性」，唯一性都来自「初始标架对齐后解唯一」。差别只在曲线情形方程关于标架是**线性**的，可积性条件 $\\mathrm{d}^{2}=0$ 自动满足，不需要 Gauss–Codazzi 那样成对的额外条件。',
        '⚠️ 前提 $\\kappa>0$ 去不掉：Frenet 标架靠它存在。若改用**有符号曲率**，命题要重写成相应的版本，$\\kappa$ 与 $\\tau$ 的符号约定也随之改变。',
        '**怎么用**：判断两条曲线是否全等，只要比 $\\kappa,\\tau$。这是曲线论里「不变量完备」的意思，与曲面论里「$I,II$ 决定曲面」平行。',
        '⚠️ 唯一性是**局部**的表述在整体区间上的直接推广：$I$ 可以任意（不必紧），因为线性 ODE 的解在整个区间上存在。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲线」· 曲线基本定理',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 1 章「曲线」· 曲线基本定理'
      ]
    },

    /* ======================================================================
       §B 微分形式（diffgeom.frame）
       ====================================================================== */

    {
      id: 'def.differential-form',
      cluster: 'diffgeom.frame',
      type: 'definition',
      label: '微分形式',
      title: '微分形式',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '微分形式', '外代数', '余切'],
      statement: [
        '**在做什么**：把「在每点吃进 $k$ 个切向量、吐出一个数，并且对换两个变元要变号」这件事做成光滑对象 —— 微分形式就是流形上那类能被拉回、能被积分的量。',
        '',
        '设 $U\\subseteq\\mathbb{R}^{n}$ 开。$U$ 上的 **$k$-形式**是一个映射 $\\omega$，给每点 $p\\in U$ 一个**交错** $k$-线性型',
        '',
        '$$\\omega_{p} : (\\mathbb{R}^{n})^{k}\\longrightarrow\\mathbb{R},$$',
        '',
        '并且它在标准坐标下的系数光滑：',
        '',
        '$$\\omega = \\sum_{i_{1}<\\cdots<i_{k}}a_{i_{1}\\cdots i_{k}}(x)\\,\\mathrm{d}x^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{i_{k}} ,\\qquad a_{I}\\in C^{\\infty}(U),$$',
        '',
        '其中 $\\mathrm{d}x^{i}(v) := v^{i}$ 是坐标函数的微分，$\\wedge$ 是外积（$\\mathrm{d}x^{i}\\wedge\\mathrm{d}x^{j} = -\\mathrm{d}x^{j}\\wedge\\mathrm{d}x^{i}$）。全体记 $\\Omega^{k}(U)$。',
        '',
        '$\\Omega^{0}(U) = C^{\\infty}(U)$（函数就是 $0$-形式）；$k>n$ 时 $\\Omega^{k}(U) = 0$；$k$-形式是 $\\binom{n}{k}$ 个光滑函数的组合。**楔积**逐点定义：$(\\omega\\wedge\\eta)_{p} := \\omega_{p}\\wedge\\eta_{p}$，于是 $\\Omega^{\\bullet}(U)$ 是分次交换代数。'
      ].join('\n'),
      notes: [
        '**与外代数的关系**：每点 $\\omega_{p}\\in\\bigwedge^{k}(\\mathbb{R}^{n})^{\\ast}$，所以 $k$-形式就是「$\\bigwedge^{k}(\\mathbb{R}^{n})^{\\ast}$-值的光滑函数」。外代数给代数结构，光滑性给分析结构；两者合起来才能定义 $\\mathrm{d}$（`def.exterior-derivative`）。',
        '**与一般多重线性型的区别**：一般 $k$ 重线性型有 $n^{k}$ 个分量，加上交错性之后只剩 $\\binom{n}{k}$ 个 —— 这正是它能被积分的原因（`def.integral-form`）。',
        '**低次形式的通俗身份**（$n = 3$）：$0$-形式是函数；$1$-形式 $P\\,\\mathrm{d}x+Q\\,\\mathrm{d}y+R\\,\\mathrm{d}z$ 是做功与环量；$2$-形式是通量；$3$-形式是密度。梯度、旋度、散度是同一个 $\\mathrm{d}$ 在不同次数上的样子。',
        '⚠️ **方向**：形式沿映射**反**着走（拉回，`prop.pullback-forms`），向量场沿映射**正**着走（前推，且要求映射可逆）。这是形式比向量场好用的根本原因。',
        '**流形上**：把 $\\mathbb{R}^{n}$ 换成 $n$ 维流形 $M$，只需在某张卡上用坐标微分写开，再用转移映射的光滑性说明「是 $k$-形式」与卡无关 —— 与 `def.tangent-space-manifold` 里「切向量与卡无关」是同一套论证。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「微分形式」· 微分形式的定义与楔积',
        'do Carmo, Differential Forms and Applications, 第 1 章「微分形式」· 形式与楔积'
      ]
    },

    {
      id: 'def.exterior-derivative',
      cluster: 'diffgeom.frame',
      type: 'definition',
      label: '外微分',
      title: '外微分',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '外微分', '微分形式', '闭形式'],
      statement: [
        '**在做什么**：给形式配一个导数，把 $k$-形式送到 $(k+1)$-形式，并满足 $\\mathrm{d}^{2} = 0$ —— 这一步把微积分写成不依赖坐标的样子。',
        '',
        '设 $\\omega = \\sum_{I}a_{I}\\,\\mathrm{d}x^{I}$ 是 $U$ 上的 $k$-形式，其中 $\\mathrm{d}x^{I} := \\mathrm{d}x^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{i_{k}}$。**外微分**定义为',
        '',
        '$$\\mathrm{d}\\omega := \\sum_{I}\\mathrm{d}a_{I}\\wedge\\mathrm{d}x^{I} = \\sum_{I}\\sum_{j=1}^{n}\\frac{\\partial a_{I}}{\\partial x^{j}}\\,\\mathrm{d}x^{j}\\wedge\\mathrm{d}x^{I}.$$',
        '',
        '对函数（$0$-形式）它就是全微分 $\\mathrm{d}f = \\sum_{j}\\partial_{j}f\\,\\mathrm{d}x^{j}$。基本性质：',
        '',
        ['1. $\\mathbb{R}$-线性：$\\mathrm{d}(a\\omega+b\\eta) = a\\,\\mathrm{d}\\omega+b\\,\\mathrm{d}\\eta$；',
         '2. **分次 Leibniz 律**：$\\omega$ 是 $k$-形式时 $\\mathrm{d}(\\omega\\wedge\\eta) = \\mathrm{d}\\omega\\wedge\\eta+(-1)^{k}\\omega\\wedge\\mathrm{d}\\eta$；',
         '3. **$\\mathrm{d}^{2} = 0$**：混合偏导可交换的直接推论；',
         '4. 与坐标选取无关（等价说法：与拉回交换，见 `prop.pullback-forms`）。'].join('\n'),
        '',
        '$\\mathrm{d}\\omega = 0$ 的 $\\omega$ 叫**闭形式**，$\\omega = \\mathrm{d}\\eta$ 的叫**恰当形式**。由 $\\mathrm{d}^{2}=0$，恰当必闭；反之不成立（$\\mathbb{R}^{2}\\setminus\\{0\\}$ 上的 $\\frac{x\\,\\mathrm{d}y-y\\,\\mathrm{d}x}{x^{2}+y^{2}}$ 闭而不恰当）。'
      ].join('\n'),
      notes: [
        '**$\\mathrm{d}$ 是什么代数对象**：外代数上的**反导子** —— 次数 $+1$、分次 Leibniz、平方为零。这三条唯一确定它，所以不必背公式，记住这三条即可。',
        '**$\\mathrm{d}^{2}=0$ 与结构方程同源**：曲面的结构方程也是 $\\mathrm{d}^{2}=0$ 的读数（`thm.structure-equations`）。形式语言的好处是把「混合偏导可交换」与「标架可积」写成同一条等式。',
        '**三个经典算子的统一**（$n=3$）：$\\mathrm{d}$ 在 $0$-形式上给出梯度（作为 $1$-形式）、在 $1$-形式上给出旋度（作为 $2$-形式）、在 $2$-形式上给出散度（作为 $3$-形式）。于是 $\\mathrm{d}^{2}=0$ 就是「旋度的散度为零」与「梯度的旋度为零」。',
        '⚠️ **不能对向量场取 $\\mathrm{d}$**：$\\mathrm{d}$ 只作用在形式上。对向量场求导要额外的结构（联络，`def.affine-connection`），得到的是协变导数而不是外微分。',
        '⚠️ 同一个 $\\mathrm{d}$ 也用来记全微分、弧长元素、积分测度，这是记号的历史包袱。本图里 $\\mathrm{d}\\omega$ 一律指外微分，$\\mathrm{d}s$、$\\mathrm{d}A$ 各有所指（`def.arc-length`、`def.area-element`）。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「微分形式」· 外微分与闭形式',
        'do Carmo, Differential Forms and Applications, 第 1 章「微分形式」· 外微分'
      ]
    },

    {
      id: 'prop.pullback-forms',
      cluster: 'diffgeom.frame',
      type: 'proposition',
      label: '拉回',
      title: '微分形式的拉回',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '微分形式', '拉回', '链映射'],
      statement: [
        '**在做什么**：把形式沿着光滑映射「搬回去」—— 这是形式特有的能力（向量场只能正着推），也是「$\\mathrm{d}$ 与坐标无关」的正式说法。',
        '',
        '设 $F : U\\to V$ 是开集间的 $C^{\\infty}$ 映射，$\\omega$ 是 $V$ 上的 $k$-形式。**拉回** $F^{\\ast}\\omega$ 是 $U$ 上的 $k$-形式，定义为',
        '',
        '$$(F^{\\ast}\\omega)_{p}(v_{1},\\ldots,v_{k}) := \\omega_{F(p)}\\bigl(\\mathrm{d}F_{p}(v_{1}),\\ldots,\\mathrm{d}F_{p}(v_{k})\\bigr).$$',
        '',
        '于是 $F^{\\ast}$ 把 $\\Omega^{k}(V)$ 送到 $\\Omega^{k}(U)$，且满足',
        '',
        ['1. **线性**：$F^{\\ast}(a\\omega+b\\eta) = a\\,F^{\\ast}\\omega+b\\,F^{\\ast}\\eta$；对函数 $F^{\\ast}f = f\\circ F$；',
         '2. **保楔积**：$F^{\\ast}(\\omega\\wedge\\eta) = F^{\\ast}\\omega\\wedge F^{\\ast}\\eta$；',
         '3. **与 $\\mathrm{d}$ 交换**：$F^{\\ast}(\\mathrm{d}\\omega) = \\mathrm{d}(F^{\\ast}\\omega)$；',
         '4. **保复合**：$(G\\circ F)^{\\ast} = F^{\\ast}\\circ G^{\\ast}$，$(\\operatorname{id})^{\\ast} = \\operatorname{id}$。'].join('\n'),
        '',
        '前两条说 $F^{\\ast}$ 是分次代数同态，第三条说它还是链映射；合起来：**$F^{\\ast}$ 是微分分次代数的同态**。'
      ].join('\n'),
      notes: [
        '**方向**：$F : U\\to V$ 给出的是 $F^{\\ast} : \\Omega^{k}(V)\\to\\Omega^{k}(U)$，与 $F$ 反向。这就是「形式是协变的」的确切含义；也是它能沿任意光滑映射定义，而向量场的前推要求 $F$ 是微分同胚的原因。',
        '**（3）是核心**：它等价于「$\\mathrm{d}$ 不依赖坐标」。唯一的实质内容是链式法则，剩下的由 (2) 与 $\\mathrm{d}^{2}=0$ 收尾（证明在边上）。',
        '**几何里的用法**：曲面参数化 $r : U\\to\\mathbb{R}^{3}$ 把 $\\mathbb{R}^{3}$ 上的形式拉回 $U$。第一基本形式与面积元都是拉回的样子：$I = (\\omega^{1})^{2}+(\\omega^{2})^{2}$、$\\mathrm{d}A = \\omega^{1}\\wedge\\omega^{2}$。曲面论能用形式写，全靠这一条。',
        '⚠️ **拉回不保积分的方向**：$\\int_{U}F^{\\ast}\\omega = \\int_{F(U)}\\omega$ 只在 $F$ 是保向微分同胚、且形式的次数等于维数时成立（换元公式，`def.integral-form`）。',
        '⚠️ (4) 的次序不能记反：复合 $G\\circ F$ 的拉回是 $F^{\\ast}\\circ G^{\\ast}$，先拉后面那个。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「微分形式」· 拉回及其性质',
        'do Carmo, Differential Forms and Applications, 第 1 章「微分形式」· 拉回'
      ]
    },

    /* ======================================================================
       §C 曲面：只补 125 里缺的两样（diffgeom.surface）
       ====================================================================== */

    {
      id: 'def.area-element',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '面积元',
      title: '面积元与曲面面积',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲面', '面积', '第一基本形式'],
      statement: [
        '**在做什么**：给曲面装一把量面积的尺 —— 把参数域里的小矩形映成切平面上的小平行四边形，用它的面积当权重。',
        '',
        '设 $r : U\\to\\mathbb{R}^{3}$ 是正则参数曲面，$g_{ij} = \\langle r_{i},r_{j}\\rangle$ 是第一基本形式的矩阵（$r_{1} = r_{u}$、$r_{2} = r_{v}$）。**面积元**是',
        '',
        '$$\\mathrm{d}A := \\lVert r_{u}\\times r_{v}\\rVert\\,\\mathrm{d}u\\,\\mathrm{d}v = \\sqrt{\\det(g_{ij})}\\;\\mathrm{d}u\\,\\mathrm{d}v ,$$',
        '',
        '区域 $D\\subseteq U$ 的面积是 $\\operatorname{area}\\bigl(r(D)\\bigr) := \\int_{D}\\mathrm{d}A$。在正交余标架下它写成 $2$-形式',
        '',
        '$$\\mathrm{d}A = \\omega^{1}\\wedge\\omega^{2} .$$',
        '',
        '关键恒等式（Gram 行列式）：',
        '',
        '$$\\lVert r_{u}\\times r_{v}\\rVert^{2} = \\lVert r_{u}\\rVert^{2}\\lVert r_{v}\\rVert^{2}-\\langle r_{u},r_{v}\\rangle^{2} = \\det(g_{ij}).$$'
      ].join('\n'),
      notes: [
        '**为什么是 Gram 行列式**：二维平行四边形的面积 = 底乘高，平方之后就是两个向量的 Gram 矩阵的行列式（Lagrange 恒等式）。所以 $\\mathrm{d}A$ 就是切映射把参数域面积放大多少倍的因子。',
        '**与换元公式同源**：$\\sqrt{\\det(\\mathrm{d}r^{\\mathsf{T}}\\mathrm{d}r)}$ 正是非线性换元的 Jacobi 因子。注意 $\\mathrm{d}r$ 不是方阵，$(\\det\\mathrm{d}r)^{2}$ 没有意义，所以必须走 Gram 行列式这一条。',
        '⚠️ **面积元是密度、不是形式**：换参数化时 $\\sqrt{\\det g}$ 与 $\\mathrm{d}u\\,\\mathrm{d}v$ 一起变，乘积不变且**不变号**；而 $\\omega^{1}\\wedge\\omega^{2}$ 在反向参数化下变号。要把它当 $2$-形式积分，必须先取定定向（`def.orientable-surface`、`def.integral-form`）。',
        '**面积是内蕴的、定向是额外的**：面积不依赖参数化（换元即知），带符号面积才依赖定向。所以「面积」写得出来而「$\\int\\omega^{1}\\wedge\\omega^{2}$ 的符号」要另外交代。',
        '⭐ **用在哪里**：Gauss–Bonnet 的 $\\int_{M}K\\,\\mathrm{d}A$、Gauss 映射的面积放大率 $\\lvert K\\rvert$、极小曲面的面积泛函，都以它为测度。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲面」· 面积元与曲面积分',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 2 章「正则曲面」· 面积'
      ]
    },

    {
      id: 'def.orientable-surface',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '可定向曲面',
      title: '可定向曲面与定向',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲面', '定向', '法向场'],
      statement: [
        '**在做什么**：判断能不能在整张曲面上连续地选一个「正面」—— 这决定了面积元的符号、整体法向与 Gauss 映射的存在，以及 Stokes 型公式能否写下来。',
        '',
        '先说清「曲面」在这里的意思：点集 $S\\subseteq\\mathbb{R}^{3}$ 叫**曲面**，如果它被一族正则参数化 $r_{\\alpha} : U_{\\alpha}\\to S$ 覆盖，且重叠处的参数变换是微分同胚。单张参数化的像（`def.regular-surface`）是特例，但球面、环面这类闭曲面必须用多张卡拼。',
        '',
        '若存在**连续**的单位法向量场 $n : S\\to\\mathbb{R}^{3}$（每点 $n(p)\\perp T_{p}S$、$\\lVert n(p)\\rVert = 1$），称 $S$ **可定向**，$n$ 叫它的一个**定向**，$(S,n)$ 叫**定向曲面**。等价说法：',
        '',
        ['- 存在覆盖 $S$ 的参数化族，使任意两张卡在重叠处的参数变换的 Jacobi 行列式 $>0$；',
         '- 面积形式 $\\omega^{1}\\wedge\\omega^{2}$ 可以在整张曲面上一致地选取（不换号）。'].join('\n'),
        '',
        '**例**：球面、环面、任何 $z = f(x,y)$ 的图、任何单张参数化的像，都可定向。**Möbius 带**不可定向 —— 沿带子走一圈，法向会翻过来。'
      ].join('\n'),
      notes: [
        '**为什么单张参数化的像自动可定向**：$n = (r_{u}\\times r_{v})/\\lVert r_{u}\\times r_{v}\\rVert$ 就是一个整体单位法向。所以「不可定向」只可能发生在需要多张卡拼的曲面上 —— 定向是**整体**性质，不是逐点性质（每点都有两个法向可选，难处在于选得一致）。',
        '**恰有两个定向**：连通的可定向曲面上，$n$ 与 $-n$ 是两个定向，没有第三个。所以「取定定向」只有二选一。',
        '⚠️ **换卡的符号**：两张卡上各自算出的法向差一个符号，这个符号等于参数变换 Jacobi 的符号。可定向等价于「能选一个族使所有 Jacobi 同号」，也就是「转移映射保向」。',
        '**用在哪里**：整体 Gauss 映射 $n : S\\to S^{2}$ 与 $\\int_{S}K\\,\\mathrm{d}A = 4\\pi\\deg(n)$；Stokes 定理的边界定向；以及 `thm.gauss-bonnet` 里「需要可定向」那一句。',
        '⚠️ **不可定向曲面上仍能积分**：$\\mathrm{d}A$ 本身不变号，面积照样有定义；丢掉的只是「带符号的积分」与「整体法向」。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲面」· 定向与法向场',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 定向'
      ]
    },

    /* ======================================================================
       §D 流形与切空间（diffgeom.intrinsic）
       ====================================================================== */

    {
      id: 'def.smooth-manifold',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '光滑流形',
      title: '光滑流形与图册',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '流形', '图册', '光滑结构'],
      statement: [
        '**在做什么**：把 $\\mathbb{R}^{n}$ 上的微积分搬到「局部看起来像 $\\mathbb{R}^{n}$」的空间上 —— 造一叠坐标卡，规定换卡时必须是光滑的，此后「光滑函数」才有意义。',
        '',
        '设 $M$ 是 Hausdorff、第二可数的拓扑空间。$M$ 上的 **$n$ 维图卡**是 $(U,\\varphi)$，其中 $U\\subseteq M$ 开、$\\varphi : U\\to\\varphi(U)\\subseteq\\mathbb{R}^{n}$ 是同胚。两张卡 $(U,\\varphi)$、$(V,\\psi)$ 叫 **$C^{\\infty}$-相容**，如果**转移映射**',
        '',
        '$$\\psi\\circ\\varphi^{-1} : \\varphi(U\\cap V)\\longrightarrow\\psi(U\\cap V)$$',
        '',
        '是 $C^{\\infty}$（它定义在 $\\mathbb{R}^{n}$ 的开集上，用偏导数检验）。一族两两相容、覆盖 $M$ 的图卡叫**图册**；图册添上所有与它相容的卡得到**极大图册**，也叫 $M$ 上的**光滑结构**。带光滑结构的 $n$ 维流形叫 **$n$ 维光滑流形**。',
        '',
        '**光滑函数**：$f : M\\to\\mathbb{R}$ 光滑，指对每张卡 $(U,\\varphi)$，$f\\circ\\varphi^{-1}$ 在 $\\varphi(U)$ 上光滑。相容性保证这个定义与卡的选取无关。',
        '',
        '**例子**：$\\mathbb{R}^{n}$（一张卡）；$S^{n}\\subseteq\\mathbb{R}^{n+1}$（球极投影给两张卡）；$\\mathbb{RP}^{n}$（$n+1$ 张仿射卡）；任何开子集；流形的乘积。'
      ].join('\n'),
      notes: [
        '**为什么必须极大化**：只说「有一族相容的卡」时，「$f$ 光滑」依赖这族卡的选取；极大化之后，任何与该图册相容的卡自动在其中，光滑性才成为流形的性质而不是某张卡的性质。',
        '**三个拓扑条件的分工**：Hausdorff 排除「两个点粘在一起分不开」（否则极限不唯一）；第二可数给出 Lindelöf 与仿紧，从而有**单位分解**（`def.paracompact` 那条线）—— 有了它才能把局部的度量、局部的形式拼成整体的。',
        '⚠️ **光滑结构不是拓扑的一部分**：同一个拓扑空间可以带不等价的光滑结构（Milnor 的 7 维怪球；$\\mathbb{R}^{4}$ 上有不可数多个互不等价的光滑结构）。所以「光滑流形」是拓扑空间**加**结构，不是拓扑空间的性质。',
        '**与已有内容的接口**：隐函数定理给出 $\\mathbb{R}^{n}$ 里水平集是流形（`thm.regular-level-set`）；反过来，任何流形都能嵌入某个 $\\mathbb{R}^{N}$（Whitney），但 $N$ 可能远大于 $n$，所以抽象定义不是多余。',
        '⚠️ 本图的曲面（`def.regular-surface`）是二维流形的具体模型：两张卡的重叠就是参数变换，而「$C^{\\infty}$-相容」正是「换参数化后光滑性不变」。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「流形」· 图卡、图册与光滑结构',
        'Tu, An Introduction to Manifolds, 「Manifolds」· 光滑流形与转移映射'
      ]
    },

    {
      id: 'def.tangent-space-manifold',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '切空间',
      title: '流形上的切空间',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '流形', '切空间', '导子'],
      statement: [
        '**在做什么**：在流形上定义「某点的所有方向」。没有外围空间可用，于是改用「过该点的曲线」来抓方向：两条曲线只要在某张卡里速度相同，就规定它们同向。',
        '',
        '设 $M$ 是 $n$ 维光滑流形，$p\\in M$。两条过 $p$ 的曲线 $\\gamma_{1},\\gamma_{2} : (-\\varepsilon,\\varepsilon)\\to M$（$\\gamma_{i}(0) = p$）叫**在 $p$ 处相切**，如果存在（等价地：对每张）含 $p$ 的卡 $(U,\\varphi)$ 有',
        '',
        '$$(\\varphi\\circ\\gamma_{1})\'(0) = (\\varphi\\circ\\gamma_{2})\'(0) .$$',
        '',
        '「存在一张卡」与「对每张卡」等价，因为换卡只差一个链式法则因子。这个等价类叫 $p$ 处的一个**切向量**，全体记 $T_{p}M$。',
        '',
        '在卡 $(U,\\varphi)$ 里记 $x^{i} := \\varphi^{i}$、$\\partial_{i} := \\partial/\\partial x^{i}$。取曲线 $t\\mapsto\\varphi^{-1}\\bigl(\\varphi(p)+t\\,e_{i}\\bigr)$ 的类，记作 $\\partial_{i}(p)$。这 $n$ 个切向量两两不同、线性无关，构成 $T_{p}M$ 的一组基，于是 $\\dim T_{p}M = n$。',
        '',
        '**导子刻画**（等价定义）：$T_{p}M$ 与「满足 Leibniz 律的线性泛函 $D : C^{\\infty}(M)\\to\\mathbb{R}$，即 $D(fg) = f(p)\\,Dg+g(p)\\,Df$」一一对应，对应关系是 $v = [\\gamma]\\mapsto\\bigl(f\\mapsto (f\\circ\\gamma)\'(0)\\bigr)$。切丛 $TM := \\bigsqcup_{p\\in M}T_{p}M$ 也带光滑流形结构（维数 $2n$）。'
      ].join('\n'),
      notes: [
        '**为什么不能用差商**：$\\mathbb{R}^{n}$ 里切向量是 $(\\gamma(t)-\\gamma(0))/t$ 的极限，需要减法；流形上没有减法，能用的只有「坐标 + 链式法则」，所以定义必须写成「在某张卡里速度相同」这种**变换相容**的样子。',
        '**两种定义为什么等价**：曲线类给出方向导数（Leibniz 律由乘积求导得到）；反过来，给一个导子 $D$，把它作用在展开式上、用 Leibniz 律杀掉二次以上的项，就得到 $D = \\sum_{i}D(x^{i})\\,\\partial_{i}(p)$ —— 正好是某条曲线的方向导数。',
        '**坐标变换**：$\\partial/\\partial x^{i} = \\sum_{j}\\frac{\\partial y^{j}}{\\partial x^{i}}\\,\\partial/\\partial y^{j}$，系数是 Jacobi 矩阵。所以切向量**反变**（跟着坐标反向走），而 $\\mathrm{d}f$ 这类余切向量**协变**。',
        '⚠️ **记号陷阱**：$\\partial_{i}(p)$ 是**向量**，$\\mathrm{d}x^{i}(p)$ 是它的对偶**余向量**（$\\mathrm{d}x^{i}(\\partial_{j}) = \\delta^{i}_{\\ j}$）。曲面上这两样就是切平面的基与对偶余标架（`def.moving-frame`）。',
        '**与曲面切平面一致**：$S\\subseteq\\mathbb{R}^{3}$ 的 $T_{p}S$（由 $r_{u},r_{v}$ 张成）与上面的抽象定义给出同一个空间 —— 取卡 $\\varphi = r^{-1}$ 一比就知道，曲线的速度正是 $\\mathbb{R}^{3}$ 里的速度。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「流形」· 切向量、导子与切空间',
        'Tu, An Introduction to Manifolds, 「Tangent Vectors」· 曲线等价类与导子'
      ]
    },

    {
      id: 'thm.regular-level-set',
      cluster: 'diffgeom.intrinsic',
      type: 'theorem',
      label: '正则水平集定理',
      title: '正则水平集定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '流形', '隐函数定理', '切空间'],
      statement: [
        '**在做什么**：给一台「批量生产流形」的机器 —— 一个方程组的解集，只要导数满秩，就是光滑流形，维数 = 变量数减方程数。这是分析通往几何的那座桥。',
        '',
        '设 $U\\subseteq\\mathbb{R}^{n}$ 开，$F = (F^{1},\\ldots,F^{m}) : U\\to\\mathbb{R}^{m}$ 是 $C^{\\infty}$，$c\\in\\mathbb{R}^{m}$。若对每个 $p\\in M := F^{-1}(c)$，微分',
        '',
        '$$\\mathrm{d}F_{p} : \\mathbb{R}^{n}\\longrightarrow\\mathbb{R}^{m}$$',
        '',
        '都是满射（等价地：$m\\times n$ 矩阵 $\\bigl(\\partial F^{i}/\\partial x^{j}(p)\\bigr)$ 的秩为 $m$，即有一个 $m\\times m$ 子式非零），则 $M$ 是 $n-m$ 维光滑流形，且',
        '',
        '$$T_{p}M = \\ker\\mathrm{d}F_{p}\\qquad (p\\in M).$$',
        '',
        '特别地 $m = 1$ 时：$\\nabla F(p)\\ne 0$ 的每个正则值 $c$ 的原像是 $(n-1)$ 维光滑流形（**超曲面**）。'
      ].join('\n'),
      notes: [
        '**例子**：$F(x) = \\lVert x\\rVert^{2}$，它在 $F^{-1}(1) = S^{n-1}$ 上梯度为 $2x\\ne 0$，故球面是流形。$F = \\det$，$\\mathrm{d}\\det_{A}(B) = \\operatorname{tr}(A^{-1}B)$（$\\det A = 1$ 时），在 $\\mathrm{SL}(n,\\mathbb{R})$ 上非零，故 $\\mathrm{SL}(n,\\mathbb{R})$ 是 $n^{2}-1$ 维流形。',
        '**满射条件不能丢**：$F(x,y) = xy$、$c = 0$，$\\mathrm{d}F$ 在原点为零，而 $F^{-1}(0)$ 是两条相交直线 —— 交点附近不是流形。',
        '**证明骨架**：每点用隐函数定理把 $m$ 个变量解成另 $n-m$ 个变量的光滑函数，于是 $M$ 局部是图 $\\{(x,g(x))\\}$，图就是一张卡；重叠处的转移映射是光滑映射的限制，故相容。切空间由「$F\\circ\\gamma\\equiv c$ 求导」得 $\\mathrm{d}F_{p}(\\gamma\'(0)) = 0$，再比维数。',
        '⚠️ **正则性是相对 $F$ 说的**：$c$ 不是正则值时原像可能是奇点集（$xy = 0$ 就是）。同一个 $M$ 可以用不同的 $F$ 表示，只要找得到一个 $F$ 使 $c$ 是正则值就够了。',
        '**它把两块连起来**：左边是多元微积分（隐函数定理），右边是几何（流形与切空间）。所以「微分几何离别的板块太远」在这一点上可以直接反驳 —— 水平集定理就是显式的桥。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「流形」· 正则水平集与隐函数定理',
        'Tu, An Introduction to Manifolds, 「Manifolds」· 正则水平集定理'
      ]
    },

    {
      id: 'def.riemannian-metric',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: 'Riemann 度量',
      title: 'Riemann 度量',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '黎曼几何', '度量', '内积'],
      statement: [
        '**在做什么**：在每点的切空间上放一个内积，并要求它随点光滑变化 —— 有了它，流形上才有长度、角度、体积，也才有测地线与曲率。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。**黎曼度量** $g$ 给每点 $p\\in M$ 一个内积',
        '',
        '$$g_{p} : T_{p}M\\times T_{p}M\\longrightarrow\\mathbb{R}$$',
        '',
        '（双线性、对称、正定），并且对任意光滑向量场 $X,Y$，函数 $p\\mapsto g_{p}(X_{p},Y_{p})$ 光滑。$(M,g)$ 叫**黎曼流形**。在卡里写成',
        '',
        '$$g = \\sum_{i,j=1}^{n}g_{ij}\\,\\mathrm{d}x^{i}\\mathrm{d}x^{j},\\qquad g_{ij} = g(\\partial_{i},\\partial_{j}),$$',
        '',
        '其中 $(g_{ij})$ 对称正定。由此得到长度与体积：',
        '',
        '$$L(\\gamma) = \\int_{a}^{b}\\sqrt{g_{\\gamma(t)}\\bigl(\\dot\\gamma(t),\\dot\\gamma(t)\\bigr)}\\,\\mathrm{d}t ,\\qquad \\mathrm{d}V = \\sqrt{\\det(g_{ij})}\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n}.$$'
      ].join('\n'),
      notes: [
        '**存在性**：局部总有度量（坐标里取 $\\delta_{ij}$），再用单位分解把局部度量凸组合成整体的 —— 正定性对凸组合封闭。所以**每个**光滑流形都能配黎曼度量（复结构、辛结构都有拓扑障碍，度量没有）。',
        '**它不是流形的一部分**：同一个光滑流形上有无穷多度量。度量的选取是**额外结构**；只依赖 $g$ 的量叫内蕴量（`def.intrinsic-quantity`），依赖嵌入的叫外在量。',
        '**二维的特例就是第一基本形式**：曲面上取 $\\mathbb{R}^{3}$ 的内积限制在 $T_{p}S$ 上，得到的就是 $I$。所以黎曼几何是曲面内蕴几何的高维版，曲面论是它的二维模型。',
        '**度量决定其余全部**：由 $g$ 唯一确定 Levi-Civita 联络与 Christoffel 记号（`def.affine-connection`、`def.christoffel-symbol`），于是测地线、曲率张量、Ricci 都与 $g$ 绑定 —— 这是「内蕴几何」的全部内容。',
        '⚠️ 不是每个黎曼流形都能等距嵌入低维欧氏空间。Nash 定理说总能嵌入某个足够高维的 $\\mathbb{R}^{N}$，但那时「内蕴」的视角仍然更省事：结论只该依赖 $g$，不该依赖嵌入。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「黎曼度量」· 度量、长度与体积',
        'do Carmo, Riemannian Geometry, 「Riemannian Metrics」· 度量与单位分解'
      ]
    },

    /* ======================================================================
       §E 联络与曲率（diffgeom.intrinsic）
       ====================================================================== */

    {
      id: 'def.affine-connection',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '仿射联络',
      title: '仿射联络与协变导数',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '联络', '协变导数', 'Levi-Civita'],
      statement: [
        '**在做什么**：规定「把一个向量沿某个方向搬运时怎么变」—— 有了这条规则才能对向量场求导，进而谈加速度、测地线与曲率。',
        '',
        '设 $M$ 是光滑流形，$\\mathfrak{X}(M)$ 是光滑向量场的集合。**仿射联络**（线性联络）是一个映射',
        '',
        '$$\\nabla : \\mathfrak{X}(M)\\times\\mathfrak{X}(M)\\longrightarrow\\mathfrak{X}(M),\\qquad (X,Y)\\longmapsto\\nabla_{X}Y ,$$',
        '',
        '满足三条：',
        '',
        ['1. 对第一个变元 $C^{\\infty}(M)$-线性：$\\nabla_{fX+gY}Z = f\\,\\nabla_{X}Z+g\\,\\nabla_{Y}Z$；',
         '2. 对第二个变元 $\\mathbb{R}$-线性：$\\nabla_{X}(aY+bZ) = a\\,\\nabla_{X}Y+b\\,\\nabla_{X}Z$；',
         '3. **Leibniz 律**：$\\nabla_{X}(fY) = (Xf)\\,Y+f\\,\\nabla_{X}Y$。'].join('\n'),
        '',
        '$\\nabla_{X}Y$ 叫 $Y$ 沿 $X$ 的**协变导数**。在卡里设 $\\nabla_{\\partial_{i}}\\partial_{j} = \\Gamma^{k}_{ij}\\partial_{k}$，则',
        '',
        '$$\\nabla_{X}Y = \\sum_{k}\\Bigl(X^{j}\\partial_{j}Y^{k}+\\Gamma^{k}_{ij}X^{i}Y^{j}\\Bigr)\\partial_{k}.$$',
        '',
        '黎曼流形上有唯一**无挠**（$\\nabla_{X}Y-\\nabla_{Y}X = [X,Y]$）且**保度量**（$X\\,g(Y,Z) = g(\\nabla_{X}Y,Z)+g(Y,\\nabla_{X}Z)$）的联络，叫 **Levi-Civita 联络**；它的 $\\Gamma$ 就是 Christoffel 记号。'
      ].join('\n'),
      notes: [
        '**三条公理的读法**：第 1 条说明 $\\nabla_{X}Y$ 在一点只依赖 $X$ 在该点的值（否则不算「沿方向」）；第 3 条说明它对 $Y$ 不是张量性的 —— 求导必须看见 $Y$ 的变化。这个不对称正是「联络」与「张量」的分界。',
        '**平行移动与测地线**：解 $\\nabla_{\\dot\\gamma}V = 0$ 得 $V$ 沿 $\\gamma$ 的**平行移动**；$\\nabla_{\\dot\\gamma}\\dot\\gamma = 0$ 的解就是**测地线**（`def.geodesic`）。两样都只用 $\\nabla$，不需要外围空间。',
        '**联络不唯一**：一般的仿射联络有无穷多（$\\Gamma$ 的任意非对称部分都能改）。加上「无挠 + 保度量」才唯一 —— 这就是 Levi-Civita 联络的存在唯一性（Koszul 公式）。',
        '**曲率是联络的交换子**：$R(X,Y) = [\\nabla_{X},\\nabla_{Y}]-\\nabla_{[X,Y]}$（`def.curvature-tensor`）。所以一个「联络」同时生出平行移动、测地线与曲率。',
        '⚠️ **指标约定**：无挠时 $\\Gamma^{k}_{ij}$ 对两个下标对称；$\\omega^{k}_{\\ j}$ 是同一件东西在正交标架下的样子（`def.connection-form`）。两者换标架时差一个 Jacobi 因子，都**不是张量**。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「联络」· 仿射联络与协变导数',
        'do Carmo, Riemannian Geometry, 「Connections」· 仿射联络与 Levi-Civita 联络'
      ]
    },

    {
      id: 'prop.curvature-tensor-symmetries',
      cluster: 'diffgeom.intrinsic',
      type: 'proposition',
      label: '曲率张量的对称性',
      title: '曲率张量的对称性与独立分量数',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '曲率张量', '对称性', '比安基'],
      statement: [
        '**在做什么**：清点曲率张量到底有几个独立分量 —— 四条对称性把它从 $n^{4}$ 砍到 $n^{2}(n^{2}-1)/12$。这是「二维曲率只有一个数、四维有两个张量」的算术来源。',
        '',
        '设 $(M,g)$ 是黎曼流形，曲率算子 $R(X,Y)Z = \\nabla_{X}\\nabla_{Y}Z-\\nabla_{Y}\\nabla_{X}Z-\\nabla_{[X,Y]}Z$，分量 $R_{ijk\\ell} = \\langle R(\\partial_{i},\\partial_{j})\\partial_{k},\\partial_{\\ell}\\rangle$（约定与 `def.curvature-tensor`、`def.gauss-curvature` 相同）。则',
        '',
        ['1. **对前两个指标反称**：$R_{ijk\\ell} = -R_{jik\\ell}$；',
         '2. **对后两个指标反称**：$R_{ijk\\ell} = -R_{ij\\ell k}$；',
         '3. **两对指标可交换**：$R_{ijk\\ell} = R_{k\\ell ij}$；',
         '4. **第一比安基恒等式**：$R_{ijk\\ell}+R_{jki\\ell}+R_{kij\\ell} = 0$。'].join('\n'),
        '',
        '于是独立分量数是',
        '',
        '$$\\dim = \\frac{n^{2}\\bigl(n^{2}-1\\bigr)}{12}:\\qquad n = 2:\\ 1,\\quad n = 3:\\ 6,\\quad n = 4:\\ 20 .$$',
        '',
        '无指标的说法：$R(X,Y,Z,W) := \\langle R(X,Y)Z,W\\rangle$ 是 $\\bigwedge^{2}T_{p}M$ 上的对称双线性型（前两条给反称、第三条给对称），第四条再削掉 $\\binom{n}{3}$ 维。'
      ].join('\n'),
      notes: [
        '**前两条的来源不同**：对 $X,Y$ 的反称是定义里 $[\\nabla_{X},\\nabla_{Y}]$ 的直接结果；对 $Z,W$ 的反称要用**保度量**（$\\nabla g = 0$）—— 先证 $\\langle R(X,Y)Z,Z\\rangle = 0$ 再极化。',
        '**第四条来自无挠**：$R(X,Y)Z+R(Y,Z)X+R(Z,X)Y = 0$。等价的漂亮证法：无挠时 $\\nabla^{2}Z(X,Y) := \\nabla_{X}\\nabla_{Y}Z-\\nabla_{\\nabla_{X}Y}Z$ 关于 $X,Y$ 对称，而 $R(X,Y)Z = \\nabla^{2}Z(X,Y)-\\nabla^{2}Z(Y,X)$；对三个变元循环求和时两个对称项互换位置、逐项抵消。',
        '**第三条是纯代数记账**：把第一比安基对四个变元的几种循环取法写出、用前两条把符号搬正再相加，剩下的正是 $R_{ijk\\ell}-R_{k\\ell ij}$。没有几何内容，本节点不逐项抄。',
        '**为什么要数分量**：$n = 2$ 时只剩 $R_{1212}$ 一个函数，所以二维曲率**就是一个数**（高斯曲率）；$n = 3$ 时 $6$ 个分量全由 Ricci 决定（外尔张量为零）；$n = 4$ 时 $20 = 10+10$，后一半是外尔张量 —— 引力波住在那里。',
        '⚠️ **符号约定**：本图取 $R_{ijk\\ell} = \\langle R(\\partial_{i},\\partial_{j})\\partial_{k},\\partial_{\\ell}\\rangle$，单位球面给 $R_{1221} = +1$、$R_{1212} = -1$。换一种指标次序会让第 3、4 条的符号整体挪位，用球面检验最快。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲率」· 曲率张量的对称性',
        'do Carmo, Riemannian Geometry, 「Curvature」· 曲率张量的性质'
      ]
    },

    {
      id: 'thm.bianchi-identity',
      cluster: 'diffgeom.intrinsic',
      type: 'theorem',
      label: '比安基恒等式',
      title: '第一与第二比安基恒等式',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '曲率', '比安基恒等式', '爱因斯坦张量'],
      statement: [
        '**在做什么**：曲率张量除了代数对称性，还必须满足一条**微分**恒等式 —— 它是「Einstein 张量散度为零」的几何来源，也是广义相对论里能量守恒的对应物。',
        '',
        '设 $(M,g)$ 是黎曼流形，$R$ 是曲率算子，$\\nabla$ 是 Levi-Civita 联络。则',
        '',
        '**第一比安基恒等式**（代数，无挠的推论）',
        '',
        '$$R(X,Y)Z+R(Y,Z)X+R(Z,X)Y = 0 ;$$',
        '',
        '**第二比安基恒等式**（微分）',
        '',
        '$$(\\nabla_{X}R)(Y,Z)+(\\nabla_{Y}R)(Z,X)+(\\nabla_{Z}R)(X,Y) = 0 ,$$',
        '',
        '其中 $(\\nabla_{X}R)(Y,Z)W := \\nabla_{X}\\bigl(R(Y,Z)W\\bigr)-R(\\nabla_{X}Y,Z)W-R(Y,\\nabla_{X}Z)W-R(Y,Z)\\nabla_{X}W$。',
        '',
        '**缩并形式**（两次缩并并整理）：',
        '',
        '$$\\nabla^{i}\\Bigl(R_{ij}-\\frac{1}{2}S\\,g_{ij}\\Bigr) = 0 ,$$',
        '',
        '即 Einstein 张量 $G_{ij} := R_{ij}-\\frac{1}{2}S\\,g_{ij}$ 的散度为零。'
      ].join('\n'),
      notes: [
        '**第一 vs 第二**：第一是**代数**恒等式（同一点上四个向量之间），第二是**微分**恒等式（曲率的导数之间）。第一比安基已在 `def.curvature-tensor` 里列出，本节点给证明；第二比安基不成立的话 Einstein 方程根本写不出来。',
        '**证明的机制**：在一点取法坐标（$\\Gamma^{k}_{ij}(p) = 0$、$\\partial_{i}g_{jk}(p) = 0$），则 $\\nabla_{i} = \\partial_{i}$ 且 $R_{ijk\\ell}$ 可用 $g$ 的二阶导数写出；三条轮流展开后，每个三阶偏导出现两次、符号相反，逐项抵消。两边都是张量等式且在每点都能这样取坐标，故恒成立。',
        '**缩并那一步**：对第二比安基先用 $g^{i\\ell}$ 缩并、再用 $g^{jm}$ 缩并，用对称性把指标搬正，即得 $\\nabla^{i}G_{ij} = 0$。这一步是「Einstein 张量为什么恰好是 $R_{ij}-\\frac{1}{2}Sg_{ij}$」的全部理由：这个组合是唯一（差常数倍）散度为零的二阶对称张量。',
        '⚠️ 缩并的方向依赖符号约定：本图取 $R_{ij} = R^{k}_{\\ kij}$（见 `def.ricci-curvature`），于是 $G_{ij} = R_{ij}-\\frac{1}{2}Sg_{ij}$ 散度为零。换一套 Ricci 的符号，$G$ 里的相对符号也跟着变，但「散度为零」这条内容不变。',
        '⭐ **它管什么用**：Einstein 方程 $R_{ij}-\\frac{1}{2}Sg_{ij} = 8\\pi T_{ij}$ 的左边自动散度为零，于是右边（能量-动量张量）必须守恒 —— 这就是「几何决定守恒律」的那一半。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲率」· 比安基恒等式与 Einstein 张量',
        'do Carmo, Riemannian Geometry, 「Curvature」· 比安基恒等式'
      ]
    },

    {
      id: 'def.sectional-curvature',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '截面曲率',
      title: '截面曲率',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲率', '截面曲率', '常曲率'],
      statement: [
        '**在做什么**：把曲率张量压成一个数，让「弯曲」可以比较、可以讲成故事 —— 一个二维截面上的弯曲程度。',
        '',
        '设 $(M,g)$ 是黎曼流形，$p\\in M$，$\\sigma\\subseteq T_{p}M$ 是二维子空间，$X,Y$ 是 $\\sigma$ 的一组基。**截面曲率**定义为',
        '',
        '$$K(\\sigma) := \\frac{\\langle R(X,Y)Y,X\\rangle}{\\langle X,X\\rangle\\langle Y,Y\\rangle-\\langle X,Y\\rangle^{2}} ,$$',
        '',
        '它与 $\\sigma$ 的基的选取无关（换基时分子分母同乘行列式的平方）。若 $X,Y$ 是单位正交基，则',
        '',
        '$$K(\\sigma) = \\langle R(X,Y)Y,X\\rangle = R_{1221}\\qquad (X = e_{1},\\ Y = e_{2}).$$',
        '',
        '当 $\\dim M = 2$ 时只有一个二维截面（$T_{p}M$ 本身），$K$ 就是**高斯曲率**。若 $K(\\sigma)$ 与 $\\sigma$ 无关（记作**常截面曲率** $K$），则',
        '',
        '$$R(X,Y)Z = K\\bigl(\\langle Y,Z\\rangle X-\\langle X,Z\\rangle Y\\bigr).$$'
      ].join('\n'),
      notes: [
        '**为什么它能代表曲率**：截面曲率是最便宜的读数（一个数），但它**决定整个** $R$ —— 由双线性型的极化，$\\langle R(X,Y)Z,W\\rangle$ 可以由若干截面曲率组合出来。所以「所有截面曲率」与「曲率张量」是同一份信息。',
        '**符号约定的检验**：单位球面 $S^{n}$ 的截面曲率是 $+1$、半径 $r$ 的球面是 $1/r^{2}$（正曲率意味着测地线相互靠拢）；双曲空间是 $-1$。与 `def.gauss-curvature` 里「单位球面 $K = 1$」一致 —— 这是本图判断符号是否抄错的硬判据。',
        '**二维不必另立概念**：$\\dim M = 2$ 时 $K$ 就是高斯曲率；`def.gauss-curvature` 用 $K = R_{1221}/\\det(g_{ij})$ 定义，在单位正交基下与上式完全相同，一般坐标下只差一个 $\\det g$ 的归一化。',
        '⚠️ **三维之后分家**：$\\dim M = 3$ 时截面曲率决定 $R$，而 $R$ 又由 Ricci 决定（外尔张量为零）；四维起 Ricci 不能复原截面曲率，外尔张量独立存在。',
        '**常曲率是最强的对称性假设**：球面、欧氏空间、双曲空间（以及它们的商）是仅有的常曲率空间形式 —— 这是「几何三分」的来源。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲率」· 截面曲率与常曲率空间',
        'do Carmo, Riemannian Geometry, 「Curvature」· 截面曲率'
      ]
    },

    {
      id: 'def.ricci-curvature',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: 'Ricci 曲率',
      title: 'Ricci 曲率与数量曲率',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲率', 'Ricci 曲率', '数量曲率', '迹'],
      statement: [
        '**在做什么**：把曲率张量缩并一次得到 Ricci 曲率、再缩并一次得到数量曲率 —— 这两个更粗的量才是 Einstein 方程里出现的对象。',
        '',
        '设 $(M,g)$ 是黎曼流形，$R$ 是曲率算子。**Ricci 曲率**是',
        '',
        '$$\\operatorname{Ric}(X,Y) := \\operatorname{tr}\\bigl(Z\\mapsto R(Z,X)Y\\bigr) = \\sum_{k}\\langle R(e_{k},X)Y,e_{k}\\rangle ,$$',
        '',
        '其中 $\\{e_{k}\\}$ 是任意单位正交基（取迹与基无关，这正是 `def.trace` 的相似不变性）。分量写成',
        '',
        '$$R_{ij} := R^{k}_{\\ kij} = g^{k\\ell}R_{kij\\ell} .$$',
        '',
        '再缩并一次得**数量曲率**',
        '',
        '$$S := \\operatorname{tr}_{g}\\operatorname{Ric} = g^{ij}R_{ij} .$$',
        '',
        '二维时曲率只有一个独立分量，于是两者都被高斯曲率决定：',
        '',
        '$$R_{ij} = K\\,g_{ij},\\qquad S = 2K,\\qquad R_{1221} = K\\det(g_{ij}).$$'
      ].join('\n'),
      notes: [
        '**它是迹，所以比 $R$ 粗**：$R$ 有 $n^{2}(n^{2}-1)/12$ 个分量，$R_{ij}$ 有 $n(n+1)/2$ 个，$S$ 只有 $1$ 个。二维：$1 = 1 = 1$（三者等价）；三维：$6 = 6 = 1$（Ricci 决定一切）；四维：$20 > 10 > 1$（Ricci 丢掉外尔部分）。',
        '**符号约定与检验**：本图取 $\\operatorname{Ric}(X,Y) = \\operatorname{tr}\\bigl(Z\\mapsto R(Z,X)Y\\bigr)$，于是单位球面 $S^{n}$ 给 $\\operatorname{Ric} = (n-1)g$、$S = n(n-1)$，二维时 $\\operatorname{Ric} = Kg$（球面 $K = 1$，与 `def.gauss-curvature` 一致）。**判断约定对不对就看这一条**；把缩并的指标换一个位置会整体反号。',
        '**为什么对称**：$R_{ij}$ 的对称性来自曲率张量的两对指标可交换（`prop.curvature-tensor-symmetries` 第 3 条）。所以 Ricci 是切丛上的对称双线性型，可以拿来做二次型 $\\operatorname{Ric}(v,v)$。',
        '**Einstein 张量**：$G_{ij} = R_{ij}-\\frac{1}{2}Sg_{ij}$，由第二比安基 $\\nabla^{i}G_{ij} = 0$（`thm.bianchi-identity`）。这就是「为什么是 $R_{ij}-\\frac{1}{2}Sg_{ij}$ 而不是 $R_{ij}$」的唯一理由。',
        '⚠️ 二维里三个记号容易混：$K$ 是高斯曲率（一个数）、$S = 2K$ 是数量曲率（内蕴）、$H$ 是平均曲率（外在，依赖嵌入，且随法向变号）。只有 $H$ 会变号。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「曲率」· Ricci 曲率与数量曲率',
        'do Carmo, Riemannian Geometry, 「Curvature」· Ricci 曲率与数量曲率'
      ]
    },

    /* ======================================================================
       §F 积分与 Stokes（diffgeom.intrinsic）
       ====================================================================== */

    {
      id: 'def.integral-form',
      cluster: 'diffgeom.intrinsic',
      type: 'definition',
      label: '形式的积分',
      title: '形式的积分与定向',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '微分形式', '积分', '定向'],
      statement: [
        '**在做什么**：把「$n$-形式在一个定向区域上积起来」说清楚 —— 它是唯一能自然积分的东西，因为换元时只有最高次外形式的变换因子恰好是行列式（不带绝对值）。',
        '',
        '设 $U\\subseteq\\mathbb{R}^{n}$ 开，$\\omega = f\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$ 是紧支的 $n$-形式。定义',
        '',
        '$$\\int_{U}\\omega := \\int_{U}f(x)\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n},$$',
        '',
        '右边是通常的（Lebesgue 或 Riemann）积分，$\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n}$ 记 Lebesgue 测度。**良定性**：若 $y = \\psi(x)$ 是保向微分同胚，则',
        '',
        '$$\\omega = (f\\circ\\psi^{-1})\\det\\Bigl(\\frac{\\partial x}{\\partial y}\\Bigr)\\,\\mathrm{d}y^{1}\\wedge\\cdots\\wedge\\mathrm{d}y^{n},$$',
        '',
        '而换元公式里出现的正是同一个 $\\det$（**不是** $\\lvert\\det\\rvert$），所以积分不变。于是在**定向**流形 $M$ 上取保向图册与单位分解 $\\{\\rho_{\\alpha}\\}$，可整体定义',
        '',
        '$$\\int_{M}\\omega := \\sum_{\\alpha}\\int_{U_{\\alpha}}\\rho_{\\alpha}\\,\\omega .$$'
      ].join('\n'),
      notes: [
        '**为什么偏偏是 $n$-形式**：换元时 $\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$ 的系数变换是 $\\det$，与积分换元公式里的 $\\det$ 精确匹配（保向时无绝对值）。$k<n$ 的形式要积分，得先选一个 $k$ 维子流形把它拉回去 —— 那就是「形式在子流形上的积分」。',
        '**定向不可省**：把 $\\psi$ 换成反向的，$\\det$ 变号、积分变号。无定向时能积的只有**密度** $\\lvert\\omega\\rvert$ —— 面积元 $\\mathrm{d}A$ 就是密度（`def.area-element`）。',
        '**与面积元的接口**：曲面上 $\\mathrm{d}A = \\sqrt{\\det g}\\,\\mathrm{d}u\\wedge\\mathrm{d}v$，在定向曲面上积分就是面积。这里 $\\sqrt{\\det g}$ 是「密度」侧的因子、$\\mathrm{d}u\\wedge\\mathrm{d}v$ 是「形式」侧的定向，两者都写对符号才不会错。',
        '**单位分解为什么够用**：$\\omega$ 紧支，只有有限多个 $\\rho_{\\alpha}\\omega$ 非零，每个支在保向卡里，于是化到 $\\mathbb{R}^{n}$ 的情形。没有紧支时用「绝对可积」代替，本图不展开。',
        '⚠️ 记号：$\\int_{M}\\omega$ 只依赖 $\\omega$ 与定向，不依赖图册与单位分解（两种不同选取的差可以逐项抵消）。这一点是 Stokes 定理能否写下来的前提。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「微分形式的积分」· 定向与积分',
        'do Carmo, Differential Forms and Applications, 第 2 章「线积分」· 形式的积分与换元'
      ]
    },

    {
      id: 'thm.stokes',
      cluster: 'diffgeom.intrinsic',
      type: 'theorem',
      label: 'Stokes 定理',
      title: 'Stokes 定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Stokes 定理', '边界', '定向'],
      statement: [
        '**在做什么**：把微积分基本定理升到任意维 —— 边界上的积分等于内部外微分的积分，一个公式吃掉 Green、Gauss–Ostrogradsky 与 Kelvin–Stokes。',
        '',
        '设 $M$ 是 $n$ 维**紧致、定向、带边**的光滑流形，$\\omega$ 是 $M$ 上的 $(n-1)$-形式（连续到边界即可）。则',
        '',
        '$$\\int_{M}\\mathrm{d}\\omega = \\int_{\\partial M}\\omega ,$$',
        '',
        '其中 $\\partial M$ 取**诱导定向**（先取外法向、再取 $M$ 的定向），$\\partial M$ 允许为空（此时右边为零）。'
      ].join('\n'),
      notes: [
        '**证明路线**：用单位分解化到半空间 $\\mathbb{H}^{n} = \\{x^{n}\\le 0\\}$ 里的方块；把 $\\omega$ 写成 $\\sum_{i}(-1)^{i-1}f_{i}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\widehat{\\mathrm{d}x^{i}}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$（带帽表示略去该因子），于是 $\\mathrm{d}\\omega = \\sum_{i}\\partial_{i}f_{i}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$。对 $i<n$ 的分量在对应坐标方向有紧支、积分为零；只剩 $i = n$ 的分量，用一元微积分基本定理积出 $f_{n}(x^{1},\\ldots,x^{n-1},0)$ —— 那正是 $\\omega$ 在边界上的积分。',
        '**特例清单**：$n = 1$ 是微积分基本定理；$n = 2$ 是 Green 公式；$n = 3$ 的两种样子分别是 Gauss–Ostrogradsky（通量）与 Kelvin–Stokes（环量）。它们不是四条定理，是同一条。',
        '**与 Gauss–Bonnet 的关系**：曲面上 $K\\,\\mathrm{d}A = \\mathrm{d}\\omega^{1}_{\\ 2}$（Gauss 方程，`thm.gauss-equation`），于是 Gauss–Bonnet 的整体形式可以看成 Stokes 加上边界项 $\\int k_{g}\\,\\mathrm{d}s$ —— 两条定理在这一层同源。',
        '⚠️ **边界定向最容易错**：约定是「外法向在前」，即 $\\partial M$ 的定向由「外法向 $\\wedge$ $M$ 的定向」给出。符号错了整条公式就差一个负号，而所有特例都会「看起来对」。',
        '**为什么需要定向**：两边都依赖定向，且同时变号，所以等式与定向的选取无关；但没有定向就写不出「积分」这件事（`def.integral-form`）。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「微分形式的积分」· Stokes 定理',
        'do Carmo, Differential Forms and Applications, 第 3 章「联络形式」· Stokes 定理与结构方程'
      ]
    }

  ],

  edges: [

    /* ============================================================
       定义引用（蓝线）：先接「已有的基础节点」—— 这是用户点名要的接线，
       否则微分几何在图上就是一座孤岛。
       ============================================================ */

    {
      id: 'dep.tu-derivative-curve',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'def.regular-curve',
      note: '曲线的速度 $\\gamma\'$ 是三个分量的一元导数；「速度处处不为零」这句话用的就是一元导数。'
    },
    {
      id: 'dep.tu-inner-arclength',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.arc-length',
      note: '弧长的被积函数 $\\lVert\\gamma\'\\rVert = \\sqrt{\\langle\\gamma\',\\gamma\'\\rangle}$ 就是 $\\mathbb{R}^{3}$ 的内积给出的范数。'
    },
    {
      id: 'dep.tu-curve-arclength',
      kind: 'definition',
      definition: 'def.regular-curve',
      usedBy: 'def.arc-length',
      note: '弧长函数要靠正则性：$\\lVert\\gamma\'\\rVert>0$ 才使 $s(t)$ 严格递增、可反解出弧长参数。'
    },
    {
      id: 'dep.tu-curve-frenet',
      kind: 'definition',
      definition: 'def.regular-curve',
      usedBy: 'def.frenet-frame',
      note: 'Frenet 标架的三个向量都是 $\\gamma\',\\gamma\'\'$ 的组合；$T$ 是单位切向量，$\\kappa,\\tau$ 是它的一、二阶导数的读数。'
    },
    {
      id: 'dep.tu-arclength-frenet',
      kind: 'definition',
      definition: 'def.arc-length',
      usedBy: 'thm.frenet-serret',
      note: '公式是**对弧长**求导写的；换成任意参数会多出 $\\lVert\\gamma\'\\rVert$ 的因子，形式就不再是反称矩阵。'
    },
    {
      id: 'dep.tu-exterior-form',
      kind: 'definition',
      definition: 'def.exterior-algebra',
      usedBy: 'def.differential-form',
      note: '每点 $\\omega_{p}\\in\\bigwedge^{k}(\\mathbb{R}^{n})^{\\ast}$；楔积、分次交换性、$\\binom{n}{k}$ 维这些事全部来自外代数。'
    },
    {
      id: 'dep.tu-altform-form',
      kind: 'definition',
      definition: 'def.alternating-form',
      usedBy: 'def.differential-form',
      note: '「交错」是形式与一般多重线性型的分界：两个变元相等则取零，于是分量从 $n^{k}$ 掉到 $\\binom{n}{k}$。'
    },
    {
      id: 'dep.tu-form-exterior-d',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'def.exterior-derivative',
      note: '$\\mathrm{d}$ 的定义就是「对系数取全微分、再与 $\\mathrm{d}x^{I}$ 楔起来」；没有形式的次数，$\\mathrm{d}$ 无从定义。'
    },
    {
      id: 'dep.tu-form-pullback',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'prop.pullback-forms',
      note: '拉回逐点作用在「交错 $k$ 线性型」上，所以它保次数、保楔积 —— 主语就是微分形式。'
    },
    {
      id: 'dep.tu-d-pullback',
      kind: 'definition',
      definition: 'def.exterior-derivative',
      usedBy: 'prop.pullback-forms',
      note: '性质 $F^{\\ast}\\mathrm{d} = \\mathrm{d}F^{\\ast}$ 把外微分与拉回绑在一起，是「$\\mathrm{d}$ 与坐标无关」的正式说法。'
    },
    {
      id: 'dep.tu-I-area',
      kind: 'definition',
      definition: 'def.first-fundamental-form',
      usedBy: 'def.area-element',
      note: '$\\mathrm{d}A = \\sqrt{\\det(g_{ij})}$ 里的 $g_{ij}$ 就是 $I$ 的系数矩阵；正交余标架下 $\\mathrm{d}A = \\omega^{1}\\wedge\\omega^{2}$。'
    },
    {
      id: 'dep.tu-det-area',
      kind: 'definition',
      definition: 'def.determinant',
      usedBy: 'def.area-element',
      note: '面积是 Gram 行列式的平方根：二维时它就是两个切向量张成的平行四边形的（有向）面积因子。'
    },
    {
      id: 'dep.tu-surface-orient',
      kind: 'definition',
      definition: 'def.regular-surface',
      usedBy: 'def.orientable-surface',
      note: '单张参数化的像是「曲面」的特例；定向只有在多张卡拼成的曲面上才是真问题。'
    },
    {
      id: 'dep.tu-area-orient',
      kind: 'definition',
      definition: 'def.area-element',
      usedBy: 'def.orientable-surface',
      note: '「面积形式 $\\omega^{1}\\wedge\\omega^{2}$ 能整体选取而不换号」是可定向的等价刻画；两个定向差一个符号。'
    },
    {
      id: 'dep.tu-area-bonnet',
      kind: 'definition',
      definition: 'def.area-element',
      usedBy: 'thm.gauss-bonnet',
      note: 'Gauss–Bonnet 里的 $\\int_{M}K\\,\\mathrm{d}A$ 用的就是这个测度：面积元。'
    },
    {
      id: 'dep.tu-orient-bonnet',
      kind: 'definition',
      definition: 'def.orientable-surface',
      usedBy: 'thm.gauss-bonnet',
      note: '定理要求可定向：否则面积元与测地曲率的符号说不清，公式只能取绝对值或模 $2$。'
    },
    {
      id: 'dep.tu-topology-manifold',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.smooth-manifold',
      note: '流形首先是**拓扑空间**：图卡的定义里 $U$ 必须是开集，$\\varphi$ 必须是同胚。'
    },
    {
      id: 'dep.tu-hausdorff-manifold',
      kind: 'definition',
      definition: 'def.hausdorff',
      usedBy: 'def.smooth-manifold',
      note: 'Hausdorff 是两条技术假设之一：保证极限唯一（否则「$\\gamma\'(0)$」没有意义）。'
    },
    {
      id: 'dep.tu-secondcountable-manifold',
      kind: 'definition',
      definition: 'def.second-countable',
      usedBy: 'def.smooth-manifold',
      note: '另一条技术假设：第二可数给出仿紧与单位分解，才能把局部度量、局部形式拼成整体的。'
    },
    {
      id: 'dep.tu-homeo-manifold',
      kind: 'definition',
      definition: 'def.homeomorphism',
      usedBy: 'def.smooth-manifold',
      note: '图卡就是「开集到 $\\mathbb{R}^{n}$ 开集的同胚」；光滑结构是加在同胚之上的额外要求。'
    },
    {
      id: 'dep.tu-manifold-tangent',
      kind: 'definition',
      definition: 'def.smooth-manifold',
      usedBy: 'def.tangent-space-manifold',
      note: '切向量的定义要用图卡；「相切」与卡无关这件事正是转移映射的链式法则。'
    },
    {
      id: 'dep.tu-partial-tangent',
      kind: 'definition',
      definition: 'def.partial-derivative',
      usedBy: 'def.tangent-space-manifold',
      note: '坐标基 $\\partial_{i}(p)$ 就是「只让第 $i$ 个坐标动」的方向 —— 在卡里它就是偏导数。'
    },
    {
      id: 'dep.tu-ift-level',
      kind: 'definition',
      definition: 'thm.implicit-function',
      usedBy: 'thm.regular-level-set',
      note: '水平集局部是图，靠的就是隐函数定理逐点应用；满秩条件正是 $D_yF$ 可逆的假设。'
    },
    {
      id: 'dep.tu-manifold-level',
      kind: 'definition',
      definition: 'def.smooth-manifold',
      usedBy: 'thm.regular-level-set',
      note: '定理的结论是「$M$ 是光滑流形」，所以要把造出来的图卡与相容性写清楚。'
    },
    {
      id: 'dep.tu-inner-riemannian',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.riemannian-metric',
      note: '黎曼度量就是「每点一个内积」，对称、双线性、正定三条字面照搬。'
    },
    {
      id: 'dep.tu-tangent-riemannian',
      kind: 'definition',
      definition: 'def.tangent-space-manifold',
      usedBy: 'def.riemannian-metric',
      note: '内积住在 $T_{p}M$ 上，所以必须先有切空间；「光滑变化」是对向量场说的。'
    },
    {
      id: 'dep.tu-tangent-connection',
      kind: 'definition',
      definition: 'def.tangent-space-manifold',
      usedBy: 'def.affine-connection',
      note: '协变导数作用在向量场上，而向量场逐点取值于 $TM$ —— 联络是在 $TM$ 上做微分的规则。'
    },
    {
      id: 'dep.tu-connection-curvature',
      kind: 'definition',
      definition: 'def.affine-connection',
      usedBy: 'def.curvature-tensor',
      note: '曲率算子是联络的交换子 $[\\nabla_{X},\\nabla_{Y}]-\\nabla_{[X,Y]}$；$\\Gamma$ 与 $\\omega$ 都只是它的坐标表达。'
    },
    {
      id: 'dep.tu-curv-symmetries',
      kind: 'definition',
      definition: 'def.curvature-tensor',
      usedBy: 'prop.curvature-tensor-symmetries',
      note: '对称性是曲率张量的性质，主语就是它；本节点补的是证明与独立分量计数。'
    },
    {
      id: 'dep.tu-curv-bianchi',
      kind: 'definition',
      definition: 'def.curvature-tensor',
      usedBy: 'thm.bianchi-identity',
      note: '两条比安基都是曲率张量必须满足的恒等式；缩并版还要用到 Ricci 与数量曲率。'
    },
    {
      id: 'dep.tu-sym-bianchi',
      kind: 'definition',
      definition: 'prop.curvature-tensor-symmetries',
      usedBy: 'thm.bianchi-identity',
      note: '缩并那一步要用「两对指标可交换」把指标搬正 —— 那是这个命题的第 3 条。'
    },
    {
      id: 'dep.tu-riemannian-sectional',
      kind: 'definition',
      definition: 'def.riemannian-metric',
      usedBy: 'def.sectional-curvature',
      note: '截面曲率的分子分母都用 $g$ 的内积；没有度量就没有「单位正交基」，也谈不上二维截面的面积。'
    },
    {
      id: 'dep.tu-curv-sectional',
      kind: 'definition',
      definition: 'def.curvature-tensor',
      usedBy: 'def.sectional-curvature',
      note: '截面曲率是曲率张量的一个二次读数：同一个 $R$、同一个二维截面，取一个数。'
    },
    {
      id: 'dep.tu-trace-ricci',
      kind: 'definition',
      definition: 'def.trace',
      usedBy: 'def.ricci-curvature',
      note: 'Ricci 是「$Z\\mapsto R(Z,X)Y$」的迹，数量曲率是 Ricci 相对 $g$ 的迹 —— 两次取迹，取法与基无关。'
    },
    {
      id: 'dep.tu-curv-ricci',
      kind: 'definition',
      definition: 'def.curvature-tensor',
      usedBy: 'def.ricci-curvature',
      note: '缩并的对象是曲率张量的分量：$R_{ij} = R^{k}_{\\ kij}$ 就是把一上一下两个指标缩掉。'
    },
    {
      id: 'dep.tu-ricci-bianchi',
      kind: 'definition',
      definition: 'def.ricci-curvature',
      usedBy: 'thm.bianchi-identity',
      note: '缩并形式 $\\nabla^{i}G_{ij} = 0$ 里的 $R_{ij}$ 与 $S$ 就是 Ricci 与数量曲率。'
    },
    {
      id: 'dep.tu-orient-integral',
      kind: 'definition',
      definition: 'def.orientable-surface',
      usedBy: 'def.integral-form',
      note: '最高次形式要在**定向**流形上积分；反向的图册会让积分变号。'
    },
    {
      id: 'dep.tu-form-integral',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'def.integral-form',
      note: '被积对象是最高次形式；积分的定义逐字用到「$k$-形式 = 交错型 + 光滑系数」。'
    },
    {
      id: 'dep.tu-integral-stokes',
      kind: 'definition',
      definition: 'def.integral-form',
      usedBy: 'thm.stokes',
      note: '定理两边都是「形式的积分」；没有 $\\int_{M}\\omega$ 的定义就写不出这条等式。'
    },
    {
      id: 'dep.tu-orient-stokes',
      kind: 'definition',
      definition: 'def.orientable-surface',
      usedBy: 'thm.stokes',
      note: '边界定向由「外法向 + $M$ 的定向」给出，而「外法向」的存在性正是可定向。'
    },
    {
      id: 'dep.tu-d-stokes',
      kind: 'definition',
      definition: 'def.exterior-derivative',
      usedBy: 'thm.stokes',
      note: '定理左边是 $\\mathrm{d}\\omega$；没有外微分，Stokes 定理就无从陈述。'
    },

    /* ============================================================
       推导（黑线，证明写在边上）
       ============================================================ */

    {
      id: 'imp.tu-arclength',
      kind: 'implication',
      sources: ['def.regular-curve'],
      target: 'def.arc-length',
      title: '正则性 $\\implies$ 弧长参数化存在且单位速',
      proof: [
        '设 $\\gamma : [a,b]\\to\\mathbb{R}^{3}$ 正则且 $C^{1}$，$s(t) := \\int_{a}^{t}\\lVert\\gamma\'(u)\\rVert\\,\\mathrm{d}u$。被积函数连续且处处 $>0$，故 $s$ 严格递增、$C^{1}$，且',
        '',
        '$$s\'(t) = \\lVert\\gamma\'(t)\\rVert > 0 .$$',
        '',
        '于是 $s$ 有 $C^{1}$ 的反函数 $h := s^{-1} : [0,L]\\to[a,b]$，满足 $h\'(s) = 1/\\lVert\\gamma\'(h(s))\\rVert$。令 $\\tilde\\gamma := \\gamma\\circ h$，则',
        '',
        '$$\\tilde\\gamma\'(s) = \\gamma\'(h(s))\\,h\'(s),\\qquad \\lVert\\tilde\\gamma\'(s)\\rVert = \\lVert\\gamma\'(h(s))\\rVert\\cdot\\frac{1}{\\lVert\\gamma\'(h(s))\\rVert} = 1 ,$$',
        '',
        '所以 $\\tilde\\gamma$ 是弧长参数化。**长度不变**：换元 $t = h(s)$ 给出 $\\int_{a}^{b}\\lVert\\gamma\'(t)\\rVert\\,\\mathrm{d}t = \\int_{0}^{L}\\lVert\\tilde\\gamma\'(s)\\rVert\\,\\mathrm{d}s = L$。∎',
        '',
        '⭐ 反过来，弧长参数在差一个常数与定向的意义下唯一：若 $s_{1},s_{2}$ 都是弧长参数，则 $\\mathrm{d}s_{2}/\\mathrm{d}s_{1} = \\pm 1$。'
      ].join('\n')
    },

    {
      id: 'imp.tu-frenet',
      kind: 'implication',
      sources: ['def.frenet-frame', 'def.arc-length'],
      target: 'thm.frenet-serret',
      title: '单位正交 $\\implies$ Frenet–Serret 公式',
      proof: [
        '全程弧长参数，$\\langle T,T\\rangle = \\langle N,N\\rangle = \\langle B,B\\rangle = 1$，两两正交。',
        '',
        '**(1) $T\' = \\kappa N$。** 由 $\\langle T,T\\rangle = 1$ 得 $\\langle T\',T\\rangle = 0$，即 $T\'\\perp T$；而 $N$ 的定义就是 $T\'$ 的方向（$N := T\'/\\kappa$，$\\kappa = \\lVert T\'\\rVert$），故 $T\' = \\lVert T\'\\rVert N = \\kappa N$。',
        '',
        '**(2) $B\' = -\\tau N$。** $\\langle B,B\\rangle = 1$ 给 $B\'\\perp B$；又 $\\langle B,T\\rangle = 0$ 给',
        '',
        '$$0 = \\langle B\',T\\rangle+\\langle B,T\'\\rangle = \\langle B\',T\\rangle+\\kappa\\langle B,N\\rangle = \\langle B\',T\\rangle ,$$',
        '',
        '故 $B\'$ 与 $T$ 也正交。三维里同时垂直于 $T$ 与 $B$ 的方向只有 $\\pm N$，于是 $B\' = \\langle B\',N\\rangle N = -\\tau N$，最后一步是 $\\tau$ 的定义。',
        '',
        '**(3) $N\' = -\\kappa T+\\tau B$。** $\\langle N,N\\rangle = 1$ 给 $N\'\\perp N$，所以 $N\'$ 落在 $\\{T,B\\}$ 张成的平面里，只需两个系数：',
        '',
        '$$\\langle N\',T\\rangle = -\\langle N,T\'\\rangle = -\\kappa\\langle N,N\\rangle = -\\kappa ,\\qquad \\langle N\',B\\rangle = -\\langle N,B\'\\rangle = \\tau\\langle N,N\\rangle = \\tau .$$',
        '',
        '于是 $N\' = -\\kappa T+\\tau B$。∎',
        '',
        '⭐ 三条的证明只用了「标架单位正交」这一件事 —— 与曲面情形 $e_{i}$ 的反称性证明（`imp.dg-antisym`）是同一段计算。'
      ].join('\n')
    },

    {
      id: 'imp.tu-curve-fundamental',
      kind: 'implication',
      sources: ['thm.frenet-serret'],
      target: 'thm.curve-fundamental-theorem',
      title: 'Frenet 方程是线性 ODE $\\implies$ 曲线基本定理',
      proof: [
        '**存在性。** 把 Frenet 公式写成矩阵方程',
        '',
        '$$X\'(s) = A(s)\\,X(s),\\qquad X = \\begin{pmatrix} T \\\\ N \\\\ B \\end{pmatrix},\\qquad A(s) = \\begin{pmatrix} 0 & \\kappa & 0 \\\\ -\\kappa & 0 & \\tau \\\\ 0 & -\\tau & 0 \\end{pmatrix}.$$',
        '',
        '$A$ 连续，故这是系数连续的**线性** ODE 组：给定 $s_{0}$ 与初值 $X(s_{0})$，它在整个区间 $I$ 上有唯一 $C^{1}$ 解。',
        '',
        '**解始终是正交标架。** $A$ 反称，于是对任意两个解 $u,v$ 有 $\\frac{\\mathrm{d}}{\\mathrm{d}s}\\langle u,v\\rangle = \\langle Au,v\\rangle+\\langle u,Av\\rangle = 0$。初值取标准正交，则解处处标准正交；初值取 $\\det X(s_{0}) = +1$，则因行列式连续且只能取 $\\pm 1$，解落在 $\\mathrm{SO}(3)$ 里。',
        '',
        '**造曲线。** 取解的第一行 $T$，令 $\\gamma(s) := \\gamma(s_{0})+\\int_{s_{0}}^{s}T(u)\\,\\mathrm{d}u$。则 $\\gamma\' = T$ 是单位向量，故 $\\gamma$ 弧长参数化；由构造 $\\gamma\'\' = T\' = \\kappa N$，于是曲率是 $\\kappa$、主法向是 $N$、副法向是 $T\\times N = B$、挠率是 $\\tau$。',
        '',
        '**唯一性。** 设 $\\gamma_{1},\\gamma_{2}$ 给出相同的 $(\\kappa,\\tau)$，对应标架 $X_{1},X_{2}$。取唯一的刚体运动 $g$ 使 $g_{\\ast}\\bigl(X_{2}(s_{0})\\bigr) = X_{1}(s_{0})$ 且 $g\\bigl(\\gamma_{2}(s_{0})\\bigr) = \\gamma_{1}(s_{0})$。则 $g\\circ\\gamma_{2}$ 与 $\\gamma_{1}$ 满足同一个 ODE、有相同初值，由解的唯一性两者标架相等，从而曲线相等。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-pullback-wedge',
      kind: 'implication',
      sources: ['def.differential-form'],
      target: 'prop.pullback-forms',
      title: '逐点交错型 $\\implies$ 拉回保楔积',
      proof: [
        '两边都对系数函数线性，故只需对单项式 $\\omega = a\\,\\mathrm{d}x^{I}$、$\\eta = b\\,\\mathrm{d}x^{J}$ 验证，并记 $F = (F^{1},\\ldots,F^{n})$。',
        '',
        '先看 $1$-形式：$(F^{\\ast}\\mathrm{d}x^{i})_{p}(v) = \\mathrm{d}x^{i}\\bigl(\\mathrm{d}F_{p}(v)\\bigr) = \\mathrm{d}F^{i}_{p}(v)$，即',
        '',
        '$$F^{\\ast}\\mathrm{d}x^{i} = \\mathrm{d}F^{i} = \\sum_{j}\\frac{\\partial F^{i}}{\\partial x^{j}}\\ \\mathrm{d}x^{j}.$$',
        '',
        '**保楔积。** 每点的 $\\wedge$ 就是「张量积再交错化」，而交错化只置换变元、线性映射的拉回 $L^{\\ast}$ 逐变元作用，两者交换；于是对线性映射 $L$ 有 $L^{\\ast}(\\alpha\\wedge\\beta) = L^{\\ast}\\alpha\\wedge L^{\\ast}\\beta$。取 $L = \\mathrm{d}F_{p}$ 并逐点拼接，再用 $F^{\\ast}a = a\\circ F$ 得',
        '',
        '$$F^{\\ast}\\bigl(a\\,\\mathrm{d}x^{I}\\wedge b\\,\\mathrm{d}x^{J}\\bigr) = (a\\circ F)(b\\circ F)\\,\\mathrm{d}F^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}F^{j_{k}} = (F^{\\ast}\\omega)\\wedge(F^{\\ast}\\eta).$$',
        '',
        '**线性与复合**是定义的直接读法：$F^{\\ast}$ 逐点就是 $(\\mathrm{d}F_{p})^{\\ast}$，而 $\\mathrm{d}(G\\circ F)_{p} = \\mathrm{d}G_{F(p)}\\circ\\mathrm{d}F_{p}$ 给出 $(G\\circ F)^{\\ast} = F^{\\ast}\\circ G^{\\ast}$。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-pullback-d',
      kind: 'implication',
      sources: ['def.exterior-derivative'],
      target: 'prop.pullback-forms',
      title: '链式法则 $+$ $\\mathrm{d}^{2}=0$ $\\implies$ $F^{\\ast}$ 与 $\\mathrm{d}$ 交换',
      proof: [
        '只需验证 $\\omega = f\\,\\mathrm{d}x^{I}$，再用线性拼起来。由已证的保楔积与 $F^{\\ast}f = f\\circ F$：',
        '',
        '$$F^{\\ast}(\\mathrm{d}\\omega) = F^{\\ast}\\Bigl(\\sum_{j}\\partial_{j}f\\ \\mathrm{d}x^{j}\\wedge\\mathrm{d}x^{I}\\Bigr) = \\sum_{j}(\\partial_{j}f\\circ F)\\ \\mathrm{d}F^{j}\\wedge\\mathrm{d}F^{I}.$$',
        '',
        '另一方面',
        '',
        '$$\\mathrm{d}(F^{\\ast}\\omega) = \\mathrm{d}\\bigl((f\\circ F)\\,\\mathrm{d}F^{I}\\bigr) = \\mathrm{d}(f\\circ F)\\wedge\\mathrm{d}F^{I}+(f\\circ F)\\,\\mathrm{d}\\bigl(\\mathrm{d}F^{I}\\bigr).$$',
        '',
        '第二项为零：每个 $\\mathrm{d}F^{j}$ 都是恰当形式（$\\mathrm{d}F^{j} = \\mathrm{d}(F^{j})$），而 $\\mathrm{d}^{2} = 0$，故 $\\mathrm{d}(\\mathrm{d}F^{I}) = 0$。第一项用链式法则',
        '',
        '$$\\mathrm{d}(f\\circ F) = \\sum_{j}(\\partial_{j}f\\circ F)\\,\\mathrm{d}F^{j} ,$$',
        '',
        '代回即与上式相同（注意 $\\mathrm{d}F^{I} = \\mathrm{d}F^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}F^{i_{k}}$ 与 $F^{\\ast}\\mathrm{d}x^{I}$ 是同一个东西）。∎',
        '',
        '⭐ 唯一的实质内容是**链式法则 + $\\mathrm{d}^{2}=0$** 这两条；所有「$\\mathrm{d}$ 与坐标无关」的说法最终都归结到这里。'
      ].join('\n')
    },

    {
      id: 'imp.tu-level-set',
      kind: 'implication',
      sources: ['thm.implicit-function', 'def.smooth-manifold'],
      target: 'thm.regular-level-set',
      title: '隐函数定理 $\\implies$ 正则水平集是流形',
      proof: [
        '**逐点造卡。** 取 $p\\in M = F^{-1}(c)$。$\\mathrm{d}F_{p}$ 满射给出秩 $m$，故有 $m$ 个坐标（重排后记 $y = (x^{n-m+1},\\ldots,x^{n})$）使 $m\\times m$ 矩阵 $\\partial F/\\partial y(p)$ 可逆。隐函数定理给出 $p$ 的邻域里',
        '',
        '$$M = \\{(x,g(x)) : x\\in W\\},\\qquad g\\in C^{\\infty}(W),$$',
        '',
        '其中 $W\\subseteq\\mathbb{R}^{n-m}$ 是含 $x_{0}$ 的开集、$g(x_{0}) = y_{0}$。于是 $\\varphi\\bigl(x,g(x)\\bigr) := x$ 把 $M$ 的这一块同胚地送到 $W$，这就是一张 $n-m$ 维图卡。',
        '',
        '**相容性。** 这类卡取可数多张（第二可数空间里每点取一个邻域即可）。两张卡重叠处的转移映射是 $x\\mapsto \\psi\\bigl(x,g_{\\alpha}(x)\\bigr)$，它是光滑映射 $x\\mapsto (x,g_{\\alpha}(x))$ 与光滑映射 $\\psi$ 的复合，故 $C^{\\infty}$。于是这些卡构成图册，$M$ 是 $n-m$ 维光滑流形。',
        '',
        '**切空间。** 若 $\\gamma$ 是 $M$ 里的曲线，则 $F\\circ\\gamma\\equiv c$，求导得 $\\mathrm{d}F_{p}\\bigl(\\gamma\'(0)\\bigr) = 0$，故 $T_{p}M\\subseteq\\ker\\mathrm{d}F_{p}$。反过来，上面的卡给出 $\\dim T_{p}M = n-m$，而秩定理给出 $\\dim\\ker\\mathrm{d}F_{p} = n-m$，故两者相等。∎',
        '',
        '⭐ 这条的每一块都是已有的东西：隐函数定理出图，图出卡，卡出流形，求导出切空间。'
      ].join('\n')
    },

    {
      id: 'imp.tu-tangent-space',
      kind: 'implication',
      sources: ['def.smooth-manifold', 'def.partial-derivative'],
      target: 'def.tangent-space-manifold',
      title: '图卡相容 $\\implies$ 切向量与卡无关，并给出坐标基',
      proof: [
        '**(a) 良定义。** 设 $\\gamma_{1},\\gamma_{2}$ 在卡 $(U,\\varphi)$ 里速度相同。对另一张卡 $(V,\\psi)$，链式法则给出',
        '',
        '$$(\\psi\\circ\\gamma_{i})\'(0) = \\mathrm{d}(\\psi\\circ\\varphi^{-1})_{\\varphi(p)}\\bigl((\\varphi\\circ\\gamma_{i})\'(0)\\bigr),$$',
        '',
        '同一个线性映射作用在同一个向量上，故两者仍相同。于是「相切」与卡无关，$T_{p}M$ 有定义。',
        '',
        '**(b) 坐标基。** 取 $\\gamma_{i}(t) := \\varphi^{-1}\\bigl(\\varphi(p)+t\\,e_{i}\\bigr)$，则 $(\\varphi\\circ\\gamma_{i})\'(0) = e_{i}$，故 $\\partial_{i}(p)$ 是 $n$ 个互不相同的切向量。在卡里「相切」等价于「$\\mathbb{R}^{n}$ 中速度相同」，而 $e_{1},\\ldots,e_{n}$ 线性无关，故 $\\{\\partial_{i}(p)\\}$ 线性无关，$\\dim T_{p}M = n$。',
        '',
        '**(c) 曲线类与导子一一对应。** 给定 $v = [\\gamma]$，令 $D_{v}f := (f\\circ\\gamma)\'(0)$；Leibniz 律来自乘积求导。反之设 $D$ 是导子，在卡里把 $f$ 写成',
        '',
        '$$f = f(p)+\\sum_{i}\\bigl(x^{i}-x^{i}(p)\\bigr)h_{i},\\qquad h_{i}(p) = \\partial_{i}f(p),$$',
        '',
        '由 Leibniz 律 $D\\bigl((x^{i}-x^{i}(p))h_{i}\\bigr) = D(x^{i})\\,h_{i}(p)+0\\cdot D(h_{i})$，故 $Df = \\sum_{i}D(x^{i})\\,\\partial_{i}f(p)$ —— 即 $D$ 就是坐标速度为 $\\bigl(D(x^{1}),\\ldots,D(x^{n})\\bigr)$ 的那条曲线的方向导数。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-surface-riemannian',
      kind: 'implication',
      sources: ['def.first-fundamental-form', 'def.regular-surface'],
      target: 'def.riemannian-metric',
      title: '第一基本形式就是一个黎曼度量',
      proof: [
        '对 $p\\in S$ 令 $g_{p}(v,w) := \\langle\\mathrm{d}r_{p}(v),\\mathrm{d}r_{p}(w)\\rangle$，$v,w\\in T_{p}S$。三条公理逐个验证：',
        '',
        ['- **双线性**：内积双线性，$\\mathrm{d}r_{p}$ 线性；',
         '- **对称**：$\\mathbb{R}^{3}$ 的内积对称；',
         '- **正定**：$\\langle v,v\\rangle\\ge 0$，等号成立时 $\\mathrm{d}r_{p}(v) = 0$，而 $\\mathrm{d}r_{p}$ 单射（$r_{u}\\times r_{v}\\ne 0$ 保证 $r_{u},r_{v}$ 线性无关），故 $v = 0$。'].join('\n'),
        '',
        '**光滑性**：在一张卡里 $g_{ij} = \\langle\\partial_{i}r,\\partial_{j}r\\rangle$ 是 $r$ 的一阶偏导数的内积，$r$ 光滑则 $g_{ij}$ 光滑。',
        '',
        '于是 $(S,g)$ 是二维黎曼流形，而 $g$ 就是 `def.first-fundamental-form` 里的 $I$。反过来，任何二维黎曼流形在局部取卡，$(g_{ij})$ 就写成同样的形状 —— 两侧只是同一套记账的两种叫法。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-surface-connection',
      kind: 'implication',
      sources: ['def.connection-form', 'def.moving-frame'],
      target: 'def.affine-connection',
      title: '标架联络 $\\implies$ 曲面上有一个仿射联络',
      proof: [
        '设 $S\\subseteq\\mathbb{R}^{3}$ 是正则曲面，$\\bar\\nabla$ 是 $\\mathbb{R}^{3}$ 的平坦联络（$\\bar\\nabla_{X}Y = \\mathrm{d}Y(X)$，把 $Y$ 当成 $\\mathbb{R}^{3}$-值函数）。对切向量场定义（上标 $\\top$ 表示投影到切平面）',
        '',
        '$$\\nabla_{X}Y := \\bigl(\\bar\\nabla_{X}Y\\bigr)^{\\top}.$$',
        '',
        '三条公理逐条验证：',
        '',
        ['- **对 $X$ 的 $C^{\\infty}(S)$-线性**：来自 $\\bar\\nabla$ 的对应性质与投影的线性；',
         '- **对 $Y$ 的 $\\mathbb{R}$-线性**：同上；',
         '- **Leibniz 律**：$\\bar\\nabla_{X}(fY) = (Xf)Y+f\\bar\\nabla_{X}Y$，而 $(Xf)Y$ 已经切向，投影后等式不变。'].join('\n'),
        '',
        '**无挠**：$\\nabla_{X}Y-\\nabla_{Y}X = \\bigl([X,Y]\\bigr)^{\\top} = [X,Y]$（$[X,Y]$ 本来就切于 $S$）。**保度量**：$\\langle\\cdot,\\cdot\\rangle$ 是 $\\mathbb{R}^{3}$ 的常度量、$\\bar\\nabla$ 保它，而投影不改变两个切向量的内积。所以 $\\nabla$ 是 $S$ 上的 Levi-Civita 联络。',
        '',
        '**与联络形式的关系**：取单位正交标架 $(e_{1},e_{2})$，则 $\\bar\\nabla_{X}e_{j} = \\mathrm{d}e_{j}(X)$，于是',
        '',
        '$$\\nabla_{X}e_{j} = \\bigl(\\mathrm{d}e_{j}(X)\\bigr)^{\\top} = \\sum_{k=1}^{2}\\omega^{k}_{\\ j}(X)\\,e_{k},\\qquad \\omega^{k}_{\\ j}(X) = \\langle \\mathrm{d}e_{j}(X),e_{k}\\rangle ,$$',
        '',
        '正是 `def.connection-form` 的联络形式（上标记分量、下标记被微分的标架向量）。∎',
        '',
        '⭐ 所以「结构方程」不是新的公理系统，而是**仿射联络 + 正交标架**的坐标写法：第一结构方程 = 无挠，第二结构方程 = 曲率形式。'
      ].join('\n')
    },

    {
      id: 'imp.tu-curvature-symmetries',
      kind: 'implication',
      sources: ['def.curvature-tensor', 'def.affine-connection'],
      target: 'prop.curvature-tensor-symmetries',
      title: '保度量 $+$ 无挠 $\\implies$ 曲率张量的四条对称性',
      proof: [
        '(1) **对 $X,Y$ 反称**：$R(X,Y) = [\\nabla_{X},\\nabla_{Y}]-\\nabla_{[X,Y]}$ 中交换 $X,Y$，每一项都反号。',
        '',
        '(2) **对 $Z,W$ 反称**（用保度量）。先证 $\\langle R(X,Y)Z,Z\\rangle = 0$。由 $\\langle\\nabla_{U}Z,Z\\rangle = \\frac{1}{2}U\\langle Z,Z\\rangle$：',
        '',
        '$$\\langle\\nabla_{X}\\nabla_{Y}Z,Z\\rangle = X\\langle\\nabla_{Y}Z,Z\\rangle-\\langle\\nabla_{Y}Z,\\nabla_{X}Z\\rangle = \\frac{1}{2}XY\\langle Z,Z\\rangle-\\langle\\nabla_{Y}Z,\\nabla_{X}Z\\rangle ,$$',
        '',
        '同理 $\\langle\\nabla_{Y}\\nabla_{X}Z,Z\\rangle = \\frac{1}{2}YX\\langle Z,Z\\rangle-\\langle\\nabla_{X}Z,\\nabla_{Y}Z\\rangle$，而 $\\langle\\nabla_{[X,Y]}Z,Z\\rangle = \\frac{1}{2}[X,Y]\\langle Z,Z\\rangle$。三项相减：二阶项合成 $\\frac{1}{2}\\bigl(XY-YX-[X,Y]\\bigr)\\langle Z,Z\\rangle = 0$，两个内积项相消。再把 $\\langle R(X,Y)(Z+W),Z+W\\rangle = 0$ 展开，即得 $\\langle R(X,Y)Z,W\\rangle = -\\langle R(X,Y)W,Z\\rangle$。',
        '',
        '(3) **第一比安基**（用无挠）。记 $\\nabla^{2}Z(X,Y) := \\nabla_{X}\\nabla_{Y}Z-\\nabla_{\\nabla_{X}Y}Z$。无挠给 $\\nabla_{X}Y-\\nabla_{Y}X = [X,Y]$，于是',
        '',
        '$$\\nabla^{2}Z(X,Y)-\\nabla^{2}Z(Y,X) = \\nabla_{X}\\nabla_{Y}Z-\\nabla_{Y}\\nabla_{X}Z-\\nabla_{[X,Y]}Z = R(X,Y)Z ,$$',
        '',
        '而 $\\nabla^{2}Z$ 关于 $X,Y$ 对称。对三个变元做循环求和时，两个对称项互换位置、逐项抵消，故 $R(X,Y)Z+R(Y,Z)X+R(Z,X)Y = 0$。',
        '',
        '(4) **两对指标可交换**：把 (3) 的三种循环取法写出、用 (1)(2) 把符号搬正再相加，剩下的正是 $R_{ijk\\ell}-R_{k\\ell ij}$（这一条是纯指标记账，不含几何）。',
        '',
        '**计数**：(1)(2) 说明 $R$ 可看成 $\\bigwedge^{2}T_{p}M$ 上的双线性型，(4) 说明它对称，故有 $\\frac{N(N+1)}{2}$ 个分量（$N = \\binom{n}{2}$）；再扣掉 (3) 给出的 $\\binom{n}{3}$ 个独立关系，得 $\\frac{n^{2}(n^{2}-1)}{12}$。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-bianchi',
      kind: 'implication',
      sources: ['def.curvature-tensor', 'prop.curvature-tensor-symmetries'],
      target: 'thm.bianchi-identity',
      title: '法坐标下的三阶偏导抵消 $\\implies$ 第二比安基恒等式',
      proof: [
        '**第二比安基。** 取 $p\\in M$ 处的**法坐标**（指数映射给的坐标，见 `def.exponential-map`）：$\\Gamma^{k}_{ij}(p) = 0$、$\\partial_{i}g_{jk}(p) = 0$，于是 $p$ 处 $\\nabla_{i} = \\partial_{i}$，且由 $R^{\\ell}_{ijk} = \\partial_{i}\\Gamma^{\\ell}_{jk}-\\partial_{j}\\Gamma^{\\ell}_{ik}$ 与 $\\Gamma$ 的公式得',
        '',
        '$$R_{ijk\\ell} = \\frac{1}{2}\\bigl(\\partial_{i}\\partial_{k}g_{j\\ell}-\\partial_{i}\\partial_{\\ell}g_{jk}-\\partial_{j}\\partial_{k}g_{i\\ell}+\\partial_{j}\\partial_{\\ell}g_{ik}\\bigr).$$',
        '',
        '把 $\\nabla_{i}R_{jk\\ell m}+\\nabla_{j}R_{ki\\ell m}+\\nabla_{k}R_{ij\\ell m}$ 在 $p$ 处写成 $g$ 的三阶偏导：三条轮流展开后，每一个三阶偏导 $\\partial\\partial\\partial g$ 恰好出现两次、符号相反，逐项抵消。于是等式在 $p$ 处成立；$p$ 任意且两边都是张量，故恒等式处处成立。',
        '',
        '**缩并形式。** 对第二比安基先用 $g^{i\\ell}$ 缩并一次、再用 $g^{jm}$ 缩并一次，并用 (3)（两对指标可交换）把指标搬正，得',
        '',
        '$$\\nabla^{i}R_{ij}-\\frac{1}{2}\\nabla_{j}S = 0 ,$$',
        '',
        '即 $\\nabla^{i}G_{ij} = 0$，其中 $G_{ij} = R_{ij}-\\frac{1}{2}Sg_{ij}$。（这一步只做指标记账，不逐项抄系数。）',
        '',
        '**第一比安基**已在 `prop.curvature-tensor-symmetries` 里证过（无挠的推论），这里只是把代数版与微分版并列。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-sectional',
      kind: 'implication',
      sources: ['def.curvature-tensor', 'def.riemannian-metric'],
      target: 'def.sectional-curvature',
      title: '反称性 $\\implies$ 截面曲率与基的选取无关',
      proof: [
        '**无关性。** 设 $X\' = aX+bY$、$Y\' = cX+dY$，$\\Delta := ad-bc\\ne0$。由 $R$ 的多重线性与对前两变元的反称性，$R(X\',Y\') = \\Delta\\,R(X,Y)$；再用 $\\langle R(X,Y)X,X\\rangle = \\langle R(X,Y)Y,Y\\rangle = 0$（对后两变元反称）得',
        '',
        '$$\\langle R(X\',Y\')Y\',X\'\\rangle = \\Delta^{2}\\langle R(X,Y)Y,X\\rangle .$$',
        '',
        '分母是 Gram 行列式 $\\langle X\',X\'\\rangle\\langle Y\',Y\'\\rangle-\\langle X\',Y\'\\rangle^{2}$，它同样乘 $\\Delta^{2}$。故比值不变。',
        '',
        '**二维即高斯曲率。** $\\dim M = 2$ 时只有 $\\sigma = T_{p}M$ 一个截面。取 $g$-单位正交基 $e_{1},e_{2}$，分母为 $1$，故',
        '',
        '$$K = \\langle R(e_{1},e_{2})e_{2},e_{1}\\rangle = R_{1221} ,$$',
        '',
        '与 `def.gauss-curvature` 的 $K = R_{1221}/\\det(g_{ij})$ 在正交基下相同。',
        '',
        '**常曲率情形。** 若所有截面曲率都是 $K$，则 $R(X,Y)Z = K\\bigl(\\langle Y,Z\\rangle X-\\langle X,Z\\rangle Y\\bigr)$：两边都是对 $(X,Y)$ 反称、对 $(Z,W)$ 反称的「曲率型」张量，且给出相同的截面曲率；两个曲率型张量若截面曲率处处相同则相等（极化：把 $X$ 换成 $X+Z$ 之类，靠双线性分离交叉项）。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-ricci',
      kind: 'implication',
      sources: ['def.curvature-tensor', 'def.trace'],
      target: 'def.ricci-curvature',
      title: '在正交基上取迹 $\\implies$ 二维 Ricci $= Kg$、数量曲率 $= 2K$',
      proof: [
        '**迹与基无关。** $Z\\mapsto R(Z,X)Y$ 是 $T_{p}M$ 上的线性映射，它的迹在换基时不变（`def.trace` 的相似不变性），故用单位正交基算迹合法。',
        '',
        '**二维的计算。** 取 $g$-单位正交基 $e_{1},e_{2}$，于是 $\\det(g_{ij}) = 1$、$K = R_{1221}$。由定义 $R_{ij} = \\sum_{k}\\langle R(e_{k},e_{i})e_{j},e_{k}\\rangle$，逐项算：',
        '',
        '$$R_{11} = \\langle R(e_{2},e_{1})e_{1},e_{2}\\rangle = R_{2112} = R_{1221} = K ,$$',
        '',
        '（中间两步用两次反称性：$R_{2112} = -R_{1212} = R_{1221}$）。同理 $R_{22} = K$；而 $R_{12} = \\sum_{k}\\langle R(e_{k},e_{1})e_{2},e_{k}\\rangle = 0$，因为 $k = 1$ 时第一对指标相同、$k = 2$ 时后一对指标相同。于是',
        '',
        '$$R_{ij} = K\\,g_{ij},\\qquad S = g^{ij}R_{ij} = 2K .$$',
        '',
        '**球面检验。** 单位球面 $S^{n}$ 的截面曲率恒为 $1$，于是 $\\operatorname{Ric} = (n-1)g$、$S = n(n-1)$，二维时与上面的 $R_{ij} = Kg_{ij}$ 一致。这条检验同时把符号约定钉死。∎'
      ].join('\n')
    },

    {
      id: 'imp.tu-area-orientation',
      kind: 'implication',
      sources: ['def.regular-surface', 'def.area-element'],
      target: 'def.orientable-surface',
      title: '面积形式的整体选取 $\\iff$ 可定向',
      proof: [
        '设 $S$ 被参数化族 $\\{r_{\\alpha}\\}$ 覆盖。每张卡上有单位法向 $n_{\\alpha} = (r_{u}\\times r_{v})/\\lVert r_{u}\\times r_{v}\\rVert$ 与面积形式 $\\omega^{1}_{\\alpha}\\wedge\\omega^{2}_{\\alpha}$。',
        '',
        '**（$\\Longleftarrow$）** 若有整体单位法向 $n$：在每张卡上 $n = \\varepsilon_{\\alpha}n_{\\alpha}$，而 $\\varepsilon_{\\alpha}$ 在连通重叠处连续且只取 $\\pm1$，故为常数。把每张卡的面积形式乘上 $\\varepsilon_{\\alpha}$，就得到一个整体不换号的 $2$-形式，于是参数变换的 Jacobi 行列式处处同号 —— 可定向。',
        '',
        '**（$\\Longrightarrow$）** 若有 Jacobi 行列式恒 $>0$ 的图册：各卡的 $n_{\\alpha}$ 在重叠处相等（Jacobi $>0$ 意味着 $r_{u}\\times r_{v}$ 的定向一致），把它们拼起来就是一个连续的整体单位法向 $n$；等价地，面积形式可以整体选取。∎',
        '',
        '⭐ 所以「可定向」有三种等价说法：整体单位法向、Jacobi 同号的图册、整体不换号的面积形式。它们说的是同一件事，用哪一条取决于手头有什么。'
      ].join('\n')
    },

    {
      id: 'imp.tu-stokes',
      kind: 'implication',
      sources: ['def.integral-form', 'def.exterior-derivative'],
      target: 'thm.stokes',
      title: '一元微积分基本定理 $\\implies$ Stokes 定理',
      proof: [
        '**化到半空间。** 用单位分解把 $\\omega$ 拆成有限个支在保向卡里的形式，每块化到 $\\mathbb{H}^{n} = \\{x^{n}\\le 0\\}$ 中的方块 $Q$ 上，于是只需证 $\\int_{Q}\\mathrm{d}\\omega = \\int_{\\partial Q}\\omega$。',
        '',
        '**写出分量。** 记 $\\widehat{\\mathrm{d}x^{i}}$ 为「略去该因子」，则任意 $(n-1)$-形式可唯一写成',
        '',
        '$$\\omega = \\sum_{i=1}^{n}(-1)^{i-1}f_{i}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\widehat{\\mathrm{d}x^{i}}\\wedge\\cdots\\wedge\\mathrm{d}x^{n},$$',
        '',
        '于是 $\\mathrm{d}\\omega = \\sum_{i}\\partial_{i}f_{i}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$。',
        '',
        '**逐项积分。** 对 $i<n$，$f_{i}$ 在 $x^{i}$ 方向有紧支，由 Fubini 定理与一元微积分基本定理',
        '',
        '$$\\int_{Q}\\partial_{i}f_{i}\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n} = 0 .$$',
        '',
        '只剩 $i = n$：$\\int_{Q}\\partial_{n}f_{n}\\ \\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n} = \\int f_{n}(x^{1},\\ldots,x^{n-1},0)\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n-1}$ —— 而这正是 $\\omega$ 限制到边界 $\\{x^{n} = 0\\}$ 上的积分（诱导定向使两个符号一致）。',
        '',
        '**拼回去。** 各块相加时，内部边界出现两次、方向相反、互相抵消，剩下恰好是 $\\partial M$ 上的积分。∎',
        '',
        '⚠️ 符号全部来自「诱导定向 = 外法向在前」这一条约定；约定改一个字，整条公式就差一个负号。'
      ].join('\n')
    }

  ]
});
