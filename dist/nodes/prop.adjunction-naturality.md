# 伴随双射的自然性　`prop.adjunction-naturality`
命题：$\Phi$ 自然的显式写法
layer 10 · 命题 · 伴随与反射 · 范畴论

伴随双射 $\Phi_{X, X'} : \operatorname{Hom}\bigl(F(X), X'\bigr) \cong \operatorname{Hom}\bigl(X, G(X')\bigr)$ 的自然
> 陈述续见 `nodes/prop.adjunction-naturality.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-link.adjnat-adjoint.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.55

## 说明
**证明。** 代 $\Phi(f) = G(f) \circ \eta_{X}$ 与 $\Phi^{-1}(h) = \varepsilon_{X'} \circ F(h)$ ✓，两边都用单位与余单位的自然性即得那条等式 ✓。∎
