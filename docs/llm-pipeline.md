# DeepSeek 批处理流水线 · `tools/llm/`

> 目的：把「大批量、规则明确」的语言模型活（英译、结构化抽取、初筛）交给**本地确定性脚本 → DeepSeek 官方 API**，
> Claude Code 只做架构、抽查与例外裁决。**模型输出永远是草稿**：形式校验通过 ≠ 数学等价被证明；模型自评从不构成批准。

## 分层与文件

| 层 | 负责 |
|---|---|
| Claude Code | 设计/改工具、读**摘要与例外清单**、裁决歧义、审可能改变数学含义的译文（尤其证明） |
| 本地脚本 | 盘点、稳定身份、哈希、批次、校验、调度、缓存、重试、预算、对账、受控回写 |
| DeepSeek API | 翻译 / 摘要 / 抽取（只收到完成该任务所需的最小公开文本） |

```
tools/llm/runner.mjs     CLI            batch.mjs   plan/run/validate/approve（库，适配器驱动）
tools/llm/jobs/*.mjs     适配器：node-text · abstract · edge-text · proof（jobs/index.mjs 注册）
tools/llm/apply.mjs      受控回写（三种目标）+ 候选导出     pilot.mjs   试点选样（确定性）
tools/llm/store.mjs      结果库（追加式 JSONL）            billing.mjs 持久预算账本（独立，只追加）
tools/llm/deepseek.mjs   客户端 + buildBody（唯一请求体）   cost.mjs    价格/估算/实际折算（严格校验）
tools/llm/validate.mjs   确定性校验                        inventory.mjs 全站盘点
tools/llm/lib/           lock · source（身份）· glossary · mgload（按 index.html 加载顺序）· util
tools/llm/test/ + selftest.mjs   离线自测（mock 传输，零计费）
tools/publish-git.mjs + .selftest.mjs   发布的 git 步骤（独立改动，见末节）
```

## 流程（每步独立命令，**互不自动串联**）

```bash
bun tools/llm/inventory.mjs [--cross]                  # 全站盘点；--cross 与 i18n-status 对账
bun tools/llm/runner.mjs pilot-select                  # 异质试点选样（确定性）
bun tools/llm/runner.mjs plan --pilot                  # 干跑：零请求；输入 token/输出上限/峰值价估算
bun tools/llm/runner.mjs run --pilot --campaign pilot1 --max-usd 0.10 --limit 12   # 唯一计费的一步
bun tools/llm/runner.mjs validate --pilot              # 离线校验（可反复；改规则不用再付费）
bun tools/llm/runner.mjs report                        # 状态汇总 + 例外清单（给 Claude 读这个）
bun tools/llm/runner.mjs show --identities a,b         # 并排看中文/英文（人审用）
bun tools/llm/runner.mjs approve --identities a,b      # 逐条批准（ok 可 --all-ok；review 必须点名）
bun tools/llm/runner.mjs diff | apply --yes            # 预演 / 回写（apply 须人批准后才跑）
bun tools/llm/runner.mjs export                        # 证明与边标题 → _audit/llm-store/export/candidates.json
bun tools/llm/runner.mjs store verify|compact|unlock
bun tools/llm/selftest.mjs                             # 改了流水线必须先绿
```

`run` 必须同时给 `--campaign --max-usd --limit`，且 `DEEPSEEK_API_KEY` 已设置才会发请求；默认永远是干跑。
**凭据只认环境变量 `DEEPSEEK_API_KEY`**：不接受文件、命令行参数；任何输出/账本/store 都做脱敏。
设置方式（只在你自己的终端、不进对话、不进仓库）：在 PowerShell 里 `$env:DEEPSEEK_API_KEY = Read-Host 'key'` 后**从同一窗口**启动 Claude Code；
或在 Windows「编辑账户的环境变量」里设用户变量（重启终端生效）。⛔ 不要写进任何文件。
默认模型 `deepseek-flash`，非思考（`thinking: disabled`）+ JSON 输出 + `temperature 0`；不会静默回退到别的模型。

