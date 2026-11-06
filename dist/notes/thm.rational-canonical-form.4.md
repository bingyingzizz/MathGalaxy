# 有理标准形　`thm.rational-canonical-form`　·　说明
根 `../`

**引理 2（结构定理，只用引理 1）**：设 $M$ 是有限生成 $R$-模。取生成元 $x_{1}, \ldots, x_{n}$，得满射 $R^{n} \to M$，其核由列向量 $a_{1}, \ldots, a_{m} \in R^{n}$ 生成，即 $M \cong \operatorname{coker}(A)$，$A = (a_{1} \cdots a_{m})$。对 $A$ 取 Smith 标准形：存在可逆矩阵 $P, Q$ 使 $PAQ = \operatorname{diag}(d_{1}, \ldots, d_{r}, 0)$。可逆矩阵只是换基，故 $\operatorname{coker}(A) \cong \operatorname{coker}(PAQ) \cong R^{n-r} \oplus R/(d_{1}) \oplus \cdots \oplus R/(d_{r})$：第 $i$ 个坐标方向被 $d_{i} e_{i}$ 生成，$i > r$ 的方向不被任何关系碰到。$\square$

**存在性**：对 $V_{A}$ 用引理 2。因 $V$ 挠，自由部分必须为零：若 $R^{n-r} \ne 0$，取 $e_{1}$，则 $\chi_{A} e_{1} \ne 0$，与 $\chi_{A} \in \operatorname{Ann}(V)$ 矛盾。再删去单位 $d_{i}$（此时 $R/(d_{i}) = 0$），得 $V \cong \bigoplus_{i=1}^{s} R/(d_{i})$，其中 $d_{1} \mid \cdots \mid d_{s}$ 非单位首一多项式。

> 续见 notes/thm.rational-canonical-form.5.md
