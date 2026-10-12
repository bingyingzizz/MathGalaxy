# 子范畴继承加法与阿贝尔性　`prop.subcat-additive`
命题：全忠实 + 有伴随 $\implies$ $\mathcal{C}$ 也加法（阿贝尔）
layer 18 · 命题 · 加法与阿贝尔范畴 · 同调代数

设 $F : \mathcal{C} \hookrightarrow \mathcal{D}$ 是**全忠实**函子，$\mathcal{D}$ 加法（resp. 阿贝尔）。若 $F$ 有**伴随或余伴随**（resp. 且 $F$ 正合），则 $\mathcal{C}$ 也是**加法**（resp. **阿贝尔**）范畴。

## 为什么成立（入边，证明在 proofs/）
- `prop.adjoint-additive` 伴随函子都加法 + `prop.image-kernel-cokernel` 像就是余核的核：伴随都加法 + 阿贝尔里态射严格 $\implies$ 子范畴继承　proofs/imp-link.adjadd-subcatadd.md
- `def.abelian-category` 加法 / 阿贝尔范畴：用到了定义 加法 / 阿贝尔范畴　proofs/def-link.subcatadd-abelian.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 5.12

> 说明见 `notes/prop.subcat-additive.md`
