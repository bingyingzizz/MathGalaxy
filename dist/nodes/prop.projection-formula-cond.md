# 投影公式　`prop.projection-formula-cond`
投影公式：$S \times X(\cdot) \cong (S \times X)(\cdot)$
layer 19 · 命题 · 凝聚态集 · 凝聚态数学

设 $X$ 是凝聚态集，$S$ 是**局部紧 Hausdorff** 拓扑空间。则

$$S \times X(\cdot) \;\cong\; (S \times X)(\cdot).$$

（左边是底空间 $X(\cdot)$ 与 $S$ 的拓扑积；$S$ 紧 Hausdorff 时这就是「把 $S$ 拉进来不影响 $k$-化」。）

## 为什么成立（入边，证明在 proofs/）
- `cor.cond-ktop-finite-products` 底空间保有限积 + `prop.k-product` k-化与积：底空间保有限积 + $k$-化与积 $\implies$ 投影公式　proofs/imp-link.finprod-projcond.md
- `def.underlying-topological-space` 底拓扑空间：用到了定义 底拓扑空间　proofs/def-link.projcond-underlying.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 4.11

> 说明见 `notes/prop.projection-formula-cond.md`
