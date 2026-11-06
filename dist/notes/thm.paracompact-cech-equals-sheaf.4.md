# 仿紧空间上的 Čech 就是上同调　`thm.paracompact-cech-equals-sheaf`　·　说明
根 `../`

**② 的缺口：软层无环。** 还需要引理：仿紧 Hausdorff 上，软层 $\mathcal{M}$ 满足 $H^{n}(X, \mathcal{M}) = 0$（$n \ge 1$）。标准证明（Godement）走典范软消解 $0 \to \mathcal{M} \to C^{0}(\mathcal{M}) \to C^{1}(\mathcal{M}) \to \cdots$，逐项用单位分解把闭集上的截面拼成整体；本图没有这条引理的节点，也没有把「$C^{q}(\mathcal{M})$ 软」与「软消解算导出函子」两步展开。

**③ 的缺口：零调消解算导出函子。** 还需标准同调代数引理：若 $0 \to \mathcal{M} \to \mathcal{A}^{0} \to \mathcal{A}^{1} \to \cdots$ 是消解且每个 $\mathcal{A}^{q}$ 是 $\Gamma$-无环（即 $H^{n}(X, \mathcal{A}^{q}) = 0$，$n \ge 1$），则 $H^{n}(X, \mathcal{M}) \cong H^{n}\bigl(\Gamma(X, \mathcal{A}^{\bullet})\bigr)$。证明是与内射消解比较（比较引理 + 逐项填图），本图同样未单列节点。

> 续见 notes/thm.paracompact-cech-equals-sheaf.5.md
