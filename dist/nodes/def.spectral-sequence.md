# 谱序列　`def.spectral-sequence`
谱序列（Spectral Sequence）
layer 16 · 定义 · 过滤与谱序列 · 同调代数

**谱序列**由两部分组成：

1. 一族复形 $E^{p,q}_{r}$（$p, q, r \in \mathbb{Z}$，$r \ge r_{0}$），微分

$$d^{p,q}_{r} : E^{p,q}_{r} \longrightarrow E^{p+r,\, q-r+1}_{r}$$
> 陈述续见 `nodes/def.spectral-sequence.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.cochain-complex` 上链复形：用到了定义 上链复形　proofs/def-dep.complex-spectral-sequence.md
- `def.filtration` 过滤：用到了定义 过滤　proofs/def-dep.filtration-spectral-sequence.md

## 它能推出什么 / 谁在用它
- 被 `prop.spectral-degenerate-row` 谱序列的退化行 用
- 被 `prop.five-term-spectral-sequence` 谱序列的五项正合列 用
- 被 `prop.spectral-sequence-page-picture` 谱序列的页画在 (p,q) 平面上 用
- 被 `thm.filtered-complex-spectral` 过滤复形给出谱序列 用
- 被 `cor.grothendieck-spectral` Grothendieck 谱序列 用

- …另有出边，续页见 `nodes/def.spectral-sequence.3.md`

refs: Le Stum, An introduction to condensed mathematics, §7.2

> 说明见 `notes/def.spectral-sequence.md`
