# 数学星图 · Math Galaxy

一个用来**放数学笔记、理思路、给人看也方便给 AI 读**的可交互星图。

- 每个节点 = 一条数学内容（公理 / 定义 / 定理 / 引理 / 命题 / 推论）
- **黑色箭头** = 推出（箭头指向被推出的结论；多个前提会先汇聚再射向结论）
- **黑色直线** = 等价命题
- **蓝色半透明线** = 某个结论的陈述里出现了某个定义
- 每个数学板块在背景里有一团彩色「电子云」，越靠边界越淡；页面大背景始终是白色
- 属于多个板块的节点会自动落在两个板块的**交界处**

直接用浏览器打开 `index.html` 即可（不需要装任何东西，不需要联网）。

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
    renderer.js                前景渲染：节点 / 三类连线 / 名称 / 命中检测
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
以及 `$$ … $$` 独立公式块。**公式建议直接用 Unicode 数学符号写**（`∀ ∃ ∈ ⊆ ⟺ ⟹ ⪯ ≺ ∅ ℕ ℝ ⋃ ∩ ×`），
这样离线打开也能正常显示，AI 读起来也毫无障碍。

> 想用 LaTeX？在 `index.html` 里引入 KaTeX 即可——`src/core/app.js` 里的 `hookKatex()` 会自动接管
> `$…$` 与 `$$…$$`，没引入时则原样显示，不会报错。

### 2. 加一条连线

三种连线对应三种 `kind`：

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
```

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
https://github.com/bingyingzizz/MathGalaxy     （private 🔒）
origin  https://github.com/bingyingzizz/MathGalaxy.git
main    → 跟踪 origin/main
```

认证走的是 **Git 自带的凭据管理器（GCM）**，账号已登录并记住，
`git push` / `git pull` 不用再输任何东西。
查看当前账号：`git credential-manager github list`

### 日常操作（已经是全部了）

```bash
cd /d H:\MathGalaxy

git pull                                  # 先拉一下（多端时很重要）
# ……改 src/data/ 里的内容，或者改引擎……
git add -A
git commit -m "补充：Banach 不动点定理"
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
git add -A && git commit -m "补充：xxx 定理" && git push
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

| 板块 | 内容 |
|---|---|
| 集合论 | ZFC 九条公理（外延 / 分离 / 配对 / 并集 / 幂集 / 无穷 / 替换 / 正则 / 选择）、空集存在、无自属集合、自然数集 ω、二元并、笛卡尔积、子集、有序对、关系与函数、选择函数 |
| 序理论 | 偏序集、链、上界与极大元、良序集、有限特征 |
| 交界 | 良序定理、佐恩引理（都同时属于集合论与序理论，因此落在两块边界上） |
| — | Hausdorff 极大原理、Tukey 引理 |
| 抽象代数 | 向量空间的基、每个向量空间有基（示范跨板块引用） |

等价链：`选择公理 ⟺ 良序定理 ⟺ 佐恩引理 ⟺ Hausdorff 极大原理 ⟺ Tukey 引理`，每条等价线里都有两个方向的完整证明。
