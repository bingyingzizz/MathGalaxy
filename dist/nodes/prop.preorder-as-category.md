# 预序集就是「Hom 至多一元」的小范畴　`prop.preorder-as-category`
命题：预序集 $\hookrightarrow$ 小范畴，且与其有序商等价
layer 11 · 命题 · 范畴与图 · 范畴论

1. 把预序集看成小范畴（$x \le y$ 给唯一态射）给出一个**全忠实**函子，其本质像恰是「每对对象之间至多一个态射」的小范畴；
2. 预序集 $X$ 与它的**有序商** $Y$（把 $x \le y \le x$ 粘起来）是**等价**的范畴。

## 为什么成立（入边，证明在 proofs/）
- `def.category` 范畴：用到了定义 范畴　proofs/def-link.preorder-cat.md
- `def.cat-equivalence` 范畴等价：用到了定义 范畴等价　proofs/def-link.preorder-equiv.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.15, Exercise 1.18

> 说明见 `notes/prop.preorder-as-category.md`
