# 数学星图 MathGalaxy · 交接书

> **这是唯一的交接文档。** 2026-11-05 重写，取代此前的
> `交接-给v2会话.md` / `交接-给v3会话.md` / `_audit/HANDOFF-2026-11-05.md` /
> `_audit/STATUS-2026-11-05.md` / agent 数据目录那份 105 KB 的 `HANDOVER.md`（全部已删除）。
>
> **读法**：§0–§3 是必读（现状 / 怎么干活 / 铁律）；§4 以后按需查。
> **本文件里的数字都是我 2026-11-05 亲手复核过的**，每条附可复跑的命令。
> ⚠️ 但**规模数字永远现跑，不背** —— 图一直在长，而且常常有别的 agent 同时在写。

---

## 0. 一句话 + 地面实况

**这是什么**：一张数学知识星图。每个概念一个节点，定理之间的推导是连线。零依赖纯静态，双击 `index.html` 就能开。

**用户原话（最高优先级的意图，顺序不能颠倒）**：

> 「做一个数学星图，用于存放笔记，整理思路，方便人和ai快速查阅」

① 它是**用户自己思考的工具**，不是展示品 ② 方便人查 ③ 方便 AI 查（所以要产出 `dist/graph.json` / `dist/llms.txt` / `dist/nodes/*.md`）。

**这不是 wiki，不是博客。** 它是一张星空。

### 实测状态（2026-11-07，`bun tools/mg.mjs stat`）

```
内容版本 v0.9.3 · 15 星系 / 105 星团 / 1550 节点 / 3192 边 · maxLayer 38
强边 3150 · 弱边（类比）42 · 推论（layer:false）33
英文页 1550 · 别名 1360 组 · 问法钩子 217 条
```

| 项 | 值 |
|---|---|
| 仓库 | `H:\MathGalaxy` |
| 远端 | `https://github.com/bingyingzizz/MathGalaxy`（**public**，`main`） |
| 线上 | <https://bingyingzizz.github.io/mathgalaxy/> |
| 工作树 | 本次提交后本地 `main` ahead 41（未 push；origin 仍停在 `0d20279a`） |

### 门禁 · 我 2026-11-07 全跑过

| 命令 | 结果 |
|---|---|
| `bun tools/build.mjs` | ✅ 全绿（1550 节点 / 3192 边，所有页 ≤1300 B） |
| `bun tools/_katexcheck.mjs` | ✅ **2906 个 `$…$`，失败 0**（FIX-005/FIX-009/FIX-011/FIX-020/FIX-022 的删改累计 2815→2825；FIX-023c 恢复被覆盖旧注中的 1 个 display ⇒ 2825→2826；第 2 批 8 条证明新增 8 个 display ⇒ 2826→2834；第 5 批 6 条证明新增 15 个 display ⇒ 2834→2849；第 6 批 6 条证明新增 16 个 display ⇒ 2849→2865；第 7 批 5 条证明新增 24 个 display ⇒ 2865→2889；第 8 批 3 条注新增 16 个 display ⇒ 2889→2905；第 9 批 3 条证明新增 7 个 display ⇒ 2905→2912；第 10 批 4 条曲面证明重写净 −1 个 display ⇒ 2912→2911；第 14 批 / FIX-045 净 −1 个 display ⇒ 2911→2910；第 15 批 2 条证明净 −4 display ⇒ 2910→2906） |
| `bun tools/_katexcheck-all.mjs` | ✅ 无硬失败；只剩「正文残留 Unicode 记号」**3 种 / 8 处** |
| `bun tools/doccheck.mjs` | ✅ 25/25（2026-11-06 起也扫 AGENTS.md / HANDOVER.md，提交前自动跑） |
| `bun tools/searchcheck.mjs` | ✅ **31/31**（「定义」total 已按本次新增节点/边重钉为 908；fubini 12；Noether 14；compact 94——FIX-038 删 Riesz 注里的 `prop.paracompact-partition-unity` 后 95→94；第 9 批新增「定义」1 次，894→895；第 10 批 4 条注新增「定义」1 次，895→896；本次新增 6 个 definition 节点与注中「定义」多次 ⇒ 896→904→907→908（新增 def.integral-over-set / def.convex-combination / def.convex-hull 3 个定义节点及注）；ℵ₀ 6→7（FIX-042 Henkin 的 κ=max(|L|,ℵ₀) 新增一次）） |
| `bun tools/_slashcheck.mjs` | ✅ 0 处 |
| `node tools/dupkeys.mjs` | ✅ 0 处（同对象内 `notes`/`note`/`regions` 重复键会静默覆盖；FIX-023c 后加入常规门） |

---

## 1. 怎么干活 —— 三条并行线（**最容易踩的结构性事实**）

同一时刻常有**三个 agent 在写**，规矩不同：

| 线 | 干什么 | 能改文件吗 | 结论写哪 |
|---|---|---|---|
| **A. 写内容** | 加节点 / 改陈述 / 补证明 | ✅ `src/data/`、`src/core/` | 提交信息 |
| **B. 审查（只查）** | 逐条精读、找错 | ⛔ **一个字节都不改** | `_audit/问题清单-v2-2026-11-03.md` 的 §32–§59 |
| **C. 照单修** | 照 B 的清单动 `packs/` | ✅ | 提交信息 + 追加到 v2 的 §14.x |

⚠️ B 和 C 都碰同一份 v2 文档，**节号不冲突**（B 写 §32–§59，C 追加 §14.12–§14.30）。
⚠️ `_audit/` **整个被 gitignore**（`_*`）⇒ 审读侧的所有产物**只在本地**，push 不上去。

### 标准工作流

```
① 先查：bun tools/mg.mjs find → show → path / deps / impact
② 再改：内容只动 src/data/；观感只动 src/core/
③ 体检五步（缺一不可）见下
④ 亲眼看：headless Edge 截图 + read_image
⑤ 提交：git add <自己的路径> dist → git commit -F <utf8文件>
⑥ 发布：bun tools/publish.mjs（⚠️ push --force，必须串行）
```

### 体检五步

