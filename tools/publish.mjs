#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 发布到 GitHub Pages
   --------------------------------------------------------------------------
   产出站点结构（dist-site/），然后推到站点仓库。

     <user>.github.io/                ← 个人网站根
       index.html                     ← 首页（模板在 site/index.html）
       read.html                      ← 阅读页（模板在 site/read.html）
       assets/site.css  read.css
       mathgalaxy/
         index.html                   ← 数学星图（自包含单文件）
         graph.json  graph.md  llms.txt   ← 给 AI 的接口文件

   站点自己的 HTML / CSS 都在 **site/** 里，这个脚本只干三件事：
     ① 把 dist/ 的产物摆到该在的位置；
     ② 把 {{占位符}} 换成真数字（规模、更新日期、链接）；
     ③ 把「怎么读这张图」那几份 .md/.txt 在**构建期**渲染成 HTML 塞进 read.html。
   为什么第 ③ 步不在浏览器里做：那样双击 dist-site/index.html 就打不开阅读页
   （file:// 下 fetch 被拦），而站点必须能离线双击打开。

   用法：
     bun tools/publish.mjs              组装 + 推送
     bun tools/publish.mjs --stage      只组装到本地 dist-site/（离线可用）
     bun tools/publish.mjs --stage --no-build
                                        跳过完整重建，拿现有 dist/ 直接组装
                                        （改站点样式时用；内容改动别走这条路）
     bun tools/publish.mjs --site <仓库>  换一个站点仓库（默认 <user>.github.io）

   本脚本不依赖 shell 的命令查找：bun 直接用「正在跑本脚本的那个 bun」，
   git 按「PATH → 常见安装位置」解析。要覆盖就设环境变量 MG_BUN / MG_GIT。

   注意：站点是**公开**的，发布的是 dist/ 的产物（星图 + 给 AI 的接口文件）。
        私人物料（_pdf/、_tools/）不进 dist，所以不会被发布。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { renderDoc, esc } from './md.mjs';
import { buildSitePages } from './sitepages.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SRC = path.join(ROOT, 'src');
/* 组装目录。默认 `dist-site/`；`MG_STAGE` 可以换到别的盘 ——
   ⚠️ 见下面「清空」那段的说明：本机 `H:` 是**机械硬盘**，跑 git 比 `C:`（NVMe）慢。 */
const STAGE = process.env.MG_STAGE ? path.resolve(process.env.MG_STAGE) : path.join(ROOT, 'dist-site');
const SITE = path.join(ROOT, 'site');

const args = process.argv.slice(2);
const onlyStage = args.includes('--stage');
const noBuild = args.includes('--no-build');
const siteArg = args.indexOf('--site');
const USER = process.env.MG_USER || 'bingyingzizz';
const SITE_REPO = siteArg >= 0 ? args[siteArg + 1] : `${USER}.github.io`;
const SITE_URL = `https://github.com/${USER}/${SITE_REPO}.git`;
const LIVE_URL = SITE_REPO === `${USER}.github.io`
  ? `https://${USER}.github.io/`
  : `https://${USER}.github.io/${SITE_REPO}/`;

/* ------------------------------------------------------- 找 bun / git */
/**
 * 解析外部命令的位置，按「环境变量 → PATH → 常见安装位置」的顺序来。
 *
 * 为什么不直接用裸名字去 spawn：命令查找依赖环境 —— 比如本机 shell 的
 * PATHEXT 是坏的（只有 .CPL），`where git` / `Get-Command git` 都找不到，
 * 虽然 spawn 恰好还能找到。自己解析一次，行为可预期，找不到时也能给出
 * 「照着做就能修好」的提示，而不是让 build / push 莫名其妙地失败。
 */
function findExe(envVar, exeName, candidates) {
  const custom = process.env[envVar];
  if (custom) return fs.existsSync(custom) ? custom : null;
  if (spawnSync(exeName, ['--version'], { stdio: 'ignore' }).status === 0) return exeName;
  for (const c of candidates) if (c && fs.existsSync(c)) return c;
  return null;
}