## 全站盘点口径（`inventory.mjs`，2026-11-24 实测，数字以当次输出为准）

两条**独立**的轴：**译文可得性**（可译/已有/缺失/草稿/已审/过期/阻塞/无源）与**显示支持**（英文界面有没有消费路径）。
没有中文源文的字段记「无源」（缺的是数学内容，**不是**待译项，流水线不会凭空编造）。每个权威源只算一次；生成的页面、重复显示路径不是源。

| 类型 | 可译 | 已有 | 缺失 | 阻塞 | 显示 | 备注 |
|---|---|---|---|---|---|---|
| node.title / label | 1736 / 1736 | 1736 / 1438 | 0 / 298 | – | 支持 | 派生自 aka，无 basedOn，不走 LLM；`title_en` ≠ 译文覆盖 |
| node.statement | 1736 | 1274（草稿 1214·已审 45·过期 15） | 462 | 35 | 支持 | 缺失含阻塞；35 个公式含汉字须先改中文公式 |
| node.notes | 1728 | 1247（1204·23·20） | 481 | 36 | 支持 | 8 个节点无说明；另有 2 条孤儿译文（中文说明已删） |
| node.abstract | 139 | 39 | 100 | 3（公式含汉字）| 支持 | 枢纽 106 个，仅枢纽 |
| node.hypotheses | 7 个标签 | 7（词表已有 en） | 0 | – | **不支持** | `panel.js:71` 直接显示中文 |
| edge.note | 3693 | 1532（全草稿） | 2161 | 1 | 支持 | 491 条边无说明 |
| edge.title | 762 | 0 | 762 | – | 部分 | 面板用 `title_en`，但 `graph.js` 白名单不拷贝它、也无旁挂文件 |
| edge.label | 0 | – | – | – | – | 全部为空 |
| edge.proof（单证明） | 950（边 950） | 0 | 950 | 54 | **不支持** | 面板直接显示中文 |
| edge.proofs · 等价两向 | 22（边 11） | 0 | 22 | 3 | **不支持** | 每条等价边 2 个方向 |
| edge.proofs · 多种证法 | 2（边 1） | 0 | 2 | 0 | **不支持** | 蕴含边 `imp.det-exists-unique` |
| proofs 标签 | 24 | 0 | 24 | – | 不支持 | 步骤标题 |
| region/cluster/sector 名 | 126 | 126 | 0 | – | 支持 | 数据里自带 `en` |
| region/cluster/sector desc | 126 | 0 | 126 | – | 不支持 | 只进 build 生成的中文目录页，应用不显示 |
| UI 文案 | 181 键 | 181 | 0 | – | 支持 | `ui.en.js`，不进流水线 |
| docs（阅读/记号/政策） | – | – | – | – | – | `docs.en.js` 由作者维护，不进流水线 |

- 证明口径：974 条单独证明（边 962 条有证明；3222 条边没有证明源）；14 条超过单段上限，其中能切的切、不能切的被拒（见下）；57 条因公式含汉字或身份相撞被阻塞。当前数据里「等价面板中的平行蕴含」为 0 处（逻辑已实现并有测试）。
- **与现有工具对账**（`inventory --cross`）：陈述 draft/reviewed/stale、说明 draft/reviewed、摘要三态全部与 `i18n-status.mjs` 一致；唯一差异是说明 stale：i18n-status 22、本盘点 20——差的 2 条是**孤儿译文**（`prop.module-tensor-universal`、`thm.tietze-banach` 的中文说明已清空，译文还在），盘点把它们单列而不计入可译。
- 加载顺序：`lib/mgload.mjs` 按 `index.html` 的 `<script>` 顺序载入 `src/data/*`；`hypotheses.js` / `gaps.js` / `docs.en.js` 不在 index.html 里，仅 build 载入，所以作为「仅 build」文件追加（`loadMG` 返回 `buildOnly`）。
- 公式抽取与 KaTeX：`formulasOf` 与 `build.mjs` 同一口径；KaTeX 用仓库自带 `src/ui/katex.min.js`，`throwOnError:true`（严于浏览器的 `false`）。

