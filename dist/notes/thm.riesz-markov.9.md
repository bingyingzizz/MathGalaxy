# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

又 $0 \le f - s \le M/n$ 且 $f - s$ 支在 $W$ 内，故 $\int f \le \int s + (M/n)\mu(W)$，即 $\int s \ge \int f - (M/n)\mu(W)$。代入得 $\Lambda(f) \ge \int f - (M/n)\mu(W) - M\delta$；先令 $\delta \to 0$，再令 $n \to \infty$，即得 $\Lambda(f) \ge \int f$。

**上界 $\Lambda(f) \le \int f\,\mathrm{d}\mu$**：由下界，对任意连续 $h \ge 0$ 有 $\Lambda(h) \ge \int h$。取开 $W \supseteq K$ 使 $\mu(W) < \mu(K) + \varepsilon$（外正则），再取 $\varphi \in C_{c}(X)$，$0 \le \varphi \le 1$、$\varphi = 1$ 于 $K$、$\operatorname{supp} \varphi \subseteq W$（单点紧化 + `lem.urysohn`）。令 $k := M\varphi - f$：在 $K$ 上 $\varphi = 1$ 故 $k = M - f \ge 0$；在 $K$ 外 $f = 0$ 故 $k = M\varphi \ge 0$。于是 $k \ge 0$ 连续紧支，对 $k$ 用下界：

$$\Lambda(k) \ge \int k \;\Longrightarrow\; M\Lambda(\varphi) - \Lambda(f) \ge M\int \varphi - \int f.$$

> 续见 notes/thm.riesz-markov.10.md
