# 有效等价关系　`def.effective-equivalence`
有效等价关系（Effective Equivalence Relation）
layer 13 · 定义 · 层与拓扑 · 范畴论

对象 $X$ 上的**等价关系**是一个图 $R \rightrightarrows X$，使得对每个 $Y$，$\operatorname{Hom}(Y, R) \to \operatorname{Hom}(Y, X) \times \operatorname{Hom}(Y, X)$ 是等价关系（在 $\mathbf{Set}$ 里取）。

它叫**有效的**，如果
> 陈述续见 `nodes/def.effective-equivalence.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.equalizer` 等化子 / 余等化子：用到了定义 等化子 / 余等化子　proofs/def-dep.equalizer-effective.md
- `def.fibered-product` 纤维积 / 纤维余积：用到了定义 纤维积 / 纤维余积　proofs/def-dep.fibered-effective.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.pretopos-factorization` 满-单分解
- 被 `prop.sheafify-equivalence` 层化与等价关系交换 用
- 被 `lem.representable-quotient` 可表示性的下降 用
- 被 `def.pretopos` 预拓扑斯 用

- …另有出边，续页见 `nodes/def.effective-equivalence.3.md`

refs: Le Stum, An introduction to condensed mathematics, §3.1–3.2

> 说明见 `notes/def.effective-equivalence.md`
