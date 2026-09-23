# Cauchy 列与零列　`def.cauchy-null`
有理 Cauchy 列 / 零列 / 等价（Cauchy & Null Sequences）
layer 9 · 定义 · 数系的构造 · 集合论+分析学

设 $(x_n)$ 是**有理数列**（即函数 $\omega \to \mathbb{Q}$），$|x|$ 是 $\mathbb{Q}$ 上的绝对值，$\varepsilon$ 一律取**正有理数**（此时还不需要实数）。

$(x_n)$ 是 **Cauchy 列**：

$$\forall \varepsilon > 0,\ \exists N,\ \forall m, n \ge N : |x_m - x_n| < \varepsilon$$

$(x_n)$ 是**零列**：

$$\forall \varepsilon > 0,\ \exists N,\ \forall n \ge N : |x_n| < \varepsilon$$

> 陈述续见 nodes/def.cauchy-null.2.md

## 为什么成立（入边，证明在 proofs/）
- `def.rat` 有理数 ℚ：用到了定义 有理数 ℚ　proofs/dep.rat-cauchy-null.md
- `def.function` 函数：用到了定义 函数　proofs/dep.function-cauchy-null.md
- `def.quotient-set` 商集与等价类：用到了定义 商集与等价类　proofs/dep.quotient-cauchy-null.md
- `def.abs` 绝对值 |x|：用到了定义 绝对值 |x|　proofs/dep.abs-cauchy-null.md

refs: Rudin, Principles of Mathematical Analysis, Ch. 3

> 说明见 `notes/def.cauchy-null.md`
