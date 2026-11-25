# 工作流：个人主页（homepage）

> 触发：改个人主页（站点根的 `index.html`、`read.html`、`research*.html`、`assets/`）、同步其中的项目统计/功能说明/阅读指南/链接；检查主页与已发布 MathGalaxy 是否一致。
> ⛔ 未经授权不重设计主页。⛔ 主页 agent **不得自行修改用户的研究结论**。

## 1. 先核实实际架构（不要假设；以下是 2026-11-24 在本仓库核实的事实，改动前重新确认）

- **模板在本仓库 `site/`**：`index.html`、`read.html`、`research.html`、`research-*.html`（三篇研究页）、`assets/{site,read,node}.css`、`assets/lang.js`、图标。含 `{{COUNTS}}`、`{{UPDATED}}`、`{{USER}}`、`{{SITE_REPO}}`、`{{DOCS}}`、`{{NAV}}` 等占位符。
- **组装器**：`tools/publish.mjs`（`--stage` 只组装到本地 `dist-site/`、`--no-build` 复用现有 `dist/`）；把 `dist/` 产物摆到 `mathgalaxy/`、替换占位符为**真数字**、把阅读指南 `.md/.txt` 在构建期渲染进 `read.html`；`tools/sitepages.mjs` 生成站点页。
- **站点仓库**：`dist-site/` 是 `bingyingzizz.github.io` 的本地克隆（被忽略，非本仓库内容）；线上是 GitHub Pages（`main`）。`dist-site/` 里的 `03a17f…txt`（IndexNow 密钥文件）等不是由 `site/` 模板产生时，要先确认组装逻辑是否保留它们。
- **发布 git 步骤**：`tools/publish-git.mjs`（**未提交的改动，见 STATUS；未批准前不视为现行行为**）。
- 研究页是**用户的研究内容**；站点模板、MathGalaxy 内容、引擎、部署行为是四件事，边界不得混。

## 2. 流程

```
范围识别 → 取权威内容 → 有针对性的修改 → 事实一致性检查 → 链接与资源校验
 → 响应式检查 → 预览 → （获授权才）发布
```

1. **范围识别**：改的是模板文案、统计、阅读指南、链接，还是研究页？研究页只在有**经核实且获授权**的研究记录时才动。
2. **取权威内容**：统计一律从 `bun tools/mg.mjs stat` / `dist/graph.json` 的 `meta.counts` 与组装器占位符来，**不手写数字**；阅读指南/策略文案改**其生成模板或 `.md` 源**，不改组装后的页面。
3. **有针对性的修改**：改 `site/` 模板或组装器；不改 `dist-site/` 里的产物当作真源。
4. **事实一致性**（主页必须反映**对应的已发布 MathGalaxy 版本**）：节点/边/星团/学科数、边类型与图例语义（黑/粉/等价/类比/定义）、翻译覆盖与能力（**不得宣称不支持的功能，如英文证明显示**）、阅读指南说明、链接；区分**当前源统计 / 构建统计 / 已发布统计**，版本不同时不要混。
5. **链接与资源校验**：内链、外链、`mathgalaxy/` 入口、`llms.txt`、`graph.json`、图标、`file://` 双击可开。
6. **响应式检查**：手机宽度（16px 边距、无横向页面滚动）与桌面；必要时用 `msedge --headless --screenshot`（命令见 `docs/content-guidelines.md` §2.6）。
7. **预览（先核实工具版本与副作用）**：先 `git status`/`git diff --stat tools/publish*.mjs` 确认**将要运行的是哪一版发布工具**（工作树里可能有未提交/待批准的改动，不要在不知情时用它）。`publish.mjs --stage` 有副作用：不带 `--no-build` 会跑**完整 build**（改写 `dist/` 与根目录文档）；并且会**清空组装目录（默认就是 `dist-site/` 这个站点仓库的工作树，仅保留 `.git`）再重写**。需要时用**隔离预览**：`MG_STAGE=<_tmp 下的专用目录> bun tools/publish.mjs --stage --no-build`，预览后按 `AGENTS.md` §7 清理该显式路径。**亲眼看**。待批准的发布工具改动保持独立、不提交，直到用户确认。
8. **发布**：仅在用户**明确授权**后；先核对暂存清单（见 [`docs/llm-pipeline.md`](../llm-pipeline.md)「发布的 git 步骤」）；发布后核对线上 `graph.json`、续页、`layout.json` 签名与源/构建版本一致。**CI 绿不等于已发布的产物是最新的。**

## 3. 研究描述的分类（不得混写）

主页上每条研究相关表述必须能归入：**已确立的数学结果 / 部分结果 / 猜想 / 开放问题 / 未经评审的手稿 / 已发表研究**。进展只能依据**经核实且获授权**的研究记录更新。拿不准的措辞 → 保持原样并问用户。

## 4. 受保护的不变量

不改用户的研究结论；不手改 `dist-site/` 或 `dist/`；不重设计；不改引擎行为（那是 [engine](engine.md)）；不改数学内容（[content-add](content-add.md)/[content-edit](content-edit.md)）；共享资源（`assets/*.css`、`lang.js`）与部署交互相关时要检查对 `mathgalaxy/` 页面的影响。

## 5. 验收与完成条件

- 统计、功能说明、阅读指南与链接与已发布的 MathGalaxy 版本一致（抽查并记录对照来源）。
- 链接/资源校验通过；手机与桌面截图已看；`bun tools/doccheck.mjs --strict` 绿。
- 未经授权**没有**发布；STATUS 已更新；临时物清理。

## 6. 失败与升级

事实对不上 → 以数据为准修模板，别改数据迎合文案；需要改研究表述或重设计 → 停下问用户；部署异常 → 停止并报告，不强推（`publish-git.mjs` 对分叉即停）。
