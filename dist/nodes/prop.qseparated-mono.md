# 拟分离嵌入底空间　`prop.qseparated-mono`
命题：$X$ 拟分离 $\implies$ $X \hookrightarrow X(\cdot)$ 是单态射
layer 18 · 命题 · 凝聚态集 · 凝聚态数学

若 $X$ 是**拟分离**的凝聚态集，则典范映射

$$X \longrightarrow \underline{X(\cdot)}$$

（把 $X$ 送到它的底拓扑空间 $X(\cdot)$ 所代表的凝聚态集）是**单态射**。

## 为什么成立（入边，证明在 proofs/）
- `prop.countable-colimit-qseparated` 可数递增余极限是拟分离的：拟分离即含入过渡的滤过余极限 $\implies$ 嵌入底空间是单的　proofs/imp-link.ccolim-qsepmono.md
- `def.underlying-topological-space` 底拓扑空间：用到了定义 底拓扑空间　proofs/def-link.qsepmono-underlying.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 4.13

> 说明见 `notes/prop.qseparated-mono.md`
