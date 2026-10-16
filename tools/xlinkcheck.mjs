/* ==========================================================================
   数学星图 · 内文跳转（xlink）回归体检
   --------------------------------------------------------------------------
   干什么：把一批**标注过的句子**喂给**真正的匹配算法**（src/core/xlink.js 的
   `MG.createXLink(graph, aliases).scan(text, null, true)`），比命中的 id 序列
   是否与期望一致；再**全库扫一遍**，检查「拉丁术语不从单词内部截取」这条性质
   在 709 个节点 + 1398 条边的全部正文里都成立。
   ⛔ 跑的是真模块、真词表、真图 —— 工具里不另写一份匹配算法。

   为什么需要它：2026-10-16 用户报了两种错链，肉眼很难发现，只有句子级才会暴露：
     · `prerequisites`（界面提示里的普通英文词）内部的 `site`
       被链到了 def.grothendieck-topology；
     · `Heine–Borel` 里被拆出来的 `Borel` 被链到了 def.borel。
   修法是两条**通用**规则（见 xlink.js 头部）：拉丁词条要在词边界上命中；
   连字符/破折号算词内字符 ⇒ 复合专名整体识别、拿不准宁可不链。

   ⛔ 别为了让体检通过去改基准：这里每一条 `want` 都是**先想清楚该是什么**、
     再拿工具验证出来的，不是把当前输出抄一遍。加一条是好事；改一条要有理由。

   用法：
     bun tools/xlinkcheck.mjs          体检（对不上 exit 1）
     bun tools/xlinkcheck.mjs --list   连通过的也列出来
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const LIST = process.argv.includes('--list');

/* ------------------------------------------------------------- 基准表 */
/* text  一句话（原样喂给匹配算法）
   want  期望的命中 id 序列（**按出现次序、含重复**；写几条就比几条）
   why   这条为什么值得盯 */
const CASES = [
  /* ---------- 拉丁词条：不从单词内部截取 ---------- */
  { text: 'the prerequisites are listed',
    want: [],
    why: '`prerequisites` 内部含 aka `site` —— 词内字符规则必须挡住（用户报的那个）' },
  { text: 'compaction', want: [],
    why: '`compact` 在一个更长的英文词里 ⇒ 不命中；配对的下一条证明它单独出现时照链' },
  { text: 'a compact space', want: ['def.compact'],
    why: '独立出现的 `compact` 该链（词边界规则不能把正常的也误伤）' },
  { text: 'the site is small', want: ['def.grothendieck-topology'],
    why: '独立出现的 `site` 该链 —— 修完仍然要能工作' },
  { text: 'a morphism of sites', want: ['def.morphism-of-sites'],
    why: '复数 `sites` 不能因为 `site` 命中而被截出一半（这也是词边界的作用）' },
  { text: "Zorn's lemma", want: ['lem.zorn'],
    why: '撇号不算词内字符：`Zorn`s` 里的 `Zorn` 照链（别把边界规则做过头）' },

  /* ---------- 连字符 / 破折号 / 变音字符 ---------- */
  { text: 'Heine–Borel 定理', want: ['thm.metric-compact-equiv'],
    why: '⭐ 半角连字符、全角破折号都归一成 `-` ⇒ 整段命中 thm.metric-compact-equiv；⛔ 不许拆出 `Borel` 链到 def.borel（用户报的那个）' },
  { text: 'Heine-Borel theorem', want: ['thm.metric-compact-equiv'],
    why: '同上，ASCII 连字符写法' },
  { text: 'Borel σ代数', want: ['def.borel'],
    why: '配对条：`Borel` **独立**出现时照链 —— 修的是「拆复合专名」，不是禁掉这个词' },
  { text: 'Cech cohomology', want: ['def.cech-cohomology'],
    why: '变音字母归一：正文写 `Cech`、表里是 `Čech`，要能命中' },
  { text: 'Stone-Cech compactification', want: ['prop.chaus-reflective'],
    why: '破折号 + 变音一起：`Stone-Cech` ↔ 表里的 `Stone–Čech`' },
  { text: 'Holder inequality', want: ['thm.holder'],
    why: '同上：`Holder` ↔ `Hölder`' },

  /* ---------- 中文词条：行为一字不变 ---------- */
  { text: '满足结合律的环', want: [],
    why: '拦词表（linkStop）照旧生效：`满足` 不链，且不给更短的候选留机会' },
  { text: '列紧蕴含紧', want: ['def.sequentially-compact', 'def.compact'],
    why: '中文照旧：`列紧`（长）先命中，`紧`（单字白名单）随后 —— 中文没有词边界这一说' },
  { text: '这就是「短正合列」', want: ['def.exact-sequence'],
    why: '拦词的「吃掉」逻辑：`正合列` 不进链，`短正合列` 整体链到正合列' },

  /* ---------- 复合专名：整段优先 ---------- */
  { text: 'compactly generated spaces', want: ['def.compactly-generated'],
    why: '多词专名整段命中（表里就是这么写的）' },
  { text: 'locally compact', want: ['def.locally-compact'],
    why: '同上；⛔ 别被拆成 `compact`' },
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
    'core/layers.js', 'core/xlink.js',
    'data/regions.js', 'data/clusters.js', 'data/aliases.js', 'data/i18n.js', 'data/notation.js',
    'data/xref.js'];
  fs.readdirSync(path.join(SRC, 'data', 'packs')).sort().forEach(f => {
    if (f.endsWith('.js')) files.push('data/packs/' + f);
  });
  const ctx = vm.createContext(win);
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(SRC, rel), 'utf8'), ctx, { filename: rel });
  return win.MG;
}

