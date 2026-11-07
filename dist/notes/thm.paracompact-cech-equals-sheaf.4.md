# 仿紧空间上的 Čech 就是上同调　`thm.paracompact-cech-equals-sheaf`　·　说明
根 `../`

**② 缺口：软层无环（Godement）。** 仿紧 Hausdorff 上软层 $\mathcal{M}$ 满足 $H^{n}(X,\mathcal{M})=0$（$n\ge 1$）。它不能由 ① 直接得到：① 只说明「Čech 复形是消解」，而固定覆盖的 Čech 上同调并不等于导出函子上同调（反例见 ④）。标准路线两条：$n=1$ 用「软层使 $0\to\mathcal{M}\to\mathcal{G}\to\mathcal{H}\to 0$ 的整体截面正合」——对局部有限闭加细 $\{A_{i}\}$ 作 Zorn 归纳：在闭并 $B$ 上已有提升 $s$，取 $A_{i}\not\subseteq B$，差 $s-s_{i}\in\mathcal{M}(B\cap A_{i})$ 由软性延拓为整体 $t$，在 $A_{i}$ 上改用 $s_{i}+t$，沿闭覆盖 $\{B,A_{i}\}$ 粘接，极大性给 $B=X$；再用内射消解 $0\to\mathcal{M}\to\mathcal{I}\to\mathcal{Q}\to 0$ 作维数转移（$\mathcal{Q}$ 是松弛层的商、故松弛，松弛 $\implies$ 软；长正合列给 $H^{n}(\mathcal{M})\cong H^{n-1}(\mathcal{Q})$，对 $n$ 归纳）。本图没有这条引理的节点；把它写成节点只需层的截面正合性 + 长正合列。

> 续见 notes/thm.paracompact-cech-equals-sheaf.5.md
