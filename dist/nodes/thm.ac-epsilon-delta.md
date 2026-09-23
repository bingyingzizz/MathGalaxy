# 绝对连续的 ε–δ 刻画　`thm.ac-epsilon-delta`
定理（有限情形）：ν ≪ μ ⟺ ∀ε>0 ∃δ>0 ( μ(E)<δ ⟹ |ν(E)|≤ε )
layer 15 · 定理 · 符号测度与分解 · 分析学

设 $\nu$ 是**有限**符号测度、$\mu$ 是测度。则

$$\nu \ll  \mu \iff \forall\varepsilon > 0, \exists\delta > 0 : \mu(E) < \delta \implies |\nu(E)| \le \varepsilon$$

## 为什么成立（入边，证明在 proofs/）
- `def.absolute-continuity` 绝对连续：绝对连续 ⟹ ε–δ 刻画（ν 有限时）　proofs/imp.ac-epsilon-delta.md

## 它能推出什么 / 谁在用它
- ⇒ `prop.ac-iff-measure-ac` 函数绝对连续 ⟺ 测度绝对连续

refs: Folland, Real Analysis, Prop. 3.5

## 说明
把「零集上为零」升级成了定量的「小测度上小值」—— 这正是绝对连续这个名字里「连续」两个字的来源。

⚠ 「$\nu$ 有限」不能省：否则 $$\delta$$ 卡不住（例如 $\mu = Lebesgue$ 测度、$$\nu(E) = \int_E 1/x$$ 这类）。

（$\Longleftarrow$）方向很直接：$\mu (E) = 0$ 时对一切 $\varepsilon$ 都有 $|\nu (E)| \le \varepsilon$，故 $\nu (E) = 0$。
