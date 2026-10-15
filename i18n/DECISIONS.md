# 待作者拍板的事（英文层收尾）

> 每条都写清：**是什么** · **数字/证据** · **选项** · **我的建议** · **选了会动什么**。
> 数字尽量从产物现算（`_tools/_enreport.mjs`）。工作区当时是干净的。
>
> ⭐ **2026-10-16 晚更新**：作者给了最终任务书（合并此前全部批复，以此为准）。
> 下面每条都加了「✅ 已拍板」或保留为待决。已拍板的那些我会照任务书执行，不再问。

---

## 1. T2.4「应用界面英文模式」——用哪个口径算条数？（唯一真卡住的）

> ✅ **已拍板（2026-10-16 晚）：按「折模板 105」做**（并且 236 的逐条数也要在报告里写明）。
> 落地：`src/data/i18n/ui.en.js` + 极小的 `MG.t()` 回落 + `?lang=en` / localStorage，
> 分**两次提交**（① 顶栏+搜索+设置+图例 ② 面板+边面板），每个区域截图。

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

## 2. 前 30 枢纽里 16 个没有英文名 —— 要不要我补？

> ⚠️ **口径更正**：先前这条写的是 14，错了。枢纽榜前 30 按「强边入度降序 + layer 升序」定，
> 而入度 = 4 的节点有 **36 个**并列跨在第 30 名附近 ⇒ **不先 `computeLayers` 再排的探针，
> 得到的前 30 是任意的**（我那次就是）。以构建口径（`dist/hubs.md` 那张榜的算法）为准：
> **16 个**没有英文名；补完后覆盖 **290 / 709 = 40.9%**。

**是什么**：这 16 个节点的 `title_en` / `label_en` 是空的（它们的 aka 里只有书号或缩写，
机械规则填不出来）。摘要（`abstract_en`）里我已经用标准英文术语写过它们，但**名字字段**仍空。
加了它们，英文名覆盖 **274 → 290（40.9%）**。

**证据**（按枢纽榜口径「强入边降序 + layer 升序」排，列的是**榜位**；建议名是我写的）：

| 榜位 | 节点 id | 中文名 | 入度 | layer | 建议 `title_en` |
|---|---|---|---|---|---|
| 3 | `def.cauchy-null` | Cauchy 列与零列 | 5 | 11 | Cauchy sequences and null sequences |
| 5 | `def.abelian-category` | 加法 / 阿贝尔范畴 | 5 | 16 | additive and abelian categories |
| 8 | `thm.topos-abelian-grothendieck` | 拓扑斯上的阿贝尔群是 Grothendieck 范畴 | 5 | 19 | abelian groups in a topos form a Grothendieck category |
| 9 | `prop.nbv-derivative` | NBV 函数的导数与测度的关系 | 5 | 20 | derivative of an NBV function and its measure |
| 10 | `thm.ring-monotone-sigma` | 环 → σ-环 的判据 | 4 | 5 | when a ring is a σ-ring |
| 12 | `def.section` | 截口 | 4 | 6 | section |
| 13 | `prop.section-measurable` | 截口可测 | 4 | 7 | sections of measurable sets and functions |
| 16 | `thm.wellordering` | 良序定理 | 4 | 9 | well-ordering theorem |
| 17 | `thm.hausdorff` | Hausdorff 极大原理 | 4 | 9 | Hausdorff maximal principle |
| 18 | `thm.cardinal-comparable` | 基数可比定理 | 4 | 10 | comparability of cardinals |
| 19 | `prop.adjoint-full-faithful` | 全忠实与单位 | 4 | 11 | fully faithful iff the unit is an isomorphism |
| 20 | `ex.kan-extension` | Kan 延拓的两个例子 | 4 | 12 | Kan extensions: colimits and right adjoints |
| 24 | `thm.real-uncountable` | ℝ 不可数 | 4 | 14 | uncountability of the reals |
| 26 | `thm.metric-compact-equiv` | 紧的三个等价刻画 | 4 | 15 | equivalent characterisations of compactness |
| 29 | `def.essential-sup` | 本性上界与 L^∞ | 4 | 16 | essential supremum and the space L∞ ⚠️ 不带 LaTeX |
| 30 | `prop.chaus-reflective` | 紧 Haus 是反射子范畴 | 4 | 16 | compact Hausdorff spaces form a reflective subcategory |

⚠️ **这张表和上一版（14 行）不一样，以这张为准**：旧表是「不先 `computeLayers` 就排」的探针产出的，
它多算了 `thm.fubini-tonelli` / `thm.rn-pointwise`（这两个**确实**没英文名，但**不在前 30**），
漏了 `prop.adjoint-full-faithful` / `ex.kan-extension` / `thm.real-uncountable` / `prop.chaus-reflective`。
复算脚本 `_tools/_hub16.mjs`（只读，照 `dist/hubs.md` 的入度算法）。

**选项**：(a) 我按上表在 `aliases.js` 加 aka（英文名走一级规则自动填）；(b) 你自己改；(c) 不做。

> ✅ **已拍板（2026-10-16 晚）：做**（任务书 T2.2 原文「fix the hub nodes' missing English names」）。
> 名字你随时可以改；`def.essential-sup` 那条按任务书要求**不许带 LaTeX**（所以建议名写成
> 纯文本 `L∞`，不写 `$L^\infty$`）。`def.section` 的 aka 我加之前会先量**跳转噪音**，
> 若有噪音就「只填字段、不喂跳转」。

**建议**：(a)。这是**你拍板名字**、我执行的活；改一处真源（`aliases.js`）+ 重跑
`bun tools/i18n-backfill.mjs`。
⚠️ 一个副作用要知道：aka 同时喂**内文跳转**（正文里出现该词会变链接）与**搜索** ——
`section` 这种通用词有 `linkStop` 拦着，但我会在改完后跑 `_xlmissing`/`_xlnoise` 看有没有噪音。

