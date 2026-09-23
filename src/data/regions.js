/* ==========================================================================
   数学星图 · 板块（数学领域）定义
   --------------------------------------------------------------------------
   center  板块中心的世界坐标（星图上的大致方位）
   radius  板块半径（用来判断跨板块节点的交界点、以及云的基准大小）
   color   背景电子云的颜色；越靠近边缘越淡，页面大背景仍是白色
   ========================================================================== */
window.MG = window.MG || {};

MG.regions = [
  {
    id: 'logic',
    name: '数理逻辑',
    en: 'Mathematical Logic',
    color: '#8A63E8',
    center: { x: -1150, y: -700 },
    radius: 460,
    desc: '一阶语言、公式与满足关系；形式系统、可计算性与模型论待补。'
  },
  {
    id: 'set-theory',
    name: '集合论',
    en: 'Set Theory',
    color: '#4F7CF5',
    center: { x: -480, y: -120 },
    radius: 660,
    desc: 'ZFC 公理系统、序数、基数与选择原理。'
  },
  {
    id: 'order-theory',
    name: '序理论',
    en: 'Order Theory',
    color: '#2FA96B',
    center: { x: 440, y: -170 },
    radius: 560,
    desc: '偏序、格、链与完备性；佐恩引理一类「极大原理」的舞台。'
  },
  {
    id: 'topology',
    name: '拓扑学',
    en: 'Topology',
    color: '#D9649F',
    center: { x: 1220, y: -660 },
    radius: 460,
    desc: '开集、连续、紧致与连通；大量定理依赖选择原理。'
  },
  {
    id: 'algebra',
    name: '抽象代数',
    en: 'Abstract Algebra',
    color: '#E08A3C',
    center: { x: 960, y: 430 },
    radius: 500,
    desc: '群、环、域、模与线性代数；佐恩引理的经典应用场。'
  },
  {
    id: 'analysis',
    name: '分析学',
    en: 'Analysis',
    color: '#3AA8D8',
    center: { x: -420, y: 720 },
    radius: 500,
    desc: '极限、测度、泛函分析；Hahn–Banach 等定理也依赖选择原理。'
  }
];
