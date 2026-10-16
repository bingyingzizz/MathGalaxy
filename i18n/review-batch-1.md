# 英文陈述批次 1 · 待作者审校（T3.2）

> 批次：**T3.2 批次 1**（2026-10-16）。范围 = **枢纽榜前 10 名**里还没有译文的 8 个
> （前两名 `lem.zorn` / `thm.first-iso` 已在试点里，见 `statements.en.js` 开头）。
> 本批共 **11 条** 英文陈述/说明（试点 3 + 本批 8）。
>
> ⭐ **状态是逐条的**（作者 2026-10-16 拍板 · 决策二.3）—— 不再是整份文件一个 `status`：
> 每条 = 一个节点 × 一个字段（`statement` / `notes`），各自带
> `status`（draft / reviewed）+ `basedOn`（`内容版本#中文底稿指纹`）+ `reviewed`。
> **只有作者能改成 `reviewed`**；改哪一条都不影响别的条。
> 本批的计数见下面「零、逐条状态」。
>
> 译文位置：`src/data/i18n/statements.en.js`（按 id 旁挂，中文页 `src/data/packs/*.js` 是真源）。
> 产物：`dist/nodes/<id>.en.md` 里的 `## Statement` / `## Notes` 两节（标题上带该字段自己的状态）。
> 公式体检：`bun tools/_stcheck.mjs` → 11 个节点 / 22 个字段 / 行内公式 221 · 块级 13 · **失败 0**。
> 状态体检：`bun tools/i18n-status.mjs`（默认只报不写；改完内容一定要跑一次）。

---

## 零、逐条状态（本批 33 条 = 11 条摘要 + 11 条陈述 + 11 条说明）

**rollup：reviewed 0 · draft 33 · stale 0**（内容版本 `v0.9.1`，2026-10-16 现算）。

| 部分 | 条数 | reviewed | draft | stale |
|---|---|---|---|---|
| 英文摘要 `abstract_en`（这 11 个节点都在枢纽榜前 30 里，都有摘要） | 11 | 0 | 11 | 0 |
| 英文陈述 `statement` | 11 | 0 | 11 | 0 |
| 英文说明 `notes` | 11 | 0 | 11 | 0 |
| **合计** | **33** | **0** | **33** | **0** |

**逐条清单**（`basedOn` 的 `#` 后面是**中文底稿指纹** —— 中文那句话改了，那一行自动变 stale）：

| 条目 | 摘要 | 陈述 | 说明 |
|---|---|---|---|
| `lem.zorn` | draft | draft | draft |
| `thm.first-iso` | draft | draft | draft |
| `def.metric-space` | draft | draft | draft |
| `def.cauchy-null` | draft | draft | draft |
| `def.representable` | draft | draft | draft |
| `def.abelian-category` | draft | draft | draft |
| `def.product-measure` | draft | draft | draft |
| `prop.cg-coreflective` | draft | draft | draft |
| `thm.topos-abelian-grothendieck` | draft | draft | draft |
| `prop.nbv-derivative` | draft | draft | draft |
| `thm.ring-monotone-sigma` | draft | draft | draft |

> 完整的 `basedOn` 值（33 行）用
> `bun tools/i18n-status.mjs --md --ids lem.zorn,thm.first-iso,…` 随时可再打印一份；
> ⛔ 那份表的 `basedOn` 是**记录**不是**开关** —— 消掉 stale 的唯一办法是重新对稿。

---

## 一、逐条对照（陈述部分，这是被引用的最小单位）

### 3. `def.cauchy-null`　Cauchy 列与零列

| | |
|---|---|
| **中文原文** | 设 $(x_n)$ 是**有理数列**（即函数 $\omega \to \mathbb{Q}$），$\|x\|$ 是 $\mathbb{Q}$ 上的绝对值，$\varepsilon$ 一律取**正有理数**（此时还不需要实数）。$(x_n)$ 是 **Cauchy 列**：$\forall \varepsilon > 0,\ \exists N,\ \forall m, n \ge N : \|x_m - x_n\| < \varepsilon$ …（三段公式） |
| **英文译文** | Let $(x_n)$ be a **sequence of rational numbers** (that is, a function $\omega \to \mathbb{Q}$), let $\|x\|$ be the absolute value on $\mathbb{Q}$, and let $\varepsilon$ always range over **positive rationals** (no real numbers are needed yet). … $(x_n)$ is a **Cauchy sequence** … **null sequence** … Two Cauchy sequences are **equivalent**. |

### 4. `def.representable`　表示函子

