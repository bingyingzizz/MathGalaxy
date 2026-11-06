# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

证明：取 $f \in C_{c}$，$0 \le f \le 1$，$K := \operatorname{supp} f \subseteq U \cup V$。$K \setminus V$ 是紧集且含于开集 $U$，先取**单点紧化** $X^{+} = X \cup \{\infty\}$：$X$ 局部紧 Hausdorff $\Longrightarrow$ $X^{+}$ 紧 Hausdorff $\Longrightarrow$ $X^{+}$ 正规，故可在 $X^{+}$ 内对紧集 $K \setminus V$ 与开集 $U$ 用 Urysohn 引理（`lem.urysohn`，要的是**正规**而非局部紧），得 $\varphi^{+} : X^{+} \to [0,1]$ 使 $\varphi^{+} = 1$ 于 $K\setminus V$、$\varphi^{+} = 0$ 于 $X^{+}\setminus U$。限制回 $X$ 得 $\varphi := \varphi^{+}|_{X} \in C_{c}(X)$，且 $\operatorname{supp} \varphi \subseteq U$、$\varphi = 1$ 于 $K\setminus V$。于是

$$f = f\varphi + f(1 - \varphi),\qquad \operatorname{supp}(f\varphi) \subseteq U,\qquad \operatorname{supp}\big(f(1 - \varphi)\big) \subseteq V$$

> 续见 notes/thm.riesz-markov.3.md
