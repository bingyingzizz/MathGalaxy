# 工作流：翻译（translation）

> 触发：中文→英文（陈述/Notes/边说明/摘要）的缺失或过期译文；译文订正；英文显示相关的内容问题。
> 这是 Task 2 已落地的生产流水线的**持久规程**；命令、存储、预算语义、实测教训的细则在 [`docs/llm-pipeline.md`](../llm-pipeline.md)（技术真源，本文不重复）；数学判据见 [content-quality.md](content-quality.md) §14。

## 1. 默认流程（`tools/llm/`；复用现有客户端、适配器、缓存、预算账本、校验门、结果库、返工机制）

```
抽取缺失/过期译文 → DeepSeek 翻译（thinking 关）→ 确定性校验
 → **独立** DeepSeek 语义审核（thinking 开，review2.mjs）→ 至多一轮自动返工 + 复审
 → 例外升级 → 批准的回写（apply）→ build 与各道门
```

1. `bun tools/llm/runner.mjs inventory` 盘点缺口；`plan` 干跑估价（**默认干跑，零请求**）。
2. `run`（翻译，计费）→ `validate`（确定性校验）→ `bun tools/llm/review2.mjs run …`（语义审核，计费）→ `review2.mjs gate`（pass / correct / escalate / hold / retry）。
3. 至多**一轮**自动返工 + 复审；仍不过或数学可疑 → `exceptions.json` 升级给 Claude/作者。
4. `pass` 且无搁置才可 `approve`；`apply --yes` 回写（一律 `status:'draft'`，永不 `reviewed`；只追加，不覆盖既有译文）；然后 build 与各道门。
- **Claude 不手工逐条审阅通过的译文**，也不把批量语言活读进上下文；只读紧凑例外清单。
- **保护有效译文 ≠ 禁止更新过期译文**：`apply` 对同字段已有不同译文**一律拒绝覆盖**（只追加），这保护的是仍然有效的既有译文；源文改了之后译文会变 `stale`（`basedOn`/`srcHash` 追踪）。**目前流水线不支持「受控地替换过期译文」**（没有经授权、经校验的覆盖式更新路径）——这是已记录的缺口（见 `docs/STATUS.md`），**不在此处重设计**；在它实现前，过期译文由人工在 `src/data/i18n/` 里更新并重新审核，或等该能力立项。
- **未支持的译文类型**（证明、边标题、摘要缺中文源等）只作为**可复用候选导出**（`export`），在有对应的回写与显示支持前不写入现行内容、不得声称英文页已支持。

## 2. 源文复核搁置**优先**于译文审核

**规则**：`docs/source-review-register.md` 里 `status` 以 `open` 开头的条目，其身份（`node:<id>:<field>`、`edge:<id>:proofs:<pid>`；「同上」沿用上一行）是**搁置项**。搁置项：

- `review2.mjs gate` → 一律判 `hold`，**即使译文审核是 pass**；
- `approve`（批量与点名）→ **拒绝批准**（`--all-ok` 也绕不过）；
- `apply` → 对**已批准**的该身份也**拒绝回写**（报 `stale`，目标文件字节不变）。
- 译文可留在候选库（不删），但**不得成为现行内容**。搁置在登记簿里被作者处理并把 `status` 改离 `open` 后才解除。

**来源**：数学审计（[audit](audit.md)）或翻译中发现的**源文数学问题**，在适用时都要登记到 `docs/source-review-register.md`（`status: open`），登记后对应身份即被自动搁置，不必另行告知流水线。

**范围（不要夸大）**：搁置只**阻止新的批准与回写**。**已经在 `src/data/i18n/` 里生效的、对应源文有误的译文不会被它撤回**——那属于现行内容的修改：源文修复后走 [content-edit](content-edit.md) 重新翻译并更新（受上面「过期译文替换」缺口限制），修复前如需撤下，须经用户批准。

**强制程度（如实）**：这是代码里的硬拒绝（`tools/llm/lib/holds.mjs` + `batch.approve` + `apply` + `review2 gate`），回归检查是 `bun tools/llm/selftest.mjs` 的「源文复核搁置优先（SR-6 回归）」一组与 `content.test.mjs` 的「SR-6」条。**登记簿本身由人维护**：没人把源文问题登记进去，代码就不知道有搁置。翻译中发现的源文问题必须**先登记再继续**。

## 3. 源文与译文分离

- 源文数学问题（缺假设、类型错误、「本图约定」等指代）→ 登记簿（`open` 即搁置）+ 走 [audit](audit.md)/[content-edit](content-edit.md)。**`review2.mjs` 是译文忠实度初筛，不是数学审计**（它把中文源文当作前提）。**⛔ 不在翻译里悄悄修源文数学**；忠实译出，在 `ambiguities` 里标注。
- 英文输出必须保持中文版的数学关系、证明结构与已支持的功能。不改中文数学原文。
- 术语走 `lib/glossary.mjs`（词表 ∪ 已审标签）；人名写法按 `CONTRIBUTING.md`。

## 4. 授权、预算与强制程度

- 路由（`AGENTS.md` §0）：翻译与可重复语言活 → DeepSeek thinking 关；常规语义审核 → DeepSeek thinking 开且与翻译**分离调用**；复杂推理、例外 → Claude。
- 计费需要 `DEEPSEEK_API_KEY`，且 `--campaign --max-usd --limit` 齐全；只发**公开数学内容**。
- **常设预算授权**（`AGENTS.md` §0.2）意味着：在额度内的**每个新战役都不必再次请示**；只有要**超出**额度才需先请示（并加 `--above-policy`）。
- 常设预算：每个任务累计 ≤ $0.50、全部任务每日累计 ≤ $2.00；**不得拆分任务/战役绕过**；要超出须先请示用户并加 `--above-policy`。
- **实际强制（不夸大）**：**每日 $2.00 由账本在代码里强制**（`Billing`，跨战役累计）；**单战役上限**在开战役时由代码检查（`checkTaskCap`）。**「每个任务累计 $0.50」与「不得拆分战役」目前只靠本规程与 agent 自觉**——代码不知道哪些战役属于同一个任务。缺口记在 `docs/STATUS.md`。无密钥或超限就停在 `plan`，给用户可直接执行的命令。

## 5. 工具

`tools/llm/{runner,review2,validate,apply,batch,billing,inventory}.mjs`、`bun tools/llm/selftest.mjs`（离线，零计费）、`bun tools/i18n-status.mjs`。

## 6. 受保护的不变量

译文一律 `draft`；证明与边标题只导出候选；不改中文数学原文；不重设计翻译基础设施；不自动串联各阶段；回写只追加；`src/`、`dist/` 与门文件在自测前后哈希不变。

## 7. 验收与完成条件

- 回写前：确定性校验 0 invalid；语义审核已 gate；**无搁置命中**；例外已升级或登记。
- 回写后：`bun tools/build.mjs`（隔离副本先行）→ `_katexcheck-all` → `doccheck --strict` → `searchcheck` → `idstable`（干跑）→ `bun tools/i18n-status.mjs`；`bun tools/llm/selftest.mjs` 绿。
- STATUS 已更新（覆盖率、候选、搁置）；临时物清理；**未 commit/发布**除非获批。

## 8. 失败与升级

401/配额/超限 → 停在 `plan`；校验或审核异常 → 例外清单；数学可疑 → [audit](audit.md)；源文问题 → 登记簿（并因此自动搁置）。