| | |
|---|---|
| **中文原文** | 设 $F : \mathcal{C} \to \mathbf{Set}$ 是函子。**（一）万有元素。** 对象 $X \in \mathcal{C}$ 连同一个元素 $s \in F(X)$ 叫对 $F$ **万有**，如果 $\forall Y \in \mathcal{C},\ \forall t \in F(Y),\ \exists! \, f : X \to Y,\ F(f)(s) = t$。这时也说 $F$ 被 $(X, s)$ **表示**。**（二）可表示。** 若 $F \cong \operatorname{Hom}_{\mathcal{C}}(X, -)$，就说 $F$ 被 $X$ **表示**，$X$ 叫 $F$ 的**表示对象**。 |
| **英文译文** | Let $F : \mathcal{C} \to \mathbf{Set}$ be a functor. **(i) Universal element.** An object $X \in \mathcal{C}$ together with an element $s \in F(X)$ is called **universal** for $F$ if … One then also says that $F$ is **represented** by $(X, s)$. **(ii) Representable.** If $F \cong \operatorname{Hom}_{\mathcal{C}}(X, -)$, one says that $F$ is **represented** by $X$, and $X$ is called a **representing object** of $F$. |

### 5. `def.abelian-category`　加法 / 阿贝尔范畴

| | |
|---|---|
| **中文原文** | ● **预加法范畴**（$\mathbf{Ab}$-范畴）是每个 $\operatorname{Hom}$ 集都带有阿贝尔群结构、且复合双线性的范畴；● **零对象**是 $\operatorname{End}(M) = 1$ 的对象；$M$ 是 $M_1, M_2$ 的**直和** $M = M_1 \oplus M_2$，如果存在 $p_k, i_k$ 使 $p_1 i_1 = 1$、$p_2 i_2 = 1$、$i_1 p_1 + i_2 p_2 = 1_M$；● **加法范畴**…● **预阿贝尔范畴**…● **阿贝尔范畴**是满足下列**等价**条件之一的预阿贝尔范畴：1. 每个单态射都是正则的…4. 对每个 $f : M \to N$ 有 $\ker(N \to \operatorname{coker} f) \cong \operatorname{coker}(\ker f \to M)$。 |
| **英文译文** | - A **preadditive category** (an $\mathbf{Ab}$-category) is a category in which every $\operatorname{Hom}$ set carries an abelian group structure and composition is bilinear; - A **zero object** … - An **additive category** … - A **preabelian category** … - An **abelian category** … 1. every monomorphism is regular (dually, every epimorphism is regular); … 4. for every $f : M \to N$, $\ker(N \to \operatorname{coker} f) \cong \operatorname{coker}(\ker f \to M)$. |

### 6. `def.product-measure`　乘积测度

| | |
|---|---|
| **中文原文** | **① 矩形**：形如 $A \times B$ 的集合叫（可测）矩形。全体矩形**生成** $\mathcal{M} \otimes \mathcal{N}$。**② 矩形上的预测度**：令 $\mathcal{A}$ 为**矩形的有限不交并**全体 … $\mu_0(E) := \sum_j \mu(A_j)\nu(B_j)$ … 则 $\mu_0$ 是代数 $\mathcal{A}$ 上的**预测度**。**③ 扩张**：$\mu_0$ 诱导 $X \times Y$ 上的外测度，限制在 $\mathcal{M} \otimes \mathcal{N}$ 上得到一个测度，记作 $\mu \times \nu$，即**乘积测度**。 |
| **英文译文** | **① Rectangles**: sets of the form $A \times B$ … are called (measurable) rectangles. All rectangles **generate** $\mathcal{M} \otimes \mathcal{N}$. **② Premeasure on rectangles**: let $\mathcal{A}$ be the collection of all **finite disjoint unions of rectangles** … Then $\mu_0$ is a **premeasure** on the algebra $\mathcal{A}$. **③ Extension**: … that is, the **product measure**. |

### 7. `prop.cg-coreflective`　紧生成空间是余反射子范畴

| | |
|---|---|
| **中文原文** | 紧生成空间构成的范畴 $k\mathbf{Top}$ 是 $\mathbf{Top}$ 的**余反射子范畴**：含入函子 $i : k\mathbf{Top} \hookrightarrow \mathbf{Top}$ 有**右**伴随 $k$，即 $i \dashv k$。$kX$ 与 $X$ 有同一个集合，拓扑换成 $k$-拓扑。 |
| **英文译文** | The category $k\mathbf{Top}$ of compactly generated spaces is a **coreflective subcategory** of $\mathbf{Top}$: the inclusion functor $i$ has a **right** adjoint $k$, that is, $i \dashv k$. The space $kX$ has the same underlying set as $X$, with the topology replaced by the $k$-topology. |

