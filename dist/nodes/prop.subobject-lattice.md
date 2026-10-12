# 子对象构成有界格　`prop.subobject-lattice`
预拓扑斯中子对象构成有界格
layer 15 · 命题 · 拓扑斯 · 范畴论

设 $\mathcal{C}$ 是预拓扑斯，$X \in \mathcal{C}$。则子对象全体 $\{X' : X' \rightarrowtail X\}$ 构成一个**有界格**：

$$X_{1} \cup X_{2} := \operatorname{im}\bigl(X_{1} \coprod X_{2} \to X\bigr)$$

而且**拉回是格之间的同态**（保交、保并、保上界）。

## 为什么成立（入边，证明在 proofs/）
- `def.subobject` 子对象：用到了定义 子对象　proofs/def-dep.subobject-lattice.md
- `def.fibered-product` 纤维积 / 纤维余积：用到了定义 纤维积 / 纤维余积　proofs/def-dep.fibered-subobject-lattice.md

refs: Le Stum, An introduction to condensed mathematics, §3.3

> 说明见 `notes/prop.subobject-lattice.md`
