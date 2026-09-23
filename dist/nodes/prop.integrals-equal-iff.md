# 何时两个函数积分处处相同　`prop.integrals-equal-iff`
命题：∫_E f = ∫_E g 对一切 E ⟺ f = g a.e.
layer 15 · 命题 · 积分 · 分析学

设 $$f, g \in L^1(\mu)$$。则下列三条等价：

$$\int_E f d\mu = \int_E g d\mu\quad  \forall E \in \mathcal{M}; $$
$$\int |f - g| d\mu = 0; $$
$$f = g\quad  \mu-\text{a.e.}$$

## 为什么成立（入边，证明在 proofs/）
- `prop.integral-zero-iff` 积分为零 ⟺ 几乎处处为零：积分为零 ⟹ 用积分识别函数　proofs/imp.integrals-equal-iff.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.rn-chain-rule` RN 导数的链式法则

refs: Folland, Real Analysis, Cor. 2.23

## 说明
作用：这类命题就是「用对一切可测集的积分来**识别**函数」。

后面 Radon–Nikodym 定理的**唯一性**部分正是用的这一条 —— 两个密度给出同一个测度，就必须 a.e. 相等。

（$E$ 取遍 $\mathcal{M}$ 而不是只取 $X$，是关键：只对 $X$ 相等是不够的。）
