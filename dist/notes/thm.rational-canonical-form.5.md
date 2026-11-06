# 有理标准形　`thm.rational-canonical-form`　·　说明
根 `../`

**从循环模到友矩阵**：在 $R/(d)$（$d = x^{m} + a_{m-1}x^{m-1} + \cdots + a_{0}$）中取 $K$-基 $1, x, \ldots, x^{m-1}$。乘 $x$ 把前 $m-1$ 个基向量送到下一个，把 $x^{m-1}$ 送到 $x^{m} \equiv -(a_{0} + a_{1}x + \cdots + a_{m-1}x^{m-1})$。该算子在这组基下的矩阵正是 $C_{d}$（次对角线全 $1$，最后一列 $(-a_{0}, \ldots, -a_{m-1})^{T}$）。把各循环块的基拼起来，$A$ 相似于 $\operatorname{diag}(C_{d_{1}}, \ldots, C_{d_{s}})$。

> 续见 notes/thm.rational-canonical-form.6.md
