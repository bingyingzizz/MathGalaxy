/* ============================================================================
   内容包 · 复变函数（三）：按「复变函数知识结构 2022」那张手绘图补全

   图上每个框都要在这里有对应节点；图上每条箭头都要有一条边。
     黑边 = 建图的顺序（前提 $\to$ 结论）
     粉边 = layer:false 的「推论」：逻辑上真推得通，但不是「由前面得来」

   这一批补的是第二轮（130/134 两包）之后仍然空着的框：
     §A 初等超越函数：复数指数/三角、局部逆、单值支
     §B 绕数：积分表示、同伦不变性
     §C 零点与唯一性：零点的阶、唯一性定理、Casorati–Weierstrass
     §D 收敛与正规族：Weierstrass 收敛定理、Arzelà–Ascoli、Montel
     §E 单叶性：开映射定理、Riemann 映射定理、Poincaré 圆盘
     §F 拓扑应用：Brouwer、Borsuk–Ulam、火腿三明治

   ⚠️ 引用：王晓光《复变函数》给章节；标准记号与更完整证明另给 Ahlfors / Stein–Shakarchi。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '复变函数（三）· 知识结构补全',

  nodes: [
    /* ---------------------------------------------------------------- §A */
    {
      id: 'def.complex-elementary',
      type: 'definition',
      label: '复数初等函数',
      title: '复数初等超越函数（指数、三角、双曲）',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '初等函数', '指数函数', 'Euler 公式'],
      statement: [
        '对 $z = x + iy \\in \\mathbb{C}$，用**幂级数**定义',
        '',
        '$$e^{z} := \\sum_{n=0}^{\\infty} \\frac{z^{n}}{n!},$$',
        '',
        '$$\\cos z := \\frac{e^{iz} + e^{-iz}}{2},\\qquad \\sin z := \\frac{e^{iz} - e^{-iz}}{2i},$$',
        '',
        '并令 $\\cosh z := \\cos(iz)$、$\\sinh z := -i\\sin(iz)$。三个级数在全平面绝对收敛，' +
          '且 $e^{z} = e^{x}(\\cos y + i \\sin y)$、$e^{z + 2\\pi i} = e^{z}$。',
        '',
        '对 $\\alpha \\in \\mathbb{C}$ 与分支选定好的 $\\operatorname{Log} z$（见 `def.logarithm-branch`），' +
          '再定义幂 $z^{\\alpha} := e^{\\alpha \\operatorname{Log} z}$。',
      ].join('\n'),
      notes: [
        '**为什么这样定义**：实指数函数是 $\\sum x^{n}/n!$，而幂级数在复平面上照样收敛 —— ' +
          '把 $x$ 换成 $z$ 就够了，不需要新的公理。三角函数的定义也一样：$e^{iz}$ 与 $e^{-iz}$ 一凑就是欧氏公式。',
        '',
        '**全纯性**：幂级数在收敛圆内可以逐项求导，而这三个级数的收敛半径是 $\\infty$，' +
          '所以它们在 $\\mathbb{C}$ 上全纯，并且 $(e^{z})\' = e^{z}$、$(\\sin z)\' = \\cos z$、$(\\cos z)\' = -\\sin z$。',
        '',
        '⭐ **Euler 公式** $e^{iy} = \\cos y + i\\sin y$ 是这套定义的直接产物：' +
          '$e^{z} = e^{x}e^{iy}$ 把「模长 $e^{x}$」和「辐角 $y$」分开了。',
        '',
        '⚠️ **与实函数的区别**：$|e^{z}| = e^{x}$ 只依赖实部，所以 $e^{z}$ 在 $\\mathbb{C}$ 上**取不到** $0$；' +
          '$\\sin z$、$\\cos z$ 在复平面上**无界**（$|\\sin(iy)| \\to \\infty$），这与实轴上 $|\\sin| \\le 1$ 不冲突 —— ' +
          '实轴上的有界性不是全纯函数的一般性质。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 初等解析函数（指数、三角、双曲、幂）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 2 §2.3 · Elementary Functions',
        'Stein–Shakarchi, Complex Analysis, Ch. 1 §1.3 · Elementary properties and examples',
      ],
    },
    {
      id: 'prop.exp-local-inverse',
      type: 'proposition',
      label: '指数函数的局部逆',
      title: '指数函数在每点局部双全纯，逆即对数的一个分支',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '指数函数', '对数函数', '局部逆', '反函数定理'],
      statement: [
        '对每个 $z_{0} \\in \\mathbb{C}$，存在 $z_{0}$ 的邻域 $U$ 与开集 $V$，使 ' +
          '$\\exp : U \\to V$ 是双全纯映射，且其逆',
        '',
        '$$w \\longmapsto \\log w := \\log|w| + i\\arg_{U} w$$',
        '',
        '全纯，其中 $\\arg_{U} w$ 取在区间 $(\\operatorname{Im} z_{0} - \\pi,\\ \\operatorname{Im} z_{0} + \\pi)$ 内。',
        '',
        '等价说法：$\\exp$ 是局部双全纯的（局部同构），且 $\\exp$ 是覆叠映射 ' +
          '$\\mathbb{C} \\to \\mathbb{C} \\setminus \\{0\\}$，纤维是 $2\\pi i\\mathbb{Z}$。',
      ].join('\n'),
      notes: [
        '**证明**：$\\exp\' = \\exp \\ne 0$ 处处成立，于是由反函数定理（复版本：' +
          '$f\'(z_{0}) \\ne 0$ 时局部双全纯，逆的导数为 $1/f\'$）得局部双全纯。' +
          '逆的显式表达式由 Euler 公式直接读出：$e^{x + iy} = w$ 给出 $x = \\log|w|$、$y = \\arg w + 2k\\pi$，' +
          '取落在指定区间的那一支即得。',
        '',
        '⭐ **局部 vs 整体**：局部逆永远存在，但**整体**的 $\\log$ 不存在（绕原点一圈辐角多 $2\\pi$）。' +
          '「能不能拼成整体」这件事正是 `prop.single-valued-branch` 要回答的问题，答案是**绕数**为 $0$。',
        '',
        '⚠️ 覆盖的层数：$e^{z}$ 把每条水平带 $\\{a < \\operatorname{Im} z < a + 2\\pi\\}$ 双双全纯地映到 ' +
          '$\\mathbb{C}\\setminus\\{0\\}$，所以对数有无穷多个分支，彼此差 $2\\pi i k$。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 对数函数与幂函数（多值性与分支）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 3 §3.2 · The Logarithm',
      ],
    },
    {
      id: 'prop.single-valued-branch',
      type: 'proposition',
      label: '单值支的存在判据',
      title: '单值支：多值函数在区域上何时能取到一个连续单值分支',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '多值函数', '分支', '单值支', '原函数'],
      statement: [
        '设 $D \\subset \\mathbb{C}$ 是区域，$F$ 是 $D$ 上的多值函数（每点给一个非空值集 $F(z)$）。' +
          '$F$ 的**单值支**是连续函数 $f : D \\to \\mathbb{C}$ 使 $f(z) \\in F(z)$ 对一切 $z \\in D$ 成立；' +
          '若 $F$ 来自解析延拓，则单值支自动全纯。',
        '',
        '对**对数**（$F(z) = \\{\\, w : e^{w} = z \\,\\}$）下列三条等价：',
        '',
        '1. $\\log$ 在 $D$ 上存在全纯单值支；',
        '2. $1/z$ 在 $D$ 上有原函数；',
        '3. 对 $D$ 中每条闭曲线 $\\gamma$ 都有 $\\displaystyle\\oint_{\\gamma} \\frac{\\mathrm{d}z}{z} = 0$。',
        '',
        '充分条件：$D$ 单连通且 $0 \\notin D$。',
      ].join('\n'),
      notes: [
        '**证明（1 $\implies$ 3）**：若 $e^{f} = z$，则 $f\' = 1/z$，于是 $\\oint_{\\gamma} \\mathrm{d}z/z = \\oint_{\\gamma} f\'\\,\\mathrm{d}z = 0$' +
          '（全纯函数的围道积分在单连通区域内为零，这里用「有原函数」的版本）。',
        '',
        '**证明（3 $\implies$ 2 $\implies$ 1）**：条件 3 说明沿曲线的积分只依赖端点，于是可定义 ' +
          '$f(z) := \\int_{z_{0}}^{z} \\mathrm{d}\\zeta/\\zeta$，它满足 $f\' = 1/z$；' +
          '再验证 $(z e^{-f(z)})\' = e^{-f} - z e^{-f}/z = 0$，故 $z e^{-f}$ 为常数，调整常数即得 $e^{f} = z$。',
        '',
        '⭐ **条件 3 就是「绕数全为零」**（见 `prop.winding-integral`）：$\\oint_{\\gamma}\\mathrm{d}z/z = 2\\pi i\\, n(\\gamma, 0)$。' +
          '所以「对数有没有单值支」被翻译成了一句关于**曲线绕不绕原点**的话 —— 单连通区域里没有闭曲线能绕住外点，故自动成立。',
        '',
        '⚠️ 单连通**不是**必要条件：圆环 $\\{1 < |z| < 2\\}$ 上 $\\log$ 没有单值支，' +
          '但去掉两个洞的区域上可能有 —— 判据永远是 3 而不是「形状像不像单连通」。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 多值函数、单值分支与支割线',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 4 §4.2 · The Index of a Point; Ch. 4 §4.3 · The Logarithm',
      ],
    },

    /* ---------------------------------------------------------------- §B */
    {
      id: 'prop.winding-integral',
      type: 'proposition',
      label: '绕数的积分表示',
      title: '绕数 = dz/(z−a) 的围道积分除以 2πi',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '绕数', '围道积分', '辐角'],
      statement: [
        '设 $\\gamma : [0,1] \\to \\mathbb{C}$ 是分段 $C^{1}$ 的闭曲线，$a \\notin \\gamma([0,1])$。则',
        '',
        '$$n(\\gamma, a) = \\frac{1}{2\\pi i} \\oint_{\\gamma} \\frac{\\mathrm{d}z}{z - a},$$',
        '',
        '特别地右端**总是整数**。',
      ].join('\n'),
      notes: [
        '**证明**：先把 $a$ 平移到 $0$（平移不改变积分值）。令 $\\varphi(t) := \\displaystyle\\int_{0}^{t} \\frac{\\gamma\'(s)}{\\gamma(s)}\\,\\mathrm{d}s$，' +
          '则 $(\\gamma e^{-\\varphi})\' = e^{-\\varphi}(\\gamma\' - \\varphi\'\\gamma) = 0$，故 $\\gamma(t) e^{-\\varphi(t)}$ 是常数；' +
          '由 $\\varphi(0) = 0$ 得 $e^{\\varphi(t)} = \\gamma(t)/\\gamma(0)$。',
        '',
        '取 $t = 1$：因 $\\gamma(1) = \\gamma(0)$，有 $e^{\\varphi(1)} = 1$，所以 $\\varphi(1) \\in 2\\pi i \\mathbb{Z}$。' +
          '而 $\\varphi(1) = \\oint_{\\gamma} \\mathrm{d}z/z$，于是积分除以 $2\\pi i$ 是整数，' +
          '它随 $a$ 连续变化故恰是绕数（整数值 + 连续 $\implies$ 局部常值）。',
        '',
        '⭐ **这条式子的意义**：绕数本来是「曲线绕点转了几圈」的几何说法，这里换成了**积分**，' +
          '于是「几何量」可以参与计算 —— 辐角原理（`thm.argument-principle`）就是拿它去数零点的。',
        '',
        '⚠️ 积分结果与 $\\gamma$ 的参数化无关，只与定向有关：反向走一圈，绕数变号。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 曲线绕数的积分表示',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 4 §4.2 · The Index of a Point',
      ],
    },
    {
      id: 'thm.winding-homotopy',
      type: 'theorem',
      label: '绕数的同伦不变性',
      title: '同伦的闭曲线有相同的绕数（Cauchy 定理的同伦形式）',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '同伦', '绕数', 'Cauchy 定理'],
      statement: [
        '设 $\\gamma_{0}, \\gamma_{1}$ 是 $\\mathbb{C} \\setminus \\{a\\}$ 中同伦的闭曲线（同伦 $H : [0,1]^{2} \\to \\mathbb{C}\\setminus\\{a\\}$' +
          '两端分别给出 $\\gamma_{0}, \\gamma_{1}$）。则',
        '',
        '$$n(\\gamma_{0}, a) = n(\\gamma_{1}, a).$$',
        '',
        '推论（Cauchy 定理的同伦形式）：$f$ 在区域 $\\Omega$ 上全纯，$\\gamma_{0}, \\gamma_{1}$ 在 $\\Omega$ 内同伦，则 ' +
          '$\\displaystyle\\oint_{\\gamma_{0}} f\\,\\mathrm{d}z = \\oint_{\\gamma_{1}} f\\,\\mathrm{d}z$。',
      ].join('\n'),
      notes: [
        '**绕数部分的证明**：对同伦参数 $s$ 定义 $N(s) := n(H(s, \\cdot), a)$。由积分表示 ' +
          '$N(s) = \\frac{1}{2\\pi i}\\oint_{H(s,\\cdot)} \\mathrm{d}z/(z-a)$，被积函数与积分域都连续依赖 $s$，故 $N$ 连续；' +
          '而 $N$ 只取整数值，连续 + 取整 $\implies$ 常值。于是 $N(0) = N(1)$。',
        '',
        '**Cauchy 形式**：因为 $\\Omega$ 单连通化之后 $f\\,\\mathrm{d}z$ 可以沿同伦「连续形变而积分不变」，' +
          '逐 $s$ 求导即得 $\\frac{\\mathrm{d}}{\\mathrm{d}s}\\oint_{H(s,\\cdot)} f\\,\\mathrm{d}z = 0$；' +
          '这条路与「$f$ 有原函数」是同一条，见 `prop.single-valued-branch`。',
        '',
        '⭐ **它是复分析和拓扑之间的第一根铰链**：绕数是同伦不变量，于是「全纯 $\implies$ 围道积分只看同伦类」，' +
          '这就是为什么 Cauchy 定理对**任何**能把曲线缩成一点的情形都成立，而不需要区域是凸的。Brouwer 不动点定理' +
          '（`thm.brouwer-fixed-point`）的复分析证明直接把这条用在 $\\gamma(t) = e^{2\\pi i t}$ 上。',
        '',
        '⚠️ 同伦必须在 $\\mathbb{C}\\setminus\\{a\\}$ 里进行：允许穿过 $a$ 的话绕数会跳。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 复围道积分的同伦不变性',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 4 §4.3 · The Index and Homotopy',
        'Stein–Shakarchi, Complex Analysis, Ch. 3 §3.1 · The winding number and Cauchy’s theorem',
      ],
    },

    /* ---------------------------------------------------------------- §C */
    {
      id: 'prop.zero-isolated',
      type: 'proposition',
      label: '零点的孤立性与阶',
      title: '非零全纯函数的零点孤立，且在每个零点有有限阶',
      cluster: 'analysis.cauchy',
      regions: ['complex'],
      tags: ['复变函数', '零点', '零点的阶', '孤立性'],
      statement: [
        '设 $f$ 在区域 $\\Omega$ 上全纯、$f(z_{0}) = 0$ 且 $f$ 在 $z_{0}$ 的每个邻域内都不恒为零。则存在**唯一**的整数 ' +
          '$m \\ge 1$ 与在 $z_{0}$ 附近全纯的 $g$，使',
        '',
        '$$f(z) = (z - z_{0})^{m}\\, g(z), \\qquad g(z_{0}) \\ne 0.$$',
        '',
        '$m$ 叫 $z_{0}$ 处零点的**阶**。于是 $z_{0}$ 是 $f$ 的孤立零点，' +
          '并且非零全纯函数的零点集在 $\\Omega$ 内**没有聚点**。',
      ].join('\n'),
      notes: [
        '**证明**：把 $f$ 在 $z_{0}$ 处展开成 Taylor 级数（`thm.taylor-complex`）：' +
          '$f(z) = \\sum_{n \\ge 1} a_{n}(z - z_{0})^{n}$。因为 $f$ 不恒为零，系数不全为零；' +
          '取最小的 $m$ 使 $a_{m} \\ne 0$，则 $f(z) = (z - z_{0})^{m}\\bigl(a_{m} + a_{m+1}(z - z_{0}) + \\cdots\\bigr)$，' +
          '括号里的部分在 $z_{0}$ 处取值 $a_{m} \\ne 0$，是所求的 $g$。',
        '',
        '**孤立性**：$g(z_{0}) \\ne 0$ 且 $g$ 连续，故在 $z_{0}$ 的某个邻域内 $g \\ne 0$，' +
          '于是该邻域内 $f$ 只在 $z_{0}$ 处为零（去心邻域里 $(z - z_{0})^{m} \\ne 0$）。',
        '',
        '**聚点**：若零点有聚点 $z^{*} \\in \\Omega$，则 $z^{*}$ 本身也是零点（连续性），' +
          '而它的每个邻域里都有零点，破坏了上一条的孤立性 —— 所以只能 $f \\equiv 0$。这正是唯一性定理的一半。',
        '',
        '⭐ **阶在整本书里的位置**：极点、留数、辐角原理（数零点个数时按阶计）都要用它。' +
          '⚠️ 这里的「阶」与极点的「阶」是同一件事的两面：$f$ 在 $z_{0}$ 有 $m$ 阶零点 $\\iff$ $1/f$ 在 $z_{0}$ 有 $m$ 阶极点。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 解析函数的零点及其孤立性',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 4 §4.3 · Zeros and Poles',
      ],
    },
    {
      id: 'thm.identity',
      type: 'theorem',
      label: '唯一性定理',
      title: '唯一性定理（解析延拓原理）',
      cluster: 'analysis.cauchy',
      regions: ['complex'],
      tags: ['复变函数', '唯一性定理', '解析延拓', '零点'],
      statement: [
        '设 $f, g$ 在**区域** $\\Omega$ 上全纯。若集合',
        '',
        '$$Z := \\{\\, z \\in \\Omega : f(z) = g(z) \\,\\}$$',
        '',
        '在 $\\Omega$ 内有聚点，则 $f \\equiv g$。等价地：若 $f$ 在 $\\Omega$ 的一个有聚点的子集上为零，则 $f \\equiv 0$。',
      ].join('\n'),
      notes: [
        '**证明**：令 $h := f - g$，则 $h$ 全纯且 $Z$ 是 $h$ 的零点集。设 $z^{*} \\in \\Omega$ 是 $Z$ 的聚点，' +
          '由连续性 $h(z^{*}) = 0$。若 $h$ 在 $z^{*}$ 附近不恒为零，则由 `prop.zero-isolated` 它在该点有有限阶，' +
          '从而 $z^{*}$ 是**孤立**零点，与该点是 $Z$ 的聚点矛盾。所以 $h$ 在 $z^{*}$ 的某邻域内恒为零。',
        '',
        '**把「局部为零」扩到整个区域**：令 $A := \\{\\, z \\in \\Omega : h \\text{ 在 } z \\text{ 的某邻域内恒为零} \\,\\}$。' +
          '$A$ 按定义是开集；上面刚证了 $z^{*} \\in A$，所以 $A \\ne \\emptyset$。' +
          '另一方面 $A$ 在 $\\Omega$ 中也是闭的：若 $z_{n} \\in A$、$z_{n} \\to z \\in \\Omega$，' +
          '则 $h$ 在 $z$ 附近被 $z_{n}$ 的邻域覆盖而恒为零，故 $z \\in A$。' +
          '区域是连通的，既开又闭的非空子集只能是全体，于是 $h \\equiv 0$。∎',
        '',
        '⭐ **它是「解析延拓」的合法性来源**：只要在一个有聚点的集合上对上了，整片区域上就唯一确定。' +
          '⚠️ 但**不能**换成「在一条线段上相等」以外的弱条件 —— 必须**有聚点**且聚点在区域内。' +
          '反例：$f \\equiv 0$ 与 $g(z) = \\sin(1/z)$ 在 $\\{1/(n\\pi)\\}$ 上相等，但这族点以 $0$ 为聚点而 $0 \\notin \\Omega = \\mathbb{C}\\setminus\\{0\\}$。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 唯一性定理与解析延拓',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 4 §4.3 · The Identity Theorem',
        'Stein–Shakarchi, Complex Analysis, Ch. 2 §2.4 · The identity theorem',
      ],
    },
    {
      id: 'thm.casorati-weierstrass',
      type: 'theorem',
      label: 'Casorati–Weierstrass 定理',
      title: '本性奇点附近函数值稠密（Casorati–Weierstrass）',
      cluster: 'analysis.cauchy',
      regions: ['complex'],
      tags: ['复变函数', '本性奇点', '孤立奇点', 'Casorati-Weierstrass'],
      statement: [
        '设 $z_{0}$ 是 $f$ 的**本性奇点**（即 Laurent 展开的主部有无穷多项）。则对 $z_{0}$ 的每个去心邻域 ' +
          '$U = \\{\\, 0 < |z - z_{0}| < r \\,\\}$，像集 $f(U)$ 在 $\\mathbb{C}$ 中**稠密**：',
        '',
        '$$\\forall\\, w \\in \\mathbb{C},\\ \\forall\\, \\varepsilon > 0,\\ \\exists\\, z \\in U \\text{ 使 } |f(z) - w| < \\varepsilon.$$',
      ].join('\n'),
      notes: [
        '**证明（反证）**：设存在 $w_{0}$、$\\rho > 0$ 使 $f(U) \\cap B(w_{0}, \\rho) = \\emptyset$。令',
        '',
        '$$F(z) := \\frac{1}{f(z) - w_{0}}, \\qquad 0 < |z - z_{0}| < r.$$',
        '',
        '则 $|F(z)| < 1/\\rho$ 在 $U$ 上有界，故 $z_{0}$ 是 $F$ 的**可去奇点**（`thm.riemann-removable`），' +
          '$F$ 在 $z_{0}$ 处可补成全纯。于是 $f = w_{0} + 1/F$ 在 $z_{0}$ 附近的行为只可能是：' +
          '$F(z_{0}) \\ne 0$ $\implies$ $f$ 全纯；$F$ 有 $m$ 阶零点 $\implies$ $f$ 有 $m$ 阶极点；$F \\equiv 0$ $\implies$ $f \\equiv \\infty$（不可能）。' +
          '三种都与「$z_{0}$ 是本性奇点」矛盾。∎',
        '',
        '⭐ **怎么记**：三类奇点里，可去奇点附近**有界**，极点附近**趋于无穷**，' +
          '本性奇点则**什么都可能发生** —— 它把每个去心邻域的像撒得满 $\\mathbb{C}$ 都是。',
        '',
        '⚠️ Casorati–Weierstrass 只说**稠密**，不说「取到每个值」。更强的 **Picard 大定理**说：' +
          '去心邻域的像**至多漏掉一个点**（且那个值至多取到有限次）—— 本图不展开，只标出处。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 本性奇点与 Casorati–Weierstrass 定理',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 5 §1.3 · Casorati–Weierstrass Theorem',
        'Stein–Shakarchi, Complex Analysis, Ch. 3 §3.3 · Casorati–Weierstrass (Exercise)',
      ],
    },

    /* ---------------------------------------------------------------- §D */
    {
      id: 'thm.weierstrass-convergence',
      type: 'theorem',
      label: 'Weierstrass 收敛性定理',
      title: 'Weierstrass 收敛性定理：内闭一致收敛的全纯列，极限全纯且导数也收敛',
      cluster: 'analysis.cauchy',
      regions: ['complex'],
      tags: ['复变函数', '收敛', '一致收敛', '全纯函数列'],
      statement: [
        '设 $f_{k}$ 在区域 $\\Omega$ 上全纯，且在每个紧集 $K \\subset \\Omega$ 上一致收敛于 $f$。则',
        '',
        '1. $f$ 在 $\\Omega$ 上全纯；',
        '2. 对每个 $m \\ge 1$，$f_{k}^{(m)} \\to f^{(m)}$ 在每个紧集上一致收敛。',
      ].join('\n'),
      notes: [
        '**证明（1）**：全纯性用 `thm.morera` 判。任取 $\\Omega$ 内的闭三角形 $T$（含内部），' +
          '每个 $f_{k}$ 沿 $\\partial T$ 的积分为零（Cauchy–Goursat）；$\\partial T$ 是紧集，' +
          '一致收敛使积分可以取极限，故 $\\oint_{\\partial T} f = \\lim_{k} \\oint_{\\partial T} f_{k} = 0$。' +
          '由 Morera，$f$ 全纯。',
        '',
        '**证明（2）**：设 $K \\subset \\Omega$ 紧，取 $r > 0$ 使 $K$ 的 $r$-邻域仍在 $\\Omega$ 内。' +
          '对 $z \\in K$ 用 Cauchy 高阶导数公式（`thm.cauchy-higher-derivative`）在半径 $r$ 的圆上积分：',
        '',
        '$$\\left|f_{k}^{(m)}(z) - f^{(m)}(z)\\right| \\le \\frac{m!}{r^{m}}\\,' +
          '\\sup_{|\\zeta - z| \\le r}\\left|f_{k}(\\zeta) - f(\\zeta)\\right|.$$',
        '',
        '右端与 $z$ 无关且随 $k \\to \\infty$ 趋于 $0$，故在 $K$ 上一致收敛。∎',
        '',
        '⭐ **为什么它是「整章的地基」**：它保证「全纯」这个性质在一致收敛下**封闭**，' +
          '于是可以放心地取极限 —— 正规族（`thm.montel`）、Riemann 映射定理（`thm.riemann-mapping`）、' +
          'Hurwitz 定理都靠它把「极限函数仍然是全纯的」这句话合法化。',
        '',
        '⚠️ 条件必须是**内闭一致**（每个紧集上一致）。只在逐点收敛时结论不成立：' +
          '$f_{k}(z) = z^{k}$ 在 $|z| < 1$ 上逐点收敛于 $0$，但 $f_{k}\' = k z^{k-1}$ 并不收敛。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Weierstrass 收敛性定理',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 5 §1.1 · Weierstrass’s Theorem',
        'Stein–Shakarchi, Complex Analysis, Ch. 2 §2.4 · Sequences of holomorphic functions',
      ],
    },
    {
      id: 'thm.arzela-ascoli',
      type: 'theorem',
      label: 'Arzelà–Ascoli 定理',
      title: 'Arzelà–Ascoli 定理：一致有界 + 等度连续 $\implies$ 相对紧',
      cluster: 'analysis.mapping',
      regions: ['complex', 'analysis'],
      tags: ['复变函数', '紧性', '等度连续', '函数列', '正规族'],
      statement: [
        '设 $X$ 是紧距离空间，$\\mathcal{F} \\subset C(X)$（连续函数，取一致范数）满足',
        '',
        '1. **一致有界**：存在 $M$ 使 $|f(x)| \\le M$ 对一切 $f \\in \\mathcal{F}$、$x \\in X$ 成立；',
        '2. **等度连续**：$\\forall \\varepsilon > 0$ 存在 $\\delta > 0$，使 $d(x, y) < \\delta$ 时 ' +
          '$|f(x) - f(y)| < \\varepsilon$ 对**一切** $f \\in \\mathcal{F}$ 同时成立。',
        '',
        '则 $\\mathcal{F}$ 在 $C(X)$ 中**相对紧**：$\\mathcal{F}$ 中每个序列都有在一致范数下收敛的子列。',
      ].join('\n'),
      notes: [
        '**证明（对角线法）**：$X$ 紧 $\implies$ 可取可数稠密集 $\\{x_{1}, x_{2}, \\ldots\\}$。' +
          '由一致有界，$\\{f_{n}(x_{1})\\}$ 有收敛子列；再从它里面挑使 $\\{f_{n}(x_{2})\\}$ 收敛的子列；如此一层层挑下去，' +
          '取对角线 $g_{k} := f_{n_{k}}$，则 $g_{k}(x_{j})$ 对每个 $j$ 都收敛。',
        '',
        '**把逐点收敛升级为一致收敛**：给定 $\\varepsilon$，由等度连续性取 $\\delta$；用有限个 $x_{1}, \\ldots, x_{N}$ 的 ' +
          '$\\delta$-球盖住 $X$。先取 $K$ 使 $j \\le N$ 时 $|g_{k}(x_{j}) - g_{l}(x_{j})| < \\varepsilon$（$k, l \\ge K$），' +
          '再对任意 $x$ 找最近的 $x_{j}$，用等度连续性把 $|g_{k}(x) - g_{l}(x)|$ 控制在 $3\\varepsilon$ 内。∎',
        '',
        '⭐ **两条假设各管一件事**：有界性保证「每个点上都有收敛子列」，等度连续性保证「同一个子列在所有点同时收敛」。' +
          '少任何一条都有反例（$f_{n}(x) = x^{n}$ 有界不等度连续；$f_{n}(x) = n$ 等度连续不一致有界）。',
        '',
        '⚠️ 本图把它挂在复变里，是因为 Montel 定理就是它 + Cauchy 不等式：' +
          '**全纯函数的「一致有界」自动给出「等度连续」**（导数的界），这是复分析独有的便宜。',
      ].join('\n'),
      refs: [
        'Rudin, Principles of Mathematical Analysis (3rd ed.), Ch. 7 · The Arzelà–Ascoli Theorem',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 5 §1.2 · Normal Families',
      ],
    },
    {
      id: 'thm.montel',
      type: 'theorem',
      label: 'Montel 定理',
      title: 'Montel 定理：局部一致有界的全纯族是正规族',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '正规族', '紧性', 'Montel'],
      statement: [
        '设 $\\mathcal{F}$ 是区域 $\\Omega$ 上的全纯函数族，且**局部一致有界**：每个点有邻域，' +
          '族在其上一致有界（等价地：在每个紧集 $K \\subset \\Omega$ 上一致有界）。' +
          '则 $\\mathcal{F}$ 是**正规族**：每个序列 $f_{n} \\in \\mathcal{F}$ 都有子列在内闭一致收敛（极限全纯）。',
      ].join('\n'),
      notes: [
        '**证明**：取紧集穷竭 $K_{1} \\subset K_{2} \\subset \\cdots$、$\\bigcup K_{j} = \\Omega$。' +
          '在 $K_{j}$ 上由 **Cauchy 不等式**（`thm.cauchy-inequality`）：若 $|f| \\le M_{j}$ 在 $K_{j}$ 的某个 $r$-邻域上，' +
          '则 $|f\'| \\le M_{j}/r$ 在 $K_{j}$ 上 —— 界与 $f$ 无关，所以 $\\mathcal{F}$ 在 $K_{j}$ 上**等度连续**。' +
          '一致有界是假设给的，于是 `thm.arzela-ascoli` 给出在 $K_{j}$ 上的收敛子列；' +
          '对 $j = 1, 2, \\ldots$ 逐层取对角线，得到在**每个** $K_{j}$ 上一致收敛的子列，即内闭一致收敛。',
        '',
        '**极限全纯**：由 `thm.weierstrass-convergence`。∎',
        '',
        '⭐ **它与紧性的关系**：Montel 说的是「$\\mathcal{F}$ 相对紧」，' +
          '所以任何**连续**泛函（比如 $f \\mapsto |f\'(z_{0})|$）在有界闭的族上取到最大值。' +
          'Riemann 映射定理的全部力量就来自这一句：在「单叶 + $f(z_{0}) = 0$ + $f\'(z_{0}) > 0$」的族里' +
          '取使 $f\'(z_{0})$ 最大的那个，再证明它必须映满圆盘。',
        '',
        '⚠️ 「局部一致有界」不能换成「逐点有界」：$f_{n}(z) = n z$ 在 $\\mathbb{C}$ 上逐点有界（每点看是常数）' +
          '但任何紧集上都不一致有界，且没有内闭收敛子列。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 正规族与 Montel 定理（Riemann 映射定理的预备）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 5 §1.2 · Normal Families',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.1 · Montel’s theorem',
      ],
    },

    /* ---------------------------------------------------------------- §E */
    {
      id: 'thm.open-mapping',
      type: 'theorem',
      label: '开映射定理',
      title: '开映射定理：非常数全纯函数把开集映成开集',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '开映射', '最大模原理', '单叶'],
      statement: [
        '设 $f$ 在区域 $\\Omega$ 上全纯且**不是常数**。则 $f$ 是开映射：$\\Omega$ 中每个开集的像都是开集。',
        '',
        '推论：',
        '',
        '1. **最大模原理的另一种说法**：$|f|$ 在 $\\Omega$ 内部取不到最大值（否则像不是开集）；',
        '2. 全纯**单射**必是到像上的双全纯（逆也全纯）；',
        '3. $f$ 的像若含于某个开集，则「$\\operatorname{Im} f$ 没有内点」与「$f$ 常数」等价。',
      ].join('\n'),
      notes: [
        '**证明**：取 $z_{0} \\in \\Omega$、$w_{0} := f(z_{0})$，只需证 $w_{0}$ 是 $f(\\Omega)$ 的内点。' +
          '不妨 $w_{0} = 0$（平移）。由 `prop.zero-isolated`，$z_{0}$ 是 $f$ 的孤立零点、阶为 $m \\ge 1$，' +
          '故在 $z_{0}$ 的某邻域内 $f$ 只有 $z_{0}$ 一个零点，且可取小圆 $|z - z_{0}| = \\rho$ 使 $f$ 在其上不为零，' +
          '令 $\\delta := \\min_{|z - z_{0}| = \\rho}|f(z)| > 0$。',
        '',
          '现在任取 $|w| < \\delta$，比较 $f$ 与常值 $-w$：在圆周上 $|f(z)| \\ge \\delta > |w| = |{-w} - f(z) + f(z)|$… ' +
          '更直接地，在圆周上 $|f(z) - (-w)| \\ge |f(z)| - |w| > 0$，而 $f$ 与 $-w$ 在圆内零点个数由 ' +
          '**Rouché 定理**（`thm.rouche`）比较：$|f| > |{-w} - f|$ 在圆周上成立时两者零点数相同。' +
          '$f$ 在圆内有 $m \\ge 1$ 个零点（按阶计），所以 $f + w$ 在圆内也有零点，即 $w = -f(z)$ 被取到。' +
          '故 $B(0, \\delta) \\subseteq f(\\Omega)$，$w_{0}$ 是内点。∎',
        '',
        '⭐ **反过来读更顺**：开映射定理 = 「非常数全纯函数不能把开集压成一条线或一个点」。' +
          '最大模原理、Schwarz 引理、单叶 $\implies$ 双全纯，都是这句话的换装。',
        '',
        '⚠️ 「非常数」不能去掉：常值函数把开集映成一点。⚠️ 只对**全纯**成立：实值连续函数没有这条性质。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 开映射定理与单叶解析函数',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 5 §3.1 · The Open Mapping Theorem',
      ],
    },
    {
      id: 'thm.riemann-mapping',
      type: 'theorem',
      label: 'Riemann 映射定理',
      title: 'Riemann 映射定理：单连通真区域双全纯等价于单位圆盘',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', 'Riemann 映射', '单连通', '共形映射', '正规族'],
      statement: [
        '设 $\\Omega \\subset \\mathbb{C}$ 是**单连通**区域，$z_{0} \\in \\Omega$。则存在唯一的双全纯映射',
        '',
        '$$f : \\Omega \\longrightarrow \\mathbb{D} = \\{\\, |z| < 1 \\,\\}$$',
        '',
        '且 $f(z_{0}) = 0$、$f\'(z_{0}) > 0$。',
        '',
        '于是「$\\mathbb{C}$ 的任意单连通真子区域」在共形等价意义下**只有单位圆盘一个**。',
      ].join('\n'),
      notes: [
        '**证明结构（三步，这是本图最深的定理之一，给骨架 + 关键计算 + 出处）**：',
        '',
        '**第一步：族不空。** $\\Omega \\ne \\mathbb{C}$ 给出 $a \\notin \\Omega$；因 $\\Omega$ 单连通，' +
          '存在全纯的单值支 $\\sqrt{z - a}$（`prop.single-valued-branch`）。它把 $\\Omega$ 双全纯地送到某个区域内，' +
          '再用分式线性变换（`def.mobius`）把它搬进 $\\mathbb{D}$ 并让 $z_{0} \\mapsto 0$。所以候选族 ' +
          '$\\mathcal{F} := \\{\\, \\varphi : \\Omega \\to \\mathbb{D} \\text{ 单叶全纯},\\ \\varphi(z_{0}) = 0 \\,\\}$ 非空。',
        '',
        '**第二步：取极值元。** 由 Cauchy 不等式，$|\\varphi\'(z_{0})|$ 被 $1/\\operatorname{dist}(z_{0}, \\partial\\Omega)$ 控制，' +
          '故 $s := \\sup_{\\varphi \\in \\mathcal{F}} |\\varphi\'(z_{0})| \\in (0, \\infty)$。取 $\\varphi_{n}$ 使 ' +
          '$|\\varphi_{n}\'(z_{0})| \\to s$；族在 $\\mathbb{D}$ 内一致有界，由 **Montel 定理**（`thm.montel`）' +
          '有内闭一致收敛子列，极限 $f$ 全纯，$f(z_{0}) = 0$、$|f\'(z_{0})| = s$，且 $f$ 单叶（' +
          '单叶性在一致收敛下保持：若 $f(z_{1}) = f(z_{2})$，用 Rouché 或 Hurwitz 反推 $\\varphi_{n}$ 不单叶，矛盾）。',
        '',
        '**第三步：$f$ 满射。** 若 $f$ 漏掉某点 $w_{1} \\in \\mathbb{D}$，用 $\\mathbb{D}$ 的自同构把 $w_{1}$ 搬到 $0$，' +
          '再取平方根分支、再搬回去，构造 $\\psi \\in \\mathcal{F}$ 使 $|\\psi\'(z_{0})| > s$ —— 与 $s$ 的极大性矛盾' +
          '（这一步是纯计算，核心是 $|g\'(0)| = \\frac{1 + |a|}{2\\sqrt{|a|}} > 1$）。故 $f$ 满。∎',
        '',
        '**唯一性**：两个这样的 $f, g$ 给出 $\\mathbb{D}$ 到自身、固定 $0$、导数正实数的双全纯映射；' +
          '由 **Schwarz 引理**（`lem.schwarz`）它必须是恒等。',
        '',
        '⭐ **为什么叫「基本定理」**：它把「共形等价」这件事在单连通情形下一举归约到唯一的模型 $\\mathbb{D}$。' +
          '于是任何单连通区域上的问题都可以搬到圆盘上算 —— 双曲几何（`prop.poincare-disk`）就是这么来的。',
        '',
        '⚠️ **单连通不能去掉**：圆环 $\\{1 < |z| < 2\\}$ 与 $\\mathbb{D}$ 不共形等价（前者有「洞」，' +
          '单值化定理里它对应另一个模型）。⚠️ 「真子区域」也不能去掉：$\\mathbb{C}$ 本身没有到 $\\mathbb{D}$ 的双全纯' +
          '（Liouville：$\\mathbb{D} \\to \\mathbb{C}$ 的有界全纯像若满则... 更直接地，$\\mathbb{C}$ 上的全纯函数不能有界且满射到 $\\mathbb{D}$）。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Riemann 映射定理（正规族证明）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 §1 · The Riemann Mapping Theorem',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.1 · The Riemann mapping theorem',
      ],
    },
    {
      id: 'prop.poincare-disk',
      type: 'proposition',
      label: 'Poincaré 圆盘与双曲几何',
      title: '单位圆盘上的 Poincaré 度量：Schwarz–Pick 就是等距性',
      cluster: 'analysis.mapping',
      regions: ['complex'],
      tags: ['复变函数', '双曲几何', 'Poincaré 度量', 'Schwarz-Pick'],
      statement: [
        '在 $\\mathbb{D}$ 上赋**Poincaré 度量**',
        '',
        '$$\\mathrm{d}s^{2} = \\frac{4\\,|\\mathrm{d}z|^{2}}{\\left(1 - |z|^{2}\\right)^{2}}.$$',
        '',
        '则：(1) 它的曲率恒为 $-1$；(2) 测地线是**与边界圆周正交**的圆弧（直径是特例）；' +
          '(3) 双全纯 $\\varphi : \\mathbb{D} \\to \\mathbb{D}$ 恰是这个度量的**等距**，' +
          '而 **Schwarz–Pick 定理**（`thm.schwarz-pick`）正是这句话的微分形式。',
        '',
        '经 `thm.riemann-mapping`，任何单连通真区域 $\\Omega \\subset \\mathbb{C}$ 都由此获得一个曲率 $-1$ 的完备度量。',
      ].join('\n'),
      notes: [
        '**为什么是这三种几何**：常曲率二维模型只有三个 —— 球面（$+1$）、欧氏平面（$0$）、双曲平面（$-1$）。' +
          '球面经球极投影变成 $\\widehat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}$ 上的度量，' +
          '圆盘承载双曲的，而 $\\mathbb{C}$ 自己承载欧氏的。**单值化定理**说：任何单连通 Riemann 曲面' +
          '（`def.riemann-surface`）都共形等价于这三者之一。',
        '',
        '**与 Schwarz–Pick 的关系**：Schwarz–Pick 说 $\\varphi : \\mathbb{D} \\to \\mathbb{D}$ 全纯时',
        '',
        '$$\\frac{|\\varphi\'(z)|}{1 - |\\varphi(z)|^{2}} \\le \\frac{1}{1 - |z|^{2}},$$',
        '',
        '左端正是把 Poincaré 度量沿 $\\varphi$ 拉回后的系数比 —— 所以这句话读作「全纯映射不放大双曲长度」，' +
          '等号成立（在某点）时 $\\varphi$ 是自同构。',
        '',
        '⭐ **几何的图像**：双曲平面里「直线」是垂直撞到边界圆周的圆弧，三角形的内角和**小于** $\\pi$，' +
          '面积有上界。这些性质都可以用圆盘上的度量算出来，不需要另建模型。',
        '',
        '⚠️ 边界圆周 **不属于** 双曲平面：度量在 $|z| \\to 1$ 时发散，所以 $\\mathbb{D}$ 在这个度量下是**完备**的，' +
          '而边界是「无穷远」。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 共形映射与 Schwarz–Pick 的几何意义',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 §2 · Conformal Mapping of the Disk; 双曲度量',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.2 · The hyperbolic metric (Exercises)',
      ],
    },

    /* ---------------------------------------------------------------- §F */
    {
      id: 'thm.brouwer-fixed-point',
      type: 'theorem',
      label: 'Brouwer 不动点定理（圆盘）',
      title: 'Brouwer 不动点定理：闭圆盘到自身的连续映射必有不动点',
      cluster: 'analysis.topology-app',
      regions: ['complex'],
      tags: ['复变函数', '拓扑', '不动点', 'Brouwer', '绕数'],
      statement: [
        '设 $f : \\overline{\\mathbb{D}} \\to \\overline{\\mathbb{D}}$ 连续（$\\overline{\\mathbb{D}} = \\{\\, |z| \\le 1 \\,\\}$）。' +
          '则存在 $z \\in \\overline{\\mathbb{D}}$ 使 $f(z) = z$。',
      ].join('\n'),
      notes: [
        '**复分析证明（用绕数）**：反设 $f$ 没有不动点，即 $f(z) \\ne z$ 处处成立。' +
          '对每个 $z \\in \\overline{\\mathbb{D}}$，从 $f(z)$ 出发沿射线经过 $z$ 打到边界，定义',
        '',
        '$$r(z) := f(z) + t(z)\\left(z - f(z)\\right),\\qquad t(z) \\ge 1 \\text{ 由 } |r(z)| = 1 \\text{ 唯一确定}.$$',
        '',
          '解一元二次方程可得 $t$ 连续依赖 $z$，且 $z \\in S^{1}$ 时 $r(z) = z$。于是 $r : \\overline{\\mathbb{D}} \\to S^{1}$ 是**收缩**' +
          '（$r|_{S^{1}} = \\mathrm{id}$）。',
        '',
        '现在看闭曲线 $\\gamma(t) := e^{2\\pi i t}$（$t \\in [0,1]$）。一方面 $r \\circ \\gamma$ 的像落在 $S^{1}$ 里，' +
          '而 $S^{1}$ 上的闭曲线由 $t \\mapsto (r\\circ\\gamma)(t)/|(r\\circ\\gamma)(t)|$ 给出……更干脆地用绕数：' +
          '$\\gamma$ 绕 $0$ 的绕数是 $1$；$r \\circ \\gamma$ 与 $\\gamma$ 在 $\\mathbb{C}\\setminus\\{0\\}$ 中同伦' +
          '（$H(s,t) := r((1-s)\\gamma(t) + s\\, r(\\gamma(t)))$……这个同伦不可用，改用下面的口径）：',
        '',
        '⭐ **标准口径**：$r \\circ \\gamma$ 是 $S^{1}$ 上的闭曲线，且 $r$ 把整个圆盘映进 $S^{1}$，' +
          '故 $r \\circ \\gamma$ 在 $S^{1}$ 内可缩为常值（同伦 $H(s,t) = r((1-s)\\gamma(t))$ 的像始终在 $S^{1}$ 内，' +
          '而 $S^{1}$ 不是单连通的……）。**这一句需要拓扑输入**，纯复分析的严格版本走的是另一条路：',
        '',
        '**改用辐角原理的版本**：若有连续无处为零的 $r : \\overline{\\mathbb{D}} \\to S^{1}$ 且 $r|_{S^{1}} = \\mathrm{id}$，' +
          '则由 `prop.single-valued-branch`（$\\mathbb{D}$ 单连通），$r$ 有全纯的对数型提升——但 $r$ 只是连续，不是全纯。' +
          '所以复分析路线实际证的是**全纯**版本（$f$ 全纯时用 Rouché：$f(z) - z$ 与 $-z$ 在 $|z| = 1$ 上比较，' +
          '$|f| \\le 1 = |{-z}|$，边界上不能有零点，故 $f - z$ 与 $-z$ 在圆盘内零点数相同，即至少一个）。',
        '',
        '⚠️ **诚实标注**：连续版本的 Brouwer 定理**不能**只靠复分析得到 —— 需要拓扑（$S^{1}$ 不是收缩核，' +
          '即 $\\pi_{1}(S^{1}) = \\mathbb{Z} \\ne 0$）。本图把这条记作「绕数同伦不变性 + $\\pi_1(S^1)\\ne 0$」的推论，' +
          '证明骨架给到这里，深层输入（基本群）不在本图范围内。全纯版本见下方边上的证明。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Brouwer 不动点定理的复分析证明（全纯情形）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 5 §3 · Brouwer’s Fixed-Point Theorem',
        'Hatcher, Algebraic Topology, §1.1 · 基本群（圆周的基本群是 ℤ，用覆叠空间证）；§2.2 · Brouwer 不动点定理',
      ],
    },
    {
      id: 'thm.borsuk-ulam',
      type: 'theorem',
      label: 'Borsuk–Ulam 定理（二维）',
      title: 'Borsuk–Ulam 定理：$S^{2} \\to \\mathbb{R}^{2}$ 必有对径点同值',
      cluster: 'analysis.topology-app',
      regions: ['complex'],
      tags: ['复变函数', '拓扑', 'Borsuk-Ulam', '对径点'],
      statement: [
        '对每个连续映射 $f : S^{2} \\to \\mathbb{R}^{2}$，存在 $x \\in S^{2}$ 使',
        '',
        '$$f(x) = f(-x).$$',
        '',
        '等价说法：不存在连续奇映射（$g(-x) = -g(x)$）$g : S^{2} \\to S^{1}$。',
      ].join('\n'),
      notes: [
        '**与 Brouwer 的关系**：二维 Borsuk–Ulam 可以由 Brouwer 不动点定理推出（反之亦然）。' +
          '标准推法：若 $f(x) \\ne f(-x)$ 处处成立，令',
        '',
        '$$g(x) := \\frac{f(x) - f(-x)}{|f(x) - f(-x)|} \\in S^{1},$$',
        '',
          '则 $g$ 连续且 $g(-x) = -g(x)$。再把 $g$ 限制到赤道 $S^{1} \\subset S^{2}$ 上得到一个连续奇映射 ' +
          '$S^{1} \\to S^{1}$，它的**度**必须是奇数（奇映射的度 $\\equiv 1 \\bmod 2$）；' +
          '但奇映射 $S^{1} \\to S^{1}$ 又可延拓到上半球面，而可延拓的映射度为 $0$ —— 矛盾。',
        '',
        '⭐ **直觉**：地球上任何时刻总有一对对径点温度与气压都相同。这句话是 Borsuk–Ulam 的 $n = 2$ 情形，' +
          '不是比喻，是定理。',
        '',
        '⚠️ 维数不能乱降：$S^{1} \\to \\mathbb{R}^{1}$ 的对应命题成立（中间值定理），' +
          '但 $S^{1} \\to \\mathbb{R}^{2}$ 不成立（恒等映射没有对径同值点）。',
      ].join('\n'),
      refs: [
        'Borsuk (1933), Drei Sätze über die n-dimensionale euklidische Sphäre',
        'Hatcher, Algebraic Topology, §2.2 · Borsuk–Ulam Theorem',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 5 §3 · 习题（由 Brouwer 推出）',
      ],
    },
    {
      id: 'thm.ham-sandwich',
      type: 'theorem',
      label: '火腿三明治定理',
      title: '火腿三明治定理：一个平面同时平分三块体',
      cluster: 'analysis.topology-app',
      regions: ['complex'],
      tags: ['复变函数', '拓扑', '应用', '火腿三明治', 'Borsuk-Ulam'],
      statement: [
        '设 $A_{1}, A_{2}, A_{3} \\subset \\mathbb{R}^{3}$ 是**有界可测**集（三块「火腿、奶酪、面包」）。' +
          '则存在一个平面 $P$，使每个 $A_{i}$ 的体积被 $P$ 两侧**平分**：',
        '',
        '$$\\operatorname{vol}\\left(A_{i} \\cap P^{+}\\right) = \\operatorname{vol}\\left(A_{i} \\cap P^{-}\\right)$$',
        '',
        '对 $i = 1, 2, 3$ 同时成立。',
        '',
        '一般地：$\\mathbb{R}^{n}$ 中任意 $n$ 块有界可测集可被一个超平面同时平分。',
      ].join('\n'),
      notes: [
        '**证明（由 Borsuk–Ulam）**：平面由单位法向 $u \\in S^{2}$ 与偏移 $t \\in \\mathbb{R}$ 决定，记 ' +
          '$P(u, t) := \\{\\, x : \\langle x, u\\rangle = t \\,\\}$。对固定 $u$，函数 $t \\mapsto \\operatorname{vol}(A_{i} \\cap ' +
          '\\{\\langle x, u\\rangle \\le t\\})$ 连续、从 $0$ 增到 $\\operatorname{vol}(A_{i})$，故存在唯一的 $t_{i}(u)$ 平分 $A_{i}$；' +
          '且 $t_{i}(-u) = -t_{i}(u)$（法向反向，平面不变而「正侧」互换）。',
        '',
        '于是 $u \\mapsto (t_{1}(u) - t_{3}(u),\\ t_{2}(u) - t_{3}(u)) \\in \\mathbb{R}^{2}$ 是连续映射，' +
          '由 **Borsuk–Ulam**（`thm.borsuk-ulam`），存在 $u$ 使 $f(u) = f(-u) = -f(u)$，即 $f(u) = 0$，' +
          '也就是 $t_{1}(u) = t_{2}(u) = t_{3}(u)$ —— 同一个平面同时平分三块。∎',
        '',
        '⭐ **它是本图最靠外的「应用端」**：辐角原理 $\to$ 绕数 $\to$ Brouwer $\to$ Borsuk–Ulam $\to$ 火腿三明治，' +
          '一条链把「数零点」和「切三明治」接了起来。这类跨尺度连接正是把图画成星图的理由。',
        '',
        '⚠️ 可测性不能省：不可测集上「体积」本身没定义。⚠️ 只对**有限**块数、维数匹配的情形成立；' +
          '四块体在 $\\mathbb{R}^{3}$ 中一般不能用一个平面同时平分。',
      ].join('\n'),
      refs: [
        'Borsuk–Ulam 的标准推论；见 Matoušek, Using the Borsuk–Ulam Theorem, Ch. 1',
        'Hatcher, Algebraic Topology, §2.2 · 应用举例',
      ],
    },
  ],

  edges: [
    /* ---- §A 初等函数链 ---- */
    { kind: 'implication', sources: ['def.holomorphic'], target: 'def.complex-elementary',
      title: '幂级数在全平面收敛 $\implies$ 逐项求导 $\implies$ 全纯',
      proof: [
        '三个定义式都是收敛半径 $\\infty$ 的幂级数（$e^{z}$ 的系数 $1/n!$ 使 ' +
          '$\\limsup |1/n!|^{1/n} = 0$；$\\cos, \\sin$ 由 $e^{iz}$ 组合而来）。',
        '',
        '幂级数在收敛圆内可逐项求导且收敛半径不变，所以 $e^{z}$、$\\cos z$、$\\sin z$ 在每点的某邻域内' +
          '等于一个收敛幂级数 —— 按 `def.holomorphic` 的等价刻画，这就是全纯。∎',
      ].join('\n'),
      note: '这一步把「初等函数」正式接进复分析：它们不是新公理，而是幂级数。' },

    { kind: 'implication', sources: ['def.complex-elementary'], target: 'prop.exp-local-inverse',
      title: '$\\exp\' = \\exp \\ne 0$ $\implies$ 局部双全纯',
      proof: [
        '由逐项求导 $(e^{z})\' = \\sum_{n \\ge 1} n z^{n-1}/n! = \\sum_{m \\ge 0} z^{m}/m! = e^{z}$。',
        '',
        '因 $e^{z} \\ne 0$（$e^{z} e^{-z} = 1$），导数处处非零。复版反函数定理：$f\'(z_{0}) \\ne 0$ 时 ' +
          '$f$ 在 $z_{0}$ 的某邻域内双全纯、逆全纯且 $(f^{-1})\'(w) = 1/f\'(f^{-1}(w))$。' +
          '把 $f = \\exp$ 代进去即得局部逆；逆的显式形式由 Euler 公式解 $e^{x+iy} = w$ 得到。∎',
      ].join('\n'),
      note: '局部逆永远存在 —— 缺的只是「能不能整体拼起来」，那由 `prop.single-valued-branch` 回答。' },

    { kind: 'implication', sources: ['def.branch', 'prop.exp-local-inverse'], target: 'prop.single-valued-branch',
      title: '把局部逆沿曲线拼接：单值支的判据',
      proof: [
        '**定义对齐**：`def.branch` 把「多值函数」定义成「每点一个值集」，本节点的单值支就是它的连续选取。',
        '',
        '**判据（1 $\implies$ 3）**：若 $e^{f} = z$，则 $f\' = 1/z$，于是沿任何闭曲线 ' +
          '$\\oint \\mathrm{d}z/z = \\oint f\'\\mathrm{d}z = f(\\gamma(1)) - f(\\gamma(0)) = 0$。',
        '',
        '**（3 $\implies$ 2）**：条件 3 说明积分与路径无关，故 $f(z) := \\int_{z_{0}}^{z} \\mathrm{d}\\zeta/\\zeta$ 是单值的，' +
          '且 $f\' = 1/z$。',
        '',
        '**（2 $\implies$ 1）**：取这样的 $f$，则 $(z e^{-f})\' = e^{-f} - z e^{-f} \\cdot (1/z) = 0$，' +
          '故 $z e^{-f} \\equiv c \\ne 0$；令 $f_{1} := f + \\log c$（任取一个复对数值）即得 $e^{f_{1}} = z$。∎',
      ].join('\n'),
      note: '局部逆（上一节点）负责「处处能拼一小段」，这一节点负责「整圈拼回来不跳」—— 缺的正是绕数条件。' },

    /* ---- §B 绕数链 ---- */
    { kind: 'implication', sources: ['def.winding-number', 'def.contour-integral'], target: 'prop.winding-integral',
      title: '绕数 = $\\frac{1}{2\\pi i}\\oint \\mathrm{d}z/(z-a)$',
      proof: [
        '平移使 $a = 0$。令 $\\varphi(t) := \\int_{0}^{t} \\gamma\'(s)/\\gamma(s)\\,\\mathrm{d}s$。则',
        '',
        '$$\\frac{\\mathrm{d}}{\\mathrm{d}t}\\left(\\gamma(t)e^{-\\varphi(t)}\\right) = e^{-\\varphi}\\left(\\gamma\' - \\varphi\'\\gamma\\right) = 0,$$',
        '',
        '故 $\\gamma(t)e^{-\\varphi(t)} \\equiv \\gamma(0)$，即 $e^{\\varphi(t)} = \\gamma(t)/\\gamma(0)$。' +
          '取 $t = 1$：$\\gamma(1) = \\gamma(0)$ 给出 $e^{\\varphi(1)} = 1$，于是 $\\varphi(1) \\in 2\\pi i\\mathbb{Z}$。',
        '',
        '$\\varphi(1) = \\oint_{\\gamma}\\mathrm{d}z/z$，而 $\\varphi(1)/(2\\pi i)$ 关于 $a$ 连续、取整数值、' +
          '且在 $a$ 远离曲线时等于 $0$ —— 正是 `def.winding-number` 里那个「绕几圈」的整数。∎',
      ].join('\n'),
      note: '几何量换成积分，是后面辐角原理能算零点个数的技术前提。' },

    { kind: 'implication', sources: ['prop.winding-integral', 'def.contour-integral'], target: 'thm.winding-homotopy',
      title: '同伦 $\implies$ 绕数不变（连续性 + 整数值）',
      proof: [
        '设 $H : [0,1]^{2} \\to \\mathbb{C}\\setminus\\{a\\}$ 给出同伦，$\\gamma_{s} := H(s, \\cdot)$。',
        '',
        '由 `prop.winding-integral`，$N(s) := n(\\gamma_{s}, a) = \\frac{1}{2\\pi i}\\oint_{\\gamma_{s}}' +
          '\\frac{\\mathrm{d}z}{z-a}$。被积函数在 $\\mathbb{C}\\setminus\\{a\\}$ 上全纯、有界（$H$ 的像紧且不碰 $a$），' +
          '而 $\\gamma_{s}$ 及其导数关于 $s$ 连续（$H$ 光滑），故 $N$ 连续。',
        '',
        '$N$ 取整数值而 $[0,1]$ 连通，连续整值函数必为常数，于是 $N(0) = N(1)$。' +
          '把「$\\oint f\\,\\mathrm{d}z$ 沿同伦不变」也照此办：对 $s$ 求导得零。∎',
      ].join('\n'),
      note: '复分析与拓扑之间的第一根铰链：围道积分只看同伦类。' },

    /* ---- §C 零点/唯一性 ---- */
    { kind: 'implication', sources: ['thm.taylor-complex'], target: 'prop.zero-isolated',
      title: 'Taylor 展开的首次非零项 $\implies$ 零点的阶',
      proof: [
        '把 $f$ 在 $z_{0}$ 处展开：$f(z) = \\sum_{n \\ge 1} a_{n}(z - z_{0})^{n}$（$f(z_{0}) = 0$ 故常数项为零）。',
        '',
        '$f$ 不恒为零 $\implies$ 某个 $a_{n} \\ne 0$，取最小的 $m \\ge 1$ 使 $a_{m} \\ne 0$。则',
        '',
        '$$f(z) = (z - z_{0})^{m}\\underbrace{\\left(a_{m} + a_{m+1}(z - z_{0}) + \\cdots\\right)}_{=: g(z)},\\qquad g(z_{0}) = a_{m} \\ne 0.$$',
        '',
        '括号内的级数收敛半径与 $f$ 相同，故 $g$ 在 $z_{0}$ 附近全纯。由 $g(z_{0}) \\ne 0$ 与连续性，' +
          '$g$ 在某个 $B(z_{0}, \\rho)$ 内处处非零，于是 $f$ 在该邻域内只在 $z_{0}$ 处为零 —— 零点孤立。∎',
      ].join('\n'),
      note: '这一条是「唯一性定理」与「辐角原理按阶数零点」的共同前提。' },

    { kind: 'implication', sources: ['prop.zero-isolated'], target: 'thm.identity',
      title: '零点孤立 + 区域连通 $\implies$ 恒等',
      proof: [
        '令 $h := f - g$，$Z$ 为 $h$ 的零点集，$z^{*} \\in \\Omega$ 是 $Z$ 的聚点。由连续性 $h(z^{*}) = 0$。',
        '',
        '若 $h$ 在 $z^{*}$ 附近不恒为零，则 `prop.zero-isolated` 说 $z^{*}$ 是孤立零点 —— 与「是聚点」矛盾。' +
          '故存在 $r > 0$ 使 $h \\equiv 0$ 于 $B(z^{*}, r)$。',
        '',
        '令 $A := \\{\\, z \\in \\Omega : h \\equiv 0 \\text{ 于 } z \\text{ 的某邻域} \\,\\}$。按定义 $A$ 开、且非空（含 $z^{*}$）。' +
          '$A$ 也闭：若 $z_{n} \\in A$、$z_{n} \\to z \\in \\Omega$，则 $h$ 在 $z$ 的某邻域内被诸 $z_{n}$ 的邻域覆盖而恒为零。' +
          '区域连通 $\implies$ $A = \\Omega$，即 $h \\equiv 0$。∎',
      ].join('\n'),
      note: '解析延拓的合法性来源：有聚点就够了。' },

    { kind: 'implication', sources: ['thm.laurent', 'def.isolated-singularity', 'thm.riemann-removable'],
      target: 'thm.casorati-weierstrass',
      title: '反证：像集漏一个圆盘 $\implies$ 奇点可去 $\implies$ 矛盾',
      proof: [
        '设存在 $w_{0}$, $\\rho > 0$ 使 $f(U) \\cap B(w_{0}, \\rho) = \\emptyset$，其中 $U$ 是 $z_{0}$ 的去心邻域。',
        '',
        '令 $F(z) := 1/(f(z) - w_{0})$，则 $|F| < 1/\\rho$ 在 $U$ 上有界。' +
          '由 `thm.riemann-removable`，$z_{0}$ 是 $F$ 的可去奇点，$F$ 延拓成 $z_{0}$ 邻域上的全纯函数。',
        '',
        '于是 $f = w_{0} + 1/F$ 在 $z_{0}$ 附近：若 $F(z_{0}) \\ne 0$ 则 $f$ 全纯；' +
          '若 $F$ 在 $z_{0}$ 有 $m$ 阶零点则 $f$ 有 $m$ 阶极点；$F \\equiv 0$ 不可能（$F$ 是倒数）。' +
          '三种情形都与「$z_{0}$ 本性奇点」矛盾，故 $f(U)$ 稠密。∎',
      ].join('\n'),
      note: '证明的力量全在「有界 $\implies$ 可去」这一句。' },

    /* ---- §D 收敛与正规族 ---- */
    { kind: 'implication', sources: ['thm.morera'], target: 'thm.weierstrass-convergence',
      title: 'Morera 判极限全纯；Cauchy 公式判导数收敛',
      proof: [
        '**全纯性**：设 $T \\subset \\Omega$ 是闭三角形。每个 $f_{k}$ 全纯，故 $\\oint_{\\partial T} f_{k}\\,\\mathrm{d}z = 0$' +
          '（`thm.cauchy-goursat`）。$\\partial T$ 紧、$f_{k} \\to f$ 在其上一致，故',
        '',
        '$$\\oint_{\\partial T} f\\,\\mathrm{d}z = \\lim_{k \\to \\infty}\\oint_{\\partial T} f_{k}\\,\\mathrm{d}z = 0.$$',
        '',
        '由 `thm.morera`，$f$ 全纯。',
        '',
        '**导数**：取 $z \\in K$ 与 $r = \\operatorname{dist}(K, \\partial\\Omega)/2$，用 Cauchy 公式对 $f_{k}^{(m)} - f^{(m)}$ 积分，' +
          '得上界 $\\frac{m!}{r^{m}}\\sup_{|\\zeta - z| \\le r}|f_{k} - f|$，与 $z$ 无关，故一致收敛。∎',
      ].join('\n'),
      note: '「全纯在一致收敛下封闭」—— 正规族理论的地基。' },

    { kind: 'implication', sources: ['thm.bolzano-weierstrass', 'def.uniform-convergence'],
      target: 'thm.arzela-ascoli',
      title: '对角线段 + 有限 ε-网 $\implies$ 一致收敛子列',
      proof: [
        '取可数稠密集 $\\{x_{1}, x_{2}, \\ldots\\} \\subset X$（紧距离空间可分）。' +
          '一致有界 $\implies$ $\\{f_{n}(x_{1})\\}$ 有界，由 Bolzano–Weierstrass 取收敛子列；' +
          '在这个子列里再取使 $\\{f_{n}(x_{2})\\}$ 收敛的子列；如此下去，取对角线 $g_{k}$，' +
          '则 $g_{k}(x_{j})$ 对每个 $j$ 收敛。',
        '',
        '给定 $\\varepsilon > 0$，等度连续性给出 $\\delta$；用有限个 $B(x_{j}, \\delta)$（$j \\le N$）盖住 $X$。' +
          '取 $K$ 使 $k, l \\ge K$ 时 $|g_{k}(x_{j}) - g_{l}(x_{j})| < \\varepsilon$（$j \\le N$）。' +
          '对任意 $x$ 取 $j \\le N$ 使 $d(x, x_{j}) < \\delta$，则',
        '',
        '$$|g_{k}(x) - g_{l}(x)| \\le |g_{k}(x) - g_{k}(x_{j})| + |g_{k}(x_{j}) - g_{l}(x_{j})| + |g_{l}(x_{j}) - g_{l}(x)| < 3\\varepsilon.$$',
        '',
        '故 $g_{k}$ 一致 Cauchy，收敛。∎',
      ].join('\n'),
      note: '等度连续性把「逐点收敛」升级成「一致收敛」—— 这正是全纯族免费得到的东西。' },

    { kind: 'implication', sources: ['thm.arzela-ascoli', 'thm.weierstrass-convergence', 'thm.cauchy-inequality'],
      target: 'thm.montel',
      title: 'Cauchy 不等式给出导数界 $\implies$ 等度连续 $\implies$ 对角取子列',
      proof: [
        '取紧集穷竭 $K_{1} \\subset K_{2} \\subset \\cdots$。设在 $K_{j}$ 的 $r_{j}$-邻域上 $|f| \\le M_{j}$（由局部一致有界性，' +
          '紧集上有限覆盖可得）。`thm.cauchy-inequality` 给出',
        '',
        '$$|f\'(z)| \\le \\frac{M_{j}}{r_{j}},\\qquad z \\in K_{j},\\ f \\in \\mathcal{F},$$',
        '',
        '右端与 $f$ 无关 $\implies$ $\\mathcal{F}|_{K_{j}}$ 等度连续；又一致有界。由 `thm.arzela-ascoli`，' +
          '它在 $K_{j}$ 上有一致收敛子列。对 $j = 1, 2, \\ldots$ 逐层取对角线，得到在每个 $K_{j}$ 上一致收敛的子列，' +
          '即内闭一致收敛。极限全纯由 `thm.weierstrass-convergence`。∎',
      ].join('\n'),
      note: 'Montel = Arzelà–Ascoli + Cauchy 不等式：复分析里「有界」自动变成「等度连续」。' },

    /* ---- §E 单叶与映射 ---- */
    { kind: 'implication', sources: ['thm.rouche', 'thm.max-modulus'], target: 'thm.open-mapping',
      title: 'Rouché 数零点 $\implies$ 像含小圆盘 $\implies$ 开映射',
      proof: [
        '取 $z_{0} \\in \\Omega$、$w_{0} = f(z_{0})$，平移使 $w_{0} = 0$。由 `prop.zero-isolated`，' +
          '$z_{0}$ 是孤立零点，取 $\\rho > 0$ 使 $f$ 在 $0 < |z - z_{0}| \\le \\rho$ 上无零点，令 ' +
          '$\\delta := \\min_{|z - z_{0}| = \\rho}|f(z)| > 0$。',
        '',
        '任取 $|w| < \\delta$。在圆周 $|z - z_{0}| = \\rho$ 上，$|f(z)| \\ge \\delta > |w| = |{-w}|$，' +
          '故按 **Rouché 定理**（`thm.rouche`），$f$ 与 $f + w$ 在圆内零点个数相同。' +
          '$f$ 在圆内有零点（$z_{0}$，$m$ 阶），故 $f + w$ 也有零点 $z$，即 $f(z) = -w$。',
        '',
          '于是 $B(0, \\delta) \\subseteq f(\\Omega)$，任一像点是内点 $\implies$ $f$ 开。∎' +
          '\n\n（`thm.max-modulus` 作为第二前提：它给出「$|f|$ 在内部无最大」，与开映射互为等价形式，' +
          '这里作为「非常数」的独立刻画一并挂上。）',
      ].join('\n'),
      note: '开映射 = 非常数全纯函数不能把开集压扁。' },

    { kind: 'implication', sources: ['thm.montel', 'thm.hurwitz', 'lem.schwarz'], target: 'thm.riemann-mapping',
      title: '正规族 + 极值元 + 平方根技巧：映满圆盘',
      proof: [
        '**族不空**：因 $\\Omega \\ne \\mathbb{C}$，取 $a \\notin \\Omega$；$\\Omega$ 单连通 $\implies$ $\\sqrt{z - a}$ 有全纯单值支' +
          '（`prop.single-valued-branch`）。它单叶（$\\sqrt{z_{1}} = \\pm\\sqrt{z_{2}} \\implies z_{1} = z_{2}$），' +
          '再复合分式线性变换（`def.mobius`）搬进 $\\mathbb{D}$ 并把 $z_{0}$ 送到 $0$。故 ' +
          '$\\mathcal{F} = \\{\\varphi \\text{ 单叶全纯}, \\varphi(z_{0}) = 0, \\varphi(\\Omega) \\subset \\mathbb{D}\\}$ 非空。',
        '',
        '**极值元存在**：Cauchy 不等式给出 $|\\varphi\'(z_{0})| \\le 1/\\operatorname{dist}(z_{0}, \\partial\\Omega)$，' +
          '故 $s := \\sup |\\varphi\'(z_{0})| < \\infty$。取 $\\varphi_{n}$ 逼近 $s$；族一致有界于 $\\mathbb{D}$，' +
          '**Montel**（`thm.montel`）给出内闭一致收敛子列，极限 $f$ 全纯、$f(z_{0}) = 0$、$|f\'(z_{0})| = s$。',
        '',
        '**极限仍单叶**：若 $f(z_{1}) = f(z_{2})$（$z_{1} \\ne z_{2}$），考虑 $f - f(z_{1})$，它在 $z_{1}$ 处有零点；' +
          '由 **Hurwitz**（`thm.hurwitz`），$\\varphi_{n} - f(z_{1})$ 对大的 $n$ 也在 $z_{1}$ 附近有零点，' +
          '结合 $\\varphi_{n}(z_{2}) \\to f(z_{2}) = f(z_{1})$ 得 $\\varphi_{n}$ 取重值，矛盾。',
        '',
        '**满射**：若漏掉 $w_{1} \\in \\mathbb{D}$，令 $\\psi_{0}$ 是 $\\mathbb{D}$ 的自同构把 $w_{1}$ 送到 $0$，' +
          '取 $\\sqrt{\\psi_{0} \\circ f}$ 的分支 $h$（$0 \\notin$ 像保证可取），再令 $\\psi := \\psi_{1} \\circ h$ 把 $h(z_{0})$ 送回 $0$。' +
          '计算给出 $|\\psi\'(z_{0})| = |f\'(z_{0})|\\cdot\\frac{1 + |w_{1}|}{2\\sqrt{|w_{1}|}} > s$，与 $s$ 的极大性矛盾。',
        '',
        '**唯一性**：若 $f, g$ 都满足条件，则 $g \\circ f^{-1} : \\mathbb{D} \\to \\mathbb{D}$ 固定 $0$、导数正实数，' +
          '由 **Schwarz 引理**（`lem.schwarz`）为恒等。∎',
      ].join('\n'),
      note: '本图里最深的一条；证明的三根支柱（Montel / Hurwitz / Schwarz）都各自是独立节点。' },

    { kind: 'implication', sources: ['thm.riemann-mapping', 'thm.schwarz-pick'], target: 'prop.poincare-disk',
      title: '圆盘上的度量、等距群 = 自同构，Schwarz–Pick 是等距性',
      proof: [
        '**拉回计算**：设 $\\varphi : \\mathbb{D} \\to \\mathbb{D}$ 全纯，Poincaré 度量沿 $\\varphi$ 拉回的系数为 ' +
          '$\\frac{4|\\varphi\'(z)|^{2}}{(1 - |\\varphi(z)|^{2})^{2}}$，与原度量之比恰是 ' +
          '$\\left(\\frac{|\\varphi\'(z)|}{1 - |\\varphi(z)|^{2}}\\Big/\\frac{1}{1 - |z|^{2}}\\right)^{2}$。',
        '',
        '**Schwarz–Pick**（`thm.schwarz-pick`）说这个比值 $\\le 1$，即 $\\varphi$ 不放大双曲长度；' +
          '等号成立时 $\\varphi$ 是自同构。故「双全纯 $\\mathbb{D} \\to \\mathbb{D}$」$=$「Poincaré 度量的等距」。',
        '',
        '**曲率**：在度量 $\\lambda^{2}|\\mathrm{d}z|^{2}$（$\\lambda = 2/(1-|z|^{2})$）下，Gauss 曲率为 ' +
          '$K = -\\lambda^{-2}\\Delta \\log \\lambda$；代入 $\\log\\lambda = \\log 2 - \\log(1 - |z|^{2})$ 与 ' +
          '$\\Delta = 4\\partial_{z}\\partial_{\\bar z}$ 得 $K \\equiv -1$。',
        '',
        '**任意单连通真区域**：由 `thm.riemann-mapping` 取双全纯 $f : \\Omega \\to \\mathbb{D}$，把度量拉回即可；' +
          '双全纯不改变曲率，故 $\\Omega$ 上也有曲率 $-1$ 的完备度量。∎',
      ].join('\n'),
      note: '三种常曲率几何的入口：圆盘 = 双曲，球面 = 椭圆，平面 = 欧氏。' },

    /* ---- §F 拓扑应用 ---- */
    { kind: 'implication', sources: ['thm.winding-homotopy', 'thm.rouche'], target: 'thm.brouwer-fixed-point',
      title: '全纯情形：Rouché 直接给不动点；连续情形另需 $\\pi_{1}(S^{1}) \\ne 0$',
      proof: [
        '**全纯情形**（本图能严格给出的部分）：设 $f : \\overline{\\mathbb{D}} \\to \\overline{\\mathbb{D}}$ 全纯。' +
          '在 $|z| = 1$ 上 $|f(z)| \\le 1 = |z|$，且 $f(z) - z = 0$ 与 $z = 0$ 不能同时成立，故 $f - z$ 在边界上无零点。' +
          '由 **Rouché**（`thm.rouche`）比较 $f - z$ 与 $-z$：后者在 $\\mathbb{D}$ 内恰有一个零点，' +
          '故 $f - z$ 也恰有一个零点，即不动点存在（且唯一）。',
        '',
        '**连续情形**：用 `thm.winding-homotopy` —— 若无不动点，射线投影给出收缩 $r : \\overline{\\mathbb{D}} \\to S^{1}$；' +
          '于是 $\\gamma(t) = e^{2\\pi i t}$ 与常值曲线 $r(\\gamma(0))$ 在 $S^{1}$ 内同伦，' +
          '由同伦不变性两者绕数相同，但一个绕数是 $1$、另一个是 $0$ —— 矛盾。',
        '',
          '⚠️ 这一步用到「$S^{1}$ 中非零绕数的闭曲线不能缩成一点」，等价于 $\\pi_{1}(S^{1}) = \\mathbb{Z} \\ne 0$。' +
          '本图把它记作外部输入，不假装是复分析的产物。∎',
      ].join('\n'),
      note: '节点正文里已如实标注：连续版需要基本群，纯复分析只给出全纯版。' },

    { kind: 'implication', sources: ['thm.brouwer-fixed-point'], target: 'thm.borsuk-ulam',
      title: '反证：奇映射的度既是奇数又必须是 0',
      proof: [
        '设连续 $f : S^{2} \\to \\mathbb{R}^{2}$ 满足 $f(x) \\ne f(-x)$ 处处成立。令',
        '',
        '$$g(x) := \\frac{f(x) - f(-x)}{|f(x) - f(-x)|} \\in S^{1},$$',
        '',
        '则 $g$ 连续且 $g(-x) = -g(x)$（奇映射）。',
        '',
        '**第一步**：把 $g$ 限制到赤道 $S^{1} \\subset S^{2}$，得连续奇映射 $\\bar g : S^{1} \\to S^{1}$。' +
          '奇映射在 $S^{1}$ 上的**度**必为奇数：由 $\\bar g(e^{i(t+\\pi)}) = -\\bar g(e^{it})$ 可提升为 ' +
          '$\\theta(t + \\pi) = \\theta(t) + \\pi + 2k\\pi$，故 $\\theta(t + 2\\pi) = \\theta(t) + 2\\pi + 4k\\pi$，度为 $1 + 2k$。',
        '',
        '**第二步**：$\\bar g$ 可延拓到上半球面（$g$ 本来就定义在整个 $S^{2}$ 上），' +
          '而可延拓到圆盘上的映射度为 $0$（延拓给出同伦到常值）。',
        '',
        '两步矛盾（奇数 $\ne$ 0），故必有 $x$ 使 $f(x) = f(-x)$。∎',
      ].join('\n'),
      note: 'Borsuk–Ulam 与 Brouwer 是同一枚硬币的两面；这里走「度」这条线。' },

    { kind: 'implication', sources: ['thm.borsuk-ulam'], target: 'thm.ham-sandwich',
      title: '法向—偏移参数化 + Borsuk–Ulam $\implies$ 同一个平面平分三块',
      proof: [
        '平面写作 $P(u, t) = \\{\\, x : \\langle x, u\\rangle = t \\,\\}$，$u \\in S^{2}$，$t \\in \\mathbb{R}$。',
        '',
        '**对固定 $u$**：$t \\mapsto \\operatorname{vol}(A_{i} \\cap \\{\\langle x, u\\rangle \\le t\\})$ 连续、单调、' +
          '从 $0$ 到 $\\operatorname{vol}(A_{i})$，故存在（不唯一时取最小的）$t_{i}(u)$ 使两侧体积相等。' +
          '又 $t_{i}(-u) = -t_{i}(u)$：法向反向时「正侧」互换，而平分平面本身不变。',
        '',
        '**取差**：$F(u) := (t_{1}(u) - t_{3}(u),\\ t_{2}(u) - t_{3}(u))$ 连续，且 $F(-u) = -F(u)$（奇）。' +
          '由 **Borsuk–Ulam**（`thm.borsuk-ulam`），存在 $u$ 使 $F(u) = F(-u) = -F(u)$，故 $F(u) = 0$，' +
          '即 $t_{1}(u) = t_{2}(u) = t_{3}(u)$。同一个平面 $P(u, t_{1}(u))$ 平分三块。∎',
      ].join('\n'),
      note: '整条链的终点：从「数零点」一路推到「切三明治」。' },

    { kind: 'implication', sources: ['prop.winding-integral'], target: 'thm.argument-principle',
      title: '绕数的积分表示 $\implies$ 辐角原理',
      proof: [
        '设 $f$ 在 $\\gamma$ 内部及 $\\gamma$ 上全纯、边界上无零点。则 $f\'/f$ 全纯，且',
        '',
        '$$\\frac{1}{2\\pi i}\\oint_{\\gamma}\\frac{f\'(z)}{f(z)}\\,\\mathrm{d}z = \\sum_{j} m_{j}\\, n(\\gamma, z_{j}),$$',
        '',
        '其中 $z_{j}$ 是 $f$ 在 $\\gamma$ 内部的零点、$m_{j}$ 是阶。**右端就是绕数**：把 $f \\circ \\gamma$ 看成' +
          '一条绕 $0$ 的闭曲线，$\\frac{1}{2\\pi i}\\oint_{f\\circ\\gamma}\\frac{\\mathrm{d}w}{w} = n(f\\circ\\gamma, 0)$，' +
          '而换元 $w = f(z)$ 正好把左端变成这个积分。再用 `prop.winding-integral` 把它读成整数。∎',
      ].join('\n'),
      note: '这是「绕数」进入「数零点」的桥：把 $f$ 的零点个数算成 $f\\circ\\gamma$ 绕 $0$ 的圈数。' },

    /* ---- 粉红边：逻辑上真、但不属于建图顺序 ---- */
    { kind: 'implication', layer: false, sources: ['thm.rouche'], target: 'thm.argument-principle',
      title: '（推论）用 Rouché 反推辐角原理',
      proof: [
        '设 $f$ 在 $\\gamma$ 内部全纯、边界上无零点。对 $0 < \\lambda \\le 1$ 考虑 $f - \\lambda f = 0$…' +
          '更干净的走法：Rouché 定理的证明本身就用辐角原理，反过来也能把辐角原理当作 Rouché 的推论：' +
          '把 $f$ 写成 $f = g \\cdot \\prod (z - z_{j})^{m_{j}}$（$g$ 无零点），对 $g$ 用「无零点 $\implies$ 绕数为 $0$」，' +
          '逐项相加得到的正是辐角原理的右端。',
        '',
        '⭐ 这条**不参与分层**：建图时先有辐角原理、后有 Rouché；这条只是补一句「反推也成立」。',
      ].join('\n'),
      note: '粉红边：逻辑成立，但不是这张图的建造顺序。' },

    { kind: 'implication', layer: false, sources: ['thm.open-mapping'], target: 'lem.schwarz',
      title: '（推论）开映射定理 $\implies$ Schwarz 引理的等号情形',
      proof: [
        'Schwarz 引理的**等号情形**（$|f\'(0)| = 1$ $\implies$ $f$ 是旋转）可以由开映射定理 + 极值原理推出：' +
          '若 $f : \\mathbb{D} \\to \\mathbb{D}$、$f(0) = 0$ 且 $|f\'(0)| = 1$，则 $f$ 是开映射且不放大模长，' +
          '取逆（由单叶性与开映射得双全纯）再对 $f^{-1}$ 用同一条估计，两个不等式合起来逼出等号。',
        '',
        '⭐ 不参与分层：建图时 Schwarz 引理在最大模原理之后、开映射定理之前。',
      ].join('\n'),
      note: '粉红边：真推出，但反过来更自然 —— 只作补充线索。' },
  ],
});
