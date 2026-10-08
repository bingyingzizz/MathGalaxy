/* ==========================================================================
   内容包 · 定义引用关系（蓝色 50% 线）
   --------------------------------------------------------------------------
   规则：如果某个结论的陈述/构造里出现了某个定义，就用一条蓝线把它们连起来。
   集中放在这个文件里，方便统一检查「哪些结论引用了哪些定义」。

   字段：definition = 定义节点的 id；usedBy = 用到它的那个节点 id。
   点击蓝线可以看到这条引用关系的具体说明。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '定义引用关系',
  nodes: [],

  edges: [

    /* ---------------------------------------------------------- 子集 */
    {
      id: 'def-link.sep-subset',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'ax.sep',
      note: '分离公理模式给出的 $B = \\{ x \\in A : \\varphi (x, p) \\}$ 恰好是 $A$ 的一个**子集**——"只从 $A$ 里挑元素"正是 $\\subseteq$ 的语义。'
    },
    {
      id: 'def-link.power-subset',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'ax.power',
      note: '幂集公理的陈述里直接出现了子集符号：$x \\in \\mathcal{P}(A) \\iff x \\subseteq A$。'
    },
    {
      id: 'def-link.finchar-subset',
      kind: 'definition',
      definition: 'def.subset',
      usedBy: 'def.finchar',
      note: '「$X$ 的每个**有限子集**都属于 $\\mathcal{A}$」——有限特征是靠子集概念说出来的。'
    },

    /* -------------------------------------------------------- 有序对 */
    {
      id: 'def-link.pair-pairing',
      kind: 'definition',
      definition: 'ax.pair',
      usedBy: 'def.pair',
      note: '有序对 $(a, b) = \\{\\{a\\}, \\{a, b\\}\\}$ 的**构造**要用到**配对公理**，它才成为集合。'
    },
    {
      id: 'def-link.pair-power',
      kind: 'definition',
      definition: 'ax.power',
      usedBy: 'def.pair',
      note: '同一个构造也要用到**幂集公理**：$\\{a, b\\}$ 的幂集里才装得下 $\\{\\{a\\}, \\{a, b\\}\\}$。'
    },
    {
      id: 'def-link.rel-pair',
      kind: 'definition',
      definition: 'def.pair',
      usedBy: 'def.rel',
      note: '关系被定义为「有序对的集合」，函数是特殊的关系，因此整个定义都建立在有序对之上。'
    },
    {
      id: 'def-link.product-pair',
      kind: 'definition',
      definition: 'def.pair',
      usedBy: 'thm.product',
      note: '$A \\times B = \\{ (a, b) : a \\in A, b \\in B \\}$ 中的元素就是有序对。'
    },

    /* ---------------------------------------------------- 关系与函数 */
    {
      id: 'def-link.choicefn-rel',
      kind: 'definition',
      definition: 'def.function',
      usedBy: 'def.choicefn',
      note: '选择函数首先是一个**函数**：定义里直接要求「$f$ 是函数，$\\operatorname{dom} f = F$」。'
    },
    {
      id: 'def-link.ac-choicefn',
      kind: 'definition',
      definition: 'def.choicefn',
      usedBy: 'ax.choice',
      note: '选择公理的陈述直接使用了「选择函数」这个词：每个 $\\emptyset \\notin F$ 的集合族都有选择函数。'
    },

    /* ---------------------------------------------------------- 序 */
    {
      id: 'def-link.chain-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.chain',
      note: '链是偏序集的子集：定义里用到了偏序 $\\preceq$ 与可比性。'
    },
    {
      id: 'def-link.bound-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.bound',
      note: '上界、极大元、最大元都是相对于一个偏序集 $(P, \\preceq )$ 而言的。'
    },
    {
      id: 'def-link.wellorder-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.wellorder',
      note: '良序集首先是全序集（从而也是偏序集），只是在它上面加了「非空子集有最小元」。'
    },
    {
      id: 'def-link.finchar-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.finchar',
      note: '有限特征的最典型例子就是「偏序集的链族」，定义条目里举了这个例子。'
    },
    {
      id: 'def-link.finchar-chain',
      kind: 'definition',
      definition: 'def.chain',
      usedBy: 'def.finchar',
      note: '「$X$ 是链 $\\iff X$ 的每个有限子集是链」——这是链族具有有限特征的原因，也是 $Tukey \\implies Hausdorff$ 的全部关键。'
    },
    {
      id: 'def-link.zorn-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'lem.zorn',
      note: '佐恩引理是**关于偏序集**的命题：前提与结论都离不开 $\\preceq$ 与上界。'
    },
    {
      id: 'def-link.zorn-chain',
      kind: 'definition',
      definition: 'def.chain',
      usedBy: 'lem.zorn',
      note: '「$P$ 的每个链都有上界」是佐恩引理的核心条件。'
    },
    {
      id: 'def-link.zorn-bound',
      kind: 'definition',
      definition: 'def.bound',
      usedBy: 'lem.zorn',
      note: '条件用的是「上界」，结论用的是「极大元」——特别要注意不是「最大元」。'
    },
    {
      id: 'def-link.hausdorff-poset',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'thm.hausdorff',
      note: 'Hausdorff 极大原理陈述在偏序集 $(P, \\preceq )$ 上。'
    },
    {
      id: 'def-link.hausdorff-chain',
      kind: 'definition',
      definition: 'def.chain',
      usedBy: 'thm.hausdorff',
      note: '整条原理就是在说「链可以长到极大」。'
    },
    {
      id: 'def-link.tukey-finchar',
      kind: 'definition',
      definition: 'def.finchar',
      usedBy: 'lem.tukey',
      note: 'Tukey 引理的唯一前提就是「该集合族具有有限特征」。'
    },
    {
      id: 'def-link.wo-wellorder',
      kind: 'definition',
      definition: 'def.wellorder',
      usedBy: 'thm.wellordering',
      note: '良序定理断言「每个集合都能被良序化」，用到的正是良序集这个概念。'
    },
    {
      id: 'def-link.basis-vs',
      kind: 'definition',
      definition: 'def.vs',
      usedBy: 'thm.vsbasis',
      note: '「每个向量空间有基」中的「基」由线性无关与生成两个概念定义。'
    },

    /* ------------------------------------------------------------------
       外延公理在图上曾经是**孤点**（唯一一条边都没有的节点）——
       因为「一条 ZF 公理都不加」这条规则。这里只补正文里**明确引用**它的地方，
       不是把什么都挂到 ZF 上。
       ------------------------------------------------------------------ */
    {
      id: 'def-link.ext-subset',
      kind: 'definition',
      definition: 'ax.ext',
      usedBy: 'def.subset',
      note: '子集最常用的那条性质——$A = B \\iff A \\subseteq B \\wedge B \\subseteq A$（**两边互包**）——正是**外延公理**的直接推论。'
    },
    {
      id: 'def-link.ext-empty',
      kind: 'definition',
      definition: 'ax.ext',
      usedBy: 'thm.empty',
      note: '空集的存在由分离公理模式给出，但「这样的集合**至多一个**」靠的是**外延公理**——所以 $\\emptyset$ 这个记号才有意义。'
    },

    /* ==========================================================================
       补漏（2026-09-22）：上面这些是「结论 → 它用到的定义」，但覆盖不全 ——
       有一批定理/命题/推论当时一条入边都没有，结果全都堆在最底层，
       分层就看不出来了。下面按同样的规则补齐：陈述里出现了哪个定义，就连哪条。
       （名字里带 $\sigma$ 有限的，连的是 def.measure-space；
         带 a.e. / 零集的，连 def.null-set。）
       ========================================================================== */

    /* ------------------------------------------------ 集合论 / 序理论 */
    {
      id: 'def-link.wellorder-hartogs',
      kind: 'definition',
      definition: 'def.wellorder',
      usedBy: 'thm.hartogs',
      note: 'Hartogs 数取的是「最小的那种**序数**」，而序数就是传递的良序集。'
    },

    /* ----------------------------------------- 测度的构造：Lebesgue–Stieltjes */
    {
      id: 'def-link.premeasure-ls-premeasure',
      kind: 'definition',
      definition: 'def.premeasure',
      usedBy: 'prop.ls-premeasure',
      note: '命题的结论就是「$\\mu_0$ 是 $\\mathfrak{A}$ 上的一个**预测度**」。'
    },
    {
      id: 'def-link.fundamental-class-ls-premeasure',
      kind: 'definition',
      definition: 'def.fundamental-class',
      usedBy: 'prop.ls-premeasure',
      note: '半开区间族 $\\{ (a, b] : a < b \\}$ 正是一个**基本类**；取它的有限不交并就得到 $\\mathfrak{A}$。'
    },

    /* ------------------------------------------------------------ 积分 */
    {
      id: 'def-link.integral-simple-props',
      kind: 'definition',
      definition: 'def.integral-simple',
      usedBy: 'prop.simple-integral-props',
      note: '四条性质都是关于**简单函数的积分** $\\int \\varphi \\, d\\mu$ 的。'
    },
    {
      id: 'def-link.simple-function-props',
      kind: 'definition',
      definition: 'def.simple-function',
      usedBy: 'prop.simple-integral-props',
      note: '命题谈的对象就是两个简单函数 $\\varphi$、$\\psi$。'
    },
    {
      id: 'def-link.lplus-fatou-cor',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'cor.fatou',
      note: '$\\{f_n\\} \\subseteq L^+$、$f \\in L^+$：整条推论都活在**非负可测函数**里。'
    },
    {
      id: 'def-link.lplus-finite-integral',
      kind: 'definition',
      definition: 'def.lplus',
      usedBy: 'prop.finite-integral-consequences',
      note: '前提是 $f \\in L^+$ 且 $\\int f < \\infty$。'
    },
    {
      id: 'def-link.null-set-finite-integral',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'prop.finite-integral-consequences',
      note: '结论第一条说的是「$\\{x : f(x) = \\infty\\}$ 是**零集**」。'
    },
    {
      id: 'def-link.measure-space-finite-integral',
      kind: 'definition',
      definition: 'def.measure-space',
      usedBy: 'prop.finite-integral-consequences',
      note: '结论第二条用的是 **$\\sigma$ 有限**这个概念。'
    },
    {
      id: 'def-link.integrable-integral-abs',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.integral-abs-ineq',
      note: '前提 $f \\in L^1(\\mu)$ 就是**可积**。'
    },
    {
      id: 'def-link.integral-complex-abs',
      kind: 'definition',
      definition: 'def.integral-complex',
      usedBy: 'prop.integral-abs-ineq',
      note: '$\\int f \\, d\\mu$ 这个记号走的是**复值函数的积分**。'
    },
    {
      id: 'def-link.integrable-L1-support',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.L1-support-sigma-finite',
      note: '前提就是 $f \\in L^1(\\mu)$。'
    },
    {
      id: 'def-link.measure-space-L1-support',
      kind: 'definition',
      definition: 'def.measure-space',
      usedBy: 'prop.L1-support-sigma-finite',
      note: '结论说的是 $\\{x : f(x) \\ne 0\\}$ **$\\sigma$ 有限**。'
    },

    /* -------------------------------------------------- 符号测度与分解 */
    {
      id: 'def-link.posneg-positive-closure',
      kind: 'definition',
      definition: 'def.positive-negative-null',
      usedBy: 'prop.positive-set-closure',
      note: '「正集」就是这一条定义的三种集合之一。'
    },
    {
      id: 'def-link.integrable-ac-integral',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'cor.ac-integral-continuity',
      note: '前提 $f \\in L^1(\\mu)$；积分 $\\int_E f$ 要可积才有意义。'
    },
    {
      id: 'def-link.ac-integral-continuity',
      kind: 'definition',
      definition: 'def.absolute-continuity',
      usedBy: 'cor.ac-integral-continuity',
      note: '这条就是「积分关于测度**绝对连续**」的 $\\varepsilon$–$\\delta$ 形式。'
    },
    {
      id: 'def-link.rn-derivative-inverse',
      kind: 'definition',
      definition: 'def.rn-derivative',
      usedBy: 'cor.rn-inverse',
      note: '两边的 $d\\mu/d\\lambda$ 与 $d\\lambda/d\\mu$ 都是 **RN 导数**。'
    },
    {
      id: 'def-link.ac-rn-inverse',
      kind: 'definition',
      definition: 'def.absolute-continuity',
      usedBy: 'cor.rn-inverse',
      note: '前提是 $\\mu \\ll \\lambda$ 且 $\\lambda \\ll \\mu$——**互为绝对连续**。'
    },

    /* ---------------------------------------------------- ℝⁿ 上的微分 */
    {
      id: 'def-link.metric-covering',
      kind: 'definition',
      definition: 'def.metric-space',
      usedBy: 'lem.covering',
      note: '引理里挑的就是一族**开球** $B_j$——开球是距离空间里的东西。'
    },
    {
      id: 'def-link.measure-covering',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'lem.covering',
      note: '$m(U)$、$\\sum m(B_j)$ 里的 $m$ 是**测度**（Lebesgue 测度）。'
    },
    {
      id: 'def-link.average-operator-continuous',
      kind: 'definition',
      definition: 'def.average-operator',
      usedBy: 'lem.average-continuous',
      note: '引理说的就是**平均算子** $A_r f(x)$ 关于 $(r, x)$ 的连续性。'
    },
    {
      id: 'def-link.locally-integrable-average-continuous',
      kind: 'definition',
      definition: 'def.locally-integrable',
      usedBy: 'lem.average-continuous',
      note: '前提 $f \\in L^1_{loc}$——平均算子只对**局部可积**函数定义。'
    },

    /* ------------------------------------------- 有界变差与绝对连续 */
    {
      id: 'def-link.integral-nonneg-monotone-derivative',
      kind: 'definition',
      definition: 'def.integral-nonneg',
      usedBy: 'prop.monotone-integral-derivative',
      note: '$\\int_a^b F\'$ 里 $F$ 递增所以 $F\' \\ge 0$，走的是**非负函数的积分**。'
    },
    {
      id: 'def-link.nbv-derivative',
      kind: 'definition',
      definition: 'def.nbv',
      usedBy: 'prop.nbv-derivative',
      note: '前提就是 $F \\in NBV$。'
    },
    {
      id: 'def-link.mutually-singular-nbv-derivative',
      kind: 'definition',
      definition: 'def.mutually-singular',
      usedBy: 'prop.nbv-derivative',
      note: '结论第一条 $\\mu_F \\perp m$ 用的是**相互奇异**。'
    },
    {
      id: 'def-link.ac-nbv-derivative',
      kind: 'definition',
      definition: 'def.absolute-continuity',
      usedBy: 'prop.nbv-derivative',
      note: '结论第二条 $\\mu_F \\ll m$ 用的是**绝对连续**。'
    },
    {
      id: 'def-link.rn-derivative-nbv-derivative',
      kind: 'definition',
      definition: 'def.rn-derivative',
      usedBy: 'prop.nbv-derivative',
      note: '$F(x) = \\int_{-\\infty}^{x} F\'$ 等于说 $F\' $ 就是那个 **RN 导数** $d\\mu_F/dm$。'
    },
    {
      id: 'def-link.ac-function-subset-bv',
      kind: 'definition',
      definition: 'def.ac-function',
      usedBy: 'lem.ac-subset-bv',
      note: '等式的左边就是**绝对连续函数**全体 $AC([a, b])$。'
    },
    {
      id: 'def-link.bv-subset-bv',
      kind: 'definition',
      definition: 'def.bounded-variation',
      usedBy: 'lem.ac-subset-bv',
      note: '等式的右边是**有界变差**函数全体 $BV([a, b])$。'
    },

    /* -------------------------------------------------------- L^p 空间 */
    {
      id: 'def-link.conjugate-young',
      kind: 'definition',
      definition: 'def.conjugate-exponents',
      usedBy: 'lem.young-inequality',
      note: '把 $\\lambda$ 取成 $1/p$，则 $\\lambda$ 与 $1 - \\lambda$ 正是一对**共轭指数**——Young 不等式是 Hölder 的算术底座。'
    },
    {
      id: 'def-link.simple-function-dense',
      kind: 'definition',
      definition: 'def.simple-function',
      usedBy: 'prop.dense-simple-compact-support',
      note: '被证明稠密的那一族就是**简单函数**（再要求紧支集）。'
    },
    {
      id: 'def-link.lp-norm-dense',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'prop.dense-simple-compact-support',
      note: '「稠密」是在 $L^p$ 里说的，要用 $\\|\\cdot\\|_p$。'
    },
    {
      id: 'def-link.lp-norm-lq-sum',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'prop.lq-in-lp-plus-lr',
      note: '$L^q \\subseteq L^p + L^r$ 里的三个空间都是 $L^p$ 型的。'
    },
    {
      id: 'def-link.lp-norm-interpolation',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'prop.lp-inter-lr-in-lq',
      note: '插值不等式 $\\|f\\|_q \\le \\|f\\|_p^{\\lambda} \\|f\\|_r^{1-\\lambda}$ 全是 $\\|\\cdot\\|_p$ 型的量。'
    },
    {
      id: 'def-link.essential-sup-interpolation',
      kind: 'definition',
      definition: 'def.essential-sup',
      usedBy: 'prop.lp-inter-lr-in-lq',
      note: '$r = \\infty$ 那一端要把 $\\|\\cdot\\|_r$ 读成**本性上界**。'
    },
    {
      id: 'def-link.lp-norm-ell-p',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'prop.ell-p-inclusion',
      note: '$\\ell^p$ 就是计数测度下的 $L^p$，范数还是 $\\|\\cdot\\|_p$。'
    },
    {
      id: 'def-link.lp-norm-finite',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'prop.lp-inclusion-finite',
      note: '结论 $L^q(\\mu) \\subseteq L^p(\\mu)$ 里的两个空间都是 $L^p$ 型的。'
    },
    {
      id: 'def-link.measure-space-lp-finite',
      kind: 'definition',
      definition: 'def.measure-space',
      usedBy: 'prop.lp-inclusion-finite',
      note: '前提 $\\mu(X) < \\infty$ 用的是**有限测度**这个概念。'
    },

    {
      id: 'def-link.sup-real-ordered-field',
      kind: 'definition',
      definition: 'def.bound',
      usedBy: 'thm.real-ordered-field',
      note: '**(iii) 完备性（确界原理）**说的正是「每个非空有上界的子集都有**上确界**」—— 结论是用 $\\sup$ 写出来的。'
    },
    {
      id: 'def-link.power-powerset',
      kind: 'definition',
      definition: 'ax.power',
      usedBy: 'def.power-set',
      note: '**幂集公理**才是「$\\mathcal{P}(X)$ 是一个集合」的依据 —— 陈述里那句「由幂集公理，$\\mathcal{P}(X)$ 确实是集合」说的就是它。'
    },
    {
      id: 'def-link.choice-cardinal-comparable',
      kind: 'definition',
      definition: 'ax.choice',
      usedBy: 'thm.cardinal-comparable',
      note: '基数可比定理的前提里点名了**选择公理**：没有它，两个基数未必比得出大小。'
    },

    /* ------------------------------------------------ 补漏：用到了却没连边 */
    {
      id: 'def-link.metric-borel-product',
      kind: 'definition',
      definition: 'def.metric-space',
      usedBy: 'cor.borel-product',
      note: '设 $X_1, X_2, \\ldots$ 是**距离空间**，$X = \\prod_j X_j$ 配以积度量 —— 投影连续、球与可分性都在距离空间里说。'
    },
    {
      id: 'def-link.signed-total-variation',
      kind: 'definition',
      definition: 'def.signed-measure',
      usedBy: 'prop.total-variation-basics',
      note: '设 $\\nu$ 是**符号测度**，$|\\nu|$ 是它的全变差。'
    },
    {
      id: 'def-link.complex-total-variation',
      kind: 'definition',
      definition: 'def.complex-measure',
      usedBy: 'prop.total-variation-basics',
      note: '同一条命题对**复测度**也适用（全变差对两者定义一致）。'
    },
    {
      id: 'def-link.ae-mct-ae',
      kind: 'definition',
      definition: 'def.ae',
      usedBy: 'cor.mct-ae',
      note: '前提放宽成「对**几乎处处**的 $x$ 有 $f_n \\uparrow f$」—— 这就是这条推论与 MCT 的唯一区别。'
    },
    {
      id: 'def-link.ae-integral-zero',
      kind: 'definition',
      definition: 'def.ae',
      usedBy: 'prop.integral-zero-iff',
      note: '结论「$f = 0$ **几乎处处**」里的 a.e. 就是它。'
    },
    {
      id: 'def-link.ae-complete-measurable',
      kind: 'definition',
      definition: 'def.ae',
      usedBy: 'prop.complete-measurable',
      note: '**(a)** 的 $f = g$ 与 **(b)** 的 $f_n \\to f$ 都是在 **a.e.** 意义下说的。'
    },
    {
      id: 'def-link.ae-completion-measurable-fn',
      kind: 'definition',
      definition: 'def.ae',
      usedBy: 'prop.completion-measurable-function',
      note: '结论 $f = g$ 是 $\\bar{\\mu}$-**a.e.** 成立的。'
    },
    {
      id: 'def-link.ae-cauchy-in-measure',
      kind: 'definition',
      definition: 'def.ae',
      usedBy: 'thm.cauchy-in-measure',
      note: '结论里抽出的子列是**几乎处处**收敛的。'
    },
    {
      id: 'def-link.ae-monotone-differentiable',
      kind: 'definition',
      definition: 'def.ae',
      usedBy: 'thm.monotone-differentiable',
      note: '结论是 $F$ 与 $G$ 都 **a.e. 可导**且导数 a.e. 相等。'
    },
    {
      id: 'def-link.ae-fatou',
      kind: 'definition',
      definition: 'def.ae',
      usedBy: 'cor.fatou',
      note: '前提「$f_n \\to f$ **a.e.**」与 Fatou 引理的差别就在这里。'
    },
    {
      id: 'def-link.integrable-integrals-equal',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.integrals-equal-iff',
      note: '前提 $f, g \\in L^1(\\mu)$ 说的是两个函数都**可积**。'
    },
    {
      id: 'def-link.integrable-linf',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.linf-properties',
      note: '**(a)** 里出现的 $f \\in L^1$ 就是**可积**。'
    },
    {
      id: 'def-link.integrable-nbv-derivative',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.nbv-derivative',
      note: '结论 $F\' \\in L^1(m)$ 说的是**可积**。'
    },
    {
      id: 'def-link.integrable-integral-is-ac-nbv',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'cor.integral-is-ac-nbv',
      note: '**(1)** 的前提 $f \\in L^1(m)$ 是**可积**。'
    },

    /* ------------------------------------------------ 星系：范畴论 */
    {
      id: 'def-link.mono-presheaf-mono',
      kind: 'definition',
      definition: 'def.mono',
      usedBy: 'lem.presheaf-mono-pointwise',
      note: '结论说的「$\\varphi$ 是**单态射**（满态射）」是范畴论意义下的可消性，不是逐点单射 —— 逐点单射正是要证的内容。'
    },
    {
      id: 'def-link.limit-yoneda-embedding',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.yoneda-embedding',
      note: '「$\\delta$ **保持所有极限**」里的极限是**泛锥**那个极限。'
    },
    {
      id: 'def-link.limit-density',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'thm.density',
      note: '稠密性定理说 $T$ 是可表示预层的**余极限**。'
    },
    {
      id: 'def-link.fibered-product-slice',
      kind: 'definition',
      definition: 'def.fibered-product',
      usedBy: 'prop.slice-cartesian',
      note: '结论说那个方块是**笛卡尔的** —— 这正是纤维积定义里的说法。'
    },
    {
      id: 'def-link.ff-faithful-yoneda-embedding',
      kind: 'definition',
      definition: 'def.ff-faithful',
      usedBy: 'prop.yoneda-embedding',
      note: '「$\\delta$ 是**全忠实**函子」用的正是忠实与满的定义。'
    },
    {
      id: 'def-link.representable-yoneda',
      kind: 'definition',
      definition: 'def.representable',
      usedBy: 'lem.yoneda',
      note: '引理里的 $h^{X} = \\operatorname{Hom}_{\\mathcal{C}}(X, -)$ 正是那个**可表示函子**。'
    },
    {
      id: 'def-link.representable-criterion',
      kind: 'definition',
      definition: 'def.representable',
      usedBy: 'thm.represented-criterion',
      note: '定理的左右两边都是「被 $X$ **表示**」这件事的说法。'
    },
    {
      id: 'def-link.slice-category-density',
      kind: 'definition',
      definition: 'def.slice-category',
      usedBy: 'thm.density',
      note: '稠密性定理里的余极限正是**跑在切片范畴 $\\mathcal{C}_{T}$ 上**的。'
    },
    {
      id: 'def-link.presheaf-mono-pointwise',
      kind: 'definition',
      definition: 'def.presheaf',
      usedBy: 'lem.presheaf-mono-pointwise',
      note: '被检验的 $\\varphi : T \\implies T\'$ 是**预层**之间的自然变换。'
    },
    {
      id: 'def-link.adjoint-preserves-limits',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'thm.right-adjoint-preserves-limits',
      note: '定理的前提就是一对**伴随函子** $F \\dashv G$。'
    },
    {
      id: 'def-link.limit-preserves-limits',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'thm.right-adjoint-preserves-limits',
      note: '结论是 $G(\\lim D) \\cong \\lim (G \\circ D)$ —— 两边都是**极限**。'
    },
    {
      id: 'def-link.representable-adjoint-criterion',
      kind: 'definition',
      definition: 'def.representable',
      usedBy: 'thm.right-adjoint-criterion',
      note: '判据的右边说的是 $\\operatorname{Hom}_{\\mathcal{D}}(F(-), Y)$ **可表示**。'
    },
    {
      id: 'def-link.limit-adjoint-criterion',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.limit-adjoint',
      note: '命题把「所有**极限**存在」与「$\\Delta$ 有右伴随」说成一回事。'
    },
    {
      id: 'def-link.limit-saft',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'thm.saft',
      note: '前提的「完备」与「**保极限**」，以及构造 $F(X)$ 用的那个极限。'
    },
    {
      id: 'def-link.comma-saft',
      kind: 'definition',
      definition: 'def.comma-category',
      usedBy: 'thm.saft',
      note: '构造 $F(X)$ 时指标跑在**逗号范畴** $X \\downarrow G$ 上。'
    },
    {
      id: 'def-link.limit-reflective',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.reflective-limits',
      note: '命题谈的是**反射子范畴**中的极限与余极限能不能落回来。'
    },
    {
      id: 'def-link.kan-ex',
      kind: 'definition',
      definition: 'def.kan-extension',
      usedBy: 'ex.kan-extension',
      note: '两个例子说的都是「某个东西等于一个**左 Kan 延拓**」。'
    },
    {
      id: 'def-link.adjoint-kan-ex',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'ex.kan-extension',
      note: '**(2)** 说右伴随就是 $1_{\\mathcal{C}}$ 沿 $F$ 的 Kan 延拓 —— 右边是一个**伴随**。'
    },
    {
      id: 'def-link.limit-kan-ex',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'ex.kan-extension',
      note: '**(1)** 说余极限是沿 $I \\to \\mathbf{1}$ 的 Kan 延拓。'
    },
    {
      id: 'def-link.limit-filtered',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.filtered-exact',
      note: '「正合」说的是滤过余极限保持**有限极限**。'
    },
    {
      id: 'def-link.compact-stonecech',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'prop.chaus-reflective',
      note: 'Stone–Čech 紧化的构造跑在 **Tychonoff 方块**里；闭包紧、方块紧，用的都是紧性。'
    },
    {
      id: 'def-link.compact-minimal-closed',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'lem.minimal-closed-surjection',
      note: '极小闭子集的存在性用的是**紧性**（有限交性质）。'
    },
    {
      id: 'def-link.projective-gleason',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'thm.gleason',
      note: 'Gleason 定理把 $\\mathbf{CHaus}$ 的**投射对象**认了出来。'
    },
    {
      id: 'def-link.stone-gleason',
      kind: 'definition',
      definition: 'def.stone-space',
      usedBy: 'thm.gleason',
      note: '认出来的那批是 **Stonean 空间**。'
    },
    {
      id: 'def-link.profinite-stone',
      kind: 'definition',
      definition: 'def.profinite',
      usedBy: 'thm.stone-profinite',
      note: '定理说 Stone 空间与**投射有限空间**是同一批。'
    },
    {
      id: 'def-link.stone-profinite',
      kind: 'definition',
      definition: 'def.stone-space',
      usedBy: 'thm.stone-profinite',
      note: '定理的左边是 **Stone 空间**。'
    },
    {
      id: 'def-link.connected-component-clopen',
      kind: 'definition',
      definition: 'def.connected',
      usedBy: 'prop.component-clopen',
      note: '命题算的是**连通分量**。'
    },
    {
      id: 'def-link.clopen-component',
      kind: 'definition',
      definition: 'def.clopen',
      usedBy: 'prop.component-clopen',
      note: '连通分量被写成一切含 $x$ 的**闭开集**之交。'
    },
    {
      id: 'def-link.clopen-stonean-basic',
      kind: 'definition',
      definition: 'def.clopen',
      usedBy: 'prop.stonean-basic',
      note: '极端不连通的表述与推论都落在**闭开集**上。'
    },

    /* ---------- 从 92 挪过来的「结论用到的定义」（按文件头的分工属于本文件） ---------- */
    {
      id: 'def-dep.limit-functoriality',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'thm.lim-functor',
      note: '函子性说的是极限在**图与图之间**如何变化，前提是这些极限都存在。'
    },
    {
      id: 'def-dep.nat-limfunctor',
      kind: 'definition',
      definition: 'def.natural-transformation',
      usedBy: 'thm.lim-functor',
      note: '输入是一个**自然变换** $\\alpha : F \\implies G$，输出是极限之间的唯一态射。'
    },
    {
      id: 'def-dep.nat-yoneda',
      kind: 'definition',
      definition: 'def.natural-transformation',
      usedBy: 'lem.yoneda',
      note: '引理数的是 $h^{X}$ 到 $F$ 的**自然变换**全体。'
    },
    {
      id: 'def-dep.functor-yoneda',
      kind: 'definition',
      definition: 'def.functor',
      usedBy: 'lem.yoneda',
      note: '引理对**任意函子** $F : \\mathcal{C} \\to \\mathbf{Set}$ 成立。'
    },
    {
      id: 'def-dep.nat-yoneda-embedding',
      kind: 'definition',
      definition: 'def.natural-transformation',
      usedBy: 'prop.yoneda-embedding',
      note: '全忠实说的是**自然变换集** $\\operatorname{Hom}_{\\widehat{\\mathcal{C}}}(h_{X}, h_{Y})$ 与 $\\operatorname{Hom}_{\\mathcal{C}}(X, Y)$ 的双射。'
    },
    {
      id: 'def-dep.adjoint-criterion',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'thm.right-adjoint-criterion',
      note: '判据说的正是「$F$ 有没有**右伴随**」。'
    },
    {
      id: 'def-dep.adjoint-ff',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.adjoint-full-faithful',
      note: '命题谈的是**伴随**里左（右）伴随的那个函子。'
    },
    {
      id: 'def-dep.ff-adjoint',
      kind: 'definition',
      definition: 'def.ff-faithful',
      usedBy: 'prop.adjoint-full-faithful',
      note: '「$F$ **全忠实**」用的是忠实与满的定义。'
    },
    {
      id: 'def-dep.unit-adjoint-ff',
      kind: 'definition',
      definition: 'def.adjunction-unit',
      usedBy: 'prop.adjoint-full-faithful',
      note: '命题的另一边是「**单位** $\\eta$ 是同构」。'
    },
    {
      id: 'def-dep.diagram-limit-adjoint',
      kind: 'definition',
      definition: 'def.commutative-diagram',
      usedBy: 'prop.limit-adjoint',
      note: '命题里的 $\\Delta : \\mathcal{C} \\to \\mathcal{C}^{I}$ 是**常图函子**，$\\mathcal{C}^{I}$ 是图范畴。'
    },
    {
      id: 'def-dep.adjoint-saft',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'thm.saft',
      note: 'SAFT 的结论是「$G$ 有**左伴随**」。'
    },
    {
      id: 'def-dep.reflective-limits',
      kind: 'definition',
      definition: 'def.reflective-subcategory',
      usedBy: 'prop.reflective-limits',
      note: '命题谈的是**反射子范畴**里的极限与余极限。'
    },
    {
      id: 'def-dep.diagram-filtered',
      kind: 'definition',
      definition: 'def.commutative-diagram',
      usedBy: 'prop.filtered-exact',
      note: '余极限函子 $\\varinjlim : \\mathbf{Set}^{I} \\to \\mathbf{Set}$ 的定义域是**图范畴**。'
    },
    {
      id: 'def-dep.adjoint-chaus-reflective',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.chaus-reflective',
      note: '「$\\mathbf{CHaus}$ 是**反射子范畴**」的意思就是含入函子有左伴随。'
    },
    {
      id: 'def-dep.hausdorff-stonecech',
      kind: 'definition',
      definition: 'def.hausdorff',
      usedBy: 'prop.chaus-reflective',
      note: '$e_{K}$ 是单射那一步用的是**紧 Hausdorff 空间是 $T_{3.5}$ 的**。'
    },
    {
      id: 'def-dep.free-chaus-quotient',
      kind: 'definition',
      definition: 'def.free-compact-hausdorff',
      usedBy: 'prop.chaus-quotient-of-free',
      note: '命题说的商空间正是从**自由紧 Hausdorff 空间** $\\beta S^{\\mathrm{disc}}$ 商出来的。'
    },
    {
      id: 'def-dep.chaus-quotient-free',
      kind: 'definition',
      definition: 'def.chaus',
      usedBy: 'prop.chaus-quotient-of-free',
      note: '命题说的对象是 $\\mathbf{CHaus}$ 中的空间。'
    },
    {
      id: 'def-dep.projective-free',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.free-projective',
      note: '命题的结论是「自由紧 Hausdorff 空间是**投射对象**」。'
    },
    {
      id: 'def-dep.free-projective',
      kind: 'definition',
      definition: 'def.free-compact-hausdorff',
      usedBy: 'prop.free-projective',
      note: '命题谈的是**自由紧 Hausdorff 空间**。'
    },
    {
      id: 'def-dep.free-presentation-cor',
      kind: 'definition',
      definition: 'def.free-presentation',
      usedBy: 'cor.chaus-free-presentation',
      note: '推论说每个对象都**有**自由表示。'
    },
    {
      id: 'def-dep.chaus-component',
      kind: 'definition',
      definition: 'def.chaus',
      usedBy: 'prop.component-clopen',
      note: '证明里用到紧 Hausdorff 空间是**正规**的。'
    },
    {
      id: 'def-dep.stone-stonean-basic',
      kind: 'definition',
      definition: 'def.stone-space',
      usedBy: 'prop.stonean-basic',
      note: '命题谈的是**极端不连通**（以及由它推出的全不连通）。'
    },
    {
      id: 'def-dep.stone-reflective',
      kind: 'definition',
      definition: 'def.stone-space',
      usedBy: 'prop.stone-reflective',
      note: '「Stone 空间」是**全不连通的紧 Hausdorff 空间**。'
    },
    {
      id: 'def-dep.stone-td-reflective',
      kind: 'definition',
      definition: 'def.stone-space',
      usedBy: 'prop.td-reflective',
      note: '全不连通是 Stone 空间定义里的一半。'
    },
    {
      id: 'def-dep.connected-td-reflective',
      kind: 'definition',
      definition: 'def.connected',
      usedBy: 'prop.td-reflective',
      note: '反射 $\\pi_{0}$ 就是把每个点送到它的**连通分量**。'
    },
    {
      id: 'def-dep.gleason-retract',
      kind: 'definition',
      definition: 'thm.gleason',
      usedBy: 'cor.stonean-retract',
      note: '推论把 Gleason 定理翻译成「Stonean = **收缩核**」。'
    },
    {
      id: 'def-dep.sheaf-descent',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'thm.sheaf-descent',
      note: '定理给「是层」一个可以逐项验证的**正合列**判据。'
    },
    {
      id: 'def-dep.fibered-descent',
      kind: 'definition',
      definition: 'def.fibered-product',
      usedBy: 'thm.sheaf-descent',
      note: '正合列里的 $X_{i} \\times_{X} X_{j}$ 是**纤维积**。'
    },
    {
      id: 'def-dep.cech-properties',
      kind: 'definition',
      definition: 'def.cech-functor',
      usedBy: 'prop.cech-properties',
      note: '三条性质都是关于 $\\widehat{H}$ 的。'
    },
    {
      id: 'def-dep.cech-sheafification',
      kind: 'definition',
      definition: 'def.cech-functor',
      usedBy: 'thm.sheafification',
      note: '层化取「对预层做两次 **Čech 构造**」。'
    },
    {
      id: 'def-dep.reflective-sheafification',
      kind: 'definition',
      definition: 'def.reflective-subcategory',
      usedBy: 'thm.sheafification',
      note: '定理的结论是「层范畴是**反射子范畴**」。'
    },
    {
      id: 'def-dep.universal-site',
      kind: 'definition',
      definition: 'def.universal-colimit',
      usedBy: 'prop.site-properties',
      note: '五条性质里出现了**万有余极限、万有满态射、不交余积**。'
    },
    {
      id: 'def-dep.equalizer-mono-epi',
      kind: 'definition',
      definition: 'def.equalizer',
      usedBy: 'prop.sheaf-mono-epi-iso',
      note: '「满-单分解」把任意态射拆成 $F \\twoheadrightarrow I \\rightarrowtail G$。'
    },
    {
      id: 'def-dep.sheaf-epi-criterion',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.sheaf-epi-criterion',
      note: '命题说的是**层**之间的态射什么时候是满的。'
    },
    {
      id: 'def-dep.effective-sheafify',
      kind: 'definition',
      definition: 'def.effective-equivalence',
      usedBy: 'prop.sheafify-equivalence',
      note: '命题说的是**层化**与等价关系、商的交换。'
    },
    {
      id: 'def-dep.sieve-covering-epi',
      kind: 'definition',
      definition: 'def.sieve',
      usedBy: 'prop.covering-sieve-epi',
      note: '命题说覆盖族生成**覆盖筛**与余积满射是一回事。'
    },
    {
      id: 'def-dep.universal-disjoint',
      kind: 'definition',
      definition: 'def.universal-colimit',
      usedBy: 'prop.disjoint-universal',
      note: '命题说的是**不交万有余积**在次标准拓扑下保持不变。'
    },
    {
      id: 'def-dep.canonical-disjoint',
      kind: 'definition',
      definition: 'def.canonical-topology',
      usedBy: 'prop.disjoint-universal',
      note: '「次标准」是命题的关键假设。'
    },
    {
      id: 'def-dep.pretopos-factorization',
      kind: 'definition',
      definition: 'def.pretopos',
      usedBy: 'prop.pretopos-factorization',
      note: '命题把预拓扑斯那四条公理兑换成「每个态射都有满-单分解」。'
    },
    {
      id: 'def-dep.image-pretopos-factorization',
      kind: 'definition',
      definition: 'def.image',
      usedBy: 'prop.pretopos-factorization',
      note: '结论里「严格」说的是 $\\operatorname{im} f \\cong \\operatorname{coim} f$。'
    },
    {
      id: 'def-dep.subobject-lattice',
      kind: 'definition',
      definition: 'def.subobject',
      usedBy: 'prop.subobject-lattice',
      note: '命题说的是**子对象**全体构成有界格。'
    },
    {
      id: 'def-dep.fibered-subobject-lattice',
      kind: 'definition',
      definition: 'def.fibered-product',
      usedBy: 'prop.subobject-lattice',
      note: '格里的交就是**纤维积**（拉回）。'
    },
    {
      id: 'def-dep.sheaf-precanonical',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.precanonical-sheaf',
      note: '命题给出预标准拓扑下「是**层**」的两条可验等式。'
    },
    {
      id: 'def-dep.precanonical-preserves',
      kind: 'definition',
      definition: 'def.precanonical-topology',
      usedBy: 'prop.precanonical-preserves',
      note: '命题谈的是**预标准拓扑**下余积与商是否走样。'
    },
    {
      id: 'def-dep.sheaf-mono-epi',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.precanonical-mono-epi',
      note: '命题比较的是 $\\mathcal{C}$ 里的单满与它在**层**范畴里的像。'
    },
    {
      id: 'def-dep.topos-giraud',
      kind: 'definition',
      definition: 'def.topos',
      usedBy: 'thm.giraud',
      note: 'Giraud 定理给出「是**拓扑斯**」的四个等价说法。'
    },
    {
      id: 'def-dep.canonical-giraud',
      kind: 'definition',
      definition: 'def.canonical-topology',
      usedBy: 'thm.giraud',
      note: '第 2 条说的是对**标准拓扑**而言的层。'
    },
    {
      id: 'def-dep.representable-giraud',
      kind: 'definition',
      definition: 'def.representable',
      usedBy: 'thm.giraud',
      note: '第 2 条的关键词是「层都**可表示**」。'
    },
    {
      id: 'def-dep.topos-covering-epi',
      kind: 'definition',
      definition: 'def.topos',
      usedBy: 'prop.topos-covering-epi',
      note: '命题在**拓扑斯**里把「覆盖」与余积满射对起来。'
    },
    {
      id: 'def-dep.topology-covering-epi',
      kind: 'definition',
      definition: 'def.grothendieck-topology',
      usedBy: 'prop.topos-covering-epi',
      note: '命题的左边是「$(X_{i} \\to X)$ 是**覆盖**」，即生成覆盖筛。'
    },
    {
      id: 'def-dep.representable-quotient',
      kind: 'definition',
      definition: 'def.representable',
      usedBy: 'lem.representable-quotient',
      note: '引理说的是「**可表示性**可以从覆盖的一块块传回整体」。'
    },
    {
      id: 'def-dep.effective-quotient',
      kind: 'definition',
      definition: 'def.effective-equivalence',
      usedBy: 'lem.representable-quotient',
      note: '把 $F$ 实现成 $X/R$ 这一步用的是**等价关系有效**。'
    },
    {
      id: 'def-dep.sheaf-limits',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.topos-sheaf-limits',
      note: '命题把「是**层**」与「保所有极限」说成一回事。'
    },
    {
      id: 'def-dep.limit-sheaf-limits',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.topos-sheaf-limits',
      note: '「保**极限**」是命题的另一半。'
    },
    {
      id: 'def-dep.fibered-qc',
      kind: 'definition',
      definition: 'def.fibered-product',
      usedBy: 'prop.quasi-compact-properties',
      note: '第 3 条里的「存在满射 $X \\to F$」用的是 $\\mathcal{C}$ 里的对象覆盖层。'
    },
    {
      id: 'def-dep.qc-pretopos-qcqs',
      kind: 'definition',
      definition: 'def.quasi-compact',
      usedBy: 'thm.pretopos-qcqs',
      note: '定理的两边之一是**拟紧**。'
    },
    {
      id: 'def-dep.qs-pretopos-qcqs',
      kind: 'definition',
      definition: 'def.quasi-separated',
      usedBy: 'thm.pretopos-qcqs',
      note: '另一边是**拟分离**。'
    },
    {
      id: 'def-dep.pretopos-condensed-criterion',
      kind: 'definition',
      definition: 'def.pretopos',
      usedBy: 'prop.condensed-criterion',
      note: '两条判据来自「$\\mathbf{CHaus}$ 是**预拓扑斯**」：预标准拓扑只由有限不交并与满射生成。'
    },
    {
      id: 'def-dep.condensed-criterion',
      kind: 'definition',
      definition: 'def.condensed-set',
      usedBy: 'prop.condensed-criterion',
      note: '判据给出的是「预层是**凝聚态集**」的等价条件。'
    },
    {
      id: 'def-dep.condensed-topos',
      kind: 'definition',
      definition: 'def.condensed-set',
      usedBy: 'thm.cond-topos',
      note: '定理说的是 $\\mathrm{Cond}$（**凝聚态集**的范畴）是拓扑斯。'
    },
    {
      id: 'def-dep.free-pretopology',
      kind: 'definition',
      definition: 'def.free-compact-hausdorff',
      usedBy: 'prop.fchaus-pretopology',
      note: '预拓扑搭在**自由紧 Hausdorff 空间**上。'
    },
    {
      id: 'def-dep.projective-pretopology',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.fchaus-pretopology',
      note: '「满射有截面」说的是这些对象**投射**。'
    },
    {
      id: 'def-dep.free-sheaf',
      kind: 'definition',
      definition: 'def.free-compact-hausdorff',
      usedBy: 'prop.fchaus-sheaf',
      note: '命题谈的是**自由紧 Hausdorff 空间**上的层。'
    },
    {
      id: 'def-dep.sheaf-cond-equiv',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'thm.cond-equiv-fchaus',
      note: '定理说两边的**层**范畴是同一个。'
    },
    {
      id: 'def-dep.sheaf-cond-epi',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.cond-epi',
      note: '命题说的是**凝聚态集**（层）之间满态射的判据。'
    },
    {
      id: 'def-dep.free-cond-epi',
      kind: 'definition',
      definition: 'def.free-compact-hausdorff',
      usedBy: 'prop.cond-epi',
      note: '探针取的是**自由**紧 Hausdorff 空间。'
    },
    {
      id: 'def-dep.projective-cond',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.cond-projectives',
      note: '命题说自由紧 Hausdorff 空间在 $\\mathrm{Cond}$ 里是**投射对象**。'
    },
    {
      id: 'def-dep.condensed-top-adjoint',
      kind: 'definition',
      definition: 'def.condensed-set',
      usedBy: 'thm.top-cond-adjoint',
      note: '定理里的函子 $X \\mapsto \\underline{X}$ 以**凝聚态集**为靶。'
    },
    {
      id: 'def-dep.cg-top-cond',
      kind: 'definition',
      definition: 'def.compactly-generated',
      usedBy: 'thm.top-cond-adjoint',
      note: '限制到**紧生成空间**上时那个函子变得全忠实。'
    },
    {
      id: 'def-dep.cg-coreflective',
      kind: 'definition',
      definition: 'def.compactly-generated',
      usedBy: 'prop.cg-coreflective',
      note: '命题说的是**紧生成空间**是余反射子范畴。'
    },
    {
      id: 'def-dep.adjoint-cg-coreflective',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.cg-coreflective',
      note: '「余反射」的意思是含入函子有**右伴随**。'
    },
    {
      id: 'def-dep.free-condab-section',
      kind: 'definition',
      definition: 'def.free-compact-hausdorff',
      usedBy: 'prop.condab-section',
      note: '截面函子 $\\Gamma(F, -)$ 的 $F$ 取的是**自由**紧 Hausdorff 空间。'
    },
    {
      id: 'def-dep.limit-condab-section',
      kind: 'definition',
      definition: 'def.limit',
      usedBy: 'prop.condab-section',
      note: '结论说它保**所有极限与余极限**。'
    },
    {
      id: 'def-dep.condab-ab',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'thm.condab-ab',
      note: '定理说的是 $\\mathrm{CondAb}$（**凝聚态阿贝尔群**）满足 AB6 与 AB4*。'
    },
    {
      id: 'def-dep.stonean-projective',
      kind: 'definition',
      definition: 'def.stone-space',
      usedBy: 'lem.stonean-projective',
      note: '引理的输入是 **Stonean 空间**。'
    },
    {
      id: 'def-dep.projective-stonean',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'lem.stonean-projective',
      note: '结论说 $\\mathbb{Z}\\cdot F$ 是**投射**对象。'
    },
    {
      id: 'def-dep.generator-condab-generated',
      kind: 'definition',
      definition: 'def.generator',
      usedBy: 'prop.condab-generated',
      note: '命题说的是 $\\mathrm{CondAb}$ 由谁**生成**。'
    },
    {
      id: 'def-dep.projective-condab-generated',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.condab-generated',
      note: '生成元取的是**有限表现的投射**对象。'
    },
    {
      id: 'def-dep.complex-additive',
      kind: 'definition',
      definition: 'def.cochain-complex',
      usedBy: 'prop.complex-additive',
      note: '命题说的是**复形**构成的那个范畴。'
    },
    {
      id: 'def-dep.equalizer-complex-additive',
      kind: 'definition',
      definition: 'def.equalizer',
      usedBy: 'prop.complex-additive',
      note: '核与余核都是**逐项**取出来的。'
    },
    {
      id: 'def-dep.triangle-rotation',
      kind: 'definition',
      definition: 'def.distinguished-triangle',
      usedBy: 'prop.triangle-rotation',
      note: '命题说的是**导出三角**的基本性质。'
    },
    {
      id: 'def-dep.triangle-morphism',
      kind: 'definition',
      definition: 'def.distinguished-triangle',
      usedBy: 'lem.triangle-morphism',
      note: '引理说的是**导出三角**之间态射的性质。'
    },
    {
      id: 'def-dep.homotopy-triangle-morphism',
      kind: 'definition',
      definition: 'def.homotopy',
      usedBy: 'lem.triangle-morphism',
      note: '「$u, v$ 是同伦等价则 $w$ 也是」里的比较用的是**同伦**。'
    },
    {
      id: 'def-dep.equalizer-cohomology-sequence',
      kind: 'definition',
      definition: 'def.equalizer',
      usedBy: 'prop.cohomology-exact-sequence',
      note: '这条正合列把同调夹在**余核**与**核**之间。'
    },
    {
      id: 'def-dep.cohomology-long-exact',
      kind: 'definition',
      definition: 'def.cohomology',
      usedBy: 'thm.long-exact',
      note: '长正合列里跑的是**同调**。'
    },
    {
      id: 'def-dep.equalizer-long-exact',
      kind: 'definition',
      definition: 'def.equalizer',
      usedBy: 'thm.long-exact',
      note: '「正合列」本身就是一句关于**核与像**的话。'
    },
    {
      id: 'def-dep.injective-criterion',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.injective-criterion',
      note: '命题给出**内射对象**的四条等价刻画。'
    },
    {
      id: 'def-dep.mono-injective-criterion',
      kind: 'definition',
      definition: 'def.mono',
      usedBy: 'prop.injective-criterion',
      note: '「每个**单态射**都有收缩」是等价条件之一。'
    },
    {
      id: 'def-dep.adjoint-injective-criterion',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.injective-criterion',
      note: '「$\\operatorname{Hom}(-, I)$ **正合**」说的是这个函子保正合列 —— 与伴随性相关的那条刻画。'
    },
    {
      id: 'def-dep.grothendieck-condab',
      kind: 'definition',
      definition: 'def.grothendieck-category',
      usedBy: 'thm.condab-ab',
      note: '定理说的是 $\\mathrm{CondAb}$ **是** Grothendieck 范畴，并且额外满足两条。'
    },
    {
      id: 'def-dep.ab-condab',
      kind: 'definition',
      definition: 'def.ab-axioms',
      usedBy: 'thm.condab-ab',
      note: 'AB6 与 AB4\\* 的含义见「Grothendieck 的 AB 公理」那条。'
    },

    /* ---------------------------------- 拓扑斯上的阿贝尔群是 Grothendieck 范畴 */
    {
      id: 'def-dep.topos-abelian-grothendieck',
      kind: 'definition',
      definition: 'def.topos',
      usedBy: 'thm.topos-abelian-grothendieck',
      note: '定理对**拓扑斯** $\\mathcal{T}$ 上的阿贝尔层说话。'
    },
    {
      id: 'def-dep.abelsh-grothendieck',
      kind: 'definition',
      definition: 'def.abelian-sheaf',
      usedBy: 'thm.topos-abelian-grothendieck',
      note: '$\\mathcal{T}(\\mathbf{Ab})$ 就是 $\\mathcal{T}$ 上的**阿贝尔层**范畴。'
    },
    {
      id: 'def-dep.grothendieck-topos-ab',
      kind: 'definition',
      definition: 'def.grothendieck-category',
      usedBy: 'thm.topos-abelian-grothendieck',
      note: '结论是「$\\mathcal{T}(\\mathbf{Ab})$ 是 **Grothendieck 范畴**」。'
    },
    {
      id: 'def-dep.generator-topos-ab',
      kind: 'definition',
      definition: 'def.generator',
      usedBy: 'thm.topos-abelian-grothendieck',
      note: '小生成元集取 $\\{\\mathbb{Z}\\cdot X : X \\in S\\}$，$S$ 是 $\\mathcal{T}$ 的生成元集。'
    },
    {
      id: 'def-dep.abeliancat-topos-ab',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'thm.topos-abelian-grothendieck',
      note: '结论的一部分是「$\\mathcal{T}(\\mathbf{Ab})$ 是**阿贝尔**范畴」。'
    }
  ]
});