| 命令 | 管什么 |
|---|---|
| `bun tools/build.mjs` | 全部硬门：边端点 / 纯文本字段 / 记号 / 体积 / 层方向。红了就是真问题 |
| `bun tools/_katexcheck.mjs` | 全库 `$$…$$` 逐条喂真 KaTeX。**必须 0 失败** |
| `bun tools/doccheck.mjs` | 文档硬数字 vs `meta.counts`。它红了改 README，别改基准 |
| `bun tools/searchcheck.mjs` | 搜索基准。**加内容会改 total，要重钉并写理由** |
| `bun tools/clustercheck.mjs <星团id>` | 团体检：文引无边 / 提到没边 / 孤岛 / 对外连线 |

外加两个（「静默丢内容」专检，build 不覆盖）：
`bun tools/_slashcheck.mjs`（多余/丢失的反斜杠）· `bun _tools/_ctrlscan.mjs`（已被吃成 TAB 的公式）。

### 加完一个星团之后必做（2026-11-03 Galois 团实战总结）

体检全绿只占工作量的一半，另一半是「**这批节点和外面接上了吗**」：

1. **文引无边** —— 正文用反引号点名但不能点的：真依赖就**补边**；只是顺带提就**把反引号降成中文词**。⛔ 反引号是承诺，读者会点。
2. **提到名字但无边** —— 真依赖补边；同名不同物补**消歧注**或**类比边**；顺带一提不管。
3. **孤岛**（出=入=0）必须接上，否则层号掉到 0。
4. **对外连线只在本星系** ⇒ 去找那座真存在的桥。
5. **承诺了但不存在的概念** —— 正文说「单位根」「代数闭包」而图里没有 ⇒ 要么补节点，要么改文字。
6. **同词不同物** ⇒ 消歧注 + 类比边，并**改掉旧节点里「本图未收录」这类过期句子**。
7. **证明完整性** —— 骨架必须标 `status: 'skeleton'`，并写清**哪一步是本图的空白**。

### ⭐⭐ 加完**必须逐页对账**

用户 2026-10-08 抓出来的：「我感觉你还有好多东西没写啊……你是不是差了好多好多东西？」——**他是对的**，
有整整 3 页没进图而我自己以为做完了。

- ⛔ **建完一个团 ≠ 那批笔记进完了。**
- ✅ 对账：`bun _tools/_audit-notes.mjs`（`_pdf/大纲.md` 的 215 条逐条对到星图上）
- ✅ 更快：拿术语去 `bun tools/mg.mjs find`，全 0 = 整块没进

---

## 2. 铁律（违反即返工）

### 2.1 引擎和内容必须分家

- `src/core/` = **引擎**：只管「怎么画」，不知道有什么内容
- `src/data/` = **内容**：只管「有什么」，不知道引擎怎么画
- 用户第一轮就强调：「**注意你写的代码应该是分模块的，底层代码和添加的节点和文本应在两个地方**」
- 加内容**只动 `src/data/`**；改观感**只动 `src/core/`**。越界就是设计事故。

### 2.2 零依赖、无构建、`file://` 能开

经典 `<script>` + 全局 `window.MG`，**绝不用 ES module**，绝不引入框架/打包器/npm 依赖。

### 2.3 新内容包必须在 `index.html` 挂 `<script>`

构建扫目录、网页读标签 —— 两边不一致就会出现「**构建说 N 条、网页说 M 条**」。走 `bun tools/ingest.mjs` 会自动挂。

### 2.4 一个概念一个节点；证明写在「边」上

节点只放**陈述**和必要的注；推导过程放边的 `proof`。⭐ 这是节点不爆炸的关键。

### 2.5 单反斜杠是**静默损坏**

写 `src/data/packs/*.js` 时每个 LaTeX 反斜杠写**两个**。`\times` 写成单个会被 JS 读成制表符，**KaTeX 一个错都不报**。
⚠️ 但 `_inbox/*.md` 投稿是**单**反斜杠（Markdown 不进 JS）—— 两套口径别搞混。

### 2.6 改完必须真的看一眼

```
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu ^
  --hide-scrollbars --virtual-time-budget=6000 --screenshot=out.png ^
  --window-size=1600,900 file:///H:/MathGalaxy/index.html
```

⚠️ 截图在虚拟时间 **1.0~1.4 s** 抓帧，`setTimeout(…,1500)` 之后的改动**截不到**。
测交互用深链（`#n=` `#e=`）或把定时器压到 400~900 ms。现成工具 `_tools/cdp.mjs`。

### 2.7 ⛔ 不用 `git add -A`

这台机器常**双开 agent**，`add -A` 会扫进别人正在写的半成品（踩过两次）。
**只 add 自己改的路径**；`dist/` 是被跟踪的产物，跟着提交。

### 2.8 判据必须是**实体**

「有/没有/已修/未修」都要附可复跑的查询（id、计数、脚本输出）。
⛔ 不许用「看起来不对劲」代替「读约定 / 读实体」。反例：

| 情况 | 错误判据 | 正确判据 |
|---|---|---|
| 面板关不掉 | `classList.contains('hidden')` | `getComputedStyle(el).display` |
| 线上死样式 | 源码 `indexOf` | CSSOM / DOM 存在性 |
| 标签条数 | `prof.labels`（**毫秒**！） | `prof.labelCount` |
| 「全部连线」生效没 | 按钮有 `.on` | 位图 `paintKey` |
| display 公式被裁 | 外层盒子宽度差 | `.katex-display` 的 `scrollWidth - clientWidth` |

### 2.9 派生量**不是**约束

层号 / 布局坐标 / 聚合数 / `_cap` / `paintKey` 都是从数据算出来的。

用户原话：**「你咋那么害怕改层？如果的rham要依靠18层的点，那就说明这玩意就不该在16层啊。」**

当「定义边指错了」与「层号会动」冲突时：**改边，让层号自己动**。
⛔ 绝不为保住某个层号把定义边接到错的节点上 —— 那会造出「**假接线**」：读者顺着定义走过去，走到的是另一个口径的陈述。

### 2.10 用户说「无所谓」的事就是**不做**

例：全库 display 公式溢出，用户 2026-11-02 明确裁定「公式溢出无所谓吧，滑动一下就可以」
⇒ 不再普查、不再修、也不列待办。**不要换个说法再验一遍。**

### 2.11 不许假装完成

- 说「改好了」之前必须真的验证过
- 没验证的就说「改了但没验证」
- 数学上有疑问 → 明确说「这里我不确定」，不要自信地编
- 骨架证明标 `status: 'skeleton'` 并写明缺哪一步

