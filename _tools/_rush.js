/* 为什么追赶：把每轮的开轮/收尾状态打出来 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const a = window.MG && window.MG.app;
if (!a) return JSON.stringify({ err: 'no-app' });
const cam = a.cam, bb = a.graph.bbox();
const cx = (bb.minX + bb.maxX) / 2, cy = (bb.minY + bb.maxY) / 2;
cam._anim = null; cam.k = 1.2;
cam.tx = cam.viewW / 2 - cx * cam.k; cam.ty = cam.viewH / 2 - cy * cam.k;
a.requestDraw();
await sleep(1600);
const before = Object.assign({}, a.bitmap || {});
let n = 0;
(function loop() { if (n < 200) { cam._anim = null; cam.k = 1.2; cam.tx -= 14; n++; a.requestDraw(); requestAnimationFrame(loop); } })();
await sleep(3200);
const st = a.bitmap || {};
return JSON.stringify({
  轮数: (st.rounds || 0) - (before.rounds || 0),
  追赶: (st.rushed || 0) - (before.rushed || 0),
  落洞: st.emerg, 带高: st.bandPx, 速度: st.speed, 掉: st.掉,
  轮日志: (st.轮日志 || []).slice(-6)
}, null, 1);
