# 正合就是逐点正合　`prop.exact-at-points`
命题：短正合 $\iff$ 三处都正合
layer 17 · 命题 · 加法与阿贝尔范畴 · 同调代数

设 $0 \to M' \xrightarrow{\ i\ } M \xrightarrow{\ p\ } M'' \to 0$ 是阿贝尔范畴里的列。则

- **短正合** $\iff$ 在 $M'$、$M$、$M''$ **三处都正合**；
- **左正合** $\iff$ 在 $M'$、$M$ 处正合；
- **右正合** $\iff$ 在 $M$、$M''$ 处正合。

## 为什么成立（入边，证明在 proofs/）
- `def.exact-sequence` 一般正合列：用到了定义 一般正合列　proofs/def-link.exactpts-exactseq.md
- `def.kernel-cokernel` 核与余核：用到了定义 核与余核　proofs/def-link.exactpts-kernel.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 5.10

> 说明见 `notes/prop.exact-at-points.md`
