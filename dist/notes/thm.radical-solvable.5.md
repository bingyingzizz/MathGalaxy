# 根式可解 与 伽罗瓦群可解　`thm.radical-solvable`　·　说明
根 `../`

**逐层加闭包**：令 $M_{i}$ 为 $E_{i}$ 的所有 $F^{\prime}$-共轭生成的合成域，则 $M_{0}=F^{\prime}$、$M_{m}=M$，且每个 $M_{i}/F^{\prime}$ 伽罗瓦。关键是 $M_{i}$ 由 $M_{i-1}$ 添加若干 $\alpha_{i}$ 的共轭 $\beta$ 得到，而 $\beta^{n_{i}}\in M_{i-1}$：写 $\beta=\sigma(\alpha_{i})$，则 $\beta^{n_{i}}=\sigma(\alpha_{i}^{n_{i}})$；因 $\alpha_{i}^{n_{i}}\in F_{i}=F_{i-1}(\alpha_{i-1})$，有 $\sigma(\alpha_{i}^{n_{i}})\in\sigma(F_{i-1})\bigl(\sigma(\alpha_{i-1})\bigr)\subseteq M_{i-1}\cdot M_{i-1}=M_{i-1}$（$\sigma(F_{i-1})\subseteq\sigma(E_{i-1})\subseteq M_{i-1}$，$\sigma(\alpha_{i-1})\in\sigma(E_{i-1})\subseteq M_{i-1}$）。于是 $M_{i}/M_{i-1}$ 由若干 $n_{i}$ 次根生成，且 $\zeta_{n_{i}}\in F^{\prime}\subseteq M_{i-1}$，它是 Kummer 扩张：任意 $\tau\in\operatorname{Gal}(M_{i}/M_{i-1})$ 把每个生成元 $\beta$ 送到 $\zeta_{n_{i}}^{k_{\beta}}\beta$，$\tau\mapsto(k_{

> 续见 notes/thm.radical-solvable.6.md