### 2.12 别过度工程

零依赖纯静态是**刻意的选择**，不是技术债。

### 2.13 ⭐⭐ 卡住就先加探针，再动手（2026-11-05 用户拍板）

> 用户原话：**「以后遇到搞不定的问题就要像现在这样先测试再做。」**

一个白开场的问题，我连着改了五轮（提前注入、藏起来再显示、换保存方式、加阈值、改配色），
每轮都「看起来该好了」，用户那边现象一直不变——因为**我在猜，而不是在看**。
最后在面板标题栏加了一行七个字的读数（`调用次数/成功次数/卡在哪` + 调色板在不在），
**一次刷新就打出真相**：`824/0/throw:NEUTRAL_PAGE_CSS is not defined`。

真实原因：某次批量替换删掉了 `NEUTRAL_PAGE_CSS` 这个常量，而 `dressFrame()` 还在引用它，
异常被它自己的 `try/catch` 吞掉，于是「什么都没发生」——而我前五轮全打在这条**根本没跑通**的路径上。

**规则**：

1. 同一个现象改两轮仍无变化 → **停止改代码**，先去测。
2. 测的办法要能让**用户一句话/一张小截图**回答：把关键状态压到 ≤8 个字显示在界面上，
   或写进日志文件（不要依赖浏览器 console，用户看不到）。
3. **静默 failure 是最大的坑**：`try/catch` 里什么都不记，等于把 bug 埋起来。
   凡是包住主流程的 catch，至少要留一个可观测痕迹（计数、原因、或在失败时冒一行提示）。
4. 探针只在诊断期存在，**定位完立刻删掉**（本次已删，rev `8416ea2553fa`）。

**推论**：能用一行读数解决的事，不要用五轮「应该好了」去赌。

### 2.14 ⭐ AI 英文页的续段标签与「时间戳幻觉」（2026-11-07）

**症状**：`dist/nodes/*.en*.md` 里出现中文 `> 续见 nodes/…`。2026-11-07 实测 **52 个英文页**中招；
英文页本身是给英文读者 / 英文 AI 的入口，夹一行中文很刺眼。

**原因**：`tools/build.mjs` 的 `emitChunks()` 把续段标签硬编码成「续见」；英文调用点
（`nodes/<id>.en.md` 那行）没有单独传标签。中文页和英文页共用这个函数，默认值就成了漏点。

**修法**：`emitChunks(files, dir, base, head, body, tail, resB, contLabel = '续见')`，
续段行用 `${contLabel}`；英文调用点传第八个参数 `'continued in'`。中文页不传，行为不变。
验证：`dist/nodes/ax.choice.en.md` 的续段行应为
`> continued in nodes/ax.choice.en.2.md`；Node 扫全部 `*.en*.md` 的 CJK 应为 **0**。

**⚠️ 时间戳幻觉（这次差点误判）**：`dist/nodes/*.en.md` 的 mtime 是 14:52，
`tools/build.mjs` 是 19:29，产物比源码旧 4.5 小时。如果只看 `dist/`，会以为「源码已经改过了、
只是产物旧」；实际源码一行没改，产物也没重建。**判断 `dist/` 是否为旧产物前，先比 mtime；
改完构建脚本必须重跑 `bun tools/build.mjs`，再读产物。**

---

## 3. 内容准则（用户逐条拍过板，别自作主张改）

### 3.1 只写数学，**不写整理过程**

用户看到「笔记原稿里这一行是缩进写在「Prop. X 完备.」下面 —— 本人 2026-09-22 确认：……」，直接说：
**「这种东西就没必要写了，干净一点。」**

⛔ 星图内容里不许出现：笔记页码/排版/原话 · 核对与确认记录 · 「我按标准做法补了骨架」这类自述 · 出处标记。
判断标准：**这句话在讲数学，还是在讲我们怎么把它整理出来的？** 后者删。
（核对过程归交接书，不归星图。）

> 反例（该留）：`⚠ 把 $\cup$ 换成 $\cap$ 或 $\setminus$ 结论同样成立` —— 这是数学事实。

### 3.2 ⭐⭐ 每一层都从上一层**构造**出来

用户原话：**「我们这个星图做的事情，每一层都应该严格从上一层中来，所用的东西不能超出去，而且必须要注重构造。……要让数学从根像大树一样长出来。」**

- 新对象必须由**已经有的东西**造出来，**用到的每个概念都要在更低的层里有节点**
- ⛔ **禁止**用「满足某组性质的对象（同构意义下唯一）」引入新东西 —— 那是公理刻画，悄悄假设了存在性
- ⛔ **性质是定理，不是定义**
- 点名的例子：**ℝ 不是「完备有序域」，而是「有理 Cauchy 列模去零列」造出来的**；域公理、序公理、确界原理都是**定理**（`thm.real-ordered-field`）
- 自查抓手：**「用到了却没节点」「用到了却没连边」都是违规**
- 这条同时写在 `README.md` 的内容准则、`dist/llms.txt`、`graph.json` 的 `readingGuide.contentPolicy.constructive`

### 3.3 分类：四层尺度

**大板块**（5 个：基础与逻辑 / 分析 / 代数 / 几何与拓扑 / 数论）→ **领域**（15）→ **星团**（105）→ **恒星**。
归属唯一真源：`src/data/sectors.js`。⛔ 新 region 必须同时进 sectors.js；⛔ 不轻易加新星系。

星团哲学（用户拍板）：

> 「类似测度论这种内部一大堆定理只是为了构造一套能用的东西，就全扔到一个星团好了，反正如果要链接外部好像也是一起链接这样子」

即：**星团 = 为造出某个「能用的东西」而存在的一整套结果**；内部密无所谓，**对外整块连接**。
⚠️ **一个团别超 40 点**（超了按「装置」再切）。

### 3.4 边的五种画法

| kind | 语义 | 画法 | 强度 |
|---|---|---|---|
| `implication` | `sources[] → target` | 黑箭头 | 强 |
| `equivalence` | `a ⟺ b`，带 `proofs[]` 双向 | 黑线 | 强 |
| `definition` | 结论引用了定义 | 蓝 50% 透明线 | 强 |
| `analogy` | 思想相通 | 紫虚线 | **弱** |
| ⭐ `layer:false` | 推论 | 粉红 `#E0446B` | 不参与分层 |

