/* ==========================================================================
   数学星图 · 记号对照表（真源）
   --------------------------------------------------------------------------
   这是**全图记号的唯一权威**。写任何节点之前先看它；不合规的先转写，再进图。

   ## 为什么要有它

   这张图的内容来自多个来源（用户手写笔记、几门课的讲义、我自己补的教材结果）。
   同一件事在不同来源里记号常常不一样（包含 vs 真包含、补集上划线 vs 上标 c、
   $\varphi$ vs $\phi$……）。**图上混用会让「快速查阅」这件事直接失效** ——
   看见一个记号还得猜它在这个节点里是什么意思。

   所以：**一个记号在全图只有一个意思；写内容时必须用它。**

   ## 三条用户拍板的裁决（2026-09-23）

   1. **补集**：写 `A^{c}`（上标 c），**不写**上划线（`\bar{A}` / `\overline{A}`）。
      用户原话：「概率论的补集会写成上面加一杠，看着就很不舒服，这种都上面加一个 c 就好了」
   2. **包含**：写 `\subseteq`（下横），表示「包含，允许相等」。
   3. **真包含**：写 `\subset`（**没有**下横）。
      用户原话：「包含我喜欢写下面有一个 `_` 的，如果是没有 `_` 的就是真包含，
      有的会把包含写成没有 `_` 的我不太喜欢这种」
      ⛔ 所以 `\subsetneq` 在本图是**禁用写法**（虽然也是标准符号）。

   ## 同名不同义怎么办：按星团消解

   **同一星团内，一个符号只能有一个含义。**
   跨星团同名不同义**允许**（图里的星系本来就是分开的世界），但**必须登记**在本表
   「字母约定」一节里 —— 不登记就等于没有规则。

   ## 谁来执行

   - `tools/build.mjs` 有硬断言：正文里出现裸 Unicode 数学符号、
     或出现本表 `checks.banned` 里的禁用写法 → **构建失败**。
   - `tools/_notationcheck.mjs`（本地工具）出按节点 / 字段的详细报告，
     带启发式检查（标 warn），比构建断言好读。

   ## 数据形状

   - `rules[]`   通用书写规则（R 系列）
   - `groups[]`  分组
   - `entries[]` 记号条目：`{ g 组, tex 规范写法, uni 长相, name 名称, note 说明 }`
   - `checks`    机器可查的规则（构建断言读它）
   - `backlog[]` 已知的、**尚未**修复的老账（诚实记录，别假装为零）

   ⚠️ 只动这一个文件就能改规则；`build.mjs` 与 `_notationcheck.mjs` 都从这里读。
   ========================================================================== */
window.MG = window.MG || {};

