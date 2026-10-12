# 切片上的正合左伴随　`prop.abelian-slice-adjunction`
命题：$j_{X!} \dashv j_{X}^{-1}$ 且 $j_{X!}$ 正合
layer 17 · 命题 · 拓扑斯 · 范畴论

设
> 陈述续见 `nodes/prop.abelian-slice-adjunction.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.topos` 拓扑斯：用到了定义 拓扑斯　proofs/def-link.sliceadj-slice.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.57

## 说明
**证明。** 预层情形有显式公式

$$j_{S!}M(U) = \bigoplus_{s : U \to S} M(s) ✓$$

它明显是 $j_{S}^{-1}$ 的左伴随 ✓，正合性来自「$\bigoplus$ 与拉回交换」✓。一般拓扑斯上把两边层化即得 ✓（正合性对层化保持，因为层化正合）✓。∎
