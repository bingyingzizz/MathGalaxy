/* ==========================================================================
   内容包 · 微分几何补洞：流形上的微分形式 / 纤维丛 / 主丛
   --------------------------------------------------------------------------
   6 个节点 / 若干定义引用。补的是一个**真实的缺口**，不是新内容：

   ⛔ 补之前的状况：`def.de-rham-complex`、`def.interior-product`、
      `thm.cartan-formula`、`prop.integral-chain-linear` 四个节点的正文里都写着
      $\\Omega^{k}(M)$（流形上的 k-形式），但那个对象**从来没有被定义过** ——
      `def.differential-form` 的陈述第一句是「设 $U\\subseteq\\mathbb{R}^{n}$ 开」，
      只管到欧氏开集。于是定义链是断的：点进「内乘」看到 $\\omega\\in\\Omega^{k}(M)$，
      顺定义走过去，走到的是一个只在 $\\mathbb{R}^{n}$ 上成立的陈述。

   补的 6 个：
     diffgeom.form
       def.form-on-manifold            流形上的微分形式 $\\Omega^{k}(M)$（内蕴定义）
       prop.exterior-derivative-manifold  外微分在流形上良定（图卡无关性）
       prop.pullback-form-manifold     流形间光滑映射的拉回
     diffgeom.manifold
       def.cotangent-bundle            余切丛 $T^{\\ast}M$
       def.fiber-bundle                纤维丛（把「向量空间纤维」放宽成任意流形）
       def.principal-bundle            主丛（纤维就是结构群本身）

   ⚠️ 参考书政策（沿用 129 的口径）：用户指定 Tu, An Introduction to Manifolds
      (GTM 334)。⚠️ 我对该书与 GTM 275 的**章号**没有把握，所以 refs 只写
      「书名 + 主题名」，⛔ 不编号。主丛、配丛的一般定义在 Tu 那本《微分几何》
      （GTM 275）里，手头没有该书，所以只写书名、不写章名 —— 存疑而非假装知道。

   ⭐ **层号是算出来的，不是输入的**（2026-11-01 用户拍板，记在这里免得下一个人又想错）：
      本包第一版曾把 `def.de-rham-complex` 的定义边保留在 $\\mathbb{R}^{n}$ 坐标模型上，
      理由是「de Rham 在 16 层、而 $\\Omega^{k}(M)$ 要切空间、落在 18 层，指过去会
      破了『定义的层号严格小于使用者』那条硬门」。**这个理由是本末倒置的**：
      层号由依赖图**算**出来（`core/layers.js` 的最长路径），它反映「站得多深」，
      不是一条设计约束。de Rham 复形的每一项真的是 $\\Omega^{k}(M)$，那它就该排在
      $\\Omega^{k}(M)$ 之后。所以两条边都改指了流形上的版本：
        `dep.mf-form-derham`  $\\to$ `def.form-on-manifold`（18）
        `dep.mf-extd-derham`  $\\to$ `prop.exterior-derivative-manifold`（19）
      结果：de Rham 复形 16 $\\to$ **20**，它的三个消费者（$H^{0}$、Poincaré 引理、
      Mayer–Vietoris）17 $\\to$ **21**；`maxLayer` 仍是 29（分层滑杆范围不变），
      其余层带的点数一点没动。动手前验过不成环（新上游在旧图上都走不到 de Rham）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '微分几何补洞：流形上的微分形式、纤维丛与主丛',

  nodes: [

    /* ======================================================================
       §A 流形上的微分形式（diffgeom.form）
       ====================================================================== */

    {
      id: 'def.form-on-manifold',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '流形上的微分形式',
      title: '流形上的微分形式：不靠坐标的内蕴定义',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '微分形式', '流形', '交错形式'],
      statement: [
        '**在做什么**：把「按坐标写出来的 $k$-形式」换成**不依赖图卡**的说法。做到这一点，形式才真的是流形上的对象，而不是「某张图卡里的算式」。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。$M$ 上的**微分 $k$-形式** $\\omega$ 就是给每点 $p\\in M$ 指定一个**交错 $k$-线性型**',
        '$$\\omega_{p} : T_{p}M\\times\\cdots\\times T_{p}M\\longrightarrow\\mathbb{R},$$',
        '并且**依赖得光滑**：对每张图卡 $(U,x)$，函数 $p\\mapsto\\omega_{p}\\bigl(\\partial_{i_{1}}\\big|_{p},\\ldots,\\partial_{i_{k}}\\big|_{p}\\bigr)$ 在 $U$ 上光滑。$M$ 上全体 $k$-形式记 $\\Omega^{k}(M)$。',
        '',
        '**光滑性等价于坐标系数光滑**：在 $(U,x)$ 上 $\\omega$ 唯一地写成',
        '$$\\omega\\big|_{U} = \\sum_{I}a_{I}\\,\\mathrm{d}x^{I},\\qquad \\mathrm{d}x^{I} := \\mathrm{d}x^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{i_{k}},$$',
        '其中 $I$ 跑遍所有 $i_{1}<\\cdots<i_{k}$，系数由 $a_{I} := \\omega\\bigl(\\partial_{i_{1}},\\ldots,\\partial_{i_{k}}\\bigr)$ 给出。',
        '而两张图卡重叠处的两组系数由 Jacobi 矩阵的 $k$ 阶子式互相换算 —— 子式光滑，所以「系数光滑」与选哪张图卡无关。这一步是整条定义能不能成立的关键：**它把局部算式焊成了整体对象**。',
        '',
        '**约定**：$\\Omega^{0}(M) := C^{\\infty}(M)$；$\\Omega^{1}(M)$ 就是 1-形式；$k > n$ 时 $\\Omega^{k}(M) = 0$（$n$ 维空间上没有非零的交错 $k$-线性型）。直和 $\\Omega^{\\bullet}(M) = \\bigoplus_{k\\ge 0}\\Omega^{k}(M)$ 带楔积，是分次代数。'
      ].join('\n'),
      notes: [
        '**与 $\\mathbb{R}^{n}$ 版的关系**：`def.differential-form` 是这一条的**坐标模型**，不是另一套东西 —— 在同一张图卡上把它展开，得到的就是那条陈述里的式子。两条并排放，是为了让「坐标算式」与「内蕴定义」各有一个可点的住处。',
        '**另一种等价说法**：把每点的 $\\Lambda^{k}T_{p}^{\\ast}M$ 摞成外积丛 $\\Lambda^{k}T^{\\ast}M$（余切丛 `def.cotangent-bundle` 的外积），则 $\\Omega^{k}(M) = \\Gamma(\\Lambda^{k}T^{\\ast}M)$ 是它的光滑截面（`def.bundle-section`）。截面语言自动带来局部平凡化与过渡函数，坐标公式就是它的局部样子 —— 这条等价是 Tu 在「丛」那一章回头补的，两条路殊途同归。',
        '⚠️ $\\Omega^{k}(M)$ 是 $C^{\\infty}(M)$-**模**：可以逐点乘光滑函数、逐点相加。楔积、内乘、拉回都是模同态；只有 $\\mathrm{d}$ 例外 —— 它只是 $\\mathbb{R}$-线性的（$\\mathrm{d}(f\\omega) = \\mathrm{d}f\\wedge\\omega + f\\,\\mathrm{d}\\omega$）。这个不对称正是「$\\mathrm{d}$ 不是张量运算」的确切含义，也是它为什么只能在流形上靠图卡良定性才能定义（`prop.exterior-derivative-manifold`）。',
        '⚠️ 别把「$k$-形式」读成「$k$ 个函数排成一排」：在 $n$ 维流形上逐点看，$\\Omega^{k}$ 的维数是 $\\binom{n}{k}$ 而不是 $n^{k}$ —— 交错条件砍掉了绝大多数自由度。$n = 3$ 时：$\\Omega^{0}$ 维数 $1$、$\\Omega^{1}$ 与 $\\Omega^{2}$ 都是 $3$、$\\Omega^{3}$ 是 $1$，这正是经典向量分析里「梯度 / 旋度 / 散度各自落在不同的 $\\Omega^{k}$」的来源。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 流形上的 k-形式与光滑性'
      ]
    },

    {
      id: 'prop.exterior-derivative-manifold',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '外微分在流形上良定',
      title: '外微分在流形上良定：局部坐标公式与图卡无关',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '外微分', '良定性', '图卡'],
      statement: [
        '**在做什么**：$\\mathbb{R}^{n}$ 上的 $\\mathrm{d}$ 是按坐标公式写的，搬到流形上必须回答一句「换一张图卡算出来的 $\\mathrm{d}\\omega$ 是不是同一个」。这一条把它钉死，于是 $\\mathrm{d}$ 可以整体地写在流形上。',
        '',
        '设 $M$ 是光滑流形。存在**唯一**的一族算子 $\\mathrm{d} : \\Omega^{k}(M)\\to\\Omega^{k+1}(M)$（$k\\ge 0$）使',
        '',
        '1. 在函数上 $\\mathrm{d}f$ 就是 $f$ 的微分：$\\mathrm{d}f_{p}(v) = v(f)$ 对 $v\\in T_{p}M$；',
        '2. $\\mathrm{d}$ 是 $\\mathbb{R}$-线性的；',
        '3. **反导子**：$\\omega$ 是 $k$-形式时 $\\mathrm{d}(\\omega\\wedge\\tau) = \\mathrm{d}\\omega\\wedge\\tau + (-1)^{k}\\omega\\wedge\\mathrm{d}\\tau$；',
        '4. $\\mathrm{d}^{2} = 0$。',
        '',
        '并且它在任意图卡 $(U,x)$ 上就等于坐标公式',
        '$$\\mathrm{d}\\Bigl(\\sum_{I}a_{I}\\,\\mathrm{d}x^{I}\\Bigr) = \\sum_{I}\\mathrm{d}a_{I}\\wedge\\mathrm{d}x^{I},$$',
        '其中 $\\mathrm{d}x^{I} := \\mathrm{d}x^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{i_{k}}$，而 $\\mathrm{d}a_{I}$ 是函数 $a_{I}$ 的微分。于是「$\\mathrm{d}$ 与图卡无关」不是额外假设，而是这条命题的结论。'
      ].join('\n'),
      notes: [
        '**证明的两半**：存在性 = 「图卡上按公式定义 + 重叠处一致 + 用单位分解拼成整体」；唯一性 = 「局部公式 + 反导子公理 + $\\mathrm{d}^{2}=0$」。骨架在边上，⚠️ 收尾那一步（单位分解的拼接为什么只有有限项、为什么拼出来的东西仍满足 (3)(4)）只给到提纲。',
        '**这是 Tu 的处理顺序**：先有开集上的坐标公式（`def.exterior-derivative`），再用「与拉回交换」（`prop.pullback-forms` 的第 3 条）证明图卡无关。也可以反过来把「与拉回交换」当公理（一堆教材这么做），但那样就得另证存在性，且难以看出 $\\mathrm{d}$ 为什么长这样。',
        '⭐ 有了这一条，`def.de-rham-complex` 里那串 $\\Omega^{k}(M)\\xrightarrow{\\ \\mathrm{d}\\ }\\Omega^{k+1}(M)$ 才真的是一串映射 —— 在这条之前，那串东西只是记号。',
        '⚠️ 顺带钉住一个常见误解：$\\mathrm{d}$ 不依赖**度量**，也不依赖**联络**。它是光滑结构本身给出的算子；联络（`def.affine-connection`）与它无关，两者能凑出公式纯属巧合之外的对称性。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 外微分与图卡无关性'
      ]
    },

    {
      id: 'prop.pullback-form-manifold',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '流形间的拉回',
      title: '流形间光滑映射的拉回：与楔积、与外微分都相容',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '拉回', '微分形式', '分次代数'],
      statement: [
        '**在做什么**：把 $k$-形式沿**流形之间**的光滑映射搬回去。$\\mathbb{R}^{n}$ 开集那版只是它的局部样子。',
        '',
        '设 $F : M\\to N$ 是光滑映射，$\\omega\\in\\Omega^{k}(N)$。**拉回** $F^{\\ast}\\omega\\in\\Omega^{k}(M)$ 逐点定义为',
        '$$(F^{\\ast}\\omega)_{p}(v_{1},\\ldots,v_{k}) := \\omega_{F(p)}\\bigl(\\mathrm{d}F_{p}v_{1},\\ldots,\\mathrm{d}F_{p}v_{k}\\bigr)$$',
        '其中 $v_{i}\\in T_{p}M$。则 $F^{\\ast}\\omega$ 光滑，且',
        '',
        '1. $F^{\\ast}$ 是 $\\mathbb{R}$-线性的；对函数 $F^{\\ast}f = f\\circ F$；',
        '2. **保楔积**：$F^{\\ast}(\\omega\\wedge\\eta) = F^{\\ast}\\omega\\wedge F^{\\ast}\\eta$；',
        '3. **与 $\\mathrm{d}$ 交换**：$\\mathrm{d}(F^{\\ast}\\omega) = F^{\\ast}(\\mathrm{d}\\omega)$；',
        '4. **保复合**：$(G\\circ F)^{\\ast} = F^{\\ast}\\circ G^{\\ast}$，$(\\operatorname{id})^{\\ast} = \\operatorname{id}$。',
        '',
        '于是 $F^{\\ast} : \\Omega^{\\bullet}(N)\\to\\Omega^{\\bullet}(M)$ 是**微分分次代数**的同态。'
      ].join('\n'),
      notes: [
        '**证明的路线**：$T_{p}M$ 上的交错型在坐标基 $\\mathrm{d}x^{I}$ 上线性展开，于是只需在单项 $\\omega = \\mathrm{d}y^{I}$ 上验 —— 而那正是链式法则加「$\\mathrm{d}^{2}=0$」的机械计算，再用上一句的线性拼回去。骨架在边上。',
        '**它和「$\\mathrm{d}$ 良定」互为因果**：开集间那条（`prop.pullback-forms`）已经证过 (3)，流形上用图卡局部化即可；反过来，正因为 $\\mathrm{d}$ 与拉回交换、而拉回只用链式法则定义，$\\mathrm{d}$ 才不依赖坐标（`prop.exterior-derivative-manifold`）。两条一起看，才知道谁也不是循环论证 —— 开集上的 (3) 是初等的。',
        '⭐ 这一条是 de Rham 上同调「是函子」的全部内容：$F$ 光滑 $\\implies$ $F^{\\ast}$ 与 $\\mathrm{d}$ 交换 $\\implies$ $F^{\\ast}$ 下到商空间，得 $F^{\\ast} : H^{k}_{\\mathrm{dR}}(N)\\to H^{k}_{\\mathrm{dR}}(M)$。方向是反的，这正是「上同调反变」的意思。',
        '⚠️ 与向量场的对照：向量场**不能**沿任意光滑映射拉回（要 $F$ 是微分同胚才能前推），形式可以。这个不对称不是技术缺陷，而是「形式是 $T^{\\ast}M$ 的截面、向量场是 $TM$ 的截面」的直接后果。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 拉回 F* 与它保持的运算'
      ]
    },

    /* ======================================================================
       §B 余切丛与纤维丛（diffgeom.manifold）
       ====================================================================== */

    {
      id: 'def.cotangent-bundle',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '余切丛',
      title: '余切丛：切空间的对偶丛',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '余切丛', '对偶丛', '一形式'],
      statement: [
        '**在做什么**：切空间装的是「往哪走」，余切空间装的是「怎么量」。把每点的对偶空间摞起来，就得到 1-形式的住处 —— 微分形式不是凭空出现的算式，它是这个丛的截面。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。点 $p$ 处的**余切空间**是对偶空间',
        '$$T_{p}^{\\ast}M := (T_{p}M)^{\\ast} = \\operatorname{Hom}_{\\mathbb{R}}\\bigl(T_{p}M,\\mathbb{R}\\bigr),$$',
        '它的元素叫**余切向量**，也叫 $p$ 处的 **1-形式**（或 Pfaff 形式）。**余切丛**把它们按底点摞起来：',
        '$$T^{\\ast}M := \\bigsqcup_{p\\in M}T_{p}^{\\ast}M,$$',
        '投影 $\\pi : T^{\\ast}M\\to M$ 把 $\\alpha\\in T_{p}^{\\ast}M$ 送到 $\\pi(\\alpha) := p$。',
        '',
        '**光滑结构**：图卡 $(U,\\varphi)$ 上，坐标函数 $x^{1},\\ldots,x^{n}$ 的微分 $\\mathrm{d}x^{i}\\big|_{p}$ 构成 $T_{p}^{\\ast}M$ 的一组基（对偶于 $\\partial/\\partial x^{i}\\big|_{p}$），于是',
        '$$\\Phi : \\pi^{-1}(U)\\longrightarrow\\varphi(U)\\times\\mathbb{R}^{n}$$',
        '$$\\sum_{i=1}^{n}a_{i}\\,\\mathrm{d}x^{i}\\big|_{p}\\longmapsto\\bigl(\\varphi(p),\\,a_{1},\\ldots,a_{n}\\bigr),$$',
        '是双射。把它当图卡，$T^{\\ast}M$ 成为 $2n$ 维光滑流形，并且 $\\pi$ 是 $M$ 上**秩 $n$ 的光滑向量丛**：局部平凡化就是上面的 $\\Phi$，纤维上的向量空间结构来自对偶空间。'
      ].join('\n'),
      notes: [
        '**为什么非要造它**：$k$-形式要在每点吃进 $k$ 个向量、吐一个数、并且对换两个变元要变号 —— 这正是 $\\Lambda^{k}T_{p}^{\\ast}M$ 里的元素。所以流形上的形式（`def.form-on-manifold`）可以从「余切丛的外积丛的截面」出发，而不是从坐标公式出发；坐标公式只是它在图卡上的样子。',
        '**与切丛的关系**：$T^{\\ast}M$ 是切丛 `def.tangent-bundle` 的对偶丛。取对偶不是可有可无的装饰：切丛的截面（向量场）只能正着推、还要求映射是微分同胚；余切丛的截面（1-形式）可以沿**任意**光滑映射拉回（`prop.pullback-form-manifold`）。微分形式好用，根源就在这个不对称上。',
        '⚠️ $\\mathrm{d}x^{i}$ 在这里是**坐标函数的微分**，不是「留待定义的记号」：$\\mathrm{d}x^{i}\\big|_{p}(v) = v(x^{i})$。它和 `def.exterior-derivative` 里那个 $\\mathrm{d}$ 是同一个算子作用在 $x^{i}\\in C^{\\infty}(U)$ 上 —— 所以 $\\mathrm{d}x^{i}$ 的「$\\mathrm{d}$」也满足 $\\mathrm{d}(\\mathrm{d}x^{i}) = 0$。',
        '⚠️ 记号陷阱：$T^{\\ast}M$ 的双重对偶 $(T^{\\ast}_{p}M)^{\\ast}$ 在有限维时**自然同构**于 $T_{p}M$，所以有人把两者混着写；但 $TM$ 与 $T^{\\ast}M$ 作为丛并不自然同构 —— 要一个同构就得先选黎曼度量（`def.riemannian-metric`）。「升降指标」用的正是这个度量，不是白给的。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 余切空间与余切丛'
      ]
    },

    {
      id: 'def.fiber-bundle',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '纤维丛',
      title: '纤维丛：局部长得像「底 $\\times$ 纤维」的丛',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '纤维丛', '向量丛', '局部平凡化'],
      statement: [
        '**在说什么**：向量丛只要求「纤维是向量空间」。把向量空间换成一个**任意的流形 $F$**，就得到纤维丛 —— 覆叠空间、主丛、向量丛全都落在这一条之下。',
        '',
        '设 $E, B, F$ 是光滑流形，$\\pi : E\\to B$ 是光滑满射。称 $\\pi$（连同 $E$）为**以 $F$ 为纤维、以 $B$ 为底的纤维丛**，若每点 $b\\in B$ 有开邻域 $U$ 与微分同胚',
        '$$\\Phi : \\pi^{-1}(U)\\longrightarrow U\\times F,\\qquad \\operatorname{pr}_{1}\\circ\\Phi = \\pi ,$$',
        '即 $\\Phi$ 与投影交换。这样的 $\\Phi$ 叫**局部平凡化**，$E_{b} := \\pi^{-1}(b)$ 叫 $b$ 处的**纤维**，$E$ 叫**全空间**。',
        '',
        '**转移函数**：同一个开覆盖上取两组平凡化，重叠处必然差一个纤维自同胚',
        '$$\\Phi_{\\alpha}\\circ\\Phi_{\\beta}^{-1}\\,(b, y) = \\bigl(b,\\ g_{\\alpha\\beta}(b)\\,y\\bigr),$$',
        '其中 $g_{\\alpha\\beta} : U_{\\alpha}\\cap U_{\\beta}\\to\\operatorname{Diff}(F)$ 叫**转移函数**。它们满足上闭链条件 $g_{\\alpha\\alpha} = \\operatorname{id}$、$g_{\\alpha\\beta}\\,g_{\\beta\\gamma}\\,g_{\\gamma\\alpha} = \\operatorname{id}$（在重叠处），并且衡量「这块丛歪了多少」。',
        '',
        '若再给定 Lie 群 $G$ 在 $F$ 上的作用，并且总能选平凡化使所有 $g_{\\alpha\\beta}$ 取值落在 $G$ 里，就说这个丛的**结构群**是 $G$。'
      ].join('\n'),
      notes: [
        '**为什么要这个概念**：向量丛（`def.vector-bundle`）是 $F = \\mathbb{R}^{k}$、$G\\subseteq\\operatorname{GL}(k,\\mathbb{R})$ 的特例；覆叠空间（`def.covering-space`）是 $F$ 离散的特例；主丛（`def.principal-bundle`）是 $F = G$ 本身那一个特例。三件事被这一条统一，判据都是同一句话：**局部长得像「底 $\\times$ 纤维」**。',
        '**「纤维」这个词为什么不分下标也说得通**：局部平凡化在每根纤维上是 $\\{b\\}\\times F$ 上的同胚，所以每根纤维都同胚于 $F$。但**没有自然同胚** —— 沿底空间绕一圈回来可能换掉一个自同胚，这个「绕一圈的变形」（monodromy）正是纤维丛不是平凡积的全部原因。',
        '⚠️ 光有「每根纤维都同胚于 $F$」**远远不够**：必须有**局部**平凡化。差别就在于「能不能在邻域上一致地选同胚」—— 不能的话纤维照样各自同胚，但丛已经扭了（覆叠空间里最直观：绕一圈换叶）。所以判据必须落在邻域上，不能落在单点上。',
        '⭐ 分类的口径也来自这里：$\\{g_{\\alpha\\beta}\\}$ 模掉「换个平凡化」（即乘上某个上边缘），就是 Čech 的 $H^{1}$（`thm.bundle-classification` 讲向量丛那一支，同一条道理）。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 丛、局部平凡化与转移函数'
      ]
    },

    {
      id: 'def.principal-bundle',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '主丛',
      title: '主丛：纤维就是结构群本身的纤维丛',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '主丛', '结构群', 'Lie 群作用'],
      statement: [
        '**在说什么**：纤维丛里最「自指」的那一类 —— 纤维不是随便一个流形，就是结构群 $G$ 自己，而且 $G$ 在丛上自由地右作用。向量丛都能从主丛造出来（取配丛）。',
        '',
        '设 $G$ 是 Lie 群，$P, B$ 是光滑流形，$\\pi : P\\to B$ 光滑。$P$ 上的**主 $G$-丛**是纤维丛 $\\pi$ 连同 $G$ 在 $P$ 上的**右作用**',
        '$$P\\times G\\longrightarrow P,\\qquad (u,g)\\longmapsto u\\cdot g ,$$',
        '使',
        '',
        '1. **保纤维**：$\\pi(u\\cdot g) = \\pi(u)$；',
        '2. **自由且在纤维上可迁**：$u\\cdot g = u \\iff g = e$，且同一根纤维 $P_{b}$ 中任意两点都差一个右乘（于是 $P_{b}$ 与 $G$ 同胚）；',
        '3. **局部平凡且 $G$-等变**：每点有邻域 $U$ 与微分同胚 $\\Phi : \\pi^{-1}(U)\\to U\\times G$，写成 $\\Phi(u) = \\bigl(\\pi(u),\\varphi(u)\\bigr)$，并满足',
        '$$\\Phi(u\\cdot g) = \\bigl(\\pi(u),\\ \\varphi(u)\\,g\\bigr).$$',
        '',
        '此时纤维是 $G$（右乘 $g\\mapsto hg$ 把它送到自己），结构群也是 $G$。**帧丛**（每点取纤维的一组基）给出最常用的例子：秩 $k$ 向量丛 $E\\to B$ 的帧丛是主 $\\operatorname{GL}(k,\\mathbb{R})$-丛 —— 这就是「向量丛与主丛」之间那座桥。'
      ].join('\n'),
      notes: [
        '**为什么主丛值得单独记**：向量丛的结构群是 $\\operatorname{GL}(k)$，但它只藏在转移函数里、看不见；主丛把结构群**变成空间的一部分**（纤维就是群），于是「联络」「曲率」「示性类」都能在主丛上整体地谈，再沿表示拉到配丛上。Tu 讲联络与曲率的路线正是这一条。',
        '⚠️ 右作用还是左作用：约定取**右**作用，好处是转移函数可以顺着写在坐标后面（$\\Phi(u\\cdot g) = (\\pi(u),\\varphi(u)g)$），不必写成 $\\varphi(g^{-1}u)$ 这类反向的式子。换约定时整条公式都要改，混着用就是符号错误的来源。',
        '⭐ 特例串起来记：主 $G$-丛（纤维 $G$）$\\rightsquigarrow$ 取 $G$ 在某个流形 $F$ 上的作用、把纤维换掉，得**配丛**（纤维 $F$；本图尚未收录）$\\rightsquigarrow$ 取 $F = \\mathbb{R}^{k}$、$G = \\operatorname{GL}(k,\\mathbb{R})$，得向量丛（`def.vector-bundle`）$\\rightsquigarrow$ 取 $F$ 离散，得覆叠空间（`def.covering-space`）。反过来：任何向量丛都有帧丛，都在主丛这一层。',
        '⚠️ 「自由」这一条不能省：若允许 $u\\cdot g = u$ 而 $g\\ne e$，纤维上就有稳定化子，丛在纤维方向上会「粘住」，此时它不再是主丛、而是某个更小的群的主丛（或一般的纤维丛）。'
      ].join('\n\n'),
      refs: [
        'Tu, Differential Geometry (GTM 275)（⚠️ 手头无该书，章名未核实，只记书名）· 主丛与配丛'
      ]
    }
  ],

  edges: [

    /* ---------------------------------------------- §A 形式的定义链 */
    { id: 'dep.mf3-form-rn', kind: 'definition',
      definition: 'def.differential-form', usedBy: 'def.form-on-manifold',
      note: '同一条东西的坐标模型：把 $\\omega$ 在某张图卡上展开，得到的就是那条陈述里的算式。' },
    { id: 'dep.mf3-form-tanspace', kind: 'definition',
      definition: 'def.tangent-space-manifold', usedBy: 'def.form-on-manifold',
      note: '定义的主语是「$T_{p}M$ 上的交错 $k$-线性型」，没有切空间无从写起。' },
    { id: 'dep.mf3-form-chart', kind: 'definition',
      definition: 'def.manifold-chart', usedBy: 'def.form-on-manifold',
      note: '光滑性与图卡无关，这一步靠图卡之间的 Jacobi 换算完成。' },
    { id: 'dep.mf3-form-smoothmanifold', kind: 'definition',
      definition: 'def.smooth-manifold', usedBy: 'def.form-on-manifold',
      note: '底流形必须是光滑流形，否则「系数光滑」没有意义。' },

    { id: 'dep.mf3-dm-extd', kind: 'definition',
      definition: 'def.exterior-derivative', usedBy: 'prop.exterior-derivative-manifold',
      note: '开集上的坐标公式直接搬过来，当图卡上的定义用。' },
    { id: 'dep.mf3-dm-pullback', kind: 'definition',
      definition: 'prop.pullback-forms', usedBy: 'prop.exterior-derivative-manifold',
      note: '图卡无关性靠「$\\mathrm{d}$ 与拉回交换」这条（开集版已证），它才是证明的引擎。' },
    { id: 'dep.mf3-dm-form', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'prop.exterior-derivative-manifold',
      note: '命题的主语就是 $\\Omega^{k}(M)$ 上的算子族。' },
    { id: 'dep.mf3-dm-pou', kind: 'definition',
      definition: 'thm.smooth-partition-unity', usedBy: 'prop.exterior-derivative-manifold',
      note: '把图卡上的局部定义拼成整体，靠单位分解 —— 存在性那一半的收尾。' },

    { id: 'dep.mf3-pbm-form', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'prop.pullback-form-manifold',
      note: '拉回的两端都是流形上的形式空间。' },
    { id: 'dep.mf3-pbm-rn', kind: 'definition',
      definition: 'prop.pullback-forms', usedBy: 'prop.pullback-form-manifold',
      note: '开集间那条是这一条的图卡样子；证明靠局部化到图卡搬过来。' },
    { id: 'dep.mf3-pbm-dmap', kind: 'definition',
      definition: 'def.differential-map', usedBy: 'prop.pullback-form-manifold',
      note: '定义式里把切映射 $\\mathrm{d}F_{p}$ 塞进形式 $\\omega$ 的槽里 —— 没有它写不出这个式子。' },
    { id: 'dep.mf3-pbm-covm', kind: 'definition',
      definition: 'prop.pullback-form-manifold', usedBy: 'thm.change-of-variables-manifold',
      note: '流形上的换元公式就是「拉回体积形式再积分」：$\\int_{F(M)}\\omega = \\int_{M}F^{\\ast}\\omega$（保向微分同胚时）。' },

    /* ---------------------------------------------- §B 丛的定义链 */
    { id: 'dep.mf3-cotb-tbundle', kind: 'definition',
      definition: 'def.tangent-bundle', usedBy: 'def.cotangent-bundle',
      note: '对偶是逐纤维取的：先有 $TM$，才有 $T^{\\ast}M$；光滑结构也由切丛的图卡对偶过来。' },
    { id: 'dep.mf3-cotb-dual', kind: 'definition',
      definition: 'def.dual-space', usedBy: 'def.cotangent-bundle',
      note: '余切空间就是对偶空间，「纤维是向量空间」这一点全靠它。' },
    { id: 'dep.mf3-cotb-vbundle', kind: 'definition',
      definition: 'def.vector-bundle', usedBy: 'def.cotangent-bundle',
      note: '余切丛是秩 $n$ 向量丛的实例；局部平凡化 $\\Phi$ 就是那条定义里要求的 $\\Phi$。' },
    { id: 'dep.mf3-cotb-chart', kind: 'definition',
      definition: 'def.manifold-chart', usedBy: 'def.cotangent-bundle',
      note: '基 $\\mathrm{d}x^{i}$ 与图卡绑定，丛的光滑结构由它给出。' },
    { id: 'dep.mf3-cotb-tensor', kind: 'definition',
      definition: 'def.cotangent-bundle', usedBy: 'def.tensor-field',
      note: '张量场的 $r$ 个逆变槽吃的正是 $T_{p}^{\\ast}M$；把逐点的对偶空间摞起来就是余切丛，它的光滑截面就是 1-形式。' },

    { id: 'dep.mf3-fb-chart', kind: 'definition',
      definition: 'def.manifold-chart', usedBy: 'def.fiber-bundle',
      note: '「局部」平凡化的局部，指的是底空间上的开邻域（图卡意义上的）。' },
    { id: 'dep.mf3-fb-smooth', kind: 'definition',
      definition: 'def.smooth-map', usedBy: 'def.fiber-bundle',
      note: '$\\pi$ 与每个 $\\Phi$ 都要求光滑，丛才是一个光滑对象而不是拓扑对象。' },
    { id: 'dep.mf3-fb-class', kind: 'definition',
      definition: 'def.fiber-bundle', usedBy: 'thm.bundle-classification',
      note: '转移函数与上闭链条件是纤维丛的语言；分类定理本身对任意结构群都成立，向量丛只是 $G = \\operatorname{GL}(k,\\mathbb{R})$ 那一支。' },

    { id: 'dep.mf3-prin-lie', kind: 'definition',
      definition: 'def.lie-group', usedBy: 'def.principal-bundle',
      note: '结构群要能谈光滑作用与光滑转移函数，所以必须是 Lie 群。' },
    { id: 'dep.mf3-prin-act', kind: 'definition',
      definition: 'def.group-action', usedBy: 'def.principal-bundle',
      note: '主丛 = 纤维丛 + 一个自由的右作用；自由与可迁两条就是作用论里的词。' },
    { id: 'dep.mf3-prin-fb', kind: 'definition',
      definition: 'def.fiber-bundle', usedBy: 'def.principal-bundle',
      note: '主丛首先是纤维丛，只多了「$G$-等变平凡化」与「自由可迁」这两条。' },

    /* ---------------------------------------------- §C 把新定义接到旧结论上 */
    { id: 'dep.mf3-form-stokes', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'thm.stokes',
      note: 'Stokes 定理里的 $\\omega$ 是**流形上**的 $(n-1)$-形式：边界上积、内部积分 $\\mathrm{d}\\omega$。以前这里只能指欧氏开集上那条定义。' },
    { id: 'dep.mf3-form-chainint', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'prop.integral-chain-linear',
      note: '链上积分的双线性是 $\\Omega^{k}(M)$ 上的双线性 —— 补上这条，这个节点才第一次有定义边（之前它是「没有定义边的命题」）。' },
    { id: 'dep.mf3-form-lieform', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'def.left-invariant-form',
      note: '左不变形式是 Lie 群上的 $k$-形式再加一条不变性；本体还是流形上的形式。' },
    { id: 'dep.mf3-dm-cartan', kind: 'definition',
      definition: 'prop.exterior-derivative-manifold', usedBy: 'thm.cartan-formula',
      note: 'Cartan 公式里的 $\\mathrm{d}$ 作用在 $\\Omega^{k}(M)$ 上，它的良定性就是那条命题的内容。' }
  ]
});
