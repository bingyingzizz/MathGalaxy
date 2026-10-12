# Kan 延拓　`def.kan-extension`
Kan 延拓（Kan Extension）
layer 10 · 定义 · 伴随与反射 · 范畴论

设 $p : \mathcal{C} \to \mathcal{C}'$ 是小范畴之间的函子，$F : \mathcal{C} \to \mathcal{D}$。$F$ 沿 $p$ 的**左 Kan 延拓**是一个函子 $p_{!}F : \mathcal{C}' \to \mathcal{D}$ 连同一个自然变换

$$\alpha : F \implies p_{!}F \circ p$$
> 陈述续见 `nodes/def.kan-extension.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-dep.adjoint-kan.md
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.functor-kan.md
- `def.natural-transformation` 自然变换：用到了定义 自然变换　proofs/def-dep.nat-kan.md

## 它能推出什么 / 谁在用它
- ⇒ `ex.kan-extension` Kan 延拓的两个例子
- 被 `prop.kan-extension-adjoint` Kan 延拓与伴随的存在性 用
- 被 `prop.kan-extension-exists` 有余极限时 Kan 延拓总存在 用

- …另有出边，续页见 `nodes/def.kan-extension.3.md`

refs: Mac Lane, Categories for the Working Mathematician, X.3

> 说明见 `notes/def.kan-extension.md`
