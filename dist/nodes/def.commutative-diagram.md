# 图与交换图　`def.commutative-diagram`
图与交换图（Diagram / Commutative Diagram）
layer 9 · 定义 · 图与极限 · 范畴论

设 $I$ 是一个**小范畴**（只有一个小集合那么多对象与态射）。$\mathcal{C}$ 中**以 $I$ 为索引范畴的图**就是一个函子

$$D : I \longrightarrow \mathcal{C}$$

所有这样的图以自然变换为态射，组成范畴

$$\mathcal{C}^{I} := \operatorname{Hom}(I, \mathcal{C})$$
> 陈述续见 `nodes/def.commutative-diagram.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.functor-diagram.md
- `def.category` 范畴：用到了定义 范畴　proofs/def-dep.category-diagram.md

## 它能推出什么 / 谁在用它
- 被 `prop.limit-adjoint` 极限即伴随 用
- 被 `prop.filtered-exact` 滤过余极限正合 用
- 被 `def.simplicial` 单纯对象 用
- 被 `def.limit` 极限 用
- 被 `def.cochain-complex` 上链复形 用
- 被 `def.filtered-category` 滤过范畴 用

refs: Le Stum, An introduction to condensed mathematics, §1.3

> 说明见 `notes/def.commutative-diagram.md`
