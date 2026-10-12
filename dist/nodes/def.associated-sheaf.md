# 关联层　`def.associated-sheaf`
定义：$X^{\sharp} := h_{X}^{\#}$
layer 16 · 定义 · 层与拓扑 · 范畴论

设 $\mathcal{C}$ 是 site，$X \in \mathcal{C}$。**关联层**（associated sheaf）是「先米田嵌入、再层化」：

$$X^{\sharp} \;:=\; h_{X}^{\#}, \qquad h_{X} = \operatorname{Hom}_{\mathcal{C}}(-, X).$$

它由一条**万有性质**刻画：对任何层 $F$，
> 陈述续见 `nodes/def.associated-sheaf.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.sheaf` 层：用到了定义 层　proofs/def-link.assoc-sheaf.md
- `def.presheaf` 预层：用到了定义 预层　proofs/def-link.assoc-presheaf.md

## 它能推出什么 / 谁在用它
- 被 `prop.sheafification-slice-colimit` 层化是切片上的余极限 用

refs: Le Stum, An introduction to condensed mathematics, Definition 3.2.10

> 说明见 `notes/def.associated-sheaf.md`
