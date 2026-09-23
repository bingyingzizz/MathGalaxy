# 数学星图 · 记号对照表

全图记号的唯一权威。写节点前先过此表；不合规的先转写再进图。

## 铁律（用户拍板）

- **A** 补集写 $A^{c}$（上标 c），不写上划线。
- **B** 包含写 $\subseteq$（下横）。
- **C** 真包含写 $\subset$（没有下横）—— $\subsetneq$ 是禁用写法。

## 通用规则

R1–R12（LaTeX 写法 / 对象语言⟷元语言 / 算子 / 省略号 / 上下划线 / 方向标记 / label / title）全文 `dist/notation/0-rules.md`

## 记号条目（按分组）

- `dist/notation/set.md` 逻辑与集合 39
- `dist/notation/order.md` 序、基数与序数 18
- `dist/notation/num.md` 数系与分析基础 26
- `dist/notation/topo.md` 拓扑与度量 6
- `dist/notation/measure.md` 测度与 σ-代数 24
- `dist/notation/integral.md` 积分与函数空间 12
- `dist/notation/letters.md` 字母约定 13

## 已知老账

（当前没有 —— title 的裸 Unicode 与行内 `$$…$$` 都已清掉，构建拦着不再复发。）

## 用法

不合规的先转写再进 `src/data/packs/`；正文出现裸 Unicode 数学符号或禁用写法时构建**直接失败**。

