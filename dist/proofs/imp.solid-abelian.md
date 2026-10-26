# 完备化判据 + 关键计算 $\implies$ $\mathbf{Solid}$ 是阿贝尔子范畴
`imp.solid-abelian` · 推出 · strong 边 · 根 `../`

`lem.solid-completion-criterion` 完备化判据 + `prop.free-solid-solid` 自由固态群是固态的 + `cor.free-solid-product` 自由固态群是大乘积 → `thm.solid-abelian` 固态群构成阿贝尔子范畴

在 `lem.solid-completion-criterion` 中取 $\mathcal{A} = \operatorname{Cond}(\mathbf{Ab})$、$\mathcal{A}_0 = \{\mathbb{Z}[S]\}$（$S$ extremally disconnected）、$F(\mathbb{Z}[S]) = Z[S]^{\blacksquare}$。

需要验证：对由 $\prod_I \mathbb{Z}$ 的直和构成的复形 $C$，

$$\operatorname{RHom}(Z[S]^{\blacksquare}, C) \longrightarrow \operatorname{RHom}(\mathbb{Z}[S], C) = R\Gamma(S, C)$$

> 续见 proofs/imp.solid-abelian.2.md
