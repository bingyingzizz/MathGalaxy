# 数学星图 · 记号对照表

全图记号的唯一权威。写节点前先过此表；不合规的先转写再进图。

> 真源 `src/data/notation.js` · 版本 v1 · 更新 2026-09-23

## 铁律（用户拍板）

- **A** 补集写 $A^{c}$（上标 c），不写上划线。
- **B** 包含写 $\subseteq$（下横）。
- **C** 真包含写 $\subset$（没有下横）—— $\subsetneq$ 是禁用写法。

## 通用规则 R 系列

### R1　一切数学记号写成 LaTeX

正文里连 $\to$、$\emptyset$ 也要写成 `$\to$`、`$\emptyset$`，不写 Unicode 数学符号。为什么：Unicode 记号的字体与基线和 KaTeX 渲染出来的公式对不上，混排很丑。

### R2　行内用单个 $…$，独立成行才用成对的双美元号

`$$…$$` 只用于独立成行的 display 公式，不要夹在中文句子中间。

### R3　集合花括号写 `\{ \}`

KaTeX 里裸 `{}` 是隐形分组符，什么都不显示。

### R4　骨架：对象语言 ⟷ 元语言

写在**公理 / 公式内部**的连接词（对象语言）用 `\wedge \vee \neg \to \leftrightarrow \forall \exists`；我们**推理时**说的「推出」「当且仅当」（元语言）用 `\implies \iff`。

### R5　算子写命令形式

`\sup \inf \lim \liminf \limsup \max \min \ker \dim \exp \log \sin \cos`。有参数的多字母算子名用 `\operatorname{dom}`、`\operatorname{ran}`、`\operatorname{ot}`、`\operatorname{Re}`；无参数的名词用 `\mathrm{On}`、`\mathrm{ZFC}`。

### R6　中文夹在公式里用 \text{}

`\text{ 是} X \text{上的}` —— 前后补空格，别和数学挤在一起。

### R7　省略号显式写

运算 / 关系链用 `\cdots`（$a_1 \ni a_2 \ni \cdots$）；逗号列表用 `\ldots`（$x_1, x_2, \ldots$）。**不用 `\dots`**。

### R8　上下划线看长短

单符号或带上下标的用 `\bar{}`（$\bar{\mu}$、$\bar{\mathcal{M}}$、$\bar{z}$）；多字符、要伸展的用 `\overline{}`（$\overline{\mathbb{R}}$）。

### R9　证明方向标记

写 `$(\implies)$` / `$(\Longleftarrow)$`（一对粗箭头）。

### R10　label / tags / refs 是纯文本

⛔ 绝不能含 `$`（label 还直接画在画布上）。**可留 Unicode** —— 画布上没有 KaTeX，留 Unicode 才一致。

### R11　title 里的公式也用 $…$

`title` 走 `U.titleHtml()`，认 `$…$`。混着写会有和正文一样的字体问题。⚠️ **例外**：**术语前缀保留 Unicode** —— `σ-代数`、`σ-有限`、`σ-环`、`μ-零集` 这类「希腊字母 + `-` + 词」是中文术语的一部分，当公式看反而怪（用户拍板）。

### R12　行内公式不写在行首

中文段落里 `$…$` 前面要有中文或标点。

## 记号条目

### 逻辑与集合

