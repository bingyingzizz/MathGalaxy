/* ==========================================================================
   世界/区域位图（Phase A + B）—— 引擎模块，不认识任何内容
   --------------------------------------------------------------------------
   单一快照模型：永远只有一份「已就绪」快照 + 最多一个构建任务在飞。
     Snapshot { rect, scale, k, dpr, rev, key } —— 内容画在 els[cur] 这一代上
   **Phase A 与 B 的差别只有 rect 的取值**（同一份代码，不是两套状态机）：
     · k ≤ worldKMax ⇒ R = 整个世界   → 平移期间零重烘、永不越界
     · 否则          ⇒ R = 视口 ⊕ 余量 → 越界重烘、旧图继续用、就绪后换代
   为什么高倍率不能用世界图：面积 ∝ k²（k=1.44 时世界图 80Mpx/321MB，而视口只覆盖世界 3.8%）
   —— 付 100% 的钱用 4% 的东西；实测把单图上限抬到 8192 会直接卡死页面。

   为什么能精确：线宽 / 90px 曲率上限 / LOD alpha 斜坡 / spineOnly / 节点半径
   全都只依赖 k、与平移无关 ⇒ 烘在「当前 k」、显示时 m=k/k_bake ⇒ 纯平移时逐像素一致。
   区域矩形的原点还额外**吸附到设备像素格**（见 rectFor）：两代的落位差恒为整数设备像素
   ⇒ 逐条带交接时「旧图的对应屏幕带」永远对得齐（不随平移抖 ±1px），而且内容落在整像素上（更锐）。

   ⭐⭐ 区域模式（k > worldKMax）是**横带切片烘焙**：
     一次只烘一条横带（bandPx 高、整数设备像素），旧的一代继续顶着显示，最后一条画完才换代。
     起因：一次「整张重烘」实测 ≈ 画布像素 × 9ns（3312×2056 → 46~58ms 单帧尖峰），
     而按带切能把它摊成几十根小帧。实测（k=1.2、假拖动 3s、同一台机器）：
       · 改动前（同步全烘）：p50 4.2 / p95 4.3 / max 66.7，>20ms 的帧 12 根
       · 带切片（本实现）：  p50 4.2 / p95 4.3 / max 12~17，>20ms 的帧 0 根
     四条硬规矩（都是实测换来的，别改回去）：
       ① **两代都常显**，换代只换**元数据 + 裁剪**：绝不 display:none ↔ ''、绝不换画布。
          「把画好的隐藏画布切成显示」= 整张 54~108ms（合成器要整张重新光栅化上传）。
       ② 交接只能用 **clip-path: inset(...)**（合成器级裁剪，不脏像素）。实测：一帧里
          clearRect 两张显示中的大画布 ⇒ p95 4.3 → **29.6ms**、平均帧间隔 4.6 → 10ms。
       ③ 带轮由**自己的 rAF 链**驱动，一帧一条带（`chainStep`）。⛔ 别改回「由 app 的 tick
          驱动」：app 只在 dirty 时画帧，拖动里几帧才来一次 ⇒ 每 tick 位移被放大成几十像素，
          11 条带的轮跑不过旧图余量 ⇒ 收尾必追赶（实测 33~70ms 单帧）。
       ④ 烘焙的几何要**一轮只建一次**（renderer 的 ensureGeomBake）：实测每条带的 JS
          2.6ms → 0.45ms，是 p95 能否守住 1 个时隙的关键。
     ⚠️ 开轮必须**提前**：轮要跑 n 帧，每帧平均走 speed、单帧最大跳 speedMax
        ⇒ slack < ((n-1)·speed + speedMax)·1.35 + 20 就开（上限 0.55×margin）。
     ⚠️ 轮跑到一半**不换矩形**（目标那一代是显示着的，换矩形会让已交出去的带跳位）；
        追不上就当场把剩下的带一次画完（= 老那一刀），然后马上再开一轮。
     ⚠️ 真露洞（旧图矩形都盖不住视口）仍走**同步全烘**：洞比尖峰更难看。它现在只在
        输入突发（一次 pointermove 跳几百像素）时才出现 —— 实测 CDP 拖动 7s 里 1 次。

   载体：DOM canvas + CSS transform（拖动只改 transform ⇒ 合成器搬图层）。
   吸附：合成偏移吸附到设备像素网格 —— ⛔ 相机逻辑位置一律不动。
   不进烘焙：标签、hover 叠加层、光晕（光晕实时画，实测 ≈0.05ms）、星团包络。
   资源：两代 canvas 常驻；建不出来按 maxSide 阶梯往下降，最小档还不行就关掉。
   ⚠️ 三个「等下一帧」的坑（都踩过）：settle 判定、换图定位、任何依赖后续帧的补写
       —— 相机静止时根本没有下一帧，必须用定时器 / 当场就位 / 自己 requestAnimationFrame。
   ⚠️ 静态路径里任何读**实时相机/实时视口**的位置都会整体错位（screenOf 踩过）。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = global.MG = global.MG || {};

  function createWorldBitmap(opt) {
    var renderer = opt.renderer;
    var graph = opt.graph;
    var host = opt.host;                 // 容器
    var beforeEl = opt.beforeEl;         // 插在它前面（= 图层 canvas）
    var tiers = (opt.tiers && opt.tiers.length) ? opt.tiers.slice() : [4096, 3600, 2048];
    var ti = 0;
    var settleMs = opt.settleMs == null ? 180 : opt.settleMs;
    var marginPx = opt.marginPx == null ? 400 : opt.marginPx;   // 区域模式的余量（设备像素/边）
    /** 一条带的目标高度（设备像素）。实测（k=1.2、画布 3312×2056、假拖动）：
        112px ⇒ 单帧≈1 个时隙（p95 4.3~5.1，与不烘焙持平）、max 25~29ms；
        160px ⇒ max 12.5ms 但每帧约 2 个时隙（p95 7~8.3）。取 128 折中。 */
    var bandPx = Math.max(48, Math.round(opt.bandPx == null ? 128 : Number(opt.bandPx) || 128));
    /* 世界单图的**面积预算**（设备像素）。用途：让「边长刚好越过 maxSide」的那一小段 k
       仍然走世界模式 —— 最差档 k≈0.62 正好落在里面。那段走区域模式时，拖动中每 ~0.4 秒
       就得重烘一次，每次都是一根 145ms 的尖峰（实测 11~14 次 / 6s，用户能感觉到掉帧）；
       世界图一次烘完，**平移期零重烘**。实测一次世界烘 ≈ 2.2 倍区域烘，且只在停手后发生。 */
    var worldPxMax = opt.worldPxMax == null ? 16e6 : opt.worldPxMax;
    var worldSideMax = opt.worldSideMax == null ? 6144 : opt.worldSideMax;
    var enabled = opt.enabled !== false;
    /* Phase B 区域模式开关（默认打开；关掉时 k > 世界单图上限仍走实时画）。 */
    var regionOn = !!opt.region;

    var els = [null, null];              // 两代（**都常显**）
    var cur = -1;                        // 快照（显示中的内容）在哪一代
    var elRect = [null, null], elScale = [0, 0], elTrans = ['', ''];
    var pending = false, settleTimer = 0, settleWanted = false, snapping = false;
    var buildGen = 0, rev = 0;
    var round = null;                    // 在飞的带轮
    var world = null, wW = 0, wH = 0;
    var last = { k: -1, tx: 0, ty: 0, dpr: 0, vw: 0, vh: 0 };
    var lastMove = 0, lastTransform = '', lastKey = '', speed = 0, speedMax = 0;
    var speedWin = [], speedSum = 0;     // 速度滑动窗口（每帧位移，设备像素）
    var chainId = 0, camRef = null;      // 带轮的驱动链（自己的 rAF）+ 相机引用
    var slog = [];                       // 近若干次「不盖住 ⇒ 同步全烘」的事件（排查尖峰归因用）
    var rlog = [];                       // 近若干轮的诊断（state() 里带出去；排「为什么追赶」用）
    var stats = { bakes: 0, lastMs: 0, peakMs: 0, swaps: 0, skipped: 0, regionBakes: 0,
      fallbackFrames: 0, emerg: 0, reason: '', mode: '-', rounds: 0, bands: 0, bandMs: 0,
      lastBands: 0, roundMs: 0, rushed: 0, realloc: 0 };
    var snap = { ready: false, rect: null, mode: '', scale: 0, k: 0, dpr: 1, rev: 0, key: '' };

    function now() { return (global.performance || Date).now(); }
    function maxSide() { return tiers[Math.min(ti, tiers.length - 1)]; }

    function measure() {
      var bb = graph.bbox();
      world = { minX: bb.minX, minY: bb.minY, maxX: bb.maxX, maxY: bb.maxY };
      wW = Math.max(1, bb.maxX - bb.minX);
      wH = Math.max(1, bb.maxY - bb.minY);
    }
    /** 世界单图能覆盖的最大 k（边长口径，来自 maxSide 阶梯） */
    function worldK() { return maxSide() / Math.max(wW, wH); }
    /** 世界单图真正的上限 = max(边长口径, 面积/边长预算口径)。
        允许边长略微超过 maxSide，换「k 一越过 0.607 就不必掉进区域模式」。
        ⚠️ dpr 必须算进去：像素尺寸 = 世界长 × k × min(dpr,2)（忽略它会在高分屏上烘出 2 倍大的图）。 */
    function worldKMax(dpr) {
      var d = Math.min(Math.max(1, dpr || 1), 2);
      var sideK = worldSideMax / (Math.max(wW, wH) * d);
      var areaK = Math.sqrt(worldPxMax / (wW * wH)) / d;
      return Math.max(worldK(), Math.min(sideK, areaK));
    }

    function mkEl(gen) {
      var cv = global.document.createElement('canvas');
      cv.setAttribute('data-mg', 'worldbitmap');
      cv.setAttribute('data-mg-gen', String(gen));
      cv.style.cssText = 'position:absolute;left:0;top:0;transform-origin:0 0;'
        + 'will-change:transform;pointer-events:none;display:none;';
      if (beforeEl && beforeEl.parentNode === host) host.insertBefore(cv, beforeEl);
      else host.appendChild(cv);
      return cv;
    }
    /** ⭐ 两代**都常显**（1×1 也显示着，代价≈0）：换代只换元数据，
        绝不 display:none ↔ ''（那一步实测 54~108ms，整张要重新光栅化上传）。 */
    function attach() {
      if (els[0]) return true;
      els[0] = mkEl(0); els[1] = mkEl(1); measure();
      var g0 = els[0].getContext('2d'), g1 = els[1].getContext('2d');
      g0.setTransform(1, 0, 0, 1, 0, 0); g1.setTransform(1, 0, 0, 1, 0, 0);
      els[0].style.display = ''; els[1].style.display = '';
      return true;
    }

    /** 视口相对某个矩形还有多少**设备像素**余量（= 还能拖多远不露洞；负数 = 已经盖不住） */
    function slackOf(r) {
      var k = last.k, dpr = Math.max(1, last.dpr);
      if (!(k > 0) || !r) return 0;
      var left = (0 - (r.minX * k + last.tx)) * dpr;
      var top = (0 - (r.minY * k + last.ty)) * dpr;
      var right = ((r.maxX * k + last.tx) - last.vw) * dpr;
      var bottom = ((r.maxY * k + last.ty) - last.vh) * dpr;
      return Math.min(left, top, right, bottom);
    }
    function rectCoversView(r) { return !!r && slackOf(r) >= 0; }

    /** 开轮要跑几帧（提前量按它算） */
    function bandsFor(h) { return Math.max(1, Math.ceil(h / bandPx)); }
    /* 速度估计的下限：拖动**刚起步**时窗口还是空的（speed≈0）⇒ 门槛只剩 100px、
       条数也放开 ⇒ 轮跑到一半显示层就被拖出头了 ⇒ 走同步全烘（58ms 一根）。
       实测 _dragbench 每轮 7s 正好留下 1 根 58ms = 就是它。 */
    function speedEst() { return Math.max(speed, 8); }
    function maxEst() { return Math.max(speedMax, 16); }
    /** 轮跑完需要的余量（设备像素）：T 帧、每帧平均走 speed、还要扛住单帧最大跳变。
        单帧最大跳变必须算进去 —— 拖动是**按输入事件跳**的（一次 pointermove 就是几十像素），
        用平均值估会正好在最后一帧越界 ⇒ 追赶。 */
    function runwayPx(n) { return Math.max(0, n - 1) * speedEst() + maxEst(); }
    /** 开轮门槛（设备像素）：轮跑得完再加 1.35 倍安全量。
        上限 0.55×margin：门槛太高会让「每轮覆盖的位移」变小 ⇒ 每秒烘的量反而变多。 */
    function needPx(n) { return Math.min(marginPx * 0.55, Math.max(100, runwayPx(n) * 1.35 + 20)); }

    /** 该用哪个矩形：装得下就整个世界；装不下就「视口 ⊕ 余量」 */
    function rectFor(k, tx, ty, dpr, vw, vh) {
      if (!(k > 0)) return null;
      if (k <= worldKMax(dpr) * 1.0001) return { r: world, mode: 'world' };
      if (!regionOn) return null;      // Phase B 未开启：高倍率不烘（交实时画）
      /* ⚠️ **先把像素尺寸定死**（吸附到 8 设备像素的格），再换算成世界矩形。
         否则矩形宽度每烘一次都会因 ceil 抖动 1px ⇒ 画布 backing store 反复重新分配
         （3330×1983 ≈ 26MB）—— 实测那是 54~67ms 单帧尖峰的来源。 */
      var m = Math.min(dpr, 2);
      /* margin 不能把图顶出纹理/内存上限：夹到 maxSide（k=1.44、视口 2530 时每边最多 ~783px）。
         否则会一直 too-big ⇒ snap 永远 not ready ⇒ 每帧排队重烘 + 退回实时画。 */
      var lim = maxSide();
      var pw = Math.min(lim, Math.ceil((vw * dpr + 2 * marginPx) / 8) * 8);
      var ph = Math.min(lim, Math.ceil((vh * dpr + 2 * marginPx) / 8) * 8);
      var gx = k * m;                                  // 一个设备像素 = 多少世界长度
      var halfW = pw / (2 * gx), halfH = ph / (2 * gx);
      var cx = (vw / 2 - tx) / k, cy = (vh / 2 - ty) / k;   // 视口中心的世界坐标
      /* ⭐ 原点**吸附到设备像素格**（世界坐标里就是 1/gx 的整数倍）：
         ⇒ 落位 = rect.min*k + round(tx*dpr)/dpr，两代的落位差恒为整数设备像素
         ⇒ 逐条带交接时「旧层对应的屏幕带」永远对得齐（不随平移抖 ±1px）。
         尺寸仍精确等于 pw/ph（不让 ceil 抖动 ⇒ 画布不重分配）。 */
      var minX = Math.round((cx - halfW) * gx) / gx;
      var minY = Math.round((cy - halfH) * gx) / gx;
      return { mode: 'region', r: { minX: minX, minY: minY, maxX: minX + pw / gx, maxY: minY + ph / gx } };
    }
    function sameRect(a, b) {
      if (!a || !b) return false;
      var tol = 1e-6;
      return Math.abs(a.minX - b.minX) < tol && Math.abs(a.minY - b.minY) < tol
        && Math.abs(a.maxX - b.maxX) < tol && Math.abs(a.maxY - b.maxY) < tol;
    }
    /** 快照够不够用。
        ⚠️ 世界模式下**不能**用「视口 ⊆ 矩形」判：全图档时整个世界都在视口里，
        矩形本来就比视口小 ⇒ 那条判据恒为 false ⇒ 每帧排队重烘（实测把用户卡回来过）。
        世界模式只需 k 还在世界单图能覆盖的范围内。 */
    function adequate(k) {
      if (!snap.ready) return false;
      if (snap.mode === 'world') return k <= worldKMax(snap.dpr) * 1.0001;
      return rectCoversView(snap.rect);
    }
    function sizeFor(r, k, dpr) {
      var sc = k * Math.min(dpr, 2);
      return {
        scale: sc,
        /* -1e-6：矩形宽 = pw/gx 时乘 gx 回来会带 1e-9 的浮点尾巴，ceil 会多涨 1 像素
           ⇒ 画布尺寸每轮抖一下 ⇒ 每轮重新分配（正是要避免的那笔钱）。 */
        w: Math.max(1, Math.ceil((r.maxX - r.minX) * sc - 1e-6)),
        h: Math.max(1, Math.ceil((r.maxY - r.minY) * sc - 1e-6))
      };
    }

    /* ------------------------------------------------------ 同步全烘（老路）
       用在：首烘 / 世界图 / 换档 / 换尺寸 / 追赶（轮甩掉了）/ 手动 bakeNow。
       区域模式下的**例行重烘**走带轮（见 startRound / bandStep）。 */
    function runBake() {
      pending = false;
      round = null;
      if (!els[0]) attach();
      var k = last.k, dpr = Math.max(1, last.dpr);
      if (!(k > 0)) { stats.skipped++; return; }
      var pick = rectFor(k, last.tx, last.ty, dpr, last.vw, last.vh);
      if (!pick) { stats.skipped++; return; }
      var r = pick.r;
      var s = sizeFor(r, k, dpr);
      var big = pick.mode === 'world'
        ? (Math.max(s.w, s.h) > worldSideMax || s.w * s.h > worldPxMax)
        : (Math.max(s.w, s.h) > maxSide());
      if (big) { stats.skipped++; stats.reason = 'too-big ' + s.w + 'x' + s.h; return; }
      /* ⭐ 就地烘：**复用当前正在显示的那一代画布**，不换显示层。
         每次「换显示层」实测有 80~150ms 的固定开销（与画布大小、画多少内容都无关 ——
         连 646×548 的世界烘也照样挨这一刀），那是拖动里那一根尖峰的大头。
         就地烘是安全的：drawStatic（清 + 画）与随后的 applyTransform 在**同一个同步块**里，
         paint 不会插进来，所以看不到半成品，也不会看到「新图配旧 transform」。
         只有尺寸真的变了（dpr / 视口尺寸变化）才换一代 —— 那种时候不能在可见画布上重分配。 */
      var idx = cur >= 0 ? cur : 0;
      var cv = els[idx];
      if (cv.width !== s.w || cv.height !== s.h) {
        idx = idx === 0 ? 1 : 0;
        cv = els[idx];
        cv.width = s.w; cv.height = s.h;
      }
      cv.style.width = (s.w / dpr) + 'px';
      cv.style.height = (s.h / dpr) + 'px';
      var gen = ++buildGen;
      var t0 = now();
      try {
        renderer.drawStatic(cv.getContext('2d'), s.scale, r);
      } catch (err) {
        stats.reason = '降档：' + ((err && err.message) || err);
        if (ti < tiers.length - 1) { ti++; cv.width = 1; cv.height = 1; return runBake(); }
        enabled = false; hide(); stats.skipped++; return;
      }
      var ms = now() - t0;
      if (gen !== buildGen) { stats.skipped++; return; }
      /* ⚠️ 顺序要紧：先用**新快照**写定位，再显示、再换代。烘完没有下一帧，
         等下一帧才定位会让新图带着上一世的 transform 显示（实测整层错位）。 */
      snap = { ready: true, rect: r, mode: pick.mode, scale: s.scale, k: k, dpr: dpr, rev: ++rev, key: lastKey };
      cur = idx;
      elRect[idx] = r; elScale[idx] = s.scale; elTrans[idx] = '';
      setClip(idx, 0, 0);                  // 刚烘出来的那一代必须整张可见（它可能刚被换过来用）
      applyTransform();
      if (cv.style.display === 'none') cv.style.display = '';
      /* 非现行的一代：**透明 + 常显 + 同尺寸**（下一轮开轮就不用再分配） */
      syncIdle(cv, dpr);
      stats.bakes++; stats.lastMs = +ms.toFixed(1);
      if (ms > stats.peakMs) stats.peakMs = +ms.toFixed(1);
      stats.swaps++;
      if (pick.mode === 'region') stats.regionBakes++;
      stats.mode = pick.mode;
      stats.lastBands = 0;
      stats.reason = 'ok ' + pick.mode + ' ' + s.w + 'x' + s.h + ' @k=' + k.toFixed(3) + ' tier=' + maxSide();
      if (opt.onSwap) opt.onSwap();     // 保险：烘完至少再来一帧
    }

    /** 让「另一代」回到待命状态：**整张藏起来**、常显、与 bake 出来的那代同尺寸。
        ⛔ 不用清像素：它下一轮当目标时会先整张藏着，逐条带松开时那一条已经被新画覆盖。 */
    function syncIdle(baked, dpr) {
      var i = 1 - cur;
      var el = els[i];
      if (!el || el === baked) return;
      if (el.width !== baked.width || el.height !== baked.height) {
        el.width = baked.width; el.height = baked.height;
        stats.realloc++;
      }
      el.style.width = (baked.width / dpr) + 'px';
      el.style.height = (baked.height / dpr) + 'px';
      elRect[i] = null; elScale[i] = 0; elTrans[i] = '';
      setClip(i, el.height / dpr, 0);
      if (el.style.display === 'none') el.style.display = '';
    }

    /* ---------------------------------------------------------- 横带切片烘焙 */
    /** 开一轮：目标 = 另一代（透明、常显），一条带一帧。第一条**当场**画（不等下一帧）。 */
    function startRound(pick, k, dpr, paintKey) {
      if (!els[0]) attach();
      if (!els[1]) return false;
      var r = pick.r, s = sizeFor(r, k, dpr);
      if (Math.max(s.w, s.h) > maxSide()) { stats.skipped++; stats.reason = 'too-big ' + s.w + 'x' + s.h; return false; }
      var target = cur >= 0 ? 1 - cur : 0;
      var cv = els[target];
      if (cv.width !== s.w || cv.height !== s.h) {
        /* 尺寸对不上（换档 / 换视口后的第一轮）：这一刀只能挨一次，之后同尺寸的轮全免分配 */
        cv.width = s.w; cv.height = s.h;
        stats.realloc++;
      }
      cv.style.width = (s.w / dpr) + 'px';
      cv.style.height = (s.h / dpr) + 'px';
      elRect[target] = r; elScale[target] = s.scale; elTrans[target] = '';
      setClip(target, s.h / dpr, 0);      // 目标先整张藏起来（旧墨不清，逐条带松开时被覆盖）
      if (cv.style.display === 'none') cv.style.display = '';
      /* 一条带多高：理想是 bandPx（约 1 个时隙），但轮必须在「旧图余量」用完之前跑完 ⇒
         T ≤ 余量 / 每帧平均位移。慢机 / 大位移时自动退化成更少更大的带（宁可单帧重一点，
         也不要收尾追赶 —— 追赶是整张一次画完，那才是真尖峰）。 */
      var slack0 = slackOf(snap.rect);
      var want = bandsFor(s.h);
      /* T 只能在 [ceil(want/2), want] 里调：⛔ 不许为凑余量把带放大到 2 倍以上
         （一条带 = 画布宽 × 带高 的脏区，实测 686px 带 ≈ 22~27ms/帧，比追赶还难看）。 */
      var fit = Math.max(3, Math.floor(Math.max(0, slack0 - maxEst()) / speedEst()) + 1);
      var T = Math.max(Math.ceil(want / 2), Math.min(want, fit));
      var bh = Math.ceil(s.h / T);
      round = { target: target, old: cur, rect: r, scale: s.scale, k: k, dpr: dpr, key: paintKey,
        w: s.w, h: s.h, y: 0, n: Math.ceil(s.h / bh), bandH: bh, i: 0, t0: now(), gen: ++buildGen,
        ticks: 0, rushBands: 0, slack0: Math.round(slack0), speed0: Math.round(speed),
        gapSum: 0, gapN: 0, stepSum: 0, jsSum: 0, lastT: 0 };
      applyTransform();                          // 目标先落位（交接边界要按它现在的屏幕位置算）
      bandStep();                                // 第一条不当场画就得等下一帧，而下一帧不一定有
      startChain();                              // 剩下的带由自己的 rAF 链一帧一条推进
      return true;
    }

    /** 一帧一条带；跑完就换代。追不上（矩形盖不住了）时由调用方传 rush=true 一次画完剩下的。 */
    function bandStep(rush) {
      if (!round) return;
      var cv = els[round.target];
      if (!cv) { round = null; return; }
      round.ticks++;
      if (rush) round.rushBands += Math.max(0, Math.ceil((round.h - round.y) / round.bandH));
      var guard = 0;
      while (round) {
        var y0 = round.y, h = Math.min(round.bandH, round.h - y0);
        if (h <= 0) { finishRound(); return; }
        var t0 = now();
        try {
          renderer.drawStatic(cv.getContext('2d'), round.scale, round.rect, { y0: y0, h: h });
        } catch (err) {
          stats.reason = '降档：' + ((err && err.message) || err);
          round = null; snap.ready = false; buildGen++;
          if (ti < tiers.length - 1) { ti++; cv.width = 1; cv.height = 1; scheduleBake(); return; }
          enabled = false; hide(); stats.skipped++; return;
        }
        var ms = now() - t0;
        stats.lastMs = +ms.toFixed(1);
        stats.bandMs = +ms.toFixed(1);
        round.jsSum += ms;
        if (ms > stats.peakMs) stats.peakMs = +ms.toFixed(1);
        stats.bands++;
        clearHandedOff(y0, h);
        round.y = y0 + h; round.i++;
        if (round.y >= round.h) { stats.lastBands = round.n; finishRound(); return; }
        if (!rush) { if (opt.onSwap) opt.onSwap(); return; }   // ⭐ 显式要下一帧（静止时没有下一帧）
        if (++guard > 64) { stats.lastBands = round.n; finishRound(); return; }
      }
    }

    /** 交接：把旧图上「已交出去」的那一块**藏起来**，同时把目标那一代放到同一道边界。
        ⛔ 别改成 clearRect —— 实测「一帧里脏两张显示中的大画布」是本案的杀手：
        p95 4.3 → 29.6ms、平均帧间隔 4.6 → 10ms（假拖动对照，k=1.2）。
        clip-path: inset(...) 是合成器级的裁剪（只改层的裁剪矩形，不脏像素），实测≈免费。
        ⭐ 两条互补的裁剪 = 整个屏幕，所以**全程不需要任何 clear**：
        目标那代的旧墨一直藏在裁剪外，逐条带松开；松到头它就成了完整的新显示层。 */
    function setClip(i, topCss, bottomCss) {
      var el = els[i];
      if (!el) return;
      var v = 'inset(' + Math.max(0, topCss).toFixed(2) + 'px 0px ' + Math.max(0, bottomCss).toFixed(2) + 'px 0px)';
      if (el.__mgClip === v) return;
      el.__mgClip = v;
      el.style.clipPath = v;
      el.style.webkitClipPath = v;
    }
    function hiddenClip(i) { return els[i] ? els[i].height / Math.max(1, last.dpr) : 0; }
    function clearHandedOff(y0, h) {
      var o = round.old;
      var dpr = Math.max(1, last.dpr);
      var k = last.k;
      if (!(k > 0)) return;
      var mT = (k * dpr) / round.scale;
      var syT = Math.round((round.rect.minY * k + last.ty) * dpr);
      var botT = syT + (y0 + h) * mT;                       // 新带底边（屏幕设备像素）
      /* 目标：只松到自己的边界；旧图：从对应边界往下留 */
      setClip(round.target, 0, (round.h - (y0 + h)) / dpr);
      if (o == null || o < 0 || !els[o] || !elRect[o] || !(elScale[o] > 0)) return;
      var mO = (k * dpr) / elScale[o];
      var syO = Math.round((elRect[o].minY * k + last.ty) * dpr);
      var oy = (botT - syO) / mO;
      setClip(o, Math.max(0, oy - 1) / dpr, 0);
    }

    /** 换代：只换元数据（cur / snap）。显示的两张本来就都在显示着。 */
    function finishRound() {
      var r = round;
      round = null;
      var old = r.old;
      var covered = rectCoversView(r.rect);
      snap = { ready: true, rect: r.rect, mode: 'region', scale: r.scale, k: r.k, dpr: r.dpr, rev: ++rev, key: r.key };
      lastKey = r.key;
      cur = r.target;
      /* ⭐ 换代 = 纯裁剪：新显示层整张放开，旧那代整张藏起来（**不清像素**）。
         旧墨留在画布上没关系 —— 下一轮它当目标时先整张藏着，逐条带松开，
         松到哪一条那一条就已经是新画的（旧墨被覆盖掉了）。
         盖不住（快拖把轮甩掉了）⇒ 旧那代保留「从新图边界往下」的裁剪：
         没盖到的那一条继续由它顶着，下面马上会再开一轮。 */
      if (old >= 0 && old !== r.target && els[old]) {
        if (covered) {
          setClip(old, els[old].height / Math.max(1, last.dpr), 0);      // 整张藏起来
        } else {
          var dpr0 = Math.max(1, last.dpr), k0 = last.k;
          var mO0 = (k0 * dpr0) / elScale[old];
          var syO0 = Math.round((elRect[old].minY * k0 + last.ty) * dpr0);
          var syT0 = Math.round((r.rect.minY * k0 + last.ty) * dpr0);
          setClip(old, Math.max(0, (syT0 + r.h * mO0 - syO0) / mO0) / dpr0, 0);
        }
      }
      setClip(r.target, 0, 0);             // 新显示层必须整张可见
      applyTransform();
      stats.bakes++; stats.regionBakes++; stats.rounds++;
      stats.mode = 'region';
      stats.roundMs = +(now() - r.t0).toFixed(1);
      rlog.push({ 带: r.n, tick: r.ticks, 追赶带: r.rushBands, ms: stats.roundMs,
        起松弛: r.slack0, 速度: r.speed0, 终松弛: Math.round(slackOf(r.rect)), 盖住: covered,
        带JS均: +(r.jsSum / Math.max(1, r.ticks)).toFixed(2),
        步ms均: +(r.stepSum / Math.max(1, r.ticks)).toFixed(2),
        间隔均: +(r.gapSum / Math.max(1, r.gapN)).toFixed(2) });
      if (rlog.length > 12) rlog.shift();
      stats.reason = 'ok region ' + r.w + 'x' + r.h + ' @k=' + r.k.toFixed(3)
        + ' 带' + r.n + (covered ? '' : ' ⚠未盖住') + ' tier=' + maxSide();
      if (opt.onSwap) opt.onSwap();     // 换代之后也要至少再来一帧（HUD/标签要跟上）
    }

    /** 用「最后已知的相机」给某一代写 transform（吸附到设备像素网格） */
    function transformOf(i) {
      var r = elRect[i];
      if (!r || !(elScale[i] > 0)) return '';
      var k = last.k, dpr = Math.max(1, last.dpr);
      if (!(k > 0)) return '';
      var sx = Math.round((r.minX * k + last.tx) * dpr) / dpr;
      var sy = Math.round((r.minY * k + last.ty) * dpr) / dpr;
      var m = (k * dpr) / elScale[i];
      return 'translate3d(' + sx.toFixed(3) + 'px,' + sy.toFixed(3) + 'px,0) scale(' + m.toFixed(5) + ')';
    }
    function applyTransform() {
      var out = '';
      for (var i = 0; i < 2; i++) {
        if (!els[i]) continue;
        var tr = transformOf(i);
        if (tr && tr !== elTrans[i]) { elTrans[i] = tr; els[i].style.transform = tr; }
        if (i === cur) out = tr;
      }
      lastTransform = out;
      return out;
    }

    /* 停手之后由定时器来判「该不该重烘」（帧可能已经不来了） */
    function onSettle() { settleTimer = 0; if (settleWanted) scheduleBake(); }

    function scheduleBake() {
      if (pending || snapping) return;
      snapping = true; pending = true;
      global.setTimeout(function () { snapping = false; runBake(); }, 0);
    }

    /** 记相机读数 + 量速度（app 的 tick 与带轮链**共用**，两边都可能先看到新机位）。
        速度用**最近 16 帧的滑动窗口**：speed = 每帧平均位移、speedMax = 单帧最大跳变。
        ⛔ 别写成一阶 EMA + 衰减 —— 拖动是「一帧跳 39px、后面三帧不动」的脉冲串，
        EMA 会把平均位移高估成 2 倍多（实测 20~36 而真值 9.8），门槛与条数全被带偏。 */
    function pushPan(dpx) {
      speedWin.push(dpx); speedSum += dpx;
      if (speedWin.length > 16) speedSum -= speedWin.shift();
      speed = speedSum / speedWin.length;
      speedMax = 0;
      for (var i = 0; i < speedWin.length; i++) if (speedWin[i] > speedMax) speedMax = speedWin[i];
    }
    function syncCam(cam, dpr) {
      dpr = Math.max(1, dpr || 1);
      camRef = cam;
      var k = cam.k;
      var moved = (k !== last.k || cam.tx !== last.tx || cam.ty !== last.ty
        || dpr !== last.dpr || cam.viewW !== last.vw || cam.viewH !== last.vh);
      if (moved) {
        pushPan((Math.abs(cam.tx - last.tx) + Math.abs(cam.ty - last.ty)) * dpr);
        last.k = k; last.tx = cam.tx; last.ty = cam.ty; last.dpr = dpr;
        last.vw = cam.viewW; last.vh = cam.viewH; lastMove = now();
        if (settleTimer) global.clearTimeout(settleTimer);
        settleTimer = global.setTimeout(onSettle, settleMs + 20);
      } else if (speedMax > 0.05) {
        pushPan(0);
      }
      return moved;
    }

    /** 带轮的驱动链：**自己的 rAF，一帧一条带**。
        ⛔ 别退回「由 app 的 tick 驱动」：app 只在 dirty 时画帧，拖动里那点 dirty 几帧才来一次
        ⇒ 每 tick 的位移被放大成几十像素，11 条带的轮跑不过「旧图的余量」⇒ 收尾必追赶
        （= 老那一刀，实测 5~6 条带一次画完 ⇒ 33~70ms 单帧）。链子自己 requestAnimationFrame
        就一定还有下一帧（相机静止时也是），每帧只脏一条带。 */
    function chainStep() {
      chainId = 0;
      if (!round || !camRef) return;
      var t0 = now();
      if (round.lastT) { round.gapSum += t0 - round.lastT; round.gapN++; }
      round.lastT = t0;
      var moved = syncCam(camRef, last.dpr);
      if (moved) applyTransform();          // 机位变了：先落位，交接才按最新位置算
      if (!round) return;
      var late = !rectCoversView(round.rect) || !rectCoversView(snap.rect);
      if (late) stats.rushed++;
      bandStep(late);                       // late ⇒ 剩下的带一次画完（应急）
      if (round) {
        round.stepSum += now() - t0;
        chainId = global.requestAnimationFrame(chainStep);
      }
    }
    function startChain() {
      if (chainId) return;
      chainId = global.requestAnimationFrame(chainStep);
    }

    /** 每帧调一次（在 renderer.draw() 之前）；返回 true = 本帧静态层由位图承担 */
    function tick(cam, dpr, paintKey) {
      if (!els[0]) attach();
      dpr = Math.max(1, dpr || 1);
      var k = cam.k;
      var moved = syncCam(cam, dpr);
      if (!enabled) { hide(); return false; }
      var pick = rectFor(k, cam.tx, cam.ty, dpr, cam.viewW, cam.viewH);
      if (!pick) { hide(); return false; }          // 该档不烘（区域模式未开）⇒ 交实时画，别排队
      if (!snap.ready) { hide(); scheduleBake(); return false; }

      /* 先落位（含带轮的目标那一代）：清旧带要用「它**现在**在屏幕上的位置」 */
      applyTransform();

      var stale = (snap.k !== k) || (snap.dpr !== dpr) || (paintKey != null && snap.key !== paintKey);
      settleWanted = stale;

      if (round) startChain();                      // 带由链子画（见 chainStep）；这里只保证链子在跑

      if (!round) {
        var wantSync = false, wantRound = false;
        /* 尺寸变了（换视口 / 换 dpr）：这一代尺寸不对了，只能同步重来 */
        var sNow = sizeFor(pick.r, k, dpr);
        var sizeChanged = els[cur] && (els[cur].width !== sNow.w || els[cur].height !== sNow.h);
        if (!adequate(k)) {
          stats.emerg++;
          if (slog.length > 8) slog.shift();
          slog.push({ 松弛: Math.round(slackOf(snap.rect)), 速度: Math.round(speed),
            上轮: stats.rounds, 因: '不盖住', 快照k: +snap.k.toFixed(3), k: +k.toFixed(3),
            同k: snap.k === k, 旧图几何盖住: rectCoversView(snap.rect) });
          if (pick.mode === 'region' && rectCoversView(snap.rect)) {
            /* 旧图**几何上还盖得住**视口（典型：世界图放大到区域档 / k 变了）⇒ 开轮是安全的：
               显示层不会露洞，逐条带把旧图换掉即可 —— 没必要吃一根 58ms 的同步全烘。 */
            wantRound = true;
          } else {
            /* 真露洞（旧图矩形都盖不住视口了）：洞比尖峰更难看 ⇒ 当场同步补上。 */
            wantSync = true;
          }
        } else if (sizeChanged || pick.mode !== snap.mode) {
          wantSync = true;                       // 换档/换视口：重分配本来就要挨一刀
        } else if (stale && !moved && (now() - lastMove) > settleMs) {
          /* k / dpr / 绘制输入变了 ⇒ 等停手（settle）再烘，免得手势里反复烘 */
          lastKey = paintKey;
          wantSync = (pick.mode !== 'region');
          wantRound = (pick.mode === 'region');
        } else if (pick.mode === 'region' && snapshotRegion()) {
          /* ⭐ 提前开轮：余量不够轮跑完就别等露洞 */
          var n = bandsFor(sNow.h);
          if (slackOf(snap.rect) < needPx(n)) wantRound = true;
        }
        if (wantSync) runBake();
        else if (wantRound) {
          if (!startRound(pick, k, dpr, paintKey)) runBake();
        }
      }

      /* 显示层：现行那一代必须显示着（两代都常显，这里只是兜底） */
      if (cur >= 0 && els[cur] && els[cur].style.display === 'none') els[cur].style.display = '';
      return true;
    }

    /** 快照是不是区域图（世界图与它尺寸不同；第一轮区域烘必须走同步全烘） */
    function snapshotRegion() { return snap.ready && snap.mode === 'region' && cur >= 0; }

    function hide() {
      for (var i = 0; i < 2; i++) if (els[i] && els[i].style.display !== 'none') els[i].style.display = 'none';
      round = null;
      if (chainId) { global.cancelAnimationFrame(chainId); chainId = 0; }
    }

    return {
      attach: attach, tick: tick, hide: hide,
      bakeNow: function () { scheduleBake(); },
      enable: function (v) { enabled = !!v; if (!enabled) hide(); },
      setRegion: function (v) { regionOn = !!v; snap.ready = false; scheduleBake(); },
      /* 余量旋钮（调参用）：改完下一次重烘生效 */
      setMargin: function (v) { marginPx = Math.max(0, Number(v) || 0); snap.ready = false; scheduleBake(); },
      /* 带高旋钮（调参 / A-B 用）：每条约多少设备像素 */
      setBand: function (v) {
        bandPx = Math.max(48, Math.round(Number(v) || 0) || 224);
        round = null; snap.ready = false; scheduleBake();
      },
      /* 世界图面积预算旋钮（调参/A-B 用）。传 0 或不传 = 退回「只看边长」的老口径 */
      setWorldBudget: function (px, side) {
        worldPxMax = px == null ? 0 : Math.max(0, Number(px) || 0);
        worldSideMax = side == null ? 0 : Math.max(0, Number(side) || 0);
        snap.ready = false; scheduleBake();
      },
      get margin() { return marginPx; },
      get band() { return bandPx; },
      get region() { return regionOn; },
      get enabled() { return enabled; },
      state: function () {
        return {
          enabled: enabled, ready: snap.ready, mode: stats.mode,
          k: +snap.k.toFixed(4), scale: +snap.scale.toFixed(4), rev: snap.rev, region: regionOn,
          bakes: stats.bakes, regionBakes: stats.regionBakes,
          lastMs: stats.lastMs, peakMs: stats.peakMs, swaps: stats.swaps, skipped: stats.skipped,
          fallbackFrames: stats.fallbackFrames,
          reason: stats.reason,
          /* 带轮读数：轮数 / 带数 / 末带ms / 末轮带数 / 末轮墙钟 / 追赶次数 / 分配次数 */
          rounds: stats.rounds, bands: stats.bands, bandMs: stats.bandMs,
          lastBands: stats.lastBands, roundMs: stats.roundMs, rushed: stats.rushed, realloc: stats.realloc,
          bandPx: bandPx, inRound: !!round, live: cur, emerg: stats.emerg, 同步日志: slog, 轮日志: rlog, speed: Math.round(speed),
          worldK: +worldKMax(snap.dpr || last.dpr).toFixed(4), maxSide: maxSide(), tier: ti,
          worldPx: worldPxMax, worldSide: worldSideMax,
          covered: snap.ready ? rectCoversView(snap.rect) : false,
          slack: snap.ready ? Math.round(slackOf(snap.rect)) : null,
          size: snap.ready ? Math.round((snap.rect.maxX - snap.rect.minX) * snap.scale) + 'x'
            + Math.round((snap.rect.maxY - snap.rect.minY) * snap.scale) : '-'
        };
      }
    };
  }

  MG.createWorldBitmap = createWorldBitmap;
})(typeof window !== 'undefined' ? window : globalThis);
