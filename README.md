# 数学星图 · MathGalaxy

<!-- ────────────────────────────────────────────────────────────────────────
     English section (T1.0). 中文从下面「一张可缩放…」开始，一个字没动。
     数字改的时候一起改这里；权威数字永远以 llms.txt / graph.json 为准。
     ──────────────────────────────────────────────────────────────────── -->

> ## English
>
> **MathGalaxy** is a zoomable, searchable knowledge graph of mathematics: every
> concept is a star, every proof is a line between them.
> **1231 nodes / 2246 edges** across **13 galaxies and 77 clusters** (content `v0.9.1`).
> Zero dependencies, no build step — **double-click `index.html` and it runs offline**,
> in the browser, with the same data the published site serves.
>
> 🌐 **Open the live map** → <https://bingyingzizz.github.io/mathgalaxy/>
>
> ### How to read it
>
> Three scales: **galaxy** (a mathematical field) → **cluster** (a self-contained
> apparatus built to produce one usable thing) → **node** (a single definition,
> theorem, lemma, proposition, corollary or axiom).
>
> | edge on the canvas | meaning |
> |---|---|
> | **black arrow** | implication — sources are the hypotheses, the arrow points at what they yield |
> | **black line** | equivalence — click it to see both directions of the proof |
> | **blue translucent line** | definition reference — the statement of one node uses this definition |
> | **purple dashed line** | analogy (a *weak* edge; hidden until you turn on Explore) |
> | **pink arrow** | *derived* implication (`layer: false`) — valid, but not part of the built-up order, so it does not take part in layering |
>
> ### For AI agents
>
> **Do not fetch `graph.json` in one go** (it is ~3.7 MB). Follow the retrieval
> protocol in [`llms.txt`](llms.txt): `dist/alias.md` (plain words / English names → node id)
> → `dist/index.md` (galaxies → clusters) → `dist/index/<cluster>.md` (node list)
> → `dist/nodes/<node-id>.md` (statement + in/out edges). Each file is cut to fit one
> fetch (~1300 B); overflow continues in `<path>.2.md`, and the first page is always `<path>.md`.
> Node ids are stable — they are the citation contract.
>
> **Licence:** graph content **CC BY 4.0** (SPDX `CC-BY-4.0`) — attribution only;
> copying, mirroring, renaming and commercial reuse are all allowed. Code: MIT.
> Citing is a request, not a condition: please name the node `id` and the content
> version — `MathGalaxy node ⟨id⟩ (content v0.9.1)`. See [`LICENSE`](LICENSE);
> full legal code in [`LICENSE-CC-BY-4.0.txt`](LICENSE-CC-BY-4.0.txt).
>
> *Chinese original follows below.*

一张**可缩放、可检索**的数学知识图谱：每个数学概念是一颗星，定理之间的推导是连线。

> ### 🔭 在线看图 → <https://bingyingzizz.github.io/mathgalaxy/>
> 双击 `index.html` 也能用 —— 零依赖、无构建、不联网。

**13 个星系 / 77 个星团 / 一千二百多个节点**，三层尺度：
数学领域（星系）→ 一套自足的装置（星团）→ 单条结果（节点）。**内容还在长。**

每个节点 = 一条数学内容（公理 / 定义 / 定理 / 引理 / 命题 / 推论）。

| 图上的线 | 是什么 |
|---|---|
| **黑色箭头** | 推出 —— 箭头指向被推出的结论；多个前提先汇聚再射向结论 |
| **黑色直线** | 等价命题（点它可以看到两个方向的证明） |
| **蓝色半透明线** | 定义引用 —— 某条结论的陈述里用到了这个定义 |
| **紫色虚线** | 跨领域**类比**（弱边，默认不显示，点右上角「探索」才出来） |
| **粉红箭头** | **推论**（`implication` 带 `layer: false`）—— 逻辑上真推得通，但不是「由前面得来」，所以**不参与分层** |

每个板块在背景里有一团彩色「电子云」，越靠边界越淡；
同时属于两个板块的节点会自动落在两者的**交界处**。

## 能做什么

| | |
|---|---|
| **查** | 左上角搜索：名称 / 英文名 / **别名** / id / 标签 / 正文 / 板块名 |
| **走** | 点节点看陈述与说明；**正文里提到的概念直接可点**（有边相连的是实线，只是提到的画点线） |
| **读** | 面板会算「还差 N 条前置」；读完点「✓ 标记已读」，图上绕一圈**会动的绿环** |
| **切** | 图例里开关任意板块 / 星团 / 类别；「分层」滑杆只显示前 k 层 |
| **导** | 当前视野导出 **SVG** / **TikZ**（给论文用）/ **子图 JSON**（给程序用） |
| **分** | 地址栏里装的就是你看到的这一屏，整条可以复制给别人 |

## 给 AI 读

