# Mittag-Leffler 定理　`thm.mittag-leffler`　·　说明
根 `../`

⭐ 一句话：这是「按主部插值」的存在定理。Weierstrass 乘积定理是它的**零点**版，Mittag-Leffler 是**极点**版 —— 一个指定零点的位置与重数，一个指定极点的位置与主部。

**证明（Runge 版，完整写下来）。** 全程只用本图已有的 `thm.runge`（极点预先指定的形式）与紧集穷竭，不引用外部结果。

**第 0 步：约定。** $\Omega\subset\mathbb{C}$ 是区域；极点列 $\{a_k\}$ 在 $\Omega$ 内无聚点；主部记作 $P_k(w)=\sum_{j=1}^{m_k}c_{kj}w^{j}$，实际使用的是 $P_k\bigl(1/(z-a_k)\bigr)$。

**第 1 步：紧集穷竭与分层。** 令

$$K_n=\bigl\{\,z\in\Omega:\ |z|\le n,\ \operatorname{dist}(z,\partial\Omega)\ge 1/n\,\bigr\}$$

（约定 $\operatorname{dist}(z,\emptyset)=+\infty$，故 $\Omega=\mathbb{C}$ 时 $K_n=\overline{B}(0,n)$）。则每个 $K_n$ 紧、$K_n$ 含于 $K_{n+1}$ 的内部、$\bigcup_n K_n=\Omega$。由无聚点性，每个 $K_n$ 只含有限多个 $a_k$。令 $L_k=\min\{\,n:\ a_k\in K_n\,\}$，则 $L_k\to\infty$。记 $n_k=L_k-1$，就有

> 续见 notes/thm.mittag-leffler.2.md
