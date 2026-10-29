# 英文名缺口清单

> ⚠️ **自动生成，勿手改** —— 本文件由 `bun tools/i18n-backfill.mjs` 从
> `src/data/aliases.js`（aka）+ 各节点 `title` 现算，每次跑都会整份覆盖。
> 要改内容：改**真源**，然后重跑；直接编辑本文件会在 `--check` 里报「过期」。

**这个清单是干什么的**：把「机械规则填不出英文名」的节点摊开，按星系分组、
每行带候选集 —— 它是**给作者（或来接活的协作者）补名字用的工作面板**，不是产物。
**这里一个名字都没猜过**：能机械定的已经写进 `src/data/i18n.js`（同样是生成物）。

## 认领方式（怎么把一条缺口填掉）

1. 在表里挑一条（或一片），记下节点 id；
2. 打开 `src/data/aliases.js`，在**该节点的 `aka` 数组里加上英文名**
   （唯一真源就是这里 —— ⛔ 别去改 `src/data/i18n.js`，那是生成物）；
   · 加完要让 aka 里**恰好只剩一条「名字样」英文条目**，一级规则才认；
   · 「名字样」= 多个词时至少一个是实词；单个词要纯字母、有元音、不是全大写、不是驼峰；
   · 书号（`Exercise 2.25` / `Theorem 8.3.9`）**不算名字**，加不加都不影响。
3. 跑 `bun tools/i18n-backfill.mjs`（只写生成物，不动内容）；
4. 跑 `bun tools/build.mjs` 看断言过不过，再跑 `bun tools/i18n-backfill.mjs --check` 确认不漂。

⚠️ **aka 同时喂三处**：① 英文名（本清单）② 搜索 ③ **内文跳转**（正文里出现该词会变链接）。
所以加了通用词（`section` / `ring` 这类）之后，要看一眼跳转噪音 ——
真吵的话把词放进 `aliases.js` 的 `linkStop`，或按「只填字段、不喂跳转」处理。

## 一、结果（互斥，合计 = 全部节点）

| 桶 | 节点数 | 占比 | 意思 |
|---|---|---|---|
| ✅ 一级填入（`from: aka` / `from: title`） | 263 | 20.4% | aka 里恰好一条名字样英文 |
| ✅ 二级填入（`from: aka-title`） | 3 | 0.2% | title 里恰好命中一个 aka 候选 —— 清单见 `i18n/second-tier.md`（可整批回滚）|
| ⛔ 缺口 | 1021 | 79.3% | 下面第二节逐条列 |
| **合计** | **1287** | 100% | 覆盖 266（20.7%），缺口 1021 |

## 二、缺口为什么填不了（互斥，合计 = 缺口数）

| 桶 | 节点数 | 意思 |
|---|---|---|
| ⚠️ 歧义（二级也没捞着） | 90 | aka 里有 ≥2 条英文写法，且 title 里没出现其中一个 |
| ⚠️ 只有缩写 | 17 | aka 里只有 AC / FOL / sup / MCT a.e. 这种缩写 |
| ⚠️ 只有书号 | 256 | aka 里只有 Exercise 2.25 / Theorem 8.3.9 这种坐标（搜索用，不是名字）|
| ⚠️ 只有 title 有 | 30 | aka 没有英文，但 title 括号里是英文 |
| ⛔ 完全没有 | 628 | aka 与 title 都没有英文名 |
| **合计** | **1021** | = 全部节点 1287 − 已覆盖 266 |

⚠️ **口径提醒**：脚本内部的分桶是在**二级之前**做的，所以「歧义」原始数是 93，其中 **3** 条被二级捞走了 —— 上表用的是减完的 90。
两张表各自互斥、各自合计对得上；⛔ 别把两张表的行混着加。

---

## 缺口按星系分组（1021）

每行都带上候选集，方便照着 `aliases.js` 补。同一节点属多个星系时只列在第一个里。

### 集合论 · `set-theory`（23）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `ax.sep` | 分离公理模式 | `specification` / `comprehension` / `separation` | 分离公理模式 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `ax.found` | 正则公理 | `foundation` / `regularity` | 正则公理 / 基础公理 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.subset` | 子集 | `subset` / `inclusion` | 子集 / 真子集 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.pair` | 有序对 | `ordered pair` / `Kuratowski` | 有序对 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.empty` | 空集存在 | — | 空集存在且唯一 | 无候选（aka 与 title 都没有英文） |
| `thm.noself` | 无自属集合 | — | 任何集合都不属于自身 | 无候选（aka 与 title 都没有英文） |
| `thm.binunion` | 二元并存在 | — | 二元并 $a \cup b$ 存在 | 无候选（aka 与 title 都没有英文） |
| `thm.nat-arith-laws` | 自然数的运算律 | — | 定理：$\mathbb{N}$ 上加法与乘法的运算律（Laws of Arithmetic on $\mathbb{N} | 无候选（aka 与 title 都没有英文） |
| `thm.int-ring` | ℤ 是交换整环 | — | 定理：$\mathbb{Z}$ 是含幺交换整环，且序与运算相容 | 无候选（aka 与 title 都没有英文） |
| `thm.rat-ordered-field` | ℚ 是有序域 | — | 定理：$\mathbb{Q}$ 是有序域（$\mathbb{Q}$ is an Ordered Field） | 无候选（aka 与 title 都没有英文） |
| `def.union-inter` | 并集与交集 | `union` / `intersection` | 并集 / 交集 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.diff-complement` | 差集与补集 | `difference` / `complement` | 差集 / 补集 / 对称差 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.bijection` | 单射 / 满射 / 双射 | `injective` / `surjective` / `bijective` | 单射 / 满射 / 双射 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.preimage` | 像与原像 | `preimage` / `inverse image` | 像与原像 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.equinumerous` | 等势 | `equipotent` / `same cardinality` | 等势 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.cardinal` | 基数 |A| | `cardinality` / `cardinal number` | 基数与基数的比较 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.schroder-bernstein` | Schröder–Bernstein 定理 | `Cantor–Bernstein` / `Cantor-Bernstein-Schroeder` | Schröder–Bernstein 定理 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.quotient-set` | 商集与等价类 | `quotient` / `equivalence class` | 商集 / 等价类 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.induction` | 归纳原理与递推定义 | `induction` / `recursion` | 归纳原理 / 递推定义 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.nat-arith` | 自然数的加法与乘法 | — | 自然数上的加法与乘法（由递推定义） | 无候选（aka 与 title 都没有英文） |
| `thm.real-unique` | 完备有序域的唯一性 | — | 任何完备有序域都与 $\mathbb{R}$ 同构（构造无关性） | 无候选（aka 与 title 都没有英文） |
| `thm.recursion-wellorder` | 超限递归 | `transfinite recursion` / `transfinite induction` | 良序集上的递归定理（含超限归纳） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.ordinal-trichotomy` | 序数可比 | — | 序数的三歧性：$\in$ 在 $\mathrm{On}$ 上是良序 | 无候选（aka 与 title 都没有英文） |

### 序理论 · `order-theory`（3）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `ax.choice` | 选择公理 | `AC` / `axiom of choice` / `Zorn` | 选择公理 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.poset` | 偏序集 | `partial order` / `poset` | 偏序集 / 全序集 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.wellorder` | 良序集 | `well-order` / `well-ordering` | 良序集 | 零命中（aka 有 2 条候选，title 里一条都没出现） |

