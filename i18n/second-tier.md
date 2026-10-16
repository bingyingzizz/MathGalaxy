# 二级命中清单（title 定下来的英文名）

> 由 `bun tools/i18n-backfill.mjs` 现算，共 **41** 条（占全部 709 个节点）。
> 规则（作者 2026-10-16 拍板）：候选 = 该节点 aka 里**名字样**的英文条目；
> 匹配 = **大小写不敏感 + 词边界精确匹配**，**只扫 title**；恰好命中一个才采用；
> 值取 **aka 源字符串**。⛔ 不做子串、不做词形还原、不扩大到 label / statement。
> 这不是猜：命中的那个写法是作者自己写在 title 里的。
> ⚠️ 二级是**消歧**规则 —— 候选集与一级同源（同一道 nameLike 闸门），
> 只有缩写当候选那 4 条（`kC(X,Y)` / `NBV` / `AB6` / `qcqs`）没收进来，它们留在 gaps 里。

**整批回滚**：把下表里的 id 从 `src/data/i18n.js` 删掉再重跑构建即可；
要永久排除就改 `src/data/aliases.js` 的 aka 或节点 title（它们是唯一真源）。

| # | 节点 id | 中文名 | 采用（aka 源字符串） | title 里的写法 | 备注 | title |
|---|---|---|---|---|---|---|
| 1 | `ax.sep` | 分离公理模式 | `separation` | `Separation` ⚠️ |  | 分离公理模式（Axiom Schema of Separation） |
| 2 | `ax.found` | 正则公理 | `foundation` | `Foundation` ⚠️ |  | 正则公理 / 基础公理（Axiom of Foundation） |
| 3 | `ax.choice` | 选择公理 | `axiom of choice` | `Axiom of Choice` ⚠️ |  | 选择公理（Axiom of Choice, AC） |
| 4 | `def.subset` | 子集 | `subset` | `Subset` ⚠️ |  | 子集 / 真子集（Subset） |
| 5 | `def.sequence-limit` | 数列极限 | `limit` | `Limit` ⚠️ |  | 数列极限 $x_n \to x$（Limit of a Sequence） |
| 6 | `def.preimage` | 像与原像 | `preimage` | `Preimage` ⚠️ |  | 像与原像（Image / Preimage） |
| 7 | `def.cardinal` | 基数 |A| | `cardinality` | `Cardinality` ⚠️ |  | 基数与基数的比较（Cardinality） |
| 8 | `def.hausdorff` | Hausdorff 空间 | `Hausdorff` | `Hausdorff` |  | Hausdorff 空间 / $T_{2}$（Hausdorff Space） |
| 9 | `def.quotient-set` | 商集与等价类 | `quotient` | `Quotient` ⚠️ |  | 商集 / 等价类（Quotient Set） |
| 10 | `def.final-initial` | 终对象 / 始对象 | `initial object` | `Initial Object` ⚠️ | 节点含两个概念，命中的只是一个 | 终对象与始对象（Terminal / Initial Object） |
| 11 | `def.elements-category` | 元素范畴 | `category of elements` | `Category of Elements` ⚠️ |  | 元素范畴（Category of Elements） |
| 12 | `def.representable` | 表示函子 | `representable functor` | `Representable Functor` ⚠️ |  | 表示函子与万有元素（Representable Functor） |
| 13 | `def.comma-category` | 逗号范畴 | `comma category` | `Comma Category` ⚠️ |  | 逗号范畴（Comma Category） |
| 14 | `def.projective-object` | 投射 / 内射对象 | `injective object` | `Injective Object` ⚠️ | 节点含两个概念，命中的只是一个 | 投射对象与内射对象（Projective / Injective Object） |
| 15 | `def.sieve` | 筛 | `sieve` | `Sieve` ⚠️ |  | 筛（Sieve） |
| 16 | `def.pretopology` | 预拓扑 | `pretopology` | `Pretopology` ⚠️ |  | 预拓扑（Pretopology） |
| 17 | `def.sheaf` | 层 | `sheaf` | `Sheaf` ⚠️ |  | 层与分离预层（Sheaf） |
| 18 | `def.regular-epi` | 正则满态射 | `regular epimorphism` | `Regular Epimorphism` ⚠️ |  | 正则满态射（Regular Epimorphism） |
| 19 | `def.canonical-topology` | 标准拓扑 | `canonical topology` | `Canonical Topology` ⚠️ |  | 标准拓扑与次标准拓扑（Canonical Topology） |
| 20 | `def.topos` | 拓扑斯 | `topos` | `Topos` ⚠️ |  | 拓扑斯（Topos） |
| 21 | `def.condensed-set` | 凝聚态集 | `condensed set` | `Condensed Set` ⚠️ |  | 凝聚态集（Condensed Set） |
| 22 | `def.cochain-complex` | 上链复形 | `complex` | `Complex` ⚠️ |  | 复形（Complex） |
| 23 | `def.homotopy` | 同伦 | `homotopy` | `Homotopy` ⚠️ |  | 同伦（Homotopy） |
| 24 | `def.mapping-cone` | 映射锥 | `mapping cone` | `Mapping Cone` ⚠️ |  | 映射锥与位移（Mapping Cone） |
| 25 | `def.cohomology` | 同调 | `cohomology` | `Cohomology` ⚠️ |  | 同调（Cohomology） |
| 26 | `def.quasi-iso` | 拟同构 | `quasi-isomorphism` | `Quasi-Isomorphism` ⚠️ |  | 拟同构与零调复形（Quasi-Isomorphism） |
| 27 | `def.filtration` | 过滤 | `filtration` | `Filtration` ⚠️ |  | 过滤（Filtration） |
| 28 | `def.presheaf-valued` | 取值一般的预层与层 | `sheaf with values` | `Sheaf with Values` ⚠️ |  | 取值在一般范畴里的层（Sheaf with Values in a Category） |
| 29 | `def.abelian-sheaf` | 阿贝尔层 | `abelian sheaf` | `Abelian Sheaf` ⚠️ |  | 阿贝尔层（Abelian Sheaf） |
| 30 | `def.group` | 群 | `group` | `Group` ⚠️ |  | 群与阿贝尔群（Group） |
| 31 | `def.normal-subgroup` | 正规子群 | `normal subgroup` | `Normal Subgroup` ⚠️ |  | 正规子群与陪集（Normal Subgroup） |
| 32 | `def.group-hom` | 群同态、核与像 | `group homomorphism` | `Group Homomorphism` ⚠️ |  | 群同态（Group Homomorphism） |
| 33 | `def.ideal` | 理想 | `ideal` | `Ideal` ⚠️ |  | 理想与商环（Ideal） |
| 34 | `def.monoid-object` | 幺半群对象 | `monoid object` | `Monoid Object` ⚠️ |  | 幺半群对象（Monoid Object） |
| 35 | `def.group-object` | 群对象与阿贝尔群对象 | `group object` | `Group Object` ⚠️ |  | 群对象与阿贝尔群对象（Group Object） |
| 36 | `thm.snake-lemma` | 蛇引理 | `snake lemma` | `Snake Lemma` ⚠️ |  | 蛇引理（Snake Lemma） |
| 37 | `def.exact-functor` | 正合函子 | `exact functor` | `Exact Functor` ⚠️ |  | 左正合 / 右正合 / 正合函子（Exact Functor） |
| 38 | `def.split-exact` | 分裂短正合列 | `split exact` | `Split Exact` ⚠️ |  | 分裂的短正合列（Split Exact Sequence） |
| 39 | `def.enough-projectives` | 足够多投射对象 | `enough projectives` | `Enough Projectives` ⚠️ |  | 足够多投射对象（Enough Projectives） |
| 40 | `def.finitely-presented` | 有限表现对象 | `finitely presented` | `Finitely Presented` ⚠️ |  | 有限表现（紧）对象（Finitely Presented Object） |
| 41 | `thm.tykhonov` | Tychonoff 定理 | `Tychonoff` | `Tychonoff` |  | Tychonoff 定理：紧空间的任意积紧 |

