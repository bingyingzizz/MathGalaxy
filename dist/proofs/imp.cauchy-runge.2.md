# 方格边界上逐格用 Cauchy–Goursat，得到引理 A 的积分表示
`imp.cauchy-runge` · 推出 · strong 边 · 根 `../`

`thm.cauchy-goursat` Cauchy–Goursat 积分定理 → `thm.runge` Runge 逼近定理

**相加**：内部公共边正反定向相消，只剩 $\Gamma = \partial S$，于是 $\int_{\Gamma} h = 0$，即 $f(z) = \frac{1}{2\pi i}\int_{\Gamma}\frac{f(\zeta)}{\zeta-z}\,\mathrm{d}\zeta$（末步用 $\operatorname{Ind}_{\Gamma}(z)=1$）。∎

> 这条边只承担「引理 A 这一格 Cauchy–Goursat 用法」；Riemann 和与推极点由 `thm.cauchy-integral-formula` + `thm.mittag-leffler` 到本节点那条边承担。
