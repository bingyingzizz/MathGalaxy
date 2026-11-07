# AGENTS.md · 数学星图 MathGalaxy

> 给在这个仓库里工作的 AI（Codex / Claude Code / 其他 agent）的说明书。
> 人看的文档在 `README.md` / `CONTRIBUTING.md`，这里只写**你必须知道的事**。

---

## 这个仓库是什么

一张**数学知识星图**：每个概念一个节点，定理之间的推导是连线。
零依赖、无构建、双击 `index.html` 就能开。

规模：**跑 `bun tools/mg.mjs stat` 看准确的**，别信文档里的数字（图一直在长）。
2026-11-06 核过一次是 1550 节点 / 3192 边 / 15 星系 / 105 星团。

⚠️ 在 Windows 上跑 dsh 时没有 `bash`（只有 `pwsh`）—— 见 `~/.dsh/AGENTS.md`。

**📌 接手先读 `HANDOVER.md`（仓库根）** —— 现状 / 怎么工作 / 环境 / 待办 / 要拍板的 4 件事全在里面。
本文件（`AGENTS.md`）只写「怎么查、怎么投稿、加完星团必跑的体检」，不重复那些内容。

**铁律：引擎和内容分家。**
`src/core/` 只管「怎么画」，`src/data/` 只管「有什么」。
加内容只动 `src/data/`。⛔ 你还有更弱的约束：见下面「你该做什么」。

---

## 一、查：把星图当知识库用

⛔ **不要**去 `rg` 那 4500 个 `dist/nodes/*.md`。用查询命令：

```bash
bun tools/mg.mjs find 一致收敛          # 按名字/别名/标签/正文搜 → 给 id
bun tools/mg.mjs show thm.xxx           # 陈述 + 注 + 出入边（带证明长度）
bun tools/mg.mjs show thm.xxx --proof   # 连证明正文一起
bun tools/mg.mjs edge imp.xxx           # 一条边的完整证明
bun tools/mg.mjs path def.a thm.b       # A ⟹ B 的有向推导链
bun tools/mg.mjs deps thm.b --depth 2   # 这个结论站在什么上面
bun tools/mg.mjs impact thm.b --depth 2 # 改它会波及谁（下游闭包）
bun tools/mg.mjs gaps --min 3        # 缺口清单：提到了但没节点 / 用了更深定义却没边
bun tools/mg.mjs cluster analysis.uniform   # 某个星团里有什么
bun tools/mg.mjs ls                     # 星系 → 星团总览
```

> `bun` 若不在 PATH：`C:\Users\MSI\.cherrystudio\bin\bun.exe`

数据源是 `dist/graph.json`（构建产物，已纳入 git）。如果 `find` 说没有、但你确信应该有，
先跑 `bun tools/build.mjs --json`。

**顺序很重要**：`find` 拿 id → `show` 读内容 → `path`/`deps` 看它在图里的位置。
不要跳过 `find` 直接猜 id，id 猜错会浪费一整轮。

### 还有一份按需读取的目录树

`dist/llms.txt` 是标准 llms.txt 协议入口：`index.md` → `index/<星团>.md` → `nodes/<id>.md`。
线上也在：<https://bingyingzizz.github.io/mathgalaxy/llms.txt>。
`mg.mjs` 更省 token，优先用它；需要逐页读时再走这棵树。

---

## 二、写：投搞进 `_inbox/`

你可以往星图**投稿**，但只能投到 `_inbox/` 目录。

```
_inbox/<你自己起的名字>.md     ← 你只写到这里
      ↓（人来核验后跑 bun tools/ingest.mjs）
src/data/packs/150-codex-<slug>.js   ← 自动生成
      ↓（人跑 bun tools/build.mjs）
dist/*
```

**完整格式见 `_inbox/_模板.md`** —— 先读它，照着骨架写。

要点重申（这几条错了会被退回）：

| 规矩 | 说明 |
|---|---|
| LaTeX **单反斜杠** | 写 `\forall`、`\frac{a}{b}`。⛔ 不要写 `\\forall` —— 那是 `src/data/packs/*.js` 的写法，不是你的 |
| 汉字不进 `$…$` | 写 `当 $n \to \infty$ 时`，不写 `$当 n 趋于无穷$` |
| `label` / `tags` / `refs` 是纯文本 | 里面不能有 `$` |
| **一个概念一个节点** | 不要把一整节塞进一个节点 |
| **证明写在边上** | 节点只放陈述 + 必要的注。推导过程放 `## 边` 的正文里 |
| **id 先查重** | `bun tools/mg.mjs find <词>`，确认没有重名的 |
| **别造孤岛** | 新节点至少有一条边连到已有概念，否则层号掉到 0 |

### ⛔ 绝对不要做的事

