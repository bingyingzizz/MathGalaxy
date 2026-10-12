# 一般正合列　`def.exact-sequence`
正合列
layer 16 · 定义 · 加法与阿贝尔范畴 · 同调代数+范畴论

设

$$\cdots \longrightarrow M^{n-1} \xrightarrow{\ d^{n-1}\ } M^{n} \xrightarrow{\ d^{n}\ } M^{n+1} \longrightarrow \cdots$$

是阿贝尔范畴中的复形（$d^{n} \circ d^{n-1} = 0$）。称它在 $M^{n}$ 处**正合**，如果

$$\operatorname{im}(d^{n-1}) = \ker(d^{n}).$$

处处正合的复形叫**正合列**。特别地，**短正合列**
> 陈述续见 `nodes/def.exact-sequence.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.cochain-complex` 上链复形：用到了定义 上链复形　proofs/def-dep.exseq-complex.md
- `def.image` 像 / 余像：用到了定义 像 / 余像　proofs/def-dep.exseq-image.md

## 它能推出什么 / 谁在用它
- 被 `prop.exact-sequence-subcategory` 正合列构成子范畴 用
- 被 `prop.abhaus-strict-exact` Hausdorff 拓扑阿贝尔群的核与余核 用

refs: Le Stum, Definition 5.2.3

> 说明见 `notes/def.exact-sequence.md`