## 适配器与身份

每个适配器导出：`collect`（源抽取 + 上下文选择 + 请求构造）、`parse`（严格 schema，多/缺字段即拒）、`assemble`、`SYSTEM`（版本化提示）、`review`、`cfgHash`、`modeOf`（内容专属校验）、可选 `validateExtra`；写入目标由 `apply.mjs` 的渲染器负责。

| 适配器 | 身份 | 写入 |
|---|---|---|
| node-text | `node:<id>:statement｜notes` | `statements.en.js`（新条目 + 字段级追加）|
| abstract | `node:<id>:abstract`（一律送审；公式只能取自源文）| `abstracts.en.js` |
| edge-text | `edge:<id>:note` ｜ `edge:<id>:title` | note → `edge-notes.en.js`；title → 仅候选导出 |
| proof | `edge:<id>:proof` ｜ `edge:<id>:proofs:<pid>` | **仅候选导出** |

- 缓存键 = hash{身份, 源哈希, 配置哈希, 各请求体哈希}；请求体含源文、标题、被引节点英文名、命中术语、提示/schema 版本、模型与参数，所以任何一项变化只作废受影响的条目。`srcHash` 另存，回写时校验「中文没变」。
- 身份前缀 `node:` / `edge:` 保证同名的节点 id 与边 id 不会相撞。
- **证明身份**：`pid` = sha256(标签) 前 20 位（80 位）；**顺序只是元数据，不进身份**，所以重排不会错配译文；改标签 = 新身份（旧译文视为不匹配，不会静默沿用）；同边标签重复/为空则改用「标签+文本哈希」并打标记；同边身份仍相撞 → 该边整体被拒。
- **不重复翻译**：等价面板里「被遮住的平行蕴含」读的是蕴含边自己的 `proof`，权威源只在那条蕴含边上，只翻译一次。
- **术语**（`lib/glossary.mjs`）：候选 = `glossary.json` ∪ 图里节点的已审 `label→label_en`；只取 ≥2 字、按最长匹配、公式内不参与；单字词（积/链/商…）一律不自动选；`ambiguous` 词与上下文规则（如「极限」后接序数）不选；同名不同译整条丢弃。选中的术语在请求体里，所以进缓存键。
- **长证明切分**：只在空行段落边界切，不切 `$…$`/`$$…$$`（含跨空行的块公式），单个超长段落不能任意切 → 该证明被拒。每段请求带**中文原文**的前 500 字/后 200 字与符号表；各段互相独立；重组按原始分隔逐字拼回，**整条证明重新校验**，一律需要人工语义审查并提示「被切成 N 段，须通读」。
- 证明提示 `proof-v1`：忠实、不修复/补全/简化/加强/削弱；疑似数学错误只放进独立的 `suspected_errors`。**翻译不是验证。**

## 存储 · 保留 · Git · 恢复

- 结果库 `_audit/llm-store/<op>.jsonl`（持久；`_*` 已 git 忽略；`MG_LLM_STORE` 可改位置）。记录两层：`part`（一次请求，键 = 请求体哈希）与 `item`（翻译单元）。**永不自动清理**；`compact` 手动，先写新文件并重新解析校验、再做带哈希核对的 `.bak`、最后原子替换，与普通写同一把锁。
- 预算账本 `_audit/llm-store/billing.jsonl`：独立、只追加、**compact 不碰它**，保留全部历史。回写备份 `backups/`、回写日志 `apply.journal.json`（存在 = 上次回写被打断）。
- `_audit/` **不入 git、删除不可恢复**，请与其他审计资产一起备份。结果库只含模型输出与用量，**不含密钥**。一次性物放 `_tmp/<任务>-<时间戳>/`（带 MANIFEST.md），验证后按显式路径删除。
- **锁**（`lib/lock.mjs`）：原子创建（临时文件 → `link`）；属主 {pid, host, token}；**绝不因「年龄」回收**；仅「同主机且 pid 已死」自动回收，回收者先独占 `.reclaim` 互斥锁、重读并核对 token 后才删，所以不会删到刚获得的活锁；回收互斥锁残留、跨主机、元数据损坏、pid 复用 → **一律人工**（`store unlock` 显示属主，`--force --token` 才删）；释放前核对 token；`withLock` 只接受同步回调（async/Promise 直接抛错）。
- 读写：追加 = 增量刷新（只读上次偏移之后的新字节）+ 单次 O_APPEND + fsync，开销线性；每条记录做 schema/状态白名单校验；末尾撕裂半行 → 存入 `.torn` 再截断；**中间**坏行 → 拒绝加载，不改写、不丢弃。

