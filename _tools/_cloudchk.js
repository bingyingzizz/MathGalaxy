/* 云雾「格子/点点」体检：量 4-邻域拉普拉斯绝对值均值（越小越干净），并给出「纹理先 blur」的对照 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(2000);
const a = window.MG && window.MG.app;
if (!a) return JSON.stringify({ err: 'no-app' });
const cam = a.cam;
cam._anim = null; cam.k = 4;
const bb = a.graph.bbox();
cam.tx = cam.viewW / 2 - ((bb.minX + bb.maxX) / 2) * cam.k;
cam.ty = cam.viewH / 2 - ((bb.minY + bb.maxY) / 2) * cam.k;
a.requestDraw();
await sleep(1400);
function lap(cv, n) {
  const cx = Math.max(0, Math.floor(cv.width / 2 - n / 2)), cy = Math.max(0, Math.floor(cv.height / 2 - n / 2));
  const d = cv.getContext('2d').getImageData(cx, cy, n, n).data;
  let s = 0, c = 0;
  for (let y = 1; y < n - 1; y++) for (let x = 1; x < n - 1; x++) {
    const i = (y * n + x) * 4;
    s += Math.abs(4 * d[i] - d[i + 4] - d[i - 4] - d[i - n * 4] - d[i + n * 4]) / 4; c++;
  }
  return +(s / c).toFixed(3);
}
const tex = MG.background.buildTexture(a.graph, function () { return true; });
const out = { k: cam.k, 纹理: tex.canvas.width + 'x' + tex.canvas.height, 纹理世界: Math.round(tex.w) + 'x' + Math.round(tex.h) };
out['纹理1比1_高频'] = lap(tex.canvas, 200);
const cc = document.getElementById('layer-cloud');
out['实显示层_高频'] = lap(cc, 200);
/* 对照：同一张纹理先 blur 再画到一张空画布上 */
const bl = document.createElement('canvas'); bl.width = tex.canvas.width; bl.height = tex.canvas.height;
const bx = bl.getContext('2d');
if ('filter' in bx) { bx.filter = 'blur(1.6px)'; bx.drawImage(tex.canvas, 0, 0); out['纹理blur后_高频'] = lap(bl, 200); }
else out['纹理blur后_高频'] = 'no-filter';
return JSON.stringify(out, null, 1);
