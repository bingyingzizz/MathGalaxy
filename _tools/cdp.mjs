/* ==========================================================================
   _tools/cdp.mjs —— 用 CDP 驱动 headless Edge
   --------------------------------------------------------------------------
   为什么需要它：`--screenshot` 那套没法**操作页面**（打字、点按钮），
   而搜索框这类交互只能靠脚本驱动才能验证。

   用法：
     bun _tools/cdp.mjs <url> <out.png> [scriptFile] [waitMs]
   其中 scriptFile 里写一段 JS（在页面里 evaluate，可以用 await）。

   例：
     bun _tools/cdp.mjs "file:///H:/MathGalaxy/index.html" out.png probe.js 3000

   ⚠️ spawn 时 stdio 用 'ignore'：沙箱下管道的 stdio 会 EPERM。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9333;
const [, , url, outPng, scriptFile, waitMsArg, sizeArg] = process.argv;
if (!url || !outPng) {
  console.error('用法：bun _tools/cdp.mjs <url> <out.png> [scriptFile] [waitMs] [WxH]');
  process.exit(2);
}
const waitMs = Number(waitMsArg || 2500);
/* ⚠️ Windows 下 headless 有**最小窗口宽度 ~492px** —— 要再窄就传 492x1000。
   `--window-size` 用的是逗号，所以允许写 `492x1000` 或 `492,1000`。 */
const size = (sizeArg || '1600x900').replace('x', ',');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const profile = process.env.MG_CDP_PROFILE ? path.resolve(process.env.MG_CDP_PROFILE) : path.join(process.env.TEMP || '.', 'cdp-profile-' + process.pid);
/* MG_GPU=1 ⇒ 不传 --disable-gpu（无头下 rAF 不受 vsync 限制 ⇒ 帧成本可量；⚠️ 关掉 GPU 会掉成
   Microsoft Basic Render Driver / SwANGLE，绝对数字作废 —— 用 SystemInfo 或页面 WebGL 核对） */
const gpuArgs = process.env.MG_GPU === '1' ? [] : ['--disable-gpu'];
const edge = spawn(EDGE, [
  '--headless=new', ...gpuArgs, '--hide-scrollbars',
  '--allow-file-access-from-files', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=' + PORT,
  '--user-data-dir=' + profile,
  '--window-size=' + size,
  url,
], { stdio: 'ignore' });

let ws = null;
let id = 0;
const pending = new Map();

function send(method, params) {
  return new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params: params || {} }));
    setTimeout(() => {
      if (pending.has(msgId)) { pending.delete(msgId); reject(new Error('超时：' + method)); }
    }, 20000);
  });
}

async function findTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch (_) { /* 还没起来 */ }
    await sleep(250);
  }
  throw new Error('等不到 Edge 的调试端口');
}

function cleanup() {
  try { ws && ws.close(); } catch (_) {}
  try { edge.kill(); } catch (_) {}
  if (!process.env.MG_CDP_PROFILE) { try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {} }
}

