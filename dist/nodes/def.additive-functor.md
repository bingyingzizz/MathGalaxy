# 加法函子　`def.additive-functor`
加法函子（Additive Functor）
layer 9 · 定义 · 加法与阿贝尔范畴 · 同调代数

设 $\mathcal{C}, \mathcal{D}$ 是两个**预加性范畴**。函子 $F : \mathcal{C} \to \mathcal{D}$ 叫**加法函子**，如果对每对 $M, N \in \mathcal{C}$，映射
> 陈述续见 `nodes/def.additive-functor.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.addfunctor-functor.md
- `def.group` 群：用到了定义 群　proofs/def-dep.addfunctor-group.md

## 它能推出什么 / 谁在用它
- 被 `prop.additive-iff-preserves-biproduct` 加法函子的刻画 用
- 被 `prop.adjoint-additive` 伴随函子都加法 用
- 被 `prop.additive-functor-preserves-triangles` 加法函子保导出三角 用
- 被 `prop.left-exact-criterion` 左正合性的判据 用
- 被 `prop.additive-complex-construction` 加法函子与复形构造交换 用

refs: Le Stum, An introduction to condensed mathematics, §5.1–5.2

> 说明见 `notes/def.additive-functor.md`
