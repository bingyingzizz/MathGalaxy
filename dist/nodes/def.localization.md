# 局部化　`def.localization`
范畴的局部化（Localization）
layer 10 · 定义 · 范畴与图 · 范畴论

设 $\mathcal{C}$ 是范畴，$W$ 是 $\mathcal{C}$ 中一族态射（想「当成同构」的那些）。$\mathcal{C}$ 关于 $W$ 的**局部化** $\mathrm{ho}(\mathcal{C})$ 是这样一个范畴，连同函子 $\gamma : \mathcal{C} \to \mathrm{ho}(\mathcal{C})$：
> 陈述续见 `nodes/def.localization.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.localization-functor.md
- `def.section-retraction` 截面与收缩：用到了定义 截面与收缩　proofs/def-dep.localization-iso.md
- `def.natural-transformation` 自然变换：用到了定义 自然变换　proofs/def-dep.localization-nattrans.md

## 它能推出什么 / 谁在用它
- 被 `prop.calculus-of-fractions` 分式演算下的局部化 用
- 被 `prop.ring-localization` 环的局部化 W⁻¹R 用
- 被 `prop.localization-hom-colim` 局部化的 Hom 是滤过余极限 用

- …另有出边，续页见 `nodes/def.localization.3.md`

refs: Le Stum, An introduction to condensed mathematics, §1.1

> 说明见 `notes/def.localization.md`
