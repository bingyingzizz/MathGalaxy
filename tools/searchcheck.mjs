/* ==========================================================================
   数学星图 · 搜索回归体检（T3.4）
   --------------------------------------------------------------------------
   干什么：把一批**标注过的查询**跑过**真正的搜索模块**（src/core/search.js，
   不是重写一份口径），比「命中条数 + 前几条命中」与基准是否一致。
   为什么要它：搜索的口径（词表切分 / 词边界 / hay 里含哪些字段）改一个字就可能
   悄悄地多出十几条噪音 —— 2026-10-16 就踩过一次（`preadditive` 被词表碎片 `ive`
   切开，真命中被 14 条噪音挤掉）。那种回归肉眼看不出来，**要靠基准兜**。

   口径（结果是怎么读出来的）：
     · 跑在**真模块**里：`MG.createSearch()` + 一个只实现它用到的那几个方法的假 DOM。
     · 命中 id **不是从 DOM 文字猜的**：给模块传 `hooks.onNode/onRegion`，
       然后照界面那样逐条触发「点结果行」（`choose(i)`）⇒ 拿到的就是真命中。
     · 条数上限 14 = 界面一屏（`hits.slice(0, 14)`），所以 >14 的查询一律记 14。
     · 基准里的 `n` 是条数，`top` 是前 3 条的 id —— 排序变了也要报。

   用法：
     bun tools/searchcheck.mjs              体检（对不上 exit 1）
     bun tools/searchcheck.mjs --list       打印每条的命中 id（排查用）
     bun tools/searchcheck.mjs --record     按当前行为打印基准表（⛔ 替换前逐条核对）

   ⛔ 别为了让体检通过去改基准：基准是「**已验证过**的行为」，不是「当前输出」。
      加一条查询是好事；改一条既有查询的期望值，必须说得出理由。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const argv = process.argv.slice(2);
const LIST = argv.includes('--list');
const RECORD = argv.includes('--record');

/* ------------------------------------------------------------- 基准表 */
/* q     查询串（原样打进搜索框）
   n     期望命中条数（界面口径，最多 14）；null = 只比 top，不卡条数
   top   期望的前几条 id（写几条就比几条）
   total 期望的**真实命中总数**（列表底部那行「共 N 项」里的 N）—— 不写就不查
   why   一句话记住这条为什么值得盯

   ⭐⭐ 2026-10-16 打分口径改过一次（用户报「搜 compact，compactly generated 排在
   精确名 compact 前面」）。改的是**档位**，不是给某个词加分：
     · 精确名（中文名 / 英文短名 / 英文正式名）> 精确 id > 名字前缀 > 精确别名
       > 名字包含 > id 含 > 别名含 > 标签/类型/正文含；
     · 中英名字**同等待遇**（旧代码的「精确档」只认中文 label ⇒ 英文名吃亏）；
     · degree **不再是加分项**，只在同分时当次序（旧代码最高 +20，正是它把
       def.compact 挤到了第二）。
   ⇒ 下面这些查询的次序**有意**变了，每条都注明了原因（⛔ 不是「照着输出抄一遍」）。
   ⚠️ 序号变了但**条数**没变的，多半是同档同分、由 degree/id 决定次序 —— 那属于
      「都一样合理」的抖动，不是退化。 */
