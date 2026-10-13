# 外测度　`def.outer-measure`
外测度（Outer Measure）
layer 14 · 定义 · 测度的构造 · 分析学
[在星图里打开](../#n=def.outer-measure)　·　[节点索引](../index.md)

设 $X$ 是非空集合。函数 $\mu^* : \mathcal{P}(X) \to [0, +\infty]$ 是一个**外测度**，当且仅当

- $\mu^*(\emptyset) = 0$
- **单调**：$A \subseteq B \implies \mu^*(A) \le \mu^*(B)$
- **可数次可加**：$\mu^*( \bigcup_{j=1}^{\infty} A_j ) \le \sum_{j=1}^{\infty} \mu^*(A_j)$

## 为什么成立（入边，证明在 proofs/）
- [`def.power-set`](../nodes/def.power-set.md) 幂集 𝒫(X)：用到了定义 幂集 𝒫(X)　[proofs/dep.powerset-outer-measure.md](../proofs/dep.powerset-outer-measure.md)

- …另有入边，续页见 [nodes/def.outer-measure.2.md](./def.outer-measure.2.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/def.outer-measure.3.md](./def.outer-measure.3.md)

refs: Halmos, Measure Theory, §11；Folland, Real Analysis, §1.4

> 说明见 `notes/def.outer-measure.md`

引用：`def.outer-measure`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
