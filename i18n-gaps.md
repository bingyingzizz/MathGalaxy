# 英文名缺口清单（i18n-gaps）

> 由 `bun tools/i18n-backfill.mjs` 从 `src/data/aliases.js` + 节点 `title` 现算。
> **这里一个名字都没猜过** —— 自动能定的已经写进 `src/data/i18n.js`，剩下的都在下面。
> 补法：把缺的英文名加到 `src/data/aliases.js` 的那条 aka 里，再重跑一次回填脚本。

| 桶 | 节点数 | 意思 |
|---|---|---|
| ✅ 已自动填入 | 230 | aka 里恰好一条名字样英文 |
| ⚠️ 歧义 | 98 | aka 里有 ≥2 条英文写法，要你挑一个 |
| ⚠️ 只有缩写 | 23 | aka 里只有 AC / FOL / sup / MCT a.e. 这种缩写 |
| ⚠️ 只有书号 | 259 | aka 里只有 Exercise 2.25 / Theorem 8.3.9 这种坐标（搜索用，不是名字）|
| ⚠️ 只有 title 有 | 4 | aka 没有英文，但 title 括号里是英文 |
| ⛔ 完全没有 | 95 | aka 与 title 都没有英文名 |
| **合计** | **709** | 覆盖 32.4% |

---

## ⚠️ 歧义：aka 有多个英文写法（98）

aka 里 ≥2 条英文条目（书号已剔除），**一个都没自动采用**。

| 节点 id | 中文名 | aka 里的英文 | 建议（待你点头）|
|---|---|---|---|
| `ax.sep` | 分离公理模式 | `specification` / `comprehension` / `separation` | **Axiom Schema of Separation**（title 里就是它，可一键采用） |
| `ax.found` | 正则公理 | `foundation` / `regularity` | **Axiom of Foundation**（title 里就是它，可一键采用） |
| `ax.choice` | 选择公理 | `AC` / `axiom of choice` / `Zorn` | title 是「Axiom of Choice, AC」—— 也对不上唯一一个 |
| `def.subset` | 子集 | `subset` / `inclusion` | **Subset**（title 里就是它，可一键采用） |
| `def.pair` | 有序对 | `ordered pair` / `Kuratowski` | title 是「Ordered Pair, Kuratowski」—— 也对不上唯一一个 |
| `def.poset` | 偏序集 | `partial order` / `poset` | title 是「Partially Ordered Set」—— 也对不上唯一一个 |
| `def.wellorder` | 良序集 | `well-order` / `well-ordering` | **Well-Ordered Set**（title 里就是它，可一键采用） |
| `thm.wellordering` | 良序定理 | `well-ordering theorem` / `Zermelo` | title 是「Well-Ordering Theorem, Zermelo 1904」—— 也对不上唯一一个 |
| `def.vs` | 向量空间的基 | `basis` / `span` / `linearly independent` |  |
| `def.set-ring` | 环与代数 | `ring of sets` / `algebra of sets` | title 是「Ring, Algebra」—— 也对不上唯一一个 |
| `def.sigma-algebra` | σ-代数 | `sigma-algebra` / `sigma-field` | **σ-Algebra**（title 里就是它，可一键采用） |
| `lem.fatou` | Fatou 引理 | `Fatou` / `Fatou's lemma` | title 是「Fatou's Lemma」—— 也对不上唯一一个 |
| `thm.fubini-tonelli` | Fubini–Tonelli | `Fubini` / `Tonelli` |  |
| `def.essential-sup` | 本性上界与 L^∞ | `essential supremum` / `L-infinity` |  |
| `def.sequence-limit` | 数列极限 | `limit` / `convergence` | **Limit of a Sequence**（title 里就是它，可一键采用） |
| `def.union-inter` | 并集与交集 | `union` / `intersection` | title 是「Union & Intersection」—— 也对不上唯一一个 |
| `def.diff-complement` | 差集与补集 | `difference` / `complement` | title 是「Difference, Complement & Symmetric Difference」—— 也对不上唯一一个 |
| `def.bijection` | 单射 / 满射 / 双射 | `injective` / `surjective` / `bijective` | title 是「Injective / Surjective / Bijective」—— 也对不上唯一一个 |
| `def.preimage` | 像与原像 | `preimage` / `inverse image` | **Image / Preimage**（title 里就是它，可一键采用） |
| `def.equinumerous` | 等势 | `equipotent` / `same cardinality` | title 是「Equinumerous」—— 也对不上唯一一个 |
| `def.cardinal` | 基数 |A| | `cardinality` / `cardinal number` | **Cardinality**（title 里就是它，可一键采用） |
| `def.topology` | 拓扑空间与开集 | `topology` / `open set` | title 是「Topological Space」—— 也对不上唯一一个 |
| `def.closed-set` | 闭集与闭包 | `closed set` / `closure` | title 是「Closed Set, Closure」—— 也对不上唯一一个 |
| `def.topology-base` | 基与子基 | `base` / `subbase` | title 是「Basis, Subbasis」—— 也对不上唯一一个 |
| `def.hausdorff` | Hausdorff 空间 | `Hausdorff` / `Tychonoff` | **Hausdorff Space**（title 里就是它，可一键采用） |
| `def.quotient-set` | 商集与等价类 | `quotient` / `equivalence class` | **Quotient Set**（title 里就是它，可一键采用） |
| `thm.induction` | 归纳原理与递推定义 | `induction` / `recursion` | title 是「Induction & Recursion」—— 也对不上唯一一个 |
| `def.cauchy-null` | Cauchy 列与零列 | `Cauchy sequence` / `null sequence` | **Cauchy & Null Sequences**（title 里就是它，可一键采用） |
| `thm.real-ordered-field` | ℝ 是完备有序域 | `least upper bound property` / `completeness of R` |  |
| `thm.recursion-wellorder` | 超限递归 | `transfinite recursion` / `transfinite induction` |  |
| `def.satisfaction` | 满足关系 | `satisfaction` / `semantics` | title 是「Tarski」—— 也对不上唯一一个 |
| `def.ff-faithful` | 忠实 / 满 / 全忠实 | `faithful` / `full` / `fully faithful` | title 是「Faithful / Full / Fully Faithful」—— 也对不上唯一一个 |
| `def.commutative-diagram` | 图与交换图 | `commutative diagram` / `diagram` | title 是「Diagram / Commutative Diagram」—— 也对不上唯一一个 |
| `def.cone` | 锥 | `cone` / `cocone` | title 是「Cone / Cocone」—— 也对不上唯一一个 |
| `def.limit` | 极限 | `limit` / `colimit` | title 是「Limit / Colimit」—— 也对不上唯一一个 |
| `def.final-initial` | 终对象 / 始对象 | `terminal object` / `initial object` | **Terminal / Initial Object**（title 里就是它，可一键采用） |
| `def.product` | 积 / 余积 | `product` / `coproduct` | title 是「Product / Coproduct」—— 也对不上唯一一个 |
| `def.fibered-product` | 纤维积 / 纤维余积 | `pullback` / `fibered product` / `pushout` | title 是「Pullback / Pushout」—— 也对不上唯一一个 |
| `def.equalizer` | 等化子 / 余等化子 | `equalizer` / `coequalizer` / `ker` / `coker` | title 是「Equalizer / Coequalizer」—— 也对不上唯一一个 |
| `def.mono` | 单态射 / 满态射 / 同构 | `mono` / `epi` / `monomorphism` / `epimorphism` / `isomorphism` / `isomorphic` | title 是「Mono / Epi / Isomorphism」—— 也对不上唯一一个 |
| `def.image` | 像 / 余像 | `image` / `coimage` / `strict` | title 是「Image / Coimage」—— 也对不上唯一一个 |
| `def.elements-category` | 元素范畴 | `category of elements` / `el(F)` / `universal element` | **Category of Elements**（title 里就是它，可一键采用） |
| `def.representable` | 表示函子 | `representable functor` / `universal element` | **Representable Functor**（title 里就是它，可一键采用） |
| `lem.yoneda` | 米田引理 | `Yoneda lemma` / `Yoneda` | title 是「Yoneda Lemma」—— 也对不上唯一一个 |
| `def.adjoint` | 伴随函子 | `adjoint functor` / `adjunction` | **Adjoint Functors**（title 里就是它，可一键采用） |
| `def.adjunction-unit` | 单位与余单位 | `unit` / `counit` | title 是「Unit and Counit」—— 也对不上唯一一个 |
| `def.comma-category` | 逗号范畴 | `comma category` / `X down G` / `F ↓ G` / `F↓G` / `F down G` | **Comma Category**（title 里就是它，可一键采用） |
| `prop.chaus-reflective` | 紧 Haus 是反射子范畴 | `Stone-Čech` / `beta X` |  |
| `def.projective-object` | 投射 / 内射对象 | `projective object` / `injective object` | **Projective / Injective Object**（title 里就是它，可一键采用） |
| `def.stone-space` | 全不连通与 Stone 空间 | `Stone space` / `extremally disconnected` / `totally disconnected` | title 是「Stone / Stonean Space」—— 也对不上唯一一个 |
| `def.profinite` | 投射有限空间 | `profinite space` / `profinite` | title 是「Profinite Space」—— 也对不上唯一一个 |
| `def.sieve` | 筛 | `sieve` / `covering sieve` | title 是「Sieve」—— 也对不上唯一一个 |
| `def.pretopology` | 预拓扑 | `pretopology` / `Grothendieck pretopology` | title 是「Pretopology」—— 也对不上唯一一个 |
| `def.grothendieck-topology` | Grothendieck 拓扑 | `Grothendieck topology` / `site` | title 是「Grothendieck Topology, Site」—— 也对不上唯一一个 |
| `def.sheaf` | 层 | `sheaf` / `separated presheaf` | title 是「Sheaf」—— 也对不上唯一一个 |
| `thm.sheafification` | 层化 | `sheafification` / `sheafify` |  |
| `def.regular-epi` | 正则满态射 | `regular epimorphism` / `regular epi` | title 是「Regular Epimorphism」—— 也对不上唯一一个 |
| `def.universal-colimit` | 万有关系 | `universal colimit` / `disjoint coproduct` |  |
| `def.canonical-topology` | 标准拓扑 | `canonical topology` / `subcanonical` | **Canonical Topology**（title 里就是它，可一键采用） |
| `def.generator` | 生成元集 | `generator` / `set of generators` | title 是「Generators」—— 也对不上唯一一个 |
| `def.topos` | 拓扑斯 | `topos` / `Grothendieck topos` | title 是「Topos」—— 也对不上唯一一个 |
| `def.condensed-set` | 凝聚态集 | `condensed set` / `Cond` | title 是「Condensed Set」—— 也对不上唯一一个 |
| `def.cochain-complex` | 上链复形 | `complex` / `cochain complex` | title 是「Complex」—— 也对不上唯一一个 |
| `def.homotopy` | 同伦 | `homotopy` / `null-homotopic` | **Homotopy**（title 里就是它，可一键采用） |
| `def.mapping-cone` | 映射锥 | `mapping cone` / `shift` | **Mapping Cone**（title 里就是它，可一键采用） |
| `def.distinguished-triangle` | 导出三角 | `distinguished triangle` / `triangle` | title 是「Distinguished Triangle」—— 也对不上唯一一个 |
| `def.cohomology` | 同调 | `cohomology` / `homology` / `H^n` | title 是「Cohomology」—— 也对不上唯一一个 |
| `thm.long-exact` | 长正合列 | `long exact sequence` / `snake lemma` |  |
| `def.quasi-iso` | 拟同构 | `quasi-isomorphism` / `quasi-iso` / `acyclic` | title 是「Quasi-Isomorphism」—— 也对不上唯一一个 |
| `def.filtration` | 过滤 | `filtration` / `graded pieces` | **Filtration**（title 里就是它，可一键采用） |
| `def.presheaf-valued` | 取值一般的预层与层 | `sheaf with values` / `presheaf with values` | **Sheaf with Values in a Category**（title 里就是它，可一键采用） |
| `def.abelian-sheaf` | 阿贝尔层 | `abelian sheaf` / `sheaf of abelian groups` / `Ab(C)` | **Abelian Sheaf**（title 里就是它，可一键采用） |
| `def.tensor-abelian-sheaf` | 阿贝尔层的张量积 | `closed symmetric monoidal` / `Tensor` / `internal hom` |  |
| `def.compactly-generated` | 紧生成空间 | `compactly generated` / `k-space` | **Compactly Generated Space**（title 里就是它，可一键采用） |
| `prop.cg-cartesian-closed` | 紧生成空间是笛卡尔闭的 | `cartesian closed` / `currying` |  |
| `def.group` | 群 | `group` / `Abelian group` | title 是「Group」—— 也对不上唯一一个 |
| `def.normal-subgroup` | 正规子群 | `normal subgroup` / `coset` | **Normal Subgroup**（title 里就是它，可一键采用） |
| `def.group-hom` | 群同态、核与像 | `group homomorphism` / `kernel` / `image` | **Group Homomorphism**（title 里就是它，可一键采用） |
| `thm.first-iso` | 第一同构定理（Noether） | `first isomorphism theorem` / `Noether` | **Noether**（title 里就是它，可一键采用） |
| `def.ideal` | 理想 | `ideal` / `quotient ring` | **Ideal**（title 里就是它，可一键采用） |
| `thm.freyd-mitchell` | Freyd–Mitchell 嵌入定理 | `Freyd-Mitchell` / `Freyd` / `Mitchell` |  |
| `def.cofinal-functor` | 共尾函子 | `cofinal` / `cofinal functor` / `final functor` / `coinitial` | title 是「Cofinal Functor」—— 也对不上唯一一个 |
| `def.filtered-category` | 滤过范畴 | `filtered category` / `filtered` / `cocone` | title 是「Filtered Category」—— 也对不上唯一一个 |
| `prop.representable-preserves-limits` | 可表函子保所有极限 | `representable preserves limits` / `left exact` |  |
| `def.monoid-object` | 幺半群对象 | `monoid object` / `Mon(C)` / `cartesian category` | **Monoid Object**（title 里就是它，可一键采用） |
| `def.group-object` | 群对象与阿贝尔群对象 | `group object` / `abelian group object` / `Gr(C)` / `Ab(C)` | title 是「Group Object」—— 也对不上唯一一个 |
| `thm.snake-lemma` | 蛇引理 | `snake lemma` / `diagram chasing` | **Snake Lemma**（title 里就是它，可一键采用） |
| `def.simplex-category` | 单纯形范畴 | `simplex category` / `Delta` |  |
| `def.exact-functor` | 正合函子 | `left exact` / `right exact` / `exact functor` | **Exact Functor**（title 里就是它，可一键采用） |
| `def.zero-object` | 零对象与直和 | `zero object` / `biproduct` |  |
| `def.split-exact` | 分裂短正合列 | `split exact` / `split lemma` | **Split Exact Sequence**（title 里就是它，可一键采用） |
| `def.enough-projectives` | 足够多投射对象 | `enough projectives` / `enough injectives` | **Enough Projectives**（title 里就是它，可一键采用） |
| `def.finitely-presented` | 有限表现对象 | `finitely presented` / `compact object` | **Finitely Presented Object**（title 里就是它，可一键采用） |
| `def.totally-disconnected` | 完全不连通与极不连通 | `totally disconnected` / `extremally disconnected` |  |
| `thm.tykhonov` | Tychonoff 定理 | `Tychonoff` / `Tykhonov` |  |
| `prop.cond-equivalence-effective` | Cond 的等价关系有效 | `effective equivalence relation` / `Giraud` |  |
| `method.simplicial-cohomology` | 单纯方法算层上同调 | `hypercover` / `Godement` | title 是「X, M」—— 也对不上唯一一个 |
| `def.kernel-cokernel` | 核与余核 | `kernel` / `cokernel` | title 是「Kernel, Cokernel」—— 也对不上唯一一个 |

