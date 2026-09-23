# 生成的 σ-代数　`def.generated-sigma`
由 ℰ 生成的 σ-代数 / 单调类：ℳ(ℰ) 与 𝔪(ℰ)
layer 5 · 定义 · 集合族与 σ-代数 · 分析学

设 $\mathcal{E} \subseteq \mathcal{P}(X)$。定义

$$\mathcal{M}(\mathcal{E}) := \bigcap \{ \mathfrak{A} : \mathfrak{A}\text{ 是包含} \mathcal{E}\text{ 的} \sigma-\text{代数} \}$$
$$\mathfrak{m}(\mathcal{E}) := \bigcap \{ \mathfrak{A} : \mathfrak{A}\text{ 是包含} \mathcal{E}\text{ 的单调类} \}$$

> 陈述续见 nodes/def.generated-sigma.2.md

## 为什么成立（入边，证明在 proofs/）
- `def.sigma-algebra` σ-代数：用到了定义 σ-代数　proofs/def-link.sigmaalgebra-generated.md
- `def.power-set` 幂集 𝒫(X)：用到了定义 幂集 𝒫(X)　proofs/dep.powerset-generated-sigma.md
- `def.vs` 向量空间的基：「取一切包含它的 X 之交」——生成同一个模板　proofs/ana.generated-closure.md
- `def.monotone-class` 单调类：用到了定义 单调类　proofs/def-dep.monotone-generated-sigma.md

refs: Halmos, Measure Theory, §6；Folland, Real Analysis, §1.2

> 说明见 `notes/def.generated-sigma.md`
