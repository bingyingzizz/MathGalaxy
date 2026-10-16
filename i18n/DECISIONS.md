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

## 2. 前 30 枢纽里 16 个没有英文名 —— ✅ 已补完（2026-10-16）

> ✅ **已拍板并已完成**（任务书 T2.2）。最终英文名覆盖 **274 → 294 / 709 = 41.5%**。
> ⚠️ 实际做法与原来的设想**不一样**，逐条记录在下面「实际怎么做的」一节，以那节为准。

> ⚠️ **口径更正**：先前这条写的是 14，错了。枢纽榜前 30 按「强边入度降序 + layer 升序」定，
> 而入度 = 4 的节点有 **36 个**并列跨在第 30 名附近 ⇒ **不先 `computeLayers` 再排的探针，
> 得到的前 30 是任意的**（我那次就是）。以构建口径（`dist/hubs.md` 那张榜的算法）为准：
> **16 个**没有英文名。

**是什么**：这 16 个节点的 `title_en` / `label_en` 是空的（它们的 aka 里只有书号或缩写，
机械规则填不出来）。摘要（`abstract_en`）里我已经用标准英文术语写过它们，但**名字字段**仍空。

**实际怎么做的**（比设想的方案多两步 —— 前两步是**修 bug**，不是补数据）：

| 步 | 做了什么 | 结果 |
|---|---|---|
| ① | 修 `nameLike` 的驼峰误杀：原来把 `Heine-Borel` 去掉标点后看成 `HeineBorel`（看到第二个大写）判成记号。改成**按连字符/撇号分段**判，并要求每段 ≥2 个字母（`kTop`/`kX`/`L-infinity`/`k-ification` 仍挡在外面） | `thm.metric-compact-equiv`、`def.essential-sup` 直接就有了名字；另外 5 个非枢纽节点（`Burali-Forti` / `Cartan-Leray` / `Breen-Deligne` / `Cartan-Eilenberg` / `Lebesgue–Stieltjes`）跟着填上 |
| ② | 修 `refCode` 的误杀：原来**裸的 `section`** 也被当成书号（`Section 2.3` 那种坐标）。改成**必须带编号**才算书号 | `def.section` 填上 `Section` |
| ③ | 剩下 13 个在 `aliases.js` 的 aka 里补名字 | 16/16 齐 |
| ④ | 顺手修掉三条任务书点名的：`thm.first-iso`（`Noether` → `first isomorphism theorem`）、`def.simplex-category`（`Delta` → `simplex category`）、`prop.chaus-reflective`（`beta X` → `Stone–Čech compactification`） | 名字对了 |

**顺带修掉的两处回归**（改闸门会牵动别的节点，逐条量过）：
`thm.ftc-lebesgue`（新增候选 `Newton-Leibniz` ⇒ 变歧义）→ 把那条写成
`Newton-Leibniz 定理`（含汉字 ⇒ 只进搜索、不当名字）；`def.section-retraction`（`section` 与
`retraction` 变成两条候选 ⇒ 歧义）→ 合并成一条 `section / retraction`，名字仍是 `Section / Retraction`。

**已知的一处覆盖下降 + 一处不漂亮的 title_en**（都不藏着）：
- `def.k-topology`：原来的名字是 `k-ification`（**错**，那是函子不是拓扑），新闸门把它挡掉了
  ⇒ 这个节点回到缺口。`k-topology` 这种「单字母 + 连字符 + 词」的写法按新规则仍然不算名字
  （`L-infinity` 是同一类记号）。要填它需要在 aka 里写一个不含单字母段的英文名，或加一个显式
  `en` 字段 —— **等你定**。
- `thm.wellordering` / `thm.hausdorff`：`title_en` = `Well-Ordering Theorem, Zermelo 1904` /
  `Hausdorff Maximal Principle, 1914` —— 因为**你自己的 title 括号里就带年份**，规则照抄了它。
  `label_en`（画布上用短名）是干净的 `well-ordering theorem` / `Hausdorff maximal principle`。
  想改就说一声，改法是修 title 或加显式 `en` 字段。

