# 英文层总表（Tier 1–3 收尾）

> 由 `_tools/_enreport.mjs` / `_tools/_finalreport.mjs` 现算（数字都从产物里读，不靠记忆）。
> 收尾更新于 2026-10-16（内容版本 **v0.9.1**）。
> 任务书：单一内容树、`*_en` 由构建生成、⛔ 不建第二棵内容树、未审校内容带状态头、
> 每子项独立验收 + 独立提交 + 独立发布。

## 〇、收尾状态（逐条）

| 子项 | 状态 | 证据 |
|---|---|---|
| T1.0 README 英文节 | ✅ | `README.md` 第 12/43 行（数字现算）|
| T1.1 英文名字段 | ✅ | **294 / 709 = 41.5%**（一级 253 + 二级 41）· 缺口 415 见 `i18n/gaps.md` |
| T1.2 概念页双语（`alternateName`）| ✅ | 709 个概念页都有；内链平均 3.9 条/页 |
| T1.3 `llms.txt` 英文段 | ✅ | 根 + dist 两份（根 1050 B，超 1250 会抛）|
| T1.4 许可迁 CC BY 4.0 / MIT | ✅ | `LICENSE` 四、五、六节；`LICENSE-MIGRATION.md` §4 镜像对照表；旧 `LICENSE-PROPOSAL.md` 已在 `0eeccaa` 删除并在新文件抬头注明 |
| T2.1 read 文档英文版 | ✅ | 4 份 / 11 页（reading 3 · policy 3 · hubs 4 · notation 1）+ 根副本 |
| T2.2 英文摘要（前 30 枢纽）| ✅ | **30 / 30**，逐条状态（见 §四）|
| T2.3 外链锚点 `xref` | ✅ | 45 节点 / 80 链接（Wikipedia 45 · nLab 30 · Mathlib 5），逐条 200 + title 核过 |
| T2.4 界面英文模式 | ✅ | 口径「折模板 105」（逐条 236，**作者拍板当时的快照**）；工具条 `EN`/`中文` + `?lang=`；本次又加「画布名字」独立开关。⚠️ 2026-10-16 第二轮改了两处面板文案（「前置提示」→「相关依赖的已读情况」、新增「独立页面」入口）⇒ `ui.en.js` 键 138 → 141 |
| T3.1 英文入口页管道 | ✅ | 294 节点 / 378 文件；概念页含英文小节 + `hreflang` |
| T3.2 英文陈述 | 🟡 **批次 1 完成，等作者审校** | 11 节点 / 22 字段（试点 3 + 批次 1 的 8）；批次 2/3 冻结 |
| T3.3 CONTRIBUTING 翻译路径 | ✅ | 含「状态是逐条的」「公式逐字 + 不许有汉字」「新条目现取 basedOn」|
| §1F 口径更正（枢纽榜 16 个）| ✅ | 见 §三 第 4′ 行 |
| §5.1–5.7 小开关 | ✅ | 5.1/5.2 不做；5.3 分批；5.4 扩到 30（批次 1 已做）；5.5/5.6/5.7 已办 |
| §6 交接文档 | ✅ | 本文件 + `DECISIONS.md` + 仓库外的事实文件（会话记忆）|

## 一、覆盖率

