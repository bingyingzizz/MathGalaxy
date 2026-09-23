# 连续映射　`def.continuous-map`
连续映射（Continuous Map）
layer 4 · 定义 · 拓扑空间 · 拓扑学+分析学

设 $X$、$Y$ 是拓扑空间。映射 $f : X \to Y$ **连续**，当且仅当**每个开集的原像是开集**：

$$V \in \mathcal{T}_Y \implies f^{-1}(V) \in \mathcal{T}_X$$

只需对某一组**基**（或子基）验证即可。

连续的复合仍连续：$f$、$g$ 连续 $\implies g \circ f$ 连续。

## 为什么成立（入边，证明在 proofs/）
- `def.topology` 拓扑空间与开集：用到了定义 拓扑空间与开集　proofs/dep.topology-continuous-map.md

## 它能推出什么 / 谁在用它
- 被 `def.homeomorphism` 同胚 用

refs: Munkres, Topology, Ch. 2

## 说明
⭐ 这条定义是 $\varepsilon$-$\delta$ 的**抽象化**：在距离空间里，「$f^{-1}(V)$ 开」与「$\varepsilon$ 给出 $\delta$」逐字等价 —— 因为开球就是 $\varepsilon$ 邻域。所以「连续」是拓扑性质，跟具体距离无关。

⚠ 用**原像**而不是像：原像对并、交、补全部保持，像没有这些性质。这与可测函数的定义（$f^{-1}(E) \in \mathcal{M}$）是同一个套路。
