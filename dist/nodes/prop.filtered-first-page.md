# 过滤复形的第一页　`prop.filtered-first-page`
命题：$E^{1}_{p,q} = H^{p+q}(\operatorname{Gr}^{p}K^{\bullet})$
layer 18 · 命题 · 过滤与谱序列 · 同调代数

设
> 陈述续见 `nodes/prop.filtered-first-page.2.md`


## 为什么成立（入边，证明在 proofs/）
- `thm.filtered-complex-spectral` 过滤复形给出谱序列：下有界过滤复形给出谱序列 $\implies$ 第一页是分次片的同调　proofs/imp-link.filteredss-firstpage.md
- `def.filtration` 过滤：用到了定义 过滤　proofs/def-link.firstpage-filtered.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.31

## 说明
**证明。** 由 $E^{0}_{p,q} = \operatorname{Gr}^{p}K^{p+q}$ ✓，而第 $0$ 页的微分 $d_{0}$ 是过滤商上诱导的微分（也就是 $K^{\bullet}$ 的微分下到分次片上）✓；取同调即得 $E^{1}_{p,q} = H^{p+q}(\operatorname{Gr}^{p}K^{\bullet})$ ✓。∎
