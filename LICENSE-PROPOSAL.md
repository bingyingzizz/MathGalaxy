# 许可与引用 · 迁移草案

> ## ⚠️ PROPOSAL — NOT IN EFFECT
>
> **本文件不是许可。** 现行许可见仓库根 `LICENSE`（站点上与它同源的 `LICENSE.txt`）。
> ⛔ 未经作者批准，`LICENSE` 一个字都没有改 —— 这里只是把「改 / 不改」摆开，连同
> **现在就能用**的英文引用指南与引用模板。
>
> 位置：仓库根 `LICENSE-PROPOSAL.md`（主仓库里可见、给人和 AI 读）。
> ⛔ **不进任何发布产物**：站点 / `dist/` / 概念页 / sitemap 里都没有这个文件
> （`tools/publish.mjs` 只搬 `dist/` 下的东西）。
>
> 状态：等作者在「方案 A / B / C」（第 4 节）里拍板。**不拍板 = 保持现状。**

---

## 0. 现状（`LICENSE` 现在说了什么）

| 块 | 内容 |
|---|---|
| 一、图的内容（节点 / 边 / 证明 / 笔记 / 导出的 `graph.json` `graph.md` `nodes/*`） | © 2026 bingyingzizz，**保留所有权利**。允许阅读 / 检索 / 链接 / 在文章讲义笔记论文里**引用或复述**，条件是 ⭐ **引用必须标注节点 id + 内容版本号**；**不允许**整份转载、镜像、改名再分发，或并进别的知识库后抹掉节点 id |
| 二、代码（`src/` `tools/` `site/`） | **MIT** —— 已经是标准 MIT，**没有迁移问题** |
| 三、第三方 | 定理本身无版权；整理方式与文字归作者；KaTeX 为 MIT |

⭐ **语义核心 = 「引用必须标注节点 id + 内容版本」**：节点 id 是读者唯一能追回
原始陈述与完整证明的线索，标了 id 别人才能自己去核对全貌。

---

## 1. 英文引用指南（**现在就能用**，不需要改许可）

> **Citing MathGalaxy.** Every statement carries a stable node id, and the graph
> carries a content version. When you cite, quote or restate a statement, name the
> node and the version:
>
> ```
> Cite as: MathGalaxy node <id> (content vX.Y.Z), https://bingyingzizz.github.io/mathgalaxy/nodes/<id>.html
> ```
>
> Examples:
>
> ```
> MathGalaxy, node thm.cantor (content v0.9.0),
> https://bingyingzizz.github.io/mathgalaxy/nodes/thm.cantor.html
>
> See MathGalaxy node def.condensed-set (content v0.9.0) for the full statement.
> ```
>
> Machine-readable: `graph.json` → `meta.version` (content version) and `nodes[].id`;
> every concept page carries the English name and a `DefinedTerm` JSON-LD block.
> Node ids are stable across versions — they are the citation contract; the id set
> per version is in `tools/ids.snapshot.json`.
>
> Content: © 2026 bingyingzizz. Code: MIT. KaTeX: MIT.

这一节可以直接补进 `LICENSE` 作为「四、English citation guide」——
它**只是把现有条款翻出来**，不放松也不收紧任何一条。

---

## 2. attribution 的验收标准：**怎样算满足**

现行条款要的是「节点 id + 内容版本」。写清楚是这样：

| 项 | 必须 | 说明 |
|---|---|---|
| **节点 id** | ✅ | 形如 `thm.cantor` / `def.sheaf` / `ax.choice`。**前缀 + 点 + 名字**，全库唯一、跨版本稳定 |
| **内容版本** | ✅ | 形如 `v0.9.0`。真源 = `tools/ids.snapshot.json`；产物里都写着（`graph.json` 的 `meta.version`、`llms.txt` 的「内容 vX.Y.Z」、每个概念页页脚） |
| **链接** | ➕ 推荐 | `https://bingyingzizz.github.io/mathgalaxy/nodes/<id>.html` —— 有了链接，别人一点就能核对；纸质媒介可以写域名 + id |
| 英文名 | ➕ 可选 | 概念页的 `English:` 行或 h1 副标题里就是它（覆盖不全，缺的会回落中文名） |

**满足的样子**（三选一，任一即可）：

1. `参见 MathGalaxy 节点 thm.cantor（内容 v0.9.0）。`
2. `MathGalaxy, node thm.cantor (content v0.9.0), https://bingyingzizz.github.io/mathgalaxy/nodes/thm.cantor.html`
3. `[MathGalaxy thm.cantor v0.9.0](https://…/nodes/thm.cantor.html)`

**不算满足**：

- 只写「MathGalaxy」「数学星图」而没有任何 id ⇒ 读者找不回是哪一条；
- 只写 id 不写版本 ⇒ 无法判断你引的是哪一版（图在长，陈述会精化）；
- 把 id 抹掉、只把句子摘走 ⇒ 明令禁止的那一条；
- 把 id 改成自己的编号（例如 `T-42`）⇒ 同上；
- 用「详见官网」代替具体 id ⇒ 不构成标注。

