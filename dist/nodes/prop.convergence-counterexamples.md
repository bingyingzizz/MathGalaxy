# 四个标准反例　`prop.convergence-counterexamples`
命题：四个标准反例（把各种收敛区分开）
layer 18 · 命题 · 可测函数与收敛 · 分析学

在 $\mathbb{R}$（或 [0, 1]）上取 Lebesgue 测度。

> 陈述续见 nodes/prop.convergence-counterexamples.2.md

## 为什么成立（入边，证明在 proofs/）
- `def.convergence-modes` 五种收敛：用到了定义 五种收敛　proofs/def-link.modes-counterexamples.md

refs: Folland, Real Analysis, §2.4

## 说明
(iii) 是「a.e. 收敛 $\nRightarrow L^{1}$ 收敛」的标准反例 —— 也是 DCT 里「控制函数不能省」的根据。

(iv) 是「依测度收敛 $\nRightarrow$ a.e. 收敛」的标准反例。它的机制很值得记住：**每次取一个越来越窄的区间，但位置不停地搬家** —— 质量在每一处都只停留一瞬间，所以每点都不收敛，但「出错集合」的测度趋于 0。

⭐ 这四个例子基本覆盖了所有反方向的护栏：一致最强、依测度最弱、a.e. 与 $L^{1}$ 各自独立。
