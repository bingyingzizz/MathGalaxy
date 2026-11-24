# 引擎 / UI 性能手册（原 AGENTS.md 第四节，原文迁入）

> **只加内容不需要读；动任何性能敏感的东西之前必须读**——不止 `src/core/`：渲染、布局/预计算、图算法与数据结构、缓存、交互处理、资源加载、性能关键的构建流程，以及任何「看起来只是样式」的东西。准入规则与前后实测要求见 `PERFORMANCE.md` §0.0。
> 配套：`PERFORMANCE.md`（性能总账：为什么这么设计、每一刀改了什么、实测多少）· `tools/perfguard.mjs`（42 条机器守卫，`bun tools/build.mjs` 末尾自动跑）。
> ⚠️ **4.2（云雾层）描述的是 ENG-009 之前的旧实现**（`texScale`/`smoothTexture`/`texBlur`）；现行云雾实现与成本见 `PERFORMANCE.md` §10.4。放大纹理要 dither 抹平的通用教训仍成立，但函数/旋钮名以现行代码为准。
> 原节号（4.0–4.6）保持不变——`perfguard` 报错里的「去看 4.x」指的就是本文件。
> 文中的 `H:\MathGalaxy` 等是迁移前机器的**历史路径**，现行仓库在 `B:\MathGalaxy`；全部数字都是当时本机实测。

## 四、改 UI / 引擎前必读：性能是怎么做到的

> 这一节是给**要动 `src/core/`** 的 agent 的。星图的渲染路径被反复调到「240 Hz 下不抖」，
> 很多约束**看不出必要**，删掉/改写法会立刻掉 3~10 倍。全部数字都是本机实测，不是估算。
>
> **本节 = 操作手册**（怎么写代码、改哪几处、验收四件套）。
> 📌 **要「总账」看 `PERFORMANCE.md`** —— 性能为什么这么设计、每一刀改了什么、
> 实测多少、已知瓶颈、**还欠什么（blit 滑动窗口）** 全在那一个文件里。

### 4.0 标尺（硬约束，别用别的口径）

- 屏幕 **240 Hz ⇒ 每帧预算 4.2 ms**。⛔ 不要用 16.7 ms 当「满帧」。
- 判据用 **p95**；但「**突然顿一下**」是 **max** 的问题（p50/p95 4.2/4.3 时用户照样能感觉到）。
- 最差档是**中段缩放 k≈0.62**，不是全图适配。
- 测性能一律 **headless + GPU**（`MG_GPU=1`，即不传 `--disable-gpu`），窗口 `2536x1348`
  （≈ 真机 2560×1440 的像素负荷）。
- ⚠️ 两个会让读数**作废**的环境问题，先排除再下结论：
  · headless 落到 **60Hz 档**（帧间隔恒 ≈17.9ms）—— 通常是系统里还有十几个浏览器进程在跑；
    这时**绝对帧时全部无效**，只能读结构指标（追赶 / 落洞 / 分配 / 出图率）。
  · headless 下 `getImageData` 对 **GPU canvas 会回读滞后** ⇒ 绝对墨量不能当证据。

### 4.1 静态层（线 / 点 / 箭头）由位图承担 —— `src/core/worldbitmap.js`

引擎只在**实时层**画标签 / hover / 光晕 / 星团包络；线、点、箭头烘进 DOM canvas，
拖动时只改 CSS transform（合成器搬图层）。改这条链路前先理解这六件事：

1. **单一快照 + 两代画布常显**。换代只换**元数据 + 裁剪**，
   ⛔ 绝不 `display:none ↔ ''`、绝不新建画布。实测「把画好的隐藏画布切成显示」= **整张 54~108ms**
   （合成器要整张重新光栅化上传）⇒ **双缓冲（烘进隐藏画布再换代）这条路是死的**。
2. **区域模式是横带切片烘焙**：一次一条横带，**一帧一条**，画完最后一条才换代。
   一次整张重烘 ≈ 画布像素 × 9ns（3312×2056 → 46~58ms 一根尖峰）；切带后
   p50/p95 **4.2/4.3 不变**、max **66.7 → 12~17ms**、>20ms 的帧 **12 → 0 根**。
   `bandPx` 默认 128 设备像素（`?band=` 可调）。带高必须整数、带与带不重叠 ——
   这样并集逐像素等于整张烘焙图。
3. **逐条带交接只能用 `clip-path: inset(...)`**（合成器级裁剪，不脏像素）。
   实测：一帧里 `clearRect` **两张显示中的大画布** ⇒ p95 4.3 → **29.6ms**、平均帧间隔 4.6 → 10ms。
   两条**互补**的裁剪 = 整屏 ⇒ 全程零 clear。
