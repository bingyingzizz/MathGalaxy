# 区间　`def.interval`
区间（Interval）
layer 11 · 定义 · 实数与极限 · 分析学+序理论

$\mathbb{R}$ 的**区间**是满足下式的子集 $I$：

$$a, b \in I,\ a \le x \le b \implies x \in I$$

即「中间不空」。常见的有界区间写成

$$(a, b), \quad [a, b], \quad [a, b), \quad (a, b]$$

按端点是否取到区分；另有 $(-\infty, b)$、$(a, +\infty)$、$\mathbb{R}$ 等无界区间，以及单点集 $[a, a]$。

体积就是长度：$m((a, b]) = b - a$。

## 为什么成立（入边，证明在 proofs/）
- `def.real` 实数系 ℝ：用到了定义 实数系 ℝ　proofs/dep.real-interval.md

## 它能推出什么 / 谁在用它
- 被 `def.fundamental-class` 基本类 用
- 被 `def.ac-function` 绝对连续函数 用

refs: Rudin, Principles of Mathematical Analysis, Ch. 2

## 说明
⭐ **半开区间 $\{ (a, b] : a < b \}$ 是构造 Lebesgue–Stieltjes 测度时的起点**：它本身只是一个基本类，做有限不交并就得到环，长度在那个环上已经是预测度。

为什么要用半开而不是开区间：不交并的长度好算 —— $[a, b) \sqcup [b, c) = [a, c)$ 在开区间上不成立。
