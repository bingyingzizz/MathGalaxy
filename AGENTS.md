# AGENTS.md · 数学星图 MathGalaxy

> 所有 agent（Claude Code / Codex / 其他）共用的**唯一操作规则**。`CLAUDE.md` 是 Claude Code 的短入口。
> 这里只写「必须知道的」；细节按任务读 `docs/` 里的专题，不要整本加载。规模数字一律跑 `bun tools/mg.mjs stat`，别信文档。

## 0. 任务路由（强制；`/clear`、重启、上下文压缩、更换执行模型后依然有效）

### 0.0 先分类、先加载工作流，再动手

**开工前先给任务分类，读完适用的工作流文档再执行**；工作流文档是该类任务的**权威操作规程**，不得凭记忆或临场自创方法。**复合任务要遵守所有适用的工作流**（例如「按审计登记簿修复并补英文」= audit + content-edit + translation），但**只有一份执行计划、一份预算、一套审阅记录、一次验证结果和一份最终报告**：工作流之间的交叉引用是**指针，不是重新开始整个工作流**；重复的 build 与测试只跑一次（以最后一次内容改动之后的那一次为准）。检查与记录的强度**与改动相称**：不涉及数学语义的琐碎编辑（错别字、排版、纯文档）只需相关的门，不需要走完整的数学审计与登记；实质性的数学改动才走完整流程。每条规则只有一个权威位置——发现重复就删掉其中一份，别新增第二份。

| 任务 | 加载 |
|---|---|
| 审计 / 复核 / 验证数学内容；修复后的独立验证 | `docs/workflows/audit.md` |
| 新增节点/边/星团；外部投稿 | `docs/workflows/content-add.md` |
| 修改既有内容（订正、拆分/合并/删除、改归属） | `docs/workflows/content-edit.md` |
| PDF / 扫描件 / 手写笔记摄取 | `docs/workflows/pdf-ingestion.md`（**操作化流水线尚未实现**，Task 4） |
| 英文翻译与译文订正 | `docs/workflows/translation.md` |
| 渲染 / 布局 / 搜索 / 交互 / 缓存 / 加载 / 构建性能等引擎改动 | `docs/workflows/engine.md`（性能敏感先读 `PERFORMANCE.md` §0.0） |
| 个人主页 / 站点模板 / 站点统计与文案 | `docs/workflows/homepage.md` |

所有**内容类**工作流（audit / content-add / content-edit，并入图前的 pdf-ingestion，译文的 §14）共用一份数学图质量标准：`docs/workflows/content-quality.md`——**数学要求只在那里定义**，工作流只引用，不重述。拿不准归哪类 → 读最接近的，并在汇报里说明。

### 0.1 规则的权威等级与 agent 权限

规则来源分五级，**历史文档或代码里出现某条规则 ≠ 用户授权**：① 用户明确要求；② 数学正确性要求；③ 已建立的工程不变量与已验证的性能优化；④ 现有实现约定；⑤ agent 生成的建议与诊断启发式。
- agent **可提议**改进，但**不得自行把偏好、数字目标或启发式升格为强制项目约束**。不设最低度数/连接数/证明数等数字要求；数字只触发调查，**绝不为凑统计造数学关系**。发现可疑的既有规则 → 记入 `docs/STATUS.md`「要用户拍板的事」，不要自己替换成新规则。
- agent **可自行决定**：实现细节、有效的证明方法、合适的工具、已批准工作流内的执行策略；普通审计可修**已核实的局部错误**；明确标为**只读**的调查必须保持只读。
- agent **不得自行改变**：数学边语义、全局组织原则、强制质量标准、预算与发布授权、既定性能保证、用户授权的项目约束。**节点删除/合并、大型星团重构、重大架构或性能权衡须先获明确批准。**

### 0.2 委派路由（强制）

**每个任务开工前先判定执行方式，不等用户点名 DeepSeek**；这是工作流的一部分，不是可选工具：

