/* ==========================================================================
   数学星图 · 英文层的**逐条**状态体检（作者 2026-10-16 拍板：决策二.3）
   --------------------------------------------------------------------------
   背景：审校状态不再「整份文件一个 status」，而是逐条判定 ——
     · 英文摘要（abstracts.en.js）   每条 = 一个节点
     · 英文陈述/说明（statements.en.js）每条 = 一个节点 × 一个字段（statement / notes）
     · 英文文档（docs.en.js）        每份 = reading / policy / hubs / notation（+ 术语表）
   每条自带 { status, basedOn, reviewed }；stale **现算**：
     ① 内容版本对不上（tools/ids.snapshot.json 的 vX.Y.Z）；或
     ② 中文底稿指纹对不上（MG.zhHash，见 src/core/i18n.js）。
   ⛔ 判断只有一处实现（MG.enFieldStatus）——本脚本调的就是它，不另写一套。

   用法：
     bun tools/i18n-status.mjs                 体检（默认；有记录不合格时 exit 1）
     bun tools/i18n-status.mjs --md            按 markdown 表格打印（往 review-batch-N.md 里贴）
     bun tools/i18n-status.mjs --ids a,b,c     只看这几个节点（配 --md 用来出批次 rollup）
     bun tools/i18n-status.mjs --patch         打印「缺 basedOn 的字段该填什么」，照抄进数据文件
     bun tools/i18n-status.mjs --json          机器可读

   ⛔ 本工具默认**不写任何文件**。stale 要靠「重新对稿」消掉，不是把 basedOn 刷新一下 ——
      那样等于悄悄作废审校记录（要重设就自己把那一行改成上面打印的新值）。
   ⭐ 唯一的例外是 `--rebump`：**内容版本号整体 +1 之后**，把每条 basedOn 的**版本段**
      换成新版本（指纹段一个字符都不动）。它只做机械替换，并且**先拒绝**任何指纹对不上
      的条目（真正过期的东西不会被它偷偷洗白）。
   用法：
     bun tools/i18n-status.mjs --rebump          干跑：列出会改哪些行
     bun tools/i18n-status.mjs --rebump --apply  真写（三个数据文件）
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const argv = process.argv.slice(2);
const MD = argv.includes('--md');
const PATCH = argv.includes('--patch');
const JSONOUT = argv.includes('--json');
const REBUMP = argv.includes('--rebump');
const APPLY = argv.includes('--apply');
const ii = argv.indexOf('--ids');
const ONLY = ii >= 0 ? (argv[ii + 1] || '').split(',').map(s => s.trim()).filter(Boolean) : null;

/* ------------------------------------------------------------ 最小 loadMG */
function loadMG() {
  const win = {
    MG: { contentVersion: null }, console,
    document: { createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }),
      addEventListener() {}, getElementById: () => null },
    performance: { now: () => Date.now() }, requestAnimationFrame: () => 0, addEventListener() {},
  };
  win.window = win; win.self = win;
  const files = ['core/config.js', 'core/util.js', 'core/i18n.js', 'core/graph.js', 'core/layout.js',
    'data/regions.js', 'data/clusters.js', 'data/aliases.js', 'data/i18n.js', 'data/notation.js', 'data/xref.js',
    'data/i18n/docs.en.js', 'data/i18n/abstracts.en.js', 'data/i18n/statements.en.js'];
  fs.readdirSync(path.join(SRC, 'data', 'packs')).sort().forEach(f => {
    if (f.endsWith('.js')) files.push('data/packs/' + f);
  });
  const ctx = vm.createContext(win);
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(SRC, rel), 'utf8'), ctx, { filename: rel });
  return win.MG;
}

const MG = loadMG();
const VERSION = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/ids.snapshot.json'), 'utf8')).version;
MG.contentVersion = VERSION;              // 与构建同一个口径
const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
const absZh = id => (graph.byId[id].statement || '') + '\n' + (graph.byId[id].notes || '');

