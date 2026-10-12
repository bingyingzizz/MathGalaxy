# Hom 预层是层　`prop.hom-presheaf-sheaf`
命题：$U \mapsto \operatorname{Hom}_{/X}(U, Y)$ 是 $X$ 上的层
layer 16 · 命题 · 凝聚态集 · 凝聚态数学

设 $X$ 是拓扑空间、$Y \to X$ 是凝聚态集之间的态射（即 $Y \in \mathrm{Cond}/X$）。则预层

$$U \;\longmapsto\; Y(U) := \operatorname{Hom}_{/X}\bigl(\underline{U},\ Y\bigr) \qquad (U \subseteq X \text{ 开})$$

是 $X$ 上的一个**层**。

## 为什么成立（入边，证明在 proofs/）
- `prop.open-covering-covering` 开覆盖给出覆盖：开覆盖是覆盖 $\implies$ $\operatorname{Hom}$ 预层是层　proofs/imp-link.opencov-hompresheaf.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 4.7

> 说明见 `notes/prop.hom-presheaf-sheaf.md`
