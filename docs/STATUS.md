# 当前状态与待办（2026-11-24）

> 这是**唯一**需要随工作更新的状态文档。历史细节在 `docs/archive/`，不要因为查它而整本加载。
> 规模数字一律跑 `bun tools/mg.mjs stat`，这里不写死。

## 发布状态（2026-11-24 已提交并发布）

分两次提交推到 `origin/main`，站点经 `tools/publish.mjs` 的流程发布到 `bingyingzizz.github.io`（`main`）：

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

## 要用户拍板的事

| # | 事项 | 来源 |
|---|---|---|
| 1 | `thm.adic-gluing` / `prop.analytic-base-change` 引的章节在手头原文里**不存在**：补续篇，还是 refs 改成不指章节 | HANDOVER §5.1 |
| 2 | `def.ricci-curvature` 符号约定与 $R_{ij}=Kg_{ij}$ 矛盾，需整团统一 | §5.2 |
| 3 | 人名写法：`Riesz–Markov` / `Pontryagin` 用本人语言写法还是通行拉丁写法 | §5.3 |
| 4 | `refs` 的 17 条 A 类（Tu GTM 334 vs 275 共 13 条）：确认改指还是标「待核」 | §5.4 |
| 5 | 是否把 `tools/_katexcheck.mjs` 纳入版本库：它只查源码里的 `$$…$$`，是 `_katexcheck-all.mjs`（权威，CI 用）的真子集。**建议不跟踪、不合并**；等确认没有文档依赖后归档。`tools/ingest.mjs` 的提示文字和旧文档还引用它 | 本次迁移 |
| 6 | 迁移遗留的延后项：`_audit/*.json` 历史图转储（#9）、`dist-site/_CON`（#18） | 清理报告 |
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
