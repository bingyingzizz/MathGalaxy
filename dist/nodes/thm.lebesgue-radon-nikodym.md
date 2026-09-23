# Lebesgue–Radon–Nikodym 定理　`thm.lebesgue-radon-nikodym`
Lebesgue–Radon–Nikodym 定理：ν = λ + ρ，λ ⊥ μ，ρ ≪ μ
layer 19 · 定理 · 符号测度与分解 · 分析学

设 $\nu$ 是 **$\sigma$有限**符号测度、$\mu$ 是 **$\sigma$有限**正测度，都在 $(X, \mathcal{M})$ 上。则存在**唯一**的一对 $\sigma$有限符号测度 $\lambda$、$\rho$ 使

$$\lambda \perp  \mu, \quad  \rho \ll  \mu, \quad  \nu = \lambda + \rho$$

且 $$\rho$$ 可以写成积分：存在广义 $\mu$可积函数 $$f$$ 使

$$d\rho = f d\mu$$

任何两个这样的 $$f$$ 都在 $\mu -\text{a.e.}$ 意义下相等。

## 为什么成立（入边，证明在 proofs/）
- `lem.singular-or-lower-bound+thm.mct+prop.ac-and-variations` lem.singular-or-lower-bound+thm.mct+prop.ac-and-variations：「要么奇异、要么有下界」⟹ Lebesgue–Radon–Nikodym　proofs/imp.lebesgue-rn.md
- `def.absolute-continuity` 绝对连续：用到了定义 绝对连续　proofs/def-link.ac-rn.md
- `def.mutually-singular` 相互奇异：用到了定义 相互奇异　proofs/def-link.singular-rn.md

refs: Folland, Real Analysis, Theorem 3.8

> 说明见 `notes/thm.lebesgue-radon-nikodym.md`
