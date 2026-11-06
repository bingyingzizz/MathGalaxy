# Schwarz–Christoffel 公式　`thm.schwarz-christoffel`　·　说明
根 `../`

（ii）**辐角原理收尾**：确认边界简单后，对固定内点 $w \in P$ 数 $F - w$ 在 $\mathbb{H}$ 内的零点：边界上 $F - w$ 无零点，$F(\partial\mathbb{H})$ 绕 $w$ 的绕数为 $1$，故恰有一个原像，$F$ 是双射，从而共形。

这两步分别需要 Carathéodory 边界对应（多边形情形的连续延拓）与反射拼接的细致论证；本图没有相应节点，也没有把论证写全，故不勾 ∎。

**为什么是这些指数**：沿实轴走过 $x_{k}$ 时，$\arg f'$ 跳变 $\pi(\alpha_{k} - 1)$，恰好把切向转过去 $\pi - \alpha_{k}\pi$ —— 正是外角。

⭐ **它是「造映射」的工业级工具**：机翼、渠道、电容器这些工程问题都归结为「先把区域近似成多边形，再用 S–C 公式搬到半平面」——搬到半平面之后 Laplace 方程的解就有现成的形式（Poisson 积分，`thm.poisson-formula`）。

> 续见 notes/thm.schwarz-christoffel.6.md
