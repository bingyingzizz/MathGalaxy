# 级数收敛　`def.series`
级数 $\sum a_n$（Series）
layer 12 · 定义 · 实数与极限 · 分析学

给定数列 $\{a_n\}$，令**部分和** $s_N := \sum_{n=1}^{N} a_n$。

称级数 $\sum_{n=1}^{\infty} a_n$ **收敛**，当且仅当部分和数列 $\{s_N\}$ 收敛，此时记

$$\sum_{n=1}^{\infty} a_n := \lim_{N \to \infty} s_N$$

**非负项级数**（$a_n \ge 0$）特别干净：部分和递增，于是

$$\sum_{n=1}^{\infty} a_n = \sup_N s_N \in [0, +\infty]$$

一定有意义（可能是 $+\infty$）。

## 为什么成立（入边，证明在 proofs/）
- `def.sequence-limit` 数列极限：用到了定义 数列极限　proofs/dep.real-series.md
- `def.sup` 上确界与下确界：用到了定义 上确界与下确界　proofs/dep.sup-series.md
- `thm.mct` 单调收敛定理：都是「取上确界」：把无穷一次性握在手里　proofs/ana.sup-extension.md

## 它能推出什么 / 谁在用它
- ～弱边 `thm.mct` 单调收敛定理

refs: Rudin, Principles of Mathematical Analysis, Ch. 3

> 说明见 `notes/def.series.md`
