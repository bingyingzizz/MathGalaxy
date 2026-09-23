# 数列极限　`def.sequence-limit`
数列极限 $x_n \to x$（Limit of a Sequence）
layer 11 · 定义 · 实数与极限 · 分析学

数列 $\{x_n\} \subseteq \mathbb{R}$ **收敛到** $x$（记 $x_n \to x$ 或 $\lim_{n \to \infty} x_n = x$），当且仅当

$$\forall \varepsilon > 0, \exists N, \forall n \ge N : |x_n - x| < \varepsilon$$

即：不管给出多小的 $\varepsilon$，从某一项之后，所有项都落在 $x$ 的 $\varepsilon$ 邻域里。

不收敛的数列叫**发散**。

## 为什么成立（入边，证明在 proofs/）
- `def.real` 实数系 ℝ：用到了定义 实数系 ℝ　proofs/dep.real-sequence.md

## 它能推出什么 / 谁在用它
- 被 `def.series` 级数收敛 用
- 被 `def.continuous` 连续 用
- 被 `def.derivative` 导数 用

refs: Rudin, Principles of Mathematical Analysis, Ch. 3

## 说明
⭐ 这就是「$\varepsilon$-$N$ 语言」：把「越来越近」翻译成可以逐条检验的条件。整个分析学的证明都建立在这个格式上。

基本性质（都由定义直接验证）：
- 极限**唯一**；
- 收敛数列**有界**；
- 四则运算与极限可交换（分母极限非零时）。

⚠ 「有界」不保证收敛（$(-1)^n$）；「$\varepsilon$ 固定、$N$ 往后」的顺序不能换。
