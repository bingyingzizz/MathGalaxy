const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const a = window.MG && window.MG.app;
if (!a) return JSON.stringify({ err: 'no-app' });
const cam = a.cam, bb = a.graph.bbox();
const cx = (bb.minX + bb.maxX) / 2, cy = (bb.minY + bb.maxY) / 2;
cam._anim = null; cam.k = 0.5;
cam.tx = cam.viewW / 2 - cx * cam.k; cam.ty = cam.viewH / 2 - cy * cam.k;
a.requestDraw();
await sleep(2000);
const out = { 请求k: 0.5, 实际k: +cam.k.toFixed(4) };
const st = a.bitmap || {};
Object.assign(out, { mode: st.mode, 尺寸: st.size, 盖住: st.covered, 松弛: st.slack, 理由: st.reason });
/* 手动查一次：按当前相机算出来的pick是什么 */
out.worldK = st.worldK;
out.视口 = cam.viewW + 'x' + cam.viewH;
/* 推 k 一点点，看世界档还盖得住吗 */
for (const kk of [0.55, 0.60, 0.62]) {
  cam._anim = null; cam.k = kk;
  cam.tx = cam.viewW / 2 - cx * kk; cam.ty = cam.viewH / 2 - cy * kk;
  a.requestDraw(); await sleep(900);
  const s = a.bitmap || {};
  out['k=' + kk] = { mode: s.mode, 尺寸: s.size, 盖住: s.covered, 松弛: s.slack, 理由: s.reason };
}
return JSON.stringify(out, null, 1);