| 项 | 覆盖 | 说明 |
|---|---|---|
| 英文名 `title_en` / `label_en` | **294 / 709 = 41.5%** | 一级 253（aka 恰好一条名字样英文）+ 二级 41（title 里恰好命中一个 aka 候选）。T2.2 修了两处闸门误杀（连字符专名 / 裸 `section` 被当书号）并补了 13 个枢纽名 |
| 英文摘要 `abstract_en` | **30**（枢纽榜前 30 = 30/30） | **全部 reviewed**（作者 2026-10-16 批；8 条的底稿指纹因「公式清汉字」重记过一次，见 §四·stale）|
| 英文陈述 `statement` / `notes` | **30 个节点 / 60 个字段**（枢纽榜前 30 名全译完 ⇒ 决策 5.4 的「扩到 30 条」达成） | 逐句对译；状态**逐字段** —— **reviewed 60 · draft 0**（作者 2026-10-16 批「审完了没问题」）|
| 英文入口页 `nodes/<id>.en.md` | **294 个节点 / 378 个文件**（84 页是续页） | 有英文名或摘要就有；文件系统口径（⛔ 不看 `en_page` 字段）|
| read 文档英文版 | **4 份 / 11 页** | reading · policy · hubs · notation（+ 仓库根副本 7 个） |
| 术语表 | 1 份 | `i18n/glossary.md`（有英文键的一律现算） |
| 外链锚点 `xref` | **45 个节点 / 80 个链接** | Wikipedia 45 · nLab 30 · Mathlib 5（45 个节点里 45 个有 Wikipedia 条），逐条 HTTP 200 + title 核对 |
| `llms.txt` 英文回退规则 | 已写 | 1287 B（原 1252 B，加字前先砍了等量的水） |
| 阅读页中英切换 | 已上 | `?lang=en` + 记住选择 + 浏览器语言 |

## 二、新增产物清单

**内容侧（人写的，都是单一真源）**

| 文件 | 是什么 |
|---|---|
| `src/data/i18n.js` | 英文名旁挂表（**由 `tools/i18n-backfill.mjs` 生成**，⛔ 不手写） |
| `src/data/i18n/docs.en.js` | read 文档英文正文（4 份） |
| `src/data/i18n/abstracts.en.js` | 30 条英文摘要（每条自带逐条状态） |
| `src/data/i18n/statements.en.js` | 11 个节点的英文陈述/说明（每字段自带逐条状态） |
| `src/data/xref.js` | 外链锚点（45 节点 / 80 链接，逐条核过） |

**构建产物**

| 产物 | 说明 |
|---|---|
| `dist/{reading,policy,hubs,notation}.en.md` | 英文文档，切页保证单次可抓（reading/policy 各 3 页、hubs 4 页） |
| `dist/nodes/<id>.en.md` | 英文入口页 290 个节点（含续页 349 个文件） |
| 仓库根 `*.en.md`（7 个） | 与中文版同规矩 |
| `i18n/glossary.md` · `i18n/second-tier.md` · `i18n/ui-strings.md` | 术语表 · 二级命中清单（可整批回滚）· 界面文案清单 |
| `llms.txt`（根 + dist） | 加了英文回退规则与 `en_page` 计数 |
| `dist/graph.json` | 每节点 `label_en` / `title_en` / `abstract_en` / `statement_en` / `notes_en` / `xref` / `en_page` / `translations` |

**文档与工具**

| 文件 | 是什么 |
|---|---|
| `CONTRIBUTING.md` | 新建：中文 + `## Contributing in English` |
| `LICENSE-MIGRATION.md` | 许可**迁移记录**（原 `LICENSE-PROPOSAL.md`，2026-10-16 已生效）：方案 B 落地、镜像影响表、故意没做的事 |
| `tools/i18n-backfill.mjs` | 英文名回填（一二级规则唯一真源，build 直接 import 复用） |
| `tools/i18n-status.mjs` | **逐条状态体检**（决策二.3）：列出每条/每字段 draft / reviewed / stale + 为什么；`--md` 出批次 rollup、`--patch` 打印缺的 basedOn。⛔ 只报不写 |
| `tools/searchcheck.mjs` | **搜索回归体检**（T3.4）：24 条标注查询跑真模块（含 `preadditive`→1、`additive`→10、人名、书号、记号、中文词），条数或前几条命中变了就 exit 1；`--list` 看命中、`--record` 出基准表 |
| `_tools/_xrefcand.mjs` · `_xrefverify.mjs` · `_xreview.mjs` | 外链候选 / 核对（并发、双网络路、抓 title）/ 人眼复核 |
| `_tools/_uistr.mjs` · `_uiprobe.js` · `_uifmt.mjs` · `_uistate.js` | UI 文案清单（源码扫 + 真跑界面 + 折模板 + 状态截图） |
| `_tools/_abcheck.mjs` · `_stcheck.mjs` | 摘要 / 陈述译文逐条喂真 KaTeX |
| `_tools/_enreport.mjs` | 本表的数字来源 |

## 三、未批准 / 未做清单

