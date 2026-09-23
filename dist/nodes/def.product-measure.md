# 乘积测度　`def.product-measure`
乘积测度（Product Measure μ × ν）
layer 15 · 定义 · 乘积测度与 Fubini · 分析学

设 $(X, \mathcal{M}, \mu )$ 与 $(Y, \mathcal{N}, \nu )$ 是测度空间。

**① 矩形**：形如 $$A \times B$$（$$A \in \mathcal{M}$$，$$B \in \mathcal{N}$$）的集合叫（可测）矩形。全体矩形**生成** $$\mathcal{M} \otimes  \mathcal{N}$$。

**② 矩形上的预测度**：令 $\mathcal{A}$ 为**矩形的有限不交并**全体。对

$$E = \bigsqcup_{j=1}^{n} (A_j \times B_j)$$

定义

> 陈述续见 nodes/def.product-measure.2.md

## 为什么成立（入边，证明在 proofs/）
- `def.premeasure+thm.caratheodory` def.premeasure+thm.caratheodory：矩形上的预测度 ⟹ Carathéodory 扩张得到乘积测度　proofs/imp.product-measure.md
- `def.premeasure` 预测度：用到了定义 预测度　proofs/def-link.productmeasure-premeasure.md
- `def.product-sigma` 积 σ-代数：用到了定义 积 σ-代数　proofs/def-link.productmeasure-sigma.md
- …另有 2 条入边

refs: Folland, Real Analysis, §2.5；Halmos, Measure Theory, §35

> 说明见 `notes/def.product-measure.md`
