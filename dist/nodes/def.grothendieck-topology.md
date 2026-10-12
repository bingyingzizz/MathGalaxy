# Grothendieck 拓扑　`def.grothendieck-topology`
Grothendieck 拓扑与 site（Grothendieck Topology, Site）
layer 14 · 定义 · 层与拓扑 · 范畴论

范畴 $\mathcal{C}$ 上的 **Grothendieck 拓扑**是对每个 $X$ 指定一族**覆盖筛** $J(X)$，满足：
> 陈述续见 `nodes/def.grothendieck-topology.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.sieve` 筛：用到了定义 筛　proofs/def-dep.sieve-topology.md
- `def.presheaf` 预层：用到了定义 预层　proofs/def-dep.presheaf-topology.md
- `def.pretopology` 预拓扑：用到了定义 预拓扑　proofs/def-dep.pretopology-topology.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.covering-sieve-epi` 覆盖筛即余积满射
- 被 `prop.open-covering-covering` 开覆盖给出覆盖 用
- 被 `prop.covering-sieves-filter` 覆盖筛构成滤子 用
- 被 `prop.topos-covering-epi` 拓扑斯中覆盖即余积满射 用
- 被 `def.sheaf` 层 用
- 被 `def.canonical-topology` 标准拓扑 用

- …另有出边，续页见 `nodes/def.grothendieck-topology.3.md`

refs: Le Stum, An introduction to condensed mathematics, §3.1–3.2

> 说明见 `notes/def.grothendieck-topology.md`
