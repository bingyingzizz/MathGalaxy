# Schwarz–Christoffel 公式　`thm.schwarz-christoffel`　·　说明
根 `../`

（ii）**辐角原理收尾**：确认边界简单后，对固定内点 $w \in P$ 数 $F - w$ 在 $\mathbb{H}$ 内的零点：边界上 $F - w$ 无零点，$F(\partial\mathbb{H})$ 绕 $w$ 的绕数为 $1$，故恰有一个原像，$F$ 是双射，从而共形。

这两步各需要一条外部引理，本图都没有节点、也没有写全，故不勾 ∎：

**引理 A（Carathéodory–Osgood，Jordan 区域情形）**：Jordan 区域到单位圆盘的共形映射连续延拓为闭包同胚。多边形是 Jordan 区域，故 $F$ 的边界对应成立。

**引理 B（简单性与绕数）**：若 $F$ 在 $\mathbb{H}$ 内局部共形、连续到边界，且边界曲线在每个边内部的绕数恰当，则 $F$ 单叶。标准做法是把多边形沿边反射拼接，用 Schwarz 反射（`thm.schwarz-reflection`）延拓 $F$ 并数覆盖重数；这一步同时给出（i）与（ii）。

**为什么是这些指数**：沿实轴走过 $x_{k}$ 时，$\arg f'$ 跳变 $\pi(\alpha_{k} - 1)$，恰好把切向转过去 $\pi - \alpha_{k}\pi$ —— 正是外角。

> 续见 notes/thm.schwarz-christoffel.6.md
