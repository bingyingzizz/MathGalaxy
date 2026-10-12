# 高次上同调预层没有 Čech 上同调　`prop.cech-higher-cohomology-presheaf`
命题：$n \ne 0 \implies \check{H}^{p}\bigl(H^{n}(M)\bigr) = 0$
layer 19 · 命题 · 层上同调 · 同调代数

设
> 陈述续见 `nodes/prop.cech-higher-cohomology-presheaf.2.md`


## 为什么成立（入边，证明在 proofs/）
- `prop.higher-cohomology-presheaf-zero` 高次上同调预层的关联层为零：关联层为零 $\implies$ Čech 全为零　proofs/imp-link.higherpresheaf0-cechhigher.md
- `def.cech-cohomology` Čech 上同调：用到了定义 Čech 上同调　proofs/def-link.cechhigher-cech.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.cech-h1-equals-h1` 一次 Čech 就是一次上同调

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.45

## 说明
**证明。** 由「高次上同调预层的关联层为零」，$H^{n}(M)$ 层化之后是零层 ✓；而 Čech 上同调只依赖预层的**层化**（Čech 函子分解成两趟 $(-)^{+}$）✓ —— 零层上当然没有 Čech 上同调 ✓。∎
