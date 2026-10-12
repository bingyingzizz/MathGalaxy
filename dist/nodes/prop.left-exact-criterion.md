# 左正合性的判据　`prop.left-exact-criterion`
命题：$F$ 左正合 $\iff$ $F$ 加法且保左正合列
layer 14 · 命题 · 加法与阿贝尔范畴 · 同调代数

设 $\mathcal{C}, \mathcal{D}$ 是阿贝尔范畴，$F : \mathcal{C} \to \mathcal{D}$ 是函子。则

$$F \text{ 左正合} \iff F \text{ 加法，且把左正合列送到左正合列}.$$

对偶地：$F$ 右正合 $\iff$ $F$ 加法，且把右正合列送到右正合列。

## 为什么成立（入边，证明在 proofs/）
- `def.exact-functor` 正合函子：用到了定义 正合函子　proofs/def-link.lcrit-exactfun.md
- `def.additive-functor` 加法函子：用到了定义 加法函子　proofs/def-link.lcrit-addfun.md
- `def.preserves-limit` 保极限的函子：用到了定义 保极限的函子　proofs/def-link.lcrit-res.md

refs: Le Stum, An introduction to condensed mathematics, §5.2

> 说明见 `notes/prop.left-exact-criterion.md`
