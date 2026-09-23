# 序数可比　`thm.ordinal-trichotomy`
序数的三歧性：$\in$ 在 $\mathrm{On}$ 上是良序
layer 8 · 定理 · 序数与超限 · 集合论

对任意两个序数 $\alpha, \beta$，下式**恰有一个**成立：

$$\alpha \in \beta, \qquad \alpha = \beta, \qquad \beta \in \alpha$$

特别地，$\in$ 在序数全体上是**良序**：任意非空的一族序数都有最小元。

## 为什么成立（入边，证明在 proofs/）
- `def.ordinal+ax.found` def.ordinal+ax.found：序数的定义 ⇒ 三歧性　proofs/imp.ordinal-trichotomy.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.wellorder-ordinal` 良序集的序型
- ⇒ `thm.burali-forti` 序数全体是真类

refs: Kunen, Set Theory, I.11

## 说明
⭐ 三歧性使序数可以当「坐标」用：任意两个**良序集**的序型一定可比，而且**不需要选择公理**。

⚠ 这与「任意两个**基数**可比」完全是两件事，后者要用 AC（见「基数可比定理」）。差别在于序数**自带**一个良序 —— 就是 $\in$；而一般的集合没有先验的良序，要给它找一个，那正是良序定理（$\iff$ 选择公理）的内容。
