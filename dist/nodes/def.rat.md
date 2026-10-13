# 有理数 ℚ　`def.rat`
有理数 $\mathbb{Q}$（由 $\mathbb{Z} \times (\mathbb{Z}\setminus\{0\})$ 构造）
layer 9 · 定义 · 数系的构造 · 集合论
[在星图里打开](../#n=def.rat)　·　[节点索引](../index.md)

在 $\mathbb{Z} \times (\mathbb{Z} \setminus \{0\})$ 上定义

$$(a, b) \sim (c, d) :\iff ad = bc$$

（直观：$(a, b)$ 代表 $a/b$；这条等价关系说的正是「分数值相同」。）令

$$\mathbb{Q} := (\mathbb{Z} \times (\mathbb{Z} \setminus \{0\})) / \sim$$

元素记作 $a/b$。运算与序：

$$\frac{a}{b} + \frac{c}{d} := \frac{ad + bc}{bd}, \qquad \frac{a}{b} \cdot \frac{c}{d} := \frac{ac}{bd}, \qquad \frac{a}{b} \le \frac{c}{d} :\iff ad \le bc \quad (b, d > 0)$$

于是 $\mathbb{Q}$ 是一个**有序域**：四则运算齐全，且与序相容。

## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/def.rat.2.md](./def.rat.2.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/def.rat.3.md](./def.rat.3.md)

refs: Kunen, Set Theory, I.5

> 说明见 `notes/def.rat.md`

引用：`def.rat`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