**强边 = 逻辑骨架，弱边 = 联想，检索时要能分开看**（工具栏「探索」按钮切换）。
粉红由 `MG.isDerived(e)` 判定。

⛔⛔⛔ **「正文提及」不是依赖边。** 四类 kind 全是**手挑**的；新增 `imp.*` / `def-link.*` 的 id 前先 grep 裸 id。

### 3.5 数学写作

- 公式一律 **LaTeX**（KaTeX 已接入）：`\sum_{j=1}^\infty`、`\frac{}{}`、`\|f\|_p`、`\lim_{r\to 0}`
- ⚠️ **「不要写 LaTeX」那条已废除** —— 是我早期从「渲染器不解析 LaTeX」自己推出来、又写进文档当成了用户要求。
  用户 2026-09-22 明确否认：「我从来没说过不要写Latex这种话。」
- **正文也全面 LaTeX 化**：数学记号一律 `$…$`，不要再直接写 `∈ ⊆ μ σ ≤` 或 Unicode 上下标
- **保持原样**：英文词（Cauchy、ZFC、Lebesgue）、装饰符（`∎` `⭐` `①②③` `⚠ 📌 💡`）、中文标点
- `title` 可以写 LaTeX（走 `U.titleHtml()`，只认 `$…$`），但**不是必须**
- ⛔ **`label` / `tags` / `refs` 是纯文本，绝不能含 `$`**（构建有硬门）。`label` 画在画布上，`tags` 只做子串匹配
- 中文为主，术语附英文
- ⛔ 数学正文里 `](` 会被当 markdown 链接

---

## 4. 待办（按优先级，每条都带我 2026-11-05 测到的状态）

> 完整清单在 `_audit/问题清单-v2-2026-11-03.md`（8886 行，§24 是待修总表，§58.5 是硬错表）。
> 下面只写**最该先动的**，以及**我亲手验过的争点**。

### 4.1 ✅ 2026-11-05 已修：`src/core/search.js` 的 `key()` 笔误

> **修法（不是把空格全删掉）**：`key()` 改成「破折号 → 空格、空白压成一个、去首尾」；
> 另加 `keySq()` + `sqPrefixHit()` 处理 `RiemannLebesgue` / `Riemann映照定理` 这种**无空格**写法
> （只认「名字开头若干**完整词**的拼接」）。
> ⚠️ 试过的错法：把空格和破折号**全删**——会跨词边界粘出假命中：`kC` 撞上「Grothendieck category」、
> `NBV` 撞上 `f \in BV`（两条都是 2026-11-05 实测）。所以「含」判断必须用带空格的键。
> **验收**：`searchcheck` 31/31（新增 `Riemann Lebesgue` / `RiemannLebesgue` 两条基准）；
> 真页面 cdp 输入「Riemann Lebesgue」→ 第一条 `thm.riemann-lebesgue` 且高亮（`_audit/_boot/search-space.png`）。
> 下面保留原始诊断，供复盘。

`/s+/` 匹配**字母 s**，不是空白。两个后果：

1. **空白从来没被去掉** ⇒ 「带不带空格」两种写法永远对不齐
2. **所有字母 `s` 被删掉** —— 实测 `key('Steinhaus') === 'teinhau'`

**影响面（实测）**：`dist/graph.json` 里 **494 个 label 含空格**，全部受影响。
例：`Riemann 曲率张量` 的 key 是 `riemann 曲率张量`，用户敲 `Riemann曲率张量` 得到 `riemann曲率张量` ⇒ 对不上。

**复现**（真引擎，`_tools/cdp.mjs` 打开页面、往 `#search-input` 派发 input）：

```
'Riemann-Lebesgue'  → ✅ 第 1 条
'Riemann–Lebesgue'  → ✅ 第 1 条
'Riemann Lebesgue'  → ❌ 空
```

⚠️ **当时 `searchcheck` 29/29 绿也抓不到**：基准钉的是 `{ q: 'Riemann映照定理', top: ['thm.riemann-mapping'] }`，
而上次的修法是**在 `aliases.js` 里加无空格别名兜住**。**基准钉在别名上，没钉在 `key()` 归一化上。**

⇒ 改法不只是修那一行，**必须给 `searchcheck` 补一条「带空格」的基准**，否则下次还会退回。✅ 2026-11-05 已补两条。

### 4.2 🔴 凸性一族：补 4 个节点 + 1 处扩充

✅ **实测：`def.convex-combination` / `def.convex-set` / `def.convex-hull` / `def.star-shaped` 四个都不存在。**

| # | id | label | 谁在等 | 前置 |
|---|---|---|---|---|
| 1 | `def.convex-combination` | 凸组合 | 4 | `def.vector-space` |
| 2 | **`def.convex-set`** | **凸集** | **12** | 1 |
| 3 | `def.convex-hull` | 凸包 | 1（但 `def.standard-simplex` 的定义靠它） | 2 |
| 4 | `def.star-shaped` | 星形集 | 4 | `def.vector-space`（**不依赖凸**） |
| 5 | 🟡 扩充 `def.convex-function` | 加「向量空间上的凸」一节 | 2 | 同上 |

⚠⚠ **三个「星形」不是一回事，硬连就是假接线**：

| 出现处 | 真义 | 能连 `def.star-shaped` 吗 |
|---|---|---|
| `lem.poincare-lemma` / `def.exact-form` / `def.exponential-map` / `def.exterior-derivative` | 星形集 | ✅ |
| `thm.metric-paracompact`「开**星形加细**」 | star refinement | ⛔ |
| `thm.simplicial-approximation`「$\operatorname{st}(w)$」 | 单形的星 | ⛔ |

### 4.3 🔴 $\int_E f\,\mathrm{d}\mu$ 没有定义节点

✅ **2026-11-05 AUD-002 实测：14 个节点在用**（旧的「11」只数了 `\int_E` 的字面量，漏了 `\int_{E_n}` 这类）：
`prop.integrals-equal-iff` · `def.signed-measure` · `def.absolute-continuity` · `thm.ac-epsilon-delta` ·
`prop.integral-gives-ac` · `cor.ac-integral-continuity` · `prop.rn-chain-rule` · `prop.total-variation-basics` ·
`prop.L1-signed` · `cor.integral-is-ac-nbv` · `ex.density-abs-continuous` · `prop.simple-integral-props` ·
`thm.differentiation-general` · `thm.rn-pointwise`。

