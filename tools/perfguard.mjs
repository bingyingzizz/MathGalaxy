#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 性能不变量硬门（perfguard）
   --------------------------------------------------------------------------
   为什么要有这个文件（2026-11-09）：
     `docs/performance-runbook.md`把性能铁律写得很细，但**文档挡不住删除**。
     实测证据：那五条最硬的规矩，有三条在文档写出来之前就已经被违反/漂移了，
     而验收仪器被删掉时没有任何东西报警 —— 于是「拖动又变卡」就这样活了几周。

     所以把「不许删」变成**机器检查**：这里每一条都对应 `docs/performance-runbook.md`的一小节，
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
  '_tools/_smoke.engine.mjs', '_tools/_cloudchk.js',
  '_tools/_bandcost.js', '_tools/_bandreal.js']) {
  need(fs.existsSync(path.join(ROOT, rel)), `验收仪器在：${rel}`,
    'docs/performance-runbook.md 4.4 / 4.2：改完必须用它们量。它们曾经被清掉过，于是没人量、违规活了几周');
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

/* ------------------------------------------- Task 3C：增量烘焙（重叠复用 + 露出矩形）
   见 PERFORMANCE.md §12。只守「机械可判」的正确性前提，不守性能数字。 */
{
  const cp = body(wb, 'copyOverlap');
  need(cp != null && /'copy'/.test(cp) && /\.clip\(\)/.test(cp) && /imageSmoothingEnabled\s*=\s*false/.test(cp),
    '3C：搬图 = 矩形裁剪 + copy 合成 + 关平滑（整数偏移 1:1，不重采样、不与目标旧墨混合）',
    '§12：source-over 搬进有旧墨的目标会叠色；平滑开着且偏移带小数会重采样、越搬越糊');
  need(!/getImageData|willReadFrequently/.test(wb),
    '3C：worldbitmap 里没有像素回读（getImageData / willReadFrequently）',
    '§12 / 研究包：回读会把画布拖进软件路径，且在拖动热路径里强制同步；正确性比对只在探针里做');
  const rp = body(wb, 'reusePlan');
  need(rp != null && /valid\.rev/.test(rp) && /staticRev\(\)/.test(rp) && /snap\.key/.test(rp)
    && /elScale\[cur\]/.test(rp) && /1e-3/.test(rp),
    '3C：复用前核对源图完整性 / 静态代次 / 绘制输入 / 比例 / 整数偏移',
    '§12：少一项就会把过期或不完整的像素当现货搬进新图（主题、过滤、内容并入、k 变了之后）');
  const ist = body(wb, 'incStep');
  need(ist != null && !/setClip|clearHandedOff/.test(ist),
    '3C：增量轮的切片期间不交接（目标整张藏到最后一片画完）',
    '§12：搬过来的重叠区与露出区在最后一片之前不完整，逐片松开裁剪 = 露出半成品');
  need(/setReuse\s*:/.test(wb) && /reuse=0/.test(read('src/core/app.js') || ''),
    '3C：增量烘焙有开关（?reuse=0 / setReuse(false) 退回整张带轮）',
    '§12：整张带轮是正确性兜底，A/B 与应急都要能一键切回');
}

/* Task 3D 旁支（3C 跨尺度交接，PERFORMANCE.md §13.7）：盖不住时旧图保留的裁剪上沿，
   分子必须用**新图**的显示倍率 mT0 = k·dpr / r.scale（与 clearHandedOff 的 mT 同式），分母才是旧图的 mO0。 */
need(/var\s+mT0\s*=\s*\(k0\s*\*\s*dpr0\)\s*\/\s*r\.scale/.test(finish || '') && /r\.h\s*\*\s*mT0/.test(finish || '')
  && !/r\.h\s*\*\s*mO0/.test(finish || ''),
  '3C 交接：finishRound 盖不住分支用新图倍率 mT0 算新图下沿（不是旧图的 mO0）',
  '§13.7：新旧 scale 不同（缩放期换代）时，放大方向旧图被裁过头 ⇒ 两图之间露洞（确定性几何探针：缝 +322 / +1340 px）');

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

/* Task 3C：增量烘焙会画竖条（x0 > 0）⇒ 左边界也要认 cullBox，烘焙几何缓存的键也要带左右边界 */
{
  const ev = body(rnd, 'edgeInView') || '', sh = body(rnd, 'segHitsView') || '', eg = body(rnd, 'ensureGeomBake') || '';
  need(/cullBox\.x0\b/.test(ev) && /cullBox\.x0\b/.test(sh) && /cullBox\.x0/.test(eg) && /cullBox\.x1/.test(eg),
    '3C：edgeInView / segHitsView 认 cullBox.x0，ensureGeomBake 的键含 x0/x1',
    '§12：竖条切片时左边界恒为 0 ⇒ 白算整张左侧的线；几何缓存键不含 x ⇒ 同一行的两片竖条会拿错几何（丢线）');
}

/* ------------------------------------------- Task 3D：节点名精确加速 + 缩放帧直画 / 懒物化
   见 PERFORMANCE.md §13。只守「机械可判」的正确性前提（路径区分、交接、回退、不许近似），不守性能数字。 */
{
  const dan = body(rnd, 'drawAllNames') || '';
  need(/if\s*\(\s*labelFast\s*&&\s*prevCam\s*&&\s*prevCam\.k\s*!==\s*c\.k\s*\)\s*\{\s*if\s*\(drawNamesLive/.test(dan)
    && (rnd.match(/\bdrawNamesLive\(/g) || []).length === 2 && !/forceDirect/.test(rnd)
    && /labelInk\.nodes\.push\(L\.text,\s*L\.x,\s*L\.y,\s*font,\s*lw,\s*stroke,\s*fill\)/.test(body(rnd, 'drawReservedLabels') || '')
    && /\bdrawReservedLabels\(\)/.test(body(rnd, 'drawLabels') || ''),
    '3D：只有「这一帧 k 真的变了」才直画；交互预留标签也记入同一份墨迹（没有强制直画开关）',
    '§13：同 k 的平移 / 停住必须走原来的位图回放；强制直画是基准里的研究开关，进生产 = 每帧全量重排');
  const iDirect = dan.indexOf('drawNamesLive('), iHand = dan.indexOf('labelHandoffOk('), iPolicy = dan.indexOf('labelLayerAlive()');
  need(iDirect >= 0 && iHand > iDirect && iPolicy > iHand && /materializeLabels\(/.test(dan),
    '3D：直画缓存交接 = 先按原策略判会不会回放（labelHandoffOk）再物化，然后照原路验戳回放',
    '§13：直画帧的层里没有那张缓存的像素；不判就贴 = 贴旧像素，判了不走原路 = 跳过验戳');
  const ho = body(rnd, 'labelHandoffOk') || '';
  need(/directOnly/.test(ho) && /record\.valid/.test(ho) && /record\.layer\s*!==\s*layer/.test(ho) && /cache\.sig\s*!==\s*sig/.test(ho)
    && /margin\s*\*\s*0\.9/.test(ho) && /!far\s*&&\s*!stopped/.test(ho),
    '3D：交接判据逐项照抄原回放条件（层 / dpr / k / 尺寸 / 指纹 / far=min(半屏,余量×0.9) / stopped）',
    '§13：少一项 ⇒ 原策略要重算的那一帧被物化成旧机位的名字（错位 / 旧主题 / 旧过滤）');
  const ml = body(rnd, 'materializeLabels') || '';
  need(/stampLabelLayer\(\)/.test(ml) && /directOnly\s*=\s*false/.test(ml) && /labBad\s*=\s*true/.test(ml),
    '3D：物化成功才打戳、清 directOnly；失败标 labBad 走重算',
    '§13：没打戳的层会被验戳判空；失败不标 labBad 会把半张层贴出去');
  const rec = body(rnd, 'labelRecorder') || '', rr = body(rnd, 'labelReplayRecord') || '';
  need((rec.match(/rec\.valid\s*=\s*false/g) || []).length >= 3 && /unbalanced/.test(rr),
    '3D：记录器遇到未登记的方法 / 非法属性值 / 不配对 restore 即作废；物化不配对即抛出',
    '§13：作废记录只能走原来的重算（fail closed）；照样物化 = 层里少画或多画东西');
  need(/getImageData/.test(body(rnd, 'labelLayerAlive') || ''),
    '3D：回放前仍按实物验戳（labelLayerAlive 的 1×1 getImageData 没被去掉）',
    '§13 / 4.1：离屏层会被浏览器回收成空白；去掉验戳 = 一直贴空图');
  const labelSec = rnd.slice(rnd.indexOf('var labelCache = null;'), rnd.indexOf('function nodeNameBudget'));
  need(labelSec.length > 0 && (labelSec.match(/createElement\(\s*'canvas'\s*\)/g) || []).length === 1
    && !/mgD\b|[Aa]tlas|mgSprite|labelSprite|__mg3d|mgLabelProbe|translate3d/.test(rnd),
    '3D：标签只有一张离屏层（无文字图集 / 精灵 / DOM 合成 / 近似缩放回放 / 研究开关）',
    '§13：图集与近似回放是被否决的研究变体（改字形、改相位、多一张常驻画布）');
  need(/i\s*>=\s*best/.test(body(rnd, 'labelGridIndex') || '') && /labelCoordsOk/.test(body(rnd, 'labelOwnSparse') || '')
    && /labelCoordsOk/.test(body(rnd, 'labelThresholdSizes') || '') && /LABEL_GRID_MAX/.test(body(rnd, 'labelGridIndex') || ''),
    '3D：避让索引返回插入序第一个阻挡者；稀疏网格对非有限 / 超大坐标退回旧实现',
    '§13：返回任意阻挡者会改 blocker 诊断与结果；坐标 ±Infinity / >2^53 时 x++ 不前进 = 死循环');
  need(/setLabelFast/.test(rnd) && /labfast=0\/\.test\(/.test(read('src/core/app.js') || '') && /setLabelFast/.test(read('src/core/app.js') || '')
    && /labelRender\s*:\s*\{\s*fast\s*:/.test(cfg0()) && fs.existsSync(path.join(ROOT, 'tools/labelcheck.mjs')),
    '3D：有回退开关（?labfast=0 / setLabelFast(false) / labelRender.fast）且离线对拍 tools/labelcheck.mjs 在',
    '§13：旧实现是正确性兜底与 A/B 基线；对拍删了就没人再证明「逐项等价」');
}
function cfg0() { return CORE.cfg || ''; }

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
  console.error('\n  这些约束都在 `docs/performance-runbook.md`，每条后面都写着当初的实测代价。');
  console.error('  要改它们，先在那一条里给出「改前/改后」的数字，再改这里的体检。\n');
  process.exit(1);
}
console.log(`  ✓ 性能不变量体检通过（${total} 条）：位图载体 / 横带切片 / 带裁剪 / 剪交接 /`);
console.log(`    几何缓存 / dpr 口径 / 新 API 回退 / 旋钮取值 —— 见 docs/performance-runbook.md`);
