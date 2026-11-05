/* ==========================================================================
   内容包 · 紧性的三件套补全 + Fréchet 导数
   --------------------------------------------------------------------------
   用户原话：
     「相对紧没有节点，和等价表述（每个序列有收敛在 X 中子列），完全有界也没有那个
       每个序列都有 Cauchy 子列的表述，我之前说过要把这种等价的性质或者描述都加上，
       赋范向量空间的 Fréchet 导数节点也没有啊」

   查证（补前）：
     · 「相对紧」全库只在 `thm.arzela-ascoli` 的正文里出现 3 次，**没有节点**。
     · `def.totally-bounded` 的陈述只有「有限 $\varepsilon$-网」一种写法，
       **没有**「每个序列有 Cauchy 子列」这个等价刻画。
     · 「Fréchet 导数」0 命中（`def.derivative` 是一维的；`def.total-differential` 是
       $\mathbb{R}^{n}$ 上的全微分；流形上是 `def.differential-map`）。
       赋范空间之间的 Fréchet 导数（$f'(a)$ 作为有界线性算子）确实缺。

   本包：
     · def.relatively-compact 相对紧（新节点，含序列刻画）
     · thm.frechet-derivative  Fréchet 导数（新节点，含与 Gâteaux 导数的关系）
     · 给 `def.totally-bounded` **补一段**「每个序列有 Cauchy 子列」的等价刻画（只追加注释）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '相对紧 · 全有界的序列刻画 · Fréchet 导数',

  nodes: [

    {
      id: 'def.relatively-compact',
      cluster: 'topology.metric',
      type: 'definition',
      label: '相对紧',
      title: '相对紧：闭包紧的子集',
      regions: ['topology'],
      tags: ['定义', '拓扑', '度量空间', '相对紧', '紧', '序列紧'],
      statement: [
        '**在做什么**：把紧性从「整个空间」放宽到「一个子集」：**不必自己紧，只要闭包紧**。分析里到处是这种子集（连续函数空间里的相对紧集、有界序列的收敛子列），所以它值得单独立一个名字。',
        '',
        '设 $X$ 是拓扑空间，$A \\subseteq X$。称 $A$ **相对紧**（relatively compact，也叫**预紧**），若它在 $X$ 中的闭包 $\\overline{A}$ 是紧集。',
        '',
        '在度量空间（更一般地：第一可数空间）里，它可以换成**序列**的说法，三种等价：',
        '',
        '1. $\\overline{A}$ 紧（定义）；',
        '2. **$A$ 中每个序列都有在 $X$ 中收敛的子列** —— 注意极限**允许落在 $A$ 外面**，只要求落在 $X$ 里；',
        '3. $A$ 中每个序列都有**在 $X$ 中收敛的**子列，且 $A$ 全有界（这一条只是把 2 拆开说）。',
        '',
        '**与紧的区别只在极限的位置**：若要求子列的极限**落在 $A$ 里**，那是「$A$ 序列紧」，等价于「$A$ 紧 + 闭」。所以',
        '',
        '$$A\\ \\text{紧} \\iff A\\ \\text{相对紧且闭} .$$'
      ].join('\n'),
      notes: [
        '**为什么要把「极限落在哪」讲清楚**：这是相对紧最容易错的地方。$A = (0,1) \\subseteq \\mathbb{R}$ 相对紧（闭包 $[0,1]$ 紧），其中任何序列都有收敛子列 —— 但极限可能是 $0$，不在 $A$ 里。所以 $A$ **不**紧。反过来，$A = \\mathbb{R}$ 里没有有界子列，连相对紧都不是。',
        '**在度量空间里的判据（最常用）**：$A$ 相对紧 $\\iff$ **$A$ 完全有界**（`def.totally-bounded`）。于是「相对紧」在日常使用中几乎总是靠「全有界 + 完备空间的闭包」来验证：完备度量空间里，相对紧 = 全有界。这也是为什么紧性的证明常常分成「先证全有界、再用完备性取极限」两段。',
        '⭐ **它在函数空间里才是主角**：$C(K)$、$L^{p}$、全纯函数空间里，「什么样的函数族相对紧」是一门专门的学问 —— Arzelà–Ascoli（`thm.arzela-ascoli`：等度连续 + 逐点相对紧 $\\implies$ 相对紧）、Montel 定理（局部一致有界的全纯函数族相对紧）、Rellich–Kondrachov（Sobolev 嵌入的紧性）。这些定理的结论都是「某族函数相对紧」，而不是「紧」。',
        '⚠️ **相对紧不传递到任意子集**：相对紧集的子集相对紧（闭包更小），但**相对紧集的闭包**才是紧的；不要反过来推「相对紧集的每个子集都紧」。',
        ,
        '**各方向用到的假设**（闭包紧是定义，序列与全有界判据各有范围）：\n' +
        '- 相对紧 $\\iff$ 在给定环境空间中的闭包紧：定义展开免费，不要求该环境完备。\n' +
        '- 度量空间中闭包紧 $\\implies$ 每个 $A$ 中序列有在 $X$ 收敛的子列：用紧与序列紧等价；反向以距离小于 $1/n$ 的 $A$ 中点逼近闭包序列，再用同一定理。\n' +
        '- 条件 3 $\\implies$ 条件 2 是逻辑删除合取项；条件 2 $\\implies$ 全有界用反证构造固定正距离分离序列，不是单纯定义展开。\n' +
        '- 相对紧 $\\implies$ 全有界；全有界 $\\implies$ 相对紧须闭包完备，例如 $X$ 完备。$A=X=\\mathbb Q\\cap[0,1]$ 全有界而不相对紧，原注的无条件等价须加此条件。\n' +
        '- 第一可数不足以代替度量假设：$[0,\\omega_1)$ 第一可数且序列紧而不紧；紧 $\\implies$ 闭还需 Hausdorff 等分离条件，不能在任意拓扑空间声称紧等价于相对紧且闭。\n'
      ].join('\n\n'),
      refs: ['Munkres, Topology · 相对紧', 'Rudin, Functional Analysis · 紧性']
    },

    {
      id: 'thm.frechet-derivative',
      cluster: 'fa.norm',
      type: 'definition',
      label: 'Fréchet 导数',
      title: 'Fréchet 导数：赋范空间之间的导数就是有界线性算子',
      regions: ['functional-analysis'],
      tags: ['定义', '泛函分析', 'Fréchet 导数', '微分', '有界算子'],
      statement: [
        '**在做什么**：把「导数是一个线性映射」这句话搬到赋范空间上。关键不是「$f$ 有多光滑」，而是 **「线性主部」必须是连续的**（即有界算子）—— 这一条是赋范空间版本与有限维版本唯一实质的差别。',
        '',
        '设 $E, F$ 是赋范空间，$\\Omega \\subseteq E$ 开，$f : \\Omega \\to F$，$a \\in \\Omega$。称 $f$ 在 $a$ 处 **Fréchet 可微**，若存在**有界线性算子** $T \\in B(E, F)$ 使',
        '',
        '$$f(a + h) = f(a) + T h + o(\\|h\\|) \\qquad (\\|h\\| \\to 0),$$',
        '',
        '即',
        '',
        '$$\\lim_{\\|h\\| \\to 0} \\frac{\\|f(a+h) - f(a) - Th\\|}{\\|h\\|} = 0 .$$',
        '',
        '这样的 $T$ 若存在则**唯一**（取 $h = t v$、$t \\to 0$ 即看出 $T$ 在每条射线上被钉死），记 $f\'(a) := T \\in B(E, F)$。',
        '',
        '**与 Gâteaux 导数的区别**：Gâteaux 导数只要求沿每条射线 $t \\mapsto f(a + tv)$ 的导数存在 —— 但各方向导数存在并不保证「关于方向线性」，也未必连续（若把「线性」额外写进定义，才是通常所说的 Gâteaux 导数）；Fréchet 可微则要求**一致的**余项估计。于是',
        '',
        '$$\\text{Fréchet 可微} \\implies \\text{Gâteaux 可微，且两者相等} ,$$',
        '',
        '反过来不成立（Gâteaux 导数的存在不保证余项一致小）。'
      ].join('\n'),
      notes: [
        '**为什么要求 $T$ 有界**：$E$ 无穷维时「线性」不足以谈极限。⚠ 但要注意：余项条件本身**不排除无界主部**（取 $E = c_{00}$ 配 $\\ell^2$ 范数、$T(x) = \\sum n x_n$、$f = T$，则余项恒为 $0$）。把 $B(E,F)$ 写死的真正作用，是让「可微 $\\implies$ 连续」成立；否则 $f$ 可能根本不连续。有限维时自动满足，无穷维时是实质条件。',
        '**几个基本事实**（证明与一元情形同构，只是把绝对值换成范数）：',
        '',
        '- **链式法则**：$f$ 在 $a$、$g$ 在 $f(a)$ 处 Fréchet 可微 $\\implies$ $g \\circ f$ 在 $a$ 处可微，且 $(g\\circ f)\'(a) = g\'(f(a)) \\circ f\'(a)$（算子的复合，注意顺序）；',
        '- **可微 $\\implies$ 连续**；',
        '- **中值不等式**（需 $[a,b] \\subseteq \\Omega$，且 $f$ 在整条线段上连续、内部可微）：$\\|f(b) - f(a)\\| \\le \\sup_{[a,b]}\\|f\'\\| \\cdot \\|b - a\\|$ —— 这是把一元中值定理搬过来时**唯一能用的形式**（等号形式不再成立，因为有界线性算子不能「取某点处的值」）；',
        '- **逆映射定理（Banach 版）**（`thm.inverse-function-banach`）：$f\'(a)$ **可逆**（作为 $B(E,F)$ 的元素，从而 $E \\cong F$）+ 连续可微 $\\implies$ $f$ 在 $a$ 附近是局部同胚。那条定理的假设就写在这个导数上。',
        '⚠️ **与另外两个「导数」的分工**：`def.derivative` 是一元实函数；`def.total-differential` 是 $\\mathbb{R}^{n} \\to \\mathbb{R}^{m}$ 的全微分（Jacobian 矩阵）；流形之间的微分是 `def.differential-map`（切空间之间的线性映射）。本节点是**赋范空间之间**的版本 —— 它把前两个都收成特例（有限维时 $f\'(a)$ 就是 Jacobian 矩阵）。',
        '⚠️ **高阶导数**要小心：$f\'\' (a)$ 是 $B(E, B(E,F))$ 的元素，它与「$E \\times E$ 上的**有界双线性映射**」空间等距同构 —— 注意**不是** $B(E \\times E, F)$：那按定义是有界**线性**映射，$E = F = \\mathbb{R}$ 时它是一维，而 $D^{2}(x^{2})(v,w) = 2vw$ 并不对 $(v,w)$ 线性。赋范空间上写 Taylor 公式（`thm.taylor`）时必须按这个理解。'
      ].join('\n\n'),
      refs: ['Rudin, Functional Analysis · Fréchet 导数', 'Brezis, Functional Analysis, Sobolev Spaces and PDE · 微分']
    }
  ],

  edges: [
    { id: 'dep-rc-compact', kind: 'definition',
      definition: 'def.compact', usedBy: 'def.relatively-compact',
      note: '相对紧 = 闭包紧，定义直接用紧。' },
    { id: 'dep-rc-closed', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.relatively-compact',
      note: '要用闭包（$\\overline{A}$）与「闭」刻画「相对紧 vs 紧」。' },
    { id: 'dep-rc-totbdd', kind: 'definition',
      definition: 'def.totally-bounded', usedBy: 'def.relatively-compact',
      note: '度量空间里相对紧 $\\iff$ 全有界 —— 最常用的判据。' },
    { id: 'dep-rc-seq', kind: 'definition',
      definition: 'def.sequentially-compact', usedBy: 'def.relatively-compact',
      note: '序列刻画与「序列紧」只差「极限落在哪里」。' },

    { id: 'dep-fd-bounded', kind: 'definition',
      definition: 'def.bounded-operator', usedBy: 'thm.frechet-derivative',
      note: 'Fréchet 导数取值在 $B(E,F)$（有界算子）里，这是无穷维时的实质条件。' },
    { id: 'dep-fd-norm', kind: 'definition',
      definition: 'def.norm', usedBy: 'thm.frechet-derivative',
      note: '余项估计 $o(\\|h\\|)$ 与范数有关。' },
    { id: 'dep-fd-total', kind: 'definition',
      definition: 'def.total-differential', usedBy: 'thm.frechet-derivative',
      note: '有限维时 $f\'(a)$ 就是全微分（Jacobian 矩阵），本条是它的推广。' },
    { id: 'dep-fd-invfn', kind: 'definition',
      definition: 'thm.inverse-function-banach', usedBy: 'thm.frechet-derivative',
      note: 'Banach 版逆映射定理的假设「$f\'(a)$ 可逆」用的就是这个导数。' }
  ]
});
