#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 发布到 GitHub Pages
   --------------------------------------------------------------------------
   产出站点结构（dist-site/），然后推到站点仓库。

     <user>.github.io/                ← 个人网站根
       index.html                     ← 首页（占位，随便改）
       assets/site.css
       mathgalaxy/
         index.html                   ← 数学星图（自包含单文件）
         graph.json  graph.md  llms.txt   ← 给 AI 的接口文件

   用法：
     bun tools/publish.mjs              组装 + 推送
     bun tools/publish.mjs --stage      只组装到本地 dist-site/（离线可用）
     bun tools/publish.mjs --site <仓库>  换一个站点仓库（默认 <user>.github.io）

   注意：站点是**公开**的。src/data/local/ 里的私人笔记不会进 dist，
        所以也不会被发布 —— 但你自己心里要有数。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const STAGE = path.join(ROOT, 'dist-site');

const args = process.argv.slice(2);
const onlyStage = args.includes('--stage');
const siteArg = args.indexOf('--site');
const USER = process.env.MG_USER || 'bingyingzizz';
const SITE_REPO = siteArg >= 0 ? args[siteArg + 1] : `${USER}.github.io`;
const SITE_URL = `https://github.com/${USER}/${SITE_REPO}.git`;
const LIVE_URL = SITE_REPO === `${USER}.github.io`
  ? `https://${USER}.github.io/`
  : `https://${USER}.github.io/${SITE_REPO}/`;

/* ---------------------------------------------------------------- 构建 */
function run(cmd, argv, cwd, quiet = false) {
  const r = spawnSync(cmd, argv, { cwd, stdio: quiet ? 'ignore' : 'inherit' });
  return r.status === 0;
}

console.log('① 先跑一遍构建…');
if (!run('bun', [path.join(ROOT, 'tools', 'build.mjs')], ROOT)) {
  console.error('构建失败'); process.exit(1);
}

/* ---------------------------------------------------------------- 组装 */
console.log('② 组装站点…');
fs.rmSync(STAGE, { recursive: true, force: true });
fs.mkdirSync(path.join(STAGE, 'assets'), { recursive: true });
fs.mkdirSync(path.join(STAGE, 'mathgalaxy'), { recursive: true });

// 星图本体
fs.copyFileSync(path.join(DIST, 'mathgalaxy.html'), path.join(STAGE, 'mathgalaxy', 'index.html'));
for (const f of ['graph.json', 'graph.md', 'llms.txt']) {
  fs.copyFileSync(path.join(DIST, f), path.join(STAGE, 'mathgalaxy', f));
}

// 首页样式
fs.writeFileSync(path.join(STAGE, 'assets', 'site.css'), `/* 个人站点 · 全局样式（随便改） */
:root{
  --ink:#1c1c1e; --soft:#5b6068; --faint:#9aa0a8;
  --line:rgba(20,22,28,.10); --accent:#4f7cf5;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",
         "Hiragino Sans GB","Microsoft YaHei","Noto Sans SC",sans-serif;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff;color:var(--ink);font-family:var(--font);
  font-size:16px;line-height:1.75;-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
.wrap{max-width:720px;margin:0 auto;padding:clamp(40px,10vh,120px) 24px 80px}
h1{font-size:clamp(26px,5vw,38px);letter-spacing:-.02em;margin:0 0 6px}
.sub{color:var(--soft);margin:0 0 40px;font-size:15px}
h2{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);
  margin:44px 0 14px;font-weight:600}
.card{display:block;padding:18px 20px;border:1px solid var(--line);border-radius:14px;
  margin-bottom:12px;transition:.16s;color:inherit}
.card:hover{border-color:rgba(20,22,28,.22);box-shadow:0 6px 24px rgba(16,20,30,.07);
  text-decoration:none;transform:translateY(-1px)}
.card b{display:block;font-size:16.5px;margin-bottom:3px}
.card span{color:var(--soft);font-size:13.5px}
footer{margin-top:64px;padding-top:20px;border-top:1px solid var(--line);
  color:var(--faint);font-size:13px}
`);

// 首页
const idxPath = path.join(STAGE, 'index.html');
fs.writeFileSync(idxPath, `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${USER}</title>
<meta name="description" content="个人站点">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<div class="wrap">

  <!-- ⬇︎⬇︎ 这里换成你自己的名字和一句话介绍 ⬇︎⬇︎ -->
  <h1>${USER}</h1>
  <p class="sub">数学笔记与一些别的</p>
  <!-- ⬆︎⬆︎ -->

  <h2>项目</h2>

  <a class="card" href="mathgalaxy/">
    <b>数学星图 · MathGalaxy</b>
    <span>可交互的数学知识图谱 —— 定理、定义、引理按「星系 / 星团 / 恒星」三层组织，
    箭头是推出，黑线是等价，蓝线是定义引用，紫色虚线是跨领域类比。</span>
  </a>

  <h2>给 AI 的入口</h2>
  <a class="card" href="mathgalaxy/graph.md">
    <b>graph.md</b>
    <span>整张星图的 Markdown 全量导出，可直接喂给任何 AI 当数学数据库</span>
  </a>
  <a class="card" href="mathgalaxy/graph.json">
    <b>graph.json</b>
    <span>机器可读版本，每条边带 strength（强边/弱边）与完整证明</span>
  </a>
  <a class="card" href="mathgalaxy/llms.txt">
    <b>llms.txt</b>
    <span>遵循 llms.txt 约定，说明了两种检索模式该怎么用</span>
  </a>

  <footer>
    由 <a href="https://github.com/${USER}/MathGalaxy">MathGalaxy</a> 生成 ·
    <a href="https://github.com/${USER}/${SITE_REPO}">本站源码</a>
  </footer>

</div>
</body>
</html>
`);

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
    if (!run('git', ['init', '-b', 'main'], STAGE, true)) return false;
  }
  run('git', ['remote', 'remove', 'origin'], STAGE, true);
  if (!run('git', ['remote', 'add', 'origin', SITE_URL], STAGE, true)) return false;
  if (!run('git', ['add', '-A'], STAGE, true)) return false;
  run('git', ['commit', '-m', `发布：${new Date().toISOString().slice(0, 16).replace('T', ' ')}`], STAGE, true);
  return true;
})();

if (!gitOk) { console.error('git 准备失败'); process.exit(1); }

const pushed = run('git', ['push', '-u', 'origin', 'main', '--force'], STAGE);
if (pushed) {
  console.log(`\n✅ 已推送。等 GitHub 构建约 1 分钟后访问：\n   ${LIVE_URL}`);
  console.log(`   ${LIVE_URL}mathgalaxy/   ← 数学星图`);
} else {
  console.log('\n⚠️ 推送失败。常见原因：');
  console.log('   · 代理没开（git 不读 Windows 系统代理，必须显式配 proxy）');
  console.log(`   · 站点仓库还没创建：https://github.com/new 建一个叫 ${SITE_REPO} 的 **public** 仓库`);
  console.log('   本地内容已经组装在 dist-site/，网络恢复后重跑一次即可。');
}
