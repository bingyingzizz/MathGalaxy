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
    en: 'First-Order Languages and Formulas',
    parent: 'logic',
    hub: 'def.first-order-language',
    desc: '造出「公理写在哪门语言里」这件事本身：符号表 → 项与公式 → 代入 → 满足关系。ZFC 的两条公理模式用的就是它。'
  },

  /* ------------------------------------------------ 星系：集合论 */
  {
    id: 'set.zfc',
    name: 'ZFC 公理系统',
    en: 'The ZFC Axioms',
    parent: 'set-theory',
    hub: 'ax.ext',
    desc: '造出「集合」这套语言本身：九条公理定下什么叫集合、怎么造集合。'
  },
  {
    id: 'set.construct',
    name: '集合的构造',
    en: 'Constructing Sets',
    parent: 'set-theory',
    hub: 'def.subset',
    desc: '造出日常要用的零件：空集、子集、并交差补、幂集、有序对、笛卡尔积。'
  },
  {
    id: 'set.rel',
    name: '关系与函数',
    en: 'Relations and Mappings',
    parent: 'set-theory',
    hub: 'def.function',
    desc: '造出函数：关系加上单值性。顺带造出等价关系与商集 —— 后面 ℤ / ℚ / ℝ 全靠这一招粘出来。'
  },
  {
    id: 'set.cardinal',
    name: '基数与等势',
    en: 'Cardinals and Equinumerosity',
    parent: 'set-theory',
    hub: 'def.cardinal',
    desc: '造出「集合有多大」这把尺子：等势 → 基数 → 可数与不可数 → Cantor 定理 → 基数可比。'
  },
  {
    id: 'set.numbers',
    name: '数系的构造',
    en: 'Constructing the Number Systems',
    parent: 'set-theory',
    hub: 'def.real',
    desc: '造出数本身：ℕ → ℤ → ℚ → ℝ → ℂ。每一步都是同一招 —— 把已有对象按等价关系粘成等价类；ℝ 那一跳是把 ℚ 按 Cauchy 列**完备化**。⚠️ ℝ 是造出来的，三组性质（域、序、确界原理）是**定理**，不是定义。'
  },
  {
    id: 'set.ordinal',
    name: '序数与超限',
    en: 'Ordinals and Transfinite Recursion',
    parent: 'set-theory',
    hub: 'def.ordinal',
    desc: '造出「无穷有多长」这把尺子：良序集的序型 → von Neumann 序数（传递的良序集）→ 三歧性 → 超限递归 / 超限归纳，顺带发现序数全体是真类。'
  },

  /* ------------------------------------------------ 星系：序理论 */
  {
    id: 'order.structure',
    name: '序结构',
    en: 'Order Structures',
    parent: 'order-theory',
    hub: 'def.poset',
    desc: '造出「偏序集」这套舞台：链、上界、极大元、良序、有限特征。'
  },
  {
    id: 'order.choice',
    name: '选择原理',
    en: 'Choice Principles',
    parent: 'order-theory',
    hub: 'ax.choice',
    desc: '造出存在性证明的万能发动机：选择公理 ⟺ 良序定理 ⟺ 佐恩引理 ⟺ Hausdorff 极大原理 ⟺ Tukey 引理。五个说法是一个强连通块，永远同层。'
  },

  /* ------------------------------------------------ 星系：抽象代数 */
  {
    id: 'algebra.structures',
    name: '代数结构',
    en: 'Algebraic Structures',
    parent: 'algebra',
    hub: 'def.group',
    desc: '造出代数语言本身：**群** = 集合 + 运算 + 公理 → 子群 → 正规子群 → 商群 → 第一同构定理；再往上叠**域**（= 两个阿贝尔群 + 分配律）与**有序域**。'
  },
  {
    id: 'algebra.vectorspace',
    name: '向量空间的基',
    en: 'Bases of Vector Spaces',
    parent: 'algebra',
    hub: 'def.vs',
    desc: '造出线性代数的地基：线性无关 / 张成 → 基 → 维数（任意两组基等势）。$\\operatorname{span} S = \\bigcap \\{W \\supseteq S\\}$ 这个「取一切之交」的模板与 $\\sigma$-代数的生成是同一招。'
  },
  {
    id: 'algebra.spectral',
    name: '特征值与 Jordan 型',
    en: 'Eigenvalues and Jordan Form',
    parent: 'algebra',
    hub: 'thm.jordan-canonical-form',
    desc: '造出「一个算子在换基下长什么样」的完整答案：特征值与特征多项式 → Cayley–Hamilton → 极小多项式 → **可对角化判据** → 根子空间分解 → **Jordan 标准形**（代数闭域上相似分类的最终形态）。多项式环 $K[x]$ 那套语言（唯一分解整环）在这里第三次出场。'
  },
  {
    id: 'algebra.inner',
    name: '内积空间与正交性',
    en: 'Inner Product Spaces and Orthogonality',
    parent: 'algebra',
    hub: 'thm.spectral-theorem',
    desc: '在向量空间上加一把「尺子」：内积 → 诱导范数与距离 → Cauchy–Schwarz → 正交与正交补 → **Gram–Schmidt** 与正交投影 → 伴随算子 → **谱定理**（实对称 / 复正规可正交对角化）→ 二次型与 Sylvester 判据 → 奇异值分解。'
  },
  {
    id: 'algebra.multilinear',
    name: '多重线性与张量',
    en: 'Multilinear Algebra and Tensors',
    parent: 'algebra',
    hub: 'def.exterior-algebra',
    desc: '造出「把双线性型变成线性映射」的机器：双线性型 → **张量积的万有性质** → 张量 ⊣ 内 Hom（伴随）→ 外幂与外代数 → 对称代数 → **行列式 = 最高外幂上的作用**（把行列式的来源统一到外代数）。'
  },
  {
    id: 'algebra.group-action',
    name: '群作用与置换',
    en: 'Group Actions and Permutations',
    parent: 'algebra',
    hub: 'def.group-action',
    desc: '造出「让群去搬东西」这套机器：群作用（轨道 / 稳定子）→ **轨道–稳定子定理** → 类方程 → Lagrange 定理 → 置换群 $S_n$ 与循环分解 → 符号与交错群 $A_n$ → Cayley 定理 → 循环群 → Sylow 定理。核心一句话：**数轨道的大小 = 算稳定子的指数**。'
  },
  {
    id: 'algebra.solvable',
    name: '合成列与可解群',
    en: 'Composition Series and Solvable Groups',
    parent: 'algebra',
    hub: 'thm.jordan-holder',
    desc: '造出「把群拆成不可再分的零件」这套语言：单群 → 合成列 → **Jordan–Hölder**（合成因子与重数唯一）→ 可解群（阿贝尔商链 / 导出列终止）→ 可解性对子群、商群与正规扩张的封闭性 → **$S_n$ 可解 $\\iff n \\le 4$**。最后一个命题是 Abel–Ruffini 的群论一半：分界线落在 $A_4$ 与 $A_5$ 之间。'
  },
  {
    id: 'algebra.matrix',
    name: '矩阵与行列式',
    en: 'Matrices and Determinants',
    parent: 'algebra',
    hub: 'def.determinant',
    desc: '造出「把线性映射写成数字阵列」的整套工具：矩阵 → 选定基后的线性映射 ⟷ 矩阵 → 基变换与相似 → 初等变换与秩 → 线性方程组的解结构 → **行列式**（交错多重线性的唯一刻画）→ 乘性 → Laplace 展开与 Cramer 法则。'
  },
  {
    id: 'algebra.polynomial',
    name: '多项式与因式分解',
    en: 'Polynomials and Factorization',
    parent: 'algebra',
    hub: 'thm.fundamental-algebra',
    desc: '造出 $K[x]$ 这套装置：多项式 → 带余除法（$K[x]$ 是欧几里得整环）→ 因式定理 → **代数基本定理**（$\\mathbb{C}$ 代数闭）→ 不可约多项式与唯一分解。它是特征多项式、有理标准型与 Galois 理论的共同地基。'
  },
  {
    id: 'algebra.linmap',
    name: '线性映射与秩',
    en: 'Linear Maps and Rank',
    parent: 'algebra',
    hub: 'thm.rank-nullity',
    desc: '造出「线性映射」这套语言：线性映射 → 核与像 → 商空间与第一同构定理 → **秩-零化度定理** → 对偶空间与零化子。它是「群同态 → 正规子群 → 第一同构定理」那套模板在向量空间上的重演。'
  },

  /* ------------------------------------------------ 星系：拓扑学 */
  {
    id: 'topology.general',
    name: '拓扑空间',
    en: 'Topological Spaces',
    parent: 'topology',
    hub: 'def.topology',
    desc: '造出「开集」这套不依赖距离的语言：拓扑空间 → 闭集与闭包 → 基 → 连续映射 → 同胚。'
  },
  {
    id: 'topology.metric',
    name: '度量空间',
    en: 'Metric Spaces',
    parent: 'topology',
    hub: 'def.metric-space',
    desc: '造出「用距离算出来的拓扑」：完备、全有界、列紧，以及紧性的几种等价刻画。'
  },
  {
    id: 'topo.chaus',
    name: '紧 Hausdorff 空间',
    en: 'Compact Hausdorff Spaces',
    parent: 'topology',
    hub: 'prop.chaus-reflective',
    desc: '造出「紧 Hausdorff 这套范畴」：Stone–Čech 紧化 → 自由对象 → 投射对象 → 自由表示。它是一切「紧块」的来源。'
  },
  {
    id: 'topo.stone',
    name: 'Stone 与 Stonean',
    en: 'Stone and Stonean Spaces',
    parent: 'topology',
    hub: 'thm.stone-profinite',
    desc: '造出「不连通的那一半紧 Hausdorff 空间」：全不连通 → Stone 空间 = 投射有限空间 → 极不连通的 Stonean 空间 → Gleason 定理与布尔环表示。'
  },
  {
    id: 'topo.cg',
    name: '紧生成空间与弱 Hausdorff',
    en: 'Compactly Generated Spaces and Weak Hausdorff',
    parent: 'topology',
    hub: 'def.compactly-generated',
    desc: '造出「乘积好用的拓扑空间范畴」：紧生成空间（$k$-空间）→ $k$-拓扑与 $k$-化 → 商映射与积 → 紧开拓扑 → 弱 Hausdorff → $\\mathrm{CGWH}$ 是反射子范畴。'
  },

  /* ------------------------------------------------ 星系：分析学 */
  {
    id: 'analysis.real',
    name: '实数与极限',
    en: 'Real Numbers and Limits',
    parent: 'analysis',
    hub: 'def.sequence-limit',
    desc: '在造好的 ℝ 上搭起分析的语言：区间 → 数列极限与级数 → 连续 → 导数。**确界原理**（ℝ 是完备有序域）也在这里 —— 它是分析学的引擎。（ℝ 与 ℂ 本身的构造在「数系的构造」里。）'
  },
  {
    id: 'analysis.real-calc',
    name: '实数的运算与不等式',
    en: 'Arithmetic and Inequalities on the Reals',
    parent: 'analysis',
    hub: 'thm.nth-root',
    desc: '把「在 ℝ 上算」与「比大小」的规则一次立全：域等式 → 序与四则运算 → 绝对值 → 阿基米德的 ε 形式与取整 → 整数幂 → 指数律 → n 次方根 → 有理/实数指数 → 二项式 → Bernoulli。这一团是后面所有 ε 估计与放缩的**许可证**。'
  },
  {
    id: 'analysis.completeness',
    name: '实数完备性的等价刻画',
    en: 'Equivalent Forms of Completeness of the Reals',
    parent: 'analysis',
    hub: 'thm.completeness-equivalent',
    desc: '造出「$\\mathbb{R}$ 没有洞」的各种说法：确界原理 → 单调有界 → 区间套 → Bolzano–Weierstrass → Cauchy 准则 → 度量完备。它们是同一件事的六副面孔，永远同层 —— 初等分析里一切「存在某个极限」的定理都从这里取发动机。'
  },
  {
    id: 'analysis.continuity',
    name: '连续与紧性',
    en: 'Continuity and Compactness',
    parent: 'analysis',
    hub: 'thm.ivt',
    desc: '造出「连续函数长什么样」：紧集上有界、取到最值、一致连续；介值定理与零点定理。反函数的连续性、初等函数的合法性都挂在这里。'
  },
  {
    id: 'analysis.mvt',
    name: '微分中值定理与 Taylor',
    en: 'Mean Value Theorems and Taylor',
    parent: 'analysis',
    hub: 'thm.taylor',
    desc: '造出「把函数的增量翻译成导数」这套工具：Fermat 引理 → Rolle → Lagrange → Cauchy → L\'Hôpital，顶点是 Taylor 公式 —— 用导数把一个函数局部地重写成多项式。'
  },
  {
    id: 'analysis.riemann',
    name: 'Riemann 积分',
    en: 'The Riemann Integral',
    parent: 'analysis',
    hub: 'thm.ftc-riemann-part2',
    desc: '造出「曲线下的面积」这套工具：分割 → 上和 / 下和 → 可积性判据 → 微积分基本定理（Newton–Leibniz）。顶点是那条**把可积性翻译成零测集语言**的判据 —— 它在这里与 Lebesgue 积分那一侧正式接头。'
  },
  {
    id: 'analysis.series',
    name: '数项级数的敛散性',
    en: 'Convergence Tests for Series',
    parent: 'analysis',
    hub: 'def.absolute-convergence',
    desc: '造出「无限多项相加靠不靠谱」这套判据：Cauchy 准则 → 比较判别法 → **Kummer 判别法**（d\'Alembert / Raabe / Bertrand / Gauss 全是它的特例）→ 根值 / 积分 / 凝聚判别法 → Abel–Dirichlet 判别法。分水岭是**绝对收敛**：绝对收敛的级数可以随便重排、相乘，条件收敛的不行。'
  },
  {
    id: 'analysis.uniform',
    name: '函数列、幂级数与初等函数',
    en: 'Sequences of Functions, Power Series and Elementary Functions',
    parent: 'analysis',
    hub: 'def.uniform-convergence',
    desc: '造出「取极限与积分 / 求导能不能交换」的判据：逐点收敛 → **一致收敛**（三种交换定理）→ Weierstrass 判别法 → Dini 定理。**幂级数**是一致收敛的旗舰应用 —— 而 $\\exp$、$\\log$、$\\sin$、$\\cos$、$\\pi$ 全都由幂级数定义，初等函数在这里第一次有了合法出身。'
  },
  {
    id: 'analysis.multivariable',
    name: '多元微分',
    en: 'Multivariable Differentiation',
    parent: 'analysis',
    hub: 'thm.inverse-function',
    desc: '造出「把微分学线性代数化」的整套装置：偏导 / 方向导数 → **可微 = 存在一个线性映射** → 梯度、Jacobi、Hessian → 链式法则（矩阵乘法）→ 混合偏导可交换 → 中值定理与 Taylor → 极值判别（Hessian 正定 $\\iff$ 极小）。后半段是「局部 → 标准形」：压缩映射原理当引擎，撑起逆映射定理、隐函数定理、**秩定理**，再加上浸入 / 淹没、正则值原像、Lagrange 乘子、Morse 引理与 Sard 定理。'
  },
  {
    id: 'analysis.setclass',
    name: '集合族与 σ-代数',
    en: 'Families of Sets and Sigma-Algebras',
    parent: 'analysis-measure',
    hub: 'def.sigma-algebra',
    desc: '造出「能承载测度的集合族」：环 → σ-环 → σ-代数 → 生成、Borel、单调类判据。测度本身在下一个团里。'
  },
  {
    id: 'analysis.measure',
    name: '测度的构造',
    en: 'Constructing Measures',
    parent: 'analysis-measure',
    hub: 'def.measure',
    desc: '造出「测度」这个对象本身：预测度 → 外测度 → Carathéodory 扩张 → 完备化与唯一性 → Lebesgue–Stieltjes 测度。'
  },
  {
    id: 'analysis.measurable',
    name: '可测函数与收敛',
    en: 'Measurable Functions and Convergence',
    parent: 'analysis-measure',
    hub: 'def.measurable-function',
    desc: '造出「可测」这套语言：可测函数 → 简单函数逼近 → 五种收敛 → Egorov / Lusin。有了它才能谈积分。'
  },
  {
    id: 'analysis.integral',
    name: '积分',
    en: 'Integration',
    parent: 'analysis-measure',
    hub: 'def.integrable',
    desc: '造出 Lebesgue 积分与 L¹：简单函数的加权和 → 非负函数的 sup → 单调收敛 / Fatou / 控制收敛三大定理 → 可积函数。'
  },
  {
    id: 'analysis.product',
    name: '乘积测度与 Fubini',
    en: 'Product Measures and Fubini',
    parent: 'analysis-measure',
    hub: 'def.product-measure',
    desc: '造出「一块块算」的办法：积 σ-代数 → 截口 → 乘积测度 → Fubini–Tonelli。'
  },
  {
    id: 'analysis.signed',
    name: '符号测度与分解',
    en: 'Signed Measures and Decompositions',
    parent: 'analysis-measure',
    hub: 'def.signed-measure',
    desc: '造出「带符号的测度」及其结构定理：Hahn 分解 → Jordan 分解 → 全变差 → Radon–Nikodym。'
  },
  {
    id: 'analysis.differentiation',
    name: '微分定理',
    en: 'Differentiation Theorems',
    parent: 'analysis-measure',
    hub: 'def.maximal-function',
    desc: '造出「逐点求导」这套工具：覆盖引理 → 极大函数 → Lebesgue 微分定理 → RN 导数的点态公式。'
  },
  {
    id: 'analysis.bv',
    name: '有界变差与绝对连续',
    en: 'Bounded Variation and Absolute Continuity',
    parent: 'analysis-measure',
    hub: 'def.bounded-variation',
    desc: '造出「测度 ↔ 函数」的字典：全变差 → BV 的 Jordan 分解 → NBV 与 Borel 测度一一对应 → 微积分基本定理。'
  },
  {
    id: 'analysis.lp',
    name: 'L^p 空间',
    en: 'L^p Spaces',
    parent: 'analysis-measure',
    hub: 'def.lp-norm',
    desc: '造出函数空间本身：Hölder / Minkowski → Banach 完备 → 空间之间的包含 → 对偶 (L^p)* ≅ L^q。'
  },

  /* ------------------------------------------------ 星系：范畴论 */
  {
    id: 'cat.basic',
    name: '范畴与图',
    en: 'Categories and Diagrams',
    parent: 'category',
    hub: 'def.category',
    desc: '造出「范畴」这个概念本身：先有图 $(V, E, s, t)$，再配上复合与单位，得到一个六元组。'
  },
  {
    id: 'cat.functor',
    name: '函子与自然变换',
    en: 'Functors and Natural Transformations',
    parent: 'category',
    hub: 'def.natural-transformation',
    desc: '造出「范畴之间的翻译」：函子 → 忠实 / 满 / 全忠实 → 自然变换 → 范畴等价。'
  },
  {
    id: 'cat.limit',
    name: '图与极限',
    en: 'Diagrams and Limits',
    parent: 'category',
    hub: 'def.limit',
    desc: '造出「在图上取值」这件事：交换图 → 锥 → 极限（泛锥）→ 积 / 纤维积 / 等化子。'
  },
  {
    id: 'cat.structure',
    name: '单满、子对象与像',
    en: 'Monos, Epis, Subobjects and Images',
    parent: 'category',
    hub: 'def.subobject',
    desc: '造出「用箭头替代元素」这套语言：可消性（单 / 满）→ 子对象 → 像与余像 → 泛元素。'
  },
  {
    id: 'cat.algebra',
    name: '范畴里的代数结构',
    en: 'Algebraic Structures in a Category',
    parent: 'category',
    hub: 'def.group-object',
    desc: '把「集合 + 运算 + 公理」搬到任意有有限积的范畴里：幺半群对象 → 群对象 → 阿贝尔群对象。⭐ $\\mathrm{Ab}(\\mathbf{Set})=\\mathbf{Ab}$、$\\mathrm{Ab}(\\mathbf{Top})$ = 拓扑阿贝尔群、$\\mathrm{Ab}(\\mathrm{Cond})=\\mathrm{CondAb}$ —— 代数那条线与凝聚态那条线在这里接上。'
  },
  {
    id: 'cat.yoneda',
    name: '预层与米田',
    en: 'Presheaves and Yoneda',
    parent: 'category',
    hub: 'lem.yoneda',
    desc: '造出「表示」这套语言：预层范畴是落点，米田引理说自然变换集与 $F(X)$ 一一对应，稠密性定理说每个预层都是可表示预层的余极限。'
  },
  {
    id: 'cat.adjoint',
    name: '伴随与反射',
    en: 'Adjunctions and Reflections',
    parent: 'category',
    hub: 'def.adjoint',
    desc: '造出「两个方向之间的最佳翻译」：伴随 → 单位与余单位 → 保极限 → 伴随函子定理 → 反射子范畴 → Kan 延拓。'
  },
  {
    id: 'cat.sheaf',
    name: '层与拓扑',
    en: 'Sheaves and Topologies',
    parent: 'category',
    hub: 'def.sheaf',
    desc: '造出「覆盖」这套语言：筛 → 预拓扑 / Grothendieck 拓扑 → 层（下降条件）→ Čech 函子与层化 → 景的层范畴的好性质。'
  },
  {
    id: 'cat.topos',
    name: '拓扑斯',
    en: 'Toposes',
    parent: 'category',
    hub: 'def.topos',
    desc: '造出「几何的代数替身」：预拓扑斯 → 预标准拓扑 → 生成元 → 拓扑斯 → Giraud 定理 → 拟紧拟分离 → 拓扑斯的态射。'
  },

  /* ------------------------------------------------ 星系：同调代数 */
  {
    id: 'hom.ab',
    name: '加法与阿贝尔范畴',
    en: 'Additive and Abelian Categories',
    parent: 'homology',
    hub: 'def.abelian-category',
    desc: '造出做同调代数的场地：预加法 / 加法范畴 → 预阿贝尔 → 阿贝尔范畴 → AB 公理 → Grothendieck 范畴。'
  },
  {
    id: 'hom.complex',
    name: '复形与导出三角',
    en: 'Complexes and Distinguished Triangles',
    parent: 'homology',
    hub: 'def.distinguished-triangle',
    desc: '造出「两两复合为零」的机器：复形 → 同伦 → 同伦范畴 → 映射锥 → 导出三角，以及三角的旋转与延拓。'
  },
  {
    id: 'hom.cohomology',
    name: '同调与正合列',
    en: 'Homology and Exact Sequences',
    parent: 'homology',
    hub: 'def.cohomology',
    desc: '造出「把复形读成不变量」这件事：同调 → 上同调函子 → 长正合列 → 拟同构与零调 → 内射对象。'
  },
  {
    id: 'hom.spectral',
    name: '过滤与谱序列',
    en: 'Filtrations and Spectral Sequences',
    parent: 'homology',
    hub: 'def.spectral-sequence',
    desc: '造出「逐层逼近同调」的工具：带过滤的对象 → 关联分次 → 谱序列从 $E_{r}$ 页逐页算到 $E_{\\infty}$。'
  },
  {
    id: 'hom.sheafcoh',
    name: '层上同调',
    en: 'Sheaf Cohomology',
    parent: 'homology',
    hub: 'def.sheaf-cohomology',
    desc: '把导出函子开到层上：$H^{n}(X, M) = R^{n}\\Gamma(X, M)$ → Čech 上同调（便宜的算法）→ Cartan–Leray 谱序列把它们接起来 → 无环层 → 拓扑斯态射的导出函子。'
  },
  {
    id: 'hom.sheaf',
    name: '阿贝尔层',
    en: 'Abelian Sheaves',
    parent: 'homology',
    hub: 'def.abelian-sheaf',
    desc: '造出「拓扑斯里的阿贝尔群」：取值一般的层 → 阿贝尔层 → 拓扑斯上的阿贝尔群是 Grothendieck 范畴 → 内 Hom → 张量积 → 平坦性。'
  },

  /* ------------------------------------------------ 星系：凝聚态数学 */
  {
    id: 'cond.set',
    name: '凝聚态集',
    en: 'Condensed Sets',
    parent: 'condensed',
    hub: 'def.condensed-set',
    desc: '造出主角：紧 Hausdorff 空间上的层就是凝聚态集；换到自由对象上，层条件退化成「保有限积」。'
  },
  {
    id: 'cond.ab',
    name: '凝聚态阿贝尔群',
    en: 'Condensed Abelian Groups',
    parent: 'condensed',
    hub: 'def.condensed-abelian-group',
    desc: '在凝聚态集上做代数：阿贝尔群值层 → 截面函子 → 足够多投射对象 → 张量与内 Hom。'
  },
  {
    id: 'cond.topo',
    name: '拓扑阿贝尔群',
    en: 'Topological Abelian Groups',
    parent: 'condensed',
    hub: 'thm.pontryagin-van-kampen',
    desc: '造出「拓扑阿贝尔群 → 凝聚态阿贝尔群」这条通道：关联凝聚态群（保所有极限）→ 连续同态即内部 Hom → 正合列的搬运 → Pontryagin 对偶 → 局部紧阿贝尔群不是阿贝尔范畴。'
  },
  {
    id: 'cond.cohomology',
    name: '凝聚态上同调',
    en: 'Condensed Cohomology',
    parent: 'condensed',
    hub: 'thm.real-banach-chaus-acyclic',
    desc: '造出「哪些空间的上同调会自动消失」：Stonean 上零调 → Stone 上常系数零调 → 局部紧上等于层上同调 → 半范数 / Banach 阿贝尔群与 $K$-有界正合 → 实 Banach 在紧 Hausdorff 上零调 → Breen–Deligne 分解 → $\\operatorname{RHom}$ 的逐类计算 → 局部紧阿贝尔群只剩 $\\operatorname{Ext}^{0}, \\operatorname{Ext}^{1}$。'
  },
  {
    id: 'cond.solid',
    name: '固态阿贝尔群',
    en: 'Solid Abelian Groups',
    parent: 'condensed',
    hub: 'thm.solid-abelian',
    desc: '造出凝聚态世界里的**完备化 / 完备张量积**：测度 $M(S,\\mathbb{Z})$ → 自由固态 $Z[S]^{\\blacksquare}$ → 固态群（唯一延拓）→ $C(S,\\mathbb{Z})$ 自由（Specker–Nöbeling）→ 固态子范畴是阿贝尔的、以 $\\prod_I \\mathbb{Z}$ 为紧投射生成元 → 固态张量积 $\\otimes^{\\blacksquare}$。来源：Clausen–Scholze 讲义 Lectures V–VI。'
  },
  {
    id: 'cond.analytic',
    name: '解析环与固态模',
    en: 'Analytic Rings and Solid Modules',
    parent: 'condensed',
    hub: 'thm.za-analytic',
    desc: '把「自由完备模」抽成函子：预解析环 → 解析环 → 解析环上的固态模范畴（阿贝尔、有紧投射生成元）→ base change → 有限生成 $\\mathbb{Z}$-代数的 $A_\\blacksquare$ 是解析环 → 仿射相干对偶 $f_! \\dashv f^!$。来源：Clausen–Scholze 讲义 Lectures VII–VIII。'
  },
  {
    id: 'analytic.adic',
    name: 'adic 空间',
    en: 'Adic Spaces',
    parent: 'analytic',
    hub: 'def.discrete-adic-space',
    desc: '造出解析几何的舞台：离散 Huber pair $(A,A^+)$ → 谱 $\\operatorname{Spa}$ → 有理开集上的局部化 → 结构层是层 → 离散 adic 空间 → 概形的全忠实嵌入 → 导出范畴按 ∞-范畴粘合。来源：Clausen–Scholze 讲义 Lectures IX–X。'
  },
  {
    id: 'analytic.dual',
    name: '相干对偶',
    en: 'Coherent Duality',
    parent: 'analytic',
    hub: 'thm.poincare-solid',
    desc: '造出 6-函子形式与固态 Serre 对偶：开浸入的 $j_!$ → $f_! = f^{\\mathrm{ad}/Y}_* j_!$ → $f^!$ 的扭转与平坦基变换 → 正则闭浸入与光滑映射的对偶复形 → 迹配对。来源：Clausen–Scholze 讲义 Lecture XI。'
  },

  {
    id: 'hom.module',
    name: '模的张量积与标量限制',
    en: 'Tensor Products and Scalar Restriction',
    parent: 'homology',
    hub: 'def.tensor-module',
    desc: '把「换环」这件事做成一套装置：$M \\otimes_R N$ 的构造与万有性质 → $\\operatorname{Hom}$-张量伴随 → 标量限制与标量扩张的伴随对 → 交换环上的对称性与结合律。后面平坦、Tor、基变换全站在这里。'
  },
  {
    id: 'hom.flat',
    name: '平坦模',
    en: 'Flat Modules',
    parent: 'homology',
    hub: 'def.flat-module',
    desc: '「张量不伤正合」的模：定义与一族等价判据 → 自由模平坦、直和项平坦、整环上平坦即无挠 → Lambek 判据（只需对有限生成理想检验）→ Lazard 定理（平坦 = 有限生成自由模的滤过余极限）→ Watts 定理（保直和的正合函子都是张量）。'
  },
  {
    id: 'hom.injective',
    name: '内射模与可除群',
    en: 'Injective Modules and Divisible Groups',
    parent: 'homology',
    hub: 'thm.baer-criterion',
    desc: '造出「足够多内射」这件事：内射对象与提升性质 → Baer 判据（只需对理想检验）→ $\\mathbb{Z}$-模即阿贝尔群时内射等价于可除 → $R$-Mod 有足够多内射（嵌入 $\\operatorname{Hom}_{\\mathbb{Z}}(R,\\mathbb{Q}/\\mathbb{Z})$ 的对偶）。这是层上同调能定义的地基。'
  },
  {
    id: 'hom.resolution',
    name: '消解与维数',
    en: 'Resolutions and Dimensions',
    parent: 'homology',
    hub: 'thm.comparison-theorem',
    desc: '把「算导出函子」变成可操作的机器：投射/内射消解 → 删除消解与比较定理（消解在同伦意义下唯一）→ 马蹄引理（短正合列的三个消解拼成双复形）→ 合冲 → 维数转移 → 投射维数与内射维数。'
  },
  {
    id: 'hom.group',
    name: '群上同调',
    en: 'Group Cohomology',
    parent: 'homology',
    hub: 'def.group-cohomology',
    desc: '从群作用造出不变量：群环与 $G$-模 → 不变量函子 $(-)^G$ 及其导出函子 $H^n(G,-)$ → 标准（bar）消解 → $H^1$ 与半直积、$H^2$ 与群扩张、$2$-上圈 → 低次正合序列。'
  },
  {
    id: 'topology.paracompact',
    name: '仿紧与单位分解',
    en: 'Paracompact Spaces and Partitions of Unity',
    parent: 'topology',
    hub: 'def.paracompact',
    desc: '把「局部有限」这件技术做成可用的工具：仿紧的定义与等价刻画 → 收缩引理 → Hausdorff 仿紧空间正规 → 单位分解的存在 → 它在分析（光滑化）与层论（Čech 等于层上同调）里的两个用途。'
  },
  {
    id: 'topology.metrizable',
    name: '可度量化',
    en: 'Metrizability',
    parent: 'topology',
    hub: 'thm.urysohn-metrization',
    desc: '回答「这个拓扑能不能由一个度量给出」：正则 + 第二可数 ⇒ 可度量化（Urysohn）→ Nagata–Smirnov 与 Bing 的充要条件（局部有限/离散的基）→ 度量化与仿紧、紧性的关系。'
  },

  {
    id: 'diffgeom.frame',
    name: '活动标架与结构方程',
    en: 'Moving Frames and Structure Equations',
    parent: 'diffgeom',
    hub: 'def.moving-frame',
    desc: '把「逐项求导」换成「标架怎么转」：活动标架 $\{e_i\}$ → 联络形式 $\omega^i_{\ j}$ → 结构方程 $\mathrm{d}e_i = \omega^j_{\ i} e_j$ → 由 $\mathrm{d}^2=0$ 读出曲率形式。曲面的所有基本形式与曲率都从这里**一次推出**，不再重复坐标展开。'
  },
  {
    id: 'diffgeom.surface',
    name: '曲面论',
    en: 'Theory of Surfaces',
    parent: 'diffgeom',
    hub: 'def.first-fundamental-form',
    desc: '曲面的两张基本形式与它们的关系：切映射与第一基本形式 → 单位法向与 Weingarten 变换 → 第二基本形式 → Gauss 方程与 Codazzi–Mainardi 方程 → Gauss 曲率与主曲率。全部按活动标架推导。'
  },
  {
    id: 'diffgeom.intrinsic',
    name: '内蕴几何',
    en: 'Intrinsic Geometry',
    parent: 'diffgeom',
    hub: 'def.geodesic',
    desc: '只靠第一基本形式就能读出的东西：测地线、测地曲率、指数映射、Gauss 绝妙定理（$K$ 内蕴）、Gauss–Bonnet。'
  },

  {
    id: 'analysis.complex',
    name: '复变函数',
    en: 'Complex Analysis',
    parent: 'complex',
    hub: 'def.holomorphic',
    desc: '从复数与复平面出发：全纯函数与 Cauchy–Riemann、复积分与 Cauchy 定理、幂级数与解析性、留数定理与围道积分、共形映射。'
  },
  {
    id: 'diffgeom.manifold',
    name: '微分流形',
    en: 'Smooth Manifolds',
    parent: 'diffgeom',
    hub: 'def.manifold-chart',
    desc: '把曲面换成一般的流形：图册与光滑结构、切空间与向量场、微分形式与外微分、定向与积分、de Rham 上同调、Lie 群与 Lie 代数。'
  },

  /* 以后加内容时，新星团往这里追加即可。留空不写 = 该星系的节点直属于星系。 */
];
