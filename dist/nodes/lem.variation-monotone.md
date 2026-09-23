# T_F ± F 递增　`lem.variation-monotone`
引理：实值 BV 函数的 T_F + F 与 T_F − F 都递增
layer 15 · 引理 · 有界变差与绝对连续 · 分析学

设 $F$ 是**实值**有界变差函数。则

$$T_F + F\quad \text{ 与}\quad  T_F - F$$

都是**递增**函数。

## 为什么成立（入边，证明在 proofs/）
- `def.bounded-variation` 有界变差 BV：用到了定义 有界变差 BV　proofs/def-link.bv-jordan-lemma.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.bv-jordan` BV 的 Jordan 分解

refs: Folland, Real Analysis, Theorem 3.27

## 说明
证明：设 $x < y$，任给 $\varepsilon > 0$，取分划 $$x_0 < \cdots < x_n = x$$ 使 $$\sum|F(x_j) - F(x_{j-1})| \ge T_F(x) - \varepsilon$$，再补上点 $y$ 与 $x$ 之间的比较：



$$T_F(y) \pm  F(y) \ge \sum_j |F(x_j) - F(x_{j-1})| + (F(y) - F(x)) \pm  F(x) \ge T_F(x) - \varepsilon \pm  F(x)$$



由 $\varepsilon$ 任意即得 $$T_F(y) \pm  F(y) \ge T_F(x) \pm  F(x)$$。∎

⭐ 这条是下一条「BV 的 Jordan 分解」的全部技术内容：一旦知道 $$T_F \pm  F$$ 递增，就能把 $F$ 写成一增一减。
