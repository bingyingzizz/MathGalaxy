# Minkowski 不等式　`thm.minkowski`
Minkowski 不等式（$L^p$ 的三角不等式）
layer 17 · 定理 · L^p 空间 · 分析学

设 $1 \le p < \infty$。则对 $f, g \in L^p$：

$$\|f + g\|_p \le \|f\|_p + \|g\|_p$$

## 为什么成立（入边，证明在 proofs/）
- `thm.holder` Hölder 不等式：Hölder 不等式 ⟹ Minkowski 不等式　proofs/imp.minkowski.md
- `def.lp-norm` L^p 范数：用到了定义 L^p 范数　proofs/def-link.lp-minkowski.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.lp-banach` L^p 是 Banach 空间

refs: Folland, Real Analysis, Theorem 6.2

## 说明
$p = 1$ 就是积分的三角不等式，显然。

一般 $p$ 的证明：



$$\int |f+g|^p = \int |f+g| \cdot |f+g|^{p-1} \le \int (|f| + |g|) |f+g|^{p-1} \le \left( \|f\|_p + \|g\|_p \right) \left\| |f+g|^{p-1} \right\|_q$$



其中最后一步是对 $|f| \cdot |f+g|^{p-1}$ 与 $|g| \cdot |f+g|^{p-1}$ 各用一次 Hölder。再注意



$$\left\| |f+g|^{p-1} \right\|_q^{\,q} = \int |f+g|^{(p-1)q} = \int |f+g|^p$$



两边约掉一个 $\|f+g\|_p^{p/q}$ 即得。∎

⭐ 有了它，$\|\cdot\|_p$ 才真的成为**范数** —— 这是下面「$L^p$ 是 Banach 空间」的前提。
