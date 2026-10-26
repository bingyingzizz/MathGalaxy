# 完备化判据 + 关键计算 $\implies$ $\mathbf{Solid}$ 是阿贝尔子范畴
`imp.solid-abelian` · 推出 · strong 边 · 根 `../`

`lem.solid-completion-criterion` 完备化判据 + `prop.free-solid-solid` 自由固态群是固态的 + `cor.free-solid-product` 自由固态群是大乘积 → `thm.solid-abelian` 固态群构成阿贝尔子范畴

是同构。这是 Lecture VI 的主计算：把 $C$ 放进短正合列 $0 \to C \to C_{\mathbb{R}} \to C_{\mathbb{R}/\mathbb{Z}} \to 0$，两边对 $\mathbb{R}$-模项都消没（$\operatorname{RHom}(\mathbb{R}, -) = 0$），于是只需分别算 $C_{\mathbb{R}}$ 与 $C_{\mathbb{R}/\mathbb{Z}}$；再把它们写成有限复形的滤过极限，逐项用紧阿贝尔群的两步消解归约到 $\operatorname{RHom}(M(S,\mathbb{R}/\mathbb{Z}), \prod\mathbb{R}/\mathbb{Z})$ 的度 $\le 1$ 估计。

> 续见 proofs/imp.solid-abelian.3.md
