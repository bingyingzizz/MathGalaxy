# 内射对象的判据　`prop.injective-criterion`
内射对象的四条等价说法
layer 15 · 命题 · 同调与正合列 · 同调代数

设 $\mathcal{A}$ 是阿贝尔范畴，$I \in \mathcal{A}$。下列等价：

1. $I$ 是**内射对象**；
2. 每个单态射 $I \rightarrowtail M$ 都有**收缩** $M \to I$；
3. 函子 $\operatorname{Hom}_{\mathcal{A}}(-, I)$ **正合**；
4. 每个短正合列 $0 \to I \to M \to M'' \to 0$ 都**分裂**。
> 陈述续见 `nodes/prop.injective-criterion.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.projective-object` 投射 / 内射对象：用到了定义 投射 / 内射对象　proofs/def-dep.injective-criterion.md
- `def.mono` 单态射 / 满态射：用到了定义 单态射 / 满态射　proofs/def-dep.mono-injective-criterion.md
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-dep.adjoint-injective-criterion.md

## 它能推出什么 / 谁在用它
- 被 `prop.injective-complex-homotopy` 内射复形：零调、拟同构与同伦 用

- …另有出边，续页见 `nodes/prop.injective-criterion.3.md`

refs: Le Stum, An introduction to condensed mathematics, §7.1–7.3

> 说明见 `notes/prop.injective-criterion.md`
