# 自由对象的例子　`prop.free-objects-examples`
命题：各代数范畴里的自由对象
layer 14 · 命题 · 范畴里的代数结构 · 范畴论

「自由」在几个代数范畴里的样子：$\mathbf{Mon}$ 里是以 $X$ 为生成元的**字幺半群**；$\mathbf{Gr}$ 里是**字群**（允许消去）；$\mathbf{Rng}$ 里是非交换多项式环；$G\text{-}\mathbf{Set}$ 里是 
> 陈述续见 `nodes/prop.free-objects-examples.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.monoid-object` 幺半群对象：用到了定义 幺半群对象　proofs/def-link.freeobj-mon.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.8

## 说明
**证明。** 逐条核对自由对象的万有性质 $\operatorname{Hom}(FX, -) \cong \operatorname{Hom}_{\mathbf{Set}}\bigl(X, U(-)\bigr)$ ✓。∎