---

## 3. 二级命中里 2 条名字要你定（⚠️ 结论变了：aka 早就有了，卡的是别处）

| 节点 | 现在采用 | 为什么不对 | 真正卡在哪 |
|---|---|---|---|
| `thm.first-iso` | `Noether` | 那是**归属**（人名），不是定理名 | aka 里**已经有** `first isomorphism theorem` 了；但 aka 同时有 `Noether` ⇒ 名字样英文候选 = 2 条 ⇒ **一级不要它**，落到二级，二级在 title「第一同构定理（Noether）」里只命中 `Noether` |
| `def.simplex-category` | `Delta` | title 里是 LaTeX `\Delta`，被当普通词读了 | aka 里**已经有** `simplex category`；但 aka 同时有 `Delta` ⇒ 候选 = 2 条 ⇒ 落到二级，二级在 title「单纯形范畴 $\Delta$」里只命中 `Delta` |

⇒ 所以**不是「补一条 aka」，而是「删掉那条不是名字的」**：把 `Noether` / `Delta` 从 aka 里去掉，
候选就剩 1 条 ⇒ 一级直接填上正确的名字（`first isomorphism theorem` / `simplex category`）。

**删了会不会丢搜索**：不会。
· `Noether` 还在 aka 的 `Noether 第一同构定理` 里（含汉字 ⇒ 本来就不进英文名候选，但进搜索）；
· `Delta` 在 title 的 `$\Delta$` 里（title 进搜索索引）。

**顺带发现的同类第 3 处**（任务书没提，先报不动）：
`prop.cg-coreflective` → `kification`。它的 aka 里只有 `kification` 一条名字样英文（其余是书号）
⇒ 一级照填。`kification` 是个真词，但它不是这个节点的名字
（节点是「紧生成空间是 $\mathbf{Top}$ 的余反射子范畴」）。建议改名
`compactly generated spaces form a coreflective subcategory`，处理办法同上（去掉 `kification`，
但它是搜索词 ⇒ 要么接受丢失，要么加在别的 aka 条目里）。

**选项**：(a) 按上面删 aka（推荐，不需要新机制）；(b) 保持现状（`i18n/second-tier.md` 里标着 ⚠️）；
(c) 加人工排除名单（要新机制，我不建议）。

**选了会动什么**：只动 `src/data/aliases.js`（唯一真源）+ 重跑
`bun tools/i18n-backfill.mjs`；aka 也喂**内文跳转**，所以我会在改完后跑
`_xlmissing` / `_xlnoise` 看 `Noether` / `Delta` / `kification` 三个词有没有变噪音或漏链。

---

## 4. 许可迁移（T1.4 的三个方案）

> ✅ **已拍板（2026-10-16 晚）：方案 B** —— **内容迁 CC BY 4.0、代码维持 MIT**。
> 具体照任务书 T1.4 执行：删掉「不允许整份转载、镜像、改名再分发」那一条；
> 「必须标 id」降级成**请求 + 推荐格式**；英文引用指南转正；同步所有声明许可的地方
> （README / read 页 / 页脚 / `graph.json` / `graph.md` / `nodes` 抬头）；
> `LICENSE-PROPOSAL.md` 标为已生效并附**镜像影响表**；应用里加一个「引用此节点」按钮；
> 版本号递增规则保留。

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

> ✅ **已拍板（2026-10-16 晚）**：5.1 缩写**不做显示名**（可以留在 aka 里给搜索）；
> 5.2 title 兜底**暂不做**（若做，逐条列清单给你勾）；5.3 Stacks 外链**分批做**；
> 5.4 英文陈述**扩到 30 条**（与摘要同一批 30 个枢纽，每批 10 条，第一批做完停下等审校）；
> 5.5 `i18n-gaps.md` **留在仓库**（挪进 `i18n/`）；5.6 那处瑕疵**改掉**；
> 5.7 边上的证明**不译**。

| # | 事 | 现状 | 选项 |
|---|---|---|---|
| 5.1 | 二级**候选集**要不要收进缩写 4 条 | 收进去 +4 条（`kC(X,Y)`/`NBV`/`AB6`/`qcqs`）⇒ 覆盖 39.2% | ✅ 不收：`kC(X,Y)` 是**记号**不是名字 |
| 5.2 | 要不要做「**title 兜底**」（aka 没英文时直接用 title 括号里的英文） | 还能再填 106 条 | ✅ 暂不做 |
| 5.3 | **Stacks Project** 外链 | 一条都没加（tag 要逐条核） | ✅ 下一批（同调代数 / 层论）分批补 |
| 5.4 | 英文**陈述**扩到多少条 | 现在 3 条（试点） | ✅ 扩到 30 条（＝摘要那 30 个枢纽） |
| 5.5 | `i18n-gaps.md`（86 KB）留在仓库？ | 已入库（根目录） | ✅ 留仓库，挪进 `i18n/` |
| 5.6 | 1 处内容瑕疵 | `prop.chaus-two-term-resolution` 的 `\text{}` 里嵌了 `$` | ✅ 改掉（报告 diff） |
| 5.7 | 边上的证明要不要英文化 | 英文页明写「proofs 仍以中文页为准」 | ✅ 不译 |

---

## 6. 不需要你定、我会顺手做的

- 把英文层写进项目的交接文档（`HANDOVER.md` / `FACT.md`），免得下个会话重新摸一遍；
- 英文入口页与 `llms.txt` 的口径核对（`en_page` 字段与实际文件数保持一致，构建已有断言）。