⚠️ 这一节无论方案 A / B / C 都保留 —— A 是**许可条件**（违反即违约），
B / C 之下它降级为**引用请求**（没有法律牙齿，但仍然是这套图的引用规范，
而且 `LICENSE` 里的「引用请求」段会照写）。

---

## 3. 引用模板（可直接复制）

**正文夹注（中文）**

```
参见 MathGalaxy 节点 thm.cantor（内容 v0.9.0）。
```

**正文夹注（英文）**

```
See MathGalaxy, node thm.cantor (content v0.9.0).
```

**脚注 / 参考文献（英文，含链接）**

```
MathGalaxy. thm.cantor (Cantor's theorem), content v0.9.0.
https://bingyingzizz.github.io/mathgalaxy/nodes/thm.cantor.html (accessed 2026-10-16).
```

**BibTeX**

```bibtex
@misc{mathgalaxy_thm_cantor,
  title        = {MathGalaxy node \texttt{thm.cantor} (Cantor's theorem)},
  author       = {{bingyingzizz}},
  year         = {2026},
  note         = {Content v0.9.0; knowledge graph of mathematics},
  howpublished = {\url{https://bingyingzizz.github.io/mathgalaxy/nodes/thm.cantor.html}}
}
```

**数据集 / 语料库（英文）**

```
MathGalaxy (2026). A searchable knowledge graph of mathematics, content v0.9.0.
© 2026 bingyingzizz. Node ids are stable identifiers; see tools/ids.snapshot.json
for the id set of this version.
```

**引「一条推导」**：推论写在**边**上（边的 id 形如 `imp.xxx` / `eq.xxx` / `def-link.xxx`），
引用时写两端节点 + 边的 id 更精确：

```
MathGalaxy, edge imp.wellorder-ordinal from thm.wellordering to def.ordinal
(content v0.9.0).
```

---

## 4. 三个方案

### 方案 A：不改（保持「保留所有权利 + 必须标注 id」）

- ✅ 「引用必须标注节点 id + 版本」是**可执行的许可条件**。
- ✅ 挡住整份转载／镜像／改名再分发／并库抹名。
- ⚠️ 「保留所有权利」会吓退一部分正当使用：课程讲义、开源数据集、某些 AI 抓取管线
  看到 All rights reserved 会直接跳过（**这跟「让别人的 AI 读得到」正好相反**）。
- ⚠️ 不是 OSI / CC 承认的许可 ⇒ GitHub、数据集平台、机构仓库会标成
  `custom license`，机器读到之后往往按「不可用」处理。

### 方案 B：内容 → CC BY 4.0（代码保持 MIT）+ 保留一段「引用请求」

- ✅ 国际通用、机器可识别（`CC-BY-4.0`），平台 / 语料库 / 课程都敢用 ⇒ 对**被索引、被引用、被 AI 读**最有利。
- ✅ 署名仍是硬条件（BY）。
- ⛔ **代价 1**：CC BY 4.0 **允许**整份转载 / 镜像 / 商业再利用（只要署名）——
  现在明令禁止的「镜像、改名再分发、并库」全都变成合法。详见第 5 节的对照表。
- ⛔ **代价 2**：CC BY 的署名要求是「按媒介合理地署名」，**不接受**额外的
  「必须写节点 id + 版本」当成许可条件（可以写成**请求**，但没有法律牙齿）。
  ⇒ 方案 B 会**削弱这套许可的语义核心**。
- 折中写法：`内容 = CC BY 4.0，并额外请求（不是条件）引用时写节点 id + 版本`；
  真要靠条款保住 id，只能在**被引用的那一句话**层面主张（每个概念页自己带一句
  「Cite as…」—— 这已经在做了）。

### 方案 C：内容 → CC BY-SA 4.0（或 CC BY-NC 4.0）

- SA：允许转载 / 镜像，但衍生作品必须同样开放 ⇒ 挡住「别人拿去闭源」，
  仍然**没有** id + 版本的要求。
- NC：禁商用；代价同样是平台 / 语料库会犹豫（NC 常被判定为「非自由」）。
- 两者都**不比 A 更好**地保住 id 语义，只是换了一种限制方式。（注：SA / NC 也不在
  「可自由抓取进数据集」的白名单里，对 AI 收录的改善不如 B 明显。）

---

## 5. 「国际可引用性 vs 防搬运」对照表（**镜像这件事**）

两边的诉求是同一个旋钮的两头：**越容易被外部引用/收录，就越难挡住搬运。**
下表只列「镜像 / 转载 / 改名再分发」这一类行为。

