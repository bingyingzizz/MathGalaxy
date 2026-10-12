# MCT（a.e. 版本）　`cor.mct-ae`
推论：单调收敛定理的几乎处处版本
layer 17 · 推论 · 积分 · 分析学

设 $\{f_n\} \subseteq L^+$，$f \in L^+$。若对**几乎处处的** $x$ 有

$$f_n(x) \uparrow  f(x), $$

则

$$\int f = \lim_{n\to\infty} \int f_n$$

## 为什么成立（入边，证明在 proofs/）
- `def.null-set` 零集与完备：用到了定义 零集与完备　proofs/def-link.nullset-ae-mct.md
- `def.ae` 几乎处处：用到了定义 几乎处处　proofs/def-link.ae-mct-ae.md

refs: Folland, Real Analysis, §2.2；Rudin, Real and Complex Analysis, Ch. 1

> 说明见 `notes/cor.mct-ae.md`
