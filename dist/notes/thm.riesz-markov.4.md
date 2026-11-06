# Riesz–Markov 表示　`thm.riesz-markov`　·　说明
根 `../`

严格证明要先证 $\mu$ 在开集上内正则（用紧集从内部逼近），再对 $A$ 的开覆盖作分解；本图不展开这两步，故这里只记路线，不勾 ∎。

**第三步：Carathéodory 延拓（标准定理，本图未展开引理 4 的证明）**。若引理 4 成立，所有开集（从而所有 Borel 集）都是 $\mu^{*}$-可测的；把 $\mu^{*}$ 限制到 Borel $\sigma$-代数上，得到 Borel 测度 $\mu$。对开集 $U$，$\mu(U) = \mu^{*}(U)$（$U$ 自身就是覆盖），与第一步的定义一致。

**第四步（未完成）：表示引理**。要证对每个 $f \in C_{c}(X)$，

$$\Lambda(f) = \int_{X} f\,\mathrm{d}\mu .$$

标准做法：先对 $0 \le f \le 1$、$K = \operatorname{supp} f$ 取 $K$ 的有限开覆盖，使 $f$ 在每个覆盖成员上的振幅 $< \varepsilon$；用从属于它的单位分解（`def.partition-of-unity`、`prop.paracompact-partition-unity`）造出两个连续函数

$$g \le f \le h,\qquad \Lambda(h) - \Lambda(g) < \varepsilon,\qquad \int (h - g)\,\mathrm{d}\mu < \varepsilon,$$

> 续见 notes/thm.riesz-markov.5.md
