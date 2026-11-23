const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const a = window.MG && window.MG.app;
if (!a) return JSON.stringify({ err: 'no-app' });
const cam = a.cam, bb = a.graph.bbox();
const cx = (bb.minX + bb.maxX) / 2, cy = (bb.minY + bb.maxY) / 2;
cam._anim = null; cam.k = 0.5;
cam.tx = cam.viewW / 2 - cx * cam.k; cam.ty = cam.viewH / 2 - cy * cam.k;
a.requestDraw(); await sleep(2000);
const before = Object.assign({}, a.bitmap || {});
const r0 = { mode: before.mode, 尺寸: before.size, 盖住: before.covered, 松弛: before.slack };
let n = 0;
(function loop() {
  if (n < 150) { cam._anim = null; cam.k = 0.5; cam.tx -= 10; n++; a.requestDraw(); requestAnimationFrame(loop); }
})();
await sleep(2500);
const st = a.bitmap || {};
return JSON.stringify({ 起始: r0, 拖动后: { mode: st.mode, 尺寸: st.size, 盖住: st.covered, 松弛: st.slack },
  本轮烘: (st.bakes || 0) - (before.bakes || 0), 轮数: (st.rounds || 0) - (before.rounds || 0),
  同步全烘: ((st.bakes || 0) - (st.rounds || 0)) - ((before.bakes || 0) - (before.rounds || 0)),
  追赶: (st.rushed || 0) - (before.rushed || 0), 落洞: st.emerg, 理由: st.reason }, null, 1);