| 产物 | 用途 |
|---|---|
| `dist/graph.json` | 全量机器可读；每条边带 `strength`（强 / 弱）与完整证明 |
| `dist/graph.md` | 同一份内容的 Markdown，直接粘进任何对话窗口就能用 |
| `llms.txt` | 遵循 [llms.txt](https://llmstxt.org/) 约定：先读目录 → 再读星团清单 → 最后读单条节点 |
| `dist/nodes/*.md` · `dist/proofs/*.md` | 按需检索的小块（每块 ≤ 1300 B，适合一次抓取） |
| `dist/notation.md` · `dist/policy.md` | 记号对照表 · 内容准则 |

每个概念另外还有一份**独立的 HTML 单页**（`…/nodes/<id>.html`）：公式是**静态 MathML**，
不跑 JS 也能读，搜索引擎也抓得到。

## 工程

**零依赖纯静态**：经典 `<script>` + `window.MG`，没有 ES module、没有打包器、没有 npm 依赖。
双击 `index.html` 就能跑 —— 这是刻意的选择，不是技术债。

- `src/core/` = **引擎**（只管怎么画）· `src/data/` = **内容**（只管有什么）—— 两边不许越界
- `index.html` 是源文件；`bun tools/build.mjs` 把它打成自包含的 `dist/mathgalaxy.html`
- `tools/` 里还有：概念页生成器 · 站点组装与发布 · IndexNow 提交 ·
  一组**内容体检**（KaTeX 逐条渲染公式、记号规范、证明缺口、依赖深度、硬断言）

---

## 操作

| 操作 | 效果 |
|---|---|
| 拖拽空白处 | 平移星图 |
| 鼠标滚轮 / 双指捏合 | 放大缩小（以光标/手指中点为锚点） |
| 点击节点 | 只显示该节点与它的邻居，右侧弹出陈述与说明 |
| 再次点击同一节点 / 点击空白处 | 取消聚焦，回到全图 |
| 点击连线 | 右侧显示推导过程（等价线会给出两个方向的证明） |
| 左上角搜索框 | 搜名称 / 英文名 / id / 标签 / 正文 / 板块名 |
| `+` `-` | 放大 / 缩小 |
| `0` | 适配全部 |
| 方向键 | 平移 |
| `/` | 跳到搜索框 |
| `Esc` | 关闭面板 / 取消聚焦 |

**深链**（可以直接分享某一处）：

```
index.html#n=lem.zorn      聚焦到「佐恩引理」这个节点
index.html#e=eq.ac-wo      打开「选择公理 ⟺ 良序定理」这条等价线的推导
index.html#r=set-theory    把镜头拉到「集合论」这个板块
```

节点 id、连线 id 都能在右侧详情面板的标题下方看到。

右上角工具条可以开关「定义引用蓝线」「节点名称」，还可以把滚轮切成平移（触控板更顺手）。
左下角图例里点板块名可以直接飞到那个板块。

---

## 三层尺度：星系 → 星团 → 恒星

星图不是一张平铺的图，而是**三层嵌套**的，随缩放逐层交接（像地图从「省」放大到「街道」）：

| 层 | 是什么 | 什么时候出现 |
|---|---|---|
| **星系**（region） | 一个数学领域，如「集合论」「序理论」 | 缩到最小时**只有它**：一团云 + 名字 |
| **星团**（cluster） | 星系里**一套自足的装置** | 放大一点出现名字 + 更密的云 |
| **恒星**（node） | 单条定理 / 定义 / 引理 | 再放大才显示名称和连线 |

**线条也分尺度**：缩小时画的是**星团对星团的粗线**（整块连接），
放大后它淡出、节点级细线（箭头 / 等价线 / 定义线）淡入。两条曲线交叉，不会突然跳变。

### 星团怎么分？（分类哲学）

> **星团 = 为了造出某个「能用的东西」而存在的一整套结果。**
> 它内部关系再密也无所谓 —— 那是它的私事。
> 例：测度论整套构造只为了做出 Lebesgue 积分；局部化整套只为了做出 `W⁻¹C`。

判据（满足两条以上就是独立星团）：

1. 有一条清晰的**主线** —— 从基础概念推到一个标志性结果；
2. 内部几乎不和外面打交道，**对外只需要一两个入口**；
3. 你能用一句话说清它**造出了什么**。

**星团是「对外连接的单位」**：跨星团的连线由引擎自动把节点级连线聚合成粗线，
你不需要、也不应该去逐点连。如果确实要声明一条星团级关系，写在 `pack.clusterLinks` 里：

```js
clusterLinks: [
  { a: 'set.choice', b: 'order.maximal', label: '选择原理', weight: 6,
    note: '「从无穷族里同时挑元素」这件事，在序理论里的等价形态就是极大原理。' }
]
```

### 怎么用

- **加星团**：在 `src/data/clusters.js` 里追加一条，然后在节点的 `cluster` 字段写上它的 id
- **不加星团也行**：节点不写 `cluster` 就直属于星系，布局会自动把它放在星系圆盘里
- **深链**：`index.html#c=set.zfc` 直接飞到「ZFC 公理系统」这个星团
- **调手感**：`config.js` 里的 `lod.*` 是各层的淡入淡出区间，`cluster.*` 和 `clusterLink.*` 管大小浓淡

> ⚠️ `lod` 的阈值要和「适配全部」时的实际缩放对上。1600×900 下 content 铺满大约是 `k ≈ 0.62`，
> 所以 `nodeNameIn` 必须在那之前就基本到 1，否则默认视图上节点名是灰的。

---

## 目录结构

```
index.html                     页面骨架 + 脚本装配（只做加载，不含逻辑）
src/
  ui/styles.css                浮动 UI 的样式（搜索框 / 工具条 / 图例 / 面板）
  core/                        ← 底层引擎：与数学内容无关，一般不用改
    config.js                  所有可调参数与配色（想换颜色只改这里）
    util.js                    工具函数、Markdown 渲染
    camera.js                  相机（缩放 / 平移 / 坐标变换 / 动画）
    graph.js                   图模型：合并内容包、建索引、校验
    layout.js                  布局求解：板块聚簇 + 交界节点 + 力导向松弛
    background.js              电子云背景渲染
    renderer.js                前景渲染：节点 / 各类连线 / 名称 / 命中检测
    interaction.js             指针、滚轮、双指缩放、点击
    search.js                  搜索
    panel.js                   详情面板
    loader.js                  外部内容包加载（给 GitHub 同步 / PDF 导入预留）
    app.js                     把上面这些装配起来
  data/                        ← 内容层：加数学内容只动这里
    regions.js                 星系（名称、颜色、中心、半径）
    clusters.js                星团（星系内部「一套自足的装置」）
    packs/
      01-zfc-axioms.js         ZFC 九条公理
      02-set-theory.js         集合论基本定义与定理
      03-order-theory.js       序理论基本定义
      04-choice-equivalents.js 选择公理 / 良序定理 / 佐恩引理 / Hausdorff / Tukey
      05-algebra-example.js    代数示例（可整包删掉）
      90-definition-links.js   所有「定义引用」蓝线
```

**引擎与内容完全分离**：`src/core/` 一行数学都没有，`src/data/` 一行渲染代码都没有。

---

## 怎么加内容

### 0. ⭐⭐ 内容准则：从根长出来、不重复、只收最通用的版本

> 本星图的内容来自**多门课程**的笔记，同一个定理常常在几门课里各出现一次，
> 写法、记号、条件强弱、证明路线都不一样。录入时按下面四条来。

**① 每一层都从上一层「造」出来，不许悬空。**
每一层的对象必须由**已经有的东西**构造出来（子集、幂集、笛卡尔积、商集、函数空间……），
用到的每个概念都要在**更低的层**里有节点。

- ⛔ **不许**用「满足某组性质的对象（在同构意义下唯一）」来引入新东西 —— 那是**公理刻画**，
  它悄悄假设了「这样的对象存在」，等于凭空的根。
- ⛔ **性质是定理，不是定义。** 造出来之后，再把性质作为**定理**（带证明的边）挂上去。
- 判据：**这句话是在定义一个新对象，还是在陈述一个已有对象的性质？** 后者不该写成定义。
- 例：$\mathbb{R}$ 不是「完备有序域」这种**被假定存在**的东西，而是
  「有理 Cauchy 列按『差为零列』取商集」**造**出来的；域公理、序公理、确界原理
  是造完之后证明的**定理**。（另一条构造路 —— 戴德金分割 —— 造出来的对象与之同构，
  这条「唯一性」是**构造之间的一致性**，不是 $\mathbb{R}$ 的存在性依据。）
- 📌 **以后写范畴论的极限 / 余极限时要照此办理**：泛性质（universal property）是
  **特征刻画**，定义完之后必须把**构造**写出来 —— 例如 $\mathbf{Set}$ 完备且余完备：
  极限 = 满足相容条件的元素族，余极限 = 无交并模去等价关系。两条都要有。

**② 同一个结论只录一次。**
几门课讲了同一个定理 → **合成一个节点**，各版本的记号差异写进 `notes`。
判据：**如果 A 能一句话说成 B（或 B 的一个特例），它们就不该是两个节点。**

**③ 只保留最通用的版本。**
同一个结论有强弱不同的形式时，收**条件最弱、结论最强**的那一个；
特例写进 `notes`。只有当特例自己**有独立用途**（后面有别的结论专门用它）时，
才单独立一条 `corollary` / `proposition`。

**④ 优先收录推广程度高的办法。**
同一个结论有多种证法或多种表述时，留住**能推广的那条**——
例如既能用逐项估计硬算、也能用单调类定理 / 抽象工具一次拿下，就收后者。
（本图里「定义 → 定义」的依赖边也是按这个原则连的：只连最直接的那一步。）

**举例（Nakayama 引理）**：几门课可能各给一个版本——「有限生成模 + 理想在 Jacobson 根里」、
「局部环 + 有限生成模」、甚至只对局部环的极大理想说事。这些**是同一个定理的不同特例**，
所以只收**最通用的一条**（理想含于 Jacobson 根的那版），把「局部环」等特例写进 `notes`。

**举例（同一个概念的多种定义）**：紧性有「开覆盖」「有限交性质」「序列紧」等说法，
在一般拓扑空间里只有前两个等价、而序列紧更强。这时收**最通用的那个定义**
（开覆盖），把等价刻画写成单独的定理节点（如「紧的三个等价刻画」），
而不是同一个概念铺三个定义节点。

### 0.5 ⭐⭐ 记号：严格照《记号对照表》写

> 图的内容来自**多个来源**，同一件事的记号常常不一样（包含 vs 真包含、补集上划线 vs
> 上标 c、$\varphi$ vs $\phi$……）。**混用会让「快速查阅」这件事直接失效** ——
> 看见一个记号还得猜它在这个节点里是什么意思。

**真源：`src/data/notation.js`　·　给人读的：`notation.md`（构建产物）　·　给 AI 读的：`dist/notation.md` + `dist/notation/*.md`**

- **一个符号全图一个意思；同一星团内不得有歧义。**
  跨星团同名不同义**允许**（星系本来就是分开的），但**必须在表里登记**。
- **新笔记进来先过记号表**：不合规的**先转写**，再进 `src/data/packs/`。

**三条铁律（用户拍板）**：

| 概念 | 怎么写 | ⛔ 不许写成 |
|---|---|---|
| **补集** | $A^{c}$（上标 c） | $\bar{A}$、$\overline{A}$、$A'$、$\complement A$ |
| **包含** | $\subseteq$（**有**下横） | 用 $\subset$ 表「包含」 |
| **真包含** | $\subset$（**没有**下横） | $\subsetneq$ |

**自动把关（两件都要跑）**：

```bash
bun tools/build.mjs          # 正文出现裸 Unicode 数学符号 / 禁用写法 → 构建直接失败
bun tools/_notationcheck.mjs # 详细报告：按节点与字段列出，另加启发式警告 + 「用到了却没规则」
```

⚠ 已知老账记在 `notation.md` 的「已知老账」一节（`title` 里的裸 Unicode 数学记号；
正文里把 `$$…$$` 当行内公式用）—— **别假装它们是零**。

### 1. 加一个节点

在 `src/data/packs/` 里任意一个包（或新建一个 `.js` 文件，并在 `index.html` 里加一行 `<script>`）中写：

```js
(window.MG.packs = window.MG.packs || []).push({
  name: '我的笔记',
  nodes: [
    {
      id: 'thm.my-theorem',          // 全局唯一，建议 <类型前缀>.<名字>
      type: 'theorem',               // axiom | definition | theorem | lemma
                                     // proposition | corollary | example
      label: '我的定理',              // 星图上节点下面显示的文字，越短越好
      title: '我的定理（全称）',       // 面板标题
      regions: ['set-theory'],        // 所属板块，可写多个 → 节点会落在板块交界处
      tags: ['关键词'],               // 参与搜索
      statement: '## 陈述\n\n这里写命题陈述，支持 Markdown。',
      notes: '## 说明\n\n这里写备注、直觉、反例。',
      refs: ['某书 第 3 章']
    }
  ],
  edges: []
});
```

正文支持极简 Markdown：`##` 标题、`-` 列表、`1.` 有序列表、`>` 引用、`**粗体**`、`*斜体*`、`` `代码` ``、` ```代码块``` `，
以及 `$$ … $$` 独立公式块。

⭐ **数学一律用 LaTeX 写**（KaTeX 已接入）：公式用 `$…$` / `$$…$$`，**正文里的数学记号也写成 `$…$`**
（写 `$\sigma$-环`、`$\ne$`，不写 `σ-环`、`≠`）。例外只有两个：
`label` / `tags` / `refs` 是纯文本，**绝不能含 `$`**；`label` 还画在画布上，可以留 Unicode（`L⁺`、`实数系 ℝ`）。

### 2. 加一条连线

四种连线对应四种 `kind`（外加一种「推论」标记，见下）：

```js
// ① 推出（箭头）：sources 可以是 1 个或多个
{ kind: 'implication',
  sources: ['ax.choice'],           // 多个前提就写 ['a', 'b', 'c']
  target: 'thm.wellordering',
  title: '选择公理 ⇒ 良序定理',
  proof: '设 X 是集合……∎',
  note: '可选备注' }

// ② 等价（黑线）：点它可以看到两个方向的证明
{ kind: 'equivalence',
  a: 'lem.zorn', b: 'thm.hausdorff',
  proofs: [
    { label: '佐恩引理 ⇒ Hausdorff 极大原理', text: '……' },
    { label: 'Hausdorff 极大原理 ⇒ 佐恩引理', text: '……' }
  ] }

// ③ 定义引用（蓝线）：definition 的陈述/构造出现在了 usedBy 里
{ kind: 'definition',
  definition: 'def.chain', usedBy: 'lem.zorn',
  note: '「P 的每个链都有上界」是佐恩引理的核心条件。' }

// ④ 类比（紫色虚线，弱边）：思想相通，没有逻辑蕴含
{ kind: 'analogy',
  a: 'thm.product', b: 'thm.omega',
  note: '同一个证明模板：幂集造容器 + 分离筛内容。' }
```

**另有一种「推论」**（粉红箭头）：`kind` 仍是 `implication`，只多写一个 `layer: false`。
它的意思是「**逻辑上确实推得通，但不是由前面得来**」—— 典型是用高级工具回头证低级定理。
所以它**不参与分层**（不抬高目标的层号），也不进「只看主干」视图：

```js
{ kind: 'implication', layer: false,
  sources: ['thm.residue'], target: 'thm.cauchy-integral-formula',
  title: '用留数定理重证 Cauchy 积分公式',
  proof: '……∎' }
```

⛔ 判据只有一条：**推得通**。不用操心循环论证 —— 黑边已经保证骨架无环。

小提示：如果 A、B 之间已经有「等价」黑线，默认不会再叠画 A↔B 的箭头（太挤）。
被隐藏箭头上的推导会自动合并进那条等价线的详情里。想改这个行为，见
`config.js` 里的 `hideParallelImplications`。

### 3. 加一个数学板块

在 `src/data/regions.js` 里加一项：

```js
{ id: 'number-theory', name: '数论', en: 'Number Theory',
  color: '#C8553D',                  // 背景电子云的颜色
  center: { x: 200, y: 900 },        // 星图上的方位（世界坐标）
  radius: 500,                       // 板块半径：影响交界点计算
  desc: '素数、同余、解析数论。' }
```

板块里暂时没有节点时不会画云；一旦有节点引用了这个 `id`，云就会出现，
并且会自动按节点的实际分布调整大小。板块中心之间拉开一点距离，云才不会挤在一起。

### 4. 调外观

全部集中在 `src/core/config.js`：

| 想改什么 | 改哪里 |
|---|---|
| 节点颜色（定义灰 / 定理绿 / 引理橙…） | `MG.theme.nodeTypes` |
| 连线颜色、粗细 | `MG.theme.edgeStyles` |
| 电子云浓淡、大小、形状 | `MG.config.background` |
| 节点大小、名称字号、什么时候隐藏名称 | `MG.config.node` |
| 布局疏密、板块聚拢程度 | `MG.config.layout` |
| 云的大小 / 「适配全部」缩放下限 | `MG.config.background.cloudMargin`、`MG.config.camera.fitMinZoom` |
| 聚焦时其他节点的暗度 | `MG.config.focus`（`hideUnrelated: true` 可改成彻底不画） |

---

## 在手机上看（Android / iOS）

### 方案 A：单个 HTML 文件（推荐，零依赖）

```bash
bun tools/build.mjs            # 产出 dist/mathgalaxy.html（约 4.8 MB，自包含）
```

这个文件**把所有 CSS / JS / 数据全内联进去了**，是真正自包含的。
拷到手机（微信传给自己 / 网盘 / 数据线），用浏览器打开即可：

| 平台 | 怎么开 |
|---|---|
| **Android** | 文件管理器 → 找到 `mathgalaxy.html` → 「用浏览器打开」。或者丢进 Chrome 直接输 `file:///sdcard/Download/mathgalaxy.html` |
| **iOS** | 存到「文件」App → 点一下 → 用 Safari 打开。或者存进「快捷指令」做成一键入口 |

**优点**：不需要服务器、不需要网络、不需要代理。地铁上也能看。
**缺点**：是快照，电脑上改了内容要重新 build 再传一次。

### 方案 B：GitHub Pages（有网址，手机随时刷）

实测 **`*.github.io` 国内直连可用**（不用挂代理），所以这是最舒服的方案。

⚠️ 但有个限制：**GitHub Pages 在 Free 账号下只能从 public 仓库发布**。
私有仓库要发 Pages 得是 Pro。所以两条路：

1. **把 `MathGalaxy` 改成 public**，Settings → Pages → Source 选 `main` / `root`
   → 网址 `https://bingyingzizz.github.io/MathGalaxy/`
2. **源码保持私有，另开一个 public 的「发布仓库」**（推荐）：
   只把 `dist/` 里的产物推过去。源码和笔记不进公开仓库。

```bash
# 发布仓库的做法（示例）
cd /d H:\MathGalaxy
git subtree push --prefix dist publishing main     # 或者单独建个 repo，只拷 dist 过去
```

> 顺带一提，`raw.githubusercontent.com` 实测**国内直连不通**，
> 所以别指望让手机上的 AI 直接抓 GitHub 上的文件——见下面第 3 节。

### 方案 C：局域网（临时看一眼）

电脑上跑个静态服务器，手机连同一个 WiFi：

```bash
cd /d H:\MathGalaxy
C:\Users\MSI\.cherrystudio\bin\uv.exe run --with httpie python -m http.server 8000
# 或 H:\anaconda\python.exe -m http.server 8000
```

手机浏览器开 `http://<电脑局域网IP>:8000`（本机是 `10.172.115.122`）。

---

## 在别的设备上「添加内容」

先说结论：**手机上「看」很容易，「写」不现实**——内容是一堆 JS 对象，
在手机输入法里写 `{ id: 'thm.xxx', ... }` 是折磨。

推荐的工作流：

| 场景 | 做法 |
|---|---|
| **主力** | 电脑上写 → `git push` → 需要时 `bun tools/build.mjs --html` 重新生成单文件传到手机 |
| **手机上改一两个错字** | GitHub 网页版/App 直接改 `src/data/packs/*.js`，改完 commit（手机能开 github.com 的话） |
| **手机上记零散想法** | 先记在备忘录，回头批量整理进内容包 |

真要做得更顺，可以后面加一个「本地编辑模式」（页面里直接改节点、导出 patch），
但现在**没必要**——内容维护本来就该在电脑上做。

---

## 给 AI 用：把星图当数据库

```bash
bun tools/build.mjs            # 产出全部
```

| 产物 | 用途 |
|---|---|
| **`dist/graph.json`** | 完整机器可读导出。AI 解析这个最准 |
| **`dist/graph.md`** | 同一份内容的 Markdown，**直接粘给任何 AI 聊天窗口就能用** |
| **`llms.txt`**（仓库根 + `dist/`） | 遵循 [llms.txt](https://llmstxt.org/) 约定，AI 工具会自动找这个文件 |
| `dist/mathgalaxy.html` | 人看的可视化页面 |

**日常最省事的用法**：把 `dist/graph.md` 整个拖进对话，然后问
「良序定理依赖哪些结论？」「把佐恩引理的证明展开」——它就是一份自带全部证明的数学笔记。

JSON 里每条边都带 `strength` 和 `proof`，节点带稳定的 `id`，
所以 AI 可以做**精确的图检索**，而不是靠语义猜。

---

## ⭐ 强弱边：给 AI 的两种检索模式

> 这个想法来自另一位 AI 的建议，我认为是对的，而且和三层尺度天然吻合。

**问题**：如果所有连线平权，检索时信噪比会很差——
「用类比触发的联想」和「严格的逻辑推出」混在一起，AI 分不清哪个能当依据。

**解法**：给每条边一个 `strength`。

| strength | kind | 含义 | AI 什么时候用 |
|---|---|---|---|
| **strong** | `implication` | A ⟹ B，带证明 | 查证明、做推理 —— **日常只走这些** |
| **strong** | `equivalence` | A ⟺ B，带双向证明 | 换等价形式 |
| **strong** | `definition` | 某结论用到了某定义 | 梳理概念依赖 |
| **weak** | `analogy` | 思想相通 / 证明技巧相同 | **只在卡住时**找远房灵感 |

**两种模式**：

- **常规模式**：只走 strong 边。信噪比高，答案可靠。
- **探索模式**：允许走 weak 边。网页右上角有「探索」按钮，打开后虚线（紫色）出现。

**关键是 AI 侧要明说边界**：走弱边得到的结果，回报时必须标注
「以下是联想线索，不是逻辑结论」。`llms.txt` 里我把这条写成了硬要求。

**怎么加一条弱边**（`src/data/packs/91-analogies.js`），判据三条缺一不可：

1. 两者之间**没有**推出 / 等价 / 定义依赖（有的话就写成强边）；
2. 相通之处**说得出具体是什么**（不是「都很难」这种废话）；
3. 这个类比**能帮你解决问题** —— 看到一个，能想起另一个的招。

现有的 9 条弱边（挑几条当范例读）：

- `thm.product` ～ `thm.omega`：同一个证明模板「幂集造容器 + 分离筛内容」
- `def.finchar` ～ `def.wellorder`：两种「用有限/最小的东西控制无穷」的手法
- `ax.sep` ～ `def.finchar`：「不描述整体，只给一个筛子」
- `def.finchar` ～ `def.vs`：抽象工具与它在向量空间里的具体实例（**跨星团**）

---

## 版本管理 / 多端同步

这个文件夹**已经是一个 Git 仓库**了（分支 `main`，已完成首次提交），
`.gitignore` 只让 Git 管源文件和数学内容，调试截图、编辑器垃圾一律不入库。

内容全部是纯文本 `.js` / `.json`，天然适合 Git。

### 网络：本机已配好代理

本机 **127.0.0.1:7890** 上跑着代理（番茄V2航线），走它可以正常访问 GitHub。
已经配好了一条**只对 github.com 生效**的规则，**全局 + 本仓库各写了一份**：

```bash
git config --global http.https://github.com/.proxy http://127.0.0.1:7890   # 已配
git config --local  http.https://github.com/.proxy http://127.0.0.1:7890   # 已配（双保险）
```

为什么必须写全局：**新设备上第一次 `git clone` 时还没有仓库级配置**，
不写全局就会卡在「连不上」的死循环里（这个坑实测踩过）。

> ⚠️ 换新设备时，第一件事就是在新机器上执行上面那条 `--global`
> （把 7890 换成那台机器上的代理端口）。

> **重要**：git 用的 libcurl **不读 Windows 的「系统代理」设置**。
> 即使浏览器已经能打开 github.com（系统代理 / TUN 模式生效），
> `git` 的直连仍然会超时 —— 实测直连 `ls-remote` 21 秒后失败，走代理 2 秒成功。
> 所以**必须先启动代理，再 push / pull**；这条仓库级配置就是为此存在的。

实测结论（2026-09）：`git ls-remote` 走代理 ✅ 2 秒；推送通道 ✅ 能连上 GitHub，
只差账号认证（`fatal: could not read Username`）。

### 远端仓库：已连上 ✅

```
https://github.com/bingyingzizz/MathGalaxy     （public 🌐）
origin  https://github.com/bingyingzizz/MathGalaxy.git
main    → 跟踪 origin/main
```

公开页面的站点仓库是 `bingyingzizz.github.io`（`tools/publish.mjs` 推的那一个），
它由本仓库的构建产物组装而成，**不要手改**。

认证走的是 **Git 自带的凭据管理器（GCM）**，账号已登录并记住，
`git push` / `git pull` 不用再输任何东西。
查看当前账号：`git credential-manager github list`

### 日常操作（已经是全部了）

```bash
cd /d H:\MathGalaxy

git pull                                  # 先拉一下（多端时很重要）
# ……改 src/data/ 里的内容，或者改引擎……
# ⛔ 别用 git add -A（会把别的 agent 正在写的文件、临时产物一起扫进来）
git add src/data/packs/03-order-theory.js   # 只加自己改的那几条路径
git commit -F msg.txt -- src/data/packs/03-order-theory.js
git push
```

> ⚠️ **记得先启动代理**（127.0.0.1:7890）。git 不读 Windows 系统代理，
> 代理没开时 push/pull 会超时。

### 多端使用

```bash
# 新设备上第一次
git clone https://github.com/bingyingzizz/MathGalaxy.git MathGalaxy
# 之后
git pull          # 拉别的设备上做的改动
git add <你改的那几个路径> && git commit -F msg.txt && git push
```

新设备上第一次 push 会弹一次浏览器让你登录 GitHub（GCM 自动处理），之后同样记住。

星图是纯静态页面，clone 下来**双击 `index.html` 就能看**，不需要安装任何东西。
在任意一端改了 `src/data/` 里的节点，另一端 `git pull` 刷新页面就同步了。

### 如果以后要换认证方式

**SSH（长期最省事）**：本机 `ssh.github.com:443` 是通的，建议让 SSH 走 443：

```bash
ssh-keygen -t ed25519 -C "your@email"
# 把 ~/.ssh/id_ed25519.pub 贴到 GitHub → Settings → SSH keys
# 再写入 ~/.ssh/config：
#   Host github.com
#     HostName ssh.github.com
#     Port 443
#     User git

git remote set-url origin git@github.com:bingyingzizz/MathGalaxy.git
```

**GitHub CLI**：`gh` 目前没装（mise 下载时没走代理会失败）。
需要的话可以在 Cherry 里让我用 `cli_install` 装，或自己 `winget install GitHub.cli`。

星图是纯静态页面，clone 下来**双击 `index.html` 就能看**，不需要安装任何东西。
在任意一端改了 `src/data/` 里的节点，另一端 `git pull` 刷新页面就同步了。

### 个人笔记和内置内容分开

想让「我自己的笔记」和「内置内容」分开、甚至不进公开仓库，用外部内容包机制：
在 `src/data/external/` 放 `index.json` 与若干 `*.json`（结构与 `packs` 完全一致），
页面启动时会自动并入。用本地服务器打开即可生效：

```bash
python -m http.server 8000     # 然后访问 http://localhost:8000
```

（`file://` 直接打开时浏览器禁止 fetch，这时会静默跳过外部包，不影响内置内容。）
私人笔记建议放 `src/data/local/`，那个目录已经在 `.gitignore` 里了。

### PDF 笔记导入

数据格式已经为此设计好了：

1. 用现成的文档转换工具把 PDF 转成 Markdown；
2. 让 AI 把 Markdown 拆成 `nodes` + `edges`（每条内容给一个稳定的 `id`，双链转成 `implication` / `equivalence` / `definition`）；
3. 存成 `src/data/external/<论文名>.json` 并加进 `index.json`；
4. 刷新页面即可在星图上看到新节点——它们会自动落到对应板块、并和已有节点连起来。

`MG.loader.validatePack()` 会在并入前做结构校验，格式不对只会在控制台报警告，不会白屏。

---

## 目前内置的内容

**13 个星系 · 77 个星团 · 一千二百多个节点**（同时属于两个星系的节点会在两边各计一次）。
**这只是现在的样子 —— 内容还在长，所以这里不写死具体数字**（权威数字以 `llms.txt` / `dist/graph.json` 的 `meta.counts` 为准）。

| 星系 | 大致是从哪到哪 |
|---|---|
| 数理逻辑 | 一阶语言、公式、代入、满足关系 |
| 集合论 | ZFC 九条公理 → 空集 / 无序对 / 并 / 幂集 / ω / 笛卡尔积 → 关系与函数、商集、序数、基数，直到实数系 ℝ 的构造 |
| 序理论 | 偏序集、链、界与确界、良序集、有限特征 |
| 拓扑学 | 拓扑空间与开集 → 连续、同胚、子空间 / 商 / 积 → Hausdorff、紧、连通、正规 → 紧生成空间、局部紧 → 仿紧、可度量化 |
| 抽象代数 | 向量空间与基、域与有序域、环与理想、模 |
| 数学分析 | 极限与级数、连续性、微分、Riemann 积分；实数列与实数运算 |
| 实变函数 | 测度的构造 → 可测函数 → 积分 → $L^{p}$ → 符号测度与 RN 导数 → 微分与有界变差 |
| 范畴论 | 图与范畴 → 函子与自然变换 → 极限与余极限 → 米田引理 / 伴随 → 拓扑斯与层 |
| 同调代数 | 加法 / 阿贝尔范畴 → 复形与同伦 → 导出范畴 → 谱序列 → 层上同调 → 模论与分解 |
| 凝聚态数学 | 紧 Hausdorff 与 Stone 空间 → 拓扑斯上的层 → 凝聚态集 / 阿贝尔群 → 固态群、解析环 → Ext 与 RHom |
| 解析空间 | adic 空间（Huber pair、adic 谱、结构层）→ 六函子形式 → 相干对偶 |
| 复变函数 | 全纯与 Cauchy–Riemann → 围道积分 → Cauchy 理论 → 级数与奇点 → 留数 → 辐角原理 / Rouché |
| 微分几何 | 曲线曲面（标架、Gauss–Bonnet）→ 流形、切丛、微分形式 → de Rham 上同调 → Lie 群 |

主线之一是**选择原理的等价链**：
`选择公理 ⟺ 良序定理 ⟺ 佐恩引理 ⟺ Hausdorff 极大原理 ⟺ Tukey 引理`，
每条等价线里都有两个方向的完整证明。

**怎么读这张图**：站点的 <https://bingyingzizz.github.io/read.html#reading>（读图指南）、
仓库根的 `notation.md`（记号对照表）、`policy.md`（内容准则）、`alias.md`（别名与常见问法）。

---

## 许可与引用

| 部分 | 许可 | 说明 |
|---|---|---|
| **图的内容**（节点、边、证明、笔记，以及 `graph.json` / `graph.md` / `nodes/*` 等产物） | **CC BY 4.0**（SPDX `CC-BY-4.0`） | 署名即可：**可以**整份转载、**镜像**、改名再分发、并进别的知识库 / 语料库、商用、抓取进 AI 管线 |
| **代码**（`src/` `tools/` `site/`） | **MIT** | 标准 MIT |

- 条款与引用格式：[`LICENSE`](LICENSE)（中文 + English citation guide + 镜像影响表）
- CC BY 4.0 法律文本全文：[`LICENSE-CC-BY-4.0.txt`](LICENSE-CC-BY-4.0.txt)（逐字节来自 creativecommons.org）
- 许可官方地址：<https://creativecommons.org/licenses/by/4.0/>

⭐ **引用**是**请求**（不是许可条件，没有法律强制力，但强烈建议）：
写明**节点 id** 与**内容版本号**。

```
参见 MathGalaxy 节点 thm.cantor（内容 v0.9.1）。
MathGalaxy, node thm.cantor (content v0.9.1),
https://bingyingzizz.github.io/mathgalaxy/nodes/thm.cantor.html
```

为什么这么请求：节点 id 是读者唯一能追回原始陈述与完整证明的线索。
完整模板（夹注 / 脚注 / BibTeX / 数据集 / 引一条边）与「怎样算合格」见 [`LICENSE`](LICENSE) 第五节；
应用里每个节点面板也有「**引用此节点**」按钮，点一下直接复制引文。
