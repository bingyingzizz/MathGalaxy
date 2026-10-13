# Fubini–Tonelli　`thm.fubini-tonelli`
Fubini–Tonelli 定理（重积分可交换次序）
layer 20 · 定理 · 乘积测度与 Fubini · 分析学
[在星图里打开](../#n=thm.fubini-tonelli)　·　[节点索引](../index.md)

设 $(X, \mathcal{M}, \mu )$、$(Y, \mathcal{N}, \nu )$ 是 **$\sigma$有限**的测度空间。

**(a) Tonelli（非负情形，无附加条件）**：若 $f \in L^+(X \times Y)$，则

$$\int f_x d\nu \in L^+(X), \quad  \int f^y d\mu \in L^+(Y)$$

且

$$\int f d(\mu \times \nu) = \int_X ( \int_Y f(x, y) d\nu(y) ) d\mu(x) = \int_Y ( \int_X f(x, y) d\mu(x) ) d\nu(y)$$

**(b) Fubini（可积情形）**：若 $f \in L^1(\mu \times \nu)$，则
> 陈述续见 [nodes/thm.fubini-tonelli.2.md](./thm.fubini-tonelli.2.md)


## 为什么成立（入边，证明在 proofs/）
- …另有入边，续页见 [nodes/thm.fubini-tonelli.3.md](./thm.fubini-tonelli.3.md)

## 它能推出什么 / 谁在用它
- …另有出边，续页见 [nodes/thm.fubini-tonelli.5.md](./thm.fubini-tonelli.5.md)

refs: Folland, Real Analysis, Theorem 2.37

> 说明见 `notes/thm.fubini-tonelli.md`

引用：`thm.fubini-tonelli`（内容 v0.9.0）· 条款见 [LICENSE.txt](../LICENSE.txt)