⚠️ **`def.integral-lebesgue` 并不存在**（旧交接书写错了）：Lebesgue 积分拆在
`def.integral-simple` / `def.integral-nonneg` / `def.integral-complex` 三处，**三处都不含 $\int_E$ 的定义**。
另缺：Lebesgue 侧**一般情形的保序**与 $A\mapsto\int_A f$ **可加**。

**还有一座死桥**：`prop.riemann-implies-lebesgue` ✅ **实测出边 = 0** —— 没人消费它。

### 4.4 🔴 硬错 19 条：**2 已修 / 3 部分 / 14 未修**（AUD-002 2026-11-05 对账）

> **AUD-002 的唯一口径**（以仓库实体为准）：
> **2 已修**（#1 `prop.bv-examples`、#10 `thm.darboux`）·
> **3 部分**（#7 `prop.mitchell-exactness`、#14 `thm.diagonalizable`、#17 `def.inner-product` —— 注里认了错/加了警告，陈述没改）·
> **14 未修**。
> 逐条原句 + 最小改法见 `_audit/review/2026-11-05-status-reconciliation.md` A.1。
> ⚠️ **别把「重复边」「`prop.bv-regularity` 处处」算进这 19 条**：两条修复属实，但不在 §58.5 的表内。
> ⚠️ `prop.k-bounded-implies-exact` 是 19 条里的 #13，不是「表外琐碎」（旧交接书重复列了）。

我逐条 `mg show` 抽验过（§58.5 有整张表）：

| 节点 | 状态 |
|---|---|
| `prop.bv-examples` | ✅ **已修**（改成 $\lvert x\rvert^{3/2}\sin(1/x)$） |
| `thm.darboux` | ✅ **已修**（假命题已删干净） |
| `def.ind-object` | ❌ 仍是 `\varinjlim_{j}\varprojlim_{i}`（应为 `\varprojlim_j \varinjlim_i`） |
| `def.injective-dimension` | ❌ 仍写 `\mathrm{pd}`（应为 **`\mathrm{fd}_{R^{\mathrm{op}}}`**） |
| `prop.dimension-shift` | ❌ 仍「对一切 $n\ge0$」（应为 $n\ge1$） |
| `def.zero-object` | ❌「等价地 $\operatorname{End}(0)=\{\mathrm{id}\}$」仍假 |
| `prop.mitchell-exactness` | 🟡 **部分**（注里认了反方向不成立，陈述第 3 点「可搬到模范畴里判」仍越界） |
| `prop.measurable-closure` | ❌「$\sup_j f_j$ 可测」仍漏「**可数**」 |
| `thm.ext-balanced` | ❌ 仍「$M\to I^\bullet$ 是内射消解」（应为 **$N$ 的**） |
| `thm.diagonalizable` | 🟡 **部分**（注里加了「必须特征多项式分裂」的警告，陈述仍称五条等价） |
| `prop.integral-chain-linear` | ❌ 仍 $a,b\in\mathbb R$（链要 $\mathbb Z$ 系数） |
| `def.inner-product` | 🟡 **部分**（注里自认「须核对」，例子 $\sum\overline{x_i}y_i$ 与「第一变元线性」相反） |
| `thm.hadamard-factorization` | ❌「特别地：阶 $\rho<1$ 没有零点」仍假 |
| `thm.winding-homotopy` | ❌ 同伦仍未要求**全程是闭曲线** |
| 其余 5 条 | 见 §58.5 |

**另有 3 条表外琐碎**（都不在 19 表内）：
`def.union-inter`（$\bigcap\varnothing$ 不是集合）· `thm.riemann-mapping`（陈述缺 $\Omega\ne\mathbb C$）·
`prop.lc-ab-preabelian`（余核须商去**闭包**）。

### 4.5 🔴 被吃掉的反斜杠还剩 **6 处**，两种坏法

✅ **重跑 `_tools/_ctrlscan.mjs`，5 处 TAB 仍在**：
`ex.sierpinski-space.notes` ×2 · `imp.fa-locallycompact-baire.note` ×1 · `imp.fa-ck-banach.note` ×2。
加上 `e16.implication.proof` 的 `$\ne$` = **6 处**。

| 坏法 | 例子 | 为什么以前扫不到 |
|---|---|---|
| **A. 已落盘成真控制字符** | `$\to$` → `$<TAB>o$` | 反斜杠扫描器**没东西可扫**，坏的已经不是反斜杠了 |
| **B. 仍是单反斜杠** | `$\ne$` | `_bsaudit` 把 `\n` **放进白名单**（为放行 `.join('\n')`）⇒ `\ne` 一起放过 |

⚠️ 另有两处在 `161-functional-analysis.js` 的**包头部注释**里（不进图），说明这手误是**习惯性**的。
👉 **建议把 `_ctrlscan.mjs` 接进 build 硬门**，否则下一批还会再来。

### 4.6 🟢 别名与可发现性（2026-11-05 已修第一批）

✅ **已修**：`mg find` 查 `西尔维斯特` `罗尔` `博雷尔集` `托内利` `龙格` `施瓦茨` 现在全部命中；
16 个常用音译 + 34 个补充覆盖已写进 `aliases.js`（aka 3493→3555；label 未动）。

- ⚠️ `_tools/_noalias_cjk.mjs` 报的「78 个 aka 零汉字」是**正则漏读的假数**（`id` 与 `aka` 之间有 `en:` 的条目抓不到）；vm 实载后**真·零中文 aka = 0**。真实缺口是「常用音译覆盖」，不是「78 个节点没中文」。
- 3 组抢别名已归位（`def.simplicial`→`def.simplex-category`、`def.mono`→`def.isomorphism`、`thm.long-exact`→`thm.snake-lemma`，英文 `snake lemma` 保留共享）。
- aka 撞 label：31 → **14**；剩下 14 处是「同名不同物/真重叠」，需要**消歧注/分节点**，不是删 alias。
- ⏳ `def.norm` 与 `def.normed-space` 仍把同一组范数公理写了两遍（内容问题，待 FIX-008）。
- ⏳ 真没有节点的 5 个：维塔利 / 索伯列夫 / 施图尔 / 盖尔芳德 / 麦克劳林（登记为 gaps）。