4. **带轮必须由它自己的 rAF 链驱动**（`chainStep`），⛔ 不要改回「由 app 的 tick 驱动」：
   app 只在 dirty 时画帧，拖动里几帧才来一次 ⇒ 每 tick 位移被放大成几十像素（39px/tick、51Hz）
   ⇒ 轮跑不过旧图余量 ⇒ 收尾必「追赶」（5~6 条带一次画完 = 33~70ms 单帧，等于没改）。
5. **烘焙几何一轮只建一次**（`renderer.ensureGeomBake`，单独一格缓存）。
   每条带的 JS **2.6ms → 0.45ms**；没这条 p95 会顶到 8.4ms（2 个时隙）。
6. **画布像素尺寸必须量化到粗格**（世界档 `WORLD_QUANT = 128`）。
   世界图尺寸 = 世界长 × k × dpr ⇒ k 动一点尺寸就变 ⇒ **每次重烘都重新分配几十 MB**
   （实测 3s 里 21~23 次）。量化向上取整、内容比例仍是精确的 k×dpr ⇒ 只多一圈透明边
   （在世界 bbox 之外，本来没内容）⇒ 观感零损失。实测分配 **21~23 → 4 次/3s**。
7. **每条带只能算/只画「落在自己带里的」内容**（`cullBox`，2026-11-09 补）。
   ⛔ 只加 `clip()` 而**不缩裁剪框**是不够的：canvas 的 clip 只在光栅阶段省事，
   每条带依旧把整张矩形里的 3200 条线跑一遍 JS + 光栅 ⇒ 16 条带 = 16 个整帧。
   正解：把裁剪框（`0..W / 0..H`）换成「带框」，让 `inView` / `edgeInView` / `segHitsView`
   全部按它筛（余量仍由 PAD_EDGE 负责，所以边界上的贝塞尔外凸不会丢）。
   实测（3312×2024 区域图、k=1.2、3202 条边）：单带 JS **2 → 0.77ms**（整张是 2.73）。
8. **每帧只能采样一次「拖动速度」**（`syncCam(cam, dpr, countSpeed)`）。
   ⛔ 别让 `tick` 和 `chainStep` 都 push：后者看到相机已同步 ⇒ push(0)
   ⇒ 滑窗变成 10,0,10,0… **平均值正好一半**（实测 speed 报 5 而真值 10）
   ⇒ `needPx` 只有一半 ⇒ 轮开得太晚 ⇒ 中途露洞 ⇒ 每轮一次 **212ms 同步全烘**。
   这个 bug 从 2026-10-14 就埋着，内容翻倍后才爆 —— **改性能参数前先验证测量本身没减半**。
9. **`bundleOffsets`（平行边让位）必须缓存**：它只与「可见边集合」有关、**与相机无关**，
   但它在 `buildGeometry()` 里 ⇒ 拖动时每帧对 3200 条边建字符串 key + 逐组 sort。
   用 `view.visible` 的**引用同一性**当 key 就够（它只在过滤变更时整体替换）。
10. **位图承担静态层时不要建连线几何**：`paintStatic` 根本不跑，几何只为 `hitTest`，
    而 `hitTest` 自己会 `ensureGeom()`。只有 **hover 甲支**要用 `geomCache`。
    实测 3202 条边全量重建 **3~4ms/帧** ⇒ 单这一项就吃光 240Hz 的预算。

另外三条判据，改动时容易破：

- **开轮要提前**：`slack < ((n-1)·speed + speedMax + n·slackFall)·1.35 + 20`（上限 0.8×margin）。
  speed/speedMax 用**最近 16 帧滑动窗口**量 —— ⛔ 别用一阶 EMA + 衰减（拖动是脉冲串，
  EMA 把均值高估成 2 倍多）。等到露洞才开 = 洞要挂 n 帧。
  ⚠️ **采样本身必须是对的**（见上面第 8 条）：speed 少一半，整个提前量全错。
- **轮跑到一半不换矩形**（目标那代是显示着的，换矩形会让已交出去的带跳位）。
- **只有真露洞**（旧图矩形都盖不住视口）才允许同步全烘 —— 洞比尖峰难看，这一刀故意留着。

⭐ **带高是「单帧成本」与「帧数」的交换**，判决项是**单帧**（用户感觉到的就是它）：
内容从 1391 条涨到 3202 条之后，同样带高的光栅成本翻了一倍多，
实测带高 **128 ⇒ p95 16.7ms（>20ms 的帧 25~35 根）、64 ⇒ p95 12.5ms（3~6 根）**，
所以默认改成 `bandPx: 64`。⛔ 别为了「少几帧」调大 —— 那是拿单帧换帧数。

#### 4.1.1 代码地图（改之前先认门）

