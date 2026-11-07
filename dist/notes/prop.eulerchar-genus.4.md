# Euler 示性数与亏格　`prop.eulerchar-genus`　·　说明
根 `../`

**四、缺口（为什么仍 skeleton）**：上式只对标准形成立。要得到任意闭可定向曲面 $S$，需要 (a) $S$ 同胚于某标准形 —— 即 `thm.classification-surfaces`（它本身依赖 Radó 与组合引理）；或 (b) 绕过分类，直接证 $\beta_{2}(S)=1$（基本类存在），再由 $\chi=\sum_{i}(-1)^{i}\beta_{i}$（`thm.euler-characteristic`）得 $\chi=1-2g+1$。两条路本图都没有闭合：(a) 缺的是组合归类引理本身（有限归纳 + 终止性，Munkres Ch. 12 的核心）；(b) 缺的是「基本类存在可推出 $\beta_{2}=1$」（定向对偶）与 Radó 三角剖分存在性。故不删 status、不勾 ∎。

⭐ 三个读数：$S^{2}$ 的 $g=0$、$\chi=2$；$T^{2}$ 的 $g=1$、$\chi=0$；双环面 $g=2$、$\chi=-2$。

📌 与几何的接口：Gauss–Bonnet 说 $\int_{M}K\,\mathrm{d}A=2\pi\chi(M)$；与本条合起来是 $\int K=4\pi(1-g)$ —— 曲率总量只由亏格决定。
