# 整数 ℤ　`def.int`
整数 $\mathbb{Z}$（由 $\mathbb{N} \times \mathbb{N}$ 构造）
layer 8 · 定义 · 数系的构造 · 集合论
[在星图里打开](../#n=def.int)　·　[节点索引](../index.md)

在 $\mathbb{N} \times \mathbb{N}$ 上定义

$$(a, b) \sim (c, d) :\iff a + d = b + c$$

（直观：$(a, b)$ 代表 $a - b$；这条等价关系说的正是「差相同」。）它确实是一个等价关系。令

$$\mathbb{Z} := (\mathbb{N} \times \mathbb{N}) / \sim$$

元素记作 $[a, b]$（即 $a - b$）。$\mathbb{Z}$ 上的**运算与序**（都要先验证与代表元无关）：

$$[a, b] + [c, d] := [a + c,\ b + d]$$
$$[a, b] \cdot [c, d] := [ac + bd,\ ad + bc]$$
$$[a, b] \le [c, d] :\iff a + d \le b + c$$

其中加法与序来自 $\mathbb{N}$ 的加法与序，乘法的写法是照着 $(a - b)(c - d) = ac + bd - (ad + bc)$ 抄的。

## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/def.int.2.md](./def.int.2.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/def.int.3.md](./def.int.3.md)

refs: Kunen, Set Theory, I.5

> 说明见 `notes/def.int.md`

引用：`def.int`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