引擎只分两半：**`worldbitmap.js` 决定「什么时候烘、烘哪一块」**，**`renderer.drawStatic()` 决定「怎么画进那张画布」**。
中间只有一个契约：`drawStatic(target, scale, rect, band, lodK)`。

| 在哪 | 函数 | 干什么 | 不许违反 |
|---|---|---|---|
| worldbitmap | `rectFor / worldRectFor` | 选矩形：世界档给整个世界，区域档给「视口⊕余量」 | 原点必须吸附到设备像素格 |
| worldbitmap | `worldKMax(dpr)` | 世界档上限 | ⛔ 必须和 `tooBig()` **同源** |
| worldbitmap | `sizeFor(r,k,dpr,mode)` | 画布像素尺寸 | 世界档量化到 `WORLD_QUANT`；区域档用 `min(dpr,2)` |
| worldbitmap | `runBake()` | **同步全烘**（首烘/换档/真露洞/手动） | 只在「洞比尖峰难看」时用 |
| worldbitmap | `startRound()` | 开一轮带轮：选目标代、清裁剪、定带高 | 目标代先「整张藏着」 |
| worldbitmap | `bandStep(rush)` | 画一条带 | `rush=true` 只给应急 |
| worldbitmap | `clearHandedOff(y0,h)` | 逐带交接 | ⛔ 只改 `clip-path`，绝不 `clearRect` |
| worldbitmap | `finishRound()` | 换代 | ⛔ 只换元数据+裁剪，不碰 `display` |
| worldbitmap | `chainStep()` | 带轮自己的 rAF 链 | ⛔ 不采样速度（`countSpeed=false`） |
| worldbitmap | `syncCam(cam,dpr,countSpeed)` | 记相机 + 量速度 | 一帧只允许 `tick` 传 `true` |
| worldbitmap | `tick(cam,dpr,key,opt)` | **唯一的触发判据** | `lowSlack` 必须排在 `stale` 前面 |
| renderer | `drawStatic(...)` | 把静态层画进目标画布 | 7 个模块级量必须 `try/finally` 复原 |
| renderer | `ensureGeomBake()` | 烘焙几何缓存 | 域键必须含 `band` |
| renderer | `inView / edgeInView / segHitsView` | 裁剪 | `inView` 认四个边界；另两个认 `x1/y0/y1`（左边恒为 0） |
| renderer | `draw()` | 实时层 | 位图模式且无 node-hover ⇒ 用 `EMPTY_GEOM` |
| renderer | `bundleOffsets()` | 平行边让位 | 按 `view.visible` 引用同一性缓存 |

#### 4.1.2 这次到底是怎么修的（五刀，可以照抄）

**刀 1：位图承担静态层时，不要建连线几何**（`renderer.draw()`）

```js
var needGeom = !staticHidden || (hoverFull && view.hover && view.hover.type === 'node');
var geoms;
if (needGeom) { geoms = ensureGeom(); }
else { geomCache = null; geoms = EMPTY_GEOM; }   // 别留陈旧几何给 hitTest / hover 误用
```

为什么能省：`paintStatic` 这时**根本不跑**，几何只服务 `hitTest`，而 `hitTest()` 自己第一行就是
`ensureGeom()`。唯一例外是 **hover 甲支**（入射边加宽）—— 它要读 `geomCache`，所以那个条件必须留。
实测：3202 条边全量重建 **3~4ms/帧**，单这一项就吃光 4.2ms 预算。

**刀 2：`bundleOffsets()` 按「可见边集合」缓存**（`renderer.js`）

```js
var gapNow = (C.edge && C.edge.bundleGap) || 0;
if (bundleCacheSrc === list && bundleCacheGap === gapNow) return bundleCache;
bundleCacheSrc = list; bundleCacheGap = gapNow;
// …算完… return (bundleCache = off);
```

关键：**缓存键是「引用」不是「内容」**。`view.visible` 只在过滤变更时**整体替换**，
相机移动从不碰它 ⇒ 引用同一性就够，不用比集合。⚠️ `invalidate()` 里也要清
（`bundleCache = null; bundleCacheSrc = null;`），否则换过滤后会拿到旧偏移。
它原来在 `buildGeometry()` 里 ⇒ 拖动时每帧对 3202 条边建字符串 key + 逐组 sort。

**刀 3：`cullBox` —— 每条带只算/只画落在自己带里的内容**（本刀最容易做漏）

```js
var cullBox = null;                       // null = 用视口自己（0..W / 0..H）
function inView(x, y, pad) {
  if (cullOff) return true;
  var x1 = cullBox ? cullBox.x1 : W, y1 = cullBox ? cullBox.y1 : H;
  var x0 = cullBox ? cullBox.x0 : 0, y0 = cullBox ? cullBox.y0 : 0;
  return x > x0 - pad && x < x1 + pad && y > y0 - pad && y < y1 + pad;
}
```