- `\forall` ∀　**全称量词**
- `\exists` ∃　**存在量词**
- `\exists!` ∃!　**唯一存在**
- `\neg` ¬　**否定（对象语言）**
- `\wedge` ∧　**合取（对象语言）**
- `\vee` ∨　**析取（对象语言）**
- `\to` →　**蕴含（对象语言）/ 趋于 / 映射**
- `\leftrightarrow` ↔　**等价（对象语言）** — 只用在公理 / 公式**内部**，别和元语言的 `\iff` 混
- `\implies` ⟹　**推出（元语言）** — 禁用 `\Rightarrow`（`,` `\nRightarrow` 仍可用）
- `\iff` ⟺　**当且仅当（元语言）** — 禁用 `\Longleftrightarrow`（同一个字形，只留一个写法）
- `\Longleftarrow` ⟸　**反向证明的方向标记（配 `$(\implies)$`）** — ⚠ 禁用 `\impliedby`（同一个字形，只留一个写法）
- `\langle \mathbb{N}, \le \rangle` ⟨ℕ,≤⟩　**「集合 + 结构」的配对写法** — 一般对角配对 $\langle x, y \rangle$ 也用它；⚠ 与有序对 `(a, b)` 分工：结构用尖括号，有序对用圆括号
- `\models` ⊨　**满足**
- `\vdash` ⊢　**可证明**
- `\in` ∈　**属于**
- `\notin` ∉　**不属于**
- `\subseteq` ⊆　**包含（允许相等）** — 有下横
- `\subset` ⊂　**真包含（不含相等）** — ⛔ 没有下横 —— 用户拍板。禁用 `\subsetneq`
- `\supseteq` ⊇　**反向包含（允许相等）**
- `\supset` ⊃　**反向真包含**
- `\cup` ∪　**二元并**
- `\cap` ∩　**二元交**
- `\setminus` ∖　**差集** — 差**不用** `-` 或 `\backslash`
- `A^{c}` Aᶜ　**补集（相对全集 $X$）** — ⛔ 用户拍板：不写上划线。禁用 `\bar{A}` / `\overline{A}` / `A'`；也不写 `\complement`
- `\bigcup` ⋃　**族的并**
- `\bigcap` ⋂　**族的交**
- `\bigsqcup` ⨆　**可数不交并**
- `\emptyset` ∅　**空集** — 禁用 `\varnothing`
- `\mathcal{P}(X)` 𝒫(X)　**幂集** — 幂集**一律**用它；`2^{X}` 只留给「基数幂 / 函数集 $\{0,1\}^{X}$」
- `\{ a, b \}` {a,b}　**集合**
- `(a, b)` (a,b)　**有序对**
- `A / \sim` A/~　**商集**
- `[a]` [a]　**等价类**
- `\sim` ∼　**等价关系 / 等价**
- `\times` ×　**笛卡尔积 / 乘积**
- `\{ x : \ldots \}`　**集合描述** — 分隔符用 `:`（**不用** `\mid`）
- `\rightrightarrows` ⇉　**一致收敛**
- `\hookrightarrow` ↪　**单射**
- `\upharpoonright` ↾　**限制 $f \upharpoonright A$**

### 序、基数与序数

- `\preceq` ⪯　**一般偏序关系（抽象偏序集上的）** — 与 `\le` 分工：抽象偏序用 $\preceq$，数上 / 序数上用 $\le$
- `\sqsubseteq` ⊑　**第二个偏序集上的序** — 只在对举两个偏序集时用（如 `def.order-iso`）
- `\prec` ≺　**严格关系**
- `\le` ≤　**序 / 大小** — 禁用 `\leq`
- `\ge` ≥　**反向序** — 禁用 `\geq`
- `\ne` ≠　**不等** — 禁用 `\neq`
- `\sup S` sup S　**上确界** — 禁用裸写 `sup`
- `\inf S` inf S　**下确界**
- `(P, \preceq)`　**偏序集**
- `(W, \preceq)`　**良序集**
- `(\alpha, \in)`　**序数（用属于关系排序）**
- `\mathrm{On}` On　**序数全体** — 名词 → `\mathrm{}`
- `\operatorname{ot}(W)` ot(W)　**良序集的序型** — 算子名 → `\operatorname{}`（别写 `\mathrm{ot}`）
- `\omega` ω　**最小无限序数**
- `V_{\alpha}` V_α　**累积层级** — ⚠ 下标别丢：`\bigcup V_\alpha` 不是 `\bigcup \alpha V\alpha`
- `\aleph(X)` ℵ(X)　**Hartogs 数（$X$ 的）** — 与 $\aleph_0$ 同族但不同义 —— 靠有没有参数区分
- `\aleph_0` ℵ₀　**可数无穷的基数**
- `|A|` |A|　**基数**

### 数系与分析基础

