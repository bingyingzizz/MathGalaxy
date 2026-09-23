# L^q 落在 L^p + L^r 里　`prop.lq-in-lp-plus-lr`
命题：L^q ⊆ L^p + L^r（0 < p < q < r ≤ ∞）
layer 16 · 命题 · L^p 空间 · 分析学

设 $0 < p < q < r \le \infty$。则

$$L^q \subseteq L^p + L^r$$

（右边理解为 $\{ g + h : g \in L^p,\ h \in L^r \}$。）

## 为什么成立（入边，证明在 proofs/）
- `def.lp-norm` L^p 范数：用到了定义 L^p 范数　proofs/def-link.lp-norm-lq-sum.md

refs: Folland, Real Analysis, Prop. 6.4

## 说明
证明：取 $f \in L^q$，按「大」与「小」把它切开 ——



$$E := \{\, x : |f(x)| > 1 \,\}, \qquad g := f \chi_E, \qquad h := f \chi_{E^c}$$



则



$$|g|^p = |f|^p \chi_E \le |f|^q \chi_E, \qquad |h|^r = |f|^r \chi_{E^c} \le |f|^q \chi_{E^c}$$



（第二式用到 $|f| \le 1$ 在 $E^c$ 上成立。）于是 $g \in L^p$、$h \in L^r$。$r = \infty$ 时 $\|h\|_\infty \le 1$，显然。∎

⭐ 这条说的是：**中间的 $L^q$ 可以被两端的 $L^p$ 与 $L^r$ 分担** —— 「大的部分」交给小的指数管，「小的部分」交给大的指数管。
