# 反射子范畴里的极限　`prop.reflective-limits`
反射子范畴中的极限与余极限
layer 12 · 命题 · 伴随与反射 · 范畴论

设 $\mathcal{C}'$ 是 $\mathcal{C}$ 的反射子范畴，反射记为 $F : \mathcal{C} \to \mathcal{C}'$。若 $\mathcal{C}'$ 中的图 $D'$ 在 $\mathcal{C}$ 中有极限（余极限），则它在 $\mathcal{C}'$ 中也有：

- 余极限等于 $F\bigl(\operatorname{colim}_{\mathcal{C}} D'\bigr)$；
- 极限就等于 $\operatorname{lim}_{\mathcal{C}} D'$ 本身（它自动落在 $\mathcal{C}'$ 里）。

## 为什么成立（入边，证明在 proofs/）
- `def.limit` 极限：用到了定义 极限　proofs/def-link.limit-reflective.md
- `def.reflective-subcategory` 反射子范畴：用到了定义 反射子范畴　proofs/def-dep.reflective-limits.md

> 说明见 `notes/prop.reflective-limits.md`
