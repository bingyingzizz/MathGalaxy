# 闭集与闭包　`def.closed-set`
闭集 / 闭包 / 稠密（Closed Set, Closure）
layer 4 · 定义 · 拓扑空间 · 拓扑学

设 $(X, \mathcal{T})$ 是拓扑空间。

- $F \subseteq X$ 是**闭集**：$X \setminus F$ 是开集；
- $A \subseteq X$ 的**闭包** $\operatorname{cl} A$：一切包含 $A$ 的闭集之交（最小的那个闭集）；
- $A$ **稠密**：$\operatorname{cl} A = X$；
- $x$ 的**邻域**：任何含 $x$ 的开集（的包含者）。

由 De Morgan 律，开集的三条公理翻译成闭集就是：$\emptyset, X$ 闭；**任意**交闭；**有限**并闭。

## 为什么成立（入边，证明在 proofs/）
- `def.topology` 拓扑空间与开集：用到了定义 拓扑空间与开集　proofs/dep.topology-closed.md
- `def.diff-complement` 差集与补集：用到了定义 差集与补集　proofs/dep.diff-complement-closed.md

## 它能推出什么 / 谁在用它
- 被 `prop.compact-subset-closed` 紧子集是闭的 用

refs: Munkres, Topology, Ch. 2

## 说明
⭐ 开与闭不是互斥的：$\emptyset$ 与 $X$ 既开又闭；在 $\mathbb{R}$ 里 $[0, 1]$ 是闭的，$[0, 1)$ 既不开也不闭。

闭包是「把极限点都收进来」：在距离空间里 $\operatorname{cl} A$ 恰好是「$A$ 中某个序列的极限」全体。
