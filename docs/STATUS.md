# 当前状态与待办（2026-11-24）

> 这是**唯一**需要随工作更新的状态文档。历史细节在 `docs/archive/`，不要因为查它而整本加载。
> 规模数字一律跑 `bun tools/mg.mjs stat`，这里不写死。

## 发布状态（2026-11-24 已提交并发布）

分两次提交推到 `origin/main`（A=`7465c7315`、B=`da32329fa`，CI「体检」通过），站点用 `tools/publish.mjs --stage --no-build` 组装后以普通 fast-forward 推到 `bingyingzizz.github.io` 的 `main`（`eae980f12`），线上 `graph.json`（英文节点 1274）、续页、`layout.json` 签名均已核对：

| 提交 | 内容 |
|---|---|
| A · 治理 | `CLAUDE.md`、精简的 `AGENTS.md`、`docs/`（专题 + `archive/`）、`tools/hygiene.mjs`、性能准入规则（`PERFORMANCE.md` §0.0 与 §10）、doccheck 扫描清单、3 个可移植性修复、hook/workflow 的引用更新、`.gitignore` 加 `_tmp/` |
| B · 内容 | `src/data/i18n/statements.en.js`（约 330 条英文陈述/注）+ `tools/searchcheck.mjs` 的 3 条基准（`preadditive` n=6、`yoneda` n=12、`compact` total=177，理由写在各行 `why`）+ 由此重建的 `dist/` 与根目录生成文档（含新增的英文分页 `*.N.md`） |

