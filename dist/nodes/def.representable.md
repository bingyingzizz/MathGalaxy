# 表示函子　`def.representable`
表示函子与万有元素（Representable Functor）
layer 12 · 定义 · 预层与米田 · 范畴论
[在星图里打开](../#n=def.representable)　·　[节点索引](../index.md)

设 $F : \mathcal{C} \to \mathbf{Set}$ 是函子。

**（一）万有元素。** 对象 $X \in \mathcal{C}$ 连同一个元素 $s \in F(X)$ 叫对 $F$ **万有**，如果

$$\forall Y \in \mathcal{C},\ \forall t \in F(Y),\ \exists! \, f : X \to Y,\qquad F(f)(s) = t$$

这时也说 $F$ 被 $(X, s)$ **表示**。

**（二）可表示。** 若 $F \cong \operatorname{Hom}_{\mathcal{C}}(X, -)$，就说 $F$ 被 $X$ **表示**，$X$ 叫 $F$ 的**表示对象**。

## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/def.representable.2.md](./def.representable.2.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/def.representable.4.md](./def.representable.4.md)

refs: Le Stum, An introduction to condensed mathematics, §1.1–1.5

> 说明见 `notes/def.representable.md`

引用：`def.representable`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