### 抽象代数 · `algebra`（106）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.vs` | 向量空间的基 | `basis` / `span` / `linearly independent` | 向量空间 / 线性无关 / 基 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `thm.vsbasis` | 每个向量空间有基 | — | 每个向量空间都有基（Zorn 引理的经典应用） | 无候选（aka 与 title 都没有英文） |
| `def.subspace` | 子空间 | — | 线性子空间 | 无候选（aka 与 title 都没有英文） |
| `prop.subspace-criterion` | 子空间判据 | — | 命题：子空间的两条判据 | 无候选（aka 与 title 都没有英文） |
| `def.coordinate` | 坐标 | — | 坐标与有序基 | 无候选（aka 与 title 都没有英文） |
| `thm.steinitz` | Steinitz 交换引理 | — | 定理（Steinitz）：交换引理 | 无候选（aka 没英文，title 里有） |
| `thm.dimension` | 维数良定义 | — | 定理：任意两组基等势，维数良定义 | 无候选（aka 与 title 都没有英文） |
| `def.linear-map` | 线性映射 | — | 线性映射 | 无候选（aka 与 title 都没有英文） |
| `def.linear-isomorphism` | 线性同构 | — | 线性同构 | 无候选（aka 与 title 都没有英文） |
| `def.kernel-image-vs` | 核与像 | — | 核与像 | 无候选（aka 与 title 都没有英文） |
| `def.quotient-vs` | 商空间 | — | 商空间 $V / U$ | 无候选（aka 与 title 都没有英文） |
| `thm.first-iso-vs` | 第一同构定理（向量空间版） | — | 定理：$V / \ker T \cong \operatorname{im} T$ | 无候选（aka 与 title 都没有英文） |
| `thm.quotient-universal-vs` | 商空间的万有性质 | — | 定理：商空间的万有性质 | 无候选（aka 与 title 都没有英文） |
| `def.rank` | 秩 | — | 秩 $\operatorname{rank} T$ | 无候选（aka 与 title 都没有英文） |
| `def.nullity` | 零化度 | — | 零化度 $\operatorname{null} T$ | 无候选（aka 与 title 都没有英文） |
| `thm.rank-nullity` | 秩-零化度定理 | — | 定理（秩-零化度）：$\dim V = \operatorname{rank} T + \operatorname{nu | 无候选（aka 与 title 都没有英文） |
| `def.dual-space` | 对偶空间 | — | 对偶空间 $V^{\ast}$ | 无候选（aka 与 title 都没有英文） |
| `def.dual-basis` | 对偶基 | — | 对偶基 | 无候选（aka 与 title 都没有英文） |
| `def.annihilator` | 零化子 | — | 零化子 $U^{0}$ | 无候选（aka 与 title 都没有英文） |
| `def.direct-sum` | 直和与补空间 | — | 直和 $V = U \oplus W$ 与补空间 | 无候选（aka 与 title 都没有英文） |
| `def.matrix` | 矩阵 | — | 矩阵 | 无候选（aka 与 title 都没有英文） |
| `def.matrix-operations` | 矩阵的加法与乘法 | — | 矩阵的加法、数乘与乘法 | 无候选（aka 与 title 都没有英文） |
| `thm.matrix-ring` | M_n(K) 是环 | — | 定理：$M_n(K)$ 是环，对加法构成 $K$-向量空间 | 无候选（aka 与 title 都没有英文） |
| `thm.matrix-linear-map` | 线性映射 ⟷ 矩阵 | — | 定理：选定基后，线性映射与矩阵一一对应 | 无候选（aka 与 title 都没有英文） |
| `thm.change-of-basis` | 基变换与相似 | — | 定理：换基给出相似矩阵 | 无候选（aka 与 title 都没有英文） |
| `def.elementary-matrix` | 初等变换与初等矩阵 | — | 初等变换与初等矩阵 | 无候选（aka 与 title 都没有英文） |
| `thm.rank-row-col` | 行秩 = 列秩 | — | 定理：行秩等于列秩，都等于矩阵的秩 | 无候选（aka 与 title 都没有英文） |
| `thm.linear-system-solutions` | 线性方程组的解结构 | — | 定理：线性方程组的解结构 | 无候选（aka 与 title 都没有英文） |
| `def.invertible-matrix` | 可逆矩阵 | — | 可逆矩阵与 $\operatorname{GL}_n(K)$ | 无候选（aka 与 title 都没有英文） |
| `def.multilinear-form` | 多重线性型 | — | 多重线性型 $V^{n} \to K$ | 无候选（aka 与 title 都没有英文） |
| `def.alternating-form` | 交错型 | — | 交错型（Alternating Form）与对称型 | 无候选（aka 没英文，title 里有） |
| `thm.det-exists-unique` | 行列式的存在唯一性 | — | 定理：交错 $n$ 重线性规范函数存在且唯一 | 无候选（aka 与 title 都没有英文） |
| `def.determinant` | 行列式 | — | 行列式 $\det A$ | 无候选（aka 与 title 都没有英文） |
| `thm.det-multiplicative` | 行列式的乘性 | — | 定理：$\det(AB) = \det A \cdot \det B$ | 无候选（aka 与 title 都没有英文） |
| `prop.det-laplace` | Laplace 展开 | — | 命题：Laplace 展开（按一行或一列展开） | 无候选（aka 与 title 都没有英文） |
| `thm.cramer` | Cramer 法则 | — | 定理（Cramer）：用行列式解方程组 | 无候选（aka 没英文，title 里有） |
| `def.polynomial` | 一元多项式 | — | 一元多项式 | 无候选（aka 与 title 都没有英文） |
| `def.polynomial-ring` | 多项式环 | — | 多项式环 $K[x]$ | 无候选（aka 与 title 都没有英文） |
| `thm.division-algorithm` | 带余除法 | — | 定理：带余除法（$K[x]$ 是欧几里得整环） | 无候选（aka 与 title 都没有英文） |
| `thm.factor-theorem` | 因式定理与根 | — | 定理：因式定理 $f(a) = 0 \iff (x - a) \mid f$ | 无候选（aka 没英文，title 里有） |
| `prop.root-bound` | 根的个数不超过次数 | — | 命题：$\deg f = n$ 时 $f$ 至多有 $n$ 个根（计重数） | 无候选（aka 与 title 都没有英文） |
| `thm.fundamental-algebra` | 代数基本定理 | — | 定理（代数基本定理）：$\mathbb{C}$ 代数闭 | 无候选（aka 与 title 都没有英文） |
| `def.irreducible-poly` | 不可约多项式 | — | 不可约多项式 | 无候选（aka 与 title 都没有英文） |
| `thm.poly-ufd` | K[x] 是唯一分解整环 | — | 定理：$K[x]$ 是唯一分解整环 | 无候选（aka 与 title 都没有英文） |
| `def.invariant-subspace` | 不变子空间 | — | 不变子空间 | 无候选（aka 与 title 都没有英文） |
| `def.eigenvalue` | 特征值与特征向量 | — | 特征值与特征向量 | 无候选（aka 与 title 都没有英文） |
| `def.char-poly` | 特征多项式 | — | 特征多项式 $\chi_T(x) = \det(x I - T)$ | 无候选（aka 没英文，title 里有） |
| `def.trace` | 迹 | — | 迹 $\operatorname{tr} A$ | 无候选（aka 与 title 都没有英文） |
| `def.similarity` | 相似 | — | 相似 | 无候选（aka 与 title 都没有英文） |
| `thm.cayley-hamilton` | Cayley–Hamilton 定理 | — | 定理（Cayley–Hamilton）：$\chi_T(T) = 0$ | 无候选（aka 没英文，title 里有） |
| `thm.diagonalizable` | 可对角化判据 | — | 定理：可对角化的几个等价条件 | 无候选（aka 与 title 都没有英文） |
| `def.minimal-poly` | 极小多项式 | — | 极小多项式（算子的）$\mu_T$ | 无候选（aka 与 title 都没有英文） |
| `thm.minimal-poly-divisor` | 极小多项式整除特征多项式 | — | 定理：$\mu_T \mid \chi_T$，且两者同根 | 无候选（aka 与 title 都没有英文） |
| `thm.primary-decomposition` | 根子空间分解 | — | 定理（主分解）：$V = \bigoplus_i \ker (T - \lambda_i I)^{m_i}$ | 无候选（aka 与 title 都没有英文） |
| `thm.jordan-canonical-form` | Jordan 标准形 | — | 定理（Jordan）：代数闭域上的相似标准形 | 无候选（aka 没英文，title 里有） |
| `cor.jordan-uniqueness` | Jordan 型的唯一性 | — | 推论：Jordan 型在块的排列之外唯一 | 无候选（aka 与 title 都没有英文） |
| `def.inner-product` | 内积 | — | 内积与内积空间 | 无候选（aka 与 title 都没有英文） |
| `def.induced-norm` | 诱导范数与距离 | — | 由内积诱导的范数与距离 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-schwarz` | Cauchy–Schwarz 不等式 | — | 定理：Cauchy–Schwarz 不等式 | 无候选（aka 与 title 都没有英文） |
| `def.orthogonality` | 正交 | — | 正交与正交分解 | 无候选（aka 与 title 都没有英文） |
| `def.orthogonal-complement` | 正交补 | — | 正交补 $U^{\perp}$ 与直和分解 | 无候选（aka 与 title 都没有英文） |
| `thm.gram-schmidt` | Gram–Schmidt 正交化 | — | 定理：Gram–Schmidt 正交化（标准正交基存在） | 无候选（aka 与 title 都没有英文） |
| `def.orthogonal-projection` | 正交投影 | — | 正交投影 | 无候选（aka 与 title 都没有英文） |
| `thm.projection-formula` | 最佳逼近与投影公式 | — | 定理：正交投影是最佳逼近，且可用标准正交基算出 | 无候选（aka 与 title 都没有英文） |
| `def.operator-adjoint` | 伴随算子 | — | 伴随算子 $T^{\ast}$ | 无候选（aka 与 title 都没有英文） |
| `def.isometry` | 等距与正交变换 | — | 等距、正交变换与酉变换 | 无候选（aka 与 title 都没有英文） |
| `def.normal-operator` | 正规算子 | — | 自伴、正规与酉算子 | 无候选（aka 与 title 都没有英文） |
| `thm.spectral-theorem` | 谱定理（实对称） | — | 定理（谱定理）：实对称算子可正交对角化 | 无候选（aka 与 title 都没有英文） |
| `cor.spectral-normal` | 谱定理（复正规） | — | 推论：复正规算子可酉对角化 | 无候选（aka 与 title 都没有英文） |
| `def.quadratic-form` | 二次型 | — | 二次型与正定性 | 无候选（aka 与 title 都没有英文） |
| `thm.sylvester-criterion` | Sylvester 判据 | — | 定理（Sylvester）：正定性 $\iff$ 各阶顺序主子式为正 | 无候选（aka 没英文，title 里有） |
| `thm.svd` | 奇异值分解 | — | 奇异值分解定理：$A = U\Sigma V^{\mathsf{T}}$ | 无候选（aka 与 title 都没有英文） |
| `def.bilinear-form` | 双线性型 | — | 双线性型 | 无候选（aka 与 title 都没有英文） |
| `def.tensor-product-vs` | 张量积 | — | 向量空间的张量积 $V \otimes W$ | 无候选（aka 与 title 都没有英文） |
| `thm.tensor-universal-property` | 张量积的万有性质 | — | 定理：张量积把双线性映射换成线性映射 | 无候选（aka 与 title 都没有英文） |
| `prop.tensor-hom-adjunction` | 张量 ⊣ 内 Hom | — | 命题：$(-) \otimes V \dashv \operatorname{Hom}(V, -)$ | 无候选（aka 与 title 都没有英文） |
| `def.exterior-power` | 外幂 | — | 外幂 $\bigwedge^{k} V$ | 无候选（aka 与 title 都没有英文） |
| `def.exterior-algebra` | 外代数 | — | 外代数 $\bigwedge^{\bullet} V$ | 无候选（aka 与 title 都没有英文） |
| `def.symmetric-algebra` | 对称代数 | — | 对称代数 $\operatorname{Sym}^{\bullet} V$ | 无候选（aka 与 title 都没有英文） |
| `thm.det-as-exterior` | 行列式 = 最高外幂上的作用 | — | 定理：行列式就是 $T$ 在 $\bigwedge^{n}V$ 上的作用 | 无候选（aka 与 title 都没有英文） |
| `def.group-action` | 群作用 | — | 群作用、轨道与稳定子 | 无候选（aka 与 title 都没有英文） |
| `thm.orbit-stabilizer` | 轨道–稳定子定理 | — | 定理（轨道–稳定子）：$\|\operatorname{Orb} x\| = [G : \operatorname{St | 无候选（aka 与 title 都没有英文） |
| `thm.class-equation` | 类方程 | — | 定理（类方程）：$\|G\| = \|Z(G)\| + \sum [G : C_G(x_i)]$ | 无候选（aka 与 title 都没有英文） |
| `def.permutation-group` | 置换群与对称群 | — | 对称群 $S_n$、置换与循环分解 | 无候选（aka 与 title 都没有英文） |
| `def.alternating-group` | 符号与交错群 | — | 置换的符号与交错群 | 无候选（aka 与 title 都没有英文） |
| `def.cyclic-group` | 循环群 | — | 循环群 | 无候选（aka 与 title 都没有英文） |
| `thm.lagrange` | Lagrange 定理 | — | 定理（Lagrange）：$\|H\|$ 整除 $\|G\|$ | 无候选（aka 没英文，title 里有） |
| `thm.cayley` | Cayley 定理 | — | 定理（Cayley）：每个群都是置换群 | 无候选（aka 没英文，title 里有） |
| `thm.sylow` | Sylow 定理 | — | 定理（Sylow）：存在性、共轭性、计数 | 无候选（aka 没英文，title 里有） |
| `def.simple-group` | 单群 | — | 单群 | 无候选（aka 与 title 都没有英文） |
| `def.composition-series` | 合成列 | — | 合成列与合成因子 | 无候选（aka 与 title 都没有英文） |
| `thm.jordan-holder` | Jordan–Hölder 定理 | — | 定理（Jordan–Hölder）：合成因子与重数唯一 | 无候选（aka 没英文，title 里有） |
| `def.solvable-group` | 可解群 | — | 可解群（Solvable Group）与导出列 | 无候选（aka 没英文，title 里有） |
| `thm.solvable-quotients` | 可解性对子群与商群封闭 | — | 定理：可解性在子群、商群与扩张下的行为 | 无候选（aka 与 title 都没有英文） |
| `prop.sn-solvable` | 对称群的可解性 | — | 命题：$S_n$ 可解当且仅当 $n \le 4$ | 无候选（aka 与 title 都没有英文） |
| `prop.group-basic` | 群的基本性质 | — | 命题：群的消去律与逆的公式 | 无候选（aka 与 title 都没有英文） |
| `prop.ideal-basic` | 理想的运算与商环泛性质 | — | 命题：理想的交、和、积与商环的泛性质 | 无候选（aka 与 title 都没有英文） |
| `prop.prime-ideal` | 素理想与极大理想 | — | 命题：素理想、极大理想与商环 | 无候选（aka 与 title 都没有英文） |
| `def.group` | 群 | `group` / `Abelian group` | 群与阿贝尔群 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.normal-subgroup` | 正规子群 | `normal subgroup` / `coset` | 正规子群与陪集 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.group-hom` | 群同态、核与像 | `group homomorphism` / `kernel` / `image` | 群同态 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.ideal` | 理想 | `ideal` / `quotient ring` | 理想与商环 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `ex.algebra-categories` | 代数的几个范畴 | `Mon` / `Gr` / `Rng` / `G-Set` / `A-Mod` / `k-Alg` | $\mathrm{Mon}$、$\mathrm{Gr}$、$\mathrm{Rng}$、$G\text{-}\mathb | 多命中：`Mon` / `Gr` / `Rng` |
| `prop.ring-tensor-coproduct` | 交换环的纤维余积是张量积 | （只有书号：`Exercise 1.29`） | 交换环的推出 = 张量积 | 无候选（aka 里只有书号） |
| `prop.module-tensor-universal` | 张量积对双线性映射万有 | （只有书号：`Exercise 1.21`） | 命题：$\operatorname{Bil}(M \times N,\ P) \cong \operatorname{H | 无候选（aka 里只有书号） |
| `prop.zmod-is-ab` | Z-模就是阿贝尔群 | （只有书号：`Exercise 1.10`） | 命题：$\mathbb{Z}\text{-}\mathbf{Mod} \cong \mathbf{Ab}$、$\math | 无候选（aka 里只有书号） |

### 拓扑学 · `topology`（94）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `prop.compact-subset-closed` | 紧子集是闭的 | — | 命题：紧子集在 X 中是闭集 | 无候选（aka 与 title 都没有英文） |
| `prop.subset-compact-equiv` | 子集的紧性刻画 | — | 命题：X 完备时，A 紧 $\iff A$ 闭且全有界 | 无候选（aka 与 title 都没有英文） |
| `def.locally-finite-family` | 局部有限族 | — | 局部有限的集合族 | 无候选（aka 与 title 都没有英文） |
| `def.discrete-family` | 离散族 | — | 离散的集合族 | 无候选（aka 与 title 都没有英文） |
| `def.sigma-locally-finite` | 可数并的局部有限族 | — | 可数多个局部有限（或离散）族之并 | 无候选（aka 与 title 都没有英文） |
| `def.refinement` | 覆盖的加细 | — | 覆盖的加细、开加细与闭加细 | 无候选（aka 与 title 都没有英文） |
| `def.paracompact` | 仿紧空间 | — | 每个开覆盖都有局部有限开加细 | 无候选（aka 与 title 都没有英文） |
| `lem.shrink` | 收缩引理 | — | 正规空间里局部有限开覆盖可以收缩 | 无候选（aka 与 title 都没有英文） |
| `thm.paracompact-hausdorff-normal` | 仿紧豪斯多夫空间正规 | — | 仿紧的豪斯多夫空间是正规空间 | 无候选（aka 与 title 都没有英文） |
| `prop.paracompact-closed-refinement` | 闭加细 | — | 仿紧空间的开覆盖有局部有限闭加细 | 无候选（aka 与 title 都没有英文） |
| `thm.michael-paracompact` | 迈克尔仿紧判别法 | — | 正则空间仿紧当且仅当每个开覆盖有局部有限加细 | 无候选（aka 与 title 都没有英文） |
| `def.partition-of-unity` | 单位分解 | — | 从属于开覆盖的连续单位分解 | 无候选（aka 与 title 都没有英文） |
| `def.second-countable` | 第二可数空间 | — | 具有可数基的拓扑空间 | 无候选（aka 与 title 都没有英文） |
| `def.first-countable` | 第一可数空间 | — | 每点有可数局部基 | 无候选（aka 与 title 都没有英文） |
| `def.metrizable` | 可度量化空间 | — | 拓扑可由一个度量给出 | 无候选（aka 与 title 都没有英文） |
| `thm.metric-paracompact` | 斯通定理 | — | 度量空间必为仿紧空间 | 无候选（aka 与 title 都没有英文） |
| `thm.urysohn-metrization` | 乌雷松度量化定理 | — | 正则且第二可数的空间可度量化 | 无候选（aka 与 title 都没有英文） |
| `thm.nagata-smirnov` | 局部有限基度量化定理 | — | 正则且基为可数层局部有限族的空间可度量化 | 无候选（aka 与 title 都没有英文） |
| `thm.bing-metrization` | 离散基度量化定理 | — | 正则且基为可数层离散族的空间可度量化 | 无候选（aka 与 title 都没有英文） |
| `prop.metrizable-normal` | 可度量化空间的性质 | — | 可度量化空间正规、仿紧且第一可数 | 无候选（aka 与 title 都没有英文） |
| `def.homotopy-maps` | 映射同伦 | — | 同伦：映射之间的一整段连续形变 | 无候选（aka 与 title 都没有英文） |
| `def.path-homotopy` | 道路同伦 | — | 道路与固定端点的同伦：同伦类 $[\alpha]$ | 无候选（aka 与 title 都没有英文） |
| `lem.path-product` | 道路拼接 | — | 道路的拼接与同伦类上的群算律 | 无候选（aka 与 title 都没有英文） |
| `def.fundamental-group` | 基本群 | — | 基本群 $\pi_{1}(X, x_{0})$：闭道路同伦类构成的群 | 无候选（aka 与 title 都没有英文） |
| `prop.induced-homomorphism` | 诱导同态 | — | 连续映射诱导 $\pi_{1}$ 的同态；$\pi_{1}$ 是同伦不变函子 | 无候选（aka 与 title 都没有英文） |
| `prop.pi1-basepoint` | 基点变换 | — | 沿道路换基点：同构，但彼此只差一个共轭 | 无候选（aka 与 title 都没有英文） |
| `def.simply-connected` | 单连通 | — | 单连通：道路连通且基本群平凡 | 无候选（aka 与 title 都没有英文） |
| `def.covering-space` | 覆叠空间 | — | 覆叠空间：局部看是「叠起来的若干份」 | 无候选（aka 与 title 都没有英文） |
| `thm.lifting` | 提升定理 | — | 道路与同伦在覆叠里的唯一提升 | 无候选（aka 与 title 都没有英文） |
| `prop.covering-index` | 覆叠的指数 | — | 纤维与 $\pi_{1}$ 的陪集一一对应（层数 = 指数） | 无候选（aka 与 title 都没有英文） |
| `thm.pi1-circle` | 圆周的基本群 | — | $\pi_{1}(S^{1}, 1) \cong \mathbb{Z}$：绕数是一个完全的不变量 | 无候选（aka 与 title 都没有英文） |
| `thm.no-retraction-disk` | 圆盘不收缩 | — | 不存在从圆盘到其边界的收缩：$S^{1}$ 不是 $D^{2}$ 的收缩核 | 无候选（aka 与 title 都没有英文） |
| `thm.van-kampen` | van Kampen 定理 | — | Seifert–van Kampen：把 $\pi_{1}$ 从两块拼起来 | 无候选（aka 与 title 都没有英文） |
| `cor.pi1-sphere` | 高维球面的基本群 | — | $\pi_{1}(S^{n}) = 1$ 对 $n \ge 2$ | 无候选（aka 与 title 都没有英文） |
| `def.standard-simplex` | 标准单纯形 | — | 标准单纯形 $\Delta^{p}$ 与面映射 $d_{i}$ | 无候选（aka 与 title 都没有英文） |
| `def.simplicial-complex` | 单纯复形 | — | 抽象单纯复形与它的几何实现 | 无候选（aka 与 title 都没有英文） |
| `def.simplicial-map` | 单纯映射 | — | 单纯映射：顶点层面的映射，以及它诱导的链映射 | 无候选（aka 与 title 都没有英文） |
| `def.chain-group` | 链群 | — | 链群 $C_{p}(K)$：以 $p$-单纯形为基的自由阿贝尔群 | 无候选（aka 与 title 都没有英文） |
| `def.simplicial-boundary` | 边缘算子 | — | 边缘算子 $\partial_{p}$ 与 $\partial^{2} = 0$ | 无候选（aka 与 title 都没有英文） |
| `def.simplicial-homology` | 单纯同调群 | — | 单纯同调群 $H_{p}(K) = Z_{p} / B_{p}$ | 无候选（aka 与 title 都没有英文） |
| `def.singular-homology` | 奇异同调群 | — | 奇异单纯形、奇异链复形与奇异同调群 $H_{p}(X)$ | 无候选（aka 与 title 都没有英文） |
| `def.reduced-homology` | 约化同调 | — | 约化同调 $\tilde{H}_{p}$：把「单点也有一个洞」修掉 | 无候选（aka 与 title 都没有英文） |
| `prop.h0-components` | H₀ 与分支 | — | $H_{0}(X)$ 是道路连通分支上的自由阿贝尔群 | 无候选（aka 与 title 都没有英文） |
| `thm.sphere-homology` | 球面的同调 | — | $H_{p}(S^{n})$：只有在 $p = 0$ 与 $p = n$ 处非平凡 | 无候选（aka 与 title 都没有英文） |
| `thm.euler-characteristic` | Euler 示性数 | — | Euler 示性数：数单纯形与数 Betti 数给出同一个数 | 无候选（aka 与 title 都没有英文） |
| `thm.long-exact-pair` | 对的长正合列 | — | 拓扑对 (X, A) 的长正合列 | 无候选（aka 没英文，title 里有） |
| `thm.mv-homology` | Mayer–Vietoris（同调） | — | Mayer–Vietoris 序列（同调版，$\mathbb{Z}$ 系数） | 无候选（aka 与 title 都没有英文） |
| `thm.simplicial-approximation` | 单纯逼近 | — | 单纯逼近定理：奇异同调 $=$ 单纯同调 | 无候选（aka 与 title 都没有英文） |
| `def.chain-homotopy` | 链同伦 | — | 链同伦：两个链映射之间的「代数同伦」 | 无候选（aka 与 title 都没有英文） |
| `thm.homotopy-invariance` | 同伦不变性 | — | 同伦不变性：$f \simeq g$ 蕴含 $f_{*} = g_{*}$（棱柱算子） | 无候选（aka 与 title 都没有英文） |
| `def.topology` | 拓扑空间与开集 | `topology` / `open set` | 拓扑空间 / 开集 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.closed-set` | 闭集与闭包 | `closed set` / `closure` | 闭集 / 闭包 / 稠密 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.topology-base` | 基与子基 | `base` / `subbase` | 拓扑的基 / 子基 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.minimal-closed-surjection` | 满射的极小闭子集 | （只有书号：`Lemma 2.1.5`） | 满连续映射的极小闭子集 | 无候选（aka 里只有书号） |
| `prop.chaus-quotient-of-free` | 紧 Haus 是自由的商 | — | 每个紧 Hausdorff 空间都是自由紧 Hausdorff 空间的商 | 无候选（aka 与 title 都没有英文） |
| `def.projective-object` | 投射 / 内射对象 | `projective object` / `injective object` | 投射对象与内射对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.free-projective` | 自由紧 Haus 是投射对象 | — | 自由紧 Hausdorff 空间是 $\mathbf{CHaus}$ 的投射对象 | 无候选（aka 与 title 都没有英文） |
| `cor.chaus-free-presentation` | 紧 Haus 都有自由表示 | （只有书号：`Corollary 2.2.4` / `Cor 2.2.4`） | 每个紧 Hausdorff 空间都有自由表示 | 无候选（aka 里只有书号） |
| `prop.component-clopen` | 连通分量是闭开邻域之交 | （只有书号：`Proposition 2.2.6` / `Prop 2.2.6`） | 紧 Hausdorff 空间中连通分量 = 闭开邻域之交 | 无候选（aka 里只有书号） |
| `def.stone-space` | 全不连通与 Stone 空间 | `Stone space` / `extremally disconnected` / `totally disconnected` | Stone 空间与 Stonean 空间 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `prop.stonean-basic` | 极端不连通的基本性质 | （只有书号：`Lemma 2.2.10` / `Exercise 2.23`） | 极端不连通的性质 | 无候选（aka 里只有书号） |
| `prop.td-reflective` | 全不连通空间是反射子范畴 | `pi_0` | 全不连通空间是 $\mathbf{Top}$ 的反射子范畴 | 零命中（候选没出现在 title 里） |
| `prop.stone-reflective` | Stone 空间是紧 Hausdorff 空间的反射子范畴 | （只有书号：`Exercise 2.17`） | Stone 空间是 $\mathbf{CHaus}$ 的反射子范畴 | 无候选（aka 里只有书号） |
| `def.profinite` | 投射有限空间 | `profinite space` / `profinite` | 投射有限空间 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `ex.cg-examples` | 紧生成空间的例子 | （只有书号：`Exercise 6.2`） | 哪些空间是紧生成的 | 无候选（aka 里只有书号） |
| `prop.cg-equivalent-conditions` | 紧生成空间的等价刻画 | （只有书号：`Exercise 2.24`） | 紧生成性的六条等价说法 | 无候选（aka 里只有书号） |
| `def.k-topology` | k-开、k-闭与 k-拓扑 | `k-ification` / `kX` | $k$-开集与 $k$-化（$k$-Topology） | 零命中（候选没出现在 title 里） |
| `prop.ktx-colimit` | kX 是紧空间的余极限 | （只有书号：`Exercise 2.26`） | $kX = \varinjlim S$ | 无候选（aka 里只有书号） |
| `cor.cg-product` | 紧生成空间对积封闭 | （只有书号：`Exercise 2.25`） | 紧生成空间作积仍紧生成 | 无候选（aka 里只有书号） |
| `prop.k-product` | k-化与积 | `k(X×Y)` | $k(kX \times Y) = k(X \times Y)$ | 零命中（候选没出现在 title 里） |
| `prop.compact-open-discrete` | 离散时函数空间是积 | （只有书号：`Exercise 2.28`） | 离散 $X$ 时 $C(X,Y) \cong Y^{X}$ | 无候选（aka 里只有书号） |
| `prop.weak-hausdorff-basic` | 弱 Hausdorff 的基本性质 | （只有书号：`Exercise 2.31` / `Exercise 2.34`） | 弱 Hausdorff 的几条基本性质 | 无候选（aka 里只有书号） |
| `prop.cg-kclosed-quotient` | k-闭等价关系与弱 Hausdorff 商 | （只有书号：`Exercise 2.39`） | $R$ 是 $k$-闭 $\iff$ $X/R$ 弱 Hausdorff | 无候选（aka 里只有书号） |
| `thm.cgwh-reflective` | 弱 Hausdorff 紧生成空间是紧生成空间的反射子范畴 | `CGWH` | 紧生成的弱 Hausdorff 空间是反射子范畴 | 零命中（候选没出现在 title 里） |
| `prop.cgwh-closed` | 弱 Hausdorff 紧生成空间的开闭子空间与滤过余极限 | （只有书号：`Exercise 2.41`） | $\mathrm{CGWH}$ 的封闭性 | 无候选（aka 里只有书号） |
| `prop.cg-function-space` | 函数空间弱 Hausdorff | `kC(X,Y)` | $Y$ 弱 Hausdorff $\implies$ $kC(X,Y)$ 弱 Hausdorff | 零命中（候选没出现在 title 里） |
| `prop.cg-cartesian-closed` | 紧生成空间是笛卡尔闭的 | `cartesian closed` / `currying` | 紧生成空间是笛卡尔闭范畴 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `cor.cg-exponential-adjoint` | 紧生成空间的指数伴随 | （只有书号：`Corollary 2.3.7` / `Cor 2.3.7`） | $X \mapsto k(X \times Y) \;\dashv\; Z \mapsto kC(kY, Z)$ | 无候选（aka 里只有书号） |
| `def.totally-disconnected` | 完全不连通与极不连通 | `totally disconnected` / `extremally disconnected` | 完全不连通 / 极不连通空间 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.closed-inclusion-filtered-limit` | 紧块沿闭含入拼出的空间 | （只有书号：`Proposition 2.3.9` / `Exercise 2.42`） | 紧 Hausdorff 块沿闭含入的滤过余极限 | 无候选（aka 里只有书号） |
| `prop.closed-map-neighborhood-basis` | 闭映射的邻域基 | （只有书号：`Exercise 8.6`） | 命题：闭映射下 $\pi^{-1}(A)$ 的邻域基 | 无候选（aka 里只有书号） |
| `prop.paracompact-partition-unity` | 仿紧性与单位分解 | （只有书号：`Exercise 8.7`） | 命题：仿紧 Hausdorff / 正规 $\iff$ 单位分解存在 | 无候选（aka 里只有书号） |
| `prop.stone-clopen-refinement` | Stone 空间的闭开加细 | （只有书号：`Exercise 2.20` / `Exercise 2.19`） | 命题：Stone 空间的开覆盖有有限不交闭开加细 | 无候选（aka 里只有书号） |
| `prop.hausdorff-reflective` | Hausdorff 空间是反射子范畴 | （只有书号：`Exercise 2.3`） | 命题：$\mathbf{Haus} \subset \mathbf{Top}$ 是反射子范畴 | 无候选（aka 里只有书号） |
| `prop.normal-locally-closed` | 正规空间的邻域里有闭邻域 | （只有书号：`Exercise 2.5`） | 命题：正规 Hausdorff $\implies$ 每个邻域含闭邻域 | 无候选（aka 里只有书号） |
| `prop.compact-basic-operations` | 紧性的基本操作 | （只有书号：`Exercise 2.6` / `Exercise 2.7`） | 命题：闭子集紧、连续像紧、紧 Hausdorff 正规 | 无候选（aka 里只有书号） |
| `prop.quotient-of-compact` | 紧空间的商紧 | （只有书号：`Exercise 2.8`） | 命题：$S$ 紧 $\implies S/R$ 紧 | 无候选（aka 里只有书号） |
| `prop.totally-disconnected-subspace` | 全不连通对子空间封闭 | （只有书号：`Exercise 2.16`） | 命题：全不连通空间的子空间全不连通 | 无候选（aka 里只有书号） |
| `prop.profinite-sets-spaces` | 投射有限集即投射有限空间 | （只有书号：`Exercise 2.21`） | 命题：有限集的 pro-对象 $\simeq$ 投射有限空间 | 无候选（aka 里只有书号） |
| `prop.continuous-map-space-metric` | 紧 Hausdorff 上的函数空间是度量空间 | （只有书号：`Exercise 2.29`） | 命题：$S$ 紧 Hausdorff、$X$ （半）度量（完备）$\implies C(S, X)$ 也是 | 无候选（aka 里只有书号） |
| `prop.coproduct-chaus` | 不交并是紧 Hausdorff 的余积 | （只有书号：`Exercise 2.12`） | 命题：$S \sqcup T$ 是 $\mathbf{CHaus}$ 里的余积 | 无候选（aka 里只有书号） |
| `prop.connected-image-closure` | 连通的像与闭包 | （只有书号：`Exercise 2.13`） | 命题：连通空间的像连通；连通子集的闭包连通 | 无候选（aka 里只有书号） |
| `prop.chaus-quotient-equiv` | 紧 Hausdorff 上商映射的四种说法 | （只有书号：`Exercise 2.9`） | 命题：商映射 $\iff$ 正则满 $\iff$ 满态射 $\iff$ 满射 | 无候选（aka 里只有书号） |
| `prop.weak-hausdorff-k-closed` | 弱 Hausdorff 的对角线与核 | （只有书号：`Exercise 2.36` / `Exercise 2.37`） | 命题：对角线 $k$-闭 $\iff$ 弱 Hausdorff；$\ker(f,g)$ 也 $k$-闭 | 无候选（aka 里只有书号） |

### 实变函数 · `analysis-measure`（78）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.set-ring` | 环与代数 | `ring of sets` / `algebra of sets` | 环与代数 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.sigma-algebra` | σ-代数 | `sigma-algebra` / `sigma-field` | σ-代数（σ-Algebra） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.set-class-properties` | 集合族的基本性质 | — | 命题：基本类 / 环 / σ-代数的几条基本性质 | 无候选（aka 与 title 都没有英文） |
| `prop.product-sigma-base` | 积 σ-代数的生成基 | — | 命题：把各坐标的 σ-代数换成生成元，积 σ-代数不变 | 无候选（aka 与 title 都没有英文） |
| `prop.product-sigma-generated` | 可数积的生成集 | — | 命题：指标集可数时，积 σ-代数由「矩形」生成 | 无候选（aka 与 title 都没有英文） |
| `cor.borel-product` | 可数积的 Borel 代数 | — | 推论：可数积距离空间的 Borel σ-代数（可分时相等） | 无候选（aka 与 title 都没有英文） |
| `prop.measure-basic` | 测度的基本性质 | — | 命题：测度的单调性、次可加性与两种连续性 | 无候选（aka 与 title 都没有英文） |
| `def.semifinite-part` | 半有限部分 | — | 半有限部分 | 无候选（aka 与 title 都没有英文） |
| `prop.outer-measure-induced` | 由预测度诱导外测度 | — | 命题：从 $\mathcal{E}$ 上的 $\rho$ 诱导出一个外测度 | 无候选（aka 与 title 都没有英文） |
| `def.caratheodory-measurable` | μ*-可测集 | — | Carathéodory 可测性（$\mu^{*}$-Measurable Set） | 无候选（aka 与 title 都没有英文） |
| `thm.caratheodory` | Carathéodory 定理 | — | Carathéodory 定理：$\mu^{*}$-可测集构成 σ-代数，$\mu^{*}$ 在其上是完备测度 | 无候选（aka 与 title 都没有英文） |
| `prop.caratheodory-extension` | 预测度还原 | — | 命题：从预测度出发做 Carathéodory，原代数上的值不变 | 无候选（aka 与 title 都没有英文） |
| `thm.caratheodory-uniqueness` | 扩张的唯一性 | — | 定理：Carathéodory 扩张是最大的，σ-有限时唯一 | 无候选（aka 与 title 都没有英文） |
| `prop.ls-premeasure` | F 给出的预测度 | — | 命题：单调右连续的 F 给出半开区间上的预测度 | 无候选（aka 与 title 都没有英文） |
| `thm.ls-exists` | F ↔ Borel 测度 | — | 定理：每个单调右连续的 F 对应一个 Borel 测度（差常数意义下） | 无候选（aka 与 title 都没有英文） |
| `prop.measurable-criterion` | 可测性的两条判定准则 | — | 命题：复合保持可测；只需在生成元上验证 | 无候选（aka 与 title 都没有英文） |
| `cor.continuous-measurable` | 连续 ⟹ Borel 可测 | — | 推论：连续函数是 Borel 可测的 | 无候选（aka 与 title 都没有英文） |
| `def.lebesgue-measurable` | Lebesgue 可测 | — | Lebesgue 可测 / Borel 可测（$\mathbb{R} \to \mathbb{C}$ 的情形） | 无候选（aka 与 title 都没有英文） |
| `prop.measurable-product-and-realimag` | 积空间与实虚部 | — | 命题：可测函数到积空间；f 可测 $\iff$ 实部虚部可测 | 无候选（aka 与 title 都没有英文） |
| `prop.measurable-closure` | 可测函数的封闭性 | — | 命题：可测函数对和、积、sup、max、极限封闭 | 无候选（aka 与 title 都没有英文） |
| `prop.complete-measurable` | 完备性 ⟺ 不破坏可测性 | — | 命题：$\mu$ 完备 $\iff$ 几乎处处相等 / 几乎处处收敛不破坏可测性 | 无候选（aka 与 title 都没有英文） |
| `prop.completion-measurable-function` | 完备化后可改在零集上 | — | 命题：完备化空间上的可测函数，几乎处处等于一个原空间可测函数 | 无候选（aka 与 title 都没有英文） |
| `def.lplus` | 非负可测函数类 | — | $L^{+}$：非负可测函数全体 | 无候选（aka 与 title 都没有英文） |
| `def.integral-simple` | 简单函数的积分 | — | 简单函数的积分：加权和 | 无候选（aka 与 title 都没有英文） |
| `prop.simple-integral-props` | 简单函数积分的性质 | — | 命题：简单函数积分的四条基本性质 | 无候选（aka 与 title 都没有英文） |
| `def.integral-nonneg` | 非负函数的积分 | — | 非负可测函数的积分：从下面取上确界 | 无候选（aka 与 title 都没有英文） |
| `prop.integral-zero-iff` | 积分为零 ⟺ 几乎处处为零 | — | 命题：$\int f = 0 \iff f = 0 \text{a.e.}$ | 无候选（aka 与 title 都没有英文） |
| `cor.mct-ae` | 单调收敛定理（几乎处处版本） | `MCT a.e.` | 推论：单调收敛定理的几乎处处版本 | 零命中（候选没出现在 title 里） |
| `cor.fatou` | Fatou 的推论 | — | 推论：$f_{n} \to f \text{a.e.} \implies \int f \le \lim \int f_ | 无候选（aka 与 title 都没有英文） |
| `prop.finite-integral-consequences` | 积分有限的后果 | — | 命题：$\int f < \infty$ 时，f 几乎处处有限、支撑 σ-有限 | 无候选（aka 与 title 都没有英文） |
| `def.integral-complex` | 复函数的积分 | — | 复值函数的积分：正负部相减 | 无候选（aka 与 title 都没有英文） |
| `prop.L1-vector-space` | L¹ 是向量空间 | — | 命题：可积函数全体是向量空间，$\int$ 线性 | 无候选（aka 与 title 都没有英文） |
| `prop.integral-abs-ineq` | 积分绝对值不等式 | — | 命题：$\|\int f\| \le \int \|f\|$ | 无候选（aka 与 title 都没有英文） |
| `prop.L1-support-sigma-finite` | L¹ 函数的支撑 σ-有限 | — | 命题：$f \in L^{1} \implies \{f \ne 0\}$ 是 σ-有限的 | 无候选（aka 与 title 都没有英文） |
| `prop.integrals-equal-iff` | 何时两个函数积分处处相同 | — | 命题：$\int_E f = \int_E g$ 对一切 $E \iff f = g \text{a.e.}$ | 无候选（aka 与 title 都没有英文） |
| `thm.termwise-L1` | L¹ 的逐项积分 | — | 定理：$\sum\int\|f_{j}\| < \infty \implies \sum f_{j}$ 几乎处处收敛且可 | 无候选（aka 与 title 都没有英文） |
| `thm.approximation-L1` | L¹ 里的逼近 | — | 定理：$L^{1}$ 中可用简单函数 / 连续函数逼近 | 无候选（aka 与 title 都没有英文） |
| `prop.convergence-counterexamples` | 四个标准反例 | — | 命题：四个标准反例（把各种收敛区分开） | 无候选（aka 与 title 都没有英文） |
| `def.cauchy-in-measure` | 依测度 Cauchy | — | 依测度 Cauchy 序列 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-in-measure` | 依测度 Cauchy ⟹ 收敛 | — | 定理：依测度 Cauchy 列必有依测度极限，且有一子列 a.e. 收敛 | 无候选（aka 与 title 都没有英文） |
| `prop.L1-implies-measure` | L¹ 收敛 ⟹ 依测度收敛 | — | 命题：$L^{1}$ 收敛蕴含依测度收敛（Markov 不等式） | 无候选（aka 与 title 都没有英文） |
| `thm.product-measure-sections` | 乘积测度由截口给出 | — | 定理：$\mu \times \nu(E) = \int \nu(E_{x}) d\mu(x) = \int \mu(E | 无候选（aka 与 title 都没有英文） |
| `thm.fubini-tonelli` | Fubini–Tonelli 定理 | `Fubini` / `Tonelli` | Fubini–Tonelli 定理（重积分可交换次序） | 多命中：`Fubini` / `Tonelli` |
| `thm.fubini-complete` | 完备情形的 F–T | — | 定理：完备化的乘积测度上，Fubini–Tonelli 仍然成立 | 无候选（aka 与 title 都没有英文） |
| `prop.product-incomplete` | 乘积测度通常不完备 | — | 注记：$\mu$、$\nu$ 完备时，$\mu \times \nu$ 常常不完备 | 无候选（aka 与 title 都没有英文） |
| `def.positive-negative-null` | 正集 / 负集 / 零集 | — | 正集 / 负集 / 零集 | 无候选（aka 与 title 都没有英文） |
| `prop.positive-set-closure` | 正集的封闭性 | — | 命题：正集的可测子集仍是正集；可数个正集之并仍是正集 | 无候选（aka 与 title 都没有英文） |
| `prop.ac-and-variations` | 绝对连续与变差 | — | 命题：$\nu \ll \mu \iff \|\nu\| \ll \mu \iff \nu^{+}$、$\nu^{-}  | 无候选（aka 与 title 都没有英文） |
| `thm.ac-epsilon-delta` | 绝对连续的 ε–δ 刻画 | — | 定理（有限情形）：$\nu \ll \mu \iff \forall\varepsilon>0 \exists\delt | 无候选（aka 与 title 都没有英文） |
| `prop.integral-gives-ac` | 积分给出绝对连续测度 | — | 命题：$\nu(E) = \int_E f d\mu$ 关于 $\mu$ 绝对连续 | 无候选（aka 与 title 都没有英文） |
| `cor.ac-integral-continuity` | 积分的绝对连续性 | — | 推论：$\int_E f d\mu$ 在小测度集上任意小 | 无候选（aka 与 title 都没有英文） |
| `lem.singular-or-lower-bound` | 要么奇异、要么有下界 | — | 引理：两个有限测度，要么相互奇异，要么在某个正测度集上成比例 | 无候选（aka 与 title 都没有英文） |
| `prop.rn-chain-rule` | Radon–Nikodym 导数的链式法则 | — | 命题：Radon–Nikodym 导数的换元公式与链式法则 | 无候选（aka 与 title 都没有英文） |
| `cor.rn-inverse` | 互为绝对连续时导数互逆 | — | 推论：$\mu \ll \lambda$ 且 $\lambda \ll \mu \implies (d\mu/d\lam | 无候选（aka 与 title 都没有英文） |
| `thm.rn-complex` | 复测度的 Radon–Nikodym | — | 定理：复测度的 $\nu = \lambda + f d\mu$ 分解 | 无候选（aka 与 title 都没有英文） |
| `prop.L1-signed` | L¹(ν) 与全变差 | — | 命题：符号测度的 $L^{1}(\nu) = L^{1}(\|\nu\|)$，以及几条基本不等式 | 无候选（aka 与 title 都没有英文） |
| `lem.average-continuous` | 平均算子联合连续 | — | 引理：$A_{r} f(x)$ 关于 (r, x) 联合连续 | 无候选（aka 没英文，title 里有） |
| `thm.lebesgue-set-full` | Lebesgue 集几乎处处 | — | 定理：$f \in L^{1}_{\text{loc}} \implies m(L_f^{c}) = 0$ | 无候选（aka 与 title 都没有英文） |
| `thm.differentiation-general` | 可缩族的微分定理 | — | 定理：对可缩族，Lebesgue 微分定理仍然成立 | 无候选（aka 与 title 都没有英文） |
| `thm.rn-pointwise` | Radon–Nikodym 导数的点态公式 | — | 定理：$\nu(E_{r})/m(E_{r}) \to f(x) \text{a.e.}$，其中 $d\nu = d\l | 无候选（aka 与 title 都没有英文） |
| `thm.monotone-differentiable` | 单调函数几乎处处可导 | — | 定理：单调函数几乎处处可导，且不连续点可数 | 无候选（aka 与 title 都没有英文） |
| `prop.bv-examples` | 有界变差函数的例子与基本性质 | — | 命题：有界变差函数的几个例子与封闭性 | 无候选（aka 与 title 都没有英文） |
| `lem.variation-monotone` | T_F ± F 递增 | — | 引理：实值有界变差函数的 $T_F + F$ 与 $T_F - F$ 都递增 | 无候选（aka 与 title 都没有英文） |
| `thm.bv-jordan` | 有界变差函数的 Jordan 分解 | — | 定理：$F \in BV \iff F = G - H$（G、H 有界递增） | 无候选（aka 与 title 都没有英文） |
| `prop.bv-regularity` | 有界变差函数的正则性 | — | 命题：有界变差函数的单侧极限都存在、不连续点可数、几乎处处可导 | 无候选（aka 与 title 都没有英文） |
| `def.nbv` | 规范有界变差函数 | `NBV` | 规范有界变差函数：右连续且 $F(-\infty) = 0$ 的有界变差函数 | 零命中（候选没出现在 title 里） |
| `lem.nbv-variation` | 全变差的规范有界变差性质 | — | 引理：$T_F(-\infty) = 0$；F 右连续 $\implies T_F$ 右连续 | 无候选（aka 与 title 都没有英文） |
| `prop.monotone-integral-derivative` | 递增函数的导数积分不等式 | — | 命题：$\int_{a}^{b} F' \le F(b) - F(a)$ | 无候选（aka 与 title 都没有英文） |
| `thm.borel-measure-nbv` | 测度与规范有界变差函数的一一对应 | — | 定理：$\mathbb{R}$ 上的复 Borel 测度与规范有界变差函数一一对应 | 无候选（aka 与 title 都没有英文） |
| `prop.ac-iff-measure-ac` | 函数绝对连续 ⟺ 测度绝对连续 | — | 命题：F 绝对连续 $\iff \mu_F \ll m$ | 无候选（aka 与 title 都没有英文） |
| `cor.integral-is-ac-nbv` | 积分得到的函数绝对连续且规范有界变差 | — | 推论：$f \in L^{1}(m) \implies F(x) = \int_{-\infty}^{x} f$ 绝对连 | 无候选（aka 与 title 都没有英文） |
| `lem.ac-subset-bv` | 绝对连续蕴含有界变差 | — | 引理：绝对连续蕴含绝对变差（紧区间上） | 无候选（aka 与 title 都没有英文） |
| `thm.linf-properties` | L^∞ 的性质 | — | 定理：$L^\infty$ 的五条基本性质 | 无候选（aka 与 title 都没有英文） |
| `prop.lq-in-lp-plus-lr` | L^q 落在 L^p + L^r 里 | — | 命题：$L^q \subseteq L^p + L^r$（$0 < p < q < r \le \infty$） | 无候选（aka 与 title 都没有英文） |
| `prop.lp-inter-lr-in-lq` | L^p 与 L^r 的交包含于 L^q | — | 命题（插值）：$L^p \cap L^r \subseteq L^q$ | 无候选（aka 与 title 都没有英文） |
| `prop.ell-p-inclusion` | ℓ^p 包含于 ℓ^q | — | 命题（只有衰减的场合）：$\ell^p \subseteq \ell^q$（$0 < p < q \le \infty$ | 无候选（aka 与 title 都没有英文） |
| `prop.lp-inclusion-finite` | 有限测度时方向反过来 | — | 命题（只有爆破的场合）：$\mu(X) < \infty$ 时 $L^p(\mu) \supseteq L^q(\mu) | 无候选（aka 与 title 都没有英文） |
| `prop.bounded-functional-gives-lq` | 有界 ⟹ g ∈ L^q | — | 命题：若 $f \mapsto \int fg$ 在简单函数上有界，则 $g \in L^q$ | 无候选（aka 与 title 都没有英文） |

### 数学分析 · `analysis`（127）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.normed-space` | 赋范空间 | — | 赋范空间 | 无候选（aka 与 title 都没有英文） |
| `def.banach-space` | Banach 空间 | — | Banach 空间（完备赋范空间） | 无候选（aka 与 title 都没有英文） |
| `def.partial-derivative` | 偏导数 | — | 偏导数 | 无候选（aka 与 title 都没有英文） |
| `def.directional-derivative` | 方向导数 | — | 方向导数 | 无候选（aka 与 title 都没有英文） |
| `def.total-differential` | 可微与全微分 | — | 可微与全微分 | 无候选（aka 与 title 都没有英文） |
| `def.gradient` | 梯度 | — | 梯度 | 无候选（aka 与 title 都没有英文） |
| `def.jacobian` | Jacobi 矩阵 | — | Jacobi 矩阵 | 无候选（aka 与 title 都没有英文） |
| `def.hessian` | Hessian 矩阵 | — | Hessian 矩阵 | 无候选（aka 与 title 都没有英文） |
| `thm.chain-rule-multi` | 多元链式法则 | — | 定理：链式法则 $D(g \circ f) = Dg \cdot Df$ | 无候选（aka 与 title 都没有英文） |
| `thm.mixed-partials` | 混合偏导相等 | — | 定理（Schwarz）：混合偏导数与次序无关 | 无候选（aka 没英文，title 里有） |
| `thm.mean-value-multi` | 多元中值定理 | — | 定理：多元中值定理与中值不等式 | 无候选（aka 与 title 都没有英文） |
| `thm.taylor-multi` | 多元 Taylor 公式 | — | 定理：多元 Taylor 公式 | 无候选（aka 与 title 都没有英文） |
| `thm.second-derivative-test` | 极值判别（Hessian 判据） | — | 定理：二阶导数判别法（Hessian 判据） | 无候选（aka 与 title 都没有英文） |
| `def.contraction` | 压缩映射 | — | 压缩映射 | 无候选（aka 与 title 都没有英文） |
| `thm.banach-fixed-point` | 压缩映射原理 | — | 定理（Banach）：完备度量空间上的压缩映射有唯一不动点 | 无候选（aka 没英文，title 里有） |
| `thm.inverse-function` | 逆映射定理 | — | 定理（逆映射定理）：$Df(a)$ 可逆 $\implies$ 局部可逆 | 无候选（aka 与 title 都没有英文） |
| `thm.implicit-function` | 隐函数定理 | — | 定理（隐函数定理）：$D_y F$ 可逆 $\implies$ 局部能解出 $y = g(x)$ | 无候选（aka 与 title 都没有英文） |
| `thm.inverse-function-banach` | 逆映射定理（Banach 版） | — | 定理：Banach 空间上的逆映射定理 | 无候选（aka 与 title 都没有英文） |
| `thm.implicit-function-banach` | 隐函数定理（Banach 版） | — | 定理：Banach 空间上的隐函数定理 | 无候选（aka 与 title 都没有英文） |
| `cor.rank-theorem` | 常秩定理 | — | 推论（秩定理）：常秩映射的局部标准形 | 无候选（aka 与 title 都没有英文） |
| `def.submersion-immersion` | 浸入 / 淹没 / 嵌入 | — | 浸入、淹没与嵌入 | 无候选（aka 与 title 都没有英文） |
| `thm.regular-value` | 正则值原像定理 | — | 定理：正则值的原像是子流形 | 无候选（aka 与 title 都没有英文） |
| `thm.lagrange-multiplier` | Lagrange 乘子法 | — | 定理（Lagrange 乘子法）：约束极值的必要条件 | 无候选（aka 与 title 都没有英文） |
| `thm.morse-lemma` | Morse 引理 | — | 定理（Morse 引理）：非退化临界点附近的局部标准形 | 无候选（aka 与 title 都没有英文） |
| `thm.sard` | Sard 定理 | — | 定理（Sard）：临界值集是零测集 | 无候选（aka 与 title 都没有英文） |
| `prop.field-rules` | 环与域的基本等式 | — | 命题：环与域里的基本等式 | 无候选（aka 与 title 都没有英文） |
| `prop.order-rules` | 序与四则运算 | — | 命题：不等式的基本运算 | 无候选（aka 与 title 都没有英文） |
| `prop.abs-properties` | 绝对值的运算性质 | — | 命题：绝对值的运算性质 | 无候选（aka 与 title 都没有英文） |
| `cor.archimedean-epsilon` | 阿基米德的 ε 形式与取整 | — | 推论：$1/n < \varepsilon$ 与取整函数 | 无候选（aka 与 title 都没有英文） |
| `def.power` | 整数幂 | — | 整数幂 $a^{n}$ | 无候选（aka 与 title 都没有英文） |
| `prop.power-rules` | 指数律与幂的单调性 | — | 命题：指数律 | 无候选（aka 与 title 都没有英文） |
| `thm.nth-root` | n 次方根 | — | 定理：$n$ 次方根的存在唯一性（Existence of $n$-th Roots） | 无候选（aka 与 title 都没有英文） |
| `def.real-power` | 有理指数与实数指数幂 | — | 有理指数与实数指数幂 | 无候选（aka 与 title 都没有英文） |
| `thm.binomial` | 二项式定理 | — | 定理：二项式定理 | 无候选（aka 与 title 都没有英文） |
| `thm.bernoulli` | Bernoulli 不等式 | — | 定理：Bernoulli 不等式（Bernoulli's Inequality） | 无候选（aka 没英文，title 里有） |
| `prop.limit-basic` | 极限的基本性质 | — | 命题：极限的唯一性、有界性与保号性 | 无候选（aka 与 title 都没有英文） |
| `prop.continuous-arithmetic` | 连续函数的运算 | — | 命题：连续函数的和差积商与复合 | 无候选（aka 与 title 都没有英文） |
| `prop.differentiable-implies-continuous` | 可导 ⟹ 连续 | — | 命题：可导蕴含连续（Differentiable $\implies$ Continuous） | 无候选（aka 与 title 都没有英文） |
| `thm.derivative-rules` | 求导法则 | — | 定理：求导的四则运算与链式法则 | 无候选（aka 与 title 都没有英文） |
| `thm.elementary-derivatives` | 初等函数的导数 | — | 定理：初等函数的导数表 | 无候选（aka 与 title 都没有英文） |
| `thm.geometric-series` | 几何级数 | — | 定理：几何级数 | 无候选（aka 与 title 都没有英文） |
| `thm.p-series` | p-级数 | — | 定理：$p$-级数的敛散性（$p$-Series） | 无候选（aka 与 title 都没有英文） |
| `def.sequence-limit` | 数列极限 | `limit` / `convergence` | 数列极限 $x_n \to x$ | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.real-ordered-field` | ℝ 是完备有序域 | `least upper bound property` / `completeness of R` | $\mathbb{R}$ 是完备有序域（确界原理） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.function-limit` | 函数极限 | — | 函数极限 $\lim_{x \to x_0} f(x) = L$ | 无候选（aka 与 title 都没有英文） |
| `def.function-limit-onesided` | 单侧极限 | — | 左极限与右极限 | 无候选（aka 与 title 都没有英文） |
| `thm.squeeze` | 夹逼定理 | — | 夹逼定理 | 无候选（aka 与 title 都没有英文） |
| `prop.limit-arithmetic` | 极限的四则运算与保序性 | — | 命题：极限的四则运算、保序性与绝对值 | 无候选（aka 与 title 都没有英文） |
| `def.cauchy-sequence` | Cauchy 列 | — | Cauchy 列 | 无候选（aka 与 title 都没有英文） |
| `def.limsup-liminf` | 上极限与下极限 | — | 上极限与下极限 $\limsup$ / $\liminf$ | 无候选（aka 与 title 都没有英文） |
| `def.limit-point` | 聚点 | — | 聚点 / 极限点 | 无候选（aka 与 title 都没有英文） |
| `thm.monotone-convergence` | 单调有界定理 | — | 单调有界定理 | 无候选（aka 与 title 都没有英文） |
| `lem.nested-intervals` | 闭区间套定理 | — | 引理：闭区间套定理 | 无候选（aka 与 title 都没有英文） |
| `thm.bolzano-weierstrass` | Bolzano–Weierstrass 定理 | — | Bolzano–Weierstrass 定理（有界列必有收敛子列） | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-criterion` | Cauchy 收敛准则 | — | 定理：收敛 $\iff$ Cauchy | 无候选（aka 与 title 都没有英文） |
| `thm.real-complete-metric` | ℝ 是完备度量空间 | — | 定理：$(\mathbb{R}, \|x - y\|)$ 是完备度量空间 | 无候选（aka 与 title 都没有英文） |
| `thm.completeness-equivalent` | 完备性的六条等价 | — | 定理：下列六条彼此等价 | 无候选（aka 与 title 都没有英文） |
| `cor.heine-borel` | 有界闭 ⟺ 紧（ℝⁿ） | — | 推论：Heine–Borel 定理 —— $\mathbb{R}^{n}$ 中紧 $\iff$ 有界且闭 | 无候选（aka 与 title 都没有英文） |
| `def.uniform-continuity` | 一致连续 | — | 一致连续 | 无候选（aka 与 title 都没有英文） |
| `prop.continuous-bounded-on-compact` | 紧集上连续 ⟹ 有界 | — | 命题：紧空间上的连续实值函数有界 | 无候选（aka 与 title 都没有英文） |
| `thm.evt` | 最值定理 | — | 最值定理 | 无候选（aka 与 title 都没有英文） |
| `thm.ivt` | 介值定理 | — | 介值定理 | 无候选（aka 与 title 都没有英文） |
| `cor.zero-point` | 零点定理 | — | 推论：零点定理（Bolzano 定理） | 无候选（aka 与 title 都没有英文） |
| `thm.uniform-continuity-compact` | 紧集上连续 ⟹ 一致连续 | — | 定理（Cantor）：紧集上的连续函数一致连续 | 无候选（aka 没英文，title 里有） |
| `thm.monotone-inverse` | 反函数连续 | — | 定理：严格单调连续函数的反函数连续 | 无候选（aka 与 title 都没有英文） |
| `prop.discontinuity-types` | 间断点分类 | — | 命题：间断点的两类分法 | 无候选（aka 与 title 都没有英文） |
| `def.local-extremum` | 局部极值 | — | 局部极大与局部极小 | 无候选（aka 与 title 都没有英文） |
| `thm.fermat` | Fermat 引理 | — | Fermat 引理：内点极值 $\implies$ 导数为零 | 无候选（aka 与 title 都没有英文） |
| `thm.rolle` | Rolle 中值定理 | — | Rolle 中值定理（Rolle's Theorem） | 无候选（aka 没英文，title 里有） |
| `thm.mvt` | Lagrange 中值定理 | — | Lagrange 中值定理 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-mvt` | Cauchy 中值定理 | — | Cauchy 中值定理（广义中值定理） | 无候选（aka 与 title 都没有英文） |
| `cor.constant-iff-zero-derivative` | 导数为零 ⟺ 常函数 | — | 推论：区间上导数恒为零 $\iff$ 函数为常数 | 无候选（aka 与 title 都没有英文） |
| `prop.derivative-monotone` | 导数符号 ⟹ 单调性 | — | 命题：导数符号与单调性 | 无候选（aka 与 title 都没有英文） |
| `thm.lhopital` | L'Hôpital 法则 | — | L'Hôpital 法则（不定式极限） | 无候选（aka 与 title 都没有英文） |
| `def.higher-derivative` | 高阶导数与 C^k | — | 高阶导数与 $C^{k}$ 类 | 无候选（aka 与 title 都没有英文） |
| `def.convex-function` | 凸函数 | — | 凸函数与 Jensen 不等式 | 无候选（aka 与 title 都没有英文） |
| `thm.convex-criterion` | 凸性的导数判据 | — | 定理：凸 $\iff$ 导数递增 $\iff f'' \ge 0$ | 无候选（aka 与 title 都没有英文） |
| `thm.taylor` | Taylor 公式 | — | Taylor 公式（带 Lagrange 余项） | 无候选（aka 与 title 都没有英文） |
| `prop.taylor-peano` | Taylor 公式（Peano 余项） | — | 命题：Taylor 公式的 Peano 余项形式 | 无候选（aka 与 title 都没有英文） |
| `def.partition` | 分割 | — | 分割与加细 | 无候选（aka 与 title 都没有英文） |
| `def.riemann-sum` | Riemann 和 | — | Riemann 和（标记和） | 无候选（aka 与 title 都没有英文） |
| `def.darboux-sum` | 上和与下和 | — | 上和 $U(f, P)$ 与下和 $L(f, P)$ | 无候选（aka 没英文，title 里有） |
| `def.riemann-integrable` | Riemann 可积 | — | Riemann 可积与积分 $\int_a^b f$ | 无候选（aka 与 title 都没有英文） |
| `thm.darboux-criterion` | Darboux 判据 | — | 定理（Darboux 判据）：可积 $\iff \inf_P U = \sup_P L$ | 无候选（aka 与 title 都没有英文） |
| `thm.riemann-criterion` | 可积的振幅判据 | — | 定理（Riemann 判据）：可积 $\iff$ 振幅和可以任意小 | 无候选（aka 与 title 都没有英文） |
| `prop.integrable-examples` | 哪些函数可积 | — | 命题：连续、单调 $\implies$ 可积；Dirichlet 函数不可积 | 无候选（aka 与 title 都没有英文） |
| `thm.riemann-lebesgue-criterion` | 可积 ⟺ 不连续点零测 | — | 定理（Lebesgue 判据）：有界可积 $\iff$ 不连续点集是零测集 | 无候选（aka 与 title 都没有英文） |
| `prop.integral-linear` | 积分的线性与区间可加 | — | 命题：积分的线性性与区间可加性 | 无候选（aka 与 title 都没有英文） |
| `prop.integral-order` | 积分的保序与估计 | — | 命题：保序性、绝对值不等式与基本估计 | 无候选（aka 与 title 都没有英文） |
| `thm.ftc-riemann-part1` | 变上限积分的导数 | — | 定理（第一基本定理）：变上限积分及其导数 | 无候选（aka 与 title 都没有英文） |
| `thm.ftc-riemann-part2` | Newton–Leibniz 公式 | — | 定理（第二基本定理）：$\int_a^b F' = F(b) - F(a)$ | 无候选（aka 与 title 都没有英文） |
| `prop.integration-substitution` | 换元积分 | — | 命题：换元公式 | 无候选（aka 与 title 都没有英文） |
| `prop.integration-by-parts` | 分部积分 | — | 命题：分部积分公式 | 无候选（aka 与 title 都没有英文） |
| `thm.mean-value-integral` | 积分中值定理 | — | 定理：积分中值定理（第一形式） | 无候选（aka 与 title 都没有英文） |
| `def.improper-integral` | 反常积分 | — | 反常积分：无穷区间与无界函数 | 无候选（aka 与 title 都没有英文） |
| `prop.improper-comparison` | 反常积分的比较判敛 | — | 命题：比较判别法与绝对收敛 | 无候选（aka 与 title 都没有英文） |
| `prop.riemann-implies-lebesgue` | Riemann 可积蕴含 Lebesgue 可积 | — | 命题：Riemann 可积 $\implies$ Lebesgue 可积，且积分相等 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-criterion-series` | 级数的 Cauchy 准则 | — | 定理：级数收敛 $\iff$ 尾部可以任意小 | 无候选（aka 与 title 都没有英文） |
| `thm.comparison-test` | 比较判别法 | — | 定理：比较判别法 | 无候选（aka 与 title 都没有英文） |
| `thm.kummer` | Kummer 判别法 | — | 定理：Kummer 判别法（正项级数判据的总纲） | 无候选（aka 与 title 都没有英文） |
| `thm.root-test` | 根值判别法 | — | 定理：根值判别法（Cauchy，用 $\limsup \sqrt[n]{a_n}$） | 无候选（aka 与 title 都没有英文） |
| `thm.integral-test` | 积分判别法 | — | 定理：积分判别法（Cauchy 积分判别法） | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-condensation` | Cauchy 凝聚判别法 | — | 定理：Cauchy 凝聚判别法（按 $2^{k}$ 分组） | 无候选（aka 与 title 都没有英文） |
| `thm.abel-dirichlet-series` | Abel–Dirichlet 判别法 | — | 定理：Abel 与 Dirichlet 判别法（非绝对收敛那一族） | 无候选（aka 与 title 都没有英文） |
| `def.absolute-convergence` | 绝对收敛 | — | 绝对收敛 | 无候选（aka 与 title 都没有英文） |
| `def.conditional-convergence` | 条件收敛 | — | 条件收敛 | 无候选（aka 与 title 都没有英文） |
| `thm.absolute-implies-convergent` | 绝对收敛 ⟹ 收敛 | — | 定理：绝对收敛蕴含收敛 | 无候选（aka 与 title 都没有英文） |
| `thm.rearrangement` | 重排不变性 | — | 定理：绝对收敛级数任意重排后和不变 | 无候选（aka 与 title 都没有英文） |
| `thm.riemann-rearrangement` | Riemann 重排定理 | — | 定理（Riemann）：条件收敛级数可以重排成任意和 | 无候选（aka 没英文，title 里有） |
| `thm.series-product` | Cauchy 乘积 | — | 定理：绝对收敛级数的 Cauchy 乘积 | 无候选（aka 与 title 都没有英文） |
| `def.pointwise-convergence` | 逐点收敛 | — | 逐点收敛 | 无候选（aka 与 title 都没有英文） |
| `def.uniform-convergence` | 一致收敛 | — | 一致收敛 $f_n \rightrightarrows f$ | 无候选（aka 与 title 都没有英文） |
| `def.uniform-cauchy` | 一致 Cauchy 列 | — | 一致 Cauchy 列 | 无候选（aka 与 title 都没有英文） |
| `thm.uniform-limit-continuous` | 一致收敛保连续 | — | 定理：一致收敛的连续函数列的极限连续 | 无候选（aka 与 title 都没有英文） |
| `thm.uniform-limit-integral` | 积分与极限交换 | — | 定理：一致收敛 $\implies$ 极限与积分可交换（Riemann 版） | 无候选（aka 与 title 都没有英文） |
| `thm.uniform-limit-derivative` | 导数与极限交换 | — | 定理：导数与极限可交换（需要导数一致收敛） | 无候选（aka 与 title 都没有英文） |
| `prop.weierstrass-m-test` | Weierstrass 判别法 | — | 命题：Weierstrass 判别法（$M$-判别法） | 无候选（aka 与 title 都没有英文） |
| `thm.dini` | Dini 定理 | — | 定理（Dini）：紧集上单调的逐点收敛就是一致收敛 | 无候选（aka 与 title 都没有英文） |
| `def.power-series` | 幂级数 | — | 幂级数 | 无候选（aka 与 title 都没有英文） |
| `thm.convergence-radius` | 收敛半径 | — | 定理：Cauchy–Hadamard 收敛半径 | 无候选（aka 与 title 都没有英文） |
| `thm.power-series-analytic` | 幂级数的逐项运算 | — | 定理：收敛区间内幂级数可逐项求导与积分 | 无候选（aka 与 title 都没有英文） |
| `thm.abel-endpoint` | Abel 第二定理 | — | 定理（Abel 第二定理）：端点处的连续性 | 无候选（aka 与 title 都没有英文） |
| `def.exp-function` | 指数函数 | — | 指数函数 $\exp$（由幂级数定义） | 无候选（aka 与 title 都没有英文） |
| `def.log-function` | 对数函数与 e | — | 对数函数 $\log$ 与常数 $e$ | 无候选（aka 与 title 都没有英文） |
| `def.trig-function` | 正弦与余弦 | — | 正弦、余弦（由幂级数定义） | 无候选（aka 与 title 都没有英文） |
| `def.pi` | 圆周率 π | — | 常数 $\pi$（由余弦的最小正零点定义） | 无候选（aka 与 title 都没有英文） |
| `thm.euler-formula` | Euler 公式 | — | 定理：$e^{i\theta} = \cos\theta + i\sin\theta$ | 无候选（aka 与 title 都没有英文） |

### 范畴论 · `category`（132）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `prop.functor-preserves-iso` | 函子保同构 | — | 命题：函子把同构送到同构 | 无候选（aka 与 title 都没有英文） |
| `def.ff-faithful` | 忠实 / 满 / 全忠实 | `faithful` / `full` / `fully faithful` | 忠实、满、全忠实函子 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.commutative-diagram` | 图与交换图 | `commutative diagram` / `diagram` | 图与交换图 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.cone` | 锥 | `cone` / `cocone` | 锥与余锥 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.limit` | 极限 | `limit` / `colimit` | 极限与余极限 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.final-initial` | 终对象 / 始对象 | `terminal object` / `initial object` | 终对象与始对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.product` | 积 / 余积 | `product` / `coproduct` | 积与余积 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.fibered-product` | 纤维积 / 纤维余积 | `pullback` / `fibered product` / `pushout` | 纤维积与纤维余积 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.equalizer` | 等化子 / 余等化子 | `equalizer` / `coequalizer` / `ker` / `coker` | 等化子与余等化子 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.mono` | 单态射 / 满态射 / 同构 | `mono` / `epi` / `monomorphism` / `epimorphism` / `isomorphism` / `isomorphic` | 单态射、满态射与同构 | 零命中（aka 有 5 条候选，title 里一条都没出现） |
| `def.image` | 像 / 余像 | `image` / `coimage` / `strict` | 像与余像 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.elements-category` | 元素范畴 | `category of elements` / `el(F)` / `universal element` | 元素范畴 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.representable` | 表示函子 | `representable functor` / `universal element` | 表示函子与万有元素 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.yoneda` | 米田引理 | `Yoneda lemma` / `Yoneda` | 米田引理 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.slice-cartesian` | 切片范畴是拉回 | — | 切片范畴的方块是笛卡尔的 | 无候选（aka 与 title 都没有英文） |
| `lem.presheaf-mono-pointwise` | 预层态射的单满按点检验 | — | 预层是逐点算的 | 无候选（aka 与 title 都没有英文） |
| `def.adjoint` | 伴随函子 | `adjoint functor` / `adjunction` | 伴随函子 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.adjunction-unit` | 单位与余单位 | `unit` / `counit` | 单位与余单位 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.limit-adjoint` | 极限即伴随 | （只有书号：`Proposition 1.5.4` / `Prop 1.5.4`） | 极限 $\iff$ 常图函子有伴随 | 无候选（aka 里只有书号） |
| `thm.right-adjoint-preserves-limits` | 右伴随保极限 | `RAPL` | 右伴随保持所有极限 | 零命中（候选没出现在 title 里） |
| `def.comma-category` | 逗号范畴 | `comma category` / `X down G` / `F ↓ G` / `F↓G` / `F down G` | 逗号范畴 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `prop.reflective-limits` | 反射子范畴里的极限 | （只有书号：`Exercise 1.64` / `Exercise 1.70`） | 反射子范畴中的极限与余极限 | 无候选（aka 里只有书号） |
| `def.sieve` | 筛 | `sieve` / `covering sieve` | 筛 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.pretopology` | 预拓扑 | `pretopology` / `Grothendieck pretopology` | 预拓扑 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.grothendieck-topology` | Grothendieck 拓扑 | `Grothendieck topology` / `site` | Grothendieck 拓扑与景 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.sheaf` | 层 | `sheaf` / `separated presheaf` | 层与分离预层 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.cech-properties` | Čech 函子的性质 | （只有书号：`Lemma 3.2.6`） | Čech 函子的三条性质 | 无候选（aka 里只有书号） |
| `thm.sheafification` | 层化 | `sheafification` / `sheafify` | 层化：层范畴是预层范畴的反射子范畴 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.regular-epi` | 正则满态射 | `regular epimorphism` / `regular epi` | 正则满态射 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.universal-colimit` | 万有关系 | `universal colimit` / `disjoint coproduct` | 万有余极限、万有满态射、不交余积 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.site-properties` | 景的层范畴的好性质 | （只有书号：`Exercise 3.24`） | Grothendieck 拓扑下的层范畴 | 无候选（aka 里只有书号） |
| `prop.sheafify-equivalence` | 层化与等价关系交换 | （只有书号：`Exercise 3.17` / `Exercise 3.28`） | 层化保持等价关系与商 | 无候选（aka 里只有书号） |
| `def.canonical-topology` | 标准拓扑 | `canonical topology` / `subcanonical` | 标准拓扑与次标准拓扑 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.covering-sieve-epi` | 覆盖筛即余积满射 | （只有书号：`Corollary 3.2.13` / `Cor 3.2.13`） | 覆盖族生成覆盖筛 $\iff$ 余积满射 | 无候选（aka 里只有书号） |
| `prop.disjoint-universal` | 不交万有余积与次标准拓扑 | （只有书号：`Exercise 3.29`） | 不交万有余积在次标准拓扑下不变 | 无候选（aka 里只有书号） |
| `prop.subobject-lattice` | 子对象构成有界格 | （只有书号：`Exercise 3.33`） | 预拓扑斯中子对象构成有界格 | 无候选（aka 里只有书号） |
| `prop.precanonical-sheaf` | 预标准拓扑下的层 | （只有书号：`Exercise 3.36` / `Proposition 3.3.3`） | 预标准拓扑下「层」的两条等式 | 无候选（aka 里只有书号） |
| `prop.precanonical-preserves` | 余积与商在层范畴中不变 | — | 预标准拓扑下余积与商不变 | 无候选（aka 与 title 都没有英文） |
| `prop.precanonical-mono-epi` | 单满在层化后不变 | （只有书号：`Exercise 3.38`） | 预标准拓扑下单态射与满态射不变 | 无候选（aka 里只有书号） |
| `def.generator` | 生成元集 | `generator` / `set of generators` | 生成元集与生成元 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.topos` | 拓扑斯 | `topos` / `Grothendieck topos` | 拓扑斯 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.representable-quotient` | 可表示性的下降 | — | 可表示性的下降引理 | 无候选（aka 与 title 都没有英文） |
| `prop.topos-covering-epi` | 拓扑斯中覆盖即余积满射 | （只有书号：`Exercise 3.41`） | 拓扑斯中的覆盖 | 无候选（aka 里只有书号） |
| `prop.topos-sheaf-limits` | 拓扑斯上的层即保极限的预层 | （只有书号：`Exercise 3.42`） | 拓扑斯上的层 $\iff$ 保持所有极限 | 无候选（aka 里只有书号） |
| `prop.quasi-compact-properties` | 拟紧的性质 | （只有书号：`Exercise 3.46` / `Proposition 3.3.9`） | 拟紧对象的性质 | 无候选（aka 里只有书号） |
| `thm.pretopos-qcqs` | 预拓扑斯由拓扑斯唯一确定 | `qcqs` | 预拓扑斯 $\simeq$ 拟紧拟分离层 | 零命中（候选没出现在 title 里） |
| `def.cofinal-functor` | 共尾函子 | `cofinal` / `cofinal functor` / `final functor` / `coinitial` | 共尾函子 | 零命中（aka 有 4 条候选，title 里一条都没出现） |
| `def.filtered-category` | 滤过范畴 | `filtered category` / `filtered` / `cocone` | 滤过范畴与滤过余极限 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `prop.representable-preserves-limits` | 可表函子保所有极限 | `representable preserves limits` / `left exact` | 可表函子保所有极限 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.monoid-object` | 幺半群对象 | `monoid object` / `Mon(C)` / `cartesian category` | 幺半群对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.group-object` | 群对象与阿贝尔群对象 | `group object` / `abelian group object` / `Gr(C)` / `Ab(C)` | 群对象与阿贝尔群对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `ex.ab-of-categories` | Ab(C) 的例子 | `Ab(Top)` / `Ab(Set)` | $\mathrm{Ab}(-)$ 在几个范畴上的样子 | 零命中（候选没出现在 title 里） |
| `prop.localization-hom-colim` | 局部化的 Hom 是滤过余极限 | — | $\operatorname{Hom}_{\mathrm{ho}}(X,Y) = \varinjlim_{X' \to  | 无候选（aka 与 title 都没有英文） |
| `prop.sieve-covering-equivalent` | 覆盖筛的四条等价 | （只有书号：`Proposition 3.2.12` / `Prop 3.2.12`） | 覆盖筛的等价刻画（$\widetilde{R} \simeq \underline{X}$） | 无候选（aka 里只有书号） |
| `prop.limit-construction` | 极限的构造 | （只有书号：`Exercise 1.37` / `Exercise 1.35`） | 极限 = 无限积 + 等化子 | 无候选（aka 里只有书号） |
| `def.exact-functor` | 正合函子 | `left exact` / `right exact` / `exact functor` | 左正合 / 右正合 / 正合函子 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.zero-object` | 零对象与直和 | `zero object` / `biproduct` | 零对象、双积与直和 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.finitely-presented` | 有限表现对象 | `finitely presented` / `compact object` | 有限表现（紧）对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.iso-unique-section` | 同构的截面与收缩唯一 | （只有书号：`Proposition 1.1.4` / `Prop 1.1.4`） | 同构的截面与收缩 | 无候选（aka 里只有书号） |
| `prop.poset-limit-join` | 偏序集里的极限是交 | （只有书号：`Exercise 1.30`） | 偏序集里：极限 = 下确界，余极限 = 上确界 | 无候选（aka 里只有书号） |
| `prop.preserves-products-kernels` | 保积与核 ⟹ 保所有有限极限 | （只有书号：`Exercise 1.43`） | 保积 + 保核 $\implies$ 保所有有限极限 | 无候选（aka 里只有书号） |
| `prop.preserves-fibered-products-mono` | 保纤维积 ⟹ 保单态射 | （只有书号：`Exercise 1.46`） | 保拉回 $\implies$ 保单态射 | 无候选（aka 里只有书号） |
| `prop.left-adjoint-unique` | 左伴随唯一 | （只有书号：`Exercise 1.58`） | 同一个右伴随的左伴随在同构意义下唯一 | 无候选（aka 里只有书号） |
| `prop.counit-epi-iff-faithful` | 余单位与忠实性 | （只有书号：`Exercise 1.60`） | $G$ 忠实 $\iff$ 余单位是满 | 无候选（aka 里只有书号） |
| `prop.ind-reflective` | C 是 Ind(C) 的反射子范畴 | （只有书号：`Exercise 1.73` / `Exercise 1.42`） | $\mathcal{C} \hookrightarrow \operatorname{Ind}(\mathcal{C}) | 无候选（aka 里只有书号） |
| `prop.filtered-finite-colimits` | 滤过 + 有限余极限 ⟹ 所有余极限 | （只有书号：`Exercise 1.41` / `Exercise 1.44`） | 有余滤过余极限与有限余极限 $\implies$ 有所有余极限 | 无候选（aka 里只有书号） |
| `prop.constant-sheaf-preserves-limits` | 常层函子保极限 | （只有书号：`Exercise 3.49`） | 命题：常（预）层函子 $\Delta$ 保所有极限 | 无候选（aka 里只有书号） |
| `thm.equivalence-criterion` | 等价函子的判据 | （只有书号：`Theorem 1.2.4` / `Thm 1.2.4`） | 定理：$F$ 是等价 $\iff$ $F$ 全忠实且本质满 | 无候选（aka 里只有书号） |
| `prop.kan-extension-adjoint` | Kan 延拓与伴随的存在性 | （只有书号：`Proposition 1.5.10` / `Prop 1.5.10`） | 命题：$p^{-1}$ 有左伴随 $\iff$ 沿 $p$ 的 Kan 延拓都存在 | 无候选（aka 里只有书号） |
| `prop.kan-extension-exists` | 有余极限时 Kan 延拓总存在 | （只有书号：`Proposition 1.5.11` / `Prop 1.5.11`） | 命题：$\mathcal{D}$ 有余极限 $\implies$ 沿 $p$ 的左 Kan 延拓总存在 | 无候选（aka 里只有书号） |
| `thm.presheaf-limits-colimits` | 预层范畴的极限与余极限 | （只有书号：`Theorem 3.1.2` / `Thm 3.1.2`） | 定理：$\widehat{\mathcal{C}}$ 里极限余极限都存在，而且逐点算 | 无候选（aka 里只有书号） |
| `def.associated-sheaf` | 关联层 | （只有书号：`Definition 3.2.10` / `Def 3.2.10`） | 定义：$X^{\sharp} := h_{X}^{\#}$ | 无候选（aka 里只有书号） |
| `thm.induced-topos-morphism` | 任意函子诱导拓扑斯态射 | （只有书号：`Theorem 3.4.2` / `Thm 3.4.2`） | 定理：$\hat{g}_{!} \dashv \hat{g}^{-1} \dashv \hat{g}_{*}$，于是 $ | 无候选（aka 里只有书号） |
| `prop.topos-morphism-abelian-adjunction` | 拓扑斯态射在阿贝尔群上给出伴随 | （只有书号：`Exercise 7.51`） | 命题：$f^{-1} \dashv f_{*}$ 升级到 $\mathcal{T}(\mathbf{Ab})$ | 无候选（aka 里只有书号） |
| `prop.inverse-image-tensor` | 拉回与内 Hom、张量积相容 | （只有书号：`Exercise 7.52` / `Exercise 3.51`） | 命题：$f_{*}\operatorname{Hom}(f^{-1}M, N) = \operatorname{Hom} | 无候选（aka 里只有书号） |
| `prop.abelian-slice-adjunction` | 切片上的正合左伴随 | （只有书号：`Exercise 7.57`） | 命题：$j_{X!} \dashv j_{X}^{-1}$ 且 $j_{X!}$ 正合 | 无候选（aka 里只有书号） |
| `prop.slice-shriek-z` | 切片左伴随作用在 Z 上 | （只有书号：`Exercise 7.58`） | 命题：$j_{X!}\mathbb{Z} = \mathbb{Z}\cdot X$ | 无候选（aka 里只有书号） |
| `prop.cohomology-slice-identification` | 切片上的上同调就是原上同调 | （只有书号：`Exercise 7.59`） | 命题：$H^{n}\bigl(\mathbf{1}_{X}, j_{X}^{-1}M^{\bullet}\bigr) = | 无候选（aka 里只有书号） |
| `prop.internal-hom-slice-value` | 内 Hom 的取值 | （只有书号：`Exercise 7.60` / `Exercise 3.66`） | 命题：$\operatorname{Hom}_{\mathbb{Z}}(M, N)(X) = \operatorname | 无候选（aka 里只有书号） |
| `prop.slice-shriek-projection` | 切片的投影公式 | （只有书号：`Exercise 7.61`） | 命题：$j_{X!}(M \otimes j_{X}^{-1}N) = j_{X!}M \otimes N$ | 无候选（aka 里只有书号） |
| `prop.fully-faithful-injective` | 全忠实函子本质单射 | （只有书号：`Exercise 1.17`） | 命题：$F$ 全忠实 $\implies$ $F(X) \cong F(Y)$ 则 $X \cong Y$ | 无候选（aka 里只有书号） |
| `prop.preorder-as-category` | 预序集就是「Hom 至多一元」的小范畴 | （只有书号：`Exercise 1.15` / `Exercise 1.18`） | 命题：预序集 $\hookrightarrow$ 小范畴，且与其有序商等价 | 无候选（aka 里只有书号） |
| `prop.slice-fully-faithful-mono` | 单态射的切片刻画 | （只有书号：`Exercise 1.32`） | 命题：$f$ 单 $\iff$ $\mathcal{C}/Y \to \mathcal{C}/X$ 全忠实 | 无候选（aka 里只有书号） |
| `prop.projective-universal-epi` | 投射对象与满态射的截面 | （只有书号：`Exercise 1.49`） | 命题：满态射万有时，投射 $\iff$ 到它的满射都分裂 | 无候选（aka 里只有书号） |
| `prop.functor-preserves-monoid-objects` | 保有限积的函子作用于代数对象 | （只有书号：`Exercise 1.53`） | 命题：$F$ 保有限积 $\implies F$ 诱导 $\mathrm{Mon}(\mathcal{C}) \to \ | 无候选（aka 里只有书号） |
| `prop.adjunction-extends-to-diagrams` | 伴随延拓到图范畴 | （只有书号：`Exercise 1.63`） | 命题：$F \dashv G \implies F_{I} \dashv G_{I}$（逐点） | 无候选（aka 里只有书号） |
| `prop.kan-extension-fully-faithful` | 全忠实沿自身的 Kan 延拓 | （只有书号：`Exercise 1.74`） | 命题：$p$ 全忠实 $\implies p_{!}F \circ p \cong F$ | 无候选（aka 里只有书号） |
| `prop.ind-representable-iff-left-exact` | ind-可表示即左正合 | （只有书号：`Exercise 3.8`） | 命题：$T$ ind-可表示 $\iff$ $\mathcal{C}/T$ 滤过 $\iff$ $T$ 左正合 | 无候选（aka 里只有书号） |
| `prop.covering-sieves-filter` | 覆盖筛构成滤子 | （只有书号：`Exercise 3.11`） | 命题：$J(X)$ 是筛的序集上的滤子 | 无候选（aka 里只有书号） |
| `prop.site-covering-families-pretopology` | 覆盖族构成预拓扑 | （只有书号：`Exercise 3.14`） | 命题：景里所有生成覆盖筛的族构成预拓扑 | 无候选（aka 里只有书号） |
| `prop.sheafification-image` | 层化与像交换 | （只有书号：`Exercise 3.20`） | 命题：$\operatorname{im}(T^{\#} \to T'^{\#}) = \bigl(\operatorn | 无候选（aka 里只有书号） |
| `prop.sheafification-slice-colimit` | 层化是切片上的余极限 | （只有书号：`Exercise 3.26`） | 命题：$T^{\#} \cong \varinjlim_{X \in \mathcal{C}/T} X$ | 无候选（aka 里只有书号） |
| `prop.sheaf-hom-computed-in-presheaves` | 层之间的 Hom 在预层里算 | （只有书号：`Exercise 3.45`） | 命题：$\operatorname{Hom}_{\widetilde{\mathcal{C}}}(T^{\#}, F)  | 无候选（aka 里只有书号） |
| `prop.inverse-image-constant-sheaf` | 常层沿拉回不变 | （只有书号：`Exercise 3.50`） | 命题：$f^{-1}\overline{E} = \overline{E}$ | 无候选（aka 里只有书号） |
| `prop.stalk-of-sheafification` | 层化不改变茎 | （只有书号：`Exercise 3.57`） | 命题：$(T^{\#})_{x} = T_{x}$ | 无候选（aka 里只有书号） |
| `prop.set-top-ab-complete` | Set、Top、Ab 的完备性 | （只有书号：`Exercise 1.38` / `Exercise 1.45`） | 命题：$\mathbf{Set} / \mathbf{Top} / \mathbf{Ab}$ 完备且余完备 | 无候选（aka 里只有书号） |
| `prop.adjunction-composition` | 伴随的复合 | （只有书号：`Exercise 1.59`） | 命题：$F_{1} \dashv G_{1}$、$F_{2} \dashv G_{2}$ $\implies$ $F_{ | 无候选（aka 里只有书号） |
| `prop.sieve-generated-by-family` | 族生成的筛 | （只有书号：`Exercise 3.10`） | 命题：$R = \coprod_{i} \operatorname{im}(h_{f_{i}})$ | 无候选（aka 里只有书号） |
| `prop.topology-alternative-axiom` | 拓扑公理的替代形式 | （只有书号：`Exercise 3.12`） | 命题：最后一条公理可换成「放大 + 局部化」 | 无候选（aka 里只有书号） |
| `prop.constant-sheaf-adjunction` | 常层的伴随 | （只有书号：`Exercise 3.22`） | 命题：$\operatorname{Hom}(\widetilde{E}_{\mathcal{C}}, F) \cong | 无候选（aka 里只有书号） |
| `prop.constant-sheaf-top` | 拓扑空间上的常层就是离散空间的层 | （只有书号：`Exercise 3.23`） | 命题：$\widetilde{E}_{\mathbf{Top}} \cong \underline{E^{\mathrm | 无候选（aka 里只有书号） |
| `prop.topos-morphism-from-object` | 对象给出拓扑斯态射 | （只有书号：`Exercise 3.52`） | 命题：$X \in \mathcal{C}$ 给出 $\widehat{X} : \mathbf{Set} \to \w | 无候选（aka 里只有书号） |
| `prop.topos-morphism-final-map` | 终映射给出的拓扑斯态射 | （只有书号：`Exercise 3.55`） | 命题：$p : X \to \mathbf{1}$ 给出 $p_{*} = \Gamma(X, -)$、$p^{-1}E | 无候选（aka 里只有书号） |
| `prop.topos-morphism-point` | 点给出的拓扑斯态射 | （只有书号：`Exercise 3.56`） | 命题：$x : \mathbf{1} \to X$ 给出 $(x_{*}E)(U) = E$（$x \in U$）与 $ | 无候选（aka 里只有书号） |
| `prop.slice-topos` | 切片拓扑斯 | （只有书号：`Exercise 3.63` / `Exercise 3.64`） | 命题：$\widetilde{\mathcal{C}/T} \simeq \widetilde{\mathcal{C}} | 无候选（aka 里只有书号） |
| `def.crystalline-sheaf` | 晶体层 | （只有书号：`Exercise 3.67`） | 定义：所有过渡都是同构的 $\mathbf{Top}_{/X}$ 上的层 | 无候选（aka 里只有书号） |
| `prop.crystalline-sheaf-equiv` | 晶体层就是 X 上的层 | （只有书号：`Exercise 3.68` / `Exercise 3.69`） | 命题：实化 $\mathcal{F} \mapsto \mathcal{F}_{X}$ 给出等价；$\mathbf{Et | 无候选（aka 里只有书号） |
| `prop.qc-sheaf-etale` | 拟紧层与紧的 étale 空间 | （只有书号：`Exercise 3.70`） | 命题：$X$ 上的层拟紧 $\iff$ 对应 espace étalé 紧 | 无候选（aka 里只有书号） |
| `prop.free-objects-examples` | 自由对象的例子 | （只有书号：`Exercise 1.8`） | 命题：各代数范畴里的自由对象 | 无候选（aka 里只有书号） |
| `prop.functor-preserves-sections` | 函子保截面与收缩 | （只有书号：`Exercise 1.11`） | 命题：函子把截面（收缩、同构）送到同类 | 无候选（aka 里只有书号） |
| `def.mor-domain-codomain` | 态射范畴上的域与余域函子 | （只有书号：`Exercise 1.12`） | 定义：$\operatorname{Mor}(\mathcal{C}) \to \mathcal{C}$ 的两个投影 | 无候选（aka 里只有书号） |
| `prop.op-category-is-modules` | 带算子的对象就是模 | （只有书号：`Exercise 1.13`） | 命题：$\operatorname{Op}(k\text{-}\mathbf{Mod}) \simeq k[T]\tex | 无候选（aka 里只有书号） |
| `prop.forgetful-faithful-not-full` | 遗忘函子忠实但不满 | （只有书号：`Exercise 1.14`） | 命题：$\mathbf{Top} \to \mathbf{Set}$ 与 $\mathbf{Ab} \to \mathb | 无候选（aka 里只有书号） |
| `prop.nat-iso-invariants` | 自然同构不改变函子的性质 | （只有书号：`Exercise 1.16`） | 命题：$F \cong F'$ 则两者忠实/满/全忠实/本质满/等价性一致 | 无候选（aka 里只有书号） |
| `prop.matrix-category` | 矩阵范畴 | （只有书号：`Exercise 1.19`） | 命题：$\operatorname{Mat}(k)$ 是小范畴，与有限维向量空间等价 | 无候选（aka 里只有书号） |
| `prop.forgetful-representable` | 遗忘函子可表示 | （只有书号：`Exercise 1.20`） | 命题：以集合为值的常见遗忘函子都可表示 | 无候选（aka 里只有书号） |
| `prop.solution-functor-representable` | 解集函子可表示 | （只有书号：`Exercise 1.22`） | 命题：$A \mapsto \{a \in A^{n} : f_{i}(a) = 0\}$ 可表示 | 无候选（aka 里只有书号） |
| `prop.universal-unique-iso` | 万有元素唯一到唯一同构 | （只有书号：`Exercise 1.23`） | 命题：$(X,s)$ 与 $(X',s')$ 都万有 $\implies$ 唯一的 $f : X \cong X'$ 带 | 无候选（aka 里只有书号） |
| `prop.algebra-categories-limits` | 代数范畴里的极限与余极限 | （只有书号：`Exercise 1.28`） | 命题：极限逐点算，余极限由自由构造加商给出 | 无候选（aka 里只有书号） |
| `prop.cat-final-initial-products` | Cat 的终始对象与有限积 | （只有书号：`Exercise 1.31`） | 命题：$\mathbf{Cat}$ 有终对象 $\mathbf{1}$、始对象 $\mathbf{0}$ 与积范畴 | 无候选（aka 里只有书号） |
| `prop.bialgebra-examples` | 双代数的例子 | （只有书号：`Exercise 1.50`） | 命题：$k[t]$ 与 $k[t,1/t]$ 都是双代数 | 无候选（aka 里只有书号） |
| `prop.localization-functor-exact` | 允许右分式演算时局部化函子正合 | （只有书号：`Exercise 1.54`） | 命题：右分式演算 $\implies$ $Q : \mathcal{C} \to \mathrm{ho}(\mathca | 无候选（aka 里只有书号） |
| `prop.adjunction-naturality` | 伴随双射的自然性 | （只有书号：`Exercise 1.55`） | 命题：$\Phi$ 自然的显式写法 | 无候选（aka 里只有书号） |
| `prop.forgetful-adjoints-examples` | 遗忘函子的伴随 | （只有书号：`Exercise 1.56`） | 命题：自由 $\dashv$ 遗忘、层化 $\dashv$ 含入、$k$-化 $\dashv$ 含入 | 无候选（aka 里只有书号） |
| `prop.currying` | 函数的柯里化 | （只有书号：`Exercise 1.57`） | 命题：$X \mapsto X \times Y \;\dashv\; Z \mapsto \mathbf{Set}(Y | 无候选（aka 里只有书号） |
| `prop.unit-counit-examples` | 常见伴随的单位与余单位 | （只有书号：`Exercise 1.61`） | 命题：从单位/余单位读出忠实性 | 无候选（aka 里只有书号） |
| `prop.copowers-give-adjoint` | 有余幂则可表示函子有伴随 | （只有书号：`Exercise 1.62`） | 命题：$\mathcal{C}$ 有余幂 $\implies$ $X^{(I)} \dashv h_{X}$ | 无候选（aka 里只有书号） |
| `prop.forgetful-preserves-limits` | 代数遗忘函子保极限 | （只有书号：`Exercise 1.65`） | 命题：$\mathbf{Mon}, \mathbf{Gr}, \mathbf{Rng}, \ldots \to \mat | 无候选（aka 里只有书号） |
| `prop.forgetful-exactness` | 遗忘与含入函子的正合性 | （只有书号：`Exercise 1.66`） | 命题：遗忘保极限不保余极限；层化正合 | 无候选（aka 里只有书号） |
| `prop.reflection-criterion` | 反射的判据 | （只有书号：`Exercise 1.71`） | 命题：$F$ 是反射 $\iff$ 存在 $\alpha_{X} : X \to F(X)$，在 $\mathcal{C | 无候选（aka 里只有书号） |
| `prop.coreflective-monoids-full` | 余反射子范畴上的幺半群 | （只有书号：`Exercise 1.72`） | 命题：$\mathcal{C}'$ 余反射 $\implies \mathrm{Mon}(\mathcal{C}')$  | 无候选（aka 里只有书号） |
| `prop.slice-covering-sieve` | 切片里的覆盖筛 | （只有书号：`Exercise 3.62`） | 命题：$R$ 在 $\mathcal{C}/T$ 里覆盖 $\iff$ $\hat j_{T!}R$ 在 $\mathc | 无候选（aka 里只有书号） |

### 凝聚态数学 · `condensed`（84）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.cond-measure` | 整值测度 | — | 整值测度 $M(S,\mathbb{Z})$ | 无候选（aka 与 title 都没有英文） |
| `def.solid-group` | 固态阿贝尔群 | — | 固态阿贝尔群 | 无候选（aka 与 title 都没有英文） |
| `thm.csz-free` | 连续函数群是自由的 | — | 定理：$C(S,\mathbb{Z})$ 是自由阿贝尔群（Specker–Nöbeling） | 无候选（aka 与 title 都没有英文） |
| `cor.free-solid-product` | 自由固态群是大乘积 | — | 推论：$Z[S]^{\blacksquare} \cong \prod_I \mathbb{Z}$ | 无候选（aka 与 title 都没有英文） |
| `prop.solid-hypercover` | 固态化把超覆盖变成正合列 | — | 命题：超覆盖的固态化正合 | 无候选（aka 与 title 都没有英文） |
| `prop.free-solid-solid` | 自由固态群是固态的 | — | 命题：$Z[S]^{\blacksquare}$ 是固态的（作为模与复形） | 无候选（aka 与 title 都没有英文） |
| `lem.solid-completion-criterion` | 完备化判据 | — | 引理：把子范畴做成阿贝尔子范畴的抽象判据（Lemma 5.9） | 无候选（aka 没英文，title 里有） |
| `thm.solid-abelian` | 固态群构成阿贝尔子范畴 | — | 定理：$\mathbf{Solid}$ 是阿贝尔子范畴，$\prod_I\mathbb{Z}$ 是紧投射生成元 | 无候选（aka 与 title 都没有英文） |
| `thm.solid-derived` | 固态复形与导出范畴 | — | 定理：$D(\mathbf{Solid}) \subset D(\operatorname{Cond}(\mathbf{ | 无候选（aka 与 title 都没有英文） |
| `cor.solid-compact-generators` | 固态的紧投射对象 | — | 推论：紧投射对象恰为 $\prod_I\mathbb{Z}$；$D(\mathbf{Solid})^\omega \si | 无候选（aka 与 title 都没有英文） |
| `thm.solid-tensor` | 固态张量积 | — | 定理：$\mathbf{Solid}$ 上的对称幺半张量积 $\otimes^{\blacksquare}$ | 无候选（aka 与 title 都没有英文） |
| `prop.solid-product-tensor` | 大乘积的固态张量积 | — | 命题：$\prod_I\mathbb{Z} \otimes^{L\blacksquare} \prod_J\mathbb | 无候选（aka 与 title 都没有英文） |
| `ex.solid-tensor-computations` | 固态张量积的计算 | — | 例：$\mathbb{Z}_p \otimes^{L\blacksquare} \mathbb{R} = 0$ 及其它 | 无候选（aka 与 title 都没有英文） |
| `def.pre-analytic-ring` | 预解析环 | — | 预解析环 | 无候选（aka 与 title 都没有英文） |
| `def.analytic-ring` | 解析环 | — | 解析环 | 无候选（aka 与 title 都没有英文） |
| `thm.analytic-modules` | 解析环上的模 | — | 定理：$\operatorname{Mod}^{\mathrm{cond}}_{\mathcal{A}}$ 是阿贝尔范畴 | 无候选（aka 与 title 都没有英文） |
| `prop.analytic-base-change` | 解析环的 base change | — | 命题：解析环映射给出 $-\otimes_{\mathcal{A}}\mathcal{B}$（Prop 7.7） | 无候选（aka 与 title 都没有英文） |
| `prop.analytic-examples` | 解析环的例子 | — | 命题：$\mathbb{Z}_{p,\blacksquare}$ 与 $(A,\mathbb{Z})_\blacksqu | 无候选（aka 与 title 都没有英文） |
| `thm.za-analytic` | 有限生成代数的解析环 | — | 定理：$A$ 有限生成 $\mathbb{Z}$-代数 $\implies$ $A_\blacksquare$ 是解析环 | 无候选（aka 与 title 都没有英文） |
| `thm.coherent-duality` | 仿射相干对偶 | — | 定理：仿射相干对偶（Thm 8.2） | 无候选（aka 与 title 都没有英文） |
| `prop.rl1-not-analytic` | R_{ℓ¹} 不是解析环 | — | 命题：$\mathbb{R}_{\ell^1}$ 不是解析环（Ribe 扩张） | 无候选（aka 与 title 都没有英文） |
| `def.chaus-pretopos` | 紧 Hausdorff 空间构成预拓扑斯 | （只有书号：`Proposition 4.1.1` / `Corollary 4.1.2`） | $\mathbf{CHaus}$ 是预拓扑斯 | 无候选（aka 里只有书号） |
| `def.condensed-set` | 凝聚态集 | `condensed set` / `Cond` | 凝聚态集 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.condensed-criterion` | 凝聚态集的刻画 | （只有书号：`Proposition 4.1.4`） | 预层是凝聚态集的两条判据 | 无候选（aka 里只有书号） |
| `prop.fchaus-pretopology` | 有限紧 Hausdorff 空间上的预拓扑 | （只有书号：`Exercise 4.1`） | 有限不交并给出自由紧 Hausforff 空间上的预拓扑 | 无候选（aka 里只有书号） |
| `prop.fchaus-sheaf` | 有限紧 Hausdorff 空间上层的判据 | （只有书号：`Exercise 4.2`） | 自由紧 Hausforff 空间上的层 $\iff$ 保有限积 | 无候选（aka 里只有书号） |
| `thm.cond-equiv-fchaus` | 凝聚态集就是有限紧 Hausdorff 空间上的层 | （只有书号：`Theorem 4.1.7`） | $\mathrm{Cond} \simeq \widehat{\mathbf{FCHaus}}$ | 无候选（aka 里只有书号） |
| `prop.cond-epi` | 凝聚态集满态射的判据 | （只有书号：`Proposition 4.1.8`） | 凝聚态集的满态射 | 无候选（aka 里只有书号） |
| `prop.cond-projectives` | Cond 有足够多投射对象 | （只有书号：`Exercise 4.3`） | $\mathrm{Cond}$ 的投射对象 | 无候选（aka 里只有书号） |
| `thm.top-cond-adjoint` | Top 与 Cond 的伴随 | `kTop` | $\mathbf{Top} \to \mathrm{Cond}$ 与它的伴随 | 零命中（候选没出现在 title 里） |
| `thm.condab-ab` | 凝聚态阿贝尔群满足 AB6 与 AB4* | `AB4*` | 凝聚态阿贝尔群的 AB 公理 | 零命中（候选没出现在 title 里） |
| `lem.stonean-projective` | Stonean 给出有限表现投射对象 | （只有书号：`Lemma 6.1.3` / `Lemma 6.1.6`） | Stonean 空间给出有限表现的投射对象 | 无候选（aka 里只有书号） |
| `prop.condab-generated` | CondAb 由有限表现投射对象生成 | （只有书号：`Proposition 6.1.7`） | $\mathrm{CondAb}$ 的生成元 | 无候选（aka 里只有书号） |
| `prop.abtop-to-abcond` | 拓扑阿贝尔群嵌入凝聚态 | （只有书号：`Proposition 6.2.1` / `Prop 6.2.1`） | $\mathbf{AbTop} \to \mathrm{AbCond}$ 保所有极限 | 无候选（aka 里只有书号） |
| `prop.continuous-hom-condensed` | 连续同态与内部 Hom | （只有书号：`Proposition 6.2.2` / `Prop 6.2.2`） | $C_{\mathbb{Z}}(M,N) \cong \operatorname{Hom}_{\mathbb{Z}}(M | 无候选（aka 里只有书号） |
| `prop.exact-sequence-topo-ab` | 拓扑阿贝尔群正合列的搬运 | （只有书号：`Proposition 6.2.3` / `Prop 6.2.3`） | 拓扑正合列 $\implies$ 凝聚态正合列 | 无候选（aka 里只有书号） |
| `thm.qcqs-chaus-equiv` | 拟紧 与 拟紧拟分离 的判定 | `qcqs` | 紧 Hausdorff 空间 $\cong$ 拟紧拟分离 凝聚态集 | 零命中（候选没出现在 title 里） |
| `lem.qseparated-ind-inclusions` | 拟分离即含入的滤过余极限 | `Ind(CHaus)` | 拟分离 $\iff$ 紧 Hausdorff 块沿含入拼起来 | 零命中（候选没出现在 title 里） |
| `prop.cond-slice-topos-morphism` | Cond/X 到开集拓扑斯的态射 | （只有书号：`Proposition 8.1.3`） | 拓扑斯态射 $c_{X} : \mathrm{Cond}/X \rightleftarrows \mathrm{Open | 无候选（aka 里只有书号） |
| `prop.k-bounded-implies-exact` | 相邻两条 K-有界 推出 正合 | （只有书号：`Proposition 8.2.3`） | $K$-有界正合（相邻两处）$\implies$ 通常正合 | 无候选（aka 里只有书号） |
| `cor.k-acyclic-acyclic` | K-有界零调 推出 零调 | （只有书号：`Corollary 8.2.4`） | $K$-有界零调 $\implies$ 通常零调 | 无候选（aka 里只有书号） |
| `lem.stone-cech-1-bounded` | Stone 满射的 Čech 复形 1-有界零调 | （只有书号：`Lemma 8.2.5`） | Stone 满射的增广 Čech 复形是 $1$-有界零调 | 无候选（aka 里只有书号） |
| `prop.banach-stone-acyclic` | Banach 在 Stone 上零调 | （只有书号：`Proposition 8.2.6`） | Banach 阿贝尔群在 Stone 空间上零调 | 无候选（aka 里只有书号） |
| `thm.real-banach-chaus-acyclic` | 实 Banach 在紧 Hausdorff 上零调 | （只有书号：`Theorem 8.2.8`） | 实 Banach 空间在紧 Hausdorff 空间上零调 | 无候选（aka 里只有书号） |
| `lem.ext-stonean-section` | Stonean 上 Ext 的截面公式 | （只有书号：`Lemma 8.3.1`） | $\operatorname{Ext}^{n}(M, N)(S) \cong \operatorname{Ext}^{n | 无候选（aka 里只有书号） |
| `prop.breen-deligne-ss-stonean` | Stonean 上 Breen–Deligne 的谱序列 | （只有书号：`Proposition 8.3.4`） | $E^{p,q}_{1} = \bigoplus_{i} H^{q}(M^{s_{p,i}} \times S,\ N) | 无候选（aka 里只有书号） |
| `prop.rhom-banach-discrete-zero` | 有限维 Banach 到离散群全零 | （只有书号：`Proposition 8.3.5`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N) = 0$（Banach 到 离散） | 无候选（aka 里只有书号） |
| `prop.rhom-chaus-banach-zero` | 紧 Haus 到实 Banach 全零 | （只有书号：`Proposition 8.3.6`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N) = 0$（紧 Haus 到 Banach | 无候选（aka 里只有书号） |
| `prop.rhom-dual-tensor` | 离散对偶的导出 Hom 与导出张量 | （只有书号：`Proposition 8.3.7`） | $\operatorname{RHom}(\operatorname{RHom}(M, T), N) \cong M \ | 无候选（aka 里只有书号） |
| `prop.dual-rhom-characterization` | Pontryagin 对偶的导出 Hom 刻画 | （只有书号：`Proposition 8.3.8`） | $M^{\vee} \cong \operatorname{RHom}_{\mathbb{Z}}(M, T)$ | 无候选（aka 里只有书号） |
| `thm.lc-ext-vanishing` | 局部紧阿贝尔群高次 Ext 消失 | （只有书号：`Theorem 8.3.9`） | $\operatorname{Ext}^{n}_{\mathbb{Z}}(M, N) = 0$（$n \ne 0, 1$ | 无候选（aka 里只有书号） |
| `table.rhom-zrt` | Z、R、T 的导出 Hom 计算表 | （只有书号：`Exercise 8.17`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N)$ 在 $\mathbb{Z}, \mat | 无候选（aka 里只有书号） |
| `ex.finite-banach-rhom` | 有限维 Banach 空间之间的导出 Hom | （只有书号：`Exercise 8.15`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N) = \operatorname{Hom} | 无候选（aka 里只有书号） |
| `ex.chaus-banach-rhom` | 紧空间对实 Banach 空间的导出 Hom | （只有书号：`Exercise 8.12`） | $\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z} \cdot S,\ N) \c | 无候选（aka 里只有书号） |
| `ex.bd-ss` | Breen–Deligne 的一般谱序列 | （只有书号：`Exercise 8.14`） | $E^{p,q}_{1} = \bigoplus_{i} H^{q}(M^{s_{p,i}},\ N) \implies | 无候选（aka 里只有书号） |
| `ex.connected-lc-ext` | 连通局部紧到离散只剩 Ext一次 | （只有书号：`Exercise 8.18`） | $\operatorname{Ext}^{n}_{\mathbb{Z}}(M, N) = 0$（$n \ne 1$，$M | 无候选（aka 里只有书号） |
| `ex.nonlc-rhom` | 非局部紧情形的导出 Hom | （只有书号：`Exercise 8.19`） | $\operatorname{RHom}_{\mathbb{Z}}(\mathbb{R}^{I}, \mathbb{Z} | 无候选（aka 里只有书号） |
| `thm.lc-structure` | 局部紧阿贝尔群结构定理 | `V⊕K` | 局部紧 Hausdorff 阿贝尔群的结构：$V \oplus K$ | 零命中（候选没出现在 title 里） |
| `prop.pontryagin-discrete-compact-duality` | 离散 与 紧 Hausdorff | （只有书号：`Exercise 6.9`） | Pontryagin 对偶把离散与紧互换 | 无候选（aka 里只有书号） |
| `prop.cond-limits-colimits` | Cond 的极限与余极限 | （只有书号：`Corollary 4.1.6`） | $\mathrm{Cond}$ 的极限逐点算，余极限要先层化 | 无候选（aka 里只有书号） |
| `prop.cond-equivalence-effective` | Cond 的等价关系有效 | `effective equivalence relation` / `Giraud` | $\mathrm{Cond}$ 中每个等价关系都是有效的 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.abhaus-strict-exact` | Hausdorff 拓扑阿贝尔群的核与余核 | （只有书号：`Exercise 5.5`） | 命题：$\mathbf{AbHaus}$ 中的核、余核与严格正合列 | 无候选（aka 里只有书号） |
| `lem.cech-finite-disjoint-acyclic` | 有限不交覆盖的 Čech 零调 | （只有书号：`Exercise 8.1`） | 引理：紧 Hausdorff 空间上有限不交覆盖的 Čech 高次为零 | 无候选（aka 里只有书号） |
| `prop.condab-discrete-acyclic` | 离散空间上零调 | （只有书号：`Exercise 8.2`） | 命题：凝聚态阿贝尔群在离散空间与「离散 $\times$ Stonean」上零调 | 无候选（aka 里只有书号） |
| `prop.condab-quotient-r-disc` | R/R_disc 在 Stone 上的截面 | （只有书号：`Exercise 8.3`） | 命题：$Q = \mathbb{R}/\mathbb{R}^{\mathrm{disc}}$ 的截面是连续函数模局部常值 | 无候选（aka 里只有书号） |
| `cor.ext-cond-set-section` | Ext 的截面公式 | （只有书号：`Exercise 8.8`） | 推论：$\operatorname{Ext}^{n}(\mathbb{Z}\cdot X, N)(S) \cong H^ | 无候选（aka 里只有书号） |
| `prop.rhom-zs-sections` | Stonean 空间上自由模的导出 Hom | （只有书号：`Exercise 8.9`） | 命题：$\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z}[S], N) \cong | 无候选（aka 里只有书号） |
| `prop.rhom-ze-powers` | 离散空间上自由模的导出 Hom | （只有书号：`Exercise 8.10`） | 命题：$\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z}[E], N) \cong | 无候选（aka 里只有书号） |
| `prop.discrete-cond-rhom-constant` | 离散群的导出 Hom 是常层 | （只有书号：`Exercise 8.11`） | 命题：离散阿贝尔群的导出 Hom 与导出张量积都落在常层里 | 无候选（aka 里只有书号） |
| `prop.k-bounded-exact-filtered-colimit` | K-有界正合沿滤过余极限保持 | （只有书号：`Exercise 8.4`） | 命题：等距转移下的滤过余极限保持 $K$-有界正合 | 无候选（aka 里只有书号） |
| `prop.continuous-functions-normed` | 连续函数空间的范数 | （只有书号：`Exercise 8.5`） | 命题：$C(S, M)$ 是（半）范数 / Banach 阿贝尔群，且 Stone 上离散值函数稠密 | 无候选（aka 里只有书号） |
| `prop.chaus-two-term-resolution` | 紧阿贝尔群的两项消解 | （只有书号：`Exercise 6.10`） | 命题：紧 Hausdorff 阿贝尔群有两项连通消解 | 无候选（aka 里只有书号） |
| `cor.cond-ktop-finite-products` | 底空间保有限积 | （只有书号：`Corollary 4.2.7` / `Cor 4.2.7`） | 推论：$(X \times Y)(\cdot) \;\cong\; k\bigl(X(\cdot) \times Y(\ | 无候选（aka 里只有书号） |
| `prop.projection-formula-cond` | 投影公式 | （只有书号：`Exercise 4.11`） | 投影公式：$S \times X(\cdot) \cong (S \times X)(\cdot)$ | 无候选（aka 里只有书号） |
| `prop.cond-epi-open-surjective` | 开满射是满态射 | （只有书号：`Proposition 4.2.5` / `Prop 4.2.5`） | 命题：开满 + 弱 Hausdorff $\implies$ 在 $\mathrm{Cond}$ 里满 | 无候选（aka 里只有书号） |
| `prop.open-covering-covering` | 开覆盖给出覆盖 | （只有书号：`Exercise 4.6`） | 命题：开覆盖 $X = \bigsqcup_{i} X_{i}$ $\implies$ 它是覆盖 | 无候选（aka 里只有书号） |
| `prop.hom-presheaf-sheaf` | Hom 预层是层 | （只有书号：`Exercise 4.7`） | 命题：$U \mapsto \operatorname{Hom}_{/X}(U, Y)$ 是 $X$ 上的层 | 无候选（aka 里只有书号） |
| `prop.countable-colimit-qseparated` | 可数递增余极限是拟分离的 | （只有书号：`Exercise 4.12`） | 命题：$X = \varinjlim_{n} S_{n}$（含入、可数）$\implies$ 拟分离 | 无候选（aka 里只有书号） |
| `prop.qseparated-mono` | 拟分离嵌入底空间 | （只有书号：`Exercise 4.13`） | 命题：$X$ 拟分离 $\implies$ $X \hookrightarrow X(\cdot)$ 是单态射 | 无候选（aka 里只有书号） |
| `prop.pontryagin-finite-dim-banach` | 有限维 Banach 空间的对偶是向量空间对偶 | （只有书号：`Exercise 6.8`） | 命题：$V$ 有限维实 Banach $\implies \widehat{V} \cong V^{\ast}$ | 无候选（aka 里只有书号） |
| `prop.discrete-iff-constant` | 离散即常 | （只有书号：`Exercise 4.5`） | 命题：$X$ 离散 $\iff$ 常 $\iff$ 只依赖紧 Hausdorff 的离散商 | 无候选（aka 里只有书号） |
| `prop.underlying-preserves-coproduct` | 底函子保不交并 | （只有书号：`Exercise 4.8`） | 命题：$X = \coprod_{i} X_{i}$ $\implies$ $\underline{X} = \copr | 无候选（aka 里只有书号） |
| `prop.discrete-functor-coproduct` | 离散函子保直和 | （只有书号：`Exercise 6.3`） | 命题：$\bigl(\bigoplus_{i} M_{i}\bigr)^{\mathrm{disc}} \cong \b | 无候选（aka 里只有书号） |
| `prop.cond-quotient-topological` | 商群在凝聚态意义下一致 | （只有书号：`Exercise 6.5`） | 命题：$\underline{M/N} \cong \underline{M}/\underline{N}$（$N$ 闭 | 无候选（aka 里只有书号） |

### 解析空间 · `analytic`（15）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.discrete-huber-pair` | 离散 Huber pair | — | 离散 Huber pair | 无候选（aka 与 title 都没有英文） |
| `def.adic-spectrum` | adic 谱 Spa | — | adic 谱 $\operatorname{Spa}(A,A^+)$ | 无候选（aka 与 title 都没有英文） |
| `prop.huber-subring-recovery` | A⁺ 由谱决定 | — | 命题：整闭子环与谱的开闭子集一一对应（Prop 9.2） | 无候选（aka 与 title 都没有英文） |
| `prop.rational-localization` | 有理开集上的局部化 | — | 命题：有理开集对应局部化（Prop 9.3） | 无候选（aka 与 title 都没有英文） |
| `thm.adic-structure-sheaf` | adic 结构层是层 | — | 定理：$\mathcal{O}_X$ 与 $\mathcal{O}_X^+$ 是层（Prop 9.4） | 无候选（aka 与 title 都没有英文） |
| `def.discrete-adic-space` | 离散 adic 空间 | — | 离散 adic 空间 | 无候选（aka 与 title 都没有英文） |
| `prop.scheme-embeds-adic` | 概形嵌入 adic 空间 | — | 命题：分离/固有性对应开浸入/同构（Prop 9.6） | 无候选（aka 与 title 都没有英文） |
| `thm.adic-gluing` | 导出范畴按无穷范畴粘合 | — | 定理：$U \mapsto D((\mathcal{O}_X(U),\mathcal{O}_X^+(U))_\black | 无候选（aka 与 title 都没有英文） |
| `def.six-functors` | 6-函子形式 | — | 6-函子形式 | 无候选（aka 与 title 都没有英文） |
| `prop.open-immersion-shriek` | 开浸入的 j_! | — | 命题：开浸入 $j$ 的 $j_!$ 存在（Prop 11.2） | 无候选（aka 与 title 都没有英文） |
| `def.f-shriek` | 紧支撑推前 f_! | — | 紧支撑推前 $f_!$ 与 $f^!$（Def 11.3） | 无候选（aka 与 title 都没有英文） |
| `prop.f-shriek-base-change` | 对偶函子的扭转与基变换 | — | 命题：$f^!$ 是 $f^*$ 的扭转，且平坦基变换（Prop 11.4） | 无候选（aka 与 title 都没有英文） |
| `prop.regular-immersion-dualizing` | 正则闭浸入的对偶复形 | — | 命题：正则闭浸入 $f^!R \cong \det(I/I^2)^*[-c]$（Prop 11.5） | 无候选（aka 与 title 都没有英文） |
| `thm.smooth-duality` | 光滑映射的对偶复形 | — | 定理：光滑 $f$ 的 $f^!R \cong \det(\Omega^1_{A/R})[d]$（Thm 11.6） | 无候选（aka 与 title 都没有英文） |
| `thm.poincare-solid` | 固态 Serre 对偶 | — | 定理：光滑映射的紧支撑推前与对偶（Thm 11.1） | 无候选（aka 与 title 都没有英文） |

### 同调代数 · `homology`（170）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.tensor-module` | 模的张量积 | — | 模的张量积 $M \otimes_{R} N$ | 无候选（aka 与 title 都没有英文） |
| `prop.tensor-functor-properties` | 张量积的函子性质 | — | 张量积的双函子性、与直和交换、结合、对称与单位 | 无候选（aka 与 title 都没有英文） |
| `thm.hom-tensor-adjunction-mod` | 张量与内同态的伴随 | — | $\operatorname{Hom}(M \otimes_{R} N, P) \cong \operatorname{ | 无候选（aka 与 title 都没有英文） |
| `def.scalar-restriction` | 标量限制 | — | 标量限制 $f_{\ast} : S\text{-}\mathbf{Mod} \to R\text{-}\mathbf{ | 无候选（aka 与 title 都没有英文） |
| `def.scalar-extension` | 标量扩张 | — | 标量扩张 $S \otimes_{R} -$ | 无候选（aka 与 title 都没有英文） |
| `prop.scalar-extension-adjunction` | 标量扩张与限制互为伴随 | — | $S \otimes_{R} - \dashv f_{\ast}$ | 无候选（aka 与 title 都没有英文） |
| `prop.scalar-extension-coproduct` | 纤维余积与基变换 | — | $S \otimes_{R} T$ 是代数的推出，且与基变换相容 | 无候选（aka 与 title 都没有英文） |
| `prop.tensor-right-exact` | 张量函子右正合 | — | $(-) \otimes_{R} N$ 右正合，左正合当且仅当 $N$ 平坦 | 无候选（aka 与 title 都没有英文） |
| `prop.flat-equivalences` | 平坦的等价说法 | — | 平坦的五条等价刻画 | 无候选（aka 与 title 都没有英文） |
| `prop.free-flat` | 自由模平坦 | — | 自由模与投射模都是平坦的 | 无候选（aka 与 title 都没有英文） |
| `prop.flat-summand` | 平坦的直和项 | — | 平坦模的直和项平坦，直和平坦当且仅当每个平坦 | 无候选（aka 与 title 都没有英文） |
| `prop.flat-domain-torsionfree` | 平坦模无挠 | — | 整环上平坦蕴含无挠；主理想整环上二者等价 | 无候选（aka 与 title 都没有英文） |
| `thm.lambek` | 只需有限生成理想 | — | Lambek 判据（平坦性只需对有限生成理想检验） | 无候选（aka 与 title 都没有英文） |
| `ex.flat-not-projective` | 平坦但不投射 | — | 例子：$\mathbb{Q}$ 是平坦但不投射的 $\mathbb{Z}$-模 | 无候选（aka 与 title 都没有英文） |
| `def.injective-module` | 内射模 | — | 内射模与延拓性质 | 无候选（aka 与 title 都没有英文） |
| `prop.injective-splitting` | 内射的单射可裂 | — | $I$ 内射当且仅当每个单射 $I \rightarrowtail M$ 可裂 | 无候选（aka 与 title 都没有英文） |
| `thm.baer-criterion` | 内射的理想判据 | — | Baer 判据（只需对理想检验提升） | 无候选（aka 与 title 都没有英文） |
| `def.divisible-group` | 可除群 | — | 可除群（可除 $\mathbb{Z}$-模） | 无候选（aka 与 title 都没有英文） |
| `thm.pid-injective-divisible` | 内射等价于可除 | — | 主理想整环上，内射当且仅当可除 | 无候选（aka 与 title 都没有英文） |
| `prop.divisible-quotient` | 可除群的商 | — | 可除群的商仍可除 | 无候选（aka 与 title 都没有英文） |
| `ex.divisible-groups` | 可除群的例子 | — | 例子：$\mathbb{Q}$、$\mathbb{Q}/\mathbb{Z}$ 与 Prüfer 群 | 无候选（aka 与 title 都没有英文） |
| `thm.mod-enough-injectives` | 足够多内射对象 | — | $R\text{-}\mathbf{Mod}$ 有足够多的内射对象 | 无候选（aka 与 title 都没有英文） |
| `thm.mod-enough-projectives` | 足够多投射对象 | — | $R\text{-}\mathbf{Mod}$ 有足够多的投射对象 | 无候选（aka 与 title 都没有英文） |
| `thm.comparison-theorem` | 比较定理 | — | 比较定理：两条投射消解之间的提升存在且同伦唯一 | 无候选（aka 与 title 都没有英文） |
| `prop.resolution-homotopy` | 消解的同伦唯一性 | — | 同一模的任意两条投射消解彼此同伦等价 | 无候选（aka 与 title 都没有英文） |
| `def.deleted-resolution` | 删除消解 | — | 删除消解：去掉增广之后剩下的复形 | 无候选（aka 与 title 都没有英文） |
| `lem.horseshoe` | 马蹄引理 | — | 马蹄引理：短正合列两端有投射消解则中间也有 | 无候选（aka 与 title 都没有英文） |
| `def.syzygy` | 合冲 | — | 合冲与高阶合冲 | 无候选（aka 与 title 都没有英文） |
| `lem.schanuel` | 合冲比较引理 | — | 合冲比较引理：两条短正合列的首项与核彼此互补 | 无候选（aka 与 title 都没有英文） |
| `prop.syzygy-stability` | 合冲的稳定性 | — | 合冲在相差投射直和项的意义下与消解无关 | 无候选（aka 与 title 都没有英文） |
| `def.projective-dimension` | 投射维数 | — | 投射维数：最短投射消解的长度 | 无候选（aka 与 title 都没有英文） |
| `def.injective-dimension` | 内射维数 | — | 内射维数：最短内射消解的长度 | 无候选（aka 与 title 都没有英文） |
| `def.global-dimension` | 整体维数 | — | 环的整体维数 | 无候选（aka 与 title 都没有英文） |
| `prop.pd-vanishing` | 投射维数与消失 | — | 投射维数与扩展群的消失刻画 | 无候选（aka 与 title 都没有英文） |
| `cor.gldim-pid` | 主理想整环的整体维数 | — | 主理想整环上每个模的投射维数不超过一 | 无候选（aka 与 title 都没有英文） |
| `prop.dimension-shift` | 维数转移 | — | 维数转移：扩展群与挠积都可以往低一次挪 | 无候选（aka 与 title 都没有英文） |
| `thm.ext-balanced` | 扩展群的双边算法 | — | 扩展群可以用任意一侧的消解计算 | 无候选（aka 与 title 都没有英文） |
| `thm.ext1-extensions` | 一阶扩展的分类 | — | 一阶扩展群与模扩张的等价类一一对应 | 无候选（aka 与 title 都没有英文） |
| `def.flat-module` | 平坦模 | — | 平坦模：与它作张量仍保持正合 | 无候选（aka 与 title 都没有英文） |
| `def.tor` | 挠积 | — | 挠积：张量函子的左导出函子 | 无候选（aka 与 title 都没有英文） |
| `prop.tor-symmetry` | 挠积的对称性 | — | 交换环上挠积对两个变量对称 | 无候选（aka 与 title 都没有英文） |
| `prop.tor-flat-vanishing` | 平坦与挠积消失 | — | 平坦当且仅当所有高次挠积为零 | 无候选（aka 与 title 都没有英文） |
| `thm.tor-torsion` | 挠积给出挠元 | — | 一阶挠积算出阿贝尔群的挠子群 | 无候选（aka 与 title 都没有英文） |
| `thm.lazard` | 平坦模的结构定理 | — | 平坦模是有限生成自由模的滤过余极限 | 无候选（aka 与 title 都没有英文） |
| `thm.watts` | 张量函子的刻画 | — | 保直和的右正合函子都同构于张量函子 | 无候选（aka 与 title 都没有英文） |
| `thm.universal-coefficients` | 万有系数定理 | — | 万有系数定理：系数扩张之后的同调 | 无候选（aka 与 title 都没有英文） |
| `prop.mitchell-exactness` | 嵌入定理的细化 | — | 嵌入定理的细化：正合，且反射投射与内射 | 无候选（aka 与 title 都没有英文） |
| `def.group-ring` | 群环 | — | 群环 $R[G]$ | 无候选（aka 与 title 都没有英文） |
| `def.g-module` | 群模 | — | $G$-模（$R[G]$-模） | 无候选（aka 与 title 都没有英文） |
| `def.invariant-functor` | 不变量函子 | — | 不变量函子 $(-)^{G}$ | 无候选（aka 与 title 都没有英文） |
| `def.group-cohomology` | 群上同调 | — | 群上同调 $H^{n}(G, M)$ | 无候选（aka 没英文，title 里有） |
| `def.bar-resolution` | 标准消解 | — | 标准（bar）消解 | 无候选（aka 与 title 都没有英文） |
| `prop.group-cohom-compute` | 用标准消解计算群上同调 | — | 用标准消解计算：$H^{n}(G, M) = H^{n}\bigl(C^{\bullet}(G, M)\bigr)$ | 无候选（aka 没英文，title 里有） |
| `thm.h1-crossed` | 一维上同调与交叉同态 | — | $H^{1}(G, M)$ 是交叉同态模主交叉同态 | 无候选（aka 没英文，title 里有） |
| `def.semidirect-product` | 半直积 | — | 半直积 $M \rtimes_{\varphi} G$ | 无候选（aka 与 title 都没有英文） |
| `def.group-extension` | 群扩张 | — | 群扩张 $1 \to A \to E \to G \to 1$ | 无候选（aka 与 title 都没有英文） |
| `def.cocycle-2` | 二维上圈与上边界 | — | $2$-上圈与 $2$-上边界 | 无候选（aka 与 title 都没有英文） |
| `thm.h2-group-extensions` | 二维上同调分类群扩张 | — | $H^{2}(G, A)$ 与群扩张的等价类一一对应 | 无候选（aka 没英文，title 里有） |
| `thm.h1-semidirect` | 一维上同调与分裂扩张 | — | $H^{1}(G, A)$ 与半直积式的分裂结构 | 无候选（aka 没英文，title 里有） |
| `prop.low-degree-exact` | 低次正合列 | — | 低次的那几项正合列 | 无候选（aka 与 title 都没有英文） |
| `def.skyscraper-sheaf` | 天际线层 | — | 天际线层 $i_{x,*}A$ | 无候选（aka 与 title 都没有英文） |
| `prop.skyscraper-stalks` | 天际线层的茎 | — | 天际线层在各点的茎 | 无候选（aka 与 title 都没有英文） |
| `prop.skyscraper-injective` | 天际线层是内射层 | — | 系数内射则天际线层内射 | 无候选（aka 与 title 都没有英文） |
| `thm.pushforward-enough-injectives` | 足够多内射层 | — | 阿贝尔层范畴有足够多内射对象 | 无候选（aka 与 title 都没有英文） |
| `thm.paracompact-cech-equals-sheaf` | 仿紧空间上的 Čech 就是上同调 | — | 仿紧 Hausdorff：Čech 上同调等于层上同调 | 无候选（aka 与 title 都没有英文） |
| `def.exact-couple` | 正合偶 | — | 正合偶 | 无候选（aka 与 title 都没有英文） |
| `thm.exact-couple-spectral` | 正合偶给出谱序列 | — | 正合偶给出谱序列 | 无候选（aka 与 title 都没有英文） |
| `prop.filtered-complex-exact-couple` | 过滤复形给出正合偶 | — | 过滤复形给出正合偶，从而给出谱序列 | 无候选（aka 与 title 都没有英文） |
| `def.etale-space` | étale 空间 | — | étale 空间（espace étalé） | 无候选（aka 没英文，title 里有） |
| `def.etale-sheaf` | étale 层 | — | $X_{\text{et}}$ 上的 étale 层 | 无候选（aka 与 title 都没有英文） |
| `prop.etale-sheaf-examples` | étale 层的例子 | — | 开浸入、有限 étale 覆叠、常值层 | 无候选（aka 与 title 都没有英文） |
| `def.ab-axioms` | Grothendieck 的 AB 公理 | （只有书号：`Definition 5.2.5`） | Grothendieck 的 AB 公理（AB1–AB6） | 无候选（aka 里只有书号） |
| `def.cochain-complex` | 上链复形 | `complex` / `cochain complex` | 复形 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.complex-additive` | 复形范畴是加法范畴 | （只有书号：`Exercise 7.1` / `Exercise 7.7`） | 复形范畴的性质 | 无候选（aka 里只有书号） |
| `def.homotopy` | 同伦 | `homotopy` / `null-homotopic` | 同伦 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.mapping-cone` | 映射锥 | `mapping cone` / `shift` | 映射锥与位移 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.distinguished-triangle` | 导出三角 | `distinguished triangle` / `triangle` | 导出三角 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.triangle-morphism` | 三角态射的性质 | （只有书号：`Proposition 7.1.9` / `Prop 7.1.9`） | 导出三角之间态射的性质 | 无候选（aka 里只有书号） |
| `def.cohomology` | 同调 | `cohomology` / `homology` / `H^n` | 同调 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.cohomology-exact-sequence` | 同调的短正合列 | — | 把同调夹在两个余核 / 核之间 | 无候选（aka 与 title 都没有英文） |
| `thm.long-exact` | 长正合列 | `long exact sequence` / `snake lemma` | 短正合列给出长正合列（蛇引理） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.quasi-iso` | 拟同构 | `quasi-isomorphism` / `quasi-iso` / `acyclic` | 拟同构与零调复形 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `def.filtration` | 过滤 | `filtration` / `graded pieces` | 过滤 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.presheaf-valued` | 取值一般的预层与层 | `sheaf with values` / `presheaf with values` | 取值在一般范畴里的层 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.abelian-sheaf` | 阿贝尔层 | `abelian sheaf` / `sheaf of abelian groups` / `Ab(C)` | 阿贝尔层 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.tensor-abelian-sheaf` | 阿贝尔层的张量积 | `closed symmetric monoidal` / `Tensor` / `internal hom` | 张量积与封闭幺半结构 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `thm.freyd-mitchell` | Freyd–Mitchell 嵌入定理 | `Freyd-Mitchell` / `Freyd` / `Mitchell` | Freyd–Mitchell 嵌入定理 | 多命中：`Freyd` / `Mitchell` |
| `thm.snake-lemma` | 蛇引理 | `snake lemma` / `diagram chasing` | 蛇引理 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.split-exact` | 分裂短正合列 | `split exact` / `split lemma` | 分裂的短正合列 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.enough-projectives` | 足够多投射对象 | `enough projectives` / `enough injectives` | 足够多投射对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.projective-coproduct` | 投射对象的余积投射 | （只有书号：`Exercise 1.48`） | 投射对象的余积还是投射的 | 无候选（aka 里只有书号） |
| `prop.ab-limits-forgetful` | Ab(C) 的极限 | （只有书号：`Exercise 1.52`） | $\mathrm{Ab}(\mathcal{C})$ 有所有极限 | 无候选（aka 里只有书号） |
| `prop.ab6` | AB6：滤过余极限与积交换 | `AB6` | $\mathbf{Ab}$ 满足 AB6 | 零命中（候选没出现在 title 里） |
| `prop.k-calculus-fractions` | K(A) 允许分式演算 | （只有书号：`Proposition 7.2.1` / `Prop 7.2.1`） | $K(\mathcal{A})$ 关于拟同构允许左右分式演算 | 无候选（aka 里只有书号） |
| `prop.exact-to-triangle` | 正合列给出导出三角 | （只有书号：`Proposition 7.2.4` / `Prop 7.2.4`） | 复形的短正合列 $\implies$ 导出三角 | 无候选（aka 里只有书号） |
| `prop.hom-k-eq-hom-d` | Hom 在同伦范畴与导出范畴里一样 | （只有书号：`Proposition 7.2.5` / `Prop 7.2.5`） | $\operatorname{Hom}_{K}(K^{\bullet}, I^{\bullet}) = \operato | 无候选（aka 里只有书号） |
| `thm.k-plus-injectives` | 内射复形就是导出范畴 | （只有书号：`Theorem 7.2.6` / `Thm 7.2.6`） | $K^{+}(\mathcal{I}) \simeq D^{+}(\mathcal{A})$ | 无候选（aka 里只有书号） |
| `thm.derived-long-exact` | 导出函子的长正合列 | （只有书号：`Theorem 7.2.8` / `Thm 7.2.8`） | 短正合列 $\implies$ 右导出函子的长正合列 | 无候选（aka 里只有书号） |
| `prop.ext-is-rhom` | Ext 就是导出 Hom | （只有书号：`Proposition 7.2.10` / `Prop 7.2.10`） | $R^{n}\operatorname{Hom}(M, K^{\bullet}) = \operatorname{Ext | 无候选（aka 里只有书号） |
| `prop.leray-acyclicity` | Leray 零调性 | （只有书号：`Proposition 7.2.12` / `Prop 7.2.12`） | Leray 零调性：零调复形算导出函子 | 无候选（aka 里只有书号） |
| `thm.filtered-complex-spectral` | 过滤复形给出谱序列 | （只有书号：`Theorem 7.2.16` / `Thm 7.2.16`） | 下有界过滤复形 $\implies$ 谱序列 | 无候选（aka 里只有书号） |
| `cor.grothendieck-spectral` | Grothendieck 谱序列 | （只有书号：`Corollary 7.2.13` / `Cor 7.2.13`） | Grothendieck 谱序列 | 无候选（aka 里只有书号） |
| `prop.cech-as-colim` | Čech 上同调是沿覆盖筛的余极限 | （只有书号：`Exercise 7.46` / `Proposition 7.3.4`） | $\check{H}^{n}(X, M) = \varinjlim_{R \in J(X)} H^{n}(R, M)$ | 无候选（aka 里只有书号） |
| `prop.acyclic-iff-cech` | 无环 ⟺ Čech 上同调为零 | （只有书号：`Proposition 7.3.10` / `Prop 7.3.10`） | $M$ 无环 $\iff \check{H}^{n}(M) = 0$（$n \ne 0$） | 无候选（aka 里只有书号） |
| `prop.chaus-cech-eq-h` | 紧 Hausdorff 上 Čech 就是上同调 | （只有书号：`Proposition 7.3.11` / `Prop 7.3.11`） | 紧 Hausdorff：$\check{H}^{n}(X, M) = H^{n}(X, M)$ | 无候选（aka 里只有书号） |
| `prop.filtered-limit-cohomology` | 滤过极限的上同调 | （只有书号：`Proposition 7.3.12` / `Prop 7.3.12`） | 紧 Hausdorff 的滤过极限上，常值系数的上同调是余极限 | 无候选（aka 里只有书号） |
| `prop.stone-acyclic` | Stone 空间上的上同调为零 | （只有书号：`Exercise 7.50`） | Stone 空间：$H^{n}(S, M) = 0$（$n \ne 0$） | 无候选（aka 里只有书号） |
| `prop.topos-morphism-derived` | 拓扑斯态射的导出函子 | （只有书号：`Proposition 7.4.1` / `Prop 7.4.1`） | $R^{n}f_{*}M$ 是 $X' \mapsto H^{n}(f^{-1}(X'), M)$ 的层化 | 无候选（aka 里只有书号） |
| `cor.homotopy-invariant-cohomology` | 层上同调是同伦不变量 | （只有书号：`Proposition 7.4.2` / `Corollary 7.4.3`） | 同伦等价的映射给同构的上同调 | 无候选（aka 里只有书号） |
| `prop.ab5-implications` | AB5 与 AB3*/AB4* 的关系 | （只有书号：`Proposition 5.2.7`） | AB 公理之间的蕴含关系 | 无候选（aka 里只有书号） |
| `prop.ab-axioms-examples` | AB 公理的例子表 | — | 哪些范畴满足哪些 AB 公理 | 无候选（aka 与 title 都没有英文） |
| `method.simplicial-cohomology` | 单纯方法算层上同调 | `hypercover` / `Godement` | 用单纯超覆盖计算 $H^{n}(X, M)$ | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.kernel-cokernel` | 核与余核 | `kernel` / `cokernel` | 核 / 余核与左正合、右正合列 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.zero-object-final-criterion` | 零对象与终对象 | （只有书号：`Exercise 5.1`） | 命题：预加性范畴里零对象 $\iff$ 终对象 $\iff$ 始对象 | 无候选（aka 里只有书号） |
| `prop.biproduct-is-product` | 直和就是积 | （只有书号：`Exercise 5.1`） | 命题：预加性范畴里直和 $\iff$ 积 $\iff$ 余积 | 无候选（aka 里只有书号） |
| `prop.hom-enrichment-unique` | 预加性结构唯一 | （只有书号：`Exercise 5.2`） | 命题：加法范畴里 $\operatorname{Hom}$ 的阿贝尔群结构唯一 | 无候选（aka 里只有书号） |
| `prop.additive-iff-preserves-biproduct` | 加法函子的刻画 | （只有书号：`Exercise 5.3`） | 命题：$F$ 加法 $\iff$ 保零对象与直和 $\iff$ 保有限积 | 无候选（aka 里只有书号） |
| `prop.adjoint-additive` | 伴随函子都加法 | （只有书号：`Exercise 5.4`） | 命题：加法范畴之间的伴随函子都是加法函子 | 无候选（aka 里只有书号） |
| `prop.exact-sequence-subcategory` | 正合列构成子范畴 | （只有书号：`Exercise 5.6`） | 命题：左 / 右 / 短正合列构成加法子范畴 | 无候选（aka 里只有书号） |
| `prop.cech-section-vanishing` | 带截面的覆盖上 Čech 零调 | （只有书号：`Proposition 7.3.3` / `Prop 7.3.3`） | 命题：满射有截面时增广 Čech 复形同伦平凡 | 无候选（aka 里只有书号） |
| `prop.cohomology-of-coproduct` | 上同调与不交并 | （只有书号：`Exercise 7.38`） | 命题：$H^{n}(\coprod_{i} X_{i}, M) \cong \prod_{i} H^{n}(X_{i}, | 无候选（aka 里只有书号） |
| `prop.tensor-rhom-natural-map` | 张量与导出 Hom 的配对 | （只有书号：`Exercise 8.16`） | 命题：$M \otimes^{\mathbf{L}} \operatorname{RHom}(P, N) \to \op | 无候选（aka 里只有书号） |
| `prop.simplicial-to-chain` | 单纯对象给出链复形 | （只有书号：`Exercise 7.2`） | 命题：单纯对象的交替和给出微分 | 无候选（aka 里只有书号） |
| `prop.category-into-complexes` | 范畴嵌入复形 | （只有书号：`Exercise 7.3`） | 命题：$M \mapsto [M]$ 把范畴全忠实地嵌进复形范畴 | 无候选（aka 里只有书号） |
| `prop.homotopy-equivalence-criterion` | 同伦等价的判据 | （只有书号：`Exercise 7.6`） | 命题：$f$ 是同伦等价 $\iff$ 存在同伦逆 | 无候选（aka 里只有书号） |
| `prop.additive-functor-preserves-triangles` | 加法函子保导出三角 | （只有书号：`Exercise 7.9`） | 命题：加法函子把导出三角送到导出三角 | 无候选（aka 里只有书号） |
| `prop.complexes-abelian` | 复形范畴是阿贝尔范畴 | （只有书号：`Exercise 7.11`） | 命题：$\mathcal{A}$ 阿贝尔 $\implies \mathcal{C}(\mathcal{A})$ 阿贝尔 | 无候选（aka 里只有书号） |
| `prop.cohomology-short-exact` | 同调的两条正合列 | （只有书号：`Exercise 7.13`） | 命题：$0 \to H^{k} \to \operatorname{coker} d^{k-1} \to Z^{k+1} | 无候选（aka 里只有书号） |
| `prop.injective-complex-homotopy` | 内射复形：零调、拟同构与同伦 | （只有书号：`Exercise 7.19` / `Exercise 7.20`） | 命题：内射复形上「零调 $\iff$ 同伦平凡」、「拟同构 $\iff$ 同伦等价」 | 无候选（aka 里只有书号） |
| `prop.injective-resolution-lift` | 内射消解之间的提升 | （只有书号：`Exercise 7.21`） | 命题：态射可以提升到内射消解之间 | 无候选（aka 里只有书号） |
| `prop.ext-abelian-groups` | 阿贝尔群的 Ext | （只有书号：`Exercise 7.25`） | 命题：$\operatorname{Ext}^{n}_{\mathbb{Z}}(M,N) = 0$（$n \ge 2$） | 无候选（aka 里只有书号） |
| `prop.ext-projective-vanishes` | 投射对象没有高次 Ext | （只有书号：`Exercise 7.24`） | 命题：$P$ 投射 $\implies \operatorname{Ext}^{n}(P, M) = 0$（$n > 0 | 无候选（aka 里只有书号） |
| `prop.injective-iff-acyclic` | 内射与零调的等价 | （只有书号：`Exercise 7.26`） | 命题：内射 $\iff$ 对一切左正合函子零调 | 无候选（aka 里只有书号） |
| `prop.cohomology-as-ext` | 上同调就是 Ext | （只有书号：`Exercise 7.37` / `Exercise 5.24`） | 命题：$H^{n}(X, M^{\bullet}) \cong \operatorname{Ext}^{n}_{\mat | 无候选（aka 里只有书号） |
| `prop.presheaf-representable-acyclic` | 预层在可表示对象上没有高次上同调 | （只有书号：`Exercise 7.41`） | 命题：$H^{n}(h_{X}, M) = 0$（$n > 0$，预层情形） | 无候选（aka 里只有书号） |
| `prop.left-exact-criterion` | 左正合性的判据 | （只有书号：`Exercise 5.11`） | 命题：$F$ 左正合 $\iff$ $F$ 加法且保左正合列 | 无候选（aka 里只有书号） |
| `prop.left-exact-iff-R0` | 左正合性与 R⁰ | （只有书号：`Exercise 7.23`） | 命题：$F$ 左正合 $\iff$ $R^{0}F \cong F$ | 无候选（aka 里只有书号） |
| `def.resolution` | 消解 | （只有书号：`Definition 7.1.20` / `Def 7.1.20`） | 定义：左/右消解、投射/内射消解 | 无候选（aka 里只有书号） |
| `prop.bicomplex-spectral` | 双复形给出谱序列 | （只有书号：`Proposition 7.2.18` / `Prop 7.2.18`） | 命题：下有界双复形 $\implies$ $E^{0}_{p,q} = K^{p,q} \Longrightarrow  | 无候选（aka 里只有书号） |
| `lem.covering-free-acyclic` | 覆盖给出的自由复形零调 | （只有书号：`Lemma 7.3.2`） | 引理：$X = (X_{i} \to X)$ 是覆盖 $\implies$ $\mathbb{Z}\cdot X_{\b | 无候选（aka 里只有书号） |
| `cor.cech-cohomology-spectral` | Čech 到上同调的谱序列 | （只有书号：`Corollary 7.3.8` / `Cor 7.3.8`） | 推论：$\check{H}^{p}\bigl(X, H^{q}(M)\bigr) \Longrightarrow H^{ | 无候选（aka 里只有书号） |
| `def.free-abelian-sheaf` | 自由阿贝尔群层 | （只有书号：`Exercise 5.18` / `Exercise 5.24`） | 定义：$\mathbb{Z}\cdot X$，遗忘函子的左伴随 | 无候选（aka 里只有书号） |
| `prop.image-kernel-cokernel` | 像就是余核的核 | （只有书号：`Exercise 5.9`） | 命题：$\operatorname{im} f = \ker(\operatorname{coker} f)$，每个态射 | 无候选（aka 里只有书号） |
| `prop.exact-at-points` | 正合就是逐点正合 | （只有书号：`Exercise 5.10`） | 命题：短正合 $\iff$ 三处都正合 | 无候选（aka 里只有书号） |
| `prop.subcat-additive` | 子范畴继承加法与阿贝尔性 | （只有书号：`Exercise 5.12`） | 命题：全忠实 + 有伴随 $\implies$ $\mathcal{C}$ 也加法（阿贝尔） | 无候选（aka 里只有书号） |
| `prop.generator-coproduct-epi` | 生成元的余积刻画 | （只有书号：`Exercise 5.13` / `Exercise 3.40`） | 命题：$G$ 生成 $\iff$ 每个 $M$ 都有 $G^{(I)} \twoheadrightarrow M$ | 无候选（aka 里只有书号） |
| `thm.abelian-sheaf-equiv` | 阿贝尔层即拓扑斯里的阿贝尔群 | （只有书号：`Exercise 5.15`） | 定理：$\widetilde{\mathcal{C}}(\mathbf{Ab}) \simeq \mathbf{Ab}( | 无候选（aka 里只有书号） |
| `prop.presheaf-free-projective` | 自由的预层是投射的 | （只有书号：`Exercise 5.19`） | 命题：$\mathbb{Z}\cdot h_{X}$ 在 $\widehat{\mathcal{C}}(\mathbf{ | 无候选（aka 里只有书号） |
| `prop.generators-abelian-sheaves` | 生成元给出阿贝尔层的生成元 | （只有书号：`Exercise 5.20`） | 命题：$S$ 生成 $\mathcal{T}$ $\implies$ $\{\mathbb{Z}\cdot X\}$ 生 | 无候选（aka 里只有书号） |
| `prop.free-sheaf-tensor` | 自由对象的张量积 | （只有书号：`Exercise 5.29`） | 命题：$\mathbb{Z}\cdot X \otimes \mathbb{Z}\cdot Y \cong \mathb | 无候选（aka 里只有书号） |
| `prop.additive-complex-construction` | 加法函子与复形构造交换 | （只有书号：`Exercise 7.27`） | 命题：$F(C(\mathcal{A})) \cong C(F(\mathcal{A}))$ | 无候选（aka 里只有书号） |
| `prop.spectral-degenerate-row` | 谱序列的退化行 | （只有书号：`Exercise 7.29`） | 命题：只有 $p = 0$ 那一行时 $E^{0,q} \cong H^{q}$ | 无候选（aka 里只有书号） |
| `prop.five-term-spectral-sequence` | 谱序列的五项正合列 | （只有书号：`Exercise 7.30`） | 命题：$0 \to E^{1,0}_{2} \to H^{1} \to E^{0,1}_{2} \xrightarrow | 无候选（aka 里只有书号） |
| `prop.filtered-first-page` | 过滤复形的第一页 | （只有书号：`Exercise 7.31`） | 命题：$E^{1}_{p,q} = H^{p+q}(\operatorname{Gr}^{p}K^{\bullet})$ | 无候选（aka 里只有书号） |
| `prop.total-complex-injective-resolution` | 全复形还是内射消解 | （只有书号：`Exercise 7.34`） | 命题：全复形 $I^{\bullet}$ 仍是 $K^{\bullet}$ 的内射消解 | 无候选（aka 里只有书号） |
| `prop.derived-functor-exact-factor` | 正合因子让谱序列退化 | （只有书号：`Exercise 7.35`） | 命题：$F$ 正合 $\implies R^{n}G(FK) \cong R^{n}(G \circ F)(K)$ | 无候选（aka 里只有书号） |
| `prop.flat-tensor-acyclic` | 平坦张量保持零调 | （只有书号：`Exercise 7.39`） | 命题：$P$ 平坦、$M$ 下有界零调 $\implies P \otimes M$ 零调 | 无候选（aka 里只有书号） |
| `prop.cech-cochain-formula` | Čech 上链的具体公式 | （只有书号：`Exercise 7.40`） | 命题：$\check{C}^{n}(\mathfrak{X}, M) = \prod M(X_{i_{0}} \time | 无候选（aka 里只有书号） |
| `prop.higher-cohomology-presheaf-zero` | 高次上同调预层的关联层为零 | （只有书号：`Exercise 7.43`） | 命题：$n \ne 0$ 时 $\widetilde{H^{n}(M)} = 0$ | 无候选（aka 里只有书号） |
| `prop.cech-higher-cohomology-presheaf` | 高次上同调预层没有 Čech 上同调 | （只有书号：`Exercise 7.45`） | 命题：$n \ne 0 \implies \check{H}^{p}\bigl(H^{n}(M)\bigr) = 0$ | 无候选（aka 里只有书号） |
| `prop.cech-interval-vanishing` | 区间上没有高阶 Čech 上同调 | （只有书号：`Exercise 7.47`） | 命题：$M$ 常 $\implies \check{H}^{n}([0,1], M) = 0$（$n \ne 0$） | 无候选（aka 里只有书号） |
| `prop.cech-h1-equals-h1` | 一次 Čech 就是一次上同调 | （只有书号：`Exercise 7.48`） | 命题：$\check{H}^{1}(X, M) \cong H^{1}(X, M)$ | 无候选（aka 里只有书号） |
| `prop.acyclic-equivalent-conditions` | 无环性的四条等价说法 | （只有书号：`Exercise 7.49`） | 命题：$M$ 无环 $\iff$ 处处上同调为零 $\iff$ 处处 Čech 为零 | 无候选（aka 里只有书号） |
| `prop.cohomology-functoriality` | 上同调的函子性 | （只有书号：`Exercise 7.54`） | 命题：$H^{n}(X', M^{\bullet}) \to H^{n}\bigl(f^{-1}(X'), f^{-1} | 无候选（aka 里只有书号） |
| `prop.derived-pushforward-composition` | 推前的复合 | （只有书号：`Exercise 7.55`） | 命题：$Rf'_{*} \circ Rf_{*} = R(f' \circ f)_{*}$ | 无候选（aka 里只有书号） |
| `thm.leray-spectral-sequence` | Leray 谱序列 | （只有书号：`Exercise 7.56`） | 定理：$E^{p,q}_{2} = H^{p}\bigl(X', R^{q}f_{*}M^{\bullet}\bigr) | 无候选（aka 里只有书号） |
| `prop.derived-functor-kan-extension` | 导出函子就是 Kan 延拓 | （只有书号：`Exercise 7.22`） | 命题：$F$ 左正合 $\implies RF$ 是沿局部化的左 Kan 延拓 | 无候选（aka 里只有书号） |
| `prop.cohomology-via-associated-sheaf` | 用关联层算上同调 | （只有书号：`Exercise 7.36`） | 命题：$\mathrm{R}\Gamma(X, M^{\bullet}) = \mathrm{R}\Gamma(\und | 无候选（aka 里只有书号） |
| `prop.cohomology-presheaf-H` | 层化不改变导出的整体截面 | （只有书号：`Exercise 7.42`） | 命题：$\Gamma\bigl(X, R\mathcal{H}(M^{\bullet})\bigr) = R\Gamma | 无候选（aka 里只有书号） |
| `prop.spectral-sequence-page-picture` | 谱序列的页画在 (p,q) 平面上 | （只有书号：`Exercise 7.28`） | 命题：$E_{0}, E_{1}, E_{2}$ 都是 $(p,q)$ 平面上的格点族 | 无候选（aka 里只有书号） |

### 微分几何 · `diffgeom`（111）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.moving-frame` | 活动标架 | — | 活动标架与对偶余标架 | 无候选（aka 与 title 都没有英文） |
| `def.connection-form` | 联络形式 | — | 联络形式 | 无候选（aka 与 title 都没有英文） |
| `prop.connection-antisymmetric` | 联络形式反对称 | — | 正交标架给出反对称的联络形式 | 无候选（aka 与 title 都没有英文） |
| `thm.structure-equations` | 结构方程 | — | 第一与第二结构方程 | 无候选（aka 与 title 都没有英文） |
| `lem.adapted-frame` | 适配标架 | — | 沿曲面取法向标架 | 无候选（aka 与 title 都没有英文） |
| `lem.second-form-symmetric` | 第二基本形式对称 | — | 第二基本形式的系数矩阵对称 | 无候选（aka 与 title 都没有英文） |
| `def.regular-surface` | 曲面与参数化 | — | 正则曲面、切平面与 Gauss 映射 | 无候选（aka 与 title 都没有英文） |
| `def.first-fundamental-form` | 第一基本形式 | — | 第一基本形式 | 无候选（aka 与 title 都没有英文） |
| `def.weingarten-map` | Weingarten 变换 | — | Weingarten 变换（形状算子） | 无候选（aka 与 title 都没有英文） |
| `def.second-fundamental-form` | 第二基本形式 | — | 第二基本形式 | 无候选（aka 与 title 都没有英文） |
| `thm.gauss-equation` | Gauss 方程 | — | Gauss 方程 | 无候选（aka 与 title 都没有英文） |
| `thm.codazzi-mainardi` | Codazzi–Mainardi 方程 | — | Codazzi–Mainardi 方程 | 无候选（aka 与 title 都没有英文） |
| `def.normal-curvature` | 法曲率 | — | 法曲率 | 无候选（aka 与 title 都没有英文） |
| `thm.meusnier` | Meusnier 定理 | — | Meusnier 定理 | 无候选（aka 与 title 都没有英文） |
| `def.principal-curvature` | 主曲率 | — | 主曲率与主方向 | 无候选（aka 与 title 都没有英文） |
| `def.mean-curvature` | 平均曲率 | — | 平均曲率 | 无候选（aka 与 title 都没有英文） |
| `thm.euler-formula-surface` | Euler 公式 | — | Euler 公式 | 无候选（aka 与 title 都没有英文） |
| `thm.rodrigues` | Rodrigues 定理 | — | Rodrigues 定理 | 无候选（aka 与 title 都没有英文） |
| `prop.curvature-lines` | 曲率线网 | — | 曲率线网的判别法 | 无候选（aka 与 title 都没有英文） |
| `thm.fundamental-theorem-surfaces` | 曲面论基本定理 | — | 曲面论基本定理 | 无候选（aka 与 title 都没有英文） |
| `def.intrinsic-quantity` | 内蕴量 | — | 内蕴量与外在量 | 无候选（aka 与 title 都没有英文） |
| `def.isometry-surface` | 等距 | — | 曲面的等距 | 无候选（aka 与 title 都没有英文） |
| `def.christoffel-symbol` | 克里斯托费尔记号 | — | 克里斯托费尔记号 | 无候选（aka 与 title 都没有英文） |
| `prop.christoffel-frame` | 标架下的联络系数 | — | 正交标架下的联络系数 | 无候选（aka 与 title 都没有英文） |
| `def.geodesic` | 测地线 | — | 测地线与测地线方程 | 无候选（aka 与 title 都没有英文） |
| `prop.geodesic-existence` | 测地线的局部存在唯一性 | — | 测地线的局部存在唯一性 | 无候选（aka 与 title 都没有英文） |
| `def.geodesic-curvature` | 测地曲率 | — | 测地曲率 | 无候选（aka 与 title 都没有英文） |
| `thm.liouville-formula` | 刘维尔公式 | — | 测地曲率的刘维尔公式 | 无候选（aka 与 title 都没有英文） |
| `prop.curvature-split` | 曲率分解 | — | 法曲率与测地曲率的分解 | 无候选（aka 与 title 都没有英文） |
| `def.exponential-map` | 指数映射 | — | 指数映射与法坐标 | 无候选（aka 与 title 都没有英文） |
| `lem.gauss-lemma` | 高斯引理 | — | 高斯引理与测地极坐标 | 无候选（aka 与 title 都没有英文） |
| `lem.normal-coord-euclidean` | 法坐标的欧氏性 | — | 法坐标只在一阶上像欧氏坐标 | 无候选（aka 与 title 都没有英文） |
| `def.curvature-tensor` | 黎曼曲率张量 | — | 黎曼曲率张量与局部平坦性 | 无候选（aka 与 title 都没有英文） |
| `def.gauss-curvature` | 高斯曲率 | — | 高斯曲率的内蕴定义 | 无候选（aka 与 title 都没有英文） |
| `thm.theorema-egregium` | 绝妙定理 | — | 高斯曲率是内蕴量 | 无候选（aka 与 title 都没有英文） |
| `thm.gauss-bonnet` | 高斯博内定理 | — | 高斯博内定理与欧拉示性数 | 无候选（aka 与 title 都没有英文） |
| `def.regular-curve` | 正则曲线 | — | 正则曲线与切线 | 无候选（aka 与 title 都没有英文） |
| `def.arc-length` | 弧长 | — | 弧长与弧长参数化 | 无候选（aka 与 title 都没有英文） |
| `def.frenet-frame` | 曲率与挠率 | — | Frenet 标架、曲率与挠率 | 无候选（aka 与 title 都没有英文） |
| `thm.frenet-serret` | Frenet–Serret 公式 | — | Frenet–Serret 公式 | 无候选（aka 与 title 都没有英文） |
| `thm.curve-fundamental-theorem` | 曲线基本定理 | — | 曲线基本定理：曲率与挠率决定曲线 | 无候选（aka 与 title 都没有英文） |
| `def.differential-form` | 微分形式 | — | 微分形式 | 无候选（aka 与 title 都没有英文） |
| `def.exterior-derivative` | 外微分 | — | 外微分 | 无候选（aka 与 title 都没有英文） |
| `prop.pullback-forms` | 拉回 | — | 微分形式的拉回 | 无候选（aka 与 title 都没有英文） |
| `def.area-element` | 面积元 | — | 面积元与曲面面积 | 无候选（aka 与 title 都没有英文） |
| `def.orientable-surface` | 可定向曲面 | — | 可定向曲面与定向 | 无候选（aka 与 title 都没有英文） |
| `def.smooth-manifold` | 光滑流形 | — | 光滑流形与图册 | 无候选（aka 与 title 都没有英文） |
| `def.tangent-space-manifold` | 切空间 | — | 流形上的切空间 | 无候选（aka 与 title 都没有英文） |
| `thm.regular-level-set` | 正则水平集定理 | — | 正则水平集定理 | 无候选（aka 与 title 都没有英文） |
| `def.riemannian-metric` | 黎曼度量 | — | 黎曼度量 | 无候选（aka 与 title 都没有英文） |
| `def.affine-connection` | 仿射联络 | — | 仿射联络与协变导数 | 无候选（aka 与 title 都没有英文） |
| `prop.curvature-tensor-symmetries` | 曲率张量的对称性 | — | 曲率张量的对称性与独立分量数 | 无候选（aka 与 title 都没有英文） |
| `thm.bianchi-identity` | 比安基恒等式 | — | 第一与第二比安基恒等式 | 无候选（aka 与 title 都没有英文） |
| `def.sectional-curvature` | 截面曲率 | — | 截面曲率 | 无候选（aka 与 title 都没有英文） |
| `def.ricci-curvature` | Ricci 曲率 | — | Ricci 曲率与数量曲率 | 无候选（aka 与 title 都没有英文） |
| `def.integral-form` | 形式的积分 | — | 形式的积分与定向 | 无候选（aka 与 title 都没有英文） |
| `thm.stokes` | Stokes 定理 | — | Stokes 定理 | 无候选（aka 与 title 都没有英文） |
| `def.manifold-chart` | 图卡 | — | 图卡、坐标与转移映射 | 无候选（aka 与 title 都没有英文） |
| `prop.maximal-atlas` | 极大图册 | — | 图册与光滑结构 | 无候选（aka 与 title 都没有英文） |
| `def.smooth-map` | 光滑映射 | — | 光滑映射与光滑函数 | 无候选（aka 与 title 都没有英文） |
| `def.differential-map` | 切映射 | — | 切映射（微分） | 无候选（aka 与 title 都没有英文） |
| `def.tangent-bundle` | 切丛 | — | 切丛与切丛的流形结构 | 无候选（aka 与 title 都没有英文） |
| `def.vector-field` | 向量场 | — | 光滑向量场 | 无候选（aka 与 title 都没有英文） |
| `def.lie-bracket` | Lie 括号 | — | 向量场的 Lie 括号 | 无候选（aka 与 title 都没有英文） |
| `def.tensor-field` | 张量场 | — | 张量场与张量丛 | 无候选（aka 与 title 都没有英文） |
| `def.vector-bundle` | 向量丛 | — | 向量丛与局部平凡化 | 无候选（aka 与 title 都没有英文） |
| `def.bundle-section` | 丛的截面 | — | 向量丛的截面 | 无候选（aka 与 title 都没有英文） |
| `thm.smooth-partition-unity` | 光滑单位分解 | — | 流形上的光滑单位分解 | 无候选（aka 与 title 都没有英文） |
| `prop.bundle-metric` | 纤维度量 | — | 向量丛上的纤维度量 | 无候选（aka 与 title 都没有英文） |
| `def.orientable-manifold` | 可定向流形 | — | 可定向流形与定向 | 无候选（aka 与 title 都没有英文） |
| `def.volume-form` | 体积形式 | — | 体积形式与黎曼体积 | 无候选（aka 与 title 都没有英文） |
| `prop.volume-form-orientation` | 定向与体积形式 | — | 可定向当且仅当存在处处非零的最高次形式 | 无候选（aka 与 title 都没有英文） |
| `def.de-rham-complex` | de Rham 上同调 | — | de Rham 复形与上同调群 | 无候选（aka 与 title 都没有英文） |
| `thm.de-rham-h0` | 零次上同调 | — | 零次上同调群与连通分支 | 无候选（aka 与 title 都没有英文） |
| `lem.poincare-lemma` | Poincaré 引理 | — | Poincaré 引理：星形区域上的闭形式恰当 | 无候选（aka 与 title 都没有英文） |
| `thm.mayer-vietoris` | Mayer–Vietoris 序列 | — | Mayer–Vietoris 长正合列 | 无候选（aka 与 title 都没有英文） |
| `def.lie-group` | Lie 群 | — | Lie 群 | 无候选（aka 与 title 都没有英文） |
| `def.lie-algebra` | Lie 代数 | — | Lie 代数 | 无候选（aka 与 title 都没有英文） |
| `prop.left-invariant-fields` | 左不变向量场 | — | 左不变向量场与 Lie 代数 | 无候选（aka 与 title 都没有英文） |
| `def.boundary-manifold` | 带边流形 | — | 带边流形与边界 | 无候选（aka 与 title 都没有英文） |
| `def.singular-cube` | 奇异方块 | — | 奇异方块 | 无候选（aka 与 title 都没有英文） |
| `def.singular-chain` | 奇异链 | — | 奇异链 | 无候选（aka 与 title 都没有英文） |
| `def.boundary-operator` | 边界算子 | — | 边界算子 | 无候选（aka 与 title 都没有英文） |
| `prop.boundary-squared-zero` | 边界算子平方为零 | — | 边界算子平方为零 | 无候选（aka 与 title 都没有英文） |
| `prop.boundary-sign-convention` | 边界的符号约定 | — | 代数边界与诱导定向的边界一致 | 无候选（aka 与 title 都没有英文） |
| `def.integral-on-chain` | 链上的积分 | — | 链上的积分 | 无候选（aka 与 title 都没有英文） |
| `prop.integral-chain-linear` | 链上积分的双线性 | — | 链上积分对形式与对链都线性 | 无候选（aka 与 title 都没有英文） |
| `lem.single-cube-stokes` | 方块上的 Stokes 公式 | — | 单个方块上的 Stokes 公式 | 无候选（aka 与 title 都没有英文） |
| `thm.stokes-chain` | 链上的 Stokes 定理 | — | 链上的 Stokes 定理 | 无候选（aka 与 title 都没有英文） |
| `def.volume-density` | 体积密度与体积形式 | — | 体积密度与体积形式 | 无候选（aka 与 title 都没有英文） |
| `prop.volume-density-well-defined` | 密度与定向无关 | — | 体积密度在换卡下不变，体积形式随定向变号 | 无候选（aka 与 title 都没有英文） |
| `def.divergence` | 散度 | — | 散度 | 无候选（aka 与 title 都没有英文） |
| `thm.divergence-theorem` | 散度定理 | — | 散度定理 | 无候选（aka 与 title 都没有英文） |
| `thm.change-of-variables-manifold` | 流形上的换元公式 | — | 流形上的换元公式 | 无候选（aka 与 title 都没有英文） |
| `def.tangent-distribution` | 切分布 | — | 切分布与光滑性 | 无候选（aka 与 title 都没有英文） |
| `def.involutive-distribution` | 对合分布 | — | 对合分布 | 无候选（aka 与 title 都没有英文） |
| `def.integral-manifold` | 积分流形 | — | 积分流形与叶片坐标 | 无候选（aka 与 title 都没有英文） |
| `thm.frobenius` | Frobenius 定理 | — | Frobenius 定理 | 无候选（aka 与 title 都没有英文） |
| `def.left-invariant-form` | 左不变形式 | — | 左不变形式与左不变余标架 | 无候选（aka 与 title 都没有英文） |
| `thm.maurer-cartan` | Maurer–Cartan 方程 | — | Maurer–Cartan 方程 | 无候选（aka 与 title 都没有英文） |
| `thm.lie-third` | Lie 第三定理 | — | Lie 第三定理 | 无候选（aka 与 title 都没有英文） |
| `thm.bundle-classification` | 丛的分类 | — | 向量丛的分类与 Čech 上同调 | 无候选（aka 与 title 都没有英文） |
| `thm.de-rham` | de Rham 定理 | — | de Rham 定理 | 无候选（aka 与 title 都没有英文） |
| `def.tensor-contraction` | 缩并 | — | 张量缩并 | 无候选（aka 与 title 都没有英文） |
| `def.interior-product` | 内乘 | — | 内乘（内积） | 无候选（aka 与 title 都没有英文） |
| `def.flow` | 流 | — | 流与单参数群 | 无候选（aka 与 title 都没有英文） |
| `thm.flow-local` | 局部流 | — | 流的局部存在唯一性 | 无候选（aka 与 title 都没有英文） |
| `thm.flow-complete` | 流完备性 | — | 流的完备性与紧流形 | 无候选（aka 与 title 都没有英文） |
| `def.lie-derivative` | Lie 导数 | — | Lie 导数 | 无候选（aka 与 title 都没有英文） |
| `thm.cartan-formula` | Cartan 公式 | — | Cartan 公式 | 无候选（aka 与 title 都没有英文） |
| `def.submanifold-volume` | 诱导体积 | — | 子流形的诱导体积 | 无候选（aka 与 title 都没有英文） |

### 复变函数 · `complex`（77）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `prop.complex-triangle` | 模长的三角不等式 | — | 命题：模长的三角不等式（含等号条件） | 无候选（aka 与 title 都没有英文） |
| `def.complex-partial` | 复偏导数 | — | 定义：复偏导数（Wirtinger 算子） | 无候选（aka 与 title 都没有英文） |
| `prop.complex-partial-rules` | 复偏导数的运算法则 | — | 命题：复偏导数的运算法则 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-riemann` | Cauchy–Riemann 方程 | — | 定理：全纯性与 Cauchy–Riemann 方程等价 | 无候选（aka 与 title 都没有英文） |
| `prop.conformal-iff` | 保角性 | — | 命题：导数非零与保角性等价 | 无候选（aka 与 title 都没有英文） |
| `def.contour-integral` | 复围道积分 | — | 定义：复围道积分 | 无候选（aka 与 title 都没有英文） |
| `lem.cauchy-green` | Cauchy–Green 恒等式 | — | 引理：Cauchy–Green 恒等式 | 无候选（aka 与 title 都没有英文） |
| `lem.goursat-triangle` | Goursat 三角形引理 | — | 引理：三角形上的积分为零（Goursat） | 无候选（aka 没英文，title 里有） |
| `thm.cauchy-goursat` | Cauchy–Goursat 积分定理 | — | 定理：Cauchy–Goursat 积分定理 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-integral-formula` | Cauchy 积分公式 | — | 定理：Cauchy 积分公式 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-higher-derivative` | 高阶导数公式 | — | 定理：高阶导数公式与无穷次可微 | 无候选（aka 与 title 都没有英文） |
| `thm.cauchy-inequality` | Cauchy 不等式 | — | 定理：Cauchy 不等式 | 无候选（aka 与 title 都没有英文） |
| `thm.liouville` | Liouville 定理 | — | 定理：Liouville 定理 | 无候选（aka 与 title 都没有英文） |
| `thm.taylor-complex` | 全纯函数的 Taylor 展开 | — | 定理：全纯函数可展成 Taylor 级数 | 无候选（aka 与 title 都没有英文） |
| `def.laurent-series` | Laurent 级数 | — | 定义：Laurent 级数与主部 | 无候选（aka 与 title 都没有英文） |
| `thm.laurent` | Laurent 展开定理 | — | 定理：Laurent 展开定理 | 无候选（aka 与 title 都没有英文） |
| `def.isolated-singularity` | 孤立奇点及其分类 | — | 定义：孤立奇点及其三类 | 无候选（aka 与 title 都没有英文） |
| `thm.riemann-removable` | Riemann 可去奇点定理 | — | 定理：Riemann 可去奇点定理 | 无候选（aka 与 title 都没有英文） |
| `def.residue` | 留数 | — | 定义：留数 | 无候选（aka 与 title 都没有英文） |
| `prop.residue-at-pole` | 极点处的留数公式 | — | 命题：极点处的留数公式 | 无候选（aka 与 title 都没有英文） |
| `def.mobius` | 分式线性变换 | `Möbius transformation` / `Mobius transformation` | 定义：分式线性变换（Möbius 变换） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.morera` | Morera 定理 | — | 定理：Morera 定理（Cauchy 定理的逆） | 无候选（aka 与 title 都没有英文） |
| `def.winding-number` | 绕数 | — | 定义：绕数（闭曲线关于一点的指数） | 无候选（aka 与 title 都没有英文） |
| `thm.rouche` | Rouché 定理 | — | 定理：Rouché 定理 | 无候选（aka 与 title 都没有英文） |
| `thm.hurwitz` | Hurwitz 定理 | — | 定理：Hurwitz 定理（零点的极限） | 无候选（aka 与 title 都没有英文） |
| `thm.schwarz-pick` | Schwarz–Pick 定理 | — | 定理：Schwarz–Pick 定理 | 无候选（aka 与 title 都没有英文） |
| `def.branch` | 多值函数与分支 | — | 定义：多值函数、分支与分支切割 | 无候选（aka 与 title 都没有英文） |
| `def.logarithm-branch` | 对数与幂的分支 | — | 定义：复对数、复幂及其分支 | 无候选（aka 与 title 都没有英文） |
| `def.riemann-surface` | Riemann 曲面 | — | 定义：Riemann 曲面（多值函数的「定义域」） | 无候选（aka 与 title 都没有英文） |
| `def.harmonic` | 调和函数 | — | 定义：调和函数 | 无候选（aka 与 title 都没有英文） |
| `thm.harmonic-mean-value` | 调和函数的均值性质 | — | 定理：调和函数的均值性质 | 无候选（aka 与 title 都没有英文） |
| `thm.poisson-formula` | Poisson 积分公式 | — | 定理：Poisson 积分公式 | 无候选（aka 与 title 都没有英文） |
| `thm.harmonic-conjugate` | 调和函数的共轭 | — | 定理：调和函数局部是全纯函数的实部 | 无候选（aka 与 title 都没有英文） |
| `thm.harmonic-maximum` | 调和函数的最大值原理 | — | 定理：调和函数的最大值原理 | 无候选（aka 与 title 都没有英文） |
| `def.entire-meromorphic` | 整函数与亚纯函数 | — | 定义：整函数与亚纯函数 | 无候选（aka 与 title 都没有英文） |
| `thm.mittag-leffler` | Mittag-Leffler 定理 | — | 定理：Mittag-Leffler 定理（只陈述） | 无候选（aka 与 title 都没有英文） |
| `lem.jordan` | Jordan 引理 | — | 引理：Jordan 引理（大圆弧上的指数衰减） | 无候选（aka 与 title 都没有英文） |
| `thm.integral-rational` | 实轴上有理函数的积分 | — | 定理：用留数计算实轴上有理函数的积分 | 无候选（aka 与 title 都没有英文） |
| `thm.integral-trig` | 三角有理函数的积分 | — | 定理：用留数计算三角有理函数的定积分 | 无候选（aka 与 title 都没有英文） |
| `def.complex-elementary` | 复数初等函数 | — | 复数初等超越函数（指数、三角、双曲） | 无候选（aka 与 title 都没有英文） |
| `prop.exp-local-inverse` | 指数函数的局部逆 | — | 指数函数在每点局部双全纯，逆即对数的一个分支 | 无候选（aka 与 title 都没有英文） |
| `prop.single-valued-branch` | 单值支的存在判据 | — | 单值支：多值函数在区域上何时能取到一个连续单值分支 | 无候选（aka 与 title 都没有英文） |
| `prop.winding-integral` | 绕数的积分表示 | — | 绕数 = dz/(z−a) 的围道积分除以 2πi | 无候选（aka 与 title 都没有英文） |
| `thm.winding-homotopy` | 绕数的同伦不变性 | — | 同伦的闭曲线有相同的绕数（Cauchy 定理的同伦形式） | 无候选（aka 与 title 都没有英文） |
| `prop.zero-isolated` | 零点的孤立性与阶 | — | 非零全纯函数的零点孤立，且在每个零点有有限阶 | 无候选（aka 与 title 都没有英文） |
| `thm.identity` | 唯一性定理 | — | 唯一性定理（解析延拓原理） | 无候选（aka 与 title 都没有英文） |
| `thm.weierstrass-convergence` | Weierstrass 收敛性定理 | — | Weierstrass 收敛性定理：内闭一致收敛的全纯列，极限全纯且导数也收敛 | 无候选（aka 与 title 都没有英文） |
| `thm.arzela-ascoli` | Arzelà–Ascoli 定理 | — | Arzelà–Ascoli 定理：一致有界 + 等度连续 $implies$ 相对紧 | 无候选（aka 与 title 都没有英文） |
| `thm.montel` | Montel 定理 | — | Montel 定理：局部一致有界的全纯族是正规族 | 无候选（aka 与 title 都没有英文） |
| `thm.open-mapping` | 开映射定理 | — | 开映射定理：非常数全纯函数把开集映成开集 | 无候选（aka 与 title 都没有英文） |
| `prop.poincare-disk` | Poincaré 圆盘与双曲几何 | — | 单位圆盘上的 Poincaré 度量：Schwarz–Pick 就是等距性 | 无候选（aka 与 title 都没有英文） |
| `thm.brouwer-fixed-point` | Brouwer 不动点定理（圆盘） | — | Brouwer 不动点定理：闭圆盘到自身的连续映射必有不动点 | 无候选（aka 与 title 都没有英文） |
| `thm.borsuk-ulam` | Borsuk–Ulam 定理（二维） | — | Borsuk–Ulam 定理：$S^{2} \to \mathbb{R}^{2}$ 必有对径点同值 | 无候选（aka 与 title 都没有英文） |
| `thm.ham-sandwich` | 火腿三明治定理 | — | 火腿三明治定理：一个平面同时平分三块体 | 无候选（aka 与 title 都没有英文） |
| `thm.monodromy` | 单值性定理 | — | 单值性定理：单连通区域内沿同伦路径的延拓结果相同 | 无候选（aka 与 title 都没有英文） |
| `thm.schwarz-reflection` | Schwarz 反射原理 | — | Schwarz 反射原理：跨越实轴解析地延拓 | 无候选（aka 与 title 都没有英文） |
| `thm.runge` | Runge 逼近定理 | — | Runge 逼近定理：没有洞的区域上，全纯函数可以用多项式逼近 | 无候选（aka 与 title 都没有英文） |
| `def.entire-order` | 整函数的阶与型 | — | 整函数的阶与型：用增长速度给整函数排队 | 无候选（aka 与 title 都没有英文） |
| `prop.jensen` | Jensen 公式 | — | Jensen 公式：零点个数被平均值控制 | 无候选（aka 与 title 都没有英文） |
| `def.elementary-factor` | Weierstrass 初等因子 | — | Weierstrass 初等因子：不给零点就得零的「近似因子」 | 无候选（aka 与 title 都没有英文） |
| `thm.weierstrass-product` | Weierstrass 乘积定理 | — | Weierstrass 乘积定理：给定零点就能造出整函数 | 无候选（aka 与 title 都没有英文） |
| `thm.hadamard-factorization` | Hadamard 分解定理 | — | Hadamard 分解定理：有限阶整函数的因子分解 | 无候选（aka 与 title 都没有英文） |
| `thm.picard-little` | Picard 小定理 | — | Picard 小定理：非常数整函数至多漏掉一个值 | 无候选（aka 与 title 都没有英文） |
| `thm.picard-great` | Picard 大定理 | — | Picard 大定理：本性奇点附近至多漏掉一个值 | 无候选（aka 与 title 都没有英文） |
| `def.cross-ratio` | 交比 | — | 交比：分式线性变换下唯一不变的四点量 | 无候选（aka 与 title 都没有英文） |
| `prop.cross-ratio-real` | 交比为实 ⟺ 四点共圆 | — | 交比取实值当且仅当四点共圆或共线 | 无候选（aka 与 title 都没有英文） |
| `prop.mobius-three-points` | 三点决定分式线性变换 | — | 三对点唯一决定一个分式线性变换 | 无候选（aka 与 title 都没有英文） |
| `prop.mobius-circle` | 保圆性 | — | 分式线性变换把圆与直线映成圆与直线 | 无候选（aka 与 title 都没有英文） |
| `def.symmetric-point` | 关于圆的对称点 | — | 对称点：关于圆与关于直线的「反演」的统一说法 | 无候选（aka 与 title 都没有英文） |
| `prop.mobius-symmetry` | 分式线性变换保对称点 | — | 分式线性变换把对称点映成对称点 | 无候选（aka 与 title 都没有英文） |
| `prop.mobius-classification` | 分式线性变换的分类 | — | 分式线性变换的三种类型：椭圆、双曲、抛物 | 无候选（aka 与 title 都没有英文） |
| `prop.mobius-group` | 分式线性变换成群 | — | 分式线性变换构成群：$\operatorname{PGL}(2, \mathbb{C})$ | 无候选（aka 与 title 都没有英文） |
| `prop.standard-maps` | 标准共形映射 | — | 几个典型区域之间的标准共形映射 | 无候选（aka 与 title 都没有英文） |
| `thm.schwarz-christoffel` | Schwarz–Christoffel 公式 | — | Schwarz–Christoffel 公式：把上半平面映成多边形 | 无候选（aka 与 title 都没有英文） |
| `prop.joukowski` | Joukowski 映射 | — | Joukowski 映射：机翼剖面的来历 | 无候选（aka 与 title 都没有英文） |
| `thm.boundary-correspondence` | 边界对应定理 | — | 边界对应：Jordan 区域的共形映射能延拓到边界 | 无候选（aka 与 title 都没有英文） |
| `prop.extended-plane-compact` | 扩充复平面是紧的 | — | $\widehat{\mathbb{C}} \cong S^{2}$：紧、列紧，$z_{n} \to \infty$ 就 | 无候选（aka 与 title 都没有英文） |

### 数理逻辑 · `logic`（1）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.satisfaction` | 满足关系 | `satisfaction` / `semantics` | 结构与满足关系 $\models$ | 零命中（aka 有 2 条候选，title 里一条都没出现） |
