# 英文陈述批次 2b · 待作者审校（T3.2）

> 批次：**T3.2 批次 2b**（2026-10-16，作者「继续，连着做」）。范围 = 枢纽榜**第 11–20 名**里剩下的 5 条
> （批次 2a 已做掉最短的 5 条：`def.section` / `thm.wellordering` / `thm.hausdorff` /
> `thm.cardinal-comparable` / `prop.adjoint-full-faithful`）。
>
> 本批 5 条 = `thm.monotone-class`（notes 1595）· `prop.section-measurable`（453）·
> `thm.quotient-product`（625）· `def.int`（289）· `ex.kan-extension`（491）。
> **批次 2 到此收口**：枢纽榜第 1–20 名的英文陈述全部译完（21 个节点 / 42 个字段，
> 其中批次 1 的 11 个节点已 reviewed）。
>
> 状态：本批 10 个字段全部 `draft` + `basedOn: 'v0.9.1#<中文底稿指纹>'`；只有作者能翻 `reviewed`。

---

## 一、逐条对照（陈述部分）

### 11. `thm.monotone-class`　单调类定理

| | |
|---|---|
| **中文原文** | 设 $\mathcal{E} \subseteq \mathcal{P}(X)$。则 …(1 条块级公式：$\mathcal{M}(\mathcal{E}) = \mathfrak{m}(\mathcal{E}) \iff$ 两条闭包条件)… |
| **英文译文** | Let $\mathcal{E} \subseteq \mathcal{P}(X)$. Then …(同一条公式，`\text{ 且}` 已在本批前置清理里换成 $\wedge$)… |
| 判断点 | 「代数 / 单调类 / $\sigma$ 代数」沿用批次 1 的译法（algebra / monotone class / $\sigma$-algebra）；`notes` 里的 ①②③ 三步照原结构译，公式一字不改 |

### 13. `prop.section-measurable`　截口可测

| | |
|---|---|
| **中文原文** | **(a)** 若 $E \in \mathcal{M} \otimes  \mathcal{N}$，则对一切 $x \in X$ 有 $E_x \in \mathcal{N}$，对一切 $y \in Y$ 有 $E^y \in \mathcal{M}$。**(b)** 若 $f$ 是 $\mathcal{M} \otimes  \mathcal{N}$-可测的… |
| **英文译文** | **(a)** If $E \in \mathcal{M} \otimes  \mathcal{N}$, then for every $x \in X$ we have $E_x \in \mathcal{N}$, and for every $y \in Y$ we have $E^y \in \mathcal{M}$. **(b)** If $f$ is $\mathcal{M} \otimes  \mathcal{N}$-measurable… |
| 判断点 | ⚠️ `\mathcal{M} \otimes  \mathcal{N}` 里的**双空格**照抄（公式不变量逐字比）· 「对一切」= for every（不用 all，保持与 (b) 的 every 一致）· notes 里那句「先看矩形、再看 $\sigma$ 代数」译成 the standard pattern "rectangles first, then $\sigma$-algebras" |

### 14. `thm.quotient-product`　商映射与局部紧空间作积

| | |
|---|---|
| **中文原文** | 设 $q : X \to Y$ 是**商映射**，$Z$ 是**局部紧 Hausdorff** 空间。则 …(1 条块级公式)… 也是商映射。 |
| **英文译文** | Let $q : X \to Y$ be a **quotient map** and $Z$ a **locally compact Hausdorff** space. Then … is again a quotient map. |
| 判断点 | 「商映射」= quotient map（不用 identification map）· notes 里的「逆映射连续法」译成 continuity of the inverse · 「紧邻域」= compact neighbourhood · ∎ 保留 |

### 15. `def.int`　整数 ℤ

| | |
|---|---|
| **中文原文** | 在 $\mathbb{N} \times \mathbb{N}$ 上定义 …(5 条块级公式：等价关系、$\mathbb{Z}$ 的定义、加法、乘法、序)… |
| **英文译文** | On $\mathbb{N} \times \mathbb{N}$ define …(同样 5 条公式，逐字)… |
| 判断点 | 「与代表元无关」= independent of the choice of representatives（数学里 standard 的说法）· notes 里「减法学不通」= subtraction does not work inside $\mathbb{N}$ |

### 20. `ex.kan-extension`　Kan 延拓的两个例子

| | |
|---|---|
| **中文原文** | **(1)** 图 $D : I \to \mathcal{C}$ 有余极限 $X$ $\iff$ 沿投影 $p : I \to \mathbf{1}$ 的左 Kan 延拓 $p_{!}D : \mathbf{1} \to \mathcal{C}$ 存在… **(2)** 函子 $F : \mathcal{C} \to \mathcal{D}$ 有右伴随 $G$ $\iff$ … |
| **英文译文** | **(1)** A diagram $D : I \to \mathcal{C}$ has a colimit $X$ $\iff$ the left Kan extension $p_{!}D : \mathbf{1} \to \mathcal{C}$ along the projection $p : I \to \mathbf{1}$ exists… **(2)** A functor $F : \mathcal{C} \to \mathcal{D}$ has a right adjoint $G$ $\iff$ … |
| 判断点 | 「恒等函子」= identity functor；`$1_{\mathcal{C}}$` 原样（不改成 $\mathrm{id}$）· notes 的「统一出口」= the unifying exit |

---

## 二、⭐⭐ 公式不变量又抓了一次（这是第三次，仍然是我错）

`ex.kan-extension`：「中英公式条数不等 —— 中（行内 12 / 块级 2） vs 英（行内 13 / 块级 2）」。
原因：我多写了一个 `$D$`（"the left Kan extension … of $D$ along the projection …"，
中文那里没有裸的 `$D$`）。删掉即过。

⇒ 三次抓错（`thm.hausdorff` 空格、`def.section` 重复 `$E$`、本批多余的 `$D$`）都是**我**的疏漏，
不变量每次都精准指出条数与多重集的差。**它值得一直留着。**

## 三、批次 3（枢纽榜第 21–30 名，下一步）

| 名次 | 节点 | 中文陈述 / notes | 备注 |
|---|---|---|---|
| 21 | `def.metric-space` | 426 / 186 | ✅ **已译**（试点三之一，reviewed）|
| 22 | `thm.saft` | 172 / 221 | 待译 |
| 23 | `def.outer-measure` | 239 / 275 | 待译 |
| 24 | `thm.real-uncountable` | 166 / 415 | 待译 |
| 25 | `prop.yoneda-embedding` | 159 / 267 | 待译 |
| 26 | `thm.metric-compact-equiv` | 83 / 350 | 待译 · ⚠️ 公式含汉字，要先清 |
| 27 | `def.shrinks-nicely` | 182 / 224 | 待译 |
| 28 | `def.complex-measure` | 212 / 136 | 待译 · ⚠️ 公式含汉字，要先清 |
| 29 | `def.essential-sup` | 283 / 206 | 待译 · ⚠️ 公式含汉字，要先清 |
| 30 | `prop.chaus-reflective` | 373 / 419 | 待译 |

⇒ 批次 3 = **9 条**（第 21 名已有），译完正好凑满决策 5.4 说的「扩到 30 条」。
三条要清公式的节点按决策①的流程**先改中文页**再译。
