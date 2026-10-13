# 复测度　`def.complex-measure`
复测度（Complex Measure）
layer 16 · 定义 · 符号测度与分解 · 分析学
[在星图里打开](../#n=def.complex-measure)　·　[节点索引](../index.md)

可测空间 $(X, \mathcal{M})$ 上的**复测度**是一个映射

$$\nu : \mathcal{M} \to \mathbb{C}$$

满足

$$\nu(\emptyset) = 0, $$

且对两两不交的 $\{E_j\} \subseteq \mathcal{M}$：

$$\nu( \bigsqcup_j E_j ) = \sum_j \nu(E_j),\text{ 右边的级数绝对收敛}$$

## 为什么成立（入边，证明在 proofs/）
- [`def.complex`](../nodes/def.complex.md) 复数 ℂ：用到了定义 复数 ℂ　[proofs/dep.complex-complex-measure.md](../proofs/dep.complex-complex-measure.md)

- …另有入边，续页见 [nodes/def.complex-measure.2.md](./def.complex-measure.2.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/def.complex-measure.3.md](./def.complex-measure.3.md)

refs: Folland, Real Analysis, §3.3

> 说明见 `notes/def.complex-measure.md`

引用：`def.complex-measure`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