const CASES = [
  { q: 'preadditive', n: 1, top: ['def.abelian-category'], why: '长英文词被词表碎片切开（2026-10-16 真 bug）—— 必须只回 1 条' },
  { q: 'compact', n: 14, top: ['def.compact', 'def.chaus', 'def.compactly-generated'], why: '⭐⭐ 本轮修的：`compact` 正是 def.compact 的 label_en ⇒ 精确名档必须排第一。 ⭐ 2026-11-02 泛函分析 53 点（Riesz 单位球紧、局部紧 Baire、紧度量上的等度连续……）⇒ 86→87。 ⭐ 2026-11-02 87→86：删掉了正文里 6 处「紧（紧）」式的重复括号引用（`def.compactification` / `def.net` 里那几处），原文里那个 id 字符串不再被计入。旧代码只认中文 label 的精确档，它只拿到别名档的分，被 compactly generated 靠 degree 挤到第二⚠️ 68→69 是 2026-10-30 英文名补全带进来的：`def.f-shriek` 的英文名 `compactly supported pushforward` 里含 `compact`（包含档）。前 14 条与次序**没动**' },
  { q: 'zorn', n: 14, top: ['lem.zorn', 'ax.choice', 'thm.orthonormal-basis-exists'], why: '批 10（同调代数 72 点 + 拓扑 18 点）带进来的：`thm.baer-criterion`、`thm.lambek` 的正文提到 Zorn/Noether。⚠️ 7→8 是批 7 带进来的：新增 `prop.prime-ideal` 的注记提到佐恩引理（前三条次序**没动**）。lem.zorn 靠 `Zorn\'s lemma`（名字前缀档）压住 ax.choice 的精确别名 `Zorn` —— 别名档**在名字档之下**；thm.vsbasis 是正文提到它。旧次序里 #2/#3 是 degree 凑出来的。⚠️ 5→7 是批 3 带进来的：`thm.steinitz` 与 `def.direct-sum` 的正文都提到 Zorn 引理（前三条次序**没变**） ⭐ 2026-11-02 泛函分析批次：新增 thm.orthonormal-basis-exists 的注里写「Zorn 给极大元」⇒ 10→12（另一条来自并发的其它批次）；前 3 未动。 ⭐ 2026-11-02 搜索加「整条查询的正名加权」后第 3 名由 thm.vsbasis 变为 thm.orthonormal-basis-exists（两者都只在正文提到 Zorn，同分区间变了，语义无差别）。 ⭐ 2026-11-03 内射判据那段注提到 Zorn 引理（Baer 判别法）⇒ 12 → 13。 ⭐ 2026-11-03 子 agent 批量补写里又两处提到 Zorn（内射判别 / 无环性）⇒ 13 → 14。' },
  { q: 'yoneda', n: 14, top: ['lem.yoneda', 'prop.yoneda-embedding', 'prop.sieve-generated-by-family'], why: '⭐ 2026-10-16 第二轮给 lem.yoneda 补了英文名（回填的二级规则修了一处：`Yoneda` ⊂ `Yoneda lemma` 是简写、不算两条候选）⇒ 它靠 label_en 前缀档回到第一；以前只靠 aka 的 `Yoneda`（别名档）排第二 ⭐ 2026-10-30 英文名补全（aliases 的 `en:` 零级规则，共 203 个节点拿到英文名）：lem.yoneda 之前靠 aka 的 `Yoneda` 与二级规则拼出来的名字，这次显式定成 `Yoneda lemma` ⇒ 精确名档回到第一（旧记录的第一是 prop.yoneda-embedding） ⭐ 2026-11-03 筛覆盖那段注提到 Yoneda 引理 ⇒ 13 → 14。' },
  { q: 'additive', n: 10, top: ['def.abelian-category', 'def.additive-functor', 'prop.additive-complex-construction'], why: '两个 label_en 前缀命中（additive and abelian categories / additive functor）同档，degree 决定先后；旧代码靠堆叠加分把 additive-functor 放前面' },
  { q: 'abelian', n: 14, top: ['def.abelian-sheaf', 'thm.topos-abelian-grothendieck', 'thm.pushforward-enough-injectives'], why: '名字前缀档（abelian sheaf / abelian Grothendieck topos…）在前；def.abelian-category 的英文名是 `additive and abelian categories`（包含档）⇒ 掉到第 4。旧代码靠 label/title/aka/id 四项堆叠把它顶到第一 ⭐ 2026-10-30 英文名补全（aliases 的 `en:` 零级规则，共 203 个节点拿到英文名）：def.abelian-sheaf 原来**没有**英文名（aka 里 `abelian sheaf` 与 `sheaf of abelian groups` 两条都合法 ⇒ 判歧义被丢弃），这次显式定名 ⇒ 名字前缀档第一。def.abelian-category 的英文名仍是 `additive and abelian categories`（包含档），位置不变' },
  { q: 'fubini', n: 11, top: ['thm.fubini-tonelli', 'def.product-measure', 'thm.fubini-complete'], why: '两条 Fubini 定理都在前 3；其余是正文提到它的。⚠️ 命中数会随内容长（批 5 加了 Sard 定理的证明提纲，里面提到 Fubini）—— 9 → 10，**前 3 没动**，属预期漂移 ⭐ 2026-11-05 FIX-015 #9 新注「MCT、DCT、Fubini 全都要塌」多一处 Fubini ⇒ 10 → 11，**前 3 没动**' },
  { q: 'radon', n: 14, top: ['def.rn-derivative', 'thm.lebesgue-radon-nikodym', 'thm.rn-pointwise'], why: '批 10 后（标题英文化/中文重命名）次序微调，前两条仍是 label_en 前缀。原注： ⭐ 2026-11-04：新增的例子 `ex.density-abs-continuous`（标题含 absolutely continuous）与 `thm.riesz-markov` 带来 degree/命中变化 ⇒ `def.rn-derivative` 与 `thm.lebesgue-radon-nikodym` 互换前两名（同档同分，靠 degree）；集合仍是 14 条。前两个是 label_en 前缀（Radon-Nikodym theorem / derivative）；thm.rn-complex 只在前者中文名里出现（包含档）⇒ 退到第三' },
  { q: 'isomorphism', n: 14, top: ['def.isomorphism', 'def.mono', 'def.quasi-iso'], why: '⚠️ 9→8：2026-10-27 把标题里的英文括注全删了（「节点名/标题都用中文」）⇒ prop.functor-preserves-iso 的 title 不再含 Isomorphisms，少了一条。⚠️ 8→9 是批 7 带进来的：新增 `prop.functor-preserves-iso` 的标题含 Isomorphisms（排第 7，前六条没动）。英文长词：前 5 条都是名字/标题里含 isomorphism 的（旧记录写 6 条，是把 prop.adjoint-full-faithful 的 title_en 漏算了）。⚠️ 7→8 是批 3 新增的 `def.linear-isomorphism`（标题里带 Isomorphism）。⚠️ 批 6 换了 top 第 3 名：`thm.first-iso` 因为新边 `imp.solvable-quotients` 把它当来源，degree 涨了，在同分（标题命中 260）时挤到前面 —— 分数没变，只是同分次序 ⭐ 2026-10-30 英文名补全（aliases 的 `en:` 零级规则，共 203 个节点拿到英文名）：def.quasi-iso 原来没有英文名（`quasi-isomorphism` / `quasi-iso` 歧义），现在有 ⇒ 升到第二；thm.first-iso 退一位，集合仍是 8 条 ⭐ 2026-10-30 英文名补全第二批（再 132 个节点）：`thm.first-iso-vs` 原来没有英文名（`first isomorphism theorem for vector spaces`），现在有 ⇒ 插到第二，条数 8→9（它本来就是 isomorphism 的一个真命中，只是以前搜不到） ⭐ 2026-10-30 英文名补全第三/四批（这批把覆盖率推到 100%）：`prop.iso-unique-section` / `prop.functor-preserves-iso` / `def.linear-isomorphism` 这类定义与命题现在都带 isomorphism 字样 ⇒ 9→13 条（前 3 名未动） ⭐ 2026-10-31 英文摘要批次（枢纽榜前 30 补齐）：摘要也进检索 hay，`thm.de-rham` 的摘要里写了「natural isomorphism of graded algebras」⇒ 13→14 条（前 14 条次序未动） ⭐ 2026-10-31 环论批次（整环/gcd/Bézout/Euclid/PID/UFD/互素理想/CRT 9 点）：新增 definition 边 `thm.crt-rings` 引用了 `thm.first-iso` ⇒ 它的入度 +1，同档内靠 degree 反超 `thm.first-iso-vs`（分数没变，只是同分次序） ⭐ 2026-11-03 补「同构」通名节点后， 以精确名字命中登顶（它本来就是 B3 要补的那个通名； 只是范畴论三合一，不是同构的通名）。 ⭐ 2026-11-04 C3 缺口补线批次（131 条 definition 边）：`def.quasi-iso` 多拿了两条出边（`dep.gap-k-calculus-fractions-quasi-iso` / `dep.gap-injective-resolution-lift-quasi-iso`）⇒ 同档同分靠 degree 反超 `thm.first-iso` 升到第三；**集合仍是 14 条**，只换了次序。' },
  { q: 'measurable', n: 14, top: ['def.measurable-function', 'def.lplus', 'prop.section-measurable'], why: '英文长词：同档同分的一批，次序由 degree 决定（集合与旧记录相同，只是 #2 起换位） ⭐ 2026-10-30 英文名补全第二批（再 132 个节点）：`prop.measurable-closure` 拿到 `closure properties of measurable functions` ⇒ 同档同分，靠 degree 升到第三；集合仍是 14 条 ⭐ 2026-10-30 英文名补全第三/四批（这批把覆盖率推到 100%）：`def.lplus`（the class of non-negative measurable functions）原来没有英文名，现在有 ⇒ 名字前缀档升到第二' },
  { q: 'schroder', n: 1, top: ['thm.schroder-bernstein'], why: '不带变音符的写法也要能搜到 Schröder–Bernstein' },
  { q: 'snake lemma', n: 2, top: ['thm.snake-lemma', 'thm.long-exact'], why: '多词查询：词表切分 + 两词同时命中加权 ⭐ 2026-10-30 英文名补全（aliases 的 `en:` 零级规则，共 203 个节点拿到英文名）：thm.snake-lemma 原来没有英文名（`snake lemma` / `diagram chasing` 歧义），现在有 ⇒ 精确名档把它从第二抬到第一 —— 这正是这条查询该有的结果' },
  { q: 'section', n: 14, top: ['def.section', 'def.bundle-section', 'def.section-retraction'], why: '通用词：多节点共享这个名字，条数与排序都值得盯' },
  { q: 'Exercise 2.25', n: 1, top: ['cor.cg-product'], why: '⭐ 命中的是**陈述里写了这句话**的那个节点 —— refs（书目）不进检索字段，见下一条' },
  { q: 'I.5', n: 0, top: [], why: '⭐ 书号/章节坐标（refs 里的 `I.5`）**搜不到**：hay 不含 refs。记 0 是为了把这条口径钉住（要改就得改 hay，另议）' },
  { q: 'L^p', n: 14, top: ['def.lp-norm', 'thm.lp-banach', 'prop.lp-inter-lr-in-lq'], why: '记号表命中（tex 形式）' },
  { q: 'ℵ₀', n: 6, top: ['thm.real-ordered-field', 'def.ordinal', 'def.cardinal'], why: 'Unicode 记号命中（可数与超限那条线的入口）。⭐ 2026-10-16 初等微积分第一批后确界原理反超 `def.ordinal`：新增的 `imp.completeness-cycle` 给了它一条出边（degree 5→6），而同档是靠 degree 定次序的 —— 次序变了，**集合没变** ⭐ 2026-11-02：def.separable-space 的注里写了 2^{aleph_0}（ℓ^∞ 不可分的证明）⇒ 5→6，前 3 未动。' },
  { q: 'σ-algebra', n: 3, top: ['def.borel', 'def.sigma-algebra', 'def.product-sigma'], why: '希腊字母 + 连字符：三个都靠标题里的英文括注命中（同档）⇒ degree/id 定次序。⚠️ 想让 def.sigma-algebra 领跑，得做「σ ↔ sigma」等价，另一件事' },
  { q: 'kC', n: 3, top: ['prop.cg-function-space', 'cor.cg-exponential-adjoint', 'prop.cg-kclosed-quotient'], why: '缩写/记号：被明确排除出「英文名」的那些，但要能搜到 ⭐ 2026-11-02 同上：前两名互换，仍是那 3 条。' },
  { q: 'NBV', n: 5, top: ['def.nbv', 'prop.nbv-derivative', 'thm.borel-measure-nbv'], why: '全大写缩写（aka 里算「名字样」的例外）' },
  { q: 'Noether', n: 13, top: ['thm.first-iso', 'def.quotient-group', 'def.group-hom'], why: '批 10 带进来的：`thm.baer-criterion`、`thm.lambek` 的标题或正文提到 Noether；⚠️ 4→5：新增 `thm.za-analytic` 的说明提到 Noether 归一化（前三条没动） ⭐ 2026-11-02 辛几何批次：`def.poisson-bracket` 的注写「这也是 Noether 定理的辛版本」⇒ 9→10（前三条次序未动）。。⭐ 从 aka 里删掉之后**仍然**要能搜到（走 title / 别的 aka） ⭐ 2026-10-31 环论批次（整环/gcd/Bézout/Euclid/PID/UFD/互素理想/CRT 9 点）：`def.pid` 的注里写了「理想升链必停（Noether）」、`def.bezout-domain` 的注里写了「未必 Noether」⇒ 7→9 条 ⭐ 2026-11-03 平坦等价那段注里提到 Noether 环（只检验有限生成理想）⇒ 10 → 11。 ⭐ 2026-11-03 同上（平坦/投射维数两条注提到 Noether 环）⇒ 11 → 13。' },
  { q: 'Delta', n: 14, top: ['def.standard-simplex', 'thm.ac-epsilon-delta', 'def.g-delta'], why: '⭐ 同上去掉 aka 之后仍可搜（`def.simplex-category` 也在命中里；另有 ε-δ 与正文里的 δ）。⚠️ 2026-10-22 起 `def.standard-simplex` 排第一：Munkres 那批把「标准单形」写成了 `def.standard-simplex`，id 里含 simplex、正文含 $\\Delta$，同档里按 degree 顶到前面 ⭐ 2026-11-02：新增 def.g-delta（id 里含 delta）⇒ 同档按 degree 顶到第三名；⭐ 2026-11-02 泛函分析批次（G-delta / 点态极限的连续点集 / 共振集 / Baire 那一族）把 G-delta 相关命中顶上来 ⇒ 前三条次序变成 simplex → ε-δ → 点态极限；集合仍是 14 条。 ⭐ 2026-11-03：并发会话新增的内容让 def.g-delta 的 degree 涨了，同分档里它从第四升到第三（集合与分数都没变，只是同分次序）。第 4 名之后由 degree 排，本就不稳定，所以只钉前三条。' },
  { q: 'Riemann映照定理', n: 14, top: ['thm.riemann-mapping'], why: '⭐ 2026-10-22 用户报的原文：「我搜索 Riemann 映照定理找不到」。库里写的是「映射」，他打的是「映照」，而且 Riemann 后面没有空格。修法是在 aliases.js 里把两种译名 + 有无空格都收进 aka；这条基准钉住「第一名必须是它」' },
  { q: 'Riemann Lebesgue', n: 2, top: ['thm.riemann-lebesgue', 'thm.riemann-lebesgue-criterion'], why: '⭐⭐ 2026-11-05：钉住 key() 的「带空格」归一化本身 —— 原来 `Riemann Lebesgue` 一条都搜不到（`/s+/` 匹配的是字母 s：空白从没被去掉，所有 s 反被删）。⛔ 别再用「给别名补一条无空格写法」绕过：那治的是症状，换一个名字又会漏' },
  { q: 'RiemannLebesgue', n: 1, top: ['thm.riemann-lebesgue'], why: '⭐ 同上的「不带空格」写法：靠「名字开头若干完整词拼接」匹配（sqPrefixHit），⛔ 不能用压缩后 indexOf —— 那会让 `kC` 撞上「k closed」、`NBV` 撞上「f ∈ BV」（2026-11-05 实测的两条假命中）' },
  { q: '测度', n: 14, top: ['def.measure', 'def.measure-space', 'thm.borel-measure-nbv'], why: '中文词：不该受英文词边界规则影响（同档的一批换了位，集合与旧记录相同）' },
  { q: '紧生成', n: 14, top: ['prop.cg-cartesian-closed', 'thm.cgwh-reflective', 'cor.cg-exponential-adjoint'], why: '中文词 + 星团名命中（同档批次，degree 定次序）' },
  { q: '定义', n: 14, total: 882, why: '类型名命中：清单型查询，会顶到上限 14 —— ⭐ 2026-11-04 v1 收尾批次再添 2 个 definition（profinite 整数、Hodge 星号等）⇒ 861 → 863 → 865（随后另一个 agent 的可展曲面批次又加了 2 个 definition）；前 14 条次序未变。⭐ 2026-11-04 例子/Pack 批次新增 8 个 definition 节点（有限域、平凡群、莫比乌斯带、幂对象、Hodge 星号、Riesz–Markov 等）⇒ 853 → 861；前 14 条次序未变。⭐ total 钉住「真总数要说出来」（2026-10-16 建议①）。 ⭐ 2026-11-02 新增「勒贝格数」「Riemann–Lebesgue 引理」2 点（都是定义/定理类）⇒ 782 → 784。 ⭐ 2026-11-02c 重写开映射 / 逆算子 / 闭图像三条（按标准证明展开，正文里「定义」二字出现次数 +1）⇒ 781 → 782。 ⭐ 2026-11-02b 泛函那批补英文名 + 纲连线后 ⇒ 780 → 781。⚠️ 这个数**每加一批内容就会长**：345 → 353（批 1，35 点）→ 361（批 1 收尾）→ 381（批 2，48 点）→ 412（批 3，42 点）→ 433（批 4，36 点）→ 444（批 5，25 点）→ 451（批 6，15 点）→ 460（批 7，24 点）→ 469（批 8，固态/解析 21 点）→ 478（批 9，解析几何 15 点）→ 639（复变第三批 17 点：幂级数/单值支/绕数/唯一性/正规族/Riemann 映射/拓扑应用，节点里「定义」二字出现得多）。它统计的是「命中次数」而不是节点数，所以正文里出现的「定义」二字也计入。加完内容按新值重钉即可，**动就是预期的**。⚠️ 670 → 671（2026-10-29 加 ax.grothendieck-universe：它的注里写「按「Grothendieck 宇宙」那份定义」—— 命中次数不是节点数，正文里出现「定义」二字就 +1） ⭐ 2026-10-31 数论第一批 15 个节点（12 个定义/定理/推论 + 3 条边）带进来的：671→677，前 14 条未动 ⭐ 2026-10-31 环论批次（整环/gcd/Bézout/Euclid/PID/UFD/互素理想/CRT 9 点）：9 个新节点里 7 个是定义（整环/不可约元/gcd 整环/Bézout 整环/Euclid 整环/PID/UFD/互素理想）⇒ 定义类命中 677→685 ⭐ 2026-10-31 数论第二批（10 点：积性函数/τ σ/Möbius/反演/π θ ψ/Чебышёв 估计/Bertrand/素数定理）带进来的：685→689 ⭐ 2026-10-31 数论第三批（12 点：二次剩余/Legendre/Euler 判别法/Gauss 引理/互反律/Jacobi/阶/原根/离散对数）带进来的：689→695 ⭐ 2026-11-01 微分几何补洞批次（流形上的微分形式/外微分良定/流形间的拉回/余切丛/纤维丛/主丛 6 点）：695→701 ⭐ 2026-11-01 再加「局部平凡化」1 点（定义类）⇒ 701→702；同日把 `ax.choice` 公式里的「f 是函数」挪进散文、写成「dom 只对函数有定义」⇒ 702→703（正文出现「定义」二字就 +1，命中次数不是节点数） ⭐ 2026-11-01 线性代数补洞 12 点（转置/共轭转置/酉/正交/Hermite/对称/正规/正定矩阵 · Schur/谱定理矩阵版/极分解 · 谱半径/Rayleigh/Courant–Fischer）：703→713，前 14 条次序未动 ⭐ 2026-11-02 补「闭形式」「恰当形式」「有理标准形」「域的特征」4 点（用户：「补，再查查还有没有别的」）⇒ 748 → 751（另有 3 个是定理/定义类新增的命中）。 ⭐ 2026-11-02 新增「闭链」「边缘」2 点（用户报「闭链/上闭链没定义、直接连到同调」）⇒ 746 → 748。 ⭐ 2026-11-02 拆开 T3 / T3.5 为「裸性质 + 中文名 = 裸性质+T1」两个节点（+2 点）⇒ 744 → 746。 ⭐ 2026-11-02 分离公理批次 8 点（T0/T1/内部/正则/T3.5/完全正规/完美正规/紧 Hausdorff 正规）⇒ 737 → 744。 ⭐ 2026-11-02 辛几何 12 点（辛形式/辛基/辛标准形/Lagrange 子空间/辛矩阵/Lagrange 恒等式 · 辛流形/Darboux/Hamilton 向量场/Poisson 括号/Lagrange 子流形/Lagrange 括号）⇒ 728 → 737，前 14 条次序未动。 ⭐ 2026-11-02 线性代数补洞 B/C/D 三批 19 点（双线性型几何 9 · 特征子空间/幂零/幂等/广义特征向量/正交相似 5 · 矩阵范数/LU/QR/最小二乘/伪逆 5）全是定义/定理类，陈述与注里「定义」二字出现得多 ⇒ 713 → 728，前 14 条次序未动（命中次数不是节点数）。（正文出现「定义」二字就 +1，命中次数不是节点数）；同批把「微分形式/外微分/拉回」的通名换给了流形版（$R^n$ 版改叫「（欧氏开集）」），但这些查询不按名字钉，**前 14 条次序未动**。它们都是定义类节点，陈述与说明里「定义」二字出现得多 —— 命中次数不是节点数，所以涨 6 是预期的。前 14 条次序未动 ⭐ 2026-11-02 泛函分析批次 53 点（Baire/Hilbert/赋函/Stone–Weierstrass）：全是定理/定义类，正文里「定义」二字出现得多 ⇒ 751→778（命中次数不是节点数）。前 14 条次序未动。⭐ 2026-11-02 补泛函分析别名（55 条 aka）后 778→780：别名也进 hay，含「定义」二字的条目又多两条。⭐ 780→781：闭图像定理重写后正文多了「映射」那条定义的引用（正文出现「定义」二字就 +1）。 ⭐ 2026-11-02 泛函分析批次 53 点（Baire/Hilbert/赋范/Stone–Weierstrass）：全是定理与定义类，正文里「定义」二字出现得多 ⇒ 751→778（命中次数不是节点数）。前 14 条次序未动。 ⭐ 2026-11-02 新增「转移函数」「结构群」2 点（用户报「还有个引用了但没定义的节点」，扫描确认就是这两个）⇒ 784 → 786. ⭐ 2026-11-03 新增「相对紧」「Fréchet 导数」「示性类」3 点（定义/定理类）⇒ 786 → 789. ⭐ 2026-11-03 等价清单补写（紧/紧生成/平坦/可积判据四处的「各方向假设」）⇒ 789 → 791。 ⭐ 2026-11-03b 泛函「各方向用到的假设」补写里出现「定义」二字（并发会话写的内容，不是本批别名）⇒ 791 → 792。 ⭐ 2026-11-03 等价清单第二批（正定矩阵/连续⟺有界/σ-代数/外测度/Baire 三等价）⇒ 792 → 793。 ⭐ 2026-11-03 等价清单第三批（一点紧化/紧 Hausdorff 商/内射判据/T1/线性方程组/正交/谱半径）⇒ 793 → 795。 ⭐ 2026-11-03 等价清单第四批 15 点（度量/可数性/连通/同胚/内部/滤子/可对角化/幂零/不可约/加法函子/二次型/可积/可测/van Kampen）⇒ 795 → 797。 ⭐ 2026-11-03 并行批量：6 个子 agent 共补 94 个节点的「各方向假设」，正文里「定义」二字出现次数大增 ⇒ 797 → 825。 ⭐ 2026-11-03 新增陈–Weil 计算 5 点（不变多项式/陈–Weil 同态/陈类/线丛计算/分裂原理）⇒ 825 → 828。 ⭐ 2026-11-03 新增「向量空间」定义节点（定义类，正文里「定义」二字出现）⇒ 828 → 829。 ⭐ 2026-11-03 新增逻辑三定理（可证明性/完备性/紧致性，含「定义」二字的段落）⇒ 829 → 830。 ⭐ 2026-11-03 曲面第一刀两点（连通和/亏格，注里多处「定义」）⇒ 830 → 832。 ⭐ 2026-11-03 曲面第二刀三点（拓扑流形/闭曲面/分类定理，注里多次「定义」）⇒ 832 → 834。 ⭐ 2026-11-03 曲面第三刀六点（两条判据式 + 四个例子，注里多次「定义」）⇒ 834 → 837。 ⭐ 2026-11-03 Galois 11 点（域扩张/代数元/分裂域/正规/可分/伽罗瓦群/伽罗瓦扩张/基本定理/根式可解/五次方程，注里多次「定义」）⇒ 837 → 845。 ⭐ 2026-11-03 Galois 补漏 2 点（代数闭域/单位根，注里多次「定义」）⇒ 845 → 847。 ⭐ 2026-11-03 补 v1 的 B3/B5（同构/原函数/二元运算/群的阶/正切四函数/反三角，注里多次「定义」）⇒ 847 → 853。 ⭐ 2026-11-03 新增实示性类 4 点（Stiefel–Whitney / 定向当且仅当 w1=0 / Euler 类 / Pontryagin 类）⇒ 865 → 868。 ⭐ 2026-11-04 v2 收尾 7 条改陈述（补假设 / 降正则性 / 定向相容）新增的注里出现「定义」二字（「才有定义」「内射分解定义」「没有定义」×2）⇒ 872 → 876，前 14 条次序未动。 ⭐ 2026-11-05 FIX-005 #13 新注「但定义给的是另一头的估计」出现「定义」一次 ⇒ 876 → 877（前 14 条未动）。 ⭐ 2026-11-05 FIX-008 §65.2-15「曲线本身要落在定义域里」与 §65.2-20「圆周不在定义域里」各出现「定义」一次 ⇒ 877 → 879（前 14 条次序未动）。 ⭐ 2026-11-05 FIX-014 B7 新注「$A = 0$ 时 adj A = 0，两边都没定义」出现「定义」一次 ⇒ 879 → 880（前 14 条次序未动）。 ⭐ 2026-11-05 FIX-015 #2 新措辞「和与积在**有定义处**可测」出现「定义」一次 ⇒ 880 → 881（前 14 条次序未动）。 ⭐ 2026-11-05 FIX-016 A3 新措辞「$~omega^{i}$ 定义在参数域上」出现「定义」一次 ⇒ 881 → 882（前 14 条次序未动）。' },
  { q: 'compact', total: 94, n: 14, why: '同上：界面只显示 14 条，但底部那行必须报出真实的 33。⚠️ 32→33 是批 9 带进来的：`def.adic-spectrum` 的正文提到 adic 谱是 **quasicompact**（含 compact 字样）。⚠️ 28→32 是批 8 带进来的：`cor.solid-compact-generators` 的 **id 含 compact**。⚠️ 26→28 来自新增的 `prop.continuous-bounded-on-compact` 与 `thm.uniform-continuity-compact` —— **id 也在 hay 里**，所以新节点的 id 会直接抬高这类拉丁词的总数 ⚠️ 68→69 是 2026-10-30 英文名补全带进来的：`def.f-shriek` 的英文名 `compactly supported pushforward` 里含 `compact`（包含档）。前 14 条与次序**没动**⚠️ 69→70：`cor.heine-borel` 的英文名 `closed and bounded iff compact in Rn` 里含 compact（它的 id 与中文名都不含，所以以前不计入） ⭐ 2026-10-30 英文名补全第三/四批（这批把覆盖率推到 100%）：70→78：这批新英文名里有 8 个节点含 compact（Stone 反射、紧 Hausdorff 的自由表示/余积/商映射、局部紧结构定理…），它们的 id 与中文名都不含这个词 ⭐ 2026-10-31 英文摘要批次（枢纽榜前 30 补齐）：摘要也进检索 hay，`thm.gauss-bonnet` 的摘要开头是「compact orientable surface」⇒ total 78→79 ⭐ 2026-11-02 泛函分析批次：新增节点里多处提到 compact（紧单位球 / 紧度量 / Arzelà–Ascoli / Stone–Weierstrass 的紧 Hausdorff）⇒ 81→87；前 14 条次序未动。 ⭐ 2026-11-02 泛函分析批次：新增节点多处提到 compact（紧单位球 / 紧度量 / Arzelà–Ascoli / 紧 Hausdorff）⇒ 81→87；前 14 条次序未动。 ⭐ 2026-11-03 相对紧/示性类两点带进来的 ⇒ 87 → 89. ⭐ 2026-11-03 同上（连续⟺有界那条注里提到紧支撑等）⇒ 89 → 90。 ⭐ 2026-11-03 同上 ⇒ 90 → 91。 ⭐ 2026-11-03 同上 ⇒ 91 → 92。 ⭐ 2026-11-03 逻辑三定理（紧致性定理的注里多处出现 compact 这个词）⇒ 92 → 94。 ⭐ 2026-11-03 团体检降反引号（「紧致性定理」「完备性」等改成中文说法，不再进 hay 的节点 id 匹配）⇒ 94 → 93。' },
  /* ⭐ `ref:` 前缀 = 只搜书目/出处（2026-10-16 建议④）。
     ⛔ refs **不进 hay**（上一批 `I.5` 那条记 0 就是为了钉住这点），
        要按书号找节点只能走这个显式前缀，免得章节号污染普通搜索。 */
  { q: 'ref:Zorn (1935)', n: 1, top: ['lem.zorn'], why: 'ref: 精确到一个节点的出处（Zorn (1935) 只挂在佐恩引理上）' },
  { q: 'ref:I.5', n: 14, total: 18, top: ['def.function', 'def.quotient-set', 'thm.product'], why: 'ref: 命中一批（Kunen 的 I.5 那一节）—— 条数、总数、次序都盯着；⛔ 不带 ref: 时它仍然搜不到（下一条）。⚠️ 批 3 里 `def.quotient-set` 多了一条入边（`dep.quotientset-quotientvs`），同档按 degree 定次序 ⇒ 它超过了 `def.pair`（集合没变）' },
];

