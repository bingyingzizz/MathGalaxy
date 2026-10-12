# 积 / 余积　`def.product`
积与余积（Product / Coproduct）
layer 12 · 定义 · 图与极限 · 范畴论

取 $I$ 为**离散范畴**（只有对象，没有非恒等的态射），图 $D : I \to \mathcal{C}$ 就只是一族对象 $(X_i)_{i \in I}$。它的极限叫**积** $\prod_{i} X_i$，余极限叫**余积** $\coprod_{i} X_i$。泛性质写成同构集就是
> 陈述续见 `nodes/def.product.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.limit` 极限：用到了定义 极限　proofs/def-dep.limit-product.md
- `thm.product` 笛卡尔积存在：用到了定义 笛卡尔积存在　proofs/def-dep.product-set.md

## 它能推出什么 / 谁在用它
- 被 `prop.biproduct-is-product` 直和就是积 用
- 被 `prop.set-top-ab-complete` Set、Top、Ab 的完备性 用
- 被 `prop.coproduct-chaus` 不交并是紧 Hausdorff 的余积 用
- 被 `def.ab-axioms` Grothendieck 的 AB 公理 用
- 被 `def.internal-hom` 内 Hom 用
- 被 `def.monoid-object` 幺半群对象 用

- …另有出边，续页见 `nodes/def.product.3.md`

refs: Le Stum, An introduction to condensed mathematics, §1.3

> 说明见 `notes/def.product.md`
