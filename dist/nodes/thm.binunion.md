# 二元并存在　`thm.binunion`
二元并 a ∪ b 存在
layer 1 · 定理 · 集合的构造 · 集合论

任给两个集合，它们的并仍是集合：

$$\forall a \forall b \exists A \forall x [ x \in A \leftrightarrow  ( x \in a \vee  x \in b ) ]$$

记作 $a \cup b$。

## 为什么成立（入边，证明在 proofs/）
- `ax.pair+ax.union` ax.pair+ax.union：配对公理 + 并集公理 ⇒ 二元并存在　proofs/imp.binunion.md

refs: Kunen, Set Theory, I.3

## 说明
$a \cup b$ 是包含 $a$ 与 $b$ 的最小集合（$\subseteq$意义下）。