/* --------------------------------------------------------- 最小 loadMG */
function loadMG() {
  const win = {
    MG: { contentVersion: null }, console,
    document: { createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }),
      addEventListener() {}, getElementById: () => null },
    performance: { now: () => Date.now() }, requestAnimationFrame: () => 0, addEventListener() {},
  };
  win.window = win; win.self = win;
  const files = ['core/config.js', 'core/util.js', 'core/i18n.js', 'core/graph.js', 'core/layout.js',
    'core/layers.js', 'core/search.js',
    'data/regions.js', 'data/clusters.js', 'data/aliases.js', 'data/i18n.js', 'data/notation.js',
    'data/xref.js', 'data/i18n/abstracts.en.js', 'data/i18n/statements.en.js'];
  fs.readdirSync(path.join(SRC, 'data', 'packs')).sort().forEach(f => {
    if (f.endsWith('.js')) files.push('data/packs/' + f);
  });
  const ctx = vm.createContext(win);
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(SRC, rel), 'utf8'), ctx, { filename: rel });
  return win.MG;
}

/** 假 DOM：只实现 search.js 用到的那几个方法/属性；事件监听登记在 `__ev` 里 */
function fakeEl() {
  const el = {
    value: '', innerHTML: '', textContent: '',
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    style: {}, __ev: {},
    setAttribute() {}, getAttribute: () => null, removeAttribute() {},
    addEventListener(t, cb) { el.__ev[t] = cb; },
    removeEventListener() {}, contains: () => true,
    focus() {}, select() {}, appendChild() {}, querySelector: () => null,
  };
  return el;
}