| # | 项 | 卡在哪 |
|---|---|---|
| 1 | **T2.4 应用 UI 英文模式** | ✅ **已实现**（口径 = 折模板 **105**，逐条 236 也照报）。两次提交：`3df632d`（顶栏/搜索/设置/图例 + 45 星团英文名）· `642d694`（节点面板/边面板）。入口 = 工具条最右的 `EN` / `中文` 小开关（`607b23f` 补），另有 `?lang=en`。⭐ 画布上的名字（星系/星团/节点）也跟语言走（`MG.localizeDisplay` 启动时算一次写进 `labelShow`/`nameShow`，⛔ 不逐帧查表）。⚠️ 英文模式下画布是**混的**：**301/709** 个名字是英文，其余回落中文（缺口见 `i18n/gaps.md`）|
| 1′ | ⭐ **画布名字的语言可以单独定**（T2.4b 收尾，2026-10-16） | 界面中文 + 画布英文名（或反过来）都行。一键开关在**设置窗口 → 画布上的名字**（三选一：跟随界面语言 / 中文名 / 英文名），另可临时用 `?labellang=zh|en`（对照截图用）。换它 = 写 localStorage + **整页重载**（显示名是启动时算的缓存，热切会出现半个画布是旧语言）。判定只在 `src/core/i18n.js` 的 `MG.displayLang` 一处；文本量缓存的键里带它（`renderer.js` 的 `textCacheKey`），换语言时整表作废。验收：点「英文名」→ 重载 → `localStorage=mathgalaxy.canvas.lang:'en'`、URL 里 `labellang` 已删、样例「测度 → measure」（cdp 实测，见 `_tools/_canvaslang*.js`）|
| 1″ | ⭐ **星团英文名（45 条）与批次 1 的裁决**（作者 2026-10-16 批复）| 45 个星团英文名 **全过**（原话「星团也没啥问题」）—— 记录在 `i18n/review-clusters.md`。批次 1：⑤ `prop.cg-coreflective` 的 `kification` **已改**（「根本就不是标准用词」）⇒ 新名字 `compactly generated spaces form a coreflective subcategory`（58 字符 ⇒ 只填 `title_en`，搜索 `kification` 现在 0 命中）；②③④⑥「其他没啥问题」照原样通过。⭐ **批次 1 的 33 条已翻 `reviewed`**（作者批复「标」，用 `tools/i18n-review.mjs`；剩下的 19 条摘要属批次 2/3，仍 draft）|
| 2 | **Stacks Project 外链** | 一条都没加：tag 必须对着 Stacks 搜索逐条核，这批节点多是分析/范畴基础。schema 里留着位置 |
| 3 | 415 个节点没有英文名 | 歧义 92 + 只有缩写 17 + 只有书号 256 + 只有 title 3 + 完全没有 88 = 415；清单 `i18n/gaps.md` 按星系分组带候选集，开头写明了**认领方式** |
| 4 | **前 30 枢纽英文名** | ✅ **已补完（16/16）**。实际做法比预想多两步：① 先修了两处闸门误杀（`Heine-Borel` 被驼峰判据误杀、裸 `section` 被当书号）—— 这两个名字根本不用补；② 剩下 13 个在 `aliases.js` 的 aka 里补名字，其中 3 个是「合并/换掉一条」而不是纯新增。细节与逐条记录见 `i18n/DECISIONS.md` 第 2 节 |
| 4′ | ⚠️ **口径更正（2026-10-16 晚）** | 枢纽榜前 30 名按「入度降序 + layer 升序」定；入度 = 4 的节点有 **36 个**并列跨在第 30 名附近，**不 computeLayers 的探针排出来的前 30 是任意集合** —— 我先前报的「14」就是那么来的。以构建口径为准：**没有英文名的是 16 个**。这 16 个已在 T2.2 补完，英文名覆盖最终 **294 / 709 = 41.5%** |
| 5 | 二级命中里 2 条要人眼 | ✅ **已修**：`thm.first-iso` → `first isomorphism theorem`（原 `Noether`）· `def.simplex-category` → `simplex category`（原 `Delta`）。修法是**把那条不是名字的从 aka 里去掉**，不是补一条 |
| 6 | 许可迁移 | ✅ **已执行**：内容 → CC BY 4.0、代码 MIT；`LICENSE` 重写，新增 `LICENSE-CC-BY-4.0.txt`（官方原文）；`LICENSE-PROPOSAL.md` → `LICENSE-MIGRATION.md` |
| 7 | 英文陈述只做了 3 条 | ✅ 已扩到 **11 条**（批次 1 完成，`i18n/review-batch-1.md`）；再往上扩是纯人工量（审校产能），批次 2/3 **冻结**等作者审完批次 1 |
| 8 | 边上的证明（`proofs/`）没有英文 | 英文页明确写着「证明仍以中文页为准」 |
| 9 | 内容瑕疵 1 处 | `prop.chaus-two-term-resolution` 的 `\text{}` 里嵌了 `$` —— ✅ 已定：改掉（报告 diff） |
| 10 | T1.1 缺口的一个选项 | 若允许「title 兜底」还能再填 106 条 —— 但那个池子不干净（混着 `X, M` 这种公式碎片），所以没做 |

