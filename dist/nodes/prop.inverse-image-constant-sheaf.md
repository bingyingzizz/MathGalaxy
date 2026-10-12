# 常层沿拉回不变　`prop.inverse-image-constant-sheaf`
命题：$f^{-1}\overline{E} = \overline{E}$
layer 18 · 命题 · 层与拓扑 · 范畴论

设
> 陈述续见 `nodes/prop.inverse-image-constant-sheaf.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.topos-morphism` 拓扑斯的态射：用到了定义 拓扑斯的态射　proofs/def-link.invconst-toposmor.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 3.50

## 说明
**证明。** 常层由余极限拼出：$\overline{E} = \coprod_{e \in E} \mathbf{1}$ ✓；而 $f^{-1}$ 是**左伴随**，保余极限，且 $f^{-1}\mathbf{1} = \mathbf{1}$ ✓，于是 $f^{-1}\overline{E} = \coprod_{e} f^{-1}\mathbf{1} = \overline{E}$ ✓。∎