## ⚠️ 只有缩写（23）

aka 里只有缩写样的一条（字母 < 6 或全大写，如 `AC` `FOL` `sup` `MCT a.e.`）——不足以当正式英文名。「建议」列是 title 里若有更完整的英文。

| 节点 id | 中文名 | aka 里的英文 | 建议（待你点头）|
|---|---|---|---|
| `thm.metric-compact-equiv` | 紧的三个等价刻画 | `Heine-Borel` |  |
| `def.lebesgue-stieltjes` | Lebesgue–Stieltjes 测度 | `Lebesgue–Stieltjes` |  |
| `cor.mct-ae` | MCT（a.e. 版本） | `MCT a.e.` |  |
| `def.nbv` | NBV | `NBV` |  |
| `thm.schroder-bernstein` | Schröder–Bernstein 定理 | `Cantor–Bernstein` / `Cantor-Bernstein-Schroeder` |  |
| `thm.burali-forti` | 序数全体是真类 | `Burali-Forti` |  |
| `thm.right-adjoint-preserves-limits` | 右伴随保极限 | `RAPL` |  |
| `prop.td-reflective` | 全不连通空间是反射子范畴 | `pi_0` |  |
| `thm.pretopos-qcqs` | 预拓扑斯由拓扑斯唯一确定 | `qcqs` |  |
| `thm.top-cond-adjoint` | Top 与 Cond 的伴随 | `kTop` |  |
| `thm.condab-ab` | CondAb 满足 AB6 与 AB4* | `AB4*` |  |
| `prop.k-product` | k-化与积 | `k(X×Y)` |  |
| `thm.cgwh-reflective` | CGWH 是 CG 的反射子范畴 | `CGWH` |  |
| `prop.cg-function-space` | 函数空间弱 Hausdorff | `kC(X,Y)` |  |
| `ex.ab-of-categories` | Ab(C) 的例子 | `Ab(Top)` / `Ab(Set)` |  |
| `ex.algebra-categories` | 代数的几个范畴 | `Mon` / `Gr` / `Rng` / `G-Set` / `A-Mod` / `k-Alg` |  |
| `prop.ab6` | AB6：滤过余极限与积交换 | `AB6` |  |
| `thm.cartan-leray` | Cartan–Leray 谱序列 | `Cartan-Leray` |  |
| `thm.qcqs-chaus-equiv` | qc 与 qcqs 的判定 | `qcqs` |  |
| `lem.qseparated-ind-inclusions` | 拟分离即含入的滤过余极限 | `Ind(CHaus)` |  |
| `thm.breen-deligne` | Breen–Deligne 分解 | `Breen-Deligne` |  |
| `thm.lc-structure` | 局部紧阿贝尔群结构定理 | `V⊕K` |  |
| `lem.cartan-eilenberg` | Cartan–Eilenberg 分解 | `Cartan-Eilenberg` |  |

## ⚠️ 只有书号（259）

aka 里只有习题/定理编号（`Exercise 2.25`、`Theorem 8.3.9`）—— 那是**搜索坐标**，不是英文名。「建议」列是它 title 括号里的英文（如果有）。

