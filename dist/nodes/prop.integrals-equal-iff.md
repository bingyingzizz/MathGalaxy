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

> 说明见 `notes/prop.integrals-equal-iff.md`
