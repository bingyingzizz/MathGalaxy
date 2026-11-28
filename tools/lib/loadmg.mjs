/* 无头载入 MG（唯一实现）：造一个最小的 window，把引擎和内容脚本按 index.html 的顺序跑起来（不碰 DOM 的那部分）。
   build.mjs 与 routecheck 等工具共用，避免两处各写一份而漂移。 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export function loadMG({ root, contentVersion }) {
  const ROOT = root, SRC = path.join(ROOT, 'src'), CONTENT_VERSION = contentVersion;
  const win = {
    /* ⚠️ contentVersion 要事先塞进去：MG.enFieldStatus（core/i18n.js）靠它判
       「这条英文是译自哪个内容版本」；浏览器里那个值来自 index.html 的 MG.contentVersion。 */
    MG: { contentVersion: CONTENT_VERSION }, console,
    document: {
      createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }),
      addEventListener() {}, getElementById: () => null
    },
    performance: { now: () => Date.now() },
    requestAnimationFrame: () => 0,
    addEventListener() {},
  };
  win.window = win;
  win.self = win;

  const files = [
    'core/config.js', 'core/util.js', 'core/i18n.js', 'core/camera.js', 'core/graph.js',
    /* ⚠️ layoutcache 必须在 layout 之前：layout.computeLayout 里会调
       MG.layoutCache.restore(graph)，也就是「有没有预计算布局」的判定点。 */
    'core/layoutcache.js', 'core/freelayout.js', 'core/layout.js',
    'core/layers.js', 'core/nodesize.js', 'core/density.js',
    'data/regions.js', 'data/clusters.js', 'data/aliases.js', 'data/i18n.js', 'data/notation.js', 'data/xref.js',
    /* ⚠️ 只给构建用：浏览器端不需要英文文档正文（read.html 的英文版由 publish.mjs 组装），
       所以这个文件**不挂进 index.html**。 */
    'data/i18n/docs.en.js',
    /* 英文摘要（T2.2）与英文陈述/说明（T3.2）：同样只给构建用 —— 浏览器端从
       graph.js 挂好的字段读，不直接加载这两个文件。 */
    'data/i18n/abstracts.en.js',
    'data/i18n/statements.en.js',
    /* 缺口候选词表（I2）：只给 build 用——浏览器端不需要，所以也不挂进 index.html */
    'data/gaps.js',
    /* 假设受控词表（I6/T14）：同样只给构建用 */
    'data/hypotheses.js',
  ];
  const packDir = path.join(SRC, 'data', 'packs');
  /* ⭐ 包顺序必须与 index.html 的 <script> 完全一致（2026-11-11）。
     为什么：节点顺序既进 `layoutcache.signature()`，也影响布局求解的浮点累加顺序 ——
     预计算布局（dist/layout.json）的签名必须和浏览器算出来的**逐位相同**。
     按目录名排序会把 `100-x.js` 排到 `11-y.js` 前面，与页面顺序不同：实测两边的
     签名因此变成 1620:eod6d9 vs 1620:1dlkc1p，预计算整包失效。
     ⚠️ 同时校验「目录里的包」与「页面挂的包」集合一致 —— 少挂/多挂都是线上事故。 */
  const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const pagePacks = Array.from(
    shell.matchAll(/<script[^>]+src="src\/data\/packs\/([^"]+\.js)"/g), (m) => m[1]
  );
  const dirPacks = fs.readdirSync(packDir).filter((f) => f.endsWith('.js')).sort();
  if (!pagePacks.length) throw new Error('loadMG：index.html 里一个 packs <script> 都没找到');
  {
    const inPage = new Set(pagePacks), onDisk = new Set(dirPacks);
    const missing = dirPacks.filter((f) => !inPage.has(f));
    const ghost = pagePacks.filter((f) => !onDisk.has(f));
    if (missing.length || ghost.length) {
      throw new Error('loadMG：数据包与 index.html 不一致 —— ' +
        (missing.length ? '目录有但页面没挂：' + missing.join(', ') + '；' : '') +
        (ghost.length ? '页面挂了但目录没有：' + ghost.join(', ') + '；' : '') +
        '（两边不一致会让构建和网页的节点数不同）');
    }
  }
  pagePacks.forEach((f) => files.push('data/packs/' + f));

  const ctx = vm.createContext(win);
  for (const rel of files) {
    const code = fs.readFileSync(path.join(SRC, rel), 'utf8');
    try { vm.runInContext(code, ctx, { filename: rel }); }
    catch (e) { throw new Error(`载入 ${rel} 失败：${e.message}`); }
  }
  return win.MG;
}
