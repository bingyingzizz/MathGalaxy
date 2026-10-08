# 投射 / 内射对象　`def.projective-object`
投射对象与内射对象（Projective / Injective Object）
layer 14 · 定义 · 紧 Haus 与 Stone · 范畴论

范畴 $\mathcal{C}$ 中对象 $P$ 叫**投射的**，如果对每个满态射 $A \twoheadrightarrow B$ 与每个 $P \to B$，都存在提升 $P \to A$ 使三角形交换：

$$\begin{array}{ccc} & P & \\ \swarrow & \downarrow & \searrow \\ A & \twoheadrightarrow & B \end{array}$$

对偶地，$I$ 叫**内射的**，如果对每个单态射 $A \rightarrowtail B$ 与每个 $A \to I$，都存在延拓 $B \to I$。

## 为什么成立（入边，证明在 proofs/）
- `def.mono` 单态射 / 满态射：用到了定义 单态射 / 满态射　proofs/def-dep.mono-projective.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.gleason` Gleason 定理
- 被 `thm.gleason` Gleason 定理 用
- 被 `prop.free-projective` 自由紧 Haus 是投射对象 用
- 被 `thm.gleason` Gleason 定理 用

> 说明见 `notes/def.projective-object.md`
