# 可数积的生成集　`prop.product-sigma-generated`
命题：指标集可数时，积 σ-代数由「矩形」生成
layer 7 · 命题 · 乘积测度与 Fubini · 分析学

若指标集 $A$ **可数**，则

$$\otimes _{\alpha \in A} \mathcal{M}_\alpha = \mathcal{M}(\{ \prod_{\alpha \in A} E_\alpha : E_\alpha \in \mathcal{M}_\alpha \})$$

即：可数积的 $\sigma$代数，恰好是由全体「矩形」生成的 $\sigma$代数。

## 为什么成立（入边，证明在 proofs/）
- `def.product-sigma` 积 σ-代数：用到了定义 积 σ-代数　proofs/def-link.product-generated.md

refs: Folland, Real Analysis, §2.1

## 说明
这条确实 obvious：$A$ 可数时每个矩形都是**可数多个柱集之交**，



$$\prod_{\alpha \in A} E_\alpha = \bigcap_{\alpha \in A} \pi _\alpha^{-1}(E_\alpha)$$



而柱集本来就已经在 $\sigma$代数里了，矩形自然也就在里面；反过来柱集是矩形（其余坐标取全空间）的特例。

⚠ 该结论对**不可数**的 $A$ **不成立** —— 这就是为什么定义必须用柱集而不是矩形。
