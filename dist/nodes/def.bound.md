# 上界与极大元　`def.bound`
上界 / 上确界 / 极大元（Bound & Maximal Element）
layer 6 · 定义 · 序结构 · 序理论

设 $(P, \preceq )$ 是偏序集，$S \subseteq P$，$u, m \in P$。

- **$u$ 是 $S$ 的上界**：$\forall s \in S, s \preceq u$。
- **$u$ 是 $S$ 的上确界**（记 sup S）：$u$ 是上界，且 $u \preceq$ 每一个上界。
- **$m$ 是 $P$ 的极大元**：$$\forall x \in P ( m \preceq x \to x = m )$$，即没有比 $m$ 更大的元素。
- **$m$ 是 $P$ 的最大元**：$\forall x \in P, x \preceq m$，即 $m$ 比所有元素都大。
> 陈述续见 `nodes/def.bound.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.poset` 偏序集：用到了定义 偏序集　proofs/def-link.bound-poset.md
- `def.subset` 子集：用到了定义 子集　proofs/def-dep.subset-bound.md

## 它能推出什么 / 谁在用它
- 被 `lem.zorn` 佐恩引理 用

refs: Kunen, Set Theory, I.11

> 说明见 `notes/def.bound.md`
