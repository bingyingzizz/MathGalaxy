# 简单函数　`def.simple-function`
简单函数（Simple Function）
layer 6 · 定义 · 可测函数与收敛 · 分析学

可测函数 $$\varphi : X \to \mathbb{C}$$ 是**简单函数**，当且仅当它只取**有限多个值**。等价地，它可以写成

$$\varphi = \sum_{j=1}^{n} a_j \chi_{E_j}$$

其中 $$a_j \in \mathbb{C}$$，$$E_j = \varphi^{-1}(\{a_j\}) \in \mathcal{M}$$ 两两不交。

## 为什么成立（入边，证明在 proofs/）
- `def.measurable-function` 可测函数：用到了定义 可测函数　proofs/def-link.measurable-simple.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.measurable-closure` 可测函数的封闭性
- 被 `thm.simple-approximation` 简单函数逼近 用
- 被 `def.integral-simple` 简单函数的积分 用
- 被 `thm.approximation-L1` L¹ 里的逼近 用
- 被 `prop.simple-integral-props` 简单函数积分的性质 用
- 被 `prop.dense-simple-compact-support` 紧支简单函数稠密 用

refs: Folland, Real Analysis, §2.2

## 说明
简单函数就是可测版本的「阶梯函数」—— 有限个「台阶」。

它是整个积分理论的**起点**：先给简单函数定义积分（就是加权和），再用「简单函数从下面逼近」把积分推广到一切非负可测函数。