// 我们自己就跑在 bun 上 → process.execPath 就是 bun 本身，最可靠
const BUN = process.env.MG_BUN || process.execPath || 'bun';
const GIT = findExe('MG_GIT', 'git', [
  'C:\\Program Files\\Git\\cmd\\git.exe',
  'C:\\Program Files (x86)\\Git\\cmd\\git.exe',
  process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs', 'Git', 'cmd', 'git.exe'),
  'H:\\Git\\cmd\\git.exe',                       // ← 本机的 git 装在 H: 盘
]);

if (!GIT) {
  console.error('找不到 git。装一个，或用环境变量指定，例如：');
  console.error('  set MG_GIT=H:\\Git\\cmd\\git.exe');
  process.exit(1);
}
console.log(`   工具链：bun=${BUN}　git=${GIT}`);

/* ---------------------------------------------------------------- 构建 */
function run(cmd, argv, cwd, quiet = false) {
  const r = spawnSync(cmd, argv, { cwd, stdio: quiet ? 'ignore' : 'inherit' });
  return r.status === 0;
}

if (noBuild) {
  console.log('① 跳过构建（--no-build）：直接拿现有 dist/ 组装');
} else {
  console.log('① 先跑一遍构建…');
  if (!run(BUN, [path.join(ROOT, 'tools', 'build.mjs')], ROOT)) {
    console.error('构建失败'); process.exit(1);
  }
}

/* ---------------------------------------------------------------- 组装 */
console.log('② 组装站点…');
// ⚠️ Windows 上 dist-site 可能正被别的东西占着（比如拿 _tools/site-srv.mjs
// 起服务在验证产物）：删到一半会抛 EBUSY。重试几次；删不掉也**不算失败** ——
// 里面的内容已经清干净了，紧接着就会重新铺一遍。
//
// ⚠️⚠️ 清空时**必须留下 `.git`**。冷仓库每次都要重写 1300 个对象，纯属白干。
// 本机 `H:` 是**机械硬盘（WDC WD40EZRZ, SATA）**，`C:` 是 NVMe SSD ——
// 200 个文件跑 `git add`：H: 约 4 秒 / C: 约 1 秒，这是机械盘的正常差距。
// ⛔ 2026-10-08 这里曾写着「H: 慢 50 倍」，那是**误判**：当时测到 51.5 秒，
//    真凶是 Steam 正在下载、把这块机械盘占满。加一条：排除后台 I/O 之前，
//    别把「慢」归给盘。把 `.git` 一起删掉还会因中途超时留下 `index.lock`，
//    下一次直接 `fatal: Unable to create index.lock`。
// 留着对象库，后续发布只写「这次变了的那几个」。
fs.mkdirSync(STAGE, { recursive: true });
for (const e of fs.readdirSync(STAGE, { withFileTypes: true })) {
  if (e.name === '.git') continue;
  try {
    fs.rmSync(path.join(STAGE, e.name), { recursive: true, force: true, maxRetries: 6, retryDelay: 180 });
  } catch (err) {
    console.log(`   ⚠️ dist-site/${e.name} 删不干净（${err.code || err.message}）—— 继续，内容会整个覆盖`);
  }
}
fs.mkdirSync(path.join(STAGE, 'assets'), { recursive: true });
fs.mkdirSync(path.join(STAGE, 'mathgalaxy'), { recursive: true });

// 星图本体
fs.copyFileSync(path.join(DIST, 'mathgalaxy.html'), path.join(STAGE, 'mathgalaxy', 'index.html'));
for (const f of ['graph.json', 'graph.md', 'llms.txt', 'policy.md', 'reading.md', 'hubs.md', 'index.md',
                 'notation.md', 'notation-full.md', 'alias.md', 'LICENSE.txt']) {
  const src = path.join(DIST, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(STAGE, 'mathgalaxy', f));
}

