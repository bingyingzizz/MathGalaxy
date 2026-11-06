# 完备性定理　`thm.completeness-first-order`　·　说明
根 `../`

**第五步：Henkin 见证。** 在语言中添可数无穷多新常元 $c_0,c_1,\ldots$，得 $\mathcal{L}^{+}$。把 $\mathcal{L}^{+}$ 中所有形如 $\exists x\,\theta(x)$ 的语句枚举为 $\xi_0,\xi_1,\ldots$。递归造 $\Gamma_n$：若 $\Gamma_n\cup\{\xi_n\}$ 一致且 $\xi_n=\exists x\,\theta(x)$，取第一个未用过的 $c_k$，令 $\Gamma_{n+1}=\Gamma_n\cup\{\theta(c_k)\}$；否则 $\Gamma_{n+1}=\Gamma_n$。

> 续见 notes/thm.completeness-first-order.6.md
