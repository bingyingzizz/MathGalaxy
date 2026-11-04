/* ============================================================================
   内容包 · D2 跨领域桥 + E5 经典缺席（2026-11-04，v2 清单 §2 ④⑥）
   ----------------------------------------------------------------------------
   审计最刺眼的一条：**凝聚态 $\\leftrightarrow$ 分析 / 测度 / 泛函 = 0 / 0 / 0**（600 个节点之间零边）。
   这里不去硬连概念对，而是造**真正成立的桥节点**，让两边各自接上来：

     `prop.banach-as-condensed`  Banach 空间（含 Hilbert）经 $S \\mapsto C(S,E)$ 成为凝聚态阿贝尔群
     `thm.riesz-markov`          $C_{c}(X)^{*} \\cong$ Radon 测度 —— 顺便把「整值测度」接上经典测度

   以及 E5 的两点：

     `def.power-object`          幂对象（笛卡尔闭的「指数对象」那一半）
     `def.hodge-star`            Hodge 星号 $*$：从度量 + 体积形式**构造**出来（不是「满足性质」引入）

   ⚠ 每条桥的注里都写清「哪一步本图没有自己的节点」，不假装完整。
   ========================================================================== */
(window.MG = window.MG || {}).packs = window.MG.packs || [];
window.MG.packs.push({
  name: '跨领域桥：Banach → 凝聚态 / Riesz–Markov / 幂对象 / Hodge 星号',

  nodes: [
    {
      id: 'prop.banach-as-condensed',
      cluster: 'cond.ab',
      type: 'proposition',
      label: 'Banach 空间都是凝聚态阿贝尔群',
      title: 'Banach（与 Hilbert）空间经 $S \\mapsto C(S,E)$ 嵌入凝聚态阿贝尔群',
      regions: ['condensed', 'analysis'],
      tags: ['命题', '凝聚态', 'Banach', '桥'],
      status: 'skeleton',
      statement: [
        '设 $E$ 是实（或复）Banach 空间。对紧 Hausdorff 空间 $S$ 令',
        '',
        '$$\\underline{E}(S) := C(S, E) \\qquad\\text{（$S \\to E$ 的连续映射全体，按逐点运算成群）},$$',
        '',
        '则 $\\underline{E}$ 是一个**凝聚态阿贝尔群**。而且 $E \\mapsto \\underline{E}$ 把**有界**线性映射一一对应到凝聚态的态射：',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{CondAb}}(\\underline{E}, \\underline{F}) \\;\\cong\\; \\operatorname{Hom}_{\\text{bdd}}(E, F).$$',
      ].join('\n'),
      notes: [
        '**为什么「连续函数」这一定义能装下有界算子**：一个线性映射 $T : E \\to F$ 有界 $\\iff$ 它在每个 $C(S,E)$ 上把「一致范数有界的集合」送到有界集合。' +
          '凝聚态的结构正是「逐个紧 Hausdorff 空间 $S$ 地看」，于是有界性自然地被 $T$ 的每个 $C(S,E) \\to C(S,F)$ 记录下来。',
        '⭐ **这就是凝聚态理论的起点动机**：拓扑阿贝尔群范畴太坏（极限/余极限不好、Ext 不好算），' +
          '但把「测试空间」从点换成一族紧 Hausdorff 空间之后，Banach 空间、Fréchet 空间这些都**原封不动**地住进了一个阿贝尔范畴。',
        '⚠ **本图的空白**：这里只记陈述与机制。要证的细节（「$\\underline{E}$ 满足层条件」这一条要用 $C(S,E)$ 的一致完备性；' +
          '全忠实那一条要用 $E$ 的完备性把逐点估计拼成一致估计）**没有在本图展开**，我把它当标准结论引用，出处见 refs。',
        '📌 **Hilbert 是特例**：$H$ 是 Banach 空间，所以 $\\underline{H}$ 也是凝聚态阿贝尔群 —— 但**别把「$H$ 是固态群」当结论**：' +
          '固态性是关于 $\\prod_{I}\\mathbb{Z}$ 的紧投射性，与「内积完备」不是一回事。',
      ].join('\n\n'),
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics, Lecture I（拓扑阿贝尔群 → 凝聚态）'],
    },

    {
      id: 'thm.riesz-markov',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: 'Riesz–Markov 表示',
      title: 'Riesz–Markov：$C_{c}(X)^{*} \\cong$ Radon 测度',
      regions: ['analysis'],
      tags: ['定理', '测度', '泛函分析', '桥'],
      status: 'skeleton',
      statement: [
        '设 $X$ 是局部紧 Hausdorff 空间，$C_{c}(X)$ 配 sup 范数（连续、紧支的实值函数）。则每个**正**线性泛函 $\\Lambda : C_{c}(X) \\to \\mathbb{R}$ 都唯一地写成',
        '',
        '$$\\Lambda(f) = \\int_{X} f \\,\\mathrm{d}\\mu,$$',
        '',
        '其中 $\\mu$ 是 $X$ 上的一个**正则 Borel 测度**，且 $\\lVert\\Lambda\\rVert = \\mu(X)$。一般（不必正）的泛函对应符号测度之差。',
      ].join('\n'),
      notes: [
        '**在做什么**：把「对函数做线性赋值」与「对集合量大小」这两件事焊起来 —— 于是测度论里的构造（乘积、推前、RN 导数）都能用泛函语言重述，' +
          '反过来泛函分析里的对偶结论也能落到测度上。',
        '**证明骨架**：① 由 $\\Lambda$ 定义集函数 $\\mu_{0}(U) := \\sup\\{\\, \\Lambda(f) : 0 \\le f \\le 1,\\ \\operatorname{supp} f \\subseteq U \\,\\}$；' +
          '② 证它是外测度、在开集上可加；③ 用 Carathéodory 延拓得到 Borel 测度；④ 用 $X$ 局部紧（Urysohn 引理给「夹逼函数」）证 $\\Lambda(f) = \\int f\\,\\mathrm{d}\\mu$。',
        '⚠ **本条标骨架**：本图把上面四步作为机制记下，**每一步的细节没有展开**（尤其「开集上可加」那一步要用 $X$ 的局部紧性与有限分割）。' +
          '需要的工具（`lem.urysohn`、`thm.caratheodory`、`def.outer-measure`）本图都有节点，所以真要补全是可以逐步补的。',
        '⭐ **与凝聚态的关系**：profinite 集上的「整值测度」$M(S,\\mathbb{Z}) = \\operatorname{Hom}_{\\mathbb{Z}}(C(S,\\mathbb{Z}),\\mathbb{Z})$' +
          '就是这条定理的**整值、紧全不连通**版本 —— 见 `def.cond-measure`。两者的差别只在「系数环」与「测试空间」，做法同为「对连续函数做赋值」。',
      ].join('\n\n'),
      refs: ['Rudin, Real and Complex Analysis, Ch. 2（Riesz 表示定理）'],
    },

    {
      id: 'def.power-object',
      cluster: 'cat.structure',
      type: 'definition',
      label: '幂对象',
      title: '幂对象 $Y^{X}$：积的左伴随，即「函数空间」的对象化',
      regions: ['category'],
      tags: ['定义', '范畴论', '笛卡尔闭'],
      statement: [
        '设 $\\mathcal{C}$ 有有限积，$X, Y \\in \\mathcal{C}$。若存在对象 $Y^{X}$ 与态射 $\\operatorname{ev} : Y^{X} \\times X \\to Y$，使得对任意 $Z$ 与任意 $f : Z \\times X \\to Y$，存在**唯一**的 $\\tilde f : Z \\to Y^{X}$ 使',
        '',
        '$$\\operatorname{ev} \\circ (\\tilde f \\times \\operatorname{id}_{X}) = f,$$',
        '',
        '就说 $Y^{X}$ 是 $Y$ 对 $X$ 的**幂对象**（exponential object），$\\operatorname{ev}$ 叫**求值映射**。',
      ].join('\n'),
      notes: [
        '**等价说法（更好用）**：$Y^{X}$ 就是函子 $-\\times X : \\mathcal{C} \\to \\mathcal{C}$ 的**右伴随**，即',
        '',
        '$$\\operatorname{Hom}(Z \\times X,\\, Y) \\;\\cong\\; \\operatorname{Hom}(Z,\\, Y^{X}).$$',
        '所以「有幂对象」= 「积有右伴随」。',
        '⭐ **为什么它是「笛卡尔闭」的第二半**：笛卡尔闭 = 有限积 + 幂对象。' +
          '本图 `prop.cg-cartesian-closed` 说的正是「紧生成空间这一侧有幂对象，只是要把紧开拓扑再 $k$-化一次」。',
        '⚠ **别与「内部 Hom」混**：$\\mathcal{C}$ 是一般范畴时，$Y^{X}$ 是 $\\mathcal{C}$ 里**真的存在**的那个对象；' +
          '而内部 Hom（`def.internal-hom`，拓扑斯里那个）是先取 Hom 集再用余极限/层化造出来的。在笛卡尔闭范畴里两者一致，在一般的拓扑斯里只有内部 Hom。',
        '📌 **$\\mathbf{Set}$ 里的样子**：$Y^{X}$ 就是函数集 $\\operatorname{Hom}_{\\mathbf{Set}}(X,Y)$，' +
          '$\\operatorname{ev}(f, x) = f(x)$ —— 幂对象就是「把函数收集成一个集合」这件事的对象化。',
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, §IV.6'],
    },

    {
      id: 'def.hodge-star',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: 'Hodge 星号',
      title: 'Hodge 星号 $*$：$\\Omega^{k} \\to \\Omega^{n-k}$，由度量与体积形式**构造**',
      regions: ['geometry'],
      tags: ['定义', '微分几何', '微分形式', 'Hodge'],
      statement: [
        '设 $(M, g)$ 是可定向 $n$ 维 Riemann 流形，$\\mathrm{vol}$ 是 $g$ 决定的体积形式，$\\langle \\cdot, \\cdot \\rangle$ 是 $k$-形式上由 $g$ 诱导的内积。对 $\\alpha \\in \\Omega^{k}(M)$ 定义 $*\\alpha \\in \\Omega^{n-k}(M)$ 为**唯一**满足',
        '',
        '$$\\beta \\wedge *\\alpha \\;=\\; \\langle \\beta, \\alpha \\rangle\\, \\mathrm{vol} \\qquad \\text{对一切 } \\beta \\in \\Omega^{k}(M)$$',
        '',
        '的那个 $(n-k)$-形式。',
      ].join('\n'),
      notes: [
        '**为什么存在唯一**：$\\beta \\mapsto \\langle \\beta,\\alpha\\rangle$ 是 $\\Lambda^{k}T_{p}^{\\ast}M$ 上的线性泛函，' +
          '而 $\\beta \\wedge (-) : \\Lambda^{k} \\to \\Lambda^{n}$ 与 $\\mathrm{vol}$ 一起给出「$\\Lambda^{n-k} \\to \\mathbb{R}$」与「$\\Lambda^{k} \\to \\mathbb{R}$」的**配对**（非退化），' +
          '于是那个线性泛函唯一地对应一个 $(n-k)$-形式。逐点做、再验证光滑。',
        '📌 **坐标里的一行公式**：取定向标准正交余标架 $e^{1}, \\ldots, e^{n}$（此时 $\\mathrm{vol} = e^{1}\\wedge\\cdots\\wedge e^{n}$），则',
        '',
        '$$*(e^{i_{1}}\\wedge\\cdots\\wedge e^{i_{k}}) \\;=\\; \\operatorname{sgn}(\\sigma)\\, e^{j_{1}}\\wedge\\cdots\\wedge e^{j_{n-k}},$$',
        '其中 $\\{j\\}$ 是补集、按递增排列，$\\sigma$ 是排列 $(i_1,\\ldots,i_k, j_1,\\ldots,j_{n-k})$ 的符号。',
        '⭐ **它的用途在下一层**：$\\delta := (-1)^{nk+n+1} *\\mathrm{d}*$（余微分）要用 $*$ 写出来；有了 $\\delta$ 才有 $\\Delta = \\mathrm{d}\\delta + \\delta\\mathrm{d}$ 与**调和形式**，' +
          '然后才有 Hodge 定理（每个 de Rham 类有唯一调和代表元）。',
        '⚠ **本图的空白**：余微分 $\\delta$、Laplace–de Rham 算子 $\\Delta$、调和形式、Hodge 定理**都还没有节点** —— ' +
          '这一条只把其中**可构造的第一块**（$*$）落地；⛔ 不要在这里声称 Hodge 分解已经可用。',
        '⚠ **依赖定向**：$*$ 依赖 $\\mathrm{vol}$ 的符号，所以 $M$ 不可定向时要在扭曲形式（密度）上工作，那一步本图没有。',
      ].join('\n\n'),
      refs: ['Warner, Foundations of Differentiable Manifolds, Ch. 6', 'Tu, Introduction to Manifolds, §17'],
    },
  ],

  edges: [
    /* ④ 桥：凝聚态 $\\leftrightarrow$ 分析 / 泛函 */
    { id: 'dep.bcd-banach', kind: 'definition', definition: 'def.banach-space', usedBy: 'prop.banach-as-condensed',
      note: '命题的输入就是 Banach 空间 $E$（要它的完备性来保证 $C(S,E)$ 是 Banach 空间）。' },
    { id: 'dep.bcd-hilbert', kind: 'definition', definition: 'def.hilbert-space', usedBy: 'prop.banach-as-condensed',
      note: 'Hilbert 空间是 Banach 空间的特例，所以也走这条桥（注里有说明）。' },
    { id: 'dep.bcd-condab', kind: 'definition', definition: 'def.condensed-abelian-group', usedBy: 'prop.banach-as-condensed',
      note: '结论说 $\\underline{E}$ 是**凝聚态阿贝尔群** —— 要用它的定义（紧 Hausdorff 上的层）。' },

    /* ④ 桥：凝聚态 $\\leftrightarrow$ 测度（经 Riesz–Markov 的整值版本） */
    { id: 'dep.rm-measure', kind: 'definition', definition: 'def.measure', usedBy: 'thm.riesz-markov',
      note: '结论说「存在一个正则 Borel **测度** $\\mu$」，用到测度的定义。' },
    { id: 'dep.rm-lc', kind: 'definition', definition: 'def.locally-compact', usedBy: 'thm.riesz-markov',
      note: '假设是局部紧 Hausdorff —— 局部紧是 Urysohn 夹逼函数存在的前提。' },
    { id: 'dep.rm-outer', kind: 'definition', definition: 'def.outer-measure', usedBy: 'thm.riesz-markov',
      note: '证明骨架第 ②③ 步：先造外测度、再用 Carathéodory 延拓。' },
    { id: 'ana.rm-cond-measure', kind: 'analogy', a: 'def.cond-measure', b: 'thm.riesz-markov',
      title: '整值测度 $\\leftrightarrow$ Riesz–Markov：同一台机器，换系数环与测试空间',
      note: '两处都在做「对连续函数做赋值，得到『集合的大小』」这一件事：\n' +
        '- 经典：$\\Lambda \\in C_{c}(X)^{\\ast}$ $\\rightsquigarrow$ 正则 Borel 测度；\n' +
        '- 凝聚态：$\\operatorname{Hom}_{\\mathbb{Z}}(C(S,\\mathbb{Z}),\\mathbb{Z})$，$S$ profinite —— **整值**系数、**紧全不连通**的测试空间。\n\n' +
        '⚠ 方向不同、范畴不同，所以只记**类比**，不当依赖：经典定理给出「测度」，凝聚态那个对象是**按定义取对偶**得到的。' },

    { id: 'dep.rm-regular', kind: 'definition', definition: 'def.regular-measure', usedBy: 'thm.riesz-markov',
      note: '结论里那个测度是**正则 Borel 测度**（外正则 + 内正则 + 局部有限），这一条正是「哪一类测度」的限定。' },

    /* ④ 桥：凝聚态 $\\leftrightarrow$ 范畴论（阿贝尔范畴那一条） */
    { id: 'ana.condab-abeliancat', kind: 'analogy', a: 'thm.condab-ab', b: 'def.abelian-category',
      title: '凝聚态阿贝尔群 $\\leftrightarrow$ 阿贝尔范畴：都是「好到能算同调」的地方',
      note: '两处在回答同一个问题：**什么样的范畴里可以放心地做同调代数？**\n' +
        '- 阿贝尔范畴：核余核都存在、单满都正则 $\\implies$ 蛇引理、长正合列都成立；\n' +
        '- $\\mathrm{CondAb}$：先是预阿贝尔且满足 AB3–AB6，再靠「有足够多紧投射对象」把 Ext 算得出来（`thm.condab-ab`）。\n\n' +
        '⚠ 不是蕴含：$\\mathrm{CondAb}$ **是**阿贝尔范畴（`thm.condab-ab` 证明的那部分），所以这是「实例 $\\leftrightarrow$ 一般框架」的类比，不是两个平行理论。' },

    /* ⑥ 幂对象 */
    { id: 'dep.power-adjoint', kind: 'definition', definition: 'def.adjoint', usedBy: 'def.power-object',
      note: '幂对象就是 $-\\times X$ 的右伴随 —— 用到伴随的定义（三角恒等式）。' },
    { id: 'dep.cgcc-power', kind: 'definition', definition: 'def.power-object', usedBy: 'prop.cg-cartesian-closed',
      note: '「紧生成空间是笛卡尔闭的」= 它有幂对象（且要把紧开拓扑再 $k$-化），用到幂对象的定义。' },

    /* ⑥ Hodge 星号 */
    { id: 'dep.hodge-g', kind: 'definition', definition: 'def.riemannian-metric', usedBy: 'def.hodge-star',
      note: '内积 $\\langle\\cdot,\\cdot\\rangle$ 与体积形式都由 $g$ 给出。' },
    { id: 'dep.hodge-vol', kind: 'definition', definition: 'def.volume-form', usedBy: 'def.hodge-star',
      note: '定义等式右边就是 $\\mathrm{vol}$：没有体积形式就写不出 $\\beta\\wedge *\\alpha$。' },
    { id: 'dep.hodge-form', kind: 'definition', definition: 'def.form-on-manifold', usedBy: 'def.hodge-star',
      note: '$*$ 是 $\\Omega^{k} \\to \\Omega^{n-k}$ 的映射，输入输出都是流形上的微分形式。' },
  ],
});