### 4.7 🟡 结构层

| 项 | 实测 |
|---|---|
| 自环 / 空端点 / 互推 | ✅ 全 0 |
| 有 `proof` 但无 `status` 的边 | **627 条** |
| 边 id 由全局序号派生 | ✅ **179 条形如 `e<数字>`**（`e16.definition` 这种）；222 个公开 proofs 页依赖它 ⇒ 内容一变 id 就漂 |
| 骨架边无独立 status | **第 1 批报告口径 19 条**（图本身没有 edge status，不能从 `dist` 复跑；旧「33 条」已弃用） |

⚠️ **节点页贴近 1300 B 上限**（2026-11-05 实测）：`thm.tensor-universal-property` **1300（顶格）**、`def.manifold-chart` **1291**、`def.interior` **1284**、`thm.cauchy-inequality` **1282**、`def.orientable-manifold` **1272**、`thm.gauss-bonnet` **1268**、`def.transition-function` **1266**、`def.gram-matrix` / `def.bilinear-form` 也接近 —— 再往这些陈述加一句就会红。

### 4.8 ⬜ 未动的大块

| 块 | 规模 | 备注 |
|---|---|---|
| **P2「多写假设」剩余** | 另一个会话说 **73 个唯一节点** | ⚠️ 我没核实这个数 |
| **N 类** | **600+**（§20 大表，命中率 25%） | 最大一块 |
| 精读覆盖率 | **回执 1540 / 1540（100%）**；本会话逐团深读 **57 团 / 760 条**（v2 §39–§116） | 其余 48 团 / 780 条来自 §19–§59 早期批次；旧的 1051/1502/1527 是按团 id 倒推的估计，不再用 |
| **skeleton 证明** | **11 节点 / 19 条边**（2026-11-07 第 15 批后；标准 2（Euler 示性数阻塞）、中等 2（schwarz-christoffel / prime-number-theorem）、研究 7；边数按第 1 批报告口径，图不可查询） | 第 1 批 8 条、第 2 批 8 条、第 3 批 4 条、第 4 批 6 条、第 5 批 6 条、第 6 批 6 条、第 7 批 5 条已补；第 8 批 0 条移除（PNT / Riesz–Markov / Schwarz–Christoffel 仍 skeleton）；第 9 批 3 条已补（Mittag-Leffler / Frobenius / 示性类）；第 11 批 2 补 2 留（cond-epi / completeness 已补，paracompact-cech / hadamard 仍 skeleton）；第 12 批 banach-as-condensed 已补、de-rham 仍 skeleton；第 13 批 Riesz–Markov 已补，SC 仍 skeleton；第 15 批 2 补 2 留（Riemann 映射 / Hadamard 已补，paracompact-cech / PNT 仍 skeleton）；研究级需专人/多轮 <!-- stalecheck:ignore 子集统计（骨架证明），不是全图规模 --> |
| §11-E 扫描器接硬门 | 剩 5 个（`_sweep_dispbrace` / `_sweep_escbrace` / `_sweep_uesc` / `_sweep_math` / `_sweep_brace`）+ 3 个只能当警告 | — |

⚠️ **涉及公式增减的改动要多改一份英文陈述** —— `build` 有「中英公式不变量」硬门
（被它拦过：给 `def.outer-measure` 陈述加 3 条行内公式、英文没跟，当场红）。

### 4.9 🟢 纯文本 `$` 与拖动样式（2026-11-05）

- **`$` 硬门**：`assertNotation()` 现在除 node 的 `label/tags/refs` 外，还查 `MG.clusters/regions/sectors` 的 `name`/`en`。起因：星团 `fa.ck` 的 `name` 写成 `$C(K)$ 与 Stone–Weierstrass`，渲染层原样画 `$`（用户截图）。
- **渲染防御**：`src/core/i18n.js` 的 `plainName()` 对显示副本剥除 `$`，每字段只 warn 一次；`localizeDisplay` / `labelOf` / `clusterName` / `regionName` 全覆盖；`renderer.labelSig` 加 `MG.displayEpoch`（否则离屏标签层不刷新）。
- **拖动样式**：`html.dragging .floating{...}`（拖动时实色 / 去 backdrop 模糊）**已删、keep**。实测（CDP 真鼠标 70 步 ×2，4070Ti dpr1/dpr2/软合成）帧率无可测差异；有规则时拖动起止面板跳变一次（平均 |ΔRGB|≈4.55/255，变亮）。平板 Adreno 735 未测；要恢复就贴 `styles.css` 注释里的 5 行回滚片段。

---

## 5. 要用户拍板（4 条，别自己定）

### 5.1 `thm.adic-gluing` / `prop.analytic-base-change` 引的章节**不存在**

它们引「Lecture IX Thm 9.8」「Prop 10.1–10.5」，而手上两份原文：

| 文件 | 是什么 | 覆盖 |
|---|---|---|
| `_pdf/book/book.txt` | Le Stum《An introduction to condensed mathematics》全文 | ⚠️ **只有第 1–8 章**；`analytic ring` / `adic space` / `Huber` 各 **0 次** |
| `_pdf/cite/analytic-arxiv.txt` | Clausen–Scholze *Lectures on Analytic Geometry* | 含 $1-\mathrm{shift}\otimes T$ 的消解 |

**两条路**：(a) 用户补续篇 (b) refs 改成**不指章节**，只留「书名 + 主题」（符合 `CONTRIBUTING.md` 既有口径）。

### 5.2 `def.ricci-curvature` 的符号约定自相矛盾

$R$ 的符号约定与 $R_{ij}=Kg_{ij}$ 打架 —— **团级约定**，定了要整团统一，不该单方面拍。

### 5.3 人名写法：两条规则打架

`Lusin` / `Urysohn` / `Kolmogorov` → 该改西里尔（**无争议**）。
但 `Riesz–Markov` / `Pontryagin` **两条规则打架**（`CONTRIBUTING.md` 31–38 行说「用本人语言写法」，
而这两位通行写法是拉丁化）—— **要用户定**。

### 5.4 `refs` 的 17 条 A 类要不要动

最集中的是 **Tu 那 13 条**（黎曼几何主题引了 GTM 334 *An Introduction to Manifolds*，
疑该引同作者的 GTM 275 *Differential Geometry*）。内部铁证：`def.local-trivialization`
一个节点上**同时**挂着「GTM 334」和「GTM 275，手头无该书」。

