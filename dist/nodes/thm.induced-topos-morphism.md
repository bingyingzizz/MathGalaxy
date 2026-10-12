# 任意函子诱导拓扑斯态射　`thm.induced-topos-morphism`
定理：$\hat{g}_{!} \dashv \hat{g}^{-1} \dashv \hat{g}_{*}$，于是 $\hat{g}$ 是拓扑斯的态射
layer 18 · 定理 · 拓扑斯 · 范畴论

设 $g : \mathcal{C} \to \mathcal{C}'$ 是任意函子。则预复合
> 陈述续见 `nodes/thm.induced-topos-morphism.2.md`


## 为什么成立（入边，证明在 proofs/）
- `prop.kan-extension-exists` 有余极限时 Kan 延拓总存在 + `thm.presheaf-limits-colimits` 预层范畴的极限与余极限：预层范畴完备 $\implies$ 任意函子诱导拓扑斯态射　proofs/imp-link.kanex-indtop.md
- `def.topos-morphism` 拓扑斯的态射：用到了定义 拓扑斯的态射　proofs/def-link.indtop-topos.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.topos-morphism-from-object` 对象给出拓扑斯态射

refs: Le Stum, An introduction to condensed mathematics, Theorem 3.4.2, Corollary 3.4.3

> 说明见 `notes/thm.induced-topos-morphism.md`
