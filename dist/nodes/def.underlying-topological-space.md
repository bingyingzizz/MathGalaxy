# 底拓扑空间　`def.underlying-topological-space`
凝聚态集的底拓扑空间
layer 16 · 定义 · 凝聚态集 · 凝聚态数学

凝聚态集 $X$ 的**底拓扑空间** $X(\cdot)$ 取集合 $X(\ast)$（在单点空间处的截面），并赋予使所有映射

$$f : S \longrightarrow X(\cdot), \qquad f \in X(S),\ S \in \mathbf{CHaus}$$

都连续的**最细**拓扑。

## 为什么成立（入边，证明在 proofs/）
- `def.chaus` 紧 Hausdorff 空间范畴：用到了定义 紧 Hausdorff 空间范畴　proofs/def-dep.chaus-underlying.md

## 它能推出什么 / 谁在用它
- 被 `cor.cond-ktop-finite-products` 底空间保有限积 用
- 被 `prop.projection-formula-cond` 投影公式 用

refs: Le Stum, An introduction to condensed mathematics, §4

> 说明见 `notes/def.underlying-topological-space.md`
