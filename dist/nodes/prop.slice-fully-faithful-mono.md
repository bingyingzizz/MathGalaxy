# 单态射的切片刻画　`prop.slice-fully-faithful-mono`
命题：$f$ 单 $\iff$ $\mathcal{C}/Y \to \mathcal{C}/X$ 全忠实
layer 14 · 命题 · 单满、子对象与像 · 范畴论

态射 $f : Y \to X$ 是**单态射** $\iff$ 沿 $f$ 的切片函子

$$\mathcal{C}/Y \longrightarrow \mathcal{C}/X, \qquad (A \to Y) \longmapsto (A \to Y \to X)$$
> 陈述续见 `nodes/prop.slice-fully-faithful-mono.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.mono` 单态射 / 满态射：用到了定义 单态射 / 满态射　proofs/def-link.slicemono-mono.md
- `def.slice-category` 切片范畴：用到了定义 切片范畴　proofs/def-link.slicemono-slice.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.32

> 说明见 `notes/prop.slice-fully-faithful-mono.md`
