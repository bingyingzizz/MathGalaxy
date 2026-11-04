# 面积元　`def.area-element`　·　说明
根 `../`

**为什么是 Gram 行列式**：二维平行四边形的面积 = 底乘高，平方之后就是两个向量的 Gram 矩阵的行列式（Lagrange 恒等式）。所以 $\mathrm{d}A$ 就是切映射把参数域面积放大多少倍的因子。

⚠️ **① 单射不能省**：$r$ 正则只保证秩 $2$，推不出单射。反例：圆柱面的参数化 $r(u,v) = (\cos u,\sin u,v)$、$D = (0,4\pi)\times(0,1)$ —— $u$ 绕了两圈，$\int_{D}\mathrm{d}A = 4\pi$，而像的几何面积只有 $2\pi$。所以一般只能把 $\int_{D}\mathrm{d}A$ 叫作像的**计重数面积**；要写等号就必须要求 $r|_{D}$ 单射。

⚠️ **② 定向相容不能省**：$\mathrm{d}A = \omega^{1}\wedge\omega^{2}$ 只在余标架与参数定向相容时成立。同一张平面 $r(u,v) = (u,v,0)$ 上取 $\omega^{1} = \mathrm{d}u$、$\omega^{2} = -\mathrm{d}v$，得到的是 $-\mathrm{d}u\wedge\mathrm{d}v$：符号反了，量值不变。所以作为**密度**的面积要用 $\lvert\omega^{1}\wedge\omega^{2}\rvert$（下一段说的「面积元不变号」正是这件事）。

> 续见 notes/def.area-element.2.md
