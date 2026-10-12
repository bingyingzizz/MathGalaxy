# 伴随函子都加法　`prop.adjoint-additive`
命题：加法范畴之间的伴随函子都是加法函子
layer 10 · 命题 · 加法与阿贝尔范畴 · 范畴论

设 $\mathcal{C}, \mathcal{D}$ 是加法范畴，$F : \mathcal{C} \to \mathcal{D}$ 左伴随 $G : \mathcal{D} \to \mathcal{C}$（记 $F \dashv G$）。则 $F$ 与 $G$ **都加法**，并且伴随的双射

$$\operatorname{Hom}_{\mathcal{D}}(FM, N) \;\cong\; \operatorname{Hom}_{\mathcal{C}}(M, GN)$$
> 陈述续见 `nodes/prop.adjoint-additive.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-link.adjadd-adjoint.md
- `def.additive-functor` 加法函子：用到了定义 加法函子　proofs/def-link.adjadd-addfun.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.subcat-additive` 子范畴继承加法与阿贝尔性

refs: Le Stum, An introduction to condensed mathematics, §5.1

> 说明见 `notes/prop.adjoint-additive.md`
