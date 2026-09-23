# Tukey 引理　`lem.tukey`
Tukey 引理（Tukey's Lemma / Teichmüller–Tukey）
layer 9 · 引理 · 选择原理 · 序理论

设 $\mathcal{A}$ 是**具有有限特征的非空集合族**，则 $(\mathcal{A}, \subseteq )$ 有极大元。

即：存在 $A \in \mathcal{A}$，使得不存在 $B \in \mathcal{A}$ 满足 $A \subsetneq B$。

## 为什么成立（入边，证明在 proofs/）
- `thm.hausdorff` Hausdorff 极大原理：Hausdorff 极大原理 ⟺ Tukey 引理　proofs/eq.hausdorff-tukey.md
- `def.finchar` 有限特征：用到了定义 有限特征　proofs/def-link.tukey-finchar.md

## 它能推出什么 / 谁在用它
- ⟺ `thm.hausdorff` Hausdorff 极大原理

refs: Tukey (1940)；Jech, The Axiom of Choice, Ch. 2

## 说明
Tukey 引理的好处是「免验证」：只要目标族具有有限特征，就可以跳过「每个链都有上界」这一繁琐检查。

例：线性无关集族具有有限特征（$X$ 线性无关 $\iff X$ 的每个有限子集线性无关），所以「线性无关集可扩充为极大线性无关集」自动成立。

等价形式：Teichmüller (1939) 与 Tukey (1940) 都独立陈述过它。
