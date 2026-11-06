# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

它是外测度：单调与 $\mu^{*}(\emptyset) = 0$ 显然。**可数次可加**：取 $E_{n} \subseteq U_{n}$（$U_{n}$ 开），由引理 2 的有限次可加性（对并归纳），对紧集 $K \Subset \bigcup_{n} U_{n}$ 取有限子覆盖 $U_{n_{1}},\ldots,U_{n_{k}}$ 得 $\mu(K) \le \sum_{i} \mu(U_{n_{i}}) \le \sum_{n} \mu(U_{n})$；对 $K$（即对可行函数）取上确界得 $\mu(\bigcup_{n}U_{n}) \le \sum_{n}\mu(U_{n})$，再对 $E \subseteq \bigcup_{n}U_{n}$ 取下确界即得 $\mu^{*}$ 的可数次可加性。

**引理 4（开集是 Carathéodory 可测的）**：对任意 $A \subseteq X$ 与开集 $U$，

$$\mu^{*}(A \cap U) + \mu^{*}(A \setminus U) \le \mu^{*}(A).$$

证明（标准 Carathéodory 延拓，本图只记路线）：要证开集 $U$ 可测，等价于对任意 $A$ 有

$$\mu^{*}(A \cap U) + \mu^{*}(A \setminus U) \le \mu^{*}(A).$$

严格证明要先证 $\mu$ 在开集上内正则（用紧集从内部逼近），再对 $A$ 的开覆盖作分解；本图不展开这两步，故这里只记路线，不勾 ∎。

> 续见 notes/thm.riesz-markov.5.md
