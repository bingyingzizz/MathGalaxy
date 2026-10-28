#!/usr/bin/env bun
/* ============================================================================
   doccheck.mjs —— 文档里的「硬数字」与构建产物对不对得上

   为什么要有这个：README / CONTRIBUTING / 站点首页里写死过
   「709 nodes / 1398 edges」「9 个星系 / 45 个星团」「24 annotated queries」，
   内容一长就全成了假话（2026-10-22 用户发现 CONTRIBUTING 还写着「四种边」）。
   判据必须是实体：数字一律跟 dist/graph.json 的 meta.counts 比，不比记忆。

   检查的是**声明型模式**，不是所有数字（正文里的数学数字不归这里管）：
     `N nodes / M edges`            `N galaxies and M clusters`
     `N 个星系 / M 个星团`          `N 星系 / M 星团 / K 节点 / L 连线`
     `N annotated queries`          `N 条弱边` / `N 条推论边`
   ⚠️ 只扫**列出来的文件**，别扩到 packs/ —— 那里的数字是数学，不是统计。

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

/* searchcheck 的基准条数：数 `{ q:` 开头的条目 */
const scPath = path.join(ROOT, 'tools/searchcheck.mjs');
const scSrc = fs.readFileSync(scPath, 'utf8');
const nQueries = (scSrc.match(/^\s*\{\s*q:/gm) || []).length;

const FILES = [
  'README.md',
  'CONTRIBUTING.md',
  'site/index.html',
  'i18n/glossary.md',
  'reading.md',
  'llms.txt',
];

/* 每条规则：pattern、期望值、怎么改 */
const RULES = [
  { re: /(\d+)\s+nodes\s*\/\s*(\d+)\s+edges/gi, got: m => [Number(m[1]), Number(m[2])], want: [C.nodes, C.edges], why: `nodes=${C.nodes} edges=${C.edges}` },
  { re: /(\d+)\s+galaxies\s+and\s+(\d+)\s+clusters/gi, got: m => [Number(m[1]), Number(m[2])], want: [C.regions, C.clusters], why: `galaxies=${C.regions} clusters=${C.clusters}` },
  { re: /(\d+)\s+个星系\s*\/\s*(\d+)\s*个星团/gi, got: m => [Number(m[1]), Number(m[2])], want: [C.regions, C.clusters], why: `regions=${C.regions} clusters=${C.clusters}` },
  { re: /(\d+)\s*星系\s*\/\s*(\d+)\s*星团\s*\/\s*(\d+)\s*节点\s*\/\s*(\d+)\s*连线/gi, got: m => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])], want: [C.regions, C.clusters, C.nodes, C.edges], why: `regions/clusters/nodes/edges = ${C.regions}/${C.clusters}/${C.nodes}/${C.edges}` },
  { re: /(\d+)\s+annotated queries/gi, got: m => [Number(m[1])], want: [nQueries], why: `searchcheck 基准 ${nQueries} 条` },
  { re: /(\d+)\s*条弱边/gi, got: m => [Number(m[1])], want: [nWeak], why: `analogy ${nWeak} 条` },
  { re: /(\d+)\s*条推论边/gi, got: m => [Number(m[1])], want: [nPink], why: `layer:false 的 implication ${nPink} 条` },
];

let bad = 0, checked = 0;
console.log('文档硬数字体检（对照 dist/graph.json 的 meta.counts）\n');
for (const rel of FILES) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { console.log(`  ⚠ 缺文件：${rel}`); continue; }
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const r of RULES) {
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(line)) !== null) {
        checked++;
        const got = r.got(m).join(',');
        const want = r.want.join(',');
        if (got !== want) {
          bad++;
          console.log(`  ✗ ${rel}:${i + 1}  「${m[0].trim()}」应为 ${r.why}`);
        }
      }
    }
  });
}

if (bad) {
  console.log(`\n✗ ${bad} 处过期（共查 ${checked} 处）。改完再跑一次。`);
  process.exit(1);
}
console.log(`✓ 全部对得上（共查 ${checked} 处声明）。`);
