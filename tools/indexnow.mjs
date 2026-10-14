/* ==========================================================================
   IndexNow 提交 —— 把站点的 URL 推给 Bing / Yandex / Seznam / Naver
   --------------------------------------------------------------------------
   为什么需要它：Google 之外，搜索引擎**不会主动发现**一个没有外链的新页面。
   IndexNow 是唯一不需要登录任何账户的「主动报到」渠道（DuckDuckGo 用的就是
   Bing 的索引，所以在这边也能看到效果）。

   ⚠️ Google **不吃** IndexNow。它只能靠：
     ① Search Console 提交 sitemap（要用户亲手登录）
     ② 外链 —— 有人从别处链过来，Google 顺着爬
   两条都没有的话，Google 可能几个月都不会来。

   用法：
     bun tools/indexnow.mjs                 # 提交 sitemap 里的全部 URL
     bun tools/indexnow.mjs --dry           # 只看会提交什么，不发
     bun tools/indexnow.mjs <url> [<url>…]  # 只提交指定的几个 URL

   响应码：200/202 接受 · 400 格式错 · 403 key 不对 · 422 URL 不属于该 host
          · 429 太频繁（别反复跑）
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const STAGE = path.join(ROOT, 'dist-site');

/* 与 tools/publish.mjs 里的 INDEXNOW_KEY 必须一致（那边负责把 key 文件发上去） */
const KEY = '03a17f33fad664109bdb097cb3fcbb22';
const HOST = 'bingyingzizz.github.io';
const ORIGIN = 'https://' + HOST;

const argv = process.argv.slice(2);
const dry = argv.includes('--dry');
const explicit = argv.filter((a) => !a.startsWith('--'));

// URL 清单以 sitemap 为准 —— ⛔ 别手写，手写迟早和站点对不上
let urls;
if (explicit.length) {
  urls = explicit;
} else {
  const smPath = path.join(STAGE, 'sitemap.xml');
  if (!fs.existsSync(smPath)) {
    console.error(`✗ 找不到 ${path.relative(ROOT, smPath)}，先跑一次 publish.mjs --stage`);
    process.exit(1);
  }
  const sm = fs.readFileSync(smPath, 'utf8');
  urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

if (!urls.length) {
  console.error('✗ URL 清单是空的');
  process.exit(1);
}
if (urls.length > 10000) {
  console.error(`✗ 一次最多 10000 条，这里有 ${urls.length} 条 —— 要分批`);
  process.exit(1);
}
const notMine = urls.filter((u) => !u.startsWith(ORIGIN + '/'));
if (notMine.length) {
  console.error(`✗ 有 ${notMine.length} 条 URL 不属于 ${HOST}（IndexNow 会以 422 拒绝整批）：`);
  for (const u of notMine.slice(0, 5)) console.error('   ' + u);
  process.exit(1);
}

const keyUrl = `${ORIGIN}/${KEY}.txt`;
console.log(`IndexNow 提交：${urls.length} 条 URL → ${HOST}`);
console.log(`  key       : ${KEY}`);
console.log(`  key 文件  : ${keyUrl}`);
if (dry) {
  console.log('\n（--dry，没有发送）前 5 条：');
  for (const u of urls.slice(0, 5)) console.log('   ' + u);
  process.exit(0);
}

// 自检：key 文件必须已经在线可访问，否则 403
let keyOk = false;
try {
  const kr = await fetch(keyUrl, { redirect: 'follow' });
  const kt = kr.ok ? (await kr.text()).trim() : '';
  keyOk = kr.ok && kt === KEY;
  console.log(`  自检 key 文件 → HTTP ${kr.status}${keyOk ? ' ✓ 内容匹配' : ' ✗ 内容不匹配'}`);
} catch (e) {
  console.log(`  自检 key 文件 → 请求失败：${e.message}`);
}
if (!keyOk) {
  console.error('\n✗ key 文件没上线或内容不对。先跑 bun tools/publish.mjs（或等 GitHub Pages 构建完）再来。');
  process.exit(1);
}

const t0 = Date.now();
let res, body = '';
try {
  res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList: urls }),
  });
  body = await res.text();
} catch (e) {
  console.error(`\n✗ 提交请求失败：${e.message}`);
  console.error('  （网络/代理问题。api.indexnow.org 在国内可能不稳，可稍后重试）');
  process.exit(1);
}

const ms = Date.now() - t0;
const meaning = {
  200: '已接受',
  202: '已接受（待处理）',
  400: '格式错误',
  403: 'key 无效',
  422: 'URL 不属于该 host',
  429: '请求太频繁',
}[res.status] || '';

console.log(`\n提交结果：HTTP ${res.status} ${meaning}（${ms} ms）`);
if (body) console.log('  ' + body.slice(0, 400));
if (res.status === 200 || res.status === 202) {
  console.log('\n✓ 已提交。Bing 一般几小时到几天内来抓；抓完还要等它建索引。');
  console.log('  自检：过一两天搜  site:bingyingzizz.github.io  ，条目数应该开始涨。');
  console.log('  ⛔ 别反复跑这个脚本（429 限流）。');
} else {
  process.exit(1);
}