## 预算与 API 安全

- 账本分四个口径，**绝不混报**：`actual`（API 报告的 usage 按峰值价折算）、`sunk`（用量未知的保守估计）、`open`（在途预留）、供应商真实账单（以控制台为准，**本地无法保证精确上限**）。
- **每次可能计费的请求在派发前先把预留写盘**（持锁、fsync）；准入 = `actual + sunk + open + 本次 ≤ 活动上限`，所有进程共享；活动上限创建后不可改；进程崩溃留下的预留，下次启动按沉没估计回收；重试每次重新预留；429/4xx（未执行）释放，超时/断连/5xx/畸形 usage 保守计沉没；沉没超上限 25% 即停。
- **估算**：整请求 JSON 的 UTF-8 字节数 + 每条消息 32 token 协议开销当输入 token（对常见分词器偏保守，但**不是保证的上界**）；输出按 `max_tokens` 满额；峰值价、输入全按未命中。若实测 `prompt_tokens` 超过估算 → 立即停止并留痕。
- **数值严格校验**：预算、价格、token 数、usage 一律要求有限、非负（整数处要整数）；`hit + miss ≠ prompt` 视为畸形；畸形不当 0。
- **请求体唯一**：`buildBody()` 同时用于哈希、估算、发送；可选参数白名单仅 `temperature`（0–1）；`model/messages/max_tokens/thinking/stream/response_format` 等受保护，传入即拒。
- **响应**：必须 `finish_reason === 'stop'`、内容非空，否则判 `invalid`（官方还会返回 `length/content_filter/insufficient_system_resource/aborted`，一律不接受）；已发生的花费仍如实结算；响应模型与请求不符只计数、不换模型。
- 官方文档（2026-11-24 两次核对）：端点 `https://api.deepseek.com/chat/completions`；模型 `deepseek-flash`；峰值价（美元/百万 token）命中 0.006 / 未命中 0.30 / 输出 1.20（非峰值减半；峰值 UTC 周一至周五 01–04、06–10，中国法定假日除外）；`thinking:{type:"disabled"}` 关思考；JSON 模式需提示里含 "json"，非 JSON 输出会被替换成空格（空内容须当失败处理）。文档**没有**列出「可重试状态码」集合——`pricing.json` 的 `retryableStatus` 是我们按各码建议做的推断；「关思考时 temperature 是否生效」文档未明确（我们发 0，无害）。
- 只发送公开的数学内容与最小术语上下文：来源白名单 = 图里节点/边的 statement、notes、note、title、proof(s)（均来自 `src/data/packs`）；不发 `_audit`、`_pdf`、`formal/`、私有笔记、凭据或任意文件。

## 缓存感知（上下文缓存 + 本地结果缓存，2026-11-24）

DeepSeek 的上下文缓存是**尽力而为**、只认**逐 token 相同的前缀**、构建需数秒、默认开启（官方 kv_cache 页）；usage 里报 `prompt_cache_hit_tokens / prompt_cache_miss_tokens`。我们的做法（不改 `buildBody`、不改 adapter 架构、不合并条目）：

