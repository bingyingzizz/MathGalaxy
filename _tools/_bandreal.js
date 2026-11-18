/* 把同一条带分别画到「真实显示中的画布」与「离屏画布」，比 JS 耗时 ——
   用来区分「内容真的贵」和「在显示画布上逐笔 flush 的 GPU 回压」。 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(2000);
const a = window.MG && window.MG.app;
if (!a) return JSON.stringify({ err: 'no-app' });
const R = a.renderer, cam = a.cam;
cam._anim = null; cam.k = 1.2;
const bb = a.graph.bbox();
const cx = (bb.minX + bb.maxX) / 2, cy = (bb.minY + bb.maxY) / 2;
cam.tx = cam.viewW / 2 - cx * cam.k; cam.ty = cam.viewH / 2 - cy * cam.k;
a.requestDraw(); await sleep(1500);
const st = a.bitmap || {};
const els = [].slice.call(document.querySelectorAll('canvas[data-mg="worldbitmap"]'));
const live = (st.live >= 0 && els[st.live]) ? els[st.live] : null;
if (!live) return JSON.stringify({ err: '没有显示中的位图画布', live: st.live });
const W = live.width, H = live.height;
const scale = cam.k;
const halfW = cam.viewW / 2 / scale + 200, halfH = cam.viewH / 2 / scale + 200;
const rect = { minX: cx - halfW, minY: cy - halfH, maxX: cx + halfW, maxY: cy + halfH };
const off = document.createElement('canvas'); off.width = W; off.height = H;
const out = { 显示画布: W + 'x' + H, 可见边: a.view.visible.length, 节点: a.graph.nodes.length };
function t(fn, n) { fn(); const t0 = performance.now(); for (let i = 0; i < n; i++) fn(); return +((performance.now() - t0) / n).toFixed(2); }
const Y0 = Math.round(H * 0.4), BH = 64;
out['离屏_单带'] = t(function () { R.drawStatic(off.getContext('2d'), scale, rect, { y0: Y0, h: BH }); }, 4);
out['离屏_整张'] = t(function () { R.drawStatic(off.getContext('2d'), scale, rect); }, 2);
out['显示_单带'] = t(function () { R.drawStatic(live.getContext('2d'), scale, rect, { y0: Y0, h: BH }); }, 4);
out['显示_单带_再来一次'] = t(function () { R.drawStatic(live.getContext('2d'), scale, rect, { y0: Y0, h: BH }); }, 4);
a.requestDraw();
return JSON.stringify(out, null, 1);