### 8. `thm.topos-abelian-grothendieck`　$\mathcal{T}(\mathbf{Ab})$ 是 Grothendieck 范畴

| | |
|---|---|
| **中文原文** | 若 $\mathcal{T}$ 是拓扑斯，则 $\mathcal{T}$ 上的阿贝尔层所成范畴 $\mathcal{T}(\mathbf{Ab})$ 是 **Grothendieck 范畴**：它有小的生成元集、有所有余极限、且滤过余极限正合。 |
| **英文译文** | If $\mathcal{T}$ is a topos, then the category $\mathcal{T}(\mathbf{Ab})$ of abelian sheaves on $\mathcal{T}$ is a **Grothendieck category**: it has a small set of generators, has all colimits, and filtered colimits are exact. |

### 9. `prop.nbv-derivative`　NBV 函数的导数与测度的关系

| | |
|---|---|
| **中文原文** | 设 $F \in NBV$。则 $F' \in L^1(m)$，并且 $\mu_F \perp m \iff F' = 0\ \text{a.e.}$；$\mu_F \ll m \iff F(x) = \int_{-\infty}^{x} F'(t) dt$。 |
| **英文译文** | Let $F \in NBV$. Then $F' \in L^1(m)$, and …（两条公式逐字相同）|

### 10. `thm.ring-monotone-sigma`　环 → σ-环 的判据

| | |
|---|---|
| **中文原文** | 设 $\mathfrak{A}$ 是一个**环**。则下列三条等价：$\mathfrak{A}\text{ 是} \sigma-\text{环} \iff \mathfrak{A}\text{ 是单调类} \iff \mathfrak{A}\text{ 对可列不交并封闭}$。 |
| **英文译文** | Let $\mathfrak{A}$ be a **ring**. Then the following three conditions are equivalent: $\mathfrak{A}\text{ is a } \sigma\text{-ring} \iff \mathfrak{A}\text{ is a monotone class} \iff \mathfrak{A}\text{ is closed under countable disjoint unions}$. |

---

## 二、`notes`（说明）部分

`notes` 比陈述长（277–909 字符），逐句对译，不逐段贴在这里免得这份文档比正文还长。
**全文对照办法**：`src/data/i18n/statements.en.js` 里每个 id 下面就是 `statement_en` 与
`notes_en`；中文原文在 `src/data/packs/*.js`（搜 id 即可）。下面只列**我做过判断、需要你看一眼**的句子。

| 节点 | 中文 | 我的英文 | 为什么值得看一眼 |
|---|---|---|---|
| `def.representable` | 别处的元素不是随便来的，是被 $s$ 推出来的 | elements elsewhere do not come from nowhere; they are pushed out of $s$ | 「推」在中文里是「推出 / push forward」的口语说法，英文用了 push out，没升级成 formal 的 "induced by" |
| `def.abelian-category` | $\mathbb{Z}^{\mathrm{disc}} \to \mathbb{Z}^{\mathrm{coarse}}$ 这个恒等映射不严格 | the identity map … **is not strict** | ⚠️ **存疑**：「严格」在这里是 strict morphism 的意思吗？我按字面译了 |
| `prop.cg-coreflective` | 一个把空间「收紧」，一个把空间「松开」 | One "tightens" a space, the other "loosens" it | 口语比喻，直译 |
| `prop.cg-coreflective` | 要对每个紧 $L \subseteq X$ 验证 | it suffices to check for every compact $L \subseteq X$ | 补了 it suffices to（中文的「只需」在上一分句）|
| `def.product-measure` | 就是「测度的构造」那个星团里现成的四件套 | is exactly the off-the-shelf quartet from the "constructing measures" cluster | 「四件套」是口语，英文也口语化了 |
| `thm.topos-abelian-grothendieck` | 顺带一条 | One more fact along the way | — |
| `prop.nbv-derivative` | 能不能把函数积回来 | whether a function can be integrated back | 口语，直译 |
| `thm.ring-monotone-sigma` | 正是因为它，才能把「对 $\sigma$ 代数成立」化归为… | it is precisely what lets one reduce "true for all $\sigma$-algebras" to… | 「化归」= reduce，已按标准译法 |

---

## 三、本批新出现的术语（glossary 里还没有的）

`i18n/glossary.md` 是**代码现算**的（改键即改表），所以下面这些**我还没有写进 glossary**，
等你点头再一次性补 —— 补法是 `src/data/i18n/docs.en.js` 的 `glossaryExtra`。