| 任务 | 走哪里 |
|---|---|
| 确定性操作：计数、搜索、抽取、比对、哈希、格式/公式校验、构建与各道门 | 本地脚本（§10） |
| 常规翻译、文本订正、内容加工、可重复的语言模型活 | **DeepSeek 流水线**（`tools/llm/`，thinking 关） |
| 常规语义审核 / 译文初筛 | **DeepSeek，thinking 开**（`review2.mjs`，与翻译分离、独立调用） |
| 复杂推理、工程决策、流水线报出的例外与数学上可疑的情形 | Claude |

1. Claude 自动选用并调用现有流水线：先 `plan` 干跑估价；**不手工逐条翻译、不逐条审阅成功的译文**，不把批量语言活读进上下文，只读紧凑例外清单（`exceptions.json`）。
2. 默认翻译工作流（详见 `docs/workflows/translation.md`）：抽取 → DeepSeek 翻译 → 确定性校验 → 独立 DeepSeek 语义审核（thinking 开）→ 回写 → build 与各道门。**至多一轮**自动返工 + 复审；仍不过或数学可疑 → 升级给 Claude。**登记簿里未解决的源文复核搁置项优先于译文审核**：该身份不得批准、不得回写（代码强制，`tools/llm/lib/holds.mjs`）。
3. 授权边界：计费请求需要 `DEEPSEEK_API_KEY` 在环境里，且 `--campaign --max-usd --limit` 齐全。**常设预算授权（用户 2026-11-24，`tools/llm/budget-policy.json`）**：常规 DeepSeek 任务每个任务累计 ≤ **$0.50**、全部任务每日累计 ≤ **$2.00**（**强制程度**：每日 $2.00 由账本在代码里跨战役强制；单战役上限在开战役时由代码检查；**「每任务累计 $0.50」与「不得拆分战役」目前只靠本规程**，代码不知道哪些战役属同一任务），范围内**不必逐次请示**；要超出必须先请示用户（获批才可加 `--above-policy`），**不得拆分任务/战役来绕过**。无密钥或超出范围就停在 `plan`，并给出用户可直接执行的命令。只发公开数学内容；译文一律 `draft`；证明与边标题只导出候选；**不改中文数学原文**（源文问题记入 `docs/source-review-register.md`，翻译/订正/验证分开）。
4. 新的 AI 任务类型（例如 PDF 转写终稿订正；PDF 集成**尚未做**，见 `docs/workflows/pdf-ingestion.md`；Notes/边证明的数学审计目前也**没有适配器**）先复用这套流水线与路由，确有必要才加适配器。

细则、命令、成本与实测教训：`docs/llm-pipeline.md`「任务路由与默认工作流」。

## 文档层级

| 文档 | 职责 | 何时读 |
|---|---|---|
| `CLAUDE.md` | Claude Code 入口（命令、红线） | 每次会话 |
| `AGENTS.md`（本文件） | 规范规则 | 每次会话 |
| `docs/workflows/*.md` | 七个任务工作流 + 共用的数学图质量标准 `content-quality.md` | **按 §0.0 分类后必读** |
| `docs/audit-register.md` | 数学审计问题登记簿（生命周期） | 审计 / 修复前 |
| `docs/STATUS.md` | 当前未完成工作、待用户拍板的事 | 开工前 |
| `README.md` / `CONTRIBUTING.md` | 项目概览 / 贡献流程与人名写法 | 面向外部；写内容时读 CONTRIBUTING |
| `PERFORMANCE.md` + `docs/performance-runbook.md` | 性能总账（含准入规则）+ 操作手册 | **任何性能敏感改动之前必读**（见 §3） |
| `docs/content-guidelines.md` | 内容准则与铁律的完整版 | 写内容前 |
| `docs/tools-and-methods.md` | 工具清单、方法学、环境坑 | 需要时 |
| `docs/archive/` | 历史交接、迁移记录、旧版指令 | 不必读；可恢复 |

## 1. 架构

