# 工作流：新增内容（content-add）

> 触发：往星图加新节点/边/星团；外部 agent 投稿（`_inbox/*.md`）；PDF 候选并入（见 [pdf-ingestion](pdf-ingestion.md)）；翻译无关。
> **全部数学要求**来自 [content-quality.md](content-quality.md)（本文不重复）；**内容准则与踩坑记录**见 `docs/content-guidelines.md`，**人名写法/投稿格式**见 `CONTRIBUTING.md` 与 `_inbox/_模板.md`。

## 1. 输入与必读

任务范围与授权（加什么、加到哪、是否允许 build/提交）→ `docs/STATUS.md` → `content-quality.md` → `docs/content-guidelines.md` → `CONTRIBUTING.md`。

## 2. 流程

```
来源识别 → 现有内容检索 → 语义去重 → 候选抽取 → 数学组织 → 节点与边构造
 → 共用质量检查 → 受控写回 → 验证 → （获授权才）发布
```

1. **来源识别**：写清出处（书/论文/讲义/agent 自己的推导）。`refs` 只写真实教材/论文；讲义页、PDF 页、日期进 `_audit`。区分原文陈述、原文证明、agent 补写证明、订正。
2. **现有内容检索**：`bun tools/mg.mjs find <词>`（按名字/别名/标签/正文）、`show`、`cluster`、`deps`。**先找等价概念、已有推广与特例**（quality §7、§8），再动手。**不要**去 `rg dist/nodes`。
3. **语义去重**：同词不同物只在需要时补**消歧注**（消歧 ≠ 类比；类比边仅在确有数学类比时建，见 quality §9）；等价表述不新建节点；已有更一般的节点时，先连上而不是重复。
4. **候选抽取 / 数学组织**：确定数学类型（definition/theorem/…）与星团；**建立存在性与基础前置**（quality §2）；一个概念一个节点；复杂证明写在边上。
5. **节点与边构造**（schema 与边语义以既有实现为准）：
   - 定义引用：补**直接使用**的概念的 `definition` 边，不递归补所有祖先（quality §3）。
   - 蕴含：多个真前提写**多源边**，不造单源假蕴含、不造「A+B 合成节点」；黑/粉/等价/类比按 quality §5 选。
   - **全部真实的直接定义引用都要有**；合法的基础节点可以没有入边的 definition。孤立节点或层号异常是**调查候选**，不是造关系的理由——数学上确无可引用前置时，登记缺口并问用户，不造假边。
   - **完整的蕴含证明放在对应边上**，不放节点 Notes。证明写不通就标 `status:'skeleton'` 并写清缺哪一步。
   - 按真实教材写 `refs`；记号按 `notation.md`；中文汉字不进 `$…$`；`label/tags/refs` 纯文本。
6. **共用质量检查**：对新增内容及**受影响的邻居节点与边**逐条走 content-quality（含存在性、定义引用、证明依赖、层与边色、去重、类比、记号、出处、TeX）。**修历史内容的同时不得引入新的不一致。**
7. **受控写回**：
   - 外部/投稿 agent：只写 `_inbox/<名字>.md`（单反斜杠），**不改 packs、不跑 `ingest`、不改 `src/core/`**。
   - 维护者：核验后 `bun tools/ingest.mjs --dry` → `bun tools/ingest.mjs`（全有或全无）→ 新包会自动挂 `index.html` 的 `<script>`；直接写 `src/data/packs/*.js` 时**每个 LaTeX 反斜杠写两个**，且**不做批量格式化**（改前干跑，改后 `git diff` 抽验）。
8. **验证**：`bun tools/build.mjs`（⚠ 有副作用，改写 `dist/` 与根目录文档；不确定先在 `_tmp/` 的隔离副本跑）→ `bun tools/_katexcheck-all.mjs` → `bun tools/doccheck.mjs --strict` → `bun tools/searchcheck.mjs` → `bun tools/idstable.mjs`（干跑）→ 加了星团再 `bun tools/clustercheck.mjs <星团id>`。这些门只验**结构**，**不证明数学正确**（quality §0）；数学部分只做 [audit](audit.md) §3 的复审与核实两步（不重开整个审计流程，也不重复 build）。
9. **发布**：不自动 commit/push/发布（`AGENTS.md` §9）。

## 3. 工具与模型分工

查图/去重/校验/构建 → 本地脚本；译文 → [translation](translation.md)；复杂的数学组织、存在性与依赖判断、疑点 → Claude。**新内容的英译不得在写中文的同一步里顺手做。**

## 4. 受保护的不变量

id 是对外契约（先 `mg find` 查重；改名/删除要登记退役，`idstable`）；不手改 `dist/`；不动 `src/core/`；不擅改数学约定；节点正文不得出现「本图约定」「之前说过」一类过程性措辞；不为凑数造边（quality §0、§10）。

## 5. 验收与完成条件

- 新增对象逐条满足 quality 相关节；缺失的前置基础设施**已补或已在登记簿显式登记**，没有被悄悄绕过。
- 全部门绿；`idstable` 无意外 id 变化；`git diff`/`git status` 只含预期路径。
- 受影响的邻居节点/边已检查；`docs/STATUS.md` 与（若有未决问题）`docs/audit-register.md` 已更新；临时物已清理。

## 6. 失败与升级

数学上推不通 → 骨架 + 说明，不要自信地编；缺关键前置 → 登记并问用户；与已有内容冲突或需重构/合并 → **停下，先批准**；门红 → 是真问题，**不改基准去骗门**。
