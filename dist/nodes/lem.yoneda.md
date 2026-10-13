# 米田引理　`lem.yoneda`
米田引理（Yoneda Lemma）
layer 13 · 引理 · 预层与米田 · 范畴论
[在星图里打开](../#n=lem.yoneda)　·　[节点索引](../index.md)

设 $F : \mathcal{C} \to \mathbf{Set}$ 是函子，$X \in \mathcal{C}$，并记

$$h^{X} = \operatorname{Hom}_{\mathcal{C}}(X, -) : \mathcal{C} \to \mathbf{Set}$$

则存在自然双射

$$\operatorname{Hom}(h^{X}, F) \;\cong\; F(X), \qquad \alpha \mapsto \alpha_{X}(1_{X})$$

即「全体自然变换」与「$F(X)$ 的元素」一一对应。

## 为什么成立（入边，证明在 proofs/）
- [`def.representable`](../nodes/def.representable.md) 表示函子：用到了定义 表示函子　[proofs/def-link.representable-yoneda.md](../proofs/def-link.representable-yoneda.md)

- …另有入边，续页见 [nodes/lem.yoneda.2.md](./lem.yoneda.2.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/lem.yoneda.3.md](./lem.yoneda.3.md)

refs: Le Stum, An introduction to condensed mathematics, §1.1–1.5

> 说明见 `notes/lem.yoneda.md`

引用：`lem.yoneda`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
