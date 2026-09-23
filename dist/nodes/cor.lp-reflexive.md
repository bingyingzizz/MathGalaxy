# L^p 自反　`cor.lp-reflexive`
推论：1 < p < ∞ 时 L^p ≅ (L^p)**
layer 16 · 推论 · L^p 空间 · 分析学

设 $1 < p < \infty$。则

$$L^p \cong (L^p)^{**}$$

即 $L^p$ 是**自反**的 Banach 空间。

## 为什么成立（入边，证明在 proofs/）
- `def.lp-norm` L^p 范数：用到了定义 L^p 范数　proofs/def-link.lp-reflexive.md

refs: Folland, Real Analysis, §6.2

## 说明
把对偶定理用两次即可：$(L^p)^* \cong L^q$，而 $q$ 的共轭又回到 $p$，故 $(L^p)^{**} \cong (L^q)^* \cong L^p$。

⚠ $p = 1$ 与 $p = \infty$ 时**不**自反。

⭐ 自反性的价值：自反 Banach 空间里**有界序列必有弱收敛子列**（Banach–Alaoglu / Eberlein–Šmulian），这是变分法与 PDE 里取极限的基本工具。
