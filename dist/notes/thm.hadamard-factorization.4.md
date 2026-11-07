# Hadamard 分解定理　`thm.hadamard-factorization`　·　说明
根 `../`

**第四步（续）：好半径引理。** 取 $M:=\lceil\rho\rceil+3$、$\delta:=r^{-M}$。零点落在 $[r/2,4r]$ 中的个数 $N\le n(4r)\le C\,r^{\rho+\varepsilon}$；每个这样的零点排除掉长度 $2\delta$ 的一段半径。因 $2\delta N\le2C\,r^{\rho+\varepsilon-M}<r$（$r$ 大时），存在 $R\in[r,2r]$ 使每个 $|a_{n}|\in[r/2,4r]$ 都满足 $\bigl||a_{n}|-R\bigr|\ge\delta$。固定这样的 $R$。\n\n对 $|z|=R$ 按 $|a_{n}|\le4r$、$|a_{n}|>4r$ 拆 $\log|\mathcal{P}(z)|=\sum\log|E_{p}(z/a_{n})|$。\n\n• $|a_{n}|>4r$：$|z/a_{n}|<1/2$，由（i）每项 $\ge-C(R/|a_{n}|)^{p+1}$；分部求和与 $n(t)\le C t^{\rho+\varepsilon}$ 给 $\sum_{|a_{n}|>4r}(R/|a_{n}|)^{p+1}\le C\,r^{\rho+\varepsilon}$。\n\n• $|a_{n}|\le4r$：$|z-a_{n}|\ge\delta$（$|a_{n}|\in[r/2,4r]$ 时由 $R$ 的选法；$|a_{n}|<r/2$ 时 $|z-a_{n}|\ge R-r/2\ge r/2$），故 $\log|1-z/a_{n}|=\log|z-a_{n}|-\log|a_{n}|\ge\log(\delta/(4r))$；由（i）每项 $\ge\log(\delta/(4r))-

> 续见 notes/thm.hadamard-factorization.5.md
