/* ==========================================================================
   _tools/_dragbench.mjs —— 真实拖动下的帧内耗时基准（2026-10-14 版被删，此处重建）
   --------------------------------------------------------------------------
   为什么必须用它（不是 cdp.mjs）：合成事件测不出滚轮/拖动的真实路径，
   必须走 CDP 的 Input.dispatchMouseEvent。

   量什么：
     · raf 间隔（p50/p95/max）—— 判决口径
     · 页面自己角标的「绘制 / 输入 / 其余」分账（其余 = 光栅化 + 合成 + 呈现）
     · 位图载体状态（本轮烘 / 轮数 / 带数 / 追赶 / 落洞 / 分配 / 同步全烘）
     · 按画布归属的 JS 毫秒与后备尺寸（谁在花钱）

   用法：bun _tools/_dragbench.mjs <url> <out.png> [dragMs] [WxH]
   环境：MG_GPU=1（不传 --disable-gpu，必须）
         MG_K=<目标k>   MG_CAM=1（摆到 bbox 中心）
         MG_DSF=<dpr>（手机/平板档复现）
         MG_RUNS=<轮数>（≥2 只打每轮摘要）
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9344;
const [, , url, outPng, dragMsArg, sizeArg] = process.argv;
if (!url || !outPng) {
  console.error('用法：bun _tools/_dragbench.mjs <url> <out.png> [dragMs] [WxH]');
  process.exit(2);
}
const dragMs = Number(dragMsArg || 5000);
const size = (sizeArg || '1600x900').replace('x', ',');
const dsf = Number(process.env.MG_DSF || 1);
const runs = Math.max(1, Number(process.env.MG_RUNS || 1));
const useGpu = process.env.MG_GPU === '1';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = path.join(process.env.TEMP || '.', 'dragbench-' + process.pid);
const edge = spawn(EDGE, [
  '--headless=new', ...(useGpu ? [] : ['--disable-gpu']), '--hide-scrollbars',
  '--allow-file-access-from-files', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile,
  '--window-size=' + size, url,
], { stdio: 'ignore' });

let ws = null, id = 0;
const pending = new Map();
function send(method, params) {
  return new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params: params || {} }));
    setTimeout(() => { if (pending.has(msgId)) { pending.delete(msgId); reject(new Error('超时：' + method)); } }, 60000);
  });
}
async function findTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch (_) { }
    await sleep(250);
  }
  throw new Error('等不到 Edge 调试端口');
}
function cleanup() {
  try { ws && ws.close(); } catch (_) { }
  try { edge.kill(); } catch (_) { }
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) { }
}

const INSTALL = `
  window.__bench = { samples: [], raf: [], strokes: 0, canvas: {} };
  (function () {
    const P = CanvasRenderingContext2D.prototype;
    const wrap = (name) => {
      const o = P[name];
      P[name] = function () {
        const b = window.__bench, cv = this.canvas;
        const host = cv && cv.closest ? cv.closest('[id]') : null;
        const k = cv ? (cv.id || (host && host.id) || ('<' + cv.width + 'x' + cv.height + '>')) : '?';
        const rec = b.canvas[k] || (b.canvas[k] = { calls: 0, ms: 0, w: cv ? cv.width : 0, h: cv ? cv.height : 0 });
        rec.calls++;
        const t = performance.now();
        const r = o.apply(this, arguments);
        rec.ms += performance.now() - t;
        return r;
      };
    };
    ['stroke', 'fill', 'drawImage', 'fillRect', 'clearRect', 'fillText'].forEach(wrap);
    const badge = () => { const el = document.getElementById('mg-fps'); return el ? el.textContent.replace(/\\s+/g, ' ') : ''; };
    setInterval(function () { const t = badge(); if (t) window.__bench.samples.push(t); }, 100);
    let last = 0;
    (function loop(ts) { if (last) window.__bench.raf.push(+(ts - last).toFixed(2)); last = ts; requestAnimationFrame(loop); })(0);
  })();
  'ok'
`;

const READ = `
  (function () {
    const b = window.__bench;
    const stat = (arr) => {
      if (!arr.length) return null;
      const s = arr.slice().sort((x, y) => x - y);
      return { n: arr.length, mean: +(arr.reduce((a, c) => a + c, 0) / arr.length).toFixed(2),
               p50: s[Math.floor(s.length * 0.5)], p95: s[Math.floor(s.length * 0.95)], max: s[s.length - 1],
               超8: arr.filter((v) => v > 8).length, 超20: arr.filter((v) => v > 20).length };
    };
    const nums = [];
    for (const s of b.samples) {
      const m = /帧\\s+([\\d.]+)\\s*ms[\\s\\S]*?绘制\\s+([\\d.]+)[\\s\\S]*?输入\\s+([\\d.]+)[\\s\\S]*?其余\\s+([\\d.]+)/.exec(s);
      if (m) nums.push({ frame: +m[1], draw: +m[2], input: +m[3], rest: +m[4] });
    }
    return JSON.stringify({
      raf: stat((b.raf || []).slice(0, -1)),
      帧内绘制: stat(nums.map((v) => v.draw)),
      帧内其余: stat(nums.map((v) => v.rest)),
      帧间隔: stat(nums.map((v) => v.frame)),
      bmp: (function () { try {
        var s = MG.app.bitmap; if (!s) return null;
        var b0 = window.__bmp0 || s;
        return { ready: s.ready, mode: s.mode, k: s.k, 尺寸: s.size, 盖住: s.covered,
                 本轮烘: s.bakes - (b0.bakes || 0), 轮数: (s.rounds || 0) - (b0.rounds || 0),
                 带数: (s.bands || 0) - (b0.bands || 0),
                 同步全烘: (s.bakes - (s.rounds || 0)) - ((b0.bakes || 0) - (b0.rounds || 0)),
                 追赶: (s.rushed || 0) - (b0.rushed || 0), 落洞: s.emerg,
                 分配: (s.realloc || 0) - (b0.realloc || 0), 带ms: s.bandMs,
                 末轮ms: s.roundMs, 带高: s.bandPx, 松弛: s.slack, inRound: s.inRound ? 1 : 0,
                 理由: s.reason };
      } catch (e) { return { err: String(e).slice(0, 140) }; } })(),
      fatal: (function () { const e = document.getElementById('mg-fatal'); return e ? String(e.textContent).slice(0, 200) : null; })(),
      按画布: (function () {
        const out = {};
        for (const k in b.canvas) { const r = b.canvas[k]; out[k] = { 调用: r.calls, JS毫秒: +r.ms.toFixed(1), 尺寸: r.w + 'x' + r.h }; }
        return out;
      })(),
      perf: (function () { try {
        if (!(window.MG && MG.perf && MG.perf.snapshot)) return null;
        var s = MG.perf.snapshot();
        return { 峰: s.峰, 长帧条数: (s.长帧 || []).length, 长帧: (s.长帧 || []).slice(-6) };
      } catch (e) { return { err: String(e).slice(0, 120) }; } })(),
    }, null, 1);
  })()
`;

try {
  const target = await findTarget();
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true });
    ws.addEventListener('error', rej, { once: true });
  });
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString());
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
    }
  });
  await send('Runtime.enable');
  await send('Page.enable');
  await sleep(4000);

  const gl = await send('Runtime.evaluate', {
    expression: `(function(){try{var c=document.createElement('canvas');var g=c.getContext('webgl2')||c.getContext('webgl');if(!g)return 'no-webgl';var e=g.getExtension('WEBGL_debug_renderer_info');return e?g.getParameter(e.UNMASKED_RENDERER_WEBGL):'no-ext';}catch(err){return 'err:'+err.message}})()`,
    returnByValue: true,
  });
  console.log('=== 页面 WebGL 渲染器 ===\n  ' + gl.result.value);
  if (/SwiftShader|Basic Render/i.test(String(gl.result.value))) console.log('  ⚠️ 软件光栅 ⇒ 绝对帧时作废');

  if (dsf !== 1) {
    const [w, h] = size.split(',').map(Number);
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dsf, mobile: false });
    await send('Page.reload', { ignoreCache: true });
    await sleep(2000);
    console.log(`（已设 deviceScaleFactor=${dsf}，页面重载）`);
  }
  await sleep(3000);
  await send('Runtime.evaluate', { expression: INSTALL, returnByValue: true });

  /* MG_SETUP=<文件> ⇒ 跑一段页内脚本做消融（关标签 / 关定义线 / 关位图…），再开始拖 */
  if (process.env.MG_SETUP) {
    const setup = fs.readFileSync(process.env.MG_SETUP, 'utf8');
    const r = await send('Runtime.evaluate', {
      expression: '(async () => { ' + setup + ' })()', awaitPromise: true, returnByValue: true,
    });
    if (r.exceptionDetails) console.error('消融脚本抛错：' + JSON.stringify(r.exceptionDetails).slice(0, 300));
    console.log('（已执行 MG_SETUP）→ ' + JSON.stringify(r.result && r.result.value));
    await sleep(900);
  }

  const vpStr = (await send('Runtime.evaluate', { expression: 'JSON.stringify({w:innerWidth,h:innerHeight})', returnByValue: true })).result.value;
  const V = JSON.parse(vpStr);
  const W = V.w, H = V.h;
  console.log(`=== 视口 ${W}×${H}（dsf=${dsf}, gpu=${useGpu ? 'on' : 'off'}）===`);

  if (process.env.MG_CAM === '1' || process.env.MG_K) {
    const kk = process.env.MG_K ? Number(process.env.MG_K) : 0.62;
    const r = await send('Runtime.evaluate', {
      expression: `(function(){var a=window.MG&&MG.app;if(!a)return 'no-app';var c=a.cam;` +
        `var bb=a.graph.bbox();var cx=(bb.minX+bb.maxX)/2, cy=(bb.minY+bb.maxY)/2;` +
        `c._anim=null;c.k=${kk};c.tx=c.viewW/2-cx*c.k;c.ty=c.viewH/2-cy*c.k;a.requestDraw();` +
        `return JSON.stringify({k:c.k,tx:+c.tx.toFixed(1),ty:+c.ty.toFixed(1)})})()`,
      returnByValue: true,
    });
    console.log('摆位（k=' + kk + '）：' + (r.result && r.result.value));
    await sleep(600);
  }

  const runsOut = [];
  let x = W / 2, y = H / 2;
  const step = Math.max(8, Math.round(W / 65));
  for (let ri = 0; ri < runs; ri++) {
    await send('Runtime.evaluate', {
      expression: "window.__bench.strokes=0;window.__bench.samples=[];window.__bench.raf=[];window.__bench.canvas={};" +
        "window.__bmp0=(window.MG&&MG.app&&MG.app.bitmap)?Object.assign({},MG.app.bitmap):null;'ok'",
      returnByValue: true,
    });
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 });
    const t0 = Date.now();
    let dir = 1;
    while (Date.now() - t0 < dragMs) {
      x += dir * step;
      if (x > W - 0.16 * W) dir = -1;
      if (x < 0.16 * W) dir = 1;
      y += 3;
      if (y > H - 0.15 * H) y = H * 0.45;
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'left', buttons: 1 });
      await sleep(16);
    }
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', buttons: 0, clickCount: 1 });
    await sleep(700);
    const r = await send('Runtime.evaluate', { expression: READ, returnByValue: true });
    if (r.result && r.result.value) runsOut.push(JSON.parse(r.result.value));
  }

  const med = (arr) => { const s = arr.slice().sort((a, b) => a - b); if (!s.length) return null; return s.length % 2 ? s[(s.length - 1) / 2] : +(((s[s.length / 2 - 1] + s[s.length / 2]) / 2).toFixed(2)); };
  const f = (o, k) => (o && o[k] != null ? o[k] : null);
  console.log(`=== 每轮（共 ${runsOut.length} 轮，每轮 ${dragMs}ms 真拖动）===`);
  for (const p of runsOut) {
    console.log(`  raf p50=${f(p.raf, 'p50')} p95=${f(p.raf, 'p95')} max=${f(p.raf, 'max')} ｜ 绘制 p50=${f(p.帧内绘制, 'p50')} ｜ 其余 p50=${f(p.帧内其余, 'p50')} ｜ bmp ${JSON.stringify(p.bmp)} ｜ fatal ${p.fatal}`);
  }
  console.log('=== 中位数（判决口径：p95）===');
  console.log(`  raf  p50=${med(runsOut.map((p) => f(p.raf, 'p50')))}  p95=${med(runsOut.map((p) => f(p.raf, 'p95')))}  max=${med(runsOut.map((p) => f(p.raf, 'max')))}`);
  console.log(`  绘制 p50=${med(runsOut.map((p) => f(p.帧内绘制, 'p50')))} ｜ 其余 p50=${med(runsOut.map((p) => f(p.帧内其余, 'p50')))}`);
  console.log(`  超20ms 的帧（末轮）: ${f((runsOut[runsOut.length - 1] || {}).raf, '超20')}  超8ms: ${f((runsOut[runsOut.length - 1] || {}).raf, '超8')}`);
  console.log('  按画布（末轮）: ' + JSON.stringify((runsOut[runsOut.length - 1] || {}).按画布));
  if (runsOut[0] && runsOut[0].perf) console.log('  perf（末轮）: ' + JSON.stringify(runsOut[runsOut.length - 1].perf));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outPng, Buffer.from(shot.data, 'base64'));
  console.log('截图已存：' + outPng);
  cleanup();
  process.exit(0);
} catch (e) {
  console.error('失败：' + (e && e.stack || e));
  cleanup();
  process.exit(1);
}
