# 拓扑斯的态射　`def.topos-morphism`
拓扑斯的态射（Morphism of Toposes）
layer 17 · 定义 · 拓扑斯 · 范畴论

拓扑斯的**态射** $f : \mathcal{T} \to \mathcal{T}'$ 是一对函子

$$f^{*} : \mathcal{T}' \longrightarrow \mathcal{T}, \qquad f_{*} : \mathcal{T} \longrightarrow \mathcal{T}'$$
> 陈述续见 `nodes/def.topos-morphism.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.topos` 拓扑斯：用到了定义 拓扑斯　proofs/def-dep.topos-morphism.md
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-dep.adjoint-topos-morphism.md
- `def.limit` 极限：用到了定义 极限　proofs/def-dep.limit-topos-morphism.md

## 它能推出什么 / 谁在用它
- 被 `thm.induced-topos-morphism` 任意函子诱导拓扑斯态射 用
- 被 `prop.topos-morphism-abelian-adjunction` 拓扑斯态射在阿贝尔群上给出伴随 用
- 被 `prop.derived-pushforward-composition` 推前的复合 用
- 被 `prop.inverse-image-constant-sheaf` 常层沿拉回不变 用

- …另有出边，续页见 `nodes/def.topos-morphism.3.md`

refs: Le Stum, An introduction to condensed mathematics, §3.3

> 说明见 `notes/def.topos-morphism.md`
