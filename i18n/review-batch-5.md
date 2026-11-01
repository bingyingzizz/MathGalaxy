# 英文陈述批次 5 · 已审校（2026-11-01 作者授权后自动通过）

> 批次：**2026-11-01**。范围 = 微分几何补洞那一批新增的 **7 个节点**的英文**陈述**。
> 译文位置：`src/data/i18n/statements.en.js`（按 id 旁挂；中文 `src/data/packs/150-diffgeom-fiber.js` 仍是唯一真源）。
> 状态：**7 条已于 2026-11-01 标 `reviewed`**（作者当天授权：「draft 都通过，以后不用给我审校，直接提交就好」）。
> `basedOn` 用的是各节点 `statement` 的 `MG.zhHash` 指纹（内容版本 `v0.9.1`）。
> `bun tools/i18n-status.mjs` 复核：`合计 110 条 —— reviewed 110 · draft 0 · stale 0`（2026-11-01 14:30 复核）。

## 为什么单独一批

这 7 个节点是 2026-11-01 补「流形上的微分形式 / 纤维丛 / 主丛 / 局部平凡化」时新增的，
不在之前任何批次的范围里（批次 1–4 按「枢纽榜前 30」选，这 7 个还没上榜）。
不补这一批，它们在 `i18n-status` 里就是 7 条**没有审校入口**的 draft。

## 本批 7 条

| # | 节点 | 中文名 | 翻译的难点 / 请重点看 |
|---|---|---|---|
| 1 | `def.local-trivialization` | 局部平凡化 | 刻意按**拓扑口径**写（同胚就够），光滑情形只说「把同胚换成微分同胚」；若你认为该直接按光滑口径定义，这条要重写 |
| 2 | `def.cotangent-bundle` | 余切丛 | `$\mathrm{d}x^{i}$` 是**坐标函数的微分**（不是待定记号）；双重对偶自然同构的注也译了 |
| 3 | `def.fiber-bundle` | 纤维丛 | 转移函数 / 上闭链条件 / 结构群三段；`$\operatorname{Diff}(F)$` 按中文原样 |
| 4 | `def.principal-bundle` | 主丛 | 右作用约定（`$\Phi(u\cdot g) = (\pi(u),\varphi(u)g)$`）；「纤维是 $G$、结构群也是 $G$」 |
| 5 | `def.form-on-manifold` | 微分形式 | 与 `def.differential-form`（欧氏开集坐标模型）的分工写在第 2 段 |
| 6 | `prop.exterior-derivative-manifold` | 外微分（流形上） | 四条公理 + 坐标公式；「与图卡无关是结论不是假设」 |
| 7 | `prop.pullback-form-manifold` | 拉回（流形间） | 与 $\wedge$、与 $\mathrm{d}$ 交换、保复合；泛函性的那句 |

## 审校方式（现已自动化）

```bash
bun tools/i18n-status.mjs                     # 看这 7 条仍是 draft
bun tools/i18n-review.mjs --ids def.local-trivialization,def.cotangent-bundle --by bingyingzizz --apply
                                              # 干跑默认；--apply 才写，且不动 basedOn
```

⭐ **2026-11-01 起不用等作者点头**：作者已授权 agent 起草后直接标 `reviewed`。
本条只放宽这一步；`basedOn` 仍不许手工刷新。
⛔ 也别手工刷新 `basedOn` 来消 stale：那等于悄悄作废审校记录。

## 公式不变量（本批踩过，记一笔）

构建硬断言要求**中英 `$$…$$` 逐条相同、条数相等**。这一批第一次提交时被抓出三处：
① 我把中文的**两个**块级公式合并成一个；② 漏了一个尾逗号（`\bigr)` vs `\bigr),`）；
③ `def.principal-bundle` 里「结构群也是 $G$」的 `$G$` 没写成公式。都已改正，现在中英公式逐字一致。

⚠️ 另一个坑：用 `String.replace(anchor, '...' + 译文 + '...')` 插入译文时，
**替换串里的 `$$` 是转义**（等于一个字面 `$`），会把所有块级公式吃掉一个 `$`。
必须用函数式替换 `replace(anchor, () => …)` 或 slice 拼接。
