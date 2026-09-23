# 完备性（确界原理）⟹ ℝ 不可数（闭区间套 + 对角线）
`imp.real-uncountable` · 推出 · strong 边 · 根 `../`

`thm.real-ordered-field` ℝ 是完备有序域 → `thm.real-uncountable` ℝ 不可数

**③ 矛盾。** 由 ① 知 $x_n \notin I_n$，由 ② 知 $a \in I_n$，所以 $a \ne x_n$ 对**一切** $n$ 成立 —— 但 $a \in \mathbb{R} = \{x_1, x_2, \ldots\}$，与序列穷尽了 $\mathbb{R}$ 矛盾。故 $\mathbb{R}$ 不可数。$\blacksquare$

**④ 基数版本。** 把实数写成二进制小数（约定不用最后全 1 的写法以避开歧义）得到 $\mathbb{R} \hookrightarrow \mathcal{P}(\mathbb{N})$；反过来 $\mathcal{P}(\mathbb{N}) \to \mathbb{R}$ 用三进制展开即可，两边都有单射，由 Schröder–Bernstein 得 $|\mathbb{R}| = |\mathcal{P}(\mathbb{N})| = 2^{\aleph_0}$。再由 **Cantor 定理** $|\mathcal{P}(\mathbb{N})| > |\mathbb{N}| = \aleph_0$，即

$$|\mathbb{R}| = 2^{\aleph_0} > \aleph_0$$
