# 记号表 · 通用规则
根 `../`　·　索引 `notation.md`

## R1　一切数学记号写成 LaTeX

正文里连 $\to$、$\emptyset$ 也要写成 `$\to$`、`$\emptyset$`，不写 Unicode 数学符号。为什么：Unicode 记号的字体与基线和 KaTeX 渲染出来的公式对不上，混排很丑。

## R2　行内用单个 $…$，独立成行才用成对的双美元号

`$$…$$` 只用于独立成行的 display 公式，不要夹在中文句子中间。

## R3　集合花括号写 `\{ \}`

KaTeX 里裸 `{}` 是隐形分组符，什么都不显示。

## R4　骨架：对象语言 ⟷ 元语言

写在**公理 / 公式内部**的连接词（对象语言）用 `\wedge \vee \neg \to \leftrightarrow \forall \exists`；我们**推理时**说的「推出」「当且仅当」（元语言）用 `\implies \iff`。

## R5　算子写命令形式

> 续见 notation/0-rules.2.md
