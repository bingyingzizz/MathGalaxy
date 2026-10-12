# 紧 Hausdorff 上的函数空间是度量空间　`prop.continuous-map-space-metric`
命题：$S$ 紧 Hausdorff、$X$ （半）度量（完备）$\implies C(S, X)$ 也是
layer 16 · 命题 · 紧生成空间与弱 Hausdorff · 拓扑学

设 $S$ 是**紧 Hausdorff** 空间、$X$ 是（半）度量空间（resp. 完备）。则连续函数空间 $C(S, X)$ 的**紧开拓扑**来自一个（半）度量（resp. 并且是完备的），即

$$d(f, g) := \sup_{s \in S}\ d\bigl(f(s),\ g(s)\bigr).$$

## 为什么成立（入边，证明在 proofs/）
- `def.compact-open-topology` 紧开拓扑：用到了定义 紧开拓扑　proofs/def-link.cmapmetric-compactopen.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 2.29

> 说明见 `notes/prop.continuous-map-space-metric.md`
