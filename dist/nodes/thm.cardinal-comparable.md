# 基数可比定理　`thm.cardinal-comparable`
基数可比定理（需要选择公理）
layer 10 · 定理 · 基数与等势 · 集合论

在**选择公理**下：对任意两个集合 $A$、$B$，必有

$$|A| \le |B| \quad \text{或} \quad |B| \le |A|$$

即任意两个基数都可以比较大小。

## 为什么成立（入边，证明在 proofs/）
- `thm.wellordering` 良序定理：良序定理 ⟹ 任意两个基数可比　proofs/imp.cardinal-comparable.md
- `def.cardinal` 基数 |A|：用到了定义 基数 |A|　proofs/dep.cardinal-comparable-thm.md
- `def.ordinal` 序数：用到了定义 序数　proofs/def-link.ordinal-cardinal-comparable.md

refs: Jech, The Axiom of Choice, Ch. 3

## 说明
⭐ 这条是「基数排序」的许可证：没有它，连「$A$ 比 $B$ 大」这句话都可能毫无意义。

证明路线（见边）：**良序定理**把 $A$、$B$ 都良序化 $\to$ 对应的序数可以比较 $\to$ 于是有一个方向能放进单射。所以这条定理与 AC、良序定理是同一件事的三种说法。

⚠ 没有 AC 时确实有不可比的基数（Jech, *The Axiom of Choice*）。
