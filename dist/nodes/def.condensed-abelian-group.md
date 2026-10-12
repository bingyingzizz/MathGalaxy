# 凝聚态阿贝尔群　`def.condensed-abelian-group`
凝聚态阿贝尔群（Condensed Abelian Group）
layer 17 · 定义 · 凝聚态阿贝尔群 · 凝聚态数学

**凝聚态阿贝尔群**就是 $\mathrm{Cond}$ 上的**阿贝尔层**。四种说法给出同一个范畴：

$$\mathrm{Ab}(\mathrm{Cond}) \;\simeq\; \mathrm{Cond}(\mathrm{Ab}) \;\simeq\; \widehat{\mathbf{CHaus}}(\mathrm{Ab}) \;\simeq\; \widehat{\mathbf{FCHaus}}(\mathrm{Ab})$$
> 陈述续见 `nodes/def.condensed-abelian-group.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.condensed-set` 凝聚态集：用到了定义 凝聚态集　proofs/def-dep.condensed-ab.md
- `def.sheaf` 层：用到了定义 层　proofs/def-dep.sheaf-condensed-ab.md
- `def.abelian-sheaf` 阿贝尔层：用到了定义 阿贝尔层　proofs/def-dep.condab-abelsheaf.md

## 它能推出什么 / 谁在用它
- 被 `lem.cech-finite-disjoint-acyclic` 有限不交覆盖的 Čech 零调 用
- 被 `prop.condab-discrete-acyclic` 离散空间上零调 用

- …另有出边，续页见 `nodes/def.condensed-abelian-group.3.md`

refs: Le Stum, An introduction to condensed mathematics, §6.1

> 说明见 `notes/def.condensed-abelian-group.md`
