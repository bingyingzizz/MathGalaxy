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
| ✅ 一级填入（`from: aka` / `from: title`） | 230 | 32.4% | aka 里恰好一条名字样英文 |
| ✅ 二级填入（`from: aka-title`） | 44 | 6.2% | title 里恰好命中一个 aka 候选 —— 清单见 `i18n/second-tier.md`（可整批回滚）|
| ⛔ 缺口 | 435 | 61.4% | 下面第二节逐条列 |
| **合计** | **709** | 100% | 覆盖 274（38.6%），缺口 435 |

## 二、缺口为什么填不了（互斥，合计 = 缺口数）

| 桶 | 节点数 | 意思 |
|---|---|---|
| ⚠️ 歧义（二级也没捞着） | 54 | aka 里有 ≥2 条英文写法，且 title 里没出现其中一个 |
| ⚠️ 只有缩写 | 23 | aka 里只有 AC / FOL / sup / MCT a.e. 这种缩写 |
| ⚠️ 只有书号 | 259 | aka 里只有 Exercise 2.25 / Theorem 8.3.9 这种坐标（搜索用，不是名字）|
| ⚠️ 只有 title 有 | 4 | aka 没有英文，但 title 括号里是英文 |
| ⛔ 完全没有 | 95 | aka 与 title 都没有英文名 |
| **合计** | **435** | = 全部节点 709 − 已覆盖 274 |

⚠️ **口径提醒**：脚本内部的分桶是在**二级之前**做的，所以「歧义」原始数是 98，其中 **44** 条被二级捞走了 —— 上表用的是减完的 54。
两张表各自互斥、各自合计对得上；⛔ 别把两张表的行混着加。

---

## 缺口按星系分组（435）

每行都带上候选集，方便照着 `aliases.js` 补。同一节点属多个星系时只列在第一个里。

### 集合论 · `set-theory`（19）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.pair` | 有序对 | `ordered pair` / `Kuratowski` | 有序对（Ordered Pair, Kuratowski） | 多命中：`ordered pair` / `Kuratowski` |
| `thm.empty` | 空集存在 | — | 空集存在且唯一 | 无候选（aka 与 title 都没有英文） |
| `thm.noself` | 无自属集合 | — | 任何集合都不属于自身 | 无候选（aka 与 title 都没有英文） |
| `thm.binunion` | 二元并存在 | — | 二元并 $a \cup b$ 存在 | 无候选（aka 与 title 都没有英文） |
| `thm.wellordering` | 良序定理 | `well-ordering theorem` / `Zermelo` | 良序定理 / 良序原理（Well-Ordering Theorem, Zermelo 1904） | 多命中：`well-ordering theorem` / `Zermelo` |
| `def.union-inter` | 并集与交集 | `union` / `intersection` | 并集 / 交集（Union & Intersection） | 多命中：`union` / `intersection` |
| `def.diff-complement` | 差集与补集 | `difference` / `complement` | 差集 / 补集 / 对称差（Difference, Complement & Symmetric Difference） | 多命中：`difference` / `complement` |
| `def.bijection` | 单射 / 满射 / 双射 | `injective` / `surjective` / `bijective` | 单射 / 满射 / 双射（Injective / Surjective / Bijective） | 多命中：`injective` / `surjective` / `bijective` |
| `def.equinumerous` | 等势 | `equipotent` / `same cardinality` | 等势（Equinumerous） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.schroder-bernstein` | Schröder–Bernstein 定理 | `Cantor–Bernstein` / `Cantor-Bernstein-Schroeder` | Schröder–Bernstein 定理 | 零命中（候选没出现在 title 里） |
| `thm.cardinal-comparable` | 基数可比定理 | — | 基数可比定理（需要选择公理） | 无候选（aka 与 title 都没有英文） |
| `thm.induction` | 归纳原理与递推定义 | `induction` / `recursion` | 归纳原理 / 递推定义（Induction & Recursion） | 多命中：`induction` / `recursion` |
| `def.nat-arith` | 自然数的加法与乘法 | — | 自然数上的加法与乘法（由递推定义） | 无候选（aka 与 title 都没有英文） |
| `def.cauchy-null` | Cauchy 列与零列 | `Cauchy sequence` / `null sequence` | 有理 Cauchy 列 / 零列 / 等价（Cauchy & Null Sequences） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.real-ordered-field` | ℝ 是完备有序域 | `least upper bound property` / `completeness of R` | $\mathbb{R}$ 是完备有序域（确界原理） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.real-unique` | 完备有序域的唯一性 | — | 任何完备有序域都与 $\mathbb{R}$ 同构（构造无关性） | 无候选（aka 与 title 都没有英文） |
| `thm.recursion-wellorder` | 超限递归 | `transfinite recursion` / `transfinite induction` | 良序集上的递归定理（含超限归纳） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.ordinal-trichotomy` | 序数可比 | — | 序数的三歧性：$\in$ 在 $\mathrm{On}$ 上是良序 | 无候选（aka 与 title 都没有英文） |
| `thm.burali-forti` | 序数全体是真类 | `Burali-Forti` | Burali–Forti：序数全体不构成集合 | 零命中（候选没出现在 title 里） |

### 序理论 · `order-theory`（3）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.poset` | 偏序集 | `partial order` / `poset` | 偏序集 / 全序集（Partially Ordered Set） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.wellorder` | 良序集 | `well-order` / `well-ordering` | 良序集（Well-Ordered Set） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.hausdorff` | Hausdorff 极大原理 | — | Hausdorff 极大原理 / 极大公理（Hausdorff Maximal Principle, 1914） | 无候选（aka 没英文，title 里有） |

