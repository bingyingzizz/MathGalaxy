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

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const STAGE = path.join(ROOT, 'dist-site');
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
// 起服务在验证产物）：删到一半会抛 EBUSY。重试几次；目录本身删不掉也**不算失败** ——
// 里面的内容已经清干净了，紧接着就会重新铺一遍。
try {
  fs.rmSync(STAGE, { recursive: true, force: true, maxRetries: 6, retryDelay: 180 });
} catch (e) {
  console.log(`   ⚠️ dist-site 目录删不干净（${e.code || e.message}）—— 继续，内容会整个覆盖`);
}
fs.mkdirSync(path.join(STAGE, 'assets'), { recursive: true });
fs.mkdirSync(path.join(STAGE, 'mathgalaxy'), { recursive: true });

// 星图本体
fs.copyFileSync(path.join(DIST, 'mathgalaxy.html'), path.join(STAGE, 'mathgalaxy', 'index.html'));
for (const f of ['graph.json', 'graph.md', 'llms.txt', 'policy.md', 'reading.md', 'hubs.md', 'index.md']) {
  const src = path.join(DIST, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(STAGE, 'mathgalaxy', f));
}

// AI 按需检索的产物：每团一份清单、每节点一个文件、边的正文。
// ⚠️ 这些是「拆分过的图」，加起来比 graph.json 还大 —— 但**单个文件都很小**，
// 所以 AI 能一次读完一个；而 graph.json 单次抓取只能拿到开头一小段。
let aiFiles = 0;
for (const d of ['index', 'nodes', 'proofs', 'notes']) {
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
const KNOWN = ['USER', 'COUNTS', 'STRONG_WEAK', 'UPDATED', 'REPO', 'SITE_REPO', 'NAV', 'DOCS'];
function fill(tpl, map, name) {
  const out = tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in map ? map[k] : m));
  const left = [...new Set(out.match(new RegExp('\\{\\{(' + KNOWN.join('|') + ')\\}\\}', 'g')) || [])];
  if (left.length) throw new Error(`${name}：模板里还有没被替换的占位符 ${left.join(' ')}`);
  return out;
}
const readSite = (f) => fs.readFileSync(path.join(SITE, f), 'utf8');

// 首页
fs.writeFileSync(path.join(STAGE, 'index.html'), fill(readSite('index.html'), {
  USER,
  COUNTS: `${cnt.regions} 星系 / ${cnt.clusters} 星团 / ${cnt.nodes} 节点 / ${cnt.edges} 连线`,
  STRONG_WEAK: `强边 ${cnt.strong}，弱边 ${cnt.weak}`,
  UPDATED: updated,
  REPO: REPO_URL,
  SITE_REPO: SITE_REPO_URL,
}, 'site/index.html'));

/* ---------------------------- 阅读页：把 .md/.txt 在构建期渲染成静态 HTML */
// 以前这三张卡片直接链到 mathgalaxy/*.md —— 浏览器只当纯文本吐出来，又生硬又没排版。
// 现在渲染成站内的阅读页：同一份内容，排好版，切换有动画；原件仍然在 mathgalaxy/ 下
// 原封不动地躺着（AI 要读的还是它们）。
const DOCS = [
  { id: 'reading', file: 'reading.md', nav: '读图指南',   sub: '三层 / 四种边 / 层号' },
  { id: 'llms',    file: 'llms.txt',   nav: '检索协议',   sub: '给 AI 的入口' },
  { id: 'policy',  file: 'policy.md',  nav: '内容准则',   sub: '这张图为什么这么长' },
  { id: 'hubs',    file: 'hubs.md',    nav: '枢纽定理榜', sub: '哪些东西是地基' },
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
}, 'site/read.html'));
console.log(`   阅读页：${DOCS.map((d) => d.file).join(' · ')} → read.html`);

/* ------------------------------------------------------------ 收尾文件 */
fs.writeFileSync(path.join(STAGE, '.nojekyll'), '');   // 别让 Jekyll 处理
fs.writeFileSync(path.join(STAGE, 'README.md'),
  `# ${SITE_REPO}\n\n本站由 \`MathGalaxy/tools/publish.mjs\` 自动生成，**不要手改这里**。\n\n` +
  `源仓库：https://github.com/${USER}/MathGalaxy\n\n上线地址：${LIVE_URL}\n`);

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else files.push(path.relative(STAGE, p));
  }
})(STAGE);
console.log(`   组装完成：${files.length} 个文件 → dist-site/`);

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
