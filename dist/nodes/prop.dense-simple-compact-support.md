# 紧支简单函数稠密　`prop.dense-simple-compact-support`
命题：紧支集简单函数在 $L^p$ 中稠密
layer 16 · 命题 · L^p 空间 · 分析学

设 $1 \le p < \infty$。**紧支集的简单函数**在 $L^p$ 中稠密（$p = \infty$ 时不成立）。

## 为什么成立（入边，证明在 proofs/）
- `def.simple-function` 简单函数：用到了定义 简单函数　proofs/def-link.simple-function-dense.md
- `def.lp-norm` L^p 范数：用到了定义 L^p 范数　proofs/def-link.lp-norm-dense.md

refs: Folland, Real Analysis, §6.1

## 说明
证明：对 $f \in L^p$，取简单函数列 $\{f_n\}$ 使 $f_n \to f$ a.e. 且 $|f_n| \le |f|$（简单函数逼近定理给的就是这个形状）。于是 $f_n \in L^p$，且



$$|f_n - f|^p \le 2^p |f|^p \in L^1$$



由 DCT 得 $\|f_n - f\|_p \to 0$。$f_n$ 是简单函数、支撑集有限 —— 这就是要的稠密性。∎

⚠ **$p = \infty$ 时这条失效**：$L^\infty$ 里的简单函数是「有限个值」，均匀逼近一个连续函数办不到（例如 $\sin$ 型或一般的连续函数）。
