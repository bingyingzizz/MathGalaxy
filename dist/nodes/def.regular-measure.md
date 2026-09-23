# 正则 Borel 测度　`def.regular-measure`
正则 Borel 测度（Regular Borel Measure）
layer 13 · 定义 · 微分定理 · 分析学

$\mathbb{R}^{n}$ 上的 Borel 测度 $\nu$ 是**正则的**，当且仅当

$\cdot$ $$\nu(K) < \infty$$ 对每个紧集 $K$ 成立；
$\cdot$ $$\nu(E) = \inf\{ \nu(U) : U\text{ 开}, E \subseteq U \}$$ 对每个 $$E \in \mathfrak{B}_{\mathbb{R}^n}$$ 成立（**外正则**）。

符号测度或复测度 $\nu$ 叫正则 $\iff$ $$|\nu|$$ 正则。

## 为什么成立（入边，证明在 proofs/）
- `def.borel` Borel σ-代数：用到了定义 Borel σ-代数　proofs/def-dep.borel-regular.md
- `def.compact` 紧：用到了定义 紧　proofs/def-dep.compact-regular.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.rn-pointwise` RN 导数的点态公式
- 被 `thm.rn-pointwise` RN 导数的点态公式 用

refs: Folland, Real Analysis, §7.2

## 说明
第二条是「从外面用开集逼近」。在 $\mathbb{R}^{n}$ 上它其实由第一条推出。

**每个正则测度都是 $\sigma$有限的**（用紧集的可数覆盖）。

$f \in L^+(\mathbb{R}^n)$ 时，$$f\cdot dm$$ 正则 $\iff$ $$f \in L^1_{loc}$$ —— 这条把「正则」与「局部可积」接了起来。