三处必须同步改（漏一处就等于没生效）：

1. `inView` —— **四个边界全要**（`cullBox.x0/x1/y0/y1`）；
2. `edgeInView` —— 端点预筛里的 **右 / 上 / 下**要换成 `cullBox.x1 / y0 / y1`
   （左边恒用 `-PAD_EDGE`：`cullBox.x0` 永远是 0，没必要多一个三元式）；
   ⛔ **我第一版就漏了「上」边界** ⇒ 量出来完全没变化，白查了一轮；
3. `segHitsView` —— Liang–Barsky 的 `l/r/t/b`：`r/t/b` 换成 `cullBox.x1 / y0 / y1`。

然后在 `drawStatic` 里设/复原：

```js
cullBox = (band && band.h > 0) ? { x0: 0, x1: W, y0: band.y0, y1: band.y0 + band.h } : null;
// save 里带上 cullBox: cullBox，finally 里 cullBox = save.cullBox;
```

⚠️ **余量不能省**：`PAD_EDGE=140` 兜的是贝塞尔外凸 90px + 箭头 17 + 线宽，
边界上的线就是靠它才不会被切掉。
⚠️ `ensureGeomBake()` 的域键必须加 `band`，否则第 2 条带会复用第 1 条的裁剪结果：

```js
var bk = cullBox ? (cullBox.y0 + ":" + cullBox.y1) : "-";
// … && bakeGeomCam.band === bk
```

实测（3312×2024 区域图、k=1.2）：单带 JS **1.9 → 0.77~1.1ms**；整张仍是 2.7~3.6ms。

**刀 4：拖动速度一帧只采样一次**（`worldbitmap.syncCam`）

```js
function syncCam(cam, dpr, countSpeed) { … if (moved) { if (countSpeed) pushPan(dpx); … }
                                          else if (countSpeed && speedMax > 0.05) pushPan(0); }
// tick()       → syncCam(cam, dpr, true)
// chainStep()  → syncCam(camRef, last.dpr, false)
```

为什么必须这样：`tick` 和 `chainStep` 都会调进来，后者看到相机已同步 ⇒ `pushPan(0)`
⇒ 滑窗变成 `10,0,10,0…` ⇒ **均值正好一半**（实测 speed 报 5、真值 10）
⇒ `needPx` 只有一半 ⇒ 轮开得太晚 ⇒ 中途露洞 ⇒ **每轮一根 212ms 同步全烘**。
验证技巧：拖动时 `MG.app.bitmap.speed` 应该 ≈ 你每帧推进的设备像素数。

**刀 5：带高 128 → 64**（`config.bitmap.bandPx`）

判决项是**单帧**不是帧数：128 ⇒ p95 16.7ms（>20ms 25~35 根）；64 ⇒ 12.5ms（3~6 根）。

#### 4.1.3 要改烘焙时，按这个顺序做

**第 0 步（最容易跳过、但跳过就一定白干）：先确认测量本身是对的**

- 页面 WebGL 渲染器是 GPU 不是 SwiftShader；帧间隔不是恒 17.9ms（60Hz 档）；
- `MG.app.bitmap.speed` ≈ 你实际的每帧位移量（见刀 4）；
- 拖动是**真鼠标**还是页内假拖动 —— 两个仪器结论不一致时**以假拖动为帧成本基准**。

**第 1 步：分账**（先定主导项，别看着曲线找结论）

```pwsh
$env:MG_GPU='1'; $env:MG_CAM='1'; $env:MG_K='1.2'; $env:MG_RUNS='1'
bun _tools/_dragbench.mjs "file:///H:/MathGalaxy/index.html?region=1&fps=1" out.png 7000 2536x1348
```

读 `绘制 p50`（我的 JS）与 `其余 p50`（光栅+合成+呈现）：

| 读数 | 主导项 | 去哪查 |
|---|---|---|
| `绘制` 高（>2ms） | JS：几何 / 标签 / 裁剪 | `_tools/_bandcost.js` |
| `其余` 高 | 光栅：脏区面积 | 带裁剪是否生效 + 带高 |
| `max` 有尖峰但 p50 正常 | 同步全烘 / 追赶 | `MG.app.bitmap` 的 `同步日志` `落洞` `追赶` |

**第 2 步：定位到具体函数**（两个现成探针）

- `_tools/_bandcost.js` —— 离屏画布上量「整张 vs 单带」，并做 `关定义线 / 关节点` 消融。
  单带 ≈ 整张 ⇒ **cullBox 没生效**（回去看那三处）。
- `_tools/_bandreal.js` —— 同一把「真实显示中的画布」与「离屏画布」对比。
  ⚠️ 实测过：离屏单带 0.93ms、拖动中同一把 5~7ms ⇒ 差额是**拖动期 GPU 回压**，
  不是内容突然变贵 —— 别沿着「内容优化」的方向查错。

