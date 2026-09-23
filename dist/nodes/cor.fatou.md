# Fatou 的推论　`cor.fatou`
推论：fₙ → f a.e. ⟹ ∫ f ≤ lim ∫ fₙ
layer 14 · 推论 · 积分 · 分析学

设 $$\{f_n\} \subseteq L^+$$，$$f \in L^+$$，且 $$f_n \to f$$ a.e.。则

$$\int f \le \liminf_{n\to\infty} \int f_n$$

## 为什么成立（入边，证明在 proofs/）
- `def.lplus` L⁺：用到了定义 L⁺　proofs/def-link.lplus-fatou-cor.md

refs: Folland, Real Analysis, §2.2；Rudin, Real and Complex Analysis, Ch. 1

## 说明
a.e. 收敛时 $$\liminf f_n = f$$，直接套 Fatou 引理即可。
