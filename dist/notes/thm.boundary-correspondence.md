# 边界对应定理　`thm.boundary-correspondence`　·　说明
根 `../`

**这条命题就是 Carathéodory–Osgood 边界对应定理**（Jordan 区域版）：Riemann 映射的内部双全纯（`thm.riemann-mapping`，第 15 批已补完整证明）自动延拓到闭包并给出同胚。它不是 Riemann 映射定理的推论——内部双全纯完全不管边界行为，Jordan 条件是本质的。

**能独立验证的一半：延拓 + 边界单射 $\implies$ 同胚。** 设 $f:\Omega\to\mathbb{D}$ 已连续延拓到 $\overline{\Omega}$，且在 $\partial\Omega$ 上单射。则：

① $f(\partial\Omega)\cap\mathbb{D}=\emptyset$。否则有 $\zeta\in\partial\Omega$ 使 $w=f(\zeta)\in\mathbb{D}=f(\Omega)$，取 $z\in\Omega$ 使 $f(z)=w$；$z\ne\zeta$，与单射矛盾。

② 于是 $f(\overline{\Omega})=f(\Omega)\cup f(\partial\Omega)\subseteq \mathbb{D}\cup\partial\mathbb{D}=\overline{\mathbb{D}}$，且包含 $\mathbb{D}$；$\overline{\Omega}$ 紧、$\overline{\mathbb{D}}$ Hausdorff，连续双射从紧空间到 Hausdorff 空间自动是同胚。∎（这一段是真正的证明，只用了紧性。）

> 续见 notes/thm.boundary-correspondence.2.md