- 未入库（刻意）：`formal/`（Lean 工程，等你决定）、`_audit/`、`_pdf/`、`_tools/`、`dist-site/`、`B:\MathGalaxy-archive\`。迁移交接单只存在于 `B:\MathGalaxy-archive\HANDOFF-2026-11-23.md`（含本机凭据位置描述，仓库是公开的）。
- 推送方式的偏差：这台 VM 没有 `~/.ssh`（SSH remote 无法认证），主仓库这次用 HTTPS 一次性 URL + 已存的 Git Credential Manager 登录推送（未改 remote 配置）；`publish.mjs` 自带的 `push --force` 没有使用，站点仓库按普通 fast-forward 推送。
- 需要时再决定：给这台机器配 SSH key（或把 remote 改成 HTTPS）；`tools/publish.mjs` 是否继续保留 `--force`。

## 未完成的工作

1. **英文翻译**：先 `bun tools/i18n-status.mjs` 重算缺口（交接单估计还有约 427 条可翻、35 条中文陈述公式含汉字不能直译，需先决定改中文公式还是跳过）。`i18n-status` 当前另报 37 条 `stale`。
2. **骨架证明**：以 `dist/graph.json` 的 `edges[].status` / 节点 status 为准；旧口径「19 个节点、18 条骨架边」与「5 条」不一致，**重算后再信**。不要为了过门删 `status:'skeleton'`。
3. **AUD-060 A 档**（HANDOVER §4.10，2026-11-09 快照）：127 条 definition 边指向定理、25 条读者可见文案、190 条无 id 边、78 个 aka、refs 缺书名等。修之前先读 `_audit/问题清单-v2-2026-11-03.md` 对应 § 并重新核对是否已修。
4. **章节核实书单**（16 本优先书：Munkres、Engelking、Weibel、Tu 等）。
5. **硬错 19 条**：2026-11-05 对账为 2 已修 / 3 部分 / 14 未修（`docs/archive/HANDOVER-2026-11-09.md` §4.4）；之后是否又修了需复核。
6. 已解决：凸性一族（`def.convex-set` 等四个节点现已存在）。

## Task 2（DeepSeek 批处理流水线）进度

- 已实现并离线自测通过（未提交）：`tools/llm/`（客户端/结果库/预算账本/校验/回写）+ `docs/llm-pipeline.md`；`tools/publish-git.mjs`（发布改为普通快进推送 + 显式暂存清单，分叉即停；**行为变化**，等你确认）。
- **试点 pilot1（已完成 2026-11-24，10 项；`def.group-representation` 摘要因无中文摘要源被剔除，未替换）**：10 次请求全部 finish=stop、无重试、无未知用量；API usage 输入 7917（命中 2176 = 27.5%）/ 输出 2599 token；按峰值价计算 $0.004854（估价上限 $0.0265、预算 $0.06，余 $0.0551）；缓存节省 $0.00064。形式校验 0 invalid（1 ok / 9 review）；人工逐条语义核对：8 项忠实、1 项需人工改（`imp.det-exists-unique` 证法一把费解原文「规范的零点」静默改成 normalization，且未报歧义）、1 项术语需改（边标题「Tor product」）。**无任何译文已批准/回写**；证明与边标题只是候选。待办：全站前先做同质小簇基准（需另行批准）、体检自动词条、收紧启发式误报（不等式→negation、唯一性→uniqueness、某个→existential）。命令见 `docs/llm-pipeline.md`。
- 实测口径（`bun tools/llm/inventory.mjs`）：陈述已有译文 1274 个节点、缺 462（其中 35 个公式含汉字被阻塞）——与交接单一致；`title_en` 是另一回事，1736/1736 是英文**名字**。全站其它缺口：边说明缺 2161、枢纽摘要缺 100、证明 974 条（单 950 + 等价 22 + 证法 2）全部无英文层且界面不能显示。

## 要用户拍板的事

| # | 事项 | 来源 |
|---|---|---|
| 1 | `thm.adic-gluing` / `prop.analytic-base-change` 引的章节在手头原文里**不存在**：补续篇，还是 refs 改成不指章节 | HANDOVER §5.1 |
| 2 | `def.ricci-curvature` 符号约定与 $R_{ij}=Kg_{ij}$ 矛盾，需整团统一 | §5.2 |
| 3 | 人名写法：`Riesz–Markov` / `Pontryagin` 用本人语言写法还是通行拉丁写法 | §5.3 |
| 4 | `refs` 的 17 条 A 类（Tu GTM 334 vs 275 共 13 条）：确认改指还是标「待核」 | §5.4 |
| 5 | 是否把 `tools/_katexcheck.mjs` 纳入版本库：它只查源码里的 `$$…$$`，是 `_katexcheck-all.mjs`（权威，CI 用）的真子集。**建议不跟踪、不合并**；等确认没有文档依赖后归档。`tools/ingest.mjs` 的提示文字和旧文档还引用它 | 本次迁移 |
| 6 | 迁移遗留的延后项：`_audit/*.json` 历史图转储（#9）；`dist-site/_CON`（#18）已在发布组装时随清空一并移除（内容只是一行 git 凭据提示，无敏感信息） | 清理报告 |
| 7 | `.githooks/pre-commit` 里的 bun 兜底路径是旧机器的；现靠 PATH 命中，可不改 | 迁移 |

## 已知环境事实

- bun 经 `npm i -g bun` 装在 `%APPDATA%\npm`；5 个脚本用 `import.meta.dir`（bun 专有），其中 `doccheck` 是硬门，所以**要用 bun，不能用 node 替代**。
- `.git/config` 残留 `http.https://github.com/.proxy = 127.0.0.1:7897`；remote 是 SSH；未改动。
- 浏览器 profile 已删除（含 token，未归档）。归档在 `B:\MathGalaxy-archive\`，带 manifest 与 sha256。
- 执行偏差记录：清理中曾用通配符 `rm -f …/item11*` 删除自己失败尝试产生的 3 个文件（违反「只用显式路径」）。预防见 `AGENTS.md`「临时文件」与 `tools/hygiene.mjs`。

## 文档检查覆盖（doccheck）

- 迁移整理前 doccheck 共查 36 处声明、整理后 16 处。少掉的 20 处逐条核对过：`AGENTS.md` 2 处（规模句）+ `HANDOVER.md` 18 处（重复的 §0 统计块与规模行）。
  其中 10 处的事实仍被 `README.md` / `llms.txt` 的同类声明覆盖（重复）；另 10 处是 2026-11-07 的统计快照（强边 / 推论 / 英文页 / 别名 / 问法钩子，各出现两遍），现行文档不再陈述它们，故不需要恢复。没有「仍然有效却丢了校验」的声明。
- 现行文档刻意不写死规模（用 `bun tools/mg.mjs stat`）。`CLAUDE.md`、`docs/STATUS.md`、`docs/content-guidelines.md`、`docs/tools-and-methods.md`、`docs/performance-runbook.md` 已加入 doccheck 的扫描清单（内部文档，非 `--strict` 时只提醒），谁把规模数字写回去会被抓到。`docs/archive/` 是历史快照，不扫。

## 同质基准 bench1（待批准，未执行）· 2026-11-24

- 已备好：`_audit/llm-store/bench1/manifest.json`（cat.basic 星团，82 条：edge-note 60、node-statement 9、node-notes 7、edge-proof 6；两臂 item/cluster 各半，无重复翻译）；第二遍语义初筛 `review2.mjs`（未跑）；源文问题登记簿 `docs/source-review-register.md`；成本模型 `bun tools/llm/costmodel.mjs`。
- 离线自测 69/69。**没有任何计费请求**；运行与否等用户批准（提案见对话/下一步）。
- 待办：中文源文订正由作者按登记簿处理；词表体检只覆盖高影响面，其余 ~160 条标记在基准里复核；渲染是否露出「反斜杠+反引号」的反斜杠未验证（SR-8）。

## Task 2 收尾（2026-11-24）

- **路由已写进持久指令**：`AGENTS.md §0`（强制任务路由）+ `CLAUDE.md` 开工顺序第 0 步 + `docs/llm-pipeline.md`「任务路由与默认工作流」。
- **默认工作流已落地**：翻译 → 确定性校验 → 独立 DeepSeek 语义审核（thinking 开，`review2.mjs`）→ 门（pass/correct/escalate/hold/retry，至多一轮返工）→ 回写（`apply --legacy-from` 复用试点译文）→ build。
- **试点译文待审核后回写**：可回写类型只有 3 条（convex 陈述/说明、mittag-leffler 边说明）；lax-milgram 陈述因源文含「本图约定」（SR-6）暂不回写；证明 6 条与边标题 1 条只导出候选；摘要未译。**未回写任何译文**——等 `review2.mjs` 审核（需密钥与你批准的上限，估价见对话）。
- **未验证（首次真实审核时核对）**：thinking 与 JSON 模式同用、推理 token 是否含在 `max_tokens`、其计费。
- **发布**：尚未 commit/push/publish；暂存清单见对话。

## pilot1 审核受阻（2026-11-24）

- 常设预算已落地（`tools/llm/budget-policy.json`：单任务 ≤ $0.50、每日 ≤ $2.00，账本强制；写入 AGENTS.md §0 与 docs/llm-pipeline.md）。
- `review2.mjs run --from pilot --campaign pilot1-audit --max-usd 0.08` 已发出 10 次请求，**全部 HTTP 401（API key 无效）**；未计费（账本：10 reserve / 10 release，今日已花 $0.004854）。环境变量 DEEPSEEK_API_KEY 形态正常（35 位、sk- 开头、无空白），但服务端拒绝——需在 DeepSeek 控制台核对/重新生成密钥。
- 重跑：`review2.mjs run --from pilot --campaign pilot1-audit --max-usd 0.08 --limit 10 --retry-failed`（401 记录是 failed，需 `--retry-failed` 才会重发）。之后 gate → approve → `apply --legacy-from pilot1-snapshot` → 隔离副本 build 与各道门。

## pilot1 审核完成与回写（2026-11-24，Task 2 收尾）

- 新密钥后 `pilot1-audit` 10/10 成功，花费 $0.0106（上限 $0.08；当日累计 $0.0155）。门：pass 7 · correct 0（无需返工轮）· escalate 1 · hold 2 · retry 0。
- 已回写（draft）：仅 `edge-notes:imp.mittag-leffler`（`apply --legacy-from pilot1-snapshot`）。build、katexcheck、doccheck、searchcheck、idstable（干跑）、i18n-status 全绿。
- **保持搁置**：`thm.lax-milgram` 陈述（SR-6，已撤销批准，译文保留在结果库）；`def.convex-function` 陈述与说明（hold：源文疑点，见登记簿）。
- **留作候选导出**（不回写）：6 条证明 + 1 条边标题（`export`，6 行）；其中 `imp.det-exists-unique` 的一条证明被审核判为 `silent_source_repair`（源文「规范的零点」疑为笔误），升级给作者。
- 待办：提交与发布需用户批准（发布工具改动 `tools/publish*.mjs` 单独成提交）。

## Task 2 完成（网站发布推迟）· Task 2.6（已完成，见下节）

- **Task 2 已完成**：流水线、路由、常设预算、pilot1 审核与回写均已落地；**网站发布推迟**（等用户批准），发布工具改动（`tools/publish.mjs`、`tools/publish-git*.mjs`）尚未提交，保持独立。
- **（已在 Task 2.6 修复）源文复核优先级缺口**：SR-6 暴露：`review2.mjs gate` 只看译文审核结果，会把 `thm.lax-milgram:statement` 判 pass 并批准，即便登记簿里该条目有未解决的源文复核（open）。需要：**未解决的源文复核搁置项必须优先于译文审核批准**（门/批准/回写任一环遇到登记簿 open 项即拒绝批准或回写）。本次靠人工撤销批准（追加 `review` 状态记录）绕过，结果库中的译文与候选导出均保留。

## Task 2.6 完成（2026-11-24）· 工作流标准化与治理

> 状态：**已完成并经独立复核后收尾**。工作流与规程见 `docs/workflows/`；数学标准唯一权威是 `docs/workflows/content-quality.md`；问题登记见 `docs/audit-register.md`。规模数字不在这里写，跑 `bun tools/mg.mjs stat`。

- **已实现**：七个工作流 + 共用质量标准；`AGENTS.md` §0.0（分类并加载工作流、复合任务共享一份计划/预算/记录/报告）、§0.1（规则权威等级与 agent 权限）；`CLAUDE.md` 经 `@AGENTS.md` 自动加载；SR-6 优先级修复（`tools/llm/lib/holds.mjs`，`approve`/`apply`/`review2 gate` 三处硬拒绝，离线自测覆盖）；`clustercheck` 去掉「例子须 ≥ 2 条强边」旗标；`_proofaudit` 把边证明与 Notes 标记分开报告（正则启发式候选）；`doccheck` 扫描工作流并检查路由一致性。
- **收尾已解决的政策冲突**：定义引用只要求「真实的直接引用」，合法基础节点可无入边 definition，无最低连接数要求；同词不同物只需消歧注，类比边仅在确有数学类比时才建；存在性原则统一（性质/泛性质定义合法，但不自动证明存在）；废止「只保留最通用的版本」「保留推广程度最高的证法」，保留有价值的特例与不同证明；「团别超 40 点」降为诊断；`186-thin-fix.js` 的旧判据已标为被取代；「只写数学」不压制必要的数学约定。公开的 `policy.md`/`graph.json` 的内容策略与英文版 `policy.en.md` 已由生成器与 `docs.en.js` 同步（英文策略因文字已改，状态退回 `draft`，待用户审）。
- **保留（诊断/工程功能）**：`clustercheck` 的「孤岛」「无 refs」旗标是**调查候选**；`src/core/config.js` 的 `clusterLink.minEdges`/`crossSectorMinEdges` 是渲染去杂乱参数（不是数学组织规则），保留。
- **强制程度（如实）**：
  - 代码强制：每日 $2.00 预算（账本）；单战役上限；源文复核搁置（approve/apply/gate）；perfguard；doccheck 的路由一致性与硬数字。
  - **只靠指令**：开工前分类并读工作流；「每任务累计 $0.50 / 不拆战役」（代码不知道哪些战役属同一任务）；覆盖矩阵；审计记录字段；生命周期推进；整段独立验证；`content-quality` 的全部数学判据；agent 权限边界；审计抽取读的是否为目标版本（含未提交改动，`dist/graph.json` 可能陈旧）。
- **未实现 / 缺口（留给后续）**：
  - **受控替换过期译文**：`apply` 只追加、拒绝覆盖已有不同译文；没有「经授权、经校验的覆盖式更新」路径。源文修复后译文变 `stale` 时只能人工更新。
  - 源文复核搁置只阻止**新的**批准与回写，**不撤回已生效的错误译文**（需 content-edit 处理）。
  - 审计登记簿的机器可读 schema/校验、与审计/译文记录失效联动；增量审计有效性按源哈希自动判定。
  - Notes/边证明的数学审计适配器（DeepSeek thinking 开）；对重复/残留证明的**语义**判定。
  - 审计抽取版本新鲜度检查（生成物 vs 源/未提交改动）无自动化。
  - `content-quality` §5 的 SCC 缩点与层号—构造前提一致性检查无自动化（`tools/_layers.mjs` 只是报告）。
  - 站点统计「源 / 构建 / 已发布」三口径对照无自动化。
  - 英文证明显示与回写支持（`docs/llm-pipeline.md` 提案）。
  - PDF 流水线与**此前 DeepSeek 订正 PDF 的提示词/脚本的找回**：全部留给 Task 4。
  - 登记簿 AR-1…AR-10 的数学裁定与修复：一条未做，全部待修复战役。
- **延后的发布工具改动（保持独立、不提交、不批准）**：`tools/publish.mjs`、`tools/publish-git.mjs`、`tools/publish-git.selftest.mjs`。意图：把 `git add -A` + `push --force` 换成显式暂存清单 + 对账 + 普通快进推送（分叉即停，无强推开关）；自测只用本地仓库。**行为变化**：`--force` 不再存在；清单外的站点文件（如 IndexNow 密钥文件）会被删除，发布前需核对清单；未覆盖真实远端与凭据管理器。用户确认后再单独提交。预览/组装 `publish.mjs --stage` 会清空 `dist-site/` 工作树（见 `docs/workflows/homepage.md`）。
