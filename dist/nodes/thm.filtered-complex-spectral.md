# 过滤复形给出谱序列　`thm.filtered-complex-spectral`
下有界过滤复形 $\implies$ 谱序列
layer 17 · 定理 · 过滤与谱序列 · 同调代数

设 $K^{\bullet}$ 是**带过滤**的复形（递降过滤 $F^{p}K^{\bullet}$），且**下有界**（对每个 $n$，$p \ll 0$ 时 $F^{p}K^{n} = K^{n}$）。则存在谱序列
> 陈述续见 `nodes/thm.filtered-complex-spectral.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.filtration` 过滤：用到了定义 过滤　proofs/def-dep.filtss-filtration.md
- `def.spectral-sequence` 谱序列：用到了定义 谱序列　proofs/def-dep.filtss-ss.md
- `def.cochain-complex` 上链复形：用到了定义 上链复形　proofs/def-dep.filtss-complex.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.bicomplex-spectral` 双复形给出谱序列

refs: Le Stum, Theorem 7.2.16；Weibel, An Introduction to Homological Algebra, 5.4.1

> 说明见 `notes/thm.filtered-complex-spectral.md`