- `\mathbb{N}` ℕ　**自然数**
- `\mathbb{Z}` ℤ　**整数**
- `\mathbb{Q}` ℚ　**有理数**
- `\mathbb{R}` ℝ　**实数**
- `\mathbb{C}` ℂ　**复数**
- `\overline{\mathbb{R}}` ℝ̄　**扩充实数 $[ -\infty, +\infty ]$** — 用 `\overline{}`（多字符），**不是** `\bar{\mathbb{R}}`
- `\mathbb{R}^{n}` ℝⁿ　**n 维欧氏空间**
- `(a, b]`　**半开区间（左开右闭）**
- `\varepsilon` ε　**正数 / ε–δ 里的 ε** — 禁用 `\epsilon`；`\varepsilon_0` 是另一回事
- `\delta` δ　**小量 / 增量**
- `|x|` |x|　**绝对值**
- `\|f\|_p` ‖f‖ₚ　**L^p 范数**
- `\lim_{n \to \infty}`　**数列极限**
- `\liminf` lim inf　**下极限**
- `\limsup` lim sup　**上极限**
- `\sum_{j=1}^{\infty}` Σ　**级数** — ⛔ 禁用大写 `\Sigma` 当求和号
- `\prod` ∏　**乘积**
- `\mapsto` ↦　**映射到（$x \mapsto f(x)$）**
- `\cdot` ·　**乘法点**
- `\operatorname{Re}` Re　**实部**
- `\operatorname{Im}` Im　**虚部**
- `\bar{z}` z̄　**共轭** — ⚠ 共轭用 bar，**补集不用**（补集是 $A^{c}$）
- `f_n \uparrow f` ↑　**单调递增地趋于** — 集列也一样：$E_n \uparrow X$；递减写 $\downarrow$ / $\searrow$
- `\nearrow, \searrow` ↗ ↘　**（集列 / 函数列）单调递增 / 递减**
- `\nrightarrow` ↛　**不趋于（$\int f_n = 1 \nrightarrow 0$）**
- `C \leftarrow C \cup \{ v \}` ←　**赋值：把左边更新成右边（＝「令…为…」）**

### 拓扑与度量

- `\mathcal{T}` 𝒯　**拓扑**
- `\mathcal{B}` ℬ　**拓扑的一组基** — ⚠ 与 $\mathfrak{B}$（Borel）形近 —— 靠「花体 vs 哥特」区分
- `\mathcal{S}` 𝒮　**子基**
- `d(x, y)`　**距离**
- `B(x, \varepsilon)`　**开球**
- `\mathfrak{B}_X` 𝔅_X　**Borel σ-代数**

### 测度与 σ-代数

- `\mu` μ　**测度** — 全局唯一含义
- `\nu` ν　**第二个测度 / 待比较的测度** — 在 `analysis.signed` 专指**符号测度**
- `\mu^{*}` μ*　**外测度**
- `\mu_{0}` μ₀　**预测度** — ⛔ 别写成 `\pi` 或 `\rho`（那两处已统一）
- `\rho` ρ　**预备函数 $\rho : \mathcal{E} \to [0, +\infty]$，$\rho(\emptyset) = 0$** — 只在「从 $\mathcal{E}$ 上的 $\rho$ 诱导外测度」那一处；在 `analysis.signed` 另表 RN 分解的绝对连续部分
- `\mathcal{M}` ℳ　**σ-代数 / 可测集全体**
- `\mathcal{M}(\mathcal{E})` ℳ(ℰ)　**由 $\mathcal{E}$ 生成的 σ-代数**
- `\mathfrak{m}(\mathcal{E})` 𝔪(ℰ)　**由 $\mathcal{E}$ 生成的单调类** — 小写哥特，与 $\mathcal{M}(\mathcal{E})$ 成对
- `\mathcal{A}` 𝒜　**代数 / 集合族**
- `\mathfrak{A}` 𝔄　**代数 / 基本类** — ⚠ 在 `logic.fol` 里 $\mathfrak{A}$ 是**一阶结构**（跨星团同形不同义，已登记）
- `\mathcal{E}` ℰ　**生成元集合族（「设 $\mathcal{E} \subseteq \mathcal{P}(X)$」）**
- `\mathcal{N}` 𝒩　**零集族或第二个空间的 σ-代数** — ⚠ 按星团登记：`analysis.measure` 里 = 零集族；`analysis.measurable`、`analysis.product` 里 = 第二个空间的 σ-代数
- `\mathcal{L}` ℒ　**Lebesgue σ-代数或一阶语言** — ⚠ 按星团登记：`analysis.*` 里 = Lebesgue σ-代数；`logic.fol` 里 = 一阶语言
- `\mathcal{M} \otimes \mathcal{N}` ℳ⊗𝒩　**积 σ-代数** — ⛔ 禁用裸 `⊗`，要写 `\otimes`
- `\mu \times \nu` μ×ν　**乘积测度**
- `m` m　**$\mathbb{R}$ 上的 Lebesgue 测度** — 与一般的 $\mu$ 分工
- `\mu_{G}` μ_G　**单调函数 $G$ 诱导的 Borel 测度**
- `\text{a.e.}` a.e.　**几乎处处**
- `\nu^{+}, \nu^{-}, |\nu|`　**符号测度的正 / 负 / 全变差部分**
- `\lambda, \rho` λ, ρ　**RN 分解 $\nu = \lambda + \rho$** — $\lambda \perp \mu$ 奇异部分、$\rho \ll \mu$ 绝对连续部分；⚠ `analysis.product` 里 $\lambda$ 另表乘积测度的完备化，`analysis.lp` 里是 Young 指数
- `\ll` ≪　**绝对连续**
- `\perp` ⊥　**奇异 / 互相垂直**
- `\sigma` σ　**前缀：σ-环 / σ-代数 / σ-有限** — 正文里写 `$\sigma$代数`；`title` 里作为**中文术语前缀**保留 Unicode（`σ-代数`）—— 用户拍板
- `\mathfrak{B}` 𝔅　**Borel σ-代数**

