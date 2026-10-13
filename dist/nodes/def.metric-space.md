# 距离空间　`def.metric-space`
距离空间 / 度量空间（Metric Space）
layer 13 · 定义 · 度量空间 · 拓扑学
[在星图里打开](../#n=def.metric-space)　·　[节点索引](../index.md)

**距离空间**是一对 (X, d)：$X$ 是集合，$d : X \times X \to [0, +\infty )$ 是 $X$ 上的**距离**，满足

- **非退化**：$d(x, y) = 0 \iff x = y$
- **对称**：$d(x, y) = d(y, x)$
- **三角不等式**：$d(x, z) \le d(x, y) + d(y, z)$

由 $d$ 定义**开球** $B(x, r) = \{ y \in X : d(x, y) < r \}$，并规定 $U \subseteq X$ 是开集 $\iff U$ 是若干开球之并。这样 $X$ 上就有了一个拓扑。
> 陈述续见 [nodes/def.metric-space.2.md](./def.metric-space.2.md)


## 它能推出什么 / 谁在用它
- 被 [`lem.covering`](../nodes/lem.covering.md) 覆盖引理 用

- …另有出边，续页见 [nodes/def.metric-space.4.md](./def.metric-space.4.md)

## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/def.metric-space.3.md](./def.metric-space.3.md)

refs: Rudin, Principles of Mathematical Analysis, Ch. 2；Munkres, Topology, §20

> 说明见 `notes/def.metric-space.md`

引用：`def.metric-space`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
