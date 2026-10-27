# 张量场　`def.tensor-field`　·　续页（第 2 页）
[在星图里打开](../#n=def.tensor-field)　·　第 1 页 [nodes/def.tensor-field.md](./def.tensor-field.md)

## 陈述（续）
设 $M$ 是 $n$ 维光滑流形，$p \in M$。**$(r,s)$ 型张量**是多重线性映射
$$T : \underbrace{T_{p}^{\ast}M \times \cdots \times T_{p}^{\ast}M}_{r} \times \underbrace{T_{p}M \times \cdots \times T_{p}M}_{s} \longrightarrow \mathbb{R},$$
即吃了 $r$ 个余向量与 $s$ 个向量吐一个数。全体记 $T^{(r,s)}_{p}M$，维数 $n^{r+s}$。**张量丛**是

$$T^{(r,s)}M := \bigsqcup_{p \in M} T^{(r,s)}_{p}M ,$$
它是 $n + n^{r+s}$ 维光滑流形，造法与切丛相同：转移映射是 Jacobi 矩阵的 $s$ 次直积与它的逆的 $r$ 次直积（`def.tangent-bundle`）。

$T^{(r,s)}M$ 的光滑截面叫 **$(r,s)$ 型张量场**。在卡里展开
$$T = \sum T^{i_{1}\cdots i_{r}}_{\ \ j_{1}\cdots j_{s}}\ \partial_{i_{1}} \otimes \cdots \otimes \partial_{i_{r}} \otimes \mathrm{d}x^{j_{1}} \otimes \cdots \otimes \mathrm{d}x^{
j_{s}} ,$$

> 续见 [nodes/def.tensor-field.3.md](./def.tensor-field.3.md)
