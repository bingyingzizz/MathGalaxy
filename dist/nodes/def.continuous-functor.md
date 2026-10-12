# 连续函子（site 之间）　`def.continuous-functor`
连续函子（Continuous Functor between Sites）
layer 16 · 定义 · 拓扑斯 · 范畴论

设 $\mathcal{C}, \mathcal{C}'$ 是两个 site。函子

$$f^{-1} := g : \mathcal{C} \longrightarrow \mathcal{C}'$$
叫**连续的**，如果沿 $g$ 的预复合把 $\mathcal{C}'$ 上的层拉回成 $\mathcal{C}$ 上的层：
> 陈述续见 `nodes/def.continuous-functor.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.sheaf` 层：用到了定义 层　proofs/def-dep.contfunctor-sheaf.md

## 它能推出什么 / 谁在用它
- 被 `def.morphism-of-sites` site 的态射 用
- 被 `def.induced-topology` 诱导拓扑 用

refs: Le Stum, An introduction to condensed mathematics, §3.3

> 说明见 `notes/def.continuous-functor.md`
