# AGENTS.md · 数学星图 MathGalaxy

> 所有 agent（Claude Code / Codex / 其他）共用的**唯一操作规则**。`CLAUDE.md` 是 Claude Code 的短入口。
> 这里只写「必须知道的」；细节按任务读 `docs/` 里的专题，不要整本加载。规模数字一律跑 `bun tools/mg.mjs stat`，别信文档。

## 文档层级

| 文档 | 职责 | 何时读 |
|---|---|---|
| `CLAUDE.md` | Claude Code 入口（命令、红线） | 每次会话 |
| `AGENTS.md`（本文件） | 规范规则 | 每次会话 |
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
```
- **加内容**：build → katexcheck-all → doccheck → searchcheck → idstable →（加了星团）clustercheck。
- **性能敏感改动（不止 `src/core/`）**：渲染、布局/预计算、图算法与数据结构、缓存、交互、资源加载、性能关键的构建流程——**开工前必须读** `PERFORMANCE.md`（§0.0 准入规则）与 `docs/performance-runbook.md`；重大改动要前后实测（`_tools/_dragbench.mjs` + `_chainprobe.js`，启动类另报 `layoutMs`），另需引擎冒烟 + 带裁剪墨量比对 + **亲眼看截图**（runbook 4.1.3）。⛔ 不放宽 `perfguard` 断言、旋钮区间或帧时判据来迁就退化。build 绿 ≠ 改对了。
- 运行时是 bun（`doccheck` 等用 `import.meta.dir`，node 跑不了）。红了就是真问题，**不要改基准去骗门**。
- 在隔离副本里验证有副作用的命令：`git archive HEAD` 解到 `_tmp/` 或 scratchpad，再叠上工作树改动。

## 4. 数学完整性与 LaTeX

- **说实话**：推不通 / 有 gap → 写「骨架」并标 `status:'skeleton'`，注里写清缺哪一步；不确定的经典条件标出来让人核。不要用删 status 骗门；骨架是真缺口。
- `refs` 只写真实教材/论文；用户讲义、PDF 页、日期只能进 `_audit`。
- **反斜杠**：`src/data/packs/*.js` 里每个 LaTeX 反斜杠写**两个**（`\\forall`）；`_inbox/*.md` 里写**一个**。单反斜杠会静默把 `\quad` 变成 `quad`。⛔ 不对 `packs/*.js` 做批量格式化/自动修复；改前干跑、改后 `git diff` 抽验。
- 汉字不进 `$…$`；`label`/`tags`/`refs` 是纯文本（不含 `$`）；中英公式逐字相等，英文不含汉字。
- **一个概念一个节点；证明写在边上**（节点只放陈述 + 必要注）。**关系必须落在边上并标清类型**：`definition`（定义依赖）与 `implication`（推出）不混用；多个真前提写多源边，不造单源假蕴含，不造「A+B 合成节点」。
- 新节点必须有 definition 入边（否则层号掉 0），别造孤岛；先找更一般的已有节点。层号由边派生，层不对改边，不接假边。
- **id 是对外契约**：先 `mg find` 查重；改名/删除要登记退役（`idstable`）。
- 节点正文是写给没参与过对话的读者的：不出现「本图约定」「用户拍板」「之前说过」，不写编辑过程或版本号。
- 不擅自改数学定义约定（Rng 是否含幺、Top 是否笛卡尔闭等）；待拍板事项见 `docs/STATUS.md`。

## 5. 投稿（外部 agent）与星团体检

- 投稿只写到 `_inbox/<名字>.md`，格式见 `_inbox/_模板.md`。⛔ 投稿时不改 `src/data/packs/*.js`、不跑 `tools/ingest.mjs`（那是人核验之后的一步）、不改 `src/core/`。
- 跑论文：先 `find` 已有概念 → 再推导（每个结论一个节点）→ 每个新结论连到**已有**概念 → 落 md → 报告写了什么、连了什么、**哪里不确定**。
- 加完星团后跑 `clustercheck <id>`：文引无边（真依赖补边，顺带提则把反引号降成中文词——反引号是承诺）、提到名字但无边、孤岛、对外连线只在本星系（去找真实的桥）。再手工查：承诺了但不存在的概念、同词不同物（补消歧注与类比边）、骨架标注、反常识表述。

## 6. 受保护的资产与分类

| 类别 | 路径 | 规则 |
|---|---|---|
| 维护中的源码 / 可复用工具 | `src/`、`tools/`（含被跟踪的 `_tools/` 14 个）| 只做任务范围内的改动；新工具先看能否扩展现有 |
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
