# 拓扑公理的替代形式　`prop.topology-alternative-axiom`
命题：最后一条公理可换成「放大 + 局部化」
layer 15 · 命题 · 层与拓扑 · 范畴论

Grothendieck 拓扑定义里**最后一条公理**可以换成：对一切 $R \subseteq R' \subseteq h_{X}$，

$$R \in J(X) \implies R' \in J(X), \qquad \bigl(R' \in J(X) \text{ 且 } \forall f \in R'(Y),\ f^{-1}(R) \in J(Y)\bigr) \implies R \in J(X).$$

## 为什么成立（入边，证明在 proofs/）
- `def.grothendieck-topology` Grothendieck 拓扑：用到了定义 Grothendieck 拓扑　proofs/def-link.altaxiom-gt.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 3.12

> 说明见 `notes/prop.topology-alternative-axiom.md`
