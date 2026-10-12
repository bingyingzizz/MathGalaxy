# 自然同构不改变函子的性质　`prop.nat-iso-invariants`
命题：$F \cong F'$ 则两者忠实/满/全忠实/本质满/等价性一致
layer 11 · 命题 · 函子与自然变换 · 范畴论

若 $F 
> 陈述续见 `nodes/prop.nat-iso-invariants.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.cat-equivalence` 范畴等价：用到了定义 范畴等价　proofs/def-link.natisoinv-equiv.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.16

## 说明
**证明。** 自然同构在每对 Hom 集上给出一族与复合相容的双射 ✓，于是「$\operatorname{Hom}(X,Y) \to \operatorname{Hom}(FX, FY)$ 是不是双射」这件事两边同时成立 ✓；本质满与等价同理（同构平移对象）✓。∎
