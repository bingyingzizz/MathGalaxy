# 数学审计问题登记簿（生命周期；规程见 [workflows/audit.md](workflows/audit.md)）

> 与 `docs/source-review-register.md` 的分工：**那份**记录翻译流水线发现的中文源文问题（其 `open` 条目会在代码里**搁置**对应译文）；**本份**记录数学审计的问题与历史候选，**不触发任何代码行为**。同一问题可在两处各有一行，互相引用即可。
> 阶段（典型路径，可回退/重开，历史只追加不改写，见 audit.md §6）：`detected → confirmed|rejected → repair-planned → repaired → verified → built → published → closed|deferred`。**uncertain ≠ confirmed**。
> 「证据」列是**证据溯源**（`verified-by-source` 已对源/源码核实 · `reasoned` 数学推理未对外源 · `hypothesis`），**不是**数学有效性结论。
> **条目初始状态都是 `detected`**——来自 `docs/audit-investigation-task2.5.md`，当时只读调查，**没有修任何东西**；证据等级沿用该报告的标注。源版本：`89265897a`（Task 2.6 开工时 HEAD；这些节点自 Task 2.5 起未改）。
> 不在此处导入的：`_audit/问题清单-v2-2026-11-03.md` §24 的 **1199 条去重候选**（候选，不是已确认错误；不得丢弃，也不得盲修）。分诊战役中先按本表阶段推进，**不重做**历史上的整站审计。

| id | 对象 | 疑点 | 证据 | 阶段 | 备注（保持不确定性） |
|---|---|---|---|---|---|
| AR-1 | `thm.goldstine` Notes + `imp.goldstine-hahn-banach` | Notes 对偶配对类型错（$\xi(x_j)$，$x_j\in X$；$(X^{**},w^*)^*$ 写成 $J_X(X)$）；边上 Minkowski 泛函 $p(-\xi_0)>1$ 与 $-\xi_0\in C$ 矛盾；Notes 与边各有一份**互不一致**的证明 | 类型错/内部矛盾：已核实；延拓与 $C$ 吸收性：reasoned | detected | 定理本身成立；错在书写与证明细节。曾被人工复核判为正确；从未被 `_proofs` 覆盖 |
| AR-2 | `thm.lambek` Notes 第二步 / `imp.lambek` | Notes 第二步左右模记账错、「蛇引理」用错位置；边已修过但 Notes 里另一份未同步；陈述收窄为 Noether | 类型错：已核实；收窄：reasoned | detected | **边证明的剩余数学有效性未完全确立**；历史复核核对的是字句不是整段 |
| AR-3 | `thm.top-cond-adjoint` | 陈述「右伴随」方向疑反（$Z\mapsto Z(\cdot)$ 是 $X\mapsto\underline X$ 的左伴随） | reasoned | detected | Le Stum Thm 4.2.4 只写 adjoint、未写左右；「右」是图里加的 |
| AR-4 | `cor.cg-exponential-adjoint` | Notes 证明用余反射给 $\mathrm{Hom}(kA,Z)=\mathrm{Hom}(A,Z)$，方向反 | reasoned | detected | 另有「余极限万有」与 Alexandrov 反例 vs Le Stum Cor 2.3.7 **互相冲突，未裁决** |
| AR-5 | `thm.stone-profinite` Notes | 写「余极限」，Le Stum Prop 2.2.9 证明写 limit | verified-by-source（Le Stum 文本） | detected | |
| AR-6 | `ex.sierpinski-space` | 标题「连通但非道路连通」，Notes 写其实道路连通；标题未随 FIX-007 更新 | 自相矛盾：已核实；Notes 对：reasoned | detected | |
| AR-7 | `prop.coproduct-chaus` Notes | 「无限不交并一般不紧所以余积只对有限族」疑错（CHaus 有任意余积） | reasoned | detected | v2 §24 已标 `M2 B?`，从未分诊；该句是图里加的，非 Le Stum |
| AR-8 | `thm.separable-hilbert-is-l2` Notes | Cauchy 估计用 $J\setminus J'$，应为 $J\triangle J'$（边写对了） | verified-by-source（对照边） | detected | Notes 与边重复且不一致 |
| AR-9 | `thm.metric-compact-equiv` | 评审称 Notes 缺完备性条件 | — | detected（未复现） | **现行源文未复现**（陈述 (c) 已含「完备且全有界」，证明在边上）；搬迁前 Notes 未核；节点带「假设：完备」标签值得人看一眼 |
| AR-10 | 全站 Notes 与边的重复/残留证明 | 粗扫（`bun tools/_proofaudit.mjs`，**正则启发式候选，不是严格的上界或下界，也不是语义结论**；数字随图变化，以当次输出为准）：对定理/引理/命题/推论分出「边上有证明 / 仅 Notes 命中标记 / 两处皆无」，并列出「边+Notes 同时命中标记」的重复候选 | heuristic（启发式） | detected | 旧版曾粗估 240 / 43，口径不同；不是 Notes 里有完整证明的计数；分诊需语义判断，**不批量迁移** |

## 不属于「错误」的保留项

- Le Stum 的归属本身有证据支持，**不是**已识别的错误（Task 2.5 §4 末）。
- 同一定理的多种不同有效证明合法，不应因「重复」被合并。
