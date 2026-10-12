# 遗忘与含入函子的正合性　`prop.forgetful-exactness`
命题：遗忘保极限不保余极限；层化正合
layer 14 · 命题 · 范畴里的代数结构 · 范畴论

代数遗忘函子**保极限但不保余极限**；含入 $\widetilde{\mathcal{C}} \hookrightarrow \widehat{\mathcal{C}}$ 保极限不保余极
> 陈述续见 `nodes/prop.forgetful-exactness.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.exact-functor` 正合函子：用到了定义 正合函子　proofs/def-link.forgetexact-exactfun.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.66

## 说明
**证明。** 保极限见「代数遗忘函子保极限」✓；不保余极限：$M \oplus N$ 的底集合不是 $M \sqcup N$ ✓；层化是左伴随又左正合，故正合 ✓。∎
