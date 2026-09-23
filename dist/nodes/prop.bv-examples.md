# BV 的例子与基本性质　`prop.bv-examples`
命题：BV 的几个例子与封闭性
layer 15 · 命题 · 有界变差与绝对连续 · 分析学

1. 若 $$F : \mathbb{R} \to \mathbb{R}$$ **有界递增**，则 $$F \in BV$$（此时 $$T_F = F - F(-\infty)$$）。

2. $$BV$$ 是 $\mathbb{C}$向量空间。

3. 若 $F$ 实可微且 $F'$ 有界，则对一切 $$-\infty < a < b < \infty$$ 有 $$F \in BV([a,b])$$。

4. $$F(x) = \sin x$$：对任何紧区间 $$[a,b]$$，$$F \in BV([a,b])$$。

5. $$F(x) = xsin(1/x)$$（$$x \ne 0$$），$$F(0) = 0$$：若 $$0 \in [a,b]$$，则 $$F \in BV([a,b])$$。

## 为什么成立（入边，证明在 proofs/）
- `def.bounded-variation` 有界变差 BV：用到了定义 有界变差 BV　proofs/def-link.bv-variation.md

refs: Folland, Real Analysis, §3.5

## 说明
第 4、5 两个例子是「振荡型」的：函数本身有界、但导数在某个点附近爆掉或无限振荡。它们仍然有界变差 —— 说明**BV 比「$C^{1}$」宽得多**。

一个标准的**反例**（不属于 BV）：$$F(x) = \sin(1/x)$$（$$x \ne 0$$）、$$F(0) = 0$$ —— 它在 0 附近无限次振荡且振幅不衰减，全变差发散。

⭐ 记住这条分界线：**振幅不衰减的振荡 $\implies$ 不是 BV**。
