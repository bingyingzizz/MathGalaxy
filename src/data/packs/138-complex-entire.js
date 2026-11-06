/* ============================================================================
   内容包 · 复变函数（四）：解析延拓与整函数

   这一批接在「Cauchy 理论 → 留数 → 共形映射」之后，补的是书最后一章那类东西：
     §A 延拓：函数元素、沿曲线的延拓、单值性定理、Schwarz 反射、Runge 逼近
     §B 增长：整函数的阶、Jensen 公式
     §C 因子分解：Weierstrass 初等因子、Weierstrass 乘积、Hadamard 分解
     §D 值分布：Picard 小定理与大定理

   ⚠️ 诚实标注：Picard 两定理的**完整**证明要 Bloch 定理 / 模函数，本图不展开；
   节点正文与边上的证明给出「有限阶情形 + 关键一步 + 出处」，并明说是骨架。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '复变函数（四）· 解析延拓与整函数',

  nodes: [
    /* ---------------------------------------------------------------- §A */
    {
      id: 'def.analytic-continuation',
      type: 'definition',
      label: '解析延拓',
      title: '解析延拓：函数元素、沿曲线的延拓与完全解析函数',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', '解析延拓', '函数元素', '完全解析函数'],
      statement: [
        '**函数元素**是一个二元组 $(f, D)$：$D$ 是开圆盘，$f$ 在 $D$ 上全纯。',
        '',
        '设 $\\gamma : [0, 1] \\to \\mathbb{C}$ 是曲线，$\\gamma(0)$ 是某个元素 $(f_{0}, D_{0})$ 的圆心。' +
          '$\\gamma$ 上的一个**解析延拓链**是一族元素 $(f_{t}, D_{t})$（$t \\in [0,1]$），满足：',
        '',
        '1. $\\gamma(t)$ 是 $D_{t}$ 的圆心；',
        '2. 对每个 $t$ 存在 $\\delta > 0$，使 $|s - t| < \\delta$ 时 $D_{s} \\cap D_{t} \\ne \\emptyset$ 且' +
          '$f_{s} = f_{t}$ 在交集上；',
        '3. $f_{t}$ 关于 $t$ 连续（在重叠部分）。',
        '',
        '沿所有从 $\\gamma(0)$ 出发的曲线延拓出来的全部元素，把重叠的粘起来，得到的对象叫' +
          '**完全解析函数**（它一般是一个多值函数，落在 `def.riemann-surface` 那张曲面上）。',
      ].join('\n'),
      notes: [
        '**为什么需要「链」而不是「一个函数」**：延拓是一步一步做的 —— 每一步只把圆盘挪一点点，' +
          '在重叠处用唯一性定理保证两个元素是同一个函数的限制。链就是在把这件事连续化。',
        '',
        '⭐ **载体是幂级数**：每个元素都能在圆心处展开成收敛幂级数（`thm.taylor-complex`），' +
          '所以延拓也可以看成「沿着曲线不断换展开点」。收敛半径由到最近奇点的距离决定 —— ' +
          '碰到奇点，延拓就断了。',
        '',
        '⚠️ **延拓的结果依赖路径**。典型例子：$\\log z$ 从 $1$ 出发沿单位圆逆时针走一圈，' +
          '回到 $1$ 时值变成 $2\\pi i$。什么时候不依赖路径？这正是 `thm.monodromy` 回答的。',
        '',
        '📌 与 `def.logarithm-branch`、`def.branch` 的关系：那里的「分支」是延拓的**结果**，' +
          '这里给的是**过程**。同一个对象，两种讲法。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 解析延拓与完全解析函数',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §1 · Analytic Continuation',
        'Stein–Shakarchi, Complex Analysis, Ch. 5 §5.5 · Analytic continuation',
      ],
    },
    {
      id: 'thm.monodromy',
      type: 'theorem',
      label: '单值性定理',
      title: '单值性定理：单连通区域内沿同伦路径的延拓结果相同',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', '解析延拓', '单值性', '同伦', '单连通'],
      statement: [
        '设 $\\Omega \\subset \\mathbb{C}$ 是**单连通**区域，$(f, D)$ 是 $\\Omega$ 内某点的函数元素，' +
          '且 $f$ 能沿 $\\Omega$ 中每条曲线解析延拓。则存在 $\\Omega$ 上的**单值**全纯函数 $F$，' +
          '它在 $D$ 上与 $f$ 相同。',
        '',
        '等价说法：若 $\\gamma_{0}, \\gamma_{1}$ 是 $\\Omega$ 中从同一点出发、终点相同的两条曲线，' +
          '则在 $\\Omega$ 内同伦的它们给出**相同**的延拓终值。',
      ].join('\n'),
      notes: [
        '**证明思路**：把「同伦」看成一个连续族 $\\gamma_{s}$（$s \\in [0,1]$）。对每个 $s$，' +
          '沿 $\\gamma_{s}$ 延拓得到终点处的函数元素 $\\varphi(s)$。\n\n' +
          '由延拓的连续性，$\\varphi(s)$ 连续；而「两个元素在终点处相等」是闭条件（相等是极限保持的），所以 $\\{\\, s : \\varphi(s) = \\varphi(0) \\,\\}$既开又闭、且非空，于是全体 —— 即 $\\varphi(1) = \\varphi(0)$。\n\n' +
          '∎',
        '',
        '**为什么必须单连通**：$\\Omega = \\mathbb{C} \\setminus \\{0\\}$ 时，绕原点一圈与不走一圈不同伦，' +
          '$\\log$ 的延拓刚好差 $2\\pi i$ —— 单值性恰好在这里断掉。',
        '',
        '⭐ **它的用处**：把「沿路径延拓」升级成「区域上的单值函数」，于是 `prop.single-valued-branch` 里' +
          '「单连通 $\\implies$ 对数有单值支」就成了它的特例。反过来，它也解释了为什么多值函数的「分支」' +
          '只可能在**不单连通**的区域上出问题。',
        '',
        '⚠️ 前提「能沿每条曲线延拓」不能省：$\\sqrt{z}$ 在挖去一段割线的区域上当然能延拓，' +
          '但一旦曲线撞上奇点，链就断了。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 单值性定理（monodromy theorem）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §1.2 · The Monodromy Theorem',
      ],
    },
    {
      id: 'thm.schwarz-reflection',
      type: 'theorem',
      label: 'Schwarz 反射原理',
      title: 'Schwarz 反射原理：跨越实轴解析地延拓',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', '解析延拓', 'Schwarz 反射', '对称原理'],
      statement: [
        '设 $\\Omega$ 关于实轴对称，$\\Omega^{+} = \\Omega \\cap \\{\\, \\operatorname{Im} z > 0 \\,\\}$。' +
          '若 $f$ 在 $\\Omega^{+}$ 上全纯、在 $\\Omega \\cap \\mathbb{R}$ 上连续且取**实值**，' +
          '则 $f$ 能延拓成 $\\Omega$ 上的全纯函数 $F$，且',
        '',
        '$$F(\\bar z) = \\overline{F(z)}.$$',
        '',
        '（把「实轴」换成任意圆弧或直线，结论照着改：对称的两块区域用同一个公式互相反射。）',
      ].join('\n'),
      notes: [
        '**证明**：定义',
        '',
        '$$F(z) = \\begin{cases} f(z), & \\operatorname{Im} z > 0,\\\\ ' +
          '\\overline{f(\\bar z)}, & \\operatorname{Im} z < 0.\\end{cases}$$',
        '',
        '下半平面的 $F$ 是全纯的（共轭 + 再共轭，两次反全纯抵消）。剩下要证 $F$ 在实轴上全纯：' +
          '用 **Morera**（`thm.morera`）—— 取跨过实轴的闭三角形，上半部分用 $f$、下半部分用定义，' +
          '沿实轴那一段的积分由连续性取极限为零（$f$ 在实轴上实值，正负两侧抵消），故整条积分路径上为零。∎',
        '',
        '⭐ **它是「最省事的延拓工具」**：只要边界上「取实值」或「落在一条直线上」，就能白拿一半的延拓。' +
          '共形映射里把上半平面映成多边形的 Schwarz–Christoffel 公式、以及椭圆函数的对称性讨论都靠它。',
        '',
        '⚠️ 「边界上连续且实值」不能只要求「有极限」：必须**取实值**，否则反射出来的下半平面部分与上半对不上。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 对称原理与解析延拓',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 6 §2.2 · Schwarz’s Reflection Principle',
        'Stein–Shakarchi, Complex Analysis, Ch. 5 §5.5 · Reflection principle',
      ],
    },
    {
      id: 'thm.runge',
      type: 'theorem',
      label: 'Runge 逼近定理',
      title: 'Runge 逼近定理：没有洞的区域上，全纯函数可以用多项式逼近',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', 'Runge', '逼近', '有理函数', '解析延拓'],
      statement: [
        '设 $K \\subset \\mathbb{C}$ 是紧集，$f$ 在 $K$ 的某个邻域上全纯。' +
          '若 $\\mathbb{C} \\setminus K$ 连通（即 $K$ 没有洞），则对每个 $\\varepsilon > 0$ 存在**多项式** $p$，' +
          '使',
        '',
        '$$\\sup_{z \\in K} |f(z) - p(z)| < \\varepsilon.$$',
        '',
        '一般情形（$\\mathbb{C}\\setminus K$ 有洞）：$f$ 可以用**有理函数**逼近，' +
          '且这些有理函数的极点可以预先指定在 $\\mathbb{C}\\setminus K$ 的每个连通分支里各取一点。',
      ].join('\n'),
      notes: [
        '**证明**：分四步 —— ①把 $f$ 写成 $K$ 外一条「方格边界」上的 Cauchy 积分；②把积分离散成极点在 $K$ 外的有理函数；③把这些极点沿 $\\mathbb{C}\\setminus K$ 里的道路推到指定位置；④无洞时再推到无穷远，展开成多项式。',
        '**引理 A（Cauchy 表示）**：设 $K$ 紧、$V$ 是 $K$ 的开邻域、$f$ 在 $V$ 上全纯。则存在有限个闭正方形之并 $S$ 与它的正向边界 $\\Gamma = \\partial S$，使 $K \\subset \\operatorname{int} S,\\qquad S \\subset V,\\qquad f(z) = \\frac{1}{2\\pi i}\\int_{\\Gamma}\\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta\\quad(z\\in K).$ 证明：$d := \\operatorname{dist}(K,\\mathbb{C}\\setminus V) > 0$。取边长为 $h$ 的方格网，$h\\sqrt{2} < d$；令 $S$ 为所有与 $K$ 相交的闭方格之并。则 $K\\subset\\operatorname{int} S$，且 $S$ 的每点距 $K$ 不超过 $h\\sqrt{2} < d$，故 $S\\subset V$。把每个方格的边界逆时针定向后相加，公共边上的积分相消，得 $\\Gamma = \\partial S$。对 $z\\in K\\subset\\operatorname{int} S$，函数 $h(\\zeta) := (f(\\zeta)-f(z))/(\\zeta - z)$（在 $\\zeta = z$ 处补充定义为 $f\'(z)$）在 $S$ 的一个邻域上全纯，故在每个方格上用 Cauchy–Goursat（`thm.cauchy-goursat`）有 $\\int_{\\partial Q} h = 0$，相加得 $\\int_{\\Gamma} h = 0$。于是 $\\int_{\\Gamma}\\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta = f(z)\\int_{\\Gamma}\\frac{\\mathrm{d}\\zeta}{\\zeta - z} = 2\\pi i\\, f(z)\\,\\operatorname{Ind}_{\\Gamma}(z) = 2\\pi i\\,f(z),$ 末步用「有界区域正向边界在其内点的指数为 $1$」（指数在 $\\mathbb{C}\\setminus\\Gamma$ 的每个连通分支上为常数，且在无界分支为 $0$）。',
        '**第一步：离散化积分**。$\\Gamma$ 是紧集且 $\\Gamma\\cap K = \\emptyset$，故 $g(\\zeta,z) := f(\\zeta)/(\\zeta - z)$ 在 $\\Gamma\\times K$ 上连续，从而一致连续。把 $\\Gamma$ 的每条边等分成小段，小段长 $<\\delta$，取中点 $\\zeta_{j}$、增量 $\\Delta\\zeta_{j}$，作 Riemann 和 $R(z) := \\frac{1}{2\\pi i}\\sum_{j}\\frac{f(\\zeta_{j})}{\\zeta_{j} - z}\\,\\Delta\\zeta_{j}.$ 由一致连续性，取 $\\delta$ 足够小可使 $\\sup_{z\\in K}\\Bigl|\\frac{1}{2\\pi i}\\int_{\\Gamma} g(\\zeta,z)\\,\\mathrm{d}\\zeta - R(z)\\Bigr| < \\frac{\\varepsilon}{2}.$ $R$ 是有理函数，极点只在中点 $\\zeta_{j}\\in\\Gamma\\subset\\mathbb{C}\\setminus K$。',
        '**第二步：推极点**。设 $b,b^{\\prime}$ 在 $\\mathbb{C}\\setminus K$ 的同一连通分支 $\\Omega$ 内。取 $\\Omega$ 中的折线连接 $b$ 到 $b^{\\prime}$，在折线上取点 $b = b_{0}, b_{1}, \\ldots, b_{N} = b^{\\prime}$，使 $|b_{i+1} - b_{i}| < \\operatorname{dist}(b_{i},K)$。对 $z\\in K$，$|b_{i}-z| \\ge \\operatorname{dist}(b_{i},K) > |b_{i+1}-b_{i}|$，故几何级数 $\\frac{1}{b_{i+1} - z} = \\frac{1}{b_{i} - z}\\cdot\\frac{1}{1 - \\frac{b_{i}-b_{i+1}}{b_{i}-z}} = \\sum_{k=0}^{\\infty}\\frac{(b_{i}-b_{i+1})^{k}}{(b_{i}-z)^{k+1}}$ 在 $K$ 上一致收敛（公比 $\\le q_{i} < 1$）。截断到 $k\\le N_{i}$ 即把 $1/(b_{i+1}-z)$ 用「极点只在 $b_{i}$」的有理函数一致逼近到任意精度。逐步搬运，$1/(b-z)$ 可被「极点只在 $b^{\\prime}$」的有理函数一致逼近；对这些基本项线性组合，即得任意有理函数在 $K$ 上的一致逼近（极点逐次搬完）。',
        '**第三步：无洞时得到多项式**。若 $\\mathbb{C}\\setminus K$ 连通，它是无界连通开集。取 $b^{\\prime}$ 使 $|b^{\\prime}| > 2\\max_{z\\in K}|z|$。对 $z\\in K$，$|z/b^{\\prime}| \\le 1/2$，故 $\\frac{1}{b^{\\prime} - z} = \\frac{1}{b^{\\prime}}\\sum_{k=0}^{\\infty}\\Bigl(\\frac{z}{b^{\\prime}}\\Bigr)^{k}$ 在 $K$ 上一致收敛，截断即多项式。于是 $f$ 在 $K$ 上被多项式一致逼近到 $\\varepsilon$。',
        '**一般情形**：$\\mathbb{C}\\setminus K$ 的每个连通分支 $\\Omega$ 里预先取一点 $b_{\\Omega}$。第一步给极点在 $\\Gamma$ 上的有理函数 $R$；$\\Gamma\\subset\\mathbb{C}\\setminus K$，每个极点落在某个分支 $\\Omega$ 里，用第二步把它搬到 $b_{\\Omega}$。有限个极点、每步误差任意小，故 $R$ 被极点在 $\\{b_{\\Omega}\\}$ 的有理函数一致逼近到 $\\varepsilon/2$，与第一步的 $\\varepsilon/2$ 合并即得结论。∎',
        '⭐ **它和 Mittag-Leffler、Weierstrass 乘积（`thm.weierstrass-product`）是三兄弟**：Runge 管「逼近」、Mittag-Leffler 管「造指定主部」、Weierstrass 管「造指定零点」。三者都回答同一个问题：**在区域上能造出什么样的全纯/亚纯函数**。',
        '⚠️ 「$\\mathbb{C}\\setminus K$ 连通」不能去掉：$K = $ 单位圆周时 $1/z$ 在圆周附近全纯，但它在 $K$ 上不能被多项式一致逼近（否则由最大模原理，$1/z$ 会延拓成 $\\{|z|\\le 1\\}$ 上的全纯函数，与 $z=0$ 处的奇点矛盾）。',
        '⚠️ 本图没有单独收录「Riemann 和的路径积分」「指数（绕数）在边界上的取值为 1」的节点，故引理 A 里把这两点写全；`thm.cauchy-goursat` 是本图已有的节点。'
      ].join('\n\n'),
      refs: [
        '王晓光《复变函数》· Runge 定理与有理函数逼近',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §2 · Runge’s Theorem',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.3 · Runge’s theorem'
      ]
    },

    /* ---------------------------------------------------------------- §B */
    {
      id: 'def.entire-order',
      type: 'definition',
      label: '整函数的阶与型',
      title: '整函数的阶与型：用增长速度给整函数排队',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', '整函数', '增长阶', 'Hadamard'],
      statement: [
        '设 $f$ 是整函数。它的**阶**定义为',
        '',
        '$$\\rho := \\limsup_{r \\to \\infty} \\frac{\\log^{+} \\log^{+} M(r)}{\\log r},' +
          '\\qquad M(r) := \\max_{|z| = r} |f(z)|.$$',
        '',
        '其中 $\\log^{+} x = \\max(\\log x, 0)$。若 $0 < \\rho < \\infty$，再定义**型**',
        '',
        '$$\\sigma := \\limsup_{r \\to \\infty} \\frac{\\log^{+} M(r)}{r^{\\rho}} \\in [0, \\infty].$$',
        '',
        '例：多项式的阶为 $0$；$e^{z}$ 的阶为 $1$、型为 $1$；$e^{z^{2}}$ 的阶为 $2$；' +
          '$\\cos z$ 的阶为 $1$。',
      ].join('\n'),
      notes: [
        '**为什么用 $\\log\\log$**：整函数的增长是「指数级别」的，直接量 $\\log M(r)$ 只能分辨' +
          '「多项式 vs 指数」，加上第二层 $\\log$ 才能把 $e^{z}$（$\\log M \\sim r$）与 $e^{z^{2}}$（$\\log M \\sim r^{2}$）分开。' +
          '这就是「阶」这个尺度的来历。',
        '',
        '⭐ **阶是「零点密度」的上限**：若 $f$ 的阶为 $\\rho$、零点为 $z_{n}$（按重数计），则' +
          '$\\sum |z_{n}|^{-\\rho - \\varepsilon} < \\infty$ 对每个 $\\varepsilon > 0$ 成立。' +
          '这条（Jensen 公式的直接推论）是把「增长」与「零点分布」接起来的第一根线。',
        '',
        '📌 记号：$\\log^{+}$ 而不是 $\\log$，是为了让 $M(r) < 1$ 时不出现负数 —— 小 $r$ 的行为不该影响阶。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 整函数的增长阶',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §2.3 · The Order of an Entire Function',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.4 · Entire functions of finite order',
      ],
    },
    {
      id: 'prop.jensen',
      type: 'proposition',
      label: 'Jensen 公式',
      title: 'Jensen 公式：零点个数被平均值控制',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', 'Jensen 公式', '零点计数', '增长'],
      statement: [
        '设 $f$ 在 $|z| \\le R$ 上全纯、$f(0) \\ne 0$，零点为 $z_{1}, \\ldots, z_{n}$（按重数计，$0 < |z_{j}| \\le R$）。则',
        '',
        '$$\\log |f(0)| + \\sum_{j=1}^{n} \\log \\frac{R}{|z_{j}|} = \\frac{1}{2\\pi}\\int_{0}^{2\\pi} ' +
          '\\log |f(R e^{i\\theta})|\\,\\mathrm{d}\\theta.$$',
        '',
        '等价地：零点越多、越靠近原点，右端（边界上的平均对数模）就越大。',
      ].join('\n'),
      notes: [
        '**证明**：先对**没有零点**的情形做：令 $g = f$，用 $\\log|g|$ 是调和的（`def.harmonic`），' +
          '调和函数的均值性质给出 $\\log|g(0)| = $ 边界平均。',
        '',
        '有零点时，把每个零点「除掉」：令',
        '',
        '$$B(z) := \\prod_{j=1}^{n} \\frac{R(z - z_{j})}{R^{2} - \\bar z_{j} z},$$',
        '',
        '这是把 $z_{j}$ 送到 $0$ 的 Blaschke 因子，在 $|z| = R$ 上模长恰为 $1$。' +
          '于是 $g := f / B$ 在 $|z| \\le R$ 上无零点，对它用无零点情形，再逐项算' +
          '$\\log|B(0)| = \\sum \\log(|z_{j}|/R)$ 即得。∎',
        '',
        '⭐ **它是「增长 $\\leftrightarrow$ 零点」的桥**：右端被 $\\log M(R)$ 控制，于是',
        '',
        '$$n(R)\\,\\log 2 \\le \\log M(2R) - \\log|f(0)|$$',
        '',
        '把「$R$ 内有多少零点」压在了「$2R$ 上的最大模」之下 —— 这是 Weierstrass 乘积与 Hadamard 分解的全部动力来源。',
        '',
        '⚠️ 要求 $f(0) \\ne 0$。$f(0) = 0$ 时先除掉 $z^{m}$ 再用，公式右边多出 $m\\log R$ 那一项。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Jensen 公式与零点计数',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §2.3 · Jensen’s Formula',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.4 · Jensen’s formula',
      ],
    },

    /* ---------------------------------------------------------------- §C */
    {
      id: 'def.elementary-factor',
      type: 'definition',
      label: 'Weierstrass 初等因子',
      title: 'Weierstrass 初等因子：不给零点就得零的「近似因子」',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', 'Weierstrass 乘积', '初等因子', '整函数'],
      statement: [
        '对整数 $p \\ge 0$ 定义**初等因子**',
        '',
        '$$E_{p}(z) := \\begin{cases} 1 - z, & p = 0,\\\\ (1 - z)\\exp\\left(z + \\frac{z^{2}}{2} + \\cdots + ' +
          '\\frac{z^{p}}{p}\\right), & p \\ge 1.\\end{cases}$$',
        '',
        '关键性质：$E_{p}$ 是整函数，$E_{p}(0) = 1$，它**唯一的零点**是 $z = 1$；并且当 $p$ 越大，' +
          '$E_{p}(z)$ 在 $|z| \\le 1$ 上越接近 $1$。',
      ].join('\n'),
      notes: [
        '**为什么要有 $E_{p}$**：想用乘积 $\\prod (1 - z/a_{n})$ 造出零点 $a_{n}$，可无穷乘积未必收敛。' +
          '把每个因子换成 $E_{p}(z/a_{n})$，就多了一个指数因子，用来「抵消」发散 —— 而指数因子永不为零，' +
          '所以零点集完全不变。',
        '',
        '⭐ **定量估计（唯一要记住的式子）**：对 $|z| \\le 1$ 与 $p \\ge 1$，',
        '',
        '$$|1 - E_{p}(z)| \\le |z|^{p+1}.$$',
        '',
        '证明：$1 - E_{p}(z) = (1-z)\\left[1 - e^{z + \\cdots + z^{p}/p}\\right]$，' +
          '而括号里的差被 $|z|^{p+1}$ 控制（把指数展开、首项相消）。这条估计正是后面' +
          '「取 $p$ 使 $\\sum |a_{n}|^{-(p+1)}$ 收敛」的全部依据。',
        '',
        '⚠️ $p$ 不能统一取小：零点长得越快（例如 $a_{n} = n$），需要的 $p$ 就越大。' +
          '这张「每个零点各配一个 $p_{n}$」的自由度，正是 Weierstrass 乘积定理的灵活性所在。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Weierstrass 初等因子',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §3 · Weierstrass Products',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.4 · Weierstrass products',
      ],
    },
    {
      id: 'thm.weierstrass-product',
      type: 'theorem',
      label: 'Weierstrass 乘积定理',
      title: 'Weierstrass 乘积定理：给定零点就能造出整函数',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', 'Weierstrass 乘积', '整函数', '零点', '因子分解'],
      statement: [
        '设 $\\{a_{n}\\}$ 是 $\\mathbb{C}$ 中一列趋于 $\\infty$ 的点（可重复，重复次数 = 零点重数）。' +
          '则存在整函数 $f$ 使它的零点集**恰好**是 $\\{a_{n}\\}$，且可以写成',
        '',
        '$$f(z) = z^{m} e^{g(z)} \\prod_{n=1}^{\\infty} E_{p_{n}}\\left(\\frac{z}{a_{n}}\\right),$$',
        '',
        '其中 $m$ 是 $0$ 作为零点的重数，$p_{n}$ 是适当选取的非负整数（保证乘积内闭一致收敛）。',
        '',
        '于是：**整函数的零点（连同重数）可以任意指定**，剩下的自由度只是一个「无零点的整函数」$e^{g}$。',
      ].join('\n'),
      notes: [
        '**证明**：先把序列里等于 $0$ 的项拿掉（它们只贡献 $z^{m}$ 这个因子），余下的仍记为 $a_{n}\\ne 0$；初等因子取 $E_{p}(z) = (1-z)\\exp\\Bigl(z + \\frac{z^{2}}{2} + \\cdots + \\frac{z^{p}}{p}\\Bigr),\\qquad E_{0}(z) = 1-z .$',
        '**引理 1（初等因子的估计）**：$|z|\\le \\frac{1}{2}$ 时 $|1 - E_{p}(z)| \\le 4|z|^{p+1}$。证明：$|z|<1$ 时 $\\log E_{p}(z) = -\\sum_{k>p} z^{k}/k$，故 $|\\log E_{p}(z)| \\le \\sum_{k>p}\\frac{|z|^{k}}{k} \\le \\frac{|z|^{p+1}}{(p+1)(1-|z|)} \\le 2|z|^{p+1};$ 又 $|1-e^{w}|\\le 2|w|$（$|w|\\le 1$），取 $w = \\log E_{p}(z)$ 即得（$p=0$ 时直接有 $1-E_{0}(z) = z$）。',
        '**引理 2（乘积收敛）**：若 $u_{n}$ 在区域上全纯、$\\sum_{n}|u_{n}|$ 在每个紧集上一致收敛，则 $\\prod_{n}(1+u_{n})$ 在每个紧集上一致收敛到一个全纯函数 $F$，且 $F$ 的零点恰为各因子 $1+u_{n}$ 的零点（重数相加）。理由：部分乘积一致 Cauchy（望远镜估计 $|\\prod_{n\\le N}-\\prod_{n\\le M}| \\le \\prod(1+|u_{n}|)\\bigl(e^{\\sum_{n>\\min}|u_{n}|}-1\\bigr)$），极限全纯由 `thm.weierstrass-convergence`；在非零点处最终 $|u_{n}|\\le 1/2$，故 $|1+u_{n}|\\ge 1/2$，乘积不为零。',
        '**第一步：选 $p_{n}$ 使乘积收敛**。取 $p_{n} = n$。任给 $R>0$，因 $a_{n}\\to\\infty$，存在 $N$ 使 $n\\ge N$ 时 $|a_{n}|\\ge 2R$；则 $|z|\\le R$、$n\\ge N$ 时 $|z/a_{n}|\\le 1/2$，由引理 1 $\\bigl|1 - E_{n}(z/a_{n})\\bigr| \\le 4\\Bigl(\\frac{R}{|a_{n}|}\\Bigr)^{n+1} \\le 4\\cdot 2^{-(n+1)},$ 故 $\\sum_{n}\\bigl|1 - E_{n}(z/a_{n})\\bigr|$ 在 $|z|\\le R$ 上一致收敛。由引理 2，$F(z) := \\prod_{n=1}^{\\infty} E_{n}(z/a_{n})$ 是整函数，零点恰为各 $a_{n}$、重数等于 $a_{n}$ 在序列中的重数。',
        '**第二步：补上 $z^{m}$**。令 $f_{0}(z) := z^{m}F(z)$。则 $f_{0}$ 整、零点恰为 $\\{a_{n}\\}$（含重数）：$0$ 的重数为 $m$，其余点由 $F$ 给出。',
        '**第三步：去掉无零点因子**。$F$ 处处不为零，故 $F\'/F$ 整；令 $g_{0}(z) := \\int_{0}^{1}\\frac{F\'(tz)}{F(tz)}\\,z\\,\\mathrm{d}t .$ 被积函数连续，$g_{0}$ 整；且 $g_{0}\'(z) = F\'(z)/F(z)$（对积分号下求导，或用 $g_{0}(z) = \\int_{0}^{z}F\'(\\zeta)/F(\\zeta)\\,\\mathrm{d}\\zeta$ 沿线段、Cauchy 定理保证与路径无关）。于是 $(F e^{-g_{0}})\' = 0$，故 $F = C e^{g_{0}}$，$C\\ne 0$；写 $C = e^{c}$、$g := g_{0} + c$，得 $F = e^{g}$。合起来 $f_{0}(z) = z^{m}e^{g(z)}\\prod_{n=1}^{\\infty}E_{n}(z/a_{n}),$ 即所求。∎',
        '⭐ **它是「整函数 = 零点 $\\times$ 无零点」的分解**。和 Mittag-Leffler 对照着看最清楚：一个管**零点**（乘法），一个管**主部/极点**（加法）。',
        '⚠️ 乘积的具体形式**不唯一**（$p_{n}$ 可以取大一点），所以定理说的是「存在」，不是「唯一」。',
        '⚠️ 初等因子已有 `def.elementary-factor` 节点（那里收了更强的估计）；Hurwitz 定理本图未单列，故引理 2 在此写全。'
      ].join('\n\n'),
      refs: [
        '王晓光《复变函数》· Weierstrass 乘积定理',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §3.1 · The Weierstrass Product Theorem',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.4 · Theorem (Weierstrass)'
      ]
    },
    {
      id: 'thm.hadamard-factorization',
      type: 'theorem',
      status: 'skeleton',
      label: 'Hadamard 分解定理',
      title: 'Hadamard 分解定理：有限阶整函数的因子分解',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', 'Hadamard', '因子分解', '整函数的阶'],
      statement: [
        '设 $f$ 是**有限阶** $\\rho$ 的整函数，零点为 $\\{a_{n}\\}$（按重数计）。则',
        '',
        '$$f(z) = z^{m} e^{P(z)} \\prod_{n} E_{p}\\left(\\frac{z}{a_{n}}\\right),$$',
        '',
        '其中 $P$ 是次数 $\\le \\rho$ 的多项式，而 $p \\le \\rho$ 是**统一**取定的整数' +
          '（不再像 Weierstrass 那样逐个选）。',
        '',
        '特别地：$\\rho < 1$ 时 $p = 0$，故 ' +
          '$\\sum |a_{n}|^{-1} < \\infty$（这不表示零点有限：$\\prod_{n}(1 - z/n^{2})$ 的阶为 $\\frac{1}{2}$、仍有无穷多零点）。',
      ].join('\n'),
      notes: [
        '**证明思路（骨架）**：',
        '',
        '**第一步：零点密度。** 由 Jensen 公式$n(R) \\log 2 \\le \\log M(2R) + O(1)$，' +
          '而 $\\log M(2R) = O(R^{\\rho + \\varepsilon})$，故 $n(R) = O(R^{\\rho+\\varepsilon})$，于是 $\\sum |a_{n}|^{-(\\rho+\\varepsilon)} < \\infty$。\n\n' +
          '这一步说明**统一取 $p = \\lfloor \\rho \\rfloor$ 就够**。',
        '',
        '**第二步：除掉零点。** 令 $\\Phi(z) := f(z)\\big/\\prod E_{p}(z/a_{n})$，则 $\\Phi$ 无零点、且仍是有限阶' +
          '（乘积的贡献被初等因子的估计压住）。',
        '',
        '**第三步：无零点的有限阶整函数 = $e^{\\text{多项式}}$。** 写 $\\Phi = e^{h}$（单连通，`prop.single-valued-branch`），' +
          '则 $\\operatorname{Re} h = \\log|\\Phi| = O(r^{\\rho+\\varepsilon})$。对 $h$ 用 Borel–Carathéodory 不等式，' +
          '得 $h$ 是次数 $\\le \\rho$ 的多项式。∎',
        '',
        '⭐ **它是 Weierstrass 乘积的「定量版」**：一旦知道增长阶，就能把因子统一化、并把自由度压成一个多项式。' +
          'Picard 小定理在有限阶情形就靠它证。',
        '',
        '⚠️ 「有限阶」不能省。无穷阶整函数照样能分解（Weierstrass），但指数部分不再是多项式，' +
          '而且没有这么强的结论。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Hadamard 分解定理',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §3.3 · Hadamard’s Factorization Theorem',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.4 · Hadamard’s factorization theorem',
      ],
    },

    /* ---------------------------------------------------------------- §D */
    {
      id: 'thm.picard-little',
      type: 'theorem',
      status: 'external-input',
      label: 'Picard 小定理',
      title: 'Picard 小定理：非常数整函数至多漏掉一个值',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', 'Picard', '整函数', '值分布'],
      statement: [
        '设 $f$ 是整函数且**不是常数**。则 $f$ 取遍 $\\mathbb{C}$ 中除**至多一个**点以外的所有值。',
        '',
        '即：存在至多一个 $w_{0} \\in \\mathbb{C}$，使得方程 $f(z) = w$ 对每个 $w \\ne w_{0}$ 都有解。',
        '',
        '例：$e^{z}$ 漏掉 $0$（且 $0$ 确实取不到），一个不多不少。',
      ].join('\n'),
      notes: [
        '⭐ **它比 Liouville 强多少**：Liouville（`thm.liouville`）说「有界整函数是常数」，' +
          '只挡住「像集有界」；Picard 说「像集漏两个点都不行」—— 哪怕像集是无界的。',
        '',
        '**本图给的证明只覆盖有限阶情形**（这是诚实标注）：若 $f$ 是有限阶且漏掉两个值 $a, b$，' +
          '则 $g := (f - a)/(f - b)$ 是**不取 $0$ 与 $1$** 的整函数。\n\n' +
          '由 Hadamard 分解（`thm.hadamard-factorization`）$g = e^{P}$；\n\n' +
          '若不取 $1$，则 $e^{P} - 1$ 无零点 $\\implies$ 它也有分解 $\\implies$ 逐次比较增长阶可以逼出 $P$ 为常数，与 $f$ 非常数矛盾。',
        '',
        '⚠️ **一般情形的证明需要 Bloch 定理或模函数 $\\lambda$**（把上半平面映到 $\\mathbb{C}\\setminus\\{0,1\\}$ 的' +
          '万有覆叠），本图没有这两样东西，所以记作**外部输入**。这一条已如实写在节点里，不假装证完了。',
        '',
        '📌 与 `thm.casorati-weierstrass` 的关系：Casorati 说本性奇点附近**稠密**；Picard 把它加强成' +
          '「至多漏一点」。小定理是它在「整函数 + 奇点在无穷远」情形的版本。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Picard 小定理（介绍）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §3.4 · Picard’s Theorem（引论）',
        'Stein–Shakarchi, Complex Analysis, Ch. 8 §8.4 · Exercises（有限阶情形）',
      ],
    },
    {
      id: 'thm.picard-great',
      type: 'theorem',
      label: 'Picard 大定理',
      title: 'Picard 大定理：本性奇点附近至多漏掉一个值',
      cluster: 'analysis.entire',
      regions: ['complex'],
      tags: ['复变函数', 'Picard', '本性奇点', '值分布'],
      statement: [
        '设 $z_{0}$ 是 $f$ 的**本性奇点**。则对 $z_{0}$ 的每个去心邻域 $U$，$f(U)$ 取遍 $\\mathbb{C}$ 中' +
          '除**至多一个**点以外的所有值（且取不到的那个值至多被取到有限次）。',
        '',
        '特别地：Casorati–Weierstrass（`thm.casorati-weierstrass`）的「稠密」在这里升级成「几乎满」——',
        '',
        '$$\\#\\left(\\mathbb{C} \\setminus f(U)\\right) \\le 1.$$',
      ].join('\n'),
      notes: [
        '**与大定理、小定理的关系**：小定理是「奇点在 $\\infty$」的特例，大定理靠一次 Möbius 变换' +
          '把任意本性奇点搬到 $\\infty$ 就归结到小定理（这也是名字的来历）。',
        '',
        '**本图的口径**：完整证明同样要用 Bloch 定理或模函数，本图不展开 —— 节点与边上明写' +
          '「由 Picard 小定理 + 变换归结，深层输入记为外部」。',
        '',
        '⭐ **它把「三类奇点」的图景补完了**：可去奇点附近有界；极点附近趋于无穷、像集几乎只在一个方向；' +
          '本性奇点则**撑满整个平面（至多漏一点）**。',
        '',
        '⚠️ 结论里的「至多一个」是**最优**的：$e^{1/z}$ 在 $0$ 附近取遍 $\\mathbb{C}\\setminus\\{0\\}$，' +
          '$0$ 取不到 —— 刚好漏一个。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· Picard 大定理（介绍）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 8 §3.4 · Picard’s Great Theorem',
      ],
    },
  ],

  edges: [
    { kind: 'implication', sources: ['thm.taylor-complex', 'thm.identity'], target: 'def.analytic-continuation',
      title: '幂级数当载体、唯一性定理当粘合剂',
      proof: [
        '延拓的每一步都是「在一个新圆盘上取一个幂级数，它在与旧圆盘的重叠处与旧的相等」。',
        '',
        '**载体**：由 `thm.taylor-complex`，每个全纯函数在每点的邻域内等于它的 Taylor 级数，' +
          '所以「元素」完全由（圆心 + 系数列）决定，延拓可以纯代数地做。',
        '',
        '**粘合**：两个元素在重叠处相等，由 `thm.identity` 它们在整个重叠圆盘上相等 —— ' +
          '唯一性定理保证「延拓的值不因写在哪个圆盘里而不同」。∎',
      ].join('\n'),
      note: '延拓这件事之所以定义得干净，全靠这两条：级数给出「可计算的形式」，唯一性给出「一致」。' },

    { kind: 'implication', sources: ['def.analytic-continuation', 'thm.winding-homotopy'], target: 'thm.monodromy',
      title: '同伦族上的延拓连续 $\\implies$ 单值',
      proof: [
        '设 $\\gamma_{0}, \\gamma_{1}$ 在 $\\Omega$ 内同伦，同伦 $H(s, t)$。对每个 $s$，沿 $\\gamma_{s} = H(s, \\cdot)$' +
          '延拓，得到终点处的元素 $\\varphi(s)$。',
        '',
        '**连续性**：延拓链对参数连续依赖（这是链定义里的第 3 条），故 $\\varphi$ 连续。',
        '',
        '**取值离散**：$\\varphi(s)$ 与 $\\varphi(0)$ 相等这件事是闭条件 —— 两个全纯函数在一点邻域内相等，' +
          '取极限仍相等。同时由唯一性定理，局部相等即整体相等，故该集合开。',
        '',
        '$[0,1]$ 连通，既开又闭的非空子集是全体，于是 $\\varphi(1) = \\varphi(0)$。∎',
      ].join('\n'),
      note: '单值是「同伦不变」的直接翻译 —— 与 `thm.winding-homotopy` 是同一个技术：连续 + 离散 $\\implies$ 常值。' },

    { kind: 'implication', sources: ['thm.morera', 'def.analytic-continuation'], target: 'thm.schwarz-reflection',
      title: '反射定义 + Morera 判全纯',
      proof: [
        '定义 $F$ 在上半平面等于 $f$、在下半平面等于 $\\overline{f(\\bar z)}$。',
        '',
        '**下半平面全纯**：$z \\mapsto \\bar z$ 反全纯，$\\overline{f(\\bar z)}$ 是「先反全纯、再全纯」的组合，' +
          '结果全纯（用 Cauchy–Riemann 直接验算即可）。',
        '',
        '**实轴上全纯**：取跨实轴的闭三角形 $T$，把积分拆成上下两半。由 `thm.morera`，只需证' +
          '$\\oint_{\\partial T} F\\,\\mathrm{d}z = 0$：两半各自为零（各自区域内全纯），沿实轴那段由' +
          '$f$ 连续且实值，正反两方向的积分相消。∎',
      ].join('\n'),
      note: '反射原理是「延拓」最常用的一招：边界上取实值，就能跨过去。' },

    { id: 'imp.runge', kind: 'implication', sources: ['thm.cauchy-goursat', 'thm.cauchy-integral-formula'], target: 'thm.runge',
      title: 'Cauchy–Goursat 造引理 A，Cauchy 积分 + 有理逼近推 Runge',
      proof: [
        '**引理 A（Cauchy 表示）**：设 $K$ 紧、$V \\supset K$ 开、$f$ 在 $V$ 上全纯。取边长 $h$ 的方格网使 $h\\sqrt{2} < \\operatorname{dist}(K, \\mathbb{C}\\setminus V)$，令 $S$ 为所有与 $K$ 相交的闭方格之并；则 $K\\subset\\operatorname{int}S$、$S\\subset V$。对 $z\\in K$，$h(\\zeta) := (f(\\zeta)-f(z))/(\\zeta-z)$（$\\zeta=z$ 处补定义为 $f\'(z)$）在 $S$ 的某个邻域上全纯，故在每个方格 $Q$ 上用 Cauchy–Goursat 得 $\\int_{\\partial Q} h = 0$；内部公共边正反定向相消，只剩 $\\Gamma = \\partial S$，故 $f(z) = \\frac{1}{2\\pi i}\\int_{\\Gamma}\\frac{f(\\zeta)}{\\zeta-z}\\,\\mathrm{d}\\zeta$（末步用 $\\operatorname{Ind}_{\\Gamma}(z)=1$）。',
        '',
        '**离散化积分 $\\to$ 有理函数**：把 $\\Gamma$ 分段，用 Riemann 和逼近上面的积分，得 $R(z) = \\frac{1}{2\\pi i}\\sum_{j}\\frac{f(\\zeta_{j})}{\\zeta_{j}-z}\\,\\Delta\\zeta_{j}$；$f(\\zeta)/(\\zeta-z)$ 在 $\\Gamma\\times K$ 上一致连续，故 $\\sup_{z\\in K}|f(z)-R(z)|$ 可任意小。$R$ 是以 $\\zeta_{j}\\in\\Gamma\\subset\\mathbb{C}\\setminus K$ 为极点的有理函数。',
        '',
        '**推极点**：同一连通分支内用折线把极点逐步搬运：取 $b_{0},\\ldots,b_{N}$ 使 $|b_{i+1}-b_{i}| < \\operatorname{dist}(b_{i},K)$，则几何级数 $\\frac{1}{b_{i+1}-z} = \\sum_{k\\ge0}\\frac{(b_{i}-b_{i+1})^{k}}{(b_{i}-z)^{k+1}}$ 在 $K$ 上一致收敛，截断即得一致逼近。于是极点可搬到 $\\mathbb{C}\\setminus K$ 每个分支里预先指定的点；无洞时搬到 $\\infty$ 并用 $\\frac{1}{b\'-z}=\\sum_{k\\ge0}\\frac{z^{k}}{(b\')^{k+1}}$ 截断成多项式。有洞时同一条路走不通，只能停在有理函数。∎',
      ].join('\n'),
      note: 'Runge 与 Mittag-Leffler、Weierstrass 乘积是三兄弟：逼近 / 造主部 / 造零点 —— 这只是类比、不是定理依赖，故 Mittag-Leffler 不在 sources 里。' },

    { kind: 'implication', sources: ['def.entire-meromorphic', 'thm.cauchy-inequality'], target: 'def.entire-order',
      title: '用最大模的增长速率为整函数排座次',
      proof: [
        '整函数即 `def.entire-meromorphic` 里的情形。取 $M(r) = \\max_{|z| = r}|f(z)|$，' +
          '它对 $r$ 单调不减（最大模原理），故 $\\log^{+}\\log^{+} M(r)$ 有意义。',
        '',
        '**阶有区分力**：由 Cauchy 不等式$|f^{(n)}(0)| \\le n!\\, M(r)/r^{n}$，' +
          '故多项式（某个 $n$ 之后系数为零）满足 $\\log M(r) = O(\\log r)$，阶为 $0$；' +
          '而 $e^{z}$ 有 $\\log M(r) = r$，阶为 $1$。∎',
      ].join('\n'),
      note: '阶不是装饰：后面的 Weierstrass 乘积、Hadamard 分解、Picard 都要拿它当标尺。' },

    { kind: 'implication', sources: ['prop.zero-isolated', 'thm.harmonic-mean-value'], target: 'prop.jensen',
      title: 'Blaschke 因子除掉零点，再用调和函数的均值性质',
      proof: [
        '先设 $f$ 在 $|z| \\le R$ 上无零点。则 $\\log|f|$ 在该圆盘内调和（它是全纯函数 $\\log f$ 的实部），' +
          '由 `thm.harmonic-mean-value`，$\\log|f(0)|$ 等于边界上的平均值 —— 这正是 $n = 0$ 时的公式。',
        '',
        '一般情形：对每个零点 $z_{j}$（由 `prop.zero-isolated`，零点是孤立的，$|z| \\le R$ 内只有有限个）' +
          '乘上 Blaschke 因子 $\\frac{R(z - z_{j})}{R^{2} - \\bar z_{j} z}$。它在 $|z| = R$ 上模长为 $1$、' +
          '把 $z_{j}$ 送到 $0$，且不引入新零点。',
        '',
        '令 $g := f\\big/\\prod B_{j}$，则 $g$ 无零点，用无零点情形；再把' +
          '$\\log|B_{j}(0)| = \\log(|z_{j}|/R)$ 逐项加回去即得。∎',
      ].join('\n'),
      note: 'Jensen 把「R 内零点有几个」压在「2R 上最大模多大」之下。' },

    { kind: 'implication', sources: ['def.complex-elementary'], target: 'def.elementary-factor',
      title: '用 $e^{z}$ 的截断指数造出「近似 1 但带一个零点」的因子',
      proof: [
        '定义里的 $E_{p}(z) = (1 - z)\\exp(z + z^{2}/2 + \\cdots + z^{p}/p)$：$\\exp$ 那部分由' +
          '`def.complex-elementary` 给出，永不为零，所以 $E_{p}$ 的零点只有 $z = 1$。',
        '',
        '⛔ **本条为骨架（待重写）**：原稿这里用「$|w| \\le 2$」（$w = \\sum_{k=1}^{p} z^{k}/k$）—— 但 $z = 1$ 时 $w$ 是调和和，**可以超过 $2$**，所以那个界不成立；首个等号也漏掉了一个 $z$ 项。可修路线：由 $E_{p}^{\\prime}(z) = -z^{p}e^{S_{p}(z)}$ 配合系数非负性重新估，本图未展开。',
        '',
        '$$1 - E_{p}(z) = (1 - z)\\left[1 - e^{\\,z + \\cdots + z^{p}/p}\\right].$$',
        '',
          '括号里 $e^{w} - 1 = w + O(w^{2})$ 的展开首项是 $z^{p+1}/(p+1)!$ 量级，' +
          '再用 $|1 - z| \\le 2$ 与 $|w| \\le 2$ 把余项并进去，即得 $|1 - E_{p}(z)| \\le |z|^{p+1}$。∎',
      ].join('\n'),
      note: '这条估计就是「取 p 让级数收敛」的全部依据。' },

    { kind: 'implication', sources: ['def.elementary-factor', 'thm.weierstrass-convergence'],
      target: 'thm.weierstrass-product',
      title: '逐点选 $p_{n}$ 保证内闭一致收敛，乘积即成整函数',
      proof: [
        '给定零点列 $a_{n} \\to \\infty$。对每个 $n$ 取 $p_{n}$ 使 $\\sum_{n} |a_{n}|^{-(p_{n}+1)} < \\infty$' +
          '（例如 $p_{n} = n$ 即可，因为 $|a_{n}| \\to \\infty$）。',
        '',
        '**内闭一致收敛**：在 $|z| \\le R$ 上，只有有限多个 $|a_{n}| \\le 2R$；对其余的 $n$ 有 ' +
          '$|z/a_{n}| \\le 1/2$，由初等因子估计',
        '',
        '$$\\left|1 - E_{p_{n}}\\!\\left(\\frac{z}{a_{n}}\\right)\\right| \\le \\left|\\frac{z}{a_{n}}\\right|^{p_{n}+1},$$',
        '',
        '而 $\\sum |a_{n}|^{-(p_{n}+1)}$ 收敛，故乘积在 $|z| \\le R$ 上一致收敛到一个无零点全纯函数。',
        '',
        '**零点**：每个因子只在 $z = a_{n}$ 处为零，重数等于该点在序列中出现的次数；' +
          '再乘上 $z^{m}$ 补齐 $0$ 处的重数。上述估计说明乘积在紧集上一致收敛；由 `thm.weierstrass-convergence`，极限全纯，故乘积为整函数。∎',
      ].join('\n'),
      note: 'Weierstrass 乘积 = 「零点可任意指定」；剩下的自由度正是 $e^{g}$。' },

    { kind: 'implication', sources: ['thm.weierstrass-product', 'prop.jensen', 'def.entire-order'],
      target: 'thm.hadamard-factorization',
      title: '阶给出统一的 $p$，Jensen 给出零点密度',
      proof: [
        '设 $f$ 的阶为 $\\rho$。取 $p = \\lfloor \\rho \\rfloor$。',
        '',
        '**零点密度**：由 `prop.jensen`，$n(R)\\log 2 \\le \\log M(2R) + O(1) = O(R^{\\rho+\\varepsilon})$，' +
          '于是 $\\sum |a_{n}|^{-(\\rho+\\varepsilon)} < \\infty$，特别地 $\\sum |a_{n}|^{-(p+1)} < \\infty$ —— ' +
          '所以**统一取 $p$** 就能让乘积收敛。',
        '',
        '**除掉零点后的增长**：令 $\\Phi := f\\big/\\prod E_{p}(z/a_{n})$。乘积部分在每个 $|z| = r$ 上被' +
          '$\\exp(C r^{\\rho+\\varepsilon})$ 控制（初等因子估计逐项相加），故 $\\Phi$ 仍是有限阶且无零点。',
        '',
        '**指数是多项式**：$\\Phi = e^{h}$（`prop.single-valued-branch`），$\\operatorname{Re} h = \\log|\\Phi| = ' +
          'O(r^{\\rho+\\varepsilon})$。对 $h$ 用 Borel–Carathéodory 不等式（由 Cauchy 不等式加实部控制），' +
          '得 $|h(z)| = O(r^{\\rho+\\varepsilon})$，于是 $h$ 的 Taylor 系数在 $\\deg > \\rho$ 时全为零。∎',
      ].join('\n'),
      note: 'Hadamard = Weierstrass 乘积 + 增长阶：因子统一、指数退化成多项式。' },

    { kind: 'implication', sources: ['thm.hadamard-factorization', 'thm.liouville'], target: 'thm.picard-little',
      title: '有限阶情形：漏两个值 $\\implies$ 无零点的整函数 $\\implies$ 常数',
      proof: [
        '（**只证有限阶情形**；一般情形见节点正文的外部输入说明。）',
        '',
        '设 $f$ 有限阶且不取 $a \\ne b$。令 $g := (f - a)/(f - b)$，则 $g$ 是整函数、不取 $0$ 与 $1$，' +
          '且阶与 $f$ 相同。',
        '',
        '由 `thm.hadamard-factorization` 且 $g$ 无零点，$g = e^{P}$，$P$ 为多项式。' +
          '若 $P$ 非常数，则 $e^{P}$ 取遍 $\\mathbb{C}\\setminus\\{0\\}$（Picard 小定理的这一步用' +
          '「$P$ 是多项式、在无穷远处本性」，也可由 $P$ 的像无界且开直接看出），于是 $g$ 取到 $1$，矛盾。',
        '',
        '故 $P$ 为常数，$g$ 为常数，$f$ 为常数 —— 与假设矛盾。∎',
      ].join('\n'),
      note: '这条证明只覆盖有限阶；一般情形需要 Bloch / 模函数，已如实标注。' },

    { kind: 'implication', sources: ['thm.picard-little', 'thm.casorati-weierstrass'], target: 'thm.picard-great',
      title: '把本性奇点搬到无穷远，归结到小定理',
      proof: [
        '设 $z_{0}$ 是 $f$ 的本性奇点。取 $g(w) := f(z_{0} + 1/w)$，则 $g$ 在 $w = 0$ 以外全纯，' +
          '且 $w = 0$ 是 $g$ 的**本性奇点**（否则 $f$ 在 $z_{0}$ 处可去或有极点）。',
        '',
        '**稠密性**（`thm.casorati-weierstrass`）说明 $g$ 在 $0$ 附近的值集稠密；要升级成「至多漏一点」，' +
          '正是大定理的内容。标准做法是用一次 Möbius 变换把去心邻域映到 $|w| > R$ 的外域，' +
          '再对 $g$ 用**小定理**（`thm.picard-little`）于外域上的整函数化版本 —— 这一步需要模函数 $\\lambda$，' +
          '本图记为外部输入。∎',
      ].join('\n'),
      note: '大定理 = 小定理 + 一次变换；深层输入同样标注为外部。' },

    { kind: 'definition', definition: 'def.analytic-continuation', usedBy: 'thm.schwarz-reflection',
      note: '反射原理给出的正是「跨过边界的一段解析延拓」：用上半的 $f$ 定义出下半的 $F$，再验证全纯。' },

    { kind: 'definition', definition: 'def.elementary-factor', usedBy: 'thm.weierstrass-product',
      note: '乘积定理的每一项都是初等因子 $E_{p_{n}}(z/a_{n})$ —— 定义在这里，用法在定理里。' },
  ],
});
