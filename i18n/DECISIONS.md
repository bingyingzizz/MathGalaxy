# 待作者拍板的事（英文层收尾）

> 每条都写清：**是什么** · **数字/证据** · **选项** · **我的建议** · **选了会动什么**。
> 数字尽量从产物现算（`_tools/_enreport.mjs`）。工作区当时是干净的。

---

## 1. T2.4「应用界面英文模式」——用哪个口径算条数？（唯一真卡住的）

**是什么**：星图画布界面（顶栏 / 图例 / 设置窗 / 面板 / 搜索框 / 底部说明）现在全是中文。
T2.4 是给这些**界面外壳文案**加英文模式。你的规矩是「>200 条先停下等我」——
我停下来报了数，但有两个口径，请你指定用哪个。

| 口径 | 条数 | 什么意思 |
|---|---|---|
| 逐条算 | **236** | 把每个**实例**当一条（同一句 tooltip 里嵌不同星团名，算很多条） |
| ⭐ 折成模板 | **105** | 只有嵌进去的星团/星系名不同 ⇒ 视为同一条（`{名}` 占位） |

**证据**：清单在 `i18n/ui-strings.md`（9 个界面区域，每条标出现位置：截图编号 UI1–UI6，
六张状态图在本地 `_tools/_UI1.png`…`_UI6.png`）。另有 91 条是**数学内容**
（节点名 / 星团名 / 星系名 / 记号表条目 / 陈述），⛔ 不在 T2.4 范围 —— 那些走 `label_en`/`title_en`。

**选项**：
- (a) 按 **105** 做 → 我接着实现英文模式；
- (b) 按 **236** → 继续停着，T2.4 记为「未做」；
- (c) 先做一半（顶栏 + 搜索 + 设置 + 图例 ≈ 60 条），面板/边面板留到下一批。

**我的建议**：(a)。105 条里绝大多数是短标签与 tooltip；按 236 算是把「同一句话里的变量」
重复计数了 —— 真正要译的句子是 105 句。

**选了会动什么**（若走 (a)）：
- 新增内容侧 `src/data/i18n/ui.en.js`（一个键值表，⛔ 不写进引擎）；
- 引擎侧加一个极小的 `MG.t()` 查表（缺键回落中文），`src/core/{app,panel,search,config,export,loader,graph,worldbitmap}.js`
  与 `index.html` 里约 40–60 处调用点改成走 `t()`；
- 语言开关复用阅读页那一套（`?lang=en` + localStorage `mathgalaxy.read.lang`）；
- ⚠️ 视觉**不改设计**，但英文更长 ⇒ 顶栏/按钮可能回流，必须逐个截图看（有 `_tools/_appvisible.mjs` 等探针）；
- 风险中等（要碰 `src/core/`），所以我会**分两次提交**：先顶栏+搜索+设置+图例，再面板+边面板。

---

## 2. 前 30 枢纽里 14 个没有英文名 —— 要不要我补？

**是什么**：这 14 个节点的 `title_en` / `label_en` 是空的（它们的 aka 里只有书号或缩写，
机械规则填不出来）。摘要（`abstract_en`）里我已经用标准英文术语写过它们，但**名字字段**仍空。
加了它们，英文名覆盖 **274 → 288（40.6%）**。

**证据**（按枢纽榜入度排，★ 是我建议的英文名）：

| # | 节点 id | 中文名 | 建议 `title_en` |
|---|---|---|---|
| 5 | `prop.nbv-derivative` | NBV 函数的导数与测度的关系 | derivative of an NBV function vs. its measure |
| 5 | `def.cauchy-null` | Cauchy 列与零列 | Cauchy sequences and null sequences |
| 5 | `def.abelian-category` | 加法 / 阿贝尔范畴 | additive and abelian categories |
| 5 | `thm.topos-abelian-grothendieck` | 拓扑斯上的阿贝尔群是 Grothendieck 范畴 | abelian groups in a topos form a Grothendieck category |
| 4 | `thm.wellordering` | 良序定理 | well-ordering theorem |
| 4 | `thm.hausdorff` | Hausdorff 极大原理 | Hausdorff maximal principle |
| 4 | `thm.metric-compact-equiv` | 紧的三个等价刻画 | equivalent characterisations of compactness |
| 4 | `thm.ring-monotone-sigma` | 环 → σ-环 的判据 | when a ring is a σ-ring |
| 4 | `def.section` | 截口 | section |
| 4 | `prop.section-measurable` | 截口可测 | sections of measurable sets and functions |
| 4 | `thm.fubini-tonelli` | Fubini–Tonelli | Fubini–Tonelli theorem |
| 4 | `thm.rn-pointwise` | RN 导数的点态公式 | pointwise formula for the Radon–Nikodym derivative |
| 4 | `def.essential-sup` | 本性上界与 L^∞ | essential supremum and $L^\infty$ |
| 4 | `thm.cardinal-comparable` | 基数可比定理 | comparability of cardinals |

