# 乘积测度通常不完备　`prop.product-incomplete`
注记：μ、ν 完备时，μ × ν 常常不完备
layer 16 · 命题 · 乘积测度与 Fubini · 分析学

即使 $\mu$ 与 $\nu$ 都**完备**，$$\mu \times \nu$$ 也**经常是不完备的**：存在 $$E \in \mathcal{M} \otimes  \mathcal{N}$$ 使 $$\mu \times \nu(E) = 0$$，但 $E$ 有子集不属于 $$\mathcal{M} \otimes  \mathcal{N}$$。

## 为什么成立（入边，证明在 proofs/）
- `def.product-measure` 乘积测度：乘积测度通常不完备　proofs/imp.product-incomplete.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.fubini-complete` 完备情形的 F–T

refs: Folland, Real Analysis, §2.5

## 说明
这就是为什么必须单独有「完备情形的 $F$–$T$」：实际用的时候（比如 $\mathbb{R}^{2}$ 上的 Lebesgue 测度）我们手里的往往是**完备化之后**的测度，而不是原始的 $\mu \times \nu$。

⚠ 容易踩的坑：$\mu$、$\nu$ 都完备时 $\mu \times \nu$ 仍然可能**不完备**。
