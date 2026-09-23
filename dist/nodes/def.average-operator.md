# 平均算子 Aᵣ　`def.average-operator`
平均算子（Averaging Operator Aᵣ f）
layer 18 · 定义 · 微分定理 · 分析学

设 $$f \in L^1_{loc}$$，$$x \in \mathbb{R}^n$$，$$r > 0$$。定义

$$A_r f(x) := \frac{1}{m(B(r, x))} \int_{B(r, x)} f(y) dy$$

即 $f$ 在以 $x$ 为心、$r$ 为半径的球上的**平均值**。

## 为什么成立（入边，证明在 proofs/）
- `def.locally-integrable` 局部可积：用到了定义 局部可积　proofs/def-link.locally-integrable-average.md
- `def.measure` 测度：用到了定义 测度　proofs/def-dep.measure-average-operator.md

## 它能推出什么 / 谁在用它
- 被 `def.maximal-function` 极大函数 用
- 被 `lem.average-continuous` 平均算子联合连续 用
- 被 `def.lebesgue-set` Lebesgue 集 用

refs: Folland, Real Analysis, §3.4

## 说明
这是「把函数抹平」的算子：$$A_r f$$ 是 $f$ 的连续化版本（见下一条），$r \to 0$ 时应当回到 $f$ 本身 —— 而那正是 Lebesgue 微分定理要说的事。

⚠ 注意积分是**对 Lebesgue 测度 $m$** 取的，跟这一段的符号测度 $\nu$ 无关。
