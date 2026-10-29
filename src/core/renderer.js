/* ==========================================================================
   数学星图 · 前景渲染器（节点 / 连线 / 名称）
   --------------------------------------------------------------------------
   三种连线的画法：
     · 推出 implication  —— 黑色箭头，箭头指向被推出的结论；
                            多个前提时先汇聚到一点，再射向结论。
     · 等价 equivalence  —— 黑色直线，无箭头。
     · 定义引用 definition —— 蓝色（不透明度 50%）细线；同一直线上有多条时
                              会弯曲错开，避免糊成一团。
   全部在屏幕坐标里绘制，因此线宽 / 字号 / 箭头大小都可控。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;
  var C = MG.config;
  var T = MG.theme;
  var GU = MG.graphUtil;
  /* 已读脉冲的一圈走多久（毫秒）。慢一点才像「呼吸」，快一点像报错闪。 */
  var READ_PULSE_MS = 1800;

  /* --------------------------------------------------------- 光晕精灵缓存 */
  var glowCache = Object.create(null);
  function glowSprite(color) {
    if (glowCache[color]) return glowCache[color];
    var S = 96;
    var cv = document.createElement('canvas');
    cv.width = cv.height = S;
    var g2 = cv.getContext('2d');
    var rgb = U.hexToRgb(color);
    var g = g2.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.34)');
    g.addColorStop(0.35, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.17)');
    g.addColorStop(0.7, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.04)');
    g.addColorStop(1, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0)');
    g2.fillStyle = g;
    g2.fillRect(0, 0, S, S);
    glowCache[color] = cv;
    return cv;
  }

  /* ------------------------------------------------------------ 文本量缓存 */
  /* ⭐ 键里带**画布显示语言**（MG.displayLang）+ 字体 + 文本本身。
     为什么带语言：同一个节点在 zh 下量「度量空间」、在 en 下量「metric space」，
     字宽完全不同；不带语言的缓存一旦跨语言复用，排出来的标签就会互相压叠。
     换语言时 `MG.localizeDisplay` 还会整体清一次（两条一起才算数）。
     ⚠️ 这是**防回归**（现在换语言走整页重载），不是修 bug。 */
  var textCache = Object.create(null);
  function textCacheKey(text, font) { return (MG.displayLang || 'zh') + '|' + font + '|' + text; }
  function measure(ctx, text, font) {
    var key = textCacheKey(text, font);
    var w = textCache[key];
    if (w == null) {
      var old = ctx.font;
      ctx.font = font;
      w = ctx.measureText(text).width;
      ctx.font = old;
      textCache[key] = w;
    }
    return w;
  }
  /** 换语言后把量过的宽度全部作废（由 MG.localizeDisplay 调用） */
  function clearTextCache() { textCache = Object.create(null); }
  MG.clearTextCache = clearTextCache;
  MG.textCacheSize = function () { return Object.keys(textCache).length; };
  MG.textCacheKey = textCacheKey;

  /* ------------------------------------------------------------ LOD 工具 */
  function smoothstep(e0, e1, x) {
    if (e1 === e0) return x < e0 ? 0 : 1;
    var t = U.clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  /* ------------------------------------------------------ 圆角矩形路径（兼容）
     ⛔ 别写成 `if (ctx.roundRect) ctx.roundRect(..., r)` —— 这个 API 是 2022 才进的规范，
     安卓平板的 Chromium 早期实现**有这个函数、但第 5 个参数只吃 sequence<number>**，
     传数字会抛：
       TypeError: Failed to execute 'roundRect' on 'CanvasRenderingContext2D':
                  The provided value cannot be converted to a sequence
     ⇒ 每帧绘制直接炸掉、页面弹错误框（实测：平板打开就报错，台式机与新手机都正常）。
     所以：先试**数组**形式（规范允许 `[r]` = 四角同值，早期的 sequence-only 实现也吃），
     捕获到异常就永久退回手画 arcTo（处处可用，形状一致）。 */
  var rrNative = -1;                    // -1 未定 / 1 原生 / 0 手画
  function roundPath(ctx, x, y, w, h, r) {
    if (rrNative !== 0) {
      /* ⚠️ 定成「原生可用」之后**每一条也必须包 try**：平板那种实现不是「永远坏」，
         而是「某些参数才抛」。旧写法只在探路那一次捕获，之后一旦抛出来就直接穿到
         调用方 —— 出字函数在离屏层重算里，一抛整帧就废（见 drawAllNames 的事务化）。
         ⇒ 任何时候抛一次就永久退回手画 arcTo（形状一致，慢一点但不会炸）。 */
      if (rrNative === 1) {
        try { ctx.roundRect(x, y, w, h, [r]); return; }
        catch (e) { rrNative = 0; }
      } else if (ctx.roundRect) {
        try { ctx.roundRect(x, y, w, h, [r]); rrNative = 1; return; }
        catch (e) { rrNative = 0; }
      } else { rrNative = 0; }
    }
    var q = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.moveTo(x + q, y);
    ctx.arcTo(x + w, y, x + w, y + h, q);
    ctx.arcTo(x + w, y + h, x, y + h, q);
    ctx.arcTo(x, y + h, x, y, q);
    ctx.arcTo(x, y, x + w, y, q);
    ctx.closePath();
  }

  /* ======================================================================= */
  function createRenderer(canvas, view) {
    var ctx = canvas.getContext('2d');
    var dpr = 1;
    var W = 0, H = 0;
    var geomCache = null;      // 本帧的连线几何
    var nodeCache = Object.create(null);

    /* 本帧各层的可见度（0~1），随缩放变化，由 computeLod() 填 */
    var lodA = {
      galaxyName: 1, clusterName: 1, nodeDot: 1,
      nodeName: 1, trunkName: 0, nodeEdge: 1, clusterLink: 0,
      trunkEdge: 0, trunkDim: 1, envelope: 0, sectorName: 1,
      defDim: 1, tier: 0
    };

    /* ⭐ 尺度档位的**回差**：0 大板块 / 1 领域 / 2 星团 / 3 节点近景。
       为什么需要：临界位置上「上一档还没走、下一档已经来」，两份名字抢同一块屏幕，
       缩放只要抖一下，placeName() 的落位就翻来覆去 —— 看起来就是闪。
       做法：进入下一档要越过边界 ×(1+h)（**晚**），退回上一档要低于 ×(1−h)（**早**），
       死区里档位不动。⛔ 只在这里更新 holdTier，别处只读 lodA.tier。 */
    var holdTier = 0;
    function updateTier(k) {
      var L = C.lod;
      var spec = L.tierBound || [1.03, 2.03, 4.90];
      var h = L.tierHysteresis == null ? 0.05 : L.tierHysteresis;
      var k0 = fitZoom();
      while (holdTier < spec.length && k > spec[holdTier] * k0 * (1 + h)) holdTier++;
      while (holdTier > 0 && k < spec[holdTier - 1] * k0 * (1 - h)) holdTier--;
      return holdTier;
    }

    /* ------------------------------------------------------------------
       LOD 阈值换算（写法见 config.lod 的注释）
         { rel: [a,b] } → 乘以「适配全部」的缩放 k₀
         { px:  [a,b] } → 屏幕上相邻两点的像素距离 ÷ idealDist
       ------------------------------------------------------------------ */
    var fitKCache = 0, fitKKey = '';

    /** 「适配全部」时相机该停在哪 —— 和 cam.fit() 用同一套公式 */
    function fitZoom() {
      var bb = view.graph.bbox();
      /* ⚠️ LOD 的 `{rel:…}` 规格（10 处，含包络 envelopeIn/Out）是按「适配全部」的 k₀ 定的倍数，
         所以这里必须用**视口**尺寸，不能用 W/H —— 烘焙时 W/H 是那张大画布的像素尺寸
         （比如 3312×2056 或 4186×3552），跟视口差一大截 ⇒ 两条路算出的 LOD 完全不是一回事，
         于是「包络在星图里和实拍不一样浓/干脆看不见」。
         判据要用 camNow().viewW/viewH（staticCam 也带这两个字段）。 */
      var c = camNow();
      var vw = c.viewW || W, vh = c.viewH || H;
      /* ⭐ 与 camera.fit() 用**同一块可用矩形**（扣掉左栏 / 底部说明条）。
         以前这里按整个视口算 k₀，而「适配全部」按视口算 ⇒ 两边一致；
         2026-10-17 给相机加了内缩之后，这里必须跟着读 availRect()，
         否则 {rel:…} 的阈值全部和「用户看到的那一档」错位
         （正是 config 注释里那条铁律：同一个量不许在两个文件里各算一遍）。 */
      /* ⛔ 2026-10-19：LOD 基准改用**整个视口**，不再扣 UI 边距。平板图上实测：
         1200×640 的视口被扣掉 330 宽图例 + 2×130 padding 之后 k₀ 掉到 ≈0.04，
         而相机实际停在 0.060 ⇒ r=k/k₀ 被抬到 1.5，全景漏出节点与推出线。
         基准只该回答「内容铺满一屏是多少」，不该跟着 UI 覆盖率漂。 */
      var av = (typeof c.availRect === 'function') ? c.availRect() : { w: vw, h: vh };
      var key = [bb.minX, bb.minY, bb.maxX, bb.maxY, vw, vh, av.w, av.h].join(',');
      if (key === fitKKey) return fitKCache;
      var pad = Math.min(C.camera.fitPadding, Math.min(av.w, av.h) * 0.18);
      var aw = Math.max(40, av.w - pad * 2), ah = Math.max(40, av.h - pad * 2);
      var w = Math.max(1, bb.maxX - bb.minX), h = Math.max(1, bb.maxY - bb.minY);
      fitKCache = U.clamp(Math.min(aw / w, ah / h),
        Math.max(C.camera.minZoom, C.camera.fitMinZoom),
        Math.min(C.camera.maxZoom, C.camera.maxFitZoom));
      fitKKey = key;
      return fitKCache;
    }

    /** 把 config 里的阈值写法换算成绝对 k */
    function thr(spec) {
      if (spec.px) {
        var d = C.layout.idealDist || 120;
        return [spec.px[0] / d, spec.px[1] / d];
      }
      var k0 = fitZoom();
      return [spec.rel[0] * k0, spec.rel[1] * k0];
    }

    function computeLod() {
      /* ⛔⛔ LOD 的判据只有**屏幕上的 CSS 尺度** k（世界单位 → CSS 像素）。
         烘焙时 `camNow().k` 是 `scale = k × min(dpr,2)`（世界单位 → **烘焙画布的设备像素**），
         直接拿它算 LOD 会让高 dpr 设备的静态层整整多走一档：
         平板 dpr=2 实测「适配全部」k=0.0828 ⇒ 实时 r=1.00（nodeDot=0），
         烘焙却按 0.1656 判出 r=2.00（nodeDot=1）⇒ 全景被烘进 910 个圆点 + 一层细线，
         而电脑 dpr=1 时 scale 恰等于 k，所以**只有平板看得出来**。
         ⇒ 烘焙路径由 drawStatic 传进来的 `lodK`（= 真实相机 k）说话；
           几何尺寸（线宽 / 半径 / 裁剪）仍旧用烘焙 scale，两者不能混。 */
      var cL = camNow();
      var k = cL.lodK || cL.k, L = C.lod;
      /* 档位先定（带返回差），三档名字**互斥**：同一时刻只有一档在画。
         曲线本身已经在缝隙里归零，所以档位切换不会出现「啪」的一下。 */
      var tier = updateTier(k);
      lodA.tier = tier;
      var tDot = thr(L.nodeDotIn), tEdge = thr(L.nodeEdgeIn), tName = thr(L.nodeNameIn);
      var tTrunk = thr(L.trunkNameIn), tGal = thr(L.galaxyNameIn);
      var tGalOut = thr(L.galaxyNameOut || { rel: [1.94, 2.005] });
      var tCIn = thr(L.clusterNameIn), tCOut = thr(L.clusterNameOut);
      var tCLink = thr(L.clusterLinkOut);
      var tSec = thr(L.sectorNameIn), tSecOut = thr(L.sectorNameOut);

      lodA.nodeDot = smoothstep(tDot[0], tDot[1], k);
      lodA.nodeName = smoothstep(tName[0], tName[1], k);
      // 主干的名字更早出现：缩小时屏幕上剩下的就是「学习主线」
      lodA.trunkName = smoothstep(tTrunk[0], tTrunk[1], k);
      lodA.nodeEdge = smoothstep(tEdge[0], tEdge[1], k);
      // 主干内部的边：缩小时先于其它连线出现 —— 全图上也看得见「主线」
      var tSpine = thr(L.trunkEdgeIn);
      lodA.trunkEdge = smoothstep(tSpine[0], tSpine[1], k);
      // 全图时把「不在主干上」的点压暗 → 主线才浮得出来（放大后恢复原样）
      var tDim = thr(L.trunkDimIn);
      lodA.trunkDim = 1 - L.trunkDimMax * (1 - smoothstep(tDim[0], tDim[1], k));
      // 星团包络：中等缩放出现，放大后让位
      var tEnvIn = thr(L.envelopeIn), tEnvOut = thr(L.envelopeOut);
      lodA.envelope = smoothstep(tEnvIn[0], tEnvIn[1], k) * (1 - smoothstep(tEnvOut[0], tEnvOut[1], k));
      /* 星团名：放大到看得见节点名时就退场，避免和节点名打架。
         ⚠️ 只有 holdTier ≥ 2（星团档）才画 —— 档位之外一律 0。 */
      var cNameIn = smoothstep(tCIn[0], tCIn[1], k);
      var cNameOut = smoothstep(tCOut[0], tCOut[1], k);
      lodA.clusterName = tier >= 2 ? cNameIn * (1 - cNameOut) : 0;
      /* 领域名：**只在领域档**画（以前它会一直留到 50% 去和星团名抢位置） */
      var galName = smoothstep(tGal[0], tGal[1], k) * (1 - smoothstep(tGalOut[0], tGalOut[1], k));
      lodA.galaxyName = tier === 1 ? galName : 0;
      // 星团级粗线与节点级细线交叉淡入淡出
      lodA.clusterLink = 1 - smoothstep(tCLink[0], tCLink[1], k);
      /* 大板块名：**只有它在最远视角**。档位 0 之外一律不画。 */
      var secName = smoothstep(tSec[0], tSec[1], k) * (1 - smoothstep(tSecOut[0], tSecOut[1], k));
      lodA.sectorName = tier === 0 ? secName : 0;
      /* 全景的一层：**每对板块最多一条很淡的聚合线**（1.00~1.30×k₀），
         放大一档就交给团级聚合线（它们自己按 clusterLinkOut 退场）。 */
      var tSecLink = thr({ rel: [1.00, 1.30] });
      /* 定义引用线在中景降权（见 config.edge.definitionMidScale）：
         两个 draw 路径共用这一个系数 —— 定义线大部分走的是**合并描边**快路径，
         只改 drawEdgeOne 会「改了没效果」（这条坑写在 HANDOVER 里）。 */
      var dIn = thr(L.defDimIn || { rel: [1.05, 1.25] });
      var dOut = thr(L.defDimOut || { rel: [3.80, 4.70] });
      var mid = smoothstep(dIn[0], dIn[1], k) * (1 - smoothstep(dOut[0], dOut[1], k));
      var floor = C.edge.definitionMidScale == null ? 0.60 : C.edge.definitionMidScale;
      lodA.defDim = 1 - (1 - floor) * mid;
      /* ⭐⭐ 2026-10-18 Stage 1b：闸门换 **r = k / kFit**（与缩放尺度无关）。
         绝对 k 会把「适配全部」和「放大到某个 k」混为一谈：世界盒一变，
         同样的 k 就是另一个缩放档，全景反而把节点名全放出来（labelCount=92）。 */
      var kFit0 = 0;
      /* ⛔ 2026-10-19：**不再用缓存的 kFit0**。平板/换屏/横竖屏之后 fitZoom 会变，
         而缓存的旧值会让 r=k/kFit 偏移 —— 表现就是「平板上全图还看得见节点和推出线，
         电脑上却是干净的全景」。fitZoom 只是一次除法，每帧现算不心疼。 */
      kFit0 = (function () { try { return fitZoom(); } catch (e) { return 0; } })();
      var rRel = kFit0 > 0 ? k / kFit0 : 1;
      lodA.rRel = rRel;
      /* ⭐ 2026-10-19：线的「最低可见度」只能是 r 的**一条连续曲线** —— 原来全景顶 0.30、
         中景顶 0.34、近景靠 px 闸门自然满值，三段拼出来就是「蓝→淡→蓝」的台阶。 */
      lodA.edgeFloor = 0.30 + 0.45 * smoothstep(1.20, 2.80, rRel);
      lodA.sectorName = smoothstep(0.20, 0.55, rRel) * (1 - smoothstep(1.30, 1.60, rRel));
      lodA.galaxyName = smoothstep(0.95, 1.02, rRel) * (1 - smoothstep(1.45, 1.85, rRel));
      lodA.clusterName = smoothstep(1.50, 1.70, rRel) * (1 - smoothstep(3.85, 4.80, rRel));
      lodA.nodeName = rRel < 2.8 ? 0 : smoothstep(2.8, 3.0, rRel);
      lodA.trunkName = rRel < 2.4 ? 0 : smoothstep(2.4, 2.6, rRel);
      /* ⭐⭐ 全景档（r<1.35）**不画节点**，只画团块 + 领域色场：1600×900 里铺 910 个点，
         任何布局都会变成均匀纹理（地图不在全览档画每栋楼）。r≥1.35 才淡入节点。 */
      lodA.nodeDot = smoothstep(1.32, 1.42, rRel);
    }

    /* ------------------------------------------------------------ 尺寸 */
    function resize() {
      /* ⛔ 2026-10-19：**高 dpr 设备压到 2.0**。平板实测 dpr 2.5、canvas 3000×1600、
         位图层 3328×2944 —— 每帧要合成 ~980 万像素，小米平板（Adreno 735）实测
         「其余 40.7ms、绘制 16.1ms」，拖动 18fps。像素数按 dpr² 走，2.5→2.0 直接省 36%。
         视觉上 2.0 与 2.5 的差别在 1× 截图里看不出（线条仍有亚像素抗锯齿）。 */
      dpr = Math.min(global.devicePixelRatio || 1, 2.0);
      var rect = canvas.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width || global.innerWidth));
      var h = Math.max(1, Math.round(rect.height || global.innerHeight));
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      W = w; H = h;
      view.cam.setViewport(W, H);
      invalidate();
      return { w: W, h: H, dpr: dpr };
    }

    /* -------------------------------------------------------- 尺寸计算 */
    /** 半径倍率：按「是不是中心天体 / 度数多大」分档。
        分档表在 config.js 的 node.sizeTiers —— 那里写了为什么不再用
        ×1.32 / ×1.22 那种「叠乘」写法（差距太小，看不出层级）。 */
    function sizeMul(node) {
      if (!node) return 1;
      var t = C.node.sizeTiers;
      if (!t) {
        // 没有分档表时的老行为（保底）
        var m = 1;
        if (node.degree >= 5) m *= 1.22; else if (node.degree >= 3) m *= 1.1;
        if (node.isHub) m *= 1.32;
        return m;
      }
      if (node.isHub) return t.hub;
      var d = node.degree || 0;
      for (var i = 0; i < t.byDegree.length; i++) {
        if (d >= t.byDegree[i][0]) return t.byDegree[i][1];
      }
      return 1;
    }

    function nodeRadius(node) {
      var r = C.node.baseRadius * Math.pow(camNow().k, C.node.radiusPower);
      r = U.clamp(r, C.node.minRadius, C.node.maxRadius);
      r *= sizeMul(node);
      // 放大之后也要有上限，否则高缩放下中心天体会顶到邻居
      if (C.node.sizeClamp) r = Math.min(r, C.node.sizeClamp);
      return r;
    }

    function labelFont() {
      var fs = U.clamp(C.node.labelSize * Math.pow(view.cam.k, 0.5), 9.5, 21);
      return fs;
    }

    /* ------------------------------------------------------ 视口裁剪 */
    /*
      ⚠️ 「放大之后反而更卡」的根因就在这里：屏幕上只剩几十个点，每帧却仍为全部
         700 个点、1400 条线算几何、描边、量名字（实测 k=1.6 时屏幕上一个点都没有，
         一帧还要 6.3ms）。下面用裸乘加算屏幕坐标，不为判断分配对象。

      线做的是**保守**裁剪：只有所有端点都落在视口同一侧之外才丢 —— 多前提的推出线
      先汇聚到一点、定义引用线还会外凸（最多 90px），这样判才切不掉真正可见的线。
    */
    var PAD_NODE = 220;      // 点的余量：光晕（r*5.4）+ 名字宽度 + 选中环
    var PAD_EDGE = 140;      // 线的余量：贝塞尔外凸 90 + 箭头 17 + 线宽

    function nodeSX(n) { var c = camNow(); return n.x * c.k + c.tx; }
    function nodeSY(n) { var c = camNow(); return n.y * c.k + c.ty; }

    function inView(x, y, pad) {
      if (cullOff) return true;
      return x > -pad && x < W + pad && y > -pad && y < H + pad;
    }

    /** 屏幕外的点不画 */
    function nodeInView(n, pad) {
      if (cullOff) return true;
      return inView(nodeSX(n), nodeSY(n), pad == null ? PAD_NODE : pad);
    }

    /** 所有端点都在视口同一侧之外 → 这条线肯定看不见（便宜的预筛，见下面的精确判据） */
    function edgeInView(e) {
      if (cullOff) return true;
      var ids = GU.edgeNodes(e);
      if (!ids.length) return false;
      var left = true, right = true, up = true, down = true;
      for (var i = 0; i < ids.length; i++) {
        var n = view.graph.byId[ids[i]];
        if (!n) continue;
        var x = nodeSX(n), y = nodeSY(n);
        if (x > -PAD_EDGE) left = false;
        if (x < W + PAD_EDGE) right = false;
        if (y > -PAD_EDGE) up = false;
        if (y < H + PAD_EDGE) down = false;
        if (!left && !right && !up && !down) return true;   // 有一个端点就在视口里
      }
      return !(left || right || up || down);
    }

    /* ------------------------------------------------------ 连线几何 */
    var geomCam = { k: -1, tx: 0, ty: 0, w: 0, h: 0 };
    var geomList = [];

    /** 线段与（带余量的）视口矩形相交？Liang–Barsky 参数裁剪，O(1)。 */
    function segHitsView(x1, y1, x2, y2) {
      var l = -PAD_EDGE, r = W + PAD_EDGE, t = -PAD_EDGE, b = H + PAD_EDGE;
      var dx = x2 - x1, dy = y2 - y1;
      var p = [-dx, dx, -dy, dy];
      var q = [x1 - l, r - x1, y1 - t, b - y1];
      var t0 = 0, t1 = 1;
      for (var i = 0; i < 4; i++) {
        if (p[i] === 0) { if (q[i] < 0) return false; continue; }
        var rr = q[i] / p[i];
        if (p[i] < 0) { if (rr > t1) return false; if (rr > t0) t0 = rr; }
        else { if (rr < t0) return false; if (rr < t1) t1 = rr; }
      }
      return t0 <= t1;
    }

    /** 画出来的形状碰到视口没有 —— polys 是折线（见 computeEdge），逐段精确判。
        ⚠️ 别用「外框相交」代替：长斜线的外框可以盖住视口而线本身从旁边过去，
        那样会白画一条看不见的线；而**不能**反过来用「两端点都在屏幕外就丢」——
        实测那样在 k=1.44 会把画出来的 175 条砍到 7 条、k=3.0 砍到 0 条
        （屏幕上只剩一堆互不相连的点），把真正横穿画面的线一起丢了。 */
    function polysHitView(polys) {
      for (var i = 0; i < polys.length; i++) {
        var pts = polys[i];
        if (pts.length === 1) {
          if (inView(pts[0].x, pts[0].y, PAD_EDGE)) return true;
          continue;
        }
        for (var j = 1; j < pts.length; j++) {
          if (segHitsView(pts[j - 1].x, pts[j - 1].y, pts[j].x, pts[j].y)) return true;
        }
      }
      return false;
    }

    /* --------------------------------------------------- 平行边让位 */
    /* ⚠️ 2026-10-29 用户报：「Rouché 定理到辐角原理，有黑边和粉边，点不到粉红色边」。
       两条边的端点完全一样 ⇒ 画成同一条线段、命中距离也完全一样，`d < hitD`
       严格小于 ⇒ 永远只有先遍历到的那条能被选中。
       解法：同一对点之间的**直线类边**（单源推出 / 等价 / 类比）按组内序号各弯一点，
       两条都看得见、也都点得中。弓高在世界里是屏幕像素常量 —— 与缩放无关。 */
    function straightPair(e) {
      if (e.kind === 'implication') {
        if (!e.sources || e.sources.length !== 1) return null;   // 多前提要汇聚，不参与让位
        return [e.sources[0], e.target];
      }
      if (e.kind === 'equivalence' || e.kind === 'analogy') return [e.a, e.b];
      return null;                                               // 定义线本来就弯
    }

    /** 每对平行边的偏移量（屏幕像素）；没配对的边不在表里 */
    function bundleOffsets(list) {
      var groups = Object.create(null);
      list.forEach(function (e) {
        var pr = straightPair(e);
        if (!pr) return;
        var k = pr[0] < pr[1] ? pr[0] + '|' + pr[1] : pr[1] + '|' + pr[0];
        (groups[k] = groups[k] || []).push(e);
      });
      var off = Object.create(null);
      var gap = (C.edge && C.edge.bundleGap) || 0;
      if (!gap) return off;
      Object.keys(groups).forEach(function (k) {
        var arr = groups[k];
        if (arr.length < 2) return;
        arr.sort(function (x, y) { return x.id < y.id ? -1 : x.id > y.id ? 1 : 0; });
        arr.forEach(function (e, i) { off[e.id] = (i - (arr.length - 1) / 2) * gap; });
      });
      return off;
    }

    /** 弓形控制点。⚠️ 用「id 小的点 → id 大的点」当基准方向，
        否则反向的那条边（B→A）垂直方向也跟着反 ⇒ 两条弓**折到同一侧**，
        等于没分开（这正是黑/粉两条边的形态：方向相反）。 */
    function bowControl(ax, ay, bx, by, idA, idB, bend) {
      var s = (idA < idB) ? 1 : -1;
      return U.perpControl(ax, ay, bx, by, bend * s);
    }

    function buildGeometry() {
      var cam = view.cam;
      var geom = Object.create(null);
      var list = [];

      /* 先按「节点对」分组，算出每条边该让开多少 —— 必须整体先看一眼才谈得上配对。 */
      var bendOf = bundleOffsets(view.visible);

      view.visible.forEach(function (e) {
        if (!cullOff && !edgeInView(e)) return;            // 便宜的一票否决：整条线都在视口同一侧之外
        var g = computeEdge(e, cam, bendOf[e.id] || 0);
        if (!g || !polysHitView(g.polys)) return;   // 精确判据：画出来的形状碰不到视口就不画
        geom[e.id] = g;
        list.push(g);
      });
      geomCache = geom;
      geomList = list;
      geomCam = { k: cam.k, tx: cam.tx, ty: cam.ty, w: W, h: H };
      return list;
    }

    /** 相机与视口大小都没变 → 复用上一帧的几何（命中检测与重复绘制都走这里） */
    function ensureGeom() {
      var cam = view.cam;
      if (!geomCache || geomCam.k !== cam.k || geomCam.tx !== cam.tx || geomCam.ty !== cam.ty
        || geomCam.w !== W || geomCam.h !== H) {
        return buildGeometry();
      }
      return geomList;
    }

    /* 烘焙专用的一格几何缓存。
       ⭐ 一轮横带切片里**每条带的 (scale, rect, W, H) 完全一样** ⇒ 几何只该建一次；
       而实时层每帧都按自己的相机重建，会把共用缓存冲掉 ⇒ 单独存一格。
       判据用 staticCam（= 烘焙相机）的读数，和 buildGeometry 里那套 key 同源。 */
    var bakeGeom = null, bakeGeomCam = null;
    function ensureGeomBake() {
      var c = staticCam;
      if (bakeGeom && bakeGeomCam && bakeGeomCam.k === c.k && bakeGeomCam.tx === c.tx
        && bakeGeomCam.ty === c.ty && bakeGeomCam.w === W && bakeGeomCam.h === H) {
        return bakeGeom;
      }
      bakeGeom = buildGeometry();
      bakeGeomCam = { k: c.k, tx: c.tx, ty: c.ty, w: W, h: H };
      return bakeGeom;
    }
    function geomForBake() { return staticCam ? ensureGeomBake() : ensureGeom(); }

    /* 世界 → 屏幕。⚠️ 必须走 camNow()：烘焙时 staticCam 覆盖实时相机
       （直接写 view.cam.toScreen 会让烘出来的内容落在「实时屏幕坐标」上 ⇒ 整体平移）。 */
    function w2s(x, y) { var c = camNow(); return { x: x * c.k + c.tx, y: y * c.k + c.ty }; }
    function screenOf(n) { return w2s(n.x, n.y); }

    function trimTo(from, to, r) {
      var dx = to.x - from.x, dy = to.y - from.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      return { x: from.x + (dx / d) * r, y: from.y + (dy / d) * r, ux: dx / d, uy: dy / d, len: d };
    }

    /** 这条线在屏幕上横跨多少像素（取折线外框的长边）—— 长边降权要用 */
    function polySpan(polys) {
      var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (var i = 0; i < polys.length; i++) {
        var pts = polys[i];
        for (var j = 0; j < pts.length; j++) {
          var p = pts[j];
          if (p.x < x0) x0 = p.x;
          if (p.x > x1) x1 = p.x;
          if (p.y < y0) y0 = p.y;
          if (p.y > y1) y1 = p.y;
        }
      }
      if (x0 > x1) return 0;
      return Math.max(x1 - x0, y1 - y0);
    }

    /** 几何对象统一出口（顺便量屏幕跨度） */
    function edgeGeom(e, quads, polys, arrow, glyph, ends) {
      return {
        edge: e, quads: quads, polys: polys, arrow: arrow, glyph: glyph,
        ends: ends, lenPx: polySpan(polys)
      };
    }

    /* ⭐ 长边在屏幕空间降权（2026-10-18）。
       用户：「现在有很多超长线」。一条横穿整个视口的线，放大后既提供不了局部信息，
       又把画面切成碎片；可它也不能直接删（早先试过「两端点都在屏外就丢」，
       k=1.44 时 175 条只剩 7 条，屏幕变成一堆互不相连的点 —— renderer 里那条注释）。
       折中：按**屏幕跨度 ÷ 视口对角线**做 1 → floor 的淡出。
         · 全图适配时所有线都短（世界再大也被缩到一屏）⇒ 骨架照常可见；
         · 放大后同一条线在屏幕上越来越长 ⇒ 自动退到 floor，局部结构才浮得出来。
       ⛔ 选中 / 悬停的边不降权（它在讲「我看的这一条从哪来」。） */
    function edgeFade(g) {
      var F = C.edge.longFade;
      if (!F || F.floor == null || F.floor >= 1) return 1;
      /* 用户主动打开「全部连线」= 他就是想看全，别再替他把长的压掉。 */
      if (C.showAllEdges) return 1;
      var c = camNow();
      /* ⚠️ 用**世界长度**（lenPx / k），不是屏幕长度：屏幕口径会把放大后
         正常的局部关系也压掉（k=1.5 时 500 单位 ≈ 4 条边，屏幕 750px）。 */
      var worldLen = g.lenPx / Math.max(1e-6, c.k || 1);
      var t = (worldLen - F.start) / Math.max(1, F.end - F.start);
      if (t <= 0) return 1;
      if (t > 1) t = 1;
      return 1 - (1 - F.floor) * t;
    }

    /** 线宽随缩放生长的倍率（见 config.edge.widthPow） */
    function edgeWidthMul() {
      var E = C.edge;
      var c = camNow();
      var k = c.k || (E.widthRefK || 0.62);
      return U.clamp(Math.pow(k / (E.widthRefK || 0.62), E.widthPow == null ? 0.45 : E.widthPow),
        1, E.widthMax == null ? 2.6 : E.widthMax);
    }

    function computeEdge(e, cam, bend) {
      var byId = view.graph.byId;
      var quads = [], polys = [], arrow = null, glyph = null, ends = [];
      bend = bend || 0;

      if (e.kind === 'definition') {
        var dn = byId[e.definition], un = byId[e.usedBy];
        if (!dn || !un) return null;
        var A = screenOf(dn), B = screenOf(un);
        var ra = nodeRadius(dn), rb = nodeRadius(un);
        var len = U.dist(A.x, A.y, B.x, B.y);
        if (len < 1) return null;
        var bend = (dn.id < un.id ? 1 : -1) * Math.min(len * C.edge.defCurvature, 90);
        var ctl = U.perpControl(A.x, A.y, B.x, B.y, bend);
        // 按控制点方向把端点缩到圆外
        var a2 = trimTo(A, ctl, ra + 1.5);
        var b2 = trimTo(B, ctl, rb + 1.5);
        var p0 = { x: a2.x, y: a2.y }, p2 = { x: b2.x, y: b2.y };
        quads.push({ p0: p0, p1: ctl, p2: p2 });
        polys.push(U.flattenQuad(p0, ctl, p2, 16));
        ends = [dn.id, un.id];
        return edgeGeom(e, quads, polys, null, null, ends);

      }

      if (e.kind === 'equivalence' || e.kind === 'analogy') {
        var na = byId[e.a], nb = byId[e.b];
        if (!na || !nb) return null;
        var Pa = screenOf(na), Pb = screenOf(nb);
        var r1 = nodeRadius(na), r2 = nodeRadius(nb);
        var q = trimTo(Pa, Pb, r1 + 1.5);
        var w = trimTo(Pb, Pa, r2 + 1.5);
        var mid = null;
        if (bend) {
          /* 平行边让位：控制点按「小 id → 大 id」定向，反向边才不会折到同一侧 */
          var eqMax = U.dist(Pa.x, Pa.y, Pb.x, Pb.y) * ((C.edge && C.edge.bundleBendMax) || 0.14);
          var eqBend = U.clamp(bend, -eqMax, eqMax);
          var eqCtl = bowControl(Pa.x, Pa.y, Pb.x, Pb.y, e.a, e.b, eqBend);
          q = trimTo(Pa, eqCtl, r1 + 1.5);
          w = trimTo(Pb, eqCtl, r2 + 1.5);
          var eqP0 = { x: q.x, y: q.y }, eqP2 = { x: w.x, y: w.y };
          quads.push({ p0: eqP0, p1: eqCtl, p2: eqP2 });
          polys.push(U.flattenQuad(eqP0, eqCtl, eqP2, 16));
          mid = U.quadPoint(eqP0, eqCtl, eqP2, 0.5);
        } else {
          polys.push([{ x: q.x, y: q.y }, { x: w.x, y: w.y }]);
        }
        if (e.kind === 'equivalence') {
          glyph = mid
            ? { x: mid.x, y: mid.y, text: '⟺' }
            : { x: (q.x + w.x) / 2, y: (q.y + w.y) / 2, text: '⟺' };
        }
        ends = [e.a, e.b];
        return edgeGeom(e, quads, polys, null, glyph, ends);
      }

      /* implication */
      var tg = byId[e.target];
      if (!tg) return null;
      var srcs = e.sources.map(function (id) { return byId[id]; }).filter(Boolean);
      if (!srcs.length) return null;
      var Pt = screenOf(tg), rt = nodeRadius(tg);
      var wc = { x: 0, y: 0 };

      if (srcs.length === 1) {
        var s0 = screenOf(srcs[0]);
        var rs0 = nodeRadius(srcs[0]);
        if (bend) {
          /* 平行边让位：先按节点中心拉一条弓，再把两端收到圆周外 */
          var impMax = U.dist(s0.x, s0.y, Pt.x, Pt.y) * ((C.edge && C.edge.bundleBendMax) || 0.14);
          var impBend = U.clamp(bend, -impMax, impMax);
          var ctl = bowControl(s0.x, s0.y, Pt.x, Pt.y, srcs[0].id, tg.id, impBend);
          var b0 = trimTo(s0, ctl, rs0 + 1.5);
          var b2 = trimTo(Pt, ctl, rt + 5);
          var i0 = { x: b0.x, y: b0.y }, i2 = { x: b2.x, y: b2.y };
          quads.push({ p0: i0, p1: ctl, p2: i2 });
          polys.push(U.flattenQuad(i0, ctl, i2, 16));
          /* 箭头方向取**曲线在终点处的切线**（从控制点指向终点），不然会歪 */
          arrow = { x: i2.x, y: i2.y, angle: Math.atan2(-(i2.y - ctl.y), -(i2.x - ctl.x)) };
          ends = [srcs[0].id, tg.id];
        } else {
          var dir = trimTo(Pt, s0, rt + 5);              // 从目标朝源方向退开
          var back = trimTo(s0, Pt, rs0 + 1.5);
          polys.push([{ x: back.x, y: back.y }, { x: dir.x, y: dir.y }]);
          arrow = { x: dir.x, y: dir.y, angle: Math.atan2(-dir.uy, -dir.ux) };
          ends = [srcs[0].id, tg.id];
        }
      } else {
        // 多前提：先汇聚到一点，再射向结论
        srcs.forEach(function (s) { var p = screenOf(s); wc.x += p.x; wc.y += p.y; });
        wc.x /= srcs.length; wc.y /= srcs.length;
        var ddx = wc.x - Pt.x, ddy = wc.y - Pt.y;
        var dl = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
        var off = Math.min(C.edge.mergeOffset * camNow().k, dl * 0.45);
        var J = { x: Pt.x + (ddx / dl) * off, y: Pt.y + (ddy / dl) * off };
        srcs.forEach(function (s) {
          var Ps = screenOf(s), rsp = nodeRadius(s);
          var st = trimTo(Ps, J, rsp + 1.5);
          var en = trimTo(J, Ps, 7);
          polys.push([{ x: st.x, y: st.y }, { x: en.x, y: en.y }]);
          ends.push(s.id);
        });
        var tip = trimTo(Pt, J, rt + 5);
        polys.push([{ x: J.x, y: J.y }, { x: tip.x, y: tip.y }]);
        arrow = { x: tip.x, y: tip.y, angle: Math.atan2(-tip.uy, -tip.ux) };
        ends.push(tg.id);
      }
      return edgeGeom(e, quads, polys, arrow, null, ends);
    }

    /* -------------------------------------------------------- 可见性权重 */
    /** 返回 0~1：聚焦模式下不相关的节点/边会被压暗 */
    function dimNode() { return C.focus.hideUnrelated ? 0 : C.focus.dimNodeAlpha; }
    function dimEdge() { return C.focus.hideUnrelated ? 0 : C.focus.dimEdgeAlpha; }

    /** 用户在左下角的「显示节点」面板里藏起来的点，一律不画 */
    function nodeOk(id) { return !view.isNodeVisible || view.isNodeVisible(id); }

    /** 这一组里还有几颗星看得见（全藏光的星系/星团连名字都不出） */
    function visibleIn(list) {
      var c = 0;
      for (var i = 0; i < list.length; i++) if (nodeOk(list[i].id)) c++;
      return c;
    }

    function regionHasVisible(rid) {
      var ns = view.graph.nodes;
      for (var i = 0; i < ns.length; i++) {
        if (ns[i].regions.indexOf(rid) >= 0 && nodeOk(ns[i].id)) return true;
      }
      return false;
    }

    function alphaForNode(id) {
      var f = view.focus;
      if (!f) return 1;
      if (f.type === 'node') return (id === f.id || isNeighbor(id, f.id)) ? 1 : dimNode();
      if (f.type === 'edge') {
        var e = edgeById(f.id);
        return (e && GU.edgeNodes(e).indexOf(id) >= 0) ? 1 : dimNode();
      }
      return 1;
    }

    function alphaForEdge(e) {
      var f = view.focus;
      if (!f) return 1;
      if (f.type === 'node') return GU.edgeNodes(e).indexOf(f.id) >= 0 ? 1 : dimEdge();
      if (f.type === 'edge') return e.id === f.id ? 1 : dimEdge();
      return 1;
    }

    function isNeighbor(id, of) {
      var adj = view.graph.adj[of];
      return !!adj && adj.indexOf(id) >= 0;
    }

    /* ------------------------------------------------- Phase A：静态烘焙用 */
    /* 烘焙时必须让「屏幕上才有的量」按**烘焙那个 k** 算，而绘制目标又是另一张画布。
       所以：staticCam 覆盖相机读数、cullOff 关掉视口裁剪、staticHidden 让实时层
       把静态部分让给位图图层（标签/hover 仍实时画）。⛔ 只在 drawStatic 的同步区间里置位。 */
    var staticCam = null, cullOff = false, staticHidden = false, glowLive = false, envLive = false, hoverFull = false;
    /* 低频汇总用：只累加 performance.now 的差值，⛔ 绝不引入 flush/readback。
       ⭐ labels = 标签**绘制耗时**（ms，低频汇总口径，不是条数）；
          labelCount = 这一帧真的画上去的标签**条数**（板块名+领域名+团名+节点名，
                       回放出来的也算）；labelReplay = 其中**回放**出来的条数；
          labelRecalc = 这一帧是**重算**（1）还是回放（0）。三者在 profReset 里一起清。
          ⚠️ 早先的报告把 labels(ms) 当成「条数」过 —— 所以这两个字段名字必须分开写清楚。
          ⛔ 节点名的**每帧预算**数的是 drawLabels 里的局部计数器（本帧落笔几条），
             不拿 labelCount 比：它是跨帧累加的 HUD 口径，而且把结构性名字也算进去了。 */
    var prof = { edges: 0, nodes: 0, labels: 0, labelCount: 0, labelReplay: 0, labelRecalc: 0, frames: 0 };
    /* 标签分项（**只描述最近一次重算**，回放帧不动它）—— 用来回答
       「为什么这个节点的名字没画出来」，不要再靠猜：
         structural = 这一趟里板块/领域/星团名 + 特殊标签先画掉几条；
         budget     = 本帧节点名预算（nodeNameBudget() 算出来的那个数）；
         cand       = 通过全部闸门（可见 / 不透明度 / 档位门槛 / 屏幕内）的节点数 = 候选；
         drawn      = 真正落笔的节点名条数；
         cut*       = 被各条闸门各自掐掉多少（互不重叠，一个节点只记第一个拦它的闸门）。 */
    var labelStat = { budget: 0, structural: 0, cand: 0, drawn: 0,
      cutBudget: 0, cutAvoid: 0, cutTier: 0, cutOff: 0, cutAlpha: 0, cutHidden: 0, cutSpecial: 0 };
    /* 逐节点账本（探针用）：setLabelTrace(true) 之后，最近一次重算里每个节点落一条记录。
       记录 = { why, ...读数 }：
         why      —— 原因码，与每次闸门一一对应：
                     `drawn` 画了 / `budget` 预算 / `avoid` 被占位挤掉 /
                     `off` 屏幕外（offscreen）/ `tier` 档位门槛（threshold）/
                     `fade` 名字整体还没到出现的时候 / `dim` 被选中项压暗 /
                     `hidden` 被用户在面板里藏了 / `special` 由特殊标签接管
         ord      —— 在**排序后**的队列里的下标（0 = 最先落笔，越小越该赢）
         cand     —— 通过全部闸门后它是第几个候选（1-based；没进候选 = 0）
         prio     —— labelPriority 的值
         on       —— 排序第一关键字：1 = 节点中心严格在屏内
         x, y     —— 节点屏幕坐标；nx, ny = 名字框左上角
         alpha    —— alphaForNode()
         box      —— 名字框 { x0,y0,x1,y1 }（算出框之后才有）
         blocker  —— **只有 avoid 才有**：撞上它的那个框
                     { id, kind, rank, x0,y0,x1,y1 }（kind = node / special / sector / galaxy / cluster）
         nodeDrawn / budget —— 只有 budget 才有：掐它时本帧已经画了几条 / 预算是多少
       ⛔ 默认关 —— 关着的时候连这个对象都不分配。 */
    var labelTraceOn = false, labelTraceMap = null;
    function camNow() { return staticCam || view.cam; }
    function setStaticHidden(v) { staticHidden = !!v; }
    function bbox() { return view.graph.bbox(); }
    /** 这条边的两端是不是都在主干上（= 学习主线的骨架）。结果缓存在边上。 */
    function isSpine(e) {
      if (e._spine == null) {
        var ok = !GU.isWeak(e) && GU.edgeNodes(e).length > 0;
        if (ok) {
          GU.edgeNodes(e).forEach(function (id) {
            var n = view.graph.byId[id];
            if (!n || !n.trunk) ok = false;
          });
        }
        e._spine = ok;
      }
      return e._spine;
    }

    function edgeById(id) {
      for (var i = 0; i < view.visible.length; i++) if (view.visible[i].id === id) return view.visible[i];
      return null;
    }

    /** 边的**线色**（只换颜色，别的什么都不换）。
        ⭐ 推论边（`layer:false` 的 implication，见 GU.isDerived）= 粉红。
           ⛔ 不算虚线：虚线在本图里是「类比（弱边）」的语义。
           ⛔ 宽度 / 箭头 / 曲线都不在这里 —— 它们和普通推出走同一条代码路径，
              「与普通推出一致」是由这个事实保证的，不是由抄一个数保证的。 */
    function edgeColor(e) {
      var D = T.derivedEdge;
      if (GU.isDerived(e) && D && D.color) return D.color;
      var st = T.edgeStyles[e.kind] || {};
      return st.color;
    }

    /* ============================================================ 绘制 */
    /* 本帧已被「星系名 / 装置名」占掉的矩形 —— 节点名不许压上去 */
    var nameBoxes = [];
    /* 本帧**预留**给特殊标签（选中 → 悬停 → 搜索命中）的位置。
       ⚠️ 它们必须在板块 / 领域 / 星团名**之前**占位，否则「我刚搜到的那个点」
          名字会被大标题挤掉 —— 见 reserveSpecialLabels()。 */
    var reservedLabels = [];

    /* ---------- 静态层（可烘）：包络 → 星团连线 → 边 → 节点 → 箭头 ---------- */
    function paintStatic(geoms) {
      var tE = performance.now();
      if (edgeTraceOn) edgeTraceMap = Object.create(null);   // 诊断账本按帧清空，别读上一机位的旧记录
      if (!envLive) drawEnvelopes();       // 位图模式：包络交给实时层（见 paintDynamic）

      var defs = [], eqs = [], imps = [], anas = [];
      geoms.forEach(function (g) {
        if (g.edge.kind === 'definition') defs.push(g);
        else if (g.edge.kind === 'equivalence') eqs.push(g);
        else if (g.edge.kind === 'analogy') anas.push(g);
        else imps.push(g);
      });

      drawEdges(anas);          // 弱边垫在最底下（平时几乎看不见）
      drawEdges(defs);
      drawEdges(eqs);
      drawEdges(imps);
      geoms.forEach(function (g) { if (g.arrow) drawArrow(g); });
      prof.edges += performance.now() - tE;

      var tN = performance.now();
      if (lodA.nodeDot > 0.02) {
        view.graph.nodes.forEach(function (n) { drawNode(n); });
      }
      prof.nodes += performance.now() - tN;
    }

    /* ---------- 动态层（必须实时）：光晕 → 名称 → hover 叠加 ---------- */
    function paintDynamic() {
      if (glowLive) drawGlows();
      /* ⭐ 包络和光晕一样**不进烘焙**：烘焙图里的 LOD/叠加顺序与实时画对不上
         （实测同机位位图路 vs 实画路差 5.6% 像素、集中在各团的软色区）。
         放在名字/标签**之前**画，免得色块压住字。 */
      if (envLive) drawEnvelopes();
      /* ⭐ 标签避让的优先级在这里就定死：**选中项 → 悬停 → 搜索命中**先占位，
         然后才是「当前尺度的主要名称」（板块 / 领域 / 星团），最后是普通节点名。
         ⛔ 放不下就隐藏低优先级，不缩字号、不降对比度（用户 2026-10-17 拍板）。 */
      if (C.showLabels) reserveSpecialLabels();
      /* ⭐ 四类名字只走这一个入口（板块 → 领域 → 星团 → 节点，顺序即避让优先级）。
         ⛔ 别在这里再单独调那四个函数 —— 一帧调两次会让「记录/回放」记双份。 */
      drawAllNames();
      drawHoverOverlay();
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      var geoms = ensureGeom();     // ⚠️ 照常建几何：命中测试（hitTest）依赖它
      computeLod();
      nameBoxes.length = 0;
      reservedLabels.length = 0;

      if (!staticHidden) paintStatic(geoms);   // 位图模式：静态层交给 DOM 图层

      var t1 = performance.now();
      paintDynamic();
      prof.labels += performance.now() - t1;
      prof.frames++;
    }

    /* ================================================ 烘焙入口（Phase A）
       把「除标签与 hover 之外的一切」按给定比例画进 target：
         · 不做视口裁剪（cullOff）· 不含标签 · 不含 hover 态 · 不含光晕（光晕实时画）
         · 相机走 staticCam ⇒ 线宽/曲率上限/LOD alpha/spineOnly/节点半径全部按 scale 算
           ⇒ 显示时 1:1（m = k/k_bake）⇒ 纯平移下与实时画一致
       ⛔ 这是引擎入口：不认识任何内容模块，也不写任何文件/网络。

       band（可选，{y0, h}）：**只烘这一条横带**（整数设备像素，带与带不重叠）。
         给了它：不清整张画布（只清这条带），并把绘制硬裁到这条带里，画完复原。
         ⇒ 若干条的并集**逐像素等于**整张烘出来的图（每像素只画一次，半透明内容不会被叠两次）；
         ⇒ 屏幕上每次只脏一条带 ⇒ 「整张重新光栅化」那笔钱按带分帧摊掉
            （实测 k=1.2、3312×2056 的画布：整张 46~58ms/帧 → 1/10 带 ≤1 个时隙）。
         ⛔ y0 与 y0+h 必须是整数：小数的裁剪边会被抗锯齿，带与带之间就会出现接缝。
         ⚠️ 清空写在裁剪**里面**：调用方不必管清底，也不会误清掉别的带。 */
    function drawStatic(target, scale, rect, band, lodK) {
      var save = { ctx: ctx, W: W, H: H, dpr: dpr, cam: staticCam, cull: cullOff,
        hover: view.hover, labels: C.showLabels, glow: C.node.glow,
        glowSel: C.node.glowSelected, glowLiveV: glowLive };
      ctx = target;
      W = target.canvas.width; H = target.canvas.height; dpr = 1;
      /* ⚠️ staticCam 必须是「够用的相机」：凡是用 camNow() 的地方都会拿到它，
         所以要带上 toScreen（traceEnvelope 用）。以前这里没有它、而 drawEnvelopes
         传的是 view.cam（实时相机）⇒ 烘焙里的包络一直按实时机位画，是错的。 */
      /* ⚠️ viewW/viewH 必须是**视口**尺寸（不是画布尺寸 W/H）——fitZoom() 靠它算
         「适配全部」的 k₀，而 LOD 的 {rel:…} 规格（10 处）是 k₀ 的倍数。
         填成画布尺寸 ⇒ 烘焙的 LOD 与实时画完全对不上（表现：包络等软色层浓度不对/看不见）。
         裁剪用的是 W/H 全局量，与这里无关，所以两种口径不会打架。 */
      staticCam = {
        k: scale, tx: -rect.minX * scale, ty: -rect.minY * scale,
        /* ⭐ 烘焙的 LOD 必须按**真实相机 k** 判，不能按 scale（= k×dpr）——
           见 computeLod 开头那段。缺省（老调用方只传四个参数）退回 scale。 */
        lodK: (lodK > 0 ? lodK : scale),
        viewW: view.cam.viewW, viewH: view.cam.viewH,
        /* ⚠️ fitZoom() 现在按「可用矩形」算 k₀（与 camera.fit 同一套）。
           烘焙时相机是这张假对象，所以必须把同一个 availRect 递过去 ——
           漏了就会退回「整个视口」口径，烘出来的 LOD 和实时画对不上。 */
        availRect: function () { return view.cam.availRect(); },
        toScreen: function (x, y) { return { x: x * this.k + this.tx, y: y * this.k + this.ty }; }
      };
      /* ⭐ cullOff = false：**按烘焙画布裁剪**。
         以前开着 cullOff（不裁），于是把整个世界的指令都记进这张画布 —— 矩形外的部分
         白记白画（区域模式 3312×2056 只有一小块用得上）。这正是「越界重烘」那根
         50~145ms 尖峰里的大头。
         安全性：裁剪判据全部走 `camNow()`（此处 = staticCam）与 W/H（此处 = 画布尺寸），
         和实时画同一套；PAD_NODE/PAD_EDGE 余量也在 ⇒ 与「不裁」逐像素一致。 */
      cullOff = false;
      view.hover = null;                    // hover 不进烘焙
      C.showLabels = false;                 // 标签不进烘焙
      C.node.glow = false;                  // 光晕实时画（实测 ≈0.05ms）
      /* ⚠️ 选中光圈也要在这里关掉：烘焙时 view.focus 不清空，若只关普通光晕，
         选中的那颗点会把光晕**烘进静态图**里，取消选中后还留在画布上。 */
      C.node.glowSelected = false;
      var clipped = false;
      /* ⛔⛔ 这一段**必须** try/finally：这里换掉了 7 个模块级量（ctx / W / H / dpr /
         staticCam / cullOff / C.showLabels / glowLive）。以前没有 finally，
         只要 paintStatic 抛一次（平板 roundRect、显存不足、渐变失败……），
         整个渲染器就永久停在「烘焙态」：draw() 于是把内容画进位图画布、且 C.showLabels
         被永久置 false ⇒ **节点和线照旧，文字整块没有**。这就是「标签时有时无」的一类死法。 */
      try {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (band && band.h > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, band.y0, W, band.h);
          ctx.clip();
          ctx.clearRect(0, band.y0, W, band.h);
          clipped = true;
        } else {
          ctx.clearRect(0, 0, W, H);
        }
        /* ⛔ 单位变换：staticCam 已把世界坐标换算成烘焙画布像素（k=scale、tx=-minX*scale），
           再叠一次 setTransform(scale,…) 会把内容又乘一个 k_bake —— 实测烘出来的线只占画布 48%×48%。 */
        geomCache = null; geomCam = { k: -1, tx: 0, ty: 0, w: 0, h: 0 };
        computeLod();
        nameBoxes.length = 0;
        reservedLabels.length = 0;
        paintStatic(geomForBake());
      } finally {
        if (clipped) ctx.restore();       // ⛔ 必须在切回实时 ctx 之前 restore
        ctx = save.ctx; W = save.W; H = save.H; dpr = save.dpr;
        staticCam = save.cam; cullOff = save.cull;
        view.hover = save.hover; C.showLabels = save.labels; C.node.glow = save.glow;
        C.node.glowSelected = save.glowSel; glowLive = save.glowLiveV;
        geomCache = null; geomCam = { k: -1, tx: 0, ty: 0, w: 0, h: 0 };   // 实时层下一帧重建
      }
    }

    /* 光晕实时画（烘焙集里没有它）：与 drawNode 里那段逐字一致，只是独立成一遍 */
    function drawGlows() {
      if (!C.node.glow && !C.node.glowSelected) return;
      view.graph.nodes.forEach(function (n) {
        if (!nodeOk(n.id) || !nodeInView(n)) return;
        var p = screenOf(n), r = nodeRadius(n);
        var a = alphaForNode(n.id) * lodA.nodeDot * (isTrunk(n) ? 1 : lodA.trunkDim);
        if (a <= 0.02) return;
        var isFocus = view.focus && view.focus.type === 'node' && view.focus.id === n.id;
        var isHover = (view.hover && view.hover.type === 'node' && view.hover.id === n.id) ||
          (view.hover && view.hover.type === 'edge' && edgeById(view.hover.id) &&
            GU.edgeNodes(edgeById(view.hover.id)).indexOf(n.id) >= 0);
        /* ⭐ 普通光晕关掉了也要把选中 / 悬停的那几颗画出来（光圈是「我在看它」的记号，
           不该被「少点光晕」这个审美开关一起关掉）。 */
        var emph = isFocus || isHover;
        if (!emph && !C.node.glow) return;
        var gs = glowSprite(MG.typeStyle(n.type).color);
        var gsz = r * 5.4;
        ctx.globalAlpha = a * (emph ? 1 :
          (C.node.glowNormalAlpha == null ? 0.72 : C.node.glowNormalAlpha));
        ctx.drawImage(gs, p.x - gsz / 2, p.y - gsz / 2, gsz, gsz);
        ctx.globalAlpha = 1;
      });
    }

    /* hover 叠加层。
       乙支（默认）= 只画节点外环：完全落在烘焙节点之外，纯叠加 ⇒ 精确。
       甲支（hoverFull=true）= 再把「入射边加宽 ×1.85 + 箭头 ×1.2」用 **destination-over**
       叠上去 —— 它只在「烘焙图没有墨的地方」落笔，于是：
         · 原来的 1.15px 芯原封不动（alpha 不变）✓
         · 两侧各多出 ~0.49px 的晕，alpha 正确 ✓
       剩下的偏差（实测）：芯里 α 0.19→0.34、α 0.5→0.75（= α(1−α)，0.6% 的像素）、
       以及交叉处 z-order 微差（max 37/255，1% 像素）。这些是**已知且待用户拍板**的偏差。 */
    /* ------------------------------- 已读标记（**独立的脉冲层**，不在主画布上） */
    /*
       ⭐ 用户要的是「标记过之后节点周围绕一圈绿的、**动**的圈圈」——
          原来那个静态环太不显眼，不点进去根本看不出读没读。
       ⛔ 但动画**绝不能画进主画布**：动画 = 每帧重画，而主画布每帧要重画
          连线 / 节点 / 标签（实测 4~7ms，而本机是 240Hz 屏、每帧预算 4.2ms）。
          所以单开一层 canvas（`#layer-read`），每帧只 clearRect + 几十个 arc。

       ⭐ 这一层由 **app 自己的 rAF** 驱动，而且**一个可见的已读节点都没有时就停**
          （空闲零开销）。返回值就是给调用方做这个判断用的：
          `run() === 0` ⇒ 下一帧不用再排了。

       ⚠️ 引擎不认识「已读」是什么：只问 `view.isNodeRead` / `view.showReadMarks`。
          钩子没装（导出器复用渲染器时就是）⇒ 什么都不画。
       ⚠️ 无论画不画，**先清干净** —— 否则关掉开关之后会留一屏退不掉的旧环。
       @param octx  #layer-read 的 2d context
       @param tMs   performance.now()，用来算脉冲相位
       @returns     画了几个环；0 = 可以停机
    */
    function drawReadRings(octx, tMs) {
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.clearRect(0, 0, W, H);
      if (!view.isNodeRead || !view.showReadMarks) return 0;
      if (!view.showReadMarks()) return 0;
      var pulse = (tMs % READ_PULSE_MS) / READ_PULSE_MS;      // 0 → 1
      var list = view.graph.nodes, drawn = 0;
      for (var i = 0; i < list.length; i++) {
        var n = list[i];
        if (!view.isNodeRead(n.id)) continue;
        if (!nodeOk(n.id)) continue;
        var p = screenOf(n);
        var r = nodeRadius(n);
        if (!inView(p.x, p.y, r + 16)) continue;
        var a = alphaForNode(n.id) * lodA.nodeDot * (isTrunk(n) ? 1 : lodA.trunkDim);
        if (a <= 0.03) continue;            // 太淡就不画，免得糊成一片噪点
        drawn++;
        /* 三笔，都是为了「不点进去也一眼看得出读没读」：
           ① 常驻基环 —— 标记本身
           ②③ 两圈错开半个周期的扩散环 —— 每隔半周期就有一圈在往外走，
               所以任何时刻看着都是「活的」，不会有一瞬间像静止的 */
        octx.beginPath();
        octx.arc(p.x, p.y, r + 3.1, 0, Math.PI * 2);
        octx.lineWidth = 2.1;
        octx.strokeStyle = U.rgba('#2E9E5B', 0.88 * a);
        octx.stroke();
        for (var w = 0; w < 2; w++) {
          var ph = (pulse + w * 0.5) % 1;
          var fd = (1 - ph) * (1 - ph);
          octx.beginPath();
          octx.arc(p.x, p.y, r + 3.1 + ph * 11, 0, Math.PI * 2);
          octx.lineWidth = 1.8;
          octx.strokeStyle = U.rgba('#2E9E5B', 0.9 * fd * a);
          octx.stroke();
        }
      }
      return drawn;
    }

    function drawHoverOverlay() {
      var hv = view.hover;
      if (!hv || hv.type !== 'node') return;
      var n = view.graph.byId[hv.id];
      if (!n || !nodeOk(n.id)) return;
      var p = screenOf(n), r = nodeRadius(n);
      var a = alphaForNode(n.id) * lodA.nodeDot * (isTrunk(n) ? 1 : lodA.trunkDim);
      if (a <= 0.02) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 5.5, 0, Math.PI * 2);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = U.rgba(MG.typeStyle(n.type).color, 0.55 * a);
      ctx.stroke();
      if (!hoverFull || !geomCache) return;
      /* 甲支：入射边加宽 + 箭头变大，destination-over ⇒ 只补「新增的那一圈」 */
      var list = Object.keys(geomCache);
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      for (var i = 0; i < list.length; i++) {
        var g = geomCache[list[i]];
        if (!g || !isEdgeActive(g)) continue;
        drawEdgeOne(g);
        if (g.arrow) drawArrow(g);
      }
      ctx.restore();
    }

    /* ------------------------------------------------ 大板块名（最远视角） */
    /* 板块落在哪：**成员领域 stat 重心的加权平均**（按节点数加权）。 */
    function sectorAnchor(s) {
      var wsum = 0, x = 0, y = 0;
      (s.regions || []).forEach(function (r) {
        if (!r.stat) return;
        var w = Math.max(1, r.stat.count);
        wsum += w; x += r.stat.cx * w; y += r.stat.cy * w;
      });
      if (!wsum) return null;
      return { x: x / wsum, y: y / wsum };
    }

    function drawSectorNames() {
      var a = lodA.sectorName;
      var fs = U.clamp(26 * Math.pow(view.cam.k, 0.12), 17, 34);
      ctx.save();
      ctx.font = '800 ' + fs.toFixed(1) + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      (view.graph.sectors || []).forEach(function (s) {
        if (s.empty || !s.regions.length) return;          // 空板块不占画面
        var c = sectorAnchor(s);
        if (!c) return;
        var p = w2s(c.x, c.y);
        if (p.x < -400 || p.x > W + 400 || p.y < -300 || p.y > H + 300) return;
        var text = s.nameShow || s.name;
        var tw = measure(ctx, text, ctx.font);   // 缓存键含 displayLang ⇒ 中英分别量
        var ls = fs * 0.22;
        var bw = tw + ls * (text.length - 1) + 40, bh = fs + 22;
        // rank 2 = 当前尺度主名；放不下就**不画**（不缩字号、不叠到别人身上）
        var slot = placeName(p.x, p.y, bw, bh, 2);
        if (!slot) return;
        var cy = slot.y;
        ctx.globalAlpha = a;
        ctx.fillStyle = 'rgba(255,255,255,0.94)';
        ctx.beginPath();
        roundPath(ctx, p.x - bw / 2, cy - bh / 2, bw, bh, bh / 2);
        ctx.fill();
        ctx.strokeStyle = U.rgba(s.color, 0.85);
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // 手动加字距（和领域名同一手感，但更粗、更有颜色）
        var chars = text.split('');
        var total = tw + ls * (chars.length - 1);
        var cx = p.x - total / 2;
        ctx.fillStyle = U.rgba(s.color, 0.96);
        ctx.textAlign = 'left';
        chars.forEach(function (ch) {
          ctx.fillText(ch, cx, cy + 1);
          cx += ctx.measureText(ch).width + ls;
        });
        ctx.textAlign = 'center';
        ctx.globalAlpha = 1;
        prof.labelCount++;                  // 大板块名也算一个「画上去的标签」
        /* pad = 给**节点名**留的禁入边距（见 drawLabels 里 placed 的膨胀）。
           板块名是最大的字，离它太近的节点名会把它读成一团。 */
        nameBoxes.push({ x0: p.x - bw / 2, y0: cy - bh / 2, x1: p.x + bw / 2, y1: cy + bh / 2, rank: 2, pad: 10,
          kind: 'sector', id: s.id || '' });
      });
      ctx.restore();
    }

    /* ------------------------------------------------ 星系名 */
    function drawGalaxyNames() {
      var a = lodA.galaxyName;
      var fs = U.clamp(15 * Math.pow(view.cam.k, 0.30), 13, 34);
      ctx.save();
      ctx.font = '700 ' + fs.toFixed(1) + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      (view.graph.regions || []).forEach(function (r) {
        if (!r.stat || !r.name) return;
        // 整个星系的点都被藏起来了 → 只剩云雾，名字也不必出
        if (view.isNodeVisible && !regionHasVisible(r.id)) return;
        var p = w2s(r.stat.nameX != null ? r.stat.nameX : r.stat.cx,
                   r.stat.nameY != null ? r.stat.nameY : r.stat.cy);
        if (p.x < -300 || p.x > W + 300 || p.y < -200 || p.y > H + 200) return;
        /* ⭐ T2.4 收尾：画布上的名字也要跟语言走。`nameShow` 是**启动时算一次**的
           （见 src/core/i18n.js 的 MG.localizeDisplay）—— ⛔ 不在每帧里查表。 */
        var text = r.nameShow || r.name;
        var tw = measure(ctx, text, ctx.font);
        var ls = fs * 0.18;
        var bw = tw + ls * (text.length - 1) + 26, bh = fs + 14;
        // rank 2 = 当前尺度主名；放不下就不画（优先保选中 / 搜索命中的标签）
        var slot = placeName(p.x, p.y, bw, bh, 2);
        if (!slot) return;
        var cy = slot.y;
        ctx.globalAlpha = a;
        ctx.fillStyle = 'rgba(255,255,255,0.86)';
        ctx.beginPath();
        roundPath(ctx, p.x - bw / 2, cy - bh / 2, bw, bh, bh / 2);        ctx.fill();
        ctx.strokeStyle = U.rgba(r.color, 0.55);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // 手动加字距
        var chars = text.split('');
        var total = tw + ls * (chars.length - 1);
        var cx = p.x - total / 2;
        ctx.fillStyle = 'rgba(26,28,34,0.92)';
        ctx.textAlign = 'left';
        chars.forEach(function (ch) {
          ctx.fillText(ch, cx, cy + 0.5);
          cx += ctx.measureText(ch).width + ls;
        });
        ctx.textAlign = 'center';
        ctx.globalAlpha = 1;
        prof.labelCount++;                  // 星系名算一个「画上去的标签」
        nameBoxes.push({ x0: p.x - bw / 2, y0: cy - bh / 2, x1: p.x + bw / 2, y1: cy + bh / 2, rank: 2, pad: 8,
          kind: 'galaxy', id: r.id || '' });
      });
      ctx.restore();
    }

    /* ------------------------------------------------ 板块骨架（全景） */
    /* 用户 2026-10-18：「全景里基础与逻辑—代数—几何与拓扑之间仍有多条粗长线」。
       核实过：那不是普通边，也不是主干边 —— 是 `drawClusterLinks` 的**聚合线**
       （276 条，按团心连，远看就是一片灰网）。
       全景改成「每对板块只留一条很淡的线」，放大一档才交回团级聚合线。 */
    var sectorPairCache = null;
    /** 全景的板块骨架：每对板块一条，alpha ≈0.05~0.13（远看只是「它们有关系」） */
    /* ------------------------------------------------ 星团包络 */
    /**
     * 给一堆点画一圈闭合的平滑边界：绕一圈取 samples 个方向，
     * 每个方向取「落在该方向 ±半个扇区内的点」里最远的那个，再外扩 pad；
     * 半径序列平滑两遍消尖角，最后用二次贝塞尔穿过相邻采样点的中点。
     * （不做凸包 —— 凸包会把 L 形的团撑肥，贴不住形状。）
     */
    function envelopePoints(list, pad, samples, smooth) {
      var cx = 0, cy = 0;
      list.forEach(function (n) { cx += n.x; cy += n.y; });
      cx /= list.length; cy /= list.length;

      var half = Math.PI / samples;
      var r = [];
      for (var i = 0; i < samples; i++) {
        var th = i * 2 * Math.PI / samples;
        var cos = Math.cos(th), sin = Math.sin(th);
        var best = 0;
        list.forEach(function (n) {
          var dx = n.x - cx, dy = n.y - cy;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1e-6) return;
          // 点与这个方向的夹角：用 |cos| 判，超过半个扇区就不算
          if ((dx * cos + dy * sin) / dist < Math.cos(half)) return;
          if (dist > best) best = dist;
        });
        if (best === 0) {                       // 这个方向没点 → 退回支撑函数
          list.forEach(function (n) {
            var v = (n.x - cx) * cos + (n.y - cy) * sin;
            if (v > best) best = v;
          });
        }
        r.push(best + pad);
      }
      for (var s = 0; s < (smooth || 0); s++) {  // 平滑
        var out = [];
        for (var j = 0; j < samples; j++) {
          out.push((r[(j - 1 + samples) % samples] + r[j] * 2 + r[(j + 1) % samples]) / 4);
        }
        r = out;
      }
      return { cx: cx, cy: cy, r: r, samples: samples };
    }

    /** 把包络采样点画成一条闭合的平滑曲线 */
    function traceEnvelope(env, cam) {
      var N = env.samples;
      var pt = function (i) {
        var th = (i % N) * 2 * Math.PI / N;
        var rr = env.r[((i % N) + N) % N];
        return cam.toScreen(env.cx + Math.cos(th) * rr, env.cy + Math.sin(th) * rr);
      };
      ctx.beginPath();
      var p0 = pt(0), pN = pt(N - 1);
      ctx.moveTo((pN.x + p0.x) / 2, (pN.y + p0.y) / 2);
      for (var i = 0; i < N; i++) {
        var cur = pt(i), nxt = pt(i + 1);
        ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + nxt.x) / 2, (cur.y + nxt.y) / 2);
      }
      ctx.closePath();
    }

    function drawEnvelopes() {
      var a = lodA.envelope;
      if (a <= 0.02) return;
      var cfgE = C.envelope;
      ctx.save();
      ctx.lineJoin = 'round';
      (view.graph.clusters || []).forEach(function (c) {
        if (!c.nodes || !c.nodes.length) return;
        var list = c.nodes.filter(function (n) { return nodeOk(n.id); });
        if (list.length < 2) return;              // 一个点画不出包络
        var env = envelopePoints(list, cfgE.pad, cfgE.samples, cfgE.smooth);
        var gal = view.graph.galaxyOf ? view.graph.galaxyOf(c) : null;
        var rgb = U.hexToRgb(c.color || (gal ? gal.color : '#7A8699'));

        var rmax = 0;
        for (var ri = 0; ri < env.r.length; ri++) if (env.r[ri] > rmax) rmax = env.r[ri];

        traceEnvelope(env, camNow());    // ⚠️ 必须 camNow()：烘焙时是 staticCam，读 view.cam 会整体错位
        /* ⭐ 这一块用**径向渐变**填：中心浓、越往外越淡、到包络外沿正好为 0。
           于是「这个团的范围」是一条化开的过渡，不再是描出来的一圈线。
           （原来是 fillAlpha 平铺 + strokeAlpha 描边 —— 缩小时就是一个个圆圈，
           用户原话：「就是一个圆圈看着很怪」。）
           ⚠️ gradSpan < 1：渐变的零点落在**包络以内**，各方向都到不了外沿，
           所以任何一个方向都不会留下一条淡边 —— 边界是靠浓度读出来的。 */
        var cs = w2s(env.cx, env.cy);
        var gR = Math.max(1, rmax * camNow().k * cfgE.gradSpan);
        var g = ctx.createRadialGradient(cs.x, cs.y, 0, cs.x, cs.y, gR);
        var rgbS = rgb.r + ',' + rgb.g + ',' + rgb.b + ',';
        g.addColorStop(0.00, 'rgba(' + rgbS + (cfgE.fillAlpha * 0.45 * a).toFixed(4) + ')');
        g.addColorStop(0.45, 'rgba(' + rgbS + (cfgE.fillAlpha * 0.45 * 0.52 * a).toFixed(4) + ')');
        g.addColorStop(0.78, 'rgba(' + rgbS + (cfgE.fillAlpha * 0.45 * 0.16 * a).toFixed(4) + ')');
        g.addColorStop(1.00, 'rgba(' + rgbS + '0)');
        /* ⛔ Stage 1b：包络**不再填充**（9 个巨淡圆叠在一起会把 10 个岛连成一坨），
           只留一条 α≤0.06 的极淡描边。 */
        ctx.fillStyle = g;
        ctx.fill();

        if (cfgE.strokeAlpha > 0.002) {           // 留着的：要一条很淡的轮廓线时把它调起来
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(' + rgbS + (cfgE.strokeAlpha * a).toFixed(3) + ')';
          ctx.stroke();
        }
      });
      ctx.restore();
    }

    /* ------------------------------------------------ 星团名 */
    /** 给一个名字找位置：先试原位，再试上下几个偏移；都不行就返回 null。
        依据是 nameBoxes（**选中/搜索 → 当前尺度主名 → 节点名**，按这个优先级依次占位）。
        rank：0 选中 / 1 悬停 / 2 当前尺度主名（板块·领域·星团）/ 3 其他。
        ⛔ 放不下就返回 null（调用方隐藏），**不缩字号、不降对比度**。 */
    function placeName(cx, cy, bw, bh, rank, kind) {
      var step = bh + 6;
      var gaps = [0, -step, step, -2 * step, 2 * step];
      for (var gi = 0; gi < gaps.length; gi++) {
        var y = cy + gaps[gi];
        var box = {
          x0: cx - bw / 2, y0: y - bh / 2, x1: cx + bw / 2, y1: y + bh / 2,
          rank: rank == null ? 3 : rank, kind: kind || 'struct'
        };        var hit = false;
        for (var i = 0; i < nameBoxes.length; i++) {
          var b = nameBoxes[i];
          if (box.x0 < b.x1 && box.x1 > b.x0 && box.y0 < b.y1 && box.y1 > b.y0) { hit = true; break; }
        }
        if (!hit) return { y: y, box: box };
      }
      return null;
    }

    function drawClusterNames() {
      var a = lodA.clusterName;
      var fs = U.clamp(C.cluster.labelSize * Math.pow(view.cam.k, 0.42), 11, 26);
      ctx.save();
      ctx.font = '700 ' + fs.toFixed(1) + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      (view.graph.clusters || []).forEach(function (c) {
        if (!c.stat || !c.name) return;
        if (view.isNodeVisible && !visibleIn(c.nodes)) return;   // 整团都藏起来了
        var p = w2s(c.stat.cx, c.stat.cy);
        if (p.x < -300 || p.x > W + 300 || p.y < -200 || p.y > H + 200) return;
        var text = c.nameShow || c.name;      // ⭐ T2.4：星团名跟语言走（启动时算一次）
        var tw = measure(ctx, text, ctx.font);
        var pad = C.cluster.namePad;
        var bw = tw + pad * 2, bh = fs + 9;
        // ⚠️ 装置名之间也要互相避让：两个团挨得近时（比如「代数结构」与
        //    「向量空间的基」）名字会直接叠在一起，读不清。放不下就不画 ——
        //    包络还在，放大一点名字自然回来。
        var slot = placeName(p.x, p.y, bw, bh, 2, 'cluster');
        if (!slot) return;
        var y = slot.y;
        ctx.globalAlpha = a;
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.beginPath();
        roundPath(ctx, p.x - bw / 2, y - bh / 2, bw, bh, bh / 2);
        ctx.fill();
        var g = view.graph.galaxyOf(c);
        if (g) { ctx.strokeStyle = U.rgba(g.color, 0.5); ctx.lineWidth = 1.2; ctx.stroke(); }
        // 深色字，保证在云上读得清
        ctx.fillStyle = 'rgba(30,32,40,0.90)';
        ctx.fillText(text, p.x, y + 0.5);
        ctx.globalAlpha = 1;
        prof.labelCount++;                   // 星团名也是一个「画上去的标签」
        slot.box.pad = 5;                    // 节点名离团名至少 5px（见 drawLabels）
        nameBoxes.push(slot.box);
      });
      ctx.restore();
    }

    /**
     * 连线：**按样式分桶，每组一个路径、只描边一次**。
     *
     * ⚠️ 这里省的不是像素，是**描边次数**：定义引用线有 1244 条（占全部连线 89%），
     *    逐条 stroke() 时用户机器上实测约 0.05ms/条 ⇒ 一帧六十多毫秒。
     *    证据：把定义线一关，同一页面立刻从 13fps 变成 240fps；
     *    而把绘制分辨率砍半（quick=1，像素量 1/4）完全不改变帧数 —— 所以瓶颈是
     *    「多少笔」，不是「多少像素」。合成一个路径后，1244 次描边变成一次。
     *
     * ⚠️ 副作用（知道且接受）：同一路径内的交叠**不会再叠加变深**（一个路径只混合一次），
     *    所以定义线相交处由「更深」变成「同样深浅」—— 观感反而更干净。
     */
    function drawEdges(list) {
      /* ⭐ 线条三档（r = k/kFit）：定义引用线**只在 L3（r ≥ 2.8）**画。
         L0 一条不画、L1–L2 只画推出/等价骨架 —— 都在 drawEdgeOne 里判。
         「全部连线」绕过所有闸门。 */
      /* 只有**定义引用线**走「合并描边」的快路径：它占全部连线 89%（1244/1391），
         逐条 stroke() 在用户机器上约 0.05ms/条 ⇒ 一帧六十多毫秒
         （实测：把它一关，同一页面 13fps → 240fps；而把像素量砍到 1/4 毫无变化）。
         其余三类一共才 121 条（推出 108 / 等价 4 / 类比 9）⇒ **保持逐条绘制的原样**。 */
      var defB = Object.create(null), defOrder = [];
      list.forEach(function (g) {
        if (g.edge.kind !== 'definition') { drawEdgeOne(g); return; }
        var e = g.edge, style = T.edgeStyles.definition;
        var spine = isSpine(e);
        var active = isEdgeActive(g);
        /* 2026-10-19：不再「只画主干」—— 那一版在全景留下几根稀疏长线，用户报「像 bug」。 */
        var a = alphaForEdge(e) * Math.max(lodA.nodeEdge, spine ? lodA.trunkEdge : 0)
          * lodA.defDim;                       // 中景降权（与 drawEdgeOne 同一系数）
        /* ⭐ 2026-10-19：全景/中景同样顶一个下限 —— 定义线占 89%，不顶就「只有推出线」 */
        if (!active && !C.showAllEdges && !view.focus) a = Math.max(a, lodA.edgeFloor);
        if (!active) a *= edgeFade(g);          // 长边在屏幕空间降权
        /* ⭐ 2026-10-19：**定义线这条「合并描边」路径以前完全没有视口裁剪** ——
           两端都在屏外、只是线段横穿视口的线照样画。用户上报的「空白处几条长蓝线」
           就是它（改前改后逐像素相同，正因为这两条路径压根不是同一条）。
           口径：≥1.35 起，两端都在外 ⇒ 不画；只有一端在 ⇒ 按屏幕长度衰减。 */
        if (!active && !C.showAllEdges && (lodA.rRel || 1) >= 1.35) {
          var dEnds = GU.edgeNodes(e), dIn = 0;
          for (var di = 0; di < dEnds.length; di++) {
            var dn = view.graph.byId[dEnds[di]];
            if (!dn) continue;
            var dp = w2s(dn.x, dn.y);
            if (dp.x >= 0 && dp.x <= W && dp.y >= 0 && dp.y <= H) dIn++;
          }
          if (dIn === 0) return;
          if (dIn === 1) a *= Math.exp(-(g.lenPx || 0) / 320);
          if (a <= 0.06) return;
        }
        /* ⚠️ 选中 / 悬停的边：全景下节点级 LOD 的 alpha 是 0，会整条消失。
           用户点了一个点就想知道它连到哪 —— 和 drawEdgeOne 用同一个下限。 */
        if (active) a = Math.max(a, 0.55);
        /* 「全部连线」打开时定义线也要真的出现 —— 但它们占全部连线 84%，
           所以下限比其它三类低一档（0.10 vs 0.14），免得蓝网盖住板块。 */
        if (C.showAllEdges) a = Math.max(a, 0.10);
        if (a <= 0.02) return;
        if (!C.showDefinitionLines) return;
        /* 中景：跨领域的定义引用也先收起（和 drawEdgeOne 同一口径） */
        /* 定义引用线**不跟着放大**（89% 的线都是它）。放大后如果它也变粗，
           整个画面会被蓝网盖住；「定义线降权」的既定口径不能破。 */
        var w = C.edge.definitionWidth * (active ? 1.85 : 1);
        /* ⛔ 2026-10-19：定义引用线**永远用蓝**。原来 spineOnly（低缩放下 nodeEdge<0.9）会把
           定义线改画成主干色（T.spineColor 橙棕，低透明下看着就是黑的）—— 于是同一条定义线
           在全景是黑的、放大才变蓝（用户报）。主干强调只属于推出/等价，不该接管定义线。 */
        var spineOnly = false;
        var color = spineOnly
          ? U.rgba(T.spineColor || 'B4661A', a)
          : 'rgba(' + style.color + ',' + ((style.alpha != null ? style.alpha : 1) * a).toFixed(3) + ')';
        var key = color + '|' + w.toFixed(2);
        var grp = defB[key];
        if (!grp) { grp = defB[key] = { color: color, w: w, gs: [] }; defOrder.push(grp); }
        grp.gs.push(g);
      });

      defOrder.forEach(function (grp) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = grp.w;
        ctx.strokeStyle = grp.color;
        ctx.beginPath();
        for (var i = 0; i < grp.gs.length; i++) {
          var polys = grp.gs[i].polys, quads = grp.gs[i].quads;
          for (var j = 0; j < polys.length; j++) {
            var q = quads[j], pts = polys[j];
            if (q) {
              ctx.moveTo(q.p0.x, q.p0.y);
              ctx.quadraticCurveTo(q.p1.x, q.p1.y, q.p2.x, q.p2.y);
            } else {
              ctx.moveTo(pts[0].x, pts[0].y);
              for (var k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
            }
          }
        }
        ctx.stroke();
        ctx.restore();
      });
    }

    /** 星团 → 它所在的大板块 id（没挂上就返回空串） */
    function clusterSector(cid) {
      var c = view.graph.clusterById && view.graph.clusterById[cid];
      if (!c || !c.parent) return '';
      var r = view.graph.regionById[c.parent];
      return (r && r.sector) || '';
    }

    /** 这条边的两端是否属于**不同星团**（多来源边：任一对不同就算跨团） */
    function edgeCrossCluster(e) {
      var ids = MG.graphUtil.edgeNodes(e);
      var first = null;
      for (var i = 0; i < ids.length; i++) {
        var n = view.graph.byId[ids[i]];
        if (!n) continue;
        var c = n.cluster || '';
        if (first === null) first = c;
        else if (c !== first) return true;
      }
      return false;
    }

    /** 这条边的两端是否属于**不同领域**（物理归属：星团所属星系；无星团取 regions[0]）。
        结果缓存在边上（内容不变，不必每帧重算）。 */
    function edgeCrossRegion(e) {
      if (e._crossRegion != null) return e._crossRegion;
      var ids = GU.edgeNodes(e);
      var first = null, cross = false;
      for (var i = 0; i < ids.length; i++) {
        var n = view.graph.byId[ids[i]];
        if (!n) continue;
        var r = (n.clusterObj && n.clusterObj.parent) || (n.regions && n.regions[0]) || '';
        if (first === null) { first = r; continue; }
        if (r && first && r !== first) { cross = true; break; }
      }
      e._crossRegion = cross;
      return cross;
    }

    /* ⭐ 诊断：逐边 alpha 账本（与 labelTrace 同一套用法：默认关，关着时零分配）。
       `setEdgeTrace(true)` 之后，最近一次绘制里每条走过 drawEdgeOne 的边落一条：
         { why, kind, r, lenPx, wlen, a0, a, inside }
       `a0` = 节点级 LOD 之后的 alpha，`a` = 真正落笔的 alpha，`wlen` = lenPx / k。
       用途：判「同一条边放大就淡了」到底是**屏幕长度**（lenPx 涨）还是**节点级 LOD**
       （nodeEdge 掉）造成的 —— 探针要读的就是引擎自己算出来的那个 a，
       ⛔ 别在探针里把公式抄一遍（抄出来的只是代理指标）。 */
    var edgeTraceOn = false, edgeTraceMap = null;
    function edgeTrace(g, why, a, a0, inside) {
      if (!edgeTraceOn) return;
      var k = camNow().k || 1;
      edgeTraceMap[g.edge.id] = {
        why: why, kind: g.edge.kind, r: lodA.rRel || 1,
        lenPx: g.lenPx || 0, wlen: (g.lenPx || 0) / Math.max(1e-6, k),
        a0: a0, a: a, inside: inside
      };
    }

    /** 逐条绘制（推出 / 等价 / 类比，以及定义线在别的调用点单画时）—— 与原来逐字一致 */
    function drawEdgeOne(g) {
      var e = g.edge;
      var style = T.edgeStyles[e.kind];
      var spine = isSpine(e);
      // 主干骨架：它有自己的淡入曲线，缩小时也能看见；放大后让位给全部连线
      var aFocus = alphaForEdge(e);
      var a = aFocus * Math.max(lodA.nodeEdge, spine ? lodA.trunkEdge : 0);
      var aLod = a, insideN = -1;      // 诊断：LOD 之后的 a / 两端在屏内的个数
      var active = isEdgeActive(g);
      /* ⭐⭐ 2026-10-19 用户定稿的线条规则（取代 Stage 1b 的三档）：
         · 全景（r<1.35）：**全都画**，整体顶到 0.30 —— 一层「雾网」，不是空的；
         · 中景（1.35≤r<2.8）：全都画，不按 kind 过滤、不藏跨领域线；
         · 近景（r≥2.8）：只画**至少一端在视口内**的；长线按**世界长度**降权（edgeFade）。
         ⛔ clusterLinks 聚合线已删（用户：「实在是不明显指代什么」）。
         ⚠️ 全景那档节点级 px 闸门是 0，必须顶一个下限，否则一条线都没有。 */
      var rT = lodA.rRel || 1;
      if (!active && !C.showAllEdges) {
        /* ⭐ 2026-10-19：全景不画节点，黑线（推出/等价）就只剩「浮空的箭头骨架」——
           用户要求这一档只留蓝色的定义引用当雾网。 */
        if (rT < 1.35 && e.kind !== 'definition') { edgeTrace(g, 'far', 0, aLod, -1); return; }
        if (rT >= 2.8) {
          var endIds = GU.edgeNodes(e), inside = 0;
          for (var ei = 0; ei < endIds.length; ei++) {
            var en = view.graph.byId[endIds[ei]];
            if (!en) continue;
            var sp = w2s(en.x, en.y);
            if (sp.x >= 0 && sp.x <= W && sp.y >= 0 && sp.y <= H) inside++;
          }
          insideN = inside;
          if (inside === 0) { edgeTrace(g, 'off', 0, aLod, 0); return; }
          /* ⭐⭐ 2026-10-2x（手机上报「全景很清楚、稍微放大就没了」）：
             ⛔ **删掉按屏幕长度衰减**（原来是 exp(-lenPx/320)）。理由有两条：
               ① 同一个量（这条边有多长）已经在 `edgeFade(g)` 里按**世界长度**算过一次，
                 这里再按 lenPx 算一遍就是两个口径打架；手机上视口只有 390 CSS px，
                 稍微一放大 lenPx 就上百（实测 r=6 时 647 px ⇒ 乘数只剩 e^-2.0≈0.13），
                 而世界长度根本没变。
               ② 长线该淡仍然会淡：`edgeFade` 的世界长度 1300→3400、floor 0.18 兜着，
                 和缩放到哪一档无关（任何缩放下同一条边的浓淡都是同一个值）。
             ⭐ 近景**保留连续下限**：`edgeFloor` 在 r=2.8 处正好是 0.75，而节点级的
               `nodeEdge` 要等「节点间距 36~66 px」（k 0.30~0.55）才亮起来 ——
               手机上 kFit≈0.06 ⇒ 那是 r≈5~9。于是 r 2.8→5 这一段黑线被 nodeEdge=0
               掐成**一条都不画**，与 r<2.8 的 0.75 之间是一道断崖（实测 2.79→2.81
               一步之内：203 条 drawn@0.75 变成 4 条 drawn + 166 条 faded）。
               近景不该比中景更淡 ⇒ 下限与中景同一条曲线（lodA.edgeFloor）。
             ⛔ 带 `!view.focus`：聚焦时 alphaForEdge 会把无关的边压到 dimEdge，
                近景不该把这份「压暗」再顶回来（中景那条 floor 没这个保护，历史遗留）。 */
          if (!view.focus) a = Math.max(a, lodA.edgeFloor);
          /* ⛔ 两端都在屏内但横穿整屏的线同样算「长线」—— 交给 edgeFade（世界长度）。
             ⛔ 近景的长线**不额外留下限**：空白区域里飘几条横穿全屏的线是 2026-10-19
                用户报过的（当时的 0.03 下限正好压线通过 α>0.02 的闸门）。 */
          if (a <= 0.06) { edgeTrace(g, 'faded', a, aLod, insideN); return; }
        } else {
          /* ⚠️ 下限只该把「本来就该画、只是太淡」的边托起来 —— 绝不能把聚焦时被
             alphaForEdge 压到 dimEdge(0.05) 的无关边再顶回 0.75。
             2026-10-27 用户报的「放的不大的倍率下点一个点，就看见所有黑线」正是这里：
             同一个函数里近景（下面那条）和 drawArrow 都带了 `!view.focus` 的保护，
             唯独中景这一档没带 —— 于是黑线全亮、而箭头照旧被压掉，
             看起来就是「满屏黑线没有箭头」。
             改成按 aFocus 缩放：无关边 = 0.75×0.05 ≈ 0.04（压暗、连方位感都还在），
             焦点边 aFocus = 1 ⇒ 与改动前逐位一致。 */
          a = Math.max(a, lodA.edgeFloor * aFocus);
        }
      }
      if (e.kind === 'definition') a *= lodA.defDim;
      if (!active) a *= edgeFade(g);           // 长边在屏幕空间降权（选中的不降）
      /* 选中 / 悬停的边：哪怕在全景（节点级 LOD 的 alpha 是 0）也要看得见 ——
         用户点了一个点，就想知道它连到哪。 */
      if (active) a = Math.max(a, 0.55);
      /* ⭐ 用户主动打开「全部连线」= 他就是想看全。全景的节点级 LOD 把 alpha 压成 0，
         不顶一个下限的话这个开关在那一档**什么也不做**（看着像坏按钮）。
         下限取 0.14：够看见网，又不至于糊成一片 —— 关掉就回到分档。 */
      if (C.showAllEdges) a = Math.max(a, 0.14);
      if (a <= 0.02) { edgeTrace(g, 'dim', a, aLod, insideN); return; }

      /* ⭐ 中景：**跨领域的逐条边默认收起**（用户 2026-10-18：
         「中景像一张网，压过节点和文字」）。选中 / 悬停 / 「全部连线」放行；
         放大到近景自己会回来。 */

      /* ⭐ 阶段 3：远尺度收起「逐条跨团长线」。
         只看「两端星团是否相同」——团内关系不受影响；选中/聚焦的边、以及
         用户打开 `showAllEdges` 时一律放行。⛔ 不画聚合箭头。 */
      var w = (e.kind === 'implication' ? C.edge.implicationWidth
        : e.kind === 'equivalence' ? C.edge.equivalenceWidth
          : e.kind === 'analogy' ? T.edgeStyles.analogy.width
            : C.edge.definitionWidth) * (active ? 1.85 : 1)
        * (e.kind === 'definition' ? 1 : edgeWidthMul());

      // 全图尺度：主干画成一条低调的暖色细线，不抢云雾和装置名
      /* ⛔ 推论边不参与主干降色：主干色（暖橙棕）会把「粉红 = 不分层」这个
         唯一的视觉线索吃掉。它照样走主干的下限 / 线宽规则，只是颜色不改。 */
      var spineOnly = spine && !GU.isDerived(e) && lodA.nodeEdge < 0.9;
      if (spineOnly) { a *= 0.55 + 0.45 * lodA.nodeEdge; w = 1.25; }

      if (e.kind === 'definition' && !C.showDefinitionLines) return;

      // 弱边：不开探索模式时压得很淡，开了才提亮
      var isWeak = GU.isWeak(e);
      if (isWeak) {
        var base = C.exploreMode ? C.analogy.exploreAlpha : C.analogy.dimAlpha;
        a = a * (base / (style.alpha || 1));
        if (a <= 0.02) return;
        w *= active ? 1.6 : 1;
      }

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = w;
      if (isWeak) ctx.setLineDash(C.analogy.dash);

      if (spineOnly) {
        ctx.strokeStyle = U.rgba(T.spineColor || 'B4661A', a);
      } else if (e.kind === 'definition' || e.kind === 'analogy') {
        var alpha = (style.alpha != null ? style.alpha : 1) * a;
        ctx.strokeStyle = 'rgba(' + style.color + ',' + alpha.toFixed(3) + ')';
      } else {
        /* ⭐ 推论边（layer:false）在这里换成粉红；普通推出 / 等价仍是墨色。
           线宽、箭头、曲线一概不动 —— 见 edgeColor() 的注释。 */
        ctx.strokeStyle = U.rgba(edgeColor(e), a);
      }

      ctx.beginPath();
      g.polys.forEach(function (pts, i) {
        if (g.quads[i]) {
          var q = g.quads[i];
          ctx.moveTo(q.p0.x, q.p0.y);
          ctx.quadraticCurveTo(q.p1.x, q.p1.y, q.p2.x, q.p2.y);
        } else {
          ctx.moveTo(pts[0].x, pts[0].y);
          for (var k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
        }
      });
      ctx.stroke();
      edgeTrace(g, 'drawn', a, aLod, insideN);

      // 等价线中点画一个 ⟺（用白色描边做底，而不是白方块，免得在云上留个补丁）
      if (g.glyph && cam_eqVisible()) {
        ctx.font = '600 ' + Math.round(U.clamp(13 * Math.pow(camNow().k, 0.4), 11, 18)) + 'px ' + T.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.95 * a).toFixed(3) + ')';
        ctx.strokeText(g.glyph.text, g.glyph.x, g.glyph.y + 0.5);
        ctx.fillStyle = U.rgba(T.edgeStyles.equivalence.color, 0.92 * a);
        ctx.fillText(g.glyph.text, g.glyph.x, g.glyph.y + 0.5);
      }
      ctx.restore();
    }

    function cam_eqVisible() { return camNow().k >= C.edge.equivalenceGlyph; }

    function isEdgeActive(g) {
      var e = g.edge;
      if (view.hover && view.hover.type === 'edge' && view.hover.id === e.id) return true;
      if (view.focus && view.focus.type === 'edge' && view.focus.id === e.id) return true;
      if (view.focus && view.focus.type === 'node' && GU.edgeNodes(e).indexOf(view.focus.id) >= 0) return true;
      if (view.hover && view.hover.type === 'node' && GU.edgeNodes(e).indexOf(view.hover.id) >= 0) return true;
      return false;
    }

    function drawArrow(g) {
      var e = g.edge;
      var active = isEdgeActive(g);
      var a = alphaForEdge(e) * lodA.nodeEdge;
      /* 箭头跟线同一条规则：全景/中景顶一个下限，否则「线回来了箭头没有」。 */
      if (!active && !C.showAllEdges && !view.focus) a = Math.max(a, lodA.edgeFloor * 0.42);
      if (!active) a *= edgeFade(g);           // 长边在屏幕空间降权（选中的不降）
      /* 与线同一个下限：否则整条线回来了、箭头却没有，看起来像「没方向」。 */
      if (active) a = Math.max(a, 0.55);
      if (a <= 0.02) return;
      var sz = U.clamp(C.edge.arrowSize * Math.pow(camNow().k, 0.35), 6, 17) * (active ? 1.2 : 1);
      var x = g.arrow.x, y = g.arrow.y, ang = g.arrow.angle;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-sz, sz * 0.42);
      ctx.lineTo(-sz * 0.72, 0);
      ctx.lineTo(-sz, -sz * 0.42);
      ctx.closePath();
      /* ⭐ 箭头跟线**同色**：推论边（layer:false）用粉红，其余推出保持墨色。
         ⛔ 只换颜色 —— 箭头的大小 / 形状 / 角度全在下面，一处都不改。 */
      ctx.fillStyle = U.rgba(edgeColor(e), a);
      ctx.fill();
      ctx.restore();
    }

    /* ---------------------------------------------------------- 节点 */
    function drawNode(n) {
      if (!nodeOk(n.id)) return;                 // 被藏起来的点：不画（连线也已一并去掉）
      if (!nodeInView(n)) return;                // 屏幕外的点：光晕、圆点、外环全省掉
      var p = screenOf(n);
      var r = nodeRadius(n);
      var a = alphaForNode(n.id) * lodA.nodeDot * (isTrunk(n) ? 1 : lodA.trunkDim);
      if (a <= 0.02) return;

      var st = MG.typeStyle(n.type);
      var isFocus = view.focus && view.focus.type === 'node' && view.focus.id === n.id;
      var isHover = (view.hover && view.hover.type === 'node' && view.hover.id === n.id) ||
        (view.hover && view.hover.type === 'edge' && edgeById(view.hover.id) &&
          GU.edgeNodes(edgeById(view.hover.id)).indexOf(n.id) >= 0);

      // 光晕（位图模式下由 drawGlows() 单独实时画一遍，这里跳过）
      // ⭐ 两档：普通光晕跟 C.node.glow，选中/悬停的光圈跟 C.node.glowSelected。
      var emph = isFocus || isHover;
      if ((emph ? C.node.glowSelected : C.node.glow) && !glowLive) {
        var gs = glowSprite(st.color);
        var gsz = r * 5.4;
        ctx.globalAlpha = a * (emph ? 1 :
          (C.node.glowNormalAlpha == null ? 0.72 : C.node.glowNormalAlpha));
        ctx.drawImage(gs, p.x - gsz / 2, p.y - gsz / 2, gsz, gsz);
        ctx.globalAlpha = 1;
      }

      // 实心点 + 白圈
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = U.rgba(st.color, a);
      ctx.fill();
      ctx.lineWidth = Math.max(1.2, C.node.ringWidth * Math.min(1, camNow().k + 0.35));
      ctx.strokeStyle = 'rgba(255,255,255,' + (0.95 * a).toFixed(3) + ')';
      ctx.stroke();

      // 选中 / 悬停的外环
      if (isFocus || isHover) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 5.5, 0, Math.PI * 2);
        ctx.lineWidth = isFocus ? 2 : 1.4;
        ctx.strokeStyle = U.rgba(st.color, (isFocus ? 0.95 : 0.55) * a);
        ctx.stroke();
      } else if (n.isHub) {
        // 星团的中心天体：外面套一道细环，全图尺度上也认得出「这个装置的核心」
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3.0, 0, Math.PI * 2);
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = U.rgba(st.color, 0.6 * a);
        ctx.stroke();
      }
    }

    /* ---------------------------------------------------------- 名称 */
    function isTrunk(n) { return !!(n && n.trunk); }

    /* ⭐⭐ 2026-10-2x **贴边名字夹回画布**（用户报「屏幕边缘的节点名字缺失，中间正常」）。
       取证（`_tools/_p2labels.js` / `_p3pan.js`）：边缘节点在 labelTrace 里**是 drawn**、
       画布上也真有墨 —— 丢名字的不是候选 / 避让 / 预算，也不是 LAB_MARGIN 贴图
       （余量 240 > 回放上限 min(vw/2, 216)，被裁掉的那圈**永远在视口外**；
       实测平移 120 px 回放，83/83 个名字一个没丢）。
       真正丢的是**画布边**：名字居中画在节点下方，节点贴到视口边上时这个位置就落到
       画布外面了（左右各切半截，下边整条掉出去）。实测 390×844、r=6：
       节点中心在屏内的名字 89 条，其中 **19 条的框有一部分在画布外**、2 条整条在下方
       （`ink=0`）；桌面 1600×900、r=3：219 条里 14 条被切、2 条看不见。
       判据用**名字框**（实体），不用节点中心：
         · 左右溢出 ⇒ 整块平移到框贴住那条边；
         · 下面放不下 ⇒ 翻到节点**上方**（⛔ 不是往上夹 —— 夹住会压在节点自己身上）；
         · ⛔ 只在**节点本身在屏内**（±r）时夹：节点在屏外还夹的话，会拖出一串
           和圆点脱钩的「浮空名字」（屏幕边上看着像无主的标签）。
       ⚠️ 名字比整屏还宽时只能居中（两头都切），这是唯一的例外。
       返回 { x, y, box }：x/y 是文字锚点（textAlign=center、textBaseline=top），
       box 是占位框 —— 避让与落笔必须用**同一个**框。 */
    function nameSpot(px, py, r, tw, fs, camK) {
      var pad = C.node.labelPad;
      var half = tw / 2 + pad;
      var off = C.node.labelOffset * Math.max(camK, 0.62);
      var x = px, y = py + r + off;
      /* ⛔ 2026-10-20 用户明确否决「贴边夹回画布 / 翻到上方」：名字就画在节点正下方，
         落到画布外就不画。别再自作主张给它找位置。 */
      return { x: x, y: y, box: { x0: x - half, y0: y - 1, x1: x + half, y1: y + fs + 2 } };
    }

    /** 这一帧「必须赢」的标签：**选中 → 悬停 → 搜索命中**。
        为什么要在画板块名之前先占位：placeName() 是「先到先得」的队列，
        大标题（18px 粗体）比节点名大得多，晚一步就永远挤不进去 ——
        用户点了搜索结果却看不到那个点的名字。 */
    function reserveSpecialLabels() {
      var k = view.cam.k;
      /* ⚠️ 缩到全图时 labelFont() 只有 9.5px —— 选中/搜索命中的名字是「我为什么在看这一屏」
         的线索，不能跟着变小。这里给它 12px 的下限（⛔ 不是给普通节点名放大）。 */
      var fs = Math.max(labelFont(), 12);
      var order = [];
      if (view.focus && view.focus.type === 'node') order.push({ id: view.focus.id, rank: 0 });
      if (view.hover && view.hover.type === 'node') order.push({ id: view.hover.id, rank: 1 });
      if (view.searchIds) {
        Object.keys(view.searchIds).forEach(function (id) { order.push({ id: id, rank: 2 }); });
      }
      if (!order.length) return;
      ctx.font = '600 ' + fs + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      var seen = Object.create(null);
      for (var i = 0; i < order.length && reservedLabels.length < 24; i++) {
        var it = order[i];
        if (seen[it.id]) continue;
        seen[it.id] = 1;
        var n = view.graph.byId[it.id];
        if (!n || !nodeOk(it.id)) continue;
        var p = screenOf(n);
        if (!inView(p.x, p.y, PAD_NODE)) continue;
        var r = nodeRadius(n);
        var text = n.labelShow || n.label;
        var tw = measure(ctx, text, ctx.font);
        var spot = nameSpot(p.x, p.y, r, tw, fs, k);
        var x = spot.x, y = spot.y;
        var box = {
          x0: spot.box.x0, y0: spot.box.y0,
          x1: spot.box.x1, y1: spot.box.y1, rank: it.rank,
          id: it.id, kind: 'special'
        };
        /* 特殊标签之间也避让；但**选中 / 悬停那一颗必须出现**（放不下就压上去）。 */
        var hit = false;
        for (var j = 0; j < reservedLabels.length; j++) {
          var b = reservedLabels[j].box;
          if (box.x0 < b.x1 && box.x1 > b.x0 && box.y0 < b.y1 && box.y1 > b.y0) { hit = true; break; }
        }
        if (hit && it.rank > 1) continue;
        nameBoxes.push(box);
        reservedLabels.push({
          id: it.id, rank: it.rank, x: x, y: y, fs: fs, text: text,
          alpha: alphaForNode(it.id), type: n.type, box: box
        });
      }
    }

    /** 把预留好的特殊标签画出来（位置已经占好，这里只落笔） */
    function drawReservedLabels() {
      if (!reservedLabels.length) return;
      ctx.font = '600 ' + labelFont() + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      reservedLabels.forEach(function (L) {
        if (L.alpha <= 0.06) return;
        /* 字号跟着当前缩放走（预留时同一帧算的 fs）；高亮色 = 类型色，
           和普通节点名的墨色区分开 —— 但**不加粗、不放大**（优先级靠占位，不靠抢眼）。 */
        ctx.font = '600 ' + L.fs + 'px ' + T.font;
        var alpha = L.alpha;
        ctx.lineWidth = Math.max(2.5, L.fs * 0.28);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.9 * alpha).toFixed(3) + ')';
        ctx.strokeText(L.text, L.x, L.y);
        ctx.fillStyle = (L.rank <= 1)
          ? U.rgba(MG.typeStyle(L.type).color, alpha)
          : 'rgba(28,28,30,' + alpha.toFixed(3) + ')';
        ctx.fillText(L.text, L.x, L.y);
        prof.labelCount++;
      });
    }


    /* ⭐⭐ 2026-10-19 **标签冻结**（用户要的两件事：拖动时不闪、拖完立刻有）：
       ⛔ 这里包的是「名字」这一**组**，不是原来那个只包节点名的半成品 ——
          用户在拖动时看到的名字来自四个函数：大板块名 / 领域名 / 星团名 / 节点名。
       两条路：
         · 相机 k 没变、且这一帧**确实在平移** ⇒ 把离屏标签层整体按位移贴回去；
           **不测量、不避让、不重排** ⇒ 名字跟着画面走，不会闪；
         · 其余情况（k 变了 / 没有缓存 / **相机停住了**）⇒ 重算一次。
       ⭐ 失效入口一共**四条**（2026-10-19 收尾补后三条）：
         ① k / 画布尺寸变了；
         ② **累计位移超过可回放范围**（= min(半屏, 离屏层余量×0.9)）—— 再往外就没画过了；
         ③ **相机停住了**（本帧机位与上一帧逐位相同 = 松手 / 滚轮去抖收尾 / 动画结束）；
         ④ `labelSig()` 变了（选中 / 悬停 / 搜索命中 / 「名称」开关 / 画布语言）。
       ⛔ ②③ 之外还有一条隐含的：`dx == dy == 0`（机位与**重算那一帧**相同）也重算。
       ⚠️ ③ 必须比「c.tx === labelCache.tx」—— 后者记的是**重算那一帧**的机位，
          平移之后就永远差一个 dx，于是「停住」那条分支一辈子进不去（旧实现就是这样：
          滚轮平移完，最后一帧仍是回放，没人再画 ⇒ 名字停在旧的一屏）。

       ⭐⭐ 2026-10-20 **换实现：记录文字调用 → 独立离屏图层**。
          为什么必须换：大板块名 / 领域名 / 星团名外面那圈圆角底框是
          `roundPath()` + `fill()`/`stroke()` 画的，**不是文字**；旧实现只接管
          `fillText`/`strokeText` 记账，回放时框根本没有被重放 ⇒
          一拖动，框就没了、只剩字（用户报的 Bug 1）。
          现在：`drawAllNames()` 整块画进离屏 canvas（只把 `ctx` 换成它的 2d context，
          四个出字函数**一行都不改**：圆角框、字距、alpha、避让全都照原样画），
          每帧再按 (dx,dy) 把那一块 `drawImage` 回主画布 ⇒ 任何非文本装饰自动保住。
          · 离屏层尺寸 = 视口 + 四周各 `LAB_MARGIN` CSS px，按 dpr 放大（不放大字会糊）；
          · 回放只贴「屏幕上要的那一块」（源矩形自动裁到图层内），成本 ≈ 一张视口大小的位图。
       ⛔ 不要记 ctx 的变换矩阵：回放时外层已按同一相机画过背景，差的只是一个平移量。
       ⛔ 不要在这里改四个绘制点里的任何一行（换 ctx + 贴图层就够了）。 */
    var labelCache = null;      // { k, tx, ty, w, h, sig, count, stamp }
    var labelBase = 0;          // 本趟重算的起点（prof.labelCount）→ 诊断分项里「结构性名字」靠它
    /* 「可见集合 / 世界内容」变了的**代次号**：`invalidate()` 每调一次 +1，进 labelSig。
       ⛔ 为什么需要它：自从「机位没变就直接贴缓存」之后，标签层只在指纹变了时重算；
          而**藏一批点**（左下角面板 / 主干模式 / 分层 / 并入外部内容）不改指纹里那几项，
          少了这一代次号，被藏掉的名字会一直贴在屏幕上，直到相机动一下才消失。
          这些改动本来就都会调 `renderer.invalidate()`（app.js 里 7 处）。 */
    var sigEpoch = 0;
    /* 上一帧画完时的机位 —— 判「相机停住」用（⛔ 不能用 labelCache.tx，理由见上） */
    var labelPrevCam = null;
    /* 离屏标签层。margin 越大幅度上能走更远才重算一次，代价是画布内存 ∝ (W+2m)(H+2m)。
       ⭐ 2026-10-20：**200 → 240**。原来 200 < 节点名的绘制余量 `PAD_NODE = 220`：
       `drawLabels` 会给「离屏最多 220px」的点也测量/落笔，可离屏层只覆盖 ±200 ——
       落在 200~220 那一圈的名字被**画在层外**（等于没画）。回放时只要往那一侧平移，
       就会出现「点的圆点画上去了、名字没有」，直到累计位移越过 `far` 触发重算才补上。
       这正是「同一名字，某个平移位置看不到、再挪一点就看得到」的形状。
       240 = PAD_NODE(220) + 一点余量（`far` 上限是 `min(vw/2, m*0.9)` = 216 < 240，
       所以回放永远贴得到层内的内容）。代价：dpr2、430×900 的层从 1660×2200 变 1820×2440
       （+21% 像素、约 +3.5 MB），换来的是边缘不再丢名字。 */
    var LAB_MARGIN = 240;
    var labLayer = null;        // { cv, g, w, h, dpr, margin, ox }
    /* ⭐ 回放前的「验戳」：重算时在层的余量里打一个 1×1 的戳，每次回放前读它。
       为什么必须验：离屏 canvas 不在 DOM 里，浏览器内存吃紧时可以把它回收成一张空白
         画布，而缓存里的 count 还说自己有内容 ⇒ 旧实现会一直贴一张空图，
         屏幕上一个字都没有（节点 / 连线在位图图层上，照样好好的）。
       成本实测（3200×2080 的层、软件光栅）：贴一次 1.74 ms，读 1 个像素 **0.003 ms**
         ⇒ 每帧都验得起（贴图那步的 1/500），不另设「多久验一次」的魔法数。
       ⛔ 戳的落点必须在**永远贴不出去**的那圈余量里：源矩形左边最小 = ox − 0.9·margin·d
          = 0.1·margin·d（dpr2 ⇒ 40 设备像素）⇒ 戳在 (1,1) 永远在源矩形之外。 */
    var LAB_STAMP = [1, 1];
    var labBad = false;         // 重算抛过异常 / 层没内容 ⇒ 这一帧直接实时画（下帧再试）

    /** 离屏标签层（按 W/H/dpr 复用；尺寸或 dpr 变了就重建） */
    function ensureLabelLayer() {
      var m = LAB_MARGIN, d = dpr;
      if (labLayer && labLayer.w === W && labLayer.h === H && labLayer.dpr === d) return labLayer;
      var ox = Math.round(m * d);        // 整数设备像素：内容落位不抖，文字不会被半像素糊一下
      var cv = document.createElement('canvas');
      cv.width = Math.max(1, Math.round(W * d) + 2 * ox);
      cv.height = Math.max(1, Math.round(H * d) + 2 * ox);
      labLayer = { cv: cv, g: cv.getContext('2d'), w: W, h: H, dpr: d, margin: m, ox: ox };
      return labLayer;
    }

    /** 把离屏层按 (dx,dy) 贴回主画布。
        (dx,dy) = 当前机位 − 重算那一帧的机位；只贴屏幕上真正要的那一块。 */
    function blitLabels(dx, dy) {
      var L = labLayer;
      if (!L || !L.g) return;
      var d = L.dpr;
      /* 源矩形：当前屏 (0,0) 在图层里是 (L.ox − dx*d, L.ox − dy*d)。
         ⚠️ |dx| 超过余量时源矩形会越界 —— 自动被裁掉（drawImage 会把目标按比例裁），
            所以 ② 的判据必须保证永远走不到那里（见 far）。 */
      ctx.drawImage(L.cv, L.ox - dx * d, L.ox - dy * d, W * d, H * d, 0, 0, W, H);
    }

    /** 出字的那一组（顺序 = 避让优先级：板块 → 领域 → 星团 → 节点）。
        ⚠️ 四个函数一行都没改：圆角框、字距、alpha、避让全靠「换 ctx」复用。 */
    function drawNamesGroup() {
      if (lodA.sectorName > 0.02) drawSectorNames();
      if (lodA.galaxyName > 0.02) drawGalaxyNames();
      if (lodA.clusterName > 0.02) drawClusterNames();
      if (C.showLabels) drawLabels();
    }

    /** 退路：名字**直接画在主画布**上（不走离屏层）。
        层拿不到 context / 重算抛异常时用它 —— 慢一点，但这一帧至少还有字。
        ⛔ 吞掉异常：名字没画出来也不能把 draw() 后面的 hover 叠加一起带走。 */
    function drawNamesDirect() {
      try { drawNamesGroup(); } catch (e) { labBad = true; }
    }

    /** 重算时在层的余量里打一个 1×1 的粉色戳；回放前读它就知道这层还有没有内容。
        ⛔ 落点必须在「永远贴不出去」的那一圈余量里：源矩形左边最小 = ox − 0.9·margin·d
           = 0.1·margin·d（dpr2 ⇒ 40 设备像素）⇒ 戳在 (1,1) 永远在源矩形之外。 */
    function stampLabelLayer() {
      var L = labLayer;
      if (!L || !L.g) return false;
      var g = L.g;
      try {
        g.save();
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.globalAlpha = 1;
        g.fillStyle = '#ff00ff';
        g.fillRect(LAB_STAMP[0], LAB_STAMP[1], 1, 1);
        g.restore();
        return true;
      } catch (e) { return false; }
    }

    /** 回放前的验戳。
        true = 层里还有内容，可以放心回放；false = 层已经空了，调用方去重算。 */
    function labelLayerAlive() {
      if (labBad || !labLayer || !labLayer.g || !labelCache || !labelCache.stamp) return false;
      try {
        var d = labLayer.g.getImageData(LAB_STAMP[0], LAB_STAMP[1], 1, 1).data;
        return d[3] > 0;
      } catch (e) {
        return true;      // 读不出来（少见）⇒ 别误判成空，照旧回放
      }
    }

    /** 「名字集合」的指纹：任一项变了 ⇒ 离屏层里那块内容已经不代表现在，必须重算。
        覆盖面 = 特殊标签（选中 → 悬停 → 搜索命中，见 reserveSpecialLabels 的 rank 0/1/2）
        + 「名称」开关（关掉时 drawLabels 不画，节点名整批消失）+ 画布语言（labelShow 换了）
        + `sigEpoch`（可见集合变了：藏点 / 主干模式 / 分层 / 并入外部内容包 ——
          这些都不改上面那几项，但会改「该画哪些名字」）。 */
    function labelSig() {
      /* ⚠️ 选中**两条都要**：focus 是 node 时是 rank 0 的特殊标签，
         是 edge 时虽然自己不出标签，但 alphaForNode 会把无关的点压暗 ⇒ 名字的 alpha 也变。 */
      var f = view.focus ? (view.focus.type + ':' + view.focus.id) : '';
      var h = (view.hover && view.hover.type === 'node') ? view.hover.id : '';
      var s = view.searchIds ? Object.keys(view.searchIds).join(',') : '';
      return f + '|' + h + '|' + s + '|' + (C.showLabels ? '1' : '0') + '|'
        + (MG.displayLang || 'zh') + '|' + sigEpoch;
    }

    /** 回放：把离屏标签层整块按 (dx,dy) 搬一次 —— 零测量、零避让、零重排 */
    function replayLabels(dx, dy) {
      blitLabels(dx, dy);
      /* HUD 的「标签 N 条」把回放出来的也算上（离屏层里画了几条，重算时数过） */
      var n = labelCache.count || 0;
      prof.labelCount += n;
      prof.labelReplay += n;
    }

    /** 统一入口：四类名字一次画完（顺序 = 避让优先级：板块 → 领域 → 星团 → 节点）
        画进**离屏标签层**，再贴回主画布（见上面那段注释）。 */
    function drawAllNames() {
      var c = camNow();
      /* ⚠️ 先取上一帧机位再覆盖：本帧要判的是「这一帧相机动没动」 */
      var prevCam = labelPrevCam;
      labelPrevCam = { k: c.k, tx: c.tx, ty: c.ty };
      var sig = labelSig();
      if (labelCache && labLayer && labLayer.g && labLayer.dpr === dpr && labelCache.k === c.k &&
          labelCache.w === W && labelCache.h === H && labelCache.sig === sig) {
        /* ⭐⭐ 机位与**重算那一帧**逐位相同 ⇒ 这一层就是为这一屏算的，直接贴，不重算。
           ⛔ 旧实现在这种情况下（dx=dy=0）往下走去重算 ⇒ 同一机位每重画一帧都要
              重新量宽度 + 重新避让 + 重新落笔。app 的循环虽然是 on-demand 的，
              但相机一停还有一堆人会触发重画（烘焙补带 / 收尾 / hover 之外的零星重画），
              每来一帧就是一次全量标签重算。贴缓存后这些帧只剩一次 drawImage。 */
        if (labelCache.tx === c.tx && labelCache.ty === c.ty) {
          if (labelLayerAlive()) { replayLabels(0, 0); return; }
        } else {
          var dx = c.tx - labelCache.tx, dy = c.ty - labelCache.ty;
          /* ② 累计位移超过**离屏层余量**或半屏 ⇒ 再往外那一块压根没画过（它从来没被测量/避让） */
          var vw = c.viewW || W, vh = c.viewH || H;
          var limX = Math.min(vw * 0.5, LAB_MARGIN * 0.9);
          var limY = Math.min(vh * 0.5, LAB_MARGIN * 0.9);
          var far = Math.abs(dx) > limX || Math.abs(dy) > limY;
          /* ③ 本帧机位 == 上一帧机位 ⇒ 相机停了，这帧就该重算一次
             （松手 / 滚轮去抖 / 动画收尾）。重算完缓存就落在这个机位上，
             下一帧起走上面那条 `tx/ty 相同 ⇒ 直接贴`。 */
          var stopped = !!(prevCam && prevCam.k === c.k && prevCam.tx === c.tx && prevCam.ty === c.ty);
          /* ⑤ **层还在不在**：离屏 canvas 不在 DOM 里，浏览器内存吃紧时可以把它回收成
             一张空白画布，而缓存里的 count 还说自己有内容 ⇒ 以前会一直贴一张空图，
             屏幕上一个字都没有。这里按实物（1×1 的戳）验，验不过就落到重算。 */
          if (!far && !stopped && labelLayerAlive()) { replayLabels(dx, dy); return; }
        }
      }
      /* 重算。
         ⛔⛔ **先让缓存失效，再动离屏层**：下面先 clearRect 再画，万一画到一半抛异常
             （平板 roundRect、内存不足……），缓存绝不能还说自己「有效、可以回放」——
             否则下一帧会把一张画了一半/全空的层贴出去，而且之后每一帧都照贴，
             屏幕上就是「节点和线都在、文字整块消失」。 */
      labelCache = null;
      var L = ensureLabelLayer();
      var g = L.g;
      if (!g) {                              // 拿不到 2d context（内存不足）：退化成每帧直接画
        labBad = true;
        drawNamesDirect();
        return;
      }
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.clearRect(0, 0, L.cv.width, L.cv.height);
      g.setTransform(dpr, 0, 0, dpr, L.ox, L.ox);
      labelBase = prof.labelCount;
      var before = prof.labelCount;
      /* ⚠️ 只在这一段里把 ctx 换成离屏层的 context：四个绘制函数（含 roundPath 画的
          圆角底框、手动字距、alpha、避让）**一行都不改**。drawStatic 也是这么换 ctx 的。 */
      var saveCtx = ctx;
      var ok = true;
      ctx = g;
      try {
        drawNamesGroup();
      } catch (err) {
        ok = false;
      } finally {
        ctx = saveCtx;
      }
      if (!ok) {
        /* 这一趟废了：层是空的/画了一半，⛔ 绝不贴它。这一帧改成实时画，下一帧自然重试。 */
        labBad = true;
        labelBase = prof.labelCount;
        nameBoxes.length = 0;                // 失败那趟可能已经塞了一半避让框
        drawNamesDirect();
        return;
      }
      labBad = false;
      if (!stampLabelLayer()) {              // 连戳都画不上去 ⇒ 这层不可信，走实时画
        labBad = true;
        nameBoxes.length = 0;
        drawNamesDirect();
        return;
      }
      labelCache = { k: c.k, tx: c.tx, ty: c.ty, w: W, h: H, sig: sig,
        count: prof.labelCount - before, stamp: 1 };
      prof.labelRecalc++;
      blitLabels(0, 0);
    }


    /* ⭐⭐ 2026-10-20 **名字归属与视口无关**（用户指出的机制）：
       原来「谁画名字」是在**本帧已放置的名字**之间做避让 ⇒ A 是否出现取决于
       B 此刻在不在屏内；平移到边缘时 B 出屏、A 冒出来，再移回来 A 又消失 —— 看着像闪。
       现在按**世界空间**算一次归属：按优先级从高到低，若自己标签框的世界范围内
       没有更高优先级的节点，就独占这个名字。只看布局与优先级、不看相机 ⇒
       平移不改变归属；缩放换档（k 每 2.5% 一档）才重算。
       ⛔ 屏幕空间避让仍保留（真重叠才跳过），只是不再由它决定「谁有资格」。 */
    var ownCache = { key: '', set: null };
    /* ⭐ 2026-10-20 字号按**世界空间拥挤度**定档（与相机无关 ⇒ 平移不改字号）。 */
    var ownSizeMap = Object.create(null);
    function labelOwnSet(k) {
      var key = Math.round(k * 40) + '|' + (MG.displayLang || 'zh') + '|' + (C.showLabels ? 1 : 0);
      if (ownCache.key === key) return ownCache.set;
      var kk0 = Math.max(0.02, k);
      var ns = view.graph.nodes.slice().sort(function (a, b) {
        return (labelPriority(b) - labelPriority(a)) || (a.id < b.id ? -1 : 1);
      });
      var cell = Math.max(6, (C.node.labelSize + 12) / kk0);
      var grid = Object.create(null), set = Object.create(null);
      ns.forEach(function (n) {
        var txt = n.labelShow || n.label;
        if (!txt) return;
        var wW = (txt.length * C.node.labelSize * 0.95 + C.node.labelPad * 2) / kk0;
        var hW = (C.node.labelSize + 6) / kk0;
        /* ⭐ 2026-10-20：归属判定按**可缩小后的尺寸**算 —— 屏幕层的避让已经会缩到 68%，
           归属若仍按全尺寸卡，就会有一批名字永远拿不到资格（用户：「必须放到最大才看得见」）。 */
        var R = Math.max(wW, hW) * 0.68;
        /* ⭐ 2026-10-20 用户报「明明不冲突却没有名字」：原来用 max(R) 的**方框**判重叠，
           等于把标签当正方形、边长取最长边 ⇒ 过度保守。这里按真·矩形相交判（半宽之和 + 半高之和）。 */
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
      ownCache = { key: key, set: set };
      /* 拥挤度 → 字号档：离最近邻居越远，名字可以越大；与世界空间绑定，平移不变。 */
      (function fillSize() {
        var acc = [];
        for (var q = 0; q < ns.length; q++) if (set[ns[q].id]) acc.push(ns[q]);
        for (var a1 = 0; a1 < acc.length; a1++) {
          var A1 = acc[a1], best = 1e9;
          for (var a2 = 0; a2 < acc.length; a2++) {
            if (a1 === a2) continue;
            var B1 = acc[a2];
            var dd = Math.max(Math.abs(B1.x - A1.x), Math.abs(B1.y - A1.y));
            if (dd < best) best = dd;
          }
          var txtLen = (A1.labelShow || A1.label || '').length;
          var Rn = Math.max(8, txtLen * C.node.labelSize * 0.95) / Math.max(0.02, k);
          var ratio = best < 1e8 ? best / Rn : 9;
          ownSizeMap[A1.id] = ratio < 1.25 ? 0.72 : (ratio < 1.6 ? 0.85 : 1);
        }
      })();
      return set;
    }


    /** 框是否撞到已放置的框（撞到就返回那个框） */
    function hitOf(box, list) {
      for (var i = 0; i < list.length; i++) {
        var b = list[i];
        if (box.x0 < b.x1 && box.x1 > b.x0 && box.y0 < b.y1 && box.y1 > b.y0) return b;
      }
      return null;
    }

    function drawLabels() {
      /* 特殊标签（选中 / 悬停 / 搜索命中）**先画**：它们在 reserveSpecialLabels()
         里已经占好位，普通名字不会压上去。 */
      drawReservedLabels();

      var k = view.cam.k;
      var fs = labelFont();
      // 连主干的名字都还没到出现的时候 → 只剩上面那几个特殊标签
      if (lodA.nodeName <= 0.02 && lodA.trunkName <= 0.02) return;

      // 缩得很小时只留「重要」节点的名字；重叠的名字一律让位（永远去重叠）
      /* ⭐ 标签密度分档（用户 2026-10-18：「一个领域内部名字太密，看不清团名」）：
         · 星团档（tier 2，团名正亮着）⇒ 只放**结构性**的点（主干 / 枢纽 / 度数 ≥5），
           把版面让给团名；
         · 节点档（tier ≥3，团名正在退场）⇒ 放宽到度数 ≥3；
         · 再放大（k ≥ labelMinZoomAll）⇒ 全放，只靠去重叠兜底。
         ⚠️ 判据用 `lodA.tier`（和板块名 / 领域名 / 团名同一套档位），不另起一套阈值。 */
      var tier = lodA.tier | 0;
      var allNames = k >= C.node.labelMinZoomAll;
      var minDeg = allNames ? 1 : (tier >= 3 ? 3 : 5);
      // 板块 / 领域 / 星团名 + 特殊标签先占位 —— 节点名不许压上去
      /* 结构性名字（板块 / 领域 / 星团）自己带一圈禁入边距：节点名压到它们边上时，
         那个大标题会被读成一团糊。只在这里膨胀，⛔ 不去改 nameBoxes 本身
         （placeName 还要拿原框判「大标题之间」的避让）。 */
      var placed = nameBoxes.map(function (b) {
        var q = b.pad || 0;
        if (!q) return b;
        return { x0: b.x0 - q, y0: b.y0 - q, x1: b.x1 + q, y1: b.y1 + q, rank: b.rank };
      });
      /* ⭐ 本帧的**画名顺序** = 避让顺序，两级：
         ① **严格屏内**的节点先（用户此刻真的看得见的）；
         ② 再按 labelPriority（主干 / 枢纽 / 选中 / 悬停 / 搜索命中 / 度数）。
         ⛔⛔ 为什么必须加 ①：预算一旦掐，掐掉的应该是「离屏余量（PAD_NODE=220px）里
            那些只为平移预览准备的名字」，绝不能是用户正看着的那一批。
            旧实现只按全局优先级排，余量里的高节点照样抢预算 —— 实测 dpr2 1200×640、
            r=8 时预算画满 120 条，**严格屏内只有 43 条**有名字（另 77 条画在了屏外）。
         ⭐ 顺带把 labelPriority / screenOf 各算一次存进数组：旧实现对每个节点
            在排序里反复调 labelPriority（≈20 次/节点/帧）。 */
      var order = [], allNodes = view.graph.nodes, oi, oN, oS;
      /* ⭐⭐ 2026-10-20：排序第一关键字从「**节点中心**在不在屏内」改成
         「**那个名字**在不在屏内」。原来的判据是代理指标，不是实体：
         · 名字画在节点下方 `r + labelOffset`、左右各伸出 `tw/2 + labelPad`，
           所以「中心刚出屏 1px」的节点，它的名字其实**整条都还看得见**，
           却被降进「离屏余量」那一批（排在所有屏内节点之后、先被预算掐掉）；
         · 反过来，中心还在屏内、名字却已经整条出屏的节点却占着屏内的名额。
         这么一换，边界抖动从「节点中心过线」变成「名字真的出屏」——平移时不再
         有几百个节点在排序里整体跳档（用户 2026-10 报的「同一名字换机位就没了」）。
         ⚠️ 量宽度只在 PAD_NODE 余量内做；`measure` 有缓存（键含 font 与语言），
            第二次起是哈希查找，不是每帧重排 910 次文字。
         ⭐⭐ 2026-10-2x：框一律走 `nameSpot()` —— **和落笔同一个实现**。贴边夹回画布
            之后，下边缘的名字会翻到节点上方（从「屏外」变成「屏内」）、左右边缘的
            名字会平移；排序判据不跟着走的话，它们会被当成余量里的名字排到最后。 */
      ctx.font = '600 ' + fs + 'px ' + T.font;
      for (oi = 0; oi < allNodes.length; oi++) {
        oN = allNodes[oi];
        oS = screenOf(oN);
        var onI = 0;
        if (oS.x > -PAD_NODE && oS.x < W + PAD_NODE && oS.y > -PAD_NODE && oS.y < H + PAD_NODE) {
          var bI = nameSpot(oS.x, oS.y, nodeRadius(oN),
            measure(ctx, oN.labelShow || oN.label, ctx.font), fs, k).box;
          onI = (bI.x1 > 0 && bI.x0 < W && bI.y1 > 0 && bI.y0 < H) ? 1 : 0;
        }
        order.push({
          n: oN, x: oS.x, y: oS.y,
          on: onI,
          p: labelPriority(oN)
        });
      }
      order.sort(function (a, b) { return (b.on - a.on) || (b.p - a.p); });

      var reserved = Object.create(null);
      reservedLabels.forEach(function (L) { reserved[L.id] = 1; });

      /* ---- 预算 & 诊断分项（探针读 labelStat()：这一趟到底为什么少了一堆名字） ---- */
      var st = labelStat;
      st.structural = prof.labelCount - labelBase;      // 本趟结构性名字 + 特殊标签已经画掉几条
      st.budget = nodeNameBudget();
      st.cand = 0; st.drawn = 0;
      st.cutBudget = 0; st.cutAvoid = 0; st.cutTier = 0; st.cutOff = 0;
      st.cutAlpha = 0; st.cutHidden = 0; st.cutSpecial = 0;
      if (labelTraceOn) labelTraceMap = Object.create(null);
      var miss = labelTraceOn ? function (id, why, ex) {
        var rec = { why: why }, q;
        if (ex) { for (q in ex) if (Object.prototype.hasOwnProperty.call(ex, q)) rec[q] = ex[q]; }
        labelTraceMap[id] = rec;
      } : null;
      /* 本帧**节点名**已经画上去几条 —— 预算只数它。
         ⛔ 旧口径是 `prof.labelCount - labelBase`：labelCount 是跨帧累加的 HUD 口径，
            而 labelBase 只在重算开头刷新；更要紧的是它**把结构性名字算进去了**
            （板块名 + 领域名 + 团名 + 特殊标签先画，一样占预算）——
            实测平板 r=3.6：预算 120，结构性名字先吃掉 58 条 ⇒ 节点名实际只有 62 条。 */
      var nodeDrawn = 0;

      ctx.font = '600 ' + fs + 'px ' + T.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      order.forEach(function (it, ord) {
        var n = it.n, p = it;
        /* 诊断读数：只在开启 trace 时分配（关着的时候 ex 是 null，热路径上一个分支都没有） */
        var ex = miss ? {
          ord: ord, cand: 0, prio: p.p, on: p.on, x: p.x, y: p.y,
          alpha: alphaForNode(n.id), nx: 0, ny: 0, box: null, blocker: null,
          /* 走到这一步时本帧已经画了几条 + 预算是多少 —— 「离预算边界还有几条」就靠这两个数 */
          nodeDrawn: nodeDrawn, budget: st.budget
        } : null;
        if (reserved[n.id]) { st.cutSpecial++; if (miss) miss(n.id, 'special', ex); return; }
        if (!nodeOk(n.id)) { st.cutHidden++; if (miss) miss(n.id, 'hidden', ex); return; }
        var trunk = isTrunk(n);
        // 主干的名字用更早出现的那条曲线；其余仍按原节奏
        var nameAlpha = trunk ? Math.max(lodA.nodeName, lodA.trunkName) : lodA.nodeName;
        if (nameAlpha <= 0.06) { st.cutAlpha++; if (miss) miss(n.id, 'fade', ex); return; }
        var a = alphaForNode(n.id);
        if (a <= 0.06) { st.cutAlpha++; if (miss) miss(n.id, 'dim', ex); return; }
        // 缩小时只画重要的：主干一律画，其余按上面那三档
        if (!trunk && !allNames && !n.isHub && n.degree < minDeg) {
          st.cutTier++; if (miss) miss(n.id, 'tier', ex); return;
        }

        if (!inView(p.x, p.y, PAD_NODE)) { st.cutOff++; if (miss) miss(n.id, 'off', ex); return; }
        st.cand++;
        if (ex) ex.cand = st.cand;
        /* 归属与视口无关：不独占就不画（见 labelOwnSet）。主干/枢纽/选中/悬停/搜索命中不受限。 */
        if (!labelMustDraw(n) && !labelOwnSet(k)[n.id]) {
          st.cutOwn = (st.cutOwn || 0) + 1;
          if (miss) miss(n.id, 'own', ex);
          return;
        }
        /* ⭐⭐ 每帧节点名预算：按**可用面积**给（见 nodeNameBudget），只数真的画上去的节点名，
           而且**主干 / 枢纽 / 选中 / 悬停 / 搜索命中永远不吃预算**（labelMustDraw）。
           背景（用户 2026-10 在平板上报「一半节点名一直不显示，换个机位换一批」）：
           旧口径 max(70, viewW/10) 在 1200 CSS 宽上只有 120 条，还先被结构性名字吃掉一半 ⇒
           实测 r=4 时严格屏内 462 个点里只有 39 个有名字（8.4%），r=8 时 43/100。
           名字缺不缺跟相机停在哪有关、跟等多久无关 —— 正是这个确定性的截断。 */
        if (nodeDrawn >= st.budget && !labelMustDraw(n)) {
          st.cutBudget++;
          if (miss) { ex.nodeDrawn = nodeDrawn; ex.budget = st.budget; miss(n.id, 'budget', ex); }
          return;
        }
        var r = nodeRadius(n);
        var text = n.labelShow || n.label;         // ⭐ T2.4：节点名跟语言走（启动时算一次）
        var _sz = (n.trunk || n.isHub) ? 1 : (ownSizeMap[n.id] || 1);
        if (_sz < 0.99) {
          fs = Math.round(Math.max(8, fs * _sz) * 10) / 10;
          ctx.font = ctx.font.replace(/(\d+(?:\.\d+)?)px/, fs + 'px');
        }
        var tw = measure(ctx, text, ctx.font);
        var spot = nameSpot(p.x, p.y, r, tw, fs, k);   // ⭐ 贴边夹回画布（见 nameSpot）
        var x = spot.x, y = spot.y;
        var box = { x0: spot.box.x0, y0: spot.box.y0, x1: spot.box.x1, y1: spot.box.y1,
          id: n.id, kind: 'node' };

        var hit = hitOf(box, placed);
        /* ⭐⭐ 2026-10-20 用户要求：**撞了先缩字号，缩到底还不下才不画**。
           以前一撞直接 return，于是有些名字必须放到最大才看得见。
           最多缩到 10px（再小读不出）；每档重新量宽、重算框、重新判避让。 */
        if (hit) {
          var fontBase = ctx.font;
          var tries = [];   /* 2026-10-20 停用：按本帧碰撞缩字号会让平移时字号乱跳（用户报） */
          for (var ti = 0; ti < tries.length; ti++) {
            var fs2 = Math.round(Math.max(10, fs * tries[ti]) * 10) / 10;
            if (fs2 >= fs - 0.05) break;
            ctx.font = fontBase.replace(/(\d+(?:\.\d+)?)px/, fs2 + 'px');
            var tw2 = measure(ctx, text, ctx.font);
            var sp2 = nameSpot(p.x, p.y, r, tw2, fs2, k);
            var bx2 = { x0: sp2.box.x0, y0: sp2.box.y0, x1: sp2.box.x1, y1: sp2.box.y1,
              id: n.id, kind: 'node' };
            var h2 = hitOf(bx2, placed);
            if (!h2) { fs = fs2; tw = tw2; spot = sp2; x = sp2.x; y = sp2.y; box = bx2; hit = null; fontBase = ctx.font; break; }
          }
          ctx.font = fontBase;
        }
        if (hit) {
          st.cutAvoid++;
          if (miss) {
            ex.nx = x; ex.ny = y; ex.box = box;
            ex.blocker = {
              id: hit.id || '', kind: hit.kind || ('rank' + hit.rank),
              rank: hit.rank == null ? -1 : hit.rank,
              x0: hit.x0, y0: hit.y0, x1: hit.x1, y1: hit.y1
            };
            miss(n.id, 'avoid', ex);
          }
          return;
        }
        placed.push(box);

        var alpha = a * 0.92 * nameAlpha;
        ctx.lineWidth = Math.max(2.5, fs * 0.28);
        ctx.strokeStyle = 'rgba(255,255,255,' + (0.9 * alpha).toFixed(3) + ')';
        ctx.strokeText(text, x, y);
        ctx.fillStyle = 'rgba(28,28,30,' + alpha.toFixed(3) + ')';
        ctx.fillText(text, x, y);
        prof.labelCount++;                    // 节点名：真正画上去了才算一条
        nodeDrawn++;
        st.drawn++;
        if (miss) { ex.nx = x; ex.ny = y; ex.box = box; miss(n.id, 'drawn', ex); }
      });
    }

    /** 每帧节点名预算：按**可用面积**给，不再按 `viewW / 10`。
        · 一个名字盒子约 60×20 CSS px，避让留隙按 1.6 倍算 ⇒ 2600 px²/条；
        · 1200×640（平板）⇒ **295** 条（旧口径 120）；
          1576×808（作者机器）⇒ 490 → 封顶 **460**（旧口径 157）。
        ⚠️ 故意**不按 dpr 缩**：dpr 只影响「画一条多贵」，不影响「屏上放得下几条」。
           省开销要靠「相机没动就直接贴缓存」（见 drawAllNames 的 atCache 分支），
           而不是靠少画名字 —— 旧实现正是拿少画名字当性能手段，代价是一半节点永远没名字。
        ⚠️ 到底画几条仍由避让（placed[]）决定：名字互相压叠时宁可少画一个，
           这是既有设计（用户 2026-10-17 拍板）。预算只是**防爆上限**。
        ⭐⭐ 2026-10-20：**下限 140 → 200**（实测驱动，不是为了多画）。
           实测 430 CSS 宽（dpr2/3）的手机与平板：`vw*vh/2600` 只有 116~155，
           **每一趟都被夹到下限**，于是「防爆上限」变成了**真正的选择器** ——
           实测 k=0.30 时 `drawn` 恒等于预算（`avoid` 本可以放下 ~295 条）。
           而「几何能放下多少条」随一屏里有多少名字变化，截断线就跟着平移，
           从 `degree=1` 那一大堆**同分**节点里切过去（`labelPriority` 在 200+ 个
           节点上并列，排序只能回落到 `graph.nodes` 的数组顺序）—— 用户 2026-10 报的
           「同一个名字，这个机位有、换个机位就没了」正是这一类。
           抬到 200 后：实测「到达该叶子节点时已画条数」= 41~128（`_tools/_lab7.js`
           / `_lab8.js`），**离截断线还有 72~99 条**，平移那点波动（实测同屏内摆动
           约 ±40）根本够不到它 ⇒ 名字不再随平移闪。
           A 机位实测分项：预算掐掉的从 150 条降到 35 条、几何掐掉的从 79 涨到 139
           （`_v1.js`）—— 主裁从预算回到了几何，这正是上面那句注释原本的意思。
           ⛔ 不是「放宽到不避让」：`avoid` 一字未改，200 个已画名字框**两两重叠 0 对**
           （`_v1.js` 的 overlap 统计，改前改后都是 0）。 */
    function nodeNameBudget() {
      var c = camNow();
      var vw = c.viewW || W, vh = c.viewH || H;
      return Math.round(U.clamp(vw * vh / 2600, 200, 460));
    }

    /** 名字**永远不吃预算**的那一批：主干 / 枢纽 / 选中 / 悬停 / 搜索命中。
        用户 2026-10 拍板：「主干 / 枢纽 / 选中 / 悬停 / 搜索命中的名字永远不被预算掐掉」。
        ⚠️ 它们仍然过避让（放不下就让位，除非是 reserveSpecialLabels 预留的那几个）——
           这里只豁免**预算**这一条闸门。 */
    function labelMustDraw(n) {
      if (n.trunk || n.isHub) return true;
      var f = view.focus;
      if (f && f.id === n.id) return true;
      if (view.hover && view.hover.id === n.id) return true;
      return !!(view.searchIds && view.searchIds[n.id]);
    }

    function labelPriority(n) {
      var s = n.degree * 10;
      if (n.trunk) s += 400;                       // 主干的名字优先留下（去重叠时赢）
      if (view.focus && view.focus.id === n.id) s += 1000;
      if (view.hover && view.hover.id === n.id) s += 800;
      /* 搜索命中：排在选中 / 悬停之后、普通名字之前（同一屏里让「刚搜到的」先落位）。 */
      if (view.searchIds && view.searchIds[n.id]) s += 600;
      if (n.type === 'definition') s -= 6;
      return s;
    }

    /* ========================================================== 命中检测 */
    /* 当前缩放下这条边到底画不画 —— 与 drawEdgeOne / drawEdges 同一口径的近似。
       ⛔ 2026-10-19：用户报「看不见的线还能点到」。命中检测以前只看 alphaForEdge，
       完全不看缩放闸门，所以全景里那些没画的线照样能被点中并弹出面板。 */
    function edgeShown(g) {
      var e = g.edge, r = lodA.rRel || 1;
      if (C.showAllEdges) return true;
      if (e.kind === 'definition' && !C.showDefinitionLines) return false;
      if (GU.isWeak(e) && !C.exploreMode) return false;
      if (r < 1.35 && e.kind !== 'definition') return false;   // 全景不画黑线
      return true;
    }
    /* ⭐ 2026-10-19：长线降权改回**世界长度**（用户报：同一条线越放大越长、越淡、最后消失，
       而它两头都在视野里）。屏幕长度的惩罚由「一端在屏外」那一支负责，这里只看世界长度，
       这样任何缩放下同一条边的浓淡都是同一个值。 */
    function worldLen(e) {
      if (e._wlen != null) return e._wlen;
      var ids = GU.edgeNodes(e);
      var a0 = ids[0] && view.graph.byId[ids[0]], b0 = ids[1] && view.graph.byId[ids[1]];
      e._wlen = (a0 && b0) ? U.dist(a0.x, a0.y, b0.x, b0.y) : 0;
      return e._wlen;
    }
    function hitTest(sx, sy) {
      ensureGeom();
      // 先节点
      var best = null, bestD = Infinity;
      view.graph.nodes.forEach(function (n) {
        if (!nodeOk(n.id)) return;
        var a = alphaForNode(n.id);
        if (a <= 0.06) return;
        var p = screenOf(n);
        var r = nodeRadius(n) + 9;      // 给触摸留点余量
        var d = U.dist(sx, sy, p.x, p.y);
        if (d <= r && d < bestD) { bestD = d; best = { type: 'node', id: n.id }; }
      });
      if (best) return best;

      // 再连线
      var tol = C.edge.hitTolerance;
      var list = geomCache ? Object.keys(geomCache).map(function (k) { return geomCache[k]; }) : [];
      var hitEdge = null, hitD = Infinity;
      list.forEach(function (g) {
        if (!edgeShown(g)) return;
        // 弱边没开探索模式时不响应点击（它本来就几乎看不见）
        if (GU.isWeak(g.edge) && !C.exploreMode) return;
        var a = alphaForEdge(g.edge);
        if (a <= 0.06) return;
        g.polys.forEach(function (pts) {
          var d = U.pointPolylineDist(sx, sy, pts);
          if (d < tol && d < hitD) { hitD = d; hitEdge = g.edge.id; }
        });
        if (g.arrow) {
          var d2 = U.dist(sx, sy, g.arrow.x, g.arrow.y);
          if (d2 < tol + 6 && d2 < hitD) { hitD = d2; hitEdge = g.edge.id; }
        }
      });
      return hitEdge ? { type: 'edge', id: hitEdge } : null;
    }

    function invalidate() { geomCache = null; sectorPairCache = null; sigEpoch++; }

    return {
      resize: resize,
      draw: draw,
      hitTest: hitTest,
      invalidate: invalidate,
      nodeRadius: nodeRadius,
      screenOf: screenOf,
      drawStatic: drawStatic,                              // Phase A：烘焙入口
      setStaticHidden: setStaticHidden,                    // 为真时实时层不画静态部分
      setGlowLive: function (v) { glowLive = !!v; },        // 光晕改由实时层单独画
      setEnvLive: function (v) { envLive = !!v; },          // 包络改由实时层单独画（不进烘焙）
      setHoverFull: function (v) { hoverFull = !!v; },       // hover 甲支（入射边加宽）
      drawReadRings: drawReadRings,                          // 已读脉冲环 → #layer-read（见上）
      bbox: bbox,
      prof: prof,
      /* 诊断：最近一次标签重算的分项（候选 / 画出去 / 各闸门掐掉多少）+ 逐节点账本。
         ⛔ 只读；`setLabelTrace(true)` 才会为**每个节点**落一条记录（默认关，零分配）。
         ⭐ 2026-10-20：记录从「原因字符串」升级成对象 —— `{why, ord, cand, prio, on, x, y,
            nx, ny, alpha, box, blocker}`。要回答「谁把它挤掉的」必须能直接读到 blocker。
           ⛔ 旧的 `labelTrace()[id] === 'avoid'` 写法请改成 `.why`。 */
      labelStat: function () { return labelStat; },
      setLabelTrace: function (on) { labelTraceOn = !!on; if (!labelTraceOn) labelTraceMap = null; return labelTraceOn; },
      labelTrace: function () { return labelTraceMap; },
      /* 诊断：逐边 alpha 账本（默认关、零分配）。返回 { [edgeId]: {why,kind,r,lenPx,wlen,a0,a,inside} } */
      setEdgeTrace: function (on) {
        edgeTraceOn = !!on;
        edgeTraceMap = edgeTraceOn ? Object.create(null) : null;
        return edgeTraceOn;
      },
      edgeTrace: function () { return edgeTraceMap; },
      /* 诊断用：节点名的**每帧预算**（和画的那一趟同一个函数，⛔ 别在探针里另算一遍） */
      labelBudget: function () { return nodeNameBudget(); },
      /* 诊断用：当前帧的 LOD 读数（档位 / 三档名字 / 定义线系数）。
         ⚠️ 只读快照，别拿它当状态改 —— holdTier 的真源在 computeLod 里。 */
      fitZoom: fitZoom,                                  // 给 paintKey 现算 r=k/kFit 用
      lodState: function () {
        return {
          k: camNow().k, rRel: lodA.rRel || 1,
          tier: lodA.tier, sector: lodA.sectorName, region: lodA.galaxyName,
          cluster: lodA.clusterName, defDim: lodA.defDim, nodeName: lodA.nodeName,
          /* 下面这些是 2026-10-18 加的：判「全景还是一条网吗」「导出计数对不对」要读它们 */
          trunkName: lodA.trunkName, clusterLink: lodA.clusterLink,
          /* 2026-10-2x：判「黑线为什么淡了」要读的两个喂给 alpha 的系数 */
          nodeEdge: lodA.nodeEdge, edgeFloor: lodA.edgeFloor,
          labelCount: prof.labelCount
        };
      },
      profReset: function () { prof.edges = 0; prof.nodes = 0; prof.labels = 0; prof.labelCount = 0; prof.labelReplay = 0; prof.labelRecalc = 0; prof.frames = 0; },
      get size() { return { w: W, h: H }; }
    };
  }

  MG.createRenderer = createRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
