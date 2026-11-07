# Riemann 映射定理　`thm.riemann-mapping`　·　说明
根 `../`

z_{2})\implies z_{1}=z_{2}$；且 $h\ne0$。令 $b=h(z_{0})$，则 $|b|^{2}=|F(z_{0})|=|a|$（$f(z_{0})=0$），且 $|h|<1$。$\psi:=\varphi_{b}\circ h$ 是 $\Omega\to\mathbb{D}$ 的单叶全纯映射，$\psi(z_{0})=0$。**算导数**：$F'(z_{0})=\varphi_{a}'(0)f'(z_{0})=(1-|a|^{2})\,s$（用 $f'(z_{0})=s>0$），故 $|h'(z_{0})|=\frac{|F'(z_{0})|}{2|b|}=\frac{(1-|a|^{2})s}{2\sqrt{|a|}}$。于是 $|\psi'(z_{0})|=\frac{|h'(z_{0})|}{1-|b|^{2}}=\frac{(1-|a|^{2})s}{2\sqrt{|a|}(1-|a|)}=\frac{(1+|a|)s}{2\sqrt{|a|}}$。由 $(1+|a|)^{2}-4|a|=(1-|a|)^{2}>0$（$|a|\ne1$），得 $\frac{1+|a|}{2\sqrt{|a|}}>1$，即 $|\psi'(z_{0})|>s$，与 $s$ 的极大性矛盾。故 $f$ 满射。
**第四步：双全纯与唯一性。** 单叶 + 满射的全纯映射是双全纯（单叶全纯是开映射，`thm.open-mapping`；逆映射全纯）。若 $f,g$ 都满足条件，则 $h:=g\circ f^{-1}$ 是 $\mathbb{D}$ 的自同构、$h(0)=0$。Schwarz 引理（`lem.schwarz`）给 $|h(z)|\le|z|$；对 $h^{-1}$ 同样得 $|h^{-1}(w)|\le|w|$，即 $|h(z)|\ge|z|$。故 $|h(z)|=|

> 续见 notes/thm.riemann-mapping.5.md
