/* ==========================================================================
   数学星图 · 星团定义（星系内部的「一套自足的装置」）
   --------------------------------------------------------------------------
   分类哲学：

     ★ 星团 = 为了造出某个「能用的东西」而存在的一整套结果。
       它内部的关系再密也无所谓 —— 那是它的私事。
       例：测度论整套构造只为了做出 Lebesgue 积分；局部化整套只为了做出 W⁻¹C。

     ★⛔ 星团**不按课程 / 讲义 / 笔记来源分**。
       同一个东西几门课都讲 → 它只属于「它在数学上属于的那个装置」。
       按来源分会出现「积分这个团里混进可测函数和乘积测度」这种事，
       那样星团就不能回答「这是干什么用的」，整张图就没意义了。

     ★ 星团是「对外连接的单位」。
       跨星团的连线是整块对整块的（引擎会自动把节点级连线聚合成星团级粗线），
       你不需要、也不应该去逐点连。

     ★ 判据（满足两条以上就是独立星团）：
       ① 有一条清晰的「主线」——从基础概念推到一个标志性结果；
       ② 内部几乎不和外面打交道，对外只需要一两个入口；
       ③ 你能用一句话说清它「造出了什么」。

     ★ 尺度：星团里不要塞 40 个点以上。一个团跨十几个层号，多半是两个装置
       被糊在一起了 —— 拆开。（反例：「积分」曾经是 45 个点、跨 18 层，
       其实里面混着可测函数、乘积测度、收敛类型三套东西。）

   字段：
     id       全局唯一，建议 <星系id>.<名字>
     name     显示名（放大到中等缩放时出现在星团中央）
     parent   所属星系 id（必须是 regions.js 里有的）
     color    可选；不写就继承星系颜色
     hub      **这个星团「要造出来的那个东西」的节点 id**。
              它是这个装置的中心天体：画亮核、定中心、分尺度展开都靠它。
              判据：这个装置是为了做出什么而存在的？那个东西就是 hub。
              （不是「层号最小的那个」—— 那是入口，不是中心。例：积分的 hub 是
              「可积 / L¹」，不是「简单函数的积分」。）
              不写 = 这个团还没定中心，引擎把它画成散着的点。
     desc     一句话说明「它造出了什么」

   节点侧：在 node 上写 cluster: '<星团 id>' 即归属；不写就直属于星系。
   ========================================================================== */
window.MG = window.MG || {};

