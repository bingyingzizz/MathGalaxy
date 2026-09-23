# 复函数的积分　`def.integral-complex`
复值函数的积分：正负部相减
layer 17 · 定义 · 积分 · 分析学

设 $$f : X \to \overline{\mathbb{R}}$$ 可测，记正部与负部

$$f^+ = \max_{f, 0}, \quad  f^- = \max_{-f, 0}$$

（两者都属于 $L^{+}$，且 $$f = f^+ - f^-$$、$$|f| = f^+ + f^-$$。）若 $$\int f^+$$ 与 $$\int f^-$$ 中**至少一个有限**，定义

$$\int f := \int f^+ - \int f^-$$
> 陈述续见 `nodes/def.integral-complex.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.lplus` L⁺：用到了定义 L⁺　proofs/def-link.lplus-complex.md
- `def.complex` 复数 ℂ：用到了定义 复数 ℂ　proofs/dep.complex-integral-complex.md
- `def.integral-nonneg` 非负函数的积分：用到了定义 非负函数的积分　proofs/def-dep.nonneg-integral-complex.md

## 它能推出什么 / 谁在用它
- 被 `prop.integral-abs-ineq` 积分绝对值不等式 用
- 被 `def.integrable` 可积 / L¹ 用
- 被 `def.duality-map` 对偶配对 φ_g 用

refs: Folland, Real Analysis, §2.3

> 说明见 `notes/def.integral-complex.md`
