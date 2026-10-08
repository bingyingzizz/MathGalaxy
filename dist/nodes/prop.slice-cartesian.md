# 切片方块是笛卡尔的　`prop.slice-cartesian`
切片范畴与拉回
layer 13 · 命题 · 预层与米田 · 范畴论

设 $\varphi : T \implies T'$ 是预层之间的自然变换。则它诱导的方块

$$\begin{array}{ccc} \mathcal{C}_{T} & \longrightarrow & \mathcal{C}_{T'} \\ \downarrow & & \downarrow \\ \mathcal{C} & \xrightarrow{\ 1\ } & \mathcal{C} \end{array}$$

是**笛卡尔的**。

## 为什么成立（入边，证明在 proofs/）
- `def.fibered-product` 纤维积 / 纤维余积：用到了定义 纤维积 / 纤维余积　proofs/def-link.fibered-product-slice.md
- `def.fibered-product` 纤维积 / 纤维余积：用到了定义 纤维积 / 纤维余积　proofs/def-dep.fibered-slice.md

## 说明
把预层 $T'$ 沿 $\varphi$ 拉回到 $T$ 上，拉回来的元素范畴正是 $\mathcal{C}_{T}$ —— 「限制由一个自然变换给出」这件事，在范畴层面就是一次拉回。
