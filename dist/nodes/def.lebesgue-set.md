# Lebesgue 集　`def.lebesgue-set`
Lebesgue 集 L_f
layer 19 · 定义 · 微分定理 · 分析学

设 $$f \in L^1_{loc}$$。定义

$$L_f := \{ x : \lim_{r\to0} \frac{1}{m(B(r, x))} \int_{B(r, x)} |f(y) - f(x)| dy = 0 \}$$

称为 $f$ 的 **Lebesgue 集**。

## 为什么成立（入边，证明在 proofs/）
- `def.locally-integrable` 局部可积：用到了定义 局部可积　proofs/def-dep.locally-integrable-lebesgue-set.md
- `def.average-operator` 平均算子 Aᵣ：用到了定义 平均算子 Aᵣ　proofs/def-dep.average-operator-lebesgue-set.md

## 它能推出什么 / 谁在用它
- 被 `thm.lebesgue-set-full` Lebesgue 集几乎处处 用
- 被 `thm.differentiation-general` 可缩族的微分定理 用

refs: Folland, Real Analysis, §3.4

## 说明
⚠ 注意定义里积的是 $$|f(y) - f(x)|$$（与 $f$ 在该点的值比较），不是 $$|f(y)|$$。

这么定义是为了让「可缩族」版本（下一条定理）能直接用 —— 那里需要的是**局部一致逼近**，而不是简单的平均值收敛。

$x \in L_f$ 常被说成「$x$ 是 $f$ 的 Lebesgue 点」。直觉：在这个点附近，$f$ 的振荡在平均意义下趋于 0。
