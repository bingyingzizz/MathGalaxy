# 英文名缺口清单

> ⚠️ **自动生成，勿手改** —— 本文件由 `bun tools/i18n-backfill.mjs` 从
> `src/data/aliases.js`（aka）+ 各节点 `title` 现算，每次跑都会整份覆盖。
> 要改内容：改**真源**，然后重跑；直接编辑本文件会在 `--check` 里报「过期」。

**这个清单是干什么的**：把「机械规则填不出英文名」的节点摊开，按星系分组、
每行带候选集 —— 它是**给作者（或来接活的协作者）补名字用的工作面板**，不是产物。
**这里一个名字都没猜过**：能机械定的已经写进 `src/data/i18n.js`（同样是生成物）。

## 认领方式（怎么把一条缺口填掉）

1. 在表里挑一条（或一片），记下节点 id；
2. 打开 `src/data/aliases.js`，在**该节点的 `aka` 数组里加上英文名**（或给它加 `en:` 字段，见下）
   （唯一真源就是这里 —— ⛔ 别去改 `src/data/i18n.js`，那是生成物）；
   · 加完要让 aka 里**恰好只剩一条「名字样」英文条目**，一级规则才认；
   · ⭐ **aka 里本来就有两三条合法英文别名时**（`ax.choice` → axiom of choice / Zorn），
     别删别名（那会伤站内搜索）—— 改成给记录加一个显式字段：
     `{ id: 'ax.choice', en: 'axiom of choice', aka: [...] }`。
     `en` 是**零级**规则：有它就直接用，绕过一切歧义判定，也不进内文跳转；
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
| ✅ 一级填入（`from: aka` / `from: title`） | 259 | 20.1% | aka 里恰好一条名字样英文 |
| ✅ 二级填入（`from: aka-title`） | 3 | 0.2% | title 里恰好命中一个 aka 候选 —— 清单见 `i18n/second-tier.md`（可整批回滚）|
| ⛔ 缺口 | 460 | 35.7% | 下面第二节逐条列 |
| **合计** | **1288** | 100% | 覆盖 828（64.3%），缺口 460 |

## 二、缺口为什么填不了（互斥，合计 = 缺口数）

| 桶 | 节点数 | 意思 |
|---|---|---|
| ⚠️ 歧义（二级也没捞着） | 16 | aka 里有 ≥2 条英文写法，且 title 里没出现其中一个 |
| ⚠️ 只有缩写 | 11 | aka 里只有 AC / FOL / sup / MCT a.e. 这种缩写 |
| ⚠️ 只有书号 | 186 | aka 里只有 Exercise 2.25 / Theorem 8.3.9 这种坐标（搜索用，不是名字）|
| ⚠️ 只有 title 有 | 10 | aka 没有英文，但 title 括号里是英文 |
| ⛔ 完全没有 | 237 | aka 与 title 都没有英文名 |
| **合计** | **460** | = 全部节点 1288 − 已覆盖 828 |

⚠️ **口径提醒**：脚本内部的分桶是在**二级之前**做的，所以「歧义」原始数是 19，其中 **3** 条被二级捞走了 —— 上表用的是减完的 16。
两张表各自互斥、各自合计对得上；⛔ 别把两张表的行混着加。

---

## 缺口按星系分组（460）

每行都带上候选集，方便照着 `aliases.js` 补。同一节点属多个星系时只列在第一个里。

### 数学分析 · `analysis`（43）

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

### 抽象代数 · `algebra`（6）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `prop.group-basic` | 群的基本性质 | — | 命题：群的消去律与逆的公式 | 无候选（aka 与 title 都没有英文） |
| `prop.ideal-basic` | 理想的运算与商环泛性质 | — | 命题：理想的交、和、积与商环的泛性质 | 无候选（aka 与 title 都没有英文） |
| `prop.prime-ideal` | 素理想与极大理想 | — | 命题：素理想、极大理想与商环 | 无候选（aka 与 title 都没有英文） |
| `ex.algebra-categories` | 代数的几个范畴 | `Mon` / `Gr` / `Rng` / `G-Set` / `A-Mod` / `k-Alg` | $\mathrm{Mon}$、$\mathrm{Gr}$、$\mathrm{Rng}$、$G\text{-}\mathb | 多命中：`Mon` / `Gr` / `Rng` |
| `prop.ring-tensor-coproduct` | 交换环的纤维余积是张量积 | （只有书号：`Exercise 1.29`） | 交换环的推出 = 张量积 | 无候选（aka 里只有书号） |
| `prop.zmod-is-ab` | Z-模就是阿贝尔群 | （只有书号：`Exercise 1.10`） | 命题：$\mathbb{Z}\text{-}\mathbf{Mod} \cong \mathbf{Ab}$、$\math | 无候选（aka 里只有书号） |

