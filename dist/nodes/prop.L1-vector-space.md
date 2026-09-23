# L¹ 是向量空间　`prop.L1-vector-space`
命题：可积函数全体是向量空间，∫ 线性
layer 17 · 命题 · 积分 · 分析学

$X$ 上可积的（实值）函数全体构成一个**实向量空间**，并且

$$\int (af + bg) = a\int f + b\int g\quad  \forall a, b \in \mathbb{R}$$

即 $$f \mapsto \int f$$ 是线性的。

## 为什么成立（入边，证明在 proofs/）
- `def.integrable` 可积 / L¹：用到了定义 可积 / L¹　proofs/def-link.integrable-L1-vectorspace.md

refs: Folland, Real Analysis, Prop. 2.21

## 说明
「是向量空间」要在 a.e. 意义下理解（两个 a.e. 相等的可积函数看作同一个元素）。

线性来自正负部分解后对简单函数的 (a)(b) 逐条验证 —— 这条本身不深，但它是 $L^{1}$ 成为**赋范空间**的第一步，后面 Lp 空间整套理论都从这儿开始。
