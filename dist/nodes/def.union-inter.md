# 并集与交集　`def.union-inter`
并集 / 交集（Union & Intersection）
layer 2 · 定义 · 集合的构造 · 集合论

设 $\mathcal{A}$ 是一族集合（$A$ 的**并**与**交**是它只有两个成员时的特例）：

$$\bigcup \mathcal{A} := \{ x : \exists A \in \mathcal{A},\ x \in A \}$$
$$\bigcap \mathcal{A} := \{ x : \forall A \in \mathcal{A},\ x \in A \}$$

两个集合的情形记作 $A \cup B$、$A \cap B$；可数族的并、交常记作 $\bigcup_{n} A_n$、$\bigcap_{n} A_n$。

显然 $A \cap B \subseteq A \subseteq A \cup B$。

## 为什么成立（入边，证明在 proofs/）
- `def.subset` 子集：用到了定义 子集　proofs/dep.subset-union-inter.md
- `def.empty` 空集 ∅：用到了定义 空集 ∅　proofs/dep.empty-union.md

refs: Kunen, Set Theory, I.5

## 说明
由并集公理，$\bigcup \mathcal{A}$ 是集合；$\bigcap \mathcal{A}$ 由分离公理模式取出。

⭐ **「对可数并封闭」「对可数交封闭」是整段测度论反复出现的条件**（$\sigma$-环、$\sigma$-代数、单调类都是这么定义的）。

⚠ 分配律对任意族都成立：$A \cap \bigcup_i B_i = \bigcup_i (A \cap B_i)$；补与并、交的交换就是 De Morgan 律。
