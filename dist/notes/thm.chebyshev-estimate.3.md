# Чебышёв 估计　`thm.chebyshev-estimate`　·　说明
根 `../`

两式合起来给出 $\theta(n) \le n\log 4$（对 $n$ 归纳，基础情形 $n = 1, 2$ 直接检查）。现在数素数：$\pi(\sqrt{x}) \le \sqrt{x}$；而每个 $\sqrt{x} < p \le x$ 满足 $\log p \ge \tfrac12\log x$，这样的 $p$ 至多 $(\theta(x) - \theta(\sqrt{x}))/\tfrac12\log x$ 个。于是对整数 $x \ge 2$，

$$\pi(x) \le \sqrt{x} + \frac{2\theta(x)}{\log x} \le \sqrt{x} + \frac{4x\log 2}{\log x}.$$

对 $x \ge 16$，$\log x \le \sqrt{x}$，故 $\sqrt{x} \le x/\log x$，从而 $\pi(x) \le (1 + 4\log 2)\,x/\log x < 6\,x/\log x$。对 $2 \le x < 16$，$6x/\log x > 17$，而 $\pi(x) \le 6$，结论当然成立。

**从整数到实数。** 设 $x \ge 2$ 实，令 $m := \lfloor x \rfloor$。$\pi(x) = \pi(m)$。当 $m \ge 16$ 时，$t/\log t$ 在 $[16, \infty)$ 上递增，故 $x/\log x \ge m/\log m$，上下界从整数情形直接迁移；当 $m < 16$ 时逐个整数检查即可（$\pi$ 分段常数，$t/\log t$ 在 $[3, \infty)$ 上递增）。∎

> 续见 notes/thm.chebyshev-estimate.4.md