try {
  const target = await findTarget();
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true });
    ws.addEventListener('error', rej, { once: true });
  });
  ws.addEventListener('message', ev => {
    const m = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString());
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
    }
  });

  await send('Runtime.enable');
  await send('Page.enable');
  /* MG_DSF=<dpr> ⇒ 模拟高分屏（手机/平板档）。⚠️ 必须重载后等页面跑起来。 */
  const dsf = Number(process.env.MG_DSF || 1);
  if (dsf !== 1) {
    const [w, h] = size.split(',').map(Number);
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dsf, mobile: false });
    await send('Page.reload', { ignoreCache: true });
    console.log('（已设 deviceScaleFactor=' + dsf + '，页面重载）');
    await new Promise(r => setTimeout(r, 2500));
  }
  /* MGPRE=<文件> ⇒ 在页面任何脚本之前注入（模拟旧浏览器：缺 API / 坏实现 / 老语法）
     ⚠️ 必须配合重载：注入只对**之后**的 document 生效 */
  if (process.env.MGPRE) {
    const pre = fs.readFileSync(process.env.MGPRE, 'utf8');
    await send('Page.addScriptToEvaluateOnNewDocument', { source: pre });
    await send('Page.reload', { ignoreCache: true });
    console.log('（已注入 MGPRE=' + process.env.MGPRE + ' 并重载）');
  }
  await sleep(waitMs);

  if (scriptFile) {
    const src = fs.readFileSync(scriptFile, 'utf8');
    try {
      const r = await send('Runtime.evaluate', {
        expression: `(async () => { ${src} })()`,
        awaitPromise: true, returnByValue: true,
      });
      if (r.exceptionDetails) {
        console.error('页面脚本抛错：' + JSON.stringify(r.exceptionDetails, null, 1));
      }
      if (r.result && r.result.value !== undefined) {
        console.log('=== 页面返回值 ===');
        console.log(typeof r.result.value === 'string'
          ? r.result.value : JSON.stringify(r.result.value, null, 1));
      }
    } catch (e) {
      /* ⚠️ 脚本把页面**弄导航了**（点语言开关 / 点链接）⇒ evaluate 会被销毁，
         报「Inspected target navigated or closed」。这是**预期的**，不是失败：
         有 MG_SCRIPT2 就继续往下（导航后那一轮会给出状态），没有就把这条报出来。 */
      if (!process.env.MG_SCRIPT2) throw e;
      console.log('（第一个脚本触发了导航，evaluate 被销毁 —— 预期行为）');
    }
  }

  /* ⚠️ 第一个脚本可能刚把页面弄导航了（重载中）⇒ 截图/求值都可能报
     「Not attached to an active page」。导航场景下有 MG_SCRIPT2 兜底，这里不该直接失败。 */
  try {
    if (process.env.MG_SCRIPT2) await sleep(1200);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPng, Buffer.from(shot.data, 'base64'));
    console.log('截图已存：' + outPng);
  } catch (e) {
    if (!process.env.MG_SCRIPT2) throw e;
    console.log('（导航中，第一张截图跳过）');
  }

  /* MG_SCRIPT2=<文件> [MG_WAIT2=ms] —— 跑完第一个脚本（可能把页面**弄导航了**：
     点语言开关之类会整页重载）之后，等一会儿再求值一次。
     ⚠️ 第一个脚本若触发了导航，它的 evaluate 会被销毁（报错或返回空），那是正常的；
        这一轮的用处就是「导航之后再看一眼状态」。 */
  if (process.env.MG_SCRIPT2) {
    const w2 = Number(process.env.MG_WAIT2 || 2500);
    await sleep(w2);
    /* ⚠️ 跨文档导航会把原来的 session 弄失效（报「Not attached to an active page」）
       ⇒ 连不上就重新找 target、重开一条 WebSocket，并重新 Runtime.enable。 */
    try {
      await send('Runtime.evaluate', { expression: '1', returnByValue: true });
    } catch (e) {
      console.log('（重连调试端口…）');
      try { ws.close(); } catch (_) {}
      pending.clear();
      const t2 = await findTarget();
      ws = new WebSocket(t2.webSocketDebuggerUrl);
      await new Promise((res, rej) => {
        ws.addEventListener('open', res, { once: true });
        ws.addEventListener('error', rej, { once: true });
      });
      ws.addEventListener('message', ev => {
        const m = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString());
        if (m.id && pending.has(m.id)) {
          const { resolve, reject } = pending.get(m.id);
          pending.delete(m.id);
          m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
        }
      });
      await send('Runtime.enable');
      await send('Page.enable');
    }
    const src2 = fs.readFileSync(process.env.MG_SCRIPT2, 'utf8');
    const r2 = await send('Runtime.evaluate', {
      expression: `(async () => { ${src2} })()`,
      awaitPromise: true, returnByValue: true,
    });
    if (r2.exceptionDetails) {
      console.error('第二个脚本抛错：' + JSON.stringify(r2.exceptionDetails, null, 1));
    }
    if (r2.result && r2.result.value !== undefined) {
      console.log('=== 导航后返回值 ===');
      console.log(typeof r2.result.value === 'string'
        ? r2.result.value : JSON.stringify(r2.result.value, null, 1));
    }
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPng.replace(/\.png$/, '_after.png'), Buffer.from(shot2.data, 'base64'));
    console.log('（导航后截图，后缀 _after.png）');
  }
  cleanup();
  process.exit(0);
} catch (e) {
  console.error('失败：' + e.message);
  cleanup();
  process.exit(1);
}
