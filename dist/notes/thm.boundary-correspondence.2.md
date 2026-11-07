# 边界对应定理　`thm.boundary-correspondence`　·　说明
根 `../`

**缺口：延拓的存在与边界单射。** 这正是 Carathéodory 定理的内容：$\partial\Omega$ 局部连通 $\implies$ 连续延拓存在（Carathéodory 1913）；Jordan 曲线 $\implies$ $\partial\Omega$ 局部连通（Jordan 曲线是紧度量空间里的简单闭曲线，局部连通）。边界单射可用 crosscut / prime end 论证，或对逆映射 $f^{-1}:\mathbb{D}\to\Omega$ 同法延拓后比较。本图没有 Carathéodory 节点，也没有 crosscut / prime end 节点；`thm.schwarz-reflection` 只处理**解析弧**（圆、直线）的反射延拓，不能覆盖一般 Jordan 曲线。

**⭐ 用途。** 它给 Schwarz–Christoffel（`thm.schwarz-christoffel`，仍 skeleton）的「实轴上的 $x_k$ 对应多边形顶点」提供合法性。

**📌 记号。** 入边（原无显式 id，靠 src/core/graph.js 自动分配 e102.implication）只记录了「径向极限 $\to$ 连续 $\to$ 同胚」的路线；其中第一步「径向极限存在」正是 Carathéodory 定理，不是初等估计——不要把它当作已证。
