# 内 Hom　`def.internal-hom`
内 Hom（Internal Hom）
layer 17 · 定义 · 阿贝尔层 · 同调代数

设 $\mathcal{T}$ 是拓扑斯，$X \in \mathcal{T}$、$M \in \mathcal{T}(\mathbf{Ab})$。则

$$\operatorname{Hom}(X, M) : Y \longmapsto \operatorname{Hom}(X \times Y,\ M) \;\cong\; \operatorname{Hom}_{\mathbb{Z}}\bigl(\mathbb{Z}\cdot(X \times Y),\ M\bigr)$$
> 陈述续见 `nodes/def.internal-hom.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.product` 积 / 余积：用到了定义 积 / 余积　proofs/def-dep.internalhom-product.md
- `def.abelian-sheaf` 阿贝尔层：用到了定义 阿贝尔层　proofs/def-dep.internalhom-abelsheaf.md
- `def.topos` 拓扑斯：用到了定义 拓扑斯　proofs/def-dep.internalhom-topos.md

## 它能推出什么 / 谁在用它
- 被 `prop.discrete-cond-rhom-constant` 离散群的 RHom 是常层 用
- 被 `prop.tensor-rhom-natural-map` 张量与 RHom 的配对 用
- 被 `prop.cohomology-as-ext` 上同调就是 Ext 用

- …另有出边，续页见 `nodes/def.internal-hom.3.md`

refs: Le Stum, An introduction to condensed mathematics, §5.3

> 说明见 `notes/def.internal-hom.md`
