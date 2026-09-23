# 子集的紧性刻画　`prop.subset-compact-equiv`
命题：X 完备时，A 紧 ⟺ A 闭且全有界
layer 13 · 命题 · 度量空间 · 拓扑学

设 (X, d) 是**完备**的距离空间，$A \subseteq X$。则

$$A\text{ 紧} \iff A\text{ 闭}\text{ 且} A\text{ 全有界}$$

（「$A$ 全有界」按子空间度量 d|A 理解。）

## 为什么成立（入边，证明在 proofs/）
- `def.compact` 紧：用到了定义 紧　proofs/def-link.compact-subset-equiv.md
- `def.totally-bounded` 全有界：用到了定义 全有界　proofs/def-link.totbdd-subset-equiv.md
- `def.complete` 完备：用到了定义 完备　proofs/def-link.complete-subset-equiv.md

refs: Munkres, Topology, §28；Rudin, Principles of Mathematical Analysis, Ch. 2

## 说明
⚠ **「$X$ 完备」这个前提不能省。** 理由是中间那一步：$A$ 作为子空间完备 $\iff A$ 在 $X$ 中闭 —— 这一步要用 $X$ 完备。少了它，$A$ 闭 $A$ 全有界推不出 $A$ 紧。

这也是 **Heine–Borel** 的推广：$\mathbb{R}^{n}$ 完备，而在 $\mathbb{R}^{n}$ 中 $A$ 有界 $\iff A$ 全有界，于是「有界闭集紧」正是它的特例。
