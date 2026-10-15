# 佐恩引理　`lem.zorn`
佐恩引理（Zorn's Lemma）
layer 9 · 引理 · 选择原理 · 序理论+集合论
[在星图里打开](../#n=lem.zorn)　·　[节点索引](../index.md)

设 $(P, \preceq )$ 是**非空**偏序集。若 $P$ 的每个链在 $P$ 中都有上界，则 $P$ 有**极大元**。

$$P \ne \emptyset \wedge  ( \forall C \subseteq P, C\text{ 是链} \to \exists u \in P, u\text{ 是} C\text{ 的上界} ) \implies \exists m \in P, m\text{ 是极大元}$$

## 它能推出什么 / 谁在用它
- ⟺ [`thm.wellordering`](../nodes/thm.wellordering.md) 良序定理
- ⟺ [`thm.hausdorff`](../nodes/thm.hausdorff.md) Hausdorff 极大原理

- …另有出边，续页见 [nodes/lem.zorn.5.md](./lem.zorn.5.md)

## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/lem.zorn.3.md](./lem.zorn.3.md)

## English abstract · **draft** · machine-drafted, pending author review; Chinese is authoritative
> English abstract 续见 [nodes/lem.zorn.2.md](./lem.zorn.2.md)

refs: Zorn (1935)；Kunen, Set Theory, I.12

> 说明见 `notes/lem.zorn.md`

引用：`lem.zorn`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
