# 星团英文名 · 待作者过一遍（45 条）

> ✅ **作者 2026-10-16 批：45 条全过**（原话：「星团也没啥问题」）。下面这张表从此是**记录**：
> 以后要改某条的名字，改 `src/data/clusters.js` 的 `en` 再 `bun tools/build.mjs` 即可。

> 口径：**星团的英文名**是真源 `src/data/clusters.js` 里每个星团的 `en` 字段（T2.4 加的），
> 它出现在英文入口页的面包屑、`graph.json` 的 `clusters[].en`、英文模式的图例与画布上。
> 中文是真源，英文名是旁挂；本表 = 当时那份对照表（已批，留档）。
> “hub 节点英文名”= 该星团的中心天体（`hub`）那个节点的英文名（没有的写 `—`，回落中文名）。
> 之后要改：改 `clusters.js` 的 `en`，然后 `bun tools/build.mjs`（不要改产物）。

共 45 个有节点的星团 / 45 个登记星团。

| # | 星团 id | 中文名 | 英文名 | hub 节点 | hub 英文名 | 节点数 |
|---|---|---|---|---|---|---|
| | **数理逻辑 / Mathematical Logic**（logic） | | | | | |
| 1 | `logic.fol` | 一阶语言与公式 | First-Order Languages and Formulas | `def.first-order-language` | first-order logic | 4 |
| | **集合论 / Set Theory**（set-theory） | | | | | |
| 2 | `set.zfc` | ZFC 公理系统 | The ZFC Axioms | `ax.ext` | Axiom of Extensionality | 9 |
| 3 | `set.construct` | 集合的构造 | Constructing Sets | `def.subset` | subset | 9 |
| 4 | `set.rel` | 关系与函数 | Relations and Mappings | `def.function` | Mapping | 6 |
| 5 | `set.cardinal` | 基数与等势 | Cardinals and Equinumerosity | `def.cardinal` | cardinality | 7 |
| 6 | `set.numbers` | 数系的构造 | Constructing the Number Systems | `def.real` | real numbers | 13 |
| 7 | `set.ordinal` | 序数与超限 | Ordinals and Transfinite Recursion | `def.ordinal` | von Neumann Ordinal | 5 |
| | **序理论 / Order Theory**（order-theory） | | | | | |
| 8 | `order.structure` | 序结构 | Order Structures | `def.poset` | — | 6 |
| 9 | `order.choice` | 选择原理 | Choice Principles | `ax.choice` | axiom of choice | 6 |
| | **拓扑学 / Topology**（topology） | | | | | |
| 10 | `topology.general` | 拓扑空间 | Topological Spaces | `def.topology` | — | 22 |
| 11 | `topology.metric` | 度量空间 | Metric Spaces | `def.metric-space` | Metric Space | 8 |
| 12 | `topo.chaus` | 紧 Hausdorff 空间 | Compact Hausdorff Spaces | `prop.chaus-reflective` | Stone–Čech compactification | 11 |
| 13 | `topo.stone` | Stone 与 Stonean | Stone and Stonean Spaces | `thm.stone-profinite` | Stone duality | 15 |
| 14 | `topo.cg` | 紧生成空间与弱 Hausdorff | Compactly Generated Spaces and Weak Hausdorff | `def.compactly-generated` | Compactly Generated Space | 23 |
| | **抽象代数 / Abstract Algebra**（algebra） | | | | | |
| 15 | `algebra.structures` | 代数结构 | Algebraic Structures | `def.group` | group | 17 |
| 16 | `algebra.vectorspace` | 向量空间的基 | Bases of Vector Spaces | `def.vs` | — | 2 |
| | **分析学 / Analysis**（analysis） | | | | | |
| 17 | `analysis.real` | 实数与极限 | Real Numbers and Limits | `def.sequence-limit` | limit | 7 |
| 18 | `analysis.setclass` | 集合族与 σ-代数 | Families of Sets and Sigma-Algebras | `def.sigma-algebra` | — | 10 |
| 19 | `analysis.measure` | 测度的构造 | Constructing Measures | `def.measure` | Measure | 18 |
| 20 | `analysis.measurable` | 可测函数与收敛 | Measurable Functions and Convergence | `def.measurable-function` | Measurable Function | 17 |
| 21 | `analysis.integral` | 积分 | Integration | `def.integrable` | integrable | 21 |
| 22 | `analysis.product` | 乘积测度与 Fubini | Product Measures and Fubini | `def.product-measure` | product measure | 11 |
| 23 | `analysis.signed` | 符号测度与分解 | Signed Measures and Decompositions | `def.signed-measure` | Signed Measure | 19 |
| 24 | `analysis.differentiation` | 微分定理 | Differentiation Theorems | `def.maximal-function` | maximal function | 14 |
| 25 | `analysis.bv` | 有界变差与绝对连续 | Bounded Variation and Absolute Continuity | `def.bounded-variation` | bounded variation | 16 |
| 26 | `analysis.lp` | L^p 空间 | L^p Spaces | `def.lp-norm` | Lp norm | 18 |
| | **范畴论 / Category Theory**（category） | | | | | |
| 27 | `cat.basic` | 范畴与图 | Categories and Diagrams | `def.category` | Category | 17 |
| 28 | `cat.functor` | 函子与自然变换 | Functors and Natural Transformations | `def.natural-transformation` | Natural Transformation | 13 |
| 29 | `cat.limit` | 图与极限 | Diagrams and Limits | `def.limit` | — | 22 |
| 30 | `cat.structure` | 单满、子对象与像 | Monos, Epis, Subobjects and Images | `def.subobject` | Subobject | 6 |
| 31 | `cat.algebra` | 范畴里的代数结构 | Algebraic Structures in a Category | `def.group-object` | group object | 10 |
| 32 | `cat.yoneda` | 预层与米田 | Presheaves and Yoneda | `lem.yoneda` | — | 17 |
| 33 | `cat.adjoint` | 伴随与反射 | Adjunctions and Reflections | `def.adjoint` | — | 27 |
| 34 | `cat.sheaf` | 层与拓扑 | Sheaves and Topologies | `def.sheaf` | sheaf | 37 |
| 35 | `cat.topos` | 拓扑斯 | Toposes | `def.topos` | topos | 36 |
| | **同调代数 / Homological Algebra**（homology） | | | | | |
| 36 | `hom.ab` | 加法与阿贝尔范畴 | Additive and Abelian Categories | `def.abelian-category` | additive and abelian categories | 28 |
| 37 | `hom.complex` | 复形与导出三角 | Complexes and Distinguished Triangles | `def.distinguished-triangle` | — | 34 |
| 38 | `hom.cohomology` | 同调与正合列 | Homology and Exact Sequences | `def.cohomology` | cohomology | 7 |
| 39 | `hom.spectral` | 过滤与谱序列 | Filtrations and Spectral Sequences | `def.spectral-sequence` | Spectral Sequence | 11 |
| 40 | `hom.sheafcoh` | 层上同调 | Sheaf Cohomology | `def.sheaf-cohomology` | sheaf cohomology | 30 |
| 41 | `hom.sheaf` | 阿贝尔层 | Abelian Sheaves | `def.abelian-sheaf` | abelian sheaf | 13 |
| | **凝聚态数学 / Condensed Mathematics**（condensed） | | | | | |
| 42 | `cond.set` | 凝聚态集 | Condensed Sets | `def.condensed-set` | condensed set | 29 |
| 43 | `cond.ab` | 凝聚态阿贝尔群 | Condensed Abelian Groups | `def.condensed-abelian-group` | Condensed Abelian Group | 7 |
| 44 | `cond.topo` | 拓扑阿贝尔群 | Topological Abelian Groups | `thm.pontryagin-van-kampen` | Pontryagin-van Kampen | 13 |
| 45 | `cond.cohomology` | 凝聚态上同调 | Condensed Cohomology | `thm.real-banach-chaus-acyclic` | — | 38 |

## 怎么判「英文名对不对」（我的建议口径）

1. **能不能替换中文名直接读**：英文读者只看到这一句，知不知道这个星团是干嘛的；
2. **不编**：中文名里没有的信息不要加（例如中文只说「构造测度」，英文别写成「Carathéodory 扩张定理」）；
3. **与节点英文名一致**：同一个词在这颗星里怎么译，星团名就跟它（术语表 `i18n/glossary.md` 是现算的）；
4. **大小写**：一律句首大写、其余小写（专名除外）—— 星团名是「短语」不是标题。
