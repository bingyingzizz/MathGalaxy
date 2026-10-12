# 平坦张量保持零调　`prop.flat-tensor-acyclic`
命题：$P$ 平坦、$M$ 下有界零调 $\implies P \otimes M$ 零调
layer 20 · 命题 · 阿贝尔层 · 同调代数

设 $P$ 是拓扑斯里的**平坦**阿贝尔群，$M$ 是幂（
> 陈述续见 `nodes/prop.flat-tensor-acyclic.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.flat-abelian-sheaf` 平坦阿贝尔层：用到了定义 平坦阿贝尔层　proofs/def-link.flattensor-flat.md
- `def.quasi-iso` 拟同构：用到了定义 拟同构　proofs/def-link.flattensor-acyclic.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.39

## 说明
**证明。** 平坦就是说 $P \otimes_{\mathbb{Z}} -$ **正合** ✓。「下有界 + 零调」的复形就是一条正合列 ✓，正合函子把正合列仍送到正合列，所以 $P \otimes M$ 也正合，即零调 ✓。∎