「备注」列只写机械看得出来的事实（节点含两个概念 / title 里是 LaTeX 符号），不猜。
---

## ⚠️ 跨节点重复的 title_en（2 组，只记录、不自动改）

| 英文名 | 用在哪些节点 |
|---|---|
| `sections functor` | `prop.condab-section`（截面函子保极限余极限） · `def.section-functor`（截面函子） |
| `Internal Hom` | `def.internal-hom`（内 Hom） · `prop.cond-internal-hom`（内部 Hom 的函数空间刻画） |

## 大小写差异（39 处，只记录）

aka 里写作一种大小写、title 里写作另一种 —— 采用的一律是 **aka 源字符串**。

| 节点 id | aka 源字符串（采用） | title 里的写法 |
|---|---|---|
| `ax.sep` | `separation` | `Separation` |
| `ax.found` | `foundation` | `Foundation` |
| `ax.choice` | `axiom of choice` | `Axiom of Choice` |
| `def.subset` | `subset` | `Subset` |
| `def.sequence-limit` | `limit` | `Limit` |
| `def.preimage` | `preimage` | `Preimage` |
| `def.cardinal` | `cardinality` | `Cardinality` |
| `def.quotient-set` | `quotient` | `Quotient` |
| `def.final-initial` | `initial object` | `Initial Object` |
| `def.elements-category` | `category of elements` | `Category of Elements` |
| `def.representable` | `representable functor` | `Representable Functor` |
| `def.comma-category` | `comma category` | `Comma Category` |
| `def.projective-object` | `injective object` | `Injective Object` |
| `def.sieve` | `sieve` | `Sieve` |
| `def.pretopology` | `pretopology` | `Pretopology` |
| `def.sheaf` | `sheaf` | `Sheaf` |
| `def.regular-epi` | `regular epimorphism` | `Regular Epimorphism` |
| `def.canonical-topology` | `canonical topology` | `Canonical Topology` |
| `def.topos` | `topos` | `Topos` |
| `def.condensed-set` | `condensed set` | `Condensed Set` |
| `def.cochain-complex` | `complex` | `Complex` |
| `def.homotopy` | `homotopy` | `Homotopy` |
| `def.mapping-cone` | `mapping cone` | `Mapping Cone` |
| `def.cohomology` | `cohomology` | `Cohomology` |
| `def.quasi-iso` | `quasi-isomorphism` | `Quasi-Isomorphism` |
| `def.filtration` | `filtration` | `Filtration` |
| `def.presheaf-valued` | `sheaf with values` | `Sheaf with Values` |
| `def.abelian-sheaf` | `abelian sheaf` | `Abelian Sheaf` |
| `def.group` | `group` | `Group` |
| `def.normal-subgroup` | `normal subgroup` | `Normal Subgroup` |
| `def.group-hom` | `group homomorphism` | `Group Homomorphism` |
| `def.ideal` | `ideal` | `Ideal` |
| `def.monoid-object` | `monoid object` | `Monoid Object` |
| `def.group-object` | `group object` | `Group Object` |
| `thm.snake-lemma` | `snake lemma` | `Snake Lemma` |
| `def.exact-functor` | `exact functor` | `Exact Functor` |
| `def.split-exact` | `split exact` | `Split Exact` |
| `def.enough-projectives` | `enough projectives` | `Enough Projectives` |
| `def.finitely-presented` | `finitely presented` | `Finitely Presented` |

## 形差：title 里有更长的英文写法（12 处，只记录）

title 括号里的英文与采用的名字「互相包含」（如 aka `limit` / title `Limit of a Sequence`）。
按护栏**值取 aka 源字符串**，所以这里不改 —— 要改成 title 那种更正式的写法请说一声。

| 节点 id | 采用（aka） | title 里更长的写法 |
|---|---|---|
| `ax.sep` | `separation` | Axiom Schema of Separation |
| `ax.found` | `foundation` | Axiom of Foundation |
| `ax.choice` | `axiom of choice` | Axiom of Choice, AC |
| `def.sequence-limit` | `limit` | Limit of a Sequence |
| `def.preimage` | `preimage` | Image / Preimage |
| `def.hausdorff` | `Hausdorff` | Hausdorff Space |
| `def.quotient-set` | `quotient` | Quotient Set |
| `def.final-initial` | `initial object` | Terminal / Initial Object |
| `def.projective-object` | `injective object` | Projective / Injective Object |
| `def.presheaf-valued` | `sheaf with values` | Sheaf with Values in a Category |
| `def.split-exact` | `split exact` | Split Exact Sequence |
| `def.finitely-presented` | `finitely presented` | Finitely Presented Object |
