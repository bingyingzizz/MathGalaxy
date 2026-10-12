# Stone 空间的闭开加细　`prop.stone-clopen-refinement`
命题：Stone 空间的开覆盖有有限不交闭开加细
layer 17 · 命题 · Stone 与 Stonean · 拓扑学

设 $S$ 是 **Stone** 空间。则 $S$ 的**任何开覆盖都有有限的、两两不交的闭开加细**：存在有限族 $(C_{r})_{r \le m}$ 使

$$C_{r} \text{ 闭开}, \qquad C_{r} \cap C_{s} = \emptyset \ (r \ne s), \qquad \bigsqcup_{r} C_{r} = S,$$

且每个 $C_{r}$ 都含在覆盖的某一支之中。

## 为什么成立（入边，证明在 proofs/）
- `def.clopen` 闭开集：用到了定义 闭开集　proofs/def-link.clopenref-clopen.md
- `def.stone-space` 全不连通与 Stone 空间：用到了定义 全不连通与 Stone 空间　proofs/def-link.clopenref-stone.md

refs: Le Stum, An introduction to condensed mathematics, §2.2

> 说明见 `notes/prop.stone-clopen-refinement.md`