MG.clusters = [

  /* ------------------------------------------------ 星系：数理逻辑 */
  {
    id: 'logic.fol',
    name: '一阶语言与公式',
    parent: 'logic',
    hub: 'def.first-order-language',
    desc: '造出「公理写在哪门语言里」这件事本身：符号表 → 项与公式 → 代入 → 满足关系。ZFC 的两条公理模式用的就是它。（形式系统、可计算性、模型论待补。）'
  },

  /* ------------------------------------------------ 星系：集合论 */
  {
    id: 'set.zfc',
    name: 'ZFC 公理系统',
    parent: 'set-theory',
    hub: 'ax.ext',
    desc: '造出「集合」这套语言本身：九条公理定下什么叫集合、怎么造集合。'
  },
  {
    id: 'set.construct',
    name: '集合的构造',
    parent: 'set-theory',
    hub: 'def.subset',
    desc: '造出日常要用的零件：空集、子集、并交差补、幂集、有序对、笛卡尔积。'
  },
  {
    id: 'set.rel',
    name: '关系与函数',
    parent: 'set-theory',
    hub: 'def.function',
    desc: '造出函数：关系加上单值性。顺带造出等价关系与商集 —— 后面 ℤ / ℚ / ℝ 全靠这一招粘出来。'
  },
  {
    id: 'set.cardinal',
    name: '基数与等势',
    parent: 'set-theory',
    hub: 'def.cardinal',
    desc: '造出「集合有多大」这把尺子：等势 → 基数 → 可数与不可数 → Cantor 定理 → 基数可比。'
  },
  {
    id: 'set.numbers',
    name: '数系的构造',
    parent: 'set-theory',
    hub: 'def.real',
    desc: '造出数本身：ℕ → ℤ → ℚ → ℝ → ℂ。每一步都是同一招 —— 把已有对象按等价关系粘成等价类；ℝ 那一跳是把 ℚ 按 Cauchy 列**完备化**。⚠️ ℝ 是造出来的，三组性质（域、序、确界原理）是**定理**，不是定义。'
  },
  {
    id: 'set.ordinal',
    name: '序数与超限',
    parent: 'set-theory',
    hub: 'def.ordinal',
    desc: '造出「无穷有多长」这把尺子：良序集的序型 → von Neumann 序数（传递的良序集）→ 三歧性 → 超限递归 / 超限归纳，顺带发现序数全体是真类。'
  },

  /* ------------------------------------------------ 星系：序理论 */
  {
    id: 'order.structure',
    name: '序结构',
    parent: 'order-theory',
    hub: 'def.poset',
    desc: '造出「偏序集」这套舞台：链、上界、极大元、良序、有限特征。'
  },
  {
    id: 'order.choice',
    name: '选择原理',
    parent: 'order-theory',
    hub: 'ax.choice',
    desc: '造出存在性证明的万能发动机：选择公理 ⟺ 良序定理 ⟺ 佐恩引理 ⟺ Hausdorff 极大原理 ⟺ Tukey 引理。五个说法是一个强连通块，永远同层。'
  },

  /* ------------------------------------------------ 星系：抽象代数 */
  {
    id: 'algebra.structures',
    name: '代数结构',
    parent: 'algebra',
    hub: 'def.group',
    desc: '造出代数语言本身：**群** = 集合 + 运算 + 公理 → 子群 → 正规子群 → 商群 → 第一同构定理；再往上叠**域**（= 两个阿贝尔群 + 分配律）与**有序域**。'
  },
  {
    id: 'algebra.vectorspace',
    name: '向量空间的基',
    parent: 'algebra',
    hub: 'def.vs',
    desc: '造出线性代数的地基：每个向量空间都有基。'
  },

  /* ------------------------------------------------ 星系：拓扑学 */
  {
    id: 'topology.general',
    name: '拓扑空间',
    parent: 'topology',
    hub: 'def.topology',
    desc: '造出「开集」这套不依赖距离的语言：拓扑空间 → 闭集与闭包 → 基 → 连续映射 → 同胚。'
  },
  {
    id: 'topology.metric',
    name: '度量空间',
    parent: 'topology',
    hub: 'def.metric-space',
    desc: '造出「用距离算出来的拓扑」：完备、全有界、列紧，以及紧性的几种等价刻画。'
  },
  {
    id: 'topo.chaus',
    name: '紧 Hausdorff 空间',
    parent: 'topology',
    hub: 'prop.chaus-reflective',
    desc: '造出「紧 Hausdorff 这套范畴」：Stone–Čech 紧化 → 自由对象 → 投射对象 → 自由表示。它是一切「紧块」的来源。'
  },
  {
    id: 'topo.stone',
    name: 'Stone 与 Stonean',
    parent: 'topology',
    hub: 'thm.stone-profinite',
    desc: '造出「不连通的那一半紧 Hausdorff 空间」：全不连通 → Stone 空间 = 投射有限空间 → 极不连通的 Stonean 空间 → Gleason 定理与布尔环表示。'
  },
  {
    id: 'topo.cg',
    name: '紧生成空间与弱 Hausdorff',
    parent: 'topology',
    hub: 'def.compactly-generated',
    desc: '造出「乘积好用的拓扑空间范畴」：紧生成空间（$k$-空间）→ $k$-拓扑与 $k$-化 → 商映射与积 → 紧开拓扑 → 弱 Hausdorff → $\\mathrm{CGWH}$ 是反射子范畴。'
  },

  /* ------------------------------------------------ 星系：分析学 */
  {
    id: 'analysis.real',
    name: '实数与极限',
    parent: 'analysis',
    hub: 'def.sequence-limit',
    desc: '在造好的 ℝ 上搭起分析的语言：区间 → 数列极限与级数 → 连续 → 导数。**确界原理**（ℝ 是完备有序域）也在这里 —— 它是分析学的引擎。（ℝ 与 ℂ 本身的构造在「数系的构造」里。）'
  },
  {
    id: 'analysis.setclass',
    name: '集合族与 σ-代数',
    parent: 'analysis',
    hub: 'def.sigma-algebra',
    desc: '造出「能承载测度的集合族」：环 → σ-环 → σ-代数 → 生成、Borel、单调类判据。测度本身在下一个团里。'
  },
  {
    id: 'analysis.measure',
    name: '测度的构造',
    parent: 'analysis',
    hub: 'def.measure',
    desc: '造出「测度」这个对象本身：预测度 → 外测度 → Carathéodory 扩张 → 完备化与唯一性 → Lebesgue–Stieltjes 测度。'
  },
  {
    id: 'analysis.measurable',
    name: '可测函数与收敛',
    parent: 'analysis',
    hub: 'def.measurable-function',
    desc: '造出「可测」这套语言：可测函数 → 简单函数逼近 → 五种收敛 → Egorov / Lusin。有了它才能谈积分。'
  },
  {
    id: 'analysis.integral',
    name: '积分',
    parent: 'analysis',
    hub: 'def.integrable',
    desc: '造出 Lebesgue 积分与 L¹：简单函数的加权和 → 非负函数的 sup → 单调收敛 / Fatou / 控制收敛三大定理 → 可积函数。'
  },
  {
    id: 'analysis.product',
    name: '乘积测度与 Fubini',
    parent: 'analysis',
    hub: 'def.product-measure',
    desc: '造出「一块块算」的办法：积 σ-代数 → 截口 → 乘积测度 → Fubini–Tonelli。'
  },
  {
    id: 'analysis.signed',
    name: '符号测度与分解',
    parent: 'analysis',
    hub: 'def.signed-measure',
    desc: '造出「带符号的测度」及其结构定理：Hahn 分解 → Jordan 分解 → 全变差 → Radon–Nikodym。'
  },
  {
    id: 'analysis.differentiation',
    name: '微分定理',
    parent: 'analysis',
    hub: 'def.maximal-function',
    desc: '造出「逐点求导」这套工具：覆盖引理 → 极大函数 → Lebesgue 微分定理 → RN 导数的点态公式。'
  },
  {
    id: 'analysis.bv',
    name: '有界变差与绝对连续',
    parent: 'analysis',
    hub: 'def.bounded-variation',
    desc: '造出「测度 ↔ 函数」的字典：全变差 → BV 的 Jordan 分解 → NBV 与 Borel 测度一一对应 → 微积分基本定理。'
  },
  {
    id: 'analysis.lp',
    name: 'L^p 空间',
    parent: 'analysis',
    hub: 'def.lp-norm',
    desc: '造出函数空间本身：Hölder / Minkowski → Banach 完备 → 空间之间的包含 → 对偶 (L^p)* ≅ L^q。'
  },

  /* ------------------------------------------------ 星系：范畴论 */
  {
    id: 'cat.basic',
    name: '范畴与图',
    parent: 'category',
    hub: 'def.category',
    desc: '造出「范畴」这个概念本身：先有图 $(V, E, s, t)$，再配上复合与单位，得到一个六元组。'
  },
  {
    id: 'cat.functor',
    name: '函子与自然变换',
    parent: 'category',
    hub: 'def.natural-transformation',
    desc: '造出「范畴之间的翻译」：函子 → 忠实 / 满 / 全忠实 → 自然变换 → 范畴等价。'
  },
  {
    id: 'cat.limit',
    name: '图与极限',
    parent: 'category',
    hub: 'def.limit',
    desc: '造出「在图上取值」这件事：交换图 → 锥 → 极限（泛锥）→ 积 / 纤维积 / 等化子。'
  },
  {
    id: 'cat.structure',
    name: '单满、子对象与像',
    parent: 'category',
    hub: 'def.subobject',
    desc: '造出「用箭头替代元素」这套语言：可消性（单 / 满）→ 子对象 → 像与余像 → 泛元素。'
  },
  {
    id: 'cat.algebra',
    name: '范畴里的代数结构',
    parent: 'category',
    hub: 'def.group-object',
    desc: '把「集合 + 运算 + 公理」搬到任意有有限积的范畴里：幺半群对象 → 群对象 → 阿贝尔群对象。⭐ $\\mathrm{Ab}(\\mathbf{Set})=\\mathbf{Ab}$、$\\mathrm{Ab}(\\mathbf{Top})$ = 拓扑阿贝尔群、$\\mathrm{Ab}(\\mathrm{Cond})=\\mathrm{CondAb}$ —— 代数那条线与凝聚态那条线在这里接上。'
  },
  {
    id: 'cat.yoneda',
    name: '预层与米田',
    parent: 'category',
    hub: 'lem.yoneda',
    desc: '造出「表示」这套语言：预层范畴是落点，米田引理说自然变换集与 $F(X)$ 一一对应，稠密性定理说每个预层都是可表示预层的余极限。'
  },
  {
    id: 'cat.adjoint',
    name: '伴随与反射',
    parent: 'category',
    hub: 'def.adjoint',
    desc: '造出「两个方向之间的最佳翻译」：伴随 → 单位与余单位 → 保极限 → 伴随函子定理 → 反射子范畴 → Kan 延拓。'
  },
  {
    id: 'cat.sheaf',
    name: '层与拓扑',
    parent: 'category',
    hub: 'def.sheaf',
    desc: '造出「覆盖」这套语言：筛 → 预拓扑 / Grothendieck 拓扑 → 层（下降条件）→ Čech 函子与层化 → site 的层范畴的好性质。'
  },
  {
    id: 'cat.topos',
    name: '拓扑斯',
    parent: 'category',
    hub: 'def.topos',
    desc: '造出「几何的代数替身」：预拓扑斯 → 预标准拓扑 → 生成元 → 拓扑斯 → Giraud 定理 → 拟紧拟分离 → 拓扑斯的态射。'
  },

  /* ------------------------------------------------ 星系：同调代数 */
  {
    id: 'hom.ab',
    name: '加法与阿贝尔范畴',
    parent: 'homology',
    hub: 'def.abelian-category',
    desc: '造出做同调代数的场地：预加法 / 加法范畴 → 预阿贝尔 → 阿贝尔范畴 → AB 公理 → Grothendieck 范畴。'
  },
  {
    id: 'hom.complex',
    name: '复形与导出三角',
    parent: 'homology',
    hub: 'def.distinguished-triangle',
    desc: '造出「两两复合为零」的机器：复形 → 同伦 → 同伦范畴 → 映射锥 → 导出三角，以及三角的旋转与延拓。'
  },
  {
    id: 'hom.cohomology',
    name: '同调与正合列',
    parent: 'homology',
    hub: 'def.cohomology',
    desc: '造出「把复形读成不变量」这件事：同调 → 上同调函子 → 长正合列 → 拟同构与零调 → 内射对象。'
  },
  {
    id: 'hom.spectral',
    name: '过滤与谱序列',
    parent: 'homology',
    hub: 'def.spectral-sequence',
    desc: '造出「逐层逼近同调」的工具：带过滤的对象 → 关联分次 → 谱序列从 $E_{r}$ 页逐页算到 $E_{\\infty}$。'
  },
  {
    id: 'hom.sheafcoh',
    name: '层上同调',
    parent: 'homology',
    hub: 'def.sheaf-cohomology',
    desc: '把导出函子开到层上：$H^{n}(X, M) = R^{n}\\Gamma(X, M)$ → Čech 上同调（便宜的算法）→ Cartan–Leray 谱序列把它们接起来 → 无环层 → 拓扑斯态射的导出函子。'
  },
  {
    id: 'hom.sheaf',
    name: '阿贝尔层',
    parent: 'homology',
    hub: 'def.abelian-sheaf',
    desc: '造出「拓扑斯里的阿贝尔群」：取值一般的层 → 阿贝尔层 → 拓扑斯上的阿贝尔群是 Grothendieck 范畴 → 内 Hom → 张量积 → 平坦性。'
  },

  /* ------------------------------------------------ 星系：凝聚态数学 */
  {
    id: 'cond.set',
    name: '凝聚态集',
    parent: 'condensed',
    hub: 'def.condensed-set',
    desc: '造出主角：紧 Hausdorff 空间上的层就是凝聚态集；换到自由对象上，层条件退化成「保有限积」。'
  },
  {
    id: 'cond.ab',
    name: '凝聚态阿贝尔群',
    parent: 'condensed',
    hub: 'def.condensed-abelian-group',
    desc: '在凝聚态集上做代数：阿贝尔群值层 → 截面函子 → 足够多投射对象 → 张量与内 Hom。'
  },
  {
    id: 'cond.topo',
    name: '拓扑阿贝尔群',
    parent: 'condensed',
    hub: 'thm.pontryagin-van-kampen',
    desc: '造出「拓扑阿贝尔群 → 凝聚态阿贝尔群」这条通道：关联凝聚态群（保所有极限）→ 连续同态即内部 Hom → 正合列的搬运 → Pontryagin 对偶 → 局部紧阿贝尔群不是阿贝尔范畴。'
  },
  {
    id: 'cond.cohomology',
    name: '凝聚态上同调',
    parent: 'condensed',
    hub: 'thm.real-banach-chaus-acyclic',
    desc: '造出「哪些空间的上同调会自动消失」：Stonean 上零调 → Stone 上常系数零调 → 局部紧上等于层上同调 → 半范数 / Banach 阿贝尔群与 $K$-有界正合 → 实 Banach 在紧 Hausdorff 上零调 → Breen–Deligne 分解 → $\\operatorname{RHom}$ 的逐类计算 → 局部紧阿贝尔群只剩 $\\operatorname{Ext}^{0}, \\operatorname{Ext}^{1}$。'
  }

  /* 以后加内容时，新星团往这里追加即可。留空不写 = 该星系的节点直属于星系。 */
];
