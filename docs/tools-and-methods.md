# 工作流、环境坑、工具清单与方法学（原 HANDOVER.md §1、§6.1–6.2、§7–§11，原文迁入）

> 需要时才读。里面的路径（`H:\…`、`C:\Users\MSI`）、代理端口、`pwsh` 习惯是**迁移前机器的历史配置**，
> 现行环境见 `CLAUDE.md` / `AGENTS.md`。工具清单与方法学结论仍有效。

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
| `bun tools/_katexcheck.mjs` | ✅ **2976 个 `$…$`，失败 0**（第 28 批新增 3 个 definition 节点及注；历史累计见 git 记录） |
| `bun tools/doccheck.mjs` | 文档硬数字 vs `meta.counts`。它红了改 README，别改基准 |
| `bun tools/searchcheck.mjs` | ✅ **31/31**（「定义」total 971；fubini 12；Noether 14；compact 100；ℵ₀ 7；2026-11-11 第 28 批 3 个定义节点与注 +3） |
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
| **审读报告真源**（15348 行，本地） | `_audit/问题清单-v2-2026-11-03.md` → §24 待修总表 · §58.5 硬错表 · §32–§158 各批 |
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

## DeepSeek 批处理流水线

批量英译 / 结构化抽取 / 初筛走 `tools/llm/`（本地确定性脚本 → 官方 API；默认干跑、预算上限、可续跑、受控回写）。规程、存储与恢复、预算语义、Task 4 预留设计见 [`docs/llm-pipeline.md`](llm-pipeline.md)。
