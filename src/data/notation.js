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

  intro: '全图数学记号的写法。同一星团内一个符号只有一个含义；跨星团同名不同义在表里注明。',

  rulings: [
    { id: 'A', text: '补集写 $A^{c}$。' },
    { id: 'B', text: '包含写 $\\subseteq$。' },
    { id: 'C', text: '真包含写 $\\subset$。' },
  ],

  /* ------------------------------------------------------------- 通用规则 */
  rules: [
    { id: 'R1', title: '一切数学记号写成 LaTeX',
      text: '正文里连 $\\to$、$\\emptyset$ 也要写成 `$\\to$`、`$\\emptyset$`。' +
        'Unicode 记号的字体与基线和 KaTeX 渲染出来的公式对不上。' },
    { id: 'R2', title: '行内公式用 $…$，独立成行的用 $$…$$',
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
      text: '不能含 `$`：label 直接画在画布上，那里没有 KaTeX，所以留 Unicode。' },
    { id: 'R11', title: 'title 里的公式也用 $…$',
      text: '`title` 走 `U.titleHtml()`，认 `$…$`。混着写会有和正文一样的字体问题。' +
        '**例外**：`σ-代数`、`σ-有限`、`σ-环`、`μ-零集` 这类' +
        '「希腊字母 + `-` + 词」的术语前缀保留 Unicode。' },
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
    { id: 'layout',  name: '排版与箭头' },
    { id: 'cat',     name: '范畴与同调' },
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
      note: '只用于公理 / 公式内部' },
    { g: 'set', tex: '\\implies',     uni: '⟹', name: '推出（元语言）',
      note: '范畴论里同一字形也当**自然变换**用（$F \\implies G$）：夹在两个函子之间就是变换，不是推出。' },
    { g: 'set', tex: '\\iff',         uni: '⟺', name: '当且仅当（元语言）' },
    { g: 'set', tex: '\\Longleftarrow', uni: '⟸', name: '反向证明的方向标记（配 `$(\\implies)$`）' },
    { g: 'set', tex: '\\langle \\mathbb{N}, \\le \\rangle', uni: '⟨ℕ,≤⟩',
      name: '「集合 + 结构」的配对写法' },
    { g: 'set', tex: '\\models',      uni: '⊨', name: '满足' },
    { g: 'set', tex: '\\vdash',       uni: '⊢', name: '可证明' },
    { g: 'set', tex: '\\in',          uni: '∈', name: '属于' },
    { g: 'set', tex: '\\notin',       uni: '∉', name: '不属于' },
    { g: 'set', tex: '\\subseteq',    uni: '⊆', name: '**包含**（允许相等）' },
    { g: 'set', tex: '\\subset',      uni: '⊂', name: '**真包含**（不含相等）' },
    { g: 'set', tex: '\\supseteq',    uni: '⊇', name: '反向包含（允许相等）' },
    { g: 'set', tex: '\\supset',      uni: '⊃', name: '反向真包含' },
    { g: 'set', tex: '\\cup',         uni: '∪', name: '二元并' },
    { g: 'set', tex: '\\cap',         uni: '∩', name: '二元交' },
    { g: 'set', tex: '\\setminus',    uni: '∖', name: '差集' },
    { g: 'set', tex: 'A^{c}',         uni: 'Aᶜ', name: '**补集**（相对全集 $X$）' },
    { g: 'set', tex: '\\bigcup',      uni: '⋃', name: '族的并' },
    { g: 'set', tex: '\\bigcap',      uni: '⋂', name: '族的交' },
    { g: 'set', tex: '\\bigsqcup',    uni: '⨆', name: '可数不交并' },
    { g: 'set', tex: '\\emptyset',    uni: '∅', name: '空集' },
    { g: 'set', tex: '\\mathcal{P}(X)', uni: '𝒫(X)', name: '幂集',
      note: '`2^{X}` 只用于基数幂 / 函数集' },
    { g: 'set', tex: '\\{ a, b \\}',  uni: '{a,b}', name: '集合' },
    { g: 'set', tex: '(a, b)',        uni: '(a,b)', name: '有序对' },
    { g: 'set', tex: 'A / \\sim',     uni: 'A/~', name: '商集' },
    { g: 'set', tex: '[a]',           uni: '[a]', name: '等价类' },
    { g: 'set', tex: '\\sim',         uni: '∼', name: '等价关系 / 等价' },
    { g: 'set', tex: '\\times',       uni: '×', name: '笛卡尔积 / 乘积' },
    { g: 'set', tex: '\\{ x : \\ldots \\}', uni: '', name: '集合描述' },
    { g: 'set', tex: '\\rightrightarrows', uni: '⇉', name: '一致收敛' },
    { g: 'set', tex: '\\hookrightarrow', uni: '↪', name: '单射 / 嵌入',
      note: '两种意思都在用：集合论里读「单射」，范畴论里读「**嵌入**」（子范畴进大范畴、Yoneda 嵌入、切片范畴的嵌入）。' },
    { g: 'set', tex: '\\upharpoonright', uni: '↾', name: '限制 $f \\upharpoonright A$' },

    /* -------- 序、基数与序数 -------- */
    { g: 'order', tex: '\\preceq',    uni: '⪯', name: '一般偏序关系（抽象偏序集上的）',
      note: '抽象偏序集上的序' },
    { g: 'order', tex: '\\sqsubseteq', uni: '⊑', name: '第二个偏序集上的序',
      note: '只在对举两个偏序集时用' },
    { g: 'order', tex: '\\prec',      uni: '≺', name: '严格关系' },
    { g: 'order', tex: '\\le',        uni: '≤', name: '序 / 大小' },
    { g: 'order', tex: '\\ge',        uni: '≥', name: '反向序' },
    { g: 'order', tex: '\\ne',        uni: '≠', name: '不等' },
    { g: 'order', tex: '\\sup S',     uni: 'sup S', name: '上确界' },
    { g: 'order', tex: '\\inf S',     uni: 'inf S', name: '下确界' },
    { g: 'order', tex: '(P, \\preceq)', uni: '', name: '偏序集' },
    { g: 'order', tex: '(W, \\preceq)', uni: '', name: '良序集' },
    { g: 'order', tex: '(\\alpha, \\in)', uni: '', name: '序数（用属于关系排序）' },
    { g: 'order', tex: '\\mathrm{On}', uni: 'On', name: '序数全体' },
    { g: 'order', tex: '\\operatorname{ot}(W)', uni: 'ot(W)', name: '良序集的序型' },
    { g: 'order', tex: '\\omega',     uni: 'ω', name: '最小无限序数' },
    { g: 'order', tex: 'V_{\\alpha}', uni: 'V_α', name: '累积层级' },
    { g: 'order', tex: '\\aleph(X)',  uni: 'ℵ(X)', name: 'Hartogs 数（$X$ 的）',
      note: '与 $\\aleph_0$ 同族，靠有没有参数区分' },
    { g: 'order', tex: '\\aleph_0',   uni: 'ℵ₀', name: '可数无穷的基数' },
    { g: 'order', tex: '|A|',         uni: '|A|', name: '基数' },

    /* -------- 数系与分析基础 -------- */
    { g: 'num', tex: '\\mathbb{N}',   uni: 'ℕ', name: '自然数' },
    { g: 'num', tex: '\\mathbb{Z}',   uni: 'ℤ', name: '整数' },
    { g: 'num', tex: '\\mathbb{Q}',   uni: 'ℚ', name: '有理数' },
    { g: 'num', tex: '\\mathbb{R}',   uni: 'ℝ', name: '实数' },
    { g: 'num', tex: '\\mathbb{C}',   uni: 'ℂ', name: '复数' },
    { g: 'num', tex: '\\overline{\\mathbb{R}}', uni: 'ℝ̄', name: '扩充实数 $[ -\\infty, +\\infty ]$' },
    { g: 'num', tex: '\\mathbb{R}^{n}', uni: 'ℝⁿ', name: 'n 维欧氏空间' },
    { g: 'num', tex: '(a, b]',        uni: '', name: '半开区间（左开右闭）' },
    { g: 'num', tex: '\\varepsilon',  uni: 'ε', name: '正数 / ε–δ 里的 ε' },
    { g: 'num', tex: '\\delta',       uni: 'δ', name: '小量 / 增量' },
    { g: 'num', tex: '|x|',           uni: '|x|', name: '绝对值' },
    { g: 'num', tex: '\\|f\\|_p',     uni: '‖f‖ₚ', name: 'L^p 范数' },
    { g: 'num', tex: '\\lim_{n \\to \\infty}', uni: '', name: '数列极限' },
    { g: 'num', tex: '\\liminf',      uni: 'lim inf', name: '下极限' },
    { g: 'num', tex: '\\limsup',      uni: 'lim sup', name: '上极限' },
    { g: 'num', tex: '\\sum_{j=1}^{\\infty}', uni: 'Σ', name: '级数' },
    { g: 'num', tex: '\\prod',        uni: '∏', name: '乘积' },
    { g: 'num', tex: '\\mapsto',      uni: '↦', name: '映射到（$x \\mapsto f(x)$）' },
    { g: 'num', tex: '\\cdot',        uni: '·', name: '乘法点' },
    { g: 'num', tex: '\\operatorname{Re}', uni: 'Re', name: '实部' },
    { g: 'num', tex: '\\operatorname{Im}', uni: 'Im', name: '虚部' },
    { g: 'num', tex: '\\bar{z}',      uni: 'z̄', name: '共轭' },
    { g: 'num', tex: 'f_n \\uparrow f', uni: '↑', name: '单调递增地趋于',
      note: '集列同理：$E_n \\uparrow X$；递减写 $\\downarrow$' },
    { g: 'num', tex: '\\nearrow, \\searrow', uni: '↗ ↘', name: '（集列 / 函数列）单调递增 / 递减' },
    { g: 'num', tex: '\\nrightarrow', uni: '↛', name: '不趋于（$\\int f_n = 1 \\nrightarrow 0$）' },
    { g: 'num', tex: 'C \\leftarrow C \\cup \\{ v \\}', uni: '←', name: '赋值：把左边更新成右边（＝「令…为…」）' },

    /* -------- 拓扑与度量 -------- */
    { g: 'topo', tex: '\\mathcal{T}', uni: '𝒯', name: '拓扑' },
    { g: 'topo', tex: '\\mathcal{B}', uni: 'ℬ', name: '拓扑的一组基' },
    { g: 'topo', tex: '\\mathcal{S}', uni: '𝒮', name: '子基' },
    { g: 'topo', tex: 'd(x, y)',      uni: '', name: '距离' },
    { g: 'topo', tex: 'B(x, \\varepsilon)', uni: '', name: '开球' },
    { g: 'topo', tex: '\\mathfrak{B}_X', uni: '𝔅_X', name: 'Borel σ-代数' },

    /* -------- 测度与 σ-代数 -------- */
    { g: 'measure', tex: '\\mu',      uni: 'μ', name: '**测度**' },
    { g: 'measure', tex: '\\nu',      uni: 'ν', name: '第二个测度 / 待比较的测度',
      note: '符号测度那一支里专指符号测度' },
    { g: 'measure', tex: '\\mu^{*}',  uni: 'μ*', name: '外测度' },
    { g: 'measure', tex: '\\mu_{0}',  uni: 'μ₀', name: '**预测度**' },
    { g: 'measure', tex: '\\rho',     uni: 'ρ', name: '预备函数 $\\rho : \\mathcal{E} \\to [0, +\\infty]$，$\\rho(\\emptyset) = 0$',
      note: '$\\mathcal{E}$ 上用来定义外测度的预备函数' },
    { g: 'measure', tex: '\\mathcal{M}', uni: 'ℳ', name: 'σ-代数 / 可测集全体' },
    { g: 'measure', tex: '\\mathcal{M}(\\mathcal{E})', uni: 'ℳ(ℰ)', name: '由 $\\mathcal{E}$ **生成的** σ-代数' },
    { g: 'measure', tex: '\\mathfrak{m}(\\mathcal{E})', uni: '𝔪(ℰ)', name: '由 $\\mathcal{E}$ 生成的单调类',
      note: '与 $\\mathcal{M}(\\mathcal{E})$ 成对' },
    { g: 'measure', tex: '\\mathcal{A}', uni: '𝒜', name: '代数 / 集合族' },
    { g: 'measure', tex: '\\mathfrak{A}', uni: '𝔄', name: '代数 / 基本类',
      note: '测度论里是代数 / 基本类；一阶逻辑里是一阶结构' },
    { g: 'measure', tex: '\\mathcal{E}', uni: 'ℰ', name: '生成元集合族（「设 $\\mathcal{E} \\subseteq \\mathcal{P}(X)$」）' },
    { g: 'measure', tex: '\\mathcal{N}', uni: '𝒩', name: '零集族**或**第二个空间的 σ-代数',
      note: '测度的构造里是零集族；可测函数 / 乘积测度里是第二个空间的 $\\sigma$ 代数' },
    { g: 'measure', tex: '\\mathcal{L}', uni: 'ℒ', name: 'Lebesgue σ-代数**或**一阶语言',
      note: '分析里是 Lebesgue $\\sigma$ 代数；一阶逻辑里是一阶语言' },
    { g: 'measure', tex: '\\mathcal{M} \\otimes \\mathcal{N}', uni: 'ℳ⊗𝒩', name: '积 σ-代数' },
    { g: 'measure', tex: '\\bigotimes_{j} \\mathfrak{B}_{X_{j}}', uni: '⨂', name: '可数积的 σ-代数（各坐标 σ-代数之积）',
      note: '与 $\\mathcal{M} \\otimes \\mathcal{N}$ 是同一个东西，$\\bigotimes$ 用于多指标' },
    { g: 'measure', tex: '\\mu \\times \\nu', uni: 'μ×ν', name: '乘积测度' },
    { g: 'measure', tex: 'm',         uni: 'm', name: '$\\mathbb{R}$ 上的 Lebesgue 测度' },
    { g: 'measure', tex: '\\mu_{G}',  uni: 'μ_G', name: '单调函数 $G$ 诱导的 Borel 测度' },
    { g: 'measure', tex: '\\text{a.e.}', uni: 'a.e.', name: '几乎处处' },
    { g: 'measure', tex: '\\nu^{+}, \\nu^{-}, |\\nu|', uni: '', name: '符号测度的正 / 负 / 全变差部分' },
    { g: 'measure', tex: '\\lambda, \\rho', uni: 'λ, ρ', name: 'RN 分解 $\\nu = \\lambda + \\rho$',
      note: 'RN 分解的两部分：$\\lambda$ 奇异、$\\rho$ 绝对连续' },
    { g: 'measure', tex: '\\ll',      uni: '≪', name: '绝对连续' },
    { g: 'measure', tex: '\\perp',    uni: '⊥', name: '奇异 / 互相垂直' },
    { g: 'measure', tex: '\\sigma',   uni: 'σ', name: '前缀：σ-环 / σ-代数 / σ-有限',
      note: '`title` 里作为术语前缀时保留 Unicode（`σ-代数`）' },
    { g: 'measure', tex: '\\mathfrak{B}', uni: '𝔅', name: 'Borel σ-代数' },

    /* -------- 积分与函数空间 -------- */
    { g: 'integral', tex: '\\chi_{E}', uni: 'χ_E', name: '特征函数' },
    { g: 'integral', tex: 'L^{+}',    uni: 'L⁺', name: '非负可测函数全体' },
    { g: 'integral', tex: '\\varphi', uni: 'φ', name: '**简单函数**（$\\varphi = \\sum a_j \\chi_{E_j}$）',
      note: '一阶逻辑里是一阶公式' },
    { g: 'integral', tex: '\\psi',    uni: 'ψ', name: '与 $\\varphi$ 配对的第二个函数' },
    { g: 'integral', tex: '\\int \\varphi \\, d\\mu', uni: '∫', name: '积分' },
    { g: 'integral', tex: 'L^{1}',    uni: 'L¹', name: '可积函数空间' },
    { g: 'integral', tex: 'L^{p}, L^{q}', uni: '', name: 'L^p 空间（$p, q$ 共轭指数）' },
    { g: 'integral', tex: 'Hf',       uni: 'Hf', name: '极大函数' },
    { g: 'integral', tex: 'd\\nu / d\\mu', uni: '', name: 'Radon–Nikodym 导数' },
    { g: 'integral', tex: '\\Phi',    uni: 'Φ', name: '连续线性泛函 $\\Phi \\in (L^{p})^{*}$；**范畴论里作伴随的双射** $\\Phi_{X,Y}$' },
    { g: 'integral', tex: '\\Sigma',  uni: 'Σ', name: '有限支集简单函数全体（`analysis.lp` 局部）' },
    { g: 'integral', tex: '\\partial f / \\partial t', uni: '', name: '偏导' },

    /* -------- 排版与箭头 -------- */
    { g: 'layout', tex: '\\bigl( \\bigr)',  uni: '（ ）', name: '按内容伸缩的括号',
      note: '**成对写**，别只写左边。' },
    { g: 'layout', tex: '\\Bigl( \\Bigr)',  uni: '（ ）', name: '按内容伸缩的括号（大一号）',
      note: '里外两层时，外层用 `\\Bigl \\Bigr`、内层用 `\\bigl \\bigr`。' },
    { g: 'layout', tex: '\\scriptstyle',  uni: '', name: '缩小一号',
      note: '只用在交换图的 $\\begin{array}$ 里给边注（如 $\\downarrow\\scriptstyle{f}$）压字号，正文里不用。' },
    { g: 'layout', tex: '\\xrightarrow{f}, \\xleftarrow{g}', uni: '→f／←g', name: '带标签的箭头',
      note: '交换图里把态射名字写在箭头上 / 下。' },
    { g: 'letters', tex: '\\iota',  uni: 'ι', name: '逆映射',
      note: '群对象里的「取逆」态射 $\\iota : G \\to G$。手写体里 $\\iota$ 与 $i$ 极像 —— 凡是在「取逆」的位置上看到 $i$，先怀疑是 $\\iota$。' },
    { g: 'cat', tex: '\\check{H}^{n}',  uni: 'Čech 上同调 Ĥⁿ', name: 'Čech 上同调',
      note: '加帽子的 $H$：$\\check{H}^{n}(X, M)$ 是 Čech 上同调，与层上同调 $H^{n}(X,M)$ 相区别。' },
    { g: 'layout', tex: '\\bullet',  uni: '•', name: '复形的编号（右上角）',
      note: '复形一律写成 $K^{\\bullet}$（而不是 $K^{\\cdot}$）：那个 $\\bullet$ 表示「这里有一族指标」。' },
    { g: 'layout', tex: '\\trianglelefteq',  uni: '⊴', name: '正规子群 $H \\trianglelefteq G$',
      note: '子群写 $H \\le G$；正规子群写 $H \\trianglelefteq G$（三角形 = normal）。' },
    { g: 'layout', tex: '\\mapsto, \\longmapsto', uni: '↦ ／ ⟼', name: '元素映射',
      note: '写明「把元素送到哪儿」用 $\\mapsto$；定义一条长链条（比如预层的取值）用 $\\longmapsto$。' },
    { g: 'layout', tex: '\\downarrow, \\uparrow', uni: '↓ ↑', name: '竖直箭头',
      note: '交换图里竖边的方向。' },
    { g: 'layout', tex: '\\varinjlim, \\varprojlim', uni: 'lim→／lim←', name: '余极限 / 极限',
      note: '带指标的极限写作 $\\varinjlim_{(X,s)} h_{X}$；不带指标时可以用 $\\lim$、$\\operatorname{colim}$。' },
    { g: 'layout', tex: '\\dashv',  uni: '⊣', name: '左伴随 $F \\dashv G$',
      note: '写 $F \\dashv G$ 表示 $F$ 是 $G$ 的**左**伴随。箭头朝右也朝下，别写成 $\\vdash$（那是有穷逻辑的可推导）。' },
    { g: 'layout', tex: '\\coprod, \\bigoplus, \\sqcup', uni: '∐ ∐ ⊔', name: '余积 / 直和 / 不交并',
      note: '集合的余积写 $\\coprod$，加法群的余积写 $\\bigoplus$，两个空间的不交并写 $\\sqcup$。' },
    { g: 'layout', tex: '\\underline{E}',  uni: 'E̲', name: '常预层 / 强调',
      note: '常预层 $\\underline{E}$ 取常值 $E$。' },

    /* -------- 范畴与同调 -------- */
    { g: 'cat', tex: '\\mathcal{C}', uni: '𝒞', name: '一般的范畴；预层范畴写 $\\widehat{\\mathcal{C}}$，拓扑斯写 $\\mathcal{T}$' },
    { g: 'cat', tex: '\\widehat{\\mathcal{C}}', uni: 'Ĉ', name: '预层范畴 $\\operatorname{Hom}(\\mathcal{C}^{\\mathrm{op}}, \\mathbf{Set})$' },
    { g: 'cat', tex: '\\mathcal{T}', uni: '𝒯', name: '拓扑斯' },
    { g: 'cat', tex: 'h^{X}, h_{X}', uni: 'h^X／h_X', name: '可表示函子 / 可表示预层',
      note: '**上标记协变** $h^{X} = \\operatorname{Hom}_{\\mathcal{C}}(X, -)$；**下标记预层** $h_{X} = \\operatorname{Hom}_{\\mathcal{C}}(-, X)$。米田引理用上标，米田嵌入用下标。' },
    { g: 'cat', tex: 'h : \\mathcal{C} \\to \\widehat{\\mathcal{C}}', uni: 'h', name: '米田嵌入 $X \\mapsto h_{X}$' },
    { g: 'cat', tex: '\\mathcal{C}/T', uni: '𝒞/T', name: '预层 $T$ 的切片范畴；遗忘函子写 $j_{T}$' },
    { g: 'cat', tex: 'h_{X} \\downarrow T', uni: '', name: '逗号范畴（切片范畴就是它）' },
    { g: 'cat', tex: '\\sharp', uni: '♯', name: '层化 $T \\mapsto T^{\\sharp}$',
      note: '写在右上角：$T^{\\sharp}$ 是 $T$ 的层化。' },
    { g: 'cat', tex: '\\mathbf{K}(\\mathcal{C})', uni: 'K(C)', name: '复形的同伦范畴',
      note: '上加 $+$ / $-$ / $b$ 表示下有界 / 上有界 / 有界。' },
    { g: 'cat', tex: 'M(f)', uni: 'M(f)', name: '态射 $f$ 的映射锥' },
    { g: 'cat', tex: 'K[k]', uni: 'K[k]', name: '复形的 $k$-位移' },
    { g: 'cat', tex: 'F^{n}M,\\ \\operatorname{Gr}^{n}M', uni: 'F^n／Gr^n', name: '过滤与关联分次' },
    { g: 'cat', tex: 'E^{p,q}_{r}', uni: 'E^{p,q}_{r}', name: '谱序列的第 $r$ 页',
      note: '上下都是多重指标：$E^{p,q}_{r}$ 读作「第 $r$ 页的 $(p,q)$ 项」。' },
    { g: 'cat', tex: '\\mathrm{Cond},\\ \\mathrm{CondAb}', uni: 'Cond／CondAb', name: '凝聚态集 / 凝聚态阿贝尔群' },
    { g: 'cat', tex: '\\bar{\\mathbb{N}}', uni: 'ℕ̄', name: '$\\mathbb{N}$ 的**一点紧化**',
      note: '从 $\\bar{\\mathbb{N}}$ 到 $X$ 的连续映射 = 「收敛序列连同指定的极限」。' },
    { g: 'cat', tex: '\\mathrm{AB1} \\cdots \\mathrm{AB6}', uni: 'AB1–AB6', name: 'Grothendieck 的正合性等级',
      note: 'AB1 预阿贝尔 · AB2 阿贝尔 · AB3 有余极限 · AB4 余积正合 · AB5 滤过余极限正合 · AB6 滤过余极限与积交换。带星号的是对偶。' },
    { g: 'cat', tex: '\\rightleftarrows', uni: '⇄', name: '拓扑斯态射的一对方向（顺像 / 逆像）',
      note: '写 $f : \\mathcal{E} \\rightleftarrows \\mathcal{F}$ 时，箭头**反着**的那个方向是顺像 $f_{*}$，正着的是逆像 $f^{*}$ —— 与几何方向相反是常态。' },
    { g: 'cat', tex: '\\widetilde{X}', uni: 'X̃', name: '**多字母**上划线（层化 / 常层 / 层范畴）',
      note: '$\\widetilde{E}$ 是**常层**、$\\widetilde{\\mathcal{C}}$ 是 site 上的**层范畴**、$\\widetilde{T}$ 是预层的**层化** —— 多字母一律用 `\\widetilde`（不然杠会只盖住第一个字符）。' },
    { g: 'cat', tex: '\\tilde{g}', uni: 'g̃', name: '**单字母**上的撇（如 $\\tilde f$、$\\tilde g$）',
      note: '单字母用 `\\tilde`、多字母用 `\\widetilde` —— 两者都对，各管各的宽度。' },
    { g: 'cat', tex: 'k\\backslash\\mathcal{C},\\ \\mathcal{C}/X', uni: 'k∖𝒞, 𝒞/X', name: '**余切片**与**切片**范畴',
      note: '斜杠在前是切片（$\\mathcal{C}/X$）、反斜杠在前是余切片（$k\\backslash\\mathbf{Rng}$）—— 方向别写反。' },

    /* -------- 字母约定 -------- */
    { g: 'letters', tex: '\\alpha',   uni: 'α', name: '序数 / 指标',
      note: '局部义：微分里是阈值，积分里是复相位' },
    { g: 'letters', tex: '\\beta',    uni: 'β', name: '序数（配 $\\alpha$）' },
    { g: 'letters', tex: '\\gamma',   uni: 'γ', name: '序数（配 $\\alpha$、$\\beta$）/ 一般函数' },
    { g: 'letters', tex: '\\eta',     uni: 'η', name: '自然变换 / 自然同构（范畴论）' },
    { g: 'letters', tex: '\\pi',      uni: 'π', name: '投影 $\\pi_{\\alpha}$' },
    { g: 'letters', tex: '\\theta',   uni: 'θ', name: '角度' },
    { g: 'letters', tex: '\\tau',     uni: 'τ', name: '停时 / 一般函数（罕见）' },
    { g: 'letters', tex: '\\zeta',    uni: 'ζ', name: '（罕见）' },
    { g: 'letters', tex: '\\mathcal{C}', uni: '𝒞', name: '证明内局部：Cauchy 列全体 / 递升集合族；**范畴论里作范畴**' },
    { g: 'letters', tex: '\\mathcal{F}', uni: 'ℱ', name: '证明内局部：部分选择函数全体 / 生成元族' },
    { g: 'letters', tex: '\\mathcal{U}, \\mathcal{V}', uni: '', name: '证明内局部：开覆盖 / 有限子覆盖' },
    { g: 'letters', tex: '\\mathcal{D}', uni: '𝒟', name: '证明内局部：链的族；**范畴论里作范畴**' },
    { g: 'letters', tex: '\\mathcal{K}', uni: '𝒦', name: '证明内局部：单调类定理里的试探集族' },
    { g: 'letters', tex: '\\Delta', uni: 'Δ', name: '分析里作对称差 / 增量（局部）；**范畴论里作单纯形范畴、常图函子 $\\Delta X$**' },
    { g: 'letters', tex: '\\rightarrowtail', uni: '↣', name: '单态射 / 嵌入（范畴论）' },
    { g: 'letters', tex: 'h^{X}, h_{X}', uni: 'h^X／h_X', name: '可表示函子 / 可表示预层（范畴论）',
      note: '**上标记协变** $h^{X} = \\operatorname{Hom}_{\\mathcal{C}}(X, -)$；**下标记预层** $h_{X} = \\operatorname{Hom}_{\\mathcal{C}}(-, X)$。米田引理用上标，米田嵌入用下标。' },
    { g: 'letters', tex: '\\Theta',   uni: 'Θ', name: '证明内局部：余极限到 $T$ 的那一个态射' },
    { g: 'letters', tex: '\\Psi',     uni: 'Ψ', name: '证明内局部：与 $\\Phi$ 配对的那个映射（米田引理里的逆）' },
    { g: 'letters', tex: '\\Gamma(F, M)', uni: 'Γ(F,M)', name: '截面（凝聚态里）',
      note: '凝聚态集或凝聚态阿贝尔群 $M$ 在紧 Hausdorff 空间 $F$ 处的**截面**，就是 $M(F)$。' },
    { g: 'letters', tex: '\\mathrm{ZFC}', uni: 'ZFC', name: '公理系统名（名词 → `\\mathrm{}`）' },
  ],

  /* ------------------------------------------------- 机器可查的规则 */
  checks: {
    /* ⛔ 正文与 title 里都不许出现裸 Unicode 数学符号（要写成 $…$ 里的 LaTeX）。
       ⚠️ `title` 里的**术语前缀**是例外：`σ-代数`、`μ-零集` 保留 Unicode（见 R11）——
       那个例外由工具（`_tools/notation/sweep-titles.mjs`）在执行时排除，检查器不区分。 */
    bareUnicode: {
      body: ['statement', 'notes', 'proof', 'proofs', 'note', 'title'],
      labelOk: ['label', 'tags', 'refs'],
      chars: '∈∉⊆⊂⊇⊃∪∩∖×∅∀∃¬∧∨⟹⟸⟺⇒⇐⇔≤≥≠≈≅≃→↦←↔⟨⟩∑∏∫∂∞' +
             'ℝℂℚℤℕσμλφϕεϵθαβγδρτωΩΦΨΣΛΔ‖∥⋂⋃⊕⊗⊔·⋯′' +
             '¹²³⁰ⁿ₀₁₂ₙᵏᵢⱼ𝒜ℳℰ𝒫',
      /* ⭐ 豁免：术语前缀（`σ-代数`、`σ-有限`、`μ-零集`…）保留 Unicode，扫描前挖掉 */
      except: '[σμλφεδ]-[A-Za-z\\u4e00-\\u9fff]',
    },
    /* ⛔ 行内 `$$…$$` —— 见 R2。渲染上和 `$…$` 一模一样（`inlineMd` 走同一个
       `renderInlineMath`），所以判据不是「好不好看」，而是「别让产物在标准
       Markdown 渲染器里被当成独立公式块、把句子切断」。 */
    inlineDollars: {
      fields: ['statement', 'notes', 'proof', 'proofs', 'note', 'title'],
    },
    /* ⛔ 禁用写法 → 构建失败 */
    banned: [
      { re: '\\\\subsetneq', fix: '\\\\subset',
        why: '真包含用没有下横的 \\subset' },
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
  /* ⭐ 现在是**空的** —— 两笔老账（title 裸 Unicode、行内 $$…$$）都清了。
     再加内容时如果又出现，`build.mjs` 会直接拦下来，别往这里塞回来。 */
  backlog: [],
};
