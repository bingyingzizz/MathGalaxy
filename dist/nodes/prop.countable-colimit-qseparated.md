# 可数递增余极限是拟分离的　`prop.countable-colimit-qseparated`
命题：$X = \varinjlim_{n} S_{n}$（含入、可数）$\implies$ 拟分离
layer 17 · 命题 · 凝聚态集 · 凝聚态数学

若 $X = \varinjlim_{n \in \mathbb{N}} S_{n}$ 是一列紧 Hausdorff 空间沿**含入** $S_{n} \hookrightarrow S_{n+1}$ 的拓扑余极限，则
> 陈述续见 `nodes/prop.countable-colimit-qseparated.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.quasi-separated` 拟分离对象：用到了定义 拟分离对象　proofs/def-link.ccolim-qsep.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.qseparated-mono` 拟分离嵌入底空间

refs: Le Stum, An introduction to condensed mathematics, Exercise 4.12

> 说明见 `notes/prop.countable-colimit-qseparated.md`
