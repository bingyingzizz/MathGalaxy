# 方格边界上逐格用 Cauchy–Goursat，得到引理 A 的积分表示
`imp.cauchy-runge` · 推出 · strong 边 · 根 `../`

`thm.cauchy-goursat` Cauchy–Goursat 积分定理 → `thm.runge` Runge 逼近定理

**引理 A**：设 $K$ 紧、$V \supset K$ 开、$f$ 在 $V$ 上全纯。取边长 $h$ 的方格网使 $h\sqrt{2} < \operatorname{dist}(K, \mathbb{C}\setminus V)$，令 $S$ 为所有与 $K$ 相交的闭方格之并；则 $K\subset\operatorname{int}S$、$S\subset V$。

**逐格 Cauchy–Goursat**：对 $z\in K$，$h(\zeta) := (f(\zeta)-f(z))/(\zeta-z)$（在 $\zeta=z$ 处补定义为 $f'(z)$）在 $S$ 的某个邻域上全纯，故在每个方格 $Q$ 上有 $\int_{\partial Q} h = 0$。

> 续见 proofs/imp.cauchy-runge.2.md
