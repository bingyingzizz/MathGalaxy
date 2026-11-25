# CLAUDE.md · 数学星图 MathGalaxy

数学知识星图：每个概念一个节点，定理间的推导是边。零依赖纯静态站点，双击 `index.html` 即可离线打开。
**规范规则在 `AGENTS.md`（共用、唯一权威）。本文件只是 Claude Code 的短入口，不重复它。**

@AGENTS.md

## 开工顺序

0. **任务路由（强制，见 AGENTS.md §0）**：先判定本任务该走本地脚本、DeepSeek 流水线（翻译/订正/批量语言活；常规语义审核用 thinking 开）还是 Claude；符合条件就**主动**用 `tools/llm/`，不等用户点名；计费前仍须密钥 + 用户批准的金额上限，否则停在 `plan`。
1. `git status`（已有未提交改动必须保住）→ 读 `docs/STATUS.md`（待办与待拍板事项）。
2. 只读与任务相关的专题：写内容读 `docs/content-guidelines.md` + `CONTRIBUTING.md`；**任何性能敏感改动（渲染、布局/预计算、图算法、缓存、交互、资源加载、构建关键路径，不止 `src/core/`）之前必读** `PERFORMANCE.md` §0.0 与 `docs/performance-runbook.md`；工具/环境坑读 `docs/tools-and-methods.md`。
3. `docs/archive/`（旧 HANDOVER / 旧 AGENTS；迁移交接单在 `B:\MathGalaxy-archive\`，不入库）**不是必读**，需要追溯时再查。

## 最常用命令

```bash
bun tools/mg.mjs stat | find <词> | show <id> | path <a> <b>   # 查图，别去 rg dist/nodes
bun tools/build.mjs              # ⚠ 有副作用（改写 dist/ 与根目录文档）；不确定先在 _tmp/ 隔离副本里跑
bun tools/_katexcheck-all.mjs && bun tools/doccheck.mjs --strict && bun tools/searchcheck.mjs && bun tools/idstable.mjs
bun tools/hygiene.mjs            # 只读工作区卫生检查
bun tools/llm/runner.mjs plan|run|validate|report|apply   # 批量英译等走 DeepSeek 流水线（默认干跑；规程 docs/llm-pipeline.md）
```

## 红线（完整版见 AGENTS.md）

- 不 commit / push / publish，除非用户明确批准；不 `git add -A`；不 `reset --hard` / `git clean`；不丢已有未提交改动（含约 330 条未构建的英文翻译）。
- 不删数学内容、审计记录、`_pdf/`、`formal/`；`_audit/` `_pdf/` 不入 git，删除不可恢复。
- `packs/*.js` 里 LaTeX 反斜杠写两个，`_inbox/*.md` 写一个；不对 packs 做批量格式化。
- 不改系统网络 / 防火墙 / 代理；不暴露凭据与浏览器 profile。
- 临时物只放 `_tmp/<任务id>-<时间戳>/`（附 `MANIFEST.md`）；清理只删已核实自有的显式路径，**绝不用通配符**。
- 额度紧：用脚本代替大块阅读，只带回摘要；任务完成清单见 AGENTS.md §11。
