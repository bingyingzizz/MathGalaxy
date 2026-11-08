/* ==========================================================================
   数学星图 · 全局配置与主题
   --------------------------------------------------------------------------
   想改颜色、大小、手感，只改这个文件。
   想加数学内容，去 src/data/ 。
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  /* ---------------------------------------------------------------- 配置 */
  MG.config = {
    seed: 20240607,               // 布局随机种子（固定 → 每次打开星图长得一样）

    /* 力导向布局参数（世界坐标 ≈ 1 单位 ≈ 1 像素 @ 缩放 1） */
    layout: {
      iterations: 700,
      idealDist: 120,             // 节点理想间距 k
      repulsion: 0.12,            // 斥力系数（力 = repulsion · k² / d）
      spring: 0.9,                // 有连线节点之间的弹簧强度
      springMax: 22,              // 弹簧力上限（防止跨半个星图的长边把节点拽飞）
      springLenFactor: 1.15,      // 弹簧自然长度 = idealDist × 该系数
      anchorPull: 0.34,           // 把节点拉回「初始匀布位置」的力（保住板块结构与均匀感）
      borderPull: 0.45,           // 跨板块节点的锚定更硬 → 稳定停留在交界带
      capacityFactor: 0.88,       // 板块可用地盘半径 = √(节点数/π) × idealDist × 该系数
      minGap: 64,                 // 节点最小间距（硬碰撞）
      /* 星系中心的整体外扩系数（regions.js 里的坐标 × 它）。
         ------------------------------------------------------------------
         ⭐ 2026-10-16：1.55 → **1.80**。用户指着凝聚态那块说「太密了」，
         于是把「星团之间的距离」量了一遍（`_tools/_tradeoff.mjs`），结论有点反直觉：

           · **`cluster.blank` 不是这里的旋钮**。只把它从 300 加到 620：
             用户那一屏（k=0.175、884×570）里的点数 379→359（只降 5%），
             而**全图连线总长 +24%**、超长边多出好几倍。
             星系一胖就顶到邻居，中间反而没变松 —— 长边却全回来了。
           · **真正管用的是星系之间的距离**。它换来的是「那一屏里的点数」：
             1.55 → 322（1.70）→ **294（1.80）**，被挤掉的名字 92 → 77 → 71；
             而凝聚态那一块只 +13%，全图 +7%。
           · 附带把「两个团的盘真的叠在一起」从 3 对清成 **0 对**
             （它们本来就是「星团之间太近」的字面定义）。

         ⚠️ 这是**等比外扩**：星系自己的大小一点没变，只是彼此离远了。
            所以在同样的缩放下，你那一屏里的邻居变少了 —— 这正是要的效果。
         代价：世界盒 6.77k×5.21k → 7.44k×5.68k，全图适配的 k 0.123 → 0.113
         （lod 阈值全是 rel/px 写法，跟着 k₀ 自动走，不用重标）。 */
      regionSpread: 1.55,
      /* ⭐ 2026-10-17 四层结构：**跨大板块的边只按这个折扣牵引**。
         跨板块的边平均长度是同板块的两倍多（当年实测），
         不折扣的话它们会合力把四个板块往中间拽（实测板块质心几乎重合）。
         折扣只改「弹簧的拉力」，不改线的画法：跨板块的关系照旧画出来。 */
      crossSectorPull: 0.35,
      /* ⭐ 2026-10-18：**大板块之间的最小净空**（世界单位，见 layout.js 的
         packSectors）。0 = 关掉（回到「圆盘贴着长」的老样子）。
         这个数只推开**不同板块**的领域圆盘，板块内部一点不动。
         ⚠️ 2026-10-19：480 → **160**。用户看完两版说「星系之间的边界太大」——
         480 是为了「一眼看出这里是四块」调的，但那同时把颜色过渡也切断了。
         160 让跨板块的云重新接触，混色带才长得出来。 */
      sectorGap: 0,
      /* 同一板块**内部**的领域之间最多留多少净空（世界单位）。超过就互相拉近 ——
         「数理逻辑」只有 4 个点，不拉近就会孤零零飘在板块外面（全景里像一块碎片）。
         ⚠️ **0 是对的**：再大就会逼着同一板块的领域彼此重叠（实测 160 时
            代数板块的领域云互相压了 805，连同它们的星团也叠在一起）。
         0 = 刚好相切 —— 既是一块板，又没有真的叠在一起。-1 或更小 = 不拉近。 */
      sectorInnerGap: 0,
      /* ⭐ 2026-10-19：**团与团之间的硬净空**（世界单位）。板块缝收到 0 之后，
         「不粘连」不能再靠留白保证 —— 由团级圆盘碰撞来保证。
         ⛔ 它只推团心（半径 = 团自己的 _cap），不动板块、不动领域。
         ⚠️ 2026-11-02：这个键**曾经是死的**（写了没人读，跨星系的团因此可以叠在一起）。
            现在由 layout.js 的  读（全对碰撞的净空），真的生效了。 */
      clusterGap: 24,
      /* ⭐ 2026-10-19：领域中心改由**跨领域边权**求解（见 layout.js 的 solveRegionCenters）。
         打开后 packSectors 整段跳过 —— 两条规则会打架。regions.js 的 center 降级成初始锚。 */
      regionSolve: true,
      /* ⭐ 2026-11-02：**按连通性径向排布星系**。
         用户向：「实分析和外面有一大圈空，说明它跟别的团没啥关系，为啥在中间？」
         病根：没有边的星系对之间没力 ⇒ 星系基本停在 regions.js 的种子位置。
         现在按「跨星系度数」把最连通的放在内圈、孤岛推到外围。 */
      regionRadial: true,
      regionRadialInner: 520,   // 最连通的星系离全域重心的目标半径
      regionRadialOuter: 2300,  // 最孤立的星系的目标半径（取当前地图的实际量级）
      regionRadialK: 0.10,
      /* ⭐ 2026-11-02：「星系相切」按**画出来的云**结算，不是按容量盘。
         容量盘（按节点数估）比云（节点分布 88 分位）大 30% 左右 ⇒ 有关系的两个星系
         明明连线很多，中间仍稳定留一条空带。0.78 ≈ 实测的 云/盘 比值。 */
      regionTouchK: 0.78,      // 径向项的力度

      /* ⭐ 2026-11-02：**团心松弛**（layout.js 的 relaxClusterCenters）。
         星团只在「自己星系内部」打过包 ⇒ 跨星系的团之间没有碰撞保护：
         实测有两个不同星系的团叠到只差 36 世界单位，而「最近无关邻居」的
         中位数只有 340（比有关系那对的中位 1069 小得多）。
         这一趟用三股力（朝伙伴吸 / 所有对推开 / 回家）只动团心。 */
      clusterRelax: true,
      clusterRelaxIters: 140,
      clusterAttract: 0.10,       // 朝「有边的伙伴团」的加权重心
      clusterRepel: 0.55,         // 圆盘叠了就把两团推开（对所有团对生效）
      clusterKeep: 0.10,          // 回家：朝打包给它的位置，防止星系被拉散
      clusterMaxStep: 18,         // 每步位移上限（世界单位）
      clusterReach: 0.45,         // 离家的硬上限 = 星系容量盘 × 这个比例
      clusterFar: 2.45,            // 无关的两团靠得比「两盘相切」的 1.7 倍还近 ⇒ 中程斥力
      clusterRepelFar: 0.40,      // 中程斥力的力度（只对**无边**的团对生效）

      temp0: 62,                  // 初始温度（同时是每步位移上限）
      temp1: 0.5,                 // 终止温度
      maxStep: 26
    },

    /* 相机 */
    camera: {
      minZoom: 0.06,
      maxZoom: 8,
      zoomStep: 1.22,             // 按钮 / 键盘缩放的倍率
      wheelGain: 0.0016,          // 滚轮灵敏度
      fitPadding: 130,
      maxFitZoom: 1.25,
      /* ⚠️ 这是「别缩成一粒灰」的下限，但它会**夹住「适配全部」**：
         夹住的时候内容就出血，适配全部名不副实。所以它必须 ≤ 内容真正需要的
         缩放。内容以后再涨，先来看这个数 —— 现在实际需要 ≈0.20，
         涨到上万点时还会往下走，那时 minZoom 也要一起降。 */
      fitMinZoom: 0.06,
      animateMs: 420              // 相机平移动画时长
    },

    /* 节点 */
    node: {
      baseRadius: 6,             // ⭐ Stage 1b：8.5 → 6（fit 档屏幕直径 ≤4px，看起来是星不是泡）
      minRadius: 3.0,
      maxRadius: 26,
      radiusPower: 0.62,          // 半径随缩放增长指数（<1 → 缩小时仍看得见）
      ringWidth: 2.0,
      labelOffset: 13,            // 文字在节点下方多远（世界单位）
      labelSize: 14,              // 字号（缩放 1 时）
      labelMinZoom: 0.22,         // （当前未使用，留着是为了别的分支/实验）
      /* 低于此缩放只画「主干 + degree ≥ 3」的名字，并自动去重叠。
         和上面 lod.nodeNameIn 的 px 阈值对应：20/120≈0.17 开始出现、46/120≈0.38 全亮，
         取中间偏后一点当闸门。改 idealDist 或 nodeNameIn 时要一起看。 */
      labelMinZoomAll: 0.30,
      labelPad: 3,
      /* ⭐ 2026-10-31（用户）：「让这个大标签宁可变小也不要避让飞出去，
         这个标签避让不要以牺牲准确位置为前提。」
         ----
         板块 / 星系 / 星团名是「在哪」的唯一提示（画布上别的东西都在动），
         把它往上/下挪 100px 等于给出假信息。所以改成：**先在锚点上缩字号**，
         缩到底还放不下才允许挪**一小步**（≤ 1 档，见 bigNudge）。
         旧行为是「不缩字号，最多挪 ±2 档」；档高 = bh+6，板块名 bh≈48 ⇒ 能飞 108px。 */
      /* ⭐ 缩字号只到 76%：「宁可变小」也有底线 —— 在 13px 的星系名上，
         0.58 就是 7.5px，中文字已经糊了。76% = 10px，还读得出。
         再放不下就靠第二趟的「挪一小步」（≤ 1 档，且从小到大试）。 */
      bigScales: [1, 0.92, 0.84, 0.76],
      /* ⭐ 板块名（最大的那个「大标签」）可以缩得更狠：字号起点大（fit 档 ~20px），
         而它的锚点天然会跟邻板块摞在一起（两个板块的质心可能几乎同高同 x），
         所以给它多留几档缩字，而不是让它飞出去。
         ⚠️ 星系 / 星团名起点只有 13px，底线停在 0.76（≈10px）—— 再小中文就糊了。 */
      bigScalesSector: [1, 0.92, 0.84, 0.76, 0.68, 0.62, 0.56],
      bigNudge: 1,               // 锚点全试过还不行时，允许挪几档（0 = 永不挪）
      bigMinPx: 10,              // 缩字号的绝对下限（再小就读不出）
      /* ⭐ 光晕拆成两档（2026-10-17）：
         `glow`         —— 普通节点的光晕（位图烘焙期间临时关掉，改由实时层画）；
         `glowSelected` —— 选中 / 悬停节点的光圈，**不跟着普通光晕一起关**。
         以前只有一个布尔，一刀切下去连「我正在看的那个点」的光圈也没了。 */
      glow: true,
      glowSelected: true,
      glowNormalAlpha: 0.72,      // 普通光晕的不透明度（选中 / 悬停固定 1.0）

      /* 半径分层：让「中心天体 / 枢纽」与「边角小点」一眼分得开。
         ------------------------------------------------------------------
         ⚠️ 2026-09-23 实测：改之前 hub 只 ×1.32、degree ≥5 只 ×1.22、
         ≥3 只 ×1.1，**全图极差只有 1.61 倍**。于是「四个标准反例」（degree 1）
         和「单射/满射/双射」（degree 7）之间只差 1.22 倍 —— 肉眼几乎分不出，
         用户直接指出「那四个反例看起来快和单射满射双射一样大了」。
         所以改成**分档**：hub 一档、按度数分五档、叶子单独压小。
         极差从 1.61× 拉到 2.6×（叶子 0.78 ↔ 中心天体 2.05）。 */
      sizeTiers: {
        hub: 2.05,              // 星团的中心天体（clusters.js 里手定的 hub）
        byDegree: [             // [最低度数, 倍率]，从上往下取第一个命中
          [12, 1.60],
          [8, 1.42],
          [5, 1.26],
          [3, 1.10],
          [2, 0.95],
          [0, 0.78]             // 叶子：只有一条边的边角小点
        ]
      },
      sizeClamp: 33             // 放大之后的最终上限（世界单位）；minGap 是 64，不会撞
    },

    /* 连线 */
    edge: {
      hitTolerance: 8,            // 点击连线命中容差（屏幕像素）
      implicationWidth: 1.7,
      equivalenceWidth: 2.1,
      definitionWidth: 1.15,
      defCurvature: 0.17,         // 定义线弯曲程度（避免与直线重叠）
      /* ⭐ 2026-10-29：**同一对点之间的两条直线边**（退出/等价/类比）各让开一点。
         踩过：Rouché ↔ 辐角原理 的黑边（辐角原理 ⟹ Rouché）与粉边（Rouché ⟹ 辐角原理）
         画成同一条线段，粉边被压在黑边下面，点多少次都只选到黑边。
         全库只有 2 对这样重合的边（另一对是 紧 ⟺ 列紧 的两条推出），所以代价可忽略。 */
      bundleGap: 20,              // 平行边之间的横向间距（屏幕像素，第 i 条偏移 (i-(n-1)/2)×gap）
      bundleBendMax: 0.14,        // 弓高上限 = 弦长 × 这个比例（短线不做大弓）
      mergeOffset: 52,            // 多前提箭头汇聚点距离目标多远（世界单位）
      arrowSize: 9.5,             // 箭头长度（屏幕像素，随缩放轻微变化）
      equivalenceGlyph: 0.7,      // 大于该缩放时在等价线中点画 ⟺
      /* ⭐ 2026-10-17：定义引用线占全部连线 89%（逐条看是一片蓝网）。
         在**领域 / 星团尺度**把它压到这个比例 —— 那是「看结构」的档位，
         关系线（推出 / 等价）才是主角。缩到全图或放大到近景都恢复 1.0。
         ⛔ 曲线只有一处：drawEdgeOne 与 drawEdges 的合并描边路径都要乘 lodA.defDim。 */
      definitionMidScale: 0.60,
      /* ⭐ 线宽随缩放生长（2026-10-18）：
         节点半径 ∝ k^0.62，线宽却一直是 1.7px ⇒ 放大后「推出的黑线」细得像发丝
         （用户原话：「放大以后推出的黑色线有些过于细了」）。
         用比节点温和的 k^0.45，夹在 [1, widthMax]；基准 k=0.62（内容铺满时的缩放）。
         ⚠️ drawEdgeOne、drawEdges 的定义线快路径都要乘，否则 89% 的线不跟着变。 */
      widthRefK: 0.62,
      widthPow: 0.45,
      widthMax: 2.6,
      /* ⭐ 长边降权：按**世界长度**，不是屏幕长度（2026-10-18 修正）。
         屏幕长度会把「放大后本来正常的局部关系」也当成超长线 ——
         k=1.5 时一条 500 单位（约 4 条边）的推出线在屏幕上 750px，
         旧口径把它压到 0.1，看起来像断了。世界长度才是「这条关系跨了多少条边」。
         < start ⇒ 不降；到 end ⇒ 降到 floor。选中 / 悬停的边永不降。 */
      longFade: { start: 1300, end: 3400, floor: 0.18 }
    },

    /* 星团包络（每个「装置」的范围）
       —— 「这块地是谁的」一眼看得见。只在中小缩放出现，放大了让位给节点本身。
       ⚠️ 填充是**径向渐变**：中心浓、往外淡、到包络外沿为 0 —— 边界是化开的，
       不是一圈线（`strokeAlpha` 平铺描边会让缩小时每个团变成一个圆圈，已关掉）。 */
    envelope: {
      /* 2026-11-08：用户要求背景直接不可见。星团包络的径向填充/描边也一并关闭；
         需要恢复「这块地是谁的」时把它设为 true。 */
      enabled: false,
      pad: 44,                    // 边界离最远那个点再外扩多少（世界单位）
      samples: 24,                // 绕一圈取多少个方向
      smooth: 3,                  // 半径序列平滑几遍（消掉尖角）
      fillAlpha: 0.30,            // 中心浓度（渐变，平均值比它低）
      gradSpan: 0.90,             // 渐变半径 / 最远采样半径 —— <1 保证各方向都化到 0
      strokeAlpha: 0.12,       // 淡轮廓线（0 = 不描边）—— 2026-10-19 回到旧值：用户说「星团边界要看得见」
      width: 1.6
    },

    /* 电子云背景 */
    background: {
      /* 2026-11-08：用户要求背景直接不可见。雾场代码保留，默认关闭。 */
      enabled: false,
      /* ENG-010：全端统一的雾场纹理（手机/桌面同一套，无分端分支）。
         纹理覆盖可见节点 bbox + fogPadRatio 比例的外扩，四周径向羽化到 alpha=0，
         所以任何视口、任何缩放下都看不到「云的边」。 */
      fogPadRatio: 0.35,          // 内容 bbox 外扩比例（按长边算）
      fogMaxSide: 2048,           // 纹理长边像素上限（≈1600×900 适配档 0.47 px/texel）
      fogMaxPixels: 4200000,      // 总像素上限（≈16MB RGBA，常见 GPU 的 1/4 纹理内存）
      fogBlur: 1.2,               // 纹理像素模糊半径：抹掉径向渐变的 dither
      fogAlpha: 0.085,            // 区域云核心 alpha（向外五档平滑衰减到 0）
      centerAlpha: 0.025,         // 保留字段（旧版云朵参数，当前绘制路径不再读取）
      nodeAlpha: 0.025,
      spread: 0.52,
      blobRadiusMin: 0.30,
      blobRadiusMax: 0.50,
      cloudMargin: 36,
      cloudRadiusMin: 160,
      dilate: 1.45
    },

    /* ------------------------------------------------------------------
       多尺度（LOD）：星系 → 星团 → 恒星
       缩小时只看见星系和「整块对整块」的粗连线；
       放大时节点名、节点级细线才逐层淡入。两条曲线交叉淡入淡出。

       ⚠️⚠️ 阈值有两种写法（2026-09-22 重写，别改回绝对 k）：
         { rel: [a, b] } —— 乘以「适配全部」时的缩放 k₀ 的倍率。
             结构性的东西（星系名 / 装置名 / 团级粗线）用它：
             **内容再涨，1× 全图看到的那一层骨架永远一样。**
         { px:  [a, b] } —— 「屏幕上相邻两点相距多少像素」。
             节点级的东西（点 / 细线 / 名字）用它：布局里相连节点的世界距离
             是固定的 layout.idealDist，所以换算成 k = px / idealDist 是
             **与内容多少无关**的绝对量。

       为什么必须这么写：旧写法全是绝对 k，是按「content 铺满 ≈ k 0.62」标定的
       （那是内容只有几十个点的时候）。内容长到 3118×2721 之后「适配全部」
       只剩 k≈0.20，所有曲线都还没起步 —— 全图就只剩云和圆点，一条推导线都不画，
       装置名也不出。**内容会长大，绝对值就会过期。**（铁律 4 的坑）

       各区间重叠 → 交叉淡入淡出，不会突然跳变。
       ------------------------------------------------------------------ */
    lod: {
      /* ⭐⭐ ENG-001（2026-11-05 用户拍板）：LOD 的**唯一基准 lodK0**。
         = 「固定参考视口 1600×900 + 固定参考内缩」下「适配全部」的 k（见 renderer.lodK0）。
         ⛔ 与实时视口 / 可用区无关：同一个 k（CSS px / 世界单位）在任何窗口下必须落在
            同一档；拉窗口只改变**看得到多少**，不改变**放大到几倍**。
         参考内缩取桌面实测（图例展开 left=322 / 说明条收起 bottom=83），
         使桌面开页那一档 r≈1 ⇒ 下面所有 {rel:…} 阈值沿用旧标定，不用重标。 */
      ref: { w: 1600, h: 900, left: 322, bottom: 83 },

      /* —— 结构性：倍率 × k₀ —— */
      /* ⭐ 2026-10-17 四层结构 + **尺度回差**：
         最远视角先认**大板块**，放大一档才轮到领域，再放大到星团。
         三档名字以前互相重叠（sector 退到 1.90×k₀ 时领域从 0.95×k₀ 就开始了），
         临界位置两份名字抢同一块屏幕 ⇒ 缩放抖动时会闪。
         现在**曲线彼此留缝**：上一档在下一档起亮前就归零。

         ⚠️ 缝隙要和 `tierBound` 的回差带对齐（否则 holdTier 切换的瞬间名字会「啪」地
            出现 / 消失）。四档：0 大板块 / 1 领域 / 2 星团 / 3 节点近景。
            切换点 = tierBound × (1±tierHysteresis)，曲线在切换点之前已经到 0。 */
      sectorNameIn:   { rel: [0.10, 0.45] },  // 大板块名：最远处就亮（≈任何可达缩放都亮）
      sectorNameOut:  { rel: [1.00, 1.072] }, // 进领域档（1.08×0.995=1.0746）之前归零
      galaxyNameIn:   { rel: [1.078, 1.14] }, // 领域名：全图那一档**不出**，放大后快速亮起来
      galaxyNameOut:  { rel: [1.94, 2.015] }, // 进星团档（2.03×0.995=2.0199）之前归零
      clusterNameIn:  { rel: [2.042, 2.15] }, // 星团名：放大到领域尺度才出
      clusterNameOut: { rel: [3.85, 4.80] },
      clusterLinkOut: { rel: [1.05, 2.20] },  // 团级粗线：全图最亮，放大到星团档就退场
      trunkNameIn:    { rel: [1.35, 1.75] },  // 主干名：和领域名同一档出现（全图只剩大板块名）

      /* 档位边界（×k₀）与回差：进得晚（×1.005）、出得早（×0.995）⇒ 死区里不闪。
         ⚠️ 回差从 0.01 收到 **0.005**：死区 = 2h×B ≈ 1%（板块→领域）/ 2%（领域→星团）的 k₀。
            用户报的「名称交接有很小一段空档」就是这段 —— 之前 0.01 时是 3%~5%，
            轮滑一格就跨过去了，看起来像「大板块标题没了、领域名又很淡」。 */
      tierBound: [1.08, 2.03, 4.90],
      tierHysteresis: 0.005,

      /* ⭐ 跨领域（不是跨星团）的逐条连线：**中景默认收起**，放大到近景
         （≈ 4.9×k₀ 的节点档）才回来；选中 / 悬停的边始终放行。
         背景：星团闸门只挡到 1.3×k₀，中景那一档
         跨领域的定义引用仍然铺成一张网（用户 2026-10-18 的反馈）。 */

      /* —— 节点级：屏幕上相邻两点的像素距离 —— */
      nodeDotIn:  { px: [8, 20] },            // 圆点：几乎一直在
      nodeEdgeIn: { px: [36, 66] },           // 节点级细线
      /* 节点名：相邻够 20px 就淡入、46px 全亮。
         ⚠️ 真正保证「名字不糊在一起」的是 renderer.drawLabels() 里的 placed[]
         逐条去重叠（撞了就跳过），这条曲线只负责淡入。所以闸门可以开得很早：
         放大到约 1.7×k₀ 就出名字（原先要 5.5×k₀），到 4.5×k₀ 时能放下的基本都放上。
         实测每屏画出的节点名：k₀ 26 个 · 2×k₀ 136 个 · 3×k₀ 304 个 · 6×k₀ 476 个。 */
      nodeNameIn: { px: [20, 46] },

      /* 主干内部的边：全图尺度上单独留一条「骨架」。
         节点级连线要等相邻 36px 才画，那时已经放大 1.3 倍以上了 ——
         这段区间里主线也看不见。给它一条自己的曲线，缩小时才看得见主线。 */
      trunkEdgeIn: { rel: [1.05, 1.75] },
      /* 全图时把「不在主干上」的点/名压暗，主线才浮得出来；放大到 2.2× k₀ 恢复原样。
         （主干本来是 58 个点、84 条内部边的**一张网**，不压暗的话只是多一层网。） */
      trunkDimIn:  { rel: [0.60, 2.20] },
      trunkDimMax: 0.60,         // 全图时非主干点保留多少不透明度（0.40 = 压掉 60%）

      /* 星团包络：和装置名同一档出现，放大到节点名出来之前就退场 */
      envelopeIn:  { rel: [0.25, 0.85] },
      envelopeOut: { rel: [1.40, 2.80] },

      /* ⭐ 阶段 3：远尺度**默认收起「逐条跨团长线」**（团内的关系照旧画）。
         这条只作用于「两端不在同一个星团」的边；选中 / 聚焦的边一律放行，
         `showAllEdges` 打开时也放行。⛔ 不画任何「板块 A ⟹ 板块 B」的聚合箭头。 */

      /* 定义引用线在「领域 / 星团」尺度压暗的区间（×k₀）。曲线形状和
         `edge.definitionMidScale` 一起用：区间内乘 0.60，两端恢复 1.0。 */
      defDimIn:  { rel: [1.05, 1.25] },
      defDimOut: { rel: [3.80, 4.70] }
    },

    /* 星团（一套自足的装置，内部关系密、对外整块连接） */
    cluster: {
      blank: 300,           // 同一星系内，相邻两个团盘之间至少要空的宽度（世界单位）
      minRadius: 92,        // 星团最小可用半径
      nodeSpread: 0.80,     // 节点在星团圆盘里铺开的比例
      /* 星团内部的行星-卫星摆法：hub 当行星，其余节点当卫星排同心轨道。
         oneRingMax = 单圈允许的最大半径（单位是 minGap）—— 装得下就只放一圈，
         星团才是「一颗行星 + 一圈卫星」这个形状。 */
      planetary: {
        minGap: 64,
        oneRingMax: 3.4
      },
      cloudPadding: 42,     // 星团云比节点分布外扩多少（世界单位）—— 收紧，让团的边界看得清
      cloudMinRadius: 120,
      cloudAlpha: 0.08,     // 星团云不透明度（叠在星系云上，形成"更密的结"）
      labelSize: 13.5,
      labelOffset: 0,       // 星团名放在星团中心上方
      namePad: 6            // 星团名底下那块底色的内边距
    },

    /* 星团级连线（自动从节点级连线聚合出来，不需要手写） */
    clusterLink: {
      minEdges: 2,          // 两个星团之间至少这么多条节点连线才画
      crossSectorMinEdges: 4,
      widthMin: 1.6,
      widthMax: 7.5,
      color: '86, 104, 140',
      alpha: 0.30,
      curve: 0.10           // 弯曲程度，避免和节点级连线重叠
    },

    /* 聚焦模式：点击节点后，只保留它和它的邻居 */
    focus: {
      hideUnrelated: false,       // true → 无关节点/连线彻底不画；false → 压得很淡（保留方位感）
      dimNodeAlpha: 0.09,
      dimEdgeAlpha: 0.05,
      dimLabelAlpha: 0.10
    },

    /* 弱边（类比）的显示 */
    analogy: {
      dimAlpha: 0.10,       // 关掉探索模式时弱边压到多淡
      exploreAlpha: 0.55,
      dash: [5, 5]
    },

    /* 开关默认值 */
    exploreMode: false,     // true → 打开弱边（探索模式）
    showDefinitionLines: true,    showLabels: true,
    /* 阶段 3：远尺度收起跨团长线。打开它就「全部连线」都画（不新增渲染路径）。 */
    showAllEdges: false,
    wheelZooms: true,             // false → 滚轮平移（触控板手感）
    hideParallelImplications: true, // 已有等价线时不再叠画同对节点的箭头
    highlightDefinitions: true,   // 面板上把「定义引用」单独分组

    /* Phase A：世界位图（DOM canvas + CSS transform 载体）
       maxSide = 单图最长边（设备像素）；k ≤ maxSide/世界长 才启用，超出交 Phase B。
       内存：4096×3475 单份 ≈54MB，两代并存 ≈109MB。阶梯 4096→3600→2048→关。 */
    bitmap: {
      enabled: true,
      /* 单图最长边阶梯（设备像素）。覆盖的 k 上限 = maxSide / 世界最长边。
         ⚠️ 2026-10-16：世界最长边从 6.77k 涨到 **7.44k**（regionSpread 1.55→1.80），
            下面这三个数也跟着变小了：4096 → k ≤ **0.551**（原 0.607）；
            3600 → 0.484（原 0.533）；2048 → 0.275（原 0.303）。
            真正决定「世界模式到哪一档为止」的是下面那个**面积预算**（≈0.615），
            边长这条只是它的兜底 —— 世界再长，先撞上的还是面积。
         ⚠️ 试过 8192：分配 + 全图烘焙在本机直接把页面卡死 ⇒ 退回 4096。
            放大带必须靠 Phase B（视口⊕余量），抬 maxSide 不是办法。
         烘的是当前 k，所以低速档的图很小；只有放大时才会真吃大图内存。
         建不出来会自动降档，最小档还不行就彻底关掉位图（回到实时画）。 */
      maxSide: 4096,
      tiers: [4096, 3600, 2048],
      /* 世界单图的**面积预算**（设备像素）：允许边长略超 maxSide，换「k 刚越过
         0.551 那一段仍走世界模式」。那段正是最差档 k≈0.62 —— 走区域模式时拖动中
         每 ~0.4 秒重烘一次、每次一根 145ms 的尖峰（实测 11~14 次 / 6s）；
         世界图一次烘完，**平移期零重烘**。
         ⚠️ 2026-10-16：世界盒 7.44k×5.68k 之后，面积口径给的是
            k ≤ √(16e6/(7440×5680)) ≈ **0.615** ⇒ 世界图 4597×3510 ≈ 62MB；
            面积超过 16e6 就不再是「略超边长」，直接退回 Phase B。
         0 = 退回「只看边长」的老口径。 */
      worldPxMax: 16e6,
      worldSideMax: 6144,
      /* Phase B：k 超过 maxSide/世界长 时改烘「视口 ⊕ 余量」，每边余量（设备像素）。
         余量要 > 一次烘焙期间的拖动位移（14 帧 × 速度 ≈ 120~350px）+ 安全量。 */
      marginPx: 400,
      /* Phase B 的**横带切片烘焙**：一次只烘一条横带，一条带一个帧，画完最后一条才换代。
         为什么：一次「整张重烘」实测 ≈ 画布像素 × 9ns（3312×2056 → 46~58ms 单帧尖峰）；
         按带切就把一根尖峰摊成几十根小帧（实测假拖动 k=1.2：max 66.7 → 12~29ms、
         超 20ms 的帧 12 → 0~1 根、p95 不恶化）。
         ⛔ 两条别改回去的硬规矩（都是实测换来的）：
         ① 换代只能改**裁剪**（clip-path: inset）+ 元数据，绝不 display:none ↔ ''、绝不换画布；
         ② 交接也只能改裁剪 —— 一帧里 clearRect 两张显示中的大画布会把 p95 顶到 29.6ms。
         取值（设备像素）：112 → 单帧≈1 个时隙（p95 最好）；160~200 → 帧少但每帧约 2 个时隙。
         旋钮：&band=<px> 或 MG.app.setBand(<px>)。 */
      bandPx: 128,
      /* 缩放手势里**多久出一次新图**（毫秒；0 = 只看停手）。
         为什么要有：k 一变，位图就是上一档的图被 transform 拉伸 ⇒ 线宽 / 圆点 / 箭头
         全跟着被缩放（屏幕上本该恒定的东西变了），而原先要一直挂到停手 settle 才纠正。
         代价：一次重烘 ≈ 画布面积 × 9ns（6.8Mpx ≈ 61ms 光栅）⇒ 实际频率 = max(本值, 一轮时长)。
         100 ⇒ ≈0.6 帧预算、150 ⇒ ≈0.4、200 ⇒ ≈0.3（按整帧预算估的占用）。
         旋钮：&zoomms=<ms> 或 MG.app.setZoomMs(<ms>)。 */
      zoomMs: 150,
      settleMs: 180        // 停手多久才允许重烘（手势期间一律不烘）
    }
  };

  /* ---------------------------------------------------------------- 主题 */
  MG.theme = {
    /* 图例里节点类型的显示顺序（也是「重要程度」的排序依据） */
    typeOrder: ['axiom', 'definition', 'theorem', 'lemma', 'proposition', 'corollary', 'example'],

    /* 节点类型 → 颜色。改这里即可换配色。
       ⭐ T2.4：加 `nameEn` —— 界面英文模式下的类型名（「公理」→ Axiom）。
          它是**引擎侧**的界面文案，不是数学内容；⛔ 不要跟 label_en/title_en 混。
       ⚠️ 这七个色值**同时是 `.pn-kind` 徽章的底色**，白字 11.5px 要 ≥ 4.5:1
          （WCAG AA 小字）。2026-11-03 之前六色只有 2.58–4.22，已整体压深一档；
          构建里 `assertContrast()` 会拦住退回去的改动。 */
    nodeTypes: {
      axiom:       { name: '公理',  nameEn: 'Axiom',       color: '#7A5CD6', short: '公理' },
      definition:  { name: '定义',  nameEn: 'Definition',  color: '#6B7280', short: '定义' },
      theorem:     { name: '定理',  nameEn: 'Theorem',     color: '#1F7A4C', short: '定理' },
      lemma:       { name: '引理',  nameEn: 'Lemma',       color: '#B45309', short: '引理' },
      proposition: { name: '命题',  nameEn: 'Proposition', color: '#0E7490', short: '命题' },
      corollary:   { name: '推论',  nameEn: 'Corollary',   color: '#2F5FC4', short: '推论' },
      example:     { name: '例',    nameEn: 'Example',     color: '#7B5EA7', short: '例' }
    },

    /* 边的视觉 */
    edgeStyles: {
      implication: { color: '#1C1C1E', width: 1.7, dashed: false },
      equivalence: { color: '#1C1C1E', width: 2.1, dashed: false },
      definition:  { color: '60, 112, 245', width: 1.15, alpha: 0.5, dashed: false },
      analogy:     { color: '138, 106, 214', width: 1.5, alpha: 0.55, dashed: true }
    },

    /* 边的中文名（`edgeNamesEn` 同上：界面英文模式用的短名） */
    edgeNames: {
      implication: '推出',
      equivalence: '等价',
      definition:  '定义引用',
      analogy:     '类比'
    },
    edgeNamesEn: {
      implication: 'Implies',
      equivalence: 'Equivalence',
      definition:  'Definition reference',
      analogy:     'Analogy'
    },

    /* ------------------------------------------------------------------
       边的「强弱」—— 决定 AI 和人检索时的信噪比
         strong：标准逻辑关系。查证明、做推理只走这些，不会跑偏。
         weak  ：类比 / 思想相通 / 跨领域触发。不是逻辑蕴含，
                 只在「卡住了、想找远房关系」时开探索模式用。
       每一层尺度都有自己的强边和弱边（节点级 / 星团级 / 星系级）。
       ------------------------------------------------------------------ */
    edgeStrength: {
      implication: 'strong',
      equivalence: 'strong',
      definition:  'strong',
      analogy:     'weak'
    },

    /* ⭐ 「推论」边（数据写法 `layer:false` 的 implication，见 core/graph.js 的 isDerived）
       ------------------------------------------------------------------
       语义：**是推出，但不是前提** —— 用高级工具（层上同调、谱序列、Gauss–Bonnet……）
       回头把低级定理证出来。它不参与分层，所以要能和普通推出**一眼分开**。

       画法：**实线 + 箭头 + 粉红**。⛔ 不做虚线 —— 虚线在这个图里是「类比（弱边）」
             的语义，撞上去就成了另一种承诺。
       宽度不在这里定义：它直接走 `edge.implicationWidth` 那条代码路径，
             「与普通推出一致」是靠**共用同一条路径**保证的，不是抄一个数。
       ⛔ 不新增 kind：`edgeStyles` / `edgeNames` / `edgeStrength` 三个表的键一个不动。 */
    derivedEdge: {
      color: '#E0446B'       // 比拓扑领域的 #D9649F 更红一档，放在同一张图上不会混
    },

    font: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif',
    monoFont: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',

    /* ⭐⭐ 2026-11-05 主题（ENG-003）：**纸/墨两端**跟主题走的颜色都在这里。
       语义色（nodeTypes / 领域色 / 星团色）**不跟主题变** —— 它们是图例、搜索、
       面板徽章共用的身份色，改了就「同一颗星在图例和画布上不是一个颜色」。
       CSS 侧负责 DOM（`[data-theme]` + 变量表，见 src/ui/styles.css）；
       canvas 侧读这里（名字药丸 / 文字墨色 / 描边环 / 边）。
       ⛔ 名字一律用 rgb 串（`U.rgba()` 会把它和 alpha 拼起来），跟 edgeStyles 的老写法一致。 */
    schemes: {
      light: {
        ink: '#1C1C1E', inkSoft: '#6B7178', inkFaint: '#A5ABB3',
        nameBg: '255,255,255',           // 名字药丸底（alpha 由调用点给）
        ring: '255,255,255',             // 点 / 箭头 / 字描边环（= 纸色）
        labelHalo: 'rgba(255,255,255,0.92)',
        bg: '#FFFFFF',
        edgeImplication: '#1C1C1E', edgeEquivalence: '#1C1C1E',
        edgeDefinition: '60, 112, 245', edgeAnalogy: '138, 106, 214',
        spineColor: 'B4661A', derived: '#E0446B', read: '#2E9E5B'
      },
      dark: {
        ink: '#E8EDF6', inkSoft: '#AEB8C8', inkFaint: '#7E8899',
        nameBg: '20,24,32',
        ring: '11,14,20',                // = 深色纸，点在深底上不会被白圈糊住
        labelHalo: 'rgba(11,14,20,0.92)',
        bg: '#0B0E14',
        edgeImplication: '#D7DEEA', edgeEquivalence: '#D7DEEA',
        edgeDefinition: '130, 170, 255', edgeAnalogy: '185, 166, 255',
        spineColor: 'E8A45C', derived: '#FF7A9C', read: '#58D08D'
      }
    },
    /* 当前解析后的方案（'light' | 'dark'）与用户选择（'light' | 'dark' | 'auto'）。
       ⚠️ 两个不是一个东西：`auto` 解析成 dark 时，设置里的下拉必须还显示 auto。 */
    scheme: 'light',
    mode: 'auto',

    /** 把方案套到 `MG.theme` 的活动字段上（原地改，别换对象：
        模块里 `T.edgeStyles` / `T.derivedEdge` 都是按引用读的）。 */
    applyScheme: function (name) {
      var s = this.schemes[name] || this.schemes.light;
      this.scheme = (name === 'dark') ? 'dark' : 'light';
      this.ink = s.ink; this.inkSoft = s.inkSoft; this.inkFaint = s.inkFaint;
      this.nameBg = s.nameBg; this.ring = s.ring; this.labelHalo = s.labelHalo;
      this.bg = s.bg;
      this.spineColor = s.spineColor;
      this.readColor = s.read;
      var E = this.edgeStyles;
      if (E) {
        E.implication.color = s.edgeImplication;
        E.equivalence.color = s.edgeEquivalence;
        E.definition.color = s.edgeDefinition;
        E.analogy.color = s.edgeAnalogy;
      }
      if (this.derivedEdge) this.derivedEdge.color = s.derived;
      return this;
    },

    /* 兼容旧字段（有些探针/脚本会读）：值由 applyScheme 维护。 */
    ink: '#1C1C1E',
    inkSoft: '#6B7178',
    inkFaint: '#A5ABB3',
    labelHalo: 'rgba(255,255,255,0.92)',
    nameBg: '255,255,255',
    ring: '255,255,255',
    spineColor: 'B4661A',
    readColor: '#2E9E5B'
  };

  /* 开页先把方案定下来（内联脚本已经按 ?theme / localStorage / auto 把 <html data-theme> 设好）。
     ⚠️ 放在这里而不是 app.js：渲染第一帧之前，MG.theme 必须已经是正确的那一套。
     ⛔ build.mjs 也会加载本文件（Node 里没有 document）—— 必须容错。 */
  (function initScheme() {
    var resolved = 'light';
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        resolved = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
        var mode = document.documentElement.dataset.themeMode;
        if (mode === 'light' || mode === 'dark' || mode === 'auto') MG.theme.mode = mode;
      }
    } catch (e) { /* 忽略 */ }
    if (MG.theme && MG.theme.applyScheme) MG.theme.applyScheme(resolved);
  })();

  /** 取节点类型样式（未知类型回落到 definition）
      ⭐ T2.4：界面英文模式下 `name` 直接换成 `nameEn` —— 这样图例 / 搜索下拉 /
         面板那三处的类型名**一处都不用改**（它们本来就只读 `.name`）。 */
  MG.typeStyle = function (type) {
    var st = MG.theme.nodeTypes[type] || MG.theme.nodeTypes.definition;
    if (MG.isEn && st.nameEn) {
      return { name: st.nameEn, nameEn: st.nameEn, color: st.color, short: st.nameEn };
    }
    return st;
  };

  /** 边的显示名（同上：英文模式走 edgeNamesEn） */
  MG.edgeName = function (kind) {
    var T = MG.theme;
    if (MG.isEn && T.edgeNamesEn && T.edgeNamesEn[kind]) return T.edgeNamesEn[kind];
    return (T.edgeNames || {})[kind] || kind;
  };
})(typeof window !== 'undefined' ? window : globalThis);