### 同调代数 · `homology`（145）

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
| `def.etale-space` | étale 空间 | — | étale 空间（espace étalé） | 无候选（aka 没英文，title 里有） |
| `def.etale-sheaf` | étale 层 | — | $X_{\text{et}}$ 上的 étale 层 | 无候选（aka 与 title 都没有英文） |
| `prop.etale-sheaf-examples` | étale 层的例子 | — | 开浸入、有限 étale 覆叠、常值层 | 无候选（aka 与 title 都没有英文） |
| `def.ab-axioms` | Grothendieck 的 AB 公理 | （只有书号：`Definition 5.2.5`） | Grothendieck 的 AB 公理（AB1–AB6） | 无候选（aka 里只有书号） |
| `prop.complex-additive` | 复形范畴是加法范畴 | （只有书号：`Exercise 7.1` / `Exercise 7.7`） | 复形范畴的性质 | 无候选（aka 里只有书号） |
| `def.distinguished-triangle` | 导出三角 | `distinguished triangle` / `triangle` | 导出三角 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.triangle-morphism` | 三角态射的性质 | （只有书号：`Proposition 7.1.9` / `Prop 7.1.9`） | 导出三角之间态射的性质 | 无候选（aka 里只有书号） |
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
| `prop.ext-is-rhom` | Ext 就是导出 Hom | （只有书号：`Proposition 7.2.10` / `Prop 7.2.10`） | $R^{n}\operatorname{Hom}(M, K^{\bullet}) = \operatorname{Ext | 无候选（aka 里只有书号） |
| `prop.leray-acyclicity` | Leray 零调性 | （只有书号：`Proposition 7.2.12` / `Prop 7.2.12`） | Leray 零调性：零调复形算导出函子 | 无候选（aka 里只有书号） |
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
| `prop.total-complex-injective-resolution` | 全复形还是内射消解 | （只有书号：`Exercise 7.34`） | 命题：全复形 $I^{\bullet}$ 仍是 $K^{\bullet}$ 的内射消解 | 无候选（aka 里只有书号） |
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

### 拓扑学 · `topology`（34）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
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
| `def.metrizable` | 可度量化空间 | — | 拓扑可由一个度量给出 | 无候选（aka 与 title 都没有英文） |
| `thm.metric-paracompact` | 斯通定理 | — | 度量空间必为仿紧空间 | 无候选（aka 与 title 都没有英文） |
| `thm.urysohn-metrization` | 乌雷松度量化定理 | — | 正则且第二可数的空间可度量化 | 无候选（aka 与 title 都没有英文） |
| `thm.nagata-smirnov` | 局部有限基度量化定理 | — | 正则且基为可数层局部有限族的空间可度量化 | 无候选（aka 与 title 都没有英文） |
| `thm.bing-metrization` | 离散基度量化定理 | — | 正则且基为可数层离散族的空间可度量化 | 无候选（aka 与 title 都没有英文） |
| `prop.metrizable-normal` | 可度量化空间的性质 | — | 可度量化空间正规、仿紧且第一可数 | 无候选（aka 与 title 都没有英文） |
| `def.projective-object` | 投射 / 内射对象 | `projective object` / `injective object` | 投射对象与内射对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
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
| `prop.closed-inclusion-filtered-limit` | 紧块沿闭含入拼出的空间 | （只有书号：`Proposition 2.3.9` / `Exercise 2.42`） | 紧 Hausdorff 块沿闭含入的滤过余极限 | 无候选（aka 里只有书号） |
| `prop.continuous-map-space-metric` | 紧 Hausdorff 上的函数空间是度量空间 | （只有书号：`Exercise 2.29`） | 命题：$S$ 紧 Hausdorff、$X$ （半）度量（完备）$\implies C(S, X)$ 也是 | 无候选（aka 里只有书号） |
| `prop.weak-hausdorff-k-closed` | 弱 Hausdorff 的对角线与核 | （只有书号：`Exercise 2.36` / `Exercise 2.37`） | 命题：对角线 $k$-闭 $\iff$ 弱 Hausdorff；$\ker(f,g)$ 也 $k$-闭 | 无候选（aka 里只有书号） |

### 微分几何 · `diffgeom`（94）

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

### 复变函数 · `complex`（21）

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

### 范畴论 · `category`（68）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.final-initial` | 终对象 / 始对象 | `terminal object` / `initial object` | 终对象与始对象 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.adjoint` | 伴随函子 | `adjoint functor` / `adjunction` | 伴随函子 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.adjunction-unit` | 单位与余单位 | `unit` / `counit` | 单位与余单位 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.limit-adjoint` | 极限即伴随 | （只有书号：`Proposition 1.5.4` / `Prop 1.5.4`） | 极限 $\iff$ 常图函子有伴随 | 无候选（aka 里只有书号） |
| `thm.right-adjoint-preserves-limits` | 右伴随保极限 | `RAPL` | 右伴随保持所有极限 | 零命中（候选没出现在 title 里） |
| `prop.reflective-limits` | 反射子范畴里的极限 | （只有书号：`Exercise 1.64` / `Exercise 1.70`） | 反射子范畴中的极限与余极限 | 无候选（aka 里只有书号） |
| `def.grothendieck-topology` | Grothendieck 拓扑 | `Grothendieck topology` / `site` | Grothendieck 拓扑与景 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.cech-properties` | Čech 函子的性质 | （只有书号：`Lemma 3.2.6`） | Čech 函子的三条性质 | 无候选（aka 里只有书号） |
| `thm.sheafification` | 层化 | `sheafification` / `sheafify` | 层化：层范畴是预层范畴的反射子范畴 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `def.universal-colimit` | 万有关系 | `universal colimit` / `disjoint coproduct` | 万有余极限、万有满态射、不交余积 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `prop.site-properties` | 景的层范畴的好性质 | （只有书号：`Exercise 3.24`） | Grothendieck 拓扑下的层范畴 | 无候选（aka 里只有书号） |
| `prop.sheafify-equivalence` | 层化与等价关系交换 | （只有书号：`Exercise 3.17` / `Exercise 3.28`） | 层化保持等价关系与商 | 无候选（aka 里只有书号） |
| `prop.covering-sieve-epi` | 覆盖筛即余积满射 | （只有书号：`Corollary 3.2.13` / `Cor 3.2.13`） | 覆盖族生成覆盖筛 $\iff$ 余积满射 | 无候选（aka 里只有书号） |
| `prop.disjoint-universal` | 不交万有余积与次标准拓扑 | （只有书号：`Exercise 3.29`） | 不交万有余积在次标准拓扑下不变 | 无候选（aka 里只有书号） |
| `prop.subobject-lattice` | 子对象构成有界格 | （只有书号：`Exercise 3.33`） | 预拓扑斯中子对象构成有界格 | 无候选（aka 里只有书号） |
| `prop.precanonical-sheaf` | 预标准拓扑下的层 | （只有书号：`Exercise 3.36` / `Proposition 3.3.3`） | 预标准拓扑下「层」的两条等式 | 无候选（aka 里只有书号） |
| `prop.precanonical-preserves` | 余积与商在层范畴中不变 | — | 预标准拓扑下余积与商不变 | 无候选（aka 与 title 都没有英文） |
| `prop.precanonical-mono-epi` | 单满在层化后不变 | （只有书号：`Exercise 3.38`） | 预标准拓扑下单态射与满态射不变 | 无候选（aka 里只有书号） |
| `def.generator` | 生成元集 | `generator` / `set of generators` | 生成元集与生成元 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.representable-quotient` | 可表示性的下降 | — | 可表示性的下降引理 | 无候选（aka 与 title 都没有英文） |
| `prop.topos-covering-epi` | 拓扑斯中覆盖即余积满射 | （只有书号：`Exercise 3.41`） | 拓扑斯中的覆盖 | 无候选（aka 里只有书号） |
| `prop.topos-sheaf-limits` | 拓扑斯上的层即保极限的预层 | （只有书号：`Exercise 3.42`） | 拓扑斯上的层 $\iff$ 保持所有极限 | 无候选（aka 里只有书号） |
| `prop.quasi-compact-properties` | 拟紧的性质 | （只有书号：`Exercise 3.46` / `Proposition 3.3.9`） | 拟紧对象的性质 | 无候选（aka 里只有书号） |
| `thm.pretopos-qcqs` | 预拓扑斯由拓扑斯唯一确定 | `qcqs` | 预拓扑斯 $\simeq$ 拟紧拟分离层 | 零命中（候选没出现在 title 里） |
| `prop.sieve-covering-equivalent` | 覆盖筛的四条等价 | （只有书号：`Proposition 3.2.12` / `Prop 3.2.12`） | 覆盖筛的等价刻画（$\widetilde{R} \simeq \underline{X}$） | 无候选（aka 里只有书号） |
| `prop.left-adjoint-unique` | 左伴随唯一 | （只有书号：`Exercise 1.58`） | 同一个右伴随的左伴随在同构意义下唯一 | 无候选（aka 里只有书号） |
| `prop.counit-epi-iff-faithful` | 余单位与忠实性 | （只有书号：`Exercise 1.60`） | $G$ 忠实 $\iff$ 余单位是满 | 无候选（aka 里只有书号） |
| `prop.constant-sheaf-preserves-limits` | 常层函子保极限 | （只有书号：`Exercise 3.49`） | 命题：常（预）层函子 $\Delta$ 保所有极限 | 无候选（aka 里只有书号） |
| `prop.kan-extension-adjoint` | Kan 延拓与伴随的存在性 | （只有书号：`Proposition 1.5.10` / `Prop 1.5.10`） | 命题：$p^{-1}$ 有左伴随 $\iff$ 沿 $p$ 的 Kan 延拓都存在 | 无候选（aka 里只有书号） |
| `prop.kan-extension-exists` | 有余极限时 Kan 延拓总存在 | （只有书号：`Proposition 1.5.11` / `Prop 1.5.11`） | 命题：$\mathcal{D}$ 有余极限 $\implies$ 沿 $p$ 的左 Kan 延拓总存在 | 无候选（aka 里只有书号） |
| `def.associated-sheaf` | 关联层 | （只有书号：`Definition 3.2.10` / `Def 3.2.10`） | 定义：$X^{\sharp} := h_{X}^{\#}$ | 无候选（aka 里只有书号） |
| `thm.induced-topos-morphism` | 任意函子诱导拓扑斯态射 | （只有书号：`Theorem 3.4.2` / `Thm 3.4.2`） | 定理：$\hat{g}_{!} \dashv \hat{g}^{-1} \dashv \hat{g}_{*}$，于是 $ | 无候选（aka 里只有书号） |
| `prop.topos-morphism-abelian-adjunction` | 拓扑斯态射在阿贝尔群上给出伴随 | （只有书号：`Exercise 7.51`） | 命题：$f^{-1} \dashv f_{*}$ 升级到 $\mathcal{T}(\mathbf{Ab})$ | 无候选（aka 里只有书号） |
| `prop.inverse-image-tensor` | 拉回与内 Hom、张量积相容 | （只有书号：`Exercise 7.52` / `Exercise 3.51`） | 命题：$f_{*}\operatorname{Hom}(f^{-1}M, N) = \operatorname{Hom} | 无候选（aka 里只有书号） |
| `prop.abelian-slice-adjunction` | 切片上的正合左伴随 | （只有书号：`Exercise 7.57`） | 命题：$j_{X!} \dashv j_{X}^{-1}$ 且 $j_{X!}$ 正合 | 无候选（aka 里只有书号） |
| `prop.slice-shriek-z` | 切片左伴随作用在 Z 上 | （只有书号：`Exercise 7.58`） | 命题：$j_{X!}\mathbb{Z} = \mathbb{Z}\cdot X$ | 无候选（aka 里只有书号） |
| `prop.cohomology-slice-identification` | 切片上的上同调就是原上同调 | （只有书号：`Exercise 7.59`） | 命题：$H^{n}\bigl(\mathbf{1}_{X}, j_{X}^{-1}M^{\bullet}\bigr) = | 无候选（aka 里只有书号） |
| `prop.internal-hom-slice-value` | 内 Hom 的取值 | （只有书号：`Exercise 7.60` / `Exercise 3.66`） | 命题：$\operatorname{Hom}_{\mathbb{Z}}(M, N)(X) = \operatorname | 无候选（aka 里只有书号） |
| `prop.slice-shriek-projection` | 切片的投影公式 | （只有书号：`Exercise 7.61`） | 命题：$j_{X!}(M \otimes j_{X}^{-1}N) = j_{X!}M \otimes N$ | 无候选（aka 里只有书号） |
| `prop.adjunction-extends-to-diagrams` | 伴随延拓到图范畴 | （只有书号：`Exercise 1.63`） | 命题：$F \dashv G \implies F_{I} \dashv G_{I}$（逐点） | 无候选（aka 里只有书号） |
| `prop.kan-extension-fully-faithful` | 全忠实沿自身的 Kan 延拓 | （只有书号：`Exercise 1.74`） | 命题：$p$ 全忠实 $\implies p_{!}F \circ p \cong F$ | 无候选（aka 里只有书号） |
| `prop.covering-sieves-filter` | 覆盖筛构成滤子 | （只有书号：`Exercise 3.11`） | 命题：$J(X)$ 是筛的序集上的滤子 | 无候选（aka 里只有书号） |
| `prop.site-covering-families-pretopology` | 覆盖族构成预拓扑 | （只有书号：`Exercise 3.14`） | 命题：景里所有生成覆盖筛的族构成预拓扑 | 无候选（aka 里只有书号） |
| `prop.sheafification-image` | 层化与像交换 | （只有书号：`Exercise 3.20`） | 命题：$\operatorname{im}(T^{\#} \to T'^{\#}) = \bigl(\operatorn | 无候选（aka 里只有书号） |
| `prop.sheafification-slice-colimit` | 层化是切片上的余极限 | （只有书号：`Exercise 3.26`） | 命题：$T^{\#} \cong \varinjlim_{X \in \mathcal{C}/T} X$ | 无候选（aka 里只有书号） |
| `prop.sheaf-hom-computed-in-presheaves` | 层之间的 Hom 在预层里算 | （只有书号：`Exercise 3.45`） | 命题：$\operatorname{Hom}_{\widetilde{\mathcal{C}}}(T^{\#}, F)  | 无候选（aka 里只有书号） |
| `prop.inverse-image-constant-sheaf` | 常层沿拉回不变 | （只有书号：`Exercise 3.50`） | 命题：$f^{-1}\overline{E} = \overline{E}$ | 无候选（aka 里只有书号） |
| `prop.stalk-of-sheafification` | 层化不改变茎 | （只有书号：`Exercise 3.57`） | 命题：$(T^{\#})_{x} = T_{x}$ | 无候选（aka 里只有书号） |
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
| `prop.adjunction-naturality` | 伴随双射的自然性 | （只有书号：`Exercise 1.55`） | 命题：$\Phi$ 自然的显式写法 | 无候选（aka 里只有书号） |
| `prop.forgetful-adjoints-examples` | 遗忘函子的伴随 | （只有书号：`Exercise 1.56`） | 命题：自由 $\dashv$ 遗忘、层化 $\dashv$ 含入、$k$-化 $\dashv$ 含入 | 无候选（aka 里只有书号） |
| `prop.currying` | 函数的柯里化 | （只有书号：`Exercise 1.57`） | 命题：$X \mapsto X \times Y \;\dashv\; Z \mapsto \mathbf{Set}(Y | 无候选（aka 里只有书号） |
| `prop.unit-counit-examples` | 常见伴随的单位与余单位 | （只有书号：`Exercise 1.61`） | 命题：从单位/余单位读出忠实性 | 无候选（aka 里只有书号） |
| `prop.copowers-give-adjoint` | 有余幂则可表示函子有伴随 | （只有书号：`Exercise 1.62`） | 命题：$\mathcal{C}$ 有余幂 $\implies$ $X^{(I)} \dashv h_{X}$ | 无候选（aka 里只有书号） |
| `prop.reflection-criterion` | 反射的判据 | （只有书号：`Exercise 1.71`） | 命题：$F$ 是反射 $\iff$ 存在 $\alpha_{X} : X \to F(X)$，在 $\mathcal{C | 无候选（aka 里只有书号） |
| `prop.coreflective-monoids-full` | 余反射子范畴上的幺半群 | （只有书号：`Exercise 1.72`） | 命题：$\mathcal{C}'$ 余反射 $\implies \mathrm{Mon}(\mathcal{C}')$  | 无候选（aka 里只有书号） |
| `prop.slice-covering-sieve` | 切片里的覆盖筛 | （只有书号：`Exercise 3.62`） | 命题：$R$ 在 $\mathcal{C}/T$ 里覆盖 $\iff$ $\hat j_{T!}R$ 在 $\mathc | 无候选（aka 里只有书号） |

### 凝聚态数学 · `condensed`（49）

| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |
|---|---|---|---|---|
| `def.chaus-pretopos` | 紧 Hausdorff 空间构成预拓扑斯 | （只有书号：`Proposition 4.1.1` / `Corollary 4.1.2`） | $\mathbf{CHaus}$ 是预拓扑斯 | 无候选（aka 里只有书号） |
| `prop.condensed-criterion` | 凝聚态集的刻画 | （只有书号：`Proposition 4.1.4`） | 预层是凝聚态集的两条判据 | 无候选（aka 里只有书号） |
| `prop.fchaus-pretopology` | 有限紧 Hausdorff 空间上的预拓扑 | （只有书号：`Exercise 4.1`） | 有限不交并给出自由紧 Hausforff 空间上的预拓扑 | 无候选（aka 里只有书号） |
| `prop.fchaus-sheaf` | 有限紧 Hausdorff 空间上层的判据 | （只有书号：`Exercise 4.2`） | 自由紧 Hausforff 空间上的层 $\iff$ 保有限积 | 无候选（aka 里只有书号） |
| `thm.cond-equiv-fchaus` | 凝聚态集就是有限紧 Hausdorff 空间上的层 | （只有书号：`Theorem 4.1.7`） | $\mathrm{Cond} \simeq \widehat{\mathbf{FCHaus}}$ | 无候选（aka 里只有书号） |
| `prop.cond-epi` | 凝聚态集满态射的判据 | （只有书号：`Proposition 4.1.8`） | 凝聚态集的满态射 | 无候选（aka 里只有书号） |
| `prop.cond-projectives` | Cond 有足够多投射对象 | （只有书号：`Exercise 4.3`） | $\mathrm{Cond}$ 的投射对象 | 无候选（aka 里只有书号） |
| `thm.top-cond-adjoint` | Top 与 Cond 的伴随 | `kTop` | $\mathbf{Top} \to \mathrm{Cond}$ 与它的伴随 | 零命中（候选没出现在 title 里） |
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
| `prop.cond-limits-colimits` | Cond 的极限与余极限 | （只有书号：`Corollary 4.1.6`） | $\mathrm{Cond}$ 的极限逐点算，余极限要先层化 | 无候选（aka 里只有书号） |
| `prop.cond-equivalence-effective` | Cond 的等价关系有效 | `effective equivalence relation` / `Giraud` | $\mathrm{Cond}$ 中每个等价关系都是有效的 | 零命中（aka 有 2 条候选，title 里一条都没出现） |
| `lem.cech-finite-disjoint-acyclic` | 有限不交覆盖的 Čech 零调 | （只有书号：`Exercise 8.1`） | 引理：紧 Hausdorff 空间上有限不交覆盖的 Čech 高次为零 | 无候选（aka 里只有书号） |
| `prop.condab-discrete-acyclic` | 离散空间上零调 | （只有书号：`Exercise 8.2`） | 命题：凝聚态阿贝尔群在离散空间与「离散 $\times$ Stonean」上零调 | 无候选（aka 里只有书号） |
| `prop.condab-quotient-r-disc` | R/R_disc 在 Stone 上的截面 | （只有书号：`Exercise 8.3`） | 命题：$Q = \mathbb{R}/\mathbb{R}^{\mathrm{disc}}$ 的截面是连续函数模局部常值 | 无候选（aka 里只有书号） |
| `cor.ext-cond-set-section` | Ext 的截面公式 | （只有书号：`Exercise 8.8`） | 推论：$\operatorname{Ext}^{n}(\mathbb{Z}\cdot X, N)(S) \cong H^ | 无候选（aka 里只有书号） |
| `prop.rhom-zs-sections` | Stonean 空间上自由模的导出 Hom | （只有书号：`Exercise 8.9`） | 命题：$\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z}[S], N) \cong | 无候选（aka 里只有书号） |
| `prop.rhom-ze-powers` | 离散空间上自由模的导出 Hom | （只有书号：`Exercise 8.10`） | 命题：$\operatorname{RHom}_{\mathbb{Z}}(\mathbb{Z}[E], N) \cong | 无候选（aka 里只有书号） |
| `prop.discrete-cond-rhom-constant` | 离散群的导出 Hom 是常层 | （只有书号：`Exercise 8.11`） | 命题：离散阿贝尔群的导出 Hom 与导出张量积都落在常层里 | 无候选（aka 里只有书号） |
| `prop.k-bounded-exact-filtered-colimit` | K-有界正合沿滤过余极限保持 | （只有书号：`Exercise 8.4`） | 命题：等距转移下的滤过余极限保持 $K$-有界正合 | 无候选（aka 里只有书号） |
| `prop.continuous-functions-normed` | 连续函数空间的范数 | （只有书号：`Exercise 8.5`） | 命题：$C(S, M)$ 是（半）范数 / Banach 阿贝尔群，且 Stone 上离散值函数稠密 | 无候选（aka 里只有书号） |
| `cor.cond-ktop-finite-products` | 底空间保有限积 | （只有书号：`Corollary 4.2.7` / `Cor 4.2.7`） | 推论：$(X \times Y)(\cdot) \;\cong\; k\bigl(X(\cdot) \times Y(\ | 无候选（aka 里只有书号） |
| `prop.projection-formula-cond` | 投影公式 | （只有书号：`Exercise 4.11`） | 投影公式：$S \times X(\cdot) \cong (S \times X)(\cdot)$ | 无候选（aka 里只有书号） |
| `prop.cond-epi-open-surjective` | 开满射是满态射 | （只有书号：`Proposition 4.2.5` / `Prop 4.2.5`） | 命题：开满 + 弱 Hausdorff $\implies$ 在 $\mathrm{Cond}$ 里满 | 无候选（aka 里只有书号） |
| `prop.open-covering-covering` | 开覆盖给出覆盖 | （只有书号：`Exercise 4.6`） | 命题：开覆盖 $X = \bigsqcup_{i} X_{i}$ $\implies$ 它是覆盖 | 无候选（aka 里只有书号） |
| `prop.hom-presheaf-sheaf` | Hom 预层是层 | （只有书号：`Exercise 4.7`） | 命题：$U \mapsto \operatorname{Hom}_{/X}(U, Y)$ 是 $X$ 上的层 | 无候选（aka 里只有书号） |
| `prop.countable-colimit-qseparated` | 可数递增余极限是拟分离的 | （只有书号：`Exercise 4.12`） | 命题：$X = \varinjlim_{n} S_{n}$（含入、可数）$\implies$ 拟分离 | 无候选（aka 里只有书号） |
| `prop.qseparated-mono` | 拟分离嵌入底空间 | （只有书号：`Exercise 4.13`） | 命题：$X$ 拟分离 $\implies$ $X \hookrightarrow X(\cdot)$ 是单态射 | 无候选（aka 里只有书号） |
| `prop.discrete-iff-constant` | 离散即常 | （只有书号：`Exercise 4.5`） | 命题：$X$ 离散 $\iff$ 常 $\iff$ 只依赖紧 Hausdorff 的离散商 | 无候选（aka 里只有书号） |
| `prop.underlying-preserves-coproduct` | 底函子保不交并 | （只有书号：`Exercise 4.8`） | 命题：$X = \coprod_{i} X_{i}$ $\implies$ $\underline{X} = \copr | 无候选（aka 里只有书号） |