| 节点 id | 中文名 | 现状 | 建议（待你点头）|
|---|---|---|---|
| `def.section` | 截口 | title: 截口（Section）$E_{x}$ 与 $E^{y}$ | **Section** |
| `prop.limit-adjoint` | 极限即伴随 | title: 极限 $\iff$ 常图函子有伴随 |  |
| `prop.reflective-limits` | 反射子范畴里的极限 | title: 反射子范畴中的极限与余极限 |  |
| `lem.minimal-closed-surjection` | 满射的极小闭子集 | title: 满连续映射的极小闭子集 |  |
| `cor.chaus-free-presentation` | 紧 Haus 都有自由表示 | title: 每个紧 Hausdorff 空间都有自由表示 |  |
| `prop.component-clopen` | 连通分量是闭开邻域之交 | title: 紧 Hausdorff 空间中连通分量 = 闭开邻域之交 |  |
| `prop.stonean-basic` | 极端不连通的基本性质 | title: 极端不连通的性质 |  |
| `prop.stone-reflective` | Stone 空间是 CHaus 的反射子范畴 | title: Stone 空间是 $\mathbf{CHaus}$ 的反射子范畴 |  |
| `prop.cech-properties` | Čech 函子的性质 | title: Čech 函子的三条性质 |  |
| `prop.site-properties` | site 的层范畴的好性质 | title: Grothendieck 拓扑下的层范畴 |  |
| `prop.sheafify-equivalence` | 层化与等价关系交换 | title: 层化保持等价关系与商 |  |
| `prop.covering-sieve-epi` | 覆盖筛即余积满射 | title: 覆盖族生成覆盖筛 $\iff$ 余积满射 |  |
| `prop.disjoint-universal` | 不交万有余积与次标准拓扑 | title: 不交万有余积在次标准拓扑下不变 |  |
| `prop.subobject-lattice` | 子对象构成有界格 | title: 预拓扑斯中子对象构成有界格 |  |
| `prop.precanonical-sheaf` | 预标准拓扑下的层 | title: 预标准拓扑下「层」的两条等式 |  |
| `prop.precanonical-mono-epi` | 单满在层化后不变 | title: 预标准拓扑下单态射与满态射不变 |  |
| `prop.topos-covering-epi` | 拓扑斯中覆盖即余积满射 | title: 拓扑斯中的覆盖 |  |
| `prop.topos-sheaf-limits` | 拓扑斯上的层即保极限的预层 | title: 拓扑斯上的层 $\iff$ 保持所有极限 |  |
| `prop.quasi-compact-properties` | 拟紧的性质 | title: 拟紧对象的性质 |  |
| `def.chaus-pretopos` | CHaus 是预拓扑斯 | title: $\mathbf{CHaus}$ 是预拓扑斯 |  |
| `prop.condensed-criterion` | 凝聚态集的刻画 | title: 预层是凝聚态集的两条判据 |  |
| `prop.fchaus-pretopology` | FCHaus 上的预拓扑 | title: 有限不交并给出自由紧 Hausforff 空间上的预拓扑 |  |
| `prop.fchaus-sheaf` | FCHaus 上层的判据 | title: 自由紧 Hausforff 空间上的层 $\iff$ 保有限积 |  |
| `thm.cond-equiv-fchaus` | Cond 即 FCHaus 上的层 | title: $\mathrm{Cond} \simeq \widehat{\mathbf{F |  |
| `prop.cond-epi` | 凝聚态集满态射的判据 | title: 凝聚态集的满态射 |  |
| `prop.cond-projectives` | Cond 有足够多投射对象 | title: $\mathrm{Cond}$ 的投射对象 |  |
| `def.ab-axioms` | Grothendieck 的 AB 公理 | title: Grothendieck 的 AB 公理（AB1–AB6） |  |
| `lem.stonean-projective` | Stonean 给出有限表现投射对象 | title: Stonean 空间给出有限表现的投射对象 |  |
| `prop.condab-generated` | CondAb 由有限表现投射对象生成 | title: $\mathrm{CondAb}$ 的生成元 |  |
| `def.abelian-category` | 加法 / 阿贝尔范畴 | title: 加法范畴与阿贝尔范畴（Additive / Abelian Category） | **Additive / Abelian Category** |
| `prop.complex-additive` | 复形范畴是加法范畴 | title: 复形范畴的性质 |  |
| `lem.triangle-morphism` | 三角态射的性质 | title: 导出三角之间态射的性质 |  |
| `thm.topos-abelian-grothendieck` | 拓扑斯上的阿贝尔群是 Grothendieck 范畴 | title: $\mathcal{T}(\mathbf{Ab})$ 是 Grothendiec |  |
| `ex.cg-examples` | 紧生成空间的例子 | title: 哪些空间是紧生成的 |  |
| `prop.cg-equivalent-conditions` | 紧生成空间的等价刻画 | title: 紧生成性的六条等价说法 |  |
| `prop.ktx-colimit` | kX 是紧空间的余极限 | title: $kX = \varinjlim S$ |  |
| `cor.cg-product` | 紧生成空间对积封闭 | title: 紧生成空间作积仍紧生成 |  |
| `prop.compact-open-discrete` | 离散时函数空间是积 | title: 离散 $X$ 时 $C(X,Y) \cong Y^{X}$ |  |
| `prop.weak-hausdorff-basic` | 弱 Hausdorff 的基本性质 | title: 弱 Hausdorff 的几条基本性质 |  |
| `prop.cg-kclosed-quotient` | k-闭等价关系与弱 Hausdorff 商 | title: $R$ 是 $k$-闭 $\iff$ $X/R$ 弱 Hausdorff |  |
| `prop.cgwh-closed` | CGWH 的开闭子空间与滤过余极限 | title: $\mathrm{CGWH}$ 的封闭性 |  |
| `cor.cg-exponential-adjoint` | CG 的指数伴随 | title: $X \mapsto k(X \times Y) \;\dashv\; Z \m |  |
| `prop.abtop-to-abcond` | 拓扑阿贝尔群嵌入凝聚态 | title: $\mathbf{AbTop} \to \mathrm{AbCond}$ 保所有 |  |
| `prop.continuous-hom-condensed` | 连续同态与内部 Hom | title: $C_{\mathbb{Z}}(M,N) \cong \operatorname |  |
| `prop.exact-sequence-topo-ab` | 拓扑阿贝尔群正合列的搬运 | title: 拓扑正合列 $\implies$ 凝聚态正合列 |  |
| `prop.sieve-covering-equivalent` | 覆盖筛的四条等价 | title: 覆盖筛的等价刻画（$\widetilde{R} \simeq \underlin |  |
| `prop.limit-construction` | 极限的构造 | title: 极限 = 无限积 + 等化子 |  |
| `prop.iso-unique-section` | 同构的截面与收缩唯一 | title: 同构的截面与收缩 |  |
| `prop.poset-limit-join` | 偏序集里的极限是交 | title: 偏序集里：极限 = 下确界，余极限 = 上确界 |  |
| `prop.preserves-products-kernels` | 保积与核 ⟹ 保所有有限极限 | title: 保积 + 保核 $\implies$ 保所有有限极限 |  |
| `prop.preserves-fibered-products-mono` | 保纤维积 ⟹ 保单态射 | title: 保拉回 $\implies$ 保单态射 |  |
| `prop.projective-coproduct` | 投射对象的余积投射 | title: 投射对象的余积还是投射的 |  |
| `prop.ab-limits-forgetful` | Ab(C) 的极限 | title: $\mathrm{Ab}(\mathcal{C})$ 有所有极限 |  |
| `prop.left-adjoint-unique` | 左伴随唯一 | title: 同一个右伴随的左伴随在同构意义下唯一 |  |
| `prop.counit-epi-iff-faithful` | 余单位与忠实性 | title: $G$ 忠实 $\iff$ 余单位是满 |  |
| `prop.ind-reflective` | C 是 Ind(C) 的反射子范畴 | title: $\mathcal{C} \hookrightarrow \operatorna |  |
| `prop.filtered-finite-colimits` | 滤过 + 有限余极限 ⟹ 所有余极限 | title: 有余滤过余极限与有限余极限 $\implies$ 有所有余极限 |  |
| `prop.ring-tensor-coproduct` | 交换环的纤维余积是张量积 | title: 交换环的推出 = 张量积 |  |
| `prop.k-calculus-fractions` | K(A) 允许分式演算 | title: $K(\mathcal{A})$ 关于拟同构允许左右分式演算 |  |
| `prop.exact-to-triangle` | 正合列给出导出三角 | title: 复形的短正合列 $\implies$ 导出三角 |  |
| `prop.hom-k-eq-hom-d` | Hom 在同伦范畴与导出范畴里一样 | title: $\operatorname{Hom}_{K}(K^{\bullet}, I^{ |  |
| `thm.k-plus-injectives` | 内射复形就是导出范畴 | title: $K^{+}(\mathcal{I}) \simeq D^{+}(\mathca |  |
| `thm.derived-long-exact` | 导出函子的长正合列 | title: 短正合列 $\implies$ 右导出函子的长正合列 |  |
| `prop.ext-is-rhom` | Ext 就是 RHom | title: $R^{n}\operatorname{Hom}(M, K^{\bullet}) |  |
| `prop.leray-acyclicity` | Leray 零调性 | title: Leray 零调性：零调复形算导出函子 |  |
| `thm.filtered-complex-spectral` | 过滤复形给出谱序列 | title: 下有界过滤复形 $\implies$ 谱序列 |  |
| `cor.grothendieck-spectral` | Grothendieck 谱序列 | title: Grothendieck 谱序列 |  |
| `prop.cech-as-colim` | Čech 上同调是沿覆盖筛的余极限 | title: $\check{H}^{n}(X, M) = \varinjlim_{R \in | **X, M** |
| `prop.acyclic-iff-cech` | 无环 ⟺ Čech 上同调为零 | title: $M$ 无环 $\iff \check{H}^{n}(M) = 0$（$n \n |  |
| `prop.chaus-cech-eq-h` | 紧 Hausdorff 上 Čech 就是上同调 | title: 紧 Hausdorff：$\check{H}^{n}(X, M) = H^{n} | **X, M** |
| `prop.filtered-limit-cohomology` | 滤过极限的上同调 | title: 紧 Hausdorff 的滤过极限上，常值系数的上同调是余极限 |  |
| `prop.stone-acyclic` | Stone 空间上的上同调为零 | title: Stone 空间：$H^{n}(S, M) = 0$（$n \ne 0$） | **S, M** |
| `prop.topos-morphism-derived` | 拓扑斯态射的导出函子 | title: $R^{n}f_{*}M$ 是 $X' \mapsto H^{n}(f^{-1} |  |
| `cor.homotopy-invariant-cohomology` | 层上同调是同伦不变量 | title: 同伦等价的映射给同构的上同调 |  |
| `prop.cond-slice-topos-morphism` | Cond/X 到开集拓扑斯的态射 | title: 拓扑斯态射 $c_{X} : \mathrm{Cond}/X \rightlef |  |
| `prop.k-bounded-implies-exact` | 相邻两条 K-有界 推出 正合 | title: $K$-有界正合（相邻两处）$\implies$ 通常正合 |  |
| `cor.k-acyclic-acyclic` | K-有界零调 推出 零调 | title: $K$-有界零调 $\implies$ 通常零调 |  |
| `lem.stone-cech-1-bounded` | Stone 满射的 Čech 复形 1-有界零调 | title: Stone 满射的增广 Čech 复形是 $1$-有界零调 |  |
| `prop.banach-stone-acyclic` | Banach 在 Stone 上零调 | title: Banach 阿贝尔群在 Stone 空间上零调 |  |
| `thm.real-banach-chaus-acyclic` | 实 Banach 在紧 Hausdorff 上零调 | title: 实 Banach 空间在紧 Hausdorff 空间上零调 |  |
| `lem.ext-stonean-section` | Stonean 上 Ext 的截面公式 | title: $\operatorname{Ext}^{n}(M, N)(S) \cong \ | **M, N** |
| `prop.breen-deligne-ss-stonean` | Stonean 上 Breen–Deligne 的谱序列 | title: $E^{p,q}_{1} = \bigoplus_{i} H^{q}(M^{s_ |  |
| `prop.rhom-banach-discrete-zero` | 有限维 Banach 到离散群全零 | title: $\operatorname{RHom}_{\mathbb{Z}}(M, N)  | **M, N** |
| `prop.rhom-chaus-banach-zero` | 紧 Haus 到实 Banach 全零 | title: $\operatorname{RHom}_{\mathbb{Z}}(M, N)  | **M, N** |
| `prop.rhom-dual-tensor` | 离散对偶的 RHom 与导出张量 | title: $\operatorname{RHom}(\operatorname{RHom} | **M, T** |
| `prop.dual-rhom-characterization` | Pontryagin 对偶的 RHom 刻画 | title: $M^{\vee} \cong \operatorname{RHom}_{\ma | **M, T** |
| `thm.lc-ext-vanishing` | 局部紧阿贝尔群高次 Ext 消失 | title: $\operatorname{Ext}^{n}_{\mathbb{Z}}(M,  | **M, N** |
| `table.rhom-zrt` | Z/R/T 的 RHom 计算表 | title: $\operatorname{RHom}_{\mathbb{Z}}(M, N)$ | **M, N** |
| `ex.finite-banach-rhom` | 有限维 Banach 之间的 RHom | title: $\operatorname{RHom}_{\mathbb{Z}}(M, N)  | **M, N** |
| `ex.chaus-banach-rhom` | 紧 S 对实 Banach 的 RHom | title: $\operatorname{RHom}_{\mathbb{Z}}(\mathb |  |
| `ex.bd-ss` | Breen–Deligne 的一般谱序列 | title: $E^{p,q}_{1} = \bigoplus_{i} H^{q}(M^{s_ |  |
| `ex.connected-lc-ext` | 连通局部紧到离散只剩 Ext一次 | title: $\operatorname{Ext}^{n}_{\mathbb{Z}}(M,  | **M, N** |
| `ex.nonlc-rhom` | 非局部紧情形的 RHom | title: $\operatorname{RHom}_{\mathbb{Z}}(\mathb |  |
| `prop.pontryagin-discrete-compact-duality` | 离散 与 紧 Hausdorff | title: Pontryagin 对偶把离散与紧互换 |  |
| `prop.cond-limits-colimits` | Cond 的极限与余极限 | title: $\mathrm{Cond}$ 的极限逐点算，余极限要先层化 |  |
| `prop.ab5-implications` | AB5 与 AB3*/AB4* 的关系 | title: AB 公理之间的蕴含关系 |  |
| `prop.closed-inclusion-filtered-limit` | 紧块沿闭含入拼出的空间 | title: 紧 Hausdorff 块沿闭含入的滤过余极限 |  |
| `prop.zero-object-final-criterion` | 零对象与终对象 | title: 命题：预加性范畴里零对象 $\iff$ 终对象 $\iff$ 始对象 |  |
| `prop.biproduct-is-product` | 直和就是积 | title: 命题：预加性范畴里直和 $\iff$ 积 $\iff$ 余积 |  |
| `prop.hom-enrichment-unique` | 预加性结构唯一 | title: 命题：加法范畴里 $\operatorname{Hom}$ 的阿贝尔群结构唯一 |  |
| `prop.additive-iff-preserves-biproduct` | 加法函子的刻画 | title: 命题：$F$ 加法 $\iff$ 保零对象与直和 $\iff$ 保有限积 |  |
| `prop.adjoint-additive` | 伴随函子都加法 | title: 命题：加法范畴之间的伴随函子都是加法函子 |  |
| `prop.exact-sequence-subcategory` | 正合列构成子范畴 | title: 命题：左 / 右 / 短正合列构成加法子范畴 |  |
| `prop.abhaus-strict-exact` | Hausdorff 拓扑阿贝尔群的核与余核 | title: 命题：$\mathbf{AbHaus}$ 中的核、余核与严格正合列 |  |
| `prop.cech-section-vanishing` | 带截面的覆盖上 Čech 零调 | title: 命题：满射有截面时增广 Čech 复形同伦平凡 |  |
| `prop.cohomology-of-coproduct` | 上同调与不交并 | title: 命题：$H^{n}(\coprod_{i} X_{i}, M) \cong \p |  |
| `lem.cech-finite-disjoint-acyclic` | 有限不交覆盖的 Čech 零调 | title: 引理：紧 Hausdorff 空间上有限不交覆盖的 Čech 高次为零 |  |
| `prop.condab-discrete-acyclic` | 离散空间上零调 | title: 命题：凝聚态阿贝尔群在离散空间与「离散 $\times$ Stonean」上零调 |  |
| `prop.condab-quotient-r-disc` | R/R_disc 在 Stone 上的截面 | title: 命题：$Q = \mathbb{R}/\mathbb{R}^{\mathrm{d |  |
| `cor.ext-cond-set-section` | Ext 的截面公式 | title: 推论：$\operatorname{Ext}^{n}(\mathbb{Z}\cd |  |
| `prop.rhom-zs-sections` | Stonean 上 Z[S] 的 RHom | title: 命题：$\operatorname{RHom}_{\mathbb{Z}}(\ma |  |
| `prop.rhom-ze-powers` | 离散空间上 Z[E] 的 RHom | title: 命题：$\operatorname{RHom}_{\mathbb{Z}}(\ma |  |
| `prop.discrete-cond-rhom-constant` | 离散群的 RHom 是常层 | title: 命题：离散阿贝尔群的 RHom 与导出张量积都落在常层里 |  |
| `prop.tensor-rhom-natural-map` | 张量与 RHom 的配对 | title: 命题：$M \otimes^{\mathbf{L}} \operatorname | **P, N** |
| `prop.simplicial-to-chain` | 单纯对象给出链复形 | title: 命题：单纯对象的交替和给出微分 |  |
| `prop.category-into-complexes` | 范畴嵌入复形 | title: 命题：$M \mapsto [M]$ 把范畴全忠实地嵌进复形范畴 |  |
| `prop.homotopy-equivalence-criterion` | 同伦等价的判据 | title: 命题：$f$ 是同伦等价 $\iff$ 存在同伦逆 |  |
| `prop.additive-functor-preserves-triangles` | 加法函子保导出三角 | title: 命题：加法函子把导出三角送到导出三角 |  |
| `prop.complexes-abelian` | 复形范畴是阿贝尔范畴 | title: 命题：$\mathcal{A}$ 阿贝尔 $\implies \mathcal{ |  |
| `prop.cohomology-short-exact` | 同调的两条正合列 | title: 命题：$0 \to H^{k} \to \operatorname{coker} |  |
| `prop.injective-complex-homotopy` | 内射复形：零调、拟同构与同伦 | title: 命题：内射复形上「零调 $\iff$ 同伦平凡」、「拟同构 $\iff$ 同伦等 |  |
| `prop.injective-resolution-lift` | 内射消解之间的提升 | title: 命题：态射可以提升到内射消解之间 |  |
| `prop.k-bounded-exact-filtered-colimit` | K-有界正合沿滤过余极限保持 | title: 命题：等距转移下的滤过余极限保持 $K$-有界正合 |  |
| `prop.continuous-functions-normed` | 连续函数空间的范数 | title: 命题：$C(S, M)$ 是（半）范数 / Banach 阿贝尔群，且 Ston | **S, M** |
| `prop.closed-map-neighborhood-basis` | 闭映射的邻域基 | title: 命题：闭映射下 $\pi^{-1}(A)$ 的邻域基 |  |
| `prop.paracompact-partition-unity` | 仿紧性与单位分解 | title: 命题：仿紧 Hausdorff / 正规 $\iff$ 单位分解存在 |  |
| `prop.constant-sheaf-preserves-limits` | 常层函子保极限 | title: 命题：常（预）层函子 $\Delta$ 保所有极限 |  |
| `prop.ext-abelian-groups` | 阿贝尔群的 Ext | title: 命题：$\operatorname{Ext}^{n}_{\mathbb{Z}}( |  |
| `prop.ext-projective-vanishes` | 投射对象没有高次 Ext | title: 命题：$P$ 投射 $\implies \operatorname{Ext}^{ | **P, M** |
| `prop.injective-iff-acyclic` | 内射与零调的等价 | title: 命题：内射 $\iff$ 对一切左正合函子零调 |  |
| `prop.cohomology-as-ext` | 上同调就是 Ext | title: 命题：$H^{n}(X, M^{\bullet}) \cong \operato |  |
| `prop.presheaf-representable-acyclic` | 预层在可表示对象上没有高次上同调 | title: 命题：$H^{n}(h_{X}, M) = 0$（$n > 0$，预层情形） |  |
| `prop.stone-clopen-refinement` | Stone 空间的闭开加细 | title: 命题：Stone 空间的开覆盖有有限不交闭开加细 |  |
| `prop.left-exact-criterion` | 左正合性的判据 | title: 命题：$F$ 左正合 $\iff$ $F$ 加法且保左正合列 |  |
| `prop.left-exact-iff-R0` | 左正合性与 R⁰ | title: 命题：$F$ 左正合 $\iff$ $R^{0}F \cong F$ |  |
| `prop.chaus-two-term-resolution` | 紧阿贝尔群的两项消解 | title: 命题：紧 Hausdorff 阿贝尔群有两项连通消解 |  |
| `thm.equivalence-criterion` | 等价函子的判据 | title: 定理：$F$ 是等价 $\iff$ $F$ 全忠实且本质满 |  |
| `prop.kan-extension-adjoint` | Kan 延拓与伴随的存在性 | title: 命题：$p^{-1}$ 有左伴随 $\iff$ 沿 $p$ 的 Kan 延拓都存 |  |
| `prop.kan-extension-exists` | 有余极限时 Kan 延拓总存在 | title: 命题：$\mathcal{D}$ 有余极限 $\implies$ 沿 $p$ 的 |  |
| `thm.presheaf-limits-colimits` | 预层范畴的极限与余极限 | title: 定理：$\widehat{\mathcal{C}}$ 里极限余极限都存在，而且逐 |  |
| `def.associated-sheaf` | 关联层 | title: 定义：$X^{\sharp} := h_{X}^{\#}$ |  |
| `thm.induced-topos-morphism` | 任意函子诱导拓扑斯态射 | title: 定理：$\hat{g}_{!} \dashv \hat{g}^{-1} \das |  |
| `cor.cond-ktop-finite-products` | 底空间保有限积 | title: 推论：$(X \times Y)(\cdot) \;\cong\; k\bigl |  |
| `def.resolution` | 消解 | title: 定义：左/右消解、投射/内射消解 |  |
| `prop.bicomplex-spectral` | 双复形给出谱序列 | title: 命题：下有界双复形 $\implies$ $E^{0}_{p,q} = K^{p |  |
| `lem.covering-free-acyclic` | 覆盖给出的自由复形零调 | title: 引理：$X = (X_{i} \to X)$ 是覆盖 $\implies$ $\ |  |
| `cor.cech-cohomology-spectral` | Čech 到上同调的谱序列 | title: 推论：$\check{H}^{p}\bigl(X, H^{q}(M)\bigr) | **X, M** |
| `def.free-abelian-sheaf` | 自由阿贝尔群层 | title: 定义：$\mathbb{Z}\cdot X$，遗忘函子的左伴随 |  |
| `prop.image-kernel-cokernel` | 像就是余核的核 | title: 命题：$\operatorname{im} f = \ker(\operator |  |
| `prop.projection-formula-cond` | 投影公式 | title: 投影公式：$S \times X(\cdot) \cong (S \times  |  |
| `prop.cond-epi-open-surjective` | 开满射是满态射 | title: 命题：开满 + 弱 Hausdorff $\implies$ 在 $\mathr |  |
| `prop.open-covering-covering` | 开覆盖给出覆盖 | title: 命题：开覆盖 $X = \bigsqcup_{i} X_{i}$ $\impli |  |
| `prop.hom-presheaf-sheaf` | Hom 预层是层 | title: 命题：$U \mapsto \operatorname{Hom}_{/X}(U, | **U, Y** |
| `prop.countable-colimit-qseparated` | 可数递增余极限是拟分离的 | title: 命题：$X = \varinjlim_{n} S_{n}$（含入、可数）$\im |  |
| `prop.qseparated-mono` | 拟分离嵌入底空间 | title: 命题：$X$ 拟分离 $\implies$ $X \hookrightarrow |  |
| `prop.exact-at-points` | 正合就是逐点正合 | title: 命题：短正合 $\iff$ 三处都正合 |  |
| `prop.subcat-additive` | 子范畴继承加法与阿贝尔性 | title: 命题：全忠实 + 有伴随 $\implies$ $\mathcal{C}$ 也加 |  |
| `prop.generator-coproduct-epi` | 生成元的余积刻画 | title: 命题：$G$ 生成 $\iff$ 每个 $M$ 都有 $G^{(I)} \two |  |
| `thm.abelian-sheaf-equiv` | 阿贝尔层即拓扑斯里的阿贝尔群 | title: 定理：$\widetilde{\mathcal{C}}(\mathbf{Ab}) |  |
| `prop.presheaf-free-projective` | 自由的预层是投射的 | title: 命题：$\mathbb{Z}\cdot h_{X}$ 在 $\widehat{\ |  |
| `prop.generators-abelian-sheaves` | 生成元给出阿贝尔层的生成元 | title: 命题：$S$ 生成 $\mathcal{T}$ $\implies$ $\{\m |  |
| `prop.free-sheaf-tensor` | 自由对象的张量积 | title: 命题：$\mathbb{Z}\cdot X \otimes \mathbb{Z} |  |
| `prop.additive-complex-construction` | 加法函子与复形构造交换 | title: 命题：$F(C(\mathcal{A})) \cong C(F(\mathcal |  |
| `prop.spectral-degenerate-row` | 谱序列的退化行 | title: 命题：只有 $p = 0$ 那一行时 $E^{0,q} \cong H^{q}$ |  |
| `prop.five-term-spectral-sequence` | 谱序列的五项正合列 | title: 命题：$0 \to E^{1,0}_{2} \to H^{1} \to E^{0 |  |
| `prop.filtered-first-page` | 过滤复形的第一页 | title: 命题：$E^{1}_{p,q} = H^{p+q}(\operatorname{ |  |
| `prop.total-complex-injective-resolution` | 全复形还是内射消解 | title: 命题：全复形 $I^{\bullet}$ 仍是 $K^{\bullet}$ 的内 |  |
| `prop.derived-functor-exact-factor` | 正合因子让谱序列退化 | title: 命题：$F$ 正合 $\implies R^{n}G(FK) \cong R^{ |  |
| `prop.flat-tensor-acyclic` | 平坦张量保持零调 | title: 命题：$P$ 平坦、$M$ 下有界零调 $\implies P \otimes  |  |
| `prop.cech-cochain-formula` | Čech 上链的具体公式 | title: 命题：$\check{C}^{n}(\mathfrak{X}, M) = \pr |  |
| `prop.higher-cohomology-presheaf-zero` | 高次上同调预层的关联层为零 | title: 命题：$n \ne 0$ 时 $\widetilde{H^{n}(M)} = 0 |  |
| `prop.cech-higher-cohomology-presheaf` | 高次上同调预层没有 Čech 上同调 | title: 命题：$n \ne 0 \implies \check{H}^{p}\bigl( |  |
| `prop.cech-interval-vanishing` | 区间上没有高阶 Čech 上同调 | title: 命题：$M$ 常 $\implies \check{H}^{n}([0,1],  |  |
| `prop.cech-h1-equals-h1` | 一次 Čech 就是一次上同调 | title: 命题：$\check{H}^{1}(X, M) \cong H^{1}(X, M | **X, M** |
| `prop.acyclic-equivalent-conditions` | 无环性的四条等价说法 | title: 命题：$M$ 无环 $\iff$ 处处上同调为零 $\iff$ 处处 Čech  |  |
| `prop.topos-morphism-abelian-adjunction` | 拓扑斯态射在阿贝尔群上给出伴随 | title: 命题：$f^{-1} \dashv f_{*}$ 升级到 $\mathcal{T |  |
| `prop.inverse-image-tensor` | 拉回与内 Hom、张量积相容 | title: 命题：$f_{*}\operatorname{Hom}(f^{-1}M, N)  |  |
| `prop.cohomology-functoriality` | 上同调的函子性 | title: 命题：$H^{n}(X', M^{\bullet}) \to H^{n}\big |  |
| `prop.derived-pushforward-composition` | 推前的复合 | title: 命题：$Rf'_{*} \circ Rf_{*} = R(f' \circ f) |  |
| `thm.leray-spectral-sequence` | Leray 谱序列 | title: 定理：$E^{p,q}_{2} = H^{p}\bigl(X', R^{q}f_ |  |
| `prop.abelian-slice-adjunction` | 切片上的正合左伴随 | title: 命题：$j_{X!} \dashv j_{X}^{-1}$ 且 $j_{X!}$ |  |
| `prop.slice-shriek-z` | 切片左伴随作用在 Z 上 | title: 命题：$j_{X!}\mathbb{Z} = \mathbb{Z}\cdot X |  |
| `prop.cohomology-slice-identification` | 切片上的上同调就是原上同调 | title: 命题：$H^{n}\bigl(\mathbf{1}_{X}, j_{X}^{-1 |  |
| `prop.internal-hom-slice-value` | 内 Hom 的取值 | title: 命题：$\operatorname{Hom}_{\mathbb{Z}}(M, N | **M, N** |
| `prop.slice-shriek-projection` | 切片的投影公式 | title: 命题：$j_{X!}(M \otimes j_{X}^{-1}N) = j_{X |  |
| `prop.fully-faithful-injective` | 全忠实函子本质单射 | title: 命题：$F$ 全忠实 $\implies$ $F(X) \cong F(Y)$  |  |
| `prop.preorder-as-category` | 预序集就是「Hom 至多一元」的小范畴 | title: 命题：预序集 $\hookrightarrow$ 小范畴，且与其有序商等价 |  |
| `prop.slice-fully-faithful-mono` | 单态射的切片刻画 | title: 命题：$f$ 单 $\iff$ $\mathcal{C}/Y \to \math |  |
| `prop.projective-universal-epi` | 投射对象与满态射的截面 | title: 命题：满态射万有时，投射 $\iff$ 到它的满射都分裂 |  |
| `prop.functor-preserves-monoid-objects` | 保有限积的函子作用于代数对象 | title: 命题：$F$ 保有限积 $\implies F$ 诱导 $\mathrm{Mon |  |
| `prop.adjunction-extends-to-diagrams` | 伴随延拓到图范畴 | title: 命题：$F \dashv G \implies F_{I} \dashv G_{ |  |
| `prop.kan-extension-fully-faithful` | 全忠实沿自身的 Kan 延拓 | title: 命题：$p$ 全忠实 $\implies p_{!}F \circ p \con |  |
| `prop.hausdorff-reflective` | Hausdorff 空间是反射子范畴 | title: 命题：$\mathbf{Haus} \subset \mathbf{Top}$  |  |
| `prop.normal-locally-closed` | 正规空间的邻域里有闭邻域 | title: 命题：正规 Hausdorff $\implies$ 每个邻域含闭邻域 |  |
| `prop.compact-basic-operations` | 紧性的基本操作 | title: 命题：闭子集紧、连续像紧、紧 Hausdorff 正规 |  |
| `prop.quotient-of-compact` | 紧空间的商紧 | title: 命题：$S$ 紧 $\implies S/R$ 紧 |  |
| `prop.totally-disconnected-subspace` | 全不连通对子空间封闭 | title: 命题：全不连通空间的子空间全不连通 |  |
| `prop.profinite-sets-spaces` | 投射有限集即投射有限空间 | title: 命题：有限集的 pro-对象 $\simeq$ 投射有限空间 |  |
| `prop.continuous-map-space-metric` | 紧 Hausdorff 上的函数空间是度量空间 | title: 命题：$S$ 紧 Hausdorff、$X$ （半）度量（完备）$\implie |  |
| `prop.ind-representable-iff-left-exact` | ind-可表示即左正合 | title: 命题：$T$ ind-可表示 $\iff$ $\mathcal{C}/T$ 滤过 |  |
| `prop.covering-sieves-filter` | 覆盖筛构成滤子 | title: 命题：$J(X)$ 是筛的序集上的滤子 |  |
| `prop.site-covering-families-pretopology` | 覆盖族构成预拓扑 | title: 命题：site 里所有生成覆盖筛的族构成预拓扑 |  |
| `prop.sheafification-image` | 层化与像交换 | title: 命题：$\operatorname{im}(T^{\#} \to T'^{\#} |  |
| `prop.sheafification-slice-colimit` | 层化是切片上的余极限 | title: 命题：$T^{\#} \cong \varinjlim_{X \in \math |  |
| `prop.sheaf-hom-computed-in-presheaves` | 层之间的 Hom 在预层里算 | title: 命题：$\operatorname{Hom}_{\widetilde{\math |  |
| `prop.inverse-image-constant-sheaf` | 常层沿拉回不变 | title: 命题：$f^{-1}\overline{E} = \overline{E}$ |  |
| `prop.stalk-of-sheafification` | 层化不改变茎 | title: 命题：$(T^{\#})_{x} = T_{x}$ |  |
| `prop.module-tensor-universal` | 张量积对双线性映射万有 | title: 命题：$\operatorname{Bil}(M \times N,\ P) \ |  |
| `prop.set-top-ab-complete` | Set、Top、Ab 的完备性 | title: 命题：$\mathbf{Set} / \mathbf{Top} / \mathb |  |
| `prop.adjunction-composition` | 伴随的复合 | title: 命题：$F_{1} \dashv G_{1}$、$F_{2} \dashv G_ |  |
| `prop.coproduct-chaus` | 不交并是紧 Hausdorff 的余积 | title: 命题：$S \sqcup T$ 是 $\mathbf{CHaus}$ 里的余积 |  |
| `prop.connected-image-closure` | 连通的像与闭包 | title: 命题：连通空间的像连通；连通子集的闭包连通 |  |
| `prop.sieve-generated-by-family` | 族生成的筛 | title: 命题：$R = \coprod_{i} \operatorname{im}(h_ |  |
| `prop.pontryagin-finite-dim-banach` | 有限维 Banach 空间的对偶是向量空间对偶 | title: 命题：$V$ 有限维实 Banach $\implies \widehat{V} |  |
| `prop.chaus-quotient-equiv` | 紧 Hausdorff 上商映射的四种说法 | title: 命题：商映射 $\iff$ 正则满 $\iff$ 满态射 $\iff$ 满射 |  |
| `prop.weak-hausdorff-k-closed` | 弱 Hausdorff 的对角线与核 | title: 命题：对角线 $k$-闭 $\iff$ 弱 Hausdorff；$\ker(f, |  |
| `prop.topology-alternative-axiom` | 拓扑公理的替代形式 | title: 命题：最后一条公理可换成「放大 + 局部化」 |  |
| `prop.constant-sheaf-adjunction` | 常层的伴随 | title: 命题：$\operatorname{Hom}(\widetilde{E}_{\m |  |
| `prop.constant-sheaf-top` | 拓扑空间上的常层就是离散空间的层 | title: 命题：$\widetilde{E}_{\mathbf{Top}} \cong \ |  |
| `prop.topos-morphism-from-object` | 对象给出拓扑斯态射 | title: 命题：$X \in \mathcal{C}$ 给出 $\widehat{X} : |  |
| `prop.topos-morphism-final-map` | 终映射给出的拓扑斯态射 | title: 命题：$p : X \to \mathbf{1}$ 给出 $p_{*} = \G |  |
| `prop.topos-morphism-point` | 点给出的拓扑斯态射 | title: 命题：$x : \mathbf{1} \to X$ 给出 $(x_{*}E)(U |  |
| `prop.slice-topos` | 切片拓扑斯 | title: 命题：$\widetilde{\mathcal{C}/T} \simeq \wi |  |
| `def.crystalline-sheaf` | 晶体层 | title: 定义：所有过渡都是同构的 $\mathbf{Top}_{/X}$ 上的层 |  |
| `prop.crystalline-sheaf-equiv` | 晶体层就是 X 上的层 | title: 命题：实化 $\mathcal{F} \mapsto \mathcal{F}_{ |  |
| `prop.qc-sheaf-etale` | 拟紧层与紧的 étale 空间 | title: 命题：$X$ 上的层拟紧 $\iff$ 对应 espace étalé 紧 |  |
| `prop.discrete-iff-constant` | 离散即常 | title: 命题：$X$ 离散 $\iff$ 常 $\iff$ 只依赖紧 Hausdorff |  |
| `prop.underlying-preserves-coproduct` | 底函子保不交并 | title: 命题：$X = \coprod_{i} X_{i}$ $\implies$ $\ |  |
| `prop.discrete-functor-coproduct` | 离散函子保直和 | title: 命题：$\bigl(\bigoplus_{i} M_{i}\bigr)^{\ma |  |
| `prop.cond-quotient-topological` | 商群在凝聚态意义下一致 | title: 命题：$\underline{M/N} \cong \underline{M}/ |  |
| `prop.derived-functor-kan-extension` | 导出函子就是 Kan 延拓 | title: 命题：$F$ 左正合 $\implies RF$ 是沿局部化的左 Kan 延拓 |  |
| `prop.cohomology-via-associated-sheaf` | 用关联层算上同调 | title: 命题：$\mathrm{R}\Gamma(X, M^{\bullet}) = \ |  |
| `prop.cohomology-presheaf-H` | 层化不改变导出的整体截面 | title: 命题：$\Gamma\bigl(X, R\mathcal{H}(M^{\bull |  |
| `prop.free-objects-examples` | 自由对象的例子 | title: 命题：各代数范畴里的自由对象 |  |
| `prop.zmod-is-ab` | Z-模就是阿贝尔群 | title: 命题：$\mathbb{Z}\text{-}\mathbf{Mod} \cong |  |
| `prop.functor-preserves-sections` | 函子保截面与收缩 | title: 命题：函子把截面（收缩、同构）送到同类 |  |
| `def.mor-domain-codomain` | 态射范畴上的域与余域函子 | title: 定义：$\operatorname{Mor}(\mathcal{C}) \to  |  |
| `prop.op-category-is-modules` | 带算子的对象就是模 | title: 命题：$\operatorname{Op}(k\text{-}\mathbf{M |  |
| `prop.forgetful-faithful-not-full` | 遗忘函子忠实但不满 | title: 命题：$\mathbf{Top} \to \mathbf{Set}$ 与 $\m |  |
| `prop.nat-iso-invariants` | 自然同构不改变函子的性质 | title: 命题：$F \cong F'$ 则两者忠实/满/全忠实/本质满/等价性一致 |  |
| `prop.matrix-category` | 矩阵范畴 | title: 命题：$\operatorname{Mat}(k)$ 是小范畴，与有限维向量空间 |  |
| `prop.forgetful-representable` | 遗忘函子可表示 | title: 命题：以集合为值的常见遗忘函子都可表示 |  |
| `prop.solution-functor-representable` | 解集函子可表示 | title: 命题：$A \mapsto \{a \in A^{n} : f_{i}(a) = |  |
| `prop.universal-unique-iso` | 万有元素唯一到唯一同构 | title: 命题：$(X,s)$ 与 $(X',s')$ 都万有 $\implies$ 唯一 |  |
| `prop.algebra-categories-limits` | 代数范畴里的极限与余极限 | title: 命题：极限逐点算，余极限由自由构造加商给出 |  |
| `prop.cat-final-initial-products` | Cat 的终始对象与有限积 | title: 命题：$\mathbf{Cat}$ 有终对象 $\mathbf{1}$、始对象  |  |
| `prop.bialgebra-examples` | 双代数的例子 | title: 命题：$k[t]$ 与 $k[t,1/t]$ 都是双代数 |  |
| `prop.localization-functor-exact` | 允许右分式演算时局部化函子正合 | title: 命题：右分式演算 $\implies$ $Q : \mathcal{C} \to |  |
| `prop.adjunction-naturality` | 伴随双射的自然性 | title: 命题：$\Phi$ 自然的显式写法 |  |
| `prop.forgetful-adjoints-examples` | 遗忘函子的伴随 | title: 命题：自由 $\dashv$ 遗忘、层化 $\dashv$ 含入、$k$-化 $ |  |
| `prop.currying` | Currying | title: 命题：$X \mapsto X \times Y \;\dashv\; Z \m | **Y, Z** |
| `prop.unit-counit-examples` | 常见伴随的单位与余单位 | title: 命题：从单位/余单位读出忠实性 |  |
| `prop.copowers-give-adjoint` | 有余幂则可表示函子有伴随 | title: 命题：$\mathcal{C}$ 有余幂 $\implies$ $X^{(I)} |  |
| `prop.forgetful-preserves-limits` | 代数遗忘函子保极限 | title: 命题：$\mathbf{Mon}, \mathbf{Gr}, \mathbf{R |  |
| `prop.forgetful-exactness` | 遗忘与含入函子的正合性 | title: 命题：遗忘保极限不保余极限；层化正合 |  |
| `prop.reflection-criterion` | 反射的判据 | title: 命题：$F$ 是反射 $\iff$ 存在 $\alpha_{X} : X \to |  |
| `prop.coreflective-monoids-full` | 余反射子范畴上的幺半群 | title: 命题：$\mathcal{C}'$ 余反射 $\implies \mathrm{ |  |
| `prop.slice-covering-sieve` | 切片里的覆盖筛 | title: 命题：$R$ 在 $\mathcal{C}/T$ 里覆盖 $\iff$ $\ha |  |
| `prop.spectral-sequence-page-picture` | 谱序列的页画在 (p,q) 平面上 | title: 命题：$E_{0}, E_{1}, E_{2}$ 都是 $(p,q)$ 平面上的 |  |

## ⚠️ 只有 title 有英文（4）

aka 里没有英文，但 title 括号里是干净的英文；要我直接从 title 取就说一声。

| 节点 id | 中文名 | 现状 | 建议（待你点头）|
|---|---|---|---|
| `thm.hausdorff` | Hausdorff 极大原理 | title: Hausdorff 极大原理 / 极大公理（Hausdorff Maximal  | **Hausdorff Maximal Principle, 1914** |
| `def.semifinite-part` | 半有限部分 | title: 半有限部分（Semifinite Part of a Measure） | **Semifinite Part of a Measure** |
| `def.positive-negative-null` | 正集 / 负集 / 零集 | title: 正集 / 负集 / 零集（Positive, Negative, Null Se | **Positive, Negative, Null Set** |
| `lem.average-continuous` | 平均算子联合连续 | title: 引理：$A_{r} f(x)$ 关于 (r, x) 联合连续 | **r, x** |

## ⛔ 完全没有英文名（95）

aka 与 title 都没有 —— 这些要你起名字。

| 节点 id | 中文名 | 现状 | |
|---|---|---|
| `thm.empty` | 空集存在 | title: 空集存在且唯一 |
| `thm.noself` | 无自属集合 | title: 任何集合都不属于自身 |
| `thm.binunion` | 二元并存在 | title: 二元并 $a \cup b$ 存在 |
| `thm.vsbasis` | 每个向量空间有基 | title: 每个向量空间都有基（Zorn 引理的经典应用） |
| `prop.compact-subset-closed` | 紧子集是闭的 | title: 命题：紧子集在 X 中是闭集 |
| `prop.subset-compact-equiv` | 子集的紧性刻画 | title: 命题：X 完备时，A 紧 $\iff A$ 闭且全有界 |
| `prop.set-class-properties` | 集合族的基本性质 | title: 命题：基本类 / 环 / σ-代数的几条基本性质 |
| `thm.ring-monotone-sigma` | 环 → σ-环 的判据 | title: 定理：环是 σ-环 $\iff$ 它是单调类 $\iff$ 它对可数不交并封闭 |
| `prop.product-sigma-base` | 积 σ-代数的生成基 | title: 命题：把各坐标的 σ-代数换成生成元，积 σ-代数不变 |
| `prop.product-sigma-generated` | 可数积的生成集 | title: 命题：指标集可数时，积 σ-代数由「矩形」生成 |
| `cor.borel-product` | 可数积的 Borel 代数 | title: 推论：可数积距离空间的 Borel σ-代数（可分时相等） |
| `prop.measure-basic` | 测度的基本性质 | title: 命题：测度的单调性、次可加性与两种连续性 |
| `prop.outer-measure-induced` | 由预测度诱导外测度 | title: 命题：从 $\mathcal{E}$ 上的 $\rho$ 诱导出一个外测度 |
| `def.caratheodory-measurable` | μ*-可测集 | title: Carathéodory 可测性（$\mu^{*}$-Measurable Se |
| `thm.caratheodory` | Carathéodory 定理 | title: Carathéodory 定理：$\mu^{*}$-可测集构成 σ-代数，$\m |
| `prop.caratheodory-extension` | 预测度还原 | title: 命题：从预测度出发做 Carathéodory，原代数上的值不变 |
| `thm.caratheodory-uniqueness` | 扩张的唯一性 | title: 定理：Carathéodory 扩张是最大的，σ-有限时唯一 |
| `prop.ls-premeasure` | F 给出的预测度 | title: 命题：单调右连续的 F 给出半开区间上的预测度 |
| `thm.ls-exists` | F ↔ Borel 测度 | title: 定理：每个单调右连续的 F 对应一个 Borel 测度（差常数意义下） |
| `prop.measurable-criterion` | 可测性的两条判定准则 | title: 命题：复合保持可测；只需在生成元上验证 |
| `cor.continuous-measurable` | 连续 ⟹ Borel 可测 | title: 推论：连续函数是 Borel 可测的 |
| `def.lebesgue-measurable` | Lebesgue 可测 | title: Lebesgue 可测 / Borel 可测（$\mathbb{R} \to \ |
| `prop.measurable-product-and-realimag` | 积空间与实虚部 | title: 命题：可测函数到积空间；f 可测 $\iff$ 实部虚部可测 |
| `prop.measurable-closure` | 可测函数的封闭性 | title: 命题：可测函数对和、积、sup、max、极限封闭 |
| `prop.complete-measurable` | 完备性 ⟺ 不破坏可测性 | title: 命题：$\mu$ 完备 $\iff$ 几乎处处相等 / 几乎处处收敛不破坏可测性 |
| `prop.completion-measurable-function` | 完备化后可改在零集上 | title: 命题：完备化空间上的可测函数，几乎处处等于一个原空间可测函数 |
| `def.lplus` | L⁺ | title: $L^{+}$：非负可测函数全体 |
| `def.integral-simple` | 简单函数的积分 | title: 简单函数的积分：加权和 |
| `prop.simple-integral-props` | 简单函数积分的性质 | title: 命题：简单函数积分的四条基本性质 |
| `def.integral-nonneg` | 非负函数的积分 | title: 非负可测函数的积分：从下面取上确界 |
| `prop.integral-zero-iff` | 积分为零 ⟺ 几乎处处为零 | title: 命题：$\int f = 0 \iff f = 0 \text{a.e.}$ |
| `cor.fatou` | Fatou 的推论 | title: 推论：$f_{n} \to f \text{a.e.} \implies \in |
| `prop.finite-integral-consequences` | 积分有限的后果 | title: 命题：$\int f < \infty$ 时，f 几乎处处有限、支撑 σ-有限 |
| `def.integral-complex` | 复函数的积分 | title: 复值函数的积分：正负部相减 |
| `prop.L1-vector-space` | L¹ 是向量空间 | title: 命题：可积函数全体是向量空间，$\int$ 线性 |
| `prop.integral-abs-ineq` | 积分绝对值不等式 | title: 命题：$|\int f| \le \int |f|$ |
| `prop.L1-support-sigma-finite` | L¹ 函数的支撑 σ-有限 | title: 命题：$f \in L^{1} \implies \{f \ne 0\}$ 是  |
| `prop.integrals-equal-iff` | 何时两个函数积分处处相同 | title: 命题：$\int_E f = \int_E g$ 对一切 $E \iff f = |
| `thm.termwise-L1` | L¹ 的逐项积分 | title: 定理：$\sum\int|f_{j}| < \infty \implies \s |
| `thm.approximation-L1` | L¹ 里的逼近 | title: 定理：$L^{1}$ 中可用简单函数 / 连续函数逼近 |
| `prop.convergence-counterexamples` | 四个标准反例 | title: 命题：四个标准反例（把各种收敛区分开） |
| `def.cauchy-in-measure` | 依测度 Cauchy | title: 依测度 Cauchy 序列 |
| `thm.cauchy-in-measure` | 依测度 Cauchy ⟹ 收敛 | title: 定理：依测度 Cauchy 列必有依测度极限，且有一子列 a.e. 收敛 |
| `prop.L1-implies-measure` | L¹ 收敛 ⟹ 依测度收敛 | title: 命题：$L^{1}$ 收敛蕴含依测度收敛（Markov 不等式） |
| `prop.section-measurable` | 截口可测 | title: 命题：可测集的截口可测，可测函数的截口可测 |
| `thm.product-measure-sections` | 乘积测度由截口给出 | title: 定理：$\mu \times \nu(E) = \int \nu(E_{x})  |
| `thm.fubini-complete` | 完备情形的 F–T | title: 定理：完备化的乘积测度上，Fubini–Tonelli 仍然成立 |
| `prop.product-incomplete` | 乘积测度通常不完备 | title: 注记：$\mu$、$\nu$ 完备时，$\mu \times \nu$ 常常不完 |
| `prop.positive-set-closure` | 正集的封闭性 | title: 命题：正集的可测子集仍是正集；可数个正集之并仍是正集 |
| `prop.ac-and-variations` | 绝对连续与变差 | title: 命题：$\nu \ll \mu \iff |\nu| \ll \mu \iff  |
| `thm.ac-epsilon-delta` | 绝对连续的 ε–δ 刻画 | title: 定理（有限情形）：$\nu \ll \mu \iff \forall\varep |
| `prop.integral-gives-ac` | 积分给出绝对连续测度 | title: 命题：$\nu(E) = \int_E f d\mu$ 关于 $\mu$ 绝对连 |
| `cor.ac-integral-continuity` | 积分的绝对连续性 | title: 推论：$\int_E f d\mu$ 在小测度集上任意小 |
| `lem.singular-or-lower-bound` | 要么奇异、要么有下界 | title: 引理：两个有限测度，要么相互奇异，要么在某个正测度集上成比例 |
| `prop.rn-chain-rule` | RN 导数的链式法则 | title: 命题：RN 导数的换元公式与链式法则 |
| `cor.rn-inverse` | 互为绝对连续时导数互逆 | title: 推论：$\mu \ll \lambda$ 且 $\lambda \ll \mu  |
| `thm.rn-complex` | 复测度的 Radon–Nikodym | title: 定理：复测度的 $\nu = \lambda + f d\mu$ 分解 |
| `prop.L1-signed` | L¹(ν) 与全变差 | title: 命题：符号测度的 $L^{1}(\nu) = L^{1}(|\nu|)$，以及几 |
| `thm.lebesgue-set-full` | Lebesgue 集几乎处处 | title: 定理：$f \in L^{1}_{\text{loc}} \implies m( |
| `thm.differentiation-general` | 可缩族的微分定理 | title: 定理：对可缩族，Lebesgue 微分定理仍然成立 |
| `thm.rn-pointwise` | RN 导数的点态公式 | title: 定理：$\nu(E_{r})/m(E_{r}) \to f(x) \text{a |
| `thm.monotone-differentiable` | 单调函数几乎处处可导 | title: 定理：单调函数几乎处处可导，且不连续点可数 |
| `prop.bv-examples` | BV 的例子与基本性质 | title: 命题：BV 的几个例子与封闭性 |
| `lem.variation-monotone` | T_F ± F 递增 | title: 引理：实值 BV 函数的 $T_F + F$ 与 $T_F - F$ 都递增 |
| `thm.bv-jordan` | BV 的 Jordan 分解 | title: 定理：$F \in BV \iff F = G - H$（G、H 有界递增） |
| `prop.bv-regularity` | BV 函数的正则性 | title: 命题：BV 函数的单侧极限都存在、不连续点可数、a.e. 可导 |
| `lem.nbv-variation` | 全变差的 NBV 性质 | title: 引理：$T_F(-\infty) = 0$；F 右连续 $\implies T_ |
| `prop.monotone-integral-derivative` | 递增函数的导数积分不等式 | title: 命题：$\int_{a}^{b} F' \le F(b) - F(a)$ |
| `thm.borel-measure-nbv` | 测度 ↔ NBV 的一一对应 | title: 定理：$\mathbb{R}$ 上的复 Borel 测度 $\longleftr |
| `prop.nbv-derivative` | NBV 函数的导数与测度的关系 | title: 命题：$\mu_F \perp m \iff F' = 0 \text{a.e. |
| `prop.ac-iff-measure-ac` | 函数绝对连续 ⟺ 测度绝对连续 | title: 命题：F 绝对连续 $\iff \mu_F \ll m$ |
| `cor.integral-is-ac-nbv` | 积出来的函数是 AC · NBV | title: 推论：$f \in L^{1}(m) \implies F(x) = \int_ |
| `lem.ac-subset-bv` | AC ⊆ BV | title: 引理：绝对连续蕴含绝对变差（紧区间上） |
| `thm.linf-properties` | L^∞ 的性质 | title: 定理：$L^\infty$ 的五条基本性质 |
| `prop.lq-in-lp-plus-lr` | L^q 落在 L^p + L^r 里 | title: 命题：$L^q \subseteq L^p + L^r$（$0 < p < q  |
| `prop.lp-inter-lr-in-lq` | L^p ∩ L^r ⊆ L^q | title: 命题（插值）：$L^p \cap L^r \subseteq L^q$ |
| `prop.ell-p-inclusion` | ℓ^p ⊆ ℓ^q | title: 命题（只有衰减的场合）：$\ell^p \subseteq \ell^q$（$0 |
| `prop.lp-inclusion-finite` | 有限测度时方向反过来 | title: 命题（只有爆破的场合）：$\mu(X) < \infty$ 时 $L^p(\mu |
| `prop.bounded-functional-gives-lq` | 有界 ⟹ g ∈ L^q | title: 命题：若 $f \mapsto \int fg$ 在简单函数上有界，则 $g \ |
| `thm.cardinal-comparable` | 基数可比定理 | title: 基数可比定理（需要选择公理） |
| `def.nat-arith` | 自然数的加法与乘法 | title: 自然数上的加法与乘法（由递推定义） |
| `thm.real-unique` | 完备有序域的唯一性 | title: 任何完备有序域都与 $\mathbb{R}$ 同构（构造无关性） |
| `thm.real-uncountable` | ℝ 不可数 | title: 实数集是稠密而不可数的：$|\mathbb{R}| = 2^{\aleph_0} |
| `thm.ordinal-trichotomy` | 序数可比 | title: 序数的三歧性：$\in$ 在 $\mathrm{On}$ 上是良序 |
| `prop.slice-cartesian` | 切片范畴是拉回 | title: 切片范畴的方块是笛卡尔的 |
| `lem.presheaf-mono-pointwise` | 预层态射的单满按点检验 | title: 预层是逐点算的 |
| `prop.adjoint-full-faithful` | 全忠实与单位 | title: 全忠实 $\iff$ 单位（余单位）是同构 |
| `ex.kan-extension` | Kan 延拓的两个例子 | title: 余极限与右伴随都是 Kan 延拓 |
| `prop.chaus-quotient-of-free` | 紧 Haus 是自由的商 | title: 每个紧 Hausdorff 空间都是自由紧 Hausdorff 空间的商 |
| `prop.free-projective` | 自由紧 Haus 是投射对象 | title: 自由紧 Hausdorff 空间是 $\mathbf{CHaus}$ 的投射对象 |
| `prop.precanonical-preserves` | 余积与商在层范畴中不变 | title: 预标准拓扑下余积与商不变 |
| `lem.representable-quotient` | 可表示性的下降 | title: 可表示性的下降引理 |
| `prop.cohomology-exact-sequence` | 同调的短正合列 | title: 把同调夹在两个余核 / 核之间 |
| `prop.localization-hom-colim` | 局部化的 Hom 是滤过余极限 | title: $\operatorname{Hom}_{\mathrm{ho}}(X,Y) = |
| `prop.ab-axioms-examples` | AB 公理的例子表 | title: 哪些范畴满足哪些 AB 公理 |