const MG = loadMG();
const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
const xl = MG.createXLink(graph, MG.aliases);
if (typeof xl.scan !== 'function') {
  console.error('✗ xlink 没有暴露 scan() —— 体检跑不了（见 src/core/xlink.js 的注释）');
  process.exit(1);
}

let bad = 0;
console.log(`内文跳转体检 · ${CASES.length} 条句子`);
for (const c of CASES) {
  const hits = xl.scan(c.text, null, true);
  const got = hits.map(h => h.id);
  const ok = got.length === c.want.length && got.every((id, i) => id === c.want[i]);
  if (!ok) bad++;
  if (ok && !LIST) continue;
  const show = (ids) => (ids.join(' ') || '(空)');
  console.log(`${ok ? '  ✓' : '  ✗'} ${JSON.stringify(c.text)}`);
  if (!ok) console.log(`      期望  ${show(c.want)}\n      实得  ${show(got)}`);
  else console.log(`      命中  ${show(got)}`);
  console.log(`      ↳ ${c.why}`);
}
console.log(bad ? `\n✗ ${bad} 条与期望不符` : '\n✓ 全部与期望一致');

/* ------------------------------------------------- 全库属性检查（句子之外） */
/* 性质：**拉丁术语不能从单词内部截出来**（也不能从连字符复合词里拆一半）。
   判据是「命中区间的左右不能是词内字符」—— 只对**拉丁/数字开头或结尾**的命中较真，
   中文命中不受影响（中文没有词边界这一说）。
   ⚠️ 这条性质如果全库一个拉丁命中都碰不到，就等于没测 ⇒ 一并报告命中数。 */
const WORDCHAR = /[0-9A-Za-z\u00C0-\u024F\u1E00-\u1EFF\u0300-\u036F\u2010-\u2015\u2212\uFE63\uFF0D]/;
const DASH = /[-\u2010-\u2015\u2212\uFE63\uFF0D]/;
const LAT = /[0-9A-Za-z]/;
let texts = 0, hits = 0, latinHits = 0, violations = [];
function checkText(text, where) {
  if (!text) return;
  texts++;
  for (const h of xl.scan(text, null, true)) {
    hits++;
    const before = h.at > 0 ? text.charAt(h.at - 1) : '';
    const after = h.at + h.len < text.length ? text.charAt(h.at + h.len) : '';
    const piece = text.substr(h.at, h.len);
    if (!LAT.test(piece)) continue;              // 中文/纯符号命中：不受这条规则约束
    latinHits++;
    const bad2 = (WORDCHAR.test(piece.charAt(0)) && WORDCHAR.test(before)) ||
      (WORDCHAR.test(piece.charAt(piece.length - 1)) && WORDCHAR.test(after));
    if (bad2) violations.push(`${where}: 「${piece}」 → ${h.id}（左右是 ${JSON.stringify(before)}${JSON.stringify(after)}）`);
  }
}
for (const n of graph.nodes) {
  checkText(n.statement, n.id + '.statement');
  checkText(n.notes, n.id + '.notes');
  checkText(n.title, n.id + '.title');
}
for (const e of graph.edges) {
  checkText(e.proof, e.id + '.proof');
  checkText(e.note, e.id + '.note');
  (e.proofs || []).forEach((p, i) => checkText(p.text, e.id + '.proofs[' + i + ']'));
}
/* 破折号复合词：命中的**左右**是破折号也算越界（`Heine–Borel` 拆一半）。
   上面那条已经覆盖（破折号在 WORDCHAR 里），这里只把「命中自己含破折号」的情形
   排除掉 —— 整段命中是**正确**行为，不该报。 */
violations = violations.filter((v) => {
  const m = /「(.+?)」/.exec(v);
  return m ? !DASH.test(m[1]) : true;
});
console.log(`\n全库属性检查 · ${texts} 段正文（节点陈述/说明/标题 + 边的证明/说明）`);
console.log(`  命中 ${hits} 处，其中拉丁/数字命中 ${latinHits} 处`);
if (violations.length) {
  bad++;
  console.log(`  ✗ 词内命中 ${violations.length} 处（应当为 0）：`);
  violations.slice(0, 10).forEach((v) => console.log('      ' + v));
} else {
  console.log('  ✓ 没有从单词内部截出来的拉丁命中');
}

console.log(bad ? `\n✗ ${bad} 项不合格` : '\n✓ 全部通过');
process.exit(bad ? 1 : 0);
