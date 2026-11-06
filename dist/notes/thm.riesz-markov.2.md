# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

证明：取 $f \in C_{c}$，$0 \le f \le 1$，$K := \operatorname{supp} f \subseteq U \cup V$。$K \setminus V$ 是紧集且含于开集 $U$，由 Urysohn 引理（`lem.urysohn`）存在 $\varphi \in C_{c}(X)$，$0 \le \varphi \le 1$，$\varphi = 1$ 于 $K \setminus V$，$\operatorname{supp} \varphi \subseteq U$。于是

$$f = f\varphi + f(1 - \varphi),\qquad \operatorname{supp}(f\varphi) \subseteq U,\qquad \operatorname{supp}\big(f(1 - \varphi)\big) \subseteq V$$

（第二式：在 $K \setminus V$ 上 $1 - \varphi = 0$，故支集落在 $K \cap V$ 里；$K$ 外的点 $f = 0$）。两者都满足 $0 \le \cdot \le 1$，故

$$\Lambda(f) = \Lambda(f\varphi) + \Lambda\big(f(1 - \varphi)\big) \le \mu(U) + \mu(V).$$

对 $f$ 取上确界即得。∎

**引理 3（不交可加）**：若 $U \cap V = \emptyset$，则 $\mu(U \cup V) = \mu(U) + \mu(V)$。

> 续见 notes/thm.riesz-markov.3.md
