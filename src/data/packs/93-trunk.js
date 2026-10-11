/* ==========================================================================
   内容包 · 主干（学习主线）
   --------------------------------------------------------------------------
   这张星图有两百多个节点，初学者打开会不知道从哪儿看起。
   这里挑出一条**主线**：从最底层的 ZFC 公理，一路造出数系（ℕ → ℤ → ℚ → ℝ），
   再到测度、积分、L^p、RN 定理。
   主干上的点必须满足「不看它就接不上后面」——它要么是某个概念的入口，
   要么是整条线绕不过去的那一步。

   ⭐⭐ 按内容准则第 ① 条，主干按**构造顺序**排：新对象必须是**造**出来的，
   不是「满足某组性质的东西」。所以 ℝ 那一段的顺序是
   ℕ 存在 → 归纳原理 → 商集 → ℤ → ℚ → 绝对值 → Cauchy 列 → **ℝ（构造）** →
   **ℝ 是完备有序域（性质，是定理）**，而不是反过来。

   ⚠️ 但主干是**分段**的（一、数系；二、序与选择；三、测度；四、积分；五、函数空间），
   段与段之间是主题切换 —— 所以**段内**层号递增，**跨段会回跳**（第二段是「工具箱」，
   层号从 2 层重新开始），段内也会有几处前向引用（数系那一段用到了第二段的偏序集）。
   **不要为了「全局层号单调」去重排**，那会把这条主线拆散。
   自检：`bun tools/_trunkcheck.mjs`（id 存在性 + 前向依赖分类）。

   括号里的数字是**当前**层号（依赖深度）。层号是运行时算出来的、内容一改就变，
   **以 `bun tools/_layers.mjs` 为准**；`_trunkcheck.mjs --apply` 可以刷新这些数字。

   用法：图例上方的工具条点「主干」→ 只留这些点，其余全藏起来。

   ⚠️ 加节点/改内容时记得回来看看：新节点要不要进主干、走掉的 id 要删掉。
      结构上它只影响显示，不影响任何数学内容。
   ========================================================================== */
window.MG = window.MG || {};

