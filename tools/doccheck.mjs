#!/usr/bin/env bun
/* ============================================================================
   doccheck.mjs —— 文档里的「硬数字」与构建产物对不对得上

   为什么要有这个：README / CONTRIBUTING / 站点首页里写死过「节点数 / 连线数 /
   星系数 / 星团数 / 问法数」这类快照，内容一长就全成了假话
   （2026-10-22 用户发现 CONTRIBUTING 还写着「四种边」）。
   判据必须是实体：数字一律跟 dist/graph.json 的 meta.counts 比，不比记忆。
   ⛔ 更根本的一条：能插值的地方就不该手写 —— 壳页用 %%NODES%% 这类 token，
      站点页用 {{SIZE_GRAPH_MD}} 这类占位符，界面上直接运行时现算。

   检查的是**声明型模式**，不是所有数字（正文里的数学数字不归这里管）：
     `N nodes / M edges`            `N galaxies and M clusters`
     `N 个星系 / M 个星团`          `N 星系 / M 星团 / K 节点 / L 连线`
     `N annotated queries`          `N 条弱边` / `N 条推论边`
   ⚠️ 只扫**列出来的文件**，别扩到 packs/ —— 那里的数字是数学，不是统计。
   ⚠️ 2026-11-06 起也扫 AGENTS.md / HANDOVER.md（内部文档一样会过期：
      HANDOVER 的「强边」就比图里少过 2 条），并且挂在 .githooks/pre-commit 上，
      每次提交都跑。子集统计 / 历史引用可在那一行写 `stalecheck:ignore` 标掉。

   用法：bun tools/doccheck.mjs          （✗ 一条就退出码 1）
   ========================================================================== */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');
const g = JSON.parse(fs.readFileSync(path.join(ROOT, 'dist/graph.json'), 'utf8'));
const C = g.meta.counts;

const edges = g.edges;
const nWeak = edges.filter(e => e.kind === 'analogy').length;
const nPink = edges.filter(e => e.kind === 'implication' && e.layer === false).length;
const nStrong = C.strong;   // build 写进 meta.counts（= 全部边 − 弱边 − 推论）

/* 别名 / 问法钩子：只出现在 HANDOVER 的「实测状态」块里，读的是和 mg.mjs 同一份别名表。
   读不到就跳过这两条规则 —— 一份辅助表坏了不该把整个体检拖红。 */
let AL = null;
try {
  const vm = await import('node:vm');
  const win = { MG: {}, console };
  win.window = win;
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'src', 'data', 'aliases.js'), 'utf8'),
    vm.createContext(win), { filename: 'aliases.js' });
  AL = (win.MG && win.MG.aliases) || null;
} catch { AL = null; }

/* 内容版本：真源在 tools/ids.snapshot.json（idstable --apply 时 +1）。
   ⛔ 文档里不许手写版本号 —— 它会和 counts 一样过时。 */
const VERSION = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/ids.snapshot.json"), "utf8")).version;

