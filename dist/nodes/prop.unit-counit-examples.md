# 常见伴随的单位与余单位　`prop.unit-counit-examples`
命题：从单位/余单位读出忠实性
layer 11 · 命题 · 伴随与反射 · 范畴论

几对常见伴随的单位：**自由 ⊣ 遗忘** 的单位是「把 $x$ 送进生成元」；**层化 ⊣ 含入** 的单位是 $T \to T^{\#}$；**$k$-化 ⊣ 含入** 的单位是恒等（$X \to kX$ 当 $X$ 已紧生成时）。由「余单位满 $\iff$ 忠实」还能从单位/余单位读出忠实性。

## 为什么成立（入边，证明在 proofs/）
- `def.adjunction-unit` 单位与余单位：用到了定义 单位与余单位　proofs/def-link.unitcounit-adjunit.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 1.61

## 说明
**证明。** 逐例用 $\eta_{X} = \Phi(1_{FX})$、$\varepsilon_{Y} = \Phi^{-1}(1_{GY})$ 算即可 ✓。∎
