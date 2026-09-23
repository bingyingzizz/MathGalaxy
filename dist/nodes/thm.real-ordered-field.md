# ℝ 是完备有序域　`thm.real-ordered-field`
$\mathbb{R}$ 是完备有序域（确界原理）
layer 11 · 定理 · 数系的构造 · 集合论+分析学

上面构造出来的 $(\mathbb{R}, +, \cdot, \le)$ 满足三组性质：

**(i) 域公理**：$(\mathbb{R}, +, \cdot)$ 是域 —— 加减乘除（除以非零元）都封闭，且有结合、交换、分配律；

**(ii) 序公理**：$\le$ 是全序，且与运算相容：
$$a \le b \implies a + c \le b + c, \qquad a \le b,\ 0 \le c \implies ac \le bc$$

**(iii) 完备性（确界原理）**：$\mathbb{R}$ 的**每个非空有上界的子集都有上确界**。

此外 $\mathbb{Q}$ 的嵌入像在 $\mathbb{R}$ 中**稠密**。

## 为什么成立（入边，证明在 proofs/）
- `def.real` 实数系 ℝ：Cauchy 列的等价类 ⟹ 完备有序域　proofs/imp.real-ordered-field.md
- `def.ordered-field` 有序域：用到了定义 有序域　proofs/dep.ordered-realfield.md

## 它能推出什么 / 谁在用它
- ⇒ `lem.archimedean` 阿基米德性质
- ⇒ `thm.real-uncountable` ℝ 不可数

refs: Rudin, Principles of Mathematical Analysis, Ch. 1；Ch. 3

> 说明见 `notes/thm.real-ordered-field.md`
