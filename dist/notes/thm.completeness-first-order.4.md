# 完备性定理　`thm.completeness-first-order`　·　说明
根 `../`

**第四步：极大一致扩张。** 引理：每个一致语句集 $\Gamma$ 可扩张为极大一致语句集 $\Gamma^{*}$。证明：枚举所有语句 $\psi_0,\psi_1,\ldots$；令 $\Gamma_0=\Gamma$，若 $\Gamma_n\cup\{\psi_n\}$ 一致则 $\Gamma_{n+1}=\Gamma_n\cup\{\psi_n\}$，否则 $\Gamma_{n+1}=\Gamma_n$；令 $\Gamma^{*}=\bigcup_n\Gamma_n$。一致性：若 $\Gamma^{*}$ 不一致，则某个证明只用到有限多条假设，它们全在某个 $\Gamma_n$ 中，与 $\Gamma_n$ 一致矛盾。极大性：若 $\psi_n\notin\Gamma^{*}$，则 $\Gamma_n\cup\{\psi_n\}$ 不一致，由推论得 $\Gamma_n\vdash\neg\psi_n$，故 $\Gamma^{*}\vdash\neg\psi_n$。由此：对每个语句恰有 $\psi\in\Gamma^{*}$ 或 $\neg\psi\in\Gamma^{*}$；$\Gamma^{*}$ 对 $\vdash$ 封闭（若 $\Gamma^{*}\vdash\psi$ 而 $\psi\notin\Gamma^{*}$，则 $\neg\psi\in\Gamma^{*}$，与一致性矛盾）；$\Gamma^{*}$ 含全部逻辑公理。

> 续见 notes/thm.completeness-first-order.5.md
