# 完备性定理　`thm.completeness-first-order`　·　说明
根 `../`

各 $\Gamma_n$ 一致：若 $\Gamma_n\cup\{\theta(c_k)\}$ 不一致，推论给 $\Gamma_n\vdash\neg\theta(c_k)$；$c_k$ 不出现在 $\Gamma_n$ 中，把 $c_k$ 换成证明中未出现的变元 $y$ 并推广，得 $\Gamma_n\vdash\forall y\,\neg\theta(y)$，再由 (Q1) 与命题逻辑得 $\Gamma_n\vdash\neg\exists x\,\theta(x)$，与「$\Gamma_n\cup\{\xi_n\}$ 一致」矛盾。于是 $\Gamma_\omega=\bigcup_n\Gamma_n$ 一致（有限特征），再由第四步扩为极大一致 $\Gamma^{*}$。见证性质：若 $\exists x\,\theta\in\Gamma^{*}$ 且编号为 $n$，则 $\Gamma_n\cup\{\exists x\,\theta\}\subseteq\Gamma^{*}$ 一致，故第 $n$ 步添了 $\theta(c_k)$，即 $\theta(c_k)\in\Gamma^{*}$。

> 续见 notes/thm.completeness-first-order.7.md
