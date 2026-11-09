#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 性能不变量硬门（perfguard）
   --------------------------------------------------------------------------
   为什么要有这个文件（2026-11-09）：
     `AGENTS.md` 第四节把性能铁律写得很细，但**文档挡不住删除**。
     实测证据：那五条最硬的规矩，有三条在文档写出来之前就已经被违反/漂移了，
     而验收仪器被删掉时没有任何东西报警 —— 于是「拖动又变卡」就这样活了几周。

     所以把「不许删」变成**机器检查**：这里每一条都对应 `AGENTS.md` 第四节的一小节，
     删掉/改坏任何一条 ⇒ 构建直接红，报错里带着「去看 4.x」和当初的实测代价。

   两条设计原则（都很重要）：
     ① **只断言「机械可判」的东西** —— 函数在不在、可疑写法有没有冒出来、旋钮取值
        是否还在合理区间。⛔ 不要绑死实现细节（例：「必须有个叫 smoothTexture 的函数」
        在背景被重写后就误报了，而当时的云雾其实是干净的）。
     ② 它证明不了「性能达标」—— 那是 `_tools/_dragbench.mjs` / `_tools/_chainprobe.js`
        的活。这支体检只保证「你没把判据本身拆掉」。

   跑在 `tools/build.mjs` 末尾（`bun tools/build.mjs` 一定过这一关），CI 也单独跑一次。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');

function read(rel) {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}
/** 取出一个函数的函数体（按大括号配对）。找不到返回 null。 */
function body(src, name) {
  if (!src) return null;
  const re = new RegExp('function\\s+' + name + '\\s*\\([^)]*\\)\\s*\\{');
  const m = re.exec(src);
  if (!m) return null;
  const start = m.index + m[0].length - 1;   // 指向 '{'
  let depth = 0;
  for (let j = start; j < src.length; j++) {
    const c = src[j];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(start + 1, j); }
  }
  return null;
}

const CORE = {
  wb: read('src/core/worldbitmap.js'),
  rnd: read('src/core/renderer.js'),
  cfg: read('src/core/config.js'),
  bg: read('src/core/background.js'),
  html: read('index.html'),
};

const fails = [];
const oks = [];
const warns = [];
function need(cond, title, why) {
  if (cond) oks.push(title);
  else fails.push({ title, why });
}

/* ---------------------------------------------------------------- 0. 文件都在 */
for (const rel of ['src/core/worldbitmap.js', 'src/core/renderer.js',
  'src/core/config.js', 'src/core/background.js', 'index.html']) {
  need(fs.existsSync(path.join(ROOT, rel)), `文件存在：${rel}`, '性能设计的主体文件之一，不能删/改名');
}

/* --------------------------------------- 1. 验收仪器还在（它们被删过一次）
   `_tools/` 大部分是 gitignore 的。2026-11-09 已用 `git add -f` 把这三个纳入 git，
   这里再守一道 —— 仪器没了，「改好了」就再也证不了。 */
for (const rel of ['_tools/_dragbench.mjs', '_tools/_chainprobe.js',
  '_tools/_smoke.engine.mjs', '_tools/_cloudchk.js']) {
  need(fs.existsSync(path.join(ROOT, rel)), `验收仪器在：${rel}`,
    'AGENTS.md 4.4 / 4.2：改完必须用它们量。它们曾经被清掉过，于是没人量、违规活了几周');
}

/* =========================================================== worldbitmap.js */
const wb = CORE.wb || '';

/* 4.1-① 换代只换元数据 + 裁剪，绝不换显示层 */
const finish = body(wb, 'finishRound');
need(!!finish, 'worldbitmap.finishRound 存在', '4.1-①：换代就在这个函数里');
need(finish != null && !/style\.display/.test(finish),
  'finishRound 里不碰 style.display',
  '4.1-①：把画好的隐藏画布切成显示 = 整张 54~108ms（合成器要整张重新光栅化上传）');

/* 4.1-② 逐条带交接只能改裁剪 */
const hand = body(wb, 'clearHandedOff');
need(!!hand, 'worldbitmap.clearHandedOff 存在', '4.1-②：逐条带交接');
need(hand != null && !/clearRect/.test(hand),
  'clearHandedOff 里没有 clearRect',
  '4.1-②：一帧里 clearRect 两张显示中的大画布 ⇒ p95 4.3 → 29.6ms');
need(/clipPath/.test(wb) && /function\s+setClip/.test(wb),
  '交接走 clip-path（setClip + clipPath）',
  '4.1-②：两条互补的裁剪 = 整屏 ⇒ 全程零 clear');

/* 4.1-③ 带轮由自己的 rAF 链驱动 */
need(/function\s+chainStep/.test(wb) && /requestAnimationFrame\(chainStep\)/.test(wb),
  '带轮有自己的 rAF 链（chainStep 自驱）',
  '4.1-③：交给 app 的 tick 驱动 ⇒ 每 tick 位移被放大几十像素 ⇒ 收尾必追赶（33~70ms 单帧）');

