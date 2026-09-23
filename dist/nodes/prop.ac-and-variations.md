# 绝对连续与变差　`prop.ac-and-variations`
命题：ν ≪ μ ⟺ |ν| ≪ μ ⟺ ν⁺、ν⁻ ≪ μ；ν ⊥ μ 且 ν ≪ μ ⟹ ν = 0
layer 18 · 命题 · 符号测度与分解 · 分析学

设 $\mu$ 是测度，$\nu$ 是符号测度。则

$$\nu \ll  \mu \iff |\nu| \ll  \mu \iff \nu^+ \ll  \mu\text{ 且} \nu^- \ll  \mu$$

并且：若同时有 $$\nu \perp  \mu$$ 与 $$\nu \ll  \mu$$，则 $$\nu = 0$$。

## 为什么成立（入边，证明在 proofs/）
- `thm.jordan-decomposition` Jordan 分解定理：用到了定义 Jordan 分解定理　proofs/def-link.variations-ac.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.lebesgue-radon-nikodym` Lebesgue–Radon–Nikodym 定理

refs: Folland, Real Analysis, Prop. 3.5

## 说明
后半句「既奇异又绝对连续 $\implies$ 等于零」是结构定理的**起始点**：Radon–Nikodym 要说的正是「一般情形下 $\nu$ 就是这两部分之和」。

证明：若 $\nu \perp \mu$，取 $E$（$\mu$零）与 $F$（$\nu$零）划分空间；由 $\nu \ll \mu$ 得 $\nu (E) = 0$；又 $\nu (F) = 0$，故 $\nu$ 在整个 $X$ 上为 0。
