# van Kampen 定理　`thm.van-kampen`　·　说明
根 `../`

**证明**：分四步。两处关键的技术输入是「紧性 $+$ Lebesgue 数」与「$U \cap V$ 道路连通」。

**第一步（分解闭道路）**：设 $\alpha : I \to X$ 是 $x_{0}$ 处的闭道路。对开覆盖 $\{U, V\}$ 用 `def.lebesgue-number`：存在 $\delta > 0$，使 $\alpha$ 的每个直径 $< \delta$ 的子区间都落在 $U$ 或 $V$ 里。取分点 $0 = t_{0} < t_{1} < \cdots < t_{n} = 1$ 细分到 $t_{i} - t_{i-1} < \delta$，记 $\alpha_{i} = \alpha|_{[t_{i-1}, t_{i}]}$，每段落在 $U$ 或 $V$ 中。因为 $U \cap V$ 道路连通，可在 $U \cap V$ 中取从 $x_{0}$ 到 $\alpha(t_{i})$ 的道路 $\beta_{i}$（$\beta_{0} = \beta_{n} = $ 常值）。把 $\beta_{i}$ 看成 $U$ 中的道路或 $V$ 中的道路都可以（它整个在 $U \cap V$ 里）。于是

$$\alpha \;\simeq_{x_{0}}\; \prod_{i=1}^{n} \big(\beta_{i-1}^{-1} \alpha_{i} \beta_{i}\big),$$

> 续见 notes/thm.van-kampen.2.md
