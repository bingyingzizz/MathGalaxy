# 极大定理　`thm.maximal-theorem`
极大定理（弱 (1,1) 不等式）
layer 20 · 定理 · 微分定理 · 分析学

存在常数 $$C > 0$$（只依赖维数 $n$），使对一切 $$f \in L^1$$ 与一切 $$\alpha > 0$$：

$$m(\{x : Hf(x) > \alpha\}) \le (C/\alpha)\cdot\int |f(x)| dx$$

## 为什么成立（入边，证明在 proofs/）
- `lem.covering+def.maximal-function` lem.covering+def.maximal-function：覆盖引理 ⟹ 极大定理　proofs/imp.maximal-theorem.md
- `def.maximal-function` 极大函数：用到了定义 极大函数　proofs/def-link.maximal-theorem-lm.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.lebesgue-differentiation` Lebesgue 微分定理

refs: Folland, Real Analysis, Theorem 3.17

## 说明
这叫**弱 (1,1) 型**不等式：不能保证 $$Hf \in L^1$$（事实上一般不是），但能保证它的**分布函数**被 $$1/\alpha$$ 控制。

在 $\mathbb{R}^{n}$ 里 $$C = 3^n$$（这正是覆盖引理里那个膨胀因子）。

⭐ 它的角色：**「平均值的例外集是小的」** —— 于是一切逐点收敛问题都可以用「例外集测度 $\to 0$」来解决。
