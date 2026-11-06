# 光滑单位分解　`thm.smooth-partition-unity`　·　说明
根 `../`

**第二步：局部有限加细**。$M$ 第二可数、Hausdorff、局部欧氏，故仿紧（`prop.paracompact-partition-unity` 的前提）。于是开覆盖 $\mathcal{U}$ 有局部有限加细 $\{V_{\alpha}\}$，且可要求每个 $\overline{V_{\alpha}}$ 紧、并落在某个图卡 $W_{\alpha} \subseteq U_{\alpha}$ 里：先取 $U_{\alpha}$ 内的坐标球作加细，再整体细化一次、收紧闭包。

**第三步：每块上放正鼓包**。固定 $\alpha$。$\overline{V_{\alpha}}$ 紧且含于开集 $W_{\alpha}$，故可用**有限个**坐标球 $B(x_{j}, r_{j})$（闭包含于 $W_{\alpha}$）盖住 $\overline{V_{\alpha}}$。在每个球上取鼓包 $\beta_{j} \ge 0$（在半径 $r_{j}/2$ 的球内为正、在 $B(x_{j}, r_{j})$ 外为零），令 $\psi_{\alpha} = \sum_{j} \beta_{j}$。则 $\psi_{\alpha} \in C^{\infty}(M)$、$\psi_{\alpha} \ge 0$、$\psi_{\alpha} > 0$ 在 $V_{\alpha}$ 上（每点落在某个半径 $r_{j}/2$ 的球里），且 $\operatorname{supp}\psi_{\alpha} \subseteq \bigcup_{j} \overline{B(x_{j}, r_{j})} \subseteq W_{\alpha} \subseteq U_{\alpha}$。

> 续见 notes/thm.smooth-partition-unity.3.md
