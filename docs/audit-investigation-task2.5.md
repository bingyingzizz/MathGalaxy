# Task 2.5 调查报告：历史审计与证明迁边为何没拦住错误（2026-11-24）

> 只读调查，未改任何数学内容、未 build、未发布、未调用付费 API。给 Task 2.6 用。
> 记号：**[已核实]** = 我在本次调查里对着源码/记录/Le Stum 原文核过；**[推理]** = 我的数学推理，未对照外部来源；**[假说]** = 无直接证据。
> 外部评审的结论一律当「待核对的线索」，不当数学裁决。

## 1. 历史记录是否还在

| 记录 | 状态 |
|---|---|
| `_audit/问题清单-v2-2026-11-03.md`（16k 行，1.7 MB） | 在，完整 |
| `_audit/review/2026-11-05-status-reconciliation.md`（AUD-002） | 在 |
| `_audit/_proofs/`（2408 个文件：`P-*.txt` 提示词、`out-*.txt` 回执、`manifest-*.json`） | 在，完整 |
| `_audit/proof/*-报告.md`、`_audit/out/AUD-proof-move-1.md`、`_audit/out/hidden_scan2.{mjs,json}` | 在 |
| `_audit/待修总表-2026-11-11.md`、`待修-提示词.md` | 在 |
| `docs/archive/HANDOVER-2026-11-09.md` | 在 |
| `B:\MathGalaxy-archive\item8-audit-loose.tar.gz` | 只含 `_audit/build-*.log` 之类的散日志（75 项），**与本调查无关** |
| `_pdf/book/book.txt` | 在。是 Le Stum（2025-03-10 版）的文本，下文 Le Stum 核对用的就是它 |

结论：**Task 1 清理和迁移没有丢本调查需要的记录，不需要从宿主备份恢复任何文件。**

找不到的：
- 外部评审的原始报告（任务书转述了结论，但没有原文）。
- Conway / Brezis / Lambek / Rotman 的原书（Goldstine、Lambek 两条无法对照原书，下文只能做数学推理）。

## 2. 历史战役的真实范围与方法

### 2.1 v2 / `_proofs` 审计战役

- 由 `_audit/_proofs/P-*.txt` 提示词驱动，回执在 `out-*.txt`。回执头部记录：模型为 `gpt-6-sol` / `gpt-6.1-sol`，`reasoning effort: none`，**1164 份回执全部是 none** [已核实：`grep -h "^reasoning effort:" _audit/_proofs/out-*.txt`]；沙箱只读，每份提示词只让审一类问题。
- 提示词族按「一个判据一次」切分，互相排除：
  - `P-AS*`（`P-AS1-01.txt`）：**只看节点陈述的假设遗漏**，要求给反例；明确写「证明里缺细节 / 证明不完整 → 不报（另一类任务）」。**不读 Notes。**
  - `P-ANA-*`、`P-L*`、`P-RF*`：读「边 id + 目标陈述 + 边证明」，按 (a)–(h) 找错。**读边，不读节点 Notes。**
  - `P-DG-*`：只判定义引用边的依赖是否真实。
- 汇总：`待修总表-2026-11-11.md` 第 6 行写明「历史 1361 条不逐条重开」；`问题清单-v2` §24 的 1199 条（去重）是**自动汇总的候选**，标志 `A?`/`B?` 是「待核」。没有找到逐条分诊、逐条销账的记录 [已核实]。

### 2.2 人工/会话复核

- `AUD-002`（2026-11-05）：对 19 条硬错逐条复核，结果「2 已修 / 3 部分 / 14 未修」。同一份报告也纠正了更早完成报告里的数字（「已修 4/15」「20 个提交」「13 条证明全部做完」等）。
- `问题清单-v2` §87 / §91 等：按「上一轮指出的问题是否已改」逐项复核。
- `问题清单-v2` §145（AUD-069，2026-11-11）：复核新写的功能分析节点，含 Goldstine。

### 2.3 证明迁边战役（都在 2026-11-19）

| 提交 | 内容 |
|---|---|
| `e6c9f1461` | 137 条 proof 从节点注搬到边（`194-proof-edges.js`） |
| `a8a946c25` | 35 条「隐藏证明」搬到边 |

