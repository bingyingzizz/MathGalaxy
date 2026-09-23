# 四个标准反例　`prop.convergence-counterexamples`　·　陈述续（2/4）
根 `../`

- **(i)** $$f_n = n^{-1} \chi_{(0, n)}$$：$$f_n \rightrightarrows  0$$ **一致**收敛。
- **(ii)** $$f_n = \chi_{(n, n+1)}$$：$$f_n \to 0$$ **逐点**（因而 a.e.），但**不一致**（$$\sup_x |f_n| = 1$$），也不 $L^{1}$ 收敛（$$\int f_n = 1 \nrightarrow  0$$）。
- **(iii)** $$f_n = n \chi_{[0, 1/n]}$$：$$f_n \to 0$$ a.e.（也依测度收敛，因为 $$\mu(\{|f_n| > \delta\}) = 1/n \to 0$$），但**不 $L^{1}$ 收敛**（$$\int f

> 续见 nodes/prop.convergence-counterexamples.3.md
