# 预层　`def.presheaf`
预层（Presheaf）
layer 9 · 定义 · 预层与米田 · 范畴论

范畴 $\mathcal{C}$ 上的**（集合值）预层**是函子

$$T : \mathcal{C}^{\mathrm{op}} \longrightarrow \mathbf{Set}$$

预层之间的**态射**就是它们之间的自然变换。记法：对态射 $f : Y \to X$ 记 $f^{-1} = T(f) : T(X) \to T(Y)$；对 $s \in T(X)$ 记 $s|_Y = f^{-1}(s)$。

## 为什么成立（入边，证明在 proofs/）
- `def.functor` 函子：用到了定义 函子　proofs/def-dep.functor-presheaf.md
- `def.category` 范畴：用到了定义 范畴　proofs/def-dep.category-presheaf.md

## 它能推出什么 / 谁在用它
- 被 `prop.constant-sheaf-preserves-limits` 常层函子保极限 用
- 被 `prop.presheaf-representable-acyclic` 预层在可表示对象上没有高次上同调 用
- 被 `thm.presheaf-limits-colimits` 预层范畴的极限与余极限 用
- 被 `def.associated-sheaf` 关联层 用

- …另有出边，续页见 `nodes/def.presheaf.2.md`

refs: Le Stum, An introduction to condensed mathematics, §1.1–1.5

> 说明见 `notes/def.presheaf.md`
