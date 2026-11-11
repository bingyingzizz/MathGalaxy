/* ==========================================================================
   内容包 · 直纹面 · 可展曲面 · 常 Gauss 曲率曲面（4 点）
   --------------------------------------------------------------------------
   用户：「之前发你的pdf，为啥你没给我写可展曲面那里？」

   取证：图里没有可展曲面 / 直纹面 / 常 Gauss 曲率曲面（「可展」全库只在
   `def.mean-curvature` 正文出现一次）。用户发的 PDF 是黎俊彬《微分几何》（171 页扫描版），
   核过目录与索引：**没有「可展曲面」这一节**；K = 0 的情形在其 §2.7 常 Gauss 曲率曲面
   （p.79–81，讲了测地极坐标 + 结构方程 ⇒ 常曲率只有平面/球面/双曲面）。

   ⚠️ refs 口径：只写书名 + 主题，不编章号（do Carmo 本地没有）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '直纹面 · 可展曲面 · 常 Gauss 曲率曲面',

  nodes: [
    {
      id: 'def.ruled-surface',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '直纹面',
      title: '直纹面：过每点都有一条直线的曲面',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '直纹面', '母线', '高斯曲率'],
      statement: [
        '**在做什么**：把「曲面由直线扫出来」写成参数式。柱面、锥面、双曲抛物面、单叶双曲面都是直纹面 —— 于是「有没有直线」变成曲面的结构特征。',
        '',
        '设 $\\Sigma \\subset \\mathbb{R}^{3}$ 是正则曲面。称 $\\Sigma$ 为**直纹面**（ruled surface），若（局部上）',
        '',
        '$$X(u, v) = a(u) + v\\, b(u), \\qquad (u, v) \\in I \\times \\mathbb{R} ,$$',
        '',
        '其中 $a$ 是光滑曲线（**准线**），$b(u) \\ne 0$ 是光滑向量场（**母线方向**）。固定 $u$ 时 $v \\mapsto X(u,v)$ 是直线，叫**母线**。',
        '',
        '**符号**：直纹面上 $K \\le 0$ 恒成立 —— 沿母线方向的法曲率为零。'
      ].join('\n'),
      notes: [
        '**为什么 $K \\le 0$**：母线是直线，作为曲面上的曲线曲率为零，故其法曲率 $\\kappa_{n} = 0$ —— 这只说明该方向是**渐近方向**，推不出主曲率之一为零（例 $X = (u,v,uv)$ 在原点 $\\kappa_{1} = 1$、$\\kappa_{2} = -1$ 都非零，而母线方向 $\\kappa_{n} = 0$）。由 $\\kappa_{n} = 0$ 只能得 $K = \\kappa_{1}\\kappa_{2} \\le 0$。⚠️ 反过来：$K > 0$ 的曲面上没有直线（球面就没有）—— 这是判定「不是直纹面」最快的办法。',
        '**两种特殊情形**：$b$ 为常向量得**柱面**；母线全过同一点得**锥面**。一般直纹面两者都不是（如双曲抛物面 $z = xy$）。',
        '⚠️ **直纹面不等于可展曲面**：单叶双曲面、双曲抛物面都直纹但不可展（$K$ 不恒为零）。判别见 `thm.developable-iff-flat`。',
        '⚠️ 正则条件要写对：$X_{u} \\times X_{v} = (a\' + v\\,b\') \\times b \\ne 0$。只要求 $a\'$ 与 $b$ 不平行**不够**（$a\' \\parallel b$ 时 $v\\,b\' \\times b$ 这项仍可能非零）；$a\'$ 与 $b\'$ 都与 $b$ 平行才真退化。'
      ].join('\n\n'),
      refs: ['do Carmo, Differential Geometry of Curves and Surfaces · 直纹面', 'Kühnel, Differential Geometry: Curves – Surfaces – Manifolds · 直纹面']
    },

    {
      id: 'def.developable-surface',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '可展曲面',
      title: '可展曲面：能摊平到平面上的曲面',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '可展曲面', '高斯曲率', '直纹面'],
      statement: [
        '**在做什么**：刻画「纸能卷、不能拉」的那些曲面 —— 把一张纸弯成的正是可展曲面。几何上就是**高斯曲率恒为零**。',
        '',
        '称正则曲面 $\\Sigma$ 为**可展曲面**（developable surface），若它**局部等距于平面**：每点有邻域与平面某开集之间可建立保长度的对应。',
        '',
        '**等价刻画**（见 `thm.developable-iff-flat`）：',
        '',
        '1. **高斯曲率恒为零**：$K \\equiv 0$；',
        '2. $\\Sigma$ 是**直纹面**且沿每条**母线切平面不变**（法向量与母线参数无关）；',
        '3. **高斯映射像**是一条曲线（秩 $\\le 1$）。',
        '',
        '**局部只有三类**：柱面（母线平行）、锥面（母线交于一点）、切线面（母线是某条空间曲线的切线）。'
      ].join('\n'),
      notes: [
        '**为什么「纸能卷不能拉」就是 $K \\equiv 0$**：纸不可拉伸 $\\implies$ 弯曲时第一基本形式不变 $\\implies$ 等距；由 **Gauss 绝妙定理**（`thm.theorema-egregium`）$K$ 只依赖第一基本形式 $\\implies$ $K$ 不变。平面 $K = 0$，所以纸弯成的曲面必须 $K = 0$；反过来 $K = 0$ 也能摊平（这就是「可展」名字的来历）。',
        '⭐ **三类从哪来**：把直纹面写成 $X = a(u) + v\\,b(u)$，「切平面沿母线不变」等价于 $\\det(a\', b, b\') = 0$。于是 $b\' = 0$ 得柱面；**存在定点 $q$ 与函数 $\\lambda$ 使 $a = q + \\lambda b$**（母线全过 $q$）得锥面 —— 注意这**不是**「$a\' \\parallel b$」：圆锥 $a = b = (\\cos u, \\sin u, 1)$ 时 $a\' = b\'$ 与 $b$ 并不平行；其余得切线面。⚠️ 这是**局部**分类，全局还有拼接与自交问题。',
        '⚠️ **$K \\equiv 0$ 时一定写成直纹面吗**：不。若允许成片的**平坦点**（两主曲率同时为零），曲面仍可展（就是平面），但不一定能写成「沿母线切平面不变」的参数式。严格定义应取「局部等距于平面」，那一半恒成立。'
      ].join('\n\n'),
      refs: ['do Carmo, Differential Geometry of Curves and Surfaces · 可展曲面', '陈维桓《微分几何讲义》, 「曲面的局部理论」· 可展曲面']
    },

    {
      id: 'thm.developable-iff-flat',
      cluster: 'diffgeom.surface',
      type: 'theorem',
      label: '可展的判据',
      title: '定理：直纹面可展，当且仅当沿母线切平面不变，当且仅当 $K \\equiv 0$',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '可展曲面', '直纹面', '高斯曲率', '切平面'],
      statement: [
        '**在做什么**：给出「直纹面可不可展」的可操作判据 —— 一条行列式恒等式，不必解偏微分方程。',
        '',
        '设 $X(u,v) = a(u) + v\\,b(u)$ 是直纹面（`def.ruled-surface`）。则下列等价：',
        '',
        '1. 沿每条母线**切平面不变**（法向量与 $v$ 无关）；',
        '2. $\\det\\bigl(a\'(u),\\ b(u),\\ b\'(u)\\bigr) = 0$ 对一切 $u$；',
        '3. **高斯曲率恒为零**：$K \\equiv 0$；',
        '4. **可展**（局部等距于平面，`def.developable-surface`）。',
        '',
        '**用法**：把 $a, b$ 代进那个三阶行列式即可。圆柱面 $b\' = 0$ 故可展；双曲抛物面 $X = (u,v,uv)$ 的行列式为 $1 \\ne 0$，**不可展**。'
      ].join('\n'),
      notes: [
        '**证明骨架**：',
        '',
        '- (1) 与 (2)：$N \\propto X_u \\times X_v = a\'\\times b + v\\,(b\'\\times b)$；要求与 $v$ 无关，即 $b\'\\times b$ 与 $a\'\\times b$ 平行，等价于 $\\det(a\',b,b\') = 0$。',
        '- (2) 与 (3)：由 $K = \\det(h_{ij})/\\det(g_{ij})$ 直接算，直纹面上 $\\det(h_{ij})$ 与 $\\det(a\',b,b\')^{2}$ 差一个**符号**（未必是正因子：$X = (u,v,uv)$ 给出 $\\det h = -1$，而 $\\det(a\',b,b\')^{2} > 0$）—— 但「等于零」不受符号影响，故 $K \\equiv 0$ 仍等价于行列式恒为零。只用第二基本形式的具体计算。',
        '- (3) 与 (4)：$K \\equiv 0$ 时由常曲率曲面的局部分类（`thm.constant-gauss-curvature` 中 $K = 0$ 情形）得局部等距于平面；反向由 Gauss 绝妙定理（$K$ 是等距不变量，平面的 $K$ 为零）。',
        '',
        '⚠️ **含平坦点时第 1 条与第 4 条会脱钩**：存在 $K \\equiv 0$、含成片平坦点、却写不成「沿母线切平面不变」的曲面。所以第 4 条应读作「局部等距于平面」，它恒成立。',
        '⚠️ **别把「可展」与「极小曲面」搞混**：后者是 $H = 0$（$K$ 一般不为零），平面是两者唯一交点。'
      ].join('\n\n'),
      refs: ['do Carmo, Differential Geometry of Curves and Surfaces · 可展曲面', '陈维桓《微分几何讲义》, 「曲面的局部理论」· 可展曲面的判据']
    },

    {
      id: 'thm.constant-gauss-curvature',
      cluster: 'diffgeom.intrinsic',
      type: 'theorem',
      label: '常 Gauss 曲率曲面',
      title: '常 Gauss 曲率曲面：局部只能是平面、球面或双曲面',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '常曲率', '测地极坐标', '高斯曲率'],
      statement: [
        '**在做什么**：把「$K$ 为常数」推到极致 —— 答案极干净：局部只有三种。这是内蕴几何真正发挥威力的地方（全程只用第一基本形式）。',
        '',
        '设 $\\Sigma$ 的 Gauss 曲率 $K$ 为**常数**。在任一点取**测地极坐标** $(r, \\theta)$，则',
        '',
        '$$g = \\mathrm{d}r^{2} + f(r,\\theta)^{2}\\,\\mathrm{d}\\theta^{2} ,$$',
        '',
        '由 Cartan 结构方程 $\\mathrm{d}\\omega^{2} = K\\,\\omega^{1}\\wedge\\omega^{2}$ 得 $f$ 满足',
        '',
        '$$\\frac{\\partial^{2} f}{\\partial r^{2}} + K f = 0 ,$$',
        '',
        '配初值 $f(0,\\theta) = 0$、$\\partial_{r}f(0,\\theta) = 1$ 得三个解：',
        '',
        '- $K = 0$：$f = r$，即 $g = \\mathrm{d}r^{2} + r^{2}\\mathrm{d}\\theta^{2}$（**欧氏度量**）；',
        '- $K > 0$：$f = \\frac{1}{\\sqrt K}\\sin(\\sqrt K\\, r)$（**球面度量**）；',
        '- $K < 0$：$f = \\frac{1}{\\sqrt{-K}}\\sinh(\\sqrt{-K}\\, r)$（**双曲度量**）。',
        '',
        '**定理**：常 Gauss 曲率曲面**局部**只能等距于平面、球面或双曲面之一。',
        '',
        '**推论**：单连通且完备时，只有平面、球面、双曲平面三种。'
      ].join('\n'),
      notes: [
        '**为什么值得单列**：它把一个**度量条件**（$K$ 为常数）翻译成三种具体度量形式，且只用第一基本形式 —— 曲面怎么嵌在 $\\mathbb{R}^{3}$ 里完全不参与。这是 Gauss 绝妙定理之后内蕴几何的第一次大胜。',
        '**三个解从哪来**：常系数方程 $f\'\' + Kf = 0$ 的特征根为 $\\pm\\sqrt{-K}$，$K$ 的符号决定解是三角函数（振荡）、线性、还是双曲函数（指数增长）。初值 $f(0) = 0$、$f\'(0) = 1$ 是测地极坐标的几何要求（$r = 0$ 处圆周长为零、$r$ 为弧长参数）。',
        '⭐ **$K = 0$ 那一行就是可展曲面**（`def.developable-surface`）：$\\mathrm{d}r^{2} + r^{2}\\mathrm{d}\\theta^{2}$ 正是平面的极坐标度量，所以 $K \\equiv 0$ 的曲面局部与平面等距 —— 这就是「可展」的解析根据。',
        '⚠️ **局部只有三种，整体可以很多**：平坦环面、柱面、双曲曲面都是常曲率。推论里「单连通 + 完备」就是排除它们的，缺一不可。',
        '⚠️ **$K > 0$ 时 $r$ 有上限**：$f$ 在 $\\sqrt K\\,r = \\pi$ 处回到零，测地线在有限距离内重新相交（对径点）；$K \\le 0$ 时 $f$ 恒正，测地线不再相交。'
      ].join('\n\n'),
      refs: ['黎俊彬《微分几何》· 常 Gauss 曲率曲面', 'do Carmo, Differential Geometry of Curves and Surfaces · 常曲率曲面']
    }
  ],

  edges: [
    { id: 'dep-rs-surf', kind: 'definition', definition: 'def.regular-surface', usedBy: 'def.ruled-surface',
      note: '直纹面是正则曲面的一种（要求参数化正则）。' },
    { id: 'dep-rs-k', kind: 'definition', definition: 'def.gauss-curvature', usedBy: 'def.ruled-surface',
      note: '「直纹面上 $K \\le 0$」用高斯曲率的符号。' },

    { id: 'dep-ds-rs', kind: 'definition', definition: 'def.ruled-surface', usedBy: 'def.developable-surface',
      note: '可展的等价刻画之一是「沿母线切平面不变的直纹面」。' },
    { id: 'dep-ds-k', kind: 'definition', definition: 'def.gauss-curvature', usedBy: 'def.developable-surface',
      note: '主判据是 $K \\equiv 0$。' },
    { id: 'dep-ds-iso', kind: 'definition', definition: 'def.isometry-surface', usedBy: 'def.developable-surface',
      note: '可展就是局部等距于平面。' },

    { id: 'dep-dif-ds', kind: 'definition', definition: 'def.developable-surface', usedBy: 'thm.developable-iff-flat',
      note: '定理给的是可展的四个等价判据。' },
    { id: 'dep-dif-rs', kind: 'definition', definition: 'def.ruled-surface', usedBy: 'thm.developable-iff-flat',
      note: '判据写在直纹面的参数式上（三阶行列式）。' },
    { id: 'dep-dif-k', kind: 'definition', definition: 'def.gauss-curvature', usedBy: 'thm.developable-iff-flat',
      note: '证明要算第二基本形式与 $K$。' },
    { id: 'dep-dif-egregium', kind: 'implication',
      sources: ['thm.theorema-egregium'], target: 'thm.developable-iff-flat',
      title: '绝妙定理把「等距」的 $K = 0$ 一侧接上',
      proof: [
        '「可展 $\\implies$ 平坦」一侧要证：与平面局部等距的曲面必须 $K = 0$。',
        '`thm.theorema-egregium` 说明 $K$ 只由第一基本形式决定，是等距不变量。',
        '平面的 $K = 0$，故与它等距的曲面也 $K = 0$；反方向由常曲率分类的 $K = 0$ 情形给出。∎',
      ].join('\n'),
      note: '$K$ 是等距不变量 —— 这是「可展与 $K = 0$ 等价」的另一半。' },

    { id: 'dep-cgc-k', kind: 'definition', definition: 'def.gauss-curvature', usedBy: 'thm.constant-gauss-curvature',
      note: '主语是「Gauss 曲率为常数」。' },
    { id: 'dep-cgc-geo', kind: 'definition', definition: 'lem.gauss-lemma', usedBy: 'thm.constant-gauss-curvature',
      note: '测地极坐标下 $g = \\mathrm{d}r^{2} + f^{2}\\mathrm{d}\\theta^{2}$ 要 Gauss 引理保证 $\\partial_r \\perp \\partial_\\theta$；本注只写结果形式、未展开这一步 —— 这是**证明梗概的引用**，不是定义依赖。' },
    { id: 'dep-cgc-form', kind: 'definition', definition: 'def.first-fundamental-form', usedBy: 'thm.constant-gauss-curvature',
      note: '整个论证只用第一基本形式（内蕴）。' },
    { id: 'dep-cgc-ds', kind: 'definition', definition: 'def.developable-surface', usedBy: 'thm.constant-gauss-curvature',
      note: '$K = 0$ 的解就是可展曲面 —— 两个概念在这里接上。' },
    { id: 'dep-cgc-iso', kind: 'definition', definition: 'def.isometry-surface', usedBy: 'thm.constant-gauss-curvature',
      note: '结论是「等距于三种模型之一」。' }
  ]
});
