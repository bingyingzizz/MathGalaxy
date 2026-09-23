# 偏序集　`def.poset`
偏序集 / 全序集（Partially Ordered Set）
layer 5 · 定义 · 序结构 · 序理论

设 $\preceq$ 是集合 $A$ 上的二元关系。$\preceq$ 是 **$A$ 上的偏序**，当且仅当：

- **自反**：$\forall x \in A, x \preceq x$；
- **反对称**：$\forall x, y \in A ( x \preceq y \wedge y \preceq x \to x = y )$；
- **传递**：$\forall x, y, z \in A ( x \preceq y \wedge y \preceq z \to x \preceq z )$。

> 陈述续见 nodes/def.poset.2.md

## 为什么成立（入边，证明在 proofs/）
- `def.rel` 关系：用到了定义 关系　proofs/def-dep.rel-poset.md

## 它能推出什么 / 谁在用它
- 被 `def.ordered-field` 有序域 用
- 被 `def.order-iso` 序同构 用
- 被 `def.chain` 链 用
- 被 `def.bound` 上界与极大元 用
- 被 `def.wellorder` 良序集 用
- 被 `def.finchar` 有限特征 用
- 被 `lem.zorn` 佐恩引理 用
- 被 `thm.hausdorff` Hausdorff 极大原理 用
- 被 `def.real` 实数系 ℝ 用

refs: Kunen, Set Theory, I.11；Davey & Priestley, Introduction to Lattices and Order

> 说明见 `notes/def.poset.md`
