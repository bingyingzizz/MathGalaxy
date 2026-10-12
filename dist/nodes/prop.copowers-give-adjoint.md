# 有余幂则可表示函子有伴随　`prop.copowers-give-adjoint`
命题：$\mathcal{C}$ 有余幂 $\implies$ $X^{(I)} \dashv h_{X}$
layer 10 · 命题 · 伴随与反射 · 范畴论

若
> 陈述续见 `nodes/prop.copowers-give-adjoint.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-link.copowers-adjoint.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.62

## 说明
**证明。** 余幂的泛性质给出 $\operatorname{Hom}_{\mathcal{C}}\bigl(X^{(I)}, Y\bigr) \cong \operatorname{Hom}_{\mathbf{Set}}\bigl(I, \operatorname{Hom}_{\mathcal{C}}(X, Y)\bigr) = \mathbf{Set}\bigl(I, h_{X}(Y)\bigr)$ ✓，正是伴随的定义 ✓。∎
