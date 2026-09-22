/* ==========================================================================
   数学星图 · 星团定义（星系内部的「一套自足的装置」）
   --------------------------------------------------------------------------
   分类哲学：

     ★ 星团 = 为了造出某个「能用的东西」而存在的一整套结果。
       它内部的关系再密也无所谓 —— 那是它的私事。
       例：测度论整套构造只为了做出 Lebesgue 积分；局部化整套只为了做出 W⁻¹C。

     ★ 星团是「对外连接的单位」。
       跨星团的连线是整块对整块的（引擎会自动把节点级连线聚合成星团级粗线），
       你不需要、也不应该去逐点连。

     ★ 判据（满足两条以上就是独立星团）：
       ① 有一条清晰的「主线」——从基础概念推到一个标志性结果；
       ② 内部几乎不和外面打交道，对外只需要一两个入口；
       ③ 你能用一句话说清它「造出了什么」。

   字段：
     id       全局唯一，建议 <星系id>.<名字>
     name     显示名（放大到中等缩放时出现在星团中央）
     parent   所属星系 id（必须是 regions.js 里有的）
     color    可选；不写就继承星系颜色
     desc     一句话说明「它造出了什么」

   节点侧：在 node 上写 cluster: '<星团 id>' 即归属；不写就直属于星系。
   ========================================================================== */
window.MG = window.MG || {};

MG.clusters = [

  /* ------------------------------------------------ 星系：集合论 */
  {
    id: 'set.zfc',
    name: 'ZFC 公理系统',
    parent: 'set-theory',
    desc: '造出「集合」这套语言本身：九条公理定下什么叫集合、怎么造集合。'
  },
  {
    id: 'set.construct',
    name: '集合的构造',
    parent: 'set-theory',
    desc: '造出日常要用的零件：空集、二元并、笛卡尔积、子集与有序对。'
  },
  {
    id: 'set.choice',
    name: '关系与选择',
    parent: 'set-theory',
    desc: '造出「从无穷族里同时挑元素」的工具：关系、函数、选择函数。'
  },
  {
    id: 'set.numbers',
    name: '数系的构造',
    parent: 'set-theory',
    desc: '造出数本身：ℕ → ℤ → ℚ → ℝ，每一步都是同一招 —— 把已有对象按等价关系粘成等价类；最后把 ℚ 按 Cauchy 列**完备化**成 ℝ。⚠️ ℝ 是造出来的，三组性质（域、序、确界原理）是**定理**，不是定义。'
  },

  /* ------------------------------------------------ 星系：序理论 */
  {
    id: 'order.structure',
    name: '序结构',
    parent: 'order-theory',
    desc: '造出「偏序集」这套舞台：链、上界、极大元、良序、有限特征。'
  },
  {
    id: 'order.maximal',
    name: '极大原理',
    parent: 'order-theory',
    desc: '造出存在性证明的万能发动机：佐恩引理、Hausdorff 极大原理、Tukey 引理。'
  },

  /* ------------------------------------------------ 星系：抽象代数 */
  {
    id: 'algebra.structures',
    name: '代数结构',
    parent: 'algebra',
    desc: '造出代数语言本身：**域** = 集合 + 两个运算 + 公理，**有序域** = 域 + 与运算相容的全序。ℚ 与 ℝ 都是实例。（代数学的笔记进来后这一团扩容：群 / 环 / 模。）'
  },
  {
    id: 'algebra.vectorspace',
    name: '向量空间的基',
    parent: 'algebra',
    desc: '造出线性代数的地基：每个向量空间都有基。'
  },

  /* ------------------------------------------------ 星系：拓扑学 */
  {
    id: 'topology.general',
    name: '拓扑空间',
    parent: 'topology',
    desc: '造出「开集」这套不依赖距离的语言：拓扑空间 → 闭集与闭包 → 基 → 连续映射 → 同胚。'
  },
  {
    id: 'topology.metric',
    name: '度量空间',
    parent: 'topology',
    desc: '造出「用距离算出来的拓扑」：完备、全有界、列紧，以及紧性的几种等价刻画。'
  },

  /* ------------------------------------------------ 星系：分析学 */
  {
    id: 'analysis.real',
    name: '实数与区间',
    parent: 'analysis',
    desc: '在造好的 ℝ 上搭起分析的语言：区间 → 上确界 → 数列极限/级数 → 连续 → 导数 → 复数。（ℝ 本身的构造在星团「数系的构造」里。）'
  },
  {
    id: 'analysis.measure',
    name: '测度的构造',
    parent: 'analysis',
    desc: '造出「测度」这个对象本身：σ-代数 → 预测度 → 外测度 → Carathéodory 扩张 → Lebesgue–Stieltjes 测度。'
  },
  {
    id: 'analysis.integral',
    name: '积分',
    parent: 'analysis',
    desc: '造出 Lebesgue 积分：简单函数的加权和 → 非负函数的 sup → 单调收敛定理想把它撑到极限。'
  },
  {
    id: 'analysis.signed',
    name: '符号测度与分解',
    parent: 'analysis',
    desc: '造出「带符号的测度」及其结构定理：Hahn 分解 → Jordan 分解 → 全变差 → Radon–Nikodym。'
  },
  {
    id: 'analysis.differentiation',
    name: 'ℝⁿ 上的微分',
    parent: 'analysis',
    desc: '造出「逐点求导」这套工具：覆盖引理 → 极大函数 → Lebesgue 微分定理 → RN 导数的点态公式。'
  },
  {
    id: 'analysis.bv',
    name: '有界变差与绝对连续',
    parent: 'analysis',
    desc: '造出「测度 ↔ 函数」的字典：全变差 → BV 的 Jordan 分解 → NBV 与 Borel 测度一一对应 → 微积分基本定理。'
  },
  {
    id: 'analysis.lp',
    name: 'L^p 空间',
    parent: 'analysis',
    desc: '造出函数空间本身：Hölder / Minkowski → Banach 完备 → 空间之间的包含 → 对偶 (L^p)* ≅ L^q。'
  }

  /* 以后加内容时，新星团往这里追加即可。留空不写 = 该星系的节点直属于星系。 */
];