**选项**：(a) 我按上表在 `aliases.js` 加 aka（英文名走一级规则自动填）；(b) 你自己改；(c) 不做。

**建议**：(a)。这是**你拍板名字**、我执行的活；改一处真源（`aliases.js`）+ 重跑
`bun tools/i18n-backfill.mjs`。
⚠️ 一个副作用要知道：aka 同时喂**内文跳转**（正文里出现该词会变链接）与**搜索** ——
`section` 这种通用词有 `linkStop` 拦着，但我会在改完后跑 `_xlmissing`/`_xlnoise` 看有没有噪音。

---

## 3. 二级命中里 2 条名字要你定

| 节点 | 现在采用 | 为什么不对 | 建议 |
|---|---|---|---|
| `thm.first-iso` | `Noether` | 那是**归属**（人名），不是定理名 | 在 aka 里补 `first isomorphism theorem`，规则自动走一级 |
| `def.simplex-category` | `Delta` | title 里是 LaTeX `\Delta`，被当普通词读了 | 在 aka 里补 `simplex category` |

**选项**：(a) 按建议补 aka（推荐）；(b) 保持现状（`i18n/second-tier.md` 里标着 ⚠️）；(c) 加人工排除名单（要新机制，我不建议）。

---

## 4. 许可迁移（T1.4 的三个方案）

草案在 `LICENSE-PROPOSAL.md`（抬头 `PROPOSAL — NOT IN EFFECT`，⛔ `LICENSE` 一字未改）。

| 方案 | 换来什么 | 代价 |
|---|---|---|
| **A 不改**（现状：保留所有权利 + 必须标 id） | 「引用必须写节点 id + 版本」是**可执行的许可条件**；挡住镜像/整份转载 | 平台判 `custom license`；AI 抓取管线常直接跳过 ⇒ 与「让别人的 AI 读得到」相反 |
| **B 内容 → CC BY 4.0**（代码仍 MIT） | 国际通用、机器可识别 ⇒ 最有利于被索引/被引用/被 AI 读 | ① 允许镜像、改名再分发、商用（署名即可）② **id 条款失去法律效力**（只能写成「请求」） |
| **C → CC BY-SA / BY-NC** | 挡闭源再分发（SA） | 同样没有 id 条款；对收录的改善不如 B |

**我的建议**：**先只做草案里的「英文引用指南 + 怎样算满足」两节**（零风险、现在就能用），
主体等真有外部使用者/机构镜像时再一次性放开。若你要现在就迁，我按 B 做，改动清单在草案第 7 节（7 处）。

---

## 5. 几个小开关（每条一句话就能定）

| # | 事 | 现状 | 选项 |
|---|---|---|---|
| 5.1 | 二级**候选集**要不要收进缩写 4 条 | 收进去 +4 条（`kC(X,Y)`/`NBV`/`AB6`/`qcqs`）⇒ 覆盖 39.2% | 我不建议：`kC(X,Y)` 是**记号**不是名字 |
| 5.2 | 要不要做「**title 兜底**」（aka 没英文时直接用 title 括号里的英文） | 还能再填 106 条 | ⚠️ 那个池子**不干净**：混着 `X, M`、`r, x` 这种公式碎片与带年份的。要做的话我建议**逐条列给你勾**，不自动填 |
| 5.3 | **Stacks Project** 外链 | 一条都没加（tag 要逐条核） | 下一批（同调代数 / 层论那一片）补，或永远不加 |
| 5.4 | 英文**陈述**扩到多少条 | 现在 3 条（试点） | 你指定一批（每条约 300–1200 字符人工量），或先停在试点 |
| 5.5 | `i18n-gaps.md`（86 KB）留在仓库？ | 已入库 | 改放本地 `_tools/`（gitignore）也成 —— 它是给你补名字用的工作文档 |
| 5.6 | 1 处内容瑕疵 | `prop.chaus-two-term-resolution` 的 `\text{}` 里嵌了 `$` | 我改掉 / 你改 / 保持 |
| 5.7 | 边上的证明要不要英文化 | 英文页明写「proofs 仍以中文页为准」 | 这是纯人工量，建议留到最后 |

---

## 6. 不需要你定、我会顺手做的

- 把英文层写进项目的交接文档（`HANDOVER.md` / `FACT.md`），免得下个会话重新摸一遍；
- 英文入口页与 `llms.txt` 的口径核对（`en_page` 字段与实际文件数保持一致，构建已有断言）。