- 零依赖、无构建、`file://` 可开。浏览器端是经典 `<script>` + `window.MG`。⛔ 不引入框架 / 打包器 / npm 依赖 / ES module。
- **引擎与内容分家**：`src/core/` 只管怎么画，`src/data/` 只管有什么。加内容只动 `src/data/`；改观感才动 core（先读性能手册）。
- `src/data/packs/*.js` 是中文内容真源；`src/data/i18n/*.en.js` 旁挂英文。新包必须在 `index.html` 挂 `<script>`（构建扫目录、网页读标签，两边会不一致）。
- `dist/` 是**被跟踪的构建产物**，也是发布输入，不手改；`dist-site/` 是站点仓库的本地克隆（被忽略），由 `tools/publish.mjs` 组装/推送。

## 2. 查：把星图当知识库用

⛔ 不要 `rg` 那几千个 `dist/nodes/*.md`，也不要把 `dist/graph.json` 读进上下文。用：

```bash
bun tools/mg.mjs find <词>            # 按名字/别名/标签/正文搜 → id（别猜 id）
bun tools/mg.mjs show <id> [--proof]  # 陈述 + 注 + 出入边
bun tools/mg.mjs path <a> <b> | deps <id> | impact <id> | gaps | cluster <id> | ls | stat
```
`dist/llms.txt` 是逐页读取的入口（`index.md → index/<星团>.md → nodes/<id>.md`），`mg.mjs` 更省 token。

## 3. 命令与必过的门

```bash
bun tools/build.mjs               # ⚠ 有副作用：改写 dist/ 与根目录 llms/policy/reading/notation/alias；含 perfguard
bun tools/_katexcheck-all.mjs     # 公式（权威口径，CI 用）
bun tools/doccheck.mjs --strict   # 文档里的硬数字 vs graph
bun tools/searchcheck.mjs         # 搜索基准；改基准必须写理由并经批准
bun tools/idstable.mjs            # id 稳定性（干跑；--apply 才写）
bun tools/xlinkcheck.mjs  ·  bun tools/clustercheck.mjs <星团id>
bun tools/hygiene.mjs             # 只读工作区卫生检查（见 §8）
bun tools/llm/selftest.mjs        # DeepSeek 批处理流水线离线自测；批量英译/抽取走 tools/llm，规程见 docs/llm-pipeline.md
```
- **加内容**：build → katexcheck-all → doccheck → searchcheck → idstable →（加了星团）clustercheck。
- **性能敏感改动（不止 `src/core/`）**：渲染、布局/预计算、图算法与数据结构、缓存、交互、资源加载、性能关键的构建流程——**开工前必须读** `PERFORMANCE.md`（§0.0 准入规则）与 `docs/performance-runbook.md`；重大改动要前后实测（`_tools/_dragbench.mjs` + `_chainprobe.js`，启动类另报 `layoutMs`），另需引擎冒烟 + 带裁剪墨量比对 + **亲眼看截图**（runbook 4.1.3）。⛔ 不放宽 `perfguard` 断言、旋钮区间或帧时判据来迁就退化。build 绿 ≠ 改对了。
- 运行时是 bun（`doccheck` 等用 `import.meta.dir`，node 跑不了）。红了就是真问题，**不要改基准去骗门**。
- 在隔离副本里验证有副作用的命令：`git archive HEAD` 解到 `_tmp/` 或 scratchpad，再叠上工作树改动。

## 4. 数学完整性与 LaTeX