**验收**：`bun tools/i18n-backfill.mjs` → 一级 253 + 二级 41 = **294 / 709 = 41.5%**，
缺口 435 → **415**；`bun tools/build.mjs` 全部硬断言通过；六个体检脚本 0 硬失败。
逐条 before/after 清单：`_tools/_i18ndiff.mjs`（只读）跑出来 21 条新增 / 1 条移除 / 3 条改名。

**选项**：(a) 我按上表在 `aliases.js` 加 aka（英文名走一级规则自动填）；(b) 你自己改；(c) 不做。

> ✅ **已拍板（2026-10-16 晚）：做**（任务书 T2.2 原文「fix the hub nodes' missing English names」），
> **并且已做完**，做法见上面的「实际怎么做的」。
> `def.essential-sup` 按任务书要求**不许带 LaTeX** ⇒ 最终名 `essential supremum`（纯文本，一个 `$` 都没有）。
> `def.section` 的**跳转噪音已量**：全库正文里 `section/sections` 只出现 **1 处**
> （`def.section-retraction` 的面板），边正文 0 处，上限就是 1 条新链接 ⇒ **噪音可忽略，照常喂跳转**，
> 不需要进 `linkStop`。

---

## 3. 二级命中里 2 条名字要你定 —— ✅ 已修（2026-10-16）

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

**处理结果**：照 (a) 做了 —— `Noether` / `Delta` 都从 aka 里去掉，两个名字都已修正。
⚠️ 第 3 处 `prop.cg-coreflective` → `kification` 我**按原样留着没动**（任务书没点名），
它现在的名字仍是 `kification`；要改就说一声（改法与上面两条一样：把 `kification` 从 aka 里去掉，
再补一个真正的名字）。

**选项**：(a) 按上面删 aka（推荐，不需要新机制）；(b) 保持现状（`i18n/second-tier.md` 里标着 ⚠️）；
(c) 加人工排除名单（要新机制，我不建议）。

**实际动了什么**：只动 `src/data/aliases.js`（唯一真源）+ 重跑 `bun tools/i18n-backfill.mjs`。
`Noether` / `Delta` 两个词都**还在**同一个节点的搜索文本里（`Noether` 在 aka 的
`Noether 第一同构定理` 里、`Delta` 在 title 的 `$\Delta$` 里）⇒ **搜索没损失**。

---

## 4. 许可迁移（T1.4）—— ✅ 已执行

> ✅ **已拍板并已执行（2026-10-16）**：**方案 B** —— **内容迁 CC BY 4.0、代码维持 MIT**。
> 落地记录在 **`LICENSE-MIGRATION.md`**（原 `LICENSE-PROPOSAL.md`，同一份文件改名并改成迁移记录）：
> 删掉了「不允许整份转载、镜像、改名再分发」；「必须标 id」降级成**请求 + 推荐格式**；
> 英文引用指南转正进 `LICENSE` 第四节；同步了所有声明许可的地方
> （README / read 页 / 概念页页脚 / `graph.json` / `graph.md` / `nodes` 抬头 / CONTRIBUTING / JSON-LD）；
> 新增 `LICENSE-CC-BY-4.0.txt`（CC 官方法律文本原文）；应用里加了「引用此节点」按钮；
> 版本号递增规则保留（并写明它不是 CC BY 的附加条件）。

| 方案 | 换来什么 | 代价 |
|---|---|---|
| **A 不改**（保留所有权利 + 必须标 id） | 「引用必须写节点 id + 版本」是**可执行的许可条件**；挡住镜像/整份转载 | 平台判 `custom license`；AI 抓取管线常直接跳过 ⇒ 与「让别人的 AI 读得到」相反 |
| ✅ **B 内容 → CC BY 4.0**（代码仍 MIT） | 国际通用、机器可识别 ⇒ 最有利于被索引/被引用/被 AI 读 | ① 允许镜像、改名再分发、商用（署名即可）② **id 条款失去法律效力**（只能写成「请求」） |
| **C → CC BY-SA / BY-NC** | 挡闭源再分发（SA） | 同样没有 id 条款；对收录的改善不如 B |

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