/* searchcheck 的基准条数：数 `{ q:` 开头的条目 */
const scPath = path.join(ROOT, 'tools/searchcheck.mjs');
const scSrc = fs.readFileSync(scPath, 'utf8');
const nQueries = (scSrc.match(/^\s*\{\s*q:/gm) || []).length;

const FILES = [
  'README.md',
  'CONTRIBUTING.md',
  'site/index.html',
  /* ⚠️ 2026-11-02 加：壳页的 <meta description> / 页内「全部概念索引（N 个）」写明死的数，
     而爬虫不跑 JS ⇒ 它必须静态，只能靠构建同步（build.mjs 的 syncShellCounts）。
     列进来的意义：**构建没跑就提交，或手改回去了**，这里当场变红。 */
  'index.html',
  'i18n/glossary.md',
  'reading.md',
  'llms.txt',
  /* 2026-11-06 加：这两份不给外人看，但都写着「实测状态」，最容易过期 ——
     上一轮 HANDOVER 的「强边 3128」就比图里少 2 条，而当时 doccheck 是绿的。 */
  'AGENTS.md',
  'HANDOVER.md',
  /* 本机记录（.gitignore 忽略）。存在就查，不存在不算错。 */
  '_外链材料.md',
];

/* 可以不在的文件：只看有就查 */
const OPTIONAL = new Set(['_外链材料.md']);

/* 两档：公共面（README / 站点 / llms.txt / CONTRIBUTING）**拦提交**；
   内部文档（AGENTS / HANDOVER / 本机记录）只**提醒**。
   为什么分开：AGENTS.md / HANDOVER.md 的统计块每加一批内容就要跟着改，
   而那是正在写内容的人的文件 —— 硬拦会把他的每次提交都堵在门口，
   最后大家学会 --no-verify，阀门就白装了。提醒照样能看见是哪一行过期。
   `--strict` 让内部文档也硬拦（CI 想收紧 / 手动较真时用）。 */
const SOFT = new Set(['AGENTS.md', 'HANDOVER.md', '_外链材料.md']);
const STRICT = process.argv.includes('--strict');

/* 每条规则：pattern、期望值、怎么改 */
const RULES = [
  { re: /(\d+)\s+nodes\s*\/\s*(\d+)\s+edges/gi, got: m => [Number(m[1]), Number(m[2])], want: [C.nodes, C.edges], why: `nodes=${C.nodes} edges=${C.edges}` },
  { re: /(\d+)\s+galaxies\s+and\s+(\d+)\s+clusters/gi, got: m => [Number(m[1]), Number(m[2])], want: [C.regions, C.clusters], why: `galaxies=${C.regions} clusters=${C.clusters}` },
  { re: /(\d+)\s*个?星系\s*[/·、，,]\s*(\d+)\s*个?星团/gi, got: m => [Number(m[1]), Number(m[2])], want: [C.regions, C.clusters], why: `regions=${C.regions} clusters=${C.clusters}` },
  { re: /(\d+)\s*星系\s*\/\s*(\d+)\s*星团\s*\/\s*(\d+)\s*节点\s*\/\s*(\d+)\s*连线/gi, got: m => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])], want: [C.regions, C.clusters, C.nodes, C.edges], why: `regions/clusters/nodes/edges = ${C.regions}/${C.clusters}/${C.nodes}/${C.edges}` },
  { re: /(\d+)\s+annotated queries/gi, got: m => [Number(m[1])], want: [nQueries], why: `searchcheck 基准 ${nQueries} 条` },
  { re: /(\d+)\s*条弱边/gi, got: m => [Number(m[1])], want: [nWeak], why: `analogy ${nWeak} 条` },
  { re: /(\d+)\s*条推论边/gi, got: m => [Number(m[1])], want: [nPink], why: `layer:false 的 implication ${nPink} 条` },
  /* ---------- 2026-11-06 加：README 里同一段写着「13 个星系 · 77 个星团」和
     「这里不写死具体数字」—— 分隔符是 ·，上面只认 /，所以旧规则没拦住。
     这组规则把 / · 、 ， 都认上，并补上「N 节点 / M 边」这种组合。
     ⚠️ 子集统计（「43 节点 / 19 条边」指骨架证明）或历史引用不是全图规模，
        在那一行写 `stalecheck:ignore` 标掉，别让体检误报。 ---------- */
  { re: /(\d+)\s*个?节点\s*[/·、，,]\s*(\d+)\s*条?(?:边|连线)/gi, got: m => [Number(m[1]), Number(m[2])], want: [C.nodes, C.edges], why: `nodes=${C.nodes} edges=${C.edges}` },
  { re: /强边\s*(\d+)/g, got: m => [Number(m[1])], want: [nStrong], why: `strong=${nStrong}` },
  { re: /弱边（类比）\s*(\d+)/g, got: m => [Number(m[1])], want: [nWeak], why: `analogy=${nWeak}` },
  { re: /推论（layer:false）\s*(\d+)/g, got: m => [Number(m[1])], want: [nPink], why: `layer:false implication=${nPink}` },
  { re: /英文页\s*(\d+)/g, got: m => [Number(m[1])], want: [C.en_pages], why: `en_pages=${C.en_pages}` },
  ...(AL ? [
    { re: /别名\s*(\d+)\s*组/g, got: m => [Number(m[1])], want: [AL.nodes.length], why: `别名 ${AL.nodes.length} 组（src/data/aliases.js）` },
    { re: /问法钩子\s*(\d+)\s*条/g, got: m => [Number(m[1])], want: [AL.hooks.length], why: `问法钩子 ${AL.hooks.length} 条（src/data/aliases.js）` },
  ] : []),
  /* 内容版本号（README 的引用示例、llms.txt 的状态行都写着它） */
  { re: /content (v\d[\d.]*\d)/gi, got: m => [m[1]], want: [VERSION], why: `content ${VERSION}（tools/ids.snapshot.json）` },
  { re: /内容 (v\d[\d.]*\d)/g, got: m => [m[1]], want: [VERSION], why: `内容 ${VERSION}` },
  /* 壳页：英文 meta 描述里的总数。带千位逗号的写法也一起认（1460 / 1,460 都行）。 */
  { re: /([\d,]+)\s+nodes,\s*([\d,]+)\s+edges/gi,
    got: m => [Number(m[1].replace(/,/g, '')), Number(m[2].replace(/,/g, ''))],
    want: [C.nodes, C.edges], why: `nodes=${C.nodes} edges=${C.edges}` },
  /* 壳页：概念索引入口上写明死的个数（曾经是 706） */
  { re: /全部概念索引（(\d+)\s*个）/g, got: m => [Number(m[1])], want: [C.nodes], why: `nodes=${C.nodes}` },
  { re: /通往\s*(\d+)\s*个概念页/g, got: m => [Number(m[1])], want: [C.nodes], why: `nodes=${C.nodes}` },
  { re: /常见问法（(\d+)\s*条）/g, got: m => [Number(m[1])], want: [nQueries], why: `问法 ${nQueries} 条（按 searchcheck 同一口径数）` },
  /* ----------------------------------------------------------------
     ⭐⭐ 体积：一律不许手写。
     2026-11-02 实测到的真事 —— 首页写着「graph.md 约 420 KB / graph.json 约 550 KB」，
     实际已经 3.3 MB / 4.7 MB；graph.md 自己的页头还写着「约 390 KB」。
     现在一律走占位符（`{{SIZE_GRAPH_MD}}` / `%%SIZE_KB%%`），这里只负责「没人再写回去」。
     ⇒ 一旦出现字面量大小，就必须和 dist 里那个文件的实际大小一致，否则变红。
     ---------------------------------------------------------------- */
  { re: /约\s*([\d.]+)\s*(KB|MB)\b/g,
    got: m => [`${m[1]} ${m[2]}`],
    want: null,          // null = 只许用占位符，字面量一律算过期
    why: '体积数字必须用占位符（{{SIZE_GRAPH_MD}} / {{SIZE_GRAPH_JSON}} / %%SIZE_KB%%），不要手写' },
];

