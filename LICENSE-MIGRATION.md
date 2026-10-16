# 许可迁移记录（原 `LICENSE-PROPOSAL.md`）

> ## ✅ 已生效（2026-10-16）
>
> 作者拍板：**方案 B** —— 图的内容迁 **CC BY 4.0**、代码维持 **MIT**。
> 本文件从「草案」改成**迁移记录**：写清改了什么、为什么、代价是什么、
> 以及**故意没做**的事。⛔ 本文件不是许可；许可是仓库根 [`LICENSE`](LICENSE)，
> 法律文本是 [`LICENSE-CC-BY-4.0.txt`](LICENSE-CC-BY-4.0.txt)。

---

## 0. 迁移前 vs 迁移后

| | 迁移前 | 迁移后 |
|---|---|---|
| 图的内容 | © 2026 bingyingzizz，**保留所有权利**；引用**必须**标注节点 id + 版本号；**不允许**整份转载、镜像、改名再分发 | **CC BY 4.0**（SPDX `CC-BY-4.0`）：署名即可，转载 / 镜像 / 改名再分发 / 并库 / 商用 / 抓取进 AI 管线**全部允许**；标 id + 版本降级为**请求** |
| 代码 | MIT | MIT（**未改动**）|
| 第三方 | 定理无版权；KaTeX MIT | 同上（**未改动**）|

⭐ 迁移的**语义核心变了**：「引用必须标 id」这条曾经是**可执行的许可条件**，
现在只能是**请求**。换来的是国际通用、机器可识别（`CC-BY-4.0`），
平台 / 语料库 / 课程 / AI 抓取管线不会再因为 `All rights reserved` 直接跳过。

⚠️ **代价说清楚**：CC BY 4.0 允许整份转载、镜像、改名再分发、商用
（只要署名），**现在拦不住了**。这是刻意的取舍 —— 想让别人镜像、想被语料库收，
就必须允许镜像；二者不可兼得。

---

## 1. 落地清单（改了什么）

| # | 文件 / 位置 | 改动 |
|---|---|---|
| 1 | `LICENSE` | 一、图的内容 → CC BY 4.0 声明 + **引用请求**段 + 内容版本号规则；删掉「不允许整份转载、镜像、改名再分发」；二、代码 MIT **原文不动**；三、第三方；**四、English citation guide**；**五、怎样算满足引用规范**（含夹注 / 脚注 / BibTeX / 数据集 / 边的模板）；**六、镜像与再分发对照表**。抬头写明 SPDX 标识符与官方链接 |
| 2 | `LICENSE-CC-BY-4.0.txt` | **新增**：CC BY 4.0 官方法律文本全文，逐字节复制自 `creativecommons.org/licenses/by/4.0/legalcode.txt`（⛔ 一个字符都没改，也永远不许改）|
| 3 | `dist/LICENSE.txt` · `dist/LICENSE-CC-BY-4.0.txt` | 构建产物（`build.mjs` 复制根文件）⇒ 自动跟进；**两份都进了 `publish.mjs` 的拷贝清单**，线上不会 404 |
| 4 | 站点阅读页 | 「许可与引用」那一页由 `LICENSE.txt` 构建期渲染 ⇒ 自动跟进；导航副标题改成「内容 CC BY 4.0 · 引用请写节点 id」 |
| 5 | `graph.json` | `meta.license = 'CC-BY-4.0'` · `meta.licenseCode = 'MIT'` · `meta.licenseUrl` = CC 官方地址 |
| 6 | `graph.md` | 抬头加许可与引用说明（含法律文本文件名）|
| 7 | 每个节点页 `nodes/<id>.md` | 尾部从「· 条款见 LICENSE」改成「· CC BY 4.0 LICENSE」（**一个字节都没多加** —— 那行占的是 AI 单次抓取预算）|
| 8 | 英文入口页 `nodes/<id>.en.md` | 尾部 `terms:` → `CC BY 4.0:` |
| 9 | 概念页 / 总索引页页脚（`tools/sitepages.mjs`） | 页脚写明 CC BY 4.0 + 官方链接；JSON-LD 的 `license` 改指许可本身（`https://creativecommons.org/licenses/by/4.0/`），条款页另放 `termsOfUse` |
| 10 | `index.html` 的 JSON-LD | 同上：`license` → CC 官方地址，`termsOfUse` → `LICENSE.txt` |
| 11 | `README.md` | 英文抬头补许可段；文末新增「许可与引用」一节（表格 + 引用示例 + 模板指向）|
| 12 | `CONTRIBUTING.md` | 英文许可段重写（CC BY 4.0 / 引用是请求 / 指向 `LICENSE` 与法律文本）|
| 13 | 应用界面 | 节点面板新增「**引用此节点**」按钮：一键复制引文（节点 id + 内容版本 + 概念页链接）|
| 14 | 本文件 | 从 `LICENSE-PROPOSAL.md` 改名 + 改成迁移记录 |

**保留未动的**：`tools/idstable.mjs` 的内容版本号递增规则（`--apply` 时 patch +1）——
`LICENSE` 里把它写成**整理惯例**，⚠️ 明确声明它**不是** CC BY 的附加条件。

