# (L^p)* ≅ L^q　`thm.riesz-representation-lp`
定理（Riesz 表示）：$1 < p < \infty$ 时 $(L^p)^{*} \cong L^q$
layer 22 · 定理 · L^p 空间 · 分析学
[在星图里打开](../#n=thm.riesz-representation-lp)　·　[节点索引](../index.md)

设 $1 < p < \infty$，$q$ 是共轭指数。则对每个 $\Phi \in (L^p)^*$，存在**唯一**（a.e.）的 $g \in L^q$ 使

$$
\Phi(f) = \int f g \, d\mu \qquad \forall f \in L^p
$$

于是映射 $g \mapsto \varphi_g$ 是 $L^q$ 到 $(L^p)^*$ 的**等距同构**：

$$(L^p)^* \cong L^q$$

特别地，$p = 2$ 时 $L^2$ 自对偶。

## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/thm.riesz-representation-lp.2.md](./thm.riesz-representation-lp.2.md)

refs: Folland, Real Analysis, Theorem 6.15

> 说明见 `notes/thm.riesz-representation-lp.md`

引用：`thm.riesz-representation-lp`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
