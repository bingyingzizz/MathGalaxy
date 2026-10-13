# 伴随函子　`def.adjoint`
伴随函子（Adjoint Functors）
layer 9 · 定义 · 伴随与反射 · 范畴论
[在星图里打开](../#n=def.adjoint)　·　[节点索引](../index.md)

设 $F : \mathcal{C} \to \mathcal{D}$、$G : \mathcal{D} \to \mathcal{C}$ 是一对函子。$(F, G)$ 叫一对**伴随函子**，如果存在自然同构

$$\operatorname{Hom}_{\mathcal{D}}\bigl(F(X),\ Y\bigr) \;\cong\; \operatorname{Hom}_{\mathcal{C}}\bigl(X,\ G(Y)\bigr) \qquad (X \in \mathcal{C},\ Y \in \mathcal{D})$$

这时记 $F \dashv G$：$F$ 叫 $G$ 的**左伴随**，$G$ 叫 $F$ 的**右伴随**。

## 它能推出什么 / 谁在用它
- ⇒ [`thm.right-adjoint-criterion`](../nodes/thm.right-adjoint-criterion.md) 右伴随存在的判据

- …另有出边，续页见 [nodes/def.adjoint.3.md](./def.adjoint.3.md)

## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/def.adjoint.2.md](./def.adjoint.2.md)

refs: Le Stum, An introduction to condensed mathematics, §1.5

> 说明见 `notes/def.adjoint.md`

引用：`def.adjoint`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
