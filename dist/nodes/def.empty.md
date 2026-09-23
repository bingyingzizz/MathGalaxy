# 空集 ∅　`def.empty`
空集（Empty Set）
layer 0 · 定义 · 集合的构造 · 集合论

**空集**是不含任何元素的集合：

$$\emptyset := \{ x : x \ne x \}$$

由外延公理，这样的集合至多一个；由分离公理模式（对任一集合 $A$ 取 $\{x \in A : x \ne x\}$），它确实存在。

于是对一切集合 $A$：$\emptyset \subseteq A$（空泛真），且 $\emptyset$ 是 $\subseteq$ 的最小元。

## 它能推出什么 / 谁在用它
- 被 `thm.empty` 空集存在 用
- 被 `def.union-inter` 并集与交集 用

refs: Kunen, Set Theory, I.5

## 说明
⭐「$\emptyset \in \mathcal{A}$」「$\emptyset \notin F$」这类条件在测度论里到处都是（选择公理要求集合族里没有空集；$\mu(\emptyset) = 0$ 是测度的第一条）。

⚠ 区分 $\emptyset$ 与 $\{\emptyset\}$：后者含一个元素（那个元素是空集），所以 $\{\emptyset\} \ne \emptyset$。
⚠ $\emptyset \subseteq A$ 是**空泛真**（vacuously true）：没有任何 $x \in \emptyset$ 需要检查。
