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
   why   一句话记住这条为什么值得盯 */
const CASES = [
  { q: 'preadditive', n: 1, top: ['def.abelian-category'], why: '长英文词被词表碎片切开（2026-10-16 真 bug）—— 必须只回 1 条' },
  { q: 'additive', n: 10, top: ['def.additive-functor', 'def.finitely-additive'], why: '短词就该多回几条，但不能被碎片规则误伤' },
  { q: 'zorn', n: 5, top: ['lem.zorn', 'thm.vsbasis'], why: '人名 aka 排第一；其余是**正文里用到它**的节点（hay 含陈述，属正常）' },
  { q: 'fubini', n: 9, top: ['thm.fubini-tonelli', 'def.product-measure', 'thm.fubini-complete'], why: '两条 Fubini 定理都在前 3；其余是正文提到它的' },
  { q: 'radon', n: 14, top: ['thm.lebesgue-radon-nikodym', 'thm.rn-complex'], why: 'Radon–Nikodym 那批顶到上限 14（一屏）—— 条数变了要看看是不是挤掉了谁' },
  { q: 'schroder', n: 1, top: ['thm.schroder-bernstein'], why: '不带变音符的写法也要能搜到 Schröder–Bernstein' },
  { q: 'isomorphism', n: 6, top: ['def.mono', 'def.quasi-iso'], why: '英文长词（老查询）—— 词边界修好之后只剩 6 条，没有碎片噪音' },
  { q: 'measurable', n: 14, top: ['def.measurable-function', 'def.caratheodory-measurable'], why: '英文长词（老查询）—— 覆盖 def 与 prop 两批' },
  { q: 'yoneda', n: 13, top: ['lem.yoneda', 'prop.yoneda-embedding'], why: '前两条是 Yoneda 引理与嵌入；其余是正文里用到它的' },
  { q: 'snake lemma', n: 2, top: ['thm.snake-lemma', 'thm.long-exact'], why: '多词查询：词表切分 + 两词同时命中加权' },
  { q: 'section', n: 13, top: ['def.section', 'def.section-retraction'], why: '通用词：多节点共享这个名字，条数与排序都值得盯' },
  { q: 'Exercise 2.25', n: 1, top: ['cor.cg-product'], why: '⭐ 命中的是**陈述里写了这句话**的那个节点 —— refs（书目）不进检索字段，见下一条' },
  { q: 'I.5', n: 0, top: [], why: '⭐ 书号/章节坐标（refs 里的 `I.5`）**搜不到**：hay 不含 refs。记 0 是为了把这条口径钉住（要改就得改 hay，另议）' },
  { q: 'L^p', n: 14, top: ['def.lp-norm', 'thm.lp-banach'], why: '记号表命中（tex 形式）' },
  { q: 'ℵ₀', n: 5, top: ['def.ordinal', 'thm.real-ordered-field'], why: 'Unicode 记号命中（可数与超限那条线的入口）' },
  { q: 'σ-algebra', n: 3, top: ['def.sigma-algebra', 'def.borel', 'def.product-sigma'], why: '希腊字母 + 连字符的记号写法' },
  { q: 'kC', n: 3, top: ['prop.cg-function-space', 'cor.cg-exponential-adjoint'], why: '缩写/记号：被明确排除出「英文名」的那些，但要能搜到' },
  { q: 'NBV', n: 5, top: ['def.nbv', 'prop.nbv-derivative'], why: '全大写缩写（aka 里算「名字样」的例外）' },
  { q: 'Noether', n: 4, top: ['thm.first-iso', 'def.quotient-group'], why: '⭐ 从 aka 里删掉之后**仍然**要能搜到（走 title / 别的 aka）' },
  { q: 'Delta', n: 14, top: ['thm.ac-epsilon-delta'], why: '⭐ 同上去掉 aka 之后仍可搜（`def.simplex-category` 也在命中里；另有 ε-δ 与正文里的 δ）' },
  { q: '测度', n: 14, top: ['def.measure', 'thm.borel-measure-nbv'], why: '中文词：不该受英文词边界规则影响' },
  { q: '紧生成', n: 14, top: ['def.compactly-generated', 'prop.cg-coreflective'], why: '中文词 + 星团名命中' },
  { q: '定义', n: 14, top: [], why: '类型名命中：清单型查询，会顶到上限 14' },
  { q: 'abelian', n: 14, top: ['def.abelian-category', 'def.condensed-abelian-group'], why: '高频英文词：跨星团的大批命中' },
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
  return { n: hits.filter((x) => x !== '(没有点击钩子)').length, hits: hits.slice() };
}

/* ------------------------------------------------------------------ 跑 */
const rows = [];
let bad = 0;
for (const c of CASES) {
  const r = search(c.q);
  const top = (c.top || []).every((id, i) => r.hits[i] === id);
  const nOk = c.n == null ? true : r.n === c.n;
  const ok = nOk && top;
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
    console.log(`${ok ? '  ✓' : '  ✗'} ${JSON.stringify(c.q).padEnd(15)} 命中 ${String(r.n).padStart(2)}` +
      (c.n == null ? '' : `（期望 ${c.n}）`) + `  ← ${c.why}`);
    if (LIST || !ok) console.log('      ' + (r.hits.slice(0, 8).join(' ') || '(空)') + (r.hits.length > 8 ? ' …' : ''));
  }
  console.log(bad ? `\n✗ ${bad} 条与基准不符（上面的 ✓ 是 --list 才列出的）` : '\n✓ 全部与基准一致');
  if (!bad) console.log('（要逐条看命中就把 --list 带上）');
}
process.exit(bad ? 1 : 0);