/* 4.1-④ 烘焙几何一轮只建一次 */
need(!!body(CORE.rnd || '', 'ensureGeomBake'),
  'renderer.ensureGeomBake 存在（烘焙几何单独一格缓存）',
  '4.1-④：每条带的 JS 2.6 → 0.45ms，没这条 p95 会顶到 8.4ms');

/* 4.1-⑤ 世界档画布尺寸量化 */
need(/WORLD_QUANT/.test(wb), '世界档画布尺寸量化（WORLD_QUANT）',
  '4.1-①⑤：世界图 = 世界长×k×dpr ⇒ 尺寸随 k 抖 ⇒ 每次重烘重新分配几十 MB（21~23 次/3s）');

/* 4.1-⑧ 速度一帧只采样一次 */
need(/countSpeed/.test(wb), '拖动速度一帧只采样一次（countSpeed）',
  '4.1-⑧：两处都采样 ⇒ 均值正好一半 ⇒ needPx 减半 ⇒ 露洞 ⇒ 每轮一根 212ms 同步全烘');

/* 4.1 烘不出来要 giveUp */
need(/function\s+giveUp/.test(wb) && /snap\.ready\s*=\s*false/.test(wb),
  '烘不出来时 giveUp（ready=false + 记签名 + hide）',
  '4.1：只 return ⇒ 屏幕上一张盖不住的旧图且永不重试（用户报的「手机先缩小再拖动周围不渲染」）');

/* 诊断字段：删了就再也没法归因（本次事故正是靠它们才查出来的） */
for (const f of ['同步日志', '轮日志', 'rushed', 'realloc', 'emerg']) {
  need(wb.includes(f), `worldbitmap.state() 仍暴露诊断字段「${f}」`,
    '这些是「为什么卡」的唯一线索；删掉等于把仪表盘拆了');
}

/* ============================================================== renderer.js */
const rnd = CORE.rnd || '';

/* 4.1-⑦ 三个裁剪函数必须逐边界认 cullBox。
   ⚠️ 只判「body 里出现过 cullBox」不够（反向测试时把 x1/y1 改回 `W/H` 照样绿 ——
   `cullBox ? cullBox.x0` 一行就贡献 2 次出现）。所以按**属性名**守：
   inView 要 x0/x1/y0/y1 四个，edgeInView / segHitsView 要 x1/y0/y1 三个。 */
const CULL_NEEDS = {
  inView: ['x0', 'x1', 'y0', 'y1'],
  edgeInView: ['x1', 'y0', 'y1'],
  segHitsView: ['x1', 'y0', 'y1'],
};
for (const [fn, fields] of Object.entries(CULL_NEEDS)) {
  const b = body(rnd, fn) || '';
  const missing = fields.filter((f) => !new RegExp('cullBox\\.' + f + '\\b').test(b));
  need(missing.length === 0,
    `${fn}() 每个边界都取 cullBox（缺：${missing.length ? missing.join(',') : '无'}）`,
    '4.1-⑦：少一个边界，带裁剪就等于只在一侧生效（第一版就漏了 edgeInView 的上边界）');
}

/* 4.1-⑦ 烘焙入口必须按 band 设 cullBox */
const ds = body(rnd, 'drawStatic');
need(ds != null && /cullBox\s*=/.test(ds), 'drawStatic 按 band 设 cullBox',
  '4.1-⑦：只加 clip 不缩裁剪框 ⇒ 16 条带 = 16 个整帧的 JS + 光栅');
