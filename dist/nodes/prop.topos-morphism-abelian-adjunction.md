# 拓扑斯态射在阿贝尔群上给出伴随　`prop.topos-morphism-abelian-adjunction`
命题：$f^{-1} \dashv f_{*}$ 升级到 $\mathcal{T}(\mathbf{Ab})$
layer 18 · 命题 · 拓扑斯 · 范畴论

设
> 陈述续见 `nodes/prop.topos-morphism-abelian-adjunction.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.topos-morphism` 拓扑斯的态射：用到了定义 拓扑斯的态射　proofs/def-link.toposab-adjunction.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.51

## 说明
**证明。** 在底层 $f^{-1} \dashv f_{*}$ 且 $f^{-1}$ 正合 ✓；而阿贝尔群层的结构是**逐点**给的（群运算是态射、等式逐点验证），所以这对伴随连同正合性自动升级到 $\mathbf{Ab}$ 这一层 ✓。∎
