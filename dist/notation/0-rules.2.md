# 记号表 · 通用规则
根 `../`　·　索引 `notation.md`

`\text{ 是} X \text{上的}` —— 前后补空格，别和数学挤在一起。

## R7　省略号显式写

运算 / 关系链用 `\cdots`（$a_1 \ni a_2 \ni \cdots$）；逗号列表用 `\ldots`（$x_1, x_2, \ldots$）。**不用 `\dots`**。

## R8　上下划线看长短

单符号或带上下标的用 `\bar{}`（$\bar{\mu}$、$\bar{\mathcal{M}}$、$\bar{z}$）；多字符、要伸展的用 `\overline{}`（$\overline{\mathbb{R}}$）。

## R9　证明方向标记

写 `$(\implies)$` / `$(\Longleftarrow)$`（一对粗箭头）。

## R10　label / tags / refs 是纯文本

不能含 `$`：label 直接画在画布上，那里没有 KaTeX，所以留 Unicode。

## R11　title 里的公式也用 $…$

`title` 走 `U.titleHtml()`，认 `$…$`。混着写会有和正文一样的字体问题。**例外**：`σ-代数`、`σ-有限`、`σ-环`、`μ-零集` 这类「希腊字母 + `-` + 词」的术语前缀保留 Unicode。

## R12　行内公式不写在行首

> 续见 notation/0-rules.3.md
