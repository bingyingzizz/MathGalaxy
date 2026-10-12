# 覆盖筛构成滤子　`prop.covering-sieves-filter`
命题：$J(X)$ 是筛的序集上的滤子
layer 15 · 命题 · 层与拓扑 · 范畴论

对每个 $X$，$J(X)$（$X$ 上的覆盖筛全体）是筛的序集上的**滤子**：

1. $J(X) \ne \emptyset$；
2. $R, R' \in J(X) \implies R \cap R' \in J(X)$（即 $J(X)$ 对下界封闭）；
3. $R \in J(X)$ 且 $R \subseteq R' \implies R' \in J(X)$（对更大的筛封闭）。

## 为什么成立（入边，证明在 proofs/）
- `def.grothendieck-topology` Grothendieck 拓扑：用到了定义 Grothendieck 拓扑　proofs/def-link.covsieve-gt.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 3.11

> 说明见 `notes/prop.covering-sieves-filter.md`
