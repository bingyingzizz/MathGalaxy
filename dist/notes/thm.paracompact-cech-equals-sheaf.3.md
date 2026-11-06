# 仿紧空间上的 Čech 就是上同调　`thm.paracompact-cech-equals-sheaf`　·　说明
根 `../`

**② 每一项是软的：细层部分已证。** 仿紧 Hausdorff 上，局部有限覆盖配单位分解（`prop.paracompact-partition-unity`）。先证「细 $\implies$ 软」：设 $\mathcal{F}$ 是细层，$F \subseteq X$ 闭，$s \in \mathcal{F}(F)$。每个 $x \in F$ 有邻域 $U_{x}$ 与 $s_{x} \in \mathcal{F}(U_{x})$ 使 $s_{x}|_{F \cap U_{x}} = s$；把 $\{U_{x}\}_{x \in F} \cup \{X \setminus F\}$ 取局部有限加细并配单位分解 $\{\rho_{j}\}$。令 $s_{j} \in \mathcal{F}(V_{j})$ 是相应局部截面；在 $V_{j}$ 外把 $\rho_{j} s_{j}$ 延拓为 $0$（$\operatorname{supp} \rho_{j} \subseteq V_{j}$ 保证相容），则 $\tilde{s} := \sum_{j} \rho_{j} s_{j}$ 是 $X$ 上的整体截面（局部有限和），且在 $F$ 上等于 $s$。所以 $\mathcal{F}$ 软。

> 续见 notes/thm.paracompact-cech-equals-sheaf.4.md
