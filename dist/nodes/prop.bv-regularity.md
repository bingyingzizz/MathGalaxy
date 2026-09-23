# BV 函数的正则性　`prop.bv-regularity`
命题：BV 函数的单侧极限都存在、不连续点可数、a.e. 可导
layer 17 · 命题 · 有界变差与绝对连续 · 分析学

设 $$F \in BV$$。则

**(c)** 对每个 $$x \in \mathbb{R}$$，$$F(x+)$$ 与 $$F(x-)$$ 都存在；$$F(\pm \infty)$$ 也存在；

**(d)** $F$ 的不连续点至多可数；

**(e)** 令 $$G(x) = F(x+)$$，则 $$F'$$ 与 $$G'$$ 处处存在且相等（a.e.）。

## 为什么成立（入边，证明在 proofs/）
- `thm.bv-jordan+thm.monotone-differentiable` thm.bv-jordan+thm.monotone-differentiable：化归到递增函数 ⟹ BV 的正则性　proofs/imp.bv-regularity.md
- `def.bounded-variation` 有界变差 BV：用到了定义 有界变差 BV　proofs/def-link.bv-regularity-thm.md

refs: Folland, Real Analysis, Theorem 3.27

## 说明
全部由「$F = G - H$」化归到递增函数：递增函数的单侧极限显然存在；不连续点可数由单调函数那条定理；a.e. 可导也由那条定理（差的导数 $=$ 导数的差）。

⭐ 所以 BV 函数虽然可能很不光滑，但**结构上非常驯服**：只有可数多个跳跃，其余地方都「几乎处处可导」。
