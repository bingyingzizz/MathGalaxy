# 范畴等价　`def.cat-equivalence`
范畴等价（Equivalence of Categories）
layer 10 · 定义 · 函子与自然变换 · 范畴论

函子 $F : \mathcal{C} \to \mathcal{C}'$ 叫**范畴等价**，如果存在函子 $G : \mathcal{C}' \to \mathcal{C}$ 与自然同构

$$F \circ G \cong 1_{\mathcal{C}'}, \qquad G \circ F \cong 1_{\mathcal{C}}$$
> 陈述续见 `nodes/def.cat-equivalence.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.ff-faithful` 忠实 / 满 / 全忠实 + `def.essentially-surjective` 本质满：全忠实 $+$ 本质满 $\implies$ 范畴等价　proofs/imp.equiv-criterion.md
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.functor-equivalence.md
- `def.natural-transformation` 自然变换：用到了定义 自然变换　proofs/def-dep.nat-equivalence.md

## 它能推出什么 / 谁在用它
- 被 `thm.equivalence-criterion` 等价函子的判据 用
- 被 `prop.preorder-as-category` 预序集就是「Hom 至多一元」的小范畴 用

- …另有出边，续页见 `nodes/def.cat-equivalence.3.md`

refs: Le Stum, An introduction to condensed mathematics, §1.2

> 说明见 `notes/def.cat-equivalence.md`