- **请求结构**：system = 全局稳定的 `HEAD+RULES`（四个适配器逐字相同）→ 内容类型专属规则与 schema（版本号放这里，在公共部分之后）；user JSON 键序固定 `kind → glossary（键排序）→ 条目元数据 → source_text_zh（永远最后）`。前缀里无时间戳 / 请求 id / 条目 id。**不人为加长前缀**。
- **前缀组** `prefixGroup` = hash(system + kind + glossary)，与条目 id、源文无关；只是调度与报表的标签，不进缓存键，缓存键仍是完整请求体哈希。
- **调度**（`lib/schedule.mjs`，确定性、与输入顺序无关）：适配器 → kind → sector → cluster → 前缀组 → 身份 → 段号；`--limit` 取这个顺序的前 N 个。分三段：暖机（前 1 个串行，让公共前缀先入缓存）→ 各前缀组的第一个（播种，并发）→ 其余（并发）。每个请求仍独立可识别/续跑/重试/审阅。**试点不做多条目合并请求**；同质小批量只能在另行批准的基准里证明质量、逐条校验、重试隔离与缓存收益后再考虑。
- **预算不变**：预留仍按峰值价、全未命中、满额 `max_tokens`、可计费的重试与未决请求；**不依赖**预测命中或谷价折扣。
- **报表**：`bun tools/llm/runner.mjs usage --campaign pilot1 [--by campaign,sector,cluster,ctype,group]`（只读）。三口径分开：API 报告的 usage（hit/miss/out）｜按峰值价算出的成本、等价无缓存成本、缓存节省 = hit×(未命中价−命中价)｜供应商真实账单（以控制台为准）。重试与用量未知（sunk 估计）单列；**本地结果库命中**（根本没发请求，来自 `runs.jsonl`）与**供应商上下文缓存命中**（降低输入单价）分开计。part 记录带 `ctype/sector/cluster/group/tok/savingsUsd`。
- **峰谷**：官方（2026-11-24 复核）峰值 UTC 周一至周五 01–04、06–10（中国法定假日除外），其余时段（含周末）为谷，价格为峰值的一半。`bun tools/llm/runner.mjs offpeak` 按本机时区列出未来 7 天的峰/谷窗口（只读；不建任何定时任务；不含假日表）。以太平洋标准时间（UTC−8）为例：周一至周五 02:00–17:00 为谷，周五 17:00 至周日 17:00 整段为谷；峰值窗口是周日至周四的 17:00–20:00 与 22:00–次日 02:00。夏令时（UTC−7）整体后移 1 小时。
- 术语：节点 `label→label_en` 自动入词表，缩写/带歧义的标签会误导模型（试点前发现 `Hausdorff 空间→Hausdorff`、`公式→well-formed formula`、`严格凸→strictly convex space`、`正则表示→Regular rep`）：已在 `glossary.json` 里用 `terms` 覆盖或加入 `ambiguous`。全站跑之前应系统体检这类自动词条。

## 任务路由与默认工作流（强制规则在 AGENTS.md §0；这里是细则）

**路由**：确定性 → 本地脚本；常规翻译/订正/内容加工 → DeepSeek（thinking 关）；常规语义审核 → DeepSeek（thinking 开，独立调用）；复杂推理/工程决策/例外 → Claude。Claude 在开工时主动判定并调用，不等用户点名；Claude 只读紧凑例外清单，不逐条审阅成功的译文。

**默认翻译工作流**（每步独立命令，不自动串联；计费步需要密钥 + 用户批准的 `--max-usd`）

```text
1 抽取+估价    runner.mjs plan --<范围>                         干跑，零请求
2 翻译         runner.mjs run  --<范围> --campaign C --max-usd X --limit N   thinking 关
3 确定性校验   runner.mjs validate --<范围>                     离线；invalid 不进入后续
4 独立语义审核 review2.mjs run --from <范围> --campaign C-audit --max-usd Y --limit N   thinking 开
5 门           review2.mjs gate --from <范围> [--approve] [--write-feedback]
                 pass → 批准（draft）｜correct → 写返工意见（仅一轮）｜escalate/hold/retry → exceptions.json
6 返工(≤1轮)   runner.mjs run --<范围> --feedback …  → validate → review2.mjs run/gate（复审）
7 回写         runner.mjs diff / apply --yes [--legacy-from <快照>]   证明与边标题只导出候选
8 build 与门   在隔离副本里先试：build → _katexcheck-all → doccheck --strict → searchcheck → idstable → i18n-status
```