**第 3 步：改代码时，这五处必须同步**（漏一处就是「改了但没效果」）

1. 加裁剪判据 ⇒ `inView` / `edgeInView` / `segHitsView` **三处** + `ensureGeomBake` 的域键；
2. 改画布尺寸 ⇒ `drawStatic` 的 save/restore 清单 + `sizeFor` 的量化和「内容尺寸 vs 画布尺寸」两个口径；
3. 改矩形 ⇒ `elRect` / `elScale` / `applyTransform` / `clearHandedOff` 的交接基准**全部**依赖它；
4. 改 `worldKMax` ⇒ 必须同时看 `tooBig()`（漂了就是「手机周围永不渲染」）；
5. 改旋钮 ⇒ `config.js` 注释 + `AGENTS.md` 这一节 + `tools/perfguard.mjs` 的区间一起改。

**第 4 步：验收四件套（缺一不可）**

1. `bun tools/build.mjs` —— 末尾会自动跑 `perfguard`（42 条）；
2. 引擎冒烟：`bun _tools/cdp.mjs <url> out.png _tools/_smoke.engine.mjs 2500 1600x900`，判据无 `#mg-fatal`；
3. **带裁剪有没有丢内容**：同机位「位图 vs 实时画」（`?region=1` / `?region=0`），
   逐 1/16 带比**墨量**，比值应恒略 >1 且**没有一条带变少**（隔带高低交替 = 丢带）；
4. **截图亲眼看**：线连续、无接缝、无残影。

#### 4.1.4 症状 → 病因 速查（都是这次真踩过的）

| 症状 | 病因 | 修法 |
|---|---|---|
| 拖动整体卡，`绘制 p50` 4~6ms | 位图模式下每帧重建几何 | 刀 1 |
| 同上，且 `bundleOffsets` 占大头 | 平行边让位每帧重算 | 刀 2 |
| `其余 p50` 十几 ms，带数正常 | 只 `clip()` 没缩裁剪框 ⇒ 每条带都是整帧 | 刀 3 |
| 每轮一根 200ms 尖峰，`落洞`>0，`同步日志` 每轮一条 | 速度采样减半 ⇒ `needPx` 减半 ⇒ 轮开太晚 | 刀 4 |
| p95 16~25ms、`>20ms` 几十根，但单带 JS 很小 | 带太高（单帧光栅量） | 刀 5 |
| 某一条带整列空白 / 内容被切 | `cullBox` 漏了某个边界 | 刀 3 的三处逐条对 |
| 手机「先缩小再拖动，周围不渲染」 | `worldKMax` 与 `tooBig` 判据漂 + 烘不出来时只 `return` | 见 4.1 的 `giveUp` 段 |
| 平板打开就白屏 + 弹错误框 | `roundRect` 只吃数组 | 见 4.3 |
| 放大后云雾有点点/格子 | 纹理 dither 被放大 | 见 4.2 |

### 4.1½ 已知瓶颈：每轮重光栅整张区域图（⛔ 别再拿旋钮试了）

规模到 **1673 点 / 3783 线**（世界 7440×5680）之后，实测（假拖动 3s、k=1.2）：
**p50 4.2（1 个时隙）· p95 16.7 · >20ms 的帧 35 根**；真鼠标拖动还有 **追赶 12 次**。
对照：1391 线时同一条链是 p95 12.5 / 3~6 根。

**旋钮已经全部试完了，都到顶了**（都是实测，别再重复）：

| 旋钮 | 试过 | 结果 |
|---|---|---|
| `bandPx` | 64 / 96 / 128 | 64 最好（p95 16.7 / 25.1 / 25.0）；已经是「单帧 vs 帧数」的最优点 |
| `marginPx` | 400 / 700 / 1000 | 400 最好（p95 16.7 / 21 / 37.5）。加大 margin 会让**带变宽**（带宽 = 画布宽）⇒ 每帧更贵，抵消了「轮变少」的收益 |
| 画布/`maxSide` | — | 抬上限实测直接卡死页面 |

⭐⭐ **手机档（dpr≥2）比桌面更紧**（2026-11-16 补测，之前只测过桌面）：
画布 = (视口 CSS × `min(dpr,2)`) + 2×400 margin。`900×1600 @dpr3` ⇒ **2600×4000 = 10.4M px**，
比桌面 3312×2056 = **6.8M px 还大 1.5 倍**，而手机 GPU 更弱。
假拖动（`MG_DSF=3` + `_chainprobe`）实测：**p50 4.2（正常）· p95 25 · max 379 · 追赶 6 次**。