## 四、状态与 stale 的规矩（2026-10-16 起：**逐条**判定）

- ⭐ **逐条 = 审校与 stale 的最小单位**（作者拍板，决策二.3）：
  | 内容 | 一条 = | 底稿（算指纹用的中文） |
  |---|---|---|
  | 英文摘要 | 一个节点 | 该节点的 `statement` + `notes` |
  | 英文陈述 / 说明 | 一个字段（`statement` / `notes`） | 就是那个字段本身 |
  | 英文文档 | 一份（reading / policy / hubs / notation） | 无（数字与清单都是构建现算 ⇒ 只按内容版本判） |
  | 界面文案（`ui.en.js`） | 整表一个状态（**口径**：UI 是照着屏幕整体审的，逐条没有意义） | 无 |
- **每条自带三个字段**：`status`（draft / reviewed，人的开关）· `basedOn`
  （`'<内容版本>#<中文底稿指纹>'`，指纹 = `MG.zhHash`，8 位十六进制）· `reviewed`（{ by, date }）。
- **stale 是算出来的**，两个来源任一不符即 stale：① 内容版本（`tools/ids.snapshot.json`）变了；
  ② **这条的中文底稿改过了**（指纹不符）—— 后者比老的「版本变了」细得多，
  改一个字的陈述也会让**那一条**变 stale，而不是整份文件。
  `.md` 状态头写明是哪一种（`from vX; content is vY` / `the Chinese wording changed…`）。
- ⛔ **判定只有一处实现**：`src/core/i18n.js` 的 `MG.enFieldStatus`（+ `MG.zhHash`）；
  `tools/build.mjs` 调的是同一个函数，所以**网页上看到的状态与产物里写的不会漂**。
- **状态头在三处出现同一句话**：`.md` 文件里、概念页/阅读页的横幅里、`graph.json` 的
  `translations.en` 里（`fieldStatus` 逐字段、`staleFields` 列出过期的那几个）。
  横幅的文本是 publish.mjs 从 `.md` 里抠出来的 ⇒ 不可能漂。
- ⛔ **别手工「刷新」`basedOn` 来消掉 stale** —— 那等于悄悄作废审校记录；要重新对稿。
  体检与批次 rollup 走 `bun tools/i18n-status.mjs`（只报不写）。
- **中文永远是权威版本**，每处英文旁边都写着这句。

## 五、搜索口径（T3.1）

- **一份索引，中英共用**。每个节点的检索串里含 `label_en` / `title_en` / `abstract_en` /
  `statement_en` / 星系名（中 + `en`）/ 星团名（中 + `en`）。
  ⇒ **中文模式下搜英文词也能命中**（搜索框自己写着「名称 / 英文名 / 别名 / id / 标签 / 正文 / 板块名」）。
  ⚠️ 后果：中文模式下命中的可能是「只有英文摘要/陈述里有那个词」的节点，结果行显示中文名 ——
  是设计如此，不是 bug。
