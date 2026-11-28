#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · Task 3D 节点名精确加速的离线对拍（labelcheck）
   --------------------------------------------------------------------------
   把 `src/core/renderer.js` 里 `label-fast:begin … label-fast:end` 那一段（**生产代码本身**）
   和 `nameSpot` / `nameOnScreenQuick` 两个函数原样抽出来，与 Task 3C 的旧实现（下面 REF 里逐字抄的）
   逐项对拍：
     · 归属（稀疏网格 vs 旧的字符串键逐格窗口）
     · 字号档（阈值存在性 vs 旧的 O(n²) 最近邻，含 1.25 / 1.6 / 1e8 边界）
     · 避让索引（第一个阻挡者 = 插入序最小，含 overflow / 退回线性 / 追加顺序）
     · 静态优先级序（屏幕稳定划分 + 归属序；失效：换优先级 / 换节点 / 换长度；非有限 / 重复 id ⇒ exact=false）
     · nameSpot 快判（只在能确定时给答案）
     · 记录器 / 物化（命令序列、终态、作废条件、不配对、无 Proxy）
     · 交接判据（same / pan / far / stopped / k / 指纹 / 层 / dpr / 尺寸 / 作废记录）
   每一项都有**分支覆盖计数**（某个分支一次没走到 ⇒ 判失败）和**反向对照**
   （把生产代码改坏一处，必须被抓到；抓不到 ⇒ 判失败）。
   ⚠️ 这是合成数据 / 假 ctx 的等价性证据，**不是**浏览器 / GPU 证据。真机验收见 PERFORMANCE.md §13。
   用法：bun tools/labelcheck.mjs   （node 也能跑）
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const SRC = fs.readFileSync(path.join(ROOT, 'src/core/renderer.js'), 'utf8');

function sliceBlock(src) {
  const a = src.indexOf('/* ---- label-fast:begin ---- */');
  const b = src.indexOf('/* ---- label-fast:end ---- */');
  if (a < 0 || b < a) throw new Error('renderer.js 里找不到 label-fast:begin/end 标记');
  return src.slice(a, b);
}
function fnSource(src, name) {
  const m = new RegExp('function\\s+' + name + '\\s*\\([^)]*\\)\\s*\\{').exec(src);
  if (!m) throw new Error('找不到函数 ' + name);
  let depth = 0;
  for (let j = m.index + m[0].length - 1; j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}' && --depth === 0) return src.slice(m.index, j + 1);
  }
  throw new Error('函数 ' + name + ' 大括号不配对');
}
const NAMES = ['labelOwnSparse', 'labelThresholdSizes', 'labelLinearHit', 'labelGridIndex', 'labelRankBuild',
  'labelRankSame', 'labelRankPartition', 'labelReadState', 'labelWriteState', 'labelCopyState', 'labelRecorder',
  'labelReplayRecord', 'labelHandoffOk'];
function load(block, spotSrc) {
  const F = new Function(block + '\nreturn {' + NAMES.join(',') + ', LABEL_STATE_KEYS: LABEL_STATE_KEYS};')();
  /* nameSpot / nameOnScreenQuick 在 createRenderer 闭包里：给它们一个 C / W / H 的小作用域 */
  F.spot = new Function('C', 'W', 'H', spotSrc + '\nreturn { nameSpot: nameSpot, quick: nameOnScreenQuick };');
  return F;
}
const BLOCK = sliceBlock(SRC);
const SPOT = fnSource(SRC, 'nameSpot') + '\n' + fnSource(SRC, 'nameOnScreenQuick');