/* 每条记录 → 一行体检结果 */
const rows = [];
const errs = [];
function push(file, id, field, rec, zh) {
  if (ONLY && ONLY.indexOf(id) < 0) return;
  if (!rec) return;
  const state = MG.enFieldStatus(rec, zh);
  const m = /^([^#]*)(?:#(.*))?$/.exec(String(rec.basedOn || '')) || [];
  const ver = m[1] || '', hash = m[2] || '';
  let why = '';
  if (state === 'stale') {
    why = (ver && ver !== VERSION) ? `内容版本 ${ver} → ${VERSION}` : '';
    if (hash && zh != null && hash !== MG.zhHash(zh)) why += (why ? '；' : '') + '中文底稿改过';
  }
  if (!rec.status) errs.push(`${file} ${id}.${field}：缺 status`);
  if (!rec.basedOn) {
    errs.push(`${file} ${id}.${field}：缺 basedOn`);
    why = '缺 basedOn';
  }
  if (state === 'stale' && /^[^#]*#/.test(String(rec.basedOn || '')) && hash === MG.zhHash(zh)) {
    why = why || 'stale';
  }
  rows.push({ file, id, field, state, basedOn: rec.basedOn, why,
    /* ⭐ 指纹对不上 = **真 stale**（中文那句被改过）；只有版本段对不上则不算 */
    fpBad: !!(hash && zh != null && hash !== MG.zhHash(zh)),
    need: rec.basedOn ? null : `${VERSION}#${MG.zhHash(zh)}` });
}

const A = MG.i18nAbstracts || { items: {} };
for (const [id, rec] of Object.entries(A.items || {})) push('abstracts', id, 'en', rec, absZh(id));
const S = MG.i18nStatements || { items: {} };
for (const [id, rec] of Object.entries(S.items || {})) {
  if (rec && rec.statement) push('statements', id, 'statement', rec.statement, graph.byId[id] ? graph.byId[id].statement : '');
  if (rec && rec.notes) push('statements', id, 'notes', rec.notes, graph.byId[id] ? graph.byId[id].notes : '');
}
const D = MG.i18nDocs || { docs: {} };
for (const name of Object.keys(D.docs || {})) {
  const d = D.docs[name];
  push('docs', name, name, { status: d.status || D.status, basedOn: d.basedOn || D.basedOn,
    reviewed: d.reviewed !== undefined ? d.reviewed : D.reviewed }, null);
}

/* ------------------------------------------------- 版本号整体 +1 后的机械重基线 */
/* 干什么：内容版本从 vX.Y.Z 涨到 vX'.Y'.Z' 之后，每条英文记录的 `basedOn` 里那个
   **版本段**就过期了 —— 但中文底稿一个字没动（指纹段会证明这一点）。
   于是把版本段统一换成新版本，指纹段原样保留。
   ⛔ 先拒绝：只要有一条的指纹对不上（= 真正该重新对稿的），就**一条都不改**并 exit 1。
   ⛔ 只认 `basedOn: '<ver>#<hash>'` 这种形状的**数据行**，不碰注释、不碰别的字符串。 */
function rebump() {
  const FILES = ['data/i18n/abstracts.en.js', 'data/i18n/statements.en.js', 'data/i18n/docs.en.js'];
  /* 先算「哪些条目指纹对不上」——用已经跑出来的 rows */
  /* ⚠️ 「真 stale」= **指纹**对不上（中文那句被改过）。只是版本段落后（内容加了几条
     id、中文原文没动）不算 —— 那种情况正是本动作要处理的。 */
  const staleIds = new Set(rows.filter(r => r.fpBad).map(r => `${r.file}:${r.id}.${r.field}`));
  if (staleIds.size) {
    console.log(`✗ 有 ${staleIds.size} 条是**真 stale**（指纹对不上）——不许重基线。先重新对稿：`);
    for (const k of Array.from(staleIds).slice(0, 10)) console.log('   - ' + k);
    process.exit(1);
  }
  let changed = 0;
  for (const rel of FILES) {
    const p = path.join(SRC, rel);
    const src = fs.readFileSync(p, 'utf8');
    const out = src.replace(/basedOn: '([^'#]+)(#[0-9a-f]{8})?'/g, (all, ver, hash) => {
      if (ver === VERSION) return all;
      changed++;
      return `basedOn: '${VERSION}${hash || ''}'`;
    });
    if (out !== src) {
      console.log(`  ${rel}：${(src.match(/basedOn: '([^'#]+)/g) || []).filter((s) => !s.startsWith(`basedOn: '${VERSION}`)).length} 行 → ${VERSION}`);
      if (APPLY) fs.writeFileSync(p, out, 'utf8');
    }
  }
  console.log(changed
    ? (APPLY ? `✓ 已把 ${changed} 处 basedOn 的版本段改成 ${VERSION}（指纹未动）` : `（干跑）会改 ${changed} 处 → 加 --apply 才写`)
    : `✓ 全部已经是 ${VERSION}，不用改`);
}
if (REBUMP) {
  rebump();
  process.exit(0);
}

/* ------------------------------------------------ 只换指纹的「重新基线」（谨慎使用） */
/* 干什么：某些条目的**中文底稿改过**（指纹对不上），但改动是**排版/公式清理**性质的
   （例如把 `\text{ 是}` 换成 `\wedge`、把汉字移出公式），英文那一段的语义没变。
   这时把 `basedOn` 的**指纹段**重记一遍，stale 就消掉。
   ⛔⛔ 只有在**人工核对过「改动没有影响这条英文」**之后才能用 —— 所以要**强制写明理由**
      （`--why '…'`），并且它会打印 旧指纹 → 新指纹 与理由，方便在提交信息里留痕。
   ⛔ 它**不翻状态**（`reviewed` 还是 `reviewed`）、**不动版本段**。
   用法： bun tools/i18n-status.mjs --rebase id1,id2 --why '…' [--apply] */
function rebaseFingerprints(ids, why) {
  const FILES = ['data/i18n/abstracts.en.js', 'data/i18n/statements.en.js'];
  const hit = new Set();
  for (const rel of FILES) {
    const p = path.join(SRC, rel);
    const src = fs.readFileSync(p, 'utf8');
    const lines = src.split('\n');
    let cur = null;
    /* 这一行属于哪个字段：**向上扫到最近的那个键**（`statement: {` / `notes: {`）——
       ⚠️ 别按「窗口里出现过 statement 吗」判：陈述短的时候 notes 的窗口里也会出现 statement。 */
    const fieldOf = (i) => {
      for (let j = i - 1; j >= 0 && j > i - 60; j--) {
        const s = lines[j].trim();
        if (/^(statement|notes): \{$/.test(s)) return s.replace(/: \{$/, '');
        if (/^'[^']+': \{$/.test(lines[j]) || /^    \},?$/.test(lines[j])) break;
      }
      return 'abstract';
    };
    const out = lines.map((line, i) => {
      const mItem = /^    '([^']+)': \{$/.exec(line);
      if (mItem) { cur = mItem[1]; return line; }
      if (/^    \},?$/.test(line)) { cur = null; return line; }
      const mSt = /^(\s*)status: (?:'draft'|'reviewed'), basedOn: '([^'#]*)#([0-9a-f]{8})', reviewed: (.*)$/.exec(line);
      if (!mSt || !cur || ids.indexOf(cur) < 0) return line;
      const n = graphNodes[cur];
      const f = fieldOf(i);
      /* 摘要的底稿 = statement + notes；陈述/说明 = 那个字段自己 */
      const hash = f === 'statement' ? MG.zhHash(n.statement)
        : f === 'notes' ? MG.zhHash(n.notes)
          : MG.zhHash((n.statement || '') + '\n' + (n.notes || ''));
      if (mSt[3] === hash) return line;
      hit.add(`${rel}:${cur}.${f}`);
      console.log(`  ${rel} · ${cur}.${f}：${mSt[3]} → ${hash}`);
      return `${mSt[1]}status: ${/'reviewed'/.test(mSt[4]) || /'reviewed'/.test(line) ? "'reviewed'" : "'draft'"}, ` +
        `basedOn: '${mSt[2]}#${hash}', reviewed: ${mSt[4]}`;
    }).join('\n');
    if (APPLY && out !== src) fs.writeFileSync(p, out, 'utf8');
  }
  console.log(hit.size
    ? (APPLY ? `✓ 重记了 ${hit.size} 处指纹（理由：${why}）` : `（干跑）会重记 ${hit.size} 处指纹；加 --apply 才写`)
    : '✓ 没有需要重记的指纹');
  return hit.size;
}
const graphNodes = {};
{
  const w = {
    MG: {}, console,
    document: { createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }),
      addEventListener() {}, getElementById: () => null },
    performance: { now: () => Date.now() }, requestAnimationFrame: () => 0, addEventListener() {},
  };
  w.window = w; w.self = w;
  const c = vm.createContext(w);
  for (const rel of ['core/config.js', 'core/util.js', 'core/i18n.js', 'core/graph.js', 'core/layout.js',
    'data/regions.js', 'data/clusters.js']) {
    vm.runInContext(fs.readFileSync(path.join(SRC, rel), 'utf8'), c, { filename: rel });
  }
  for (const f of fs.readdirSync(path.join(SRC, 'data/packs')).sort()) {
    if (f.endsWith('.js')) vm.runInContext(fs.readFileSync(path.join(SRC, 'data/packs', f), 'utf8'), c, { filename: f });
  }
  const gg = w.MG.buildGraph(w.MG.packs, w.MG.regions, w.MG.clusters);
  Object.assign(graphNodes, gg.byId);
}
const RB = argv.indexOf('--rebase');
if (RB >= 0) {
  const ids = (argv[RB + 1] || '').split(',').map((s) => s.trim()).filter(Boolean);
  const wi = argv.indexOf('--why');
  const why = wi >= 0 ? argv[wi + 1] : '';
  if (!ids.length) { console.error('用法：--rebase id1,id2 --why "理由" [--apply]'); process.exit(2); }
  if (!why) { console.error('⛔ --rebase 必须写 --why "为什么改指纹不影响这条英文"（会打进提交信息）。'); process.exit(2); }
  rebaseFingerprints(ids, why);
  process.exit(0);
}