⇒ 没实体书钉不死。**要么确认「都改指 GTM 275」，要么标「待核」不动。**

---

## 6. 环境（踩过的坑，照抄）

| 项 | 值 |
|---|---|
| bun | `C:\Users\MSI\.cherrystudio\bin\bun.exe`（**不在 PATH** 时用全路径） |
| git | `H:\Git\cmd\git.exe`（**不在 PATH**） |
| rg | `C:\Users\MSI\.cherrystudio\bin\rg.exe` |
| Edge | `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` |
| 机器 | RTX 4070 Ti · i5-13600KF · 32 GB · 240 Hz · dpr 1；另有安卓平板与手机 |

### 6.1 代理（每轮现探）

- 程序：**番茄V2航线**（`H:\FanQie.V2HangXian\`），端口 **7897**（⛔ 不是 7890 —— 用户 2026-11-01 明确纠正）
- **别信记忆里的端口号**：7890 / 7891 / 7897 / 7898 / 10809 逐个试，活的那个就是它
- `bingyingzizz.github.io` **直连可达**（200），只有 `github.com` 直连不通 ⇒ **核验线上用直连就行**；要 `git push` 主仓才需要代理
- git per-host 代理 `http.https://github.com/.proxy=127.0.0.1:7897`
  （`git config --show-origin --get-regexp proxy` 看实际值）；直连用 `git -c "http.https://github.com/.proxy=" push`
- `publish.mjs` 不能传 `-c` ⇒ `$env:GIT_CONFIG_GLOBAL='H:/MathGalaxy/_tools/_gitcfg-direct'`
- ⚠️ `publish.mjs` **只推站点仓库** ⇒ 本体要另外 push；两个 agent 可能同时在推
- 凭据**存在**（GCM 的 `gho_` token）→ 别用 `cmdkey` 判断，用 `git credential fill`

### 6.2 shell（pwsh）

- **exe 的 stdout 不会被 pwsh 捕获** → `Start-Process ... -RedirectStandardOutput $f` 再 `Get-Content -Encoding UTF8`
- **exe 放管道中间直接报错**（`CantActivateDocumentInPipeline`）→ 同上
- `Get-Content` 默认 GBK → 中文必须 `-Encoding UTF8`
- ⚠️ **参数含空格会被拆坏** → 传数组，或**把内容写进文件再传路径**
- `$env:LOCALAPPDATA` / `$env:ProgramFiles` 在沙箱里为空
- ⚠️ `PATHEXT` 只有 `.CPL` ⇒ `Get-Command` 找不到明明在 PATH 里的 `.exe`；但 `spawn` 按名字仍能找到
- ⚠️ **`.ps1` 文件别写中文注释**：Windows PowerShell 按 ANSI 解码，行号会错位、变量读成 null
- ⚠️ 内联 pwsh 命令里写中文会被 GBK 弄坏 ⇒ 校验逻辑一律写成 `.mjs` 再跑
- ⚠️ 写入偶尔 `ReplaceFileW EIO` —— 重试
- ⚠️ `build.mjs` 偶尔崩在 `EFAULT … rm dist/index`（文件系统偶发）—— 不是内容问题，直接重跑（24–72 s）

### 6.3 写脚本改 `src/data/packs/` 时的铁律

1. 每个 LaTeX 反斜杠写**两个**。单个 `\quad` 会被读成 `quad`
2. 命令后紧跟字母要补空格：`\partialf` 是「未定义控制序列」
3. **闸门别只认「含汉字」**：`'- ∀X ∈ F, f(X) ∈ X。'` 一个汉字都没有（`。` 是 U+3002），会被整条跳过
4. `'.join('\n')'` **也是字符串字面量** —— 闸门不严时 `\n` 会被切开、里面的 `n` 被转成 `$n$`，换行符整个消失
5. **一律「先干跑 → 小范围试 → 看源码抽验 → 全量 → 再跑一遍验幂等」**，改完必须 `git diff` 抽验
6. **别重复运行不幂等的迁移脚本**（踩过：`\mathbb{R}` 被改成带 `\{` 的）
7. ⛔ **命令的参数花括号绝不能转义**：`\frac{1}\{p\}` 里的 `\{` 是字面花括号，分母变成字符 `{`，
   页面上渲染成 `1{p}`（**分数线都没了**）。而 **KaTeX 完全接受、不报错**
8. ⛔ **两个 `$` 绝不能挨在一起**：`$\mu^{*}$$(B)$` 会被 `inlineMd` 的第一道 `$$…$$` 正则当成块级定界符
9. ⚠️ **JS 的 `\uXXXX` 只吃 4 位**：数学花体在星平面，`\u1D400` 会被解析成「`\u1D40` + 字面 `0`」。必须 `\u{1D400}` 加 `u` 标志
10. ⚠️ **`md()` 的「行首 `$$` = 独立块级公式」规则**：行内公式不要写在行首，否则会往下吞若干行
11. ⚠️ 要在「源码文本」上判断「这个字符在不在公式里」，**必须完整模拟 `md()`** —— 兜底是拿运行时口径再查一遍（`_katexcheck-all.mjs` 就是干这个的）

---

## 7. 工具清单

### 7.1 查询（给 AI 和人，**主入口**）

```bash
bun tools/mg.mjs find <词>          # 按名字/别名/标签/正文搜 → 给 id
bun tools/mg.mjs show <id>          # 陈述 + 注 + 出入边
bun tools/mg.mjs show <id> --proof  # 连证明正文
bun tools/mg.mjs edge <id>          # 一条边的完整证明
bun tools/mg.mjs path <a> <b>       # A ⟹ B 的**有向**推导链
bun tools/mg.mjs deps <id> --depth 2
bun tools/mg.mjs impact <id> --depth 2
bun tools/mg.mjs gaps --min 3
bun tools/mg.mjs cluster <团id>
bun tools/mg.mjs ls
bun tools/mg.mjs stat
```

⛔ **不要**去 rg 那几千个 `dist/nodes/*.md`。数据源是 `dist/graph.json`（构建产物，已纳入 git）。
`find` 说没有但确信应该有 → 先跑 `bun tools/build.mjs --json`。

### 7.2 构建 / 检查

