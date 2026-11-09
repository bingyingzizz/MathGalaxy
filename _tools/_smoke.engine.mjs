/* 引擎冒烟（页面内片段，用 cdp.mjs 跑）：改过 src/core 之后必须过这条。
   判据：① 没有 #mg-fatal ② 相机推到出名字的倍率时 labels > 0 ③ 边/节点都在画
   ④ 位图载体自报状态 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const f = document.getElementById('mg-fatal');
const a = window.MG && window.MG.app;
if (!a) return JSON.stringify({ fatal: f ? String(f.textContent).slice(0, 300) : null, app: '不存在' });
const bm0 = a.bitmap ? { ready: a.bitmap.ready, mode: a.bitmap.mode, k: a.bitmap.k, 尺寸: a.bitmap.size } : null;
const c = a.cam;
c._anim = null;
const n = (function () { let t = null; a.graph.nodes.forEach(function (x) { if (x.id === 'def.limit') t = x; }); return t; })();
c.k = 1.2;
if (n) { c.tx = c.viewW / 2 - n.x * c.k; c.ty = c.viewH / 2 - n.y * c.k; }
a.renderer.profReset(); a.renderer.invalidate(); a.requestDraw();
await sleep(1600);
const zoom = { k: +c.k.toFixed(3), prof: Object.assign({}, a.renderer.prof),
  bmp: a.bitmap ? { ready: a.bitmap.ready, mode: a.bitmap.mode, 盖住: a.bitmap.covered, 尺寸: a.bitmap.size, 带高: a.bitmap.bandPx } : null };
c._anim = null; c.k = 0.09; c.tx = c.viewW / 2; c.ty = c.viewH / 2;
a.renderer.profReset(); a.requestDraw();
await sleep(1600);
const fit = { k: +c.k.toFixed(3), prof: Object.assign({}, a.renderer.prof),
  bmp: a.bitmap ? { ready: a.bitmap.ready, mode: a.bitmap.mode, 尺寸: a.bitmap.size } : null };
a.view.hover = { type: 'node', id: 'def.limit' };
a.renderer.invalidate(); a.requestDraw();
await sleep(700);
return JSON.stringify({
  fatal: f ? String(f.textContent).slice(0, 300) : null,
  初始位图: bm0, 推近: zoom, 全图: fit, 末帧有hover: !!a.view.hover,
}, null, 1);
