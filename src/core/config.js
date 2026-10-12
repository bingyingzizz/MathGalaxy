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
      regionSpread: 1.55,         // 星系中心的整体外扩系数（regions.js 里的坐标 × 它）
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
         缩放。内容以后再涨，先来看这个数 —— 现在 221 个点时实际需要 ≈0.20，
         涨到上千个点会掉到 0.07 上下，那时 minZoom 也要一起降。 */
      fitMinZoom: 0.06,
      animateMs: 420              // 相机平移动画时长
    },

    /* 节点 */
    node: {
      baseRadius: 8.5,
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
      glow: true,

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
      mergeOffset: 52,            // 多前提箭头汇聚点距离目标多远（世界单位）
      arrowSize: 9.5,             // 箭头长度（屏幕像素，随缩放轻微变化）
      equivalenceGlyph: 0.7       // 大于该缩放时在等价线中点画 ⟺
    },

    /* 星团包络（每个「装置」一圈闭合的边界）
       —— 「这块地是谁的」一眼看得见。只在中小缩放出现，放大了让位给节点本身。 */
    envelope: {
      pad: 44,                    // 边界离最远那个点再外扩多少（世界单位）
      samples: 24,                // 绕一圈取多少个方向
      smooth: 3,                  // 半径序列平滑几遍（消掉尖角）
      fillAlpha: 0.026,           // 里面淡淡填一层，表明「这块归它」
      strokeAlpha: 0.32,
      width: 1.3
    },

    /* 电子云背景 */
    background: {
      /* ⚠️ 世界（约 10661×9176）× 这个比例 = 云雾纹理的像素数。
       原来写 0.42 → 4478×3854 ≈ **17.3 M 像素**（≈69MB）：既浪费内存，又可能超过 GPU 的
       MAX_TEXTURE_SIZE —— 有些环境只给 4096，一旦超了 Chrome 会走软件路径，表现正是
       「静止不卡、一拖动就卡」（拖动时每帧都要重铺这一层）。
       0.19 → 2026×1743 ≈ 3.6 M 像素，长边压在 2048 以内。云雾本来就是一团模糊的雾，
       放大倍率变大在视觉上近乎无差别（用画布指纹对过）。 */
    texScale: 0.19,             // 世界坐标 → 纹理像素
      blobsPerRegion: 15,         // 每个板块的云朵数
      blobAlpha: 0.075,           // 单朵云的基础不透明度（多朵叠加后会更深）
      centerAlpha: 0.065,         // 板块中心大团雾
      nodeAlpha: 0.050,           // 每个节点周围的小团雾
      spread: 0.72,               // 云朵分布半径 / 板块半径
      blobRadiusMin: 0.30,
      blobRadiusMax: 0.50,
      cloudMargin: 110,           // 板块云半径 = 专属节点最大离心距 + 该余量
      cloudRadiusMin: 200,
      dilate: 1.45                // 纹理画布在内容范围外多留的边距
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
      /* —— 结构性：倍率 × k₀ —— */
      galaxyNameIn:   { rel: [0.25, 0.85] },  // 星系名：全图就亮
      galaxyNameHold: 0.50,                   // 装置名出来时，星系名最多压掉多少
      clusterNameIn:  { rel: [0.45, 1.15] },  // 装置名：全图就基本全亮，放大后让位给节点名
      clusterNameOut: { rel: [2.00, 3.60] },
      clusterLinkOut: { rel: [1.00, 2.80] },  // 团级粗线：全图最亮，放大后退场
      trunkNameIn:    { rel: [0.85, 1.05] },  // 主干名：全图就全亮（去重叠会筛掉挤的）

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
      trunkEdgeIn: { rel: [0.50, 1.25] },
      /* 全图时把「不在主干上」的点/名压暗，主线才浮得出来；放大到 2.2× k₀ 恢复原样。
         （主干本来是 58 个点、84 条内部边的**一张网**，不压暗的话只是多一层网。） */
      trunkDimIn:  { rel: [0.60, 2.20] },
      trunkDimMax: 0.60,         // 全图时非主干点保留多少不透明度（0.40 = 压掉 60%）

      /* 星团包络：和装置名同一档出现，放大到节点名出来之前就退场 */
      envelopeIn:  { rel: [0.25, 0.85] },
      envelopeOut: { rel: [1.40, 2.80] }
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
      cloudAlpha: 0.14,     // 星团云不透明度（叠在星系云上，形成"更密的结"）
      labelSize: 13.5,
      labelOffset: 0,       // 星团名放在星团中心上方
      namePad: 6            // 星团名底下那块底色的内边距
    },

    /* 星团级连线（自动从节点级连线聚合出来，不需要手写） */
    clusterLink: {
      minEdges: 2,          // 两个星团之间至少这么多条节点连线才画
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
    showDefinitionLines: true,
    showLabels: true,
    wheelZooms: true,             // false → 滚轮平移（触控板手感）
    hideParallelImplications: true, // 已有等价线时不再叠画同对节点的箭头
    highlightDefinitions: true    // 面板上把「定义引用」单独分组
  };

  /* ---------------------------------------------------------------- 主题 */
  MG.theme = {
    /* 图例里节点类型的显示顺序（也是「重要程度」的排序依据） */
    typeOrder: ['axiom', 'definition', 'theorem', 'lemma', 'proposition', 'corollary', 'example'],

    /* 节点类型 → 颜色。改这里即可换配色。 */
    nodeTypes: {
      axiom:       { name: '公理',  color: '#7A5CD6', short: '公理' },
      definition:  { name: '定义',  color: '#8B93A7', short: '定义' },
      theorem:     { name: '定理',  color: '#2F9E63', short: '定理' },
      lemma:       { name: '引理',  color: '#E08434', short: '引理' },
      proposition: { name: '命题',  color: '#12A0B8', short: '命题' },
      corollary:   { name: '推论',  color: '#3A7BD5', short: '推论' },
      example:     { name: '例',    color: '#A79BC4', short: '例' }
    },

    /* 边的视觉 */
    edgeStyles: {
      implication: { color: '#1C1C1E', width: 1.7, dashed: false },
      equivalence: { color: '#1C1C1E', width: 2.1, dashed: false },
      definition:  { color: '60, 112, 245', width: 1.15, alpha: 0.5, dashed: false },
      analogy:     { color: '138, 106, 214', width: 1.5, alpha: 0.55, dashed: true }
    },

    /* 边的中文名 */
    edgeNames: {
      implication: '推出',
      equivalence: '等价',
      definition:  '定义引用',
      analogy:     '类比'
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

    font: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif',
    monoFont: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',

    ink: '#1C1C1E',
    inkSoft: '#6B7178',
    inkFaint: '#A5ABB3',
    labelHalo: 'rgba(255,255,255,0.92)'
  };

  /** 取节点类型样式（未知类型回落到 definition） */
  MG.typeStyle = function (type) {
    return MG.theme.nodeTypes[type] || MG.theme.nodeTypes.definition;
  };
})(typeof window !== 'undefined' ? window : globalThis);
