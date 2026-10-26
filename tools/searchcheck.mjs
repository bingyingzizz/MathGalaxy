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
  { q: 'compact', n: 14, top: ['def.compact', 'def.chaus', 'def.compactly-generated'], why: '⭐⭐ 本轮修的：`compact` 正是 def.compact 的 label_en ⇒ 精确名档必须排第一。旧代码只认中文 label 的精确档，它只拿到别名档的分，被 compactly generated 靠 degree 挤到第二' },
  { q: 'zorn', n: 8, top: ['lem.zorn', 'ax.choice', 'thm.vsbasis'], why: '⚠️ 7→8 是批 7 带进来的：新增 `prop.prime-ideal` 的注记提到佐恩引理（前三条次序**没动**）。lem.zorn 靠 `Zorn\'s lemma`（名字前缀档）压住 ax.choice 的精确别名 `Zorn` —— 别名档**在名字档之下**；thm.vsbasis 是正文提到它。旧次序里 #2/#3 是 degree 凑出来的。⚠️ 5→7 是批 3 带进来的：`thm.steinitz` 与 `def.direct-sum` 的正文都提到 Zorn 引理（前三条次序**没变**）' },
  { q: 'yoneda', n: 13, top: ['lem.yoneda', 'prop.yoneda-embedding', 'prop.sieve-generated-by-family'], why: '⭐ 2026-10-16 第二轮给 lem.yoneda 补了英文名（回填的二级规则修了一处：`Yoneda` ⊂ `Yoneda lemma` 是简写、不算两条候选）⇒ 它靠 label_en 前缀档回到第一；以前只靠 aka 的 `Yoneda`（别名档）排第二' },
  { q: 'additive', n: 10, top: ['def.abelian-category', 'def.additive-functor', 'def.finitely-additive'], why: '两个 label_en 前缀命中（additive and abelian categories / additive functor）同档，degree 决定先后；旧代码靠堆叠加分把 additive-functor 放前面' },
  { q: 'abelian', n: 14, top: ['def.abelian-sheaf', 'thm.topos-abelian-grothendieck', 'prop.abelianization'], why: '名字前缀档（abelian sheaf / abelian Grothendieck topos…）在前；def.abelian-category 的英文名是 `additive and abelian categories`（包含档）⇒ 掉到第 4。旧代码靠 label/title/aka/id 四项堆叠把它顶到第一' },
  { q: 'fubini', n: 10, top: ['thm.fubini-tonelli', 'def.product-measure', 'thm.fubini-complete'], why: '两条 Fubini 定理都在前 3；其余是正文提到它的。⚠️ 命中数会随内容长（批 5 加了 Sard 定理的证明提纲，里面提到 Fubini）—— 9 → 10，**前 3 没动**，属预期漂移' },
  { q: 'radon', n: 14, top: ['thm.lebesgue-radon-nikodym', 'def.rn-derivative', 'thm.rn-complex'], why: '前两个是 label_en 前缀（Radon-Nikodym theorem / derivative）；thm.rn-complex 只在前者中文名里出现（包含档）⇒ 退到第三' },
  { q: 'isomorphism', n: 9, top: ['def.mono', 'def.quasi-iso', 'thm.first-iso'], why: '⚠️ 8→9 是批 7 带进来的：新增 `prop.functor-preserves-iso` 的标题含 Isomorphisms（排第 7，前六条没动）。英文长词：前 5 条都是名字/标题里含 isomorphism 的（旧记录写 6 条，是把 prop.adjoint-full-faithful 的 title_en 漏算了）。⚠️ 7→8 是批 3 新增的 `def.linear-isomorphism`（标题里带 Isomorphism）。⚠️ 批 6 换了 top 第 3 名：`thm.first-iso` 因为新边 `imp.solvable-quotients` 把它当来源，degree 涨了，在同分（标题命中 260）时挤到前面 —— 分数没变，只是同分次序' },
  { q: 'measurable', n: 14, top: ['def.measurable-function', 'prop.section-measurable', 'def.caratheodory-measurable'], why: '英文长词：同档同分的一批，次序由 degree 决定（集合与旧记录相同，只是 #2 起换位）' },
  { q: 'schroder', n: 1, top: ['thm.schroder-bernstein'], why: '不带变音符的写法也要能搜到 Schröder–Bernstein' },
  { q: 'snake lemma', n: 2, top: ['thm.snake-lemma', 'thm.long-exact'], why: '多词查询：词表切分 + 两词同时命中加权' },
  { q: 'section', n: 13, top: ['def.section', 'def.section-retraction', 'prop.section-measurable'], why: '通用词：多节点共享这个名字，条数与排序都值得盯' },
  { q: 'Exercise 2.25', n: 1, top: ['cor.cg-product'], why: '⭐ 命中的是**陈述里写了这句话**的那个节点 —— refs（书目）不进检索字段，见下一条' },
  { q: 'I.5', n: 0, top: [], why: '⭐ 书号/章节坐标（refs 里的 `I.5`）**搜不到**：hay 不含 refs。记 0 是为了把这条口径钉住（要改就得改 hay，另议）' },
  { q: 'L^p', n: 14, top: ['def.lp-norm', 'thm.lp-banach', 'prop.lp-inter-lr-in-lq'], why: '记号表命中（tex 形式）' },
  { q: 'ℵ₀', n: 5, top: ['thm.real-ordered-field', 'def.ordinal', 'def.cardinal'], why: 'Unicode 记号命中（可数与超限那条线的入口）。⭐ 2026-10-16 初等微积分第一批后确界原理反超 `def.ordinal`：新增的 `imp.completeness-cycle` 给了它一条出边（degree 5→6），而同档是靠 degree 定次序的 —— 次序变了，**集合没变**' },
  { q: 'σ-algebra', n: 3, top: ['def.borel', 'def.sigma-algebra', 'def.product-sigma'], why: '希腊字母 + 连字符：三个都靠标题里的英文括注命中（同档）⇒ degree/id 定次序。⚠️ 想让 def.sigma-algebra 领跑，得做「σ ↔ sigma」等价，另一件事' },
  { q: 'kC', n: 3, top: ['cor.cg-exponential-adjoint', 'prop.cg-function-space', 'prop.cg-kclosed-quotient'], why: '缩写/记号：被明确排除出「英文名」的那些，但要能搜到' },
  { q: 'NBV', n: 5, top: ['def.nbv', 'prop.nbv-derivative', 'thm.borel-measure-nbv'], why: '全大写缩写（aka 里算「名字样」的例外）' },
  { q: 'Noether', n: 4, top: ['thm.first-iso', 'def.quotient-group', 'def.group-hom'], why: '⭐ 从 aka 里删掉之后**仍然**要能搜到（走 title / 别的 aka）' },
  { q: 'Delta', n: 14, top: ['thm.ac-epsilon-delta', 'prop.constant-sheaf-preserves-limits', 'def.simplex-category'], why: '⭐ 同上去掉 aka 之后仍可搜（`def.simplex-category` 也在命中里；另有 ε-δ 与正文里的 δ）' },
  { q: '测度', n: 14, top: ['def.measure', 'def.measure-space', 'thm.borel-measure-nbv'], why: '中文词：不该受英文词边界规则影响（同档的一批换了位，集合与旧记录相同）' },
  { q: '紧生成', n: 14, top: ['def.compactly-generated', 'prop.cg-cartesian-closed', 'prop.cg-coreflective'], why: '中文词 + 星团名命中（同档批次，degree 定次序）' },
  { q: '定义', n: 14, total: 460, why: '类型名命中：清单型查询，会顶到上限 14 —— ⭐ total 钉住「真总数要说出来」（2026-10-16 建议①）。⚠️ 这个数**每加一批内容就会长**：345 → 353（批 1，35 点）→ 361（批 1 收尾）→ 381（批 2，48 点）→ 412（批 3，42 点）→ 433（批 4，36 点）→ 444（批 5，25 点）→ 451（批 6，15 点）→ 460（批 7，24 点）。它统计的是「命中次数」而不是节点数，所以正文里出现的「定义」二字也计入。加完内容按新值重钉即可，**动就是预期的**' },
  { q: 'compact', total: 28, n: 14, why: '同上：界面只显示 14 条，但底部那行必须报出真实的 28。⚠️ 26→28 来自新增的 `prop.continuous-bounded-on-compact` 与 `thm.uniform-continuity-compact` —— **id 也在 hay 里**，所以新节点的 id 会直接抬高这类拉丁词的总数' },
  /* ⭐ `ref:` 前缀 = 只搜书目/出处（2026-10-16 建议④）。
     ⛔ refs **不进 hay**（上一批 `I.5` 那条记 0 就是为了钉住这点），
        要按书号找节点只能走这个显式前缀，免得章节号污染普通搜索。 */
  { q: 'ref:Zorn (1935)', n: 1, top: ['lem.zorn'], why: 'ref: 精确到一个节点的出处（Zorn (1935) 只挂在佐恩引理上）' },
  { q: 'ref:I.5', n: 14, total: 18, top: ['def.function', 'thm.product', 'def.quotient-set'], why: 'ref: 命中一批（Kunen 的 I.5 那一节）—— 条数、总数、次序都盯着；⛔ 不带 ref: 时它仍然搜不到（下一条）。⚠️ 批 3 里 `def.quotient-set` 多了一条入边（`dep.quotientset-quotientvs`），同档按 degree 定次序 ⇒ 它超过了 `def.pair`（集合没变）' },
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