追根到底是一个**绕不开的死循环**：
- 余量（`marginPx`）加大 ⇒ `slack0` 变大、一轮能跑完 ⇒ **但画布更大 ⇒ 每条带更贵**；
- 余量不加大 ⇒ 每帧位移（dpr=3 时 speed 报 30）把 `fit` 压到 12 帧，
  而带数下限是 `max(3, ceil(want/3))` = **21 条**（4.1-⑤ 那条「不许把带放大 3 倍以上」）
  ⇒ **21 帧 > 12 帧余量 ⇒ 必然追赶**。
- 实测 `marginPx` 200 / 400：p95 **258 / 120** ⇒ 400 反而更好（小 margin 让轮更频繁地重开）。

⛔ 所以**手机档不要拿 margin / bandPx 去调**，它和桌面是同一个「一轮=整张重画」的账，
只是分母更大。彻底解法就是下面那个 blit 窗口 —— 它对手机尤其值（脏区能小到 1/10）。

**真正的账**：一轮要把 `视口⊕余量` 整张图重光栅一次 = **6.8M px ≈ 60ms 光栅**
（实测 ≈ 9ns/px），摊到 11 条带 ≈ **5.5ms/帧**，而预算只有 4.2ms。
所以**只要「一轮=整张重画」，帧数怎么切都不够** —— 切带只把尖峰摊平，不减少总量。

**下一步（唯一有效的方向，属架构改动，动手前先跟用户对齐）**：
平移的一轮里**真正新增的只有一条窄带**（每轮位移 ~300px × 画布宽 3312 ≈ 1M px，
而整张是 6.8M px ⇒ 理论上 6 倍余量）。做法：把旧图按位移**blit 过去**，只重画新露出的那条带。
⛔ 别先试「调 margin / 调 bandPx / 降 maxSide」—— 都量过了，无效或更差。

#### 4.1½.1 「blit 滑动窗口」怎么改（设计稿，⚠️ 先量一条再动手）

**⛔ 动手前必须先量这一个数**：把一张 6.8M px 的 GPU 画布 `drawImage` 到它自己去多少 ms。
理由：早年复盘（`_tools/复盘-视口位图缓存.md` v2）怀疑「**blit 会把整张标脏、上传省不掉**」，
但**当年没量过** —— 若 blit ≈ 整张光栅（~60ms），这条路也是死的。十行探针就能证伪：

```js
var t0 = performance.now();
for (var i = 0; i < 3; i++) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = 'copy';
  g.drawImage(cv, dxPx, dyPx);       // 自绘同一张；dxPx/dyPx 必须整数
  g.globalCompositeOperation = 'source-over';
}
// (performance.now() - t0) / 3 ⇒ 这个数决定这条路值不值得走
```

**若 blit 便宜（< 8ms），按这个顺序改**：

1. **矩形求法从「重新定中心」变成「沿位移平移」**：`rectFor()` 区域档那一支不再用
   `视口中心 ± halfW/halfH` 重算，而是拿 `snap.rect` 加**整数设备像素**位移，
   **尺寸一分不改**（否则每轮都要重新分配画布，见 4.1-⑤），原点仍吸附设备像素格。
2. **先搬图，再补新露出的那一条**：
   ```js
   var dxPx = Math.round((newRect.minX - oldRect.minX) * round.scale);
   var dyPx = Math.round((newRect.minY - oldRect.minY) * round.scale);
   // 1) blit（上面那段：copy + 整数偏移）
   // 2) 只重画新露出的带：drawStatic(target, scale, newRect, { y0, h })
   ```
   ⚠️ 水平位移还会漏出一条**竖**带（宽 = 位移量，高 = 整张），而 `band` 只支持横带 ⇒
   那一块用 `ctx.rect` 自己裁（模仿 `drawStatic` 里 band 那段）。
3. **同步三件东西**（漏一件就错位）：
   · `elRect[i] = newRect` ⇒ `applyTransform()` 重算落位；
   · `clearHandedOff()` 的交接基准用的是 `round.rect` ⇒ 必须换新矩形重算；
   · `snap.rect` 只在换代时才换（blit 期间旧快照仍在屏幕上顶着）。
4. **交接仍然只能改裁剪**（4.1-②）：blit 出来的新图与旧图重叠区**不能同时可见**，
   依旧靠两条互补的 `clip-path`。⛔ 不要因为「反正搬过图了」就改成 `clearRect` —— 同一个坑。

**若 blit 很贵（≈ 整张光栅），换另一条路**：不动主画布，**再加一张「窄条画布」**
只覆盖即将移入的那一条，三层叠加（主图 + 窄条 + 实时层）。代价：合成层 +1、裁剪要管三张；
优点：不碰主画布像素，也就没有「整张标脏」。
⚠️ 层数变多会碰到 4.5 的「合成器 bound」—— 改完必须重新看 `CompositeLayers`。

