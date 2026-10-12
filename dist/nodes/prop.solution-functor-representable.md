# 解集函子可表示　`prop.solution-functor-representable`
命题：$A \mapsto \{a \in A^{n} : f_{i}(a) = 0\}$ 可表示
layer 13 · 命题 · 预层与米田 · 范畴论

设 $f_{1}, \ldots, f_{r} \in k[t_{1}
> 陈述续见 `nodes/prop.solution-functor-representable.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.representable` 表示函子：用到了定义 表示函子　proofs/def-link.solutionrepr-representable.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.22

## 说明
**证明。** $k$-代数同态 $k[t_{1},\ldots,t_{n}]/(f_{1},\ldots,f_{r}) \to A$ 完全由 $t_{i}$ 的像决定，而像必须把每个 $f_{i}$ 送到 $0$ ✓ —— 于是这族同态正是 $S(A)$ ✓。∎