- **门的规则**（`jobs/semreview.mjs: gateDecision`）：只认引文经确定性核对的发现；中/高发现且未返工过 → `correct`（带 `reviewer_findings` 重译一次）；返工后仍有、或属 `silent_source_repair` → `escalate`（给 Claude）；仅有源文疑点 → `hold`（给作者，不回写）；评审本身失败 → `retry`。`approve` 只批准每个身份的**最新**条目。
- **thinking**：DeepSeek 默认**开**（官方：默认 effort=high）；本流水线翻译显式关（`thinking.type=disabled`，temperature 0）；审核显式开（`thinking.type=enabled`，不发 temperature——官方称思考模式下无效）。**文档未明示**：JSON 模式与思考模式能否同用、`max_tokens` 是否含推理 token、推理 token 如何计费。预留仍按 `max_tokens` 满额算；实测 `completion_tokens > max_tokens` 立即停止；首次真实审核后核对账本与控制台。
- **复用旧译文**：试点译文是在旧提示/词表下生成的。`apply --legacy-from pilot1-snapshot` 先核对快照 MANIFEST 的 sha256，再把快照里的条目键视为「请求载荷/处理配置已改」的豁免；**结果哈希与中文底稿哈希仍必须一致**。不重译、不覆盖既有译文。
- **授权与常设预算**（用户 2026-11-24 授权；`tools/llm/budget-policy.json` 为唯一数值来源）：路由到 DeepSeek 不需要用户点名。常规任务每个任务累计 ≤ $0.50，全部任务每日累计 ≤ $2.00，范围内不必逐次请示；超出必须先请示，获批后才加 `--above-policy`（它只表示「用户已批准这次超出」）。机制：`runner.mjs run` / `review2.mjs run` 开战役时检查单任务上限；`Billing` 用全战役账本汇总本机本地日历日的「已结算 + 沉没估计 + 全部在途预留」，今日累计 + 本次预留超过每日上限即拒（`refuse` 记 `daily-cap`），`report` 里 `daily` 可见。**同一任务不得拆成多个战役绕过上限**（每日上限是兜底）。没有密钥或超出范围就停在 `plan` 并给命令。
- **先例与未来**：此前已成功用 DeepSeek 做过 **PDF 转写终稿订正**（Task 4 的先例；PDF 集成**尚未实现**，不在本流水线里）。以后合适的 AI 任务先复用本流水线与路由，确需才加适配器（见「Task 4 预留设计」）。

## 试点之后的改进（2026-11-24，pilot1 验收后）

