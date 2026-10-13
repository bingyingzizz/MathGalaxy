/* ==========================================================================
   数学星图 · id 稳定性巡检
   --------------------------------------------------------------------------
   为什么需要它：星图现在**公开**，节点 id 就是对外契约。别人（人、AI、别的工具）
   按 `thm.cantor` 这样的 id 引用过之后，我们这边静默改名/删除就会让引用失效。

   做法：把「当前全部 id + 一个内容版本号」快照在 `tools/ids.snapshot.json`；
   每一次改动都要对得上：

     · 新增 id          —— 正常，允许
     · 消失 id          —— **必须**先在 `tools/ids.retired.json` 里登记（带日期和原因），
                          否则本脚本 exit 1，改不动

   用法：
     bun tools/idstable.mjs                  体检（默认干跑）
     bun tools/idstable.mjs --apply          把当前 id 写进快照（版本号 patch +1）
     bun tools/idstable.mjs --apply --version v0.10    显式指定版本号
     bun tools/idstable.mjs --list           顺便把消失/新增的 id 全列出来
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SNAP = path.join(ROOT, 'tools/ids.snapshot.json');
const RETIRED = path.join(ROOT, 'tools/ids.retired.json');
const GRAPH = path.join(ROOT, 'dist/graph.json');
const PACKS = path.join(ROOT, 'src/data/packs');

const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const LIST = argv.includes('--list');
const vi = argv.indexOf('--version');
const WANT_VERSION = vi >= 0 ? argv[vi + 1] : null;

function readJSON(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return fallback; }
}
function today() { return new Date().toISOString().slice(0, 10); }
function bumpPatch(v) {
  const m = /^v(\d+)\.(\d+)\.(\d+)$/.exec(v || '');
  if (!m) return 'v0.1.0';
  return 'v' + m[1] + '.' + m[2] + '.' + (parseInt(m[3], 10) + 1);
}

/* ---------------------------------------------------------- 当前 id 从哪来 */
if (!fs.existsSync(GRAPH)) {
  console.error('✗ 找不到 dist/graph.json —— 先跑 `bun tools/build.mjs`');
  process.exit(1);
}
const graph = JSON.parse(fs.readFileSync(GRAPH, 'utf8'));
const ids = graph.nodes.map((n) => n.id).sort();

/* ⚠️ dist 可能比内容旧：那样比出来的「新增」是假的 */
let newestPack = 0, newestName = '';
for (const f of fs.readdirSync(PACKS)) {
  const st = fs.statSync(path.join(PACKS, f));
  if (st.mtimeMs > newestPack) { newestPack = st.mtimeMs; newestName = f; }
}
const graphAge = fs.statSync(GRAPH).mtimeMs;
if (newestPack > graphAge) {
  console.warn(`⚠️ dist/graph.json 比 ${newestName} 旧 —— 先跑 build.mjs，否则下面的比对不准\n`);
}

const snap = readJSON(SNAP, null);
const retired = readJSON(RETIRED, {});

if (!snap) {
  console.log('（还没有快照 tools/ids.snapshot.json）');
  console.log(`当前 ${ids.length} 个 id（来自 dist/graph.json，${(graph.meta && graph.meta.generated) || '?'}）`);
  if (!APPLY) {
    console.log('\n跑 `bun tools/idstable.mjs --apply` 建成第一版快照。');
    process.exit(0);
  }
}

const before = snap && Array.isArray(snap.ids) ? snap.ids : [];
const beforeSet = new Set(before);
const nowSet = new Set(ids);

const added = ids.filter((id) => !beforeSet.has(id));
const gone = before.filter((id) => !nowSet.has(id));
const goneUnregistered = gone.filter((id) => !retired[id]);
const goneRegistered = gone.filter((id) => retired[id]);

/* ------------------------------------------------------------------ 报告 */
const version = WANT_VERSION || (snap ? bumpPatch(snap.version) : 'v0.1.0');
console.log('数学星图 · id 稳定性巡检');
console.log('  当前 id 数：' + ids.length + (before.length ? '（上次 ' + before.length + '）' : ''));
console.log('  内容版本：  ' + (snap ? snap.version : '(还没有)') + (APPLY ? '  →  ' + version : ''));
console.log('  新增：      ' + added.length);
console.log('  消失：      ' + gone.length + '（已登记退役 ' + goneRegistered.length + '）');

if (LIST && added.length) console.log('\n  [新增] ' + added.join(' '));
if (LIST && gone.length) console.log('  [消失] ' + gone.join(' '));

if (goneRegistered.length) {
  console.log('\n  已登记退役的（引用会失效，但这是有意为之）：');
  goneRegistered.forEach((id) => console.log('    ' + id + '  ←  ' + retired[id]));
}

if (goneUnregistered.length) {
  console.error('\n✗ 有 ' + goneUnregistered.length + ' 个 id 消失但**没有登记退役**：');
  goneUnregistered.forEach((id) => console.error('    ' + id));
  console.error('\n  id 现在是对外契约。要么把它们改回来，要么在 tools/ids.retired.json 里');
  console.error('  写清「哪一天、为什么」（例如被谁并掉了），再跑 --apply。');
  process.exit(1);
}

if (!APPLY) {
  console.log('\n（干跑：没有写任何文件。确认无误后加 --apply）');
  process.exit(0);
}

const next = {
  version: version,
  generated: today(),
  note: '节点 id 是对外契约：消失的 id 必须先在 tools/ids.retired.json 登记。',
  count: ids.length,
  ids: ids
};
fs.writeFileSync(SNAP, JSON.stringify(next, null, 1) + '\n');
console.log('\n✓ 已写 tools/ids.snapshot.json（' + version + ' · ' + ids.length + ' 个 id）');
if (added.length || gone.length) {
  console.log('  ⭐ 内容变了：记得把版本号同步到站点角落与 llms.txt（' + version + '）');
}