- 审计 `AUD-proof-move-1` 的方法是用 `audit-proof-move.mjs` 检查**搬出的文本是否来自原 notes（`inOrig=true`）**，再查 target / sources / layer。总判写「未发现把非证明段误删」。它检查的是**搬运保真度**，不是数学正确性。
- 「隐藏证明」选取规则（`_audit/out/hidden_scan2.mjs`）：notes ≥ 200 字、不以「证明」开头，且 **`∎|\blacksquare|□|QED` 出现在 notes 最后 80 个字符内**。已有 proof 边的 25 条「中置信」（notes 里的证明是重复）**明确标为不处理**（`_audit/proof/隐藏证明迁边-35条-报告.md` 末尾「未处理」）。

### 2.4 当时的验收门

`docs/archive/HANDOVER-2026-11-09.md`「体检五步」：build、`_katexcheck`、doccheck、searchcheck、clustercheck，外加 `_slashcheck`、`_ctrlscan`。这些门查的是格式、计数、搜索基准、反斜杠、层方向。**没有一道门检查数学正确、Notes 与边的证明是否重复、左右模/配对类型是否一致。**
`tools/_proofaudit.mjs` 把「Notes 里有 ∎/证明」「有带 proof 的入边」当作**等价的「有证明」**（`a)`/`b)`/`c)` 三选一），即工具本身把双份证明视为合规。

## 3. 两个主案例

### 3.1 `thm.goldstine` / `imp.goldstine-hahn-banach`

**当前文本（源码 `src/data/packs/161-functional-analysis.js:1291–1311` 一带；`dist/nodes/thm.goldstine*.md` 与已发布副本 `dist-site/mathgalaxy/nodes/…` 逐字节相同，英文页镜像同样的写法）：**

1. Notes「准备」：「设 $\ell$ 是 $(X^{**},w^*)$ 上的连续线性泛函。连续性给 $x_1,\dots,x_n\in X$ …… $|\ell(\xi)|\le c\max_j|\xi(x_j)|$ …… 即 $(X^{**},w^{*})^{*}=J_X(X)$。」
   **[已核实，类型错误]** $\xi\in X^{**}$ 作用在 $X^*$ 上，所以 $\xi(x_j)$ 对 $x_j\in X$ 没有定义。$(X^{**},w^*)$ 的对偶是 $X^*$，不是 $J_X(X)$（$J_X(X)$ 是 $(X^*,w^*)$ 的对偶）。
   主证明里 $\xi_0(x)$、$(J_Xy)(x)=x(y)$、$\sup=\|x\|$ 只有把这里的 $x$ 读成 $X^*$ 的元素才成立。**[推理]** 也就是说论证骨架正确，配对写错了一层。
2. 边 `imp.goldstine-hahn-banach`（`161-functional-analysis.js:1555`）：令 $C=K-\xi_0$，取 $C$ 的 Minkowski 泛函 $p$「在 $C$ 上 $\le1$ 且 $p(-\xi_0)>1$」。
   **[已核实，内部矛盾]** $0=J_X(0)\in K$，所以 $-\xi_0\in C$，$p\le1$ 在 $C$ 上就推出 $p(-\xi_0)\le1$，与 $p(-\xi_0)>1$ 矛盾。
   **[推理]** 另外 $0\notin C$ 时 $C$ 不吸收，Minkowski 泛函一般不是有限的次线性泛函；延拓得到的是 $X^{**}$ 上的范数连续泛函，「合并得弱\*连续泛函」没有论证。
3. Notes 的「分离引理」同样用 $K-\xi_0$ 的 Minkowski 泛函（**[推理]** 同样的问题）。
4. Notes 与边各有一份完整的「分离 + 证明」，写法不同（Notes 用一般局部凸空间的分离引理，边用 Minkowski 泛函延拓）：**重复且互不一致**。

**历史：**