// AI 按需检索的产物：每团一份清单、每节点一个文件、边的正文。
// ⚠️ 这些是「拆分过的图」，加起来比 graph.json 还大 —— 但**单个文件都很小**，
// 所以 AI 能一次读完一个；而 graph.json 单次抓取只能拿到开头一小段。
let aiFiles = 0;
for (const d of ['index', 'nodes', 'proofs', 'notes', 'notation', 'alias']) {
  const src = path.join(DIST, d);
  if (!fs.existsSync(src)) continue;
  fs.cpSync(src, path.join(STAGE, 'mathgalaxy', d), { recursive: true });
  aiFiles += fs.readdirSync(src).length;
}
console.log(`   按需检索产物：${aiFiles} 个文件 → mathgalaxy/{index,nodes,proofs,notes}/`);

// KaTeX 字体：单文件里的 CSS 是**内联**的，而里面的 url(fonts/…) 是相对
// 「加载这个 CSS 的页面」解析的 —— 也就是相对 mathgalaxy/index.html。
// 所以字体必须跟它同目录一起发上去，否则线上公式没有数学字体（会退化）。
const fontSrc = path.join(DIST, 'fonts');
if (fs.existsSync(fontSrc)) {
  const fontDst = path.join(STAGE, 'mathgalaxy', 'fonts');
  fs.mkdirSync(fontDst, { recursive: true });
  let nf = 0;
  for (const f of fs.readdirSync(fontSrc)) {
    if (f.endsWith('.woff2')) { fs.copyFileSync(path.join(fontSrc, f), path.join(fontDst, f)); nf++; }
  }
  console.log(`   KaTeX 字体：${nf} 个 woff2 → mathgalaxy/fonts/`);
}

/* -------------------------------------------------------- 站点页面（site/） */
// 站点自己的样式 / 图标，原样搬过去
const assetDir = path.join(SITE, 'assets');
for (const f of fs.readdirSync(assetDir)) {
  fs.copyFileSync(path.join(assetDir, f), path.join(STAGE, 'assets', f));
}

// 阅读页也要渲染 LaTeX（记号对照表里全是 $…$）。
// KaTeX 的 CSS 用 url(fonts/…) 找字体，是相对**它自己**解析的 ⇒ 字体要放在 assets/fonts/。
const katexFiles = ['katex.min.js', 'katex.min.css'];
for (const f of katexFiles) {
  fs.copyFileSync(path.join(SRC, 'ui', f), path.join(STAGE, 'assets', f));
}
const katexFontSrc = path.join(SRC, 'ui', 'fonts');
const katexFontDst = path.join(STAGE, 'assets', 'fonts');
fs.mkdirSync(katexFontDst, { recursive: true });
let kf = 0;
for (const f of fs.readdirSync(katexFontSrc)) {
  if (f.endsWith('.woff2')) { fs.copyFileSync(path.join(katexFontSrc, f), path.join(katexFontDst, f)); kf++; }
}
console.log(`   阅读页 KaTeX：${katexFiles.join(' + ')} + ${kf} 个 woff2 → assets/`);

// 规模与「最近更新」都从构建产物里读，不手写（免得又对不上）
const distMeta = JSON.parse(fs.readFileSync(path.join(DIST, 'graph.json'), 'utf8')).meta;
const cnt = distMeta.counts;
const updated = String(distMeta.generated).slice(0, 10);
const REPO_URL = `https://github.com/${USER}/MathGalaxy`;
const SITE_REPO_URL = `https://github.com/${USER}/${SITE_REPO}`;

/**
 * 填 {{占位符}}。填完还残留**已知名字**的占位符 = 模板和脚本对不上，
 * 直接失败 —— 否则 {{COUNTS}} 会原样发到线上，这种事语法上完全看不出来。
 */
const KNOWN = ['USER', 'COUNTS', 'STRONG_WEAK', 'UPDATED', 'REPO', 'SITE_REPO', 'NAV', 'DOCS', 'HEAD_EXTRA'];
function fill(tpl, map, name) {
  const out = tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in map ? map[k] : m));
  const left = [...new Set(out.match(new RegExp('\\{\\{(' + KNOWN.join('|') + ')\\}\\}', 'g')) || [])];
  if (left.length) throw new Error(`${name}：模板里还有没被替换的占位符 ${left.join(' ')}`);
  return out;
}
const readSite = (f) => fs.readFileSync(path.join(SITE, f), 'utf8');

