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
        '$$(z_{1}, z_{2}; z_{3}, z_{4}) \\in \\mathbb{R} \\iff ' +
          '\\text{四点共圆或共线}.$$',
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
          '而交比在分式线性变换下不变，故「共圆」这件事被保持 —— 于是圆（或直线）上的像仍在同一类里。' +
          '更具体地：$T$ 是三个平移/旋转/伸缩与 $z \\mapsto 1/z$ 的复合，前三种显然保圆，' +
          '$1/z$ 把圆 $|z - a| = r$ 送到圆（算一下 $w = 1/z$ 满足 $|1/w - a| = r$，' +
          '整理得 $|w - \\bar a/\\sigma|^{2} = r^{2}/\\sigma^{2}$ 型方程，仍是圆）。∎',
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
          '$z, z^{*}$ 关于 $C$ 对称 $\\iff$ 每个过 $z, z^{*}$ 的圆都与 $C$ 正交。' +
          '分式线性变换是共形的（`prop.conformal-iff`），**保角**，于是「正交」被保持；' +
          '又把「过 $z, z^{*}$ 的圆」映成「过 $Tz, Tz^{*}$ 的圆」，把 $C$ 映成 $T(C)$。' +
          '故 $Tz, Tz^{*}$ 关于 $T(C)$ 也满足同一刻画。∎',
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
      label: 'Schwarz–Christoffel 公式',
      title: 'Schwarz–Christoffel 公式：把上半平面映成多边形',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', 'Schwarz-Christoffel', '共形映射', '多边形'],
      statement: [
        '设多边形的内角为 $\\alpha_{1}\\pi, \\ldots, \\alpha_{n}\\pi$（$0 < \\alpha_{k} < 2$），' +
          '顶点按逆时针排列，对应实轴上的点 $x_{1} < x_{2} < \\cdots < x_{n}$。则',
        '',
        '$$f(z) = A\\int^{z}_{z_{0}} g(\\zeta)\\,\\mathrm{d}\\zeta + B,$$',
        '',
        '$$g(\\zeta) := \\prod_{k=1}^{n} (\\zeta - x_{k})^{\\alpha_{k} - 1}.$$',
        '',
        '把 $\\mathbb{H}$ 共形地映成该多边形内部，且 $f(x_{k})$ 是第 $k$ 个顶点。',
        '常数 $A, B$ 决定大小、旋转与位置。',
      ].join('\n'),
      notes: [
        '**为什么是这些指数**：$f\'(z) = A\\prod(\\zeta - x_{k})^{\\alpha_{k}-1}$ 在实轴上' +
          '$x_{k}$ 附近的行为决定了转角的度。沿着实轴走过 $x_{k}$ 时，$\\arg f\'$ 跳变' +
          '$\\pi(\\alpha_{k} - 1)$，恰好把切向转过去 $\\pi - \\alpha_{k}\\pi$ —— 正是外角。',
        '',
        '**证明骨架**：先证「若 $f$ 是把 $\\mathbb{H}$ 映成多边形的共形映射，则 $f\'$ 必有上述形式」' +
          '（用 Schwarz 反射原理 `thm.schwarz-reflection` 把 $f$ 越过每段边延拓，得到 $f\'$ ' +
          '在每个 $x_{k}$ 的局部形状），再证反方向的积分确实收敛并给出多边形。',
        '',
        '⭐ **它是「造映射」的工业级工具**：机翼、渠道、电容器这些工程问题都归结为' +
          '「先把区域近似成多边形，再用 S–C 公式搬到半平面」——搬到半平面之后 Laplace 方程的' +
          '解就有现成的形式（Poisson 积分，`thm.poisson-formula`）。',
        '',
        '⚠️ **三个参数定不下来**：$x_{k}$ 里可以任选三个（分式线性变换的自由度），' +
          '$A, B$ 由多边形的位置与大小定 —— 实际计算就是解这几个方程。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 共形映射（多边形区域）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 · Conformal Mapping（Schwarz–Christoffel）',
        'Driscoll–Trefethen, Schwarz–Christoffel Mapping, Cambridge, Ch. 1–2',
      ],
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
      notes: [
        '**它补的是 Riemann 映射定理没说的那半句**：Riemann 映射只保证内部双全纯，' +
          '不保证边界对应得好（区域边界可以有各种怪形状）。加上 Jordan 条件之后，' +
          '「边界点对边界点、一一对应、连续」才成立。',
        '',
        '⚠️ **证明是骨架**：完整证明（Carathéodory–Osgood）要先把 $\\overline{\\Omega}$ 与' +
          '$\\overline{\\mathbb{D}}$ 之间的「径向极限」造出来，再证它对每个边界点存在且一一。' +
          '本图给的是陈述与用途，不是逐行证明 —— 这一点如实标注。',
        '',
        '⭐ **它是 Schwarz–Christoffel（`thm.schwarz-christoffel`）的前提**：' +
          'S–C 公式说「实轴上的 $x_{k}$ 对应多边形顶点」，这句话的合法性正来自边界对应。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 边界对应（介绍）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 · Conformal Mapping（boundary correspondence）',
        'Pommerenke, Boundary Behaviour of Conformal Maps, Ch. 2',
      ],
    },
  ],

  edges: [
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
      note: '交比之所以值得定义，就是因为它是 $\operatorname{PGL}(2,\mathbb{C})$ 下唯一的不变量。' },

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
          '连续单射自动是同胚。∎',
      ].join('\n'),
      note: '它给 S–C 公式的「$x_{k}$ 对应顶点」提供了合法性。' },
  ],
});
