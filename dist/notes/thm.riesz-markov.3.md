# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

（第二式：在 $K \setminus V$ 上 $1 - \varphi = 0$，故支集落在 $K \cap V$ 里；$K$ 外的点 $f = 0$）。两者都满足 $0 \le \cdot \le 1$，故

$$\Lambda(f) = \Lambda(f\varphi) + \Lambda\big(f(1 - \varphi)\big) \le \mu(U) + \mu(V).$$

对 $f$ 取上确界即得。∎

**引理 3（不交可加）**：若 $U \cap V = \emptyset$，则 $\mu(U \cup V) = \mu(U) + \mu(V)$。

证明：取 $f \prec U$、$g \prec V$（即 $0 \le f,g \le 1$，支集分别在 $U$、$V$ 里）。因支集不交，$f + g$ 满足 $0 \le f + g \le 1$ 且 $\operatorname{supp}(f+g) \subseteq U \cup V$，故

$$\Lambda(f) + \Lambda(g) = \Lambda(f + g) \le \mu(U \cup V).$$

对 $f, g$ 分别取上确界得 $\mu(U) + \mu(V) \le \mu(U \cup V)$；反向不等式由引理 2。∎

**第二步：外测度与可测性**。对任意 $E \subseteq X$ 令

$$\mu^{*}(E) := \inf\big\{\, \mu(U) : E \subseteq U,\ U\ \text{开} \,\big\}.$$

> 续见 notes/thm.riesz-markov.4.md
