/* ==========================================================================
   内容包 · 初等微积分 ⑦：多元微分
   --------------------------------------------------------------------------
   新星团 `analysis.multivariable`（25 点）。这一包造的是**把微分学线性代数化**
   的整套装置，外加你点名要的「逆映射 / 隐函数 / 秩定理」那一块：

     赋范空间 → Banach 空间
     偏导 → 方向导数 → **可微（全微分 = 一个线性映射）** → 梯度 / Jacobi / Hessian
       → 链式法则（矩阵乘法）→ 混合偏导（Schwarz）→ 中值定理 → Taylor
       → 极值判别（Hessian 正定 ⟺ 极小）        ← 与批 4 的二次型接上
     压缩映射 → 压缩映射原理（引擎）
       → 逆映射定理 → 隐函数定理 → 秩定理 → 浸入 / 淹没 / 正则值 / Lagrange / Morse / Sard

   ⭐ 与图上别处的接口：
     · `thm.second-derivative-test` ← `thm.sylvester-criterion`（微积分 × 线代）
     · `def.gradient` ← `def.inner-product` / `def.dual-space`（对偶用内积搬回来）
     · `def.hessian` ← `def.bilinear-form`（二阶导是双线性型）
     · `thm.taylor-multi` ← `def.quadratic-form`
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '初等微积分：多元微分',
  nodes: [

    {
      id: 'def.normed-space',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: '赋范空间',
      title: '赋范空间',
      regions: ['analysis'],
      tags: ['定义', '泛函', '范数'],
      statement: [
        '设 $V$ 是 $K$-向量空间（$K = \\mathbb{R}$ 或 $\\mathbb{C}$）。映射 $\\|\\cdot\\| : V \\to \\mathbb{R}$ 叫 $V$ 上的**范数**，当且仅当对一切 $v, w \\in V$、$c \\in K$：',
        '',
        '$$\\|v\\| \\ge 0, \\qquad \\|v\\| = 0 \\iff v = 0; \\qquad \\|cv\\| = |c|\\,\\|v\\|; \\qquad \\|v + w\\| \\le \\|v\\| + \\|w\\|$$',
        '',
        '配了范数的 $V$ 叫**赋范空间**。它按 $d(v, w) := \\|v - w\\|$ 成为度量空间，于是「收敛」「连续」「完备」「紧」这些说法全都继承过来。'
      ].join('\n'),
      notes: '⭐ 范数是「长度」的公理化。三条公理里**只有三角不等式不是逐点的** —— 它管的是「能不能绕路」，也正是它把范数与凸性绑在一起（单位球是凸的）。\n\n⭐ 与内积的关系是单向的：内积 $\\implies$ 范数（`def.induced-norm`），但范数来自内积**当且仅当**满足**平行四边形法则** $\\|v+w\\|^{2} + \\|v-w\\|^{2} = 2\\|v\\|^{2} + 2\\|w\\|^{2}$。所以「有长度」比「有夹角」弱。\n\n⚠ 有限维时所有范数**等价**（诱导同一个拓扑、同一套收敛列）；无限维则不然 —— 这正是泛函分析开始变难的地方。\n\n⭐ 本图在凝聚态那一片另有 `def.semi-normed-ab-group`（半范数阿贝尔群）：那里的系数不是向量空间而是拓扑阿贝尔群，所以只能要半范数。',
      refs: ['Rudin, Functional Analysis, Ch. 1', 'Lang, Real and Functional Analysis, Ch. I']
    },
    {
      id: 'def.banach-space',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: 'Banach 空间',
      title: 'Banach 空间（完备赋范空间）',
      regions: ['analysis'],
      tags: ['定义', '泛函', '完备'],
      statement: [
        '赋范空间 $V$ 叫**完备**的，当且仅当它按度量 $d(v, w) = \\|v - w\\|$ 完备（`def.complete`），即每个 Cauchy 列都收敛。完备的赋范空间叫 **Banach 空间**。'
      ].join('\n'),
      notes: '⭐ 三个标准范例：$\\mathbb{R}^{n}$（完备性就是 `thm.real-complete-metric` 的有限维版本）、$L^{p}$（`thm.lp-banach`，Riesz–Fischer）、紧 Hausdorff 空间上的 $C(S)$ 配上确界范数。\n\n⚠ 完备性不是自动的：$C[0, 1]$ 配上 $\\|f\\|_{1} = \\int_0^1 |f|$ **不**完备（可以逼近出不连续函数）。同一批函数换个范数就完备、换回来就不完备 —— 「完备」是范数的性质，不是集合的性质。\n\n⭐ 完备性是下面压缩映射原理的引擎（`thm.banach-fixed-point`）：没有它只能拿到 Cauchy 列，拿不到不动点。整条「逆映射定理」的构造性证明都靠这一条撑着。',
      refs: ['Rudin, Functional Analysis, Ch. 1', 'Zeidler, Nonlinear Functional Analysis I, Ch. 1']
    },

    {
      id: 'def.partial-derivative',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: '偏导数',
      title: '偏导数',
      regions: ['analysis'],
      tags: ['定义', '微积分', '多元'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 是开集，$f : U \\to \\mathbb{R}^{m}$，$a \\in U$。$f$ 在 $a$ 处关于第 $j$ 个变元的**偏导数**是（若该极限存在）',
        '',
        '$$\\frac{\\partial f}{\\partial x_j}(a) := \\lim_{h \\to 0} \\frac{f(a + h e_j) - f(a)}{h}$$',
        '',
        '其中 $e_j$ 是第 $j$ 个标准基向量。也就是说，**只让第 $j$ 个坐标动**，其余固定，就是一个一元导数。',
        '',
        '高阶偏导写成 $\\partial^{\\alpha} f = \\partial_1^{\\alpha_1} \\cdots \\partial_n^{\\alpha_n} f$（$\\alpha = (\\alpha_1, \\ldots, \\alpha_n)$ 是多重指标，$|\\alpha| = \\alpha_1 + \\cdots + \\alpha_n$）。'
      ].join('\n'),
      notes: '⚠ 偏导数存在**什么也保证不了**：$f(x, y) = xy/(x^{2} + y^{2})$（原点补 $f(0,0) = 0$）在原点两个偏导都存在（都等于 $0$），但沿 $y = x$ 趋近时 $f \\to 1/2 \\ne f(0,0)$ —— 它连**连续**都不成立。\n\n⭐ 病根是一个不对称：偏导存在是 $2n$ 个**一维**条件，而可微（`def.total-differential`）是**一个** $n$ 维条件。一维条件再多也堆不出 $n$ 维结论。\n\n⭐ 反过来，$C^{1}$（偏导存在**且连续**）就足以推出可微 —— 这条是实践中最常用的充分条件，证明见 `def.total-differential` 的说明。\n\n⭐ 在 $\\mathbb{R}^n$ 这种「坐标里长出来的空间」上偏导是免费的；到了**流形**或 **Banach 空间**上，「坐标」本身要先花力气造出来，那时才有方向导数与可微性的讨论。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'def.directional-derivative',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: '方向导数',
      title: '方向导数',
      regions: ['analysis'],
      tags: ['定义', '微积分', '多元'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}^{m}$，$a \\in U$，$v \\in \\mathbb{R}^{n}$。$f$ 在 $a$ 沿方向 $v$ 的**方向导数**是（若该极限存在）',
        '',
        '$$D_v f(a) := \\lim_{t \\to 0} \\frac{f(a + t v) - f(a)}{t}$$',
        '',
        '即「从 $a$ 出发沿直线 $t \\mapsto a + t v$ 走」的瞬时变化率。'
      ].join('\n'),
      notes: '⭐ 偏导是特例：$\\frac{\\partial f}{\\partial x_j}(a) = D_{e_j} f(a)$。\n\n⚠ 两个不等式要记牢：\n- **所有**方向导数都存在，**不**蕴含连续（更不蕴含可微）。经典反例 $f(x, y) = x^{2}y/(x^{4} + y^{2})$，原点补 $0$：沿每条直线 $y = mx$ 有 $f \\to 0$，故一切方向导数存在且为 $0$；但沿抛物线 $y = x^{2}$ 有 $f \\equiv 1/2$，故 $f$ 在原点不连续。\n- **可微** $\\implies$ 一切方向导数存在，且 $v \\mapsto D_v f(a)$ 是**线性**的，等于 $Df(a)(v)$。\n\n⭐ 于是两者的真正区别是：可微要求「$v \\mapsto D_v f(a)$ 线性」，而逐点存在只要求每条直线上的极限存在。多元微积分里一切「反例」几乎都是在这条缝里做文章。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'def.total-differential',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: '可微与全微分',
      title: '可微与全微分',
      regions: ['analysis'],
      tags: ['定义', '微积分', '多元'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}^{m}$，$a \\in U$。称 $f$ 在 $a$ **可微**，当且仅当存在**线性映射** $L : \\mathbb{R}^{n} \\to \\mathbb{R}^{m}$ 使',
        '',
        '$$f(a + h) = f(a) + L(h) + o(\\|h\\|) \\qquad (\\|h\\| \\to 0)$$',
        '',
        '这样的 $L$ 若存在则**唯一**，记 $Df(a)$，叫 $f$ 在 $a$ 的**导数**（也叫**全微分**）。',
        '',
        '由偏导定义的线性映射「$h \\mapsto \\bigl(\\sum_j \\partial_j f_i(a)\\, h_j\\bigr)_i$」在偏导连续时就是 $Df(a)$；$f$ 在 $U$ 上各偏导存在且连续时记 $f \\in C^{1}(U)$。'
      ].join('\n'),
      notes: '⭐ 全微分的实质是**一个线性映射**（`def.linear-map`），不是「一列偏导数」。偏导只是它在标准基下的矩阵（`def.jacobian`）—— 把 $Df(a)$ 想成矩阵会丢掉「换坐标后怎么办」这个最关键的信息。\n\n**唯一性**：若 $L_1, L_2$ 都满足，则 $(L_1 - L_2)(h) = o(\\|h\\|)$。取 $h = tv$（$v \\ne 0$）除以 $t$ 令 $t \\to 0$，得 $(L_1 - L_2)(v) = 0$，故 $L_1 = L_2$。∎\n\n**$C^{1} \\implies$ 可微**：取 $L$ 为偏导矩阵。沿坐标方向逐段用一元中值定理（`thm.mvt`）：把 $h$ 拆成 $n$ 步、每步只动一个坐标，每次得到一个 $O(|h_j|)$ 的余项，累加得余项 $O(\\|h\\|) \\to 0$。∎\n\n⚠ **与 `def.rn-derivative` 必须分清**：那一条里的「$\\mathbb{R}^{n}$ 导数」是 Radon–Nikodym 意义的**密度** $\\frac{d\\nu}{d\\mu}$（测度比），与这里的全微分**同名不同物**，两者之间没有一般关系。\n\n⭐ 层级一览：可微 $\\implies$ 连续，可微 $\\implies$ 一切方向导数存在，可微 $\\implies$ 一切偏导存在；三个反过来的箭头都不成立（反例见 `def.partial-derivative` 与 `def.directional-derivative`）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2', 'Lang, Undergraduate Analysis, Ch. XVI']
    },
    {
      id: 'def.gradient',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: '梯度',
      title: '梯度',
      regions: ['analysis'],
      tags: ['定义', '微积分', '多元'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}$ 在 $a$ 可微。则 $Df(a)$ 是 $\\mathbb{R}^{n} \\to \\mathbb{R}$ 的线性映射，即对偶空间 $(\\mathbb{R}^{n})^{\\ast}$ 中的元素。由 $\\mathbb{R}^{n}$ 的标准内积与 Riesz 表示，存在**唯一**的 $\\nabla f(a) \\in \\mathbb{R}^{n}$ 使',
        '',
        '$$Df(a)(v) = \\langle \\nabla f(a),\\ v \\rangle \\qquad (v \\in \\mathbb{R}^{n})$$',
        '',
        '它叫 $f$ 在 $a$ 的**梯度**。在标准内积与标准基下',
        '',
        '$$\\nabla f(a) = \\bigl( \\partial_1 f(a), \\ldots, \\partial_n f(a) \\bigr)^{\\mathsf{T}}$$'
      ].join('\n'),
      notes: '⭐ 一句话：**梯度是把对偶向量用内积「搬回来」的产物**。$Df(a)$ 天生住在对偶空间 $(\\mathbb{R}^{n})^{\\ast}$ 里，而「搬回来」需要一个内积 —— 换个内积，同一个 $Df(a)$ 就给出**不同**的梯度向量。\n\n⭐ 这也是微分几何里必须区分 $df$（余切向量）与 $\\nabla f$（切向量）的原因：$df$ 不依赖任何度量，$\\nabla f$ 依赖。\n\n⭐ 几何内容（都靠 Cauchy–Schwarz，`thm.cauchy-schwarz`）：\n- $D_v f(a) = \\langle \\nabla f(a), v \\rangle$；\n- 在**单位**方向里，$v = \\nabla f(a)/\\|\\nabla f(a)\\|$ 给出最大的方向导数 $\\|\\nabla f(a)\\|$（上升最快）；\n- $\\nabla f(a)$ 垂直于过 $a$ 的等值面 $\\{f = c\\}$（因为沿等值面的方向导数为零）。\n\n⚠ 「梯度指向上升最快」只在**标准内积**下成立；换了内积，「最快」要按那个内积重新度量（这也是最优化里预处理 / 牛顿法的出发点）。',
      refs: ['Spivak, Calculus on Manifolds, Ch. 2', 'Rudin, Principles of Mathematical Analysis, Ch. 9']
    },
    {
      id: 'def.jacobian',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: 'Jacobi 矩阵',
      title: 'Jacobi 矩阵',
      regions: ['analysis'],
      tags: ['定义', '微积分', '线性代数'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f = (f_1, \\ldots, f_m) : U \\to \\mathbb{R}^{m}$ 在 $a$ 处各偏导都存在。$f$ 在 $a$ 的 **Jacobi 矩阵**是',
        '',
        '$$J_f(a) := \\Bigl( \\frac{\\partial f_i}{\\partial x_j}(a) \\Bigr)_{\\substack{1 \\le i \\le m \\\\ 1 \\le j \\le n}} \\in M_{m \\times n}(\\mathbb{R})$$',
        '',
        '若 $f$ 在 $a$ 可微，则 $J_f(a)$ 正是线性映射 $Df(a)$ 在标准基下的矩阵。'
      ].join('\n'),
      notes: '⭐ 链式法则的矩阵形式就是**矩阵乘法**：$J_{g \\circ f}(a) = J_g(f(a))\\, J_f(a)$（`thm.chain-rule-multi`）。线性映射的复合对应矩阵乘法 —— 全微分做的就是把这条线性代数的事实搬进微积分。\n\n⭐ 三个特殊情形值得记住：\n- $n = 1$：$J$ 是一列，即曲线的切向量；\n- $m = 1$：$J$ 是一行，即 $(\\nabla f)^{\\mathsf{T}}$；\n- $m = n$：$\\det J_f(a)$ 是**局部体积缩放因子**（`cor.jacobian-volume`）。\n\n⚠ 记号约定：有些书把 Jacobi 矩阵写成转置（把它们把 $Df$ 当列向量存）。本图一律**行对应像空间坐标、列对应定义域坐标**，于是链式法则是「从左往右乘」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'def.hessian',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: 'Hessian 矩阵',
      title: 'Hessian 矩阵',
      regions: ['analysis'],
      tags: ['定义', '微积分', '线性代数'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}$ 在 $a$ 的二阶偏导都存在。**Hessian 矩阵**是',
        '',
        '$$H_f(a) := \\Bigl( \\frac{\\partial^{2} f}{\\partial x_i \\,\\partial x_j}(a) \\Bigr)_{1 \\le i, j \\le n} \\in M_n(\\mathbb{R})$$',
        '',
        '若 $f \\in C^{2}$，则 $H_f(a)$ 是**对称**矩阵。'
      ].join('\n'),
      notes: '⭐ $H_f(a)$ 就是二阶导数 $D^{2} f(a)$ 写成矩阵 —— 而 $D^{2}f(a)$ 本身是 $\\mathbb{R}^{n}$ 上的**对称双线性型**（`def.bilinear-form`），$H_f$ 只是它在标准基下的系数。$f \\in C^{2}$ 时对称性来自 Schwarz 定理（`thm.mixed-partials`）。\n\n⭐ 对称矩阵可以**正交对角化**（`thm.spectral-theorem`），对角元是特征值；于是「$H$ 正定 / 负定 / 不定」就是判极值用的那把尺（`thm.sylvester-criterion`）。这一步是「微积分 $\\times$ 线性代数」在本科阶段最漂亮的一次交汇。\n\n⭐ 进一步：$\\det H_f(a) \\ne 0$ 的临界点叫**非退化临界点**，负特征值个数叫 **Morse 指数** —— 它完全决定临界点附近的局部形状（`thm.morse-lemma`）。\n\n⚠ Hessian 依赖坐标（$H$ 不是张量，换坐标后不变的是**惯性指数**）：线性换基 $x = P u$ 时 $H \\mapsto P^{\\mathsf{T}} H P$，故正定性、负定性、指数都不变（Sylvester 惯性定律），而具体元素会变。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Milnor, Morse Theory, §2']
    },

    {
      id: 'thm.chain-rule-multi',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '多元链式法则',
      title: '定理：链式法则 $D(g \\circ f) = Dg \\cdot Df$',
      regions: ['analysis'],
      tags: ['定理', '微积分', '多元'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$、$V \\subseteq \\mathbb{R}^{m}$ 开，$f : U \\to V$ 在 $a \\in U$ 可微，$g : V \\to \\mathbb{R}^{p}$ 在 $b = f(a)$ 可微。则复合 $g \\circ f$ 在 $a$ 可微，且',
        '',
        '$$D(g \\circ f)(a) = Dg\\bigl(f(a)\\bigr) \\circ Df(a)$$',
        '',
        '写成矩阵就是',
        '',
        '$$J_{g \\circ f}(a) = J_g\\bigl(f(a)\\bigr)\\, J_f(a)$$'
      ].join('\n'),
      notes: '⭐ 整条定理就是一句话：**微分的链式法则是线性映射的复合**。矩阵形式只是选好基之后的写法 —— 所以「链式法则 = 矩阵乘法」不是巧合，而是定义使然。\n\n⚠ 证明里有一个真陷阱：不能就此写下 $Dg(f(a + h)) = Dg(f(a)) + O(h)$。因为 $f(a + h) - f(a)$ 本身是 $O(\\|h\\|)$ 的量，$g$ 在 $f(a)$ 处的 $o(\\|k\\|)$（$k = f(a+h) - f(a)$）必须显式换成 $o(\\|h\\|)$，这一步要用 $\\|k\\| \\le (\\|Df(a)\\| + 1)\\|h\\|$（$h$ 小的时候）。证明全文在边上。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'thm.mixed-partials',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '混合偏导相等',
      title: '定理（Schwarz）：混合偏导数与次序无关',
      regions: ['analysis'],
      tags: ['定理', '微积分', '多元'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}$ 的二阶偏导 $\\partial_i \\partial_j f$ 与 $\\partial_j \\partial_i f$ 都在 $a$ 的某邻域里存在，且在 $a$ 处连续。则',
        '',
        '$$\\partial_i \\partial_j f(a) = \\partial_j \\partial_i f(a)$$',
        '',
        '特别地，$f \\in C^{2}$ 时 $H_f(a)$ 是对称矩阵。'
      ].join('\n'),
      notes: '⭐ 这条定理把「二阶偏导有 $n^{2}$ 个」压成「$\\binom{n+1}{2}$ 个」—— 它正是 Hessian 对称性的全部来源，也是多元 Taylor 公式里 $D^{2}f$ 能写成**对称**双线性型的原因。\n\n⚠ **连续性不能去**：$f(x,y) = xy(x^{2}-y^{2})/(x^{2}+y^{2})$（原点补 $0$）满足 $\\partial_1\\partial_2 f(0,0) = 1 \\ne -1 = \\partial_2\\partial_1 f(0,0)$。连续性保证的不是「能换序」本身，而是「换序不产生跳变」。\n\n⭐ 证明的路子（全文在边上）：把 $f$ 的一个**二阶差分** $\\Delta = f(a + he_i + ke_j) - f(a + he_i) - f(a + ke_j) + f(a)$ 用一元中值定理按两种顺序各算一遍，得到两个「二阶偏导在某个中间点取值」的表达式，再令 $h, k \\to 0$ 用连续性取极限。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'thm.mean-value-multi',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '多元中值定理',
      title: '定理：多元中值定理与中值不等式',
      regions: ['analysis'],
      tags: ['定理', '微积分', '多元'],
      statement: [
        '**中值定理**：设 $f : U \\to \\mathbb{R}$ 在开集 $U \\subseteq \\mathbb{R}^{n}$ 上可微，$a, a + h \\in U$ 且线段 $[a, a+h] \\subset U$。则存在 $\\theta \\in (0, 1)$ 使',
        '',
        '$$f(a + h) - f(a) = Df(a + \\theta h)(h)$$',
        '',
        '**中值不等式**：若 $f : U \\to \\mathbb{R}^{m}$ 可微，则',
        '',
        '$$\\|f(a + h) - f(a)\\| \\le \\Bigl( \\sup_{[a, a+h]} \\|Df\\| \\Bigr) \\|h\\|$$'
      ].join('\n'),
      notes: '⭐ 一维中值定理靠 Rolle，Rolle 靠「连续函数在闭区间取到最值」—— 而**多元没有这一条**（等号版本对 $\\mathbb{R}^{m}$ 值函数是**假**的：$f(t) = (\\cos t, \\sin t)$ 绕一圈，$f(2\\pi) - f(0) = 0$，但 $Df$ 处处非零、$\\|Df\\| = 1$）。\n\n⭐ 所以多元真正好用的是**不等式版本**：它只需要「沿线段用一元中值定理 + 范数估计」，不需要任何最值存在性。后面压缩映射原理与逆映射定理用的全是它。\n\n⚠ 标量情形（$f$ 值域是 $\\mathbb{R}$）的等号版本要好小心：通常的证法是对 $\\varphi(t) = f(a + th)$ 用一维 MVT，得到的是「存在 $\\theta$ 使 $f(a+h) - f(a) = Df(a + \\theta h)(h)$」—— 这里的 $\\theta$ 依赖于 $h$，不能当成常数用。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Lang, Undergraduate Analysis, Ch. XVI']
    },
    {
      id: 'thm.taylor-multi',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '多元 Taylor 公式',
      title: '定理：多元 Taylor 公式',
      regions: ['analysis'],
      tags: ['定理', '微积分', '多元'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}$ 是 $C^{k+1}$，$a \\in U$。则对 $h$ 充分小，',
        '',
        '$$f(a + h) = \\sum_{|\\alpha| \\le k} \\frac{D^{\\alpha} f(a)}{\\alpha!}\\, h^{\\alpha} + R_k(h)$$',
        '',
        '其中余项可写成（某个 $\\theta \\in (0,1)$）',
        '',
        '$$R_k(h) = \\sum_{|\\alpha| = k+1} \\frac{D^{\\alpha} f(a + \\theta h)}{\\alpha!}\\, h^{\\alpha} = O\\bigl(\\|h\\|^{k+1}\\bigr)$$',
        '',
        '最常用的两档：',
        '',
        '$$f(a+h) = f(a) + Df(a)(h) + o(\\|h\\|)$$',
        '',
        '$$f(a+h) = f(a) + Df(a)(h) + \\frac{1}{2}\\, D^{2}f(a)(h, h) + o\\bigl(\\|h\\|^{2}\\bigr)$$'
      ].join('\n'),
      notes: '⭐ 关键观察：**二阶导数 $D^{2}f(a)$ 是 $\\mathbb{R}^{n}$ 上的对称双线性型**（`def.bilinear-form`），不是「一堆二阶偏导」。$k = 2$ 的公式里 $D^{2}f(a)(h,h)$ 就是 $\\sum_{i,j} \\partial_i \\partial_j f(a)\\, h_i h_j = h^{\\mathsf{T}} H_f(a)\\, h$。\n\n⭐ 于是多元 Taylor 与线性代数直接对上：$h^{\\mathsf{T}} H h$ 是一个**二次型**（`def.quadratic-form`），而二次型的正定性有现成判据（`thm.sylvester-criterion`）—— 极值判别（`thm.second-derivative-test`）就是这条公式加那个判据。\n\n⚠ 证明的坑：对 $t \\mapsto f(a + th)$ 用一元 Taylor 只给出**沿一条线**的展开，而且余项里的 $\\theta$ 依赖 $h$。要对所有 $h$ 一致，得对 $k$ 归纳、把余项写成多重指标求和，每一层用一次一元 MVT（或对 $h$ 的坐标迭代）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Lang, Undergraduate Analysis, Ch. XVI']
    },
    {
      id: 'thm.second-derivative-test',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '极值判别（Hessian 判据）',
      title: '定理：二阶导数判别法（Hessian 判据）',
      regions: ['analysis'],
      tags: ['定理', '微积分', '线性代数'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}$ 是 $C^{2}$，$a \\in U$ 是**临界点**（$\\nabla f(a) = 0$）。则',
        '',
        '- $H_f(a)$ **正定** $\\implies$ $a$ 是 $f$ 的局部严格极小点；',
        '- $H_f(a)$ **负定** $\\implies$ $a$ 是 $f$ 的局部严格极大点；',
        '- $H_f(a)$ **不定**（同时有正、负特征值）$\\implies$ $a$ 既非局部极小也非局部极大（**鞍点**）；',
        '- $H_f(a)$ 半定或退化（有零特征值）$\\implies$ **本判据失效**，需要更高阶的信息。'
      ].join('\n'),
      notes: '⭐ 这是「微积分 $\\times$ 线性代数」在本科阶段最漂亮的一次交汇：**判极值 = 判二次型正定**，而后者有现成的算法（`thm.sylvester-criterion` 的顺序主子式，或 `thm.spectral-theorem` 的特征值符号）。\n\n⚠ 「半定」那一档真的没有结论，两个反例：\n- $f = x^{4} + y^{4}$ 在原点 $H = 0$（半定），但原点是严格极小；\n- $f = x^{4} - y^{4}$ 在原点同样 $H = 0$，但原点是鞍点。\n所以判据失效不是「证法不够好」，而是信息真的不足。\n\n⚠ 反过来，正定只给**局部**极小：$f(x) = x^{2}(1 + x^{2})$ 在原点正定但整体有别的极小点。\n\n证明全文在边上（$k=2$ 的 Taylor + 正定二次型的估计 $h^{\\mathsf{T}}Hh \\ge \\lambda_{\\min}\\|h\\|^{2}$；不定那一档用正负特征向量各走一步）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },

    {
      id: 'def.contraction',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: '压缩映射',
      title: '压缩映射',
      regions: ['analysis'],
      tags: ['定义', '度量空间', '不动点'],
      statement: [
        '设 $(X, d)$ 是度量空间，$T : X \\to X$。$T$ 叫**压缩映射**，当且仅当存在常数 $q \\in [0, 1)$ 使',
        '',
        '$$d(Tx, Ty) \\le q\\, d(x, y) \\qquad (x, y \\in X)$$',
        '',
        '最小的这样的 $q$ 叫 $T$ 的**压缩系数**。（$q = 1$ 时叫非扩张映射，那时结论会变。）'
      ].join('\n'),
      notes: '⚠ 关键是 $q < 1$ 必须**一致**成立，而不是「每点附近小于 $1$」。反例：$f(x) = x + 1/x$ 在 $[1, \\infty)$ 上满足 $|f\'(x)| = 1 - 1/x^{2} < 1$ 处处成立，但它**不是**压缩映射，也**没有**不动点（$f(x) = x$ 无解）。「每点局部收缩」与「整体一致收缩」的差别就是这条定理的生死线。\n\n⭐ 压缩 $\\implies$ 一致连续（`def.uniform-continuity`），比连续强得多；而且 Lipschitz 常数就是 $q$。\n\n⭐ 压缩映射是**唯一**一类「存在性证明顺带给出算法与误差估计」的定理（见 `thm.banach-fixed-point`）—— 这是它在分析里地位极高的原因：逆映射定理、隐函数定理、常微分方程的 Picard–Lindelöf 定理、Bellman 方程，全都把它当引擎。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Zeidler, Nonlinear Functional Analysis I, Ch. 1']
    },
    {
      id: 'thm.banach-fixed-point',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '压缩映射原理',
      title: '定理（Banach）：完备度量空间上的压缩映射有唯一不动点',
      regions: ['analysis'],
      tags: ['定理', '度量空间', '不动点', '完备'],
      statement: [
        '设 $(X, d)$ 是**完备**度量空间（`def.complete`），$T : X \\to X$ 是以 $q < 1$ 为系数的压缩映射（`def.contraction`）。则',
        '',
        '- $T$ 有**唯一**不动点 $x^{\\ast} \\in X$（即 $Tx^{\\ast} = x^{\\ast}$）；',
        '- 对**任意**初值 $x_0 \\in X$，迭代列 $x_{k+1} := T x_k$ 收敛到 $x^{\\ast}$；',
        '- 并有先验误差估计与后验误差估计',
        '',
        '$$d(x_k, x^{\\ast}) \\le \\frac{q^{k}}{1 - q}\\, d(x_0, x_1), \\qquad d(x_k, x^{\\ast}) \\le \\frac{q}{1 - q}\\, d(x_k, x_{k-1})$$'
      ].join('\n'),
      notes: '⭐ 这是分析里罕见的**三合一**定理：它同时给出存在性、唯一性**和算法**（迭代）**与误差估计**。绝大多数存在性定理只说「有」，这一条说「怎么找、找多准」。\n\n⚠ 两个前提都不能去：\n- 去掉**完备性**：$(0,1]$ 不完备，$T(x) = x/2$ 是压缩，但不动点 $0$ 不在空间里；\n- 去掉 $q < 1$：`def.contraction` 里的 $x + 1/x$ 就是反例。\n\n⭐ 用它的标准套路（后面两条大定理都用）：把「解方程 $f(x) = y$」改写成「找 $\\Phi_y$ 的不动点」，其中 $\\Phi_y(x) := x - f(x) + y$ 在小球上是压缩 —— 于是「解存在」变成「球完备 + 压缩」。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Zeidler, Nonlinear Functional Analysis I, Ch. 1']
    },

    {
      id: 'thm.inverse-function',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '逆映射定理',
      title: '定理（逆映射定理）：$Df(a)$ 可逆 $\\implies$ 局部可逆',
      regions: ['analysis'],
      tags: ['定理', '微积分', '多元', '反函数'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}^{n}$ 是 $C^{1}$，$a \\in U$ 且 $Df(a)$ **可逆**。则存在 $a$ 的开邻域 $V \\subseteq U$ 与 $f(a)$ 的开邻域 $W$ 使',
        '',
        '$$f\\bigl|_{V} : V \\to W \\quad \\text{是双射}$$',
        '',
        '且其逆 $g := (f\\bigl|_{V})^{-1} : W \\to V$ 也是 $C^{1}$，并且对一切 $y \\in W$',
        '',
        '$$Dg(y) = \\bigl( Df(g(y)) \\bigr)^{-1}$$'
      ].join('\n'),
      notes: '⭐ 定理的形状值得记：**局部可逆 $\\iff$ $Df(a)$ 可逆**，而且「逆映射的导数 = 导数的逆」。后半句完全是线性代数的操作 —— 一旦把 $f$ 局部看成「线性映射加高阶小量」，求逆自然落在 $Df$ 上。\n\n⚠ 「局部」不能去掉。$f(x, y) = (e^{x}\\cos y,\\ e^{x}\\sin y)$ 的 $\\det Df = e^{2x} \\ne 0$ 处处成立，但 $f$ 整体远非单射（$y$ 有周期 $2\\pi$）。\n\n⚠ 定理只保证 $C^{1}$；但由 $Dg = (Df \\circ g)^{-1}$ 立即得：$f$ 光滑 $\\implies$ $g$ 光滑（$Df\\circ g$ 光滑、求逆是光滑运算）。这就是「$f$ 是微分同胚 $\\implies$ $f^{-1}$ 也是」。\n\n⭐ 定理顺带说明了 $f$ 是**开映射**（把开集 $V$ 映成开集 $W$）—— 这一点在有限维是免费的，在 Banach 空间里要靠开映射定理另行处理。\n\n⚠ 与 `thm.regular-value`、`cor.rank-theorem` 是一个家族：秩定理说「常秩映射局部只有标准形」，逆映射定理是 $r = n = m$ 的特例。\n\n证明全文在边上（化归到 $Df(a) = I$，用压缩映射原理造出 $f$ 的局部逆，再从 $f \\circ g = \\mathrm{id}$ 反解 $Dg$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2', 'Lang, Undergraduate Analysis, Ch. XVI']
    },
    {
      id: 'thm.implicit-function',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '隐函数定理',
      title: '定理（隐函数定理）：$D_y F$ 可逆 $\\implies$ 局部能解出 $y = g(x)$',
      regions: ['analysis'],
      tags: ['定理', '微积分', '多元', '隐函数'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n} \\times \\mathbb{R}^{m}$ 开，$F : U \\to \\mathbb{R}^{m}$ 是 $C^{1}$，$(a, b) \\in U$ 满足',
        '',
        '$$F(a, b) = 0, \\qquad D_y F(a, b) \\in M_m(\\mathbb{R})\\ \\text{可逆}$$',
        '',
        '（$D_y F$ 指只对后 $m$ 个变元求导的偏导数矩阵。）则存在 $a$ 的开邻域 $V \\subseteq \\mathbb{R}^{n}$ 与**唯一**的 $C^{1}$ 映射 $g : V \\to \\mathbb{R}^{m}$ 使',
        '',
        '$$g(a) = b, \\qquad F\\bigl(x,\\ g(x)\\bigr) = 0 \\quad (x \\in V)$$',
        '',
        '并且',
        '',
        '$$Dg(x) = - \\bigl( D_y F(x, g(x)) \\bigr)^{-1} D_x F(x, g(x))$$'
      ].join('\n'),
      notes: '⭐ 一句话：**方程 $F(x, y) = 0$ 在 $D_yF$ 可逆处可以唯一地解出 $y = g(x)$，而且解出来的映射自动是 $C^{1}$**。这就是「隐函数」这个名字的全部内容 —— 它把「隐式地由方程确定」变成了「真的存在一个函数」。\n\n⭐ 它是**逆映射定理的换装**：把 $F$ 拼成 $\\Phi(x, y) := (x, F(x, y))$，则 $D\\Phi$ 是块上三角矩阵，$\\det D\\Phi = \\det D_y F$，故可逆性等价；而 $\\Phi$ 的逆必然是形状 $(x, y) \\mapsto (x, h(x, y))$，取 $g(x) := h(x, 0)$ 就得到要的隐函数。两个定理是同一件事的两种说法。\n\n⚠ $D_yF$ 可逆这个条件**本质**：$F(x, y) = x^{2} - y^{2}$ 在 $(0,0)$ 处 $D_yF = 0$，方程 $x^{2} = y^{2}$ 在原点附近解不出唯一的 $y = g(x)$（有 $y = \\pm x$ 两支）。\n\n⭐ $Dg$ 的公式不必背：对 $F(x, g(x)) = 0$ 两边求导、用链式法则即可 —— $D_xF + D_yF \\cdot Dg = 0$，解出 $Dg$。\n\n证明全文在边上。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'thm.inverse-function-banach',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '逆映射定理（Banach 版）',
      title: '定理：Banach 空间上的逆映射定理',
      regions: ['analysis'],
      tags: ['定理', '泛函', 'Banach', '反函数'],
      statement: [
        '设 $E, F$ 是 **Banach 空间**（`def.banach-space`），$U \\subseteq E$ 开，$f : U \\to F$ 是 $C^{1}$（Fréchet 意义：全微分 $Df(x) \\in \\mathcal{L}(E, F)$ 存在且连续），$a \\in U$ 且',
        '',
        '$$Df(a) : E \\to F \\quad \\text{是拓扑线性同构（有界且逆有界）}$$',
        '',
        '则存在 $a$ 的邻域 $V$ 与 $f(a)$ 的邻域 $W$，使 $f|_{V} : V \\to W$ 是同胚，逆映射 $g$ 是 $C^{1}$，且 $Dg(y) = (Df(g(y)))^{-1}$。'
      ].join('\n'),
      notes: '⭐ 与有限维版本（`thm.inverse-function`）的差别**只有一处，但很关键**：有限维时「$Df(a)$ 可逆」自动蕴含「逆有界」（有限维空间上的线性映射自动有界，故可逆即有界逆）；**无限维时必须把它写进条件**。「拓扑线性同构」= 线性双射 + 逆连续，缺一不可。\n\n⭐ 证明比有限维多两步，都是 Banach 空间特有的：\n- **Neumann 级数**：$\\|S\\| < 1$ 时 $(I - S)^{-1} = \\sum_{k \\ge 0} S^{k}$（级数在算子范数下收敛，靠的是 $\\mathcal{L}(E, F)$ 的完备性）。这一步把「接近恒等的算子」求逆，是化归 $Df(a) = I$ 的关键；\n- **中值不等式**：$\\|f(x) - f(y)\\| \\le \\sup_{[x,y]} \\|Df\\| \\cdot \\|x - y\\|$（`thm.mean-value-multi`），用来把 $\\Phi_y$ 弄成压缩映射。\n\n⚠ 这是**泛函分析 / 凝聚态数学真正用的形式**：那里的对象是 $C(S)$、$L^{p}$、Fréchet 空间、紧 Hausdorff 上的连续函数群，有限维版本不够用（例如 8.2 节里 $C(S, M)$ 的局部同构论证）。',
      refs: ['Lang, Real and Functional Analysis, Ch. I', 'Zeidler, Nonlinear Functional Analysis I, Ch. 4']
    },
    {
      id: 'thm.implicit-function-banach',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '隐函数定理（Banach 版）',
      title: '定理：Banach 空间上的隐函数定理',
      regions: ['analysis'],
      tags: ['定理', '泛函', 'Banach', '隐函数'],
      statement: [
        '设 $E, F, G$ 是 Banach 空间，$U \\subseteq E \\times F$ 开，$F_0 : U \\to G$ 是 $C^{1}$，$(a, b) \\in U$ 满足 $F_0(a, b) = 0$ 且偏导',
        '',
        '$$D_y F_0(a, b) : F \\to G \\quad \\text{是拓扑线性同构}$$',
        '',
        '则存在 $a$ 的邻域 $V \\subseteq E$ 与唯一的 $C^{1}$ 映射 $g : V \\to F$ 使 $g(a) = b$、$F_0(x, g(x)) = 0$，且',
        '',
        '$$Dg(x) = -\\bigl( D_y F_0(x, g(x)) \\bigr)^{-1} D_x F_0(x, g(x))$$'
      ].join('\n'),
      notes: '⭐ 证明与有限维版本**逐字相同**：令 $\\Phi(x, y) := (x, F_0(x, y))$，则 $D\\Phi$ 是块上三角、$D\\Phi$ 拓扑同构 $\\iff$ $D_y F_0$ 拓扑同构，对 $\\Phi$ 用 Banach 版逆映射定理（`thm.inverse-function-banach`）即可。\n\n⭐ 这一步说明了为什么「逆映射」与「隐函数」在图上应当分开建节点却共用一个证明：它们在**范畴层面是同一件事**（$\\Phi$ 是把隐函数问题打包成逆映射问题的函子式构造），只是包装不同。\n\n⚠ 名字冲突提醒：本节点里的 $F_0$ 是为了不与 Banach 空间 $F$ 撞名而加的角标，含义与有限维版本的 $F$ 相同。',
      refs: ['Lang, Real and Functional Analysis, Ch. I', 'Zeidler, Nonlinear Functional Analysis I, Ch. 4']
    },
    {
      id: 'cor.rank-theorem',
      cluster: 'analysis.multivariable',
      type: 'corollary',
      label: '常秩定理',
      title: '推论（秩定理）：常秩映射的局部标准形',
      regions: ['analysis'],
      tags: ['推论', '微积分', '多元', '秩'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}^{m}$ 是 $C^{1}$，且 Jacobi 矩阵的秩在 $U$ 上**恒等于** $r$（即 $\\operatorname{rank} Df(x) = r$ 对一切 $x \\in U$）。则对每个 $a \\in U$，存在 $a$ 附近的光滑坐标变换 $\\varphi$ 与 $f(a)$ 附近的光滑坐标变换 $\\psi$，使',
        '',
        '$$\\psi \\circ f \\circ \\varphi^{-1} (x_1, \\ldots, x_n) = (x_1, \\ldots, x_r, 0, \\ldots, 0)$$'
      ].join('\n'),
      notes: '⭐ 秩定理说「**常秩映射局部只有一种形状**」：一切常秩 $r$ 的映射在局部长得一模一样，唯一的「不变量」就是秩 $r$。这是微积分里的一条**分类定理**，也是「局部 $\\to$ 标准形」这个套路的收官之作。\n\n⭐ 三个推论一次拿到：\n- $r = n = m$：$\\psi \\circ f \\circ \\varphi^{-1} = \\mathrm{id}$ $\\implies$ 局部同构，即**逆映射定理**；\n- $r = n < m$：$x \\mapsto (x, 0)$，即**浸入**标准形；\n- $r = m < n$：$(x_1, \\ldots, x_n) \\mapsto (x_1, \\ldots, x_m)$，即**淹没**（局部投影）标准形。\n\n⚠ **常秩**这个前提不能去：$f(x) = x^{2}$（$\\mathbb{R} \\to \\mathbb{R}$）在 $x \\ne 0$ 处秩 $1$、在 $0$ 处秩 $0$，局部形状不是标准形（它是「折叠」）。\n\n证明全文在边上（先对 $r$ 造坐标把 $f$ 的前 $r$ 个分量变成坐标，再用隐函数定理把剩下的分量消掉）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Lang, Undergraduate Analysis, Ch. XVI']
    },
    {
      id: 'def.submersion-immersion',
      cluster: 'analysis.multivariable',
      type: 'definition',
      label: '浸入 / 淹没 / 嵌入',
      title: '浸入、淹没与嵌入',
      regions: ['analysis'],
      tags: ['定义', '微积分', '流形'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}^{m}$ 是 $C^{1}$，$a \\in U$。',
        '',
        '- $f$ 在 $a$ 是**浸入**，当且仅当 $Df(a)$ 是单射（等价地 $\\operatorname{rank} Df(a) = n \\le m$）；',
        '- $f$ 在 $a$ 是**淹没**，当且仅当 $Df(a)$ 是满射（等价地 $\\operatorname{rank} Df(a) = m \\le n$）；',
        '- $f$ 是**嵌入**，当且仅当它是浸入，且 $f$ 作为 $U \\to f(U)$ 的同胚。'
      ].join('\n'),
      notes: '⭐ 三者都是「用 Jacobi 矩阵的秩说话」的条件。秩定理（`cor.rank-theorem`）说明它们分别是两种标准形：\n- 浸入的局部标准形 $x \\mapsto (x, 0)$（把 $\\mathbb{R}^{n}$ 直接放进去，局部是一张「平的」子集）；\n- 淹没的局部标准形 $x \\mapsto (x_1, \\ldots, x_m)$（局部是投影）。\n\n⭐ 浸入是「局部嵌入」，允许自交：平面里的 $\\infty$ 字形曲线（参数化 $t \\mapsto (\\sin 2t, \\sin t)$）处处是浸入，但在自交点处不是单射，所以不是嵌入。\n\n⚠ 「浸入 / 淹没」是**逐点的局部**性质（只需一点处秩满）；「嵌入」查的是**整体**性质（到像上的同胚）。把这两类混起来是初学流形时最主要的错误来源 —— 例如「$f$ 是单射浸入」并不自动是嵌入（像上拓扑可能更细）。',
      refs: ['Lang, Undergraduate Analysis, Ch. XVI', 'Guillemin–Pollack, Differential Topology, §1']
    },
    {
      id: 'thm.regular-value',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: '正则值原像定理',
      title: '定理：正则值的原像是子流形',
      regions: ['analysis'],
      tags: ['定理', '微积分', '流形'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}^{m}$ 是 $C^{1}$（$m \\le n$）。点 $c \\in \\mathbb{R}^{m}$ 叫 $f$ 的**正则值**，当且仅当对每个 $x \\in f^{-1}(c)$，$Df(x)$ 都**满射**；否则叫**临界值**。',
        '',
        '若 $c$ 是正则值且 $f^{-1}(c) \\ne \\emptyset$，则 $f^{-1}(c)$ 是 $\\mathbb{R}^{n}$ 的 $n - m$ 维**子流形**：每点附近它都能写成光滑函数的图像（等价地，每点附近它能由 $m$ 个独立的方程「解出」$m$ 个坐标）。'
      ].join('\n'),
      notes: '⭐ 「正则值的原像是流形」是整条微分流形理论的入口 —— 它把**解方程**变成了**描述几何对象**。\n\n⭐ 标准例题：$f(x) = \\|x\\|^{2}$（$\\mathbb{R}^{n} \\to \\mathbb{R}$）的梯度 $\\nabla f(x) = 2x$ 只在原点为零，故 $c > 0$ 是正则值，于是 $f^{-1}(c)$ 是 $(n-1)$ 维子流形 —— **球面是流形**这件事就是这么来的。\n\n⚠ $c = 0$ 是临界值（唯一临界点是原点且 $f(0) = 0$），而 $f^{-1}(0) = \\{0\\}$ 恰好是 $0$ 维流形 —— 临界值的原像**可能**仍是流形，只是定理不保证。判别一个点是正则点比判别临界点容易得多，这正是定理的实用之处。\n\n⭐ 与 `thm.sard` 合起来才有完整图景：正则值多、原像是流形、临界值零测 —— 于是「几乎每个水平集都是流形」。\n\n证明全文在边上（隐函数定理 + 局部选主元把 $f$ 的 $m$ 个分量当成坐标）。',
      refs: ['Guillemin–Pollack, Differential Topology, §1', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'thm.lagrange-multiplier',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: 'Lagrange 乘子法',
      title: '定理（Lagrange 乘子法）：约束极值的必要条件',
      regions: ['analysis'],
      tags: ['定理', '微积分', '最优化'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}$ 与 $g = (g_1, \\ldots, g_m) : U \\to \\mathbb{R}^{m}$ 都是 $C^{1}$，$a \\in U$ 满足',
        '',
        '$$g(a) = 0, \\qquad \\operatorname{rank} Dg(a) = m$$',
        '',
        '若 $a$ 是 $f$ 在约束集 $M := g^{-1}(0)$ 上的局部极值点，则存在 $\\lambda = (\\lambda_1, \\ldots, \\lambda_m) \\in \\mathbb{R}^{m}$ 使',
        '',
        '$$\\nabla f(a) = \\sum_{i=1}^{m} \\lambda_i \\nabla g_i(a)$$',
        '',
        '（$\\lambda_i$ 叫 **Lagrange 乘子**。等价说法：$\\nabla f(a) \\in \\operatorname{span}\\{\\nabla g_1(a), \\ldots, \\nabla g_m(a)\\}$。）'
      ].join('\n'),
      notes: '⭐ 几何读法：约束集 $M = g^{-1}(0)$ 在正则点 $a$ 附近的切空间是 $T_aM = \\ker Dg(a)$（`thm.regular-value`）。「$a$ 是 $f|_{M}$ 的极值点」蕴含 $Df(a)$ 在 $T_aM$ 上恒为零，即 $\\ker Dg(a) \\subseteq \\ker Df(a)$。剩下的全是**线性代数**：两个线性映射的核有这种包含关系时，$\\nabla f(a)$ 落在 $\\nabla g_i(a)$ 张成的空间里（对偶空间里取正交补即可）。\n\n⚠ $\\operatorname{rank} Dg(a) = m$（即 $a$ 是 $g^{-1}(0)$ 的正则点）这个前提不能去：$g(x, y) = x^{2} + y^{2}$ 的零点集是单点 $\\{(0,0)\\}$，那里 $Dg = 0$、秩为 $0$，乘子法给不出任何信息（而该点显然是极值点）。\n\n⭐ 使用要点：乘子法只给**必要**条件，解出候选点后仍需比较；而且 $\\lambda_i$ 本身有含义（约束对最优值的灵敏度 $\\partial f^{\\ast}/\\partial c_i$）。',
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 9', 'Spivak, Calculus on Manifolds, Ch. 2']
    },
    {
      id: 'thm.morse-lemma',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: 'Morse 引理',
      title: '定理（Morse 引理）：非退化临界点附近的局部标准形',
      regions: ['analysis'],
      tags: ['定理', '微积分', '流形'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}$ 是 $C^{k+2}$（$k \\ge 1$），$a$ 是 $f$ 的**非退化临界点**（即 $\\nabla f(a) = 0$ 且 $\\det H_f(a) \\ne 0$）。记 $H_f(a)$ 的负特征值个数为 $k$。则存在 $a$ 附近的光滑坐标 $u = (u_1, \\ldots, u_n)$（$u(a) = 0$）使',
        '',
        '$$f = f(a) - u_1^{2} - \\cdots - u_k^{2} + u_{k+1}^{2} + \\cdots + u_n^{2}$$',
        '',
        '$k$ 叫 $f$ 在 $a$ 的 **Morse 指数**。'
      ].join('\n'),
      notes: '⭐ 这是一条**分类定理**：非退化临界点附近，函数只由一个数字 $k$ 决定局部形状。于是「鞍点」不再是模糊的日常词，而是 $k$ 的一个取值（$k = 0$ 极小、$k = n$ 极大、$0 < k < n$ 鞍点）。\n\n⭐ 证明两步：\n1. 把 $f(x) - f(a)$ 写成 $\\sum_{i,j} h_{ij}(x)\\,(x_i - a_i)(x_j - a_j)$，其中 $h_{ij}$ 光滑且 $h_{ij}(a) = \\frac{1}{2}\\partial_i\\partial_j f(a)$ —— 做法是对 $\\varphi(t) = f(a + t(x-a))$ 用一维 Taylor 并把余项写成积分 $\\int_0^1 (1-t)\\,\\varphi\'\'(t)\\,dt$，于是 $h_{ij}$ 显式地是积分、自动光滑；\n2. 对**光滑变化的对称矩阵** $h(x)$ 做配方（Gram–Schmidt 的光滑版本），把 $\\sum h_{ij} y_i y_j$ 化成 $\\pm$ 平方和。\n\n⭐ 第 2 步里负号个数不变 —— 这正是 **Sylvester 惯性定律**（`def.quadratic-form` 那一带的二次型理论），而且它保证 $k$ 与坐标选取无关。\n\n⚠ 「非退化」不能去：$f = x^{4}$ 在原点是退化临界点，局部形状既不是 $+u^{2}$ 也不是 $-u^{2}$，Morse 引理不适用。\n\n⭐ 用途：Morse 理论（用临界点与指数重建流形的同调）—— 这是微积分通向 `homology` 那片星空的又一条路。',
      refs: ['Milnor, Morse Theory, §2', 'Guillemin–Pollack, Differential Topology, §1']
    },
    {
      id: 'thm.sard',
      cluster: 'analysis.multivariable',
      type: 'theorem',
      label: 'Sard 定理',
      title: '定理（Sard）：临界值集是零测集',
      regions: ['analysis'],
      tags: ['定理', '微积分', '测度'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{n}$ 开，$f : U \\to \\mathbb{R}^{m}$ 是 $C^{k}$ 且 $k > n - m$（$C^{\\infty}$ 时自然满足）。则 $f$ 的**临界值**全体',
        '',
        '$$f\\bigl( \\{ x \\in U : \\operatorname{rank} Df(x) < m \\} \\bigr) \\subseteq \\mathbb{R}^{m}$$',
        '',
        '是 $\\mathbb{R}^{m}$ 中的**零测集**（`def.null-set`，Lebesgue 测度为零）。'
      ].join('\n'),
      notes: '⭐ Sard 说「**临界值极其稀少**」：几乎每个值都是正则值，于是几乎每个水平集是子流形（`thm.regular-value`）。这一条把「正则性」从「碰巧成立的假设」变成「几乎必然成立的事实」——这是微分拓扑里所有「一般位置」论证的根基。\n\n⚠ 光滑性（或足够高阶）是必要的：$n = m = 1$ 且 $f$ 只是 $C^{1}$ 时有反例（Whitney 构造的 $C^{1}$ 函数把临界值映满一个区间）。Sard 给出的门槛是 $C^{k}$、$k > n - m$。\n\n⭐ 常被引用的推论：任意 $n$ 维流形可以嵌入 $\\mathbb{R}^{2n}$（用 Sard 制造一个「一般位置」的映射），以及 Borsuk–Ulam 型结论、Morse 理论里「几乎所有函数所有临界点都非退化」。\n\n⚠ **本节点只给证明提纲，不声称给出完整证明** —— 完整证明相当重（对 $m$ 归纳、Whitney 分解、外层用 Fubini 定理把零测性降维）。提纲与出处：\n1. $m = 1$：对 $n$ 归纳，把 $U$ 切成可数多个小方块，在每个方块上把 $f$ 展成一阶 Taylor，用「临界点处 $Df(x) = 0$」把小方块的像控制住；\n2. 一般 $m$：改用「临界点按 $\\operatorname{rank}$ 分层」（Whitney 分解），每层用 Fubini 降到低维情形，再对 $\\operatorname{rank}$ 归纳。\n细节见 Milnor《Topology from the Differentiable Viewpoint》§3 与 Sternberg《Lectures on Differential Geometry》§II.3。∎',
      refs: ['Milnor, Topology from the Differentiable Viewpoint, §3', 'Sternberg, Lectures on Differential Geometry, §II.3', 'Guillemin–Pollack, Differential Topology, §2']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.vs-normed-space',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'def.normed-space',
      note: '范数定义在 $K$-向量空间上 —— 要先有线性结构，才谈得上「齐次性」。'
    },
    {
      id: 'dep.complete-banach-space',
      kind: 'definition',
      definition: 'def.complete',
      usedBy: 'def.banach-space',
      note: 'Banach 空间 = 赋范空间 + 度量完备性：定义里直接引用的就是完备性这个概念。'
    },
    {
      id: 'dep.derivative-partial-derivative',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'def.partial-derivative',
      note: '偏导数就是一个一元导数：把其余坐标固定，只对第 $j$ 个坐标求导。'
    },
    {
      id: 'dep.partial-directional',
      kind: 'definition',
      definition: 'def.partial-derivative',
      usedBy: 'def.directional-derivative',
      note: '方向导数是偏导的推广（取方向为任意向量 $v$ 而不是坐标向量 $e_j$）。'
    },
    {
      id: 'dep.linearmap-total-differential',
      kind: 'definition',
      definition: 'def.linear-map',
      usedBy: 'def.total-differential',
      note: '⭐ 全微分的定义里出现的对象就是一个**线性映射** $L$ —— 这条依赖是整个多元微分「线性代数化」的起点。'
    },
    {
      id: 'dep.directional-total-differential',
      kind: 'definition',
      definition: 'def.directional-derivative',
      usedBy: 'def.total-differential',
      note: '可微蕴含一切方向导数存在（且 $D_v f(a) = Df(a)(v)$）—— 方向导数是可微性必须「兼容」的下层概念。'
    },
    {
      id: 'dep.innerproduct-gradient',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.gradient',
      note: '梯度由 Riesz 表示给出：把对偶向量用内积「搬回」原空间，所以必须先用内积把对偶与原空间认同。'
    },
    {
      id: 'dep.dualspace-gradient',
      kind: 'definition',
      definition: 'def.dual-space',
      usedBy: 'def.gradient',
      note: '全微分 $Df(a)$ 天生住在对偶空间 $(\\mathbb{R}^{n})^{\\ast}$ 里 —— 不先讲对偶，「梯度」这个词无法定义。'
    },
    {
      id: 'dep.totaldifferential-jacobian',
      kind: 'definition',
      definition: 'def.total-differential',
      usedBy: 'def.jacobian',
      note: 'Jacobi 矩阵是线性映射 $Df(a)$ 在标准基下的矩阵，所以要先有全微分。'
    },
    {
      id: 'dep.matrix-jacobian',
      kind: 'definition',
      definition: 'def.matrix',
      usedBy: 'def.jacobian',
      note: 'Jacobi 矩阵是 $m \\times n$ 矩阵（`def.matrix` 提供「矩阵」这个概念本身）。'
    },
    {
      id: 'dep.partial-hessian',
      kind: 'definition',
      definition: 'def.partial-derivative',
      usedBy: 'def.hessian',
      note: 'Hessian 的元素是二阶偏导 $\\partial_i\\partial_j f$。'
    },
    {
      id: 'dep.bilinearform-hessian',
      kind: 'definition',
      definition: 'def.bilinear-form',
      usedBy: 'def.hessian',
      note: '⭐ $H_f(a)$ 是二阶导数 $D^{2}f(a)$ 的矩阵，而 $D^{2}f(a)$ 本身是 $\\mathbb{R}^{n}$ 上的**对称双线性型** —— 不先讲双线性型，「Hessian 是矩阵」这句话就丢掉了它的一半含义。'
    },
    {
      id: 'dep.metric-contraction',
      kind: 'definition',
      definition: 'def.metric-space',
      usedBy: 'def.contraction',
      note: '压缩映射定义在度量空间上（只用到距离，不需要线性结构）。'
    },
    {
      id: 'dep.rank-submersion',
      kind: 'definition',
      definition: 'def.rank',
      usedBy: 'def.submersion-immersion',
      note: '浸入 / 淹没都是用 Jacobi 矩阵的**秩**说的（秩满两种方向）。'
    },
    {
      id: 'dep.nullset-sard',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'thm.sard',
      note: 'Sard 定理的结论是「零测集」，用到的就是零测集这个概念。'
    },
    {
      id: 'dep.quadraticform-second-derivative',
      kind: 'definition',
      definition: 'def.quadratic-form',
      usedBy: 'thm.second-derivative-test',
      note: '极值判别判的是二次型 $h \\mapsto h^{\\mathsf{T}}H_f(a)h$ 的正定性，所以要先用二次型那套语言。'
    },
    {
      id: 'dep.banachspace-inverse-banach',
      kind: 'definition',
      definition: 'def.banach-space',
      usedBy: 'thm.inverse-function-banach',
      note: 'Banach 版逆映射定理的舞台是 Banach 空间。'
    },
    {
      id: 'dep.banachspace-implicit-banach',
      kind: 'definition',
      definition: 'def.banach-space',
      usedBy: 'thm.implicit-function-banach',
      note: '同上：隐函数定理的 Banach 版要求 $E, F, G$ 都是 Banach 空间。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.chain-rule-multi',
      kind: 'implication',
      sources: ['def.total-differential', 'def.jacobian'],
      target: 'thm.chain-rule-multi',
      title: '可微的定义 $\\implies$ 链式法则（线性映射的复合）',
      proof: [
        '记 $L := Df(a)$、$M := Dg(b)$（$b = f(a)$）。由可微的定义存在函数 $\\varepsilon, \\eta$ 使',
        '',
        '$$f(a + h) = f(a) + L(h) + \\varepsilon(h)\\,\\|h\\|, \\qquad \\|\\varepsilon(h)\\| \\to 0;$$',
        '$$g(b + k) = g(b) + M(k) + \\eta(k)\\,\\|k\\|, \\qquad \\|\\eta(k)\\| \\to 0.$$',
        '',
        '**第一步：估计 $k := f(a+h) - f(a)$ 的大小。** 由第一式',
        '',
        '$$\\|k\\| \\le \\bigl( \\|L\\| + \\|\\varepsilon(h)\\| \\bigr)\\|h\\| \\le (\\|L\\| + 1)\\,\\|h\\|$$',
        '对充分小的 $h$ 成立；特别地 $k \\to 0$（$h \\to 0$）。',
        '',
        '**第二步：代入。**',
        '',
        '$$(g \\circ f)(a + h) = g\\bigl( b + k \\bigr) = g(b) + M(k) + \\eta(k)\\,\\|k\\| = (g \\circ f)(a) + (M \\circ L)(h) + \\underbrace{M\\bigl(\\varepsilon(h)\\|h\\|\\bigr) + \\eta(k)\\,\\|k\\|}_{=: R(h)}$$',
        '',
        '**第三步：证明 $R(h) = o(\\|h\\|)$。** 第一项：$\\|M(\\varepsilon(h)\\|h\\|)\\| \\le \\|M\\|\\,\\|\\varepsilon(h)\\|\\,\\|h\\| = o(\\|h\\|)$。第二项：由第一步 $\\|k\\| \\le (\\|L\\|+1)\\|h\\|$，又 $k \\to 0$ 故 $\\|\\eta(k)\\| \\to 0$，于是 $\\|\\eta(k)\\|\\,\\|k\\| \\le \\|\\eta(k)\\||(\\|L\\|+1)\\|h\\| = o(\\|h\\|)$。',
        '',
        '两式相加得 $R(h) = o(\\|h\\|)$。于是 $g \\circ f$ 在 $a$ 可微，且导数正是线性映射 $M \\circ L = Dg(f(a)) \\circ Df(a)$（由全微分的唯一性）。取标准基写成矩阵即得 $J_{g \\circ f}(a) = J_g(f(a))J_f(a)$。∎'
      ].join('\n'),
      note: '第三步是全部的技术内容：**必须**显式地把 $o(\\|k\\|)$ 换成 $o(\\|h\\|)$。直接写 $Dg(f(a)+h)$ 是错的，因为可微性是在「$f$ 的像点附近」给的，不是在「$a$ 附近」给的。'
    },
    {
      id: 'imp.mixed-partials',
      kind: 'implication',
      sources: ['thm.mvt', 'def.partial-derivative'],
      target: 'thm.mixed-partials',
      title: '一元中值定理用两次 $\\implies$ 混合偏导可交换',
      proof: [
        '化归到 $n = 2$：只需证 $\\partial_1\\partial_2 f(a) = \\partial_2\\partial_1 f(a)$，其中 $a = (a_1, a_2)$。取 $h, k$ 使小方块 $[a_1, a_1+h] \\times [a_2, a_2+k]$ 落在假设的邻域里。定义**二阶差分**',
        '',
        '$$\\Delta(h, k) := f(a_1+h,\\ a_2+k) - f(a_1+h,\\ a_2) - f(a_1,\\ a_2+k) + f(a_1,\\ a_2)$$',
        '',
        '**按第一种顺序**：令 $\\varphi(x) := f(x,\\ a_2+k) - f(x,\\ a_2)$。则 $\\Delta = \\varphi(a_1+h) - \\varphi(a_1)$。对 $\\varphi$ 用一维中值定理，存在 $\\xi \\in (a_1, a_1+h)$ 使',
        '',
        '$$\\Delta = h\\,\\varphi\'(\\xi) = h\\bigl[ \\partial_1 f(\\xi,\\ a_2+k) - \\partial_1 f(\\xi,\\ a_2) \\bigr]$$',
        '再对 $y \\mapsto \\partial_1 f(\\xi, y)$ 用一次一维中值定理，存在 $\\eta \\in (a_2, a_2+k)$ 使',
        '',
        '$$\\Delta = h\\,k\\ \\partial_2\\partial_1 f(\\xi,\\ \\eta)$$',
        '',
        '**按第二种顺序**：对称地（令 $\\psi(y) := f(a_1+h, y) - f(a_1, y)$）得到存在 $\\xi\' \\in (a_1, a_1+h)$、$\\eta\' \\in (a_2, a_2+k)$ 使',
        '',
        '$$\\Delta = h\\,k\\ \\partial_1\\partial_2 f(\\xi\',\\ \\eta\')$$',
        '',
        '**取极限**：两式相除 $hk \\ne 0$ 得',
        '',
        '$$\\partial_2\\partial_1 f(\\xi, \\eta) = \\partial_1\\partial_2 f(\\xi\', \\eta\')$$',
        '令 $h, k \\to 0$：此时 $\\xi, \\xi\' \\to a_1$、$\\eta, \\eta\' \\to a_2$，由两个混合偏导**在 $a$ 处连续**，两边分别趋于 $\\partial_2\\partial_1 f(a)$ 与 $\\partial_1\\partial_2 f(a)$，故两者相等。∎'
      ].join('\n'),
      note: '⚠ 连续性只用在最后一步（取极限）。这也解释了为什么去掉连续性就有反例 —— 中间那两个点 $(\\xi, \\eta)$ 与 $(\\xi\', \\eta\')$ **不同**，没有连续性就没法把两个不同的点上的值拉到一起。'
    },
    {
      id: 'imp.mean-value-multi',
      kind: 'implication',
      sources: ['thm.mvt', 'thm.chain-rule-multi'],
      target: 'thm.mean-value-multi',
      title: '一维 MVT + 链式法则 $\\implies$ 多元中值定理',
      proof: [
        '**等号版本（值域为 $\\mathbb{R}$）**：令 $\\gamma(t) := a + th$（$t \\in [0, 1]$），$\\varphi := f \\circ \\gamma$。由链式法则（`thm.chain-rule-multi`）$\\varphi$ 在 $(0,1)$ 上可导且',
        '',
        '$$\\varphi\'(t) = Df(a + th)(h)$$',
        '',
        '由一维中值定理（`thm.mvt`），存在 $\\theta \\in (0,1)$ 使 $\\varphi(1) - \\varphi(0) = \\varphi\'(\\theta)$，即 $f(a+h) - f(a) = Df(a + \\theta h)(h)$。∎',
        '',
        '**不等式版本（值域为 $\\mathbb{R}^{m}$）**：等号版本对向量值函数**不成立**（反例见节点说明），所以改用积分 / 逼近论证。对 $\\varphi(t) = f(a+th)$ 有',
        '',
        '$$f(a+h) - f(a) = \\int_0^1 \\varphi\'(t)\\,dt = \\int_0^1 Df(a + th)(h)\\,dt$$',
        '',
        '（分量逐个用一元牛顿–莱布尼茨公式即得。）取范数并用 $\\bigl\\|\\int g\\bigr\\| \\le \\int \\|g\\|$：',
        '',
        '$$\\|f(a+h) - f(a)\\| \\le \\int_0^1 \\|Df(a+th)\\|\\,\\|h\\|\\,dt \\le \\Bigl( \\sup_{[a,a+h]}\\|Df\\| \\Bigr)\\|h\\|$$',
        '',
        '（这一步只用到了「闭线段上的连续函数取到上确界」，不需要多元最值定理。）∎'
      ].join('\n'),
      note: '⭐ 不等式版本才是后面真正用到的形式：`thm.inverse-function` 与 `thm.inverse-function-banach` 全靠它把 $\\Phi_y$ 弄成压缩映射。'
    },
    {
      id: 'imp.taylor-multi',
      kind: 'implication',
      sources: ['thm.mean-value-multi'],
      target: 'thm.taylor-multi',
      title: '沿线段的中值定理迭代 $\\implies$ 多元 Taylor 公式',
      proof: [
        '**第一步：沿线段化归到一元。** 令 $\\gamma(t) := a + th$、$\\varphi(t) := f(\\gamma(t))$，$t \\in [0,1]$。用链式法则逐次求导可得',
        '',
        '$$\\varphi^{(j)}(t) = D^{j} f(a + th)\\underbrace{(h, \\ldots, h)}_{j \\text{ 个}} \\qquad (j \\le k+1)$$',
        '',
        '其中 $D^{j}f$ 是 $j$ 重线性型（$j = 2$ 时即对称双线性型 $D^{2}f(a)(h,h) = h^{\\mathsf{T}} H_f(a) h$）。',
        '',
        '**第二步：一元 Taylor。** 对 $\\varphi$ 在 $[0,1]$ 上用带 Lagrange 余项的一元 Taylor 公式（`thm.taylor`），存在 $\\theta \\in (0,1)$ 使',
        '',
        '$$\\varphi(1) = \\sum_{j=0}^{k} \\frac{\\varphi^{(j)}(0)}{j!} + \\frac{\\varphi^{(k+1)}(\\theta)}{(k+1)!}$$',
        '',
        '**第三步：展开成多重指标。** 把 $D^{j}f(a)(h, \\ldots, h)$ 按多重指标展开：$j$ 重线性型在 $(h, \\ldots, h)$ 上的取值是',
        '',
        '$$\\sum_{|\\alpha| = j} \\binom{j}{\\alpha} D^{\\alpha} f(a)\\, h^{\\alpha} = j! \\sum_{|\\alpha| = j} \\frac{D^{\\alpha} f(a)}{\\alpha!} h^{\\alpha}$$',
        '',
        '代入第二步即得节点里写的形式（余项同样按 $|\\alpha| = k+1$ 展开）。',
        '',
        '**第四步：估计余项。** 余项每项含 $k+1$ 个 $h$ 的分量，且 $D^{\\alpha}f$ 在有界闭球上连续（故有界），于是 $|R_k(h)| \\le C\\|h\\|^{k+1} = O(\\|h\\|^{k+1})$。∎'
      ].join('\n'),
      note: '⭐ 关键在第 3 步：**$j$ 重线性型与多重指标导数之间差一个组合系数 $j!/\\alpha!$** —— 这个系数正是把「$D^{j}f$ 是一个多线性型」翻译成「$\\sum_{|\\alpha|\\le k}\\frac{D^{\\alpha}f}{\\alpha!}h^{\\alpha}$」的桥梁。'
    },
    {
      id: 'imp.second-derivative-test',
      kind: 'implication',
      sources: ['thm.taylor-multi', 'thm.sylvester-criterion', 'thm.spectral-theorem'],
      target: 'thm.second-derivative-test',
      title: '二阶 Taylor + 正定二次型的估计 $\\implies$ 极值判别',
      proof: [
        '由 $\\nabla f(a) = 0$ 与 $k = 2$ 的 Taylor 公式（`thm.taylor-multi`）：',
        '',
        '$$f(a + h) = f(a) + \\frac{1}{2} h^{\\mathsf{T}} H_f(a)\\, h + o\\bigl(\\|h\\|^{2}\\bigr)$$',
        '',
        '记 $H := H_f(a)$。由 `thm.spectral-theorem`，$H$ 有正交标准特征基，特征值 $\\lambda_1 \\le \\cdots \\le \\lambda_n$，于是对一切 $h$',
        '',
        '$$\\lambda_1 \\|h\\|^{2} \\le h^{\\mathsf{T}} H h \\le \\lambda_n \\|h\\|^{2}$$',
        '',
        '**正定情形**（$\\lambda_1 > 0$）：余项 $o(\\|h\\|^{2})$ 满足「存在 $\\rho > 0$，$\\|h\\| < \\rho$ 时 $|o(\\|h\\|^{2})| \\le \\frac{\\lambda_1}{4}\\|h\\|^{2}$」。于是',
        '',
        '$$f(a+h) - f(a) \\ge \\frac{\\lambda_1}{2}\\|h\\|^{2} - \\frac{\\lambda_1}{4}\\|h\\|^{2} = \\frac{\\lambda_1}{4}\\|h\\|^{2} > 0 \\quad (0 < \\|h\\| < \\rho)$$',
        '',
        '即 $a$ 是局部严格极小点。',
        '',
        '**负定情形**：把 $f$ 换成 $-f$（注意 $\\nabla(-f) = -\\nabla f = 0$、$H_{-f} = -H_f$ 正定）即得局部严格极大点。',
        '',
        '**不定情形**（有 $\\lambda > 0$ 与 $\\mu < 0$）：取 $v_{+}$、$v_{-}$ 为对应的特征向量并单位化。沿 $h = tv_{+}$（$t \\ne 0$ 小）有 $h^{\\mathsf{T}}Hh = \\lambda t^{2} > 0$，故 $f(a+tv_{+}) > f(a)$；沿 $h = tv_{-}$ 有 $h^{\\mathsf{T}}Hh = \\mu t^{2} < 0$，故 $f(a+tv_{-}) < f(a)$。**任意**小的邻域里两种情况都出现，所以 $a$ 既非局部极小也非局部极大。∎',
        '',
        '**半定 / 退化**：不做判断 —— 结论需要 $k > 2$ 的信息（反例见节点说明：$x^{4}+y^{4}$ 与 $x^{4}-y^{4}$ 在原点同为 $H = 0$，结论相反）。'
      ].join('\n'),
      note: '⭐ 整条证明只用了两个外部事实：**二次型的特征值估计**（谱定理）与 **$o$ 记号的显式控制**。前者是线性代数，后者是微积分 —— 这条定理正是两者接口的样板。'
    },
    {
      id: 'imp.banach-fixed-point',
      kind: 'implication',
      sources: ['def.contraction', 'def.complete'],
      target: 'thm.banach-fixed-point',
      title: '压缩 + 完备 $\\implies$ 唯一不动点（含误差估计）',
      proof: [
        '**第一步：迭代列是 Cauchy 列。** 任取 $x_0$，令 $x_{k+1} := Tx_k$。由压缩性',
        '',
        '$$d(x_{k+1}, x_{k+2}) \\le q\\, d(x_k, x_{k+1}) \\le \\cdots \\le q^{k+1} d(x_0, x_1)$$',
        '',
        '于是对 $m > k$，用三角不等式与几何级数',
        '',
        '$$d(x_k, x_m) \\le \\sum_{j=k}^{m-1} d(x_j, x_{j+1}) \\le \\sum_{j=k}^{\\infty} q^{j}\\, d(x_0, x_1) = \\frac{q^{k}}{1 - q}\\, d(x_0, x_1)$$',
        '',
        '右端与 $m$ 无关且 $\\to 0$（$k \\to \\infty$，因 $q < 1$），故 $(x_k)$ 是 Cauchy 列。',
        '',
        '**第二步：收敛（用完备性）。** $X$ 完备 $\\implies$ 存在 $x^{\\ast}$ 使 $x_k \\to x^{\\ast}$。',
        '',
        '**第三步：$x^{\\ast}$ 是不动点。** $T$ 是压缩故连续（Lipschitz），于是',
        '',
        '$$T x^{\\ast} = T\\bigl(\\lim_k x_k\\bigr) = \\lim_k T x_k = \\lim_k x_{k+1} = x^{\\ast}$$',
        '',
        '**第四步：唯一。** 若 $Tx = x$、$Ty = y$，则 $d(x, y) = d(Tx, Ty) \\le q\\, d(x, y)$，故 $(1 - q) d(x, y) \\le 0$，因 $1 - q > 0$ 得 $d(x, y) = 0$，即 $x = y$。',
        '',
        '**第五步：误差估计。** 在第一步的不等式中令 $m \\to \\infty$（$d$ 连续）得先验估计；后验估计由 $d(x_k, x^{\\ast}) \\le d(x_k, x_{k+1}) + d(x_{k+1}, x^{\\ast}) \\le q\\, d(x_{k-1}, x_k) + q\\, d(x_k, x^{\\ast})$ 整理即得。∎'
      ].join('\n'),
      note: '⭐ 证明结构值得背下来：**先造 Cauchy 列 $\\to$ 用完备性取极限 $\\to$ 用连续性验证不动点 $\\to$ 用 $1 - q > 0$ 得唯一**。四处用到的性质恰好是四个假设，一个都不多。'
    },
    {
      id: 'imp.inverse-function',
      kind: 'implication',
      sources: ['thm.banach-fixed-point', 'thm.mean-value-multi', 'thm.chain-rule-multi'],
      target: 'thm.inverse-function',
      title: '压缩映射原理 $\\implies$ 逆映射定理（有限维）',
      proof: [
        '记 $A := Df(a)$，$b := f(a)$。',
        '',
        '**第一步：化归到 $a = 0$、$b = 0$、$Df(0) = I$。** 令 $\\widetilde f(x) := A^{-1}\\bigl( f(a + x) - b \\bigr)$。则 $\\widetilde f(0) = 0$、$D\\widetilde f(0) = A^{-1}A = I$，而 $f$ 的局部可逆性与逆的光滑性等价于 $\\widetilde f$ 的。以下就设 $a = 0$、$f(0) = 0$、$Df(0) = I$。',
        '',
        '**第二步：$\\Phi(x) := x - f(x)$ 在小球上是压缩。** 由 $D\\Phi(0) = I - I = 0$ 与 $D\\Phi$ 的连续性，存在 $r > 0$ 使 $\\|x\\| \\le r$ 时 $\\|D\\Phi(x)\\| \\le \\frac{1}{2}$。于是对 $\\|x\\|, \\|y\\| \\le r$，由中值不等式（`thm.mean-value-multi`）',
        '',
        '$$\\|\\Phi(x) - \\Phi(y)\\| \\le \\tfrac{1}{2}\\|x - y\\|$$',
        '',
        '**第三步：对每个小 $y$，解 $f(x) = y$。** 设 $\\|y\\| \\le r/2$。定义 $\\Psi_y(x) := y + \\Phi(x)$。若 $\\|x\\| \\le r$ 则 $\\|\\Psi_y(x)\\| \\le \\|y\\| + \\|\\Phi(x) - \\Phi(0)\\| + \\|\\Phi(0)\\| \\le \\frac{r}{2} + \\frac{r}{2} = r$（注意 $\\Phi(0) = 0$），故 $\\Psi_y$ 把闭球 $\\overline{B}(0, r)$ 映入自身；它又是系数 $\\frac{1}{2}$ 的压缩映射。闭球在 $\\mathbb{R}^{n}$ 中**完备**，由压缩映射原理（`thm.banach-fixed-point`）$\\Psi_y$ 有唯一不动点 $x \\in \\overline{B}(0,r)$，即 $f(x) = y$。',
        '',
        '**第四步：唯一性（局部单射）。** 若 $f(x_1) = f(x_2) = y$ 且 $\\|x_i\\| \\le r$，则 $\\Phi(x_1) - \\Phi(x_2) = (x_1 - x_2) - (f(x_1) - f(x_2)) = x_1 - x_2$，取范数得 $\\|x_1 - x_2\\| \\le \\frac{1}{2}\\|x_1 - x_2\\|$，故 $x_1 = x_2$。于是记 $V := B(0, r) \\cap f^{-1}(B(0, r/2))$、$W := B(0, r/2)$，则 $f|_V : V \\to W$ 是双射。（把 $V$ 取成开球与开原像之交，$V$、$W$ 都开。）',
        '',
        '**第五步：逆映射连续。** 对 $y_1, y_2 \\in W$，记 $x_i := g(y_i)$。由第三步的论证',
        '',
        '$$\\|x_1 - x_2\\| = \\|f(x_1) - f(x_2) + \\Phi(x_2) - \\Phi(x_1)\\| \\le \\|y_1 - y_2\\| + \\tfrac{1}{2}\\|x_1 - x_2\\|$$',
        '',
        '故 $\\|g(y_1) - g(y_2)\\| \\le 2\\|y_1 - y_2\\|$：$g$ 甚至 Lipschitz。',
        '',
        '**第六步：$g$ 可导且 $Dg(y) = (Df(g(y)))^{-1}$。** 对 $y, y + k \\in W$ 记 $x := g(y)$、$x + h := g(y + k)$（即 $h = g(y+k) - g(y)$）。由 $f$ 在 $x$ 可微',
        '',
        '$$k = f(x + h) - f(x) = Df(x)(h) + o(\\|h\\|)$$',
        '',
        '两边作用 $Df(x)^{-1}$ 并用第五步的 $\\|h\\| \\le 2\\|k\\|$：$h = Df(x)^{-1}(k) + o(\\|k\\|)$。按定义这就是 $g$ 在 $y$ 可微，且 $Dg(y) = Df(g(y))^{-1}$。',
        '',
        '**第七步：$Dg$ 连续。** $Dg = (Df \\circ g)^{-1}$；$g$ 连续、$Df$ 连续、求逆（在 $GL_n$ 上）连续（`prop.inverse-continuous` 型的论证：逆的表达式含 $1/\\det$ 与伴随矩阵，都连续），故 $Dg$ 连续，即 $g \\in C^{1}$。∎'
      ].join('\n'),
      note: '⭐ 第 2 步的化归（把 $Df(a)$ 变成 $I$）是全部技巧所在：**一旦导数是恒等，$x - f(x)$ 就成为压缩的**，于是「解方程」就变成了「找不动点」。第 6 步则说明「逆映射的导数是导数的逆」是定义的自然产物，不是额外结论。'
    },
    {
      id: 'imp.implicit-function',
      kind: 'implication',
      sources: ['thm.inverse-function'],
      target: 'thm.implicit-function',
      title: '对 $\\Phi(x,y) = (x, F(x,y))$ 用逆映射定理 $\\implies$ 隐函数定理',
      proof: [
        '**第一步：造 $\\Phi$。** 令',
        '',
        '$$\\Phi : U \\to \\mathbb{R}^{n} \\times \\mathbb{R}^{m}, \\qquad \\Phi(x, y) := \\bigl( x,\\ F(x, y) \\bigr)$$',
        '',
        '则 $\\Phi$ 是 $C^{1}$，$\\Phi(a, b) = (a, 0)$。',
        '',
        '**第二步：$D\\Phi(a,b)$ 可逆。** 写成块矩阵（按 $x$ 与 $y$ 分块）：',
        '',
        '$$D\\Phi(a, b) = \\begin{pmatrix} I_n & 0 \\\\ D_x F(a,b) & D_y F(a,b) \\end{pmatrix}$$',
        '',
        '这是块上三角矩阵，故 $\\det D\\Phi(a,b) = \\det D_y F(a,b) \\ne 0$。',
        '',
        '**第三步：用逆映射定理。** 存在 $(a, b)$ 的邻域 $\\widetilde U$ 与 $(a, 0)$ 的邻域 $\\widetilde W$，使 $\\Phi|_{\\widetilde U} : \\widetilde U \\to \\widetilde W$ 是 $C^{1}$ 双射，逆记 $\\Theta$，且 $D\\Theta = (D\\Phi)^{-1}$。',
        '',
        '**第四步：逆必须有形状 $\\Theta(x, z) = (x, \\theta(x, z))$。** 因为 $\\Phi$ 保持第一个分量不变（第一坐标就是 $x$），故 $\\Theta$ 也保持第一分量不变。',
        '',
        '**第五步：取 $g(x) := \\theta(x, 0)$。** 由 $\\Phi \\circ \\Theta = \\mathrm{id}$ 得 $F\\bigl(x,\\ \\theta(x, 0)\\bigr) = 0$，且 $\\Theta(a, 0) = (a, b)$ 给出 $g(a) = b$。存在 $a$ 的开邻域 $V$ 使 $(x, 0) \\in \\widetilde W$（$\\widetilde W$ 开）。$g$ 是 $C^{1}$ 的复合，故 $C^{1}$。',
        '',
        '**第六步：唯一性与 $Dg$ 的公式。** 若 $\\widehat g$ 也在 $V$ 上满足 $\\widehat g(a) = b$、$F(x, \\widehat g(x)) = 0$，则 $(x, \\widehat g(x))$ 是 $(x, 0)$ 在 $\\Phi$ 下的原像，由 $\\Phi$ 在 $\\widetilde U$ 上单射得 $\\widehat g = g$。最后对 $F(x, g(x)) = 0$ 两边求导并用链式法则：$D_xF + D_yF \\cdot Dg = 0$，解出 $Dg = -(D_yF)^{-1} D_xF$。∎'
      ].join('\n'),
      note: '⭐ 整条证明里**没有任何新的分析技巧** —— 全部内容都打包在 $\\Phi$ 这个构造里。这就是「隐函数定理 = 逆映射定理的换装」的确切含义：同一件事换个写法，条件也随之翻译（$D\\Phi$ 可逆 $\\iff$ $D_yF$ 可逆）。'
    },
    {
      id: 'imp.inverse-function-banach',
      kind: 'implication',
      sources: ['thm.inverse-function', 'def.banach-space'],
      target: 'thm.inverse-function-banach',
      title: '同一套证明换到 Banach 空间（多一步 Neumann 级数）',
      proof: [
        '证明与有限维版本（`imp.inverse-function`）**逐步对应**，只有两处需要替换：',
        '',
        '**（i）化归到 $Df(a) = I$ 时要能取逆。** 有限维里用「矩阵可逆即有逆矩阵」；这里 $Df(a) : E \\to F$ 是拓扑线性同构，其逆 $A^{-1} \\in \\mathcal{L}(F, E)$ 有界，故',
        '',
        '$$\\widetilde f(x) := A^{-1}\\bigl( f(a + x) - f(a) \\bigr)$$',
        '',
        '仍然合法（$A^{-1}$ 有界 $\\implies$ 连续 $\\implies$ 保持 $C^{1}$ 性与可微性）。',
        '',
        '**（ii）第二步之后不需要新东西。** $\\Phi := \\mathrm{id} - \\widetilde f$ 满足 $D\\Phi(0) = 0$，由 $x \\mapsto D\\Phi(x)$ 连续，存在 $r > 0$ 使 $\\|x\\| \\le r$ 时 $\\|D\\Phi(x)\\| \\le \\frac{1}{2}$；由中值不等式（在 Banach 空间里逐字成立，`thm.mean-value-multi`）得 $\\Phi$ 在闭球上系数 $\\frac{1}{2}$ 压缩。闭球在 $E$ 中完备（$E$ Banach），于是压缩映射原理给出唯一不动点，与有限维完全一样。',
        '',
        '**（iii）「Neumann 级数」用在哪里。** 上面第 (i) 步只用到「$A^{-1}$ 有界」。Neumann 级数出现在**更一般的版本**里：当只假设 $Df(a)$ 可逆（而没假设逆有界）时，可以先用',
        '',
        '$$(I - S)^{-1} = \\sum_{k=0}^{\\infty} S^{k} \\qquad (\\|S\\| < 1)$$',
        '',
        '证明「距恒等足够近的算子是拓扑同构」—— 级数的收敛性来自算子空间 $\\mathcal{L}(F)$ 的完备性，这是 Banach 空间独有的工具，有限维里根本不需要（有限维自动完备）。有了它，就能把「$Df$ 在 $a$ 附近接近 $Df(a)$」升级成「$Df$ 在 $a$ 附近处处是拓扑同构」，从而**在整个邻域上**取逆。',
        '',
        '其余各步（局部单射、逆的 Lipschitz 性、$Dg = (Df\\circ g)^{-1}$、$C^{1}$ 性）与有限维逐字相同。∎'
      ].join('\n'),
      note: '⭐ 有限维与无限维的差别浓缩成一句话：**有限维里「可逆」与「拓扑可逆」是同一件事，无限维里不是**。这条依赖边存在的意义就是把这句话钉在图上。'
    },
    {
      id: 'imp.implicit-function-banach',
      kind: 'implication',
      sources: ['thm.implicit-function', 'thm.inverse-function-banach'],
      target: 'thm.implicit-function-banach',
      title: '同样的 $\\Phi(x,y) = (x, F_0(x,y))$ 构造，换到 Banach 空间',
      proof: [
        '与有限维版本（`imp.implicit-function`）逐步对应。',
        '',
        '**第一步：$\\Phi$ 仍是 $C^{1}$。** $\\Phi(x, y) := (x, F_0(x, y))$ 是 $E \\times F \\to E \\times G$ 的 $C^{1}$ 映射（两个分量都是 $C^{1}$）。',
        '',
        '**第二步：$D\\Phi(a,b)$ 是拓扑同构。** 块矩阵 $\\begin{pmatrix} I_E & 0 \\\\ D_xF_0 & D_yF_0 \\end{pmatrix}$ 与它的逆',
        '',
        '$$\\begin{pmatrix} I_E & 0 \\\\ -(D_yF_0)^{-1}D_xF_0 & (D_yF_0)^{-1} \\end{pmatrix}$$',
        '',
        '都是良定义且有界的（$D_yF_0$ 拓扑同构 $\\implies$ 逆有界；块上三角的有界性由范数估计直接给出）。故 $D\\Phi(a,b)$ 拓扑同构。',
        '',
        '**第三步：用 Banach 版逆映射定理**（`thm.inverse-function-banach`）得到局部逆 $\\Theta$，它同样保持第一个分量不变，取 $g(x) := \\theta(x, 0)$ 即得。',
        '',
        '**第四步：$Dg$ 的公式**由对 $F_0(x, g(x)) = 0$ 求导得到，与有限维一致。∎'
      ].join('\n'),
      note: '⭐ 这条边存在的价值：它说明**隐函数定理的证明思想与空间无关** —— 唯一随空间改变的是「可逆」的含义（有限维：逆自动有界；无限维：必须假设拓扑同构）。'
    },
    {
      id: 'imp.rank-theorem',
      kind: 'implication',
      sources: ['thm.inverse-function', 'thm.implicit-function'],
      target: 'cor.rank-theorem',
      title: '逆映射定理 + 隐函数定理 $\\implies$ 常秩定理',
      proof: [
        '固定 $a \\in U$，记 $r := \\operatorname{rank} Df(a)$。',
        '',
        '**第一步：选主元并在定义域上换坐标。** $Df(a)$ 有某个 $r \\times r$ 子式非零。不妨设前 $r$ 个坐标上的主子式非零（否则先重排坐标 —— 那是线性同构，不影响结论）。把 $x$ 拆成 $(x\', x\'\') \\in \\mathbb{R}^{r} \\times \\mathbb{R}^{n-r}$，$f$ 拆成 $(f\', f\'\') \\in \\mathbb{R}^{r} \\times \\mathbb{R}^{m-r}$。则 $D_{x\'} f\'(a)$ 可逆。',
        '',
        '**第二步：把 $f\'$ 当成新坐标。** 令 $\\Phi(x\', x\'\') := \\bigl( f\'(x\', x\'\'),\\ x\'\' \\bigr)$。它的导数在 $a$ 处是块矩阵 $\\begin{pmatrix} D_{x\'}f\' & D_{x\'\'}f\' \\\\ 0 & I_{n-r} \\end{pmatrix}$，行列式 $= \\det D_{x\'}f\' \\ne 0$，故由逆映射定理（`thm.inverse-function`）$\\Phi$ 在 $a$ 附近是 $C^{1}$ 坐标变换。在 $\\Phi$ 坐标下（记新坐标仍为 $(y\', y\'\')$，其中 $y\' = f\'(x\',x\'\')$、$y\'\' = x\'\'$），$\\Phi$ 把 $f$ 变成',
        '',
        '$$f \\circ \\Phi^{-1}(y\', y\'\') = \\bigl( y\',\\ \\widehat f(y\', y\'\') \\bigr)$$',
        '',
        '其中 $\\widehat f$ 的取值在 $\\mathbb{R}^{m-r}$ 里。**这一步用掉了「$f\'$ 的前 $r$ 个分量可以当坐标」这个事实。**',
        '',
        '**第三步：$\\widehat f$ 不依赖 $y\'\'$。** 由**常秩**假设，$D(f\\circ\\Phi^{-1})$ 在每点秩恒为 $r$；而它的前 $r$ 行是 $(I_r\\ \\ 0)$（因为第一分量就是 $y\'$），于是后 $m - r$ 行必须是前 $r$ 行的线性组合。设后 $m-r$ 行的第一块为 $D_{y\'}\\widehat f$，则',
        '',
        '$$\\operatorname{rank}\\begin{pmatrix} I_r & 0 \\\\ D_{y\'}\\widehat f & D_{y\'\'}\\widehat f \\end{pmatrix} = r \\iff D_{y\'\'}\\widehat f \\equiv 0$$',
        '',
        '（若某点 $D_{y\'\'}\\widehat f \\ne 0$，则该点的秩 $> r$，与常秩矛盾。）于是 $\\widehat f$ 在连通邻域上只依赖 $y\'$：$\\widehat f = h(y\')$。',
        '',
        '**第四步：再用一次逆映射定理把 $h$ 拉直。** $m - r$ 个分量 $\\widehat f_1, \\ldots, \\widehat f_{m-r}$ 由第二步的秩条件知它们在 $y\' = a\'$ 处的 Jacobi 矩阵秩为 $m - r$（否则整体秩会超过 $r$）；重排后可设 $h$ 的前 $m-r$ 个分量构成满秩。在值域上取坐标变换 $\\psi(y\', z\', z\'\') := (y\',\\ h_1(y\'), \\ldots, h_{m-r}(y\'),\\ z\'\')$，其导数可逆（块结构同上），于是 $\\psi \\circ f \\circ \\Phi^{-1}$ 就是 $(y\', y\'\') \\mapsto (y\', 0, \\ldots, 0)$。',
        '',
        '**第五步：整理。** 把 $\\varphi := \\Phi^{-1}$（定义域坐标）、$\\psi$（值域坐标）代入即得结论。∎'
      ].join('\n'),
      note: '⚠ 第三步用到「邻域连通 + 导数为零 $\\implies$ 常值」；这里可以取球邻域（凸、连通）规避讨论。⭐ 整条证明就是**三次换坐标**：把 $f\'$ 变成坐标、把 $\\widehat f$ 说成不依赖 $y\'\'$、把 $h$ 拉直。'
    },
    {
      id: 'imp.regular-value',
      kind: 'implication',
      sources: ['thm.implicit-function'],
      target: 'thm.regular-value',
      title: '隐函数定理 $\\implies$ 正则值的原像是子流形',
      proof: [
        '设 $c$ 是正则值、$x_0 \\in f^{-1}(c)$。要在 $x_0$ 附近把 $f^{-1}(c)$ 写成图。',
        '',
        '**第一步：选主元。** $Df(x_0)$ 是 $m \\times n$ 满秩矩阵，故有某个 $m \\times m$ 子式非零。重排坐标使**后** $m$ 个坐标对应的子式非零（把 $x$ 写成 $(u, v) \\in \\mathbb{R}^{n-m} \\times \\mathbb{R}^{m}$）。',
        '',
        '**第二步：用隐函数定理解出 $v$。** 令 $F(u, v) := f(u, v) - c$。则 $F(x_0) = 0$，且 $D_vF(x_0)$ 就是上一步那个可逆的 $m \\times m$ 块。由隐函数定理（`thm.implicit-function`），存在 $u_0$ 的邻域 $V$ 与唯一 $C^{1}$ 映射 $g : V \\to \\mathbb{R}^{m}$ 使 $g(u_0) = v_0$ 且 $F(u, g(u)) = 0$。',
        '',
        '**第三步：认出图。** 由第二步，',
        '',
        '$$f^{-1}(c) \\cap (V \\times \\mathbb{R}^{m}) = \\{(u, g(u)) : u \\in V\\}$$',
        '',
        '右边是 $C^{1}$ 函数的**图**，即 $n - m$ 维子流形；而 $x_0$ 是它的内点。**每个** $x_0 \\in f^{-1}(c)$ 都能这样处理，所以 $f^{-1}(c)$ 是 $n - m$ 维子流形。∎'
      ].join('\n'),
      note: '⭐ 「子流形」在这里的操作定义就是「局部是 $C^{1}$ 函数的图」—— 这条定理顺带说明了几件事等价：局部是图、局部由若干独立方程定义、局部同胚于开球。⚠ 结论里的 $C^{1}$ 只用到 $f \\in C^{1}$；要「光滑子流形」就把 $f$ 提成 $C^{\\infty}$。'
    },
    {
      id: 'imp.lagrange-multiplier',
      kind: 'implication',
      sources: ['thm.regular-value'],
      target: 'thm.lagrange-multiplier',
      title: '切空间 = $\\ker Dg(a)$ + 极值 $\\implies$ 乘子存在',
      proof: [
        '记 $M := g^{-1}(0)$。由假设 $\\operatorname{rank} Dg(a) = m$，$a$ 是 $M$ 的正则点，于是由 `thm.regular-value`，$M$ 在 $a$ 附近是 $(n-m)$ 维子流形。',
        '',
        '**第一步：切空间 = $\\ker Dg(a)$。** $M$ 是 $g$ 的水平集，故 $M$ 上任何一条过 $a$ 的曲线的速度向量 $\\gamma\'(0)$ 都满足 $Dg(a)\\gamma\'(0) = 0$（对 $g \\circ \\gamma \\equiv 0$ 求导）。两个维度都对：$\\dim \\ker Dg(a) = n - m = \\dim M$，所以',
        '',
        '$$T_a M = \\ker Dg(a)$$',
        '',
        '**第二步：$Df(a)$ 在 $T_aM$ 上为零。** 设 $v \\in T_aM$，取过 $a$ 的曲线 $\\gamma$（$\\gamma(0) = a$，$\\gamma\'(0) = v$，$\\gamma \\subset M$）。函数 $t \\mapsto f(\\gamma(t))$ 在 $t = 0$ 取局部极值，故其导数为零：由链式法则 $Df(a)(v) = 0$。',
        '',
        '**第三步：纯线性代数。** 现在有两个线性映射 $Dg(a) : \\mathbb{R}^{n} \\to \\mathbb{R}^{m}$（满射）与 $Df(a) : \\mathbb{R}^{n} \\to \\mathbb{R}$（线性型），满足',
        '',
        '$$\\ker Dg(a) \\subseteq \\ker Df(a)$$',
        '',
        '**引理（因子化）**：若线性映射 $S : E \\to F$ 满射、线性型 $\\ell : E \\to K$ 满足 $\\ker S \\subseteq \\ker \\ell$，则 $\\ell$ 可分解为 $\\ell = \\lambda \\circ S$，其中 $\\lambda : F \\to K$ 线性。',
        '',
        '**引理的证明**：由秩–零化度，$S$ 诱导线性同构 $\\overline S : E/\\ker S \\to F$；而 $\\ker S \\subseteq \\ker \\ell$ 说明 $\\ell$ 穿过商，给出 $\\overline \\ell : E/\\ker S \\to K$。取 $\\lambda := \\overline \\ell \\circ \\overline S^{-1}$ 即可。∎（引理）',
        '',
        '**第四步：翻译回梯度。** 把 $\\lambda$ 在 $\\mathbb{R}^{m}$ 的标准基下写成 $(\\lambda_1, \\ldots, \\lambda_m)$，即得 $Df(a) = \\sum_i \\lambda_i Dg_i(a)$。再用标准内积与 Riesz 表示（每边换成梯度向量）得 $\\nabla f(a) = \\sum_i \\lambda_i \\nabla g_i(a)$。∎'
      ].join('\n'),
      note: '⭐ 这条证明完全没有用到 $M$ 的几何 —— **极值的分析内容只有第二步一行**，其余全是线性代数（引理）。这也是乘子法能做出来的原因：它是一条「对偶空间里取正交补」的事实。'
    },
    {
      id: 'imp.morse-lemma',
      kind: 'implication',
      sources: ['thm.taylor-multi', 'thm.mixed-partials'],
      target: 'thm.morse-lemma',
      title: '积分形式的 Taylor 余项 + 对称矩阵的光滑配方 $\\implies$ Morse 引理',
      proof: [
        '**第一步：把一阶 Taylor 余项写成积分（避开「$\'\\theta$ 依赖 $h$」这个坑）。** 对 $\\varphi(t) := f(a + t(x - a))$ 用带积分余项的 Taylor 公式，',
        '',
        '$$f(x) - f(a) = \\varphi(1) - \\varphi(0) = \\varphi\'(0) + \\int_0^1 (1 - t)\\,\\varphi\'\'(t)\\,dt = 0 + \\sum_{i,j} h_{ij}(x)\\,(x_i - a_i)(x_j - a_j)$$',
        '',
        '其中（$\\varphi\'(0) = Df(a)(x-a) = 0$ 用了临界性）',
        '',
        '$$h_{ij}(x) := \\int_0^1 (1 - t)\\, \\partial_i\\partial_j f\\bigl( a + t(x - a) \\bigr)\\, dt$$',
        '',
        '**第二步：$h_{ij}$ 的性质。** 积分号下求导说明 $h_{ij}$ 与 $f$ 有同样的光滑性；$h_{ij}(a) = \\frac{1}{2}\\partial_i\\partial_j f(a)$；由 `thm.mixed-partials`，$h_{ij} = h_{ji}$（$f \\in C^{2}$ 即可）。记对称矩阵函数 $h(x) := (h_{ij}(x))$。于是',
        '',
        '$$f(x) - f(a) = (x - a)^{\\mathsf{T}}\\, h(x)\\, (x - a)$$',
        '',
        '**第三步：光滑配方（把 $h(x)$ 对角化）。** 在 $a$ 附近 $h(x)$ 非退化（因 $h(a) = \\frac{1}{2}H_f(a)$ 可逆，可逆是开条件）。用**光滑的 Gram–Schmidt / 配方法**对对称矩阵函数作合同变换：逐步消去非对角项，得到',
        '',
        '$$f(x) - f(a) = \\sum_{i=1}^{n} \\varepsilon_i\\, \\sigma_i(x)\\, \\bigl( y_i(x) \\bigr)^{2}, \\qquad \\varepsilon_i \\in \\{\\pm 1\\}$$',
        '',
        '其中 $\\sigma_i(x) > 0$ 光滑、$y_i(x)$ 是光滑函数且 $D y(a)$ 可逆（每一步的变换矩阵在 $a$ 附近可逆）。',
        '',
        '**第四步：把 $\\sigma_i$ 吸收进坐标。** 令 $u_i := \\sqrt{\\varepsilon_i\\sigma_i(x)}\\; y_i(x)$。因 $\\sigma_i > 0$，$u$ 是 $a$ 附近的光滑坐标（$Du(a)$ 可逆），而',
        '',
        '$$f - f(a) = \\sum_i \\varepsilon_i u_i^{2}$$',
        '',
        '**第五步：$\\varepsilon_i$ 的符号个数 = Morse 指数。** 由 $h(a) = \\frac{1}{2}H_f(a)$ 与合同变换保惯性（Sylvester 惯性定律），负号的个数正是 $H_f(a)$ 的负特征值个数 $k$。∎'
      ].join('\n'),
      note: '⭐ 第一步的积分写法是这条证明的技术核心：**它把 $o(\\|x-a\\|)$ 级别的余项变成了一个显式光滑的矩阵函数**，于是配方可以光滑地进行。若用 Lagrange 余项，$\\theta$ 依赖 $x$，配方就不是光滑的了。'
    },
    {
      id: 'imp.sard',
      kind: 'implication',
      sources: ['thm.taylor-multi'],
      target: 'thm.sard',
      title: '证明提纲：对 $m$ 归纳 + Whitney 分解 + Fubini',
      proof: [
        '⚠ **这是提纲，不是完整证明** —— 完整证明相当重，节点说明里已声明。以下只把骨架摆清楚，每一步都能在标准参考书中找到细节。',
        '',
        '**情形 $m = 1$：对 $n$ 归纳。** 把 $U$ 用可数多个边长 $\\delta$ 的闭方块盖住，在每个方块上对 $f$ 用带 Lagrange 余项的一阶 Taylor：',
        '',
        '$$f(x + h) = f(x) + Df(x)h + R(x, h), \\qquad |R(x,h)| \\le C\\|h\\|^{2}$$',
        '',
        '若 $x$ 是临界点（$Df(x) = 0$），则 $f$ 在该方块上的像被压进「以 $f(x)$ 为心、半径 $C\\delta^{2}$ 的区间」；把它再按 $x_1$ 切片，对每个切片用 $(n-1)$ 维的归纳假设（$f$ 在切片上的临界点集零测），再用 Fubini 把零测性从切片拼回整体。取 $\\delta \\to 0$ 得证。',
        '',
        '**一般 $m$：Whitney 分解。** 令 $S_i := \\{ x : \\operatorname{rank} Df(x) = i \\}$（$i = 0, 1, \\ldots, m-1$），临界点集是 $\\bigcup_i S_i$。要证每个 $f(S_i)$ 零测。对 $i$ 从大到小归纳（外层对 $m$ 归纳）：',
        '',
        '- **$S_i$ 中「$f$ 在该点局部 $i$ 维平坦」的那部分**：把 $S_i$ 局部写成 $\\mathbb{R}^{i}$ 上的图（秩定理思想），于是 $f|_{S_i}$ 局部是 $i$ 维映射，对 $i < m$ 用外层归纳假设（注意此时 $\\operatorname{rank} <$ 目标维数，直接套 $m\' = i$ 的归纳）；',
        '- **其余部分**：逐层剥去低维子集，每一层用 Fubini 降到 $n - 1$ 维，再用内层对 $n$ 的归纳。',
        '',
        '**收敛性：** 上面两处归纳都是「对 $(n, m)$ 的良序」进行的（按 $n + m$ 或按字典序），每一层都把问题降到更小的 $(n\', m\')$，有限步终止。',
        '',
        '**为什么需要 $k > n - m$：** 上面 $m = 1$ 那一层用了二阶 Taylor 余项 $O(\\|h\\|^{2})$；一般情形每降一维就多要一阶导数，累加需要 $k^{(m)} > n - m$ 阶。Whitney 的 $C^{1}$ 反例正说明这个门槛不可省。',
        '',
        '细节：Milnor《Topology from the Differentiable Viewpoint》§3；Sternberg《Lectures on Differential Geometry》§II.3；Guillemin–Pollack §2。∎（提纲）'
      ].join('\n'),
      note: '⚠ 「∎」在这里标记的是**提纲的完整交付**，不是定理的完整证明。这一条是本图上少数几条明确标注「不给完整证明」的定理之一 —— 理由是完整证明的篇幅与所用工具（Fubini + Whitney 分解）都超出了本团其余内容的层次。'
    }
  ]
});