/* ------------------------------------------------------------------ 旧实现（3C，逐字语义） */
const REF = {
  own(ns, k, S, P) {
    var kk0 = Math.max(0.02, k), cell = Math.max(6, (S + 12) / kk0);
    var grid = Object.create(null), set = Object.create(null);
    ns.forEach(function (n) {
      var txt = n.labelShow || n.label;
      if (!txt) return;
      var wW = (txt.length * S * 0.95 + P * 2) / kk0;
      var hW = (S + 6) / kk0;
      var R = Math.max(wW, hW) * 0.68;
      var _hw = wW / 2, _hh = hW / 2;
      var cx = Math.floor(n.x / cell), cy = Math.floor(n.y / cell);
      var lim = Math.ceil(R / cell);
      for (var gx = -lim; gx <= lim; gx++) for (var gy = -lim; gy <= lim; gy++) {
        var arr = grid[(cx + gx) + ',' + (cy + gy)];
        if (!arr) continue;
        for (var i = 0; i < arr.length; i++) {
          var m = arr[i];
          if (Math.abs(m.x - n.x) < (_hw + (m.hw || _hw)) && Math.abs(m.y - n.y) < (_hh + (m.hh || _hh))) return;
        }
      }
      var key2 = cx + ',' + cy;
      (grid[key2] || (grid[key2] = [])).push({ x: n.x, y: n.y, hw: wW / 2, hh: hW / 2 });
      set[n.id] = 1;
    });
    return set;
  },
  sizes(acc, k, S, out) {
    for (var a1 = 0; a1 < acc.length; a1++) {
      var A1 = acc[a1], best = 1e9;
      for (var a2 = 0; a2 < acc.length; a2++) {
        if (a1 === a2) continue;
        var B1 = acc[a2];
        var dd = Math.max(Math.abs(B1.x - A1.x), Math.abs(B1.y - A1.y));
        if (dd < best) best = dd;
      }
      var txtLen = (A1.labelShow || A1.label || '').length;
      var Rn = Math.max(8, txtLen * S * 0.95) / Math.max(0.02, k);
      var ratio = best < 1e8 ? best / Rn : 9;
      out[A1.id] = ratio < 1.25 ? 0.72 : (ratio < 1.6 ? 0.85 : 1);
    }
  },
  hit(box, list) {
    for (var i = 0; i < list.length; i++) {
      var b = list[i];
      if (box.x0 < b.x1 && box.x1 > b.x0 && box.y0 < b.y1 && box.y1 > b.y0) return b;
    }
    return null;
  },
  screenOrder(order) { return order.slice().sort(function (a, b) { return (b.on - a.on) || (b.p - a.p); }); },
  ownerOrder(nodes, prio, ok) {
    return nodes.filter(ok).sort(function (a, b) { return (prio.get(b) - prio.get(a)) || (a.id < b.id ? -1 : 1); });
  }
};

/* ------------------------------------------------------------------ 数据 */
let seed = 0x3d2026;
function rnd() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }
function realNodes() {
  const lay = JSON.parse(fs.readFileSync(path.join(ROOT, 'dist/layout.json'), 'utf8')).nodes;
  let labels = {};
  try {
    for (const n of JSON.parse(fs.readFileSync(path.join(ROOT, 'dist/graph.json'), 'utf8')).nodes) labels[n.id] = [n.label, n.label_en];
  } catch (e) { /* 没有 graph.json 也能跑：用合成名字 */ }
  return Object.keys(lay).map(function (id) {
    const L = labels[id] || [];
    return { id: id, x: lay[id][0], y: lay[id][1], label: L[0] || ('x'.repeat(1 + (id.length % 23))), label_en: L[1] };
  });
}
const REAL = realNodes();
const REF_OWN = new Map(), REF_SIZE = new Map();
const KS = [0.02, 0.05, 0.08, 0.16, 0.32, 0.5, 0.62, 0.8, 1, 1.2, 1.5, 2, 3, 4, 8, 16];
function variants() {
  const out = [];
  for (let j = 0; j < 8; j++) {
    let ns = REAL.map(function (n) {
      return { id: n.id, x: n.x, y: n.y, label: j % 3 === 2 ? 'y'.repeat(1 + Math.floor(rnd() * 70)) : n.label,
        labelShow: j % 4 === 1 ? (n.label_en || n.label) : undefined, p: Math.floor(rnd() * 12) * 10 };
    });
    if (j >= 4) ns = ns.filter(function () { return rnd() > 0.3; });
    if (j === 5) ns = ns.concat([{ id: 'dupA', x: 0, y: 0, label: 'a' }, { id: 'dupB', x: 0, y: 0, label: 'b' },
      { id: 'neg', x: -64.5, y: -0.0, label: 'negative' }, { id: 'nolabel', x: 3, y: 3, label: '' }]);
    if (j === 6) ns = ns.concat([{ id: 'nan', x: NaN, y: 1, label: 'nan' }, { id: 'inf', x: Infinity, y: 0, label: 'inf' },
      { id: 'inf2', x: Infinity, y: 0, label: 'inf2' }, { id: 'ninf', x: -Infinity, y: -Infinity, label: 'ninf' },
      { id: 'huge', x: 1e300, y: 3, label: 'huge' }]);
    ns.sort(function (a, b) { return (b.p - a.p) || (a.id < b.id ? -1 : 1); });
    out.push(ns);
  }
  out.push([]);                                                    // 空
  out.push([{ id: 'solo', x: 5, y: -5, label: 'singleton' }]);      // 单点
  return out;
}

const VAR = variants();

