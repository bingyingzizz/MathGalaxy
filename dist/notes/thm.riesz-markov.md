# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

**术语**：本条的 $\mu$ 是 Folland 意义的 **Radon 测度** —— Borel 测度、紧集上有限、外正则、开集上内正则。图内 `def.regular-measure` 目前只在 $\mathbb{R}^{n}$ 上陈述（外正则 + 紧集有限），与这里一般局部紧 Hausdorff 的设定口径不同；这是定义节点的范围问题（已单列在 `_audit/proof/第13批-报告.md`），本条陈述未改。

**第一步：在开集上定义 $\mu$**。对开集 $U \subseteq X$ 令

$$\mu(U) := \sup\Big\{\, \Lambda(f) : f \in C_{c}(X),\ 0 \le f \le 1,\ \operatorname{supp} f \subseteq U \,\Big\},$$

并约定 $\mu(\emptyset) = 0$。这里 $\operatorname{supp} f \subseteq U$ 是包含关系（$f$ 的支集紧，故 $\mu(U)$ 是「用紧支函数逼近 $U$」的上确界）。

**引理 1（单调）**：$U \subseteq V$ $\Longrightarrow$ $\mu(U) \le \mu(V)$。显然（可行集变大）。∎

**引理 2（有限次可加）**：对任意开集 $U, V$，

$$\mu(U \cup V) \le \mu(U) + \mu(V).$$

> 续见 notes/thm.riesz-markov.2.md
