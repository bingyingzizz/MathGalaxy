# 一次 Čech 就是一次上同调　`prop.cech-h1-equals-h1`
命题：$\check{H}^{1}(X, M) \cong H^{1}(X, M)$
layer 20 · 命题 · 层上同调 · 同调代数

设 $\mathcal{C}$ 是有纤维积的 site、$X \in \mathcal{C}$、$M$ 是阿贝尔层。则

$$\check{H}^{1}(X,\ M) \;\cong\; H^{1}(X,\ M).$$

## 为什么成立（入边，证明在 proofs/）
- `cor.cech-cohomology-spectral` Čech 到上同调的谱序列 + `prop.cech-higher-cohomology-presheaf` 高次上同调预层没有 Čech 上同调 + `prop.five-term-spectral-sequence` 谱序列的五项正合列：Čech 到上同调谱序列 + 高次预层为零 $\implies$ 一次 Čech 就是一次上同调　proofs/imp-link.cechhigher-h1.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.48

> 说明见 `notes/prop.cech-h1-equals-h1.md`
