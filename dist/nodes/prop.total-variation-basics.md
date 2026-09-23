# 全变差的基本性质　`prop.total-variation-basics`
命题：|ν(E)| ≤ |ν|(E)，且 d|ν| = |f| dμ
layer 13 · 命题 · 符号测度与分解 · 分析学

设 $\nu$ 是复测度（或符号测度），$$|\nu|$$ 是它的全变差。则

**(a)** $$|\nu(E)| \le |\nu|(E)$$ 对一切 $$E \in \mathcal{M}$$ 成立；

**(b)** 若 $$d\nu = f d\mu$$（即 $\nu \ll \mu$）则 $$d|\nu| = |f| d\mu$$，即

$$|\nu|(E) = \int_E |f| d\mu$$

## 为什么成立（入边，证明在 proofs/）
- `def.measure` 测度：用到了定义 测度　proofs/def-link.measure-totalvariation.md

refs: Folland, Real Analysis, §3.3；Rudin, Real and Complex Analysis, Ch. 6

## 说明
(b) 的证法：先取 $$\rho = |\nu_1| + |\nu_2|$$ 把 $\nu$ 的两个不同表示拉到一个共同的「基准测度」上，再用 Radon–Nikodym 与链式法则把两个密度都换到 $\rho$ 上。于是要证的就是



$$|f_1| \frac{d\mu_1}{d\rho} = |f_2| \frac{d\mu_2}{d\rho}\quad  \rho-\text{a.e.}$$



从而 $$|f_1| d\mu_1 = |f_2| d\mu_2$$ —— 说明全变差的密度与「用哪个 $\mu$ 表示 $\nu$」无关。

由此也得到一个实用的直觉：**全变差就是「把质量取绝对值之后再测一遍」**。
