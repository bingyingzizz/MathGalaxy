# 全不连通空间是反射子范畴　`prop.td-reflective`
全不连通空间是 $\mathbf{Top}$ 的反射子范畴
layer 17 · 命题 · Stone 与 Stonean · 拓扑学

全不连通空间构成的范畴是 $\mathbf{Top}$ 的**反射子范畴**，反射是

$$\pi_{0} : \mathbf{Top} \longrightarrow \mathbf{Top}_{\mathrm{td}}, \qquad X \mapsto \pi_{0}(X)$$

并且 $X \to \pi_{0}(X)$ 是同构 $\iff$ $X$ 全不连通。

## 为什么成立（入边，证明在 proofs/）
- `def.stone-space` 全不连通与 Stone 空间：用到了定义 全不连通与 Stone 空间　proofs/def-dep.stone-td-reflective.md
- `def.connected` 连通与连通分量：用到了定义 连通与连通分量　proofs/def-dep.connected-td-reflective.md

refs: Le Stum, An introduction to condensed mathematics, §2.2

> 说明见 `notes/prop.td-reflective.md`
