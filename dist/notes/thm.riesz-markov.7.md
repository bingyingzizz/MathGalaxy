# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

**范数**：若 $X$ 紧，$\mu(X) = \sup\{\Lambda(f) : 0 \le f \le 1\} = \lVert\Lambda\rVert$（正泛函在 $f \le 1$ 上的上确界就是范数）；$X$ 不紧时也可能有限（如有限总质量的测度），此时两端仍相等；也可能同为 $+\infty$。

⭐ **与凝聚态的关系**：profinite 集上的「整值测度」$M(S,\mathbb{Z}) = \operatorname{Hom}_{\mathbb{Z}}(C(S,\mathbb{Z}),\mathbb{Z})$ 就是这条定理的**整值、紧全不连通**版本 —— 见 `def.cond-measure`。两者的差别只在「系数环」与「测试空间」，做法同为「对连续函数做赋值」。
