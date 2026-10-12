# 伴随函子　`def.adjoint`
伴随函子（Adjoint Functors）
layer 9 · 定义 · 伴随与反射 · 范畴论

设 $F : \mathcal{C} \to \mathcal{D}$、$G : \mathcal{D} \to \mathcal{C}$ 是一对函子。$(F, G)$ 叫一对**伴随函子**，如果存在自然同构
> 陈述续见 `nodes/def.adjoint.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.functor-adjoint.md
- `def.category` 范畴：用到了定义 范畴　proofs/def-dep.category-adjoint.md
- `def.function` 函数：用到了定义 函数　proofs/def-dep.function-adjoint.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.right-adjoint-criterion` 右伴随存在的判据
- ⇒ `thm.right-adjoint-preserves-limits` 右伴随保极限
- ⇒ `ex.kan-extension` Kan 延拓的两个例子
- 被 `prop.adjoint-additive` 伴随函子都加法 用
- 被 `thm.right-adjoint-preserves-limits` 右伴随保极限 用
- 被 `ex.kan-extension` Kan 延拓的两个例子 用

- …另有出边，续页见 `nodes/def.adjoint.3.md`

refs: Le Stum, An introduction to condensed mathematics, §1.5

> 说明见 `notes/def.adjoint.md`