- **溯源**：`_audit/llm-store/pilot1-snapshot/`（原始结果/用量/账本 + sha256 清单）只读留档；人工核对结论在 `pilot1-review.json`（与原始结果分开，含术语更正 "Tor product→Tor functor"、证法一的静默修复）；参照答案 `pilot1-review-truth.json`。
- **源文问题单列**：`docs/source-review-register.md`。翻译 / 数学订正 / 数学验证三件事分开；流水线从不改数学内容。
- **词表体检**：`bun tools/llm/glossary-audit.mjs`（只读）。`buildVocab` 新增规则（`VOCAB_RULES_VERSION`）：节点标签派生词条 Title Case 降小写（专名白名单保留）、并列/缩写标题（"norm and normed space"、"Regular rep"、"RAPL"）弃用；`glossary.json` 人工覆盖（同调→homology、上同调→cohomology、存在性/唯一性、微分同胚、自同构 …）。词表哈希（terms/ambiguous/rules/规则版本）进处理配置哈希 → 词表一改，旧批准与缓存条目自动失效。**体检只覆盖会进入请求的 832 个词条里最高影响面的一批**，其余 ~160 个仍有标记，在基准里随译文复核。
- **校验器精修**：词汇化复合词（不等式/互不相同/无关…）不再当否定；唯一性/存在性/某个/「…时」不再误报；公式顺序分级——关系式换序、跨段落、位移>3 仍送审，仅同段内非关系式小幅换位记 info。新增**错误级**检查：反引号及其前导反斜杠必须照抄（见源文登记簿 SR-8）。**确定性校验不能可靠发现语义静默修复**（pilot 的证法一两版校验器都没标记）。
- **提示词 v+1**：硬规则——疑似损坏/可疑源文必须逐字翻译并在 ambiguities 点名，不得改写成更合理的说法；反引号连同前导反斜杠照抄。
- **星团词表（可选，仅基准用）**：`lib/gloss.mjs`。user JSON 键序 `kind → glossary → glossary_extra → 元数据 → source_text_zh`；星团模式下 glossary = 该星团稳定紧凑词表（按「出现在多少条源文里」≥3、最多 24 条），条目自己需要的额外术语进 glossary_extra，不丢术语。默认仍是逐条选词（请求体逐字节不变）。
- **基准**：`bun tools/llm/bench.mjs select|show`。同一星团、按内容类型分层，条目按身份哈希交替分到 `item`/`cluster` 两臂——**无重复翻译**，每条译文都可直接用于正式战役；清单冻结了星团词表原文与源文哈希，积压变了会拒绝运行。`runner.mjs plan|run --bench <名>`；`usage --by arm,ctype` 分臂对比。
- **第二遍语义初筛（可选实验）**：`jobs/semreview.mjs` + `review2.mjs`。与翻译分离（独立适配器/结果库/战役）；不传翻译方自评；输出必须逐字引用中文与英文片段，**确定性核对引文**（对不上记 unverifiable）；`overall` 只能是 no_substantive_issue_found / issues_found，不能「通过」；不改写、不批准、不回写。`review2.mjs eval --truth …` 对照 Claude 人工标注打分（召回/误报/无法核对引文数）。
- **成本模型**：`bun tools/llm/costmodel.mjs`（只读）。翻译-only 与含初筛/重译/人工审阅工作量分开。

## 校验（`validate.mjs`）能证明什么、不能证明什么

能：schema（多/缺字段即拒）、id 回显、无汉字、`$` 配对、KaTeX 可解析、`@@链接@@` 一致、陈述/证明的公式**条数、多重集、顺序**、禁用命令；摘要的公式必须是源文公式的子集。
启发式（只送审，不拦、更不是证明）：公式顺序、段落数、编号步骤数、长度比、量词/存在/唯一/否定/条件/推理方向（因此/反之/反证）标记的有无、模型报告的歧义与疑似错误、模型自评。
**所有回写条目一律 `status:'draft'`**；`reviewed` 只有作者能设（`i18n-review.mjs`）。证明与摘要一律进 `review`。

## 批准与回写（`apply.mjs`）

- 批准绑定 `{key, resultHash, srcHash, cfgHash}`：结果、中文原文、处理配置、请求载荷（术语/标题/提示/模型）任一变化 → 批准失效、判 stale。
- 只追加；既有译文与审校记录永不改写、不覆盖（同 id 同字段异文 → 拒绝；同文 → 只记账）；不刷新 `basedOn` 去掩盖过期。
- **字段级追加**（statements）：节点已有部分条目时，只把缺失字段块插到该条目收尾行之前，再用 vm 重新解析，要求所有既有字段与原来逐字相同；条目不是标准多行格式 → 拒绝并报告（需人工），不会硬改。
- 完整性：持锁 → 重算有效性 → 写日志 → 备份并校验哈希 → 同目录临时文件 + fsync → **紧邻替换前重算目标哈希**（被改过就中止）→ 原子 rename → 记 applied；中断后下次先按日志恢复（回滚或补记账）。
- 写入目标：`statements.en.js`、`abstracts.en.js`、`edge-notes.en.js`。证明/边标题只导出到 `export/candidates.json`（确定性排序、原子写、幂等、源文改了标 `stale`）。
- 回写后必须跑：`build`（隔离副本先试）→ `_katexcheck-all` → `doccheck --strict` → `searchcheck` → `idstable` → `i18n-status`。⛔ 译文改变搜索基准时，解释并在隔离副本里验证预期差异；不为让 mock 通过而放宽/重钉任何基准。

