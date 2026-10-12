# 万有元素唯一到唯一同构　`prop.universal-unique-iso`
命题：$(X,s)$ 与 $(X',s')$ 都万有 $\implies$ 唯一的 $f : X \cong X'$ 带 $s$ 到 $s'$
layer 14 · 命题 · 预层与米田 · 范畴论

若 $(X, s)$ 与 $(X', s')$ 都是
> 陈述续见 `nodes/prop.universal-unique-iso.2.md`


## 为什么成立（入边，证明在 proofs/）
- `lem.yoneda` 米田引理：用到了定义 米田引理　proofs/def-link.univuniq-yoneda.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.23

## 说明
**证明。** 两个万有元素各自给出 $h_{X} \cong F \cong h_{X'}$ ✓，由米田引理得唯一的同构 $X \cong X'$ ✓，而「把 $s$ 送到 $s'$」正是这个同构在元素层的写法 ✓。∎
