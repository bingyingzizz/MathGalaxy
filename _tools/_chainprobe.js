/* 页内假拖动：自己按帧推相机，量**纯帧成本**（绕开 CDP 输入回路）。
   ⚠️ 必须每帧 cam._anim = null（页面启动后那次 fit 是带缓动的动画，会把 cam.k 拉回去）
   ?zoom=1 ⇒ 走缩放
   ⛔ 本文件不能出现反引号或美元花括号 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = {};
const a = window.MG && MG.app;
if (!a) return JSON.stringify({ err: 'no-app' });
const fatalEl = document.getElementById('mg-fatal');
if (fatalEl) return JSON.stringify({ err: 'fatal', text: String(fatalEl.textContent).slice(0, 200) });
out.渲染器 = (function () { try {
  const c = document.createElement('canvas');
  const g = c.getContext('webgl2') || c.getContext('webgl');
  if (!g) return 'no-webgl';
  const e = g.getExtension('WEBGL_debug_renderer_info');
  return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'no-ext';
} catch (err) { return 'err:' + err.message; } })();

const bb = a.graph.bbox();
const ccx = (bb.minX + bb.maxX) / 2, ccy = (bb.minY + bb.maxY) / 2;
const cam = a.cam;
const K = Number(new URLSearchParams(location.search).get('k') || 1.2);
cam._anim = null;
cam.k = K; cam.tx = cam.viewW / 2 - ccx * cam.k; cam.ty = cam.viewH / 2 - ccy * cam.k;
a.requestDraw();
await sleep(1500);
for (let i = 0; i < 80 && !(a.bitmap && a.bitmap.ready); i++) await sleep(100);
out.初始 = { mode: a.bitmap && a.bitmap.mode, size: a.bitmap && a.bitmap.size, k: a.bitmap && a.bitmap.k };

const rec = { ts: [], n: 0 };
let lTs = 0, sampling = true;
(function loop(ts) {
  if (lTs) rec.ts.push(+(ts - lTs).toFixed(2));
  lTs = ts; rec.n++;
  if (sampling) requestAnimationFrame(loop);
})(0);
function stat(arr) {
  if (!arr.length) return null;
  const s = arr.slice().sort((x, y) => x - y);
  return { n: arr.length, mean: +(arr.reduce((x, y) => x + y, 0) / arr.length).toFixed(2),
    p50: s[Math.floor(s.length * 0.5)], p95: s[Math.floor(s.length * 0.95)], max: s[s.length - 1],
    超8: arr.filter((v) => v > 8).length, 超20: arr.filter((v) => v > 20).length };
}
const ZOOM = /zoom=1/.test(String(location.search || ''));
let dragging = false, dir = 1, px = 0, zk = K, zdir = 1;
(function dragLoop() {
  if (dragging) {
    cam._anim = null;
    if (ZOOM) {
      zk *= (zdir > 0 ? 1.012 : 1 / 1.012);
      if (zk > 2.6) zdir = -1;
      if (zk < 1.0) zdir = 1;
      cam.k = zk; cam.tx = cam.viewW / 2 - ccx * zk; cam.ty = cam.viewH / 2 - ccy * zk;
    } else {
      cam.k = K; cam.tx -= dir * 10; px += 10;
      if (px > 900) { dir = -dir; px = 0; }
    }
    a.requestDraw();
  }
  requestAnimationFrame(dragLoop);
})(0);

const before = Object.assign({}, a.bitmap || {});
await sleep(2500);   // 躲开「世界档→区域档」那一次切档全烘
rec.ts.length = 0; rec.n = 0;
dragging = true;
await sleep(3000);
dragging = false;
await sleep(2500);   // 躲开「世界档→区域档」那一次切档全烘
const during = stat(rec.ts);
const rawFrames = rec.ts.slice();
rec.ts.length = 0; rec.n = 0;
await sleep(1200);
const idle = stat(rec.ts);
sampling = false;
const st = a.bitmap || {};
out.模式 = ZOOM ? '缩放' : '平移';
out.拖动中 = during;
out.空转 = idle;
out.出图 = { 轮数: (st.rounds || 0) - (before.rounds || 0), 带数: (st.bands || 0) - (before.bands || 0),
  每秒轮: +(((st.rounds || 0) - (before.rounds || 0)) / 3).toFixed(1),
  追赶: (st.rushed || 0) - (before.rushed || 0),
  同步全烘: (st.bakes || 0) - (st.rounds || 0),
  落洞: st.emerg, 分配: (st.realloc || 0) - (before.realloc || 0),
  带ms: st.bandMs, 末轮ms: st.roundMs, 松弛: st.slack, 理由: st.reason,
  同步日志: st.同步日志, 轮日志: (st.轮日志||[]).slice(-5), 速度: st.speed, 掉: st.掉,
  最大5帧: rec.ts.slice().sort(function(a,b){return b-a;}).slice(0,5) };
out.prof = (function () { try {
  const p = a.renderer.prof, f = Math.max(1, p.frames);
  return { 帧: p.frames, 边均: +(p.edges / f).toFixed(2), 节点均: +(p.nodes / f).toFixed(2), 标签均: +(p.labels / f).toFixed(2) };
} catch (e) { return { err: String(e).slice(0, 100) }; } })();
return JSON.stringify(out, null, 1);
