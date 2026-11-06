# 单纯逼近　`thm.simplicial-approximation`　·　说明
根 `../`

- 由 `thm.homotopy-invariance`，$|g| \simeq \operatorname{id}$ 给出链同伦 $(|g|)_{*} \simeq \operatorname{id}$，故 $\iota\,g_{*} \simeq \iota_{m}$；

- 重心重分链映射 $\operatorname{sd}^{m} : C_{*}(K) \to C_{*}(K^{(m)})$ 与 $\iota_{m}$ 满足 $\iota_{m}\,\operatorname{sd}^{m} = \iota$（重分不改变几何实现，链级上是细分），且 $\operatorname{sd}^{m}$ 诱导同调同构（反向链同伦：每个重分后的单纯形落在原单纯形里，锥构造给出）。

于是 $\iota_{*}\,g_{*}\,\operatorname{sd}^{m}_{*} = \iota_{*}$，而 $g_{*}\operatorname{sd}^{m}_{*}$ 是同调上的同构（它是 $\iota$ 的「逆」的一部分），推出 $\iota_{*}$ 是同构。更直接地：$g_{*}\operatorname{sd}^{m}_{*}$ 与恒等链映射在几何实现上同伦，故在 $H_{*}$ 上是恒等；另一方面 $\iota_{m}\operatorname{sd}^{m} = \iota$ 与 $\iota g_{*} = (|g|)_{*}\iota_{m}$ 合起来给出 $\iota_{*}$ 可逆。∎

> 续见 notes/thm.simplicial-approximation.5.md
