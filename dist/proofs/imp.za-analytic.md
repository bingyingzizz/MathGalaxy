# 边界函数 $A_\infty$ $\implies$ $A_\blacksquare$ 是解析环
`imp.za-analytic` · 推出 · strong 边 · 根 `../`

`prop.analytic-examples` 解析环的例子 + `def.analytic-ring` 解析环 + `thm.solid-abelian` 固态群构成阿贝尔子范畴 → `thm.za-analytic` 有限生成代数的解析环

先设 $A = \mathbb{Z}[T]$，令 $A_\infty = \mathbb{Z}((T^{-1}))$（「$\operatorname{Spec} A$ 边界附近的函数」）。

**① $A_\infty$ 紧。** 有短正合列$0 \to \mathbb{Z}[[U]] \otimes A \to \mathbb{Z}[[U]] \otimes A \to A_\infty \to 0$（$U \mapsto T^{-1}$），前两项在 $(A,\mathbb{Z})_\blacksquare$ 上紧投射。

**② $A_\infty$ 幂等。** 由上面的表现直接算出 $A_\infty \otimes^{L} A_\infty \cong A_\infty$，故 $A_\infty$-模构成全子范畴。

**③ $\operatorname{RHom}_A(A_\infty, C) = 0$** 对一切由 $\prod A$ 的直和构成的复形成立：归约到 $C = A$，用 ① 的消解化成复形 $A[U^{-1}]/A \xrightarrow{U - T^{-1}} A[U^{-1}]/A$，它无环。

> 续见 proofs/imp.za-analytic.2.md
