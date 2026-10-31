# 数学星图 · 术语表（中 → 英）

> English version: **draft** · Chinese source is authoritative · machine-drafted, pending author review.

给译者 / 英文页用的对照表。**有英文键的一律从代码里的键现算**（改键即改表）；
带 `+` 的行是代码里没有对应英文键、由 `docs.en.js` 补的。

## 节点类型（`src/core/config.js` 的 `nodeTypes` 键）

- `axiom`　公理
- `definition`　定义
- `theorem`　定理
- `lemma`　引理
- `proposition`　命题
- `corollary`　推论
- `example`　例

## 边：四种 kind ＋ 一种推论标记（`edgeNames` / `edgeStyles` 键）

- `implication`　推出　（strong edge）
- `equivalence`　等价　（strong edge）
- `definition`　定义引用　（strong edge）
- `analogy`　类比　（weak edge）

⚠️ `implication` 里另有一类 **`layer:false` 的「推论」**：真推出，但不是前提（用高级工具回头证低级定理），**不参与分层**、不抬高目标层号。
它不是第五种 kind —— 数据里只多一个 `layer:false`；画成**粉红实线带箭头**（⛔ 不是虚线，虚线是「类比」的语义），不与 `edgeNames` / `edgeStyles` 的键并列。

## 记号表分组（`notation.js` 的 `groups`）

- `set`　逻辑与集合　→　Logic and sets　39 条
- `order`　序、基数与序数　→　Order, cardinals, ordinals　18 条
- `num`　数系与分析基础　→　Number systems and real analysis　26 条
- `topo`　拓扑与度量　→　Topology and metrics　6 条
- `measure`　测度与 σ-代数　→　Measure and σ-algebras　25 条
- `integral`　积分与函数空间　→　Integration and function spaces　16 条
- `linalg`　线性代数　→　（缺）　16 条
- `layout`　排版与箭头　→　Typesetting and arrows　13 条
- `cat`　范畴与同调　→　Categories and homology　21 条
- `letters`　字母约定　→　Letter conventions　22 条

## 星系（`regions.js` 的 `en` 字段）

- `logic`　数理逻辑　→　Mathematical Logic
- `set-theory`　集合论　→　Set Theory
- `order-theory`　序理论　→　Order Theory
- `topology`　拓扑学　→　Topology
- `algebra`　抽象代数　→　Abstract Algebra
- `analysis`　数学分析　→　Mathematical Analysis
- `analysis-measure`　实变函数　→　Functions of a Real Variable
- `category`　范畴论　→　Category Theory
- `homology`　同调代数　→　Homological Algebra
- `condensed`　凝聚态数学　→　Condensed Mathematics
- `analytic`　解析空间　→　Analytic Spaces
- `complex`　复变函数　→　Complex Analysis
- `diffgeom`　微分几何　→　Differential Geometry
- `number`　数论　→　Number Theory

## 其它（`+` = 手工新造）

- 节点　→　node　`+`　— 画布上的一颗星；一个概念一个节点
- 恒星　→　star　`+`　— 「三层尺度」里对节点的比喻说法
- 依赖深度　→　dependency depth　`+`　— layer 的中文名
- 强边　→　strong edge　`+`　— implication / equivalence / definition
- 弱边　→　weak edge　`+`　— analogy；不参与分层
- 推论边　→　derived edge　`+`　— implication + layer:false；粉红实线箭头，逻辑成立但不参与分层
- 中心天体　→　hub　`+`　— clusters.js 的 hub 字段
- 定义引用　→　definition reference　`+`　— 蓝色半透明线
- 别名　→　alias　`+`　— aliases.js 的 aka
- 问题钩子　→　question hook　`+`　— 别名表里的「问法」条目
- 深链　→　deep link　`+`　— #n=<节点id>
- 内容版本　→　content version　`+`　— tools/ids.snapshot.json 里的 vX.Y.Z
- 概念页　→　concept page　`+`　— nodes/<id>.html
- 拼写口径　→　spelling: American English (-ize, -ization)　`+`　— T2.1 定；⛔ 不混英式 -ise / -our / centre。人名保留变音符：Čech / Hölder / Teichmüller / Radon–Nikodym
- 连字符人名　→　hyphenated names keep their hyphen　`+`　— Heine-Borel / Cartan-Leray / Lebesgue–Stieltjes；aka 里 ASCII 连字符与 en dash 两种写法都收
