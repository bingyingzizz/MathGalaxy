# 差集与补集　`def.diff-complement`
差集 / 补集 / 对称差（Difference, Complement & Symmetric Difference）
layer 2 · 定义 · 集合的构造 · 集合论

设 $A$、$B$、$X$ 是集合且 $A, B \subseteq X$：

- **差集**：$A \setminus B := \{ x \in A : x \notin B \}$；
- **补集**（相对于 $X$）：$A^{c} := X \setminus A$；
- **对称差**：$A \triangle B := (A \setminus B) \cup (B \setminus A)$。

基本恒等式：

$$A \setminus B = A \cap B^{c}, \qquad (A^{c})^{c} = A, \qquad (\bigcup_i A_i)^{c} = \bigcap_i A_i^{c}$$

最后一条就是 **De Morgan 律**。

## 为什么成立（入边，证明在 proofs/）
- `def.subset` 子集：用到了定义 子集　proofs/dep.subset-diff.md

## 它能推出什么 / 谁在用它
- 被 `def.closed-set` 闭集与闭包 用

refs: Kunen, Set Theory, I.5

## 说明
⭐ De Morgan 律是「用差 + 可数并推出可数交」的全部依据：$\bigcap_n A_n = A_1 \setminus \bigcup_{n \ge 2} (A_1 \setminus A_n)$ —— $\sigma$-环只要求对差与可数并封闭，可数交就自动有了。

⚠ **补集必须相对于某个全集 $X$ 才有意义**，这也正是 $\sigma$-代数要含 $X$ 的原因：不含 $X$ 就只剩 $\sigma$-环，补运算落不到里面。
