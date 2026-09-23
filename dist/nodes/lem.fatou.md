# Fatou 引理　`lem.fatou`
Fatou 引理（Fatou's Lemma）
layer 16 · 引理 · 积分 · 分析学

设 $$\{f_n\} \subseteq L^+$$，则

$$\int \liminf_{n\to\infty} f_n \le \liminf_{n\to\infty} \int f_n$$

## 为什么成立（入边，证明在 proofs/）
- `thm.mct` 单调收敛定理：MCT ⟹ Fatou 引理　proofs/imp.fatou.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.dct` 控制收敛定理

refs: Folland, Real Analysis, Theorem 2.18

## 说明
⚠ 注意不等号方向：**下面的**极限在积分外面，得到的**不大于**积分的下极限。也就是说「取极限」会让积分**变小**，不会变大。

这是 MCT 去掉单调性后剩下的东西 —— 单调性一旦丢掉，等号就退化成不等式。

反向的例子：$$f_n = \chi_{[n, n+1]}$$（在 $\mathbb{R}$ 上），则每个 $\int f_{n} = 1$ 但 $\int \liminf f_{n} = 0$。
