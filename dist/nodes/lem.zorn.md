# 佐恩引理　`lem.zorn`
佐恩引理（Zorn's Lemma）
layer 9 · 引理 · 选择原理 · 序理论+集合论

设 $(P, \preceq )$ 是**非空**偏序集。若 $P$ 的每个链在 $P$ 中都有上界，则 $P$ 有**极大元**。

$$P \ne \emptyset \wedge  ( \forall C \subseteq P, C\text{ 是链} \to \exists u \in P, u\text{ 是} C\text{ 的上界} ) \implies \exists m \in P, m\text{ 是极大元}$$

## 为什么成立（入边，证明在 proofs/）
- `ax.choice+thm.hartogs` ax.choice+thm.hartogs：选择公理 + Hartogs 定理 ⟹ 佐恩引理（路线 1⟹2）　proofs/imp.hartogs-zorn.md
- `thm.wellordering` 良序定理：良序定理 ⟺ 佐恩引理　proofs/eq.wo-zorn.md
- `thm.hausdorff` Hausdorff 极大原理：佐恩引理 ⟺ Hausdorff 极大原理　proofs/eq.zorn-hausdorff.md
- `def.poset` 偏序集：用到了定义 偏序集　proofs/def-link.zorn-poset.md
- `def.chain` 链：用到了定义 链　proofs/def-link.zorn-chain.md
- `def.bound` 上界与极大元：用到了定义 上界与极大元　proofs/def-link.zorn-bound.md
- …另有 1 条入边

refs: Zorn (1935)；Kunen, Set Theory, I.12

> 说明见 `notes/lem.zorn.md`
