# 交换极限/导数与积分　`thm.differentiate-under-integral`
定理：在积分号下取极限与求导
layer 18 · 定理 · 积分 · 分析学

设 $$f : X \times [a, b] \to \mathbb{C}$$（$$-\infty < a < b < \infty$$），$$f(\cdot, t)$$ 对每个 $$t \in [a, b]$$ 都可积。记

$$F(t) := \int_X f(x, t) d\mu(x)$$

**(a) 连续性**：若存在 $$g \in L^1(\mu)$$ 使 $$|f(x, t)| \le g(x)$$ 对一切 $$x, t$$ 成立，且对每个 $x$ 有 $$\lim_{t\to t_0} f(x, t) = f(x, t_0)$$，则

$$\lim_{t\to t_0} F(t) = F(t_0)$$

> 陈述续见 nodes/thm.differentiate-under-integral.2.md

## 为什么成立（入边，证明在 proofs/）
- `thm.dct` 控制收敛定理：DCT ⟹ 在积分号下求极限与求导　proofs/imp.differentiate-under-integral.md

refs: Folland, Real Analysis, Theorem 2.27

## 说明
两个控制条件都是「用同一个 $g$ 控制一整族函数」—— 这正是 DCT 的标准用法。

⚠ $g$ 必须属于 $L^{1}$（不能只是「局部有界」）。

这是「带参变量积分」的两个基本定理：连续性可以交换极限与积分，可导性可以交换导数与积分。
