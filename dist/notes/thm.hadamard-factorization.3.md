# Hadamard 分解定理　`thm.hadamard-factorization`　·　说明
根 `../`

**第四步：$\Phi$ 的阶 $\le\rho$（缺口）。** 需要对 $|z|=r$ 的两条估计 $\log|\prod_{n}E_{p}(z/a_{n})|\le C\,r^{\rho+\varepsilon}$ 与 $\ge -C\,r^{\rho+\varepsilon}$。上界可按 $|a_{n}|\le 2r$、$|a_{n}|>2r$ 拆分，配合 $n(t)\le C t^{\rho+\varepsilon}$ 与分部求和证出；**下界在 $z$ 靠近某个零点 $a_{n}$ 时必须单独书账**（用 $|f|$ 在该点的零点阶数与 $|E_{p}|$ 的一阶零点相消，把「$\log|P|$ 的负值」与「$\log|f|$ 的负值」配对），本图没有把这一步写全。这就是本节点仍标 `status: 'skeleton'` 的缺口。

**第五步：无零点 $\implies$ 指数（完整）。** $\Phi$ 整、无零点，$\mathbb{C}$ 单连通，由 `prop.single-valued-branch` 存在整函数 $h$ 使 $\Phi=e^{h}$。

> 续见 notes/thm.hadamard-factorization.4.md
