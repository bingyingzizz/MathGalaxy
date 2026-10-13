# 伴随函子定理　`thm.saft`
伴随函子定理（SAFT）
layer 13 · 定理 · 伴随与反射 · 范畴论
[在星图里打开](../#n=thm.saft)　·　[节点索引](../index.md)

设 $\mathcal{D}$ 是**小**且**完备**的范畴。则函子 $G : \mathcal{D} \to \mathcal{C}$ 有左伴随 $\iff$ $G$ 保持所有极限。

左伴随由一个极限的构造给出：

$$F(X) \;=\; \varprojlim_{(Y,\, f) \in (X \downarrow G)} Y$$

## 为什么成立（入边，证明在 proofs/）
- [`def.limit`](../nodes/def.limit.md) 极限 + [`def.comma-category`](../nodes/def.comma-category.md) 逗号范畴：保极限 $\implies$ 有左伴随　[proofs/imp.saft.md](../proofs/imp.saft.md)
- [`def.limit`](../nodes/def.limit.md) 极限：用到了定义 极限　[proofs/def-link.limit-saft.md](../proofs/def-link.limit-saft.md)

- …另有入边，续页见 [nodes/thm.saft.2.md](./thm.saft.2.md)

refs: Mac Lane, Categories for the Working Mathematician, V.8

> 说明见 `notes/thm.saft.md`

引用：`thm.saft`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