- **数学要求**（正确性、存在性、定义引用、依赖、黑/粉边与层、证明归属、去重、推广与特例、类比、记号、出处、中英一致……）的**唯一权威**是 `docs/workflows/content-quality.md`；本节只留技术性硬规则与最易踩的几条。
- **说实话**：推不通 / 有 gap → 写「骨架」并标 `status:'skeleton'`，注里写清缺哪一步；不确定的经典条件标出来让人核。不要用删 status 骗门；骨架是真缺口。
- `refs` 只写真实教材/论文；用户讲义、PDF 页、日期只能进 `_audit`。
- **反斜杠**：`src/data/packs/*.js` 里每个 LaTeX 反斜杠写**两个**（`\\forall`）；`_inbox/*.md` 里写**一个**。单反斜杠会静默把 `\quad` 变成 `quad`。⛔ 不对 `packs/*.js` 做批量格式化/自动修复；改前干跑、改后 `git diff` 抽验。
- 汉字不进 `$…$`；`label`/`tags`/`refs` 是纯文本（不含 `$`）；中英公式逐字相等，英文不含汉字。
- **一个概念一个节点；完整的蕴含证明写在边上**（节点放陈述 + 必要注，不是证明的存放处）。**关系必须落在边上并标清类型**：`definition` 与 `implication` 不混用；多个真前提写多源边，不造单源假蕴含，不造「A+B 合成节点」。
- **定义引用**：实质用到的概念，其**真实的直接**定义引用必须在图上（缺失/虚假/重复/指错都算问题）；但合法的**基础节点**可以没有入边的 definition，**没有任何「必须有入边」或「最少连接数」的要求**。孤立、层号异常、无入边都只是**调查候选**，不是造关系的理由：数学上确无可引用的前置时，登记缺口并问用户。层号由边派生，层不对改边，不接假边，不为统计或观感造边。
- **id 是对外契约**：先 `mg find` 查重；改名/删除要登记退役（`idstable`）。
- 节点正文是写给没参与过对话的读者的数学：不出现「本图约定」「用户拍板」「之前说过」，不写编辑过程、对话或版本号；**必要的数学约定（记号、符号选择、定义约定）要照写**，它们不属于过程评论。
- 不擅自改数学定义约定（Rng 是否含幺、Top 是否笛卡尔闭等）；待拍板事项见 `docs/STATUS.md`。

## 5. 投稿（外部 agent）与星团体检

- 投稿只写到 `_inbox/<名字>.md`，格式见 `_inbox/_模板.md`。⛔ 投稿时不改 `src/data/packs/*.js`、不跑 `tools/ingest.mjs`（那是人核验之后的一步）、不改 `src/core/`。
- 跑论文：先 `find` 已有概念 → 再推导（每个结论一个节点）→ 每个新结论连到**已有**概念 → 落 md → 报告写了什么、连了什么、**哪里不确定**。
- 加完星团后跑 `clustercheck <id>`（**诊断，不是准则**）：文引无边（真依赖补边，顺带提则把反引号降成中文词——反引号是承诺）、提到名字但无边、孤岛、对外连线只在本星系（只在确有真实关系时才补桥）。再手工查：承诺了但不存在的概念、同词不同物（需要时补**消歧注**；消歧与数学类比是两回事，类比边只在确有数学类比时才建）、骨架标注、反常识表述。

## 6. 受保护的资产与分类

