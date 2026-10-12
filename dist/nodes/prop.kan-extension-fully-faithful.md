# 全忠实沿自身的 Kan 延拓　`prop.kan-extension-fully-faithful`
命题：$p$ 全忠实 $\implies p_{!}F \circ p \cong F$
layer 14 · 命题 · 伴随与反射 · 范畴论

设 $p : \mathcal{C} \to \mathcal{C}'$ **全忠实**、$\mathcal{D}$ 有余极限。则对每个 $F : \mathcal{C} \to \mathcal{D}$，左 Kan 延拓满足

$$p_{!}F \circ p \;\cong\; F.$$

## 为什么成立（入边，证明在 proofs/）
- `prop.kan-extension-exists` 有余极限时 Kan 延拓总存在 + `prop.kan-extension-adjoint` Kan 延拓与伴随的存在性：逐点公式 $\implies$ 全忠实时延拓回到自己　proofs/imp-link.kanex-kanff.md
- `def.kan-extension` Kan 延拓：用到了定义 Kan 延拓　proofs/def-link.kanff-kan.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.74

> 说明见 `notes/prop.kan-extension-fully-faithful.md`
