# Lebesgue 微分定理　`thm.lebesgue-differentiation`
Lebesgue 微分定理：Aᵣ f(x) → f(x) a.e.
layer 21 · 定理 · 微分定理 · 分析学

设 $$f \in L^1_{loc}$$。则

$$\lim_{r\to0} A_r f(x) = f(x)\quad \text{ 对} \text{a.e.} x \in \mathbb{R}^n$$

## 为什么成立（入边，证明在 proofs/）
- `thm.maximal-theorem+thm.approximation-L1+lem.average-continuous` thm.maximal-theorem+thm.approximation-L1+lem.average-continuous：极大定理 + 连续函数逼近 ⟹ Lebesgue 微分定理　proofs/imp.lebesgue-differentiation.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.lebesgue-set-full` Lebesgue 集几乎处处

refs: Folland, Real Analysis, Theorem 3.18

## 说明
⭐ 一句话：**可积函数几乎处处等于自己局部平均值的极限**。

这也是「Lebesgue 积分比 Riemann 积分好」最直观的一条：Riemann 可积函数的连续性几乎处处成立，而这里连「连续」都不需要。

证明的三段（下一条箭头里展开）：先用连续函数逼近 $\to$ 再用极大定理把「坏集」压成零测。
