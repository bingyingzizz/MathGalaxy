# 内射与零调的等价　`prop.injective-iff-acyclic`
命题：内射 $\iff$ 对一切左正合函子零调
layer 16 · 命题 · 复形与导出三角 · 同调代数

设 $\mathcal{A}$ 是阿贝尔范畴，$I \in \mathcal{A}$。则下列等价：

1. $I$ 是**内射**对象；
2. $I$ 对**一切左正合**加法函子 $F : \mathcal{A} \to \mathcal{A}'$ 都是 $F$-零调的；
3. $I$ 对一切形如 $F = \operatorname{Hom}_{\mathcal{A}}(M, -)$ 的左正合函子都是 $F$-零调的。

## 为什么成立（入边，证明在 proofs/）
- `def.f-acyclic` F-零调对象：用到了定义 F-零调对象　proofs/def-link.injacy-acyclic.md
- `prop.injective-criterion` 内射对象的判据：用到了定义 内射对象的判据　proofs/def-link.injacy-injective.md

refs: Le Stum, An introduction to condensed mathematics, §7.2

> 说明见 `notes/prop.injective-iff-acyclic.md`
