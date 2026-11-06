# 鼓包函数 $+$ 局部有限加细 $\implies$ 光滑单位分解
`imp.mf-smooth-partition-unity` · 推出 · strong 边 · 根 `../`

`prop.paracompact-partition-unity` 仿紧性与单位分解 + `def.partition-of-unity` 单位分解 → `thm.smooth-partition-unity` 光滑单位分解

**第三步：在每块上造正鼓包。** 固定 $\alpha$。$\overline{V_{\alpha}}$ 紧且含于开集 $W_{\alpha}$，用有限个坐标球 $B(x_{j}, r_{j})$（闭包含于 $W_{\alpha}$）盖住它。在每个球上取鼓包 $\beta_{j} \ge 0$：在半径 $r_{j}/2$ 的球内为正、在 $B(x_{j}, r_{j})$ 外为零。令

$$\psi_{\alpha} := \sum_{j}\beta_{j} .$$

则 $\psi_{\alpha} \in C^{\infty}(M)$、$\psi_{\alpha} \ge 0$、$\psi_{\alpha} > 0$ 在 $V_{\alpha}$ 上，且 $\operatorname{supp}\psi_{\alpha} \subseteq \bigcup_{j}\overline{B(x_{j}, r_{j})} \subseteq W_{\alpha} \subseteq U_{\alpha}$。

> 续见 proofs/imp.mf-smooth-partition-unity.3.md