## 英文证明的显示：缺口与集成提案（**仅提案，未实现**）

现状：`panel.js` 的证明路径（单证明 `e.proof`、等价两向 `e.proofs[]`、多种证法、隐藏平行蕴含、预览 snippet）都直接渲染中文并显示「证明仍以中文为准」；`graph.js` 的边白名单不拷贝英文字段；`hypothesisChips` 与边标题也没有英文通路。
最小兼容方案：新增 `src/data/i18n/edge-proofs.en.js`：`MG.i18nEdgeProofs = { items: { <edgeId>: { proof?: {en,label?,status,basedOn}, proofs?: { <pid>: {label:{en}, text:{en}, status, basedOn} } } } }`，与 `edge-notes.en.js` 并排；**英文模式下按需懒加载**，不挂到图对象上、不进启动路径。
接入点：①面板步骤列表（三种结构）②预览 snippet ③隐藏平行蕴含（取蕴含边自己的译文）④`proofOnlyZhNote()` 改为逐证明判定 ⑤逐证明中文回落 ⑥ draft/reviewed/stale 徽标走 `MG.enFieldStatus`（`basedOn` 的指纹 = 证明文本与标签）⑦ build 生成的英文阅读/概念页 ⑧搜索：证明正文目前不在索引里，**保持不变**。
体量估算（确定性，`size` 脚本）：974 条证明、中文 694,332 字符，已有译文的 en/zh 字符比 1.97 → 英文约 1.37 M 字符，含键与元数据整份旁挂约 **1.5 MB**（对照：`statements.en.js` 2.25 MB、`dist/graph.json` 8.76 MB）。懒加载后中文模式零成本；英文模式额外下载/解析/内存须在**另行批准的集成阶段**实测启动、解析与内存，并按 `PERFORMANCE.md` §0.0 与 runbook 做前后对比；任何 `src/core` 改动都先过该准入规则。

## Task 4 预留设计（不安装、不处理任何 PDF）

结果库记录可带文档溯源字段：`docHash`、`page`、`region?`、`method`（`ocr|vlm|llm-text|manual`）、`methodVersion`、`promptVersion`、`stage`、`status`。
四个互相独立的阶段，各用自己的 op/结果库，后一阶段只读前一阶段 `approved` 的记录：`transcribe`（忠实转写）→ `edit`（编辑性订正）→ `verify`（数学核验）→ `integrate`（落 `_inbox/*.md`，仍由人跑 `ingest.mjs`）。

| 现有工具 | 做什么 | 缺什么 | 接入方式 |
|---|---|---|---|
| `_tools/vlm.py` | 本地 Ollama 视觉模型转写图片 | 无哈希/缓存/重试/页级溯源 | 作为 `method:'vlm'` 后端，由 runner 包一层记账 |
| `_tools/ppocr.py` | 本地 PP-OCR 识别 | 只输出文本框，无页溯源 | 作为 `method:'ocr'` 后端 |
| `tools/ingest.mjs` | `_inbox/*.md` → pack（人工、全有或全无） | 不是批处理 | 不动，只作 `integrate` 的下游 |

官方文档：`deepseek-flash` 接受图片输入，另有按页计费的 OCR/文件解析接口；**转写质量未验证**，Task 4 开工前先做小样本评估。不装 Ollama/CUDA/MinerU 等大依赖，除非另行批准；不上传 `20261117` 目录。

## 发布的 git 步骤（独立改动：`tools/publish-git.mjs`）

`publish.mjs` 不再 `git add -A` 与强推：暂存只来自本次组装出的 `files` 清单（新增/修改显式 `add`，清单外的已跟踪文件逐个 `rm --cached`，**不用 `add -u`**），`diff --cached` 与清单对账（多出任何路径 → 清空暂存区并中止）；推送是普通快进推送，远端 main 不是本地历史祖先则停止（退出码 3）；没有强推或 force-with-lease 开关。自测只用本地裸仓库：`bun tools/publish-git.selftest.mjs`。已获批准的行为变化：以前遇到分叉会静默覆盖远端，现在会停下等人处理。
