# 根式可解 与 伽罗瓦群可解　`thm.radical-solvable`　·　说明
根 `../`

**证明**。先把「根式可解」说清楚：存在域塔 $F=F_{0}\subseteq F_{1}\subseteq\cdots\subseteq F_{m}$，$F_{i+1}=F_{i}(\alpha_{i})$、$\alpha_{i}^{n_{i}}\in F_{i}$，且 $K\subseteq F_{m}$。char 0 下 $K/F$ 是伽罗瓦扩张（分裂域 + 可分）。两个方向分别证。

**引理（Kummer 一步）**：设 $F$ 含本原 $m$ 次单位根 $\zeta$，$E/F$ 是 $m$ 次循环扩张，则 $E=F(\beta)$ 且 $\beta^{m}\in F$。证明：取生成元 $\sigma$，把 $\sigma$ 看成 $F$-线性变换。$\sigma^{m}=1$，而 $x^{m}-1$ 在 $F$ 上分裂且无重根，故 $\sigma$ 可对角化；又 $\sigma$ 的阶为 $m$，故其特征值的阶的最小公倍数为 $m$，其中必有一个本原 $m$ 次单位根 $\zeta^{k}$。取对应的特征向量 $\beta$：$\sigma(\beta)=\zeta^{k}\beta$。于是 $\sigma(\beta^{m})=\beta^{m}$，$\beta^{m}$ 在 $\sigma$ 的固定域里；循环扩张的固定域恰为 $F$，故 $\beta^{m}\in F$。又 $\beta\notin F$（否则 $\sigma(\beta)=\beta$），故 $E=F(\beta)$。∎

> 续见 notes/thm.radical-solvable.2.md
