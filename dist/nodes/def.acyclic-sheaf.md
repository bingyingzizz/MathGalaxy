# 无环层　`def.acyclic-sheaf`
无环层（Acyclic Sheaf）
layer 18 · 定义 · 层上同调 · 同调代数

site $\mathcal{C}$ 上的阿贝尔层 $M$ 叫**无环的**，如果 $H^{n}
> 陈述续见 `nodes/def.acyclic-sheaf.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.sheaf-cohomology` 层上同调：用到了定义 层上同调　proofs/def-dep.acyclic-sheafcoh.md

## 它能推出什么 / 谁在用它
- 被 `prop.acyclic-iff-cech` 无环 ⟺ Čech 上同调为零 用

refs: Le Stum, An introduction to condensed mathematics, §7.3

## 说明
⚠️ 专门提醒：**这个定义依赖 site $\mathcal{C}$，不只是依赖拓扑斯 $\widetilde{\mathcal{C}}$** —— 换个 site（同一拓扑斯）无环性可能变。这一点和「层的概念只依赖拓扑斯」形成对比。

📌  **Definition 7.3.9**。
