/* ============================================================================
   内容包 · 例子层补洞（2026-11-04，v2 清单 §2 ③ E4）
   ----------------------------------------------------------------------------
   审计点名的三处：**有限域**、**平凡群**、**莫比乌斯带**（克莱因瓶的注里说「两个
   莫比乌斯带粘起来」却没有这个节点）。再配 4 个 L≥18 核心定义的具体例子：

     `ex.sphere-curvature`   Gauss 曲率（$S^{2}_{R}$ 的 $K = 1/R^{2}$）
     `ex.s1-tangent-bundle`  切丛（$TS^{1} \cong S^{1} \times \mathbb{R}$，为什么圆是「可平行化」的）
     `ex.h1-circle`          de Rham / 奇异同调（$H^{1}(S^{1}) \cong \mathbb{R}$，$\mathbb{Z}$ 版是 $\mathbb{Z}$）
     `ex.sierpinski-space`   拓扑空间（连通但不道路连通、$T_{0}$ 而非 $T_{1}$）

   口径：例子必须**具体到能算** —— 写清对象是什么、运算怎么定义、结论的数值是多少；
   ⛔ 不写「例如球面」这种没内容的。
   ========================================================================== */
(window.MG = window.MG || {}).packs = window.MG.packs || [];
window.MG.packs.push({
  name: '例子层：有限域 / 平凡群 / 莫比乌斯带 / 曲率 / 切丛 / H¹(S¹) / Sierpiński',

  nodes: [
    {
      id: 'ex.finite-field',
      cluster: 'algebra.structures',
      type: 'example',
      label: '有限域 F_p',
      title: '有限域：$\\mathbb{F}_{p} = \\mathbb{Z}/p\\mathbb{Z}$，以及 $\\mathbb{F}_{4}$',
      regions: ['algebra'],
      tags: ['例', '代数', '域', '有限域'],
      statement: [
        '设 $p$ 是素数，则 $\\mathbb{F}_{p} := \\mathbb{Z}/p\\mathbb{Z}$ 在模 $p$ 的加法与乘法下是一个**域**，恰有 $p$ 个元素。',
        '',
        '一般地，对素数幂 $q = p^{n}$ 存在（且在同构意义下唯一）含 $q$ 个元素的域 $\\mathbb{F}_{q}$；',
        '例如 $\\mathbb{F}_{4} = \\mathbb{F}_{2}[x]/(x^{2} + x + 1)$ —— 因为 $x^{2} + x + 1$ 在 $\\mathbb{F}_{2}$ 上没有根，所以它不可约，商是域。',
      ].join('\n'),
      notes: [
        '**为什么 $\\mathbb{Z}/p\\mathbb{Z}$ 是域**：$p$ 素 $\\iff$ $\\mathbb{Z}/p\\mathbb{Z}$ 没有非平凡理想 $\\iff$ 每个非零元可逆。' +
          '逆元是可以直接算的：$a^{p-1} \\equiv 1 \\pmod p$（Fermat 小定理），所以 $a^{-1} = a^{p-2}$。',
        '**$\\mathbb{Z}/n\\mathbb{Z}$ 什么时候只是环**：$n = 6$ 时 $2 \\cdot 3 = 0$，两个非零元乘出 $0$ —— 有零因子，不是整环，更不是域。' +
          '$\\mathbb{Z}/4\\mathbb{Z}$ 里 $2$ 没有逆（$2b \\equiv 1$ 无解）。',
        '⚠ **「含 $q$ 个元素的域」只在 $q$ 是素数幂时存在**：$\\mathbb{F}_{6}$ 不存在。原因是乘法群 $\\mathbb{F}_{q}^{\\times}$ 是 $q-1$ 阶循环群，' +
          '而 $\\mathbb{F}_{q}$ 的加法群是 $\\mathbb{F}_{p}$ 上的 $n$ 维向量空间 $implies$ $q = p^{n}$。',
        '📌 **$\\mathbb{F}_{4}$ 的乘法表**：记 $\\omega = x$，则 $\\omega^{2} = \\omega + 1$、$\\omega^{3} = 1$。于是 $\\mathbb{F}_{4} = \\{0, 1, \\omega, \\omega+1\\}$，' +
          '非零元构成 3 阶循环群。',
      ].join('\n\n'),
      refs: ['Dummit–Foote, Abstract Algebra, §13.1–13.2'],
    },

    {
      id: 'ex.trivial-group',
      cluster: 'algebra.structures',
      type: 'example',
      label: '平凡群',
      title: '平凡群 $\\{e\\}$：群的范畴里的零对象',
      regions: ['algebra'],
      tags: ['例', '代数', '群'],
      statement: [
        '集合 $\\{e\\}$ 配上唯一的运算 $e \\cdot e := e$ 是一个**群**，叫**平凡群**，常记 $1$ 或 $\\{e\\}$。',
      ].join('\n'),
      notes: [
        '**三条公理逐条验**：结合律 $(ee)e = e(ee) = e$；单位元 $e$；逆元 $e^{-1} = e$（就是它自己）。' +
          '所以它是最省事的群 —— 任何「所有群都满足」的命题，第一个检验对象都该是它。',
        '⭐ **它是群的范畴的零对象**：从平凡群到任何群 $G$ 只有一个同态（$e \\mapsto 1_{G}$），从 $G$ 到平凡群也只有一个（常映射）。' +
          '一个对象既是始对象又是终对象 $\\iff$ 它是零对象。',
        '⚠ **别与「平凡子群」混**：每个群 $G$ 有两个平凡子群 —— $\\{1\\}$ 与 $G$ 本身；只有一个的时候（$G$ 平凡）才两者重合。',
        '📌 **反例式的用处**：$-1$ 在平凡群里等于 $1$（因为只有这一个元素），所以「$x^{2} = 1$ 推出 $x = \\pm 1$」在平凡群里退化为一句废话 ——' +
          '这正是有些命题要把「非平凡群」写进假设的原因。',
      ].join('\n\n'),
      refs: ['Dummit–Foote, Abstract Algebra, §1.1'],
    },

    {
      id: 'def.mobius-band',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '莫比乌斯带',
      title: '莫比乌斯带：$[0,1] \\times [0,1]$ 把一头扭转后粘起来',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '不可定向'],
      statement: [
        '在正方形 $[0,1] \\times [0,1]$ 上取等价关系：把左边与右边**反向**粘起来，即',
        '',
        '$$(0, t) \\sim (1, 1 - t), \\qquad 0 \\le t \\le 1.$$',
        '',
        '商空间 $M := ([0,1]\\times[0,1])/\\sim$ 叫**莫比乌斯带**（Möbius band）。',
      ].join('\n'),
      notes: [
        '**与圆柱对照**：圆柱是**同向**粘，$(0, t) \\sim (1, t)$；莫比乌斯带是把一头翻过来再粘（$t \\mapsto 1 - t$）。' +
          '两者的差别只有这一处，但结论完全不同。',
        '⭐ **不可定向**：沿中线 $t = 1/2$ 走一圈回来，法向量反向 —— 所以莫比乌斯带**不带**定向。' +
          '这也是「两两粘起来得到不可定向曲面」的标准材料：$M \\cup_{\\partial} M \\cong$ 克莱因瓶（见 `ex.klein-bottle`）。',
        '**边界是一条圆**：$\\partial M \\cong S^{1}$（**一条**，不是两条 —— 圆柱的边界才是两条圆）。' +
          '注意 $\\partial M$ 作为子空间是连通的，这也是「不可定向」的直观来源。',
        '⚠ **它不能嵌进平面**：$\\mathbb{R}^{2}$ 里没有莫比乌斯带；$\\mathbb{R}^{3}$ 里可以（就是要自交才画得出边界）。' +
          '而 $\\mathbb{R}^{3}$ 里的实现是**不可定向曲面**的一个例子（`def.orientable-surface` 的另一侧）。',
        '📌 **Euler 示性数**：$M$ 与圆柱同伦等价（都是 $S^{1}$），所以 $\\chi(M) = \\chi(S^{1}) = 0$ —— 同伦不变量看不出「扭没扭」，' +
          '可定向性才看得出。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12（商空间与曲面）'],
    },

    {
      id: 'ex.sphere-curvature',
      cluster: 'diffgeom.intrinsic',
      type: 'example',
      label: '球面的曲率',
      title: '半径为 $R$ 的球面：$K = 1/R^{2}$，$H = \\pm 1/R$',
      regions: ['geometry'],
      tags: ['例', '微分几何', '曲率', '球面'],
      statement: [
        '设 $S^{2}_{R} = \\{\\, x \\in \\mathbb{R}^{3} : \\lVert x \\rVert = R \\,\\}$，取向外的单位法向 $n = x/R$。则',
        '',
        '$$K = \\frac{1}{R^{2}}, \\qquad H = \\pm\\frac{1}{R}, \\qquad k_{1} = k_{2} = \\pm\\frac{1}{R}.$$',
      ].join('\n'),
      notes: [
        '**怎么算**：取球坐标 $r(\\theta, \\varphi) = R(\\sin\\theta\\cos\\varphi, \\sin\\theta\\sin\\varphi, \\cos\\theta)$，' +
          '第一基本形式是 $R^{2}\\,\\mathrm{d}\\theta^{2} + R^{2}\\sin^{2}\\theta\\,\\mathrm{d}\\varphi^{2}$，' +
          '第二基本形式是 $R\\,\\mathrm{d}\\theta^{2} + R\\sin^{2}\\theta\\,\\mathrm{d}\\varphi^{2}$。' +
          '于是 $k_{1} = k_{2} = 1/R$，$K = k_{1}k_{2} = 1/R^{2}$。',
        '⭐ **Gauss 的绝妙定理在这里看得最清楚**：$K = 1/R^{2}$ 只用到了 $R$，而 $R$ 是**内蕴**量（测地线距离、面积都能量出来）——' +
          '尽管上面是用外在的第二基本形式算的。',
        '📌 **Gauss–Bonnet 对账**：$\\int_{S^{2}_{R}} K\\,\\mathrm{d}A = (1/R^{2})\\cdot 4\\pi R^{2} = 4\\pi = 2\\pi\\chi(S^{2})$，' +
          '与 $\\chi = 2$ 吻合 —— 而且与 $R$ 无关（曲率变小、面积变大，正好抵消）。',
        '⚠ **不要对一般曲面说「$K = 1/R^{2}$ 那种形式」**：只有球面两个主曲率相等。' +
          '环面上 $K$ 变号（外侧正、内侧负），平面上 $K = 0$。',
      ].join('\n\n'),
      refs: ['do Carmo, Differential Geometry of Curves and Surfaces, §3-2'],
    },

    {
      id: 'ex.s1-tangent-bundle',
      cluster: 'diffgeom.manifold',
      type: 'example',
      label: '圆的切丛是平凡丛',
      title: '切丛：$TS^{1} \\cong S^{1} \\times \\mathbb{R}$（圆可平行化）',
      regions: ['geometry'],
      tags: ['例', '微分几何', '丛', '切丛'],
      statement: [
        '把 $S^{1} = \\{\\, z \\in \\mathbb{C} : |z| = 1 \\,\\}$ 看成光滑流形。它的切丛',
        '',
        '$$TS^{1} = \\bigsqcup_{z \\in S^{1}} T_{z}S^{1}$$',
        '',
        '与乘积 $S^{1} \\times \\mathbb{R}$ 微分同构：把 $(z, \\lambda)$ 送到 $\\lambda\\, iz$（$iz$ 是 $z$ 处的单位切向量）。',
      ].join('\n'),
      notes: [
        '**为什么平凡**：圆上有一个**处处非零**的光滑切向量场 $z \\mapsto iz$，用它把每个切空间标架化，' +
          '于是 $\\lambda \\mapsto \\lambda iz$ 给出 $T_{z}S^{1} \\cong \\mathbb{R}$ 的**整体**平凡化（不是逐点的、是整体的）。',
        '⭐ **一般语言**：具有处处非零向量场的流形叫**可平行化**（parallelizable）；圆可平行化，而 $S^{2}$ 不行 ——' +
          '这就是「毛球定理」（$S^{2}$ 上不存在处处非零的连续切向量场）。',
        '⚠ **切丛平凡 $\\ne$ 流形平凡**：$TS^{1} \\cong S^{1}\\times\\mathbb{R}$ 但 $S^{1} \\not\\cong \\mathbb{R}$。' +
          '同样 $TS^{1}$ 与圆柱面作为流形同构，而 $S^{1}$ 不是平面。',
        '📌 **对照**：$TS^{2}$ **不**平凡（$S^{2}$ 的 Euler 示性数 $\\chi = 2 \\ne 0$，而可平行化流形必有 $\\chi = 0$）。' +
          '这条「$\\chi = 0$ 才可能可平行化」在 `def.characteristic-class` 那一团里有更系统的说法（Euler 类是 $TS^{2}$ 非平凡的障碍）。',
      ].join('\n\n'),
      refs: ['Tu, Introduction to Manifolds, §8（切丛）'],
    },

    {
      id: 'ex.h1-circle',
      cluster: 'topology.homology',
      type: 'example',
      label: '圆的 H¹',
      title: '圆的同调：$H_{1}(S^{1}) = \\mathbb{Z}$、$H^{1}_{\\mathrm{dR}}(S^{1}) = \\mathbb{R}$',
      regions: ['topology', 'analysis'],
      tags: ['例', '拓扑', '同调', 'de Rham'],
      statement: [
        '$H_{0}(S^{1}) \\cong \\mathbb{Z}$、$H_{1}(S^{1}) \\cong \\mathbb{Z}$，其余为 $0$；对偶地',
        '',
        '$$H^{1}_{\\mathrm{dR}}(S^{1}) \\cong \\mathbb{R}, \\qquad \\int_{S^{1}} : H^{1}_{\\mathrm{dR}}(S^{1}) \\longrightarrow \\mathbb{R}$$',
        '',
        '是同构（取 $\\mathrm{d}\\theta$ 为生成元）。',
      ].join('\n'),
      notes: [
        '**$H_{1}$ 怎么算**：把圆三角剖分成一个顶点 $v$ 与一条边 $e$（两端都粘到 $v$）。' +
          '链群 $C_{0} = \\mathbb{Z}v$、$C_{1} = \\mathbb{Z}e$，边缘 $\\partial e = v - v = 0$，于是 $H_{1} = \\ker\\partial_{1}/\\operatorname{im}\\partial_{2} = \\mathbb{Z}e$。',
        '⭐ **de Rham 侧**：$\\mathrm{d}\\theta$ 是闭的（1 维，$\\mathrm{d}(\\mathrm{d}\\theta) = 0$ 平凡）但**不恰当** ——' +
          '否则 $\\int_{S^{1}}\\mathrm{d}\\theta = 0$，而它实际等于 $2\\pi$。这条「闭而不恰当」正是 $H^{1} \\ne 0$ 的全部内容。',
        '📌 **绕数**：对任意闭 1-形式 $\\omega$，$\\frac{1}{2\\pi}\\int_{S^{1}}\\omega \\in \\mathbb{R}$ 是它的「周期」；' +
          '若 $\\omega$ 是整系数的（如 $\\mathrm{d}\\theta$ 对应 $\\mathbb{Z}$），积分落在 $2\\pi\\mathbb{Z}$ —— 这就是**绕数**的同调解释。',
        '⚠ **别把 $H_{1}$ 与 $\\pi_{1}$ 混**：$H_{1}(S^{1}) = \\pi_{1}(S^{1})^{\\mathrm{ab}} = \\mathbb{Z}$，两者在这里恰好同构，' +
          '但一般只差「交换化」（本图没有 Hurewicz 定理的节点，这里只记「一般只差交换化」这条事实）。',
      ].join('\n\n'),
      refs: ['Hatcher, Algebraic Topology, §2.1', 'Munkres, Topology, Ch. 12'],
    },

    {
      id: 'ex.sierpinski-space',
      cluster: 'topology.general',
      type: 'example',
      label: 'Sierpiński 空间',
      title: 'Sierpiński 空间 $\\{0,1\\}$：$T_{0}$ 但非 $T_{1}$，连通但非道路连通',
      regions: ['topology'],
      tags: ['例', '拓扑', '分离公理', '反例'],
      statement: [
        '在两点集 $S = \\{0, 1\\}$ 上取拓扑 $\\mathcal{T} = \\{\\, \\emptyset, \\{1\\}, \\{0,1\\} \\,\\}$（叫 Sierpiński 空间）。',
      ].join('\n'),
      notes: [
        '**$T_{0}$ 但不是 $T_{1}$**：点 $1$ 有开邻域 $\\{1\\}$ 不含 $0$，所以能「分开」这两点（$T_{0}$）；' +
          '但**反过来不行** —— 任何含 $0$ 的开集都含 $1$（$\\{0\\}$ 不是开集）$implies$ 不是 $T_{1}$，更不是 Hausdorff。',
        '⭐ **连通（而且道路连通）**：$\\{0\\}$ 与 $\\{1\\}$ 不构成分离（$\\{0\\}$ **不开**：任何含 $0$ 的开集都含 $1$），所以空间连通；' +
          '它**其实是道路连通的**：$\\gamma(t) = 1$（$t < 1/2$）、$\\gamma(t) = 0$（$t \\ge 1/2$）的 $\\gamma^{-1}(\\{1\\}) = [0, 1/2)$ 在 $[0,1]$ 中开，故连续' +
          '。连通但不道路连通的标准例子是拓扑学家的正弦曲线。',
        '⚠ **它是 $T_{0}$ 反例的标准来源**：想说明「$T_{0}$ 不蕴含 $T_{1}$」，最省事的例子就是它。' +
          '本图分离公理那一族（`def.t0-space` $\\to$ `def.t1-space` $\\to$ …）的分层，就是靠这类例子才不像定义堆砌。',
        '📌 **它的开集对应「上开」集合**：把 $0 < 1$ 看成序，则开集正好是**上闭集**（$1 \\in U$ 且 $1 \\le x$ $implies$ $x \\in U$）。' +
          '于是 Sierpiński 空间就是「两点偏序集」的 Alexandrov 拓扑 —— 这也是它在 Domain 理论里出现的原因。',
      ].join('\n\n'),
      refs: ['Steen–Seebach, Counterexamples in Topology（Sierpiński space）'],
    },
  ],

  edges: [
    /* 有限域 */
    { id: 'dep.ff-field', kind: 'definition', definition: 'def.field', usedBy: 'ex.finite-field',
      note: '$\\mathbb{F}_{p}$ 的定义就是「$\\mathbb{Z}/p\\mathbb{Z}$ 是域」这一条断言 —— 域的定义是它的前提。' },
    { id: 'dep.ff-ideal', kind: 'definition', definition: 'def.ideal', usedBy: 'ex.finite-field',
      note: '「$p$ 素 $\\iff$ $(p)$ 是极大理想」用的是**理想**与「商环是域」的判别。' },

    /* 平凡群 */
    { id: 'dep.trivial-group', kind: 'definition', definition: 'def.group', usedBy: 'ex.trivial-group',
      note: '先要说清「群」是什么，才谈得上「只有单位元的那个群」。' },
    { id: 'dep.trivial-subgroup', kind: 'definition', definition: 'def.subgroup', usedBy: 'ex.trivial-group',
      note: '注里的「平凡子群」用的是子群的定义；$\\{1\\}$ 与 $G$ 是每个群都有的两个。' },

    /* 莫比乌斯带 */
    { id: 'dep.mobius-quotient', kind: 'definition', definition: 'def.quotient-topology', usedBy: 'def.mobius-band',
      note: '莫比乌斯带**就是**正方形的商空间 —— 定义里的「粘」正是商拓扑。' },
    { id: 'dep.mobius-orient', kind: 'definition', definition: 'def.orientable-surface', usedBy: 'def.mobius-band',
      note: '「不可定向」是相对可定向曲面说的：沿中线走一圈法向反向，所以它落在另一侧。' },
    { id: 'dep.mobius-klein', kind: 'definition', definition: 'def.mobius-band', usedBy: 'ex.klein-bottle',
      note: '克莱因瓶的标准构造就是「两个莫比乌斯带沿边界粘起来」—— 此前这条边缺失（注里说了却没有节点）。' },

    /* 球面曲率 */
    { id: 'dep.spherecurv-K', kind: 'definition', definition: 'def.gauss-curvature', usedBy: 'ex.sphere-curvature',
      note: '例子的结论就是「$K = 1/R^{2}$」—— 用到 Gauss 曲率的定义（两主曲率之积）。' },
    { id: 'dep.spherecurv-gb', kind: 'definition', definition: 'thm.gauss-bonnet', usedBy: 'ex.sphere-curvature',
      note: '注里用 $\\int_{S^{2}_{R}} K\\,\\mathrm{d}A = 4\\pi = 2\\pi\\chi$ **对账**，用的就是 Gauss–Bonnet 定理。' },
    { id: 'dep.spherecurv-sff', kind: 'definition', definition: 'def.second-fundamental-form', usedBy: 'ex.sphere-curvature',
      note: '计算过程取第二基本形式 $h = R\\,\\mathrm{d}\\theta^{2} + R\\sin^{2}\\theta\\,\\mathrm{d}\\varphi^{2}$ 来得到主曲率。' },

    /* 圆的切丛 */
    { id: 'dep.s1tangent-bundle', kind: 'definition', definition: 'def.tangent-bundle', usedBy: 'ex.s1-tangent-bundle',
      note: '例子的对象是 $TS^{1}$，即圆的切丛。' },
    { id: 'dep.s1tangent-vb', kind: 'definition', definition: 'def.vector-bundle', usedBy: 'ex.s1-tangent-bundle',
      note: '「与 $S^{1}\\times\\mathbb{R}$ 同构」用的是向量丛的同构（纤维上线性 + 丛映射）。' },

    /* 圆的 H¹ */
    { id: 'dep.h1-singular', kind: 'definition', definition: 'def.singular-homology', usedBy: 'ex.h1-circle',
      note: '$H_{1}(S^{1}) = \\mathbb{Z}$ 是奇异同调（等价地单纯同调，本图两个都在）。' },
    { id: 'dep.h1-derham', kind: 'definition', definition: 'def.de-rham-complex', usedBy: 'ex.h1-circle',
      note: '「$\\mathrm{d}\\theta$ 闭而不恰当」讲的是 de Rham 复形里的上同调类。' },

    /* Sierpiński */
    { id: 'dep.sierpinski-top', kind: 'definition', definition: 'def.topology', usedBy: 'ex.sierpinski-space',
      note: '例子的内容是「在两点集上给一个拓扑」，所以用到拓扑的定义。' },
    { id: 'dep.sierpinski-conn', kind: 'definition', definition: 'def.connected', usedBy: 'ex.sierpinski-space',
      note: '「连通但非道路连通」用的是连通与连通分量的定义。' },
  ],
});
