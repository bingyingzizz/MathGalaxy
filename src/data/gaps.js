/* ==========================================================================
   数学星图 · 缺口候选术语表（只给构建用）
   --------------------------------------------------------------------------
   干什么：图只记录**存在的东西**，于是「我还缺哪一块」查不到。
   `tools/build.mjs` 会拿这张表去正文里点名：某个词出现了 N 次，
   却**没有任何节点的 label / aka 对得上** ⇒ 那就是一个洞，写进 `dist/gaps.md`。

   ⚠️ 这张表是**候选清单**，不是「必须补」的清单：
      · 命中了但已经有节点 —— 正常，不会出现在缺口报告里；
      · 命中 0 次 —— 说明连提都没提过（真空白），报告里单独列一节。
   ⛔ 纯文本，不许含 `$`（和 label / tags / refs 同一条规矩）。
   ⛔ 浏览器端不需要它：**不挂进 index.html**（同 `data/i18n/docs.en.js` 的处理）。

   加词的门槛：**一个读者会顺着这个词去找定义**。行文词（例如/比如/满足）不要进来。
   ========================================================================== */
window.MG = window.MG || {};

MG.gaps = {
  version: 1,
  updated: '2026-11-03',
  /* 按主题分组只是为了人读；构建时拍平。 */
  /* C3 白名单（2026-11-04）：`dist/gaps.md` 第二节里判为「不是缺边」的那些。
     判据只有三种：顺带/对照式提及、同名不同物、以及「加上会成环」。
     ⛔ 每条必须写 why；为了让报告变绿而加条目 = 刷绿。 */
  noEdgeOk: [
    { node: 'def.invariant-polynomial', def: 'def.characteristic-class', why: '方向相反：不变多项式是**输入**，示性类是它的产物；本节点只在「用途」一句里点了示性类。' },
    { node: 'thm.chern-weil', def: 'def.characteristic-class', why: '示性类在本图是陈类的上位概念，而陈–Weil 直接造的是**陈类**（已有 `thm.chern-weil → def.chern-class`）。' },
    { node: 'def.bundle-section', def: 'def.vector-field', why: '「向量场是截面的特例」是**比喻式对照**，定义本身不用向量场。' },
    { node: 'def.bundle-section', def: 'def.form-on-manifold', why: '只是举例「微分形式也是截面」，不是依赖。' },
    { node: 'def.bundle-section', def: 'def.differential-form', why: '同上（举例），且指向的是 $\\mathbb{R}^n$ 版，容易连错口径。' },
    { node: 'def.lie-algebra', def: 'def.lie-group', why: 'Lie 代数独立定义；提到 Lie 群只是解释「它从哪来」（线性化）。' },
    { node: 'def.connection-form', def: 'def.second-fundamental-form', why: '「第二基本形式由它算出」是**后果**，定义不用它。' },
    { node: 'def.connection-form', def: 'def.gauss-curvature', why: '同上（Gauss 曲率是它的产物）。' },
    { node: 'def.curvature-tensor', def: 'def.second-fundamental-form', why: '原句是「**没有**法向、没有第二基本形式」—— 否定式提及。' },
    { node: 'prop.syzygy-stability', def: 'def.projective-dimension', why: '原句是「这正是投射维数能良定义的原因」—— 后果，不是前提。' },
    { node: 'def.affine-connection', def: 'def.geodesic', why: '「进而谈加速度、测地线」是**前瞻**，定义不用测地线。' },
    { node: 'prop.mobius-classification', def: 'def.geodesic', why: '「沿测地线平移」是双曲型的**几何解释**，分类本身只用矩阵。' },
    { node: 'thm.darboux', def: 'def.riemannian-metric', why: '原句是「Riemann 度量**做不到**这一点」—— 尖锐对照，不是依赖。' },
    { node: 'prop.pretopos-factorization', def: 'def.topos', why: '命中的是「预拓扑斯」的子串。' },
    { node: 'def.precanonical-topology', def: 'def.topos', why: '命中的是「预拓扑斯」的子串。' },
    { node: 'def.bound', def: 'def.ordered-field', why: '原句是「见『$\\mathbb{R}$ 是完备有序域』」—— 导航式提醒。' },
    { node: 'def.ac-function', def: 'def.absolute-continuity', why: '**同名不同物**：这里是「绝对连续**函数**」，那个节点是「测度的绝对连续性（$\\mu \\ll \\nu$）」。' },
    { node: 'def.t35-space', def: 'def.regular-space', why: '「加了 $T_1$ 之后叫完全正则空间」是**命名备注**，不是依赖。' },
    { node: 'prop.spectral-sequence-page-picture', def: 'def.vector-field', why: '「同一张图上不同的『向量场』」是**比喻**（打引号的）。' },
    { node: 'prop.pullback-forms', def: 'def.vector-field', why: '「向量场只能正着推」是**对照**（说形式能力更强）。' },
    { node: 'def.riemannian-metric', def: 'def.geodesic', why: '「也才有测地线与曲率」是**前瞻**（度量是它们的来源）。' },
    { node: 'prop.subobject-lattice', def: 'def.topos', why: '命中的是「预拓扑斯」的子串（本命题的前提就是预拓扑斯）。' },
    { node: 'prop.geodesic-existence', def: 'def.exponential-map', why: '原句是「下一站的指数映射」—— 明确的前向指路。' },
    { node: 'thm.symplectic-normal-form', def: 'def.inertia-index', why: '与实对称型分类的**对照**，不是前提。' },
    { node: 'def.empty', def: 'def.first-order-language', why: '「与一阶语言同级」是**类比式说明**。' },
    { node: 'def.quotient-topology', def: 'def.quotient-vs', why: '**同名不同物**：这里是拓扑的**商空间**，那个节点是向量空间的商 $V/U$。' },
    { node: 'prop.module-tensor-universal', def: 'def.tensor-product-vs', why: '**同名不同物**：这里是**模**的张量积，那个节点是向量空间的张量积。' },
    { node: 'def.fiber-bundle', def: 'def.lie-group', why: '纤维丛本身不需要 Lie 群：只有「结构群」那一层才需要，而结构群已由 `def.fiber-bundle → def.structure-group` 覆盖（结构群节点自己连到 Lie 群）。硬连会把 fiber-bundle 从 L10 抬到 L29，整条丛的链一起虚高。' },
    { node: 'def.smooth-manifold', def: 'def.partial-derivative', why: '$C^{\\infty}$ 的定义在 `def.smooth-map` 那一层（真源），本节点只是括注「用偏导数检验」。已改为在 smooth-map 上补根边，避免把整个流形团从 L8 抬到 L16。' },
    { node: 'def.manifold-chart', def: 'def.partial-derivative', why: '同上（同一个括注，真源在 `def.smooth-map`）。' },
    { node: 'def.exterior-derivative', def: 'def.closed-form', why: '外微分的陈述只是**命名**「$mathrm{d}omega = 0$ 的叫闭形式」；本图闭形式的定义边已经指向流形版 `prop.exterior-derivative-manifold`，不指坐标模型版。' },
    { node: 'def.exterior-derivative', def: 'def.exact-form', why: '同上（命名「恰当形式」）。' },
    { node: 'def.cauchy-null', def: 'def.cauchy-sequence', why: '**同名不同物**：这里是**有理**数列版的 Cauchy 列（构造 $mathbb{R}$ 用，$arepsilon$ 取有理数），那个节点是**实**数列版。' },
    { node: 'def.real', def: 'def.cauchy-sequence', why: '**同名不同物**：$mathbb{R}$ 的构造用的是有理 Cauchy 列，已有 `def.cauchy-null → def.real`。' },
    { node: 'prop.cg-kclosed-quotient', def: 'def.quotient-vs', why: '**同名不同物**：这里是拓扑的**商空间**（$k$-闭商），那个节点是向量空间的商 $V/U$。' },
    { node: 'def.separable-extension', def: 'def.minimal-poly', why: '**同名不同物**：可分扩张里的「极小多项式」是**代数元**的（`def.algebraic-element`，已连），不是**算子**的 `def.minimal-poly`（$\\mu_{T}$）。' },
    { node: 'prop.tensor-functor-properties', def: 'def.tensor-product-vs', why: '**同名不同物**：本命题讲的是**模**的张量积（`def.tensor-module`，已连），不是向量空间的张量积。' },
    { node: 'ex.ab-of-categories', def: 'def.lie-group', why: '例子行「Ab(Manifold) = 阿贝尔 Lie 群」是**列答案**，不是依赖。' }
  ],
  /* C3 白名单（2026-11-04）：`dist/gaps.md` 第二节里判为「不是缺边」的那些。
     判据只有三种：顺带/对照式提及、同名不同物、以及「加上会成环」。
     ⛔ 每条必须写 why；为了让报告变绿而加条目 = 刷绿。 */
  /* 黑边环的白名单：只有真·假环才能进这里，每条都要写清「为什么不是数学循环」。
     ⛔ 别为了让她变绿就加条目 —— 先判断它是等价（改 equivalence）/ 回头证（改粉边）/ 真错。 */
  cycleOk: [
    { id: 'imp.complete-totbdd-seqcompact',
      why: '多前提假环：列紧 ⟹ 全有界（无条件），完备 + 全有界 ⟹ 列紧（带假设）。' +
        '图层对 sources 一视同仁，于是「完备是列紧的前提」与「列紧是完备的前提」同时成立 —— 不是数学循环。' },
  ],

  terms: [
    /* — 通名缺席（B3） — */
    '同构', '二元运算', '群的阶', '元素的阶', '反函数', '原函数', '单位群', '素因子',
    /* — 指数 / 对数 / 三角（B4 B5） — */
    '对数', '换底公式', '自然对数', '指数函数', '幂函数', '正切', '余切', '反正弦',
    '反三角函数', '弧度', '角度', '单位圆', '弧长',
    /* — 曲面与拓扑地形（B2 B6） — */
    '拓扑流形', '闭曲面', '亏格', '连通和', '三角剖分', '曲面分类', '球面', '环面',
    '射影平面', '克莱因瓶', '莫比乌斯带', '三角剖分存在性',
    /* — 数论 / 解析数论（E1） — */
    'zeta 函数', 'ζ 函数', '黎曼猜想', '解析数论', '狄利克雷级数', '模形式',
    /* — Galois（E2） — */
    '域扩张', '伽罗瓦群', '正规扩张', '可分扩张', '代数扩张', '分裂域', '代数闭包',
    '求根公式', '五次方程', '尺规作图',
    /* — 逻辑另一半（E3） — */
    '可证明性', '紧致性定理', '完备性定理', '命题逻辑', '一阶逻辑的完备性',
    /* — 经典缺席（E5） — */
    '幂对象', '笛卡尔闭', 'Hodge 理论', '调和形式', 'Riesz–Markov', '表示论',
    'Fourier 变换', '概率', '图论', '组合数学', '偏微分方程', '超积', 'Radó',
    /* — 日常好奇（A1 里那些「没有节点」的口语词） — */
    '咖啡杯', '甜甜圈', '负负得正', '除以零', '芝诺', '费马大定理', '哥德巴赫猜想',
    '连续统假设', '哥德尔不完备定理',
  ],
};
