# Young 不等式　`lem.young-inequality`
Young 不等式（a^λ · b^(1−λ) ≤ λa + (1−λ)b）
layer 13 · 引理 · L^p 空间 · 分析学

设 $a \ge 0$，$b \ge 0$，$0 < \lambda < 1$。则

$$a^{\lambda} b^{1-\lambda} \le \lambda a + (1-\lambda) b$$

## 为什么成立（入边，证明在 proofs/）
- `def.conjugate-exponents` 共轭指数：用到了定义 共轭指数　proofs/def-link.conjugate-young.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.holder` Hölder 不等式

refs: Folland, Real Analysis, §6.1

## 说明
这就是 $\log$ 的凹性（等价于指数函数的凸性）：



$$\log\!\left( \lambda a + (1-\lambda) b \right) \ge \lambda \log a + (1-\lambda) \log b$$



两边取指数即得。

引出标准特例：取 $\lambda = 1/p$、$a = |f|^p / \|f\|_p^p$、$b = |g|^q / \|g\|_q^q$，就是 **Hölder 不等式** 的证明里那一步。
