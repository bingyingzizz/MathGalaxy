# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

⚠️ **本节点仍标 skeleton**：下面写出测度构造中可独立验证的部分（开集上的定义、单调/次可加/不交可加、外测度）；Carathéodory 可测性的标准证明与最后的表示引理都未写全，所以不勾 ∎。

**第一步：在开集上定义 $\mu$**。对开集 $U \subseteq X$ 令

$$\mu(U) := \sup\Big\{\, \Lambda(f) : f \in C_{c}(X),\ 0 \le f \le 1,\ \operatorname{supp} f \subseteq U \,\Big\},$$

并约定 $\mu(\emptyset) = 0$。这里 $\operatorname{supp} f \subseteq U$ 是包含关系（$f$ 的支集紧，故 $\mu(U)$ 是「用紧支函数逼近 $U$」的上确界）。

**引理 1（单调）**：$U \subseteq V$ $\Longrightarrow$ $\mu(U) \le \mu(V)$。显然（可行集变大）。∎

**引理 2（两次可加）**：对任意开集 $U, V$，

$$\mu(U \cup V) \le \mu(U) + \mu(V).$$

> 续见 notes/thm.riesz-markov.2.md
