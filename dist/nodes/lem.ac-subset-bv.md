# AC ⊆ BV　`lem.ac-subset-bv`
引理：绝对连续蕴含绝对变差（紧区间上）
layer 15 · 引理 · 有界变差与绝对连续 · 分析学

$$AC([a, b]) \subseteq BV([a, b])$$

## 为什么成立（入边，证明在 proofs/）
- `def.ac-function` 绝对连续函数：用到了定义 绝对连续函数　proofs/def-link.ac-function-subset-bv.md
- `def.bounded-variation` 有界变差 BV：用到了定义 有界变差 BV　proofs/def-link.bv-subset-bv.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.ftc-lebesgue` 微积分基本定理（Lebesgue 版）

refs: Folland, Real Analysis, §3.5

## 说明
证明：由绝对连续性取 $\delta$ 使「总长 $< \delta \implies$ 总变差 $< 1$」。把 [a,b] 切成有限多段、每段长度 $< \delta$，则每段的变差 $\le 1$，加起来 $\le$ 段数 —— 有限。∎

⚠ 反过来不成立：**Cantor 函数在 [0,1] 上有界变差但不绝对连续**。所以这个包含是严格的。

⭐ 这条是下面那条「微积分基本定理 TFAE」的准备工作：它保证 $(a) \implies BV$，从而可以谈 $F'$。