let bad = 0, soft = 0, checked = 0;
console.log('文档硬数字体检（对照 dist/graph.json 的 meta.counts）\n');
for (const rel of FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { if (!OPTIONAL.has(rel)) console.log(`  ⚠ 缺文件：${rel}`); continue; }
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  lines.forEach((line, i) => {
    /* 一行写 `stalecheck:ignore` 就跳过：那是子集统计 / 历史引用，不是全图规模。
       用它要能说清为什么 —— 否则宁可改文案。 */
    if (line.includes('stalecheck:ignore')) return;
    for (const r of RULES) {
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(line)) !== null) {
        checked++;
        const got = r.got(m).join(',');
        const want = r.want === null ? null : r.want.join(',');
        if (want === null || got !== want) {
          if (SOFT.has(rel) && !STRICT) {
            soft++;
            console.log(`  ⚠ ${rel}:${i + 1}  「${m[0].trim()}」应为 ${r.why}（内部文档，只提醒）`);
          } else {
            bad++;
            console.log(`  ✗ ${rel}:${i + 1}  「${m[0].trim()}」应为 ${r.why}`);
          }
        }
      }
    }
  });
}

/* 占位符必须在位：壳页的数量只能走 token / 运行时现算。
   改回手写之后，上面的数字规则会变红；但「手写了一个刚好对上的数字」也该拦 ——
   因为下一个节点进来它就又错了。 */
for (const [rel, token] of [['index.html', '%%NODES%%'], ['index.html', '%%EDGES%%']]) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) continue;
  if (!fs.readFileSync(p, 'utf8').includes(token)) {
    bad++;
    console.log(`  ✗ ${rel} 里没有 ${token} 占位符 —— 壳页的数量必须由构建填（meta 描述那种爬虫要的静态文本）`);
  }
}

if (soft) {
  console.log(`\n⚠ ${soft} 处内部文档数字过期（不拦提交；加 --strict 就拦）。`);
}
if (bad) {
  console.log(`\n✗ ${bad} 处过期（共查 ${checked} 处）。改完再跑一次。`);
  process.exit(1);
}
console.log(`✓ 全部对得上（共查 ${checked} 处声明）。`);
