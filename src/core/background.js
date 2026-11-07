/* ==========================================================================
   数学星图 · 电子云背景
   --------------------------------------------------------------------------
   每个数学板块（region）在背景里渲染一团半透明彩色云雾：
     · 一朵中心大雾 + 若干随机分布的软斑 + 每个节点周围的小斑
     · 越靠近板块边界越淡（斑块本身是径向渐变，中心浓、边缘透明）
     · 整块云先画在世界坐标的一张离屏纹理上，再随相机一起缩放绘制
       → 拖动/缩放时只做一次 drawImage，性能稳定
   页面大背景仍然是纯白。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});
  var U = MG.util;

  /**
   * 建一张覆盖全部内容的云雾纹理。
   * isVisible 可选：藏起来的点不再往云里加斑；整团都藏光 → 连云一起收掉。
   * （所以「只看测度论」时，背景也跟着瘦成那一块，不会有空云飘着）
   */
  function buildTexture(graph, isVisible) {
    var bc = MG.config.background;
    var ok = isVisible || function () { return true; };
    var bb = graph.bbox();

    /* 手机竖屏：同样的世界半径在适配档只占 3~5 个 CSS 像素，
       150 世界单位的节点云会互相糊成一块一块的大色斑。
       这里按视口宽度把节点撒点半径压到 0.62，并把浓度补回去；
       纹理只建一次，所以用建纹理时的视口判断即可。 */
    var mobile = !!(window.matchMedia && window.matchMedia('(max-width: 700px)').matches);
    var splatK = mobile ? 0.42 : 1;
    var nodeA = mobile ? 2.6 : 1;
    var regionK = mobile ? 0.86 : 1;

    var pad = 300;
    var minX = bb.minX - pad, minY = bb.minY - pad;
    var maxX = bb.maxX + pad, maxY = bb.maxY + pad;
    var w = (maxX - minX) * bc.dilate;
    var h = (maxY - minY) * bc.dilate;
    minX -= (w - (maxX - minX)) / 2;
    minY -= (h - (maxY - minY)) / 2;

    /* 纹理分辨率：按世界尺寸自适应。
       ⚠️ 曾固定成 1024×768（还按 4:3 硬拉成一块方形的世界区域 ⇒ 撒点被拉成椭圆），
       实际只有 6.9 世界单位/像素；同样的世界尺寸下，配置里的 texScale 是 0.19。
       现在按 texScale 取，再用 maxSide / maxPixels 兜底 —— 既拿到像素预算内的细节，
       又不会超 GPU 纹理上限（部分环境只有 4096）或吃出几十 MB 内存。 */
    var maxSide = bc.texMaxSide || 2048;
    var maxPx = bc.texMaxPixels || 4200000;
    var sr = Math.min(bc.texScale || 0.19,
      maxSide / Math.max(w, h),
      Math.sqrt(maxPx / (w * h)));
    sr = Math.max(0.02, sr);
    var TW = Math.max(128, Math.round(w * sr));
    var TH = Math.max(128, Math.round(h * sr));
    var sx = TW / w, sy = TH / h;

    var cv = document.createElement('canvas');
    cv.width = TW; cv.height = TH;
    var ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.globalCompositeOperation = 'lighter';
    /* 世界坐标 → 纹理像素。下面一律用世界单位画（渐变的半径也交给 CTM 缩放），
       不再手算 scx/scy —— 分辨率改了也不会漏改一处。 */
    ctx.setTransform(sx, 0, 0, sy, -minX * sx, -minY * sy);

    /* ⭐ 领域大云：整块领域的色底（每节点小雾只够做颗粒）。 */
    (graph.regions || []).forEach(function (reg) {
      if (!reg.stat) return;
      var rgb0 = U.hexToRgb(reg.color || '#7A8699');
      var pr0 = Math.max(4, reg.stat.radius * 1.02 * regionK);
      var g0 = ctx.createRadialGradient(reg.stat.cx, reg.stat.cy, 0, reg.stat.cx, reg.stat.cy, pr0);
      var s0 = rgb0.r + ',' + rgb0.g + ',' + rgb0.b + ',';
      g0.addColorStop(0, 'rgba(' + s0 + '0.085)');
      g0.addColorStop(0.45, 'rgba(' + s0 + '0.055)');
      g0.addColorStop(0.72, 'rgba(' + s0 + '0.022)');
      g0.addColorStop(0.88, 'rgba(' + s0 + '0.008)');
      g0.addColorStop(1, 'rgba(' + s0 + '0)');
      ctx.fillStyle = g0;
      ctx.beginPath(); ctx.arc(reg.stat.cx, reg.stat.cy, pr0, 0, Math.PI * 2); ctx.fill();
    });
    /* ⭐ 节点泼溅：加法叠加成密度场（颜色 = 各领域色按落点叠加，浓淡由 Σalpha 给出）。 */
    var drawn = 0;
    (graph.nodes || []).forEach(function (n) {
      if (!ok(n.id)) return;
      var rid = (n.regions && n.regions[0]) || '';
      var reg = graph.regionById && graph.regionById[rid];
      var hex = (reg && reg.color) || '#7A8699';
      var rgb = U.hexToRgb(hex);
      var pr = Math.max(2, (bc.splatRadius == null ? 150 : bc.splatRadius) * splatK);   // 世界单位
      var gC = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr);
      /* ⚠️ 曲线必须有「尾巴」：以前是 0.05 → 0 的直线渐变，单个撒点的边缘是一条
         斜率突变（−a/R → 0）的圆弧 —— 1540 个叠起来，每个都留下一个看得见的圆边，
         整片云像一堆肥皂泡（用户原话「看着星云有点难看」）。
         这里在 0.78 之后把透明度压到 0.014 → 0.005 → 0，斜率平滑接到 0。 */
      gC.addColorStop(0, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (0.050 * nodeA) + ')');
      gC.addColorStop(0.35, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (0.042 * nodeA) + ')');
      gC.addColorStop(0.60, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (0.028 * nodeA) + ')');
      gC.addColorStop(0.78, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (0.014 * nodeA) + ')');
      gC.addColorStop(0.90, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (0.005 * nodeA) + ')');
      gC.addColorStop(1, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0)');
      ctx.fillStyle = gC;
      ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI * 2); ctx.fill();
      drawn++;
    });

    /* ⭐ 粒子化：把密度场的**低密度尾巴**改成离散颗粒。
       原来整片云都是连续 alpha ⇒ 最外侧一圈是一条浓度平滑掉到 0 的「边」，
       放大看是一整块糊雾的硬轮廓。现在按 alpha 决定保留概率：
       中心（α ≥ particleEdge）保持连续；越往外点越稀，到 α→0 时几乎只剩零星颗粒。
       期望墨量保持不变（out = A^γ · α^(1−γ)，p = (α/A)^γ），所以整体浓淡不变，
       只是边缘从「一条边」变成「一层散开的粒子」。

       ⚠️ 顺序必须是「先模糊、后点粒子」：早先把 stipple 放在 smoothTexture 之前，
       每个粒子只有 2~4 texel，再被 blur(1.6) 抹平 ⇒ 屏幕上根本看不出颗粒，
       等于白做。现在雾先糊好、dither 抹掉，再在干净的雾上戳粒子。 */
    var tex = smoothTexture(cv, bc.texBlur == null ? 1.6 : bc.texBlur);
    var tctx = tex.getContext('2d');
    var img = tctx.getImageData(0, 0, tex.width, tex.height);
    stipple(img.data, tex.width, tex.height, bc, sx);
    tctx.putImageData(img, 0, 0);

    return {
      canvas: tex,
      x: minX, y: minY, w: w, h: h,
      scale: 1,
      regions: drawn,
      clusters: 0
    };
  }

  /**
   * 把密度场外侧的低 alpha 区打散成粒子。
   * 在 texel 网格上取格子（世界尺寸 ≈ particleCell）：格内 alpha 决定「这里留不留粒子、
   * 留多亮」，粒子的**位置用哈希抖动**，不落在格心 —— 否则整片云是一张规则的网点纸
   * （实测：不抖动时 k=0.5 看上去像印刷半调）。粒子是带余弦衰减的圆点，不是方块。
   * 哈希按格子坐标算：同一张图每次建纹理都长一样，不会抖。
   */
  function stipple(d, W, H, bc, sx) {
    var edge = bc.particleEdge == null ? 0.10 : bc.particleEdge;
    if (!(edge > 0)) return;
    var gamma = bc.particleGamma == null ? 0.75 : bc.particleGamma;
    var cell = Math.max(2, Math.round((bc.particleCell || 6) * sx));
    var A = Math.max(1, Math.min(255, Math.round(edge * 255)));
    var Ag = Math.pow(A / 255, gamma);
    var invA = 1 / A;
    var rad = cell * 0.46;
    var rad2 = rad * rad;
    var half = cell * 0.5;
    var cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
    var dots = new Uint8Array(cols * rows);   // 每格决定：0 = 不留粒子，否则 = 粒子中心 alpha

    /* 第 1 遍：在**原始** alpha 上做决定（抖动点取原图，不能先抹再取）。 */
    for (var gy = 0, gyi = 0; gy + cell <= H; gy += cell, gyi++) {
      for (var gx = 0, gxi = 0; gx + cell <= W; gx += cell, gxi++) {
        var jx = gx + half + (hash01(gx + 11, gy + 3) - 0.5) * cell * 0.9;
        var jy = gy + half + (hash01(gx + 47, gy + 29) - 0.5) * cell * 0.9;
        var px = Math.min(W - 1, Math.max(0, Math.round(jx)));
        var py = Math.min(H - 1, Math.max(0, Math.round(jy)));
        var a = d[((py * W + px) << 2) + 3];
        if (!a || a >= A) continue;             // 内部：保持连续的雾
        var af = a / 255;
        var p = Math.pow(af * 255 * invA, gamma);   // 保留概率
        if (hash01(gx + 101, gy + 197) >= p) continue;
        dots[gyi * cols + gxi] = Math.max(1, Math.round(255 * Ag * Math.pow(af, 1 - gamma)));
      }
    }

    /* 第 2 遍：把连续雾里 alpha 低于阈值的那部分**抹掉** —— 否则边缘仍是那层糊雾，
       粒子只是加在上面（第一版就是这个病：4× 放大看，粒子背后还有一条连续的边）。
       逐像素按真实 alpha 抹，边界沿着浓度等值线走，不是格子的台阶。 */
    for (var i = 3; i < d.length; i += 4) if (d[i] < A) d[i] = 0;

    /* 第 3 遍：把留下的粒子盖成带余弦衰减的圆点（可能压到相邻格子，只取更亮的值）。 */
    for (var ry = 0, ryi = 0; ry + cell <= H; ry += cell, ryi++) {
      for (var rx = 0, rxi = 0; rx + cell <= W; rx += cell, rxi++) {
        var na = dots[ryi * cols + rxi];
        if (!na) continue;
        var dx0 = rx + half + (hash01(rx + 11, ry + 3) - 0.5) * cell * 0.9;
        var dy0 = ry + half + (hash01(rx + 47, ry + 29) - 0.5) * cell * 0.9;
        var x0 = Math.max(0, Math.floor(dx0 - rad)), x1 = Math.min(W - 1, Math.ceil(dx0 + rad));
        var y0 = Math.max(0, Math.floor(dy0 - rad)), y1 = Math.min(H - 1, Math.ceil(dy0 + rad));
        for (var yy = y0; yy <= y1; yy++) {
          var dy = yy + 0.5 - dy0;
          var base = (yy * W) << 2;
          for (var xx = x0; xx <= x1; xx++) {
            var dx = xx + 0.5 - dx0;
            var d2 = dx * dx + dy * dy;
            if (d2 > rad2) continue;
            var f = 0.5 + 0.5 * Math.cos(Math.PI * Math.sqrt(d2) / rad);  // 中心 1、边缘 0
            var ai = base + (xx << 2) + 3;
            var v = Math.round(na * f);
            if (v > d[ai]) d[ai] = v;
          }
        }
      }
    }
  }

  /* 稳定哈希 → [0,1)。Math.imul 避免 32 位溢出的浮点误差。 */
  function hash01(x, y) {
    var h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h = h ^ (h >>> 16);
    return (h >>> 0) / 4294967296;
  }

  /**
   * 把建好的纹理过一遍小半径模糊 —— **抹掉 Skia 给低对比渐变加的 dither**。
   *
   * ⚠️ 为什么必须抹（用户实测：「电脑和平板看云雾放很大就有点点，手机正常」）：
   * 径向渐变是**逐像素抖动**上色的（防止大面积渐变色带）。这张纹理只按
   * `texScale = 0.19` × 世界尺寸建，用的时候要放大约 `k / 0.19` = 5~40 倍
   * ⇒ 抖动被放大成屏幕上一张**周期约 2 texel 的格子**（k=4、dpr=1 时约 42px）。
   * 手机上看不出来只是因为屏幕小、像素密度高，同一张纹理在同样的放大倍率下
   * 落到眼睛里的空间频率更高（外加手机那边的截屏压缩把这点差异抹平了）。
   *
   * 实测（k=4、dpr=1，4-邻域拉普拉斯绝对值均值，越小越干净）：
   *   纹理自身 13.27 → 0.99 ｜ 实际显示的云雾层 1.06 → 0.05（差 20 倍，截图对比肉眼可见）。
   * 半径 1.6 纹理像素 ≈ 8 个世界单位 —— 云雾本来就是一团糊的雾，形状与浓淡肉眼无差别。
   * 成本：建一次 8.9ms 上再加 0.2ms（只在开页 / 改显隐时发生，不在每帧路径上）。
   * 兜底：没有 `ctx.filter` 的环境（Safari < 16.4）退化成「减半再放大」，同样够抹平抖动。
   */
  function smoothTexture(src, r) {
    if (!(r > 0)) return src;
    var out = document.createElement('canvas');
    out.width = src.width; out.height = src.height;
    /* ⚠️ 不要把这张画布设成 willReadFrequently：它是每帧都要重铺的纹理，
       要留在 GPU 上。粒子化那一次 getImageData 是一次性开销，值得换。 */
    var ctx = out.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    if ('filter' in ctx) {
      ctx.filter = 'blur(' + r + 'px)';
      ctx.drawImage(src, 0, 0);
      return out;
    }
    var half = document.createElement('canvas');
    half.width = Math.max(1, src.width >> 1);
    half.height = Math.max(1, src.height >> 1);
    var hx = half.getContext('2d');
    hx.imageSmoothingEnabled = true; hx.imageSmoothingQuality = 'high';
    hx.drawImage(src, 0, 0, half.width, half.height);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(half, 0, 0, out.width, out.height);
    return out;
  }

  /**
   * 星团的云：比星系云更小、更浓，用星团自己的颜色（没写就继承星系）
   * list 是这一团里「还看得见」的节点 —— 藏了一半，云也跟着缩一半。
   */
  function paintCluster(ctx, c, list, graph, bc) {
    var cc = MG.config.cluster;
    var galaxy = graph.galaxyOf ? graph.galaxyOf(c) : null;
    var rgb = U.hexToRgb(c.color || (galaxy ? galaxy.color : '#7A8699'));
    var R = fitRadius(list, cc.cloudMinRadius, cc.cloudPadding);
    var cx = centroid(list).x, cy = centroid(list).y;
    var rand = U.rngFrom(c.id, MG.config.seed);

    nebula(ctx, rgb, cx, cy, R * 0.98, cc.cloudAlpha * 1.15, rand);

    /* 每个节点周围也来一小块（长尾）—— 云的形状跟着内容走，不是凭空一个圆盘。
       ⚠️ 以前这里是 `blob(..., R*0.24, cloudAlpha*0.8)`：半径小、浓度实，
       一块一块在缩小时就是一圈看得见的小圆点。换成长尾、半径放一档、浓度补一点。 */
    list.forEach(function (n) {
      softBlob(ctx, rgb, n.x, n.y, R * 0.30, cc.cloudAlpha * 0.95);
    });
  }

  function centroid(list) {
    if (!list.length) return { x: 0, y: 0 };
    var x = 0, y = 0;
    list.forEach(function (n) { x += n.x; y += n.y; });
    return { x: x / list.length, y: y / list.length };
  }

  /** 一群点需要多大的云：最远的一颗 + 余量（有下限，免得缩成一点） */
  function fitRadius(list, minR, padding) {
    if (!list.length) return minR;
    var c = centroid(list), maxd = 0;
    list.forEach(function (n) { maxd = Math.max(maxd, U.dist(n.x, n.y, c.x, c.y)); });
    return Math.max(minR, maxd + padding);
  }

  function paintRegion(ctx, region, list, bc) {
    var rgb = U.hexToRgb(region.color);
    var cx = region.center.x, cy = region.center.y;   // 星系的云以星系中心为心（和星系名一致）

    /* ⚠️ 半径只能按「主要属于这个星系」的点算。
       跨星系的点（regions 里写了两个）会被布局摆到**另一个**星系那边去，
       拿它们定半径，一朵云就会撑满整屏 —— 拓扑学只有 12 个成员，其中 4 个
       是 analysis 那侧的（Borel、积 σ-代数…），曾把整屏糊成粉色。
       规则与 layout.js 里算 stat.radius 时一致：跨星系的点不参与。 */
    var core = list.filter(function (n) { return !n.isBorder; });
    var basis = core.length >= 2 ? core : list;
    /* ⭐ 阶段 4：半径改用 **92 分位**而不是最大值。
       ⚠️ 这里和 layout.js 的 stat.radius 是**两处独立计算** —— 上一刀改的是
       layout 那处，截图逐字节没变，就是因为云其实用的是这里的 maxd。
       几个离心很远的点（尤其跨板块的）会把 max 拉长一大截，而那里并没有点，
       云就糊成一大片。分位数保住「包住内容」，又不为个别远点空摊。 */
    var ds = basis.map(function (n) { return U.dist(n.x, n.y, cx, cy); }).sort(function (a, b) { return a - b; });
    var maxd = ds.length ? ds[Math.min(ds.length - 1, Math.floor(ds.length * 0.92))] : 0;
    var R = Math.max(bc.cloudRadiusMin, maxd + bc.cloudMargin);
    var rand = U.rngFrom(region.id, MG.config.seed);

    /* 1) 板块中心的大团雾 —— 界定「这块地方属于谁」 */
    blob(ctx, rgb, cx, cy, R, bc.centerAlpha * 1.15);

    /* 2) 随机软斑 —— 让云看起来不规整 */
    for (var i = 0; i < bc.blobsPerRegion; i++) {
      var ang = rand() * Math.PI * 2;
      var rad = Math.sqrt(rand()) * R * bc.spread;
      var x = cx + Math.cos(ang) * rad;
      var y = cy + Math.sin(ang) * rad;
      var br = R * U.lerp(bc.blobRadiusMin, bc.blobRadiusMax, rand());
      var a = bc.blobAlpha * U.lerp(0.55, 1.25, rand());
      blob(ctx, rgb, x, y, br, a);
    }

    /* 3) 每个（看得见的）节点周围的小斑 —— 让云的形状跟着内容走 */
    basis.forEach(function (n) {
      blob(ctx, rgb, n.x, n.y, R * 0.30, bc.nodeAlpha);
    });
  }

  function blob(ctx, rgb, x, y, r, alpha) {
    if (r <= 0 || alpha <= 0) return;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0.00, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (alpha).toFixed(4) + ')');
    g.addColorStop(0.42, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (alpha * 0.62).toFixed(4) + ')');
    g.addColorStop(0.74, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (alpha * 0.22).toFixed(4) + ')');
    g.addColorStop(1.00, 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * 长尾软斑：画法与 `blob` 完全一样（一个圆 + 一条径向渐变），只是曲线更「散」
   * —— 中心更淡、尾巴更长。
   *
   * ⚠️ 为什么星团那一层要用它：`blob` 的浓度在 0.74r 处还有 0.22（≈中心的两成），
   * 到 r 才掉到 0 —— 一块一块看得见「边」。星团云是几十块叠出来的，用 blob 叠出来的
   * 结果就是一圈看得清的小圆点（用户原话：「就是一个圆圈看着很怪」）。
   * 这条曲线从 0.38r 起就一路往下滑（0.40 → 0.22 → 0.095 → 0.032 → 0），
   * 叠出来的整体才是「越往外越淡、最后化没」，没有边界可言。
   * 代价是同样半径下总墨量约为 blob 的 0.79 —— 调用处把半径放大了一档补回来。
   */
  function softBlob(ctx, rgb, x, y, r, alpha) {
    if (r <= 0 || alpha <= 0) return;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    var s = rgb.r + ',' + rgb.g + ',' + rgb.b + ',';
    g.addColorStop(0.00, 'rgba(' + s + alpha.toFixed(4) + ')');
    g.addColorStop(0.18, 'rgba(' + s + (alpha * 0.66).toFixed(4) + ')');
    g.addColorStop(0.38, 'rgba(' + s + (alpha * 0.40).toFixed(4) + ')');
    g.addColorStop(0.58, 'rgba(' + s + (alpha * 0.22).toFixed(4) + ')');
    g.addColorStop(0.78, 'rgba(' + s + (alpha * 0.095).toFixed(4) + ')');
    g.addColorStop(0.92, 'rgba(' + s + (alpha * 0.032).toFixed(4) + ')');
    g.addColorStop(1.00, 'rgba(' + s + '0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * 星团的**星云**：一团长尾柔雾做底 + 一圈角度铺满的软絮 + 几块大而淡的内部絮。
   *
   * ⚠️ 三条刻意的做法，都是为了让团云**没有边界**：
   *   ① 一律用 `softBlob`（长尾曲线）—— 用 `blob` 会叠出一圈看得清的小圆点；
   *   ② 絮的半径由内向外散开（`t` 取 1−√u：中心密、外面疏），
   *      每絮的浓度按 `fade = (1−t)^1.45` **越往外越淡**，最外一层正好为 0；
   *   ③ 外面的絮同时也更小 —— 边缘才是碎的，不是一圈珠子。
   * 于是星云是从中心一层层淡出去的，找不出一条边。
   * 角度仍按槽位铺满一圈（纯随机取角会留空洞，缩小时看着像「一圈点」）；
   * 起伏与相位的种子由星团 id 定 —— 每个团长不一样，同一个团每次打开长一样（不会抖）。
   */
  function nebula(ctx, rgb, x, y, r, alpha, rand) {
    if (r <= 0 || alpha <= 0) return;
    var TWO = Math.PI * 2;

    /* 1) 核：一大团长尾柔雾 —— 缩得很小时这一团还是一块有颜色的地方，
          也是「星团比星系云更密」这件事的主要来源（团云没有自己的颜色，只有浓度） */
    softBlob(ctx, rgb, x, y, r * 1.02, alpha * 0.26);

    /* 2) 软絮：角度铺满一圈，半径由内向外散开，越往外越淡、越小 */
    var n = 26;
    var p1 = rand() * TWO, p2 = rand() * TWO, p3 = rand() * TWO;
    for (var i = 0; i < n; i++) {
      var th = i / n * TWO + (rand() - 0.5) * 0.5;
      var wob = 1
        + 0.15 * Math.sin(3 * th + p1)
        + 0.10 * Math.sin(5 * th + p2)
        + 0.06 * Math.sin(8 * th + p3);
      var t = 1 - Math.sqrt(rand());                 // 0 = 中心，1 = 最外
      var rr = r * wob * (0.12 + 1.18 * t);
      var fade = Math.pow(1 - t, 1.45);              // ⭐ 越往外越淡，到 t=1 正好为 0
      softBlob(ctx, rgb, x + Math.cos(th) * rr, y + Math.sin(th) * rr,
        r * U.lerp(0.34, 0.16, t),                   // 外面的絮也更小
        alpha * fade * U.lerp(0.75, 1.15, rand()));
    }

    /* 3) 内部大而淡的絮：星云的「不均匀」主要来自这里（只有小絮会显得平） */
    for (var j = 0; j < 4; j++) {
      var a2 = rand() * TWO, d2 = Math.sqrt(rand()) * r * 0.55;
      softBlob(ctx, rgb, x + Math.cos(a2) * d2, y + Math.sin(a2) * d2,
        r * U.lerp(0.24, 0.42, rand()),
        alpha * U.lerp(0.20, 0.36, rand()) * (1 - 0.7 * d2 / (r * 0.55)));
    }
  }

  /** 按相机把云雾纹理画到屏幕（白底由页面提供） */
  function draw(ctx, cam, tex, dpr) {
    dpr = dpr || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!tex) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var sx = tex.x * cam.k + cam.tx;
    var sy = tex.y * cam.k + cam.ty;
    var sw = tex.w * cam.k;
    var sh = tex.h * cam.k;
    ctx.imageSmoothingEnabled = true;
    /* ⚠️ 这一档**不能**用 'high'：云雾纹理是 0.42 倍世界尺寸，每帧要放大约 2.4 倍铺满全屏，
       high 档重采样实测吃掉半帧（dpr=2、1600×900 下整帧 72.9ms → 39.6ms；dpr=1 也有可观占比）。
       它本来就是一团模糊的雾，双线性放大看不出差别 —— 引擎里其它 drawImage（节点光晕）
       也一直是默认的 low。 */
    ctx.imageSmoothingQuality = 'low';
    ctx.drawImage(tex.canvas, sx, sy, sw, sh);
  }

  MG.background = {
    buildTexture: buildTexture,
    draw: draw
  };
})(typeof window !== 'undefined' ? window : globalThis);
