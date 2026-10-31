# 英文摘要批次 4 · 待作者审校（C 档）

> 批次：**2026-10-31**。范围 = **枢纽榜前 30 里还没有英文摘要的那 9 个** ——
> 这一批做完之后，`dist/hubs.md` 那张榜的前 30 名**全部**有英文摘要（30/30）。
>
> 译文位置：`src/data/i18n/abstracts.en.js`（按 id 旁挂；中文 `src/data/packs/*.js` 仍是唯一真源）。
> 状态：**9 条全是 `draft`** —— 摘要属「创译型」内容，agent 起草，**只有作者能改 reviewed**。
> `basedOn` 用的是该节点 `statement + '\n' + notes` 的 `MG.zhHash` 指纹（内容版本 `v0.9.1`），
> `bun tools/i18n-status.mjs` 复核：`合计 103 条 —— reviewed 90 · draft 13 · stale 0`。

## 本批 9 条

| # | 节点 | 中文名 | 摘要说了什么 |
|---|---|---|---|
| 1 | `def.submanifold-volume` | 诱导体积 | 为什么体积形式不能拉回（次数太高 ⇒ 零），以及诱导度量 / 超曲面情形的内乘形式 |
| 2 | `thm.de-rham` | de Rham 定理 | 积分配对、与拉回兼容 ⇒ 分次代数的自然同构 |
| 3 | `thm.urysohn-metrization` | 乌雷松度量化定理 | 嵌入可分度量空间的三步（Lindelöf → 正规 → Urysohn 函数） |
| 4 | `prop.paracompact-partition-unity` | 仿紧性与单位分解 | 两条等价，以及它是「局部 → 整体」的桥 |
| 5 | `def.lp-norm` | L^p 范数 | 定义、等价类、`p<1` 只有拟范数 |
| 6 | `def.tensor-field` | 张量场 | 逐点多线性 + 张量丛的维数，以及「变换律只含一阶导」 |
| 7 | `thm.gauss-bonnet` | 高斯博内定理 | 公式、闭曲面情形、总曲率是拓扑量（球面/环面/亏格 g） |
| 8 | `def.smooth-manifold` | 光滑流形 | 图册极大化为什么必要、三个拓扑条件的分工、光滑结构不是拓扑不变量 |
| 9 | `def.path-homotopy` | 道路同伦 | 定义、为什么必须钉死端点、同伦类是基本群的元素 |

## 体检

| 项 | 结果 |
|---|---|
| `bun tools/build.mjs` | ✓（含摘要的硬断言：非空、无汉字、无禁用命令、status/basedOn 齐全） |
| `bun tools/i18n-status.mjs` | ✓ 103 条：reviewed 90 · draft 13 · stale 0 |
| `bun tools/doccheck.mjs` / `xlinkcheck.mjs` / `searchcheck.mjs` | ✓ |
| 摘要进检索 hay 引起的两处重钉 | `isomorphism` 13→14（`thm.de-rham` 摘要含 "natural isomorphism"）、`compact` total 78→79（`thm.gauss-bonnet` 摘要含 "compact orientable surface"） |

## 还没做的

- 剩下 1258 个节点没有英文**陈述**（只有英文名）。这些要逐句对译，量大；
- 其中 **76 个节点的公式里夹着汉字**（`i18n/formula-han.md`），**必须先改公式**才能加译文；
- 边的证明（`proofs/`）不在任何一批的范围里 —— 英文页一律注明「证明仍以中文页为准」。