两条路改完都要重跑：`perfguard` 42 条 + `_chainprobe`（落洞/追赶必须仍是 0）+
逐 1/16 带墨量比对（不能有带变少）+ 截图。

⚠️ **区域图的像素尺寸必须用 `m = min(dpr, 2)`，不能用满 dpr**：画布显示倍率是 `dpr/m`，
所以「盖住视口所需像素」= `vw×m`。用满 dpr 会多出 1.5 倍（手机）⇒ 白白顶到 4096 上限
⇒ 矩形**物理上盖不住视口**。实测 dpr=3、900×1600：`3056×4096 → 2600×4000`、盖住 false → true。

⚠️ **「烘不出来」必须 `giveUp()`（`snap.ready = false` + 记不可能签名 + `hide()`），⛔ 不许只 `return`**：
留着旧快照 = 屏幕上一张盖不住/过期的旧图，且永不重试成功（用户报的「手机先缩小再拖动周围不渲染」就是它）。
`ready=false` 后 tick 自然退回**实时画**（正确但慢），k 回到能烘的范围就自动恢复。

⚠️ **世界档上限 `worldKMax(dpr) = min(边长口径, 面积口径) × 0.999`，判据必须和 `tooBig()` 完全一致**。
曾经写成 `max(没算 dpr 的边长口径, 预算口径)` ⇒ 手机上（dpr≥2）它盖过预算 ⇒ rectFor 说「世界档」、
`tooBig` 说太大 ⇒ **一张也烘不出来**。dpr=1 时两项里大的那个正好是预算口径，所以**电脑从不复现**。

⚠️ **缩放期补烘 `zoomMs`（默认 150ms）**：k 一变，位图就是上一档的图被 transform 拉伸
（线宽 / 圆点 / 箭头跟着被缩放），一直挂到停手才纠正。三条触发是**一套判据**，
⛔ `lowSlack` 必须排在 `stale` 前面 —— 缩放时 `stale` 恒真，排后面会把它整个挡住。
实测缩放出图 6.3 次/秒（自限速：= max(zoomMs, 一轮时长)）。

### 4.2 云雾层（`layer-cloud`，独立 canvas，**不进烘焙**）

- 一张离屏纹理（`texScale = 0.19` × 世界尺寸 ≈ 2026×1744）+ 每帧一次 `drawImage`。
  `imageSmoothingQuality` ⛔ 别改 `'high'`（实测 dpr=2、1600×900 下整帧 72.9 → 39.6ms）。
- ⭐ **凡是要放大的纹理，建完必须抹一次 dither**（`smoothTexture()`，`config.background.texBlur` 默认 1.6）。
  径向渐变是**逐像素抖动**上色的（防 banding），1:1 看不见，但纹理要放大 `k/0.19` ≈ 5~40 倍
  ⇒ 抖动变成屏幕上一张**周期约 2 texel 的格子**（实测 k=1.5/4/8 时周期 17~18/42/84px）。
  实测高频（4-邻域拉普拉斯，越小越干净，k=4）：纹理自身 **13.27 → 0.995**、实显示层 **1.06 → 0.052**。
  成本 0.2ms，只在开页 / 改显隐时发生，**不在每帧路径上**。
- ⚠️ 量这类细纹**别用整屏截图的高通**：连线会把指标淹掉（实测 before/after 19.95 vs 19.83，完全看不出）。
  要量就量**那一层自己的 canvas**，再裁一块拼 A/B 图亲眼看。

### 4.3 新 API / 老浏览器：⛔ 不能用「函数在不在」判可用性

`ctx.roundRect` 在安卓平板的早期 Chromium 上**存在**，但第 5 个参数只吃数组 ⇒ 传数字每帧抛错
⇒ 绘制循环停摆、弹错误框（而台式机与新手机正常）。正解：**试一次 + 捕获 + 永久回退到等价老写法**
（`roundPath()` → `arcTo`），或者干脆一开始就用处处可用的写法。
复现这种「启动前就坏」必须用 `MGPRE=<文件>`（CDP 在页面脚本之前注入 + 重载）——
补丁打在页面启动**之后**是假的，引擎早已选好分支了。

### 4.4 改完必须自己量（两个仪器都要跑，结论不一致时以假拖动为准）

| 仪器 | 量什么 | 坑 |
|---|---|---|
| `_tools/_dragbench.mjs` | **真鼠标**拖动，端到端验收（raf p50/p95/max） | CDP 输入回路会因主线程忙而变稀 ⇒ 每 tick 位移被放大到 39px、帧率掉到 ~50Hz ⇒ 它是「输入回路 + 帧」的混合物。`MG_DSF=3` + `MG_K` 就是手机档复现仪器 |
| `_tools/_chainprobe.js` | **页内假拖动**：自己按帧推相机，量**纯帧成本** | ⚠️ 必须每帧 `cam._anim = null`（页面启动后那次 fit 是带缓动的动画，会把 cam.k 拉回去，实测报出一堆假的落洞）；`?zoom=1` 走缩放 |

