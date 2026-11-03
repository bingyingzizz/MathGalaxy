# 数学星图 · 内容体检（警告级）

由 `tools/build.mjs` 生成。**不是硬门**：这三类都会误报，先看，别急着改数据。

## 一、正文引用了不存在的 id（0 个）

（没有）

## 二、近同名却没有任何边（19 对）

判据：label 去掉括注/空格后相同或前缀相近（与 `_tools/_nov15.mjs` 同口径），且两颗星之间一条边都没有。

- Lebesgue 可测（`def.lebesgue-measurable` L7）⇸ Lebesgue 集（`def.lebesgue-set` L22）
- 矩阵范数（`def.matrix-norm` L22）⇸ 矩阵范畴（`prop.matrix-category` L8）
- Gauss 引理（`lem.gauss-lemma` L28）⇸ Gauss 引理（二次剩余）（`lem.gauss-qr` L16）
- 可除群的商（`prop.divisible-quotient` L8）⇸ 可除群的例子（`ex.divisible-groups` L19）
- étale 空间（`def.etale-space` L5）⇸ étale 层（`def.etale-sheaf` L16）
- Euler 公式（`thm.euler-formula-surface` L27）⇸ Euler 公式（`thm.euler-formula` L17）
- Riemann 度量（`def.riemannian-metric` L25）⇸ Riemann 和（`def.riemann-sum` L15）
- Cauchy 不等式（`thm.cauchy-inequality` L22）⇸ Cauchy 列（`def.cauchy-sequence` L14）
- Cauchy 列（`def.cauchy-sequence` L14）⇸ Cauchy 乘积（`thm.series-product` L21）
- Riemann 曲率张量（`def.curvature-tensor` L23）⇸ Riemann 曲面（`def.riemann-surface` L18）
- Lie 括号（`def.lie-bracket` L20）⇸ Lie 群（`def.lie-group` L25）
- Lie 群（`def.lie-group` L25）⇸ Lie 代数（`def.lie-algebra` L21）
- Lie 群（`def.lie-group` L25）⇸ Lie 导数（`def.lie-derivative` L21）
- Riemann 曲面（`def.riemann-surface` L18）⇸ Riemann 和（`def.riemann-sum` L15）
- 第二基本形式对称（`lem.second-form-symmetric` L24）⇸ 第二基本形式（`def.second-fundamental-form` L26）
- 绝对连续（`def.absolute-continuity` L16）⇸ 绝对连续函数（`def.ac-function` L14）
- Riemann 和（`def.riemann-sum` L15）⇸ Riemann 可积（`def.riemann-integrable` L16）
- 足够多内射对象（`thm.mod-enough-injectives` L19）⇸ 足够多内射层（`thm.pushforward-enough-injectives` L19）
- 上同调类（`def.cohomology-class` L18）⇸ 上同调函子（`def.cohomological-functor` L18）

## 三、黑边子图上的环（2 个）

判据见审计 §9-H2：**环里有 equivalence 边 = 合法**（等价类本来就会缩成一个 SCC）；**白名单 = 多前提假环**（`src/data/gaps.js` 的 `cycleOk`，每条都写了理由）；**其余 = 可疑**（要么改 `equivalence`，要么标 `layer:false`，要么这条边就是错的）。

- ✅ 等价类（合法）：`ax.choice` ↔ `thm.wellordering` ↔ `lem.zorn`
  - 环上的边：`eq.ac-wo` · `eq.wo-zorn` · `imp.zorn-choice`
- ⚪ 白名单（多前提假环）：`def.sequentially-compact` ↔ `def.totally-bounded` ↔ `def.complete`
  - 环上的边：`imp.seqcompact-totbdd` · `imp.seqcompact-complete` · `imp.complete-totbdd-seqcompact`
  - 为什么不算循环：多前提假环：列紧 ⟹ 全有界（无条件），完备 + 全有界 ⟹ 列紧（带假设）。图层对 sources 一视同仁，于是「完备是列紧的前提」与「列紧是完备的前提」同时成立 —— 不是数学循环。

## 四、证明完成度标注（status）

值只许 `complete`（缺省）/ `skeleton` / `external-input`。正文自己说「骨架 / 未展开 / 外部输入」却没标注的，列在下面。

（没有）