1. **不要改 `src/data/packs/*.js`** —— 那是编译产物，会被 ingest 覆盖。
2. **不要跑 `tools/ingest.mjs`** —— 那是**人核验之后**的一步。你跑了就等于自审自签。
3. **不要改 `src/core/`** —— 引擎和内容分家，改观感是另一件事。
4. **不要 `git add -A`** —— 这个仓库常有多个 agent 同时写，会扫进别人的半成品。
5. **不要引入框架 / 打包器 / npm 依赖** —— 零依赖纯静态是刻意选择。
6. **不要用 ES module 写 `src/`** —— 浏览器端是经典 `<script>` + `window.MG`。

---

## 三、跑论文时的工作流

1. **先查**：论文里的核心概念，先在星图里 `find` 一遍。
   已有的直接引用（用它的 id 当边的端点），不要重复造节点。
2. **再推导**：推出来的每个结论 = 一个节点（定义 / 定理 / 引理分清楚）。
3. **连边**：每个新结论必须接上**已有的**概念 —— 这是它不掉成孤岛的唯一保证。
4. **写 md**：按 `_inbox/_模板.md` 的格式落到 `_inbox/`。
   文件名用论文简称，例如 `2026-10-23-你的论文名.md`。
5. **报告**：告诉人你写了哪些节点、连了什么边、哪些地方**你不确定**。

### 数学上要说实话

- 推不通 / 有 gap → **明说**。写「此处为骨架，缺 XX 一步」比写一个糊弄的证明好得多。
- 不确定某个经典定理的准确条件 → 标出来，让人核。不要自信地编。
- 星图的价值在可信，不在多。

---

## 三半、加完一个星团之后必跑的五步（2026-11-03 定，Galois 团实战总结）

> 加内容本身只占了工作量的一半。**另一半是「这批节点和外面接上了吗」** ——
> Galois 团第一版 11 点全绿、全门通过，一跑体检发现：基本定理**出边 0**、
> 提到单位根/代数闭包却**没有节点**、只在本星系内打转（对外 1 个星系）。

```bash
bun tools/build.mjs                    # 硬门：边端点 / 纯文本字段 / 体积 / 层向
bun tools/_katexcheck.mjs              # 公式（含新写的）
bun tools/doccheck.mjs                 # 文档里的数字与版本号
bun tools/searchcheck.mjs              # 搜索基准（加内容会改 total，要重钉并写理由）
bun tools/clustercheck.mjs <星团id>     # ⭐ 团体检（下面四类）
```

`clustercheck` 的四条，逐条处理（它**不 exit 1**，是给人看的清单）：

| 报告 | 怎么处理 |
|---|---|
| **文引无边**（正文 `反引号` 点名但没边） | 真依赖 → **补边**；只是顺带提 → **把反引号降成中文词**（`\`def.x\`` → 「那个概念」）。⛔ 反引号是承诺，读者会点。 |
| **提到名字但无边** | 分三种：真依赖补边；同名不同物补**消歧注**或**类比边**；顺带一提不管。⚠ 这个词会撞 aka，会误报。 |
| **refs 为空 / 孤岛** | 孤岛 = 出=入=0，**必须**接上（否则层号掉到 0）。 |
| **对外连线只在本星系** | 去找那座**真存在的桥**再说。Galois 团补了三条：Zorn → 代数闭包存在性（order-theory）、单位根 → 复数/φ(n)/循环群（complex/number）、伽罗瓦群 ↔ 基本群（topology，类比）。 |

还要手工过一遍（工具查不了的）：

1. **承诺了但不存在的概念**：正文提到「单位根」「代数闭包」而图里没有 ⇒ 要么补节点，要么改文字。
2. **同词不同物**：新团里出现的词是否与已有节点撞名（如「极小多项式」：算子的 vs 代数元的；「正规」：扩张 vs 子群）。撞了就要**消歧注 + 类比边**，并**改掉旧节点里「本图未收录」这类过期句子**。
3. **证明完整性**：骨架的必须标 `status: 'skeleton'`，并在注里写清**哪一步是本图的空白**（例：Artin 线性无关性引理、Kummer 理论、模 p 定伽罗瓦群）。
4. **反常识要写**：「五次方程没有解」是错的说法，准确是「没有根式通用公式」；伽罗瓦扩张 ≠ 分裂域（缺可分）。

---

## 四、环境

| 项 | 值 |
|---|---|
| 仓库 | `H:\MathGalaxy` |
| bun | `bun`，或完整路径 `C:\Users\MSI\.cherrystudio\bin\bun.exe` |
| git | `H:\Git\cmd\git.exe`（**不在 PATH**） |
| 打开星图 | 双击 `index.html` |
| 构建 | `bun tools/build.mjs`（会跑全部硬门，任何一条红了就是真问题） |

`src/data/packs/` 下的文件是内容包，**构建是扫目录加载的**，但**网页是读 `index.html` 里的 `<script>` 标签**的 ——
两边不一致就会出现「构建说 N 条、网页说 M 条」。这也是为什么新包必须由 ingest 来挂。