/**
 * 分享卡片 / 收录用的 head 片段：canonical + OG + Twitter + 一段 JSON-LD。
 * 没有 og:image —— 站点没有位图素材（favicon 是内联 SVG，做不了 og:image）；
 * 要加就得先生成一张 1200×630 的图，那是另一件事。
 */
function headExtra({ title, desc, url, ld }) {
  return [
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${esc(USER)}.github.io">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:locale" content="zh_CN">`,
    `<meta name="twitter:card" content="summary">`,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  ].join('\n');
}

const SITE_ORIGIN = LIVE_URL.replace(/\/$/, '');   // 站点绝对地址（无尾斜杠）

// 首页
fs.writeFileSync(path.join(STAGE, 'index.html'), fill(readSite('index.html'), {
  USER,
  COUNTS: `${cnt.regions} 星系 / ${cnt.clusters} 星团 / ${cnt.nodes} 节点 / ${cnt.edges} 连线`,
  STRONG_WEAK: `强边 ${cnt.strong}，弱边 ${cnt.weak}`,
  UPDATED: updated,
  REPO: REPO_URL,
  SITE_REPO: SITE_REPO_URL,
  HEAD_EXTRA: headExtra({
    title: `${USER} · 数学笔记`,
    desc: '个人站点：数学笔记与一些别的，主体是数学星图 MathGalaxy。',
    url: `${SITE_ORIGIN}/`,
    ld: {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: `${USER}.github.io`, url: `${SITE_ORIGIN}/`, inLanguage: 'zh-CN',
      description: '个人站点：数学笔记与一些别的，主体是数学星图 MathGalaxy。',
    },
  }),
}, 'site/index.html'));

/* ---------------------------- 阅读页：把 .md/.txt 在构建期渲染成静态 HTML */
// 以前这三张卡片直接链到 mathgalaxy/*.md —— 浏览器只当纯文本吐出来，又生硬又没排版。
// 现在渲染成站内的阅读页：同一份内容，排好版，切换有动画；原件仍然在 mathgalaxy/ 下
// 原封不动地躺着（AI 要读的还是它们）。
const DOCS = [
  { id: 'reading',  file: 'reading.md',       nav: '读图指南',   sub: '三层 / 四种边 / 层号' },
  { id: 'notation', file: 'notation-full.md', nav: '记号对照表', sub: '包含 / 真包含 / 补集 / 字母谁是谁' },
  { id: 'llms',     file: 'llms.txt',         nav: '检索协议',   sub: '给 AI 的入口' },
  { id: 'policy',   file: 'policy.md',        nav: '内容准则',   sub: '这张图为什么这么长' },
  { id: 'hubs',     file: 'hubs.md',          nav: '枢纽定理榜', sub: '哪些东西是地基' },
  { id: 'license',  file: 'LICENSE.txt',      nav: '许可与引用', sub: '引用请标注节点 id' },
];

const navHtml = DOCS.map((d) =>
  `    <a href="#${d.id}" data-doc="${d.id}"><b>${esc(d.nav)}</b><span>${esc(d.sub)}</span></a>`
).join('\n');

const docsHtml = DOCS.map((d) => {
  const src = path.join(DIST, d.file);
  if (!fs.existsSync(src)) throw new Error(`阅读页要用的 dist/${d.file} 不在，先检查构建`);
  const { title, html } = renderDoc(fs.readFileSync(src, 'utf8'));
  if (!title) throw new Error(`dist/${d.file} 的第一行不是 # 标题，阅读页取不到标题`);
  return [
    `    <section class="doc" id="${d.id}" data-title="${esc(d.nav)}" data-raw="mathgalaxy/${d.file}">`,
    `      <h1 class="stag">${esc(title)}</h1>`,
    `      <div class="body">`,
    html.split('\n').map((l) => '        ' + l).join('\n'),
    `      </div>`,
    `    </section>`,
  ].join('\n');
}).join('\n\n');

