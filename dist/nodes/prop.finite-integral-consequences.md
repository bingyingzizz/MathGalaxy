# 积分有限的后果　`prop.finite-integral-consequences`
命题：∫ f < ∞ 时，f 几乎处处有限、支撑 σ-有限
layer 14 · 命题 · 积分 · 分析学

设 $$f \in L^+$$ 且 $$\int f < \infty$$。则

- $$\{x : f(x) = \infty\}$$ 是零集；
- $$\{x : f(x) > 0\}$$ 是 **$\sigma$有限**的（即它是可数个有限测度集之并）。

## 为什么成立（入边，证明在 proofs/）
- `def.lplus` L⁺：用到了定义 L⁺　proofs/def-link.lplus-finite-integral.md
- `def.null-set` 零集与完备：用到了定义 零集与完备　proofs/def-link.null-set-finite-integral.md
- `def.measure-space` 有限 / σ-有限 / 半有限：用到了定义 有限 / σ-有限 / 半有限　proofs/def-link.measure-space-finite-integral.md

refs: Folland, Real Analysis, Prop. 2.20

## 说明
第一条：若 $$\mu(\{f = \infty\}) > 0$$，则对每个 $n$ 有 $$\int f \ge n\cdot\mu(\{f=\infty\})$$，让 $n \to \infty$ 得 $\int f = \infty$。

第二条：$$\{f > 0\} = \bigcup_n \{f > 1/n\}$$，而 $$\mu(\{f > 1/n\}) \le n\int f < \infty$$ —— 所以是**可数**个有限测度集之并。

⭐ 这条解释了为什么「$L^{1}$ 里的函数几乎处处有限」是免费的，也预告了 Lp 空间里的 $\sigma$有限假设。
