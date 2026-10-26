# $j_! \dashv j^* \dashv j_*$ $\implies$ 仿射相干对偶
`imp.coherent-duality` · 推出 · strong 边 · 根 `../`

`thm.za-analytic` 有限生成代数的解析环 → `thm.coherent-duality` 仿射相干对偶

把 $f_!$ 定义为复合 $D(A_\blacksquare) \xrightarrow{j_!} D((A,\mathbb{Z})_\blacksquare) \to D(\mathbb{Z}_\blacksquare)$。

**保直和与紧。** $j_!$ 由 $M \mapsto M \otimes (A_\infty/A)[-1]$ 给出，保直和；$\operatorname{Mod}^{\mathrm{cond}}_{(A,\mathbb{Z})_\blacksquare} \to \mathbf{Solid}$ 是 base change，也保直和与紧（`prop.analytic-base-change` 与 `cor.solid-compact-generators`）。

**投影公式。** 由 $j_!$ 的定义（张量积）与 $\otimes$ 的结合律形式地得到。

**右伴随。** $f^!$ 存在且由伴随函子定理给出；其显式公式 $f^!M = (M \otimes A_\blacksquare) \otimes f^!\mathbb{Z}$ 由投影公式与 $f^!$ 的右伴随性解出。$f^!\mathbb{Z} = \operatorname{RHom}_{\mathbb{Z}}(f_! A, \mathbb{Z})$，由 $f_!A$ 紧得它是离散有限生成复形。

> 续见 proofs/imp.coherent-duality.2.md