fs.writeFileSync(path.join(STAGE, 'read.html'), fill(readSite('read.html'), {
  USER,
  UPDATED: updated,
  NAV: navHtml,
  DOCS: docsHtml,
  HEAD_EXTRA: headExtra({
    title: `怎么读这张图 · ${USER}`,
    desc: '数学星图的读图指南、记号对照表、检索协议、内容准则与枢纽定理榜。',
    url: `${SITE_ORIGIN}/read.html`,
    ld: {
      '@context': 'https://schema.org', '@type': 'WebPage',
      name: '怎么读这张图', url: `${SITE_ORIGIN}/read.html`, inLanguage: 'zh-CN',
      description: '数学星图的读图指南、记号对照表、检索协议、内容准则与枢纽定理榜。',
      isPartOf: { '@type': 'WebSite', name: `${USER}.github.io`, url: `${SITE_ORIGIN}/` },
    },
  }),
}, 'site/read.html'));
console.log(`   阅读页：${DOCS.map((d) => d.file).join(' · ')} → read.html`);

/* ------------------------------- 概念页：每个节点一份**真 HTML**（给搜索引擎） */
// 为什么要这一步：
//   nodes/<id>.md 由 GitHub Pages 以 `Content-Type: text/markdown` 提供，
//   搜索引擎抓取后判定「这不是网页」，**整站 706 个概念页一个都进不了索引**
//   （实测 site: 查询只返回 3 个 URL：/、/read.html、和意外被抓的 graph.md）。
//   所以每个概念再出一份 HTML —— 标题是概念名、正文是陈述与证明、公式在构建期
//   就渲染成静态 MathML，页面互链成网。
// ⚠️ .md 一个都不动：它们是给 AI 的按需检索产物，llms.txt 那条协议照旧。
const graph = JSON.parse(fs.readFileSync(path.join(DIST, 'graph.json'), 'utf8'));
const { pages: conceptPages, stats: pageStats, mathErrors } = buildSitePages(graph, {
  origin: SITE_ORIGIN, user: USER,
});
// 公式渲染失败一律硬失败：静默降级会在页面上留一串裸 LaTeX
if (mathErrors.length) {
  console.error(`✗ 概念页有 ${mathErrors.length} 处公式渲染失败：`);
  for (const e of mathErrors.slice(0, 8)) console.error(`   ${e.mode} | ${e.msg} | ${e.tex.slice(0, 80)}`);
  process.exit(1);
}
for (const p of conceptPages) {
  const f = path.join(STAGE, 'mathgalaxy', p.rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, p.html, 'utf8');
}
console.log(`   概念页：${pageStats.nodes} 个概念 → ${pageStats.total} 个 HTML` +
  `（平均 ${(pageStats.avgBytes / 1024).toFixed(0)} KB，概念间内链平均 ` +
  `${(graph.edges.length * 2 / pageStats.nodes).toFixed(1)} 条/页）`);
if (pageStats.orphan) console.log(`   ⚠️ 无出入边的孤立概念 ${pageStats.orphan} 个：${pageStats.orphanSample.join(' ')}`);

/* -------------------- 站点根：给爬虫与 AI agent 的入口文件 -------------------- */
// 三个文件的分工：
//   robots.txt   约定俗成，爬虫从这里知道「随便抓」，并找到 sitemap
//   sitemap.xml  列**能被搜索引擎索引的 HTML 页**：入口 + 706 个概念页 + all.html
//   llms.txt     给 AI agent 的固定入口（约定放在域名根）：先读哪几份、怎么引用
// ⚠️ 手写清单迟早和站点对不上 —— 一律现算。
const contentDirs = ['nodes', 'index', 'proofs', 'notes'];
const contentMd = [];
for (const d of contentDirs) {
  const p = path.join(DIST, d);
  if (!fs.existsSync(p)) continue;
  for (const f of fs.readdirSync(p).filter((x) => x.endsWith('.md')).sort()) {
    contentMd.push(`${d}/${f}`);
  }
}
/* ⚠️ .md **不再进 sitemap**（2026-10-14 改）。
   搜索引擎不索引 `text/markdown`：列进去只是让 Google 抓完堆进
   「已抓取，尚未编入索引」，白耗抓取预算（实测整站 .md 一条都没被索引）。
   文件本身一个都没动，AI 走根 llms.txt 那条协议照旧能找到 —— 那条协议本来
   就不是给搜索引擎看的。 */
