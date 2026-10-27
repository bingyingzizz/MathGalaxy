# 结构层 + 局部化的全忠实 $\implies$ $\infty$-范畴粘合
`imp.adic-gluing` · 推出 · strong 边 · 根 `../`

`thm.adic-structure-sheaf` adic 结构层是层 + `prop.analytic-base-change` 解析环的 base change → `thm.adic-gluing` 导出范畴按无穷范畴粘合

**局部化是全忠实的。** 对有理开集 $U \subseteq X = \operatorname{Spa}(A,A^+)$，遗忘函子

$$D\bigl((\mathcal{O}_X(U),\mathcal{O}_X^+(U))_\blacksquare\bigr) \longrightarrow D\bigl((A,A^+)_\blacksquare\bigr)$$

全忠实，左伴随是基变换。原因是先忘了凝聚态层：$D(\operatorname{Cond}(\mathcal{O}_X(U))) \to D(\operatorname{Cond}(A))$ 全忠实（$\mathcal{O}_X(U) = A[1/f]$ 是局部化）。

**局部化可交换。** 对 $(A,A^+) \to (B,B^+)$ 与有理开集 $U \subset X$，其原像 $V \subset Y$ 上基变换与遗忘相容（方块交换）。

> 续见 proofs/imp.adic-gluing.2.md
