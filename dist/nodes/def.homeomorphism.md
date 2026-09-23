# 同胚　`def.homeomorphism`
同胚（Homeomorphism）
layer 7 · 定义 · 拓扑空间 · 拓扑学

设 $X$、$Y$ 是拓扑空间。$f : X \to Y$ 是**同胚**，当且仅当

- $f$ 是双射；
- $f$ 与 $f^{-1}$ 都连续。

此时记 $X \cong Y$，称两个空间**同胚**。「同胚」是拓扑空间之间的等价关系（恒等、逆、复合都保持）。

## 为什么成立（入边，证明在 proofs/）
- `def.bijection` 单射 / 满射 / 双射：用到了定义 单射 / 满射 / 双射　proofs/dep.bijection-homeo.md
- `def.continuous-map` 连续映射：用到了定义 连续映射　proofs/dep.continuous-map-homeo.md

refs: Munkres, Topology, Ch. 2

## 说明
⭐ 同胚 = 「拓扑上分不出来」：一切**拓扑性质**（紧性、连通性、Hausdorff、闭包）都保持不变。

⚠ 反过来也要当心：**度量性质在同胚下会变**。$\mathbb{R}$ 与开区间 $(0, 1)$ 同胚（$x \mapsto \frac{1}{2} + \frac{1}{\pi}\arctan x$），但前者完备、后者不完备 —— 这就是「完备性不是拓扑性质」的经典例子，也是距离空间里「紧 / 闭」与「完备 / 全有界」两类性质的分界线。
