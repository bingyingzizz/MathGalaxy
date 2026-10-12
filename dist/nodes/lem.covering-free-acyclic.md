# 覆盖给出的自由复形零调　`lem.covering-free-acyclic`
引理：$X = (X_{i} \to X)$ 是覆盖 $\implies$ $\mathbb{Z}\cdot X_{\bullet}$ 零调
layer 19 · 引理 · 层上同调 · 同调代数

设 $\mathcal{T}$ 是拓扑斯，$X = (X_{i} \to X)_{i \in I}$ 是 $\mathcal{T}$ 中的一个**覆盖**（即 $\coprod_{i} X_{i} \to X$ 是满态射）。记它的 **Čech 脉**为
> 陈述续见 `nodes/lem.covering-free-acyclic.2.md`


## 为什么成立（入边，证明在 proofs/）
- `prop.cech-section-vanishing` 带截面的覆盖上 Čech 零调 + `thm.sheafification` 层化：有截面的 Čech 同伦 $\implies$ 任意覆盖上自由复形零调　proofs/imp-link.sect-covac.md
- `def.cech-functor` Čech 函子：用到了定义 Čech 函子　proofs/def-link.covac-cycle.md

refs: Le Stum, An introduction to condensed mathematics, Lemma 7.3.2

> 说明见 `notes/lem.covering-free-acyclic.md`