- 陈述节点在 `8f9036b00`（2026-11-09，第 25 批）进入；带「准备 / 分离引理 / 主证明」的 Notes 在 `26d9b2520`（2026-11-11 22:37）才出现，`git log -S` 证实此前版本没有这段 [已核实]。
- `问题清单-v2` 第 14672 行（§145.6，AUD-069）：「`thm.goldstine` ✅ 数学：弱\*连续泛函=求值、分离引理、主证明正确」。该复核引用的行号（`161:1291-1311`）与上述提交一致，**即复核的正是当前这段文字并判为正确**。
- `_audit/_proofs` 的全部提示词与回执里**没有一次提到 `thm.goldstine` 或 `imp.goldstine*`** [已核实：`grep -l`]。
- 2026-11-19 隐藏证明扫描：`hidden_scan2.json` 里该节点 `qed:false`（∎ 之后还有 ⚠ 与 📌 两段，∎ 不在最后 80 字符内），所以既没进 35 条，也没进「已有边的 25 条」。

**分类（可多选）：**

- 被前期人工复核**错判为正确**（§145，已核实）。
- **从未被**系统性 LLM 战役覆盖（已核实）。
- **在另一内容字段中保留**：Notes 里是完整证明，边上又是另一份（已核实）。
- 被迁边战役的**选择规则漏掉**（尾部 80 字符规则；已核实）。
- 不是「改了没 build/没发布」：dist 与已发布副本和源码一致（已核实）。
- 外部评审关于「配对错误、Notes 留有完整证明、与边重复」**属实**；定理本身成立，错在书写与证明细节。

### 3.2 `thm.lambek` / `imp.lambek`

**当前文本**（`src/data/packs/120-hom-modules.js`，节点 `thm.lambek`；边 `imp.lambek:992`，源 `prop.flat-equivalences`）：

1. Notes「第二步」：「取满射 $R^n\twoheadrightarrow M_1$（$M_1$ 是 $M$ 的有限生成子模），令 $K$ 是 $M_1$ 的原像 …… $K\otimes M\to R^n\otimes M\to M_1\otimes M\to0$ 正合，故 …… 等价于 $R^n\otimes M\to M_1\otimes M$ 单（蛇引理）」。
   **[已核实，类型错误]** 陈述里 $M$ 是**左**模，$K\subseteq R^n$ 按**右**子模记账（第三步原文明写）。$R^n$（右模）不能满射到 $M$ 的左子模 $M_1$；$M_1\otimes_R M$ 是两个左模的张量积，未定义。「蛇引理」也用错了位置（该等价来自张量右正合，不是蛇引理）。
   第一步写「待判的 $M$ 固定不动」，第二步又让 $M_1\subseteq M$ 参与张量，**把「检验对象」与「待判模」又混回去了**——这正是 §11-B 时代记录的「$M$ 一名两用」。
2. 边 `imp.lambek`（右模 $Q_1\subseteq Q$，左模 $M$）按我的阅读 **[推理]** 左右记账一致，且自标「骨架声明：只在诺特时严格」。所以**边是修过的，Notes 里的另一份证明没有同步修**。
3. 陈述现在是「含幺 Noether 环」。**[推理]** Lambek 判据对一般含幺环成立，这是审计迭代中为配合证明而**收窄**了陈述（陈述自己也写「一般环上判据仍成立」）。

**历史（`git log -S` 证实 [已核实]）：**

| 提交 | 日期 | 事件 |
|---|---|---|
| `d98a3a461` | 2026-10-27 | 首次写入，含 `M_1⊗M→M⊗M`、`K_1:=K∩…` |
| `20068bfe8` | 2026-11-04 | 「B4-1」：把字母分开（$M$ 左模、$Q_1\subseteq Q$ 右模），**修在边上**（出现「原稿在这里让 $M$ 同时当左模与右模」） |
| `1416b4d37` | 2026-11-06 | FIX-019（§87 的 5 条）：Notes 重写，加 Noether、终点改 $M_1$；**保留** $M_1\otimes M$ 与 $R^n\to M_1$ |

审计记录：v2 第 4765 / 5479 / 10559–10583（10559–10583 的逐条表里 lambek 占第 6、14、15、20 条）→ 10750–10752 与 10776（§87.3，**明确写「左右记账本轮仍未钉死」**）→ 10972–10973（✅ 「A1b/A1c 右侧记账、第二步终点」：核对的是「$K\otimes M\to R^n\otimes M\to M_1\otimes M\to0$ 已写入」这句字面是否出现）→ 11208（✅「二选一已收口」）。`_proofs/out-L18a-6.txt` 等回执（`thm.lambek`、`imp.lambek`）曾在边上报出「$M$ 同时指固定左模与任意右模」。

