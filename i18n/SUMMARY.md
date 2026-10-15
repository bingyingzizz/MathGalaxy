# 英文层总表（Tier 1–3 收尾）

> 由 `_tools/_enreport.mjs` 现算（数字都从产物里读，不靠记忆）。生成于 2026-10-16。
> 任务书：单一内容树、`*_en` 由构建生成、⛔ 不建第二棵内容树、未审校内容带状态头、
> 每子项独立验收 + 独立提交 + 独立发布。

## 一、覆盖率

| 项 | 覆盖 | 说明 |
|---|---|---|
| 英文名 `title_en` / `label_en` | **274 / 709 = 38.6%** | 一级 230（aka 恰好一条名字样英文）+ 二级 44（title 里恰好命中一个 aka 候选） |
| 英文摘要 `abstract_en` | **30**（枢纽榜前 30 = 30/30） | 机器起草，`status: draft`，中文为准 |
| 英文陈述 `statement_en` / `notes_en` | **3**（试点） | `lem.zorn` · `thm.first-iso` · `def.metric-space`，逐句对译 |
| 英文入口页 `nodes/<id>.en.md` | **290 个节点 / 349 个文件**（59 页是续页） | 有英文名或摘要就有；最大 890 B |
| read 文档英文版 | **4 份 / 11 页** | reading · policy · hubs · notation（+ 仓库根副本 7 个） |
| 术语表 | 1 份 | `i18n/glossary.md`（有英文键的一律现算） |
| 外链锚点 `xref` | **45 个节点 / 80 个链接** | Wikipedia 34 · nLab 30 · Mathlib 5（其余为已有条目），逐条 HTTP 200 + title 核对 |
| `llms.txt` 英文回退规则 | 已写 | 1287 B（原 1252 B，加字前先砍了等量的水） |
| 阅读页中英切换 | 已上 | `?lang=en` + 记住选择 + 浏览器语言 |

## 二、新增产物清单

**内容侧（人写的，都是单一真源）**

| 文件 | 是什么 |
|---|---|
| `src/data/i18n.js` | 英文名旁挂表（**由 `tools/i18n-backfill.mjs` 生成**，⛔ 不手写） |
| `src/data/i18n/docs.en.js` | read 文档英文正文（4 份） |
| `src/data/i18n/abstracts.en.js` | 30 条英文摘要 |
| `src/data/i18n/statements.en.js` | 3 条英文陈述/说明（试点） |
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
| `LICENSE-PROPOSAL.md` | 许可迁移草案（**PROPOSAL — NOT IN EFFECT**，`LICENSE` 一字未改） |
| `tools/i18n-backfill.mjs` | 英文名回填（一二级规则唯一真源，build 直接 import 复用） |
| `_tools/_xrefcand.mjs` · `_xrefverify.mjs` · `_xreview.mjs` | 外链候选 / 核对（并发、双网络路、抓 title）/ 人眼复核 |
| `_tools/_uistr.mjs` · `_uiprobe.js` · `_uifmt.mjs` · `_uistate.js` | UI 文案清单（源码扫 + 真跑界面 + 折模板 + 状态截图） |
| `_tools/_abcheck.mjs` · `_stcheck.mjs` | 摘要 / 陈述译文逐条喂真 KaTeX |
| `_tools/_enreport.mjs` | 本表的数字来源 |

## 三、未批准 / 未做清单

| # | 项 | 卡在哪 |
|---|---|---|
| 1 | **T2.4 应用 UI 英文模式** | 等作者定「用哪个口径」：模板 **105**（< 200，可做）/ 逐条 **236**（> 200，按约定停）。清单在 `i18n/ui-strings.md` |
| 2 | **Stacks Project 外链** | 一条都没加：tag 必须对着 Stacks 搜索逐条核，这批节点多是分析/范畴基础。schema 里留着位置 |
| 3 | 435 个节点没有英文名 | 259「只有书号」+ 98 歧义 + 95 完全没有 + …；清单 `i18n-gaps.md` 按星系分组带候选集 |
| 4 | **前 30 枢纽里 14 个没有英文名** | 摘要正文里用标准英文术语写了它们，但名字字段仍空。补法：`aliases.js` 加 aka（作者拍板即可）—— 14 个 id 与建议英文名见 `i18n/DECISIONS.md` |
| 5 | 二级命中里 2 条要人眼 | `thm.first-iso` → `Noether`（是归属不是名字）· `def.simplex-category` → `Delta`（LaTeX 符号） |
| 6 | 许可迁移 | `LICENSE` 保持原样，方案 A/B/C 等作者选 |
| 7 | 英文陈述只做了 3 条 | 试点性质；扩展是纯人工量（审校产能） |
| 8 | 边上的证明（`proofs/`）没有英文 | 英文页明确写着「证明仍以中文页为准」 |
| 9 | 内容瑕疵 1 处 | `prop.chaus-two-term-resolution` 的 `\text{}` 里嵌了 `$`（等作者定夺） |
| 10 | T1.1 缺口的一个选项 | 若允许「title 兜底」还能再填 106 条 —— 但那个池子不干净（混着 `X, M` 这种公式碎片），所以没做 |

## 四、状态与 stale 的规矩（全线一致）

- **唯一来源**：每个英文内容文件两个字段 —— `status`（draft / reviewed）+ `basedOn`（译自哪个内容版本）。
- **stale 是算出来的**：内容版本（`tools/ids.snapshot.json`）跑到 `basedOn` 之外 ⇒ 构建自动标 stale，
  状态头写明「from vX / content is vY」，构建日志同时打 ⚠️。翻 reviewed 只改一处。
- **状态头在三处出现同一句话**：`.md` 文件里、概念页/阅读页的横幅里、`graph.json` 的 `translations` 里。
  横幅的文本是 publish.mjs 从 `.md` 里抠出来的 ⇒ 不可能漂。
- **中文永远是权威版本**，每处英文旁边都写着这句。

## 五、提交记录（英文层）

```
b7da607 T1.0 README 英文节     2618166 T1.1 英文名字段     b576cac T1.2 概念页双语
5fab303 T1.3 llms.txt 英文段    eab4277 T2.1 read 文档英文化  551a094 T1.1 二级（274/709）
e1ecd34 T1.4 许可草案          d60e1dc T2.1 四条护栏        2984211 T2.2 30 条英文摘要
23d9a5f T2.3 外链锚点          d90d0ac T2.4 前置清单        da76762 T3.1 英文入口页管道
e13e524 T3.2 英文陈述试点      b4edff2 T3.3 CONTRIBUTING
```
