# 谱序列的退化行　`prop.spectral-degenerate-row`
命题：只有 $p = 0$ 那一行时 $E^{0,q} \cong H^{q}$
layer 17 · 命题 · 过滤与谱序列 · 同调代数

设 $E^{p,q}_{r} \implies H^{p+q}$ 是**第一象限**谱序列。若对某个 $r \ge 1$ 有

$$p \ne 0 \implies E^{p,q}_{r} = 0 \qquad (\forall q),$$

则对一切 $q$：$E^{0,q}_{r} \cong H^{q}$。

## 为什么成立（入边，证明在 proofs/）
- `def.spectral-sequence` 谱序列：用到了定义 谱序列　proofs/def-link.degrow-ss.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.five-term-spectral-sequence` 谱序列的五项正合列

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.29

> 说明见 `notes/prop.spectral-degenerate-row.md`