/* ------------------------------------------------------------------ 检查 */
function checkAll(F, quiet) {
  seed = 0x5eed;                                     // 每次（含反向对照）同一批随机用例
  const res = { fail: [], cov: {} };
  const cov = res.cov;
  function bump(k, n) { cov[k] = (cov[k] || 0) + (n == null ? 1 : n); }
  function bad(msg) { res.fail.push(msg); }
  const S = 14, P = 3;

  /* 1) 归属 + 2) 字号档（同一批数据） */
  let ownCases = 0, sizeCases = 0;
  for (let vi = 0; vi < VAR.length; vi++) {
    const ns = VAR[vi];
    for (const k of KS) {
      const ck = vi + '|' + k;
      const a = REF_OWN.get(ck) || REF_OWN.set(ck, REF.own(ns, k, S, P)).get(ck);
      let b = F.labelOwnSparse(ns, k, S, P);
      ownCases++;
      const exotic = ns.some(function (n) { return !(Math.abs(n.x) < 1e15) || !(Math.abs(n.y) < 1e15); });
      if (b === null) {
        if (!exotic) { bad('有限坐标却拒绝了稀疏归属 k=' + k); continue; }
        bump('own.fallback'); b = a;                         // 生产代码此时走旧实现（就是 a）
      } else if (exotic) { bad('非有限 / 超大坐标必须退回旧实现（否则 x++ 不前进 ⇒ 死循环）'); continue; }
      const ka = Object.keys(a).sort().join('|'), kb = Object.keys(b).sort().join('|');
      if (ka !== kb) { bad('归属不一致 k=' + k + ' n=' + ns.length); continue; }
      bump('own.owners', Object.keys(b).length);
      const acc = ns.filter(function (n) { return b[n.id]; });
      const ra = Object.create(null), rb = Object.create(null);
      /* 预先塞一个非归属者的旧值：两边都不该动它（旧的 stale 行为） */
      ra.__stale = rb.__stale = 0.72;
      if (REF_SIZE.has(ck)) Object.assign(ra, REF_SIZE.get(ck)); else { REF.sizes(acc, k, S, ra); REF_SIZE.set(ck, Object.assign({}, ra)); }
      if (!F.labelThresholdSizes(acc, k, S, rb)) {
        if (!exotic) { bad('阈值字号拒绝了有限输入 k=' + k); continue; }
        bump('size.fallback'); continue;
      }
      sizeCases++;
      const sa = JSON.stringify(ra), sb = JSON.stringify(rb);
      if (sa !== sb) bad('字号档不一致 k=' + k + ' n=' + acc.length);
      for (const id in rb) bump('size.' + rb[id]);
    }
  }
  /* 字号边界：比值恰在 1.25 / 1.6 两侧、哨兵 1e8 两侧、重复位置、负坐标 */
  for (const k of [0.02, 0.1, 0.62, 1, 4, 16]) for (const len of [0, 1, 7, 100]) {
    const R = Math.max(8, len * S * 0.95) / Math.max(0.02, k);
    for (const f of [0, 1e-9, 1.25 - 1e-12, 1.25, 1.25 + 1e-12, 1.6 - 1e-12, 1.6, 1.6 + 1e-12, 3, 1e8 / R - 1e-6, 1e8 / R, 1e9 / R]) {
      for (const axis of ['x', 'y', 'xy']) {
        const b0 = { id: 'b', x: -123, y: 9, label: 'x' };
        if (axis !== 'y') b0.x = -123 + f * R;
        if (axis !== 'x') b0.y = 9 - f * R;
        const acc = [{ id: 'a', x: -123, y: 9, label: 'x'.repeat(len) }, b0];
        const ra = {}, rb = {};
        REF.sizes(acc, k, S, ra); F.labelThresholdSizes(acc, k, S, rb);
        sizeCases++;
        if (JSON.stringify(ra) !== JSON.stringify(rb)) bad('字号边界不一致 ' + JSON.stringify({ k, len, f, axis, ra, rb }));
      }
    }
  }
  if (F.labelThresholdSizes([{ id: 'a', x: 0, y: 0, label: 'a' }], NaN, S, {}) !== false) bad('k=NaN 时阈值字号应拒绝（走旧实现）');
  bump('size.rejectNonFinite');
  /* 归属的两个扫描分支都要走到：稀疏（列数 < 窗口）与逐列（列数 ≥ 窗口） */
  {
    const few = [{ id: 'p', x: 0, y: 0, label: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' }, { id: 'q', x: 5000, y: 0, label: 'q' }];
    const many = []; for (let i = 0; i < 400; i++) many.push({ id: 'm' + String(i).padStart(3, '0'), x: i * 40, y: (i % 7) * 30, label: 'm' });
    for (const [ns, k, tag] of [[few, 1, 'own.sparseBranch'], [many, 16, 'own.denseBranch'], [few, 0.02, 'own.sparseBranch'], [many, 0.5, 'own.denseBranch']]) {
      if (Object.keys(REF.own(ns, k, S, P)).sort().join() !== Object.keys(F.labelOwnSparse(ns, k, S, P)).sort().join()) bad('归属分支用例不一致 ' + tag);
      ownCases++;
    }
    bump('own.sparseBranch'); bump('own.denseBranch');
  }
  bump('own.cases', ownCases); bump('size.cases', sizeCases);

  /* 3) 避让索引：随机框 + 追加 + overflow（NaN / 反向 / 超大）+ 查询框不合格 */
  let hitQ = 0;
  for (let t = 0; t < 60; t++) {
    const placed = [];
    for (let i = 0; i < 40; i++) placed.push({ x0: rnd() * 2000 - 300, y0: rnd() * 1200 - 200, x1: 0, y1: 0 });
    for (const b of placed) { b.x1 = b.x0 + rnd() * 300; b.y1 = b.y0 + rnd() * 60; }
    if (t % 5 === 0) placed.push({ x0: NaN, y0: 0, x1: 10, y1: 10 });
    if (t % 6 === 0) placed.push({ x0: 50, y0: 50, x1: 10, y1: 60 });           // 反向
    if (t % 7 === 0) placed.push({ x0: -1e6, y0: -1e6, x1: 1e6, y1: 1e6 });     // 超大 ⇒ overflow
    if (t % 8 === 0) placed.push({ x0: 1e300, y0: 0, x1: 1e300, y1: 10 });       // 坐标超大（x++ 不前进）⇒ overflow
    if (t % 9 === 0) placed.push({ x0: -Infinity, y0: 0, x1: 20, y1: 10 });
    const hit = F.labelGridIndex(placed);
    for (let i = 0; i < 900; i++) {
      let x = rnd() * 2400 - 400, y = rnd() * 1400 - 300, w = rnd() * 260, h = 4 + rnd() * 40;
      if (i % 53 === 0) x = -64;
      if (i % 71 === 0) w = 64;
      if (i % 97 === 0) { w = 0; }
      let box = { x0: x, y0: y, x1: x + w, y1: y + h };
      if (i % 211 === 0) box = { x0: -1e7, y0: -1e7, x1: 1e7, y1: 1e7 };      // 查询框太大 ⇒ 线性
      if (i % 223 === 0) box = { x0: NaN, y0: y, x1: x, y1: y + h };
      if (i % 227 === 0) box = { x0: 1e300, y0: y, x1: 1e300, y1: y + h };
      const a = REF.hit(box, placed), b = hit(box);
      hitQ++;
      if (a !== b) { bad('避让阻挡者不同（第 ' + i + ' 个查询）'); break; }
      if (a) bump('hit.blocked'); else bump('hit.free');
      if (!a || i % 11 === 0) placed.push(box);                                // 追加（含已撞的）
    }
  }
  /* 第一个阻挡者 = 插入序最小（不是任一个）：同一处叠三个框 */
  {
    const L = [{ x0: 0, y0: 0, x1: 10, y1: 10, id: 'first' }, { x0: 0, y0: 0, x1: 10, y1: 10, id: 'second' }];
    const h = F.labelGridIndex(L);
    const r1 = h({ x0: 5, y0: 5, x1: 6, y1: 6 });
    L.push({ x0: -100, y0: -100, x1: 100, y1: 100, id: 'third' });
    const r2 = h({ x0: 5, y0: 5, x1: 6, y1: 6 });
    if (!r1 || r1.id !== 'first' || !r2 || r2.id !== 'first') bad('避让索引没有返回插入序第一个阻挡者');
    if (h({ x0: 10, y0: 0, x1: 20, y1: 10 }) !== L[2]) bad('严格相交（贴边不算）判错');
    bump('hit.firstBlocker');
  }
  bump('hit.queries', hitQ);

  /* 4) 静态优先级序 */
  {
    let tests = 0;
    for (let g = 0; g < 12; g++) {
      const nodes = REAL.slice(0, 600 + g * 50).map(function (n) { return { id: n.id }; });
      const p = nodes.map(function () { return Math.floor(rnd() * 8) * 10; });
      let R = null;
      for (let j = 0; j < 12; j++) {
        if (j % 4 === 0) p[Math.floor(rnd() * p.length)] += 10;                 // 改一个优先级（= 悬停 / 搜索）
        if (j === 7) { const i = 17; const t = nodes[i]; nodes[i] = nodes[i + 1]; nodes[i + 1] = t; }   // 换序
        if (j === 9) nodes.pop(), p.pop();                                       // 换长度
        const order = nodes.map(function (n, i) { return { n: n, p: p[i], on: rnd() < 0.55 ? 1 : 0 }; });
        if (F.labelRankSame(R, order)) bump('rank.hit'); else { R = F.labelRankBuild(order); bump('rank.build'); }
        if (!R.exact) { bad('有限优先级 + 唯一 id 却 exact=false'); break; }
        const ref = REF.screenOrder(order), got = F.labelRankPartition(R, order);
        if (ref.length !== got.length || ref.some(function (x, i) { return x !== got[i]; })) { bad('屏幕排序不一致'); break; }
        const prio = new Map(order.map(function (q) { return [q.n, q.p]; }));
        const vis = new Set(nodes.filter(function () { return rnd() < 0.6; }));
        const ok = function (n) { return vis.has(n); };
        const a = REF.ownerOrder(nodes, prio, ok), b = R.own.filter(ok);
        if (a.length !== b.length || a.some(function (x, i) { return x !== b[i]; })) { bad('归属排序不一致'); break; }
        tests++;
      }
    }
    /* 复用必须核对优先级值：同节点、同长度、只改一个 p ⇒ 不许复用 */
    const ns = [{ id: 'a' }, { id: 'b' }];
    const o1 = [{ n: ns[0], p: 1, on: 1 }, { n: ns[1], p: 2, on: 1 }];
    const R1 = F.labelRankBuild(o1);
    if (!F.labelRankSame(R1, o1) || F.labelRankSame(R1, [{ n: ns[0], p: 1, on: 0 }, { n: ns[1], p: 3, on: 1 }])) bad('rank 复用核对错');
    if (F.labelRankBuild([{ n: { id: 'a' }, p: NaN, on: 1 }]).exact !== false) bad('非有限优先级应 exact=false');
    if (F.labelRankBuild([{ n: { id: 'a' }, p: 1, on: 1 }, { n: { id: 'a' }, p: 1, on: 0 }]).exact !== false) bad('重复 id 应 exact=false');
    bump('rank.tests', tests); bump('rank.inexact');
  }

  /* 5) nameSpot 快判 */
  {
    const C = { node: { labelPad: 3, labelOffset: 13 } };
    const Wd = 1280, Hd = 720;
    const sp = F.spot(C, Wd, Hd);
    let n = 0;
    for (let i = 0; i < 200000; i++) {
      let px = rnd() * (Wd + 440) - 220, py = rnd() * (Hd + 440) - 220;
      if (i % 97 === 0) px = [0, Wd, -0, 1e-300, Wd - 1e-9, -3, Wd + 3, -2.9999][i % 8];
      if (i % 89 === 0) py = [-13 - 5 - 12 - 2, Hd + 1 - 5 - 13, -5 - 13 * 0.62 - 12 - 2][i % 3];
      const r = [0, 2.5, 5, 9][i % 4], fs = [8, 9.5, 12, 14.4][i % 4], k = [0.3, 0.62, 1, 2.2][(i >> 2) % 4];
      const tw = [0, 1, 37.5, 260, 1e6][i % 5];
      const q = sp.quick(px, py, r, fs, k);
      const b = sp.nameSpot(px, py, r, tw, fs, k).box;
      const truth = (b.x1 > 0 && b.x0 < Wd && b.y1 > 0 && b.y0 < Hd) ? 1 : 0;
      bump('spot.' + (q === -1 ? 'unknown' : q));
      if (q !== -1 && q !== truth) { bad('nameSpot 快判与真值不符 ' + JSON.stringify({ px, py, r, fs, k, tw, q, truth })); break; }
      n++;
    }
    if (sp.quick(NaN, 0, 1, 1, 1) !== -1 || F.spot({ node: { labelPad: 0, labelOffset: 13 } }, Wd, Hd).quick(5, 5, 1, 1, 1) !== -1) bad('不受支持的输入必须返回 -1');
    bump('spot.cases', n);
  }

  /* 6) 记录器 / 物化 + 7) 交接判据 */
  recorderChecks(F, bad, bump);
  handoffChecks(F, bad, bump);

  /* 分支覆盖：任何一条为 0 ⇒ 这个测试根本没测到它 */
  for (const need of ['own.fallback', 'size.fallback', 'own.sparseBranch', 'own.denseBranch', 'size.0.72', 'size.0.85', 'size.1', 'size.rejectNonFinite',
    'hit.blocked', 'hit.free', 'hit.firstBlocker', 'rank.hit', 'rank.build', 'rank.inexact',
    'spot.0', 'spot.1', 'spot.unknown', 'rec.materialized', 'rec.invalidMethod', 'rec.invalidValue', 'rec.unbalanced',
    'rec.noProxy', 'rec.replayThrows', 'handoff.same', 'handoff.pan', 'handoff.far', 'handoff.stopped', 'handoff.reject']) {
    if (!cov[need]) bad('分支没被走到：' + need);
  }
  return res;
}

/* ------------------------------------------------------------------ 假 ctx */
function FakeCtx(F) {
  const KEYS = F.LABEL_STATE_KEYS;
  const g = { paint: [], stack: [], dash: [], tf: [1, 0, 0, 1, 0, 0] };
  const dflt = { font: '10px sans-serif', textAlign: 'start', textBaseline: 'alphabetic', direction: 'inherit',
    fontKerning: 'auto', fontStretch: 'normal', fontVariantCaps: 'normal', letterSpacing: '0px', wordSpacing: '0px',
    textRendering: 'auto', lineWidth: 1, lineCap: 'butt', lineJoin: 'miter', miterLimit: 10, fillStyle: '#000000',
    strokeStyle: '#000000', globalAlpha: 1, globalCompositeOperation: 'source-over', shadowBlur: 0,
    shadowColor: 'rgba(0, 0, 0, 0)', shadowOffsetX: 0, shadowOffsetY: 0, filter: 'none', lineDashOffset: 0 };
  for (const k of KEYS) g[k] = dflt[k];
  function snap() { const o = {}; for (const k of KEYS) o[k] = g[k]; return o; }
  function paint(name, args) { g.paint.push([name, JSON.stringify(args), JSON.stringify(snap()), g.dash.join(','), g.tf.slice(0, 4).join(',')]); }
  g.save = function () { g.stack.push([snap(), g.dash.slice(), g.tf.slice()]); };
  g.restore = function () { const s = g.stack.pop(); if (!s) return; for (const k of KEYS) g[k] = s[0][k]; g.dash = s[1]; g.tf = s[2]; };
  g.setTransform = function (a, b, c, d, e, f) { g.tf = [a, b, c, d, e, f]; };
  g.clearRect = function () { g.paint.length = 0; };
  g.getLineDash = function () { return g.dash.slice(); };
  g.setLineDash = function (a) { g.dash = a.slice(); };
  g.measureText = function (t) { return { width: String(t).length * 7 }; };
  for (const m of ['beginPath', 'closePath', 'moveTo', 'lineTo', 'arcTo', 'arc', 'roundRect', 'quadraticCurveTo',
    'bezierCurveTo', 'rect', 'fill', 'stroke', 'fillText', 'strokeText', 'fillRect', 'strokeRect']) {
    g[m] = function () { paint(m, Array.prototype.slice.call(arguments)); };
  }
  g.createLinearGradient = function () { return { addColorStop() {} }; };
  g.translate = function () { paint('translate', []); };
  g.snap = snap;
  return g;
}

/** 模拟一帧直画：结构性名字经记录器、节点名直画 + 7 元组，终态抄回层；再物化，比对层与主画布的绘制序列 */
function recorderChecks(F, bad, bump) {
  for (let j = 0; j < 96; j++) {
    const layer = FakeCtx(F), main = FakeCtx(F);
    /* 层带着「上一次重算」留下的状态（旧路就在这个状态上画） */
    layer.font = '600 9.5px sans-serif'; layer.textAlign = 'center'; layer.fillStyle = '#123456'; layer.lineWidth = 2.5;
    layer.setLineDash(j % 3 ? [] : [4, 2]);
    main.globalAlpha = 0.4; main.font = '700 20px serif';                // 主画布此刻的状态与层无关
    const rec = { start: F.labelReadState(layer), struct: [], nodes: [], layer: layer, valid: true, depth: 0 };
    main.save();
    F.labelCopyState(main, layer);
    main.setTransform(2, 0, 0, 2, 0, 0);
    const q = F.labelRecorder(main, rec);
    for (let z = 0; z < j % 9; z++) {
      q.save(); q.textAlign = 'center'; q.textBaseline = 'middle'; q.globalAlpha = 0.5 + z / 40;
      q.font = '700 ' + (13 + z / 10).toFixed(1) + 'px sans-serif'; q.measureText('abc');
      q.fillStyle = 'rgba(255,255,255,0.88)'; q.beginPath(); q.roundRect(z, 8, 42, 12, [6]); q.fill();
      if (z % 2) { q.strokeStyle = 'rgba(1,2,3,0.5)'; q.lineWidth = 1.2; q.stroke(); }
      if (z % 3 === 1) { q.setLineDash([2, 1]); q.moveTo(0, 0); q.arcTo(1, 1, 2, 2, 1); q.setLineDash([]); }
      q.textAlign = 'left'; q.fillText('名' + z, z + 0.2, 17.5); q.textAlign = 'center'; q.globalAlpha = 1;
      q.restore();
    }
    if (rec.depth !== 0) rec.valid = false;
    main.font = '600 9.5px sans-serif'; main.textAlign = 'center'; main.textBaseline = 'top';
    let cur = main.font, lw0 = null, st0 = null, fi0 = null;
    for (let i = 0; i < j % 37; i++) {
      const text = 'label' + i, x = i * 12.3, y = i * 4.1, lw = Math.max(2.5, (8 + (i % 3) / 10) * 0.28);
      if (i % 5 === 0) { main.font = '600 ' + (8 + (i % 3) / 10) + 'px sans-serif'; cur = main.font; }
      const stroke = 'rgba(255,255,255,' + (0.9 - i / 100).toFixed(3) + ')', fill = 'rgba(28,28,30,' + (0.92 - i / 100) + ')';
      if (lw !== lw0) { main.lineWidth = lw; lw0 = lw; }
      if (stroke !== st0) { main.strokeStyle = stroke; st0 = stroke; }
      main.strokeText(text, x, y);
      if (fill !== fi0) { main.fillStyle = fill; fi0 = fill; }
      main.fillText(text, x, y);
      rec.nodes.push(text, x, y, cur, lw, stroke, fill);
    }
    F.labelCopyState(layer, main);
    const directPaint = main.paint.slice(), endState = JSON.stringify([layer.snap(), layer.getLineDash()]);
    main.restore();
    if (!rec.valid) { bad('合法的结构命令被判作废（j=' + j + '）'); continue; }
    F.labelReplayRecord(layer, rec, 2, 480, 3000, 2000);
    bump('rec.materialized');
    if (JSON.stringify(layer.paint) !== JSON.stringify(directPaint)) { bad('物化的绘制序列与直画不同（j=' + j + '）'); continue; }
    if (JSON.stringify([layer.snap(), layer.getLineDash()]) !== endState) bad('物化后层的终态变了（j=' + j + '）');
    if (layer.tf.join() !== '1,0,0,1,0,0') bad('物化没有恢复层原来的变换');
  }
  /* 作废条件 */
  function fresh() { const g = FakeCtx(F); return { g: g, rec: { start: F.labelReadState(g), struct: [], nodes: [], layer: g, valid: true, depth: 0 } }; }
  { const t = fresh(), q = F.labelRecorder(t.g, t.rec); q.translate(1, 2); if (t.rec.valid) bad('未登记的方法必须作废记录'); bump('rec.invalidMethod'); }
  { const t = fresh(), q = F.labelRecorder(t.g, t.rec); q.fillStyle = q.createLinearGradient(0, 0, 1, 1); if (t.rec.valid) bad('非字符串/数字的属性值必须作废记录'); bump('rec.invalidValue'); }
  { const t = fresh(), q = F.labelRecorder(t.g, t.rec); q.imageSmoothingEnabled = false; if (t.rec.valid) bad('非标签状态键的赋值必须作废记录'); }
  { const t = fresh(), q = F.labelRecorder(t.g, t.rec); q.restore(); if (t.rec.valid) bad('没有 save 的 restore 必须作废记录'); bump('rec.unbalanced'); }
  {
    const t = fresh(); t.rec.struct.push([0, 'save', []]);
    let threw = false; try { F.labelReplayRecord(t.g, t.rec, 1, 0, 10, 10); } catch (e) { threw = true; }
    if (!threw) bad('不配对的记录物化时必须抛出'); bump('rec.replayThrows');
    if (t.g.stack.length !== 0) bad('物化失败后 save 栈没有清干净');
    const t2 = fresh(); t2.rec.struct.push([0, 'restore', []]);
    threw = false; try { F.labelReplayRecord(t2.g, t2.rec, 1, 0, 10, 10); } catch (e) { threw = true; }
    if (!threw) bad('多出来的 restore 物化时必须抛出');
  }
  {
    const P0 = globalThis.Proxy; globalThis.Proxy = undefined;
    try { if (F.labelRecorder(FakeCtx(F), {}) !== null) bad('没有 Proxy 时记录器应返回 null'); } finally { globalThis.Proxy = P0; }
    bump('rec.noProxy');
  }
}

function handoffChecks(F, bad, bump) {
  const W = 1000, H = 700, M = 240, layer = { g: {}, dpr: 1 };
  const base = { k: 1, tx: 10, ty: 20, w: W, h: H, sig: 'x', directOnly: true, record: { valid: true, layer: layer } };
  const c = { k: 1, tx: 10, ty: 20, viewW: W, viewH: H };
  const ok = function (cache, cam, prev, sig, ly, d, w, h) {
    return F.labelHandoffOk(cache, cam, prev, sig == null ? 'x' : sig, ly || layer, d || 1, w || W, h || H, M);
  };
  const lim = Math.min(W * 0.5, M * 0.9);
  if (!ok(base, c, c)) bad('同机位（哪怕相机停住）原策略会回放 ⇒ 应物化'); else bump('handoff.same');
  if (!ok(base, Object.assign({}, c, { tx: 22 }), c)) bad('小位移、仍在动 ⇒ 应物化'); else bump('handoff.pan');
  if (!ok(base, Object.assign({}, c, { tx: 10 + lim }), c)) bad('位移恰等于上限（不算 far）⇒ 应物化');
  if (ok(base, Object.assign({}, c, { tx: 10 + lim + 1e-9 }), c)) bad('位移超过上限（far）⇒ 不该物化'); else bump('handoff.far');
  if (ok(base, Object.assign({}, c, { ty: 20 - lim - 1 }), c)) bad('纵向 far ⇒ 不该物化');
  const moved = Object.assign({}, c, { tx: 22 });
  if (ok(base, moved, moved)) bad('有位移且相机停住（stopped）⇒ 原策略重算，不该物化'); else bump('handoff.stopped');
  const rejects = [
    [Object.assign({}, base, { k: 2 }), c], [base, Object.assign({}, c, { k: 1.0000001 })],
    [Object.assign({}, base, { directOnly: false }), c], [Object.assign({}, base, { record: null }), c],
    [Object.assign({}, base, { record: { valid: false, layer: layer } }), c],
    [Object.assign({}, base, { record: { valid: true, layer: { g: {}, dpr: 1 } } }), c],
    [Object.assign({}, base, { w: 999 }), c], [Object.assign({}, base, { h: 699 }), c], [null, c]
  ];
  for (const [cache, cam] of rejects) { if (ok(cache, cam, c)) bad('交接应拒绝：' + JSON.stringify(cache && Object.keys(cache))); else bump('handoff.reject'); }
  if (ok(base, c, c, 'y')) bad('指纹不同 ⇒ 不该物化');
  if (ok(base, c, c, null, { g: null, dpr: 1 })) bad('层没有 context ⇒ 不该物化');
  if (F.labelHandoffOk(base, c, c, 'x', layer, 2, W, H, M)) bad('dpr 变了 ⇒ 不该物化');
}

/* ------------------------------------------------------------------ 主程序 + 反向对照 */
const main = checkAll(load(BLOCK, SPOT));
const MUTANTS = [
  ['避让：返回最后一个阻挡者', 'if (i >= best || seen[i] === stamp) return;', 'if (seen[i] === stamp) return;'],
  ['字号：1.25 改成 <=', 'if (ratio < 1.25) { size = 0.72; return true; }', 'if (ratio <= 1.25) { size = 0.72; return true; }'],
  ['字号：候选格少一格', 'lim = Math.ceil(Math.min(1e8, 1.6 * R) / cell) + 1;', 'lim = Math.floor(Math.min(1e8, 1.6 * R) / cell);'],
  ['归属：窗口用 floor', 'lim = Math.ceil(Math.max(ww, hW) * 0.68 / cell);', 'lim = Math.floor(Math.max(ww, hW) * 0.68 / cell);'],
  ['归属：半宽不回退', 'hw + (m.hw || hw)', 'hw + hw'],
  ['排序：平手按反序', 'return (order[b].p - order[a].p) || (a - b);', 'return (order[b].p - order[a].p) || (b - a);'],
  ['交接：上限不乘 0.9', 'Math.min(vw * 0.5, margin * 0.9) ||', 'Math.min(vw * 0.5, margin) ||'],
  ['交接：忘了 stopped', 'return !far && !stopped;', 'return !far;'],
  ['记录：接受任意方法', 'fn = function () { rec.valid = false; return v.apply(t, arguments); };', 'fn = function () { return v.apply(t, arguments); };']
];
const SPOT_MUTANTS = [
  ['快判：y0 判据错一像素', 'y - 1 >= H', 'y >= H'],
  ['快判：横向不看 pad', 'px >= 0 && px <= W && px + pad > 0 && px - pad < W', 'px >= -pad && px <= W + pad']
];
const caught = [], missed = [];
for (const [name, a, b] of MUTANTS) {
  if (BLOCK.indexOf(a) < 0) { missed.push(name + '（生产代码里找不到被改的那一行：对照失效）'); continue; }
  const r = checkAll(load(BLOCK.replace(a, b), SPOT), true);
  (r.fail.length ? caught : missed).push(name);
}
for (const [name, a, b] of SPOT_MUTANTS) {
  if (SPOT.indexOf(a) < 0) { missed.push(name + '（找不到被改的那一行）'); continue; }
  const r = checkAll(load(BLOCK, SPOT.replace(a, b)), true);
  (r.fail.length ? caught : missed).push(name);
}

const cv = main.cov;
console.log('  labelcheck（合成数据 / 假 ctx，非浏览器证据）');
console.log('    归属 ' + cv['own.cases'] + ' 例（' + cv['own.owners'] + ' 个归属者）· 字号 ' + cv['size.cases'] + ' 例（.72/.85/1 = ' +
  cv['size.0.72'] + '/' + cv['size.0.85'] + '/' + cv['size.1'] + '）· 避让查询 ' + cv['hit.queries'] +
  ' · 排序 ' + cv['rank.tests'] + ' 例（建 ' + cv['rank.build'] + ' / 复用 ' + cv['rank.hit'] + '）');
console.log('    nameSpot 快判 ' + cv['spot.cases'] + ' 例（0/1/判不了 = ' + cv['spot.0'] + '/' + cv['spot.1'] + '/' + cv['spot.unknown'] +
  '）· 物化 ' + cv['rec.materialized'] + ' 例 · 交接拒绝 ' + cv['handoff.reject'] + ' 例');
console.log('    反向对照：' + caught.length + '/' + (MUTANTS.length + SPOT_MUTANTS.length) + ' 个改坏版本被抓到');
if (main.fail.length || missed.length) {
  for (const f of main.fail.slice(0, 20)) console.error('  ✗ ' + f);
  for (const m of missed) console.error('  ✗ 反向对照没抓到：' + m);
  process.exit(1);
}
console.log('  ✓ labelcheck 通过');
