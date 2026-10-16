# 英文陈述批次 3b · 待作者审校（T3.2 · **30 条目标达成**）

> 批次：**T3.2 批次 3b**（2026-10-16，作者「继续」）。范围 = 枢纽榜第 21–30 名剩下的 5 条：
> `def.outer-measure` · `thm.real-uncountable` · `prop.chaus-reflective` · `def.complex-measure` ·
> `def.essential-sup`。
> ⇒ **枢纽榜前 30 名的英文陈述全部译完：30 个节点 / 60 个字段** ——
> 这正是决策 5.4 说的「英文陈述扩到 30 条」。
>
> 状态：本批 10 个字段 `draft` + 现算指纹；累计 **draft 38 · reviewed 22 · stale 0**。

## 一、逐条判断点

| 节点 | 关键译法 |
|---|---|
| `def.outer-measure` | 「次可加」= **sub**additive（不是 countably additive）· 「表现良好」= behave well（Carathéodory）· Lebesgue 那个例子照原文保留 $\inf\{\sum(b_n-a_n)\}$ |
| `thm.real-uncountable` | 「闭区间套 + 对角线」= nested closed intervals + diagonalisation · 「完备性」= completeness（并注明 = 确界原理）· 「稠密与一样多是两回事」= "dense" and "equally many" are two different things |
| `prop.chaus-reflective` | Stone–Čech 保留变音符 · 「Tychonoff 方块」= Tychonoff cube · $T_{3.5}$ 保留 · 推论那句用 "a reflective subcategory is closed under limits" 收口 |
| `def.complex-measure` | 「自动有限」「自动绝对收敛」两个 **automatically** 照留（原文的强调）· $\pm\infty$ 原样 |
| `def.essential-sup` | 「本性」= essential（并解释 bad values on null sets do not count）· 「是可以取到的」= is attained · 与 $\sup|f|$ 的对比照译 |

## 二、⭐ 公式不变量第四次抓到我（这次是**换行符**）

`def.essential-sup`：报「中英公式多重集不同 —— 只在中文里 `B:\nL^\infty(...)\n`」。
原因：中文那条块级公式的源码是 `'$$\nL^\\infty…'` —— `\n` 是**真换行**（JS 转义），
而我写成了 `'$$\\n…'`，于是公式里多了一个**字面反斜杠 + n**。
改成真换行即过。（前三次：空格、重复 `$E$`、多余 `$D$`。）

⇒ 四次全是我的疏漏，不变量每次都精确到「哪个字符、哪一条」。它值得一直留着。

## 三、验收

- `bun tools/build.mjs` 通过：英文陈述 **30 个节点 / 60 个字段 —— draft 38 · reviewed 22 · stale 0**；
  另有 76 个未翻译节点的陈述公式含汉字（账本 `i18n/formula-han.md`）。
- 待办账在本轮前置清理里从 79 降到 **76**（`thm.metric-compact-equiv` / `def.complex-measure` /
  `def.essential-sup` 三条的中文页公式已清）。

## 四、下一步（可选，都不是「没做完」了）

1. **审校**：批次 2a/2b/3a/3b 共 19 个节点 / 38 个字段仍是 `draft`，等你过一遍（翻法一行命令）。
2. 批次 2/3 的**摘要**（19 条）也还没审（`abstract_en`）。
3. 英文陈述若要继续扩，下一个 30 名已不是枢纽榜（入度 ≤3），要不要扩由你定。
