/* ==========================================================================
   数学星图 · 大板块（sector）定义
   --------------------------------------------------------------------------
   四层结构：**大板块 → 领域 → 星团 → 节点**。

   · 大板块只负责**组织与显示**：它不改节点 id、陈述、证明、边的语义。
   · 归属表唯一真源就在这里（`regions` 数组）。⛔ 不要在 regions.js 里再写一份
     `sector` 字段 —— 两处并存就一定会漂。建图时由 graph.js 反向写到
     `region.sector` / `graph.sectorOf`。
   · **没有内容的板块不建区域**：`empty: true` 的条目会被渲染与侧栏一律跳过，
     不占画布面积、不画云、不出名字。将来有内容时把它挪进 `regions` 即可。

   ⭐ 跨领域内容的**主 / 次归属**（登记，不是复制 —— 节点仍只有一份）：
     · 范畴论 192 点：主 = 基础与逻辑；次 = 代数 / 几何与拓扑
       （它是工具不是对象，按体量放在基础与逻辑的东缘，紧邻代数）
     · 凝聚态数学 87 点：主 = 代数；次 = 几何与拓扑 / 基础与逻辑
       （产物是凝聚态阿贝尔群与 Ext/RHom，原料是紧 Hausdorff 上的层）
     · 同调代数 116 点：主 = 代数；次 = 范畴论 / 拓扑
   ========================================================================== */
window.MG = window.MG || {};

MG.sectors = [
  {
    id: 'foundations',
    name: '基础与逻辑',
    en: 'Foundations & Logic',
    color: '#5B6BD6',
    regions: ['logic', 'set-theory', 'order-theory', 'category'],
    secondary: { category: ['algebra', 'geometry-topology'] },
    desc: '一阶语言与 ZFC、集合的构造与基数、偏序与选择原理；范畴论作为**跨领域基础工具**也归这里 —— 它不研究某一类结构，而是给所有结构提供语言（极限、伴随、层与拓扑斯）。'
  },
  {
    id: 'analysis',
    name: '分析',
    en: 'Analysis',
    color: '#2E9BD4',
    regions: ['analysis', 'analysis-measure', 'complex'],
    desc: '**数学分析**：极限与完备性、连续与紧性、中值定理与 Taylor、Riemann 积分、级数、多元微分。\n**实变函数**：σ-代数、测度、可测函数、Lebesgue 积分、Fubini、微分定理与 $L^p$。\n（2026-10-27 从原来的单个「分析学」拆开：那一块有 279 点，占全库 25%，领域内部的跨度撑不住了。）'
  },
  {
    id: 'algebra',
    name: '代数',
    en: 'Algebra',
    color: '#E08A3C',
    regions: ['algebra', 'homology', 'condensed'],
    secondary: { condensed: ['geometry-topology', 'foundations'] },
    desc: '群环域模与线性代数、特征值与内积空间、多重线性与张量；再往上是复形与导出三角、同调与谱序列、层上同调，以及**凝聚态数学**（主归属在此）。'
  },
  {
    id: 'geometry-topology',
    name: '几何与拓扑',
    en: 'Geometry & Topology',
    color: '#D9649F',
    regions: ['topology', 'analytic', 'diffgeom'],
    secondary: { analytic: ['algebra', 'condensed', 'foundations'], diffgeom: ['analysis'] },
    desc: '开集、连续、紧致与连通；紧 Hausdorff 空间、Stone 空间与紧生成空间 —— 也是凝聚态数学「紧 Hausdorff 上的层」那一侧的原料。**解析几何**（adic 空间、解析环、相干对偶）归这里：它的主产物是几何对象，原料则来自代数与凝聚态。'
  },
  {
    id: 'number-theory',
    name: '数论',
    en: 'Number Theory',
    color: '#6E8B3D',
    regions: ['number'],
    desc: '初等数论：整数的算术（华罗庚《数论导引》的顺序：整除 → 同余 → 二次剩余 → 原根）。'
  }
];