### 积分与函数空间

- `\chi_{E}` χ_E　**特征函数**
- `L^{+}` L⁺　**非负可测函数全体**
- `\varphi` φ　**简单函数（$\varphi = \sum a_j \chi_{E_j}$）** — 禁用 `\phi`；在 `logic.fol` 里 $\varphi$ 是**一阶公式**
- `\psi` ψ　**与 $\varphi$ 配对的第二个函数**
- `\int \varphi \, d\mu` ∫　**积分**
- `L^{1}` L¹　**可积函数空间**
- `L^{p}, L^{q}`　**L^p 空间（$p, q$ 共轭指数）**
- `Hf` Hf　**极大函数**
- `d\nu / d\mu`　**Radon–Nikodym 导数**
- `\Phi` Φ　**连续线性泛函 $\Phi \in (L^{p})^{*}$**
- `\Sigma` Σ　**有限支集简单函数全体（`analysis.lp` 局部）** — ⚠ 这个 $\Sigma$ **不是**求和号
- `\partial f / \partial t`　**偏导**

### 字母约定

- `\alpha` α　**序数 / 指标** — 局部义：`analysis.differentiation` 里是阈值；`analysis.integral` 里是复相位 $e^{-i\theta}$
- `\beta` β　**序数（配 $\alpha$）**
- `\gamma` γ　**序数（配 $\alpha$、$\beta$）/ 一般函数**
- `\pi` π　**投影 $\pi_{\alpha}$** — ⚠ 只在 `set.cardinal`、`topology.general` 里表圆周率
- `\theta` θ　**角度**
- `\tau` τ　**停时 / 一般函数（罕见）**
- `\zeta` ζ　**（罕见）**
- `\mathcal{C}` 𝒞　**证明内局部：Cauchy 列全体 / 递升集合族**
- `\mathcal{F}` ℱ　**证明内局部：部分选择函数全体 / 生成元族**
- `\mathcal{U}, \mathcal{V}`　**证明内局部：开覆盖 / 有限子覆盖**
- `\mathcal{D}` 𝒟　**证明内局部：链的族**
- `\mathcal{K}` 𝒦　**证明内局部：单调类定理里的试探集族**
- `\mathrm{ZFC}` ZFC　**公理系统名（名词 → `\mathrm{}`）**

## 已知老账

- 正文里有把 `$$…$$` 当行内公式用的地方（`tools/_dollarcheck.mjs`）。

## 怎么执行

- `bun tools/build.mjs` —— 正文出现裸 Unicode 数学符号、或表里的禁用写法时**直接失败**。
- `bun tools/_notationcheck.mjs` —— 详细报告（按节点 / 字段），另有启发式警告与「用到了却没规则」。
- 新内容进来**先过此表**：不合规的先转写，再进 `src/data/packs/`。
