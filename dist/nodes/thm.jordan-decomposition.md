# Jordan 分解定理　`thm.jordan-decomposition`
Jordan 分解定理（Jordan Decomposition Theorem）
layer 17 · 定理 · 符号测度与分解 · 分析学

设 $\nu$ 是符号测度。则存在**测度** $$\mu_1, \mu_2$$ 使

$$\nu = \mu_1 - \mu_2, \quad  \mu_1 \perp  \mu_2, $$

且其中**至少一个是有限的**。这样的分解是唯一的。

具体地，取 $\nu$ 的一个 Hahn 分解 $$X = P \sqcup  N$$，令

$$\nu^+ := \nu(\cdot \cap P), \quad  \nu^- := -\nu(\cdot \cap N)$$

则 $$\nu = \nu^+ - \nu^-$$ 且 $$\nu^+ \perp  \nu^-$$。

## 为什么成立（入边，证明在 proofs/）
- `thm.hahn-decomposition` Hahn 分解定理：Hahn 分解 ⟹ Jordan 分解　proofs/imp.jordan.md
- `def.signed-measure` 符号测度：用到了定义 符号测度　proofs/def-link.signed-jordan.md
- `thm.hahn-decomposition` Hahn 分解定理：用到了定义 Hahn 分解定理　proofs/def-link.hahn-jordan.md
- `def.mutually-singular` 相互奇异：用到了定义 相互奇异　proofs/def-link.singular-jordan.md

refs: Folland, Real Analysis, Theorem 3.4

> 说明见 `notes/thm.jordan-decomposition.md`
