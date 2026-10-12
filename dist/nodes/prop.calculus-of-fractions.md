# 分式演算下的局部化　`prop.calculus-of-fractions`
右分式演算 $\implies$ 局部化好算
layer 14 · 命题 · 范畴与图 · 范畴论

设 $\mathcal{C}$ 是小范畴、$W$ 是其中一族态射。称 $W$ **容许右分式演算**，如果：

1. $W$ 对复合封闭，且包含所有恒等态射；
2. **（Ore 条件）** 对任何 $w : X' \to X$ 与任何 $f : Y \to X$，存在 $g$ 与 $v \in W$ 使方块交换：
> 陈述续见 `nodes/prop.calculus-of-fractions.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.localization` 局部化：用到了定义 局部化　proofs/def-dep.fractions-localization.md
- `def.mono` 单态射 / 满态射：用到了定义 单态射 / 满态射　proofs/def-dep.fractions-mono.md

## 它能推出什么 / 谁在用它
- 被 `prop.localization-hom-colim` 局部化的 Hom 是滤过余极限 用
- 被 `prop.k-calculus-fractions` K(A) 允许分式演算 用

refs: Le Stum, An introduction to condensed mathematics, §1.1

> 说明见 `notes/prop.calculus-of-fractions.md`