const smEntries = [
  { loc: `${SITE_ORIGIN}/`, pri: '1.0' },
  { loc: `${SITE_ORIGIN}/read.html`, pri: '0.8' },
  { loc: `${SITE_ORIGIN}/mathgalaxy/`, pri: '1.0' },
  { loc: `${SITE_ORIGIN}/mathgalaxy/all.html`, pri: '0.9' },        // 全部概念的入口，爬虫从这儿进
  { loc: `${SITE_ORIGIN}/mathgalaxy/questions.html`, pri: '0.8' },  // 184 条真实问法，长尾入口
  ...['index.md', 'llms.txt', 'reading.md', 'policy.md', 'hubs.md', 'notation.md', 'alias.md', 'LICENSE.txt']
    .map((f) => ({ loc: `${SITE_ORIGIN}/mathgalaxy/${f}`, pri: '0.4' })),
  // 概念页：一个概念一页，这才是能被「搜概念名」命中的东西
  ...conceptPages.filter((p) => p.rel.startsWith('nodes/')).map((p) => ({
    loc: `${SITE_ORIGIN}/mathgalaxy/${p.rel}`, pri: '0.7',
  })),
];
fs.writeFileSync(path.join(STAGE, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  smEntries.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${updated}</lastmod><priority>${u.pri}</priority></url>`).join('\n') +
  '\n</urlset>\n', 'utf8');
fs.writeFileSync(path.join(STAGE, 'robots.txt'),
  '# 全部允许抓取 —— 这张图就是给人看、给 AI 读的\n' +
  'User-agent: *\nAllow: /\n\n' +
  `Sitemap: ${SITE_ORIGIN}/sitemap.xml\n`, 'utf8');

/* ------------------------------------------- IndexNow：让 Bing 系主动来抓 */
// 一个 key 文件放在站点根 + 一次 POST，就能把 URL 推给 Bing / Yandex / Seznam /
// Naver —— **不需要登录任何账户**。这是 Google 之外唯一能「主动报到」的渠道，
// 而 DuckDuckGo 用的就是 Bing 的索引。
// ⚠️ Google 不吃 IndexNow：它只能靠 Search Console 提交或外链发现。
// ⚠️ 这里**只放 key 文件、不自动提交** —— 提交由 tools/indexnow.mjs 手动跑，
//    免得每次发布都往搜索引擎推一遍（IndexNow 会限流）。
// ⛔ key 是所有权凭证，改它就要重新提交一次，别随手换。
const INDEXNOW_KEY = '03a17f33fad664109bdb097cb3fcbb22';
fs.writeFileSync(path.join(STAGE, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY + '\n', 'utf8');
console.log(`   IndexNow key 文件：${INDEXNOW_KEY}.txt（提交用 tools/indexnow.mjs）`);

// 根 llms.txt：AI agent 的约定入口。**必须在一次抓取之内**（同 dist 产物的 1300 B 口径）。
const rootLlms = `# ${USER}.github.io

个人站点。主体是**数学星图 MathGalaxy**：${cnt.nodes} 个数学概念（定理 / 定义 / 引理）按
「星系 → 星团 → 恒星」三层组织，边是逻辑关系（推出 / 等价 / 定义引用 / 类比）。

## 想读内容，按这个顺序

- \`/mathgalaxy/llms.txt\`    星图的检索协议 —— **先读这一份**，它说清了每种产物怎么用
- \`/mathgalaxy/index.md\`    索引：星系、星团、节点 id 一览
- \`/mathgalaxy/nodes/<id>.md\`  一个概念一个文件，绝大多数 ≤ 1300 B，可以整份读进来
- \`/mathgalaxy/nodes/<id>.html\` 同一个概念的完整单页版（公式是 MathML、不分页，但大得多）
- \`/read.html\`              给人读的：读图指南 / 记号对照表 / 内容准则 / 枢纽定理榜

## 程序化使用

- \`/mathgalaxy/graph.json\`  全量图（约 1.7 MB），schema 见 \`/mathgalaxy/reading.md\`

## 引用

引用请标注**节点 id** 与内容版本（例：节点 \`thm.cantor\`，内容 ${distMeta.version}），
完整条款见 \`/mathgalaxy/LICENSE.txt\`。
`;
const rootLlmsBytes = Buffer.byteLength(rootLlms, 'utf8');
if (rootLlmsBytes > 1250) {
  throw new Error(`根 llms.txt 过大：${rootLlmsBytes} B（AI 单次抓取上限 ~1300 B，留 50 B 余量）`);
}
fs.writeFileSync(path.join(STAGE, 'llms.txt'), rootLlms, 'utf8');
console.log(`   根 llms.txt（${rootLlmsBytes} B）+ robots.txt + sitemap.xml（${smEntries.length} 条 URL）`);

/* ------------------------------------------------------------ 收尾文件 */
fs.writeFileSync(path.join(STAGE, '.nojekyll'), '');   // 别让 Jekyll 处理
fs.writeFileSync(path.join(STAGE, 'README.md'),
  `# ${SITE_REPO}\n\n本站由 \`MathGalaxy/tools/publish.mjs\` 自动生成，**不要手改这里**。\n\n` +
  `源仓库：https://github.com/${USER}/MathGalaxy\n\n上线地址：${LIVE_URL}\n`);

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === '.git') continue;                 // 版本库不算「站点文件」
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else files.push(path.relative(STAGE, p));
  }
})(STAGE);
console.log(`   组装完成：${files.length} 个文件 → ${path.relative(ROOT, STAGE) || STAGE}/`);

