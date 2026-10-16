# 英文陈述批次 2a · 待作者审校（T3.2）

> 批次：**T3.2 批次 2a**（2026-10-16，接在批次 1 之后 —— 作者批复「标，接着干没做完的」）。
> 范围：枢纽榜**第 11–20 名**里**最短的 5 条**（其余 5 条的 `notes` 较长：453–1595 字符，
> 放批次 2b 一次做完 —— ⛔ 不是忘了）。
>
> | 名次 | 节点 | 中文陈述 | notes | 本批 |
> |---|---|---|---|---|
> | 11 | `thm.monotone-class` | 246 | 1595 | 2b（公式已清）|
> | 12 | `def.section` | 247 | 116 | ✅ 本批 |
> | 13 | `prop.section-measurable` | 258 | 453 | 2b（公式已清）|
> | 14 | `thm.quotient-product` | 130 | 625 | 2b |
> | 15 | `def.int` | 468 | 289 | 2b |
> | 16 | `thm.wellordering` | 144 | 125 | ✅ 本批（公式已清 + 名字去掉了年份）|
> | 17 | `thm.hausdorff` | 220 | 76 | ✅ 本批（名字去掉了年份）|
> | 18 | `thm.cardinal-comparable` | 96 | 190 | ✅ 本批（公式已清）|
> | 19 | `prop.adjoint-full-faithful` | 136 | 124 | ✅ 本批（公式已清）|
> | 20 | `ex.kan-extension` | 491 | 78 | 2b |
>
> 状态：本批 10 个字段全部 `status: 'draft'`、`basedOn: 'v0.9.1#<中文底稿指纹>'`
> —— **只有作者能翻 `reviewed`**（判决式见 `i18n/review-batch-1.md` 第零节；
> 翻法：`bun tools/i18n-review.mjs --ids … --by … --apply`）。

---

## 一、逐条对照（陈述 = 被引用的最小单位）

### 12. `def.section`　截口

| | |
|---|---|
| **中文原文** | 设 $E \subseteq X \times Y$。对 $x \in X$、$y \in Y$ 定义 …(两条块级公式)… 分别叫 $E$ 在 $x$ 处的**纵截口**与在 $y$ 处的**横截口**。类似地，对函数 $f : X \times Y \to \mathbb{C}$ 定义 …(一条块级公式)… |
| **英文译文** | Let $E \subseteq X \times Y$. For $x \in X$ and $y \in Y$ define … called respectively the **vertical section** of $E$ at $x$ and the **horizontal section** at $y$. Similarly, for a function $f : X \times Y \to \mathbb{C}$ define … |
| 判断点 | 「纵/横截口」= **vertical / horizontal section**（Folland 的用法）；`refs` 里就是 Folland §2.5，术语照书 |

### 16. `thm.wellordering`　良序定理

| | |
|---|---|
| **中文原文** | 每个集合都能被赋予一个良序：对任何集合 $X$，都存在 $X$ 上的良序关系 $\preceq$。换句话说：任何集合 $X$ 都与某个序数等势。特别地，每个集合都有基数；实数集上存在良序（但这个良序无法被显式写出）。 |
| **英文译文** | Every set can be given a well-ordering: for any set $X$ there is a well-ordering relation $\preceq$ on $X$. In other words: every set $X$ is equinumerous with some ordinal. In particular, every set has a cardinality, and the real line admits a well-ordering (though this well-ordering cannot be written down explicitly). |
| 判断点 | 「等势」= **equinumerous**（全库统一写法）· 「无法被显式写出」= cannot be written down explicitly（不用 non-constructive，因为这里说的是这条**具体**良序 |

### 17. `thm.hausdorff`　Hausdorff 极大原理

| | |
|---|---|
| **中文原文** | 设 $(P, \preceq )$ 是偏序集，$C_{0} \subseteq P$ 是链。则存在 $P$ 的**极大链** $M$ 使 $C_{0} \subseteq M$。其中「极大链」指在包含关系 $\subseteq$ 下极大的链：… |
| **英文译文** | Let $(P, \preceq )$ be a poset and $C_{0} \subseteq P$ a chain. Then there is a **maximal chain** $M$ of $P$ with $C_{0} \subseteq M$. Here "maximal chain" means a chain that is maximal under inclusion $\subseteq$: … |
| 判断点 | 「偏序集」这里用 **poset**（与 `lem.zorn` 的英文一致）· 引号里的定义句按英文习惯用双引号 |

### 18. `thm.cardinal-comparable`　基数可比定理

