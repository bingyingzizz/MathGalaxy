# 高斯曲率　`def.gauss-curvature`
高斯曲率的内蕴定义
layer 23 · 定义 · 内蕴几何 · 微分几何
[在星图里打开](../#n=def.gauss-curvature)　·　[节点索引](../index.md)

曲面 $S$ 在点 $p$ 的**高斯曲率**由曲率张量定义为

$$K(p) = \frac{\langle R(\partial_{1},\partial_{2})\partial_{2},\partial_{1}\rangle}{\det(g_{ij})} = \frac{R_{1221}}{g_{11}g_{22}-g_{12}^{2}},$$
> 陈述续见 [nodes/def.gauss-curvature.2.md](./def.gauss-curvature.2.md)


## 为什么成立（入边，证明在 proofs/）
- [`def.curvature-tensor`](../nodes/def.curvature-tensor.md) 黎曼曲率张量：用到了定义 黎曼曲率张量　[proofs/dep.curv-gauss.md](../proofs/dep.curv-gauss.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/def.gauss-curvature.3.md](./def.gauss-curvature.3.md)

refs: do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 高斯曲率；do Carmo, Differential Forms and Applications, 第 4 章「结构方程」· 高斯方程

> 说明见 `notes/def.gauss-curvature.md`

引用：`def.gauss-curvature`（内容 v0.9.1）· CC BY 4.0 [LICENSE.txt](../LICENSE.txt)
