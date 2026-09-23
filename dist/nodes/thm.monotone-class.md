# 单调类定理　`thm.monotone-class`
单调类定理（Monotone Class Theorem）
layer 6 · 定理 · 集合族与 σ-代数 · 分析学

设 $\mathcal{E} \subseteq \mathcal{P}(X)$。则

$$\mathcal{M}(\mathcal{E}) = \mathfrak{m}(\mathcal{E}) \iff \forall A \in \mathcal{E} : A^c \in \mathfrak{m}(\mathcal{E})\text{ 且} \forall A, B \in \mathcal{E} : A \cup B \in \mathfrak{m}(\mathcal{E})$$

## 为什么成立（入边，证明在 proofs/）
- `def.generated-sigma` 生成的 σ-代数：用到了定义 生成的 σ-代数　proofs/def-link.generated-monotone.md
- `def.monotone-class` 单调类：用到了定义 单调类　proofs/def-link.monotone-class-thm.md
- `def.sigma-algebra` σ-代数：用到了定义 σ-代数　proofs/def-link.sigmaalgebra-monotonethm.md
- `def.generated-sigma` 生成的 σ-代数：用到了定义 生成的 σ-代数　proofs/def-link.generated-monotone-lemma.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.product-measure-sections` 乘积测度由截口给出

refs: Halmos, Measure Theory, §6；Folland, Real Analysis, Theorem 2.37

> 说明见 `notes/thm.monotone-class.md`
