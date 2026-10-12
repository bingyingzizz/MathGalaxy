# 终映射给出的拓扑斯态射　`prop.topos-morphism-final-map`
命题：$p : X \to \mathbf{1}$ 给出 $p_{*} = \Gamma(X, -)$、$p^{-1}E = \widetilde{E}_{X}$
layer 20 · 命题 · 拓扑斯 · 范畴论

设 $X$ 是拓扑空间、$p : X \to \mathbf{1}$ 是到单点的映射。则它给出的拓扑斯态射满足

$$p_{*}\mathcal{F} = \Gamma(X, \mathcal{F}), \qquad p^{-1}E = \widetilde{E}_{X};$$
> 陈述续见 `nodes/prop.topos-morphism-final-map.2.md`


## 为什么成立（入边，证明在 proofs/）
- `prop.topos-morphism-from-object` 对象给出拓扑斯态射 + `prop.constant-sheaf-top` 拓扑空间上的常层就是离散空间的层：对象给出的拓扑斯态射 $\implies$ 终映射的情形　proofs/imp-link.topmorobj-topmorfinal.md
- `def.topos-morphism` 拓扑斯的态射：用到了定义 拓扑斯的态射　proofs/def-link.topmorfinal-toposmor.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 3.55

> 说明见 `notes/prop.topos-morphism-final-map.md`
