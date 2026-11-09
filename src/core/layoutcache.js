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

  /* v2（2026-11-09 ENG-013）：签名纳入 config.background（板块云半径用它）⇒ 旧缓存的
     sig 一定对不上；同时直接换 key，让 v1 记录一次性失效，用户不用手动清 localStorage。 */
  var KEY = 'mathgalaxy.layout.v2';       /* ⛔ 改名 = 缓存失效（无损失，只是重算一次） */
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
    /* ⑤ 布局与团云的全部常量（改了任何一个，坐标/云半径就该重算）
       ⭐ 规则：**凡是 layout.js 在布局阶段读到的 config 都必须进这里**，
          不能只列 layout/cluster（那是 2026-11-09 ENG-013 的坑）。
          layout.js:915 用 `background.cloudRadiusMin / cloudMargin` 算板块云半径；
          它们不进签名 ⇒ 改雾参数后旧缓存里的**旧半径**继续被复用，
          线上按旧半径烘雾、表现为「清 localStorage 才正常」。
          这里把整个 background 也放进去：宁可雾参数变了多算一次布局，
          也不能再让旧半径借尸还魂。 */
    var cfgTxt = '';
    try {
      cfgTxt = JSON.stringify(MG.config && MG.config.layout) + '|' +
        JSON.stringify(MG.config && MG.config.cluster) + '|' +
        JSON.stringify(MG.config && MG.config.background);
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

  /* -------------------------------------------------------------- 预判 */
  /** 只比对签名，不动数据 —— 供「加载文案」之类的场景用（便宜，不碰 localStorage 的写路径） */
  function peek(graph) {
    var data = readJSON(KEY);
    if (!data || !data.p) return false;
    if (data.p.length !== graph.nodes.length * 2) return false;
    return data.sig === signature(graph);
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
    var ok = writeJSON(KEY, { sig: signature(graph), p: p, r: r, c: c });
    /* ENG-013：换 key 后 v1 的老记录永远不会再被读到，留着只占配额（~20 KB）⇒ 顺手清掉 */
    if (ok) {
      var ls = store();
      if (ls) { try { ls.removeItem('mathgalaxy.layout.v1'); } catch (e) { /* 忽略 */ } }
    }
    return ok;
  }

  function clear() {
    var ls = store();
    if (!ls) return;
    try { ls.removeItem(KEY); } catch (e) { /* 忽略 */ }
  }

  /* -------------------------------------------------------------- 相机 */
  /* 「上次看到哪」也存一下：否则每次刷新都从「全部适配」重新开始动画。
     ⭐⭐ ENG-001（2026-11-05 用户拍板）：**存绝对 k + 世界中心**。
        k 就是「CSS px / 世界单位」，与视口无关；换窗口重开必须还是同一个显示大小
        （窗口变化只改「看得到多少」，不改 k、不改 LOD 档）。
        以前存 k/tx/ty —— tx/ty 是屏幕像素平移量，只有**同一个视口**才还原得对；
        现在改存可用区中心的世界坐标 (cx,cy)，恢复时对新视口 `centerOn` 即可。
        `v` 是格式版本：v2 起是 {k, cx, cy}。旧 v1 没有世界中心 ⇒ 返回 null（回默认视角）。 */
  var CAM_V = 2;
  function saveCam(cam) {
    if (!cam || !isFinite(cam.k) || cam.k <= 0) return false;
    if (typeof cam.availRect !== 'function' || typeof cam.toWorld !== 'function') return false;
    var av = cam.availRect();
    var w = cam.toWorld(av.cx, av.cy);
    if (!isFinite(w.x) || !isFinite(w.y)) return false;
    return writeJSON(CAM_KEY, {
      v: CAM_V, k: cam.k, cx: w.x, cy: w.y,
      /* 视口尺寸只做诊断；恢复不读它（读了就又跟视口绑死了） */
      vw: cam.viewW, vh: cam.viewH
    });
  }

  /** 读出相机；没有 / 不合法 / 明显跑到世界外面 ⇒ null。
      返回 { k, cx, cy }：k 是**绝对缩放**（与视口无关），调用方拿到后
      `cam.k = clamp(k); cam.centerOn(cx, cy)`。
      ⚠️ 旧 v2 记录里若有 fitK 一律忽略 —— 不再乘当前视口的 fit。 */
  function loadCam(graph) {
    var d = readJSON(CAM_KEY);
    if (!d || d.v !== CAM_V) return null;
    /* ⚠️ 不能只用 isFinite：JSON 把 NaN 写成 null，而 isFinite(null) 是 **true**
       （Number(null) === 0）—— 这样坏值会一路流进来。必须逐字段查 typeof。 */
    if (typeof d.k !== 'number' || typeof d.cx !== 'number' || typeof d.cy !== 'number') return null;
    if (!isFinite(d.k) || !isFinite(d.cx) || !isFinite(d.cy)) return null;
    if (!(d.k > 0)) return null;
    var bb = graph.bbox && graph.bbox();
    if (bb) {
      /* 世界中心要求落在内容包围盒里（放宽一圈）—— 存档换了内容/设备时别乱跳 */
      var pad = 0.5 * Math.max(bb.maxX - bb.minX, bb.maxY - bb.minY) + 2000;
      var mx = (bb.minX + bb.maxX) / 2, my = (bb.minY + bb.maxY) / 2;
      var halfW = (bb.maxX - bb.minX) / 2 + pad, halfH = (bb.maxY - bb.minY) / 2 + pad;
      if (Math.abs(d.cx - mx) > halfW || Math.abs(d.cy - my) > halfH) return null;
    }
    return { k: d.k, cx: d.cx, cy: d.cy };
  }

  MG.layoutCache = {
    key: KEY, camKey: CAM_KEY,
    signature: signature,
    peek: peek,
    restore: restore,
    save: save,
    clear: clear,
    saveCam: saveCam,
    loadCam: loadCam
  };
})(typeof window !== 'undefined' ? window : globalThis);
