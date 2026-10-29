# AGENTS.md · 数学星图 MathGalaxy

> 给在这个仓库里工作的 AI（Codex / Claude Code / 其他 agent）的说明书。
> 人看的文档在 `README.md` / `CONTRIBUTING.md`，这里只写**你必须知道的事**。

---

## 这个仓库是什么

一张**数学知识星图**：每个概念一个节点，定理之间的推导是连线。
零依赖、无构建、双击 `index.html` 就能开。

规模（跑 `bun tools/mg.mjs stat` 看准确的）：约 1300 节点 / 2300 边 / 13 星系 / 88 星团。

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
