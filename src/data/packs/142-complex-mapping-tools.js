/* ============================================================================
   内容包 · 复变函数（五）：共形映射的计算工具

   王晓光那本书的「几何理论（共形映射与 Riemann 映射定理）」一块，图上原来只有
   def.mobius 与 prop.conformal-iff 两个点 —— 会「存在性」（Riemann 映射定理），
   不会「算」。这一批补的就是**怎么算**：交比、保圆性、对称点、分类、
   Schwarz–Christoffel、Joukowski、标准映射表、边界对应。

   ⚠️ 引用：王晓光那本只给「共形映射 / 分式线性变换」这类节名（本图不给章号）；
   Ahlfors 给章名；Schwarz–Christoffel 另给 Driscoll–Trefethen 专著。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '复变函数（五）· 共形映射的计算工具',

  nodes: [
    {
      id: 'def.cross-ratio',
      type: 'definition',
      label: '交比',
      title: '交比：分式线性变换下唯一不变的四点量',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '共形映射', '交比', '分式线性变换'],
      statement: [
        '对互不相同的 $z_{1}, z_{2}, z_{3}, z_{4} \\in \\widehat{\\mathbb{C}}$，定义它们的**交比**',
        '',
        '$$(z_{1}, z_{2}; z_{3}, z_{4}) := \\frac{N}{D},$$',
        '',
        '其中 $N := (z_{3} - z_{1})(z_{4} - z_{2})$、$D := (z_{3} - z_{2})(z_{4} - z_{1})$。',
        '',
        '遇到 $\\infty$ 时按极限理解（含 $\\infty$ 的因子约掉即可）。',
        '',
        '**性质**：对任何分式线性变换 $T$ 有 $(Tz_{1}, Tz_{2}; Tz_{3}, Tz_{4}) = ' +
          '(z_{1}, z_{2}; z_{3}, z_{4})$ —— 交比是分式线性变换下的**完全不变量**。',
      ].join('\n'),
      notes: [
        '**为什么它是不变量**：分式线性变换 $T(z) = (az+b)/(cz+d)$ 可以写成四个点的交比的',
        '复合。直接验算：每个差 $Tz_{i} - Tz_{j} = \\dfrac{(ad - bc)(z_{i} - z_{j})}' +
          '{(cz_{i} + d)(cz_{j} + d)}$，',
        '代进交比的分子分母后，$(ad-bc)$ 与那些 $(cz_{k}+d)$ **成对抵消**，只剩原交比。',
        '',
        '⭐ **它是「四点几何」的坐标**：三角形有边长与角，四点就需要一个复数量来刻画 —— ' +
          '交比取实值/取特定值，分别对应「共圆」与「调和分割」这两件经典的事。',
        '',
        '⚠️ 交比的取值依赖**点的次序**：换两个位置会得到 $1/\\lambda$、$1-\\lambda$ 等六个值，' +
          '它们是同一个「非调和比」的六种写法。写公式时先把次序钉死。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 分式线性变换（交比）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations',
      ],
    },
    {
      id: 'prop.cross-ratio-real',
      type: 'proposition',
      label: '交比为实 ⟺ 四点共圆',
      title: '交比取实值当且仅当四点共圆或共线',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '交比', '共圆', '分式线性变换'],
      statement: [
        '设 $z_{1}, z_{2}, z_{3}, z_{4}$ 互不相同。则',
        '',
          '$$(z_{1}, z_{2}; z_{3}, z_{4}) \\in \\mathbb{R}$$',
          '当且仅当 $z_{1}, z_{2}, z_{3}, z_{4}$ **四点共圆或共线**。',
        '',
        '（在扩充平面上「圆」与「直线」是同一类对象，所以这句话不必分两种情形。）',
      ].join('\n'),
      notes: [
        '**证明**：取分式线性变换 $T$ 把 $z_{1}, z_{2}, z_{3}$ 分别送到 $0, 1, \\infty$（存在且唯一，' +
          '见 `prop.mobius-three-points`）。由交比不变性',
        '',
        '$$(z_{1}, z_{2}; z_{3}, z_{4}) = (0, 1; \\infty, Tz_{4}) = Tz_{4}.$$',
        '',
        '于是「交比为实」$\\iff$「$Tz_{4}$ 在实轴上」。而 $T^{-1}(\\mathbb{R})$ 是一条直线或一个圆' +
          '（实轴是过 $\\infty$ 的「圆」，见 `prop.mobius-circle`），它恰好过 $z_{1}, z_{2}, z_{3}$。∎',
        '',
        '⭐ **它是共圆判据的复数版**：初等几何里要量角，这里只要算一个复数是不是实数。' +
          '工程上判四点共圆、或判某个分式线性变换把实轴送到哪，都是这一条。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 交比与共圆判据',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations',
      ],
    },
    {
      id: 'prop.mobius-three-points',
      type: 'proposition',
      label: '三点决定分式线性变换',
      title: '三对点唯一决定一个分式线性变换',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '分式线性变换', '交比', '存在唯一'],
      statement: [
        '设 $z_{1}, z_{2}, z_{3}$ 与 $w_{1}, w_{2}, w_{3}$ 分别是 $\\widehat{\\mathbb{C}}$ 中三个互不相同的点。' +
          '则存在**唯一**的分式线性变换 $T$ 使 $T(z_{k}) = w_{k}$（$k = 1, 2, 3$）。',
        '',
        '显式写法就是让交比相等：',
        '',
        '$$(z, z_{1}; z_{2}, z_{3}) = (Tz, w_{1}; w_{2}, w_{3}).$$',
        '',
        '把右端看成 $w$、左端看成 $z$ 的一次分式方程，解出 $w = T(z)$。',
      ].join('\n'),
      notes: [
        '**存在性**：上式对每个 $z$ 唯一确定一个 $w$（除非分母为零，此时 $w = \\infty$），' +
          '所以它定义了一个映射；它关于 $z$ 是一次的，故是分式线性变换。逐点代入即得 $Tz_{k} = w_{k}$。',
        '',
        '**唯一性**：若 $T_{1}, T_{2}$ 都满足，则 $S := T_{1}^{-1}T_{2}$ 固定三个点。' +
          '而固定三个点的分式线性变换只有恒等（由交比不变性：$Sz$ 与 $z$ 对同样的三点有相同的交比，' +
          '故 $Sz = z$）。∎',
        '',
        '⭐ **实用价值**：凡是「构造一个把某圆盘送到上半平面的变换」这类问题，' +
          '只要挑三个边界点对好，变换就唯一确定了 —— 不用猜系数。',
        '',
        '⚠️ 三对点必须在扩充平面上互异；允许 $\\infty$ 作为目标点（例如把某点送到 $\\infty$，' +
          '那就是把它「挖掉」变成一个半平面）。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 分式线性变换的确定',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations',
      ],
    },
    {
      id: 'prop.mobius-circle',
      type: 'proposition',
      label: '保圆性',
      title: '分式线性变换把圆与直线映成圆与直线',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '分式线性变换', '保圆', '共形映射'],
      statement: [
        '分式线性变换把 $\\widehat{\\mathbb{C}}$ 中的**圆与直线**（合称「圆」）映成圆或直线。' +
          '等价说法：把 $\\mathbb{R} \\cup \\{\\infty\\}$ 的像总是一个圆或一条直线。',
        '',
        '推论：任意两个圆盘（或半平面）之间都有分式线性变换把它们互相映过去；' +
          '特别地，任意圆盘都共形等价于上半平面，也等价于单位圆盘。',
      ].join('\n'),
      notes: [
        '**证明**：由 `prop.cross-ratio-real`，四点共圆 $\\iff$ 交比为实。' +
          '而交比在分式线性变换下不变，故「共圆」这件事被保持 —— 于是圆（或直线）上的像仍在同一类里。\n\n' +
          '更具体地：$T$ 是三个平移/旋转/伸缩与 $z \\mapsto 1/z$ 的复合，前三种显然保圆，$1/z$ 把圆 $|z - a| = r$ 送到圆（算一下 $w = 1/z$ 满足 $|1/w - a| = r$，整理得 $|w - \\bar a/\\sigma|^{2} = r^{2}/\\sigma^{2}$ 型方程，仍是圆）。\n\n' +
          '∎',
        '',
        '⭐ **「直线算圆」不是文字游戏**：在扩充平面上直线就是过 $\\infty$ 的圆，' +
          '统一之后定理只有一句，代码/证明都少一半。',
        '',
        '⚠️ 保圆但**不保圆内**：「圆盘映成圆盘还是外部」要看定向。' +
          '实系数（$ad - bc$ 与系数实性）的分式线性变换把上半平面映到上半或下半平面，' +
          '要判方向就看一个测试点的像。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 分式线性变换的保圆性',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations',
      ],
    },
    {
      id: 'def.symmetric-point',
      type: 'definition',
      label: '关于圆的对称点',
      title: '对称点：关于圆与关于直线的「反演」的统一说法',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '对称点', '反演', '分式线性变换'],
      statement: [
        '设圆 $C$ 的圆心为 $a$、半径为 $R$。称 $z$ 与 $z^{*}$ **关于 $C$ 对称**，如果',
        '',
        '$$(z - a)(\\overline{z^{*}} - \\bar a) = R^{2},$$',
        '',
        '并且 $\\arg(z - a) = \\arg(z^{*} - a)$（即 $a, z, z^{*}$ 三点共线且同向）。',
        '',
        '（等价地：$z^{*}$ 在射线 $a + t(z - a)$（$t > 0$）上，且 $|z - a|\\,|z^{*} - a| = R^{2}$。）',
        '',
        '关于**直线** $L$ 的对称就是通常的镜像；把 $L$ 看成过 $\\infty$ 的圆，两种情形可以合成一句：' +
          '「$z, z^{*}$ 关于圆 $C$ 对称 $\\iff$ 每个过 $z, z^{*}$ 的圆都与 $C$ 正交」。',
      ].join('\n'),
      notes: [
        '**为什么这样定义**：在圆内 $|z - a| < R$，对称点落在圆外 —— 这是个**反演**。' +
          '它把「圆心」和「无穷远点」互相对应（$z = a$ 时 $z^{*} = \\infty$），' +
          '这正是 `prop.mobius-symmetry` 能让对称性在分式线性变换下保持的原因。',
        '',
        '⭐ **计算式**（做题最常用）：',
        '',
        '$$z^{*} = a + \\frac{R^{2}}{\\overline{z - a}}.$$',
        '',
        '关于实轴的对称就是 $z^{*} = \\bar z$；关于单位圆的对称是 $z^{*} = 1/\\bar z$。',
        '',
        '⚠️ 对称点不是「到圆心的距离相等」：那是对径点。对称是**反演**，距离乘积固定。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 对称点与分式线性变换',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations',
      ],
    },
    {
      id: 'prop.mobius-symmetry',
      type: 'proposition',
      label: '分式线性变换保对称点',
      title: '分式线性变换把对称点映成对称点',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '对称点', '分式线性变换', '共形映射'],
      statement: [
        '设 $T$ 是分式线性变换，$z, z^{*}$ 关于圆（或直线）$C$ 对称。则 $Tz, Tz^{*}$ ' +
          '关于圆 $T(C)$ 对称。',
        '',
        '换句话说：**对称关系与分式线性变换可交换**。',
      ].join('\n'),
      notes: [
        '**证明**：用「正交圆」这个等价刻画（见 `def.symmetric-point`）。' +
          '$z, z^{*}$ 关于 $C$ 对称 $\\iff$ 每个过 $z, z^{*}$ 的圆都与 $C$ 正交。\n\n' +
          '分式线性变换是共形的（`prop.conformal-iff`），**保角**，于是「正交」被保持；\n\n' +
          '又把「过 $z, z^{*}$ 的圆」映成「过 $Tz, Tz^{*}$ 的圆」，把 $C$ 映成 $T(C)$。\n\n' +
          '故 $Tz, Tz^{*}$ 关于 $T(C)$ 也满足同一刻画。\n\n' +
          '∎',
        '',
        '⭐ **它的用处是「造映射」而不是「判对称」**：若要求一个把圆盘 $D$ 送到上半平面的变换，' +
          '就先定好 $D$ 的边界上几对对称点（例如圆心与无穷远），再要求它们的像也对称 —— ' +
          '于是变换被逼出来，比硬解方程快得多。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 分式线性变换与对称点',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations',
      ],
    },
    {
      id: 'prop.mobius-classification',
      type: 'proposition',
      label: '分式线性变换的分类',
      title: '分式线性变换的三种类型：椭圆、双曲、抛物',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '分式线性变换', '分类', '不动点'],
      statement: [
        '设 $T(z) = (az + b)/(cz + d)$，$ad - bc \\ne 0$，且 $T$ 不是恒等。' +
          '记 $\\tau := a + d$、$\\Delta := ad - bc$。按 $\\tau^{2}/\\Delta$ 分类：',
        '',
        '1. $\\tau^{2}/\\Delta \\in [0, 4)$：**椭圆型** —— 两个不动点，$T$ 在它们之间「旋转」；',
        '2. $\\tau^{2}/\\Delta \\in (4, \\infty)$：**双曲型** —— 两个不动点，$T$ 沿测地线平移；',
        '3. $\\tau^{2}/\\Delta = 4$：**抛物型** —— 只有一个不动点（重根）。',
        '',
        '（把 $\\widehat{\\mathbb{C}}$ 上的分式线性变换看成双曲三维空间里的等距，' +
          '这三类就是等距的三种运动学类型。）',
      ].join('\n'),
      notes: [
        '**怎么看出来的**：先共轭到不动点上。若有两个不动点，用分式线性变换把它们送到 ' +
          '$0, \\infty$，则 $T$ 变成 $w \\mapsto \\lambda w$；$|\\lambda| = 1$ 是椭圆、' +
          '$\\lambda > 0$ 且 $\\ne 1$ 是双曲、$\\lambda < 0$ 是「双曲 + 半转」。重根时共轭成 ' +
          '$w \\mapsto w + 1$（抛物）。',
        '',
        '⭐ 与矩阵的联系：$T$ 对应矩阵 $\\begin{pmatrix} a & b \\\\ c & d\\end{pmatrix}$，' +
          '共轭类由特征值比 $\\lambda_{1}/\\lambda_{2}$ 决定，' +
          '而 $\\tau^{2}/\\Delta = (\\lambda_{1} + \\lambda_{2})^{2}/(\\lambda_{1}\\lambda_{2})$ ' +
          '正是这个比的函数（$\\lambda + 1/\\lambda + 2$）。',
        '',
        '⚠️ 分类在**实**分式线性变换（保持上半平面）上才有几何意义（双曲/椭圆/抛物 ' +
          '= 双曲平面上的等距分类）；复系数的情形只是代数分类。',
      ].join('\n'),
      refs: [
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations（分类部分）',
        'Beardon, The Geometry of Discrete Groups, Ch. 2',
      ],
    },
    {
      id: 'prop.mobius-group',
      type: 'proposition',
      label: '分式线性变换成群',
      title: '分式线性变换构成群：$\\operatorname{PGL}(2, \\mathbb{C})$',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '分式线性变换', '群', '自同构'],
      statement: [
        '所有分式线性变换在复合下构成一个群，记作 $\\operatorname{PGL}(2, \\mathbb{C})$，' +
          '它同构于 $2 \\times 2$ 复矩阵群模去非零纯量：',
        '',
        '并且它**恰好**是扩充平面 $\\widehat{\\mathbb{C}}$ 的全纯自同构群：' +
          '每个双全纯 $\\widehat{\\mathbb{C}} \\to \\widehat{\\mathbb{C}}$ 都是分式线性的。',
      ].join('\n'),
      notes: [
        '**群结构**：矩阵乘法对应变换的复合；$\\begin{pmatrix} a & b\\\\ c & d\\end{pmatrix}$ 与 ' +
          '$\\lambda\\begin{pmatrix} a & b\\\\ c & d\\end{pmatrix}$ 给出同一个变换，所以要模掉纯量。' +
          '逆变换的矩阵就是逆矩阵（差一个纯量）。',
        '',
        '**为什么自同构只有这些**：$\\widehat{\\mathbb{C}}$ 上的全纯自同构若把 $\\infty$ 送到 $\\infty$，' +
          '就是整函数且是双射 —— 由 Liouville 型论证只能是 $az + b$；把 $\\infty$ 送到别处的，' +
          '先复合一个 $z \\mapsto 1/(z - z_{0})$ 归结到前一种。∎',
        '',
        '⭐ **三种子群对应三种几何**：保持上半平面的实系数分式线性变换 $\\cong ' +
          '\\mathrm{PGL}(2, \\mathbb{R}) \\cong \\mathrm{PSL}(2, \\mathbb{R})$ 是双曲平面的等距群；' +
          '保持单位圆盘的与之共轭。Schwarz–Pick（`thm.schwarz-pick`）说的就是' +
          '「全纯自映射 = 不放大双曲距离」，等号成立时是这个群里的元素。',
      ].join('\n'),
      refs: [
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 · Linear Transformations',
        '王晓光《复变函数》· 分式线性变换的性质',
      ],
    },
    {
      id: 'prop.standard-maps',
      type: 'proposition',
      label: '标准共形映射',
      title: '几个典型区域之间的标准共形映射',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '共形映射', '标准映射', '分式线性变换'],
      statement: [
        '常用的一批「把区域搬到标准位置」的映射（$\\mathbb{H}$ = 上半平面，$\\mathbb{D}$ = 单位圆盘）：',
        '',
        '1. $\\mathbb{H} \\to \\mathbb{D}$：$z \\mapsto \\dfrac{z - i}{z + i}$；',
        '2. 角域 $\\{\\, 0 < \\arg z < \\alpha \\,\\}$ $\\to \\mathbb{H}$：$z \\mapsto z^{\\pi/\\alpha}$；',
        '3. 带域 $\\{\\, 0 < \\operatorname{Im} z < \\pi \\,\\}$ $\\to \\mathbb{H}$：$z \\mapsto e^{z}$；',
        '4. 割平面 $\\mathbb{C} \\setminus (-\\infty, 0]$ $\\to \\mathbb{H}$：主值 $\\sqrt{z}$ 或 $\\log z$；',
        '5. $\\mathbb{D} \\to \\mathbb{D}$ 的自同构：$z \\mapsto e^{i\\theta}\\dfrac{z - a}{1 - \\bar a z}$，$|a| < 1$。',
      ].join('\n'),
      notes: [
        '⭐ **这一张表就是「共形映射」这一章的手册**：遇到一个新区域，先想办法用表里的映射' +
          '（幂、指数、对数、分式线性）把它搬到 $\\mathbb{H}$ 或 $\\mathbb{D}$，' +
          '再由 `thm.riemann-mapping` 知道一定能做到 —— 差别只在「能不能写出公式」。',
        '',
        '**为什么这些映射对**：$z^{k}$ 把角域张开 $k$ 倍角（$k = \\pi/\\alpha$）；' +
          '$e^{z}$ 把水平带卷成角域；$\\log$ 反过来把割平面摊成带域；' +
          '分式线性变换保圆（`prop.mobius-circle`），所以能把半平面/圆盘互换。',
        '',
        '⚠️ 每个映射都要**指明取哪一支**：$z^{\\pi/\\alpha}$ 与 $\\log$ 都是多值的，' +
          '上面写的是主值（或约定好的那一支）。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 共形映射的例子',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 · Conformal Mapping',
      ],
    },
    {
      id: 'thm.schwarz-christoffel',
      type: 'theorem',
      status: 'skeleton',
      label: 'Schwarz–Christoffel 公式',
      title: 'Schwarz–Christoffel 公式：把上半平面映成多边形',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', 'Schwarz-Christoffel', '共形映射', '多边形'],
      statement: [
        '设多边形的内角为 $\\alpha_{1}\\pi, \\ldots, \\alpha_{n}\\pi$（$0 < \\alpha_{k} < 2$），' +
          '顶点按逆时针排列，对应实轴上的点 $x_{1} < x_{2} < \\cdots < x_{n}$。则',
        '',
        '$$f(z) = A\\int^{z}_{z_{0}} g(\\zeta)\\,\\mathrm{d}\\zeta + B,\\qquad g(\\zeta) := \\prod_{k=1}^{n} (\\zeta - x_{k})^{\\alpha_{k} - 1},$$',
        '',
        '把 $\\mathbb{H}$ 共形地映成该多边形内部，且 $f(x_{k})$ 是第 $k$ 个顶点（取 $A \\ne 0$，否则 $f \\equiv B$ 是常值、谈不上共形）。',
        '常数 $A, B$ 决定大小、旋转与位置。',
      ].join('\n'),
      notes: '⚠️ **本节点仍标 skeleton**：下面完整证明了「**形式**」这一半（若共形映射存在，它必是这个形状，且 $f\'=Ag$）；「**存在性**」那一半（这个积分确实单叶地映满多边形）本图不写，缺的 (i) 与 (iii) 两条外部引理在末尾点明；(ii) 的辐角原理收尾已补完整。\n\n**记号**：外角和给出 $\\sum_{k=1}^{n}(1 - \\alpha_{k}) = 2$，等价于\n\n$$\\sum_{k=1}^{n} (\\alpha_{k} - 1) = -2.$$\n\n这个 $-2$ 正是 $g(\\zeta) = O(\\zeta^{-2})$ 的来源，也是积分在无穷远收敛的原因。\n\n**第一部分：形式唯一性（完整证明）**\n\n命题：设 $f : \\mathbb{H} \\to P$ 是把上半平面共形映成多边形内部的映射，$f$ 连续到边界、把 $x_{k}$ 送到第 $k$ 个顶点，则存在 $A \\ne 0$、$B$，使 $f\'(z) = A\\,g(z)$。\n\n证明分五小步。\n\n（1）**规范化**：把 $\\infty \\in \\partial\\mathbb{H}$ 选在不是任何顶点原像的位置（圆 $\\partial\\mathbb{H}$ 上除去有限个顶点原像后仍有点，用 $\\operatorname{Aut}(\\mathbb{H})$ 把它送到 $\\infty$）。于是 $\\infty$ 对应的是多边形某条边的内部，而不是顶点。\n\n（2）**角点的局部形状**：在 $x_{k}$ 附近，$f$ 有展开\n\n$$f(z) - f(x_{k}) = (z - x_{k})^{\\alpha_{k}}\\,h_{k}(z),\\qquad h_{k}\\ \\text{在}\\ x_{k}\\ \\text{附近全纯且}\\ h_{k}(x_{k}) \\ne 0.$$\n\n理由：把角的两边所在直线作反射，角的两侧被「展开」；等价地，令 $w = (f - f(x_{k}))^{1/\\alpha_{k}}$，它把角展成半平面，再用 Schwarz 反射（`thm.schwarz-reflection`）把 $f$ 延拓过 $x_{k}$，局部即得上式。\n\n（3）**跨边延拓**：每条边 $f((x_{k}, x_{k+1}))$ 是直线段。沿这线段把多边形反射，同时把 $\\mathbb{H}$ 沿 $(x_{k}, x_{k+1})$ 反射；由 Schwarz 反射，$f$ 解析延拓过整个开区间 $(x_{k}, x_{k+1})$。定义\n\n$$\\varphi(z) := \\frac{f\'(z)}{g(z)} = \\frac{f\'(z)}{\\prod_{k=1}^{n}(z - x_{k})^{\\alpha_{k}-1}}.$$\n\n由（2），$\\varphi$ 在 $x_{k}$ 处有可去奇点且 $\\varphi(x_{k}) = h_{k}(x_{k}) \\ne 0$；由跨边反射，$\\varphi(\\bar z) = \\overline{\\varphi(z)}$，故 $\\varphi$ 延拓成 $\\mathbb{C}$ 上的整函数。\n\n（4）**$\\varphi$ 无零点**：$\\mathbb{H}$ 内 $f\' \\ne 0$（共形）；每个开区间 $(x_{k}, x_{k+1})$ 上 $f$ 的参数化导数非零（边是直线段，$f$ 是双射）；由反射式，下半平面也无零点；角点处由（2）。故 $\\varphi$ 是处处非零的整函数。\n\n（5）**$\\varphi$ 在无穷远有有限非零极限**：由（1），$\\infty$ 映到某条边内部，跨这条边反射给出 $f$ 在 $\\infty$ 的邻域内全纯；在坐标 $w = 1/z$ 下 $f$ 在 $w = 0$ 全纯，故 $f\'(z) = O(z^{-2})$。另一方面 $g(z) = \\prod(z - x_{k})^{\\alpha_{k}-1} = z^{-2}\\,(1 + O(1/z))$（用了指数和 $-2$）。于是 $\\varphi(z) \\to A \\ne 0$（$A$ 是某个非零常数），$\\varphi$ 在 $\\infty$ 有可去奇点。\n\n于是 $\\varphi$ 与 $1/\\varphi$ 都是整函数且在 $\\infty$ 有界，由 Liouville 定理 $\\varphi \\equiv A$。积分得\n\n$$f(z) = A\\int_{z_{0}}^{z} g(\\zeta)\\,\\mathrm{d}\\zeta + B.$$\n\n这就证明了公式的**形式**（这一半完整）。\n\n**第二部分：存在性（未完成；(ii) 已补完整，仍缺 (i)(iii)）**\n\n反过来给定多边形与 $x_{k}$，令 $F(z) = A\\int^{z}_{z_{0}} g(\\zeta)\\,\\mathrm{d}\\zeta + B$。已知：\n\n- $F\' = A g$ 在 $\\mathbb{H}$ 上无零点，故 $F$ 是局部共形的；\n\n- 在每个区间 $(x_{k}, x_{k+1})$ 上 $\\arg g$ 是常值（因为 $(x - x_{k})$ 的辐角只取 $0$ 或 $\\pi$，符号由 $x > x_{k}$ 决定），故 $F$ 把每个区间映成一条直线段；走过 $x_{k}$ 时 $\\arg F\'$ 跳变 $\\pi(\\alpha_{k}-1)$，即内角为 $\\alpha_{k}\\pi$；\n\n- $g(\\zeta) = O(\\zeta^{-2})$，积分在 $\\pm\\infty$ 都收敛，$F$ 连续到 $\\partial\\mathbb{H}$ 的整个边界（含 $\\infty$）。\n\n⚠️ 存在性仍缺的部分（本图不写全，因此保留 skeleton）：\n\n（i）**边界曲线的简单性**：要证 $F(\\partial\\mathbb{H})$ 是简单闭折线（无自交）。仅凭「分段直线 + 内角正确」不够——同一组内角可以有自交的折线；标准证法要把多边形沿边反射、用 Schwarz 反射把 $F$ 解析延拓到拼接区域，再证延拓是单值的、逐块覆盖平面。\n\n（ii）**辐角原理收尾（完整）。** 设（i）已证：$J:=F(\\partial\\mathbb{H})$ 是简单闭曲线，$F$ 连续延拓到 $\\overline{\\mathbb{H}}$ 且在 $\\mathbb{H}$ 内局部共形（$F\'\\ne0$）。对 $w\\notin J$，$F-w$ 在 $\\partial\\mathbb{H}$ 上无零点。把 $F-w$ 在 $\\mathbb{H}$ 上的零点个数记为 $N(w)$（计重数）：用半径 $R$ 的上半圆盘挖出有界区域再令 $R\\to\\infty$，因 $F\'=O(1/z^2)$ 且 $F(z)\\to F(\\infty)\\in J$，大圆弧上的积分趋于 $0$，故辐角原理给出 $N(w)=\\frac{1}{2\\pi i}\\int_{\\partial\\mathbb{H}}\\frac{F\'(z)}{F(z)-w}\\,\\mathrm{d}z=n(J,w),$ 右端是 $J$ 绕 $w$ 的绕数。$N(w)\\ge0$ 是整数，而简单闭曲线满足 $n(J,w)\\in\\{-1,0,1\\}$；若 $J$ 取负向，则 $J$ 内部每点的绕数为 $-1$，与 $N(w)\\ge0$ 矛盾。故 $J$ 正向，且 $N(w)=\\begin{cases}1,&w\\in\\operatorname{Int}(J),\\\\0,&w\\in\\operatorname{Ext}(J).\\end{cases}$ 于是 $F(\\mathbb{H})\\subseteq\\operatorname{Int}(J)=P$，且每个 $w\\in P$ 恰有一个原像（$F\'\\ne0$ 保证零点单重）。所以 $F:\\mathbb{H}\\to P$ 是双射；又 $F\'\\ne0$，它是双全纯。（在（i）成立的前提下，此步完整。）\n\n（iii）**参数/边长匹配**：即便（i）（ii）证得 $F$ 单叶，$F$ 映出的多边形仍由积分决定 —— 其边长是 $x_{k}$ 的函数，一般**不等于**给定多边形的边长（同一组内角可以对应无穷多个形状）。要得到题设的**那一个**多边形，还须解 $n-3$ 个实方程（$x_{k}$ 的 Möbius 自由度）：证明边长映射取遍所有可能的形状。标准做法是连续性方法/度理论（或先由 Riemann 映射定理取到某个多边形，再用形式唯一性反推 $x_{k}$）。本图没有这条连续性论证的节点；`thm.riemann-mapping` 已完整，但 `thm.boundary-correspondence` 本身仍是 skeleton。\n\n（i）仍缺（需沿边反射/Schwarz 反射拼接），（iii）仍缺（需连续性方法/度理论）；（ii）已在本注独立补完。存在性所需的输入分三类，它们与 (i)(ii)(iii) 并非一一对应：**A** 是边界对应的外部输入（供 `thm.boundary-correspondence` 型命题使用），**不能推出（i）**；**B** 是（ii）的内部收尾（本注已证，不依赖外部引理）；**C** 是（iii）的外部输入。下面分别列出。\n\n**A（外部输入，服务边界对应，不推出（i））**：Carathéodory–Osgood——Jordan 区域到单位圆盘的共形映射连续延拓为闭包同胚。本批单列为 `lem.caratheodory-osgood`（仍 skeleton：定理拆成 Carathéodory 连续延拓与 Osgood 边界单射两条外部定理，本图未证）。多边形是 Jordan 区域，故它给出 $F$ 的闭包连续延拓与边界上的单射；但它**不**说明 $F(\\partial\\mathbb{H})$ 无自交——那正是（i），需要沿边反射/Schwarz 反射拼接另行证明。\n\n**B（（ii）的内部完成，不是外部引理）**：设 $F$ 在 $\\mathbb{H}$ 内局部共形、连续到 $\\partial\\mathbb{H}$；若 $F(\\partial\\mathbb{H})$ 是简单闭曲线、$F(\\mathbb{H})$ 落在其内部，且对该内部的每个 $w$，$F(\\partial\\mathbb{H})$ 绕 $w$ 的绕数为 $1$，则 $F$ 单叶。它的内容就是本注第（ii）小节的辐角原理证明（在上半平面挖去大圆弧、用 $F\'=O(1/z^2)$ 控制无穷远），已在上面完整写出；它只完成（ii），不负责（i）（iii），也不作为独立的外部引理。\n\n**C（外部输入，服务（iii））**：参数-边长匹配。内角（即 $x_k$）已定后，积分映出的多边形边长随之确定，一般不等于题设多边形的边长（同一组内角可对应无穷多个形状）；要得到题设的那个多边形，须再解 $n-3$ 个实方程（$x_k$ 的 Möbius 自由度），标准做法是连续性方法或度理论（证明边长映射取遍所有正边长组合）。本图没有这条引理的节点，也没有写证明。\n\n**为什么是这些指数**：沿实轴走过 $x_{k}$ 时，$\\arg f\'$ 跳变 $\\pi(\\alpha_{k} - 1)$，恰好把切向转过去 $\\pi - \\alpha_{k}\\pi$ —— 正是外角。\n\n⭐ **它是「造映射」的工业级工具**：机翼、渠道、电容器这些工程问题都归结为「先把区域近似成多边形，再用 S–C 公式搬到半平面」——搬到半平面之后 Laplace 方程的解就有现成的形式（Poisson 积分，`thm.poisson-formula`）。\n\n⚠️ **三个参数定不下来**：$x_{k}$ 里可以任选三个（分式线性变换的自由度），$A, B$ 由多边形的位置与大小定 —— 实际计算就是解这几个方程。',
      refs: [
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 §2 · Schwarz–Christoffel formula',
        'Driscoll–Trefethen, Schwarz–Christoffel Mapping, Cambridge, Ch. 1–2',
        'Nehari, Conformal Mapping, Ch. VI · Polygon mappings',
        '王晓光《复变函数》· 共形映射（多边形区域）',
      ]
    },
    {
      id: 'prop.joukowski',
      type: 'proposition',
      label: 'Joukowski 映射',
      title: 'Joukowski 映射：机翼剖面的来历',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', 'Joukowski', '共形映射', '机翼'],
      statement: [
        '**Joukowski 映射** $w = \\dfrac{1}{2}\\left(z + \\dfrac{1}{z}\\right)$ 把',
        '',
        '1. 单位圆 $|z| = 1$ 映成线段 $[-1, 1]$（二重覆盖）；',
        '2. $|z| = r > 1$ 映成以 $\\pm 1$ 为焦点的椭圆；',
        '3. $\\mathbb{D}$ 的外部映成 $\\mathbb{C} \\setminus [-1, 1]$；',
        '4. 过 $z = 1$ 的圆（圆心稍偏）映成**机翼剖面**（Joukowski 翼型）。',
      ].join('\n'),
      notes: [
        '**为什么**：$w = \\tfrac12(z + 1/z)$ 把 $z = r e^{i\\theta}$ 送到',
        '',
        '$$u = \\tfrac12\\left(r + \\tfrac1r\\right)\\cos\\theta,\\qquad ' +
          'v = \\tfrac12\\left(r - \\tfrac1r\\right)\\sin\\theta,$$',
        '',
        '这正是椭圆的参数方程（半轴 $\\tfrac12(r \\pm 1/r)$）。$r \\to 1$ 时短轴趋于 $0$，' +
        '椭圆退化成线段。∎',
        '',
        '⭐ **为什么它在空气动力学里出名**：保角映射把「绕机翼的流动」搬到「绕圆的流动」，' +
        '而绕圆的流动有现成公式；再由 `thm.riemann-mapping` 保证这种搬运不改变' +
        '「无旋、不可压、无粘」这些结构（Laplace 方程在共形映射下不变）。',
        '',
        '⚠️ $w = \\tfrac12(z + 1/z)$ **不是单叶**：$z$ 与 $1/z$ 给同一个 $w$。' +
          '要得到双全纯，必须限制在 $\\mathbb{D}$ 或 $\\mathbb{D}$ 的外部（含 $\\infty$）。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 共形映射的例子',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 · Conformal Mapping',
      ],
    },
    {
      id: 'thm.boundary-correspondence',
      type: 'theorem',
      status: 'skeleton',
      label: '边界对应定理',
      title: '边界对应：Jordan 区域的共形映射能延拓到边界',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '边界对应', 'Jordan 曲线', 'Riemann 映射'],
      statement: [
        '设 $\\Omega \\subset \\mathbb{C}$ 是**单连通**区域，且边界 $\\partial\\Omega$ 是一条' +
          '**Jordan 曲线**（简单闭曲线）。则 `thm.riemann-mapping` 给出的双全纯',
        '',
        '$$f : \\Omega \\longrightarrow \\mathbb{D}$$',
        '',
        '可以连续延拓到闭包 $\\overline{\\Omega}$，且延拓后的 $f : \\overline{\\Omega} \\to ' +
          '\\overline{\\mathbb{D}}$ 是**同胚**，把边界同胚地映到单位圆周。',
      ].join('\n'),
      notes: '**这条命题就是 Carathéodory–Osgood 边界对应定理**（Jordan 区域版）：Riemann 映射的内部双全纯（`thm.riemann-mapping`，已补完整证明）自动延拓到闭包并给出同胚。它不是 Riemann 映射定理的推论——内部双全纯完全不管边界行为，Jordan 条件是本质的。\n\n**能独立验证的一半：延拓加边界单射，则同胚。** 设 $f:\\Omega\\to\\mathbb{D}$ 已连续延拓到 $\\overline{\\Omega}$，且在 $\\partial\\Omega$ 上单射。则：\n\n① $f(\\partial\\Omega)\\cap\\mathbb{D}=\\emptyset$。否则有 $\\zeta\\in\\partial\\Omega$ 使 $w=f(\\zeta)\\in\\mathbb{D}=f(\\Omega)$；取逆映射 $g=f^{-1}:\\mathbb{D}\\to\\Omega$（$f$ 内部双全纯，故 $g$ 全纯）。让 $z\\to\\zeta$（$z\\in\\Omega$）时 $f(z)\\to f(\\zeta)=w$，由 $g$ 在 $w$ 连续得 $g(w)=\\zeta$；但 $g(w)\\in\\Omega$，而 $\\zeta\\in\\partial\\Omega$，矛盾。注意这一步**不需要**边界单射，只需要延拓存在。\n\n② 于是 $f(\\overline{\\Omega})=f(\\Omega)\\cup f(\\partial\\Omega)\\subseteq\\mathbb{D}\\cup\\partial\\mathbb{D}=\\overline{\\mathbb{D}}$，且包含 $\\mathbb{D}$；$\\overline{\\Omega}$ 紧、$\\overline{\\mathbb{D}}$ Hausdorff，连续双射从紧空间到 Hausdorff 空间自动是同胚。（子引理）□\n\n**缺口（已精确到一条定理）：Carathéodory–Osgood 定理。** 设 $\\Omega$ 是 Jordan 区域（$\\partial\\Omega$ 是 Jordan 曲线），$f:\\Omega\\to\\mathbb{D}$ 是 Riemann 映射。则：(a) $f$ 连续延拓到 $\\overline{\\Omega}$（Carathéodory 1913）；(b) 延拓在 $\\partial\\Omega$ 上单射（Osgood 1900 / Carathéodory）。两条都不可省：只有 (a) 时边界可能把两个点粘在一起；只有「单连通」而没有 Jordan 条件时 (a) 也可能不成立：有界梳状区域（在单位圆盘内挖去无穷多条从边界伸入、在边界上累积的细缝）单连通但边界不局部连通，其 Riemann 映射不连续延拓；无界时即使边界局部连通也会失败（沿负实轴剪开的平面：平方根在剪缝两侧趋向不同的纯虚值，不连续延拓）。\n\n**为什么本图补不了。** (a) 的标准证明要用 crosscut / prime end（Carathéodory 拓扑），或境界的局部连通性加调和测度；(b) 要用 Jordan 曲线定理与 crosscut 论证。本图**没有** Carathéodory、crosscut、prime end、Jordan 曲线定理的节点；`thm.schwarz-reflection` 只处理解析弧（圆、直线）的反射，不能覆盖一般 Jordan 曲线。**多边形区域**是例外：此时 (a)(b) 可用 Schwarz 反射逐边拼接证明；但 SC 的注也只给策略、本图未证（`thm.schwarz-christoffel` 仍 skeleton），所以这里不把它当作已证步骤。况且那只覆盖折线边界，不是本条的一般情形。因此本条保持 `status: \'skeleton\'`，缺口就是这一条定理。\n\n**⭐ 用途。** 它给 Schwarz–Christoffel（`thm.schwarz-christoffel`，仍 skeleton）的「实轴上的 $x_{k}$ 对应多边形顶点」提供合法性。\n\n**📌 记号与入边。** 入边（原无显式 id，靠 `src/core/graph.js` 自动分配 `e102.implication`）只记录了「径向极限、连续、同胚」的路线；其中第一步「径向极限存在」正是 Carathéodory 定理，不是初等估计——不要把它当作已证。',
      refs: [
        '王晓光《复变函数》· 边界对应（介绍）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 · Conformal Mapping（boundary correspondence）',
        'Pommerenke, Boundary Behaviour of Conformal Maps, Ch. 2',
      ],
    },
    {
      id: 'lem.caratheodory-osgood',
      cluster: 'analysis.mapping',
      type: 'lemma',
      label: 'Carathéodory–Osgood 边界对应',
      title: 'Carathéodory–Osgood 定理：Jordan 区域的共形映射连续延拓为闭包同胚',
      regions: ['complex'],
      tags: ['复分析', '共形映射', '边界对应', 'Jordan 曲线'],
      status: 'skeleton',
      statement: [
        '设 $\\Omega\\subset\\mathbb{C}$ 是单连通区域（真子集），且 $\\partial\\Omega$ 是一条 Jordan 曲线。则 Riemann 映射 $f:\\Omega\\to\\mathbb{D}$（在相差 $\\mathbb{D}$ 的 Möbius 变换的意义下唯一）连续延拓为闭包的同胚',
        '',
        '$$\\bar f:\\overline{\\Omega}\\longrightarrow\\overline{\\mathbb{D}},$$',
        '',
        '特别地 $f|_{\\partial\\Omega}:\\partial\\Omega\\to\\partial\\mathbb{D}=\\mathbb{S}^{1}$ 是同胚。这就是 Carathéodory–Osgood 定理，也是 Schwarz–Christoffel 存在性中 (i) 的外部输入。',
      ].join('\n\n'),
      notes: '⚠️ **本节点仍标 skeleton**：定理是两条经典外部定理的合成（Carathéodory 连续延拓 + Osgood 边界单射）。本注把可独立验证的部分写全，并把外部定理陈述到位；它们的证明不在本图，因此不勾完成符号、不删 status。本节点是 `thm.boundary-correspondence`（仍 skeleton）与 `thm.schwarz-christoffel` 存在性 (i) 的共同上游。\n\n**记号与目标**：$\\Omega\\subset\\mathbb{C}$ 单连通真区域，$\\partial\\Omega$ 为 Jordan 曲线；$f:\\Omega\\to\\mathbb{D}$ 为 Riemann 映射（存在性见 `thm.riemann-mapping`）。要证延拓 $\\bar f:\\\\overline{\\\\Omega}\\\\to\\\\overline{\\\\mathbb{D}}$ 是同胚。\n\n**第一步（外部定理 A：连续延拓，Carathéodory 1913）**：若 $\\Omega$ 单连通且 $\\partial\\Omega$ 局部连通，则 $f$ 连续延拓到 $\\overline{\\Omega}$。Jordan 曲线是局部连通的连续统，故 A 适用；$\\Omega$ 有界由 $\\partial\\Omega$ 紧性给出。标准证明走 crosscut / prime end（或调和测度），本图无这些节点，A 按外部定理引用。\n\n**第二步（可独立验证：延拓自动给出满射）**：假设 A 已成立。先证边界值模长 1：若 $\\zeta\\in\\partial\\Omega$ 而 $|\\bar f(\\zeta)|<1$，令 $w=\\bar f(\\zeta)\\in\\mathbb{D}=f(\\Omega)$，取逆映射 $g=f^{-1}:\\mathbb{D}\\to\\Omega$（内部双全纯，故连续）；$z_n\\in\\Omega$、$z_n\\to\\zeta$ 时 $f(z_n)\\to w$，故 $g(f(z_n))\\to g(w)\\in\\Omega$；但 $g(f(z_n))=z_n\\to\\zeta\\in\\partial\\Omega$，与极限唯一性矛盾。故 $|\\bar f(\\zeta)|=1$。于是 $\\bar f(\\overline{\\Omega})\\subseteq\\overline{\\mathbb{D}}$；又 $\\overline{\\Omega}$ 紧、$\\bar f$ 连续，像紧因而闭，且包含 $f(\\Omega)=\\mathbb{D}$，故包含 $\\overline{\\mathbb{D}}$。因此 $\\bar f(\\overline{\\Omega})=\\overline{\\mathbb{D}}$，且 $\\bar f(\\partial\\Omega)=\\mathbb{S}^{1}$。这一步不需要 B。（此步证毕。）\n\n**第三步（外部定理 B：边界单射，Osgood 1900）**：在 A 的条件下，$\\bar f|_{\\partial\\Omega}$ 单射。等价地，$f^{-1}$ 也连续延拓到 $\\mathbb{D}$。标准证明用 Jordan 曲线定理加 crosscut（$\\Omega$ 内连接边界两点的弧）或 prime end（素端）理论：若两个不同边界点有同一像，两条边界弧的像在 $\\mathbb{S}^{1}$ 上给出绕数矛盾（或某个素端对应两个边界点）。本图无 Jordan 曲线定理、crosscut、prime end 节点，B 按外部定理引用。\n\n**第四步（初等收尾，完整但条件于 A、B）**：在 A、B 下，$\\bar f$ 是紧空间到 Hausdorff 空间的连续双射，故为同胚；$f|_{\\partial\\Omega}$ 亦然。注意这一步不是定理的独立证明，它把问题精确地归约为 A 与 B。\n\n**为什么两个条件都不可省**：\n\n对 A：假设是有界单连通 + 边界局部连通，两者都必要。有界性：沿负实轴剪开的平面无界、边界是射线（局部连通），但平方根在剪缝两侧趋向不同纯虚值，延拓不连续。局部连通性：梳状区域（单位圆盘内挖去无穷多条从边界伸入、在边界上累积的细缝）有界单连通，但边界不局部连通，Riemann 映射不连续延拓。\n\n对 B：若 $\\partial\\Omega$ 局部连通但不是 Jordan 曲线（例如 slit disk：单位圆盘挖去半径 $[0,1)$），A 仍给出连续延拓；若延拓还在边界上单射，则紧边界到 $\\mathbb{S}^{1}$ 的连续单射是同胚，迫使 $\\partial\\Omega$ 同胚于 $\\mathbb{S}^{1}$，与 slit disk 的边界（圆加一条弦）矛盾。所以 B 的 Jordan 条件本质。\n\n**与下游的关系**：本定理直接给出 `thm.boundary-correspondence` 的全部内容（那条只是本定理的 Jordan 区域版）；对 `thm.schwarz-christoffel`，它提供存在性 (i)（内部共形 + 边界同胚），但不提供 (iii) 参数-边长匹配。`thm.classification-surfaces` 与 `thm.rado` 不依赖本节点。\n\n**本图缺什么**：Jordan 曲线定理、crosscut、prime end（素端）、局部连通连续统的边界理论，均无独立节点。`thm.riemann-mapping` 只管内部；`thm.schwarz-reflection` 只对已知解析弧（圆、直线）反射，这里不知道 $f$ 把边界弧映到哪里；`thm.poisson-formula` 需要先有边界值。因此本节点保留 skeleton；要闭合，需先立 Jordan 曲线定理节点，再立 Carathéodory 延拓 / prime end 节点（或直接引外部定理并注明不可由本图推出）。\n\n**📌 用法**：凡是要把「内部共形」推到「闭包同胚」的命题都应引用本节点，而不是直接引用 `thm.riemann-mapping`——后者只保证内部双全纯。引用时必须同时声明依赖外部定理 A、B，不能当作本图已证。',
      refs: [
        'Carathéodory, Über die Begrenzung einfach zusammenhängender Gebiete, Math. Ann. 73 (1913), 323–370',
        'Pommerenke, Boundary Behaviour of Conformal Maps, Springer 1992, Ch. 2',
        'Collingwood–Lohwater, The Theory of Cluster Sets, Cambridge 1966, Ch. 2',
        'Ahlfors, Conformal Invariants, McGraw–Hill 1973, Ch. 6',
      ],
    },
    {
      id: 'def.prime-end',
      cluster: 'analysis.mapping',
      type: 'definition',
      label: '素端',
      title: '素端（prime end）与 Carathéodory 紧化',
      regions: ['analysis'],
      tags: ['定义', '复分析', '共形映射', '素端', '边界对应'],
      statement: '设 $\\Omega\\subset\\mathbb{C}$ 是单连通真区域。$\\Omega$ 中的**横截弧**是端点落在 $\\partial\\Omega$ 上、内部含于 $\\Omega$ 的简单弧。横截弧把 $\\Omega$ 分成两个区域；按包含关系取这些区域的极限，得到 $\\Omega$ 的**素端**（prime end）的等价类。素端集合记 $\\partial_{p}\\Omega$，配以自然的极限拓扑（Carathéodory 紧化），使 $\\overline{\\Omega}^{p}=\\Omega\\cup\\partial_{p}\\Omega$ 紧。',
      notes: '**Jordan 区域的情形**：若 $\\partial\\Omega$ 是 Jordan 曲线，则素端与边界点一一对应，Carathéodory 紧化就是通常的闭包；这正是 `thm.boundary-correspondence` 所讨论的边界对应。\n\n**一般区域**：素端可能对应多个边界点（例如梳状区域的尖端），也可能一个边界点对应多个素端；素端是「从内部看边界」的精细对象。\n\n**Carathéodory 定理**：Riemann 映射 $f:\\Omega\\to\\mathbb{D}$ 连续延拓为 $\\overline{\\Omega}^{p}\\to\\overline{\\mathbb{D}}$ 的同胚（见 `thm.riemann-mapping`、`thm.boundary-correspondence`）。\n\n⚠ 本图无 Jordan 曲线定理与横截弧节点；此节点只给定义与用途，不含定理证明。',
      refs: ['Carathéodory, Conformal Representation, Ch. II · prime ends', 'Pommerenke, Boundary Behaviour of Conformal Maps, Ch. 2 · prime ends'],
    },
  ],

  edges: [
    { id: 'dep.prime-simply', kind: 'definition', definition: 'def.simply-connected', usedBy: 'def.prime-end',
      note: '素端定义在单连通区域上。' },
    { id: 'dep.prime-riemann', kind: 'definition', definition: 'thm.riemann-mapping', usedBy: 'def.prime-end',
      note: 'Riemann 映射延拓到素端紧化。' },
    { id: 'dep.prime-boundary', kind: 'definition', definition: 'thm.boundary-correspondence', usedBy: 'def.prime-end',
      note: 'Jordan 区域的素端对应就是边界对应。' },
    { kind: 'implication', sources: ['def.mobius'], target: 'def.cross-ratio',
      title: '分式线性变换给出交比这个不变量',
      proof: [
        '由 `def.mobius`，分式线性变换是 $z \\mapsto (az+b)/(cz+d)$。对四个点直接算差：',
        '',
        '$$Tz_{i} - Tz_{j} = \\frac{(ad - bc)(z_{i} - z_{j})}{(cz_{i} + d)(cz_{j} + d)}.$$',
        '',
        '把它代进交比 $(Tz_{1}, Tz_{2}; Tz_{3}, Tz_{4})$，分子分母里的 $(ad-bc)$ 与' +
          '四个 $(cz_{k} + d)$ 逐对抵消，剩下的正是 $(z_{1}, z_{2}; z_{3}, z_{4})$。∎',
      ].join('\n'),
      note: '交比之所以值得定义，就是因为它是 $\\operatorname{PGL}(2,\\mathbb{C})$ 下唯一的不变量。' },

    { kind: 'implication', sources: ['def.cross-ratio', 'prop.mobius-three-points'],
      target: 'prop.cross-ratio-real',
      title: '把三点送到 $0,1,\\infty$，第四点的像就是交比',
      proof: [
        '由 `prop.mobius-three-points`，取唯一的分式线性变换 $T$ 使 ' +
          '$Tz_{1} = 0$、$Tz_{2} = 1$、$Tz_{3} = \\infty$。',
        '',
        '由交比的不变性（`def.cross-ratio`），$(z_{1}, z_{2}; z_{3}, z_{4}) = ' +
          '(0, 1; \\infty, Tz_{4}) = Tz_{4}$。',
        '',
        '于是「交比为实」$\\iff$「$Tz_{4}$ 在实轴上」$\\iff$「$z_{4} \\in T^{-1}(\\mathbb{R})$」。' +
          '而 $T^{-1}(\\mathbb{R})$ 是一条直线或一个圆（`prop.mobius-circle`），' +
          '它经过 $z_{1}, z_{2}, z_{3}$，所以四点在同一个圆或直线上。∎',
      ].join('\n'),
      note: '把「共圆」翻译成「一个复数是不是实数」——这是复数几何的基本动作。' },

    { kind: 'implication', sources: ['def.cross-ratio'], target: 'prop.mobius-three-points',
      title: '让交比相等，就解出了唯一的三点映射',
      proof: [
        '设 $T$ 满足要求。由交比不变性，对任意 $z$',
        '',
        '$$(z, z_{1}; z_{2}, z_{3}) = (Tz, w_{1}; w_{2}, w_{3}).$$',
        '',
        '左端是 $z$ 的已知一次分式，右端是 $w = Tz$ 的一次分式。把右端当方程解出 $w$，' +
          '得到的分式定义了 $T$（存在性）。',
        '',
        '唯一性：若 $T_{1}, T_{2}$ 都行，则 $S = T_{1}^{-1}T_{2}$ 固定 $z_{1}, z_{2}, z_{3}$；' +
          '但 $Sz$ 与 $z$ 对同样三点有相同交比，故 $Sz = z$，即 $S$ 是恒等。∎',
      ].join('\n'),
      note: '「三点定变换」既给出存在性，也给了算法。' },

    { kind: 'implication', sources: ['prop.cross-ratio-real', 'def.mobius'], target: 'prop.mobius-circle',
      title: '保圆性 = 共圆判据 + 交比不变',
      proof: [
        '设 $C$ 是圆或直线，$T$ 是分式线性变换。取 $C$ 上四个互异点 $z_{1}, \\ldots, z_{4}$，' +
          '由 `prop.cross-ratio-real` 它们的交比是实数。',
        '',
        '由 `def.cross-ratio` 的不变性，$(Tz_{1}, \\ldots; Tz_{4})$ 仍是实数，' +
          '再用一次 `prop.cross-ratio-real`：$Tz_{1}, \\ldots, Tz_{4}$ 共圆或共线。' +
          '四点定一个圆/线，故 $T(C)$ 仍是一个圆或直线。∎',
      ].join('\n'),
      note: '「保圆」这条在扩充平面里只有一句话：直线也算圆。' },

    { kind: 'implication', sources: ['def.mobius', 'prop.conformal-iff'], target: 'def.symmetric-point',
      title: '对称点是反演：$z^{*} = a + R^{2}/\\overline{(z - a)}$',
      proof: [
        '由 `def.mobius`，$z \\mapsto a + R^{2}/\\overline{(z - a)}$ 是「平移 + 反演 + 伸缩」的复合，' +
          '其中 $z \\mapsto 1/\\bar z$ 是共轭再取倒数，属于反全纯的分式映射。',
        '',
        '**保角性的对照**：`prop.conformal-iff` 说全纯 + 导数非零 = 保角且保定向；' +
          '而反演是**反全纯**的，保角但**反定向**。对称点正是在这个反全纯映射下与 $z$ 配对，' +
          '所以「关于圆对称」与「关于直线镜像」是同一件事的两种外观（直线 = 过 $\\infty$ 的圆）。',
        '',
        '**验算**：$|z - a|\\,|z^{*} - a| = |z - a| \\cdot R^{2}/|z - a| = R^{2}$，' +
          '且 $z^{*} - a$ 与 $z - a$ 同向（因为取了共轭再取倒数只改模长不改方向）。∎',
      ].join('\n'),
      note: '对称 $\\ne$ 到圆心等距；对称是反演，距离的**乘积**固定。' },

    { kind: 'implication', sources: ['def.symmetric-point', 'prop.conformal-iff'], target: 'prop.mobius-symmetry',
      title: '共形（保角）保持「正交圆」的刻画',
      proof: [
        '由 `def.symmetric-point` 的等价刻画：$z, z^{*}$ 关于 $C$ 对称 $\\iff$ 每个过它们的圆正交于 $C$。',
        '',
        '分式线性变换双全纯、导数非零，由 `prop.conformal-iff` 保角，故「正交」被保持；' +
          '同时它把「过 $z, z^{*}$ 的圆」映成「过 $Tz, Tz^{*}$ 的圆」，把 $C$ 映成 $T(C)$。' +
          '于是同一个刻画对 $Tz, Tz^{*}$ 与 $T(C)$ 成立。∎',
      ].join('\n'),
      note: '造映射时最好用的一条：定几对对称点，变换就被逼出来了。' },

    { kind: 'implication', sources: ['def.mobius'], target: 'prop.mobius-group',
      title: '矩阵乘法 = 复合，纯量倍数 = 同一个变换',
      proof: [
        '分式线性变换与矩阵 $\\begin{pmatrix} a & b\\\\ c & d\\end{pmatrix}$ 一一对应到纯量倍数：' +
          '若 $(a,b,c,d) = \\lambda(a\',b\',c\',d\')$，两边的分式恒等。',
        '',
        '**复合对应乘法**：直接代入 $T_{1}(T_{2}(z))$ 得到的分式，其系数矩阵正是两个矩阵之积。' +
          '**逆**：逆变换的矩阵是逆矩阵（差一个行列式纯量）。故 $\\operatorname{PGL}(2,\\mathbb{C})$ 成群。',
        '',
        '**自同构只有这些**：若 $\\varphi$ 是 $\\widehat{\\mathbb{C}}$ 的双全纯自同构且 ' +
          '$\\varphi(\\infty) = \\infty$，则 $\\varphi$ 是整函数且单射，由 Liouville 型论证' +
          '（`thm.liouville`）知它是 $az + b$；一般情形先复合 $z \\mapsto 1/(z - z_{0})$ 归结之。∎',
      ].join('\n'),
      note: '群结构解释了「三点定变换」：等号左边的群在扩充平面上是 3-可迁的。' },

    { kind: 'implication', sources: ['def.mobius', 'prop.mobius-circle'], target: 'prop.standard-maps',
      title: '用保圆性与幂/指数把区域搬到标准位置',
      proof: [
        '逐条来自 `def.mobius`（分式线性）与 `def.complex-elementary`（幂、指数、对数）：',
        '',
        '1. $z \\mapsto (z - i)/(z + i)$ 把实轴送到单位圆（实轴是过 $\\infty$ 的圆，' +
          '由 `prop.mobius-circle` 其像仍是圆；代 $z = \\infty$ 得 $1$，代 $z = i$ 得 $0$，故像是以 $0$ 为心的圆），' +
          '且 $z = i$ 落在内部，所以 $\\mathbb{H}$ 落在圆盘里；',
        '2. $z^{\\pi/\\alpha}$ 把辐角放大 $\\pi/\\alpha$ 倍，角域张成半平面；',
        '3. $e^{z}$ 把 $0 < \\operatorname{Im} z < \\pi$ 映成上半平面（模与辐角的取值范围一算即得）；',
        '4/5. 对数、平方根是幂/指数的反函数（`prop.exp-local-inverse`），自同构公式由' +
          '$a \\mapsto 0$ 的共轭算出。∎',
      ].join('\n'),
      note: '这一张表是「共形映射」这一章的实用核心。' },

    { kind: 'implication', sources: ['def.mobius', 'prop.mobius-group'], target: 'prop.mobius-classification',
      title: '共轭到不动点上，读特征值的比',
      proof: [
        '**第一步：共轭。** 分式线性变换 $T$ 的不动点是二次方程 $cz^{2} + (d - a)z - b = 0$ 的根，' +
          '所以有 0、1 或 2 个（重根时算一个）。',
        '',
        '**第二步：标准形。** 若有两个不动点 $p, q$，取分式线性变换 $S$ 把 $p, q$ 送到 $0, \\infty$，' +
          '则 $S T S^{-1}$ 固定 $0$ 与 $\\infty$，只能是 $w \\mapsto \\lambda w$。' +
          '这时看 $|\\lambda|$ 是 $1$、$> 1$ 还是其它，就分出椭圆/双曲。',
        '',
        '**第三步：$\\lambda$ 从哪来。** $T$ 对应的矩阵有特征值 $\\lambda_{1}, \\lambda_{2}$，' +
          '而 $\\lambda = \\lambda_{1}/\\lambda_{2}$。于是',
        '',
        '$$\\frac{\\tau^{2}}{\\Delta} = \\frac{(\\lambda_{1} + \\lambda_{2})^{2}}' +
          '{\\lambda_{1}\\lambda_{2}} = \\lambda + \\frac{1}{\\lambda} + 2,$$',
        '',
        '这是 $\\lambda$ 的函数，因此按它分类与按 $\\lambda$ 分类等价。重根（$\\lambda = 1$）给抛物型，' +
          '此时标准形是平移 $w \\mapsto w + 1$。∎',
      ].join('\n'),
      note: '代数分类（迹的平方除以行列式）与几何分类（在双曲平面里怎么动）在这里对上。' },

    { kind: 'implication', sources: ['prop.standard-maps', 'thm.schwarz-reflection'],
      target: 'thm.schwarz-christoffel',
      title: '$f\'$ 的形状由「沿边反射」定出来',
      proof: [
        '**指数从哪来**：设 $f$ 把 $\\mathbb{H}$ 映成多边形。沿第 $k$ 段边做 Schwarz 反射' +
          '（`thm.schwarz-reflection`），可把 $f$ 越过实轴解析延拓；在 $x_{k}$ 处两侧的' +
          '延拓相差一个旋转，转角恰是外角 $\\pi - \\alpha_{k}\\pi$。',
        '',
        '于是 $\\arg f\'$ 在 $x_{k}$ 有跳变 $\\pi(\\alpha_{k} - 1)$，而 $f\'$ 在 $\\mathbb{H}$ 内无零点，' +
          '故 $f\'$ 只能是 $A\\prod(\\zeta - x_{k})^{\\alpha_{k}-1}$ 乘以一个无零点的整函数倍。' +
          '再证那个因子为常数（增长与有界性），积分即得公式。',
        '',
        '**常数**：$A$ 管大小与旋转、$B$ 管平移；三个 $x_{k}$ 可自由指定（分式线性变换自由度）。∎',
      ].join('\n'),
      note: 'S–C 公式 = 反射原理 + 对 $f\'$ 的局部形状分析。' },

    { kind: 'implication', sources: ['def.mobius'], target: 'prop.joukowski',
      title: '$z + 1/z$ 把同心圆映成共焦椭圆',
      proof: [
        '由 `def.mobius` 的眼光看，$w = \\tfrac12(z + 1/z)$ 是 $z$ 与 $1/z$ 的对称组合：' +
          '它在 $z \\mapsto 1/z$（一个反演，见 `def.symmetric-point`）下不变。',
        '',
        '**参数计算**：令 $z = r e^{i\\theta}$，则',
        '',
        '$$u = \\tfrac12\\left(r + \\tfrac1r\\right)\\cos\\theta,\\quad ' +
          'v = \\tfrac12\\left(r - \\tfrac1r\\right)\\sin\\theta,$$',
        '',
        '即 $u^{2}/a^{2} + v^{2}/b^{2} = 1$，其中 $a = \\tfrac12(r + 1/r)$、$b = \\tfrac12|r - 1/r|$，' +
          '且 $a^{2} - b^{2} = 1$ —— 共焦椭圆，焦点 $\\pm 1$。$r \\to 1$ 时 $b \\to 0$，退化成线段。∎',
      ].join('\n'),
      note: '机翼剖面 = 一个过 $z=1$ 的圆在 Joukowski 映射下的像。' },

    { kind: 'implication', sources: ['thm.riemann-mapping', 'def.symmetric-point'],
      target: 'thm.boundary-correspondence',
      title: '内部双全纯 + Jordan 边界 $\\implies$ 延拓成闭包上的同胚',
      proof: [
        '（**骨架**，完整证明是 Carathéodory–Osgood 定理。）',
        '',
        '**第一步：径向极限存在**。对每个 $\\zeta \\in \\partial\\Omega$，证明 $f(r\\zeta)$ 当 ' +
          '$r \\to 1^{-}$ 时有极限 —— 用「$\\Omega$ 的边界是 Jordan 曲线」把区域夹在两条圆弧之间，' +
          '再用 Schwarz 引理型的估计控制振荡。',
        '',
        '**第二步：极限映射连续且单射**。两部分都靠 Jordan 曲线的分离性质：' +
          '若两个边界点映到同一点，则内部会出现「被挤压」的连通分支，与单叶性矛盾。',
        '',
        '**第三步：紧空间上的连续单射 = 同胚**。$\\overline{\\Omega}$ 紧、$\\overline{\\mathbb{D}}$ Hausdorff，' +
          '连续单射自动是同胚。',
      ].join('\n'),
      note: '它给 S–C 公式的「$x_{k}$ 对应顶点」提供了合法性。' },
    {
      id: 'dep.riemann-caratheodory',
      kind: 'implication',
      sources: ['thm.riemann-mapping'],
      target: 'lem.caratheodory-osgood',
      proof: '由 `thm.riemann-mapping` 得双全纯 $f:\\Omega\\to\\mathbb D$；Carathéodory–Osgood 进一步证 $f$ 连续延拓到 $\\partial\\Omega$ 且在其上单射，从而给出边界一一对应。内部双全纯由该定理提供，边界部分是本引理新证的，故本边是推出。∎',
      note: 'Carathéodory–Osgood 定理研究的正是 Riemann 映射 $f:\\Omega\\to\\mathbb{D}$ 的边界行为；`thm.riemann-mapping` 只保证内部双全纯，本引理补边界。',
    },

    {
      id: 'dep.sc-caratheodory',
      kind: 'definition',
      definition: 'lem.caratheodory-osgood',
      usedBy: 'thm.schwarz-christoffel',
      note: 'S–C 存在性的 (i)（多边形边界是 Jordan 曲线，共形映射连续延拓、边界点一一对应）由本引理提供；引用它而不是直接引用 `thm.riemann-mapping`。',
    },

    {
      id: 'dep.bc-caratheodory',
      kind: 'definition',
      definition: 'lem.caratheodory-osgood',
      usedBy: 'thm.boundary-correspondence',
      note: '`thm.boundary-correspondence` 的陈述就是本引理在 Jordan 区域上的形式；本引理把它拆成「连续延拓 + 边界单射」两条外部定理并给出同胚收尾。',
    },
  ],
});
