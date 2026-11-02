/* ==========================================================================
   数学星图 · 布局缓存（localStorage）
   --------------------------------------------------------------------------
   为什么要有它：`MG.computeLayout` 每次启动都要跑一遍
   「解领域中心 → 星团装箱 → 精化 → 行星-卫星锚点」，1460 个点要几百毫秒到
   一秒多。而布局**是确定性的**（layout.js 末尾自己写着「⛔ 不含随机，跑几次都
   一样」），所以完全可以算一次、存下来、下次直接用。

   ⛔ 三条边界（都很重要）：
     1. **只在签名一致时用缓存**。签名包含：内容版本、节点 id 顺序、团归属、
        星系基准中心、以及 `config.layout` / `config.cluster` 的**全部常量**。
        任何一项变了 ⇒ 缓存作废，重新算。宁可白算一次，不可用错坐标。
     2. **不缓存语义字段**。`n.target / n.degree / n.galaxy / n.regionObjs /
        n._sector` 这些是准备阶段算出来的（很便宜），每次仍然现算；
        缓存里只有坐标与几个半径 —— 它们是纯几何量。
     3. **任何异常都静默放过**。localStorage 可能被禁用（隐私模式）、
        可能满了、可能被别的东西写坏。缓存失败绝不能让星图打不开。

   存储格式（尽量小）：节点坐标取整后摊平成一个数组，团 / 星系的圆心与半径
   各一个数组。1460 点大约 20 KB，远低于配额。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var KEY = 'mathgalaxy.layout.v1';       /* ⛔ 改名 = 缓存失效（无损失，只是重算一次） */
  var CAM_KEY = 'mathgalaxy.camera.v1';   /* 相机（k, tx, ty）单独存，与布局无关 */
  var CAM_MARGIN = 1e-6;

  /* ---------------------------------------------------------------- 签名 */
  /* FNV-1a 32 位 + 长度。碰撞概率对「内容变了但签名没变」这种场景足够低；
     再加一个长度做二次校验。 */
  function hash32(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h >>> 0;
  }

  function signature(graph) {
    var parts = [];
    /* ① 内容版本（dist/graph.json 里 meta.contentVersion；页面内由 build 注入） */
    parts.push('v:' + (MG.contentVersion || MG.version || '?'));
    /* ② 节点 id 顺序（渲染与索引用的是同一个顺序，变了就不能复用坐标） */
    parts.push('n:' + graph.nodes.length);
    var ids = [];
    for (var i = 0; i < graph.nodes.length; i++) ids.push(graph.nodes[i].id);
    /* ③ 团归属（装箱与锚点都按团走） */
    var cls = [];
    for (var c = 0; c < graph.clusters.length; c++) {
      var cl = graph.clusters[c];
      cls.push(cl.id + '=' + ((cl.nodes && cl.nodes.length) || 0));
    }
    /* ④ 星系基准中心（regions.js 的手写方位是布局输入） */
    var regs = [];
    for (var r = 0; r < graph.regions.length; r++) {
      var g = graph.regions[r];
      var base = g._baseCenter || g.center || { x: 0, y: 0 };
      regs.push(g.id + '@' + (base.x | 0) + ',' + (base.y | 0));
    }
    /* ⑤ 布局与团云的全部常量（改了任何一个，坐标就该重算） */
    var cfgTxt = '';
    try {
      cfgTxt = JSON.stringify(MG.config && MG.config.layout) + '|' +
        JSON.stringify(MG.config && MG.config.cluster);
    } catch (e) { cfgTxt = 'cfg?'; }

    var payload = parts.join(';') + '|' + ids.join('\u0001') + '|' +
      cls.join(',') + '|' + regs.join(',') + '|' + cfgTxt;
    return ids.length + ':' + hash32(payload).toString(36);
  }

  /* ---------------------------------------------------------------- 存取 */
  function store() {
    try { return global.localStorage || null; } catch (e) { return null; }
  }

  function readJSON(key) {
    var ls = store();
    if (!ls) return null;
    try {
      var raw = ls.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function writeJSON(key, val) {
    var ls = store();
    if (!ls) return false;
    try { ls.setItem(key, JSON.stringify(val)); return true; }
    catch (e) {
      /* 配额满了：把旧缓存删掉重试一次，还不行就算了 */
      try { ls.removeItem(key); ls.setItem(key, JSON.stringify(val)); return true; }
      catch (e2) { return false; }
    }
  }

  /* -------------------------------------------------------------- 恢复 */
  /** 把缓存里的坐标写回 graph。返回 true 表示**用得上的**缓存（调用方应跳过求解）。 */
  function restore(graph) {
    var data = readJSON(KEY);
    if (!data || data.sig !== signature(graph)) return false;
    if (!data.p || data.p.length !== graph.nodes.length * 2) return false;

    var nodes = graph.nodes;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].x = data.p[i * 2];
      nodes[i].y = data.p[i * 2 + 1];
    }
    /* 星系：基准中心 + 外扩（与 computeLayout 第 0 步同口径），以及存下来的 stat */
    var cfg = MG.config.layout;
    for (var r = 0; r < graph.regions.length; r++) {
      var reg = graph.regions[r];
      if (!reg._baseCenter && reg.center) reg._baseCenter = { x: reg.center.x, y: reg.center.y };
      if (reg._baseCenter) {
        reg.center = {
          x: reg._baseCenter.x * cfg.regionSpread,
          y: reg._baseCenter.y * cfg.regionSpread
        };
      }
      var rs = data.r && data.r[r];
      reg.stat = rs ? { cx: rs[0], cy: rs[1], nameX: rs[2], nameY: rs[3], count: rs[4], radius: rs[5] } : null;
    }
    /* 星团：stat + center（画团级连线要用 center） */
    for (var c = 0; c < graph.clusters.length; c++) {
      var cl = graph.clusters[c];
      var cs = data.c && data.c[c];
      if (!cs) { cl.stat = null; cl.center = null; continue; }
      cl.stat = { cx: cs[0], cy: cs[1], count: cs[2], radius: cs[3] };
      cl.center = { x: cs[0], y: cs[1] };
    }
    graph.layoutFromCache = true;
    graph.layoutMs = 0;
    return true;
  }

  /* -------------------------------------------------------------- 保存 */
  function save(graph) {
    var nodes = graph.nodes;
    var p = new Array(nodes.length * 2);
    for (var i = 0; i < nodes.length; i++) {
      /* 取整：画布上不需要亚像素，四舍五入能把 JSON 体积压掉一半 */
      p[i * 2] = Math.round(nodes[i].x);
      p[i * 2 + 1] = Math.round(nodes[i].y);
    }
    var r = graph.regions.map(function (reg) {
      var s = reg.stat;
      return s ? [Math.round(s.cx), Math.round(s.cy), Math.round(s.nameX), Math.round(s.nameY), s.count, Math.round(s.radius)] : null;
    });
    var c = graph.clusters.map(function (cl) {
      var s = cl.stat;
      return s ? [Math.round(s.cx), Math.round(s.cy), s.count, Math.round(s.radius)] : null;
    });
    return writeJSON(KEY, { sig: signature(graph), p: p, r: r, c: c });
  }

  function clear() {
    var ls = store();
    if (!ls) return;
    try { ls.removeItem(KEY); } catch (e) { /* 忽略 */ }
  }

  /* -------------------------------------------------------------- 相机 */
  /* 「上次看到哪」也存一下：否则每次刷新都从「全部适配」重新开始动画。 */
  function saveCam(cam) {
    if (!cam || !isFinite(cam.k) || cam.k <= 0) return false;
    return writeJSON(CAM_KEY, { k: cam.k, tx: cam.tx, ty: cam.ty });
  }

  /** 读出相机的历史值；没有 / 不合法 / 明显跑到世界外面 ⇒ null */
  function loadCam(graph) {
    var d = readJSON(CAM_KEY);
    if (!d) return null;
    /* ⚠️ 不能只用 isFinite：JSON 把 NaN 写成 null，而 isFinite(null) 是 **true**
       （Number(null) === 0）—— 这样坏值会一路流进来。必须逐字段查 typeof。 */
    if (typeof d.k !== 'number' || typeof d.tx !== 'number' || typeof d.ty !== 'number') return null;
    if (!isFinite(d.k) || !isFinite(d.tx) || !isFinite(d.ty)) return null;
    if (d.k <= 0) return null;
    var bb = graph.bbox && graph.bbox();
    if (bb) {
      /* 反解视图中心的世界坐标，要求它落在内容包围盒里（放宽一圈） */
      var pad = 0.5 * Math.max(bb.maxX - bb.minX, bb.maxY - bb.minY) + 2000;
      var cx = (d.tx * -1) / d.k, cy = (d.ty * -1) / d.k;
      /* 注意：tx/ty 是屏幕平移量，视图中心 ≈ (-tx/k, -ty/k) + 视口中心/k，
         这里只做粗略的合理性检查，真正的边界由 clamp 保证。 */
      if (!isFinite(cx) || !isFinite(cy)) return null;
      if (Math.abs(cx) > pad + 1e6 || Math.abs(cy) > pad + 1e6) return null;
    }
    return d;
  }

  MG.layoutCache = {
    key: KEY, camKey: CAM_KEY,
    signature: signature,
    restore: restore,
    save: save,
    clear: clear,
    saveCam: saveCam,
    loadCam: loadCam
  };
})(typeof window !== 'undefined' ? window : globalThis);
