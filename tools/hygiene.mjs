#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 工作区卫生检查（只读，建议性）
   --------------------------------------------------------------------------
   干什么：对着 AGENTS.md §6–§8 的约定，报告「明显不该在那儿」的东西，防止
           临时脚本 / 调试截图 / 过期任务目录一点点攒成上万个文件。
   不干什么：⛔ 从不删除、移动、修改任何文件；⛔ 不读文件内容（只看名字和修改时间）；
             ⛔ 不递归扫 _audit/ _pdf/ 这类受保护的大集合；不跟随符号链接。
             它是提醒，不是门 —— 默认退出码恒为 0（`--strict` 才在有发现时退出 1）。
             清理仍由任务按 AGENTS.md §7 手动完成（只删已核实自有的显式路径）。

   用法：
     bun tools/hygiene.mjs                  # 简要报告
     bun tools/hygiene.mjs --max-age-days 3 # _tmp/ 下超过 3 天的任务目录算「过期」（默认 7）
     bun tools/hygiene.mjs --json           # 机器可读
     bun tools/hygiene.mjs --strict         # 有发现时 exit 1（想接 CI 时用）

   成本：一次 `git ls-files`、一次 `git ls-files --others`、若干个浅层 readdir/lstat。
   无任何依赖；约定写在下面的常量里，改约定就改这里（刻意不做配置框架）。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json');
const STRICT = argv.includes('--strict');
const ai = argv.indexOf('--max-age-days');
const MAX_AGE_DAYS = ai >= 0 && Number(argv[ai + 1]) > 0 ? Number(argv[ai + 1]) : 7;
const SHOW = 8; // 每节最多列几条

/* ----------------------------------------------------------- 约定（改这里） */
/* 仓库根下「按设计就不进 git」的目录/文件：不算异常 */
const KNOWN_LOCAL = new Set([
  '.git', '_audit', '_pdf', '_tools', '_tmp', '_inbox', 'dist-site', 'memory',
  '_shots', '_dsh', 'node_modules', '.claude', '_外链材料.md',
  'AGENTS.md', 'CLAUDE.md', 'papers',
]);
/* 暂时未跟踪但属已知资产（等用户决定是否入库）：不当作「未识别」 */
const KNOWN_UNTRACKED_DIRS = new Set(['formal', 'docs']);
/* 看起来像临时物的名字（根目录 / tools/ / src/ 下出现就可疑） */
const TEMPY = /(\.(bak|tmp|orig|rej|swp|log|pid|png|jpe?g|gif|zip|tar|gz|7z|html)(\.|-|$))|(\.bak-)|(^|\/)(tmp|temp|scratch|debug|probe|nul|_CON)[^/]*$/i;
/* tools/ 里允许的扩展名 / 名字 */
const TOOLS_OK = /\.(mjs|js|json|md)$/;

