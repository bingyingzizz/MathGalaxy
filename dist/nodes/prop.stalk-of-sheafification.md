# 层化不改变茎　`prop.stalk-of-sheafification`
命题：$(T^{\#})_{x} = T_{x}$
layer 16 · 命题 · 层与拓扑 · 范畴论

设 $X$ 是拓扑空间、$T$ 是 $X$ 上的预层、$x \in X$。则层化不改变茎：
> 陈述续见 `nodes/prop.stalk-of-sheafification.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.sheaf` 层：用到了定义 层　proofs/def-link.stalksheafify-sheaf.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 3.57

## 说明
**证明。** 茎是沿 $x$ 的开邻域取的**滤过余极限** ✓，而层化是保滤过余极限的（它是保余极限的左伴随）✓；两侧都归结到 $T$ 在同一批邻域上的取值 ✓。∎
