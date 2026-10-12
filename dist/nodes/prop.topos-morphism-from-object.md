# 对象给出拓扑斯态射　`prop.topos-morphism-from-object`
命题：$X \in \mathcal{C}$ 给出 $\widehat{X} : \mathbf{Set} \to \widehat{\mathcal{C}}$
layer 19 · 命题 · 拓扑斯 · 范畴论

把 $X \in \mathcal{C}$ 看成函子 $X : \mathbf{1} \to \mathcal{C}$，它给出拓扑斯态射 $\widehat{X} : \mathbf{Set} \to \widehat{\mathcal{C}}$，三个函子在对象上由下式给出：
> 陈述续见 `nodes/prop.topos-morphism-from-object.2.md`


## 为什么成立（入边，证明在 proofs/）
- `thm.induced-topos-morphism` 任意函子诱导拓扑斯态射：任意函子诱导拓扑斯态射 $\implies$ 对象给出 $\widehat{X}$　proofs/imp-link.indtop-topmorobj.md
- `def.topos-morphism` 拓扑斯的态射：用到了定义 拓扑斯的态射　proofs/def-link.topmorobj-toposmor.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.topos-morphism-final-map` 终映射给出的拓扑斯态射

refs: Le Stum, An introduction to condensed mathematics, Exercise 3.52

> 说明见 `notes/prop.topos-morphism-from-object.md`
