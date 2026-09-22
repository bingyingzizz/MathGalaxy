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
      definition: 'def.pair',
      usedBy: 'ax.pair',
      note: '方向相反的一条：有序对 $(a, b) = \\{\\{a\\}, \\{a, b\\}\\}$ 的**构造**要用到配对公理才成为集合。'
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
    }
  ]
});
