# 单纯对象　`def.simplicial`
单纯对象（Simplicial Object）
layer 10 · 定义 · 图与极限 · 范畴论

**单纯形范畴** $\Delta$ 的对象是

$$[0], \ [1], \ [2], \ \ldots, \ [n], \ \ldots$$

而 $[n] \to [m]$ 的态射取全体**单调映射**（不要求 $n \le m$，也不要求严格）。$\Delta$ 的全体态射由两类生成：
> 陈述续见 `nodes/def.simplicial.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.commutative-diagram` 图与交换图：用到了定义 图与交换图　proofs/def-dep.diagram-simplicial.md
- `def.function` 函数：用到了定义 函数　proofs/def-dep.function-simplicial.md

## 它能推出什么 / 谁在用它
- 被 `prop.simplicial-to-chain` 单纯对象给出链复形 用
- 被 `method.simplicial-cohomology` 单纯方法算层上同调 用

refs: Le Stum, An introduction to condensed mathematics, §1.3

> 说明见 `notes/def.simplicial.md`
