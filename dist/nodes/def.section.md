# 截口　`def.section`
截口（Section）Eₓ 与 Eʸ
layer 2 · 定义 · 乘积测度与 Fubini · 分析学

设 $$E \subseteq X \times Y$$。对 $$x \in X$$、$$y \in Y$$ 定义

$$E_x := \{y \in Y : (x, y) \in E\}$$
$$E^y := \{x \in X : (x, y) \in E\}$$

分别叫 $E$ 在 $x$ 处的**纵截口**与在 $y$ 处的**横截口**。

类似地，对函数 $$f : X \times Y \to \mathbb{C}$$ 定义

$$f_x(y) := f^y(x) := f(x, y)$$

## 为什么成立（入边，证明在 proofs/）
- `def.subset` 子集：用到了定义 子集　proofs/def-dep.subset-section.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.section-measurable` 截口可测
- 被 `prop.section-measurable` 截口可测 用
- 被 `thm.fubini-tonelli` Fubini–Tonelli 用

refs: Folland, Real Analysis, §2.5

## 说明
直观：把平面图形用一根竖线（或横线）切一刀，切出来的那条线段就是截口。

截口是 Fubini 定理的语言：重积分 $$\iint f d(\mu \times \nu)$$ 就是「先沿截口积一次，再把各条截口的积分对另一变量积一次」。
