# 双代数的例子　`prop.bialgebra-examples`
命题：$k[t]$ 与 $k[t,1/t]$ 都是双代数
layer 14 · 命题 · 范畴里的代数结构 · 范畴论

**双
> 陈述续见 `nodes/prop.bialgebra-examples.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.monoid-object` 幺半群对象：用到了定义 幺半群对象　proofs/def-link.bialg-monoid.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.50

## 说明
**证明。** 把「反范畴里的幺半群」翻译回 $k$-代数，就是「余乘 $\Delta : A \to A \otimes A$ 是**代数同态**」✓；上面两个 $\Delta$ 都保乘法 ✓（$k[t,1/t]$ 里 $t$ 可逆，所以只有 $t \mapsto t \otimes t$ 这一种选择）✓。∎
