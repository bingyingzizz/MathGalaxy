# 记号表 · 通用规则
根 `../`　·　索引 `notation.md`

`\sup \inf \lim \liminf \limsup \max \min \ker \dim \exp \log \sin \cos`。有参数的多字母算子名用 `\operatorname{dom}`、`\operatorname{ran}`、`\operatorname{ot}`、`\operatorname{Re}`；无参数的名词用 `\mathrm{On}`、`\mathrm{ZFC}`。

## R6　中文夹在公式里用 \text{}

`\text{ 是} X \text{上的}` —— 前后补空格，别和数学挤在一起。

## R7　省略号显式写

运算 / 关系链用 `\cdots`（$a_1 \ni a_2 \ni \cdots$）；逗号列表用 `\ldots`（$x_1, x_2, \ldots$）。**不用 `\dots`**。

## R8　上下划线看长短

单符号或带上下标的用 `\bar{}`（$\bar{\mu}$、$\bar{\mathcal{M}}$、$\bar{z}$）；多字符、要伸展的用 `\overline{}`（$\overline{\mathbb{R}}$）。

## R9　证明方向标记

写 `$(\implies)$` / `$(\Longleftarrow)$`（一对粗箭头）。

## R10　label / tags / refs 是纯文本

⛔ 绝不能含 `$`（label 还直接画在画布上）。**可留 Unicode** —— 画布上没有 KaTeX，留 Unicode 才一致。

> 续见 notation/0-rules.3.md
