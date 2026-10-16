# 英文陈述批次 3a · 待作者审校（T3.2）

> 批次：**T3.2 批次 3a**（2026-10-16，作者「继续」）。范围 = 枢纽榜第 21–30 名里 notes 较短的 4 条：
> `thm.metric-compact-equiv`（83/350）· `thm.saft`（172/221）· `prop.yoneda-embedding`（159/267）·
> `def.shrinks-nicely`（182/224）。
> ⏭ **3b（还剩 4 条）**：`thm.real-uncountable`（166/415）· `def.outer-measure`（239/275）·
> `def.complex-measure`（212/136）· `def.essential-sup`（283/206）· `prop.chaus-reflective`（373/419）
> —— 前三条的公式含汉字**已在本批前置清理里清干净**，3b 直接写译文即可。
>
> 状态：本批 8 个字段全部 `draft` + 现算指纹；只有作者能翻 `reviewed`。

## 一、逐条判断点

| 节点 | 关键译法 |
|---|---|
| `thm.metric-compact-equiv` | 「列紧」= **sequentially compact**（不用 countably compact）· 「全有界」= totally bounded · 「坏球法」= the "bad balls" argument · DC 保留（依赖选择原理那一步限定为 **DC**，照原文） |
| `thm.saft` | SAFT 名字照原文保留（没有展开成 special adjoint functor theorem 之外的东西）· 「保持所有极限」= preserves all limits · 构造里的 $X \downarrow G$、$\varprojlim$ 一字不改 |
| `prop.yoneda-embedding` | 「米田嵌入」= **Yoneda embedding** · $\widehat{\mathcal{C}}$ 原样（不写成 $\mathbf{Set}^{\mathcal{C}^{op}}$）· 「补全一个范畴」= "completing" a category（引号照留）|
| `def.shrinks-nicely` | 「可缩地趋于 $x$」= **shrink nicely to $x$**（Folland 的原话；不是 shrinks to，也不是 contractible）· 「不能太瘪」= not too flat · 「细长的薄片」= a long thin sliver |

## 二、本批前置：三条中文页公式清汉字（决策①的闸门）

| 节点 | 改法 |
|---|---|
| `thm.metric-compact-equiv` | `$$X\text{ 紧} \iff X\text{ 列紧} \iff X\text{ 完备且全有界}$$` ⇒ 散文 + 三条行内：「…彼此等价：$X$ 紧 $\iff$ $X$ 列紧 $\iff$ $X$ 完备且全有界。」|
| `def.complex-measure`（3b 的节点）| `$$\nu( \bigsqcup_j E_j ) = \sum_j \nu(E_j),\text{ 右边的级数绝对收敛}$$` ⇒ 公式只留恒等式，那句说明移到公式后的散文 |
| `def.essential-sup`（3b 的节点）| 集合构造式里 `f \text{ 可测}` ⇒ 移到散文：「对**可测**函数 $f : X \to \mathbb{C}$（可测性的定义见「可测函数」）令 …」|

⇒ 待办账 **79 → 76 条**（`i18n/formula-han.md` 由 `_tools/_handebt.mjs --write` 现算重写）。

## 三、验收

- `bun tools/build.mjs` 通过：英文陈述 **25 个节点 / 50 个字段 —— draft 28 · reviewed 22 · stale 0**。
- `bun tools/_katexcheck-all.mjs` 无硬失败。
- 本批**一次通过公式不变量**（前两批各被抓一处，见 2a/2b 的批次文件）——公式逐字比的是**多重集**，
  顺序可随语序变，内容不行。
