# 伴随延拓到图范畴　`prop.adjunction-extends-to-diagrams`
命题：$F \dashv G \implies F_{I} \dashv G_{I}$（逐点）
layer 14 · 命题 · 伴随与反射 · 范畴论

若 $F : \mathcal{C} \to \mathcal{D}$ 与 $G : \mathcal{D} \to \mathcal{C}$ 互为伴随，则对任意指标范畴 $I$，**逐点作用**给出图范畴之间的伴随
> 陈述续见 `nodes/prop.adjunction-extends-to-diagrams.2.md`


## 为什么成立（入边，证明在 proofs/）
- `prop.kan-extension-exists` 有余极限时 Kan 延拓总存在：Kan 延拓存在 $\implies$ 伴随延拓到图范畴　proofs/imp-link.kanex-adjdiag.md
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-link.adjdiag-adj.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.63

> 说明见 `notes/prop.adjunction-extends-to-diagrams.md`
