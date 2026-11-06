# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

证明：取 $f \prec U$、$g \prec V$（即 $0 \le f,g \le 1$，支集分别在 $U$、$V$ 里）。因支集不交，$f + g$ 满足 $0 \le f + g \le 1$ 且 $\operatorname{supp}(f+g) \subseteq U \cup V$，故

$$\Lambda(f) + \Lambda(g) = \Lambda(f + g) \le \mu(U \cup V).$$

对 $f, g$ 分别取上确界得 $\mu(U) + \mu(V) \le \mu(U \cup V)$；反向不等式由引理 2。∎

**第二步：外测度与可测性**。对任意 $E \subseteq X$ 令

$$\mu^{*}(E) := \inf\big\{\, \mu(U) : E \subseteq U,\ U\ \text{开} \,\big\}.$$

它是外测度：单调、$\mu^{*}(\emptyset) = 0$、可数次可加（覆盖的并仍是开覆盖，用 $\mu$ 在开集上的次可加性逐项控制）。

**引理 4（开集是 Carathéodory 可测的）**：对任意 $A \subseteq X$ 与开集 $U$，

$$\mu^{*}(A \cap U) + \mu^{*}(A \setminus U) \le \mu^{*}(A).$$

证明（标准 Carathéodory 延拓，本图只记路线）：要证开集 $U$ 可测，等价于对任意 $A$ 有

$$\mu^{*}(A \cap U) + \mu^{*}(A \setminus U) \le \mu^{*}(A).$$

> 续见 notes/thm.riesz-markov.4.md