**分类（可多选）：**

- **已检出**，但**不完整修复**：只修了边，Notes 里的同一份证明改写后仍有类型错误（已核实）。
- 被后续复核**错判为已解决**：复核对象是「上一轮指出的字句是否改了」，而不是「改后的证明是否自洽」（已核实 10972–10973 / 11208）。
- **在另一字段保留**：Notes 与边各一份证明（已核实）。
- 被隐藏证明扫描漏掉：`midProof:true` 但 `qed:false`（已核实）。
- **非「重新引入」**：2026-11-06 的 Notes 是对原稿的重写，不是回退。
- **非「未 build/未发布」**：dist 与发布副本和源码一致。

## 4. 佐证案例

| 案例 | 当前状态 | 对照来源 | 历史 | 分类 |
|---|---|---|---|---|
| `thm.top-cond-adjoint` | 陈述「有**右**伴随 $X\mapsto X(\cdot)$」，边证明写 $\mathrm{Hom}_{\mathrm{Cond}}(\underline X,Z)\cong\mathrm{Hom}_{\mathbf{Top}}(X,Z(\cdot))$。**[推理]** 方向反了：$Z\mapsto Z(\cdot)$ 是 $X\mapsto\underline X$ 的**左**伴随 | Le Stum Thm 4.2.4 只写「with adjoint $X\mapsto X(\bullet)$」，**没写左右** [已核实]。「右」是图里自己加的 | v2 第 8573 行（§56.3）已指出「方向要限定、在整个 Top 上底空间函子是左伴随」，标「成立但未逐行核」 | 已检出、标未核、**从未修** |
| `cor.cg-exponential-adjoint` | Notes 证明用「$k$ 是余反射，故 $\mathrm{Hom}_{k\mathbf{Top}}(kA,Z)=\mathrm{Hom}_{\mathbf{Top}}(A,Z)$」。**[推理]** 余反射给的是 $\mathrm{Hom}(Z,kA)$，方向反 | Cor 2.3.7 本身与陈述一致 [已核实] | v2 第 3707 行报的是**另一处**（「余极限万有」，Alexandrov 反例，与 Le Stum 的「colimits are universal in compactly generated spaces」互相冲突，**我未裁决**） | 部分：该条证明本身从未被指出 |
| `thm.stone-profinite` | Notes：「Stone 空间恰好是有限离散空间的（滤过）**余**极限」「翻译成**余极限**条件」。**[已核实]** Le Stum Prop 2.2.9 的证明写「profinite space is a Stone space as a **limit** of Stone spaces」；陈述正文说 $\varprojlim$ | Le Stum Prop 2.2.9 [已核实] | v2 第 2679 行指出的是同名边里「把有向极限写错」和证明缺步，**不是 Notes 这句**；13264 行判「自洽」 | 其它字段保留 / 未检出 |
| `ex.sierpinski-space` | 标题「连通但非道路连通」，Notes 写「其实是道路连通的」。**[已核实]** 标题与 Notes 自相矛盾；**[推理]** Notes 对（$\gamma(0)=0,\gamma(t)=1$ 连续） | — | v2 第 5133 行早就指出「不道路连通」为假；Notes 在 `d9a568a23`（FIX-007，2026-11-05）改了，**标题没改** | 部分修复 |
| `prop.coproduct-chaus` | Notes：「无限个不交并一般**不**紧，所以余积只对有限族留在范畴里」。**[推理]** 错：$\mathbf{CHaus}$ 有任意余积（$\beta$ 一类的紧化） | Le Stum Exercise 2.12 只断言**有限**不交并是余积，没有那句否定 [已核实]，是图里加的 | v2 第 4472 行（§24 汇总）**已指出此句错误**，标 `M2 B?`（待核）；**至今原文未变** | 已检出、**从未分诊/修复** |
| `thm.metric-compact-equiv` | 现在的陈述 (c) 是「完备且全有界」，没缺完备性；Notes 只剩指向边 `imp.metric-compact-equiv-proof`，该边证明含完备性。节点带「假设：完备」标签，但陈述并不假设完备 | — | `待修总表-2026-11-11.md` 写过「notes 有完整证明 + ∎」，已由 N10（2026-11-12）搬走 | **评审所说「Notes 缺完备性假设」在当前文本里没有复现**；我没有核对搬迁前的 Notes，所以不能断定评审错，只能说在现状下找不到；「假设：完备」标签值得人工看一眼 |
| `thm.separable-hilbert-is-l2` | Notes 里 Cauchy 估计写 $\|\sum_{J\setminus J'}\lambda_ie_i\|^2=\sum_{J\setminus J'}|\lambda_i|^2$。**[已核实]** $s_J-s_{J'}$ 涉及 $J\triangle J'$，边（`imp`/`thm.bessel-parseval`）写的是 $J\triangle J'$，Notes 的是错的 | — | v2 第 15366 / 15387 行：标题「可分」与陈述（任意 Hilbert 空间）不一致，已改标题并标 ✅；**没人检查 Notes 里的那条公式** | 已检出一半、另一半未检出；与边**重复且不一致** |

Le Stum 归属本身没有发现错误；上表里凡引用 Le Stum 的，都是**图里的附加断言或证明写错**，而不是书的原话写错。

## 5. 失败机制

**已核实：**

1. **审计覆盖有缝**：陈述级审计（`P-AS*`）排除了证明与 Notes；边级审计（`P-ANA/L/RF`）只读边。**Notes 里的证明不属于任何一族提示词**。Goldstine 的 Notes 错误与 separable-hilbert 的 $J\setminus J'$ 就落在这条缝里。
2. **「已修」按字句核，不按数学核**：§87.3 → §91 → 10972–10973 / 11208 的 lambek 复核，检查的是上一轮指出的那几句是否被改，改后的段落是否整体自洽没有被重新审。AUD-002 的 19 条也是同一套逐条对字句的做法（但它诚实地把「部分」单列了）。
3. **局部修复不覆盖重复拷贝**：同一份证明在 Notes 与边各有一份，修一份不会同步另一份（lambek 的 `20068bfe8` 对 `1416b4d37`；sierpinski 的 Notes 对标题）。
4. **迁边战役的验收是「搬运保真」**：`inOrig=true`、target/sources/layer 对不对；**不重新验证数学**，也不负责清理仍在 Notes 里的旧证明。25 条已有边的重复被明确「未处理」。
5. **隐藏证明扫描依赖「∎ 在最后 80 字符」**：Notes 末尾只要有一段 ⚠ / ⭐ / 📌，就逃出扫描。我用同样思路做了一个**粗**统计（`dist/graph.json`，theorem/lemma/proposition/corollary 共 969 个；notes 含 `∎|\blacksquare|QED|证明…` 标记且有带 proof 的入边的有 **240** 个，其中 ∎ 在最后 80 字符内的只有 **43** 个）。这个正则宽松，会含「证明见边」之类的字样，**只能当上界，不是审计结论**。
6. **「候选」没有销账流程**：§24 的 1199 条、`B?`/`A?` 标志是候选，后续没有逐条分诊的记录，所以 `prop.coproduct-chaus`、`thm.top-cond-adjoint` 这类**已被指出**的错一直留着。
7. **完成报告曾多次与实体不符**：AUD-002 §0 表自己列了 4 处（「已修 4/15」「20 个提交」「13 条全部做完」「searchcheck 29/29」）。但同一份报告也说明这些是数字/口径错，不是造假。
8. **复核者倾向于接受叙事**：§145 对 Goldstine 判「主证明正确」，没有逐个核对 $x\in X$ 还是 $X^*$。**[假说]** 与「reasoning effort: none」「按字句核」同属一类，但 §145 是会话内的复核，不是 `_proofs` 回执，所以我没有它的模型/设置记录。

**未解决的假说：**

- 外部评审是否基于**当前**发布版（`dist-site` 提交 `eae980f12`，2026-11-24 09:02）。我对比过这两个节点和发布副本是逐字节一致的，所以不存在「本地改了没发布」，但评审当时看到的版本无从得知。
- `cor.cg-exponential-adjoint` 的「余极限万有」：v2 的 Alexandrov 反例与 Le Stum Cor 2.3.7 的表述互相冲突，需要有人用数学裁决，我没有做。
- `thm.metric-compact-equiv` 搬迁前的 Notes 是否缺完备性假设：没核。

## 6. 前期验证与验收流程的弱点（事实陈述，非新规）

1. 所有自动门都是**结构性**的；数学正确性只靠 LLM 战役和人工复核，二者都有上面的覆盖缝。
2. 「有证明」的判据把 Notes 与边等同，**重复不被视为问题**，所以迁边后仍可保留旧证明。
3. 战役回执（`out-*.txt`）里的发现没有统一的「状态」字段，无法回答「这一条后来怎么样了」。
4. 复核的单位是「上一轮指出的字句」，不是「现在的整段」。
5. LLM 审计运行在 `reasoning effort: none`，提示词又被限定成只报一类；这对找深层类型错误（左右模、对偶配对）不利 **[假说：我没有对照别的设置做实验]**。
6. 英文页是中文的镜像（draft），错误被原样复制到英文侧；翻译与审核不检查数学。
7. 完成报告里的数字缺少「覆盖 / 检出 / 已修 / 独立复核 / 已发布」的分栏（AUD-002 做了一部分）。

## 7. 对 Task 2.6 的建议（按性质分开；不是新规）

**数学要求（与工程无关）**

- 一个定理的证明只应有一份权威版本；两份并存且不一致时，至少有一份是错的。
- 涉及对偶对、左右模、伴随方向、极限 vs 余极限、反/余反射的陈述，核对时要写出每个对象的**类型**（谁在作用谁、哪一侧的模）。
- 「已修」的判据应是「改后整段自洽」，而不是「指出的那句改了」。

**已成立的工程约束**

- `AGENTS.md §0`：批量/语言类活走 DeepSeek 流水线，常规语义审核用 thinking 开；复杂推理与流水线例外交给 Claude。DeepSeek 路线目前没有面向「Notes 证明审计」的适配器（`docs/llm-pipeline.md`），属于「新任务类型」需先复用现有流水线。
- 项目现有门（build、`_katexcheck-all`、doccheck、searchcheck、idstable、clustercheck）不检查数学；`tools/_proofaudit.mjs` 把 Notes 与边证明视为等价。
- `_audit/` 不入 git；`dist/` 与发布副本 `dist-site/` 是构建产物，不手改。

**可供 2.6 讨论的项目政策（仅提议，未采纳）**

- 为每个定理规定「证明只在边上」或「边与 Notes 二选一」，并让 `_proofaudit` 对重复报警（粗扫约 240 个重复候选，需复核）。
- 审计回执加状态字段，用同一份清单跟踪「检出 → 修复 → 独立复核 → build → 发布」。
- 审计提示词至少有一族**覆盖 Notes 里的证明**，并要求逐个对象写类型。
- 修复后的复核要读整段，并同时核对 Notes、边证明、标题、英文页。
- 首批值得人工裁定的候选：Goldstine（配对 + 边的 Minkowski 泛函）、Lambek（Notes 第二步）、`thm.top-cond-adjoint`（伴随方向）、`cor.cg-exponential-adjoint`（余反射方向）、`thm.stone-profinite`（极限/余极限）、`ex.sierpinski-space`（标题）、`prop.coproduct-chaus`（无限余积）、`thm.separable-hilbert-is-l2`（$J\triangle J'$）。**这里只是列线索，不是修改指令。**

## 8. 缺失证据

- 外部评审原文。
- Conway *A Course in Functional Analysis* Thm V.4.1、Brezis Thm 3.17、Lambek (1966)、Rotman：本地无原书，Goldstine / Lambek 只能做数学推理。
- §145（AUD-069）复核的模型与设置记录。
- `thm.metric-compact-equiv` 搬迁前（N10，`2026-11-12`）的 Notes 文本（可由 git 取出，我没取）。
- 评审当时看到的发布版本。

## 附：本次调查留下的东西

- 只新增本文件。临时目录 `_tmp/t25-20261124/`（git 历史抽取、`mg show` 输出、粗扫脚本）已按 MANIFEST 清理；粗扫逻辑见 §5 第 5 点。
- 没有动 `_audit/`、`_pdf/`、源码、dist。工作区里原有的未提交改动（`tools/publish.mjs`、`tools/publish-git*.mjs`、`.claude/`、`formal/`）未触碰。
