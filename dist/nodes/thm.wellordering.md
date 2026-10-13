# 良序定理　`thm.wellordering`
良序定理 / 良序原理（Well-Ordering Theorem, Zermelo 1904）
layer 9 · 定理 · 选择原理 · 集合论+序理论
[在星图里打开](../#n=thm.wellordering)　·　[节点索引](../index.md)

每个集合都能被赋予一个良序：

$$\forall X \exists\preceq ( \preceq\text{ 是} X\text{ 上的良序关系} )$$

换句话说：任何集合 $X$ 都与某个序数等势。

特别地，每个集合都有基数；实数集上存在良序（但这个良序无法被显式写出）。

## 为什么成立（入边，证明在 proofs/）
- [`ax.choice`](../nodes/ax.choice.md) 选择公理：选择公理 $\iff$ 良序定理　[proofs/eq.ac-wo.md](../proofs/eq.ac-wo.md)

- …另有入边，续页见 [nodes/thm.wellordering.2.md](./thm.wellordering.2.md)

## 它能推出什么 / 谁在用它
- ⟺ [`ax.choice`](../nodes/ax.choice.md) 选择公理

- …另有出边，续页见 [nodes/thm.wellordering.3.md](./thm.wellordering.3.md)

refs: Zermelo (1904)；Kunen, Set Theory, I.12

> 说明见 `notes/thm.wellordering.md`

引用：`thm.wellordering`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