---

## 2. 英文引用指南（正式条款见 `LICENSE` 第四节）

> **Citing MathGalaxy.** Every statement carries a stable node id, and the graph
> carries a content version. When you cite, quote or restate a statement, please name
> the node and the version:
>
> ```
> Cite as: MathGalaxy node <id> (content vX.Y.Z), https://bingyingzizz.github.io/mathgalaxy/nodes/<id>.html
> ```
>
> Examples:
>
> ```
> MathGalaxy, node thm.cantor (content v0.9.1),
> https://bingyingzizz.github.io/mathgalaxy/nodes/thm.cantor.html
>
> See MathGalaxy node def.condensed-set (content v0.9.1) for the full statement.
> ```
>
> Machine-readable: `graph.json` → `meta.version` and `nodes[].id`; every concept page
> carries the English name and a `DefinedTerm` JSON-LD block. Node ids are stable across
> versions — they are the citation contract; the id set per version is in
> `tools/ids.snapshot.json`.
>
> Content: © 2026 bingyingzizz, CC BY 4.0. Code: MIT. KaTeX: MIT.

---

## 3. 怎样算满足（**请求**的验收标准，不是许可条件）

| 项 | 建议 | 说明 |
|---|---|---|
| **节点 id** | ✅ | 形如 `thm.cantor` / `def.sheaf` / `ax.choice`。前缀 + 点 + 名字，全库唯一、跨版本稳定 |
| **内容版本** | ✅ | 形如 `v0.9.1`。真源 = `tools/ids.snapshot.json`；产物里都写着（`graph.json` 的 `meta.version`、`llms.txt` 的「内容 vX.Y.Z」、每个概念页页脚）|
| **链接** | ➕ 推荐 | `https://bingyingzizz.github.io/mathgalaxy/nodes/<id>.html` |
| 英文名 | ➕ 可选 | 概念页的 `English:` 行或 h1 副标题里就是它（覆盖不全，缺的会回落中文名）|

**算合格**：`参见 MathGalaxy 节点 thm.cantor（内容 v0.9.1）。`
**不算**：只写「MathGalaxy」不写 id；只写 id 不写版本；把 id 抹掉或改成自己的编号。

---

## 4. 镜像与再分发对照表（迁移的重点）

| 行为 | 迁移前（保留所有权利） | 现在（CC BY 4.0） |
|---|---|---|
| 整份仓库 **fork** 到自己账号 | 条款上不允许 | ✅ 允许（署名）|
| **镜像**一份到自己的服务器 / 静态站 | ⛔ 明令禁止 | ✅ 允许（署名）|
| 打包成课程材料 / 讲义**整份发**给学生 | ⛔ 严格说不允许 | ✅ 允许（署名）|
| **改名再分发** | ⛔ 明令禁止 | ✅ 允许（署名 + 标注改动）|
| 并进别的知识库 / 语料库 | ⛔ 禁止（且不许抹掉节点 id）| ✅ 允许（署名）|
| **商用** | ⛔ 不允许 | ✅ 允许（署名）|
| 闭源再分发衍生作品 | ⛔ 不允许 | ✅ 允许（CC BY 无 copyleft）|
| 抓取进 AI 训练 / 检索管线 | ⚠️ 管线多半直接跳过 | ✅ 明确允许（署名）|
| 平台 / 数据集 / 机构仓库怎么判 | `custom license`（偏「不可用」）| `CC-BY-4.0`（通行）|
| **必须写节点 id + 版本** | ✅ 是许可条件 | ⚠️ 只能是**请求**，没有法律牙齿 |
| 谁举证 | 作者（要证明对方没标 id）| 作者（署名要求可执行，但不含 id）|

---

## 5. 故意**没做**的事（以及为什么）

1. **不给 CC 的署名要求加条件**：CC BY 4.0 第 2(a)(5)(b) 条禁止对下游附加
   「额外或不同的条款」。所以「必须写节点 id」**不能**再写成许可条件 ——
   写成请求是唯一合法的写法。
2. **不收回历史版本**：GitHub Pages 的历史发布无法撤回；迁移只对之后的版本生效，
   `LICENSE` 里已写明这一点。
3. **不动 `llms.txt` 的分页口径**：`LICENSE.txt` 现在更大（9 KB 级），
   单次抓取只能看到开头 —— 但开头就是 CC BY 4.0 声明与引用请求，够用。
4. **`i18n/` 里的工作文档不进站点**：它们只在仓库里给人看。

---

## 6. 体检怎么做

```bash
bun tools/build.mjs          # 断言：产物 ≤1300 B、记号合规、i18n 三组断言
bun tools/publish.mjs --stage   # 只组装站点，不推送 —— 检查两份 LICENSE 都在
```

改动后的自检点：

- `dist/LICENSE.txt` 与 `dist/LICENSE-CC-BY-4.0.txt` 都存在，且后者与仓库根**逐字节相同**；
- `dist-site/mathgalaxy/` 下两份都在（缺一个就是线上 404）；
- `graph.json` 的 `meta.license === 'CC-BY-4.0'`；
- 概念页页脚出现 CC BY 4.0 链接；应用面板的「引用此节点」能复制出引文。