need(ds != null && /try\s*\{/.test(ds) && /finally\s*\{/.test(ds),
  'drawStatic 用 try/finally 复原模块级量',
  '4.1：没有 finally ⇒ paintStatic 抛一次就永久停在「烘焙态」⇒ 标签整块没有');

/* 4.1-⑨ 位图承担静态层时不建连线几何 */
need(/EMPTY_GEOM/.test(rnd), '位图模式下跳过建几何（EMPTY_GEOM）',
  '4.1-⑨：3202 条边每帧重建 3~4ms，单这一项就吃光 240Hz 的预算');

/* 4.1-⑩ bundleOffsets 缓存 */
need(/bundleCache/.test(rnd), 'bundleOffsets 按可见集引用缓存（bundleCache）',
  '4.1-⑩：它只与可见边集合有关、与相机无关；每帧重算 = 3202 个字符串 key + 逐组 sort');

/* 4.3 新 API：不能只判「函数在不在」 */
need(/function\s+roundPath/.test(rnd) && /roundPath\(ctx/.test(rnd),
  '圆角胶囊走 roundPath（试数组 + 捕获 + 永久回退 arcTo）',
  '4.3：平板 Chromium 的 roundRect「存在但第 5 个参数只吃数组」⇒ 每帧抛错、绘制循环停摆');
const rpBody = body(rnd, 'roundPath') || '';
/* ⚠️ 注释里也会出现这个写法（文件开头就在解释「别这么写」）⇒ **整段剥掉注释**再判。
   不能只按行首 `*` / `//` 过滤：块注释的续行往往以汉字或符号开头（例：`⛔ 别写成 …`），
   那一行照样会被当成代码 —— 这就是第一版误报的原因。 */
const noComment = rnd.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
const rrOutside = noComment.split('\n')
  .filter((line) => /\.roundRect\(/.test(line))
  .filter((line) => !rpBody.includes(line.trim()));
need(rrOutside.length === 0,
  '除了 roundPath 内部，没有别处直接调 .roundRect()',
  '4.3：任何直接调用都会在旧实现上炸掉整个绘制循环（台式机看不出问题，平板直接白屏）');

/* ================================================================ config.js */
const cfg = CORE.cfg || '';
function num(name, src) {
  const m = new RegExp('\\b' + name + '\\s*:\\s*([0-9.eE]+)').exec(src || cfg);
  return m ? Number(m[1]) : null;
}
/* ⚠️ 同名键在 config 里可能出现多次（注释里也写过），取**最后一个**才算真值：
   这里用简单办法 —— 全局找所有匹配，取最后。 */
function lastNum(name) {
  const re = new RegExp('\\b' + name + '\\s*:\\s*([0-9.eE]+)', 'g');
  let m, val = null;
  while ((m = re.exec(cfg))) val = Number(m[1]);
  return val;
}
const band = lastNum('bandPx');
need(band != null && band >= 32 && band <= 96, `bandPx 在 [32,96]（现在 ${band}）`,
  '4.1：判决项是**单帧**。3202 条线时：128 ⇒ p95 16.7ms（>20ms 25~35 根）、64 ⇒ 12.5ms（3~6 根）');
const zoom = lastNum('zoomMs');
need(zoom != null && zoom > 0 && zoom <= 400, `zoomMs 在 (0,400]（现在 ${zoom}）`,
  '4.1：k 变了位图就是上一档的图被拉伸（线宽/圆点跟着缩放），0 = 只在停手时才纠正');
const worldPx = lastNum('worldPxMax');
need(worldPx != null && worldPx > 0, `worldPxMax > 0（现在 ${worldPx}）`,
  '4.1：0 = 退回「只看边长」= 最差档 k≈0.62 掉进区域模式，每 0.4s 一根 145ms 尖峰');
const maxSide = lastNum('maxSide');
need(maxSide != null && maxSide >= 2048 && maxSide <= 6144, `maxSide 在 [2048,6144]（现在 ${maxSide}）`,
  '4.1：抬到 8192 实测直接卡死页面；太小则世界档整个消失');

/* ============================================================ background.js */
const bg = CORE.bg || '';
need(/imageSmoothingQuality\s*=\s*'low'/.test(bg),
  '云雾 drawImage 的 imageSmoothingQuality 是 low',
  "4.2：改 'high' 实测 dpr=2、1600×900 下整帧 72.9 → 39.6ms");
need(/background/.test(cfg) && /MG\.background\s*=/.test(bg), '云雾层仍是 MG.background（buildTexture + draw）',
  '4.2：云雾是独立 canvas、不进烘焙；接口改名要同步 app.js 的三处调用');

/* ================================================================ index.html */
const html = CORE.html || '';
const iRnd = html.indexOf('src/core/renderer.js');
const iWb = html.indexOf('src/core/worldbitmap.js');
need(iRnd >= 0 && iWb >= 0 && iRnd < iWb,
  'index.html 里 worldbitmap.js 挂在 renderer.js 之后',
  '4.1：顺序反了 = worldbitmap 拿不到 renderer（经典 <script>，没有模块加载器）');

/* ================================================================== 输出 */
const total = oks.length + fails.length;
for (const w of warns) console.log('  ⚠️ ' + w);
if (fails.length) {
  console.error(`\n✗ 性能不变量体检：${fails.length} / ${total} 条被破坏\n`);
  for (const f of fails) {
    console.error(`  ✗ ${f.title}`);
    console.error(`    ↳ ${f.why}`);
  }
  console.error('\n  这些约束都在 `AGENTS.md` 第四节，每条后面都写着当初的实测代价。');
  console.error('  要改它们，先在那一条里给出「改前/改后」的数字，再改这里的体检。\n');
  process.exit(1);
}
console.log(`  ✓ 性能不变量体检通过（${total} 条）：位图载体 / 横带切片 / 带裁剪 / 剪交接 /`);
console.log(`    几何缓存 / dpr 口径 / 新 API 回退 / 旋钮取值 —— 见 AGENTS.md 第四节`);
