# 上链复形　`def.cochain-complex`
复形（Complex）
layer 10 · 定义 · 复形与导出三角 · 同调代数

设 $\mathcal{C}$ 是加法范畴。$\mathcal{C}$ 中的**（长）序列**是有序集 $(\mathbb{Z}, \le)$ 上的图

$$\cdots \longrightarrow K^{n-1} \xrightarrow{\ d^{n-1}\ } K^{n} \xrightarrow{\ d^{n}\ } K^{n+1} \longrightarrow \cdots$$
> 陈述续见 `nodes/def.cochain-complex.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.commutative-diagram` 图与交换图：用到了定义 图与交换图　proofs/def-dep.diagram-complex.md
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.functor-complex.md
- `def.category` 范畴：用到了定义 范畴　proofs/def-dep.category-complex.md

## 它能推出什么 / 谁在用它
- 被 `prop.simplicial-to-chain` 单纯对象给出链复形 用
- 被 `prop.category-into-complexes` 范畴嵌入复形 用
- 被 `prop.complexes-abelian` 复形范畴是阿贝尔范畴 用

- …另有出边，续页见 `nodes/def.cochain-complex.3.md`

refs: Le Stum, An introduction to condensed mathematics, §7.1

> 说明见 `notes/def.cochain-complex.md`