| | |
|---|---|
| **中文原文** | 在**选择公理**下：对任意两个集合 $A$、$B$，必有 $|A| \le |B|$ 或 $|B| \le |A|$。即任意两个基数都可以比较大小。 |
| **英文译文** | Under the **axiom of choice**: for any two sets $A$ and $B$ we have $|A| \le |B|$ or $|B| \le |A|$. That is, any two cardinals are comparable. |
| 判断点 | 「基数可比定理」在英文里没有专名，陈述里照字面译（**没有**给定理编一个名字） |

### 19. `prop.adjoint-full-faithful`　全忠实与单位

| | |
|---|---|
| **中文原文** | 设 $F \dashv G$，单位 $\eta$、余单位 $\varepsilon$。则 $F$ **全忠实** $\iff$ $\eta$ 是同构；$G$ **全忠实** $\iff$ $\varepsilon$ 是同构。 |
| **英文译文** | Let $F \dashv G$ with unit $\eta$ and counit $\varepsilon$. Then $F$ is **fully faithful** $\iff$ $\eta$ is an isomorphism; $G$ is **fully faithful** $\iff$ $\varepsilon$ is an isomorphism. |
| 判断点 | 中文把 $\iff$ 单独写成行内公式，英文**逐字照搬**（公式不变量要求多重集相同）·「全忠实」= fully faithful（全库统一） |

---

## 二、本批顺带做掉的（都在提交里）

1. **中文页公式清汉字**（决策①的闸门要求：要翻译就必须先把汉字移出公式）：
   - `thm.wellordering`：`$$\forall X \exists\preceq ( \preceq\text{ 是} X\text{ 上的良序关系} )$$`
     ⇒ 改成散文「对任何集合 $X$，都存在 $X$ 上的良序关系 $\preceq$。」（删掉那条把散文复述一遍的块级公式）
   - `thm.cardinal-comparable`：`$$|A| \le |B| \quad \text{或} \quad |B| \le |A|$$`
     ⇒ 「必有 $|A| \le |B|$ 或 $|B| \le |A|$。」（两条行内，`或` 回到散文）
   - `prop.adjoint-full-faithful`：`$$F \text{ 全忠实} \iff \eta \text{ 是同构}, \qquad …$$`
     ⇒ 「则 $F$ **全忠实** $\iff$ $\eta$ 是同构；$G$ **全忠实** $\iff$ $\varepsilon$ 是同构。」
   - `thm.monotone-class`（批次 2b 的节点，顺手清）：`\text{ 且}` ⇒ `\ \wedge\ `
   - `prop.section-measurable`（批次 2b 的节点，顺手清）：notes 里 `\text{ 且}` ⇒ `\ \wedge\ `
   ⇒ 待办账从 **83 条降到 79 条**（`i18n/formula-han.md` 已重算）。
2. **两个英文名去掉年份**（批次 2 正好碰上了）：`thm.wellordering` 的
   `title_en` 原本是 `Well-Ordering Theorem, Zermelo 1904`、`thm.hausdorff` 是
   `Hausdorff Maximal Principle, 1914` —— 年份是**从 title 括号里带出来的**。
   改法：把括号里的年份删掉（年份在 `notes` 与 `refs` 里都写着）⇒ 现在是
   `Well-Ordering Theorem` / `Hausdorff Maximal Principle`，`label_en` 一并拿到了小写形式。

## 三、⭐⭐ 公式不变量当场抓住了我两次（记下来）

第一次跑构建时报两条，都是**真错**（不是断言太严）：

1. `thm.hausdorff`：「中英公式多重集不同 —— 只在中文里 `M \subseteq M' \subseteq P`」——
   我照着**转写稿**里的双空格写成了 `M'  \subseteq P`，而 pack 里的原文是**单空格**。
2. `def.section`：「中英公式条数不等 —— 中（行内 7 / 块级 3） vs 英（行内 8 / 块级 3）」——
   我把 `$E$` 写了两遍（"section of $E$ at $x$ … section of $E$ at $y$"），中文只出现一次。

⇒ 这说明那条不变量**不是装饰**：它逼着我逐字对齐公式，而不是「看起来差不多」。
（也说明转写稿不能当原文抄 —— 以 pack 为准。）

## 四、批次 2b（等这批看完，或直接接着做）

`thm.monotone-class`（notes 1595）· `prop.section-measurable`（453）· `thm.quotient-product`（625）·
`def.int`（289）· `ex.kan-extension`（491）。这五条的公式里含汉字的那两处**已经清干净**了，
直接写译文即可。
