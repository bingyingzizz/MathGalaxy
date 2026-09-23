# RN 导数的点态公式　`thm.rn-pointwise`
定理：ν(Eᵣ)/m(Eᵣ) → f(x) a.e.，其中 dν = dλ + f dm
layer 24 · 定理 · 微分定理 · 分析学

设 $\nu$ 是 $\mathbb{R}^{n}$ 上的**正则**符号/复 Borel 测度，$$d\nu = d\lambda + f\cdot dm$$ 是它关于 Lebesgue 测度 $m$ 的 Lebesgue–Radon–Nikodym 表示。则对 **m-a.e.** 的 $$x \in \mathbb{R}^n$$，

$$\lim_{r\to0} \nu(E_r) / m(E_r) = f(x)$$

对**每一个**可缩地趋于 $x$ 的族 $$\{E_r\}_{r>0}$$ 成立。

## 为什么成立（入边，证明在 proofs/）
- `thm.differentiation-general+def.regular-measure+lem.covering` thm.differentiation-general+def.regular-measure+lem.covering：微分定理 + 正则性 ⟹ RN 导数的点态公式　proofs/imp.rn-pointwise.md
- `def.regular-measure` 正则 Borel 测度：用到了定义 正则 Borel 测度　proofs/def-link.regular-pointwise.md
- `def.rn-derivative` RN 导数与 Lebesgue 分解：用到了定义 RN 导数与 Lebesgue 分解　proofs/def-link.rn-pointwise.md
- …另有 1 条入边

refs: Folland, Real Analysis, Theorem 3.22

> 说明见 `notes/thm.rn-pointwise.md`
