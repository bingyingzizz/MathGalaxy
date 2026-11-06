# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

再对 $g, h$ 用第一步的「$\mu(U) = \sup \Lambda$」把 $\Lambda$ 与 $\int$ 的差压到 $\varepsilon$，从而 $|\Lambda(f) - \int f\,\mathrm{d}\mu| \le 2\varepsilon$。这一步的估计（覆盖的选取、单位分解的支集控制、$\int(h-g)$ 的上界）本图**没有写全**，故保留 skeleton。

**唯一性**：若两个正则 Borel 测度给出同一个 $\Lambda$，则对开集 $U$ 与 $f \prec U$，$\int f\,\mathrm{d}\mu_{1} = \Lambda(f) = \int f\,\mathrm{d}\mu_{2}$；对紧集 $K \Subset U$，用单点紧化后的 Urysohn 引理取 $f \prec U$、$f = 1$ 于 $K$，得 $\mu_{1}(K) \le \Lambda(f) \le \mu_{2}(U)$；先对 $K$ 取上确界（内正则）、再对 $U$ 取下确界（外正则），即得 $\mu_{1}(U) = \mu_{2}(U)$，从而两测度相等。

**范数**：若 $X$ 紧，$\mu(X) = \sup\{\Lambda(f) : 0 \le f \le 1\} = \lVert\Lambda\rVert$（正泛函在 $f \le 1$ 上的上确界就是范数）；$X$ 不紧时也可能有限（如有限总质量的测度），此时两端仍相等；也可能同为 $+\infty$。

> 续见 notes/thm.riesz-markov.7.md
