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
      label: '微分形式',
      title: '微分形式：流形上的内蕴定义',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '微分形式', '流形', '交错形式'],
      statement: [
        '**在做什么**：把「按坐标写出来的 $k$-形式」换成**不依赖图卡**的说法。做到这一点，形式才真的是流形上的对象，而不是「某张图卡里的算式」。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。$M$ 上的**微分 $k$-形式** $\\omega$ 就是给每点 $p\\in M$ 指定一个**交错 $k$-线性型**',
        '$$\\omega_{p} : T_{p}M\\times\\cdots\\times T_{p}M\\longrightarrow\\mathbb{R},$$',
        '并且**依赖得光滑**：对每张图卡 $(U,x)$，函数 $p\\mapsto\\omega_{p}\\bigl(\\partial_{i_{1}}\\big|_{p},\\ldots,\\partial_{i_{k}}\\big|_{p}\\bigr)$ 在 $U$ 上光滑。\n\n$M$ 上全体 $k$-形式记 $\\Omega^{k}(M)$。',
        '',
        '**光滑性等价于坐标系数光滑**：在 $(U,x)$ 上 $\\omega$ 唯一地写成',
        '$$\\omega\\big|_{U} = \\sum_{I}a_{I}\\,\\mathrm{d}x^{I},\\qquad \\mathrm{d}x^{I} := \\mathrm{d}x^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{i_{k}},$$',
        '其中 $I$ 跑遍所有 $i_{1}<\\cdots<i_{k}$，系数由 $a_{I} := \\omega\\bigl(\\partial_{i_{1}},\\ldots,\\partial_{i_{k}}\\bigr)$ 给出。',
        '而两张图卡重叠处的两组系数由 Jacobi 矩阵的 $k$ 阶子式互相换算 —— 子式光滑，所以「系数光滑」与选哪张图卡无关。这一步是整条定义能不能成立的关键：**它把局部算式焊成了整体对象**。',
        '',
        '**约定**：$\\Omega^{0}(M) := C^{\\infty}(M)$；$\\Omega^{1}(M)$ 就是 1-形式；$k > n$ 时 $\\Omega^{k}(M) = 0$（$n$ 维空间上没有非零的交错 $k$-线性型）。\n\n直和 $\\Omega^{\\bullet}(M) = \\bigoplus_{k\\ge 0}\\Omega^{k}(M)$ 带楔积，是分次代数。'
      ].join('\n'),
      notes: [
        '**与 $\\mathbb{R}^{n}$ 版的关系**：`def.differential-form` 是这一条的**坐标模型**，不是另一套东西 —— 在同一张图卡上把它展开，得到的就是那条陈述里的式子。两条并排放，是为了让「坐标算式」与「内蕴定义」各有一个可点的住处。',
        '**另一种等价说法**：把每点的 $\\Lambda^{k}T_{p}^{\\ast}M$ 摞成外积丛 $\\Lambda^{k}T^{\\ast}M$（余切丛 `def.cotangent-bundle` 的外积），则 $\\Omega^{k}(M) = \\Gamma(\\Lambda^{k}T^{\\ast}M)$ 是它的光滑截面（`def.bundle-section`）。\n\n截面语言自动带来局部平凡化与过渡函数，坐标公式就是它的局部样子 —— 这条等价是 Tu 在「丛」那一章回头补的，两条路殊途同归。',
        '⚠️ $\\Omega^{k}(M)$ 是 $C^{\\infty}(M)$-**模**：可以逐点乘光滑函数、逐点相加。\n\n楔积、内乘、拉回都是模同态；只有 $\\mathrm{d}$ 例外 —— 它只是 $\\mathbb{R}$-线性的（$\\mathrm{d}(f\\omega) = \\mathrm{d}f\\wedge\\omega + f\\,\\mathrm{d}\\omega$）。\n\n这个不对称正是「$\\mathrm{d}$ 不是张量运算」的确切含义，也是它为什么只能在流形上靠图卡良定性才能定义（`prop.exterior-derivative-manifold`）。',
        '⚠️ 别把「$k$-形式」读成「$k$ 个函数排成一排」：在 $n$ 维流形上逐点看，$\\Omega^{k}$ 的维数是 $\\binom{n}{k}$ 而不是 $n^{k}$ —— 交错条件砍掉了绝大多数自由度。\n\n$n = 3$ 时：$\\Omega^{0}$ 维数 $1$、$\\Omega^{1}$ 与 $\\Omega^{2}$ 都是 $3$、$\\Omega^{3}$ 是 $1$，这正是经典向量分析里「梯度 / 旋度 / 散度各自落在不同的 $\\Omega^{k}$」的来源。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 流形上的 k-形式与光滑性'
      ]
    },

    {
      id: 'prop.exterior-derivative-manifold',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '外微分',
      title: '外微分：流形上的存在唯一性与图卡无关',
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
        '**证明策略**：先在一个图卡内证明「坐标公式满足四条公理」，再证明「满足四条公理的算子被坐标公式唯一决定」；最后由「图卡重叠处两个公式都是满足公理的算子」推出它们一致，把局部公式拼成整体。关键点：**不需要单位分解** —— 单位分解是给「局部数据在重叠处不一致」的场合用的，这里局部公式在重叠处自动一致。',
        '**引理 A（图卡内唯一性）**：设 $U \\subseteq \\mathbb{R}^{n}$ 是开集，$D$ 是 $\\Omega^{\\bullet}(U)$ 上满足 (1)–(4) 的算子。则对 $\\omega = \\sum_{I} a_{I}\\,\\mathrm{d}x^{I}$ 有 $D\\omega = \\sum_{I}\\mathrm{d}a_{I}\\wedge\\mathrm{d}x^{I}$。**证明**：$0$-形式由 (1) 直接给出。看单项 $a\\,\\mathrm{d}x^{I}$，$I = (i_{1} < \\cdots < i_{k})$：$\\mathrm{d}x^{i} = \\mathrm{d}(x^{i})$（对坐标函数用 (1)），由 (4) 得 $D(\\mathrm{d}x^{i}) = D^{2}(x^{i}) = 0$；再由 (3) 归纳得 $D(\\mathrm{d}x^{I}) = 0$。于是 $D(a\\,\\mathrm{d}x^{I}) = \\mathrm{d}a\\wedge\\mathrm{d}x^{I} + a\\,D(\\mathrm{d}x^{I}) = \\mathrm{d}a\\wedge\\mathrm{d}x^{I}$；由 (2) 线性拼起来即得。$\\square$',
        '**引理 B（坐标公式满足公理）**：在 $U$ 上定义 $D(\\sum_{I} a_{I}\\,\\mathrm{d}x^{I}) := \\sum_{I}\\mathrm{d}a_{I}\\wedge\\mathrm{d}x^{I}$。**证明**：(2) 显然。(1)：$Df = \\sum_{i}\\partial_{i}f\\,\\mathrm{d}x^{i}$，这正是 $f$ 的微分（$\\mathrm{d}f_{p}(v) = v(f)$）。(3)：只需对单项 $a\\,\\mathrm{d}x^{I}$ 与 $b\\,\\mathrm{d}x^{J}$ 验，$D(ab\\,\\mathrm{d}x^{I}\\wedge\\mathrm{d}x^{J}) = (b\\,\\mathrm{d}a + a\\,\\mathrm{d}b)\\wedge\\mathrm{d}x^{I}\\wedge\\mathrm{d}x^{J} = (\\mathrm{d}a\\wedge\\mathrm{d}x^{I})\\wedge(b\\,\\mathrm{d}x^{J}) + (-1)^{k}a\\,\\mathrm{d}x^{I}\\wedge(\\mathrm{d}b\\wedge\\mathrm{d}x^{J}),$ 中间用了 $\\mathrm{d}x^{I}\\wedge\\mathrm{d}b = (-1)^{k}\\mathrm{d}b\\wedge\\mathrm{d}x^{I}$。(4)：先看函数，$D^{2}f = \\sum_{i}D(\\partial_{i}f)\\wedge\\mathrm{d}x^{i} = \\sum_{i,j}\\partial_{j}\\partial_{i}f\\,\\mathrm{d}x^{j}\\wedge\\mathrm{d}x^{i} = 0$，因为 $\\mathrm{d}x^{j}\\wedge\\mathrm{d}x^{i} = -\\mathrm{d}x^{i}\\wedge\\mathrm{d}x^{j}$，而混合偏导 $\\partial_{j}\\partial_{i}f = \\partial_{i}\\partial_{j}f$（Clairaut）。再看单项 $a\\,\\mathrm{d}x^{I}$：由 (3) 与已证的 $D(\\mathrm{d}x^{I}) = 0$，$D^{2}(a\\,\\mathrm{d}x^{I}) = D(\\mathrm{d}a\\wedge\\mathrm{d}x^{I}) = D^{2}a\\wedge\\mathrm{d}x^{I} = 0$。$\\square$',
        '**整体构造（存在性）**：取 $M$ 的图卡覆盖 $\\{(U_{\\alpha}, x_{\\alpha})\\}$。在每张图卡上用引理 B 定义算子 $D_{\\alpha}$。若 $U_{\\alpha}\\cap U_{\\beta}\\ne\\emptyset$，在重叠开集上 $D_{\\alpha}$ 与 $D_{\\beta}$ 都满足 (1)–(4)；由引理 A（在 $x_{\\alpha}$ 坐标下）$D_{\\beta} = D_{\\alpha}$。故所有 $D_{\\alpha}$ 拼成一个整体算子 $\\mathrm{d}$：对 $\\omega\\in\\Omega^{k}(M)$，$\\mathrm{d}\\omega$ 在 $U_{\\alpha}$ 上定义为 $D_{\\alpha}(\\omega|_{U_{\\alpha}})$；重叠处一致，故良定义。(1)–(4) 都是局部性质，已逐图卡验证，故整体成立。',
        '**唯一性**：设 $\\mathrm{d}^{\\prime}$ 是满足 (1)–(4) 的另一族算子。对任意图卡 $(U,x)$，$\\mathrm{d}^{\\prime}$ 限制在 $U$ 上满足 (1)–(4)，由引理 A 它等于坐标公式，即等于 $\\mathrm{d}$。$U$ 任意，故 $\\mathrm{d}^{\\prime} = \\mathrm{d}$。∎',
        '**「与图卡无关」到底指什么**：第 4 步说明换图卡算出的两个公式在重叠处相等 —— 因为它们都是满足公理的算子，而引理 A 说这样的算子只有一个。真正把 $\\mathrm{d}$ 钉死的是 (3)+(4)：(1) 给函数上的值，(3) 让 $\\mathrm{d}$ 穿过楔积，(4) 杀掉 $\\mathrm{d}x^{I}$ 的导数。',
        '**与 Tu 的路线对照**：Tu 先用 `prop.pullback-forms` 的第 3 条（与拉回交换）证图卡无关；这里改用「公理唯一性」证。两条路线都对，且都不需要单位分解 —— 这也说明光滑单位分解在本条里不是必需品。',
        '⭐ 有了这一条，`def.de-rham-complex` 里那串 $\\Omega^{k}(M)\\xrightarrow{\\ \\mathrm{d}\\ }\\Omega^{k+1}(M)$ 才真的是一串映射 —— 在这条之前，那串东西只是记号。',
        '⚠️ 顺带钉住一个常见误解：$\\mathrm{d}$ 不依赖**度量**，也不依赖**联络**。它是光滑结构本身给出的算子；联络（`def.affine-connection`）与它无关，两者能凑出公式纯属巧合之外的对称性。',
        '⚠️ **本图缺的节点**：$\\mathrm{d}^{2}=0$ 的函数情形用到了 Clairaut 定理（混合偏导对称），本图没有这个节点，故在此直接以经典微积分事实使用。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 外微分与图卡无关性'
      ]
    },

    {
      id: 'prop.pullback-form-manifold',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '拉回',
      title: '拉回：流形之间光滑映射的拉回',
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
        '**证明分四步**：先说明 $F^{\\ast}\\omega$ 确实是光滑的 $k$-形式，再逐条验证 (1)–(4)，最后 (2)+(3) 合起来说明它是微分分次代数同态。所有等式都是逐点验证 —— 形式逐点定义，所以「逐点相等」就是「形式相等」。',
        '**光滑性**：取 $M$ 的图卡 $(U,x)$ 与 $N$ 的图卡 $(V,y)$，且 $F(U)\\subseteq V$。在 $y$ 坐标下 $\\omega = \\sum_{I} a_{I}\\,\\mathrm{d}y^{I}$，$F$ 写成 $y = F(x) = (F^{1}(x), \\ldots, F^{n}(x))$。则 $F^{\\ast}\\omega = \\sum_{I}(a_{I}\\circ F)\\,\\mathrm{d}F^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}F^{i_{k}},\\qquad \\mathrm{d}F^{i} = \\sum_{j}\\frac{\\partial F^{i}}{\\partial x^{j}}\\,\\mathrm{d}x^{j}.$ 右端系数是光滑函数的积与和，故 $F^{\\ast}\\omega$ 在 $U$ 上光滑；图卡 $U$ 覆盖 $M$，故整体光滑。（这里 $\\mathrm{d}F$ 与 `def.differential-map` 的微分是同一个东西：$\\mathrm{d}F_{p}$ 是切映。）\n\n**逐条验证**：(1) $\\mathbb{R}$-线性由 $\\omega\\mapsto\\omega_{F(p)}(\\mathrm{d}F_{p}\\cdot)$ 对 $\\omega$ 线性得到；函数的拉回 $(F^{\\ast}f)(p) = f(F(p)) = (f\\circ F)(p)$ 就是定义。\n\n(2) **保楔积**：固定 $p$，记 $L = \\mathrm{d}F_{p} : T_{p}M\\to T_{F(p)}N$。对 $v_{1},\\ldots,v_{k+l}\\in T_{p}M$，用楔积的洗牌公式（对 $(k,l)$-洗牌 $\\sigma$ 求和）：$(L^{\\ast}\\alpha\\wedge L^{\\ast}\\beta)(v) = \\sum_{\\sigma}\\operatorname{sgn}(\\sigma)\\,(L^{\\ast}\\alpha)(v_{\\sigma(1)},\\ldots)(L^{\\ast}\\beta)(v_{\\sigma(k+1)},\\ldots) = \\sum_{\\sigma}\\operatorname{sgn}(\\sigma)\\,\\alpha(Lv_{\\sigma(1)},\\ldots)\\beta(Lv_{\\sigma(k+1)},\\ldots) = (\\alpha\\wedge\\beta)(Lv_{1},\\ldots,Lv_{k+l}) = L^{\\ast}(\\alpha\\wedge\\beta)(v).$ 取 $\\alpha = \\omega_{F(p)}$、$\\beta = \\eta_{F(p)}$，即得 (2)。\n\n(3) **与 $\\mathrm{d}$ 交换**：两边都逐点定义，用图卡化到 $\\mathbb{R}^{n}$ 的开集。由线性只需验单项 $\\omega = a\\,\\mathrm{d}y^{I}$。此时 $F^{\\ast}\\omega = (a\\circ F)\\,\\mathrm{d}F^{I}$，其中 $\\mathrm{d}F^{I} = \\mathrm{d}F^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}F^{i_{k}}$。由反导子与 $\\mathrm{d}^{2}F^{i} = 0$（$F^{i}$ 是函数）：$\\mathrm{d}(F^{\\ast}\\omega) = \\mathrm{d}(a\\circ F)\\wedge\\mathrm{d}F^{I} + (a\\circ F)\\,\\mathrm{d}(\\mathrm{d}F^{I}) = \\mathrm{d}(a\\circ F)\\wedge\\mathrm{d}F^{I}.$ 链式法则给 $\\mathrm{d}(a\\circ F) = \\sum_{j}(\\partial_{j}a\\circ F)\\,\\mathrm{d}F^{j}$，代回：$\\mathrm{d}(F^{\\ast}\\omega) = \\sum_{j}(\\partial_{j}a\\circ F)\\,\\mathrm{d}F^{j}\\wedge\\mathrm{d}F^{I} = F^{\\ast}\\Bigl(\\sum_{j}\\partial_{j}a\\,\\mathrm{d}y^{j}\\wedge\\mathrm{d}y^{I}\\Bigr) = F^{\\ast}(\\mathrm{d}a\\wedge\\mathrm{d}y^{I}) = F^{\\ast}(\\mathrm{d}\\omega),$ 末步用了 $\\mathrm{d}\\omega = \\mathrm{d}a\\wedge\\mathrm{d}y^{I} + a\\,\\mathrm{d}(\\mathrm{d}y^{I}) = \\mathrm{d}a\\wedge\\mathrm{d}y^{I}$。\n\n(4) **保复合**：链式法则给 $\\mathrm{d}(G\\circ F)_{p} = \\mathrm{d}G_{F(p)}\\circ\\mathrm{d}F_{p}$，于是 $((G\\circ F)^{\\ast}\\omega)_{p}(v_{1},\\ldots) = \\omega_{G(F(p))}\\bigl(\\mathrm{d}G_{F(p)}\\mathrm{d}F_{p}v_{1},\\ldots\\bigr) = (F^{\\ast}(G^{\\ast}\\omega))_{p}(v_{1},\\ldots).$ $(\\operatorname{id})^{\\ast} = \\operatorname{id}$ 显然。∎',
        '**小结**：(1)+(2) 说 $F^{\\ast}$ 是分次代数同态，(3) 说它与微分交换，(4) 说它保复合 —— 合起来，$F^{\\ast}$ 是微分分次代数之间的（反变）映射。',
        '⭐ 这一条是 de Rham 上同调「是函子」的全部内容：$F^{\\ast}$ 与 $\\mathrm{d}$ 交换，故把闭形式送到闭形式、把恰当形式送到恰当形式，从而下到商空间 $F^{\\ast} : H^{k}_{\\mathrm{dR}}(N)\\to H^{k}_{\\mathrm{dR}}(M)$。方向是反的，这正是「上同调反变」的意思。',
        '⚠️ 与向量场的对照：向量场**不能**沿任意光滑映射拉回（要 $F$ 是微分同胚才能前推），形式可以。这个不对称不是技术缺陷，而是「形式是 $T^{\\ast}M$ 的截面、向量场是 $TM$ 的截面」的直接后果。',
        '⚠️ **本图缺的节点/边**：(3) 里 $\\mathrm{d}(\\mathrm{d}F^{I}) = 0$ 用到「$\\mathrm{d}^{2} = 0$」（函数情形即 Clairaut 定理），本图没有 Clairaut 节点；洗牌公式也没有独立节点，故在此写全。若日后加这两条，可改为引用。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 拉回 F* 与它保持的运算',
        'Lee, Introduction to Smooth Manifolds (2nd ed., GTM 218), Ch. 14 · Differential Forms'
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
        '**与切丛的关系**：$T^{\\ast}M$ 是切丛 `def.tangent-bundle` 的对偶丛。取对偶不是可有可无的装饰：切丛的截面（向量场）只能正着推、还要求映射是微分同胚；余切丛的截面（1-形式）可以沿**任意**光滑映射拉回。微分形式好用，根源就在这个不对称上。',
        '⚠️ $\\mathrm{d}x^{i}$ 在这里是**坐标函数的微分**，不是「留待定义的记号」：$\\mathrm{d}x^{i}\\big|_{p}(v) = v(x^{i})$。\n\n它和 `def.exterior-derivative` 里那个 $\\mathrm{d}$ 是同一个算子作用在 $x^{i}\\in C^{\\infty}(U)$ 上 —— 所以 $\\mathrm{d}x^{i}$ 的「$\\mathrm{d}$」也满足 $\\mathrm{d}(\\mathrm{d}x^{i}) = 0$。',
        '⚠️ 记号陷阱：$T^{\\ast}M$ 的双重对偶 $(T^{\\ast}_{p}M)^{\\ast}$ 在有限维时**自然同构**于 $T_{p}M$，所以有人把两者混着写；但 $TM$ 与 $T^{\\ast}M$ 作为丛并不自然同构 —— 要一个同构就得先选黎曼度量（`def.riemannian-metric`）。\n\n「升降指标」用的正是这个度量，不是白给的。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Differential Forms」· 余切空间与余切丛'
      ]
    },

    {
      id: 'def.local-trivialization',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '局部平凡化',
      title: '局部平凡化：把丛的一块摊平成一个乘积',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '纤维丛', '局部平凡化', '平凡化'],
      statement: [
        '**在说什么**：丛之所以叫「丛」，全靠这一条 —— 它在局部一定能摊平成一个乘积。纤维丛、向量丛、主丛、覆叠空间的定义里那句「每点有邻域使…」，说的都是它。',
        '',
        '设 $\\pi : E\\to B$ 是连续满射，$F$ 是拓扑空间，$U\\subseteq B$ 是开集。连续映射',
        '$$\\Phi : \\pi^{-1}(U)\\longrightarrow U\\times F$$',
        '叫 $\\pi$ 在 $U$ 上的一个**局部平凡化**，若 $\\Phi$ 是同胚、且与投影交换：',
        '$$\\operatorname{pr}_{1}\\circ\\Phi = \\pi .$$',
        '',
        '于是 $\\Phi$ 把丛在 $U$ 上的那一块摊成了**平凡积** $U\\times F$：每根纤维 $E_{b} := \\pi^{-1}(b)$ 被送到 $\\{b\\}\\times F$，从而同胚于 $F$。若 $B$ 的每点都有这样的开邻域与局部平凡化，就说 $\\pi$ 是**局部平凡**的。',
        '',
        '**光滑情形**：$E, B, F$ 都是光滑流形、$\\pi$ 光滑时，定义里把「同胚」换成「**微分同胚**」，这才是光滑丛的局部平凡化 —— 否则连切丛都不是光滑丛。'
      ].join('\n'),
      notes: [
        '**为什么单独给它一个节点**：它是「丛」这个词的全部技术内容。\n\n`def.fiber-bundle` / `def.vector-bundle` / `def.principal-bundle` / `def.covering-space` / `def.tangent-bundle` / `def.bundle-section` 等等一大批节点的定义里都在用它当已知量 —— 没有这一条，「局部长得像 $U\\times F$」这句话就没处可查。',
        '**定义本身是拓扑的**：同胚就够了，不需要光滑。光滑丛只是把同胚换成微分同胚再叠上去。这也解释了为什么它的层号能排在光滑流形之前 —— 它不是微分几何専有的概念，而是拓扑那一层的东西被借过来的。',
        '**它和截面的关系**：局部平凡化把丛上的一块摊平之后，丛上的问题就都变回底空间上的「一族函数 / 一族向量」—— 截面的局部表示 $\\sigma : U\\to\\mathbb{R}^{k}$（`def.bundle-section`）就是这么得来的。',
        '⚠️ **局部平凡 $\\ne$ 平凡**：全空间未必等于 $B\\times F$。覆叠空间（$F$ 离散）、切丛都是局部平凡但整体扭的 —— 「扭」由转移函数 $g_{\\alpha\\beta}$ 记（`def.fiber-bundle`）。',
        '⚠️ 平凡化的**不唯一性**就是结构的全部来源：同一块上有无穷多个平凡化，两个差一个纤维自同胚，这正是「结构群」「示性类」的立足点。若平凡化唯一，丛就一定是平凡积。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 局部平凡化',
        'Tu, Differential Geometry (GTM 275)（⚠️ 手头无该书，章名未核实，只记书名）· 丛与平凡化'
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
        '其中 $g_{\\alpha\\beta} : U_{\\alpha}\\cap U_{\\beta}\\to\\operatorname{Diff}(F)$ 叫**转移函数**。\n\n它们满足上闭链条件 $g_{\\alpha\\alpha} = \\operatorname{id}$、$g_{\\alpha\\beta}\\,g_{\\beta\\gamma}\\,g_{\\gamma\\alpha} = \\operatorname{id}$（在重叠处），并且衡量「这块丛歪了多少」。',
        '',
        '若再给定 Lie 群 $G$ 在 $F$ 上的作用，并且总能选平凡化使所有 $g_{\\alpha\\beta}$ 取值落在 $G$ 里，就说这个丛的**结构群**是 $G$。'
      ].join('\n'),
      notes: [
        '**为什么要这个概念**：向量丛是 $F = \\mathbb{R}^{k}$、$G\\subseteq\\operatorname{GL}(k,\\mathbb{R})$ 的特例；覆叠空间是 $F$ 离散的特例；\n\n主丛是 $F = G$ 本身那一个特例。\n\n三件事被这一条统一，判据都是同一句话：**局部长得像「底 $\\times$ 纤维」**。',
        '**「纤维」这个词为什么不分下标也说得通**：局部平凡化在每根纤维上是 $\\{b\\}\\times F$ 上的同胚，所以每根纤维都同胚于 $F$。但**没有自然同胚** —— 沿底空间绕一圈回来可能换掉一个自同胚，这个「绕一圈的变形」（monodromy）是**离散纤维 / 平坦丛**这一类不平凡的来源，但**不是全部原因**：Hopf 丛 $S^{1} \\to S^{3} \\to S^{2}$ 的底单连通（没有非平凡回路），丛仍然不平凡。',
        '⚠️ 光有「每根纤维都同胚于 $F$」**远远不够**：必须有**局部**平凡化。差别就在于「能不能在邻域上一致地选同胚」—— 不能的话纤维照样各自同胚，但丛已经扭了（覆叠空间里最直观：绕一圈换叶）。所以判据必须落在邻域上，不能落在单点上。',
        '⭐ 分类的口径也来自这里：$\\{g_{\\alpha\\beta}\\}$ 模掉「换个平凡化」（即乘上某个上边缘），就是 Čech 的 $H^{1}$（`thm.bundle-classification` 讲向量丛那一支，同一条道理）。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Vector Bundles」· 丛、局部平凡化与转移函数'
      ]
    },

    {
      id: 'def.principal-bundle',
      cluster: 'diffgeom.characteristic',
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
        '⭐ 特例串起来记：主 $G$-丛（纤维 $G$）$\\rightsquigarrow$ 取 $G$ 在某个流形 $F$ 上的作用、把纤维换掉，得**配丛**（纤维 $F$；本图尚未收录）$\\rightsquigarrow$ 取 $F = \\mathbb{R}^{k}$、$G = \\operatorname{GL}(k,\\mathbb{R})$，得向量丛$\\rightsquigarrow$ 取 $F$ 离散，得覆叠空间。\n\n反过来：任何向量丛都有帧丛，都在主丛这一层。',
        '⚠️ 「自由」这一条不能省：若允许 $u\\cdot g = u$ 而 $g\\ne e$，纤维上就有稳定化子，丛在纤维方向上会「粘住」，此时它不再是主丛、而是某个更小的群的主丛（或一般的纤维丛）。',
        ,
        '**各方向用到的假设**（等变局部平凡性比自由作用更强）：\n' +
        '- 主丛 $\\implies$ 所列三条件：定义展开免费；局部图须为光滑且等变的微分同胚。\n' +
        '- 等变局部图 $\\implies$ 每根纤维是自由可迁的 $G$-空间：在 $U\\times G$ 上直接计算，再用图转回，无需选择全局基点。\n' +
        '- 局部光滑截面 $s$ $\\implies$ 局部主丛图：对已知主丛用 $(b,g)\\mapsto s(b)g$；反向由图取 $(b,e)$，不需全局截面。\n' +
        '- 自由作用 $\\implies$ 商为光滑主丛不是免费：通常还要作用 proper；无理斜率的 $\\mathbb R$ 在二维环面上的平移作用自由但轨道稠密，商非 Hausdorff。\n'
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
      note: 'Cartan 公式里的 $\\mathrm{d}$ 作用在 $\\Omega^{k}(M)$ 上，它的良定性就是那条命题的内容。' },

    /* ---------------------------------------------- §D 局部平凡化的接线 */
    { id: 'dep.mf3-triv-topology', kind: 'definition',
      definition: 'def.topology', usedBy: 'def.local-trivialization',
      note: '平凡化里的「开集 $U$」「连续映剔」「同胚」都是拓扑空间的词。' },
    { id: 'dep.mf3-triv-product', kind: 'definition',
      definition: 'def.product-topology', usedBy: 'def.local-trivialization',
      note: '平凡积 $U\\times F$ 就是积拓扑；离开它，「摊平」没有意义。' },
    { id: 'dep.mf3-triv-homeo', kind: 'definition',
      definition: 'def.homeomorphism', usedBy: 'def.local-trivialization',
      note: '局部平凡化的核心要求就是「连 $\\Phi$ 是同胚」—— 光滑情形换成微分同胚。' },

    { id: 'dep.mf3-triv-vbundle', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.vector-bundle',
      note: '向量丛的定义里那条「局部平凡化 $\\Phi : \\pi^{-1}(U)\\to U\\times\\mathbb{R}^{k}$，且在每根纤维上是线性同构」—— 前半句就是这一条，后半句是额外的向量空间结构。' },
    { id: 'dep.mf3-triv-fbundle', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.fiber-bundle',
      note: '纤维丛 = 局部平凡（拓扑的）+ 纤维固定为流形 $F$（光滑的）。' },
    { id: 'dep.mf3-triv-section', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.bundle-section',
      note: '截面的局部表示 $\\sigma : U\\to\\mathbb{R}^{k}$ 就是在平凡化下写出来的。' },
    { id: 'dep.mf3-triv-tbundle', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.tangent-bundle',
      note: '切丛的光滑结构就是靠图卡上的平凡化 $\\Phi : \\pi^{-1}(U)\\to\\varphi(U)\\times\\mathbb{R}^{n}$ 拼出来的。' },
    { id: 'dep.mf3-triv-cotbundle', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.cotangent-bundle',
      note: '余切丛的图卡 $\\Phi : \\pi^{-1}(U)\\to\\varphi(U)\\times\\mathbb{R}^{n}$ 就是它的局部平凡化。' },
    { id: 'dep.mf3-triv-bclass', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'thm.bundle-classification',
      note: '转移函数是「两个平凡化之差」—— 没有平凡化就无从谈起。' },
    { id: 'dep.mf3-triv-bmetric', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'prop.bundle-metric',
      note: '纤维度量是在每块平凡化上先把内积定下来，再用单位分解拼整体。' },
    { id: 'dep.mf3-triv-form', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.form-on-manifold',
      note: '「$\\Omega^{k}(M) = \\Gamma(\\Lambda^{k}T^{\\ast}M)$」这个等价说法能成立，靠的就是外积丛有局部平凡化。' },
    { id: 'dep.mf3-triv-prin', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.principal-bundle',
      note: '主丛的第 3 条就是「局部平凡且 $G$-等变」—— 平凡化这一条加上等变性。' },
    { id: 'dep.mf3-triv-tdist', kind: 'definition',
      definition: 'def.local-trivialization', usedBy: 'def.tangent-distribution',
      note: '「秩 $k$ 分布」的说法就是「切丛的秩 $k$ 子丛」，而子丛的意思要靠在平凡化上取子空间来定义。' },

    /* ----------------------------- §E 审计出来的「定义口径窄于使用者」接线 */
    /* 口径：定义端在 $R^{n}$ / $R^{3}$ 曲面，使用端是流形。处理办法是**加**一条
       流形版的定义边（保留原坐标模型那条），而不是删掉旧的。 */
    { id: 'dep.mf3-vform-form', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'def.volume-form',
      note: '体积形式是 $\\Omega^{n}(M)$ 里处处非零的那个 —— 它的本体是流形上的 $n$-形式，不是 $R^{n}$ 上的（$R^{n}$ 只给出它在卡里的写法）。' },
    { id: 'dep.mf3-vdensity-form', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'def.volume-density',
      note: '体积密度的定义写在黎曼流形 $(M,g)$ 上，用的也是 $M$ 上的形式。' },    { id: 'dep.mf3-lieform-pullback', kind: 'definition',
      definition: 'prop.pullback-form-manifold', usedBy: 'def.left-invariant-form',
      note: '「左不变」是用左平移 $L_{g}$ 的拉回写的：$L_{g}^{\\ast}\\omega = \\omega$，而 $L_{g}$ 是流形之间的光滑映射。' },
    { id: 'dep.mf3-stokes-dmanifold', kind: 'definition',
      definition: 'prop.exterior-derivative-manifold', usedBy: 'thm.stokes',
      note: 'Stokes 定理里的 $\\mathrm{d}$ 是**流形上**的外微分，不是欧氏开集上的坐标公式。' },
    { id: 'dep.mf3-mc-dmanifold', kind: 'definition',
      definition: 'prop.exterior-derivative-manifold', usedBy: 'thm.maurer-cartan',
      note: 'Maurer–Cartan 方程里的 $\\mathrm{d}$ 作用在 Lie 群（流形）上的形式，靠的是流形上的 d。' },
    { id: 'dep.mf3-chainint-form', kind: 'definition',
      definition: 'def.form-on-manifold', usedBy: 'thm.stokes-chain',
      note: '链上积分吃的是 $M$ 上的形式（只在方块上把它拉回到 $R^{k}$ 里算）。' },
    { id: 'dep.mf3-stokes-orientmanifold', kind: 'definition',
      definition: 'def.orientable-manifold', usedBy: 'thm.stokes',
      note: 'Stokes 要的是**可定向的 $n$ 维带边流形**，不是 $R^{3}$ 里的 2 维曲面 —— 曲面只是它是 2 维特例。' },
    { id: 'dep.mf3-bsign-orientmanifold', kind: 'definition',
      definition: 'def.orientable-manifold', usedBy: 'prop.boundary-sign-convention',
      note: '边界符号约定说的是任意维带边流形上「外法向先」的约定，不限于曲面。' }
  ]
});
