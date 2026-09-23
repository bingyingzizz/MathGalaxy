# 数学星图 · 记号对照表

全图记号的唯一权威。写节点前先过此表；不合规的先转写再进图。

## 铁律（用户拍板）

- **A** 补集写 $A^{c}$（上标 c），不写上划线。
- **B** 包含写 $\subseteq$（下横）。
- **C** 真包含写 $\subset$（没有下横）—— $\subsetneq$ 是禁用写法。

## 通用规则

R1–R12（LaTeX 写法 / 对象语言⟷元语言 / 算子 / 省略号 / 上下划线 / 方向标记 / label / title）全文 `notation/0-rules.md`

## 记号条目（按分组）

- `notation/set.md` 逻辑与集合 39
- `notation/order.md` 序、基数与序数 18
- `notation/num.md` 数系与分析基础 26
- `notation/topo.md` 拓扑与度量 6
- `notation/measure.md` 测度与 σ-代数 24
- `notation/integral.md` 积分与函数空间 12
- `notation/letters.md` 字母约定 13

## 已知老账

- `title` 里仍有裸 Unicode 数学记号（`title` 也渲染 $…$，所以有和正文一样的字体问题）。当前只报**警告**，未批量清理。
- 正文里有把 `$$…$$` 当行内公式用的地方（`tools/_dollarcheck.mjs`）。

## 用法

不合规的先转写再进 `src/data/packs/`；正文出现裸 Unicode 数学符号或禁用写法时构建**直接失败**。

