/* ==========================================================================
   内容包 · 定义之间的依赖（分层骨架）
   --------------------------------------------------------------------------
   和 90-definition-links.js 的分工：

     · 90-*  结论（定理 / 命题 / 推论）用到了哪些定义 —— 「谁在用它」
     · 92-*  **定义建立在哪些定义之上** —— 「它自己是怎么搭起来的」

   这一包让「定义」不再是平铺的：$\subseteq$ 与有序对在最底下，
   往上依次是关系 → 偏序 → σ-代数 → 测度 → 可测函数 → 积分 → L^p …
   每条都是「不看前一个就写不出后一个」的直接依赖，只连最直接的那一步，
   不连远房祖先。

   ⛔ 不连 ZF 九条公理（除了 90-* 里已有的那几条）：
      否则每个定义上面都会挂一堆「外延公理」，分层就没意义了。

   字段：definition = 作为前提的那个定义；usedBy = 建立在它之上的定义。
   格式：[前提, 依赖它的, 边 id, 说明]
   ========================================================================== */
window.MG = window.MG || {};

(function () {
  var E = [

    /* ------------------------------------------------ 集合的构造（最底层） */
    ['def.subset', 'def.rel', 'def-dep.subset-rel',
      '关系是 $A \\times B$ 的**子集**，定义域 $\\operatorname{dom} R$ 与值域 $\\operatorname{ran} R$ 也都是子集。'],
    ['def.rel', 'def.function', 'def-dep.rel-function',
      '函数是**特殊的关系**：只多要求「每个输入的输出唯一」。'],

    /* ---------------------------------------------------------- 序结构 */
    ['def.rel', 'def.poset', 'def-dep.rel-poset',
      '偏序 $\\preceq$ 是 $A$ 上的**二元关系**——先有关系，才有「自反、反对称、传递」这三条。'],
    ['def.subset', 'def.chain', 'def-dep.subset-chain',
      '链是 $P$ 的**子集**，只是额外要求两两可比。'],
    ['def.subset', 'def.bound', 'def-dep.subset-bound',
      '上界与极大元都是相对于 $S \\subseteq P$ 说的，条件用 $\\preceq$ 写成。'],
    ['def.subset', 'def.wellorder', 'def-dep.subset-wellorder',
      '「$W$ 的每个非空**子集**都有最小元」——良序性是靠子集量词说出来的。'],

    /* ---------------------------------------------------- 向量空间的基 */
    ['def.subset', 'def.vs', 'def-dep.subset-vs',
      '「$S$ 的每个**有限子集**都线性无关」——线性无关性是逐有限子集定义的。'],
    ['def.finchar', 'def.vs', 'def-dep.finchar-vs',
      '正因为逐有限子集定义，线性无关性**具有有限特征**（注里点明了这一步）。'],

    /* -------------------------------------------------------- 度量空间 */
    ['def.function', 'def.metric-space', 'def-dep.function-metric-space',
      '距离 $d : X \\times X \\to [0, +\\infty)$ 是一个**函数**，记号 $d(x, y)$ 用的就是函数值。'],
    ['def.metric-space', 'def.complete', 'def-dep.metric-complete',
      'Cauchy 列与收敛都是**关于距离空间** $(X, d)$ 说的。'],
    ['def.metric-space', 'def.totally-bounded', 'def-dep.metric-totally-bounded',
      '$\\varepsilon$ 网与开球 $B(x, \\varepsilon)$ 都定义在距离空间上。'],
    ['def.metric-space', 'def.sequentially-compact', 'def-dep.metric-seq-compact',
      '「子列收敛到 $X$ 中的点」里的收敛，用的就是这个 $d$。'],
    ['def.metric-space', 'def.compact', 'def-dep.metric-compact',
      '这一条陈述在距离空间 $(X, d)$ 上，开覆盖用的是由 $d$ 诱导的开集。'],

    /* ------------------------------------------------ 测度的构造：集合族 */
    ['def.subset', 'def.fundamental-class', 'def-dep.subset-fundamental-class',
      '$\\mathfrak{A} \\subseteq \\mathcal{P}(X)$：基本类首先是一族**子集**。'],
    ['def.subset', 'def.set-ring', 'def-dep.subset-set-ring',
      '同理，环与代数也是 $\\mathcal{P}(X)$ 的一族**子集**。'],
    ['def.subset', 'def.monotone-class', 'def-dep.subset-monotone-class',
      '单调类同样是 $\\mathcal{P}(X)$ 的一族**子集**。'],
    ['def.monotone-class', 'def.generated-sigma', 'def-dep.monotone-generated-sigma',
      '这条同时定义 $\\mathcal{M}(\\mathcal{E})$ 与 $\\mathfrak{m}(\\mathcal{E})$——后者就是**由 $\\mathcal{E}$ 生成的单调类**。'],
    ['def.function', 'def.product-sigma', 'def-dep.function-product-sigma',
      '投影 $\\pi_\\alpha$ 是**函数**，柱集 $\\pi_\\alpha^{-1}(E_\\alpha)$ 用的是逆像。'],

    /* ------------------------------------------------ 测度的构造：测度本身 */
    ['def.sigma-algebra', 'def.measure', 'def-dep.sigma-algebra-measure',
      '测度是定义在**$\\sigma$ 代数** $\\mathcal{M}$ 上的函数 $\\mu : \\mathcal{M} \\to [0, +\\infty]$。'],
    ['def.set-ring', 'def.premeasure', 'def-dep.set-ring-premeasure',
      '预测度的定义域只是一个**环**，不必是 $\\sigma$ 代数。'],
    ['def.measure', 'def.premeasure', 'def-dep.measure-premeasure',
      '「仍满足**测度的两条**」——预测度就是把测度的定义域从 $\\sigma$ 代数放宽到环。'],
    ['def.measure', 'def.finitely-additive', 'def-dep.measure-finitely-additive',
      '把测度的**可数**可加降成**有限**可加，就是有限可加测度。'],
    ['def.measure', 'def.null-set', 'def-dep.measure-null-set',
      '$\\mu$ 零集是「$\\mu(E) = 0$ 的可测集」，$E$ 与 $\\mu$ 都来自**测度空间**。'],
    ['def.subset', 'def.outer-measure', 'def-dep.subset-outer-measure',
      '外测度定义在**全体子集**上：$\\mu^* : \\mathcal{P}(X) \\to [0, +\\infty]$。'],
    ['def.power-set', 'def.outer-measure', 'def-dep.powerset-outer-measure',
      '定义域是**幂集** $\\mathcal{P}(X)$ —— 不是某个 $\\sigma$-代数。'],
    ['def.extended-real', 'def.outer-measure', 'def-dep.extreal-outer-measure',
      '取值落在**扩充实数** $[0, +\\infty]$ 里：外测度可以取 $+\\infty$（$\\mathbb{R}$ 的 Lebesgue 测度就是）。'],
    ['def.extended-real', 'def.measure', 'def-dep.extreal-measure',
      '测度也取值在 $[0, +\\infty]$ 里 —— 「$\\mu$ 是**测度**」这句话里的 $\\mu$ 是映到扩充实数的。'],
    ['def.outer-measure', 'def.caratheodory-measurable', 'def-dep.outer-carath',
      '「设 $\\mu^*$ 是 $X$ 上的**外测度**」——可测性完全由 $\\mu^*$ 一个对象定出来。'],
    ['def.borel', 'def.lebesgue-stieltjes', 'def-dep.borel-lebesgue-stieltjes',
      '$\\mu_F$ 是 $\\mathbb{R}$ 上的 **Borel 测度**：定义域是 $\\mathfrak{B}_\\mathbb{R}$。'],
    ['def.borel', 'def.regular-measure', 'def-dep.borel-regular',
      '正则性是**关于 Borel 测度**说的：外正则就是用开集去逼近 Borel 集。'],
    ['def.compact', 'def.regular-measure', 'def-dep.compact-regular',
      '第一条要求「$\\nu(K) < \\infty$ 对每个**紧集** $K$ 成立」。'],

    /* ------------------------------------------------------------ 积分 */
    ['def.sigma-algebra', 'def.measurable-function', 'def-dep.sigma-algebra-measurable-fn',
      '可测空间 $(X, \\mathcal{M})$ 就是「集合 $+$ $\\sigma$ 代数」；可测性说的是原像落在 $\\mathcal{M}$ 里。'],
    ['def.measurable-function', 'def.lplus', 'def-dep.measurable-fn-lplus',
      '$L^+$ 是「取值在 $[0, +\\infty]$ 里的**可测**函数」全体。'],
    ['def.measure', 'def.lplus', 'def-dep.measure-lplus',
      '$L^+$ 要**先固定一个测度空间** $(X, \\mathcal{M}, \\mu)$ 才谈得上。'],
    ['def.measure', 'def.integral-simple', 'def-dep.measure-integral-simple',
      '加权和 $\\sum_j a_j \\, \\mu(E_j)$ 里的 $\\mu$ 是**测度**。'],
    ['def.lplus', 'def.integral-nonneg', 'def-dep.lplus-integral-nonneg',
      '定义写成 $\\int f := \\sup \\{ \\int \\varphi : 0 \\le \\varphi \\le f \\}$，其中 $f \\in L^+$。'],
    ['def.integral-nonneg', 'def.integral-complex', 'def-dep.nonneg-integral-complex',
      '正负部的积分 $\\int f^+$ 与 $\\int f^-$ 用的都是**非负函数的积分**。'],
    ['def.integral-nonneg', 'def.integrable', 'def-dep.nonneg-integral-integrable',
      '可积的判据 $\\int |f| < \\infty$ 是一个非负函数的积分。'],
    ['def.integral-complex', 'def.integrable', 'def-dep.integral-complex-integrable',
      '实值情形要先拆成正负部（复函数的积分），再要求这两个积分都有限。'],
    ['def.measurable-function', 'def.convergence-modes', 'def-dep.measurable-fn-convergence',
      '五种收敛里的 $f_n$ 与 $f$ 都要求**可测**。'],
    ['def.measure', 'def.convergence-modes', 'def-dep.measure-convergence',
      'a.e. 收敛与依测度收敛里的零集、$\\mu(\\{\\cdots\\}) $ 都用**测度**。'],
    ['def.integrable', 'def.convergence-modes', 'def-dep.integrable-convergence',
      '$L^1$ 收敛是 $\\int |f_n - f| \\to 0$，用到**可积**这个概念。'],
    ['def.measurable-function', 'def.cauchy-in-measure', 'def-dep.measurable-fn-cauchy-in-measure',
      '依测度 Cauchy 是**可测函数列**的性质。'],
    ['def.measure', 'def.cauchy-in-measure', 'def-dep.measure-cauchy-in-measure',
      '定义里的 $\\mu(\\{\\cdots\\})$ 是测度。'],
    ['def.measure', 'def.product-measure', 'def-dep.measure-product-measure',
      '$\\mu \\times \\nu$ 是由两个**测度** $\\mu$、$\\nu$ 造出来的。'],
    ['def.outer-measure', 'def.product-measure', 'def-dep.outer-product-measure',
      '扩张这一步：$\\mu_{0}$ **诱导出 $X \\times Y$ 上的外测度**，再限制到积 $\\sigma$ 代数上。'],
    ['def.subset', 'def.section', 'def-dep.subset-section',
      '截口 $E_x = \\{ y : (x, y) \\in E \\}$ 是**子集**（$E \\subseteq X \\times Y$）。'],

    /* -------------------------------------------------- 符号测度与分解 */
    ['def.sigma-algebra', 'def.signed-measure', 'def-dep.sigma-algebra-signed-measure',
      '符号测度定义在**可测空间** $(X, \\mathcal{M})$ 上。'],
    ['def.measure', 'def.signed-measure', 'def-dep.measure-signed-measure',
      '例 1 直接把符号测度写成两个**测度**之差 $\\nu = \\mu_1 - \\mu_2$。'],
    ['def.null-set', 'def.mutually-singular', 'def-dep.null-set-mutually-singular',
      '相互奇异要求「$E$ 是 $\\mu$ **零集**、$F$ 是 $\\nu$ 零集」。'],
    ['def.measure', 'def.mutually-singular', 'def-dep.measure-mutually-singular',
      '$\\mu$ 与 $\\nu$ 本身是（符号）**测度**。'],
    ['def.null-set', 'def.absolute-continuity', 'def-dep.null-set-absolute-continuity',
      '$\\nu \\ll \\mu$ 的定义是「每个 $\\mu$ **零集**都是 $\\nu$ 零集」。'],
    ['def.signed-measure', 'def.absolute-continuity', 'def-dep.signed-measure-absolute-continuity',
      '这里的 $\\nu$ 是一个**符号测度**。'],
    ['def.absolute-continuity', 'def.rn-derivative', 'def-dep.ac-rn-derivative',
      'RN 导数 $d\\nu/d\\mu$ 就是在 $\\nu \\ll \\mu$ 的前提下取到的那个 $f$。'],
    ['def.mutually-singular', 'def.rn-derivative', 'def-dep.mutually-singular-rn-derivative',
      'Lebesgue 分解 $\\nu = \\lambda + \\rho$ 里的奇异部分要求 $\\lambda \\perp \\mu$。'],
    ['def.measure', 'def.rn-derivative', 'def-dep.measure-rn-derivative',
      '定理要求 $\\nu \\ll \\mu$ 且两者都 $\\sigma$ 有限——$\\sigma$ 有限性是关于**测度**的。'],
    ['def.sigma-algebra', 'def.complex-measure', 'def-dep.sigma-algebra-complex-measure',
      '复测度同样定义在**可测空间** $(X, \\mathcal{M})$ 上。'],
    ['def.measure', 'def.complex-measure', 'def-dep.measure-complex-measure',
      '复测度是照着**测度**改写取值的：$\\nu : \\mathcal{M} \\to \\mathbb{C}$。'],
    ['def.signed-measure', 'def.complex-measure', 'def-dep.signed-complex-measure',
      '注里逐条与**符号测度**对照：复测度自动有限、级数自动绝对收敛。'],

    /* ---------------------------------------------------- ℝⁿ 上的微分 */
    ['def.measurable-function', 'def.locally-integrable', 'def-dep.measurable-fn-locally-integrable',
      '局部可积的对象是**可测函数** $f : \\mathbb{R}^n \\to \\mathbb{C}$。'],
    ['def.integrable', 'def.locally-integrable', 'def-dep.integrable-locally-integrable',
      '判据 $\\int_K |f| < \\infty$ 与 $L^1$ 的可积判据同源，只是把整个空间换成有界可测集 $K$。'],
    ['def.measure', 'def.average-operator', 'def-dep.measure-average-operator',
      '平均值里的 $m(B(r, x))$ 是 **Lebesgue 测度**。'],
    ['def.locally-integrable', 'def.lebesgue-set', 'def-dep.locally-integrable-lebesgue-set',
      '「设 $f \\in L^1_{loc}$」——Lebesgue 集只对**局部可积**函数谈。'],
    ['def.average-operator', 'def.lebesgue-set', 'def-dep.average-operator-lebesgue-set',
      '定义里的那个平均 $\\frac{1}{m(B)}\\int_B |f(y) - f(x)| dy$ 就是**平均算子**的样子。'],
    ['def.borel', 'def.shrinks-nicely', 'def-dep.borel-shrinks-nicely',
      '要求 $\\{ E_r \\}$ 是一族 **Borel 子集**，这样 $m(E_r)$ 才有意义。'],
    ['def.subset', 'def.shrinks-nicely', 'def-dep.subset-shrinks-nicely',
      '第一条是 $E_r \\subseteq B(r, x)$——一个**子集**关系。'],
    ['def.poset', 'def.real', 'def-dep.poset-real',
      '实数系是一个**全序**域：序公理里说的「全序」就是偏序再加上可比性。'],
    ['def.extended-real', 'def.conjugate-exponents', 'def-dep.extended-conjugate',
      '共轭指数里 $p = \\infty$ 要配 $q = 1$，约定 $1/\\infty = 0$ —— 用到了**扩充实数**。'],

    /* ------------------------------------------- 有界变差与绝对连续 */
    ['def.bounded-variation', 'def.nbv', 'def-dep.bv-nbv',
      '$NBV := \\{ F \\in BV : F$ 右连续且 $F(-\\infty) = 0 \\}$，整个定义建立在**有界变差**之上。'],
    ['def.borel', 'def.nbv', 'def-dep.borel-nbv',
      '加这两个条件的目的，是与 $\\mathbb{R}$ 上的**复 Borel 测度**一一对应。'],

    /* -------------------------------------------------------- L^p 空间 */
    ['def.measurable-function', 'def.lp-norm', 'def-dep.measurable-fn-lp-norm',
      '$L^p$ 的元素要求 $f$ **可测**且 $\\|f\\|_p < \\infty$。'],
    ['def.measure', 'def.lp-norm', 'def-dep.measure-lp-norm',
      '$\\|f\\|_p$ 里的积分是对**测度** $\\mu$ 取的。'],
    ['def.integral-nonneg', 'def.lp-norm', 'def-dep.nonneg-integral-lp-norm',
      '$\\|f\\|_p = \\left[ \\int |f|^p \\, d\\mu \\right]^{1/p}$ 用的是**非负函数的积分**。'],
    ['def.measure', 'def.essential-sup', 'def-dep.measure-essential-sup',
      '定义里出现 $\\mu(\\{ |f| > a \\}) = 0$，用的是**测度**。'],
    ['def.null-set', 'def.essential-sup', 'def-dep.null-set-essential-sup',
      '「把 $f$ 在**零集**上的取值统统不算」——这正是本性上界的意思。'],
    ['def.measurable-function', 'def.essential-sup', 'def-dep.measurable-fn-essential-sup',
      '$L^\\infty$ 的元素是**可测**且本性上界有限的函数。'],
    ['def.lp-norm', 'def.duality-map', 'def-dep.lp-norm-duality-map',
      '$\\varphi_g$ 定义在 $L^p$ 上，有界性要靠范数 $\\|f\\|_p$ 来说。'],
    ['def.conjugate-exponents', 'def.duality-map', 'def-dep.conjugate-duality-map',
      '「设 $p, q$ **共轭**，$g \\in L^q$」——共轭指数是这条定义的前提。'],
    ['def.integral-complex', 'def.duality-map', 'def-dep.integral-complex-duality-map',
      '$\\varphi_g(f) = \\int f g \\, d\\mu$ 本身是一个**积分**。'],
    ['def.essential-sup', 'def.duality-map', 'def-dep.essential-sup-duality-map',
      '$g \\in L^\\infty$ 那一头（$p = 1$）要用本性上界。'],

    /* ------------------------------------------------ 补漏：用到了却没连边 */
    ['def.function', 'def.measurable-function', 'def-dep.function-measurable-function',
      '可测性的载体是**函数** $f : X \\to Y$ —— 先有函数，才谈得上「每个可测集的原像可测」。'],
    ['def.signed-measure', 'def.regular-measure', 'def-dep.signed-regular-measure',
      '「**符号测度** $\\nu$ 叫正则 $\\iff$ $|\\nu|$ 正则」—— 正则性是借助符号测度说的。'],
    ['def.complex-measure', 'def.regular-measure', 'def-dep.complex-regular-measure',
      '同一条对**复测度**再说一遍。'],
    ['def.metric-space', 'def.shrinks-nicely', 'def-dep.metric-shrinks-nicely',
      '「$E_r \\subseteq B(r, x)$」里的 $B(r, x)$ 是**距离空间**里的球。'],
    ['def.measure', 'def.shrinks-nicely', 'def-dep.measure-shrinks-nicely',
      '「$m(E_r) > \\alpha \\cdot m(B(r, x))$」里的 $m$ 是一个**测度**。'],
    ['def.lplus', 'def.integral-simple', 'def-dep.lplus-integral-simple',
      '标准形式写的是「$\\varphi \\in L^+$ 是简单函数」—— 定义域落在 $L^+$ 里。'],

    /* --------------------------------------------------- 范畴论（地基） */
    ['def.power-set', 'def.universe', 'def-dep.power-universe',
      '宇宙的第三条要求 $x \\in U \\implies \\mathcal{P}(x) \\in U$，用的就是**幂集**。'],
    ['def.union-inter', 'def.universe', 'def-dep.union-universe',
      '第四条 $\\bigcup_{t \\in p} f(t) \\in U$ 用的是**并集**（指标集是 $U$ 里的一个集合，所以这里要的是「沿一个集合取并」）。'],
    ['def.pair', 'def.graph', 'def-dep.pair-graph',
      '四元组 $(V, E, s, t)$ 是**嵌套的有序对** —— 有序对是它的载体，先有有序对才写得下四元组。'],
    ['def.function', 'def.graph', 'def-dep.function-graph',
      '起点映射与终点映射 $s, t : E \\to V$ 是两个**函数**。'],
    ['def.graph', 'def.graph-morphism', 'def-dep.graph-graph-morphism',
      '图的态射是**图之间**的 —— 先有图这个对象。'],
    ['def.function', 'def.graph-morphism', 'def-dep.function-graph-morphism',
      '图的态射是一**对函数** $(\\varphi_1, \\varphi_2)$，再加上两条交换性等式。'],
    ['def.graph', 'def.category', 'def-dep.graph-category',
      '范畴是一个六元组，其中 $(\\mathcal{O}, M, s, t)$ **是一个图** —— 图是范畴的骨架，复合与单位是额外加上去的。'],
    ['thm.product', 'def.category', 'def-dep.product-category',
      '复合 $\\circ$ 是从 $M \\times M$ 里抠出来的那部分出发的，要先有**笛卡尔积**。'],
    ['def.subset', 'def.category', 'def-dep.subset-category',
      '$M \\times_{s,t} M = \\{ (f,g) \\in M \\times M : s(f) = t(g) \\}$ 是 $M \\times M$ 的一个**子集**。'],
    ['def.category', 'def.section-retraction', 'def-dep.category-section',
      '截面与收缩说的是范畴里**态射与单位态射**之间的关系，没有范畴就无从说起。']

  ];

  var edges = E.map(function (e) {
    return { id: e[2], kind: 'definition', definition: e[0], usedBy: e[1], note: e[3] };
  });

  (window.MG.packs = window.MG.packs || []).push({
    name: '定义之间的依赖',
    nodes: [],
    edges: edges
  });
})();