| 行为 | 现状（A：保留所有权利） | 迁 CC BY 4.0（B） | 迁 CC BY-SA 4.0（C-SA） |
|---|---|---|---|
| 整份仓库 **fork** 到自己账号下 | 条款上不允许（GitHub 的 fork 机制仍可用，但再分发被禁止） | ✅ 允许（署名） | ✅ 允许（署名 + 同样以 SA 分发） |
| **镜像**一份到自己的服务器 / 静态站 | ⛔ 明令禁止 | ✅ 允许（署名） | ✅ 允许（署名 + SA） |
| 打包成课程材料 / 讲义**整份发**给学生 | ⛔ 严格说不允许（属转载） | ✅ 允许（署名） | ✅ 允许（署名 + SA） |
| **改名再分发**（换个名字重新发布） | ⛔ 明令禁止 | ✅ 允许（署名 + 标注改动） | ✅ 允许（署名 + SA） |
| 并进别的知识库 / 语料库 | ⛔ 禁止（且不许抹掉节点 id） | ✅ 允许（署名） | ✅ 允许（署名 + SA） |
| **商用**（卖、打包进付费产品） | ⛔ 不允许 | ✅ 允许（署名） | ✅ 允许（署名 + SA） |
| 闭源再分发衍生作品 | ⛔ 不允许 | ⛔ **也允许**（CC BY 无 copyleft） | ⛔ 不允许（SA 传染） |
| 抓取进 AI 训练 / 检索管线 | ⚠️ 条款是「保留所有权利」，管线多半直接跳过 | ✅ 明确允许（署名） | ⚠️ 多数管线把 SA 也当可用，但比 BY 保守 |
| 平台 / 数据集 / 机构仓库怎么判 | `custom license`（偏「不可用」） | `CC-BY-4.0`（通行、白名单） | `CC-BY-SA-4.0`（通行，但传染） |
| **必须写节点 id + 版本** | ✅ **是许可条件** | ⛔ 只能是**请求**，没有法律牙齿 | ⛔ 同 B（只能是请求） |
| 谁举证 | 你（要证明对方没标 id） | 你（CC BY 的署名要求同样可执行，但不含 id） | 你（同上 + 传染性） |

**一句话**：A 保住「必须写节点 id」这条最有特色的条款，但对外默认姿态是**拒绝**；
B 换来通用性与收录友好，代价是**放弃 id 条款的法律效力**和「不许镜像」这条。
本节的镜像一行是重点：**想让别人镜像、想被语料库收，就必须允许镜像** —— 二者不可兼得。

---

## 6. 改 / 不改的影响（总表）

| 看谁 | 不改（A） | 改 CC BY 4.0（B） |
|---|---|---|
| 你自己的引用习惯 | 不受影响 | 不受影响 |
| 论文作者想引一条定理 | 可以，**必须**写 id + 版本 | 可以，**建议**写 id + 版本 |
| 老师想整份发给学生 / 放进课程站 | 严格说**不允许** | 允许（署名） |
| 别人想镜像一份做备份 | 不允许 | 允许（署名） |
| 别人想拿去训练 / 检索（AI） | 抓取方常常直接跳过 | 明确允许（署名）⇒ **这是你要的** |
| 有人拿去卖 | 不允许 | 允许（署名） |
| 搜索引擎 / 数据集平台怎么判 | `custom license`，偏保守 | `CC-BY-4.0`，通行 |
| 谁承担举证责任 | 你 | 你（署名要求可执行，但不含 id） |

---

## 7. 若选方案 B：要动哪些地方（清单，⛔ 还没动）

1. `LICENSE`：一、图的内容 → CC BY 4.0 声明 + 「引用请求」段（含第 1 节英文指南）；
   二、代码 MIT 保持不动；三、第三方补一句「图数据 © … CC BY 4.0」。
2. `dist/LICENSE.txt`：**构建产物**（`build.mjs` 复制根 `LICENSE` + 一行标题）⇒ 自动跟进。
3. 站点：`read.html` 的「许可与引用」那一页（构建期从 `LICENSE.txt` 渲染）⇒ 自动跟进。
4. `graph.json`：`meta` 加 `license: 'CC-BY-4.0'`（现在只有站点 JSON-LD 的 `license` 链接）。
5. `README`：许可那一段。
6. ⚠️ `llms.txt` **没有余量**（1252 / 1300 B 天花板）—— 想在里面加许可行必须再砍一句。
   **建议不加**：许可在 `LICENSE.txt` 里，协议里已经指得到。
7. ⚠️ 已发布的旧版本（Pages 历史）**无法收回**：改许可只对改之后发布的版本生效。

---

## 8. 我的建议

**先只做第 1 节（英文引用指南）+ 第 2 节（怎样算满足）** —— 零风险、现在就能用，
而且直接把「怎么引用」讲给英文读者听；**许可主体先不动**。

理由是：这张图现在的**主要矛盾是没人知道它**（外链约等于零、Google 才刚开始收录），
不是「别人滥用」。等真有外部使用者 / 译者出现，或者你要把它交给机构镜像时，
再按方案 B 一次性放开 —— 那时你也更清楚自己要防的是谁。

**待作者拍板的三个选项**：

1. 只加英文引用指南 + 「怎样算满足」（推荐，零风险，不改 `LICENSE` 的实质条款）；
2. 现在就迁 CC BY 4.0（放弃 id 条款的法律效力 + 允许镜像，换通用性）；
3. 改写成「自定义许可 + 英文全文 + 机器可读 `license` 字段」（保语义、改善平台判定，
   但仍不是通用许可）。
