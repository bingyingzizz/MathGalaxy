# 有余极限时 Kan 延拓总存在　`prop.kan-extension-exists`
命题：$\mathcal{D}$ 有余极限 $\implies$ 沿 $p$ 的左 Kan 延拓总存在
layer 13 · 命题 · 伴随与反射 · 范畴论

若 $\mathcal{D}$ 有**所有小余极限**，则任意 $F : \mathcal{C} \to \mathcal{D}$ 沿任意 $p : \mathcal{C} \to \mathcal{C}'$ 的**左 Kan 延拓总存在**，并可由**逐点公式**算出：
> 陈述续见 `nodes/prop.kan-extension-exists.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.kan-extension` Kan 延拓：用到了定义 Kan 延拓　proofs/def-link.kanex-kan.md
- `def.comma-category` 逗号范畴：用到了定义 逗号范畴　proofs/def-link.kanex-comma.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.induced-topos-morphism` 任意函子诱导拓扑斯态射

refs: Le Stum, An introduction to condensed mathematics, Proposition 1.5.11

> 说明见 `notes/prop.kan-extension-exists.md`