/* ----------------------------------------------------------- 小工具 */
const git = (args) => {
  const r = spawnSync('git', ['-C', ROOT, ...args], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  return r.status === 0 ? r.stdout : null;
};
const findings = [];            // { sec, items:[...], note }
const add = (sec, items, note) => { if (items.length) findings.push({ sec, count: items.length, items, note }); };
const lst = (p) => { try { return fs.readdirSync(p, { withFileTypes: true }); } catch { return []; } };
const lstat = (p) => { try { return fs.lstatSync(p); } catch { return null; } };

/* ----------------------------------------------------------- 一次取 git 视图 */
const trackedOut = git(['ls-files', '-z']);
if (trackedOut == null) { console.error('✗ 不是 git 仓库或找不到 git'); process.exit(2); }
const tracked = new Set(trackedOut.split('\0').filter(Boolean));
const trackedTop = new Set([...tracked].map((p) => p.split('/')[0]));
const untrackedOut = git(['ls-files', '--others', '--exclude-standard', '-z']) || '';
const untracked = untrackedOut.split('\0').filter(Boolean);   // 未跟踪且未被忽略

/* ----------------------------------------------------------- 1. 仓库根 */
{
  const odd = [];
  for (const e of lst(ROOT)) {
    const n = e.name;
    if (trackedTop.has(n) || KNOWN_LOCAL.has(n) || KNOWN_UNTRACKED_DIRS.has(n)) continue;
    odd.push(n + (e.isDirectory() ? '/' : ''));
  }
  add('根目录里没登记的条目', odd, '既没被 git 跟踪、也不在已知本地目录清单里；确认归属，或放进 _tmp/ / 删除自有的');
  const tempy = lst(ROOT).filter((e) => e.isFile() && TEMPY.test(e.name) && !trackedTop.has(e.name)).map((e) => e.name);
  add('根目录里疑似临时文件', tempy, '一次性产物应放 _tmp/<任务id>-<时间戳>/');
}

/* ----------------------------------------------------------- 2. 维护目录里的杂物 */
{
  const stray = [];
  for (const p of untracked) {
    const top = p.split('/')[0];
    if (top === 'dist') continue;                      // dist 分页文件另行汇总
    if (['tools', 'src', 'site', 'papers', 'i18n', '.githooks', '.github'].includes(top)) stray.push(p);
  }
  add('维护目录里未跟踪的文件（tools/ src/ site/ …）', stray, '要么该提交（升格为正式工具/内容），要么是遗留物 —— 别让它们留着');
  const badTool = lst(path.join(ROOT, 'tools')).filter((e) => e.isFile() && !TOOLS_OK.test(e.name)).map((e) => 'tools/' + e.name);
  add('tools/ 里不该有的文件类型', badTool, '工具只放 .mjs/.js/.json/.md');
  const toolTemp = lst(path.join(ROOT, 'tools')).filter((e) => TEMPY.test(e.name)).map((e) => 'tools/' + e.name);
  add('tools/ 里疑似临时/备份文件', toolTemp, '备份与草稿放 _tmp/，不放 tools/');
}

/* ----------------------------------------------------------- 3. 未识别的未跟踪目录 */
{
  const dirs = new Set();
  for (const p of untracked) {
    const parts = p.split('/');
    if (parts.length < 2) continue;
    const top = parts[0];
    if (top === 'dist' || KNOWN_UNTRACKED_DIRS.has(top)) continue;
    if (['tools', 'src', 'site', 'papers', 'i18n'].includes(top)) continue;   // 已在上一节汇报
    dirs.add(top + '/');
  }
  add('未识别的未跟踪目录', [...dirs], '不在已知清单里（见脚本顶部 KNOWN_*）');
  const distUn = untracked.filter((p) => p.startsWith('dist/'));
  if (distUn.length) {
    findings.push({ sec: 'dist/ 里未跟踪的构建产物', count: distUn.length, items: [], note: '多半是 build 生成的分页 *.N.md；提交前在专门的发布审查里决定，别用 git add -A' });
  }
}

/* ----------------------------------------------------------- 4. _tmp/ 任务目录 */
{
  const tmp = path.join(ROOT, '_tmp');
  const stale = [], noManifest = [], loose = [], links = [];
  const now = Date.now(), limit = MAX_AGE_DAYS * 86400000;
  for (const e of lst(tmp)) {
    const full = path.join(tmp, e.name);
    const st = lstat(full);
    if (!st) continue;
    if (st.isSymbolicLink()) { links.push('_tmp/' + e.name); continue; }          // 不跟随
    if (!st.isDirectory()) { loose.push('_tmp/' + e.name); continue; }
    const man = lstat(path.join(full, 'MANIFEST.md'));
    if (!man || !man.isFile()) noManifest.push('_tmp/' + e.name + '/');
    const newest = Math.max(st.mtimeMs, man ? man.mtimeMs : 0);
    if (now - newest > limit) stale.push('_tmp/' + e.name + '/  (' + Math.floor((now - newest) / 86400000) + ' 天)');
  }
  add('_tmp/ 下的符号链接/重解析点', links, '不跟随；确认后手动处理');
  add('_tmp/ 下直接放的文件', loose, '应放在 _tmp/<任务id>-<时间戳>/ 里');
  add('_tmp/ 任务目录缺 MANIFEST.md', noManifest, '没有归属清单 ⇒ 无法判定能不能清；补清单或保留并报告');
  add(`_tmp/ 过期任务目录（>${MAX_AGE_DAYS} 天）`, stale, '确认自己创建且已验证后，按显式路径清理');
}

/* ----------------------------------------------------------- 5. _tools/ 规模提示（只数顶层） */
{
  const top = lst(path.join(ROOT, '_tools'));
  const trackedTools = new Set([...tracked].filter((p) => p.startsWith('_tools/')).map((p) => p.split('/')[1]));
  const untrackedTop = top.filter((e) => !trackedTools.has(e.name));
  if (untrackedTop.length > 300) {
    findings.push({ sec: '_tools/ 未跟踪条目偏多', count: untrackedTop.length, items: [], note: '这里是本地验收脚本区（未入库）；一次性脚本请改放 _tmp/，可复用的再升格到 tools/' });
  }
}

/* ----------------------------------------------------------- 输出 */
if (JSON_OUT) {
  console.log(JSON.stringify({ maxAgeDays: MAX_AGE_DAYS, findings }, null, 1));
} else if (!findings.length) {
  console.log('✓ 工作区卫生：没有发现问题');
} else {
  console.log(`工作区卫生（只读建议，共 ${findings.length} 类发现；_tmp 过期阈值 ${MAX_AGE_DAYS} 天）`);
  for (const f of findings) {
    console.log(`\n· ${f.sec}：${f.count}`);
    for (const it of f.items.slice(0, SHOW)) console.log('    ' + it);
    if (f.items.length > SHOW) console.log(`    …另有 ${f.items.length - SHOW} 项（--json 看全部）`);
    if (f.note) console.log('    → ' + f.note);
  }
  console.log('\n（本工具不会删除/移动/修改任何文件；清理规则见 AGENTS.md §7）');
}
process.exit(STRICT && findings.length ? 1 : 0);