- ⭐ **2026-10-16 修掉一个真 bug**：`termsOf()` 原来把长英文词按**词表里的任意子串**切开，
  而词表里有从记号表/缩写来的短 ASCII 碎片（`ive` 之类）⇒ 搜 `preadditive` 会被切成 `ive`，
  一堆含 `-ive` 的节点把真命中挤掉（实测返回 14 条无关节点）。
  修法：拉丁词条要求**词边界命中**（中文词条不受影响）。修后 `preadditive` → 命中唯一的那个节点。
- 词表（`vocab`，切分多词查询用）**不含**英文摘要与陈述里的词 —— 它们只进 `hay`（匹配用），
  不进词表。目前够用；若以后英文长句查询变多，再考虑把它们的词也 `addWord` 进去。
- ⭐ **回归基准**（`bun tools/searchcheck.mjs`，24 条标注查询）：跑的是**真模块**
  （`MG.createSearch` + 假 DOM + 真的「点结果行」拿命中 id），对不上 exit 1。
  覆盖：修 bug 的那条（`preadditive` → 1）、短词（`additive` → 10）、人名
  （`zorn` / `fubini` / `radon` / `schroder` / `noether` / `delta`）、通用词（`section`）、
  书号（`Exercise 2.25` → 1；`I.5` → **0**，因为 hay 不含 refs）、记号
  （`L^p` / `ℵ₀` / `σ-algebra` / `kC` / `NBV`）、中文词（`测度` / `紧生成`）、类型名（`定义`）。
  ⛔ 加查询欢迎；**改既有期望值必须说得出理由**。
- ⭐ **词边界修复的前后对照**（A/B 都跑真模块：B 只是把 termsOf 里的 `wordAligned` 换成 `true`）：

  | 查询 | 修复前 | 修复后 | 修复前首条 | 修复后首条 |
  |---|---|---|---|---|
  | `preadditive` | 14 | **1** | `thm.freyd-mitchell`（错） | **`def.abelian-category`** |
  | `section` | 14 | 13 | `prop.rhom-zs-sections`（错） | **`def.section`** |
  | `yoneda` | 14 | 13 | `prop.yoneda-embedding` | **`lem.yoneda`** |
  | `additive` | 10 | 10 | `def.additive-functor` | 不变 |
  | `isomorphism` | 6 | 6 | `def.mono` | 不变（老查询本来就没坏） |
  | `measurable` | 14 | 14 | `def.measurable-function` | 不变 |
  | `radon` | 14 | 14 | `thm.lebesgue-radon-nikodym` | 不变 |
  | `schroder` | 1 | 1 | `thm.schroder-bernstein` | 不变 |
  | `abelian` | 14 | 14 | `def.abelian-category` | 不变 |

  ⇒ 修复**只动了碎片受伤的那些查询**（长词里的短碎片），老的长词查询一个都没退化。
  探针：`_tools/_scab.mjs`（本地，gitignore）。

## 六、提交记录（英文层）

```
b7da607 T1.0 README 英文节     2618166 T1.1 英文名字段     b576cac T1.2 概念页双语
5fab303 T1.3 llms.txt 英文段    eab4277 T2.1 read 文档英文化  551a094 T1.1 二级（274/709）
e1ecd34 T1.4 许可草案          d60e1dc T2.1 四条护栏        2984211 T2.2 30 条英文摘要
23d9a5f T2.3 外链锚点          d90d0ac T2.4 前置清单        da76762 T3.1 英文入口页管道
e13e524 T3.2 英文陈述试点      b4edff2 T3.3 CONTRIBUTING
—— 任务书（合并全部批复）之后 ——
065c210 口径更正（16 / xref 45）  9d140b1 T1.1 清单挪进 i18n/
0eeccaa T1.4 许可迁 CC BY 4.0     5bca09f T2.2 枢纽英文名补完（294/709）
3df632d T2.4① 界面英文（顶栏/搜索/设置/图例）+ 45 星团英文名
642d694 T2.4② 界面英文（节点面板/边面板）
cbcf2b8 §5.6 修 \text{} 里的 $     f6f32aa T3.3 翻译贡献路径
9487bd5 T3.1 搜索口径 + 词边界修复     （本提交）T3.2 批次 1（11 条英文陈述）
```