| 中文 | 英文 | 出现在 |
|---|---|---|
| 预加法范畴 | preadditive category ($\mathbf{Ab}$-category) | `def.abelian-category` |
| 零对象 / 直和 | zero object / direct sum | 同上 |
| 加法范畴 / 预阿贝尔范畴 / 阿贝尔范畴 | additive / preabelian / abelian category | 同上 |
| 核 / 余核 / 余核 | kernel / cokernel | 同上 |
| 单态射 / 满态射 / 正则的 | monomorphism / epimorphism / regular | 同上 |
| 万有元素 / 表示对象 / 元素范畴 / 始对象 | universal element / representing object / category of elements / initial object | `def.representable` |
| Cauchy 列 / 零列 / 等价 | Cauchy sequence / null sequence / equivalent | `def.cauchy-null` |
| 矩形 / 预测度 / 乘积测度 / 外测度 | rectangle / premeasure / product measure / outer measure | `def.product-measure` |
| 余反射子范畴 / 反射子范畴 / 余单位 | coreflective / reflective subcategory; counit | `prop.cg-coreflective` |
| 紧生成空间 / $k$-拓扑 | compactly generated space / $k$-topology | 同上 |
| 拓扑斯 / 阿贝尔层 / 层化 / 正合反射 | topos / abelian sheaf / sheafification / exact reflection | `thm.topos-abelian-grothendieck` |
| Grothendieck 范畴 / 生成元集 / 滤过余极限 / 投射 | Grothendieck category / set of generators / filtered colimit / projective | 同上 |
| 单调类 / σ-环 / 环 | monotone class / σ-ring / ring | `thm.ring-monotone-sigma` |
| NBV / 绝对连续 / Lebesgue 分解 | NBV (normalised bounded variation) / absolutely continuous / Lebesgue decomposition | `prop.nbv-derivative` |

---

## 四、⭐⭐ 待你裁决（这是本批最需要你的一句话）

| # | 事 | 我的处理 | 要你定什么 |
|---|---|---|---|
| 1 | **公式里 `\text{中文}`**：中文页有三处公式把中文写进了 `\text{}`（`\text{ 是零列}`、`\text{ 连续且 }`、`\text{ 是} \sigma-\text{环}`） | ✅ **已按你的批复执行**：改**中文页**，把汉字移出公式 —— ① 变成散文里的两条行内公式；② 换成中英皆可的记号 $\mathcal{C}(Z,X)$ 并在散文里说明它；③ 变成散文三条并列。两条硬不变量已进构建：**公式里不得出现汉字** + **中英公式条数与多重集完全相同**（0 例外，见 `i18n/deviations.md`） | —（已结案） |
| 2 | `\mathbf{AbCHaus}`、`\mathbf{AbTop}`、`\mathbf{AbHaus}` 这类记号 | 原样保留 | 是不是应该写成 $\mathbf{AbCHaus}$ 以外的标准记号？（我按中文页原样） |
| 3 | 「不严格」 | "is not strict" | ⚠️ 这里的「严格」是 strict morphism 还是别的意思？ |
| 4 | 「可列」vs「可数」 | 英文统一 **countable** | 中文页两种写法混用（`对可列不交并封闭` / `可数可加`），要不要统一中文？ |
| 5 | `prop.cg-coreflective` 的英文名 | 仍是 `kification`（T2.2 报告过，那是**函子**不是节点名） | 建议改成 `compactly generated spaces form a coreflective subcategory` —— 本批的英文页大标题正用着 `kification` |
| 6 | 「说明」这一节的英文 | **Notes**（与 `.en.md` 的 `## Notes`、面板的 `NOTES` 一致） | — |
| 7 | 状态 | ✅ **已按你的批复改成逐条**（每个字段一行 `status` + `basedOn`，见上面「零、逐条状态」）：审完哪几条、哪些字段，说一声我就把那一行的 `status` 改成 `'reviewed'`（顺带填 `reviewed: { by, date }`），其余条不受影响 | 可以只批一部分（例如只批陈述、说明留下批）|

---

## 五、批次 2、3 的预告（**等你这批审完再动**）

- 批次 2 / 3 = 枢纽榜第 11–30 名，各 10 条，都是 `abstract_en` 已有的那 30 个节点。
- 每批照样配一份 `review-batch-N.md`（对照 + 新术语 + 存疑）。
- ⛔ 你不说话我就停在批次 1（任务书：第一批完成后停下等审校）。
