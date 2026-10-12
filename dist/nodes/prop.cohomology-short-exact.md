# 同调的两条正合列　`prop.cohomology-short-exact`
命题：$0 \to H^{k} \to \operatorname{coker} d^{k-1} \to Z^{k+1} \to H^{k+1} \to 0$
layer 17 · 命题 · 复形与导出三角 · 同调代数

设 $\mathcal{A}$ 是阿贝尔范畴，$K^{\bullet}$ 是 $\mathcal{A}$ 中的上链复形。记 $Z^{k} := \ker d^{k}$（**闭链**）、$B^{k} := \operatorname{im} d^{k-1}$（**上边缘**），于是 $H^{k} = Z^{k}/B^{k}$。则对每个 $k$ 有处处正合的列
> 陈述续见 `nodes/prop.cohomology-short-exact.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.cohomology` 同调：用到了定义 同调　proofs/def-link.hseq-cohomology.md
- `def.abelian-category` 加法 / 阿贝尔范畴：用到了定义 加法 / 阿贝尔范畴　proofs/def-link.hseq-abelian.md

refs: Le Stum, An introduction to condensed mathematics, §7.1

> 说明见 `notes/prop.cohomology-short-exact.md`
