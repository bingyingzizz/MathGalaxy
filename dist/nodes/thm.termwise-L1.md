# L¹ 的逐项积分　`thm.termwise-L1`
定理：Σ∫|fⱼ| < ∞ ⟹ Σfⱼ 几乎处处收敛且可逐项积分
layer 17 · 定理 · 积分 · 分析学

设 $$\{f_j\} \subseteq L^1$$ 满足

$$\sum_{j=1}^{\infty} \int |f_j| d\mu < \infty$$

则 $$\sum_j f_j$$ 几乎处处收敛到一个 $$L^1$$ 中的函数，并且可以逐项积分：

$$\int \sum_{j=1}^{\infty} f_j = \sum_{j=1}^{\infty} \int f_j$$

## 为什么成立（入边，证明在 proofs/）
- `thm.termwise-integration+prop.integral-zero-iff` thm.termwise-integration+prop.integral-zero-iff：非负逐项积分 + 零集判定 ⟹ L¹ 的逐项积分　proofs/imp.termwise-L1.md

refs: Folland, Real Analysis, Theorem 2.25

## 说明
与「非负函数逐项积分」的区别：那里不需要任何收敛性假设（非负性保证了没有抵消），这里**需要** $\Sigma \int |f_{j}| < \infty$ —— 用可积性换来「允许有正有负」。

这是 Fubini–Tonelli 定理证明里的关键工具。
