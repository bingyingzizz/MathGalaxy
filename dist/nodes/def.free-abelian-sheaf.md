# 自由阿贝尔群层　`def.free-abelian-sheaf`
定义：$\mathbb{Z}\cdot X$，遗忘函子的左伴随
layer 17 · 定义 · 阿贝尔层 · 同调代数

设 $\mathcal{T}$ 是拓扑斯。遗忘函子

$$\mathcal{T}(\mathbf{Ab}) \longrightarrow \mathcal{T}$$

（把阿贝尔层忘成底集合层）有**左伴随**，记作
> 陈述续见 `nodes/def.free-abelian-sheaf.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.abelian-sheaf` 阿贝尔层：用到了定义 阿贝尔层　proofs/def-link.freeab-abelian.md
- `def.adjoint` 伴随函子：用到了定义 伴随函子　proofs/def-link.freeab-adjoint.md

## 它能推出什么 / 谁在用它
- 被 `prop.presheaf-free-projective` 自由的预层是投射的 用
- 被 `prop.free-sheaf-tensor` 自由对象的张量积 用
- 被 `prop.cech-cochain-formula` Čech 上链的具体公式 用
- 被 `prop.slice-shriek-z` 切片左伴随作用在 Z 上 用

refs: Le Stum, An introduction to condensed mathematics, Exercise 5.18, Exercise 5.24

> 说明见 `notes/def.free-abelian-sheaf.md`
