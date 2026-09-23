# 良序集的序型　`thm.wellorder-ordinal`
每个良序集序同构于唯一的序数
layer 9 · 定理 · 序数与超限 · 集合论

设 $(W, \preceq )$ 是**良序集**。则存在**唯一**的序数 $\alpha$，使 $(W, \preceq )$ 与 $(\alpha, \in)$ **序同构**。这个 $\alpha$ 称为 $W$ 的**序型**，记作 $\mathrm{ot}(W) = \alpha$。

## 为什么成立（入边，证明在 proofs/）
- `thm.recursion-wellorder+ax.repl+ax.found+thm.ordinal-trichotomy` thm.recursion-wellorder+ax.repl+ax.found+thm.ordinal-trichotomy：递归定理 + 替换公理 ⇒ 每个良序集有唯一序型　proofs/imp.wellorder-ordinal.md

refs: Kunen, Set Theory, I.11；Jech, Set Theory, 2.3

## 说明
⭐⭐ 这一条就是「序数」这个东西真正被**造出来**的地方：序数不是先验摆在那里的，它由「每个良序集对应的那个规范良序集」给出 —— 而那个规范集是由**递归定理**一步步算出来的。

⭐ 于是「$W$ 有多长」变成「$\mathrm{ot}(W)$ 是哪个序数」，两个良序集比长短变成比 $\in$ —— 这就是三歧性的用处。

⚠ **唯一性**这一半要用到三歧性：两个序数若互相序同构，就必须相等。
