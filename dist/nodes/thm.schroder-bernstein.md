# Schröder–Bernstein 定理　`thm.schroder-bernstein`
Schröder–Bernstein 定理
layer 7 · 定理 · 基数与等势 · 集合论

若存在单射 $f : A \to B$ 与单射 $g : B \to A$，则存在**双射** $A \to B$，即

$$|A| \le |B| \ \text{且}\ |B| \le |A| \implies |A| = |B|$$

## 为什么成立（入边，证明在 proofs/）
- `def.bijection` 单射 / 满射 / 双射：两个方向的单射 ⟹ 双射　proofs/imp.schroder-bernstein.md
- `def.bijection` 单射 / 满射 / 双射：用到了定义 单射 / 满射 / 双射　proofs/dep.bijection-sb.md

refs: Kunen, Set Theory, I.6

## 说明
⭐ 它的价值在于**省事**：要证两个集合等势，只要各造一个方向的单射，不必显式写出那个双射。（对比：Cantor 定理的另一条路 —— 有单射无满射 —— 用的是对称的说法。）

⚠ 它**不需要**选择公理：证明是构造性的（见边的证明），这也是它比「任意两个基数可比」好用的地方。
