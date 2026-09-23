# Lusin 定理　`cor.lusin`
Lusin 定理：可测函数几乎处处连续
layer 19 · 推论 · 可测函数与收敛 · 分析学

设 $$f : [a, b] \to \mathbb{C}$$ 是 Lebesgue 可测的。则对任意 $\varepsilon > 0$，存在**紧集** $$E \subseteq [a, b]$$ 使

$$\mu(E^c) < \varepsilon,\text{ 且} f|_E\text{ 连续}$$

## 为什么成立（入边，证明在 proofs/）
- `thm.approximation-L1+thm.egorov` thm.approximation-L1+thm.egorov：简单函数逼近 + Egorov ⟹ Lusin　proofs/imp.lusin.md

refs: Folland, Real Analysis, Theorem 2.34

## 说明
⭐ 「可测」这个条件看起来很弱，但 Lusin 说：可测函数差一点就是**连续**函数 —— 只要允许把定义域挖掉一小块。

与 Egorov 的分工：Egorov 说「一列函数」几乎一致收敛，Lusin 说「一个函数」几乎连续。两者都是「丢掉小集合换取正则性」。

⚠ 挖掉的那块必须容许是开集，剩下的必须是**紧**集（在 [a,b] 上紧 $\iff$ 有界闭），不能只是可测集。
