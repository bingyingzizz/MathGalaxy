# 二级命中清单（title 定下来的英文名）

> 由 `bun tools/i18n-backfill.mjs` 现算，共 **3** 条（占全部 1288 个节点）。
> 规则（作者 2026-10-16 拍板）：候选 = 该节点 aka 里**名字样**的英文条目；
> 匹配 = **大小写不敏感 + 词边界精确匹配**，**只扫 title**；恰好命中一个才采用；
> 值取 **aka 源字符串**。⛔ 不做子串、不做词形还原、不扩大到 label / statement。
> 这不是猜：命中的那个写法是作者自己写在 title 里的。
> ⚠️ 二级是**消歧**规则 —— 候选集与一级同源（同一道 nameLike 闸门），
> 只有缩写当候选那 4 条（`kC(X,Y)` / `NBV` / `AB6` / `qcqs`）没收进来，它们留在 gaps 里。

**整批回滚**：把下表里的 id 从 `src/data/i18n.js` 删掉再重跑构建即可；
要永久排除就改 `src/data/aliases.js` 的 aka 或节点 title（它们是唯一真源）。

| # | 节点 id | 中文名 | 采用（aka 源字符串） | title 里的写法 | 备注 | title |
|---|---|---|---|---|---|---|
| 1 | `lem.fatou` | Fatou 引理 | `Fatou's lemma` | `Fatou's Lemma` ⚠️ |  | Fatou 引理（Fatou's Lemma） |
| 2 | `def.hausdorff` | Hausdorff 空间 | `Hausdorff` | `Hausdorff` |  | Hausdorff 空间 / $T_{2}$ |
| 3 | `thm.tykhonov` | Tychonoff 定理 | `Tychonoff` | `Tychonoff` |  | Tychonoff 定理：紧空间的任意积紧 |

「备注」列只写机械看得出来的事实（节点含两个概念 / title 里是 LaTeX 符号），不猜。
---

## ⚠️ 跨节点重复的 title_en（0 组，只记录、不自动改）

（无）

## 大小写差异（1 处，只记录）

aka 里写作一种大小写、title 里写作另一种 —— 采用的一律是 **aka 源字符串**。

| 节点 id | aka 源字符串（采用） | title 里的写法 |
|---|---|---|
| `lem.fatou` | `Fatou's lemma` | `Fatou's Lemma` |

## 形差：title 里有更长的英文写法（0 处，只记录）

title 括号里的英文与采用的名字「互相包含」（如 aka `limit` / title `Limit of a Sequence`）。
按护栏**值取 aka 源字符串**，所以这里不改 —— 要改成 title 那种更正式的写法请说一声。

（无）
