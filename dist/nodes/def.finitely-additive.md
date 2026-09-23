# 有限可加测度　`def.finitely-additive`
有限可加测度（Finitely Additive Measure）
layer 13 · 定义 · 测度的构造 · 分析学

若 $\mu$ 只满足 (i) 与**有限**可加性：

$$A, B \in \mathcal{M}\text{ 两两不交} \implies \mu(A \cup B) = \mu(A) + \mu(B)$$
（由归纳，可推到任意有限多个不交集合），

则 $\mu$ 称为**有限可加测度**。

## 为什么成立（入边，证明在 proofs/）
- `def.measure` 测度：用到了定义 测度　proofs/def-dep.measure-finitely-additive.md

refs: Halmos, Measure Theory, §9

## 说明
它比预测度还弱：预测度是可数可加的（只是定义域是环），有限可加测度只要求有限可加。

⚠ 有限可加 $\ne$ 可数可加：在 $\mathbb{N}$ 上定义 $\mu (E) = 0$（$E$ 有限）、$\mu (E) = +\infty$（$E$ 无限），它是有限可加的，但对 $\bigcup _{n} \{n\} = \mathbb{N}$ 不满足可数可加。历史上（Banach–Tarski 时代）确实认真考虑过只用有限可加性的「测度」，但那样连「长度」都构造不出来。
