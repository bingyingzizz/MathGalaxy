# Cauchy 列与零列　`def.cauchy-null`
有理 Cauchy 列 / 零列 / 等价（Cauchy & Null Sequences）
layer 11 · 定义 · 数系的构造 · 集合论+分析学
[在星图里打开](../#n=def.cauchy-null)　·　[节点索引](../index.md)

设 $(x_n)$ 是**有理数列**（即函数 $\omega \to \mathbb{Q}$），$|x|$ 是 $\mathbb{Q}$ 上的绝对值，$\varepsilon$ 一律取**正有理数**（此时还不需要实数）。

$(x_n)$ 是 **Cauchy 列**：

$$\forall \varepsilon > 0,\ \exists N,\ \forall m, n \ge N : |x_m - x_n| < \varepsilon$$

$(x_n)$ 是**零列**：

$$\forall \varepsilon > 0,\ \exists N,\ \forall n \ge N : |x_n| < \varepsilon$$

两个 Cauchy 列**等价**：
> 陈述续见 [nodes/def.cauchy-null.2.md](./def.cauchy-null.2.md)


## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/def.cauchy-null.3.md](./def.cauchy-null.3.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/def.cauchy-null.5.md](./def.cauchy-null.5.md)

refs: Rudin, Principles of Mathematical Analysis, Ch. 3

> 说明见 `notes/def.cauchy-null.md`

引用：`def.cauchy-null`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
