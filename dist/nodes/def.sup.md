# 上确界与下确界　`def.sup`
上确界 $\sup$ / 下确界 $\inf$（Supremum & Infimum）
layer 12 · 定义 · 实数与极限 · 分析学+序理论

设 $S \subseteq \mathbb{R}$，$S \ne \emptyset$。

$u$ 是 $S$ 的**上确界**（记 $\sup S$），当且仅当

- $u$ 是 $S$ 的上界：$\forall s \in S, s \le u$；
- $u$ 是**最小**的上界：$u \le u'$ 对每个上界 $u'$ 成立。

等价说法：$\forall \varepsilon > 0, \exists s \in S : s > u - \varepsilon$（任意近地逼近）。
> 陈述续见 `nodes/def.sup.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.real` 实数系 ℝ：用到了定义 实数系 ℝ　proofs/dep.real-sup.md
- `lem.zorn` 佐恩引理：佐恩引理与确界原理：都是「一次把无穷过程走完」　proofs/ana.sup-vs-maximal.md

## 它能推出什么 / 谁在用它
- 被 `def.series` 级数收敛 用
- 被 `def.integral-nonneg` 非负函数的积分 用
- 被 `thm.real-ordered-field` ℝ 是完备有序域 用
- ～弱边 `lem.zorn` 佐恩引理

refs: Rudin, Principles of Mathematical Analysis, Ch. 1

> 说明见 `notes/def.sup.md`
