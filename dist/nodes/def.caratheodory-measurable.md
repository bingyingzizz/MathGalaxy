# μ*-可测集　`def.caratheodory-measurable`
Carathéodory 可测性（μ*-Measurable Set）
layer 13 · 定义 · 测度的构造 · 分析学

设 $\mu^{*}$ 是 $X$ 上的外测度。$A \subseteq X$ 称为 **$\mu^{*}$-可测的**，当且仅当 $A$ 把每个集合都「干净地切成两块」：

$$\mu^*(E) = \mu^*(E \cap A) + \mu^*(E \cap A^c)\quad  \forall E \subseteq X$$

## 为什么成立（入边，证明在 proofs/）
- `def.outer-measure` 外测度：用到了定义 外测度　proofs/def-dep.outer-carath.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.caratheodory` Carathéodory 定理
- 被 `thm.caratheodory` Carathéodory 定理 用

refs: Halmos, Measure Theory, §11；Folland, Real Analysis, Theorem 1.11

## 说明
因为 $\mu^{*}$ 只有次可加性，永远有 $$\mu^*(E) \le \mu^*(E \cap A) + \mu^*(E \cap A^c)$$。所以这个定义实际上只要求**反向的不等式**：$A$ 不「吃掉」任何东西。

这个定义初看很怪（为什么不用开集、闭集之类的直观条件？）—— 它的妙处是**完全内蕴**：只需要 $\mu^{*}$ 一个对象，不需要任何拓扑。所以它对任意外测度都能用。

直观：$A$ 是「可以随便切」的集合。
