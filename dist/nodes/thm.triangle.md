# 三角不等式　`thm.triangle`
三角不等式 $|x + y| \le |x| + |y|$
layer 9 · 定理 · 数系的构造 · 集合论+分析学

设 $K$ 是有序域（如 $\mathbb{Q}$、$\mathbb{R}$），$x, y \in K$。则

$$|x + y| \le |x| + |y|$$

并且由此得到两个常用的变形：

$$\big| |x| - |y| \big| \le |x - y|, \qquad |x_1 + x_2 + \cdots + x_n| \le |x_1| + |x_2| + \cdots + |x_n|$$

（后者由前者对 $n$ 归纳。）

## 为什么成立（入边，证明在 proofs/）
- `def.abs` 绝对值 |x|：绝对值的定义 ⟹ 三角不等式　proofs/imp.triangle.md
- `def.ordered-field` 有序域：用到了定义 有序域　proofs/dep.ordered-triangle.md

refs: Rudin, Principles of Mathematical Analysis, Ch. 1

## 说明
⭐ 这是**一切估计的起点**：Cauchy 列的线性运算、极限的四则运算、级数的比较判别法、距离空间里那条 $d(x, z) \le d(x, y) + d(y, z)$，归根到底都是它（距离空间那条是把它**取作公理**）。

⚠ 证明只有分情形，没有任何技巧 —— 但**「$a \le |a|$ 且 $-a \le |a|$」这两句是全部的关键**：由它得 $-(|x| + |y|) \le x + y \le |x| + |y|$，而 $|t| \le c \iff -c \le t \le c$（$c \ge 0$）。
