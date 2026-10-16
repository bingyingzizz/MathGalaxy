/* ==========================================================================
   数学星图 · 把英文条目标成 reviewed（作者审过之后才用它）
   --------------------------------------------------------------------------
   ⛔⛔ 规矩（决策③）：`status: 'reviewed'` 是**作者的动作**，不是 agent 的。
      —— 只有作者明确说「这批过了 / 标吧」，才能跑这个工具。跑之前先在本批的
         `i18n/review-batch-N.md` 里写下作者的原话与日期。

   干什么：把指定节点的英文条目从 `draft` 翻成 `reviewed`，并填 `reviewed: { by, date }`。
     · **摘要**（abstracts.en.js）：一个节点一条
     · **陈述/说明**（statements.en.js）：一个节点两个字段（statement / notes）
     · ⛔ 不碰 `basedOn`：指纹是「译自哪一版中文」的凭据，翻状态不该动它
     · ⛔ 不动 docs.en.js（英文文档有自己的逐份状态，要翻就单独说）

   用法：
     bun tools/i18n-review.mjs --ids lem.zorn,thm.first-iso          # 干跑，列出会改的行
     bun tools/i18n-review.mjs --ids … --by bingyingzizz --apply     # 真写
     （`--date YYYY-MM-DD` 不给就用今天；`--fields abstract,statement` 可只翻其中几类）
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const get = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const IDS = (get('--ids', '') || '').split(',').map(s => s.trim()).filter(Boolean);
const BY = get('--by', '');
const DATE = get('--date', new Date().toISOString().slice(0, 10));
const WANT = (get('--fields', 'abstract,statement,notes') || '').split(',').map(s => s.trim()).filter(Boolean);

if (!IDS.length) {
  console.error('用法：bun tools/i18n-review.mjs --ids <节点id,节点id,…> [--by 名字] [--date YYYY-MM-DD] [--fields …] [--apply]');
  process.exit(2);
}
if (!BY) {
  console.error('⛔ 必须写 `--by <审校者>`：状态里要记下是谁审的（作者让他自己签的名字）。');
  process.exit(2);
}

/* 文件里「条目块」的骨架：4 空格缩进的 `'id': {` 开，4 空格缩进的 `},` 关；
   块内 6（摘要）/ 8（陈述）空格缩进的那行 `status: …` 就是要改的目标。
   ⚠️ 用**文本行**改，不重排文件：注释、换行、字符串拼接全部原样保留。 */
function flipFile(rel, fieldOf) {
  const p = path.join(SRC, rel);
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  let cur = null;
  const changed = [];
  for (let i = 0; i < lines.length; i++) {
    const mItem = /^    '([^']+)': \{$/.exec(lines[i]);
    if (mItem) { cur = mItem[1]; continue; }
    if (/^    \},?$/.test(lines[i])) { cur = null; continue; }
    const mSt = /^(\s*)status: (?:'draft'|'reviewed'), basedOn: ('[^']*'), reviewed: .*,?$/.exec(lines[i]);
    if (!mSt || !cur || IDS.indexOf(cur) < 0) continue;
    const field = fieldOf(i, lines);
    if (WANT.indexOf(field) < 0) continue;
    const indent = mSt[1];
    const before = lines[i];
    lines[i] = `${indent}status: 'reviewed', basedOn: ${mSt[2]}, ` +
      `reviewed: { by: '${BY}', date: '${DATE}' },`;
    changed.push({ id: cur, field, before: before.trim(), after: lines[i].trim() });
  }
  return { rel, lines, changed };
}

/* 判断这一行属于哪个字段：往上找最近的 `statement: {` / `notes: {` / `en:`（摘要） */
function fieldOf(i, lines) {
  for (let j = i - 1; j >= 0 && j > i - 40; j--) {
    const s = lines[j].trim();
    if (/^(statement|notes): \{$/.test(s)) return s.replace(/: \{$/, '');
    if (/^'[^']+': \{$/.test(lines[j]) || /^    \},?$/.test(lines[j])) break;
  }
  return 'abstract';   // 摘要文件里没有子字段
}

const jobs = [
  { rel: 'data/i18n/abstracts.en.js', fieldOf },
  { rel: 'data/i18n/statements.en.js', fieldOf },
];
let total = 0;
for (const job of jobs) {
  const { rel, lines, changed } = flipFile(job.rel, job.fieldOf);
  console.log(`\n【${rel}】会改 ${changed.length} 行`);
  for (const c of changed) console.log(`  ${c.id}.${c.field} → reviewed by ${BY} (${DATE})`);
  total += changed.length;
  if (APPLY && changed.length) fs.writeFileSync(path.join(SRC, rel), lines.join('\n'), 'utf8');
}

/* 校验：id 必须真实存在，且确实被翻到了（怕拼错 id 静默不生效）
   ⚠️ 只在 --apply 之后做：干跑时文件还没写，读出来当然还是旧状态。 */
if (APPLY) {
  const win = {
    MG: {}, console,
    document: { createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }),
      addEventListener() {}, getElementById: () => null },
    performance: { now: () => Date.now() }, requestAnimationFrame: () => 0, addEventListener() {},
  };
  win.window = win; win.self = win;
  const ctx = vm.createContext(win);
  for (const rel of ['data/i18n/abstracts.en.js', 'data/i18n/statements.en.js']) {
    vm.runInContext(fs.readFileSync(path.join(SRC, rel), 'utf8'), ctx, { filename: rel });
  }
  const A = (win.MG.i18nAbstracts || { items: {} }).items || {};
  const S = (win.MG.i18nStatements || { items: {} }).items || {};
  const miss = [];
  for (const id of IDS) {
    const a = A[id], s = S[id];
    if (!a && !s) { miss.push(`${id}：两个文件里都没有这条`); continue; }
    if (WANT.indexOf('abstract') >= 0 && a && a.status !== 'reviewed') miss.push(`${id}.abstract 还是 ${a.status}`);
    if (WANT.indexOf('statement') >= 0 && s && s.statement && s.statement.status !== 'reviewed') miss.push(`${id}.statement 还是 ${s.statement.status}`);
    if (WANT.indexOf('notes') >= 0 && s && s.notes && s.notes.status !== 'reviewed') miss.push(`${id}.notes 还是 ${s.notes.status}`);
  }
  if (miss.length) {
    console.log('\n⚠️ 没翻全 / 有问题：');
    for (const m of miss) console.log('  - ' + m);
  } else {
    console.log('\n✓ 校验：这些 id 的相关条目现在都是 reviewed。');
  }
}
console.log(APPLY
  ? `\n✓ 已把 ${total} 行标成 reviewed（by ${BY} · ${DATE}）。接着跑：bun tools/build.mjs`
  : `\n（干跑）共 ${total} 行；加 --apply 才写。`);