```pwsh
# 端到端（真鼠标，7s × 3 轮）
$env:MG_GPU='1'; $env:MG_CAM='1'; $env:MG_K='1.2'; $env:MG_RUNS='3'
bun _tools/_dragbench.mjs "file:///H:/MathGalaxy/index.html?region=1" out.png 7000 2536x1348
# 手机档复现（dpr=3）
$env:MG_GPU='1'; $env:MG_DSF='3'; $env:MG_K='0.5'; $env:MG_RUNS='1'
bun _tools/_dragbench.mjs "file:///H:/MathGalaxy/index.html?region=1#v=1.2000,1184.8,956.3" out.png 3000 900x1600
```

报告里要**说清读的是哪一类数**：结构指标（追赶 / 落洞 / 分配 / 出图率）在 60Hz 档下仍然有效；
**绝对帧时无效**。真机手感是最终判据 —— 用户的「突然顿一下」比任何 p95 都权威。

### 4.4½ 这些约束是**机器守着**的：`tools/perfguard.mjs`

> 文档挡不住删除。2026-11-09 实测：上面五条最硬的规矩，有三条在本文写出来之前就已经
> 被违反/漂移了，而验收仪器被删时**没有任何东西报警** —— 于是「拖动又变卡」活了几周。

所以把「不许删」变成了**构建即红**：`bun tools/build.mjs` 末尾会跑 `tools/perfguard.mjs`，
CI 也单独跑一次。它逐条对着本文第四节断言（当前 42 条），删了/改坏了就报错，
报错里带着「去看 4.x」和当初的实测代价。它同时守着**验收仪器本身在不在**。

它故意只断言**机械可判**的东西（函数在不在、边界有没有用 `cullBox`、旋钮取值区间），
⛔ 不绑实现细节 —— 曾经把「必须有个叫 smoothTexture 的函数」写成硬门，
背景重写后就误报了，而当时的云雾其实是干净的。

要改一条约束：**先在本文那一条里给出「改前/改后」的数字，再改 `perfguard.mjs` 里对应那条**。

### 4.5 判断矩阵（先定主导项，别看着曲线找结论）

| 主导项 | 含义 | 修法 |
|---|---|---|
| 光栅（RasterTask） | overdraw / fill-rate bound | 位图载体 + 横带切片 + 墨量 LOD + 烘焙裁剪 |
| 合成（CompositeLayers） | 合成器 bound | 拖动期去 blur、减层数、`alpha:false`、**别换显示层** |
| 上传 / 带宽 | 带宽 bound | 限 dpr、缩后备存储、**别让画布尺寸抖**（量化） |

### 4.6 九条最容易踩的（改 UI 前默念一遍）

1. ⛔ **别换显示层**（`display:none ↔ ''`、新建画布）—— 整张 54~108ms。
2. ⛔ **别在两张显示中的大画布上 `clearRect`** —— p95 4.3 → 29.6ms。交接只改裁剪。
3. ⛔ **别让画布尺寸随 k 抖** —— 尺寸变 = 重新分配几十 MB。世界档量化到 128 的格。
4. ⛔ **两个「大小 / 上限」判据写在不同地方必然漂** —— 一处说能烘、一处说太大 = 永久空转。
   改一处必须同步另一处，并且**在 dpr ≠ 1 上验**（dpr=1 经常把问题掩盖掉）。
5. ⛔ **别用「函数在不在」判 API 可用性** —— 见 4.3。
6. ⛔ **别把 exe 放进 pwsh 管道**（`& $bun … | Out-String` / `2>$null` 都算）⇒ 静默什么都不跑。
   一律 `Start-Process -RedirectStandardOutput` + `Get-Content -Encoding UTF8`。
7. ⛔ **别只加 clip 不缩裁剪框** —— 见上面第 7 条；每条带都要自己筛内容。
8. ⛔ **别让两个地方都采样拖动速度** —— 见上面第 8 条；平均值减半 = 每轮一根 212ms。
9. **改完 `src/` 必须**：`bun tools/build.mjs`（单文件内嵌源码 **+ 末尾的性能不变量体检**）+
   引擎冒烟（`cdp.mjs` + `_tools/_smoke.engine.mjs`，判据是无 `#mg-fatal`）+ **截图亲眼看**。
   ⛔「构建通过」不等于改对了；但构建**不**通过（尤其 perfguard 报红）一定是你碰了判据。

---