/* --------------------------------------------------------------- 输出 */
if (JSONOUT) {
  console.log(JSON.stringify({ version: VERSION, rows, errs }, null, 2));
} else {
  const byFile = {};
  for (const r of rows) {
    const k = byFile[r.file] = byFile[r.file] || { draft: 0, reviewed: 0, stale: 0, rows: [] };
    k[r.state]++; k.rows.push(r);
  }
  for (const [f, k] of Object.entries(byFile)) {
    console.log(`\n【${f}】${k.rows.length} 条 —— draft ${k.draft} · reviewed ${k.reviewed} · stale ${k.stale}`);
    if (MD) {
      console.log('');
      console.log('| 条目 | 字段 | 状态 | basedOn | 说明 |');
      console.log('|---|---|---|---|---|');
    }
    for (const r of k.rows) {
      if (MD) console.log(`| \`${r.id}\` | ${r.field} | **${r.state}** | \`${r.basedOn || '—'}\` | ${r.why || ''} |`);
      else if (r.state !== 'draft' || ONLY) {
        console.log(`  ${r.state.padEnd(8)} ${r.id}.${r.field}` +
          (r.basedOn ? `  ${r.basedOn}` : '  （缺 basedOn）') + (r.why ? `  ← ${r.why}` : ''));
      }
    }
    if (!MD && !ONLY) {
      const drafts = k.rows.filter(r => r.state === 'draft');
      if (drafts.length) console.log(`  （draft ${drafts.length} 条未列出：${drafts.slice(0, 6).map(r => r.id).join(' ')}${drafts.length > 6 ? ' …' : ''}）`);
    }
  }
  const total = rows.length;
  const st = rows.filter(r => r.state === 'stale').length;
  console.log(`\n合计 ${total} 条 —— reviewed ${rows.filter(r => r.state === 'reviewed').length} · ` +
    `draft ${rows.filter(r => r.state === 'draft').length} · stale ${st}（内容版本 ${VERSION}）`);
  if (errs.length) {
    console.log(`\n✗ ${errs.length} 处不合格：`);
    for (const e of errs) console.log('  - ' + e);
  } else {
    console.log('✓ 全部记录都有 status 与 basedOn。');
  }
  if (PATCH) {
    const need = rows.filter(r => r.need);
    if (!need.length) console.log('\n没有缺 basedOn 的字段 —— 不用补。');
    else {
      console.log(`\n照抄下面这些值（${need.length} 处；⛔ 只补**新写的**字段，` +
        'stale 的要重读原文对稿后再改）：');
      for (const r of need) {
        const where = r.file === 'abstracts' ? `src/data/i18n/abstracts.en.js · '${r.id}'`
          : r.file === 'statements' ? `src/data/i18n/statements.en.js · '${r.id}'.${r.field}`
          : `src/data/i18n/docs.en.js · docs.${r.id}`;
        console.log(`  ${where}\n      basedOn: '${r.need}',`);
      }
    }
  }
}
process.exit(errs.length ? 1 : 0);