if (onlyStage) {
  console.log(`\n只组装（--stage）。上线后地址：${LIVE_URL}`);
  process.exit(0);
}

/* ---------------------------------------------------------------- 推送 */
console.log('③ 推送到站点仓库…');
const gitOk = (() => {
  if (!fs.existsSync(path.join(STAGE, '.git'))) {
    fs.mkdirSync(STAGE, { recursive: true });
    if (!run(GIT, ['init', '-b', 'main'], STAGE, true)) return false;
  }
  run(GIT, ['remote', 'remove', 'origin'], STAGE, true);
  if (!run(GIT, ['remote', 'add', 'origin', SITE_URL], STAGE, true)) return false;
  if (!run(GIT, ['add', '-A'], STAGE, true)) return false;
  run(GIT, ['commit', '-m', `发布：${new Date().toISOString().slice(0, 16).replace('T', ' ')}`], STAGE, true);
  return true;
})();

if (!gitOk) { console.error('git 准备失败'); process.exit(1); }

const pushed = run(GIT, ['push', '-u', 'origin', 'main', '--force'], STAGE);
if (pushed) {
  console.log(`\n✅ 已推送。等 GitHub 构建约 1 分钟后访问：\n   ${LIVE_URL}`);
  console.log(`   ${LIVE_URL}mathgalaxy/   ← 数学星图`);
} else {
  console.log('\n⚠️ 推送失败。常见原因：');
  console.log('   · 代理没开（git 不读 Windows 系统代理，必须显式配 proxy）');
  console.log(`   · 站点仓库还没创建：https://github.com/new 建一个叫 ${SITE_REPO} 的 **public** 仓库`);
  console.log('   本地内容已经组装在 dist-site/，网络恢复后重跑一次即可。');
}
