# 简单函数的积分　`def.integral-simple`
简单函数的积分：加权和
layer 13 · 定义 · 积分 · 分析学

设 $$\varphi \in L^+$$ 是简单函数，写成标准形式

$$\varphi = \sum_{j=1}^{n} a_j \chi_{E_j}, \quad  a_j \ge 0, E_j \in \mathcal{M}\text{ 两两不交}$$

则定义

$$\int \varphi d\mu := \sum_{j=1}^{n} a_j \mu(E_j)$$

## 为什么成立（入边，证明在 proofs/）
- `def.simple-function` 简单函数：用到了定义 简单函数　proofs/def-link.simple-integral-def.md
- `def.measure` 测度：用到了定义 测度　proofs/def-dep.measure-integral-simple.md

## 它能推出什么 / 谁在用它
- 被 `def.integral-nonneg` 非负函数的积分 用
- 被 `prop.simple-integral-props` 简单函数积分的性质 用

refs: Folland, Real Analysis, §2.2

## 说明
这就是「面积 $=$ 各层高度 $\times$ 各层测度」—— 完全照着 Riemann 和的样子写，只是把区间换成了可测集。

要检查**良定义**：同一个 $\varphi$ 可以写成不同的标准形式（比如把某个 $E_{j}$ 再拆开），但由 $\mu$ 的有限可加性，结果一样。

约定 $$0 \cdot \infty = 0$$：这一步很关键 —— 它让「在无穷测度集上取 0 的函数」积分为 0，符合直觉。