MG.notation = {
  version: 1,
  updated: '2026-09-23',

  intro: '全图记号的唯一权威。写节点前先过此表；不合规的先转写再进图。',

  rulings: [
    { id: 'A', text: '补集写 $A^{c}$（上标 c），不写上划线。' },
    { id: 'B', text: '包含写 $\\subseteq$（下横）。' },
    { id: 'C', text: '真包含写 $\\subset$（没有下横）—— $\\subsetneq$ 是禁用写法。' },
  ],

  /* ------------------------------------------------------------- 通用规则 */
  rules: [
    { id: 'R1', title: '一切数学记号写成 LaTeX',
      text: '正文里连 $\\to$、$\\emptyset$ 也要写成 `$\\to$`、`$\\emptyset$`，不写 Unicode 数学符号。' +
        '为什么：Unicode 记号的字体与基线和 KaTeX 渲染出来的公式对不上，混排很丑。' },
    { id: 'R2', title: '行内用单个 $…$，独立成行才用成对的双美元号',
      text: '`$$…$$` 只用于独立成行的 display 公式，不要夹在中文句子中间。' },
    { id: 'R3', title: '集合花括号写 `\\{ \\}`',
      text: 'KaTeX 里裸 `{}` 是隐形分组符，什么都不显示。' },
    { id: 'R4', title: '骨架：对象语言 ⟷ 元语言',
      text: '写在**公理 / 公式内部**的连接词（对象语言）用 `\\wedge \\vee \\neg \\to \\leftrightarrow \\forall \\exists`；' +
        '我们**推理时**说的「推出」「当且仅当」（元语言）用 `\\implies \\iff`。' },
    { id: 'R5', title: '算子写命令形式',
      text: '`\\sup \\inf \\lim \\liminf \\limsup \\max \\min \\ker \\dim \\exp \\log \\sin \\cos`。' +
        '有参数的多字母算子名用 `\\operatorname{dom}`、`\\operatorname{ran}`、`\\operatorname{ot}`、`\\operatorname{Re}`；' +
        '无参数的名词用 `\\mathrm{On}`、`\\mathrm{ZFC}`。' },
    { id: 'R6', title: '中文夹在公式里用 \\text{}',
      text: '`\\text{ 是} X \\text{上的}` —— 前后补空格，别和数学挤在一起。' },
    { id: 'R7', title: '省略号显式写',
      text: '运算 / 关系链用 `\\cdots`（$a_1 \\ni a_2 \\ni \\cdots$）；逗号列表用 `\\ldots`（$x_1, x_2, \\ldots$）。' +
        '**不用 `\\dots`**。' },
    { id: 'R8', title: '上下划线看长短',
      text: '单符号或带上下标的用 `\\bar{}`（$\\bar{\\mu}$、$\\bar{\\mathcal{M}}$、$\\bar{z}$）；' +
        '多字符、要伸展的用 `\\overline{}`（$\\overline{\\mathbb{R}}$）。' },
    { id: 'R9', title: '证明方向标记',
      text: '写 `$(\\implies)$` / `$(\\Longleftarrow)$`（一对粗箭头）。' },
    { id: 'R10', title: 'label / tags / refs 是纯文本',
      text: '⛔ 绝不能含 `$`（label 还直接画在画布上）。**可留 Unicode** —— 画布上没有 KaTeX，留 Unicode 才一致。' },
    { id: 'R11', title: 'title 里的公式也用 $…$',
      text: '`title` 走 `U.titleHtml()`，认 `$…$`。混着写一样的字体问题。（⚠ 目前是**警告级**，见 backlog）' },
    { id: 'R12', title: '行内公式不写在行首',
      text: '中文段落里 `$…$` 前面要有中文或标点。' },
  ],

  /* ----------------------------------------------------------------- 分组 */
  groups: [
    { id: 'set',     name: '逻辑与集合' },
    { id: 'order',   name: '序、基数与序数' },
    { id: 'num',     name: '数系与分析基础' },
    { id: 'topo',    name: '拓扑与度量' },
    { id: 'measure', name: '测度与 σ-代数' },
    { id: 'integral',name: '积分与函数空间' },
    { id: 'letters', name: '字母约定' },
  ],

  /* ----------------------------------------------------------------- 条目 */
  /* tex = 规范写法（LaTeX 命令，写内容时照抄）；uni = 渲染出来长什么样；
     note 只写「容易写错成什么」和「在哪儿有别义」。 */
  entries: [
    /* -------- 逻辑与集合 -------- */
    { g: 'set', tex: '\\forall',      uni: '∀', name: '全称量词' },
    { g: 'set', tex: '\\exists',      uni: '∃', name: '存在量词' },
    { g: 'set', tex: '\\exists!',     uni: '∃!', name: '唯一存在' },
    { g: 'set', tex: '\\neg',         uni: '¬', name: '否定（对象语言）' },
    { g: 'set', tex: '\\wedge',       uni: '∧', name: '合取（对象语言）' },
    { g: 'set', tex: '\\vee',         uni: '∨', name: '析取（对象语言）' },
    { g: 'set', tex: '\\to',          uni: '→', name: '蕴含（对象语言）/ 趋于 / 映射' },
    { g: 'set', tex: '\\leftrightarrow', uni: '↔', name: '等价（对象语言）',
      note: '只用在公理 / 公式**内部**，别和元语言的 `\\iff` 混' },
    { g: 'set', tex: '\\implies',     uni: '⟹', name: '推出（元语言）',
      note: '禁用 `\\Rightarrow`（`,` `\\nRightarrow` 仍可用）' },
    { g: 'set', tex: '\\iff',         uni: '⟺', name: '当且仅当（元语言）',
      note: '禁用 `\\Longleftrightarrow`（同一个字形，只留一个写法）' },
    { g: 'set', tex: '\\Longleftarrow', uni: '⟸', name: '反向证明的方向标记（配 `$(\\implies)$`）',
      note: '⚠ 禁用 `\\impliedby`（同一个字形，只留一个写法）' },
    { g: 'set', tex: '\\langle \\mathbb{N}, \\le \\rangle', uni: '⟨ℕ,≤⟩',
      name: '「集合 + 结构」的配对写法',
      note: '一般对角配对 $\\langle x, y \\rangle$ 也用它；⚠ 与有序对 `(a, b)` 分工：' +
        '结构用尖括号，有序对用圆括号' },
    { g: 'set', tex: '\\models',      uni: '⊨', name: '满足' },
    { g: 'set', tex: '\\vdash',       uni: '⊢', name: '可证明' },
    { g: 'set', tex: '\\in',          uni: '∈', name: '属于' },
    { g: 'set', tex: '\\notin',       uni: '∉', name: '不属于' },
    { g: 'set', tex: '\\subseteq',    uni: '⊆', name: '**包含**（允许相等）', note: '有下横' },
    { g: 'set', tex: '\\subset',      uni: '⊂', name: '**真包含**（不含相等）',
      note: '⛔ 没有下横 —— 用户拍板。禁用 `\\subsetneq`' },
    { g: 'set', tex: '\\supseteq',    uni: '⊇', name: '反向包含（允许相等）' },
    { g: 'set', tex: '\\supset',      uni: '⊃', name: '反向真包含' },
    { g: 'set', tex: '\\cup',         uni: '∪', name: '二元并' },
    { g: 'set', tex: '\\cap',         uni: '∩', name: '二元交' },
    { g: 'set', tex: '\\setminus',    uni: '∖', name: '差集',
      note: '差**不用** `-` 或 `\\backslash`' },
    { g: 'set', tex: 'A^{c}',         uni: 'Aᶜ', name: '**补集**（相对全集 $X$）',
      note: '⛔ 用户拍板：不写上划线。禁用 `\\bar{A}` / `\\overline{A}` / `A\'`；' +
        '也不写 `\\complement`' },
    { g: 'set', tex: '\\bigcup',      uni: '⋃', name: '族的并' },
    { g: 'set', tex: '\\bigcap',      uni: '⋂', name: '族的交' },
    { g: 'set', tex: '\\bigsqcup',    uni: '⨆', name: '可数不交并' },
    { g: 'set', tex: '\\emptyset',    uni: '∅', name: '空集', note: '禁用 `\\varnothing`' },
    { g: 'set', tex: '\\mathcal{P}(X)', uni: '𝒫(X)', name: '幂集',
      note: '幂集**一律**用它；`2^{X}` 只留给「基数幂 / 函数集 $\\{0,1\\}^{X}$」' },
    { g: 'set', tex: '\\{ a, b \\}',  uni: '{a,b}', name: '集合' },
    { g: 'set', tex: '(a, b)',        uni: '(a,b)', name: '有序对' },
    { g: 'set', tex: 'A / \\sim',     uni: 'A/~', name: '商集' },
    { g: 'set', tex: '[a]',           uni: '[a]', name: '等价类' },
    { g: 'set', tex: '\\sim',         uni: '∼', name: '等价关系 / 等价' },
    { g: 'set', tex: '\\times',       uni: '×', name: '笛卡尔积 / 乘积' },
    { g: 'set', tex: '\\{ x : \\ldots \\}', uni: '', name: '集合描述',
      note: '分隔符用 `:`（**不用** `\\mid`）' },
    { g: 'set', tex: '\\rightrightarrows', uni: '⇉', name: '一致收敛' },
    { g: 'set', tex: '\\hookrightarrow', uni: '↪', name: '单射' },
    { g: 'set', tex: '\\upharpoonright', uni: '↾', name: '限制 $f \\upharpoonright A$' },

    /* -------- 序、基数与序数 -------- */
    { g: 'order', tex: '\\preceq',    uni: '⪯', name: '一般偏序关系（抽象偏序集上的）',
      note: '与 `\\le` 分工：抽象偏序用 $\\preceq$，数上 / 序数上用 $\\le$' },
    { g: 'order', tex: '\\sqsubseteq', uni: '⊑', name: '第二个偏序集上的序',
      note: '只在对举两个偏序集时用（如 `def.order-iso`）' },
    { g: 'order', tex: '\\prec',      uni: '≺', name: '严格关系' },
    { g: 'order', tex: '\\le',        uni: '≤', name: '序 / 大小', note: '禁用 `\\leq`' },
    { g: 'order', tex: '\\ge',        uni: '≥', name: '反向序', note: '禁用 `\\geq`' },
    { g: 'order', tex: '\\ne',        uni: '≠', name: '不等', note: '禁用 `\\neq`' },
    { g: 'order', tex: '\\sup S',     uni: 'sup S', name: '上确界', note: '禁用裸写 `sup`' },
    { g: 'order', tex: '\\inf S',     uni: 'inf S', name: '下确界' },
    { g: 'order', tex: '(P, \\preceq)', uni: '', name: '偏序集' },
    { g: 'order', tex: '(W, \\preceq)', uni: '', name: '良序集' },
    { g: 'order', tex: '(\\alpha, \\in)', uni: '', name: '序数（用属于关系排序）' },
    { g: 'order', tex: '\\mathrm{On}', uni: 'On', name: '序数全体', note: '名词 → `\\mathrm{}`' },
    { g: 'order', tex: '\\operatorname{ot}(W)', uni: 'ot(W)', name: '良序集的序型',
      note: '算子名 → `\\operatorname{}`（别写 `\\mathrm{ot}`）' },
    { g: 'order', tex: '\\omega',     uni: 'ω', name: '最小无限序数' },
    { g: 'order', tex: 'V_{\\alpha}', uni: 'V_α', name: '累积层级',
      note: '⚠ 下标别丢：`\\bigcup V_\\alpha` 不是 `\\bigcup \\alpha V\\alpha`' },
    { g: 'order', tex: '\\aleph(X)',  uni: 'ℵ(X)', name: 'Hartogs 数（$X$ 的）',
      note: '与 $\\aleph_0$ 同族但不同义 —— 靠有没有参数区分' },
    { g: 'order', tex: '\\aleph_0',   uni: 'ℵ₀', name: '可数无穷的基数' },
    { g: 'order', tex: '|A|',         uni: '|A|', name: '基数' },

    /* -------- 数系与分析基础 -------- */
    { g: 'num', tex: '\\mathbb{N}',   uni: 'ℕ', name: '自然数' },
    { g: 'num', tex: '\\mathbb{Z}',   uni: 'ℤ', name: '整数' },
    { g: 'num', tex: '\\mathbb{Q}',   uni: 'ℚ', name: '有理数' },
    { g: 'num', tex: '\\mathbb{R}',   uni: 'ℝ', name: '实数' },
    { g: 'num', tex: '\\mathbb{C}',   uni: 'ℂ', name: '复数' },
    { g: 'num', tex: '\\overline{\\mathbb{R}}', uni: 'ℝ̄', name: '扩充实数 $[ -\\infty, +\\infty ]$',
      note: '用 `\\overline{}`（多字符），**不是** `\\bar{\\mathbb{R}}`' },
    { g: 'num', tex: '\\mathbb{R}^{n}', uni: 'ℝⁿ', name: 'n 维欧氏空间' },
    { g: 'num', tex: '(a, b]',        uni: '', name: '半开区间（左开右闭）' },
    { g: 'num', tex: '\\varepsilon',  uni: 'ε', name: '正数 / ε–δ 里的 ε',
      note: '禁用 `\\epsilon`；`\\varepsilon_0` 是另一回事' },
    { g: 'num', tex: '\\delta',       uni: 'δ', name: '小量 / 增量' },
    { g: 'num', tex: '|x|',           uni: '|x|', name: '绝对值' },
    { g: 'num', tex: '\\|f\\|_p',     uni: '‖f‖ₚ', name: 'L^p 范数' },
    { g: 'num', tex: '\\lim_{n \\to \\infty}', uni: '', name: '数列极限' },
    { g: 'num', tex: '\\liminf',      uni: 'lim inf', name: '下极限' },
    { g: 'num', tex: '\\limsup',      uni: 'lim sup', name: '上极限' },
    { g: 'num', tex: '\\sum_{j=1}^{\\infty}', uni: 'Σ', name: '级数',
      note: '⛔ 禁用大写 `\\Sigma` 当求和号' },
    { g: 'num', tex: '\\prod',        uni: '∏', name: '乘积' },
    { g: 'num', tex: '\\mapsto',      uni: '↦', name: '映射到（$x \\mapsto f(x)$）' },
    { g: 'num', tex: '\\cdot',        uni: '·', name: '乘法点' },
    { g: 'num', tex: '\\operatorname{Re}', uni: 'Re', name: '实部' },
    { g: 'num', tex: '\\operatorname{Im}', uni: 'Im', name: '虚部' },
    { g: 'num', tex: '\\bar{z}',      uni: 'z̄', name: '共轭',
      note: '⚠ 共轭用 bar，**补集不用**（补集是 $A^{c}$）' },
    { g: 'num', tex: 'f_n \\uparrow f', uni: '↑', name: '单调递增地趋于',
      note: '集列也一样：$E_n \\uparrow X$；递减写 $\\downarrow$ / $\\searrow$' },
    { g: 'num', tex: '\\nearrow, \\searrow', uni: '↗ ↘', name: '（集列 / 函数列）单调递增 / 递减' },
    { g: 'num', tex: '\\nrightarrow', uni: '↛', name: '不趋于（$\\int f_n = 1 \\nrightarrow 0$）' },
    { g: 'num', tex: 'C \\leftarrow C \\cup \\{ v \\}', uni: '←', name: '赋值：把左边更新成右边（＝「令…为…」）' },

    /* -------- 拓扑与度量 -------- */
    { g: 'topo', tex: '\\mathcal{T}', uni: '𝒯', name: '拓扑' },
    { g: 'topo', tex: '\\mathcal{B}', uni: 'ℬ', name: '拓扑的一组基',
      note: '⚠ 与 $\\mathfrak{B}$（Borel）形近 —— 靠「花体 vs 哥特」区分' },
    { g: 'topo', tex: '\\mathcal{S}', uni: '𝒮', name: '子基' },
    { g: 'topo', tex: 'd(x, y)',      uni: '', name: '距离' },
    { g: 'topo', tex: 'B(x, \\varepsilon)', uni: '', name: '开球' },
    { g: 'topo', tex: '\\mathfrak{B}_X', uni: '𝔅_X', name: 'Borel σ-代数' },

    /* -------- 测度与 σ-代数 -------- */
    { g: 'measure', tex: '\\mu',      uni: 'μ', name: '**测度**', note: '全局唯一含义' },
    { g: 'measure', tex: '\\nu',      uni: 'ν', name: '第二个测度 / 待比较的测度',
      note: '在 `analysis.signed` 专指**符号测度**' },
    { g: 'measure', tex: '\\mu^{*}',  uni: 'μ*', name: '外测度' },
    { g: 'measure', tex: '\\mu_{0}',  uni: 'μ₀', name: '**预测度**',
      note: '⛔ 别写成 `\\pi` 或 `\\rho`（那两处已统一）' },
    { g: 'measure', tex: '\\rho',     uni: 'ρ', name: '预备函数 $\\rho : \\mathcal{E} \\to [0, +\\infty]$，$\\rho(\\emptyset) = 0$',
      note: '只在「从 $\\mathcal{E}$ 上的 $\\rho$ 诱导外测度」那一处；' +
        '在 `analysis.signed` 另表 RN 分解的绝对连续部分' },
    { g: 'measure', tex: '\\mathcal{M}', uni: 'ℳ', name: 'σ-代数 / 可测集全体' },
    { g: 'measure', tex: '\\mathcal{M}(\\mathcal{E})', uni: 'ℳ(ℰ)', name: '由 $\\mathcal{E}$ **生成的** σ-代数' },
    { g: 'measure', tex: '\\mathfrak{m}(\\mathcal{E})', uni: '𝔪(ℰ)', name: '由 $\\mathcal{E}$ 生成的单调类',
      note: '小写哥特，与 $\\mathcal{M}(\\mathcal{E})$ 成对' },
    { g: 'measure', tex: '\\mathcal{A}', uni: '𝒜', name: '代数 / 集合族' },
    { g: 'measure', tex: '\\mathfrak{A}', uni: '𝔄', name: '代数 / 基本类',
      note: '⚠ 在 `logic.fol` 里 $\\mathfrak{A}$ 是**一阶结构**（跨星团同形不同义，已登记）' },
    { g: 'measure', tex: '\\mathcal{E}', uni: 'ℰ', name: '生成元集合族（「设 $\\mathcal{E} \\subseteq \\mathcal{P}(X)$」）' },
    { g: 'measure', tex: '\\mathcal{N}', uni: '𝒩', name: '零集族**或**第二个空间的 σ-代数',
      note: '⚠ 按星团登记：`analysis.measure` 里 = 零集族；`analysis.measurable`、`analysis.product` 里 = 第二个空间的 σ-代数' },
    { g: 'measure', tex: '\\mathcal{L}', uni: 'ℒ', name: 'Lebesgue σ-代数**或**一阶语言',
      note: '⚠ 按星团登记：`analysis.*` 里 = Lebesgue σ-代数；`logic.fol` 里 = 一阶语言' },
    { g: 'measure', tex: '\\mathcal{M} \\otimes \\mathcal{N}', uni: 'ℳ⊗𝒩', name: '积 σ-代数',
      note: '⛔ 禁用裸 `⊗`，要写 `\\otimes`' },
    { g: 'measure', tex: '\\mu \\times \\nu', uni: 'μ×ν', name: '乘积测度' },
    { g: 'measure', tex: 'm',         uni: 'm', name: '$\\mathbb{R}$ 上的 Lebesgue 测度',
      note: '与一般的 $\\mu$ 分工' },
    { g: 'measure', tex: '\\mu_{G}',  uni: 'μ_G', name: '单调函数 $G$ 诱导的 Borel 测度' },
    { g: 'measure', tex: '\\text{a.e.}', uni: 'a.e.', name: '几乎处处' },
    { g: 'measure', tex: '\\nu^{+}, \\nu^{-}, |\\nu|', uni: '', name: '符号测度的正 / 负 / 全变差部分' },
    { g: 'measure', tex: '\\lambda, \\rho', uni: 'λ, ρ', name: 'RN 分解 $\\nu = \\lambda + \\rho$',
      note: '$\\lambda \\perp \\mu$ 奇异部分、$\\rho \\ll \\mu$ 绝对连续部分；' +
        '⚠ `analysis.product` 里 $\\lambda$ 另表乘积测度的完备化，`analysis.lp` 里是 Young 指数' },
    { g: 'measure', tex: '\\ll',      uni: '≪', name: '绝对连续' },
    { g: 'measure', tex: '\\perp',    uni: '⊥', name: '奇异 / 互相垂直' },
    { g: 'measure', tex: '\\sigma',   uni: 'σ', name: '前缀：σ-环 / σ-代数 / σ-有限',
      note: '作为中文术语前缀时写成 `$\\sigma$-代数`' },
    { g: 'measure', tex: '\\mathfrak{B}', uni: '𝔅', name: 'Borel σ-代数' },

    /* -------- 积分与函数空间 -------- */
    { g: 'integral', tex: '\\chi_{E}', uni: 'χ_E', name: '特征函数' },
    { g: 'integral', tex: 'L^{+}',    uni: 'L⁺', name: '非负可测函数全体' },
    { g: 'integral', tex: '\\varphi', uni: 'φ', name: '**简单函数**（$\\varphi = \\sum a_j \\chi_{E_j}$）',
      note: '禁用 `\\phi`；在 `logic.fol` 里 $\\varphi$ 是**一阶公式**' },
    { g: 'integral', tex: '\\psi',    uni: 'ψ', name: '与 $\\varphi$ 配对的第二个函数' },
    { g: 'integral', tex: '\\int \\varphi \\, d\\mu', uni: '∫', name: '积分' },
    { g: 'integral', tex: 'L^{1}',    uni: 'L¹', name: '可积函数空间' },
    { g: 'integral', tex: 'L^{p}, L^{q}', uni: '', name: 'L^p 空间（$p, q$ 共轭指数）' },
    { g: 'integral', tex: 'Hf',       uni: 'Hf', name: '极大函数' },
    { g: 'integral', tex: 'd\\nu / d\\mu', uni: '', name: 'Radon–Nikodym 导数' },
    { g: 'integral', tex: '\\Phi',    uni: 'Φ', name: '连续线性泛函 $\\Phi \\in (L^{p})^{*}$' },
    { g: 'integral', tex: '\\Sigma',  uni: 'Σ', name: '有限支集简单函数全体（`analysis.lp` 局部）',
      note: '⚠ 这个 $\\Sigma$ **不是**求和号' },
    { g: 'integral', tex: '\\partial f / \\partial t', uni: '', name: '偏导' },

    /* -------- 字母约定 -------- */
    { g: 'letters', tex: '\\alpha',   uni: 'α', name: '序数 / 指标',
      note: '局部义：`analysis.differentiation` 里是阈值；`analysis.integral` 里是复相位 $e^{-i\\theta}$' },
    { g: 'letters', tex: '\\beta',    uni: 'β', name: '序数（配 $\\alpha$）' },
    { g: 'letters', tex: '\\gamma',   uni: 'γ', name: '序数（配 $\\alpha$、$\\beta$）/ 一般函数' },
    { g: 'letters', tex: '\\pi',      uni: 'π', name: '投影 $\\pi_{\\alpha}$',
      note: '⚠ 只在 `set.cardinal`、`topology.general` 里表圆周率' },
    { g: 'letters', tex: '\\theta',   uni: 'θ', name: '角度' },
    { g: 'letters', tex: '\\tau',     uni: 'τ', name: '停时 / 一般函数（罕见）' },
    { g: 'letters', tex: '\\zeta',    uni: 'ζ', name: '（罕见）' },
    { g: 'letters', tex: '\\mathcal{C}', uni: '𝒞', name: '证明内局部：Cauchy 列全体 / 递升集合族' },
    { g: 'letters', tex: '\\mathcal{F}', uni: 'ℱ', name: '证明内局部：部分选择函数全体 / 生成元族' },
    { g: 'letters', tex: '\\mathcal{U}, \\mathcal{V}', uni: '', name: '证明内局部：开覆盖 / 有限子覆盖' },
    { g: 'letters', tex: '\\mathcal{D}', uni: '𝒟', name: '证明内局部：链的族' },
    { g: 'letters', tex: '\\mathcal{K}', uni: '𝒦', name: '证明内局部：单调类定理里的试探集族' },
    { g: 'letters', tex: '\\mathrm{ZFC}', uni: 'ZFC', name: '公理系统名（名词 → `\\mathrm{}`）' },
  ],

  /* ------------------------------------------------- 机器可查的规则 */
  checks: {
    /* ⛔ 正文里不许出现裸 Unicode 数学符号（要写成 $…$ 里的 LaTeX） */
    bareUnicode: {
      body: ['statement', 'notes', 'proof', 'proofs', 'note'],
      title: ['title'],
      labelOk: ['label', 'tags', 'refs'],
      chars: '∈∉⊆⊂⊇⊃∪∩∖×∅∀∃¬∧∨⟹⟸⟺⇒⇐⇔≤≥≠≈≅≃→↦←↔⟨⟩∑∏∫∂∞' +
             'ℝℂℚℤℕσμλφϕεϵθαβγδρτωΩΦΨΣΛΔ‖∥⋂⋃⊕⊗⊔·⋯′' +
             '¹²³⁰ⁿ₀₁₂ₙᵏᵢⱼ𝒜ℳℰ𝒫',
    },
    /* ⛔ 禁用写法 → 构建失败 */
    banned: [
      { re: '\\\\subsetneq', fix: '\\\\subset',
        why: '真包含用没有下横的 \\subset（用户拍板）' },
      { re: '\\\\phi(?![a-zA-Z])', fix: '\\\\varphi', why: '小写 phi 一律 \\varphi' },
      { re: '\\\\epsilon(?![a-zA-Z])', fix: '\\\\varepsilon', why: '一律 \\varepsilon' },
      { re: '\\\\varnothing', fix: '\\\\emptyset', why: '空集一律 \\emptyset' },
      { re: '\\\\leq(?![a-zA-Z])', fix: '\\\\le', why: '统一用 \\le' },
      { re: '\\\\geq(?![a-zA-Z])', fix: '\\\\ge', why: '统一用 \\ge' },
      { re: '\\\\neq(?![a-zA-Z])', fix: '\\\\ne', why: '统一用 \\ne' },
      { re: '(?<!n)\\\\Rightarrow', fix: '\\\\implies',
        why: '元语言的「推出」用 \\implies（\\nRightarrow 不受影响）' },
      { re: '\\\\dots(?![a-zA-Z])', fix: '\\\\cdots 或 \\\\ldots', why: '省略号显式写' },
      { re: '\\\\bar\\{\\\\mathbb\\{R\\}\\}', fix: '\\\\overline{\\\\mathbb{R}}',
        why: '扩充实数用 \\overline（多字符）' },
      { re: '\\\\mathrm\\{(?:dom|ran|ot|Re|Im|sgn|span)\\}(?![a-zA-Z])',
        fix: '\\\\operatorname{...}', why: '有参数的算子名用 \\operatorname' },
      { re: '\\\\complement', fix: 'A^{c}', why: '补集用上标 c' },
      { re: '\\\\impliedby', fix: '\\\\Longleftarrow', why: '同字形，只留一个写法' },
      { re: '\\\\Longleftrightarrow', fix: '\\\\iff', why: '同字形，元语言的等价一律 \\iff' },
    ],
  },

  /* ------------------------------------------------------- 已知老账 */
  backlog: [
    { id: 'titles', what: '`title` 里仍有裸 Unicode 数学记号（`title` 也渲染 $…$，' +
        '所以有和正文一样的字体问题）。当前只报**警告**，未批量清理。' },
    { id: 'dollars', what: '正文里有把 `$$…$$` 当行内公式用的地方（`tools/_dollarcheck.mjs`）。' },
  ],
};
