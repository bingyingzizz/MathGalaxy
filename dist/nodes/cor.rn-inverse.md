# 互为绝对连续时导数互逆　`cor.rn-inverse`
推论：μ ≪ λ 且 λ ≪ μ ⟹ (dμ/dλ)(dλ/dμ) = 1
layer 17 · 推论 · 符号测度与分解 · 分析学

若 $$\mu \ll  \lambda$$ 且 $$\lambda \ll  \mu$$（两个 $\sigma$有限测度互为绝对连续），则

$$\frac{d\mu}{d\lambda} \cdot \frac{d\lambda}{d\mu} = 1\quad  \text{a.e.}$$

## 为什么成立（入边，证明在 proofs/）
- `def.rn-derivative` RN 导数与 Lebesgue 分解：用到了定义 RN 导数与 Lebesgue 分解　proofs/def-link.rn-derivative-inverse.md
- `def.absolute-continuity` 绝对连续：用到了定义 绝对连续　proofs/def-link.ac-rn-inverse.md

refs: Folland, Real Analysis, Theorem 3.9

## 说明
两条链式法则一拼：$$d\mu / d\mu = \frac{d\mu}{d\lambda}\cdot\frac{d\lambda}{d\mu}$$，而 $$d\mu / d\mu \equiv  1$$。