| 工具 | 干什么 |
|---|---|
| `build.mjs` | 全量构建 + 全部硬断言 |
| `doccheck.mjs` / `xlinkcheck.mjs` / `searchcheck.mjs` | 硬门 |
| `clustercheck.mjs <团id>` | 团体检（不 exit 1，是给人看的清单） |
| `_katexcheck.mjs` / `_katexcheck-all.mjs` | 公式（后者是权威口径，七个探测器） |
| `_slashcheck.mjs` | 反斜杠 |
| `_bsaudit.mjs` / `_bsfix.mjs` | 内容包单反斜杠体检 / 修复（幂等） |
| `_ctrlscan.mjs` | **已被吃成 TAB 的公式**（build 不覆盖） |
| `_bracefix.mjs` / `_opfix.mjs` / `_cwfix.mjs` / `_proselatex.mjs` | 各类公式修器（都幂等，`--apply` 才写回） |
| `_findmeta.mjs` | 过程性说明（「笔记里…」「确认…」）必须 0 处 |
| `_coverage2.mjs` | 审读覆盖核对 |
| `_audit-notes.mjs` | `_pdf/大纲.md` 215 条逐条对到星图上（逐页对账） |
| `ingest.mjs` | `_inbox/*.md` → 内容包（**人核验后**跑，投稿方不许自己跑） |
| `sitepages.mjs` / `publish.mjs` | 概念页 · 组站点 + 推送 |
| `_tools/cdp.mjs` | CDP 驱动 headless Edge（`<url> <out.png> [script] [waitMs] [WxH]`） |

**CI**（`.github/workflows/check.yml`）：build → `_katexcheck-all` → idstable → searchcheck → doccheck → xlinkcheck → `_slashcheck` → `node tools/dupkeys.mjs`

### 7.3 给别的 AI 投稿（A 档，2026-10-29）

```
_inbox/<名字>.md   →（人核验后 bun tools/ingest.mjs）→  src/data/packs/NNN-codex-*.js
                   →（bun tools/build.mjs）→  dist/*
```

- 投稿方**只写 `_inbox/`**，⛔ **不许自己跑 `ingest.mjs`**（自审自签 = 没防线）
- ⛔ 不许改 `src/data/packs/*.js`（编译产物，会被 ingest 覆盖）
- ⛔ 不许改 `src/core/`
- 三道闸门：语义 / 记号（复用 `notation.js`）/ KaTeX
- ⚠️ AI 经 PowerShell 写文件会带 **UTF-8 BOM** ⇒ 解析器必须先剥 U+FEFF（`ingest.mjs` 已剥）
- 模板：`_inbox/_模板.md`

---

## 8. 权威文件索引

| 要什么 | 读哪 |
|---|---|
| **本交接书** | `H:\MathGalaxy\HANDOVER.md`（本文件，唯一） |
| **仓库规矩**（进目录自动注入） | `H:\MathGalaxy\AGENTS.md` |
| **审读报告真源**（13210 行，本地） | `_audit/问题清单-v2-2026-11-03.md` → §24 待修总表 · §58.5 硬错表 · §32–§123 各批 |
| 审读回执 | `_audit/_proofs/out-*.txt`（`P-*.txt` 是对应提示词） |
| 用户手写笔记原件 | `_pdf/`（167 MB）· 转写 `_pdf/凝聚态数学笔记-转写.md` |
| 散文式规则 | `CONTRIBUTING.md`（人看的）· `README.md` · `policy.md` |
| 历史 | `git log` —— **旧的 chronology 已删，历史就在 commit 里** |

---

## 9. 方法学结论（下轮怎么扫最省力）

`【我核】` 的 **34 条成立项**里：

| 模式 | 条数 | 占比 | 典型 |
|---|---|---|---|
| **$\Longleftarrow$ 方向缺边界** | **14** | **41%** | 非空 / $T_1$ / 闭 / 平衡 / 分裂 / $\dim<\infty$ / $\Omega\ne\mathbb C$ |
| 伴随 / 极限的「方向」 | 5 | 15% | `def.ind-object` · `def.morphism-of-sites` · `def.injective-dimension` |
| 一节点装两概念 / 名字只覆盖一半 | 4 | 12% | `def.inner-product` · `def.zero-object` |
| 证明比陈述严 | 1 | 3% | `prop.measurable-closure` |
| 其它（算术错 / 稠密≠正合 / 角点项） | 10 | 29% | — |

⭐ **下一轮火力集中第 1 类** —— 命中率最高，而且**判据机械**：反例几乎总是**五个万能反例**之一：
**空集 · 两点平庸空间 · 无穷维 · 不分裂 · 非平衡范畴**。

### 另否掉 5 条探路（记下来免得重跑）

限制词差集 · `\operatorname` 名字比对 · 「不能省」自检 · 散文相似度 · 打包句关键词 —— **都不可靠**。

---

## 10. 我没核实的地方（坦白，别当结论用）

1. **P2 剩余「73 个唯一节点」** —— 抽 `out-S*.txt` 得到 1497 个 id（含重复提及），还原不出 73
2. **§32 的 430 本书 / 2182 条引用 / A 类 17 条** —— 只核了标题数字自洽，**没逐条重跑**
3. **§46–§59 的精读结论** —— 抽验了 §58.5 表里的 10 条，其余靠报告自洽
4. **`prop.lc-ab-preabelian` 余核商闭包** —— 没读陈述
5. **英文陈述的公式不变量** —— 没跑那条硬门（只跑了 `build`，当时绿）

---

## 11. 与我实测不一致的 3 处（以本文件为准）

| 别处说 | 实测 | 依据 |
|---|---|---|
| 「这一轮共 **20 个提交**」 | **18 条**（`5c54fcd3..2a8d1c46`，不含起点） | `git log --oneline 5c54fcd3..2a8d1c46 \| wc -l` |
| 硬错 19 条「已修 4，余 15」 | 表里 19 条、标「已修」**2** 条 ⇒ **余 17**。另 2 条修复（重复边、`prop.bv-regularity`）不在那 19 条表内 | `sed -n '8791,8815p'` v2 报告 |
| 「`searchcheck` 29/29 绿」当搜索没问题的证据 | **不能这么读**，见 §4.1 | `tools/searchcheck.mjs:75` |

---

**最后更新**：2026-11-06 · 与任何旧交接文档冲突时以本文件为准
