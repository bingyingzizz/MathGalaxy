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
      anchorPull: 0.35,           // 把节点拉回「初始匀布位置」的力（保住板块结构与均匀感）
      borderPull: 0.45,           // 跨板块节点的锚定更硬 → 稳定停留在交界带
      capacityFactor: 1.30,       // 板块可用地盘半径 = √(节点数/π) × idealDist × 该系数
      minGap: 64,                 // 节点最小间距（硬碰撞）
      temp0: 62,                  // 初始温度（同时是每步位移上限）
      temp1: 0.5,                 // 终止温度
      maxStep: 26
    },

    /* 相机 */
    camera: {
      minZoom: 0.10,
      maxZoom: 8,
      zoomStep: 1.22,             // 按钮 / 键盘缩放的倍率
      wheelGain: 0.0016,          // 滚轮灵敏度
      fitPadding: 130,
      maxFitZoom: 1.25,
      fitMinZoom: 0.24,           // 「适配全部」的下限：窗口太窄时宁可出血，也别缩成一粒灰
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
      labelMinZoom: 0.22,         // 低于此缩放干脆不画名称
      labelMinZoomAll: 0.55,      // 低于此缩放只画重要节点的名称并自动去重叠
      labelPad: 3,
      glow: true
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

    /* 电子云背景 */
    background: {
      texScale: 0.42,             // 世界坐标 → 纹理像素
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
       ------------------------------------------------------------------ */
    /* 阈值要和「适配全部」时的实际缩放对上：
       1600×900 下 content 铺满 ≈ k 0.62，所以 0.62 往上必须是「全细节」。
       各区间重叠 → 交叉淡入淡出，不会突然跳变。                          */
    lod: {
      galaxyNameIn: [0.05, 0.16],    // 星系名淡入（最小的时候只看见它）
      clusterNameIn: [0.24, 0.40],   // 星团名淡入
      clusterNameOut: [0.44, 0.60],  // 星团名淡出，让位给节点名
      nodeDotIn: [0.14, 0.26],       // 节点圆点淡入（再小就只剩云）
      nodeEdgeIn: [0.40, 0.66],      // 节点级细线淡入
      nodeNameIn: [0.42, 0.62],      // 节点名淡入（0.62 = 全细节）
      clusterLinkOut: [0.28, 0.58]   // 星团级粗线淡出（与细线交叉）
    },

    /* 星团（一套自足的装置，内部关系密、对外整块连接） */
    cluster: {
      gap: 1.62,            // 星团之间的间距系数（越大越松）
      minRadius: 92,        // 星团最小可用半径
      nodeSpread: 0.80,     // 节点在星团圆盘里铺开的比例
      cloudPadding: 76,     // 星团云比节点分布外扩多少（世界单位）
      cloudMinRadius: 130,
      cloudAlpha: 0.085,    // 星团云不透明度（叠在星系云上，形成"更密的结"）
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
