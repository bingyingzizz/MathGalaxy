# 等势　`def.equinumerous`
等势（Equinumerous）
layer 7 · 定义 · 基数与等势 · 集合论

集合 $A$ 与 $B$ **等势**（记 $|A| = |B|$ 或 $A \approx B$），当且仅当存在**双射**

$$f : A \to B$$

「等势」是集合之间的一种等价关系：自反（恒等映射）、对称（逆映射）、传递（合成）。

## 为什么成立（入边，证明在 proofs/）
- `def.bijection` 单射 / 满射 / 双射：用到了定义 单射 / 满射 / 双射　proofs/dep.bijection-equinumerous.md

## 它能推出什么 / 谁在用它
- 被 `def.cardinal` 基数 |A| 用
- 被 `def.countable` 可数与不可数 用

refs: Kunen, Set Theory, I.6

## 说明
⭐ 这是**比较大小的正确方式**：不去数个数（无限集数不完），而是问「能不能一一配对」。

经典结果：
- $\mathbb{N}$ 与 $\mathbb{Q}$、$\mathbb{N} \times \mathbb{N}$ 都等势（可数）；
- $(0, 1)$ 与 $\mathbb{R}$ 等势（$x \mapsto \tan \pi(x - 1/2)$ 之类）；
- $\mathbb{N}$ 与 $\mathbb{R}$ **不等势**（Cantor 定理）。

⚠ $A \subseteq B$ 与「等势」无关：$\mathbb{N} \subsetneq \mathbb{Q}$ 但两者等势 —— 这正是无限集与有限集的分界（Dedekind 的刻画：与某个真子集等势 $\iff$ 无限）。
