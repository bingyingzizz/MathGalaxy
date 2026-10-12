# 拉回与内 Hom、张量积相容　`prop.inverse-image-tensor`
命题：$f_{*}\operatorname{Hom}(f^{-1}M, N) = \operatorname{Hom}(M, f_{*}N)$，$f^{-1}(M \otimes N) \cong f^{-1}M \otimes f^{-1}N$
layer 19 · 命题 · 拓扑斯 · 范畴论

设 $f : \mathcal{T} \to \mathcal{T}'$ 是拓扑斯态射、$M, N$ 是阿贝尔群层。则
> 陈述续见 `nodes/prop.inverse-image-tensor.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.tensor-abelian-sheaf` 阿贝尔层的张量积：用到了定义 阿贝尔层的张量积　proofs/def-link.invtensor-tensor.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.slice-shriek-projection` 切片的投影公式

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.52

> 说明见 `notes/prop.inverse-image-tensor.md`
