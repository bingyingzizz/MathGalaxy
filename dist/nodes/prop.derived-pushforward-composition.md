# 推前的复合　`prop.derived-pushforward-composition`
命题：$Rf'_{*} \circ Rf_{*} = R(f' \circ f)_{*}$
layer 18 · 命题 · 层上同调 · 同调代数

设
> 陈述续见 `nodes/prop.derived-pushforward-composition.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.topos-morphism` 拓扑斯的态射：用到了定义 拓扑斯的态射　proofs/def-link.derivedcomp-toposmor.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.55

## 说明
**证明。** 这是 Grothendieck 谱序列的又一特例：$f_{*}$ 把内射层送到 $f'_{*}$-零调对象 ✓，于是在 $\Gamma\bigl(X'', \cdot\bigr)$ 这一层套用 Grothendieck 谱序列即得 ✓；谱序列在 $f_{*}$ 严格保持内射时退化成上面那条等式 ✓。∎