| 类别 | 路径 | 规则 |
|---|---|---|
| 维护中的源码 / 可复用工具 | `src/`、`tools/`（含被跟踪的 `_tools/` 子集）| 只做任务范围内的改动；新工具先看能否扩展现有 |
| 内容与翻译 | `src/data/packs/`、`src/data/i18n/` | 非任务范围不改 |
| 永久审计记录 / 转写 | `_audit/` 里的 `out/AUD-*`、`proof/`、`_proofs/`、`group-rep/`、问题清单 | **不删**；`_audit` 整个未入 git，删除不可恢复 |
| 参考资料 / 形式化 | `_pdf/`、`formal/` | **不删**（项目不依赖 Lean，但 `formal/` 是研究成果） |
| 必需的构建/部署产物 | `dist/`（已跟踪）、`dist-site/` | 不手改；不因「是产物」就删 |
| 历史归档 | `docs/archive/`、`B:\MathGalaxy-archive\`（带 manifest + sha256） | 保留，可恢复 |
| 一次性临时物 | `_tmp/`、scratchpad | 按 §7 生命周期清理 |

一次性脚本只有在**可复用、用途明确、有文档**时才升入 `tools/`；优先扩展已有工具，不攒近似重复的 fixer / 调试脚本。有价值的数学发现、证明、审计结论、实验结果必须保留，哪怕产生它们的临时文件被清掉。

## 7. 临时文件生命周期

- 一次性脚本、中间结果、临时图转储、调试截图、浏览器 profile、临时构建、测试日志、临时仓库副本，**只放** `_tmp/<任务id>-<时间戳>/`（已 git 忽略）或会话 scratchpad。⛔ 不把 `_audit/`、`tools/`、仓库根当草稿区。
- 每个任务目录放一个 `MANIFEST.md`（谁、为什么、产出什么；模板见 `CONTRIBUTING.md`）。`hygiene.mjs` 据此判断归属。
- 流程：建隔离目录 → 记清单 → 执行并验证 → **有复用价值的升格到正式位置** → 验证成功后清理本任务自有产物 → 停掉本任务起的后台进程 → 报告留下了什么、为什么。失败时只保留诊断所需的最小集合。
- **清理安全**：只删「已核实由本任务创建」且**路径落在本任务目录内**的显式条目；不跟随符号链接/junction；不碰别的会话的目录；归属不明就保留并报告。
- ⛔ 不用通配符删除、`git clean`、`git reset --hard`。浏览器 profile / token / 凭据**不归档、不展示内容**。

## 8. 工作区卫生检查（只读）

`bun tools/hygiene.mjs [--max-age-days N] [--json]`：报告根目录异常文件、疑似错放的临时物、`tools/` 里不该有的文件、未登记的未跟踪目录、`_tmp/` 里过期或没有 `MANIFEST.md` 的目录。它**从不删除/移动/修改**任何文件，不递归扫 `_audit/` `_pdf/`，输出只含路径。它是提醒，不是门；清理仍由任务按 §7 手动完成。

## 9. Git 与 GitHub

- ⛔ **未经明确批准不 commit、不 push、不 force-push、不改写历史、不 publish。**
- ⛔ 不 `git add -A`（常有多个 agent 同时写）；只 stage 自己改的明确路径，`dist/` 随源码一起提交。
- **保护已有未提交改动**：开工先 `git status`；不 `reset --hard` / `checkout -- <路径>` / `stash drop` 去丢它们；有副作用的 build 优先在隔离副本跑。
- 提交信息用 UTF-8 文件：`git commit -F <file>`。remote 是 SSH；`.git/config` 里残留的 HTTPS 代理是历史，别动。
- ⛔ 未经授权不改系统级网络、防火墙、代理设置。⛔ 不暴露凭据、API key、token、浏览器 profile。

## 10. Claude Pro 额度与上下文效率

- 只读与当前任务相关的文档；不反复扫全库；不把 `graph.json`、`_audit/`、`_pdf/` 读进上下文。
- 计数、搜索、抽取、比对、哈希、校验一律用**确定性脚本**，只把紧凑摘要带回上下文；复用已有清单与分析结果。
- 先用 `mg.mjs` 与维护中的工具，别重新解决已解决的问题；少发冗余工具调用，别为小事派子 agent。
- 重要的长期决定写进项目文档（`docs/STATUS.md` 等），不要靠对话历史。
- 并行 codex/子 agent 只在写域不重叠、确有收益时用；它们的输出是线索不是结论，必须回读核验。

## 11. 任务完成清单（缺一项不算完成）

1. 验证改动（对应的门 + 必要时亲眼看）。
2. 查 `git status`，确认没有意外改动、没丢已有未提交改动。
3. 保住有价值的数学研究与审计结果。
4. 真正可复用的脚本升格到合适位置。
5. 删除**已核实为本任务自有**的临时产物（§7）。
6. 停掉本任务起的后台进程。
7. 更新相关文档（含 `docs/STATUS.md`）。
8. 记录未解决的问题与待决事项。
9. 汇报：有意的永久改动、仍保留的临时物及原因。

主实现跑通 ≠ 完成；工作区整洁和成果留存也是完成条件。

## 12. 环境（现行）

仓库 `B:\MathGalaxy`；bun 在 PATH（`npm i -g bun`，`%APPDATA%\npm`）；git `C:\Program Files\Git`；Edge `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`。
`H:\MathGalaxy`、`C:\Users\MSI\...`、`H:\Git\...`、`~/.dsh`、Codex `gpt-6.1-*` 等是迁移前 DeepSeek Harness 机器的历史配置，只在 `docs/archive/` 里保留。
