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

   ⛔ 本工具**不写任何文件**。stale 要靠「重新对稿」消掉，不是把 basedOn 刷新一下 ——
      那样等于悄悄作废审校记录（要重设就自己把那一行改成上面打印的新值）。
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