### 抽象代数 · `algebra`（6）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.vs` | 向量空间的基 | `basis` / `span` / `linearly independent` | 向量空间 / 线性无关 / 基 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `thm.vsbasis` | 每个向量空间有基 | — | 每个向量空间都有基（Zorn 引理的经典应用） | 无候选（aka 与 title 都没有英文） |
| `ex.algebra-categories` | 代数的几个范畴 | `Mon` / `Gr` / `Rng` / `G-Set` / `A-Mod` / `k-Alg` | $\mathrm{Mon}$、$\mathrm{Gr}$、$\mathrm{Rng}$、$G\text{-}\mathb | 多命中：`Mon` / `Gr` / `Rng` |
| `prop.ring-tensor-coproduct` | 交换环的纤维余积是张量积 | （只有书号：`Exercise 1.29`） | 交换环的推出 = 张量积 | 无候选（aka 里只有书号） |
| `prop.module-tensor-universal` | 张量积对双线性映射万有 | （只有书号：`Exercise 1.21`） | 命题：$\operatorname{Bil}(M \times N,\ P) \cong \operatorname{H | 无候选（aka 里只有书号） |
| `prop.zmod-is-ab` | Z-模就是阿贝尔群 | （只有书号：`Exercise 1.10`） | 命题：$\mathbb{Z}\text{-}\mathbf{Mod} \cong \mathbf{Ab}$、$\math | 无候选（aka 里只有书号） |

### 拓扑学 · `topology`（46）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `thm.metric-compact-equiv` | 紧的三个等价刻画 | `Heine-Borel` | 度量空间中：紧 $\iff$ 列紧 $\iff$ 完备 + 全有界 | 零命中（候选没出现在 title 里） |
| `prop.compact-subset-closed` | 紧子集是闭的 | — | 命题：紧子集在 X 中是闭集 | 无候选（aka 与 title 都没有英文） |
| `prop.subset-compact-equiv` | 子集的紧性刻画 | — | 命题：X 完备时，A 紧 $\iff A$ 闭且全有界 | 无候选（aka 与 title 都没有英文） |
| `def.topology` | 拓扑空间与开集 | `topology` / `open set` | 拓扑空间 / 开集（Topological Space） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.closed-set` | 闭集与闭包 | `closed set` / `closure` | 闭集 / 闭包 / 稠密（Closed Set, Closure） | 多命中：`closed set` / `closure` |
| `def.topology-base` | 基与子基 | `base` / `subbase` | 拓扑的基 / 子基（Basis, Subbasis） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.chaus-reflective` | 紧 Haus 是反射子范畴 | `Stone-Čech` / `beta X` | Stone–Čech 紧化 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.minimal-closed-surjection` | 满射的极小闭子集 | （只有书号：`Lemma 2.1.5`） | 满连续映射的极小闭子集 | 无候选（aka 里只有书号） |
| `prop.chaus-quotient-of-free` | 紧 Haus 是自由的商 | — | 每个紧 Hausdorff 空间都是自由紧 Hausdorff 空间的商 | 无候选（aka 与 title 都没有英文） |
| `prop.free-projective` | 自由紧 Haus 是投射对象 | — | 自由紧 Hausdorff 空间是 $\mathbf{CHaus}$ 的投射对象 | 无候选（aka 与 title 都没有英文） |
| `cor.chaus-free-presentation` | 紧 Haus 都有自由表示 | （只有书号：`Corollary 2.2.4` / `Cor 2.2.4`） | 每个紧 Hausdorff 空间都有自由表示 | 无候选（aka 里只有书号） |
| `prop.component-clopen` | 连通分量是闭开邻域之交 | （只有书号：`Proposition 2.2.6` / `Prop 2.2.6`） | 紧 Hausdorff 空间中连通分量 = 闭开邻域之交 | 无候选（aka 里只有书号） |
| `def.stone-space` | 全不连通与 Stone 空间 | `Stone space` / `extremally disconnected` / `totally disconnected` | Stone 空间与 Stonean 空间（Stone / Stonean Space） | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `prop.stonean-basic` | 极端不连通的基本性质 | （只有书号：`Lemma 2.2.10` / `Exercise 2.23`） | 极端不连通的性质 | 无候选（aka 里只有书号） |
| `prop.td-reflective` | 全不连通空间是反射子范畴 | `pi_0` | 全不连通空间是 $\mathbf{Top}$ 的反射子范畴 | 零命中（候选没出现在 title 里） |
| `prop.stone-reflective` | Stone 空间是 CHaus 的反射子范畴 | （只有书号：`Exercise 2.17`） | Stone 空间是 $\mathbf{CHaus}$ 的反射子范畴 | 无候选（aka 里只有书号） |
| `def.profinite` | 投射有限空间 | `profinite space` / `profinite` | 投射有限空间（Profinite Space） | 多命中：`profinite space` / `profinite` |
| `ex.cg-examples` | 紧生成空间的例子 | （只有书号：`Exercise 6.2`） | 哪些空间是紧生成的 | 无候选（aka 里只有书号） |
| `prop.cg-equivalent-conditions` | 紧生成空间的等价刻画 | （只有书号：`Exercise 2.24`） | 紧生成性的六条等价说法 | 无候选（aka 里只有书号） |
| `prop.ktx-colimit` | kX 是紧空间的余极限 | （只有书号：`Exercise 2.26`） | $kX = \varinjlim S$ | 无候选（aka 里只有书号） |
| `cor.cg-product` | 紧生成空间对积封闭 | （只有书号：`Exercise 2.25`） | 紧生成空间作积仍紧生成 | 无候选（aka 里只有书号） |
| `prop.k-product` | k-化与积 | `k(X×Y)` | $k(kX \times Y) = k(X \times Y)$ | 零命中（候选没出现在 title 里） |
| `prop.compact-open-discrete` | 离散时函数空间是积 | （只有书号：`Exercise 2.28`） | 离散 $X$ 时 $C(X,Y) \cong Y^{X}$ | 无候选（aka 里只有书号） |
| `prop.weak-hausdorff-basic` | 弱 Hausdorff 的基本性质 | （只有书号：`Exercise 2.31` / `Exercise 2.34`） | 弱 Hausdorff 的几条基本性质 | 无候选（aka 里只有书号） |
| `prop.cg-kclosed-quotient` | k-闭等价关系与弱 Hausdorff 商 | （只有书号：`Exercise 2.39`） | $R$ 是 $k$-闭 $\iff$ $X/R$ 弱 Hausdorff | 无候选（aka 里只有书号） |
| `thm.cgwh-reflective` | CGWH 是 CG 的反射子范畴 | `CGWH` | 紧生成的弱 Hausdorff 空间是反射子范畴 | 零命中（候选没出现在 title 里） |
| `prop.cgwh-closed` | CGWH 的开闭子空间与滤过余极限 | （只有书号：`Exercise 2.41`） | $\mathrm{CGWH}$ 的封闭性 | 无候选（aka 里只有书号） |
| `prop.cg-function-space` | 函数空间弱 Hausdorff | `kC(X,Y)` | $Y$ 弱 Hausdorff $\implies$ $kC(X,Y)$ 弱 Hausdorff | 零命中（候选没出现在 title 里） |
| `prop.cg-cartesian-closed` | 紧生成空间是笛卡尔闭的 | `cartesian closed` / `currying` | 紧生成空间是笛卡尔闭范畴 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `cor.cg-exponential-adjoint` | CG 的指数伴随 | （只有书号：`Corollary 2.3.7` / `Cor 2.3.7`） | $X \mapsto k(X \times Y) \;\dashv\; Z \mapsto kC(kY, Z)$ | 无候选（aka 里只有书号） |
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

### 分析学 · `analysis`（86）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.set-ring` | 环与代数 | `ring of sets` / `algebra of sets` | 环与代数（Ring, Algebra） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.sigma-algebra` | σ-代数 | `sigma-algebra` / `sigma-field` | σ-代数（σ-Algebra） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.set-class-properties` | 集合族的基本性质 | — | 命题：基本类 / 环 / σ-代数的几条基本性质 | 无候选（aka 与 title 都没有英文） |
| `thm.ring-monotone-sigma` | 环 → σ-环 的判据 | — | 定理：环是 σ-环 $\iff$ 它是单调类 $\iff$ 它对可数不交并封闭 | 无候选（aka 与 title 都没有英文） |
| `prop.product-sigma-base` | 积 σ-代数的生成基 | — | 命题：把各坐标的 σ-代数换成生成元，积 σ-代数不变 | 无候选（aka 与 title 都没有英文） |
| `prop.product-sigma-generated` | 可数积的生成集 | — | 命题：指标集可数时，积 σ-代数由「矩形」生成 | 无候选（aka 与 title 都没有英文） |
| `cor.borel-product` | 可数积的 Borel 代数 | — | 推论：可数积距离空间的 Borel σ-代数（可分时相等） | 无候选（aka 与 title 都没有英文） |
| `prop.measure-basic` | 测度的基本性质 | — | 命题：测度的单调性、次可加性与两种连续性 | 无候选（aka 与 title 都没有英文） |
| `def.semifinite-part` | 半有限部分 | — | 半有限部分（Semifinite Part of a Measure） | 无候选（aka 没英文，title 里有） |
| `prop.outer-measure-induced` | 由预测度诱导外测度 | — | 命题：从 $\mathcal{E}$ 上的 $\rho$ 诱导出一个外测度 | 无候选（aka 与 title 都没有英文） |
| `def.caratheodory-measurable` | μ*-可测集 | — | Carathéodory 可测性（$\mu^{*}$-Measurable Set） | 无候选（aka 与 title 都没有英文） |
| `thm.caratheodory` | Carathéodory 定理 | — | Carathéodory 定理：$\mu^{*}$-可测集构成 σ-代数，$\mu^{*}$ 在其上是完备测度 | 无候选（aka 与 title 都没有英文） |
| `prop.caratheodory-extension` | 预测度还原 | — | 命题：从预测度出发做 Carathéodory，原代数上的值不变 | 无候选（aka 与 title 都没有英文） |
| `thm.caratheodory-uniqueness` | 扩张的唯一性 | — | 定理：Carathéodory 扩张是最大的，σ-有限时唯一 | 无候选（aka 与 title 都没有英文） |
| `prop.ls-premeasure` | F 给出的预测度 | — | 命题：单调右连续的 F 给出半开区间上的预测度 | 无候选（aka 与 title 都没有英文） |
| `thm.ls-exists` | F ↔ Borel 测度 | — | 定理：每个单调右连续的 F 对应一个 Borel 测度（差常数意义下） | 无候选（aka 与 title 都没有英文） |
| `def.lebesgue-stieltjes` | Lebesgue–Stieltjes 测度 | `Lebesgue–Stieltjes` | Lebesgue–Stieltjes 测度（Lebesgue–Stieltjes Measure $\mu_F$） | 零命中（候选没出现在 title 里） |
| `prop.measurable-criterion` | 可测性的两条判定准则 | — | 命题：复合保持可测；只需在生成元上验证 | 无候选（aka 与 title 都没有英文） |
| `cor.continuous-measurable` | 连续 ⟹ Borel 可测 | — | 推论：连续函数是 Borel 可测的 | 无候选（aka 与 title 都没有英文） |
| `def.lebesgue-measurable` | Lebesgue 可测 | — | Lebesgue 可测 / Borel 可测（$\mathbb{R} \to \mathbb{C}$ 的情形） | 无候选（aka 与 title 都没有英文） |
| `prop.measurable-product-and-realimag` | 积空间与实虚部 | — | 命题：可测函数到积空间；f 可测 $\iff$ 实部虚部可测 | 无候选（aka 与 title 都没有英文） |
| `prop.measurable-closure` | 可测函数的封闭性 | — | 命题：可测函数对和、积、sup、max、极限封闭 | 无候选（aka 与 title 都没有英文） |
| `prop.complete-measurable` | 完备性 ⟺ 不破坏可测性 | — | 命题：$\mu$ 完备 $\iff$ 几乎处处相等 / 几乎处处收敛不破坏可测性 | 无候选（aka 与 title 都没有英文） |
| `prop.completion-measurable-function` | 完备化后可改在零集上 | — | 命题：完备化空间上的可测函数，几乎处处等于一个原空间可测函数 | 无候选（aka 与 title 都没有英文） |
| `def.lplus` | L⁺ | — | $L^{+}$：非负可测函数全体 | 无候选（aka 与 title 都没有英文） |
| `def.integral-simple` | 简单函数的积分 | — | 简单函数的积分：加权和 | 无候选（aka 与 title 都没有英文） |
| `prop.simple-integral-props` | 简单函数积分的性质 | — | 命题：简单函数积分的四条基本性质 | 无候选（aka 与 title 都没有英文） |
| `def.integral-nonneg` | 非负函数的积分 | — | 非负可测函数的积分：从下面取上确界 | 无候选（aka 与 title 都没有英文） |
| `prop.integral-zero-iff` | 积分为零 ⟺ 几乎处处为零 | — | 命题：$\int f = 0 \iff f = 0 \text{a.e.}$ | 无候选（aka 与 title 都没有英文） |
| `cor.mct-ae` | MCT（a.e. 版本） | `MCT a.e.` | 推论：单调收敛定理的几乎处处版本 | 零命中（候选没出现在 title 里） |
| `lem.fatou` | Fatou 引理 | `Fatou` / `Fatou's lemma` | Fatou 引理（Fatou's Lemma） | 多命中：`Fatou` / `Fatou's lemma` |
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
| `def.section` | 截口 | （只有书号：`section`） | 截口（Section）$E_{x}$ 与 $E^{y}$ | 无候选（aka 里只有书号） |
| `prop.section-measurable` | 截口可测 | — | 命题：可测集的截口可测，可测函数的截口可测 | 无候选（aka 与 title 都没有英文） |
| `thm.product-measure-sections` | 乘积测度由截口给出 | — | 定理：$\mu \times \nu(E) = \int \nu(E_{x}) d\mu(x) = \int \mu(E | 无候选（aka 与 title 都没有英文） |
| `thm.fubini-tonelli` | Fubini–Tonelli | `Fubini` / `Tonelli` | Fubini–Tonelli 定理（重积分可交换次序） | 多命中：`Fubini` / `Tonelli` |
| `thm.fubini-complete` | 完备情形的 F–T | — | 定理：完备化的乘积测度上，Fubini–Tonelli 仍然成立 | 无候选（aka 与 title 都没有英文） |
| `prop.product-incomplete` | 乘积测度通常不完备 | — | 注记：$\mu$、$\nu$ 完备时，$\mu \times \nu$ 常常不完备 | 无候选（aka 与 title 都没有英文） |
| `def.positive-negative-null` | 正集 / 负集 / 零集 | — | 正集 / 负集 / 零集（Positive, Negative, Null Set） | 无候选（aka 没英文，title 里有） |
| `prop.positive-set-closure` | 正集的封闭性 | — | 命题：正集的可测子集仍是正集；可数个正集之并仍是正集 | 无候选（aka 与 title 都没有英文） |
| `prop.ac-and-variations` | 绝对连续与变差 | — | 命题：$\nu \ll \mu \iff \|\nu\| \ll \mu \iff \nu^{+}$、$\nu^{-}  | 无候选（aka 与 title 都没有英文） |
| `thm.ac-epsilon-delta` | 绝对连续的 ε–δ 刻画 | — | 定理（有限情形）：$\nu \ll \mu \iff \forall\varepsilon>0 \exists\delt | 无候选（aka 与 title 都没有英文） |
| `prop.integral-gives-ac` | 积分给出绝对连续测度 | — | 命题：$\nu(E) = \int_E f d\mu$ 关于 $\mu$ 绝对连续 | 无候选（aka 与 title 都没有英文） |
| `cor.ac-integral-continuity` | 积分的绝对连续性 | — | 推论：$\int_E f d\mu$ 在小测度集上任意小 | 无候选（aka 与 title 都没有英文） |
| `lem.singular-or-lower-bound` | 要么奇异、要么有下界 | — | 引理：两个有限测度，要么相互奇异，要么在某个正测度集上成比例 | 无候选（aka 与 title 都没有英文） |
| `prop.rn-chain-rule` | RN 导数的链式法则 | — | 命题：RN 导数的换元公式与链式法则 | 无候选（aka 与 title 都没有英文） |
| `cor.rn-inverse` | 互为绝对连续时导数互逆 | — | 推论：$\mu \ll \lambda$ 且 $\lambda \ll \mu \implies (d\mu/d\lam | 无候选（aka 与 title 都没有英文） |
| `thm.rn-complex` | 复测度的 Radon–Nikodym | — | 定理：复测度的 $\nu = \lambda + f d\mu$ 分解 | 无候选（aka 与 title 都没有英文） |
| `prop.L1-signed` | L¹(ν) 与全变差 | — | 命题：符号测度的 $L^{1}(\nu) = L^{1}(\|\nu\|)$，以及几条基本不等式 | 无候选（aka 与 title 都没有英文） |
| `lem.average-continuous` | 平均算子联合连续 | — | 引理：$A_{r} f(x)$ 关于 (r, x) 联合连续 | 无候选（aka 没英文，title 里有） |
| `thm.lebesgue-set-full` | Lebesgue 集几乎处处 | — | 定理：$f \in L^{1}_{\text{loc}} \implies m(L_f^{c}) = 0$ | 无候选（aka 与 title 都没有英文） |
| `thm.differentiation-general` | 可缩族的微分定理 | — | 定理：对可缩族，Lebesgue 微分定理仍然成立 | 无候选（aka 与 title 都没有英文） |
| `thm.rn-pointwise` | RN 导数的点态公式 | — | 定理：$\nu(E_{r})/m(E_{r}) \to f(x) \text{a.e.}$，其中 $d\nu = d\l | 无候选（aka 与 title 都没有英文） |
| `thm.monotone-differentiable` | 单调函数几乎处处可导 | — | 定理：单调函数几乎处处可导，且不连续点可数 | 无候选（aka 与 title 都没有英文） |
| `prop.bv-examples` | BV 的例子与基本性质 | — | 命题：BV 的几个例子与封闭性 | 无候选（aka 与 title 都没有英文） |
| `lem.variation-monotone` | T_F ± F 递增 | — | 引理：实值 BV 函数的 $T_F + F$ 与 $T_F - F$ 都递增 | 无候选（aka 与 title 都没有英文） |
| `thm.bv-jordan` | BV 的 Jordan 分解 | — | 定理：$F \in BV \iff F = G - H$（G、H 有界递增） | 无候选（aka 与 title 都没有英文） |
| `prop.bv-regularity` | BV 函数的正则性 | — | 命题：BV 函数的单侧极限都存在、不连续点可数、a.e. 可导 | 无候选（aka 与 title 都没有英文） |
| `def.nbv` | NBV | `NBV` | NBV：右连续且 $F(-\infty) = 0$ 的有界变差函数 | 零命中（候选没出现在 title 里） |
| `lem.nbv-variation` | 全变差的 NBV 性质 | — | 引理：$T_F(-\infty) = 0$；F 右连续 $\implies T_F$ 右连续 | 无候选（aka 与 title 都没有英文） |
| `prop.monotone-integral-derivative` | 递增函数的导数积分不等式 | — | 命题：$\int_{a}^{b} F' \le F(b) - F(a)$ | 无候选（aka 与 title 都没有英文） |
| `thm.borel-measure-nbv` | 测度 ↔ NBV 的一一对应 | — | 定理：$\mathbb{R}$ 上的复 Borel 测度 $\longleftrightarrow$ NBV 函数 | 无候选（aka 与 title 都没有英文） |
| `prop.nbv-derivative` | NBV 函数的导数与测度的关系 | — | 命题：$\mu_F \perp m \iff F' = 0 \text{a.e.}$；$\mu_F \ll m \iff | 无候选（aka 与 title 都没有英文） |
| `prop.ac-iff-measure-ac` | 函数绝对连续 ⟺ 测度绝对连续 | — | 命题：F 绝对连续 $\iff \mu_F \ll m$ | 无候选（aka 与 title 都没有英文） |
| `cor.integral-is-ac-nbv` | 积出来的函数是 AC · NBV | — | 推论：$f \in L^{1}(m) \implies F(x) = \int_{-\infty}^{x} f$ 是 A | 无候选（aka 与 title 都没有英文） |
| `lem.ac-subset-bv` | AC ⊆ BV | — | 引理：绝对连续蕴含绝对变差（紧区间上） | 无候选（aka 与 title 都没有英文） |
| `def.essential-sup` | 本性上界与 L^∞ | `essential supremum` / `L-infinity` | 本性上界 $\\|f\\|_\infty$ 与空间 $L^\infty$ | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.linf-properties` | L^∞ 的性质 | — | 定理：$L^\infty$ 的五条基本性质 | 无候选（aka 与 title 都没有英文） |
| `prop.lq-in-lp-plus-lr` | L^q 落在 L^p + L^r 里 | — | 命题：$L^q \subseteq L^p + L^r$（$0 < p < q < r \le \infty$） | 无候选（aka 与 title 都没有英文） |
| `prop.lp-inter-lr-in-lq` | L^p ∩ L^r ⊆ L^q | — | 命题（插值）：$L^p \cap L^r \subseteq L^q$ | 无候选（aka 与 title 都没有英文） |
| `prop.ell-p-inclusion` | ℓ^p ⊆ ℓ^q | — | 命题（只有衰减的场合）：$\ell^p \subseteq \ell^q$（$0 < p < q \le \infty$ | 无候选（aka 与 title 都没有英文） |
| `prop.lp-inclusion-finite` | 有限测度时方向反过来 | — | 命题（只有爆破的场合）：$\mu(X) < \infty$ 时 $L^p(\mu) \supseteq L^q(\mu) | 无候选（aka 与 title 都没有英文） |
| `prop.bounded-functional-gives-lq` | 有界 ⟹ g ∈ L^q | — | 命题：若 $f \mapsto \int fg$ 在简单函数上有界，则 $g \in L^q$ | 无候选（aka 与 title 都没有英文） |
| `thm.real-uncountable` | ℝ 不可数 | — | 实数集是稠密而不可数的：$\|\mathbb{R}\| = 2^{\aleph_0}$ | 无候选（aka 与 title 都没有英文） |

### 数理逻辑 · `logic`（1）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.satisfaction` | 满足关系 | `satisfaction` / `semantics` | 结构与满足关系 $\models$（Tarski） | 零命中（aka 有 2 条候选，title 里一条都没出现） |

### 范畴论 · `category`（126）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.ff-faithful` | 忠实 / 满 / 全忠实 | `faithful` / `full` / `fully faithful` | 忠实、满、全忠实函子（Faithful / Full / Fully Faithful） | 多命中：`faithful` / `full` / `fully faithful` |
| `def.commutative-diagram` | 图与交换图 | `commutative diagram` / `diagram` | 图与交换图（Diagram / Commutative Diagram） | 多命中：`commutative diagram` / `diagram` |
| `def.cone` | 锥 | `cone` / `cocone` | 锥与余锥（Cone / Cocone） | 多命中：`cone` / `cocone` |
| `def.limit` | 极限 | `limit` / `colimit` | 极限与余极限（Limit / Colimit） | 多命中：`limit` / `colimit` |
| `def.product` | 积 / 余积 | `product` / `coproduct` | 积与余积（Product / Coproduct） | 多命中：`product` / `coproduct` |
| `def.fibered-product` | 纤维积 / 纤维余积 | `pullback` / `fibered product` / `pushout` | 纤维积与纤维余积（Pullback / Pushout） | 多命中：`pullback` / `pushout` |
| `def.equalizer` | 等化子 / 余等化子 | `equalizer` / `coequalizer` / `ker` / `coker` | 等化子与余等化子（Equalizer / Coequalizer） | 多命中：`equalizer` / `coequalizer` |
| `def.mono` | 单态射 / 满态射 / 同构 | `mono` / `epi` / `monomorphism` / `epimorphism` / `isomorphism` / `isomorphic` | 单态射、满态射与同构（Mono / Epi / Isomorphism） | 多命中：`mono` / `epi` / `isomorphism` |
| `def.image` | 像 / 余像 | `image` / `coimage` / `strict` | 像与余像（Image / Coimage） | 多命中：`image` / `coimage` |
| `lem.yoneda` | 米田引理 | `Yoneda lemma` / `Yoneda` | 米田引理（Yoneda Lemma） | 多命中：`Yoneda lemma` / `Yoneda` |
| `prop.slice-cartesian` | 切片范畴是拉回 | — | 切片范畴的方块是笛卡尔的 | 无候选（aka 与 title 都没有英文） |
| `lem.presheaf-mono-pointwise` | 预层态射的单满按点检验 | — | 预层是逐点算的 | 无候选（aka 与 title 都没有英文） |
| `def.adjoint` | 伴随函子 | `adjoint functor` / `adjunction` | 伴随函子（Adjoint Functors） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.adjunction-unit` | 单位与余单位 | `unit` / `counit` | 单位与余单位（Unit and Counit） | 多命中：`unit` / `counit` |
| `prop.adjoint-full-faithful` | 全忠实与单位 | — | 全忠实 $\iff$ 单位（余单位）是同构 | 无候选（aka 与 title 都没有英文） |
| `prop.limit-adjoint` | 极限即伴随 | （只有书号：`Proposition 1.5.4` / `Prop 1.5.4`） | 极限 $\iff$ 常图函子有伴随 | 无候选（aka 里只有书号） |
| `thm.right-adjoint-preserves-limits` | 右伴随保极限 | `RAPL` | 右伴随保持所有极限 | 零命中（候选没出现在 title 里） |
| `prop.reflective-limits` | 反射子范畴里的极限 | （只有书号：`Exercise 1.64` / `Exercise 1.70`） | 反射子范畴中的极限与余极限 | 无候选（aka 里只有书号） |
| `ex.kan-extension` | Kan 延拓的两个例子 | — | 余极限与右伴随都是 Kan 延拓 | 无候选（aka 与 title 都没有英文） |
| `def.grothendieck-topology` | Grothendieck 拓扑 | `Grothendieck topology` / `site` | Grothendieck 拓扑与 site（Grothendieck Topology, Site） | 多命中：`Grothendieck topology` / `site` |
| `prop.cech-properties` | Čech 函子的性质 | （只有书号：`Lemma 3.2.6`） | Čech 函子的三条性质 | 无候选（aka 里只有书号） |
| `thm.sheafification` | 层化 | `sheafification` / `sheafify` | 层化：层范畴是预层范畴的反射子范畴 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.universal-colimit` | 万有关系 | `universal colimit` / `disjoint coproduct` | 万有余极限、万有满态射、不交余积 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.site-properties` | site 的层范畴的好性质 | （只有书号：`Exercise 3.24`） | Grothendieck 拓扑下的层范畴 | 无候选（aka 里只有书号） |
| `prop.sheafify-equivalence` | 层化与等价关系交换 | （只有书号：`Exercise 3.17` / `Exercise 3.28`） | 层化保持等价关系与商 | 无候选（aka 里只有书号） |
| `prop.covering-sieve-epi` | 覆盖筛即余积满射 | （只有书号：`Corollary 3.2.13` / `Cor 3.2.13`） | 覆盖族生成覆盖筛 $\iff$ 余积满射 | 无候选（aka 里只有书号） |
| `prop.disjoint-universal` | 不交万有余积与次标准拓扑 | （只有书号：`Exercise 3.29`） | 不交万有余积在次标准拓扑下不变 | 无候选（aka 里只有书号） |
| `prop.subobject-lattice` | 子对象构成有界格 | （只有书号：`Exercise 3.33`） | 预拓扑斯中子对象构成有界格 | 无候选（aka 里只有书号） |
| `prop.precanonical-sheaf` | 预标准拓扑下的层 | （只有书号：`Exercise 3.36` / `Proposition 3.3.3`） | 预标准拓扑下「层」的两条等式 | 无候选（aka 里只有书号） |
| `prop.precanonical-preserves` | 余积与商在层范畴中不变 | — | 预标准拓扑下余积与商不变 | 无候选（aka 与 title 都没有英文） |
| `prop.precanonical-mono-epi` | 单满在层化后不变 | （只有书号：`Exercise 3.38`） | 预标准拓扑下单态射与满态射不变 | 无候选（aka 里只有书号） |
| `def.generator` | 生成元集 | `generator` / `set of generators` | 生成元集与生成元（Generators） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.representable-quotient` | 可表示性的下降 | — | 可表示性的下降引理 | 无候选（aka 与 title 都没有英文） |
| `prop.topos-covering-epi` | 拓扑斯中覆盖即余积满射 | （只有书号：`Exercise 3.41`） | 拓扑斯中的覆盖 | 无候选（aka 里只有书号） |
| `prop.topos-sheaf-limits` | 拓扑斯上的层即保极限的预层 | （只有书号：`Exercise 3.42`） | 拓扑斯上的层 $\iff$ 保持所有极限 | 无候选（aka 里只有书号） |
| `prop.quasi-compact-properties` | 拟紧的性质 | （只有书号：`Exercise 3.46` / `Proposition 3.3.9`） | 拟紧对象的性质 | 无候选（aka 里只有书号） |
| `thm.pretopos-qcqs` | 预拓扑斯由拓扑斯唯一确定 | `qcqs` | 预拓扑斯 $\simeq$ 拟紧拟分离层 | 零命中（候选没出现在 title 里） |
| `def.cofinal-functor` | 共尾函子 | `cofinal` / `cofinal functor` / `final functor` / `coinitial` | 共尾函子（Cofinal Functor） | 多命中：`cofinal` / `cofinal functor` |
| `def.filtered-category` | 滤过范畴 | `filtered category` / `filtered` / `cocone` | 滤过范畴与滤过余极限（Filtered Category） | 多命中：`filtered category` / `filtered` |
| `prop.representable-preserves-limits` | 可表函子保所有极限 | `representable preserves limits` / `left exact` | 可表函子保所有极限 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `ex.ab-of-categories` | Ab(C) 的例子 | `Ab(Top)` / `Ab(Set)` | $\mathrm{Ab}(-)$ 在几个范畴上的样子 | 零命中（候选没出现在 title 里） |
| `prop.localization-hom-colim` | 局部化的 Hom 是滤过余极限 | — | $\operatorname{Hom}_{\mathrm{ho}}(X,Y) = \varinjlim_{X' \to  | 无候选（aka 与 title 都没有英文） |
| `prop.sieve-covering-equivalent` | 覆盖筛的四条等价 | （只有书号：`Proposition 3.2.12` / `Prop 3.2.12`） | 覆盖筛的等价刻画（$\widetilde{R} \simeq \underline{X}$） | 无候选（aka 里只有书号） |
| `prop.limit-construction` | 极限的构造 | （只有书号：`Exercise 1.37` / `Exercise 1.35`） | 极限 = 无限积 + 等化子 | 无候选（aka 里只有书号） |
| `def.zero-object` | 零对象与直和 | `zero object` / `biproduct` | 零对象、双积与直和 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.iso-unique-section` | 同构的截面与收缩唯一 | （只有书号：`Proposition 1.1.4` / `Prop 1.1.4`） | 同构的截面与收缩 | 无候选（aka 里只有书号） |
| `prop.poset-limit-join` | 偏序集里的极限是交 | （只有书号：`Exercise 1.30`） | 偏序集里：极限 = 下确界，余极限 = 上确界 | 无候选（aka 里只有书号） |
| `prop.preserves-products-kernels` | 保积与核 ⟹ 保所有有限极限 | （只有书号：`Exercise 1.43`） | 保积 + 保核 $\implies$ 保所有有限极限 | 无候选（aka 里只有书号） |
| `prop.preserves-fibered-products-mono` | 保纤维积 ⟹ 保单态射 | （只有书号：`Exercise 1.46`） | 保拉回 $\implies$ 保单态射 | 无候选（aka 里只有书号） |
| `prop.left-adjoint-unique` | 左伴随唯一 | （只有书号：`Exercise 1.58`） | 同一个右伴随的左伴随在同构意义下唯一 | 无候选（aka 里只有书号） |
| `prop.counit-epi-iff-faithful` | 余单位与忠实性 | （只有书号：`Exercise 1.60`） | $G$ 忠实 $\iff$ 余单位是满 | 无候选（aka 里只有书号） |
| `prop.ind-reflective` | C 是 Ind(C) 的反射子范畴 | （只有书号：`Exercise 1.73` / `Exercise 1.42`） | $\mathcal{C} \hookrightarrow \operatorname{Ind}(\mathcal{C}) | 无候选（aka 里只有书号） |
| `prop.filtered-finite-colimits` | 滤过 + 有限余极限 ⟹ 所有余极限 | （只有书号：`Exercise 1.41` / `Exercise 1.44`） | 有余滤过余极限与有限余极限 $\implies$ 有所有余极限 | 无候选（aka 里只有书号） |
| `def.kernel-cokernel` | 核与余核 | `kernel` / `cokernel` | 核 / 余核与左正合、右正合列（Kernel, Cokernel） | 多命中：`kernel` / `cokernel` |
| `prop.zero-object-final-criterion` | 零对象与终对象 | （只有书号：`Exercise 5.1`） | 命题：预加性范畴里零对象 $\iff$ 终对象 $\iff$ 始对象 | 无候选（aka 里只有书号） |
| `prop.biproduct-is-product` | 直和就是积 | （只有书号：`Exercise 5.1`） | 命题：预加性范畴里直和 $\iff$ 积 $\iff$ 余积 | 无候选（aka 里只有书号） |
| `prop.hom-enrichment-unique` | 预加性结构唯一 | （只有书号：`Exercise 5.2`） | 命题：加法范畴里 $\operatorname{Hom}$ 的阿贝尔群结构唯一 | 无候选（aka 里只有书号） |
| `prop.additive-iff-preserves-biproduct` | 加法函子的刻画 | （只有书号：`Exercise 5.3`） | 命题：$F$ 加法 $\iff$ 保零对象与直和 $\iff$ 保有限积 | 无候选（aka 里只有书号） |
| `prop.adjoint-additive` | 伴随函子都加法 | （只有书号：`Exercise 5.4`） | 命题：加法范畴之间的伴随函子都是加法函子 | 无候选（aka 里只有书号） |
| `prop.exact-sequence-subcategory` | 正合列构成子范畴 | （只有书号：`Exercise 5.6`） | 命题：左 / 右 / 短正合列构成加法子范畴 | 无候选（aka 里只有书号） |
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
| `prop.site-covering-families-pretopology` | 覆盖族构成预拓扑 | （只有书号：`Exercise 3.14`） | 命题：site 里所有生成覆盖筛的族构成预拓扑 | 无候选（aka 里只有书号） |
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
| `prop.currying` | Currying | （只有书号：`Exercise 1.57`） | 命题：$X \mapsto X \times Y \;\dashv\; Z \mapsto \mathbf{Set}(Y | 无候选（aka 里只有书号） |
| `prop.unit-counit-examples` | 常见伴随的单位与余单位 | （只有书号：`Exercise 1.61`） | 命题：从单位/余单位读出忠实性 | 无候选（aka 里只有书号） |
| `prop.copowers-give-adjoint` | 有余幂则可表示函子有伴随 | （只有书号：`Exercise 1.62`） | 命题：$\mathcal{C}$ 有余幂 $\implies$ $X^{(I)} \dashv h_{X}$ | 无候选（aka 里只有书号） |
| `prop.forgetful-preserves-limits` | 代数遗忘函子保极限 | （只有书号：`Exercise 1.65`） | 命题：$\mathbf{Mon}, \mathbf{Gr}, \mathbf{Rng}, \ldots \to \mat | 无候选（aka 里只有书号） |
| `prop.forgetful-exactness` | 遗忘与含入函子的正合性 | （只有书号：`Exercise 1.66`） | 命题：遗忘保极限不保余极限；层化正合 | 无候选（aka 里只有书号） |
| `prop.reflection-criterion` | 反射的判据 | （只有书号：`Exercise 1.71`） | 命题：$F$ 是反射 $\iff$ 存在 $\alpha_{X} : X \to F(X)$，在 $\mathcal{C | 无候选（aka 里只有书号） |
| `prop.coreflective-monoids-full` | 余反射子范畴上的幺半群 | （只有书号：`Exercise 1.72`） | 命题：$\mathcal{C}'$ 余反射 $\implies \mathrm{Mon}(\mathcal{C}')$  | 无候选（aka 里只有书号） |
| `prop.slice-covering-sieve` | 切片里的覆盖筛 | （只有书号：`Exercise 3.62`） | 命题：$R$ 在 $\mathcal{C}/T$ 里覆盖 $\iff$ $\hat j_{T!}R$ 在 $\mathc | 无候选（aka 里只有书号） |

### 凝聚态数学 · `condensed`（63）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.chaus-pretopos` | CHaus 是预拓扑斯 | （只有书号：`Proposition 4.1.1` / `Corollary 4.1.2`） | $\mathbf{CHaus}$ 是预拓扑斯 | 无候选（aka 里只有书号） |
| `prop.condensed-criterion` | 凝聚态集的刻画 | （只有书号：`Proposition 4.1.4`） | 预层是凝聚态集的两条判据 | 无候选（aka 里只有书号） |
| `prop.fchaus-pretopology` | FCHaus 上的预拓扑 | （只有书号：`Exercise 4.1`） | 有限不交并给出自由紧 Hausforff 空间上的预拓扑 | 无候选（aka 里只有书号） |
| `prop.fchaus-sheaf` | FCHaus 上层的判据 | （只有书号：`Exercise 4.2`） | 自由紧 Hausforff 空间上的层 $\iff$ 保有限积 | 无候选（aka 里只有书号） |
| `thm.cond-equiv-fchaus` | Cond 即 FCHaus 上的层 | （只有书号：`Theorem 4.1.7`） | $\mathrm{Cond} \simeq \widehat{\mathbf{FCHaus}}$ | 无候选（aka 里只有书号） |
| `prop.cond-epi` | 凝聚态集满态射的判据 | （只有书号：`Proposition 4.1.8`） | 凝聚态集的满态射 | 无候选（aka 里只有书号） |
| `prop.cond-projectives` | Cond 有足够多投射对象 | （只有书号：`Exercise 4.3`） | $\mathrm{Cond}$ 的投射对象 | 无候选（aka 里只有书号） |
| `thm.top-cond-adjoint` | Top 与 Cond 的伴随 | `kTop` | $\mathbf{Top} \to \mathrm{Cond}$ 与它的伴随 | 零命中（候选没出现在 title 里） |
| `thm.condab-ab` | CondAb 满足 AB6 与 AB4* | `AB4*` | $\mathrm{CondAb}$ 的 AB 公理 | 零命中（候选没出现在 title 里） |
| `lem.stonean-projective` | Stonean 给出有限表现投射对象 | （只有书号：`Lemma 6.1.3` / `Lemma 6.1.6`） | Stonean 空间给出有限表现的投射对象 | 无候选（aka 里只有书号） |
| `prop.condab-generated` | CondAb 由有限表现投射对象生成 | （只有书号：`Proposition 6.1.7`） | $\mathrm{CondAb}$ 的生成元 | 无候选（aka 里只有书号） |
| `prop.abtop-to-abcond` | 拓扑阿贝尔群嵌入凝聚态 | （只有书号：`Proposition 6.2.1` / `Prop 6.2.1`） | $\mathbf{AbTop} \to \mathrm{AbCond}$ 保所有极限 | 无候选（aka 里只有书号） |
| `prop.continuous-hom-condensed` | 连续同态与内部 Hom | （只有书号：`Proposition 6.2.2` / `Prop 6.2.2`） | $C_{\mathbb{Z}}(M,N) \cong \operatorname{Hom}_{\mathbb{Z}}(M | 无候选（aka 里只有书号） |
| `prop.exact-sequence-topo-ab` | 拓扑阿贝尔群正合列的搬运 | （只有书号：`Proposition 6.2.3` / `Prop 6.2.3`） | 拓扑正合列 $\implies$ 凝聚态正合列 | 无候选（aka 里只有书号） |
| `thm.qcqs-chaus-equiv` | qc 与 qcqs 的判定 | `qcqs` | 紧 Hausdorff 空间 $\cong$ qcqs 凝聚态集 | 零命中（候选没出现在 title 里） |
| `lem.qseparated-ind-inclusions` | 拟分离即含入的滤过余极限 | `Ind(CHaus)` | 拟分离 $\iff$ 紧 Hausdorff 块沿含入拼起来 | 零命中（候选没出现在 title 里） |
| `prop.cond-slice-topos-morphism` | Cond/X 到开集拓扑斯的态射 | （只有书号：`Proposition 8.1.3`） | 拓扑斯态射 $c_{X} : \mathrm{Cond}/X \rightleftarrows \mathrm{Open | 无候选（aka 里只有书号） |
| `prop.k-bounded-implies-exact` | 相邻两条 K-有界 推出 正合 | （只有书号：`Proposition 8.2.3`） | $K$-有界正合（相邻两处）$\implies$ 通常正合 | 无候选（aka 里只有书号） |
| `cor.k-acyclic-acyclic` | K-有界零调 推出 零调 | （只有书号：`Corollary 8.2.4`） | $K$-有界零调 $\implies$ 通常零调 | 无候选（aka 里只有书号） |
| `lem.stone-cech-1-bounded` | Stone 满射的 Čech 复形 1-有界零调 | （只有书号：`Lemma 8.2.5`） | Stone 满射的增广 Čech 复形是 $1$-有界零调 | 无候选（aka 里只有书号） |
| `prop.banach-stone-acyclic` | Banach 在 Stone 上零调 | （只有书号：`Proposition 8.2.6`） | Banach 阿贝尔群在 Stone 空间上零调 | 无候选（aka 里只有书号） |
| `thm.real-banach-chaus-acyclic` | 实 Banach 在紧 Hausdorff 上零调 | （只有书号：`Theorem 8.2.8`） | 实 Banach 空间在紧 Hausdorff 空间上零调 | 无候选（aka 里只有书号） |
| `lem.ext-stonean-section` | Stonean 上 Ext 的截面公式 | （只有书号：`Lemma 8.3.1`） | $\operatorname{Ext}^{n}(M, N)(S) \cong \operatorname{Ext}^{n | 无候选（aka 里只有书号） |
| `thm.breen-deligne` | Breen–Deligne 分解 | `Breen-Deligne` | Breen–Deligne 分解：自由阿贝尔群的有限直和消解 | 零命中（候选没出现在 title 里） |
| `prop.breen-deligne-ss-stonean` | Stonean 上 Breen–Deligne 的谱序列 | （只有书号：`Proposition 8.3.4`） | $E^{p,q}_{1} = \bigoplus_{i} H^{q}(M^{s_{p,i}} \times S,\ N) | 无候选（aka 里只有书号） |
| `prop.rhom-banach-discrete-zero` | 有限维 Banach 到离散群全零 | （只有书号：`Proposition 8.3.5`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N) = 0$（Banach 到 离散） | 无候选（aka 里只有书号） |
| `prop.rhom-chaus-banach-zero` | 紧 Haus 到实 Banach 全零 | （只有书号：`Proposition 8.3.6`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N) = 0$（紧 Haus 到 Banach | 无候选（aka 里只有书号） |
| `prop.rhom-dual-tensor` | 离散对偶的 RHom 与导出张量 | （只有书号：`Proposition 8.3.7`） | $\operatorname{RHom}(\operatorname{RHom}(M, T), N) \cong M \ | 无候选（aka 里只有书号） |
| `prop.dual-rhom-characterization` | Pontryagin 对偶的 RHom 刻画 | （只有书号：`Proposition 8.3.8`） | $M^{\vee} \cong \operatorname{RHom}_{\mathbb{Z}}(M, T)$ | 无候选（aka 里只有书号） |
| `thm.lc-ext-vanishing` | 局部紧阿贝尔群高次 Ext 消失 | （只有书号：`Theorem 8.3.9`） | $\operatorname{Ext}^{n}_{\mathbb{Z}}(M, N) = 0$（$n \ne 0, 1$ | 无候选（aka 里只有书号） |
| `table.rhom-zrt` | Z/R/T 的 RHom 计算表 | （只有书号：`Exercise 8.17`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N)$ 在 $\mathbb{Z}, \mat | 无候选（aka 里只有书号） |
| `ex.finite-banach-rhom` | 有限维 Banach 之间的 RHom | （只有书号：`Exercise 8.15`） | $\operatorname{RHom}_{\mathbb{Z}}(M, N) = \operatorname{Hom} | 无候选（aka 里只有书号） |
| `ex.chaus-banach-rhom` | 紧 S 对实 Banach 的 RHom | （只有书号：`Exercise 8.12`） | $\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z} \cdot S,\ N) \c | 无候选（aka 里只有书号） |
| `ex.bd-ss` | Breen–Deligne 的一般谱序列 | （只有书号：`Exercise 8.14`） | $E^{p,q}_{1} = \bigoplus_{i} H^{q}(M^{s_{p,i}},\ N) \implies | 无候选（aka 里只有书号） |
| `ex.connected-lc-ext` | 连通局部紧到离散只剩 Ext一次 | （只有书号：`Exercise 8.18`） | $\operatorname{Ext}^{n}_{\mathbb{Z}}(M, N) = 0$（$n \ne 1$，$M | 无候选（aka 里只有书号） |
| `ex.nonlc-rhom` | 非局部紧情形的 RHom | （只有书号：`Exercise 8.19`） | $\operatorname{RHom}_{\mathbb{Z}}(\mathbb{R}^{I}, \mathbb{Z} | 无候选（aka 里只有书号） |
| `thm.lc-structure` | 局部紧阿贝尔群结构定理 | `V⊕K` | 局部紧 Hausdorff 阿贝尔群的结构：$V \oplus K$ | 零命中（候选没出现在 title 里） |
| `prop.pontryagin-discrete-compact-duality` | 离散 与 紧 Hausdorff | （只有书号：`Exercise 6.9`） | Pontryagin 对偶把离散与紧互换 | 无候选（aka 里只有书号） |
| `prop.cond-limits-colimits` | Cond 的极限与余极限 | （只有书号：`Corollary 4.1.6`） | $\mathrm{Cond}$ 的极限逐点算，余极限要先层化 | 无候选（aka 里只有书号） |
| `prop.cond-equivalence-effective` | Cond 的等价关系有效 | `effective equivalence relation` / `Giraud` | $\mathrm{Cond}$ 中每个等价关系都是有效的 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.abhaus-strict-exact` | Hausdorff 拓扑阿贝尔群的核与余核 | （只有书号：`Exercise 5.5`） | 命题：$\mathbf{AbHaus}$ 中的核、余核与严格正合列 | 无候选（aka 里只有书号） |
| `lem.cech-finite-disjoint-acyclic` | 有限不交覆盖的 Čech 零调 | （只有书号：`Exercise 8.1`） | 引理：紧 Hausdorff 空间上有限不交覆盖的 Čech 高次为零 | 无候选（aka 里只有书号） |
| `prop.condab-discrete-acyclic` | 离散空间上零调 | （只有书号：`Exercise 8.2`） | 命题：凝聚态阿贝尔群在离散空间与「离散 $\times$ Stonean」上零调 | 无候选（aka 里只有书号） |
| `prop.condab-quotient-r-disc` | R/R_disc 在 Stone 上的截面 | （只有书号：`Exercise 8.3`） | 命题：$Q = \mathbb{R}/\mathbb{R}^{\mathrm{disc}}$ 的截面是连续函数模局部常值 | 无候选（aka 里只有书号） |
| `cor.ext-cond-set-section` | Ext 的截面公式 | （只有书号：`Exercise 8.8`） | 推论：$\operatorname{Ext}^{n}(\mathbb{Z}\cdot X, N)(S) \cong H^ | 无候选（aka 里只有书号） |
| `prop.rhom-zs-sections` | Stonean 上 Z[S] 的 RHom | （只有书号：`Exercise 8.9`） | 命题：$\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z}[S], N) \cong | 无候选（aka 里只有书号） |
| `prop.rhom-ze-powers` | 离散空间上 Z[E] 的 RHom | （只有书号：`Exercise 8.10`） | 命题：$\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z}[E], N) \cong | 无候选（aka 里只有书号） |
| `prop.discrete-cond-rhom-constant` | 离散群的 RHom 是常层 | （只有书号：`Exercise 8.11`） | 命题：离散阿贝尔群的 RHom 与导出张量积都落在常层里 | 无候选（aka 里只有书号） |
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

### 同调代数 · `homology`（85）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.ab-axioms` | Grothendieck 的 AB 公理 | （只有书号：`Definition 5.2.5`） | Grothendieck 的 AB 公理（AB1–AB6） | 无候选（aka 里只有书号） |
| `def.abelian-category` | 加法 / 阿贝尔范畴 | （只有书号：`Definition 5.1.1` / `Definition 5.1.4`） | 加法范畴与阿贝尔范畴（Additive / Abelian Category） | 无候选（aka 里只有书号） |
| `prop.complex-additive` | 复形范畴是加法范畴 | （只有书号：`Exercise 7.1` / `Exercise 7.7`） | 复形范畴的性质 | 无候选（aka 里只有书号） |
| `def.distinguished-triangle` | 导出三角 | `distinguished triangle` / `triangle` | 导出三角（Distinguished Triangle） | 多命中：`distinguished triangle` / `triangle` |
| `lem.triangle-morphism` | 三角态射的性质 | （只有书号：`Proposition 7.1.9` / `Prop 7.1.9`） | 导出三角之间态射的性质 | 无候选（aka 里只有书号） |
| `prop.cohomology-exact-sequence` | 同调的短正合列 | — | 把同调夹在两个余核 / 核之间 | 无候选（aka 与 title 都没有英文） |
| `thm.long-exact` | 长正合列 | `long exact sequence` / `snake lemma` | 短正合列给出长正合列（蛇引理） | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `thm.topos-abelian-grothendieck` | 拓扑斯上的阿贝尔群是 Grothendieck 范畴 | （只有书号：`Theorem 5.3.2`） | $\mathcal{T}(\mathbf{Ab})$ 是 Grothendieck 范畴 | 无候选（aka 里只有书号） |
| `def.tensor-abelian-sheaf` | 阿贝尔层的张量积 | `closed symmetric monoidal` / `Tensor` / `internal hom` | 张量积与封闭幺半结构 | 零命中（aka 有 3 条候选，title 里一条都没出现） |
| `thm.freyd-mitchell` | Freyd–Mitchell 嵌入定理 | `Freyd-Mitchell` / `Freyd` / `Mitchell` | Freyd–Mitchell 嵌入定理 | 多命中：`Freyd` / `Mitchell` |
| `prop.projective-coproduct` | 投射对象的余积投射 | （只有书号：`Exercise 1.48`） | 投射对象的余积还是投射的 | 无候选（aka 里只有书号） |
| `prop.ab-limits-forgetful` | Ab(C) 的极限 | （只有书号：`Exercise 1.52`） | $\mathrm{Ab}(\mathcal{C})$ 有所有极限 | 无候选（aka 里只有书号） |
| `prop.ab6` | AB6：滤过余极限与积交换 | `AB6` | $\mathbf{Ab}$ 满足 AB6 | 零命中（候选没出现在 title 里） |
| `prop.k-calculus-fractions` | K(A) 允许分式演算 | （只有书号：`Proposition 7.2.1` / `Prop 7.2.1`） | $K(\mathcal{A})$ 关于拟同构允许左右分式演算 | 无候选（aka 里只有书号） |
| `prop.exact-to-triangle` | 正合列给出导出三角 | （只有书号：`Proposition 7.2.4` / `Prop 7.2.4`） | 复形的短正合列 $\implies$ 导出三角 | 无候选（aka 里只有书号） |
| `prop.hom-k-eq-hom-d` | Hom 在同伦范畴与导出范畴里一样 | （只有书号：`Proposition 7.2.5` / `Prop 7.2.5`） | $\operatorname{Hom}_{K}(K^{\bullet}, I^{\bullet}) = \operato | 无候选（aka 里只有书号） |
| `thm.k-plus-injectives` | 内射复形就是导出范畴 | （只有书号：`Theorem 7.2.6` / `Thm 7.2.6`） | $K^{+}(\mathcal{I}) \simeq D^{+}(\mathcal{A})$ | 无候选（aka 里只有书号） |
| `thm.derived-long-exact` | 导出函子的长正合列 | （只有书号：`Theorem 7.2.8` / `Thm 7.2.8`） | 短正合列 $\implies$ 右导出函子的长正合列 | 无候选（aka 里只有书号） |
| `prop.ext-is-rhom` | Ext 就是 RHom | （只有书号：`Proposition 7.2.10` / `Prop 7.2.10`） | $R^{n}\operatorname{Hom}(M, K^{\bullet}) = \operatorname{Ext | 无候选（aka 里只有书号） |
| `prop.leray-acyclicity` | Leray 零调性 | （只有书号：`Proposition 7.2.12` / `Prop 7.2.12`） | Leray 零调性：零调复形算导出函子 | 无候选（aka 里只有书号） |
| `thm.filtered-complex-spectral` | 过滤复形给出谱序列 | （只有书号：`Theorem 7.2.16` / `Thm 7.2.16`） | 下有界过滤复形 $\implies$ 谱序列 | 无候选（aka 里只有书号） |
| `cor.grothendieck-spectral` | Grothendieck 谱序列 | （只有书号：`Corollary 7.2.13` / `Cor 7.2.13`） | Grothendieck 谱序列 | 无候选（aka 里只有书号） |
| `prop.cech-as-colim` | Čech 上同调是沿覆盖筛的余极限 | （只有书号：`Exercise 7.46` / `Proposition 7.3.4`） | $\check{H}^{n}(X, M) = \varinjlim_{R \in J(X)} H^{n}(R, M)$ | 无候选（aka 里只有书号） |
| `thm.cartan-leray` | Cartan–Leray 谱序列 | `Cartan-Leray` | Cartan–Leray：Čech 到层上同调的谱序列 | 零命中（候选没出现在 title 里） |
| `prop.acyclic-iff-cech` | 无环 ⟺ Čech 上同调为零 | （只有书号：`Proposition 7.3.10` / `Prop 7.3.10`） | $M$ 无环 $\iff \check{H}^{n}(M) = 0$（$n \ne 0$） | 无候选（aka 里只有书号） |
| `prop.chaus-cech-eq-h` | 紧 Hausdorff 上 Čech 就是上同调 | （只有书号：`Proposition 7.3.11` / `Prop 7.3.11`） | 紧 Hausdorff：$\check{H}^{n}(X, M) = H^{n}(X, M)$ | 无候选（aka 里只有书号） |
| `prop.filtered-limit-cohomology` | 滤过极限的上同调 | （只有书号：`Proposition 7.3.12` / `Prop 7.3.12`） | 紧 Hausdorff 的滤过极限上，常值系数的上同调是余极限 | 无候选（aka 里只有书号） |
| `prop.stone-acyclic` | Stone 空间上的上同调为零 | （只有书号：`Exercise 7.50`） | Stone 空间：$H^{n}(S, M) = 0$（$n \ne 0$） | 无候选（aka 里只有书号） |
| `prop.topos-morphism-derived` | 拓扑斯态射的导出函子 | （只有书号：`Proposition 7.4.1` / `Prop 7.4.1`） | $R^{n}f_{*}M$ 是 $X' \mapsto H^{n}(f^{-1}(X'), M)$ 的层化 | 无候选（aka 里只有书号） |
| `cor.homotopy-invariant-cohomology` | 层上同调是同伦不变量 | （只有书号：`Proposition 7.4.2` / `Corollary 7.4.3`） | 同伦等价的映射给同构的上同调 | 无候选（aka 里只有书号） |
| `prop.ab5-implications` | AB5 与 AB3*/AB4* 的关系 | （只有书号：`Proposition 5.2.7`） | AB 公理之间的蕴含关系 | 无候选（aka 里只有书号） |
| `prop.ab-axioms-examples` | AB 公理的例子表 | — | 哪些范畴满足哪些 AB 公理 | 无候选（aka 与 title 都没有英文） |
| `method.simplicial-cohomology` | 单纯方法算层上同调 | `hypercover` / `Godement` | 用单纯超覆盖计算 $H^{n}(X, M)$ | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.cartan-eilenberg` | Cartan–Eilenberg 分解 | `Cartan-Eilenberg` | Cartan–Eilenberg 分解（双复形内射消解） | 零命中（候选没出现在 title 里） |
| `prop.cech-section-vanishing` | 带截面的覆盖上 Čech 零调 | （只有书号：`Proposition 7.3.3` / `Prop 7.3.3`） | 命题：满射有截面时增广 Čech 复形同伦平凡 | 无候选（aka 里只有书号） |
| `prop.cohomology-of-coproduct` | 上同调与不交并 | （只有书号：`Exercise 7.38`） | 命题：$H^{n}(\coprod_{i} X_{i}, M) \cong \prod_{i} H^{n}(X_{i}, | 无候选（aka 里只有书号） |
| `prop.tensor-rhom-natural-map` | 张量与 RHom 的配对 | （只有书号：`Exercise 8.16`） | 命题：$M \otimes^{\mathbf{L}} \operatorname{RHom}(P, N) \to \op | 无候选（aka 里只有书号） |
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