MG.trunk = [

  /* ================= 一、从 ZFC 造出数系（地基，一步一层） ================= */
  'ax.ext',                    //  0 层  外延公理：集合相等靠什么
  'def.empty',                 //  0 层  空集 ∅
  'def.subset',                //  1 层  子集
  'def.power-set',             //  3 层  幂集 𝒫(X)（生成的 σ-代数、外测度都踩在它上面）
  'thm.empty',                 //  5 层  空集存在
  'def.pair',                  //  3 层  有序对
  'thm.omega',                 //  5 层  自然数集 ℕ 存在（无穷公理 + 分离）
  'def.rel',                   //  4 层  关系
  'thm.induction',             //  6 层  归纳原理与递推定义
  'def.function',              //  5 层  函数
  'def.quotient-set',          //  5 层  商集与等价类 —— ℤ、ℚ、ℝ 用的是同一招
  'def.int',                   //  7 层  整数 ℤ = (ℕ×ℕ)/~（差相同）
  'def.group',                 //  6 层  群 = 集合 + 运算 + 公理（代数语言本身）
  'def.ring',                  //  7 层  环 = 阿贝尔群 + 乘法 + 分配律
  'def.field',                 //  7 层  域 = 两个阿贝尔群 + 分配律
  'def.ordered-field',         //  8 层  有序域 = 域 + 与运算相容的全序
  'def.rat',                   //  9 层  有理数 ℚ = (ℤ×(ℤ∖{0}))/~（分数值相同）—— 第一个有序域
  'def.abs',                   //  9 层  绝对值 —— Cauchy 列的定义就要用它
  'def.cauchy-null',           // 11 层  有理 Cauchy 列 / 零列 / 等价
  'def.real',                  // 12 层  实数 ℝ：由 Cauchy 列**构造**（不是公理刻画）
  'thm.real-ordered-field',    // 13 层  ℝ 是完备有序域 —— 性质是定理，含**确界原理**
  'def.interval',              // 13 层  区间
  'def.sequence-limit',        // 13 层  数列极限

  /* ========================== 二、序与选择（工具） ========================== */
  'def.poset',                 //  5 层  偏序集
  'def.chain',                 //  6 层  链
  'def.bound',                 //  6 层  上界与极大元
  'ax.choice',                 //  9 层  选择公理
  'lem.zorn',                  //  9 层  佐恩引理

  /* ======================= 三、测度（分析的地基） ======================= */
  'def.set-ring',              //  2 层  环与代数
  'def.sigma-algebra',         //  4 层  σ-代数
  'def.generated-sigma',       //  5 层  生成的 σ-代数
  'def.borel',                 //  6 层  Borel σ-代数
  'def.extended-real',         // 13 层  扩充实数 [−∞,+∞] —— 测度的取值落在这里
  'def.measure',               // 14 层  测度
  'def.outer-measure',         // 14 层  外测度（定义在幂集上，只有次可加性）
  'def.null-set',              // 15 层  零集与完备
  'thm.caratheodory',          // 16 层  Carathéodory 定理：外测度 → 测度
  'def.ae',                    // 16 层  几乎处处

  /* ============================== 四、积分 ============================== */
  'def.measurable-function',   //  6 层  可测函数
  'def.simple-function',       //  7 层  简单函数
  'def.integral-simple',       // 16 层  简单函数的积分
  'def.integral-nonneg',       // 17 层  非负函数的积分
  'thm.mct',                   // 18 层  单调收敛定理
  'def.integrable',            // 19 层  可积 / L¹
  'lem.fatou',                 // 19 层  Fatou 引理
  'thm.dct',                   // 20 层  控制收敛定理
  'thm.fubini-tonelli',        // 20 层  Fubini–Tonelli

  /* ========================= 五、函数空间与微分 ========================= */
  'def.ac-function',           // 14 层  绝对连续函数
  'def.derivative',            // 15 层  导数
  'def.bounded-variation',     // 16 层  有界变差 BV
  'def.lp-norm',               // 18 层  L^p 范数
  'thm.holder',                // 19 层  Hölder 不等式
  'def.locally-integrable',    // 20 层  局部可积
  'thm.lp-banach',             // 21 层  L^p 是 Banach 空间
  'thm.ftc-lebesgue',          // 22 层  微积分基本定理（Lebesgue 版）
  'def.maximal-function',      // 22 层  极大函数
  'thm.lebesgue-radon-nikodym',// 21 层  Lebesgue–Radon–Nikodym 定理
  'thm.riesz-representation-lp', // 22 层  (L^p)* ≅ L^q
  'thm.lebesgue-differentiation', // 24 层  Lebesgue 微分定理

  /* ================= 六、范畴与函子（换一套语言） ================= */
  /* 前五段都在「集合 + 元素」的语言里做数学。这一条新主线（六 / 七 / 八 三段）
     把语言换成「范畴 + 箭头」，最后落到紧 Hausdorff 空间上的层。
     拆成三段只是为了让**段内层号单调**（依赖深度会上下跳，但学习顺序不会）。 */
  'def.category',              //  7 层  范畴（本线的入口）
  'def.functor',               //  8 层  函子
  'def.natural-transformation',//  9 层  自然变换（函子之间的翻译）
  'def.commutative-diagram',   //  9 层  图与交换图（图 = 函子；索引范畴是预序时才叫交换图）
  'def.adjoint',               //  9 层  伴随（两个方向互为最佳）
  'def.presheaf',              //  9 层  预层（反变函子）
  'def.limit',                 // 11 层  极限（泛锥）
  'def.representable',         // 12 层  表示函子（万有元素）
  'lem.yoneda',                // 13 层  米田引理（自然变换集 ≅ F(X)）

  /* ============ 七、覆盖、层与凝聚态（新语言长出的东西） ============ */
  'def.grothendieck-topology', // 14 层  Grothendieck 拓扑（什么算覆盖）
  'def.chaus',                 // 15 层  紧 Hausdorff 空间范畴（下一步的场地）
  'def.sheaf',                 // 15 层  层（能粘的预层）
  'def.topos',                 // 16 层  拓扑斯（几何的代数替身）
  'def.compactly-generated',   //    层  紧生成空间（底拓扑空间的场地）
  'def.condensed-set',         // 16 层  凝聚态集 = CHaus 上的层
  'def.abelian-sheaf',         // 16 层  阿贝尔层（层里的阿贝尔群）
  'def.condensed-abelian-group', // 17 层  凝聚态阿贝尔群

  /* ==================== 八、同调代数（复形这套机器） ==================== */
  'def.cochain-complex',       // 10 层  复形（两两复合为零）
  'def.cohomology',            // 13 层  同调（把复形读成不变量）
  'def.abelian-category',      // 16 层  阿贝尔范畴（做同调代数的场地）
  'thm.long-exact'             // 16 层  长正合列
];
