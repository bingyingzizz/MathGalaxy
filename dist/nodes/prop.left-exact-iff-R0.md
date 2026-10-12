# 左正合性与 R⁰　`prop.left-exact-iff-R0`
命题：$F$ 左正合 $\iff$ $R^{0}F \cong F$
layer 14 · 命题 · 复形与导出三角 · 同调代数

设 $\mathcal{A}$ 是阿贝尔范畴（有足够多内射）、$\mathcal{A}'$ 是阿贝尔范畴，$F : \mathcal{A} \to \mathcal{A}'$ 是**加法**函子。则

$$F \text{ 左正合} \iff \forall M \in \mathcal{A}:\ R^{0}F(M) \cong F(M).$$

对偶地（有足够多投射时）：$F$ 右正合 $\iff L_{0}F \cong F$。

## 为什么成立（入边，证明在 proofs/）
- `def.right-derived-functor` 右导出函子：用到了定义 右导出函子　proofs/def-link.r0-derfun.md
- `def.exact-functor` 正合函子：用到了定义 正合函子　proofs/def-link.r0-exactfun.md

refs: Le Stum, An introduction to condensed mathematics, §7.2

> 说明见 `notes/prop.left-exact-iff-R0.md`