const MG = loadMG();
const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
MG.computeLayout(graph);
MG.computeLayers(graph);
const view = { graph, focus: null, hover: null };

const input = fakeEl(), results = fakeEl(), box = fakeEl();
const hits = [];
const api = MG.createSearch(box, input, results, view, {
  onNode: (id) => hits.push(id),
  onRegion: (id) => hits.push('region:' + id),
});
/* ⚠️ 建索引**不是** createSearch 自己做的：app.js 建完会调 `search.reindex()`
   （那里才知道图与可见性）。漏了这一步 ⇒ 词表空、hay 空 ⇒ 什么都搜不到。 */
api.reindex();

/** 跑一次真搜索：返回 { n, hits }（走「输入 → 渲染 → 点结果行」这条路） */
function search(q) {
  hits.length = 0;
  input.value = q;
  if (input.__ev.input) input.__ev.input({ target: input });
  const n = (String(results.innerHTML).match(/class="sr-item/g) || []).length;
  /* ⭐ 列表底部那行「共 N 项，只显示前 M 项」——真总数（没被 14 截断过的） */
  const more = /共 (\d+) 项/.exec(String(results.innerHTML));
  const total = more ? Number(more[1]) : null;
  /* ⚠️ 事件对象要**像真的一样**：search.js 的 mousedown 处理里先 e.preventDefault()、
     再用 e.target.closest('[data-i]') 找行 —— 少一个方法就整条回调抛错，
     表现是「渲染出来的条数对、拿到的命中恒为 0」。 */
  for (let i = 0; i < n; i++) {
    if (!results.__ev.mousedown) { hits.push('(没有点击钩子)'); break; }
    results.__ev.mousedown({
      preventDefault() {}, stopPropagation() {},
      target: { closest: () => ({ getAttribute: (k) => (k === 'data-i' ? String(i) : null) }) },
    });
  }
  /* ⚠️ 必须 `slice()` 复制：`hits` 是**共用的一个数组**（hooks 闭包抓着它），
     直接返回引用的话，最后打印出来的每一条都是「最后一次查询」的命中。 */
  return { n: hits.filter((x) => x !== '(没有点击钩子)').length, hits: hits.slice(), total: total };
}

/* ------------------------------------------------------------------ 跑 */
const rows = [];
let bad = 0;
for (const c of CASES) {
  const r = search(c.q);
  const top = (c.top || []).every((id, i) => r.hits[i] === id);
  const nOk = c.n == null ? true : r.n === c.n;
  const tOk = c.total == null ? true : r.total === c.total;
  const ok = nOk && top && tOk;
  if (!ok && !RECORD) bad++;
  rows.push({ c, r, ok });
}

if (RECORD) {
  console.log('/* 基准表（--record 生成；⛔ 替换前逐条核对是否合理） */');
  console.log('const CASES = [');
  for (const { c, r } of rows) {
    console.log(`  { q: ${JSON.stringify(c.q)}, n: ${r.n}, top: ${JSON.stringify(r.hits.slice(0, 3))}, why: ${JSON.stringify(c.why)} },`);
  }
  console.log('];');
} else {
  console.log(`搜索回归体检 · ${CASES.length} 条查询`);
  for (const { c, r, ok } of rows) {
    if (ok && !LIST) continue;
    console.log(`${ok ? '  ✓' : '  ✗'} ${JSON.stringify(c.q).padEnd(18)} 命中 ${String(r.n).padStart(2)}` +
      (c.n == null ? '' : `（期望 ${c.n}）`) +
      (c.total == null ? '' : ` · 总数 ${r.total}（期望 ${c.total}）`) +
      `  ← ${c.why}`);
    if (LIST || !ok) console.log('      ' + (r.hits.slice(0, 8).join(' ') || '(空)') + (r.hits.length > 8 ? ' …' : ''));
  }
  console.log(bad ? `\n✗ ${bad} 条与基准不符（上面的 ✓ 是 --list 才列出的）` : '\n✓ 全部与基准一致');
  if (!bad) console.log('（要逐条看命中就把 --list 带上）');
}
process.exit(bad ? 1 : 0);
