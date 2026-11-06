# van Kampen 定理　`thm.van-kampen`　·　说明
根 `../`

右边每个因子是**完全落在 $U$ 或 $V$ 里**的、以 $x_{0}$ 为基点的闭道路。其实这里只需要 $\alpha_{i}$ 落在 $U$ 或 $V$、$\beta_{i}$ 落在 $U \cap V$：乘积的每一项写成 (在 $U$ 中) 或 (在 $V$ 中) 的环路。

**第二步（满射）**：令 $\Phi : \pi_{1}(U) * \pi_{1}(V) \to \pi_{1}(X)$ 由两个包含诱导的群同态给出（自由积的泛性质）。第一步说明每个 $[\alpha] \in \pi_{1}(X)$ 都是若干 $\Phi$-像的乘积，故 $\Phi$ 满射。记 $q : \pi_{1}(U) * \pi_{1}(V) \to P := (\pi_{1}(U) * \pi_{1}(V))/N$ 为商映射。由于对 $\gamma \in G$，$\Phi(i_{*}\gamma \cdot j_{*}\gamma^{-1}) = [\gamma]\,[\gamma]^{-1} = 1$，有 $N \subseteq \ker \Phi$，故 $\Phi$ 下降为

$$\bar{\Phi} : P \longrightarrow \pi_{1}(X).$$

它仍是满射。下面构造它的逆。

> 续见 notes/thm.van-kampen.3.md
