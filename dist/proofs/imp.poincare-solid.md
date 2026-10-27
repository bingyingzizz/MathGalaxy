# 6-函子 + $f^!R=\omega[d]$ $\implies$ Serre 对偶
`imp.poincare-solid` · 推出 · strong 边 · 根 `../`

`thm.smooth-duality` 光滑映射的对偶复形 + `def.six-functors` 6-函子形式 → `thm.poincare-solid` 固态 Serre 对偶

由 6-函子形式的 Verdier 对偶

$$f_*\operatorname{Hom}_X(C, f^!R) \cong \operatorname{Hom}_R(f_!C, R).$$

光滑时 $f^!R = \omega_{X/R}[d]$（`thm.smooth-duality`），$f_* = R\Gamma$，于是

$$\operatorname{RHom}_{\mathcal{O}_X}(C, \omega_{X/R})[d] \cong \operatorname{RHom}_R(f_!C, R).$$

取 $C = \mathcal{O}_X$ 得迹映射 $f_!\omega[d] \to R$。$f$ 固有时 $f_! = R\Gamma$，即经典 Serre 对偶。

**保紧对象。** $f_!$ 保直和，而紧对象 = 与直和交换的对象；由 6-函子的形式性质（$f^!$ 保直和、对偶）即得。$\blacksquare$
