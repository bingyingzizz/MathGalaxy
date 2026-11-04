# 面积元　`def.area-element`　·　续页（第 2 页）
[在星图里打开](../#n=def.area-element)　·　第 1 页 [nodes/def.area-element.md](./def.area-element.md)

## 陈述（续）
设 $r : U\to\mathbb{R}^{3}$ 是正则参数曲面，$g_{ij} = \langle r_{i},r_{j}\rangle$ 是第一基本形式的矩阵（$r_{1} = r_{u}$、$r_{2} = r_{v}$）。**面积元**是
$$\mathrm{d}A := \lVert r_{u}\times r_{v}\rVert\,\mathrm{d}u\,\mathrm{d}v = \sqrt{\det(g_{ij})}\;\mathrm{d}u\,\mathrm{d}v ,$$
区域 $D\subseteq U$ 的面积是 $\operatorname{area}\bigl(r(D)\bigr) := \int_{D}\mathrm{d}A$ —— 但这条等式**只在 $r$ 于 $D$ 上单射时成立**（否则右边是**计重数面积**，一般大于像的几何面积）。在**与参数定向相容**的正交单位余标架下它写成 $2$
-形式
$$\mathrm{d}A = \omega^{1}\wedge\omega^{2} .$$

关键恒等式（Gram 行列式）：

$$\lVert r_{u}\times r_{v}\rVert^{2} = \lVert r_{u}\rVert^{2}\lVert r_{v}\rVert^{2}-\langle r_{u},r_{v}\rangle^{2} = \det(g_{ij}).$$

> 续见 [nodes/def.area-element.3.md](./def.area-element.3.md)
