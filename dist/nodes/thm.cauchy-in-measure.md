# 依测度 Cauchy ⟹ 收敛　`thm.cauchy-in-measure`
定理：依测度 Cauchy 列必有依测度极限，且有一子列 a.e. 收敛
layer 14 · 定理 · 可测函数与收敛 · 分析学

若 $$\{f_n\}$$ 依测度 Cauchy，则存在可测函数 $$f$$ 使

$$f_n \to f\text{ 依测度}, $$

并且存在**子列** $$\{f_{n_j}\}$$ 使

$$f_{n_j} \to f\quad  \text{a.e.}$$

## 为什么成立（入边，证明在 proofs/）
- `def.cauchy-in-measure` 依测度 Cauchy：依测度 Cauchy ⟹ 依测度收敛且有一子列 a.e. 收敛　proofs/imp.cauchy-in-measure.md
- `def.cauchy-in-measure` 依测度 Cauchy：用到了定义 依测度 Cauchy　proofs/def-link.cauchy-thm.md

refs: Folland, Real Analysis, Theorem 2.30

## 说明
⭐ 这是「依测度收敛」最有用的性质：**收敛本身不保证任何一处真的收敛，但总能抽出一列几乎处处收敛的子列**。

证明的工具是 Borel–Cantelli 型的推理：造出 $$\sum_k \mu(E_k) < \infty$$ 的一族「坏集合」，则几乎每个点只落进有限多个坏集合。

这也是 Riesz 定理（a.e. 收敛 $\iff$ 依测度收敛 + 子列）的那一半。
