# Carathéodory 定理　`thm.caratheodory`
Carathéodory 定理：μ*-可测集构成 σ-代数，μ* 在其上是完备测度
layer 14 · 定理 · 测度的构造 · 分析学

设 $\mu^{*}$ 是 $X$ 上的外测度，$\mathcal{M}$ 是全体 $\mu^{*}$-可测集。则

1. **$\mathcal{M}$ 是一个 $\sigma$代数**；
2. **$$\mu^*|_\mathcal{M}$$ 是 $(X, \mathcal{M})$ 上的一个测度**（即 $\mu^{*}$ 在 $\mathcal{M}$ 上真的可加）；
3. 这个测度是**完备**的。

## 为什么成立（入边，证明在 proofs/）
- `def.outer-measure` 外测度 + `def.caratheodory-measurable` μ*-可测集：外测度 + 可切集 ⟹ σ-代数与完备测度　proofs/imp.outer-carath.md
- `def.outer-measure` 外测度：用到了定义 外测度　proofs/def-link.outer-carath-thm.md
- `def.caratheodory-measurable` μ*-可测集：用到了定义 μ*-可测集　proofs/def-link.carathmeasurable-thm.md

## 它能推出什么 / 谁在用它
- …另有出边，续页见 `nodes/thm.caratheodory.2.md`

refs: Halmos, Measure Theory, §11；Folland, Real Analysis, Theorem 1.11

> 说明见 `notes/thm.caratheodory.md`
