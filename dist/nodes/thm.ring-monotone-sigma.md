# 环 → σ-环 的判据　`thm.ring-monotone-sigma`
定理：环是 σ-环 ⟺ 它是单调类 ⟺ 它对可数不交并封闭
layer 5 · 定理 · 集合族与 σ-代数 · 分析学

设 $\mathfrak{A}$ 是一个**环**。则下列三条等价：

$$\mathfrak{A}\text{ 是} \sigma-\text{环} \iff \mathfrak{A}\text{ 是单调类} \iff \mathfrak{A}\text{ 对可列不交并封闭}$$

## 为什么成立（入边，证明在 proofs/）
- `def.set-ring+def.monotone-class` def.set-ring+def.monotone-class：环 + 单调类 ⟹ σ-环　proofs/imp.ring-monotone-sigma.md
- `def.set-ring` 环与代数：用到了定义 环与代数　proofs/def-link.ring-monotone-thm.md
- `def.monotone-class` 单调类：用到了定义 单调类　proofs/def-link.monotone-thm.md
- `def.sigma-algebra` σ-代数：用到了定义 σ-代数　proofs/def-link.sigmaalgebra-ringmonotone.md

refs: Halmos, Measure Theory, §6

## 说明
注意前提「$\mathfrak{A}$ 是环」不可省 —— 单调类一般不封闭于有限并，所以单调类本身推不出 $\sigma$环。

这条定理是单调类定理的技术核心：正是因为它，才能把「对 $\sigma$代数成立」化归为「先验证一个环，再看单调极限」。
