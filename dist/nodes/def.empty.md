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

> 说明见 `notes/def.empty.md`
